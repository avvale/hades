import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateAttachmentFamiliesCommand } from '@hades/admin/attachment-family/application/create/create-attachment-families.command';
import { SeederModule } from './seeder.module';
import { attachmentFamilies } from '@hades/admin/attachment-family/infrastructure/seeds/attachment-family.seed';

export class Seeder
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext => {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateAttachmentFamiliesCommand(attachmentFamilies));
        });
    }
}
new Seeder().main();