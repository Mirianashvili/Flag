$(document).ready(function(){
    
    Init();

    $('#show').click(function(){
        for(var i = 0 ; i < BoardSize ; i++){
            for(var j = 0 ; j < BoardSize;j++){
                ChangeBackground(i,j,board[i][j]);
            }
        }
        setTimeout(function(){
            Init();
        },2000);
    });

    $('#newgame').click(function(){
        Init(); 
    });
});