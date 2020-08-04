import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';
import { Command } from '@hades/shared/domain/persistence/sql-statement-input';

// custom items
import { PaginateModulesService } from './paginate-modules.service';
import { IModuleRepository } from './../../domain/module.repository';
import { MockModuleRepository } from './../../infrastructure/mock/mock-module.repository';

describe('PaginateModulesService', () => 
{
    let service: PaginateModulesService;
    let repository: IModuleRepository;
    let mockRepository: MockModuleRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                PaginateModulesService,
                MockModuleRepository,
                { 
                    provide: IModuleRepository,
                    useValue: {
                        paginate: (queryStatements, constraints) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(PaginateModulesService);
        repository      = module.get(IModuleRepository);
        mockRepository  = module.get(MockModuleRepository);
    });

    describe('main', () => 
    {
        test('PaginateModulesService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should paginate modules', async () => 
        {
            jest.spyOn(repository, 'paginate').mockImplementation(() => new Promise(resolve => resolve({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows: mockRepository.collectionSource.slice(0,10)
            })));
            expect(await service.main([
                {
                    'command': Command.OFFSET,
                    'value': 0
                },
                {
                    'command': Command.LIMIT,
                    'value': 10
                }
            ], [])).toStrictEqual({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows: mockRepository.collectionSource.slice(0,10)
            });
        });
    });
});