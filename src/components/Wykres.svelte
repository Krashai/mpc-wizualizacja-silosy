<script>
    import Navbar from './Navbar.svelte';
    import { onMount, onDestroy } from 'svelte';
    import { Chart } from 'frappe-charts';

    let chartElem;
    let chart

    let height = 850;

    const chartData = {
        labels: ["PONIEDZIAŁEK", "WTOREK", "ŚRODA", "CZWARTEK",
            "PIĄTEK", "SOBOTA", "NIEDZIELA", "PONIEDZIAŁEK"
        ],
        datasets: [
            {
                name: "Silos 1", type: "bar",
                values: [25, 40, 30, 35, 8, 52, 17, -4]
            },
            {
                name: "Silos 2", type: "line",
                values: [25, 50, 21, 15, 18, 32, 27, 14]
            },
            {
                name: "Silos 3", type: "line",
                values: [25, 50, 10, 15, 18, 72, 53, 14]
            },
            {
                name: "Silos 4", type: "line",
                values: [69, 25, 0, 15, 67, 87, 99, 5]
            }
        ],
    };

    onMount(() => {
        chart = new Chart(chartElem, {
            title: "Zużycie materiału",
            data: chartData,
            type: 'axis-mixed', // or 'bar', 'line', 'scatter', 'pie', 'percentage'
            height: 850,
            colors: ['#7cd6fd', '#743ee2'],
            lineOptions: {
                hideDots: 0,   //default:0
                heatline: 1,
                dotSize: 8,
                lineSize: 90,
            },
        });
    });
    onDestroy(() => {
        chart = null;
    });
</script>
<Navbar />
<div bind:this="{chartElem}"> </div>