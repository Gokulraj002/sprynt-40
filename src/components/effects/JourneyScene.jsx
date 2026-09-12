import { useEffect } from 'react';
import * as THREE from 'three';
import markUrl from '@/assets/sprynt-mark.png';

export default function JourneyScene({ mountId = 'journeyWebgl', onStage, onFail }) {
  useEffect(() => {
    const mount = document.getElementById(mountId);
    if (!mount) {
      onFail && onFail();
      return;
    }

    let raf = 0;
    let disposed = false;
    const disposables = [];
    let renderer, canvas, onResize, onPointer;

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
      camera.position.set(0, 0, 7.5);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
      renderer.setSize(window.innerWidth, window.innerHeight);
      canvas = renderer.domElement;
      mount.appendChild(canvas);

      const root = new THREE.Group();
      scene.add(root);

      // sky
      const skyTex = (() => {
        const c = document.createElement('canvas');
        c.width = 8; c.height = 256;
        const cx = c.getContext('2d');
        const g = cx.createLinearGradient(0, 0, 0, 256);
        g.addColorStop(0, '#0a0704');
        g.addColorStop(0.55, '#050403');
        g.addColorStop(1, '#030303');
        cx.fillStyle = g; cx.fillRect(0, 0, 8, 256);
        return new THREE.CanvasTexture(c);
      })();
      disposables.push(skyTex);
      const skyGeo = new THREE.SphereGeometry(40, 16, 16);
      const skyMat = new THREE.MeshBasicMaterial({ map: skyTex, side: THREE.BackSide, fog: false });
      const sky = new THREE.Mesh(skyGeo, skyMat);
      disposables.push(skyGeo, skyMat);
      scene.add(sky);

      // arrow / mark texture
      const arrowTex = new THREE.TextureLoader().load(markUrl);
      if ('SRGBColorSpace' in THREE) arrowTex.colorSpace = THREE.SRGBColorSpace;
      disposables.push(arrowTex);

      function makeGlowTexture(inner, mid) {
        const c = document.createElement('canvas');
        c.width = c.height = 256;
        const cx = c.getContext('2d');
        const g = cx.createRadialGradient(128, 128, 0, 128, 128, 128);
        g.addColorStop(0, inner);
        g.addColorStop(0.4, mid);
        g.addColorStop(1, 'rgba(255,122,0,0)');
        cx.fillStyle = g; cx.fillRect(0, 0, 256, 256);
        const tex = new THREE.CanvasTexture(c);
        disposables.push(tex);
        return tex;
      }

      const sketchDark = new THREE.MeshBasicMaterial({ color: 0x0a0703 });
      disposables.push(sketchDark);
      const sketchLine = (color = 0xff8a2a, op = 0.85) => {
        const m = new THREE.LineBasicMaterial({ color, transparent: true, opacity: op });
        disposables.push(m);
        return m;
      };
      function sketchMesh(geo, parent, pos, lineColor, lineOp) {
        disposables.push(geo);
        const mesh = new THREE.Mesh(geo, sketchDark);
        if (pos) mesh.position.set(...pos);
        parent.add(mesh);
        const edgeGeo = new THREE.EdgesGeometry(geo);
        disposables.push(edgeGeo);
        const edges = new THREE.LineSegments(edgeGeo, sketchLine(lineColor, lineOp));
        edges.position.copy(mesh.position);
        edges.rotation.copy(mesh.rotation);
        parent.add(edges);
        return mesh;
      }

      // desk
      const desk = new THREE.Group();
      sketchMesh(new THREE.BoxGeometry(1.5, 0.06, 0.85), desk, [0, 0, 0]);
      sketchMesh(new THREE.CylinderGeometry(0.3, 0.32, 0.03, 24), desk, [0, 0.045, -0.02]);
      sketchMesh(new THREE.CylinderGeometry(0.04, 0.075, 0.4, 14), desk, [0, 0.25, -0.02]);
      sketchMesh(new THREE.BoxGeometry(1.3, 0.86, 0.06), desk, [0, 0.9, -0.02]);
      const screenLitGeo = new THREE.PlaneGeometry(1.2, 0.76);
      const screenLitMat = new THREE.MeshBasicMaterial({ color: 0x070402 });
      const screenLit = new THREE.Mesh(screenLitGeo, screenLitMat);
      screenLit.position.set(0, 0.9, 0.012);
      desk.add(screenLit);
      disposables.push(screenLitGeo, screenLitMat);
      const screenArrowGeo = new THREE.PlaneGeometry(0.32, 0.32);
      const screenArrowMat = new THREE.MeshBasicMaterial({ map: arrowTex, transparent: true });
      const screenArrow = new THREE.Mesh(screenArrowGeo, screenArrowMat);
      screenArrow.position.set(0, 0.9, 0.014);
      desk.add(screenArrow);
      disposables.push(screenArrowGeo, screenArrowMat);
      const screenGlowLight = new THREE.PointLight(0xff8a2a, 3, 2.2);
      screenGlowLight.position.set(0, 0.9, 0.4);
      desk.add(screenGlowLight);
      sketchMesh(new THREE.BoxGeometry(0.66, 0.02, 0.22), desk, [0, 0.045, 0.3]);
      desk.position.set(0, -2.05, 0.35);
      desk.rotation.y = 0.14;
      root.add(desk);
      desk.updateMatrixWorld(true);
      const deskBox = new THREE.Box3().setFromObject(desk);
      const stackX = (deskBox.min.x + deskBox.max.x) / 2;
      const stackZ = (deskBox.min.z + deskBox.max.z) / 2;
      const GAP = 0.16;

      // skyline
      const companyGroup = new THREE.Group();
      companyGroup.position.set(stackX, deskBox.max.y + GAP, stackZ - 0.15);
      root.add(companyGroup);
      const skyline = [
        { w: 0.16, h: 0.55, z: 0 }, { w: 0.14, h: 0.8, z: -0.03 }, { w: 0.18, h: 1.05, z: 0 }, { w: 0.15, h: 0.7, z: -0.02 },
        { w: 0.2, h: 1.45, z: 0.02 },
        { w: 0.16, h: 0.75, z: -0.02 }, { w: 0.19, h: 1.15, z: 0 }, { w: 0.14, h: 0.6, z: -0.03 }, { w: 0.16, h: 0.9, z: 0 }
      ];
      let sx = 0;
      const totalW = skyline.reduce((a, b) => a + b.w + 0.02, 0) - 0.02;
      sx = -totalW / 2;
      skyline.forEach(({ w, h, z }) => {
        sketchMesh(new THREE.BoxGeometry(w, h, w * 0.75), companyGroup, [sx + w / 2, h / 2, z], 0xff8a2a, 0.55);
        sx += w + 0.02;
      });
      const towerGlowMat = new THREE.SpriteMaterial({ map: makeGlowTexture('rgba(255,150,70,.4)', 'rgba(255,122,0,.1)'), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
      const towerGlow = new THREE.Sprite(towerGlowMat);
      towerGlow.scale.set(2.6, 2.2, 1);
      towerGlow.position.set(0, 0.65, 0.1);
      companyGroup.add(towerGlow);
      disposables.push(towerGlowMat);
      companyGroup.updateMatrixWorld(true);
      const companyBox = new THREE.Box3().setFromObject(companyGroup);

      // globe
      const globeRadius = 0.6;
      const globeGroup = new THREE.Group();
      globeGroup.position.set(stackX, companyBox.max.y + GAP + globeRadius, stackZ);
      root.add(globeGroup);
      const globeSpin = new THREE.Group();
      globeGroup.add(globeSpin);
      const globeCoreGeo = new THREE.SphereGeometry(globeRadius, 28, 20);
      const globeCoreMat = new THREE.MeshBasicMaterial({ color: 0x0a0703 });
      const globeCore = new THREE.Mesh(globeCoreGeo, globeCoreMat);
      globeSpin.add(globeCore);
      disposables.push(globeCoreGeo, globeCoreMat);
      const globeWireGeo = new THREE.SphereGeometry(globeRadius + 0.006, 20, 14);
      const globeWireMat = new THREE.MeshBasicMaterial({ color: 0xff8a2a, wireframe: true, transparent: true, opacity: 0.5 });
      const globeWire = new THREE.Mesh(globeWireGeo, globeWireMat);
      globeSpin.add(globeWire);
      disposables.push(globeWireGeo, globeWireMat);

      function sphPoint(r, lat, lon) {
        const phi = (90 - lat) * Math.PI / 180;
        const theta = (lon + 180) * Math.PI / 180;
        return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
      }
      const arcDefs = [[40, -100, 10, 20], [10, 20, -20, 80], [-20, 80, 35, 150], [35, -60, -10, -140], [-10, -140, 50, -40], [5, 150, -25, -100]];
      arcDefs.forEach(([la1, lo1, la2, lo2]) => {
        const p1 = sphPoint(globeRadius * 1.01, la1, lo1);
        const p2 = sphPoint(globeRadius * 1.01, la2, lo2);
        const mid = p1.clone().add(p2).multiplyScalar(0.5).normalize().multiplyScalar(globeRadius * 1.4);
        const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
        const col = 0xff8a2a;
        const lineGeo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(20));
        const lineMat = new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: 0.55 });
        const line = new THREE.Line(lineGeo, lineMat);
        globeSpin.add(line);
        disposables.push(lineGeo, lineMat);
        [p1, p2].forEach(p => {
          const dotGeo = new THREE.SphereGeometry(0.014, 8, 8);
          const dotMat = new THREE.MeshBasicMaterial({ color: col });
          const dot = new THREE.Mesh(dotGeo, dotMat);
          dot.position.copy(p);
          globeSpin.add(dot);
          disposables.push(dotGeo, dotMat);
        });
      });

      const atmosphereGeo = new THREE.SphereGeometry(globeRadius * 1.18, 32, 32);
      const atmosphereMat = new THREE.ShaderMaterial({
        transparent: true, blending: THREE.AdditiveBlending, side: THREE.BackSide, depthWrite: false,
        vertexShader: `varying vec3 vN;void main(){vN=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
        fragmentShader: `varying vec3 vN;void main(){float i=pow(.68-dot(vN,vec3(0.,0.,1.)),3.);gl_FragColor=vec4(1.,.54,.16,1.)*clamp(i,0.,1.);}`
      });
      const atmosphere = new THREE.Mesh(atmosphereGeo, atmosphereMat);
      globeGroup.add(atmosphere);
      disposables.push(atmosphereGeo, atmosphereMat);

      const globeGlowMat = new THREE.SpriteMaterial({ map: makeGlowTexture('rgba(255,150,50,.55)', 'rgba(255,122,0,.18)'), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
      const globeGlow = new THREE.Sprite(globeGlowMat);
      globeGlow.scale.set(3.2, 3.2, 1);
      globeGroup.add(globeGlow);
      disposables.push(globeGlowMat);

      const burstGlowMat = new THREE.SpriteMaterial({ map: makeGlowTexture('rgba(255,220,180,1)', 'rgba(255,150,50,.5)'), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0 });
      const burstGlow = new THREE.Sprite(burstGlowMat);
      burstGlow.scale.set(2, 2, 1);
      globeGroup.add(burstGlow);
      disposables.push(burstGlowMat);

      // flight path
      const screenTop = new THREE.Vector3(stackX, deskBox.max.y, stackZ);
      const globeTop = globeGroup.position.y + globeRadius;
      const pathPts = [
        new THREE.Vector3(screenTop.x, screenTop.y - 0.3, screenTop.z),
        new THREE.Vector3(screenTop.x + 0.05, companyBox.min.y + 0.2, screenTop.z - 0.05),
        new THREE.Vector3(screenTop.x - 0.04, (companyBox.min.y + companyBox.max.y) / 2, stackZ + 0.15),
        new THREE.Vector3(screenTop.x + 0.04, companyBox.max.y + 0.08, screenTop.z + 0.05),
        new THREE.Vector3(globeGroup.position.x, globeGroup.position.y, globeGroup.position.z),
        new THREE.Vector3(globeGroup.position.x, globeTop + 0.45, globeGroup.position.z + 0.06),
        new THREE.Vector3(globeGroup.position.x - 0.04, globeTop + 0.95, globeGroup.position.z + 0.1)
      ];
      const flightCurve = new THREE.CatmullRomCurve3(pathPts);

      const travelArrowMat = new THREE.SpriteMaterial({ map: arrowTex, transparent: true });
      const travelArrow = new THREE.Sprite(travelArrowMat);
      travelArrow.scale.set(0.42, 0.42, 1);
      root.add(travelArrow);
      disposables.push(travelArrowMat);

      const travelGlowMat = new THREE.SpriteMaterial({ map: makeGlowTexture('rgba(255,170,90,.8)', 'rgba(255,122,0,.3)'), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
      const travelGlow = new THREE.Sprite(travelGlowMat);
      travelGlow.scale.set(1.5, 1.5, 1);
      root.add(travelGlow);
      disposables.push(travelGlowMat);

      function travelEnvelope(t) {
        if (t < 0.05) return t / 0.05;
        if (t < 0.58) return 1;
        if (t < 0.65) return 1 - (t - 0.58) / 0.07;
        if (t < 0.71) return 0;
        if (t < 0.78) return (t - 0.71) / 0.07;
        if (t < 0.9) return 1;
        return Math.max(0, 1 - (t - 0.9) / 0.1);
      }

      const light = new THREE.PointLight(0xff7a00, 20, 12);
      light.position.set(2, 2, 3);
      scene.add(light);
      const white = new THREE.PointLight(0xffffff, 4, 10);
      white.position.set(-3, -1, 3);
      scene.add(white);

      // starfield
      const starGeo = new THREE.BufferGeometry();
      const n = 1800;
      const pos = new Float32Array(n * 3);
      const phase = new Float32Array(n);
      const psize = new Float32Array(n);
      const hue = new Float32Array(n);
      for (let i = 0; i < n; i++) {
        const r = 5 + Math.random() * 11;
        const a = Math.random() * Math.PI * 2;
        const b = Math.acos(2 * Math.random() - 1);
        pos[i * 3] = r * Math.sin(b) * Math.cos(a);
        pos[i * 3 + 1] = r * Math.sin(b) * Math.sin(a);
        pos[i * 3 + 2] = r * Math.cos(b);
        phase[i] = Math.random() * Math.PI * 2;
        psize[i] = Math.random() * 1.7 + 0.5;
        hue[i] = Math.random();
      }
      starGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      starGeo.setAttribute('aPhase', new THREE.BufferAttribute(phase, 1));
      starGeo.setAttribute('aSize', new THREE.BufferAttribute(psize, 1));
      starGeo.setAttribute('aHue', new THREE.BufferAttribute(hue, 1));
      const starMat = new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 } },
        transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
        vertexShader: `attribute float aPhase;attribute float aSize;attribute float aHue;uniform float uTime;varying float vT;varying float vH;void main(){vT=.3+.7*abs(sin(uTime*.8+aPhase));vH=aHue;vec4 mv=modelViewMatrix*vec4(position,1.);gl_PointSize=aSize*3.2*(12./-mv.z);gl_Position=projectionMatrix*mv;}`,
        fragmentShader: `varying float vT;varying float vH;void main(){float d=length(gl_PointCoord-vec2(.5));if(d>.5)discard;float a=(1.-d*2.)*vT;vec3 warm=vec3(1.,.48,0.);vec3 cool=vec3(.85,.9,1.);vec3 col=mix(warm,cool,step(.82,vH));gl_FragColor=vec4(col,a*.85);}`
      });
      scene.add(new THREE.Points(starGeo, starMat));
      disposables.push(starGeo, starMat);

      // shooting stars
      const shootGeo = new THREE.BufferGeometry();
      const SHOOT_N = 5;
      const shootPos = new Float32Array(SHOOT_N * 3);
      for (let i = 0; i < SHOOT_N; i++) { shootPos[i * 3] = 99; shootPos[i * 3 + 1] = 99; shootPos[i * 3 + 2] = 99; }
      shootGeo.setAttribute('position', new THREE.BufferAttribute(shootPos, 3));
      const shootMat = new THREE.PointsMaterial({ color: 0xffe3c2, size: 0.09, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false });
      const shootPoints = new THREE.Points(shootGeo, shootMat);
      scene.add(shootPoints);
      disposables.push(shootGeo, shootMat);
      const shooters = Array.from({ length: SHOOT_N }, () => ({ active: false, t: 0, dur: 0, from: new THREE.Vector3(), to: new THREE.Vector3() }));
      function spawnShooter(s) {
        s.from.set(-6 + Math.random() * 4, 4 + Math.random() * 2, -4 - Math.random() * 4);
        s.to.set(s.from.x + 5 + Math.random() * 3, s.from.y - 3 - Math.random() * 2, s.from.z);
        s.dur = 0.7 + Math.random() * 0.5;
        s.t = 0;
        s.active = true;
      }

      // focus points
      const focusDesk = (deskBox.min.y + deskBox.max.y) / 2;
      const focusCompany = companyGroup.position.y;
      const focusGlobe = globeGroup.position.y;

      const shots = [
        { y: focusDesk, z: 3.6 },
        { y: focusCompany, z: 4.4 },
        { y: focusGlobe, z: 2.9 }
      ];
      const HOLD = 3.0, TRANS = 1.1, SEG = HOLD + TRANS, TOTAL = SEG * shots.length;
      const smoothstep = p => p * p * (3 - 2 * p);
      function getShot(t) {
        const local = t % TOTAL;
        const idx = Math.floor(local / SEG);
        const segT = local - idx * SEG;
        const cur = shots[idx % shots.length];
        const next = shots[(idx + 1) % shots.length];
        if (segT < HOLD) return { y: cur.y, z: cur.z, stage: idx % shots.length, transP: 0 };
        const p = smoothstep((segT - HOLD) / TRANS);
        return { y: THREE.MathUtils.lerp(cur.y, next.y, p), z: THREE.MathUtils.lerp(cur.z, next.z, p), stage: idx % shots.length, nextStage: (idx + 1) % shots.length, transP: p };
      }

      let baseScale = 1;
      function layout() {
        const aspect = window.innerWidth / window.innerHeight;
        camera.aspect = aspect;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        root.scale.setScalar(1);
        baseScale = aspect < 0.85 ? 1.3 : (aspect < 1.2 ? 1.12 : 1);
      }
      layout();
      onResize = layout;
      window.addEventListener('resize', onResize);

      let mx = 0, my = 0, x = 0, y = 0;
      onPointer = (e) => {
        mx = e.clientX / window.innerWidth - 0.5;
        my = e.clientY / window.innerHeight - 0.5;
      };
      window.addEventListener('pointermove', onPointer);

      let lastStage = -1;
      const clock = new THREE.Clock();

      function loop() {
        if (disposed) return;
        raf = requestAnimationFrame(loop);
        const t = clock.getElapsedTime();
        const dt = clock.getDelta();
        x += (mx - x) * 0.035;
        y += (my - y) * 0.035;

        const shot = getShot(t);
        camera.position.set(x * 0.2, shot.y - y * 0.25, shot.z * baseScale);
        camera.lookAt(0, shot.y, stackZ);

        const activeStage = shot.transP > 0.5 && shot.nextStage != null ? shot.nextStage : shot.stage;
        if (activeStage !== lastStage) {
          lastStage = activeStage;
          onStage && onStage(activeStage);
        }

        const cycle = 1 / TOTAL;
        const ft = (t * cycle) % 1;
        const p = flightCurve.getPointAt(ft);
        const env = travelEnvelope(ft);
        travelArrow.position.copy(p);
        travelArrow.material.opacity = env;
        travelArrow.material.rotation = Math.sin(t * 1.6) * 0.3;
        travelGlow.position.copy(p);
        travelGlow.material.opacity = env * (0.7 + Math.sin(t * 3) * 0.2);

        const burstT = 0.65;
        const burstAmt = Math.exp(-Math.pow((ft - burstT) / 0.02, 2));
        burstGlow.material.opacity = burstAmt * 1.2;
        burstGlow.scale.setScalar(2 + burstAmt * 3);
        globeGlow.material.opacity = 0.55 + burstAmt * 0.4;
        globeSpin.rotation.y = t * 0.08;

        screenGlowLight.intensity = 2.4 + Math.sin(t * 2) * 0.6;

        starMat.uniforms.uTime.value = t;

        if (Math.random() < 0.006) {
          const s = shooters.find(s => !s.active);
          if (s) spawnShooter(s);
        }
        shooters.forEach((s, i) => {
          if (!s.active) return;
          s.t += dt;
          const sp = Math.min(s.t / s.dur, 1);
          const cx = THREE.MathUtils.lerp(s.from.x, s.to.x, sp);
          const cy = THREE.MathUtils.lerp(s.from.y, s.to.y, sp);
          const cz = s.from.z;
          shootPos[i * 3] = cx;
          shootPos[i * 3 + 1] = cy;
          shootPos[i * 3 + 2] = cz;
          if (sp >= 1) {
            s.active = false;
            shootPos[i * 3] = 99;
            shootPos[i * 3 + 1] = 99;
            shootPos[i * 3 + 2] = 99;
          }
        });
        shootGeo.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
      }
      loop();
    } catch (err) {
      onFail && onFail();
    }

    return () => {
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
      if (onResize) window.removeEventListener('resize', onResize);
      if (onPointer) window.removeEventListener('pointermove', onPointer);
      disposables.forEach(d => { try { d.dispose && d.dispose(); } catch (e) {} });
      if (renderer) {
        try { renderer.dispose(); } catch (e) {}
      }
      if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, [mountId, onStage, onFail]);

  return null;
}
