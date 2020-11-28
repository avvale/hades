import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateAdministrativeAreasLevel3CommandHandler } from './create-administrative-areas-level-3.command-handler';
import { administrativeAreasLevel3 } from '@hades/admin/administrative-area-level-3/infrastructure/seeds/administrative-area-level-3.seed';
import { CreateAdministrativeAreasLevel3Command } from './create-administrative-areas-level-3.command';
import { CreateAdministrativeAreasLevel3Service } from './create-administrative-areas-level-3.service';

describe('CreateAdministrativeAreasLevel3CommandHandler', () => 
{
    let commandHandler: CreateAdministrativeAreasLevel3CommandHandler;
    let service: CreateAdministrativeAreasLevel3Service;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateAdministrativeAreasLevel3CommandHandler,
                {
                    provide: CreateAdministrativeAreasLevel3Service,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateAdministrativeAreasLevel3CommandHandler>(CreateAdministrativeAreasLevel3CommandHandler);
        service         = module.get<CreateAdministrativeAreasLevel3Service>(CreateAdministrativeAreasLevel3Service);
    });

    describe('main', () => 
    {
        test('CreateAdministrativeAreasLevel3CommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an administrativeAreaLevel3 created', async () => 
        {
            expect(await commandHandler.execute(
                new CreateAdministrativeAreasLevel3Command(
                    administrativeAreasLevel3
                
                )
            )).toBe(undefined);
        });
    });
});