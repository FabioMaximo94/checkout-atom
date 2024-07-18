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




$(".send--payment").click(function(){
  $(this).addClass("act");
  $("form.needs-validation>div").removeClass("act");
  $(".register__section--two").addClass("act");
  $(".select--checkout-pagamento").addClass("act");
});

$(".send-agradecimento").click(function(){
  $(this).addClass("act");
  $("form.needs-validation>div").removeClass("act");
  $(".register__section--three").addClass("act");
  $(".select--checkout-agradecimento").addClass("act");
});





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



});
