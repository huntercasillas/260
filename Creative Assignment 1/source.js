function jokemachine() {
                var joketext = document.getElementById("joketext");
                var jokeURL = "https://icanhazdadjoke.com/slack";
                $.ajax({
                    type: "GET",
                    url: jokeURL,
                    success: function(data) {
                        var joke = data["attachments"][0]["text"];
                        joketext.textContent = joke;  
                    },
                    error: function(jqXHR, textStatus, error) {
                        joketext.textContent = "Error, could not get joke...";
                }
            });
        }