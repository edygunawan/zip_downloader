const JSZip = require("jszip");
const JSZipUtils = require("./JSZipUtils");
const fs = require("fs");

var ZipUtils = {};

ZipUtils.GetBinaryFileUrl = (file) => new Promise((resolve, reject) => {
    JSZipUtils.getBinaryContent(file, function (err, data) {
        if(err) {
            reject(err); 
        }
        resolve(data)
    });
})

ZipUtils.GetBinaryFile = (filePath) => {
    const buffer = fs.readFileSync(filePath);
    return buffer;
}

ZipUtils.GenerateZip = async(files, returnType='blob') => {
    try {
        var zip = new JSZip();
        for (const f of files) {
            if(f.name && f.bin) {
                zip.file(f.name, f.bin, {binary:true});
            }     
        }
        
        const content = await zip.generateAsync({type: returnType});
        return content;
    } catch (err) {
        console.log(err);
        return null;
    }
}

module.exports = ZipUtils;