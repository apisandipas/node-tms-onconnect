# TMS OnConnect API

This library is a simple wrapper for the TMS OnConnect API by Gracenote.
Each method returns a "thenable" object.

## Usage
This library is build on top of Bluebird and uses promises heavily.

```javascript
var api = new Gracenote(api_key);

api.lineups.findLineup().then(function(response){
    
    //... do something with response.

});

//or

api.lineups.findLineup()
    .then(doSometing)
    .then(doSometingElse)
    .then(finallyDoSometing);
```


TODO:
- ~~Lineups~~
- ~~Stations~~
- Public Plan Methods
- Programs
- Series
- Movies On TV
- Movies In Theatres
- Movies Trailers
- Sports
- Celebrities
