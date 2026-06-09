<script lang="ts">
  import type { DoseResult } from '$lib/types/calculation';
  import { formatDoseRange, formatMgRange } from '$lib/utils/doseMath';

  let {
    result,
    isManualMode,
  }: {
    result: DoseResult | null;
    isManualMode: boolean;
  } = $props();
</script>

{#if !result}
  <p class="result__empty">
    {isManualMode ? 'กรุณากรอกขนาดยา (mg/kg/dose)' : 'กรุณากรอกน้ำหนัก'}
  </p>
{:else if result.mode === 'auto'}
  <div class="result" role="status" aria-live="polite">
    <div class="result__value">{formatDoseRange(result.min, result.max)}</div>
    <div class="result__secondary">
      {formatMgRange(result.totalMinMg, result.totalMaxMg)}
    </div>
    <p class="result__notes">
      <span class="result__notes-label">คำแนะนำ</span>
      {result.notes}
    </p>
  </div>
{:else}
  <div class="result" role="status" aria-live="polite">
    <div class="result__value">{result.finalMl} ml</div>
    <div class="result__secondary">{result.totalMg} mg/dose</div>
    <p class="result__notes">
      <span class="result__notes-label">คำแนะนำ</span>
      {result.notes}
    </p>
  </div>
{/if}

<style>
  .result {
    display: flex;
    flex-direction: column;
    gap: var(--sp-3);
    padding: var(--sp-5) 0;
    border-top: 1px solid var(--color-divider);
    margin-top: var(--sp-2);
  }

  .result__value {
    font-size: var(--fs-result);
    font-weight: var(--fw-medium);
    color: var(--color-electric-blue);
    line-height: 1.1;
    letter-spacing: -0.01em;
    font-variant-numeric: tabular-nums;
  }

  .result__secondary {
    font-size: var(--fs-body);
    font-weight: var(--fw-regular);
    color: var(--text-tertiary);
    font-variant-numeric: tabular-nums;
    margin-top: -4px;
  }

  .result__notes {
    font-size: var(--fs-caption);
    color: var(--text-body);
    line-height: 1.5;
    display: flex;
    flex-direction: column;
    gap: var(--sp-1);
  }

  .result__notes-label {
    font-weight: var(--fw-medium);
    color: var(--text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 0.6875rem;
  }

  .result__empty {
    font-size: var(--fs-caption);
    color: var(--text-placeholder);
    text-align: center;
    padding: var(--sp-5) 0;
    border-top: 1px solid var(--color-divider);
    margin-top: var(--sp-2);
  }
</style>
