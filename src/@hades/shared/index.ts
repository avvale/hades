import { ICommandBus } from "./domain/bus/command-bus.service";
import { IQueryBus } from "./domain/bus/query-bus.service";
import { NestCommandBus } from "./infrastructure/bus/nest-command-bus.service";
import { NestQueryBus } from "./infrastructure/bus/nest-query-bus.service";

export const SharedProviders = [
    {
        provide: ICommandBus,
        useClass: NestCommandBus
    },
    {
        provide: IQueryBus,
        useClass: NestQueryBus
    }
];
