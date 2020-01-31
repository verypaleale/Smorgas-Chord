<<<<<<< HEAD
var songArr = [];
var songName;
var buttonDIV;
var titleDiv;
var artistDiv;
var lyrics; 
var queryLyricsARR= [];
var replaceSpace;

$(document).on("click", ".listnone", getLyrics);
$(document).on("click", ".happiButtons", lyricsClick);

// ---------------------------------------------------------------------------
// creating and updating search list
var retrievedData = localStorage.getItem("songArr");
if (retrievedData !=null) {
    var songArr2 = JSON.parse(retrievedData);
    if (songArr.length >= 0) {
        for (i = 0; i < songArr2.length; i++) {
            var ul = $("<ul>").attr("class", "listnone");
            var li = $("<li>");
            li.append(songArr2[i]);
            ul.append(li);
            $(".songList").append(ul);
        }
    }
}

$("#search").click(function updateSongListt() {
    var currentSong = $(".songInput").val();
    songArr.push(currentSong);
    localStorage.setItem("songArr", JSON.stringify(songArr));

    var ul = $("<ul>").attr("class", "listnone");
    var li = $("<li>");
    li.append(currentSong);
    ul.append(li);
    $(".songList").prepend(ul);
    localStorage.getItem("songArr", songArr);
})
// ----------------------------------------------------------------------------------

function getLyrics() {
    songName = $(this).text();
    replaceSpace = songName.replace(/\s/g, "%20"); 

    queryLyrics = "https://api.happi.dev/v1/music?q=" + replaceSpace + "&limit=&apikey=05580c9wJXOa2YrFZUJlxtMDKREEexMldmTAHlmwb7Uk62acRmtbkJIv&type="

    $.ajax({
        url: queryLyrics,
        method: "GET"
    }).then(function(response) {
            var lyricsHeader = $("<h5>").text("Lyrics Options: ")
            $(".musicInfoDiv").append(lyricsHeader);

            for (i = 0; i < response.length; i++) {
                buttonDIV = $("<button>").attr("class", "happiButtons");
                titleDiv = $("<div>").text("Title: " + response.result[i].track);
                artistDiv = $("<div>").text("Artist: " + response.result[i].artist);
                lyrics = response.result[i].api_lyrics + "?&apikey=05580c9wJXOa2YrFZUJlxtMDKREEexMldmTAHlmwb7Uk62acRmtbkJIv";
                buttonDIV.val(lyrics);
                queryLyricsARR.push(lyrics);
                console.log("array: " + queryLyricsARR)

                $(buttonDIV).append(titleDiv);
                $(buttonDIV).append(artistDiv);
                $(".musicInfoDiv").append(buttonDIV);
            }
    });

    var queryTabs = "https://www.songsterr.com/a/ra/songs.json?pattern=" + replaceSpace;

    $.ajax({
        url: queryTabs,
        method: "GET"
        }).then(function(response) {
        var tabsInfoHeader = $("<h5>").text("Tab Options: ")
        $(".tabsInfoDIv").append(tabsInfoHeader);
        
            for (i = 0; i < response.length; i++) {
                var tabButtons = $("<div>").attr("class", "songsterButtons");
                var titleDiv = $("<li>").text("Title: " + response[i].title);
                var artistDiv = $("<li>").text("Artist: " + response[i].artist.name);
                var queryURL = "https://www.songsterr.com/a/wa/song?id=" + response[i].id;
                var str = "Click me for tab info" + i;
                var result = str.link(queryURL); 

                $(tabButtons).append(titleDiv);
                $(tabButtons).append(artistDiv);
                $(tabButtons).append(result);  
                $(".tabsInfoDIv").append(tabButtons)
            }
        })
}

function lyricsClick() {
    var queryLYR = $(this).val();

    $.ajax({
        url: queryLYR,
        method: "GET"
    }).then(function(response) {
        if (response.success === true) {
            // $(".showLyricsDiv").val() = "";
            $(".showLyricsDiv").text = "";

            var showLyrics = response.result.lyrics;
            $(".showLyricsDiv").append(showLyrics);
        } else if (response.success === false) {
            alert("Sorry, there are no lyrics on file for that option.")
        }
    }).catch(function() {
        alert("This particular song doesn't have lyrics on file.");
    });
}
=======
$(document).ready(function() {
    $("button").click(function() {
        console.log("click");
        
    })
})
>>>>>>> 2789e7c1647d482d1b36795f2a3cf79f78ec5d26
