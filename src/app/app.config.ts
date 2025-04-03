import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB64H2zp3oTTW5NKA1eV3e_VJm5kRpDPh8",
  authDomain: "ring-of-fire-5190e.firebaseapp.com",
  projectId: "ring-of-fire-5190e",
  storageBucket: "ring-of-fire-5190e.firebasestorage.app",
  messagingSenderId: "707689698664",
  appId: "1:707689698664:web:9b3667a05228b9abbdb2dd"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),    
  ],
};