import axios from 'axios';
import fs from "fs";
import Jimp = require("jimp");

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    // NOTE from @lucashorward
    // Using the standard code here reslted in this error;
    // UnhandledPromiseRejectionWarning: Error: Could not find MIME for Buffer <null>
    // I used this info to fix it: 
    // https://stackoverflow.com/questions/61768743/node23042-unhandledpromiserejectionwarning-error-could-not-find-mime-for-bu
    // https://github.com/oliver-moran/jimp/issues/775
    try {
      const result = await axios({
        method: 'get',
        url: inputURL,
        responseType: 'arraybuffer'
      })
      .then(function ({data: imageBuffer}) {
        return Jimp.read(imageBuffer)
      });
      const outpath = `/tmp/filtered.${Math.floor(Math.random() * 2000)}.jpg`
      result.resize(256, 256).quality(60).greyscale().write(__dirname + outpath, () => {
        resolve(__dirname + outpath);
      });
    } catch (error) {
      reject(error);
    }
  });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files: Array<string>) {
  for (let file of files) {
    fs.unlinkSync(file);
  }
}
