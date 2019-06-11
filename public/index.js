
function insertNewworkout(workout, theAuthor) {


	var workoutcontext = {
  		workout: workout,
 		author: theAuthor
	};

	var workoutTemplateHTML = Handlebars.templates.workoutTemplate(workoutcontext);


	 var workout_t = document.getElementById('twit-text-input');
	workout_t.insertAdjacentHTML('beforeend', workoutTemplateHTML);

}


var Everyworkout = [];

/*
 * This function checks whether all of the required inputs were supplied by
 * the user and, if so, inserts a new twit into the page using these inputs.
 * If the user did not supply a required input, they instead recieve an alert,
 * and no new workout is inserted.
 */
function handleModalAcceptClick() {

  var workout = document.getElementById('workout-text-input').value;
  var theAuthor = document.getElementById('workout-author-input').value;

  /*
   * Only generate the new twit if the user supplied values for both the twit
   * text and the twit attribution.  Give them an alert if they didn't.
   */
    if(workout.length == 0 || theAuthor.length == 0){
    alert("Please fill all the parts!")
  }
  else {

      Everyworkout.push({
      workout: workout,
      author: theAuthor
    });


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
  document.getElementById('workout-attribution-input').value ="";

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
