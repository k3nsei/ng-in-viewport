export var InViewportConfigDirection;
(function (InViewportConfigDirection) {
    InViewportConfigDirection[InViewportConfigDirection["Both"] = 0] = "Both";
    InViewportConfigDirection[InViewportConfigDirection["Vertical"] = 1] = "Vertical";
    InViewportConfigDirection[InViewportConfigDirection["Horizontal"] = 2] = "Horizontal";
})(InViewportConfigDirection || (InViewportConfigDirection = {}));
export class InViewportConfig {
    constructor(options) {
        this.rootElement = (options && options.rootElement)
            ? options.rootElement
            : void 0;
        this.partial = (options && 'partial' in options)
            ? options.partial
            : true;
        this.direction = (options && 'direction' in options)
            ? options.direction
            : InViewportConfigDirection.Both;
    }
    get rootElement() {
        return this._rootElement;
    }
    set rootElement(value) {
        this._rootElement = value;
    }
    get partial() {
        return this._partial;
    }
    set partial(value) {
        this._partial = !!(value);
    }
    get direction() {
        return this._direction;
    }
    set direction(value) {
        this._direction = value;
    }
}
//# sourceMappingURL=in-viewport-config.class.js.map