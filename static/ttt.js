function move(i) {
	if (mutex) {
		alert("Patience young one, wait for the computer to move");
		return;
	}
	else {
		mutex = true;
	}
	if (document.getElementById("title").innerHTML != "Play Tic Tac Toe") {
		alert("Game is Over");
		mutex = false;
		return;
	}
	if (document.getElementById(i).innerHTML == "X" || document.getElementById(i).innerHTML == "O") {
		alert("Invalid Move");
		mutex = false;
		return;
	}
	document.getElementById(i).innerHTML = "X";
	var board_str = "".concat(
		document.getElementById("1").innerHTML,
		document.getElementById("2").innerHTML,
		document.getElementById("3").innerHTML,
		document.getElementById("4").innerHTML,
		document.getElementById("5").innerHTML,
		document.getElementById("6").innerHTML,
		document.getElementById("7").innerHTML,
		document.getElementById("8").innerHTML,
		document.getElementById("9").innerHTML
		);
	$.ajax({
		url:"/ttt_move", 
		data: {
			board: board_str,
			easy: document.getElementById("easy").checked ? "1" : ""
		},
		success: function(data) {
			//draw
			if (data["wins"] == "-1") {
				//computer made last move
				if (data["computer_move"] != "-1") {
					document.getElementById(data["computer_move"]).innerHTML = "O";
				}
				//human made last move
				document.getElementById("title").innerHTML = "Draw!";
			}
			//human wins
			else if (data["wins"] == "1") {
				document.getElementById("title").innerHTML = "You Win!";
			}
			//computer wins
			else if (data["wins"] == "2") {
					document.getElementById("title").innerHTML = "You Lose :( ";
					document.getElementById(data["computer_move"]).innerHTML = "O";
			}
			//continue
			else {
				document.getElementById(data["computer_move"]).innerHTML = "O";
			}
			document.getElementById(i).innerHTML = "X";
			mutex = false;		
		}
	});
}
function clear_board() {
	document.getElementById("1").innerHTML = "\n";
	document.getElementById("2").innerHTML = "\n";
	document.getElementById("3").innerHTML = "\n";
	document.getElementById("4").innerHTML = "\n";
	document.getElementById("5").innerHTML = "\n";
	document.getElementById("6").innerHTML = "\n";
	document.getElementById("7").innerHTML = "\n";
	document.getElementById("8").innerHTML = "\n";
	document.getElementById("9").innerHTML = "\n";
	document.getElementById("title").innerHTML = "Play Tic Tac Toe";
	if (document.getElementById("first").checked){
		humanFirst = true;
	}
	else {
		humanFirst = false;
		$.get("/ttt_move", {
			board:"NNNNNNNNN",
			easy: document.getElementById("easy").checked ? "1" : ""}
			).done(
			function(data) { 
				document.getElementById(data["computer_move"]).innerHTML = "O";
			});
	}
	return;
}