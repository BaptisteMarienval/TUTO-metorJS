
Tasks = new Mongo.Collection("tasks");
Users = new Mongo.Collection("users");


Meteor.methods({
  insertUser: function(user) {
    newUser = Users.insert({
      name: user.name,
      color: user.color,
      email: user.email,
      createdAt: Date.now()
    }, function(error, result) {});

    return newUser;

  },

  removeTask: function(task) {
    Tasks.remove(task.id);
  },


  // Insert a task into the collection
  updateTask: function(task) {
    Tasks.update(task.id, {
      $set: {
        status: task.status,
        color: task.color,
        user: task.user
      }
    });
  },


  // Insert a task into the collection
  insertTask: function(task) {
    newTask = Tasks.insert({
      libelle: task.libelle,
      priority: task.priority,
      user: task.user,
      color: task.color,
      status: task.status,
      createdAt: new Date() // current time
    }, function(error, result) {

    });
    return newTask;
  }
})
