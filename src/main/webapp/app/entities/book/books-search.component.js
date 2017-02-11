(function() {
	'use strict';

	var booksSearch = {
		templateUrl: 'app/entities/book/books-search.html',
		controller: 'BooksSearchController',
		controllerAs: 'vm'
	};

	angular
		.module('app.book')
		.component('booksSearch', booksSearch);
})();
