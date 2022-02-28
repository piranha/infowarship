var RUJS = `
(function() {
function main() {
  var el = document.createElement('iframe');

  var w = 600;
  var h = 600;
  var left = (window.innerWidth/2)-(w/2);
  var top = (window.innerHeight/2)-(h/2);

  if (left < 0 || top < 0) {
    el.style = 'top: 0px; left: 0px; width: 100%; height: 100%;';
  } else {
    el.style.width = w + 'px';
    el.style.height = h + 'px';
    el.style.top = top + 'px';
    el.style.left = left + 'px';
  }

  el.style.position = 'fixed';
  el.src = '$DOMAIN/popup.html';
  el.id = 'infowarship';
  document.body.appendChild(el);
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
