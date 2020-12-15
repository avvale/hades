import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminUpdateAttachmentLibraryResolver } from './admin-update-attachment-library.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { attachmentLibrary } from '@hades/admin/attachment-library/infrastructure/seeds/attachment-library.seed';
import { AdminUpdateAttachmentLibraryInput } from './../../../../graphql';

describe('AdminUpdateAttachmentLibraryResolver', () => 
{
    let resolver: AdminUpdateAttachmentLibraryResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminUpdateAttachmentLibraryResolver,
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

        resolver  = module.get<AdminUpdateAttachmentLibraryResolver>(AdminUpdateAttachmentLibraryResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AdminUpdateAttachmentLibraryResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('AdminUpdateAttachmentLibraryResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a attachmentLibrary created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(attachmentLibrary[0])));
            expect(await resolver.main(<AdminUpdateAttachmentLibraryInput>attachmentLibrary[0])).toBe(attachmentLibrary[0]);
        });
    });
});