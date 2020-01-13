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
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also

        let boardList = '';

        for(let board of boards){
            boardList += `
                <li class="board-title" data-boardid="${board.id}">${board.title}</li>
            `;
        }

        const outerHtml = `
            <ul class="board-container">
                ${boardList}
            </ul>
        `;

        let boardsContainer = document.querySelector('#boards');
        boardsContainer.insertAdjacentHTML("beforeend", outerHtml);
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
        let titleElement = event.target;
        let boardTitle = titleElement.innerText;
        let inputField = document.createElement("input");
        let boardId = titleElement.dataset.boardid;

        inputField.setAttribute('value',boardTitle);

        titleElement.innerHTML = "";
        titleElement.appendChild(inputField);
        inputField.focus();
        inputField.addEventListener('keyup', (event) => {
            console.log("belép");
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
    addEventListeners: function() {
        this.addBoardTitleEventListener();
    },
    addBoardTitleEventListener: function() {
        let board_title_elements = document.querySelectorAll(".board-title");
        board_title_elements.forEach((element) => {
            element.addEventListener('dblclick', this.changeBoardTitle)
        });
    }
};
