
const parseArray = (arr) => {        

    if(Array.isArray(arr)) {
        let result = arr.map((item) => JSON.parse(item))
        return result;
    } else {
        return [];
    }

}

const parseSynonyms = (synonymsString) => {
    console.log('parsing ', synonyms)
    return synonymsString.split('; ')
}

const parseCompoundFormData = (req) => {
    try {
        console.log('req body');
        console.log(req.body);
        const {
            name,
            cas,
            formula,
            molecularWeight,
            description,
            synonyms,
            categories = {},
            hPhrases = [],
            pPhrases = [],
            pictograms = [],
        } = req.body;
        

        return {
            name,
            casNumber: cas,
            molecularFormula: formula,
            molecularWeight: parseFloat(molecularWeight),
            description: description,
            synonyms: synonyms,
            structure: `${cas}_structure.svg`,
            categories: {
                level1: parseArray(categories.level1),
                level2: parseArray(categories.level2),
                level3: parseArray(categories.level3),
            },
            regulatoryInformation: {
                pPhrases: parseArray(pPhrases),
                hPhrases: parseArray(hPhrases),
                pictograms: parseArray(pictograms),
            }
        };

    } catch (err) {
        throw new Error('Couldnt build compound data from request body ', err)
    }
}

module.exports = {
    parseCompoundFormData
}