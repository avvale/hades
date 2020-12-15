import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminCreateAttachmentLibraryResolver } from './admin-create-attachment-library.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { attachmentLibrary } from '@hades/admin/attachment-library/infrastructure/seeds/attachment-library.seed';
import { AdminCreateAttachmentLibraryInput } from './../../../../graphql';

describe('AdminCreateAttachmentLibraryResolver', () =>
{
    let resolver: AdminCreateAttachmentLibraryResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminCreateAttachmentLibraryResolver,
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

        resolver    = module.get<AdminCreateAttachmentLibraryResolver>(AdminCreateAttachmentLibraryResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AdminCreateAttachmentLibraryResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('AdminCreateAttachmentLibraryResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an attachmentLibrary created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(attachmentLibrary[0])));
            expect(await resolver.main(<AdminCreateAttachmentLibraryInput>attachmentLibrary[0])).toBe(attachmentLibrary[0]);
        });
    });
});