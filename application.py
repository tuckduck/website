from flask import Flask, render_template, request, jsonify
import ttt_ai
import random

#echo 'export PATH="/home/tucker/.ebcli-virtual-env/executables:$PATH"' >> ~/.bash_profile && source ~/.bash_profile

application = Flask(__name__, static_folder="static", static_url_path="/static", template_folder = "templates")

@application.route("/", methods=['GET'])
@application.route("/home", methods=['GET', 'POST', 'PUT'])
def home_page():
	return render_template('homepage.html')

@application.route("/ttt", methods=['GET'])
def ttt_page():
	return render_template('tictactoe.html')

@application.route("/ttt_move", methods=['GET'])
def ttt_move():
	#print(len(request.args["board"]), request.args["board"])
	board_state = ttt_ai.parse_state(request.args["board"], "X", "O")
	#computer move: (1-9) move computer makes, -1 is none
	#wins: -2 no move, -1 draw, 0 continue, 1 human wins, 2 computer wins

	#Human has won
	if ttt_ai.wins(board_state, -1):
		#print("human won")
		return jsonify(
		computer_move="-1",
		wins = "1"
		)
	#all squares are filled, draw
	#TODO when computer does last move in draw
	if len(ttt_ai.empty_cells(board_state)) == 0:
		#print("human made draw")
		return jsonify(
		computer_move="-1",
		wins = "-1"
		)
	#Computer makes move
	#print(request.args["easy"])
	if request.args["easy"] and random.choice([1,2,3,4]) == 1:
		empty_xy = ttt_ai.empty_cells(board_state)
		random_xy = random.choice(empty_xy)
		move = str(random_xy[0] + 3 * random_xy[1] + 1)
		board_state[random_xy[0]][random_xy[1]] = 1
		draw = not (len(random_xy) - 1)
		computer_win = ttt_ai.wins(board_state, 1)
	else:
		computer_win, draw, move = ttt_ai.ai_turn(board_state)
	#Computer wins
	if computer_win:
		#print("computer wins")
		return jsonify(
		computer_move=move,
		wins = "2"
		)
	if draw:
		#print("computer moves to draw")
		return jsonify(
		computer_move=move,
		wins = "-1"
		)
	#Game continues
	#print("continue")
	return jsonify(
		computer_move=move,
		wins = "0"
		)

@application.route("/contact", methods=['GET'])
def contact_page():
	return render_template('contact.html')

@application.route("/about", methods=['GET'])
def about_page():
	return render_template('about.html')

@application.route("/pongQueue", methods=['GET'])
def pong_page():
	return render_template('queue.html')

@application.route("/potatoChess", methods=['GET'])
def potatochess():
	return render_template('game.html')

if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    application.debug = False
    application.run()