import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { PaginateContactsQueryHandler } from './paginate-contacts.query-handler';
import { MockContactRepository } from '@hades/cci/contact/infrastructure/mock/mock-contact.repository';
import { IContactRepository } from '@hades/cci/contact/domain/contact.repository';
import { ContactMapper } from '@hades/cci/contact/domain/contact.mapper';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateContactsQuery } from './paginate-contacts.query';
import { PaginateContactsService } from './paginate-contacts.service';

describe('PaginateContactsQueryHandler', () => 
{
    let queryHandler: PaginateContactsQueryHandler;
    let service: PaginateContactsService;
    let repository: MockContactRepository;
    let mapper: ContactMapper;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateContactsQueryHandler,
                {
                    provide: IContactRepository,
                    useClass: MockContactRepository
                },
                {
                    provide: PaginateContactsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<PaginateContactsQueryHandler>(PaginateContactsQueryHandler);
        service         = module.get<PaginateContactsService>(PaginateContactsService);
        repository      = <MockContactRepository>module.get<IContactRepository>(IContactRepository);
        mapper          = new ContactMapper();
    });

    describe('main', () => 
    {
        test('PaginateContactsQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an contacts paginated', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows: repository.collectionSource.slice(0,10)
                }
            )));
            expect(await queryHandler.execute(
                new PaginateContactsQuery(
                    {
                        offset: 0,
                        limit: 10
                    }
                )
            )).toStrictEqual(
                new PaginationResponse(
                    100, 
                    10, 
                    repository.collectionSource.slice(0,10).map(item => item.toDTO())
                )
            );
        });
    });
});