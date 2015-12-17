if (Meteor.isClient) {
  var currentUserName = "";
  var currentUserColor = "";


  Template.home.helpers({
    isLogged: function() {
      if (Session.get("userId")) {

        var currentUser = Users.findOne({
          _id: Session.get("userId")
        });
        if (currentUser) {
          console.log("user courant : " + currentUser);
          return {
            _id: currentUser._id,
            name: currentUser.name,
            color: currentUser.color
          }
        }
      } else {
        return null
      }
    }
  });

  Template.inscription.events({
    'click .btn': function(event) {
      event.preventDefault();
      var name = $('#name').val();
      var color = $('#color').val();
      var email = $('#email').val();

      user = Users.insert({
        name: name,
        color: color,
        email: email,
        createdAt: Date.now()
      }, function(error, result) {
        if (result) {

          Session.setPersistent("userId", result);

          currentUserName = name;
          currentUserColor = color;
          console.log("New User : " + name);
        }
      });
    }
  });


  Template.submitTask.events({
    "submit #formTask": function(event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var libelle = event.target.libelle.value;
      var priority = event.target.priority.value;


      var user = currentUserName;
      var color = currentUserColor;

      // Insert a task into the collection
      Tasks.insert({
        libelle: libelle,
        priority: priority,
        user: user,
        color: color,
        afaire: true,
        encours: false,
        avalider: false,
        terminee: false,
        createdAt: new Date() // current time
      });

      console.log("New tache : " + libelle);
      // Clear form
      event.target.libelle.value = "";
    },
  });

  Template.tasksList.helpers({
    tasks: function() {
      return Tasks.find({}, {
        sort: {
          priority: 1,
          createdAt: -1
        }
      });
    }
  });


  Template.tasksList.events({
    "click .delete": function() {
      Tasks.remove(this._id);
    },


    "click .moveAfaire": function() {
      Tasks.update(this._id, {
        $set: {
          afaire: true,
          encours: false,
          avalider: false,
          terminee: false
        }
      });
    },

    "click .moveEnCours": function() {
      Tasks.update(this._id, {
        $set: {
          afaire: false,
          encours: true,
          avalider: false,
          terminee: false
        }
      });
    },

    "click .moveAvalider": function() {
      Tasks.update(this._id, {
        $set: {
          afaire: false,
          encours: false,
          avalider: true,
          terminee: false
        }
      });
    },
    "click .moveTerminee": function() {
      Tasks.update(this._id, {
        $set: {
          afaire: false,
          encours: false,
          avalider: false,
          terminee: true
        }
      });
    }
  });



}

if (Meteor.isServer) {
  Meteor.startup(function() {
    // code to run on server at startup
  });
}
