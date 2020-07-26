var Nlp = function(text){
  text = text.replace(/\s+/g,' ').trim().toLowerCase().replace(/[^a-z ]/g,'');
  this.words = [];
  this.textToWord(text.split(' '));
  this.removeStopword();
  this.rootWord();
  this.stem();
}

Nlp.prototype.textToWord=function(words){
  words.forEach(function(v, i){
    this.words.push({o:v,b:v});
  }, this)
}

Nlp.prototype.removeStopword=function(){
  this.words.forEach(function(v, i){
    if(StopWord.indexOf(v.o)>-1){
      this.words[i].t='s';
    };
  }, this);
}

Nlp.prototype.rootWord=function(){
  this.words.forEach(function(v,i){
    if(!v.t){
      this.words[i].t = BasicWord.indexOf(v.o)>-1 ? 'r' : 'u';
    }
  }, this)
}

Nlp.prototype.passStem=function(word, pattern){
  var oriTxt = word;
  word = this.match(oriTxt, pattern[0]);
  if(BasicWord.indexOf(word)<0 && pattern[1]){
    word = this.match(word, pattern[1]);
    if(BasicWord.indexOf(word)<0 && pattern[2]){
      word = this.match(word, pattern[2])
      if(BasicWord.indexOf(word)<0 && pattern[3]){
        word = this.match(word, pattern[3]);
      }
    }
  }
  return word;      
}

Nlp.prototype.match=function(txt, pattern){
  var ori = txt;
  var p = '^';
  //memeeriksa awalan
  if(pattern[0] || pattern[0]==''){
    p += '('+pattern[0]+')';
  }
  //memeriksa sisipan
  if(pattern[1] || pattern[1]==''){
    p += '.*?('+pattern[1]+')';
  }
  //memeriksa akhiran
  if(pattern[2]  || pattern[2]==''){
    p += '.*?('+pattern[2]+')';
  }
  p += '$';
  
  //mencari pola
  var arr = txt.match(new RegExp(p));
  if(arr){
    //menghapus sisipan
    if(arr[2]){
      txt = txt.substr(0, txt.indexOf(arr[2]))+txt.substr(txt.indexOf(arr[2])+arr[2].length, txt.length-txt.indexOf(arr[2])-arr[2].length);
    }
    //menghapus akhiran
    if(arr[3]){
      txt = txt.substr(0, txt.length-arr[3].length);
    }
    var repl = "";
    if(pattern[3]){
      var replacement = pattern[3].split('|');
      var need = pattern[0].split('|');
      if(replacement[need.indexOf(arr[1])]){
        repl = replacement[need.indexOf(arr[1])];
      }
    }
    //menghapus awalan
    if(arr[1]){  
      txt = repl+txt.substr(arr[1].length, txt.length-arr[1].length);      
    }
  }
  return txt;
}

Nlp.prototype.stem=function(){
  this.words.forEach(function(v, i){
    Pattern.forEach(function(w, j){
      if(v.t==='u'){
        var word = this.passStem(v.o, w);
        this.words[i].b = word;
        if(BasicWord.indexOf(word)>-1){
          this.words[i].t = 'd';
          return false;
        }
      }
    }, this);
  }, this);
}

Nlp.prototype.fastLevenshtein = function(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  if (!s1.length || s1.indexOf(s2) >= 0) return s2.length;
  if (!s2.length || s2.indexOf(s1) >= 0) return s1.length;

  var s1l = s1.length;
  var s2l = s2.length;

  var curCol, nextCol, i, j, tmp, prevRow = [],
    str2char = [];

  // initialise previous row
  s2.split('').forEach(function(v, i){
    prevRow.push(i);
    str2char.push(v);
    
  })
  prevRow[s2l] = s2l;
  s1.split('').forEach(function(v, i){

    nextCol = i + 1;
    s2.split('').forEach(function(w, j){
      curCol = nextCol;
      // substution
      nextCol = prevRow[j] + (str2char[j] && v === str2char[j] ? 0 : 1);
      // insertion
      if(nextCol > curCol + 1){
          nextCol = curCol +1;
      }
      // deletion
      if(nextCol > prevRow[j+1] + 1){
        nextCol = prevRow[j+1] + 1;
      }
      // copy current col value into previous (in preparation for next iteration)
      prevRow[j] = curCol;
    })

    // copy last col value into previous (in preparation for next iteration)
    prevRow[j] = nextCol;
  
  })
  return nextCol;
}

Nlp.prototype.suggest = function(word) {
  if(BasicWord.indexOf(word)>=0){
    return word;
  }
  var wordCan = [];
  for(i=0; i < BasicWord.length; i++){
    if(Math.abs(BasicWord[i].length-word.length)==0){
      var distance = this.fastLevenshtein(word, BasicWord[i]);
      if(distance<=1){
        wordCan.push(BasicWord[i]);
      }
      if(wordCan.length>=2){
        break;
      }
    }
  }
  return wordCan
}

function myFunction() {
  var sample = 'pelarian perssmaan pertemuan perkumpulan bertemu memakan makan mempertemukan memperbarui makron buku menyelisihi mengelabui memakan mengesampingkan  diperbarui mempekerjakan dalam pencarian pertemuan bersamaan hatikupun yang menyulitkan bagaimanapun juga itu adalah pencarian yang tersulit';
  var test = new Nlp(sample);
  Logger.log(JSON.stringify(test.words));  
}
