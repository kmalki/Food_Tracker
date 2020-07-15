import numpy as np
from tqdm import tqdm
import pandas as pd
import skimage
from skimage import io, transform
from IPython.display import Image, display
import os

import tensorflow.keras
from tensorflow.keras.models import Sequential, model_from_json
from tensorflow.keras.layers import Dense, Dropout, Flatten, Conv2D, MaxPooling2D, BatchNormalization
from tensorflow.keras.layers import LSTM, Input
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam

img_size = 100
train_dir = 'Training/'
test_dir = 'Test/'

def get_data(folder_path):
    imgs = []
    indices = []
    labels = []
    for idx, folder_name in enumerate(os.listdir(folder_path)[:35]):
        if not folder_name.startswith('.'):
            labels.append(folder_name)
            for file_name in tqdm(os.listdir(folder_path + folder_name)):
                if not file_name.startswith('.'):
                    img_file = io.imread(folder_path + folder_name + '/' + file_name)
                    if img_file is not None:
                        img_file = transform.resize(img_file, (img_size, img_size))
                        imgs.append(np.asarray(img_file))
                        indices.append(idx)
    imgs = np.asarray(imgs)
    indices = np.asarray(indices)
    labels = np.asarray(labels)
    return imgs, indices, labels

X_train, y_train, train_labels = get_data(train_dir)
X_test, y_test, test_labels = get_data(test_dir)

num_categories = len(np.unique(y_train))

new_X_train = X_train.reshape(X_train.shape[0], X_train.shape[1], X_train.shape[2], X_train.shape[3]).astype('float32')
new_X_test = X_test.reshape(X_test.shape[0], X_test.shape[1], X_test.shape[2], X_test.shape[3]).astype('float32')
new_y_train = tensorflow.keras.utils.to_categorical(y_train, num_categories)
new_y_test = tensorflow.keras.utils.to_categorical(y_test, num_categories)

def evaluate_model(model, batch_size, epochs):
    history = model.fit(new_X_train, new_y_train, batch_size=batch_size, epochs=epochs, verbose=1, validation_data=(new_X_test, new_y_test))
    score = model.evaluate(new_X_test, new_y_test, verbose=0)
    print('***Metrics Names***', model.metrics_names)
    print('***Metrics Values***', score)

convolutional = Sequential()

convolutional.add(Conv2D(32, kernel_size=(3,3), activation='relu', input_shape=(X_train.shape[1], X_train.shape[2], X_train.shape[3],)))
convolutional.add(Conv2D(64, (3, 3), activation='relu'))
convolutional.add(MaxPooling2D(pool_size=(2, 2)))
convolutional.add(Dropout(0.35))

convolutional.add(Conv2D(128, kernel_size=(3,3), activation='relu'))
convolutional.add(Conv2D(256, (3, 3), activation='relu'))
convolutional.add(MaxPooling2D(pool_size=(2, 2)))
convolutional.add(Dropout(0.35))

convolutional.add(Flatten())
convolutional.add(Dense(512, activation='relu'))
convolutional.add(Dropout(0.6))
convolutional.add(BatchNormalization())
convolutional.add(Dense(num_categories, activation='softmax'))

convolutional.summary()
convolutional.compile(loss="categorical_crossentropy", optimizer=Adam(lr=.0005), metrics=['accuracy'])

evaluate_model(convolutional, 32, 5)

def save_model(model, name):
    # serialize model to JSON
    model_json = model.to_json()
    with open("{}.json".format(name), "w") as json_file:
        json_file.write(model_json)
    # serialize weights to HDF5
    model.save_weights("{}.h5".format(name))
    print("Saved model to disk")

save_model(convolutional, "modele6")