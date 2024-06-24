function gameBoard () {

    columns = 3;
    rows = 3;
    board = [];

    for (i = 0; i < rows; i++) {
        board[i] = [];
        for (j = 0; j < columns; j++) {
            board[i].push(Cell())
        }
    }

    //modify the cell with  player's token, and check if the cell is avaliable

    const putToken = (row, column, player) => { 

        const selectedRow = board[row];

        if (selectedRow[column].getValue() === 0) {

            selectedRow[column].addToken(player.token);
            return true

        } else {
            return false
        }

    }

    const getBoard = () => board;

    //generate board in console delete when UI formed

    function printBoard() {

        board.forEach((row) => {

            const checkValue = row.map(a => a.getValue())
            console.log(checkValue)

        })

    } 

    //functions returned

    return {
        getBoard,
        printBoard,
        putToken
    }
}

//cells values and changes on them

function Cell() {

    let value = 0

    const getValue = () => value;

    const addToken = (player) => {

        value = player;
    
    };

    return {

        getValue,
        addToken

    }
}



function gameController () {

    playerOneName = "player one";
    playerTwoName = "player two";

    const board = gameBoard();

    board.printBoard()

    const players = [
        {
            name: playerOneName,
            token: 1
        },
        {
            name: playerTwoName,
            token: 2
        }
    ];

    let activePlayer = players[0];

    const switchActivePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const printNewPosition = () => {
        board.printBoard()
    }

    const playRound = (row, column) => {



        let move = board.putToken(row, column, activePlayer);

        

        //Winning conditions

        const isWin  = () => {

            const completeBoard = board.getBoard();

            const posibleWins = [[completeBoard[0][0], completeBoard[1][1], completeBoard[2][2]], [completeBoard[0][2], completeBoard[1][1], completeBoard[2][0]]]
            
            for (i = 0; i < completeBoard.length; i++) {

                posibleWins.push(completeBoard[i])

                let column = [];

                for (j =0; j< completeBoard.length; j++) {
                    column.push(completeBoard[i][j])
                
                }
                
                posibleWins.push(column)

            }

            posibleWins.forEach((posibility) => {

                if (posibility[0].getValue() !== 0 && posibility[0].getValue() === posibility[1].getValue() && posibility[0].getValue() === posibility[2].getValue()) {

                    console.log(`${activePlayer.name} won!`)

                }
                
            });

            

        }

        if (move === true) {

            console.log(`${activePlayer.name} put token on row ${row} column ${column}`)

            isWin()

            switchActivePlayer();

            console.log(`${activePlayer.name}'s turn:`)


        } else {
            console.log("Not valid movement, try again")
        }
        
        console.log("hello")

        printNewPosition()
        
    }
    
    console.log(`${activePlayer.name}'s turn:`)

    return {
        getActivePlayer,
        playRound
    }

}

const test =  gameController()
