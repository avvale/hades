import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminGetAttachmentFamiliesResolver } from './admin-get-attachment-families.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { attachmentFamilies } from '@hades/admin/attachment-family/infrastructure/seeds/attachment-family.seed';

describe('AdminGetAttachmentFamiliesResolver', () =>
{
    let resolver:   AdminGetAttachmentFamiliesResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminGetAttachmentFamiliesResolver,
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

        resolver    = module.get<AdminGetAttachmentFamiliesResolver>(AdminGetAttachmentFamiliesResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AdminGetAttachmentFamiliesResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('AdminGetAttachmentFamiliesResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a attachmentFamilies', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(attachmentFamilies)));
            expect(await resolver.main()).toBe(attachmentFamilies);
        });
    });
});