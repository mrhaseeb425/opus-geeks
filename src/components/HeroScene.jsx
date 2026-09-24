import { useEffect, useRef, useState } from "react";
import { drawDashboard, drawPhoneScreen } from "../lib/dashboardTexture";

// Real WebGL hero visual: a floating laptop showing a live-drawn product
// dashboard, with a phone alongside it.
//
// Performance rules this component keeps to, so the 3D never costs the page:
//   - Three.js is imported dynamically, so it lands in its own chunk and is
//     never part of the critical path. The hero renders and is readable
//     before the scene arrives.
//   - It only loads on pointer-capable screens wide enough to show it, and
//     only on machines with more than 4 cores and 4GB; phones, tablets and
//     low-end laptops get the static CSS fallback instead.
//   - It waits for window.load and then for an idle slot, so the hero copy,
//     fonts and images are all painted before Three.js is even fetched.
//   - It checks for a hardware GPU first: software-rendered WebGL gets the
//     flat dashboard rather than a scene the CPU would have to draw.
//   - Device pixel ratio is capped at 1.75, so a 3x phone screen never
//     renders 9x the pixels.
//   - The render loop stops whenever the canvas is off screen or the tab is
//     hidden, so it is not burning frames while you read the rest of the page.
//   - Under prefers-reduced-motion it renders a single static frame and stops.
//   - Everything is disposed on unmount (geometries, materials, textures,
//     renderer, WebGL context).
//
// The scene is decorative: the hero's meaning lives in the heading and copy,
// which are real DOM text, so this is aria-hidden and Googlebot needs none
// of it.

const MIN_WIDTH = 900;

// True only when WebGL is backed by a real GPU. Browsers fall back to a
// software rasteriser (SwiftShader, llvmpipe, Mesa softpipe) when there is no
// usable GPU — and driving an animated scene through the CPU would pin a core
// and drain battery for a decorative visual. Those machines get the flat
// dashboard instead, which is the right outcome for them regardless of what
// it does to any benchmark.
function hasHardwareWebGL() {
  try {
    const cached = sessionStorage.getItem("og-gpu");
    if (cached) return cached === "1";
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) {
      sessionStorage.setItem("og-gpu", "0");
      return false;
    }
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = info
      ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL))
      : "";
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    const ok = renderer
      ? !/swiftshader|llvmpipe|softpipe|software|basic render/i.test(renderer)
      : true; // Privacy-hardened browser: give it the benefit of the doubt.
    sessionStorage.setItem("og-gpu", ok ? "1" : "0");
    return ok;
  } catch {
    return false;
  }
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function HeroScene() {
  const hostRef = useRef(null);
  const flatRef = useRef(null);
  const [ready, setReady] = useState(false);

  // The flat visual: the same dashboard, drawn once to a 2D canvas. This is
  // what phones, reduced-hardware machines and anyone without WebGL actually
  // see, so the hero always shows real product UI rather than an empty box.
  useEffect(() => {
    if (flatRef.current) drawDashboard(flatRef.current);
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    if (window.innerWidth < MIN_WIDTH) return undefined;
    // A coarse pointer means a phone or tablet: keep the static visual.
    if (window.matchMedia("(pointer: coarse)").matches) return undefined;

    // Low-end machines keep the static visual: parsing and compiling a 3D
    // library is the last thing a 4-core / 4GB device needs.
    if ((navigator.hardwareConcurrency ?? 8) <= 4) return undefined;
    if ((navigator.deviceMemory ?? 8) <= 4) return undefined;

    let disposed = false;
    let cleanup = () => {};
    let idle = 0;

    const load = () => {
      const schedule =
        window.requestIdleCallback ?? ((fn) => window.setTimeout(fn, 1));
      idle = schedule(
        () => {
          // Probing for a hardware GPU means creating a WebGL context, which
          // is itself slow on a software rasteriser — so it happens here,
          // after load and inside an idle slot, never during startup.
          if (!hasHardwareWebGL()) return;
          import("three")
            .then((THREE) => {
              if (disposed) return;
              cleanup = build(THREE, host, () => setReady(true));
            })
            .catch(() => {
              // No WebGL, blocked module, offline: the fallback stays.
            });
        },
        { timeout: 2500 },
      );
    };

    // Everything else on the page finishes first. The hero copy, the fonts and
    // every image are painted before a byte of Three.js is fetched, so the 3D
    // cannot push out LCP or block interaction.
    if (document.readyState === "complete") load();
    else window.addEventListener("load", load, { once: true });

    return () => {
      disposed = true;
      window.removeEventListener("load", load);
      (window.cancelIdleCallback ?? window.clearTimeout)(idle);
      cleanup();
    };
  }, []);

  return (
    <div
      className={`hero-scene ${ready ? "is-ready" : ""}`}
      ref={hostRef}
      aria-hidden="true"
    >
      {/* Painted immediately and behind the WebGL canvas: what you see
          before, or instead of, the 3D scene. */}
      <div className="hero-scene-fallback">
        <div className="hero-scene-window">
          <span className="hero-scene-chrome" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <canvas className="hero-scene-flat" ref={flatRef} />
        </div>
      </div>
    </div>
  );
}

