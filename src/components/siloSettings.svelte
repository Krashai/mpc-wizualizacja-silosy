<script>
    import { onMount } from 'svelte';
    import { pb } from "./pocketbase"; // Załóżmy, że to jest Twój klient API

    export let siloCollection;
    export let siloName = "Silo"; // Domyślna nazwa, jeśli nie zostanie przekazana
    export let siloVolume = "";

    let silo = {
        height: 0,
        diameter: 0,
        density: 0,
    };

    let recordID; // Zmienna do przechowywania ID ostatniego rekordu
    let isDataLoaded = false; // Flaga wskazująca, czy dane zostały załadowane

    async function loadSiloData() {
        try {
            const response = await pb.collection(String(siloCollection)).getList(1, 1, {
                sort: '-created'
            });
            console.log(`Dane ${siloCollection} załadowane`, response.items[0]);

            silo.height = response.items[0].height;
            silo.diameter = response.items[0].diameter;
            silo.density = response.items[0].density;
            silo.name = response.items[0].name;

            recordID = response.items[0].id; // Zapisanie ID rekordu
            isDataLoaded = true; // Ustawienie flagi na true po załadowaniu danych
        } catch (error) {
            console.error(`Błąd podczas ładowania danych z ${siloCollection}:`, error);
        }
    }

    async function updateSiloData() {
        if (!isDataLoaded) return; // Zapobieganie aktualizacji przed załadowaniem danych

        try {
            await pb.collection(String(siloCollection)).update(recordID, silo);
            console.log(`Dane ${siloCollection} zaktualizowane`);
        } catch (error) {
            console.error(`Błąd podczas aktualizacji danych w ${siloCollection}:`, error);
        }
    } 

    onMount(() => {
        loadSiloData();
    });

    $: if (silo && isDataLoaded) {
        updateSiloData();
    }
</script>

<div class="max-w-sm bg-blue-200 p-4 border border-gray-200 rounded shadow-md bg-blue-200
drop-shadow-xl
dark:bg-gray-700
dark:text-white">
    <h1 class="text-2xl font-bold mb-2">{siloName}</h1> 
    <div class="mb-1">
        <label for="height" class="block text-sm font-bold text-gray-700 dark:text-white">Nazwa materiału</label>
        <input type="string" id="name" bind:value={silo.name} 
               class="mt-1 block w-full border border-gray-300 rounded-md dark:text-black shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
    </div>
    <div class="mb-1">
        <label for="height" class="block text-sm font-bold text-gray-700 dark:text-white">Wysokość [m]</label>
        <input type="number" id="height" bind:value={silo.height} 
               class="mt-1 block w-full border border-gray-300 rounded-md dark:text-black shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
    </div>

    <div class="mb-1">
        <label for="diameter" class="block text-sm font-bold text-gray-700 dark:text-white">Średnica [m]</label>
        <input type="number" id="diameter" bind:value={silo.diameter} 
               class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm dark:text-black focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
    </div>

    <div class="mb-1">
        <label for="density" class="block text-sm font-bold text-gray-700 dark:text-white">Gęstość [kg/m³]</label>
        <input type="number" id="density" bind:value={silo.density} 
               class="mt-1 block w-full border border-gray-300 rounded-md dark:text-black shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
    </div>
    <div>
        <p class="block text-md font-bold text-gray-700 dark:text-white">Uwaga, maksymalna pojemność: <b>{siloVolume}</b></p>
    </div>
</div>
