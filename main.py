from flask import Flask, render_template, url_for,request,session,redirect
from util import json_response
import os
import data_handler

app = Flask(__name__)
path = os.path.dirname(__file__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'


@app.route("/")
def index():
    if request.args.get("session") == "":
        session["username"] = None
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


@app.route("/delete-board/<int:board_id>", methods=["POST"])
@json_response
def delete_board(board_id: int):
    data_handler.delete_board(board_id)


@app.route("/add-new-card/<int:board_id>", methods=["POST"])
@json_response
def add_new_card(board_id: int):
    data_handler.add_new_card(board_id)


@app.route("/edit-board-title/<int:board_id>", methods=["POST"])
@json_response
def edit_board_title(board_id:int):
    data_handler.edit_board_title(board_id,request.json["new_title"])


@app.route("/edit-column-title/<int:board_id>", methods=["POST"])
@json_response
def edit_column_title(board_id:int):
    data_handler.edit_column_title(board_id, request.json["new_title"])


@app.route("/add-new-board",methods=["POST"])
@json_response
def add_new_board():
    print("add")
    data_handler.add_new_board()


@app.route("/get-boards")
@json_response
def get_boards():
    """
    All the boards
    """
    print(data_handler.get_boards())
    return data_handler.get_boards()


@app.route("/get-boards/<int:board_id>")
@json_response
def get_board(board_id: int):
    return data_handler.get_board(board_id)


@app.route("/get-cards/<int:board_id>",methods=["POST"])
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return data_handler.get_cards_for_board(board_id)


@app.route('/login-registration', methods=["POST", "GET"])
def login_registration():
    if request.method == "POST":
        if request.form["action"] == "registration":
            data_handler.registration(request.form["username"], request.form["password"])
            session["username"] = request.form["username"]
            return redirect(url_for("index"))
        else:
            if data_handler.get_hash_from_database(request.form["username"]) is not None:
                database_password = data_handler.get_hash_from_database(request.form["username"])
                verify_password = data_handler.verify_password(request.form["password"],
                                                              database_password["password"])
                if verify_password:
                    session["username"] = request.form["username"]
                    return redirect(url_for("index"))

@app.route("/add-new-column/<int:board_id>", methods=["POST"])
@json_response
def create_new_column(board_id: int):
    data_handler.create_new_column(board_id)



def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
