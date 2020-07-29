import { ApiProperty } from '@nestjs/swagger';

export class JobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'fbceb3a2-82ef-4d60-baae-34bd68feb493'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'b3d2be37-3976-430d-a139-3fd79e8f6f14'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'uhl3fwgxddfxedwmob37owab6cr1xjfbzxo0gzp3hkdzylbydr'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'a7fd06d3-5360-4bd9-853f-22751f93032a'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'l5vzlixai3h9hrtes2xq'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '42fc27d2-6add-419b-bd64-16a446c49580'
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
        example     : '2020-07-29 17:18:10'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 01:05:07'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-29 10:14:41'
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
        example     : '5ig4wq58fazywdl60dh18ucfcrbrrikpt8a8nksvc6m6776hw3jpzh9fxcagx9hwm9bvs628elvc5berxf3gzko8iaawrhbuwwbe8hk2jjldmopjftcz6nx2trgf651sktdth67tiqdlt8y2um1ci4jwdx217m9lflwrikck269qs9tdwdeqkpz74q8ht4pel5zhch2e5vmaf7wbxmo12regfy5vqxkthusqdksrdcrabuqkjciaugpsz3r5zf5'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 2349631635
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : 'wo181ja4hosuqg91g0lt14827qj9hoyn3jtg5nzi55kdt6nqzaxygb9s450fiol57f0vhl7fvq29fsx0cgz0hlx5x11kf902xbefodqkjixrvmeitk1krrzi3hrapm8ws679r6279bdkir4y6v1yukaqipv0l5wb'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : 'mmk8jeb2jh33m6ym8psvf86ol9grtodookx074xniirldlnhsiih1iav17ld3x4lwum1x9tv0b80k1bzcgib342z48umu26s6icifr6gtld6komk9j85iz1jqxz7p10pypkt2zk25jkj0rgdtbebe86i5vvvavne7ahx1po2zymzcs6ikhvvg06p67gyw1cogn9svb9vzh499pod42qz1881xsdxmvntot3yfxcnya5vg2vndiwx2j8jwbsgd2b'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-07-29 16:13:59'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-07-28 21:20:58'
    })
    endAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-29 07:15:59'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-28 23:04:50'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 01:44:41'
    })
    deletedAt: string;
    
    
}
