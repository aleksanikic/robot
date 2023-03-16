import { findRoute, randomPick } from "./helperFunctions.mjs";
import { mailRoute, roadGraph } from "./roadGraph.mjs";

export function randomRobot(state) {
  return {destination: randomPick(roadGraph[state.robotLocation])};
}

export function routeRobot(state, memory) {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return {destination: memory[0], memory: memory.slice(1)};
}

export function goalOrientedRobot(state, route) {
  if (route.length === 0) {
    let parcel = state.undeliveredParcels[0];
    console.log('parcel at', parcel.parcelLocation, 'deliver to', parcel.parcelAddress);
    if (state.robotLocation === parcel.parcelLocation) {
      route = findRoute(roadGraph, state.robotLocation, parcel.parcelAddress);
    } else {
      route = findRoute(roadGraph, state.robotLocation, parcel.parcelLocation);
    }
  }
  return {destination: route[0], memory: route.slice(1)};
}
  
export function betterGoalRobot(state, route) {
  if (route.length === 0) {
    let routes = state.undeliveredParcels.map(
      parcel => {
        if (parcel.parcelLocation !== state.robotLocation) {
          return {route: findRoute(roadGraph, state.robotLocation, parcel.parcelLocation),
                pickUp: true};
        } else {
          return {route: findRoute(roadGraph, state.robotLocation, parcel.parcelAddress),
            pickUp: false};
        }
    })

    function score({route, pickUp}) {
      return (pickUp ? 0.5 : 0) - route.length;
    } 

    route = routes.reduce((a, b) => score(a) > score(b) ? a : b).route;
  }
  return {destination: route[0], memory: route.slice(1)};
}
  