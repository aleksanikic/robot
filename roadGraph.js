/*    
The final graph data:
  {
    Alice's House:	["Bob's House", "Cabin", "Post Office"],
    Bob's House:	["Alice's House", "Town Hall"],
    Cabin:	["Alice's House"],
    Post Office:	["Alice's House", "Marketplace"],
    Town Hall:	[
        "Bob's House",
        "Daria's House",
        "Marketplace",
        "Shop",
    ],
    Daria's House:	["Ernie's House", "Town Hall"],
    Ernie's House:	["Daria's House", "Grete's House"],
    Grete's House:	["Ernie's House", "Farm", "Shop"],
    Farm:	["Grete's House", "Marketplace"],
    Shop:	["Grete's House", "Marketplace", "Town Hall"],
    Marketplace:	[
        "Farm",
        "Post Office",
        "Shop",
        "Town Hall"
    ]
  } 
*/

const mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
];

const roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];

function buildGraph(roads) {
  let graph = {}
  for (const road of roads) {
    let [from, to] = road.split('-')
    addEdge(from, to, graph)
    addEdge(to, from, graph)
  }
  return graph
}
function addEdge(from, to, graph) {
  if (!graph[from]) {
    graph[from] = [to]
  } else {
    graph[from].push(to)
  }
}
const roadGraph = buildGraph(roads);
