document.addEventListener('DOMContentLoaded', () => {

})


signupUserForm = document.getElementById("sign-up");
loginUserForm = document.getElementById("login");

loginUserForm.addEventListener("submit", (event) => {
  event.preventDefault()
  let userEmailAddress = event.target[0].value;
  fetch("http://localhost:3000/api/v1/users/login", {
     method: 'POST',
     credentials: 'same-origin',
     headers: {
       'Content-Type': 'application/json',
       'Accept': 'application/json'
     },
     body: JSON.stringify({email: userEmailAddress})
  })
    .then(resp => resp.json())
    .then(user => createSession(user, userEmailAddress))
  //Make session request
})

function createSession(user,userEmailAddress){
  loginUserForm.reset(); //Reset login User Form
  if (user.email === userEmailAddress) {
    sessionStorage.setItem("id", user.id);
    // Hide login and signup div
    document.getElementById('login-div').style.display = 'none';
    document.getElementById('sign-up-div').style.display = 'none';
  } else {
    alert("Please enter a valid email address.")
  }
}//end validateUser

signupUserForm.addEventListener("submit", (event) => {
  event.preventDefault()
  let userFirstName = event.target[0].value
  let userLastName = event.target[1].value
  let userUserName = event.target[2].value
  let userEmailAddress = event.target[3].value

  fetch("http://localhost:3000/api/v1/users",{
    method: "POST",
    credentials: 'same-origin',
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
  // Hide login div
  document.getElementById('login-div').style.display = 'none';

  // Show signup div
  document.getElementById('sign-up-div').style.display = 'block';

  event.preventDefault();
});



// -------------------------------------------------------
// YELP API
// -------------------------------------------------------

searchForm = document.getElementById('search-form');
//event listener
searchForm.addEventListener('submit', searchFood);


function searchFood(event){
  event.preventDefault();
  // debugger

  let searchFoodType = event.target[0].value;
  let searchZipCode = event.target[1].value;
  let searchPriceRange = event.target[2].value;
  let searchRating = event.target[3].value;

  fetch("http://localhost:3000/api/v1/users/search", {
    method: "POST",
    credentials: 'same-origin',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      search_food_type: searchFoodType,
      search_zip_code: searchZipCode,
      search_price_range: searchPriceRange,
      search_rating: searchRating
    })
  })
      .then(resp => resp.json())
      .then(restaurants => displayRestaurants(restaurants))
}

function displayRestaurants(restaurants){
  const wheel = document.getElementById("wheel");

  var businesses = restaurants.businesses

  var theWheel = new Winwheel({
      'outerRadius'     : 190,        // Set outer radius so wheel fits inside the background.
      'innerRadius'     : 50,         // Make wheel hollow so segments dont go all way to center.
      'textFontSize'    : 12,         // Set default font size for the segments.
      'textOrientation' : 'horizontal', // Make text vertial so goes down from the outside of wheel.
      'textAlignment'   : 'inner',    // Align text to outside of wheel.
      'numSegments'     : 7,         // Specify number of segments.
      'segments'        :             // Define segments including colour and text.
      [                               // font size and text colour overridden on backrupt segments.
         {'fillStyle' : '#ee1c24', 'text' : businesses[0].name},
         {'fillStyle' : '#3cb878', 'text' : businesses[1].name},
         {'fillStyle' : '#f6989d', 'text' : businesses[2].name},
         {'fillStyle' : '#00aef0', 'text' : businesses[3].name},
         {'fillStyle' : '#f26522', 'text' : businesses[4].name},
         {'fillStyle' : '#fff200', 'text' : businesses[5].name},
         {'fillStyle' : '#00aef0', 'text' : businesses[6].name}
      ],
      'animation' :           // Specify the animation to use.
      {
          'type'     : 'spinToStop',
          'duration' : 8,
          'spins'    : 3,
          'callbackFinished' : alertPrize
      }
  });

  document.getElementById('spin-button').addEventListener('click', startSpin);
  document.getElementById('reset-wheel-link').addEventListener('click', resetWheel);

  // Vars used by the code in this page to do power controls.
  var wheelPower = 0;
  var wheelSpinning = false;

  // -------------------------------------------------------
  // Click handler for spin button.
  // -------------------------------------------------------
  function startSpin() {
    wheelPower = 2
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
  function resetWheel(event) {
    event.preventDefault();
    theWheel.stopAnimation(false); // Stop the animation, false as param so does not call callback function.
    theWheel.rotationAngle = 0; // Re-set the wheel angle to 0 degrees.
    theWheel.draw(); // Call draw to render changes to the wheel.
    wheelSpinning = false; // Reset to false to power buttons and spin can be clicked again.
  }


}
// Called when the animation has finished.
function alertPrize(indicatedSegment)
{
  alert("Enjoy your meal at " + indicatedSegment.text + "!");
    // // Display different message if win/lose/backrupt.
    // if (indicatedSegment.text == 'LOOSE TURN')
    // {
    //     alert('Sorry but you loose a turn.');
    // }
    // else if (indicatedSegment.text == 'BANKRUPT')
    // {
    //     alert('Oh no, you have gone BANKRUPT!');
    // }
    // else
    // {
    //     alert("You have won " + indicatedSegment.text);
    // }
}


// -------------------------------------------------------
// WHEEL FUNCTIONALITY
// -------------------------------------------------------




// Got the session
//search while the user is logged in
//user sessionStorage.getItem("email") to check the session
//search and iterate through yelp API
//save results to restaurant database
