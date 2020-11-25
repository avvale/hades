import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminFindAttachmentFamilyResolver } from './admin-find-attachment-family.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { attachmentFamilies } from '@hades/admin/attachment-family/infrastructure/seeds/attachment-family.seed';

describe('AdminFindAttachmentFamilyResolver', () => 
{
    let resolver: AdminFindAttachmentFamilyResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminFindAttachmentFamilyResolver,
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

        resolver    = module.get<AdminFindAttachmentFamilyResolver>(AdminFindAttachmentFamilyResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AdminFindAttachmentFamilyResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('AdminFindAttachmentFamilyResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a attachmentFamily', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(attachmentFamilies[0])));
            expect(await resolver.main()).toBe(attachmentFamilies[0]);
        });
    });
});