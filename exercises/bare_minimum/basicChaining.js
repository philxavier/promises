/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var octokit = require('@octokit/rest')();
// const octokit = new Octokit();

// var octoKIT = Promise.promisifyAll(octokit);


var readFileAsync = Promise.promisify(fs.readFile);
var writeFileAsync = Promise.promisify(fs.writeFile);

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO
  // then readFile get first line

  return readFileAsync(readFilePath)
    .then((fileContent) => {
      var username = fileContent.toString().split('\n')[0];
      return octokit.search.users({q: username});
      
    })
    .catch(err => console.log('error message----------->', err))
    .then((userJSON) => {
      console.log('----------------> YOU MADE IT HERE!!!!');
      console.log('-------------> JSON returned promise', userJSON);
      var userData = JSON.stringify(userJSON);
      return writeFileAsync(writeFilePath, userData);
    });
};


// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};

