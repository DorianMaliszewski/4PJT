# 4PJT

## Description des projets

- blockchain : contient le projet de la blokchain et le wallet compilé
- BlockchainWallet : contient une application ionic permettant de consulter la blockchain
- pjt-frontend : Contient le frontend du site web permettant de consulter la blockchain
- pjtback : Contient la partie backend permettant d'interagir avec la blockchain + Authentification personnalisé OAuth2 + Authentification avec Google et Facebook.

L'application est une cryptomonnaie basée sur une blockchain que nous avons nommée EZMonney, qui se décompose ne plusieurs parties :

- Une partie blockchain + wallet permettant d'envoyer de l'argent, miner, voir ses transactions.
- Une partie web (pjtback, pjtfrontend et BlockchainWallet) qui permettent de consulter la blockchain sur le web ou via une application mobile en se connectant via un compte EZMoney Online créé, Google ou Facebook.
- L'application est en P2P, cependant pour faciliter son utilisation on a rajouté des peers de base sur lesquels les utilisateurs les moins aguéris iront se connecter. EN revanche il est possible de rajouter des peers directement via l'api de la blockchain. Vous pouvez retrouvez plus d'informations dans la documentation de la blockchain.

## Prérequis

- NodeJS version 10.X
- Java : OpenJDK 8
- Pour la partie mobile il faut Android-Studio pour android et XCode pour ios.
- Pour la partie blockchain il faut avoir les ports 3001 et 6001 ouvert et libre
- Pour la partie backend il faut le port 8080 ouvert et libre
- Pour la partie frontend il faut le port 4200 ouvert et libre

## Lancement des projets

- aller dans blockchain/ : `npm install && npm run electron` ou `npm install && npm start`
- aller dans pjtback/, s'assurer d'avoir un serveur de base de données mysql ou mariadb avec une base de donnée nommée pjtback : `chmod +x mvnw && ./mvnw spring-boot:run`.
- aller dans pjt-frontend/ : `npm install && npm run serve`.

## Lancement optionnel ou en dev

- Pour la partie ionic : aller dans BlockchainWallet/BlockchainWallet/ : `ionic cordova run android` pour lancer l'application sur android (attention il faut que le mode développeur soit activé et le mode debuggage USB aussi).
- Pour la partie wallet : Pour lancer uniquement le front du wallet depuis le projet react : `npm install && npm start`
