from math import inf as infinity
from random import choice

import time


"""
An implementation of Minimax AI Algorithm in Tic Tac Toe,
using Python.
This software is available under GPL license.
Author: Clederson Cruz
Year: 2017
License: GNU GENERAL PUBLIC LICENSE (GPL)
"""


def evaluate(state):
	"""
	Function to heuristic evaluation of state.
	:param state: the state of the current board
	:return: +1 if the computer wins; -1 if the human wins; 0 draw
	"""
	if wins(state, 1):
		score = +1
	elif wins(state, -1):
		score = -1
	else:
		score = 0

	return score


def wins(state, player):
	"""
	This function tests if a specific player wins. Possibilities:
	* Three rows    [X X X] or [O O O]
	* Three cols    [X X X] or [O O O]
	* Two diagonals [X X X] or [O O O]
	:param state: the state of the current board
	:param player: a human or a computer
	:return: True if the player wins
	"""
	win_state = [
		[state[0][0], state[0][1], state[0][2]],
		[state[1][0], state[1][1], state[1][2]],
		[state[2][0], state[2][1], state[2][2]],
		[state[0][0], state[1][0], state[2][0]],
		[state[0][1], state[1][1], state[2][1]],
		[state[0][2], state[1][2], state[2][2]],
		[state[0][0], state[1][1], state[2][2]],
		[state[2][0], state[1][1], state[0][2]],
	]
	if [player, player, player] in win_state:
		return True
	else:
		return False


def game_over(state):
	"""
	This function test if the human or computer wins
	:param state: the state of the current board
	:return: True if the human or computer wins
	"""
	return wins(state, -1) or wins(state, 1)


def empty_cells(state):
	"""
	Each empty cell will be added into cells' list
	:param state: the state of the current board
	:return: a list of empty cells
	"""
	cells = []

	for x, row in enumerate(state):
		for y, cell in enumerate(row):
			if cell == 0:
				cells.append([x, y])

	return cells


def minimax(state, depth, player):
	"""
	AI function that choice the best move
	:param state: current state of the board
	:param depth: node index in the tree (0 <= depth <= 9),
	but never nine in this case (see iaturn() function)
	:param player: an human or a computer
	:return: a list with [the best row, best col, best score]
	"""
	if player == 1:
		best = [-1, -1, -infinity]
	else:
		best = [-1, -1, +infinity]

	if depth == 0 or game_over(state):
		score = evaluate(state)
		return [-1, -1, score]

	for cell in empty_cells(state):
		x, y = cell[0], cell[1]
		state[x][y] = player
		score = minimax(state, depth - 1, -player)
		state[x][y] = 0
		score[0], score[1] = x, y

		if player == 1:
			if score[2] > best[2]:
				best = score  # max value
		else:
			if score[2] < best[2]:
				best = score  # min value

	return best

#modified to directly modify input state
def ai_turn(board):
	"""
	It calls the minimax function if the depth < 9,
	else it choices a random coordinate.
	:param c_choice: computer's choice X or O
	:param h_choice: human's choice X or O
	:return:
	"""
	depth = len(empty_cells(board))
	if depth == 0 or game_over(board):
		return

	if depth == 9:
		x = choice([0, 1, 2])
		y = choice([0, 1, 2])
	else:
		move = minimax(board, depth, 1)
		x, y = move[0], move[1]

	board[x][y] = 1
	return wins(board, 1), not len(empty_cells(board)), str(x + 3 * y + 1)

######

def parse_state(board_str, h_char, c_char):
	board = [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
	]

	for i in range(9):
		if board_str[i] == h_char:
			board[i%3][i//3] = -1
		if board_str[i] == c_char:
			board[i%3][i//3] = 1

	return board