import { ApiProperty } from '@nestjs/swagger';

export class UpdateJobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '820ecb20-b97a-433b-a4d8-35a4a3df7e14'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'ml9axn6sr9gufdoz7lkw19qsv2fvx8dfwynyza4jb8rc8nazns'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '0bc27a1c-220f-43de-a154-c67655924e86'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 't4svkbns71ra2974jiqe'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '5c630944-af1e-4115-9a84-9b3e04feea1b'
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
        example     : '2020-07-29 07:21:26'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 06:25:51'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-29 22:16:56'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'COMPLETED',
        enum        : ['CANCELLED','COMPLETED','ERROR']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '9uxihm3l5kqsnxfmnin0g7g2qp4cnlvitlhdfbbwv1gtk1u889dde6ua34o6as5yx6wr5wxm2ltsv8nakcvoemkw5mtsayvvo3effsydfpob9lvscyaf0kn948ukf7uc7ujrfnyvy0dhjtjzk8aarw8evmhlwtzts7hnr5kw71wjh7a6ndb56knfp389v3qvu6cl5kwtmsp67p95fr5yjojkrjbfht5u3dw5ten8jw00uoojpxubt97fsn79q4a'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 4034984293
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : 'a8z5v5nqmx69w7s667uyh35e7mlo6n4dkdtftxqvm9jfqi981c0bjk7aumemtu28bsripwqtxo22rto1nvsmvytwmecgmlwsqyd7v8aintbh65uqtn9daq3jba0skqb0hgfwbdm6xr142gw175hxkickwoyfj6v2'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : 'cka0d3asfvivzrokzchafu8ep0ltdalcycmbrsrng2oqr7pavq0uhr6i5ztvhtu8mg0v2eb8zdhxs0ytkpccdbzr1as3nh8w4npuzlkej77t8jdjkluqz15tl2u0cf5sd1c9tges549apr54o40jjm7pmagmq6snxs3aangla5q4drf5mf9ghx5x6rtvuybdtbs4p3tvurqa2lyt6ngmat2gv2nx1zszjjg1gr1h73thmy0yp88yuhwmwgi4jsi'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-07-29 05:11:35'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-07-29 12:37:39'
    })
    endAt: string;
    
    
}
