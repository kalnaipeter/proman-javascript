// It uses data_handler.js to visualize elements
import { dataHandler } from "./data_handler.js";

export let dom = {
    init: function () {
        // This function should run once, when the page is loaded.
    },

    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function(boards){
            dom.showBoards(boards);
            dom.addEventListeners();
        });
    },

    showBoard: function (board) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also

        let boardNode = `
    <div class="board-container">
        <section class="board">
            <div class="board-header"><span class="board-title" data-board="${board.id}">${board.title}</span>
                <button class="board-add">Add Card</button>
                <button class="board-add column-btn" data-addcolumn="${board.id}">Add New Column</button>
                <button class="board-toggle"><i class="fas fa-chevron-down"></i></button>
                <button class="delete" data-boardid="${board.id}">Delete Board</button>
            </div>
                <div class="board-columns" data-columns="${board.id}"></div>
         </section>
     </div>`;

        let boardsContainer = document.querySelector('#boards');
        boardsContainer.insertAdjacentHTML("beforeend", boardNode);
        dom.createColumns(board);
    },


    createColumns: function(board) {
        let columnsContainer = document.querySelector(`[data-columns='${board.id}'`);
        for (let column of board.columns) {
            let newColumn = dom.createColumn(board.id, column);
            columnsContainer.appendChild(newColumn);
        }
    },

    createColumn: function(board_id, columnTitle) {
            let columnContainer = document.createElement('div');
            columnContainer.setAttribute('class', 'board-column');
            columnContainer.setAttribute('data-column', `'${board_id}'`);

            let titleContainer = document.createElement('div');
            titleContainer.setAttribute('class', 'board-column-title');
            columnContainer.setAttribute('data-column-title', `'${board_id}`);
            titleContainer.innerHTML = `${columnTitle}`;
            columnContainer.appendChild(titleContainer);

            let columnContent = document.createElement('div');
            columnContent.setAttribute('class', 'board-column-content');
            columnContainer.setAttribute('data-column-content', `'${board_id}`);
            columnContainer.appendChild(columnContent);

            return columnContainer;
    },
    addNewColumn: function (event) {
        let addColumnButton = event.currentTarget;
        let targetBoardID = addColumnButton.dataset.addcolumn;
        let columnContainer = document.querySelector(`[data-columns='${targetBoardID}'`);
        let newColumn = dom.createColumn(targetBoardID, 'New Column');
        columnContainer.appendChild(newColumn);
        dataHandler.createNewColumn(targetBoardID, dom.loadBoards);
    },

    showBoards: function(boards){
        let boardsContainer = document.querySelector('#boards');
        boardsContainer.innerHTML = ``;
        for(let board of boards){
            this.showBoard(board);
        }
    },

    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
    },
    showCards: function (cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
    },
    // here comes more features
    changeBoardTitle: function (event) {
        let titleElement = event.currentTarget;
        let boardTitle = titleElement.innerText;
        let inputField = document.createElement("input");
        let boardId = titleElement.dataset.board;
        console.log(titleElement);
        console.log(boardId);

        inputField.setAttribute('value',boardTitle);

        titleElement.innerHTML = "";
        titleElement.appendChild(inputField);
        inputField.focus();
        inputField.addEventListener('keyup', (event) => {
            if(event.key == "Escape"){
                titleElement.innerHTML = boardTitle;
            }
        });


        inputField.addEventListener('keypress',(event) => {
            if (event.key == "Enter"){
                let newTitle = inputField.value;
                let changeBackInputField = () => {
                    titleElement.innerHTML = newTitle;
                };
                dataHandler.sendNewBoardTitle(boardId, newTitle, changeBackInputField);
                event.preventDefault();
            }
        });
    },
    addNewBoard: function(){
        dataHandler.createNewBoard(dom.loadBoards);
    },

    addEventListeners: function() {
        this.addBoardTitleEventListener();
        this.newBoardEventListener();
        this.newColumnEventListener();
        this.deleteBoardEventListener()


    deleteBoard: function(event){
        let deleteButton = event.currentTarget;
        let boardId = deleteButton.dataset.boardid;
        dataHandler.deleteBoard(boardId, dom.loadBoards);
    },
      
    addBoardTitleEventListener: function() {
        let board_title_elements = document.querySelectorAll(".board-title");
        board_title_elements.forEach((element) => {
            element.addEventListener('dblclick', this.changeBoardTitle)
        });
    },
    newBoardEventListener: function () {
        let newBoardBtn = document.querySelector("#newBoard");
        newBoardBtn.addEventListener('click',  this.addNewBoard)
    },
      
    newColumnEventListener: function() {
        let newColumnBtn = document.querySelectorAll(".column-btn");
        newColumnBtn.forEach((element) => {
            element.addEventListener('click', this.addNewColumn)
        });
    },


    deleteBoardEventListener: function () {
        let deleteBtnElements = document.querySelectorAll('.delete');
        deleteBtnElements.forEach((element) => {
            element.addEventListener('click', this.deleteBoard)
        });
    }
};
