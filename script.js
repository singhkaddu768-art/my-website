var map=L.map('map').setView([28,20],2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OpenStreetMap'}).addTo(map);
var marker,circle;
function showEmpire(name,lat,lng,ruler){
if(marker)map.removeLayer(marker);
if(circle)map.removeLayer(circle);
marker=L.marker([lat,lng]).addTo(map);
circle=L.circle([lat,lng],{radius:1000000,fillOpacity:0.25}).addTo(map);
map.flyTo([lat,lng],4,{duration:1.5});
title.innerHTML=name;
details.innerHTML='Famous ruler: '+ruler+'<br>Approximate historical heartland highlighted.';
}
