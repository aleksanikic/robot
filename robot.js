const roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];
function buildGraph(roads){
  let graph = {}
  for (const road of roads) {
   let [from,to] = road.split('-')
   addEdge(from,to,graph)
   addEdge(to,from,graph)
  }
  return graph
}
function addEdge(from,to,graph){
  if(!graph[from]){
    graph[from] = [to]
  }else{
    graph[from].push(to)
  }
}
const roadGraph = buildGraph(roads);

class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels.map(p => {
        if (p.place != this.place) return p;
        return {place: destination, address: p.address};
      }).filter(p => p.place != p.address);
      return new VillageState(destination, parcels);
    }
  }
}

VillageState.random = function(parcelCount = 5) {
  let parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    let address = randomPick(Object.keys(roadGraph));
    let place 
      for(let i = 0; ; i++){
        place  = randomPick(Object.keys(roadGraph));
        if(address !== place){
          parcels.push({place, address})
          break;
        }
      }
  }
  return new VillageState("Post Office", parcels);
};

