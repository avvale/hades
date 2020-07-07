import { ApiProperty } from '@nestjs/swagger';

export class CreateFlowDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '16aebac5-50d0-4830-a9ce-4ecfab242f14'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '37f36d7c-2f62-4e6c-b8db-52e18c340a25'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '5u2d7i2q24cen6m563y0'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'fbrg1qnlkredywi78ltvfke1diwq32i234onj87i1a5onwfkdmxsyjj0fkz1'
    })
    scenario: string;
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '1m7hqefxs0c5crj2965xyhb7z3hs57xhnr6vwlio35lozprt9f7n4ere6m2g079ctse2h1wfbq561sy57ad1bvd0hm0neqdfxhqkjetq1l0dvs23f3iuptj7wht73n9rtfrtf31s4dyxsx1gyrr8t2e6om9v5ido'
    })
    party: string;
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'qvv94dqhz60ckb6mwgv2jsgyccqhhcuriwmdjlscxe7mx8qcy19wue5evipc48rjmf3bp2e9gxmrw6cv3f59oqgttmq9phzt5iggs86eezojaxeu7jo4ovmh4hj7lmz5w53b8tyfsq6g6w3vzga1vedh03aqsxz8'
    })
    component: string;
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'cht691t6fgz08gycco7r16hlkmvine55wwhnxfsf83u58qlvp76nhint48xlamp93c8gnuksw6tkvf1l8qg6hcfcqtiud1kmxz2lx4jwm6bp9uou4vw6y4dsmlec14bfzh859n1pzx4w3pgjqnis9m66jerdhrth'
    })
    interfaceName: string;
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'jdxyvclub0ewqtmon4mj28v4nckglzfo7u6iaqzuwlcvkjfppymolcepll7kwq6fiawwcg7dkdui0quu0e3qskwson42ycqjuol5nx6etxj3jwgi6ckrzmcxe5ipmbbcmefrgizp0adqsbk4whz3tjvztk8qocai'
    })
    interfaceNamespace: string;
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'p5ksy0ujwselbsbiym7cguk4zqvtgzilbhfu6j7363bwlg9w9nurf1knqqt1xmbh8sgyfby04u5zfs7ggas8xtsnd6tf0fiiyghsf6k8isxjxvqo0rpy3xmiijsi4ud46hh8fio7htzw51kwhoxxfcmpsm2xwjz5'
    })
    iflowName: string;
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : '1f8s0eqfzf6i7atzavrc'
    })
    responsibleUserAccount: string;
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'twk23mvtnm0n4gri7aqv'
    })
    lastChangeUserAccount: string;
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-07 00:00:10'
    })
    lastChangedAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'zllk713up7qsmnncyzdu0iq3dn1dliiencfrazibkl4trgaknhfa5w4r0y59x1zn3nre7uq4z4857nddzz0k1dnu25qfwyre83x4fprjudrohphfmi9rmf6i5rpjpt9xlpllw0lwfoc0ftgmn55qqvnxf8jdu0ax4lz24ep5pabtufn8m2eaehtwuypwijdx5s65xr433gm7j0jit2wus2274x4wb78ov6tatztp98q4ymjfpjq76ndogtq884e'
    })
    folderPath: string;
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : '3o2frfy4j0g1q2rxdulewasjgkmbz0eri9knyhrpvef1sjntefmca24zegv46dd32h9lzdrax66vocvr9hbjv4nbq2vd0iweyx3wwl7doc1x0xkot7x06heaa1fiokzp8ksx8nzktwe8mw81z290dy9yuthngwodac2n637vo8hvjau6reep5p34i6d5mo3sqvw9i2t5kc4adbbukx9e6n6tpb189f5522uf70iqbmmgg9qwec59ko9h3ieihnf'
    })
    description: string;
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'u9rfv02xdlvdjzyhxm8rlj78d6y0c48mk0anky0nl930eb7hyb7tgldwaxyq'
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
        example     : 'dee11500-fcc6-4d17-a45b-59cc6bfa6477'
    })
    fieldGroupId: string;
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
}
