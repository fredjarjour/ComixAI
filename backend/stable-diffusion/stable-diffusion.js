const spawn = require("child_process").spawn;

async function stableDiffusion(prompt, img_base64="") {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python', img_base64 == "" ? [__dirname + "/main.py", prompt] : [__dirname + "/main.py", prompt, img_base64]);
        pythonProcess.stdout.on('data', (data) => {
            let imgStr = data.toString();
            
            if (imgStr.includes("result:NULL")) {
                reject("Image not found");
            } else if (imgStr.includes("result:")) {
                resolve(imgStr.split("result:")[1]);
            }
        });
        pythonProcess.stderr.on('data', (data) => {
            reject(data.toString());
        });
    });
}

module.exports = { stableDiffusion };