import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateAttachmentsCommand } from '@hades/admin/attachment/application/create/create-attachments.command';
import { SeederModule } from './seeder.module';
import { attachments } from '@hades/admin/attachment/infrastructure/seeds/attachment.seed';

export class Seeder
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext => {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateAttachmentsCommand(attachments));
        });
    }
}
new Seeder().main();