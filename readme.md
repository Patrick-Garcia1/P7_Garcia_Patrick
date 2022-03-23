# P7 Groupomania

//--------------------------------------------------------------------------------

## Dans le dossier backend 

==> config 
===> créer le fichier .env (voir env.exemple) et inserer mot de passe dans le fichier config de la bdd 

//------------------

utilisation de workbench pour les tables et créer une table unique.

CREATE DATABASE Groupomania;

// clic sur éclair

//------------------

sequelize db:drop 

sequelize db:create

sequelize db:migrate

//------------------
Installation machine

node.js

Installation des packages voir package-json et version

    bcrypt
    dotenv
    express
    express-rate-limit
    helmet
    jsonwebtoken
    multer
    mysql2
    nodemon
    password-validator
    sequelize
    sequelize-cli

lancement avec: npm run dev

//-------------------------------------------------------------------------------

## Dans le dossier groupomania-r-s

//-----------------
Installation de @vue-cli

    @vue/cli
    
## Retour dans l'arborescence avec cd..

lancez vue create groupomania-r-s pour créer le projet

Choisissez Merge
    
faire les préréglages:

    Manually select features
    
    babel
    linter
    css preprocessor
    
    je choisis la version de vue 3.
    
    Sass/SCSS (attention à la version que vous choisissez, je choisi la version dart comme celle installé sur mon pc (sass --version))
    
    ESLint with error prevention only
    
    Lint on save
    
    In dedicated config files
    
    N

## Dans le dossier groupomania-r-s

Installation des packages voir package-json
    
    
    axios
    core-js
    vue
    vue-router
    vuex
    

    
lancement avec: npm run serve

//------------------ 


