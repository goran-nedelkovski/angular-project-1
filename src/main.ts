import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

//1st main.ts is the first file to executed
//bootstrap is starting our app by passing AppModule as parameter in this method. 
//and this parameter AppModule refer to the file app.module.ts
