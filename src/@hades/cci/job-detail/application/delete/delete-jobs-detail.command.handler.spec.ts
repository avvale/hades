import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteJobsDetailCommandHandler } from './delete-jobs-detail.command-handler';
import { DeleteJobsDetailCommand } from './delete-jobs-detail.command';
import { DeleteJobsDetailService } from './delete-jobs-detail.service';

describe('DeleteJobsDetailCommandHandler', () => 
{
    let commandHandler: DeleteJobsDetailCommandHandler;
    let service: DeleteJobsDetailService;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteJobsDetailCommandHandler,
                {
                    provide: DeleteJobsDetailService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteJobsDetailCommandHandler>(DeleteJobsDetailCommandHandler);
        service         = module.get<DeleteJobsDetailService>(DeleteJobsDetailService);
    });

    describe('main', () => 
    {
        test('DeleteJobsDetailCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () => 
        {
            expect(await commandHandler.execute(
                new DeleteJobsDetailCommand()
            )).toBe(undefined);
        });
    });
});