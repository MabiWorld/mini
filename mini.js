$(function() {
	$("#url").keyup(minify).change(minify);
	$(".autoselect").focus(select).mouseup(select);
});

function select() {
	$(this).select();
	return false;
}

function real2mini(real) {
	return parseInt(real).toString(36)
}

function setLink(miniBit, args) {
	var link = "http://mabi.world/" + miniBit + (args || "");
	$("#linkout").attr("href", link).text(link);
	$("#partyout").show();
	$("#partyout2").val(miniBit).focus();
}

function setError(link, error) {
	$("#linkout").attr("href", link).text(error);
	$("#partyout").hide();
}

function minify() {
	var $this = $(this);
	var link = $this.val();

	if (!link) {
		setError("", "");
		return;
	}

	// MabiWorld stuff
	if(isMini(link)) return echoMini(link);
	if(isOldMWThread(link)) return makeOldMWThread(link);
	if(isOldMWForum(link)) return makeOldMWForum(link);
	if(isMWW(link)) return makeMWW(link);
	// TODO: New MW forums

	// Other stuff
	if(isNexonThread(link)) return makeNexonThread(link);
	if(isNationThread(link)) return makeNationThread(link);

	setError(link, "Not a supported link.");
}

///////////////////////////// URL Splitters /////////////////////////////
function isMini(link) {
	// 1 optional mini.php direct access portion
	// 2 options arguments before link in direct access portion
	// 3 mini link
	return link.match(/:\/\/mabi\.world\/(mini\.php\?(.*&)?u=)?([wTFCND][0-9a-zA-Z]+)/);
}

function isOldMWThread(link) {
	// 1 base url (possibly without subdomain)
	// 2 thread ID
	// 3 post anchor if it was given
	// 4 post ID if anchor was given
	return link.match(/(archive\.mabi\.world|\.mabinogiworld\.com)\/showthread\.php\?([0-9]+)[^#]*(#post([0-9]+))?/);
}

function isOldMWForum(link) {
	// 1 base url (possibly without subdomain)
	// 2 forum ID
	return link.match(/(archive\.mabi\.world|\.mabinogiworld\.com)\/forumdisplay\.php\?([0-9]+)/);
}

function isMWW(link) {
	// 1 base url (without wiki subdomain)
	// 2 path without leading /
	// 3 wiki or view
	// 4 page title for wiki or view
	// 5 "index.php" if used
	// 6 page title for index.php
	return link.match(/wiki\.(mabinogiworld.com|mabi.world)\/((view|wiki)\/([^?#]+)|(index.php)?\?.*?title=([^&]+))/);
}

function isNexonThread(link) {
	// 1 thread ID
	return link.match(/mabinogi.nexon.net\/Community\/forums#%2Fshowthread.php%3F([0-9]+)/);
}

function isNationThread(link) {
	// 1 "threads/" or "showthread.php?p="
	// 2 thread ID
	// 3 post anchor if it was given
	// 4 post ID if anchor was given
	return link.match(/mabination\.com\/(threads\/|showthread\.php\?p=)([0-9]+)[^#]*(#post([0-9]+))?/)
}

/////////////////////////////// Minifiers ///////////////////////////////
function echoMini(link) {
	var parts = isMini(link);
	setLink(parts[3]);
}

function makeOldMWThread(link) {
	var parts = isOldMWThread(link),
	thread = parts[2],
	post = parts[4];

	setLink("T" + real2mini(thread), post ? "?" + real2mini(post) : undefined);
}

function makeOldMWForum(link) {
	var parts = isOldMWForum(link),
	forum = parts[2];

	setLink("F" + forum);
}

var cacheMWW = {};
function makeMWW(link) {
	if (link in cacheMWW) {
		setLink("w" + cacheMWW[link]);
		return;
	}

	var parts = isMWW(link),
	title = parts[4] || parts[6];
	$.ajax({
		"url": "http://wiki.mabinogiworld.com/api.php?action=query&format=json&titles=" + title,
		"dataType": "json",
		"success": function(data) {
			console.log(data);
			if("query" in data) {
				if("pages" in data.query) {
					for(var x in data.query.pages) {
						x = cacheMWW[link] = real2mini(x);
						setLink("w" + x);
						return;
					}
				}
			}
			setError(link, "MWW page not found");
		},
		"error": function(_, status, err) {
			setError(link, "MWW " + status + ": " + err);
		},
	});
}

function makeNexonThread(link) {
	var parts = isNexonThread(link),
	thread = parts[1];

	setLink("C" + real2mini(thread));
}

function makeNationThread(link) {
	var parts = isNationThread(link),
	thread = parts[2],
	post = parts[4];

	setLink("N" + real2mini(thread), post ? "?" + real2mini(post) : undefined);
}