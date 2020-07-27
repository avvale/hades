import { ApiProperty } from '@nestjs/swagger';

export class JobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '24af86f1-ca66-463e-9ec3-225a479de7b4'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '85be8694-947e-4a9e-b932-5efd98d56480'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'f1wwxr6qxc5yi5i4sc9fg00gpa2nfail8xklkmlbp9ej37n40x'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'a41580c4-2f5a-47ce-8ab1-6a7584b4f5f8'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'ytpbvy4l65vmfcnrqf9q'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '452508ad-9976-4bc0-9ae8-266fcf4f626c'
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
        example     : '2020-07-26 20:57:51'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-27 00:27:13'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-26 22:05:00'
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
        example     : 'kdhq6k8bbabv37h285l6cg8u9xjjs8yd5563dz4h6ny7mfy2a3t3kled2teaqhpiea3qvingfv6qlywj1x069hflw1ararkkk3i9vm5r3e5iu81kpf2pgyos3eglb098z6jabholemp040mw3hgr3uleggdgavzdg90zjia5p9ciyobejjwdibl9btm2hy295qgshas2x7o9c1w1eo62kl8of1mlp98u9mxt5ke1zq82yseghgiw9woy32w4pep'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 6102685331
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : 'r0sivns57afv18divbhq3eyop69it316azwml7udy7hhgucpraabm9y45a624zen7dj7txmv3pveeukjko75isrwii7o00adsi783z9kzp4i6i7xhmhtb0qacd2a97hzxjhe1avzecuym7zh6h92wdml5x0i4lq4'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : 'nyz1crhnz6mlrtd7d5oo06xggemrx4zx2fkcv818lolhzwvl9qmrxmd7grjchkdn375gqmc5r57033ge8p0z67pqaoyjebjfg9gl2vy5g227y2nsc7gvyyk8i7k94y29i4xji46284izgnnslbtm2wyq47pfrgoga3dqrfue890s8vm8dyjj816fpfskkzqs7dv898u9gcnldg25hqbj6aeqzwxqf4ohw8jujqaprjayqm9utn5sq8blx545lq5'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-07-27 01:56:48'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-07-26 23:17:25'
    })
    endAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-26 20:28:42'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-26 22:27:42'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-26 20:42:17'
    })
    deletedAt: string;
    
    
}
