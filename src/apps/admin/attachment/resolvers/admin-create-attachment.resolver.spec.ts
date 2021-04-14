import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminCreateAttachmentResolver } from './admin-create-attachment.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { attachments } from '@hades/admin/attachment/infrastructure/seeds/attachment.seed';
import { AdminCreateAttachmentInput } from './../../../../graphql';

describe('AdminCreateAttachmentResolver', () =>
{
    let resolver: AdminCreateAttachmentResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminCreateAttachmentResolver,
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

        resolver    = module.get<AdminCreateAttachmentResolver>(AdminCreateAttachmentResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AdminCreateAttachmentResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AdminCreateAttachmentResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an attachment created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(attachments[0])));
            expect(await resolver.main(<AdminCreateAttachmentInput>attachments[0])).toBe(attachments[0]);
        });
    });
});