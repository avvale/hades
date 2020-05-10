import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { LangCreatedEvent } from './../events/lang-created.event';

@Injectable()
export class LangSagas 
{    
    /* @Saga()
    dragonKilled = (events$: Observable<any>): Observable<ICommand> => 
    {
        return events$
            .pipe(
                ofType(LangCreatedEvent),
                delay(1000),
                map(event => {
                    console.log('Inside [HeroesGameSagas] Saga');
                    return 'command';
                }),
            );
    } */
}
