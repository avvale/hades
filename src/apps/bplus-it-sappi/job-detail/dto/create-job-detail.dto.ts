import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '4d3aa02f-09dc-445e-914b-8f762921b63e'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'b7ef8f9a-5525-4206-88db-da0a0d5c25a5'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '3w808296yvks2na47hpitz7nf8xh8stuachtzlyurbt92cduor'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'd1044a1b-7fdc-47ea-9065-8f232f9f8240'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'bj4bznx6jq2jatus5drw'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '55bb5b6d-7c55-41b5-9f8d-0a4b84685596'
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
        example     : '2020-07-27 11:20:02'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-27 23:10:46'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-27 08:33:02'
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
        example     : '592fnq6j7ti8j24a8q1iky4nr9jok9mx63c473azv1oaiearuo6x9nb1eok0nx8pxq4krh6xemdzgt9pec3oxvkuj1712kjjzu0ofxp3d12zage9lw5pvu65kudtpd1jy2oo9ind9i5kn2vwio0qwuh6v82v6idsotj4gq1tfh326y3uh7oee6kb0xgm5sj0sye1uhj0xvyob0o8e7p3orhr9kzcslvjg7zw3sy3t56qm51w0whs4hdy0gmpcve'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 6068017659
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : '7lxf4lyvz5m5o80ps65f7mty4mmacurxued0oteb1315a1zu1quj2jww8tx9hxqpfxgcs1tu2ek7nk83sy4c9dlf69f0cwdp0hrs1cpkvxos58aywrftnwglc538upb3z7uopb0qdmcv00kd1w5pokw9fv20xba3'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : 'v3b9am09sx4z8d0aok2yr6bx0to7ivnt5xhpwsaxfchsdnvtao4rtzjajoh97pq3mhwmm2lp1nrv7u5e8vqw1jcemu2shlprrivc270hx2syh05skp0qbse73px8ljgdgdu77i0k5acfx1a6bpybe0wmrh0ho6s0ylm2wjbpcmceal0n3gn0unxx7ssmhgp2p2i448vjy10w69mttwb79pm6om13dvljazeu5mptjgebl08dc2wckv5rdhzsmqf'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-07-27 13:16:15'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-07-27 19:58:19'
    })
    endAt: string;
    
    
}
