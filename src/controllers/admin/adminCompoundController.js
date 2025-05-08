const Compound = require('../../models/compoundSchema');
const fs = require('fs');
const path = require('path');
const { paginateCompounds } = require('../../utils/compoundsPagination');
const { loadCompoundFormsOptions } = require('../../utils/admin/loadCompoundFormsOptions');
const { parseCompoundFormData } = require('../../utils/admin/compoundFormParser');

//! Get Compounds Table
const getPaginatedCompoundsAdmin = async (req, res) => {
    
    const page = parseInt(req.query.page) || 1
    const perPage = 4;  
    const sortBy = {createdAt : -1};

    try {
        const { compounds, totalPages } = await paginateCompounds(page, perPage, sortBy)
        
        console.log(compounds);
        res.render('admin/pages/compounds/index', {
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

//! Load Compound By CAS
const getCompoundByCasAdmin = async (req, res) => {
    const { casNumber } = req.params;
    console.log('fetching with cas', casNumber);

    try {
        const compound = await Compound.findOne({ casNumber });

        if (!compound) {
            return res.status(404).json({ message: 'Compound not found' });
          }

        res.render('admin/pages/compounds/compoundAdmin', {
            compound
        })

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

//! Get New Compound Form
const getNewCompoundFormAdmin = async (req, res) => {
   try {
        const { categories, pPhrases, hPhrases, pictograms } = await loadCompoundFormsOptions();       

        res.render('admin/pages/compounds/compoundForm.ejs', {
            // Forms Options
            categories, 
            pPhrases, 
            hPhrases, 
            pictograms,

            compound: null, //new compound
            formAction: '/admin/compounds/new',
            formTitle: 'Add New Compound'
        });

    } catch (error) {
           console.error('Error Loading test form.', error.message);
           res.status(500).json({ message: 'Failed to load test form.', error: error.message });
       }
}

//! Get New Compound Form
const getEditCompoundFormAdmin = async (req, res) => {
    try {
        const compound = await Compound.findOne({ cas: req.params.cas });
        if (!compound) return res.status(404).send('Compound not found')
        
        const { categories, pPhrases, hPhrases, pictograms } = await loadCompoundFormsOptions();       
 
         res.render('admin/pages/compounds/compoundForm.ejs', {
             // Forms Options
             categories, 
             pPhrases, 
             hPhrases, 
             pictograms,
 
             compound,
             formAction: `/admin/compounds/edit/${compound.cas}`,
             formTitle: 'Edit Compound'
         });
 
     } catch (error) {
            console.error('Error Loading test form.', error.message);
            res.status(500).json({ message: 'Failed to load test form.', error: error.message });
        }
 }


const submitNewCompoundAdmin = async (req, res) => {
    try {
        const compoundData = parseCompoundFormData(req);
        const newCompound = new Compound( compoundData );
        await newCompound.save();
    
        res.redirect(`/admin/compounds/${newCompound.casNumber}`);
        
    } catch (error) {
        console.error("Error saving compound:", error);
        res.status(500).send("Error saving compound");
    }
}

module.exports = {
    getPaginatedCompoundsAdmin,
    getCompoundByCasAdmin,
    getNewCompoundFormAdmin,
    getEditCompoundFormAdmin,
    submitNewCompoundAdmin
}