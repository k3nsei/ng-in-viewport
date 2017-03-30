var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@angular/core", "./in-viewport.directive", "./in-viewport.service"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var core_1 = require("@angular/core");
    var in_viewport_directive_1 = require("./in-viewport.directive");
    var in_viewport_service_1 = require("./in-viewport.service");
    var InViewportModule = InViewportModule_1 = (function () {
        function InViewportModule() {
        }
        InViewportModule.forRoot = function () {
            return {
                ngModule: InViewportModule_1,
                providers: [
                    in_viewport_service_1.InViewportService
                ]
            };
        };
        return InViewportModule;
    }());
    InViewportModule = InViewportModule_1 = __decorate([
        core_1.NgModule({
            imports: [],
            declarations: [
                in_viewport_directive_1.InViewportDirective
            ],
            exports: [
                in_viewport_directive_1.InViewportDirective
            ]
        })
    ], InViewportModule);
    exports.InViewportModule = InViewportModule;
    var InViewportModule_1;
});
//# sourceMappingURL=in-viewport.module.js.map