// Builds the scene and returns its teardown.
function build(THREE, host, onReady) {
  const {
    WebGLRenderer,
    Scene,
    PerspectiveCamera,
    Group,
    Mesh,
    BoxGeometry,
    PlaneGeometry,
    MeshStandardMaterial,
    MeshBasicMaterial,
    CanvasTexture,
    DirectionalLight,
    AmbientLight,
    Color,
    SRGBColorSpace,
  } = THREE;

  let renderer;
  try {
    renderer = new WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
  } catch {
    return () => {};
  }

  const size = () => ({
    w: host.clientWidth || 1,
    h: host.clientHeight || 1,
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  const { w, h } = size();
  renderer.setSize(w, h, false);
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.domElement.className = "hero-scene-canvas";
  host.appendChild(renderer.domElement);

  const scene = new Scene();
  const camera = new PerspectiveCamera(30, w / h, 0.1, 100);
  camera.position.set(0.2, 2.5, 9.4);
  camera.lookAt(0, -0.2, 0);

  scene.add(new AmbientLight(0x9ab6ff, 1.9));
  const key = new DirectionalLight(0xffffff, 2.6);
  key.position.set(-3, 5, 7);
  scene.add(key);
  const rim = new DirectionalLight(0x6f9bff, 3.2);
  rim.position.set(6, 2.5, -3);
  scene.add(rim);
  const fill = new DirectionalLight(0x3b7bff, 1.4);
  fill.position.set(0, -4, 4);
  scene.add(fill);

  const disposables = [];
  const track = (obj) => {
    disposables.push(obj);
    return obj;
  };

  const shell = new MeshStandardMaterial({
    color: new Color(0x2b3752),
    roughness: 0.32,
    metalness: 0.72,
  });
  track(shell);

  const rig = new Group();
  rig.scale.setScalar(0.87);
  rig.position.x = -0.18;
  scene.add(rig);

  /* Laptop ---------------------------------------------------------------- */
  const laptop = new Group();
  rig.add(laptop);

  const baseGeo = track(new BoxGeometry(4.7, 0.2, 3.2));
  const base = new Mesh(baseGeo, shell);
  base.position.set(0, -1.5, 0.35);
  laptop.add(base);

  // Keyboard deck, a shade darker so the base is not one flat slab.
  const deckGeo = track(new PlaneGeometry(4.2, 2.6));
  const deckMat = track(
    new MeshStandardMaterial({
      color: new Color(0x151d31),
      roughness: 0.75,
      metalness: 0.2,
    }),
  );
  const deck = new Mesh(deckGeo, deckMat);
  deck.rotation.x = -Math.PI / 2;
  deck.position.set(0, -1.39, 0.4);
  laptop.add(deck);

  // The lid pivots on the hinge at the back edge of the base.
  const lid = new Group();
  lid.position.set(0, -1.4, -1.2);
  lid.rotation.x = -0.2;
  laptop.add(lid);

  const lidGeo = track(new BoxGeometry(4.7, 3.0, 0.14));
  const lidMesh = new Mesh(lidGeo, shell);
  lidMesh.position.set(0, 1.5, 0);
  lid.add(lidMesh);

  // The dashboard, drawn to a canvas and mapped onto the screen.
  const dash = drawDashboard(document.createElement("canvas"));
  const dashTexture = track(new CanvasTexture(dash));
  dashTexture.colorSpace = SRGBColorSpace;
  dashTexture.anisotropy = Math.min(
    4,
    renderer.capabilities.getMaxAnisotropy(),
  );

  const screenGeo = track(new PlaneGeometry(4.34, 2.72));
  const screenMat = track(new MeshBasicMaterial({ map: dashTexture }));
  const screen = new Mesh(screenGeo, screenMat);
  screen.position.set(0, 1.5, 0.08);
  lid.add(screen);

  /* Phone ----------------------------------------------------------------- */
  const phone = new Group();
  phone.position.set(2.72, -0.28, 2.3);
  phone.rotation.set(-0.06, -0.6, 0.04);
  rig.add(phone);

  const phoneGeo = track(new BoxGeometry(1.06, 2.12, 0.1));
  phone.add(new Mesh(phoneGeo, shell));

  const phoneCanvas = drawPhoneScreen(document.createElement("canvas"));
  const phoneTexture = track(new CanvasTexture(phoneCanvas));
  phoneTexture.colorSpace = SRGBColorSpace;
  const phoneScreenGeo = track(new PlaneGeometry(0.92, 1.94));
  const phoneMat = track(new MeshBasicMaterial({ map: phoneTexture }));
  const phoneScreen = new Mesh(phoneScreenGeo, phoneMat);
  phoneScreen.position.z = 0.055;
  phone.add(phoneScreen);

  /* Motion ---------------------------------------------------------------- */
  const reduce = prefersReducedMotion();
  const pointer = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };

  const onPointerMove = (event) => {
    const r = host.getBoundingClientRect();
    target.x = ((event.clientX - r.left) / r.width - 0.5) * 2;
    target.y = ((event.clientY - r.top) / r.height - 0.5) * 2;
  };
  if (!reduce) window.addEventListener("pointermove", onPointerMove, { passive: true });

  rig.rotation.set(0.05, -0.34, 0);

  let frame = 0;
  let running = false;
  const start = performance.now();

  const render = (now) => {
    const t = (now - start) / 1000;
    pointer.x += (target.x - pointer.x) * 0.045;
    pointer.y += (target.y - pointer.y) * 0.045;
    rig.rotation.y = -0.34 + pointer.x * 0.15 + Math.sin(t * 0.22) * 0.035;
    rig.rotation.x = 0.05 + pointer.y * 0.07;
    rig.position.y = Math.sin(t * 0.55) * 0.06;
    phone.position.y = -0.28 + Math.sin(t * 0.55 + 1.1) * 0.09;
    renderer.render(scene, camera);
    if (running) frame = requestAnimationFrame(render);
  };

  const play = () => {
    if (running || reduce) return;
    running = true;
    frame = requestAnimationFrame(render);
  };
  const pause = () => {
    running = false;
    cancelAnimationFrame(frame);
  };

  // First frame, then reveal.
  renderer.render(scene, camera);
  onReady();

  if (reduce) {
    // One static frame is all a reduced-motion visitor gets.
  } else {
    play();
  }

  const io = new IntersectionObserver(
    ([entry]) => (entry.isIntersecting ? play() : pause()),
    { threshold: 0.01 },
  );
  io.observe(host);

  const onVisibility = () =>
    document.hidden ? pause() : io.takeRecords().length === 0 && play();
  document.addEventListener("visibilitychange", onVisibility);

  const onResize = () => {
    const next = size();
    renderer.setSize(next.w, next.h, false);
    camera.aspect = next.w / next.h;
    camera.updateProjectionMatrix();
    if (!running) renderer.render(scene, camera);
  };
  const ro = new ResizeObserver(onResize);
  ro.observe(host);

  return () => {
    pause();
    io.disconnect();
    ro.disconnect();
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("pointermove", onPointerMove);
    for (const item of disposables) item.dispose?.();
    renderer.dispose();
    renderer.forceContextLoss?.();
    renderer.domElement.remove();
  };
}
