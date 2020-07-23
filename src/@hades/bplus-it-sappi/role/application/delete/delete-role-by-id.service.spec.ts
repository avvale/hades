import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { roles } from '@hades/bplus-it-sappi/role/infrastructure/seeds/role.seed';
import { DeleteRoleByIdService } from './delete-role-by-id.service';
import { RoleId } from './../../domain/value-objects';
import { IRoleRepository } from './../../domain/role.repository';
import { MockRoleRepository } from './../../infrastructure/mock/mock-role.repository';

describe('DeleteRoleByIdService', () => 
{
    let service: DeleteRoleByIdService;
    let repository: IRoleRepository;
    let mockRepository: MockRoleRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteRoleByIdService,
                MockRoleRepository,
                { 
                    provide: IRoleRepository,
                    useValue: {
                        deleteById: (id) => {},
                        findById: (id) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(DeleteRoleByIdService);
        repository      = module.get(IRoleRepository);
        mockRepository  = module.get(MockRoleRepository);
    });

    describe('main', () => 
    {
        it('DeleteRoleByIdService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        it('should delete role and emit event', async () => 
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new RoleId(roles[0].id)
            )).toBe(undefined);
        });
    });
});