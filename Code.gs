var Nlp = function(text){
  text = text.replace(/\s+/g,' ').trim().toLowerCase().replace(/[^a-z ]/g,'');
  this.words = text.split(' ');
  this.removeStopword();
}

Nlp.prototype.removeStopword=function(){
  var newWords = [];
  for(var i =0; i< this.words.length; i++){
    var word = this.words[i];
    if(StopWord.indexOf(word)===-1){
      newWords.push(word);
    }
  }
  this.words = newWords; 
}

function myFunction() {
  //Logger.log(stopwords[5]);
  var test = new Nlp('Ini adalah   saya, mau memakan.?/ ');
  Logger.log(JSON.stringify(test.words));
}
