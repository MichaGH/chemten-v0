const Compound = require('../models/compoundSchema');
const fs = require('fs');
const path = require('path');


const getTestForm = async (req, res) => {
    try {
        const categoriesPath = path.join(__dirname, '../data/compoundCategories.json');
        const categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf-8'))

        const pPhrasesPath = path.join(__dirname, '../data/regulatoryInformation/pPhrases.json');
        const pPhrases = JSON.parse(fs.readFileSync(pPhrasesPath, 'utf-8'))

        const hPhrasesPath = path.join(__dirname, '../data/regulatoryInformation/hPhrases.json');
        const hPhrases = JSON.parse(fs.readFileSync(hPhrasesPath, 'utf-8'))

        const pictogramsPath = path.join(__dirname, '../data/regulatoryInformation/pictograms.json');
        const pictograms = JSON.parse(fs.readFileSync(pictogramsPath, 'utf-8'))

        res.render('pages/tests/new.ejs', {categories, pPhrases, hPhrases, pictograms})
    } catch (error) {
        console.error('Error Loading test form.', error.message);
        res.status(500).json({ message: 'Failed to load test form.', error: error.message });
    }
}

const submitTestForm = async (req, res) => {
    const { name, cas, formula, molecularWeight, categories, hPhrases, pPhrases, pictograms } = req.body;
    
    // Process the data here
    console.log("Received Data:");
    console.log(req.body);
    
    // Optionally, you can save this data to a database or perform other actions.
    
    // Respond to the user
   res.redirect("new")
}

module.exports = {
    getTestForm,
    submitTestForm
}