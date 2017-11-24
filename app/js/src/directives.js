/**
 * Directives
 */


// Header
app.directive('siteHeader', function(){
	return {
		restrict: 'E',
		templateUrl: '/app/html/directives/header.html',
		replace: true,

		controller: ['$scope', function($scope) {
			$('#menu-button, #menu a').click(function(){
				$('#menu-button').toggleClass('active');
				$('#menu').toggleClass('active');
			});
		}]
	}
});


// Portfolio
app.directive('seeImgs', function(){
	return {
		template: '<a href="" class="see-imgs" ng-click="seeImgs($event)">See screenshots</a>',
		replace: true,

		link: function(scope, element, attrs){
			scope.seeMore = function($event){
				var that = $event.target;
				$(that).parents('li').find('.details').toggleClass('active');
			};

			scope.seeImgs = function($event){
				var that = $event.target;
				var imgs = $(that).parents('li').find('.screenshots img');

				if (imgs) {
					$('#screenshots-modal').addClass('active');
					$('#screenshots-modal figure').html(imgs.clone());			
				}
			};			
		}	
	}
});