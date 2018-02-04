var fs = require('fs');
var ON_LOAD_COUNTER = fs.readdirSync('./posts/').length - 1;
var POST_SECTION = new RegExp("<!-- INJECT:HTML -->");
var POST_DATE = new RegExp("<!-- INJECT:DATE -->");
var INDEX_HTML = fs.readFileSync('./placeholder.index.html').toString('utf8');
var ARCHIVE_HTML =  fs.readFileSync('./archive/placeholder.index.html').toString('utf8');
var POSTS = [];
var ARCHIVE = [];
console.log("POSTS: ", fs.readdirSync('./posts'))

for (var i = 3; i > 0; i--) {
	POSTS.push(fs.readFileSync('./posts/' + ON_LOAD_COUNTER + '.html').toString('utf8'));
	ON_LOAD_COUNTER--;
}
var REPLACED_INDEX = INDEX_HTML.replace(POST_SECTION, POSTS.join(''));
var REPLACED_INDEX_WITH_DATE = REPLACED_INDEX.replace(POST_DATE, new Date().toDateString());
fs.writeFileSync('./index.html', REPLACED_INDEX_WITH_DATE);

for (var i = 0; i <= ON_LOAD_COUNTER; i++) {
	ARCHIVE.push(fs.readFileSync('./posts/' + ON_LOAD_COUNTER + '.html').toString('utf8'));
}
var ARCHIVE_REPLACED_INDEX = ARCHIVE_HTML.replace(POST_SECTION, ARCHIVE.join(''));
fs.writeFileSync('./archive/index.html', ARCHIVE_REPLACED_INDEX);
