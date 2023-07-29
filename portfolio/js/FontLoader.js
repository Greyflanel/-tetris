var THREE = require('three');

var FontLoader = function ( manager ) {

	this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;

};

FontLoader.prototype = {

	constructor: FontLoader,

	load: function ( url, onLoad, onProgress, onError ) {

		var scope = this;

		var loader = new THREE.XHRLoader( this.manager );
		loader.setResponseType( 'json' );
		loader.load( url, function ( text ) {

			onLoad( new THREE.Font( text ) );

		}, onProgress, onError );

	},

	parse: function ( json ) {

		return new THREE.Font( json );

	}

};

module.exports = FontLoader;