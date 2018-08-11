# Import the modules

 Import the **`InViewportModule`** for each component you want to use:

{% code-tabs %}
{% code-tabs-item title="/src/app/app.module.ts" %}
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InViewportModule } from 'ng-in-viewport';

import { AppComponent } from './app.component';

@NgModule({
    imports: [
        BrowserModule,
        InViewportModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

If you want to support legacy browsers like for example _**IE11**_ you need to load **`IntersectionObserver`** polyfill to your **`src/polyfills.ts`** file:

{% code-tabs %}
{% code-tabs-item title="/src/polyfills.ts" %}
```typescript
import 'intersection-observer';
```
{% endcode-tabs-item %}
{% endcode-tabs %}

