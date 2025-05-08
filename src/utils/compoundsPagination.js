const Compound = require('../models/compoundSchema');

const paginateCompounds = async (page, limit, sortBy) => {
    const skip = (page - 1) * limit;

    try {
        const totalCompounds = await Compound.countDocuments();
        const totalPages = Math.ceil( totalCompounds / limit );

        const compounds = await Compound.find()
            .sort(sortBy)
            .skip(skip)
            .limit(limit);


        return { compounds, totalPages }


    } catch (err) {
        throw new Error('Error fetching paginated compounds (compoundsPagination.js):', err.message);
    }
}

module.exports = {
    paginateCompounds
}