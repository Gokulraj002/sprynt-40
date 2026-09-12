import { useEffect } from 'react';
import * as THREE from 'three';
import sprynMarkUrl from '@/assets/sprynt-mark.png';

export default function WebglBackground() {
  useEffect(() => {
    const mount = document.getElementById('webgl');
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const isSmallHero = innerWidth < 700;
    const renderer = new THREE.WebGLRenderer({ antialias: !isSmallHero, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, isSmallHero ? 1 : 1.6));
    renderer.setSize(innerWidth, innerHeight);
    mount.appendChild(renderer.domElement);

    const root = new THREE.Group();
    scene.add(root);

    const skyTex = (() => {
      const c = document.createElement('canvas');
      c.width = 8;
      c.height = 256;
      const cx = c.getContext('2d');
      const g = cx.createLinearGradient(0, 0, 0, 256);
      g.addColorStop(0, '#0a0704');
      g.addColorStop(0.55, '#050403');
      g.addColorStop(1, '#030303');
      cx.fillStyle = g;
      cx.fillRect(0, 0, 8, 256);
      return new THREE.CanvasTexture(c);
    })();
    const skyGeo = new THREE.SphereGeometry(40, 16, 16);
    const skyMat = new THREE.MeshBasicMaterial({ map: skyTex, side: THREE.BackSide, fog: false });
    const sky = new THREE.Mesh(skyGeo, skyMat);
    scene.add(sky);

    const arrowTex = new THREE.TextureLoader().load(sprynMarkUrl);
    if ('SRGBColorSpace' in THREE) arrowTex.colorSpace = THREE.SRGBColorSpace;

    const arrowThickness = 0.14;
    const arrowMat = new THREE.MeshBasicMaterial({ map: arrowTex, transparent: true });
    const arrowSideMat = new THREE.MeshBasicMaterial({ color: 0xcc5f00 });
    const arrowGeo = new THREE.BoxGeometry(2.2, 2.2, arrowThickness);
    const arrow = new THREE.Mesh(arrowGeo, [
      arrowSideMat,
      arrowSideMat,
      arrowSideMat,
      arrowSideMat,
      arrowMat,
      arrowMat,
    ]);
    root.add(arrow);

    const light = new THREE.PointLight(0xff7a00, 20, 12);
    light.position.set(2, 2, 3);
    scene.add(light);
    const white = new THREE.PointLight(0xffffff, 4, 10);
    white.position.set(-3, -1, 3);
    scene.add(white);

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
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `attribute float aPhase;attribute float aSize;attribute float aHue;uniform float uTime;varying float vT;varying float vH;void main(){vT=.3+.7*abs(sin(uTime*.8+aPhase));vH=aHue;vec4 mv=modelViewMatrix*vec4(position,1.);gl_PointSize=aSize*3.2*(12./-mv.z);gl_Position=projectionMatrix*mv;}`,
      fragmentShader: `varying float vT;varying float vH;void main(){float d=length(gl_PointCoord-vec2(.5));if(d>.5)discard;float a=(1.-d*2.)*vT;vec3 warm=vec3(1.,.48,0.);vec3 cool=vec3(.85,.9,1.);vec3 col=mix(warm,cool,step(.82,vH));gl_FragColor=vec4(col,a*.85);}`,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    const shootGeo = new THREE.BufferGeometry();
    const SHOOT_N = 5;
    const shootPos = new Float32Array(SHOOT_N * 3);
    for (let i = 0; i < SHOOT_N; i++) {
      shootPos[i * 3] = 99;
      shootPos[i * 3 + 1] = 99;
      shootPos[i * 3 + 2] = 99;
    }
    shootGeo.setAttribute('position', new THREE.BufferAttribute(shootPos, 3));
    const shootMat = new THREE.PointsMaterial({
      color: 0xffe3c2,
      size: 0.09,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const shootPoints = new THREE.Points(shootGeo, shootMat);
    scene.add(shootPoints);
    const shooters = Array.from({ length: SHOOT_N }, () => ({
      active: false,
      t: 0,
      dur: 0,
      from: new THREE.Vector3(),
      to: new THREE.Vector3(),
    }));
    function spawnShooter(s) {
      s.from.set(-6 + Math.random() * 4, 4 + Math.random() * 2, -4 - Math.random() * 4);
      s.to.set(s.from.x + 5 + Math.random() * 3, s.from.y - 3 - Math.random() * 2, s.from.z);
      s.dur = 0.7 + Math.random() * 0.5;
      s.t = 0;
      s.active = true;
    }

    let baseX = 2.6;
    let baseY = 0;
    let baseScale = 1;
    function layout() {
      const aspect = innerWidth / innerHeight;
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
      if (aspect < 0.85) {
        baseX = 1.15;
        baseY = 2.35;
        baseScale = 0.48;
      } else if (aspect < 1.2) {
        baseX = 2.0;
        baseY = 1.15;
        baseScale = 0.64;
      } else {
        baseX = 2.75;
        baseY = 0;
        baseScale = 0.8;
      }
      root.scale.setScalar(baseScale);
    }
    layout();

    let mx = 0;
    let my = 0;
    let x = 0;
    let y = 0;
    let scrollT = 0;

    const onResize = () => layout();
    const onPointerMove = (e) => {
      mx = e.clientX / innerWidth - 0.5;
      my = e.clientY / innerHeight - 0.5;
    };
    const onScroll = () => {
      scrollT = Math.min(window.scrollY / (innerHeight * 1.1), 1);
    };
    addEventListener('resize', onResize);
    addEventListener('pointermove', onPointerMove);
    addEventListener('scroll', onScroll, { passive: true });

    const clock = new THREE.Clock();
    let rafId = 0;
    function loop() {
      rafId = requestAnimationFrame(loop);
      const t = clock.getElapsedTime();
      const dt = clock.getDelta();
      x += (mx - x) * 0.035;
      y += (my - y) * 0.035;
      root.position.x = baseX + x * 0.5;
      root.position.y = baseY - y * 0.4;

      arrow.rotation.y = t * 0.5;
      arrow.rotation.x = Math.sin(t * 0.3) * 0.08;

      starMat.uniforms.uTime.value = t;

      if (Math.random() < 0.006) {
        const s = shooters.find((s) => !s.active);
        if (s) spawnShooter(s);
      }
      shooters.forEach((s, i) => {
        if (!s.active) return;
        s.t += dt;
        const p = Math.min(s.t / s.dur, 1);
        const cx = THREE.MathUtils.lerp(s.from.x, s.to.x, p);
        const cy = THREE.MathUtils.lerp(s.from.y, s.to.y, p);
        const cz = s.from.z;
        shootPos[i * 3] = cx;
        shootPos[i * 3 + 1] = cy;
        shootPos[i * 3 + 2] = cz;
        if (p >= 1) {
          s.active = false;
          shootPos[i * 3] = 99;
          shootPos[i * 3 + 1] = 99;
          shootPos[i * 3 + 2] = 99;
        }
      });
      shootGeo.attributes.position.needsUpdate = true;

      camera.position.z = 7.5 + scrollT * 2.4;
      camera.position.y = -scrollT * 1.1;
      renderer.domElement.style.opacity = Math.max(1 - scrollT, 0);
      renderer.render(scene, camera);
    }
    loop();

    return () => {
      cancelAnimationFrame(rafId);
      removeEventListener('resize', onResize);
      removeEventListener('pointermove', onPointerMove);
      removeEventListener('scroll', onScroll);

      skyGeo.dispose();
      skyMat.dispose();
      skyTex.dispose();
      arrowGeo.dispose();
      arrowMat.dispose();
      arrowSideMat.dispose();
      arrowTex.dispose();
      starGeo.dispose();
      starMat.dispose();
      shootGeo.dispose();
      shootMat.dispose();

      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return null;
}
