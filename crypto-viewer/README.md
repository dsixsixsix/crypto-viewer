# ДОМАШНЕЕ ЗАДАНИЕ УГЛУБЛЕННЫЙ JAVASCRIPT №1, №2, №3

## Криптовалютный трекер

Приложение для отслеживания курсов криптовалют с использованием React и Vite.

### Основные функции

1. **Поиск и фильтрация криптовалют**
   - Поиск по названию криптовалюты
   - Фильтрация по выбранной валюте (USD, EUR, RUB)
   - Отображение актуальных цен в выбранной валюте

2. **Профиль пользователя**
   - Сохранение имени пользователя и пароля
   - Персистентность данных при перезагрузке страницы
   - Возможность просмотра введенного пароля

3. **Технические особенности**
   - Использование React с Vite
   - Интеграция с CoinGecko API
   - Адаптивный дизайн
   - Локальное хранение данных пользователя

### Установка и запуск

1. Клонируйте репозиторий
2. Установите зависимости:
   ```bash
   npm install
   ```
3. Запустите приложение:
   ```bash
   npm run dev
   ```

### Используемые технологии

- React
- Vite
- Tailwind CSS
- CoinGecko API
- LocalStorage для хранения данных пользователя

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
