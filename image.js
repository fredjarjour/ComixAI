const fs = require('fs');

fs.readFile("backend/test.png", (err, imageData) => {
    if (err) throw err;

    // Create a new document with the image data
    const image = { data: imageData };
    console.log(image);
});