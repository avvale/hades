import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetContactsQueryHandler } from './get-contacts.query-handler';
import { MockContactRepository } from '@hades/bplus-it-sappi/contact/infrastructure/mock/mock-contact.repository';
import { IContactRepository } from '@hades/bplus-it-sappi/contact/domain/contact.repository';
import { ContactMapper } from '@hades/bplus-it-sappi/contact/domain/contact.mapper';
import { GetContactsQuery } from './get-contacts.query';
import { GetContactsService } from './get-contacts.service';

describe('GetContactsQueryHandler', () => 
{
    let queryHandler: GetContactsQueryHandler;
    let service: GetContactsService;
    let repository: MockContactRepository;
    let mapper: ContactMapper;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetContactsQueryHandler,
                {
                    provide: IContactRepository,
                    useClass: MockContactRepository
                },
                {
                    provide: GetContactsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<GetContactsQueryHandler>(GetContactsQueryHandler);
        service         = module.get<GetContactsService>(GetContactsService);
        repository      = <MockContactRepository>module.get<IContactRepository>(IContactRepository);
        mapper          = new ContactMapper();
    });

    describe('main', () => 
    {
        test('GetContactsQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an contacts founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new GetContactsQuery()
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});