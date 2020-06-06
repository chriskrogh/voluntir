import validator from 'validator';

export const isEmpty = ( str: string ) => {
  return ( !str || str.length === 0 || !str.trim() );
}

export const isValidEmail = ( email: string ) => {
  return validator.isEmail( email );
}

export const isValidPassword = ( password: string ) => {
  return password != null && ( password.length > 5 );
}

export const isValidPhoneNumber = ( phoneNumber: string ) => {
  return ( !isNaN( parseInt( phoneNumber ) ) && validator.isMobilePhone( phoneNumber ) );
}