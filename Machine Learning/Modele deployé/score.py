import os
import json
import pathlib
import time
import tensorflow as tf
from tensorflow.keras.models import model_from_json
from tensorflow.keras.preprocessing import image
import numpy as np


# Called when the deployed service starts

def init():
    global model
    global sas
    global target_label

    target_label = ['Apple Braeburn', 'Banana', 'Lemon', 'Onion White', 'Orange', 'Peach Flat', 'Pear Williams',
                    'Potato White', 'Strawberry']

    sas = "?sv=2019-10-10&ss=bfqt&srt=co&sp=rwdlacupx&se=2020-07-11T01:06:54Z&st=2020-07-10T17:06:54Z&spr=https" \
          "&sig=u3kv2xToy9UXC%2FxZRNZR3nninpx2Mwp9c6azkSWjTug%3D"

    # Get the path where the deployed model can be found.
    print(os.getenv('AZUREML_MODEL_DIR'))
    model_path = os.path.join(os.getenv('AZUREML_MODEL_DIR'), 'model/fruit')

    json_file = open('{}.json'.format(model_path), 'r')
    loaded_model_json = json_file.read()
    json_file.close()
    model = model_from_json(loaded_model_json, custom_objects={'tf': tf})
    # load weights into new model
    model.load_weights("{}.h5".format(model_path))


# Handle requests to the service
def run(data_raw):
    try:
        # Pick out the text property of the JSON request.
        # This expects a request in the form of {"text": "some text to score for sentiment"}
        url = json.loads(data_raw)['url']
        prediction = predict(url)
        # Return prediction
        return prediction
    except Exception as e:
        error = str(e)
        return error


# Predict sentiment using the model
def predict(url):
    data_dir = tf.keras.utils.get_file(origin=url + sas, fname=url.split('/')[len(url.split('/')) - 1])
    data_dir = pathlib.Path(data_dir)

    img = image.load_img(data_dir, target_size=(100, 100))
    img = np.expand_dims(img, axis=0)

    start_at = time.time()
    result = model.predict(img)[0]
    i = np.argmax(result)
    return {"label": target_label[i],
            "elapsed_time": time.time() - start_at}


