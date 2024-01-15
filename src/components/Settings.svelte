<script>
    import { writable } from 'svelte/store';
    import Navbar from "./Navbar.svelte";
    import SiloSettings from "./siloSettings.svelte";

    const isAuthenticated = writable(false);
    const isChangingPassword = writable(false);
    let password = "siloMPC"; // Zdefiniuj swoje hasło tutaj
    const servicePassword = "serwisoweHaslo"; // Hasło serwisowe
    let inputPassword = "";
    let newPassword = "";
    let confirmPassword = "";

    function checkPassword() {
        if (inputPassword === password || inputPassword === servicePassword) {
            isAuthenticated.set(true);
        } else {
            alert("Nieprawidłowe hasło!");
            inputPassword = "";
        }
    }

    function changePassword() {
        if (newPassword === confirmPassword) {
            password = newPassword;
            alert("Hasło zostało zmienione.");
            isChangingPassword.set(false);
        } else {
            alert("Hasła nie są identyczne.");
        }
    }
</script>

<Navbar />

{#if $isAuthenticated}
    <div class="container mx-auto p-4 mt-10">
        {#if $isChangingPassword}
            <div class="flex flex-col items-center">
                <input type="password" bind:value={newPassword} placeholder="Nowe hasło" class="p-2 border-2 border-gray-300 mb-2" />
                <input type="password" bind:value={confirmPassword} placeholder="Potwierdź nowe hasło" class="p-2 border-2 border-gray-300 mb-2" />
                <button on:click={changePassword} class="p-2 bg-blue-500 text-white">Zmień hasło</button>
            </div>
        {:else}
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <SiloSettings siloCollection="silo1_Settings" siloName="Silos 1" siloVolume="106m³"/>
                <SiloSettings siloCollection="silo2_Settings" siloName="Silos 2" siloVolume="80m³"/>
                <SiloSettings siloCollection="silo3_Settings" siloName="Silos 3" siloVolume="80m³"/>
                <SiloSettings siloCollection="silo4_Settings" siloName="Silos 4" siloVolume="80m³"/>
                <SiloSettings siloCollection="silo5_Settings" siloName="Silos 5" siloVolume="106m³"/>
                <SiloSettings siloCollection="silo6_Settings" siloName="Silos 6" siloVolume="106m³"/>
                <SiloSettings siloCollection="silo7_Settings" siloName="Silos 7" siloVolume="106m³"/>
            </div>
            <button on:click={() => isChangingPassword.set(true)} class="p-2 bg-green-500 text-white mt-4">Zmień hasło</button>
        {/if}
    </div>
{:else}
    <div class="container mx-auto p-4 mt-10 flex justify-center items-center">
        <div>
            <input type="password" bind:value={inputPassword} placeholder="Wpisz hasło" class="p-2 border-2 border-gray-300 mb-2" />
            <button on:click={checkPassword} class="p-2 bg-blue-500 text-white">Zaloguj</button>
        </div>
    </div>
{/if}
