const Game = (function (token) {

    let _token = token;

    const _getCurrentGameState = function () {
        // Game.Model.getGameState()
        console.log("refresh");
        Game.Model.updateGame(_token);
    }

    const init = function () {
        window.setInterval(function(){      
            _getCurrentGameState()            
        }, 2000);
        afterInit();
    };
    // Waarde/object geretourneerd aan de outer scope
    return {
        init: init,
    };
})('d2dd4b51-c863-4dd7-9daa-060ebc38a569');
$(function() {
    let x = new FeedbackWidget("feedback-danger")
    console.log( "ready!" );
    $("#selector").on("click", function(){
        x.show();
        alert("The button was clicked.");
    });
}); 

var logs = 0;
class FeedbackWidget{
    
    constructor(elementId) {
        this._elementId = elementId;
    }
    get elementId() { //getter, set keyword voor setter methode
        return this._elementId;
    }
    
    log(message){
        localStorage.setItem(logs, JSON.stringify(message))
        if(localStorage.length > 9){
            localStorage.removeItem(localStorage.key(0))
        }
        logs++
    }

    removeLog(){
        localStorage.clear();   
    }

    history(){
        for(let i = 0; i < localStorage.length; i++){
            let x = JSON.stringify(new Array(localStorage.getItem(i).message, localStorage.getItem(i).type))
            console.log(x + '\n')
        }
    }

    show(message){
        $(".alert-text").text(message + "Hello friend")
            $("#feedback-widget").removeClass("fade-out")
            $("#feedback-widget").addClass("fade-in")
    }

    hide(){
        var feedback = document.getElementById("feedback-widget")
        
        $("#feedback-widget").removeClass("fade-in")
        $("#feedback-widget").addClass("fade-out")
    } 
}
Game.Api = (() => {

    console.log("joejoe vanuit api");

    const showMeme = () => {
        Game.Data.apicall("https://meme-api.herokuapp.com/gimme")
        .then(function (data) {
            $("#test").html(
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

    let placeDisc = function (cellId) {

        $("#" + cellId).append(
            "<div class=\"disc disc1\"></div>"
        )
    }

    let printboard = (board) => {
        let data = {
            board: JSON.parse(board)
        }
        $("#boardarea").html(Game.Template.parseTemplate("board", data))
    }

    const printDetails = (game) => {
        $("#descriptions").html(game.description);
        $("#player1token").html(game.playerToken1);
        $("#player2token").html(game.playerToken2);

        if(game.currentPlayer == 2) {
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
    };
})();
Game.Model = (function () {

    let game;

    // const _getGameState = function(token){
    //     //aanvraag via Game.Data
    //     let state = Game.Data.get("/api/Spel/Beurt/" + token);
    //     //controle of ontvangen data valide is
    //     switch(state){
    //         case 0:
    //             return "Geen specifieke waarde"
    //         case 1:
    //             return "Wit is aan zet"
    //         case 2:
    //             return "Zwart is aan zet"             
    //     }
    // };

    const updateGame = (token) => {
        _getGameData(token).then(function (data) {
            game = data;
            Game.Data.printboard(game.board);
            Game.Data.printDetails(game);
        }).catch(function (error) {
            Game.Data.printboard(game.board);
        })
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

    // Private function init
    const privateInit = function () {
        // console.log(configMap.apiUrl);
    };

    // Waarde/object geretourneerd aan de outer scope
    return {
        init: privateInit,
        updateGame: updateGame,
        game: game,

        // getGameState: _getGameState
    };
})();
Game.Reversi = (function() {
    console.log('hallo, vanuit module Reversi')

    //Configuratie en state waarden
    // let configMap = {
    //     apiUrl: url
    // };
    
    // Private function init
    const privateInit = function(){
        // console.log(configMap.apiUrl);
    };
    
    // Waarde/object geretourneerd aan de outer scope
    return {
    // init: privateInit
    } ;   
})();
Game.Stats = (() => {

    var _configMap;

    const init = (configMap) => {
        _configMap = configMap
    }

    return {
        init: init
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