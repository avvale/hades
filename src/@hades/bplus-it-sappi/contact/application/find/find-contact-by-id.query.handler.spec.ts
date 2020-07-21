import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindContactByIdQueryHandler } from './find-contact-by-id.query-handler';
import { MockContactRepository } from '@hades/bplus-it-sappi/contact/infrastructure/mock/mock-contact.repository';
import { contacts } from '@hades/bplus-it-sappi/contact/infrastructure/seeds/contact.seed';
import { IContactRepository } from '@hades/bplus-it-sappi/contact/domain/contact.repository';
import { ContactMapper } from '@hades/bplus-it-sappi/contact/domain/contact.mapper';
import { FindContactByIdQuery } from './find-contact-by-id.query';
import { FindContactByIdService } from './find-contact-by-id.service';

describe('FindContactByIdQueryHandler', () => 
{
    let queryHandler: FindContactByIdQueryHandler;
    let service: FindContactByIdService;
    let repository: MockContactRepository;
    let mapper: ContactMapper;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindContactByIdQueryHandler,
                {
                    provide: IContactRepository,
                    useClass: MockContactRepository
                },
                {
                    provide: FindContactByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindContactByIdQueryHandler>(FindContactByIdQueryHandler);
        service         = module.get<FindContactByIdService>(FindContactByIdService);
        repository      = <MockContactRepository>module.get<IContactRepository>(IContactRepository);
        mapper          = new ContactMapper();
    });

    describe('main', () => 
    {
        test('FindContactByIdQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an contact founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindContactByIdQuery(
                    contacts[0].id,
                
                )
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});