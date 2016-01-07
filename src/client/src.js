Meteor.subscribe("tasks");
Meteor.subscribe("users");

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
      console.log("Ajout d'un nouvel utilisateur");
    event.preventDefault();
    var name = $('#name').val();
    var color = $('#color').val();
    var email = $('#email').val();

    Meteor.call("insertUser", {
      name: name,
      coler: color,
      email: email
    }, function(error, result) {
      if (error) {
        console.log("error", error);
      }
      if (result) {
        console.log("New User : " + name);
        Session.setPersistent("userId", result);
        Session.setPersistent("color", color);
        Session.setPersistent("name", name);
      }
    });

  }
});


Template.submitTask.events({
  "submit #formTask": function(event) {

    console.log("Ajout d'une nouvelle tache");

    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var libelle = event.target.libelle.value;
    var priority = event.target.priority.value;


    var user = Session.get("name");
    var color = Session.get("color");

    Meteor.call("insertTask", {
      libelle: libelle,
      priority: priority,
      user: user,
      status: "afaire",
      color: color
    }, function(error, result) {
      if (error) {
        console.log("error", error);
      }
      if (result) {
        console.log("New tache : " + libelle);
      }
    });

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
  },

  afaire: function() {
    return (this.status == "afaire")
  },

  encours: function() {
    return (this.status == "encours")
  },

  avalider: function() {
    return (this.status == "avalider")
  },

  terminee: function() {
    return (this.status == "terminee")
  }
});


Template.tasksList.events({
  "click .delete": function() {


    console.log("Suppression d'une tache");

  Meteor.call("removeTask", {
    id: this._id
  }, function(error, result) {
    if (error) {
      console.log("error", error);
    }
    if (result) {
      console.log("Del tache");
    }
  });
},
"click .moveAfaire": function() {

  Meteor.call("updateTask", {
    id: this._id,
    status: "afaire",
    color: Session.get("color"),
    user: Session.get("name")
  }, function(error, result) {
    if (error) {
      console.log("error", error);
    }
    if (result) {
      console.log("tache updated : " + libelle);
    }
  });
},

"click .moveEnCours": function() {
  Meteor.call("updateTask", {
    id: this._id,
    status: "encours",
    color: Session.get("color"),
    user: Session.get("name")
  }, function(error, result) {
    if (error) {
      console.log("error", error);
    }
    if (result) {
      console.log("tache updated : " + libelle);
    }
  });
},

"click .moveAvalider": function() {
  Meteor.call("updateTask", {
    id: this._id,
    status: "avalider",
    color: Session.get("color"),
    user: Session.get("name")
  }, function(error, result) {
    if (error) {
      console.log("error", error);
    }
    if (result) {
      console.log("tache updated : " + libelle);
    }
  });
},
"click .moveTerminee": function() {
  Meteor.call("updateTask", {
    id: this._id,
    status: "terminee",
    color: Session.get("color"),
    user: Session.get("name")
  }, function(error, result) {
    if (error) {
      console.log("error", error);
    }
    if (result) {
      console.log("tache updated : " + libelle);
    }
  });
}
});
