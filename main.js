
var holidayContainer = document.getElementById("holiday-info");
var btn = document.getElementById("btn");
var monthText ="";
btn.addEventListener("click", function() {
	var e = document.getElementById("month");
	var month = e.options[e.selectedIndex].value;
	 monthText = e.options[e.selectedIndex].text;

	console.log(month + "a");
	console.log(monthText);
  var ourRequest = new XMLHttpRequest();
  ourRequest.open('GET', 'https://holidayapi.com/v1/holidays?key=385d1406-d96c-4c37-8417-36cd4453539d&country=US&year=2016&month=' + month);
  ourRequest.onload = function() {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
      var ourData = JSON.parse(ourRequest.responseText);
		  renderHTML(ourData);
			
    } else {
      console.log("We connected to the server, but it returned an error.");
    }
	};
	ourRequest.onerror = function() {
    console.log("Connection error");
  };

	 ourRequest.send();
});

	
function renderHTML(data) {
  var htmlString = "<h3>The following holidays are in the month of " + monthText +", 2016:</h3>";
	console.log( data.holidays);
  for (i = 0; i < data.holidays.length; i++) {
	
    htmlString += "<p>"+ data.holidays[i].name +" Falls on: " + data.holidays[i].date;
	  htmlString += " it is observed on: "+ data.holidays[i].observed + " and it is ";
		
			if (data.holidays[i].public == true){		
				htmlString += "a public holiday ";
			} else {
				htmlString += "not a public holiday ";
			}
    htmlString += '.</p>';

  }

 holidayContainer.insertAdjacentHTML('beforeend', htmlString);
}
	
	