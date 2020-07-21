import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindActionQueryHandler } from './find-action.query-handler';
import { MockActionRepository } from '@hades/nfc/action/infrastructure/mock/mock-action.repository';
import { IActionRepository } from '@hades/nfc/action/domain/action.repository';
import { ActionMapper } from '@hades/nfc/action/domain/action.mapper';
import { FindActionQuery } from './find-action.query';
import { FindActionService } from './find-action.service';

describe('FindActionQueryHandler', () => 
{
    let queryHandler: FindActionQueryHandler;
    let service: FindActionService;
    let repository: MockActionRepository;
    let mapper: ActionMapper;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindActionQueryHandler,
                {
                    provide: IActionRepository,
                    useClass: MockActionRepository
                },
                {
                    provide: FindActionService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindActionQueryHandler>(FindActionQueryHandler);
        service         = module.get<FindActionService>(FindActionService);
        repository      = <MockActionRepository>module.get<IActionRepository>(IActionRepository);
        mapper          = new ActionMapper();
    });

    describe('main', () => 
    {
        test('FindActionQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an action founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindActionQuery()
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});