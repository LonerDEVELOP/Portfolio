document.addEventListener('DOMContentLoaded', function() {
        // Обработчик для кнопки "Узнать больше"
    document.getElementById('project-btn').addEventListener('click', scrollToProjects);
    // Список проектов с их описаниями
    const projects = [
        {
            title: "LPHelper",
            description: "Умный плагин для автоматического управления правами в Minecraft через LuckPerms."
        },
        {
            title: "GMCoins", 
            description: "это плагин для Minecraft (Paper/Spigot), добавляющий продвинутую систему внутриигровой валюты"
        },
        {
            title: "SecretMarket",
            description: "Бродячий торговец появляется раз в 1-3 дня со случайными товарами."
        }
    ];

    const titleElement = document.getElementById('typing-title');
    const descriptionElement = document.getElementById('animated-description');
    
    // Элементы модальных окон
    const contactsModal = document.getElementById('contacts-modal');
    const contactsBtn = document.getElementById('contacts-btn');
    const footerContactsBtn = document.getElementById('footer-contacts-btn');
    const closeButtons = document.querySelectorAll('.close');
    
    let currentProjectIndex = 0;
    let isDeleting = false;
    let text = '';
    let charIndex = 0;
    let typingSpeed = 100;
    let deletingSpeed = 50;
    let pauseBetween = 2000;

    // Функция для добавления/удаления курсора
    function toggleCursor(show) {
        if (show && !document.querySelector('.cursor')) {
            const cursor = document.createElement('span');
            cursor.className = 'cursor';
            cursor.innerHTML = '|';
            titleElement.appendChild(cursor);
        } else if (!show) {
            const cursor = document.querySelector('.cursor');
            if (cursor) {
                cursor.remove();
            }
        }
    }

    // Функция для анимации печатающегося текста
    function typeWriter() {
        const currentProject = projects[currentProjectIndex];
        
        if (!isDeleting) {
            // Печатаем текст
            if (charIndex < currentProject.title.length) {
                text = currentProject.title.substring(0, charIndex + 1);
                titleElement.innerHTML = text;
                toggleCursor(true);
                charIndex++;
                setTimeout(typeWriter, typingSpeed);
            } else {
                // Текст напечатан, убираем курсор
                toggleCursor(false);
                // Начинаем анимацию описания
                animateDescription();
                // Ждем паузу перед удалением
                setTimeout(() => {
                    isDeleting = true;
                    setTimeout(typeWriter, 500);
                }, pauseBetween);
            }
        } else {
            // Удаляем текст
            if (charIndex > 0) {
                text = currentProject.title.substring(0, charIndex - 1);
                titleElement.innerHTML = text;
                toggleCursor(true);
                charIndex--;
                setTimeout(typeWriter, deletingSpeed);
            } else {
                // Текст удален, переходим к следующему проекту
                toggleCursor(false);
                isDeleting = false;
                currentProjectIndex = (currentProjectIndex + 1) % projects.length;
                setTimeout(typeWriter, 500);
            }
        }
    }

    // Функция для плавного появления/исчезновения описания
    function animateDescription() {
        const currentProject = projects[currentProjectIndex];
        let opacity = 2;
        let direction = -1; // 1 - появление, -1 - исчезновение
        
        descriptionElement.textContent = currentProject.description;
        descriptionElement.style.opacity = opacity;
        
        const fadeInterval = setInterval(() => {
            opacity += 0.05 * direction;
            descriptionElement.style.opacity = opacity;
            
            if (opacity >= 1 && direction === 1) {
                // Достигли полной видимости, ждем и начинаем исчезать
                setTimeout(() => {
                    direction = -1;
                }, 2000);
            } else if (opacity <= 0 && direction === -1) {
                // Полностью исчезли, очищаем интервал
                clearInterval(fadeInterval);
                descriptionElement.style.opacity = '0';
            }
        }, 50);
    }

    // Функции для работы с модальными окнами
    function openModal(modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Обработчики событий для модальных окон
    contactsBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openModal(contactsModal);
    });

    footerContactsBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openModal(contactsModal);
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            closeModal(contactsModal);
        });
    });

    // Закрытие модального окна при клике вне его
    window.addEventListener('click', function(e) {
        if (e.target === contactsModal) {
            closeModal(contactsModal);
        }
    });

    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Анимация появления элементов при скролле
    function checkScroll() {
        const elements = document.querySelectorAll('.slide-in-left, .slide-in-right, .slide-in-up, .feature-text, .feature-image img');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const isVisible = (elementTop < window.innerHeight - 100) && (elementBottom > 0);
            
            if (isVisible) {
                element.classList.add('visible');
            }
        });

        // Анимация прогресс-баров
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const elementTop = bar.getBoundingClientRect().top;
            if (elementTop < window.innerHeight - 100) {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            }
        });
    }

    // Запускаем анимации
    typeWriter();
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Проверяем при загрузке

    // Функция для прокрутки к проектам
function scrollToProjects() {
    const projectsSection = document.querySelector('.features-section');
    if (projectsSection) {
        projectsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}
});