"use strict";

    /**
     * True if this is running in Nodejs, will be undefined in a browser.
     * In a browser, browserify won't include this file and the whole module
     * will be resolved an empty object.
     */
    exports.isNode = typeof Buffer !== "undefined";
    /**
     * Create a new nodejs Buffer from an existing content.
     * @param {string} data the data to pass to the constructor.
     * @param {BufferEncoding} encoding the encoding to use.
     * @return {Buffer} a new Buffer.
     */
    exports.newBufferFrom = function(data, encoding) {
        if (Buffer.from && Buffer.from !== Uint8Array.from) {
            return Buffer.from(data, encoding);
        } else {
            if (typeof data === "number") {
                // Safeguard for old Node.js versions. On newer versions,
                // Buffer.from(number) / Buffer(number, encoding) already throw.
                throw new Error("The \"data\" argument must not be a number");
            }
            return new Buffer(data, encoding);
        }
    };
    /**
     * Create a new nodejs Buffer with the specified size.
     * @param {number} size the size of the buffer.
     * @return {Buffer} a new Buffer.
     */
    exports.allocBuffer = function (size) {
        if (Buffer.alloc) {
            return Buffer.alloc(size);
        } else {
            var buf = new Buffer(size);
            buf.fill(0);
            return buf;
        }
    };
    /**
     * Find out if an object is a Buffer.
     * @param {any} b the object to test.
     * @return {b is Buffer} true if the object is a Buffer, false otherwise.
     */
    exports.isBuffer = function(b){
        return Buffer.isBuffer(b);
    };

    /**
     * @param {any} obj
     * @returns {obj is import("readable-stream").Readable}
     */
    exports.isStream = function (obj) {
        return obj &&
            typeof obj.on === "function" &&
            typeof obj.pause === "function" &&
            typeof obj.resume === "function";
    };
