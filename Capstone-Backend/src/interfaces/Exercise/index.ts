import TypeValidator from "../../utils/other/TypeValidator";
import { EQUIPMENT, EXERCISE_TYPES, MUSCLE, IMAGE_FORMATS, VIDEO_FORMATS } from "./arrays";

/**
 * Type definition of available equipment derived from the predefined array.
 */
type Equipment = (typeof EQUIPMENT)[number];

/**
 * Type definition of available exercise types derived from the predefined array.
 */
type ExerciseType = (typeof EXERCISE_TYPES)[number];

/**
 * Type definition of available muscles derived from the predefined array.
 */
type Muscle = (typeof MUSCLE)[number];

/**
 * Checks if a given object is a valid Equipment type.
 *
 * @param {any} object Any object to be validated against Equipment type.
 * @return {boolean} True if the object is a type of Equipment, false otherwise.
 */
function instanceOfEquipment(object: any): object is Equipment {
  return EQUIPMENT.includes(object);
}

/**
 * Checks if a given object is a valid ExerciseType.
 *
 * @param {any} object Any object to be validated against ExerciseType.
 * @return {boolean} True if the object is a type of ExerciseType, false otherwise.
 */
function instanceOfExerciseType(object: any): object is ExerciseType {
  return EXERCISE_TYPES.includes(object);
}

/**
 * Checks if a given object is a valid Muscle type.
 *
 * @param {any} object Any object to be validated against Muscle type.
 * @return {boolean} True if the object is a type of Muscle, false otherwise.
 */
function instanceOfMuscle(object: any): object is Muscle {
  return MUSCLE.includes(object);
}

/**
 * Represents the core structure of an Exercise entity.
 */
interface Exercise {
  name: string;
  primaryMuscles: Muscle[];
  secondaryMuscles: Muscle[];
  type: ExerciseType;
  met: number;
  equipment: Equipment;
}

/**
 * Extends the Exercise interface to include media-related properties.
 */
export interface ExerciseWithMedia extends Exercise {
  imageURL: string;
  videoURL: string | null;
}

/**
 * Type definition for supported media MIME types of exercise images.
 */
type ImageMimeType = (typeof IMAGE_FORMATS)[number];

/**
 * Type definition for supported media MIME types of exercise videos.
 */
type VideoMimeType = (typeof VIDEO_FORMATS)[number];

/**
 * Base interface for media objects containing buffer data and MIME type.
 */
interface Media {
  buffer: Buffer
}

/**
 * Extends Media interface for image-specific properties.
 */
export interface ExerciseImage extends Media {
  mimeType: ImageMimeType;
};

/**
 * Extends Media interface for video-specific properties.
 */
export interface ExerciseVideo extends Media {
  mimeType: VideoMimeType;
}

/**
 * Checks if a given object conforms to the ExerciseImage interface.
 *
 * @param {any} object Any object to be validated against ExerciseImage interface.
 * @return {boolean} True if the object adheres to the ExerciseImage interface, false otherwise.
 */
export function instanceOfExerciseImage(object: any): object is ExerciseImage {
  return Buffer.isBuffer(object.buffer) && IMAGE_FORMATS.includes(object.mimeType);
}

/**
 * Checks if a given object conforms to the ExerciseVideo interface.
 *
 * @param {any} object Any object to be validated against ExerciseVideo interface.
 * @return {boolean} True if the object adheres to the ExerciseVideo interface, false otherwise.
 */
export function instanceOfExerciseVideo(object: any): object is ExerciseVideo {
  return Buffer.isBuffer(object.buffer) && VIDEO_FORMATS.includes(object.mimeType);
}

/**
 * Validates an object against the Exercise interface, ensuring that it contains
 * all required fields with appropriate data types.
 *
 * @param {any} object Any object to be validated against the Exercise interface.
 * @return {boolean} True if the object adheres to the Exercise interface, false otherwise.
 */
export function instanceOfExercise(object: any): object is Exercise {
  return (
    TypeValidator.isNotEmptyString(object.name) &&
    TypeValidator.isPositiveNumber(object.met) &&
    TypeValidator.isNotEmptyArray(object.primaryMuscles) &&
    TypeValidator.isArray(object.secondaryMuscles) &&
    instanceOfEquipment(object.equipment) &&
    instanceOfExerciseType(object.type) &&
    object.primaryMuscles.filter((m: any) => !instanceOfMuscle(m)).length ==
      0 &&
    object.secondaryMuscles.filter((m: any) => !instanceOfMuscle(m)).length == 0
  );
}

export default Exercise;
