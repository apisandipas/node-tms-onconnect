# TMS OnConnect API

This library is a simple wrapper for the Tribune Media Services OnConnect API by Gracenote.
Each method returns a "thenable" object.

## Usage
This library is build on top of Bluebird and uses promises heavily.

```javascript
var api = new Gracenote(api_key);

api.listings.findLineup().then(function(response){
    
    //... do something with repsonse.

});

//or

api.listings.findLineup()
    .then(doSometing)
    .then(doSometingElse)
    .then(finallyDoSometing);
```


TODO:
- Public Plan Methods
- ~~Lineups~~
- ~~Stations~~
- Programs
- Series
- Movies On TV
- Movies In Theatres
- Movies Trailers
- Sports
- Celebrities
