# BuenosAires
## Installation
    git clone https://github.com/glimow/BuenosAires.git
    cd BuenosAires
    npm install
## Test du projet
Le projet tente de démarrer mongod par lui même à chaque démarrage. Si cela ne fonctionne pas, il peut être lancé manuellement

    mongod ./db

Lancer le projet (si nodemon est installé) :

    nodemon

Lancer le projet sans nodemon

    npm start
    
## Récupération des nouvelles modifications
    git pull
## Envoi des modifications
Si des fichiers ont été crées

    git add [nom des fichiers créés]
    
Dans tous les cas

    git commit -am "[description des modifications]"
    git push
