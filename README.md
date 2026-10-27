# @vited/cli

The `vited` command runs Vite using `vited.config.ts`.

```bash
pnpm add -D @vited/cli @vited/core @vited/theme-mantine vite react react-dom
pnpm exec vited dev
pnpm exec vited build
pnpm exec vited preview
```

Commands accept an optional project root and `--config <file>`. The development
and preview servers also accept `--host` and `--port`.
