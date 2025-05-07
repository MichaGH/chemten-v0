// Import JSON data
const pictogramsData = require('../data/regulatoryInformation/pictograms.json');
const hPhrasesData = require('../data/regulatoryInformation/hPhrases.json');
const pPhrasesData = require('../data/regulatoryInformation/pPhrases.json');

// Function to get enums from the JSON
function getEnumFromJson(data) {
    return data.map(item => item.id); // Assuming the JSON structure has an 'id' field for each entry
}

// Get enums
const pictogramsEnum = getEnumFromJson(pictogramsData);
const hPhrasesEnum = getEnumFromJson(hPhrasesData);
const pPhrasesEnum = getEnumFromJson(pPhrasesData);

// Export as a single object for convenience
module.exports = {
    getRegulatoryEnums: () => ({
        pictograms: pictogramsEnum,
        hPhrases: hPhrasesEnum,
        pPhrases: pPhrasesEnum
    })
};