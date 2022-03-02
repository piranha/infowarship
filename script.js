(function() {

  var POPUP = `
  <!doctype html>
  <html>
  <head>
  <style>html{font-size:62.5%;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif}body{font-size:1.8rem;line-height:1.618;max-width:38em;margin:auto;color:#fff;background-color:#000;padding:13px}@media (max-width:684px){body{font-size:1.53rem}}@media (max-width:382px){body{font-size:1.35rem}}h1,h2,h3,h4,h5,h6{line-height:1.1;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif;font-weight:700;margin-top:3rem;margin-bottom:1.5rem;overflow-wrap:break-word;word-wrap:break-word;-ms-word-break:break-all;word-break:break-word;-ms-hyphens:auto;-moz-hyphens:auto;-webkit-hyphens:auto;hyphens:auto}h1{font-size:2.35em}h2{font-size:2em}h3{font-size:1.75em}h4{font-size:1.5em}h5{font-size:1.25em}h6{font-size:1em}p{margin-top:0;margin-bottom:3.5rem}a{color:#2196f3}a:hover{color:#fff}ul{padding-left:1.4em;margin-top:0;margin-bottom:2.5rem}li{margin-bottom:.4em}.button,button{display:inline-block;padding:12px 24px;text-align:center;text-decoration:none;white-space:nowrap;background-color:#2196f3;color:#f9f9f9;border-radius:5px;cursor:pointer;box-sizing:border-box}.button:hover{transform:scale(1.02)}.button[disabled],button[disabled]{cursor:default;opacity:.5}.button:focus:enabled,.button:hover:enabled,button:focus:enabled,button:hover:enabled{background-color:#982c61;border-color:#982c61;color:#f9f9f9;outline:0}.red{color:#ff1717}.center{margin-left:auto;margin-right:auto;text-align:center}</style>
  </head>
  <body>
  <a style="position: fixed; right: 20px; top: 20px; text-decoration: none;"
  href="javascript: window.top.postMessage('plzremove', '*')">❌</a>
  <h1 class="red">Россия напала на Украину и ежедневно убивает мирных жителей</h1>

  <p><h2>Об этом не рассказывают российские сайты и телеканалы:</h2></p>
  <ul>
  <li><big>Российская армия разрушает жилые дома и <a href="https://rus.ozodi.org/a/31728241.html">расстреливает женщин и детей</a>.</big></li>
  <li><big>За первые дни войны <a href="https://ru.krymr.com/a/rossiya-ukraina-voyna-minoborony-rossii-poteri-ubitiye-rossiyskiye-soldaty/31726793.html">Россия потеряла</a> больше 4 000 солдат и сотни единиц техники, солдаты <a href="https://200rf.com">добровольно сдаются в плен</a>. </big></li>
  <li><big>Россия фактически отрезана от мировой финансовой системы, курс рубля стремительно <a href="https://www.bbc.com/russian/news-60531329">падает</a>.</big></li>
  <li><big>Ищите информацию в Telegram: <a href="https://t.me/nexta_live">NEXTA</a>, <a href="https://t.me/radiosvoboda">Радио Свобода</a>, <a href="https://t.me/meduzalive">Медуза</a>, <a href="https://t.me/mediazzzona">Медиазона</a>.</big></li>
  </ul>

  <p>
  <h2>Это не ваша война! Выходите в центр города и протестуйте, пока Путин не разрушил жизнь вашей семьи.</h2>
  </p>


  <p class="center">
  <a class="button" target="_blank" href="https://infowarship.com/"><big>Узнайте&nbspправду о&nbspвойне&nbspс&nbspУкраиной!</big></a>
  </p>
  <p class="center">
    <a class="button" target="_blank" href="https://t.me/infowarship"><big>Или&nbsp;в&nbsp;Телеграм</big></a>
  </p>
  <br/>
  <br/>
  <br/>

  <script>console.log("static popup")</script>
  </body>
  </html>
  `;

  var script = document.currentScript;
  var debug = (script && new URL(script.src).search.match(/\bdebug\b/)) || (window.location.search.match(/\binfowarship_debug\b/));
  var _unique = 0;
  function jsonp(url, callback) {
    var name = "_jsonp_" + _unique++;
    var sep = url.match(/\?/) ? '&' : '?';
    url = url + sep + 'callback=' + name;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    // callback
    window[name] = function(data) {
      callback.call(window, data);
      document.head.removeChild(script);
      script = null;
      delete window[name];
    };
    // Load JSON
    document.head.appendChild(script);
  }

  function popup() {
    var LOADED = false;
    var el = document.createElement('iframe');
    el.style = 'top: 0; left: 0; width: 100vw; height: 100vh; bottom: 0; right: 0; z-index: 20000; position: fixed';
    el.src = 'https://infowarship.com/popup.html';

    document.body.appendChild(el);
    window.addEventListener('message', function(e) {
      switch (e.data) {
      case 'plzremove': el.remove(); break;
      case 'imdone': LOADED = true; break;
      }
    });

    setTimeout(()=>{
      if (!LOADED) {
        el.srcdoc = POPUP;
      }
    }, 3000);
  }

  function getCountry(cb) {
    if (localStorage.country) {
      cb(localStorage.country);
    } else {
      jsonp('https://wcayf.piranha.workers.dev', function(data) {
        localStorage.country = data.country;
        cb(localStorage.country);
      });
    }
  }

  function main() {
    getCountry(function(country) {
      if (country == 'RU' || debug) {
        popup();
      }
    });
  };
  main();
})();
