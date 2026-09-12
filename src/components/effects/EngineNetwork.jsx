import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function EngineNetwork() {
  const wrapRef = useRef(null);
  const mountRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const mount = mountRef.current;
    if (!wrap || !mount) return;

    let rafId = 0;
    let cleanupScene = null;
    let initialized = false;

    const onPointerMoveRef = { current: null };
    const onPointerLeaveRef = { current: null };
    const onResizeRef = { current: null };

    const init = () => {
      if (initialized) return;
      initialized = true;

      const isSmall = window.innerWidth < 700;
      const scene = new THREE.Scene();
      const camDist = 6;
      const vFov = 55;
      const camera = new THREE.PerspectiveCamera(vFov, 1, 0.1, 50);
      camera.position.set(0, 0, camDist);
      const renderer = new THREE.WebGLRenderer({ antialias: !isSmall, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmall ? 1 : 1.6));
      mount.appendChild(renderer.domElement);

      const rect0 = wrap.getBoundingClientRect();
      const aspect0 = rect0.width / Math.max(rect0.height, 1);
      camera.aspect = aspect0;
      camera.updateProjectionMatrix();

      const halfH = camDist * Math.tan((vFov * Math.PI / 180) / 2) * 0.82;
      const halfW = Math.max(halfH * aspect0, halfH * 0.65);
      const depthSpread = 2.4;

      const COUNT = isSmall ? 46 : 64;
      const nodes = [];
      const posArr = new Float32Array(COUNT * 3);
      for (let i = 0; i < COUNT; i++) {
        const p = new THREE.Vector3(
          (Math.random() - 0.5) * 2 * halfW,
          (Math.random() - 0.5) * 2 * halfH,
          (Math.random() - 0.5) * depthSpread
        );
        const v = new THREE.Vector3(
          (Math.random() - 0.5) * 0.004,
          (Math.random() - 0.5) * 0.004,
          (Math.random() - 0.5) * 0.002
        );
        nodes.push({ p, v, base: p.clone() });
        posArr[i * 3] = p.x;
        posArr[i * 3 + 1] = p.y;
        posArr[i * 3 + 2] = p.z;
      }

      const linkDist = isSmall ? 0.85 : 1.15;
      const ptGeo = new THREE.BufferGeometry();
      ptGeo.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
      const ptMat = new THREE.PointsMaterial({
        color: 0xff7a00,
        size: 0.055,
        transparent: true,
        opacity: 0.9,
        sizeAttenuation: true,
      });
      const points = new THREE.Points(ptGeo, ptMat);
      scene.add(points);

      const linePos = new Float32Array(COUNT * COUNT * 3);
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
      const lineMat = new THREE.LineBasicMaterial({
        color: 0xff7a00,
        transparent: true,
        opacity: 0.16,
      });
      const lines = new THREE.LineSegments(lineGeo, lineMat);
      scene.add(lines);

      const ray = new THREE.Raycaster();
      const mouseN = new THREE.Vector2(2, 2);
      const mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      const mouseWorld = new THREE.Vector3();
      let active = false;

      const updateSize = () => {
        const r = wrap.getBoundingClientRect();
        renderer.setSize(r.width, r.height);
        camera.aspect = r.width / r.height;
        camera.updateProjectionMatrix();
      };
      updateSize();

      const onResize = () => updateSize();
      const onPointerMove = (e) => {
        const r = wrap.getBoundingClientRect();
        mouseN.x = ((e.clientX - r.left) / r.width) * 2 - 1;
        mouseN.y = -((e.clientY - r.top) / r.height) * 2 + 1;
        active = true;
      };
      const onPointerLeave = () => {
        active = false;
        mouseN.set(2, 2);
      };

      window.addEventListener('resize', onResize);
      wrap.addEventListener('pointermove', onPointerMove);
      wrap.addEventListener('pointerleave', onPointerLeave);

      onResizeRef.current = onResize;
      onPointerMoveRef.current = onPointerMove;
      onPointerLeaveRef.current = onPointerLeave;

      const loop = () => {
        rafId = requestAnimationFrame(loop);
        if (active) {
          ray.setFromCamera(mouseN, camera);
          ray.ray.intersectPlane(mousePlane, mouseWorld);
        }
        for (let i = 0; i < COUNT; i++) {
          const nd = nodes[i];
          nd.p.add(nd.v);
          if (Math.abs(nd.p.x - nd.base.x) > 0.6) nd.v.x *= -1;
          if (Math.abs(nd.p.y - nd.base.y) > 0.6) nd.v.y *= -1;
          if (Math.abs(nd.p.z - nd.base.z) > 0.6) nd.v.z *= -1;
          if (active) {
            const d = nd.p.distanceTo(mouseWorld);
            if (d < 1.4) {
              const push = nd.p.clone().sub(mouseWorld).normalize().multiplyScalar((1.4 - d) * 0.012);
              nd.p.add(push);
            }
          }
          posArr[i * 3] = nd.p.x;
          posArr[i * 3 + 1] = nd.p.y;
          posArr[i * 3 + 2] = nd.p.z;
        }
        ptGeo.attributes.position.needsUpdate = true;
        let idx = 0;
        for (let i = 0; i < COUNT; i++) {
          for (let j = i + 1; j < COUNT; j++) {
            const d = nodes[i].p.distanceTo(nodes[j].p);
            if (d < linkDist) {
              linePos[idx++] = nodes[i].p.x;
              linePos[idx++] = nodes[i].p.y;
              linePos[idx++] = nodes[i].p.z;
              linePos[idx++] = nodes[j].p.x;
              linePos[idx++] = nodes[j].p.y;
              linePos[idx++] = nodes[j].p.z;
            }
          }
        }
        lineGeo.setDrawRange(0, idx / 3);
        lineGeo.attributes.position.needsUpdate = true;
        renderer.render(scene, camera);
      };
      loop();

      cleanupScene = () => {
        if (rafId) cancelAnimationFrame(rafId);
        window.removeEventListener('resize', onResize);
        wrap.removeEventListener('pointermove', onPointerMove);
        wrap.removeEventListener('pointerleave', onPointerLeave);
        ptGeo.dispose();
        ptMat.dispose();
        lineGeo.dispose();
        lineMat.dispose();
        const canvas = renderer.domElement;
        renderer.dispose();
        if (canvas && canvas.parentNode === mount) mount.removeChild(canvas);
      };
    };

    let observer = null;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              init();
              if (observer) {
                observer.disconnect();
                observer = null;
              }
            }
          });
        },
        { rootMargin: '400px' }
      );
      observer.observe(wrap);
    } else {
      init();
    }

    return () => {
      if (observer) observer.disconnect();
      if (cleanupScene) cleanupScene();
    };
  }, []);

  return (
    <div className="engine-canvas" ref={wrapRef}>
      <div className="engine-mount" ref={mountRef} />
      <div className="engine-ui">
        <b>SPRYNT40 / SYSTEM_01</b>
        <span>Interactive field · Move cursor</span>
      </div>
    </div>
  );
}
