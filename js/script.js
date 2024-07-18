$(window).on("load", function() {
  $(".loader")
    .delay(1000)
    .fadeOut("slow");
});

$(document).ready(function() {
  $("#currentYear").text(new Date().getFullYear());
  validateCheckoutform();
  attachTopScroller(".scrollUp");
});

function validateCheckoutform() {
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.getElementsByClassName("needs-validation");

  // Loop over them and prevent submission
  var validation = Array.prototype.filter.call(forms, function(form) {
    form.addEventListener(
      "submit",
      function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
}
function attachTopScroller (elementId){
  $(window).scroll(function() {
      if ($(this).scrollTop() > 100) {
          $(elementId).fadeIn();
      } else {
          $(elementId).fadeOut();
      }
  });
  // Scroll To Top Animation
  $(elementId).click(function() {
      $("html, body").animate({
          scrollTop: 0
      }, 1000);
      return false;
  });
};




$(document).ready(function() {
  var elemcep = $("#cep");
  if (elemcep) {
      elemcep.keyup(function() {

          if (elemcep.val().length == 8){
            elemcep = elemcep.val();

            $.ajax({
              url: "https://viacep.com.br/ws/"+elemcep+"/json/",
              type: "GET",
              dataType: "json",
              success: function (data) {
    
                  if(data.erro !== undefined){
                      alert("CEP inválido ou não encontrado");
                  }else{
                      $("#endereco").val(data.logradouro);
                      $("#bairro").val(data.bairro);
                      $("#cidade").val(data.localidade);
                      $("#estado").val(data.uf);
                      $(".adress--infos").removeClass("none");
                  }
              },
              error: function(data){
                  alert("Algum erro ocorreu, consulte o log.");
              },
              complete: function(){
                  //loading.hide();
              }
            });

          }
      });
  }
  



$("#cpfcnpj").keydown(function(){
  try {
      $("#cpfcnpj").unmask();
  } catch (e) {}

  var tamanho = $("#cpfcnpj").val().length;

  if(tamanho < 11){
      $("#cpfcnpj").mask("999.999.999-99");
  } else {
      $("#cpfcnpj").mask("99.999.999/9999-99");
  }

  // ajustando foco
  var elem = this;
  setTimeout(function(){
      // mudo a posição do seletor
      elem.selectionStart = elem.selectionEnd = 10000;
  }, 0);
  // reaplico o valor para mudar o foco
  var currentValue = $(this).val();
  $(this).val('');
  $(this).val(currentValue);
});




var minutos = 60;
var segundos = 0;
var timer = setInterval(function() {
  if (segundos > 0) {
    segundos--;
  } else {
    if (minutos > 0) {
      minutos--;
      segundos = 59;
    } else {
      clearInterval(timer);
      $("#contador").html("Tempo esgotado!");
      return;
    }
  }
  $("#contador").html(minutos + ":" + (segundos < 10 ? "0" : "") + segundos);
}, 1000);

$("#telefone").mask("(00) 0000-00009");
$("#cc-number").mask("9999 9999 9999 9999");
$("#cc-expiration").mask("99/99");
$("#cc-cvv").mask("999");

});

  let gateway_id = "TransactionID1233980";





function sendUser(gateway_id) {
  
  let username = $("#username").val();
  let mail = $("#mail").val();
  let telefone = $("#telefone").val();
  let cpfcnpj = $("#cpfcnpj").val();
  let cep = $("#cep").val();
  let endereco = $("#endereco").val();
  let complemento = $("#complemento").val();
  let numero = $("#numero").val();
  let estado = $("#estado").val();
  let cidade = $("#cidade").val();
  let bairro = $("#bairro").val();

  let valor = "697.00";
  let site = "https://www.lucrandocomjuros.com";
  let tags = "lucrandocomjuros";
  let paymentMethod = $('input[name="paymentMethod"]:checked').val();

  var dataAtual = new Date();
  var ano = dataAtual.getFullYear();
  var mes = ("0" + (dataAtual.getMonth() + 1)).slice(-2);
  var dia = ("0" + dataAtual.getDate()).slice(-2);
  var hora = ("0" + dataAtual.getHours()).slice(-2);
  var minuto = ("0" + dataAtual.getMinutes()).slice(-2);
  var segundo = ("0" + dataAtual.getSeconds()).slice(-2);
  var dataFormatada = ano + "-" + mes + "-" + dia + " " + hora + ":" + minuto + ":" + segundo;


  var raw = "{\n    \"coupon\": \"\",\n    \"scheduled_at\":\""+dataFormatada+"\",\n    \"items\": [\n        {\n            \"product_id\": 1,\n            \"quantity\": 1\n        }\n    ],\n    \"customer\": {\n        \"email\": \""+mail+"\",\n        \"identification\": \""+cpfcnpj+"\",\n        \"name\": \""+username+"\",\n        \"neighborhood\": \""+bairro+"\",\n        \"phone\": \""+telefone+"\",\n        \"street\": \""+endereco+", "+numero+", "+complemento+"\",\n        \"zipcode\": \""+cep+"\",\n        \"state\": \""+estado+"\",\n        \"city\": \""+cidade+"\"\n    },\n    \"crm_info\": {\n        \"list_ids\": \"1,2,3\",\n        \"utm_medium\": \"utm_medium\",\n        \"utm_source\": \"utm_source\",\n        \"utm_content\": \"utm_content\",\n        \"create_deal\": \"true\",\n        \"url\": \""+site+"\",\n        \"tags\": \""+tags+"\"\n    },\n    \"payments\": [\n        {\n            \"gateway\": \""+paymentMethod+"\",\n            \"gateway_id\": \""+gateway_id+"\",\n            \"payment_plan_id\": \"8-1\",\n            \"amount\": \""+valor+"\",\n            \"status\": \"paid\"\n        }\n    ]\n}";

  var requestOptions = {
    method: 'POST',
    body: raw,
    redirect: 'follow'
  };
  
  fetch("https://coyo.staging.pay.nova.money/api/v1/orders", requestOptions)
    .then(response => response.text())
    .then(result => {

      console.log('Aqui o codigo que irá ser validado api acessada com sucesso!');
      console.log(result);

    })
    .catch(error => console.log('error', error));




}



function sendPay() {

  let paymentMethod = $('input[name="paymentMethod"]:checked').val();
  let ccnumber = $("#cc-number").val();
  let ccname = $("#cc-name").val();
  let cpfcnpj = $("#cpfcnpj").val();
  let cccvv = $("#cc-cvv").val();

  let inputValue = $("#cc-expiration").val();
  let primeirosNumeros = inputValue.substring(0, 2);
  let ultimosNumeros = inputValue.substring(2, 4);


  var raw = "{\n  \"type\": \""+paymentMethod+"\",\n  \"card\": {\n    \"number\": \""+ccnumber+"\",\n    \"holder_name\": \""+ccname+"\",\n    \"holder_document\": \""+cpfcnpj+"\",\n    \"cvv\": \""+cccvv+"\",\n    \"exp_month\": "+primeirosNumeros+",\n    \"exp_year\": "+ultimosNumeros+"\n  }\n}";

  var requestOptions = {
    method: 'POST',
    body: raw,
    redirect: 'follow'
  };
  
  fetch("https://api.pagar.me/core/v5/tokens?appid=pk_test_OjV6NDMcPaszNJ3q", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}










$(".send--payment").click(function(){

  $("form.needs-validation>div").removeClass("act");
  $(".register__section--two").addClass("act");
  $(".select--checkout-pagamento").addClass("act");

});



$(".send--agradecimento").click(function(){

  sendUser();
  sendPay(gateway_id);

  // Como não ta acessando a API vou proceguir por aqui, se não me baseava no response do fetch
  $("form.needs-validation>div").removeClass("act");
  $(".register__section--three").addClass("act");
  $(".select--checkout-agradecimento").addClass("act");

});
