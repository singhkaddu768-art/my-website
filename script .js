/* ====================================
   EMPIRE ATLAS V8.5
   Created by Yashwardhan Singh
==================================== */

// Initialize Map
const map = L.map('map').setView([25, 20], 2);

L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        attribution: '&copy; OpenStreetMap contributors'
    }
).addTo(map);

// Empire Data
const empires = [
    {
        name: "Maurya Empire",
        era: "ancient",
        capital: "Pataliputra",
        founder: "Chandragupta Maurya",
        ruler: "Ashoka",
        year: "250 BCE",
        area: "~5 million km²",
        color: "#FFD700",
        coords: [
            [34,66],[32,74],[28,82],[20,88],[18,78],[24,68]
        ]
    },
    {
        name: "Roman Empire",
        era: "classical",
        capital: "Rome",
        founder: "Augustus",
        ruler: "Trajan",
        year: "117 CE",
        area: "~5 million km²",
        color: "#DC143C",
        coords: [
            [51,-5],[52,10],[45,30],[32,35],[30,15],[38,-5]
        ]
    },
    {
        name: "Mongol Empire",
        era: "medieval",
        capital: "Karakorum",
        founder: "Genghis Khan",
        ruler: "Kublai Khan",
        year: "1279 CE",
        area: "~24 million km²",
        color: "#1E90FF",
        coords: [
            [55,20],[58,60],[58,100],[52,125],[42,115],[40,70]
        ]
    },
    {
        name: "Ottoman Empire",
        era: "early-modern",
        capital: "Constantinople",
        founder: "Osman I",
        ruler: "Suleiman",
        year: "1683 CE",
        area: "~5.2 million km²",
        color: "#800080",
        coords: [
            [48,17],[46,30],[40,45],[30,28],[36,17]
        ]
    },
    {
        name: "Mughal Empire",
        era: "early-modern",
        capital: "Agra",
        founder: "Babur",
        ruler: "Aurangzeb",
        year: "1707 CE",
        area: "~4 million km²",
        color: "#228B22",
        coords: [
            [34,71],[31,84],[22,89],[19,79],[24,70]
        ]
    }
];

// References
const empireList = document.getElementById("empireList");
const empireName = document.getElementById("empireName");
const empireDetails = document.getElementById("empireDetails");
const searchBox = document.getElementById("searchBox");
const loadingScreen = document.getElementById("loadingScreen");
const timelineYear = document.getElementById("timelineYear");

let currentLayer = null;
let capitalMarkers = [];
let battleMarkers = [];

// Create Empire Buttons
function loadEmpireButtons() {
    empireList.innerHTML = "";

    empires.forEach((empire, index) => {

        const btn = document.createElement("button");

        btn.textContent = empire.name;

        btn.addEventListener("click", () => {
            showEmpire(index);
        });

        empireList.appendChild(btn);
    });
}

// Show Empire
function showEmpire(index) {

    const empire = empires[index];

    if (currentLayer) {
        map.removeLayer(currentLayer);
    }

    currentLayer = L.polygon(
        empire.coords,
        {
            color: empire.color,
            fillOpacity: 0.35,
            weight: 3
        }
    ).addTo(map);

    map.fitBounds(currentLayer.getBounds());

    empireName.textContent = empire.name;

    empireDetails.innerHTML = `
        <ul>
            <li><strong>Capital:</strong> ${empire.capital}</li>
            <li><strong>Founder:</strong> ${empire.founder}</li>
            <li><strong>Greatest Ruler:</strong> ${empire.ruler}</li>
            <li><strong>Peak Year:</strong> ${empire.year}</li>
            <li><strong>Estimated Area:</strong> ${empire.area}</li>
        </ul>
    `;

    timelineYear.textContent = empire.year;
}

// Search
searchBox.addEventListener("input", () => {

    const query = searchBox.value.toLowerCase();

    const buttons = empireList.querySelectorAll("button");

    buttons.forEach((button) => {

        if (
            button.textContent
                .toLowerCase()
                .includes(query)
        ) {
            button.style.display = "block";
        } else {
            button.style.display = "none";
        }
    });
});

// Capital Markers
document
.getElementById("toggleCapitals")
.addEventListener("click", () => {

    if (capitalMarkers.length > 0) {

        capitalMarkers.forEach(marker =>
            map.removeLayer(marker)
        );

        capitalMarkers = [];
        return;
    }

    capitalMarkers.push(
        L.marker([25.61, 85.14])
        .addTo(map)
        .bindPopup("Pataliputra")
    );

    capitalMarkers.push(
        L.marker([41.90, 12.49])
        .addTo(map)
        .bindPopup("Rome")
    );

    capitalMarkers.push(
        L.marker([41.01, 28.97])
        .addTo(map)
        .bindPopup("Constantinople")
    );
});

// Battle Markers
document
.getElementById("toggleBattles")
.addEventListener("click", () => {

    if (battleMarkers.length > 0) {

        battleMarkers.forEach(marker =>
            map.removeLayer(marker)
        );

        battleMarkers = [];
        return;
    }

    battleMarkers.push(
        L.marker([20.3, 85.8])
        .addTo(map)
        .bindPopup("Kalinga War")
    );

    battleMarkers.push(
        L.marker([29.39, 76.96])
        .addTo(map)
        .bindPopup("Battle of Panipat")
    );

    battleMarkers.push(
        L.marker([42.85, 71.37])
        .addTo(map)
        .bindPopup("Battle of Talas")
    );
});

// Toggle Borders
document
.getElementById("toggleBorders")
.addEventListener("click", () => {

    if (currentLayer) {
        map.removeLayer(currentLayer);
        currentLayer = null;
    }
});

// Reset View
document
.getElementById("resetView")
.addEventListener("click", () => {

    map.setView([25, 20], 2);
});

// Timeline Slider
const slider =
document.getElementById("timelineSlider");

slider.max = empires.length - 1;

slider.addEventListener("input", () => {

    showEmpire(slider.value);
});

// Loading Screen
window.addEventListener("load", () => {

    setTimeout(() => {

        loadingScreen.style.display = "none";

    }, 1200);
});

// Initialize
loadEmpireButtons();
showEmpire(0);