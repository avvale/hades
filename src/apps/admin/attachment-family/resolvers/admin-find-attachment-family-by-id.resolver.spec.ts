import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminFindAttachmentFamilyByIdResolver } from './admin-find-attachment-family-by-id.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { attachmentFamilies } from '@hades/admin/attachment-family/infrastructure/seeds/attachment-family.seed';

describe('AdminFindAttachmentFamilyByIdResolver', () => 
{
    let resolver: AdminFindAttachmentFamilyByIdResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminFindAttachmentFamilyByIdResolver,
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

        resolver    = module.get<AdminFindAttachmentFamilyByIdResolver>(AdminFindAttachmentFamilyByIdResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AdminFindAttachmentFamilyByIdResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('AdminFindAttachmentFamilyByIdResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an attachmentFamily by id', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(attachmentFamilies[0])));
            expect(await resolver.main(attachmentFamilies[0].id)).toBe(attachmentFamilies[0]);
        });
    });
});