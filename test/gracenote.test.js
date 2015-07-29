// var should = require('chai').should(),
//     config = require('./config.json');


// describe('Gracenote API', function(){

//     var Gracenote, api;

//     beforeEach(function(){
//         Gracenote = require('../lib/gracenote');
//         api = new Gracenote(config.apiKey);
//     });

//     describe('Series API', function() {

//         xdescribe('#details', function () {});

//         describe('#airings', function () {

//                 var seriesId = '185044';

//                 it('should return  a collection of series airings', function (done) {
//                     api.series.airings(seriesId).then(function(airings) {
//                         airings.should.be.instanceOf(Array);
//                         airings[0].program.seriesId.should.equal(seriesId);
//                         done();
//                     })
//                 });


//                 it('should return a collection the correct series by id', function (done) {
//                     api.series.airings(seriesId).then(function(airings) {
//                         airings[0].program.seriesId.should.equal(seriesId);
//                         done();
//                     })
//                 });
            
//         });

//     });

// });


// *
//  *
//  *    xdescribe('Gracenote', function(){

//         it('should initialize with an API Key', function(){

//             api.should.exist;

//         });

//     });

//     xdescribe('Listings API', function(){

//         describe('#find', function(){

//             it('should return an array of lineups', function(done){

//                 api.lineups.find({ postalCode: '90210' }).then(function(lineups){

//                     lineups.should.be.instanceOf(Array);
//                     lineups.should.be.truthy;

//                     done();
//                 }).catch(console.error.bind(console));

//             });

//         });


//         describe('#details', function(){

//             it('should return an line up object', function(done){

//                 api.lineups.details(config.lineupId).then(function(lineup){

//                     lineup.should.be.instanceOf(Object);
//                     lineup.lineupId.should.equal('USA-TX42500-X');

//                     done();
//                 }).catch(console.error.bind(console));

//             });

//         });


//         xdescribe('#channels', function(){

//             it.only('should return an array of channel objects', function(done){

//                 api.lineups.channels(config.lineupId).then(function(channels){

//                     channels.should.be.instanceOf(Array);
//                     channels[0].stationId.should.be.truthy;
//                     channels[0].callSign.should.be.truthy;

//                     done();
//                 }).catch(console.error.bind(console));

//             });

//         });


//         describe('#lineupAirings', function(){

//             it('should contain an array of channels', function(done){

//                 api.lineups.airings(config.lineupId).then(function(channels){

//                     channels.should.be.instanceOf(Array);
//                     channels[0].stationId.should.be.truthy;
//                     channels[0].callSign.should.be.truthy;

//                     done();
//                 }).catch(console.error.bind(console));

//             });

//             it('should return channels with airings', function(done){
//                 api.lineups.airings(config.lineupId).then(function(channels){

//                     channels[0].airings.should.be.truthy;
//                     channels[0].airings.should.be.instanceOf(Array);

//                     done();
//                 }).catch(console.error.bind(console));
//             })

//         });

//     });

//     xdescribe('Stations API', function(){

//         describe('#stationDetails', function(){

//             it('should return a single station object', function(done){

//                 api.stations.details().then(function(station){

//                     station.should.be.truthy;
//                     station.should.be.instanceOf(Array);
//                     station[0].should.be.instanceOf(Object);
//                     station[0].stationId.should.be.truthy;
//                     station[0].callSign.should.be.truthy;

//                     done();
//                 });

//             });

//         });

//         describe('#airings', function(){

//             it('should return all of a stations airings', function(done){
//                 api.stations.airings().then(function(station){

//                     station.should.be.truthy;
//                     station[0].startTime.should.be.truthy;
//                     station[0].endTime.should.be.truthy;

//                     done();
//                 });
//             })

//         });

//     });
//  *
//  * 
//  