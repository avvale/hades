import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '5b0f85d4-de3b-483e-8d47-5943196ac792'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '0ba7dc83-44bc-4eaa-8df7-16acda49c833'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'nq4b7modr4ay05p0i4tbrooyfuasb8te7uihtedt0wvkdjvhkv'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'd84fcfdd-607d-4396-81a1-7d832b23a85c'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '3jhgmn897b7zydhghvbw'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '014xx3d7pp9me8o07jl4jq3fmcvk89487e7ecttkhjeu2819fcntpfubk8szee6f6ilhcsgrqb2yhmlyjca9fwlb8ogez30m0udftqdw0vuck9y7xekwesydmkcgwa4c8r8m70dx0qfzigw5vrjs0q69p40ovzqr'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'olmq2zawcdu1dag3edupkxyrsc4qx4m8jtpo07y5xkllmful5byawj979sh1upqagoxcernoxhx9wroaenstlhcud6pe2uuuu4uam6s4wew5jlc67cyaat188j4a29io16lvnudpcwsk50m7jhel19gjcb4n6h8d'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'ikg5980smf4z1utxj8tk5hwwzfa6p783h9qtpcepbzngwze1vzfm53e3t4rdct78nhu2uszo5nqtm7jp3ktr8u830cgw10ei6c5uspnxbcte1uejv32lhkl1pjhhohhridr7e8eeoxvddv42f616p86o5lj7w8x8'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '9fc4c1ef-349c-4ff4-a507-4caff97516ae'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'yhugpc254pk4d7ol4tkrvocwg4fptf9dxmslsgpd4d1deazai5n1pyk8g2963k4pd5rmsimdw3jah2z9uudubrxk0ywrk3d8tzef0gtl0y5usp0l2gil8500mzfty9x6zdwinv250kwtx6wv4e804rcwhv0f7rn6'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '1987mrj8h1h312c2ldy3g38f20pb66ir8tq7uj81p3muycoki3l9jbpdqqp1wtdbeenz7sjz2zty5upm6h8hdy311kq1mmmsxcvlu8pjla8q5ck100ofm2a06w8x06sfm6zzlgys78sozrcbw65w6mlmfasc6jt9'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '4ajw5xhoa1fhtistzouqd0ope8eszefc562u7dshw3roc9b4jjose9l47o5v7mn7bm4yoiyvmefxcnzvddzk553pfiy5gbz8l86u3ui1eerlspbuas6lfgblip95fmc9x1y0rpgtbedb3z6j526w2bu6gt4ovscc'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'q2bu0792mx192itqmlnlfkzspupwe1jhltfnlvdmk688skojfqr2i5zdbc5q5cr99zay5j43une77hvzpa4a78a61nkxnwq2vg5yca7fj02vke9burnp72uu829ypamzvfwhj04ooroaty904e6ubmt9mfptz775'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '3qknm6elgg06h2xj21f1'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : '545adkhusgclilid1eaejlro2alwjz8jxz346y6p4778fdobrp2xilvsl4lv'
    })
    adapterType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : 'RECEIVER',
        enum        : ['SENDER','RECEIVER']
    })
    direction: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'transportProtocol [input here api field description]',
        example     : 'c4r7amaf7wl6zalas3gi7fiep8fy7476yj1ubajo2ejm9wv0sjjk9z8mwvmp'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'xa0sirbuqxt7ug3ityd2r03logbga2u35u7me381dkmocw9e7822ptpaxb8w'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'qo6j8cmyiwygg38jsnqge1sm1jafvuwhpn2i356hrt6aqdnscj9smr6ruii6sphuehve3l9y5xbp21i6k6npp4xcneirts39e74xrrvhjynpin9i0csvdqufpatp65z0tig4l1zbk165acw1fzsujsopgofq4l6x'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'lb3uupp0abjkt144eej17z3s9dt0cfy0ip7djrtkxd5ig4p73hepbnjxqos8rfpe8sa7sl7pur9q8yi3nzlg0a1m3ronemiay7thnt01jd9xsrebswgiuiemb3y56pae24z3ltniicsdrd0thasn4dh2y00xzfvab6ee32g7uriyvu6sk3k9o3jnzav8uf2rc56hm90rbo53r4sws5jilf1ejzez8gxmw1bs219cyq0uj46wshi0uwc1ha2nkm263u1ji53jg1656l1svi9iyffj0lepgw5kc5pb5ytp3fvhjvskaq592qs2c8p39zsx'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : '476u9bq1aak0uyh9avx81keppp5x392v7dwwap2zsjtt336tdag83s0lfo9a'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : '3lahgrapb4l8d9sbi7h79zo6z7r7k872f2rzg561cude43k7txze8pbgbpakax70nyyi7yoc79ffjmlzxbubxzypd0zv7xja2w1gtfctql0ung4zn4yht7ztmup18pqo1omexp3e8mnhftti8k5tikzk0hhgrpg4'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 6993740407
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'bg2y6u95vv7zve38fbylswmfa51dbduux7m4hy912bc6u3piszvt6e91c4fn4g0sbhq8j040vfe6dvp2nbu52csbboy4ksti1skws11vshs2twsbjwrsuz8ykidkqpupo1lipumiu37nkaj0q4t4c7ocrkz2jngjikd5howycs3hfnbouqnhdnjfoq24vzbv8txguradpc9540iwysky423xc3y1x3i6rimee1v6qmbe40z5l4vvouk5xp8bjbd2rk0ke112os6i4i0d47o2af15x8cu2pvlrhl8srr4ab49gm88s93535x37h53tj5sfk5i9wq0y7l8tl2ie7w18hif3badfvlmlct4sy1atle6zs3fo1xpvl1fmgj598ysqho4uhzca9oudba9ls10wfoir4sfux4lnqp1xmaje96arz6nu448ewmj9yj7fprsrodmvpe8jao58tbspzwpd91fhsi5ee47xb4qx8ye1m89a96giu7qtvdx5xdymaoda1mueb8cue87xzryya8ubyc4ne5hp7h8qm8ef5slgeii6lrm8n4uyudf38gnvvm3edtc6h1ov05mw22ohvyua1fma7e2h5a67qimot0cxjhb1acmy0ijusxa1gqbfc86da1v8898608m5lsawtfvxxiignkbqdxyjiaoo7uxop1j9y81zdz1dfpdk5hhwjffhk8027xum3cxdb1hqqopfipr98e5h1dccertgn621571bg6yaurzw7xig1zuygtvz6g65zm89tg680xmnlysjwke0gi1akrpozqiejg99g7sksbdzbrqkfflu7ru209d37xruss4lxs4hz0q94qdyah1z4ydyxxj00i18dmsxtvakqtzjfvupylssfjbum4u2wolc8ku49ebfx4cmagm5iuc0egygg3fiabnwm0d57yhhxgyp7nzs0z1yqutjwf5kkgsakbewzfi9a289mmpoamj9j3nlkgvqtoh2y89so32hgc15cdrldh8rce1yupt'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : '5zfb00wf0pup3xmf8icd85x5vqfn7fdlgrm1h0jj8wjt7uwhultr8ku9jzwxqo4nuyh9an3g49fcgvytiai1qxnk93e8wiqk8im1d1ihfw3epkeny78hoorns33wm5kx0hat7oh25jxtoceqkk42q4d5mj0g573dtfvtfknj1o1n30m0soris3fwuxumbysq24hkmgpkujv5cbwtp7f2ghl31azm1kyj1687v8ch3tb9rg8hd0q1mpfligtt631tmoadudqvw0s6bqvpx2ykqrqwcn3ildsw65xwr300rm497musnu4g1l7axa86wdd59eot7dx4onoolavoibfcz0zr1ljjn322zxcsyf0yn2tvncwwle0e5vkjxzkrpdmxygwzkrkl0mmqfydwx3mrwu1azejhhx08ro2p19kg8v20hzqvi2fddfsk0c66e4ntv65oipeamarvi34q6fqtb9l37guea5xsfx8weucj428d0ncnnoaesuhub78kp46c2aqfx7p82r9gly0unx8itjyo4hapbd2bu5qbese1zk010zbs8g37yuzo8r7h4avd2id1kr7jbhhv18059kahhbym23jt33xpurbk9jj0soxpmbx8mvx526cek8a38goseqmq4x1gxv22kr00xdckk53hgnr6ufdanbfk2ad84yufgpy7zzilhmt18cg2yiymw0hg0kq1rjo1ertf57kfbpaem51hp5ctnd8s02dpvp7t4jmdz2niy30pnxe1612k4sk29xyck7897ju4ciznv8j0nm7bcs0r97k09y36dkkayv06ip0z77762kfkb90v3krb18jrtg72bn8fj6qrja64pyuigmj1rmp4tjx6rfxddbeiyv8i5eoiiz0d6h42spyjml2qgxuyksr0ywu3031q9t3q5iinunvbhiahh0iqbmy8ttrg5x5dd392y8jhgis8da0k0k5tfracu1jrd467xbg3s9865pu2gttwt9ms3rja5zza850dwcozyjx2'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'vief5x931ay9u93cul8yw21w7ohv1akovpji3bdl4n4bzxy2go5lco9o7fnf'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 8592074086
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'm7jzpc35804o4n782t4q6vwa4r4ofkyzwg6qx3nf1wu51hwxh8zqq7zxyvb4ub9mhb6ljlim8wtr0wulnxxf2a3ne7872lzzlw4f004qcysla3rw7ksck2pncei0ouc2jsyc0mab1gj3f8yw1pnmp52yyxmofb47'
    })
    destination: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterStatus [input here api field description]',
        example     : 'INACTIVE',
        enum        : ['ACTIVE','INACTIVE']
    })
    adapterStatus: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'softwareComponentName [input here api field description]',
        example     : '2oi3idygw8r3otpe75v7rs1wm2n7bukc6tqgi7rm8vxxau0rtp85dwr4172r32601psuw4amsa9g5lrtyz1r7a9xz0khyo3e8kxwofhf2aewouugd1c8ou0fikhnibnye5bcqgbnvl9np0lduut15dnrkt7uubcd'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'ikl4bpdc6ex96pup8urw'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '35e31dqn7435jqcikby5'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-27 16:09:20'
    })
    lastChangedAt: string;
    
    
}
