import persistence


def get_card_status(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    statuses = persistence.get_statuses()
    return next((status['title'] for status in statuses if status['id'] == str(status_id)), 'Unknown')


def edit_board_title(board_id,new_title):
    return persistence.edit_board_title(board_id,new_title)


def get_board(board_id):
    return persistence.get_board(board_id)


def get_boards():
    """
    Gather all boards
    :return:
    """
    return persistence.get_boards(force=True)


def add_new_board():
    persistence.add_new_board()
    return persistence.get_latest_board()


def get_cards_for_board(board_id):
    persistence.clear_cache()
    all_cards = persistence.get_cards()
    matching_cards = []
    for card in all_cards:
        if card['board_id'] == str(board_id):
            card['status_id'] = get_card_status(card['status_id'])  # Set textual status for the card
            matching_cards.append(card)
    return matching_cards
