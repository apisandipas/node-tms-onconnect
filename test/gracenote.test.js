var should = require('chai').should(),
    config = require('./config.json');

describe('Gracenote API', function(){

    var Gracenote, api;

    beforeEach(function(){
        Gracenote = require('../lib/gracenote');
        api = new Gracenote(config.apiKey);
    });

    describe('Gracenote', function(){
        it('should initialize with an API Key', function(){
            api.should.exist;
        });
    });

    describe('Listings API', function(){

        describe('#findLineups', function(){

            it('should return an array of lineups', function(done){

                api.listings.findLineups({ postalCode: '90210' }).then(function(lineups){

                    lineups.should.be.instanceOf(Array);
                    lineups.should.be.truthy;

                    done();
                });

            });

        });


        describe('#lineupDetails', function(){

            it('should return an line up object', function(done){

                api.listings.lineupDetails(config.lineupId).then(function(lineup){

                    lineup.should.be.instanceOf(Object);
                    lineup.lineupId.should.equal('USA-TX42500-X');

                    done();
                });

            });

        });


        describe('#lineupChannelList', function(){

            it('should return an array of channel objects', function(done){

                api.listings.lineupChannelList(config.lineupId).then(function(channels){

                    channels.should.be.instanceOf(Array);
                    channels[0].stationId.should.be.truthy;
                    channels[0].callSign.should.be.truthy;

                    done();
                });

            });

        });


        describe('#lineupAirings', function(){

            it('should contain an array of channels', function(done){

                api.listings.lineupAirings(config.lineupId).then(function(channels){

                    channels.should.be.instanceOf(Array);
                    channels[0].stationId.should.be.truthy;
                    channels[0].callSign.should.be.truthy;

                    done();
                })

            });

            it.only('should return channels with airings', function(done){
                api.listings.lineupAirings(config.lineupId).then(function(channels){

                    channels[0].airings.should.be.truthy;
                    channels[0].airings.should.be.instanceOf(Array);

                    done();
                })
            })

        });

    });

});
