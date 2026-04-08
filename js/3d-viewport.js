// ===== 3D VIEWPORT - THREE.JS WITH FALLBACK =====
class ReactorViewport {
    constructor(containerId) {
        this.containerId = containerId;
        this.container = null;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.reactor = null;
        this.animationId = null;
        this.rotationSpeed = 0.005;
        this.useThreeJS = false;
        this.canvas2D = null;
        this.ctx2D = null;
        
        // State for rendering
        this.coreTemp = 250;
        this.pressure = 15.5;
        this.power = 75;
        this.scramActive = false;
        this.controlRodsPosition = 50;
        
        // Wait for container to exist
        this.waitForContainer();
    }

    waitForContainer() {
        const checkContainer = () => {
            this.container = document.getElementById(this.containerId);
            if (this.container && this.container.clientWidth > 0) {
                console.log('Container found, initializing viewport...');
                this.init();
            } else {
                console.log('Waiting for container...');
                setTimeout(checkContainer, 100);
            }
        };
        checkContainer();
    }

    init() {
        console.log('Three.js available:', typeof THREE !== 'undefined');
        this.useThreeJS = false; // Force 2D for now, more reliable
        
        try {
            this.init2DFallback();
            console.log('2D viewport initialized successfully');
        } catch (error) {
            console.error('Error initializing viewport:', error);
        }
    }

    init3D() {
        // Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0a0a);
        
        // Camera
        const aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1000);
        this.camera.position.set(0, 5, 15);
        this.camera.lookAt(0, 2, 0);
        
        // Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);
        
        // Lighting
        this.setupLighting();
        
        // Build reactor model
        this.buildReactor();
        
        // Add grid floor
        this.addGridFloor();
        
        // Start animation loop
        this.animate();
        
