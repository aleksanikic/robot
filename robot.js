const roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];

const mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
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
  constructor(robotLocation, undeliveredParcels) {
    this.robotLocation = robotLocation;
    this.undeliveredParcels = undeliveredParcels;
  }

  move(nextLocation) {
    if (!this.arePlacesConnected(this.robotLocation, nextLocation)) {
      return this;
    } else {
      let undeliveredParcels = this.deliverParcels(nextLocation);
      return new VillageState(nextLocation, undeliveredParcels);
    }
  }
  
  deliverParcels(location) {
    return this.undeliveredParcels.map(parcel => {
      if (parcel.parcelLocation !== this.robotLocation) return parcel;
      return {...parcel, parcelLocation: location};
    }).filter(parcel => parcel.parcelLocation !== parcel.parcelAddress);
  }

  arePlacesConnected(a, b) {
    return roadGraph[a].includes(b);
  }

  static random() {
    let undeliveredParcels = this.randomParcels();
    return new VillageState("Post Office", undeliveredParcels);
  }

  static randomParcels(parcelCount = 5) {
    let parcels = []
    for (let i = 0; i < parcelCount; i++) {
      let parcelAddress = randomPick(Object.keys(roadGraph));
      let parcelLocation 
        for(let i = 0; ; i++){
          parcelLocation  = randomPick(Object.keys(roadGraph));
          if(parcelAddress !== parcelLocation){
            parcels.push({parcelLocation, parcelAddress})
            break;
          }
        }
    }
    return parcels
  }
}

function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

function randomRobot(state) {
  return {destination: randomPick(roadGraph[state.robotLocation])};
}

function routeRobot(state, memory) {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return {destination: memory[0], memory: memory.slice(1)};
}




//PLAYGROUND
// function runRobot(state, robot, memory) {
//   for (let turn = 0;; turn++) {
//     if (state.undeliveredParcels.length === 0) {
//       console.log(`Done in ${turn} turns`);
//       break;
//     }
//     let action = robot(state, memory);
//     state = state.move(action.destination);
//     memory = action.memory;
//     console.log(`Moved to ${action.destination}`);
//   }
// }

// runRobot(VillageState.random(), randomRobot)

