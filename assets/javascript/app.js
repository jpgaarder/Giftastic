//inputs to be turned into buttons for GIPHY API
var topics = ["fresh prince", "fail", "robot", "matrix", "party"];

var still
var animated
var results

var modal = document.getElementById('myModal');
var help = document.getElementById("help");
var span = document.getElementsByClassName("close")[0];

// open modal on click
help.onclick = function() {
    modal.style.display = "block";
}

// close modal
span.onclick = function() {
    modal.style.display = "none";
}

// close modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


//Dumps JSON content for each button into word-gif div
function displayWordGifs() {
	temp = $(this).data("name");
	
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + temp + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({ url: queryURL, method: "GET" }).done(function(response) {
          //(below) we can use results as a shortcut to reference response.data
          results = response.data;

          //empty the gifs-view div so that when button is clicked, the new gifs appear/append
           $("#gifs-view").empty();

          //loop through results; response.data is an array
         
          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");
            var rating = results[i].rating;
            var p = $("<p class='rating'>").text("RATED: " + rating);
            var wordGif = $("<img class='gif'>");
            //building source from results pulled from giphy
           	$(wordGif).attr({
           		src: results[i].images.fixed_height_still.url,
           		"data-behavior": "still",
              "data-animated": results[i].images.fixed_height.url,
              "data-still": results[i].images.fixed_height_still.url})



            //add gif and paragraph before other gifs 
            gifDiv.append(p);
            gifDiv.append(wordGif);
            $("#gifs-view").append(gifDiv);
        }
	});
}

$(document).on("click", ".gif", function() {

  var state = $(this).attr("data-behavior");

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animated"));
    state = $(this).attr("data-behavior", "animated");
            		
  } else if (state === "animated") {
    $(this).attr("src", $(this).attr("data-still"));
    state = $(this).attr("data-behavior", "still")
    } else {};
});

//create buttons in HTML
function renderButtons() {

	// Deletes the buttons prior to adding new ones 
	$("#buttons-list").empty();

	// Looping through the array of words(topics)
	for (var i = 0; i < topics.length; i++) {

					// Then dynamicaly generating buttons for each word in the array
					// This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
		var a = $("<button>");
					// Adding a class of word to our button
		a.addClass("word");
					// Adding a data-attribute
		a.attr("data-name", topics[i]);
					// Providing the initial button text
		a.text(topics[i]);
					// Adding the button to the buttons-list div
		$("#buttons-list").append(a);
	}
}

			// This function handles events where one button is clicked
			$("#add-word").on("click", function(event) {
				event.preventDefault();

				// This line grabs the input from the textbox
				var word = $("#word-input").val().trim();

				// The word from the textbox is then added to our array
				topics.push(word);

				word = $("#word-input").val('');

				// Calling renderButtons which handles the processing of word array
				renderButtons();

			});


//when clicking on word button, runs displaywordGifs function to print on page
$(document).on("click", ".word", displayWordGifs);

//calling renderButtons to display initial buttons
renderButtons();