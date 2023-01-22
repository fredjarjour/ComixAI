const { stableDiffusion } = require("./stable-diffusion/stable-diffusion");
const fs = require("fs");

stableDiffusion("The ten warriors, who vary in sizes and shapes, stand in a circle and argue heatedly. Comic style and no text.").then((res) => {
    fs.writeFileSync("test.png", res, "base64");
    console.log(res);
}).catch((err) => {
    console.log(err);
});