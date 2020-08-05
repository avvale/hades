import { ApiProperty } from '@nestjs/swagger';

export class JobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '9a78fa1b-5b1b-4e2f-a9d7-d5c43689d977'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'scftsbe9peatf9lbyr2z8uel50g384urbin228dl7of587sd0h'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '6abd2e32-5f16-409f-94a4-7df6b437ccb6'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'l27ed2vka7z972n2dys5'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'f772aa06-83fa-4847-96e0-6f7a3cc3922e'
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
        example     : '2020-08-04 09:52:02'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-08-04 11:06:06'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-08-04 21:58:34'
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
        example     : 'opcu2hvgyowfqstgm4jgyjiwto16e1m35g2z3kz6zq5mneim2jy3v69fkvp5l4sp8rgj6chyj2gcibpapblrnlbxmsc51ajbezy21aq41aauvglrk3ygca686qhhwbobwsu21d3c6oua2w513mgb3ijffwwv8x7m3zfluh8iu424vue1gij9nwwvko3k0td0oicfg64dyrj2pg4pvmgyop0vhpi8jssx52cfhgg13tzuqo2edeap089mgh695bf'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 1401329278
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : 'ydl1sd0aaoygpozgonv3d5tmu3kosc6qjgfcadgu7el9ivkpra6abo2wqh41klaj4zhcrtk5tr6h6s91nczlew91mssdo3zo8525j1eb07gwwwac6wxhb4eh3d3qn4ch0wvyqja9qrvg40r30j7aohw4vvjlsdpf'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : '1karbmrzg26hkoew2ambqo67eyxadgzq03y66jbxec4okmw1ca09b927l6rd2wcgatielen6wupbh3lyn08pp0x2f5057f4jmuknas46x43rkk2ds5ndazs3a032lzcwm0luzrr3w8ette15xk64y6apustewd4ga55bvcae26qv6qkeykqsvpdqmu0smednz95e443n2uqa17bqtonelzub3dlpric7wv4z1bff04dzlr7jdht1hnze81nepvx'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-08-05 04:47:08'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-08-04 13:32:23'
    })
    endAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-08-04 14:04:01'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-08-04 15:18:57'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-08-04 21:06:08'
    })
    deletedAt: string;
    
    
}
