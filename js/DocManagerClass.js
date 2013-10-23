var DocManager = function(newXmlFile)
{
	this.xmlFile = newXmlFile;
	this.xmlContent = null;
	this.docs = new Array();
	this.nbDocs = 0;
	this.currentDoc = 0;
	
	
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
	
	this.loadDocs = function()
	{
		
		var xmlDocs = this.xmlContent.querySelectorAll("docs doc");
		for(var i = 0; i < xmlDocs.length; i++)
		{
			var img = xmlDocs[i].querySelector("img").getAttribute("src");
			var title = xmlDocs[i].querySelector("title").childNodes[0].nodeValue;
			var info = xmlDocs[i].querySelector("info").childNodes[0].nodeValue;
			var alink = xmlDocs[i].querySelector("a").getAttribute("href");
			var atext = xmlDocs[i].querySelector("a").childNodes[0].nodeValue;
			var newDoc = new Doc(img, title, info, alink, atext);
			this.docs.push(newDoc);
		}
		this.nbDocs = this.docs.length;
	}
	
	this.selectRandomDoc = function()
	{
		var randomNumber = Math.random(); 
		this.currentDoc = Math.floor(randomNumber * this.nbDocs);
	}
	
	this.getSelectedDoc = function()
	{
		return this.docs[this.currentDoc];
	}
}