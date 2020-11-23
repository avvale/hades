import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminCreateAttachmentsController } from './admin-create-attachments.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { attachments } from '@hades/admin/attachment/infrastructure/seeds/attachment.seed';

describe('AdminCreateAttachmentsController', () => 
{
    let controller: AdminCreateAttachmentsController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AdminCreateAttachmentsController
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

        controller  = module.get<AdminCreateAttachmentsController>(AdminCreateAttachmentsController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('AdminCreateAttachmentsController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return an attachments created', async () => 
        {
            expect(await controller.main(attachments)).toBe(undefined);
        });
    });
});