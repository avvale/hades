import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminUpdateAttachmentFamilyResolver } from './admin-update-attachment-family.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { attachmentFamilies } from '@hades/admin/attachment-family/infrastructure/seeds/attachment-family.seed';
import { AdminUpdateAttachmentFamilyInput } from './../../../../graphql';

describe('AdminUpdateAttachmentFamilyResolver', () =>
{
    let resolver: AdminUpdateAttachmentFamilyResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminUpdateAttachmentFamilyResolver,
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

        resolver    = module.get<AdminUpdateAttachmentFamilyResolver>(AdminUpdateAttachmentFamilyResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AdminUpdateAttachmentFamilyResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AdminUpdateAttachmentFamilyResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a attachmentFamily created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(attachmentFamilies[0])));
            expect(await resolver.main(<AdminUpdateAttachmentFamilyInput>attachmentFamilies[0])).toBe(attachmentFamilies[0]);
        });
    });
});