import { Observable, Observer } from 'rxjs';

/*
***** Subscription lifecycle
*/

/*
const obeservable$ = new Observable<string>(subscriber => {
    console.log('Observable executed');
  })
  
console.log('Before subscribe');
obeservable$.subscribe();
console.log('After subscribe');
*/



/*
***** Subscription with observable
*/

/*
const obeservable$ = new Observable<string>(subscriber => {
  console.log('Observable executed');
  subscriber.next('Valore 1');
  setTimeout(() => subscriber.next('Valore 2'), 2000)
  setTimeout(() => subscriber.next('Valore 3'), 4000)
})

const observer: Observer<string> = {
  next: value => console.log(value),
  error: undefined,
  complete: undefined
}

obeservable$.subscribe(observer);

const subscription = obeservable$.subscribe(observer);

setTimeout(() => {
  subscription.unsubscribe();
}, 3000)
*/



/*
***** Subscription with observable short form
*/

/*
const obeservable$ = new Observable<string>(subscriber => {
  console.log('Observable executed');
  subscriber.next('Valore 1');
  setTimeout(() => subscriber.next('Valore 2'), 2000)
  setTimeout(() => subscriber.next('Valore 3'), 4000)
})

const subscription = obeservable$.subscribe(value => console.log(value));

setTimeout(() => {
  subscription.unsubscribe();
}, 3000)
*/



/*
***** Subscription
      Il valore di next viene emesso immediatamente perché nessuno sta fermando / rallentando l'esecuzione dell'observable
*/

/*
const obeservable$ = new Observable<string>(subscriber => {
  console.log('Observable executed');
  subscriber.next('Alice');
})

console.log('Before subscribe')
obeservable$.subscribe(value => console.log(value));
console.log('After subscribe')
*/


/*
***** Subscription with observable
      Ordine di esecuzione
*/

/*
const obeservable$ = new Observable<string>(subscriber => {
  console.log('Observable executed');
  subscriber.next('Alice');
  subscriber.next('Ben');
  setTimeout(() => {
    subscriber.next('Charlie');
  }, 2000);
})

console.log('Before subscribe')
obeservable$.subscribe(value => console.log(value));
console.log('After subscribe');
*/



/*
***** Subscription with observable
      Complete emission e teardown logic
*/

/*
const obeservable$ = new Observable<string>(subscriber => {
  console.log('Observable executed');
  subscriber.next('Alice');
  subscriber.next('Ben');
  setTimeout(() => {
    subscriber.next('Charlie');
    subscriber.complete();
  }, 2000);

  return () => {
    console.log('Teardown')
  }
})

console.log('Before subscribe')
obeservable$.subscribe({
  next: value => console.log(value),
  complete: () => console.log('Completed')
});
console.log('After subscribe');
*/



/*
***** Subscription with observable
      Error notification
*/

/* 
const obeservable$ = new Observable<string>(subscriber => {
  console.log('Observable executed');
  subscriber.next('Alice');
  subscriber.next('Ben');
  setTimeout(() => {
    subscriber.next('Charlie');
    subscriber.complete();
  }, 2000);
  setTimeout(() => subscriber.error(new Error('Failure')), 4000);

  return () => {
    console.log('Teardown')
  }
})

console.log('Before subscribe')
obeservable$.subscribe({
  next: value => console.log(value),
  complete: () => console.log('Completed'),
  error: err => console.log(err.message)
});
console.log('After subscribe');
 */



/*
***** Subscription with observable
      Error notification: inversione dell'ordine: la complete in questo caso non viene mai effettuata (ma teardown si)
*/

/* 
const obeservable$ = new Observable<string>(subscriber => {
  console.log('Observable executed');
  subscriber.next('Alice');
  subscriber.next('Ben');

  setTimeout(() => subscriber.error(new Error('Failure')), 2000);

  setTimeout(() => {
    subscriber.next('Charlie');
    subscriber.complete();
  }, 4000);

  return () => {
    console.log('Teardown')
  }
})

console.log('Before subscribe')
obeservable$.subscribe({
  next: value => console.log(value),
  complete: () => console.log('Completed'),
  error: err => console.log(err.message)
});
console.log('After subscribe');
 */



/*
***** Unsubscribing
*/

