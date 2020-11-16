import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminCreateAttachmentsResolver } from './admin-create-attachments.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { attachments } from '@hades/admin/attachment/infrastructure/seeds/attachment.seed';
import { AdminCreateAttachmentInput } from './../../../../graphql';

describe('AdminCreateAttachmentsResolver', () => 
{
    let resolver: AdminCreateAttachmentsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminCreateAttachmentsResolver,
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

        resolver    = module.get<AdminCreateAttachmentsResolver>(AdminCreateAttachmentsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AdminCreateAttachmentsResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('AdminCreateAttachmentsResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an attachments created', async () => 
        {
            expect(await resolver.main(<AdminCreateAttachmentInput[]>attachments)).toBe(true);
        });
    });
});