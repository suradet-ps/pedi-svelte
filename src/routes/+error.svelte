<script lang="ts">
  import { page } from '$app/stores';
  import { resolve } from '$app/paths';

  let errorMessage: string = $derived.by(() => {
    const status = $page.status;
    if (status === 404) return 'ไม่พบหน้าที่คุณต้องการ';
    if (status === 500) return 'เกิดข้อผิดพลาดภายใน กรุณาลองใหม่อีกครั้ง';
    return 'เกิดข้อผิดพลาดที่ไม่คาดคิด';
  });
</script>

<div class="error-boundary" role="alert">
  <h1 class="error-boundary__code">{$page.status}</h1>
  <p class="error-boundary__message">{errorMessage}</p>
  <a href={resolve('/', {})} class="error-boundary__button">กลับหน้าแรก</a>
</div>

<style>
  .error-boundary {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    min-height: 100dvh;
    padding: var(--sp-4);
    text-align: center;
    gap: var(--sp-3);
  }

  .error-boundary__code {
    font-size: 3rem;
    font-weight: var(--fw-medium);
    color: var(--text-primary);
  }

  .error-boundary__message {
    font-size: var(--fs-body);
    color: var(--text-body);
    max-width: 280px;
  }

  .error-boundary__button {
    display: inline-flex;
    align-items: center;
    padding: var(--sp-2) var(--sp-5);
    background-color: var(--color-electric-blue);
    color: #ffffff;
    border-radius: var(--r);
    font-weight: var(--fw-medium);
    font-size: var(--fs-body);
    text-decoration: none;
    transition: background-color var(--t);
  }

  .error-boundary__button:hover {
    background-color: var(--color-electric-blue-hover);
  }
</style>
