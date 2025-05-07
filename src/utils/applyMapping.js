/**
* Applies values to items based on the provided mapping and customizable field names.
* 
* This function will iterate through each item in the given array and check if the item has a specified key field.
* If an item has a matching key in the mapping, the corresponding value will be assigned to the specified value field.
* @param {Array} items - An array of items to which values need to be applied.
* @param {Object} mapping - An object where the keys are item keys and the values are the values to be applied.
* @param {string} keyField - The field name in each item to be used as the key.
* @param {string} valueField - The field name in each item to be used for the value.
* @returns {void} This function modifies the `items` array directly and does not return anything.
 */


// Example:
// const arr = [
//     { id: 'a', label: 'Alpha' },
//     { id: 'b', label: 'Beta' }
// ];
// const result = mapByKeyValue(arr, 'id', 'label');
// console.log(result); // Output: { a: 'Alpha', b: 'Beta' }


const applyMapping = (items, mapping, keyField, valueField) => {
    if (!Array.isArray(items)) return;
    
    items.forEach(item => {
        if (item[keyField] && mapping[item[keyField]]) {
            item[valueField] = mapping[item[keyField]];
        }
    });
};

module.exports = applyMapping
