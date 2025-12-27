// Monospace Web Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {

    // Добавляем отладочную сетку (можно включить по необходимости)
    function createDebugGrid() {
        const debugGrid = document.createElement('div');
        debugGrid.className = 'debug-grid';
        debugGrid.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: -1;
            background-image: 
                linear-gradient(to right, rgba(255,0,0,0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0,0,255,0.1) 1px, transparent 1px);
            background-size: 0.6em 1.4em;
            display: none;
        `;
        document.body.appendChild(debugGrid);
        return debugGrid;
    }

    // Создаем debug grid
    const debugGrid = createDebugGrid();

    // Добавляем кнопку для переключения debug режима
    const debugToggle = document.createElement('label');
    debugToggle.innerHTML = `
        <input type="checkbox" id="debug-mode" style="margin-right: 0.5em;">
        Debug Grid
    `;
    debugToggle.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: rgba(255, 255, 255, 0.9);
        padding: 0.5em;
        border: 1px solid #ccc;
        font-size: 0.8em;
        cursor: pointer;
        z-index: 1000;
    `;

    // Добавляем toggle только в development режиме (можно убрать для production)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        document.body.appendChild(debugToggle);

        const debugCheckbox = document.getElementById('debug-mode');
        debugCheckbox.addEventListener('change', function() {
            debugGrid.style.display = this.checked ? 'block' : 'none';
        });
    }

    // Плавная прокрутка к якорям
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Подсветка активной секции при скролле
    function highlightActiveSection() {
        const sections = document.querySelectorAll('h2[id]');
        const navLinks = document.querySelectorAll('#TOC a[href^="#"]');

        let currentSection = '';

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = section.id;
            }
        });

        navLinks.forEach(link => {
            const href = link.getAttribute('href').substring(1);
            if (href === currentSection) {
                link.style.fontWeight = 'bold';
                link.style.backgroundColor = '#f0f0f0';
            } else {
                link.style.fontWeight = 'normal';
                link.style.backgroundColor = 'transparent';
            }
        });
    }

    // Обновляем активную секцию при скролле
    let throttleTimer;
    window.addEventListener('scroll', function() {
        if (throttleTimer) return;

        throttleTimer = setTimeout(function() {
            highlightActiveSection();
            throttleTimer = null;
        }, 100);
    });

    // Инициализируем подсветку
    highlightActiveSection();

    // Анимация появления элементов при скролле
    function animateOnScroll() {
        const elements = document.querySelectorAll('h2, .grid, table, figure');

        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top < windowHeight - 50) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Инициализируем стили для анимации
    const elementsToAnimate = document.querySelectorAll('h2, .grid, table, figure');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Запускаем анимацию при загрузке и скролле
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // Добавляем типографские улучшения
    function enhanceTypography() {
        // Заменяем -- на em dash
        const textNodes = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        const nodesToProcess = [];
        let node;

        while (node = textNodes.nextNode()) {
            if (node.nodeValue.includes('--')) {
                nodesToProcess.push(node);
            }
        }

        nodesToProcess.forEach(node => {
            node.nodeValue = node.nodeValue.replace(/--/g, '—');
        });
    }

    enhanceTypography();

    // Gradient Generator Functionality
    class GradientGenerator {
        constructor() {
            this.gradientType = 'linear';
            this.direction = 'to right';
            this.colorStops = [
                { color: '#ff0000', position: 0 },
                { color: '#0000ff', position: 100 }
            ];

            this.init();
        }

        init() {
            this.bindEvents();
            this.updatePreview();
            this.updateCSS();
        }

        bindEvents() {
            // Gradient type change
            document.getElementById('gradient-type').addEventListener('change', (e) => {
                this.gradientType = e.target.value;
                this.toggleDirectionControl();
                this.updatePreview();
                this.updateCSS();
            });

            // Direction change
            document.getElementById('direction').addEventListener('change', (e) => {
                this.direction = e.target.value;
                this.updatePreview();
                this.updateCSS();
            });

            // Add color stop
            document.getElementById('add-color-stop').addEventListener('click', () => {
                this.addColorStop();
            });

            // Export CSS
            document.getElementById('export-css').addEventListener('click', () => {
                this.exportCSS();
            });

            // Dynamic event binding for color stops
            this.bindColorStopEvents();
        }

        bindColorStopEvents() {
            const container = document.getElementById('color-stops-container');

            container.addEventListener('input', (e) => {
                if (e.target.classList.contains('color-input') || e.target.classList.contains('position-input')) {
                    this.updateColorStops();
                    this.updatePreview();
                    this.updateCSS();
                }
            });

            container.addEventListener('click', (e) => {
                if (e.target.classList.contains('remove-stop')) {
                    this.removeColorStop(e.target);
                }
            });
        }

        toggleDirectionControl() {
            const directionGroup = document.getElementById('direction-group');
            if (this.gradientType === 'radial') {
                directionGroup.style.display = 'none';
            } else {
                directionGroup.style.display = 'block';
            }
        }

        addColorStop() {
            const newStop = { color: '#00ff00', position: 50 };
            this.colorStops.push(newStop);
            this.renderColorStops();
            this.updatePreview();
            this.updateCSS();
        }

        removeColorStop(button) {
            const stopElement = button.closest('.color-stop');
            const index = Array.from(stopElement.parentNode.children).indexOf(stopElement);

            if (this.colorStops.length > 2) {
                this.colorStops.splice(index, 1);
                this.renderColorStops();
                this.updatePreview();
                this.updateCSS();
            }
        }

        updateColorStops() {
            const stops = document.querySelectorAll('.color-stop');
            this.colorStops = Array.from(stops).map(stop => ({
                color: stop.querySelector('.color-input').value,
                position: parseInt(stop.querySelector('.position-input').value)
            }));
        }

        renderColorStops() {
            const container = document.getElementById('color-stops-container');
            container.innerHTML = '';

            this.colorStops.forEach((stop, index) => {
                const stopElement = document.createElement('div');
                stopElement.className = 'color-stop';

                stopElement.innerHTML = `
                    <input type="color" class="color-input" value="${stop.color}">
                    <input type="range" class="position-input" min="0" max="100" value="${stop.position}">
                    <span class="position-value">${stop.position}%</span>
                    <button class="remove-stop" ${this.colorStops.length <= 2 ? 'style="display: none;"' : ''}>×</button>
                `;

                container.appendChild(stopElement);
            });

            // Update position values dynamically
            const positionInputs = container.querySelectorAll('.position-input');
            const positionValues = container.querySelectorAll('.position-value');

            positionInputs.forEach((input, index) => {
                input.addEventListener('input', () => {
                    positionValues[index].textContent = input.value + '%';
                });
            });
        }

        generateGradientCSS() {
            const stops = this.colorStops
                .sort((a, b) => a.position - b.position)
                .map(stop => `${stop.color} ${stop.position}%`)
                .join(', ');

            if (this.gradientType === 'radial') {
                return `radial-gradient(circle, ${stops})`;
            } else {
                return `linear-gradient(${this.direction}, ${stops})`;
            }
        }

        updatePreview() {
            const preview = document.getElementById('gradient-preview');
            const gradientCSS = this.generateGradientCSS();
            preview.style.background = gradientCSS;
        }

        updateCSS() {
            const cssElement = document.getElementById('css-code');
            const gradientCSS = this.generateGradientCSS();
            cssElement.textContent = `background: ${gradientCSS};`;
        }

        exportCSS() {
            const gradientCSS = this.generateGradientCSS();
            const cssContent = `/* Custom Gradient CSS */
.gradient-background {
    background: ${gradientCSS};
    /* Additional properties */
    width: 100%;
    height: 200px;
    border-radius: 8px;
}`;

            const blob = new Blob([cssContent], { type: 'text/css' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = 'custom-gradient.css';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    }

    console.log('Monospace Web Portfolio initialized');
});