function verReceita(titulo, modo) {
  var modal  = document.getElementById('modal-receita');
  var tituloEl = document.getElementById('modal-titulo');
  var modoEl   = document.getElementById('modal-modo');
  var msgFav   = document.getElementById('msg-favorito');

  tituloEl.textContent = titulo;
  modoEl.textContent   = modo;

  msgFav.style.display = 'none';

  modal.style.display = 'flex';

  document.body.style.overflow = 'hidden';
}

function fecharModal() {
  var modal = document.getElementById('modal-receita');
  modal.style.display = 'none';

  document.body.style.overflow = '';
}

document.getElementById('modal-receita').addEventListener('click', function(evento) {
  if (evento.target === this) {
    fecharModal();
  }
});

document.addEventListener('keydown', function(evento) {
  if (evento.key === 'Escape') {
    fecharModal();
  }
});

function adicionarFavorito() {
  var msg = document.getElementById('msg-favorito');

  msg.style.display = 'block';

  setTimeout(function() {
    msg.style.display = 'none';
  }, 3000);
}

function filtrar(categoria) {
  var cards = document.querySelectorAll('.card-receita');

  cards.forEach(function(card) {
    var cat = card.getAttribute('data-categoria');

    if (categoria === 'todas' || cat === categoria) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
  var botoes = document.querySelectorAll('.btn-filtro');
  botoes.forEach(function(btn) {
    btn.classList.remove('ativo');
  });

  var mapa = { 'todas': 0, 'prato': 1, 'sobremesa': 2, 'bebida': 3 };
  if (mapa[categoria] !== undefined) {
    botoes[mapa[categoria]].classList.add('ativo');
  }
}

function calcularPorcoes() {
  var input = document.getElementById('num-pessoas');
  var pessoas = parseInt(input.value);

  var resultado = document.getElementById('resultado-porcoes');

  if (isNaN(pessoas) || pessoas <= 0) {
    alert('Por favor, informe um número válido de pessoas (mínimo 1).');
    return;
  }

  var base = 10;
  var fator = pessoas / base;

  var feijao    = (1500 * fator / 1000).toFixed(1);   
  var carnes    = (2000 * fator / 1000).toFixed(1);   
  var linguica  = (600  * fator / 1000).toFixed(1);   
  var arroz     = (800  * fator / 1000).toFixed(1);   
  var couve     = Math.ceil(2 * fator);                

  var html = '<strong>🍲 Feijoada para ' + pessoas + ' pessoa(s):</strong><br>';
  html += '• Feijão preto: <strong>' + feijao + ' kg</strong><br>';
  html += '• Carnes variadas: <strong>' + carnes + ' kg</strong><br>';
  html += '• Linguiça defumada: <strong>' + linguica + ' kg</strong><br>';
  html += '• Arroz: <strong>' + arroz + ' kg</strong><br>';
  html += '• Couve: <strong>' + couve + ' maço(s)</strong>';

  resultado.innerHTML = html;
  resultado.style.display = 'block';
}

function enviarFormulario() {
  var campos = ['nome', 'email', 'nome-receita', 'descricao'];
  var valido  = true; 

  campos.forEach(function(id) {
    var campo = document.getElementById(id);
    var valor = campo.value.trim(); 

    if (valor === '') {
      campo.classList.add('erro');
      valido = false;
    } else {
      campo.classList.remove('erro');
    }
  });

  var msgForm = document.getElementById('msg-form');

  if (!valido) {
    msgForm.textContent = 'Por favor, preencha todos os campos obrigatórios (*).';
    msgForm.className   = 'falha';
    msgForm.style.display = 'block';
    return; 
  }

  msgForm.textContent = 'Receita enviada com sucesso! Obrigado pela contribuição, ' +
    document.getElementById('nome').value + '!';
  msgForm.className   = 'sucesso';
  msgForm.style.display = 'block';

  campos.forEach(function(id) {
    document.getElementById(id).value = '';
    document.getElementById(id).classList.remove('erro');
  });

  setTimeout(function() {
    msgForm.style.display = 'none';
  }, 5000);
}

document.querySelectorAll('#form-receita input, #form-receita textarea').forEach(function(campo) {
  campo.addEventListener('input', function() {
    this.classList.remove('erro');
  });
});
