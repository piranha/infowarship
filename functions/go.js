var RUJS = `
(function() {
function main() {
  var el = document.createElement('iframe');

  var w = 600;
  var h = 600;
  var left = (window.innerWidth/2)-(w/2);
  var top = (window.innerHeight/2)-(h/2);

  el.style = 'top: 0; left: 0; width: 100vw; height: 100vh; bottom: 0; right: 0; z-index: 2000000;';


  el.style.position = 'fixed';
  el.src = '$DOMAIN/popup.html';

  document.body.appendChild(el);
  window.addEventListener('message', function(e) {
    if (e.data == 'plzremove') {
      el.remove();
    }
  });
}

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}
})();
`

export async function onRequest({request}) {
  var url = new URL(request.url);
  var country = request.cf.country;
  if (country == 'RU' || url.search.match(/\bdebug\b/)) {
    var res = RUJS.replace('$DOMAIN', url.origin);
    return new Response(res, {
      headers: {'content-type': 'text/javascript;charset=utf-8'}
    });
  }
  return new Response('console.log("Hello ' + country + '!");', {
    headers: {'content-type': 'text/javascript;charset=utf-8'}
  });
}