/* 
const interval$ = new Observable<number>(subscriber => {
  let counter = 1;

  setInterval(() => {
    subscriber.next(counter++);
  }, 2000);

})

const subscription = interval$.subscribe(value => console.log(value));

setTimeout(() => {
  console.log('Unsubscribing');
  subscription.unsubscribe();
}, 7000)

 */



/*
***** Unsubscribing - logging del valore emesso - callback dell'intervallo continua a funzionare anche se next non viene più chiamato a causa dell'unsubscribe
*/

/* 
const interval$ = new Observable<number>(subscriber => {
  let counter = 1;

  setInterval(() => {
    console.log('Emitted', counter)
    subscriber.next(counter++);
  }, 2000);

})

const subscription = interval$.subscribe(value => console.log(value));

setTimeout(() => {
  console.log('Unsubscribing');
  subscription.unsubscribe();
}, 7000)


 */




/*
***** Unsubscribing - logging del valore emesso - Teardown logic
*/

/* 
const interval$ = new Observable<number>(subscriber => {
  let counter = 1;

  const intervalRef = setInterval(() => {
    console.log('Emitted', counter)
    subscriber.next(counter++);
  }, 2000);

  return () => {
    clearInterval(intervalRef);
  }
})

const subscription = interval$.subscribe(value => console.log(value));

setTimeout(() => {
  console.log('Unsubscribing');
  subscription.unsubscribe();
}, 7000)


 */




/*
***** COLD observable
*/

/* 
import { ajax } from 'rxjs/ajax'

const ajax$ = ajax<any>('https://random-data-api.com/api/name/random_name')

ajax$.subscribe(
  data => console.log('Subscription 1', data.response.first_name)
);

ajax$.subscribe(
  data => console.log('Subscription 2', data.response.first_name)
);

ajax$.subscribe(
  data => console.log('Subscription 3', data.response.first_name)
);

 */



/*
***** HOT observable
    Anche se il codice dell'observable è eseguito in modo indipendente per ogni subscription, la sorgente di emissione dei dati è al di fuori del suo
    codice, e globale e comune a tutte le subscription
*/

/* 

<button id="hello">Hello!</button>


const helloButton = document.querySelector('button#hello');

const helloClick$ = new Observable<MouseEvent>(subscriber => {
  helloButton.addEventListener('click', (event: MouseEvent) => {
    subscriber.next(event);
  });
});

helloClick$.subscribe(event => console.log('Subscription 1:', event.type, event.x, event.y));
helloClick$.subscribe(event => console.log('Subscription 2:', event.type, event.x, event.y));
helloClick$.subscribe(event => console.log('Subscription 3:', event.type, event.x, event.y));

 */



/*
***** OF
*/

/*
of('Alice', 'Ben', 'Charlie').subscribe({
  next: value => console.log(value),
  complete: () => console.log('completed')
})

const names$ = new Observable<string>(subscriber => {
  subscriber.next('Alice')
  subscriber.next('Ben')
  subscriber.next('Charlie')
  subscriber.complete()
})

names$.subscribe({
  next: value => console.log(value),
  complete: () => console.log('completed')
})

ourOwnOf('Alice', 'Ben', 'Charlie').subscribe({
  next: value => console.log(value),
  complete: () => console.log('completed')
})

function ourOwnOf(...args: string[]): Observable<string> {
  return new Observable<string>(subscriber => {
    for(let i = 0; i < args.length; i++) {
      subscriber.next(args[i]);
    }
    subscriber.complete();
  })
}
*/


/*
***** From
*/

/*
from(['Alice', 'Bob']).subscribe({
  next: value => console.log(value),
  complete: () => console.log('Completed')
})
*/



/*
***** From - Promise scenario
*/

/*
const somePromise = new Promise((resolve, reject) => {
  resolve('Promise resolved');
});

const observableFromPromise$ = from(somePromise);

observableFromPromise$.subscribe({
  next: value => console.log(value),
  complete: () => console.log('Completed')
})



const somePromise = new Promise((resolve, reject) => {
  reject('Promise rejected');
});

const observableFromPromise$ = from(somePromise);

observableFromPromise$.subscribe({
  next: value => console.log(value),
  error: err => console.log('Error:', err),
  complete: () => console.log('Completed')
})
*/






/*
***** Filter
*/

