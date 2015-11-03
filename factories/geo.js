/* global angular */
angular.module('suite')
    .factory('GeoFactory', [function() {
        return {
            map: function(value, start1, stop1, start2, stop2) {
                return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
            },
            convertCoords: function(lat, lng) {
                var xOffset, yOffset, scaleX, scaleY;
                var coords = [];
                var phi1 = 15; // standard parallels
                var phi2 = 105;
                var midLng = -134;
                var scale = 530;
                if (lat > 51) { // alaska
                    // Lat: 51°20'N to 71°50'N, Lng: 130°W to 172°E
                    // (9, 433) to (223, 599)
                    coords = this.latLngToGrid(lat, lng, phi1, phi2, midLng, scale);
                    xOffset = 190;
                    yOffset = 543;
                    scaleX = 1;
                    scaleY = -1;

                } else if (lng < -140) { // hawaii
                    // Lat: 18° 55′ N to 28° 27′ N, Lng:  154° 48′ W to 178° 22′ W
                    // (225, 504) to (356, 588) on map
                    // These are guesses
                    phi1 = 0; // standard parallels
                    phi2 = 26;
                    midLng = -166;
                    scale = 1280;
                    coords = this.latLngToGrid(lat, lng, phi1, phi2, midLng, scale);
                    xOffset = 115;
                    yOffset = 723;
                    scaleX = 1;
                    scaleY = -1;
                } else {
                    xOffset = -17;
                    yOffset = -22;
                    scaleX = 10.05;
                    scaleY = 6.26;
                    coords[0] = 50.0 + 124.03149777329222 * ((1.9694462586094064 - (lat * Math.PI / 180)) * Math.sin(0.6010514667026994 * (lng + 96) * Math.PI / 180));
                    coords[1] = 50.0 + 1.6155950752393982 * 124.03149777329222 * 0.02613325650382181 - 1.6155950752393982 * 124.03149777329222 * (1.3236744353715044 - (1.9694462586094064 - (lat * Math.PI / 180)) * Math.cos(0.6010514667026994 * (lng + 96) * Math.PI / 180));
                }
                return ([(coords[0] * scaleX + xOffset), (coords[1] * scaleY + yOffset)]);
            },
            latLngToGrid: function(lat, lng, phi1, phi2, midLng, scale) {
                var pi = Math.PI;
                var midLat = (phi1 + phi2) / 2;
                var n, tmp1, tmp2, tmp3, x, y, p;
                n = (Math.sin(phi1 / 180 * pi) + Math.sin(phi2 / 180 * pi)) / 2;
                tmp1 = Math.sqrt(Math.cos(phi1 / 180 * pi)) + 2 * n * Math.sin(phi1 / 180 * pi);
                tmp2 = scale * Math.pow(tmp1 - 2 * n * Math.sin(midLat / 180 * pi), 0.5) / n;
                tmp3 = n * (lng - midLng);
                p = scale * Math.pow(tmp1 - 2 * n * Math.sin(lat / 180 * pi), 0.5) / n;
                x = p * Math.sin(tmp3 / 180 * pi);
                y = tmp2 - p * Math.cos(tmp3 / 180 * pi);
                return ([x, y]);
            }
        };
    }]);
