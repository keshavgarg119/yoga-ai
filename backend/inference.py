import tensorflow as tf
import numpy as np
from PIL import Image

MODEL_PATH = "C:/Users/kesha/Desktop/Yoga/backend/yoga_model_tf"
CLASS_NAMES = ["downdog", "goddess", "plank", "tree", "warrior2"]

model = tf.saved_model.load(MODEL_PATH)

infer = model.signatures["serving_default"]

def predict_pose(image):
    img = Image.open(image).convert("RGB").resize((224,224))
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0).astype(np.float32)

    output = infer(tf.constant(img_array))
    prediction = list(output.values())[0].numpy()

    class_index = np.argmax(prediction)

    return CLASS_NAMES[class_index], float(np.max(prediction))
