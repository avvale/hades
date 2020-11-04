import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateJobsDetailCommand } from '@hades/cci/job-detail/application/create/create-jobs-detail.command';
import { SeederModule } from './seeder.module';
import { jobsDetail } from '@hades/cci/job-detail/infrastructure/seeds/job-detail.seed';

export class Seeder
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext => {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateJobsDetailCommand(jobsDetail));
        });
    }
}
new Seeder().main();