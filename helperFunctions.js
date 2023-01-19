function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

function findRoute(graph, from, to) {
  let work = [{at: from, route: []}];
  for (let i = 0; i < work.length; i++) {
    for (let place of graph[work[i].at]) {
      if (place === to) {
        return work[i].route.concat(place);
      }
      if (!work.some((el) => el.at === place)) {
        work.push({at: place, route: work[i].route.concat(place)})
      }
    }
  }
}

function runRobot(state, robot, memory) {
  for (let turn = 0;; turn++) {
    if (state.undeliveredParcels.length === 0) {
      console.log(`Done in ${turn} turns`);
      return turn
    }
    let action = robot(state, memory);
    state = state.move(action.destination);
    memory = action.memory;
    console.log(`Moved to ${action.destination}`);
  }
}
  