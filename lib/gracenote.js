var request     = require('request-promise'),
    extend      = require('xtend'),
    moment      = require('moment'),
    qs          = require('qs');



var Gracenote = function(api_key){

    var self = this;

    this.host =  "http://data.tmsapi.com/v1.1";
    this.api_key = api_key;
    this.date_format = 'YYYY-MM-DDTHH:mmZ';

    this.defaultLineupId = 'USA-TX42500-X';

    this.defaultStationId = '10359';


    return  {
        listings: {

            findLineups: function(params){

                var defaults = {
                    country: 'USA',
                    postalCode: '60657'
                };

                var payload = extend(defaults, params);

                var url = 'lineups';

                return self._get(url, payload);

            },

            lineupDetails: function( lineupId ){

                lineupId = lineupId || self.defaultStationId;

                var url = 'lineups/' + lineupId;

                return self._get( url );
            },

            lineupChannelList: function( lineupId, params ){

                lineupId = lineupId || self.defaultStationId;

                var url = 'lineups/' + lineupId + '/channels';

                var payload = extend({}, params);

                return self._get( url, payload );
            },

            lineupAirings: function( lineupId, params ){
                lineupId = lineupId || self.defaultStationId;

                var url = 'lineups/' + lineupId + '/grid';

                var defaults = {
                    startDateTime: moment().format(self.date_format)
                };

                var payload = extend(defaults, params);

                return self._get( url, payload );
            }

        },

        stations: {

            stationDetails: function( stationId, params ){

                stationId = stationId || self.defaultStationId;

                var url = 'stations/' + stationId;

                var defaults = {
                    lineupId: self.defaultLineupId
                };

                var payload = extend(defaults, params);

                return self._get( url, payload );
            },

            stationAirings: function( stationId, params ){
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

    // JSON.parse all incoming data before returning Promise.
    return request.get( getURL).then(JSON.parse);

};



module.exports = Gracenote;