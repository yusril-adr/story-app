import CustomError from './CustomError';

class APIError extends CustomError {
  constructor(message, code = 500) {
    super(message);
    this.name = 'APIError';
    this.statusCode = code;
  }
}

export default APIError;
