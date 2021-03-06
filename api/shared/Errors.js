'use strict';
const util = require('util');

/**
* Http error
* Overload the error returned to http
**/
export function HttpError(httpCode, message, type, key) {
	this.code = httpCode;
	this.type = type ? type : 'generic';
	this.key = key ? key : '';
	this.message = message;

	Error.captureStackTrace(this, HttpError);
}
util.inherits(HttpError, Error);
HttpError.prototype.name = 'HttpError';


/**
* Config Error 
* files not found 
**/
export function ConfigError(message, key){
	HttpError.call(this);
	this.code = 511;
	this.type = 'config';
	this.key = key ? key : 'config.not.found';
	this.message = message;
}
util.inherits(ConfigError, HttpError);
ConfigError.prototype.name = 'ConfigError';

/**
* Database error
**/
export function DatabaseError(message, key){
	HttpError.call(this);
	this.code = 512;
	this.type = 'database';
	this.key = key ? key : '';
	this.message = message;
}
util.inherits(DatabaseError, HttpError);
DatabaseError.prototype.name = 'DatabaseError';

/**
* Validation error
**/
export function ValidationError(message, key){
	HttpError.call(this);
	this.code = 422;
	this.type = 'validation';
	this.key = key ? key : '';
	this.message = message;
}
util.inherits(ValidationError, HttpError);
ValidationError.prototype.name = 'ValidationError';

	/**
	* ZSchema Validation error
	**/
	export function ZschemaValidationError(zschemaError){
		ValidationError.call(this);
		this.key = zschemaError.paramName;
		this.message = zschemaError.results.errors
			.map(err => err.message).reverse().join(', ');
	}
	util.inherits(ZschemaValidationError, HttpError);
	ZschemaValidationError.prototype.name = 'ZschemaValidationError';


/**
* Model error
**/
export function ModelError(message, key){
	HttpError.call(this);
	this.code = 513;
	this.type = 'model';
	this.key = key ? key : 'model.not.found';
	this.message = message;
}
util.inherits(ModelError, HttpError);
ModelError.prototype.name = 'ModelError';
	
	export function ModelNotFoundError(message, key){
		ModelError.call(this);
		this.key = key ? key : 'model.not.found';
		this.message = message;
	}
	util.inherits(ModelNotFoundError, ModelError);
	ModelNotFoundError.prototype.name = 'ModelNotFoundError';

	export function ModelValidationError(message, key){
		ModelError.call(this);
		this.key = key ? key : 'model.validation';
		this.message = message;
	}
	util.inherits(ModelValidationError, ModelError);
	ModelValidationError.prototype.name = 'ModelValidationError';



