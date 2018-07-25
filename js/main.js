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
    
                campo.attr("disabled", true);

                campo.toggleClass("campo-desativado");
    
                clearInterval(cronometroID);
                
                $("#botao-reiniciar").attr("disabled", false);
            }
    
        }, 1000);
    });
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

/*  */
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