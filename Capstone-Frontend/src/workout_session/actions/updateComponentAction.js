const updateComponentAction = (element, updateStrategy) => {
  return {
    type: "update_component",
    payload: {
      elementIndex: element.index,
      component: updateStrategy.update()
    },
  }
}

export default updateComponentAction;