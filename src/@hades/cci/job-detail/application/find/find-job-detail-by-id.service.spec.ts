import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { jobsDetail } from '@hades/cci/job-detail/infrastructure/seeds/job-detail.seed';
import { FindJobDetailByIdService } from './find-job-detail-by-id.service';
import { JobDetailId } from './../../domain/value-objects';
import { IJobDetailRepository } from './../../domain/job-detail.repository';
import { MockJobDetailRepository } from './../../infrastructure/mock/mock-job-detail.repository';

describe('FindJobDetailByIdService', () =>
{
    let service: FindJobDetailByIdService;
    let repository: IJobDetailRepository;
    let mockRepository: MockJobDetailRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindJobDetailByIdService,
                MockJobDetailRepository,
                {
                    provide: IJobDetailRepository,
                    useValue: {
                        findById: (id) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(FindJobDetailByIdService);
        repository      = module.get(IJobDetailRepository);
        mockRepository  = module.get(MockJobDetailRepository);
    });

    describe('main', () => 
    {
        test('FindJobDetailByIdService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should find jobDetail by id', async () => 
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new JobDetailId(jobsDetail[0].id)
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});