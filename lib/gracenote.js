var request     = require('request'),
    Promise     = require('bluebird'),
    extend      = require('xtend'),
    moment      = require('moment'),
    debug       = require('debug')('node-tms-onconnect');
    zlib        = require('zlib')
    qs          = require('qs');


var Gracenote = function(api_key){

    var self = this;

    self.host =  "http://data.tmsapi.com/v1.1";
    self.api_key = api_key;
    self.date_format = 'YYYY-MM-DDTHH:mmZ';
    self.defaultLineupId = 'USA-IL53277-X';
    self.defaultStationId = '10359';

    return  {
        lineups: {

            find: function(params){

                var defaults = {
                    country: 'USA',
                    postalCode: '60657'
                };

                var payload = extend(defaults, params);

                var url = 'lineups';

                return self._get(url, payload);

            },

            details: function( lineupId ){

                lineupId = lineupId || self.defaultStationId;

                var url = 'lineups/' + lineupId;

                return self._get( url );
            },

            channels: function( lineupId, params ){

                lineupId = lineupId || self.defaultStationId;

                var url = 'lineups/' + lineupId + '/channels';

                var payload = extend({}, params);

                return self._get( url, payload );
            },

           grid: function( lineupId, params ){
                lineupId = lineupId || self.defaultLineupId;

                var url = 'lineups/' + lineupId + '/grid';

                var defaults = {
                    startDateTime: moment().format(self.date_format)
                };

                var payload = extend(defaults, params);

                return self._get( url, payload );
            }

        },

        shows: {

            newTonight: function( params ) {
                    var url = 'programs/newShowAirings';

                    if (params.startTime) {
                        params.startDateTime = moment(params.startTime).format(self.date_format);
                        delete params.startTime;
                    }

                    var defaults = {
                        lineupId: 'USA-DLFTE',
                        startDateTime: moment().format(self.date_format)
                    };

                    // var payload = extend(defaults, params);
                    debug('params', params)
                    return self._get( url, params );
                
            },

            details: function( showId ) {
                var url = 'programs/' + showId;
                return self._get( url );
            },

            airings: function( showId, params ) {
                var url = 'programs/' + showId + '/airings';
                var lineupId = params.lineupId || self.defaultLineupId;

                var defaults = {
                    startDateTime: moment().format(self.date_format),
                    endDateTime: moment().add(1, 'd').format(self.date_format),
                    lineupId: lineupId,
                    includeDetail: true
                };

                var payload = extend(defaults, params);
                return self._get( url, payload );
            }

        },

        series: {

            details: function( seriesId ) {
                var url = 'series/' + seriesId;
                return self._get( url );
            },

            airings: function( seriesId, params ) {
                var url = 'series/' + seriesId + '/airings';
            
                var defaults = {
                    startDateTime: moment().format(self.date_format),
                    endDateTime: moment().add(1, 'd').format(self.date_format),
                    lineupId: self.defaultLineupId,
                    includeDetail: true
                };

                var payload = extend( defaults, params );

                return self._get( url, payload );
            }

        },

        stations: {

            details: function( stationId, params ){

                stationId = stationId || self.defaultStationId;

                var url = 'stations/' + stationId;

                var defaults = {
                    lineupId: self.defaultLineupId
                };

                var payload = extend(defaults, params);

                return self._get( url, payload );
            },

            airings: function( stationId, params ){
                stationId = stationId || self.defaultStationId;

                var url = 'stations/' + stationId + '/airings';

                var defaults = {
                    lineupId: self.defaultLineupId,
                    startDateTime: moment().format(self.date_format)
                };

                var payload = extend(defaults, params);

                return self._get( url, payload );
            }

        }
    };

};


Gracenote.prototype._get = function(url, params){

    // Add credentials to params
    params = extend( params, { api_key: this.api_key } );

    // Construct URL with params
    var getURL = this.host + '/' + url + '?' + qs.stringify( params );

    debug('Constructed URL:', getURL);

    var options = {
      url: getURL,
      headers: {
        'Accept-Encoding': 'gzip'
      },
      encoding: null
    };

    return new Promise(function(resolve, reject) {

        request.get(options, function(error, response, body) {

            if (!error && response.statusCode == 200) {
                var encoding = response.headers['content-encoding'];
                if (encoding && encoding.indexOf('gzip') >= 0) {
                    // body is gzipped
                    zlib.gunzip(body, function(err, dezipped) {
                        var json_string = dezipped.toString('utf-8');
                        var json = JSON.parse(json_string);
                        // resolve uncompresed body
                        return resolve(json);
                    });
                } else {
                  // Response is not gzipped
                  return resolve(body);
                }
            } else {
                return reject(new Error('Request error: '+error))
            }
            
        });
        
    });

};

module.exports = Gracenote;
