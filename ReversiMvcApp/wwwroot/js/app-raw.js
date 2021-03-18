const Game = (function (url) {

    let _url = url;

    const _getCurrentGameState = function () {
        // Game.Model.getGameState()
    }

    const init = function (afterInit) {        
        setInterval(
            // _getCurrentGameState(),
            2000
        );
        afterInit();
    };
    // Waarde/object geretourneerd aan de outer scope
    return {
        init: init,
    };
})('https://meme-api.herokuapp.com/gimme');
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
Game.Api = (function () {

    console.log("joejoe vanuit api");



    const showMeme = () => {
        Game.Data.apicall("https://meme-api.herokuapp.com/gimme")
        .then(function (data) {
            $("#test").append(
                Game.Template.parseTemplate("meme", {src: data["url"]})
            )
        })
    }

    return {
        showMeme: showMeme,
        
    }
})();
Game.Data = (function () {

    console.log('hallo, vanuit module data')

    let board = { board: [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 2, 0, 0, 0], [0, 0, 0, 2, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]] }

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

    // let printboard = function () {
    //     for (var i = 0; i < gameBoard.length; i++) {
    //         var colour = gameBoard[i].split(", ");
    //         console.log(colour);

    //         for (var j = 0; j < colour.length; j++) {
    //             console.log(colour[j]);
    //             $("#board").append(
    //                 // Game.Template.
    //                 // Handlebars.partials.cell({id: i + j})
    //                 "<div class=\"cell\" onclick=\"Game.Data.showFiche(this.id)\" id=\"cell" + i + j + "\"></div>"
    //             )
    //             if (colour[j] == "Wit") {
    //                 $("#cell" + i + j + "").append(
    //                     "<div class=\"disc disc-1\"></div>"
    //                 )
    //             }
    //             else if (colour[j] == "Zwart") {
    //                 $("#cell" + i + j + "").append(
    //                     "<div class=\"disc disc-2\"></div>"
    //                 )
    //             }

    //         }
    //     }
    // }

    let printboard = () => {
        $("#board").html(Game.Template.parseTemplate("bord", board))
    }


    return {
        printboard: printboard,
        showFiche: placeDisc,
        apicall: apicall,
    };
})();
Game.Model = (function() {
    console.log('hallo, vanuit module Model')   
    
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
        
    // Private function init
    const privateInit = function(){
        // console.log(configMap.apiUrl);
    };
    
    // Waarde/object geretourneerd aan de outer scope
    return {
    init: privateInit,
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