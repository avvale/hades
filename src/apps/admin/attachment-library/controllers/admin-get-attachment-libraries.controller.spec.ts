import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminGetAttachmentLibrariesController } from './admin-get-attachment-libraries.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { attachmentLibraries } from '@hades/admin/attachment-library/infrastructure/seeds/attachment-library.seed';

describe('AdminGetAttachmentLibrariesController', () =>
{
    let controller: AdminGetAttachmentLibrariesController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AdminGetAttachmentLibrariesController
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

        controller  = module.get<AdminGetAttachmentLibrariesController>(AdminGetAttachmentLibrariesController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('AdminGetAttachmentLibrariesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a attachmentLibraries', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(attachmentLibraries)));
            expect(await controller.main()).toBe(attachmentLibraries);
        });
    });
});