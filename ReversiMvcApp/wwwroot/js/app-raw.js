const Game = (function () {

    let _token;
    let _playerToken;

    const _getCurrentGameState = function () {
        // Game.Model.getGameState()
        console.log("refresh");
        Game.Model.updateGame(_token, _playerToken);
    }

    const init = function (token, playerToken) {
        _token = token;
        _playerToken = playerToken;
        Game.Model.updateGame(_token, _playerToken);
        window.setInterval(function(){      
            _getCurrentGameState()            
        }, 2000);
    };
    return {
        init: init,
    };
})();
const FeedbackWidget = (() => {

    const show = (message, withoutButtons) => {
        $(".alert-text").text(message)
        $("#feedback-widget").removeClass("fade-out")
        $("#feedback-widget").addClass("fade-in")
        
        if(withoutButtons) {
            $(".FeedbackButton").css("display", "none");
        } else {
            $(".FeedbackButton").css("display", "inline");
        }
    } 

    const hide = () => {  
        $("#feedback-widget").removeClass("fade-in")
        $("#feedback-widget").addClass("fade-out")
    }

    return {
        hide: hide,
        show: show,
    }

})();
Game.Api = (() => {
    const showMeme = () => {
        Game.Data.apicall("https://meme-api.herokuapp.com/gimme")
        .then(function (data) {
            $("#meme").html(
                Game.Template.parseTemplate("meme", {src: data["url"]})
            )
        })
    }

    return {
        showMeme: showMeme,
    }
})();
Game.Data = (function () {

    let apicall = (_url) => {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: _url,
                data: {},
                type: "GET",
                success: function (data) {
                    resolve(data);
                },
                error: function (data) {
                    reject(data);
                },
            })
        })
    }

    let apicallPut = (_url, putData) => {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: _url,                
                type: "PUT",
                headers: {'Content-Type': 'application/json'},
                data: JSON.stringify(putData),
                success: function (data) {
                    resolve(data);
                },
                error: function (data) {
                    reject(data);
                },
            })
        })
    }

    let placeDisc = function (div) {

        var x;
        var y;
        var count = 0;
        $('#board').find('div').each(function(){    
            if(div == this) {
                var count1 = count / 2;

                x = count1 % 8;
                y = ~~(count1 / 8);
            }
            count++;
        });

        let data = {
            x: x,
            y: y,
            playerToken: Game.Model.getPlayerToken(),
            gameToken: Game.Model.getGame().token,
            pass: false
        }

        apicallPut("https://localhost:5001/api/Spel/Zet", data).then((data) => {
            Game.Api.showMeme();
        });

        console.log(apicallPut)
    }

    let skip = () => {
        let data  = {
            gameToken: Game.Model.getGame().token,
            playerToken: Game.Model.getPlayerToken(),
        }
        apicallPut("https://localhost:5001/api/Spel/Skip", data)
    }
    
    let printboard = (board) => {
        let data = {
            board: JSON.parse(board)
        }
        
        $("#boardarea").html(Game.Template.parseTemplate("board", data))
    }

    const printDetails = (game) => {
        $("#descriptions").html(game.description);
        $("#player1token").html("Wit: " + game.playerToken1);
        $("#player2token").html("Zwart: " + game.playerToken2);

        if(game.currentPlayer == 1) {
            $("#player1token").css('font-weight', 'bold');
            $("#player2token").css('font-weight', 'normal');
        } else {
            $("#player2token").css('font-weight', 'bold');
            $("#player1token").css('font-weight', 'normal');
        }
    }    


    return {
        printboard: printboard,
        printDetails, printDetails,
        showFiche: placeDisc,
        apicall: apicall,
        skip: skip,
        // surrender: surrender,
    };
})();
Game.Model = (function () {

    var game;
    var currentPlayer;
    var _playerToken;

    const getGame = () => {
        return game;
    }
    const getPlayerToken = () => {
        return _playerToken;
    }

    const updateGame = (token, playerToken) => {
        _getGameData(token).then(function (data) {
            game = data;
            _playerToken = playerToken;      
            Game.Data.printboard(game.board);
            Game.Data.printDetails(game);
            Game.Stats.updateAmounts();            
            _checkTurn(game);
        }).catch(function (error) {
            Game.Data.printboard(game.board);
        })
    }

    const _checkTurn = (game) => {
        if (game.finished == true) {
            FeedbackWidget.show("The game has ended and " + game.winner + " has won", true)
            $("#board").css("opacity","0.5");
            return;
        }
        if (game.currentPlayer == 1) {
            currentPlayer = game.playerToken1;
        } else {
            currentPlayer = game.playerToken2;
        }
        if (currentPlayer != _playerToken) {
            $("#board").css("opacity","0.5");
        }
    }

    const _getGameData = (token) => {
        return new Promise(function (resolve, reject) {
            Game.Data.apicall("https://localhost:5001/api/spel/" + token).then(function (data) {
                if (data != null) {
                    resolve(data);
                }
                reject();
            })
        })
    }

    // Waarde/object geretourneerd aan de outer scope
    return {
        getGame: getGame,
        getPlayerToken: getPlayerToken,
        updateGame: updateGame,
    };

})();
Game.Stats = (() => {

    const updateAmounts = () => {
        var token = Game.Model.getGame().token;
        console.log(token);
        Game.Data.apicall('https://localhost:5001/api/spel/Amount/' + token ).then(function (data) {

        var jsonData= JSON.parse(data);
            playerPieceHistory = {
                player1: [],
                player2: []
            };
            for(let key in jsonData[0]) {
                playerPieceHistory.player1.push(jsonData[0][key].Amount);               
            }
            for(let key in jsonData[1]) {
                playerPieceHistory.player2.push(jsonData[1][key].Amount);               
            }

            $("#Chart").html(Game.Template.parseTemplate("stats", playerPieceHistory))
        })
    }

    const init = () => {
    }

    return {
        init: init,
        updateAmounts: updateAmounts,
    }

})();
Game.Template = (function () {

    const getTemplate = (getTemplate) => {
        return spa_templates.templates[getTemplate];
    }

    const parseTemplate = (templateName, data) => {
        return getTemplate(templateName)(data);
    }
    return {
        parseTemplate: parseTemplate,
    }
})();