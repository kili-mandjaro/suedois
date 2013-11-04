var Application = function()
{	
	this.input = document.querySelector("#inputText");
	this.intitule = document.querySelector("#intitule");
	this.reponses = document.querySelector("#reponses");
	this.arrayAnswers = new Array();
	this.question = new Question("/suedois/src/nouns.src", 's', "jobs");
	this.docManager = new DocManager("/suedois/src/doc.xml");

	//s : questions simples
	
	this.addChar = function(car)
	{
		this.input = document.querySelector("#inputText");
		this.input.value += car;
	}
	
	this.checkAnswer = function()
	{
		if(this.arrayAnswers.length == 5)
				this.arrayAnswers.pop();
		if(this.question.check(this.input.value))
		{
			this.arrayAnswers.unshift("✔ " + this.question.correctAnswer());
			this.question.incrementScore();
		}
		else
			this.arrayAnswers.unshift("❌ " + this.question.correctAnswer());
		
		this.reponses.innerHTML = "";
		
		for(var i = 0; i < this.arrayAnswers.length; i++)
			this.reponses.innerHTML += (this.arrayAnswers[i] + "<br/>");
	}
	
	this.newQuestion = function()
	{
		this.intitule.innerHTML = this.question.generateQuestion();
		this.input.value = "";
		this.input.focus();
	}
	
	this.nextAction = function()
	{
		if(this.question.nbRemainingQuestions() > 0)
		{
			this.checkAnswer();
			this.displayBars();
			this.newQuestion();
		}
		else
		{
			this.displayBars();
			this.launchDoc(this.question.getScore());
		}
		
	}
	
	this.start = function()
	{
		this.question.loadTxt();
		this.question.loadWords();
		this.docManager.loadXml();
		this.docManager.loadDocs();
		this.docManager.selectRandomDoc();
		var backImg = this.docManager.getSelectedDoc().getImg();
		document.body.style.backgroundImage = "url("+ backImg +")";
	}
	
	this.launchGame = function()
	{
		document.querySelector("#encadre #game").style.display = "block";
		document.querySelector("#encadre #text").style.display = "none";
		document.querySelector("#encadre #reponses").innerHTML = "";
		this.arrayAnswers = new Array();
		document.querySelector("#encadre #reload").style.display = "none";
		this.displayBars();
		this.newQuestion();
	}
	
	this.launchDoc = function(score)
	{
		document.querySelector("#encadre #game").style.display = "none";
		document.querySelector("#encadre #text").style.display = "block";
		document.querySelector("#encadre #reload").style.display = "inline-block";
		document.querySelector("#encadre #ok").style.display = "none";
		document.querySelector("#encadre #text h2").innerHTML =  this.docManager.getSelectedDoc().getTitle()
		document.querySelector("#encadre #text #info").innerHTML = this.docManager.getSelectedDoc().getInfo()
		+ "<br/><a href=\"" + this. docManager.getSelectedDoc().getAlink()
		+ "\">" + this.docManager.getSelectedDoc().getAtext() + "</a>";
	}
	
	this.displayBars = function()
	{
		var widthBars = Math.floor(this.question.nbRemainingQuestions() / this.question.getNbQuestions() * 800);
		document.querySelector("#avancement").style.width = (800 - widthBars).toString() + "px";
	}
}