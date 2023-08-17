import CustomError from './CustomError';

class ServerError extends CustomError {
  constructor(message, code = 500) {
    super(message);
    this.name = 'ServerError';
    this.statusCode = code;
  }
}

export default ServerError;
