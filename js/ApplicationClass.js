var Application = function()
{	
	this.input = document.querySelector("#inputText");
	this.intitule = document.querySelector("#intitule");
	this.reponses = document.querySelector("#reponses");
	this.select = document.querySelector("#selection");
	this.arrayAnswers = new Array();
	this.arrayCheckBox = new Array();
	this.arrayCategories = new Array();
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
		//rechargement de la vue
		document.querySelector("#encadre #reload").style.display = "none";
		document.querySelector("#encadre #ok").style.display = "inline-block";
		document.querySelector("#encadre #text .info2").style.display = "block";
		document.querySelector("#encadre #text #selection").style.display = "block";
		document.querySelector("#encadre #text h2").innerHTML =  "Jag Revidar";
		document.querySelector("#encadre #text .info1").innerHTML = "Répondez à toutes les questions pour en savoir plus sur la ville en arrière plan.";
		document.querySelector("#encadre #text .info2").innerHTML = "Catégories de vocabulaire :";
		
		//chargement des catégories
		if(this.arrayCheckBox.length == 0)
		{
			this.question.loadTxt();
			var categories = this.question.loadCategories();
			
			for(var i = 0; i < categories.length; i++)
			{
				var checkBox = document.createElement("input");
				checkBox.type = "checkbox";
				checkBox.className = "check";
				checkBox.value = categories[i].toLowerCase().trim(); 
				checkBox.name = categories[i].toLowerCase().trim();
				var textNode = document.createTextNode(categories[i]);
				this.select.appendChild(checkBox);
				this.select.appendChild(textNode);
				this.select.appendChild(document.createElement("br"));
				this.arrayCheckBox.push(checkBox);
			}
		}
		else
		{
			this.arrayCategories = new Array();
		}
		
		this.docManager.loadXml();
		this.docManager.loadDocs();
		this.docManager.selectRandomDoc();
		var backImg = this.docManager.getSelectedDoc().getImg();
		//document.body.style.backgroundImage = "url("+ backImg +")";
	}
	
	this.launchGame = function()
	{
		//récupération des catégories
		for(var i = 0; i < this.arrayCheckBox.length; i++)
		{
			if(this.arrayCheckBox[i].checked)
				this.arrayCategories.push(this.arrayCheckBox[i].value);
		}
		
		if(this.arrayCategories.length > 0)
		{
			this.question.loadWords(this.arrayCategories);
			
			document.querySelector("#encadre #game").style.display = "block";
			document.querySelector("#encadre #text").style.display = "none";
			document.querySelector("#encadre #reponses").innerHTML = "";
			this.arrayAnswers = new Array();
			document.querySelector("#encadre #reload").style.display = "none";
			this.displayBars();
			this.newQuestion();
		}
		else
			alert("Veuillez sélectionner une catégorie");
	}
	
	this.launchDoc = function(score)
	{
		document.querySelector("#encadre #game").style.display = "none";
		document.querySelector("#encadre #text").style.display = "block";
		document.querySelector("#encadre #reload").style.display = "inline-block";
		document.querySelector("#encadre #ok").style.display = "none";
		document.querySelector("#encadre #text .info2").style.display = "none";
		document.querySelector("#encadre #text #selection").style.display = "none";
		document.querySelector("#encadre #text h2").innerHTML =  this.docManager.getSelectedDoc().getTitle()
		document.querySelector("#encadre #text .info1").innerHTML = this.docManager.getSelectedDoc().getInfo()
		+ "<br/><a href=\"" + this. docManager.getSelectedDoc().getAlink()
		+ "\">" + this.docManager.getSelectedDoc().getAtext() + "</a>";
	}
	
	this.displayBars = function()
	{
		var widthBars = Math.floor(this.question.nbRemainingQuestions() / this.question.getNbQuestions() * 800);
		document.querySelector("#avancement").style.width = (800 - widthBars).toString() + "px";
	}
}