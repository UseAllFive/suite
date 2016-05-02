/* global angular */
angular.module('suite')
    .factory('CanvasTypeFactory', [function() {

        function fillTextLine(context, text, x, y, letterSpacing, alignRight, maxWidth) {
            var characters = String.prototype.split.call(text, ''),
            index = alignRight ? (text.length - 1) : 0,
            current,
            currentPosition = alignRight ?
                (maxWidth - letterSpacing - context.measureText(characters[text.length - 1]).width) :
                x;

            if (letterSpacing === 0) {
                context.fillText(text, x, y);
                return;
            }

            if (!alignRight) {
                while (index < text.length) {
                    current = characters[index++];
                    context.fillText(current, currentPosition, y);
                    currentPosition += (context.measureText(current).width + letterSpacing);
                }
            } else {
                while (index >= 0) {
                    current = characters[index--];
                    currentPosition -= (context.measureText(current).width + letterSpacing);
                    context.fillText(current, currentPosition, y);
                }
            }
        }

        function wrapText(context, text, x, y, maxWidth, lineHeight, maxLines, letterSpacing, alignRight) {
            var chars;
            var currentNumLines;
            if (typeof text === 'undefined') {
                return 0;
            }
            chars = text.split('\n');
            currentNumLines = 0;
            for (var i = 0; i < chars.length; i++) {
                var line;
                var words;
                line = '';
                words = chars[i].split(' ');
                for (var n = 0; n < words.length; n++) {
                    var metrics;
                    var testLine;
                    var testWidth;
                    testLine = line + words[n] + ' ';
                    metrics = context.measureText(testLine);
                    testWidth = metrics.width + (testLine.length * letterSpacing);
                    if (testWidth > maxWidth) {
                        currentNumLines++;
                        if (currentNumLines > maxLines - 1) {
                            line = line.substring(0, line.length - 3).slice(0, -2).trim();
                            line += '…';
                            fillTextLine(context, line, x, y, letterSpacing, alignRight, maxWidth);
                            //context.fillText(line, x, y);
                            return y;
                        }
                        fillTextLine(context, line, x, y, letterSpacing, alignRight, maxWidth);
                        //context.fillText(line, x, y);
                        line = words[n] + ' ';
                        y += lineHeight;
                    } else {
                        line = testLine;
                    }
                }
                fillTextLine(context, line, x, y, letterSpacing, alignRight, maxWidth);
                //context.fillText(line, x, y);
                y += lineHeight;
            }
            return y - lineHeight;
        }

        return {
            fillTextLine: fillTextLine,
            wrapText: wrapText
        };
    }])
;
