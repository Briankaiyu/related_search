//TO ENABLE SEARCHING ON SAME TAB WITHOUT OPENING NEW TAB
//----Uncomment navigate function
//----Uncomment navigate function call under chrome.tabs.create.....
//----Comment out the line that says chrome.tabs.create....

//Changelog 2.0:




//navigate function makes the tab load the requested url 
//function no longer used as of v1.5
/*
function navigate(url){
	//for the tab that is active in the current window
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		//pass url and load that url
		chrome.tabs.update(tabs[0].id,{url:url});
	});
}
*/


//hold the returned title of the tab
var title;
//hold default option 
var defaultOption="web";


//when button is clicked (a browser action), do something
chrome.browserAction.onClicked.addListener(function(tab){
	//get the current selcted tab
	chrome.tabs.getSelected(null,function(tab){
		//set tab equal to tab title
		title=tab.title;
		//A lot of websites like to include their name in the title
		//Great for advertising, bad for searching related topics.
		//It skews results towards the website.
		//So to counter that skew, we filter out the website name.
		//We do this by pulling a little trick:
		//If we see a ".", chances are the website name soon follows.
		//After all, websites tend to stick with catchy names that are
		//easy to remember and type in.
		//So starting from the first "." to the second "." we pull that
		//string
		//But first, we need the current url:
		//call chrome.tabs.query, make sure it's current tab in active window:
		//then save in var source
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
			//since we check active and currentWindow, tabs array should only be size 1
			var tab=tabs[0];
			//copy string over to source
			var source=tab.url;
	
			//we need to keep track of how many "." we hit.
			var hits=0;
			//prepare name string (array)
			var name=new String();//declared as string because toUpperCase() was giving odd error
			//go through source
			for(var i=0; i<source.length; i++)
			{
				//if there is one hit
				if(hits===1){
					//this if is here to make sure we don't "overrun" and include the second "." in title
					if(source[i]!="."){
						name+=source[i];
					}		
				}
				//if we find a "."
				if(source[i]==="."){
					hits++;//increment hits
				}
			}
			//so now we hav name holding what we're guessing is the 
			//website name.
			//now we could search through the array and do some complicated
			//string games, or we could set both to uppercase and replace.
			//some sites and website names have different cases (cnn.com vs CNN.com for example)
			//this allows us to catch multiple cases
			name=name.toUpperCase();
			title=title.toUpperCase();
			
			//try to remove the .com/.org/.edu that might be in title
			var temp_name=name+".COM";
			new_title=title.replace(temp_name,'');

			//rest must update new_title, so replace from new_title
			temp_name=name+".ORG";
			new_title=new_title.replace(temp_name,'');

			temp_name=name+".EDU";

			new_title=new_title.replace(temp_name,'');
			
			new_title=new_title.replace(name,'');
		
			
			//var choice=localStorage["option"];
			//var choice=document.getElementById('option'.value)
			
			chrome.storage.sync.get({
				chosenOption:'web'
			},function(item){
				//set the option to display the current choice
				//document.getElementById('option').value=item.chosenOption;
				var choice=item.chosenOption;
				if(choice=="images"){
					var related="http://www.google.com/images?q=";
				}
				else if (choice=="video"){
					var related="http://www.google.com/videohp?q=";
				}
				else{
					//again, default to web
					var related="https://www.google.com/search?q=";
					//var related="https://www.google.com/images?q=";
				}
				
				related+=new_title;
				//open new tab and search!\
				//if we wanted to reload current tab we could use navigate function
				//however, I chose to open a new tab instead for user convenience
				//this way they an go back and reference previous site more easily (simply switch tabs)
				chrome.tabs.create({url: related});
		//		navigate("https://www.google.com/search?q="+new_title);
			});/*
			if(choice=="images"){
				var related="http://www.google.com/images?q=";
			}
			else if (choice=="video"){
				var related="http://www.google.com/videos?q=";
			}
			else{
				//again, default to web
				var related="https://www.google.com/search?q=";
				//var related="https://www.google.com/images?q=";
			}
			
			related+=new_title;
			//open new tab and search!\
			//if we wanted to reload current tab we could use navigate function
			//however, I chose to open a new tab instead for user convenience
			//this way they an go back and reference previous site more easily (simply switch tabs)
			chrome.tabs.create({url: related});
	//		navigate("https://www.google.com/search?q="+new_title);*/
			})//end of function
			
			
			
	})
	
	
	
	
})
