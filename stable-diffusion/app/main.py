from diffusers import StableDiffusionPipeline
import torch
from flask import Flask, request, Response, jsonify
from flask_cors import CORS
import base64
from io import BytesIO

app = Flask(__name__)
CORS(app)

# Import stable diffusion model
print("Loading model...")
model_id = "nitrosocke/Nitro-Diffusion"
pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16)
pipe = pipe.to("cuda" if torch.cuda.is_available() else "cpu") # GPU if available
print("Model loaded.")

@app.route('/status')
def status():
    return Response(status=200)

@app.route('/predict', methods=["POST"])
def predict():
    req = request.get_json(silent=True, force=True)

    image = pipe(req["prompt"]).images[0]

    # Convert image to base64
    buffered = BytesIO()
    image.save(buffered, format="JPEG")
    encoded = base64.b64encode(buffered.getvalue())

    # Return result
    return jsonify({
        "predictions": [encoded]
    })

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8080)