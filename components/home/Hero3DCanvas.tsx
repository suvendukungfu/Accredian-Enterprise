"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface ConnectionEdge {
  from: number;
  to: number;
  distance: number;
}

export const Hero3DCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Node Count & Coordinates
    const particleCount = 110;
    const basePositions = new Float32Array(particleCount * 3);
    const currentPositions = new Float32Array(particleCount * 3);
    const nodeSizes = new Float32Array(particleCount);
    const colors = new Float32Array(particleCount * 3);
    const driftOffsets = new Float32Array(particleCount * 3);
    const driftSpeeds = new Float32Array(particleCount);

    const blueColor = new THREE.Color("#3b82f6");
    const indigoColor = new THREE.Color("#6366f1");
    const cyanColor = new THREE.Color("#06b6d4");

    for (let i = 0; i < particleCount; i++) {
      // Create structured network cluster distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 4 + Math.random() * 12;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta) * 0.7;
      const z = (Math.random() - 0.5) * 12;

      basePositions[i * 3] = x;
      basePositions[i * 3 + 1] = y;
      basePositions[i * 3 + 2] = z;

      currentPositions[i * 3] = 0; // Start at origin for assembly entrance
      currentPositions[i * 3 + 1] = 0;
      currentPositions[i * 3 + 2] = 0;

      driftOffsets[i * 3] = Math.random() * Math.PI * 2;
      driftOffsets[i * 3 + 1] = Math.random() * Math.PI * 2;
      driftOffsets[i * 3 + 2] = Math.random() * Math.PI * 2;
      driftSpeeds[i] = 0.4 + Math.random() * 0.6;

      // Depth-based size variation
      nodeSizes[i] = 0.25 + (z + 6) / 20;

      const mixedColor = blueColor.clone().lerp(
        Math.random() > 0.5 ? indigoColor : cyanColor,
        Math.random()
      );
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    // Geometry & Points Material
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(currentPositions, 3));
    particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.4,
      vertexColors: true,
      transparent: true,
      opacity: 0, // Starts at 0 for assembly fade-in
      depthWrite: false,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Pre-calculate valid connection edges
    const edges: ConnectionEdge[] = [];
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = basePositions[i * 3] - basePositions[j * 3];
        const dy = basePositions[i * 3 + 1] - basePositions[j * 3 + 1];
        const dz = basePositions[i * 3 + 2] - basePositions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 5.2) {
          edges.push({ from: i, to: j, distance: dist });
        }
      }
    }

    // Line Segments Geometry & Material
    const linePositions = new Float32Array(edges.length * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });

    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(linesMesh);

    // Pulse Light Beams travelling through active edges
    const pulseCount = 8;
    const pulseGeometry = new THREE.BufferGeometry();
    const pulsePositions = new Float32Array(pulseCount * 3);
    const pulseColors = new Float32Array(pulseCount * 3);

    const activePulseEdgeIndices = new Int32Array(pulseCount);
    const pulseProgresses = new Float32Array(pulseCount);
    const pulseSpeeds = new Float32Array(pulseCount);

    for (let p = 0; p < pulseCount; p++) {
      activePulseEdgeIndices[p] = Math.floor(Math.random() * edges.length);
      pulseProgresses[p] = Math.random();
      pulseSpeeds[p] = 0.2 + Math.random() * 0.3;

      const cyan = new THREE.Color("#38bdf8");
      pulseColors[p * 3] = cyan.r;
      pulseColors[p * 3 + 1] = cyan.g;
      pulseColors[p * 3 + 2] = cyan.b;
    }

    pulseGeometry.setAttribute("position", new THREE.BufferAttribute(pulsePositions, 3));
    pulseGeometry.setAttribute("color", new THREE.BufferAttribute(pulseColors, 3));

    const pulseMaterial = new THREE.PointsMaterial({
      size: 0.65,
      vertexColors: true,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const pulsesMesh = new THREE.Points(pulseGeometry, pulseMaterial);
    scene.add(pulsesMesh);

    // Mouse Parallax Targets
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const relativeX = event.clientX - rect.left;
      const relativeY = event.clientY - rect.top;
      targetMouseX = (relativeX / rect.width - 0.5) * 2;
      targetMouseY = (relativeY / rect.height - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

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

    // Animation & Viewport State
    let animationFrameId: number;
    let assemblyProgress = 0;
    let isVisible = true;
    const clock = new THREE.Clock();

    // IntersectionObserver to pause rendering when offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );

    observer.observe(container);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth assembly entrance interpolation (0 -> 1)
      if (assemblyProgress < 1) {
        assemblyProgress = Math.min(1, assemblyProgress + 0.018);
        particlesMaterial.opacity = assemblyProgress * 0.85;
        lineMaterial.opacity = assemblyProgress * 0.16;
        pulseMaterial.opacity = assemblyProgress * 0.9;
      }

      // Parallax mouse dampening
      currentMouseX += (targetMouseX - currentMouseX) * 0.04;
      currentMouseY += (targetMouseY - currentMouseY) * 0.04;

      // Update Node positions with assembly lerp & subtle 3D drift
      const positionsAttr = particlesGeometry.attributes.position as THREE.BufferAttribute;
      const posArray = positionsAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const driftX = prefersReducedMotion ? 0 : Math.sin(elapsedTime * driftSpeeds[i] + driftOffsets[i3]) * 0.25;
        const driftY = prefersReducedMotion ? 0 : Math.cos(elapsedTime * driftSpeeds[i] * 0.8 + driftOffsets[i3 + 1]) * 0.25;
        const driftZ = prefersReducedMotion ? 0 : Math.sin(elapsedTime * driftSpeeds[i] * 0.6 + driftOffsets[i3 + 2]) * 0.15;

        // Assembly target position
        const targetX = basePositions[i3] + driftX + currentMouseX * 0.8;
        const targetY = basePositions[i3 + 1] + driftY - currentMouseY * 0.8;
        const targetZ = basePositions[i3 + 2] + driftZ;

        posArray[i3] += (targetX * assemblyProgress - posArray[i3]) * 0.08;
        posArray[i3 + 1] += (targetY * assemblyProgress - posArray[i3 + 1]) * 0.08;
        posArray[i3 + 2] += (targetZ * assemblyProgress - posArray[i3 + 2]) * 0.08;
      }

      positionsAttr.needsUpdate = true;

      // Update Line Segment Connection Positions
      const linePosAttr = lineGeometry.attributes.position as THREE.BufferAttribute;
      const lineArray = linePosAttr.array as Float32Array;

      for (let e = 0; e < edges.length; e++) {
        const edge = edges[e];
        const fromIdx = edge.from * 3;
        const toIdx = edge.to * 3;
        const e6 = e * 6;

        lineArray[e6] = posArray[fromIdx];
        lineArray[e6 + 1] = posArray[fromIdx + 1];
        lineArray[e6 + 2] = posArray[fromIdx + 2];

        lineArray[e6 + 3] = posArray[toIdx];
        lineArray[e6 + 4] = posArray[toIdx + 1];
        lineArray[e6 + 5] = posArray[toIdx + 2];
      }

      linePosAttr.needsUpdate = true;

      // Update Traveling Light Pulse Beams
      if (!prefersReducedMotion && edges.length > 0) {
        const pulsePosAttr = pulseGeometry.attributes.position as THREE.BufferAttribute;
        const pulseArray = pulsePosAttr.array as Float32Array;

        for (let p = 0; p < pulseCount; p++) {
          pulseProgresses[p] += 0.008 * pulseSpeeds[p];
          if (pulseProgresses[p] >= 1) {
            pulseProgresses[p] = 0;
            activePulseEdgeIndices[p] = Math.floor(Math.random() * edges.length);
          }

          const edge = edges[activePulseEdgeIndices[p]];
          if (edge) {
            const fromIdx = edge.from * 3;
            const toIdx = edge.to * 3;
            const prog = pulseProgresses[p];

            pulseArray[p * 3] = posArray[fromIdx] + (posArray[toIdx] - posArray[fromIdx]) * prog;
            pulseArray[p * 3 + 1] = posArray[fromIdx + 1] + (posArray[toIdx + 1] - posArray[fromIdx + 1]) * prog;
            pulseArray[p * 3 + 2] = posArray[fromIdx + 2] + (posArray[toIdx + 2] - posArray[fromIdx + 2]) * prog;
          }
        }

        pulsePosAttr.needsUpdate = true;
      }

      // Gentle continuous rotation of entire cluster
      if (!prefersReducedMotion) {
        particlesMesh.rotation.y = elapsedTime * 0.025;
        linesMesh.rotation.y = elapsedTime * 0.025;
        pulsesMesh.rotation.y = elapsedTime * 0.025;
      }

      // Camera parallax tilt
      camera.position.x += (currentMouseX * 1.5 - camera.position.x) * 0.05;
      camera.position.y += (-currentMouseY * 1.5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    if (prefersReducedMotion) {
      // Render static frame for reduced motion users
      particlesMaterial.opacity = 0.85;
      lineMaterial.opacity = 0.16;
      renderer.render(scene, camera);
    } else {
      animate();
    }

    // Cleanup Resources
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      particlesGeometry.dispose();
      particlesMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      pulseGeometry.dispose();
      pulseMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};
