var fs=require("fs");
var http = require('http');
var url = require("url");
var file='home.html';
var page;

fs.readFile(file,function(err,data){
  if(err) throw err;
  page=data.toString();
});

http.createServer(function (req,res) {
  
  var parsedURL = url.parse(req.url,true);
  var path = parsedURL.pathname;
  var datestr=decodeURIComponent(path).replace(/\s/gm,'');
  
  if(datestr==='/'){
    res.writeHead(200, {'Content-Type': 'html'});
    res.end(page);
  }
  else{
    datestr=datestr.substring(1);
    var date,unix,natural;
    
    if(datestr.search(/\D/)==-1){
      date = new Date(datestr*1000);
      unix = Date.parse(date);
      natural = date.toDateString();
    }
    else{
      date = new Date(datestr);
      unix = Date.parse(datestr);
      natural = date.toDateString();
    }
  
    var op={
    'unix':unix,
    'natural':natural
    };
    res.writeHead(200, {'Content-type':'application/json'});
    res.end(JSON.stringify(op));
  }
}).listen(process.env.PORT);