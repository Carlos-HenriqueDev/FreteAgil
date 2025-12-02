import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { routes } from './app/app.routes'
import { provideRouter, RouterOutlet } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>',
})
export class App {}

bootstrapApplication(App, {
  providers: [provideRouter(routes),
  importProvidersFrom(HttpClientModule)
  ]
});