var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@angular/core", "./in-viewport-events.service", "./in-viewport-intersection.service", "./in-viewport.directive", "./in-viewport.service"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var core_1 = require("@angular/core");
    var in_viewport_events_service_1 = require("./in-viewport-events.service");
    var in_viewport_intersection_service_1 = require("./in-viewport-intersection.service");
    var in_viewport_directive_1 = require("./in-viewport.directive");
    var in_viewport_service_1 = require("./in-viewport.service");
    var InViewportStrategies;
    (function (InViewportStrategies) {
        InViewportStrategies[InViewportStrategies["Events"] = 0] = "Events";
        InViewportStrategies[InViewportStrategies["Intersection"] = 1] = "Intersection";
    })(InViewportStrategies = exports.InViewportStrategies || (exports.InViewportStrategies = {}));
    exports.InViewportStrategy = new core_1.OpaqueToken('InViewportStrategy');
    var strategy = (window && 'IntersectionObserver' in window)
        ? InViewportStrategies.Intersection
        : InViewportStrategies.Events;
    var InViewportServiceFactory = {
        provide: in_viewport_service_1.InViewportService,
        useFactory: function () {
            switch (strategy) {
                case InViewportStrategies.Intersection:
                    return new in_viewport_intersection_service_1.InViewportIntersectionService();
                default:
                    return new in_viewport_events_service_1.InViewportEventsService();
            }
        }
    };
    var InViewportModule = InViewportModule_1 = (function () {
        function InViewportModule(inViewportService) {
            this.inViewportService = inViewportService;
        }
        InViewportModule.forRoot = function () {
            return {
                ngModule: InViewportModule_1,
                providers: [
                    {
                        provide: exports.InViewportStrategy,
                        useValue: strategy
                    },
                    InViewportServiceFactory,
                    in_viewport_events_service_1.InViewportEventsService,
                    in_viewport_intersection_service_1.InViewportIntersectionService
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
        }),
        __metadata("design:paramtypes", [in_viewport_service_1.InViewportService])
    ], InViewportModule);
    exports.InViewportModule = InViewportModule;
    var InViewportModule_1;
});
//# sourceMappingURL=in-viewport.module.js.map