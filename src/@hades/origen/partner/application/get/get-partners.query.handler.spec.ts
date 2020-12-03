import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetPartnersQueryHandler } from './get-partners.query-handler';
import { MockPartnerRepository } from '@hades/origen/partner/infrastructure/mock/mock-partner.repository';
import { IPartnerRepository } from '@hades/origen/partner/domain/partner.repository';
import { PartnerMapper } from '@hades/origen/partner/domain/partner.mapper';
import { GetPartnersQuery } from './get-partners.query';
import { GetPartnersService } from './get-partners.service';

describe('GetPartnersQueryHandler', () => 
{
    let queryHandler: GetPartnersQueryHandler;
    let service: GetPartnersService;
    let repository: MockPartnerRepository;
    let mapper: PartnerMapper;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetPartnersQueryHandler,
                {
                    provide: IPartnerRepository,
                    useClass: MockPartnerRepository
                },
                {
                    provide: GetPartnersService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<GetPartnersQueryHandler>(GetPartnersQueryHandler);
        service         = module.get<GetPartnersService>(GetPartnersService);
        repository      = <MockPartnerRepository>module.get<IPartnerRepository>(IPartnerRepository);
        mapper          = new PartnerMapper();
    });

    describe('main', () => 
    {
        test('GetPartnersQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an partners founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new GetPartnersQuery()
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});