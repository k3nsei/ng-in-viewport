var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { EventEmitter, Injectable } from "@angular/core";
var InViewportService = (function () {
    function InViewportService() {
        this.registry = [];
        this.trigger$ = new EventEmitter();
    }
    InViewportService.prototype.onChanges = function (entries) {
        this.trigger$.emit(entries);
    };
    InViewportService.prototype.findRegistryEntry = function (rootElement) {
        var _this = this;
        return this.registry.find(function (item) { return item.rootElement === _this.getRootElement(rootElement); });
    };
    InViewportService.prototype.addTarget = function (target, rootElement) {
        var _this = this;
        var registryEntry = this.findRegistryEntry(rootElement);
        if (!registryEntry) {
            var registryEntryObserverOptions = {
                root: this.getRootElement(rootElement),
                threshold: Array(101).fill(void 0).map(function (item, i) { return (i / 100); })
            };
            registryEntry = {
                targets: [target],
                rootElement: this.getRootElement(rootElement),
                observer: new IntersectionObserver(function (entries) { return _this.onChanges(entries); }, registryEntryObserverOptions)
            };
            registryEntry.observer.observe(target);
            this.registry.push(registryEntry);
        }
        else if (registryEntry.targets.indexOf(target) < 0) {
            registryEntry.targets.push(target);
            registryEntry.observer.observe(target);
        }
        console.log(this.registry);
    };
    InViewportService.prototype.removeTarget = function (target, rootElement) {
        var registryEntry = this.findRegistryEntry(rootElement);
        var registryEntryIdx = this.registry.indexOf(registryEntry);
        if (registryEntry) {
            var targetIdx = registryEntry.targets.indexOf(target);
            if (targetIdx >= 0) {
                registryEntry.observer.unobserve(target);
                registryEntry.targets.splice(targetIdx, 1);
            }
            if (registryEntry.targets.length === 0) {
                registryEntry.observer.disconnect();
                this.registry.splice(registryEntryIdx, 1);
            }
        }
    };
    InViewportService.prototype.getRootElement = function (element) {
        return (element && element.nodeType === 1) ? element : null;
    };
    return InViewportService;
}());
InViewportService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], InViewportService);
export { InViewportService };
//# sourceMappingURL=in-viewport.service.js.map