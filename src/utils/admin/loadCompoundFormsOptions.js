const fs = require('fs');
const path = require('path');

const loadCompoundFormsOptions = () => {
    try {
               const categoriesPath = path.join(__dirname, '../../data/compoundCategories.json');
               const categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf-8'))
       
               const pPhrasesPath = path.join(__dirname, '../../data/regulatoryInformation/pPhrases.json');
               const pPhrases = JSON.parse(fs.readFileSync(pPhrasesPath, 'utf-8'))
       
               const hPhrasesPath = path.join(__dirname, '../../data/regulatoryInformation/hPhrases.json');
               const hPhrases = JSON.parse(fs.readFileSync(hPhrasesPath, 'utf-8'))
       
               const pictogramsPath = path.join(__dirname, '../../data/regulatoryInformation/pictograms.json');
               const pictograms = JSON.parse(fs.readFileSync(pictogramsPath, 'utf-8'))
       
               return { categories, pPhrases, hPhrases, pictograms }

           } catch (error) {
               console.error('Error Loading Compound Form Options (categories, H/P phrases, pictograms).', error.message);

           }
}

module.exports = {
    loadCompoundFormsOptions
}