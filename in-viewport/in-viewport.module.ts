import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InViewportService} from './in-viewport.service'
import {InViewportDirective} from './in-viewport.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [InViewportDirective],
    exports: [InViewportDirective]
})
export class InViewportModule implements ModuleWithProviders {
    static forRoot() {
        return {
            ngModule: InViewportModule,
            providers: [InViewportService]
        };
    }
}
