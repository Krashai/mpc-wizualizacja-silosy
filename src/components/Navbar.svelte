<script>
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, DarkMode, Button } from 'flowbite-svelte';
    import MyNavLink from "./MyNavLink.svelte"
    import { onMount, onDestroy } from 'svelte';

    let day, month, hour, minute;
    let interval;

    function updateTime() {
        const now = new Date();
        day = now.getDate();
        month = now.toLocaleString('default', { month: 'long' });
        hour = now.getHours();
        minute = now.getMinutes().toString().padStart(2, '0'); // dodaje 0 przed minutami jeśli jest to potrzebne
    }

    onMount(() => {
        updateTime(); // Aktualizuje czas przy ładowaniu
        interval = setInterval(updateTime, 1000); // Ustawia interval
    });

    onDestroy(() => {
        clearInterval(interval); // Usuwa interval przy niszczeniu komponentu
    });
</script>
  <Navbar let:hidden let:toggle color="blue">
    <div>
    <NavBrand href="/">
      <span class="self-center
      whitespace-nowrap
      text-4xl
      font-semibold
      dark:text-white">Multilayer Pipe Company</span>
    </NavBrand>
    <p class=" text-xl font-semibold dark:text-white">{day} {month} | {hour}:{minute}</p>
  </div>
    
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
