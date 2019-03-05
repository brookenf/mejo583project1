  // write to a file 
    var fs = require("fs");
    var characters10 = data.data;

    fs.writeFile("./charaters.json", JSON.stringify(characters10), (err) => {
        if (err) {
            console.error(err);
            return;
        };
        console.log("File has been created");
    });