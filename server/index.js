var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var stringSimilarity = require('string-similarity');

var port = process.env.PORT || 2000;
const messages = [];
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(chatMessage){
    io.emit('chat message', chatMessage);
    handleMessage(chatMessage);
    if(chatMessage.botAnswer){
      chatMessage.message = chatMessage.botAnswer;
      io.emit('chat message', chatMessage);
    }

  });

  socket.on('typing', function(userName){
    io.emit('typing', userName);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});

function handleMessage(chatMessage){
  if(chatMessage.message.includes('?')){
    let question = findSimilarQuestion(chatMessage.message);
    if(question){
      let pair = messages.find(m=>m.question == question);
      chatMessage.botAnswer = pair.answer;
    }else{
      messages.push({question:chatMessage.message});
    }

  }else{
    if(chatMessage.repliedMessage){
      let question = findSimilarQuestion(chatMessage.repliedMessage.message);
      if(question){
        let pair = messages.find(m=>m.question == question);
        pair.answer = chatMessage.message;
      }else{

      }
    }
  }

}
function findSimilarQuestion(message) {
  let questions = messages.map(m=>m.question);
  if(questions.length == 0) return null;
  let matches = stringSimilarity.findBestMatch(message, questions);
  if(matches.bestMatch.rating > 0.7){
    return matches.bestMatch.target;
  }else{
    return null;
  }

}