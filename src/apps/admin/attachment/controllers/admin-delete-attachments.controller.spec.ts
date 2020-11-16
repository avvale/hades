import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminDeleteAttachmentsController } from './admin-delete-attachments.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { attachments } from '@hades/admin/attachment/infrastructure/seeds/attachment.seed';

describe('AdminDeleteAttachmentsController', () => 
{
    let controller: AdminDeleteAttachmentsController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AdminDeleteAttachmentsController
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

        controller  = module.get<AdminDeleteAttachmentsController>(AdminDeleteAttachmentsController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('AdminDeleteAttachmentsController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return an attachments deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(attachments)));
            expect(await controller.main()).toBe(attachments);
        });
    });
});