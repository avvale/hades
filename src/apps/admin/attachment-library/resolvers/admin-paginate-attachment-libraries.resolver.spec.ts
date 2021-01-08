import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminPaginateAttachmentLibrariesResolver } from './admin-paginate-attachment-libraries.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { attachmentLibraries } from '@hades/admin/attachment-library/infrastructure/seeds/attachment-library.seed';

describe('AdminPaginateAttachmentLibrariesResolver', () => 
{
    let resolver: AdminPaginateAttachmentLibrariesResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminPaginateAttachmentLibrariesResolver,
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

        resolver    = module.get<AdminPaginateAttachmentLibrariesResolver>(AdminPaginateAttachmentLibrariesResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AdminPaginateAttachmentLibrariesResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('AdminPaginateAttachmentLibrariesResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a attachmentLibraries', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(attachmentLibraries)));
            expect(await resolver.main()).toBe(attachmentLibraries);
        });
    });
});