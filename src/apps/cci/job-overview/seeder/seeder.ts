import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateJobsOverviewCommand } from '@hades/cci/job-overview/application/create/create-jobs-overview.command';
import { SeederModule } from './seeder.module';
import { jobsOverview } from '@hades/cci/job-overview/infrastructure/seeds/job-overview.seed';

export class Seeder 
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext => {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateJobsOverviewCommand(jobsOverview));
        });
    }
}
new Seeder().main();