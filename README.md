# pmm-server
Server para la plataforma de movilidad de mascotas.

# Ramas
  - Master
  - DEVELOP : Para el equipo de desarrollo
  - PROD : Para mostrar en las demos
# Configuración
  - Descargar dependencias:
  ```sh
    npm install
  ```
  - Deployar :
  ```sh
   npm start
  ```
### docker:
docker build -t pmm-server .
docker run -p 3000:8081 pmm-server

### postgres
docker run --name pmm -e POSTGRES_PASSWORD=password -d pmm

docker exec -it pmm psql -U pmm

  - setup db :
  ```sh
    setup.sql
  ```
- init db :
  ```sh
    initModel.sql
  ```
- Start the postgresSQL server 
```
  sudo service postgresql start
```
- Stop the postgresSQL server 
```
  sudo service postgresql stop
```
## Docker Compose
- install and configure docker compose
  ```sh
    https://docs.docker.com/compose/install/
  ```
- deploy
  ```sh
    ./pmm.sh
  ```
- show logs
  ```sh
    docker-compose logs
  ```
- Down all container
  ```sh
    docker-compose down
  ```
- Server running at port 8081
- Postgres DB configure:
 ```
  * POSTGRES_USER: pmm
  * POSTGRES_PASSWORD: password
  * POSTGRES_DB: pmm
  * Run at port 5400
 ```
 ## Docker Compose: utils commad
 - Alias
  ```sh
    alias dk="docker"
    alias dc="docker-compose"
  ```