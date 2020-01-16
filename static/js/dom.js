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
                <button class="delete">Delete board</button>
                <button class="board-toggle board-data" data-boardid="${board.id}"><i class="fas fa-chevron-down"></i></button>
            </div>
            <div class="cards" data-boardid="${board.id}"></div>
        </section>
    </div>`;

        let boardsContainer = document.querySelector('#boards');
        boardsContainer.insertAdjacentHTML("beforeend", boardNode);
    },
    showCard: function(boardId,cards){
        let newHTML = ``;
        for (let card of cards){
            newHTML += `idejön a sok html a cardokhoz`;}

        let tables = document.querySelectorAll(".cards");
        for (let table of tables) {
            if (boardId == table.dataset.boardid) {
                table.innerHTML = newHTML;
            }
        }
    },

    showBoards: function(boards){
        let boardsContainer = document.querySelector('#boards');
        boardsContainer.innerHTML = ``;
        for(let board of boards){
            this.showBoard(board)
        }
    },

    showCards: function (boardId,cards) {
        for (let card of cards){
            this.showCard(boardId,cards)
        }
        // shows the cards of a board
        // it adds necessary event listeners also
    },

    loadCards: function (event) {
        let openCardsElement = event.currentTarget;
        let boardId = openCardsElement.dataset.boardid;
        dataHandler.getCardsByBoardId(boardId,function (cards) {
            dom.showCards(boardId,cards);
        })
        // retrieves cards and makes showCards called
    },
    // here comes more features
    changeBoardTitle: function (event) {
        let titleElement = event.currentTarget;
        let boardTitle = titleElement.innerText;
        let inputField = document.createElement("input");
        let boardId = titleElement.dataset.board;

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
        dataHandler.createNewBoard(dom.loadBoards());
    },


    addEventListeners: function() {
        this.addBoardTitleEventListener();
        this.newBoardEventListener();
        this.showCardsEventListener();
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
    showCardsEventListener: function () {
        let showCardsBtn = document.querySelectorAll(".board-data");
        showCardsBtn.forEach((element) => {
            element.addEventListener('click',this.loadCards)
        });
    },

};
