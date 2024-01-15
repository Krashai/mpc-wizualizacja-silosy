<script>
    import SiloComponent from "./siloComponent.svelte";


    import { pb } from "./pocketbase";
    import { onMount } from 'svelte';

    // Zmienne stanu dla różnych poziomów silosów
    let silos1Level, silos2Level, silos3Level, silos4Level, silos5Level, silos6Level, silos7Level;

    let silosData = {
        silo1: { level: 0, height: 0, diameter: 0, density: 0},
        silo2: { level: 0, height: 0, diameter: 0, density: 0},
        silo3: { level: 0, height: 0, diameter: 0, density: 0},
        silo4: { level: 0, height: 0, diameter: 0, density: 0},
        silo5: { level: 0, height: 0, diameter: 0, density: 0},
        silo6: { level: 0, height: 0, diameter: 0, density: 0},
        silo7: { level: 0, height: 0, diameter: 0, density: 0}
    };

    async function fetchInitialData() {
        try {
            const response = await pb.collection('test').getList(1, 1, {sort: '-created'});
            // Przypisywanie danych do zmiennych stanu
            silos1Level = Number(response.items[0].silos1);
            silos2Level = Number(response.items[0].silos2);
            silos3Level = Number(response.items[0].silos3);
            silos4Level = Number(response.items[0].silos4);
            silos5Level = Number(response.items[0].silos5);
            silos6Level = Number(response.items[0].silos6);
            silos7Level = Number(response.items[0].silos7);

            const silo1Settings = await pb.collection('silo1_Settings').getList(1, 1, {
                sort: '-created'
            });

            silosData.silo1.height = Number(silo1Settings.items[0].height);
            silosData.silo1.diameter = Number(silo1Settings.items[0].diameter);
            silosData.silo1.density = Number(silo1Settings.items[0].density);
            silosData.silo1.name = String(silo1Settings.items[0].name);

            if (silosData.silo1.name === '') {
                silosData.silo1.name = 'BRAK';
            }

            const silo2Settings = await pb.collection('silo2_Settings').getList(1, 1, {
                sort: '-created'
            });

            silosData.silo2.height = Number(silo2Settings.items[0].height);
            silosData.silo2.diameter = Number(silo2Settings.items[0].diameter);
            silosData.silo2.density = Number(silo2Settings.items[0].density);
            silosData.silo2.name = String(silo2Settings.items[0].name);

            if (silosData.silo2.name === '') {
                silosData.silo2.name = 'BRAK';
            }

            const silo3Settings = await pb.collection('silo3_Settings').getList(1, 1, {
                sort: '-created'
            });

            silosData.silo3.height = Number(silo3Settings.items[0].height);
            silosData.silo3.diameter = Number(silo3Settings.items[0].diameter);
            silosData.silo3.density = Number(silo3Settings.items[0].density);
            silosData.silo3.name = String(silo3Settings.items[0].name);

            if (silosData.silo3.name === '') {
                silosData.silo3.name = 'BRAK';
            }

            const silo4Settings = await pb.collection('silo4_Settings').getList(1, 1, {
                sort: '-created'
            });

            silosData.silo4.height = Number(silo4Settings.items[0].height);
            silosData.silo4.diameter = Number(silo4Settings.items[0].diameter);
            silosData.silo4.density = Number(silo4Settings.items[0].density);
            silosData.silo4.name = String(silo4Settings.items[0].name);

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

            if (silosData.silo4.name === '') {
                silosData.silo4.name = 'BRAK';
            }

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

<div class="flex flex-wrap justify-center gap-12 drop-shadow-xl">
    <SiloComponent 
    level={silos1Level}
    height={silosData.silo1.height}
    diameter={silosData.silo1.diameter}
    density={silosData.silo1.density}
    siloName='Silos 1'
    siloVolume="106m³"
    siloMaterial={silosData.silo1.name}/>
    
    <SiloComponent
    level={silos2Level}
    height={silosData.silo2.height}
    diameter={silosData.silo2.diameter}
    density={silosData.silo2.density}
    siloName='Silos 2'
    siloVolume="80m³"
    siloMaterial={silosData.silo2.name}
    />

    <SiloComponent
    level={silos3Level}
    height={silosData.silo3.height}
    diameter={silosData.silo3.diameter}
    density={silosData.silo3.density}
    siloName='Silos 3'
    siloVolume="80m³"
    siloMaterial={silosData.silo3.name}
    />

    <SiloComponent
    level={silos4Level}
    height={silosData.silo4.height}
    diameter={silosData.silo4.diameter}
    density={silosData.silo4.density}
    siloName='Silos 4'
    siloVolume="80m³"
    siloMaterial={silosData.silo4.name}
    />
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
