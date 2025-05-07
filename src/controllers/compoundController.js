const Compound = require('../models/compoundSchema');
const fs = require('fs');
const path = require('path');

const getAllCompounds = async (req, res) => {
    try {
        const compounds = await Compound.find();
        res.json(compounds)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getPaginatedCompounds = async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = 4;
    const skip = (page - 1) * limit

    try {
        const totalCompounds = await Compound.countDocuments();
        const totalPages = Math.ceil( totalCompounds / limit );

        const compounds = await Compound.find()
            .sort({ createdAt: -1})
            .skip(skip)
            .limit(limit);

        res.render('pages/compounds/index', {
            compounds,
            currentPage: page,
            totalPages,
            title: 'Compound List'
        });
    } catch (err) {
        console.error('Error fetching paginated compounds:', err.message);
        res.status(500).send('Server Error');
    }
}

const getNewCompoundForm = async (req, res) => {
   try {
           const categoriesPath = path.join(__dirname, '../data/compoundCategories.json');
           const categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf-8'))
   
           const pPhrasesPath = path.join(__dirname, '../data/regulatoryInformation/pPhrases.json');
           const pPhrases = JSON.parse(fs.readFileSync(pPhrasesPath, 'utf-8'))
   
           const hPhrasesPath = path.join(__dirname, '../data/regulatoryInformation/hPhrases.json');
           const hPhrases = JSON.parse(fs.readFileSync(hPhrasesPath, 'utf-8'))
   
           const pictogramsPath = path.join(__dirname, '../data/regulatoryInformation/pictograms.json');
           const pictograms = JSON.parse(fs.readFileSync(pictogramsPath, 'utf-8'))
   
           res.render('pages/compounds/new.ejs', {categories, pPhrases, hPhrases, pictograms})
       } catch (error) {
           console.error('Error Loading test form.', error.message);
           res.status(500).json({ message: 'Failed to load test form.', error: error.message });
       }
}

const submitCompoundForm = async (req, res) => {
    try {
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
  
      console.log("Loaded req.body:");
      console.log(req.body)
      //? Helper to safely parse arrays of JSON strings
      // values come as string objects
      // need to parse them back to objects

      const parseArray = (arr) => {        
        //Array.isArray(arr) ? arr.map((item) => JSON.parse(item)) : [];
        if(Array.isArray(arr)) {
            let result = arr.map((item) => JSON.parse(item))
            return result;
        } else {
            return [];
        }
      }
        
  
      // Parse categories by level
      const parsedCategories = {
        level1: parseArray(categories.level1),
        level2: parseArray(categories.level2),
        level3: parseArray(categories.level3),
      };
      
      const parsedRegulatoryInfo = {
            pPhrases: parseArray(pPhrases),
            hPhrases: parseArray(hPhrases),
            pictograms: parseArray(pictograms),
      }
  
      const newCompound = new Compound({
        name,
        casNumber: cas,
        molecularFormula: formula,
        molecularWeight: parseFloat(molecularWeight),
        description: description,
        synonyms: synonyms,
        structure: "", // Set this if needed; required by schema
        categories: parsedCategories,
        regulatoryInformation: parsedRegulatoryInfo
      });
  
      await newCompound.save();
  
      res.redirect(`/compounds/${newCompound.casNumber}`);
    } catch (error) {
      console.error("Error saving compound:", error);
      res.status(500).send("Error saving compound");
    }
  };
const getCompoundByCas = async (req, res) => {
    const { casNumber } = req.params;
    console.log('fetching with cas', casNumber);

    try {
        const compound = await Compound.findOne({ casNumber });

        if (!compound) {
            return res.status(404).json({ message: 'Compound not found' });
          }

        res.render('pages/compounds/compound', {
            compound
        })

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}


const fillDummyDb = async (req, res) => {
    try {
        const compoundsPath = path.join(__dirname, '../data/dummyDb.json');
        const compoundsRaw = fs.readFileSync(compoundsPath, 'utf-8');
        const compoundsData = JSON.parse(compoundsRaw);

        for (const compoundData of compoundsData) {
            const compound = new Compound(compoundData);
            await compound.save();
        }
        
        res.status(200).json({ message: 'Dummy compounds saved successfully!' });
    } catch (error) {
      console.error('Error saving dummy compounds:', error.message);
      res.status(500).json({ message: 'Failed to save dummy compounds.', error: error.message });
    }

   
}

const emptyOutDb = async (req, res) => {
    try {
        await Compound.deleteMany({});
        res.status(200).send('Database reset successful. All Compounds Deleted.')
    } catch(err) {
        console.error(error);
        res.status(500).send('Error resetting the database.');        
    }
}

module.exports = {
    getAllCompounds,
    getPaginatedCompounds,
    fillDummyDb,
    emptyOutDb,
    getCompoundByCas,
    getNewCompoundForm,
    submitCompoundForm
}