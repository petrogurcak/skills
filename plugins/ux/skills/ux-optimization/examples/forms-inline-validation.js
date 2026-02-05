/**
 * Inline Form Validation
 * Validates fields onBlur (after leaving field)
 * Shows concrete error messages
 */

class FormValidator {
  constructor(form) {
    this.form = form;
    this.inputs = form.querySelectorAll('input[required]');
    this.init();
  }

  init() {
    this.inputs.forEach(input => {
      // Validate onBlur (after leaving field)
      input.addEventListener('blur', () => this.validateField(input));

      // For password, validate in real-time
      if (input.type === 'password') {
        input.addEventListener('input', () => this.validateField(input));
      }
    });

    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  validateField(input) {
    const value = input.value.trim();
    const type = input.type;

    // Empty field
    if (!value && input.required) {
      this.showError(input, 'Toto pole je povinné');
      return false;
    }

    // Email validation
    if (type === 'email') {
      if (!this.isValidEmail(value)) {
        this.showError(input, 'Zadejte platný e-mail (např. jmeno@domena.cz)');
        return false;
      }
    }

    // Password validation
    if (type === 'password') {
      if (value.length < 6) {
        this.showError(input, `Heslo musí mít min. 6 znaků (nyní ${value.length})`);
        return false;
      }
    }

    // All good
    this.showSuccess(input);
    return true;
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  showError(input, message) {
    const formGroup = input.closest('.form-group');
    let errorDiv = formGroup.querySelector('.error-message');

    if (!errorDiv) {
      errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      formGroup.appendChild(errorDiv);
    }

    formGroup.classList.add('has-error');
    formGroup.classList.remove('has-success');
    errorDiv.textContent = message;
  }

  showSuccess(input) {
    const formGroup = input.closest('.form-group');
    const errorDiv = formGroup.querySelector('.error-message');

    formGroup.classList.add('has-success');
    formGroup.classList.remove('has-error');

    if (errorDiv) {
      errorDiv.remove();
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    let isValid = true;
    this.inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    if (isValid) {
      this.form.submit();
    } else {
      // Scroll to first error
      const firstError = this.form.querySelector('.has-error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstError.querySelector('input').focus();
      }
    }
  }
}

// Usage
document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('form[data-validate]');
  forms.forEach(form => new FormValidator(form));
});
