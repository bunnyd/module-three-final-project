document.addEventListener('DOMContentLoaded', () => {

})

// -------------------------------------------------------
// Create variables for sign-in, login, and search forms/divs
// -------------------------------------------------------
signupUserDiv = document.getElementById("sign-up-div");
loginUserDiv = document.getElementById("login-div");

signupUserForm = document.getElementById("sign-up");
loginUserForm = document.getElementById("login");

searchDiv = document.getElementById('search-div');
searchForm = document.getElementById('search-form');

// -------------------------------------------------------
// Check if user has a session
// -------------------------------------------------------
if (sessionStorage.getItem("id")) {
  // Hide sign-up div
  document.getElementById('sign-up-div').style.display = 'none';

  // Hide login div
  document.getElementById('login-div').style.display = 'none';

  // Show search div
  document.getElementById('search-div').style.display = 'block';
} else {
  // Show sign-up div
  document.getElementById('sign-up-div').style.display = 'block';
}

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
// Submit login form
// -------------------------------------------------------
loginUserForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let userEmailAddress = event.target[0].value;

  fetch("http://localhost:3000/api/v1/users/login", {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: userEmailAddress
      })
    })
    .then(resp => resp.json())
    .then(user => createSession(user, userEmailAddress))
})

// -------------------------------------------------------
// Create session after user logs in
// -------------------------------------------------------

function createSession(user, userEmailAddress) {
  loginUserForm.reset(); //Reset login User Form
  if (user.email.toLowerCase() === userEmailAddress.toLowerCase()) {

    sessionStorage.setItem("id", user.id);

    // no errors, display successful message
    showAlert(searchDiv, searchForm, `Logged in as ${userEmailAddress}.`, "success")

    // Hide login and signup div
    document.getElementById('login-div').style.display = 'none';
    document.getElementById('sign-up-div').style.display = 'none';

    // Show search div
    document.getElementById('search-div').style.display = 'block';

  } else {
    // alert("Please enter a valid email address.")
    showAlert(loginUserDiv, loginUserForm, "You don't have an account. Please sign up.", "error")

  }
} //end createSession function

// -------------------------------------------------------
// Submit Sign-up Form
// -------------------------------------------------------
signupUserForm.addEventListener("submit", (event) => {
  event.preventDefault()
  let userFirstName = event.target[0].value
  let userLastName = event.target[1].value
  let userUserName = event.target[2].value
  let userEmailAddress = event.target[3].value

  fetch("http://localhost:3000/api/v1/users", {
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
    .then(resp => resp.json())
    .then(message => signupMessage(message, userEmailAddress))

})//end signupUserForm event listener

// -------------------------------------------------------
// Display Success/Error Message
// -------------------------------------------------------
function showAlert(div_id, form, message, errorTypeClass) {
  // //create div
  // const div = document.createElement('div');

  // // Add classes
  // div.className = `alert ${errorTypeClass}`;

  //create span
  const span = document.createElement('span');

  // Add classes
  span.className = `span-center txt6 m-10 alert ${errorTypeClass}`;

  // Add span
  span.innerHTML += `${message}`;
  //
  //Add Text
  // span.appendChild(document.createTextNode(message));

  // Insert Alert
  div_id.insertBefore(span, form);

  // Timeout after 5 seconds
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 20000);


}//end showAlert

// -------------------------------------------------------
// Display Sign-up message
// -------------------------------------------------------
function signupMessage(message, email) {
  //
  if (message.success) {
    // no errors, display successful message
    showAlert(loginUserDiv, loginUserForm, `Account for ${email} has been added!`, "success")

    // hide signup form and display login

    document.getElementById('sign-up-div').style.display = 'none';
    document.getElementById('login-div').style.display = 'block';
  }
  else {

    showAlert(signupUserDiv, signupUserForm, JSON.stringify(message), "error")
  }

}//end signupMessage function


// -------------------------------------------------------
// YELP API
// -------------------------------------------------------
searchForm.addEventListener('submit', searchFood);

function searchFood(event) {
  event.preventDefault();

  if (sessionStorage.getItem("id")) {
    let searchFoodType = event.target[0].value;
    let searchZipCode = event.target[1].value;
    let searchPriceRange = event.target[2].value;

    //this is what puts the restaurants on the wheel.
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
          search_price_range: searchPriceRange
        })
      })
      .then(resp => resp.json())
      .then(restaurants => displayRestaurants(restaurants))
    }
    else {
      alert("Please log in.")
    }
}

