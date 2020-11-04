import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindModuleByIdQueryHandler } from './find-module-by-id.query-handler';
import { MockModuleRepository } from '@hades/cci/module/infrastructure/mock/mock-module.repository';
import { modules } from '@hades/cci/module/infrastructure/seeds/module.seed';
import { IModuleRepository } from '@hades/cci/module/domain/module.repository';
import { ModuleMapper } from '@hades/cci/module/domain/module.mapper';
import { FindModuleByIdQuery } from './find-module-by-id.query';
import { FindModuleByIdService } from './find-module-by-id.service';

describe('FindModuleByIdQueryHandler', () => 
{
    let queryHandler: FindModuleByIdQueryHandler;
    let service: FindModuleByIdService;
    let repository: MockModuleRepository;
    let mapper: ModuleMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindModuleByIdQueryHandler,
                {
                    provide: IModuleRepository,
                    useClass: MockModuleRepository
                },
                {
                    provide: FindModuleByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindModuleByIdQueryHandler>(FindModuleByIdQueryHandler);
        service         = module.get<FindModuleByIdService>(FindModuleByIdService);
        repository      = <MockModuleRepository>module.get<IModuleRepository>(IModuleRepository);
        mapper          = new ModuleMapper();
    });

    describe('main', () =>
    {
        test('FindModuleByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an module founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindModuleByIdQuery(
                    modules[0].id,
                
                )
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});