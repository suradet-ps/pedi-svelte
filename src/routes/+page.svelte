<script lang="ts">
  import { drugList } from '$lib/data/drugData';
  import type { Drug } from '$lib/types/drug';
  import type { DoseResult, AutoDoseResult, ManualDoseResult } from '$lib/types/calculation';
  import { calculateDoseRange, calculateManualDose } from '$lib/utils/doseMath';
  import Calculator from '$lib/components/Calculator.svelte';

  const STORAGE_KEY = 'pedi-dose:lastDrugId';

  function loadSavedDrugId(): number {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null && drugList.some((d) => d.id === Number(saved))) {
      return Number(saved);
    }
    return drugList[0].id;
  }

  let weight: string = $state('');
  let selectedDrugId: number = $state(loadSavedDrugId());
  let isManualMode: boolean = $state(false);
  let manualDose: string = $state('');

  let selectedDrug: Drug = $derived(
    drugList.find((d) => d.id === selectedDrugId) ?? drugList[0],
  );

  $effect(() => {
    localStorage.setItem(STORAGE_KEY, String(selectedDrugId));
  });

  let result: DoseResult | null = $derived.by(() => {
    const w = parseFloat(weight);
    if (isNaN(w) || w <= 0) return null;

    if (isManualMode) {
      const d = parseFloat(manualDose);
      if (isNaN(d) || d <= 0) return null;
      const { finalMl, totalMg } = calculateManualDose(w, d, selectedDrug);
      return {
        mode: 'manual' as const,
        finalMl,
        totalMg: totalMg.toFixed(1),
        notes: selectedDrug.notes,
      } satisfies ManualDoseResult;
    }

    const { min, max, totalMinMg, totalMaxMg } = calculateDoseRange(
      w,
      selectedDrug,
    );
    return {
      mode: 'auto' as const,
      min,
      max,
      totalMinMg,
      totalMaxMg,
      notes: selectedDrug.notes,
    } satisfies AutoDoseResult;
  });

  function handleDrugChange(id: number): void {
    selectedDrugId = id;
    manualDose = '';
  }
</script>

<Calculator
  {weight}
  onWeightChange={(v) => (weight = v)}
  {selectedDrugId}
  {handleDrugChange}
  {selectedDrug}
  {isManualMode}
  onManualModeToggle={() => (isManualMode = !isManualMode)}
  {manualDose}
  onManualDoseChange={(v) => (manualDose = v)}
  {result}
/>
