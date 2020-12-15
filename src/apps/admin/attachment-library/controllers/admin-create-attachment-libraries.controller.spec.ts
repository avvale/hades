import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminCreateAttachmentLibrariesController } from './admin-create-attachment-libraries.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { attachmentLibraries } from '@hades/admin/attachment-library/infrastructure/seeds/attachment-library.seed';

describe('AdminCreateAttachmentLibrariesController', () => 
{
    let controller: AdminCreateAttachmentLibrariesController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AdminCreateAttachmentLibrariesController
            ],
            providers: [
                {
                    provide: IQueryBus,
                    useValue: {
                        ask: () => {},
                    }
                },
                {
                    provide: ICommandBus,
                    useValue: {
                        dispatch: () => {},
                    }
                },
            ]
        }).compile();

        controller  = module.get<AdminCreateAttachmentLibrariesController>(AdminCreateAttachmentLibrariesController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('AdminCreateAttachmentLibrariesController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return an attachmentLibraries created', async () => 
        {
            expect(await controller.main(attachmentLibraries)).toBe(undefined);
        });
    });
});