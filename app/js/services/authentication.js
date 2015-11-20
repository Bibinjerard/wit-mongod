myApp.factory('Authentication',['$rootScope','$http','$location', function($rootScope,$location,$scope){
	var ref = new 
	var auth = 
	
	auth.$onAuth(function(authUser){
		if(authUser){
			var userRef = new Firebase( + 'users/' + authUser.uid);
			var userObj = $firebaseObject(userRef);
			$rootScope.currentUser = userObj;
		}else{
			$rootScope.currentUser = '';
		}
	});
	
	var myObject = {
		login: function(user){
			auth.$authWithPassword({
				email: user.email,
				password: user.password
			}).then(function(){
				$location.path('/success');
			}).catch(function(error){
				$rootScope.message =  error.message;
			});
		}, // login
		
		logout: function(){
			return auth.$unauth();
		}, // logout
		
		requireAuth: function(){
			return auth.$requireAuth();
		},// requireAuth
		
		register: function(user){
			auth.$createUser({
				email: user.email,
				password: user.password
			}).then(function(regUser){
				var regRef = new Firebase(FIREBASE_URL + 'users').
				child(regUser.uid).set({
					date: Firebase.ServerValue.TIMESTAMP,
					regUser: regUser.uid,
					firstname: user.firstname,
					lastname: user.lastname,
					email: user.email
				}); // user info
				myObject.login(user);
			}).catch(function(error){
				$rootScope.message = error.message;
			}); 
		} 
	};
	
	return myObject;
}]);