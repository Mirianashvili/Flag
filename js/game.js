//////// Images /////////
var images = [
    'images/canada.png',
    'images/germany.png',
    'images/netherlands.png',
    'images/norway.png',
    'images/sweden.png',
    'images/swisszerland.png',
    'images/uk.png',
    'images/usa.png'
];
var hiddenImage = 'images/question.png';
///////// Board /////////
var board = [];
var discovered = [];
var BoardSize = 4;
var TwoClick = 0;
var LastIndex = {};
var ClosedTime = 200;
//////// Score //////////
var Score = 0;
var ScoreUp = 10;
var ScoreDown = -1;

/**
 * Initialize game
 */
function Init(){
    for(var i = 0 ; i < BoardSize ; i++){
        for(var j = 0 ; j < BoardSize ; j++){
            ChangeBackground(i,j,hiddenImage);
        }
    }
    Generate();
    Score = 0;
    $("#score").html('Score:0');
}

/**
 * Generates random images each item
 */
function Generate(){
    var b = [];
    var x,y,counter = 0;
    
    for(var i = 0 ; i < BoardSize ; i++){
        b[i] = [];
        board[i] = [];
        discovered[i] = [];
        for(var j = 0 ; j < BoardSize ; j++){
            b[i].push(false);
            board[i].push(hiddenImage);
            discovered[i].push(false);
        }
    }

    for(var i = 0 ; i < images.length ; i++){
        x = getRandomBoardIndex();
        y = getRandomBoardIndex();
        while(counter < 2){
            while(true){
                if(b[x][y] == false){
                    b[x][y] = true;
                    board[x][y] = images[i];
                    counter++;
                    break;
                }else{
                    x = getRandomBoardIndex();
                    y = getRandomBoardIndex();
                }
            }
        }
        counter = 0;
    }

    console.log(board);
}

function getRandomBoardIndex(){
    return Math.floor(Math.random() * BoardSize);
}

/**
 * Getting Id by cordinates
 */
function IndexToId(i,j){
    return ("#board-item-" + i) + j;
}

/**
 * Change background Image
 */
function ChangeBackground(i,j,url){
    $(IndexToId(i,j)).css('background',"url('" + url + "')");
    $(IndexToId(i,j)).css('background-size','cover');
}

function Click(i,j){
    if(i < 0 || j < 0 || i > 3 || j > 3){
        console.log('invalid input the function');
    }

    var id = IndexToId(i,j);
    var background = $(id).css('background');

    if(discovered[i][j]){
        Materialize.toast('You can\'t select it', 4000);
        return;
    }

    TwoClick++;
    if(TwoClick == 1){
        var item = IndexToId(i,j);
        ChangeBackground(i,j,board[i][j]);
        LastIndex.x = i;
        LastIndex.y = j;
    }else{
        ChangeBackground(i,j,board[i][j]);
        TwoClick = 0;
        setTimeout(function(){
            if(LastIndex.x == i && LastIndex.y == j){
                TwoClick--;
                Materialize.toast('You can\'t select it', 4000);
                return;
            }
            if(board[LastIndex.x][LastIndex.y] == board[i][j]){
                UpdateScore(true);
                discovered[i][j] = true;
                discovered[LastIndex.x][LastIndex.y] = true;
                if(IsWin()){
                    Materialize.toast('You win a game :) Score ' + Score, 4000);
                }
            }else{
                UpdateScore(false);
                ChangeBackground(i,j,hiddenImage);
                ChangeBackground(LastIndex.x,LastIndex.y,hiddenImage);
            }
            LastIndex = {};
        },ClosedTime);
    }
}

/**
 * Update Score Label
 */
function UpdateScore(isCorrect){
    Score = Score + ((isCorrect) ? ScoreUp : ScoreDown);
    $('#score').text('Your Score ' + Score);
}

/**
 * Check every button click. if a user win game? 
 */
function IsWin(){
    for(var i = 0 ; i < BoardSize ; i++){
        for(var j = 0 ; j < BoardSize ; j++){
            if($(IndexToId(i,j)).css('background').indexOf(hiddenImage) != -1){
                return false;
            }
        }
    }
    return true && Score != 0;
}