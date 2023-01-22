import io
import os
import sys

from PIL import Image
from stability_sdk import client
import stability_sdk.interfaces.gooseai.generation.generation_pb2 as generation
import base64
import time

# Host URL should not be prepended with "https" nor should it have a trailing slash.
os.environ['STABILITY_HOST'] = 'grpc.stability.ai:443'
os.environ['STABILITY_KEY'] = 'sk-jF8TZGPoniaXsa8cSBiau7q0DHcT1DUgVukGNkcKSw26Cyqq'

# Set up our connection to the API.
stability_api = client.StabilityInference(
    key=os.environ['STABILITY_KEY'], # API Key reference.
    verbose=True, # Print debug messages.
    engine="stable-diffusion-v1-5", # Set the engine to use for generation. For SD 2.0 use "stable-diffusion-v2-0".
    # Available engines: stable-diffusion-v1 stable-diffusion-v1-5 stable-diffusion-512-v2-0 stable-diffusion-768-v2-0 
    # stable-diffusion-512-v2-1 stable-diffusion-768-v2-1 stable-inpainting-v1-0 stable-inpainting-512-v2-0
)

if len(sys.argv) <= 2:
    prompt = sys.argv[1]

    answers = stability_api.generate(
        prompt=prompt,
        steps=30, # Amount of inference steps performed on image generation. Defaults to 30. 
        cfg_scale=8.0, # Influences how strongly your generation is guided to match your prompt.
                    # Setting this value higher increases the strength in which it tries to match your prompt.
                    # Defaults to 7.0 if not specified.
        width=512, # Generation width, defaults to 512 if not included.
        height=512, # Generation height, defaults to 512 if not included.
        guidance_preset=generation.GUIDANCE_PRESET_FAST_GREEN,
        sampler=generation.SAMPLER_K_DPMPP_2S_ANCESTRAL # Choose which sampler we want to denoise our generation with.
                                                    # Defaults to k_dpmpp_2m if not specified. Clip Guidance only supports ancestral samplers.
                                                    # (Available Samplers: ddim, plms, k_euler, k_euler_ancestral, k_heun, k_dpm_2, k_dpm_2_ancestral, k_dpmpp_2s_ancestral, k_lms, k_dpmpp_2m)
    )

    for resp in answers:
        for artifact in resp.artifacts:
            if artifact.type == generation.ARTIFACT_IMAGE:

                buff = io.BytesIO(artifact.binary)
                img_str = base64.b64encode(buff.getvalue()).decode()
                print("___________result:" + img_str)
                time.sleep(0.1)
                exit()
    print("___________result:NULL")
else:
    prompt = sys.argv[1]
    img_str = sys.argv[2]

    # Base 64 decode the image string.
    img_data = base64.b64decode(img_str)
    img = Image.open(io.BytesIO(img_data))

    answers = stability_api.generate(
        prompt=prompt,
        init_image=img, # Assign our previously generated img as our Initial Image for transformation.
        start_schedule=0.3, # Set the strength of our prompt in relation to our initial image.
        steps=30, # Amount of inference steps performed on image generation. Defaults to 30. 
        cfg_scale=8.0, # Influences how strongly your generation is guided to match your prompt.
                    # Setting this value higher increases the strength in which it tries to match your prompt.
                    # Defaults to 7.0 if not specified.
        width=512, # Generation width, defaults to 512 if not included.
        height=512, # Generation height, defaults to 512 if not included.
        guidance_preset=generation.GUIDANCE_PRESET_FAST_GREEN,
        sampler=generation.SAMPLER_K_DPMPP_2S_ANCESTRAL # Choose which sampler we want to denoise our generation with.
                                                    # Defaults to k_dpmpp_2m if not specified. Clip Guidance only supports ancestral samplers.
                                                    # (Available Samplers: ddim, plms, k_euler, k_euler_ancestral, k_heun, k_dpm_2, k_dpm_2_ancestral, k_dpmpp_2s_ancestral, k_lms, k_dpmpp_2m)
    )

    for resp in answers:
        for artifact in resp.artifacts:
            if artifact.type == generation.ARTIFACT_IMAGE:
                buff = io.BytesIO(artifact.binary)
                img_str = base64.b64encode(buff.getvalue())
                print("___________result:" + img_str)
                time.sleep(0.1)
                exit()
    print("___________result:NULL")

