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
docker run --name pmm -e POSTGRES_PASSWORD=pmm.0 -d postgres

docker exec -it pmm psql -U postgres

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
- Server running at port 3000
- Postgres DB configure:
 ```
  * POSTGRES_USER: pmm
  * POSTGRES_PASSWORD: pmm.0
  * POSTGRES_DB: pmm
  * Run at port 5432
 ```