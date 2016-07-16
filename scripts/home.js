var TodoViewModel = function(data) {
    this.name = ko.observable(data.name);
    this.complete = ko.observable(data.complete);
    this.complete.subscribe(this.updateServer);
};

var TodoListViewModel = function() {
    var self = this;
    this.todoItems = ko.observableArray();
    this.refresh = function() {
        //make a call to the server...
        $.getJSON("/api/todos", function(items) {
            //...and update the todoItems collection when the call returns
            var newItems = [];
            for (var i=0; i < items.length; i++ ){
                newItems.push(new TodoViewModel(items[i]));
            }
            self.todoItems(newItems);
        });
    };

    this.updateServer = function() {
        return $.ajax({
            url: "/api/todos/" + data.id,
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify({
                id: data.id,
                name: self.name(),
                complete: self.complete()
            })
        });
    };

    //refresh immediately to load initial data
    this.refresh();
};

$(function() {
    var viewModel = new TodoListViewModel();

    ko.applyBindings(viewModel);
});