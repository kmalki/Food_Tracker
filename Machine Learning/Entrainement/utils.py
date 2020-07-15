from tensorflow.keras.utils import plot_model
from tensorflow.keras.models import model_from_json


def save_model(model, name):
    # serialize model to JSON
    model_json = model.to_json()
    with open("{}.json".format(name), "w") as json_file:
        json_file.write(model_json)
    # serialize weights to HDF5
    model.save_weights("{}.h5".format(name))
    plot_model(model, "{}.png".format(name))
    print("Saved model to disk")


def load_model(name):
    # load json and create model
    json_file = open('{}.json'.format(name), 'r')
    loaded_model_json = json_file.read()
    json_file.close()
    loaded_model = model_from_json(loaded_model_json)
    # load weights into new model
    loaded_model.load_weights("{}.h5".format(name))
    print("Loaded model from disk")
    return loaded_model

