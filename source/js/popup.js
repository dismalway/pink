 var popupHit = document.querySelector(".popup--hit");
 var popupError = document.querySelector(".popup--error");
 var surname = document.querySelector("[id=fieldset-surname]");
 var firstname = document.querySelector("[id=fieldset-firstname]");
 var email = document.querySelector("[id=fieldset-email]");
 var form = document.querySelector(".worksheet-form");
 
 var buttonHit = popupHit.querySelector(".popup__button--hit");
 var buttonError = popupError.querySelector(".popup__button--error");
 
form.addEventListener("submit", function(evt) {
	if (surname.value && firstname.value && email.value) {
		evt.preventDefault();
		popupHit.offsetWidth = popupHit.offsetWidth;
		popupHit.classList.add("popup--show");
	}  
  else {
    evt.preventDefault();
		popupError.offsetWidth = popupError.offsetWidth;
    popupError.classList.add("popup--show");
  }
});

buttonHit.addEventListener("click", function(evt) {
	evt.preventDefault();
	popupHit.classList.remove("popup--show");
});

buttonError.addEventListener("click", function(evt) {
	evt.preventDefault();
	popupError.classList.remove("popup--show");
});

window.addEventListener("keydown", function(evt) {
	if (evt.keyCode === 27) {
		if (popupHit.classList.contains("popup--show")) {
			popupHit.classList.remove("popup--show");
		}
    
    if (popupError.classList.contains("popup--show")) {
			popupError.classList.remove("popup--show");
		}
	}
});