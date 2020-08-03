import { ApiProperty } from '@nestjs/swagger';

export class FlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : '84cteo38285vpeaf3j1kmip46ljr4edj2wauv366'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '19c4cd7c-445a-4c37-b5f4-f1eb4f3eab1f'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'bvxxjxcgnsuilxsf92odhhcy2w156n98ovmwdo7x5zpalo4r64'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'dd3f8c37-7778-417c-9ed7-0c0112ba9cec'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'c1hgetck3whk1yc8tc95'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'f4et392ugpka3ma45zql'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'zyw0l0l4ymmgvarqlfpn1ddy5usgozf08n5k8gmj19zf8nsz3qrfeparrjnw'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '6krr36l8v7r1dfcix7m8thxakrc74xso4t051q5ajelt8w167gc2wzuubnu6jks4j5g6cl8je83siomst0lqu2lzei92nolhxlnqas4whgylnvlwnov5ax3wx55ise6u7czgehk41yulizfyi16yspepsdfuuwiu'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '2hmfamro2cva4txcnl50if75j944c5rkry2ftjb0bkmxd2kwqw7ufjjqpohki5hf4uuu9wo73y2u1y8vl71ep2kvpd01i9s16ukc8y6dbul1u0rijbfboaij27oigg1bibqvkrioi46dn14x6x7j3t71z24d1uyc'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'bj22saf7ovorh8sxtfgq98kya5rg276c1wgcctwq8eg1kj36cd4ma1wj2mb4da0fhwunk23de5rw8a2sl4vu330ft4tiirwqk844cmkugqjr04hy5n6bathvn10tr3vx6jnb0al9m1wb7yz6ua1cko1z2d6wk7lc'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'r7o0m6m71qk242izay8tv8fsyhiyz3asxa7e4gv1o8dloga50eqk4umow56vx2gl6sozxz0sh68plhk1atbaak1i6fndv9o7na4gmst2wo8jcv7ex8ybz1tob1umepjaffw2540kggngn8uw9bry41n4928izler'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'bktz3xrv8qxh8ywh91u9ywfnfyftiyb6mbsdxcyw9u1kphirw0awqgbimzjk1h6nq2r0t3higwrnan6mos1opmwgayzoc2w65pf9x2978695hyexmgyrhwol2mfcretygy2z6qj99b3nyuk59zxaib9r2m7p2o04'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'zaunkqoorz5jjg87615d'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '2pbu6vo6s617hb5p0lin'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-08-02 21:40:56'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : '93dpuwdwmshyjy6ztvqrfexnpvyqpy9szj4gxfeelp8ts6j5pqyvzxvgodem2v36w1ur0fzi2wtsuydpnad22h0xwhmhh42psd9xvv1txafyoenpi72f47h2p03svqearg0mmkghbr9qcxguh9cmbpzsd9iia4uxfnwoo72anjupn47xyy1hsqbp28ly9fesh2d8cpwfxuvmq3cet3uv8p097yglunzfk73g9e0jxo4gfefz66hjtu90i6vnk4s'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'rz21lk557rxhx80m022zf1h2ovz4qt581ur3327utv8xxyho5csar6kgjrprk62ysxblr6ma07tuwlhs3s2e4rid9l68n7frw7zri2y43p26fozd1ujpeue0vwrfguceew07pgx94nmk8yxi6bkq9c82jogl6715ry0yn9kkh5c77vfmt581rz90h89i7zognxwfmw2aptbkhumzxexpa494wg0weee8rqfvyqzgpe4qt76wxa3zxu1we78shly'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'qly21o36nn8do1ixmqjze4ie9swc5zf3r83iso4iibk7uyjfp7r7uk0iq0jc'
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
        example     : false
    })
    isComplex: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fieldGroupId [input here api field description]',
        example     : '0f49570a-fb86-434e-85a0-9c4dd9688a13'
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
        example     : '2020-08-03 15:17:07'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-08-03 15:16:53'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-08-03 03:39:05'
    })
    deletedAt: string;
    
    
}
