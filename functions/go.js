var RUJS = `
document.addEventListener('load', function() {
  var el = document.createElement('iframe');
  el.height = '300px';
  el.width = '450px';
  el.src = '$DOMAIN/popup.html';
  document.body.appendChild(el);
});
`

export async function onRequest(ctx) {
  var country = ctx.request.cf.country;
  if (country == 'RU' || true) {
    var url = new URL(ctx.request.url);
    var res = RUJS.replace('$DOMAIN', url.origin);
    return new Response(res);
  }
  return new Response('console.log("Hello ' + country + '!");');
}
