import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminGetAttachmentLibrariesResolver } from './admin-get-attachment-libraries.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { attachmentLibraries } from '@hades/admin/attachment-library/infrastructure/seeds/attachment-library.seed';

describe('AdminGetAttachmentLibrariesResolver', () =>
{
    let resolver:   AdminGetAttachmentLibrariesResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminGetAttachmentLibrariesResolver,
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

        resolver    = module.get<AdminGetAttachmentLibrariesResolver>(AdminGetAttachmentLibrariesResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AdminGetAttachmentLibrariesResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('AdminGetAttachmentLibrariesResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a attachmentLibraries', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(attachmentLibraries)));
            expect(await resolver.main()).toBe(attachmentLibraries);
        });
    });
});