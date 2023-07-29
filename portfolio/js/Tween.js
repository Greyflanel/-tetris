var TWEEN = TWEEN || ( function () {

	var _tweens = [];

	return {

		REVISION: '14',

		getAll: function () {

			return _tweens;

		},

		removeAll: function () {

			_tweens = [];

		},

		add: function ( tween ) {

			_tweens.push( tween );

		},

		remove: function ( tween ) {

			var i = _tweens.indexOf( tween );

			if ( i !== -1 ) {
				_tweens.splice( i, 1 );
			}

		},

		update: function ( time ) {

			if ( _tweens.length === 0 ) {
				return false;
			}

			var i = 0;

			time = time !== undefined ? time : TWEEN.now();

			while ( i < _tweens.length ) {

				if ( _tweens[ i ].update( time ) ) {
					i++;
				} else {
					_tweens.splice( i, 1 );
				}

			}

			return true;

		}
	};

} )();

if ( typeof define === 'function' && define.amd ) {

	define( 'TWEEN', TWEEN );

} else if ( 'undefined' !== typeof module && module.exports ) {

	module.exports = TWEEN;

} else if ( typeof window !== 'undefined' && window.Tween === undefined ) {

	window.TWEEN = TWEEN;

}