'use strict';var exceptions_1 = require('angular2/src/facade/exceptions');
var PregenProtoChangeDetector = (function () {
    function PregenProtoChangeDetector() {
    }
    PregenProtoChangeDetector.isSupported = function () { return false; };
    PregenProtoChangeDetector.prototype.instantiate = function (dispatcher) {
        throw new exceptions_1.BaseException('Pregen change detection not supported in Js');
    };
    return PregenProtoChangeDetector;
})();
exports.PregenProtoChangeDetector = PregenProtoChangeDetector;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlZ2VuX3Byb3RvX2NoYW5nZV9kZXRlY3Rvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFuZ3VsYXIyL3NyYy9jb3JlL2NoYW5nZV9kZXRlY3Rpb24vcHJlZ2VuX3Byb3RvX2NoYW5nZV9kZXRlY3Rvci50cyJdLCJuYW1lcyI6WyJQcmVnZW5Qcm90b0NoYW5nZURldGVjdG9yIiwiUHJlZ2VuUHJvdG9DaGFuZ2VEZXRlY3Rvci5jb25zdHJ1Y3RvciIsIlByZWdlblByb3RvQ2hhbmdlRGV0ZWN0b3IuaXNTdXBwb3J0ZWQiLCJQcmVnZW5Qcm90b0NoYW5nZURldGVjdG9yLmluc3RhbnRpYXRlIl0sIm1hcHBpbmdzIjoiQUFBQSwyQkFBNEIsZ0NBQWdDLENBQUMsQ0FBQTtBQU83RDtJQUFBQTtJQU1BQyxDQUFDQTtJQUxRRCxxQ0FBV0EsR0FBbEJBLGNBQWdDRSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUUvQ0YsK0NBQVdBLEdBQVhBLFVBQVlBLFVBQWVBO1FBQ3pCRyxNQUFNQSxJQUFJQSwwQkFBYUEsQ0FBQ0EsNkNBQTZDQSxDQUFDQSxDQUFDQTtJQUN6RUEsQ0FBQ0E7SUFDSEgsZ0NBQUNBO0FBQURBLENBQUNBLEFBTkQsSUFNQztBQU5ZLGlDQUF5Qiw0QkFNckMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcblxuaW1wb3J0IHtQcm90b0NoYW5nZURldGVjdG9yLCBDaGFuZ2VEZXRlY3Rvcn0gZnJvbSAnLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7Y29hbGVzY2V9IGZyb20gJy4vY29hbGVzY2UnO1xuXG5leHBvcnQge0Z1bmN0aW9uIGFzIFByZWdlblByb3RvQ2hhbmdlRGV0ZWN0b3JGYWN0b3J5fTtcblxuZXhwb3J0IGNsYXNzIFByZWdlblByb3RvQ2hhbmdlRGV0ZWN0b3IgaW1wbGVtZW50cyBQcm90b0NoYW5nZURldGVjdG9yIHtcbiAgc3RhdGljIGlzU3VwcG9ydGVkKCk6IGJvb2xlYW4geyByZXR1cm4gZmFsc2U7IH1cblxuICBpbnN0YW50aWF0ZShkaXNwYXRjaGVyOiBhbnkpOiBDaGFuZ2VEZXRlY3RvciB7XG4gICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oJ1ByZWdlbiBjaGFuZ2UgZGV0ZWN0aW9uIG5vdCBzdXBwb3J0ZWQgaW4gSnMnKTtcbiAgfVxufVxuIl19