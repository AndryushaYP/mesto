const myObject = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

//Проверка валидности полей

const setEventListener = (formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {

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
            
            toggleButtonState(inputList, buttonSubmit, {inactiveButtonClass});
        })
    })

}

// Невалидность поля

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      });
    }


//Валидация кнопки

const toggleButtonState = (inputList, buttonSubmit, {inactiveButtonClass}) => {

            if(hasInvalidInput(inputList)) {
                buttonSubmit.classList.add(inactiveButtonClass);
                buttonSubmit.disabled = true;
                
            } else {
                buttonSubmit.classList.remove(inactiveButtonClass);
                buttonSubmit.disabled = false;
            }
        }


//Включение валидации

const enableValidation = ({formSelector, inputSelector, submitButtonSelector, 
    inactiveButtonClass, inputErrorClass, errorClass}) => {

    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

    setEventListener(formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass});

    })
}

enableValidation(myObject);