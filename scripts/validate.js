const myObject = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

//Показать ошибку

const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass}) => {

    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);

    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
}

//Скрыть ошибку

const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => {

    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);

    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(errorClass);
}

// Проверка валдиности полей

const checkInputValidity = (formElement, inputElement, {inputErrorClass, errorClass}) => {
    
        if(!inputElement.validity.valid) {

            showInputError(formElement, inputElement, inputElement.validationMessage, {inputErrorClass, errorClass});
    
        } else {

            hideInputError(formElement, inputElement, {inputErrorClass, errorClass});

    }        
}


//Добавим обработчик полям

const setEventListener = (formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {

    const inputList = Array.from(formElement.querySelectorAll(inputSelector));

    const buttonSubmit = formElement.querySelector(submitButtonSelector);

    toggleButtonState(inputList, buttonSubmit, {inactiveButtonClass});

    inputList.forEach((inputElement) => {

        inputElement.addEventListener('input', (evt) => {
            
            checkInputValidity(formElement, inputElement, {inputErrorClass, errorClass});
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

const enableValidation = ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {

    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

    setEventListener(formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass});

    })
}

enableValidation(myObject);