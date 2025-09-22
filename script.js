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

    console.log('Monospace Web Portfolio initialized');
});