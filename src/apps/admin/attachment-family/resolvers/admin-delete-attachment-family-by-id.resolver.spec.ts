import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminDeleteAttachmentFamilyByIdResolver } from './admin-delete-attachment-family-by-id.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { attachmentFamilies } from '@hades/admin/attachment-family/infrastructure/seeds/attachment-family.seed';

describe('AdminDeleteAttachmentFamilyByIdResolver', () => 
{
    let resolver: AdminDeleteAttachmentFamilyByIdResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminDeleteAttachmentFamilyByIdResolver,
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

        resolver    = module.get<AdminDeleteAttachmentFamilyByIdResolver>(AdminDeleteAttachmentFamilyByIdResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AdminDeleteAttachmentFamilyByIdResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('AdminDeleteAttachmentFamilyByIdResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an attachmentFamily deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(attachmentFamilies[0])));
            expect(await resolver.main(attachmentFamilies[0].id)).toBe(attachmentFamilies[0]);
        });
    });
});