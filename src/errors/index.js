const mongoose = require('mongoose');

const MongooseError = mongoose.Error;
const { ValidationError } = MongooseError;

function DuplicateKeyError() {
    this.message = 'Duplicate _id has been used';
}

DuplicateKeyError.prototype = Object.create(MongooseError.prototype);

module.exports = {
    ValidationError,
    DuplicateKeyError,
};
