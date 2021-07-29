// command line: node fetcher.js http://www.example.edu/ ./index.html
// return: "Downloaded and saved 3261 bytes to ./index.html"

// asynch 1: make an http request and wait for the response
// asynch 2: after the http request is complete, need to take the date and write it to local
// when trying to control the order of asynch, use nested callbacks
// writeFileSync
// if succeed, return `Downloaded and saved ${filesize} bytes to ./index.html"
// use Node's fs module to write the file

const request = require('request');
const fs = require('fs');
const url = process.argv[2];
const filePath = process.argv[3];


request(url, (error, response, body) => {
  console.log(`ERROR! URL IS INVALID!!`, error);

  const content = body;

  fs.writeFile(filePath, content, err => {
    if (err) {
      console.error(err);
      return `ERROR! file path is invalid`; // this does not work because this error will execute url error. STUCK!
    }
    fs.stat(filePath, (err, stats) => {
      if (err) throw err;
      console.log(`Downloaded and saved ${stats.size} bytes to ./index.html`);
    });
  });
});


