import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDetailDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '512eec74-36a4-4324-a26a-96bd902670ab'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '15c9bcab-3822-4a69-b928-d9f745220fc5'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'edd58579-abe9-4ac4-8cec-4e551419a73d'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'aiubzlsh8ne1yrx561d4'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'ef3e40dc-941c-4477-8f92-602475764ab6'
    })
    executionId: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'DETAIL'
    })
    executionType: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-17 08:24:58'
    })
    executionExecutedAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-17 11:59:20'
    })
    executionMonitoringStartAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-17 13:24:52'
    })
    executionMonitoringEndAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'COMPLETED'
    })
    status: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'dcfblykigc7p9v7em9frcdtqk1qzp0a87z97k1v98rwbb2o8ipdlkk1lcy0whnh7crf2wyt5go5py42jq3eyvzizdfymi38xb1as2mdn4ixwi6tvfie7dpbsjguj9ggubq5r57ubo5clztx9sos486av06znvy69r4hgg2fbykg53dasxynj5topngeu8odvj8py2ctwjzso8lvt03bm4nvgyy5bgshzmo15ipujz6k8azf6u06kmu1dcg1qpgb'
    })
    name: string;
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 2510436027
    })
    returnCode: number;
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : '90gf328benhjvmu5dp7hq60flxilm79l8kqt9ddrb3iay1o97vs38mzspj1p3cmmqujn0qrqgb67urpmejcvea5tb9qaqwnrs8h5r9unmrndowbspcat42l2x1g6tks1gvrt6iqxab2cct3rum83cua8isll51uv'
    })
    node: string;
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : 'brohj3wvsc7z5ks516z0tuyi7k3u6rv8gi9sdl1wm8dw72pqtbvtodw5oj6x4a7v5kyxr2zd2yjijloqm5ci0h9isko8bzhka0sw2w5r1hhppz6dgqhuh4ojhfg20n4zax8vnywexev53ry32aw8o06zaknn74diltcvz5xza0iqmtr68ximm2ulcjcl5commk1egwpmhw8vipok15p7m429zoeoenvibhe600lzvlviidu1r2sxkoxmug1o5dc'
    })
    user: string;
    
}
