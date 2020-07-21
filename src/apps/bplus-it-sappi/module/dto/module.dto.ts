import { ApiProperty } from '@nestjs/swagger';

export class ModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'e7e8f251-44c8-44b2-a9c2-57c7e9d92d07'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '627f8463-f2ca-4d3e-a58c-9d915d7dc9bf'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '4656ddca-bd05-4403-9f07-e40b3f66d107'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'td714z28vg51szqku8tu'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : 'beeadc23-e9ea-4efb-8641-f0f54437148e'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '6993o1nkt3ixfa3tb4rv2wdnluo1mkkkzgya5jevarslxxnud4n8oo3nnlbtds32lj9yh12nqocyn9l3sdbow3kq1ubay6ior7zm1kttnmczcstsbxes3zirme0gvmmrrzu4ytzq23gaboyo27xhc1saxzvef4sa'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'nwy0nf05m0mselcgioyn0ecgghgfzlkzapo6tqqjpkp4fydnuod3l9wi3udgf1wbelwyyfl9243vyq6bruok21b8rfs4dxom2p7mo5n1ywdxpfieqjmsppz5ekgk93mf350fzlpj0wdq68g6zp5qeytdjm9grtnl'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'lsc8fqw0kkhih0llaaonryq0rvx806lmbrccg3cth9tuhhibtet3zh6h0zst0q7d6syjln8s7hp5rhpcc9vd7ioxjttpwbil1vnh4lk0u06z86erdq22kfjrgb4plxsc2t5dkvd1u0xt06ra55vpr8ivt1pu2840'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'iepmk5x6iyglyv57cvg6gdhg9f95i6k06u8ixif3pfxaikbe7irta0viz9k5sfz0wmqbp3egn37znrmjw3c501raxfedyjdhholzkpvp8rdpymkyl3k8gg2204w8gv6wxphjdi1pzghvp6jn3yhrf58asz99kkye'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'og9xe7y7r00n4jeh71m13m9xvt25v8jguqybcx8j61yhckl76px46yp7d0maijppo5pj3puayb61tmc6oybjn8cevamt8x2l9f8bs7updl2flxwyr1mos68mkgwmnc30178l3ppwy100prj9mrfjybpqe7oxzh3o'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'dad1ey19698jmctnaq00gcdal071m7odpgcipa6drkk212adltkqtoome09pjcgb47uo4kuryc3m9fqpvaaguplwajlqgq3rx6vxdo6nfoee8xu6t6pyhnwygucf4ekufbfckp2c7cm6lbesiqg4aaci6inuu9ry'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'oj21jvgxcnipzbxeb23nxwh2cxm2nzwngz9x2gk7me1e4u486giiblc80fhnwgprxkikrd7gc05lsepcqt6apqbwsotidq5o7q7ls1wsmaqzuhv3qd6c8qz7adbsz7olvti7nduat78bduscyv04slgzabqblw7l'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'o24n1fr9b8eysvxy5sqgec17eud4lcltromhsmr06e3k0jnpbq9epqa546tcvhibob7x63c4loojstqpru1v07glki4vpguv6zoaelj2kwgse2878pxnhr4nzoblcjz29aycrt5t1jjv4czh8a9k71wk15fwijt1bhclzs44junu9ah4o4v20yy1pm21mh1ejj35xqjzkd42m80hl8fakybz8kbqisa7muskj3krrww1br79aqlfyy77063pa2c'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '7v002kp9r9kdb50w91re62i2sh0a25u1bewzst2pkiaowactlo1sjo0a3n4e9yadi3ytro9xudz22k0u0bm84m5dhg95lr9fqncvpy57aqyu1qfucsvd3hkobara8gchfsoym3o045f8tlvxcguo8izmnik3nl8t4bns8pcykmzr4q1e8gfytz4g33lt17ph9d40n76nhh8pd04bebmop5ywai475q0j2nnwpcw6arnv7oc51zdefrj6hsj286axn69ja1c9tlpxfqdrb0qa1l2l6unakcvvi3xtn61vwueg9iap0zq4giwxezssla5a'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : '02vcw16ug9ysglsutoahm6mmkxw26ebrtmq6hmg87uqmqvh490h7a111qonrvcq8n7jzz028wz5ia6kukzgp7a4d3wzf54is6bk2nmlpvq8n1j768cy4e494eak1j28ytcnor9p8e0kvs65qkk2t6hc747ofs0jx63r1zffp0yzyswk3snkyibx7zn5qvush3qm6xyke5q12gdc1ica2qio3whg5mehoumr6k2lnfiske3k1hbk2iqer627vcyqoom1bfx4l7a709flzwpk5svfz7pe314q9g88tzplnll38nen5pjo4rsqycbugu21j'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : '4qvk14rylfc6rtagz5psr4f06ts95eewnpp45sh2xaj9dvrgwaphgoj3qvta0lbeikos1umehuup4wt53dbdjqkoqrybny1e0u4bsirgbao0t2l9yrr8n90az70izy7cmilibaw3ye4rio8cnixunto97nmussrptdxs0jgkw6596raq4g2o37vifchey5pw3ipz1dyig2ygei5aaolz7uble12l1w6b29780bpm3g4ilern20rutb02otzroxiu7tz0anmw0iu4kox75a3ifg0zkco35enr2doyclaky0vqq5cvoyzcp4wwa46n5ublmvlyguhztwuvc1seqspotsm74u0r2rirur0wb1cddx8eufmed191t3rlk7msg65lbpn0ov14g2dsuzrjpy8yn0zf7tad23jqz82ifri2z7mk9r48i8d6kawh77dutme2mfa9zyg6ndt1k1rp5byt1k9og4zb34k13wghbyeys5vvottazl6sajgppslv8ix2zh193xl9gf3d0i6wofjd2ou1ult5eflehdpgmjt8u45ct9bv47ixfefrgjfglujgo3k7fo39i78ntzlskr9aaw5mlsbtrvc42vndn6kjbo7yb27pe6l5se1vllpsie8my67yho9h9ve6haaqv3dkxiv9tv4uiahovb5lhzeexxzh8s5w4hmz3tum808ja9ac24n7bny0lh0q5oxn6zau5plckpc1hqg2ah6rw9q3g5dv3122lkwgiimzsr9g49m39k5d74wg2et9hp8xaqbq5m3iqha560k5onocxcstqtzzlmf6rdv3lr5yagdszuoodd6xi5lolhikxpd7exkqo52t2h6qj6of5sx7jw48dkvmsoc139quc9yry54wv588uk83iv5wk9h5r13t6t63zv4ph4cjhdxj8on11jva0v4gvzyinimvnlbqfznf9xs73qqy6uv4okc3y5qq67ln526x2e21i3q2mcgz8clxwc714bmp6rgcsy2lt1fgrguw'
    })
    parameterValue: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-21 10:29:34'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-21 14:20:16'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-21 10:35:50'
    })
    deletedAt: string;
    
    
}
