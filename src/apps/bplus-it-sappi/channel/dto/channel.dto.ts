import { ApiProperty } from '@nestjs/swagger';

export class ChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'a3e2baac-0094-429e-be55-676876505a68'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'mr2y86nf88mev278oq2c10tblkkgjz3istnnrnex'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'aa4097d5-332f-4666-97af-11cfdec00c0b'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'op9mfbellizj04gyt9xms63516owcslbgiq8lct34550gu8zs1'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '8ca98ace-a2ec-490b-b8c5-e4509225f0ca'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'dlmfwgrmpsjk7vzvtrym'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'uuwdija8s26rgmtwzy4j47k1z8gwpovhbymos7tect3o25bg97a2s1jfnn3wrph0fjlh3oltlgw9vnf0f9yvs3tvwm5txvkxsav7a0l93j4cs3w31yxf0s3qxt0v9htwh03xtqe09gegdp1abwbj69rguqt60vrz'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '0o0i1fmi797nwbziseovrmz0iu30tn4wipeckwlrs1suz8hezxvrohn4pqyciq0s5s1w0hzknh5uhg0h8pr42ue1f593r8dpy3f34xspylukg2pbcvm65ra5hyjtql894mbvfmbxcifuj4a3lfxki3xq679pb9zo'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'gecsycbryezgcrst0xbyqofy6zgkdi510fp5678ve6tuwwthlkahj94cs38mdvh23qsa3sw7i8uxr9bwiqp8myfix8yrd89k12ao3wuwvbunmi9dvlbt76z7hh534rs6q8s0yzn2yhfh3rpy4ji5vpwxga9dn2wr'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : 'a1660578-ece6-4348-8974-cc36f4065216'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'yt7q652zbdqjnkq56wgfu1exop8d5jurubbhhv8zv0spo2go9bxd4xbtw3pvr45msyyfr0ryfp0ywnk2xqjvsu23pngv5inmlrruny7188ni92fdb2uofe5aqdm2uubbe4m0lu7tnyve97g7oqgy8jhxefhw18ka'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'zvh3bf23gdqt4ufznzbpnej7bkolxuxpl7kxsbc9h3gjrp9r2a0ykbu93afmkcn4dx4nh7np1x9z1xb54w4fickpy1o0xm09o4nh00s7b1ajurpqvtrwooybsg5tn3d3h6smr5ji7jmpaprhrmgt707ye9q8yb9o'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'f448ic6efpaktd1mqqwx29vdi3gmxfl95c794uyt2fivll6uvsaxp8jx29kjsex1xi9466kp2b6wny9y0l6kxh08ywgyt6jum02hlqt5aayce6t0kanuyh7oq9ej7ph236lfiuezireh87y7vfii6gj7bkhpv96u'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'hb0gfhsuyygg16rzn8jf3pb10bsqt9c4f8yycmi8y19bwl07ttv7zjls9lhipjfqn51t3tcof6mq3mw6w8llb00uzr52dc0kzkr74n153zbcix1n5lx46370q1i1hpa8c5lpl25zu6z8suqyutf0u97uw9jwlzdd'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'w0b39k0q6e6jaeclniod'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : '9ahf694r1krgluyru0b0h770fivkcjlpxs7mdr9hk0p5bydyp1ism1nl0e10'
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
        example     : 'ou0rlupvarg0r4yzuztzfbd1psb93ai4lcse7bluam4ahtzlemd3fq0jtlqa'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : '0fvhv7wszaogvc0wg65pcpzctszmkcl13aj3l7djeadn2k2dc6qoe85hnokj'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 't9z7qi3ex54wb1gqzyq2axltx3quz050bxlash8al2va58a86gw29xp5zod9oh26oew81hr0gzwffto6i3iydgjk6m7ow7zsot6ix2vneqn6tqsycynkyho0ztctozvq5mre67x0m6z30fdsrqr2xskkqx6c7x9z'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : '1zmscpagqocf51s79fy1332f49tmlfqddmi9mw7grlohnlap03bdmhwghz9x0z3ynfh412injk8be41stjj7k975pgr892yeno03nsccs5l4i1yfimh4ojrr4dm0o61vtwwlzo1g8m6lml2z78tnly1kiioafv32b000vgmmccs4x5ikot5mb6nzibsr3mz3t11d3rlaegq03rhym4dzi8jrpv9j2jyv883qrhh4c7hzz9592eccmgkan9bg0osv8d3ace8nu70injv1i2wlbehyfpxgs7qe59ar8hdj9tpd5xyw9h1axs0qn0komuxi'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'ejekgcz7rxsjqlcm1gqtvdliuznu53xski801qeub826ei5s0pdsdu1a81lo'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'to7op3g699d95nk59zzqct3ycckp4qoiyb6k3c0i73yn6p7l2ynch0muq0oz4yw9djnircoi6xhbpcohi0s6j9hsp44oaf28jq0ppbjkv7iyo1gfzr5356frrnwy7zfe29gqv9a1ru5cc536gt8o3wh8xiwjfiid'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 9536340599
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'hgpnp6oxu3wkybcplg38jsyfk7qqebs2q3yfrex0e80gvelwolqoeqtqsq0s68x5z5041agqsyg8oru2c88ejkvf4aiqs5wn947vbq8azczz5i9pet1wl51mav6cfiu1tn83fcgl1tgvrow2t6p6ww52pz5bcg8rh5467yftcnezmx43kiohr2vu8neppbd5ijtsi6rnn5ogqvyduqv3v5cepnw8l2okxk27syhav2p5b06wzwenkupt8fmtndhc3b3e1nt998c35djc16d97id023xqzlrjqi81hoak6jt7kac45va2bofk2so8p1x8fijp9y7ifk7n84opunckv66e3xfhnf0b5nnr2b6ez6m2hxfkhipa9o2wzp5e9qoux2qqm8hdudm5suiltcwjfstheknn63jr8wyfso4zp9afozhw6v0lyfuf4zjf0080c2m77zwjrflt0u45hg8z848x1yagwh3k27pg9vej1vyaqbwd2k0fhdyzki428os9n0r8muksuxubd7eazu0vrrmoqgg8b42x1vre5na38z53mim1uobi1bs6ado3hjwrmgmvhzls94c3eet43vkfbvm9n331oqvreu216wudh0rekqf1s84xf4g9ucds9uo31ci7feniswr72db2rdiqcxbx36enu3bovlsbkzhewkas3grfiv8rcez8f8mpjnjcwozint6d9x0gxx4l079zrzkk9355ezdvw1czkic88hhmborucluk628sg5aslzd2iiufy531p64xt5rbcbwhyikqar4em2gu0q9ol2wimrixq1p6jngcqodpzunmyvslectynrcfhjetz6pfnx679mpjtalrq5c38xk9ondegirfr8b5xj1mrzi6f6tzuzxv8l83kn54l8o8s9xtja13afps3fvtfwsai6svtnl6ymm29ri3dv59w7qbr5g1qurous0gu9dcfkym93shuolvk73je0nplt14ikrfg6bctjc664k4i0w2j9i5dcrdwusn'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'jwcps2mt2mto22l9kxxhzjiud827lij2dz7ukh6qdsla9f1wmn7gyyqp1nj4yealzwqdfs5vkzx1jyiqno2oovgessvdg38h0subxljfj3ucq4pc453j4r37izsudveyu4j1rs3jg8q5rzy2vz8klsl38hxh6wt83rt3p5a8icasd4kr580ea9pmv551hgc91z9k8fmf5cgtpvyzyka7ynslfg1eodpcbeg19zonajl8xdmlrahrfygz1rg1eewnfum4segkx1syoeixn4jrrlquvnv4f35ylhdzj4nh0hdba03wa1rjffxmitzl7djcfbyccansuh9sg54ou7vcvniwld8s2le0l4ew9eoey3vmymqtoe8quenftyko4qk2tt1j9p3fdwni0onwi2utx6evwbeg7qbe9n53um5w5qvt3u1zz2dt1i9keylql0dumfiwst4ccyvb50wnbkrlj7mralwslixjx7uukeu8hbgbp7qv7pi1ml3vbxjdly93x4ino8kt7oarkkbajno433o0ys5wuyk4hxxe05hwyozz10a8ihzi6tw8hfqrwnfse84rl9fxyr19a0h1kaiajslj2s4xli3dw3y0nzu61h2m8fce5sw4jnl5u3rr8fxk606sem11do6o80a4rq6ggyo51943zka36q6yw1248bcjf12ydaoqu2kab3vr6mx4z15kd27w7in9zv2dkd2ri0bjrahsluv1f5govbyl1rz2m75wjz1eyflhgutw7oxpsj14o35u7l085izngbyab501tzxjcihkn860t6hgq53midda0twsotdaqnm73xfxk1dqatxt0q0amcvsltwh9iwvrwgfrz8wz51ws2q3kg9cle6qrk8o2zwgjf0cgd0r9nechv2qo9a1bf1oxnmxc4duuayoosq96v5281sxxm543r4w1j1y1dakqy9ndgatbmiabsn31l2mfc10wdg4qejxmgdgrg4f88tw6ngztostjykbepw2pjagdiuisev8'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'ynjodk6jruguegm63cke0dlmye3jwea9ujsxvcvxtlfnbizl2oh2638a550v'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 4173854103
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'j0rvsw44u7vt30pdlgz34h2dbm3lmk3zyj4xowte6grg3uduvek3yoyc3qe38l1m5vdai9qtadqmc43ivy40hdoxz3r5g6ftlrkxjudqpqz1fm8g2xeg7fqhwmw3ivdu4xdig71qzbxzmwk0daor51ox94ak7i1v'
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
        example     : 'diwg29mia649oesonlguh7ky9fkcqkvwwastvaze22c01l7eah8mi633dkq180zqawsl4xvmc44n8bpjn79ly9bmwp9ntekfvodzwmom71jahqxwzaffq0k3s57091txbazko5bv2m8p096j23qxqk9439angvvx'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'wyu7onni2gbewcfcpive'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '4620ltexjanpk8i35w4e'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-29 07:10:02'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-29 12:48:18'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-28 17:29:44'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-28 23:19:57'
    })
    deletedAt: string;
    
    
}
