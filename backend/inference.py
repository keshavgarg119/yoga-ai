import tensorflow as tf
import numpy as np
from PIL import Image
import os
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "yoga_model_tf")
CLASS_NAMES = ["downdog", "goddess", "plank", "tree", "warrior2"]

try:
    model = tf.saved_model.load(MODEL_PATH)
except Exception as e:
    raise RuntimeError(f"Failed to load TensorFlow model from {MODEL_PATH}: {e}")

infer = model.signatures["serving_default"]

def predict_pose(image):
    img = Image.open(image).convert("RGB").resize((224,224))
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0).astype(np.float32)

    output = infer(tf.constant(img_array))
    prediction = list(output.values())[0].numpy()

    class_index = np.argmax(prediction)

    return CLASS_NAMES[class_index], float(np.max(prediction))
