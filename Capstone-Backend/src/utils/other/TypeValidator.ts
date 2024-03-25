/**
 * Provides utility methods for validating various data types and structures,
 * focusing on common validation needs such as checking for non-empty strings,
 * positive numbers, and array checks.
 */
class TypeValidator {
  /**
   * Validates whether the provided data is a non-empty string.
   *
   * @param {any} data - The data to validate.
   * @return {boolean} True if the data is a non-empty string, false otherwise.
   */
  isNotEmptyString(data: any): boolean {
    return typeof data === "string" && data.trim() !== "";
  }

  /**
   * Validates whether the provided data is a positive number (greater than zero).
   *
   * @param {any} data - The data to validate.
   * @return {boolean} True if the data is a positive number, false otherwise.
   */
  isPositiveNumber(data: any): boolean {
    const number = +data;
    return typeof number === "number" && !isNaN(number) && number > 0;
  }

  /**
   * Validates whether the provided data is a positive number or zero.
   *
   * @param {any} data - The data to validate.
   * @return {boolean} True if the data is a positive number or zero, false otherwise.
   */
  isPositiveNumberOrZero(data: any): boolean {
    const number = +data;
    return typeof number === "number" && !isNaN(number) && number >= 0;
  }

  /**
   * Validates whether the provided data is an array.
   *
   * @param {any} data - The data to validate.
   * @return {boolean} True if the data is an array, false otherwise.
   */
  isArray(data: any): boolean {
    return Array.isArray(data);
  }

  /**
   * Validates whether the provided data is a non-empty array.
   *
   * @param {any} data - The data to validate.
   * @return {boolean} True if the data is a non-empty array, false otherwise.
   */
  isNotEmptyArray(data: any): boolean {
    return this.isArray(data) && data.length > 0;
  }
}

export default new TypeValidator();
