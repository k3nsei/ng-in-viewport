export class InvalidThresholdException extends TypeError {
  constructor() {
    super('The provided values for the threshold are incorrect. The values must be numbers between 0 and 1.');
  }
}
