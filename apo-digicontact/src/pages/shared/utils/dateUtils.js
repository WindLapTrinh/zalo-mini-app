// src/shared/utils/dateUtils.js

/**
 * Generates test data for months or years.
 * @param {string} prefix - The prefix for the month or year display name.
 * @param {number} number - The number of items to generate.
 * @param {string} [prefixText] - Optional prefix text (e.g., "Tháng", "Năm").
 * @param {number} [currentYear] - Optional current year for year data.
 * @returns {Array} An array of objects with value and displayName properties.
 */
export const genTestData = (prefix, number, prefixText = '', currentYear) => {
    const data = [];
    for (let i = 1; i <= number; i++) {
      data.push({
        value: i,
        displayName: `${prefixText} ${i}`,
      });
    }
    return data;
  };
  
  /**
   * Generates test data for years.
   * @param {string} prefix - The prefix for the year display name.
   * @param {number} endYear - The end year for the range.
   * @param {string} prefixText - The prefix text for the year display name.
   * @param {number} currentYear - The current year to start the range.
   * @returns {Array} An array of objects with value and displayName properties.
   */
  export const getYear = (prefix, endYear, prefixText, currentYear) => {
    const data = [];
    for (let i = currentYear; i <= endYear; i++) {
      data.push({
        value: i,
        displayName: `${prefixText} ${i}`,
      });
    }
    return data;
  };
  