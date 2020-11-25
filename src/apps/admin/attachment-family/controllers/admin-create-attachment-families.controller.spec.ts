import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminCreateAttachmentFamiliesController } from './admin-create-attachment-families.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { attachmentFamilies } from '@hades/admin/attachment-family/infrastructure/seeds/attachment-family.seed';

describe('AdminCreateAttachmentFamiliesController', () => 
{
    let controller: AdminCreateAttachmentFamiliesController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AdminCreateAttachmentFamiliesController
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

        controller  = module.get<AdminCreateAttachmentFamiliesController>(AdminCreateAttachmentFamiliesController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('AdminCreateAttachmentFamiliesController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return an attachmentFamilies created', async () => 
        {
            expect(await controller.main(attachmentFamilies)).toBe(undefined);
        });
    });
});