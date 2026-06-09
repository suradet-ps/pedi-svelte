<script lang="ts">
  import '$lib/styles/tokens.css';
  import '$lib/styles/base.css';
  import '$lib/styles/utilities.css';

  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';

  let { children } = $props();
</script>

<div class="app">
  <a href="#main-content" class="skip-link">ข้ามไปยังเนื้อหาหลัก</a>
  <Header />
  <main class="app__main" id="main-content">
    {@render children()}
  </main>
  <Footer />
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    min-height: 100dvh;
  }

  .app__main {
    flex: 1;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: var(--sp-4) var(--sp-4) var(--sp-6);
  }

  @media (min-width: 600px) {
    .app__main {
      padding: var(--sp-7) var(--sp-4) var(--sp-7);
    }
  }
</style>
