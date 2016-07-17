var userModel = {
	name: ko.observable("admin"),
	handle: ko.observable("admin"),
	_id: ko.observable(""),
};

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

function getUserInfo() {
	var userCookie = document.cookie;
	userModel.name(getCookie("user_name"));
	userModel.handle(getCookie("user_handle"));
	userModel._id(getCookie("user_id"));
	// var userURI = "/api/users/" + "4230838152"
	// $.getJSON(userURI, function(data) { 
	// 	userModel.name(data.name);
	// 	userModel.handle(data.handle);
	// })
}

getUserInfo();

ko.applyBindings(userModel);