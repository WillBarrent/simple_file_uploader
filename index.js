const http = require("http");
const formidable = require("formidable");
const fs = require("fs");

http
  .createServer(function (req, res) {
    if (req.url == "/fileupload") {
      const form = new formidable.IncomingForm();
      form.parse(req, function (err, fields, files) {
        const oldPath = files.filetoupload[0].filepath;
        const newPath = "/tmp/Files/" + files.filetoupload[0].originalFilename;
        fs.rename(oldPath, newPath, function (err) {
          if (err) throw err;
          res.write("File Uploaded And Moved");
          res.end();
        });
      });
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(
        '<form action="fileupload" method="post" enctype="multipart/form-data">'
      );
      res.write('<input type="file" name="filetoupload"><br>');
      res.write('<input type="submit">');
      res.write("</form>");
      return res.end();
    }
  })
  .listen(8080);
