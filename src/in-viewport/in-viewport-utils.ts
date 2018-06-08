export namespace InViewportUtils {
  export function isObject(value: any): boolean {
    const type = typeof value;
    return value != null && (type == 'object' || type == 'function');
  }

  export function isObjectLiteral(value: any): boolean {
    return Object.prototype.toString.call(value) === '[object Object]';
  }
}
