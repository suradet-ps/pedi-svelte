# Pedi-Svelte

> Pediatric dose calculator for healthcare professionals — fast, accurate, mobile-first.

[![License](https://img.shields.io/github/license/suradet-ps/pedi-svelte?color=blue&logo=opensourceinitiative&logoColor=ffffff)](https://github.com/suradet-ps/pedi-svelte/blob/main/LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-blue?logo=git&logoColor=ffffff)](https://github.com/suradet-ps/pedi-svelte)
[![TypeScript](https://img.shields.io/badge/TypeScript-%5E5-3178C6?logo=typescript&logoColor=ffffff)](https://www.typescriptlang.org/)
[![Svelte](https://img.shields.io/badge/Svelte-%5E5-FF3E00?logo=svelte&logoColor=ffffff)](https://svelte.dev/)
[![SvelteKit](https://img.shields.io/badge/SvelteKit-%5E2-FF3E00?logo=svelte&logoColor=ffffff)](https://kit.svelte.dev/)
[![Bun](https://img.shields.io/badge/Bun-1.3.14-f9f1e1?logo=bun&logoColor=ffffff)](https://bun.sh/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?logo=github&logoColor=ffffff)](https://github.com/suradet-ps/pedi-svelte/pulls)

---

**Pedi-Svelte** (เดิม Pedi-Dose) เป็น progressive web application (PWA) ที่ช่วยให้เภสัชกร แพทย์ และบุคลากรทางการแพทย์คำนวณขนาดยาน้ำเด็กได้อย่างรวดเร็วและแม่นยำ คำนวณช่วงขนาดยาทั้งหน่วยมิลลิลิตร (ml) และมิลลิกรัมต่อโดส (mg/dose) ตามน้ำหนักผู้ป่วย พร้อมคำแนะนำการบริหารยาสำหรับยาแต่ละชนิด

---

## Features

- **Real-time calculation** — ผลลัพธ์อัปเดตทันทีขณะพิมพ์หรือเลือกยา ไม่ต้องกดปุ่ม submit
- **Dual-unit display** — ผลหลักใน **ml** พร้อมค่า **mg/dose** รอง
- **Manual dose mode** — ระบุขนาด mg/kg/dose เองแทนช่วงมาตรฐาน
- **Mobile-first UI** — ออกแบบเพื่อใช้งานบนมือถือ ติดตั้งเป็น PWA ได้
- **Offline capable** — ใช้งานได้โดยไม่ต้องเชื่อมต่ออินเทอร์เน็ตหลังจากเข้าชมครั้งแรก
- **Persistent selection** — จดจำยาที่เลือกล่าสุดผ่าน `localStorage`
- **Dark mode** — เปลี่ยนตามระบบ `prefers-color-scheme` โดยอัตโนมัติ
- **Accessible** — คีย์บอร์ดนำทาง, screen-reader friendly, visible focus indicators
- **11 pre-loaded drugs** — ครอบคลุมยาปฏิชีวนะ ยาลดไข้ ยาแก้แพ้ และอื่นๆ สำหรับเด็ก

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) (strict mode, no unchecked access) |
| **Framework** | [Svelte 5](https://svelte.dev/) (runes API: $state, $derived, $effect) |
| **Meta-framework** | [SvelteKit 2](https://kit.svelte.dev/) (file-based routing, adapter-static) |
| **Build tool** | [Vite 6](https://vite.dev/) (ผ่าน SvelteKit) |
| **PWA** | [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) (Workbox, generateSW) |
| **Linting** | [ESLint 9](https://eslint.org/) (flat config, type-aware, Svelte plugin) |
| **Formatting** | [Prettier](https://prettier.io/) + prettier-plugin-svelte |
| **Package manager** | [Bun](https://bun.sh/) |

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) v1.1+

### Install

```bash
git clone https://github.com/suradet-ps/pedi-svelte.git
cd pedi-svelte
bun install
```

### Development

```bash
bun run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
bun run build      # svelte-kit sync + Vite build (SSR + client)
bun run preview    # preview the production bundle
```

### Quality Checks

```bash
bun run check      # svelte-kit sync + svelte-check (type + Svelte diagnostics)
bun run lint       # ESLint with type-aware rules + Svelte plugin
bun run format     # Prettier (TS + Svelte + CSS)
```

---

## Project Structure

```
pedi-svelte/
├── static/                          # Static assets (icons, PWA)
├── src/
│   ├── routes/
│   │   ├── +layout.svelte           # App shell (Header + Footer + main)
│   │   ├── +page.svelte             # Calculator page (state via runes)
│   │   └── +error.svelte            # Error page (SvelteKit error handling)
│   ├── lib/
│   │   ├── components/
│   │   │   ├── Calculator.svelte    # Main calculator form
│   │   │   ├── ResultCard.svelte    # Dose result display
│   │   │   ├── Header.svelte        # App header
│   │   │   └── Footer.svelte        # Attribution footer
│   │   ├── data/
│   │   │   └── drugData.ts          # Drug database (immutable typed)
│   │   ├── types/
│   │   │   ├── drug.ts              # Drug, DrugCategory, DrugTiming
│   │   │   └── calculation.ts       # DoseResult (discriminated union)
│   │   ├── utils/
│   │   │   └── doseMath.ts          # Pure dose calculation functions
│   │   └── styles/
│   │       ├── tokens.css           # Design tokens (Tesla-inspired)
│   │       ├── base.css             # CSS reset + globals
│   │       └── utilities.css        # Utility classes (sr-only)
│   ├── app.html                     # HTML shell (lang=th, PWA meta)
│   └── app.d.ts                     # SvelteKit + Vite type declarations
├── DESIGN.md                        # Design system documentation
├── svelte.config.js                 # SvelteKit config (adapter-static)
├── vite.config.ts                   # Vite + SvelteKit + PWA
├── tsconfig.json                    # Strict TypeScript (strict, noUncheckedIndexedAccess)
├── eslint.config.js                 # ESLint flat config (Svelte + TS type-aware)
└── vercel.json                      # Vercel deployment + security headers
```

---

## Available Drugs

| Drug | Concentration | Category |
|------|--------------|----------|
| Amoxycillin | 250 mg / 5 ml | Antibiotic |
| Augmentin (Co-amoxiclav) | 228.5 mg / 5 ml | Antibiotic |
| Bactrim (Co-trimoxazole) | 40 mg / 5 ml | Antibiotic |
| CPM (Chlorpheniramine) | 2 mg / 5 ml | Antihistamine |
| Dicloxacillin | 62.5 mg / 5 ml | Antibiotic |
| Domperidone | 5 mg / 5 ml | Antiemetic |
| Erythromycin | 125 mg / 5 ml | Antibiotic |
| Guafenesine (Guaifenesin) | 100 mg / 5 ml | Mucolytic |
| Ibuprofen | 100 mg / 5 ml | Antipyretic |
| Paracetamol | 120 mg / 5 ml | Antipyretic |
| Salbutamol | 2 mg / 5 ml | Bronchodilator |

> Drug data is maintained in [`src/lib/data/drugData.ts`](src/lib/data/drugData.ts) and uses `as const satisfies readonly Drug[]` for full type safety.

---

## Svelte 5 Architecture

This project uses Svelte 5 **runes** for all state management — no React hooks, no stores:

- **`$state()`** — local reactive state (`weight`, `selectedDrugId`, `isManualMode`, `manualDose`)
- **`$derived()`** — computed values (`selectedDrug` from `selectedDrugId`)
- **`$derived.by()`** — complex derived computation (`result` from weight + drug + mode)
- **`$effect()`** — side effects (`localStorage` persistence when `selectedDrugId` changes)
- **`$props()`** — typed component props (replaces React `PropsWithChildren` + interfaces)

Key improvements over the original React architecture:

- Automatic dependency tracking — no manual `useMemo`/`useCallback` dep arrays
- No class-based ErrorBoundary — replaced by SvelteKit's `+error.svelte`
- No prop drilling — state is co-located in `+page.svelte` with callback props
- Compile-time reactivity — less runtime overhead, smaller bundle

---

## TypeScript Architecture

This project prioritizes strict type safety:

- **`strict: true`** — all strict checks enabled (noImplicitAny, strictNullChecks, etc.)
- **`noUncheckedIndexedAccess`** — every array/record access is safe by default
- **`exactOptionalPropertyTypes`** — no accidental `undefined` assignments
- **`verbatimModuleSyntax`** — enforces `import type` for type-only imports
- **Discriminated unions** — `DoseResult` is `AutoDoseResult | ManualDoseResult` (no optional `mode` fields)
- **Zero `any`** — no type assertions, no `@ts-ignore`, no non-null assertions
- **Satisfies operator** — `as const satisfies readonly Drug[]` for compile-time type narrowing

---

## Deployment

The app is deployed via **Vercel** with automatic deploys on every push to `main`. The static build output (`dist/`) is served directly — no server runtime required.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsuradet-ps%2Fpedi-svelte)

### Manual Vercel CLI

```bash
bun install -g vercel
bun run build
vercel --prod
```

Configuration lives in `vercel.json` (security headers, service-worker caching).

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Commit your changes using [conventional commits](https://www.conventionalcommits.org/)
4. Push to your branch: `git push origin feat/my-feature`
5. Open a pull request

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new drug calculation mode
fix: correct rounding for low-weight patients
refactor: extract dose formatting utilities
chore(deps): update typescript to v5
```

---

## License

Distributed under the MIT License. See [LICENSE](./LICENSE) for more information.

---

## Disclaimer

**This software is a clinical decision-support tool intended for use by licensed healthcare professionals only.** It does not replace independent clinical judgment. Users must verify all calculated dosages against the patient's medical history, organ function, and official prescribing information. The authors assume no liability for damages arising from the use of this software.
