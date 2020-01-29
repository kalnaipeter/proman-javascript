// It uses data_handler.js to visualize elements
import { dataHandler } from "./data_handler.js";

export let dom = {
    init: function () {
        // This function should run once, when the page is loaded.
    },

    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(async function(boards){
            await dom.showBoards(boards);
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
                <button class="board-add" data-boardid="${board.id}">Add Card</button>
                <button class="board-add column-btn" data-addcolumn="${board.id}">Add New Column</button>
                <button class="board-toggle board-data" data-boardid="${board.id}"><i class="fas fa-chevron-down"></i></button>
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
        let columnsContainer = document.querySelector(`[data-columns='${board.id}']`);
        for (let column of board.columns) {
            let newColumn = dom.createColumn(board.id, column['title'], column['id']);
            columnsContainer.appendChild(newColumn);
        }
        dom.loadCards(board.id);
    },

    createColumn: function(board_id, columnTitle, columnId) {
            let columnContainer = document.createElement('div');
            columnContainer.setAttribute('class', 'board-column');
            columnContainer.setAttribute('data-column', `${board_id}`);
            columnContainer.setAttribute('data-title', `${columnTitle}`);
            columnContainer.setAttribute('data-columnid', `${columnId}`);

            let titleContainer = document.createElement('div');
            titleContainer.setAttribute('class', 'board-column-title');
            columnContainer.setAttribute('data-columnTitle', `${board_id}`);
            titleContainer.innerHTML = `${columnTitle}`;
            columnContainer.appendChild(titleContainer);

            let columnContent = document.createElement('div');
            columnContent.setAttribute('class', 'board-column-content');
            columnContainer.setAttribute('data-columnContent', `${board_id}`);
            columnContainer.appendChild(columnContent);

            return columnContainer;
    },
    addNewColumn: function (event) {
        let addColumnButton = event.currentTarget;
        let targetBoardID = addColumnButton.dataset.addcolumn;
        let columnContainer = document.querySelector(`[data-columns='${targetBoardID}']`);
        let newColumn = dom.createColumn(targetBoardID, 'New Column');
        columnContainer.appendChild(newColumn);
        dataHandler.createNewColumn(targetBoardID, dom.loadBoards);
    },
    showCard: function(card){
        let statusTitle = card.status_id;
        let columnTitle = document.querySelector(`[data-columnid='${statusTitle}']`);
        let columnTitleChild = columnTitle.firstElementChild.nextSibling;
        let cardElement = document.createElement("div");
        cardElement.setAttribute("class","card");
        let cardRemove = document.createElement("div");
        cardRemove.setAttribute("class","card-remove");
        cardRemove.innerHTML = `<i class="fas fa-trash-alt"></i>`;
        let cardTitle = document.createElement("div");
        cardTitle.setAttribute("class","card-title");
        cardTitle.dataset.cardid = `${card.id}`;
        cardTitle.innerHTML = `${card.title}`;
        cardElement.appendChild(cardTitle);
        cardElement.appendChild(cardRemove);
        columnTitleChild.appendChild(cardElement);
    },

    showBoards: function(boards){
        let boardsContainer = document.querySelector('#boards');
        boardsContainer.innerHTML = ``;
        for(let board of boards) {
            this.showBoard(board);
        }
    },

    showCards: function (cards) {
        for (let card of cards){
            this.showCard(card)
        }
        // shows the cards of a board
        // it adds necessary event listeners also
    },

    loadCards: function (boardId) {
        dataHandler.getCardsByBoardId(boardId,function (cards) {
            dom.showCards(cards);
        })
        // retrieves cards and makes showCards called
    },
    // here comes more features
    changeBoardTitle: function (event) {
        let titleElement = event.currentTarget;
        let boardTitle = titleElement.innerText;
        let inputField = document.createElement("input");
        let boardId = titleElement.dataset.board;
        let alreadyChangedBack = false;
        inputField.setAttribute('value',boardTitle);

        titleElement.innerHTML = "";
        titleElement.appendChild(inputField);
        inputField.focus();
        inputField.addEventListener('blur',(event) => {
            if (!alreadyChangedBack){
                titleElement.innerHTML = boardTitle;
            }});


        inputField.addEventListener('keypress',(event) => {
            if (event.key == "Enter"){
                alreadyChangedBack = true;
                let newTitle = inputField.value;
                let changeBackInputField = () => {
                    titleElement.innerHTML = newTitle;
                };
                dataHandler.sendNewBoardTitle(boardId, newTitle, changeBackInputField);
                event.preventDefault();
            }
        });
    },
    changeColumnTitle: function (event) {
        let titleElement = event.currentTarget;
        let columnTitle = CardtitleElement.innerText;
        let inputField = document.createElement("input");
        let titleContainer = event.currentTarget.parentNode;
        let columnId = titleContainer.dataset.columnid.replace("'","");
        columnId = columnId.replace("'","");
        let alreadyChangedBack = false;
        inputField.setAttribute('value', columnTitle);

        titleElement.innerHTML = "";
        titleElement.appendChild(inputField);
        inputField.focus();
        inputField.addEventListener('blur',(event) => {
            if (!alreadyChangedBack){
                titleElement.innerHTML = columnTitle;
            }
        });

        inputField.addEventListener('keypress',(event) => {
            if (event.key == "Enter"){
                alreadyChangedBack = true;
                let newTitle = inputField.value;
                let changeBackInputField = () => {
                    titleElement.innerHTML = newTitle;
                };
                dataHandler.sendNewColumnTitle(columnId, newTitle, changeBackInputField);
                event.preventDefault();
            }
        });
    },
    changeCardTitle: function (event) {
        console.log('event: ', event);
        let titleElement = event.currentTarget;
        let cardTitle = titleElement.innerText;
        let inputField = document.createElement("input");
        let cardId = titleElement.dataset.cardid;
        let alreadyChangedBack = false;
        inputField.setAttribute('value', cardTitle);

        titleElement.innerHTML = "";
        titleElement.appendChild(inputField);
        inputField.focus();
        inputField.addEventListener('blur',(event) => {
            if (!alreadyChangedBack){
                titleElement.innerHTML = cardTitle;
            }
        });

        inputField.addEventListener('keypress',(event) => {
            if (event.key == "Enter"){
                alreadyChangedBack = true;
                let newTitle = inputField.value;
                let changeBackInputField = () => {
                    titleElement.innerHTML = newTitle;
                };
                dataHandler.sendNewCardTitle(cardId, newTitle, changeBackInputField);
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
        this.editColumnTitleEventListener();
        this.editCardTitleEventListener();
        this.deleteBoardEventListener();
        this.showCardsEventListener();
        this.addNewCardEventListener();
    },

    deleteBoard: function(event){
        let deleteButton = event.currentTarget;
        let boardId = deleteButton.dataset.boardid;
        dataHandler.deleteBoard(boardId, dom.loadBoards);
    },

    addNewCard: function(event){
        let addBtn = event.currentTarget;
        let boardId = addBtn.dataset.boardid;
        dataHandler.createNewCard(boardId, dom.loadBoards)
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

      
    newColumnEventListener: function() {
        let newColumnBtn = document.querySelectorAll(".column-btn");
        newColumnBtn.forEach((element) => {
            element.addEventListener('click', this.addNewColumn)
        });
    },

    editColumnTitleEventListener: function() {
        let columnTitleElements = document.querySelectorAll(".board-column-title");
        columnTitleElements.forEach((element) => {
            element.addEventListener('dblclick', this.changeColumnTitle)
        });
    },

    editCardTitleEventListener: function() {
        let cardTitleElements = document.querySelectorAll(".card-title");
        console.log(cardTitleElements);
        cardTitleElements.forEach((element) => {
            console.log('fuck e:', );
            element.addEventListener('dblclick', this.changeCardTitle)
        });
    },

    deleteBoardEventListener: function () {
        let deleteBtnElements = document.querySelectorAll('.delete');
        deleteBtnElements.forEach((element) => {
            element.addEventListener('click', this.deleteBoard)
        });
    },

    addNewCardEventListener: function () {
        let addNewCardElements = document.querySelectorAll('.board-add');
        addNewCardElements.forEach((elemnt) => {
            elemnt.addEventListener('click', this.addNewCard)
        });
    }

};
