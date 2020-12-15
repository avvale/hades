import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateAttachmentLibraryCommand } from '@hades/admin/attachment-library/application/create/create-attachment-library.command';
import { SeederModule } from './seeder.module';
import { attachmentLibrary } from '@hades/admin/attachment-library/infrastructure/seeds/attachment-library.seed';

export class Seeder
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext => {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateAttachmentLibraryCommand(attachmentLibrary));
        });
    }
}
new Seeder().main();