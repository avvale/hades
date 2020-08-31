import { ApiProperty } from '@nestjs/swagger';
import { CreateTenantCatalogObjectDto } from './create-tenant-catalog-object.dto';
import { CreateSystemCatalogObjectDto } from './create-system-catalog-object.dto';
import { CreateFlowCatalogObjectDto } from './create-flow-catalog-object.dto';

export class CreateFlowCatalogDto 
{   
    @ApiProperty({
        type        : CreateTenantCatalogObjectDto,
        description : 'tenant object',
        example     : { 
            "code": "TECHEDGE"
        }
    })
    tenant: CreateTenantCatalogObjectDto;

    @ApiProperty({
        type        : CreateSystemCatalogObjectDto,
        description : 'system object',
        example     : { 
            "name": "PIJ"
        }
    })
    system: CreateSystemCatalogObjectDto;

    @ApiProperty({
        type        : [CreateFlowCatalogObjectDto],
        description : 'message details object',
        example     : [{
            version: '0.0.0',
            scenario: '',
            party: 'SAMPLE_FLOW_PARTY',
			component: 'SAMPLE_FLOW_COMPONENT',
			interfaceName: 'SAMPLE_FLOW_INTERFACE',
			interfaceNamespace: 'SAMPLE_FLOW_INTERFACENAMESPACE',
			iflowName: '',
			responsibleUserAccount: 'John Doe',
			lastChangeUserAccount: 'John Doe',
			lastChangedAt: '2020-07-06 19:24:52',
			folderPath: '/',
			description: '',
            application: '',
            channels: [
                {
                    party: 'SAMPLE_CHANNEL_PARTY',
                    component: 'SAMPLE_CHANNEL_COMPONENT',
                    name: 'SAMPLE_CHANNEL_NAME'
                }
            ]
        }]
    })
    flows: CreateFlowCatalogObjectDto[];
}
