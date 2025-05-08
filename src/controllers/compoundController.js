const Compound = require('../models/compoundSchema');
const fs = require('fs');
const path = require('path');

const { paginateCompounds } = require('../utils/compoundsPagination');


const getPaginatedCompounds = async (req, res) => {
    
    const page = parseInt(req.query.page) || 1
    const perPage = 4;  
    const sortBy = {createdAt : -1};

    try {
        const { compounds, totalPages } = await paginateCompounds(page, perPage, sortBy)
        
        console.log(compounds);
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


module.exports = {
    getPaginatedCompounds,
    getCompoundByCas,
}