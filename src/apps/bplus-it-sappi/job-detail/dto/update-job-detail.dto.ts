import { ApiProperty } from '@nestjs/swagger';

export class UpdateJobDetailDto 
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
        example     : '2acg1febajo730e64box'
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
        example     : '2020-07-16 23:33:02'
    })
    executionExecutedAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-17 04:38:21'
    })
    executionMonitoringStartAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-17 09:08:20'
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
        example     : 'o7mkc2bf068cku2zxncdd7jc633rqq03v7klikzs3f6r5bwn8wyxqhrxjgeo0tam986vaq32vp0hh8w4pxs2pao6c244ifs48j3649fqu0dyzl0ikia8bxazfxlqo3ctgoel438r3uvnqq3phyikqnkmmmg44bw3xzmj4es0w41lh3hobjk64utph6ncn0u2x2j81zt7fr8mzwq9dvydf4s7pmzhs303zgy1nx8ckhvqxt1c8fe9iglysj0ae31'
    })
    name: string;
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 1068171160
    })
    returnCode: number;
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : 'fl4y8t9wnucl3m735770jc9uhwo54nb25iuea1emvl6u69eeqar7s71dud1qfnxc2i4helakso7wvh1jrdy1akxwr3tubwitsxc7bspje295xtkkey9gog35evdg4uxxkbtbpqt2qxot4i9cyje8kpefhbfsuigq'
    })
    node: string;
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : 'b849u0q1mlkxh55dbtnon3qxgleepr1szd138blzxm8jrg8ghnj7c7xo9cbnhvdqbu44eednusokmnij62vbozna2skl5ik43sjxr2su8b9voeaf9vxnan2hjpijpbn5nyfvxzcdboo9romtqak7bh2dyr31iike0gnta70qtr4u3ob9cgwha10noit98y4j0xcuolctj8l3mrt342udw7d3m3qeo11bswvqw72f2wiqgp6j7kl84tfmvfaib9t'
    })
    user: string;
    
}
