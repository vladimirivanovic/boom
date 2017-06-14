var builder = require('botbuilder');
var restify = require('restify');

var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
bot.dialog('/', [
function(session) {
    builder.Prompts.text(session, 'what is your name?');
},
function(session, results) {
    session.send('hello, ' + results.response);
}
]);
var model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/c413b2ef-382c-45bd-8ff0-f76d60e2a821?subscription-key=6d0966209c6e4f6b835ce34492f3e6d9';
bot.recognizer(new builder.LuisRecognizer(model));
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 9000, function(){
console.log('%s listening to %s', server.name, server.url);
});
server.post('/api/messages', connector.listen);