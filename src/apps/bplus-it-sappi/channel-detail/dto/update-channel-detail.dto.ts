import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'a8a619c0-f32a-48f1-8b56-87821e187ac9'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'db5bad96-c700-4aee-a85c-dfe278dc97f1'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'vsxadmubn5fkoxi71h0gbza3zu4mt5h5m4ojm6fxauzv2xes7v'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '9daa226c-1e69-4364-859f-98f77ce408a0'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'r2cure3zw72ixgdoxogd'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '3d9ed954-a7e6-4415-9558-c588f3a67d5f'
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
        example     : '2020-07-29 04:30:02'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 17:53:52'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-29 05:25:49'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'STOPPED',
        enum        : ['ERROR','INACTIVE','SUCCESSFUL','STOPPED','UNKNOWN','UNREGISTERED']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelHash [input here api field description]',
        example     : '8fcogidyrwqf12jpapwop0v5bo30887a03gjqq7x'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : '84ncb191dot9wtwtt53pqsfav5gakkwml9o8tpja3pzxyej6ow'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'jkjlhs1wwc9xv8j5cdm3261xlol84s5kqredfsw8jbr8ywkk9uu2tyxlhkmblseoiavkj8e8yd38yga7rlhhdyj372mn27gkzgdtr4prmbvk97y01v5rqtdlozx4cng43p7nprayh00ehy5niiyf1jkhn7jn9yek'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'po7ikr1zh0lehz03zj0ghgn9d3gor9qlx5tuvoflajphdxdwu3b1cplivayu0eaoyhiy0yddqh0m88jld82tmsew0btsjyyodzzjig3y1681av3p88m55fdvv5dtsy1m3czht4wbn8fyepaaciibm9mg4vnw16xo'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'bgaksvxhpwxxkvstsiaidetc97tx6c821867jb89gn6llxu0x22xiad702oz0kfqu6j4mfe1bqkiv5e6g6rhzcal7m9bfhj7w1ajgtlxmw3il1u83o8fvtmko3g1pwyz5ge9ulvkxyv3cwas5j9waggk1pcco9kf'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Fugit molestias quo laudantium voluptates vero dolorem corrupti. Officia occaecati id ea sunt corporis qui incidunt ducimus. Aut inventore nihil fugit delectus quo. Commodi quae iure vitae dolores hic sequi. Qui voluptate ipsum repellat qui recusandae omnis error inventore.'
    })
    detail: string;
    
    
}
