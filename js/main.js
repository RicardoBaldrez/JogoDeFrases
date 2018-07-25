/* Contando a quantidade de palavras na frase e atualizando no campo" */
var frase = $(".frase").text();
var numPalavras = frase.split(" ").length;

var tamanhoFrase = $("#tamanho-frase").text(numPalavras);

/* Campo digitação (Text Área) */
var campo = $("#campo-digitacao");
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