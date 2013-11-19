function main()
{
	application = new Application();
	application.start();
	
	submitButton = document.querySelector("#submit");
	submitButton.onclick = function()
	{
		application.nextAction();
	}
	
	var addaring = document.querySelector("#aring");
	var addouml = document.querySelector("#ouml");
	var addauml = document.querySelector("#auml");
	var ok = document.querySelector("#ok");
	var reload = document.querySelector("#reload");
	addaring.onclick = function(){application.addChar("å");}
	addouml.onclick = function(){application.addChar("ö");}
	addauml.onclick = function(){application.addChar("ä");}
	ok.onclick = function(){application.launchGame();}
	reload.onclick = function()
	{
		application.start();
	}
}

document.onkeydown = function(event)
{
	      
  	if(navigator.appName === "Microsoft Internet Explorer")
   	var keycode = event.keyCode;
	else
	   var keycode = event.which;
	      
  	if(keycode == 13)
	  	application.nextAction();
}
