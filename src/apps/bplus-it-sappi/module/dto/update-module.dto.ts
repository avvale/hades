import { ApiProperty } from '@nestjs/swagger';

export class UpdateModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '48b60d77-1552-4b86-866b-3ecf0ae50150'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'gcr2hhrjgs55r5v3nk2pv7d5h9vsuuxu6hnaqbpsp8sc95ze70'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '68f61958-4463-4c61-b7de-54cc773f8024'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'wq6h09sxsb4t1pgmneb2'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : 'f40125ee-8415-45fc-b829-51f5671351ce'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'p7ohtxiv2hseno3yet6mnf8g400dsd49zui17jdc3l24cue5a96c38mr8ce9wm2j0cwsmlgh8svhezsjnat2ftod5jy56s8h0q7ej7yu4ojscbwg0q1l8r7xp1po995zdse5suaaevpz1c47qgbjr12h7nzgaxyq'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'qi9fp26rghhl1e2n946g2ux5ajy2bzn8p2qoypybkzqf8s19e3qebm5t1t1d6t17v75malwimq853jnwzjkzmixsiztfsbz7n21uukciacyetgwj7vdgm62tl5kdi8v1ie6ihibf44dtv0x86z2lf7yr4npyxibc'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'ls8tvzwet2jqsjycmtp9uuploa5ibcj8qzr0vjefskfgka8w83zjklms0hnf8xl0nafuz216hl3sn9rze5avguppbw2dth137w1va11km5im7ydlfmtgi6rhsi0r7gug5ca0d64efgazlxlbbnliqbji7yankuie'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : 'f2e6ca50-4789-430b-ab04-e9372a312d72'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'yo1s7vme4dtlz1f71o22bmrdh3oog8wfpt8amnlo0agt8bzlti6xolo2pm18b1jstbuhakteuahmiar4rqdfcelknt741dmmhvk806ohtwt59547ubdmbe2ox0fkvbp4q9b7exnw05wngwjoj014u3wmtr5o3f4f'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'tleb762aa8i7cz8phu9mf6rk68lvv4fa5a5e0kvz8p3fo3qeawd0rqfbiyv7xvt10an7hcbhmiiy594coelumjg5vw183u82tt60dob638v430fwfkbo9sy9mdvlvalfjpcyu8dno9754mlkl45l9h7awvmfrrjf'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'puhstk65i93xjioqor32nea6va3v53gfk9lxas4vg7q1htddlh07na5m14mem83lqj4qudnmj0xqv6glm6g11rq7ebb7kdawb948dsgkmzzqq8ec18nd1x7m79ya3q322k8jx2rgbysehyjqeqjrsj1t0ykhucvb'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'ptw3esf3u5b5tcoqvp13mlthwi39l8z2ajc0dteyrnflj8vwn4r05usa0xkd2eejxbyl92cszpv26yjb2ut1sagmn2n89z0qum7tbd7pitrnw52t87xgkiuhj8pzsws2nqsiy514emm6035xod8me8xqfw489p18'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'jouchd360qfwshq5btuc'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : '2rg109p0fo9tfg8cfvu0gm81mwk1n135pyqiioy1hcfmaj17ywt3v98k8lppasgrzndtwnv3oxw17cv83nx66svkcrbibz5r6155rg91gs7hcipfzqs3e2w9ms1n0s80twnbhhcvsh25ts19uju8bmsfwdmxjq7rnzcm32vnmmr2po91i5boif9odqmiu3l1p2eg6kybv1xt74g5hkm8xnbkxenshg4q7h2irawfjsfh04djyinvfgo1ukfg7ep'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'elc7rd7vnivszn7l0v44kth5vv08lhnbadaor8dmpz18riy1zkap9r8l0wm2kzaw2pmk6pa85li6rjfx9qqssavkl3wci3v7zb1u17mpnfieel4g7yphkjgv8cksk449np6u195dqnqy0y6nr7a5batmogb6uvetwjrs7abz5kk620ba8kxkfkzojgyt5n1bvku1bxx372bl0annv03f515alyojkm0qnhssn24s1iit738v2jxsynd2cu44w0x9f3jktgfwr3ye3kimzmr2afy6i8ywe353jgmsyumuu9q5givfdn5abponjxuxifor'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'fzsabgya722w2mbjbuqc13rjfkjn3kqtn2ivdnr530lypz857l0beyu823vajc01z1duh9pl8bmep37876po4txcm8jornf3ro6uepd64hhpbkdfwgpwx9pbsrd31ko6fatenc2iu7t7nigr0142c4d1v0019q5baifqqjfxu8uju0mgn011mzp2b7e5iw11ygs8u3vyezip0qwb8vrmyh2n7ruuulev8v1t72ex8leagviwgrumddts0jn5olttno3kuwnfm62ryq1ui1h3jcvuofak88bu9sdq6dnxxb1z35ia839bix74bdq70r4e'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : '415k2n2c8jtyj8gqmhid6f3kh1ixpncv46fhx3j750jirj99lcneg83rbav0ev4lazzyndjjof72q9b3okc0p2eexi9ggfbweqm3j5epoyhd00k94u0p4rhpdc2qqf4k32i0689nwwso9rao68uq0g2s3kbiva3y9foatvwu0ghazzmrqthspczotfsxlgt06j3s2kqvewaw6macb6tmzkyratfyf2m97226q0bqnzxuxxgqldrgj59mpgcxx35bh96yf0m88vj7gxj8gkpmzpd8g62twtcfri7871wphqpthogjul7zkfebtso9l4pt6aocvznyrkofqz0llsj05x0myfkgnfqur8ggfr1kohnxkn81rbcxw585w83vr6oazkr1g793wzpulfawl189sa1s762arhrfbmhszpivkwq2umrwlmr43o1gs80vtm9yghvl7dmz7tiybn8ih0zo0skoy1s2aszonr0vvgl768elz659t5908smimg3mbxuwg2u7vcml94fo8a10n1q84wpro243c8i46d68cpsiaev93il2jpm0vguugrg1bx0kfzhgean2ku1ywi9dqhvjxacc9ph40m68kaoi5h0ruprjlub1cxm24vn97ine2naq3p2v6e5qdirg2f8f0sremkomy0pv3eyodmx0krt8cnibfn7fpnevmvewbxwolja3cxpn4mw2mvaxqd86ndlaastfejulmphcomelbqrcus4kqh7o8ev9xnrw1563ro54lwr79cusii5chbmhlipousj3m23kd3518u068x6qldwy60stj6uudio272vz3ti6kfn1mb9ilzw0jq5usal05mmw43q20rhk8w88dmjz9c5b04vcyw3sosl7ihjkzyw6cg2zg5zi8afge94b7ev5ex41ln32qfx67gmmottaf25emn78l8bxl52uyzsmxe0sui36jcct4pxxy1uge4coeoug2jndc94t36rrg6in2p7l8aclj2yie25jhgkr22qd'
    })
    parameterValue: string;
    
    
}
