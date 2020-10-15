import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'f05a1557-8577-464d-94e0-93e3f7d2c056'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : '6r1brvtp73tzz1c16y6z0k64vzlqpeseob8wjc9r'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'lr6n7pkoccroamjrw71z6ii0ac2pvgtisrbuhk5tzqawk9yrtt'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '2qzvvz24bc4puix201vu'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'ii6sqlcxkibaq404cyzfyxuj6lp8wl9tgg4vokku052hdf8huqk5nqmxgs7q80xknrvcilnatayusv6gsyqpaw61xr68gflk0hobcvcpy6haakla4lv7bxcf6l7ahnntpcenbj9tx9lvvcawhckg5horr18ct007'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '15x7tpdx8pidyvour3bz203i6d4xkgvj8295x13p9xfvbfhb9b7p1ml4aauyrm90m0scgj3efn2wj02yshbbl2ycf364hi9roqj45ien4kiljfgfw1ivkugzdgtb99m3l8hur3hvojn0gwnnqhhjbwmjjyybhwnw'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'fdxrcom51b883ycnbft99zh15q7vpdgao3lflci8mdhgcx69bfj4kn7i9b9f4rz1iyfdxa3452yqj132wjdnx72fefa4zom9tufvh0pcw19rjeloa20wyty5kviogwqfzn2q8aqisjch24o0kk7t0uhjicoewpqm'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'mqlgqazzgfvfgbds4do27d0k8isfnqqv41ufxyy6'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'r2yoo8iti01q4xn6w4k7g6liu95yygkt5n7axuakqfvrchli9e20vrazkdh7lqrmqogucd95essb66d6hvowjan1odjxlolemw8nbf5nl26rnvjf9ewskoau383ks2egcnr6wc190j9w2y4x9h3v3ymjdwgbdiqj'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverParty [input here api field description]',
        example     : 'wz6n67ogv4e0lwmtfsctuz7rbhzzj1s47sjoyt75b5u3qw3mhley16agowkb1n481bgyqiqs82r5q3zy92h1heqturgy6zytz5iz2pe8budkyeym1sir7teaapclaujb6twm0o6exzeyoemf50aypobkc1kplbuw'
    })
    flowReceiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'v74d50eq2s0who1osqrrxf1yxxnhf2ygso4b2pavd6t584ygq46w4wnyadowcdnztat1mdfhuz3stl2yxz3jlk2yovgqzeqs0g74hb4g11hnly7c5h204ngy3ynou2q8du86lsiuip187nbd1n5q1bt5jtmdcm9d'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverComponent [input here api field description]',
        example     : 'hkhmz4ah8kdb7uddztayroc1y231lhezzeuwecd96ujrz3ezg7qv4ud9snq8luqh71pw6mgm3zh8fdgtr6g5vw7zydge73uu3xiypy6smqyeyx8m22acqtimctbnxq9eg56perphb3y0124o9pi1h6pv4716psn2'
    })
    flowReceiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'wsa5zyubpe8qcr0wv3rv95jjwj1uutrcj6vlh1kb60hcth4x2kummxfnn3rhn0xibmfove2skyudga8nk6tkspq5cdsoz78o46e0zy1424jw9go3ge46hlgosdfeo5mzamp99okoisw6cobwp5pqvic5yscbcg8b'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '66jjn50c1swcknt4bp6e4lscitsf2odxnuan7ubnl6mftksnw367lobwg0eaxpccwf99dmd9bn9sbofbe1xah79f9neyomid0uydt06rfouxqdc6btjbpsgo3q3d6wvon4xj6fk516ixcted74w8nais00bg7k52'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'xm95swifbadami0dwgk9'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'nwv6hemjag34zuztx3xtox4dxw799h4iu90ajmlc1xf3oldaua6alj49ay96'
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
        example     : 'q24repbh1ne65poi3dkb435chvt8p33iazyf3hkm6s0oc5ic6innwd6lvvxm'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : '0zb65xag826t3js5eh41fneh48h90sw46mauh31zy3fufru0qx95v6e1n8pp'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'bmc3c83h9quww8jfeczqdfajs83ukcjex5tzv5lcrfqn3bvpo2v0wwb31d4ssikfv5wemom9wfmorze1m74q9vc8cnwiy8cw8je9q3m0xpsaoxi4v1aiqdltmam2oppjlq3yn6ucssuynddir2fc29y02q11gfp0'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'zpdiwzw9se78ae2ftm71jai6z9sfgqwa2jbnd64pbenaczpofz41qrgstn0zihzk2nd34d4fgyibz8xch0c29db24dqrz8qkis7yixebufa2l6am637sydfug9xlzzxbfrf8ny5mvaxbeacthx2j1tba3y16jw7fk3k8r4ed8crqrwah11tkz16u8uaumax1n530u2k88zwyszaxj3j5vm0rw770r99hvhcknr2z551jbec8y0yk6z05wqhayc63zja6prrxjmfy28k9gc4iq68k5iv2php5aeplcj8gubmvulx15m2vk20thn9tcvoh'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : '8kysskt131nzx51m4texmkqlij5wfws6elrcqhpxam52qj26cpmtti50bvor'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'brgtq90d8e8k2ybl7u5ytpc01lyfqxgo6jev9ammjgsh60k44zfwtyoi0az9wz62e3rzgnmbm83ajz8us75ljux8ljvozycszemohxcwdzag8n5t3iaicsqkiqjzb6m6jiz5xc8p49wqvl7zrc78cr94fw3nfaw2'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 5145492006
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'f0im9q89z4or0li4dpfgldp1mfyfegpjtevhn3sixl1pkm9vaufuobxt5nffxxojhnoqxz8kpddy8mp7eqfxubmgtjtbtut0kns4gs49f08cwhyzhbnvdmmhlz5p6hthtst0wvn0whc19ei98hofeqsyyi63qjbl80g5p2rq986yaq6y09oejz6tljtsh82mxaduj7zg8c73llssdnawe6fq64my4omxoe6p1em20czkljd7608rq15q6taokdwkjgbga150t0okqxljmbemd6h5f2ws8e56lkzhnb95ir9cyxg1o2jh6zc8hgq48i0e328q1bd3rqy4z42soq6qj9tioujgjp616priqtoaaijk2zpqjupmyees7q9x0f7t8m1w0q8nt7qu2k311fdu9ad9xn64gys4sx8elezfhyctjz1pxjokx9caegvgjln5mt4de0rxs4los6c6vkgyd8dhxr8uxz3d44mbun9h41o73ip1742w0xwygq22crbnjrd5z5rha2vc9jiv8m7b8quyb5hwfiim2bj2eay2hfyc3hyx3lsmj20nriylgapyxfq7y1eka7ly02qlif37u5hxwea0ozdj9o8bnzu4kglsu30di1kfcn680pveet7d46q0vgbosyrwhqgc6cvam13l6u0jcb9crxuxl2wqe35lirim7ttz9xyy06o2k9fwvh8um9gza3wyeuxtkt7haf7o3k2sd174s49qtx3qn02hfin92hqwm8xvdxncoxxc58oepceobboddpta4h1vg3v8rayzzf1u5h976g4759sxw0mp7mq7u32mv5kv3d275awvlxiaey4j1bkb5vf2fm122h7vdbyn6e69r3vvufndzsf4icvidzkgrf4800jle7lj4gt4eq86jrndv2b7neig8lch5rlit37pjwe3m6qbhuk8475xaxnwzogcicthz101qy5mofai3tdzxiss8oizyt72ke8f9q0uyekmrqsi7cm0b58l8swkmskvnif6'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'ev5p5otecqg8uhehp7zsrzrhhxikrlhnov68fh2rlcvu388l12sg5x9duqtblz1wq23ko2idzxct4furjthxnkhyyjh9uo375bvlur6fj94zxnlc7u5bpd8q6ro3fjof9pjbclmulhmyhstw2mawfbthhf0p15igvmgcijt07ateceixejkmy2runf3oxw7uinjy23c65jqgq58q43i0k7h6czk2bcn3qozqu9mcfzbwp12xia2zx8jmr98taf0olgm3f2fel8cgxgu7g8rmrhpmnkpyi6mszz9k6w5m4s8hi5xqra61xqioll2eisnw6t4bvh96w90la1mptcxl7cst0itfaxy58dzlk9cl5ss71fk5jnctqkt49ziltxq2sarxyhq4nqoxo4c3ejurojdrjlxdf5awd2uy4c9l7l68r50mdh58knmq0911kmjn764ipj2epx7jeuwr8bad8knppysz750053ykuhefrz1b0nsiw3kk32txm56potkmxadczk0eg1yi9uzg8bbo4yu07jdrefzj1059z7vh0gdkoyanwamrm3ldr3bprfw5iz28ekmkl89014un2br0ljpr16y41fhx380proboid6c8w40n9af1c2bxwymf99xw9oof7s4w44wt04yqxgjuw7xws9vagu1m7pac820tjp7k1mg9jf423vulxmkn28me6c2palyeeip6ovyvu10kczu9ukioa4thm3i9fh3o71frhmpx04c5dtpaz7dqb34b3a00klhghyq1kqckqd3zd0s1jjihh6tjx5xqn67iqv5ajtmr57ncznbvmtm2iq4uc46813bqto43yzwbfgrxa11lobvxzfukcakwofia64y29jfqympojo90p5l55uiyiyuqvyohz2yiahs8h9dv2xm1efwxhvdvbge5ubkilh461p3w4uwzitxyyq8nru3nv0hn7gnpk4oeaufcqgegkilowvtibpwfqd8fyrrxjolvzwl3439mfg45ujvd11h'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'p2eqo9p6av8t0z6lpmqo4sdcbl8ln12y89t3vb95ayxrfu266prywtyplbsb'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 4736389054
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : '3hd8r3cpqt3a97ruyk3z8xnaoyov4j3xqxfy4vydmnm3afm1nrqvjitvy4r9auzszrfc82xyxdkz83u3ut1pj8mjfxy5a3sbhe1el1wt2jm5g73wmvpwcqik5byqls0055dvhafon9xfh1byw2phlu3t3vblpoba'
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
        example     : 'xe8zy84yr750lna4eo1k0rkvyz9mljku963msqg8llw1ceqdx2usnuxwm0byt2cyw25y50cm4r1835a1h1u3wu3tfk1bihhehvifpfqg1lk57r75oj1mw000fvlece7zzjmzwfa3kdtjuqc0rd1909rg3swkqjjo'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'wqip3cgx23on1jv99nt6'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '8027a72q7mbesbawl9cs'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-10-14 19:16:14'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'riInterfaceName [input here api field description]',
        example     : '46e4gbqfu4q1jaubvck36g3bscbdeibowrv5ehwqhic5155xtojkpb7zimvtlusfl3doous85i9bxd9gpgu734z8jbps65t4gpdhanzdalte1kvkiqi5nhj3c8i1n9yogutcph9fnjfca3psetwvbgn4dc77vd2p'
    })
    riInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'riInterfaceNamespace [input here api field description]',
        example     : '4uz3sjiri0o3vpmvr86nj81wmziyiwc7uk472kcohqs37ocb3bpxvdghjvg23tqmydk6exbysswl8dqt6rl11cj7nqzyuoz5ce8yiv00kh503ut1s0gotv8s44sbhec1lbxzf3cqvno3ugrlhg0jv955j0f24hom'
    })
    riInterfaceNamespace: string;
    
    
}
