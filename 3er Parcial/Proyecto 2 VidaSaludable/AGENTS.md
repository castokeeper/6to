# AGENTS.md - VidaSaludable App

## Development Rules
- Skip all lint, type-check, and test runs during development
- Do not run verification or formatting commands until explicitly requested
- Install dependencies with `npm install` only once
- Use `npx expo start` for dev server
- Use `eas build -p android --profile preview` for APK

## Quick Start
```bash
cd "d:\6to\3er Parcial\Proyecto 2 VidaSaludable"
npm install
npx expo start
```

## APK Generation
```bash
npx eas-cli build -p android --profile preview
```
