/**
 * Controllers
 */


// Home
app.controller('portfolioCtrl', ['$scope', '$rootScope', function($scope, $rootScope){
	$rootScope.pageHandle = 'portfolio';

	$scope.companies = [
		'app/html/pages/home/home-depot.html',
		'app/html/pages/home/cinsay.html',
		'app/html/pages/home/eyemagine.html',
		'app/html/pages/home/edgeworks.html',
		'app/html/pages/home/freelance.html',
	];

	$scope.toggleCompany = function(){
		if ($scope.company == 'all') {
			$('#view-portfolio .company').addClass('active');
		} else {
			$('#view-portfolio .company').removeClass('active');
			$('#' + $scope.company + '-company').addClass('active');
		}
	}

	$scope.slide = function(direction){
		var activeSlide = $('#screenshots-modal .active');

		if (direction == 'prev') {
			var toSlide = activeSlide.prev();
			var toToSlide = toSlide.prev();

			if (toSlide.length) {
				activeSlide.removeClass('active');
				toSlide.addClass('active');
			}
		}

		if (direction == 'next') {
			var toSlide = activeSlide.next();
			var toToSlide = toSlide.next();

			if (toSlide.length) {
				activeSlide.removeClass('active');
				toSlide.addClass('active');
			}
		}
	};

	$scope.closeModal = function(){
		$('#screenshots-modal').removeClass('active');
	};

	$(window).keyup(function(ev){
		if (ev.keyCode == 27) {
			$scope.closeModal();
		}
	});

}]);


// Grades
app.controller('gradesCtrl', ['$scope', '$rootScope', function($scope, $rootScope){
	$rootScope.pageHandle = 'grades';

	$('#view-grades figure').zoom({ magnify: '.8' });
}]);

app.controller('sideProjectsCtrl', ['$scope', '$rootScope', function($scope, $rootScope){
	$rootScope.pageHandle = 'grades';
}]);

// For Fun
app.controller('forfunCtrl', ['$scope', '$rootScope', function($scope, $rootScope){
	$rootScope.pageHandle = 'for-fun';

	$scope.widgets = [
		'app/html/pages/for-fun/spiral.html',
		'app/html/pages/for-fun/text-gradient.html',
		'app/html/pages/for-fun/cube.html',
	];

	$scope.range = function(n){
    	return new Array(n);
    };

}]);