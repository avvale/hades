import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '6422895f-91c2-4399-911d-939f1de6d2ef'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : '9e68pbi4l40h4c80bk5kpieg2ny4sv5d5qy3r6zr'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'f0af7963-f115-449b-b2ac-563c70e15043'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'g4sz7y45jsda6g79t7dfdwm7ddkau07cc2hcwl1m2f5rfv8xch'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'f87481ef-348e-4618-81c7-6695caa9a574'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'etz8h6ec7wx8gcb47hdr'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'ov90qpu38x72lad8z0mobrw5w0nrszbp72dft6duim842ithvoa0terxc5luqra8hy1uyh00ehnfpiu8pnr5wlyzw8o5l90b9i8nwn3r8847wgcz821oeuup1gwuv9xivk1l23rv22ut01xdtnji83q2wggazr5m'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 's500yrecesonjb7mh6e9poaxyzcgn0hfz8947z1bgp0skphs4u2ir0z45hseliptmg334z9o5k4gs65ap4bsmqz0dcnhanqozqv0ce5g36yd6o6axlw84omkvg72d48s12hpnv7lsmn1mf6g9trp61u5mvm0k9y0'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'pe6gk40ng9sohc483ygqqx2b3cl8n0ljuyik1ca0ml6wwpy06rmsmm4sdf4nvq6p9wf2yx81cfkwsjzp5vm6nfweuy0pxsmx8rktd409oday8v10rkk1bzgogrj5rtf8g5tl0s7jgcgbio7su5z4s4lqw9cfjbm7'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'jst28h82rnbiu9p4cgjqazgt65nd71b6osg0npyi7whb9fcnhrgsh4v39vzwora6177wetcnzfcn2oq3ld4hrn2apjsnigkcrjgnzecp1rs7cl5nuvrtgbjllvn68lpgja616bteb9s7rxdusfytda2j9ayesdmm'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'agiyu7mhvdq4dwn3cwttz1jawti2t4gj8onmox6xhycf3rplgvojt7b7r9cxsddmmim4g0h33aa8i790zoj2uuqywzhf1m64km8kfaqv1aujrx3t5hugcg5jzbeexifwy8gkxxzto7pef5k8j443nqsvdflcrreb'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'j3qf5cghp4mtpty8x4xcsvpoydf7y2uzx06zrox1tasbre53jsltb3m6uoin05qk9p6mon69h1qeeivuhbbqgnruhz1jlsuk95ujmvnlxr93tdos2bd5q2z6a4er6r8a6v3fkwp07mataykusrlp5ji3z162buap'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 't9c01y4szvnfco80x6eog4h6o7jk5oc1aa4coitk1fz89jzec0umadan1ndgnf9zpwwgbp07bfobglgn7zeqniy7j6qpwm6ume38s7arq3ds9xh91eczbsofzaues5rmfcr8dr4nh9xmp0t8wleg5f52myri3gju'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'wfvvetfdgp1zqqsyyb9v'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'isk7zbi1yrih5spf4x43ji2mm2s99o7u4p8k7ja0sffmpw34mqj6hyd6un7i'
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
        example     : 'ign7um16xisq46lqs91d7ll1tsn0tdmtjrbjcmjtdt4x5hrt81sln9840t90'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'k4fwk0fafmf57e0uk7zpwn5xom5u27po3tifvcmjx2sx584l2v0szbd0m5mj'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : '3qorow2nm3w4n0sgrtuvav09zfuv6j0rcxxvu9ltxwct2pywvy6ghso8leb9kzfvovi29p5ngbunhw5xv86vhsnl76pski1ge71u0o57f3ppogvg8dnylegoi427w2tsx7mmwrv5nw057ad6sjcluzs08ps5cfvd'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'r3e4yy1xedjt68513b4yls1iv5cdcl8op8nojl0rbbi95a7wh0oepsrtyck2kxoxjpx2or61ug9ugefpouu128s9ckvagy7ovfa7mjs7jrid2swpd9m0jfwt0kakmf6x5xi8652gau50dohmgy0mscnb7om1o8zcng8ayr6gtk7cc071si3mz1t0b81mdop4a4tuj7an91cheoai8pwvvwfknc49odcbkcjgq7ggka2eswsietw775k5dndvhhpmfpwirbx2kda6kune2eusgdgxnh8l9ofovcm4wqib2bi4agn7pfyqxucgw71nuof8'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : '2kt4pyc4ivg8zlyjrgblgi4l4bvfb28ph8nguu9p03zpc3sn9bqset4f5ccd'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : '3r54brxx9c0bzt3f0fac0zebox8zgej7fjxj4thovfm69ywvtpdio05oxup8w6e89bbvcr245ec2a4mc9jcqeskiolliaz5tjdgvcmdnj5oi8vp84dhq2ybcm4hw7g4dvnebyl1spjpdsidmny6k3g78gf7hf6na'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 8775107862
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'il29b5tf3thylezboz4jaazb5ymdueb8vunsk1aacuov1xt7qzljgl5hltjci21af879n7o3ownn92akqcgxdck0mlmncpx0fverpyeempx77zua1oilpkf36p0cxu9us9jso9igjbzdalop7umsp1j675vkm3x1oaqv96rs1yolcidyelu2pa7o0dgioa7gxef2wswd6ddrjgh1tqnv2omc8vrtriex1rvl5yod604aqcvpdbacv9gdesm5u4k8bc7owljq8l0sokcmjnmmao84cwesoc8zkgxmr9z5r9gwzya44bop598zkepszeg9t41w4s1w4iedztsnj3xdr93z1gw1svh4vswvgi1s70muljxn5gfw0utrl12p0uxk9s1o7ouk4i0ejgiyy34ll1gz7i9fpkcw7bbm0kij6zqk4g3chum393t6ae8d621cpi0oorqrt9swpubj5h84jdcqor60g23x6esjnh74aooblys5l69lp2omymug5y9fo5lp8t7mcszdgha2u86m68fwobb0cysdkr2z2dac6ipa2osvgs1a4w8god8pqudaj7mh14tb51cjo7z62d922lrtzn4tm1hv7z8ytro0wrnrvaf7eyvc2vz41zmd24nwrtk2id2y1hc6rw3ft2s78g9ts33mb1cl3cygf0ktppc1tnj4h65obf592vld3zn9fsmwdi13ppxvou3984zuuz1i8qwcr5wvgk3kv108l8hkmmjacauy5lacqzqrz3tzb13umorlrnijagl7b6xd3mqxta1xb0t8ge7oxpi6sbrk19z2e6rphzgwd4foy8do4wvdc9bltk91fm061rddwy4s1ebiy422r1ucjcst6rmjcto0iej5bvar5692o51iq69xdgrok3fh0gloujdij8ojwvrdm2e6yodr1r4p92hcj5bcyrs5ecmlqhlrf1vc69jwtv1ypoaqr28kxmmqw1xxbwt57donkcw6fqkowttwcu0781id7fj3skzqumd6'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'ooe4hnllda965tu0wonsojsrlpscwbb61xtga64k3nrxn1nawj4tsomkhau63vgy6rzgseurxh0p4g0barr19z9lpu6qhs5cgx5pggvol9p74mv28lgkztfo2gj0c6qds1g1idcqabl5id43yi66xaok4a35ehyddqb03ppiyoc5doi7bzpuoe5i5ekvc82jqwvn14qzsycnlw5evvvujrq4k8mr4in4chl2u5pcz857a62b85jqoyfa9vwx4vlo8fyf6j4ppqyh4zc21ocecdjupn8t8mby4uybudma7qtanhbqgpl17pbb5to5umee9x8npa217sz1du2horxijpb9q8i4gt0sxoauougiqutzzogmxxmvr4olst52jec46s9km8vx4x25j7x9jfqd04yfxijuf3bpif7hzfcm48w24a0jhixa52qpv3oon1adhuvgu87xr857z8bm2wuv838ebj641c81e8ysqje1rxpqbh1jcxwouw5rd0q2698fbd1c2vqk32siw4qavz8du9msi6748c68ykvjx7dt23yoaly3hqf3z1nwnkv3mvrcvcqdu9xb4p21dhhrorw8b5qtvyfn9ja1p1j3vt6yxn14f5sham2crz1lqnu6tiardub7wydtq497ywse77pwhxs4408j49lam6kbbn8mhsc7b6y7tci7xn1t0wcuqzzu3xth73j7xi21bw3p86pvmr14rd9ahcv2nnm930q7dbcp6vvyhjznzwpbj8enha1ultm7xbyuerhxkq9r8m6m96pc38olnkgigwtrnnvwpe07g6ik7mc12j88e62kqq0rqafimnpu6oo786jspvco24gr660xh0a390bah0ucl8dhuqteayssoewsgxf57eindtmky0ltjlh5jh95cx88zj68qb2s8zlr8kdov6sh28r62qb6akgriloh5ncx1uya7fpkjbqtmw8pt9ypsdo6o5jakcnkf3ac4gxcabrxdvwhd4cmkbdjskyxn6edpuod'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'wudo7yrr67owjx53pngldpgi94cjnsoaut99pqqw1z9ej3bn01x8m85zzuhu'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 1603641662
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'ec3e3y39eip9gnp7lbkz9z9fyq4qd22mub6mps9d7dk4ju4sok25jztu3h50kowt2f9cstxubvbagntq7hi2cospw10rdgwhloobmkwpxjw4njplz9d5rvxeaszjykelcordhbv5hp0kprvm0wvmgmyqr1gdqhwb'
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
        example     : 'k49xn1z1iwcivfryyn1iel9gj4v6jfo4yxqn69s8gcd1iodl1wshayjct040k29vboq4pxuqd5izs8v7cwqw992l14pnz9s9d8gn7v14egcwhp1q5zhkpkq165ww2rhssgyw9k7wsk8rb1a54yc37atxyt9wyo6n'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'r7jxz4wpt6pnogyv34s5'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'p1gasbwlfn1t34oyeks7'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-29 01:53:47'
    })
    lastChangedAt: string;
    
    
}
