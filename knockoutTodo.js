/* Module for Address Book application */
var Mytodo = (function () {
  /*--------------------*/

  n = new Date();
  y = n.getFullYear();
  m = n.getMonth() + 1;
  d = n.getDate();

  /*-----------*/

  var task = {
    name: ko.observable(),
    Description: ko.observable(),
    date: ko.observable(d + "/" + m + "/" + y),
    priority: ko.observable(1),
  };

  /*--observable ARRAY to hold task-*/

  var tasks = ko.observableArray();
  var visi = ko.observable(null);

  /* ----------add members here -----------*/

  var addTask = function () {
    console.log("Adding new contact with name: " + task.name() + " and Description: " + task.Description() + "and date" + task.date());
    console.log("addTask");

    if (task.name() && task.Description()) {
      var paylaod = { name: task.name(), Description: task.Description(), date: task.date(), priority: task.priority(), status: ko.observable("new") };
      tasks.push(ko.toJS(paylaod));
      console.log(paylaod);
      setLocalstorage(ko.toJS(paylaod));

      clearTask();

      visi(false);
    } else {
      console.log("error report");

      visi(true);
    }
  };

  /*-------------Local Storage function--------------------*/

  var setLocalstorage = function (payload) {
    console.log("setLocal Worded");
    console.log(payload);
    let data;

    if (localStorage.getItem("payload") == null) {
      data = [];
    } else {
      data = JSON.parse(localStorage.getItem("payload"));
    }

    data.push(payload);

    localStorage.setItem("payload", JSON.stringify(data));
  };

  var getLocalStorage = function () {
    let data;
    console.log("getLocalled Worked");
    if (localStorage.getItem("payload") === null) {
      data = [];
    } else {
      data = JSON.parse(localStorage.getItem("payload"));
    }

    console.log(data.length);

    for (let i = 0; i < data.length - 1; i++) {
      tasks.push(data[i]);

      console.log("lopped one", data[i]);
    }

    console.log("point", data);
  };
  /*-------------sorting by name,priority ---------------------*/

  var sortByPriority = function () {
    console.log("Sorting tasks by priority");
    tasks.sort(function (left, right) {
      return left.priority == right.priority ? 0 : left.priority < right.priority ? -1 : 1;
    });
  };

  var sortByName = function () {
    console.log("Sorting tasks by name");
    tasks.sort(function (left, right) {
      return left.name == right.name ? 0 : left.name < right.name ? -1 : 1;
    });
  };

  /*-------helper fuction---------*/

  var clearTask = function () {
    console.log("clear Method");
    task.name(null);
    task.Description(null);
    task.priority("1");
  };

  var deleteTask = function (task) {
    console.log("task", task.name);
    tasks.remove(task);
    console.log("deleted");
  };

  var completeTask = function (task) {
    console.log("task completed ");

    task.status("complete");
  };

  /*----Initialization of DOM[On every DOM Update]-----*/

  var init = function () {
    /*------------add code to initialize this module------------*/
    console.log("Onload");
    getLocalStorage();
    visi(false);
    ko.applyBindings(Mytodo);
  };

  /*--------------------------------------*/

  $(init);
  return {
    /* ----------add members that will be exposed publicly---- */
    visi: visi,
    task: task,
    tasks: tasks,
    addTask: addTask,
    deleteTask: deleteTask,
    completeTask: completeTask,
    sortByName: sortByName,
    sortByPriority: sortByPriority,
  };
})();
