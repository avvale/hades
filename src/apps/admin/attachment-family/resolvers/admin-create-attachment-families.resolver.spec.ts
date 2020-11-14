import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminCreateAttachmentFamiliesResolver } from './admin-create-attachment-families.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { attachmentFamilies } from '@hades/admin/attachment-family/infrastructure/seeds/attachment-family.seed';
import { AdminCreateAttachmentFamilyInput } from './../../../../graphql';

describe('AdminCreateAttachmentFamiliesResolver', () => 
{
    let resolver: AdminCreateAttachmentFamiliesResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminCreateAttachmentFamiliesResolver,
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

        resolver    = module.get<AdminCreateAttachmentFamiliesResolver>(AdminCreateAttachmentFamiliesResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AdminCreateAttachmentFamiliesResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('AdminCreateAttachmentFamiliesResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an attachmentFamilies created', async () => 
        {
            expect(await resolver.main(<AdminCreateAttachmentFamilyInput[]>attachmentFamilies)).toBe(true);
        });
    });
});