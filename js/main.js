var campo = $("#campo-digitacao").addClass("borda-preta");
var tempoInicial = $("#tempo-digitacao").text();

/* Inicialização após o conteúdo ser carregadoo */
$(document).ready(function() {

    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();

    $("#botao-reiniciar").click(reiniciaJogo);

});

/* Contando a quantidade de palavras na frase e atualizando no campo" */
function atualizaTamanhoFrase() {

    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase").text(numPalavras);

}

/* Campo digitação (Text Área) */
function inicializaContadores() {

    campo.on("input", function() {

        var conteudo = $(this).val();
    
        /* Contagem das palavras da frase */
        var qtdePalavras = conteudo.split(/\S+/).length -1;
        $("#contador-palavras").text(qtdePalavras);
    
        /* Contagem dos caracteres da frase */
        var conteudoSemEspaco = conteudo.replace(/\s+/g,'');
        var qtdeCaracteres = conteudoSemEspaco.length;
        $("#contador-caracteres").text(qtdeCaracteres);
    
    });

}

/* Tempo Digitação */
function inicializaCronometro() {

    var tempoRestante = $("#tempo-digitacao").text();

    campo.one("focus", function() {

        $("#botao-reiniciar").attr("disabled", true);
    
        var cronometroID = setInterval(function() {
    
            tempoRestante--;
    
            $("#tempo-digitacao").text(tempoRestante);
    
            if(tempoRestante == 0) {
    
                clearInterval(cronometroID);

                finalizaJogo();
                
                $("#botao-reiniciar").attr("disabled", false);

                inserePlacar();
            }
    
        }, 1000);
    });
}

/* Comparação do digitado com a frase */
function inicializaMarcadores() {

    var frase = $(".frase").text();

    campo.on("input", function() {

        var digitado = $(this).val();

        var comparavel = frase.substr(0, digitado.length);

        if(digitado == comparavel) {

            $(this).addClass("borda-verde");
            $(this).removeClass("borda-vermelha");
            $(this).removeClass("borda-preta");

        } else {

            $(this).addClass("borda-vermelha");
            $(this).removeClass("borda-verde");
            $(this).removeClass("borda-preta");

        }
    });
}

/* Finaliza Jogo */
function finalizaJogo() {

    campo.attr("disabled", true);

    campo.toggleClass("campo-desativado");

}

/* Reiniciar Jogo */
function reiniciaJogo() {

    campo.attr("disabled", false);
    campo.val("");
    campo.toggleClass("campo-desativado");
    campo.addClass("borda-preta");
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");

    $("#contador-caracteres").text("0");
    $("#contador-palavras").text("0");

    $("#tempo-digitacao").text(tempoInicial);

    inicializaCronometro();

}

/* Insere no placar */
function inserePlacar() {

    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Ricardo";
    var numPalavras = $("#contador-palavras").text();

    var linha = novaLinha(usuario, numPalavras);

    corpoTabela.append(linha);

}

/* Nova linha que será inserida no placar */
function novaLinha(usuario, palavras) {

    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);

    return linha;
}