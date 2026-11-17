# Super Master Appliance

Static website for Super Master Appliance, ready for deployment on Vercel.

## Deploy

Import this repository into Vercel with the project root set to this directory. No build command or install step is required; Vercel serves `index.html` and the static assets directly.

For local preview:

```bash
npm run serve
```

## Деплой и кэш

Репозиторий использует готовый статический Vite-бандл без исходников и сборочной конфигурации.

- Перед деплоем выполните `npm run build`. Скрипт добавляет хеш содержимого к именам файлов в `assets/` и обновляет ссылки.
- HTML и маршруты страниц не кэшируются (`Cache-Control: public, max-age=0, must-revalidate`).
- JS/CSS с хешем в имени кэшируются на год как immutable.
- Остальные файлы в `assets/` перепроверяются и могут использовать краткий длительный срок с stale-while-revalidate.
- Картинки и шрифты без хеша имеют умеренное кэширование, поэтому изменённые файлы следует выпускать под новым именем.
- Не добавляйте ручные `?v=` версии. Любое изменённое содержимое в `assets/` должно получить новое хешированное имя.

Рекомендуемый выпуск:

```bash
npm run build
git add -A
git diff --cached --stat
git commit -m "build: release hashed assets"
git push origin main
```
