// this object contains the functions which handle the data and its reading/writing
// feel free to extend and change to fit your needs

// (watch out: when you would like to use a property/function of an object from the
// object itself then you must use the 'this' keyword before. For example: 'this._data' below)
export let dataHandler = {
    _data: {}, // it contains the boards and their cards and statuses. It is not called from outside.
    _api_get: function (url, callback) {
        // it is not called from outside
        // loads data from API, parses it and calls the callback with it

        fetch(url, {
            method: 'GET',
            credentials: 'same-origin'
        })
        .then(response => response.json())  // parse the response as JSON
        .then(json_response => callback(json_response));  // Call the `callback` with the returned object
    },
    _api_post: function (url, data, callback) {
        // it is not called from outside
        // sends the data to the API, and calls callback function
        console.log(JSON.stringify(data));
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())  // parse the response as JSON
        .then(json_response => {
            console.log(json_response);
            if (callback) {
                callback(json_response)
            }
        });  // Call the `callback` with the returned object
    },
    init: function () {
    },
    getBoards: function (callback) {
        // the boards are retrieved and then the callback function is called with the boards

        // Here we use an arrow function to keep the value of 'this' on dataHandler.
        //    if we would use function(){...} here, the value of 'this' would change.
        this._api_get('/get-boards', (response) => {
            this._data = response;
            console.log(response);
            callback(response);
        });
    },
    getBoard: function (boardId, callback) {
        this._api_get('/get-boards/'+boardId,(response) => {
            callback(response);
        })
        // the board is retrieved and then the callback function is called with the board
    },
    getStatuses: function (callback) {
        // the statuses are retrieved and then the callback function is called with the statuses
        this._api_get('/get-statuses', (response) => {
            this._data = response;
            callback(response);
        });
    },
    getStatus: function (statusId, callback) {
        // the status is retrieved and then the callback function is called with the status
    },
    getCardsByBoardId: function (boardId, callback) {
        this._api_post('/get-cards/'+boardId,null,callback)
        // the cards are retrieved and then the callback function is called with the cards
    },
    getCard: function (cardId, callback) {
        // the card is retrieved and then the callback function is called with the card
    },
    createNewBoard: function (callback) {
        // creates new board, saves it and calls the callback function with its data
        this._api_post("/add-new-board",null, callback);
    },
    createNewCard: function (boardId, callback) {
        this._api_post("/add-new-card/"+boardId, null, callback)
    },

    createNewColumn: function (boardId, callback) {
        this._api_post("/add-new-column/" + boardId, null, callback);
    },
    deleteBoard: function(boardId, callback){
        this._api_post("/delete-board/"+boardId, null, callback)
    },

    sendNewBoardTitle: function (boardId, newTitle, callback) {
      this._api_post("/edit-board-title/"+boardId, {'new_title': newTitle}, callback);
    },
    sendNewColumnTitle: function (boardId, newTitle, callback) {
        console.log(newTitle);
        this._api_post("/edit-column-title/"+boardId, {'new_title': newTitle}, callback);
    }
    // here comes more features
};
