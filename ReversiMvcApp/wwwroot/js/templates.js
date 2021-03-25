Handlebars.registerPartial("cell", Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"cell\" onclick=\"Game.Data.showFiche(this.id)\" id=\"cell"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data,"loc":{"start":{"line":1,"column":65},"end":{"line":1,"column":71}}}) : helper)))
    + "\"></div>\n\n\n";
},"useData":true}));
Handlebars.registerPartial("fiche", Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"disc disc-"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "\"></div>";
},"useData":true}));
this["spa_templates"] = this["spa_templates"] || {};
this["spa_templates"]["templates"] = this["spa_templates"]["templates"] || {};
this["spa_templates"]["templates"]["board"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":8},"end":{"line":5,"column":17}}})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class=\"cell\" onclick=\"Game.Data.showFiche(this)\">"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"fiche"),depth0,{"name":"fiche","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "</div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id=\"board\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"board") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":4},"end":{"line":6,"column":13}}})) != null ? stack1 : "")
    + "</div>";
},"usePartial":true,"useData":true});
this["spa_templates"]["templates"]["body"] = Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<section class=\"body\">\n "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"bericht") || (depth0 != null ? lookupProperty(depth0,"bericht") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"bericht","hash":{},"data":data,"loc":{"start":{"line":2,"column":1},"end":{"line":2,"column":12}}}) : helper)))
    + "\n </section>";
},"useData":true});
this["spa_templates"]["templates"]["meme"] = Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<img class=\"meme\" src=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"src") || (depth0 != null ? lookupProperty(depth0,"src") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"src","hash":{},"data":data,"loc":{"start":{"line":1,"column":23},"end":{"line":1,"column":30}}}) : helper)))
    + "\" alt=\"meme\">";
},"useData":true});
this["spa_templates"]["templates"]["stats"] = Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<canvas id=\"PlayerPointsChart\" ></canvas>\n<script>\n    var ctx = document.getElementById('PlayerPointsChart').getContext('2d');\n    var player1PieceHistory = ["
    + alias4(((helper = (helper = lookupProperty(helpers,"player1") || (depth0 != null ? lookupProperty(depth0,"player1") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"player1","hash":{},"data":data,"loc":{"start":{"line":4,"column":31},"end":{"line":4,"column":44}}}) : helper)))
    + "];\n    var player2PieceHistory = ["
    + alias4(((helper = (helper = lookupProperty(helpers,"player2") || (depth0 != null ? lookupProperty(depth0,"player2") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"player2","hash":{},"data":data,"loc":{"start":{"line":5,"column":31},"end":{"line":5,"column":44}}}) : helper)))
    + "];\n\n    debugger;\n    var turns = [];\n\n    for (let i = 0; i < player1PieceHistory.length; i++) {\n        turns.push(\"Turn \" + (i + 1));\n    }\n\n    var data = {\n        labels: turns,\n        datasets: [{\n            label: \"White\",\n            lineTension: 0.1,\n            borderColor: \"red\",\n            borderDash: [],\n            pointBorderColor: \"black\",\n            pointBackgroundColor: \"white\",\n            pointRadius: 4,\n            data: player1PieceHistory,\n            animation: \"none\",\n        }, {\n            label: \"Black\",\n            background: false,\n            lineTension: 0.1,\n            borderColor: \"blue\",\n            borderDash: [],\n            pointBorderColor: \"black\",\n            pointBackgroundColor: \"white\",\n            pointRadius: 4,\n            data: player2PieceHistory,\n            animation: \"none\",\n        }\n\n        ]\n    };\n    var options = {\n        scales: {\n            yAxes: [{\n                ticks: {\n                    beginAtZero: true\n                },\n                scaleLabel: {\n                    display: true,\n                    labelString: 'Piece history',\n                    fontSize: 16\n                }\n            }]\n        }\n    };\n\n    new Chart(ctx, {\n        type: 'line',\n        data: data,\n        options: options\n    });\n</script>";
},"useData":true});