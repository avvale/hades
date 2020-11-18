import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminGetAttachmentsResolver } from './admin-get-attachments.resolver'; 
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { attachments } from '@hades/admin/attachment/infrastructure/seeds/attachment.seed';

describe('AdminGetAttachmentsResolver', () => 
{
    let resolver:   AdminGetAttachmentsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminGetAttachmentsResolver,
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

        resolver    = module.get<AdminGetAttachmentsResolver>(AdminGetAttachmentsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AdminGetAttachmentsResolver should be defined', () => 
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () => 
    {
        test('AdminGetAttachmentsResolver should be defined', () => 
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a attachments', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(attachments)));
            expect(await resolver.main()).toBe(attachments);
        });
    });
});