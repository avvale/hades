import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDetailSnapshotDto 
{   
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'ERROR',
        enum        : ['SUCCESS','CANCELLED','DELIVERING','ERROR','HOLDING','TO_BE_DELIVERED','WAITING']
    })
    status: string;

    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-21 12:23:13'
    })
    startTimeAt: string;

    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'dir://ICO/9dc25e232809330dacae8c438ee9c3da'
    })
    scenario: string;

    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : 'OUTBOUND'
    })
    direction: string;

    @ApiProperty({
        type        : String,
        description : 'errorCategory [input here api field description]',
        example     : 'XI_J2EE_ADAPTER_SOAP'
    })
    errorCategory: string;

    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'SOAP_ADAPTER_PROCESSING_ERROR'
    })
    errorCode: string;

    @ApiProperty({
        type        : String,
        description : 'errorLabel [input here api field description]',
        example     : '2003'
    })
    errorLabel: string;

    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 8071536873
    })
    node: number;
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : '6810i98gcpgr0edip3a1'
    })
    protocol: string;

    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'EO'
    })
    qualityOfService: string;

    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : ''
    })
    receiverParty: string;

    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'BC_SII_DASHBOARD'
    })
    receiverComponent: string;

    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : 'SI_IA_ProcesarLote'
    })
    receiverInterface: string;

    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : 'urn:techedgegroup.com:sii:lotes'
    })
    receiverInterfaceNamespace: string;

    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 3
    })
    retries: number;

    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 4502
    })
    size: number;

    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 4
    })
    timesFailed: number;

    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : '1c9e4c0a-9e66-11ea-cf75-0000001ba2ce'
    })
    example: string;

    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : '...'
    })
    detail: string;
}
