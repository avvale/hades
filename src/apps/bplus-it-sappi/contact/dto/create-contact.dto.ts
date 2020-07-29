import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '727fba7f-4b0c-4856-b09b-96250feef2d5'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'fbc0cc2a-7b8b-4fd6-a64e-efcafd19dbae'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'l0l0qjnvl5wxgvm7nz1pfd1znmoq6j9k6g513y4v0ronsmbhv2'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'f17531e8-c0c6-456a-ac34-f01517b5b029'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'iqb133066jsz9vh5de9w'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : '784520b1-78ed-4748-9f33-d29a04436a8e'
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : 'tu4fksq2m642948ptppgv5o0bvpp89iuc3kc77h4b92ti6j07cswi347mgki9yxmc7fz28rtd3yzzzw5lj57m9kx8fn9dey3wxvveoiyg92s3dkqe9zq31jzbthl4wvutdjuwr9s0urmplybax837imx00t42xs788qz9k0zn8uhk86e9dgemvdbe4n3n2dv03jm6jqoo8irah7a8yqnpidvltbg8bejc107c27at2m9gbcba6gj3ktihy84jv5'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'l4471tlk74v4faq56wjz0xpxuj1mindtrll0bus7jku1sq9n0k9it0y73fzzs6lmwp7ybvawnhe5xmy8qwfeib9pryhdoc3ddr04eax8xopw277hy5stq9l3bwbjit9k3giqdfckqtilhda7a2pr7izffldo5ti3zw3tn1s4bm5ll1sdo32sy4hkhnrweawjjwgo6uidw6w73gebv91v1lvjtdtbdg9qx87dgg5ivwui9dn58b2sxla4n5hvtwb'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : '0isq8g7312kii02jh7ivovkomq4ho2zxljqdtdq2ynrnxiq5wwul4sg8yn93dzkj7lw7a4vexbryehllzvhvx5win3mdy2tq1vh49jgh9glz0il7bgg1mpo4dsvo08eyx0jphizdvedkjkohxin7ajj135l1kakozybjp9xejtgp92kbf9x1xsxh0m0n4h5i8zgweo4jn0ghwrtzrnjg3ajhqxlunkagsszgn9k368vbkry0sd4f0lth4sbb15p'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'q93tg01zwlcuigtrnne9264ygzima4j47sa7xjugk1qtoig9cprrfjc81at4zwe9ueoszne0m9oe15tr6pfnn0r5a8nwduzsyvsi57grmhywjfpiud9rnvhw'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : '0ke5ebj8pf3pks7uu1hfz784poa7pywja6pobzanayhi9fwy7cuw6q4s4u3o'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'zmquscdk4fuwfv01fcuo4xexmgdwgupvamlh1k7ohtn0lrcyf6k6tub4ebhiy1rerak4omrb8vnwz9fg4raf50qix9zbuoevt6a168awy3txe6uq8kg115sox35uwbfme7ycyjzramtzru1h5vcldhh57a1t5ye3wzac5i2262nsvh6v0djtfwvsiuxl2htwwn8jtymffmv3camin4rm8uv23jkr67asab208jai67abq0x3fgfy32sb33hovd3'
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
        example     : false
    })
    hasConsentMobile: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
    })
    isActive: boolean;
    
    
}
