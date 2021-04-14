import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminUpdateAttachmentLibraryController } from './admin-update-attachment-library.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { attachmentLibraries } from '@hades/admin/attachment-library/infrastructure/seeds/attachment-library.seed';

describe('AdminUpdateAttachmentLibraryController', () =>
{
    let controller: AdminUpdateAttachmentLibraryController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AdminUpdateAttachmentLibraryController
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

        controller  = module.get<AdminUpdateAttachmentLibraryController>(AdminUpdateAttachmentLibraryController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('AdminUpdateAttachmentLibraryController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a attachmentLibrary created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(attachmentLibraries[0])));
            expect(await controller.main(attachmentLibraries[0])).toBe(attachmentLibraries[0]);
        });
    });
});