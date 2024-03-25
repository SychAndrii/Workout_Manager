export default function workoutSessionReducer(draft, action) {
  const { type, payload } = action;
  console.log(type);

  switch (type) {
    // Case handling for various actions:
    case "increment_current_element":
      incrementCurrentElement(draft);
      break;
    case "decrement_current_element":
      decrementCurrentElement(draft);
      break;
    case "increment_current_component":
      incrementCurrentComponent(draft);
      break;
    case "update_component":
      updateComponent(draft.elements, payload.elementIndex, payload.component);
      break;
    default:
      console.log("UNKNOWN ACTION TYPE!");
      break;
  }
}

function updateComponent(elements, elementIndex, component) {
  const elem = elements.find((el) => el.index === elementIndex);

  if (!elem) {
    return;
  }

  const componentIndex = elem.components.findIndex(
    (c) => c.index === component.index
  );

  if (componentIndex === -1) {
    return;
  }

  console.log(component);

  elem.components[componentIndex] = component;
}

function incrementCurrentElement(draft) {
  if (
    draft.current.elementIndex === -1 ||
    draft.current.componentIndex === -1
  ) {
    draft.current = {
      elementIndex: 0,
      componentIndex: 0,
    };
    return;
  }

  const elements = draft.elements;

  const currentElement = elements.find(
    (el) => el.index === draft.current.elementIndex
  );

  if (currentElement.index != draft.elements.length - 1) {
    draft.current = {
      elementIndex: currentElement.index + 1,
      componentIndex: 0,
    };
  }
}

function incrementCurrentComponent(draft) {
  if (
    draft.current.elementIndex === -1 ||
    draft.current.componentIndex === -1
  ) {
    draft.current = {
      elementIndex: 0,
      componentIndex: 0,
    };
    return;
  }

  const elements = draft.elements;

  const currentElement = elements.find(
    (el) => el.index === draft.current.elementIndex
  );

  const currentComponent = currentElement.components.find(
    (c) => c.index === draft.current.componentIndex
  );

  if (currentComponent.index != currentComponent.components.length - 1) {
    draft.current = {
      elementIndex: currentElement.index + 1,
      componentIndex: 0,
    };
  }
}

function decrementCurrentElement(draft) {
  if (
    draft.current.elementIndex === -1 ||
    draft.current.componentIndex === -1
  ) {
    draft.current = {
      elementIndex: 0,
      componentIndex: 0,
    };
    return;
  }

  const elements = draft.elements;

  const currentElement = elements.find(
    (el) => el.index === draft.current.elementIndex
  );

  if (currentElement.index != 0) {
    draft.current = {
      elementIndex: currentElement.index - 1,
      componentIndex: 0,
    };
  }
}