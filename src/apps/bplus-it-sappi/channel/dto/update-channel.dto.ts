import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '3a8e29d6-9844-4a64-a555-c2f31e8dd07a'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'qoy2dnvkhdn3wh93ocv696mot5nkq6vm7jm1o92w6ishm2wqe7'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'q134qv46tyilhfo4wb0g9hutxvjwtd27fifu9jh5qtl1nwluhnttzpofabtunh3s40l76340yqra1flkshhoz9bcu6uefgb4ihltjcaxi8llkluhwmxviwidopzj4svwtaxll3gopsrxy9i07le65ksdl47ytvwj'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'sg444zzubyt7o9hto79lpzoy20c7m3jba4hhhoocgeco9gosydm6c11k0jzbonx4xkglcxt606qeemlrd325xq8obzwjlyirtrjcpfzl0ituy6dormpce84blozdg6t1jkit515rva62jogqkvcyrjqhmmsmo9q6'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'b5matlyw91fja8c8nmbz9c6i2640qdfvjtdlknngcqco5c30nbxfyjjal02iy5ts2e5kswgnpwvddhaabozjvxspjak4gp6xhze1mala6usyo8wxyca7nrxmw9ys6p2iefw1cuxxmlfakmr4v41udax9nbmzxuwm'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '0fbf68b7-c9c5-4334-8024-cc56490e0298'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'n00vfhfxryrcg9nw2b1csvc32a44ngczhgxsztbfusc5umc5q8jkds9uv4880ky2a6vewaduw9qbdm9dnxlee9hpra64xkl9673t4ymkglirn0wx2z8zamv1polwu2b8z9yjwg01458cx0d7uysziv1fm27kewic'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'ngwfzr64h11tiba5u3sv1tu23x9kcyk619nkblu60j3hufxycpghyactoh8zdf41tds4cfw5b9ahc3rx3efvmgkuhpz91fhaovyjwjej8v2fojuhy7r9w8srnj2p5y5di9hlmo40z4wx0c7g60ol1cam4ss8ipjj'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'bzowwb8z4khxavahajw00ruxh3y20eockoozee96grq2yqr7e01qpt7pik8na09al782q5g9bpkr9i6o529iab0cp3gehyzjt0l5u0qhoak0ef0603i5o1luujzai745t7q2hxjbpsrkljw0260qtmmeodhfcvor'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'dmh7pz4znxm4ohzwmgqhxll348ohrkmlqy5f2r877nqeoy4ry9ljfwb4j3haln9cobs2lsc7i46mhllnyhimm0ue7v4epiu81jheh4uxmrlqjc3r7sj33w00b6hbi6svqbnj7vyyw6w7l8c7arw1esymcivw99m0'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'ifb8gg1pnrekyooste87qot2s01a44lyxlpmavkx315ht38mz5ay5576uw00'
    })
    adapterType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : 'SENDER',
        enum        : ['SENDER','RECEIVER']
    })
    direction: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'transportProtocol [input here api field description]',
        example     : 'cg1mc6v2it60p56y5k57ksjiesl9myj13a5j6665lq40s3czhchnox879z6t'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'kowuh4x3vq0u0t8kvwhsjh8ge5z0zf6evetl9mipmor938yl1go7zr0aal3b'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'pf9khpcy3o53n9b3xoth8ajjvd1awzgur3cowumzlpfgsy4kn532qr9pegsslp7mmlcb2jexltp4o14h2bqaxgtbd2f27azbtucbsfd3phlj8go6ujxeyzhxlqtgqhm8hm8r1goj1t2mmv5idmrklt37fh9r7x1a'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'oqgink0211ex9xoftcbt7mapxm4z7zb102uhbd60xbry7wkqr8ke19ulx5f7es7kr8viuyhvvp1jagdnolk5vkv9pkxp7n63h2nyquajs5o8yc95jw9wdlaov6fgmmugtma5p1ebxievk3uixgz8gd8vlskdde4htviy5958px5drcnvrb1z1mogp8pqmqt01ss34our3mt44y1hhm6xh5r911t6g98mf34pywae0ec6s1yr0pr98o4ynz1x57n32e6nfanbqi99f8v0wm6aqgu1uxp40wt3hghk43aur9x7g639nx53axp6ybwjf2vu'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'oumik5zpiei2g9otzgfz3pmf0ly7iuh17pjf7ui05q5sb1eada6mh6l0ha13'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : '9i3d1rlcx166umklvl6bqvosrn11zch1im7k1c335orev1l851f05ybsn5sdmfp92hl3ekv9i1nuec4myeip6sm9kb3ti9s89pw47s2blzxo728k3ynqzhbbftmxx4hq5gp6mpffv5v8uekahbuch1urxyfrsx71'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 2352306194
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'q7ybkwqq6igo5jxk6qei8zu7j7765s45sc5qt3xlumias34u96y5hze71ul6m88t6a3f7zgz049vcvoxnrigty7k38dfz32p6rfw38p1pjidooj8g0kfhy7o9318ulxd4lutdkbf29sjyca4is9mexatf7b9ec0vpfteuhscdz8nd5c1zv928eubky8mgz26eo38e0n9vgwamuj8hos7ialyj2wp1wcdllqkpyhyt726qvq3za4ebwpf2y3cahly8v0hl7l25fhn5fqso3rk1mlb0d87ky5ngmqsg3zqdmx2aq62z8yj097cbz61qk1xn648hvi8sgmo5g2ekqu9sn7o03jp76br2svwb4jje3kokendd2tmuxdp2kc0svrkgnxctvx697w7rh1gvbggd2iqdqpp72s8dczugde5bu23if1rzr7rx23lj985cukbinrshvy5be0an8fvj0bzibohj8kicxw9ciqek3gxa0cwth8nr2i212gma6bc8oovlysjhp04yt3ua7d1c2k24g65qyx1hea9n59ulnzee7u4zjdcn5xv8yov45q8vzt9z2fkd7na26atfh5y7sdwf77c5mr9k0879hubhcqewvnfz81168ign044donx6tllcf0xz59md9qpvczzt781lo2bbgbk4m16o1vm2nwsigsth61i9a97255tyz436ntuv7uu2szuavhdpop4dmakcvakhd7rghel3vwpal32ah2eeth0qea2kxtr2j5i9wbe3ce8hep2dmufn2atc0mhv2z0tj2grasbl9vjwb4sa939wsqw5wxam0hpfd8a1omr70d915vkiv89pspdul6k1dxbuzzejhcus4mpf74jjl4x0wu0b3cmxaap7tqj3zd1ra6g63zq7lqfdwuyqxcdei1khfu5ao523ltmcxovhf8om81e4a73njj85rc940ct58k0o76jq6tzcik20qjtmhb673wixlanyz8ggw6qbiroqppgmrm4q8oktbjswa0j'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'amrtpcnij8grbd2zl5a5whd3d7ar0thgaop3wt28ppgoj7kqecyzlhsbl70y4qls289q1c2n4lsqtez5tu9hvssrz0editdmmp870l8k0a0m6xo9lurv7dyejnpgmoihxgzyo7bktu05up8anpzp7qpnw5154js7c9x15csb22icznilptwbfkvtktckmlpq8r07ioe79gu9nk9ulgi7dpatejew3qf12vrxceuqyyzrr3iw6pd5bxc5fsurskjn1k543r5nyaiceywclhptksot0jpkqze59sp65xgx8uplfi4tyysvakoxz6rpre7sz6ap1eu64wfmgpsiksxvhwpwe8kumm3yww0yzrx804nlosqw2ps2mv22blcrad1jpw1pslevsobzzjoz8eqfg65nne7kmz98n0w345lgtjwu005047wwanx6ivhldeg0urtyg4hi1avfgak5tlxbwdzjif4o7mhaghqa0s3inpd6bfrz3bq52i4t4kj9t8uvvvbrakx7e40my2q1p0zygzp4ds5yefdl4y7bj3y0kgggvmp6ztyq5hiqigjb1l9cdto15fuloy10pu89rodqcl69w14qupk3v70ivuqu4620gtyfigu2x7ydwyf669ccdy7l4jf1rm43ia8vdpgo4w8ojmfnwqextbcnrxz5d9sl6afz3z4ctaz67vvvw9nkl3fmhuk8aoggytic7f6vabbbbie89y9b01no0m6ligvmcfkwvlfniot4nml37wa3tm4f5xp54b15bw9j9dzre6jv8iorg13cff5cc5zozehyucpi4lw4au9zzauzpk1lqadws9vw51cr4jslixnlrz9m90ixc4z441yrl2jx8n6qo8xglk0w3yj4lwqib3sv952s6uabhvb5ays44xd08rkpsqrmzbbd4mpjtw6ijmcn59404k90fwd261dyrf6sfj8d00rriqj6pf7ssgj6erejk0mim8w51jz9i6mhzgu5o6zvaywui57syqmasz6y'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : '0uthpgkygdvzps9xs8sigqnw4il059iix8u8nrpzetkf1fjxpk7nggla1bii'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 5633430381
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'cl27qj435ez7ta4ecl8biqb86b1t7ug49z2d3gydb32r9ag1px0rmpcghmvhaycoy02ci7ufuuk9vpqzms6x1l2ndf0uyusqmx7lbx8zh7ma912t4t4qt3egqiknf6pghqx3wfyz94zx9qxy9rmfrr1wdihwtrg1'
    })
    destination: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterStatus [input here api field description]',
        example     : 'ACTIVE',
        enum        : ['ACTIVE','INACTIVE']
    })
    adapterStatus: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'softwareComponentName [input here api field description]',
        example     : 'dg9wtbn8kqgs98222l0vvl0ic9gfv1wecplstexizc7kunmmy9xtevn6cy6zwm6ubpi4am1obd43bujlxdv6gpck11h1qw8zhy30w92z0ruw0uzhzul4mj95wjlzu8msunbh65yfxmugll7cfus4qvxk4jqyruw8'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : '12jqri75y3nqn92hr1d1'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'e20jdgqjvvb3a8v79vmh'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-23 21:41:24'
    })
    lastChangedAt: string;
    
    
}
