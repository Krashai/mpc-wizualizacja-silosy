<script>
    export let level = 320;
    export let color = "";

</script>
    
    <style>
        svg {
            height: 380x;
            width: 100%;
            margin-top: 0;
            display: block;
        }
    </style>
    
    <svg viewBox="0 0 200 400" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
        <!-- Korpus silosu z czarną obwódką -->
        <rect x="50" y="50" width="100" height="100%" fill="grey" stroke="black" stroke-width="2" />
    
        <!-- Poziome pasy na korpusie silosu -->
        <rect x="50" y="100" width="100" height="5" fill="darkgrey" />
        <rect x="50" y="200" width="100" height="5" fill="darkgrey" />
        <rect x="50" y="300" width="100" height="5" fill="darkgrey" />
    
        <!-- Dach silosu z czarną obwódką -->
        <path d="M 50 50 Q 100 0, 150 50" fill="grey" stroke="black" stroke-width="2" />
    
        <!-- Poziom materiału w silosie z lekko zaokrąglonym górnym brzegiem i czarną obwódką -->
        <path d="M 75 {400-level} Q 100 {360-level}, 125 {400-level} V 400 H 75 Z" fill={color} stroke="black" stroke-width="2" />
    </svg>