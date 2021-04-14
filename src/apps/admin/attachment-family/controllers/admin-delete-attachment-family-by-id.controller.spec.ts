import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminDeleteAttachmentFamilyByIdController } from './admin-delete-attachment-family-by-id.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { attachmentFamilies } from '@hades/admin/attachment-family/infrastructure/seeds/attachment-family.seed';

describe('AdminDeleteAttachmentFamilyByIdController', () =>
{
    let controller: AdminDeleteAttachmentFamilyByIdController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AdminDeleteAttachmentFamilyByIdController
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

        controller  = module.get<AdminDeleteAttachmentFamilyByIdController>(AdminDeleteAttachmentFamilyByIdController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('AdminDeleteAttachmentFamilyByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an attachmentFamily deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(attachmentFamilies[0])));
            expect(await controller.main(attachmentFamilies[0].id)).toBe(attachmentFamilies[0]);
        });
    });
});