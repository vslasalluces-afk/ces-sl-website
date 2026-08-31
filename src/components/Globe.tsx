"use client";

import { useRef, useMemo, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

const CES_LAT = 9.5882;
const CES_LON = -11.5556;
const RADIUS = 1.5;
const CES_POINT = geoVec(CES_LAT, CES_LON, RADIUS);
// Exact Y rotation needed to bring Sierra Leone to the front (+Z)
const TARGET_ROTATION_Y = Math.atan2(-CES_POINT.x, CES_POINT.z);
const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${CES_LAT},${CES_LON}`;

// Geographic coordinates to 3D position on sphere
// Standard formula: phi from north pole, theta from prime meridian
function geoVec(lat: number, lon: number, r: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (180 + lon) * (Math.PI / 180);
  return new THREE.Vector3(
    -(r * Math.sin(phi) * Math.cos(theta)),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

// ─── Textured Earth ──────────────────────────────────────────────
function EarthSphere() {
  const texture = useLoader(THREE.TextureLoader, "/images/earth-texture.jpg");
  texture.colorSpace = THREE.SRGBColorSpace;

  // NASA Blue Marble is already a standard equirectangular projection:
  // left edge = -180°, centre = 0°, right edge = +180°.
  // For our SphereGeometry + geoVec setup, the correct calibration is no added offset.
  texture.wrapS = THREE.RepeatWrapping;
  texture.offset.x = 0;

  return (
    <mesh>
      <sphereGeometry args={[RADIUS, 64, 64]} />
      <meshStandardMaterial
        map={texture}
        roughness={0.85}
        metalness={0.05}
      />
    </mesh>
  );
}

// ─── Atmosphere ──────────────────────────────────────────────────
function Atmosphere() {
  return (
    <mesh>
      <sphereGeometry args={[RADIUS * 1.02, 64, 64]} />
      <meshBasicMaterial color="#88BBFF" transparent opacity={0.06} side={THREE.BackSide} />
    </mesh>
  );
}

// ─── Sierra Leone outline overlay ────────────────────────────────
function SierraLeoneOutline() {
  const line = useMemo(() => {
    const coords: [number, number][] = [
      [10.00, -13.30],
      [9.45, -13.30],
      [8.85, -13.25],
      [8.25, -13.15],
      [7.60, -12.85],
      [7.20, -12.55],
      [7.05, -12.10],
      [6.98, -11.70],
      [7.10, -11.25],
      [7.35, -10.90],
      [7.70, -10.55],
      [8.15, -10.35],
      [8.55, -10.45],
      [8.95, -10.75],
      [9.30, -11.05],
      [9.60, -11.45],
      [9.82, -11.95],
      [9.98, -12.45],
      [10.00, -13.00],
      [10.00, -13.30],
    ];

    const points: THREE.Vector3[] = [];
    for (let i = 0; i < coords.length - 1; i++) {
      const [lat1, lon1] = coords[i];
      const [lat2, lon2] = coords[i + 1];
      const steps = 8;
      for (let s = 0; s < steps; s++) {
        const t = s / steps;
        points.push(
          geoVec(lat1 + (lat2 - lat1) * t, lon1 + (lon2 - lon1) * t, RADIUS + 0.004)
        );
      }
    }
    points.push(geoVec(coords[coords.length - 1][0], coords[coords.length - 1][1], RADIUS + 0.004));

    return new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(points),
      new THREE.LineBasicMaterial({ color: "#FFD166", opacity: 0.95, transparent: true })
    );
  }, []);

  return <primitive object={line} />;
}

function SierraLeoneLabel({ visible }: { visible: boolean }) {
  const pos = useMemo(() => geoVec(CES_LAT + 3.5, CES_LON + 2.2, RADIUS + 0.18), []);

  if (!visible) return null;

  return (
    <group position={pos}>
      <Html center distanceFactor={7} zIndexRange={[20, 0]}>
        <div className="pointer-events-none select-none rounded-xl border border-peach-100 bg-white/92 px-3 py-2 shadow-xl backdrop-blur-sm">
          <div className="font-serif text-sm font-bold leading-tight text-deep-brown">
            Sierra Leone
          </div>
          <div className="text-[11px] leading-tight text-charcoal/60">
            West Africa
          </div>
        </div>
      </Html>
    </group>
  );
}

// ─── Location Pin ────────────────────────────────────────────────
function LocationPin({ hovered, zoomed, onHover, onClick }: {
  hovered: boolean; zoomed: boolean; onHover: (h: boolean) => void; onClick: () => void;
}) {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const pos = useMemo(() => geoVec(CES_LAT, CES_LON, RADIUS + 0.008), []);
  const normal = useMemo(() => pos.clone().normalize(), [pos]);
  const quat = useMemo(
    () => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal),
    [normal]
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ring1.current) {
      const s = 1 + Math.sin(t * 2.5) * 0.5;
      ring1.current.scale.set(s, s, s);
      (ring1.current.material as THREE.MeshBasicMaterial).opacity = 1 - Math.sin(t * 2.5) * 0.6;
    }
    if (ring2.current) {
      const s2 = 1.4 + Math.sin(t * 1.8 + 1) * 0.4;
      ring2.current.scale.set(s2, s2, s2);
      (ring2.current.material as THREE.MeshBasicMaterial).opacity = 0.5 - Math.sin(t * 1.8 + 1) * 0.35;
    }
  });

  const dotSize = zoomed ? 0.05 : hovered ? 0.04 : 0.025;

  return (
    <group position={pos} quaternion={quat}>
      {/* Invisible clickable area */}
      <mesh
        onPointerOver={(e) => { e.stopPropagation(); onHover(true); }}
        onPointerOut={() => onHover(false)}
        onPointerDown={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      {/* Core dot */}
      <mesh>
        <sphereGeometry args={[dotSize, 20, 20]} />
        <meshBasicMaterial color={hovered || zoomed ? "#FFFFFF" : "#FF4444"} />
      </mesh>
      {/* Inner pulse */}
      <mesh ref={ring1}>
        <ringGeometry args={[0.045, 0.065, 32]} />
        <meshBasicMaterial color="#FF4444" transparent opacity={0.9} side={THREE.DoubleSide} />
      </mesh>
      {/* Outer pulse */}
      <mesh ref={ring2}>
        <ringGeometry args={[0.06, 0.075, 32]} />
        <meshBasicMaterial color="#FF8888" transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
      {/* Glow */}
      <mesh>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#FF4444" transparent opacity={hovered ? 0.5 : 0.2} />
      </mesh>
    </group>
  );
}

// ─── Spinning Globe ──────────────────────────────────────────────
function SpinningGlobe({ onPinHover, onPinClick, pinHovered, zoomed }: {
  onPinHover: (h: boolean) => void; onPinClick: () => void; pinHovered: boolean; zoomed: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const isDragging = useRef(false);
  const prev = useRef({ x: 0, y: 0 });
  const vel = useRef(0);
  const { gl } = useThree();

  // Start with Sierra Leone / West Africa facing camera
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = TARGET_ROTATION_Y;
    }
  }, []);

  useEffect(() => {
    const c = gl.domElement;
    const down = (e: PointerEvent) => {
      if (pinHovered) return;
      isDragging.current = true;
      prev.current = { x: e.clientX, y: e.clientY };
      vel.current = 0;
      c.style.cursor = "grabbing";
    };
    const move = (e: PointerEvent) => {
      if (!isDragging.current || !groupRef.current) return;
      const dx = e.clientX - prev.current.x;
      const dy = e.clientY - prev.current.y;
      vel.current = dx * 0.004;
      groupRef.current.rotation.y += dx * 0.004;
      groupRef.current.rotation.x = Math.max(-0.6, Math.min(0.6, groupRef.current.rotation.x + dy * 0.002));
      prev.current = { x: e.clientX, y: e.clientY };
    };
    const up = () => {
      isDragging.current = false;
      c.style.cursor = pinHovered ? "pointer" : "grab";
    };
    c.addEventListener("pointerdown", down);
    c.addEventListener("pointermove", move);
    c.addEventListener("pointerup", up);
    c.addEventListener("pointerleave", up);
    return () => {
      c.removeEventListener("pointerdown", down);
      c.removeEventListener("pointermove", move);
      c.removeEventListener("pointerup", up);
      c.removeEventListener("pointerleave", up);
    };
  }, [gl, pinHovered]);

  useFrame(() => {
    if (!groupRef.current || isDragging.current) return;
    if (zoomed) {
      groupRef.current.rotation.y += (TARGET_ROTATION_Y - groupRef.current.rotation.y) * 0.03;
      groupRef.current.rotation.x += (0.05 - groupRef.current.rotation.x) * 0.03;
    } else if (Math.abs(vel.current) > 0.0002) {
      groupRef.current.rotation.y += vel.current;
      vel.current *= 0.97;
    } else {
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      <EarthSphere />
      <Atmosphere />
      <SierraLeoneOutline />
      <SierraLeoneLabel visible={pinHovered || zoomed} />
      <LocationPin hovered={pinHovered} zoomed={zoomed} onHover={onPinHover} onClick={onPinClick} />
    </group>
  );
}

// ─── Camera zoom ─────────────────────────────────────────────────
function ZoomCtrl({ zoomed }: { zoomed: boolean }) {
  const { camera } = useThree();
  const target = zoomed ? 2.8 : 3.8;
  useFrame(() => {
    const d = target - camera.position.z;
    if (Math.abs(d) > 0.005) camera.position.z += d * 0.04;
  });
  return null;
}

// ─── Export ──────────────────────────────────────────────────────
export default function Globe() {
  const [mounted, setMounted] = useState(false);
  const [pinHovered, setPinHovered] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const openMaps = useCallback(() => {
    window.location.assign(GOOGLE_MAPS_URL);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full aspect-square max-w-lg mx-auto flex items-center justify-center">
        <div className="w-64 h-64 rounded-full bg-gradient-to-br from-deep-brown/50 to-charcoal/50 border border-peach/20 flex items-center justify-center">
          <div className="w-4 h-4 bg-peach rounded-full animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-square max-w-lg mx-auto">
      <Canvas camera={{ position: [0, 0.3, 3.8], fov: 45 }} dpr={[1, 2]} style={{ cursor: pinHovered ? "pointer" : "grab" }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 3, 5]} intensity={1.2} color="#FFFFFF" />
        <directionalLight position={[-3, -1, -4]} intensity={0.3} color="#88AADD" />
        <SpinningGlobe onPinHover={setPinHovered} onPinClick={openMaps} pinHovered={pinHovered} zoomed={zoomed} />
        <ZoomCtrl zoomed={zoomed} />
      </Canvas>

      {/* Hover tooltip */}
      {pinHovered && !zoomed && (
        <div className="absolute left-1/2 bottom-4 -translate-x-1/2 bg-white/90 backdrop-blur-sm text-deep-brown text-xs font-medium px-4 py-2 rounded-full shadow-lg border border-peach-100 pointer-events-none whitespace-nowrap">
          📍 Click pin to open Google Maps
        </div>
      )}

      {/* Zoomed info panel */}
      {zoomed && (
        <div className="absolute top-3 right-3 sm:top-6 sm:right-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-peach-100 p-5 w-72 z-10 animate-fade-in-up">
          <button onClick={() => setZoomed(false)} className="absolute top-3 right-3 w-7 h-7 rounded-full bg-peach-100 hover:bg-peach-200 flex items-center justify-center text-deep-brown transition-colors text-xs font-bold" aria-label="Close">✕</button>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-peach to-gold flex items-center justify-center text-deep-brown font-serif font-bold text-xs shadow-md">CES</div>
            <div>
              <h3 className="font-serif font-bold text-deep-brown text-sm">CES Office</h3>
              <p className="text-charcoal/50 text-xs">Kabala, Sierra Leone · West Africa</p>
            </div>
          </div>
          <div className="space-y-2.5 text-xs text-charcoal/70 mb-4">
            <p className="flex items-start gap-2"><span className="shrink-0 mt-0.5">📍</span><span>3 Mile, Kabala–Makeni Highway, Koinadugu District</span></p>
            <p className="flex items-start gap-2"><span className="shrink-0">📞</span><a href="tel:+23278703694" className="text-muted-green hover:underline">+232 78 703694</a></p>
            <p className="flex items-start gap-2"><span className="shrink-0">✉️</span><a href="mailto:Christianextensionservices@gmail.com" className="text-muted-green hover:underline break-all">Christianextensionservices@gmail.com</a></p>
          </div>
          <div className="space-y-2">
            <button onClick={openMaps} className="flex items-center justify-center gap-2 w-full bg-deep-brown text-warm-white font-semibold text-xs px-4 py-2.5 rounded-xl hover:bg-charcoal transition-colors cursor-pointer">🗺️ Open in Google Maps</button>
            <a href="https://wa.me/23278703694" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-muted-green text-white font-semibold text-xs px-4 py-2.5 rounded-xl hover:bg-green-700 transition-colors">💬 WhatsApp CES</a>
            <button onClick={() => setZoomed(false)} className="flex items-center justify-center gap-2 w-full border border-peach-200 text-charcoal/70 font-medium text-xs px-4 py-2.5 rounded-xl hover:bg-peach-100 transition-colors">🌍 Zoom back out</button>
          </div>
          <p className="text-[10px] text-charcoal/40 mt-3 text-center">9.59°N, 11.56°W</p>
        </div>
      )}

      {!zoomed && !pinHovered && <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-warm-white/30 text-[10px] pointer-events-none">drag to rotate</p>}

      {!zoomed && (
        <div className="absolute left-1/2 top-3 -translate-x-1/2 z-10">
          <button
            onClick={() => setZoomed(true)}
            className="rounded-full border border-peach-100 bg-white/90 px-4 py-2 text-xs font-semibold text-deep-brown shadow-lg backdrop-blur-sm hover:bg-white transition-colors"
          >
            View office details
          </button>
        </div>
      )}
    </div>
  );
}
