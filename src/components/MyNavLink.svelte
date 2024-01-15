<script>
    import { link } from "svelte-spa-router";
    export let href;
  </script>
  
  <a href={href} use:link class="block py-2 pr-4 pl-3 md:p-0 rounded md:border-0 text-white bg-primary-700 md:bg-transparent md:text-primary-700 md:dark:text-white dark:bg-primary-600 md:dark:bg-transparent text-blue-600 text-2xl">
    <slot></slot>
  </a>
  
  <style>
    /* Tutaj możesz dodać dodatkowe style lub modyfikacje, jeśli potrzebujesz */
  </style>
  