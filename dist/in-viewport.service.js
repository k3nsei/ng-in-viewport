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
        define(["require", "exports", "@angular/core"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var core_1 = require("@angular/core");
    var InViewportService = (function () {
        function InViewportService() {
            this.registry = [];
            this.trigger$ = new core_1.EventEmitter();
        }
        InViewportService.prototype.onChanges = function (entries) {
            this.trigger$.emit(entries[0]);
        };
        InViewportService.prototype.findTarget = function (target) {
            return this.registry.find(function (item) { return item.target === target; });
        };
        InViewportService.prototype.addTarget = function (target, rootElement) {
            var _this = this;
            if (!this.findTarget(target)) {
                // Create target observer options
                var observerOptions = {
                    threshold: Array(101).fill(void 0).map(function (item, i) { return (i / 100); })
                };
                if (rootElement) {
                    observerOptions.root = rootElement;
                }
                // Create target object
                var targetObj = {
                    target: target,
                    rootElement: rootElement,
                    observer: new IntersectionObserver(function (entries) { return _this.onChanges(entries); }, observerOptions)
                };
                // Start to observe target
                targetObj.observer.observe(target);
                // Add target to registry
                this.registry.push(targetObj);
            }
        };
        InViewportService.prototype.removeTarget = function (target) {
            var targetObj = this.findTarget(target);
            if (targetObj) {
                targetObj.observer.disconnect();
                this.registry.splice(this.registry.indexOf(targetObj), 1);
            }
        };
        return InViewportService;
    }());
    InViewportService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], InViewportService);
    exports.InViewportService = InViewportService;
});
//# sourceMappingURL=in-viewport.service.js.map