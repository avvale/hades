import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminDeleteAttachmentLibrariesController } from './admin-delete-attachment-libraries.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { attachmentLibraries } from '@hades/admin/attachment-library/infrastructure/seeds/attachment-library.seed';

describe('AdminDeleteAttachmentLibrariesController', () => 
{
    let controller: AdminDeleteAttachmentLibrariesController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AdminDeleteAttachmentLibrariesController
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

        controller  = module.get<AdminDeleteAttachmentLibrariesController>(AdminDeleteAttachmentLibrariesController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('AdminDeleteAttachmentLibrariesController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return an attachmentLibraries deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(attachmentLibraries)));
            expect(await controller.main()).toBe(attachmentLibraries);
        });
    });
});