        // Handle resize
        window.addEventListener('resize', () => this.onResize());
    }

    init2DFallback() {
        console.log('Initializing 2D fallback...');
        
        // Create 2D canvas
        this.canvas2D = document.createElement('canvas');
        this.canvas2D.width = Math.max(400, this.container.clientWidth);
        this.canvas2D.height = Math.max(300, this.container.clientHeight);
        
        console.log('Canvas size:', this.canvas2D.width, 'x', this.canvas2D.height);
        
        try {
            this.ctx2D = this.canvas2D.getContext('2d');
            if (!this.ctx2D) {
                throw new Error('Could not get 2D context');
            }
            
            // Clear container and add canvas
            this.container.innerHTML = '';
            this.container.style.position = 'relative';
            this.container.style.overflow = 'hidden';
            this.container.appendChild(this.canvas2D);
            
            console.log('Canvas added to container');
            
            // Draw initial frame
            this.drawReactor2D();
            
            // Start animation loop
            this.animate2D();
            
            console.log('2D animation started');
            
        } catch (error) {
            console.error('Error in init2DFallback:', error);
            // Last resort - show error message
            this.container.innerHTML = `
                <div style="color: #00ff00; font-family: monospace; padding: 20px; text-align: center;">
                    <p style="color: #ffd700; font-size: 16px;">⚠ СИСТЕМА МОНИТОРИНГА</p>
                    <p>Реактор РБМК-1000</p>
                    <p style="color: #888; font-size: 11px;">Визуализация недоступна</p>
                </div>
            `;
        }
    }

    drawReactor2D() {
        const ctx = this.ctx2D;
        const w = this.canvas2D.width;
        const h = this.canvas2D.height;
        
        // Clear
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, w, h);
        
        const centerX = w / 2;
        const centerY = h / 2 + 30;
        const scale = Math.min(w, h) / 400;
        
        // Grid lines
        ctx.strokeStyle = '#222';
        ctx.lineWidth = 1;
        for (let i = 0; i < w; i += 40) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, h);
            ctx.stroke();
        }
        for (let i = 0; i < h; i += 40) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(w, i);
            ctx.stroke();
        }
        
        // Reactor vessel (circle)
        ctx.strokeStyle = '#666';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(centerX, centerY - 20 * scale, 80 * scale, 0, Math.PI * 2);
        ctx.stroke();
        
        // Reactor dome
        ctx.beginPath();
        ctx.arc(centerX, centerY - 60 * scale, 80 * scale, Math.PI, 0);
        ctx.stroke();
        
        // Containment (dashed circle)
        ctx.strokeStyle = 'rgba(100, 100, 100, 0.3)';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.arc(centerX, centerY - 20 * scale, 120 * scale, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Cooling pipes
        ctx.strokeStyle = '#888';
        ctx.lineWidth = 4;
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const x1 = centerX + Math.cos(angle) * 85 * scale;
            const y1 = centerY - 20 * scale + Math.sin(angle) * 85 * scale;
            const x2 = centerX + Math.cos(angle) * 115 * scale;
            const y2 = centerY - 20 * scale + Math.sin(angle) * 115 * scale;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
        
        // Steam generators (side rectangles)
        ctx.fillStyle = '#555';
        ctx.strokeStyle = '#777';
        ctx.lineWidth = 2;
        [-1, 1].forEach(side => {
            const x = centerX + side * 160 * scale;
            const y = centerY - 40 * scale;
            ctx.fillRect(x - 25 * scale, y, 50 * scale, 80 * scale);
            ctx.strokeRect(x - 25 * scale, y, 50 * scale, 80 * scale);
        });
        
        // Cooling tower (hyperbola shape)
        ctx.strokeStyle = 'rgba(120, 120, 120, 0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        const towerX = centerX - 200 * scale;
        ctx.moveTo(towerX - 30 * scale, centerY + 40 * scale);
        ctx.quadraticCurveTo(towerX - 20 * scale, centerY - 40 * scale, towerX - 35 * scale, centerY - 80 * scale);
        ctx.moveTo(towerX + 30 * scale, centerY + 40 * scale);
        ctx.quadraticCurveTo(towerX + 20 * scale, centerY - 40 * scale, towerX + 35 * scale, centerY - 80 * scale);
        ctx.stroke();
        
        // Base platform
        ctx.fillStyle = '#444';
        ctx.fillRect(centerX - 180 * scale, centerY + 40 * scale, 360 * scale, 10 * scale);
        
        // Warning stripes
        for (let i = 0; i < 12; i++) {
            ctx.fillStyle = i % 2 === 0 ? '#cc0000' : '#ffcc00';
            ctx.fillRect(
                centerX - 180 * scale + i * 30 * scale,
                centerY + 45 * scale,
                30 * scale,
                5 * scale
            );
        }
        
        // Control rods (vertical lines at top)
        const rodPosition = this.controlRodsPosition || 50;
        const rodY = centerY - 100 * scale + (rodPosition / 100) * 40 * scale;
        ctx.strokeStyle = '#cc0000';
        ctx.lineWidth = 3;
        for (let i = 0; i < 5; i++) {
            const x = centerX + (i - 2) * 15 * scale;
            ctx.beginPath();
            ctx.moveTo(x, rodY);
            ctx.lineTo(x, centerY - 60 * scale);
            ctx.stroke();
        }
        
        // Soviet star at top
        this.drawStar2D(centerX, centerY - 120 * scale, 5, 20 * scale, 10 * scale);
        
        // Indicator lights
        const temps = [this.coreTemp || 250, this.pressure || 15.5, this.power || 75];
        const maxVals = [400, 25, 100];
        const lightX = [centerX - 60 * scale, centerX, centerX + 60 * scale];
        
        lightX.forEach((x, i) => {
            const ratio = temps[i] / maxVals[i];
            let color;
            if (ratio < 0.6) color = '#00ff00';
            else if (ratio < 0.8) color = '#ffff00';
            else color = '#ff0000';
            
            ctx.fillStyle = color;
            ctx.shadowColor = color;
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(x, centerY - 80 * scale, 8 * scale, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
        });
        
        // Labels
        ctx.fillStyle = '#ffd700';
        ctx.font = `${12 * scale}px monospace`;
        ctx.textAlign = 'center';
        ctx.fillText('РЕАКТОР РБМК-1000', centerX, centerY + 80 * scale);
        ctx.fillStyle = '#888';
        ctx.font = `${10 * scale}px monospace`;
        ctx.fillText('АКТИВНАЯ ЗОНА', centerX, centerY + 95 * scale);
        
        // Status indicator
        let statusText = 'НОРМА';
        let statusColor = '#00ff00';
        if (this.scramActive) {
            statusText = 'АЗ-5';
            statusColor = '#ff0000';
        } else if (temps[0] > 350 || temps[1] > 19) {
            statusText = 'ОПАСНОСТЬ';
            statusColor = '#ff0000';
        } else if (temps[0] > 300 || temps[1] > 17) {
            statusText = 'ВНИМАНИЕ';
            statusColor = '#ffff00';
        }
        
        ctx.fillStyle = statusColor;
        ctx.font = `bold ${14 * scale}px monospace`;
        ctx.fillText(`[ ${statusText} ]`, centerX, centerY - 150 * scale);
        
        // Temperature gauge
        const gaugeX = 40;
        const gaugeY = 40;
        const gaugeW = 20;
        const gaugeH = h - 80;
        ctx.fillStyle = '#222';
        ctx.fillRect(gaugeX, gaugeY, gaugeW, gaugeH);
        ctx.strokeStyle = '#444';
        ctx.lineWidth = 2;
        ctx.strokeRect(gaugeX, gaugeY, gaugeW, gaugeH);
        
        const tempPercent = Math.min(1, temps[0] / 400);
        const fillH = gaugeH * tempPercent;
        const gradient = ctx.createLinearGradient(0, gaugeY + gaugeH, 0, gaugeY);
        gradient.addColorStop(0, '#00ff00');
        gradient.addColorStop(0.6, '#ffff00');
        gradient.addColorStop(1, '#ff0000');
        ctx.fillStyle = gradient;
        ctx.fillRect(gaugeX + 2, gaugeY + gaugeH - fillH, gaugeW - 4, fillH);
        
        ctx.fillStyle = '#888';
        ctx.font = '9px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('°C', gaugeX, gaugeY - 5);
    }

    drawStar2D(cx, cy, points, outerR, innerR) {
        const ctx = this.ctx2D;
        const angle = Math.PI / points;
        
        ctx.fillStyle = '#cc0000';
        ctx.beginPath();
        for (let i = 0; i < points * 2; i++) {
            const r = i % 2 === 0 ? outerR : innerR;
            const x = cx + Math.cos(i * angle - Math.PI / 2) * r;
            const y = cy + Math.sin(i * angle - Math.PI / 2) * r;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
    }

    animate2D() {
        this.animationId = requestAnimationFrame(() => this.animate2D());
        this.drawReactor2D();
    }

    onResize2D() {
        this.canvas2D.width = this.container.clientWidth;
        this.canvas2D.height = this.container.clientHeight;
    }

    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        this.scene.add(ambientLight);
        
        // Main directional light
        const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
        mainLight.position.set(10, 10, 10);
        this.scene.add(mainLight);
        
        // Red accent light (soviet style)
        const redLight = new THREE.PointLight(0xff0000, 0.5, 20);
        redLight.position.set(-5, 3, -5);
        this.scene.add(redLight);
        
        // Green indicator light
        const greenLight = new THREE.PointLight(0x00ff00, 0.3, 15);
        greenLight.position.set(5, 2, 5);
        this.scene.add(greenLight);
    }

    buildReactor() {
        this.reactor = new THREE.Group();
        
        // Materials
        const steelMaterial = new THREE.MeshPhongMaterial({
            color: 0x666666,
            shininess: 80,
            specular: 0x333333
        });
        
        const concreteMaterial = new THREE.MeshPhongMaterial({
            color: 0x555555,
            shininess: 20
        });
        
        const redMaterial = new THREE.MeshPhongMaterial({
            color: 0xcc0000,
            shininess: 60,
            emissive: 0x330000
        });
        
        const glowMaterial = new THREE.MeshPhongMaterial({
            color: 0x00ff00,
            emissive: 0x00aa00,
            transparent: true,
            opacity: 0.6
        });
        
        // Reactor vessel (main cylinder)
        const vesselGeometry = new THREE.CylinderGeometry(2, 2, 6, 32);
        const vessel = new THREE.Mesh(vesselGeometry, steelMaterial);
        vessel.position.y = 3;
        this.reactor.add(vessel);
        
        // Reactor dome
        const domeGeometry = new THREE.SphereGeometry(2, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
        const dome = new THREE.Mesh(domeGeometry, steelMaterial);
        dome.position.y = 6;
        this.reactor.add(dome);
        
        // Containment building
        const containmentGeometry = new THREE.CylinderGeometry(3.5, 4, 8, 32, 1, true);
        const containmentMaterial = new THREE.MeshPhongMaterial({
            color: 0x777777,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.3
        });
        const containment = new THREE.Mesh(containmentGeometry, containmentMaterial);
        containment.position.y = 4;
        this.reactor.add(containment);
        
        // Cooling pipes (vertical)
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const pipeGeometry = new THREE.CylinderGeometry(0.15, 0.15, 7, 16);
            const pipe = new THREE.Mesh(pipeGeometry, steelMaterial);
            pipe.position.x = Math.cos(angle) * 2.5;
            pipe.position.z = Math.sin(angle) * 2.5;
            pipe.position.y = 3.5;
            this.reactor.add(pipe);
        }
        
        // Control rods (top)
        this.controlRods = [];
        for (let i = 0; i < 5; i++) {
            const rodGeometry = new THREE.CylinderGeometry(0.08, 0.08, 3, 16);
            const rod = new THREE.Mesh(rodGeometry, redMaterial);
            rod.position.x = (i - 2) * 0.5;
            rod.position.y = 7.5;
            rod.position.z = 0;
            this.reactor.add(rod);
            this.controlRods.push(rod);
        }
        
        // Steam generators (side cylinders)
        for (let i = 0; i < 2; i++) {
            const steamGenGeometry = new THREE.CylinderGeometry(1.2, 1.2, 4, 32);
            const steamGen = new THREE.Mesh(steamGenGeometry, steelMaterial);
            steamGen.position.x = (i === 0 ? -4.5 : 4.5);
            steamGen.position.y = 2;
            steamGen.position.z = 0;
            this.reactor.add(steamGen);
            
            // Steam generator top
            const topGeometry = new THREE.SphereGeometry(1.2, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
            const top = new THREE.Mesh(topGeometry, steelMaterial);
            top.position.x = (i === 0 ? -4.5 : 4.5);
            top.position.y = 4;
            top.position.z = 0;
            this.reactor.add(top);
        }
        
        // Cooling tower (hyperboloid approximation)
        const towerPoints = [];
        for (let i = 0; i <= 20; i++) {
            const t = i / 20;
            const radius = 1.5 + Math.pow(t - 0.5, 2) * 4;
            towerPoints.push(new THREE.Vector2(radius, t * 10));
        }
        const towerGeometry = new THREE.LatheGeometry(towerPoints, 32);
        const towerMaterial = new THREE.MeshPhongMaterial({
            color: 0x888888,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.4
        });
        const tower = new THREE.Mesh(towerGeometry, towerMaterial);
        tower.position.x = -8;
        tower.position.z = -3;
        this.reactor.add(tower);
        
        // Base platform
        const baseGeometry = new THREE.BoxGeometry(20, 0.3, 15);
        const base = new THREE.Mesh(baseGeometry, concreteMaterial);
        base.position.y = 0.15;
        this.reactor.add(base);
        
        // Warning stripes on base
        for (let i = 0; i < 10; i++) {
            const stripeGeometry = new THREE.BoxGeometry(1, 0.35, 0.3);
            const stripeMaterial = i % 2 === 0 ? redMaterial : new THREE.MeshPhongMaterial({ color: 0xffcc00 });
            const stripe = new THREE.Mesh(stripeGeometry, stripeMaterial);
            stripe.position.x = -4.5 + i * 1;
            stripe.position.z = 7;
            this.reactor.add(stripe);
        }
        
        // Soviet star on top
        const starShape = this.createStarShape(5, 1.5, 0.7);
        const starGeometry = new THREE.ExtrudeGeometry(starShape, { depth: 0.2, bevelEnabled: false });
        const star = new THREE.Mesh(starGeometry, redMaterial);
        star.position.y = 8.5;
        star.position.z = 2.1;
        star.rotation.z = Math.PI;
        this.reactor.add(star);
        
        // Indicator lights
        this.indicatorLights = [];
        const lightPositions = [
            { x: -3, y: 6, z: 2.2 },
            { x: 0, y: 6, z: 2.2 },
            { x: 3, y: 6, z: 2.2 }
        ];
        
        lightPositions.forEach(pos => {
            const lightGeometry = new THREE.SphereGeometry(0.15, 16, 16);
            const light = new THREE.Mesh(lightGeometry, glowMaterial.clone());
            light.position.set(pos.x, pos.y, pos.z);
            this.reactor.add(light);
            this.indicatorLights.push(light);
        });
        
        this.scene.add(this.reactor);
    }

    createStarShape(points, outerRadius, innerRadius) {
        const shape = new THREE.Shape();
        const angle = Math.PI / points;
        
        for (let i = 0; i < points * 2; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const x = Math.cos(i * angle - Math.PI / 2) * radius;
            const y = Math.sin(i * angle - Math.PI / 2) * radius;
            
            if (i === 0) {
                shape.moveTo(x, y);
            } else {
                shape.lineTo(x, y);
            }
        }
        
        shape.closePath();
        return shape;
    }

    addGridFloor() {
        const gridHelper = new THREE.GridHelper(30, 30, 0x333333, 0x222222);
        this.scene.add(gridHelper);
    }

    updateIndicators(state) {
        if (this.useThreeJS) {
            if (!this.indicatorLights || this.indicatorLights.length < 3) return;
            
            // Temperature indicator
            const tempRatio = state.coreTemperature / 400;
            this.indicatorLights[0].material.color.setHex(
                tempRatio < 0.6 ? 0x00ff00 : tempRatio < 0.8 ? 0xffff00 : 0xff0000
            );
            this.indicatorLights[0].material.emissive.setHex(
                tempRatio < 0.6 ? 0x00aa00 : tempRatio < 0.8 ? 0xaaaa00 : 0xaa0000
            );
            
            // Pressure indicator
            const pressureRatio = state.pressure / 22;
            this.indicatorLights[1].material.color.setHex(
                pressureRatio < 0.6 ? 0x00ff00 : pressureRatio < 0.8 ? 0xffff00 : 0xff0000
            );
            this.indicatorLights[1].material.emissive.setHex(
                pressureRatio < 0.6 ? 0x00aa00 : pressureRatio < 0.8 ? 0xaaaa00 : 0xaa0000
            );
            
            // Power indicator
            const powerRatio = state.reactorPower / 100;
            this.indicatorLights[2].material.color.setHex(
                powerRatio < 0.6 ? 0x00ff00 : powerRatio < 0.8 ? 0xffff00 : 0xff0000
            );
            this.indicatorLights[2].material.emissive.setHex(
                powerRatio < 0.6 ? 0x00aa00 : powerRatio < 0.8 ? 0xaaaa00 : 0xaa0000
            );
        } else {
            // Update 2D values
            this.coreTemp = state.coreTemperature;
            this.pressure = state.pressure;
            this.power = state.reactorPower;
            this.scramActive = state.scramActive;
        }
    }

    updateControlRodsVisual(position) {
        if (this.useThreeJS) {
            if (!this.controlRods || this.controlRods.length < 5) return;
            
            const yPos = 7.5 - (position / 100) * 2;
            this.controlRods.forEach(rod => {
                rod.position.y = yPos;
            });
        } else {
            this.controlRodsPosition = position;
        }
    }

    animate() {
        if (this.useThreeJS) {
            this.animationId = requestAnimationFrame(() => this.animate());
            
            // Slow rotation for cinematic effect
            if (this.reactor) {
                this.reactor.rotation.y += this.rotationSpeed;
            }
            
            this.renderer.render(this.scene, this.camera);
        }
    }

    onResize() {
        if (this.useThreeJS) {
            const aspect = this.container.clientWidth / this.container.clientHeight;
            this.camera.aspect = aspect;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        }
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.renderer) {
            this.container.removeChild(this.renderer.domElement);
        }
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ReactorViewport;
}
