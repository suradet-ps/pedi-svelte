# Pedi-Svelte

```
██████╗ ███████╗██████╗ ██╗ ██████╗██╗   ██╗███████╗██╗     ████████╗███████╗
██╔══██╗██╔════╝██╔══██╗██║██╔════╝██║   ██║██╔════╝██║     ╚══██╔══╝██╔════╝
██████╔╝█████╗  ██║  ██║██║███████╗██║   ██║█████╗  ██║        ██║   █████╗
██╔═══╝ ██╔══╝  ██║  ██║██║╚════██║╚██╗ ██╔╝██╔══╝  ██║        ██║   ██╔══╝
██║     ███████╗██████╔╝██║██████╔╝ ╚████╔╝ ███████╗███████╗   ██║   ███████╗
╚═╝╚══════╝╚═════╝ ╚═╝╚═════╝  ╚═══╝╚══════╝╚══════╝   ╚═╝╚══════╝
```

---

## ◆ PULSE

The dose is needed at the bedside, not after the calculation - and the
framework should stay out of the way too. Pedi-Svelte is the Svelte
5 runes edition of the pediatric dose calculator: weight in, ml first
with mg per dose beside it, in real time - no submit button between
the question and the answer. Eleven drugs at their real
concentrations, a manual mode for the non-standard mg/kg/dose, and an
installable, offline-capable PWA with all state in `$state`, no stores
in sight.

| Runes ▣ | Real-time ▣ | Offline PWA ▣ | 11 drugs ▣ |
|---|---|---|---|

*v1.0.0 - the calculator - weight in, both units out - is sealed.*

> Built with Svelte 5 runes + SvelteKit 2 (adapter-static), strict
> TypeScript to the last `any` - the React original, recompiled.
>
> **suradet-ps**, artifact keeper

---

## ◆ IGNITION

One runtime, four commands.

```
⟫ git clone https://github.com/suradet-ps/pedi-svelte.git
⟫ cd pedi-svelte
⟫ bun install
⟫ bun run dev
```

Open [http://localhost:5173](http://localhost:5173).

```
⟫ bun run build       # svelte-kit sync, then Vite build
⟫ bun run check       # svelte-check, strict
⟫ bun run lint        # ESLint, type-aware
⟫ bun run format      # Prettier
```

<details>
<summary>Prerequisites</summary>

- [Bun](https://bun.sh/) v1.1+

Deployment: Vercel auto-deploys every push to `main` - the static
`dist/` build is served with security headers from `vercel.json`.

</details>

---

## ◆ ANATOMY

One form, two results, a runes-based state graph.

- **Reacts** - `$state` holds the weight, the selected drug, and the
  mode; `$derived.by()` computes the result - the dependencies track
  themselves, no memo arrays to maintain.
- **Calculates** - pure functions in `doseMath.ts` derive the range
  in ml and mg per dose; a discriminated union (`AutoDoseResult |
  ManualDoseResult`) keeps the two modes honest with no optional
  fields.
- **Overrides** - manual dose mode takes a custom mg/kg/dose and
  re-derives both units - the standard range steps aside without
  disappearing.
- **Remembers** - `$effect` persists the last-used drug to
  `localStorage` - the form opens where the last patient left it.
- **Works anywhere** - a Workbox PWA: installable, functional offline
  after first visit, keyboard-navigable, screen-reader-friendly, and
  dark-mode-native through `prefers-color-scheme`.
- **Types** - `strict: true` plus `noUncheckedIndexedAccess`,
  `exactOptionalPropertyTypes`, `verbatimModuleSyntax`, and the
  `as const satisfies readonly Drug[]` drug table - a drug cannot
  drift out of type.

---

## ◆ RITUALS

**The core ceremony** - the bedside dose:

1. Enter the weight. The range appears with the next keystroke - no
   submit, no waiting.
2. Select the drug from 11 pre-loaded entries; the concentration and
   administration guidance answer beside it.
3. When the standard range is wrong for this patient, switch to
   manual mg/kg/dose - both units re-derive.
4. Verify against the chart, then administer. The disclaimer is part
   of the ritual: the tool assists, the clinician decides.

**The ceremony of the unit** - ml is the primary number because the
syringe reads ml; mg per dose is the secondary because the formulary
writes it. Both are shown, neither is hidden.

**The ceremony of the offline page** - the ward wifi dies and the
calculator does not notice. After one visit, every drug, every
concentration, and every calculation lives on the device.

---

## ◆ ECHOES

**Where this artifact is heading**

```
react    ▸ runes state, derived results, no submit ─────────────────── ▸ sealed
calc     ▸ pure doseMath, discriminated union results ──────────────── ▸ sealed
override ▸ manual mg/kg/dose mode ──────────────────────────────────── ▸ sealed
offline  ▸ Workbox PWA, installable ────────────────────────────────── ▸ sealed
types    ▸ strict, zero any, satisfies operator ────────────────────── ▸ sealed
```

**Raising the artifact** - drug data lives in
`src/lib/data/drugData.ts`; the design system in `DESIGN.md`;
commits follow conventional commits. Gates: `bun run check`,
`bun run lint`, `bun run format`. Open an issue first to discuss a
change.

**Status** - CI gates every push on the way to Vercel.
[Watch the gates](.github/workflows).

> This software is a clinical decision-support tool for licensed
> healthcare professionals. It does not replace independent clinical
> judgment.

---

```
  ─────────────────────────────────────────
   The syringe reads ml.
   So does Pedi-Svelte.
  ─────────────────────────────────────────
```

Distributed under the [MIT License](LICENSE).