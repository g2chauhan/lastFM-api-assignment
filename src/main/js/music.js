var api_key = "752e80ac85ad85e7865a7d0b905af8b1";

var request1 = new XMLHttpRequest();
var request2 = new XMLHttpRequest();
var request3 = new XMLHttpRequest();

function showResult () {

    if (request1.readyState == 4)
	{
		var json = JSON.parse(request1.responseText);
        var str = JSON.stringify(json,undefined,2);
		
		var result1_1 = "<br/>"+"<strong>Artist Name:</strong> "+ json.artist.name+"<br/><br/>";
		
		var src = json.artist.image[3];
		var img = src["#text"];
		
		var result1_2 = "<center><img width= '100' height='100' title='image' src='"+img+"'/></center>"+"<br/><br/>";
		
		var result1_3 = "<strong>Biography:</strong><br/>"+json.artist.bio.summary+"<br/><br/><strong>Debut Place:</strong> "
		+json.artist.bio.placeformed+"<br/><br/><strong>Debut Year: </strong>"+json.artist.bio.yearformed+"<br/>";
		
        document.getElementById("output1").innerHTML = "<ul>"+result1_1+"</ul>"+"<ul>"+result1_2+"</ul>"+"<ul>"+result1_3+"</ul>";
	}
	
	if (request2.readyState == 4)
	
	{
        var json = JSON.parse(request2.responseText);
        var str = JSON.stringify(json,undefined,2);
		
		var albSrc;
		var albImg;
		var albumName = new Array();
		var i=0;
		while (i<10)
		{
					
			albSrc =  json.topalbums.album[i].image[2];
			albImg = albSrc["#text"];
			
			albumName[i] = "<li>"+json.topalbums.album[i].name+"<br/>"
							+"<a href='"+json.topalbums.album[i].url+"'>Album info</a>"+"<br/>"
							+"<img width= '100' height='100' title='image' src='"+albImg+"'/>"+"<br/><br/></li>";
			
							i++;
		}
		
		document.getElementById("output2").innerHTML = "<ul>"+albumName+"</ul>";		
    }
	
	if (request3.readyState == 4)
	
	{
        var json = JSON.parse(request3.responseText);
        var str = JSON.stringify(json,undefined,2);
    
		var eventsInfo = new Array();
		var j=0;
		while (j<10)
		{
			eventsInfo[j] = "<li><strong>"+json.events.event[j].title+"</strong>"+"<br/>"
							 + "Date: "+json.events.event[j].startDate+"<br/>"
							 + "Description: "+json.events.event[j].description+"<br/>"
							 +"<a href='"+json.events.event[j].url+"'>More information about the event</a>"+"<br/><br/></li>";
							j++;
		}
		document.getElementById("output3").innerHTML = "<ul>"+eventsInfo+"</ul>";
	}
}


function sendRequest() {
	
	var method1 = "artist.info";
	request1.onreadystatechange = showResult;
	var artist = document.getElementById("form-input").value;
    request1.open("GET","proxy.php?method="+method1+"&artist="+artist+"&api_key="+api_key+"&format=json",true);
    request1.withCredentials = "true";
    request1.send(null);
	

	var method2 = "artist.getTopAlbums";
	request2.onreadystatechange = showResult;
	var artist = document.getElementById("form-input").value;
	request2.open("GET","proxy.php?method="+method2+"&artist="+artist+"&api_key="+api_key+"&format=json",true);
	request2.withCredentials = "true";
	request2.send(null);

	
	var method3 = "artist.getEvents";
	request3.onreadystatechange = showResult;
	var artist = document.getElementById("form-input").value;
	request3.open("GET","proxy.php?method="+method3+"&artist="+artist+"&api_key="+api_key+"&format=json",true);
	request3.withCredentials = "true";
	request3.send(null);
	
}