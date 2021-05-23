import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindContactQueryHandler } from './find-contact.query-handler';
import { MockContactRepository } from '@hades/cci/contact/infrastructure/mock/mock-contact.repository';
import { IContactRepository } from '@hades/cci/contact/domain/contact.repository';
import { ContactMapper } from '@hades/cci/contact/domain/contact.mapper';
import { FindContactQuery } from './find-contact.query';
import { FindContactService } from './find-contact.service';

describe('FindContactQueryHandler', () =>
{
    let queryHandler: FindContactQueryHandler;
    let service: FindContactService;
    let repository: MockContactRepository;
    let mapper: ContactMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindContactQueryHandler,
                {
                    provide: IContactRepository,
                    useClass: MockContactRepository
                },
                {
                    provide: FindContactService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindContactQueryHandler>(FindContactQueryHandler);
        service         = module.get<FindContactService>(FindContactService);
        repository      = <MockContactRepository>module.get<IContactRepository>(IContactRepository);
        mapper          = new ContactMapper();
    });

    describe('main', () =>
    {
        test('FindContactQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an contact founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindContactQuery()
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});