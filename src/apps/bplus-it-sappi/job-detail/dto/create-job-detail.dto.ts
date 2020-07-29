import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '6bf26010-a993-4870-9263-58c16db28cb8'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'cb75a608-d00f-4b1b-8c96-ec59158b5bec'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'lccxanqo1r5myhmbl7flz1tg6vf2bxsuhwlzsrhtgl57kuii0y'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'ce797352-393f-412d-ab4d-68f1d8f2d600'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'g2y0ju9rmru2hxn62koe'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '4738be3a-7976-4914-aeac-c984332ed211'
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
        example     : '2020-07-29 15:12:52'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 15:25:33'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-29 02:10:37'
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
        example     : 'gx68wbiniuc95nrieh0j47bip2h0lcdef105ghvv38f1yp2yc2iv0fb6btasik4y82n4f9en7dmycq0rgwta34cvb8nrnvy08jov2fo030ve30qipzgeje55zgmaaeguq4ivd0r6i83urp10zj4vqka95o1v7ico7bh38kjf6o57onpn1xac5k86z2kuigplfuf9gebxvtjp19r5k15wo2h9n8juzhjsr7sxvs28biht8zrn3wx2utqmm7fifb9'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 3931434268
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : '4llqqw3lyc4m7nha3i6r8qof15eomse9l9y4660h1mwvteix618pt0j1cgcqx7agp2t2qkg4efhgqchp92pxu8rjackwiknud8bhwehjef5h13r535ffwkgn5muz0ta1jy7gmy9otepyaksylq7558axcqk5zxa0'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : 'nhzlwe792vt0s1svwr6ot7rkaf12ruprmuj04n2wl6kmxvc3duwofcseuepmqrk99ji6tdkd3liltij0ayep8ni428sczpv8d6vgvjnn1j8g9f8wu90cpzft7zkp2pk76ghcq4ouqsxzonq1y0vzkf6b9nkorvb5hdmhru2xz0z0pcww7m6j7zbw7g0pp1lcnwqnn9nfvfm5z1obe7mxnbuw4r7a0oz47kt74ezsnv4fh9h0gf3zyyqyh0za1e6'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-07-28 21:23:05'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-07-29 03:28:07'
    })
    endAt: string;
    
    
}
