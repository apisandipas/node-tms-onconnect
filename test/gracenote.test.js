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

                api.lineups.findLineups({ postalCode: '90210' }).then(function(lineups){

                    lineups.should.be.instanceOf(Array);
                    lineups.should.be.truthy;

                    done();
                });

            });

        });


        describe('#lineupDetails', function(){

            it('should return an line up object', function(done){

                api.lineups.lineupDetails(config.lineupId).then(function(lineup){

                    lineup.should.be.instanceOf(Object);
                    lineup.lineupId.should.equal('USA-TX42500-X');

                    done();
                });

            });

        });


        describe('#lineupChannelList', function(){

            it.only('should return an array of channel objects', function(done){

                api.lineups.lineupChannelList(config.lineupId).then(function(channels){

                    channels.should.be.instanceOf(Array);
                    channels[0].stationId.should.be.truthy;
                    channels[0].callSign.should.be.truthy;

                    done();
                });

            });

        });


        describe('#lineupAirings', function(){

            it('should contain an array of channels', function(done){

                api.lineups.lineupAirings(config.lineupId).then(function(channels){

                    channels.should.be.instanceOf(Array);
                    channels[0].stationId.should.be.truthy;
                    channels[0].callSign.should.be.truthy;

                    done();
                })

            });

            it('should return channels with airings', function(done){
                api.lineups.lineupAirings(config.lineupId).then(function(channels){

                    channels[0].airings.should.be.truthy;
                    channels[0].airings.should.be.instanceOf(Array);

                    done();
                })
            })

        });

    });

    describe('Stations API', function(){

        describe('#stationDetails', function(){

            it('should return a single station object', function(done){

                api.stations.stationDetails().then(function(station){

                    station.should.be.truthy;
                    station.should.be.instanceOf(Array);
                    station[0].should.be.instanceOf(Object);
                    station[0].stationId.should.be.truthy;
                    station[0].callSign.should.be.truthy;

                    done();
                });

            });

        });

        describe('#stationAirings', function(){

            it('should return all of a stations airings', function(done){
                api.stations.stationAirings().then(function(station){

                    station.should.be.truthy;
                    station[0].startTime.should.be.truthy;
                    station[0].endTime.should.be.truthy;

                    done();
                });
            })

        });

    })

});
