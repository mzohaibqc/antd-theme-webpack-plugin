"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.raisesError = void 0;
function raisesError(cb, message) {
    try {
        cb();
    }
    catch (error) {
        expect(error.message).toEqual(message);
    }
}
exports.raisesError = raisesError;
