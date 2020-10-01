import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { CreatedMessageOverviewEvent } from './../events/created-message-overview.event';

@Injectable()
export class MessageOverviewSagas 
{    
    /* @Saga()
    dragonKilled = (events$: Observable<any>): Observable<ICommand> => 
    {
        return events$
            .pipe(
                ofType(CreatedMessageOverviewEvent),
                delay(1000),
                map(event => {
                    console.log('Inside [HeroesGameSagas] Saga');
                    return 'command';
                }),
            );
    } */
}
