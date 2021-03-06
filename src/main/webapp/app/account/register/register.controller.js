(function() {
	'use strict';

	angular
		.module('app.account')
		.controller('RegisterController', RegisterController);

	RegisterController.$inject = ['Auth', '$uibModalInstance', 'ArrayUtils'];

	function RegisterController(Auth, $uibModalInstance, ArrayUtils) {
		var vm = this;

		vm.cancel = cancel;
		vm.register = register;
		vm.isSending = false;
		vm.errors = [];
		vm.name = null;
		vm.username = null;
		vm.password = null;
		vm.repeatPassword = null;

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		function register() {
			if (vm.isSending) {
				return;
			}

			var account = {
				name: vm.name,
				email: vm.username,
				password: vm.password,
				passwordConfirmation: vm.repeatPassword
			};
			vm.errors = [];
			vm.isSending = true;
			Auth.register(account)
				.then(registrationSuccess, registrationFailed);


			function registrationSuccess(data) {
				vm.isSending = false;
				$uibModalInstance.close('success');
			}

			function registrationFailed(data) {
				vm.isSending = false;
				if (angular.isDefined(data) && angular.isDefined(data.errors)) {
					vm.errors = ArrayUtils.flatten(data.errors);
				}
			}
		}
	}
})();
