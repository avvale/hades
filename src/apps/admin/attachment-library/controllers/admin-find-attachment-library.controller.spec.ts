import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminFindAttachmentLibraryController } from './admin-find-attachment-library.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { attachmentLibraries } from '@hades/admin/attachment-library/infrastructure/seeds/attachment-library.seed';

describe('AdminFindAttachmentLibraryController', () =>
{
    let controller: AdminFindAttachmentLibraryController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AdminFindAttachmentLibraryController
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

        controller  = module.get<AdminFindAttachmentLibraryController>(AdminFindAttachmentLibraryController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('AdminFindAttachmentLibraryController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a attachmentLibrary', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(attachmentLibraries[0])));
            expect(await controller.main()).toBe(attachmentLibraries[0]);
        });
    });
});