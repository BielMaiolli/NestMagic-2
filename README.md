Comandos para essa aplicação:

- npm i -g @nestjs/cli

- criar o '.env' (colocar o link do banco de dados DB_URL="link" e o JWT_SECRET e o JWT_EXPIRES)

- npm i mongoose @nestjs/mongoose @nestjs/config --save

- npm i --save class-validator class-transformer --save

- npm i --save @nestjs/passport passport passport-local

- npm i --save-dev @types/passport-local

- npm i @nestjs/jwt --save

- npm i bcryptjs --save

- npm i passport-jwt --save

- npm install @nestjs/cache-manager cache-manager

- npm i wrk

- npm i cluster

- npm install @nestjs/serve-static

E por fim para rodar o projeto:

- npm run start:dev

Para realizar os testes:

Sobre Cache:
- npx autocannon -c 50 -d 30 -m GET http://localhost:3000/deck/myDecks --title "Sem Cache" --renderStatusCodes

- npx autocannon -c 50 -d 30 -m GET http://localhost:3000/deck/myDecks --title "Com Cache" --renderStatusCodes

Obs: Para realizar o teste sem cache comente na controller "@UseInterceptors(CacheInterceptor)" 

Sobre Cluster:
- autocannon -c 100 -d 20 http://localhost:3000

Referencias para realização:

https://www.youtube.com/watch?v=4oLUddZVL80&list=PLdAEGQHOerPAMLdJim5Peryj6_2Q-477Z

https://docs.nestjs.com/
