# 4PJT

## Présentation de l'application

Représente la partie blockchain + le wallet pour le projet de fin d'année de 4e année 2018/2019 à Supinfo.

## Technologie utilisée

L'application est faite avec :
- React (compilé, la code source se trouve dans le projet wallet) pour la partie frontend accessible directement via l'url http://localhost:3001
- ExpressJS pour la partie backend de l'application, c'est cette aprtie qui gère la blockchain et sert le frontend react
- Electron afin d'avoir un éxécutable desktop

## Prérequis

- NodeJS version 10.X (Dernière LTS à ce jour) avec son gestionnaire de packet npm

## Configuration possible

Il est possible de personnaliser le port de l'api pour le serveur web et le serveur websocket (déconseillé) :
```
#Windows :
SET HTTP_PORT=4896 && SET P2P_PORT=8123 && npm start

# Unix:
HTTP_PORT=4896 P2P_PORT=8123 npm start
```

## Quick start

```
npm install
npm start
# Open your browser on http://localhost:3001
```

## Quick start dev

```
npm install
npm run dev
```

## Build electron app

For Unix :
```
npm run build && npm run build-electron
```

For Windows:
```
npm run build && npm run build-electron-win
```

## Action sur l'API de la Blockchain

##### Récupérer la blockchain

```
curl http://localhost:3001/blocks
```

##### Miner un block (avec rémunération)

```
curl -X POST http://localhost:3001/mineBlock
```

##### Send transaction

```
curl -H "Content-type: application/json" --data '{"address": <clef publique du wallet ciblé>, "amount" : <montant de la transaction">}' http://localhost:3001/sendTransaction
```

##### Récupérer les transaction en attente de confirmation

```
curl http://localhost:3001/transactionPool
```

##### Mine directement une transaction sans passer par la mise en attente

```
curl -H "Content-type: application/json" --data '{"address": <clef public du wallet ciblé>, "amount" : <montant de la transaction>}' http://localhost:3001/mineTransaction
```

##### Récupérer le nombre de token du porte monnaie

```
curl http://localhost:3001/balance
```

#### Récupérer le sinformation a propos d'un porte monnaie (clef public)

```
curl
```

##### Ajouter un peer

```
curl -H "Content-type:application/json" --data '{"peer" : "ws://" + <ip du peer>:<port du peer>}' http://localhost:3001/addPeer
```

#### Récupérer les peers connectés

```
curl http://localhost:3001/peers
```