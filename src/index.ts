import { Observable, subscribeOn } from 'rxjs';

const obeservable$ = new Observable<string>(subscriber => {
  console.log('Observable executed');
})

console.log('Before subscribe');
obeservable$.subscribe();
console.log('After subscribe');