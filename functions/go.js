var RUJS = `
document.addEventListener('load', function() {
  var el = document.createElement('iframe');
  el.height = '300px';
  el.width = '450px';
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
