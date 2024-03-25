import { EXERCISE_TYPES } from "../Exercise/arrays";

// To add more component types, modify this array
export const COMPONENT_TYPES = [
  ...EXERCISE_TYPES,
  "Rest"
] as const;


// To add more workout visibility types, modify this array
export const WORKOUT_VISIBILITY = [
    "Private",
    "Public"
] as const;
