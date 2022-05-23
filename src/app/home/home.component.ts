import { Component, OnDestroy, OnInit } from '@angular/core';

import { interval, Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObservableSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // interval on küll pooleldi juba valmis observable, aga siiski rohkem
    // rohujuure tasandil, kui need, mis tulevad koos Angulariga.
    // See tekitab uue väärtuse iga sulgudes ette antud ms järel.
    // See jääb käima ka siis, kui ma lähen ära teise vaatesse sellest
    // komponendist ära. Ja kui ma tulen siia tagasi, siis kuna ma loon selle
    // ngOnIniti sees, siis tekib ka uus. Ja mida rohkem ma käin edasi-tagasi,
    // seda rohkem neid tekib ja pärast on korralik mälu leke. Seepärast
    // pean unsubscribe-ima sellest, kui ma enam ei taha seda kuulata. Mitmed
    // Angulariga ise kaasas olevad observable-id teevad seda automaatselt ise.
    // subscribe() meetod tagastab Subscriptioni. Me ei säilita muutujas
    // observablei, vaid subscriptionit.

    // this.firstObservableSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // });

    // Custom Observablei loomine: create meetod loob observable'i.
    // See tuleb kohe koos parameetriga n.ö. observer.
    // Observer on see osa, mis on huvitatud uutest andmetest, vigadest, et observable
    // jõudis oma tegevusega lõppu.
    // Seda const osa võiks teha ka lihtsalt siin propertyna või kusagil serviceis.
    const customIntervalObservable = Observable.create((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count); // to emit a new value
        count++;
        // observer.error(); // veaga tegelemine
        // observer.complete(); // kui on valmis asjad
      } , 1000);
    });
    // siin subscribein oma custom observableile.
    this.firstObservableSubscription = customIntervalObservable.subscribe(data => {
      console.log(data);
    });
  }

  ngOnDestroy(): void {
    // Kui lahkume sellest komponendist, siis tühistame oma subscriptioni ja ei
    // jää alles vedelema vanu subscriptioneid.
    this.firstObservableSubscription.unsubscribe();
  }
}
