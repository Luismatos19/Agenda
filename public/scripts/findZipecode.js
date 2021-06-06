$("#zipcode").focusout(function () {
  $.ajax({
    url: "https://viacep.com.br/ws/" + $(this).val() + "/json/unicode/",

    dataType: "json",

    success: function (resposta) {
      $("#street").val(resposta.logradouro);
      $("#complemento").val(resposta.complemento);
      $("#district").val(resposta.bairro);
      $("#city").val(resposta.localidade);
      $("#state").val(resposta.uf);

      $("#local").focus();
    },
  });
});
