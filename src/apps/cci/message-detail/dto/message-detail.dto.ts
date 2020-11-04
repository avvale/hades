import { ApiProperty } from '@nestjs/swagger';

export class MessageDetailDto
{
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
    })
    tenantId: string;

    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
    })
    tenantCode: string;

    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
    })
    systemId: string;

    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
    })
    systemName: string;

    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
    })
    scenario: string;

    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
    })
    executionId: string;

    @ApiProperty({
        type        : String,
        enum        : ['SUMMARY','DETAIL'],
        description : 'executionType [input here api field description]',
    })
    executionType: string;

    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
    })
    executionExecutedAt: string;

    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
    })
    executionMonitoringStartAt: string;

    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
    })
    executionMonitoringEndAt: string;

    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
    })
    flowHash: string;

    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
    })
    flowParty: string;

    @ApiProperty({
        type        : String,
        description : 'flowReceiverParty [input here api field description]',
    })
    flowReceiverParty: string;

    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
    })
    flowComponent: string;

    @ApiProperty({
        type        : String,
        description : 'flowReceiverComponent [input here api field description]',
    })
    flowReceiverComponent: string;

    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
    })
    flowInterfaceName: string;

    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
    })
    flowInterfaceNamespace: string;

    @ApiProperty({
        type        : String,
        enum        : ['SUCCESS','CANCELLED','DELIVERING','ERROR','HOLDING','TO_BE_DELIVERED','WAITING'],
        description : 'status [input here api field description]',
    })
    status: string;

    @ApiProperty({
        type        : String,
        description : 'refMessageId [input here api field description]',
    })
    refMessageId: string;

    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
    })
    detail: string;

    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
    })
    example: string;

    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
    })
    startTimeAt: string;

    @ApiProperty({
        type        : String,
        enum        : ['INBOUND','OUTBOUND'],
        description : 'direction [input here api field description]',
    })
    direction: string;

    @ApiProperty({
        type        : String,
        description : 'errorCategory [input here api field description]',
    })
    errorCategory: string;

    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
    })
    errorCode: string;

    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
    })
    errorLabel: number;

    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
    })
    node: number;

    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
    })
    protocol: string;

    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
    })
    qualityOfService: string;

    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
    })
    receiverParty: string;

    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
    })
    receiverComponent: string;

    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
    })
    receiverInterface: string;

    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
    })
    receiverInterfaceNamespace: string;

    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
    })
    retries: number;

    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
    })
    size: number;

    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
    })
    timesFailed: number;

    @ApiProperty({
        type        : Number,
        description : 'numberMax [input here api field description]',
    })
    numberMax: number;

    @ApiProperty({
        type        : Number,
        description : 'numberDays [input here api field description]',
    })
    numberDays: number;

    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
    })
    createdAt: string;

    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
    })
    updatedAt: string;

    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
    })
    deletedAt: string;

}