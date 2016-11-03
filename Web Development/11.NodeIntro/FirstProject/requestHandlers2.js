var exec = require("child_process").exec;

function start() {
	console.log("Request handler 'start' was called");

	/* TEST 1
	function sleep(milliseconds) {
		var startTime = new Date().getTime();
		while(new Date().getTime() < startTime + milliseconds);
	}
	sleep(3000);
	*/

	var content = 'empty';
	exec("ls -lah", function(error, stdout, stderr){
		content = stdout;
	});
	return content;
}

function upload() {
	console.log("Request handler 'upload' was called");
	return "Hello upload";
}

exports.start = start;
exports.upload = upload;