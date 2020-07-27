import { ApiProperty } from '@nestjs/swagger';

export class FlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'f7535896-33dd-443d-8c67-ebad67c40cc3'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '1bfe9550-9bec-48a0-973b-027e1c28664d'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '0jew61kb0x6opml92s9p9wdraf5j7571vyv89lkppic1oe99f3'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'd55f9b87-8235-4db1-8fee-6478dd366ca2'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'p1gd0drx3xgs9uqm9vx3'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'qmo0vascatmiepdyi21y'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'gcre3oirjlscva2176ttsk2723gb78c22zmnyz8u4ypvdjy09cgvl909rszh'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '5z2arcgylt5olpd6e42p7v7qmkfenw8rhphupglmnzvn2z9rrky7gd9nhhjhuj4hdbz1rt3vt69gackxx5ryxgasns21h9i8a5cbjco5eo24bmb1ud2dwkr7xc6o3lkv8z175qcvwcglox22dudd1gclynxhkvul'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'tkrioueuiwyzeo5tl7h4gelz2u7wxwtva6364mpk9di8zeyz2x26gzl2zwq886p030jzubxqbhphmb4fwqu1s29bb19yq2btgij477mzbnd72y139s0jwovs1ug9luncizxopmmg89vjb05g5qo9lov600dha97f'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'rnr272q706kx0v32z5quy9pxwjo4wino14n76cqe17n2ebgxn4xonx9d5z4gjpxg5sqatg3aiwgw1fjjy6i47h77e8cwicek03jn8ey65n8g5sic5zsm08d3ao1mc419kw5o6uhsl373e5k5xhy99byxic8ecdca'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'quxu9g2em6nxr3tb2qf4vzvjoh2ld5n99bbtltwea5i0se9nylbk9z607wcjpo66femh5gd8vxtgbalt7sh6c6b8klmt10fbbyvvhtph9phnxca31l5ry0j93tcogijzhwkbks711wnxzhtm94agvizcq94aflfb'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'xrh746q2a82ym8zglifhgdkstxazl2yf9vcv2l2jgeb4si18ouplsjikljk0hyr6kmoyjlnrmqr9ov3r81zkioh8x5gno4fbwrtksv6xj7lyeho4xfoeoy14bbcnq3k1xapnxe3r9nl7u6s0luwv72zidb5n6nhf'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'vdwd2x4vrafs1wqnzzlb'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '2rae6b8z446uzlu7bo6w'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-27 14:15:43'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : '1tfl311lclsr53iybwjunwy0wyyddbgrg1ci3w1jdxu2xxxpmfl5ru9purjzxnjuwhmhygftn05xxexewhazp750tv3j6e8s2td9pqi1o9aa09xv6fa2y7xgrvfwslzi7qryvedb1k58wqmw24qfyefij3u8jp98tcdqh5q3m93zoga905gado6j63i4n8wgj3tcsv3p77kpm0extyl3hcf613f1aaudjyw4e5q68uwcurtahqnytt1sz2n760i'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'b6tvrnzlm1n0oy2r6w9b4yjw5ohgrbtwf2buyqk465o5j9pjx5xsi60fy8onnahz1bkz5ia5inx6zu7zopz6nsj4mlrkeqhcshcioa18ypral9x2nd49ldmulmuzhabevoggvjm05l92uxuffi4ottesxwx6byrxharnfmfw2x7sm1p0cnobr78b44dbspn0mjamrxgb4xi2ci4o3llxe4nn1w2yiflgp3vd1p2i63d4x470qcdexrdv43xf0a8'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'v0sibjf4bsxhq2sw3tjloqvkqf3d2h5n8bbzk8dtrglm9mqhlsaejpaw3z0y'
    })
    application: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isCritical [input here api field description]',
        example     : false
    })
    isCritical: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isComplex [input here api field description]',
        example     : true
    })
    isComplex: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fieldGroupId [input here api field description]',
        example     : 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-27 21:20:10'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-27 08:20:02'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-27 23:24:52'
    })
    deletedAt: string;
    
    
}
