import { randomPick } from "./helperFunctions.js";
import { roadGraph } from "./roadGraph.js";

export class VillageState {
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