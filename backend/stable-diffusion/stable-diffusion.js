const spawn = require("child_process").spawn;

async function stableDiffusion(prompt, img_base64="") {
    new Promise((resolve, reject) => {
        const pythonProcess = spawn('python', img_base64 == "" ? ["main.py", prompt] : ["main.py", prompt, img_base64]);
        pythonProcess.stdout.on('data', (data) => {
            let imgStr = data.toString();
            if (imgStr.includes("NULL")) {
                reject("Image not found");
            } else {
                resolve(data.toString());
            }
        });
    });
}

module.exports = { stableDiffusion };