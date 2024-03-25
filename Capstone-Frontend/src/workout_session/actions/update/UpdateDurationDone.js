const { default: UpdateDoneStrategy } = require("./UpdateDoneStrategy");

class UpdateDurationDone extends UpdateDoneStrategy {
  constructor(component, duration, currentDuration = 0) {
    super(component, "duration", "durationDone");
    this.duration = duration;
    this.currentDuration = currentDuration;
  }

  update() {
    const updatedDurationDone = this.duration;
    return updatedDurationDone >= 0
      ? {
          ...this.component,
          durationDone: updatedDurationDone,
          currentDuration: this.currentDuration
        }
      : this.component;
  }
}

export default UpdateDurationDone;
