(function() {
	'use strict';

	angular
		.module('app.basket')
		.controller("BasketController", BasketController);

	BasketController.$inject = ['BasketBook', 'BookUtil', 'ToastrNotify', 'OrderCreateDialog',
		'EVENTS', '$rootRouter', '$scope'];

	function BasketController(BasketBook, BookUtil, ToastrNotify, OrderCreateDialog, EVENTS,
								$rootRouter, $scope) {
		var vm = this;

		vm.$routerOnActivate = onRouterActivated;
		vm.isEmpty = isEmpty;
		vm.getBookPrice = getBookPrice;
		vm.hasInvalidQuantity = hasInvalidQuantity;
		vm.totalPrice = totalPrice;
		vm.removeBook = removeBook;
		vm.openCreateOrderDialog = openCreateOrderDialog;
		vm.basket = {};
		vm.items = [];
		vm.loading = false;

		function onRouterActivated() {
			vm.loading = true;
			BasketBook.query().$promise
				.then(onBasketBooksLoadingSuccess, onBasketBooksLoadingFailed);

			function onBasketBooksLoadingSuccess(books) {
				vm.loading = false;
				vm.items = [];
				books.forEach(function(book) {
					var item = {
						book: book,
						quantity: 1
					};
					vm.items.push(item);
				});
			}

			function onBasketBooksLoadingFailed(response) {
				vm.loading = false;
				ToastrNotify.error("Some error occurred while loading the page! Please reload it.",
					"Loading Failed");
			}
		}

		function isEmpty() {
			return vm.items.length === 0;
		}

		function getBookPrice(item) {
			return BookUtil.getBookPrice(item.book);
		}

		function hasInvalidQuantity(item) {
			return item.quantity < 1;
		}

		function totalPrice() {
			var total = 0;
			vm.items.forEach(function(item) {
				var price = getBookPrice(item);
				total += price * item.quantity;
			});
			return total;
		}

		function removeBook(item) {
			BasketBook.remove({slug: item.book.slug}).$promise
				.then(onBookRemovingSuccess, onBookRemovingFailed);

			function onBookRemovingSuccess() {
				ToastrNotify.success("Book is successfullt removed from the basket", "Book Removed");
				var index = vm.items.indexOf(item);
				if (index === -1) {
					for (var i = 0 ; i < vm.items.length; i++) {
						if (vm.items[i].book.slug === item.book.slug) {
							index = i;
							break;
						}
					}
				}
				vm.items.splice(index, 1);
			}

			function onBookRemovingFailed() {
				ToastrNotify.error("Book removing failed! Please try again.", "Remove Failed");
			}
		}

		function openCreateOrderDialog() {
			if (!checkForInvalidQuantity()) {
				OrderCreateDialog.open(vm.items)
					.then(onOrderCreated, onOrderCreationCanceled);
			}

			function onOrderCreated() {
				vm.items = [];
			}

			function onOrderCreationCanceled() {
			}
		}

		function checkForInvalidQuantity() {
			for (var i = 0; i < vm.items.length; i++) {
				if (hasInvalidQuantity(vm.items[i])) {
					return true;
				}
			}
			return false;
		}

		var logoutWatch = $scope.$on(EVENTS.logoutSuccess, function(event, date) {
			$rootRouter.navigate(['Home']);
		});

		$scope.$on('$destroy', function() {
			logoutWatch();
		});
	}
})();
