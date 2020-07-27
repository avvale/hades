import { ApiProperty } from '@nestjs/swagger';

export class ContactDto 
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
        example     : 'zp58fv8xriodkq5ttp9eana05fcc9a63t8r789y593uc8te3nq'
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
        example     : '5hzlr8z1met7qoct0kya'
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
        example     : 'gaqhp1okeaafmeajzvv6vg8qova99qm2cwd7cqxegjh7ppw19a1vqm5yhq7d9w73n24sjvbphszft1n1zmz60m7rmvtbxm2oyn9xvt1pzun9mgd9hswk6ihlyz2wfhqernwutes8tzabdegbitryabcsyptk1lo7fk48zkfp1gyzwjgrwunh7fikyfx5z17x6zk5frrrqq0srcutd9zlijzx261crf4klc4zrgsfo5zwveiszzmm6qdjflmhkr4'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'acrxcrtfsjw2z9wioxq80yolibpylxhosbnd02uzpeaaemapfpizufrwwt3uxmytvpit43p63fdjy9616rezlph39nnau4ub21q08tezzf1g43rbxmbsc168swbvfmxi3yhcds0yvrhl25jt2fzl7m5sqqs9yaz9o8naeol1ukvxf3zx8dk94ppr0c9dqvpqk04qboac9hucc4cpaacl74d7lcl7x8ctz9p080rydaewpluexwd80re1rqu9n1h'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'ajjs6800fv8stjv11cqrzmvqjcza6s004e1ut3jqa53cy7np75kk3kcrmz92afo29mxb795vrvod6ht3bqd9lion1aj2s0a28yectugtps47jab4m0n061d7flnz7akrsdoy5eyx5t5qm4wevglikrs3cyqsahlrx8tobg46shqw44g92vnoco1egb4qzcy4nduazgxefebnjyr0vyc0onnbjp8cl4e3ed314aalgc3ss1alwxz4qvncoqyba8n'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'ti0qfj8mk198825lhaw8bsoc88ssr8bvfiaoei92bd0r2sqdoobg1ax3f3kywsrr8pq0c9cvo0xv2ah5q3lrlhwlbzlwe8b3hhiapbx4kwpyqq6cmb4b4idb'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : '6d14zihn7nagrbmq2qp07tve3u1scku4g24eqsquwvmhvdxyyubssaswlvb2'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'dj5z2u7ye3r5uh8ad9zwrb4194x931lu05ufnyxnirl41cz3sdbmyi1c32139sjjwme18ddn0bnxk1s00gbmkpjlgjczmbrw0fe6x4uptaomwbq59a69uoz36231vbhmiestzuf6tf635q5ngnou48vn7jpwsiok080u2ta4ewi2nlam6ghccnzj92j8d54pg4y7tvxwbt81znphbk8p51s4td2576xvsapjhl50c9zpo534r26ravgh2gjkixc'
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
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-27 21:54:29'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-28 00:52:05'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-27 01:46:58'
    })
    deletedAt: string;
    
    
}
