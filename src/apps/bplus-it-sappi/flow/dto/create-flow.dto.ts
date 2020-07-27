import { ApiProperty } from '@nestjs/swagger';

export class CreateFlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '04c09944-d525-41dd-ab5b-11b7e2fb184d'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '741590e0-20a2-400e-afbc-c02fa05e8e2d'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '2hnirb44vv4ia1fls2tcero4vkw3svq74d05z5bixuugdj5swb'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'g6crjlgmq2spsif4fng7'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '5e8d8cc3-d973-4074-953b-8eb40d3ec026'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'ljr81b9rc9h1byqaq0j9'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'scjrhftw1vmwicbxgc48mt2tmqpwyth4q77x46iud64kbd7jr3rfppmwfcxi'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '46o3m5epifyu0h5f8iwmdpixo4d64yz941qrcatc885ti4waai9b26o80y5c0pluo6j16udhu3t43ae6xuclca8725k4vohdcw6twpp33gp4yfwt9cj91ecwjl8833q9mjeur4qwcfj96wxe346ccmqg13urne1f'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '1612fm99q6g18xe330eyyk5b9yc84yi0viwxqg854euuc1w6wr6jf4hwht8ddthzoyv4ztc0galnpx0jqglain4pp2s5ri22xnb0n3w60n53tanfehwyz1sc2y5adfdgmp069wzf3a1d65pxqqibg2mfmj6mqkm8'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'grt4bfcup4hd9cv6xr8hvsww1ctgzbyjahuzcioa591i2a8z7gwc2qjotm4qjk90ncq48w23hh2n3kwiy635p2chcsg70ay43lq7jgcro9q0igpfzw5gqo80xkli2o6n9d0redmo6t9or379hcwga026j3njw8gw'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : '54roy71i6c0cwe6wxi1st6l4sjf2x551mqam5uqmrc3g040hy22nmt8jzlz3erj4fgrzf68x6sxxn2cwigxw9c8qougpdgjc94r9e9rvbpr2o66ja57aemm6r4c38dkk71u0ulht7lis80s1u2pztmltvm0skwwr'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : '8pbcxptbvr9jpfmqtaq49cgaj24l6bvebclunv6h7pp3pa0jtstj16c5n8b1mvtchc4okyg6zav6wxhuu6a7wn0vsnhd7x0w4cuatrdlrgm2r7jddpzq9jt6s4gu5rqs4bq1s6tq64f43r8x7slyhhz2b54lymk8'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'n45whtxqoz5xdn1s3zdi'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'daim836hz7yhnxgm1a1g'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-26 18:49:24'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'ld2y47lxpkfwm3tgoy1bt6woqf4ggfegliy0o2zhqh9mo50fzgx48ut3m8mclvnyz048itzqh4fl1cj9iphjmamawzm18loi5ttawfk0ktg6u0y51057vhbisguuhjh5sdokpeme1rttu4s2mozz5i7xhrhdri9t0heflkdwkmhbpu6mhcg14mpautlz9x0zipnlxhjuxo5jt8fu7pbo4825l6udirubbmt2e3qn7ne7ukh4nd6c3dzsshq7fuo'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'kbvdsxpmnzlqhiyizkia5ybvfzx7n345yrxrutjt209q8lges38eip25t266f8n5mb509lby5jql7zjals8gvdwifgj8t9x3t5q3idktbxzxjhwye19lolthngkjg35nqcvvdbeimbmv495u4rfmz4aebdvrjg2kf4ca38e8jqn0yk3w0r89gjw8yno1qq4o9j837f8on89lzn8sxj83ueed0q7h0jjxrokr47044zwjkty7759fjnt3xpka54z'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'zqx71rnnp4c4v84nebs0lvz6wj2q8sfb2qianzawnvhsg0ptlou6cz3j388v'
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
        example     : '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
