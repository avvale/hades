import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminDeleteAttachmentLibraryResolver } from './admin-delete-attachment-library.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { attachmentLibrary } from '@hades/admin/attachment-library/infrastructure/seeds/attachment-library.seed';

describe('AdminDeleteAttachmentLibraryResolver', () => 
{
    let resolver: AdminDeleteAttachmentLibraryResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminDeleteAttachmentLibraryResolver,
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

        resolver    = module.get<AdminDeleteAttachmentLibraryResolver>(AdminDeleteAttachmentLibraryResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AdminDeleteAttachmentLibraryResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('AdminDeleteAttachmentLibraryResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an attachmentLibrary deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(attachmentLibrary)));
            expect(await resolver.main()).toBe(attachmentLibrary);
        });
    });
});