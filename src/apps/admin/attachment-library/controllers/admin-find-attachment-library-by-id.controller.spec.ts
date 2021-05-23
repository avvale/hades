import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminFindAttachmentLibraryByIdController } from './admin-find-attachment-library-by-id.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { attachmentLibraries } from '@hades/admin/attachment-library/infrastructure/seeds/attachment-library.seed';

describe('AdminFindAttachmentLibraryByIdController', () =>
{
    let controller: AdminFindAttachmentLibraryByIdController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AdminFindAttachmentLibraryByIdController
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

        controller  = module.get<AdminFindAttachmentLibraryByIdController>(AdminFindAttachmentLibraryByIdController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('AdminFindAttachmentLibraryByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an attachmentLibrary by id', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(attachmentLibraries[0])));
            expect(await controller.main(attachmentLibraries[0].id)).toBe(attachmentLibraries[0]);
        });
    });
});