function displayRestaurants(restaurants) {
  const wheel = document.getElementById("wheel");
  console.log(restaurants)
  var businesses = restaurants.businesses

  var length = 22;

  function selectedRestaurant(randomlySelectedRestaurant) {
    alert("Would you like to eat at " + randomlySelectedRestaurant.text + "?");

    document.getElementById('accept-wheel-link').addEventListener('click', event => acceptRestaurant(event, randomlySelectedRestaurant));
  }


  // -------------------------------------------------------
  // Function for accept button.
  // -------------------------------------------------------
  function acceptRestaurant(event, acceptedRestaurant) {
    event.preventDefault();
    //Save to backend - user and restaurant name, location,

    // fetch => post to the restaurants URL
    restaurantId = acceptedRestaurant.id

    businesses.forEach(business => {
      if (acceptedRestaurant.id === business.id){

        //creates restaurant object if the user presses accept
        fetch(`http://localhost:3000/api/v1/users/${sessionStorage.getItem("id")}`, {
          method: "PATCH",
          credentials: 'same-origin',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            restaurants_attributes: [{name: business.name,
            address: business.location.address1,
            food_type: business.categories[0].alias,
            price_range: business.price,
            rating: business.rating}]
          })
        })//end fetch
        .then(res => res.json())
        .then(console.log)
//        .then(restaurant => addRestaurantToUser(restaurant))
      }//end if (acceptedRestaurant.id === restaurantId)
    })//end businesses.forEach
  }//end acceptRestaurant function

  function addRestaurantToUser(restaurant) {
    // fetch => post to the user_restaurants URL to associate with user
    // Can't post to this URL because we don't have the data from the Yelp API.
    // how do we get data?
    console.log(sessionStorage.getItem("id"))
    fetch(`http://localhost:3000/api/v1/users/${sessionStorage.getItem("id")}`, {
      method: "PUT",
      credentials: 'same-origin',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        restaurant_id: restaurant.id,
        user_id: sessionStorage.getItem("id")
      })
    })
  }



  var theWheel = new Winwheel({
    'outerRadius': 190, // Set outer radius so wheel fits inside the background.
    'innerRadius': 20, // Make wheel hollow so segments dont go all way to center.
    'textFontSize': 13, // Set default font size for the segments.
    'textOrientation': 'horizontal', // Make text vertial so goes down from the outside of wheel.
    'textAlignment': 'inner', // Align text to outside of wheel.
    'numSegments': 7, // Specify number of segments.
    'segments': // Define segments including colour and text.
      [ // font size and text colour overridden on backrupt segments.
        {
          'fillStyle': '#ee1c24',
          'id': businesses[0].id,
          'text': businesses[0].name.length > length ? businesses[0].name.substring(0, length - 2) + "..." : businesses[0].name
        },
        {
          'fillStyle': '#3cb878',
          'id': businesses[1].id,
          'text': businesses[1].name.length > length ? businesses[1].name.substring(0, length - 2) + "..." : businesses[1].name
        },
        {
          'fillStyle': '#f6989d',
          'id': businesses[2].id,
          'text': businesses[2].name.length > length ? businesses[2].name.substring(0, length - 2) + "..." : businesses[2].name
        },
        {
          'fillStyle': '#00aef0',
          'id': businesses[3].id,
          'text': businesses[3].name.length > length ? businesses[3].name.substring(0, length - 2) + "..." : businesses[3].name
        },
        {
          'fillStyle': '#f26522',
          'id': businesses[4].id,
          'text': businesses[4].name.length > length ? businesses[4].name.substring(0, length - 2) + "..." : businesses[4].name
        },
        {
          'fillStyle': '#fff200',
          'id': businesses[5].id,
          'text': businesses[5].name.length > length ? businesses[5].name.substring(0, length - 2) + "..." : businesses[5].name
        },
        {
          'fillStyle': '#00aef0',
          'id': businesses[6].id,
          'text': businesses[6].name.length > length ? businesses[6].name.substring(0, length - 2) + "..." : businesses[6].name
        },
        {
          'fillStyle': '#00aef0',
          'id': businesses[7].id,
          'text': businesses[7].name.length > length ? businesses[7].name.substring(0, length - 2) + "..." : businesses[7].name
        }
      ],
    'animation': // Specify the animation to use.
    {
      'type': 'spinToStop',
      'duration': 8,
      'spins': 3,
      'callbackFinished': selectedRestaurant,
      'soundTrigger': "pin"
    }
  })

  // Wheel event listeners
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
