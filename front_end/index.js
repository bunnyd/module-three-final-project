document.addEventListener('DOMContentLoaded', () => {

})


submitUserForm = document.getElementById("sign-up")

submitUserForm.addEventListener("submit", (event) => {
  event.preventDefault()
  let userFirstName = event.target[0].value
  let userLastName = event.target[1].value
  let userEmailAddress = event.target[2].value
  let userUserName = event.target[3].value
  fetch("http://localhost:3000/api/v1/users",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      first_name: userFirstName,
      last_name: userLastName,
      email: userEmailAddress,
      username: userUserName
    })
  })

})

// -------------------------------------------------------
// Check if user wants to login
// -------------------------------------------------------

// Listen for "Have an account link?" click
document.getElementById('login-link').addEventListener('click', function(event) {
  // Hide sign-up div
  document.getElementById('sign-up-div').style.display = 'none';

  // Show login div
  document.getElementById('login-div').style.display = 'block';

  event.preventDefault();
});

// -------------------------------------------------------
// Check if user wants to sign up
// -------------------------------------------------------

// Listen for "sign up link?" click
document.getElementById('signup-link').addEventListener('click', function(event) {
  // Hide sign-up div
  document.getElementById('login-div').style.display = 'none';

  // Show login div
  document.getElementById('sign-up-div').style.display = 'block';

  event.preventDefault();
});



// -------------------------------------------------------
// YELP API
// -------------------------------------------------------

searchForm = document.getElementById('search-form')

//event listener
searchForm.addEventListener('submit', searchFood)


function searchFood(event){
  event.preventDefault();
  // debugger

  let searchFoodType = event.target[0].value;
  let searchZipCode = event.target[1].value;
  let searchPriceRange = event.target[2].value;
  let searchRating = event.target[3].value;




  // fetch(yelpURL, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Accept": "application/json",
  //     "Authorization": `Bearer ${yelpAPIKey}`
  //   }
  // })


}



// -------------------------------------------------------
// WHEEL FUNCTIONALITY
// -------------------------------------------------------

document.getElementById('spin-button').addEventListener('click', startSpin());


// Vars used by the code in this page to do power controls.
var wheelPower = 0;
var wheelSpinning = false;

// -------------------------------------------------------
// Click handler for spin button.
// -------------------------------------------------------
function startSpin() {
  // // Ensure that spinning can't be clicked again while already running.
  // if (wheelSpinning == false) {
  //   // Based on the power level selected adjust the number of spins for the wheel, the more times is has
  //   // to rotate with the duration of the animation the quicker the wheel spins.
  //   if (wheelPower == 1) {
  //     theWheel.animation.spins = 3;
  //   } else if (wheelPower == 2) {
  //     theWheel.animation.spins = 8;
  //   } else if (wheelPower == 3) {
  //     theWheel.animation.spins = 15;
  //   }
  // }

  wheelPower == 2
  theWheel.animation.spins = 15;

  // // Disable the spin button so can't click again while wheel is spinning.
  // document.getElementById('spin_button').src = "http://dougtesting.net//elements/images/examples/spin_off.png";
  // document.getElementById('spin_button').className = "";

  // Begin the spin animation by calling startAnimation on the wheel object.
  theWheel.startAnimation();

  // Set to true so that power can't be changed and spin button re-enabled during
  // the current animation. The user will have to reset before spinning again.
  wheelSpinning = true;

}

// -------------------------------------------------------
// Function for reset button.
// -------------------------------------------------------
function resetWheel() {
  theWheel.stopAnimation(false); // Stop the animation, false as param so does not call callback function.
  theWheel.rotationAngle = 0; // Re-set the wheel angle to 0 degrees.
  theWheel.draw(); // Call draw to render changes to the wheel.

  document.getElementById('pw1').className = ""; // Remove all colours from the power level indicators.
  document.getElementById('pw2').className = "";
  document.getElementById('pw3').className = "";

  wheelSpinning = false; // Reset to false to power buttons and spin can be clicked again.
}

//Yelp API
//
