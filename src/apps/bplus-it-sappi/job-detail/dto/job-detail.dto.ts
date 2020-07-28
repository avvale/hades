import { ApiProperty } from '@nestjs/swagger';

export class JobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'b3dc3df4-87df-4d86-865e-7f685a93814e'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '85e435d1-fd09-4add-8ff0-3f474bd43568'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '4ol93b89yt8hccciv37xenn2r95abctiebpixf5uo245u5fx7b'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'c06bb8b3-38e9-4c8f-a614-9a525eca3187'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'v6efa8cmbrz1m5rscdik'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '2547a432-7b81-4764-a0bc-72e0944a1c72'
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
        example     : '2020-07-27 15:32:58'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-28 03:51:57'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-28 09:03:32'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'CANCELLED',
        enum        : ['CANCELLED','COMPLETED','ERROR']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'hkysr83wv5se5mp1m97yiz9qqs2opyldox3ptl8ked93racp1f0e93mkb09hvjn15ycclf5lz85uiozxp8j6whdxo27cjhri8ig5pgvf3z0vqnsrxq5hug9493vhmxtnoruao6dals8cltf2rk1fdkp169igrs7v5tjfo3l7xo3y4pawyem0obff7w9yb90g68gc8xrvmroej6e5ms3eiaduby877fpqqit2wlngtyo3puxrd2g0ltugl1nimtr'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 3199910118
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : 'kh06eg2ywjgjlwqcfe9wn3m4kemfexkg4gjw7kv89q4aipbnmm4vgv1x9x0gj1872z58yn9cvyznicq0atda03sphzqdaw439zrtkvbm8sl3vqfwglle54cpw86f6hqeeguruy6i04mt4l0qufoa92qzhqsiqh1t'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : 'ml9k4zn6g5wcb48lkp8ytq90e3zlirwubwpzky06qro61xgi7nc6dobwrsoqu745kssppn6prxyf8qj411mi7kb1urxn8u2nwbz2wg7x49f8eu4ji9hg4cfpty4uqmnevoo0zkfujq7n4wx5bqybex9lry1lghmkgotvvo6csmm242861c6ixi3jlxxnh14yufsr66q8q8mh280gv0bhya3ir962nqs40vln3mf017etkvlhapbinorf8k9bqxf'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-07-28 00:15:10'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-07-27 21:55:41'
    })
    endAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-27 13:46:10'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-27 17:01:09'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-28 06:39:41'
    })
    deletedAt: string;
    
    
}
