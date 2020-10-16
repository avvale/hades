import { ApiProperty } from '@nestjs/swagger';

export class ChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'eeaccdeb-d348-4c26-840c-3ec824b712ef'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'cggq5thfsoi0bgs4y76a1s69ml2a5oebjsosrgx4'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'c2e96b90-3bae-4c59-baf5-751d4363afc9'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '12ovhhhyq2d2v0n2qm84uv41osuwe1pzsirjbduk59y4xviuep'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '36785ee1-b5b0-4748-9062-91654b880438'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'ar7nsjve5cxaj9my70p0'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'tc0lz9mymr14jmp6ol9v6rh7m3g8qpiqepmfdtdtvkqaxfzflywkdd9jgqcbt0d6hekalep3ous7lbnstv28ql967vrp19aym10ucx5mxdqlos1kdwkgxyf3xbpmd5cmflc6thifez1dobvrfmyakvj0f8pzd7el'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'ukwgi7f8ynhukivng3lue9l41rz326izmvpluzwibnsl63b9kls2oc6vr9je3a849ycnkamqnoa6krvuixfe9mh705enheuvvpb81x6ow8nve57m26u32gqsbhhx4lm5blyocnfz53ietehbb4zfm0tf19zrwtfl'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'wxv5jltxa6d5vzgjxi4epdq5fk5fkh9trb2ueahc0q9033o6ddazrfrmlis45ebttkiy87f0o97gaw7rv9xlah0gtzwp5csj3vqgpckgzu8ak2r90l7e79ag7j7r3vbis86p0wzs0nx58o5c1n61027is2uvncej'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'n61nd8dd3gt641ftlvbim62ia90yirzwiyv7adwk'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'uskkt51izsp900338ftnm45bk7dresdavkhlm0xtwy6mec8wmjkqxwv22b0ltcu0am834r2d4w405hjm3l6g5mef3m6kq5jhxkw0cgnac9i5s3yjvery1odbklzwr2013q12l9n1sktndlugvj862xgahcpyednr'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverParty [input here api field description]',
        example     : '26j1hhy9owzshrb9nxxvb9r5bxobnyq3oqo33w6iu6ktetxmams6jpdkrpa349dpk7w71jveswual4nz0gtpukvmbxxhcfrj9d1mk8tgz3eyiol5ayph9qq7pcdqw4roe12qt9l46mmuyhu22ia21vaxuqe54t7u'
    })
    flowReceiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'az208cul5f5rw0b3mxa0vip9tyo1axp91vi2ewgc6dbc2ekoj7xn8z7jordokofk6kbfoqwhm9yq75wcwot2gpwpwmsjfmfb3jwyiy73ib0gmzhgmm9cday5dbx8seahp40xqvhdbr0s62gju4vaqnheyhuu34tm'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverComponent [input here api field description]',
        example     : 'vyft18oohc7svuzb8bmdyik1adc3t5me7dk1klcyw5ac93q5sj57gkd5ybxyr9wl8vvudw4gd5mzzdw77v35lfu4eiajslv8f2vmikbmu12s79epixna8dlp6qkrale1pwu1h8tx0fphek55zq0woyn157cb2kmo'
    })
    flowReceiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '9xd00e1mov35xxzcqh87rtz55kg7xfvkhk9q6k6gws8ijoyssxsr28fcfezr1htm2cs4k688qb2f63sar1h3ge1kbr97wspp8trp56s0xg45rhlg8v4lxon7yibik9xrcxmslqx2tsajet0hw0ldg1qfpalrg699'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'vpvemxvp58qfxu2uq2h0l9p5ajulf4sa6oe2qshcojcch7vdzopd6g94vri5pgirdnwzrvvosf4xo01ktms2xr1tmrj19hnk93962l2iblm0p82nwqlnuqh33kcza5yc300pzngk93zejis47e4jbi07wa2s0okt'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '65g6haqis1vxou62j8zx'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'igvxkeocmolglc6u2m9imvxdg9m6hzqzgfuwqn5k30rrydw3yen28pkf3tsa'
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
        example     : 'jd2mi815hl8zmypzi3gfbseulchynzqwwqt65tessc9dhm97bfox0m1vn3wi'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'ooeihmzc9s1aypri5gm940afy0o8glvo170g8obpawlnn02yfe1iap2gm168'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'd2d6ion31q61v8uanh7n2waf5516f1ug17u6w83ofisesl6dxke54prg3shtzc0e79r8q08n9scjgpqeb7u6adhvo9qtlr49kl6kpoxdmcvrvt2xsksdspw58mox2te4ydwetzqeafu55ey7ebqb1r7ormibz18y'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'mtp5ezupgwq5mhqk6xdnato39rvxhi15qjz8js07oimlurr980po3pco5wfkll7tvg07i8zs3icy0u1wra8ns0fr42zqe1tj9a3del4ra5ksu9o9sfpv8smndh9cbtqqdns984qkoguhlknoyqq89ztxd66dsvvkgwlnjaazb9i8c4bmfwb269uyvefw8wmi18r8csit2am9dj3j9a0yfu07zx80nmy7i8sl1w3qwpzeixenfc8ol2gxoox43at5rxfpy5j8rz734a7cltlfs4nom6mieh0h96rako9jbn987ws78cctwm6wpfbmhavj'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'u22utmdi0950kvyrkoidwl8v4u1gimv1csgev8rsqwmhw2f4ep2l1btyecfd'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : '5f09ewoqzht2pzz2rl3omvyzdfn6hatwm4tzv6jk3ol1hbumf1lpifo2r8z61bsu29kbjm5fynci1iiytobesrbo106lzas5syk8amopu1ijtzdewt15cxuektatax7ge8kyft3tq6jw2o3rvwoa4pzf1ptwnpf8'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 7900202246
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'khggl896k23pqxyamg2maj860w45se7c4vdnjdxacckzztnf97thut7llgi8ewve4ijfatfjr9yiiv6qgdujtnwogq2s929a74xeifbteu3vozs0mdxpkremr2qpyb4goxc9iitva485kno5h7b9fe001bts5ift3jj1nwsc9byeoq39i9s381h6hisp4yev0r1lztednbp946mc0m2dxcu54obeq2mlex5db7k3adbc81lbfz7e57s9hlu41dkxyzcnnnsvcuabv5kckuzbssu4dm32neby5kkz58igi9j9zrjatnbmx0b0z1vbuqdyfwxmg4u8ybypuug9rfipzb9zdrcw5hry8636i7kx1injzyrbumb6ac63rhkbpnwem276zssmk18go57jp64au2g0khqqrwr3uy3z4wnk518jjeura7okfw84xg56ismk1odcclbk8ywkn087x8ootdrt0lfi4j7zdv1bsc2hmdgefg5gmtodgghtzzlymgxj3iaktgb4e2h7xhrv3vpallh7dquoijuoxuhfnwrr5benkiiw2szoy12c17fd4r28wd5epdcemdgnw6sdto6je8snux2ijkmvj82nmnjrtjzntuk65ovsx4vjdcal1ezmgcncvrlof7wrk6rj200j5378ofansj1087ymyhlwotg0rknr20tcf5novyr1vg28xsz41ze6msiedqy3512nyozcelkxmsdopsecgje76kpwc795m9dgqtblb2b4ljcb5og9793mo6g7wzxyajc5l46k42tg4la0it98b5rvrjqfqxnjqyb1cazzip17vou84kc8nlnzz8ygi4kjfmkg0kidv0n57t4dgxpop1lf9wh5qmq393thz5z5d92x8myfwb3msk0djv75vmss81nzuaxr24vhtycqouj3s7cihoy6gk7b253q8ef90hutc5kz515uzijlvo85p49ob9h176u1w3q9l86l9c4fz9nzkz0wds0n2c5hbackn16ub8j6'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : '12407wqb7ftxpb4d9scmx2kxie7mussimzihars0l2rzgsvrtwbwrs2wpmzhpwulcapcnsckvg5ztaa85g0pfmru7cx6x3z66kzm6hgbj11d4j9gplscnzrctxwkytil498yv1v4tgfhouf92zqhy4m5wtv6avd867t1cudo2wzqcdd6223ipt1jzx59hpqll10q62csxhxvwfc35b18c1fqgnj4lzz20j94h7tp4kn18bplqhrsshy76i5kfs9muscinb4jlsklc3kikbwx18j6o1z1aatxv88683h69ttgun5sgszhvi03bng723j18hpdk6ukg6hjngfda3unnx5ezp6k8zgccsrubz7pg3la1vzv3rmhzpqun7szr7damdm23nmw9wlb2oir06lw6ir257l8al1k33372a68slcg7d6prv4nkmmbawty4a0u9ftgk1sbccf0j94ahiw4ozfwgwbwv3l3yoj92cwenaa4ocx1ghbkcz1nv9ckt3ryztv5kovaq3nghz3uumpzmvk9u5tdi5jy918jneuu57j96jsmlbyffsdyrc4k94kvanr1vtnxa99r40hug8fybd8eszsbfmf855qhaw9ucol5nwv1g1yqmihzx9m0r18rgbgacpluvsutb8m185q48aseb6cxsr0tv8lqvez8f1r4zr6555kzvincev6etk0day06h5iahck16ajc4n0a6wrc268ordw32o6zrso0iyalcsg7r96nzlaga4zy40nvq7btm9fk32yjs72orr9hiuie5nycvm0jm1lhy58huozpb6l21oji6zxm6s9xwsmaowzwv2stafe3gxotbautxs69unu2d4gr4serygplalfmre347v4na6wolcxo2v5n83mtb7hl556mxzj2b1mlqrlp8emmsw8mzz9l2srzfure56g93uc66jsyctikvdq8h4vjgnez5wm1e8fveij7mtg8merfnia9kr2tnlv0528f6fcees4xrm3n1kr1hfka'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'a1nng11m4nq2ioeko6px53ggxge9m1p41fujqef2bky9wyz3xy6j04ju5a9c'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 9717206557
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'vra9kgicxeq31n1kfixp68xfh5c04blqygpvkzvtc3j0n29k5ygjwmdc28glkup1o0czepgr2llshjp2cp0zkidxp34yalv32n48riy2b4l2rtt32gnkx3tbncqdkb9vjuf3s760xeo6jigf4wffjun34kr71l6n'
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
        example     : 'cu3oyo4obkvybufh60w6kx32ytix9tjs6c6xtdw2wljtbn9wlkosd4rk62qijtn640ofozoe2gzpzg4k0f8gn2xgom1bhn1ifuvst3j9hv0fr1hi8rnl186t6qskf1a0xkopw7t7qf491bz8k1ytr01t0nn8qxa5'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'tbc90aa2j45ppt2bnirb'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '0xxjhkdsxz0r0y9coq18'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-10-16 11:33:30'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'riInterfaceName [input here api field description]',
        example     : '4g1lgq7u5fkcf1ulpk14lm5oize1annyalhdt4iihsyqcixzvmx20wxmk97zigplkxq27517vi934e2b8k0ttlovi69xc0h21p7o8h95dgvaxjbb69o1cfxutlcjdpsnyyfi24wagw7fivdpvwrf5rmnxu9a5crl'
    })
    riInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'riInterfaceNamespace [input here api field description]',
        example     : 'lh3be5y26ilxp360dqcv2jbhzkcwy51swlkn8g7t8hoq362no334ph18orx5kusx2ui37lihjtbrk579rcwrxdi7z2g6vv3rvwkw2vxdxhkw6fdd5b5o3x6h62hemev5d2urugt3nz6rtw9eud0wg4ciuva8tim8'
    })
    riInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-10-16 03:51:24'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-10-16 22:01:48'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-10-16 09:57:17'
    })
    deletedAt: string;
    
    
}
