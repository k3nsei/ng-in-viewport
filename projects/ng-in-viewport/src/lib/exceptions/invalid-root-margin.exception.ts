export class InvalidRootMarginException extends TypeError {
  constructor() {
    super('The provided value for the rootMargin is incorrect. The value must be specified in pixels or percent.');
  }
}
