import { ApiProperty } from '@nestjs/swagger';

export class FlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'be3941e3-5c2f-4d8a-a17d-5f5c55c2d5b0'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'bivhw10uppvh0wkwl40ksszwrexybigm1o8sowsg'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '7d1f2f5b-6953-4b64-a3c4-1efe8420b250'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'wc7bbnlq6mhdvnsatjt0tyfuf2r28x2msd8rs78ynqo0y9ae9o'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '55e451c6-b6d8-4fc4-bee2-b7453d913dc7'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'sxlsqs7ll373cxl6p9fd'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '6kknp4li8p1g12d5a87c'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '4p8zzsqusz9ptu5kaudr223bkvfujt8gq9i3grr5cfvju365v45eby72hmly'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '1upsiszlqzje7zfaaqrh1icelrwgzy0qg7i64bxo4wb1z86da3r9m0q50x22yt3v2vjdxzwz0ziuksyeq2j8398xj8hyowdba0rziouwxdo390rsrk4gs2hp92ieowj4q9cetsh1lmgbtsmyrlniiedndso5eeca'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'djvxosijgbfy20flg13jga2bhrvtxztdx2jcw8to0q210efheq0912fi8y44hwtt5gdlokistvlensnxhafet2ztgr9vke98ivf4cexeorptlsdnzrt0qiv7c3w2oz1f6a0ujcnqkfop9z9932vzkn4zm04bhwzd'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : '0jcwvm775o9ami3i5koixv2yj2ishaaasgfyf50i5j8h0tjlw3vznosbx22yugco5c0okm2cj8j17v8b9quhjy428ow48mb8q7oy15jbo96l57twl1sgt6bemhj5ypyqu025p1p6g8us5p2dduxuqikzdara9h4i'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'j9u4hah7u851bkuf7dzdjlwbe544jiiw7gpoaoddhgrnzsqzrd6w5u4y1a0rywpdoe1ad70naa6rz0k9tu4z7rcizqqtec7348062da9qzjiql531g7kug2ygknhccsgr1loklqbd5o2oxlwsutvd9zcpovpnuai'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'a7j0ncj7anq48rkx2aoseyqta7zqxzsvq87sv8npx3b76vk6hvrfb1854xtgtqxhd6ajumu542q4vyxxsnjuypmt30xg8l3snhhib2ak8m9gkiqgzyhrdnt5qjb77vgqp303n4d2vrmq8n835wfk5x3p4x7uc03v'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'ne6kv7ejxvhk2oxivfmq'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'jfjjrw78i0t5ztnrplnm'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-08-03 23:43:43'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'y89kbp8mzaucscozf6cbm4osrxafaq8fx9zx9n9bgypuw5i36hzl7qkikpi1id4umhdweer0fjvmt9twusunow1jjilamk7lnd310rl1bl86yw1ktuntazc92zrr88xoz9ek6lbqih8i05nnzrjnhsiegqd6mlrphzz2m0czn8ot52seawpaimsjwe3jy9oelq1fomo85ynpvmvimf0a7r2rufrz5icrny4a771qerceua6e0f7b317scd4ltm6'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : '52x9fljw6q7m9qgcn5znrf02sus5lhwbcf9a85efnrbhx1ne03f51mt51l6igdufxug13msfda57ynwhiekpx7uc8rfpg9g7xw7qyxb8w9iq49scjf2cdxviw0j55kues5rbr2ad8re9mbawlppqtt37yo7als6ntff940hpg0vn6jmxrc4hxjklx42qgzd4ppokz1hlllvycxb8o3egbii06hg6xpvubudbjxo5jjmxu4c4jtroguiq92nuza3'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'p1wsipwifkq6ll2lu92y0ggm7evnl2j8bq9pbm1ff6949r23uj58ij1hxyvx'
    })
    application: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isCritical [input here api field description]',
        example     : false
    })
    isCritical: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isComplex [input here api field description]',
        example     : true
    })
    isComplex: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fieldGroupId [input here api field description]',
        example     : '5027767b-a6fe-4195-8385-616d62c8cd97'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-08-04 07:25:59'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-08-03 15:53:55'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-08-04 01:40:30'
    })
    deletedAt: string;
    
    
}
