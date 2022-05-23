import { Component, OnDestroy, OnInit } from '@angular/core';

import { interval, Subscription } from 'rxjs';

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
    this.firstObservableSubscription = interval(1000).subscribe(count => {
      console.log(count);
    });
  }

  ngOnDestroy(): void {
    // Kui lahkume sellest komponendist, siis tühistame oma subscriptioni ja ei
    // jää alles vedelema vanu subscriptioneid.
    this.firstObservableSubscription.unsubscribe();
  }
}
