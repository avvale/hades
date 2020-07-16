import { ApiProperty } from '@nestjs/swagger';

export class ChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '99d5404c-1667-48d4-b10a-809991f67d6b',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '99dd7bdf-e50d-4e46-9710-3df4cefc6cf2',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '9bda5c93-a5db-4631-aa26-9c9d77a8454d',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'zb4yh5vu4i9bs8ipcu80',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '5b2c2d78-3728-4ef2-845c-960c83585d67',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'DETAIL',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-16 17:25:10',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-15 21:01:11',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-16 10:42:05',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'ERROR',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '3afea616-40f1-4ec5-87cf-84636acb0a49',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '6xh0vvybkmch1kobil9cv75wy2f7m29dqd064ys4epvn28ctkw5ol0kxhr7jna9ai83dv9lx2wstna22gooomi6ljpznynvme2oq30tgznwrebyreftf09spmteiabhgzjdfwcdkrmsuj50e02hetdrjc7mls5vz',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'l4cwyypu0pctxchppawz1pyrwsdc16lckvo9sa2cak6af45ygqxqis6qrq6mwga8hqjfv07r7ngwji9zaqjttzbbfgp1uanr4aulvrtopsxnl4lj8inr1cg9um7y249kiy2tk0tcas8fqqd3x20cnpdq94ms6sk4',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'ijyk5nocw6jnccvn4hxsw050ge0hopwkunq9xkwfa4ihcw3epnx2xt9dtcn3zzxdbv8unlx8a6bjel6d1ff8vsyglchisw4uflkfezwe0ko7mheg7ylggq6bfsnm2rhnpf2ou5sjpv7ni7tb6zm7qxv04w1qrc7c',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Velit et reiciendis quo consectetur. Itaque est voluptatem ex et nam et quia accusamus a. Enim sint aperiam nihil minima quia ipsam. Est quas deserunt. Ut perspiciatis commodi id molestias.',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'st7ymtokwclbvxfdp5729oklw11r4r3iud64bvom6l2btw66envdexk434l1s0ayycm0po3546wle0yvj730euobw39ztf6vrsucv3ljnki92lmjj29mtnztniw48j2iwyj3h4y06jeop2vdv8xxht6o7c0xfskv',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-16 06:39:17',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-16 08:14:58',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-16 10:51:21',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    deletedAt: string;
    
    
}
