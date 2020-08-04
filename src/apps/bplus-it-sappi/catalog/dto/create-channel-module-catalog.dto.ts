import { ApiProperty } from '@nestjs/swagger';
import { CreateTenantCatalogDto } from './create-tenant-catalog.dto';
import { CreateSystemCatalogDto } from './create-system-catalog.dto';
import { CreateChannelCatalogDto } from './create-channel-catalog.dto';
import { CreateModuleCatalogDto } from './create-module-catalog.dto';

export class CreateChannelModuleCatalogDto 
{   
    @ApiProperty({
        type        : CreateTenantCatalogDto,
        description : 'tenant object',
        example     : { 
            "code": "TECHEDGE"
        }
    })
    tenant: CreateTenantCatalogDto;

    @ApiProperty({
        type        : CreateSystemCatalogDto,
        description : 'system object',
        example     : { 
            "name": "PIJ"
        }
    })
    system: CreateSystemCatalogDto;

    @ApiProperty({
        type        : [CreateChannelCatalogDto],
        description : 'message details object',
        example     : [{ 
            flowParty: '',
            flowComponent: 'BC_SII_BROKER',
            flowInterfaceName: 'SI_IA_ProcesarLote',
            flowInterfaceNamespace: 'urn:techedgegroup.com:sii:lotes',
            status: 'ERROR',
            startTimeAt: '2020-07-21 12:23:13',
            scenario: 'dir://ICO/9dc25e232809330dacae8c438ee9c3da',
            direction: 'OUTBOUND',
            errorCategory: 'XI_J2EE_ADAPTER_SOAP',
            errorCode: 'SOAP_ADAPTER_PROCESSING_ERROR',
            errorLabel: 2003,
            node: 8071536873,
            protocol: '6810i98gcpgr0edip3a1',
            qualityOfService: 'EO',
            receiverParty: '',
            receiverComponent: 'BC_SII_DASHBOARD',
            receiverInterface: 'SI_IA_ProcesarLote',
            receiverInterfaceNamespace: 'urn:techedgegroup.com:sii:lotes',
            retries: 3,
            size: 4502,
            timesFailed: 4,
            example: '1c9e4c0a-9e66-11ea-cf75-0000001ba2ce',
            detail: 'aG9sYSBtdW5kbw=='
        }]
    })
    channels: CreateChannelCatalogDto[];

    @ApiProperty({
        type        : [CreateModuleCatalogDto],
        description : 'channel details object',
        example     : [{ 
            status: 'ERROR',
            channelSapId: '045A58RT',
            channelName: 'CC_S_REST',
            channelComponent: 'BC_REST_CV',
            channelParty: '',
            detail: 'aG9sYSBtdW5kbw=='
        }]
    })
    modules: CreateModuleCatalogDto[];
}
