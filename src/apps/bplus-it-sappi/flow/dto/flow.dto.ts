import { ApiProperty } from '@nestjs/swagger';

export class FlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'e10d268b-bd1e-45f2-9ded-8357f70b1b20',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '2ffdcc30-f31a-4219-b72f-7bbfd220a38b',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '51a15258-4069-4429-b84f-ad11c9664dd7',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'gdpbt5w77m64wno5ytka',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'xa4q6lgmxoa14roe4euo8kp4z5yrqfp2naux1bttvwitvmfqjrqg4q8c7bj5',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'aaijtzb431aymi8laj85unc2h0o1m2sj5arl2z2pc4vf4wd3nos6ez5xnta6oui29zsmdpxfl88suqr4vjinhmvf64owf2jgh8s95wkjgbic6i0tzyuy50yey19qsisqcc24wskn1bd1y9p5p7ylute7g67btr4f',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'qkna0zpid576ghj9utvth7svzxfabya7mu47gtskw7w8u144gim16tku0y1t59md4mj4f3dlt76g9c8nf20y3ysunsjwbiuz8twc0z40gmpyoilxa4dzjj5puyiez82uutir2825abbq56bp6ohyqo7q55tlw6aj',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'yp3y01xbi3l1s8g0ndkqona4pcszcwf8v9qz00o4240smctflcl8c7v19auuro55anr5huzbp51w7i3yry4m80tcf7wn4hvoums2m29s2mfkg9uyr8zixg251m6e4czopfzbpm5amae9x84c8lelgugqab3ut2hw',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'l2jgiv3634dfk5nzspxqi3a3t3zh3ej7lbhhed588hk1spp90pwqvke98j4wkx64yqczlx3rqelmkqgy1rjio2fdu47k8d81934rd26n56iaditnvfk29ox5qlb9xz5c2sn2m87ska2z8rwfj39s4zcbsjjp5pao',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'slbt6gcgjcjthala5lk8cwcpyznzec8jk67qknal2i70s1tm7fw4l0s97oxkhe86ylk0wdnj63oh7y9kd28icvbeyxqju7wcpgm0ylfta3vrbp34y3l24ng6bmg8h20jtp3tihjgaehekae106fhz9vzmdssoga0',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : '5q3e79490pgouon6hilr',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'fgo5l6dvoi0fkwobuhsx',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-17 00:37:46',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'wk9661lwhe2m4vtsoxq5lo0148ucpn8bz7okkyatdhpd2ma14lemugtfrxh9z645za2tq0pxbtgqo2azlvn6b8o3gcfrvunxjrqm997xzfcpdo62a5vc2kp7xjnjkxvyygvczotc00waxew8840l4yxvp7g0jk9hseuove379rwnbrfw9a07em5iguc33f5dcn3hqocssdl3xldk3inu6m8oy2m9ne7907tvc08qfca4t93gxtusuotv8ocnf6o',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'iq7qpvg149n0j5vc8qc153n5lfnjdpcg7eofj2kb3darvdb8r5vx3j92bzq36npda47msr561768129c4jb6ejac1px5j2em72gs0tm0g7quutrm2sgj8zpkxi4dpe0ck7z4fbuximj9uq8ehtymz23dei1j7ah0j05h1qk7up29cp00eeiysdk6n9hnxatnrf83bro8u1sm96ty0oqhb1orvwu6ja85kau9bohhb7dkoxd8h9zgkfm0gxyo9pj',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'mpnrwuxjbcc9cwz9x0uc1i4p6tfwcobdjunfcvqq33w4jwkmncfzc7zdd96c',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    application: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isCritical [input here api field description]',
        example     : true,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    isCritical: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isComplex [input here api field description]',
        example     : true,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    isComplex: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fieldGroupId [input here api field description]',
        example     : '53822b83-7ad8-44cb-ac0c-b809c8ffb81d',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" },
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    data: any;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-17 12:27:23',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-17 16:09:44',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-17 00:35:49',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    deletedAt: string;
    
    
}
