import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminDeleteAttachmentFamiliesController } from './admin-delete-attachment-families.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { attachmentFamilies } from '@hades/admin/attachment-family/infrastructure/seeds/attachment-family.seed';

describe('AdminDeleteAttachmentFamiliesController', () =>
{
    let controller: AdminDeleteAttachmentFamiliesController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AdminDeleteAttachmentFamiliesController
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

        controller  = module.get<AdminDeleteAttachmentFamiliesController>(AdminDeleteAttachmentFamiliesController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('AdminDeleteAttachmentFamiliesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an attachmentFamilies deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(attachmentFamilies)));
            expect(await controller.main()).toBe(attachmentFamilies);
        });
    });
});