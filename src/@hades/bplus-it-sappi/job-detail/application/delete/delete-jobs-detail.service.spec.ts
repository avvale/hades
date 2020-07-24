import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { DeleteJobsDetailService } from './delete-jobs-detail.service';
import { IJobDetailRepository } from './../../domain/job-detail.repository';
import { MockJobDetailRepository } from './../../infrastructure/mock/mock-job-detail.repository';

describe('DeleteJobsDetailService', () => 
{
    let service: DeleteJobsDetailService;
    let repository: IJobDetailRepository;
    let mockRepository: MockJobDetailRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteJobsDetailService,
                MockJobDetailRepository,
                { 
                    provide: IJobDetailRepository,
                    useValue: {
                        get: (queryStatements) => {},
                        delete: (queryStatements) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(DeleteJobsDetailService);
        repository      = module.get(IJobDetailRepository);
        mockRepository  = module.get(MockJobDetailRepository);
    });

    describe('main', () => 
    {
        test('DeleteJobsDetailService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should delete jobDetail and emit event', async () => 
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve([])));
            expect(await service.main([])).toBe(undefined);
        });
    });
});