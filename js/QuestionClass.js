var Question = function(newXmlFile, newQuestionType, newCategory)
{
	this.xmlFile = newXmlFile;
	this.xmlContent = null;
	this.questionType = newQuestionType;
	this.category = newCategory;
	this.words = new Array();
	this.nbQuestions = 0;
	this.remainingQuestions = new Array();
	this.currQuestion = 0;
	this.score = 0;
	

	this.loadXml = function()
	{
		if (window.XMLHttpRequest)
	  		var xmlhttp = new XMLHttpRequest();
		else
	    	var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	   
		xmlhttp.open("GET", this.xmlFile, false);
		xmlhttp.send();
		this.xmlContent = xmlhttp.responseXML; 
	}
	
	this.loadWords = function()
	{
		
		var xmlWords = this.xmlContent.querySelectorAll("words nouns " + this.category + " word");
		
		for(var i = 0; i < xmlWords.length; i++)
		{
			var wordFr = xmlWords[i].querySelector("fr").childNodes[0].nodeValue;
			var wordSw = xmlWords[i].querySelector("sw").childNodes[0].nodeValue;
			var newWord = new Word(wordFr, wordSw);
			this.words.push(newWord);
		}
		this.nbQuestions = xmlWords.length * 2;
		
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
