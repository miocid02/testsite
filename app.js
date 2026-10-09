// Formulario de contacto: arma un asunto identificable y lo envía a Web3Forms
// (el servicio reenvía a tu correo sin mostrarlo en la página).
var f = document.getElementById('form');
if (f) {
  var estado = document.getElementById('estado');
  var btn = f.querySelector('button');
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    var d = Object.fromEntries(new FormData(f));
    if (d.botcheck) return; // trampa para bots
    d.subject = '[BibliaNavarra][' + d.tipo + '] ' + (d.asunto.trim() || '(sin asunto)');
    btn.disabled = true;
    estado.textContent = 'Enviando…';
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(d)
    })
      .then(function (r) { return r.json(); })
      .then(function (r) {
        if (!r.success) throw new Error(r.message);
        f.reset();
        estado.textContent = 'Mensaje enviado. Gracias.';
      })
      .catch(function () {
        estado.textContent = 'No se pudo enviar. Revisa tu conexión e inténtalo de nuevo.';
      })
      .then(function () { btn.disabled = false; });
  });
}
