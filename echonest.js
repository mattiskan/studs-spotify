function buildGraph(baseArtist) {

    getRelatedArtists(baseArtist, function(relatedArtists){
	var artistNodes = [];
	var edges = [];
	
	artistNodes.push( {id:0, label:baseArtist} );
	
	var id=1;
	relatedArtists.forEach(function(artist){
	    console.log(artist.name+id);
	    artistNodes.push({id: id, label:artist.name});
	    edges.push({from:0, to:id});

	    id++;
	});

	console.log(artistNodes);

	var container = document.getElementById('mygraph');
	var data = {
	    nodes: artistNodes,
	    edges: edges
	};
	var options = {};
	var graph = new vis.Graph(container, data, options);

	graph.on('click', function(e){
	    console.log(e);
	    playSong("avicii");
	});
    });
}

function getRelatedArtists(artist, callback) {
    var url="http://developer.echonest.com/api/v4/artist/similar?api_key=ULDOJODV8BMO7VAR1%20&name="+artist;

    $.get(url)
    .done(function(response){
	callback(response.response.artists);
    });
}

function playSong(artistName){
    var baseUrl="https://api.spotify.com/v1/"; 
    console.log(baseUrl+"artists/search?q="+artistName);
    $.get(baseUrl+"artists/search?q="+artistName).done(function (response) {
	console.log(response);
	var uri=response.items[0].uri;

	$("#player").html('  <iframe src="https://embed.spotify.com/?uri='+uri+'" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>');
    });
}


buildGraph("red hot chili peppers");
