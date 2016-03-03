//saves options
function save_options(){
	//pulls ID (Set in html), then value, and saves to option
	var option=document.getElementById('option').value;
	//from chrome API, saving 	
	chrome.storage.sync.set({
		chosenOption: option
		},function(){
		//update and let user know options were saved	
		var status = document.getElementById('status');
		status.textContent= 'Options saved.';
		setTimeout(function(){
			status.textContent='';
		}, 750);
	});
}
//loads options by restoring from chrome.storage
//also restore select box state. If I had a checkbox, I could 
//restore that as well
function load(){
	//Default option 'web'
	chrome.storage.sync.get({
		chosenOption:'web'
	},function(item){
		//set the option to display the current choice
		document.getElementById('option').value=item.chosenOption;
	});
}


//when html file loaded, call load function
document.addEventListener('DOMContentLoaded',load);
//add a listener for if the save buttone is clicked
document.getElementById("save").addEventListener('click',save_options);


