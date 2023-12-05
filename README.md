# Projet Annuel de 4eme année filière IABD
Le groupe est composé de Hedi BOUFADEN, Kamel MALKI et Ilès BENKOUSSA

# Présentation

Projet permettant le suivi du contenu d’un réfrigérateur à l’aide d’une application. L’utilisateur vient scanner ses produits via le code barre ou prendre une photo de ses fruits, ce qui lui permet de garder un œil sur le contenu de son frigo.

<ins>**Kamel :** J’ai travaillé sur la partie cloud ainsi que le backend, et j’ai épaulé mon collège sur la partie machine learning. </ins>

Le backend faisait le lien entre les différentes bases de données ainsi que le front end, par des fonctionnalités de scan de code barre à l’aide d’une base de données de produits MongoDB, le suivi des produits d’un utilisateur, détection de fruit via une photo (modèle non performant, beaucoup d'erreurs de détection), ainsi que les valeurs nutritionnelles consommées par l’utilisateur, sous forme de graphique côté frontend. Les produits des utilisateurs et leurs consommations étaient stockés dans Cassandra.

Stack technique :
- Front end ReactJS
- Backend SpringBoot
- Cloud Azure
- Base de données :
  - Azure CosmoDB MongoDB
  - Cassandra
  - Mysql local dockerisé
- Utilisation d’image docker
- Terraform
- Tensorflow
