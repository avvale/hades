import { ApiProperty } from '@nestjs/swagger';

export class JobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'fe808535-8dd1-4751-a2d7-bd73067fe444'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '1447cf6a-9d90-46c0-b445-e6540d5e9627'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'ebnghokcgequfbh140nbkxx9bs3dv187omi9op1zvkdqe76n12'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'b9cee3e5-2d42-4934-829c-878f3060053d'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '7fe99ld60ax9bfdcu462'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '9e2da0d4-31ae-4b7e-b3fe-f5075933a1eb'
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
        example     : '2020-09-19 20:15:26'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-09-19 21:50:41'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-09-20 07:37:10'
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
        example     : '0y1edc8mhdfdfo7t2yobr9tlzdfbj94t8eks0z5c1o5eyi5cldmoubcvd7cwcizv7mnddn1cp5q2pviz7fgcf7yq9zwsg7mj4be5vu65b1tsmayx248mroke3yxoijjj2aqdguz7ykqr2v19sfhwcz0pyslw4g252qfyrbp3is53u1z1wce34hhi3mdux220upcvsjy4sucmys1oiu0z08txuy75guz7xhz57ha72w49g8zpm294a6213im6ojg'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 2068104340
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : '72afzuplwxzisdc5t6z1cwjrnvnrxbkf530zmrifeqlsxphicv4hhrk42j4pko6t92949n2kbulc0lq1de4kfanuaz0vuznusx88fsxmsfg7btc2jp62l4dkj04i5cx7c6pmvgie9nx0ya9rya4a27hd4v086wga'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : 'sk32yf4u8ut6o0l7fdnnye6kxnwqmqcjc6hksofnu39lk4ie08fd8s7ho5u1xb7mwgazl7jeauj0wrtxh2w5zg4rmm647fihz2v3yvgeutl6s682de3ego9pms9ffyn0rwjr56dc4sp2516otlqrutl0elgyn9bzlumfedh0ppfsdxazovb7notn6jubhzyux0n3i6knb8g3acswe1gjjjkjgd6xc2huhkuxwblqhwawqua6yvsksvidz70knw5'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-09-19 23:51:17'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-09-20 13:44:19'
    })
    endAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-09-20 07:30:15'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-09-20 06:22:08'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-09-20 16:23:17'
    })
    deletedAt: string;
    
    
}
