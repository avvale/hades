import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminUpdateAttachmentResolver } from './admin-update-attachment.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { attachments } from '@hades/admin/attachment/infrastructure/seeds/attachment.seed';
import { AdminUpdateAttachmentInput } from './../../../../graphql';

describe('AdminUpdateAttachmentResolver', () => 
{
    let resolver: AdminUpdateAttachmentResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminUpdateAttachmentResolver,
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

        resolver  = module.get<AdminUpdateAttachmentResolver>(AdminUpdateAttachmentResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AdminUpdateAttachmentResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('AdminUpdateAttachmentResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a attachment created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(attachments[0])));
            expect(await resolver.main(<AdminUpdateAttachmentInput>attachments[0])).toBe(attachments[0]);
        });
    });
});