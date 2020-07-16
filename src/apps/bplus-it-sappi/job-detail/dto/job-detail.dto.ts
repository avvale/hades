import { ApiProperty } from '@nestjs/swagger';

export class JobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '41dfbc59-c509-4f5e-8b71-035506a0580c',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '76f92a8f-a4b2-4007-9e06-a205a496673b',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '99c4050a-7881-4738-b963-d077f9ea12f8',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '6qgtiudtuhfq5xfb93o0',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '58fa6887-e648-45b8-9de9-9fbcc1b9344b',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'SUMMARY',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-16 00:17:07',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-16 19:09:58',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-16 06:45:16',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'CANCELLED',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '099pg12n01v164iktsb38wuei0irs3qjqkfaytcjou3d1askedi2iiriagplrh7dr4vko7l32zwrzut5o5d9yqgif138eyetzg82iti4tmctlnod2m5u0p65ox4pes1owju3dwt7m1i0tv22hvhu6ofnukntxh3800luoyx6a9h48gsvpfs3xp5y0jzzc0pj5cxulexfw8auapv2pccn1d51tdb8ft1fiplc5x8fs69hnqcl7p249mvduir2m9f',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 6394484345,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : 'wwrh0j2r3suubfv7fn5sk2htzdkll6u85e86epootryoickryypjxl5rcny26gbsbglu17ljnpez0trmtltxbsybchnulrs7cex7cgfi3w6txk3g2izf5zis9ocgjegpfuo5e4lvgnjj1azg1io8armi86xelbz8',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : '38h7jvy8cfpe96heios4wqu58skub94xibnafw2oiskwc62xo9r2xput43lo6oz731lzx5jwtkdwkud9wr8v8qmzdfop0eeynsqqez2uttt08itv44fc5510kepnri1gxlqa6qif28kqc7yzd5iak7whf92w1uqkxzhtc5fr7em0ggbvep17ycgofk6psutaijmgpqvv4b080cqmfdhvu5hmtd6blwoslb16pk4zxa2y8lkvlk8qvawbbcz4mk5',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-16 01:28:40',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-15 21:40:10',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-16 00:50:05',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    deletedAt: string;
    
    
}
