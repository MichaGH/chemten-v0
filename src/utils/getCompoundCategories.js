const fs = require('fs');
const path = require('path');

const categories = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/compoundCategories.json')));

function getLevelIds(level) {
    return categories[level].map(category => category.id);
}

module.exports = { getLevelIds };