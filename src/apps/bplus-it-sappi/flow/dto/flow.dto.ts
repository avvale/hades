import { ApiProperty } from '@nestjs/swagger';

export class FlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '3ffa9d65-7f08-401f-abf9-e69f80fc8282'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '3a116be2-2f49-4115-af91-34ce2adf98e3'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '6da34e26-9c61-436a-931b-51706f8ebdd3'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'r8p47955xxxk7fs9ofce'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'rbgp3sqe2qhjl3q05x0aowkjp6yfsy1vznu6zvhzmisaaj3e6e8fbb57ckie'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '5gkmegg4ykfq8cvfv9vvxxiwdw57kpimuv8a0q23degwz7fs8gmpwbk8pk3i8acfn20zmdhqblzh9byh5mon1pqxryxjg0p4i7euouub3z3f78rjxoqj0ur6miygtrnbqazuliozm4log7zz27p96j61dt1vzkgt'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'bsw2ort0fn0df6leyhy5kg4zryhqg90cq8wyfnjbyk47z16y1ewa5jh5e5a890c7v095doxplqui3o6cvu733quz0jdmebk7don1iea4ws1vxcfhn7c8xw4bnvfxtxwc3qjazwhu1924wfdy1g94j20xjkhxyvlk'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'vbx6tx7rl5q8uzooeb60lqz9mnwy8upwwhcath3vx86q0ohagakljrm3w3wjey5vdoiarvfjtstaqct73ipruskigmzds2z6n9ji72wrh7h0m8r16pzbx94lnz4zuqsw7smsabcckcl3q6xi6s98jui2qhjemlbh'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'oyf547g5kshtasigt95r9zo3cbkkub0xm74k9bss0qvk9l04j18b94snhs8w92bur791nwuvcybc165ohl9x7glc4ktcymxlee6nuwyojmt91xgpvgxbdvnqbyucembgivhdh0x5r29w5wni22pol16lud02gq00'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'xhmjwxuwr8uhqp35vfxx665oon0xueqlqv6i6o8jjyld6i4ayyjlb95mbqahpzeoecdmuqyeu1b7t65hik78ecxuzten77vm1ux7hckb1qdvkdxyyva5vjnozu3ljg0w7kjq3z2je2d560p6yeqp5mwtinawfoyu'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'w2is7tbbgs87uhg7m6nm'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '5xybg8jc8pvs8gh3o2j4'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-21 08:09:02'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'l5qcw43sb9a76a3bv8yttogoz4kmff8ib697d2xlh3d3d6f53dun7ixy51vltire7cq080ydae8jdjsuz0g1ebjjm1kl08gcof1t4m8iigezk5zkkqjeaeghdlxgc4nm8xxfnbaw1qxftw45aq9ydfkpdt5epmj8vq0jq3m16m975wf4rigv2xf5awd3d8h27ad7v2p0yqs6ophx10g4b8kesklu772r2hwfam2zmzzmo04dmgyrjkkvi1u0wmu'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : '7svg4kpwu3n93uuo55vke33ckm95v0j5u0dkpeevh7v9e09eua7xgvidh9voqt1hdtdy5dxrnhgoolain6c1vxmi5xqk0dcckrdzj1h23d4o9g07ikxs3lfk6dojglevyqm3dssymus8g2hj7m2tn4tb8f22lh9c0x1y1nfjyjq9i7i9y537wu22jvduzix8qdi2lvynoesnwiav7xrhqz3l2apus372jlh3ocxaqxhj0bu3szbzcaob5zn3igv'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'wrv4yfb1evxav3o6pt8hr16agup0ih8sfncvgjp2t0hcx6tjncqmpx094mtz'
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
        example     : '091fcd92-24d1-4939-8766-08f3d7da9f96'
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
        example     : '2020-07-21 04:56:06'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-21 11:06:17'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-21 02:54:01'
    })
    deletedAt: string;
    
    
}
