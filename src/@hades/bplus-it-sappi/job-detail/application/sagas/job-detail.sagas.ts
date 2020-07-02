import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { CreatedJobDetailEvent } from './../events/created-job-detail.event';

@Injectable()
export class JobDetailSagas 
{    
    /* @Saga()
    dragonKilled = (events$: Observable<any>): Observable<ICommand> => 
    {
        return events$
            .pipe(
                ofType(CreatedJobDetailEvent),
                delay(1000),
                map(event => {
                    console.log('Inside [HeroesGameSagas] Saga');
                    return 'command';
                }),
            );
    } */
}
