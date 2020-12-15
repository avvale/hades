import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminPaginateAttachmentLibraryResolver } from './admin-paginate-attachment-library.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { attachmentLibrary } from '@hades/admin/attachment-library/infrastructure/seeds/attachment-library.seed';

describe('AdminPaginateAttachmentLibraryResolver', () => 
{
    let resolver: AdminPaginateAttachmentLibraryResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminPaginateAttachmentLibraryResolver,
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

        resolver    = module.get<AdminPaginateAttachmentLibraryResolver>(AdminPaginateAttachmentLibraryResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AdminPaginateAttachmentLibraryResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('AdminPaginateAttachmentLibraryResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a attachmentLibrary', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(attachmentLibrary)));
            expect(await resolver.main()).toBe(attachmentLibrary);
        });
    });
});