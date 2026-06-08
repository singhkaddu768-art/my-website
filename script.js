var map=L.map('map').setView([28,45],3);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OpenStreetMap'}).addTo(map);
var layer=null;
const empires={
maurya:{y:"~250 BCE",t:"Peak under Ashoka",c:[[34,66],[31,73],[27,79],[22,87],[16,80],[18,73],[24,68],[30,65]]},
gupta:{y:"~400 CE",t:"Golden Age of India",c:[[31,73],[30,83],[24,88],[20,80],[24,72]]},
roman:{y:"117 CE",t:"Peak under Trajan",c:[[51,-5],[52,10],[45,29],[31,35],[30,18],[37,-7]]},
mongol:{y:"1279 CE",t:"Largest contiguous empire",c:[[54,21],[58,60],[54,118],[45,130],[36,110],[38,75]]},
ottoman:{y:"1683 CE",t:"Height of expansion",c:[[48,17],[46,30],[39,45],[29,41],[30,18],[39,14]]},
gokturk:{y:"570 CE",t:"First Turkic Khaganate",c:[[50,52],[53,72],[49,98],[42,88],[43,60]]},
mughal:{y:"1707 CE",t:"Peak under Aurangzeb",c:[[34,71],[31,83],[24,89],[18,77],[24,69]]},
byzantine:{y:"565 CE",t:"Age of Justinian",c:[[46,17],[45,30],[35,42],[31,25]]},
chola:{y:"1025 CE",t:"Maritime empire",c:[[16,76],[15,84],[8,82],[8,76]]}
};
const order=["maurya","roman","gupta","gokturk","chola","mongol","ottoman","mughal","byzantine"];
function draw(id){
 if(layer){map.removeLayer(layer);}
 let e=empires[id];
 layer=L.polygon(e.c,{color:"#d4af37",weight:2,fillOpacity:0.35}).addTo(map);
 map.fitBounds(layer.getBounds(),{padding:[15,15]});
 name.innerHTML=id.charAt(0).toUpperCase()+id.slice(1)+" Empire";
 info.innerHTML=e.t;
 era.innerHTML=name.innerHTML+" ("+e.y+")";
}
function showEmpire(id){draw(id);}
function timeline(){draw(order[document.getElementById("time").value]);}
timeline();
