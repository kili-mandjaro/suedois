var Word = function(crtrWordFr, crtrWordSw)
{
	this.wordFr = crtrWordFr;
	this.wordSw = crtrWordSw;
		
	this.setWordFr = function(newWordFr){this.wordFr = newWordFr;}
	this.setWordSw = function(newWordSw){this.wordSw = newWordSw;}
	this.getWordFr = function(){return this.wordFr;}
	this.getWordSw = function(){return this.wordSw;}
	this.checkFr = function(wordInput)
	{ 
		if(wordInput == this.wordFr)
			return true;
		else
			return false;
	}
	this.checkSw = function(wordInput)
	{
		if(wordInput == this.wordSw)
			return true;
		else
			return false;
	}
}

/*var Noun = function(crtrWordFr, crtrWordSw, crtrGender, crtrNumber, crtr)
{
	Word.call(this, crtrWordFr, crtrWordSw);
	
	var gender = crtrGender;
}*/


