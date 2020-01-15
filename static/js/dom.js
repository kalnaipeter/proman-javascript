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
                <button class="board-toggle"><i class="fas fa-chevron-down"></i></button>
                <button class="delete" data-boardid="${board.id}">Delete Board</button>
            </div>
            <div class="board-columns">
                <div class="board-column">
                    <div class="board-column-title">New</div>
                    <div class="board-column-content">
                        <div class="card">
                            <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                            <div class="card-title">Card 1</div>
                        </div>
                        <div class="card">
                            <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                            <div class="card-title">Card 2</div>
                        </div>
                    </div>
                </div>
                <div class="board-column">
                    <div class="board-column-title">In Progress</div>
                    <div class="board-column-content">
                        <div class="card">
                            <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                            <div class="card-title">Card 1</div>
                        </div>
                    </div>
                </div>
                <div class="board-column">
                    <div class="board-column-title">Testing</div>
                    <div class="board-column-content">
                        <div class="card">
                            <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                            <div class="card-title">Card 1</div>
                        </div>
                        <div class="card">
                            <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                            <div class="card-title">Card 2</div>
                        </div>
                        <div class="card">
                            <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                            <div class="card-title">Card 3</div>
                        </div>
                        <div class="card">
                            <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                            <div class="card-title">Card 4</div>
                        </div>
                        <div class="card">
                            <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                            <div class="card-title">Card 5</div>
                        </div>
                    </div>
                </div>
                <div class="board-column">
                    <div class="board-column-title">Done</div>
                    <div class="board-column-content">
                        <div class="card">
                            <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                            <div class="card-title">Card 1</div>
                        </div>
                        <div class="card">
                            <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                            <div class="card-title">Card 2</div>
                        </div>
                        <div class="card">
                            <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                            <div class="card-title">Card 3</div>
                        </div>
                        <div class="card">
                            <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                            <div class="card-title">Card 4</div>
                        </div>
                        <div class="card">
                            <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                            <div class="card-title">Card 5</div>
                        </div>
                        <div class="card">
                            <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                            <div class="card-title">Card 6</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>`;

        let boardsContainer = document.querySelector('#boards');
        boardsContainer.insertAdjacentHTML("beforeend", boardNode);
    },

    showBoards: function(boards){
        let boardsContainer = document.querySelector('#boards');
        boardsContainer.innerHTML = ``;
        for(let board of boards){
            this.showBoard(board)
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

    deleteBoard: function(event){
        let deleteButton = event.currentTarget;
        let boardId = deleteButton.dataset.boardid;
        console.log(deleteButton);
        console.log(boardId);
        dataHandler.deleteBoard(boardId, dom.loadBoards);
    },


    addEventListeners: function() {
        this.addBoardTitleEventListener();
        this.newBoardEventListener();
        this.deleteBoardEventListener()
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

    deleteBoardEventListener: function () {
        let deleteBtnElements = document.querySelectorAll('.delete');
        deleteBtnElements.forEach((element) => {
            element.addEventListener('click', this.deleteBoard)
        });
    }
};
