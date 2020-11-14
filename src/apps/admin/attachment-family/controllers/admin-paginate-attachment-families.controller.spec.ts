import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminPaginateAttachmentFamiliesController } from './admin-paginate-attachment-families.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { attachmentFamilies } from '@hades/admin/attachment-family/infrastructure/seeds/attachment-family.seed';

describe('AdminPaginateAttachmentFamiliesController', () => 
{
    let controller: AdminPaginateAttachmentFamiliesController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AdminPaginateAttachmentFamiliesController
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

        controller  = module.get<AdminPaginateAttachmentFamiliesController>(AdminPaginateAttachmentFamiliesController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('AdminPaginateAttachmentFamiliesController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return a attachmentFamilies', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(attachmentFamilies)));
            expect(await controller.main()).toBe(attachmentFamilies);
        });
    });
});