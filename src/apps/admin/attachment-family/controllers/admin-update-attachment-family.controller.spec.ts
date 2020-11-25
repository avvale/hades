import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminUpdateAttachmentFamilyController } from './admin-update-attachment-family.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { attachmentFamilies } from '@hades/admin/attachment-family/infrastructure/seeds/attachment-family.seed';

describe('AdminUpdateAttachmentFamilyController', () => 
{
    let controller: AdminUpdateAttachmentFamilyController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AdminUpdateAttachmentFamilyController
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

        controller  = module.get<AdminUpdateAttachmentFamilyController>(AdminUpdateAttachmentFamilyController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('AdminUpdateAttachmentFamilyController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return a attachmentFamily created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(attachmentFamilies[0])));
            expect(await controller.main(attachmentFamilies[0])).toBe(attachmentFamilies[0]);
        });
    });
});