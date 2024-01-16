<script>
    import Graph from "./Graph.svelte";

export let level = 0;
export let height = 0;
export let diameter = 0;
export let density = 0;
export let siloName = "Silos 1";
export let siloMaterial = "Materiał";
export let siloVolume = "";

let materialAmount = 0; // Deklaracja zmiennej materialAmount
let scaledLevel = 0;    // Deklaracja zmiennej scaledLevel
let color = "black";    // Początkowa wartość koloru
let volumeSilo = 0;
let siloActualLevel = 0;
/// Obliczenie objętości silosa
$: {
    volumeSilo = (Math.PI * Math.pow((diameter /2), 2) * height)
    console.log(siloName + " Objętość silosa " + volumeSilo)
}

$: {
    siloActualLevel = (level / 100)
}
// Kalkulowanie ilości materiału w silosie
$: {
    materialAmount = ((volumeSilo * siloActualLevel) * density).toFixed(2);
    console.log(siloName + " Ilość materiału " + materialAmount)
}

// Obliczenie ilości materiału możliwego do załadowania silosu do pełna
$: {
    siloVolume = ((volumeSilo - (volumeSilo * siloActualLevel)) * density ).toFixed(2);
}

// Skalowanie zmiennej
$: {
    scaledLevel = (level / 100) * 320;
}

// Reaktywna deklaracja do ustawiania koloru
$: {
    color = getColorFromMaterial(siloMaterial);
}

function getColorFromMaterial(material) {
    if (!material) { // Sprawdzenie, czy material nie jest undefined lub pusty
        return "black"; // Domyślny kolor, gdy material jest undefined lub pusty
    }

    const nameUpper = material.toUpperCase();
    if (nameUpper.includes("POL")) {
        return "red";
    } else if (nameUpper.includes("POD")) {
        return "blue";
    } else if (nameUpper.includes("BO")){
        return "pink"
    } else if (nameUpper.includes("L")) {
        return "green";
    } else if (nameUpper.includes("D")) {
        return "yellow";
    } else {
        return "black";
    }
}
</script>

<div class="
p-1
rounded-lg
w-48
h-60vh
bg-blue-200
drop-shadow-xl
dark:bg-gray-700">
        <p class="text-4xl font-semibold dark:text-white">{siloName}</p>
        <p class="font-bold text-6xl dark:text-white">{level}%</p>

        <Graph level={scaledLevel} color={color} />

        <div class="w-full flex justify-center">
            <p class="text-2xl font-semibold dark:text-white">{siloMaterial}</p>
        </div>
        <div class="w-full flex justify-center">
            <p class="text-xl font-semibold dark:text-white">{materialAmount} tony</p>
        </div>
        <div class="bg-blue-300 dark:bg-gray-800 rounded-lg">

        
        <div class="w-full flex justify-center mt-3">
            <p class="text-xl font-semibold dark:text-white"> {siloVolume} tony</p>
        </div>
        <div class="w-full flex justify-center">
            <p class="text-md font-semibold dark:text-white">WOLNY BUFOR</p>
        </div>
    </div>
     </div>

