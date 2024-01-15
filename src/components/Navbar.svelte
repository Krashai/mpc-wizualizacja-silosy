<script>
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, DarkMode, Button } from 'flowbite-svelte';
    import Login from "./Login.svelte";
    import { currentUser, pb } from "./pocketbase";
    import MyNavLink from "./MyNavLink.svelte"
    import { link } from "svelte-spa-router";


    function singOut(){
      pb.authStore.clear();
    }
</script>
  <Navbar let:hidden let:toggle color="blue">
    <NavBrand href="/">
      <span class="self-center
      whitespace-nowrap
      text-4xl
      font-semibold
      dark:text-white">Multilayer Pipe Company</span>
    </NavBrand>
    
    <NavHamburger on:click={toggle} />
    <NavUl {hidden}>
      <MyNavLink href="/">Silosy</MyNavLink>
      <!-- <MyNavLink href="/silo2">Silosy 5-7</MyNavLink> -->
      <!-- <MyNavLink href="/wykres">Wykres</MyNavLink> -->
      <MyNavLink href="/settings">Ustawienia</MyNavLink>
    </NavUl>
    <div class="flex items-center">
        <DarkMode />
    </div>
  </Navbar>
