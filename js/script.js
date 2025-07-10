// Navigation Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => { mobileMenu.classList.toggle('hidden'); });
    const navLinks = mobileMenu.querySelectorAll('a');
    navLinks.forEach(link => { link.addEventListener('click', () => { mobileMenu.classList.add('hidden'); }); });
}

// Interactive Process Section Logic
const processContainer = document.getElementById('interactive-process-container');
if (processContainer) {
    const processNodes = processContainer.querySelectorAll('.process-node');
    let currentNodeId = 'process-node-start';

    function showProcessNode(nodeIdToShow) {
        const targetNode = document.getElementById(nodeIdToShow);
        if (!targetNode) {
            console.error(`Process node with ID "${nodeIdToShow}" not found.`);
            return;
        }

        processNodes.forEach(node => {
            if (node.id === nodeIdToShow) {
                node.classList.remove('hidden', 'absolute', 'pointer-events-none', 'opacity-0');
                void node.offsetWidth;
                node.classList.add('opacity-100');
            } else {
                node.classList.remove('opacity-100');
                node.classList.add('opacity-0', 'pointer-events-none');
                setTimeout(() => {
                    if (node.id !== nodeIdToShow) {
                        node.classList.add('hidden', 'absolute');
                    }
                }, 300);
            }
        });

        currentNodeId = nodeIdToShow;

        setTimeout(() => {
            const activeNode = document.getElementById(nodeIdToShow);
            if (activeNode) {
                activeNode.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 50);
    }

    processNodes.forEach(node => {
        const interactiveElements = node.querySelectorAll('a[data-target-node]');
        interactiveElements.forEach(element => {
            element.addEventListener('click', (event) => {
                event.preventDefault();
                const targetNodeId = element.dataset.targetNode;
                showProcessNode(targetNodeId);
            });
        });
    });

    processNodes.forEach(node => {
        if (node.id === 'process-node-start') {
            node.classList.remove('hidden', 'absolute', 'pointer-events-none', 'opacity-0');
            node.classList.add('opacity-100');
        } else {
            node.classList.add('hidden', 'absolute', 'pointer-events-none', 'opacity-0');
        }
    });
}

// Blog slider auto infinite slideshow
document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.blog-slider');
    const track = document.querySelector('.blog-track');
    const cards = document.querySelectorAll('.blog-card');
    if (!slider || !track || cards.length === 0) return;

    let index = 0;
    const gap = parseInt(window.getComputedStyle(track).gap) || 32;
    const cardWidth = cards[0].offsetWidth + gap;
    const totalCards = cards.length;

    // Clona las primeras tarjetas al final para efecto infinito
    for (let i = 0; i < 2; i++) {
        const clone = cards[i].cloneNode(true);
        track.appendChild(clone);
    }

    let isTransitioning = false;

    function slideTo(idx, animate = true) {
        if (animate) {
            track.style.transition = 'transform 0.7s cubic-bezier(.4,0,.2,1)';
        } else {
            track.style.transition = 'none';
        }
        track.style.transform = `translateX(-${idx * cardWidth}px)`;
    }

    function nextSlide() {
        if (isTransitioning) return;
        isTransitioning = true;
        index++;
        slideTo(index, true);

        // Cuando llegamos a la última tarjeta clonada, saltamos al inicio real sin animación
        if (index === totalCards) {
            setTimeout(() => {
                slideTo(0, false);
                index = 0;
                isTransitioning = false;
            }, 700);
        } else {
            setTimeout(() => {
                isTransitioning = false;
            }, 700);
        }
    }

    let interval = setInterval(nextSlide, 3000);

    // Pausar al pasar el mouse
    slider.addEventListener('mouseenter', () => clearInterval(interval));
    slider.addEventListener('mouseleave', () => {
        interval = setInterval(nextSlide, 3000);
    });

    // Inicializa posición
    slideTo(0, false);
});

