import { /* EventEmitter, */ Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'}) // see on kasutusel selle asemel, et app.modules.ts failis see providers alla panna
export class UserService{
  // activatedEmitter = new EventEmitter<boolean>();

  // Subject is a special kind of observable.
  activatedEmitter = new Subject<boolean>();
}