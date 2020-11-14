import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminCreateAttachmentFamilyResolver } from './admin-create-attachment-family.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { attachmentFamilies } from '@hades/admin/attachment-family/infrastructure/seeds/attachment-family.seed';
import { AdminCreateAttachmentFamilyInput } from './../../../../graphql';

describe('AdminCreateAttachmentFamilyResolver', () =>
{
    let resolver: AdminCreateAttachmentFamilyResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminCreateAttachmentFamilyResolver,
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

        resolver    = module.get<AdminCreateAttachmentFamilyResolver>(AdminCreateAttachmentFamilyResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AdminCreateAttachmentFamilyResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('AdminCreateAttachmentFamilyResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an attachmentFamily created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(attachmentFamilies[0])));
            expect(await resolver.main(<AdminCreateAttachmentFamilyInput>attachmentFamilies[0])).toBe(attachmentFamilies[0]);
        });
    });
});