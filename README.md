# Super Master Appliance

Одностраничный React/Vite-сайт для Super Master Appliance.

## Разработка и деплой

```bash
npm install
npm run dev
npm run build
npm run preview
npm run check
```

Vercel: Build Command `npm run build`, Output Directory `dist`.

## Кэширование

- `index.html` и страницы возвращаются с `Cache-Control: public, max-age=0, must-revalidate`.
- Хешированные файлы Vite в `dist/assets/` кэшируются на год как `immutable`.
- Файлы из `public/` без хеша (favicon, sitemap, llms.txt) перепроверяются при каждом запросе.
- Не редактируйте `dist/` вручную и не используйте `?v=`: Vite создаёт новое имя при изменении содержимого.
