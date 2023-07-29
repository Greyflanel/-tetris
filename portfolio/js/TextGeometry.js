// TextGeometry.js

THREE.TextGeometry = function ( text, parameters ) {

    parameters = parameters || {};

    var font = parameters.font;

    if ( typeof font === "string" ) {

        console.warn( 'THREE.TextGeometry: font parameter is no longer a string. Use THREE.FontLoader instead.' );
        font = new THREE.FontLoader().load( font );

    }

    var shapes = font.generateShapes( text, parameters.size );

    THREE.ShapeBufferGeometry.call( this, shapes );

    this.type = 'TextGeometry';

};

THREE.TextGeometry.prototype = Object.create( THREE.ShapeBufferGeometry.prototype );
THREE.TextGeometry.prototype.constructor = THREE.TextGeometry;