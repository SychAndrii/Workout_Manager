const { default: UpdateDoneStrategy } = require("./UpdateDoneStrategy");

class UpdateWeightDone extends UpdateDoneStrategy {
  constructor(component, number) {
    super(component, "weight", "weightDone");
    this.number = number;
  }

  update() {
    const updatedWeightDone = this.number;
    return updatedWeightDone > 0
      ? {
          ...this.component,
          weightDone: updatedWeightDone,
        }
      : this.component;
  }
}

export default UpdateWeightDone;
