import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '2035d416-8470-47b9-81bc-b04e47fb2331'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '580d0264-3741-489b-8e34-26bbd434caf1'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'c9hmv30j9q0lqjvcgopfhf7zqgktry589771zzbqx5dqhty2ye'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '11386785-b7df-4a1b-9ad5-72a80d67e95c'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'f9r9um1sf1eztfhhtb04'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : '30f03758-c225-422b-8bd5-d17425ca3e86'
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : 'bnzy5nm4tff1hg13snq2w3gwb5swst1dh78iiydtghhff6y4q8wft4rx6u0h1ug2rlfxknbxe3riwtf3wh9ed59hucfc4o2rx6z99wobog21pmvztk03woaap6rhp0n4b7iu66lwi2968btw0fyp1p52ll6k9jgy8u73cbsqn98nee0kper7upu57bdyghllkpfk05xdrnj24pklrscqie7ivgmv5ou59i91mtfrrhupt3eo4wee8iqc9dolllh'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'tat026gr0ciydqoryobdi6qpe7vrpqokl0z81syg442f3ix6pb4t99hvh3nxlo2lyy56ihklp8umvuefo6godf5eom9aotdeiytzf9g65uovyp88l6csak4am3pbor2l5b3rbpd73hjh1kld8intqacbh0ivl08g5ja0v0guifybo1hdaturnss8hv8vvufgbkctlk98xx0h4r8g1a7kilbp8ybrxl9a8s59skhfqk5x4ey1xuxalno696avfa3'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'wflbrqro3u3aql6ifq365tqmcfcd0hdwrld123gwy3qblmtxdvb3lc6bn1yo6w1d5k4flapnj8ef0jnw9hjkzp9klehirij93irkyzr6pmh1rljnf1mbyll17eme5ivxs1p2qigh4n506dpun2v0nlga4q6x4v19kk5whb4ta93wzoizmezzxgo4rzpyct01m86knv99m5en6lqyyummli452fa9kvi282hu68ac81tabbo48q1enwzxr3ojyd8'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'up2q3eo3b74obz6a02xb4ucjzjmm2c5pieyv8yl1ruelyiekm9z9w1yjotbq1ta2iiqvfpejdam9bjclb6x3jx6nb76eikbn89bfjvewaiy0zzdxjdesc43w'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'x0hqr8caiyjyxap2z1854uki2b3paatpm65cx0jrty98is8zs9r5q1ucltp2'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'fp0jyebfc13fyycepoq8u40t4s4ngt6plzsa5xifkq3552r6mfqxffy6ajsfjmplo6eaj6qfc12zi4v7pnsvy3gh4zqe2q5jf4rm9urxtwxffy5crf446e0n3kf88iacc383tx1u90btkkdbkbgruzdrj13nmxvse72i1ve4ktvfybkfpyobjrt8q8wsxvett0v35f052rm3jknj7c7dq7ry1sei7zw5byi2mbqo9el2vgqqn7fumdhtcvpxhh8'
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
