var http = require('http');
var dt = require('./dateModule');
var url = require('url');

//This is the in-built filesystem module
var fs = require('fs');

// This is the formidable module used to upload files from computer
var formidable = require('formidable');

//To upload a file, first we create an html form 
http.createServer(function (req, res) {
  // the request url should be http://localHost:8080/fileupload

  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {

      //filetoupload is the key and filetoupload.name is the value of the post body
      var oldPath = files.filetoupload.path;
      var newPath = '/Users/amrbhardwaj/Desktop/node_modules/' + files.filetoupload.name;
      
      fs.rename(oldPath, newPath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved to: ' + newPath);
        res.end();
      });

    });

  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('</form>');
    return res.end();
  }
  
}).listen(8080);


http.createServer(function (req, res) {
  // After hitting the url, this method is called twice with urls:
  // 1. / and 2. /favicon.ico(This is used by browser to fetch the url short icon)

  console.log(req.url);
  // read an html file and send the html data as response
  fs.readFile('demoFile1.html', function(err, data) {

    // response code and response header dictionary
  res.writeHead(200, {'Content-Type': 'text/html'});

  res.write(data);
  //console.log("Writing html data to response completed");

  // split the url components
  // var q = url.parse(req.url, true).query;
  // var txt = q.year + " " + q.month;
  // res.write("The date and time are currently: " + dt.myDateTime() + "\n");
  res.end();
  });

  // Appends new content(hello content) to the file. if the file(mynewfile1.txt) does not exist, it creates a new one.
  fs.appendFile('mynewfile1.txt', 'Hello content!', function(err) {
      if (err) throw err;
      //console.log("Appended new content to text file...");
  });

  // opens a file in w=write mode, creates a new empty file if the file does not exist
  fs.open('mynewfile2.txt', 'w', function(err, file) {
    if (err) throw err;
    //console.log("Opened text file in write mode...");
  });

  // It replaces the specified file and its content if it exists, If the file does not exists, a new file containing the specified content will be created.
  fs.writeFile('mynewfile3.txt', 'Hello Content!', function(err) {

    if (err) throw err;
    //console.log('Writing to text file complete...');
  });

  // //It deletes the specified file
  // fs.unlink('mynewfile1.txt', function(err) {
  //   if (err) throw err;
  //   console.log('File Deleted!');
  // });

  // It is used to rename the file
  fs.rename('mynewfile1.txt', 'myrenamedfile.txt', function (err) {
    if (err) throw err;
    console.log('mynewfile1 File renamed');
  });

  // The port number of the server the client can listen to
});