/**
* Module pattern base class to start the Game with gameToken & playertoken
* Sets an update function "refresh boarrd every x miliseconds"
* @author Dylan Roubos
*/
const Game = (function () {

    //Method that will be called every x miliseconds to refresh the game
    const _getCurrentGameState = function () {
        Game.Model.updateGame();
    }

    //Method to init the game by setting default settings in the model + adding te method interval
    const init = function (token, playerToken) {
        // gameRefreshRate = refreshRate;
        Game.Model.setGameToken(token);
        Game.Model.setPlayerToken(playerToken);

        window.setInterval(function(){      
            _getCurrentGameState()            
        }, 2000);
    };
    return {
        init: init,
    };
})();
//Function for showing a feedbackwidget, including multiple 
//options to customise onclick event and which buttons are shown
//@author Dylan Roubos
//
const FeedbackWidget = (() => {
    //Buttons enabled:
    // 0 = close only
    // 1 = close & accept
    // 2 = close & accept & deny
    const show = (message, onclick, buttonsEnabled) => {
        $(".alert-text").text(message)
        $("#feedback-widget").removeClass("fade-out")
        $("#feedback-widget").addClass("fade-in")            

        //Add the onclick to both the close & accept button
        $("#feedback-icon").on("click", _buttonHandling.bind(null, onclick));
        $(".FeedbackButton1").on("click", _buttonHandling.bind(null, onclick));

        //Check which buttons should be enabled
        if(buttonsEnabled == 0) {        
            $(".FeedbackButton").css("display", "none");                     
        } else if(buttonsEnabled == 1) {
            $(".FeedbackButton1").css("display", "inline");     
            $(".FeedbackButton2").css("display", "none");       
        } else if(buttonsEnabled == 2) {
            $(".FeedbackButton").css("display", "inline");   
        }
    } 

    //Method to be able to add multiple function to the onclick of an element
    const _buttonHandling = (customFunction) => {
        customFunction();
        hide();
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
//TODO: remove the function that do not need to be in this module ()
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
                    reject("ERROR");
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
            Game.Meme.showMeme();
        });
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

    let surrender = () => {
        let data  = {
            gameToken: Game.Model.getGame().token,
            playerToken: Game.Model.getPlayerToken(),
        }
        apicallPut("https://localhost:5001/api/Spel/Opgeven", data)
    }


    return {
        printboard: printboard,
        printDetails, printDetails,
        showFiche: placeDisc,
        apicall: apicall,
        skip: skip,
        apicallPut, apicallPut,
        surrender: surrender,
    };
})();
/**
* Game module to handle everything Delete related
* @author Dylan Roubos
*/
Game.Delete = (() => {

    //Method to send a put request to the api with gametoken & playertoken to accept te end of the game from the user his side
    const acceptDeleteGame = () => {
        //Get the user its data from the model according to the expected API format
        var data = {
            playerToken: Game.Model.getPlayerToken(),
            gameToken: Game.Model.getGame().token,
        }
        //Send the data the api
        Game.Data.apicallPut("https://localhost:5001/api/spel/finish", data);
    }

    return {
        acceptDeleteGame, acceptDeleteGame,
    }
})();
/**
* Game module to show the meme
* @author Dylan Roubos
*/
Game.Meme = (() => {

    //Get the game data & show it on the page using the handlebars
    const showMeme = () => {
        Game.Data.apicall("https://meme-api.herokuapp.com/gimme")
        .then(function (data) {
            $("#meme").html(
                Game.Template.parseTemplate("meme", {src: data["url"]})
            )
        })
    }

    return {
        showMeme, showMeme
    }
})();
//TODO: remove the function that do not need to be in this module ()
Game.Model = (function () {

    var game = "";
    var gameToken = "";
    var currentPlayer = "";
    var playerToken = "";

    const getGame = () => {
        return game;
    }
    const getPlayerToken = () => {
        return playerToken;
    }
    const getGameToken = () => {
        return gameToken;
    }
    const setGameToken = (_gameToken) => {
        gameToken = _gameToken;
    }
    const setPlayerToken = (_playerToken) => {
        playerToken = _playerToken;
    }

    const updateGame = () => {
        _getGameData(gameToken).then(function (data) {
            game = data;

            Game.Data.printboard(game.board);
            Game.Data.printDetails(game);
            Game.Stats.updateStats();

            _checkTurn(game);
        }).catch(function (error) {
            console.log("Error in getting the game data from API");
        })
    }

    var _checkTurn = (game) => {
        if (game.token == null) {
            window.location.replace("https://localhost:5002");
        }
        if (game.finished == true) {
            $("#board").css("opacity", "0.5");
            FeedbackWidget.show("The game has ended and " + game.winner + " has won", Game.Delete.acceptDeleteGame, 1)
            return;
        }
        if (game.currentPlayer == 1) {
            currentPlayer = game.playerToken1;
        } else {
            currentPlayer = game.playerToken2;
        }
        if (currentPlayer != playerToken) {
            $("#board").css("opacity", "0.5");
        }
    }

    const _getGameData = (token) => {
        return new Promise(function (resolve, reject) {
            Game.Data.apicall("https://localhost:5001/api/spel/" + token).then(function (data) {
                if (data != null) {
                    resolve(data);
                    Game.Data.apicall("https://localhost:5001/api/spel/finished/" + token);
                }
            }).catch(function (error) {
                console.log("Error in getting the data 2")
            })
        })
    }
    // Waarde/object geretourneerd aan de outer scope
    return {
        getGame: getGame,
        getPlayerToken: getPlayerToken,
        setGameToken: setGameToken,
        getGameToken: getGameToken,
        setPlayerToken: setPlayerToken,
        updateGame: updateGame,
    };

})();
/**
* Game module to handle the statistics graphics
* @author Dylan Roubos
*/
Game.Stats = (() => {
    //Method to update to get the data
    const updateStats = () => {
        _updateAmounts().then((data) => {
            _placeGraphic(data);
        });
    }
    //Method that returns a Promise with the data fetched from the api and parsed into usable data for the handeblar tempalt
    const _updateAmounts = () => {
        return new Promise(function (resolve, reject) {
            //Get the player statistics data from the API
            var token = Game.Model.getGame().token;
            Game.Data.apicall('https://localhost:5001/api/spel/Amount/' + token).then(function (data) {

                var jsonData = JSON.parse(data);

                //Create a js array template based on the expected format from the handlebar template
                playerPieceHistory = {
                    player1: [],
                    player2: []
                };

                //Add the data for the first player to the array template
                for (let key in jsonData[0]) {
                    playerPieceHistory.player1.push(jsonData[0][key].Amount);
                }
                //Add the data for the second player array template
                for (let key in jsonData[1]) {
                    playerPieceHistory.player2.push(jsonData[1][key].Amount);
                }
                resolve(playerPieceHistory);
            })
        })

    }
    //Method to place the statistics onto the screen witht the handlebar template
    const _placeGraphic = (playerPieceHistory) => {
        $("#Chart").html(Game.Template.parseTemplate("stats", playerPieceHistory))
    }

    return {
        updateStats: updateStats,
    }

})();
/**
* Game module to handle the template steps for handlebars
* @author Dylan Roubos
*/
Game.Template = (function () {

    //Method to call the template withouth initialising it
    const getTemplate = (getTemplate) => {
        return spa_templates.templates[getTemplate];
    }

    //Method to the called template with the given data
    const parseTemplate = (templateName, data) => {
        return getTemplate(templateName)(data);
    }
    return {
        parseTemplate: parseTemplate,
    }
})();