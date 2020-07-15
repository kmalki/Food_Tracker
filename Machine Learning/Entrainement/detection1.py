import numpy as np
import cv2
import glob
import os
from tensorflow.keras.preprocessing import image
import tensorflow as tf
from tensorflow.keras.preprocessing import image
import numpy as np
from tensorflow.keras.preprocessing.image import array_to_img, img_to_array, load_img

training_fruit_img = []
training_label = []
for dir_path in glob.glob("Training/*"):
    img_label = dir_path.split("\\")[-1]
    print(img_label)
    training_label.append(img_label)

training_fruit_img = np.array(training_fruit_img)
training_label = np.array(training_label)
len(np.unique(training_label))

print(training_label)

target_labels = ['Apple Braeburn', 'Apple Crimson Snow', 'Apple Golden 1', 'Apple Golden 2',
 'Apple Golden 3', 'Apple Granny Smith', 'Apple Pink Lady', 'Apple Red 1',
 'Apple Red 2', 'Apple Red 3', 'Apple Red Delicious', 'Apple Red Yellow 1',
 'Apple Red Yellow 2', 'Apricot', 'Avocado', 'Avocado ripe', 'Banana',
 'Banana Lady Finger', 'Banana Red', 'Beetroot', 'Blueberry', 'Cactus fruit',
 'Cantaloupe 1', 'Cantaloupe 2', 'Carambula', 'Cauliflower', 'Cherry 1',
 'Cherry 2', 'Cherry Rainier', 'Cherry Wax Black', 'Cherry Wax Red',
 'Cherry Wax Yellow', 'Chestnut', 'Clementine', 'Cocos', 'Corn', 'Corn Husk',
 'Cucumber Ripe', 'Cucumber Ripe 2', 'Dates', 'Eggplant', 'Fig', 'Ginger Root',
 'Granadilla', 'Grape Blue', 'Grape Pink', 'Grape White', 'Grape White 2',
 'Grape White 3', 'Grape White 4', 'Grapefruit Pink', 'Grapefruit White',
 'Guava', 'Hazelnut', 'Huckleberry', 'Kaki', 'Kiwi', 'Kohlrabi', 'Kumquats',
 'Lemon', 'Lemon Meyer', 'Limes', 'Lychee', 'Mandarine', 'Mango', 'Mango Red',
 'Mangostan', 'Maracuja', 'Melon Piel de Sapo', 'Mulberry', 'Nectarine',
 'Nectarine Flat', 'Nut Forest', 'Nut Pecan', 'Onion Red', 'Onion Red Peeled',
 'Onion White', 'Orange', 'Papaya', 'Passion Fruit', 'Peach', 'Peach 2',
 'Peach Flat', 'Pear', 'Pear 2', 'Pear Abate', 'Pear Forelle', 'Pear Kaiser',
 'Pear Monster', 'Pear Red', 'Pear Stone', 'Pear Williams', 'Pepino',
 'Pepper Green', 'Pepper Orange', 'Pepper Red', 'Pepper Yellow', 'Physalis',
 'Physalis with Husk', 'Pineapple', 'Pineapple Mini', 'Pitahaya Red', 'Plum',
 'Plum 2', 'Plum 3', 'Pomegranate', 'Pomelo Sweetie', 'Potato Red',
 'Potato Red Washed', 'Potato Sweet', 'Potato White', 'Quince', 'Rambutan',
 'Raspberry', 'Redcurrant', 'Salak', 'Strawberry', 'Strawberry Wedge',
 'Tamarillo', 'Tangelo', 'Tomato 1', 'Tomato 2', 'Tomato 3', 'Tomato 4',
 'Tomato Cherry Red', 'Tomato Heart', 'Tomato Maroon', 'Tomato Yellow',
 'Tomato not Ripened', 'Walnut', 'Watermelon']

model = tf.keras.models.load_model('fruits.h5')
model.compile(optimizer = 'rmsprop', loss = 'categorical_crossentropy', metrics = ['accuracy'])


def convert_image_to_array(file):
    # Convert to Numpy Array
    return img_to_array(load_img(file))

test_image = image.load_img('PA/poire_new_346_346_filled.jpg', target_size = (224, 224))
test_image = np.array(test_image)
#test_image = test_image.astype('float32')/255
test_image = np.expand_dims(test_image, axis = 0)

#predict the result
y_pred = model.predict(test_image)
print(y_pred)
pred_idx = np.argmax(y_pred[0])
print(pred_idx)
print(target_labels[pred_idx])


print("-----------------------------------------------------------------")
print("-----------------------------------------------------------------")
print("-----------------------------------------------------------------")




file = "tomate.jpg"
image_path = "PA/{}".format(file)
img = image.load_img(image_path, target_size=(224, 224))
img = np.expand_dims(img, axis=0)
result = model.predict(img)[0]
i = np.argmax(result)
print(i)
print(training_label[i])

#writer.writerow({'Id': file.replace('.jpg',''), 'Category': training_label[i]})