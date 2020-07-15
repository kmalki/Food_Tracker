import tensorflow as tf
from random import seed
import pandas as pd
import json
from tensorflow.keras.preprocessing import image
import csv
import os
import numpy as np
import utils

target_label = ['Apple Braeburn', 'Banana', 'Lemon', 'Onion White', 'Orange', 'Peach Flat', 'Pear Williams', 'Potato White', 'Strawberry']

model = utils.load_model("output_files/model_final/model_final")

img = image.load_img("z/pomme-de-terre.jpg", target_size=(100, 100))
img = np.expand_dims(img, axis=0)
result = model.predict(img)[0]
i = np.argmax(result)
print(i)
print(target_label[i])





