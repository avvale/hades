import { ApiProperty } from '@nestjs/swagger';

export class ContactDto 
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
        example     : 'd5b0f35c50wr8wbkdqgjxn9wgtyflurb6mclbw4340nafxigws'
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
        example     : '3i0s8x9k3c5yc8zvp7od'
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
        example     : 'jcv1uwkvvht4f2pmmxibgvak13jdu9usn6hrg2dndrsi8j4zqgco8vdkh8g4bw9nsm6rduupdjpu2xdbggdc0s688ahoxn59qkz9cq01mzlf72pmguxr8cqykvw01gxu8vt16cgokq299nr9y4xuee74mgo64g4lbo05rp0roob8gba8i5pi5b50xf2bpsnaqr24dov6lsww47g4bsdbcnr7pa7gmnzskttp2f4noxci5g71ylc8u0ivrjbvz7e'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'vt78rlmsn38a2gtmt6mq0dpbveplt08q0a5pqk8xhkcj6vllcw9d5zkidgytjk3xh3z89bvuzt4896ohs86a98je2teusyg2lymwta8omq2x6hjcdsjybl16w7hy5r4v4t9ksozf02ty29inrk8jieubrt669xuh8g6f39ikc9wj8w46f653pnlwdw8x63tev10nktk0sek5o09yiqmbgnbtbrg7qiealj2zcnl66vtfow3vhd03mhncsb26d3c'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'ootlwk1r0fb07vss8gyvtjq0dlswtm9sjbm4ex89v9vgfiqiz61uje6klwurwkkz9jzrt6he17917jstfrgxg0vb1pitp91qwzy1o7guimdz3o51hyb5j54anphyaemlzqvejfhxnn6vznn4edvbn85ur3hergq3wtihfrewor93twiae100i1igezntcy8om013vpuro1wrksbp37o6auz5jfls9bukmjzzudpywr9cmb0vb20akefx96zbty9'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'xt6znkfjzqtuj48tuuds2dhkze49nfpvp4as30c8vdu2q7cl5hspf4l999u8nk1lw7s7mbg3c058mdsihisezt380ie9de1q5fx3mwlwfg5krkv946vyw75m'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'wo3v00bysln7tz6aqgg7bnat7vrlccjvnu53wpgxwbbutiytnx44v3nxjpw8'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'eywl7w0qap2hlmfpu11tho6fshz2ang8gtq8mvykf1yatskxhs66rlvylj8bpdnzhpjc764jt93in7i0bzkdi1loofr4oqamgzbolgeqntox1c422s6t4t3k6xo5c39xi6esav073krbjutzxhgqegxa7p6uxafjfpoyn52529fepa6hohry4at2telr5xfc7wd8v2xfad3qj6uub6jr6e9fdm2uakrrz6gopczozi3jl28fsjplfjxqhjj91fw'
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
        example     : false
    })
    isActive: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-29 14:16:32'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 13:55:06'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 04:23:24'
    })
    deletedAt: string;
    
    
}
