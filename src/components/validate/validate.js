import validate from 'validate.js';

export default function validation(fieldName, value) {
  var constraints = {
    email: {
      presence: true,
      email: {
        message: {
          type: 'invalid',
          message: 'Invalid e-mail address.',
        },
      },
    },
    password: {
      presence: true,
      length: {
        minimum: 6,
        message: {
          type: 'minLenght',
          message: 'Password must be at least 6 characters long',
        },
      },
    },
  };

  var formValues = {};
  formValues[fieldName] = value;

  var formFields = {};
  formFields[fieldName] = constraints[fieldName];

  const result = validate(formValues, formFields);
  if (result) {
    return result[fieldName][0];
  }
  return null;
}
