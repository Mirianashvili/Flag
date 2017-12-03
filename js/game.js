var images = [
    'images/canada.png',
    'images/germany.png',
    'images/netherlands.png',
    'images/norway.png',
    'images/sweden.png',
    'images/swisszerland.png',
    'images/uk.png',
    'images/usa.png'
]
var hiddenImage = 'images/question.png';
var board = [];
var BoardSize = 4;
var TwoClick = 0;
var LastIndex = {};
var Score = 0;
var ScoreUp = 10;
var ScoreDown = -1;

/**
 * generate random pictures each board item
 */
function Generate(){
    var b = [];
    for(var i = 0 ; i < BoardSize ; i++){
        b[i] = [];
        board[i] = [];
        for(var j = 0 ; j < BoardSize ; j++){
            b[i].push(false);
            board[i].push('text');
        }
    }

    var x,y,counter = 0;
    for(var i = 0 ; i < images.length ; i++){
        x = Math.floor(Math.random() * BoardSize);
        y = Math.floor(Math.random() * BoardSize);
        while(counter < 2){
            while(true){
                if(b[x][y] == false){
                    b[x][y] = true;
                    board[x][y] = images[i];
                    counter++;
                    break;
                }else{
                    x = Math.floor(Math.random() * BoardSize);
                    y = Math.floor(Math.random() * BoardSize);
                }
            }
        }
        counter = 0;
    }

    console.log(board);
}

/**
 * @param {*} i 
 * @param {*} j 
 * get board item url by it's index
 */
function IndexToId(i,j){
    return ("#board-item-" + i) + j;
}

/**
 * @param {*} i 
 * @param {*} j 
 * @param {*} url 
 * change board item background image
 */
function ChangeBackground(i,j,url){
    $(IndexToId(i,j)).css('background',"url('" + url + "')");
    $(IndexToId(i,j)).css('background-size','cover');
}
//button clicking function
function Click(i,j){
    if(i < 0 || j < 0 || i > 3 || j > 3){
        console.log('invalid input the function');
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
            if(board[LastIndex.x][LastIndex.y] == board[i][j]){
                UpdateScore(true);
            }else{
                UpdateScore(false);
                ChangeBackground(i,j,hiddenImage);
                ChangeBackground(LastIndex.x,LastIndex.y,hiddenImage);
            }
            LastIndex = {};
        },200);
    }
}


/**
 * @param {*} isCorrect 
 * update score
 */
function UpdateScore(isCorrect){
    Score = Score + ((isCorrect) ? ScoreUp : ScoreDown);
    $('#score').text(Score);
}

$(document).ready(function(){
    Generate();
});