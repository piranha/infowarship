export async function onRequest(ctx) {
  var country = ctx.request.cf.country;
  return new Response('Hello ' + country + '!');
}
