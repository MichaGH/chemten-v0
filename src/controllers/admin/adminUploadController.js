const path = require('path');
const fs = require('fs');





const getUploadStructurePage = async (req, res) => {
    const dir = path.join(__dirname, `../../../public/images/structures`);

    console.log('getUploadStructurePage dir: ', dir)
    
    fs.readdir(dir, (err, files) => {
        
        if (err) {
            return res.status(500).send('error reading files');
        }

        console.log('files found: ', files);
        res.render('admin/pages/structures', {files});
    })
}

const uploadStructure = async (req, res) => {
    res.redirect('/admin/uploads/structures');
}

module.exports = {
    getUploadStructurePage,
    uploadStructure
}