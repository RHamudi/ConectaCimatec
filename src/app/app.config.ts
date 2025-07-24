import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getAuth, provideAuth } from '@angular/fire/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDaTBaIRWyHgf9E7dZWAd4txo6jIUnuCbc",
  authDomain: "conectacimatec.firebaseapp.com",
  databaseURL: "https://conectacimatec-default-rtdb.firebaseio.com",
  projectId: "conectacimatec",
  storageBucket: "conectacimatec.firebasestorage.app",
  messagingSenderId: "1036252122441",
  appId: "1:1036252122441:web:79a5b683ec8ca094e8de98",
  measurementId: "G-S18JGKZLH7"
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(()=> initializeApp(firebaseConfig)),
    provideDatabase(()=> getDatabase()),
    provideAuth(()=> getAuth())
  ]
};

