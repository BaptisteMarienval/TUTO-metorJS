Meteor.publish("tasks", function() {
  return Tasks.find();
});

Meteor.publish("users", function() {
  return Users.find();
});
