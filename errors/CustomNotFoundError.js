class CustomNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;    
    this.name = "NotFoundError"; // NotFoundError: message instead of Error: message
  }
}

module.exports = CustomNotFoundError;