import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDetailDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : 'a1f89b4f-784d-4888-87f5-9f72d75a709e'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tenantId [input here api field description]',
            example     : '04dea72f-4666-48f4-8957-aa0d3149f993'
        })
        tenantId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemId [input here api field description]',
            example     : '22670223-233d-4d94-996f-1be8f793f547'
        })
        systemId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemName [input here api field description]',
            example     : 'vjqedal110g9e5rxlkmc'
        })
        systemName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionId [input here api field description]',
            example     : 'b2bb4e30-6145-47b4-b18e-35fbdbd8d216'
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
            example     : '2020-07-21 08:07:29'
        })
        executionExecutedAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionMonitoringStartAt [input here api field description]',
            example     : '2020-07-21 05:12:18'
        })
        executionMonitoringStartAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionMonitoringEndAt [input here api field description]',
            example     : '2020-07-21 18:40:58'
        })
        executionMonitoringEndAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'status [input here api field description]',
            example     : 'ERROR',
            enum        : ['ERROR','INACTIVE','SUCCESSFUL','STOPPED','UNKNOWN','UNREGISTERED']
        })
        status: string;
        
    
    
        @ApiProperty({
            type        : String,
            description : 'channelId [input here api field description]',
            example     : '8fd7172f-e38f-42f2-a152-1d0079b549df'
        })
        channelId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'channelParty [input here api field description]',
            example     : '9oepi2s5iapgurx16ewbdwlahvqnwx27zpg8x1w7psyo8jh0v3iypcwt3dabfdj5q5ujg8d7xgse29fz26rgm0ldmtlksprrcrdpk8odlgspbesmxxfgq4dbkg8j9pfk4d9t4nt5fnkjwi0krjm83lv5t8ghm6fy'
        })
        channelParty: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'channelComponent [input here api field description]',
            example     : 'lnq99tb3w9zyu7zxvii0tpptemext4wogpebjzidm7xgfrtfvewn01dk2v99x28ouz0fzu3gm5h8g73n2wftropq5gvhk6f4po384udngsmcpbuxjjjkmzsevsqx0o24zjp654eg5pzxkpz5p7ib6fr24ap72bw8'
        })
        channelComponent: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'channelName [input here api field description]',
            example     : '1j9o55z8npo15u5e5bs6eeahjrdxcye428j23rqhblt89rnm2mcf2y96ww3l5mi5smh0hqttz15d5ak0gotjdh7a5spxls5f34k4o3flk518bvvgjfemgel5xrz3yr35qbjiphpw1te4yxtcc8hdd4gsbniqf438'
        })
        channelName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'detail [input here api field description]',
            example     : 'Et qui optio at non dolor illum aut ex molestias. Molestiae doloremque non suscipit ipsa dolorem est. Nisi nobis dolor dolorem corporis commodi quia et. Quod numquam quas voluptatem hic distinctio quam consectetur quo a. Sapiente dolores et facilis dolores ut voluptatem atque ab.'
        })
        detail: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'example [input here api field description]',
            example     : 'wrsp8atk1xgf5th6m7ph08wqbg8faelto59zh8fhom1ina75rjwrk44rcegp2ow6ldzbyldafg0vnics4ylqsz262tt95gh0nlfl2b82wdc0efbzcud139fa0hu7ot83h815bbmmtbojgo47xsokdn84e3po8cev'
        })
        example: string;
    
    
}
