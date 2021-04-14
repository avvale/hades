import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminUpdateAttachmentController } from './admin-update-attachment.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { attachments } from '@hades/admin/attachment/infrastructure/seeds/attachment.seed';

describe('AdminUpdateAttachmentController', () =>
{
    let controller: AdminUpdateAttachmentController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AdminUpdateAttachmentController
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

        controller  = module.get<AdminUpdateAttachmentController>(AdminUpdateAttachmentController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('AdminUpdateAttachmentController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a attachment created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(attachments[0])));
            expect(await controller.main(attachments[0])).toBe(attachments[0]);
        });
    });
});