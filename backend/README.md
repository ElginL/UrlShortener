## Environment set-up

Run Postgresql container
```
docker run -d --name postgres-container -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -e POSTGRES_DB=mydatabase -p 5432:5432 postgres
```

Run this in **exec** to interact with database
```
psql -h localhost -p 5432 -U user -d my database
```