import { ApiProperty } from '@nestjs/swagger';
import { CreateTenantCatalogObjectDto } from './create-tenant-catalog-object.dto';
import { CreateSystemCatalogObjectDto } from './create-system-catalog-object.dto';
import { CreateFlowCatalogObjectDto } from './create-flow-catalog-object.dto';
import { CreateChannelCatalogObjectDto } from './create-channel-catalog-object.dto';
import { CreateModuleCatalogObjectDto } from './create-module-catalog-object.dto';

export class CreateCatalogDto 
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

    @ApiProperty({
        type        : [CreateChannelCatalogObjectDto],
        description : 'message details object',
        example     : [{
            party: 'SAMPLE_CHANNEL_PARTY',
            component: 'SAMPLE_CHANNEL_COMPONENT',
            name: 'SAMPLE_CHANNEL_NAME',
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
    channels: CreateChannelCatalogObjectDto[];

    @ApiProperty({
        type        : [CreateModuleCatalogObjectDto],
        description : 'channel details object',
        example     : [{ 
            channelParty: 'SAMPLE_CHANNEL_PARTY',
            channelComponent: 'SAMPLE_CHANNEL_COMPONENT',
            channelName: 'SAMPLE_CHANNEL_NAME',
            version: '0.0.0',
            parameterGroup: 'SAMPLE_PARAMETER_GROUP',
            name: 'SAMPLE_MODULE_NAME',
            parameterName: 'SAMPLE_PARAMETER_NAME',
            parameterValue: 'SAMPLE_PARAMETER_VALUE',
        }]
    })
    modules: CreateModuleCatalogObjectDto[];
}
