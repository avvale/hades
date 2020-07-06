import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '2f3308b9-8169-4361-a5b4-8d1a0d57e67c'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'f25f22cd-3121-4c65-9930-f5dea13a6019'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'teq6gxq58883amdax2q694ixv8vxbp6ew9wfdtoep3ucsbzfhk45thvhqjn6q7iafu1wxjyt1g6dyyzzfh9mcwzen6lsgmehv3h0enootrfyofu2a6ioetuwxcq8uf3kluom5rson82tev4t4jtj8z7m30haipu0'
    })
    party: string;
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'ou1d9f5rzwyl73nkxy7uf01vv98l07vvhgwza3k75hyf6h8rwrbu0udny8a1z4qx0cfgdtm247xt0fpcgf3ltsv4h93a0hanjdungsnkdex3da9wa37cr2xpezkhek8eymagm7no7vbh38z3v4gftwqtof82sgqi'
    })
    component: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '7mvcmhgjiw6ltzvdzxmwc2lcv2yu8im40ds6zfe7vni4d0g40g4b95kgf6ihses348rg1x0o12v86abir4ccm1h3ff4ik2758sus37x2qruwq22rkp2uckgxjlj7hlgda1fe09ll9g7ut0d7ersgwhwr0mzk4b79'
    })
    name: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'b6hp6kpiv2gurl1rqq5cmx0tfw9juibyx4b5d0zl26na6trktzewmsmfpn1ofz4mt4amhzqgruzd3y5ofdhh3vujyljdkizno7770dd2gt0vvxjr41kxya2ybji1xjsqdiwr3qwqrhklag22fgc5w4wilpks8oep'
    })
    flowParty: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '4ixfii9nf32a8tcnncezsokn0aw98hyauv343axvaghk4wu7dxvqucsigic8uexblf5m62a3vaeow8g9v1etbwzp1htgrj1uy3mm1wcild8r2r1scaetkliij5vfkwzp4m9t0q8eoglfa4fr7il3igbvfyghosv0'
    })
    flowComponent: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'pwh2yhlne4rua7chufih7wga6bddyaet98hz4icdw3ftqb2es7xhp43ka1yyy1agqy5jmt37419rau1xdtwwfsm3ngivukyiu1w4ca5n19kef0ygdvy0sizmg0p1zur2hrg95ct95zah3s4g5rgp37nkfg8dgabe'
    })
    flowInterfaceName: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '6cljswifzjc9ynvb045s7gxy6cxihvzo8hunsbwqbcfpyuksw0cznodbj2po3svdu1c9hq2pxrbo4jggoqz74ic4nfkqxmgwamc68fu1ozsky1zdx0yggr0lefxoulvik8u0nea2j2tcgqwhgex3uhegz8p24r5v'
    })
    flowInterfaceNamespace: string;
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'hti03l9y6q67jp2dfdvwhpnp58epiujmz9sdur748oktqqmv5n1ot6arlyel'
    })
    adapterType: string;
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : '4ucedoy47h3cdyv046zbxi6h00sktzxzc0memuhvxhym7a9novwnglj09mma'
    })
    direction: string;
    
    @ApiProperty({
        type        : String,
        description : 'transportProtocol [input here api field description]',
        example     : '88tqhitmkj9yx5ngsfwsj3yfnu0piqld9ag6ohmftpxrhz01jd1ixz3zvu6g'
    })
    transportProtocol: string;
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'ypaz6s7c52vv3o9w885i7z3u8h2futpor8kbvv2006gaprhd1pelhq6tl4oj'
    })
    messageProtocol: string;
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'q613y2jg8yfzy330zvpjxl4cxjl7snpvw3nsieu8609bi3cf9gdmoi6nfkcsotygblsv4ezfhr0dna7o2xx1258v5d75j8f8a38jll03aw7xir0sd8gogu8evoh5wbsip5ok0zonerjk30yahnxupvkun9alii4l'
    })
    adapterEngineName: string;
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'vc6gv71zuurvfi2g60f0lnron6kft1nop28cla7s3cgibwxozep3gdia3cq24jli7j0v04ua2y4pfopn1jn134efqvvauklwtz27j2z3t297y5eu9crka1yuptgw8ogbyv2o2pgb84b5x8dkv9cplnps7isi476qcnyvjhefvfeu24zye20pav1nq8kyzdnm5n7dri3jw782tj4bm50kh95lsk2t25p1ga76xlklu4seatwhnmj15nh24mcbiklonygk714vc4to7ggnobrejyp3x3qk1xv4win5aeu7n3hb434hdayffclu1xuxwym1'
    })
    url: string;
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'k4fhym9a1n9vjlo4jz8grxsu3je5e1h56wmprszo243ijbocyje1do42uiuf'
    })
    username: string;
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'amfdqxn1dqtv5b3zyxtkr0i7qk7rwpf7oq41u62p2hboqgwwvx549djgelbjia3g3afgvmu1yecsxwaynlwn9s1c8zuxgxxdsschaw3048lza8wcuqkd3yepzucqxl5kizvnrg24b5c3v0bdrxhb0berinofwy6m'
    })
    remoteHost: string;
    
    @ApiProperty({
        type        : String,
        description : 'remotePort [input here api field description]',
        example     : '816fx7p576mq9f49qi3i'
    })
    remotePort: string;
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 's8pem92n4u5z8pirwgc2n9ughktslvpyrj7nhua1co6hilcmb8g3ury26nxa95e2utyxum56sxx9090eiffrtqe6qkgc97fy1eaqalrcg0kf49ivo0kljt5cfwbrr3662a6uuwqvzbmzlfmoegyoxgcrh672vhnccgyj1492rdk65x4zuc2uoc14a14z73mpjl8smdwcy7sx18lajsfaksp7uk3v4krsgieymjhhrs4tdwcmcwvb189uxf3n2zfapku4xgadu2nvcxvmpm0j43dj8t9phphczqhase3w8x05ljsc1ldl7q1mmtr89wkq6xr7tk8mi1g6z577g4dp2v314mk4cfzoi452dipde2ezjxwgdnjmng6r04fhxg4izoel4l6z365y59k2sa3s4smb26enr8xxnm2ee7xsfcra7x0bv1vc1wb9brkvqis2mhb86qt587b4vxl50h5ucajmognf93pv1isuw6ituddaelli18apzy9ht4htx3eg9dtwlnmy412zomcniauue7flqjveqmvx4gxujsnlex02h6dfie3o1eslnir3t4x51gaw43u5g6ea06nl3ipr2azuafjltcnowq8akt5koctwyumbgz1rjc3ski3dedmwr6tgfiapx4ep7eh6d2ini5awrlh3a9zix04se3bt7w5kzbfkiwsy1l6zbn6s22cnk6yeutkl46ksz2crlqg76rx9n0g72cl1v0hgk9ekelrmayd309hxlpoastqvwnvri7d99egq56deiullylc1sg7nvlntl7590fh63j0bdxn1j1wa5rpk2m63nvcl9kscuo5j7kxgrxi0eg5q8wc0wzojqswpqtiowy778nvcij2ih276un5idfwgpjzcqq60qk39si4sfrtcpizm8wlyo1m82un6j6675dapqqm6odxm9t6tgvfefgva0x6q74y6rbjue0plpqcz9jp6m8s8xj263exuihuxax9erzyi8d7mcdrmcs6x58hyejmp3as'
    })
    directory: string;
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : '30ie93ci3dvtjoiulhezm3btvsmoaaphwkxdc45edtc7m13pg3xtgdh6cmeyq3usijvyrt1jyl5n2sx4cd65cwbov5w2y4n3hnkdsaimlomhm74hkj0yhsy2nkjvaj8hqtln9wk4cwbyz20h8oybfmluky591x7gfodusunflzaku2rk7pio7obu2zayiviq2ff5jb0mzdhtmyslw6jovjp43it0q3v2fx6yp1xemit9wtnyz96h8n6jlmszikaxopj57bhki2w9dxbxc9ikr4d07dhtd5j51xj0fby71jmhjir902od0d1bxgdz7e24wa1p72thaecffmh9foc5zioui8hv1edf00tnp952qn3b31bs8bpvt9mqvmajfpnzhfy2u8kxg12ayhqvs2bw5iwnuo8n4bxo9ktdojk28owhpumm6n8siv3z2rdgtnpllwtkj60z2jxrgik2b7ilnyzent5hb82ygzhdzjnvi3posz1wb5qozst7wmnwwmrn46ausdxud0zho8p0uwa1pdz1luvsry49rw2tbyxfef2aeaua9z4u4f9xf0j43pso81b3xlpjr77ntkkddvvw3amdblwlssdbsf4g5dkye1jh10yz72qrnfgr8u6mkbt19p3xvc5ab9jlr0r1rwkhaxws0n5704rl2sdc6zeex9v3r52uua3r45tovh0maxcwkml40kp6t9jtkbmme619nus1j61gv7limgs8ko7a8sgzwtk74ykvk2o23imm7vzqj33lb1no17ue18tzedhb8nqknjrm775s7pazgedu5wjuc63u48wny1kz6sm7ybgoluerk1pjygucpj4wrq4etodeg95oi4vdi4yc7c4u5ycfffd9jy668c9tt16x8yy1jto1bibne6y1m7xq2hd9ilatrdzg9tjrq2f450sqjdwinygofxuwoqzop45zzcdkmb0btbpuc2cuj1d8wdfe16wehv3hvcrsphot1itt15gxxq600trv2r8s60kpxtu'
    })
    fileSchema: string;
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'hshink6nn5atb1a7embxuqqh73o4vyqueuz66ogjubeex6rp91rriqmkqyw9'
    })
    proxyHost: string;
    
    @ApiProperty({
        type        : String,
        description : 'proxyPort [input here api field description]',
        example     : '1nvxt3uuhwwfssd200z1'
    })
    proxyPort: string;
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'v1f8invparis9q9kq592gse1dshh0g5xntgpu4rg3c6uunjq3xbaadl2pl6ta357w6aat5een3t2zz4es3ick8bknrsbxtglozwm15anst7i7xk155lgml71lc3mt4mtinyjn8hw6sx93akbg45cr4fumm32ted7'
    })
    destination: string;
    
    @ApiProperty({
        type        : String,
        description : 'adapterStatus [input here api field description]',
        example     : 'q0kboi2bwqmxtp9faqst'
    })
    adapterStatus: string;
    
    @ApiProperty({
        type        : String,
        description : 'softwareComponentName [input here api field description]',
        example     : '1m8udr7moaqjaxutd9eviu2mwr6kz1eujjw0fieonpht0kaqr8qcvxmpg7jzjjakn3zuumyxao3j0pf0iitmdwa9mpoe05f519ltzb29ruz817pp84sbx78f0c0h3s4dkdrribepqgnzbn7xt4uu1vs8kml6x7wn'
    })
    softwareComponentName: string;
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'y9i7kkxrsm0br4lxva6w'
    })
    responsibleUserAccountName: string;
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 's78t36odmvtrz0o2x0wv'
    })
    lastChangeUserAccount: string;
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-06 02:30:59'
    })
    lastChangedAt: string;
    
}
