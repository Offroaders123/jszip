"use strict";

exports.base64 = true;
exports.array = true;
exports.string = true;
exports.arraybuffer = typeof ArrayBuffer !== "undefined" && typeof Uint8Array !== "undefined";
exports.nodebuffer = typeof Buffer !== "undefined";
// contains true if JSZip can read/generate Uint8Array, false otherwise.
exports.uint8array = typeof Uint8Array !== "undefined";

/** @type {boolean} */
var blob;
if (typeof ArrayBuffer === "undefined") {
    blob = false;
}
else {
    var buffer = new ArrayBuffer(0);
    try {
        blob = new Blob([buffer], {
            type: "application/zip"
        }).size === 0;
    }
    catch (e) {
        try {
            // @ts-expect-error - Legacy `Blob` constructor fallback
            var Builder = self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder;
            var builder = new Builder();
            builder.append(buffer);
            blob = builder.getBlob("application/zip").size === 0;
        }
        catch (e) {
            blob = false;
        }
    }
}
exports.blob = blob;

/** @type {boolean} */
var nodestream;
try {
    nodestream = !!require("readable-stream").Readable;
} catch(e) {
    nodestream = false;
}
exports.nodestream = nodestream;
