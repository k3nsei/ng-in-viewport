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
let InViewportService = class InViewportService {
    constructor() {
        this.registry = [];
        this.trigger$ = new EventEmitter();
    }
    onChanges(entries) {
        this.trigger$.emit(entries[0]);
    }
    findTarget(target) {
        return this.registry.find((item) => item.target === target);
    }
    addTarget(target, rootElement) {
        if (!this.findTarget(target)) {
            // Create target observer options
            const observerOptions = {
                threshold: Array(101).fill(void 0).map((item, i) => (i / 100))
            };
            if (rootElement) {
                observerOptions.root = rootElement;
            }
            // Create target object
            const targetObj = {
                target,
                rootElement,
                observer: new IntersectionObserver((entries) => this.onChanges(entries), observerOptions)
            };
            // Start to observe target
            targetObj.observer.observe(target);
            // Add target to registry
            this.registry.push(targetObj);
        }
    }
    removeTarget(target) {
        const targetObj = this.findTarget(target);
        if (targetObj) {
            targetObj.observer.disconnect();
            this.registry.splice(this.registry.indexOf(targetObj), 1);
        }
    }
};
InViewportService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], InViewportService);
export { InViewportService };
//# sourceMappingURL=in-viewport.service.js.map