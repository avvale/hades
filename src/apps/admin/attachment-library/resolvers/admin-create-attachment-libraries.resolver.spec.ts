import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminCreateAttachmentLibrariesResolver } from './admin-create-attachment-libraries.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { attachmentLibraries } from '@hades/admin/attachment-library/infrastructure/seeds/attachment-library.seed';
import { AdminCreateAttachmentLibraryInput } from './../../../../graphql';

describe('AdminCreateAttachmentLibrariesResolver', () => 
{
    let resolver: AdminCreateAttachmentLibrariesResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminCreateAttachmentLibrariesResolver,
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

        resolver    = module.get<AdminCreateAttachmentLibrariesResolver>(AdminCreateAttachmentLibrariesResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AdminCreateAttachmentLibrariesResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('AdminCreateAttachmentLibrariesResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an attachmentLibraries created', async () => 
        {
            expect(await resolver.main(<AdminCreateAttachmentLibraryInput[]>attachmentLibraries)).toBe(true);
        });
    });
});