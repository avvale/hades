import { ApiProperty } from '@nestjs/swagger';

export class ChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '5385dd31-7545-48b2-8578-50479909afa4',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'gjl0zm0nkr5sfp57zlu0wvc8ll6yxmh2tq00sijau8vk78kmufuyv1zsjta2n8oik2x4hsgyojbguscdvl4c5brb3nm7fa5tfg59nk9k1twq5s42lcej8v2jq924jkdqtsl6b9mfx7wvxnp2egx5t72naqrq8hem',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'xuehun9nqcvy4utz69kbjkd7a14etee798n6o33ah82is9r9c1uq3katzxxz6mk9hzc7pgieuuolgvulw6g0b2a0vwflri4nylo4qpoz1nopem1618c8ro1g52javky72kly35veypx4u2fkg3nrdfore24chosj',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '1vt00e94402yjzsjhj6sucn2ikw1mv6ti8cfqgbpautc49y36ccp7cd8qka5tzc3knmr2hvh9z6hjxwv0icj8k7qyb52fq11fnbvpnyybnmtvstwxfpf3hohwj3hylxetxuwhw3hr8zgxn0hrqc0sykyw9afn97b',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '0gdgqztd3ccz5dg9a241irytyqr9umf7bax613xmn52prcac5c9uia43syhir12tkapf9mk2zpt0jszyk40rs97kcbwgy4df2kdqqbdgp5lg1g5n5fs2v1uulg092lq2sq1v7wsayklwdjsvtv0bd3fruybv191a',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'ursva8cxj9okq3pg9741am1j4d3debn88a6elm4oy7ebkxqi3j43i6sb6x4aswzpgax214qc3fvhmrnxsn6f9mfmu00pmq5up3uzkybwmzdvqzqpdfaffe2ly18g6xzrdc4u14iiikvfemo5enxvug6r954qjf91',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'swo4a2bke1yrex3ajtha98k48129w50bazoifh22nnuhqx96v1is5xci611qy4hajztjj6eln0a4jxxheeaqg44cuycnpfxar7o8g8f319n91q2u6vy8fpgdpd9e47ahcea6gqvks1jb6dz45aj3qhdalfrp4chl',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'klcsvnaed6ohnieh5uvrmhok23qm0au4qik39np1jbgegx4v951xjg2pijrd7t458jwsxftw4psbo6tpwp22c4cp345icl1cyu689cm034v2ggp40kafe8v72xwchg257v287phspu6ndkbtdiy3ru7vja330zr5',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'kwc5xyiancqyf4bwxntdv1fw8mgefe1it22f2zvrco4h9x7rpj52vej58w1v',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    adapterType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : 'SENDER',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    direction: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'transportProtocol [input here api field description]',
        example     : '6on6ad73bjwvohbn505dhr3uvvgwo2vehwmxuxkjh66qzpzvz7lsks5ffrnb',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'hxq85h0h3aubq6rmn487ozmnf8uqbhr8vnyrf6xbkyj371rvomcxw9sfrdoa',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : '0nzew2ftb2ip9a9ml040lz3fnav0nigq1gyfjf7m8vlworl3ljhbhlwmlecw2pbjh6w40tlua0cbr6bhzw9r84khzvs3pkx0z08v4pu6qgofv8lwhon73vpw3x9xjwxxt1lsmtc4ymw6v2i0muy7sujyvf1regww',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : '96zu8w2gg1w9yulrojy26ywn0i9nnk3d7bxir2ycno9tgboifngeh8obnhwfi4h2h31t825h69ef3cdbcsplbdflefr5va4vrdmp3swtg6i3np2qiu0m1h9mafo36rzuwczx9hukwv0a3wa03luq5lavobr3c6ynpz4xzgdasfc2oey8xfkf7rflv04o5giakmevck9yd1fcwbdj7iebqpirm7qamszwmux395xyp674zo8airo9up1ob2uua0vahj9y7rui2zhte4g4y070sa9t7he5xjy7qamzozpk9ytmvsh3pw1w22niqez46hy9',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : '2yezevdgsvn4f2v78h1ofhmtjktjt2mrvb08oafkdcoh9aev3frq99fu3cbw',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'pqimq6drr9hqktfhvk3wo78h071crq4xi0xhha46dwv8sxct4gskdkgtiflcivvspj5sriqrpoe77nxjk3g83axjm9uotq9ov34e7x4apyz7ih46gu48w0qpxy5oiu5h3lnyux1d3e6wb3aopuq5snwkcncshnzn',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 8271261774,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'gt8tsza6sx3gmeh5zxy7sgiz095drblbk50cxg91px0mh7js4wxjxuu6x8tcf0glkafpyv7wv2vwudpja1nq3mkn6f5y8jy8nl72f48kfcyk6x3d031ok3q455zrt13w4lz5mtn1bwtz5kfevqyffwxmv6mt8r72r3sx18wxu0gu81igjco8ypkz7v3km6madz1cl0ib52g845royy7sef5421xyfgppy1urjl0a4dvl3qcq5lwm9on8f35lyfe4kogae0fxxzmu1rwchitg30xs5i5wchbf7q6xrwiiykejkl7rm446suln3b1h7f7wzpohoctbu5rtoqmuwh79ffwdz8fh5nbw5r947dlfdczoymflmk9zx3xjak8stm8er3u1abbduq33r9fcmp81o48n7o90jmmm9zvys4adikgwfxpnjf3p59sc24cm8wqeawxox2gu7gpp5uptzrnnzhg87talqwpohq911n8d1hgjw70clhqohuyqy411252ilm4ayabpwkuo5quhf31fj2ggfy7cgps0a97osomyf5qrak1li472bh8hhouzb60spt6rrpxkzfnqk2yka2bo2bk42yb4pbvf3ksiy1wh2y1fvmq6z2xgfnnljot6f35m5pmdkamkbwgbqyevq251htbj3aows68p9aso7awju6cwq6lx3evp1ykni1rkbfszs66fbsgrqw3b130n8jh7qs3nieqa76bhjb94o6x7ag11z8uzcyalr0blnptxr4idrrrxio6kwuds1qf5f7ueukgelz50vfpasr1b2y3vsqmfrplo8088xja1lmn98bxuo2p9126wqke7xa4sxfqf2q9ym9uvmo5qtw2epds12jf0enphufqre41sp0w1sscczz658zwnmkmxa7zydvnj7s06n1zxr23sfe3vwne6vy79u7pz0n7qdjlb5u1m7vfvuo91ybfkqqbtdd7ysqpd77k997sbh8tsr2r1a3v3zcmxu810viexgn2qnc3h72pw',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'worg6tmojtfg74ectvmo3qycsfvnsumbneo7toafvtxs23fnnmg0bu2afzaikvmodebe12idmesenmvqvfgprs4accxm87b0bsaho0f6v18qcacyqhk9kpj27c461b7imowztse71td0t93pxl7mdl7v0alrbevrue26quokfe7see2dt2fljf4uzu0q7dlqwy345zk5v5y64u4bweix2ui0irfs1kbp5lo6d0rernz0hpw3gm5eh8djbqq3afimhbnt7ojn4b3k8bhj2laitwewi15kc0yt96v94oejvhedkham044t59avad4xc0mhhylly6bhxpoe8l5k0zh1oafu3ol2wcmtgfn974yfj26onr0dgsasy2r2s25o4rv472w6n6qgvd8balg6ubef51jrqy9lnhv22ldmx2btkb7ffb1oel01921e5mjytoor6as46e1tyk4f712nu28nsqq5w4dbdcotc4iecom63jss18mmpzibmq72weqp1wrqyautz7brkme87iof1odjr41dhxvc4ijruck1my1yjdyani1v2zobfvrme3y0nmjplxjdfxxc3d639ywseg6bj7zlst1qqsm3itgxa9owehcfqbzj8usobyfmoxybzltpw2j6b45io7xuar0tltdie4olvx25s8pxtuee4ohfk5wn8w066jlfdmopmcaqx69hfj9789yn3ghr4d2km6l7nrexrr3q97b9txardad4g13wgzegxect5jeh2do9do36hihg2dh2odack9mzcf3lsqwf3rqfmjmd1ja84b2c71obwzyb4h6ug6nl8hnhbiux3f80qfivcuwmz9ba2mc581lmo9t1zlw77dz5jbmqyxtkoyq0auc2gxv2e0200whbzcxayaexoxm5pofo94my1dko7ptxhwy6tabboin0fkk4szuyd6wxacx30l9vwdhsaio5ar88mn9gxdsspq7j4sxjtc550c984r5mk7tzk4opyakgbjhfbogjgjoodsld',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : '8qpk77kha4ezizz1xi2hxe07leqrdee8j6jjepj6d5dycbejy2hypvtjj4hc',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 8599606733,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'bot9q6dbp3tx21ikyj8fgv13ex9xm9x616jayw1uhcdcdogcygf0eybo32xt2ng3fzeg54xdsxye46l0e69lt46cram9milp4a4gaal8d2kkgdyvv2egtgrbspv7ve1hoob4xbxja50c78vtf95xha2zhssewohj',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    destination: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterStatus [input here api field description]',
        example     : 'ACTIVE',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    adapterStatus: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'softwareComponentName [input here api field description]',
        example     : '4f98imb24nhtv2iv7zody2esfp3kh124puxf69x9xquj4uyk0svijm8fjynd56wau8mdju4e4ub201vybf1tnzampzvo46dc5gfb8zfv623adg4q1kdx36fc4gir5z5kgfdjo73gh5pz2zvinghmmrmxvbijd0vb',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'vzuiwodtnsuehef49u28',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'fprwg01kg9sz9bli261v',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-06 22:01:59',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-07 02:26:04',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-07 07:49:47',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-06 15:26:44',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    deletedAt: string;
    
    
}
