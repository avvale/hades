import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '8d138995-0002-4206-98fb-3578d373a05d'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '4e5f90cd-2299-4fab-80cc-1bcae2e6cf0d'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '2r5779q1b83fo37y43hw9rg201yq0xk9jjor9qjppqeuikrhqw'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '2abbc253-ec0e-4cbd-9eae-6619845cd0c1'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '2k14ilodw84qpx9huzmb'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '78ccbd24-77fa-4dd7-8db7-f475e5c41e22'
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
        example     : '2020-07-22 20:29:01'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-23 01:03:49'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-22 22:51:13'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'ERROR',
        enum        : ['CANCELLED','COMPLETED','ERROR']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'yyxf3tot52tf5hijvbo3f6fjcgbij9iz9547y12xrl73aylq59lx2agarzi38w0rornih33g2m5zn7qi857j9z27mnpxb3gto5vr1wewf3y2htim1x4y4z2o3043njl5xdvgajn98pvxyua5lb2asi5tzck9fxn338irnhihmpv3nc2vuxtg1d8sfwr40e9tos21ht4i1plkq3i3moyh79tw08yxs1gts9gjwcm9aj7w9z6ov0tsqwck745k0j9'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 5690660573
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : '2efjz7iju7mynjrjh777wjnyirtyxuin74znvm90xveroes6rapwdau7tdn0jbhp60siqhn1h41ib6rpwa322nsqrffgf5ed0cqd1m2dnhi556k6n5a3z8hjbc9plstnz5unx296ypmskth0ub55ud69jfafc8mh'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : 'slubsn4a7tu3q9ic2yll9pjc43w1xhp61kv05sy4louz6mvfp0rs86xivq538dl5skd6gh1205hlz7jjop50fp2zi46wly58xvhendhywl31n8h1wals5pnmq4m7y5wonp7qh8iingve9t6ejvzwv5uyxr9tqpzioglgiindikd7dyu0eh14knn9vfwagoatwbvg931gg95n0pk90ojlg6z9myjk6704rkus7718roqcv00t0l2bwxppps2dc6s'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-07-23 07:18:09'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-07-22 20:21:08'
    })
    endAt: string;
    
    
}
