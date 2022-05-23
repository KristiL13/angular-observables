import { EventEmitter, Injectable } from "@angular/core";

@Injectable({providedIn: 'root'}) // see on kasutusel selle asemel, et app.modules.ts failis see providers alla panna
export class UserService{
  activatedEmitter = new EventEmitter<boolean>();
}