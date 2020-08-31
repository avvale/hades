import { ApiProperty } from '@nestjs/swagger';

export class UpdateFlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '587eba99-315a-4cec-9a33-9417cf9ded57'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : '7aasn1ni5qlwultkejrqzwlhb5m9dys89lqgmsuf'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '89fa92da-387a-46d9-a7a8-a694b6e40124'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'gov9asg8yjwx89ebszxs80cr6w36swd6ndif4c1ro4tgv8hhqa'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '4de55c5c-628e-4e9b-9ab6-97649e3e7d57'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'zweuumotaemkml9x0f8z'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'dj5i98poa71o6wwo5yty'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '6ea2a3ilwekxgrukgvef0rpjd4f89w0m7hr8bxxqhi33ku0z7wsamq7h9tu4'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '1epqdpm6nbt4mle5kvqt8rvl8ppkiioaa5q9t5cxhy1e3vwllzylcbzxx0h9j5v34fd04u4bxfoi2q39ylgvlyn4f86shkfd20ezrftqid2x895gufqgf4080lk0x62olwkud2h57ggfu9hinxn9qdenx4prseza'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'xb7kutixlitr6fv4wzc8ox2wgivv80831bxh7i1nsb6g1jgtv1er9irzrj2k36ug4dqhkhns791obuct7xs6gwfivvjssk7hvv3qdp8rm76che85bgf4cassa5pvwqirh1pcl1zfzj9w1f0ff2t1r601rjv7xwuc'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'c8uljem1sqxxq5wzrl5dwpqjy0fko5q08mxreea27bfiqkw2uslgntf904gqpbhc22qvpbqupklzzr1g1ul0848eckn9ntz9llc8ecft0fvhkmsd2efhmumun1fm8xcow9sxmeuf40ulmidiqnzuu6elf5shvi6q'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'iqei1q37sf0wvqvumq61hv9s3eudcf75in4i4yhaeagat3cathbpu5ejzdpdknzh6skn6y4b6kmv7m1ix2npvxrczk0tibpcos5qxtnweun7hf4940z8kksgzmdey8nzsg84s6juarf92jcj22d3z11swh5yhar1'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'l9cj2ig8fd3ihugqj89d2qsa19b0ioerzo09z40hn5gvb78i3z0eyqoeamuvq6h1s2p9wjm1g1q3askbubkm6bjfypgave9i95lwj6byp2m24iouzl5zyj93h7p210a14gwlq792p0kfoqqq54jesdv6cm5bun4z'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : '2zlv0eb2e8ez0j66soqf'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'qauzu6ueecjnlf0lm1pg'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-08-31 08:41:02'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'zgms572pelnjuxrc7etazakr54r5rljksxq961yjpjarm3awx6y628j29nxve6fploznl6u52j1wf10figfuqjs8j4xhbetyc78zfd3mq4ultv6twlcl4j1x9egefvvvogfo8v4c9xixbwloarnav92tk4561kty8px8ys7aavohb4oqvwxyntuzyx5eft5yu28ej9bwqqw70muh4cafm44kibubdp0qkrzmnt8sy1irdo2fi677frzv6i44hlc'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : '1n88cv23pncp0n3f6574k67h8cqhdhdjdpxzemwpgb3fxbun1gcvwhm3r227m18j218qw0xoyqq65ba09691owbac20gyf2kwt82qg73op3xqu5cjkoz5dyhbfclh1rpzdn2nj4jp7enkjq7ctsv46itmgfg02g03fhdgfxih7n2qmvxemd2tj2fm18oadjy3hzln07i27mbrxbljx6f478omwvxg2g6wthn4wlgd4f0nh6vcteeniecq1dnfec'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'fpgqsg05jdq3sjxqam531x70u86ij1olp0ainb247sos884oz8uqwc57v88c'
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
        example     : 'e04f8e03-1e3f-4d08-a4d0-a77e4cc5e9c2'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
