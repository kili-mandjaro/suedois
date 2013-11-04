var Question = function(newSrcFile, newQuestionType, newCategory)
{
	this.srcFile = newSrcFile;
	this.txtContent = null;
	this.questionType = newQuestionType;
	this.category = newCategory;
	this.words = new Array();
	this.nbQuestions = 0;
	this.remainingQuestions = new Array();
	this.currQuestion = 0;
	this.score = 0;
	

	this.loadTxt = function()
	{
		if (window.XMLHttpRequest)
	  		var xmlhttp = new XMLHttpRequest();
		else
	    	var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	   
		xmlhttp.open("GET", this.srcFile, false);
		xmlhttp.overrideMimeType("text/plain; charset=utf-8");
		xmlhttp.send();
		this.txtContent = xmlhttp.responseText; 
	}
	
	this.loadWords = function()
	{
		var line = this.txtContent.split('\n');
		var lineCounter = 0;
		
		for(var i = 0; i < line.length; i++)
		{
			if(line[i].indexOf("//") == -1 && line[i].indexOf(":") != -1)
			{
				var wordFr = line[i].split(':')[0];
				var wordSw = line[i].split(':')[1];
				var newWord = new Word(wordFr, wordSw);
				this.words.push(newWord);
				lineCounter++;
			}
		}
		this.nbQuestions = lineCounter * 2;
		
		for(var i = 0; i < this.nbQuestions; i++)
			this.remainingQuestions.push(i);
	}

	this.chooseQuestion = function()
	{
		var randomNumber = Math.random(); 
		var r = Math.floor(randomNumber * this.remainingQuestions.length);
		var value = this.remainingQuestions[r];
		this.remainingQuestions.splice(r, 1);
		return value;
	}
	
	this.generateQuestion = function()
	{
		this.currQuestion = this.chooseQuestion();
		if(this.currQuestion < this.nbQuestions / 2)
			return "Traduisez \"" + this.words[this.currQuestion].getWordFr() + "\" en suédois :";
		else
			return "Traduisez \"" + this.words[this.currQuestion - this.nbQuestions/2].getWordSw() + "\" en français :";
	}
	
	this.check = function(wordInput)
	{
		if(this.currQuestion < this.nbQuestions / 2)
			return this.words[this.currQuestion].checkSw(wordInput);
		else
			return this.words[this.currQuestion - this.nbQuestions/2].checkFr(wordInput);
	}
	
	this.correctAnswer = function()
	{
		if(this.currQuestion < this.nbQuestions / 2)
			return this.words[this.currQuestion].getWordSw();
		else
			return this.words[this.currQuestion - this.nbQuestions/2].getWordFr();
	}
	
	this.getScore = function()
	{
		return Math.floor(this.score/this.nbQuestions*100);
	}
	
	this.incrementScore = function()
	{
		this.score++;
	}
	
	this.nbRemainingQuestions = function()
	{
		return this.remainingQuestions.length;
	}
	
	this.getNbQuestions = function()
	{
		return this.nbQuestions;
	}
}
