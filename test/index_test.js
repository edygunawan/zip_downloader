const ZipDownloader = require("../index");

describe("Generate zip content", function() {
    it("Generate content in arraybuffer format", async function(done) {
        var files = [
            './image1.jpg',
            './image2.png'
        ]
        var formtedFiles = [];
        for (f of files) {
            const binFile = ZipDownloader.GetBinaryFile(`${__dirname}/${f}`);
            const fileName = f.split('/').pop();
            formtedFiles.push({
                name: fileName,
                bin: binFile
            });
        }

        const content = ZipDownloader.GenerateZip(formtedFiles, 'arraybuffer');
        if(content) {
            done();
        } else {
            done("Failed");
        }
    })
})