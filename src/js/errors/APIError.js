import CustomError from './CustomError';

class APIError extends CustomError {
  constructor(message) {
    super(message);
    this.name = 'APIError';
  }
}

export default APIError;
