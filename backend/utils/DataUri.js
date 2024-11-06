const dataUriParser = require('datauri/parser.js');
const path = require('path');


// Parse incoming Data URI

const getDataUri = (file)=>{
    const parser = new dataUriParser();
    const extName = path.extname(file.originalname).toString();
    return parser.format(extName, file.buffer);
}

module.exports = getDataUri;