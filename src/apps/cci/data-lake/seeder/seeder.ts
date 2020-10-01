import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateDataLakesCommand } from '@hades/cci/data-lake/application/create/create-data-lakes.command';
import { SeederModule } from './seeder.module';
import { dataLakes } from '@hades/cci/data-lake/infrastructure/seeds/data-lake.seed';

export class Seeder 
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext => {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateDataLakesCommand(dataLakes));
        });
    }
}
new Seeder().main();