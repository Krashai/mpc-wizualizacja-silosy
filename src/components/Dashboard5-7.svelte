<script>
    import SiloComponent from "./siloComponent.svelte";
    import Navbar from "./Navbar.svelte";

    import { pb } from "./pocketbase";
    import { onMount } from 'svelte';

    // Zmienne stanu dla różnych poziomów silosów
    let silos5Level, silos6Level, silos7Level;

    let silosData = {
        silo5: { level: 0, height: 0, diameter: 0, density: 0, name: '' },
        silo6: { level: 0, height: 0, diameter: 0, density: 0, name: ''},
        silo7: { level: 0, height: 0, diameter: 0, density: 0, name: '' }
    };

    async function fetchInitialData() {
        try {
            const response = await pb.collection('test').getList(1, 1, {sort: '-created'});
            // Przypisywanie danych do zmiennych stanu
            silos5Level = Number(response.items[0].silos5);
            silos6Level = Number(response.items[0].silos6);
            silos7Level = Number(response.items[0].silos7);

            const silo5Settings = await pb.collection('silo5_Settings').getList(1, 1, {
                sort: '-created'
            })

            silosData.silo5.height = Number(silo5Settings.items[0].height);
            silosData.silo5.diameter = Number(silo5Settings.items[0].diameter);
            silosData.silo5.density = Number(silo5Settings.items[0].density);
            silosData.silo5.name = silo5Settings.items[0].name;

            const silo6Settings = await pb.collection('silo6_Settings').getList(1, 1, {
                sort: '-created'
            });

            silosData.silo6.height = Number(silo6Settings.items[0].height);
            silosData.silo6.diameter = Number(silo6Settings.items[0].diameter);
            silosData.silo6.density = Number(silo6Settings.items[0].density);
            silosData.silo6.name = silo6Settings.items[0].name;

            const silo7Settings = await pb.collection('silo7_Settings').getList(1, 1, {
                sort: '-created'
            });

            silosData.silo7.height = Number(silo7Settings.items[0].height);
            silosData.silo7.diameter = Number(silo7Settings.items[0].diameter);
            silosData.silo7.density = Number(silo7Settings.items[0].density);
            silosData.silo7.name = silo7Settings.items[0].name;

        } catch (error) {
            console.error("Błąd podczas pobierania danych:", error);
        }
    }

    onMount(async () => {
        await fetchInitialData();

        // Subskrypcja zmian w kolekcji
        pb.collection('test').subscribe('*', async () => {
            console.log('Zmiana w kolekcji Silosy');
            fetchInitialData();
        });
    });
</script>

<Navbar />
<div class="
m-5
md:mt-20
p-8 
flex
h-80vh 
w-80vw
justify-center 
overflow-hidden
drop-shadow-2xl
bg-blue-100 
dark:bg-gray-600
rounded-lg">
<div class="flex flex-wrap justify-center gap-40 drop-shadow-xl">
    <SiloComponent 
    level={silos5Level}
    height={silosData.silo5.height}
    diameter={silosData.silo5.diameter}
    density={silosData.silo5.density}
    siloName='Silos 5'
    siloVolume="106m³"
    siloMaterial={silosData.silo5.name}
    />
    
    <SiloComponent
    level={silos6Level}
    height={silosData.silo6.height}
    diameter={silosData.silo6.diameter}
    density={silosData.silo6.density}
    siloName='Silos 6'
    siloVolume="106m³"
    siloMaterial={silosData.silo6.name}
    />

    <SiloComponent
    level={silos7Level}
    height={silosData.silo7.height}
    diameter={silosData.silo7.diameter}
    density={silosData.silo7.density}
    siloName='Silos 7'
    siloVolume="106m³"
    siloMaterial={silosData.silo7.name}
    />
        
</div>
</div>
