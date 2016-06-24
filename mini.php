<?php
if (isset($_GET['u'])) {
	// Redirect...
	$u = $_GET['u'];
	$p = $u[0];
	$id = substr($u, 1);
	$id36 = base_convert($id, 36, 10);

	unset($_GET['u']);
	$args = http_build_query($_GET); //, "", "&", "PHP_QUERY_RFC3986"
	$qargs = '';
	$arg36 = '';
	if($args != '') {
		if(substr($args, -1, 1) == '=') {
			$arg36 = base_convert(substr($args, 0, -1), 36, 10);
		}
		$qargs = "?$args";
		$args = "&$args";
	}

	$url = '';
	switch($p) {
	case 'w': $url = "http://wiki.mabinogiworld.com/?curid=$id36$args"; break;
	case 'T':
		if($arg36) $args = "&p=$arg36#post$arg36";
		$url = "http://archive.mabi.world/showthread.php?$id36$args";
		break;
	case 'F': $url = "http://archive.mabi.world/forumdisplay.php?$id$args"; break;
	case 'C': $url = "http://mabinogi.nexon.net/Community/forums#%2Fshowthread.php%3F$id36"; break;
	case 'N':
		if($arg36) $qargs = "?p=$arg36#post$arg36";
		$url = "http://mabination.com/threads/$id36$qargs";
		break;
	case 'D': $url = "http://forums.mabi.world/?thread=$id36$args"; break;
	}

	if($url != '') {
		header("Location: $url");
	} else {
		http_response_code(404);
	}
} else {
	// Show minification page...
?>
<!doctype html>
<html><head>
<title>Make a Mabi mini link!</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<script src="mini.js"></script>
</head><body>
<h1>Make mini URLs for...</h1>
<ul>
	<li>Mabinogi World Wiki and Forums</li>
	<li>Mabination Forums</li>
	<li>Nexon Forums</li>
</ul>
<label>Enter URL: <input id="url" type="text" /></label>
<div><a id="linkout" href=""></a></div>
<div id="partyout" style="display:none">&lt; <input class="autoselect" type="text" value="mabi.world" maxlength="10" size="10" /> / <input id="partyout2" class="autoselect" type="text" maxlength="10" size="10" /> &gt;</div>
</body></html>
<?php
}
