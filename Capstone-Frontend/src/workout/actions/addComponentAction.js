import ComponentFactoryCreator from "../factories/ComponentFactoryCreator";

/**
 * Creates an action object to add a new component to a workout element.
 * The component's type is determined based on the provided 'type' argument
 * and the exercise type of the element.
 *
 * @param {Object} element - The workout element to which the component will be added.
 * @param {string} type - The type of component to add. Expected values are "Active" or "Rest".
 * @returns {Object} An action object to be dispatched in the workout reducer.
 * @throws {Error} Throws an error if the 'type' argument is neither "Active" nor "Rest".
 */
const addComponentAction = (element, type) => {
  // Initialize the action structure for adding a component.
  const action = {
    type: "add_component",
    payload: {
      elementIndex: element.index,
    },
  };

  // Determine the component type based on the provided 'type' argument and the exercise type.
  let componentType = "Rest";
  if (type === "Active") {
    componentType = element.exercise.type; // Use exercise type if the component is active.
  } else if (type !== "Rest") {
    // Throw an error if an unsupported component type is specified.
    throw new Error(
      "Trying to add unknown component to a workout. Possible types: Active, Rest"
    );
  }

  // Use a factory to create the component based on the determined type.
  action.payload.component = new ComponentFactoryCreator(componentType).getComponent();

  return action;
};

export default addComponentAction;
