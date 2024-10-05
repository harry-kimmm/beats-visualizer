import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass';
import './Visualizer.css';

const Visualizer = ({ song }) => {
    const navigate = useNavigate();
    const soundRef = useRef(null);

    useEffect(() => {
        if (!song) return;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer.outputColorSpace = THREE.SRGBColorSpace;

        const renderScene = new RenderPass(scene, camera);
        const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1, 0.8, 0.5);
        const bloomComposer = new EffectComposer(renderer);
        bloomComposer.addPass(renderScene);
        bloomComposer.addPass(bloomPass);
        bloomComposer.addPass(new OutputPass());

        camera.position.set(0, -2, 14);
        camera.lookAt(0, 0, 0);

        const uniforms = {
            u_time: { type: 'f', value: 0.0 },
            u_frequency: { type: 'f', value: 0.0 },
            u_red: { type: 'f', value: 1.0 },
            u_green: { type: 'f', value: 0.5 },
            u_blue: { type: 'f', value: 0.2 }
        };

        const mat = new THREE.ShaderMaterial({
            uniforms,
            vertexShader: document.getElementById('vertexshader').textContent,
            fragmentShader: document.getElementById('fragmentshader').textContent
        });

        const geo = new THREE.IcosahedronGeometry(4, 30);
        const mesh = new THREE.Mesh(geo, mat);
        scene.add(mesh);
        mesh.material.wireframe = true;

        const listener = new THREE.AudioListener();
        camera.add(listener);

        const sound = new THREE.Audio(listener);
        soundRef.current = sound;

        const audioLoader = new THREE.AudioLoader();
        audioLoader.load(song.file, function (buffer) {
            sound.setBuffer(buffer);
            sound.setLoop(true);
            sound.setVolume(0.5);
            sound.play();
        });

        const analyser = new THREE.AudioAnalyser(sound, 32);

        let mouseX = 0;
        let mouseY = 0;
        document.addEventListener('mousemove', (e) => {
            const windowHalfX = window.innerWidth / 2;
            const windowHalfY = window.innerHeight / 2;
            mouseX = (e.clientX - windowHalfX) / 100;
            mouseY = (e.clientY - windowHalfY) / 100;
        });

        const clock = new THREE.Clock();
        const animate = () => {
            camera.position.x += (mouseX - camera.position.x) * 0.05;
            camera.position.y += (-mouseY - camera.position.y) * 0.5;
            camera.lookAt(scene.position);

            uniforms.u_time.value = clock.getElapsedTime();
            uniforms.u_frequency.value = analyser.getAverageFrequency();

            const frequency = analyser.getAverageFrequency();
            mesh.scale.set(1 + frequency / 256, 1 + frequency / 256, 1 + frequency / 256);
            uniforms.u_red.value = frequency / 512;

            bloomComposer.render();
            requestAnimationFrame(animate);
        };
        animate();

        return () => {
            sound.stop();
            document.body.removeChild(renderer.domElement);
        };
    }, [song]);

    // Go back a page and reload
    const handleBack = () => {
        if (soundRef.current) {
            soundRef.current.stop();
        }
        navigate(-1);
        setTimeout(() => {
            window.location.reload();
        }, 100);
    };

    return (
        <div>
            <button onClick={handleBack}>Back to Home</button>
        </div>
    );
};

export default Visualizer;
