// https://stackoverflow.com/questions/43991306/angular-4-5-6-global-variables
import { Injectable } from '@angular/core';

@Injectable()
export class Global {
    // baseURL : string = "";  // production
    baseURL = 'http://localhost:2001'; // dev
}