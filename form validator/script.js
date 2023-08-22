const form = document.getElementById("form");
const userName = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassowrd = document.getElementById("password2");

//show input error message
function showError(input, message) {
  const controlForm = input.parentElement;
  controlForm.className = "control-form error";
  const small = controlForm.querySelector("small");
  small.innerText = message;
}

//show input success message
function showSuccess(input) {
  const controlForm = input.parentElement;
  controlForm.className = "control-form success";
}

//validate email
function checkEmail(input) {
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (re.test(String(input.value.trim()).toLowerCase())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not vaild");
  }
}
// check required
function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}
//check length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min}`);
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than ${max}`);
  } else {
    showSuccess(input);
  }
}
//check match password
function matchPassword(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Password do not match");
  }
}
//Get field name
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
//Event listeners

form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkRequired([userName, email, password, confirmPassowrd]);
  checkLength(userName, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  matchPassword(password, confirmPassowrd);
});
