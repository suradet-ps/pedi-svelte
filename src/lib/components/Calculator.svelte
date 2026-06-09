<script lang="ts">
  import type { Drug } from '$lib/types/drug';
  import type { DoseResult } from '$lib/types/calculation';
  import { drugList } from '$lib/data/drugData';
  import ResultCard from './ResultCard.svelte';

  let {
    weight,
    onWeightChange,
    selectedDrugId,
    handleDrugChange,
    selectedDrug,
    isManualMode,
    onManualModeToggle,
    manualDose,
    onManualDoseChange,
    result,
  }: {
    weight: string;
    onWeightChange: (value: string) => void;
    selectedDrugId: number;
    handleDrugChange: (id: number) => void;
    selectedDrug: Drug;
    isManualMode: boolean;
    onManualModeToggle: () => void;
    manualDose: string;
    onManualDoseChange: (value: string) => void;
    result: DoseResult | null;
  } = $props();
</script>

<section class="calc" aria-label="เครื่องคำนวณขนาดยา">
  <h1 class="calc__title">คำนวณขนาดยาน้ำเด็ก</h1>

  <form class="calc__form" method="dialog">
    <div class="field">
      <label class="field__label" for="drug-select">เลือกยา</label>
      <div class="select-wrap">
        <select
          id="drug-select"
          class="field__input"
          value={selectedDrugId}
          onchange={(e) => {
            const target = e.currentTarget;
            handleDrugChange(Number(target.value));
          }}
        >
          {#each drugList as drug (drug.id)}
            <option value={drug.id}>
              {drug.name} · {drug.concentration}mg/{drug.volume}ml
            </option>
          {/each}
        </select>
        <svg
          class="select-wrap__icon"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </div>

    <div class="field">
      <div class="field__row">
        <label class="field__label" for="weight">น้ำหนัก (kg)</label>
        <button
          type="button"
          class="field__manual-toggle"
          onclick={onManualModeToggle}
          aria-expanded={isManualMode}
        >
          {isManualMode ? 'ปิด' : 'ระบุเอง'}
        </button>
      </div>
      <input
        type="number"
        id="weight"
        class="field__input"
        value={weight}
        oninput={(e) => {
          const target = e.currentTarget;
          onWeightChange(target.value);
        }}
        placeholder="0.0"
        step="any"
        min="0"
        inputmode="decimal"
      />
    </div>

    {#if isManualMode}
      <div class="field field--manual">
        <label class="field__label" for="manual-dose">mg/kg/dose</label>
        <input
          type="number"
          id="manual-dose"
          class="field__input"
          value={manualDose}
          oninput={(e) => {
            const target = e.currentTarget;
            onManualDoseChange(target.value);
          }}
          placeholder={`${selectedDrug.minDosePerKg} - ${selectedDrug.maxDosePerKg}`}
          step="any"
          min="0"
          inputmode="decimal"
        />
      </div>
    {/if}

    <ResultCard {result} {isManualMode} />
  </form>
</section>

<style>
  .calc {
    width: 100%;
    max-width: 420px;
    display: flex;
    flex-direction: column;
    gap: var(--sp-5);
    padding-top: var(--sp-2);
  }

  .calc__title {
    font-size: var(--fs-title);
    font-weight: var(--fw-medium);
    color: var(--text-primary);
    line-height: 1.3;
  }

  .calc__form {
    display: flex;
    flex-direction: column;
    gap: var(--sp-4);
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: var(--sp-2);
  }

  .field__row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--sp-3);
  }

  .field__label {
    font-size: var(--fs-label);
    font-weight: var(--fw-medium);
    color: var(--text-primary);
  }

  .field__manual-toggle {
    font-size: var(--fs-caption);
    font-weight: var(--fw-medium);
    color: var(--color-electric-blue);
    padding: 0;
    transition: color var(--t);
  }

  .field__manual-toggle:hover {
    color: var(--color-electric-blue-hover);
  }

  .field__input {
    height: 48px;
    width: 100%;
    padding: 0 var(--sp-4);
    font-size: var(--fs-body);
    color: var(--text-primary);
    background-color: var(--color-surface);
    border: 1px solid transparent;
    border-radius: var(--r);
    transition: background-color var(--t), border-color var(--t);
    -webkit-appearance: none;
    appearance: none;
  }

  .field__input::placeholder {
    color: var(--text-placeholder);
  }

  .field__input:focus {
    background-color: var(--color-canvas);
    border-color: var(--color-electric-blue);
  }

  .field--manual {
    animation: slide-down var(--t) var(--ease);
  }

  @keyframes slide-down {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .select-wrap {
    position: relative;
  }

  .select-wrap :global(.field__input) {
    padding-right: var(--sp-7);
    cursor: pointer;
  }

  .select-wrap__icon {
    position: absolute;
    right: var(--sp-4);
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-tertiary);
    pointer-events: none;
  }

  @media (min-width: 600px) {
    :root {
      --fs-result: 3rem;
    }

    .calc {
      gap: var(--sp-6);
    }

    .calc__form {
      gap: var(--sp-5);
    }
  }
</style>
