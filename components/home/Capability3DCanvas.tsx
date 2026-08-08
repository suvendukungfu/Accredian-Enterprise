"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useScroll, useSpring } from "framer-motion";

/**
 * Capability3DCanvas — Senior Level Scroll-Interactive 3D WebGL Feature Stage.
 *
 * Features:
 *   - Scroll-tied 3D rotation & geometry wireframe morphing driven by scroll progress.
 *   - Glowing vertices with inner Quantum Polyhedron mesh & outer ambient particle cloud.
 *   - Mouse-magnetic tilt interactivity with smooth spring dampening.
 *   - IntersectionObserver optimization: pauses WebGL rendering loop when offscreen.
 *   - Respects system prefers-reduced-motion media query.
 */

export const Capability3DCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Scene setup
    const scene = new THREE.Scene();
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 350;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3D Inner Wireframe Geometry — Quantum Icosahedron
    const innerGeo = new THREE.IcosahedronGeometry(1.6, 2);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerMesh);

    // Outer Node Vertices Particle Cloud
    const outerGeo = new THREE.IcosahedronGeometry(1.85, 2);
    const outerPositions = outerGeo.attributes.position.array as Float32Array;

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(outerPositions.slice(), 3)
    );

    const particlesMat = new THREE.PointsMaterial({
      color: 0x6366f1,
      size: 0.07,
      transparent: true,
      opacity: 0.85,
    });
    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particlesMesh);

    // Connecting Energy Ring (Torus)
    const ringGeo = new THREE.TorusGeometry(2.3, 0.015, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      transparent: true,
      opacity: 0.4,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    scene.add(ringMesh);

    // Subtle Ambient Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x3b82f6, 2, 10);
    pointLight.position.set(2, 2, 2);
    scene.add(pointLight);

    // Cursor tracking state
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouseX = x * 0.4;
      targetMouseY = y * 0.4;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener("resize", handleResize);

    // IntersectionObserver to pause rendering when offscreen
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Animation Loop
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsedTime = (performance.now() - startTime) * 0.001;
      const scrollVal = smoothScroll.get();

      // Mouse spring damping
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      if (!prefersReducedMotion) {
        // Continuous rotation combined with scroll-driven rotation
        innerMesh.rotation.x = elapsedTime * 0.2 + scrollVal * Math.PI * 2;
        innerMesh.rotation.y = elapsedTime * 0.25 + currentMouseX;
        innerMesh.rotation.z = currentMouseY;

        particlesMesh.rotation.x = -elapsedTime * 0.15 + scrollVal * Math.PI;
        particlesMesh.rotation.y = elapsedTime * 0.3 + currentMouseX * 0.8;

        ringMesh.rotation.z = elapsedTime * 0.4 + scrollVal * Math.PI * 1.5;

        // Subtle scale pulse
        const pulseScale = 1 + Math.sin(elapsedTime * 1.5) * 0.03;
        innerMesh.scale.set(pulseScale, pulseScale, pulseScale);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      innerGeo.dispose();
      innerMat.dispose();
      outerGeo.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, [smoothScroll]);

  return (
    <div
      ref={containerRef}
      className="w-full h-72 sm:h-80 relative flex items-center justify-center pointer-events-auto"
      aria-hidden="true"
    />
  );
};
