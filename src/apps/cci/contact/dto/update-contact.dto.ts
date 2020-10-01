import { ApiProperty } from '@nestjs/swagger';

export class UpdateContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '6a01c0a5-1c4a-4c4b-a257-d538b623f6ec'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '737f1fc9-71b2-4500-94b0-67b85709c5be'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'sfufl0v9ataj27z2lrsctu1faotq3vwkmrd3gmmnn0b56pg82a'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'bb0e9463-fcca-4a97-ad43-69c9bff72f21'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '78qxdyfahc75izauruic'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : '3ff20a4c-8f91-4b8b-acf5-afcf2b0ede21'
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : 'ute8g9l5b8vgwn0nbk30h7o1u7nnoee5oqfmweitt2f2xznmgvcdr920q51ryxta9516zlf2zqxsy525c7ocmc0nqt7iuiwj2koeqr69vf098vndezko7jcbumdpuzhbx1557su5zytyee8mc0yahy03ges8b21dlmsm8akcr8do754xv7hcyyt4rl4rrb13h3u5t6gzu2tqouu62137f8qdwvdxirynz6hrm4n1yx7y0au2t8ch7ah7b3a0tub'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'r7p6i2ch45eahzja624al9iovs4k6p9ikttk1drp30afmqickn95anptj5i0b8ce3iyapzgeia52u7jca8aa12b7fisbhr0ylpgnwbnd0ontkm5aqnnjimsy3pd3hsl5lmcr3gjtt344s5mfbyc371kdf5400eig7ejlae1v0wq6027n3w041lm3vrq28ynjso4ecp4kdq8j5ehr5xl3xg5fgx0ers6jv3cw02r8az5l1q27w3jjufexwg6y5m2'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'gl1fajitpkf48ij63oezaaklemi3d4qd0gxcxt6utrkva0repa4n7can5rd39hstzt80q7yick5bnseizdgo1kb8eeygkkaulqn8gjiq123pojhe2g9c5i0s3hst96e5dxqgbc6pl2ldz4wx6z96mqfmx430ggyhvb94am8pi4c9ab4lnpbhc7a7ywx1eygpjacel5jtbd9qy690fm6umuhyq9e4fo2djerv8be99hidao50dc0fnlrheek8c2k'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'fjjx9af82edkzvedyqv33knxn67jtbw1n15h6galp9lpq8v5eii25soo4yacnuxkuijg96sjxk4hlnikkh2a5qsm1ln5mx3ur5z2j2ah1vmuyzg7j3f6tu9e'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'ksbw356qgben50p3snycefum3vteooquwtf1sw4hb4bpbuwyvxwdz00byue9'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'cfft2mj39k5q2ggjow0jyuy5vqzxomukb661z0nmp0xr3ovv5twt50en6x0qehdgaqlvr87uokwbxs4rfuwaow4389dhravbvgy3io2mp2qh9nw9x2zxku70vx9ltd4km27orvaacne8cfme2drqgrvvw6r1ct35zannrnrd06a4rbtmpg3t3i339la94ryib1nhlv6plv3b8ry088bd7ov79dg8dw40whj0w60zjecf6xafl57j1db4aypqdo4'
    })
    area: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasConsentEmail [input here api field description]',
        example     : true
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
        example     : false
    })
    isActive: boolean;
    
    
}
