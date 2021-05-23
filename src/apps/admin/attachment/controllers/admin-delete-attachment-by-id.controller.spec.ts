import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminDeleteAttachmentByIdController } from './admin-delete-attachment-by-id.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { attachments } from '@hades/admin/attachment/infrastructure/seeds/attachment.seed';

describe('AdminDeleteAttachmentByIdController', () =>
{
    let controller: AdminDeleteAttachmentByIdController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AdminDeleteAttachmentByIdController
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

        controller  = module.get<AdminDeleteAttachmentByIdController>(AdminDeleteAttachmentByIdController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('AdminDeleteAttachmentByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an attachment deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(attachments[0])));
            expect(await controller.main(attachments[0].id)).toBe(attachments[0]);
        });
    });
});