var campo = $("#campo-digitacao");
var tempoInicial = $("#tempo-digitacao").text();

/* Inicialização após o conteúdo ser carregadoo */
$(document).ready(function() {

    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();

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
    $("#contador-caracteres").text("0");
    $("#contador-palavras").text("0");

    $("#tempo-digitacao").text(tempoInicial);

    inicializaCronometro();

}