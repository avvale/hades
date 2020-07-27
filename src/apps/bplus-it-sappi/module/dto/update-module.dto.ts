import { ApiProperty } from '@nestjs/swagger';

export class UpdateModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'bce0e175-0e73-4e47-a773-429215ad0f63'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '04cd311a-5e07-4503-8f07-e1390e4c8ed7'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '4slj0drpz251rc3o1vms6yvh12ah6z7f6f5zyx0lqsae0w1cd3'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'b0407ccc-fe31-4f1b-8421-4fa24ffc08a9'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '19qf2z6dls7qr13on6rr'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : 'd27e58dd-b8a8-40a7-a121-0b02ac7bc6e1'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'yv0zbp32d30zaucqq83s8qfz4o2i2bfxxxrjizlkke19bk5sw4fmtcc56qsj1paxgcqxx4zzp9l8yttihqmavmb5dwu7p764ehvh2z2us5rit14bcl6ervykaavlylwckik94wf8uqemsxoetqtpt6ul9uq5j434'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'r62wzm90tfvck0zwpilzzg89ut2alnzgp2dvddjt8hxwt9yqsmsc4rpyj0o8s38m7blbbalsia7m5me6bnqxzdapj688c4pmwgklhqqajn2be5hd31yh5tv70owp9syx604zkf43q9fyhtupplz2btfagixem7qz'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 's0a9atn1nbsx7n39g52i89s8fz8mtnnyd03kg0o7hoqybimlfnx170n9urnwdbo8ys6uraq3v9yq3cxcixtcqqelwk91bahx9qkrqpbmco9ltf8tq5jzm7glag7qdvcze5cqje4e4d9p0p2ehhj36c1egtr0nxu5'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'xr5gpwebrtqu7fv61nyngl8bpcxcj7usnb1mgbk34mmczkonk9v34lu1ecet2zkgal6va6n7ejqfo66s3y2zzzor299jhrf3zh5b106w8ttditcm8vwvpzrh24bwixkprpsz8yh1dk2nauj9v6w8hjsytaja83su'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'u8pmqehqwsa8yvp1uy3b7oe1sdyi44l5smfn6wv18p3aud8i9y8oby19ag0xvs9n0xqxduqpjhualsyghcq3kme18nks00m790plhuq504rpf26vgm4oriv9keqa4fh1sk0v8i9x6s6xt85i7bezabii4xpxl4a9'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '1hc3h189ncwb21muh2fqyqbpqc3faaayo32vsxjmtl7hw6fx195ra76msyiun26wpsfkoj5gqjm0wu1fqsz19wrgs2xl86dzp3nzoaw3mpptk3mbrvdoigptpbk1odejlifjyn9vftv4k0u1ufxeg1lkxcog9o7q'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'fdpngxaac9i4ogvdtb1b8w58jtuujjygjdea7pm0ljpnd05dckhbsf7df16srfb5jx48odfoxicao0fdv3fccwol9670fcb337m1566ukizyw37o3jdk8kbore24vwessh235fmo0ta8wqmxu11xc3fuwlw1stu0'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'ae7jdnlxe3bisn92n0br'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : '5gxh8bn49rrn9ekfmku3ov4e7j0eqv05fetyo4ha1kmhqftrzsznbp8lm67al1ri6vyq62918yy1qanth11cb6xxmsyexbpt5fct0mqynh2m3fjr23mq0a3u3bq77qlowv091z8i5bavd1zg13qm98bsodgekiqy7t7npv21wh75993qi2amtf7f1sx496yg45lpbx5dhbdstl1jeg4am9wfdqkie7dn3412lq3m5pxrai42kz92hk5zsa8x2zi'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'bduat6tjy19nbobwz152rwjmohacrivf1f4bvtprw73cp7d98sldc9gcf9qkhnlxt8fekz9j71uolcif3sleba56sbn0ltregpw2jv3vwqvuizkfj1ia7erzppep89ng7t1xhh79d865uaq170z4u9myq0j460j0wgw7flwe2hyyudpq7vpcds8wno34anh8ouxdtsji9stsj43pntlpnupowdq3sgepjpex094wnpf4dk1qgosb5pdwylvbeua3llnqdw3cvn9aupzwbh3yjlvksofjyfbakfryuf8z9xfae9in89tp1jhoacab0lhl'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'kizu6sg3qhjjlbvhm00hxrgruobg9ow3znol2g7ajei2ivlq31mjq7udcc4ah9wiuxbc4y8ai4ntap50p5fau55cc1hna8cai75vg7g04qdk2hrky6ndzovlc0dqmfbtmqkf5w61scb3a608jd7vo1jt19x6lwqagy1o4f72rg2vhgldslx8n3wz8j30rogbis644l5vt7jv8b9lvybj66pkznn9t34mtefzlycjixcy3qubimn5m3rl7mqp2aa3mrzg7qat5ampyfwjf102ogb1f5f6g7zdl282nxoqq7xk0uh046xeuh78qrkyi5vj'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'moagzke8o2cc30tslcd3erk54x7d0uffwv1mx6ni3lilh0mro2g450wmbqp1uipc47hgaoawduz348a1ywjojity1pnj6r7wnpkaeytn60gyidgg08jnjuva4gqizwmj8wlv71mxz38j76a99spqijm6ngy7csxxemssol8n9497s9ntpx5ctaxcjuw6vxt92fw4890la7eyt2ciu73bwq628syrrd0vp1d2fn4mr58nk7e3mulw55nbko9mes5xdtu9r3b4oozkte61w75m8vg8ip3zuqll3nr5j8u38554dy7w5q8pnhrlr4byfeyern7mz5lc87gowxidwj7bowoda5m8zwtmj6csp5pr5qryyx9dwu48gei87g5uxasa02pfnicfz2osjpxalboqczmaq0r4oy0o1t7d9xercxkt6qoffjq651umu35a1qi7sn1pd4c18iytgeho9aztov99tjigpha9fcp75fzbsxi3wy5sda9sdidl7vieee7ubxumfk3u2x150ntbb8k9cpbaofq73pf9iom3g7m6fjgy8kmr9db5bj3crgl4d3g0mw5qelb372rmtjlq3suqpk10dm5obhoxmjq8k9y5vkmzjp8xn98vn41tsx8um0k2fcw868mioo83yowygt54k9xgvgqde29ktvfwn60d084jx6r0f01yl7vimc1g2wmk20l5ahq6riaparclvol0tevb2gpwgc2m813p9hlwvvjckxealiv8ircxfjhgwmegxhuxgs3q16ljlps18nnoi7zaxi9gxzn78u75fyzsc60yightzpruxvisrtxlfsztgi0na59e0ozqii8eqw59l12yb2kit9lk9f8d26ppgtfxwiwnpssuwbjcbjob3sgpfiobu8hhw1h972qzjou1ly9ef0qt1ycerbi52uf1b1lfpf2glswr5231zotlo6fs6yn1dwoddx84eg4yxzzgdkbgfo2ajzm6uhqo0bcsa5vlj5h3s7otuf1avzmdqt9v'
    })
    parameterValue: string;
    
    
}
