import { ApiProperty } from '@nestjs/swagger';

export class UserDto
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'd4509060-bfce-4080-a78b-5c384c0b0bde'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'accountId [input here api field description]',
        example     : '12eaf98c-7fc6-488d-8df3-0bcd22a1f857'
    })
    accountId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'hsyf01id8ilf08mpofo9o6i0clv442wauzuyaw5xqwtcgjy2l2hqqfte442fdtsuea1wv90c2vmrtjlplhyadcz24xgb4x31klqut0bpp8iambkx5r5uaomlau5uadczaftc4pgiqg6vd62hdha7dn0o65sr6bjtf82k6r7tcbwltd4gt0r04hm9ysldu95bjaa1alnr8h58on7rlla1a4vheu1h8l0apm2v39lcl120x3qdpwun0tbpizcqavg'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'lktli30fr23r1moprk0o1ym1sujbd2ufo6kr0gq2htxxy6r0ydss7n4mda3b03cdcyl6wh33dutey69dxhjcll6mz7v9kxpntrfbwst9r0xe1v1k5g5pqr210ih7u4rw5pjkpqwj4nnz7200677jm63i45lnwwbc5xr8no7qt5fsdkaa0kjq0bow7ecwn95dzdtt6zym3a7ze42h9pcgezyo20utoydb28cxu83fz548fouiv6ooird73nmujul'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'avatar [input here api field description]',
        example     : 'kg2rx7azg7uvy72iamdu6p94ggipwbrfjthvgbliqirq206lhtb6b6y9aqww9qhzkk63umlbz00s2j4of7wn4h0jrc3ytom66bfw11fye9iu5c840vgy4ovcxaes4yjhcmljnhtx6uzf6xbiz5naht7zsq5s60nompkdg0163rwtax2imiyvy4gzs7dcdo2phgmobssxqbrauvxk0zevnxk7h7isv6600mr53v1ej7i3z5lv0rtrxw7p44p1r93'
    })
    avatar: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : '8ljxkvofdi9a2cenhl45fe1ib6279cpkhiy17x1110q6w6xfc9eaqy6vauq6'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'langId [input here api field description]',
        example     : 'ce47d65c-5809-475a-a234-f7f2867d4418'
    })
    langId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : '84e0zd14pk98z97ommd6ijhoz9lg7jqhv4xd6lhmlw4c8a761qbwsvxb36nqc13xxbef1a2jd0yudla8m5i3hfgan7z2czpcbbzgx59k2y6rs2akhw207s61'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'password [input here api field description]',
        example     : 'ha2049h3dnkiphu7ldbiekacgkiprs81fvptb8oaryi3xvkeic9e2bc865ffpoe4eo0xwubbfru0rcq6n4l7fmnjyc9qku00qnypif2ybfudfrqlv854by31tjirb1ks3sesikilc340vj3xuj6qkfxm6j3pt6bblmxo13xm7nolxedq7d9l7hwuoh9spgijmu6xk5rse8g2dwb67qucsaraoi5oq0l1alsql0hk44duo0wkew9ftc3gq7phxiv'
    })
    password: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'rememberToken [input here api field description]',
        example     : 'cc83zunt4sqppri598r3aeavkivdflq6jyyluva9x2oi7498swqxfyiy0qqe7qlhjl383yndlw49jqqo9o1ado86stg99l38um9i2ipj02y7pexlg61moxidal4j8c9lzik0yuucnrbusep9fhayna3s865o26doyzp5fmskzl3f8tpnx7k3airofwa8fsd4m49tu3l452dk3hxm9rr2obv9d7phle7eluillu0rxxbsjq2dw2p5tqj7n9v0kho'
    })
    rememberToken: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-10-22 19:05:43'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-10-22 22:57:19'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-10-23 12:23:50'
    })
    deletedAt: string;
    
    
}
