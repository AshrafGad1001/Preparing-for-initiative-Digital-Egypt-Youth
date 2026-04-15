const form = document.getElementById("contactForm");
const userName = document.getElementById("userName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const message = document.getElementById("message");

// Functiom To Show Error
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";

  const span = formControl.querySelector("span");
  span.innerText = message;
}

// Functiom To Show Success
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control";
}

form.addEventListener("submit", function (e) {
  let isValid = true;

  //UserName Validation......

  if (userName.value.trim() === "") {
    showError(userName, "UserName Is Required......");
    isValid = false;
  } else {
    showSuccess(userName);
  }

  //Email Validation......

  if (email.value.trim() === "") {
    showError(email, "Email Is Required......");
    isValid = false;
  } else {
    showSuccess(email);
  }

  //MobilNumber Validation......
  const egyptPhoneRegex = /^(010|011|012|015)[0-9]{8}$/;

  if (phone.value.trim() === "") {
    showError(phone, "Mobil Number Is Required......");
    isValid = false;
  } else if (!egyptPhoneRegex.test(phone.value.trim())) {
    showError(phone, "Invalid Egyptian Mobile Number......");
    isValid = false;
  } else {
    showSuccess(phone);
  }

  //Message Validation......

  if (message.value.trim() === "") {
    showError(message, "message Is Required......");
    isValid = false;
  } else {
    showSuccess(message);
  }

  if (isValid === false) {
    e.preventDefault();
  }
});
