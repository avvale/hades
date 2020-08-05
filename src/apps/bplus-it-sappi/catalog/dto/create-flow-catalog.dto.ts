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
            party: 'SAMPLE_CHANNEL_PARTY',
            component: 'SAMPLE_CHANNEL_COMPONENT',
            name: 'SAMPLE_CHANNEL_NAME',
            flowParty: 'SAMPLE_CHANNEL_FLOWPARTY',
            flowComponent: 'SAMPLE_CHANNEL_FLOWCOMPONENT',
            flowInterfaceName: 'SAMPLE_CHANNEL_FLOWINTERFACE',
            flowInterfaceNamespace: 'SAMPLE_CHANNEL_FLOWINTERFACENAMESPACE',
            version: '0.0.0',
            adapterType: 'FILE',
            direction: 'FILE',
            transportProtocol: 'FILE',
            messageProtocol: 'FILE',
            adapterEngineName: 'ADAPTER_ENGINE',
            url: 'http://loremipsumdolorsitamet.mock',
            username: 'loremipsumdolorsitamet',
            remoteHost: '192.168.0.0.1',
            remotePort: 8888,
            directory: 'mock/folder/directory',
            fileSchema: 'sample_file.xml',
            proxyHost: 'http://loremipsumdolorsitamet.mock',
            proxyPort: 8888,
            destination: 'SAMPLE_CHANNEL_DESTINATION',
            adapterStatus: 'SAMPLE_CHANNEL_DESTINATION',
            softwareComponentName: 'SAMPLE_CHANNEL_SOFTWARE',
            responsibleUserAccountName: 'loremipsum',
            lastChangeUserAccount: 'loremipsum',
            lastChangedAt: '2020-07-06 19:24:52',
        }]
    })
    flows: CreateFlowCatalogObjectDto[];
}
