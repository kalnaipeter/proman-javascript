import persistence
import bcrypt


def get_hash_from_database(username):
    return persistence.get_hash_from_database(username)


def registration(username,password):
    persistence.registration(username,password)


def get_hash_from_password(password):
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    decoded_hash = hashed_password.decode('utf-8')
    return decoded_hash


def verify_password(password, hash):
    hashed_bytes_password = hash.encode('utf-8')
    return bcrypt.checkpw(password.encode('utf-8'), hashed_bytes_password)


def get_card_status(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    statuses = persistence.get_statuses()
    return next((status['title'] for status in statuses if status['id'] == status_id), 'Unknown')


def delete_board(board_id):
    return persistence.delete_board(board_id)


def edit_board_title(board_id,new_title):
    return persistence.edit_board_title(board_id,new_title)


def edit_column_title(board_id, new_title):
    return persistence.edit_column_title(board_id, new_title)


def get_board(board_id):
    return persistence.get_board(board_id)


def get_boards():
    """
    Gather all boards
    :return:
    """
    return persistence.get_boards(force=True)


def add_new_board():
    return persistence.add_new_board()
    # return persistence.get_latest_board()


def get_cards_for_board(board_id):
    persistence.clear_cache()
    all_cards = persistence.get_cards()
    matching_cards = []
    for card in all_cards:
        if card['board_id'] == board_id:
            card['status_id'] = get_card_status(card['status_id'])  # Set textual status for the card
            matching_cards.append(card)
    return matching_cards


def create_new_column(board_id):
    persistence.create_new_column(board_id)


def add_new_card(board_id):
    return persistence.add_new_card(board_id)
