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
        define(["require", "exports", "@angular/core", "./in-viewport-config.class", "./in-viewport.service"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var core_1 = require("@angular/core");
    var in_viewport_config_class_1 = require("./in-viewport-config.class");
    var in_viewport_service_1 = require("./in-viewport.service");
    var InViewportDirective = (function () {
        function InViewportDirective(elementRef, inViewportService) {
            this.elementRef = elementRef;
            this.inViewportService = inViewportService;
            this.config = new in_viewport_config_class_1.InViewportConfig();
            this.action$ = new core_1.EventEmitter();
        }
        Object.defineProperty(InViewportDirective.prototype, "updateConfig", {
            set: function (value) {
                if (value && Object.prototype.toString.call(value) === '[object Object]') {
                    if (value.rootElement instanceof Element) {
                        this.config.rootElement = value.rootElement;
                    }
                    if ('partial' in value) {
                        this.config.partial = value.partial;
                    }
                    if ('direction' in value) {
                        this.config.rootElement = value.direction;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        InViewportDirective.prototype.ngAfterViewInit = function () {
            var _this = this;
            this.inViewportService.trigger$.subscribe(function (entry) { return _this.check(entry); });
            this.inViewportService.addTarget(this.elementRef.nativeElement, this.config.rootElement);
        };
        InViewportDirective.prototype.ngOnDestroy = function () {
            this.inViewportService.removeTarget(this.elementRef.nativeElement);
        };
        InViewportDirective.prototype.check = function (entry) {
            if (entry.target === this.elementRef.nativeElement) {
                var value = this.config.partial ? (entry.intersectionRatio > 0) : (entry.intersectionRatio === 1);
                this.action$.emit({
                    target: entry.target,
                    value: value
                });
            }
        };
        return InViewportDirective;
    }());
    __decorate([
        core_1.Output('inViewportAction'),
        __metadata("design:type", core_1.EventEmitter)
    ], InViewportDirective.prototype, "action$", void 0);
    __decorate([
        core_1.Input('inViewportOptions'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], InViewportDirective.prototype, "updateConfig", null);
    InViewportDirective = __decorate([
        core_1.Directive({
            selector: '[in-viewport], [inViewport]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            in_viewport_service_1.InViewportService])
    ], InViewportDirective);
    exports.InViewportDirective = InViewportDirective;
});
//# sourceMappingURL=in-viewport.directive.js.map