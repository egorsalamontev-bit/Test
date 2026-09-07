(function() {
    'use strict';

    // ---------- Данные страниц ----------
    const pages = {
        home: {
            title: 'Главная',
            render: () => `
                <h1>Добро пожаловать!</h1>
                <p>Это главная страница нашего многостраничного сайта. Здесь вы можете разместить приветствие, новости или краткий обзор.</p>
                <p>Используйте навигацию в шапке, чтобы переключаться между разделами.</p>
                <div style="background:#dbeafe; padding:1.5rem; border-radius:12px; margin-top:1rem;">
                    <strong>💡 Интересный факт:</strong> страницы переключаются без перезагрузки, используя хэш-роутинг.
                </div>
            `
        },
        about: {
            title: 'О нас',
            render: () => `
                <h1>О компании</h1>
                <p>Мы — команда энтузиастов, которая создаёт полезные веб-решения с 2020 года.</p>
                <p>Наша миссия — делать интернет удобнее, красивее и доступнее для каждого.</p>
                <div class="card-grid">
                    <div class="card"><h3>🚀 Скорость</h3><p>Быстрая загрузка страниц и отзывчивый интерфейс.</p></div>
                    <div class="card"><h3>🔒 Надёжность</h3><p>Мы используем проверенные технологии и подходы.</p></div>
                    <div class="card"><h3>❤️ Поддержка</h3><p>Всегда на связи и готовы помочь с любым вопросом.</p></div>
                </div>
            `
        },
        services: {
            title: 'Услуги',
            render: () => `
                <h1>Наши услуги</h1>
                <p>Мы предлагаем широкий спектр услуг для бизнеса и частных лиц.</p>
                <ul style="list-style:none; padding:0; display:grid; gap:0.8rem; margin-top:1rem;">
                    <li style="background:#fff; padding:1rem; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.06);">
                        <strong>🌐 Разработка сайтов</strong> — от лендингов до интернет-магазинов.
                    </li>
                    <li style="background:#fff; padding:1rem; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.06);">
                        <strong>📱 Мобильные приложения</strong> — нативные и кроссплатформенные решения.
                    </li>
                    <li style="background:#fff; padding:1rem; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.06);">
                        <strong>🔍 SEO-продвижение</strong> — вывод сайтов в топ поисковых систем.
                    </li>
                </ul>
            `
        },
        contact: {
            title: 'Контакты',
            render: () => `
                <h1>Свяжитесь с нами</h1>
                <p>Мы всегда рады обратной связи. Вы можете написать нам любым удобным способом.</p>
                <div style="background:#fff; padding:1.8rem; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.06); max-width:450px;">
                    <p><strong>📧 Email:</strong> <a href="mailto:info@mysite.ru">info@mysite.ru</a></p>
                    <p><strong>📞 Телефон:</strong> <a href="tel:+79991234567">+7 (999) 123-45-67</a></p>
                    <p><strong>📍 Адрес:</strong> г. Москва, ул. Примерная, д. 1</p>
                    <hr style="margin:1rem 0; border:0; border-top:1px solid #ddd;" />
                    <p><small>Или заполните форму обратной связи (она появится позже 😉)</small></p>
                </div>
            `
        }
    };

    // ---------- DOM-элементы ----------
    const app = document.getElementById('app');
    const navLinks = document.querySelectorAll('nav a');

    // ---------- Функция рендеринга ----------
    function renderPage(pageId) {
        // Если страница не найдена — подставляем home
        const page = pages[pageId] || pages.home;

        // Меняем заголовок документа
        document.title = page.title + ' — Мой сайт';

        // Рендерим контент
        app.innerHTML = `
            <div class="page active">
                ${page.render()}
            </div>
        `;

        // Обновляем активный пункт меню
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === '#' + pageId) {
                link.classList.add('active');
            }
        });
    }

    // ---------- Роутер (обработка изменения хэша) ----------
    function router() {
        // Получаем хэш без символа #
        let hash = window.location.hash.slice(1) || 'home';
        // Если в хэше есть лишний слеш — убираем
        hash = hash.split('/')[0];
        renderPage(hash);
    }

    // ---------- Обработчики ----------
    // При клике на ссылки — обновляем хэш (работает и так, но добавим плавности)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Не блокируем стандартное поведение, чтобы хэш менялся
            // но можно добавить e.preventDefault() и сделать window.location.hash = ...
            // Оставим стандартное поведение для простоты
        });
    });

    // Слушаем изменения хэша
    window.addEventListener('hashchange', router);

    // Первоначальная загрузка
    window.addEventListener('DOMContentLoaded', () => {
        // Если хэш пустой — ставим #home
        if (!window.location.hash) {
            window.location.hash = 'home';
        } else {
            router();
        }
    });

})();