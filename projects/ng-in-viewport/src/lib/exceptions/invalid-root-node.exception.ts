export class InvalidRootNodeException extends TypeError {
  constructor() {
    super(`The provided value for the root is incorrect. The value must be of type '(Document or Element)'.`);
  }
}
