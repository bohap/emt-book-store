(function() {
	'use strict';

	var nav = {
		templateUrl: 'app/layouts/navbar/navbar.html',
		controller: 'NavbarController',
		controllerAs: 'vm'
	};

	angular
		.module('app.nav')
		.component('appNav', nav);
})();
