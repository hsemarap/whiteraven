var userModel = {
	name: ko.observable("admin"),
	handle: ko.observable("admin"),
	tokenId: ko.observable("")
};

function getUserInfo() {
	var userURI = "/api/users/" + "4230838152"
	$.getJSON(userURI, function(data) { 
		// Now use this data to update your view models, 
		// and Knockout will update your UI automatically 
		userModel.name(data.name);
		userModel.handle(data.handle);
	})
}

getUserInfo();

ko.applyBindings(userModel);