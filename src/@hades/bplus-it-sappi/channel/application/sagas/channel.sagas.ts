import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { CreatedChannelEvent } from './../events/created-channel.event';

@Injectable()
export class ChannelSagas 
{    
    /* @Saga()
    dragonKilled = (events$: Observable<any>): Observable<ICommand> => 
    {
        return events$
            .pipe(
                ofType(CreatedChannelEvent),
                delay(1000),
                map(event => {
                    console.log('Inside [HeroesGameSagas] Saga');
                    return 'command';
                }),
            );
    } */
}
