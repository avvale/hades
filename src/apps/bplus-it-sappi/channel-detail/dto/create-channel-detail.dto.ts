import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'dc46ba40-8746-4735-9f39-e0322bf00392'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'd9481fd0-b445-4a6b-a3c3-1a426349f042'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '48cyyygb16nmk74btrhgjjt29a4ai77eodwalqhftkr4w0tnt5'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'b43908ab-f52f-428e-b7d6-ee1b805bf069'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '4wdtf6uz7at6l2jivkd6'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '60baa61e-ca17-4a2f-90d8-6bd2adcd466e'
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
        example     : '2020-07-29 11:34:18'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 13:41:43'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-29 03:41:27'
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
        description : 'channelHash [input here api field description]',
        example     : 'ivmcnfy2ezmsy0phxfjs1hyinw33rpt0yofp3erf'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : '7n2uc9mbbc5n00t2fv807b03wzj95fi9hlyg45xuv11qtvo5bn'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '8e68nbfi4cpm4kf3ik2jkemg70shyyrd5bzld7zx2riuammzoeusrmwdmiblwqr3pyjsvmhu36d56q2248egm38q00z765tl7ga8o2przkx6mrtnyp4504xhljmnklzgucqdbaz3kczv3avwozpw3o1a15s9dnxl'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'oplxmyufrn0hcphmpvpigc9qajoersranvd0h3n6hhuwn8vr4b50t0vh6fwvy6v327bied73kdhhqz2dvst3u7dnql9u7jhpt90nxsg11ohyna5z3bvk6f3a58okaehuhz4i1fyk944wi3s7pqi9g765p9qk16hh'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : '1phws59q24f12piivsbzt4hz3zzuu4p70aeoxo34u2slvj9fxtxwbdnc1fiyb950ucqfsa7g69y1zc449c4c643e61rr6xbd9gr1ruir4ris2qdevst4zzwwws6iamhu1nnmi7zvn6kupc1nlva8y5ju66rnyn1m'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Ex veritatis porro ducimus magnam omnis. Culpa quia at velit quae eveniet ut vero temporibus ducimus. Dolores delectus quasi sed veniam perferendis omnis nihil. Qui molestiae quis non quaerat. Repellendus pariatur atque tempore architecto molestiae quo voluptatem.'
    })
    detail: string;
    
    
}
