import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindActionByIdQueryHandler } from './find-action-by-id.query-handler';
import { MockActionRepository } from '@hades/nfc/action/infrastructure/mock/mock-action.repository';
import { actions } from '@hades/nfc/action/infrastructure/seeds/action.seed';
import { IActionRepository } from '@hades/nfc/action/domain/action.repository';
import { ActionMapper } from '@hades/nfc/action/domain/action.mapper';
import { FindActionByIdQuery } from './find-action-by-id.query';
import { FindActionByIdService } from './find-action-by-id.service';

describe('FindActionByIdQueryHandler', () => 
{
    let queryHandler: FindActionByIdQueryHandler;
    let service: FindActionByIdService;
    let repository: MockActionRepository;
    let mapper: ActionMapper;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindActionByIdQueryHandler,
                {
                    provide: IActionRepository,
                    useClass: MockActionRepository
                },
                {
                    provide: FindActionByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindActionByIdQueryHandler>(FindActionByIdQueryHandler);
        service         = module.get<FindActionByIdService>(FindActionByIdService);
        repository      = <MockActionRepository>module.get<IActionRepository>(IActionRepository);
        mapper          = new ActionMapper();
    });

    describe('main', () => 
    {
        test('FindActionByIdQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an action founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindActionByIdQuery(
                    actions[0].id,
                
                )
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});