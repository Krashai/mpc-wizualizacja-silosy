<script lang="ts">
  import Router, { link } from "svelte-spa-router";
  import { routes } from "./routes.js";
  import { onMount } from "svelte";
  import { DarkMode } from "flowbite-svelte";
  import Login from "./components/Login.svelte";
  import Navbar from "./components/Navbar.svelte";



  let data;
  async function fetchData() {
    const response = await fetch(import.meta.env.VITE_API_ENDPOINT);
    data = await response.json();
  }
  onMount(fetchData);
</script>

<Router {routes} />