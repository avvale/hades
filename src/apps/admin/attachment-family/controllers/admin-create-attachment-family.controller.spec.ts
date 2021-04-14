import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminCreateAttachmentFamilyController } from './admin-create-attachment-family.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { attachmentFamilies } from '@hades/admin/attachment-family/infrastructure/seeds/attachment-family.seed';

describe('AdminCreateAttachmentFamilyController', () =>
{
    let controller: AdminCreateAttachmentFamilyController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AdminCreateAttachmentFamilyController
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

        controller  = module.get<AdminCreateAttachmentFamilyController>(AdminCreateAttachmentFamilyController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('AdminCreateAttachmentFamilyController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an attachmentFamily created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(attachmentFamilies[0])));
            expect(await controller.main(attachmentFamilies[0])).toBe(attachmentFamilies[0]);
        });
    });
});