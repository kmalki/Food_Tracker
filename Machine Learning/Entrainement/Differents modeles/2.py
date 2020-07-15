import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
import os
import sklearn.datasets
import sklearn.model_selection
import tensorflow.keras.preprocessing.image
from tensorflow.keras.utils import *
import matplotlib.pyplot as plt
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from skimage import color
from sklearn.metrics import accuracy_score
import tensorflow.keras.callbacks
import os
import numpy as np
import cv2

train_dir = 'Training'
trainData = sklearn.datasets.load_files(train_dir, load_content=False)

test_dir = 'Test'
testData = sklearn.datasets.load_files(test_dir, load_content=False)

y_train = np.array(trainData['target'])
y_train_names = np.array(trainData['target_names'])

y_test = np.array(testData['target'])
y_test_names = np.array(testData['target_names'])

nclasses = len(np.unique(y_train))
target_size = 50

x_train = []
for filename in trainData['filenames']:
    x_train.append(
        tensorflow.keras.preprocessing.image.img_to_array(
            tensorflow.keras.preprocessing.image.load_img(filename, target_size=(target_size, target_size))
        )
    )

x_test = []
for filename in testData['filenames']:
    x_test.append(
        tensorflow.keras.preprocessing.image.img_to_array(
            tensorflow.keras.preprocessing.image.load_img(filename, target_size=(target_size, target_size))
        )
    )

x_train = np.array(x_train)
x_train = x_train / 255
y_train = to_categorical(y_train, nclasses)

x_test = np.array(x_test)
x_test = x_test / 255
y_test = to_categorical(y_test, nclasses)

x_train, x_val, y_train, y_val = sklearn.model_selection.train_test_split(
        x_train, y_train, test_size=0.2
)
print(y_train.shape)
print(y_val.shape)

images = tensorflow.keras.layers.Input(x_train.shape[1:])


x = tensorflow.keras.layers.Conv2D(filters=16, kernel_size=[1, 1], padding='same')(images)
block = tensorflow.keras.layers.Conv2D(filters=16, kernel_size=[3, 3], padding="same")(x)
block = tensorflow.keras.layers.BatchNormalization()(block)
block = tensorflow.keras.layers.Activation("relu")(block)
block = tensorflow.keras.layers.Conv2D(filters=16, kernel_size=[3, 3], padding="same")(block)
net = tensorflow.keras.layers.add([x,block])
net = tensorflow.keras.layers.BatchNormalization()(net)
net = tensorflow.keras.layers.Activation("relu")(net)
net = tensorflow.keras.layers.MaxPooling2D(pool_size=(2, 2),name="block_1")(net)

x = tensorflow.keras.layers.Conv2D(filters=32, kernel_size=[1, 1], padding='same')(net)
block = tensorflow.keras.layers.Conv2D(filters=32, kernel_size=[3, 3], padding="same")(x)
block = tensorflow.keras.layers.BatchNormalization()(block)
block = tensorflow.keras.layers.Activation("relu")(block)
block = tensorflow.keras.layers.Conv2D(filters=32, kernel_size=[3, 3], padding="same")(block)
net = tensorflow.keras.layers.add([x,block])
net = tensorflow.keras.layers.BatchNormalization()(net)
net = tensorflow.keras.layers.Activation("relu")(net)
net = tensorflow.keras.layers.MaxPooling2D(pool_size=(2, 2),name="block_2")(net)

x = tensorflow.keras.layers.Conv2D(filters=64, kernel_size=[1, 1], padding='same')(net)
block = tensorflow.keras.layers.Conv2D(filters=64, kernel_size=[3, 3], padding="same")(x)
block = tensorflow.keras.layers.BatchNormalization()(block)
block = tensorflow.keras.layers.Activation("relu")(block)
block = tensorflow.keras.layers.Conv2D(filters=64, kernel_size=[3, 3], padding="same")(block)
net = tensorflow.keras.layers.add([x,block])
net = tensorflow.keras.layers.Activation("relu", name="block_3")(net)



net = tensorflow.keras.layers.BatchNormalization()(net)
net = tensorflow.keras.layers.Dropout(0.25)(net)

net = tensorflow.keras.layers.GlobalAveragePooling2D()(net)
net = tensorflow.keras.layers.Dense(units=nclasses,activation="softmax")(net)

model = tensorflow.keras.models.Model(inputs=images,outputs=net)


model.summary()

from IPython.display import SVG
import IPython
from tensorflow.keras.utils import model_to_dot

print(model.summary())

tensorflow.keras.utils.plot_model(model, to_file='2-600.png', show_shapes=True)
IPython.display.Image('test_keras_plot_model.png')

model.compile(loss='categorical_crossentropy',
              optimizer='adadelta',
              metrics=['accuracy'])
checkpointer = tensorflow.keras.callbacks.ModelCheckpoint(filepath = 'modele3.hdf5', verbose = 1, save_best_only = True)
earlystopper = tensorflow.keras.callbacks.EarlyStopping(monitor='val_loss', min_delta=0, patience=5, verbose=0, mode='auto', baseline=None, restore_best_weights=False)

history = model.fit(x_train, y_train, batch_size=64, epochs=635,validation_data=(x_val, y_val), callbacks = [checkpointer,earlystopper], shuffle=True)



model.load_weights('modele3.hdf5')

def save_model(model, name):
    # serialize model to JSON
    model_json = model.to_json()
    with open("{}.json".format(name), "w") as json_file:
        json_file.write(model_json)
    # serialize weights to HDF5
    model.save_weights("{}.h5".format(name))
    print("Saved model to disk")

save_model(model, "modele3")
