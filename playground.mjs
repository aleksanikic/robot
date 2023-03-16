import { runRobot } from "./helperFunctions.mjs"
import { VillageState } from "./villageState.mjs"

function compareRobot(robot1, memory1, robot2, memory2) {
  let robot1Turns = 0
  let robot2Turns = 0
  for(let i = 0; i<100; i++) {
    let stateVillage = VillageState.random()
    robot1Turns += runRobot(stateVillage, robot1,  memory1)
    robot2Turns += runRobot(stateVillage, robot2,  memory2)
  }
  console.log({robot1Avarage: robot1Turns / 100, robot2Avarage: robot2Turns / 100}) 
}

// Uncomment to compare differrent robots.
// compareRobot(goalOrientedRobot, [], betterGoalRobot, [])