import { ApiProperty } from '@nestjs/swagger';

export class UpdateFlowDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '2555e035-48c1-48ad-97a6-1e3a58b51eb8'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '0e78d2df-f68f-4ec4-accf-64c4db55a59d'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '89c5ff48-29a3-4258-874e-72884d6f1c4e'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '5a9226s2pclfj45l0a5r'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'vuikkfi3fbuwtt5xrkinde9u13sj7ps9941t8pvggru5z12vbyewfv1g2jbh'
    })
    scenario: string;
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'l3a34a6hj96bcannpwcf0igr66qvrzexvt1ncvas6c64hs88glujcaeo3ncub9d0n2ca8gd7cpe5woe1gqaaxg1tqr8zh5dul7i9k3kvzbsmghbgoy6c2vhw2tjkqtdvpmczxh2vysa0fremgwc95b41h50tjipn'
    })
    party: string;
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'r99mfgnzbvfps00ywsrwypytdso6dst3svmudeunm7uxnm6cstbgzs5ug9cs4wflskmuu6ucmpvmd86bnbyar2e4g4affox2bm9n2yjzrop1bk0ucnobea9ccenr35kren81phpmb96onuagl4fe53uhs5ysipq2'
    })
    component: string;
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : '9c0dp9meynuc88lxnpxzad2kitkf7ii0ai7stabqr668qnk5oye7x8fwo69eqf5ftqhcpmxflizhji7m8zabcl80seuxi9dpxio2b65mv65ky8tw45wbloe0ouqby47vcrdo4dw4xhgqm1vz42fsneveu8g69rcs'
    })
    interfaceName: string;
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'ntjoo0p6t7c7t5bzjndiiu46r8gat3eztlhfls7asp7w3145nlwx0ggkw9i34tvfdui09zpgfr2tz1fpsns5mjw6oz61sdsxgeudx9gsvlcpn0sn5ngh72k7l8pg0a7d8f7mhe83zo1takpnhqs63f1av9kjyv07'
    })
    interfaceNamespace: string;
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'bw13458jd7wprlt1julzczb4zytfp4qo93lclpyr8nzmp09c8mfhdf88ej9aduxn5bhe1go1mqez342wuh13vjor4h7xkh78i2cwwmv80sikhgh4bljwazr4csadjzuougib4l1jns7wqfsftdaw1eavzzzjctn6'
    })
    iflowName: string;
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : '7bj5s2y4rrn33m0tcns5'
    })
    responsibleUserAccount: string;
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '28aytw4aentfntvno5od'
    })
    lastChangeUserAccount: string;
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-06 21:38:51'
    })
    lastChangedAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'nw85igh2dz107rbyiabxsmz0utz03fqj8zb5doucydir408ljluyp3g24p1g2arzfztufmtz8loy8bkd4439v0tyqoqvobq3o6jckyl31jsa6zbdcrdxxey54c9hrc64hqbw8753jca1qqlj5fjqsipouh6ij2o72wu9m28utudv8k75w7n4frxztl78f013mvw2fr7zitf2vcm2ctqx242r62frqvev191f1ar7qeybwfjabhrq2nqbb5iel2y'
    })
    folderPath: string;
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'wsrl33hkhq6huno8zwxsq1rr82b0xgfvdy9t2uwxr1gukzimlgdf01sae3tt4f78k7xw5t3wue6cebw37mcxa02uiciabhaij0xddv28zc0qxgiuo7jkpw6gegx26unxsetjuptwxowd9cm4v46nmn9dzqtcorravcengnkgx6ayco608ndtfrja7jw243obn5catxnx9o5x9azjjnj7ryn3q8slm7v7sec262jkucucpjv2olv4e8gy55oyn23'
    })
    description: string;
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'k6qmaxis8gx4kvm655kvctyoq4jfalzt8bcsfc64cp03j5f8uf0ox7pfs5ia'
    })
    application: string;
    
    @ApiProperty({
        type        : Boolean,
        description : 'isCritical [input here api field description]',
        example     : true
    })
    isCritical: boolean;
    
    @ApiProperty({
        type        : Boolean,
        description : 'isComplex [input here api field description]',
        example     : false
    })
    isComplex: boolean;
    
    @ApiProperty({
        type        : String,
        description : 'fieldGroupId [input here api field description]',
        example     : '18786df5-5e39-452d-99bf-35a1b0bfe5d0'
    })
    fieldGroupId: string;
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    @ApiProperty({
        type        : [String],
        description : 'contactsIdId [input here api field description]',
        example     : []
    })
    contactsIdId: string[];
    
}
