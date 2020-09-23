import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindCredentialByIdQueryHandler } from './find-credential-by-id.query-handler';
import { MockCredentialRepository } from '@hades/o-auth/credential/infrastructure/mock/mock-credential.repository';
import { credentials } from '@hades/o-auth/credential/infrastructure/seeds/credential.seed';
import { ICredentialRepository } from '@hades/o-auth/credential/domain/credential.repository';
import { CredentialMapper } from '@hades/o-auth/credential/domain/credential.mapper';
import { FindCredentialByIdQuery } from './find-credential-by-id.query';
import { FindCredentialByIdService } from './find-credential-by-id.service';

describe('FindCredentialByIdQueryHandler', () => 
{
    let queryHandler: FindCredentialByIdQueryHandler;
    let service: FindCredentialByIdService;
    let repository: MockCredentialRepository;
    let mapper: CredentialMapper;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindCredentialByIdQueryHandler,
                {
                    provide: ICredentialRepository,
                    useClass: MockCredentialRepository
                },
                {
                    provide: FindCredentialByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindCredentialByIdQueryHandler>(FindCredentialByIdQueryHandler);
        service         = module.get<FindCredentialByIdService>(FindCredentialByIdService);
        repository      = <MockCredentialRepository>module.get<ICredentialRepository>(ICredentialRepository);
        mapper          = new CredentialMapper();
    });

    describe('main', () => 
    {
        test('FindCredentialByIdQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an credential founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindCredentialByIdQuery(
                    credentials[0].id,
                
                )
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});