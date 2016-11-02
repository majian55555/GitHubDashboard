var gdata;
var repoList = new Array();
var userList = new Array();
function GetPubEvents()
{
	var username = 'majian55555', password = '12345ma';
	$.ajax({
	    url: 'https://api.github.com/events',
	    username: 'majian55555',
	    password: '12345ma',
	    beforeSend: function(req) {
	        req.setRequestHeader('Authorization', 'Basic ' + btoa(username+':'+password));
	    }
	}).then(function(data) {
	    gdata = data;
	}, function(err) {
	    console.log('err', err);
	});
} 
function GetSingleInfo(str)
{
	var username = 'majian55555', password = '12345ma';
	var result;
	$.ajax({
	    url: str,
	    username: 'majian55555',
	    password: '12345ma',
	    beforeSend: function(req) {
	        req.setRequestHeader('Authorization', 'Basic ' + btoa(username+':'+password));
	    }
	}).then(function(data) {
		result = data;
	}, function(err) {
	    console.log('err', err);
	});
	return result;
}

$.ajaxSettings.async = false;
GetPubEvents();
for(i=0; i < gdata.length; i++)
{
	userList[i] = GetSingleInfo(gdata[i].actor.url);
	userList[i].eventList = GetSingleInfo("https://api.github.com/users/"+gdata[i].actor.login+"/events/public");
	repoList[i] = GetSingleInfo(gdata[i].repo.url);
}
//console.log(gdata);
//console.log(userList);
//console.log(repoList);
$.ajaxSettings.async = true;

var app = angular.module('myApp',[]);
/*app.factory('getSingleData',function($http,$q){
    return function(str){
        var defer = $q.defer();
        $http.get(str).success(function(data,status,headers,congfig){
            defer.resolve(data);
        }).error(function(data,status,headers,congfig){
        	console.log(data);
            defer.reject(data);
        });
        return defer.promise
    }
});
app.factory('getData',function(){
	return function($scope){
		
		$.getJSON('https://api.github.com/events',{ 'Authorization': "Basic XXXXX" },function(data){
			for (i = 0; i < data.length; i++) 
			{
				$scope.userNames[i] = data[i].actor.login;
				$scope.eventTypes[i] = data[i].type;
				$scope.repoNames[i] = data[i].repo.name;
				$scope.userAvatarUrls[i] = data[i].actor.avatar_url;
				$scope.userUrl[i] = data[i].actor.url;
				$scope.repoUrl[i] = data[i].repo.url;
				//$scope.userInfo[i] = $.getJSON(data[i].actor.url,function(data){ return data;});
				//$scope.repoInfo[i] = $.getJSON(data[i].repo.url,function(data){ return data;});
				//var userData = getSingleData(data[i].actor.url);
				//$scope.userHtmlurl[i] = userData.html_url;
				console.log($scope.userNames[i]);
				console.log($scope.eventTypes[i]);
				console.log($scope.repoNames[i]);
				console.log($scope.userAvatarUrls[i]);
				console.log($scope.userUrl[i]);
				console.log($scope.repoUrl[i]);
				//console.log($scope.userInfo[i].html_url);
				//console.log($scope.repoInfo[i].html_url);
				//console.log($scope.repoInfo[i].owner.avatar_url);
			}
		});
		$.ajaxSettings.async = true;
	}
});*/

app.controller('myCtrl', function($scope, $window) {
	$scope.eventList = gdata;
	for (i = 0; i < gdata.length; i++)
	{
		$scope.eventList[i].idxId = i;
		$scope.eventList[i].userUrl = userList[i].html_url;
		$scope.eventList[i].repoAvatarUrl = repoList[i].owner.avatar_url;
		$scope.eventList[i].repoUrl = repoList[i].html_url;
		$scope.eventList[i].eventList = userList[i].eventList;
	}
	//$scope.userList = userList;
	//$scope.repoList = repoList;
	//console.log($scope.eventList);
    //console.log("after get data");
    $scope.reloadRoute = function() {
	   $window.location.reload();
	}
});
// toggle visibility for css3 animations 
$(document).ready(function() {
	$('header').addClass('visibility');
	$('.dashboardbody').addClass('visibility');
	$('.social .col-md-12').addClass('visibility');
});


//iphone carousel animation
$(window).load(function () {
	$('header').addClass("animated fadeIn");
	$('.dashboardbody').addClass("animated fadeInLeft");
});

// Fixed navbar
$(window).scroll(function () {

var scrollTop = $(window).scrollTop();

	if (scrollTop > 200) {
		$('.navbar-default').css('display', 'block');
		$('.navbar-default').addClass('fixed-to-top');
			
	} else if (scrollTop == 0)   {
	
		$('.navbar-default').removeClass('fixed-to-top');
	}
	
	
//animations	
	
	$('.social .col-md-12').each(function(){
			
		var imagePos = $(this).offset().top;
		var topOfWindow = $(window).scrollTop();
			
			if (imagePos < topOfWindow+550) {
				$(this).addClass("animated fadeInLeft");
			}		
				
	});
});


// Parallax Content

function parallax() {

		// Turn parallax scrolling off for iOS devices
		   
		    var iOS = false,
		        p = navigator.platform;
		
		    if (p === 'iPad' || p === 'iPhone' || p === 'iPod') {
		        iOS = true;
		    }
	
		var scaleBg = -$(window).scrollTop() / 3;

        if (iOS === false) {
            $('.social').css('background-position-y', scaleBg + 200);
        }
   
}

function navbar() {

	if ($(window).scrollTop() > 1) {
	    $('#navigation').addClass('show-nav');
	} else {
	    $('#navigation').removeClass('show-nav');
	}
	
}

$(document).ready(function () {

	var browserWidth = $(window).width();
	
	if (browserWidth > 560){ 
	
		$(window).scroll(function() {
			parallax();
			navbar();
		});
	
	}

});	


$(window).resize(function () {

	var browserWidth = $(window).width();
	
	if (browserWidth > 560){ 
	
		$(window).scroll(function() {
			parallax();
			navbar();
		});
	
	}

});	


// iPhone Header Carousel
$('header .carousel').carousel({
  interval: 3000
})


