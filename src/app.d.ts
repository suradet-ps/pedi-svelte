/// <reference types="@sveltejs/kit" />
/// <reference types="vite/client" />

declare global {
  namespace App {}
}

declare module '*.svelte' {
  import type { Component } from 'svelte';
  const component: Component<any, any>;
  export default component;
}

export {};
