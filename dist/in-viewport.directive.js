var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ElementRef, EventEmitter, Input, Output } from "@angular/core";
import { InViewportConfig } from "./in-viewport-config.class";
import { InViewportService } from "./in-viewport.service";
var InViewportDirective = (function () {
    function InViewportDirective(elementRef, inViewportService) {
        this.elementRef = elementRef;
        this.inViewportService = inViewportService;
        this.config = new InViewportConfig();
        this.action$ = new EventEmitter();
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
        this.inViewportService.trigger$.subscribe(function (entries) { return _this.check(entries); });
        this.inViewportService.addTarget(this.elementRef.nativeElement, this.config.rootElement);
    };
    InViewportDirective.prototype.ngOnDestroy = function () {
        this.inViewportService.removeTarget(this.elementRef.nativeElement);
    };
    InViewportDirective.prototype.check = function (entries) {
        var _this = this;
        var entry = entries.find(function (item) { return item.target === _this.elementRef.nativeElement; });
        if (entry) {
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
    Output('inViewportAction'),
    __metadata("design:type", EventEmitter)
], InViewportDirective.prototype, "action$", void 0);
__decorate([
    Input('inViewportOptions'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], InViewportDirective.prototype, "updateConfig", null);
InViewportDirective = __decorate([
    Directive({
        selector: '[in-viewport], [inViewport]'
    }),
    __metadata("design:paramtypes", [ElementRef,
        InViewportService])
], InViewportDirective);
export { InViewportDirective };
//# sourceMappingURL=in-viewport.directive.js.map