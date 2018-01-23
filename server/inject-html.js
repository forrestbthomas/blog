var fs = require('fs');
var ON_LOAD_COUNTER = fs.readdirSync('./posts/').length - 1;
var SHOW_MORE_COUNTER = (ON_LOAD_COUNTER - 3);
var POST_SECTION = new RegExp("<!-- INJECT:HTML -->");
var INDEX_HTML = fs.readFileSync('./placeholder.index.html').toString('utf8');
var POSTS = [];
var showMore = '<div class="clickable" onclick="fetch(this);">Show More...</div>';

for (var i = 3; i > 0; i--) {
	POSTS.push(fs.readFileSync('./posts/' + ON_LOAD_COUNTER + '.html').toString('utf8'));
	ON_LOAD_COUNTER--;
}

if (SHOW_MORE_COUNTER >= 0) {
	POSTS.push(showMore);
}
POSTS.push('<script>this.GLOBAL_SHOW_MORE_COUNTER='+SHOW_MORE_COUNTER+'</script>')

var REPLACED_INDEX = INDEX_HTML.replace(POST_SECTION, POSTS.join(''));
fs.writeFileSync('./index.html', REPLACED_INDEX)
