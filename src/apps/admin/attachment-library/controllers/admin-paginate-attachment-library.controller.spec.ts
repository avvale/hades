import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminPaginateAttachmentLibraryController } from './admin-paginate-attachment-library.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { attachmentLibrary } from '@hades/admin/attachment-library/infrastructure/seeds/attachment-library.seed';

describe('AdminPaginateAttachmentLibraryController', () => 
{
    let controller: AdminPaginateAttachmentLibraryController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AdminPaginateAttachmentLibraryController
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

        controller  = module.get<AdminPaginateAttachmentLibraryController>(AdminPaginateAttachmentLibraryController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('AdminPaginateAttachmentLibraryController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return a attachmentLibrary', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(attachmentLibrary)));
            expect(await controller.main()).toBe(attachmentLibrary);
        });
    });
});