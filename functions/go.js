var RUJS = `
document.addEventListener('DOMContentLoaded', function() {
  var el = document.createElement('iframe');

  var w = 450;
  var h = 300;
  var left = (screen.width/2)-(w/2);
  var top = (screen.height/2)-(h/2);
  el.style.position = 'fixed';
  el.style.width = w + 'px';
  el.style.height = h + 'px';
  el.style.top = top + 'px';
  el.style.left = left + 'px';

  el.src = '$DOMAIN/popup.html';
  document.body.appendChild(el);
});
`

export async function onRequest({request}) {
  var country = request.cf.country;
  if (country == 'RU' || true) {
    var url = new URL(request.url);
    var res = RUJS.replace('$DOMAIN', url.origin);
    return new Response(res, {
      headers: {'content-type': 'text/javascript;charset=utf-8'}
    });
  }
  return new Response('console.log("Hello ' + country + '!");', {
    headers: {'content-type': 'text/javascript;charset=utf-8'}
  });
}
