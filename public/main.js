
var sockect = io.connect("http://localhost:8081", { "forceNew": true});

sockect.on("message", function(data) {
    console.log(data);
});