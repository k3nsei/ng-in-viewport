var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
        define(["require", "exports", "@angular/core", "rxjs/observable/fromEvent", "rxjs/operator/debounceTime", "./in-viewport.service"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var core_1 = require("@angular/core");
    var fromEvent_1 = require("rxjs/observable/fromEvent");
    var debounceTime_1 = require("rxjs/operator/debounceTime");
    var in_viewport_service_1 = require("./in-viewport.service");
    var InViewportEventsService = (function (_super) {
        __extends(InViewportEventsService, _super);
        function InViewportEventsService() {
            var _this = _super.call(this) || this;
            _this.trigger$ = new core_1.EventEmitter();
            _this.roots = [];
            _this.scroll$ = fromEvent_1.fromEvent(window, 'scroll', { passive: true });
            _this.scrollSubscription = debounceTime_1.debounceTime.call(_this.scroll$, 50)
                .subscribe(function (event) { return _this.onChanges(); });
            _this.resize$ = fromEvent_1.fromEvent(window, 'resize', { passive: true });
            _this.resizeSubscription = debounceTime_1.debounceTime.call(_this.resize$, 50)
                .subscribe(function (event) { return _this.onChanges(); });
            if (window && 'MutationObserver' in window) {
                _this.dom$ = new MutationObserver(function (mutations) { return _this.onChanges(); });
                // this.domSubscription = this.dom$.observe(document, {
                //   attributes: true,
                //   childList: true,
                //   characterData: true,
                //   subtree: true
                // });
            }
            return _this;
        }
        InViewportEventsService.prototype.onChanges = function () {
            var rootObj = this.findRoot(window);
            var result = rootObj
                ? rootObj.targets.map(function (target) { return ({
                    root: rootObj.root,
                    target: target
                }); })
                : [];
            this.trigger$.emit(result);
        };
        InViewportEventsService.prototype.addTarget = function (target, rootElement) {
            var root = this.getRoot(rootElement);
            var rootObj = this.findRoot(root);
            if (rootObj && rootObj.targets.indexOf(target) < 0) {
                rootObj.targets.push(target);
            }
            else {
                this.roots.push({
                    root: root,
                    targets: [
                        target
                    ]
                });
            }
        };
        InViewportEventsService.prototype.removeTarget = function (target, rootElement) {
            var root = this.getRoot(rootElement);
            var rootObj = this.findRoot(root);
            if (rootObj) {
                var idx = rootObj.targets.indexOf(target);
                if (idx >= 0) {
                    rootObj.targets.splice(idx, 1);
                }
            }
        };
        InViewportEventsService.prototype.getRoot = function (rootElement) {
            return (rootElement instanceof HTMLElement) ? rootElement : window;
        };
        InViewportEventsService.prototype.findRoot = function (root) {
            return this.roots.find(function (item) { return item.root === root; });
        };
        return InViewportEventsService;
    }(in_viewport_service_1.InViewportService));
    InViewportEventsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], InViewportEventsService);
    exports.InViewportEventsService = InViewportEventsService;
});
//# sourceMappingURL=in-viewport-events.service.js.map