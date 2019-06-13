

/*
 * This function checks whether all of the required inputs were supplied by
 * the user and, if so, inserts a new twit into the page using these inputs.
 * If the user did not supply a required input, they instead recieve an alert,
 * and no new workout is inserted.
 */
 function handleModalAcceptClick() {

  var workout_name = document.getElementById('workout-name-input').value.trim();
  var routine = document.getElementById('workout-text-input').value.trim();
	var workout_creator = document.getElementById('workout-creator-input').value.trim();

  if (!workout_name || !routine || !workout_creator) {
    alert("You must fill in all of the fields!");
  } else {

    var postRequest = new XMLHttpRequest();
    var requestURL = '/workoutPage/addWorkout';
    postRequest.open('POST', requestURL);

    var requestBody = JSON.stringify({
      name: workout_name,
      routine: routine,
			creator: workout_creator
    });

    postRequest.addEventListener('load', function (event) {
      if (event.target.status === 200) {
        var workoutTemplate = Handlebars.templates.workoutTemplate;
        var newWorkoutHTML = workoutTemplate({
					name: workout_name,
					routine: routine,
					creator: workout_creator
        });
        var workoutContainer = document.querySelector('.workout-container');
        workoutContainer.insertAdjacentHTML('beforeend', newWorkoutHTML);
      } else {
        alert("Error storing workout: " + event.target.response);
      }
    });

    postRequest.setRequestHeader('Content-Type', 'application/json');
    postRequest.send(requestBody);

    hideCreateWorkModal();

  }

}

/*
 * This function shows the modal to create a twit when the "create twit"
 * button is clicked.
 */
function showCreateWorkModal() {

  document.getElementById('modal-backdrop').classList.remove('hidden');
  document.getElementById('create-workout-modal').classList.remove('hidden');

}


/*
 * This function clears any value present in any of the twit input elements.
 */
function clearWorkoutInputValues() {

  document.getElementById('workout-text-input').value = "";
	document.getElementById('workout-name-input').value = "";
  document.getElementById('workout-creator-input').value ="";

}


/*
 * This function hides the modal to create a twit and clears any existing
 * values from the input fields whenever any of the modal close actions are
 * taken.
 */
function hideCreateWorkModal() {

  document.getElementById('modal-backdrop').classList.add('hidden');
  document.getElementById('create-workout-modal').classList.add('hidden');

  clearWorkoutInputValues();

}

window.addEventListener('DOMContentLoaded', function () {


  var addingWorkout = document.getElementById('create-workout-button');
  if (addingWorkout) {
    addingWorkout.addEventListener('click', showCreateWorkModal);
  }

  var closingtheModal = document.querySelector('#create-workout-modal .modal-close-button');
  if (closingtheModal) {
    closingtheModal.addEventListener('click', hideCreateWorkModal);
  }

  var canceling = document.querySelector('#create-workout-modal .modal-cancel-button');
  if (canceling) {
    canceling.addEventListener('click', hideCreateWorkModal);
  }

  var accept = document.querySelector('#create-workout-modal .modal-accept-button');
  if (accept) {
    accept.addEventListener('click', handleModalAcceptClick);
  }


});
