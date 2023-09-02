# cli

## Install

### Run directly

```bash
npx cli
```

### Install on system

```bash
npm i -g cli
%binName%
```

### Install in project

```bash
npm i -D cli
```

Add script entry:

```json
{
  "scripts": {
    "%binName%": "%binName%"
  }
}
```

Run:

```bash
npm run %binName%
```

## Options

### `--help`

Show help

### `--version`

Show version
