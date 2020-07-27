import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '7229ef37-da9b-4a52-85b8-d195873c6f8d'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '9661d7e7-019c-41c3-bc61-44e69a44c7f4'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'si0du28y02do7wwhd3qp5jvulk8vb51owuyfyz25s3wvtq3ddz'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'eee9f9e7-3598-40cc-a476-0d73d877a52a'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'p6664nnsdkzr4pbq5n98'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : '977070f6-62e9-4738-a02b-df061466b504'
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : 'zyc6fxwd69wtfaetbbhlq1cx6v910sizqacks7cj5jg7a26gw03apm9wqvnx18xb16ocu0lvky0xp2egxyezcfjyzw7mm8yjrhoowtcviv8wf45x6a5rbwqe9vfb46g73aumu1fd70m9881aiyjxez51nt1uwqyoj0hcfg9buj3244o435g5shomgdql1d2enfde30t2qb3afev9eyu82na5te1ky42p5vtuth54gb7yny8jngnhjalgiq017ml'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'dopfjr49bmmezaxxchz8bnefpidjhhysh2uxjrb1p1jtivrm8if4ckms6p4ds73lbj8coa00tikim9rv9v8nycply7tn3p2w3iuwmeznpqjckwpqxfcnvkfcr4v5495eqo8elv1cnnnqlcnndaso38mpao6kktlo80ax3shb8ftch9zpntyhv1om6j47lkem08grtoa30yvvshh5t4iug4vq6k2d415z3s914d8hu2769t9t90ty53uyb3osgok'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : '6bbw0uxgfnxfts7yjm5n2bswx4jf9upj0gfcuflt5fdigpp8ctnqufazr1hr0qhl2jjaniqhgqlkbdsgln9av6er2oi6lwgcbs0hzl2wt0yy6rwsx6fwd28v4lx3z1r3ayg77jcjoz2lsxrtmfsobq42bd6jtg3fm64umqc7crhhs63m20lzoufgz9upn5aud0j7ovuhvme51u3waen9wmll8djqzqjca9ykfmsz6llsfmoai6sfif1qehf23fb'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'cdvp29mnwbtdf7iwm05l3dshi14jsyts3b4x3c9r4axjuwy3zl83cw3cayd7zprps926r9k327psb3zaeme0rzovavrjhox5vli0vvbrvhg3nlfmnxncwx3z'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 's923d39onjdvvcjhrrumu3t55dbbbhtopup09egb3v9ew25ocxympfii9vc6'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'p16ezlvio78ttee3d2pmfkxk6evnq195gzlw59z1rbdvssx1yxdr7sga9q1adc2waxoftqbidh1tg68li1fjl4hmbb3uodthig9kvbrwsefjp4zle44oytcs3xiv7m0izu3h3gipw0gbweqzvhh0huf4imlckz1hnc4nj9xmp5z8n4wbwjv83qucoltmwm0cahber3kujefcnqhpubmw5ywrsmdi7mpiegysx0qray16wiu8st5eh9u7i085fls'
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
        example     : false
    })
    hasConsentMobile: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true
    })
    isActive: boolean;
    
    
}
