import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'e636b2a9-ee7d-497d-a883-416b32afc714'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'ed0938ec-0d62-439e-86cb-794b0b61e2f2'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '9q6tlfmyhu99eeyx4xq8prwli3k35n8h6md3uncpm2pycli47k'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'dd23336f-d048-422d-a38c-4c41d9da6581'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'ghqkqf0f7x7j8fben9e8'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '1d26e770-ca38-42fb-b0b9-6c173a189292'
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
        example     : '2020-07-24 15:29:24'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-24 06:57:50'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-24 13:17:22'
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
        example     : '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : 'ct14qgzzswnot6nf55qhz5305cqpxym7m1et6tjcj2f98rwyiw'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'xrwtfih6nppe9wu35rqsfi0yk4hdkl1g5zm9l5q8r91zggnyggtrkcvvxf4gs9isx09wo05m6k45hkj7ici21fr31k7ozobowj3sfjp0aezafzbxhexta4o8v25rm4l84l3pru5ml00c12himt5sfkepsjs8399z'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : '0ilnvesor02wrxeuax9ghdpwf6x9vzlnf6b3av5tl2y1box7sgczt27eti7r8uxxux7x7ybarprod0fd30cbg2nj3yn9qu5yuno9bxdps4htgenhds1iohb9g3ifin7bai0p0fd3ispk5zh7fh02vcvr96i3sguy'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : '8l6drayfvmki7mburez8cnbrs79h2324i1s5jimlr9kgnmyubiyrnp9tkrqca259x1zzf2eiec8dbs2vyklzg3wr8dl3qetsz0i6t7fb1xwnep1xo3d2pucy3eer1olzflre09r94v8zfas0q8tp02kxsjqxkjc7'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Fugit molestias doloremque molestiae soluta aut enim quam vel. Et asperiores sapiente harum omnis qui ad aut voluptatum minus. Dolor quasi nam ipsa.'
    })
    detail: string;
    
    
}
