"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export const Hero3DCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const prefersReducedMotion = mediaQuery.matches;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle Node Configuration
    const particleCount = prefersReducedMotion ? 40 : 110;
    const originalPositions = new Float32Array(particleCount * 3);
    const currentPositions = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);
    const colors = new Float32Array(particleCount * 3);

    const blueColor = new THREE.Color("#3b82f6");
    const indigoColor = new THREE.Color("#6366f1");
    const cyanColor = new THREE.Color("#06b6d4");

    // Initialize node parameters
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 28;
      const y = (Math.random() - 0.5) * 18;
      const z = (Math.random() - 0.5) * 12;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      currentPositions[i * 3] = x;
      currentPositions[i * 3 + 1] = y;
      currentPositions[i * 3 + 2] = z;

      // Assign sizes to create depth layers
      if (i < particleCount * 0.2) {
        particleSizes[i] = 0.55; // Foreground
      } else if (i < particleCount * 0.6) {
        particleSizes[i] = 0.35; // Midground
      } else {
        particleSizes[i] = 0.2;  // Background
      }

      const mixedColor = blueColor.clone().lerp(
        Math.random() > 0.5 ? indigoColor : cyanColor,
        Math.random()
      );
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    // Geometry & Custom Shader Material for sizes & opacities
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(currentPositions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(particleSizes, 1));

    // Custom shader material for high performance points with individual sizes & depths
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        entrance: { value: 0 },
      },
      vertexShader: `
        uniform float time;
        uniform float entrance;
        attribute float size;
        varying vec3 vColor;
        varying float vOpacity;
        void main() {
          vColor = color;
          // De-assemble coordinates slightly for entrance morphing
          vec3 pos = position;
          pos.xyz *= mix(0.1, 1.0, entrance);
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          
          // Size attenuation
          gl_PointSize = size * (300.0 / -mvPosition.z) * mix(0.0, 1.0, entrance);
          vOpacity = mix(0.05, 0.85, entrance);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vOpacity;
        void main() {
          // Circular nodes
          float dist = distance(gl_PointCoord, vec2(0.5));
          if (dist > 0.5) discard;
          float strength = 1.0 - (dist * 2.0);
          gl_FragColor = vec4(vColor, vOpacity * strength);
        }
      `,
      transparent: true,
      vertexColors: true,
      depthWrite: false,
    });

    const particlesMesh = new THREE.Points(geometry, material);
    scene.add(particlesMesh);

    // Connecting Lines Mesh
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.12,
    });

    const lineGeometry = new THREE.BufferGeometry();
    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(linesMesh);

    // Active Traveling Pulse Particles
    const pulseCount = prefersReducedMotion ? 0 : 6;
    const pulseGeometry = new THREE.BufferGeometry();
    const pulsePositions = new Float32Array(pulseCount * 3);
    const pulseColors = new Float32Array(pulseCount * 3);
    const pulseSizes = new Float32Array(pulseCount);

    for (let i = 0; i < pulseCount; i++) {
      pulseSizes[i] = 0.8;
      pulseColors[i * 3] = 1.0;     // White/Cyan highlight glow
      pulseColors[i * 3 + 1] = 1.0;
      pulseColors[i * 3 + 2] = 1.0;
    }

    pulseGeometry.setAttribute("position", new THREE.BufferAttribute(pulsePositions, 3));
    pulseGeometry.setAttribute("color", new THREE.BufferAttribute(pulseColors, 3));
    pulseGeometry.setAttribute("size", new THREE.BufferAttribute(pulseSizes, 1));

    const pulseMaterial = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 }, entrance: { value: 0 } },
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = size * (400.0 / -mvPosition.z);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float dist = distance(gl_PointCoord, vec2(0.5));
          if (dist > 0.5) discard;
          gl_FragColor = vec4(vColor, 1.0 - (dist * 2.0));
        }
      `,
      transparent: true,
      depthWrite: false,
    });

    const pulsesPoints = new THREE.Points(pulseGeometry, pulseMaterial);
    if (!prefersReducedMotion) {
      scene.add(pulsesPoints);
    }

    // Pulse Route Tracking Configuration
    interface PulseRoute {
      startNode: number;
      endNode: number;
      progress: number;
      speed: number;
    }

    const pulses: PulseRoute[] = [];
    const buildPulseRoutes = () => {
      if (prefersReducedMotion) return;
      pulses.length = 0;
      for (let i = 0; i < pulseCount; i++) {
        const startNode = Math.floor(Math.random() * particleCount);
        // Find a nearby node
        let endNode = (startNode + 1) % particleCount;
        let minDist = 999;
        for (let j = 0; j < particleCount; j++) {
          if (j === startNode) continue;
          const dx = originalPositions[startNode * 3] - originalPositions[j * 3];
          const dy = originalPositions[startNode * 3 + 1] - originalPositions[j * 3 + 1];
          const dz = originalPositions[startNode * 3 + 2] - originalPositions[j * 3 + 2];
          const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (d < 6 && d < minDist) {
            minDist = d;
            endNode = j;
          }
        }
        pulses.push({
          startNode,
          endNode,
          progress: Math.random(),
          speed: Math.random() * 0.008 + 0.003,
        });
      }
    };

    buildPulseRoutes();

    // Mouse Parallax Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    if (!prefersReducedMotion) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    let time = 0;
    let entranceVal = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      time += 0.0085;
      if (entranceVal < 1) {
        entranceVal += 0.012; // Form network assembly over ~2 seconds
        if (entranceVal > 1) entranceVal = 1;
      }

      material.uniforms.time.value = time;
      material.uniforms.entrance.value = entranceVal;

      // Soft real-time node drift & mouse-magnetic displacement
      targetMouseX += (mouseX * 8 - targetMouseX) * 0.05;
      targetMouseY += (-mouseY * 6 - targetMouseY) * 0.05;

      const posAttrib = geometry.getAttribute("position") as THREE.BufferAttribute;

      for (let i = 0; i < particleCount; i++) {
        // Basic drift noise
        const ox = originalPositions[i * 3];
        const oy = originalPositions[i * 3 + 1];
        const oz = originalPositions[i * 3 + 2];

        let dx = 0;
        let dy = 0;
        let dz = 0;

        if (!prefersReducedMotion) {
          dx = Math.sin(time + i * 0.5) * 0.25;
          dy = Math.cos(time * 0.8 + i * 0.3) * 0.22;
          dz = Math.sin(time * 0.5 + i * 0.7) * 0.2;

          // Mouse magnetic displacement for nearby nodes
          const distToMouse = Math.sqrt(
            Math.pow(ox + dx - targetMouseX, 2) + Math.pow(oy + dy - targetMouseY, 2)
          );

          if (distToMouse < 4.5) {
            const force = (4.5 - distToMouse) * 0.08;
            dx += (ox + dx - targetMouseX) * force;
            dy += (oy + dy - targetMouseY) * force;
          }
        }

        posAttrib.setXYZ(i, ox + dx, oy + dy, oz + dz);
      }
      posAttrib.needsUpdate = true;

      // Recompute connecting lines dynamically from drifting nodes
      const linePositions: number[] = [];
      const positionsArray = posAttrib.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const px = positionsArray[i * 3] - positionsArray[j * 3];
          const py = positionsArray[i * 3 + 1] - positionsArray[j * 3 + 1];
          const pz = positionsArray[i * 3 + 2] - positionsArray[j * 3 + 2];
          const dist = Math.sqrt(px * px + py * py + pz * pz);

          if (dist < 5.2) {
            linePositions.push(positionsArray[i * 3], positionsArray[i * 3 + 1], positionsArray[i * 3 + 2]);
            linePositions.push(positionsArray[j * 3], positionsArray[j * 3 + 1], positionsArray[j * 3 + 2]);
          }
        }
      }

      lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
      lineGeometry.getAttribute("position").needsUpdate = true;

      // Animate active traveling pulse paths
      if (!prefersReducedMotion) {
        const pulsePosAttrib = pulseGeometry.getAttribute("position") as THREE.BufferAttribute;

        pulses.forEach((pulse, idx) => {
          pulse.progress += pulse.speed;
          if (pulse.progress >= 1) {
            pulse.progress = 0;
            // Switch to a new path
            pulse.startNode = pulse.endNode;
            // Pick a random neighboring node
            const neighbors: number[] = [];
            const sx = originalPositions[pulse.startNode * 3];
            const sy = originalPositions[pulse.startNode * 3 + 1];
            const sz = originalPositions[pulse.startNode * 3 + 2];

            for (let k = 0; k < particleCount; k++) {
              if (k === pulse.startNode) continue;
              const kx = originalPositions[k * 3];
              const ky = originalPositions[k * 3 + 1];
              const kz = originalPositions[k * 3 + 2];
              const dist = Math.sqrt((sx - kx) ** 2 + (sy - ky) ** 2 + (sz - kz) ** 2);
              if (dist < 6) neighbors.push(k);
            }
            if (neighbors.length > 0) {
              pulse.endNode = neighbors[Math.floor(Math.random() * neighbors.length)];
            } else {
              pulse.endNode = Math.floor(Math.random() * particleCount);
            }
          }

          // Interpolate coordinate between start & end drifting nodes
          const sIdx = pulse.startNode * 3;
          const eIdx = pulse.endNode * 3;

          const sx = positionsArray[sIdx];
          const sy = positionsArray[sIdx + 1];
          const sz = positionsArray[sIdx + 2];

          const ex = positionsArray[eIdx];
          const ey = positionsArray[eIdx + 1];
          const ez = positionsArray[eIdx + 2];

          const px = sx + (ex - sx) * pulse.progress;
          const py = sy + (ey - sy) * pulse.progress;
          const pz = sz + (ez - sz) * pulse.progress;

          pulsePosAttrib.setXYZ(idx, px, py, pz);
        });

        pulsePosAttrib.needsUpdate = true;
      }

      // Parallax camera rotation
      if (!prefersReducedMotion) {
        particlesMesh.rotation.y = time * 0.08;
        linesMesh.rotation.y = time * 0.08;

        camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.035;
        camera.position.y += (-mouseY * 1.5 - camera.position.y) * 0.035;
      }

      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup resources correctly on component unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      pulseGeometry.dispose();
      pulseMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none z-0" />;
};
