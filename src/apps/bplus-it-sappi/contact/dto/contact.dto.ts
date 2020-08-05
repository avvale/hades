import { ApiProperty } from '@nestjs/swagger';

export class ContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '018a3b12-9c05-4969-a7e2-b3803f3b9697'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'a378e56d-a253-42da-8b53-5001a44cb842'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'apv827f2o66thgh1wk3otiyic59do4fhwfbmfl2wylipivpaqb'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '28fc35aa-afdc-4531-ac91-bbeb9cef1cd2'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 't0kkc99djns8gq0jls4k'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : 'b37a9d52-5811-472b-9416-ae0b76751e0c'
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : 'ao2qivinx97fp5a28yk35j0g5gghlr8aa0rwhjm0vypjelkcqbs21uzgohdas9shkewbm8yfq4r030dobo17vo155n3ilm033ykyitl0ecdsr9aghi3ykzfpvx441yuo0w6rzwztlhxayoyuslh6bjf0oz0v3tyfjmn57gisg81bi1ylwtnsslqrz5y11wdcq9ebc8yf9719x0n39o8xbfars895r0v9k1htq2etnmz2y0yivokg4y6fh29yhus'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'k3zfaukpidabym8okdpvhbxuw7bzapp1oik14scenpjxjgnvbvign65qftce0ex2kwv9eja9niyxu1nlhtjm4hi5zrwxkyi5u5h6mtld3970jj7nr6yeml88qh28yyqctpxg5pl7ql4w3awlkkcubd5vogg50coikmt0distayxztoxch3cr9j7eqbxrcwkf90la0u08z29xml1j1e1rmsq856liv61cxrx0zui0evsrj48kqzalhdg0l5md0eg'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'jd6hnicf7o2hmhas87ax6kics6n7v0oxeix4m75ii5hjc8yvrbqkchx58ul2idqcv8d8tqi8zrwxj4n1bvmyf57xqf1i6273y98e0fgtidbq2w8rfo4tgz7ahhs2ywib9zvj3rpz1acorc71pzcvfo4q00pddujsyxk6c7z2l21uctyr2c4idhvxkicr0upjeaapja1546ryaoeresifcaa2ss8tkrkg7ba2b08u4ovea1n79mt2so1p7cl32be'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'xc1soudqnlefg2mpgw61ein6i3ouy19jl8vj12uiu391w2ks6ks7s3gxicd0ya6mu74f2r75eh2qwn1xueervgloftniyj4gxived72wea2950h1cu0r46le'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'dkwwl5u7wn7xoqt1tpj2mpne85b56jbdsbz2dan4zux20n2hjjli4yhnkyak'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'rrrk1pz7qg5p3quxl0gb0hc8ul4wbqqy3nv5ye2v4m68y0rwtriefo7xwtu8shyigvvwkrclhem81llaitwbd1oyyp8qyavart9i0sej9hrbakcsidjziugomdmx5jjq4vysqsnp5hsjtayr52rm8synala7jhmipujvhptxj83iuzxpm7f0hmog23zkfxmco99940umqts02ex5qchxvfwfis3af5pbcw2dqc9s6mml0q27exmc9p0ylfrq0no'
    })
    area: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasConsentEmail [input here api field description]',
        example     : false
    })
    hasConsentEmail: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasConsentMobile [input here api field description]',
        example     : true
    })
    hasConsentMobile: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true
    })
    isActive: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-08-05 03:05:20'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-08-04 11:01:15'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-08-04 20:42:01'
    })
    deletedAt: string;
    
    
}
