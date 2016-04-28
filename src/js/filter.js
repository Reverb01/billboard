var agg_genres = ["all-genres", "rock", "alternative/indie", "electronic/dance", "soul", "classical/soundtrack", "pop", "hip-hop/rnb", "disco", "swing", "folk", "country", "jazz", "religious", "blues", "reggae"];

var genres = d3.select(".genres");
genres.selectAll("button")
.data(agg_genres)
.enter()
.append("button")
.attr("class", "ui-btn ui-btn-inline ui-btn-active")
.attr("id", function(d){return d;})
.text(function(d){return d;});

var metric_list = [
{"metric": "num_lines", "title": "Avg. Number of Lines", "description": "Shows the average number of lines in a song."},
{"metric": "sentiment", "title": "Avg. Sentiment", "description": ""},
{"metric": "f_k_grade", "title": "Avg. Flesch-Kincaid Grade", "description": ""},
{"metric": "num_syllables", "title": "Avg. # of Syllables", "description": ""},
{"metric": "difficult_words", "title": "Avg. # Difficult Words", "description": ""},
{"metric": "fog_index", "title": "Avg. Fog Index", "description": ""},
{"metric": "num_dupes", "title": "Avg. # Duplicate Lines", "description": ""},
{"metric": "flesch_index", "title": "Avg. Flesch Index", "description": ""},
{"metric": "num_words", "title": "Avg. # Words", "description": ""},
]

// <a onclick='animStart(); curParam = "sentiment"; updateGraph(data);'>Sentiment</a>


var metrics = d3.select("div#param-select");
metrics.selectAll("a")
.data(metric_list)
.enter()
.append("a")
.attr("id", function(d){return d['metric'];})
.attr("onclick", function(d){
    return 'animStart(); curParam = "' + d['metric'] + '"; updateGraph(data);';
})
.text(function(d){return d['title'];});

// Filter data according to year & genre
function filter(data, yearMin, yearMax, genres) {
    var years =  _.filter(data, function(item) {
        return item['year'] >= yearMin && item['year'] <= yearMax;
    });

    var allsongs = _.flatten(_.pluck(years, "songs"));
    if (typeof genres === 'undefined') {
        return allsongs;
    }
    else {
        var songs = _.filter(allsongs,function(song) {
            return _.intersection(song['tags'], genres).length > 0;
        });
        return songs;
    }
}

// Load data & visualize it
d3.json("data.json", function(error, json) {
    if (error) return console.warn(error);
    data = json;
    // graphTrend(json);
    // graphScatter(json);
    graphInit(json);
    // document.getElementById("stats").innerText += JSON.stringify(curAvgParam("num_dupes"));
});
