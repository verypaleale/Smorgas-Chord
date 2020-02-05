var songArr = [];
var songName;
var buttonDIV;
var titleDiv;
var artistDiv;
var lyrics; 
var queryLyricsARR= [];
var queryLYR;
var replaceSpace;
var showLyrics1;

$(document).on("click", ".happiButtons", lyricsClick);
$(document).on("click", ".YEEZY", kanyeTalks);

var retrievedData = localStorage.getItem("songArr");
if (retrievedData !=null) {
    var songArr2 = JSON.parse(retrievedData);
    if (songArr.length >= 0) {
        for (i = 0; i < songArr2.length; i++) {
            var ul = $("<ul>").attr("class", "listnone");
            var li = $("<li>");
            li.append(songArr2[i]);
            ul.append(li);
            $("#searchedList").append(ul);
        }
    }
}

// get lyrics and tabs from  search button
$("#search").click(function updateSongList() {
    $(".showLyricsDiv").text("");

    var currentSong = $("#input").val();
    songArr.push(currentSong);
    localStorage.setItem("songArr", JSON.stringify(songArr));
    var ul = $("<ul>").attr("class", "listnone");
    var li = $("<li>");
    li.append(currentSong);
    ul.append(li);

    replaceSpace = currentSong.replace(/\s/g, "%20"); 
    queryLyrics = "https://api.happi.dev/v1/music?q=" + replaceSpace + "&limit=&apikey=05580c9wJXOa2YrFZUJlxtMDKREEexMldmTAHlmwb7Uk62acRmtbkJIv&type="

    $.ajax({
        url: queryLyrics,
        method: "GET"
    }).then(function(response) {
            $("#songButtons").text("");
            var lyricsHeader = $("<h5>").text("Lyrics Options: ")
            $("#songButtons").append(lyricsHeader);

            for (i = 0; i < response.length; i++) {
                buttonDIV = $("<div>").attr("class", "happiButtons");
                titleDiv = $("<div>").text("Title: " + response.result[i].track);
                artistDiv = $("<div>").text("Artist: " + response.result[i].artist);
                lyrics = response.result[i].api_lyrics + "?&apikey=05580c9wJXOa2YrFZUJlxtMDKREEexMldmTAHlmwb7Uk62acRmtbkJIv";
                buttonDIV.val(lyrics);
                $(buttonDIV).append(titleDiv);
                $(buttonDIV).append(artistDiv);
                $("#songButtons").append(buttonDIV);
          
                queryLYR = lyrics;                
            }
    })

        var queryTabs = "https://www.songsterr.com/a/ra/songs.json?pattern=" + replaceSpace;

        $.ajax({
            url: queryTabs,
            method: "GET"
            }).then(function(response) {
                $("#tabList").text("");
                var tabsInfoHeader = $("<h5>").text("Tab Options: ")
                $("#tabList").append(tabsInfoHeader);

                for (i = 0; i < response.length; i++) {
                    var tabButtons = $("<div>").attr("class", "songsterButtons");
                    var titleDiv = $("<li>").text("Title: " + response[i].title);
                    var artistDiv = $("<li>").text("Artist: " + response[i].artist.name);
                    var queryURL = "https://www.songsterr.com/a/wa/song?id=" + response[i].id;
                    var str = "Click me for tab info!";
                    var result = str.link(queryURL); 

                    $(tabButtons).append(titleDiv);
                    $(tabButtons).append(artistDiv);
                    $(tabButtons).append(result);
                    $("#tabList").append(tabButtons);
                }
            })
    $("#songButtons").prepend(ul);
    localStorage.getItem("songArr", songArr);
})

function lyricsClick() {
    queryLYR = $(this).val();

    $.ajax({
        url: queryLYR,
        method: "GET"
    }).then(function(response) {
        if (response.success === true) {
            $(".showLyricsDiv").text("");
            var showLyrics = response.result.lyrics;
            $(".showLyricsDiv").append(showLyrics);
        } else {
            var btn = document.getElementById("myBtn");
            var span = document.getElementsByClassName("close")[0];
            btn.onclick = function() {
                modal.style.display = "block";
            }
            span.onclick = function () {
                modal.style.display = "none";
            }
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
            alert("Sorry, there are no lyrics on file for that option.")
        }
    })
}


// get lyrics and tabs from list history
$(".listnone").click(function updateSongList() {
    $(".showLyricsDiv").text("");

    var currentSong = $(this).text();
    songArr.push(currentSong);
    localStorage.setItem("songArr", JSON.stringify(songArr));
    var ul = $("<ul>").attr("class", "listnone");
    var li = $("<li>");
    li.append(currentSong);

    replaceSpace = currentSong.replace(/\s/g, "%20"); 
    queryLyrics = "https://api.happi.dev/v1/music?q=" + replaceSpace + "&limit=&apikey=05580c9wJXOa2YrFZUJlxtMDKREEexMldmTAHlmwb7Uk62acRmtbkJIv&type="

    $.ajax({
        url: queryLyrics,
        method: "GET"
    }).then(function(response) {
        $("#songButtons").text("");
            var lyricsHeader = $("<h5>").text("Lyrics Options: ")
            $("#songButtons").append(lyricsHeader);

            for (i = 0; i < response.length; i++) {
                buttonDIV = $("<div>").attr("class", "happiButtons");
                titleDiv = $("<div>").text("Title: " + response.result[i].track);
                artistDiv = $("<div>").text("Artist: " + response.result[i].artist);
                lyrics = response.result[i].api_lyrics + "?&apikey=05580c9wJXOa2YrFZUJlxtMDKREEexMldmTAHlmwb7Uk62acRmtbkJIv";
                buttonDIV.val(lyrics);
                $(buttonDIV).append(titleDiv);
                $(buttonDIV).append(artistDiv);
                $("#songButtons").append(buttonDIV);

                queryLYR = lyrics;  
            }
    })

        var queryTabs = "https://www.songsterr.com/a/ra/songs.json?pattern=" + replaceSpace;

        $.ajax({
            url: queryTabs,
            method: "GET"
            }).then(function(response) {
                $("#tabList").text("");
                var tabsInfoHeader = $("<h5>").text("Tab Options: ")
                $("#tabList").append(tabsInfoHeader);

                for (i = 0; i < response.length; i++) {
                    var tabButtons = $("<div>").attr("class", "songsterButtons");
                    var titleDiv = $("<li>").text("Title: " + response[i].title);
                    var artistDiv = $("<li>").text("Artist: " + response[i].artist.name);
                    var queryURL = "https://www.songsterr.com/a/wa/song?id=" + response[i].id;
                    var str = "Click me for tab info!";
                    var result = str.link(queryURL); 


                    $(tabButtons).append(titleDiv);
                    $(tabButtons).append(artistDiv);
                    $(tabButtons).append(result);
                    $("#tabList").append(tabButtons);
                }
            })

    $("#songButtons").prepend(ul);
    localStorage.getItem("songArr", songArr);
})

// Kanye API Button
function kanyeTalks() {
    var kanyeURL = "https://api.kanye.rest/?format=text"
    $.ajax({
        url: kanyeURL,
        method: "GET"
    }).then(function(kanyeResponse) {
        console.log(kanyeResponse);
        $("yeezy-quote").text(kanyeResponse);
    })
}