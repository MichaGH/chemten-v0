/**
 * Converts an array of objects into a key-value map using the specified properties.
 * 
 * This function takes an array of objects and creates a new object where the keys 
 * are derived from the specified `keyProp` property of each object, and the values 
 * are derived from the `valueProp` property of each object.
 * 
 * @param {Array<Object>} arr - An array of objects to be converted into a key-value map.
 * @param {string} keyProp - The property name in each object to be used as the key in the resulting map.
 * @param {string} valueProp - The property name in each object to be used as the value in the resulting map.
 * @returns {Object} A key-value map where each key corresponds to the value of `keyProp` in the objects, 
 * and the value corresponds to the value of `valueProp` in the objects.
 * 
 * @example
 * // Example usage:
 * const arr = [
 *     { id: 'a', label: 'Alpha' },
 *     { id: 'b', label: 'Beta' }
 * ];
 * const result = mapByKeyValue(arr, 'id', 'label');
 * console.log(result);
 * // Output:
 * // { a: 'Alpha', b: 'Beta' }
 */
const mapByKeyValue = (arr, keyProp, valueProp) => {
    return arr.reduce((accumulator, item) => {
        accumulator[item[keyProp]] = item[valueProp];
        return accumulator;
    }, {});
}

module.exports = mapByKeyValue;
