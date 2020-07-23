import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '4bf7d91c-c237-47d6-a93c-246e32a8d58e'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'e69bc319-5758-430f-bf39-1b56a867a12a'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'gt1ozxn02a69c6dsmja3mow87s8fdc92deljbobq48h37yx2a7'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '856c8fb7-d652-42ed-913b-6fc419c5dd58'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '8pb3bk3eya58e37pb3wd'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '1c2fc88e-5b8a-4001-af0a-c998e76bee0d'
    })
    executionId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'SUMMARY',
        enum        : ['SUMMARY','DETAIL']
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-23 18:08:05'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-23 14:15:10'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-23 10:24:06'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'INACTIVE',
        enum        : ['ERROR','INACTIVE','SUCCESSFUL','STOPPED','UNKNOWN','UNREGISTERED']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '1fc7e637-dadf-49ed-962f-25f7c02c9687'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : 'jpjj2ifc3t8y8avz6d2l8u1heu5awaoamd6wyi8mfv1j1hvvp1'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'l279pjs5cybkqbxju1k8i1cbur9zx6yn7vfl7niwtbr1cf8c4trd1j1urn2nu9sqnz138new8nc92r2vy77t8ix19difunz9m9cfx6625120tsyuiaiblnls0uzui3ru1tv9kqxk97wpvkw8tq8we16bbeg1zxq6'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'k6xlkeghbj9mq7q7kz4hjm9rmrd8or0ndlymwtmxszs7pi8chvo50lmfljp4gn1tw4ch4lycuk6bogjuo1pgx860itp9ulcmnp9j2uy11rdb5ju7x61lj93u41oea4emjgk7v810byomkfhy3e30s4wvbtyhjreg'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'rjxf214u2y2ll2p7dma76m1k9xrm3lszqus0dzugvfjxqf7f3u4rf3wyoklrtt7r0mdnqurap5x480qu3dndqku8ynf059jdyxn2yq0ofqwdzlelp8t8zmotwlo1e9p1l8wxpbzmhb6764uk4v48pbicd17vjniz'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Sunt ut mollitia non optio rem sit eveniet ad quis. Qui autem veniam quia cumque similique. Ullam ut corporis ab quos autem nemo rerum et. Ea praesentium sunt et eum. Aperiam quia excepturi cum accusamus quo omnis ut possimus pariatur.'
    })
    detail: string;
    
    
}
