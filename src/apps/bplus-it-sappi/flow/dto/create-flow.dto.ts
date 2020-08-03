import { ApiProperty } from '@nestjs/swagger';

export class CreateFlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '6b05d4c4-bbb6-408f-b640-dcc5e2939960'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'dsobsv6v2b8at74no9r9je7ygeq8ywzuzu078rmy'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'f47af28d-aad2-4336-9207-0a6b77e9bfdb'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '6iqt0qeti7rk9r1afmrrckskfl4y5v5qaf36wwdowl2gcdbcxi'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '8db51b8b-b745-4e7e-aebb-80bb967a02f1'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '7gtiifgzzcgmrukitxtt'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'ivg213j6ccieym6ph4ww'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'x7mzohaw7p5pzhlhyey96z3p3zsw93ikouzd1faru79sva0z6ma7vum719xi'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'z4u588lcnzmpsm0ez160118jrmep76kxlyw8bjk5fs54cf56pxlknb0cf0wc3ezt6z0t6eunzd6vkilca8rsnpm7yie2tnlj1uizdmvl6x27mlpmd45o52hiz8e6ncm0imi9oeh1damv7mb69b7oog3okaiy0kp7'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'ha2mcoqbd0prv6rr3fyg89ry2fgcaesfq4uod1jwrdqifyo59yzuyqm61ofnunplj4ofg8asrfzp3bwzwkse8l0uamwl5ondulvzb6sy459c7f0lboei5bbi25qpr1gjxudhfli1y0o3u730tz0ramqdarh926q9'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : '03mlenodeos9yx3l6rj3pzk6eaudkuq0mzclna99k01xo6tws47lcec6cl6f6nld6umu10irjze3fbok0tzlkn4ycwtgpo4dbt0bvf9lic1dlrzkm0gr9f96zpa6w6v7yk4clqw8ay6um8kpwxdbriqpnh4h7wc5'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : '3aw45sjxerx8g42z99q4t52qa9f9wdige1yay7zk89gty9g166fq4ydspasdvhc702bc1alfz7umkqub85ffxo43qv2j1dem19ygyr4vml2opq56t1rbgz8pfsrg14cpctjnuw3u7532rhq8d5te86ri41j5tufu'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'uurxvp1jvdjk4x10fdsza772dcvuqzi2pv1ybx90p5owbnttvbsi6vyh0zp7vwiu3m4fj6tuacmb5j0huuyze1omq8p8yhzq0xgrgchbpweecwk4upslh0t3yzp0dddtoazbw5pncjockon21cnjfedydkdz9lvg'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'okzygv6w1rxzxexaev4h'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '3a0yykt2z206345vvp7q'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-08-03 09:57:11'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'zxq95psvh9csclzs61qgc8s5znctq76i1df7lql90hczhclxnz6xbn42ryvffsx59ax16n7w0kn1i9f99c8ali98aq0j9xmis5bf8u1sezay73eclkrt8liin49266trctlul0u52f37ll3b5t9lxx0mr2nrhgdscumji60wayyk1d58qxbvam185jladpw55iuuu407x0hb1rrfpowmgz0ndztijpc98r0lwvbjk3yxpt03att0rkguyz5svpo'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'hfxge22xv7qbmtalbs82v9cavcdz6xam3spls0adt93sh9s8cj40vja0pk6js0te64dys8g6jfcyhcs0yqxufph4focnpq4kqjux274z79htbg07599j6xfnzp3hqbi1zlsvyclu73mxbg5sbqhq4m8viw88klyjvz6aiupjpqbq98vwts16or9u69kbng2lyic7ggg7kr1zxanw9u4eovwmj4qoa34f9atb5ne0im46qwysp3j20ufdbrbulil'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'qxe7n29mbr2cpfcs2cfbfloxi8u9xc156pg0qiuxlh8p54e0jo481ykb4cif'
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
        example     : '818b53b1-d946-45c3-9006-1bf5decd917b'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
