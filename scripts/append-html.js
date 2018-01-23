var styleToggle = {
	block: "none",
	none: "block",
	Hide: "Show",
	Show: "Hide"
};

// Script to append html
function reqListener (n) {
	var t = document.createElement('template');
	var p = n.parentNode;
	t.innerHTML = this.responseText;
	p.appendChild(t.content.firstChild);
	p.lastChild.addEventListener("click", toggleView);
}
function handleError(n) {
	var p = n.parentNode;
	p.removeChild(n);
}
function handleSend(c) {
	c--;
	this.send();
}
function fetch(n, c) {
	try {
		var oReq = new XMLHttpRequest();
		var cs = c >= 0 ? c : GLOBAL_SHOW_MORE_COUNTER;
		oReq.addEventListener("load", reqListener.bind(oReq, n));
		oReq.open("GET", "/posts/" + cs  +".html");
		cs < 0 ? handleError.call(oReq, n) : handleSend.call(oReq, cs);
	} catch (e) {
		console.log("error: ", e.message);
	}
}

function toggleView(n) {
	var pNode = n.parentElement.parentElement.nextElementSibling;
	var ihtml = n.innerHTML.replace(/\s/g, "");
	pNode.setAttribute("style", "display: " + styleToggle[pNode.style.display] + ";");
	n.innerHTML = styleToggle[ihtml];
}
