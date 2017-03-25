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
        define(["require", "exports", "@angular/core", "./in-viewport.service"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var core_1 = require("@angular/core");
    var in_viewport_service_1 = require("./in-viewport.service");
    var DEFAULT_CONFIG = {
        partial: true,
        direction: 'both'
    };
    var InViewportDirective = (function () {
        function InViewportDirective(elementRef, inViewportService) {
            this.elementRef = elementRef;
            this.inViewportService = inViewportService;
            this.config = Object.assign({}, DEFAULT_CONFIG);
            this.action$ = new core_1.EventEmitter();
            this.invp = false;
        }
        Object.defineProperty(InViewportDirective.prototype, "updateConfig", {
            set: function (value) {
                this.config = Object.assign(this.config, value);
            },
            enumerable: true,
            configurable: true
        });
        InViewportDirective.prototype.ngAfterViewInit = function () {
            var _this = this;
            this.check(true);
            this.inViewportService.addTarget(this.elementRef.nativeElement);
            this.subscription = this.inViewportService.trigger$
                .subscribe(function (entries) { return _this.check(); });
        };
        InViewportDirective.prototype.ngOnDestroy = function () {
            this.inViewportService.removeTarget(this.elementRef.nativeElement);
            this.subscription.unsubscribe();
        };
        InViewportDirective.prototype.check = function (force) {
            var el = this.elementRef.nativeElement;
            var elSize = (el.offsetWidth * el.offsetHeight);
            var rec = el.getBoundingClientRect();
            var vp = {
                width: window.innerWidth,
                height: window.innerHeight
            };
            var tViz = rec.top >= 0 && rec.top < vp.height;
            var bViz = rec.bottom > 0 && rec.bottom <= vp.height;
            var lViz = rec.left >= 0 && rec.left < vp.width;
            var rViz = rec.right > 0 && rec.right <= vp.width;
            var vVisible = this.config.partial ? tViz || bViz : tViz && bViz;
            var hVisible = this.config.partial ? lViz || rViz : lViz && rViz;
            var invp = false;
            switch (this.config.direction) {
                case 'vertical':
                    invp = !!(elSize && vVisible);
                    break;
                case 'horizontal':
                    invp = !!(elSize && hVisible);
                    break;
                default:
                    invp = !!(elSize && vVisible && hVisible);
            }
            if (force || this.invp !== invp) {
                this.invp = invp;
                this.onChange();
            }
        };
        InViewportDirective.prototype.onChange = function () {
            this.action$.emit({
                target: this.elementRef.nativeElement,
                value: this.invp
            });
        };
        return InViewportDirective;
    }());
    __decorate([
        core_1.Output('inViewport'),
        __metadata("design:type", core_1.EventEmitter)
    ], InViewportDirective.prototype, "action$", void 0);
    __decorate([
        core_1.Input('inViewportOptions'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], InViewportDirective.prototype, "updateConfig", null);
    InViewportDirective = __decorate([
        core_1.Directive({
            selector: '[in-viewport]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            in_viewport_service_1.InViewportService])
    ], InViewportDirective);
    exports.InViewportDirective = InViewportDirective;
});
//# sourceMappingURL=in-viewport.directive.js.map