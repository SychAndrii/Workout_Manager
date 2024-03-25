/**
 *
 * Function that returns the approximate calories lost during an exercise that uses sets and reps.
 *
 * @param {number} MET
 * @param {number} sets
 * @param {number} reps
 * @param {number} weight_in_kg
 * @returns {number} approximate calories lost
 */
function setsRepsCals(MET, sets, reps, weight_in_kg) {
  return ((MET * 3.5 * weight_in_kg) / 200) * (sets * reps * (5 / 30));
}

/**
 *
 * Function that returns the approximate calories lost during an exercise that uses duration.
 *
 * @param {number} MET
 * @param {number} minutes
 * @param {number} weight_in_kg
 * @returns {number} approximate calories lost*/
function durationCals(MET, minutes, weight_in_kg) {
  return ((MET * 3.5 * weight_in_kg) / 200) * minutes;
}

/**
 * Function that returns the approximate calories lost during an exercise that uses distance.
 *
 * @param {number} miles
 * @param {number} weight_in_lbs
 * @returns {number} approximate calories lost
 */
function distanceCals(miles, weight_in_lbs) {
  return miles * weight_in_lbs * 0.75;
}

export { setsRepsCals, durationCals, distanceCals };
