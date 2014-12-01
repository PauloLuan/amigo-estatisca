var fs = require('fs');

var amigos = ['Ananda', 'Camila', 'Simone', 'Fontes', 'Tutu', 'Eduardo', 'Julie', 'Jinny', 'Paulo Luan']
var amigos_sorteados = amigos.slice(0); // clone

var resultado = [];

var sorteia = function() {
    for (var i = 0; i < amigos.length; i++) {
        var amigo = amigos[i];

        while(true) {
            var sorteado = amigos_sorteados[Math.floor(Math.random() * amigos_sorteados.length)];

            if(sorteado != amigo) {
                var resultado_verificacao = verifica(sorteado, amigo)

                if(resultado_verificacao != null)
                {
                    resultado.push(resultado_verificacao);
                    removeItem(sorteado);
                    break;
                }
            }
        }
    };
}

var verifica = function(sorteado, amigo) {
    var result = null;

    if(amigo === 'Ananda')
    {
        if(sorteado === 'Camila'
           || sorteado === 'Fontes'
           || sorteado === 'Simone')
        {
            return null;
        }
    }
    else if(amigo === 'Camila' || amigo === 'Fontes' || amigo === 'Simone')
    {
        if(sorteado === 'Ananda')
        {
            return null;
        }
    }

    result = {
        "nome": amigo,
        "sorteado": sorteado
    }

    return result;
}

var removeItem = function(amigo) {
    var index = amigos_sorteados.indexOf(amigo);
    amigos_sorteados.splice(index, 1);
}

sorteia();

for (var i = 0; i < resultado.length; i++) {
    var tempResult = resultado[i];

    var texto = "Atenção, se você não é o " + tempResult.nome + " Feche imediatamente esse arquivo!"
    texto += "\n" + " Você tirou .....";

    for (var j = 0; j < 100; j++) {
        texto += "\n  v";
    };

    texto += "\n\n";
    texto += tempResult.sorteado;

    fs.writeFile(tempResult.nome + ".txt", texto, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("The file was saved!");
        }
    });

};
