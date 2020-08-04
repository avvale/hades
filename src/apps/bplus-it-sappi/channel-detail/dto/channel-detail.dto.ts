import { ApiProperty } from '@nestjs/swagger';

export class ChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '038067fe-dd6b-40aa-bb69-43657c527ff4'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'c30d6b30-0cc8-4e37-8131-75f6e21353b8'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'ul1x1yofqk6rxwertj6pfhjhebqqyzsgmilepylt4a5z3lxsu1'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'fd64441b-766d-4c21-9fa0-8ab1cdccf383'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '6u7s1dednizrde2wlrc7'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '8fcc2bda-4251-4342-b2b3-49424bcd00a3'
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
        example     : '2020-08-04 13:04:46'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-08-04 08:56:40'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-08-03 15:19:02'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'SUCCESSFUL',
        enum        : ['ERROR','INACTIVE','SUCCESSFUL','STOPPED','UNKNOWN','UNREGISTERED']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelHash [input here api field description]',
        example     : '2g2frrxt2t94yjsjaqcg3s1ic2f3zpin2jnt024e'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : '4ppg3z7rnplzwxytpea5nh2oz7ehgfl3l1qmyktgall6n37ku7'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'dv06ttdw9w2aikys50iz5i1fv18r7ubvuh1t9jz7vn9nu9dp995pl7tp2np8kr1pqmmuycrv22fsl11dk30ycirwe1wvaxfls5q3o1fcz37do7sffbnv74qt2kjtpdtb8dvhiycyyvdanfjsydftd23541bow55x'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'dcqeehn7ws6cmivk1hqsaqf747p53tmwrs4v4jroiz2re3x0n495sq34l007ssmy5qs2atu3pjnr8zk5jatyr0llb66z8d5pd2gauvazw6oys6c0yn2zgsxp635q3xw209c4vzouev44aph6anzizqansd17dgf1'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'c7mkqbe13ferd8kj6wk2d15twork3vx2uqir505fw062pyeo1j1vvwc46a8dirqjgrwmjjfb9agr4cwn24pxagmvbr8tsdkh8awylj5rikrhuebiacqjj99ccqnua6yb2xd2tbaxnrlwjyph73fqm1rloqn5imwg'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Quis ut cupiditate est perferendis ducimus. Quis aut qui vel dignissimos quo quasi earum. Porro neque voluptatem voluptate rerum. Beatae harum sit consequatur voluptatem voluptate nemo eveniet. Velit maxime cumque quo.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-08-03 22:45:47'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-08-04 08:29:17'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-08-04 12:50:28'
    })
    deletedAt: string;
    
    
}
