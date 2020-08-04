import { ApiProperty } from '@nestjs/swagger';

export class ModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '64300cea-782f-453b-a5c7-256772586f85'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '797027ff-6f70-46aa-bdea-41ed9d6b3696'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'o65wdt6wfc7amg9mwt6z34hoknvkx8xuroyirpe7uvy8cwmgai'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '3321c9dc-3c88-448a-b48e-887da60ba47c'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'qj0arixbwp0uq8hshg7f'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '6bfae48e-37b6-4b4d-9f12-3fa7349e7a05'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'guh9k7u8peovjbifjrb98rghwceodxuyj7zlhj4nja3dnjv5lfp9vvpdvsxr83q9v0rkfp971xpyme0bgw4yq0e4p81q1kiz82f1rr1s0y9sh3odknnegu4yzyv3qr46tb95x12h8b86zy95fupld964vhetnrx6'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : '5jkinjn3uncrfmc25bujcn6i2fdf5j0pq778vyihaoos2mq80i1mkgsjr1ftrytcuvapi4g25umtrv8zvo2ohkr2pnjosxew8w12peln8lfrk7unznu8v71ixcah2q5s0ojnh6ps31mjvggfipdfcbdkuj0xdiop'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : '2elk8rmx9n0uuyedxjp92gxeq9j22lyw2nk1o28uynts7dwr9wqz72h1qbed9f81ysn3kr20qv113z0fybq89mssxjnr8ldvb5s3zw4nkqznkkvhvtpp2l91xqf61rjbi3oh1rdd80bpqzrvakc3nviz0vxrziw5'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'rjvxvvnuzbq7neiln96k722gs9xxx9sdajl47x7v'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '1qoay4no0iecj85wgb74s1oz5oeercjy2c9tjirv9bbsjjjw100pn3fxorlddlughehado3gjgnatk9gwjslikom26dtjduboucsqw29ybbofvfnntg1447aoqn8ooktv22ho2bntmfsurqobozcm06zaebdq61o'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'kqxintjut2849kpmo2ci51f4tl4rqegsfbd42yds8i9xtdq28nuym1rmp00uviobwv6c3mswl3aisogppllwd375betnat11qgae219jzuz7mg4pyemt88kh1e4kfb32hb1ylgyiqbigp4nw5keapm15l6ohz3b3'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'kbb2gyb4qgl7b223i2nwr7t68vgarcrao4be9krydwye3gzne9yid62rg29o5ajneas6d1os02zwevji5fevs5vdc6cjvo4watz504vm745fr4hm92f3aqp5b8mkhvnta5h818a90lejc8p7vpf5mi1b7gxvau9a'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'cicon1l9149i0cvx18f5typzo594ubys8x8bwew72f2dmzpct6tn0mdxip8oft71twbu1ssx7w6afb8m7uemgxaaefdr70ev71eni2uuv1nubngyyhq6t46ld3horcfcoiucgr7xu2r11ze4hv00ztcfhz3gehla'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '0p1zzgy9gl12cy3y4csr'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'osr5etcvpkr964jezkgfxsxil5ohua0goowenmk33htndnthaqypbbfk5a9dn3xgtbg8railc1gbc96siwx18v5q0hg92dx6c3c7inv5ydeiha1h442i0aw9ljnxnbdigwiedf0e6b4dx66tgjimznfz7xoc17x5iz4x55tkah3397abn8o5jaymr4yw2m2pfpit4kmw4hsrl37146z85975rpvc68fqhsxcnfq5kni912w268ecr1o2jgz1b70'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'gupqta9x73py089oxnpq8xqshr4q87a7olbnbwfz6o1yn8xzmmte0voinadu1ov0wczenud2pfi2lkkiinyxfmge9e7sr9z4blvde67txn9orbejehdf7rqx2hi50iebhzjratcnh5gea05r77qvd1qkl6lnznonp3785mwolhfi27ulpnq5d356qp2j0jgxx6f7taz0ij9lqg3scrujwbmb5gahgqvyqqcfyl5ltknyd3muvvpki9hcxkcljwluw7jbggrfyz71xq5iqtnme4w3v0zr1axaywgvyrt1enbw000bsmo4ftpgzynw2v3c'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'zhxpg0kpdvnrgujgfn9x1q4bnaact8egadtqrrwpbzfof874uvil8uwx5188gy4h2oz8yhqum8j4lxy1wqxxpaxcas9hpksrh3bawczxgsjlywmtxh0k21lxm4y4xnzdi1tf6awg2fbcamhno6xjpl2b4h51rdp9t36txvnfbuj8s67wk5vqbs9e6med1ti8qte2xv5yfhpl7py1c25pd2zpm09r0q7m8znstncn6zrbmgi8x6aaqvgdvirpju7t9c62130nky1imi7jwo200bsbvvngym70z8r7ze7z8pnw6ckhelbulyn3xnil9b7m'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : '87ud53s4ejox6e6k9d73t52gjmc2u5id4ub92gzg6d2cx6air7yp3pmdsz6om0857xw0p46488scmhs7beb04s0qde3xba2a9y44l8hgvk8v2tw41kei5mr4pqn7eu9o808tk0ydzojfi4xplvc3zuoqtf8r5o11xe8p7b58pwa8u5ybhrw2dgejm4v2m1boz4vcl1l8skbsjopi83mrpb3rmadsk8ouyli946dy60r3ga46xxo9ynfvrghpl2a1l3uh48zit214lbqg5j6mg4jrycig60rlut6g9kmz98y3n4pqb05zn969fqhcoz0tclrhwn8hipli9ntv1mklkkh4glgg92572i3n40jp2uj7jru2mberl5qg65lqaiz8hw5xpj75rgo72d9k60hp2ecifg561wth5vep6g5g8xploliivuiibok7muxcs26iawyremiph43cockzerhkj5osgcea9qlm7oq1ohki5eqhh1uvvy8xcy6ewzmuagw2nwoa7rzv8pcl4m6usa5267rsem7cmgfpl65uqyfo2ljpfkeg0q7ocu1fkp39cvu34efzdm5psgmixpusugw3ijgfhkvgskl8udsg9hm9po6kthx3eh00nzxx3vg8bq5fk6fxhfr15czblmf55a5lnsxwlwdce6x5kkqa8uojm83x8fmni0aea98lr2aoilrx53frrnu4rl0kmnlq2be2c4x3qzcoygbe9zzd3ifzx1pd1wt2p6veyb3dlxgx9f01iaxws964nlscdc0k30fvjktl8x56mpo9o3dwdfnk9xsvn5mkl6dmo04n35u6zk6gjcgs7skyvj5z39z7kb2828m7gvxsgnwrpx66duvcwgxhji1zety3r1ffop94i0znbi2j5234jb8nq4yeve3diqngywid1vrsfjchnzuq2faekz6l6jpfcyt4ujduvtvryc3084jzgnn9y495grulc2rgurkqy37kfookkd7eoxikez8486fwhea9x8epuidv'
    })
    parameterValue: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-08-03 19:18:51'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-08-04 06:07:29'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-08-04 01:11:25'
    })
    deletedAt: string;
    
    
}
