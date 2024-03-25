import UpdateDurationDone from "../actions/update/UpdateDurationDone";
import UpdateRepsDone from "../actions/update/UpdateRepsDoneStrategy";
import UpdateWeightDone from "../actions/update/UpdateWeightDone";

class UpdateStrategiesConstructorsFactory {
    create(type) {
        const strategyConstructors = [];
        if(type === "Rest") {
            strategyConstructors.push((component) => new UpdateDurationDone(component, 0));
        }
        else if(type === "Weighted_Reps") {
            strategyConstructors.push((component) => new UpdateWeightDone(component, component.weight));
            strategyConstructors.push((component) => new UpdateRepsDone(component, 0));
        }
        return strategyConstructors;
    }
}

export default UpdateStrategiesConstructorsFactory;
