import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import "./LogoLoader.scss"

const LogoLoader: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // **Scene setup**
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xb0e0e6); // Even lighter sky blue background

        // **Camera setup**
        const camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            1,
            1000,
        );
        camera.position.set(0, 8, 45); // Moved camera back and up to accommodate larger gate
        camera.lookAt(0, 5.5, 0); // Adjusted lookAt to center the larger gate

        // **Renderer setup**
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // **Lights**
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
        directionalLight.position.set(15, 30, 15);
        scene.add(directionalLight);

        // **Materials**
        const redMaterial = new THREE.MeshStandardMaterial({ color: 0xff3b3b });
        const blackMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
        const goldMaterial = new THREE.MeshStandardMaterial({ color: 0xffd700 });
        const shideMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide,
        });

        // **Torii Gate Group**
        const toriiGate = new THREE.Group();

        // **Scaling factor**
        const scaleFactor = 1.9; // Increase gate size by 90%

        // **Curved top beam (kasagi)**
        const kasagiCurve = new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(-5.25 * scaleFactor, 0, 0),
            new THREE.Vector3(0, 1.2 * scaleFactor, 0),
            new THREE.Vector3(5.25 * scaleFactor, 0, 0),
        );
        const kasagiGeometry = new THREE.TubeGeometry(
            kasagiCurve,
            100,
            0.3 * scaleFactor,
            16,
            false,
        );
        const kasagi = new THREE.Mesh(kasagiGeometry, redMaterial);
        kasagi.position.y = 6.75 * scaleFactor;
        toriiGate.add(kasagi);

        // **Top beam (shimaki)**
        const shimakiGeometry = new THREE.BoxGeometry(
            10.5 * scaleFactor,
            0.45 * scaleFactor,
            0.75 * scaleFactor,
        );
        const shimaki = new THREE.Mesh(shimakiGeometry, redMaterial);
        shimaki.position.set(0, 6 * scaleFactor, 0);
        toriiGate.add(shimaki);

        // **Gakuzuka (Name Plaque)**
        const gakuzukaGeometry = new THREE.BoxGeometry(
            1 * scaleFactor,
            2 * scaleFactor,
            0.2 * scaleFactor,
        );
        const gakuzuka = new THREE.Mesh(gakuzukaGeometry, blackMaterial);
        gakuzuka.position.set(0, 4.75 * scaleFactor, 0.4 * scaleFactor);
        toriiGate.add(gakuzuka);

        // **Left and right pillars (hashira)**
        const pillarGeometry = new THREE.CylinderGeometry(
            0.45 * scaleFactor,
            0.45 * scaleFactor,
            7.5 * scaleFactor,
            32,
        );
        const leftPillar = new THREE.Mesh(pillarGeometry, redMaterial);
        leftPillar.position.set(-3.75 * scaleFactor, 3.75 * scaleFactor, 0);
        toriiGate.add(leftPillar);

        const rightPillar = new THREE.Mesh(pillarGeometry, redMaterial);
        rightPillar.position.set(3.75 * scaleFactor, 3.75 * scaleFactor, 0);
        toriiGate.add(rightPillar);

        // **Tie beam (nuki)**
        const nukiGeometry = new THREE.BoxGeometry(
            7.5 * scaleFactor,
            0.3 * scaleFactor,
            0.75 * scaleFactor,
        );
        const nuki = new THREE.Mesh(nukiGeometry, redMaterial);
        nuki.position.set(0, 3.75 * scaleFactor, 0);
        toriiGate.add(nuki);

        // **Sorin (Finials on top of pillars)**
        const sorinGeometry = new THREE.ConeGeometry(
            0.3 * scaleFactor,
            0.5 * scaleFactor,
            32,
        );
        const leftSorin = new THREE.Mesh(sorinGeometry, goldMaterial);
        leftSorin.position.set(-3.75 * scaleFactor, 7.5 * scaleFactor, 0);
        toriiGate.add(leftSorin);

        const rightSorin = new THREE.Mesh(sorinGeometry, goldMaterial);
        rightSorin.position.set(3.75 * scaleFactor, 7.5 * scaleFactor, 0);
        toriiGate.add(rightSorin);

        // **Bases of pillars**
        const baseGeometry = new THREE.CylinderGeometry(
            0.6 * scaleFactor,
            0.6 * scaleFactor,
            0.3 * scaleFactor,
            32,
        );
        const leftBase = new THREE.Mesh(baseGeometry, blackMaterial);
        leftBase.position.set(-3.75 * scaleFactor, 0.15 * scaleFactor, 0);
        toriiGate.add(leftBase);

        const rightBase = new THREE.Mesh(baseGeometry, blackMaterial);
        rightBase.position.set(3.75 * scaleFactor, 0.15 * scaleFactor, 0);
        toriiGate.add(rightBase);

        // **Shimenawa (Sacred Rope)**
        const ropeGeometry = new THREE.TorusKnotGeometry(
            3.75 * scaleFactor,
            0.05 * scaleFactor,
            100,
            16,
            2,
            3,
        );
        const shimenawa = new THREE.Mesh(ropeGeometry, goldMaterial);
        shimenawa.position.set(0, 4.05 * scaleFactor, 0.45 * scaleFactor);
        toriiGate.add(shimenawa);

        // **Shide (Paper Streamers)**
        const shideGroup = new THREE.Group();
        const shideGeometry = new THREE.PlaneGeometry(
            0.3 * scaleFactor,
            0.75 * scaleFactor,
        );

        for (let i = -3; i <= 3; i++) {
            const shide = new THREE.Mesh(shideGeometry, shideMaterial);
            shide.position.set(
                i * 0.75 * scaleFactor,
                3.3 * scaleFactor,
                0.525 * scaleFactor,
            );
            shide.rotation.z = Math.PI / 4;
            shideGroup.add(shide);
        }
        toriiGate.add(shideGroup);

        // **Rotate the gate slightly for 3D appearance**
        toriiGate.rotation.y = Math.PI / 18; // Rotate by 10 degrees

        // **Set initial visibility to zero for animation**
        toriiGate.traverse(child => {
            if (child instanceof THREE.Mesh) {
                child.material.opacity = 0;
                child.material.transparent = true;
            }
        });

        // **Add Torii gate to the scene**
        scene.add(toriiGate);

        // **Particle system (falling petals remains unchanged)**

        // **Particle system (upgraded falling petals)**
        const particleCount = 500;
        const positions: number[] = [];
        const velocities: number[] = [];
        const rotations: number[] = [];
        const scales: number[] = [];

        for (let i = 0; i < particleCount; i++) {
            positions.push(
                Math.random() * 40 - 20,
                Math.random() * 20 + 10,
                Math.random() * 40 - 20,
            );
            velocities.push(
                (Math.random() - 0.5) * 0.02,
                -Math.random() * 0.1 - 0.05,
                (Math.random() - 0.5) * 0.02,
            );
            rotations.push(Math.random() * Math.PI * 2);
            scales.push(Math.random() * 0.5 + 1);
        }

        // **Create petal geometry (same as before)**
        const petalShape = new THREE.Shape();
        petalShape.moveTo(0, 0);
        petalShape.quadraticCurveTo(0.1, 0.2, 0, 0.4);
        petalShape.quadraticCurveTo(-0.1, 0.2, 0, 0);

        const petalGeometry = new THREE.ShapeGeometry(petalShape);
        const petalMaterial = new THREE.MeshBasicMaterial({
            color: 0xffc0cb,
            side: THREE.DoubleSide,
        });

        const petals = new THREE.InstancedMesh(
            petalGeometry,
            petalMaterial,
            particleCount,
        );
        const dummy = new THREE.Object3D();

        for (let i = 0; i < particleCount; i++) {
            dummy.position.set(
                positions[i * 3],
                positions[i * 3 + 1],
                positions[i * 3 + 2],
            );
            dummy.rotation.set(0, 0, rotations[i]);
            dummy.scale.set(scales[i], scales[i], scales[i]);
            dummy.updateMatrix();
            petals.setMatrixAt(i, dummy.matrix);
        }

        scene.add(petals);

        // **Animation variables**
        const clock = new THREE.Clock();
        let loadingProgress = 0;

        // **Animation loop**
        const animate = () => {
            requestAnimationFrame(animate);

            const delta = clock.getDelta();
            const time = clock.getElapsedTime();

            // **Loading animation: Fade-in effect**
            loadingProgress += delta * 0.5;
            toriiGate.traverse(child => {
                if (child instanceof THREE.Mesh && child.material.transparent) {
                    child.material.opacity = Math.min(1, loadingProgress);
                }
            });

            // **Animate shide (swaying effect)**
            shideGroup.children.forEach((shide, index) => {
                shide.rotation.z = Math.sin(time * 2 + index) * 0.1 + Math.PI / 4;
            });

            // **Update petals**
            for (let i = 0; i < particleCount; i++) {
                positions[i * 3] += velocities[i * 3] * delta * 60;
                positions[i * 3 + 1] += velocities[i * 3 + 1] * delta * 60;
                positions[i * 3 + 2] += velocities[i * 3 + 2] * delta * 60;
                rotations[i] += (Math.random() - 0.5) * 0.1;

                if (positions[i * 3 + 1] < 0) {
                    positions[i * 3] = Math.random() * 40 - 20;
                    positions[i * 3 + 1] = Math.random() * 20 + 10;
                    positions[i * 3 + 2] = Math.random() * 40 - 20;
                    scales[i] = Math.random() * 0.5 + 1;
                }

                dummy.position.set(
                    positions[i * 3],
                    positions[i * 3 + 1],
                    positions[i * 3 + 2],
                );
                dummy.rotation.set(0, 0, rotations[i]);
                dummy.scale.set(scales[i], scales[i], scales[i]);
                dummy.updateMatrix();
                petals.setMatrixAt(i, dummy.matrix);
            }
            petals.instanceMatrix.needsUpdate = true;

            renderer.render(scene, camera);
        };
        animate();

        // **Handle window resize**
        const handleResize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        };
        window.addEventListener("resize", handleResize);

        // **Clean up**
        return () => {
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="fallback-loader">
            <div className="animation" ref={mountRef}></div>
            <h1 className="logo--header">Pulse Project</h1>
        </div>
    );
};

export default LogoLoader
