
function getRelatedArtists(artist, callback) {
    var url="http://developer.echonest.com/api/v4/artist/similar?api_key=ULDOJODV8BMO7VAR1%20&name="+artist;

    $.ajax(url)
    .done(function(response){
	callback(response.response.artists);
    });
}

getRelatedArtists("red hot chili peppers", function(artists){
    artists.forEach(function(artist){
	console.log(artist.name);
    });
});
