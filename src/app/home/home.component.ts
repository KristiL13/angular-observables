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
    // See tuleb kohe koos parameetriga nö observer.
    // Observer on see osa, mis on huvitatud uutest andmetest, vigadest, et observable
    // jõudis oma tegevusega lõppu.
    // Seda const osa võiks teha ka lihtsalt siin propertyna või kusagil serviceis.
    const customIntervalObservable = Observable.create((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count); // to emit a new value
        if (count === 2) {
        // if (count === 5) { // Kui on see tingimus, siis kui lõpetab vea tõttu, siis
        // siia completei üldse ei jõuagi.
          observer.complete(); // peale completei observable lõpetab oma tegevuse
          // ja uusi väärtuseid ei väljastata. http request ise jõuab lõppu.
        }
        if (count > 3) {
          // Kui error tuleb, siis observable ei tekita uusi väärtusi, see nö sureb.
          // Seepärast ei ole sel juhul oluline ka unsubscribeida. Sa saad ära liikudes
          // unsubscribeida, aga see pole tarvilik, kuna observable oli juba surnud.
          // Samas sa ei pruukinud seda ära minnes veel teada.
          // Error cancels the observable, it does not complete it.
          observer.error(new Error('Count is greater than 3!'));
        }
        count++;
        // observer.error(); // veaga tegelemine
        // observer.complete(); // kui on valmis asjad
      } , 1000);
    });

    // Peamiselt ei kirjuta oma observableid, nagu siin ülal. Aga tegelen dataga,
    // vigadega ja mida teha kui on complete, nagu siin allpool.

    // siin subscribein oma custom observableile.
    this.firstObservableSubscription = customIntervalObservable.subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
      alert(error.message);
      // veaga saab siin muudki teha, kui seda konsooli logida. Nt näidata veateadet,
      // saata viga backendi ja seda seal logida jne.
    }, () => { // completion
      // you don't need to unsubscribe if your observable did complete. But you might
      // not know it did, so you can still unsubscribe without getting errors.
      // Kui saab vea, siis siia ei jõua.
      console.log('Completed');
    }
    );
  }

  ngOnDestroy(): void {
    // Kui lahkume sellest komponendist, siis tühistame oma subscriptioni ja ei
    // jää alles vedelema vanu subscriptioneid.
    this.firstObservableSubscription.unsubscribe();
  }
}
