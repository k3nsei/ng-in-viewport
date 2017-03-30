(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./in-viewport.module", "./in-viewport.service", "./in-viewport-config.class", "./in-viewport.directive"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var in_viewport_module_1 = require("./in-viewport.module");
    exports.InViewportModule = in_viewport_module_1.InViewportModule;
    var in_viewport_service_1 = require("./in-viewport.service");
    exports.InViewportService = in_viewport_service_1.InViewportService;
    var in_viewport_config_class_1 = require("./in-viewport-config.class");
    exports.InViewportConfig = in_viewport_config_class_1.InViewportConfig;
    exports.InViewportConfigDirection = in_viewport_config_class_1.InViewportConfigDirection;
    var in_viewport_directive_1 = require("./in-viewport.directive");
    exports.InViewportDirective = in_viewport_directive_1.InViewportDirective;
});
//# sourceMappingURL=index.js.map