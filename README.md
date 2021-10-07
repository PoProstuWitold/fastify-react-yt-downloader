# fastify-react-yt-downloader

Fastify, React fullstack project to download videos form YouTube using ytdl-core package

## Usage

Run Docker containers and use the package manager (**yarn** or **npm**) to install dependencies in server and client directories.

### 1. Docker
```bash
cd server 
```
```bash
docker-compose up 
```

### 2. Server setup
```bash
cd server 
```
```bash
npm install 
# OR 
yarn
```

####  2.1
Create ``.env`` file in server root directory and fill with following:

```code
REDIS_PASSWORD=
REDIS_URL=
MONGO_DB_URI=
``` 
For local mongodb image from docker-compose file use:
```code
MONGO_DB_URI='mongodb://localhost:27017/video-downloads'
```
For Redis DB create free account on [UpStash](https://upstash.com/) or other serverless provider and paste required data into ``.env`` file.

### 3. Client setup
```bash
cd client 
```
```bash
npm install 
# OR 
yarn
```


## TO DO
- [x] Fastify server setup
- [x] Bull download queue
- [x] Client app



## License
[ISC](https://opensource.org/licenses/ISC)