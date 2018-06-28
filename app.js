/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, currentPlayer, winner, isGameActive;
init();

//Randomly selecting the current dice face

//document.querySelector('#current-' + currentPlayer).textContent = diceNumber;



function init() {
    alert("GAME RULES:\n- The game has 2 players, playing in rounds\n- In each turn, a player rolls a dice as many times as he wishes. Each result gets added to his ROUND score\n- BUT, if the player rolls a 1, his ROUND score gets lost. After that, it's the next player's turn\n- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn\n- The first player to reach 100 points on GLOBAL score wins the game");
    var Player1 = prompt("Player 1: ");
    var Player2 = prompt("Player 2: ");
    isGameActive = true;
    scores = [0, 0];
    roundScore = 0;
    currentPlayer = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;

    document.querySelector('.dice').style.display = 'none';
    document.getElementById('name-0').textContent = Player1;
    document.getElementById('name-1').textContent = Player2;
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}
function rollButton() {

    if (isGameActive) {


        // 1. Compute Random number
        var diceNumber = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + diceNumber + '.png';

        //3.Update the round score IF the rolled number was NOT a 1
        if (diceNumber !== 1) {
            //Add score
            roundScore += diceNumber;
            document.querySelector('#current-' + currentPlayer).textContent = roundScore;


        } else {
            //control shifts to next player and the points are transfered
            changePlayer();

        }
    }
}

function holdButton() {

    if(isGameActive) {
        scores[currentPlayer] += roundScore;
        document.querySelector('#score-' + currentPlayer).textContent = scores[currentPlayer];

        //check if player won the game
        if (scores[currentPlayer] >= 100) {
            winner = currentPlayer;
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('#name-' + currentPlayer).textContent = 'Winner!';
            document.querySelector('.player-' + currentPlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + currentPlayer + '-panel').classList.remove('active');
            isGameActive = false;
        } else {
            changePlayer();
        }
    }
}

function changePlayer() {
    roundScore = 0;

    document.querySelector('#current-' + currentPlayer).textContent = roundScore;
    currentPlayer === 0 ? currentPlayer = 1 : currentPlayer = 0;
    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-roll').addEventListener('click', rollButton);
document.querySelector('.btn-hold').addEventListener('click', holdButton);
document.querySelector('.btn-new').addEventListener('click', init);
