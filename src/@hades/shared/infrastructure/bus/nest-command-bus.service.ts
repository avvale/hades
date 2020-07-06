import { ICommandBus } from './../../domain/bus/command-bus.service';
import { CommandBus as NestCommandBusImplementation, ICommand } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestCommandBus implements ICommandBus
{
    constructor(
        private readonly commandBus: NestCommandBusImplementation
    ) {}
    
    async dispatch<T extends ICommand>(command: T): Promise<any>
    {
        return await this.commandBus.execute(command);
    }
}