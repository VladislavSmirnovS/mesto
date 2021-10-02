export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
  }
  _showInputError = (inputElement) => {
    this._errorMessage = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._config.inputErrorClass);
    this._errorMessage.textContent = inputElement.validationMessage;
    this._errorMessage.classList.add(this._config.errorClass);
  };

  _hideInputError = (inputElement) => {
    this._errorMessage = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._config.inputErrorClass);
    this._errorMessage.classList.remove(this._config.errorClass);
    this._errorMessage.textContent = "";
  };

  disableSubmitButton = () => {
    this._buttonElement.classList.add(this._config.inactiveButtonClass);
    this._buttonElement.disabled = true;
  };

  _enableSubmitButton = () => {
    this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    this._buttonElement.disabled = false;
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

  resetValidation = () => {};

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _hasNotInputValues = () => {
    return this._inputList.every((inputElement) => {
      return inputElement.value.lenght === 0;
    });
  };

  _toggleButtonState = () => {
    if (this._hasInvalidInput() || this._hasNotInputValues()) {
      this.disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  };

  _setEventListener = () => {
    this._formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
      this._toggleButtonState();
    });
  };

  enableValidation = () => {
    this._setEventListener();
  };
}
