function init_board(columns, rows) {
	var i, j;
	var cols = new Array(columns);
	var row = null;
	for (i = 0; i < columns;i++) {
		row = new Array(rows);
		for (j = 0; j < rows; j++) {
			row[j] = scene_.add.image(i * 60 + 150, j * 60 + 90, 'blank_tile');
		}
		cols[i] = row;
	}
	return cols;
}
var highlighted = null;
var highlight_coord = null;
var red_sqs = [];

function handle_click(pointer) {
	//console.log("in handler");
	if (highlighted) {
		highlighted = toggle_highlight(highlighted);
	}
	switch(interpret_click(pointer.x, pointer.y)) {
		case 1:
			coords = get_cell_coords(pointer.x, pointer.y);
			handle_cell_click(coords[0], coords[1]);
			break;
		default:
			break;
	}
	//scene_.add.image(pointer.x, pointer.y, 'logo');
}

function interpret_click(x, y) {
	if ((x < 1080 && x > 120) && (y < 1020 && y > 60)) {
		//console.log("1");
		return 1;
	}
	else {
		//console.log("0");
		return 0;
	}
}

function get_cell_coords(x, y) {
	return [Math.floor((x-120)/60), Math.floor((y-60)/60)]
}

function fill_cell(x_coor, y_coor, img) {
	//console.log("filling cell");
	board[x_coor][y_coor].setTexture(scene_.textures.get("potat"));
}

function handle_cell_click(x_coor, y_coor) {
	if (!(highlighted == null)) {
		var key = highlighted.texture.key;
		console.log(key);
		console.log(key.slice(0, key.length - 10));
		if (board[x_coor][y_coor].texture.key == "blue_tile") {
			board[x_coor][y_coor].setTexture(scene_.textures.get(key.slice(0, key.length - 10)));
			highlighted.setTexture(scene_.textures.get("blank_tile"));
		}
		else {
			highlighted.setTexture(scene_.textures.get(key.slice(0, key.length - 10)));
		}
		clear_moves();
		highlighted = null;
	}
	else if (board[x_coor][y_coor].texture.key == "blank_tile") {
		console.log("filling" + x_coor + " " + y_coor );
		fill_cell(x_coor, y_coor, 'potat');
	}
	else {
		highlighted = toggle_highlight(board[x_coor][y_coor]);
		show_moves(x_coor, y_coor, 4);
	}
}

function toggle_highlight(img) {
	console.log("toggle");
	var key = img.texture.key;
	img.setTexture(scene_.textures.get(key + "_highlight"));
	return img;

}

function show_moves(x_coor, y_coor, speed) {
	var x, y;
	for (x = 0; x<16;x++){
		for (y = 0; y<16;y++){
			if (x == x_coor && y == y_coor) {
				continue;
			}
			if (Math.abs(x - x_coor) + Math.abs(y - y_coor) <= speed) {
				if (board[x][y].texture.key == "blank_tile") {
					board[x][y].setTexture(scene_.textures.get("blue_tile"));
				}
				else {
					red_sqs.push(scene_.add.image(x * 60 + 150, y * 60 + 90, 'red_tile'));
				}
			}
		}
	}
}
function clear_moves() {
	var x, y;
	for (x = 0; x<16;x++){
		for (y = 0; y<16;y++){
			if (board[x][y].texture.key == "blue_tile") {
				board[x][y].setTexture(scene_.textures.get("blank_tile"));
			}
		}
	}
	while (red_sqs.length > 0) {
		var red = red_sqs.pop();
		red.destroy();
	}
}