// Certificados slider auto-infinito
document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.certificate-slider');
    const track = document.querySelector('.certificate-track');
    const cards = document.querySelectorAll('.certificate-card');
    if (!slider || !track || cards.length === 0) return;

    let index = 0;
    const gap = parseInt(window.getComputedStyle(track).gap) || 24;
    const cardWidth = cards[0].offsetWidth + gap;
    const totalCards = cards.length;

    // Clona las primeras tarjetas al final para efecto infinito
    for (let i = 0; i < 2; i++) {
        const clone = cards[i].cloneNode(true);
        track.appendChild(clone);
    }

    let isTransitioning = false;

    function slideTo(idx, animate = true) {
        if (animate) {
            track.style.transition = 'transform 0.7s cubic-bezier(.4,0,.2,1)';
        } else {
            track.style.transition = 'none';
        }
        track.style.transform = `translateX(-${idx * cardWidth}px)`;
    }

    function nextSlide() {
        if (isTransitioning) return;
        isTransitioning = true;
        index++;
        slideTo(index, true);

        // Cuando llegamos a la última tarjeta clonada, saltamos al inicio real sin animación
        if (index === totalCards) {
            setTimeout(() => {
                slideTo(0, false);
                index = 0;
                isTransitioning = false;
            }, 700);
        } else {
            setTimeout(() => {
                isTransitioning = false;
            }, 700);
        }
    }

    let interval = setInterval(nextSlide, 3000);

    // Pausar al pasar el mouse
    slider.addEventListener('mouseenter', () => clearInterval(interval));
    slider.addEventListener('mouseleave', () => {
        interval = setInterval(nextSlide, 3000);
    });

    // Inicializa posición
    slideTo(0, false);
});


        document.addEventListener('DOMContentLoaded', () => {
            // --- Modelo de Datos de Precios ---
            const pricingData = {
                quantity: {
                    50: 83.46,
                    100: 87.74,
                    250: 95.22,
                    500: 97.36,
                    1000: 109.13,
                    1500: 122.50,
                    2000: 130.53,
                    2500: 132.13,
                    5000: 202.97
                },
                paper: {
                    standard: 0, // El precio base ya está en la cantidad
                    premium: 15.00, // Costo adicional por papel premium
                },
                extras: {
                    rounded: 10.00, // Costo adicional por esquinas redondeadas
                }
            };

            // --- Estado de la Selección del Usuario ---
            let userSelection = {
                quantity: 250, // Valor inicial
                paper: 'standard', // Valor inicial
                cornersRounded: false,
            };

            // --- Elementos del DOM ---
            const quantityOptions = document.getElementById('quantity-options');
            const paperOptions = document.getElementById('paper-options');
            const cornersRoundedCheckbox = document.getElementById('corners-rounded');
            const summaryList = document.getElementById('summary-list');
            const totalPriceEl = document.getElementById('total-price');

            // --- Funciones ---
            function calculateTotal() {
                let total = 0;
                total += pricingData.quantity[userSelection.quantity];
                total += pricingData.paper[userSelection.paper];
                if (userSelection.cornersRounded) {
                    total += pricingData.extras.rounded;
                }
                updateUI(total);
            }

            function updateUI(total) {
                totalPriceEl.textContent = `$${total.toFixed(2)}`;
                summaryList.innerHTML = `
                    <div class="flex justify-between"><span>Quantity:</span> <strong>${userSelection.quantity}</strong></div>
                    <div class="flex justify-between"><span>Paper:</span> <strong class="capitalize">${userSelection.paper} (14-pt)</strong></div>
                    <div class="flex justify-between"><span>Rounded Corners:</span> <strong>${userSelection.cornersRounded ? 'Yes' : 'No'}</strong></div>
                `;
            }

            function handleOptionClick(container, key, event) {
                const button = event.target.closest('button');
                if (!button) return;

                userSelection[key] = isNaN(button.dataset.value) ? button.dataset.value : parseInt(button.dataset.value);
                
                container.querySelectorAll('button').forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');

                calculateTotal();
            }

            // --- Event Listeners ---
            quantityOptions.addEventListener('click', (e) => handleOptionClick(quantityOptions, 'quantity', e));
            paperOptions.addEventListener('click', (e) => handleOptionClick(paperOptions, 'paper', e));
            
            cornersRoundedCheckbox.addEventListener('change', (e) => {
                userSelection.cornersRounded = e.target.checked;
                calculateTotal();
            });

            // --- Inicialización ---
            calculateTotal();
        });
   
