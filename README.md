# Meme Serve 
Meme Serve is a MAAS (Memes As a Service) application that directly serves memes to the Client.

## Install
```
git clone https://github.com/janjanmedinaaa/MemeServe.git
npm install
```

## Run the App
```
npm run server
```

## API Documentation

### Serve Meme

`GET /`
- Returns an Meme created using the given Image URL and Message

#### Query Parameters
`image (Optional)` - Image URL for Meme Reference <br />
`message (Optional)` - Description 

#### Example
```
curl http://localhost:4000/ --output memeserve.png
```

### Download Meme

`GET /download`
- Downloads the Meme created using the given Image URL and Message

#### Query Parameters
`image (Optional)` - Image URL for Meme Reference <br />
`message (Optional)` - Description 

#### Example
```
curl http://localhost:4000/download --output memeserve.png
```