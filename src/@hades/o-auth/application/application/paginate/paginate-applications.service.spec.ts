import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';
import { Command } from '@hades/shared/domain/persistence/sql-statement-input';

// custom items
import { PaginateApplicationsService } from './paginate-applications.service';
import { IApplicationRepository } from './../../domain/application.repository';
import { MockApplicationRepository } from './../../infrastructure/mock/mock-application.repository';

describe('PaginateApplicationsService', () => 
{
    let service: PaginateApplicationsService;
    let repository: IApplicationRepository;
    let mockRepository: MockApplicationRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                PaginateApplicationsService,
                MockApplicationRepository,
                { 
                    provide: IApplicationRepository,
                    useValue: {
                        paginate: (queryStatements, constraints) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(PaginateApplicationsService);
        repository      = module.get(IApplicationRepository);
        mockRepository  = module.get(MockApplicationRepository);
    });

    describe('main', () => 
    {
        test('PaginateApplicationsService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should paginate applications', async () => 
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