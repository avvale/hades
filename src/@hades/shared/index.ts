import { ICommandBus } from './domain/bus/command-bus';
import { IQueryBus } from './domain/bus/query-bus';
import { ICriteria } from './domain/persistence/criteria';

// implementations
import { NestCommandBus } from './infrastructure/bus/nest-command-bus.service';
import { NestQueryBus } from './infrastructure/bus/nest-query-bus.service';
import { SequelizeCriteria } from './infrastructure/persistence/sequelize/sequelize.criteria';

export const SharedProviders = [
    {
        provide: ICommandBus,
        useClass: NestCommandBus
    },
    {
        provide: IQueryBus,
        useClass: NestQueryBus
    },
    {
        provide: ICriteria,
        useClass: SequelizeCriteria
    }
];
