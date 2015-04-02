var should = require('chai').should(),
    config = require('./config.json');

describe('Gracenote API', function(){

    var Gracenote, api;

    beforeEach(function(){
        Gracenote =  require('./lib/');
        api = new Gracenote(config.apiKey);
    });

    describe('', function(){

    });

});
