export var InViewportConfigDirection;
(function (InViewportConfigDirection) {
    InViewportConfigDirection[InViewportConfigDirection["Both"] = 0] = "Both";
    InViewportConfigDirection[InViewportConfigDirection["Vertical"] = 1] = "Vertical";
    InViewportConfigDirection[InViewportConfigDirection["Horizontal"] = 2] = "Horizontal";
})(InViewportConfigDirection || (InViewportConfigDirection = {}));
var InViewportConfig = (function () {
    function InViewportConfig(options) {
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
    Object.defineProperty(InViewportConfig.prototype, "rootElement", {
        get: function () {
            return this._rootElement;
        },
        set: function (value) {
            this._rootElement = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InViewportConfig.prototype, "partial", {
        get: function () {
            return this._partial;
        },
        set: function (value) {
            this._partial = !!(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InViewportConfig.prototype, "direction", {
        get: function () {
            return this._direction;
        },
        set: function (value) {
            this._direction = value;
        },
        enumerable: true,
        configurable: true
    });
    return InViewportConfig;
}());
export { InViewportConfig };
//# sourceMappingURL=in-viewport-config.class.js.map