var Doc = function(newImg, newTitle, newInfo, newAlink, newAtext)
{
	this.img = newImg;
	this.title = newTitle;
	this.info = newInfo;
	this.alink = newAlink;
	this.atext = newAtext;
	
	this.getImg = function(){return this.img;}
	this.getTitle = function(){return this.title;}
	this.getInfo = function(){return this.info;}
	this.getAlink = function(){return this.alink;}
	this.getAtext = function(){return this.atext;}
}