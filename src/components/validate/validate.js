import validate from 'validate.js';

export default function validation(fieldName, value) {
  var constraints = {
    email: {
      presence: true,
      email: {
        message: {
          type: 'inValid',
          message: 'Lütfen geçerli bir e-mail adresi girin',
        },
      },
    },
    password: {
      presence: true,
      length: {
        minimum: 6,
        message: {
          type: 'minLenght',
          message: 'Şifreniz en az 6 karakterden oluşmalıdır',
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
