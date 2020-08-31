'use strict';
// gulpfile.js

const {task, serial, parallel, src, dest} = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const debug = require('gulp-debug');
const browserify = require('browserify');
const babelify = require('babelify');

const toVinylSourceStream = require('vinyl-source-stream');

const fs = require('fs');

const main_js = 'main.js';     // source code will be bundled into bundle.js
const bundle_js = 'bundle.js'; // output bundle.js

const main_html = 'main.html';   // main.html
const index_html = 'index.html'; // output index.html

const htmls = 'htmls';

const readline = require('readline');
const { Readable, Writeable } = require( 'stream' );
const through = require('through2');
const bundleHtmlTransform = () => {
  return through.obj( (vinylFile, encoding, cb) => {
    let transformedFile = vinylFile.clone();

    let result = [];
    let streamContents = null;
    if (vinylFile.isNull()) {
      console.log("The vinylFile contents were null");
    } else if (vinylFile.isBuffer()) {
      console.log("The vinylFile contents were a buffer");
      streamContents = vinylFile.contents;
    } // it will be a buffer by default.  Not dealing w/ streams

    let pageData = /[<][!][-][-]\s*page data\s*[-][-][>]/i ;
    let [before, after, rest] = streamContents.toString().split(pageData);

    console.log("Before:" + before);
    result.push(Buffer.from(before, 'utf8'));
    if (rest != null) {
      console.log("ERROR: split made more than 2 sections splitting on :" + pageData);
      console.log(rest);
      cb(false);
    }


    if (!fs.existsSync(htmls) ) {
      console.log("Warning htmls dir: " + htmls + " did not exist.");
    } else {
      let dirents = fs.readdirSync(htmls, {withFileTypes:true});

      let htmlRe = /^.*[.]html?$/;
      dirents.forEach((item,index) => {
        console.log(item);
        if (item.isFile() && item.name.match(htmlRe) ) {
          let htmlFile = htmls + '/' + item.name;
          console.log("found html file: " + htmlFile );
          const data = fs.readFileSync(htmlFile,{encoding:'utf8',flag:'r'});
          console.log(data); 
          result.push(Buffer.from(data, 'utf8'));
        } 
      });
    }

    console.log("After:" + after);
    result.push(Buffer.from(after, 'utf8'));
    transformedFile.contents = Buffer.concat(result);
    cb(null, transformedFile); 
  });
};



const html = (cb) => {
  let result = src(main_html)
    .pipe(debug())
    .pipe(bundleHtmlTransform())
    .pipe(rename(index_html))
    .pipe(dest('.'));
  cb();
};

const js = (cb) => {

  let bundler = browserify({
    entries: main_js,
    cache: {},
    packageCache: {},
    fullPaths: false,
    debug: true
  }).transform("babelify", {
    presets: ["@babel/preset-env"],
    global: true,
    ignore: [ /\/node_modules\/(?!cash-js\/)/ ]
  });

  let result = bundler
    .bundle()
    .on('error', function (err) { console.log("CAUGHT BUNDLER ERROR."); console.log(err.toString()); } )
//    .pipe(uglify())
    .pipe(toVinylSourceStream(main_js))
    .pipe(rename(bundle_js))
    .pipe(dest('js'));

  cb();
};



task(html);
exports.html = html;

task(js);
exports.js = js;

exports.default = parallel(js, html);
