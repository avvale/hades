import { IQueryBus } from './../../domain/bus/query-bus.service';
import { QueryBus as NestQueryBusImplementation, ICommand } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestQueryBus implements IQueryBus
{
    constructor(
        private readonly queryBus: NestQueryBusImplementation
    ) {}
    
    async ask<T extends ICommand>(query: T): Promise<any>
    {
        return await this.queryBus.execute(query);
    }
}