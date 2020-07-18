import { ApiProperty } from '@nestjs/swagger';

export class ChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '227dd6b3-43f5-46ad-ae48-6b31543f4d7f'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'dad995ab-8a20-44c2-b73a-a37c488191c2'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '9jvsweoj7do1vwnwr4ds0ny6x2m4ae7mphi9fe8grwugrarsc2fqo0cipy8pst0fc4pksr59jdlphx1ggjztcvvngolmvcifddvfywmzuewrbaqyc5zydmdm1igqxj1b2u88h0u6atgp0pihl381vk15pix1zpwn'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'cs40n2xzt1u1bneeelc6y5tmv0atlwsjamfnjil2r233p7m6hhhqv2jvahid7uw6xha3fejjgqlq9gdfag94dttb10fpqq8a7t1ro7g3eddcr7sa0ozdj6xgb85q5570qloh86nznmlcta7xyrhxz4w89ca7s42k'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'b4lb8l9dv0vdepj8hesq8za6805rle7mmz254zyfwsbn41j6zbvpwteg7cjsd6dtrwy8lf3jca2l8bhdxyt345at4kldlgz3kud32m5jdjqjm24qj2okz7de42l3tkodd5e523sw9b6o14h8gsfci8tzqy9q8k9c'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'xx7w9v4og5p1p8sjrho3r4gob976mxxm8yv4zrevrp0ohpv6ooarbky2v38mh5aqos5eyu9uvm5sj7zz4xco407t4o2isz6qv7yevfmn7w2rlaga87sfk12d7a3xe2gaa7aqcdt1kwfnkgt2phgnkvcfbahicbxt'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'v6t687q5uf1ssa56e89026m3s957jkza585jnzmaad4m7ujwd88w5urw2hv1uzfkaf5nkllxrixy73yke5zu325m818c01lp87yuzb0u14e1t89d72hs2r10je6qqhmwbm4yb4vpzsfflt7r5jnmwsjderjr4rpj'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'epx3juigtl1uisrucc7eru2o0y5swedruy4lx9jp36yx38j3ebz23w4b9b0zwwenpjglf3z09iqgv1bgzi8v0f9zaf1yhfdoxcjixxo4qgraft0ltrn4jxp0bsqrhtx15ktuf7rht2wq9q67l84nkauh6c2yzwno'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 't3ewnxr3gtm3a6sqk10k50zxv2q6drfxweqpwp21kc3lcwbnh4v97h3av28xxkx5szwc2wtv2juufhlxvubxt1sv1tamd5kmri5xy3y9o1nx7t9qg9bhrnavae7bi10rfkhivumk24fslljbfceso87zt7v60a9b'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'fjg2dx3c4u2o0tpvu5cda24egw4n023ws2leex8h6572a0ge14n6xwbs5f5s'
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
        example     : 'e72hnle2mnlkz7fmm17dh2utflatyvxtzyvj3edyjueejzpac5thiyd9jax9'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'godzps3ncrr8uwgdqh5hxifuqhrp50p1ldmlgnkdm2nrcwc5d53zk0vcu5kr'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'qjqzjb1ms30bcg0wd8i5fy5yd7a3cion4qnr03jl80i4ncrxtz6jflhghfjw4mu3a1jr3gwi7enecsds5lmfnx9pr7ujk9lehs9x7le478di60ino5hmpdryv61o9up08pkzxgm1mw72sihlvna3s7hukzhfw5se'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'kqcpzh9w1ev7qx6f36srjojiel0s9ol87igmltzlfbqnl7czax3jg7jd7wz3f5ni9pyn7dal96o8iv1yowgr6o5lfbzli54xtn2woc0gri4hci8jhazl62195lsfsgehgnt30qk4xjr8rerwz75g3ox5pu7if102hdapkikbi189p4ijc3mivsi32o4lglaeryz9wqhg92pad145vll7z29gypv7r6dulvaakuwh71h5izp0dllujix79ztdsu76ugu9xcmrsyo7f00u9hi4lvqr1jo0iv2xszmavboc8h55ve5djda4izaak613qinx'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'v7bt1k7r89zu5m5pmp4zo0agkt3u59nrs0pzyfakw35k0iylnsl9txw3krhc'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'qsoglil4vxvpnxjmv51ryvsyiigfrgt1e6b7g31wqbz31xr4esbiwq25nnnczqxhyhegpjfjig1orcmspspwgec2l1nw50puji3z39z9khuw1k3k0xx1ajw1nr9tv0vh5vr959brumh0wkr9fcinp9eb85swu3nm'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 4472622044
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : '2974nebli4j2pnwpy3yantpldifid7l4w5zylj0rto96glm0gaf7cdo5lwswbu04ieesypdzvtu5xn3hs4ksjs8uvtyh4e4jscxsz1b7ro5rmcv1zzz1165mlmq6o8aql4e4233t0adgvd67nm2ijnd34l4164xl66hx8k8cx0l3pwg97a3dinfnu6ib06ui8o60769517bu03biuan9zk49t98v9g2n1pbkzidjv9n10ftxpgdoegzovfidmfs5vfednxg6cujbhwnmxtq6ownmff2a94e0gysw11imco7376xz1jp3c96h8ohf39syos9u9s29dp6vgtksk30s1k0nvahis8zn7tzx8zqswhirudpvxmr30nspmbombnrbdngfc0kqmaficylbxjfs9fmbwtpepsil3djrzv0vtpfuiycclswk2bk7j6msozi9nvqzei531vzpfy4ck865p5jj42jxiwzmbt978jnwmha5j7c6i12pohjik11z20ayqf6g3vgwxxifyukwjrv56pbv4ixae4q49kmik5llkwd15qt1p40b0trr9ekumkrrp59e0scr9f4lpopbtp1b26ryqms7nq4ows7mdwfzvffznczzf2tsm53jy9c1g42e4c5l19ridqs1kmed7m6khays9mst0emv9kdxccxmpyn8ri6krbt8ec53r1j80ufe61x5kxi4k14qkqsu5mv9ak22ft0gy6q9zwwu4g6cvaycgkisi8wv69nhf7cjbm1luuiy50bfrfebbjn0mqtqf6bwe1xc1qxv0leedb4dditlav9go5t9lnn5xogvy4zxwo24i3qk4990ljrk2fwn8ibuv0a1t7yt0g5bioll9p7nrg49by0cdp5dc3umcis48v4evyevvdk753bycgyaw6obkctlylm3x0gd9b3ll5dorrbmf1r7ro4c7pj7m4seq6cgrpjo6j7m5b8i75upmyr3u25g7dnhain8bfltgeg62nhm8nzpohqgva4ievnw'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'xroqtydafs0i6ehkwlqzpv87euo13gu2o0cvzq5z3vmo34yyjm7gec07g30f8omqhrcj55s1sqrdac58lcyvvhmkhjiuc2r997piix3un65ky9t5w7d33s6xn0fwxwii4jyvpl3b46xxd388hajaa3kpjfeew0rmdb2q25r1ekog6dpnuo38788apdhzyq346rpvk0pz86huxikv8xzwue636nrubm4r1b8jcfo1gop8xjay7fwb50t45kik4ghbjxz7ejzfe63y3i89t9tnq8jbz2c30e5cutadjlji8pprium10tfpnbzsv5oqc4gvf2bo4ixhp43daogzo70vnj1gpnai0onj8d98e299h8olkz8h549rwdcmaqbmnv2yrqjg1wf5zu3zs2umt2sr9oxijiigcde506gxlimtaommfpwxot9oak0gg33w72h1vyudu5yo11k9bge7f4v2l78ucx9wqo1d67gxb7at1tt626m9bz1gr6kmip23wpety8tucmo2jbv9zyg9l8oexz00aurta81j5ue7y9gvrssl1n4hrxfqyh9q72d2aakw93h6rnl4szmmceoqpbgvyzoe8ourqpbct3tt18jut1ynqm6913gx3qcawrgeaaoh2f13z0gqi31ih8i2y4ntx25s9k18783dvvch4p02c350efxb6ouv2ywkazlzsqpzr42v6shyx55msbk0db9m9ri2opnvdd4lemj443w9odkx9rybwyjgr2cmq3rnvlncs23gdl1f826sejhx9q1maxh1xngliq8498akv9r0yf8zghxd7s3vxnq94kfjs4vtlu08044jrajr9cmxlgzt5kzyhnppmath5y403fsjyjr574blocaeeo2372fhfj06yvbgnwjpuzg26lzbwkvfoj8qw8kud7ft6e7t5vwym8jzv81mkfg9hrolameaid0g3frsenxwccsos1hzsbs8cx827psz9jiovysmhv7ipfrghrj0w44yy8gbb6nugg64'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : '2ko6f7wauju8pqdb0ux92o8udrik6xh2a86wlflpezdoif66dyoyo6gazr4t'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 7255111005
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'mmq318voi8uhldfgs48lxdh4ygs6dsv5xmrc2ods7ht6rcd83zd83u4buhgdmarmrirmwvpaxphq179vrdzxrzungcge24ui5dztjc64xkc8skbzd2mw0pk6xqeapu4mhi47qf6qz8mzqv5lop5atq21ah35us8i'
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
        example     : 'utzlj4r18pqcv7eb6bs59y4hweixvb0b6ob0jf0ag61wgcdwmfckruy275cx6tmx5ntxt59hftbtrt74tq76ote6fjvsymu9znqhhw7adl1onl1hh142gbtqgmmhi1bdy2tr81j68weiodvr8emcgfdhaz01iway'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : '8jqer1kudbi3yhuiru66'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '11s1l66sq7b1gt8bcf4j'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-18 16:18:53'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-18 15:09:29'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-17 19:13:15'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-18 03:34:51'
    })
    deletedAt: string;
    
    
}
