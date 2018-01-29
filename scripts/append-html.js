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
	p.removeChild(n);
	t.innerHTML = this.responseText;
	p.appendChild(t.content.firstChild);
	p.appendChild(n);
	GLOBAL_SHOW_MORE_COUNTER--;
}
function handleSend(n, c) {
	c--;
	this.send();
}
function fetch(n) {
	if (GLOBAL_SHOW_MORE_COUNTER >= 0) {
		try {
			var oReq = new XMLHttpRequest();
			oReq.addEventListener("load", reqListener.bind(oReq, n));
			oReq.open("GET", "/posts/" + GLOBAL_SHOW_MORE_COUNTER  +".html");
			handleSend.call(oReq, n, GLOBAL_SHOW_MORE_COUNTER);
		} catch (e) {
			console.log("error: ", e.message);
		}
	} else {
		var p = n.parentNode;
		p.removeChild(n);
	}
}

function toggleView(n) {
	var pNode = n.parentElement.parentElement.nextElementSibling;
	var ihtml = n.innerHTML.replace(/\s/g, "");
	pNode.setAttribute("style", "display: " + styleToggle[pNode.style.display] + ";");
	n.innerHTML = styleToggle[ihtml];
}
