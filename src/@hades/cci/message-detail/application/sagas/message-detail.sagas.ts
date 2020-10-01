import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { CreatedMessageDetailEvent } from './../events/created-message-detail.event';

@Injectable()
export class MessageDetailSagas 
{    
    /* @Saga()
    dragonKilled = (events$: Observable<any>): Observable<ICommand> => 
    {
        return events$
            .pipe(
                ofType(CreatedMessageDetailEvent),
                delay(1000),
                map(event => {
                    console.log('Inside [HeroesGameSagas] Saga');
                    return 'command';
                }),
            );
    } */
}
