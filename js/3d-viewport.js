// ===== 3D VIEWPORT - 2D CANVAS ONLY =====
class ReactorViewport {
    constructor(containerId) {
        this.containerId = containerId;
        this.container = null;
        this.animationId = null;
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
                this.init();
            } else {
                setTimeout(checkContainer, 100);
            }
        };
        checkContainer();
    }

    init() {
        try {
            this.init2DFallback();
        } catch (error) {
            console.error('Error initializing viewport:', error);
        }
    }

    init2DFallback() {
        // Create 2D canvas
        this.canvas2D = document.createElement('canvas');
        this.canvas2D.width = Math.max(400, this.container.clientWidth);
        this.canvas2D.height = Math.max(300, this.container.clientHeight);

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

            // Draw initial frame
            this.drawReactor2D();

            // Start animation loop
            this.animate2D();

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
        } else if (temps[0] > 350 || temps[1] > 20) {
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

    updateIndicators(state) {
        this.coreTemp = state.coreTemperature;
        this.pressure = state.pressure;
        this.power = state.reactorPower;
        this.scramActive = state.scramActive;
    }

    updateControlRodsVisual(position) {
        this.controlRodsPosition = position;
    }

    destroy() {
        if (this.animationId) cancelAnimationFrame(this.animationId);
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ReactorViewport;
}