/*
interface PolicyType {
  category: 'Car' | 'Motorbike' | 'Truck'
  price: number
}

const policyList$ = new Observable<PolicyType>(subscriber => {
  setTimeout(() => subscriber.next({ category: 'Car', price: 1040}), 1000);
  setTimeout(() => subscriber.next({ category: 'Motorbike', price: 450}), 3000);
  setTimeout(() => subscriber.next({ category: 'Car', price: 900}), 4000);
  setTimeout(() => subscriber.next({ category: 'Truck', price: 890}), 7000);
})

policyList$.pipe(
  filter(policy => policy.category === 'Car')
).subscribe(
  p => console.log(p)
)
*/



/*
***** Map
*/

/*
interface PolicyType {
  category: 'Car' | 'Motorbike' | 'Truck'
  price: number
}

const policyList$ = new Observable<PolicyType>(subscriber => {
  setTimeout(() => subscriber.next({ category: 'Car', price: 1040}), 1000);
  setTimeout(() => subscriber.next({ category: 'Motorbike', price: 450}), 3000);
  setTimeout(() => subscriber.next({ category: 'Car', price: 900}), 4000);
  setTimeout(() => subscriber.next({ category: 'Truck', price: 890}), 7000);
})

policyList$.pipe(
  filter(policy => policy.category === 'Car')
).subscribe(
  p => console.log(p)
)
*/




/*
***** Tap
*/

/*
of(1, 7, 3, 6, 2).pipe(
  filter(value => value > 5),
  tap(val => console.log('Debug', val)),
  map(value => value * 2)
).subscribe(value => console.log('Output', value));
*/


/*
***** debounceTime
*/

/*
const searchInput = document.querySelector('input#search');

fromEvent(searchInput, 'input').pipe(
  debounceTime(2000),
  map(ev => (<HTMLInputElement>ev.target).value)
).subscribe(value => console.log(value));
*/




/*
***** concatMap
*/

/*
const source$ = new Observable(subscriber => {
  setTimeout(() => subscriber.next('A'), 2000);
  setTimeout(() => subscriber.next('B'), 5000);
})

console.log('Startup');
source$.pipe(
  concatMap(value => of(1, 2))
).subscribe(value => console.log(value));
*/



/*
***** error handling 1  -> catch error a questo livello crea una complete notification, 
che fa terminare la main subscription
*/

/*
const endpointInput: HTMLInputElement = document.querySelector('input#endpoint');
const fetchButton = document.querySelector('button#fetch');

fromEvent(fetchButton, 'click').pipe(
  map(() => endpointInput.value),
  concatMap(value => ajax(`https://random-data-api.com/api/${value}/random_${value}`)),
  catchError(() => EMPTY)
).subscribe({
  next: value => console.log(value),
  error: err => console.log('Error', err),
  complete: () => console.log('Completed')
})

*/




/*
***** error handling 2 - logica di catch error spostata su observable interno
*/

/*
const endpointInput: HTMLInputElement = document.querySelector('input#endpoint');
const fetchButton = document.querySelector('button#fetch');

fromEvent(fetchButton, 'click').pipe(
  map(() => endpointInput.value),
  concatMap(value => 
    ajax(`https://random-data-api.com/api/${value}/random_${value}`).pipe(
      catchError(() => EMPTY)
    )
  ),
).subscribe({
  next: value => console.log(value),
  error: err => console.log('Error', err),
  complete: () => console.log('Completed')
})


*/





/*
***** Subject
*/

/*
const emitBtn = document.querySelector('button#emit');
const inputSearch: HTMLInputElement = document.querySelector('input#test');
const subscribeBtn = document.querySelector('button#subscribe');


const mySubject$ = new Subject<string>();

fromEvent(emitBtn, 'click').subscribe(
  () => mySubject$.next(inputSearch.value)
);

fromEvent(subscribeBtn, 'click').subscribe(
  () => {
    console.log('New subscription');
    mySubject$.subscribe(value => console.log(value))
  }
)

*/



/*
<button id="hello">Hello!</button>
<br/>
<br/>
<input id="search">
<br/>
<br/>
<input id="endpoint">
<button id="fetch">Fetch</button>
<br/>
<br/>
<input id="test">
<button id="emit">Go!</button>
<br/>
<br/>
<button id="subscribe">Subscribe</button>
*/