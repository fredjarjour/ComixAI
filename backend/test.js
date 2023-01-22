const { stableDiffusion } = require("./stable-diffusion/stable-diffusion");
const fs = require("fs");

stableDiffusion("A large dog running in the park, comic drawing style").then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err);
});