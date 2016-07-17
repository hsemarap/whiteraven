function Story(data) {
	this.url = ko.observable(data.url);
	this.title = ko.observable(data.title);
	this.description = ko.observable(data.description);
	this.tags = ko.observable(data.tags);
	this.addedBy = ko.observable(data.addedBy);
	this.createdAt = ko.observable(data.createdAt);
	this.updatedAt = ko.observable(data.updatedAt);
	this.tweet_id = ko.observable(data.tweet_id);

	this.isTweet = function() {
		return (this.description()?true:false);
	}
}

function NewsFeedViewModel() {
	var self=this;
	self.storyTitle = ko.observable("");
	self.storyUrl = ko.observable("");
	self.storyDescription = ko.observable("");
	self.stories = ko.observable([]);

	self.addStory = function() {
		var tempObj = {title: this.storyTitle(), url: this.storyUrl(), description: this.storyDescription()}
		self.stories.push(new Story(tempObj));
		$.post("/api/stories",tempObj);
	}
	self.getStories = function() {
		$.get("/api/stories", function(data) {
			temp = [];
			data.forEach(function(item) {
				temp.push(new Story(item));				
			});
			self.stories(temp);
		});
	}
	self.getStories();
}

ko.applyBindings(new NewsFeedViewModel());