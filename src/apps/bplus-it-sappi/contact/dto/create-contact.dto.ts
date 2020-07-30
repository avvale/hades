import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '1d827279-ad49-431f-8224-8687a68c42c4'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'c8e58895-0f4e-43eb-a67c-670416817b9c'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'nqxceiazcnhe5joxdjafiv9aigz4bt7htg3489l760eutht4ga'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '8dec0054-8b60-46db-ae0e-f0c74ee1e3d2'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'qz0ki3fdvoy9ljuktbxo'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : '8687237a-648e-49c4-9e0d-2ef63aa02f59'
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : 'lwtmj80tn1p81nxvtywyxkfn1xiro68z3ilisnpogel538h0qaptzgkj3dbhr257oppipf4nyy28ic0siotujvy1a78vitg7394mon9rghaqq2hxi1o883u9kgk171ffl9v8ai9o1zfc4ypt5p7fjv07tsjihykebdbrb690uun17z0wfps4uadamgwl6v4v5rqs9h709ukv6hmgo9joa6zawn1icd1y84r7avixm95er0kwmd53i7rpquqe5rd'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'y1fsy7p3zrkeewjfouijg6nx6cgvbc42sw0ugjsqny6f0wcan3zq1b62gnsnkwx0drscpryyyr8qewfw79pokr3mzlc5jg3ocf2dujuql1135klck0pmotkcr89kq0lqgimjiv67rrzk4t5jtpn2uj0fcsefczyi8g5mbjiyiwrykmehshptokhparlbya213tavhh2axl6x2lpqk3g3evex4qkr9y4ab84zvf983xmacqs3nhuicy6j85k8ua1'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'smdvybcpl0es6ifx53wlzpgtjqxac9znlqornoxbqabiwrql0uf5wcp89c323llvcpdlk0ir7y5ywrhadb5jvux1ay3ffh0mokhnzz0bdl6u83pngbks0jw8r0470mc984vpewqfo11ptcc5th1z6m28haw4rdusd9yjfldolfg14im2h54vqa492lnlqxpwtqq3n7tbliw7n7c3u6xkszicr6vyj18z0h8g5kg5wp5b5d8hkct7indjr1fh3m1'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'twvbqpo2muovubunkj6flbfxquwxn0jcl84dxtee4mufd30s4e7on6yh3kvsgs7gjqjiz2qhj36sf46y4gudfu8xw0cw3f761tieqv4vhykl30juasu2gpy4'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'bir22efrsjaf3jjaz0uiq4hr9mx37fakm9y2mgm2d7adnma0rombn5rdaup3'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'zlr73s6xgwj7yq20hps5ugzx0uo3cwmr6os3j72h5af9zcgh2bis11dewd3n4h26qf68foq8psqvybegt4mc5t2ql65ni23ix6z9h51icqkdmin0vqgrzcv5w91955w8ex9dv8zfsg34kmr9ct9m15eiqrpokx5uwjpv2le2l2rb9p04nj83egxo7dbsh7xthb8pinx29e97sgt8g0yaj5nl8qvkrkz14p98f573qrepezaer0p4lpjgezt5oua'
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
        example     : true
    })
    isActive: boolean;
    
    
}
