# @vited/cli

The `vited` command runs Vite using `vited.config.ts`.

```bash
npm install -D @vited/cli @vited/core @vited/theme-mantine vite react react-dom
npx vited dev
npx vited build
npx vited preview
```

Commands accept an optional project root and `--config <file>`. The development
and preview servers also accept `--host` and `--port`.
