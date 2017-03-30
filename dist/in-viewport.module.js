var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule } from "@angular/core";
import { InViewportDirective } from "./in-viewport.directive";
import { InViewportService } from "./in-viewport.service";
var InViewportModule = InViewportModule_1 = (function () {
    function InViewportModule(inViewportService) {
        this.inViewportService = inViewportService;
    }
    InViewportModule.forRoot = function () {
        return {
            ngModule: InViewportModule_1,
            providers: [
                InViewportService
            ]
        };
    };
    return InViewportModule;
}());
InViewportModule = InViewportModule_1 = __decorate([
    NgModule({
        imports: [],
        declarations: [
            InViewportDirective
        ],
        exports: [
            InViewportDirective
        ]
    }),
    __metadata("design:paramtypes", [InViewportService])
], InViewportModule);
export { InViewportModule };
var InViewportModule_1;
//# sourceMappingURL=in-viewport.module.js.map