# import csv
import database_common

# STATUSES_FILE = './data/statuses.csv'
# BOARDS_FILE = './data/boards.csv'
# CARDS_FILE = './data/cards.csv'

_cache = {}  # We store cached data in this dict to avoid multiple file readings


def clear_cache():
    global _cache
    _cache = {}
    # for k in list(_cache.keys()):
    #     _cache.pop(k)


# def _read_csv(file_name):
#     """
#     Reads content of a .csv file
#     :param file_name: relative path to data file
#     :return: OrderedDict
#     """
#     with open(file_name) as boards:
#         rows = csv.DictReader(boards, delimiter=',', quotechar='"')
#         formatted_data = []
#         for row in rows:
#             formatted_data.append(dict(row))
#         return formatted_data
#
#
# def _get_data(data_type, file, force):
#     """
#     Reads defined type of data from file or cache
#     :param data_type: key where the data is stored in cache
#     :param file: relative path to data file
#     :param force: if set to True, cache will be ignored
#     :return: OrderedDict
#     """
#     if force or data_type not in _cache:
#         _cache[data_type] = _read_csv(file)
#     return _cache[data_type]
#
#
#
#
# def get_statuses(force=False):
#     return _get_data('statuses', STATUSES_FILE, force)
#
#
# def get_boards(force=False):
#     return _get_data('boards', BOARDS_FILE, force)
#
#
# def get_cards(force=False):
#     return _get_data('cards', CARDS_FILE, force)

@database_common.connection_handler
def get_statuses(cursor, force=False):
    cursor.execute("""
                    SELECT * FROM statuses;
                    """)
    table_data = cursor.fetchall()
    if force or "statuses" not in _cache:
        _cache["statuses"] = table_data
    return _cache["statuses"]


@database_common.connection_handler
def get_board(cursor,board_id):
    cursor.execute("""
                    SELECT * FROM boards
                    WHERE id = %(board_id)s;
                    """,
                   {"board_id":board_id})
    board = cursor.fetchone()
    return board


@database_common.connection_handler
def get_boards(cursor, force=False):
    cursor.execute("""
                    SELECT boards.id, boards.title, statuses.title AS columns FROM boards
                    JOIN statuses ON boards.id = statuses.board_id;
                    """)
    table_data = cursor.fetchall()
    if force or "boards" not in _cache:
        _cache["boards"] = table_data
    return _cache["boards"]


@database_common.connection_handler
def get_cards(cursor, force=False):
    cursor.execute("""
                    SELECT * FROM cards;
                    """)
    table_data = cursor.fetchall()
    if force or "cards" not in _cache:
        _cache["cards"] = table_data
    return _cache["cards"]


@database_common.connection_handler
def edit_board_title(cursor, board_id, new_title):
    cursor.execute("""
                    UPDATE boards
                    SET title = %(new_title)s
                    WHERE id = %(board_id)s;
                    """,
                   {"board_id":board_id,
                    "new_title":new_title})


@database_common.connection_handler
def add_new_board(cursor):
    columns = ['New', 'In Progress', 'Testing', 'Done']
    cursor.execute("""
                        INSERT INTO boards (title) VALUES ('New Board')
        """)
    latest_board_id = get_latest_board()
    for column_title in columns:
        cursor.execute("""
                        INSERT INTO statuses (title, board_id) 
                        VALUES (%(column_title)s, (SELECT id from boards
                        WHERE boards.id=%(latest_board_id)s));
                        """,
                       {"column_title": column_title,
                        "latest_board_id": latest_board_id})


@database_common.connection_handler
def get_latest_board(cursor):
    cursor.execute("""
                    SELECT MAX(id) FROM boards
    """)

    result = cursor.fetchone()
    board_id = result['max']
    return board_id
