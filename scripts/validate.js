const myObject = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

const enableValidation = ({formSelector, inputSelector, submitButtonSelector, 
    inactiveButtonClass, inputErrorClass, errorClass}) => {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonSubmit = formElement.querySelector(submitButtonSelector);
        console.log(inputList);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', (evt) => {
            const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
            console.log(errorElement);
            if(inputElement.validity.valid) {
                inputElement.classList.remove(inputErrorClass);
                errorElement.classList.remove(errorClass);
                errorElement.textContent = '';
            } else {
                inputElement.classList.add(inputErrorClass);
                errorElement.classList.add(errorClass);
                errorElement.textContent = inputElement.validationMessage;
            }
            buttonSubmit.disabled = true;
            const isFormValid = inputList.some((inputElement) => !inputElement.validity.valid);
            if(!isFormValid) {
                buttonSubmit.classList.remove(inactiveButtonClass);
                buttonSubmit.disabled = false;
            } else {
                buttonSubmit.classList.add(inactiveButtonClass);
                buttonSubmit.disabled = true;
            }
        })
    })
    })
}

enableValidation(myObject);