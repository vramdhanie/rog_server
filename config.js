'use strict';
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/rog';
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET || 'pulmonary';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
