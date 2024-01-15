import Home from "./components/Home.svelte";
import Dashboard2 from "./components/Dashboard5-7.svelte";
import NotFound from "./components/NotFound.svelte";
import Wykres from "./components/Wykres.svelte";
import Settings from "./components/Settings.svelte";

export const routes = {
  "/": Home,
  "/silo2": Dashboard2,
  "/wykres": Wykres,
  "/settings": Settings,
  "*": NotFound  // Zawsze na końcu
};