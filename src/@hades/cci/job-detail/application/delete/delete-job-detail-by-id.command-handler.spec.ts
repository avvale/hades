import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteJobDetailByIdCommandHandler } from './delete-job-detail-by-id.command-handler';
import { jobsDetail } from '@hades/cci/job-detail/infrastructure/seeds/job-detail.seed';
import { DeleteJobDetailByIdCommand } from './delete-job-detail-by-id.command';
import { DeleteJobDetailByIdService } from './delete-job-detail-by-id.service';

describe('DeleteJobDetailByIdCommandHandler', () =>
{
    let commandHandler: DeleteJobDetailByIdCommandHandler;
    let service: DeleteJobDetailByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteJobDetailByIdCommandHandler,
                {
                    provide: DeleteJobDetailByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteJobDetailByIdCommandHandler>(DeleteJobDetailByIdCommandHandler);
        service         = module.get<DeleteJobDetailByIdService>(DeleteJobDetailByIdService);
    });

    describe('main', () =>
    {
        test('DeleteJobDetailByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the DeleteJobDetailByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteJobDetailByIdCommand(
                    jobsDetail[0].id,
                )
            )).toBe(undefined);
        });
    });
});