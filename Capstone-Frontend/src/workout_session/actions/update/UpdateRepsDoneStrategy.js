const { default: UpdateDoneStrategy } = require("./UpdateDoneStrategy");

class UpdateRepsDone extends UpdateDoneStrategy {
  constructor(component, number) {
    super(component, "reps", "repsDone");
    this.number = number;
  }

  update() {
    const updatedRepsDone = this.number;
    return updatedRepsDone >= 0
      ? {
          ...this.component,
          repsDone: updatedRepsDone,
        }
      : this.component;
  }
}

export default UpdateRepsDone;
