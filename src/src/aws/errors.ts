class APIError extends Error {}

class UnknownS3OriginKey extends APIError {
  constructor(key: string) {
    super(`${key} could not be found`);
  }
}
