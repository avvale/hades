import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateAttachmentLibrariesCommand } from '@hades/admin/attachment-library/application/create/create-attachment-libraries.command';
import { SeederModule } from './seeder.module';
import { attachmentLibraries } from '@hades/admin/attachment-library/infrastructure/seeds/attachment-library.seed';

export class Seeder
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext => {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateAttachmentLibrariesCommand(attachmentLibraries));
        });
    }
}
new Seeder().main();