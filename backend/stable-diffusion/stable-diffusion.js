const spawn = require("child_process").spawn;

async function canExecute(command, args=[]) {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn(command, args);
        pythonProcess.on('error', (err) => {
            reject(false);
        });
        pythonProcess.on('exit', (code) => {
            resolve(code == 0);
        });
    });
}

async function stableDiffusion(prompt, img_base64="") {
    return new Promise(async (resolve, reject) => {
        // Check if python is installed
        let executable = "";
        if (await canExecute("python3", ["--version"])) {
            executable = "python3";
        } else if (await canExecute("python", ["--version"])) {
            executable = "python";
        }
        
        if (executable == "") reject("Python is not installed");

        const pythonProcess = spawn(executable, img_base64 == "" ? [__dirname + "/main.py", prompt] : [__dirname + "/main.py", prompt, img_base64]);
        pythonProcess.stdout.on('data', (data) => {
            let imgStr = data.toString();
            
            if (imgStr.includes("result:NULL")) {
                reject("Image is not found");
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