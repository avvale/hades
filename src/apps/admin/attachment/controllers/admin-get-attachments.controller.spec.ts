import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminGetAttachmentsController } from './admin-get-attachments.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { attachments } from '@hades/admin/attachment/infrastructure/seeds/attachment.seed';

describe('AdminGetAttachmentsController', () => 
{
    let controller: AdminGetAttachmentsController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AdminGetAttachmentsController
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

        controller  = module.get<AdminGetAttachmentsController>(AdminGetAttachmentsController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('AdminGetAttachmentsController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return a attachments', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(attachments)));
            expect(await controller.main()).toBe(attachments);
        });
    });
});