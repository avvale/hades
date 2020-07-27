import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'd35c0435-691e-4f46-b0e6-ad6c2452cc01'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'a32a2837-b181-4e09-aa08-c7e5e9a168f3'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'addhqzody7vnjab6aewi1icsqkl6jifrdicd5l9288zonrh3lp'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'f07e6293-cbed-4b64-9210-a1124af2ec75'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'eyvugxhy4qlop75idfof'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4'
    })
    executionId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'DETAIL',
        enum        : ['SUMMARY','DETAIL']
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-27 06:26:01'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-27 00:26:06'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-26 23:46:29'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'UNREGISTERED',
        enum        : ['ERROR','INACTIVE','SUCCESSFUL','STOPPED','UNKNOWN','UNREGISTERED']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '62fd8a68-8fef-46a9-9523-e3cfb6cc6795'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : '7tuazy4ngw5dyiylti7bv9d2ugilc6xp235v8daqg2skdlrhvt'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'j7czz2z4qn7xhk75xgok0kjrn37pdj6aajg98aunvfjrnji9h00ktwjyutl03xzz5wsm22cy2fdnob31e95mvck0xpkasn8r316knxp9rcyz7q8bgwuhzsih22eil9mt4p8m5g3q1pnewburilg1ze12p1ttbxlr'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'p78kquuoz6lspw69n6068khwkxtjlqsaibosqyxvnro2e63vj1xz9d6n8sl20f1oznth95tevlur409187uan1rauchsh3nt9cfym8lx588sjwaou8xx6my6y3qxnq1j8c8r5ty8v7ujr1ze1ynzijja8e805idt'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'idgtxd6sssjjlb0mkd4on5y8pb9cqqy5u7h2tdzpgkd08j8ojq90zcdicg5lnjwzlnc3g4cd4xbtcnbb9e8crugsvptf67t9t3h1bl1lgw7r3tt43tibevjmpwatwt28npg6h8gg4tm5x1cdc7ctt1rv7uq172nc'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Totam quaerat inventore dolores consectetur nisi omnis quaerat. Ut excepturi animi alias omnis saepe sint in magni cupiditate. Deleniti eligendi excepturi ut laudantium ut iusto beatae. Voluptatibus accusamus numquam et ut molestiae.'
    })
    detail: string;
    
    
}
