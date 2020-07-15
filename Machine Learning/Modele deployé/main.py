from azureml.core import Workspace
from azureml.core.model import Model
from azureml.core.webservice import LocalWebservice
from azureml.core.authentication import InteractiveLoginAuthentication
from azureml.core.model import InferenceConfig
from azureml.core.environment import Environment
from azureml.core.conda_dependencies import CondaDependencies
import tensorflow as tf
import json


interactive_auth = InteractiveLoginAuthentication(tenant_id="39eded8d-b54b-4bf8-b522-3de5f4294241")

# Tip: When model_path is set to a directory, you can use the child_paths parameter to include
#      only some of the files from the directory
with open("config.json") as json_file:
    config = json.load(json_file)

ws = Workspace(resource_group=config["resource_group"],
               subscription_id=config["subscription_id"],
               workspace_name=config["workspace_name"],
               auth=interactive_auth)


model = Model.register(model_path="./model",
                       model_name="fruit",
                       description="Fruits recognition model",
                       workspace=ws)

# Create the environment
myenv = Environment(name="myenv")
conda_dep = CondaDependencies()

# Define the packages needed by the model and scripts
conda_dep.add_conda_package("tensorflow==2.0")
conda_dep.add_conda_package("numpy")
conda_dep.add_conda_package("scikit-learn")
# You must list azureml-defaults as a pip dependency
conda_dep.add_pip_package("azureml-defaults")
conda_dep.add_pip_package("keras")
conda_dep.add_pip_package("gensim")
conda_dep.add_pip_package("pillow")

# Adds dependencies to PythonSection of myenv
myenv.python.conda_dependencies = conda_dep

inference_config = InferenceConfig(entry_script="score.py",
                                   environment=myenv)

deployment_config = LocalWebservice.deploy_configuration()

model = Model(ws, name='fruit')
service = Model.deploy(ws, 'myservice', [model], inference_config, deployment_config)

service.wait_for_deployment(True)
print(service.state)
print("scoring URI: " + service.scoring_uri)
