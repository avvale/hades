import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDetailDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'e72d76ab-361e-43b5-b0e9-11e045bbd835'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '93ba12a4-8601-47a7-8fc7-3da34e71a248'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '4b0edacf-4b04-4fa8-8621-11e0ca532d69'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'b4jf55d6gncnxmgim7ww'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'aa7c0a34-1f12-478f-bf35-f3c1f2e438f4'
    })
    executionId: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'SUMMARY'
    })
    executionType: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-16 12:45:50'
    })
    executionExecutedAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-16 03:49:10'
    })
    executionMonitoringStartAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-15 17:50:33'
    })
    executionMonitoringEndAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'CANCELLED'
    })
    status: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'yhn897ej0gczx8mc3vixxuib7zh5zectr9l10i9jgpv44xcjxxj4gy60ydan9bf08rkq6m7ukb4i2yawi2xrbe4u3723ti4sxidataar85qzo77f9xm2x8jyuk4lvawy371he60r210jnexryviusik6v36g555f35uj3tzcx5sam3opwcaebd6jynqeaslnqjrtb5xqk46yfyscpkwkdf6smfn5nz4p80lyt4ig9s203lm9h7qpx2ryxw2yd6g'
    })
    name: string;
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 5253771375
    })
    returnCode: number;
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : '572njmd264dzxphc5d5o6gng3ekdqef3l0srncfytwfk4z11tzs21os0enoj1q3fu6juyxqq2b03fzxdg399ehxw9cl3jjtb565ra18enp7t8fl5ljhq3evnws6nrleccb61z9i5vlx0oaagpy4wfmpk6948yrbi'
    })
    node: string;
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : '5p8yxwmmf6yfdrhj81if34sx5o8876po1t9osmzu2eo3jppwfbsr0pxicfp4c9umjo86znlhxxsai47n6upzw01kdaigxh123yuhrvvtiql9xfruc4ca3ru0axb61js45kndag7rxo4ixv6z0ncjhatennyufe6jc1711qdi67blqqx1yxtmirodvspt3vxi5jwp1ykpqxonqvwttplp5ygk65mdq3v125axpk2lvbqc3s19crn4zseln7l8z9j'
    })
    user: string;
    
}
