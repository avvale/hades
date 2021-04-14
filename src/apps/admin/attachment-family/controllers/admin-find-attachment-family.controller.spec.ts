import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminFindAttachmentFamilyController } from './admin-find-attachment-family.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { attachmentFamilies } from '@hades/admin/attachment-family/infrastructure/seeds/attachment-family.seed';

describe('AdminFindAttachmentFamilyController', () =>
{
    let controller: AdminFindAttachmentFamilyController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AdminFindAttachmentFamilyController
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

        controller  = module.get<AdminFindAttachmentFamilyController>(AdminFindAttachmentFamilyController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('AdminFindAttachmentFamilyController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a attachmentFamily', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(attachmentFamilies[0])));
            expect(await controller.main()).toBe(attachmentFamilies[0]);
        });
    });
});