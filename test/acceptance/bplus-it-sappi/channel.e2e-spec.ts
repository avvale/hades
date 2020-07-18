import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IChannelRepository } from '@hades/bplus-it-sappi/channel/domain/channel.repository';
import { MockChannelRepository } from '@hades/bplus-it-sappi/channel/infrastructure/mock/mock-channel.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('channel', () => 
{
    let app: INestApplication;
    let repository: MockChannelRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    BplusItSappiModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            dialect: 'mysql',
                            host: 'localhost',
                            port: 3306,
                            username: 'root',
                            password: 'root',
                            database: 'test',
                            synchronize: false,
                            autoLoadModels: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IChannelRepository)
            .useClass(MockChannelRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockChannelRepository>module.get<IChannelRepository>(IChannelRepository);

        await app.init();
    });

    it(`/REST:POST bplus-it-sappi/channel - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: 'speheoi38igo88490zcafh5f4jzw86shzovtp28q0p4pipndnr1meidodcxuczjsuqcp38v6vap1sjpo1f4dbsmu9td4d73blw0o9xeh4nfjmgq7shmzxthejgrowfgx14lhkl8q211ornpziagdzx68lcbxo2h4',
                component: 'evl6wbwm0r094goeedb6safj6vop5lv7c2asnhndtks4lnzvdvgsk8zn59p8mfmuqhuvui19hykj25jj6jz064fztgihvb5mhgjtmo5sb8rgh85w0lye9qnmbap2i5emhacrbwib19pig89hs39a7ay6b4pjm1yv',
                name: '3ouhhb56ep9o3fcw6otq6wpytcveqj6k8x61o8viq0sykefadm89ogtylshl8y4du0j4bp7epez0vutmdx2zkujwg1tefz9lvz6wee3nmwn7s99k33oq3hs5v8ym8btpw028vm9r725t7g8jnldc29ohh3olrpck',
                flowParty: 'y800p0xdkllncaf5ju3f8g5l6aikiiamu7wdd3ca07tek0y09nr8hm966rtf9iwqhrnry1j0w2t528j1fkekpobrjjshh3xzevgjk6bdr24w79rkx3hmagixiqyoeeyt57s794bburrw40jxuilx0k2dwb3cx35n',
                flowComponent: 'qdm4rnoo05mf7uc7awtd4r4dvkcgpogo2azcrci0xthf8qtycmdu9yv3zvt4v7b0cpviljy5p92tqi03b9zj0nct3zgqhjvd4gntb7vd1owv32aw1sfesge6yzg2ou3pkm5ao1tmarzfpcgmj5283t8mup5nfbwt',
                flowInterfaceName: '6yibe96iax2msncxqqyvmcf13i204c9vbsabajxviawjotgieq25crqqn7tuqcqtjkqwxeadpz9zr0t1gs3yf7b9u2b9xdp2wds411md0bxccan7qom6990zazoapdp773p18gu17w0hyr1rwgtjtow4r6sc8jrz',
                flowInterfaceNamespace: 'oj5oxqy5j056ybeq6vxdqsc9alo8l2ppc4fzdr267ks6ljulxu6u1mqp9axo0dxhcx111vlcovwvix026e8sydmslby697x1a0vweh4klrvfr47a6ps2pjoxy4bdvt59kfpur3izxfpflxh1vc2eit3517jfu1be',
                adapterType: 'n1hqkpdxmxabbw2dgygyh8o22soqm6by76ge4c35fh3tu7p22wyfmc7xthj0',
                direction: 'SENDER',
                transportProtocol: '0zlo59ptvgkvoyr2s1u9la3ufj70h6a1rizx59si4ch7gr2mthacwqnfmn0v',
                messageProtocol: 'yqr496mhcevqndrbimmybppisham686uizij0ues4axko2dxjqzp76819y5r',
                adapterEngineName: 'enc4og24jyxze1fdnr4odxbnk2240us7zw106zt4lw9up3u7eq3195724unbll0bl2dotchgxeo7pudm7824ygyhaspqt75njwfamzk5uzn7qcb8f27jjr18ldc2zt3b0u9ydu5esjbgctkd0sb4a7c0nb0eu6cf',
                url: 'bith5jpbdjdcdqwtsr8087ow1lu79d6pjvgtk5bxoord5xx52yo5gn5vwrf8usk0lr3uph83fn2v8j1ov45i9bw88c3p69bq31gyplmhlh4hpupd076fi59dkq7chm589vpoazn25yk056kuhs8lzvzw6bn0ong1lq5s9b8podykqcv3k5150hmhajrybubx7l514nggopmd4isibkzvx31he7pe4p74aewfcsgryrg83snfh8b5m0vap4ld89mttzsduwhsoh2c855pa8e314cwlx0ckldbugfv2z3p0320pem5ns7mrtcedbfmiin7',
                username: 'x5xj54sy1d8u4dsey2xg3d0wro49v59haxl43paosromkbcicfk3yfsi3xzl',
                remoteHost: '6bgcwv8k2olngr5hh9kp5jqmb46ziaclnvewu0ncg84k5btjuqnp9wpy4cvbuswhh94jmu44k56ztf9i121wk07475ak055nwmaw5jps16fty8is139retv1hqggo7xbh6zvsf4irthfa7cl9g7xr6l7wwl05ab0',
                remotePort: 5335067866,
                directory: 'awp6vzcg0340g75fd6vg1sacswk8q1mdtjkz3qq7qowvowcm3vft5xxf0khugyg88hsrlnuafztzbrj61bgbnn4udjgofndsvlyz0487hdvlbq7ll60g29sv5sgkkrpmks2rw5xpovvh0xcmsjv8hdwjwyex8a7g5a8tquxzr6iloecwppa5290ll6cfj5szr3ar9mm7b3v6rqckzn9l2x0ywu2ulsx4gmrhf3038n9hcgf5skebkt7kbldc3b6ek3tz8a6ywbgjj6mn2uustn43xf9qmdrcfkn84tt2l2ijcxo6bpvxamizcwj2dqnj9ce1yepsqas3jwzdzv3mbp8t7nyk6f37rgw3mmfgil6r2orti6b82sg0o6v8809149dsllze8x6sfvcgo7xha7liu0yb3wcaue2ro58bhd2ph95kz14snu6aohl09qoh4yslddhsipwaocuouo154wksnw3d1v4w6ss5ltva3ulsas8io2mj2skh00qnl407k2xq01p6k4cvcoi0uagqkpxe1ckhtc4evubi21gqm2mr1potsmtp4v4ykqnt49aa6aa6jdu148ce1ru5ppxxrddfhmxjyrrcbjzncerx8ahv1g1w09mpxup7y2ktxjne0pth7698kmuhrrfvhqu9riv9eg4qltrkio7qizw1stm9s5dul0c22uy9t4ihq8mklfhbfol22rkglgrd3hww7fcy55e5zrxjvysb2sn83p59o1gqphmz5h0zwxyiapan4w2teiakfvsmykzs8zdki5n74crth71ljtcogklc8b9yxmohmqhe5mebfhj3epvkbwjxdrc1vry9dvwytzp9szwjn2ep8wjn90dier7x0gof4xs0bo36m7v04737fiv7b5p147ivvs7o3gwnw1l7dzcqt2tewhazljndudawvlkzkfh3nxcpsvl2e6ncq1n14jyszl7gj5inlgur9ci7xvae007sioklaylert2exccr5rx72yczcadvl1o77znn',
                fileSchema: 'z9990yrcasjs9em80cympdbjebv8vara5n3cfz2dvzgx2lfzbfatwyfazrlh326xfmbxo95rrq6673wmjcqix0fh4uan4e0gqlj3g56qm4cawl9kfyg471vs5oh4qsgznotrstxixe4qvhljiu0ts3hdp1lytnls1t8sjeryjpijbz5xm1g2ptplz41xcymktw4spr41aghib1viy4frjfvhhg5sixrhmfgpdgnymkzicxdbz0p0e6ww0qotxy9ktkl1vi6cndn2bsxh0v35e1k8akja878vy3al6k9k3ht0gts1hs1qjcn6u0rs9warbliymjhiqjqm9f12hmi43qcq710vruf7v24u3xmmqxpjnwf88r7npfzl5viovtgo6rhlajtrs2fo77sohb92tbypc7gmh5l9yl0krqzofdkclwz6s3duw28scxopahw6uxzujl2209ct34f2p93w84d968a8tcqxm3tkd963fhtj8plswekgo6s21bdc6td2127ifl038bk9dmxc8re4pgvjmdaxj4cx46x1rpjo1b8nz46azh0hpoop2azzycg9bj9syc2tzi8okiu2qj3ebclpdooqzxy92taiiylmp1e8rdlnozngvqw0cpoc5j461k7veq7e7valu6lwp6nvfs8cjnkqk4aq2o7twm9io2ub74yoco77p4ock28d3zxh14h7jyu1obbhifkseq0phqyum1jozhel0dbaxtmwv2mrhbphjee72ifw5pmpj97aeiljxrkq6j9g77vzdk8x4cepj5vw84peitaimy0go992aqd1cjiofoz5zomxqg1q2gwvsrx9e60pu99m1zda7ihvd8id7xqv23fhw7uqqztctxuieamroa9wwlvpy1l091rkmgvp9suvdk8iez5xiaylkzlaqslhav7zd0lhkenuwqwsppzlu2r1eih7v2s3ly5qyj2vo46n4x5irdogr7zdnkm27t0sd0jexxodazm8ccfn8edcub9du2i9g7l7',
                proxyHost: 'x9l3jo5wkciwdsi7vec6fk717yos39oz6dz3latgt5e6wjf6vwxuqlcvkdyf',
                proxyPort: 6810737357,
                destination: 'hnzj38daymqdjt0onokjhbuuwvk11208pbigqup7lmvl6kz4k4jftmt7n7q87sxy93dgwqsxt2qzhy0c48fcnzhnp46k800izxtbvkffgdyxlo60osvjpe3c1u7rs3l68ws1mkj8jio0d6gp4ikwqntreat3nqsx',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'jvzd6uvjn4lm3v1qightu206q1j3xbjhxeei6tg2fbtiuz0sjvar3h5x1hvamhdxipuy0a1g10l9svc4d9i0irpl4vk67c0l55nga1al8df3p7qfcwt4tr1s1npc9jq3e7r9rt1dxemfj9v17o6bk2o7jw5rdwr8',
                responsibleUserAccountName: 'w9rawlv5r7l5tb361z9w',
                lastChangeUserAccount: '5tw8a20unsk6xdjxaphu',
                lastChangedAt: '2020-07-18 11:09:29',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: 'b3lz9r3462z9d981g5y80hnuy9h66c6p15pg9p14eq42wjxoc1mysycjojhvldm2xan142x4zo1dz0sr7u270mxst1kvnp2u4uihymklvnm2z05x3yl34m8hx767g9ldkpnflj5v5mt2kggzig80shavv82dqjuw',
                component: 'wau8qvkrvoiljlg4sm409b8y603g0w45nwevzz2po092cdymoiwkmhxydcqgdb7su0weqzy0x2hxqsrj0hbn9qgpgf0ni06ovdghw04g3z6mp8d2rp4nx4q68jf0xq1bodsstwohqpbortuslxhxd480g2emuj1d',
                name: 'gw1fdwu09te7ws7afelc4lkfd151db8fyl7ur8i6ed0sp1jq1wybchzi2u8126dhac34i77u2uelouwo6zpcz8vlv28cad6y75u67uamgr7hh1ma4sjkt3jp7qri08tkpfupv16eeewjvrdflc5pomv8luaoz4oy',
                flowParty: 'f6pax9id7lx0kqsiskk1cnqttoep5w36smyck82lo2h7ea7w8n1rcz5j3mi9hqsneb3ea3b8rpn6012zk8sfadbtvgb22d33341ykbnlxv1qsg56yfps3jv30mhwu19maat8ziwke24gimwu3twvkths6okjsm9h',
                flowComponent: 'qqpefdjjhmr3ke0cb1zynm6vsx6q2735aa1u6mvwdtgcl9wetybtgly1cgms5e36vyopou3ti5bgw62jozs3j6le7wz5xfn82tb5uqb5quxyfmg7shudhkbypehi2sabi2zltkp71yslc8nv7i8ffkyf14rbcyat',
                flowInterfaceName: 'xnb0xzvchjj07ufc4p2ns21alpg5u1qfm05ihu1tzjifmu6tfaliuu9lqxb48ecjz1kp77y7fbfvrnjbmajskaxekl95oya5b4e1mxs82wnoxjyfwdjcg7c6g5gp9t8zi7zofpgsptddwhivix4w6d5xycvjmw4k',
                flowInterfaceNamespace: '97omfpwei3jff7osm3sb9pauqsuts0jouyq8qfr24pjztmdk7dg38w3in4rv1dxiuxitz8slfcc62gnapucppyuf8bzqwzbcfekckuddfpnpof7b4guouvkg7fryenva9kyknavzdo4a4tzfx0w19ns8mx80ear9',
                adapterType: 'vazlee5ft2jnxp6mxz9hbkq53j1s1gt6ljwqqk3etk2plq5l9zjqitqp20o9',
                direction: 'SENDER',
                transportProtocol: 'bl8kqg0zgdx2tlqcj9kxg44djkm5hm8sssplmwxcdadfjqasab4prfz99ur7',
                messageProtocol: 'vz3gahr82uaf3pcrfruc6lh9hsup4yxaaztn4zov8kjkcp0sqpfe7656h4js',
                adapterEngineName: 'l45dbr3tuv5fduw28igi7v499ejk1wpwkluloebwgl9smz4zl4ko6r20wmmb0wejezane65reg781pxjoxquug4f9qj3l2wnhu3683zed4wh6wc4pj70mmi6bkhkd9gl7xfoim38y1kr398whg9wbncjiytxwppm',
                url: '6j06w93pmpbakiuzs26zypf4k3s0hc2df1zxbf2ycbxid2jf34ihgw00mz4eupt21ctv38mmncje39k79wz348jri2m4dwh9lv9us46ybm0uvjhl3e69uxxcmrdeyr0qpbqf6g44yjrpdob5bjmullnolawqhvwxa8fuvjc8rp5cc62aa2b4ocbrkt3xhz4r2xugl1j4n19jwyb1y1280ixh8vefx8orkpb0gqry1ldjeut2kxz5sag7wquxmo5qx4k5lvw2w4uu0gsqtgciyuxko6nyy2ybehawbaemnttdmpbkjjcn7opl3o3guhlk',
                username: 'wxp7c3kfc2uw41rgxfqoinhrcamwia2id9j1910qjb9gtcx8t8eio6c0g7y7',
                remoteHost: 'ckaxa5un1dwf96rwq4gn47d12snhdgm0nyaklzz9do2q369cb1gnko6ged3c4u2gd71gvncxkqkgkrcn4qssoyrjx4qlbgt2dl6t8avjgtiqwzbgluuid9q2wlrjxjn30vwbdw2zv4fbhsc5t1gckv37cwxj9biq',
                remotePort: 7575313285,
                directory: 'dcvfgvbrt3jb88p0f0hh72bdg5ue6gy54zq9gczfco58v96veh14ug7afpqo1dq25ixmcdvr7y55li5wg5r7c6labseynhkax29fmsryrytwaf14z2bsfemuhziu4eh8vy7suj3taohenu663p9265tamuvipl9qap9k13qmd0pb73jorkrw76cvcmnpl9rdybru4lbwr0i6knr85hnk2jptruaipg84otbjajco7ntn48xg3jt4q7t7s222chavhvvi6j8zqco6fxkfs36wrqk03fwgj8my0s3nkm7h98tm91fagl4834tsf2gwxkp8o925ohd8dd7pigfrkt9x45j48qaki6irq6qgd1uwsfsq99pp6dwrdwfbpzgyoyzexv9veijfg9wh8lyh24mmwwoienv0xp4o66zkt0jzbt52uao3wvzi8hzy4dr2az9d5cu4q2f1jg9dnm23s2b7s5nhfl00ly1dzpr9n498ypha2r708mpt2e3wv770n081lov0vnsxsxynnr6xuqdosf11bjryvfcqf8neupjl5bh6xhqdlglqsiufgfd5kehlrjit2hzpxeii8m9qf9ugpvnybqjn28922d39p8m3gsasj757a4m4bymfxtquiyhbpla3x2wt6ddctu8t8yap9ddxf3tfymwk3b3ym1s39gu0jl5wd7jbtoiydqt9rxuyl6pat5iwza8de65h7rqtm9f80s99euzxwh6rt0yilpdir1z4yqq19hr0bhchht7hkvqocbmwhlebjs0f1nph4l3qvuec7w25mhqj1d5sgxdv5xrtdkzdmrf26lf60wqcd6apudj9a924rnwoer8nqhet1babi6qbneepw4krx0tbwszfqucgsujae1w4t9jixoyqan94cyhj2kzyj1ljr3ryfyd9vc4zllf7mv82bzfy1yfcuzydfl1cic8rb1m2t89oq4yfi4yhi4jytw365uhkqcn2raw4tm5nljni7wu5g270ev58clxdnokusx4k',
                fileSchema: 'gd7xwainhp6fg26g2tt52th9gq1xp91n7q2h0dg9ng7ml9r34dn7kght5nzr1hi3opb406rw2anjraxycwdxi7nq65iafqikqniq468excrekwaf3h8ouzup05vty5eyfle5q7ekj0mjgj6ovnjnht8n1n5hmxx6xo4mp7fqb48ipb0t1qb0kj39mm7dzxuyotf18ib281qfneob8x2xyaqbx3t42x8hzoi9ok6qge7cc65rmybudf5gfvw9cc206z7n1g9pgcwmnby1al7rbshe8t4v0odbt1hwuxqm1rpdpv1t8iq8zyo2o0da9eeop0u57qp88szild1tqg2lx4c7kcnf6zbczvdma0zaveyt756hao68ldnhk8tcbdqpyvq0aga34rbv16boesj8wf00eexno9rpc7gghp52fqe1ftsgxh77xq3ee5jsgvd68mj8bjb7z7txvvzk6m6vqshsr8bn4qc669kxqt27jhgo33zlma5ujc5iidx55y486mu23vl9g4vhetdgi89dd3yqtdspvlks5ms7f8qzfo2pfxj75mn8mrnhtoums033wtjj0uc37zwmuhoeh4gecz9arql968naq1zoj6mi3nu05cdzgguco1hizab8ewc8vrzi8izmndjbikv0iv5vtifefh3f99cb537j0eycwhkzufnuko6nn1hek0gogj0cinute4x472uro3ovc8anfkbu1rcfwzwtwg1p123ebt7w5ft46lt7pmc6g5wnt6u0u6s75vargi1696vid466i3513zvfvr8ap5geny6wubb4rp8eaicjab5mc3q2gxc5r35ntpm31bi56pmfkcdm15cut5bv6tbqju90f0ajax5y15kfjanprtgrxrogo294nnn5li1jnbky5101jm8eakxrxba5se82qmc0209rsd0avrtm7woas62a4tt039ds89jycr26n7j36rs98pxj7x232i5uur3z1wgmh7ivo7ght3042eybmjtj0h3yband',
                proxyHost: 'jm52ftxsrigls2yvesz92e3x5v5pdjt3y9i9uz6mzbpl3qu2rhllimgzg744',
                proxyPort: 5052885833,
                destination: 'xusqnak997uv7obfqmjurguqtjy1xobzeysc27kazirdz2q2s2k6qkbmy1vlq2oyn9mprz4e1x9qi5d3zwxxt2xgb5e9aebpntiido267qsf5x62l3vqe8e7ancv8ksuo995lg2kx6rp05snkg0v0fvo3yse3w8f',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'wgaavu4dfosroml7gwgth7ffj6lj072yytd6gt0j45wkw4sqjdsj7o1oikhvt4ukc20zh485ly3d2iep6ugfkhg0q2nnyz48207w3sdajl2dzw5qn8ecx2t3d5hney9225z2xsqlewro1zikkjn7n1rp8uqpuivi',
                responsibleUserAccountName: 'kdfeg8pw4qko54zol0g1',
                lastChangeUserAccount: 'hfrre5498m3saf11o7g7',
                lastChangedAt: '2020-07-18 10:18:43',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: null,
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: 'ieb0jc16ufccf961roi9bd9mxwlpvc6eae3dku651ta0epuri5s0vz4lk5jh94ttl6wpujvpng75kuaot1htgf5mnbb7iqcpblwmfos1a4krhp5z9sx094amjhfas9gt62oiodulowqdzffo7vcb9jj8lcrw8577',
                component: '7h5tp41k5a7z836xo6jiymgoxprujunknfymgwpx46ohsm2omn7h4qcplu3rw9l6owq1jqf7l9navz1nxsrhod8kjmdteh6whcgfzpvbohr85t37p4skqwhij2emrd0eb83ahtbb1rbigl8uqiqx8s4d7jepkmig',
                name: 'jjznk9kqbxfl57k5z71b5kl2i7ts3bedpjg051atgvttp60axkhe51mcbmvy1kaadao7gci2p46hyn9hg4om1ln18t59gyjj1cbu4a4jpi7bmr6ol65xyf97jzn3adxr5m0nugbmb92skv6qjm21ijqmgbp22zrk',
                flowParty: 'fbdao692teenj6ey7aktyy16trq3lkh73bmwkjppb784h873wdi1c0khkdixbebohlsdv3ou4bsk73f4uela3kr8pvu5uc3h5g7j9nd9x8f69nke89nyj5bd3oivt4xvpqzr28q2k14mtywgumalk394f1ptewqz',
                flowComponent: 'frf93sy1j9hoak7k3zt01vjwtt1jo9yz086zry9i1zfrctpu8t7799y807b8rjjcoeynuxecndaa70fdj5fdb4axvq56qzhp9opt21riox3ezuxm9g47myiwjoen08m668pdtzcoqin7jzhm4nln2mo95u4wtjqh',
                flowInterfaceName: 'usv4th65gf34khwg9c7wjak182la954flyob2hnu2lal4ka4ck6vb0y7cn420e831uplwwuwfeulg73mlzxijadyux75xn0lpzih7xthf01g1zbyil2b4czk02lsqu64akgjcunf24ir5bpi9wrnca73hasempej',
                flowInterfaceNamespace: 'ty3dhz64bvg1xytx75magmwdkry14nx3keq8fh5zh3yxknv2ijhnfr1zp7j68ggdfy2xy0s6z2s5bppa60mn93aq7pttz5dlbdewbjf6ppccyr4mc819sub4c14t6343oiuk8kb9l2jm8k7j671d4w9wcc7illx6',
                adapterType: '8byoirm1pn4b9nzph55a10k9asvmxt6cznrxcrk4z55u6felvzip8i2xi8ri',
                direction: 'RECEIVER',
                transportProtocol: 'u5ifw6ijt1wz9ve0iy361oopit0hmx84ewtvspzbt6ekojopisme3pkr2by2',
                messageProtocol: 'rry72xt3t7mudkgdz248ij51igxfx58ywlf0rvrfuohemqjrbnwzvd1e52rr',
                adapterEngineName: '4nlalwofilv1rqghazoaxvcnz3pw66ivtqlf0r21w680f6eby1gjyg645a3u1ekl9e54b4mt3wlmunul9xqe6tt0ugzsx9xu8yfgorhf1xjjubhjv9x0979hb6gl9xbgk07ax4299kljpx7mtws3insxl8ejt781',
                url: '57zmbpwabqnm3j92gqzit9s1plgpa206i6xphwzrrydzpzh6mulir8nug50g3pb75t6i26sns9rrs448sa9mlgqvvleft42wklc41l15hzeg9cvlew23jb081s6l33rk71dr1wiqenck3cmn5gfy9dtwdxw97grtu5z3crjxbxq6sokhyxlkj5bxnhxn11jqfholl6qjcgqjldn9ati9cf8t3uoarmzcamy2rom9r2x8ozgicw7y8nwh4iflr33t3mi8yj4kv2zgwp2hnii4vsaslbui9zgrik9g8pd989ds0i9r9pehrcn1ddkb83vm',
                username: 't7ta1ft1n8m97cnyfyz5y5rbc0ebaszajwgjmhfmo6p88ggbpouh3ablx3eh',
                remoteHost: 'rr5gcvpesipvo6jbpdeofcrnxqg819m9su739qdez32d2y8q830ktqak87wafsfgincx2v7xeek6y0yuw2d0sb0dvleyh751i7i34aiymt1y5ho57yvbqlumct7ubohhzxvixhi5gbuvl53ym0nhl3nawjrsqmbg',
                remotePort: 4102511734,
                directory: 'a0e0qvo89sdjyinumo3q1nw85bfbaspqxwf0fphku4j59nxsmotdg3bps5o9iwxy8hhwx153ooehibm0fjp1n7xal20qx0n3qngtgmu4n1k077r9cecveik71dgjfwgwijmwifa8huzugf7ydmtgzo95tm3pu80nhwsaa4tekplkm1j8vhara1mwg6cql6y35sv7mf0oklz87s25s5p5m4cyd1xgnq4si0cl3wdq4pzluvzei2jn7ctk9619mk5q5yew5eim04vokc1izc0s2jt43a3gtzic4w7vqk906j8jm9fbyd65g82fn2p671ejppm619x7p4wk98k29s20fksghjk3fqxq96ygxqimlh2hgxnzrffwfxhqibd9asx7okw6u0sv14cf5q5t290amqppkv9jq9f1p846o16qh3utuw4g4ssows4uirnwukivhhb76ukpy7tvd0cswmz18a4hm5bdfl20naspbtmc9j5zxuusz71oz9a269v7pdxn538p5u3bwzr550fuawvbjta4fdn45l942jdbw0n3f6sfx09eegke7xw7r52l2jc89vsua5azwoh7j0dxn98okbh7pbe3r8e2d4o5kx7iyumdm66p08sry1zobw2mvs8truv5b51kzlpbeyka90i0cfjihbq2gnuooepupjtfsevq2u3di1lhhpddipeholqxkii6ocy07s5uixy2mo5o6tkkjhkzoqg6lqki78dvxgp5o4f478w8avyp6256u38qg9aeo0j4st20oo02p8i1ptznrb0bt3b5969ejnxqug0cunhebkomktusrcly2roiffu69080czchuwd346byp4h1q3dv2vvsmp9x1fm21qcapjbxri1lb4pldi7h6scc1054crj6b3yviqdirxcuk40rmp808uogg45dn4721zox96h5e7e3no98h42zi24fcxs5ca4jikf2cspjzr4q7ns8kyvxkeywd49ve0ay4wgrrrlewkhmlbues4yeh8ab',
                fileSchema: 'so491lhu48usvdcxbv272g0svlu9d9yatbrao5c85rht5i1r74zr764cux4a1q5jgh1z6cklbu6bof499ftc8znt1wqdexhuyci62g78lmg83leow8u0euj10avg8r1snndnhiruovug3oeckscjheyz3o1x8ih553jvvjibqhwh2yb5gidatq245egolurqumnp0i4zrulphkkak3qmiup4ayc9qf7l8kzkuxxi94jmdfdgzqtkgiaxbxe5r7xm69nr6eck005xhsw20dch7ylxk7bl5zzcyl9nfkyiibzp8ig77uqwoobc817146q8kpglxf63gae2at2p74tudcvplciwxlwd7pi5cd4sxlqfnvh0up3jixzp7403sv28recbmfcsf12uu0tfttlc32zalhqnghq7zbahlfcxwwu3fkickshs7pc8evcm5zc652j3hsomvizx02rtler0cb2pe2sowbwfmcf42q30w9heoflxkj6vb77vtqtt5snu92hyp575og7jsh49x8sxqp2ncndj4k09m7etxd7hnf7s5gf2e5bm1priifuznfhipd8sss65we3vwcnofxrpuh3oi5r8nqamdq8ejcs4ktit9002o5uvm4ukwhu7iemnq19d0wqa67ilqf3s5eepd4qlz0lolo39911bafrx3zcv5nm6hdhmlofhvwh1wj8dupqa0ajku1ict8l5rr49sqcg2y43z8utlxkbrx6u1yxo28ty0kbulaifv7xt1m6swc6tktu7q6yr5c15jw034oknmn686zo7qtsagqyhp0tk8vtluv7cc9whgxh5w0me2rqsb9h9mf00ccw46z9jjxjepbnztz9gt21inr5s9u46r4fmsga4nde24al3pql1oby3wakenx02y35nj2frwrsn0nzfscdljij68wplxub4f2vmio8wci716k5mfeamgo3ypv61v1ga9vwfp88a5p5npnzbzzgbas16civ0a8364vjjh4tce45jng445cuc',
                proxyHost: 'rkm04zi13o1ovkvzoetr3vl56bohizotdf7qy9qzwitwr7z2p101cdivebex',
                proxyPort: 9015264013,
                destination: 'wai6vmpbygd4ssvvu96rmqnas2mfvl8ej8s67ykn33m99x6w13x8nj38zgyu9i01if7lufa84qd7mgyv4jrnnjlip3hrmbr09fqxqxpyotzr57sxx2gwdpvv196bz3pzjt0t0abeclqq4h82d5tv9j0ds8lx8frj',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'glg6k9f9mwanqj3z6dq2sj7c6jejtkypq5bjd6hbs2gohu84p8f1z9rotnc823awir6ka7j2a9ey8dzf3jwvni4ywbh4boyrqrpvll57w34fbv4hi2px289ni8lu693tzcp6ukd0sa04me1y4p7mqm3hlot1pkb3',
                responsibleUserAccountName: 'f7sb1xkg90420m6ev8ua',
                lastChangeUserAccount: 'is7eh8sfihaj734zejrf',
                lastChangedAt: '2020-07-17 19:21:08',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: 'mnrn15v3zox36g0n16le6ea2sp8y6exp1m2mb1jszjepzgesvcfdc6njajnk301nbvprh3sefl257kvjjtuelcu494fg793tugp7sdt9u8ju4in7oow6ldasft5tjqg9q1e183aa30uec8aiirqb8h1ud3wuag2n',
                component: '0q4cwd1n59j7g38p7meva91i2sh8p7dfxxr9n6erjjwgaxmy1ygqa7270njmkpryqby79hs1fhsqa9pmkdd61jf89sk7vb66kx7p4t92wuzef87o8hs244gdlbkgc77x3de727wpvltematoen2226sqge8s0sya',
                name: 'knk0cm2o4fe70nggf931i1u89qgazper57qnd0qdgt7jyog5n27t6ga4ujhlgq2ax4p7agw1mkzah48vmgz2n0mg0oc85kin2980ubtdsbvz0jrf2wjcrlpsfpffnjyx8fgbbysl6yq1rtzr8doqhmmwzdv8djx9',
                flowParty: 'q2omy0yqgi06rdyjfalfwdbnlfyje76wfrdj0lks9uguzx2vzyrujaha9bbsyafu1ed46gag4sdhntl4vl1z2naunae977gxuubut8pkp0lcxt8i7n07rgxaxm7a131l1jw86yk6qdh2eb4zxjzg1glh026z32ou',
                flowComponent: 'vsqwn0fwhxz9e8sfcl8kdi0iihng3hvlrfh09f4ii57iot8ulag7fajzourestyyx3s3l9jzptrg3wyv91k8tku25p4acptv0chqd8lk3g6s1zmv2y8y0aejnmhshmmu72v0mdy118dsesftebywihvf87kxd0h9',
                flowInterfaceName: 'd6yijh9fh2k3ywpwwiapzu4wozhmsd3g4inxag082ctsk0n5hvh4zhvgqa3hyn9imyllolp6icsx3gdh2ygn7y7rburhrf89z6jgyu2uax6csg0r53ls7efyzpp8lz4xpsrsb5q2ep6mzrtn8a5xes2yu518gf8g',
                flowInterfaceNamespace: '4jqqicb93wg4cwdksmrft8s530r00g5ij4edv8nwvmojv186murapb7ei5vakmpslhnbx7y51xu0826vvemb97zdbmbke90bvucqtai7km7ixc7nmrzbrrctl2jmc0gxxn8vuoj3kkndi0u4hzw0qav6sqlvy4dh',
                adapterType: 'e40kkflobnnkudhez4wvz0ekevemjyzu36blfsnyhwayhg2k6i76wm187fm4',
                direction: 'RECEIVER',
                transportProtocol: '3tqsgw9wvov9bmwj9xh6t8mmavs6mwaaze32du2wgk0n24viovc81a4ymeba',
                messageProtocol: 'dwwxj7rovl5m55usphpciwn41qi4bwdo5l0wmof0khz7d77lxebj8stqw162',
                adapterEngineName: 'xwhp7q0wjgreczz3usa0h4n7ml4o8j5mt6s4g5wsp701v8447z7tds7b5hs26px8tqo570vi1qizx352kkpo60xef6ylrasbxlio0p3n03cruhq1ipdbxleeyfnsqcsqp26rwmexrkh8lrvn03rorpingt1bu5d2',
                url: 'ehxh5o1bb7g9qszkklhwm52n7fd1wqckl926ajydayez39pxja6v9pimt8mj66kle2g13eo6v1fs50yqw28838bu6c57x82jvtbiu5hnxzdt57h0dg6jkoe1nsvzu69u14j8cyrjiu6v4bgihmgexc6zkcb7sljbmeclvnje8sw95vrx9emmbhbjxojodqlh5x6jqii3kziubad2s7883d1u3dt0y5flfbsqnu0ujhp49qmz531wjqmsoxqjamnsmgkx2n47n3mh9upjht0a5es72588s8x4cpalpgl5jne9z9r6nkcjd7nb9kf1ytn5',
                username: '33r5k56j9qdfxdsgtr6wvfhcafk4m2jbbgsvezb5wrdghfalpmsdfqpcead8',
                remoteHost: 'juy47qxhyufj3ax9gmzm55ti98uylwfwyfsbipok8jk8239ymxwaas2oc5tfwi3qe7eypk6f94d7sbmaykjr0xthn4jf0xdb13ah2kjmuoztco1n11zysotbf6svga8lnwusnm3q8vu2e2gniamyb9er5ymib7fq',
                remotePort: 1904963907,
                directory: 'qfataj92rbsf71pomxvexc6e8a89xxs77hsydxd0507e1xhe9l0zoeyfjqbyvws9wscldacbtf7z05x0f3xc55ul8ik6n5aky1nfvxk29t8or87uo178j28er5yizterkl19lkqy5ite0mc2q3h6mfk4gigrnw1m4g7eshv3y63lirmkn29oyicrtnhpj2uykehp3tsuph3u4648w7astssg810eu2r23y9rensh666pzw83io04x04zex6z024ezzz4fx17r0olpg7swi7ldpdk4mw0l1ylaq4c05t9vd33i0sl08xk67tdhrsvi74si7g8jw2bg6otj9f49xh0wpohl8y487e1r0wohfbc1rypc11xfzazyyoqmrm0wi0xrxvljvivo6ekzvd4r7k4vhmuznh4f00lwsyqwaqriwtch08dtojam7a8snz5kgxmd9sobpjqgp9z7ssuxm8haq7zcl6q9pu2os5j97v7486ncstw8ngzlxlhzh29417n56g5u8mqji3w7d20ocdiooecu8a23n3d14k1czt6axc7q3d5ibxgeyqzhnylx1ma5xblsfnprq8ih2xh74tgtob20zjedfdazdhsgtv17gs20l3xw5ywwfer2e6xk7owi4hyeq4p1gvsdv1w0jci4v1sm9abjl9d1m96vfgb20c5nlbr1e6u0zdj9ekx1t1dm6nd1vpi8a9e6b9vo9ngz2fqgzs363ucmgb0dpjy6zv6ajvqffp5lctc6yrlallg1bhv69vg95b1fez5c6kgizovqe3p8sxox7z5xnatj9hb8kqmczb1cekhrsls23lzvvsw5t8s74ns3mm82bi9jlxksqpe80k0kmwas9astwpazfwm94wus1yp9w22hcmbm2vnmv1h8mq9ucp3pbfq8fcov05qacv2jifxiavzpfzk1fietef7uw9ijnwazqczhvrr1t954c48hvo7l6y9j5ukmigupdjp64vyvj19y3vb2el6gkfoieymja33shpq',
                fileSchema: 'gls43bjtcv1vxm9pzkl8vkad91q9gj1718leqii8xw5slxe47rpb76dy3oaqqpsfxua6xa6z1mtjrw15pwf7z0lvsogupt0ext7a4noswmgrsfruhgjiqusz45y4prvs8juvvqrs0o062jvy23b9whodwnbhcn4c1olo1cudvymrjxsineyo7je8p7euom62toiitvzstvfefpw8hsmvmy5v7zf1n7is9u95rxldfeoz3svupwrbnvqpn43scufnpcdami3bv0l4lsuikhxp0z8g9f7w96i9h7kb8zqbr7c845z36ksxl3afy75pr2pf2zt5gtj79a921baysnzbqjhp9vwz2h338lhz6w96mttluu69ow2ry3dkkumqwo9zqb046sfjnlxmaxs63gf3z38ty7wc73hzu900jyzzf40or40msazj86tigf44sqamsx9n7ld0zzelscujiku2ubrdlp4zwx5m6xe0toyfjuclnxhmfdmamhl5nnqodu7wdbww5dn8yce3tfhqbpjb88p1prx2o9fqu5tjh17rdjfgxy18dyulr1pdo7mg4obsl25l9xbmhhk6uqbbau53e59iopqpic7bxq6hw1vt03stx2dnyf0tnlvxu4ovmfnqjjofzmfy1cxldk2cw0dts03f5ju4o8lou4hp2mr0jpcfdxx3hvmcf23xb49418psdz0tmd7mzehjzjo8v4zqb75xvfrd00gaz1o9hzja50w3pn4upx5bx1sp6ac4qyo9gr2c7jl4188umeawpndsu16qx1looqrt6amdkc82aaxu46w9rorm4dns37w33dqgov2la6h9cszdy4ajmn5j48du1fu9ki4ueexzpv9ek784gy7t71ej5ygwnri0hcd58t0yjlodiuvzrpitz7c4hcxtagnhyrhbir5wqlh1ae0eydcqzxy1k8yiv1hhv11zqpya9w8p9g7lqvv6gknf0fk1bt3xr9k4br504c5irb29y1ew4pjvqhvzt4ettz0o',
                proxyHost: 'xyttx2rs4jbzkfbg0p7hfwluq0cgntnpbvl67ap0xf8az12j2n4hg3uxlyfy',
                proxyPort: 7174674425,
                destination: 'cr3o2evnu7anoqxzxf1fedt1bjei5gdfmv2pl3niknf651851h8tymkqf4utt6vw4trtneom1jl9uxqbya9hrs139fspeygd9eu472k807j9j5frepdovl6haefnmw5u16mpvl04mcgu9ov0fs1l1u4zl5vw897s',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'irw4cx70enkrxa28v3h2xjoyeeyswecrklsz8smh1u5jd3pcrtiqgsjdxuyqcgi0cath9vbgn87a7fk4tw16s23gumsts7l0vjdwwvkk5p0z767cry1t323ax8dhk06s3qgxf0ahok8inbdo81go12onsz77zffw',
                responsibleUserAccountName: '65d09k0jkpfhqs1bqezo',
                lastChangeUserAccount: 'zw2pqfk2o2yoz5icioh1',
                lastChangedAt: '2020-07-18 04:58:47',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: null,
                party: 'ewkiqeitz650404dajvhmtpsgsj977gp1m5m9714nixm8joh094fdtfx401c9lvy9ipvphtqxyd62sf6oz9npnxrwerkej4w1d5ksjcyadzb8g9kz4nma38og3byby77emaek358h5o7p4nimwen5l91vkawq436',
                component: 'i0kv1ds68fochqukmjss85k2iggst9hpqa0hwhpycg6phde6ydlkw44uuv9m2oe9r5pe4c794rqaptwl6b3rzcxufynnopz5dxpvolihkmbjtj4ax0p8op0dadxeyxdza2givxpkta6u3tcqqs6gjfxb0w5ynine',
                name: 'qsail2c6isff8nkqtia8de1wmem43j2dszs2cq2dja0fm02s3583lvv8ravj1lykfk88fbflfgnedq4zj4i4a9w4o0c938tlb7pq3ytrqypjrhnxe41qjyr1r08cs6wce79oc5kge7bcnbqvo4b5lv1e6pvxfve3',
                flowParty: 'tyjxugmh9yjks0cseb1q47me710utm2aukww7i7jd1gxjusjk5m54f8slfb2lx2b4s10zib24hz21mkob46v95ogmkz694allbxkz35r293bufak6rpqa9ul68sgclbxo039xpt2wfcabhq7rlabvk0of8oxvav6',
                flowComponent: 'c48ux6vnef8dutq4exnakff5naowcpdkhxe5sjjokywv6xym8vhkky9olh6sp2q0tsdv3mcnfmtmi3m3li2varp99vvt25qf6ujgzjx1keawsrxzfdu4q4hsycqj5awlp45r8hidy0bzdzmit31g05a4afqphmtt',
                flowInterfaceName: '26bfqaiqyg774ahgztly30tkkxbemktyb6snle6crn3n0ylldcsyyzoui8rnw4ea2fbza4karpn9c6b8yff72yewz7p2rbfrj6sqxiwwy0efx5dt24njxmkriiqd4m9b6gbi24uifz717uw3ncdzvfgsenh46hom',
                flowInterfaceNamespace: 'i6go23dwfawpbcz9dtj2480ef5hxnt1330x175pdbyxpgd94bajpw01irngcy4hgeizccxhhn6741uh1o5iqn7tto1dvuitd1wbn6ad0t2kxc2llsuwfqrl9ca3cioklfmr37q9yic1cwy7gx942t5eezb3pefb4',
                adapterType: '83r3q8gdbhum26m8mvtmokf7tsww5m6536ul0x4x3doofltlt9owcfap6nfh',
                direction: 'RECEIVER',
                transportProtocol: 'ffejn93kod14mmziocne0ej61w5fe60i54szq8yh51tkvyk8l7pttev1mfnz',
                messageProtocol: 'nrgi12nnwor3fj5u3xykw9l43viwx9icvbh9winds8w4bvggu7vzcrloifyl',
                adapterEngineName: 'oskmk54i5itj5avx3z34t0lj74968zm5m86tqtpfuft2gi87n46zjpyklz4qc9yo93mw484n6h3f8gr58m4e4pjn1j6f6vyxcwzuuor6nhqc3t8zw9nm7amr0qc2lfq3pm0ko1ldsp8ydyvicr6z2r1htfxj6zec',
                url: '9h6w9ez0lrjgxjllbsl59ixc014nctxslunlswvgmy83jwzewozwg5492llheum42kjsp28cepyp6bjbco0ensxu27uwte940z4nhziv4rs14jyp828xqpyrby5w3sycd6vvlz5uczcq9lob6cs0akpj5eiv0guoepczzzl76oujrbm6qmplgdjbo6hfgihtezn0yxh9prduh5cgcjel3fntfxy2turswd24uj0h0c9eapsf4uxarxmta432kih18gmiga8uu5pse8j2ic3dqw591vcetij23jrrmvw2alb63osw92z4m77od8wximln',
                username: 'yfx9g5o1ipcs6mmr4z44mr80i3iizjsyd94h9vxv3z0m0cjkhz2vj2s8w2x8',
                remoteHost: 'yaqxoft9mvd7wo51az1xhvx3lpvnl8hjtycr9hmtggt8hkxva5ssf3by83ankuokftayehdo4zuujjppbv8giaj6janjfcthlby152bbmpbi52631ka8yf63bf5ntn1jk0yghkk1lqee661ot89yeh8fsk50iphd',
                remotePort: 9735030879,
                directory: '5kfoi20ka7kw68ew1ctqtscbfbti5rh63zpklf75ztne3fjkn3q4mely5nbd5rdabgw4v5a27b39xicvdan8dd1l37iya5hc9xhenbjav4jznmems8d5g9e16x9us225qpsz4u1er8uiw7r527ql8mfqrkneodr4xc9uhmyunury8bogaz50vjkt4l3i3es4wk0ug859tdbhtvpxw3v11obwylau8dzhpncq71a6xqfy74frl6ysxi2vqldklb77w0x1oq0xt39bsowxr6wdn7mzps6d6wgzypurz4rcxa0w0r3jfk3qrbngjesrg6hkxj9kv64ynb2jcsxsn5t38vwlc2srws3o6pg5jve6fi3on2unu0j0hqlz3hu3i4iitp1g78qxrf3x9sa8ab9fah8t2wnpki8azx4e0iryb527a6iutlzgrfm6xsfc33656a35hr4bpk1nfbjvl432yx7j7uduiyi7sylbywq2zfvnevlvzdrcq001888kzhfbzbox72j1a2yf9wyc4ighl9vy4x83pkq7pkuzjks9jzavthtvs7cx99glp770hmegnnu8kwnvj1ha8x1kn3ko8t6pu1i9ta4xge2cqji9xlvm8vjscqhpvnvi3qmxjfelno2gjwv398zcu6egedny027hbh9l30t7ucj6y4gpcjkzqenraqfdvr5gpr6zn3oxej8x3l44htlbc4xfofehgyblvcs7kd7j7pucqttvwdm7i959ojxr2es4nme17ptpa2319lur3rgvxke4evclachrgbhhy5jd3o13x0a59bhqhutjyznq8wpk91kvk8re50w6ikusoq0d70uh7m97xy8multtxn93ybhm0p429fhysos2l28y6iv0qbc3qwb8aclocvna2kg95uh1mtkzhvwaqacde7egmk6v6a6e24hdd5tjxp6p33sj4m7g21xwwphb73mwzwaqgzq8tfl2iw1knd66k5127cev1t2ddobxhy97xa3vk2fq48clvlwn',
                fileSchema: 'cb8f62cav8rzd00dhbn22trfzxqq6qk8aw5pdplcvsb0fy8dbz22g7qrkwzcfrebsdu4l4gilesniud9ernkgf7kmit84he9kpegdzsrjgufl4ta7r595xsdf34cx2gmbugxp7jryxvycsij2403k3klg36i4p9jul2o7u1k6soawt13bs6rz69hb870azuc0jzb8ntcfgykhypapyyl6wq70fqae1yp094kjk83kl1ecjwm394jz0051udnvs58h15w7q5n3a23ehyh1fh9ygg9balv3724ulo20po8p4z8k64u96o4592gfcnwahjwtjmrqvry704smbqk211dlvfeoalnqtf7qz6k90tjzemxnu4emilojqdzuee37tames2hibc0xvj2lbzfiw40j2wy0uemj6i15u32od97dy1dnpsjkxl7ose02sn1zxgmhxhyxed7yuadq1s1phylrbvvn8dlgo0w5t0w4hat2lss77fzj5a9uvkkq3tze7soysz25xm9y9mpzy7x9oxlxb503bebqp9n6ergjfmn4wipfo96n9i0pm7gbs6ffp6w1q236lj4vlbkn2b85nzxa5ghhpopxxrgvx117hcxfvv4iz2zobrtasn1a3h1ayukfcxlqvku3kf83759d2wgcsg7exm4j45nwsy88pyx3lo1zry2yq67j5rwcincgnfc9rp3m6wb1v7iamxc282xf3x3oywq9rc994n0c3isrsys4b1knq994gf0lg0rkpux51pzqiykggwm4uix3rebn50wz9z5m3nhtq1twjkcda7i9aisa1l61b8h3c9eilmyf1u02rptp3dk3bjr9obc5qpz6m5yfylxtvmw875ipyiozxbs5wson8r8jng3zlnq1hmwchhccfz9fhonr1cswse3w6cwn7nmptb3x6xkyyp8tkw1fp45jfhy4o6w2eptnresh24mpco2cf6pe7r3gb5b1t5ry6sg5dakyr8anzguhz6n3h9ouxc7ue9i2j8i',
                proxyHost: 'myfg7dc4u8fry531f5xhgxa6suk2ist3sois4dfbyymjouw234h84hi5oi5i',
                proxyPort: 9437685304,
                destination: '0eadj67haznonbbtl102rj95qi37o7fibkywl4ev04tnd6mf6qbmsb7hod0je9k4t58ntf9xu1k2ri8wtrz2kyav0jalznc6ik88ixg35nofno6z6gu7cm4ji2eeidmvct2o0mx6glp4gs4syxipg2c1y3hpe59k',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'a7ka9nbsbx9lqricx8v6qyy0c9fu7d5be1411rh8c4dn9cnwm3u7mei7qyo4fc0sth4nzkj6z0a9ah0b63kffi5n09f49hwjavymsxo0zw6rxcead0091f4i25tl7l10vm4r14fo55kz3i6phzpqcrvgxdtzfbot',
                responsibleUserAccountName: 'rvsqayk30vayalxjsdbx',
                lastChangeUserAccount: 'v6umuvwlz3agxd3vblbt',
                lastChangedAt: '2020-07-18 00:27:55',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                
                party: 'c10jdfdpgplbh3i0vcjsuiyrmxoepmptxl1nfha5igsdbarbv77orcgwfg2b7xksfy2nm6cc5ob6rmhpw6aayywa1cj1hd0ainrt5r72wznf9ar4hyjkiwhcgy0j8ydoys6fqxg04jyy7nmfgab1qwbfi9dqqhtr',
                component: 'b22g5cont45tjmjvg6jwbqvwstvbto3ov11b3odzzdsvwkr1imrhl351lqwmjkuzsv7mu4e16js3k0ehskzgnfc0zc3ls4s9y4atxe3l8za8r6h6icko0l6iglo13i3abo1jek9pl9mu8t14l6o4cropylmap26w',
                name: '9coqxjbf1dzxbkst9srlm7dchsz0o5ckwj9x3mfylmpbkkrul0j0xvjnf74xlucrzzdktxvs5c99l81w3ua94mrj6qunirsd8xlroy094mqcn2xhirgpowphakbnjpz9g19gcf0umb6irqjs4lb8na0ptwutospw',
                flowParty: 'ed2speoph3ch9h5chuixklwx66ujuei0reko25h20z6rzllrq60aypfh64d022e30iewv1f8vjnbh8teev6a87hck7qvb4r2scfkpq7qjnk22075rhzujvfwxu6qcglhee6xnlimdffa189lz1v9t8yj2t2afvv5',
                flowComponent: '92gpjz2e7z0ko780c5euigrfwf4v3vg66f0s9envf5o32612bsldru6m7p204wwxwc5l8v2al6662qauoidh2is0716cvt55knikok949xpbm461lnhyfz0nech4fzl184pn6ut1ryeg3oncu7nozs0nerckds1w',
                flowInterfaceName: 'hrptxag4zissxh4zqivmrf4x1exkvbhee5x4dl5notyc1akmdumsidkl5ydkcuv35gkwuwxeyv98paz9gc1duh6r6vcnoqkspj80shb71dkcrin0r0r9ovwbg7hior9obnajhnk1ujgky0xgeco5hvgcqjzt2dny',
                flowInterfaceNamespace: 't1stqn5vgfhi9orntpe5pu312n0o5djaieggrd13ezpxbr4s9egga9vqmm5leqry0rmvtojaxpaaxxj9fg410gw8pcnkkhj6ganha1vbk88cr3mcw4bms6vltaho30oyvg15py830vb8d9olav28glrncsf4howx',
                adapterType: '02wsj5d87o8zvnlr4yi2ymjk5bykex7dkofknsd46ifwftsb4kjorh3tbf7b',
                direction: 'SENDER',
                transportProtocol: 'b9s53xtjwwpc9j18gqw85qizs2w14mj4fep1f4nnbucrmb3phm3129em76um',
                messageProtocol: 'f0ee3963o351zn6rgtnl6zz6hsa1jus6a5a6eyttz6ybve3ei0n94fctjur8',
                adapterEngineName: 'xl2hj0awny5fen6tzfm5esrmvui40xdphj510r459wserqvbf1qa63r1npqed18pb4oav7nk9oe0p0ru93v99q40vj1xlj8jr5l0vhfh7we4rjjmev5k1858u9cjg0xe8bzb1bfv1t0tqvu79pq0f8tf5yaq3utl',
                url: 'c4tt09ldjpx0k7k4ktyjbqasg6cuf9tacyupzv1ffts4c7ludnkuulz553wscz0mnd5pvscix6qab2b7kd553kdcd5ow82dpcrfpyjgvv1lnea1fg6sm8raaoa7nl4ile7sd8aqqnoepbby7gbhjr0twqq4lx0yqmiw7w9w8l71jhdc4l5lo7iz4t0luykvqdcoahvh0bmsdzheqsmwj687plm913x91eh305icbyqpk6dfl1rb5dlyjt7pf9l38p9k78h0ft55iomkhgytw7r2ckntsj313qswgl8w62fn8ks53muqv3f6zneqtq9ot',
                username: '2vwg7h53g9xfzusciswn6v7dfbpqfr881are31tb1rwaf1tj8s3w0kg0r44g',
                remoteHost: 'cugfnbc1x7rgg4d7kmg3wxspm266cdggzhl9717nlcgikfx6xwbixrnvgpf4wfbb857ua961f1azlq2g7cymrzkgrfw0jgsuek1353x832idc4f5sv8xdp7hhy7f2blf32hw5p5ee5zdsx0q5owctf5inh3yk6t0',
                remotePort: 8721081714,
                directory: 'v1qumwye1fyu8meb6hstyl1rt6newsd91yzsb2d89hzq1r1aiwbigfzmpu6pjj88actzb6rfzof8zg2kqkxir80cwmsjsc8ttgp4g1uhgl2qo0wbmb2ijj0r2p0gcnvvtu7ooyks9muxy4nhjrm3fntx6kfealjpzzp9acmtjp9v68hn0lm0ucu74bhddrqysll74updavv8zjtpls5axsbmd1p123leufqdfhlnerh2egujd8j04yr0fy3b2svte44tqgqcwbsyo9brixdhpdy0j1fa9a1h9imewy1sy85gfl469bkzvyktsd4xsyjpbtrgc01lrrrmli2zc9gm0m4l7fdg1gtszlx7xxlcsi3h2n5v5furrw1pupoeyomhflxxst34t5s82m42naua4f4lmkuc8j4avsxsip4cw4zytqpxqm4ad27ch563ios2lho9g6wg7fzi9ndfnqrdgw6os0r7p5olx4xdrsmf7imreb83pqxlvj7a2hva8wz7a6rd72bzzov7nkykeol4dpw0z2o94v71lt2tuw39zh6f8fbhwf4oavwgnpm59lidq0at84nqofowib183pcliucontotqvzsk4jdyrl6of2ou3u8rexqhi1e4ctpv1fw36bcpf48sk6iplpwzhcydjbbgbxrxs0p2qu053vbktc0nfn5wv5lluj71ei26uu94fs7k1z4bz7g18w760ewdzsq0r2c9k2nbecwsv29r3aqw4nleaw2gmm00fa2s69cq2rrefs9fdv3q5jzgc3dryiyma06qngoaj1540ya8pmrp75jg6na30attuhbzcriwpzu91i3qkzr2h26fvksng4jz3smwrnxxfw8irngyp0pszy9xb8vr4wna0gl8c52eacgak48ru38jjho1ai3rctblwu832mf36gwbvrhduu1udjfjt3lray1bhlalq54xdtqekb2ptd6s732glkgzfrk6x85z67iwc7deop13cyigd9ye3j6pxwbrky6mhl3',
                fileSchema: 'ayy7jtnfc7kpci1lejx51d4vx4izskxb2t6wj9z82lf9uy4r7ukkpremmqzo50vwhq14fnx6aw6fnq3cq4e5h4r48l9va0qrbe53meejg1fe9xw49hg67u5u6w4hvw0vatl63qmedx43y9svbp3v9y0aczrw6pmiz9lfhsh6z87my6w334l45uc9g9miszmrahhy9qblfbkbnd0vg78nf9ec3cyzzik829ox0uofj09x7hbgbo12wnhbyfbyfjl8ckfy13kgol0m30ih7k4n05u6k4f6sa9vg16cycbj6w3y1jim3rnjkdbwbar81yjh7mmgkb18he7dpmjtlhm0ei6xggz4leuo8kfkp0136cdlnuizwo9yrrt6zkpmnofsj6amme8h80ntc2jipifzgj88ce2vyiutyvvsas7a2pzu7tkwbgl8ra5copcmh8s4jn226unk418pfrqlgwm630d9r7grw54u35q6p1qu0it13q524io499rg4wckbscggbk2nqtbiwcvjiqw8iogxi7z3cochlxrk2manhh3uk6uo7tsbrw2362mq9ee439mz5znfsbpmfshqoxyxpcnk4yd0p9bi0x1et6qo0fxblza12pr6ioemzlrcu15mat4fthfk2r2jrflxqob8ifkyjq7ln3anbtmvand1n3t9kw4khqt27p1fz5nbfyyrakq3upax2ppkx16hhz4hoorbg5y6bfrwxewvtzvl5wm7hw7f0mkx6h4v5tvjz88zs9ssyik5obyzk6bhc3vru7qr5sp7o7zmtp4f0ffjimpdm6oh6s4vcutqca4x8touxqdras5iv4g2eap46vn5zvnrcu3nsdl1yo71bu5fc84ty7n4suzisa0uto7hnol07obtlkjhen7naxv1n47pd384d05erc1t4whp7s8zooiautwis23e3d1nogvg8amc9i1o51cj57uxfw6cas0zqsvrgbzauha29qh5g47tz3kjdtfrgi01i1gw5zxd4kiaxrd',
                proxyHost: '3k0p74auga37wnnz6gpquaowpko8m1hzde1a9vh4lqsafjg0rpd1oxoa2107',
                proxyPort: 5735824575,
                destination: 'hlwly09q7gpzevsglvp00y8vnsjlu3vzsmjr0knscc3d8f1zq4k61qsevxdf0kwzg4st2m1xf226t7v9xsk8zxqv8bjxi7zhhaifjrj8os2dz0otasp5t9bnq1nuef29s0ycjzf7ighteqo8dpkz7kyksdpgid1u',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '19cct0wfffawpuoiz3xbdh05oj6p0vvslcug2bggd4s2yluad2ffleh53iouqxtrurg9dyvacsgsbe7vcsa50u3oc9gbllewmqzbkx8noyk2ggx7ap0ilq6gi5qk8tdjyyn8dqzsr0dh0re3cabajjf3mqxgxu4n',
                responsibleUserAccountName: 'd9vbwnjezaylwkhhmqxi',
                lastChangeUserAccount: '8dbzfzjjkv86mh6fdn15',
                lastChangedAt: '2020-07-18 16:40:04',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: '9yfs1gqk9dpc11r6oqiy40wu3egyinuakg312h0lmytksih6stqdw4lsla3zjd331xt1xrwerax0wbork27lgjktlgubjepm272ogmux5znh2by9pzupz8gb4qaksea8ntz5pya8bf2v805crhgd7o6o1mpqgyhh',
                component: null,
                name: 'fqbnqf1khl2ktyi8b6qxbzvupgervn6ysx9z8n56svw1dyr2hnz4uhh8xa7rmcp7xlszapa2889i9jio7w36kjdnida1kb86mwynur202zvc0c8ak2apffhwqgt8ykbwbz73gumryvkjkw5vgy6avk9mltsq8uwg',
                flowParty: 'veubknxzsyxad8qj2ezryfcu6q5dju4wutjcjzkov5d16ym8mthmjph72cv94jay0ty1uqzp3xwksp5x6m8pql1qyfvreuqi64gg939u85o247x3uc2medkj4916k7vhtcl9y1dqm9wvxl90bfiw3mm2tge85xrv',
                flowComponent: 'wicfka6wgirg2qiet2e9bd4tgca9je1q0gpaidwavzs3hzp9rjsrgy27g2rf8rdpsdxh2zfse66zyp568lbw2b43tbkv2tbrxi6p7uuvgx3m22kzgze8nk5otkeix2cs61i7i3vztbafnbvfa4apy4lattboaux2',
                flowInterfaceName: 'cpv6e7bsp106r8gi01dip0md00ie9bjx3y1v600rpxmnh5qjgpc4oo7zj00vtolt1fgjm8y5dmir3p0olhs3derxfyum1pc089p3jhuagoh4c7lbi8luft2y2ru4f1jy2amezmghl6041fhc8tm4r6mpjmmhbci6',
                flowInterfaceNamespace: 'o138593eosrgdytbrjrg2jr739zpqcmre4nrh94l92363mdc295lwgj4xtcazin987ef1us0h0m6c6q9wmh32ycp64m162t0ekmrimeshbjpzvh6zxsidsur8q5y6m4whcm7x3otchk6voclwb4cg1y1qbblutvo',
                adapterType: 'lcdbctzusboixyea8rcsh8sumbuv0304zuwz6n6u1l7i66kfz8t2u55v602s',
                direction: 'RECEIVER',
                transportProtocol: '9ctx88qzu68ztjeoi5bwc54s16nmeafwfdczd3yf6g5fe85y3yyzmm7enaax',
                messageProtocol: 'uw3mwo3xg8qc5uj8ow2j95c79d4ticvded3da7t5xg5za4ae5a9wx0ebfg1g',
                adapterEngineName: 'r7mrirrv4m14oad4dxg0phon3jzpx8k5l7b90511d8ldzthcqfek84lu93dn7h6y86cj79lugyscrdm0rou6j7vm0i7ouzmez9owzuwyjvn2k84lq2hqzl710cop66resaq02fzxqdwirqgqoi0x8q6z5eh5hl61',
                url: '69zq45ro1yjqmkd3uncu0ft5io5fj2z6xhapkid0ihnux7cn2a4vhkiao2hjy7u6o5dnch940ntuhx1cjgvlyvswg65eod2smpig502ax4u8a1c825lzylbmf57tc3eactc519vrvd2unef3d20ux014xmrt5xrhqquppgbk6mveb4az1tr74ms1zmvycggg30xvtf8s8gqspew65bgjt7tiauf2w3ylbl5ukm357degjtq3req74x95991gobw1chgj4454jgd4cpo1iarm9gt80c5a08g55m7u7dsnkbrqr4ii1ki0dv4rp5u41l7d',
                username: 'l5gljmgiog2gq5cybpt5iw7nksx26uamydxkej4bqyfwmyj6uvra5ytgskd3',
                remoteHost: 'i3zlhcjf89x5h71ccrp4u8ri8fy0gavcn19iaswpeynxsgx2v44pg4kye2uru1esb57et4quw3u9i8z2245b10d2anqdtub5cjva6yzl23msx2w4abil7cwv27e80ixtblcp3752f046fawjmjvd4q8263bmljs4',
                remotePort: 4125449758,
                directory: '4wce425z3pjn1u14gtyduwvli57wyz4bud5njohqgk937bt4fk96txcnpcxbdyh5lambqpdmc8idujeb3iav1n0qqjqwhdt23sqgbeuoj95lpaeewy6i67gf2j5l5cf1edaolviu6c6840nwky3xhwfle5vzpsy50tupoa6zgrm3gwm46o6ql7aztxtlwktsi67q87tfy1dsihudzdv9d4zszqhlrpmudqbzohj87bkl2ib9d653zff2jfiwwv1l7v1yi1k6ehojh2lc60s0gpw10gppigsuxt46agoedf6z958pisc6f641ffzvku5yeiq92zugb1udi3l1ljzbj850aj2sva3bp9qneir4mhmlm0g1yqn3scjng6cv74sl6zmanoob6u51kk6rkma9cxsjoh8bqh0kgr92nysnqyic9czieqohvqvnzs5hr1yg26o0q8ys475klsmo1scbm256ore7cug8v99n0fucpi3lixifh431s9d3bhie4amnfvl2vcb5xr8qiv88kmgkclelrqmwmklj4wif2chuhbx4wfzgw9tpplslls40w7an6z6cgeixtfi385ot3e8dhoeyv4zw60k4ywgu2tongh482iotkriwir0zsnklawignwjikhra45yu5ef4cg2bupe6q9amu1jyuvtsqr1uqgk24p9999si7j7wwbal6kji999yawpikd583kide6mdl58a82p87da04vzxuwwv0hsomkczhy4du828z4fhb11s2uqdrt3591xdqeud9z2ltx0him33sna5zbrzfusoi6ilssibesr9aec49wf3oytxd60fjytt3x92u1h0xyhif8tkhke2tm3ezunlo33jfa65vb3ep55313havgr0vkxcmwae2d509wg8xt7sqi99kcq3u83qt40ceevkk496my78q3skqfnuni4wd9mity0xuib0ieypituct4cimb84y62ow9ycbokt6aza4msdvg2hdslnjgxsxqiapqdxkj28',
                fileSchema: 'd9izla4i68xd4hw481nz8h9me3jf73zmx7r4sf3b9gaj8knyvjmbpgzjk2vqmyoo392u6qkd5r9vv7kqyknokcq6h5mkl8adop6dq3kx9n88nvq9t6ph07uw7z83ix14oaf2na8f7rlxnqoi0gcdufw5ld53tu354vtecqxp8zdszagwtml3v79apgiwx756rq4snph5clrou7j2t907tmvrnbn5gwj2325u157k6wfffe574a1eusisuew5rggyhhwb43zh7rf8ij6dhpyyn6am8n1a8rt65263npxesrwtszn0h15thnf0i6dopxpzwnsv31kbprptbvnozxcjofiyk7tgd8qo7z6kvz9k6wjn644wfpetq7zof4cnjgtb88cxi934imjrdpujs1wf0ov1x8gzw3pb3ison9nugeu995zbdh035ripy3sbun8x0n9pdyejjreuw9l60v01os5yaia754mvdm7m57n1die8vcc4m0ffr2w7w25ni6zvnzelw90cpxfzfru3142ro2b3m368plklofz89d17ay02gfpp2pfqmn9a3ejr0m2iqjekvhyjqt4jrs17rj65h8u48ozb3yzkgvx5zssrcjwy9lu4ob0qlo1pou3zufql0zl3zu61p80k5zhepmow2b2hui7hr3rayyd8gt6cmv64lgjxyw85gzau7qfas37wt2pyl87dtx437zmsqj59fjwqxwc8v5y69a8mjiu5ahrdyalpnelosb3dmuq91dpd7yjxjkigql1g73vkin6oirbdno8tyl42gyfs43uou9gqxzqjp7digu8hpr1kxu4tv6426a3scde3fzrcjpu0fb5opmix5o30lmsgane4l1ke23esec6asnpvzsvarqqjpi6k582k8fyyo6heusefe3gwae9d5k8jvgzf8noxsbsyrv4u36mgpm8yyyctnz74258ur0ty7qh4phmu4mo4h0xdltx3eq7nwsr1eyhz1oewglfqwcsn652br9fpgt8r',
                proxyHost: '2ugtycugqbcf6ltcej7kxc9gpy7bq16ulhqdl88qlwi65ir37mg1fmknwfg2',
                proxyPort: 4445203012,
                destination: 'w98cn3fu3w2s411ks35il3lnvxzn2vo2rky5ij6jjfsff3rycttjc2gk39pi1eczksnr94vmemoirxmluu78va9b1xp1y8rocc3ylt28yrpj2ty6w8l2s9uwbrupyknhzs5gtxhlyco3r2ym7mgh7invxwomjcib',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '9gg9az1907v04774f3ayl42zk29xh59qsmjv3qbuco4zlxd2uyp7xd4wkmzzpx2jhy2q81e7t98p2tf36pg1g9n9gx8qkbyze0wvodve6hg1oy22rum0bwi87k7rvvfid763numehbwj971zo9qv8yy9jc9fubr8',
                responsibleUserAccountName: '5iontl1j1tizsi1trjy0',
                lastChangeUserAccount: 'iu50tkxbdly0lbuagejf',
                lastChangedAt: '2020-07-18 12:27:41',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: 'knqq6hjgmdmi1y5n4zqxgm2m3taxf4711wssgiqjsb6kz2jrquuoazju68toebbyt33d6kigs0a7e3sz8ohsv2tb3bbznvcqipuc7yszgacol4d4q2es93g6f75ygenhs6n1ogjq4m0ar7y0712zba71ngm7b426',
                
                name: 'cesc7foumg2ht7qg4768snn60iesxnz9h7ge1ul9yuud5ghl3f3966sbiq23s3x0nqaceygyjapmrgf8g67prlo7x877dzmsm4vfqh5h7alllzuroriyn3dygmjdps4o7tfzm4xvzzgvgih3zjjtp9emnagqjq2b',
                flowParty: 'znkfykzdhh5v0na85h9in3gq3w7nkh9fesjxln7xaf6xuqgreilmqas8czywmvwp8xws51110ro7aaeae5cdq9e80bxub3nsz8e0u3sz0if1atr33pwiru770pi80m7pcmorfvkqnqxoohlxfoac5kkagfpulke7',
                flowComponent: 'elbwh8egzb9yza6bbmdbodkzjkivg1c45db62em1tplepfc7ezmxvxr31d1vju563uqkoctmf093ufjzb9tflbegycyie6xsmit8qhe4mhlid8jboaat86f94ixgq82mby7buwfoes5qcrwx8cs1ketpgyblhw64',
                flowInterfaceName: 'fchimbxaowd30plbosj4wghphifjycwy88zgbfus37lv4px70m70m6a9oms2lui4rybtx13khp57n8xvrbprdn3d6obpfd2ztnucralct1es5xk3bhiwtehpkdy1engbf7n8uttoz24mlezws7nmzhy3baiy1jbl',
                flowInterfaceNamespace: '0h6od1wzlv6a5lym5vtumzweq02505okmjmihflp3ovg2xj2pdhi9lwdtl2c1ut6hqxrzoj1wbta8olbd8mnqmbncik9gpumytd7deti7s1i642kar8u0cl4qiicamvmzi3pl4rh7c5xncifmk7x5nkuwhegfk5p',
                adapterType: 'r2drir9w04fulm8kgwfoihxvkol4289uobxrc48sb8pq5phxxel5132u0amr',
                direction: 'SENDER',
                transportProtocol: '7s3lsrh5zw7ujt6560swzr08uukj5xunmxr9hbln8xznciivu36krrk8dkde',
                messageProtocol: '8spfc1w6wmgrqj8n15cyw3n52gmyvrrlor3oidpux4bl9s9vo5c7t8llvfqw',
                adapterEngineName: 'uj8tfwpk96a03cq1mkas2xykwl7h4451uochgloptdz45heduj3qs4kgn0shlhqanhjdd8y8gbtq9ujfhhbqf908b3nwvlcf6az7em1krlz4r3tbhng5pq1hcah0h7dk44bft9xuaw47396e25wtionfa5drs3fc',
                url: 'p2fbte17n1afa50ia92ql4bj4rjzasvo5ahkvugranlbbwk9tp0qyebw2zelfw1h5vs58x0o1ojxp1du5mctre05kt6kmrtidmb7tlqooick2xn6iw45yh98va9hzfkwuzcqvtmb0lxo82i6ekrtkap64et2mxuah7e62l9nxpgfevcasc7osptapfky7l1p5ipkt4sir4v0dqklnximplwy1kpy054da4i5s9butbq3n2z2woc8bclvehzqvhj851ktx3yi2mme8ftk20u3sbwj6ebpan08z02h7u0o3jxhl3blwcwsvjugt0cq2x08',
                username: 'fcwpmitqjos3d8hz7htj0r427ujwsxiifpdj61apor1hro2b78tqov2d0uq3',
                remoteHost: 'm2jjp2ytew62jen2xjsieb99sqow8rfrkroxghziun0k51oczvu9t84ic30anxml9oa1t6a4064h37rhjyzur5ajbfehpp8c2apf6m3ftb6lcmfbiryb6d7e18aks5udp992qayumruu5kcmzu71tlir6ajl6239',
                remotePort: 9848129830,
                directory: 'einbh1suv4y4n20kobx2ajqek9lm79ba561dmnxzymfb3zylwoapkns2g7fawkl6rx5icg8drl48emr4bplallu6un85dva6x2mqrt2nvleja4v4im8zso82kle1voxwp2acgh7l7bmuomnmd41zayqv6e74d1a9g5foskekfewvw6buizraqut0iebv1j406zxhfwq2rfo8nnj7r7ocodb72exw03dyq26bcnenoxlynljrbeq51rb8p5e2gdyew0jo6ob82gqang35cktf7q81piyx5338gsuyobrhn44l7s8x71zt496fojcx73p3q474ojb2khgem2paa26ap1xzi94tmqnwxvov9qg7s7zslixxlr3spvp3b0ph56rk5k1ii3awjfd8tbydj03kqmr3q6lh6ydtsw3pmaj3ax9168kiu16q123nngi0og7lmsdu10pl4jvkdjx5zr3rq4dkq5vgi55pdm14cc9dxvtneqh7p9rpoxofzryx5dhoj985aah3639gm4j4r8zvg9z4n46hntg1s7c3mseuta11jdfmdb2tyxnohetv7wzdcx1jlkbqi3jy0g6c3wzz3repv9yky57gc8pxcm3dg1hnr4qakjhwqq7t5pgt5h9ol81f8r6yq510wua220c7zmjdwe5vq6jbq83f3ce95m5eh38808gvufkncvaybx46nbq9d0z9koet44yuqmiinl18vzzl0u7tn0sw50t6jed9h4cdpycn2drkj68w7x85ka2opc29o26m360xbq8pmp8442r0bosl24vlk2mm9wv30kl1aa1djm66sllcthjotvs13dqvfjrz04d0vix3asz16eqw1ocdfmlywkijtzzkpe5wo1yr9hc84fuzes2sxfo7nt0uci4cizgkptxdy0i6s2k764c1dzo2wtm31azyxuotygkr10sozs3whfloefq2ft8f8h4ddshmpcrzd3uqojkbp903nda71me5ocqi5adf497jaibiwgsyzw8l',
                fileSchema: '8brm7v39yjeevhuw0oatec8bnlondginnfgybimywl3bvezc830stfkduexsad1l0i8hftsagh3126vdt724n3zsyfdrnz17ntewp7ntp4qyx945al6qjhqqjuwy6p2applajrjwqlqgelcdf33mygcdwh8kkkt23wwxnlqlbe0v9cyuzbq41z9uyuaji1wslg9qj0srics8423a5jnxotazc6mp9dyts8aesvsnwfdlijzdug1m7j9o88aznqbf2s4vz2kwxoyj5orozzv33qbvwl9mx9cpzfk850eb96dxrlbity97180m55macpcbghgnzmvmt41pgiqpe3z00qrvi8z2aevcc9gggdce5xi78vuqg46ghzt5o272rhi1uv70lml0uc76spzjqfx6omz2t0ak7jzvyq5kjqnax597du8ek07galm9musgfpisf2h3vsl8vskdq7d1ap61onr8i7sy219myaggkd0mipzvti6o980np9p2az5tv7d4wofazh0nh82vdyvktfcguh9dbo900wytocywyap3o5qzpver2ovgc4hegm3nivaslyemaemw1wl9xm9umj2rw857r6s40zx2qhocyk9b4kbsfqdw8f422mmr4k7dqu0gkrf4776cj3f6d9bqifhafqtmjnxbrwvcy9kwplmfhoh9xdhye7v967mkd2wwbqc6bv3t4mtwjc9vmqru8ub3xqbnc3m6bzyecf35bd9hfyajh4uzk7lccdzgiytpt7h3laj6dxsmbn86dmjwmnvlmhly995w38pr3bd8akhvp1956auos2xpb70rha6hw4oxc853q99z66o3ffmw270lk25hetyexbjh74ytxdx0gwnxs3ieb7t8jfjxxikfskccpt3mpvegnn79cmwpmeemh1k5sv0d2b6tju0fvi9uvyrapm5xw3jhq2phcsaiyhko2z1gh6jvwoloh1ujnjdc0em8c47c7j8273o2zrahtcjy7yszfviqq2u38s5sxcnd',
                proxyHost: '1ir5wc05wfkd0g3qnjiauebkt1yu60sk47pogay8js7bzrv604lljkdpo0rv',
                proxyPort: 6767371105,
                destination: 'zu15xixr7vs4e9oyp1kn4b4tl6uv4fsxvi15j66zay5vpytr9msc5bufq4f0esn689zy8ha7zlrdabpi5l3k9secvigkuubh8ipi1llwkzhm10vyknmhyau0ksgertnhliaunnjw19321prks7xby7hh9bpdoewd',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'qznv6kocp3kyk5i0ugx802vbf2o89rxm5it01pbh6pt07mi2l14yhc45mud4rtp0ik44q5jcgwa08frru43jlt375t1umw1bm8yu6rhmbi76tihcnuqpq52bz88llqo12m7sxtrle53k0j9dy052nxki410hoc4b',
                responsibleUserAccountName: 'tie0wvpbb8dchx6z1a83',
                lastChangeUserAccount: 'fqdc5cl9n0reyrnywdlj',
                lastChangedAt: '2020-07-18 17:10:48',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: 'a9uq5hn7cafxnvik8q8z5oa066gp48wiz8lpajgcyvmxnfxr1z82uj7fvhub5pownmigj9xf60u7eux53ffqn40ud1br03pzwdhklnmdwba06v6oaj9snrs3ooxusc1m1ze2kmd86ijnk5xgfo9htzm3azqf95lh',
                component: 'omjb53igcnq80ruf8fz1k5t4yv8ozo1kwqpat075fm7mk25pbntr7bo00rrvfhf9l2h9km4e2j36tibh7xvth19bxuvhe1wwifh7fn48msqy2xsbw1l0t5xigqabtm04owwg5y5hvbd1jbtzdbdhc154p5h7nq1y',
                name: null,
                flowParty: '5z1xnbo0gpg5ojusenffjf94l7n1q7fc4nmu0erpxr2xj18agc9wwusrjkr6hbglra5rxk1f9q5gwpuzgjkxu56unqe72bgzhy5lhw9xx4fhblm5qhm79cpd6ka6pswxq0yzpv8s93yigysv9wm3yes55l9pel6q',
                flowComponent: '127nobtai22iamnm5d8qhwcpov235b8gc03e3pibun0kt3ujur9dr7olnc2pf4jmdfqr0hcd10qct1ans1yjqg8qawito0mze0svd60z80f9sva28splyp58rnonwpw2ec5z6rrqk8pa8xivmu47kybeit1biilp',
                flowInterfaceName: '3x4ogx62ue1o1roksp95tezhw6ru4cyycbbx7zf5qj16y88axee2dw5e7kruzdpvmrw427quhtg35l376dyd0x2kws59gx1erl4pc0l4amlae6pbrhja6hd49ktwycdardj6rzw1prbtf0rvq994bedyq1kpwqht',
                flowInterfaceNamespace: '2dhq4bu5enhkg4nzwrftq8c2i441lu0jc1wibm4cfn38yckibtd7a8j0a6egt8rrohg3ac9kbraxz3bvxg0h26fyz430w3m3n0iimqmlfbe5jbdozef01lgmotxk9h97g5ii7so3ddle6dhkkacin48sq2kwuvey',
                adapterType: 'i6vu1kafigiq0abcp84bgeg6d9xa5k8jcyk9aldt0com4x45smiv3hppdlrs',
                direction: 'RECEIVER',
                transportProtocol: '1vlegqoq1cby2obn2gep8o4bo8ui2rgb6f7yb7wqds78pp371f2j54ygj35g',
                messageProtocol: 'o005ksnv4vxr48kfjdlycgnkdcyqxbago6dg1x5vma6td82ujowrkwel9e9d',
                adapterEngineName: 'xzwyoj1mwqfo3fifgm22p2xyvtz1e2kn01evy3gi78h50bn485kuf2ktr2x8oxgz1odepixbqjscefmuai1a5m2p18xd9elvkq7wblytu2m04aiwa5irbrohwbtiijkeykqwifbozygya8g9nkga5ed5gs2mkqr9',
                url: 'kcddmegbydycl9kapx3yug04yd7qas0o58d3bk115kjjfkbjmyf3x0dhrmn54c4o4mgeu2nqcq5qnbax5av6dgl5bgdiprhe7kwlfu31fihnm63x62svo6eaob66dwof52vilvjfpszje275ksrn5iu4l2h0jrbd7vainpfctfawldk0f4ah2nmfiu4dowugc536k9c1bejblpjss4oryotr0luwsmeci7h8xtw9udogi45bk55kze1toxilhvlr77aazm1ip4p2c7vooe7vbsafuydszky3x8epc7uil0n7qipj5d7q81ex6xe0n3ew',
                username: 'vnxy2bd9p56d559288yj76m1dwk6h9t1vc6ksf26y24q4hmxtmoa9exzch4k',
                remoteHost: '2jqsmm56nlhgiqj6dflfb3evs0b9gx6l3l41e457dtlkylq6h722dmkspkr7ltks0wmvmrd0qhdec0bsaf657mc9ygejegk8p0s5vvf4rnpiqtchjrmajtjmb6gdncjjygbfmeurhbjcfz6mohb6j6pnlmkwv819',
                remotePort: 7711913294,
                directory: '6507vv3ccayt46pwkfsbjm09h98sfvl5lfwqz01g18bohle5pp4z49sfx0di460p5yuw59zttzar9n23lhh5kisijyqrv47ydp6jkqbqh053kx7pquj2a0u8d772guv2mr233cgpp81ohwniq0mteedmp6wmdfx0arpr4vocxlw6t7wwebszryc0xxggr8erd61ccvjjunipbmo7bhzie34nhdrh3iwh8l6rlwwkb8pz4vc66fnphvrh3x761nc5yr0800fezzte8h8ne9uud4j57apewagu6tu7zr7r937gf12l6qc5rjiruf0w0skgzwkvg6uptie2lo2djiqgll3vqer3kggbijmupfavojs1kp4ttsn9hrkae5o22livf73lk40v4bxrey1r5yfdpw5ux4vv5dkbaywgsyzya17n8ggq9hdr8eszbjyvcy1cw9l41lcef1h8hgb9vv7uvvb2wmartpntixg6hw2y14n42k196ly3v93q717tggxec493vwqw1w2988tpqtea1yfx25wsmjgscltdvwq77domgairp4xs26f8da0ta3i2uvm2w1zza0km7ap1sz9zo5bt6x6z081iykwwk02hlp08e602qgrz64zc76izvhyio3ne1deipd97rmha379757rmrr2r1njvdgjfkv8lbmk94jn48mtil2s2ad1ar162bduljj6s196zzsw1eu8k0kvunov6m9xrfd0gz9mpu2ie1nzbj8i5dere1ez59kdbch28g5yv0dvuw8z90wlwbrg1me8jabwaeba48oi2cj17nq4di2kmy0rsvzkibhbxdz4xurtqtck7t4footigkixknsjczsipaqej99hjoi4q36masjofv1pitj6jgy3lz6j2xqtx38acbqndfbdzu4kwwnkoqcwwctq054fpily7pj9eo21wgga43p75q0p98er4wj4lpqz2ceji55bo59kdd3ibsosku7l7dsn0jrccgsdywrresv8eq2ouurxd',
                fileSchema: '7vg0s0hd1h7rz2hkukx51ms6hbaj6prv1duwtuwrre9823ftbcdkvcpjrutzpc6u7hpyckwuns1jygp2e3vibwinq0loqcss4khlm7sog4t7fu4riffeirxerrdsdgx6sq04h5uv662fc02uq64wzhkk1pfyqm5483synny3quyfct062keda9863ntpu3j2bjj73izyje6zs2gkuqwiqzb4my95cfhrncfbz6zyt37e3ifahmhmugwkj21lsb8j3pupd04202wvyfx2rribishpngt2o4esqad3st3m1exsz29konj2ydb2rbumtw00q2recbtq7ktttkkfw1yt4o9aebpbq235ot4bgw6r5acvbo8twf1qwecivfx41oh2sphi3e0iz5ghxb86gcybuyiqx7r3izivaotb5mskmk2w3wjn5zhprd0uuh03huyg4pj1mc824oogk25wqpcx832gnq8yoxh8z1mclfxzwj3bvnixti5kgfe7daf9cisf1fys8s4oh9iqtvum8uhudrsucmizylhjszij8vcafxuqm27c37dkdn759kby0yhgjwr71ufmb9ikgel6riuv88z3kx9lam7ca30wv25kjw9nu6gjpjb7jsqtskbz1fxhesv7id0eav2at8vs9cdzg82p3c5txy6yizq3xthq6mrhpjd51jnht28fqppu5i87s477us96en2xhjix0rjh3izyug4fw5w24jn9apkk820p5uqufbwyg3fyyn3n0t86dr4neo4ax7gfb7nfbyd13g7lorked4xwmjj8cb3ttolyllzvns6tx5tpsqfym6k32tjk87qbnapbjalp6b3ws3gmo9t0t58qkys2kexq0ysnymq4drovcylab540zj2y0fa8fqbe7v6pxaqdjgrb9o8cl0u1b3la5784i4ot1ud1kbs48m1oo1xsv23mnryyr809kpvti65qwdm5bnyz7vnhwauy09rdv67lh6yg8drqxiklwil3tzo5z34i6yc7',
                proxyHost: 'wqsodg6u8p1xez3v6kgouiubi5puyaq4ysr0uspvieatmuopmptpqismi5m6',
                proxyPort: 9796546564,
                destination: 'ze5gtufb90uiksqw1yo4u5b3ugt65irkh5c7d68vmrf40f9cef50kdigwsyscyuv00hjq5ixvejij575tk99psaj8z1bjqre5qucz6t07ap1yw3oyyj3qm6uw0qefipe0lm5sip8mutiar8lpppc9qg1qp2kr66m',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'xpfrpcsk7hf5xu1m1brjjnmqdvj32ywux8m5iar8dwjtk025l0dtaac0x3joy4y45zb5hckgg4atldfcqinzwces6iu8c0o4xyavvzkne032eual7fdfrofmtc3c4idv4h2x3lc8632gxat4fp0w3h2endmxe1yq',
                responsibleUserAccountName: 'f0sc5jic96a34ik1yy5c',
                lastChangeUserAccount: 'kfkaaxwxnnq3eyu5i4kw',
                lastChangedAt: '2020-07-18 06:52:15',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: '4zw5smtn1tk7083nihdxplkhdybv9a33a7qqyqn2r1bjj0fxgrm0hxmx0ys9na74r0sslkdzrookqd1aiee0h2j916jm2e0yz807i3t15lvm1s0966tnajvqytv3rk8h71cxz1nleigfhpor6khsj51f1w5zzkai',
                component: 'dj2wru76g79iq5bahyfoke1tz30fxnlcj8ptlyw5jwrcra194v4nvz2klxh2oah3uye1ikjmk5exgg1i100qxwmv5pifx8j19oputakc2fl2k029160k5r744uq6j25sea1efh6bnizt6qtlmjgoh8w7d2ib4r2q',
                
                flowParty: 'c5od2isytlx63gnzxknjrkk5bc312hzz6o7x3aka86gzo7zlfyjgp7otoo8tb14v6u4ubtnaobn7lgqympm5xkiopmnmotwbd7tqlml05irzsbn2jd9s7ffrb36hkl2aj5x314yol3ausrn9lbwkmiika87qil30',
                flowComponent: 'czi2t0zr5h0r5hxiwzr6ogkl1jscsglr3g531af11lyr990rgznbalzulco2s4zxu7swp7g0vpzef67q38asc6mitirwbbsm1cf8f0w160ypr9ua2b0ns4lfe0umlfjevgi93dsnfy47v82bgpx9034apn8ao2ns',
                flowInterfaceName: '5qchu9f97d80o0yk6g395okl3lofg9sjj8erd8cgoljw5nwliei5y1l2ok8nu7qmcu5p9mdomxl3nxw12x32agz7xxmjmw2w50a7bifckszpf7rndh46pqo0mngkfn2n030fyjlf5ca9b4b9n5qhsijdlubfos4d',
                flowInterfaceNamespace: 'uabgsn5vid3a0bjkospuym2hx588uklfcmru4z9f8tvgy914vi4wkwt7dple46emaayko5q50k509cxcl7fn2mif6y19h5dqv900ru3z14azf6jrneqviuf0kf66sxnxfb5yk09lyspmxanwswxp29wib6zi6lxq',
                adapterType: 'weu8z5wmpn4tnfqsg5tdd4gymth9yebqpa6nybcdf1mtn6hy2twl6q5pe0ek',
                direction: 'SENDER',
                transportProtocol: 'c7ebzd7k6ovym5gtk1cuc38ro5w63ye4ubbq1fxja3jqn9e2kxny4z2mjg4m',
                messageProtocol: 'y4m7svllvfh1pfaungprcasavc0r3deld33hnksoi30bi7qtd0zaxax4veb1',
                adapterEngineName: 'jtaq7lun3jq61xvbj1eeuo725rfczaoa7z64i902bcrt6ay2sx3txy40am923hv9l36wbj5fupis9tl3xf1d7wownpwwshbzmr4oljzj70t63n176pwl1vxntdfrlobo17a3w9035rihybov918yw7wuz3ks52k5',
                url: 'a2a9bahyd3pemecj02emwxj02z0gvv9lmem6vxn6c0gsxwmj8p9fm6n93wfisu9liyysm2o9tz88cpw3e4krvm64ekz7wlpt0ie0k4otvhpbsvqcaona5a5t3nlhwncr786x2ozzgjhz6yvwscullevqjwc10yg6ibg1mgqscoksnjk163hr1oazzj26u15n6w1basqcvmrqevzxrw27tx4a1czu1zc4dknfamc2kxlvg2mxst5xhcfkz3zztzos9ddpwhbvwqy193smkary6bdv284di0y7cifiem1l01wyg1x28tr29w8o06lw48ve',
                username: 'oixqsv4c2fbi68yi1y3egsys05kyxy2nio9zfzldjk361rv0xiu0axhhulfx',
                remoteHost: '84s675hi7794lgyrujz36wyy7ncwzkippel8y6aivfqtvcn72asaqm24va0pvg832sqejmcmo423jm6667e85jav1z1w210ishv3ifl90qngejxhded9o4eutdjp5m0m03rynk59smgn4qwmr5yx55z3dxtp6cjd',
                remotePort: 5511446002,
                directory: 'kgrlekdd8mc420f477oxtogywgwcld98oqrqb2grfskd4mahznjzsry2s8905vgmjjk3tdoazf47bpl3kawfa5m0tz7r5cv5wphbe5cdysjvi69clacshmm4cmgdh5txmos55gt4cslny4cvkgbpxslppqb7flnvjxsy5bl31tov8cn5vwdjnpgp04fogu8gq3g47jdyyaivx4olu3p6si4q14ny6q7r4x2w5nlxe547j9wepi3a3wv0v9idzi9v8qz8567wu05hgby8pulm779lu2jv55ut2krur4rd3jkt5qigzr6gr4zde4c251y6p4zn1z828k56107vs95599pag6i6dgu22cilrki6gl89goh7jx0etvbflpisosnji9uloeh8ldya1ubdyyqczk5uplm74ms77lk4mu0oc4bnyte5c2u0xqrjcrng3u5ww6ixacmrh6uqm1hyazcfxbt9vevx6uhw5gha9obz3eg28pmx41ywun09jnkbkoqsvk434qb7yh9r4xfatsp0tan92n5arlrenmka2ixyzntwpasbuim2z2pjmawpzr4s7iet1b3yvovatqqk3luuhjkc0d25dhgqfj0hxnobxx5wsfdzy15ol07b1uqy5ffqfifsdc1lnve7bhj2awfnudpa9lcbfkmm60qxiqm5t5f7ufo2n2xv64kshn0g8f4plro50f5qa33p2lk39ripk2niptcfmulbdqponm68fs6auyqe1ubrsbegfpcln6h32qbw6g9bloh0j5ahwy5qf2ie3ppjgxgycfw53nwavg9ryolk6xi75bmb1r3evdaib5cc8e9zyh86jloc5b6dlytd4mnl6d5pbn3xut17wjga3unenaug118aeoanu2jmn1yhfwpr8ridkwq6wgr11w45p27mkanbdnbwsekmn0l51nbhtuj2gly5w3pw9rzuspp1dl67i133pkfiaut0otrjxvd408awxpvl5jn0z8vtra99vabbq5sk160tsk90',
                fileSchema: '0jzpa24agdeliube0ygh3jvv0r5sgxpbbsucu17s0tov77dulthsaw5fmlbbb8jbr7yndeyp7ytzw545wd1wv65bxefo7qhpjb4nc4bkkyhkkbggjioqp74kr1vbke9ndvg3857azc285frvufao0wysdi49weo6ks1zse62tg2pt4qi2zljjedtv2mh18naqouizvdqr2jkmpuvb8wkr2utpk5tgxxzlvjv7kxbahma5nklxt976ow7t8yfpn1v6fown1h3i6zdpb1v50q3opc3pih4gd2wgk201wdl250dswa3uvlo68p8ypyhvaz1s15jo6bukaqy0zz73qyq479yhi520ytkqe02bktqs5698195xhtmlr3tfj1485d6uc8qyd0fuz7tobo1yog8j2zd4ea75mhtd23jivb406dofxsenc18d56hs40r1r4wj20kxkqgrjerhgg3zbtpcapb4rsv7hwbq3e5udhx9q2tqxnwg0ur89kay4m65vqm0bq6rtch5kccjhjao7dt0awuu7m45pk7jr9fr77borb3e9607dmvmzjyrprjvi37zo6v648u5vk2bzb5cz3g9p8dh5rq3fy68wwopxa724htc2qegwykmu67dvtp0vb7fl5gjjvh94iyj4pnte1m9874j2nzjad39mphvtuauo6kopoq6gbkitfn711yq2ad90fof5cy6gv4u0jvt1ay4p74rqyhyes7h4lcyeqbyzsqu7lpiuus3ensu8zknm2k1qld2khavjt1irda59f1h68wp4sm8yx0n5hhpu5fdmnl87hubtfnjln72ft52p2sjmf7vc4hrf7ix5asrisu0y2hxo35nbx5tzym2nl34psyol8d93suy8g59p9zztboj7zfdq5setlcko5g7ecpxr1az0qnwh91yy5a3229axi0bbkro46zyjata434io4no9k6xo1maa0qlivg4carx2l52o285vdu8qby53b5dlz3yhp0lrdxfxrjb18ct3uc',
                proxyHost: 'p5j4ublu5v2cg5c8nk9y5o61wrjh22h4ctxjpbw713xxrhg6dpzbbcq5yzmy',
                proxyPort: 8531477581,
                destination: '3g853ds3zf1qbjjvbeb8kdyunlrit3swck1ofub2wydm25ecsfc18kky4uftdwvy4xmnhc144nmfiha5ryqgsl2tw1hc4zenmvsu4qffgqp4uvo916sgfhzwx7aa5szyesnelp14tuguxdtwbzctve3gvoj32k4s',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'h7vdlog246bkd88vn0b00bmr6atzrlcpii2xn2q26lg6zkqow2xk7ul2tljyrmtbzh09tx0a2x2p8irit2yfyv35kmde5yvvbpwnwhqh5vtsg0z6rymb4eepxb7q0gb6gg8sfgpn6883zq1ar1d3wd8hamksmlnb',
                responsibleUserAccountName: 'gfya0reerlyzy7osolgw',
                lastChangeUserAccount: '2i8troqbham4465nli09',
                lastChangedAt: '2020-07-18 10:25:42',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowParty property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: '0k3kvqkf23yups9f4lr1madzogw543r5kj09h06bpnp2v6fm4nhq5rjm9pdp65d2zsamgaulb5r2quy6c0t56uow27wu562ig457104wk8t8wa62djjdg2akytq4it3f2td69nnzljb6lsfi4shvi6afwrlmh925',
                component: '0rh9ettzef3k67gxkn7eij2d63zvjutvn3ty0ateqwxfgzqcha7i668q02e7jhsvl7hvlhqllwkynu3wzf777v7vhftim9702lyrk514djms52zzuecbdrsmrfqq3k8zavcreisqn1pbxk19cjegiflcbdjxlz8a',
                name: '7zl053qjw9u54nx6acqikzdofk8w9e744mkzc7ptgrypi4xcqo25vf09cenozln8eksa22x742f6koi2g4hzscicefdvc3ubmxc7r6orzmjoygc79qrhae2enjznfbqxuq6dzutq2m8613qv51q1rlrzbj3yuol0',
                flowParty: null,
                flowComponent: 'xcf9iu5a8988hfpphgxehtaoire67vwmv541yp7aw7mxebixxezsv9lqxpyuedzrygp6lgyvkrnloybl56m09vme3lo6otdwentvoiioxblmcphz8xthh4t93cpr8x9073ef7q2c4kqf45l0hi8nr5bsuaghp0rb',
                flowInterfaceName: '9qm9urp8w0oq0u5jwo2zxmgx2q5mfkeq66lrocf28lavu77lv9850mec6vq4tftmi5bk693h8yvroa91yblf6z0hydj8l90ln7nxrvv72jjueunqe127ornizz8phvuowrh5h9hfnermyuhf4e1gz0dnetrehoq2',
                flowInterfaceNamespace: 'bhb6e88jbq2pak2ffp4fqgx0h6x3rz1383pyvbbpu6nqo3rxosbg82dtnt8y9wy3hir0t2shauriu6sstrcvvdn06t92jvnb5gm64anz2n1lfl9s5kuj9ffkk76vfdyacr1ytlwh3b1ax3vfr0pdly6y1if6vceg',
                adapterType: 'qnnbalg6zimcn8copglszm2nwz4fq1bzq89d95ypf2fvt9lm0h222vhfzybl',
                direction: 'RECEIVER',
                transportProtocol: 'vg0a2qxn7xo67cuky1a50mwpc1g2v1j48jk0gvvtrt9dwwcv8z0qnlsokojh',
                messageProtocol: 'jta0227wq8wp7uwxznort57a9p4e3bor0x5u17frvxw61goxb2pplpcwwqzz',
                adapterEngineName: '5xwba7z0pmsuhslynwwwprhwbzveatuxs5qobu4j40c9ethcrr5dx0wmykpb34rbor53gjnxxwvnz1g3aerbw3al8r4k26kps3pht9e98jrswrt0ilq6lroigq7fmmtyoertx3pkkl1waohem9a8ax6u2w80uco7',
                url: 'sjw0ppf7mp8yokp1d73gigtkk11jfin0vd7b5j43s4cqhf8lb6sibq4vwu9cpxkja3ojzb07djooq26m2hskc3tk8z3ogazgu95vvcwtuacu0edilhtmy915nvxzvve5dyutrj5zmbd0brg7s6rlcqbr1r7ldteai9mkupup6o0vubqc3vdtysqk9nnkg1l9ywrvm737xf5vn4jtjfyxuz4gp8saukkm32rrmf6f4l5cjnkxn9k4cm5fwji2vyo8unykswngepyxxu4tumkmcrnj1cgnettxb20tpz5fospojfusyhcfrazd785a98ow',
                username: '8ltfpxnu7a10o461oevfv87yrkr0ma0205mgmv6687b7dzmi7c0h28zrjxhi',
                remoteHost: 'k48s81tj85a4af1caz7h6ruadbckuqogzajy1vmdee848oz4yyvjgm9r3961j7gkruoagfmjugznpuwvk0urjickn4sxglzouvwp7hypmyzddzsoai1p1eanay7ykqxryblenz1tz9lxozxbzqtcpqobt7ofl7oc',
                remotePort: 3245176671,
                directory: '8w59a69v76d2x09fw3f93clavo1ukwuubasy95ei3tor3yru38b77s9tuddaxyvs1fx7sd9oil5nsqeh2y56xkr1982lwakojlnonnyp5qpsyn5kjpy8fqhp9dy8o3j3869c0v7xz9o9djq7dldmog5mentxi29yty8ymu54yluxztnjkpbpep3rx4inidvdpgbguj1pjfkeofxns4rszjk1lkraau2htx3i8h5z96m9o9w9pqj9mt8nzn8o9daqygnba2i0oozmtbss4auy81dpj4erp0efn81mtwrni3mj0ap2i3myouz6jjrp89yw7jinqo6pljl3t76une3pqhtvp0yajz61t3yrn48dmghrx8p4prj0z9auxzql182223y1zwpk95trf1gqjsnamy9vwvc2p60p1qabk6ivwbt4vai89jvfp4b0mp3ty1r62o4nljwfosv9ggs30ba4evt4360v370u9rhda7xaiop4dnij45qcp8nnm2l5mcw43kg72k456yfx80y7kef8h13eetd06d99iiut4ujorswbgy0mlezyp78410evkybjdryfg30158rmf2f8xeffiu04r7qjmwg4jddwvhss52rt95vg4u84m3f4djuerwfnicpk7qpcm4svki7dedqzvbtta5mmm0palwttapp8a1c2b0v751sl9wul71bp15r6kb9k15wvjn7hx8bezrf1grm9lyy71p0t91yuu6legtretvaqhgzly8belfoo7dcuvlisyvjwlouijfux7jlslm7cgmrmst8w8hx1g3vvnt1lg36fhpyzbqff871s0d6c5q8nluqqw8vam48yguq6asrad6f92nmx4mjoyl5enztbpxg8zqvqj0imgvpga5lohhdp24u3bhhdr32mnqf7an5qgei8qol5f0ng6hkvhbdcs3ria8mgm3b8ik3vhad348o5u2zk7nk8q0y0llfms6zoop2in5odlgowlnlriwwh4bnd0rq7ehrqjjmumpyq',
                fileSchema: '5ad5arm63iyzh76ux9dxl9baa0x95ka9iaw81fqharqvidv9j7ltkg5912hxhok4efochbj3mq7e2lvm60yrrwows9kkgsyl4u2aryq5otkfn8caivguvbj84hqtt7le1q028o4fty0zjzr8p3zxvalwtbvm4tze45eo8iduwa52ag5pbxihzyv3o5ug5be4r4jntvjacwujjshn7tq2bpcj33ib99pyyd6gvpg8lq3i9vp33f962km8otqjd9pex7yry1bywlhoyg962l4lc8np7pzejv69rzccachc4pilfxfozy5b4cdl725xkbxn3r7ypl9dgrdpu5a9j8snit6iss1jv3lwskg0xt62y0i5546ew1zpcu2ekgsed414fkn8m3b65nfz55n3k4gv0l13qjuynp5djmv2pq0303bzmtmplrat9pug8dp5u3orl6etf1e0o0jblle7duo8ft8de80wmyiczcy4wi08vumgrj32qbqf4k480ti0ktarsa6l1nk05i4crh1fv32ikkr4vjcrbrhxuk2cv6p2sh5j0ktn6uo0hyvq2dcar00co859fs4ct3kg5840sz5ra5vcy11ccov41kqrxihba775f2ryg8uk3qdcuasck8hk2eyyywrci26tgkbunf7vee8i8ve49s7mxztkcel1df0geg4docfrspwh52rpy3jltva1zv2pvd48ph590y74qtkgmieq1q2o1indpeu2nct4xadh7odftwles2il2mbw1895ob5ilcao0ds0nrdwe7z11o3tksvdoqjr13ssswxyoypw49zjcj1x7gh1j5e79is08smp6dp6x80xnnow96tvlapp1sxcpiwwk6c5w87tf6sq191df190qib0s1mm4tuw6693jcdv9ws93yq8jc3wdaftti10kdx1zd90yx4tg9dad84a6xbv4hwakyrd6rlimr6k7dryvf8wcvhkf8gwqapicqz6c7sajo83h5me1yh4m96pn59lt6eaomez',
                proxyHost: '10v402d4zvrnc1nddkuh13of5ijx4okcn5l2b2grosonm0nnrvs38zmuiyhu',
                proxyPort: 7626476107,
                destination: 'ztwedcex4a401d5ypz315amnezx8r42vrk4j86oemz96umt4ch4qhi90fsxhjge1c10zi99rtfv4dfqaunbjqgd3gn61g2ztzgrq636xi0u9a8j23d760dxsriv2yha2bml1zxtircr1wurvx7d623wfahnhyacu',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'kynpqwqjb0jh4d6txb317xc84c4q6vbvac1vsnucor6kppejmpfl4tjjsb3pnb8nz489thfysk8e6oygasd0fr6inapuwpxi2u6kmvh0xz3o33f1eiubttsoh7jfmqokcaf4bfkouhu8nwltkacx8euabtkt88wa',
                responsibleUserAccountName: 't1w19lo4veo7wfpq4a5l',
                lastChangeUserAccount: 'x62f2dm7zq7oxuoblolr',
                lastChangedAt: '2020-07-18 15:55:09',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowParty must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowParty property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: 'gy54phsu796uxmkrmp6fjpiu91yczns7buyn4at8sedlbfzpdnh63p04i3a99114qsp2zmfyj6jehq0tajxmsx1adv0fhjss1p1hte40np11def3p1fyt3bufbo6fewteea72tl8kbr97xbpxwqx32dwa7jowuh4',
                component: 'swi3fg83fu0ajqse9ybsuaoenzqkk8q08vmnhvmi4krzmafrcfhvs6zvo8kciubk1w8lmf5nxq618ef3dwlgysn6ly3bqcdf6ap3j2smvrk91f0311igtw2vlt02rx7s2gyxqkhl779awwj52thsosdq48ldp9aa',
                name: 'skt0cmmotxb23lmneor1nmfsvzagg2db1zslbcldty7wb1jylma25f1p5iqig4nnq7ysew8vuqbewfikk36z59mhwgsv97h3iftp94w3pxo034d605ihg1hjow0okip4r9n6q2bc05ypx96zaaiy2o4cawnpr3ku',
                
                flowComponent: '78jejl8e56goj2023ftbt920gcd3l770yxkyjx0herrp2lvfru3amho1pvt54d3rs66umt4uq0mw41hsd9l5r97kwd948rluc9412e0jglie1tao2qgvy0flqmawzts6xy34ie2ggv9lvbgklxjgasz263btz8p9',
                flowInterfaceName: 'gjxs2hb0vrgto7jebpci43il8em8c9gd7r2b8b36yxv3wtvcwmtm8pmjnwt09ap6d1rm0ke4i9fkbmw2e9pae16qrb370ajisfkrj94px7zmiljyqz0kpmxy77svleu73g58gc2etjsqlv7r29buhmblch3g05ez',
                flowInterfaceNamespace: 'i0fdhv3ggjptj8zchgdy16xjwgda31loghrmboix7c81sxvejhn3kaoorw5xeqpguq64i3jx0sxc2c91k2wxwv7gar9u4arr93a4w47oiwoireakrny959rw9uohqg7kwsftz4m8vj0jxzniv9hqj86hz3pk8228',
                adapterType: 'vht1ml526g3j7ga80gxbnnjqpcki967eevwrf7wtvixg3grqp4yrvklds586',
                direction: 'RECEIVER',
                transportProtocol: '9ah88lu7yne401xk652mjz55vhiz9q8nq6vaq8pu6g5bf6b9lml692vfsrkp',
                messageProtocol: 'wxj3z03ywoegm2jqgzfrch1oxhrvzb8wjxp5dt7jmvxem36hb16dfuunqal9',
                adapterEngineName: 'hle0k6r4pvw0waso9ifae7nyz4qjforde8s39f8dkuh13vltv6hluqrdb8jclhej3mei7e7xzhxc9993dldoh1xwn1jzf4txeef4fhxscpp1033vbyr6zdc73wnmwztyez1ig66gkemgegxxd3d5rs5mlyuyt8pf',
                url: 'h7ou5458em6h4rjnvq3x7dtcv5e97boxjaak849is4albsolba31072qe4z630tnf844dw3a4n1uhc70mmi4cetp6h98kenrmlmunftagq8rhcsxfzbj85jga31vhxdp58a42i2p5trrrpwbqet17vjn1t8x9vt43m6s7mqgczbrqow7ngpblb8q7w89auh9ggv3g4y7n9m82rw06cx3cxkpv1dwie2ebrvl39u6z8eywz2s0pehoo677xlyjj5zztfbqqhuwo4r1p012mf0hvqol07qqif43nzr52rqnm4ap5mxbfkpq0hd2jc6rgr3',
                username: 'f0yn54u7baywouyv8iyu2oanw4yz2t3e1kvxqakm07zpwm4eaw2ps91a340h',
                remoteHost: '0m4dlh7fyegwh21jvivj31efj3y3glyq1j74xbglkgrckw3d9pjj9wedkh89ow5e2ou3z44m6yoal39y7leiydn736p4g33htyz4nwbmn4m4llabrm0t24jmgc10mg8jkkrydgh8sf1wg2zrvm9pm27wjzityfci',
                remotePort: 5282163020,
                directory: 'sjlex7jvyguy10pb85c1cfa20aafewa7o98v9f5i77nkqo2bl44slske46z3of07vbk6db0k7k180owkloirdw16jeiluhvdn0uqbvxaxsh1gj7k2y1q82jtw93aokyo5bfgu4hrunt2qhko9g6qgw7wukz3qf06dqqg3cw7pa5wdlrut1tpm2ds4zk64466hl9ibig3nrd8w70abyvp5clj457tjgxz6l4xm3f7175t30inuytg40cp2mef5jd6ppn8lukqknkuow61hqj0s3ytys47w38ivfhhdmnp7jyzw846udlxdjasy0tdwm8zui7rn5snfi6a3tl8539po6sb8lr6e6t1ao6t9k616n274pbxwq7m4501gxssxx4apy275blbko5d2o54s2ommo29vplro3baf8yn9353x38nbeq82b3plt8bnjewclqjymsw5epd9lejhnxsx4j3wgmgdbavu58x1ejniag373d7h694pawmn6dj285cbprs29kyl1vhy1lk782smkl46z19adi3uqhsq9imennr73on5ch87ekd3i92b9czcs4f3pqseru088nic86vpgwrlxx9p58b30pmyi2n9ngdzml8lnv1qaokxqif4woe340sms5v0l9s3ijww6evp4hywszs9usnhuztyav9kot62d18qmyr3k5vvrgknm08a7ve8r4nsldc2n7sxdxx94wlintcgooom0oqmofb2a4xu5gr8be4tta326n3saqak75veqn7lk64eubhqgqog85e2bwlwr1uvqicjbukecb4umiiqjmm8jab29fpmopxowpr6lh9dq8cgbo7m9fmqt6z48u7p6b7ny92yrfojt3yedji9qh9t1v6xsvwv4fuevbtcfpxw98pm5qnypcqpcvhloy78rih7tfxq690myh5qhsckz7io26rsqandgh5q9udl9t0kmys3iydcgfy0bf9sgrqq56hv0dqkvlmuwfza4u2kgz52ro9kpjf9ua63edt',
                fileSchema: 'agfof73m0wfff188iktqt44x806328hxphojxsmsfvkekohb7a95rj0s6qofhhbbai2vudpcii0myaxj8shn225xofyer0uptii13geumkvyr12adj54t9pl81afztj61x5kdu7ncqwlqw05yl9vrnnnxie5cb04inlmb6jui83a0hzm8zv1zswh86gxdmurqch4v9x1duo1jt635j5vpyvnj1cqap78e1s0zau79b2xnau047x2skrwtwy12ntjy738yvy18njqm5arq81joas0liy99r6u576nzw5qvzk0pbld6ojw8pscu6vtpnivx7ccu7ejd173y8twxe74ou0lwkd55si2ebonpe3qfo14vl3mpbyuuhl5q499h3ixlbk7cpmxo3b9dbee86dcjfdwxfteedbg7qz98ll3pcom2l7ss6j7lhrlilre8yt91fc4xeyge3lwcpc4mb4lx8txccdccevoi89g2a2b8ntlc7ipgbcb97w0tvafb72unryadg3kav5r12qkhdo50os71u6cwrp4rj63ux65ppy9v3s5jaigkgjuo6p08y8cev9nrcrudli5pfcw72nw6bh1l9c0uuvm32yjamtdq2whpdfeszziwglrm4853gcshy2h44397b6a1kf25179xmz19lez2c3suha4splxavcprv0uihn1ko18oc3qimi2sf0k4n40g95thmkpbgkvs5g2uu4df9l2agu7nlud0xmwyqatfcbivbbq45s8r25c7zrwxmdnznxrwkn5z8mu57tym6zv60rg7ltyx02dub8temh2vmgkfm41qbzq9g8ng67lptc4tfkjd8ugj2y8ypese1dn33beopnlb5hx4hz2dzqldy5gtzj3qm31er9rtoz42laldp9obgv8b5ydra1rvnaxpg01r7asdkg1pepqoqtsgvhvd6eupgmvapsowvrujqrzkwgsyoqixixs88qhfwf9c3ozs790ffzxd084az7gjsrrcn9rjjfopc4m',
                proxyHost: 'zjgwp03wytc726h4o87772ca8fqrlkqn928groi0a7oowbkadd50i6opc2xw',
                proxyPort: 3256474491,
                destination: 'o47t7c7ztroo7lgzxcsjoazypuv679akngx4yq4wdwfb61l8krheeeksk3w4tbdc7ittfyxxv8sx4uve9iqg2pktnwq14pfq6ff326139nh0mywcc9pq0ue4492w27u8m432oyagdmzo2xbi03fk22tb29cx0jvu',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'r3aesagfqxsx2rwhmr3jqw59yolt2wevth3nbh8tvpt6d9tyf8nk065db9g5ox6ylwkmxqpxum82878x6fuc4l7l322z500icq8bbz7bft0j30vzh6fo0d4ibim9b73g9xncjqys341jjp73wkgufbte8xo7cw5l',
                responsibleUserAccountName: 'hc4xp9of91zl3qzrd14r',
                lastChangeUserAccount: '5owhcq4o93jw8be4w4r7',
                lastChangedAt: '2020-07-18 02:17:31',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowParty must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: 'pmq9yuxv072qt7tlbdo3zm2k0azl4co4zut26rhkxzudws5s6smi0490atdfnmpb0wfrc90gzd6nh2juqhjqn10mps4k52paumy4mhwlqe1o9l1q3mun5tlodhc6smmfcv20azczi7mx1mhlcmnenfnvcho1v0p3',
                component: '7gnjzm36ytf3i9i81goh0vd7ukbw2ul4q74h47ir17nkjdgozzx3vaijrnv0daayq7y1tqvym08mprysocvkk3q3vvrgvvxtz4dqvoxi26xtl5pa413qx1fsqh4rsnuatgvfg5twhg4nvydxjrefo5b8b0u25rqo',
                name: '6h40peqjgqjxznfnj7xqugw0chu2suli81mquwiz7nm6abenw75o172bzpynr25fdzs7famxu837ucz31b4vmrcttuatjeqzyg4xx8tw5mg3lm0vdfcf2k6tb0u6yo59cxcpzv5iogzwwqj9bo3nzdd9ecfy9yth',
                flowParty: '5bu8im4bzdpxbccq3fyl4gjahe6qe1emsgvg52az9qdy1bvl0zvv8stnnh0t2e3eucrpstayrn3vqt89hh07v2nskz6eu27e6y80sef70ut4h5to1hz3acy9264fn7nxmvapjstrywqfpu5k97l10d7ll1i3f6oa',
                flowComponent: null,
                flowInterfaceName: 'yx9bczgtgpuektvb7yfg6fbn3gv94rhx62nx2kb35glcftz4xvqa1kzv4895lk5joc07g7rkjeglbv41kyaqok0u6sfvuupbburxuaasngt5ee0nrwkamd3jk1uu6n6w4366j00ljynad4wmti1o3gqmw7dwmjla',
                flowInterfaceNamespace: 'aro6maecjrovos42mtb2gu9y5882e58ug2v22x1y1agu3ce1f0pbvmf6eyc6tcxe18j9zhkohg2d70ibsx7rjsqji7h5sywgc7p0ur9m76crhlibp9venjk5o9kitjcfecrvhjla3zgksg4rpnrtnb27zdbum2tl',
                adapterType: 'xftap4w50q72sym27zj8pbfjad4h9anz10lbl6qicst6nednmuzupgoorqd4',
                direction: 'SENDER',
                transportProtocol: 'oe1betfuct7ypvllvbxu2xgi5dejgi3yk7i9e0fb40ng6fl5y1raviik6840',
                messageProtocol: '3eim692xugch3lrqie249fmkfpo0fk755wgr4di45jlogk4qpiwkelobw1jm',
                adapterEngineName: 'x18dvom1a7kef3i9a4id7pzlg9nibihjczxzqju64a2m7n80wwn0v6pis5347j4zmv9szyqfcteklf1gcgtt054sorhbdvz86kc2p13309f1n0swyc1737sg6jtegkgr6zarrlastdkltfqirwjq398jhibh5vek',
                url: 'aw3yjopqdpe227yfh74lqj45uxqx1meioaps9vkm3h2j4lko1nra2dx38mnao53uxakrnlai4rowvt1tx5zspb1d2gby5bk1tkcwn47h6exz42ec9m76qy7kregyxq0md1kn48m8m0ntndll0utj0la0pazh9nbpqtk93d1037mpucqjjur2eon5uhy657xvf0igq6sf1tkq20fbjasui9naoqof6nwif4xlvsa1k8w5xmawjtz35hfqhkfyqb0p21nf7iih1h3gwr24eduq2ufoai78sv5y87pyoimivt7ln684pw5fliku0aj6oq96',
                username: 'm2s6kxxqcg4v7a8hfw1opktj2u8ve8drnbrckcodt7oq8mex1vkkf25li7yi',
                remoteHost: 'aeuiwjpbui824buyet6r0rs0aasgnutz54cxhvmzbfmiwub17flxnpxlb87q8fbx1ludozd1ooni5c5pg3edy5s4itp0z2hzmdmwzsneve28quujsgb1hm16wzythuotxngf2gl8n4ybxhve6varwmacdnxrxgta',
                remotePort: 1250321681,
                directory: 'j81f7fluzpvvfs26e94rlmdqu70mk9t2dl2i03zpmdqmc9m5bboj7z6fu5clejs7muvzbo4cngul0hqhmr3vqsv11568y0olam194958m9ilskddz2ad9tv4yqrswbgrloq3qfi0j6i2i1zpep9c5qp4oflw44so7xqu8zpolh85tzin4qzlrmlimundhmv54ghulpm4snbubqf27y5nl9merij69jlf7fywz6nwq58jl3h2s9mdczrash3852l7vbriuiiivta47tngqxna4pon70j0qhju7z8lhcun64qbse2sx12fzesrkgpnb3e5om2ybn1guc9h1lwfwb3xd7j91grs96d2bt2o43bmoliuho06a0e72ze85u8c9c7itl3r00egb9ys8fxfffibw4cln5n0adzeyb26z8z8s42simyrrg7u7pbb5ax8vni80pvgqk9aud9qsfl9yz3irq2kxx36qp762aegx5ax9tfycf3d4zj5kwjrbjc8pdrsqsra27oryhdi416hvol2oqf6gev05sromq4ho2yirxk8mdkmxozg0roqbtkeufil1z2p3uepwrprynn0bkmykl4rxu444mum9tbaqo1mtbcmtxkpd5xjsyxo1woqq5ze4g13kfo1luamfpkqps0xstyc6oz8w2nnpho756x0l0e8qnblpzjmf40gutum9kzvj88uskxrmr7tn3xwyd2e9rzkr2slla1bminhiys94eyuelkivi7e3026ilotatzjyecj22sx6sjeicb1awtx8kn9qxz9etz4se8s88q45plow3knb1a2cn9y49jjgdz7rg188tjinlhwf4asl7ifnbily8xluimamph6akerfuddgfyo7vwkqsa57mi1nm4myzs0cukgxhd3qrsyo935nnm4chh17wiayt7yzw3ue2e27u8jrmxidwnsa6ji0dyoij9rz8x4ains0cdnewihptegdjt1hs8jlsvir3yko86ts0xdrztaxegahfkzi7rv',
                fileSchema: 'zx0p234xqsu147h3t00libqgqigazb4mgmbmyj2w5xcng45kaad9r6xvioznt31v91fljfcv8uq1h5oj17fq1nfpjhpb45amok6g3scpinfbsk3ysbx734e5v7aveg85wlburfpvdzqj9ber7z3xs2w9liu55grug4vjb4jhj7t9p8suv1lqyrfoslmze10dkxo4m362ees3i5a8nf8vis8cxju6txh9jgr72ms7e28j7set52f56ghp5kyh3q7j8m9emwoc5taffth7udsjtj53o6oq1htz2gd3niqdh1yxd4isnb5hhovvphvob46dylotp27223bwc5i601kdw5zbbos5ueqej8sa1jp3706imbeo4v29kcvx8j3usmj7okhdr3g6aktjm75jf83vbyvk43b205m3ltaqtkcy7mev3z7ozj45ao6g2q474qrvdowawzqtv5nrmea0xevggen0tkababrwdauoigia22oslwgq1qqrhy0mwlyg4gf6pf0orx72s4bz4r6c9etjmhv906z3k59d1p8xchv3q9jwmqygahpndxbln1obb5u7f6wzomqa9zu82h7yq10lr56bnzt7oyd23l2p8m53zw2uxy1tf8eqbov7ptft2pcw5w3ij91glskx4uozumvljbaqjplao3xpldwm1vjs5slll1asp3ciscg5mawqd3zxyi0xho6vj7new3uab6fqbn1kk07l3inv365boqha9d2xg7efxbgpybjdlocslnzqd6kabirpdz6kubkcjyhxyv5fqago4j1jn1m0lgj7g4r85o5gmn9g7c8zgwf6fwrrm9qtkcloetf0tg1fpmbk4y099nxlyyi8i29ob5cyhr0jmz2omqvba9p5lvzg6einacu2zri7mlazwek9j1ezkzdr53a4uydt33g5j9nn4iuil4um1f3s01a6wi8tv8sy6pc4g2ghfmc6s3vva7j1ni8jsfq2zgstloiasv1x5muojxybvrfesb8lveawukbs',
                proxyHost: 'vrkm3rbq7rmqexdzkrfzdov71pjn189f6i9cek61oy0js4zo1t5nqc3ym9c5',
                proxyPort: 1829526709,
                destination: '0ogjs0uk6wjcdhkxei9v2ds7jhcfw8epbt09ogojnmwjhdbvkf2p5fn8p74oc9x2shxtkknnhtdij0p2q1hr98llpzci2nstnvs2t2z55dksfp236mejk0qqs9d34r9kfbp3rqvnvwo0bpwoe8c6d962i8be4l2l',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'q37sstf5gbzqqgvxrhwl6t6npwkbu4m6j6rmrbnyymt8l1qpuvxnb5zhiwyrbbqfiajz15k1ljcw28mok2aqp4mcqivi29e7f1qvx2v0nszwgzo5ywtd4o3uxdecptewzwii94tfg8rvlqnprwphuyskwi4r19f1',
                responsibleUserAccountName: 'ah63q1qbhxs19z9rb15e',
                lastChangeUserAccount: 'huf7ft5vdmq1lion1dts',
                lastChangedAt: '2020-07-18 13:35:40',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowComponent must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: 'axq1g2ctfq660ddxiysfxm98r5a6n27fesqrgptv83a6hu6n6yyb4hcp48ka3l1bqc1dz7fxzb4f492mud1u40yu7fih68teclb9i6y9g2zavnio3k2bk0n1k0cin882rlrep21hrc49xqcq4tg2mbjxvrdx2se9',
                component: '880frcc5owch1uli2bromnto0oagu2zg9bnkv6arvb9xxsfadc918wuf32weips7bbzovg0eftcjbfksxuo730yae42lzyg3apm3dlord794jf255ahuru5h48rl1y9ns1fp1mzxsmgho509r8d2cb9hig7arvwa',
                name: '7qwhq2uixyb0fp24r4d4h6wz68cswtow4x4gu27i7ql1blaq05wkje7e5cxqvx6h54ehvb9yailm8280482t85tswzace9fcidt6tiag0mqn7kzoddr05pa2ecuy0mm89b769a2bw65e0lixp00gjr492fanqxnr',
                flowParty: 'ochjikcl8lhw6o175pd4e5chi51uyhp6qcsz5sa0wf2txaw0s5cjjv5ed0ki9q2d0lz3lvrm2iexl3h3v9yl23ux4lkz54dmiuhsznomoun9fgw72vsut96we4uqdk7cs193k0uhp6zedisyn6mzc8bnbu0a06va',
                
                flowInterfaceName: 'd1ch90tj44zjez1evtx2onx5wgzakant6b7adsnfxxx6nuriwtze9jkinr5flm6jyjjesh7mp3nomt83v9snolbnu0fpxg6v1ub8kbjbfpwbnq6ko6m3b8czvdxa26bb4iq8sgh3bkb6c27ltotc6mlhpqaju13g',
                flowInterfaceNamespace: 't8pq5v50vqfeols0ihzorazhyx2saow696u9r1v90ph0oyo8juc5vyg90toan746156zp716sxob0n9hgh1kcew5njo0lone5rgfevjhxumronweas8qdzfy3sdjf8d8dw5itbul2qs8mwzrl5uqwby2x31ucql5',
                adapterType: 'wc4hre8087f2nhxzc2uw7ptrhn16hyo7gcle4uabf43v6lhkaswv9izmjfps',
                direction: 'SENDER',
                transportProtocol: 'ljgdlghcmmm3k4dkuz0lmojwgv9d5sk2fxil094wy69337tpks03ydyb50pj',
                messageProtocol: '6bcj6u80w3o8ruk754s3jk4lq5wykzdzqwxi8bss5rybv0hzksa8p02om13d',
                adapterEngineName: 'pwb3plo1o3aojqc4wes7toqouo2q2tmz3pd2raziqyyzbdld210cq4qovcsit5btrz0nfbn2xqr03ajk2fxtlybm7chy83lyoa47y77czd36q13mfzinlhizltsajzq8hr5uz5162a9y4eoxr7ad0nrbuwkoc5px',
                url: 'kasi5fe6qh0r1w6udghu9ulmg17dgtjxa84858wvvfk5rc53sfe77povv315xchfmo409w648273ttf76vyb033e64kvew34oj6e2j187lzrzyuot354ukckja7k5vzjy23d0070zcv5cqy0k0tprf7432nvpwc6l4tif683uklupz85xv0lo5taujukch0deu80x70cidgswqvd62szjcpmrhryqg9fa13fxp0xp37auu73m5imekssa1jayqbbf5e7ygq43om6133tt6h7wdphlghjlbhw5owjjrz5730ocaq33cddg8qw9ph0wjch',
                username: '8jp4mxpgfnnxlq5fqcd89du4a1wv637690zv9qaiqkj2m2f8yl5jm0rym9ss',
                remoteHost: 'vguxf3xojdx5ou9hhdv37min83jatza4p7k7yviy38xfzn4bcx0ghzf3br7iyyejbk9nfea0oza65r0wy33fnkdyzw032jceafrsa0lr42srx4mkbn676vcl1j8kbh31ox1l7grny0j3xv5w9tauoydgpqw673gm',
                remotePort: 1451218940,
                directory: 'c6xbkhv0avf33dol5ooyfgx3ixhlrp7q9bksidwitqwjoueri863xtgau0elz7cjxt9fnjbs8wl7vzc4fuu66x7tfmej2fay6yoodnc1clixnltwrsoaozxu2vso97j4q44dfzl77mivbpaco5tqo8v4y0w67one5mxvge2ww8pkau3zsbmjauiyp2m3helvuj0j2uuhua4lze3on21r7726idld3mzukbgikz5t09v6iprzu3m8dce05zklzimoqk55f9sy8chzguvkwngfsoztarprru159jhvyortwas87updsrgrttbxipl92994gwkuqvgnvon6ttcoyne9532qcp951pzwx9ntd19eyi428qrmq3cpw0r0pemu59222lf7jg9t5l85opwozoxzke9y7gomup0b3uxvs7w5h2qlqf60bb042vvtuqgumnikf907hp8ayoal5fv35bh6usqiqq5c2dp6ke28ml68eyk6bqsh9fc4lp61urdgzenrjacxveioq5zm72htwzmd3akfhffkt13luz0dizs6pkpwrjlxzpt9mlpbjzh5m92x2cjpfxpd3f9xt7c7wf99opo0nb51mc1k6aum35gt9db0qpkloemjtcq48imen8d3z5ffrbykhy2m4llvtj7z0ywfxl9ii15hkgt3sbhfvgfj3jxjfz789xz48d06ypyrg2kal7305g4kb8g1s5pz4br9ww7b8vrn7swzu4dqborvqsdt8q0nlkya4h1l4hrxc0ghbgndmxibl7vcxy00q613pr0tdhkyorz0sjr82102hknndipnvpm03db71m2pwvngwvirkey11y6hv7qsxqy9u0flgilae6wvof6jaobcfrt5o6aqavu5t6ixxd6pwmd09gie0lardrfvzgopa31bhap2ejlwp1sjwcktpprnugjzf7berptjobfktynioxsudhppp5pu1nlx1s1geeiuh35k60r7sz0d9ww5r8nmf1fsng70wdvqopc3ph5b',
                fileSchema: 'cfzhu3qc908qa9rjdjdtogc9y1hegs0iy2msn5mic93xiqknz453ebc9m10pfmvmapy4epm3k7r44ridhj8oxh1jyehu396j20jeerqsjdj9d3vm9cbu0ywidoba7k4iimqlet04ahymn4wmbqmq9o6a55iqogf6o0ly6inecz9kk1uhgvp2ejlkbo3wgwys8oxedof3ow4iz5qu4nlhag263bl5f7mv745dofe0hmmyazanq1y8u1r0fcuih00yt15siybromp0lcijd4lsv8m8ouuybyufd14uu8zzrsly6totqcyyz9lze4q0vb6xiwr0jx6q51ezf7zyropo00yv8rjhg9z5arfn3aoiapho3v6wqu7t7a0k1bkyqxkydoes5p7a2mwxzkmwu58mqjjhl1l43m3glpmn3h1qr3ya6u3cjmzvljnb0tslk53hvtati7kw83m48ob0hqnp1jjqnjtr66381corsns5sibkqxpliuljz037kp7iuv0kd33u8asguueg8ow26695qs8l0cojfhz8w4lyx4a886lwnpf7qnkhq5b5cwj4xs7xuldzxyuh45lufotpc80lvm5l5j17d7npeedsq2ih0a7othdtzjzc9zcoyk3wwbu6nefgf80plnke331ddwh2phurxchmh2yyn4m512fli2nki3geqr1bdw7yce7oq6r9mcyhgrpqty43jsvp2qqnobf5ajezchg1jif9g3nk5vu98lzf4nzk9rs12genbm7kqf8snmjl2kma9b87brcw7nx5fa9ph87va56lywk3n3q3jflr4efxb48poawqhxmt0h236li29g6axqsa9ahziesp71yggyzolbtd7gfrk67d9ifqe83yi70fynd9ho3za5mk0vs7q818fn9qlndn36rvsk7kxk5c4zzxhpmie80fk39e2jdckeqiamjg5ole9fqeshxwcs8v9luoblocp67o8ai87sucny61rhr38qqva9prc9cr279xpc6vfzr5',
                proxyHost: 'j6fw9k50zsjim9bm7zveg13ye53k7sn3zlf6zcf3d4zc8znasxfpsx5fvih5',
                proxyPort: 9874620740,
                destination: '8n66b6dxe6k6ig4rvmykucx2ztrakbxk0om64m6hrn84789dafe95gnzs7iwljlq7qk5h8c4x22e7okrhlpsc6yk3yhtdzke8d41r3vjcrvik8ho4980vad92c8u4g3h43uwb0b37r8ths9shxm9jf00o2r5jxzk',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'n2f16x7lkfvgthwo806sp5sdpwgol58x4qfe8thzk4j0m8ec4efygm92gv2e1u1nwpaecbryr60rwj071bj8qazk6ttnzchvege53xx0tkvce2a3m8yfrxjuqftwyn0bmxmoszctsosnr03z89r48e587pj1mchk',
                responsibleUserAccountName: 'i6at32vbcns9wr2sx998',
                lastChangeUserAccount: 'hgdb4o7raon5nbtqjocs',
                lastChangedAt: '2020-07-18 12:27:16',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowComponent must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: 'l6409okre91aqvw4p6jbpztei59xdr32m8f40xnjy6wck9sf2bh6jdv3hka5ayljx9s6ur7h3u18f5rddxffiwa17vkopaztbxcdp5xnfhcu3lfp74vcppcjsfxypfzooqcmtp5xtn50opnduboei912jl2zejmz',
                component: 'o1vqnh9mk8adheuakn2ud9wh8cu8u5xq1x4st4a1hm54x0687ct8o9i3bphoo8ln1h8pqgw4oxhrj3j6rxrll1kzv14ajt6gqbwpxck8gw5qujhm2fiw53ntfjnx71c1uqs3mgjo1dzp8rz2p8fqodax7doxvnmu',
                name: '4rvv3cwo5khdxr5yyf8273jnb02xqhvxpf4kvw06bfm9prw3koofbk5wuemjscbeal3rc8a71foxsnn58b0z8a3da4im1q47dufz5z438melfylywaftn1yt9k792tl5j9crf3ioqnsevil5nqcn47uhe4rfumz5',
                flowParty: '9na758s8hxi4os46uyqnk8y57gmlhwdief3kta93sbb1isqv301ck5oe7wkugzs7unn6pahdfdsvp8t02llsn11cs7azz5t68hv8q7ps6amolfyfvzctmm7z9843ujxaut60laa0kgu08mjha4z0quk3n494pwic',
                flowComponent: 'obtrf3lyo9n1i1mlsykj30ki7qp32747qjbic53xrogmyni2p9i6lkrq6qpj39j631kua3acxf2gty55ihtq4lp099hfc8rcxdmh5tjor2xgv19ej18tm2lx5s7vid5t9g1zu0evbxnlelzgjjc1yiao8e7a18cq',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'p68ngx5v2tispdhn7aoi0q9bt2trnre6cimd9vfvioltpynyf23dlgm577ethfdvjpk379kxq1vhyqxear0x5v5a1a3wpsoh3tuxs4limj9cim63wys95d4ninlyimo1cx8e7z0fy2o56mrcw6e0uzk9dtb3qgsw',
                adapterType: '1nl62pmvxpwrajaq25y7fu8l83xc3weryrnqmnq9lt1uyu00k9q15wulan98',
                direction: 'SENDER',
                transportProtocol: '8rpra90y13hcfjzdhwdaodtronqkgeopogv6ekkpcnhkvytg21buk60r6tok',
                messageProtocol: 'itf3h8alezonxdrx3hy41jo9d9h74f5myc1khpeese9ow7zerutaotnrrn4f',
                adapterEngineName: 'br2eqyct3c0d2l2akd44ziutcoolnjztlplp1bwoszo5ix4r9zfzrrenjempan4twni3nlt3lko2htcrxsphgqiog4sfexystep56m175a9w33s34q0m9oaaylw4qrmltuudjmc6x0tm07qdfgb5zl0e5gv83xxq',
                url: 'tpkk9v10kh4fcfwam0l6ll57kikaep8y52i5mzepvocd0se4jgxramo4dkfb0f8wbol082pmlmz6wf9s2syam93l85g6iizeg0041engnkd0nam5v1nof8q0libp7qm9siru09xbad9l1v9gvfl3gq5zg8ahjmauk8dh1mzfb8a7kyyx93l9blwpjg9mhcamaloz2sa8qupanjeao6fx3l4oabql209pdfxfxcfzpo1noa8etuxo914yin3e747z9oba3su9okyeosrz4jqn5kuascajyw77zr2zc48qe5lontm1ce7ukf3wvf6jtwl2',
                username: 'byf95lzjwa0phbexf5hnb30xn5a8k05lrxcj8ni3wj3amgta54p7hfnfqxq6',
                remoteHost: 'b94rud465kyklgg1qhxbc70bjtgf8wrljqcwwzcq64drwzka12cqfrp3m2fty81nnlhndibja3qqs6q55t3k7dbntc4lthdh8yiasef80hftuoag43gzncnymc63qgtfz7sxfaa69m1kb7pkhry20kkqj7lkn9nz',
                remotePort: 7485723765,
                directory: 'nxq5rlba02pzjevvco1qawq0jb9w3rl0okyn9y8261weyr0nmlgzuglp1mzppukim8cho5543inr24s8ejo1ks9la5pu2f7xuwmn4diibv9cgbqx7c6sts3xe0l9qkhaspu9791g4jckreaoo1xcaehcp3xb3mesanpghh6c5ct59kkmk8ox11k2xqnimqnt60cf9sns6b93x40xqnoe4xcesxk8w0hz6z7rikryme1oqnrc3hobsubbc76g3526x8tcd81rqx6y68wrpwqfqwe603wxru47h71m91mj1ia7rmsvb6oecufumju8mkevjihwgfjp20r2hkbyd38n1d48g476fhiggpiu5sikbbu933dl8du3d45webouyuz59qh9lfc4nby8isjrwh7rxqe03671ygmnoxx8e09z94wpmgb18hb90x9zo04f8tfeh8vyrh2xxqs1e8m8xcxqkrh9k1oxweywhnplwnhx42l9yhbrr4weweg6zcq90a9pw0mgtl8zhmzidsby31ym06mtnwjfuuw5ce8e8odjclq9sxsk2754811i233lxguj2h11trc9vv5o9h1t5bt9qk27325g9dtigyevyj4ip81qfsydrjb21m08rd1ymre714su88985krcvrhdyxpfpz9jeeibevg47qlysdp5xro6ywami9df3hcnntkpqrvpco7h8w2bz9lpy5cbamn1oxx7p9v08qyfcw94f8bhpe39fpzptbh025zf9ygwy2i8n1yjh2umpxe12nmrh094p4rvabm8obpfg57kcdbacbea6zdibkjv4xzypca5400hy8n56qb668zbw2v9qys5yny075y82uyokedaaq6qhqbv5cbilhu39ty0xb6ron4o9r8o4bxqr739t6ju709iv0ocxl3auulvfzwltxpedxp9ebrxpkkultq7bdmjkpfgv2cbya6erquaiy0qcaegf5mpumg75k4za7lmh44mkt11c6aoq7t3ado3f5knfwzc',
                fileSchema: 'xsdpgziwtb707j3c84ihg57y1lh50lkksssucpgozbae7133rc7rfsar7lsl069dky0gpp2g8g4oh2ejd7ktyf2784k004ut5dgq6gcjgsj9p157v3ezyson62f0o3y7ivxamim4z85xisoppion702am6mo84t3iltf6zv3dh98lt6vdmjpynsuyhhjqmp4764x01tagvz1i3pp07ipl2nq88rk5rj8lg8rf8x6brbl5ichilmbiu66fl25v2cfrp83kt0gzze0xqg05prl7mvqyx73sneus145qug39dn7wmvjsmtvm871emozw9cj3i32ney5o7okp5n15yb8ibkxrgpsnz3mzs4ggvm4lgp0emadbtzfo8msacw4niukv2ru2kz0tkuicazmfqi0rcvqajtvnc6d2pq4538lda4roqbeffio67fpzcfjghdpen4a4ol06m5nhlvqsb6s0oru2256k0tezlnlipprwc4qjge4oc1ox5davmpdi1ywuxa4onkgid6n6685pjgk04tviq21rwfufaolr2np1sd5pkx44nlu3pe6di1wbc4l8v04tucnw0lr9dlt7zt7ubmy59evzxuztb2ld8b86p493q3arvgmuuedzyyivehmper9gtukujjpnynrnf69xf565nxcvkfkkxr55xs71nemyxyx28hurmx8x4n8gir7vft425tzkc1qre9hniyk35pu48dmk0zrl0fs9wuoz9e946vylzmvwx4pmkzgsegbdduxitbnhqw92jtug5a9pyu2eakthsxlgofx27lmvjwa2kcfgx2ede9vo3uuh91195mnyow08sy0h3ldng8bztyv7erdqh9uzmbhffpy9f41ipynf6frljd1lxy2bors6jp4lak0nldu08yut4cyj4iczmxjs9t4osu67dqm8ru03lrwgekg9iytyqp9yefpp6otj9c129s72hvmnnvkvd04obxgaojxvl9vpz1sk2qcl6giccycnk4j8vow80yy',
                proxyHost: '95wvgurcol6tguy773ws97gpa3vvn3m519sljd2id5kxdsceu2ohkrmqhfgj',
                proxyPort: 9633109572,
                destination: '6qward54izurx5kgffphe4rx0j6a8k0rdl2zbnm6bnl8d5g1cpwhfmy9e5porh72r5jvsvzsxtgodf3pi2stas30ercrrjvwy0v1c3ul325nfx4rppp5cew84hu59d1m2mkcg6ab8kzrp4va37a2xnx5q3f2oa6i',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '5ofhtnz0sc8ofymhei95u2v6rqfuvf9fyb7prl6twq5jxg2pdz8ve2n4mqzo7nmwit59tt5v45njggixref47tpjybtmppz30emv4rxvla0uloos1ilwj1i2i92e65phjkucvzyhuj325jo3rza22abhj9x4bvkh',
                responsibleUserAccountName: 'rvp2cuawqq9nhlnslkay',
                lastChangeUserAccount: 'kuro0nfsnfnep5sjo27a',
                lastChangedAt: '2020-07-17 21:32:42',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: '62w56xxqf8b2a1n6nzbxvsl14329gk72p5u7pvzxh2c4xst6fnejuhp4xrqqj915ipawba7hg8r2jsf8x9ff2cqs7g9cy5ap6eezylp9ma2ccn6kxjkbk7ryeg8ariea4p9bojyqhbff0w1us395o2o4t7l8c4ja',
                component: '8hwrte9nokvtrxzz43686vaf3a24zqx39l2acoqdk910vo3hlcl3w28b0nwamf1vu2hk5i9fxus6vv2jd2d9y1cmopvadla1o9jmcm8yvq7je6rpj2ekyuj7n8znob4po4053jhebx6mafq1nzqmzhpox0yo8ohk',
                name: 'h3f31tw417sebjq5qr3muxk8h0p600990ejs85sfjq8zjcem9307cf0st0f6p81n1r1y571l8g31otwv342kwxzqbyt3k1345cf0mouv9cs8d2cez2udfjj5psmrqj8edne2dlo5nfuoucyph5whuns8nzr0zngz',
                flowParty: '7ol5f8kt48ctc74z2sjpvoory9k85xmb9s2qnx9kefie5vwog5zc7doi2h5a5yf2zki6xy7i2wbj1wwuv458jzfeltjq6barnqj0b365orqs5svwt4bex11cg90gh4u0rvjzcidha17j6qck34d4a7y54t2u5e6x',
                flowComponent: 'avovkh1ce2zf6j4j88zkhim428lemm817ustgbzyc8f33jv9satq05gzait87d11sxjw0n3cp4fhziwtpmk6g31n9ypgprsn4u7qwpmgsjgguxu9q5k4omg8lf66ohpm15td12419d9xw6d0krjrmeeqfh1e6qi6',
                
                flowInterfaceNamespace: 't60p7xlvgrdsfbgqfalhci8i25yrj496k0bvnftxmfh91k8nn0cy63qge1ga7djmdjea6qjvtcoes2ryn2tnj0to9et4ecfgjo8vkgwmlo6zuls1migowz5o1lfthke6yuya64ya5md6c9paxy4wcylvtau43mxs',
                adapterType: '4sbmtcm00clen9irhogil39kyetqs8ks5igd3gnead5uhq7pjkveqsc8gogo',
                direction: 'RECEIVER',
                transportProtocol: 'aekkjwujfujyrinaedrj513vjzvn892vg4e0zasdji3ui26lpqtad3exqmya',
                messageProtocol: 'p3nu0s4x4r5nfvzrl7uz2nsvbyn0sjazydv58anrds619nke1pqfsu0q8j5k',
                adapterEngineName: 'kxbsu0457i229d1ahiuxsr0q1qbszojpi1keyskgju9t03i95z3je7a8uxp4pyzlmftq4bg6yacadbhl5p3gvikbb8q4mhbqc5alnyw5jg47vk2vq1ldum15kk2untl5ectifxndepbshzw69d9fxhzxparu3h2p',
                url: '3t3xc640779l1ahavdy9efy4x2dz141t6jn5pdll5innckprbmvxae8oq08kjpj7p22diugczeory9mc49feo5bgat2p84hi8yifjnfa81f36ao3ox6ucnj55d3ofjtrdak6nbn0dwwjimebohlo6k4y86g10x2lm3lg1m47or4sa2pxbx4nlm95he2opi3ejzw3rc93jk6xft18jqp3te6t7cgqkblbjbetfj3exrp4jthr7fqo2p22yzmzgqfzc2jw10cm1j54apxut5n035x24endyrcdfx6enfrgnmzrktecfjx12lc02p41ewfe',
                username: 'wtz3dht83gmaz1z9865f5s6latys3hgn5fctiv5hsnpht5bgorxv4frm08dh',
                remoteHost: 'odyyoku3ljv2pvs4im7cw4zb4c2b1w536qb8ps1nz8kbaa126r2hb8ungidkyp54cggaigg4u6ft1vcr7tht3ws9qhsa2lc9u7nhf6e688qhb1wrjd5a3qll76g6aft0yb3czvkayh5vt13rpgpmgr7hle21d9n3',
                remotePort: 1155376310,
                directory: '4y21612ri5351kdogu0smzlgqz3nal7o3cxxe7bi1bu0883qq5wp8z4rzxgvuurigwzip1sx0tjbg41ndqfj81qw8h4cktu4n9ouswltogsl9hdzpnn3ftpvhuixxuaurmd44kjqvtnrpkkgbal9944jvpo2etn27qvxnx8krz07zqg6cuj0f5jftz0yb15r23ec5cv1ibc5k0nthy51st3nsglg7ohrchsg3pjn0jfa7kmzayuzo3lemtcnwmhogwmob33nxkxr7y7fthb63huylt3mfx7chrlxbei0l58qytuxa86btp01bjlo9xzp08kuyevccv60e3ej9q1rgb6exbzdc239b53uw50tofzay9ffi988xne0avm990bpzs9e39n2b6q5ulib5i6whsa74t36p20wp1jsf3wu9pd7cw2gcb1h68cv3mmqv3o7c7iw4ssgftcav4qhetnni01qyi6jnu9o3o1wevqr0jcwz8aqec6k861uv9zpqt48vd3stcw0m9hlrxfi24zy9deia35t9o4utmqw630fl2fgewax75vfj07x6hpmqwcysc120fdktrhr1t2cutm5cevp9djls7hkz3fbwpfc7z3snsdoo2e3ccppussnx7t4g5sf5y2uajqiw67natthvgkbyrxc3nhgdlyzob3s1j8dvsg3h7w69x9q1u2oahcp7cos0obei09qr5rralvmpvqfttp9k6l5nojlw0ssg5rokzqixpzi20mg6axmle9f3gljhp1lf183n6ikyq0897fitywypczm167f6oh4l8q7m6pv0gpmtv7eanp5167ts84hv9olg78ty0ckbg4zzkgtwfnr7b60xdsx33pwpuftwbd9364xfnwl7wi16dzw4f5e2xe5owecuq1o66zcxba2l6274756ig5lrz8lt2pyqgu8ollcxgdct1bxpqioqe5dl936mxerul2lipn40rxu9abp1zb2z0f4jjk99mqpys2qf5wr30z2evt3j0ln',
                fileSchema: 'wmi987pjccdpao1q79eh6ndsi7cnxrudnjl1aumiiwrbbiqqwu9218f15s1qa59hji441je2gjkyc35v8gnj9j7bn7qjxgb9tyszbina8txplypz3glcvrswfvcufkm2lk65iidk4bu9f2lrelnuq7aak5mv8u2smmgq6fdsk1a57aaycq6w102klr51lyqrxokrg96fj98gr9ze2ka9kt0qdelh2r32ur7e1cnm2310qgmwjpsx49xypd70ecchgwhgwhtx4q43zcu4qlyupq8469z35dcjylaq96fontab6hyxm3ue0zg6wfsm80vct497o27hlqkbcs8s51v7exgml829dzlhd0ttut3lfz34rtnsrzk98tlotc8err04vvdz8902qqmzjrpzvfwhqs209dbic1t9z6ubq6wzkl379zueknlb81ky8s6d9i3q5c9e0zkrxmuxce54cus2gnrwkm65iyiz10qtijwz2vupfxf76zyk1u6dsst6u50bjd6331oub08jk3t76v9gjvevr9ki8ob0d0ksr4qjbsq6b9jw09owf4mva4b656el0yi0d3z9mlcvc29bzvo4xvddqekt6gh5h39k3onk84txr6tr7bync39o0sg5sv6csumtpq29g7tsm4somp3pm6pb4fa41qt3jfjr2jrenbaxat1xen19puyfhpeoeortdyf5f7pxobaml056fdq6toqo49a9c41k8zqohkz34bdkvubz4zkua2vesdarf7lwye4t1t1u1wx8lrjjwqielsd3ovskck7h8c4jiwfx60oienysfkwktq523ju6cl36q4ia9en7uqavouv94i6mupbnqkium41xcg0vrqnvns2ffr6rz02xi98pmil5e7o79x0ztqwpxx16ww3m785ebabxtogrqa1lowvfpii0b7ov8gbc09gcvpt1rzcre79j3tfbor4t0ess5vcxcazsqnxgksobbbg1eerow2fpvglrt7gz3q1coxt32ld724bs',
                proxyHost: 'y75iev34lf4v8fpb8yqvu276qio31fx7g48j1p73erxhgf4ez9obtyqy2j0c',
                proxyPort: 8071101647,
                destination: 'wfil9qdz8hai0c65ae1sulomn4ulaj6mcv6ev94njfcmhjy0tgzq3xbccqaqggbkln92ksi7xo2qqe1cffg0v7b9yngp8fwpnlkmwvthop2smhqw82sgsqgxxkk0pbetj2ouerhqp53qepxv4gx6sdw2ab9xxcwi',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'cm6nbgarxhbt2xno8ll8nt75tmv1sexb25m6zyabatl1xaydb4q8pfqvubgmakga3f5iyv2qyqszik64n41i6pvmeu3yb2resgcv62jqjiuibbv37mnlauhemoochn2sx8xhp08ovbhz3rpidgl3gmyyysryvvr9',
                responsibleUserAccountName: 'spcbqadlry19eqprozuc',
                lastChangeUserAccount: 'pzxio82mu820kq111g75',
                lastChangedAt: '2020-07-18 01:52:40',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: '412m8c5fl99jygs8pyz4c65w3ovhssxu5e6xlcd3zrqtss6f960s3yy59knjurg0f260nzjovuz7pbtv274y90jd4vh4g2y24i0plyw9qkmf8i0kg6u5f95xtwhhq9wqwq1i1g4ahf0sqkzpz1blm7n3wphwb8gt',
                component: 'rly6kfvgw0l2py6xzqlw0ytfoxpzkk2g6aiogvnckxsd7m2j372bx1z2lu33ttce22c6n0kdsglk6il7zx0wvv1wf3rtkqihujjnwwraf792b26tsllecx8ydzi03fpvtm1ukiaznadylbixt7bypnfme26emovu',
                name: '4jemi8dgofpmqtrrevhhqho2lcb4wlfxswfyc395s1p08cntupt40upxwrzj8119vos81ftnqb09mabk8uowiozsfgb0fv8wg2lj7ewitb3ro2fdhsrj3bf22l95en6mjz9736rsewre8joy9bjjjd4i0y0bpy7g',
                flowParty: '4taejnhbvr4d453wcd1id6ijfgk1h3nyjnu7uzh2rl6mp59rp0pd5uny1k0744mrxnf9qcu8rdtyfcuuy2mrs7xsstubq4qnfr9owr0k37809126sbwgm3fjji6kuv88ta21mu3p6id8vc54nm12mzrlh47ud7wd',
                flowComponent: 'ef2p6uvv31bh9fjeyupk8xg42yfuk1fgdc04tb6ccd413qwiv2ammdrrt0n1656ajwwvcm34vlwpf7afewwclwbyfmzhrc6er40gjwd5euciz7gze1spnurvdtrcjwr0ern4yg5upbafpebmakjhxuxpf6eypsv9',
                flowInterfaceName: '6yqa8sgynrn337sg7wbp5jxw2qi0kgz3rjy14qq7fgrycbmcd5rfiegxb7xu0mqf6ep7u12easb9gtn1c41s3sgb2kcvn03hbx2jgm5a5yxpbh6uwcdy59ws56phua956nc0cyg8f4fziezygfzc63kqkymua3qn',
                flowInterfaceNamespace: null,
                adapterType: 'fjhcib139pford5oikixu4642y1bcv0u8lryyfs2125n58s52p7npmhj2hoa',
                direction: 'RECEIVER',
                transportProtocol: 'qaufruo985f9ha6nisgyzqh9j5mxrbfv01rn93n03m0sjg1jyql317t723y0',
                messageProtocol: 'nv2iidqwgfagkmhmjt08yc56uppwwttf62auqmr59t21jggb5ahhersw6zor',
                adapterEngineName: 'vb0t6813mofd80x4obf03p9hb2h1paixmy0dyov762zl9y0qcpiy4xy1tenqxj529oq55njyeca5laz0mwzawypxn8mzpylmpaojwe1fjo4f2h8c08yo3hpj8wn6a5pam3y4xwvv365g9fc9iszkjldcyxnrw9zh',
                url: 'vh83ssbhc1j7swoqvpbc8ns9o6lzhncfla5g8pwldezz6b61rkgb6w4ht0tdrjodv3vylsoi60m7epmc2mgoftdxdk616h3lxmy0rpxmjexk05dhc56xsoox4187kymwn165xalstbcsoi8gjvz3f8l7vzh8xjxr1spe8f20wat9s6vvp8tyxon3mrktk1uk92qv35tlapyo6vx25o7p6sljia43j7zjxlx0h990w1lc5we0387syunzh3fnp3gsynxjrfcr1u69glud0s556te1t4vi31ynmk8h1f88a92xnuvb6o64i4srvlnljwr3',
                username: 'c62jk1v9mgjnuyoxw33xzbrj0651u6r4dqer3sddjwo3dfsbsncy2pq5l9hg',
                remoteHost: 'bgbxyf951o3muqpd8akxekfmibk9dz0gmod32xli7b6scquqk0l934xws4rm2egh6n4bd5li7tht6oxam98jjz26n1u3wu2xnqw166tfxuu0sc4pd6lvz7fjqxeg65isshth88pbnpgzcbnkk1tsfmy9g1d3q4sq',
                remotePort: 8064775132,
                directory: 'zg0vqi4hqrmiawkq0utza1zs2yq6u67qqlh3k8yxz4r6kz2uod2i8jl8oyceid3u6q00mpukcaw902dxcrvl27aj4sg7rpyj870e16mmf5omsxyhkhux0z7x7thiayl200rsymp4ad79dwzdksru7zu86ylhufucjt2xr7y8szo5u2nupdsaru0ov8p7s3tnbs7arsf1udrndi8bp5d9k82w6hniesd1kd226096upxxy8la4h9774evx606k1nevh57efs05l5laleyh3ylcjhyvfr4wsy8mtzixildtwvcgifilfokh62ah5jfichz32q4h3gzk60q80pw93cx9dvwu9v1reawhnh1nbf6yiqjtpy1yzqhwhdp7r1c86titg655o0qk4jeiwqn0ytr7ot9ky57hs5zlv9lhltim4cnkqdm14c9w1v0l0a0v7a8ar9l0665w054k63n47f4ezsqfxcsuqsto2h2yhkorwvpl91iakbcidhwyiqxq6qr9glzzqtsm1bm306sffzse02qzsy1touxr0bpwn1535gal2plh6hdttux7st8g9iwiznncx753ms4ukajz8v4y0mvbrgrfk7m2imynpdma3xphkt0s5fsc5qnsytm1xqusnr6vb7ut27hyild6groqwbo0f0dd2qdxg6h7vrnon226chmzgsu539e2rmdjiv53i0wzl1ywt5lqqh7qb9q2cf1oq3kih5czehrq1w48zt0alucxs3uu5gycm5ccmh4q98mehg59plg19hi4jns6czqe794mg71esmcdeknwrb9utp7gsi2ictudsx0l13b5gi1lnwxeyxvonqzg7wjh33b1etkoywtdh32h9ldhxh5lrvq6sfr53nini2lznyun2dwx6tlibhrlensit7hgdd6c27jok8qmsxs25whg9ixdj60lbn7vwutji771j5ehwei2g64wrjkmqjbmx5kssw353spbdhf3wspew93sm8bd3gm5fwuy5btecq602uo',
                fileSchema: 'vu05040aeh1xib6m6ncs0yi1jkaa7zsozk27dvh0bwrzldq9mrm9vr1n1asvug07xcctr6vunqx0p7t6wvvc0t99ik9s0b7um0je83z16l7r4ouclqn7mdb25a40dta3s76qigvkttlhvvcpog5yackqcovv2udua66zon84bap4ua4qpvnpartbfe44sm1dx1r33rlchdvdxgmqhrbyn6m5j1jcz1xikjgyoa78nxjrbh4jrt76b2mkvdx0i7bvbizd9hrh1t5fdp3tlk91tibw7pcmmyo2u56nh1bx688whczkmx5owf106xfbvlh4917maixq84yvh1ej34naioshciv0zckfr4450btkjt5450i0cod61lgqknnophzb7zkf5a6p34yok1zkahh8vhu856g4f9t27e4jeht9ybugydodwbh2xtw550od4je10sg11kgb8lnfpqe649utdv6ga6iqte8drscawepqwyyt0fkqf95yyni85vk62q9b1upvl5fxj1vjyvwmfr0mg8obn4jffcmeb2hc3c11ukjbg8x65skwx4un8yars27ee554fip05l7sbr4dacrnrix8skm834slfjq4sluzbxjemnewir9iqpbpe7kt05in2we7v80dfcof2yrbvvz60uwtahzqld4lrm1qev93ye6jmr1noehesl7ac21syh9r4hrcgb4gledr75of7ga206nm4xumkkxwkie5cn6srur9nm0o9n73tyy379c3sn4xudwx7ld5t3p0wrtksdof8ugay8jvlvdyc1cajny28100afyp6caemalj6lmpdkkg0vsowhbegfm48cu8abvdhowb7tjcz1jabtcvreohtynh3vtxr89z0arhse739zfnwv070eh6pvty4celt091ypnwlzvhrapwexzkna688o8afh4bwgd1bagicrf82ectuobfftde7q3vmpn5bcb8514v9fyhem51uq7fsz00ez91gm9jsasfeigtk258et5u',
                proxyHost: 'sq398cvj2bg9iebfmafq2ta8in9gafh3k93lqfoa0dyl1vxd70furura9od2',
                proxyPort: 1829698448,
                destination: 'p3zy9xg670c6zgu95cppm39arbsvvzcxqr0tu0nc3wx1gjtw6mpqp21u9zbbtllvi55ubehi8qohx1q2exrx57pr341pe1k22s1rkvszg28rfr0pe7yzfqd76oxwj011oucj7wdktq7mwgl9z3vtfropu5j61rlk',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '6tyqlhy0lf6jeekemcxiqaityxv0pblepr6g0pmuakvu3uuhvoixkq3ec0d7st2xa4np8bwg91w4noyocc6z8xyt0rh2zvw58x10aas28wy60dp08o14hzs8t3gjp4zialrb8pqadrdgna3hfb38bcuq9htbi8ex',
                responsibleUserAccountName: 'on5h41cmheutsiuiiuig',
                lastChangeUserAccount: 'p7snifqam33y6ewjn4lp',
                lastChangedAt: '2020-07-18 14:32:59',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceNamespace must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: '8g1spdth1blogbf14ikss3pd3d9xobrfnfdoqjs8eb62zrj0sz4kv7y6psh6shhbnasyxlls28zcgtfv9x6csuogmxei8wpy33d4wq5jbdt24218q1dean74ktcpwn3a0hrzrhrx36yl4dgnpy7b6qsxx5q2yzyz',
                component: 'x7l9mihiwpt24sh4tt9c9g0wla88zeapy84mwah8ypb9u0ky0f45ywmqu0b1ieowdoj7uk2pjev0nm65boz8d449bvryxpc33840r4g8kkdw5rv5u18cr1rmds0orpqyxllkf9cgfweqetb37rvj2zmy9elcs91o',
                name: '5e9dmj45sb95rsap3afc3e5bfu64v9y932kkzqx8g6q4oin1vgv8quy3hnk7o9xu64nb4u2e0ugeyua9c3rnbb50zh8wlwuxp8s5xjyhy00luxphpeupphy85jxfdfu0rdi3mw8dpcyve6gg5lhn8qmldekha02x',
                flowParty: 'ujx0rmifeseb4nz2bk0dzoiyh8elm6v49myqvkq6livh1bxxyyu4ic5u1crmtkgyow69eh077wiqbhw9u2h7wsh4qb3z6jw5z10svwg1p4mj8y0iiqqwapyd0a1009wtr8gwlwy30jbiyxawijhobdfn2hj0k4xg',
                flowComponent: 'a3g6m8zo05ujm2a3x588ebl2eh9p5olux89owwwtnzqfdqy9k1wg37c2eocughejaw25d2xkzhajcqabrhxk31u2blyzaxwas9uzpicifsc8z9jf95e9j4ds5v8epi7v66f7ij8yflbckedt03uez7rqkk8v2rqq',
                flowInterfaceName: 'lete9mj608bgrjx4369te8v3cvxeoasgy2t5h2qv6pyz9xew73rbo2vlx1ix5idemmkmhno1iophglunuc5fp9trpdrewuxs9ie3ayxvu1m2qi5ycv4jnsl4tfikz3pytr1ct1ce8dtnzsrn15zk8ly5j42kfpfa',
                
                adapterType: 'gllvyg5lbge9qi8o5wq3tlekmiocowow7mf2pl477ohwberumbvfomnfx3x5',
                direction: 'RECEIVER',
                transportProtocol: 'n6gcqaujtu84hdys5doaltz0dyg7y5te0zs9jq6zwk6hv2ntnauaj3abp98w',
                messageProtocol: '80i344x8hrp3dkfklvl8vhggbb8qh2ne9kjwk30lblzalbkv86t8u0a1myen',
                adapterEngineName: 'o1bkwihi6afhcjdthpvvy6w4o4fh9btcnbnsdbnrd1y2wvwshnjewbb2wi7rl0zffdwbh07iqjiyl3n0j31l6jtyrvys7db0rv8zhkn7z21bs75bb3gbq066w22mo3ni1w0evct9wfrpr7418y8xfxplwu5n7ppw',
                url: '37gmle09r8lygbq234ajko2cfuvddpt01275n8zbpg46etx1vdl756mf8swwrrvsud69fwhu9sypw0hcl41zvsp02gtmrwv1vcf5c933tcymm646wlpfb9wsarix37rzqfzrztbls9b36mem4jzczogwimzeoexukq588wv0r76xuy5bzdcdck7s6uqxiw1bxjhwnnovd2d0htvve0h72dqqtwjoony8mc6uav9bm65pqtmpoic44jdulloewuc0uqjafejghwij3pgiuo80pnatdso5yx8hd25d6soekyfaqy9vnh0qfpljhmvi5whk',
                username: 'fnmmici8gvhq5dqla2z2g17xu2b04vo66ps952fpwv4im95dfjc4ebansm5e',
                remoteHost: 'uubkysky6clsf5btjn8c0ds5gzm1mlwo55gwuy7dls7izndu4krbip3jtkfdrf8gb882pvsocot2d1uz32yfsuvp83ps60kats0a840zg7r88hz60m0s0ljpjxze12m9n6ycpr0gf889cpaugvc104qxyqgo136d',
                remotePort: 5206087186,
                directory: '2nlp6b69bjjmor9659792o4msqss1paghfbjr40ccv51c0pbw6q4qp1nzcu05sb8etydbuw3vdqh7bykailtg1iscuux6k2poqt2vd4nl350xxt2lygwu16ay1i0hd6cbdv6891acmy4reh4pzyqaqqzijm2hpeixu9oxj5pdbuqofiyh936yn84oyt7vvmiu4xaisdzmf5xaes1em79wks6vs2ws2gfufqljs4xvttc1hma0023ke51prxitkhzdln1jpg7dnhi58ne1c6u28c9redqx4a3985f4wkqg3dwqtqo2rhcmdvsl6nh6x2m5wso67h8ewz07d5n25k7uys18hrizp08h2xvnofemvhqkpxylqzno7uwc9i5ko1o3kjskqhqheo3783xis61i3zo0m57tvk2vebf38oaowkf9fgb7ogkicye54sgr7x6qzw5wajobau5nbwqbci0oarwum0hiklopwg450xti9tvrfnt8rtlp7n4nh1ol9cwdpsa3cqmkk6myl3tarpodlrivtw4njvool1tuvuddscuinp6ohl52m280serbkvunxw18zksusgm2vdaace2cl15wi8jjguv43fdeaicrjb685q227xgy7pqj9i5k8r8nwi40rmt2xobhwaqmiqxvy1c0pzouoi3uja6pwzrrz6wzgl4ajjekv9f8dzacnkqkxwngngz5404fnzkalj1j23hp51q7lunwisoq43e94d5zmdjpr50qrehp3b756n00oswajy5an7z6cs3pmqkdf0boicyb0zyyon1txtqdd4xexrvfzq46ws0vjz0xyrc2azkk3yfwqrkp9plkkghstj6rsdupe87bsto6fwosw0fe7jh7spmenwb5hrpd17tjsj6b5slya9vgd77arzkk8zkd57wrcnyeja2f7uzdh0ttideujujvgjpmkhoaxs9jxsmhwfwulefltl0qod2nngcoq28t3tdd681mfqdgj7kcypc0j2xwcixp7ytc1ff',
                fileSchema: 'fsxlb2tlc85bdf0j5m2xm86n0w4cql8rtfipi9sf2grtgi7tfxfz056u1xwmwabzxzpnzxwkokz8u4z6fuptu2egc64jy5kqtbzyfczqq27k7aczhrf6rxisyd0l8x2rky981o1zjftuidlxq6npdb6qo812fipsqdk3i4xdn3h741vgh228yr3p2a6xix4w7iedanqk3d2imzbg5u5ri7t7rakdpy5irc7w1i7gvbl35wqcxfv1unl9e8aurpmy27rqx5wii9fb9cs5l32px3zg4kacqycbk60rbfsh4hhygn40hjbimqgpv0co3oaafli7q3weuvg7rw4690ooyd606a8bdvl9rjomccp5phawugscnyc8kmg3x7b07m7xay8p9swq9q7twgy78u69ye1ygsnttku3d1q2oainp0n2c9tpblc4nl7gurcii5uthuppcw91wrd717wznjo4hcqwhn3zesr0iggtd2nropil07uce3ipgoshlaiysse2bimb9cpc9if4m1mocxyxbsdwkzrlcs4acjxsshnidfueah7xewrtbnahhjnpsx36m9mbpwfr0u2d32yyjbctbgdeu7v9qwixg75d78rfnhndsst5u7p1gff6j52k03mther58yce2g9ihwhq0ohxedenq0g3kdwzanshmrs0i7fvzv2fsf7grxbmivr3sk4w6n0jizbvk0nnwjwjom91ivjjx1zb8n1fhlox1cwqf2gm7u4sdasn87smstf63rza4bvh8m4z3qafxw8557llmaokxjp20m93h3zpqn4zj5nigcndfpguz3ev662v7vnsbiz0ozwwojkfpslaxqldx06f1362c4yo16gvvrlj4kumq6vzact6zyavhsnqluqw2ch3la007j68lz4wjnwo7nul4tk0vrelleb66qhbcjc1ienlqkrjl05u0la8yaxhzv5i0d6xycv4z92kk6ret8f0p3q60iydktds0ixpgpfuk6eu8bfxnlfn6y5dh1z6',
                proxyHost: 'nepedpjwb2x71jkt7e53stwogq2a5222y101iuaze5skh51g9gdusmtc5q2x',
                proxyPort: 1459609242,
                destination: '1egls6d7vx29v6izcof74mxjkdkxm8ipvq8harpryrprckd7mfzlylqf09x0oiyc0wuiahpgit610i7qt3dwuhr5v4n0kspf61294bx86j09eyctne51i0m5w2xinshp63lduzbamju6gxn1zherz7cyx8jiptdw',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'icwql66zlsm45mda0neiwzlzreyzg7oy0hrdfwv6h8hgkw8iwhsehw538t1b9axqwrekxd6jifj7w4q7gtzr799jups4p7h2ja814y7hw21dz08zoyzgujm7jihq0djr912hhplutw5fbze03syge69i54bpxeaw',
                responsibleUserAccountName: '35r5znnxe9sjrlek5pmx',
                lastChangeUserAccount: '7pq4o50m5dmctsqnbvaj',
                lastChangedAt: '2020-07-18 09:16:02',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDirection property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: 'y9v0wn0demxnrc6w0zzhf9ltt75mvn246nb3fca1plsey961nurvae5o67hl7bm5pjnyxy5x1wzefrerd0uwrojxog86oqrjj7hroj82ox7w6mhtcsino6t7pficc3zwhcl73uecda55189y3et5to29bbbhx785',
                component: 'aaonq6e2ftgxeanou5oeccffh1uux7xk3dvign4m69xnkm3f24y475aoo2dnsmlojtmsnmj8z38u1rc02v6jvr3yhmbqml7nqk68lns02q69l9bjiqr12vom6lbaxamn7bvm6bunq7dob1snk01t9n7pjlpf6vjc',
                name: 'ilgmzvb31j93ibs6by4f3xws5sad5rvbxwcm4bfl80xjous7julei6x7yav5c03nltoabrdler0bshjk0miyu1k95ldy84cjymr035m8hvm2vgi0zx110ka6oyjw1wgv8lwn31hpgmbvoj6plw4vsdigejeaj5ij',
                flowParty: 'co64yn4rbyusgrqrwfr526gpcn2mw9behls1yv8dahmunqr1urzkcjbec654mpu0myrwst07ngqfuwxgl8fqkh0mj7hxdg8o3zb8dbfsmpyh6gehw8rgu0gdk2oogfrdarjk193rduwufr1s68qjjxwmuzfpvxiq',
                flowComponent: 'caaeykj1q4yt96t2w45qnfhkh2oow3t2fbwy1mqz7gc2t7gpguau3jkdr12sdbp3boz0r27qimxhag0wno73l2mo6rl96az9vvepsgpa3sm37xvg7p5a4ab83zexcck8bdkns5h46sp6o4dh10wei5kg215lgj5c',
                flowInterfaceName: 'ov3kgqv78mmwwa2fo5evhgiwrlg8pvli8k8omlf47bukqj0fmmgym418yhrllms6vji9iq441tv78dyxixno4pm5vqxvtmbu4qz5uwkyee270v2e7k51rcejajwifgchs3g6crw8556jkbgqc7hww671lr8agc1a',
                flowInterfaceNamespace: 'fsi89263xafab0ms4wn6s75f8c64pb6ekyjds9bhib6cckkd14xj4hnltzmihfg47gezi8woc7v0jrjxarxt53kau3iqau1uf85xosx5gf3e3oh3gbg93oydelhzgwz3mkaox7xth6k46xd1y0672wpzpajzkigl',
                adapterType: 'h6hc5oszpvxtlc89g3wlbcyubeeml7vd1z15fqmcw2bmnwt6e7fh746zoqe9',
                direction: null,
                transportProtocol: 'd44m97u9a15gf5nfz4cahkxbsg1kni97jnpmkzbx6mi29qlrpdvto26qwren',
                messageProtocol: 'e1tjwsg6qhxgbdlw8a4jcaeqw4e5jqtxh1asm1kjzd4a8udfji49uo7uhuyh',
                adapterEngineName: 'h4mn4mcdivyvuvfkjyjera2tb90yc8606zfz3jyh3y6l8v0ew5tt5h4hij5bgaoejdtl6wz4lg7iq300m3dmjr0qsi9ggcal7x4ay10osv4igswhinpn1ctgp6mfck2gbpdz2drolidzi9rffzu1imq7ade3dh3e',
                url: '6ltmwqx613clmajvt97aarg59yp0q7lhin9ho58g2nvrdrjlgxxmg2qmtrbkaweas47oi2rz2jqt1e92ux3qxh6w9zha333z8pgzqd3e7a886htej9mccwis059hhzc00x2ubyx2mfcvtpn0zr3xln21lczlm83jaa3bo7cssvn1fwc6law7xifz2hqlpfhgjou9we5g129ey41z2w3opttd9432y86evpzjunc9gkkcjxzrazyrqa57p2zkjll38s04cuyo8o4y3ypxvvffdd5qcbxgv6wvupd2eyqpvflduwsvu6ju56wtxptek9wo',
                username: 'vkaub53pjfbufl8lu59r1kirlxij14k5cyo6xwrx29z938pxb73qcn19d68i',
                remoteHost: 'edfv75s9heo84psa0dezu22ufw4w969a829kpkg8chqnjoonvdnxveaescg5dw7huq4yuvego11k5ggt7o4hlccqua5115pvbpula10sl4l55s51i40sdr5z40ur5yezssgndcrz9pukdgowgvjy38jqepdsifw3',
                remotePort: 9708772553,
                directory: 'lr1q1tni5xblwm1xx25qxq23uz9yljt34gtezhvn6q2hqem7utl9uue1aphzf71ksd8zaoykupkrhrvqj38diqcegrntoewvwk9m3g0zyruwq94xo16tvusj6br1oxd2wksfyl14z1exjynro3fiizrhg4skd1crfdjb5xobqs961wpfelzm4ihunaz9b1hzmn4bgfge7bqsxrw7z4b578gznewhuo5amliqqdzrovuxi5ljbwhbjcpad3nzy6h5t0yxhaf2aqraz6guty246cg0un71xpgsfd0hjwulmcmr430y0vmz7vrcic5vqiczztlr19d0ew08ic4lilmzoeo8igqabt2479dxohl0zl96wbkdyk024eck5va8ss83wnlt9pb9qa2dm2ce1yy2mdta496w8oxd6mphxjt4k6242ns37srx08clo8trxmuhtft83bbzzej7iiqnmmq1kmjtf33sbrmipis59rf3xkff1t1bomqr7hccze787m4lm8w1as9f5kgu3l5raj0hxig2nrygh3jzwposbybjpbiubwz5cf1a9o0k78zv3k2q9j4a1yle4whioijlgm6q80oge0o58op9kgs50wcwk6w9k7u64s0rzziixry8ehf2h4kxktejpymp97x5ctwsl01tsnc7fupvvt3fztuzgndt2fuocskbp6y7hk75bkeloqttyynf7tgahuw6882lhqshiibvju2bzf7vvbgafnt5acjl2euotag9a2uk73mvxixju49kbbqmxx65lcjhpccf0sbgmah077rfx4o5t7qdrbt4b8pw5helzbxcwsxpk343g3jp7lozdd9o38p8h4nx0egukddq03lk8idhvxzp298gx76o5vsqolsnbc59dsekrmxo17h7re4690h3pfwe4h4ur0fj486fph5mdwd5wl5dxklol5n9r0ei3644dl5fqdb2o67nb8jvj59io31z1xxwj7lu9ahca7ux55vswaf3k09k47wl02hy8gd6',
                fileSchema: 'rbmm10bqgrfgxtwsvyg3vcrlebodnrnrz3m8c4ey1t3cb2jeas03eifjbxu6jvoo1zhwjr34mg3vtf0ssx763mnmromym8b4od3z5qdf6dyl6k32on9pgjaa5ve12qfq3rfsc0lg8zxpjpvzh1mkjpdb4ho9p9daukfb8ii26tbhs6j1zwrqdrlacjjhs70cmgbj8avqqajrr2pdre6n1cabe3akbgozh3tk5oir1etpurfuzv0ma7zxucy09ie5987s0b7i74abgnby4c1d3nhlfvs2rm4k5xi4fv50i5a2ac286zwzzqkv33zut0zquzv57y5me11i6htbqo82nski1c08b5ekq4pxjtzy9b65b2f52q8i4gxxzknsl6y4bm4wxkhywl5cz2ru4zl8ybn1h4zmi2myvy8vro1tzpp79u6xmrw6ku1fgqi5jc7vwl5p2w9wej6diugjh078b4sk02duow6fax23zkiocstcji0rncccmrmvalkfyefkhyogoogjwk2yvidf5384qjn06di12j3a3vfly32mbg1thcuw0sqmt9muuvfi5e0iwftd320gte1lpvd4cjvr5uxxarty4yyokizpqby98dww6isfrzil5j645t0u3iysn6vaxtv5hjmpnt99h79xnwq4ytjv18kkb3wtjm474b0uxlp9syq6zivew77i7xl2ps91j76njaiqdan98eptgokq2hq9hpbf2gph4iepspiuggttax2aq7xak6419v9mk4fysitpyfhiqimukygkxqymjzaj9m2knhaw3ogl99jvx5r603yb49p9ebxvw2nc8gt0g4nmp56gok193adu2ka4ex09j72v2j66j1clh551vcpw3jhbd8rgcewrb8i2ooc93sg31dhzh0pl1nb0pjpefg8ofi16jva1wd2zye4ka6wd1vi110lvfxxxm74fly68gh8ga05lrzunmkgze6y45y65xaoi3mucexr9k6up8wkruy3qa68bmtiq6mi2',
                proxyHost: 'b1zzjf3k3hkjcotimlthlsvwgx9de7hepyf8r1lqhevqvzyey6sbcuslaw6d',
                proxyPort: 3816774333,
                destination: '2jslp2fszvo34m94tgnozm29ouwmxf8m5gnwsqp4x7rwk4rdgh91ha7ys64u76f4el2kyc1dmadkpdidrkw2f1g51emtsd1q4cs08u9ns791j8cy953u1oqts8m1mus2gbycl5ir2xrhx3za2944lp6rvrn8o448',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'enrchizcvx0jjiecr6llocvaw0rvqq1izfdz0coxj4nayvedio1yu7zj3g2ykd7pdwysg0vqz463tom44rke2d07d94juluwqne0islt67j66ny8wizyly0xwrqdk0zlof66ot68v6hdska4juxgqz6lvnsfdhfd',
                responsibleUserAccountName: '4l3pyo4ecukjazga3ltq',
                lastChangeUserAccount: '6crqh78oan9xo6xzvplz',
                lastChangedAt: '2020-07-18 16:06:00',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirection must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDirection property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: 'yu8zkmflpe8fmuxhlibec9mbeagysl7iv4av52bra5qe4nsbhy1c564gwt740eltmj5nggue9q2n8p5g3nwxtfqr1wozx0hg8sqlzd3nuts98khk8jp0hbqnz28k9djv6zk7eipneqyzr1c72dry9prj2rb7db19',
                component: 'ailusyml2gjwgwz9lx9evnycsapxmm1e2y5yr7lf10mux9ilvz1ney9mc3gpd6emysnc6f4m0a0lkk7jnw7aco3bn48nd7qy3038mbk3zd1tmq28gxb6euyb4zermh3rwqu54c51xebvx0e3gd7iy3vx1p9qczlv',
                name: 'xomfixd0jqoki4myy8irr9wogjmlytssx8x0p831psjw85ho5x7xvazrwnpzvtjylwe2ht0l2scfcrmbzm62olma6dsgnwj58r6hk06n1yj2m5nm1as21ewg5x3wrflvsuz6xqv842uimuhoj5fjcyjmcojwt5l3',
                flowParty: 'v9h03axh3apu5wzm09rai9mdyfkewvguab1b5icbnd7dvajn502evvz7qyrglg260busiukse0l1lry9korcjwdsddrq1ze1kmwpshwbljvkkvhb000fc8qxq332lj8ifx7snorp49bxbm3qev0r53s2ok9n35gd',
                flowComponent: '7sht6055hv9tt8c6k86ozt0pu5u10bj0sqx7rwsr08zvf2lv9vhqwkj2deezpkt5chpotoiaujwoblbwng63g9y9rup6heqklwa29gceu0362oohiauujg001hs6uotpk8rgzdc87ap00b5ehbq68fuzychs7pwg',
                flowInterfaceName: '6pmgz62q381fh4tj6ls2iz2vit3pv62xhv0vy9xxpwpn728bfiwr2fr9df2ph9vjsubnvb3wylsef37dcsn66qkn533a9fk1480um2rr4777yr2te5jtpskfo38b7cplgs8ooup3x5y5css6kcyz6x61payqdqpv',
                flowInterfaceNamespace: 'ndzd97ptqlk3hejiszxsbth6p5tjbr2ygk497bkzka9jcsfb7mv625oc1b5dz8kryljc82pahqd9e4k3dw3etp0nqx8vic28r6k1dg1q3fecfew4vyldj4kl97pzj46a2xilvluiim1658xp70sp542fu4ntrp1y',
                adapterType: 'vod3tqj67aezejdh1p8zrwzp41l2dr4mtoiil1we82ulxe5m6wuw8osha5ea',
                
                transportProtocol: 'ocdvwfeiq7qmzbp354h3s8dxy5a82z730itgocgq1cwtmcg489tng66v6bys',
                messageProtocol: 'sg62ihact6fizfzkms8n7xukf62b9ygqj2cky6zvplwssg7pgquhk61m78ia',
                adapterEngineName: 'abrk180wur9yx6w748myex0b6lpbhaegslv5projxi96nvu19iwnukufqy80t1srmxqqucu2a13416lwyri671uxt7btbeqp1ftgi2ow87jec2oes2ull8gbttf23qho73x0vctod9miumqamuvgjelgnu1gtr79',
                url: '5tv9udr6yjbd8uxodf4ws6e43qso12ve0idhtamamj23gfkfuy50jxg715k48kr5tm7v7qxnt5f2takml53jsfdzi90mos8b0m2m4px5ex6awkbw57y8lz6tlv28i5ex24www1az9ln0ix1y7mcklzbazk8q5m1srqf21w1335tvxvhbhekw9w8mn6v2r01e39djo6agx6sxm5fv2un984t1md6qm7wxnj34vxdko95n7gqsfenvbzn6pmfadr2049fw5py9esxboj78fdifw4taf1knsm10drb2klo0yt3qrc1mlduymt1yo2kmcx16',
                username: '45ne4ib4ufskkkl8u6vk91b3kuzmw4t8z58d2bemkfp73pxpxs2ncgnodd94',
                remoteHost: 'lcdvxv8g4oh5fb0tzi15iguy2zbkdlbib41d8rgco9bzadchfod00zbvtyd1zt2ez762nrlzq7wowexiue4kiz2fm49v57lupwhx0msyvtp0kyptd9eeuv2p84fnadbk60j36m3tijd7enegdjdectu8fg153r1m',
                remotePort: 5048797605,
                directory: 'gmkfjc1956pnmyu2yhjq6blirk519sl4s9ovgm6nxr4atnshsrzq0fkig0gyunixyvj0037src1m9qeedcbhz2hw5b0vekk26regdx8mjg8b35xqwhhfnenn70sh0zjub208rtksumlga1nrertrqocw5g1sy2pra3wjo76hjhedeici2ii2ip2b2qqzl2g4gt0oetlcjddi4umhdu48891w564ipgb7jhekh3t83xtsibooghd774pymnw3uqjv350scd6qgcevas2s32p0rwl9hovzd4js2kjrwzcx9tvu6yigmiltfz53hogzbzp4k6ss5fdayjeegkuz62ybqfj57w353n9ozr6xwtj1mzo72q1oarcronsg34fak1ed40z9mlg33lpj2ceamy2ibl19aj38pc4xf2a143czl4z4chb83ts6kzy2dikefhnhnrcyeti4biwguspouvvq1hsksww3y7hx4qofqbird6y8u30ta3h2whmicexng99kgbc9ap6se563fg56hdrzmdqiskd01qgz66swmz46xrgtnya0vw1vb4kto8w01cj2d4dhz32gzrj8qzanez8eiwe1y4rsshy77pfinx8f2j9cig419x3xzrqq1xyucbuh46iufyk8cnw5e1nu70i5ea3zh9x8lq41qeyi8mc2xzoxotjjcjywdt7e7pohf2tnqskh5v1bwx5sporu5agdsto1h2cnqhjsqe25kw85zgc5qod0d6jojcpofoi5q4j9kafkuxgxaxqfzck9z0fes2nmfo51zxlad40ml7ibhmbm4lt9l4e16ziq8t2roql7elr6a5gq3b3lgjcrh9hthjprjxhzolhy3l5aw4aj9gz4ys8hk9t2yzn7mequ488tenokcwtk5s59dyfqdubfc3xpt0wy67cmuokn1bo3y92p4b1a45ni3zvm7uauoij63cvghr0ngkjtyer8np4blw2dgwisjogmdqne1y1wbq30d780a3rsniayxtwqats7',
                fileSchema: '3cacpu68tdhmhunya7knbag7i7wde52k62bxkxwqxqdpp6znnj7xp0fz5nqkgs8fg5kj0pkplmtdcc1ebg882ogz91xrmbesrvhb8icmulc23n2ee8haak8rmo2yfadv4clhg9v6f1fycc3zy4lk8hsypyitdxcyr770kkwz63e0omzn94lqbvd1noorzvs24nr2rh1qpaj2jw58153lob8ju2wthqhnyeh0hcqh51ygyiv4xuofkduc8knewg86uzpw91pa9kn8xjp1e0wr1gbbe4awny6ajbvzndzxtgll5cgcu4v9etwmscpwtyhyg3n6w8hocf7c658ovnnk79puwl610f23elpvs6nlgt748mmb567tpe4ioeekacrp1u81j0wm7ajze8kftibjz0p3nnnt9w0m3x6g2o8o3h4prtvl4d1uo0e4zecx4hr7xkl2y2w0dhilex06gswfdv64aj5gazgsf80xun10539tmcya87ftypvhq4zw675pjfe1ej4j4ydcvpysoqfkhekv0yvmaae1algjjbntb3q3nwzz8lwm3iissuqwo5oiywyrdkpbxkkyzxwp38j2wps73kuwnlvfb3dbm1eve2hxczsqldjqdl4x5e0eyuyy7x5y76kh8bljde9qogl6y4vp65k54m6kqhxbkfpy69c2h0tcuhr79lysgsjjdhoixl24p27ekrcwl6gkfm5smojlf44gj7n94pmakw9cdrj86vh3jqnlo73ops3g4lqtzu436180qh3vm5qpuw2rka1yf07x4tqlxcr9k2gkommve50ovxuttfyzp2nrxvkkrjw55f7adkwue8yzzdemk9xq7vol4qqrmqnyv3nhzxj8vlnhfni2qpv5lebvnugkn96bg0gpegxcgzhrpm86f2f1i6lgdnt3wneq9wpe00354jwj0rq80btlt4akcix4va86obuu0vozk5lclmrojdp2c6qi659lwj83zp0kt38xxafz68ljbzc8xndy5tgx',
                proxyHost: '1zeo7mzqqvdmobf976yoy6fzdwruk8ve3e68unt5yuztwq4wwofgynqzodhg',
                proxyPort: 3902535497,
                destination: 'gojau2im88sexiccfo9s2wz7cn5zb8pqox4ib16tfwq19uc0imtellmlbjxg1ujssowoo6lryu6bqj0bfyn7e1b5pmufn3ffv8xcvb5xd7ra1fu624hdhc6zhy78bvt97b4f8o4x22z00l16ewlha3lddmhvay7i',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'zzyu3g2d1barumfhqso1rudpzcqq1opup5sxupmx2muo929cpnrm1re8p435u6cmrt4pkgq17d9gt1azfrftxrc2kv4m9enx56bx7bjwwu6rtwwr8rkt65tgd0v7pty6hzg4j8uahdobp35n0nqxu6bqfbci4ttn',
                responsibleUserAccountName: 'mjzcghin2dttgn6lj272',
                lastChangeUserAccount: '290fcu7ke5xikgj2g5kf',
                lastChangedAt: '2020-07-18 04:34:16',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirection must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterStatus property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: 'clwtq64sgsyp3d193316nnedg91ts7b2vtk3jgtrmkyrkay69gs7sjuwteatx568uak4l1yflqnt5amgzr1twhwqc3xn19adx5ktrdfhrxh5vceom0da46vg5ra2ai7yjn8y6j7czhs1b6yfw0vbj3tox80m1up8',
                component: 'lnw45bqhwaetl5524ggn7x67gv25x8o4w628p9i2lziboifpl3cl2gzupi5kws6gpdixwvlcj6l1nsnb5e1g1agcd0y705ucw92tfl5yk2bkjrstzy7m65lrmw6psd2t83b2p7hwy3jtjw9zb350km0lq7qj0e1f',
                name: 'tp4aax3sfkh448sgz8bnmu4g1kjbx3znnwy96yindo65zzbnmtm5o1tr5lkdm142os44eme4gjgqun029z1ahk8ijlxvkua39shytfvlt5teg7dg3y3t169i8blas2puuh80v0c0vzkgjro6klujatc29lq161ni',
                flowParty: 'a3ekt8zwudin1nu8dpi7p6ud9ptp2nvmp59m7yufn4sxaastw08lb1fpz1nym8nt2hnbyuvx3i5hguos1l86ulzo2hip0a8jx2b3b1xrn112hc7farupod3s26lruumzcn7qmhpoionj9422u2g4nafut5xyqb3b',
                flowComponent: 'jst3jtyz9ku4cej109clnx2a1rtuagmhokfqez10mpdv3q128sizi8ijzrdfo646hj8sllbs1lw05oom9fe3u0i871fwdq1xtm9kj539iiussoj4jg6t872a9erdcb58g16l9sw58926cy05ttklknb3z6aqx75c',
                flowInterfaceName: '7o1zrpea7co47kuwd0bgtrq1mi1rz15rzy6cek1bgph6kme4z3l2879qmvyxuus74z65eryd3lx4igj075fgv2u95kubfzr00vxexi8a2ydw6nivye61n7iqlayi71g7gg685d8rlqg0xjaayt4s1b0bpm0opni4',
                flowInterfaceNamespace: 'h66ya693vazgvaiwz0di55rg4cx7k9ilmh7892nmv8hkieqhk9lxho9pgxw28yv536p1vuybw6b55g72vydndkiv3odw9tnxd0cyv322hq5zt37v1x821aht5fo6i6vkqr05a0o70doba4p0mzkzbwhxa9js106d',
                adapterType: 'b5u2qscl21h72c3d5xlghkss1oszdd8zqbt26m1agkl3csnmlog66uvif8bo',
                direction: 'SENDER',
                transportProtocol: 'kcdodao5847f67ja67op3904z98a6bbj74s7tgm3li0ca9dzp8deqx0z447r',
                messageProtocol: 'kyo7lfndkfi4o3f6qpsr63d5we9kwe8mj1hd6egb3vnvte5jny09qe3nadv0',
                adapterEngineName: 'uc3qhdalzfk6fdkm1treu6drvq9r0oh1b7dexfo6hpyvcbw90tnk0f4g0bnoaeatjrnimx230qobhwmw4do0bzd1x3f02kkg1tjlqpctyr0cez7jlmgvqpvasnm8elqzc16z82j51izzmhkgtycfmr36ky9wxyxr',
                url: 'qu5lmqkhvr60ixcgbr1c8jr7y65nhz7fytdnufqiek9069e7zzokl0odlqknsr9dqyf2hdzdkgojg2tlaq5dsmru1srmbsvm80jvbvfifaa0uz8ttdukzzkj2mwr1nt8houavuy44f556dzgbd3hsie8vageo8myhaotv49ei1n8x6h79g3kgs2y6j596cgk66al18n9kla9juv43548rln8hcgarkkeh846zr4wysak45hzop8eua6qsejfyepwy7pvlmcpu5nk2vqvqwm1o552jle59v50ainq7vgjoqtsyrj7h5lcyzhqyvx86tqu',
                username: '8j5kcivjbhj0ao6vk06zoora9xzyqdqfr1es12kqoe98mkqsse413uwn5vnz',
                remoteHost: 't83o6fklt8igiap7c8up4r9gtnd2o6pk338rebmdw0a48wxyrmd785xr0ihoo2ba0ao77ked9qzimdo4s2r4op9ofokj4z7gr3die53465mccyin1kxjdr6h7xm0d42tqp7uj9ddy6np6l2czbhmwwzlm58mwcmj',
                remotePort: 6876243818,
                directory: '21jri2t5jga8r4366qufgj3640e03gfpbwujb2y6s3sfel963naysvbe083cys06zu4vvjj9aguxqca2zb3knwv1dmwulj66big5k6g3jqlk9c9cj4k847f4pcdsmsefa49rbz071ha5zscsjxqqd0v3se0tjh1i6olsche2u67kgnhfe1wlwlxwfco1jxvvulim4m3z2t8o8168dk1ccdu2pkt0lgtztqpgosdntllbd48k3oxug5g6kkkmhwhea1a9gsg3q1pkj8b1n5n4vhlhd3ff01c8gvw5p2dljqstcitubxk3z260r0q7pbl68bcy3zww3hiy7oliolnjczd5hljvak2nnvvcs9m8j6ul51zxv4951raoil6u8n5tj6h4l803jltxfzmsimp6z3gtibn4c265pofzldhb2zmq41v4z66i3kuwk5tk8clblw0vrn52qw7iwfjgfn7sjcqr05ezb3yh24k8ajbcd4uhz85a8dnhb9lth6gihsu0p63wkj3byxf0ff7ewean8k6bftnpoxo9ja6rs61p7ha7j5i1nlub18kqn4c5b9pqvs2a61xehy7ows81lhmtsp2f55s2b87knpwj0d6hgop9rg2g0j84vw5eyzyq85ltrgvw4lw2dvxwgxu4l1bk23qwd3bj4keq82m2030svzbhbkpt9y9zethr6iiv9lyketb14t00ljrwhgm6ylsufav3f0cdky7ndzkh631zwg6rv9c27eo6qfvvphcq6p4d6r87arb2royhj9dl7id1tji9vypotvdhtyk85zaxmc1208s0ywbp2zqnaw3aqidhfglxzxxa6mb5l569gz3rsqcvkhu3v5wj6rxou1rxv8ldzv5wub4mtqqpzhr6jpcnqrbjtkbd18xk6m78hk9yfbx6l2p8kjq372ermdfcwylc60jnprrxonsk8mac7f360m50a7vq2lxmlpvmyyrtmpi0moxrid66aq28ivubj2gh578ys2ue1ynib13xm5w8',
                fileSchema: 'zjxyx9rbhwjgzahtj0hl7echpprixt4t75leimyvtqdzoqlbugj44joafcxchmqfzdt2itv9r7uk587by3s2dpbblyetme1vhpedoj14ei066dbrnmctzvwwd2tgprj9qaeqfoxdhncw2olyvspq1ogfp9defnfdmoi8p4jd874xt8h33jpdpupituwyjdliu5npg5udgs4rkd19hotkdt4uv0tp1t6mvq5630rwe2cyysoeeff5ouqtm04sg2anjlzva97f5hr0cdwt646w9mry1old568lu964qxxfl8tis5eni5vfil8alawsc172qoj2v9ya33sx9v3zvmgdhhnh408uyritowx4i2yu8spwyz9u0x2n01rhvfsui6k6cvnhe8vwop0vkdai7mar0zktm88ndflphmepemspgx9qk66jyo5dnx57q9ryfh6xqwc4sbqzo7fokwd6bgiobaenwn31w2lclxtx6uot2mapet81qvim8g039j2yo74jwjys9uvhg1asih36t1l8ak00ci6eqp3ehb1fgqckpy5xfgzzdn81lgojeblvqbfk8tdrev5qosmpdmoy4g0tb2ubo7kvq853cjmdhkx973psl62wh2lqtsbiicv3lfyrzssi4as4i4xquxtwkwx4k8wwlrnmr6r98rar1rfr4k7ahfmo5grwxx8en4meraa1cum6w41zk7v3lald1rnb967b4u4so47hpjdncbkh5mw1f5jcwtgs70og5mz6f4nda37b9cc3ihi37lbyh5ny9025f91mtryaxr78et6fd9ik0s1niott1vlovczwrejoe0p1ztjybw9dc4mwy6e9s1yguct5q8nk7w4lerkrs8lngn6vxiv51f96popcdqkjhx99l6f6e5709ste9rtzlpbpx4bvids7j7d0o5t7ehpjg54ptevjqbps2ifdf77q12e25x6s3ccnstpgtyqpmnin424cd6n2086v3jjrtyw2916olyfqkskfxjcd0sy8',
                proxyHost: 'lt0p4nn41jid973ey09zqwtpovaw1of7dty87galkcy9qe71jjbivenqtx1o',
                proxyPort: 5487826116,
                destination: '1yyl2p2hbah18hk545haum4keuya3d6x1k466r240ao54dx6jizaxvlcoqweyi1ly6xf436z8i78ymnf5fy4hzo4vt8dsww9lgep7jive284jirlzbwhxce10ak39wxddytkgvmvdesyacmy7ccq5z548j2rjgzn',
                adapterStatus: null,
                softwareComponentName: 'hual6x28mf9k2yusbyn0dr934pypsz8tq8etl47td3djp362iwkp36k2ob4om92ti4zf0c3ur5itqja7htzr83sydd8ui84ta5bi0pasxpt774ilo9ghj1i6s09c9y9nl3yvipbiqu4wdmdtw16158jb9ply0m82',
                responsibleUserAccountName: 'xhyrh7si7topnsmo00t0',
                lastChangeUserAccount: 'zmsd8gy2u9pw5tnot04k',
                lastChangedAt: '2020-07-18 18:24:42',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterStatus must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterStatus property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: 'gxva8ooex8kpcfu2e0617tzfp35s1iukol04dk73ak8j64yx4ci0pi617koajemmshmc1v9fo3wy4jf8nozjc63nlq2nujg0psd6i5u0v7cxoqc2obondey5qsj9svqp905a4zus6imykbojiaiszap5bb637ju7',
                component: 'jm1n9hh37oq52fldrcgqxiihaicg78cseoy3feboqrf21fsf4h793ct2y9jb1q1ulx35oy5j0i9xu3dmzitw0am9p73iu5sycqy93p2v7oyfq5t62q5a1cnscaz5pnz5evtotd5sydjejdgufbespznb96pv9jat',
                name: 'f88gas9trfbba0xzz2t2c9nycyc25ri6c6jly7njftloamupgeo49occ9iq3l4ip0je4n3j4a95peq2qao4lbtpp5dmqvdpgpj5k1jh2mwvv1aztkppueu7pge9xl9bwkv30ihqv4pn1by6mxuwa51jfxul139ho',
                flowParty: 'u8lflydpe9p7u2b03l5n0icfgh0pprginodndmw7ehii6izwq8mfcuosj3fral9rf4dxhp6iw6mnc4099hbjwave1f3ohueqfq2ghv0iij8owuxstj0husm3df8z4z9bfu2dnlax4btv4tpudig26su3uquo4pzg',
                flowComponent: 'ge15rjtcd4thoz3bftabyrr735ucijsrmvs1a9jxohv3lhdouvi09w6ec58k61rtbfg5r42bx2g25ym2z79647c0epgibhfbrdomoshcfy4adzf30h97xmfngpm52d97c2figxxqogtaizqdm593fblmr79a30fh',
                flowInterfaceName: '8a0wpn22heo1owznx9dxi4v9bhqtbze0w54sl1fvc6mmhzt7esvuqjciweab0i0xysg1dk3xtca9179ovta1pacsaw66hwapp56ouimkppas1eyp2axl7d67m9bstnh010kc4rmdvl67xxvt2wkwd52a24fh16gd',
                flowInterfaceNamespace: 'lmry2g1gqxwlis2th7444rga83h8z9kjfwy0deq1vp6xqbkso93lrk5m4t3iv0hh1c2ep283acmfrzy3p3zed2zmdqdjijvxzn0nkz59cpsn7mw2iq1jkse65gtk1z8ub9978rprhnfy5qa1xjszid7xp6w1wgay',
                adapterType: 's2libxgvbunr8i1t9u68m7g3utjqy741fhmy0dnxt4xleucbedg0bnvp52ve',
                direction: 'SENDER',
                transportProtocol: 'kmt4pisgrs76v0x9y2o5xcc985365exmqfbl3w4rziof4wfikr3reqmbv6xj',
                messageProtocol: '0jdvt2z0uz1dfo0qriwcr9qwr16m3gh1c4yx1min05io2jtfcnsiowexyg1t',
                adapterEngineName: 'ys5r74wi2pyx3j1c52q1olmelw3g7jow3jsidlwh9axalx2z334t8yrpsu5890c7o3u7k12utqr9oxo446a164k0ezluy1u8sph5thcka423v79xr5y8kd9tv94ehaxf7p2ddyzpj3vjjl0i42tzgaxx5oxcphtr',
                url: 'tgfbshrw19eid9c2ee3dkkroxlq2x5kf04kvvzbznr243pdphmuvq58mz43ue48sc8ckkcxb69qrqyk2mpdvd9l69be1hy4pj42bgz3qnqmak9nceerw5bid407407ihetdrpaj5jvrbwi91rcab8fv83tjdfqmuyscmilmi7s2fdick23fdc8vethgps0ravig2mkmbiu4sbmp3kxapy4rgv7e48heo2pljm5yj78mztq4j55g5g2sc3dnlc9j4i4g6kz30lj8mry8h2z6cqmve8kiuz5h599slqto0na04p0o7mju51r26saaw974i',
                username: 'if5bao0ay6fmdlfknalo8yr5nuqik6ky25syc0mb7wphx9uckf1yp2pzt7p1',
                remoteHost: 'rwgjndvxvzv0w69hb1dw4ay8sofj7vv4s3us1k82nshpcawxszbpeilw00nlrurffz2bbmvxyz78x8pc697hvo2lz5eoqc026r7agwvx8ix4gotm5ymx7cxy9lwl5hum4952rs02zzlhscw9yrp1qkpwy8h1l6ll',
                remotePort: 5412675006,
                directory: 'v1l0wn9pzt3pb68ohpvee1gxh60u4caxuyktz4xk4c36ppo7jkx09vzeoqh7us5vitsvp3rfffclqjf3v96mlsjoocxgwh7j31scx4nru04nkrlb7l13mnog035bxzeii5xmt80hr6jwnppsb15p1p4iam6j0wh3vxz86pnd4cnbeitsgvdr6skqupyoxc95qvn27nh5tz30npddth3ioc13jme81yl8h7jlyhkplijqc5epay9vcmewb4wnb1gompfulqpbib0xnyzu2k9aubcr7bk688y260rwd3tl7ap9o9v9pbokllcrt3gr9wts3c3sn7f94pg5dsowwl3rv3uevucbpr6uwbthub8bpb9ezc48apepb149l882vio7h8nierozvp1ftaf2cm1ztxif8sdbiam2giw10y2xnri44mh1km5ayrserk5vsb7lq08azt5zyb31uzg49a75ttctsao0lo4mqjhia131mnon5tubeilcaladciovo5i7041b2sbwyhvdg6bpvytz0gn1cp564yrugwcwf0a9p9mw7y4l7u8mizhikyvoavmwpn1mdeph3t1pwcg4tfjz6k7sgn45r17dr8sh5ptwnel7wyewl48evhqiol2prsulmv94gawqh0wx4phuuizgikdkqckixjbi3y84z35be4y2p9g28nhqd90zn0uolf3647xjl3ymkhek9hvejyjtlscoh4i7tiwqtuja33iiqhl18xnbgjb18ugp0as8bxga214auw95ee1d683elsdlkythjrdiimw69ays56qle70k0bv8yu67tx5cjgw1n2j5fi5n3e5hs0p6i8tt8wwfs2ekq4ygcw2k3n6wnc2g3ym42mxyzz7x4g0kd0ifrap9gvmd1hzukvb15jyp5ltpxe6p6m8qol38lhafwbiid45qyxlbxkn9db4na5pg9dn3c8jv3sphv56b7jz7lttzybh7d4mhicxht6587gjvwujb5drq6ep06aizb7s114ev',
                fileSchema: '8lncxgq79u5go7taituqh29jtriarat68u42ad4iglltl5tmgeh7y6pmt9czb9lowpe53umfvtjhpom3n1uk5u72y4ma2dqw989r9i2vs0f13uphv0icto0vbzgqn6mks3sukq2w4nwrwuribbd1g2xyfhlhvts3odoqu1whfprxohj4xecbspds84se4c7d7exljiy3728g7fd628stq3jei3e9tvoqvwpuo7noj0ed9l8fo9nemhltuniizrwlhy782xje8c3zf697feakcoj902teygwq2um1wnuru69amy714thc8oflolnc3a0hf2jgotj63qhyr1cwr4z1n3d8d452obslf4m5m8zttgvjomy2aydome1i7rxtqt4pliq28gwze9xtdokgrkza1ob9afk5meoy1m8vda539rpf7ygw8z5zbfzo4gl8ao4ejmev5qtiq8si5swxsps5y4fiaioc500qg2smxkw1nfszzgal9oqt4677g92jas2z5ktz34pbnvg0x15zd25hcvrflucqh0dv3td01lce2bwricc9bmpronkvk9eay6hikuwjzgte4anbiqs7spi8ummhlesm54vl1kw7eiwxsiko9zz2nc9343jgj9e42bhqbcwh6f8f4asye3aegj1c403vbc9mwepn7dytrgfso8rj1yydlq7olas96hqhrhy8oyp2cu0cqlw4qxhvbehgm5neahfgdcv7j46bhndvj9k7y4r70yslzbs5s2qi1qczixyaki97yz2esriopyalom1yp0bnyc60gvop8scw8dr6dy2b3x7s6ori9gb6udvsxiijj3e0j2gfl8a8w0cq0h1qovoqgu1kaq0czzqy66k06jwxax7g65jniy2cx6z8f31s8fjwxw6jvrvx8385bs4znvo1auc0nj1qmg1jf1omsi5wt7vu4d8u3levlyfyly5ub1701qbawdgavwa0ywhdycux24oksztv4eq8nrrf3eme6c9mifhi08xhwo54',
                proxyHost: 'qoj6nc8b9x8cv0023sflqvnhs9hpkwcw1g53cke7vb1ax3gxq7ugda9j5mlg',
                proxyPort: 8680567391,
                destination: 'vtuqed4igtama33pvceqqyl07o1bcbaezme2tr9u7hvxfprv8986cwhzaeqrjcaj5nue55r34z3o3y2m226udrt8xwjhkd7au2q5n6vr066xruy96hdqe6jv2tyy31t6m8ijm4k0c8dhmlek66yuuagyq2ehkvfe',
                
                softwareComponentName: '50nrk1lxksj7su1nq9icuewgirwxo5qqq43yp0i4veczk53s2896l4ol4jpygn2amyysvdnsdtfk652nex4fu1zlewfq7uk5fg0su403vmlzi6e7ojvp60sg2sdv3muvqcrekooxbzkon9z6cnas3apztda04v3h',
                responsibleUserAccountName: 'cmxc39vsusd8y5pamh13',
                lastChangeUserAccount: 'ignq6kztna8pgi17mmnn',
                lastChangedAt: '2020-07-18 01:27:05',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterStatus must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'hs55kr0sywnjj5rg0uzco4nccza8d541uleex',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: '0kr55goxn4db8n5spsvftwxzu084z49ta09kvfd59jqys27fj0jpad6ae5za6dxl5edpb2i7j8uo1oj9tm8nagazqz1k2zc796h9dfwp82tbnmyubfkacq1uqemf3uma7apny2ws0bcx6fqsqm569tdxqrp3qdah',
                component: '89yeyk1168yciskwb2g6kf5qq54zcdxgzkrf6lecf07jb8k3jiqgktdj0sxnbigk2wvn6ca1y7qln1c848r7yutakzqsnlv90x2f2sdgzlhknsnnxout0qfke5jdhyeflyq92ap2wpb8e5kzju01y2bpbyepohlq',
                name: '6c0wtp74aa32l6plnv24o9cmfl71yjx4tda3awi35ts4pepptyuaoh61qpxvckrsmc8rguf0y39mcr2lusghovjk6a3s6kbwauvdfsl3e2ofgxl50rpql5m6bqvyhfxiwnj9w2gsl2kuu8t488iud9d3sa50m2eu',
                flowParty: 'j3wtz5y3bvtxg59k2lzh069lwh2q28imoor4v0salk2h6i17bbwc6ywhk14hdvvxchlu68sp8ow8ccav83vq4r2zi9khsmvsiog9skk5y0yy0ziklc9dhru3w6h9bpzs77huud0di8nhz4l9ojhj64rliytk8y7e',
                flowComponent: 'p3r27luod8f1ejq0vlh8heax8uwnpzu55aufjt6vlefx4niuwnml1fjiv9pbpu3h0bruz88raw38475g9ngat4y3gmbpt1xwn2he3txgy6he7aiyk57b2eqzbjbrsx5uep3gtzf802sp116kypbfx0d9ab4jqdgy',
                flowInterfaceName: 'ogosin2wv1pgm64okuxnbycqrx510czkbisy6f6wmaxwt4m5epqhtribp1nu62hrns5gag32xc08ll8jwrpad3d8vuiq8mo1p0nkl8w5pzzsj2m5rsexw0evy688hfmnsztigivqtd88by5rp96jx3rrns783yzf',
                flowInterfaceNamespace: '1lqpu0njjhdtqm054c1t41e3ccthhnkmznzcqsu5kbgbnqboojii6brp7hlvj8tm499i3zu19ytpsjakseg4g0no3kbdpap0xzz5fe4lb0vbepr8jw8kyiuva8sxhdo30yk0zmxy6eu6sluljntcz6s175yyfsth',
                adapterType: 'fe3wczw1y5b0czjcjnr9xju9pzxrv0y3vqol1re2j41gtl8omm0uz1sr7kiy',
                direction: 'RECEIVER',
                transportProtocol: 'bpjb7lskkscrwnktgthk3ebwigdw49r0mzxy0n0gvht99zkqbsyxc6lfd72n',
                messageProtocol: '65aq6vhp4sxsczmqlsmmyjame34vrh6y5fk6bgnoksaf7h82805d16rkbrxz',
                adapterEngineName: '94sb3db2ffl17zih3yetgl9x03gi83a65zchidr8rcek0r8tqjntxe67qq8mnw3eqnbzdj0flfduoj8y72da73xdj19hux8mts0mj1tb78fkdacbbz3rl4z98ypd8rajadrh6c9aknzd7y8ki33cwz14lx7v86yf',
                url: 't0ezv33asxipfdqu8lnuotqq4vtdtyctlg7w9tydr99hbc8x9kkxub1twlmbzek2gz4o625keifg65y61vw48fmbedeomj1dgf9goyan4hcn20bixrfk3qxvtd262jz98c1b0m7i6ovvt04fqxt8i30pr1c8j5989ufsgynhgbvmk0pmsr317590ssvwxb347z90avztml9m6ozzz0gwqg61rfs9r57jiprgsoeabc52fnbi5kve7r1tqinojizms6tw8eeczd2zsfggnzzwo196fi1a2mxtom7i0doc5a1t1ozuu2fk09ghzfalwz01',
                username: 'gaemgbv8oegj00j74qgl3789lz75z91a57sice7m4kn04p70jpc2jsj6l238',
                remoteHost: 'abosg62s6k4557frxwc746pe343f2lfqwj0mcfupztiw7r5b3mdndzz1l9igk87qvcjit4i2t2xgtpohbnsreah445j7snnnw1vrkiscpe7t4wfa3ry9gdsyfz4j94n4bjodfiigocpbdbt3hzzdimd8116gw6z4',
                remotePort: 5780476880,
                directory: 'gmpxg6z0ccy31r5mcolz2t596eclnbbfel6akb8mdqcuxf03rpn0reti93g50n7fqwvfnolqepdgxnr4sc7s5nalomxz3c2t18l7balka21y5frvg1ugcmggqh2u602nrwcebcs37gbn1en9xmb09ygxwzq7nza4h5lzsms68d9tut6i66776q742achypc47szrq2839j45w3xklbzjjbpv9bano1nb3zd1saofkkva10yzt3r0k2tpc2ymts59gg2q51hblsmm0suj8vwzuxheg3758i80msaqgxslvmg1o8aa756xxo3qs91jrho6tldfx2rmchj4xgwvzkvzezhzxxm17amrdlwwre15t7vkc5a90ig8m1or8k60m17vh6vs54upssy45esy338z8if5kxpzn9tpzt6te2uuhq2ra0649fhwq0hxwjlnenabb83pnrbkbz7g090bll3utig5opeb3hqw2kauvnmy00bj5bfuef4dp8ilvzs6n0zjrgsrpu5oj7oi84sqg36nz4qvnyy73z4x9mwpi9ejack2g0e4jnulkjr5zlab5sj6uhvxrmb0ffkcvuviiyvl1svevcujazqwi9qfygjglgqwdo2ybqwtn3ql0lfxn5ffipuf47bs07xlmur35fqcqnjmhabw8b7gukuzatbxrdkf9f4qzbrbojpuq5u1cw66rm1cjzsyvm4ey530qlonamftn8j6kqsaq0ad9yaiumxh070c2hyqwh10hnce54os3ia1iukgw3jooge6x9k2jk0glcpu0fbsyzzgqnu9qfg6y8idx95trqixen8hl55s64jhe1nq0uv6jwouoqqf9xy9il5ps9eh22hc3g49l33ycvdxtjrsovlqdvdxo85xv81ql5m2fkuaz83g83b4eqefe8rjxkx1x8mhrr6ym8wp1zg33yif3uoywjah6bhak1swotk3yv4ge2pauupyrzv82j4nv34zvoxvggm956qtiqi1v5nszoqw7kkamnum',
                fileSchema: 'kmrxdfw5j0g8juxw61hcdbw6t09v65c3kr3pr44ht8ujsbl8izebp1oei5j8ynirlq0jlquh03dyfziqs5yvmqy9t0advdcxv1wwoiueopw34ux9i388otj847y400fhyxxmcanexw4lzgpk0v0blxvi86b4msoorxscmde6kqc5alli6qubvo7us9u5fjsj8n9ikqlpnxxpv1lzd8gwj8v6deo5yc8siybb2fenmogtjzj6m5brh7zq5rh5cq0zd39flqezafexub9fcc5zy4idnfhmqidy4mgg0depf5xan9dglo56wez1v699f18f88izjdc5x1zy7qgp0rzbp3yxvdzgipxhpxpglwhe6wem661798qwiqu1poutu9c0i86twt35vo9hzkdvmkukokegp46qr3utl4u9wqq2j7z8elhlg5gskj6i2basrm4pf3w6msalbb0ltmag7itdw5eyvliz8p1iy2dy6r9x8bustwp2nsjlwkw8gqitxrsqnbc8q5vkww814jibiirhezva4jukfmfelyq49ovgun0ml41g8tnu25qef1w2flfgeo3cko20u1seeqtb31osshazdnyhiueougnaoakh53ek5vjmq6q1l70l0092n54hx95kyu43dsem9vey4333wzus6m9h3znfzmz9t0ecnd42crlvvtimseo1a35zd5qr0o1ud55hqkzg3kwtagqgj76yztomzauv7lpb00erwmfw52yq479sh9mrhxqablj81803r9n068jj7re8bql82d95gyfu1fyzvwy2m9axjbjxvqt7alanhql2xfelptqze7wclskku8uocxyguuzciafswqotlezpixhrju9dm7micjmlpholpp8aiyl29tu6neyj4w6x0776gkgklirzg406grmfrr3ll9fp7d34b218wn704p38xu6yxllju6hu2btsp0irdqisgktws5tv7hpr39zcxoo8awy20h6fnljozfqxohcxgj3lbhftx1ml',
                proxyHost: 'oua4rn3i6xrrcbaawf9ymk8j4ne375gzdqrqj1ltlkwf0glh3p2hws2e06pb',
                proxyPort: 3935711870,
                destination: 'h3inc4crpq787c19b5un2dw5jxkspsd4fqxofaloq7mn2p8jd8f9i3alx2mt4evwp9hz5rp1xliwxf9u1cfu27q3si6hsvdgamwb3fk9f869t029fwstidze3xz3yrdnh0g1kdbwczf2sg4njpywxjqhr5k1rxxj',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '8oexrsd22bgm56b8q40l2w050h48f3m9tpt6hu88emw0tlz3wgqg860i8fchu3cojpxqlyasxtcnamua3hpgyti9itsegiv3thqugvuzd4qc4e0qifn7ie30f3m0cw149nmvfcf8a31drqrg1oxfjbaotnmknar0',
                responsibleUserAccountName: 'sn6pe4wvo2bkxvy9wfjr',
                lastChangeUserAccount: '1atb4wqgwd9hpavcvpde',
                lastChangedAt: '2020-07-18 12:34:57',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: 'c8s0s2uebfpl9202pph2tzixwyj7otsjfz8p1',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: 'tll9wy2giqgqtvjpnavcsl639i9a3d8dm1qvuf49pd3jbl8iqlrv3y5wjojungs448ew551gh2oedcxtc9ie5malwswaq1p1atlu137iu60a89u8isaj4dk3cxmy42pn2chx2j7rgsp9nqmzontnf8rjecrtzxj8',
                component: 'iupi6okmm1pg7gu849lt321s5vpib1j0qymp3m8i000asavrgxa85bz2i3aw6qs1pxg08awi2ejxvmyke2l5m5rixxghvcqxk50e87lg7crr2aipfzpslffnm6lzfseaoq2cwzcfira3hr3b7y931xyh21cmsd99',
                name: 'bu9v1pqlynnol4gw04vvp4ygt6ay7i6yukzpithys451yr84s2m71vhjraltmkc607fp9wtkvbu2s7k7jo6yth3aozlhvdax5099phs68go1b1t4skn1t9i26woe1f6y345uzr1v2ykn6ybl71lvtnpw23gnyx37',
                flowParty: 'bn8l8nkvjss6b4vg7nkvxftd8yihkzfa0oee7q3ktbwly139liu87djnrkl4zunrxhxtb5abbv8h8eqng434y028vupp1v3e7oajrpcpvxa6y2uzt10cwmvzbebmxwjh0ydxmfugpub5lz3f8gclboijoes82316',
                flowComponent: 'hcg8d5wgj28kti0ctniny5w65jfveao9fyhkpzmc7ashv6yku3x0y58d0vae6hh4ycm1z4hrt6p78ub85q5yb8wtm0y7cob8d54r15gubyp4xdcv36xrd61jhh1fcj1n2tyo69dq7yg8coz400nk96xfmcj4c71s',
                flowInterfaceName: 'scha8k6airh0qdj3nph9urge0t831brul3twpz462x0r4d5ilk65rtufypwn681kn34e6gxnbij5b6ssrw1kehrdqks2jq265jljehvia3k9coo8dndpa620ouhh29ihedmvknkv6lfm3jik67sxys6hqdm01q2a',
                flowInterfaceNamespace: 'e26ycxufy91zaia12uh25wj2lue6w4xyeas9ipb0xxjhararyqlotbovuxwsb8gk2nhj6wxf7hzmowgcdasnjubfjwd6eb5pe8v3gbqvoml9saxbxzj9gcn6svin3yi83n3376bs4edg8jqag7mtagxfwtymasyr',
                adapterType: '3mdosu9toq4l1rvragvdvl01nfecqqs3pvc0dxgxorkmmzi1llzo9urn7gi8',
                direction: 'SENDER',
                transportProtocol: '92kzwmhq1rqosg4aoramcv1wqprwdff0lt58zx6d7ft8oa831r03ff7qluxm',
                messageProtocol: 'dp519y7wig0p4ncea0dt30a555q79vi6wpldfxm28xz30kpn5js8nfh864wu',
                adapterEngineName: 'efs5r6vno3c8few2su9rrbmi6zj255pps78ykd7tz4buv4iob3r77vl7yfsyf0a7w8san6qa9ohchkfkfl16hy7w3yxux0qufoh5lrmur9is87qpeypzq4d3meubsxdivf4n376e61srmlib4724v8wgceo3c0xz',
                url: 'dr6zxh8tt6r19vhsaq09935yakmpbnvc9kgt8i85ycuicflpcdc4nrb5pylao3qcquiq7as6twq9j23kyoadzpinp3gpiupf4xn2o5uuqdy2znomopgq9infv27859gi6fvrzy4dza41mkw3qd1leqc4sgqvfypr08ep2sc67hxg8ej5lddf2donjglnyasu1opljuj2hbb8hvpn64rff3bg4kfsen3dz9r7h8klasa4pxerbl2f23l5eq9yhtcormb3p6s1psr65nsdc5q4qi4fabxwfi8dysf1frvyjk2hfpzyc98yof4yqsigwpnn',
                username: 'iiepmsh1ybb8m6az0axenxv496ffqz256ptr08kvs5yf8sojx333tx5z0v9k',
                remoteHost: 'vzhu09gjgqfcscrso5b08xm7mcbtx19hfihfcgi1vi1lc81xkz5a7yztjar0rhauckj1z4y1u4xs7totjs54l0z8zlhvubzeeok5u0g7racrtazj8xafyke82lwz98neamxpvfsn9pocm0ijlznr1nmxq6wt6a75',
                remotePort: 4264688948,
                directory: 'maq26lqob6st9bgqdd1cbc7kr2slv4ww62dl9xsceettlije2injexmpwy07vr9mxfsomsd38u8k45m95qqt9dp9jhl3jtds0d9wr4wjvjxxljcgvp88tjr2ta34ohb04qxfr3jeyyer7vmgff9o20hhjjxio0796vy4hzapof9uzbuybsbndo5a0ohfqrf5f8hln1ct57sxqwr20tqkl4lejarzey8ahzplkrt4lvvdc57kcvu6hkkxy3vy630fxhryvrwanjuurp7yq4z75etms0qbiydohrglxw3wsszwkc937qitczm2q92grwh9cujoq1or1gk58i3i9a9gr8asmz4n6yhz0gdr5wg7rkk5o1dtb37c743imrvuaxs0x1ths1pq66cy0e8irtejt2p2eu16hoi3ruuyjrs9oj6kk0fufdhiau4kgseocm7b2qfym8defrwzfbt1dmapxx3o4ya2zmcbblsc4o4sfsjzlf5b64oqvjcds64rgisl4c0bg37bedv0byobr8ubsf7966lv64shb4v6osf1hn96fg6sbh19l0evjczfmmnt9k28g25h5rzkllc61nch9jj6cut1dxksfwud5vk9fe5rj4251psvnmdn4hf3ic13nq9rddmmk0vs4d1t2oiuiyspfz8spuvck7gpstj9pxvftxpzoilrmfqpzlqyv9c84m7enj4rbv796b83gkytuze50ktnvuurhke0c71fr15d0b8zgr2bpptgmnk0es0f5357e2tcrp5l2lintze1liuaforojinof5qxb9p044as1m44b4od02odpx2b9qvz4842cee1webt76cgblm8ip9tgps37qqfevh5vzif9gr5qi5vw0mitk1q56v7ydh06jjchamtknhf9qvil5c698lv9ywb4u96w2lk9905hl5xxjx7jgc98p46lx4mkimf4hg0rw6rp828cky5k89e31ej865tzfewf0hibvo5c2jvr3q2razjwcm34tkrfr8r',
                fileSchema: '1ugitmif6d8rbbtfzzabrifpskh68mghicm2pn9pzmiux6uvnkdrfj0hcxlyntchj7je3pc363vquv1r36t9jt2e3ax99amal6tiosyejqbfr96vho54wme840cgk807v6qi37eex72hfbnjr9yx9y59d487l2szmi29hvqynu1jo9eeqopzlxwmnh1ec0nompnlmmpyiyn6gbqft8x5pb4hitywz8gca37d00s1r9hm0cm6gtw5w5kq04tkrzkjbcunem318us630a2wxpyiqxo74uhvk74ct018nnsqw4124c7nj5ja208ey9jfzhthos04dwp43eoinkvswl9rqzrj42929khz49d7aob9dny8nqsku1jk9gadksfkra237246skdtrmnqbv7n6yfcp5l6zaivd7d1ypomcx5ztv1wnipdr9s2jcrr4hlup87m4p9zah730q06jb5epe8rgsf3lhuxa7mz5iytx77cg7c20792ovcy9ji1ks6hy0ms05begezfh91jumu9n77beau9u7wsl2q2p978idrjh926ocuphc18uwrvoxr7jpgsgzkwa8wg4k0i0cd86tzhx7o5d42lw4qa645zttxqvl26c18pv1pgk0dg9vlgxbjnfxag7lli7fuud55pllg0whxwhjdbafs2186jpxaqtha8t07mcwrjpgqetluqvdktb5na2sc9gv1x0me3ynpl2wkjafgj20v5v3h0ixybjbtu3e7tm3q2u2q1x25qf388516px4ucqvhpfgz3k4awupocutqekbor3ztlj9pdanlzwhsb1h3q87hl9q916jybqf0jmuptk7z2g76ajxwkuuehlyc7gaygyku3qi47j3ycbjyuq2d6g2esmin9dutla31nx7vdwgz62ex1kbrvk9v1ryot05adwcuye0sn4ozcwi1a8smppqnunan06hx9idciig8jwdptgw7qu6pfv05h6e56z5ff28u8p9ndmulikhrmq067x5depgmxvmb',
                proxyHost: 'd09jfvqa9jjatpxchmn9l3snyz24scbkknq65p8gj6hauz25c6l8kwaxbr07',
                proxyPort: 9434865171,
                destination: 'mc7of6rhyiq57wpiptzenve3ud6e1hdl1y5zjsaqzx14546fpw9ya6iu5g3vu9sfq27r5mnic9zlf2qrx3tjevn6xohk1zehoejha8giltut36fninf2rqrv61kczym9liw38avouox6grn54cegcr4gc2z14la7',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'mtmrmtgvhry4e6p5z7j4q9wrf5xokl6ify4kaeze9339a8inwgy17a7bg19by5dko70dup3ne69vj35cmk5eetku8lyfin055fs5b1gse9jvbncbgljzowxoag48zpfbuc7sl5fmsc045fw9vtfttjwxk48dfogn',
                responsibleUserAccountName: 'bolrq7r8yovlzp3wmmer',
                lastChangeUserAccount: '909eg35l7top2zlhk6sl',
                lastChangedAt: '2020-07-18 14:31:21',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'ift6j5wixb87r20mh44m6isnc9g2i2g9n2vp2',
                party: 'gjy8vskb9njg5vkp664dmx6r1myda2nzy7opu6e7v304duauthoisbhkxt0q1y41qgp45tsfy23pumf5r9qfz3kkz15u1xtw1y4vyqcx39jfaf0vifx5t5ivbnergf9cbwcs0g75ho5mopagsdtclgh0wkoyvlpa',
                component: 'p3m79q6tqyks0inb2i0m6ucmr9yl7g5usbrmu9b7tr38qym6ubrm2odzdct5frzyet6oz6gd7r3x03nv7aom14c1320m8plqblbwx29hcamffbn6fubeu8fmhuvxk7igmekfcyep0ugyaguspxgs32ul8b3d32c2',
                name: 'fvgblyyj9tx82wk4ehcqxysgj2gphf6q9oo0lwjw1v4u3v981g3o97k33sn2dnsewx8l2uj1ff0off1ujderfdpgjpmpf92p1x9e6f939rm0ag80pyp37htp6ap3wjxiuzandrkunt65abzbbkq1k4tj23k8xbm5',
                flowParty: 'bdpv2wu3emkqelarq18qve7b2nj0bls19qqmys5azwucu6owvv591xn1iw45ejydcjqfftrxpneqrh4zszvvt9px7svm6mlo9pjvr1pxgkjt6cdie8cx9wj4mptbjhk9it7cyza0pxj3u3eup46b1r4wkh476rwr',
                flowComponent: 'l9d73hfdm951u3pdnizdx9nxi905xgtigmyy4574v7lwswj2m9g8h6zziv402sc5246uc7pu8rxskheod857a00sgzep44tg7yinjn4vimrrtuf8vppt6d2lav956fm73nrupxh7npor7ompj2tovqvwbdozyu12',
                flowInterfaceName: '1m2nvhegamsls5pbvqmxxc6hl7ar6m6k1lx1g6mltfp182dvowg6xpu0iyseya3903k68egqox9kbkcc608uyitc2urhetdk3khkmzb24jfs70tix8rjmdsxtmbvqnfhakj7u8hi10mgd8guxu9dxlxihe3p2u03',
                flowInterfaceNamespace: '428xf1wauazjx7lrx9a4t1f74okf968qvkxy1tnwfscxnyph4ysdqur2o24rybap9venvvko0wge4iks7nfdcu7p7z5e7i0rc31edjlogb4nxfwn93m06zm4k42wc10cr5za7wjs88mniyichpohjkmich7yac8e',
                adapterType: 'r3k2c5glp95qtbachsh96gmf2zlzeuyjvc5v320kvebj3zn7kgj6amhyhwf1',
                direction: 'RECEIVER',
                transportProtocol: 'fqc6g5ofnkrgmh3sixphpqc10qi9xj640n14clc250ddon0md7rtsno5lxj9',
                messageProtocol: 'pzwqenofa7wlthk7fol4fjpoqa60noemwlbyv54wkmcoxbzy2llj2yje1m5o',
                adapterEngineName: '57b1j90b67lyb8flxl1w0o9pvq6kmu552cgqweivlby083ulmgggcbxf6nojkca4ivvwhq7hqb5hu88psgd7930miurwmsmar83a55symac877lm08324nrev1jrrakzgxt27m99xa7cyidhlh023ud03du2kgdo',
                url: 'nuvbq8iv6bmsytgwhj614dnm2i2fx1w4h9edvxowxltk4yelbk89wx8je76u11q4pn5shjnyhiexyij3btxdq2htsulbqhi01rxwla7gackams8x1rgzi6511j5cege8tmp0qwvvf8ui05b955fsancvgte7ubokq0qy9wzkajmoco77qipb2m7l8h8u3e4b7cj1yce2u0j2u7vclefnuzg1fidqv5erx4ca0epzptktybr8c8h3gcvlk0ax2eyl9qayjbn43fua31kyseohmoxrs4tb0s0dpuo67wgw20f4v27kygawbetj5w9zbpum',
                username: 'gauy1fz4jv8oa3f562t3gxhvpcn1iyqek12k6tn0mihs73fommpixg59vwwk',
                remoteHost: 'y4a5r54d48fnohvsal4tv7d4zwu6q24bxcq4reb632kzbbbyo1y9ottur4gbj9k7z768gglgdjht9n22t8q93tyr4wta3nnc9f8ip8vhgresbzdxsdv9z7pyxkw6lo1ni3ggguddfbo1ky3i9z4jlhe6x451seg9',
                remotePort: 4130962397,
                directory: '6sssqfjmrics7bgxcamrgm27uye6ad7ttzqf9eb2da8whz3ohrn88qp6ezuyeaqxnijrhch28zyezg2hy3q9a0qfq4udro73yt19j1lalsicejcmy33r2ffndybtq43gao1pkhqvpqmlau8u58m51iw08qpqmvfifx7nfotran2vrqqfya36c6vtgmyol3kovjnk8fzt3zovz0sqy0gk83iq5q6phrbx6lgoyphxgw7x3qdki06dy01aclth1lsqtxjaepa3unkndky6n2uttjojspct8vo9si1tyjr2o4cmd82ogw2xumo1c57hxfdn1w9otrdsezbzjzwfltfnw9s2uzhidk4cgnzpo6v292dcql3qcbe5wredumx8up6qtwkul6nm8rapnmc92b4ccs0k8jb6c5ml4iolgk7ekt06e8iy0c8f98b17as2a8x28mv21hma5asl7nx44ld7g9peoqojh0ys1b1nghnaei8znzov7lznovppexlmuh8azgtal8cs72xrixqkfm5lbliksmr9xx0ycwzi3hyxumi2nx59k42cjq2hye3yfbm2l5fucqnes0agfr4zycxwb6lforv2myq1y35dl1q4665tpdn9q1issb33u92j5xg0aw8ljkdlr4oek9msg0gyq7j8v6t7xu9nny09j9bfw3dowfarcc0pnay1z720r2d32gm8d6ot95xqozhw0si6qrxcxce4a1n6z0ow7qztg2xe5tf3nl4a8do076nsx7n6d2t1oeskavfhkjwkq385ezo23wazzeprlxxnpopk5sikbaun765sxx27mqti741fw1ru70e7n74ko0u5i4cp4f9hkcobvey72fqxnms5aaumqwh2ghc9cmc15dopv4r4q68167u91lqfgr41yeemgkd5qclj18ri923g4qrq4ilmyina0mrj3nzurbm85gu2k49n684mr4o7wso7g0kzco25gyfru86yhbqle5tja5lrmhyt4849t8ynq0k5pk4w',
                fileSchema: 'rarpk4z90khnekvn74losy5kejwfewkra9cr5dh6nislyb7zwxwbggddpltxpa051b3dnvbppqpx0og1kl3jurqs7jvkzymvkehrxr6j5axoqmowpw0dralznojpkz833rdso2s0azhlh4auapbci9kf8zvvi8c1qu5lblg3yi71psjcsbzz31h96w9esg3mq4x8yue8rccccpt3e4y6blqz04qhv80nmbank02ffx4lh62j7kykuh1ae30l287zkavx6b3l09wkkixfosji6rjusfp5no346wftgg0anqwjl6qzjmjixxpkolk3nr7vk1kbes5xo1o8wyxbxgfq7beyeihluamrdxmmfr2pt92pesbotfq54r7gpj2og4p5j99a7u5u9517gypf32a4cp8i9nchm25ujgyd6x8ckkfj35yvo4vld9jf7rfraq7adhceoc4of3c6kx9c0rp24ys5j296e8v6b37wlqit5webft9q0y522yccfv5avv7krbs8rw0zr439uv50v6ncwmzjy4krygvyk9bq862xq0epuyg36gq9pmcnhhx5l7g130tthzmosldmtuaiok3bafugauafgn0rck1vrk47ba0fw9xbkrtzsnmyixlwy4en4shxwahos3aqfbvl4q0w5xs4d9i70r92464t7qqsjstus101zmfgh2pjcwdyy2o53hwrfo776yda616ffdl52y0uu8o3flv06vvd7l8u77dvesob1zanallmvq09l6ddfqztp5cci7qt2au635uaejn55q3wepqzvsulplqwndn2n3729u24yxiymsx2t8bgcbs3h0o1vyx24vpal7we4u2ar8j383vjykcsmyc2h1h6bemfa7d1q18posl9o7kwtd04a13zy3ktmkq9dg0kkmn8fvzqkqygpdaa8aq5wyz7w8yokt96zcd4f863um2pkzt9smtip0inrtdsdxh53ovz9jdwmk6vskulxkyw4ep358m5sfp36gyv7lu6gn2t',
                proxyHost: 'qk0ei5agx4e34cwv2rqws2x5iv6nvlioucirfb5b7pxyvpkqanylnb3jkudi',
                proxyPort: 2838688493,
                destination: 'v0ca2x162up845t7a1ijcd4irtr8zb6qub8hql222vn6clq83x8rwlsgdzk1zllxoau8l56cg4arijjemqyh8sjg7ap2tj2h0o8q270111zdb4fu4csyj8ga73ev1xtf5i68oq0xqjjfx6ia4w07lqr5sp2zj1hx',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'upc711coe8v57n57pj1psp476871wjcgwa6fdre5n3ri8darerri4myfpsradup3hz6l2w0t51jtkmv80ct8rnxd0t2mtfymckmkgunhe6mc05rbb304pjx9o4i09g1e266t1fo00cx6xpr198at94psvt7kd1bl',
                responsibleUserAccountName: 'n782vagngiqom8ntye3m',
                lastChangeUserAccount: 'ci9p4dovgi1f24adqs7s',
                lastChangedAt: '2020-07-18 07:09:15',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: 'nt5dwttfav58raz4lgaf3s5ys57pkwz0kd0jrjj8mdln16lrpgax98d623syuh5fwxrlf5z9mm5132yo2iy8c34ao4v15v5nf7c55gn20kg3j9ofvz7thnhipivmovx6e9d2ecmp9q03ixg5c3c7cbryrn7u8jfw8',
                component: 'c5s6lxgdtgd0vm0ado2roop6y6spnxtnbj6x152bq24bzi183dp1zyz6vcj34j8t1bytpeunzjk9vmp9i2b5kd9eur3p1ttfu2p7o4yre1rmgz9eu5mvpiqxepqqw3rfeavkpvjizgl2fj1knutnp6jceq3vmhon',
                name: 'r5p7ql7oi8b7wjfk9jokjgevnvbhs4fn9hcvhu0isk3rk00aikfwnbh34osp0k1sjvfgy0zepia1ylojyvl39s2g8xt3nqpx55i403rl6trew43p0cbpq0i6leukvgqcj1ds19860zeyw9xipn6yqvnie2apstkn',
                flowParty: 'z3nfswj9ssn3dq0muh0s5e4mz1eqg9h45wtd86va2rhb3oqk8m3bglu2e9tdgp13o46i339967pfqhcd4hrzfofge5cat46rl3e80t2ofpemq3pkfkw77p7txe635pgcopjkzszmfis14c0d4wwjtjrjl2heanh1',
                flowComponent: 'jws01vngb3rhb0ks1uraebj81co94bnn2q75yd2oy59jucpuqydrh6f9b63p9sxfowlvohrleva4fm7tkk0dk3pmns02bjew95yq1smb2hwcc3gns63pgwce8j7ovk1wl63ci6g2m8y8i92gh4wou0tl9q16lfsl',
                flowInterfaceName: 'l6tmif3f9hisau9treobpl3583pm7tseafkhdf7ueuggyo5u8qy05sa283h0ofjsy2j7sb4cbvw6v61itdh9i4l21rmpgfgzmkjh4s91nmreohgcxu34wdyy2hmuyc3zebkd2nv4tf2xtsomhqza0t7x5mbcosa4',
                flowInterfaceNamespace: 'fqug8wlgfxzsnqdkkwdv4d0vidt3dp0iyguqn9ne4w5ito3rn00aaso74840gegpse5udr9l4bsv6ocb0va9rue35kegteele5pbitgglx85y44qqz8iy2niqhzji8ph4ye3ckhkn8mxlq9l42f3akb6thuil10y',
                adapterType: 'kainx3g1ncjevmy48xa5cxgiu1sungnnapd3fjzcdwhc4goe7zk21a5odztv',
                direction: 'RECEIVER',
                transportProtocol: 'ubu82cj1kfmhr4m5fmy3duoyb57t1l9t17rk3np24njrjs03iyfv6ukw0of2',
                messageProtocol: 'yf392v7dmudisygduvhoel2a90js5j62zihxz008fv8wgk38pspi4repkbeo',
                adapterEngineName: 'dwl0imm2i3ol59ma79p9f8ntrltugoz6y4tesso56otbg8i3i2thxlhuifqwl1hde4i5v6f04q5v1kndss14uzz8e563qjzanivue8d16rqbigrulwk2d9rgj2zr9hpcttpr5gqoyafhgzdnp07bc9ag81qv4g4b',
                url: 'xgkzaetzfnikzw9dvk89rspf8ek9ljiza3hii5fuipmhwfkpf0o7ek9syx2qf4xl9cmrj7tb7g9a5boux765c5kignoxdstrj7sow6xdlmm4o8g055ftof4nmt6o81ji84mqcsfkjesdtygxvhokf0ozlwsupzddvqbwk7xdcvduxvbclz7swz7v5kkt2iayytzclkjzovi4ikmzms2o965z63ug934sb7m4y18kpu6d7s92w4j67ms2qb249ehxqzfz0xs8sbvj2vxpoiq9kmso29ygoy7ak6lm367qfnu7kfdeiswrqk4hiv19odog',
                username: '2pvfwj75tdtligqtpk33t8w4sz99jvc0qs60riq4l8xsm9xm81c5tkyqhath',
                remoteHost: 'rq7q1ds2drj0xhwgoyizr8o8i3vtp55uzkvez8o1700sj2tjhxtp359l5xol7bh7p0z58rg7qlk3yhucqu30lz9tnomd5a27f8qd4jgazouenshzno68wul5tmhclpf78ew04xi198hq95ehyubqmj44cre9vj0x',
                remotePort: 1095195551,
                directory: 'tkrqrufpdrgndnd0vef6nedd1oiei3g0trlx8nvfj6nui9bnwbytue8aqibnv3aiolatv8gswr7n6utfdkxixgcuwstzgn0p1frvdl0ruipayc7bgh1shm5t0gyg90a6hq3b77r58i2yes9lcnii8wwlr5s7o4vr91jbsewtd32ijr5p1lp55ibkgkyeu2vihwcn57z5mj9gexgwfiiuiw3ny8qg9kk7z8c4amrkvglcg8zay3cr65iwkumldrsc1t52bibvdft27iyt89b3ocep4618azpc2dnvxsqv641tfs313rvkhey4v5bynuryiuztffw8h2gg28pa19h1a32189arlfbn74jlo1ri1a12blcjh1cjvfur4gwdkc9djze5pjap9rfg3iwucd9pduaundpbzzqj0t1mz3g29e54ke51jj2f2gsdvbm0ahtnxky73oqz7icu3kg1nl7zvo5fnt1tgeres6km2a0thw8li44u4bim6fnf5g8nqvnle5x9zix978syn11vpxthei443pwzr27nebypvx82eny3h69qlcijyumbkz3jyebbf41kgt15olbbmvz11pod6ww0i78fwl3sj3betfml7znn25zgmpf49lxn2jyjoib1pnu48kdzquysl0ijbq2cw6gmmm2hh767d19f0vhuocjtpffoqsccjl2bx1espdxywxbpy5sqa0sqk5yqdoocupll0a3p2jcn3emo5s4x157e3yxhu2wub1ukek0sfu5fbq0t9acuohmkfjkbjjo7sfg6fm800lr3z4p6o30kxwdkreid8uxzo154dsr77pdvh4eapbifga5tmfgtykt7lm9gq77hs0v2xq9qo1q7lrsoa3di159vprqm8ik23ejp5xna2yxxwl8k0wh3ztfdvcikc2awc0wbtkmd88awkvqysdb42ba937iobuy11ky2t77uju34w3ye1emvwl0jutrqy6ugzdi4z4f7k092ayo34xn1hwsq5c07qr6igx08',
                fileSchema: 'swfsgqoo3raunscvn8dl1w4av4egjgnvl7s5q7lq3m1s7582dc3illjr4ykdh6kr62hflaqk1wv9p7tw0ad7a0i1xibfksowci6ufn4jjbj0ir5bpgpk1s1wpuxwebfiqrzqn758kter6bvfbeton3xh5gwh58g8lpg3n4g0pvc4eyf6wbupwv49sx67xcxo04nk6abb7hh1v346mm563g0s6i8l4wnt3jb5ieji8n0dlmrybuzuco9oi7hqb77vuhdoom592trwoud16ly2y99r4jzmyb6w30cllxpirrnldok6vdmillz0kkizoj2ay5ifw5sg37j3ggllkfr8tpr6nu7lj849anib9xf8q7dux70nar240b8oyu4qxdle4v7v823fxay4h1ehts5z2zc5e43itbv8y3dqlp3dz5nnjp68as0dlnniuad8cadrm3hm0mcm8v2qsa4k81msu0dim0pz90snvxgrc42wdj3fnzar4xztiqcvfpmyalzocoajr6ez6riy69nk6eiybgeu34v21evos8qt5pti0gouxc2jsvmlzh6msc2or4f744hai1qen3kcv0za9zgqpp197974wq6u79u0i0tjiojxomwcrnb94qdnox83v2dibgmk0xmp0aifzoqkn777rbr0lhmwqx4y2apjv7tiq2buci11ap99lvfmeeb0yswkee6m5mj5epxn277zc5r6r85ygo6degsz50k5wxfilxdvfn4qtb9k0ientbdzexd8feivo863krtw9xt67ky85tdc2d4x4euherhiug7yqtb6k0myqr3otxfyj418pfq449rszks3293gy762i7c99sf6ijq0obrmaay82l49uexz3gmy0xkf9y9e8pq595jk2jssnk3yzjf8tq23bezd4urzvxsex30r7z13moqhyujvpv9uu90kguu7yg29ifvfoi826jkrt8tvbx2wbrf25h7quhnua71v768fpx8rws0itbypuccgvqjy8rfysezl',
                proxyHost: 'zszrtegf57shkccldm0yjtqk0cyjr2ek36amh9axh6vprnaaghlfus561649',
                proxyPort: 4994273168,
                destination: '4gtmah3tp326tn04o1r7rfopjjoekx4jvgyqxlzisbdtgv8roqh317nefamc2mkif9qarhgxkv9qmxrmqdezpswtd8ud64609tyux6hccrivc8kkf7gjkrb9gn1crynkow7b2b94dpxjtk0964qhisuitfuesjua',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '4td917au2ja0pfy72d5rowv2bjrmip1ebbqt9uw56ewnb1wdyxfa1wafc1tw7n1ebg8v9mtbvwqwfl9g19u60261cu2iczirx33w86mksn25vv8a7e45qrlatouyzdr5qzuwq6wacxyss11h0tcwh2varpetdvlj',
                responsibleUserAccountName: 'cb78g7ni1998u4s85bq2',
                lastChangeUserAccount: 'eqgutc2ogw7ag7k5pjzi',
                lastChangedAt: '2020-07-18 01:18:28',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelParty is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: 'cw4ufsrm97vfgo7sqdgyzzmjeyxhaf0qxm9vny08090fevglg345b5cjukp667vb41tm92iq8gl4pm5173l9n4g2gc93dk1xmeee4cbjyhhjnrg32gravm4uwd6myffgj3wog3ejhvt6mm36zgohrwwi4jbm2lzi',
                component: 'i8su6l2vhzgge0ykene89a4l3e42pyyl414l63koog0ha4nycu3a8bp08fwtwgtjkww1z67w33w71h2c2ubsl9b1fmuq4xl0naa9oif43a93sth1tmzynoyj0ctvv2e7ja5ldz3gbfhplmjaew5o7ujmz5wjzjf1b',
                name: 'pgwvgpfzth88h36gyysrvpd7zd7smvu8dg9i0cg2dweuu74evno7jdvchso6ea39jr7zz0o4u1zh7w2aoy22cr5gwgsutzc9101zzw03mha4iiblioo0r2f4b121lzq27pxizi4pb7w5b4tf2xqb2v43iu9rhix9',
                flowParty: 'b0wh6hgusxc8by5dw52pdwaeq8sh7sv69qk5u17o4vpxm44uf3k55bot50i0u8ctfjjwcoghwkiug52kici984of6ymxvuqiqsihxlxjf15hx3d2a4vhmgid0txo11z495xo72frrtrlse0zzkca5c71y19gtthz',
                flowComponent: 'p3zz8yiohwm1v6c0v8u23fpbu9t2d5nlb1wbhkw6a7cp1l23vu3x65p5vwc4edxysisy4j8rh2lel73xnmqynqzc2yn85lrrke668axvezk3vmm45gohnme2ovy1ff73ic6jwngaxvoct0jq8jlpuzato7uprien',
                flowInterfaceName: 'z8u8xpzcsz4pefhj5racz14em8ws19kolgn3lvgddyrnkllsnb3roc00xzytp6m2rgor2zan9nw2uyevr5whcugv2y8g3m2r9ogu5zhd47jubsne7h7k9q3qn1u6p7wclv1kgpmishsasiiuv7jfxx736u3sdbpn',
                flowInterfaceNamespace: 'rdeuuviwvizrr0xjbsh1fuje3ixbzgu5ptp71ltvdxm12as8i0nvy1ocn7ukhk4dgr2nyr0j2pkxt3pat6xfl2kvx2x1yis1mpk50xq3jyox563xcl5mzyd5ux25qeavwmtd697ovbp0m92sqcbmximou4y6a3ng',
                adapterType: 'qt2n6t1xqfnacofoljokzistfnheq05ghn2w0epd39vnfk1leis3zd0xygdj',
                direction: 'RECEIVER',
                transportProtocol: 'z4jij4tn7zspwra7idltugzgerch841y21pq5igxw46grn1v4ig5z16ktgzc',
                messageProtocol: '6k4dlgrjbwzlba82d753o9s27hugd542xpjo6ai1r2sw9rvk4my2nm6wazwb',
                adapterEngineName: 'rgkdi6315ks5hum89kl5zjg03reaed2wczx6iaxswy3mxfiquzqaolg2bkxdtkklda4a1olii3z2r8479u12rm7cusj753nm36x0vxs696phdr9ig5n8g6kpjzcdvivs4a74op4c5jhvuqdtovrfiatbmyoot1o2',
                url: '81mutn1eu17q8qw8j2f8hzynt0v9s0fytdkagk4hi1qjfxluhkto0l0znwe0xnz1h87xqcqydmtee4vgi5ug3775mmqx6ui7iz5zh6q0iyqis7ilwfqde9819h4hr8gzgmkggv3bcsh783rk5ucy1i8d63ezjm6voj06nn57gmksgtn8vrdwy6o9oouq2j268al6onn9sa658k8heufms29yod06yxk1ff971z9kpoj19g6ht175c3fn10t945r1hrvcb5nldz31p9x9epz6zcbup3m35hjb4kwzq526s2spa59l2ci57nj219fcvzg3',
                username: 'di1b27bjzxx9xpf7vzni0guskqz22x51z65t10m9wf51ydpxxl9obpj0kwzu',
                remoteHost: 'vbu4chbm8cuwb7grdr16ucsph21yso55j47559mbn68isoc98an6qhh9gz9kpodwz51bziprajbtu4ktjnefwznoliph2xyag5mcayyyqvy6cepmcnlv1xqjs751a5j4y3ipf18z6ky5q05yorx6ppjw05fe4aj9',
                remotePort: 9369840750,
                directory: '5ldb6a1q92kwxsy459m008uoni36ydeng06t4z1hd20pc2gg1yy3nwsqcxflp5r5t4wuhhvv7i7shy2yzx60gdkwec8qkfk0e066k5io7po9q4a7fd94mmq5snd7ifmg6qy10so0uqlqf0lh3uoro5deiv5vj83n1pkidkzezlmvk2sna4yduzqj9l2cvm8n5fg0z1cry7j6imwehf3r1srvkp4n426hf5owuj3vsugkyq9p9t3e8dgp5tp5786gqd3ewmlkmxg5dqb61jys4u66hs86fykag0rktclncjz1eqj29icabisfvw2gpogsbvo5erdg04ocn8fmgtmle85le4nhlgqiv3v72tagbyltsgu65iadoojrt2dvrdf26hrzd9itt81e7513a76bngpvplajowoxnzp2yrylt0gr3k9wo3tsviuo200dpl2ety7qcdo93u8nobwg4vthafz5rvudgz5uiujq7jffuh1snl5vdkypwhpspar6195mb7sn55vjopt77aieohvdsvazam1yfvv2y60lvxi8twkocwx2lst4jxg4t9nbhh4gnd396rdd07pcqzr6tastddu7hju5egfh8ckak5ciq5pl63bcrqpb5jocabtcncnydextpp6ndp1agerjt40wrq7z8ighqx3oz77vdp7jnuc25lxajzaqeukf5771t1i9q00ndi07w7h5zz1sl1gf4kdvkto6bt1nk4p9kb493d50h33okylmif3icwp5rb7rkzs25ruu34kv2yi3xxthbxf8lpynh6t104e6znk7cr7mhznlhh7ggd8typykjp5w2760ay9du5y9p4j9roai9ub6724tu14mo1x8vuzoah7dmsg9eevsoqhzqlivhc36zgmikncc5a5p8c5tdgzl4cbopvy3tu2gqt6sv2yn3di3l4amb1l222rt3yn21yoqhcy2758bszm2cr10fbelntb8b0x8senkcn3eguctuwkv02v26181l8y1vduxsqhw',
                fileSchema: 'r7moqbilwhhyusd9hmhczoq2873qbrxsii2c9yld2bb3uoj0i1e7td5nwz5uwrcefpt77quv23b4ztg5nto9diwkcdkrlbrx6wsv9d40corx63rtt7p2sej19oejk1opjxv1wawz2vkzf2xa4h5bbc7a81armsm4crwtwb4pno451c2h4qaezya6mwdvifaujej7hna8lhxjdidagp3npefjppehj838po8o3f93qf4lwar2f3ctmbnrizo5wdcva3fhp1q6tb6gzoorldkp8zxzmqvvsg2nnhlnhqekmiwquev845vrgw1o3xsqswepfrbgze4b9tdk2x3occe25yu9gs3t2tlgvmpqiqz73uwvm31ql16bphgzgqalhp9dibb58hv9qc99yvews36i40ntjdbbpmkx1kh54rb52p1tdcy4ifdslkprwhs3cd76wfffmx92f2nsrsre9jp883naue274cw7p03pq7vwnwth6r564dfvs08r1bfpfa07zd4we2l770o0jl210plfjjljpmkj1pqgtvyla1mnwc91vwqu2p93j90npmc71uwn7sbau4o2de3yhgdhev8kss91j9tccn2fc1culi2ih5e9zynuvmr1woyx401evskvqo8jb1n7arsey0kg5jqn6zhndmqawcx2r5nevtv4ylrmfpl1qf6ys11yln4qqq9ndizeb1e0yruo86ufszc5odowt4rpzu9u389t4xd88a04m3hu76almv3d2domk4djjzzt7dfem06jkg9g5gajcnoshv7x19486orf8uyvnqgn58il1sdtq6owyqzdjx1z3k0vbexlbywvrvhz9gq5lfq2j2unkc8bkrsgenzri47izpf01yp0n0w70vfwg3pbnq68vdjdurypz7hhnribg2jd3bwotkm6mkrk3uoxv2jwq7vg9yz5i851o1kxkcaf6ngwqba16m7aw6914hjjo5653xx6mm7ma26kf5bvm7t1s1gtsnr7eznibxmfyhpz',
                proxyHost: 'q9317cgozvl93c0gxhe2j2mn88dfutq60tmrfaouqfoa4w72zho8wkezd2nn',
                proxyPort: 1804880347,
                destination: 'sa1q47n79z5bl4zth7jetq4i38n21ui56pjj4wogj8hhir9quclxoxrhan0tcowri21v3b9yofxqkfj98iwibykx8bh9vhhmx1v35b6dikkwn3qvqt1uhwn2e5tfj3999tsj9aw5n0pkwe1cbujzziy4c1ol5bzd',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'mknjfhypnks6tgu3m116xsyxxwk6we2rdvhox9fnh6rb3kpw1aysj62nxvjg092w2gzi9i6nue6jsz8fve9xtqge7dky4lljxb6j2qnzwj1882vete3s85ys1nhp68e284l91x9hjfa7xr1vkng4vwyg8ucxday6',
                responsibleUserAccountName: 'cbkv61onkf5g4v38o9r0',
                lastChangeUserAccount: 'm4o1manq8b3f2n9615nx',
                lastChangedAt: '2020-07-18 14:52:05',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: '6nc17k6k4on5i717zgnae4mt5ht3ou2pr93o4pefhewrwi77zagzzuofb1d44lo22j8lcnh44fd63q8vbkmb7drvrwgqvjghb6ef3qvr2em1re6zj6cse0ulggoa07ul3qzmgt04nxlgewya74y6edhzzb2lgbcv',
                component: 'uj8xtug4r6262e0wxhsp85by62tgjwfo7catr3ypshi68wyoxpab7tamvqd7hfki18xfxq1cc5qdckh94kl4xdreok73dasrizeu0yx5useohktv6rsxehyg9h8jbimsjtm43ymxm2gtrvncilur8llbukrfqbtu',
                name: 's1t6oykitij6cj5zhrhslnqjygb88bxpp2kijfiw7ton9vusqatjszlr4ebbchgkzi2843z4a0bigkfozqax3cfb3k3vwvky2k5lxikmfhmlh4q2sw3su71yl8gftc8gbo85nyt3b7uzhnusmk95a15omyehxa4ti',
                flowParty: '4qmqbec89nou4e7dw7q6ocv03k2vcnzsewyjukdaemf8jmpgba7ouu9cq19uubbz7n4ttbng1khebqnvxnl13d856nirzkvdj3blsphushbl3bxsbtl8r7pn2dsrftzvnlste5946llfmy8s3uqdydbce5ndp7vn',
                flowComponent: 'wr4xc061losyoubz3j0ov1wx5jq73thcddo9pzgr0ppi85n9o28czorowv0pmiowzyk8ai02bv1ia9n2ulayupfkq82kuwgg4bdkpoxq8jkod3x2k38xj9jpmecyggso610q5xjmct3yv7m4kx3jl0ni6z6ixjth',
                flowInterfaceName: '8bof78rvh7tf6tne6ou8oqy3sr3cm1oeic2pnltdxa1u8d78okt84aa71kqu6qz2btudtcad4vhfd3n97uka0em34b90sf674yjnhljqpm4l996gbfxofosj1f0o5j5yzcxnhkh4eb2nez5f3j9l3qof6nlqqmyc',
                flowInterfaceNamespace: '5lgflzgjumn58m96o6jy16j582whpwsa9letia93s9twkadjj2yokv10as1a9lmlbo2kyx1s2ylk7muwazj2flc1ilsivwtclxayj6ych5f5grk2fjr2dk5ie8fuxv19nrktgd8fj5zga63f0ghzqxac8a21so0s',
                adapterType: 'uun5769mp5govpatb4wu9a47b64cgandvycmqlkpv5ozxjqfkuofblpnysza',
                direction: 'SENDER',
                transportProtocol: '0apezs4rwnciflgyk3ufh9uz8zz3ve46fku9qlsgcnawfpuz15t7voh3bnd4',
                messageProtocol: '96uodhtazhz1k231uwzach5nzlvy4yxxff3ch5zp3pfhxrz68jhx025ot5hf',
                adapterEngineName: '2n3jw6teopnoe7rzk365g2salnbg9rhg2239xq9kp5jrltxhx9x4r7d7boyajivrzz7602hgfrba1wfna0jwfdof9hn3el44bdl67oxlnm8cyyfftsldm3zkyndsrcz8wczccdzi6nys2uncvj9d00f2m0wy794w',
                url: '8q7fc9w7pdab8gkdpv7gru9v9k0ih9uvpu2tbrugopbz2cx60hot8k3alj0pm1dws9ehpuz1w3gvut2i18gg30n4s8wioylq6vywu1c2veatmnr5mwqitj9oxxhlvlnsvnmhyapcuj76kew0ah6r99rdb8hmmegq01r9yffgjookgcj1uvzcybojqbehs1kea45qzux6dt2wx35d8x0eu1m9uf9mahhqyid32tjntwmk35lljerrf8s31ip6stsv7ojy3y9pgb4faivv3pt8un42s279r16eiijq3sny68a2l6rh8lfqz4vchrzpj1nj',
                username: 'vcyecugg8kaaebipuaas649lqhv7em9s0j2v7kecprub7ov8mgifo1lrmso7',
                remoteHost: 'p5xmsc98kqduosd37mqa5rrhqcjerzce8f8ge3uyyt637j2doj5cne0cpaan440prsa7646nlsiuujhdj6wkspbb439su6mjjarqa44jt22ug040llimhi9rr7835y3bhl1a16xgkv6yscoer5w1fvwk09746z56',
                remotePort: 5887679816,
                directory: '07afixevyziix1y5zzl7carzdpq5szg2ilc94ov9xzra7o71mos01dcbi0b6ed448yve30yjuemgmpsrdr9bgh3i8tjw0jod8pepkz4vjmljin4417pwp8zo7ldhyki1dc6ptdrt411rphme69ztg7xjri3ux7chjf3o74mea38usylcg2ki4hq5znpucjarwixwac75y7p4xxq1pbw6q70gdaz1xgi7z6mjdfa3h2n6a9gqtko5mzisndm49dwotzuo87n6qq279it65qo4kggirx73e3co7dxyxxdgjcjiocwhisppcoct90u8n6itqkvgbcoef6i7jb7qlzk9qfz0gkv80q70f2piwz3b3qdudamaethviebcwoiq6wsk0pm5sclksp0p49j6hmfll1r69koqzfem643508m40nc38l81buwsrf3fup4ka3uz4onmtc4j5hw0y7ycnh0xds3ylowhxlu4cvl0qfdg51hw98ro0kvct2u0unk90smcymy1pepiyifih550auhugb1b2k1dzi30fjjwtehwc9k6tldpli5ir88rxl8kyjhyn9qh290deswmguwjlnus07n5zjt5v2yvud7ildvok0bussedix5uwtf887j8lt768m4zfsa1ye0obl2tnij3h2bkds7wrec7pk9o64zw0vrg1ewkgsy8tu3264k6curwro5szs0j68wb4ayqw5coag1oi9j84yj9urdru5ptwzoohx6wfr15xc9lxzevganskqg7mrb2gipmylrw9woyqd1zn490nzbzk98u8yoieozij9intrw43bcixjcst3wz32j54g0pqo1luf2gmsparnrdqvyof8vivgd3x3cylwpungkzxk9mptrn51x4y7sf1x0h23jl8g2fxjnkwotk6middfc2jai92a63sjokyznkt7r18ijx9w3jq507bz16rx2g8boz33w3k74qn95tjrpqxeo471tec5m0utz8hyirbng4aj7iou69uk7l9cvb',
                fileSchema: 'yq498kohj75y1n5zxmpi1f1nd7wb6yk9ndyi38kpdjxn2o9twb0u083e7xs2tm5q545j3vtangqzdsfl6s3dgm7trj9hy8fnvlz84wdo44t1akked8gc7ft3r7ut1dp0fyymn633q2arhz8eucgltunnppfq2tafiezx51ad7am9xkqa8zmuv02mg0v6zqpkyb997gk1qfvnjdg3vpo087ept3bocq87uh6ytple1zhmq73uma5xx6hti1nejult3l7yn5ohjqji3i5j4w6ug6jv7h0h4t3ees6vmpujo2l7c2jcwap2b9wy3k19z5003nytgm4t67dmiql025rugiadn5fji0z8bfregfryt0d0b7q42vf519vbas92sat0fd47k0vzyp54k9q16tj8xkhp5uhfdurjpfbqcpvotheicthcrqa6t8jbtgcx597qtjmb0osbo99e2nu91keko4jyi2uzzgvauwcoxynd8r26kdh0o9l5fqlfaxbp2dlwcnjo02iykiaylpbgy6c8tyijj72fgezlb1x6e954ia6or53buzks99x8jwb7tx8cbdmxze6lrnphnz8ym67enetmseyzn6hpcjn4h59y0uayuaizribfaq80fvj2ecnnfq5gpf86kfjg6dih2jzghvi6x8rdf1843cte98zv9indnaz8ieo45ja5na3h4xmm3lswsgb2fwsbllt44zjlr2hspvc5exokyjc7gboxtdyu95wo7ke1aj0v6skq9dcfzfa5rc5vvit4rkt3vysqjtaw1vmji1kdv9zmot2z5mc3ob3q2efq9wdipfcjip47193crs7bdrbeiy2em51k45561pi7tz8raykp6irukvu325ooey064t9nq2c6y5j497kitqfbaz455cco0siipcxzbm5ye9gvnwez2pt65jkd781rmy56t3wc1r2aabnt1feqqfjethpwoxa50a3xlo5578mx14ko8ncdmj6vmsupnk3hr7zpllh4lxh3ntgs',
                proxyHost: 'rw3813713wxn6x8oy28rzt6qdrjgf3b4ocy7en4dvxic9svqr1nwkvsog3iv',
                proxyPort: 7893959701,
                destination: 'o0vr8et7hslcspz1j962wfcxvuug38rmrpzgr34tskjh6u95strg48tsro5og5f5p6z21jlywvatu0y5xg74y2vzqpouroqgxxsdwm48urtr791rp28l63ke8zsihosp90weygzotfsta2eslgacongmzbf4pzls',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 's6hzga7dztz5aoj7k3zd7ptgbmuttwexn1z0fzk7i57qw54cfuscku6pgbn6c50k2pz0vi7d1e3hbsv8t9kwe0etra7m9s4pwk60wnmmbh5zhnutaks7fz9cy82jjmcpgmzf40q1ue5d65zca0810zaiznneqqv0',
                responsibleUserAccountName: 'p0qlaj4ya4ppcfqksbtm',
                lastChangeUserAccount: '2zenqda8z1r2fvvq19ar',
                lastChangedAt: '2020-07-18 02:52:12',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: 'gdyxd4alair78mgjcffcnnuo999h4rmmgy4tvf84tkgz17vj6kcgex310dfyz3pua4pqb6ae099u16e0hkzvp8ohink64byy60dsqc41n2bpojpha5mo1jjbzt1g57b4wr145f18ug44q84jr2vhsmi63nguketm',
                component: 'h0t70y567ny1jmlw5dkbzw4cdcjqaj7o941nvj1mjo6gykxuoaeqsl8ihchd3a1lzwv01d92n2hgfelvsvvdlhnjb08n499bg2jf3degfy90vmmij7yjoxcicsk4n3as60nj2bwbsjynhb50tq5ij8px6gsfkapk',
                name: 'tz7yaokhmtygv6k2z61d1znj1qy16ia21kkpgepfbq86oluvk4skbtf58kvex26msfcshgl8lzp7j2s4tsuhbspltx1b2jtasg97s97r9tnvkvaxqowqs57zvmxdueo9bl4hbmz0dftykdkfhbpclszsikhldm1p',
                flowParty: 'ss1awhsqv8p9btimxooijq2z78sgn0ltw7v4omgrtcgkgshucyg8us43zt0erg22qv4z7j51vau204eusjqhpzjaiqtiw7qajcl70d3u6tt6wrddd5ets33mcaiqq71lr0mfke8ulp5fxq54d4apde1dxwri7x2v5',
                flowComponent: 'u6jq6c8jgdjkiajskeawo2kqaug6pe1kfs4t9nghwdmwhu9klh9i2h214d5jtmx34jo21wl31ry9f3bvfiaicub8sw6ii6tqf898v0f0a1f8qxyn949cc0cs8abn82p28dj760fzopvs0glihk2x28y6ec7mhnej',
                flowInterfaceName: 'ssjgvf9lic9e84p27pz66sot14qtkdxbxcg6omaha02uj66gockexlmnr8j7c5l8cfi6qyggs6ytb9or5umdie9cvkigswe0ejiq0qq5gbxddqmzwca52wghuqgfpdnk5eot6zplbozkl6ea17nnbtml193pfemj',
                flowInterfaceNamespace: 'zo2eq6yiiq6q06dwr3yqunr3p230otu6mq6hkcyuebniycaqcs73z8r3xw01tkgy0yts7hjq5u6ad7dzfew2amxns1k428g7rcoli3b4efp9q6n2j0ut6doulortcqjiffnwsfspkhwudnw1jrwj9oh2rin9kpng',
                adapterType: '5bkdbwkfot1icsv643jzj3a76vwo3kgyu0k6b7qsi13lrjt6nvhdf2fjpkqt',
                direction: 'RECEIVER',
                transportProtocol: 'q82ak20wnz0dhvv7clobxfdl7mle80qr51hurf1551m5ckg3ll47lvh8elw1',
                messageProtocol: 'exv683588so2smb8srn2i7ebgkj07ifuliq9qhymqvn62glw1na6vdaz1vb8',
                adapterEngineName: 'rgkbygy71o6trecp3zlhr98gd3uavamviz1mhmm3estii81lr0t0uhh1ec2r1zyrw9o2blq3bddgmxibbuz5emv1gv307gzi6298mqfwmkhud9bo4nfqmkjhf061gx5wqw4q6ewl3d2e20gh8rdpos687yykebe3',
                url: 'hv9zund1hp14xrrw83ah3ipgzi0z0iz4pde8lzko3nwblw5fik0dcq15hlavc1dw3dpfx7zm7ojxgu6r78kiuoy1o5p79zk2qsom0fdnc2ykkx9o3azv95x035cyy4n21n5kd3m8ekntfxs7s35vqvy7p8dx44kes7c5m2vgul19fy3s3u3o5j44gw7amswpb7nw28h8ehjz1hfks6ykuyqkwb8eilnp5v45owu1bajguzog5ol4n5kn5s0dr508h41rtk7h15ptjs5wu3qv7lbfkiv9bg05dvh0szxpsbhbvpl3godz7cluaxrehkiq',
                username: 'mi0btkxpr8geilrrbuf60t9885yi11xy7qkq5lgypdifzc30766oo8ojwbks',
                remoteHost: 'z8woah9rcgktxyb678zoc6mrvl89zf6ol3i4svoljvayke8xuppknsp62ivlpmx0ickhlo2grz5j6plewb149atnp05tvxdeanonlqotoiophun4hbg87cufddtichq9iznadb2iuant15x1bkk82c8bqidr3vhd',
                remotePort: 6561648053,
                directory: '7nzxv9yz3bt32bwdqek0sdo9p4lzy0djt9y2h7y75mg95gwswrkjd2zxgf38vw1dfjk0so6i9g1bc6ciyzlhztv4zd6dsax8202f49rud4c7wtsckcdsp0clbt1l3ehadwfv6epuo2e0sw9d3r1l50m9izb5r52lyl14ujdc79uxdpn269q3hf7r009tenwjzgi3m7nhjtsuoigaoi1k51fyru18x9ivrsx1uz6z8fbh7qarijp603xiu332o1mkswo295pf088fffb6tkzxzn62o85ewp76m5a2ef1su61vdppddv50vtjedf3hglz5leyxvzv404zjjabw65ghzdirhtaj9x0yx4a4czhwpq97uxn43b04ew10mdfebrkr0xk3nzubc6vkgxlhnbl954lkfsf83qvvihjktsdns4ifhdz7iu2fiz98cov4kjphtenqzt3ho1pz6rmv9ir3bouff85w29yeiifljwxwzz0z7wap71akzzis3rohljvafpqwmj995evx7kymrvean94jrbb5zjxfcwljjqgxposjuhyx71fe4rhoqer6sirtrvqodx92pv1hvqgovur8wueguol0ftu3el0tjp3kfmkc712qeva5i0b7kgeda3a1fenu5xw1sqvfb7r4l0pyae70s6nsjyftlj1tz3m0ik2d4bakypqonq8nlvap5dc5r2zoxxahegd5eaky916pe3t6ufuxovrz7suezxu4av3ktnx17c35ajhnfb1936gn99z2vz0im4rqe24b01ohwccg03uiu1n3vg3q0zl53citw3288perpmid4fuof4zzv89aiyza879jpqqt8nmt3vdock2ff5921j5bmg1kmylhlq44ejyiky880pxsuf99sn88f3cc2xve0uts9m2m4ryy20xf6suf1wrve05xc7rq8bnbnky2lj5z207gz619chlfh6f4999t5ebsav5h7vqggbe1n1d8mal0qoqbcrr37gnx1fuquk3jdxp1mv9r',
                fileSchema: 'em0yrs8bwo4zgev83uhi3xeekbgs7c3nbxmpo7yjelsv30dp4m35fcl4s3m8aebkqurza6mbw9i6m0dgqnp545hsigqnvcncgioj0ehuhwppmfmj8oe8w2egz8moq9l3wzxi0ldvpzdwn5fyt3hu5ypx1dubu42rq9oh186i04s8u57fzsulk0s1qyu62qtmqih3zw9dotrsfo37xz8lwdobe9ghjr2fldbf6age7xxgnsc8o1wyjwgxfc6h6dtcps7d9s5zs5wdrc8og06ij0z22wawcc39vj8v94bs83nw5b8g0u48fwvgbxpbbfi066lec4jel81c0kzhdlxyz0ac86dcp2n8rclgqho26fyhzwbwvzja2dmu4w2a85jzu8gbr847wduwennyo40kkxsmfkolhqy75oeiszrgz47c2r2vzny22nymc2xwlw8hmx6calohf6o3zqe2dv3q2bpqq5pbdthhj9vaop5xen9xswl5fs4nut7o6xadk0we2vngc1rn72kf0wut1jtd4jcu9l0qm9oxc3zwxgv2045qo8rzqantpgm7h4oqi96pnm9isai9fciz373uqdfvs5wkjy82ithmxsbgzohc74q6d2vjtrks3ox3621p9pyy6rlai35p32np2yxnkn5kqro4kxql0224cz0t47yjwy699ttft25q8shr4e89iex328f2z60ornny4ky59fa57lq8v6ds4t8f4abpceit75auqfyrc7k6jcdbdwl7xb8y5598tak1b7uqcebiuuk9mjq4dqbj4w81qogunfl3yoduhh9k81vm3diguls4skrh6xy49aj8g8jnr3lki2y3dvpz9p9z4j39ieh58jp5zwnk68e44nlqstlao55nopgm181m85u889fta5id57xi0igecvdekny3c9sdmr3aakx4rudxcpciygbimk6zjd5bafcaoawvlj13wrlqi0fr0ti4gzjv4qm8vzgjbvvnqsjj9b7dslvte41p6x2ug3bz',
                proxyHost: 'f5j3k4klxtm7tvjimj10tqx3tkjsmnd3atabssgv3536kuhlu2l65vu72kwp',
                proxyPort: 5955609547,
                destination: 'vi1ynxbja089x563o0hff7rygm0e7wqgixsgswl74qn24swz1y9f8hcvo91i0ia4i5n141wpr459z4fcoxp8qhv2isg1vy86ar1mi38893x9yl0b153tuzt3h8hhw1w5if34r3ydcn0uvs8la43iiivi1zc1ydae',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'e4zolmwahsapl9f9uaqtc9cro46szm6p9k594hx597iqqfjg9pokvnswwla83873eg1akb9ve2v8m74aiw22p3dhgbk43ta609cx5eoq6vixiczy2e1x3jnixpj3rcjywqzaols1oko51hz3ks9epaiprbb83vu6',
                responsibleUserAccountName: 'tjz3hiuqlw2pclqlzclu',
                lastChangeUserAccount: '5rif7r4tjyzon43fip0h',
                lastChangedAt: '2020-07-18 12:19:40',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowParty is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: '2xpyzm4i7alerojm8unfh8cny7jr0se9mi4zuhg7ajny3d3p648mn3fztxktiizucyi6322eqzabe8wxl46kv0d9lvlbcpqvmwk0vwszfsi2iwduo1whob01eh2ahpayu1si38n7mlbck1f9n253clf09n72rakq',
                component: 'zmt6dp5el80ludx39pp9fuqrb8i8gkpa2s4h8t6c7r37tit2bbaraa773jvzir5c24l99pglubwplz0tt116g9cqmhroz83nmlba8audio2cvu0om1s8fknymaj0ww3xsqqszxw01gwbkmk4p3kcmsjfji48qy6y',
                name: 'axc6feijgcetcnt6q6tikdl0eeu82li6q1pryhenyo40fhxyej1cacvku6dhrldeje65of7h9pr0n2imvgli05g9b61ocymwp2l4rb1rkm7ball7fqi31g36o9lmw8w5lqhmi00vkumm7tfuomm21sfncc865ssm',
                flowParty: 'e88zl478u9inqog7yawe5gplsifvel9tmf12x3sutxz8m6ezlg5sl3348dh4u31mvh641jyo41u8s4133pveugby5pg5torrfk5v61uiglyhckr4pfoj8vnfye1gc5hb41h78dwprjwleemddj9ilijydmyxj5n7',
                flowComponent: 'ty356xys9v3d288yxwbp3o9ix1npwn4y4utmdw33n4pzh9c4ptx40kwo0pe5tpp0ld2icetbj499pr2vcglmt5ikw0ngq67adrd7udppjempjl6m49wgmjz22szxd6nvthkak4r0hisgwfhcffjc2n2zwicwqagow',
                flowInterfaceName: 'rymal07khcj2n12qlokjlmpzzu8j28i1r2pvz5kw0dcjmthggfi0gr6r8huf06if0xm7b9pwgcm0m0kgo9up4fkcu1g5vtzqrlfp8y8o9hn8qao9gsoaqzplmgzveuh0lj0rj0523xha1m69042kk1jdjwi47t3d',
                flowInterfaceNamespace: '1sohx65hpxb9yqf039yuhjnclc8gl4yun3imtghiszmnwpf63fybnatq9u4fil15fou3o1xbjoeae5u5q4rgrxqjmzkvohfheldj888do5snxq58sgm3s3d61hbtrcctf9534duhit886mpfsav81s6bigqyje34',
                adapterType: 'stuyp8v86v9xn3nbtdrt5k9y2e6nfxjh6zm3s2ew7o2mgeps8jiaapab9t9c',
                direction: 'RECEIVER',
                transportProtocol: 'w62utmjgsf3dq024gkd8inkeli0mlfg1eqownfb61ygb8fjjqjkhvoino99p',
                messageProtocol: 'lmmv9oyfzb13ty09u3xd78ybsv744n5652rcf066l7wbvlo8u7abx7km7f29',
                adapterEngineName: 'sq2ldre1wl5mq5yrqfnpq9noqr2gccv40pjg65keerlxcphgcf7bn85zuvxy1r9nagredul2h77rhgh8krbv6ib1aq6g8wb8cema3smjs6x1uuct0fin2hjrcdvu0fs00oa7opxj7uxbh3omzfkdmzydmdklbp8q',
                url: '31vechwwzvs9g06zqjbqalkbhyilqmfmdh5uysxo694s1lyci90qt92a6dovwkankfv381fnxzycsqo4ikfweji27itg0ptbch1yy59rj5bsiy0oe9j3nvwzocl29hnvzs845puapktl8vwj6m3wg0xfsd10hziewy59w2wsxivxfiudolokvwkcnps4zo4uzw4ii9li3w12tv34zmicot51bxlkk1n6r9581v1p6qc48vhblqwu2rlqynxujht5rq07vrac0roya4uam9uwvsbwhgbusu3bmulxfse0brd1ek5b7n4pbnf28a22d2xn',
                username: 'zfvmu2rvcp6ketftxnk964gwnqwcxtgtyniioqai24fcnyhqclvdasn4jmpf',
                remoteHost: 'cjmwqp0up4s886zqqvpl21z2x81z06dgg69myzxzslkwhgpbteqh2ke07udzxisz3nmxj5jq1ds75wtthgkkr2hxa10u5qts58x8nl9q9pl4yxvuvnkgtsd2e6399di1zbjsy34rfi8ta7e1sdi541sxz1cd5gzf',
                remotePort: 3417468846,
                directory: 'q7855l58f1gtq621sjfyyrrqjarqbzlec4dizhnwysb9pqmo9z2q7qvgh5sieflfz7jjd0qcu66nlzcj34x9q3r4aogqs0geiuwmbpfww8rpnew1hovonx0d1rumy2g36rkjj9hx3oavxhw75k2lqcew7nbkuzqvdm3lns4lzimlc3hrkw9eqh8vjlegg0moyx4g28vkpyojgws9buqa2pmu0hh4u3w1pay278lzqrujsc4vgfybr6tzv11fgxukiadtq06tumraeyfwgxacuxvx2mk948k1w7vp0i6r9diziryzefc4eomiegrhbzimvit3oy5a3bf8ms414o97dy60hsm4kaummrz24kvsu2dox3p438jjgp736a5qdpki754w8yxjchsm80p7gltoydn8t6hfni4bsyupqjlaq8o0dj4xffr6c57t47di2m32owjtzbmthju1bbnqim3gtryjy82j6wyg8bbk8jgvjq73acme5xsuaau8fkkyxu2novwg4en22d9zbc80bqpskrmx7lqtnnzrk99mx4fsvq0p8ihp98827gdzp7jgl758uoq2pbtr6txfq95qc2vuxvtvfnmw5i926gk58bg7bb7wd09uus0oqyhzlpta7mmre7kz7xxg54te9qck7ymeujffr5hyh5hu8p1x7swpug7kw0oci95k5qk4bd46x438en81xxpouptbiqovsmxjeijc7usfjrie4zlchdngosp1h6e5uugw7lc822gqqcesr8fbj8n2oq3kpgyuqu1i3t8parzmtoz4w7w6kvsxbrcbqflsc6vzu5oe7kx2qadnaki890r21ug9lhiavr2vyph5pwc91pezvr2b816s5k2htpob7knf36q6kd880i0ackvmc3nl6h5sz4zwn37ciyy616u6aknumvb4lbprueqziwmbm644eam0cw6j4lsr372fbpu28g41i02b7piyt7lgvxyoqg0htv5w0d412a31iyokqeyaelbzr3u5jupw',
                fileSchema: 'b69du8jidbt1ttnjs4hepwfu3jkihx5my4rxvbgxot4iwjhyin0w35lvalh35ifqv6indqbcqudz9f2yz7p2fznrj9pug4y6pqydvjqjmpxgwnecen1yu6x1vjxern4gr4ehd38oubhojwaxuief10tx5t40d2761fuurm42x6ubbrm1njadyt21nx8owqsftnogojsfrvu1netjep8q9d3471iuq1oxzcp4sr9o6dpiqmiffbzjqdh04d3nc0nmr3c4oblenlshtg3wh4swdlopad8n8r6vql9bcmuowo62szc1ts8c03tl6ltmifdk0n4jwrdtcy0682bks214l050nuejhakgdazjnkf1tz5fe2sjss4iquez556f8s9bopusdy1sgzmr0idd5odr9kdnp92ag1njmmya48sr0dwkhptwgjuf32mpwnr63lj7s5lcrfm0inlv9mlahhv11wb9bqwouyu37ryfg7f6njldiyru6t9bq2fdne5l14oirr40z5lc6ekhq0lquhd59z4kt6ps3pijknebnaocx6r9tbak2n3a50srhufpl1mzn4xfo0rj8l5b645ee4jzxs606umexsiz6wgm5z28fdscug77ppec34jby8bb1cuy7wyzmkm7n84vehrazc0karu7todoiclh5zuuy8uq5k3e9earg4xyope05i9l0t1whuxfusoo4y8m4joslm3g01ao8jqaw40pu7yvemwas5bavcdd8loz04sku13l4a094fvggpemc26s340iz8auwtu5rlkgtcwp9nfxs9axv5r7oeezwultgc7kzu7mdutgas5xpx2drh6c3kdd12isox2wckz8shoz0c863u4y1ku9hj3wofmv1prymb0k7dptlg8uhzo9bcwnediivdusmynui1c0e1vb2tc5mv086vjezo188yz9kewwesk5okwekxhu5a8d7c24t0n2go3hdb9riawuctq9628plsvq6h46ww6hotwqoy02vkrznqcj',
                proxyHost: 'jy4vnybvzzgzqd3w2d44cm7bb12wh5gqklqmgbjruo7yhra73prp66cjvqj6',
                proxyPort: 3797211307,
                destination: '4eqm6nyqr77d0hj43evpt827k4saw03643i5f8590k5r6ueflt2vtevrfg2cvv9svia9nfw06vw03d1m60co2o8gs9woaob873d7xa7uda7t9x6zksgokko0gygfxhocc0zf9lprz8bu3ilsl585rlqocetijqpk',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'kfkihg0lg4tx1p3arrczycgpj0vqvauq66lv01ok3j67afcl8pdue961buz5pldpor8v1y13bizoeponn23hgsxr9twkfwbzevlre3smts4w68zxy6aere89uonljvxbw9zou0yoe6kw1v9el15pfivh3ob6wi61',
                responsibleUserAccountName: 'maryaooeevqvufkzotat',
                lastChangeUserAccount: 'fqrznv39khb2m9guthpg',
                lastChangedAt: '2020-07-17 19:38:26',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowComponent is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: '1y76v2ljc1xv9ci5qfetwx6uqibmk3up4mk899j5r7fah14svevj7u0s9bilg6oa671oyr8vz8pmnmqssbu5mwhrsyls6f7ahlj2fgz1o6900k15hwfg3x3o47s3byaka6hsaizojbb7av0yzpox0iueurddheul',
                component: '6jybyjurr3bh57fe80kbcs62jmfu1ydkmbpgu34hxcmwgyjlxan995n6jfwyubn8vp463j5f2obsfziysbnff0zjdtosaj3gwo7exmfj4bm4onx0fqqnqi36wid5tnnk2p1p10ihjpwf73p4j68fgs2yahb5fpy8',
                name: '0em1z88ni7n9pcrpbpbfb4q4jo9z9kqlots3sq13baoislrrncnbe3hvvkm9bzv5o23w4o9fxkucguw7mriwf1d1m9qxa48iyeym2ij9g4bmuokbp3kba2gy2hzx3zdxmfqaiq4ojjttqaryqdynuvdzkhh99kwb',
                flowParty: 'ammdq9rt0g90morqxa3vay2wcx1024v76wa8vmxk0nhiqjdn26sf2ta26kq5nxfnu6cncgb4t9uimyvaxd6gexaekhkjrscku134yvkaghdvu2goqz9ao6qcj0aw0ydec3vzwcgrkb0abb7xeoo824ot3ivof2gk',
                flowComponent: 'xkayvln70yr80dzl8w4dlsngqo5mjffauzfpajl4nfoy3kn7rbk63ryk2r7t4az3crcpdeh67lckvkyo6abu3zuzsx1mx9ksudgx9qej2uzerc5ty4ydd8pq9lzvn6s3o0b7tywbg8ymx9jpf7vkjx90r33ss73q',
                flowInterfaceName: 'kwzaxk33fnml9i8jneideiudozvyfbkngjcygpcbhw73pymd69lm4us012jlmu1chdp5e0t22ngmli0hvpm6sodbmnyjbb2lwpo8te73kfjz0vaa9o4lb5x825o96yh5yqk3dwus3dt1okz4ttqgscc4edjsii84b',
                flowInterfaceNamespace: 'kl8trd7ruqoasmp950rstre34xxxvjm1q8p1y1t0c4aeu1r23zijeuqjjh8ovqzx5fm60qj1m8d3befxpxmckg18721q7qi4gclkr5d8t3mnj9ajn4leqzaslc9pav61n1pzofzgatvy91qrl5bhejaodqzbkxm0',
                adapterType: 'rdvbqsd8c17q0jdzerk89cko7thjt5kyp8s2macoryd7leskwettes20kr35',
                direction: 'SENDER',
                transportProtocol: 'tff8jcjzsxg0ddou7pw6cmapswhuv29xgv1r81cdyn4x5vi4z6xnzm1p7jm2',
                messageProtocol: 'n2k0akb8yaeysc9hyqjtetiwuumrsekgzek3nwwu81riw0xz364m3m7x6qyy',
                adapterEngineName: '8nl3h3s4xexmiwnqzkoe153nzxd77ybw9sp4zf70fqef3lzmymjrf8la5el3kg73a3ipbq1ss6ipsp1jd4gek3h4cznt8ke9iy5s4tqpeupz2xn0wt5t9vcpdn32h0jj9pyalzra5aylhqegh5wp865bpiwc3qva',
                url: 'o0zpaozppal53yeosv1vz5rvhz26z4olkn8p1aj3yln6t35ic1409zn0aevkskswh2jocxk7ozt7yi01wk6teyor3mlv0mhw74lbo49d8n5y1v8esf2vxsxqcua7j1uvanz416bju6cqtfb4tf0kbmjaqg64wt831rmqlbzzpdhsm2d92vfrffyjob4755wi5hvk20gg1garz80v1cdriwzf7uah0qicrcstydbpoz3g6sj21j2jtdbcg0ttl5n2k8l51t42zk1749fc4pf2kglv8pq7r6ffy0nomsh176joah4c0b1shiy2fqkg49cb',
                username: 'm8ks95bqo1fvw63fwby2uorduyp09o1l25pogn55c4pptfwejdht9ejoz6yj',
                remoteHost: 'sukb10nlhjmpoqyxdfpxwbyfweiv5oomi4i1gbp4bu886kaewa77fcrsemiytwsjs7r20yajsdd0gg9j5l19tm7wix84zcg474eopivm5yhspwlozkr0z3e3t938fgeyf4phm9js1r42h8vaoloxjhut7i7i5p3t',
                remotePort: 7431881572,
                directory: 'simlvgwedmboetal7jkoizkkvj3v2ede1magoqm0kmlue9fdszmwyss693ogzkocyndnkyegrr4v5vk06kzu5bs27zncb8k4tesw9jcpkadjk58z3u7b2h1arubwoulnuw4fr9piu8j55bjcgs3n3yai3akqtd1ed08lf9p7qtsvcnzk8zbh8569nk5wz8nsy1q4zvof7m7dugoaj9fejqba1xhuk6v06z7vrtvygzht4v3kb99rzyffo24fgswb1wq2a934o45ggpxycbbubb8k3x3q39tbr7wdkj7fo795hb4d6db19nfolmva77raarnttllxyrnqeghh41tiinygo2dkr9pvom7tjm2laq7w5j4f4jvkbsrz2z72j23ztc6ypy4sa6c7o8rasg8bzl3tdy4vm3c8budwhw7uladw9qluagrfk5ac01i053fchgci8v7f1hu5ufk5j0x748fqosljiiax8gxrt06n68vb8jmgzu8fx0b5j3d9fouy9r26dlec0c6geyxwgjw9awg7pksmmpg5gecrjp8o533p8jxu3zp05bc76rlystyv4m7o5ekigqjye6emsfrh1x6ammr7ym3zzzj1fwjxbqrcful7lvvxjabs0sxqsntsg4xhuelo6bty2ft7ye2y61i64a3zav9tyr9y40dbu04kyhgap337v5l1ey0awg918ki48pxtbk3jzn4mex43kfevbei5f0ad4udvmcn0wdma2wz1yakjpovalrm6yds9u6ythy44k85vq59khwwzqf5ybbyyvqkt7ohna37vy2rlb29nqqc5s82g3uec1c2qivvp17lwq64j9lo5q84pxuzuxshmf96rju4sfm26mbhasa81teefa127mj51yk86a3v6vwqnldeaoipw6x0jm0gm1xtmlt3ylefrusri39cbihiuw04ls1948uteftcwv9962kl6o0und3qxv3r8js2i2luevss63gstsagoa63oo9wxs58oues27qw748wz',
                fileSchema: 'pex6u2id40kwq7r9j6q5h7rh843nlbbcbvf28e6tmvy201q671wy5dit9pq9dltohtxhbieacvvq2jvly7nudo1uc3ls0yz13wl0vdk8x2eddsaftbs7cbbizwld754qdc1f2lh94opreopgg1wpjsgzqt1dva3zm0v1qd88r5iy6tm6p4dgp4ztbu20y7g3i5x7r1quks9p4ukpbmb1irmtyrpfrifli0vrow7c4pqz406mfk0b06xd82j8q6w0q5xa0ci6v5jk7mn5jli2kv53opyqufbda5evk77f5q9qzwqnoca44dr372ixzgmjktj3nfa9orzumtheg1oookxgfv2e1jysel7kz1lgva0vns6bxbmh04u6y96w90tf51nvfx9pmste7knj42c8hyfb04zqnsqmb4mi5w67ggklgf64z6brvgj8ha4tqiioxqgz7145igt4oay14a2cej9273t7n7e695irzc6oh3x41i3kxcq6b5yhlz5ruitgaugn0i406z08rd4os1lyb6awcjfog7ldo1r0e6s05wvmzbdtkc1anyn2c2zi7syc2sr9c1e9ykewc4li553h7n8d1j4b0clj44boftm82km6hwp907cy0bcmr10e6mz7wl7sn1cr3l2acu6tev9prlzqiz5q1874lpwuyjva1lyqg6psq84q87e7xn9gdxf7974cv9w9h8bd6a6ngyd6tb27natn58tzzbtwgiv9cvmd8aznji9yt5gv05o24uy7t48vl9iz1oqczpivla2s5zbeo24hubzi2nf2ioxz29oao795q6as50nms8aa7pqb2uonco6ogu3upritd7ch039juiyqcwaerydifj1sghbfu4qyeog85oufdrkrtpp1jz57hd033xhl3i8fukwga46p2qs88s68muim3yqpgv038qbd23ca8d2mujzi5amjg9qi54bdgvgbqg77lnbjaguw6njkmfcsk06w50mhxvpd1mnprgeuacorxmihga8c',
                proxyHost: 'igscnkqjdr4n609pyemvykhqou3e8tlxdjq0dr3b0t4odzjf3ovnabcm9zah',
                proxyPort: 7211353207,
                destination: '7obrf4zqsyi7c3qfgosr5xrfefckcp4t9xwd06jx3ip0xodb3ntvaio57ut2orn4o62lzodypjf6gvkavrawllohm5ga33e50y2sgxyytmysf7cbl8dlset3d6mevagi6e9f5zr86e54maewiy76m694a1aqx7k0',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'hkcjsag7wrw7dvcwfrnsz8r515yg245flhb7z2tdss73eohko27ubb6todsdxdbustvb088i4743kznzdttipcmo6zqmm2sb0n41k99s9cc4dzpe98p9suvyt3dddm6r7w51r3m1u7vrbl8d2ousag7gsgsen3fn',
                responsibleUserAccountName: 'rxmvot1r1mqvquqnrzs9',
                lastChangeUserAccount: 'ca3w22zlhtoqsz2twh0k',
                lastChangedAt: '2020-07-18 10:33:25',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: 'kf89rlxb9kjsiwy1jgtol9x8rhqppjxmq606f9nmdo4a1mkevtbisvft8lhzkqc7znm0fenu484wsxvl6hyoyy2ldld248t79oq4x62cyufujoip6gilg8cfo83dlhgyos68ky0s73puuneovi3x3vi0jjo7xznb',
                component: '5k4ik5w5vrlwdrgb260y4s43xwe3fcvh2yygc8t5ai5uzkm24ozza02dwgr5plvz6fhl3jc2e8ikiq3liijiuxus3t4j776a2hghmpah61jf4r3j63o5hoa63fq2tyh7szhepr4k2dadkzajd3j666alm3fadw31',
                name: 'y9jpmohwaoa8pxjbqrg1m2giov76ljj2dbx63mrw41islsbip0btrl0g5zdevgc8dtg5umns29w6dskimz547gbudp7odj8eolbufe9rs2vo24o6y3gqq9u73ury3nf8c1v4jgcq5pniz1onz531rzwa918bdn9a',
                flowParty: 'wv0h94rbhku4dole02krej9rlzuja649vyd4qga3to1ypifhqn8anbqcqlh0x31jx1evpfbff9i3kbrwvhmxuvmukxmrn5ttdjmrgyagubbsldzms88jba9hmbhpehftbx5h0569i4jyko4el4cx2yx1pr1ovwoz',
                flowComponent: 'ogh5rahwul8q2auvfzqkxabo8ah4i22xis45ca53ln1lnstxeoh44faxwd4cs2oknpp7hi6ss0konu7opboppcpevs0j3it4pnpqfp2nlz5dexi6p1lnqx5blobft8a9shmdwlr3iay3c25emg82u0ruj3huxo4h',
                flowInterfaceName: 'mm4dwfl3q4pgicmei5wrf1egjx6sw8bc74a4hu98ptqb00y1o2uv34w3y5frnjk6h902u5wx2q0gjt02v5mdxusxbkdt8ltb4xmbbeqq50zaoarnj8wgete7vza9t7pvdh1wjxzykjq73juaxrya9mm2asjlouja',
                flowInterfaceNamespace: '4naq472t0wj4tz7kbf93ptwpq2kfbtt65x162buk5doqzg9igqr9jwrzobc3x6vvwdunoewdo5wd4n8fpm7i9mnzu84ld1lbx94r0jg02nn8ezydmksl3arf1zxn91hsioygsrgorw865mqhlpz09n4ok4l1p0dib',
                adapterType: 'xkdu8jnmsuzmmb0xiawhd1xf8c4yooaxy9icgrsbgqfvxtj5rdhto6x3ya35',
                direction: 'RECEIVER',
                transportProtocol: 'gp8g6283832l9odq9mjt8daej51zk0fm0fbhcf0736jec6n4mtp3ywkdawgl',
                messageProtocol: 'xibix78oy2drc9rnpjyh7xb4rljo68xzwxdu4v2382jqzgnmmkcu0bhnfpnz',
                adapterEngineName: 'o3umjufrmmo4mgjjk3nqyu08jd84wjwclmrzabp8ir4finsd6gw5onbwxz3qlnc38o6yu5fj169vzv2e8cr9ltrnxqekafek5z6x9087y0s5eo15i0zvs8xtt1k3bzd6kvubm1ccre6trt5ruqhntxdi0sb37yvl',
                url: '6y7gx6kyozixnvth5anwizl4tlec6220rec5osaj5jzgb8sx3ndmldouuumhno5fwy45bmg8qab566uqeze7xhf0d2b1b8tnksdd87wo3pvhyqj8tfcsoz0knfk5w2hcd1oviyz3e7a5opcypibumqfzheiiyqu8qriioq23ngkmjg5oqdm3dp1faywb245sf2dzlaad4psfqs0qca8mfil19u5rsibreyowwtky03kahw3ese94thih6lopmlwoctrq6rl1exjmvj4aazsnkuqgan16fwwvs65xkcu702i0j6p1g894omls3j9t08ty',
                username: '70a8gqzzwpvtsazufnfp4bmewzx8yyzy2epbe4byjplecc89ltdengg29s3e',
                remoteHost: 'fitwfm8cx7k5ux3hl0ee748hl3khgbrteiokslfu5paq1sedi9qrnxhive8rs9r84mpstdky4gejkezm4gccfpdmu45i6xzl0pz0uh1lyxmrnkeo12fjujneskm8taklsuroxfgrnma6nlvnqqhmx7c1v7cydpxu',
                remotePort: 9793513554,
                directory: 'fimlof51pac6i8y8oq273dv1i06r7detjpl6981gu4vk2gdiy3lym3ipd2zpq10vo222ge64n1z4g5i91u915xe2g4rvfwpb9bbyzamaqi4f9xms1yv945m2iuudvvju8sft7wtzz9wnps8jwg8hmaueqxl6s21jstde9syvwzubt59xhff3ylorkxhw9n953sbthajo1md0cfl7gyewth9tbk20pjiejngaln9pfbzqyts2ga8rcxa3aalfujt7e6nhb5h6zlcb8wmve4iij4i39nnegp6fipgqjbut4evaak8985tl27tr22uzro4qomgcjmd8yvg9i5smok1wlnqfes175ziwvol5wntawuee3e8y2quacp9zmev1hzhq93777d0zmprbdfz6pvvxza9af4ebawn2cp3krapkrzh2ipadfysp2f44s5xfyaur8v8us8h7t7g9w85pggl94z0rr7ddegrzibvsvcmgzw19exx1rnkh6va8x2sp8lqoq89wn925igrfx652bwjeb07yrykjr94ndojnhzgvcrto9aqluo3tuvj8i8qlmaq3xpskrsrv0hfubwp2yh838c7hzw45xhy5gyn1c3kko16g2mhralccnv6n2w0mvjud2l3ssil668wpelb637fzfah2iwo8jxixslmfnvnpn4eeurd6wgcmms4ciqstijtarlxwyj9h686cypke02xqcp18vk67c5oqdwr40ogbvo8910qw1a8f6cgoegzjmi9ctfqqye5qjwiefa4ftvu4wp4iiz2kfemjjy6peoo85dhbrmpl805eauwgil9pm7m0xxfen8w6gak3gfz7ohtdzp2r8vv8e7muxowm15fyguves1phvdgt1xhsme836rxf1sctw3bsoqohcnzhyp03cjkjkmxw36vm5i7fu5wloklxwe7iknj35vc9j8va6i5x460r1tx02gxwb0o6zhidfrtvqpf6kdbkr47hr9fgh8mgnt1wnsye2nw7gvty4qp7',
                fileSchema: '8eupr52nnow59f9h2hoykkxz249dw6y4cmhrzc9m9axwmmum2vr9wv9f0okhfsofamdbl67g5azc7uv32npgylgj1wg8lv65b49c21sp2l3ljvmwza4dz5i728x992i9vutvaeaw9hrw5a3oatlt1kc2np7hf0oqld89r2vrc8b1rc99rdgf37b5nw33ix8tcpabxoafg2ophfk7tlwe8kqnfqek6qgdthjcor5kdyi2dwsb5an5jbwgdtdgi0p6ukml93smllp199spublv0nf5ho50lqv59vfw3mqe9r1ly3eabjtp7znuk1k0145ndhp29e8x81tlh317pbxvthcx9jfet3q8u2dczhikt8poj0khhvvtkmfil39kv1pkg15ge4tr1vud0d7b68ja80ayp559bpt2nd0ul08qr6s7wfnacf3q5fvyv2tsfnh7k1mevwq6x0z4e1b7l9llkvcncktmoa6n4n1vkjhffui3bd5ovms14opvdigww3fm5931hxtfcmnamsxczvbjbh8z6rza3ys4blxk7p4kulo6brgorw253nzgfgwremifcagwb2r7pidfg3ogm28e5ijy4c6bpmuzvzpk1m1iwj171438m5jfnnihm6fiuy60kqm7mjfbk8000ua2k7ldu0675hx2uwkghilwnw49comv5wwzla0k9b18l32qhlc3wjx0cc4vidqvquoopo1ko6jviy2gurgvweoga395phvfgesiuscpzvdqs6ar91cid3u1go6e836gfxleqhf8mwwvopa2o3ijx7qjebsiml828y607790ncce4b71dtuw3128q4sfzjm4b56l2tsyaiq5673f5qym0uyyihy4yxie4fhsjzmit3ioglx7dorqcr7w0bqyxzzwo5nwkw0ibcldfhytkuxth9izzgdaemj1bj2olvioccvelht03vwki8iyijiwwql8qkuwh9g4t98qkm40eraanw5ssnn46v6vtjww3zbwyc2mt39dadp4',
                proxyHost: 'qn4kqva3fx4ullh927ms2xu1mb0ohurhs6n2k3ta4es405qjg5e1mravf44m',
                proxyPort: 7923967582,
                destination: 'y5vkbvlfg5o1x836grvvo1cmwl44c0e53qwcwa91r43tmbxlkao0bmgk26so6g7gogbr5vow8aubyp6d8irr0bkh74ghqzkao8j38jyqq9fe4f4omnw974ffu3tcv31svy15n5tt56ocyeuzkgavwirso94oq56v',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'n4mp2o7kqwomlq539c2huoletktblb2xz1weha1yy275zf3ji3l9z8m3ma26zhxmyi917yv2dctfthl5gdo18g08lu2qbmj8iq5awvqp4oy6g59kzo2m617nuo3dca7bj5yvgxsh1ae57vklzzwntokjv1ahf6k3',
                responsibleUserAccountName: 'qs5viv6j9kctr7x0r5el',
                lastChangeUserAccount: 'c9b6k3qxo9ng8zdigga2',
                lastChangedAt: '2020-07-18 09:54:50',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterType is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: '0r78p17om2qjwd9kx89grzwpew01o1ilby9fjn01ym0ceh6okd2cwtebnqv7ziissvvuedo3z5ds6rwvnb7sotcraxv4csnugbs598pa2lk31fkfgusypfmkhn1z3smvxn5s1q8hm3l8y773nrljaw6fp30xxqrm',
                component: '7t94ky4gla2l8pyk450l9clxwzt87ll8hzcbaknsd2d8lo7m1c52sfc9xwusoq98qrbexzp7d5d58uzkycimdjluswyflpa9mepu2xknax5px67uei45h3aynt0svfvonx0ei8uouwdki62phq9kczf6xdxep0ai',
                name: 'he7ik112h50jjtdun1zbrm6ixefc19m5krt8gzaga08qg28c1c1bxnlona4kn12cpxf0wxjhgn8p6gos826o4u9n9hgvw32olaulfkgfunlc24tug4ng22lqijs29ywkb33jhypj6okgxfo4sp1lqrp310o5ei34',
                flowParty: 'n4yvrinj1yg2it9hctlozw3gm0o34yzuxw7x81iiq6173kyx9uj8xitjph2yqvj45skr04hmnlqemxxfekrjga3zpycb6ow7npyy8srfjugescnnza2ezkll93ssm1dhaee6fbrkvw1fc2e97q5729fv43lqhv9s',
                flowComponent: '2a1w88cvvrj3t0lt79xer4sm1nczwftg0jt4pp4cueuwzfe0tvt32vrjvxdz6z92a8is6hh2fkf3p1znyy4tabm43fq0rs834uusut9wy3hqw5uco4ua3x7rcrfsqsxku6m1li364die76aqoh4z3d2660rp0v5w',
                flowInterfaceName: 'hjbv9b4ivc72qlnm61ml7hvo7eeshezscij6l6wubnwptwb9ejdxzjzbp3aedp7md7rdafpiw68mqzb5zg6bng3he99brae7xvps7sq187dx4lja6hurzlj2jqvr419ym2rtaxbqagh3xlc8lejhwwpr8yiytfxx',
                flowInterfaceNamespace: 'ivfroifjtk7wgf40ykehjk2jbk71drhlbg1netk6sj0vid23r49t8fxoauiartumdfhke0mzaf8bx0l4cgchvkgoh43iy39mwtpai6qbkoc359a6bwz6g68063s40ndssereer90x9ratiq1i5onin8r12ldfnzs',
                adapterType: 'n6x2i8jz1osjntnfgosznoaa47w0iddtchn5plsbl0829k34kae5x723kthps',
                direction: 'RECEIVER',
                transportProtocol: '8ht3co1q9xdqbw0b9aqpxcghshhg6k2z1uy0309n9sc4thutmsbrvq4rkyl5',
                messageProtocol: 'l0r1ou2yax4kdzniau5gsj951rbr3r3xpwbf7lx1f0lizs5tx60t356fjthk',
                adapterEngineName: 'l9p5ggpe1z4x7jljuehwxximqqip8njm8sdyqzrlg9fh1xvpk1bt3mpisiomwbh31aqfd78vcoat9ojgmhbely2xv3qeb4032qnbc0eh85out18wc8v5k0k2sd39zh994tuqdqr86m4g5dxfqzbx9yce4qg8ilns',
                url: 'xglkv1cf73nft7mjrc0fwdzz5folqsiey7rfn69ms9vgzhnk7696eml1iejiof7avd68qcyidhmvhfjj46bfedph7bl4iadht6cfqpkgrc3fgps2jxv8i5ns1xq8730pd48j3y26h4pphnx56vof6sbx6oj269h2vobuza72c9x2nn4u69s9ivbcx2a8ctxun7xxfejcudxsxddguj2tzzy8bziqistkobcz9j9rg9160siabvbkg9sujx5z2k9hejs3y3kp81mqbirpf9ns9d48kxr1o8qzasrgdjzz8wifgul4w97g5h4e5ftktlig',
                username: 'c10ivmbf8g85lohbwbfjltzun5hktewvvmw3poj9va3pgtqtcjtwedpu9lam',
                remoteHost: '39ukt2gs0eyot0251o646ghzgp4coll6d9953sxm084aoxhfsayzpeilo3ejllho2bp3aeryvv1in7pxfxyq6l03dy9ehfuch7g1hdp64wzw0c4hifey3os7syzni2hibsjm05d2i3p9o92fd4d8jp3zcxbf0zb4',
                remotePort: 7636082976,
                directory: 'ksakxcpbvm9sdaizyapwcaot7wyuu65f86nvr1ned3z8wfw5e4awnyv6nhfez7l1dcuk06sa7be3dno1c8s3v252usbm37f6y0biizuyug8a8dnhzwltxvezp7xtoi5p8cs5xg99xxde54jjk3vdo4iv8fmge6n698o89v1fcdhndez2g1ai9vbm7qzmipdm1eka8s0rcfxp0gw3p8qgk77e2os0oezgdgoq9t3wbnw1pmgu4qxvd7z66cikmmt4nix1gjflvvylg2zsdyabqka3fspy7d0if7dke93hqy589tdlhxc2gryaa8oantz5hlt6undgde39w7rhb0c18enpmf867bgygq39xpqhzjskn2clx85anwi09fizu2mf61dzg0e0eomasut43geteliue277qoypr84impp3jdeu5h0wm65oehf7g1h4q3rjs22eebnzhhnd6ethx5cz9aqowclxzi7qlv0rb0cadojqlhjqwixa12okmol4kic8b90rkuo9lj7fdwxbi2ya399ivo86mbgcx9i64ntyhhpsmdss4qdgmlxau8n6d5a9ve4gmw5bvf1f2yg2ct3x93sohpu39nsrsycbm65bmz9v5t2npz7peoxixq13qq76kgnfx6dqwq1zd9qk8fz19vx9tfahh485njd5q0gz8qqnd00w4steikq9907sph3nkg0zj3dg4x27hrx5hhfy60yti6wpcd2ct9bsen9lw2c4zyjcr7vd09qcsmxq4xxt5j756m9mi6iy476x40jhu9yznx5z41003lc528ofjpsgtkwotwxq01ud975twkqfxqkyzseykal57k6bldg3yyq6kmsg5fxg26e5qibl553j37hxawfpftfqn3hfw4zh4e6x9l3jig6lv35rnnpnqqw97eaioalpk4nv1gtdkh5g8mi5dkxc5i3mjd599uqzbowywe26mu5ew1tiv55vlbcg3p6v15aon66hpb491rwhsvtn8xs5m0iklbxuhezl',
                fileSchema: 'f0cpctfzheqt2ha877cr17gluagrise4b58r2v5it3qwt9zjwip52r7xmuymuslw7w1uh7q29pjptvk6zi2pvjdev1fu5xrdfkluzt8k27hwsaj66w1hvn1v2ewlv876xnf6utwyv8tjyzpeymzfwielmtc3ew8y6ondahiy9y8ltq38zr6syp4nlhd00aj5bbolektw4qgq8tdzteg46sjggr3u5svwj4h9xftghi2m6xngr1uzydd9xls22ww42ctodjt2apolw9g5u1o4kavwv9etrcdti8dledlu4xtnor2e7259i820b17gddvno3fpy910ctnx4o3r9a3g5l6mupgdvcy89gtgcguuodz9ybadiyh4tkv50372wd9o9kx5ka80k9esx59oev0tu66vw5bjde5pk4m33krgokcpnu5bywvlzn5nb6g5ue38xe7s4s728c8xpyn6k1z7l9p9xjimb3f9tq4t4h6dfvxg44vzcual4w3pcug83vb7wnlxffasrkvbcq20bp81kjhv7i8i727ifswubdrep3q697g838kzkbivyim0tb4si1voiaeiw2x6c5d8omzu0rjvxuz1zuy1e9huwu3g9b6bjnuwob68f28bthqreklve8qitjwlw5rm73kl2fag2hgmndu2m8r471nikmipu5bkyc55rfrjakb0v1gd5rhrf0mtg1s75c4n40mexci0s9iod4wse13nziohkn9udm7cpup5zsy9xppc78e0946kdzcgtr88rui340qg4c06qwbg3qw2yz4g6wob9y8r5zi3gqmb7hg0da1f8y0npjxx5svpkxul0gutv5fojsbnc6sndr8tidrybfgjpg8ubnf5i37s5ab8apb2yipzsx4ahj5fsch6v9gnpfjk4vsjptb4y2y898rmyt90jpl7mpqfjbnbdqw8761nmn569qn5pqxoyx26il2ybw06815kwf7frl8d0f258li8w6qyivychumm49q7kcaw4d1vi49t',
                proxyHost: 'sjiczchk0ixk6f8n808jttrz3biy2aftv43v3gb2wsd6wc125ij3bxxz8wts',
                proxyPort: 5402483623,
                destination: 'sl3gwcu65l72t5jdt29mz1gp9oenk3r0ymv3acxvjq6j3enl2vbxdbh1adlqar2ex2ndk6hcplgumeugimgtk7bk69dusfdl3wuep8uvj3y188smdp3n2cxp5nd8pi8lzsl7y3hnbip4sxs53xccx7hsy7jxaoph',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'izv1hc4nso6vh74btqllbrdvayuw4zmwpmn7xnmfxtoiw7w8ei2cvczsaii9x4hc7yabxmiiqdofvi0ynri4rryil92rjc89yvjge4iurgvvi8k5515wnoqwh5oaxh2i4315khbugv2qa6xiyjjr0ja20wsu9uhm',
                responsibleUserAccountName: 'j41sd230cfr752g5mim1',
                lastChangeUserAccount: 'i096wfwxz48nz3jq5szv',
                lastChangedAt: '2020-07-18 08:58:07',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterType is too large, has a maximum length of 60');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTransportProtocol is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: 't74a6dooxgbl724zecbpm2fs92c32210fomwos6c1gdkrudadml166k1rmsghchp5hl8ywk7vgvfdeuffjzsfrf3katdlynnd3r3wa4pz7w21g2zdgmf25nho2o267udhakja69l20z6yu6taet3d0kv4mdbfxlj',
                component: 'vhw3mlc352d2oh7jqtniue6srkljlut7alxdlu3g7jt3x4uq94ocru9tlmftyvgggebme8r5yzun7t2b5amkghksskyc5vws5f01iunqogqdgcdyogtc9j35fxtw4u43i19tbnq3s4rz4btm8z0q2pup2nx334eh',
                name: 'l8ts40ohby14e8yoau958o5dt2hvj5zn8wh7ecr7oaambgxk7kprfpr5dcvmsy5o8zi402vwam6pt1el2f1p1hce0k2ivyeu8v5sx1ousm8pnno6dzxk8eir841ywgp0wwy39f49l1w0nmnqmztzalaa486s1vl1',
                flowParty: 'mme7zqxu76pecl8dxiuk1hur6vkudjl4vgg9qdat1tgrb73mne3j30m58n60lhyrnq1ra5arx1wsu4szm92eeaed9xjifs12eytjgyv8ycp3y8vqjvntai2ys2wxmih6hecu710q43ufgrhmirewnhxycnc2otpu',
                flowComponent: 'w4hsw0wlq8n210imv65i1t8sa9vdfkdsbotua32qktsit3j96sx09mrxa5o3btmtwieqdke3gy95n6dwqz448hyda3kunlbihaktlbcxx6rcao2lwkigzhrrapyztu1alyd778v6sojj0m4pvql5ar8swm5eje7g',
                flowInterfaceName: 'f0sxwjlytfa47uafppzu75xmuoig2b4k28ayz7h2qu4bj75uzmcu1hrho4y0s0onmpue0p008fybkgnt8yfwgek3i5dru3joq4rqkrn34j6isvjgqsrlh98a9o81rp7nrrq9jnno2h8v66k3vv56uju21608oqo0',
                flowInterfaceNamespace: 'ypidnzldp16ll05ez860vf3yg4pmga9h8ecqi8nbnj1d7l2gf5rw760y292z2qax8cfb6sz4bq7nb47w3xp98ktxllqgxqqq20vsp0kzx7luzx7a7yr9i7f3uce4rjz48rtmli7p0l30ej0zr96dtz4gd8l9b540',
                adapterType: 'n5vgmtaf74vydcpid276nymlrb8ahfm63tubzos4zndgn58j0zkhpl6wr45m',
                direction: 'RECEIVER',
                transportProtocol: 'g0w8lbk6dicevgxw0fab6fvqd9qds0o0rgj0dx64ouk03r91gpgq375s4bycj',
                messageProtocol: '8zdka3kajhx4h74mbcgzamp6coc9tvzj6oipbcwdfb0o1n5lzk3xkhztstxr',
                adapterEngineName: 'v9qn01yqymmqgu1ovokhtitxaubozf3lnbkvsjm05ookyo1ac03iwxihrw2a7gu28gdw2ygdbue0t188mv9bmqg3fmw8ebccjex7l4xkqk1jp1zpss5umfie1tt97ppktu17w9kxinxedpaiqoouum3j96at24fg',
                url: 'lwnecv243vd1ewga9rwz617m7qjn2376rxgfj531jp9eckozo6vv5k77t7y1w6vta6whgnr1rc7dbzck4svdmkm2iz0vv28ys6pjlaau4yuoos6ui6i4fuxhmbsoxcbbbeqxh75a6s0aw2xysdt81sy0l64wnxmyz1vi4io4y135zeje2t6gmhaiv0sttkzsl84lylcab4nkchci9bd0yx92nw45tlapf7lluxj2vlhukw816xdwyleasbfbewake4v7ob4tgobk4hvmz9bl94dgjiudwwz9hnl5o1759lqe16ie7lhkbwj1nrh8rzed',
                username: 'mvyy3wo8fspzohjx861ase6otwl0tb9zvs249hjyq3ge5m6f01trgf0r4tl7',
                remoteHost: 'ea2niucnw5kjsncrudxrgdlebvfegy0cy5yw7fgn9b6q4ysqo0vvzrq40560oex4w2af2bk3xeask5thxc8ckf7xw2auimts8aucn0ulrmqw6mhfrwiagyhidpvrp5i2by2hu1qy4rabybygqvdz21wruhxp9fw3',
                remotePort: 3752510968,
                directory: '46540mg73kj7czmpb1rwsq2yqhhd3y5ouah4q6eu05nl4z9664cblqpfn7002cmjkcgj7oeevd4gkbhfd08e640h59wkl2phke48oyvw1f8whd2zdzm4hzrdjxtvbdq1kioyxa63mpjaxc7oq8cxf05zxfjtzeza3nmkrz1k1x1o0yaclulxcr29og11abyy50gwzmsfe13ohlvwa2rrsfxggfnxxxg1y50wmykhhefoo818ttprlxnn5823uexmr450zaahasvhmkppsysr2rswqrieijqycic5vbucb4jnysu4lkqo9lmh5ifvnhhcietpn9kg1d8hygnhfuz27y6xxki5sdvvsk3gqvivkk56j3vt5r3o8gkwhcfr9km5dn0g1cvziz83gs50r7q8o77s2vvb6xgeqdhqs5kdy8svr11g1948f9xjkene11wt104wp1ggrh1xw4cyfvgyhkc7g9g9s1fj77f9mw91bwq8zb9z6li5o2q7cd8o1jivg7apmdoet1kqmyzxi6zrull6i9vmqul8k1e4waiw9y58kainl7akejrb3wkcnx9gq9a54gd0tusy28uerd1h9j3flzcnburxe0s2akh1pfsbz229ru39ite2ztu1s8ums15lsy1wk4vyede1x7wfpdoc4pg5vbfvr06gav9anqllded07f01o7b7r3vbvg8ceo553c3c4mvbvf7d19buswe1obopkuxfjiw36sen7jmvhl6l48wouzrvy1bhm0iram0ivhn4qfmxrj84c5o7b4801rh91j8gejm3vfxwolgekejnara584hvn50ao2n4ltwt3m3o06dehq9fqadko4cmlet1m2ffvtwctx716c7tk6n63fzwabw6d77vsqvc2eu02a7nblu4ofxkqja5iuz1h7jqcwczwv0wzfkzl6233we3xq6fzad563spt8kfitvhln520h9zqgalgp1zobdpupt42hhq7om8vxehjgpktj44mpihze87mwb0qohr',
                fileSchema: '7eng6udm63qd97g1mx90i6o4slbhuge2zjcsj8iw61kdcujfj5a8pv8gmh0tcwyni2092dasxn65kvt0v0xybenneympn4f4r8xkr1q09m4m8zaxp5zsm12gm8ozlxv02s3b45ovtxqxwz246aifg50qoe5eczj1pnw74l1aioeb1vt6o0qdrobw12zti7s938je0qcnrekd7dazsop8dp7pr02rzi246wexzuw8ux30hqh5ndr2rgcxk3dhmmfqvyikpdtwdgq6jg7j29ncpyjp894iyw8b7fdbvdlv3d5ci2mrtfwee028pwtwh9auxs2sscuqnfb6le3i6mj9razijvun0nbgoogiqjofwwzx6s20om0o324s70dmagnmp1zpecakfjlkl48cpgg8dac09onvtn709nzgfbfrpissv0vonxh6koyeagch2scg5tgk4of36jkuyk4z2lacf81gfjob7x30b7fsi7b5p2bkk24kiomitbstsf4cbbc3vrio929vy5i7kn9wztr04fftgu6urj2kl8i0mrwad3z09sfm3gz6jt47cmc4i2gobqevc0fbcdt1xxbmujjawwudtbxcpprpoqonze1aflzo2zc4xxec2o4xkn1gqpwm4idb08aa3f37uzunq7umyq9wffd2rxodfo585gm9pgatybwnfxwq249ydz8yinuxs19qwdq22voo18k07qpq7mls9i90ojezd7d9czwtst3bqmfa7jbjt7ouk516byzev0ulbo84w875xsq7u5lprve4w02jfjwr6z14beqh5uuvfism3r58bfc4xmqfttmy43meviwg93h0qyi17oqkcw8fihhgx9pi6pvi8c5h5ui0hg2xt9vuza2jnek5spmqg7qs0h4uxnbrtiqmtj3evkyivs9l03agmnrfaph8vpkzpju43ikce1wxoo56ib58cb8k1u4dykpps9fmg2mbnm8azy9jpwd3cf9ffa587ip30uusgesbd866b1y7wkqt',
                proxyHost: 'lnq3x3it60urzqyxg5etlfwywn4n6qp7374m2rv7xagmrg8dmrmd09e2ew2b',
                proxyPort: 9602585960,
                destination: 'rq400bjozdqngm1x7rbni1y1v9kcc1sn56p1stax8jb4j6ntjhquituhyvw0eodm51de6i1ude3q0x2jnetqsk7c4otpn2i5r61wkom7et7qddyocjkxocq22x1azc0zmozup3xiv5igj2p3ukc7xjn8vsi7ii76',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'fu6numrbxe41ze26f2yl1la42kpquqlaes7v29ygbx2js1jfs7zea9dxzwlt4hcl8r2x72fcwb9swn69ft65zda92ec8ctppvmd5ysbmejzeg75lelctw1thcivl9gmoijpb83irsasc3euxzxl5t9xzstvzwdb5',
                responsibleUserAccountName: 'b9hbrh5g1w4dzfbmu1i6',
                lastChangeUserAccount: 'j9itcmvywqndfztz67y3',
                lastChangedAt: '2020-07-17 23:10:02',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTransportProtocol is too large, has a maximum length of 60');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelMessageProtocol is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: '84usycx1n97xral8uah2rc6z5w88lbevzs4jxkgunubwdxspfkmk240dfc1hqvyif4rco5zlmmxbg7fyrlwt3xhyog7vzkw8kiixfkwbju73g92qur31ruk0vdge5ewp7kgk2zakj7kyg24nqktmhu1fpblmkegp',
                component: 'y9klapybgpsgsqxm3lpp817vbtky2wixozvu55nonjmmq52r10wpmdxw0m3qtma6tv6dckghvsjt7oa8yb4qb0p3pk5hiv2l586fg10h7sf2fg2xtu8kfop4m1pa3f0hwy17ynfwjya5u4pz0gethfx579sjnb4u',
                name: 'ktj7wefy2jleb0n9r6jhf1x3r2hf4ocvd5putsnknga9lw5ybklag8x7nn1x64gzeusuxlbni2tdmsmn82e2kxry4jqynm7izmixk2f9y3rcsep6zuqgixb547m8p2yq9qs5t9oz2x7590j1jsoivpoyt4ludkup',
                flowParty: 'j9nhsqxjjuh9qt4zw87eg7a9m5t5fbe6owi0iqenikqukph27ac4q6204uetwys1sssvt9g23bzliqmfezi2pt9d7mwekqt3tzkcxb73jbsf2fpl1vkrzd4i9lwbz8gpt2fff0w8288924i040oop8sbkhdkjmf7',
                flowComponent: 'dtg2amr08axli5qjwmd01zqd0yh8au2erk520tz43242ffbecn73edncrqu5miyxbx0d9rxldc1a67pzyhxscn502fzlehm6y1tbxb4aa9mv69llgpel7o7iqmp9b6gcgow0h31g44r9yspkxedpoeadp45py71i',
                flowInterfaceName: 'aymzleadqv63tbb5iha5sygtiz1prs9jjhqxje4l3u4seo2ov21yrt9dtjsr25drfj5b6f0skn1em15obvcrlg8ii5br0bvdbns6kox6kbqo1x0c9f2a6wnc62m1rkq7bcyc55f18yf6eagln0fo4bav9v311lzi',
                flowInterfaceNamespace: 'q3tn15wnqtpapatqdgbejk1sksaf21ua3fas80grhgv1cl7dox2666qnygiy9ulcesfbnt9o5ndiofsssyb6obk6xdqh3gru68citno4s18ud3cn4b7sct4yezzpjrauc0nfro58jwwg8eo1i7glcgjpuefie7bf',
                adapterType: 'n0nxk97x1vxdgk7bmea0jop79zderi4vwjmh3cv85qhv9beidkmiq9d1o25p',
                direction: 'SENDER',
                transportProtocol: '64qgarwhvr569jeokxy9ofll8ns1110df9fir5ln5wg77iweoobqluab5vdp',
                messageProtocol: '7z931t9lzygv63muctcw3nfq7flc6ddxupt63unso0159zn7zrygrrit85frs',
                adapterEngineName: 'tf4oovdwdlarerqch3hok2gg2nraa2ph1thl5xsmv7ivi2yh7o649th2cu3iokqg43qxjtkw46g9srvz28vo0q4fyvp2f5sqtxftncu7nn5ykgs1csxxtns17nu8bmgsj4mazx2tmd5z4jkg1tuvwxd37ch4am6o',
                url: 'xyrdysq3winbydl4qvnaq0b1zmm2vea3ap1xegr46e83vy7cw3zmrhr8gdf894frc8v7sh50lug8ko752sqp90fskne4xa5ve3elqcpvgx11gfpx5amg96xpao106i8f5lnbyqury0ihupv9n7e6fqzjaz9u39r7f6gpg49n3ne28hyl405ux1xa2refmsrnpuiuy2mvkomh9k0airx6873qgacaawj302oi23trsry6jlf4uixyyjsjs5hq2wq4j7awdla79ziq2jhg8pnf9u15a14z28k3bkzbgd8unnya3516jr55nwq52vmkmmsf',
                username: 'hivravihuuxl1nireubxrerqqoqsmk6ctsqd0e3xwc5mxb6igr0e1ny37foq',
                remoteHost: 'ru6qq49c5dnyc8q11ocr9cmboiqr2fvzmqcfyfwhq7qmlhxraqo9u87widy6p9trr0ghx22ibmtyni6dwfbc8g3r3nkup08i3d3b01c9dk5ygidff9zxucsd7d83zz5atjztput6bco3r8rskj9b1de8t7ts0ynh',
                remotePort: 9953166233,
                directory: '10pvq0bwbdpzvn4sqx1d4t91e4dxenx6d484n92nneeq59lcqf0buktxajb5uubnjr4ed6q9cgon0ffkd000wpgc335qop2b9w7peg9j6lhm3274hqsjc5qfl8he9mrwk59j9y959d75h29mvctxg1svneal31zgnifkuvrt65bg4smyce97qwa4y400aotucmitnq9orvq5c90e784w4xk23e86jzuviju5gfr5ld9od9vhq1n062vqqchk0ogbvh5ek4o839n03wazkpk6go0f13xmgmsy6q0cfobm0udg43rnoefnopv1zqg2l9i8qa1pbfk7q3dy9gvfev5cp51qjdgvfbdigw8eh6mvsmruohc54ed2y2zelswizm3qoe1vqttgpexzqsjqkfb3qg94hnfixq2zgvx94fp2x751j0o0vin181v46fej55tp555whmw3uvzkmy4ri9d36pr1ezmsfy58qu6x2zgwnai532opmcvjucrq9cqb5ft7bl9ze3p49izzpsmgi7f9zkjb1vgkymdsl2lgva6hrj8hm365w3tg1114551xwrzw8f6x3vsgjdyzgl6hq87usgme5hb1vfiup5vucmrnchoc3opvqy8y2zk9j4r9buwhbxcjmt6kdir368vul6sy2efere0pdzdiips91zfg3f044b4iqvhl3i2l3ucycnar3mok4an165ttu7e82b9po0rl26ssvw0wuxsadadczhnayk4w79tzjmkpmh87tx6783d53y9how33jhvimvenc76tblcryx8a49e6fw1a4251io9fmmyvybkmzhlc5nvt9v733dcehby71k6om7gtxfv6pz36nmwsgszu7wllyzqv6tqzg9y4ih97e31aesiu77gb7mwytpvui1s9lvhwi18jbalwi0pj6hiyflqat7rjufbacjc6122fi4nazms59klty4q9vmm1s5jlb1w1ma5fmnlrlrz5tls1emmzz8jsfy4g11g0qfp9sq7sw5i4',
                fileSchema: 'dv12kkx4y1rxma2ob9c4ra8uv51zk7qszl13u1b76ll2i0qpb2jc12s6elnjpkn1xpqh2i9annb8v9cddn4um3sknm40uszstz36p8ck3dgvh1jckydob9wxgji0ox7cp1xkuzz1tnlqwaw1zlop5o62hnf2ofvsuogtqvigwdc4t0ol01ctpz0svuhvij72l365nizqdsne5utw7emou0nrws6s2gg55d12pnfdbn2hqg2k1daxt6lps7pd57u7vyvc7a75wyk7g9ah6rxr0c720kuq7f4f21uh48lc878aebsdkgnhzjlc3hfmm0ewiy9q7crvmrd44bgf4rt1lzrcgmjt9t1p8fv6nns9wsxui0ybytdvvcrov55iwwabnh7a69pz81f0schddllmqh0hfr7eytp7bgv2lx0eap2sr4oacf5s9pmtmfcv72krxcttij9rl2ofb2nt4j03gle7na2x1qljnrkhmh28bbkdk63z59f3y6i50xl4el4bznxp7v41z3sm4cew8i62iqq5m7lvwv1e1lgv4i0skdhpla74z5mhmtyv7spugtuoeznolvs82nejd1no3k2u1qagr35cec62rdbhjjo1it63c593js7abvwnnqjppjyc0xhxxjcgzarpgjxck7oo6o86wpvbbuu0p7wffo57ryxciz6ls6re2md5gwslwxko9ie4izi7prh2q9lp7krnvtssz3hv8n1k29modwle9wxqf2jctuzab3p8nweyd6mrhp5h3v2ck4wuodkv327dnoyqur9xbb9bpsre1z6gxegj7wkmn3j5h204g2dzw08dui89ybhbxkq67dfd05hxucjhbhdz3w6m5gseur1odfb0s7s1r818sr9tj3ytwldkdhfjw9e46b8wueae0kat0twref9xwfamsa66fka4684js8w2aw1lr9rzl2ibch7wzzxnplfnc8jy3nk31qwe09reyu0wiusk4nh8gpfac3a0iyiuev9a44v7olhziqbg',
                proxyHost: 'uv2mm7qhziwrgismd16evlirrrriz691b5dq4pn3a8d7ubxjoy48m77smiwj',
                proxyPort: 3204462258,
                destination: '1hid8u8259huqujjjallsemnaie0cc5oled4n0fpoow1upgqea5fxd71z2q7rqn9k9cgbnlbiwsgp2l6fbtiqow007mz5svfgb7k8kd57sonh8en4v09cux3zdkq1mnqwlybxvyo2fm0nz9bkdnoftatbz1rfwdh',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '745vxlld99lu5pi84hzrah59hhhssns07f931klpjftfs76e858kmig0h1i380jhaveqqzhplwqgqw2joz8zuxsxai81i3837pl8s6j89ut8jzuz86ntfg421ebz8knmqioec32iikefaq5ixd3bvm6gipx3bw9r',
                responsibleUserAccountName: 'ck3kvzh0viae4zl9qxe7',
                lastChangeUserAccount: 'n08931742wqg7jgdr2zb',
                lastChangedAt: '2020-07-18 06:08:15',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelMessageProtocol is too large, has a maximum length of 60');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterEngineName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: 'uip9hartdmerhugupwyvlarhw1r8ivnygmojsmpkswd1taynyhlpf7u6qrzso4ea2v8hse1in74uzgrglkfuv59fxsek7tndlzgw0ogqhb5dccg2rhdk9im32whcibobwjss3m83fvq8mthuh6s6ywn1vnkaredb',
                component: 'ecg6d2i331xl74ha6eb4nc98d2mil0psxz7cbgklcqiz2i8la5evt8x9egrzz4ychugg997o44skazzxm5u9af4va3hc844tdlmuqy4tzqr8acvcw5gafstun7ju68m0kr82z8afjufcvaaozxrq8d0d2s95r6dq',
                name: '1u32q0xet8umbmcexw04pp6ptmzk9r7ha9kmk9cb5w9e3zcsd7c7qmmn11brgb5zwqtl5hf8do0j1atm02jb6esulrj6z6vrj5u82sumbksji6b7kw79d9gxl9bbxely7r0fvoibigcs6iux38wk4vmraqnhxxi6',
                flowParty: '6gk1w1o0idgpuc14dfdvzca3jmir2de7iz0qlx7lfmqjnb6rbtxsnsy0loep2tucfpmydy5hjx71nw1ajsdqohblg93r4flwne161km98k58pwt6f88ihun05s29cd5d19puwilj237aexk4407h93jkx3808ign',
                flowComponent: 'soiysviq43f9ti1fxpuqk8nbtphtr1lmneaxvs8fckz62jn544exd0msztavmaaxqc4hs87g7k1lp1hza881hekl73oymit88vz3o10cmu19rei675lbivbe1up85wtj4ttdxb0x6ls2wdfzt39zaz2k2jwmriml',
                flowInterfaceName: '3jgfsodzezctzk6figkshdfzawc7z0khu6lref3igpluyyy8rtfmx8bzu1wc0g6bke6zfpsxi2llx7x0zt3jutd0jozpmpr4ggc64p8oicwghdzc3afm5jtvzt10wsabg2inljytx6es70i5ce7pgoz2xk85wpj0',
                flowInterfaceNamespace: 'yxts2hdh67q4cuqsn4op39aquvdkln07ak0hamlszb4nriwn1qm1c8q0eh96ir0yawff9drfyfizandt45dcqfip0nvvo0uvkbot92xghlo631c3zx3vchz4t8qfbc3cl17cncjls9kjpou3le4e5502i1tqazei',
                adapterType: 'v7wbz9b7qfesxuodjlflz4rd97axy7aynexqlviu3whk5u7gghybj6ifxslb',
                direction: 'SENDER',
                transportProtocol: 'yuvg22whz4gd7bvao465poxrdmc5mg9t81ulakbqt2mxnaneni8m15pdnd5a',
                messageProtocol: 'rx3zapinkia86iy5gpxbosdna7ggveibzn57y8wsbzkukjydxk7aofxwq0l2',
                adapterEngineName: '2kmgk4c7dpoehkfi3czap8brccz3m30tyhs6vb8u5fjw5ve8dq3637szy5c0ijn0iu54w8ds2q3v07pgj75gzflddwcdcj3n7t1uezzoznpwfoqi1xy8rrakllelorev3sc7myq7tn2l669tn0a98numoknu1d5kg',
                url: 'rnto9nnn6zf4u2ij3nuuufqzqjwu70feair3c6c8lge1h79sdiokv6e099ob5t6ce5lsldq0g9k08ugzu4t5d03t1h411kq1j3zr1pd5dp4m2bobs7cicpb92d869970taf4z4612wr2ajtfll22m0vq8ras00p1c84l3pz2gnfm1739ho6anm8vl665jbdn5ucdkuvkb2ygg0kuryhpwx834bgksmjmy4ppmmnw2so2m77i1eg42mgeujgwr69qnxz0cc3cej8o5oniykqvt41pup961f4zli9x0hthf8kkr6rt2jlr1vypnllo3vt3',
                username: 'k5wc8sjxcsgoa0rpp7wp9f27kye1wfou1yl0e33qqicvf5veq4q6gplg3qkn',
                remoteHost: 'zqowzg1xxdkklu8cgdo7ye8jhxx3on6qd4450iez11qn6kw505tx8rthf8iozb16xk87nux4cy2wa6qpbap0klf5prrjs5wm6hdrlc9ih5q23imoudcb87x2m7ooxoqyn2dkld6y4kn4qwpbup16epazj7zkv3iq',
                remotePort: 1027493627,
                directory: 'dl1ttb4ozm3snajtypz266l9lkbvk6llawoxy9kjscs9e1vj0tpc5ukh771m0bzdp2ji2pgjynj091t6nrno6fs8wubbiywgtzor8najundv9p3tud8vtq5b75lj2k78r1v3r09pw6d4jjidnegx4z35w1l0h6co53x0k95fbq8p2kj204555gemi7ou40mnvxna29do2xwd9iwctttzikwba80gn098gx7jkhrqgnng4rz313d48ob34u3anx38awcar1shne3ne4mb3i6x4joort3998gkne4gugu3roysk8cd02a9g2t0lxy2wczu8je9p28d9t5vex56qxv504idr8b1r0c661f9scknp45ona0cew5z72186fk89nfx5k10t3aaosacyiq2qifttuho6zjt9tfy2nktd4uy1ak0uws2l1pab7e4p7otjqmr69dlk0lv2x96qktscrkh2cxtitvq89x3dejl1tra3tq2chj735x43r6rdy9ws5unwmeqj01obnro78ygani8wf0u1sd4j9dheyl6r3xik6l3grdwl56nsdy7vvwkn7dyt9ke8kj0krgvqd299s95aslxvv4t5rv9jnv7qeb8webhxwhpdg8ob7dr7099jnqq0pif2tl2a1s1uhj7ek2shcz2oq609g74obo7fwqh0lbnxsgqtqilbsljifuxmv9pp87wbv1sqnfjulo0f9zs5xxq6y6vgfat99o6wg913zeho0pgy2pmey0kkgu70r76xt17lsp59sxitvwlzxyp11h9q8qafhdlpfom1w60e576zcrw68vtq2xppo6y937jqg36xmy1hsmmbahzuvq7hgs3r8nuv0eh8xmq5a8w0kptg4qkjbcp1c4bpmur3a4fh1emps2u4854du5xhihlqgu49zvb47rqfh8fiuy3pprjsrlz1jt1pes2ybw9xy885x6ymjf5u1u82ml7otz6g4a186bsj3vwaqs5grdbdesylbxqsgpolwnnthx805ka',
                fileSchema: 'm92t5llfnokdkl3jd76ma1m32r3dwgsza622i23n9qeu7a2llbhx1wvie1b6rbh57s5cbigj1kwol0zhgrb6cfu4ttz5nwxylpcvem9z64gqjz18f9togbeyj2k97w0zqixibagnvjgv5456e1bfb2kq2tssce8huvix3gnnxcsxp8s18a2fwgrn1ot1okriyvsm534etgg055gzspjsrzj10a4djwiw8qu2o7akn427zrgd6l34eh0souqg1yhttj8y2amyzs3kwy6feycuxx6nw33ighvnkm6prazsqhnlcsstuok8m0xxmeipyzhmgchypkqg6c3hks281cmpepx6h4wyuro5wm0wnoxqdhl2jp14y327ge5ht9our6y8d5r5z3a513dq2t2cwm01v9zdl9sce0wawh8ot4t5n4bbx9g4hrtvinr2bi5g42sctxb76cvf2d9vz7396k7ct0bkdhd5vqrywjfwt522p1wi837iimv87yfp3jy7drmukq4vuzulmai4mhquxiek0fqju9qptxox7qgz88l22i9galzkq28rga7acbifp80q6auawvmpwjl1uk355dpwiv7ejh3zr4b5jkxkxcjfnopu4dsb3l6a3gla8nlq0yar7kegl0vlijvb7tahxdj8dfu7aihvjza57of12jl2jqp5etjt5mbv7daxwsny9u1z5771f9riex936sjoe9vxps1byq4xhxf4gybyk49w7h82t9qj6ymd9d0xaitgsomf3j69balw1sf6f2vllc3lbsiw8496xvkzqiqttsm0zgqmzbvt5bs16yg2r0n9sawza733wuouxrbjet10gzc3qzaxmbbpaxy8r25b4vvorncmts6363jv0wngs23yry7oa9kdvgaac6vh9xm1y8z1t6utybdo4hk4q67cxigo3grt9udvrgodyvz70wbnqxgheag92ovife0eyw3isjbibc7qlaw7dd8heewo3g5o0cc4cw0n9c8m0aw5e5ogz1sh',
                proxyHost: '0czy0kt3bsvc5r80v7371u88fz3gvv4gkiz28clzuxa9kgjoy7z854h9xqgp',
                proxyPort: 2930655906,
                destination: '25u0dldx4bp4upd9tum1uj8hqkawgrajuiy0otu4p14qfoyyic354lzvsbtmiciv2hf5slufhv1ala5sb0864eg7vdi1dwwpjo0bos77h83r7yf268k9u5kpx8e8xf58hvgmqlvdzi1ysxpei9l0lkzry7wv8o8m',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'bg7fcjoyfnp33e5kbojq6ww16pted25d4tv5eqyikoli3uzdg5cdbj9k972nwimhtsqmwv3orwndpw65ig511dtz2f2x2svzvlo1nhqp1ko3naew01zskv85fgm0ygn2adlbzv9chhcysfsyav9zbmd0zkcg6pie',
                responsibleUserAccountName: '3zngmown9ui6fzgikmvj',
                lastChangeUserAccount: 'flhcbt7qow11n3t5j5im',
                lastChangedAt: '2020-07-18 06:28:01',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterEngineName is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelUrl is too large, has a maximum length of 320`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: 'ylolz8e3ciifbvtsffv4ygzqs275y042vsgpepb0tb8t5kxj7m74s92pwp75ajew1rw2v62t4kqlq2xeah2dr1575934e53za45au4if7a5xbhx4eaoivda4gq2k1lgbqw8o69ywwvs45d46nf0cd65bvdxzjasv',
                component: '0hmbjyqhyp5vf623tgi16tg5g4mskszhu4wpiaifse1pgwq231x0hi08lqqt2ch52pcd4vgs4971yj2ub9tzrjjjl9712giqdt67jk3nms1aehejiavjr4zks8dzqkfkud7xk83s946v3vgcy40v37jzuzm1desl',
                name: 'hzbtjgqxx14h8nodxativ2qkxojppznlgvut6sxxj3bnsqqfodljjwt9t6ycaszwhdjjy673heet1qe4gu3sz8z4eqd2s8qva1glers7mw6agzix2v9ldmz8mq859yk3wbj72qbsw0u4di6d4ffus6hldqbc8y2e',
                flowParty: 'qq5vx00fkzactj83k2g9m0n0yoyyp4b9lpudnbnec5tj23lybqwjxsmgivvu37j6mhmy36p8o4vzdvj9wfwvcqtxk0rc05pv3f7hnfz9y74ootwafx64o7p4ommvptrdx5my7fyagabfatynf8akspx992xmy4gv',
                flowComponent: 'xh62lgyen8avyt7d9wf8zktqrxs8nwrg89uahlmkx88ff15tfulgb6sf2sh8q1debhiwejeohtvqhm932kyzb4rxlt6daa50js50a78cr6qut4ycbeogshew1qx3vws9omhv6fn8t2bbwzc6riwjjjbogd076ul8',
                flowInterfaceName: 'rblj6ze6xvf9ouvi2yzi1ni5guqvi68lrh7o5hlvzj2j5433i7wcev3cuswrkqz27gpyclm5jfb10e2xbz218arw54vxbar2ij9muvw9fa9dr99gxngjfk5gte7npb4zwyv2iqeqwhhhg4ohel5urfstieoowrj9',
                flowInterfaceNamespace: 'hrnqxj786dbprx9zfdjwamazny1tug1j4gkgtnpjqscjjebxlk8iu8nu5viyrtj2smuocv1dvu2s53o42o9ij5scy3t2l9iuglpjwsi9kdwatlsebnpelx4i6nuu7xzfrwxlgwcuj77ek6bot6ylpnom6gu9qw4m',
                adapterType: 'yrk7q4gfhhao212at7iqxpkvmrokkyfrj6s4ewjonz91vzlogzygfbsveyxq',
                direction: 'RECEIVER',
                transportProtocol: 'ki5qotsdv0lhq8ka0laq24apwt35h6x1124qhvs39nmlcw78j7l9cyy9tio1',
                messageProtocol: '3e3h3y6uek2yb9x509iq6ofsgthhckvo7v32x09c1xzgcasydjrh5g8trsry',
                adapterEngineName: '5ocjg56dq32n341vg5wbolj4n3p1xdtos7aowopddf121dljod23kte84hn28h10occnpgs3q9uxidfmlnoursabqwrf4f1ys7as20ytdv06kn1i3d4ppahw895fknwahlljslzvpo78du5wdka50k9qejfj9q5m',
                url: 'ipu9oth0dfmasef5jk4aprinj65lpukibjmuh9z0w7qqtydfmer8qpfaupa49wplasnvu5xkqdogmy7ekec2fuq6citrorfw25xzp91od9lncxiujgyzuj2y0voht0gh6n8dnruq2gcab3mtmgpqcadu4i1163pi3tmxujw7daovez128o2wmh0k3u8n8zas4cf94m544u6v3da80b1jwrwymc8ge8xpyni1gvnaj8ybyhuy62tsp3dg8ks2631ft58l61y0lknovtss6394mn0uycdth2k3p11xzbbh29kon9djveu92owkt05ndp20f',
                username: '9ngh0nrzunjdtmiqdoed746kamm7vcijcnhiw61qh1ye6vdyhxu1j1tzgmm0',
                remoteHost: 'e5hgeksvp03ifcavxlwhshk9t3xgl74t0qw3eila09bch7ki8bsne79vmk82abdyyl08h4t8pik77zdevil7xupr39q79497wmqgjmdkqz5uvbkchyab3nckpsqf1zo9gdrc8lpw6vj7vd4c5rpb60zyv7uy7so4',
                remotePort: 3574638418,
                directory: 'xwe70txc5yo651dr3hbjbupcr9v8qwou2wi9lqs1htwdexdb93bnmpxd0ayc36eyacis1ge4veq2tjjsdz23qxjzwplzhs5yrtj7h1cq8j0uwsy8oe0mmvgsw7u87d7nb93r7cdw2570gncpoqdavf1k51baddynhnllz0ru3qjuzkfmahgqm689devbhnb63pxb3omczl2bljczqx9tjxmghubwtzaokjy5a3dbqtlitjg5yjb9oajfqe8xloer5ksi0y6rqlp6j8d4y7fp4y7fd3rbrcspc2cuw7who63adh638r5i4l2vsxe9kvx2zyhkg4thbam61qxrtti3wkqw7sbjag5iij80nu2dhzt30mze284nzn04bmst818afsu8vaveormekpqz8qjhp50n00rlv9g29kpwu7xz32tt42wgr5c1dyz5ytoo4h6c0r8vllicifapcpiwool510hl25kmwqoapttdyq9tcrnaatq1bxbs28jhguza1ei19bixpjj3sy94bswiqf8q1hldg28vb7569k1omb1vc7vtyp5yutlrnzid3x9x9lonyfizrc97hvejyupvhehq20gzs0yef5ii6q6schbpdx2biy2jco6es0ir6jm9oh28eg1948cy9uo91qfwsp1asiguei2f5pwq0m3dj6pzxhzpbxp2xfjojopbfmcvypgbmep7o6a307263yq1zd8svvrfv3fe2zsnj30extlz7xv3j3nazxijxz7bwtjbt919l4587n9fcha364scnfb0f5990wg44zm1vgtzkq7za7qgjnuy3y5p7yrzoqlmplb8o8mj7zoru4buvmsljevyq8vvhwrkzx7vbfpjq80h1jf1394s49jaew4zzm7laiuzkqg56wsw0uvilqsm9l1sonzzt6gk8yu9ce6qscwxrl4g12tignibblugbyd654h46f6fgr3cp41u6trnrmksbm95czjfsk9dws72kh9jtl7nn1hppx6cxl5svosunl95',
                fileSchema: 'jznw5g9f8xh70fpestsio082wdmg3y39mr6mu08sl2px5vzmp2rqs73yue2arwekgrabzyyx4mtmyi35vi3loqw11t6464lxzq8pl02vzbgrcsseot9aouxjgve0kke7xpfsektezacxe3r46xcvihnc6kelqevqcy2au4h3zn0dy5u5hp6duev7njri7bqvqu0o2i86k1axrqus64dcn48wz48ck67oqp19ciaeebooixczyr7mfqwclk5tt3std8lxzyi3wjhx9twewowjj2z3sr1gskq1dfoyo9qenrrw6qrsj4mp0j7xghh631fsja0wl72el3y3wu3blgssimojxpiqqbd0fs3w79888jbvbpmx5htj4t28povopmlkpmbiu05zfio8vtqkfkeawtj1ebb7gvtko008j6o873pezwclslxlh2koithnpcb99bdadi5wbjswa28qvz3yq628qzvx7iqztpeo54z8fjqz4l7lz6ui2b1glym49xag6h3ge2eboqgm9uf3bbvco0v75tv3b18wtm7dusywev9e8y5xe3ju3ii0n2rwc6vltvmh696fxlnyq9ttdqqjpdsy3guczxe1ogztjvz9v8ociwq4b8xvui5iu9ty1bvar1kzae4yayhec5bw4cgva9ovw9i4qxb8u3jsq98tlb1yb2crbsox9frgza0rmgwea0hnmtes0ytui6co636bbup0qvai4thzoaufb2no729d1tgnhqylrw4h1d6i6g9gez2g0xawae4pxqtwhv4u4hie6me6k39kp726hcnztl818gysijm31fx6y8wss4mlr4398deec4iclb3sxwawu86n0mlik3sbdkvtz29vdl5oycvi7bxzv2qhehg554zet3vx2a63gjlvlon3o8yd7vayysie3u1w3mswb68g33e17sxqtudsjqrf5nypclzskpu19i8lj7cippq2ma6qqyx0ux7my1olzsgfmcwxewxzxiubao9g9ye4xfl6b8u6',
                proxyHost: 'fuu08952gxsbhgxmqqmmjd7u31bw1fzu92yyfzdjw20aw6c5m7su3n9dqeur',
                proxyPort: 2759772827,
                destination: 'pmo1jialf1usn0qjcgbu7fvalu92087u9pg9xrw4k5nbgc44mvcoh16j3lom48dnr1dj88ppe7ml8w6mh2uujuie8ll70jxhwgpv8kfzpgo0279fvf9qcn2jr1igb9nfi2w5ie4legxeilbhph2h0dmsfndmdwmh',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'uwzz3woovwt7iuwyyoaptfzy1zcj9w9nryvejz58rcy84kz6ly223zb2qv3orzhwsrsph36xllen1q3ig3k61dy3ru3yq53evsiv95lk0poju9h0t4njnwr4oottyad7d9ij6h2tcy6eceegbcmn6012uybte0eg',
                responsibleUserAccountName: 'wbjefb3azpmhv9bttjh2',
                lastChangeUserAccount: 'n57pcyf2x5igg94sm5c4',
                lastChangedAt: '2020-07-18 13:36:45',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelUrl is too large, has a maximum length of 320');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelUsername is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: 'fllv2cwgg3di5b5rdo7zm3dlrbb9x62a5ot2e5t4f71i76c4t8d1qkuzmwek5alvlg0uiv1v0z8wbxdqpzcjm2391u5qayeyrlgmlpkbzg9h23af5860a8tnr3s63q4bc6kxh8jepxvxuou06iew2vp03h8zbey2',
                component: '237duzrfjsbbiaek5ooetcym0dk4c0083pwo2nks2ehjv0o7p14ti0ph0sqi1f6iq8381vb9ayczinnc0h9bfefeygjpy8qyp8jvthkn2avj1loas7g7020lzob3o5lzzwm1qy7wrp8tj67ndf4xn43zo9u54lf0',
                name: 'rlars9tn1g8ndir8ib29fzdbq24lr2ty8jyhpr3dgk8qck3ngtgjw5s3ersaw6qxz4jt0rzjwtxzg7qie8y8bafur41ba342udmh2pkwgu1qfvru2x5jk6bq468p1gp64e4y7mtagtlq2bi4y786qhc2rc5bwa72',
                flowParty: '98r2tsnu41oh3st5s57d4anqapl6c7ozn8y7i429t6al28bwbtp9589qqfqa3k13cnreumy154a0w4i2aaxdlhulmtu47s4zmhuju2dxbuc9upuem52lenx43ss60fpor3v1kzd6nmusk16176sxfan9lqdxe9bd',
                flowComponent: 'at09k396kzsgnykf6029ym9o1sh7lfwgp84aiyu88abja9jqmugzav1zk48k7wgumffitaixvbrpv2xowhzdtr7e1jdq52l1ww7qramhzwz9ai2etgecnlf1too7f474vuu4xpbzariwseh9rvanx02rewy4y74m',
                flowInterfaceName: 'mkjpgfe08cm8cmog0gge7ps4l0aphxsb9tnsm01mhg3q9k52jrzafrtnt90y3enpzr437m8cp3xdnm11w9qael7v8pnmoi7mmt24alsm8rwei8ji1fst85snongtecrlxnsit6o51721zdfmy0t7auyja428thyc',
                flowInterfaceNamespace: 'lhg72u2gbftt9jvkeky0inwe1h02z7krmndprp684fkorq0j7oy7l5n8xzpk4i0poet60kfaj7y8aeyzaj538cj3quu4w2wtl7531hsfhfe7h5h6i07abwts3tb4u6dg4sjk6cnmdok0r11ucvpb4sjcrz8kaqf9',
                adapterType: '4zb239j5mp2jrmivjx65of3e3dpz3l96lpbqxuh04z098gl1gbewvtblnqqt',
                direction: 'RECEIVER',
                transportProtocol: 'sla16bb9tph580fsmetnafxh140d3ipt7rpckpu2m80hhd4jmgzkxx63hu0y',
                messageProtocol: 'gj007z9ae6klvfkgisqpdp5zd3fez098n6xcppipwz59sbxxnh6tyazbskcj',
                adapterEngineName: '5m3diqch0er29pvqp76rjst7kzjy94af7bpesnr1vwqaxrzitnpqbk0oo53rmwtasp9yj14r458u228jdl0yni0yex9tlnw12999yt1bl44g53geujmst66jo90xp6yp86zqqgc6sx50trvcdz9dg72kqzipqnws',
                url: '0jcuh8b12umh57cb87b7oid8qsk076udc8fny39rp84153pv4qiirhd7hnd6c38pnbkemdrqsgt1aiabcn9inypvngotk7wkat6rbs3fkrv3iwtk9k8d8888d3vqqq1ttbpsucagmwpzqkvevlbhdeg78l3kqkfenyygbofxb8xq8vlinxftg2eld2xbv9r4h3zvfam231qfnm1d8v91hcad7q5b0w3gh20ut3gth2vbc9tc6471b1jglknssebxarf752neowc59qn5qefj9pjjwiohw4kxh2bvztvvp9zph663yjbehcczev89tpyp',
                username: 'o37329sewkeb6aougce6g5opg8hkts166au4pbdaoity2eq2mwkikxl7xtklt',
                remoteHost: '23jcovtl3ro4mp54i1u4x1uqo2px7jlvxvjrx2bf7tqmy904tz0lhh2i4apeps6g9a0qfx7xp2bjr8z3uunseaye6h17wtedhwk6i844aqtbabjvp3h1rc32yjixhz6q6xcsodjqesrpm2b2j6n668ti23arge8m',
                remotePort: 4105174389,
                directory: '745o4bvoyqmlhtwg9zia8jocmg6zxczzmfa1thrbcwpd1e6k2za96gfnjx5raybduli86vxwczvghb06j1n6p7d5lnmnydl49qsfm44vv1ikebll8ey5y7di4jt93ge70dm9buxbs48vq62o9qwyd6ecip7kr38dnhlgkg4lzqzu24krfgsruv9pbejanls1vd43407jpqrnl4a2lw1mdjqeucqe49utan0v2v718y20q1yxqmuy8u9avs2ek5q27mba5f5343zdgfw0nus2n7pmovk3h05fgtz3gj4gpw4pcm2b6d613pmcwkpnkxr2jd9785f68eznedamaf672q8wta9yzpvel99uqddf2c4xzg5p6reye2yali234x5fz33krqgc2qfg9bf2mxp7py690kzlb43q8y7sd3cbc15bidivy0vnzkavb94u2zvuo4835syaenn8s4iduj43zmjayjdgbh97ld5tk6ul6bclc8wjwaz4fmwqiuov76kgqq67tdwmcyc1byh6rz4haxzhsf7beup7kijgdxp77q725ahfuzwr8ivfu0l3m4h3anh48iy99dwtvrt96ut50sdbuxiugwe7gjgo6evlx3tkaq33txzllxgtenekj3pqcpjaly8t0mpxwgbhynf6bk0qpaw0fmhr8mp5xaq5aoqrxydsidys5rg5eympr4vrxbz3xx1xoyyrq8nrvfplc6waeeoh1t5q0qep0xvcdu8wno5xjz27l5tzfs779w87plqce6v94j3wlwbk64u83e7zo4flb0cqs1xcey6diwn0h0v36qsp3wd331gkgdf7seaxy8n25k7tv5lbuqhty44tniww1zly18srqq85u7p4o1vn01g6o1kkkhcw1vqszj5whj8mhb78v5vqr0crbvkby74dkvv9g2o22onn33wkx7nkkl5lto0crd8nr2golcjqtaz4c2b70vs2ai0ndb9u7rwr4qbylwfj6e1sjv1lp2rablxtd3dta0orm8jl',
                fileSchema: 'texlsrece2x1obmlbpulr0v5msxedxfsjn23681dn020qhq7f7ti18ll7n99t8ccfaxyatqviszg6frm9dl4bcxaf3nq6djn2gr1j2bbso0f6t20hca4pufg2ctdx7waf13gnlilpz57vlyzs7bl50vby4nuss144h6iwa4hfac357ixhy7m958o9r3ozswu7gofqxg5z5pqrspw5o4upf5u4l90q3sxpisych1fc9b89a9fr1ogs6zspk4lzms0s35obk1bmzg6w3mbrqxe96zxffwwk2valx45qvcbmiq8vcys9qkvq016svq4bqhosp8yfknhugbt89fyyam40bzeenpirapew9tkbozb8k9q9fnhalbg561awqk1ekhv47xstuv13yngw3bet46ls9t15qkn4vfz5qsajknalnlvjb85yx4nzw5h71pbjut3pswhpnixu84payygolvgocv2z8493hbv9i1sqskhlfolosgp3wdbjyt7pwpyd4v1lkd69b3g0oix9uttgi4gsivebnazx93dpgx68x98n38yxfjckibg5x8v2ho6ga0ux1a44w57gs2l1vnhqim1k7n1n9e7bz1mf6dtmtixb332nlmdyqo9jfqst4xafz6ud6z5u44vom5u6hd6lnj14wu05ncr3afzl2ng95945g2dj3eazotqg1t1koj50ychy5p7nbrd0fp8on8ty30ta2eofi0ixs2mbb9p0dqb1iasc1aqoco7fawm2eitgxhquv2s1h14x1yulxeda5mmpschp0x9lwwijnwejhi9w50xsibspxs9hcbgn21yrleodjcfogpqgo8844b702gwyrb15fgmljwhk3xiwcrveeslsdklrp5g3vgphx0cbh46wsikfk8d7xfm4u36xrwqcs1psz1s1k6pbogv1tvgdtwy2ss3givfut2yic6c6o6hulaz8qcivqdsrth4qk9nmwmbyiulxuj007b0nkt90s2z223i7ln3iapf8kx32mqx',
                proxyHost: 'iri9unubrzr18a8g687kg8xmzr8l8l8p4rk3wewp17undll3trwu64anbzxp',
                proxyPort: 5724550737,
                destination: '5yuho9f1wtey81tecvcywazpjnhozfs97ubzcbv02i2uo7v8g91na89hy88fglkv4hbhextcnrfhpjupl3v3dczpypdxb2ppwzojm0neoc8q0920nytbtwn6ugiitajsorli7cmywmsyt7zvnm8kirxa97jlplna',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '9nekj2r8t9c7npowj7ok46z6gsacnu8e3g10tjdrue7zx3vghw1pzhpgm422xqv3avjs2456822qbxcx2dq1dmmv15wfxj8v81r2u7qx42bqn0i8irrovig38r17u7cqhw5sgzmt2239x09h3ne7ca0ny4cfd1sx',
                responsibleUserAccountName: '0d69bj6mo2zensnrpnt5',
                lastChangeUserAccount: '2o73cjqvp8xg66ocp9h4',
                lastChangedAt: '2020-07-18 03:56:29',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelUsername is too large, has a maximum length of 60');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelRemoteHost is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: 'ahxmplqndkxulb09esg4lglcx2gwqj6drf05249qc7qqusl6t0pc0t18t2g6lsr3kermsjlgv07003ev62fgg6mbvk5dqu63osth6t0n55opthfr4nqpvba4l6z2wjq0yuqhsok8lad04xat7xw3tt1jbfyqup8u',
                component: 'naapb4ppqihyhbcmu0bgj07ljv5sw3yj5e6iugcgqut81colh454jbn4oecgakebcctvswyttbd0g91c5pmwjshbhejjs31a0evr88023u53lj5f6tc4t61073z0kbmokt9zuv91wen97nizk0ehomiou12clfik',
                name: '5ul56o1zhuoeqa6042mv7a8mwlc4x0hlhmtu2582a4k8jwdhxkk3tcfe8ytcc3z78m1f7hmeheyf8ur3pkmdtgf2yc064hsf1fxza46c3tm6esuknk5da3mz4fxempaq7zrfpjyb0505c74tpt931wk0halsouzl',
                flowParty: '39jktr0dmjzkw89d199asvccw78ga8vq87h3f2vg4x5s5xosr0xhak7kczpxnixbsyy2q2wu76kvcqhbwyu6uqcef2s15pakv7he686d7ssqv7l2yo86rtjo6fb17ipa6j1lttja3k2q3kw3eh4qt1s2gcqc48qi',
                flowComponent: 'ug9kqndsb8bx5rz254pujtqa1iea18omnf19rtlbjc2so8t44d1wnfhsnpkmxklkpgisyzvwqvy9jym7zz6kjay45v921aggn83bn5ji8iahz2qq5tz0nkj26xnbjuplt9vz2yibjemi1xhej05s27bxcjj6wrlh',
                flowInterfaceName: 'pckjkkox95z5jk86pwvh1me2dkofiiiqe3adla7hjgk2x04796pnbywt0rou0ea3a9e08zea7re1rwt45cz5lkecapgetypfwh3p9cxummd2pqg2lhj6fcc7v8liwisxt659g2adzxg1hp3dlvxjn3nzpc56tg0a',
                flowInterfaceNamespace: 'kyd3dawjhr5gvt0xtpuaw3qvug1y2biejjfg1j5ydhlxi7f5a4ar5wl1ab9a4esiw47gks98yhy6axfkvh0hn5u95z1t2ynuza79buif8dmh5p1b2h21uvn1hkdeprkrq3dayv5jivc1235mnfilqnodfpptptxf',
                adapterType: 'vm1kmfpz4jv2ioqauj4heu6oit4zwdcb9og2vsbfuot9pq9d5avy7kahcxcs',
                direction: 'RECEIVER',
                transportProtocol: 's9vz9qe5tmji97sn4r43bb99dxy4gn645wiqjr4xv29w3s2owgg74qbgvmhn',
                messageProtocol: 'ygtkyzn2ww5ysgxqnhcelu94xyjaqvzbddty73l3yfqllj8d91pmkfkzlvzm',
                adapterEngineName: 'vscftwbi80l6etyf2oxh84pw20plsgf8ew07omcmhq6sfp95gfjj7jnmjocl6adw74fgt015stzpnrp0amatvs8x9v5832g65wc2njvxgibqzfk65q19umk93qdvj450r9el9uys898nr5m2jfin2b79rq703mmu',
                url: 't9k0hzus7ob7ec4t6i47hdqnr0xsg4cdyqctw12ox7vovmw44h7h2moxv2vel8xbnfewy10ka60qzwf7r7mu2ryd4fgevae4wi7z1hfh0cjqyrc094bkg0k1gv1bvb2jmf7nvq5n2slwphdx768tc2l294sg987huv8drxhsnjo2ixp90bx54nvdy9l4ue2tyj5wjf8w3n0gxau0bgglwkmxw8ipv61f4m7pypd4wr73pbqvnwngzfk9q52k0r2w7e9vxlj1rfppsu8g5nneimude5m6w6cyczrjkg1vqfl3nz42aco0pbbglcgzajwl',
                username: '39vqy1q7s8njmc4afis7e8kyo8krfpkm416vwz6nniahzaic38yu6hdhae6n',
                remoteHost: 'ydj5bsh72rtwluplc14y6vwre6p06v6ku9wn4axi5iefukr5mgevpgd7e4zngofub6ioe2brq9ncqz6p4cuif7wfsg1vnc87j0pkohs2o6jumgl154y6366ye09huufe75i9i6kpmy62fnpx6ydurk0sh296t28zl',
                remotePort: 6400067841,
                directory: 'guewosrssnmfxdl66ejitmdzargqg6bbv9q1uurbv0jljw0e1noew9vhif080ey8n4kphbuummtqsevxc5s836fqai2twr23ns2sy96nqxu4ybh50ej75ot06728311awl5kfk0jgeqeqcmtpeyq7yubt482jrll63a7i3mbnfvyk4tu7jehbxtddh459yv3leha1pe19a0athohvqroygsevx38y6j8xm68vqg7rcqdyoyyti5w38ib74w34e8lw4q3uo91iuxra87136kdrq7kpjvgstkiq2jd0oobef19dlkwebd7crkjze2yixuwhd0osfc0t0wdqn49zu9n0p2nn7cxs5vkrwds583bld1397clwkhm25unycyje6ts0ov3aabyh2uom70p6r6ko1u5n1wmml1f2e662ifa0074ddu26pob8aiwwd1gnowdj0s6koq5c3zh52yie47ukbv8zd9rcs78lx1np2x12sy7xpx7pofc555qs6qlzx6kfdwtnf2p9tpvc8244jbzwmg131mtew3ampahiu0p1g6ydkpb9vbkam58r7uhrutocjbxode0i3yohxapx2wnpyxydn4iv9wrc4rnugal96hk1wnfun21orechzw5kqrp3nej1ieax9eoq0da3hquv6193xajh0nqbq6yjlp3v3jckx5jf88r832m61lqqvinr2j271q979wsyxqciay1dwp45grblahyn4kae1rdts1cmwlrz5c0yle5fxspha5yxgm13x9bgjfiihms5qgp6qen02h8jtci7798hwlbhfxvuxagm1kjj8k5pccuiyvokvmewkgb9eq49eu5cmecsmq2owpx7ledbuu9g0udh8bkcl2cocxk3ywl62driinfiyt1ues3u6mq6dn4q29jw9m0advmxsjw2n9ltejd90gc49k56sm76ybs62hwrxev1iqowyg7776sgjd0oj2khd5r3phxc3vuov42x9w2c9s05fvjwfycymhyzk9qhnob',
                fileSchema: 'eh19y4vgbib6xlnze2qx6fykf1tg50ya1l1w3sn8dh05zszpnjjqtxpattcl3q29zgvh3g20h2okyhn3n5zjjd0jangv6cbr3aluj2cbavjeegrhuk3z61qmruvlrbh4yoq43c656k1lk720qwi8h52ji8axfaf9i03miavmgbhivn28pvxpph565wn15sc2kuk0uer0392lr1ynyx3dauobo34lv1yaiysxdwp70y9yd84jd8s85zmr7awmcxgsj62vt4jj4v70uzv6ydxowlbbubglrs0c7dmv6o29aup2yyisj1j6a54mz6e4oq5ixt02f0h6n62wucd44avp2ygr8q0xlzdiya9l8ewvv1g5fmczk42wuexuhnazrofpwiijgl24f2kmm2je9sba43x5ngclw9njffbcfncxa292vfu2x2dhh821nrapq7agkhwjliivevwqx794kqfqv34jetaqwyu9ubefe2g4up8p9h7drlmiwv4d16l1wrgz7777shn5gccfzwvlv98myeviqwtvk1aj5e80ejbii3qepcoc5xnxvqysbfsbcrgf17odwd1fo2x39loogfantlcddodp1umpss8f572sket215xd1f3vzxiinq3qvby7j3op7698pltdnyiye5ci1hlo16quevd9g7tkjjjme715vce3j82l37q9it4gbbm0c5tybqg2ad8ulijdauf8vuj6asworlef8dd2dnqpq735r3zf1y3burhbpbs0hcf239wzpnzddjizzwxad7dcpakzghx4wq89dbndlm5ko2lk2gzyje624r9ytj0ryov15koew2l2dhvt5gquxcotvpy6b4ookimg7f6zzci5jv7wk20fpopk1vuh6278cd40khff888u5s0h34iekwl9t88ehx3gckmjmmcncrcozg4keb1mn6xmd3xyus67tidt4sjpvhmbtzf2t3vic3ys915luict4tf3clnvlqes5ad0rltnq7xgoewnft795709',
                proxyHost: 'rjaq374vealwms1kznsw0akmygzev9npowdqbgb4k197xfz1s0q12tb8weue',
                proxyPort: 3597248275,
                destination: 'xxr2uk3ycbsja38b7no5l65njr3vhnnqofxhnwx9v91nkqqbuc684xcqmfa2riyo9mjv88wsq774qc1a30suqkj8gne1ac5bp2tikp2z02cajgsku5vpvb07s4s1evrjexqjgap4vez322363l27o6bhb5g8la5v',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'u1g5apt3f8swchsxwjdm0emccdd9zyn9qoee0ddr7agggtg3g2e08al37fwtbdczneuaw3s47y99pxwna300lavzm8f50px8faqckeybo4vzxdgck5pmk6r7wa9hhiggr6dy5s37wvz14j0eqf78uhlz0wq03qig',
                responsibleUserAccountName: 'm1l6xx3fa2tdqwgs1by3',
                lastChangeUserAccount: 'ud1tqzmg2wx02d735x5p',
                lastChangedAt: '2020-07-18 00:53:03',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelRemoteHost is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelRemotePort is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: '2jhn47nz59puxgu4v0mtj1jwwzorsj70iwz4g7s9r1jflna247kuy2210xfld6v3riqnxafoezygch50uwzygk6pgcb605lf0ouwqz3o8o6w7p3m7xfde6szgr1r72rxqbf4bsdk4fen17au7h1n0nz9kqin0cou',
                component: '70c1pcld8hsa1zdabjk6r2mtr1whrpzfnbpi91hrw1ufggkjydw0zyafztz22ltaq3zpn4q7la0dkr0xpi9r3o8gj89ix9op2t66sfg3xb2gj9yjwzrmn5tv4a3pp29k754o7mb26iqxf0y4zjnd5oy92157r2z2',
                name: 'gz3z1xi84hch9mwl95stivmqaha9g4k2midggrwen0vloskwr5y29mswylwhyfe0v1xvno9l9ukuti6wx4hf74efmqhpqfvojisq7rqyqm4b7iomitr2vciea6izmb5j330alp2pbggqmonmzefe34gk1g8oy0eo',
                flowParty: 'xsxjkbi9d72ro73eih9s4nmtzgep72l1w46y65omosy99n6gnonk3rd5v7ydxdg732q7gzirj1rn07dip3edk539vc7ycwa2pcpdkk3jwy677eorky1gxpua8eyvsfb7coen0p6dgm86opb60h81nceawe1rbtyx',
                flowComponent: 'uv8ft9pu2rn0ym717rbofiyo7nksqbkg2pmjm25kquohmr7xmwuc2qgo77u0n3txli5rmzjxd573753ajf450vfx7zm0eylqoks606giygtk0327k0tmr0nn3aytff3akapazmive6oqf6thaxw073np11r4i8nx',
                flowInterfaceName: 'nsfa9bumst2dlxgeaurk08bjdywwui9qd4mvz0e08w8edywycp2hx7ka56xx3tn3wsqb6kwxawh5soqw0jeuiguvlrbr0w0ddy805hooxjf5656oz4aels8ll2nueppwpwwqzqutv3btw3i6lflhv5udktizxtzf',
                flowInterfaceNamespace: '2mt277wrbr8v1moc36fh4ayvqn32y8wfg26mribwesixk4ysccubn4ebisofqafc4533vbcan3bgh30r6lznwuo4lbxrgxls701nhupyzdx3dwabr41pilq46c2cryfclilpwkitit9820y1b22u5nsj5hahjuei',
                adapterType: 'uo1hx5baqfu0aysfc7jysvscf2unlo0v539z3w97r9a8j2iluvs8shizwh39',
                direction: 'RECEIVER',
                transportProtocol: 'qsgw24rsvrranec5i8vpq5l7nugxc142bkacwg6gqug01of5s3gpp3c60ehf',
                messageProtocol: '2s0r0pjb6u0f37ope41vx4esnehrf43in360kccsi0mmqop6x2nfbbkppn6i',
                adapterEngineName: 'ofvcnecq4lpxpizzh3hdy1o4glg3ajboj52r66cwnhrwoui4klsgtk6lna3s6ymew9ni8j1ogpiq0jh5j0yvpxzp5ab7053xinkprxnyrsh1emj3ln6pncdfp79mwfn2x6ptv454fv6doou1vbxck3vjc1d4nt85',
                url: 'ntgmoph469kj7hqzz6sm3csvm3j0b18njmzup6en9waokwnppp0w4yh273rtgyv8j7q6tpacu4cjdu70uae89h9ukcprf20fusc6utykvspxe768xlo9ociwl75q5hsd3c3sx0c41ckicow2181s6czjatbt380somjyezd17ytfzr87i3j1x3i8js1i6mxbgwiiuzbw11jnsxmoiqybh7zv4h5kev5rpuqu3sdsprcib1if61igauxnab50q6ju2yxogevjcqdjcadpk4yumlt4m90w9wdpscpubhdbu0bi3sv0v83qtlj3m930ot9e',
                username: 'ms3oml0nvt53gnrmsauqm8a5nb07pqklipp5orsq41hddz6zuk8aqdjs9jre',
                remoteHost: 'a55itp3c8p5f491v7l28ld7mfxoh6h1jf9cr139fgnkrornf4fdf1klsfspupbte02ejjxo8jegah6yqfx4dnn2ijj6ynshbgfrjqgecu3x8825nwroe8ya41lshbxv17y8bpufx7orx5ks6xksvu4biwyhqi3vi',
                remotePort: 11744023591,
                directory: '87tj3kb8njxcgyqpjn2dri2wpv4p1dc54nr4dqrxy355a4kvzyooxkhad52ppqktmnq4o7z7iv7jmirwp9o2kcy924ynb59pqvpxfjgxhlw0yn5t8bdfl8l9flhzh7z1f78zut6pp8kva5bof3q6g61zci6pnheethuiz6giuum17dcywm3l9cuvhqe43zgsua0o7t7o9m96r1otvsvzrgihlx6aftae2echp2g5cccri3m0cnd6i06i6qc9qnhhky316grn1am2chr6he2i6w7f3umrb28p16jfmxje5s3f6nlusvt3bl9vic3rv88o50jdd25qvt1gs53jpzfagktc1guupywxwjhrlk4pndmldvh40sx9ts1uefanlsk9faan4f0c1qdnfld7tonnuvgrglk8ihudvpbeywo9c5ineqrioi7a6q4kunk41j6zba630aboiz5pn12sjrjqjotbiyfy94l8zas3s56jgo7gt6apiymrgcqmnyi9vsqpmz4l9bl42v2o73s5mr3dx7j9xmnqvcdmur18hzdgj6rpm6787gvnun3uz8t2vqitq2zgig6h3okyzfec2vcbqzaypcbleoj19yydk8xfdn59y9a4ornjf0e46qaz1x7myk8qz8tpgc599s8j9fz73hha99kjuye260nw4psuaodclq41ki5zyds28qhu79m4kbq905rm7ll00oq4jwbrthtaaenjmyr4fmtade6u9d8y8gmq58ghulwgpa52uxg0tblac70mnmd5q73l6b8sd5thlikio59dvfpafff6bfo0aa8gnummw9ytwx5qmh9xs5lydja52eelnfnni3h2cv8m8gfy0w4scavh3sbi5lca7uyo55ofzqgolwgtvs8y37hf5lqiibkd3qrat13lqn38rj4v1hadicgmqbc1ashlqialsqqcy11v279r56fhfclqzioz1vzisfygieotfs7etb2p7f076yc965dnlu6di5ij4ieomsjieuffucri',
                fileSchema: 'a6wl09qjm25fdn2fl27gq47pg32zta7t2mnic2dp3o2mzrlmebboy4yi6q6j559s7sy3xbfqpiv1qofm6hhv3hzyooflffvprxyysmwx3sf9ohugcrtxdk5ojm5f5o4hp14097907j9u0xg7a326sdhb3a4kea38y5ea6h61wq8f2hsn7sn6z60pxt9f2exzfi5pqej3z569tihhrflrfplq5u8r8suebrhkqkr53z7i049f8qo9r76clyr9pzfa00ryd0dh59b4127m4bnb4b6y1ji9bhdxj2vrvzo78p8a2he3ml5s7iun5edkwky0v5ettcox29z6ceiu04hyhtj2mmmhrf8svztsc8zkv6885vkmf0r1zsrnawrui4pjtwri083x99bvf8wgb9x5is24gs0ga76mta65g42uv97lghtuslk0k32fsnsftxs5m9e638d2ou6emuk8c5jddg3hjjcxw19qj0doolbvwwgernrdpmfdduo4g3mm59xjfpsu72022cg7djgqd9os1n2a87jz4fv8noglnq1ei6prs7vnytsnyzxotkzm5m95i3ztk1bms2qsmsbna3nz4n8h4fkb2z4ghgc4ykejf1n8girblkqlqulc5o8c5ebo1fi7yufg2l7uucf4kq73e8tu1xawwstru5p3zq1usilhg4dw92twpr24a3pyqjxf0ltm2q6pag69mzm12qnt0w23vtgyfxves0ga8vuw2ch58cbm5f5gix46avfjxxac2wih8ulmexl8bf2m39ayhz4y4gdp2vva4960asq35i5mczy7o4klyw1ekyeb4t3mvjypk6ti14sdu5dekr659sg8tatxb6wyhvsvu4nwzg329vlxwhhotry616yyvceyj1yltu5i9ci734wrfhs01b4npuvjc5qqughya3ud4p7wsolnv9zdcask41ppjqwp7c4mj5vyhswyntai3a90pnz2trnedmo6mxz6r1gq277v3pctlty258iawt2ddthd',
                proxyHost: 'gdbpzyw18gp9w1lxgg3sazzsnom5m463zdlk7osvsrt3vwd4i9nr3r6fnwfa',
                proxyPort: 4432051849,
                destination: 'lqi9l50pn27pprol9qzaz3vzm43yi4oo9aybud0gcys4ycrf94rzhiwzy8w0mfgcr08l73ptal6xz1clbtn39cyzu00293e6exubcvdejpbvdob2bkzdylxrzysus28qosuoeln0qvk1idfbczazzfsabfkt0ii4',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 's7wymeju4utbcf2baep4msex0kgskgr5oxu9splblho38ac2rdeq1n3bgo7xcpro6rlmi2xm04y3mhq0ktwmzde6e9oxtdvohbfuf7zo0tc8k7kz8fzykz6xfs2uyqhlo0i9cexpioh98b3jaibby0j1qhwk3sc5',
                responsibleUserAccountName: 'od2w671ivpvgtep49ckd',
                lastChangeUserAccount: '2ojiufmpg14ed42xf2si',
                lastChangedAt: '2020-07-18 06:09:51',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelRemotePort is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDirectory is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: 'etgma0ich6n54zv3c7hyxixgezfzxilimmhgkyjtqzpr2e7ygf9suoom9et1460lwgie71sx80cqgy624vo9zrftfs1saz1unzd61zjirpg8p9bj4zt1y3vrify9tqan0t0geshrmg3gzojyzjw3mm6z36821dze',
                component: 'obnihc83p9azitof7z6h1v6vwzzot3ekldoh9jj3z6rdkmeqxb6srvtz6t37ty39l0cocjer9ieqtr833pq7hs9f8mry8wl2jliai12r4pit2icmh9rwiuzin9678j5wlewyxju8ujfzh3vavs8ovz9t2774wjac',
                name: '9fsi0at7zu0gyu915hgo11c92vn198deej44kbc7awvhp7u2ce45rjdf6e6juu1zzwnrmroc6vgx81c0qxfof3ttk01zp84a8q1pxetp42tnw26ubulcln504posykam0yesge8s23dvcod7wsee0729zu1iqpz5',
                flowParty: 'osfher94qonpnij3pfcidik4dtofoi2t3kxinfdz648o2r4fv6wy5vzmj0z1zyn8m1cbexr68yuxg62eu8aptmb08w8ijgqmgsvxbyg94x2g9a9ebt1miwzyk6aiiz1nhrl622cxmtri4pcerg9z6d53dztoh41v',
                flowComponent: '1esb4ic27eyc6bf968b6xlsmilqb92yj7st7m8sscxbt6crs1qt0mpv0v3z78zttctn2pr598t5gtlvoqukfnk9o5ocaotdqqhc267h78an96kuuv7nkilrzo4sna2xfye3kgdix8iu2csrsax981ezuwin6yeba',
                flowInterfaceName: 'qc3n3523re6nunonfe7nio4uaamcud426bcz1jskx6mww0vrdpfmp7tq0iwm1i2dir5b7edi2e825qmyvz7ht6v7t5cpq9dbh8t1kb9iyarqhpdzkpiqhv2y45cp8y51j9qsszk5saofctyk51dx70uihe2uvo3m',
                flowInterfaceNamespace: 'oe9x3teelw84ki81i19id34zq84t69ulfzssaaujfo4m2z68x8innzhnq1j6vclqd5rxlzd6n9t4pfmr4viwhjb9lir5jis9opcsrca2mc7bh2y76ryyu3v54hw6o2omifj43yj7undjieyijg37b7j727xvzs98',
                adapterType: '7ahfw9668wr771a8misyk1tj5xhmr51a6ppb0m6aube6irykibe51101ur9z',
                direction: 'RECEIVER',
                transportProtocol: '4kk3kixwm7d5twuacxyizw1xnzsun86e10pi5phvs2mxby573u6h6vticshj',
                messageProtocol: 'quw6er621opz3jcsqjdag1my1m12smecvodta0hbszdobzjtqem54vwn5jvb',
                adapterEngineName: 'cm9v75lljjdj7m11pp1h73oissnsu7o3kr319uj7e2u98lck8bdi0ex06dm1qnndo4loi2hanxrxdrh0sol68isf18x0fw8qzrlczfs2yevbqe9zb1ygtrpdt19d4kpa0mqliure0cgqpxbjr3k3nps3kpjly2m8',
                url: 'stpv564k65jbrkjq0u713fah5kgdltkec12zygzn2f6o218wxtfffqt7f6x1oo2gs90kgzstjm98fsrm88yeei4ds3c4b01dataq47j6kt7atruxg8ypdoovqohuekgc04lbn7tvo9rh3eygcdg36akcn5xigl6c5s6an2797i250pgxdmbtvkdpa2ioy0dcfk9m1utsa5r1b41j4z2yzxi7l0rx7jou22s6ifjy8tu5yuj36gsekbpllzs7p5ovihok5b617iqwjb3pxsotoxrkajv62xk57pjrg6w9s9kqujjj1ala8v8hr0iz9lue',
                username: 'znnagkbl8p21zcy1o9tmfcezo7v8vdg3a4qj11ihruupde9l0x1lb4zv887e',
                remoteHost: 'f9oj0fxc9ai51behyjtho2ess4yxc8rfxbngbgysp4d6fyl6uuqrj6zhsww7e1iqp3qgsrl6igq63c66isas28zz8bryl0i7clcjaknjdb4hwswyxsniezovpvsoxcm9uiqzmoir93rq2qvtzffdq6nkiksq2u9j',
                remotePort: 8681033747,
                directory: 'yw6l4v94bwa2xwirbil5ftodzt741hu8xwcwiyvsk1xgxemhxq0vqqnnvhxlgdh4bzksgiqd90nwqy8l49o8umsleiawm2eil2mbdfqojo9gq2ujfo0b66kcik8nsks8tskq4l58wz2inf5vct2vfe016o37ti4wew9ildbtsh1c6r3qs92wnt54l9k1vhu3wa6glc5iuax6w9p05r0h5i90ek2tfcezh0ynoye6503clwfv1ammim0u3hty2chvzqy5wt9tt044hthlq9rkwfweh6gl1k2d7w47ubgneks5t97b1414ghrfvswq8gdf4swli58srbt45elbm72f1j9qx7u30mjsf5zebz8dilqp7km4422bo022zar93zpt79m2356tzzg2yzdz2qe3j4qfrc2hig9bg3tig7eriey67071bnpbnmg4n1coca7kfkgwtlvb7vcqmtz9ec3ksvu912ksdh0o62uywdv4cktaf2f7w3reqglh21sqso3h4d6shhln1eagq9bsldat7sal7lngzwz7ywjvjyycpzpltcxjo5216u5i1270e707dgnrfk95lhxtrwq18rnsszmt3t6g3ympak4enj6vvdj67k9l65kbx403naogb7e7fxf5jtcuuq2j4ejpkayuivjz0usm4gqz0ciytn6lt9av0f1n20a4svshjyjys3oqm60uanuuwhite78f6teqhdt6ehwa3uyohak4a8pcycgzasasygk5d63mc0cc65j4g4arh9iib4utbatdm62o70yi84gkuzzh6x8awjc70k1o6xymw419bwmqjpstyr9r2kqfpgipzms0eacaujl4kls5fu38fen90zqze8khgxo7j4y3b9ztivpttw3ct85vdsvbi69alj6bvuvuh6ver6n35nmfovr05r9uxv9ai453rar90pytgs1wpx0vh06o76a7feefcf7mjgnl67h1e4koxswvi01bxy4qvi3pn9uu852ce3p89l2v84ng4lq75',
                fileSchema: '1hp5ct16gzts2jwzxkh32hpkd0d4nff7xorpijl7hyo50w17wc9lfm9ph7qh6jiw6ksg7pi7goyctow69jj58sv2dmx8asafmgi8m5hxa25ttec9no844d9y6kek8nd01gha2qj6m0nnlopqynyeyhezmaqc9miez540802qmdoderb60t8aky5rfty67lexn3mwmnsbc279ckoaikbc66op2t1ps80lpqawn7jwx34ab4ni6kuuk6x97mg255gvyxg2ras5j049shd36s7j5rf9kd07pk2s4hv3ppvkozihztdb8uri8hb4x5gpx9m2b6vborqlcnp7zuc7qkezcw35es5cwcusth1vdovwa675kbz702hwm9n2kyqsc81jgdd3ny5ni9omwfpah2frur7ik8b84cipw9psr4mlaccoxsw08fe5dml8g21odn2qi6xxq4c9ioan7r1rvcovbd8tutmk9dblsp3kcdjycy0m2tjzkju4mc9s0rwte0qggm4aful6p4zrx510hf30xp84gu61ahx8xxcqqhq9vup4bm8i319bros8o0o73u9l7pdsdnb01x4l9czz2i5cw7gebk65exyywuwhgvfy65uqx8golmnf6dpciiko9qq5henq1dj0a5h6kstcj6lavx93696v6afugry4th0l17vp3ts2r571ory8u934kw53dc36iyi8mzuh34mzuje2fpb84wcembc2wh4zllky6g9mxkqywj77h4k088tjl2xkd61gy1hhi89d0o9w2pvmnrewffn1bwyymv13poe22zkql3z92quedk1ot64gai0hdedbn1lzwfudafp2anfqvpaukrgko6p94m0loav4rgm1fok3bogombmx9jg9mwov8psd97hzi92928m4ph3b5mde5xz1aazrujspr63k61pi0sf77x49xhrb453oftbjt2v5c0a1lbj3tsghzigczcefr7f4wct42fudo2f8jdb2qp19ckd4o0t0glzdgkuq',
                proxyHost: '207p3na05k8l75r0bqkfbxtmg7z7nkh1kfac0qftgnr4xo5fjzpvo2gs89a5',
                proxyPort: 2939927950,
                destination: 'wm0id0x51scz9t5agnjgxsr9sxwqb9zqi06ke7v2fpv1l0mvif1gy1h6fr9gwv5dpyf0myjmpnsq9h3l02tt2ncseejo7viol3rg606727hqblzabgsld5u7d7tfdl406ql34pp3av6odjn4kr2v9lpfv4z49iut',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'hz755ul1hiwg7ndtxf39dncsk9syeew8fih60faxnbhsv2yyizc4vw3rlld1o3lrsnpo1gj5ybrr5j4ne19r1gp3sa9znwhsj74y7plcz1vascxyj7yjmc0t4lubf9lip4buqrxcdsp01yk589d3lgxofu0mowfd',
                responsibleUserAccountName: 'skmgdiqoqc98oh22l8de',
                lastChangeUserAccount: 'aufxcroe4qb90tqgs384',
                lastChangedAt: '2020-07-18 03:50:59',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirectory is too large, has a maximum length of 1024');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFileSchema is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: 'os75m1jhzv9z8c07dnl6iajqe28wbqv4xz5nyrwnf0kq08kw9r0u3aul1llwqecmi57nvnze5hylybsupqynspfguk33otc5oe9hny6tlcg9t1y0r3ntwop8opdmef1htds2g4ye8syuuidskvga51fukj7j64fh',
                component: 'mwezlhh7zeg0csp35wjqp8ui1ypphgu2uyec6ea57jv99f25v6q1aq2876len1ic9dklhaiwfyk75vnox4kban7jxnpy43ntwtn75q7ikv8xbqwgkdppnmoxdibnmb7yhca818kjsx97df89udeyil4wwtiau4sc',
                name: '0pfkp5h6l9p1ffob79wge0e3i4n6w4n6liudh56ofn28hfd8lome3x383blrksdbhjdj8gu7cuzqyibamhdcclmdno2zofhgi9piku0r346so38f72y257ffwy1ht6vqjvs4bp6wwx0ordpdzjmcc7frfjzvfvg9',
                flowParty: 'ud3njat4as2kyn72r0p145104mn9bfufo5tukfe1fwh78wi7p0w0j8rrs903k67cj76po5zhidpq7s4b4wlh7hvcwjf7odj85j5pweza1gr3n8od73945f49fl2goybekexjlc0i8lwrg7i237vh78zry460ikct',
                flowComponent: 'kf6uit2eokz7a5ajupeup09mw8jl46khsbl81xd4z4evh9ubb3wta4qazi378vgbfpacnyeeeqj567trbnws3e1oyqqpaj76bn27m3s14j4ncnrg63pt2fwgskll292mbtb0i6o9mlj0zn0nmjv2ocjk7865hdtm',
                flowInterfaceName: 'rjgtcgagcrloedbbv9ypqbejgjc3ylh0imq203e6oz0f6vgiim7nre140vwy0wzh4raw031elvgqy3kl4mfrgj3jcsar7jmlz7qtojvpdoqnwqcog58yfbfeg6verf5r4k9vs6tdctf6m4eqyz4319oa7yz4taiq',
                flowInterfaceNamespace: 'wsyvh4nitr67kibr5ko08xk2pkugy08ciidsopw7kvv5wnqliqtjvhpkpyvpci4uba1syb3bvqjdsckxs2t6rv3p31minpgp69xrx8xokd0zsdrm41y4nwb1gcdymiv2vv1cgaymz8do72uau63715w7e15iq7p1',
                adapterType: '7wz1ptt13nmhsm6vxub90om6awm9o8ucpp3nel8v1tc0ed2n5h59duqj5fkj',
                direction: 'RECEIVER',
                transportProtocol: 'sor6sessqwwgyhb8je3b3i5xqqiox88cdwa942mdnxwyvth2r8pm913161o8',
                messageProtocol: 'cun59w4gv4fgmny6zrq0bo1ssp3gz4k2dzt0hn2qp9mmcwjmf25c43o6wv6h',
                adapterEngineName: 's6zu9qpvrjl4m4geh7aiqlc8v2vssaowenx6pb3wnl3koc4oieaqx4od4kakf5zq6jan3ja3pklbu4egheuq3yxz2jbo9mxfxp11lf6bdirqurgos668gd5b12x608rg5ym18viafbodw3sj7oeg40b1s0a2sxri',
                url: 'gn1e1mbtyg4g6gqtent71mr9cblxjlg6tlo8hfftlb93jvuthc9imu0lnvdeomxz882blqr75lz5uly8opj8yvkbm7n9rfm01putl5v7jjgzb8h9smsofh7xlpo9lzq2gmu21nro8b752kgg89rwmky8ndxp5db7c3m39b9738t207jgtzqgxn1itignbo6dmt0bkl2qftqltulqrzgktkesk9gwds71pp6sc1mruchkpc3edf9wdqduai6ysbixen2njpbtdei20e5lwoeq53xj0cewbw191jc17n6dh72lwc0v7woc8en9czumddr7',
                username: 'n62kndo8x1unjujxz4wrdq3pa2rf8hv6iuk2c5mfj4wo8ovze4u11ssrgmg0',
                remoteHost: 'oq48lq80xsy3eox4f19tsn58hxh30lowr9cq5ejuf2xgjkgzectn6uaq7ho2x6a6vfxdui2rhoyzw1eqo8k8kupf29hlbiwey1qic5pel64fvjh2dltp9b1obxs4ozfmg3n9iuykgq45ag6ib83x3uhgjjpn1lay',
                remotePort: 6320498147,
                directory: '39lrcbhbj15ap43aa9br1ldm0vycv22tbmp106m8gyltg4xdrw5e7k72dklgs33n11nwx3x28wyjcsjufsotmih65ui0mkprkrvf6s8wwa8d1tkh86idgexa9bae0p7qq8z2sf6o97lpl667wsr7pryw45375bja9lo9jdj8k18ikto6uorgn1gyrmw2hk482cmx6778llvf0ddzas6uhhu9umg13mbrb9z1l3zln2kado08x6r0pi1mj24m7mscr1n9sf7ejrcahckrovfqpornbxvg22fvjzb2iyk258u5qxar0crft8lqo99cjh1xrcae2m76a4a945rxahsh7i14br3bl2vg6yc9y3g6ot2yps6cw3on2jikhivnrnrze17ow5gmgf4bbcvfyvmojgpgzyshpn3mn0h5apd2vtu9ho0wlinr8qmwk5sswmqqwqzppjaxuulbnywigw0wod42onkkrhnc5y78xthy1rkhnbgxyvg0obe2kmsufsqktlufx8mqf3vgvm02p1s9fs8wyzdploqtnuk9ghfkwg88x88881q6wvb70crgq75ku81v3gp8dsosabgjluqsp4tmp9nl0ga9n97pjf8sfs0hz19bvvuyz5jvm95muz35hd1ikxu96v3jg8fk6qfewrnluw6nuztpq2z5muwk4ot1f1pjwzmf9x6y7pnhfkzt1w3ml4dusu8z8wm0s8ywa6llul6p6j5jjgim2ppnggafk6w0in4uhom4ekfyeqis3cspla505jbs5gjcsfo2oyugm0749xaa3p1nbc2024sbqrbrttbca9qzpn7kd6qcevumqwfqjqzwudmtkl489xkwqgtn0gp5x7v8x8uxpwlfe2j3epyu2nhgsttxc2psni3lqoh8qjjlb5jj5293p6jxqv7u2oy7votcsivdloi5fz3tx5aty6lqo8avymx7omo3u31rvo4eizhigpot500q32gisty6v3uejps8pgv0vgr8id59iif4jrsciyba',
                fileSchema: 'iu1g813bnea4lvk2n145wjebtrew6iv7g854dms7qflst41m5plkq2jynlb55y3snfowx2mohdpx22xevem9n0f8drp6250x4liijizpo0jgxs1eo7g2gd2u6a22crueu1t9ufn0kvhguz7c2l2tkr7uvnroyt3hi17utduq57y6x5plruww9mk6ofgmj363da7v8dshkvijif7d3imbg1w5b822vqcvmt6qnuz099npk4ayw8qm9a2s7gma9l8yrrvju913pebarpfp06gsufe4lxjbg2m67qm7xzee8mpfr0ralsluk1vobvajxbxtlfd1344g98wh8ew97iazice54tyf8apmcqphklzcy00u3eeu9tulpkn22o3a4en77w57qdybaywngs4b3cnsre7jfxdc00lwhtsf5ft0no1pkvhco0hsmepcfrp7fxki5eiookqyoltnaeyopubd4k9mvfewq52u1cit0yldbaab3ekph87d9losqgts4nq8qjzmoaczs2y69g3pwrq3smz6orm5zoip4b5wr2vu0odniu3ckt8lydu3v9gd1uh8wuee3uaw9xujnc7y5a7l47bb8idozmpvjtz2w4eahz4fcmf2vs50y3m06jgnm2vroq8df4v2yenmjesxh42igkabnd8soah5d4dq1gd9qnampb26v0p6nhz9pj15s4x5q1eh0m3zh6svc7hz8z59noocpekkiqbcfaw7q7psf7lyjicnfnejfcizo8w49ur1exqbgkhvvsj91x103juib0ivfz19dmp2a70wcujg8edce3ght03tna9errcy0m530eh8nat9fhzrlicgcz2v0i82zuejcxj5lq2if99klb0s2d0pmwotzjv0exhlkovn4xgudglg6h3cvqbg805y11ljm9jn2lg71u6qzv5ehez1h42tjw6pno3tkn1h6k1n480vblkpoc5ersddsz6ggv5vip43z9nrz5swhvbb50cl8usvxtxjiapg8jrexp5eb',
                proxyHost: 'q99f3t6o756cae4hsaantnjslxsxzec3rid66yarazfjpvcz8osesgu4ilma',
                proxyPort: 4726964881,
                destination: 'hp7pmsuvkb9njuqe6pwesqjzun6kc4meqvi8hzkafextr0wgm5qbwnkmip3tjs80wpo4pjwrky40hrkxkzllz34uyfoo3868z87bz8rew5km3a4hc2irqn2eaf9fmeok2h0o2jz2a2qghjd379n4a1b92mlsrfcn',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'foz9of8k99rb5g55gikv16d4jmef29w1jleo30mulb5z1gr15crok7y3w286fxjckwoxeiklwxhercnp1k8x4tushg2mcz0hhyfssv1ofjo9h5fnvvgriv44xsxokjq09l5np9wi42k1vruugbhmtz4zttakybr6',
                responsibleUserAccountName: '0bmsmdw796w8448w6ol4',
                lastChangeUserAccount: 'phl3zryjhbzs7kzycyni',
                lastChangedAt: '2020-07-18 16:59:57',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFileSchema is too large, has a maximum length of 1024');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelProxyHost is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: 'kyg6ddq39l5ujig17chas0d8wm331ijoy4k4na0x84kmf1oa3agtcq2h3nq13orc97wi94jz5603fzq5ogwdfr3vv4lc3vnq7r4dllb9uqwqk8jikg4s79v57i94nu27uk85m1lulu9lcexliq3cmn747jez5as0',
                component: '1voolhn88pjf1c0oyir1vsf08wcbo7auz8aomxnxkecn8w54bsyqe56cmzy5ha324xh2c28iw09xl7wub29c13vkibex0w020u4m2v80uy80e7l7m9o5ig3tglpotqadjkpcsjakg6u8nbyzrzpcdvund8t7qyv6',
                name: 'wi1uclib0uqt6rk7tnmrix72v94jyampsvbr9igsh7s1n6hv99yha24ail0ckmxssvxctl038ajuf3qtei9iosbzlyrutr28ivwif4a33ci5euof4ce4ycsrbxhenuk2blqcm0xwaq6wjpbb6t0huqixjyzuzzin',
                flowParty: '5nas4onaghnq8ukyjehh21rwwybbk3apo2xjb26gwv4lmwg5apa0sibwsjhgw4qo6qdpbrgqmk4h99rnexiocx9qtv52yk9c83istuw35s1yiph26noleq1f9kdd4mieybiqebume78nkpya8qltqerezs9qw6rm',
                flowComponent: 'cslmmjmbrj5icjs8koiemexp7j46eww1way09nxfauft1tuixp8xhleu9qeaogd6qy0khqj9zbdou266bilbza1jm6295wg9kc06gt233l5ktbfguni4q7wrm82sp5t9tgymwqda5nlx8vnrt3vhs5fd42a653zi',
                flowInterfaceName: 'ong0ouirqvdjeksn5039ma2fjpjdo3csawxquygw2ncjo9xmwgctjcqojcipetzudcup5iirorwwu2t6rtq116y91enfpykojbgvraog4k7lvmsmkba1ykoefxokf868nnmkml0psqmqk9hwyvuir6shvdiimp3z',
                flowInterfaceNamespace: 'cikksi1350u3mmx06e7lj012kq3e4tc7gekgd1yrd583u4r0zpz7dbph233ut74upycomvko1x1nzu5p6fzyakh5wunenynsoibdbfvtip394etbsvxbn8vd2w8s6suzixm6mk3my5qu4zmc1839ypjcmupqmzo6',
                adapterType: 'a7ox4ciey9pxujvgpgmsdjv6vc7e7nvi6aihoh9n2v0urz335uhl0eaa6ykq',
                direction: 'RECEIVER',
                transportProtocol: 'qgr12d6bnh3c7tbpreraktknh1t6g765gqn17japg74yhtkwzy366f7ps35l',
                messageProtocol: '73xugejbivtxen71gmqa3gg1x6kibremz937kvytk4bnf5bou2l1wkfmi8qk',
                adapterEngineName: 'drzx4nhhmq4q2p0etr803f07bnzawhpzdex78f69pnmy0mkoqj40w1fsnrpfybiljp88fpow39xacqu89agzvvc05xu0owjvbe0abcm1qpwuwti5pwqgwjwfkifvknl1a0wp7uoxwv0v0g2x8snfy2xv84hbglep',
                url: 'srffok3cgdx41flnv4ube8x5gw8pfm295lsgfbrqi459jekr2jiuz9tvke4rgwu78942mtt9kshqyoz1egzclqhy4l8q8i5x330ft9u9tr0h0oktqd0mpzbd4op0da9jwfzy8eor6fiyygu02oqibr0ia3hv57jq76kjnqt7xw3yuwbpcsmnlramerystsck8326ci5txmd3rd5gl1ydw3dvzb6afqg5e9m4vnylvl9fp7py2p7aiuanel8rswp7ce5o3apgte246iqhg0eeznseyxuehst9wbnxhatdqmsliooqouvjwz5y7w0pv05b',
                username: 'a149l501u8b29hlll2iu13wg0d3xfbto5j4ksdpglzy33c7p66k61doiffdg',
                remoteHost: '59snvkp1tqawz3ncjshlnz6dp9zpsgkvcyd7chu1i3grodj77kxgay8p6jkjxi9a6qkiaby11i7mkb2v7g3qjkhwqy4yp0255r902wikw2chf8fu66z16nnmks2lyvy6g9cutjcxvlfrfq27pugmx1owvjn6ho0k',
                remotePort: 7861879955,
                directory: '5bwd44t8qzvmc4kiiay7mwv0vit0ygfwqaw2tj814j31nkmgbtxd1nsyvw81ocnqkg1m5y4jmkrk3jgqj9lpf1k5i2iv0ssery0m3ajblef45puqs9tzzmeuykflp4n5uxnsgncsxg6eo8l01qk53emvnkjdy4oa7cnzpw3ybd5v772kl63uhqybrmdoz40ojn69w8q6wqbti033lt9zt22y14oa1q1cvl5ahpfn9fil828sewv8dn6hoc4llx20xb00oatqw2nr08igiowdab7em128hyiraulmwap603598vyfrkpupkxolq7fry1bihozi3gstp58uwbb4izwf3ezkjbmqrgl9ck4ifwcc75ntz76dk768fdovkbe8dco1p9w0vks4hveguwmqxjqr8t9k5ka2j2jhb4ufh9r0y75anp0rfek5i3hfiz22k4ijyvpzkvrbb5d73c9347ny65o00twutbhe18euknvcdfa1l1tyga8q56qrhoe8x2m981oct3f31n3uofpbht7hvrrzc76injv75k3ss6e6ytddedtavdwmkaq4pca8bwixxfhrxrgl8azirdvzvtaxk1uq0how59qbchql3b7olscby5av97vuqab5en8lwk3u4on6d8dmjscz01zd7b1nv2frprehlb603lcf07h2c2i2os0uyrwr3rh0xt4zgagj7ywne0w6gwwru819lp3dy353dw3zj8sjjj1tppenhpqw2q0k6chejls44l9ebghjjk4kx2yi598lzl10emehah2w1z8he0pm3xlwyln5gq20928xxdy4gmmqgs139r5shvbtz168wbq5qz52eu9q6j6ri36a8hc48diipkot28wwcrkefw0zs3666hj5u2lrfzmt1w2xss02gxzd2fzw62qx1983sj35i5kw798s98zshgzm3ui2l2wu552832chrpyhewg7hwxq6isjh4yhm7xpcci9wvej9ae6ucicap2umh5rce3116inzl4kpli',
                fileSchema: 'm5nysb2nyoos7zaqzeegvl63406gd8dvv6rx7j3pwhtwa98sgckvs2z55h7jrxzzcsgnvcwkpedrdpoi1dpdgafwn7b6k9um6lrm4glwcknnj6ti3ha55wnarre9t60uptbtf2z1hklu7bqleuiikl13b4m9whi2p8bytelue3sqshf0wsgpd31s3mo6tl02h5brlekr4yus3vjyxk1cm3limaclmmej2rkfufdpr7ndvntxcurbk0x7dmidkig5w661zfna6fo4mwzuniqb2069gonjkc1rckhla3iqzpuzebia4k4wgggiqkumhe9cc0id2rv4yyp03vmkbc7g1w8bcfhsnmjipudvgrmoe9l4sxdp9fq0u9j3330fg2rr22tyr0lel5o2a0ddewcmn34fhzu2ij61qv0z2kj2712emea2ddqojajytbcebo14ehk1qfp5bzulg8rfkpwjs70wp46od27dzkmmddo90rsc2vwan22w3ncba0hyuoo81txf7r0rp62u7ebflc8mpih7ujig1t4x2j48yyx0ma0lbrzuj8dxti2xgti7l4a4w05msch0l49sa3hyc0tbmomerkpc7r95mcnmd025b4jhlrbxvcpt5gydwfkh4g1xrpj58t7yz7gkl78hhmuznpjm12hd203svxlrm996n8huc0fxj7r75c0e7jo31n611nh4c0ibc75zftv52nh26q2wpo0ldguj8ae6dqucqn6s46xp6uw6sb8csh8wwrh630zt56a4w9vujev8dwicajz6kth2tcpcyerhbslpszolgc63zb95qhppdcj28f3b72ba0f6gn2hjegsyclwvhzgmkghvkv7ceccey5y5j9lcfzjfo97jo8ydf556buq9cvt7z9wahiq2qnukxxqymq1ld1x6ip6p70sgfi0h39tg5g0goszzij5ls303yngry4gcexi4djbutow7qcoezbc63ytlpn8zu1d0b0cuk79d1jh9ffwlfu5fjifrfzf1',
                proxyHost: 'gj00ii3cszs61ni7sdpzarhbzwkiq0uz4e1nfxcwho12ly55w8t6902ieg1l8',
                proxyPort: 9387171635,
                destination: 'pzh1kz0qt2t9o6xpgbmu79plwcf54pbo0tcaneg3khx0qhhs0on7fhnpv8oloim0tbptc7uf9d3h5m0e8bs76sdw8g94ldddqkeauvljm724jxnofm6qc3q0c3k6kxz9deubuw626xvwzsqvssxjxclxoio67nlb',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '7cgip8czp8vd70enksf9m7ixlv26myci7tezemz0jtkqtbflog9elj5eqomxqm6axmtamrcor4fzgh8yzl6ea2w3pa8m2f6a074l5qerzxfv5q2fd5z6cl6aak5yqtiw9rb7le9dfwsdmrdjnjnnldq7l81mdbdp',
                responsibleUserAccountName: 'xlrhrruyrcaz8jqb5ns9',
                lastChangeUserAccount: 'q8qytj7zbsfhfgoph0bp',
                lastChangedAt: '2020-07-18 17:51:50',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelProxyHost is too large, has a maximum length of 60');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelProxyPort is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: 'z7vq9lfr5k01i6w20jwsopy9cxxv3h1acn1kxvlwkrqwcwrnqps1ryaz72vy70m7956ihu1ld9jw9cn8j3hfvckd2qq8u0a3tpbpew24npwxl2p0ynm9kbvfe03ygtyss5lazb1fmwq3o5nwkql6wkwh3fa6lamp',
                component: 'ozlj5ogz6dxkxutj8ffz55ylvmgvcrw8funhoek5di516sui52gyzpxo0h3ckfmphzwwu0l7gzr8igtowx4n3nkuquoqnio9xqm7jjmb6bzyj1d9112rbh899p11xb8n316aydel4gcvwlsi7uyawgxhcse5pghc',
                name: 'grz4zf87unnw5vq1ustulqgf546n1zjxganlkm1tkr7t3c65v0ug7rde3krxf4bcad6ul2gxdcktij3sq7jijmav4f8zr2f2lc0ijp981i59gdfucnypzzofqtpcre8r6zupv4zupjd36gz6ok04psb769ggqh58',
                flowParty: 'x2ilonbkekzfplyj7q5a0muyclapqpnto9ccq937psea1899pxzb4ozyg5mjix78ybaqmuaon48c531a4yg4ii9jxj6owxmuhrfycv4mzblpgfbg3xd697tlo8peklmr696nbgooqrjci4awzjmjo8s873m50whc',
                flowComponent: 'ao44ur5vssm251kldffc6d288xr43vlq1iwv9cwks38xl6ggh1vw4e7xwztljx681wqpuoclurv26bea03w746kr9oe828vmrg0cmobiyj6t897iyvsv1nv31bahcgdf71dbtzs1rxeyaqka89j81wbtp3xvn09f',
                flowInterfaceName: 'i0jash9bbx3e9qa8r3iry9aq1v7xrduw5sgr0ql4lmonu1ud31j02ocya0usmkcfvtnhkzrbwbpsnvt1xxq1dsumcmbl5lan4k0fisia44g2px8vtq8jp5ne8w7rghv2p5yoqydsvriiy7n2jqvjlw2toozxnewe',
                flowInterfaceNamespace: 'h7insjowt1oajxn72b0zalvxf2pjrcsbdsq0jcjhr5oqommgvqjbg1fvzapugu0yqzp7qj3yb9cbm8368p67ymdn9a5ekw0i3p0pj5agpprvpxeso2l44xrnh2pi9v4rudeq4xl8jvffheh1xjbx14e9dfarioou',
                adapterType: 'qqjezewp2brip5nm9gow2avjitkq7zcm7jckgjl4cdzrbaow70qma4r0aokz',
                direction: 'RECEIVER',
                transportProtocol: 'ecc6k3n8ikrhf7ut5i6264mbjp2pnr0zwda2l49jm59yaw5uzvmbhdt3y2yj',
                messageProtocol: 'jfn1vb77f00bmh5to1x4okbgab26i1iqyqkekefey9gsh5uctxhn6pltvn9i',
                adapterEngineName: 'tpdoy3jldl2b79o6rwjn18w5kwepi7yt3aggw7xyb1shfuy6ke1zwlkz5tqn8jmy17jukym21p3eeiz0nbyj3bt5btf7mw7nvck1g5v58gj32nsurzrzcwqmako5zdx857h2prmiicsd2kp64uvw1v0znf0ja9pr',
                url: 'et8696nj3tqtz60oesruvc97ogjpncrfswgrir0a3b1f2q59j2vdsjdb1cobgfp1dhqyuz07g8n24pybydxxmhk3fj8cytf6atlzxzgcqtfz76hebp4z6z5b0j4c9f8c8un5f8dyn852aqyee129s73hupg5tib9d64tf2qxuu3lz6eejyx19afv4yzkvmuvwfs1000vlzakmq7izeq2t1g83h3alkd62mi72ojcxgi1sgc5mksvzttr20su31886wkqop4ey1swsl3gfa76mbn3b9xdy74fa2d8wnawsij2ma7x58b6rx1wep5oyp8h',
                username: 'drm7zjqvoooa4k74dmnlwgy1re7049cje0fxid2g93pyvogebgzpftr3w2t0',
                remoteHost: 'xji0uziz9dnbew9d92w26qwii48x200bi5b1rvp6zieqqii19lpvyu89hfnxm0dnlvmhbwusi8u2qejj6ziaug7ynaw8dbk0k3zigvq49ki5tz2uj3z1116i8brfg1kedj7jjx3t5dy2czw1jm3ni0gd5iljm5o7',
                remotePort: 7257601727,
                directory: 'dmnr340ufq5d7p7mda4g6wv6ldeadafes4u05c0d9m967vrei7bap8ivh8zok6j3rjbarpkb3h9rxknbsvdnayn045jqlwip9mdo0snshr0brr5x1wu07il1ko6xjatz3lsogusonhr33zxkqo4ti85xhiodquum76spaonhmaatzr2z5rqlux0ji236htrn57dpgbxss1650g5gp15anopycsxxuvckg592qeu8ohfnta2ql3t9dkt0dz4so121v3pibqdt4vyiyk2dnu2o1w4zizsubzys46c4p226wp60d30jqqcpleaoorm5xmj8seys3cbfkauntqll4p48w5ydma35by9suu688zmxh938b53yuf3jn2r51575xtu0ma74vsz3z0swx34lkhzji8b89uphwueqwyshpl3r7lfgp7th4282fzy07trwhysat2kxgbo1vn04cyoslixcf4ixvvmgxcy5ssbl8rpfyn4wjw591juuyvkglw0b0sm08hqu3lqpvvm1nubgh7vyzggzj6823t7vhctaa5nhfs7kxi5l6d9j67zzmpbrf8b8y80cmq6zj7ihe2nlqdrr6v80ldbwclyg7ismz3i7owg97q9d3iqar3yjybktu7jglwbghmkuaac943shkh10ibi7oqe3xzgttqbu9839cij822pfrjvvhxixewi4dmi17gggqi8gidrlumxp13n50qdaut6vrysw8cqqxpsv7purdojb61ugavosd0uce2npifh19pven3nx81sli7g54evyw4e5sahrssro4kco5teseqwxl106ja8xqth6jkl3k30fxk3rfzelxz5adh1kxokj25oackauqooybl7brlxh96zix4rdfisjfzsykhh8rn2v7ay72ysybktdywses45vxv1ijo1oek8crbdf9uvdz48gfpbj1uojeh2ihl40kfx559l6w30yge5qrsdvtrrey2e4x1htxdghg7igwwf82mgf4njcbud7ryr9tw5y',
                fileSchema: 'r663p13ej12uq5qjpfwlf6qzfsyfijk9c4mep5n5183l2mq4ehuhy8r4w5x3su0ai0bou9lclr00x6js4jigclsjt0607zaufskfqiukn5lm8y508aj2m3onp8meqkohpeb5p141yfa42kszjobgruoll6nt11ht2eejjgucmgqjnxdspeb0vza6la7z3n0nj78y6j0nrmd7dyvapeeuaaouw5usx3aa7kj918bi86ta25eontka8imk2o8qodqkam3h374woi0qv4s6e9t23zeot95dhcvw97lr333y3jnc09xy8bnjap556wpbn55d8a7m6fbyl5ujlzbqdcqnhiqmzrbfw32hchoktz4jlkf0ap1sqs8pyk1632a2zxmw6wtv49hgo7k17dtqqyzksgolvdxbnqkcohvndl5nec12461vaedrfcdtg4p3vj4oooznyh4cyqc8fossrjwye4j8rkutzh3avvr53zstx5evntlbz3w9sxbrz3rsarukg8cnivmvd2r8qejhltnlwy0c03tzwqt8ilcxz5jj95cuo3psxagnisf1acujqbhd6lhc800par6a0ijgbkfmx18du9wtk8af2ct5gh1agi4bwrt7jmn9g9b2nibqyuf4vyk62c3ta2o1aq5c20pk8iheichmi23qo5wr7sq5kxkike88q8686hgnx01ohk33kmkyulv0c2zqurt3n5s937lpc6xsf5i5dsz1kww082njnvaz2luhbc67r129v4p5w7oj451w0fk7j1ju7vexldws13gga5pl2er37m5o7ieo2m4rt9457g7iexrwyr72079dprk02lam7dn5svy3cdzrdqhqss23q0sbdpqftwb4m9e30c3jafk9nwj2omreu4v706eccjqqdr1b9a3tzoviu0aanqsdkhvjhy8c8ply18pyjn1ahptkgewtidk2ni4os4m8fsmxbtnhy5y4lh7euz63w3d44ixc25y5yh8lk75ttmypgtj5p9hzzvsz',
                proxyHost: 'je5dwpu5o9lm2ex0xlfnw81a1ikkwptl9b5ynov8z8v3aalh1xpr5ppqprk7',
                proxyPort: 27402391651,
                destination: '2h8p1xc94dkxun7fmdroqt4jhktc01q1o0qafj8dpvsnr6b5j98dl8yj2rehyb0o9eyv35ry60ya9x8z3cte0y0d52zcr5d0kgdymfh3g6454aayaw3mtef7wecmisi5uxrdmj3pqb5xpgcp5pkbowr633aotf67',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'aymxx415zaqoujnzm0aasydgxdx98aevxz93q1728zuv3ovsdkkw1yq8rob607h1vyfhgo3vcwrq46lf669lr1yjshbs681sf0702g58emwfbrp1rfs38twob1j7g9doaticv9k7otfwo39pwl24cjwfmu0f84kk',
                responsibleUserAccountName: 'gl97sjwd2s9fh1h3vm38',
                lastChangeUserAccount: 'uxtdlgxkdnhw3ic0zvev',
                lastChangedAt: '2020-07-18 13:39:25',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelProxyPort is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDestination is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: 'frw6rfmoyidodw59x9htk75y9yc746akdcz1fldrrr0fvx92j1wfoaejbfw95a96ccelehumvpfrta2232v3dv91iljgdcv60cdgjcm77ei0jbiajfbkr4mdijom1o6i7jy2wdbzh8rw4wkqr4f4zckqii42tgjc',
                component: '8a56fc8gqywmlzh78b1uza0msv7qzqkbkczt7hfo5y795tey8g8gi4cazex343cgdlz3sk2b2ew5a25qmzfnydglyuc2xd55pubwrjk8af4dtxxc71uw9jm7oomh8m2vxmtt1afaxhf5utltu1ldtm5g1r6bxys3',
                name: 'ejlfuc2gmgbm4i5ti7xy9jk7rjnphoeobb24puvl7dcsy2jjaq2x8gczy4h8ria9wl5kuia5hkmbaiphz8i33a9x4eygmolloxs0c54iihlpub0xuauwcnzevzkrkfqqav71gf5tv4bdvw851ltn8pbbhpjr4jny',
                flowParty: '7a93xyamazkns5ukjp7cemj18gpw50vw7rplgpyrpshejnt5lb8k4nlvgjtuvkfj0x1djhum26woo97x54o5ls91g3ojr7c7fjhdvid7wk9a25kzwx07odha5ti6u2iz6cnnmtwl7dpy6c0gs15uvsxj59f8hp5c',
                flowComponent: 'k66ni5ngkmrnh2x04gm1wmcbyr3dip54jw6zh23a4t128b5evw9xmu3hjshpnofgsgwfkhfubnyjf6xnltgj8wtzsbmq7ofpapstkyw0pfiuws6khwgbyk32mt1uu8hygb3na73tiwrduqr4gfsc80hdvqhlq9l8',
                flowInterfaceName: '6goz80bprmik50oa6zy2br2rmvalx4zc1n0ap16a5adwfrpvh245yp4d141jw8xg6ux40rcpxdc6c3qj1zb6hxl9hs6wv3zj6kxpb3ups5tz2xpob3nl9xcwkq27zn6p4vcsrfaf3dbn4oqs3oqiu0w6xnzndniu',
                flowInterfaceNamespace: 'ejamsczhzf77jwl61e04vefriygfbtl09a7hw62t2nn4b6pfa0hsvcy727ojxoqlhufgpqlkn1af6hg8ysxeovj3jng7rue4we5hyyzvx9vr1ikhu3azxzrev3ws4ztn6ndu53ra7t87xrhda0qcmqiyjn2nb8u1',
                adapterType: 'qj3blzjf0kocxf17kbn4kq8p8uyqjetju4qiwa06o7csok55hoy8gyi02dh6',
                direction: 'RECEIVER',
                transportProtocol: 'rwfgtair5yeea5m0npabb0rzy0vigrcy7rv5tnc6ypg304nijpjqc1g3qlhg',
                messageProtocol: 'b77bk3oqzxnphglkbgfok7zedtm9bj0bv16lcgrna60o3901k72vtb9rqhuk',
                adapterEngineName: '42xnhvb1fcdw560iz94bvo8narh37n7vlwyx12vu9wx3odv9vfz3usvkop8f1gxsgml6al3jghsb53c42aat2ar19bjuiabk6zpgpd6vmc0jz2d3h59equb10o4xhqmnk2etzym9kjdn15lkeagkvfvntjsag8mj',
                url: 'jctstnkxzsfp5r6d8i2uw1mff68dwg7r90mp0nbg5knb16gkhi1dtazrjekoxdc5il1qvz052efg4ksa075o00p9ogckpvwn8en2nzjtra2le7f70zlwu47kpmy6jp8z1x78tzawg8mwcki8c3nnj2mzm0j3e1yjdzxux1tw1sca04tqqmhqplgqqkkvticie6wbukwzdkrrjd3yl4ddohazqdygzuwh4wnodarfqnuav72dxxf66iaqk38wqjxj5npgom95tau5nmsp1qtp6i35n086jhwsgdy288rrwccmrgczzfk8hguqe70yaf06',
                username: 'prvjjw54t3vpwc3fz6mljumujtgyydr6e0vz4fzvesemrxqxmnyhlf2j6ot3',
                remoteHost: '2oxv86y3huup2ihk5b6mx5p4o7qvu52vbtc3zdps7xhiwftu1qhhm0jh2g4ibqypp58pwpbuqo2rrgedomg08c9mgzu97ws9pynh17ix0vh39sjkqwoh6e7a5vdh5xalfg2kflm8yy8cig4txu5721iafc2nz6h8',
                remotePort: 7204323941,
                directory: 'xf8cpvxgdy2vpqwhtwnso98azbj35k29xgvp3z8ibqwrq2r0iohcwzotvrxuz7c28xs8fhya9j9lp2f91l0j8cby1wht73x6i1aw3gdp3b0n6cfr0c1vu5n283fxqw17kl50gr9kif7o1zjzeh3tr0enbn9cfwduccjpt9j6iake5k489l8x8pj63txie5agx3i0mwk6lkfv97bzac516h0hkhcwgtaga20k9tglsktdfv2uuspcr89c385wik0n3ke22toewuxbpu6od9vnpzxzr6xu248bo3g6pd9bbst7rb40tnejqhulltozxau308qn0giqjebc6vk8f7bvue1nvia3yoqz070aejtq85srqjeaihs293ematzvrc8u1vqmycmiok1ifkhd9yok8qldjjtw9sv8q1ju4d6i1xhiok75794b6z0k35tyw90zkksvboazhjyd7avoqwu4szgwxtxy2kkvl108hwrele4wo896l4fiz9yqaeyvo4nn47cx95zfkgycm2cp4xwqn8zkjvoz4x0hde9wd7e6tw564b28051ls77hhxcutbpmo7vovmel76i8orw759wblaxmim851cdhfk7py713yhg2zkdvklouf4bsfnxxbj8hhdqz4a9u2fhw3svo48f9xshtykx8vc1x7bw8hhv73a4riaiwjvdlp3gxk3p2su69kulc7yal3wlvj2tfsjc0b9upxc3pe5dt845chgp0wdma0eozf1kd5f57p1myvt7thitq1ly3dofiflsaakds17bvqiair7ft3wrf1bko7jsouivvsa137mq26izc3m4n4nggkafhvbu6a1ifsrjukniux9wriarbppekzfy04azosse15ui0q2tpmv87ynqdllp5v3n8w71dmjxip67gctddp63ib543b19ssvmevk6lqg8cd3mzapkhe1rqjrd55j5b49ef9n00ohld33flz7vy9wfgb4uvdyeye59uam75cxawx1do4d93pa7lhg8f',
                fileSchema: 'zzrumwl19sxbqlvcn2rx6kfy77do1hv0zombns54n3m6z0s7c2jx7cil4k83qdtj5y4rddv2959spvyd622auf17566b3x4vf8dmwde6asb5t7u5odljcug3hprzyg17h16yvx5ngcgfmmopm23rrxeyy99ltj762drl5sxnx9dkpx1q4axt79m7gva28wmmsefna1q32l85b9bvv01zqcbvmxy7yq7z8e2is56a9mznt8z6tzzfx41g6dn79k7xk09a4chmlq1gd47m2jm5oxgrp3gt041hdkau5gk337vil8w3nadmknnaav2vp8ud3j21avzbltonaaoz90xc0s6gw5xhomdhzef908qhggcuz4h9j1vfitu4d9feymhk0erzhzsnk885qwgtx2r617wqkjjqzczaimnqg4eom25vq579keijg0ai265hpnw6w3bqb875ny09jyc1ripmsy9zvybsynt56zzfq4apk9agzmthq9scl8a3r295f7kal21pw3av6c0u8pm2zxkunw71v4bvtmta7tdxx76e261qxi3nlovd877jx7deu02gilr12nxz9vp85ta34jutjqqackukjc9jr228i0nvwltf8rrvs47vu14kyd9mrxpblesbu3rjvetn4v6uggun1uflqfrxk7vg9b1jyuua7yi4y3pxkbq6vrwr7x7w7qg84u0vylae7cviogcrvzap9oufdey4jt25h49zyhkfkp63qdrb7126bm0grrjyssngoqmwu46dbztvx3u71wwy3wagdzgcqi13b4cjm3pcomhupsozp9e04u2y7v1o6yjt4c8gex3odtz8jnlyq9h7hor54lxvubwywo5z9nlvzdwj0dtdsg1srremec0o7e04ue9un0tdjhukpxltoo46l91on2cijr22nwvqipckb1r8yh0xo5hlyq7wepjphch5fty4d4yi1d1alg4nm6fi9g6bvn47lwiq3lzq5c5hsmtl3dl6ou31m4vllwd07t9s',
                proxyHost: 'b1dpfj9zkpn1dxhmjboim5ib7651rbc27kfasmq6z610f8i56dg1q3wmrc1t',
                proxyPort: 1935109109,
                destination: 'magsu1119p06fuhetjnfj1f8eb09kcuoliobr80o477dxvbrpj4iukb035afwa1wsv7v90mxyv28ktlr0w3n6gl40nbyjiby8p2b850xiapagjkhuliv2vqnxybjbzm4ezh9hbsgbvmvdiyzk8fn63ssztco5fdjt',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'kefr1rpebdyf17ambom442hdvevcvv5nj1nmf5l1lgkra4son88dmac2deo1377et2fvuoefg3fa98p21zjb9gec2ccqc1wx3clr5bkwwishorhmlghrsq5klh5bw75g1juqlzqwj4y4z2lk4u4drtljnpvhszdl',
                responsibleUserAccountName: 'g07equ69go1d7t6u841c',
                lastChangeUserAccount: 'cyzo3go3pnp1iadxqi33',
                lastChangedAt: '2020-07-18 10:49:07',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDestination is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSoftwareComponentName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: '5wxw7uogzjo1334u8gg7ud5gc04otx60sb9buzx2c7j87ignksr1hro8u4om9jli0bd33rvoakwvuu690zj16ej1t6mskj4gdbol89tfwc5y4ptn0yizuoeq0frd92m1qmnthiz2zfktznqjq7mq5w1lqyi5zvu2',
                component: '16ix5ec964iaym33ltp0y5alq31vz89qlangzerfb0baqa1gce4849zudtr4nk3xv9gr23ehkdp9hec8x9didbmywc07ezfqgm1hx300fhqhuzrtzn0vc57mrz8v6fymen6lfop0dn55kqpnons2rehvzasq2bm4',
                name: 'aqzp0nn29shiu6zn4oevechllytvgejmgeufik9xp0bgtbujg1bxkrtn928njvsunc1dq71t484rx65nu7zlgy7puq3xjh8bv8142svq5tcd9lago4efwkwfbb705udwyje2q52cpkxxwmf9ly628ps0271xxkox',
                flowParty: 'inu3umem60r5mrtryekmrr4pbkjxf7phbswzklu0sc18wczvx0dfnba04grxihe48osrxz9n3vu9vypjbn8ljaxv3nfloa1vi7gqoyyrmnjswvm0i8vrcl20kpcsvetgyxos7undfawqbxxzbm88jmoiuiflf7q1',
                flowComponent: 'jxkou7lfnb8gnceqt022itla4ql4m6isemo2qmrqmxvg2bdxti9e0gzk840bv5al56mr3jf7sentdlv1ad14ldvz5z4fmmnnjoxodspn55jb3zp2fl0w5pheicto7zq6y9ftruclw1v7zk0wc2u5cte88jxhn0s2',
                flowInterfaceName: 'gk9r3nx5s9h7sey3o63i31qm2kukvyy8fcg47x7wof4tyeltvz34zovnq4rcl3awxdjfwgb3lrm327eng1jh74nbkbuf0knt65l4xl7gnx6xlh7ek3hv7nob8dd14mi5sodubouqqgcouduukghta3pkbpyfumg8',
                flowInterfaceNamespace: '0oebce8m4jxii3dp3cj2ikj4w7t7bbe5kr9scgqzrs3c4eeqnh0zuv2zxw2l5w8z6p7nggadf96n5sdouvmz41x3qey4npsw9nphwfnq5huu2wpzzpljoceb841l248zu9zgy6xubgonp2hv7s1tmojpjy5dwwtn',
                adapterType: 'i6fsc3srkawc6wwwnwg39qow5crxbgoctvi0bbe96eo5v59l2vzu01jrk2cc',
                direction: 'RECEIVER',
                transportProtocol: '7pkjzvias6y1gbtxqdxwbs167wgtglt7abxnzruchsd3g81ekivnnkve429r',
                messageProtocol: 'z86h2oxuxti7uft3jmvgi9gnq03imfcpj6ugjae83nhv41vylq69onaxtdm9',
                adapterEngineName: '9etk6dmrxsd0ot9v3z8545yudarg3hosftwlv78hhq7ltnptgtjfcop1kasckqhw64is5723k1q0e6nutqocqkpeh2jo1jqnozcdur6bpsmfkq4pajyf5xnuyd7iecz6cfl9dhvkqof67pxhx6tejs8m9gg7jo25',
                url: 'hlda6lgfonicnlenssyo2u70ttqcj87qr1o56u4v3xvup5ns6yu7uikwj2t0h5yhmol1xrbze0xzafv8n25ixw084qj99kpiteay9vihp9awuvda89s0pzkimbkzp1zwxprthdwg54guz3l4s44q6o6t4p3citeurf6c0aiefv3b4ek2g55hm2pu6au8sg7bez8lo4578x2rza7np9se8xswqmdm64jc2eteh9af5nar8elixatpxfr4lmzmju1j04m2jfmxd5pg5q0wxadde3jmpozdzi04zdw5urp7lt0ptxyqby01joxyd26xbfso',
                username: 'qouwgkrf4bjzjt55pxmwd4j3sqohzqu0lygm6m2tyo3jedgmzev1z5tpubb9',
                remoteHost: 'm1r2g9g675pvhsasgm07msbfsg1ggs70j97zrv132yh085ue9s50bsy768fs08fegxgj89gf7cdb6l6ji6nz8noscyvgeeg614y9g1m6kijl6mlp3ivhiswm1fqa40sdrsxliea4p3r6vgyklsi73tfc7mgai5co',
                remotePort: 6414169320,
                directory: 'ag3nw7f6ey3dtye6b2j8ic1hubhqrdy582gytpna12obq76g19j9phkjh710plwsmqac0iaq18oynz3v52ut38qi8tp69tqjux0m4lmb6gmpz8n4b9et2jiuucpbpfastjnbjgildz4lvjcpaa8xuah7s5v1hkcl675e6jvqkfn7b43u4mu74l6bc62psdft9jsuebg9eedp9ehajt1urzdx2d3lsv7354emln1m6z4ihorqql0sbiwsl34otaypod51pb3do1384cnzwb13rb724ugu4v36e4xqx2zetyxlgi0z4qwjf3snobx3rvpyasvijpabk7mjk3fci0694s8nu6omb8r5hbcr8hcsvs79j0uelkqqz1wzqrq9xf7vy6wayztvn23gwwk6ce96zmdcx7idjmf0cjyyponakw1a20vhar18pt82pbsbynfcoscnusvdh5vuzgjcd1xmmkk41xr9sgoceckkhfh9lj4isa32uvwuev4h1wrpeshxf6wbnk1zk34po2o764yfux6u9qg1j1ttvogt0495m4je9yp0b1r42za1szb0y57k8wm5zjh5ojtq9kyxd6wz6qx4n49wvrtbcxb42ps87b11jafw32ge84y3inwd9jyui2c87v4y438qjd4lpwq6ltj3k9o2qvz0fh8petiz4gzma6alb9mwl5vbdx03pg7s9mk4nexq30dnm27o9ozuzlce3j4i7fhdmac5ir294cyjf787t462n8sxkinry8gw31vssd5hdfg5egmsul201pfgrh3htca6y16yulemc95rc4cu9ou51qgs7fc6ujwde8m9qlnp5vorwwlij1aiw8kepmihijp0h0aw4rdiw1wlozleez5037gbwjv9rrf241gdbwdjz2oefng1455i5vr0wux64euezd4ysq17j8vf3pjn6afluf3558591e7tbugxg132nhhbb94hvzyzdu973i3j3lm1qpc765owjvpbgk7f1j4vf868zbcu64y1',
                fileSchema: 'ch7adv9lq1r948k1a0dvejpc0qndnea7grj19usp2ocuxqec7xcqh1sydigwwvt1ds1uey529jfe5ekpsxksfahcoy6x6p11un1x6mjuyzomzwecvtsx13ds86sa7oz5cmytht0yy4u42o1g3tyvbxmdjxj00ry5c9k2kawevvz3ymk6xv050l7li0qvqcze5s2yuyvqasnktcee5x20gawbbe6gv3j5mpzqxfswukgepd9rjzxgswq3iw0wrgn61ab3107w49dla5zegf6efh325epm8gtw2k9czm07zydy0nonpgpqzm85yqccjk36gmu75606fry7iock6jw0o6ij2evfauehvign8658mbcvrnfte5ivncwmv2qk893tlc1mxktw0vm41sm880fbj6wf9vwqrp0ey923bnsnmfeoql12wmu2syhm49rmummodcatyzvqarb3dfnahnf248dmzb5gy1e04lwvie9859zyjqb2e7ljhk2jnxcmzj72n7hf61kufswdw0rkkdy3dbbmg8wn8j2on2g3dsis9rftip93p5enm5un2tyozu0bd21xczvswsq5v476slnchbuwwtagpp6mf9z0kkayk9vjmnsz1l3l2s8i4jl5mtqznrfrh41v7sksulcujrgmg36k7fg58pyxcdwbe0ky0nxog87u1c1qs3c7vpolr167d90rpjwjd8120qpt6qn58rfw1cpc1jdvi3kdwqgf0f57bv4gtzqxyp370xz60oz85zsngzc10cnb5w6w9uvr7m4g1jpdeagnv3tbwh5tj6626m16fgtio9ka1db0d90bnv2f2ba5xzb8mdf12p8x7qy6ngxt5hpewttcdh3k8rv30qnsl7gt6jvddqj6zmu94nhzhfpcjedk576q5pxbpnwbdtfq9dg57dg8f6h5z1k3gy3alz7uzgd499l981o3uz14xiximx3aavz3jkyeheucc2gs28g3c6mzr5d5qb6figfkwvdy2enxlagyk1a1',
                proxyHost: 'arxqvpaghz1rxsjpr9lisvsrp4f82tzt0v6exmc6kbcxi3kqqb41859jve85',
                proxyPort: 8153017712,
                destination: 'l8u11b4wp8fs9av328k5wt09r0f9ivczjvyceg4s3gbm0218oqlfds1xfbv0yflesns9rxgiiuiqcqjtxyllatz5x89x2x0qt2k6i7ltxw4rxyljchaa73zbma6xmhboxht13m1wgeq1s8gjin6zzu5bgy2ch237',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'mzela0fql6pa2drd7ipo5r6w3zdymz0tlh8mbbpx1q7wx3uv121rslt33n8peqv9pfbyp3ccog78jy44zvwkc71hu8at99xurdhbt2eya67qgjwp943gtz15la7tgurns19hblejl2byo96w4zf8sgihvrz32bm8k',
                responsibleUserAccountName: '5s49q618bylvf41wg0tl',
                lastChangeUserAccount: 'vxbxcfu3nbmx9ctmco2l',
                lastChangedAt: '2020-07-17 21:59:51',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSoftwareComponentName is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelResponsibleUserAccountName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: '6stx2rh57skqlmyjz26h9j86kbfm5z5zznxzrsqoxyfb1uytn8zyffjc8aqot21kdlvayvt7zscwm9hrt1nbgvpbqoy6eyxsb1a3k99y00087r0oz9gi2lu8u8alk55rhq37yfuf6uxzh6o6sivw9ixsz9js7xyt',
                component: 'sgd3hogslzm1ui7nc3vr4by47cm6oaemiz3tekv7wdluqu0ha1n9acx9jm3m4t5roz2hcb52b5g69qckbneq7l1u1zl6f3mwlvuscj0fugv00gxmh0if0qjiqet5wfwrxxs1qmm6s8i4e4abbr1rbztni9jp1zu7',
                name: 'kymuti4714sqowhvjrjj7yave2de4p3nl23rpuozd339kiho1pnjolq0x3hy0cl41xd6qjo8pjs32jb7lyh3h7ekh381bskyaczjt0z4l1ko89wl7mpdg58xukg0wy5he1nylk87sy61ayaoxjh57u34s9ofik4e',
                flowParty: 'y5ozok3xq4w49nnvrt5jwb6g1mlhlucs8iie3ottoxtbwjbptqh8m0uvvu0ywzz7rrnnoi38np9lip67adma7vmksl4x8pmgpkyq4bt14m7095gmn0hlhgiyiubq9gbx8h4jlx2wcv0mq0lkp6cln3kr1bdwc23o',
                flowComponent: 'mgke0tsjixtyztl07j6gr80y1nahyt1682y913h7v5b5bcwwi0jngijngzc4nz7orjkmpqc8zyo89uao1c5xebt03pa1vaahdzgn2uu6tot5lyv97h8gqpvrqhwnigtn5n1mq1h35mh75spaulleqx5efzgtbw3p',
                flowInterfaceName: 'hmi0de3owhfwn89k3fr13zp51f20qebownrb0gf0ha6ao5dr0itla84wy3t0t6jscc776p61snn8zsm5omfyxxtiib0i9htevlooij3f63h4my8jb16n4j2th0iivk5qmy9wtjiirivzdv36zc61br8xouyx43vq',
                flowInterfaceNamespace: 'rcn25xueujc5j3cvu4r9jo1113spnqb53q6q2ssev8ki5f20h85yuwfuzu8awlq5of0cc85ly1ekhggonr4f25ss4nzm0a4zga3njdzkjbct2m329tnb5tb5yv0xhhrfx3tz12jd0mx6j7w1siqit81m4z0ohi61',
                adapterType: 'pvo8lnn0834eth0v0byr0fhkl9jgmym9mm6ig99ztzoqyqdmg9girg0jlcck',
                direction: 'RECEIVER',
                transportProtocol: 'a7tbai454g0m9vttfmfxd1kgzyn3xmw0eoa6ladoww7jj57mgpmacil4y9jt',
                messageProtocol: 'jh5uz5adzaq0yrr1wpw520a98aodxa6sqy1uaifye6f865538ncxj8v6008g',
                adapterEngineName: 'c10iav33ses4ciut47gpulp2f7wk7ys9owrgkdu129n2rdvzjmd7hx2w9382m7cni75vci3tsqojzcive29p0txuuynsqff9ixemuyxqf1oo6sf22xb109cpugsf7p64nus6w55w915ybjqusm01o6f99lsd2c62',
                url: 'giotmsxaioy8gxplugc5x0804l8birxfln4qjrdffgcoe96alunltm987vqhdwp2y912t6exkinp7w48zkpy1bl51p3fsjcm052230po92asn1281ik9lrbpha7tre0ed7ai4xq4bu0sxxoz98gw3g3wb7r4s0rjy07c4iwk24ci8k0fmets32qi5nd5fu97kj8rm60o64bgr7gqla8qrdow3jazk5g323u9adl76t3klo0ad9tv9t5nhd8k62w8e4cqffh5clk0mdn1ssnxikwcg07417ubiesvxbar5g7j3g00woq1yv4nrdvlo4sl',
                username: 'f66csw334xm4hp6jr7t3xtk644skz25a9ebyxdyfdutl50vhgjr0ugngu3ru',
                remoteHost: '0ex73e5yga5tsl6i3a088lhdtixsl17i9609c0ijueo3yiaclry109rgzjxuctuppy93yilz60jg3q3fmlxorwge57iu4ppk1j3qctjbgf1x8n05kykclz4pjwitpwqh9nwmavr6v5yrxmdoma5yzlvuoi06n2tu',
                remotePort: 8423939836,
                directory: 'qxzan4xlvknxj969ftsnl393y039gwmr04q10244u8ih3qm0g7wlg1bu6t553v003rq555qdxobwpbxn06lfewge15swxk8xjsovr83pdl3hbdllwp2qsh1vrg1bcsgjcsn3f8p4k1fz8mxax5w462sef1xigb5lg1ca3zia9g8oittjej7q8882oynsull9ivzprxhr4vwmv2rn5bixqpuw84b7uxxmzhn027fdc98vbtb9ldu1qdsxy6i9pvs5dyh1x16ttr85q1e40tag3jbcybzy94j66o7506vri4j9ga98zg871k5spef3o6jbjvabv3xfvseq1ookmgse7yib96wqvx68nzigksprwld07oarhgmlc5ixrt3ntd6n4le43folj8055l8li34ctc1cikzvj5jjoxobx1fca7jelcrfqmbe4gch8a2y04ilcanuskm3looik1dldblie5zqh4w680a9p81jur0ovrj8femx99g2cmv2bp1gexjdggdwakirfux9q1cl8qekfnhxw4o5av6lpavzt5i260wwe5hisdjc37jret9irtc0wgdb2nxjyj9gwtzyrs9ljpetc7cms2i7i91782hoap202x7zy3r352hptt7k6p4upz5ec66hm2qjzpwipjjkoi2eqq7tvswui9ef1dz232jk5u22lhn3cckpocyp81o3qtc8s5y1zexehw1dcm5babv34jfeuwez9ohqurswnrek8zwbnmm91c7qfg4lq710u866ke51yqnvk0lszdbkofheyf7ysqrorjh3mzx5ispibu0n9ko7gn1kl12qv3mqldu42h9imkszaysnvuhv8ql6itw8dz15p8szsww5oodzger3ekpgslivnui1jon9w8vms7e4g1zwas026rwh1gpns672pam1jrcx8ymws1apuvprenocqjdz05bycysd6xjvk93gt8nbua3oe4kkc2mnm0hurahew4y9jveq9oykke3fpwn27qbrekpxfwt6',
                fileSchema: '1v4j5ogwj554qw5qae1hdot1hy4pejl3ms7ndbmrw8limp4qzw60t3s0ycufjdwczitmnx58fcntu40rza5qe54fu1ujguzz4likqrf63adceuv97s4qe95kg16kgz7w6zso2c4uo1i9d61yarcwle39n4mg53yaotung5cxdoxbrgnx4bpfp3ydgighyog4vmc2fgk7ixlvwb37s9gfxwblq35yqiwuzta1xydoj4enu5agt11na8kotwk05yoqnw2cw7o0szp00kbr3l4e6fiiqb50legbl4riavrx7opw4g2vmjp8aqis5f6uysrft3wak70nsiwc0595wpo1bqfchg9pskbug2xgi6itevq2ans67j3gp9of1udbztm6wqthwld28i99q3sgihxtiknjb6cvoxbwe5qghh4o05evqul7alqoas1e011d6ub5n2b4eikfzixspi0m502j877a5zfm36q9m6gyuctatgfz71r8rel4udvzw9b9sf11mj7vsf3xegdta59u2ber8ghwhqpn2xbssddjf5ypc3q0vlbhvil7qfuuksl8ciyoxvn1q3iovo74gk6mqaa1ogmfhm3lzyxhs111v4hsu3ebn6shwwi29vcal2f31m5lejf7bnyyvi9hbhmga1qdqvgwtpc5pzerd7axu2c4tidh7fr5qs3llthmclktt1rf8houskc1v9gvptntexo0xaq0vl93qmodid6vu2dedn4xzy5nd20xl8dz785qikfye0lndag0lxkxopvxjowk80u7ezlkm4yw4gznou0ulqipgu89jl7y9odeypx9e0enygrd39bx4xcq8yilwfmb5gdhq1atpriljtlfbbercis6gkr4u216v0v6szlc12twea4ckej03dxw9do3q9qktp0er5lssb3se2u3rjpjvj1rc4xifwhwhg3frvmwm9s5k84kz42wpr5830u1wad13wv6ukztn5wy5b1u4rly792k5f0wkxk6k20az551hn3z',
                proxyHost: '0020iq67wh83z43rah0v55emqy2fhxc0kh4pang3u2zrvwab05hrldo7aouz',
                proxyPort: 4994561069,
                destination: '9ukzaobvcr8hrboof1kwj4v7kim9t7ebd2tnljdyopcomi0zqs4ssh1kwlhuyxblnglitqd210orhwwfdprp86h9dqrmq05kkbio0x72afm73cqromllv6bryeo7p1vjr9r6mev0de07pir2pvd231pcnoykdfrf',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '9oozs6ea3kg1elsjb531ulpragcsz7a00dztzips90vrc3c4kf5bwi4dytqxvjy4tgs9m5hh4adzb2mu07nosmn63uyzo8z6vru85odh2ulfrpyis1hvjed5kqzswhwhpmwbk9g1rd0sv4qwdynp6vjfjwvyxybc',
                responsibleUserAccountName: '51zisyyl6mho3qiqwyhn3',
                lastChangeUserAccount: 'w7yjvonesrhp3otpnl04',
                lastChangedAt: '2020-07-17 23:27:40',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelResponsibleUserAccountName is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelLastChangeUserAccount is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: 'ji39d0guatktynhw3bd3xesfp9hf85eokdhirszbbpu6k623p95e8zgefp6pz58t7qr1a0dqhmeohllzgddcn00uglu27sv0an1vk4vkgpljageszoh46supgp4c81efuf178bqvzoip3t5w1g7hjbu468q4ophq',
                component: 'u1ip3awh83phxv6zg2aiin0pfgwpvotgz55hkmow48cjwhsh3w4ssyi3fbmn7nhwq57yphuqw664f20iznn37sm04dirl6xqoihe7jzwswydg09rp6ne7muf3fz88rsslfzx6ajd457o4yyw66ha1156ek8s8m8k',
                name: '3rt7w4rw8waaz5evy4wlggwoytwipo61wc8z9ner75smzn50f8h0aotjf09twm3l0xxgoxizyacd5a3rvaw1lqhyia7jjvnuku52642o4lujum01va4lxu53n3ceuzue4a05f39hbnnhnbr5gav598rntclncg2o',
                flowParty: 's7v0zaqipbqkievnfo5zu09h0n5vp3ncpnq36w2u4sc64m7xs2iydfa5gdf3ov89tt2po51ixxfo33s3jb0mb0x1kbwt2yfenyxg1onz37hw00ff8igsm5em6d020b3ld7kkxocaaac3az2ky9852k2lv6de7bhe',
                flowComponent: 'rj4dmdq5u3kedg84tvsapi3dhdru2ss3x7x74ss9j5c6wdej0w0boc38ugnyt0yafqee5b4fpc91of61pr3074vyk0nypbktuy81j65p5xr2785vr5iysjg088ryca2s5v4w3vf36uyxjuh8kesach5c22i4uqf8',
                flowInterfaceName: '0qcpf9f1k7sdo8qazifg2qkufuq348uetjqpp0zwhkzolmmn7p2z01hyjwnp8svpwfkld9o4ane5xad1xr2qd6aj9865y7rsua9ex2ym4xx29vvua2n7ivioibeby2p40ah41x3a16t3m3max2i20jtfirku3rz5',
                flowInterfaceNamespace: 'k4k0cpg04dcnjzyph4p4mc9blvnuiyh8v54zw8tcumz9qemiuimsolrgwc6zopxbf5gwjk8v7mrt7klak7o58kso9h99fq47zovxenqoq42icyejoca22v57eeewnza2dupxy50p8jo2xo42az32ungg23zj1f3g',
                adapterType: 'otrqeqtqcbcj1sg5fn5lbm37xccggvi1hnwz08155dxq1e6q60w6ykqit5rc',
                direction: 'RECEIVER',
                transportProtocol: 'mur4m3bx82zolmno9hujy3x6es34t7i09kpzzphdp2il20ndf4oq4fraavxm',
                messageProtocol: '9ffqtmpdiky212c463a1ux50o6gbu41ppvl3b9hm91hslt3o0hlhq814ak2h',
                adapterEngineName: 'mfzykv44kcgcygk54fukgq160vyr75snsfo59rubyt84aob3j8s0znyizjzjz53fc0kp1jjdf6njqbpnmj8ldabz58e4kaochvigdi38ahp4dyaqniz4b3g6cwoj7upspxqpd54jl8xclwjn2x8wime5g8ooubra',
                url: '07zwtggo5alzho29da7dmxf7z5lyvcuwv54r5znv0kzdmb799j625w8jxxd2fobcgvfxzcxpq4ijj8pw0b2sapmz1jytyewntqqoys9b5l4jsu3jexdy47t5zddzsqzc2f0yhvj1dldrw2nub3ymzonomo6j2ou9nqynd942fkruy7pue6ykpbs3rt2dwlkmuws6ii6mlam631yathi5qu3p379wx9q3wk763tmrfwe2kyz8xj60akvjhlao7413bdkjqvtkjqf7a1e5e5uapsavkj9w5fg83hmd2pzog3ogflqx3umre5um7vtbahgp',
                username: 'yuec8acew97qanf0adaazqd7p9xy88v9qpjklgp6cjfdx8fsxw4l6q4juul6',
                remoteHost: '2uddtzw5js3w7q5esnts8qrmkiyeifba50busigow3dqfuup4c83xuoeaayatjcdawjb0l3i6ssc6ifzskiojo2je5hud808c3v4v3tkg2wicw80fl1nar7cxap1k5gaxu8lcxrfxzlnxec2s02rrn7aq00luj33',
                remotePort: 3161468527,
                directory: 'c5vk0pklldw7mr82ggbstyc4xsauffu37pkei2cwsvpna8p77xl3socdh0l4ree58qb9bacujnq105md16u9w8euiu344pdc2hg7jn1zvni7swiscddmt9taayyy5lqmj9v9tw2knguteb9mxtt2g1pod6y6gbqnnm0it5qvk7x84drg754h9rmrprbemyexil4zd7pbgjjlff45iwmnsylua2g2q9jgh1te3eol5je9uybu4zr2ahmw4gpfuhp3bdb5s3fa3axepx7q6i1r90wbzzc4jtm5zcnm9equsgxc3z5xt6xcpugjphxablqwyt5v749b5rkxf5gigr0caw9m5d4ow047rcfivtduo70ezddlwc45l5whjmj1qlo9pwcgt2p5yqdhke63k5tl5kmjpi24d9dvf3ufk1hpm17tz7iabct79i3htpj5skkfpolzibjpqo0znq7h47obnrzlntynijhuhc8huzhapsbw2cc563ez2giy1yvkpeyw0yufrc3qxpghx7zb733ab5vxbv7b5akfkojot4nxjz003pmlwzkejo99f8xy4agcozkfkqoiwh07pr0gcinbiivf31sxu7tfkt5o98j9435tbdxg1mpnca2ndwgkgfxxvt93bel9xta5fenfx10rw6zri9vr28toxn597xx9l8da9706t2yk7nazi0fkryo00xok8oy38c10uyr998bwh4hwll1ulogt78c80gcdaxp42j159dpo5h816up9i64faeflimjpr6yzj1lgwapxjoux5xfiee2p4x8sopn8z79s4mz5b0bin6rxyvsynuy34d7hijmfhf1yr6hbhi4t9radn0xlxvh88usqi5u6cej3sawqeaxb7goj7sr145cz3waj6s27otoa0vkx9gdne13bsl9c0e8rf0bi4t0um32whojsxqhooe87q15eecaywrcep2terzw4e0qbyg86jigzndcz3maihw7wse0ubkvclev5hjpy29wlo06eais9',
                fileSchema: 'ronhy26vundczl9vskbv2ni69kck7k5mhqmkupe6dkye7x4djkleh2mn5ig80edkqzntmlwpafh2ogbbz0yb9twxjrvccsghngcvwg1o2mgklv11uvfdqnq6tne2bburcfbsw7923vxkl14dqz2dztaz0s2fxa4j2bnmy602yopz3x3wr8c88hocksszwx3jlvm7bjiiv1urp40pl1kz2rncctrv9q2xetmzj8nfuc4i7piyqf4pvn3hloz7gi4tigt7z504lgwbe49tcxrgqnvzzoc4ypdcwwosr97vbglihr8ld2xoxiai9idrp6y8mq8yki0lfjndvhtfniwhvqweh4ywj5pk420clh1mzvk2ih33n0k7ihw1w0o2glo2sjy5su0dc12qxfyn3cwnn7vlw0jiz3y1ifk8hcs0hb5ncefx0koh2asb44wv41dr7txkj1nwrdoe58z1ep9n8tnite5hkobjq9tebvakocfq3gp81pykl6rz6ggn4m8tbg07lual1uuj4rg5ztd68k2aavve428a98bns2e2qcamq8lcarhnzknk7dba6968dt11irzu4z8zpt64gi6jogpqwi4k4yu50bm2djppzajk5bj140mc1p4ya2rv3mex1hb8zsl2czodpfnxlt27vzf8nx84rgu55vskogpwfeg911552a6pcdx6xnqltnu0ewync1i4mvg8bzjbsan4qxwq699q2d5uc9xhree8xeqyhq9e1mn5bt90hxr4kvid419cgekqrk91436gxe4l5yd9dff0h2523q0yy3nninselkvpkvpy7328z8vnxzu6wgswmgbunj6v0d3lt9gks5e7rkxxem0v2o4oivt8g1nybwhdbo7ej6dqomcitqyrxqc589edp33z3x2y8v0av1mtl93h5byb02t6wxob87b6ve3gntqattsv7cqmzm0hctt2hjf9b26ckd86fwxafsa2plkvfgg9di2z5idpacpxpokl13w9nwuypazcs9fs',
                proxyHost: 'u12aqzc01g41njgul2766o37agnk3t7gnlqai4vruj0h3krk0d7oeynkzhpg',
                proxyPort: 6637277924,
                destination: '42a1zhww1ml8k36a4c1mk785k3cq8rhqt4b2gnltmnlfxyxxwnuzcm9yqjfinmd2zepbbdz4hhnhp3mhacn8kmn7glo6tefu9y9cjy591fc38llvrwff626xgmvs7daccqffg48qjuk10lx7tuqze570hvqdmkhi',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '5ekd4q8l0jwgbt6m0ud5x2jhf3xa39bvavu6oy5mw8l211sxhxu9w9uhsnwpi0hj1hmvochaxttg02wdt6mnkfm2i81i5zzawq37ry700l2awc8cgqd8tbsquopiu4l792guqtg9g6c5fozywspai17rutmmxxrx',
                responsibleUserAccountName: '8xaxebntigwg8kmhql16',
                lastChangeUserAccount: 'sap1ruod46ing34733a6h',
                lastChangedAt: '2020-07-17 21:00:40',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelLastChangeUserAccount is too large, has a maximum length of 20');
            });
    });
    

    

    
    
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelRemotePort must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: 'kjc9j3hvv70nlbd42h1of4tmgfeq5b92230a10jmhf9bpla4szxbmw1f62fcl1c6sk9vill92hoovp7mgvr278zeek1th7cte2bq7litpnr0328a91x9h8fc4izlu7wlpe6thxzomsmbo9thf43aavn51jvmn921',
                component: 'zbphcqq2uzilpxhbx11me9fxygba686f3sn858ocpgw2a9v5ipm40xjasy1lmg0kb87ws4tcc4mmzpsgyzfu8500dhux4jytii9gxq85qao8zldibbmtx1zp77xbxhr62w7ewy8uc69vm6dfwoy3fpvthpdydkg7',
                name: '314a6yltexo9m4bdwisxhv0y0ii53fryqi2rfoi5mcb4c191wvvlvs2ddd8nazqimbj7rzguuos8bdr4jx51a8pdiyy1uvianl3abqcseracd17ftquor25h1z5m3o28zhsqse412zu7symlq2yfkhzpahgcu2g3',
                flowParty: '2i7pdyhzx060orvyc4lnp9b2ckytrnlqhzw6yb2z2s5fwwbw19mjrrc6w9su8lj6321sdv4j2j92qrzhi4ep3z57c0ayubut8e5idak5j0akwxsyo97bxvt7j42p7afq010utqlp4yp28qmtf43hpdg5doecye58',
                flowComponent: 'hqyb0wtjr0sqjha5339srztbzjuanen2o901olga5fijd8zgwt6qeybw1n2pgx2ap0b3l8gm86x8cj98vm5q2pduy90sw56ka1kcjgnln8r27tng9fweml3na7oey8fmvcxf2k9t0rd4n0jg2badl1gjmgm0rqsn',
                flowInterfaceName: 'opl9iu6dijjoy64ecdohwqf3tdhoztzcfagov9syl1zu57g865whzyec89q7m09xknfzculmbjv6mjw0xpc3j661b0723bf8lymbwf09gui5rzwovq0npbp82kyorxorm6ulqzrtd59rbq1dqhvl2fobxqtxh0uc',
                flowInterfaceNamespace: '2dnw5vwzlz0i4jdapaw1j77o01b10iqitz8jffi79uzf35vhw73nsxb1y6oo3zlsxvcikerl29in9gkb7a29nqanz5aeds756mo6dsrk77pk580mkeeceva8u3tln9027od5s8vu04aaqb3cy132v9ug5c7eel7l',
                adapterType: 're7lmggg9qkw8q6tqb0g07uz4gaz8birsmbzwjxmjt8jai9o6mcsz5db4duc',
                direction: 'RECEIVER',
                transportProtocol: 'm3l7u3vifjrnpfd9w76pfysriym8fv0t0gf4tuzaypyl068ak1gq8ysuv99n',
                messageProtocol: 'n4bpwhwgloa68uhtbityrfdg4e0fcsv9c0j17kt8jah42ca2qtaa0414pvup',
                adapterEngineName: 'pntfk4y2vw4x0nglanr0tyl7qxccvurb94vjq6o6jlbn2qaflztxr7n7p7l5t7bn0pt1ain5qfh8jh9ooszex3668gnfansr4htbetvomi2tqg75dnj7gsr573jvm518ihia8sojbt7xibqdli394ixye7havu0n',
                url: 'ycrn1aocrfsl7ef27gjrsfooarss0rob3abl5kmk25x6c6oixrr5t6o5uqy15mpzfj1d4f7hvtypftnjmwrrnp1k5ekwjd82egr5sndd7e573pcws5ood09mt4oje2bjxhp8swo5q1aqobe69z6z9rbunri41e7lhwd7f4wegbkny84hpy8kr30r8m5hr7ryndd2wmfk422whgoy9972kfb8u5023j1umkeshij03kaq7zj3xq8frw1zlub81pn5j0ss488se5fhpkg3wmadtx85q4ococx8rmv9s8dgstqbtrhtfyhfem3qdw52z013',
                username: 'z88l9eu6ws3xw7whf3780hx1q8jrptzojba2m48kfzpynhv1joiczzk3rucr',
                remoteHost: 'i1n3paabsx3xqc1jbnn29ov64jgauvmkvja322nr8d8a3tj32q3gc7tsd0wzhptsep5ss1kdi511obthj62y98zbufhqhslvxyahsv55x8rmpas6fedh13letu22fytzz55vgxaxi1bpbvwtknkur8270bqzbw5u',
                remotePort: -9,
                directory: 'inmq6cp6lckl8iyq6htym5t20s5lv1y03pi2t9ux5x2f5zf7086423a54rkuvf40tqp7plc5v9exlgpwaiaa8hxf1t9a99bhmp9l9owhvb85ix0p0qvbiyi02rwhws824w14hk6zylz9k3k290na6fe98ji1a3ljg0uj6dujdml39oxngpcypd7wlth8psfonom165mw4amxktygpnvshvj6ojoh7wnvcai50da6aejkvgvvtckiminvf0fp2rbs9mb8g0ds1nd7r0cm58k28o8383jbx8xy62buvp7dfiq26yjz8hyeftu8v3tucsm7uo8n9f3y20tp3fzya5z0zk8jbxjx56kkturod662nzhjz1y08fors0902hs4q9r6w8gybdllhf30f9s5fg08jr30qckou33x0j77k97g0jdkefvb1xjsw9luz96bzol38sglrydvg2tn0i0oqyy7zrfzon2jqidyopc8nyx2zak4oj0o89eht9ibo3ri8el6y610epw5n2e8hty4ttu1rntasip2me4aw0bzxkuqxvpz04lh9ugwjdjokb9rsobglhox4jqs3yn2lcbj2hn9r37vv2rd38ojpi45g35lrpv8gadh333ytcin4cfzjzpajhgs9tpyvjlvx7ul2f26vq89axq9fct6x0sjnrpvqi7c5lxdgoy0840v6re9eevkrtx169qc94vbbw2hbvrvdch4rna35zmxnmny3p80ji0lkxjiftqahti38aqwykxcqrqf503e4r38kkwfvap4cmshjya0xpdjrnf8yfsi49f37fj8bahp30lzkxmb3o5q3a12wce491kncanp5idn3yaqfx8a8qbcha7u3ivqv8a75mvvfqbo998y46fo0tpeoshevrxf1iy54pxnzao3otmrdg57wurzk1fl9q84irecnqz1eaplvz3ngri4j04dwjcc7dc7t2u4uniq91biwy4ktia1c2zorwpx7wv45437pjfbldn7rnp8yz6h7n8u',
                fileSchema: 'r1ychkida2hktgznzs445lhww3u7er03ujbny0qpblaybwlwaqaiwenybbpzx409ebshh89xpnsx7w4yk8a0h7n0zhiyhe5p4yfkvln0ta3lg4v42sjitkwqc7ef8pkqd7qwnce7dlrvx44jpls00l6jph0n4lbmc0w6nwhm9yunk589pd00vmqpue16845pigmk26c960z7j6xudx7u6xeu1rwkwgj3xwijrg9hnwiqbzdzxsrs8pgbc0o2fthsmk4xjzzyi73io45agql5ckqiqwcb6sp26eiltsmw59e59rd6kig30cnpzi55hm7mfwb6uynnbxx8htrumvlz4w1yvofuknfydg2sljnpbom8ss1uj3loym9hqolxlm8997kxh0csa8xy49tedm6drqjb3eulzmp0l0w6c3krl4bf9xl4zpficzobr49c3yg1dm7ntnnpdobnsxknkk5hyrwx70i5pevqz8a7w8ukte4ogquqp0u4frsepmfxp0aujgwjionvl80jvh4r216an8gl7bwcq2ljg2153szt3vwktumgrz68cpd25j58zij854lyqjp6q0aicu82wvkf9wgmyen306a72tsm4i5dmdbau4qd7b3qnj5asdrmp5j7chjt0uw1qj7byzfisb3kzeex97vwghvv5muusxzo9pms1ka8yk4p1d6hq5pqhbhfg79y73il74imx7zcna9ppxnaox6brbtmeatlc7wnfdpj1ky1urgin5d5zopsjgaufmrsfra1khamg9j4ibelts3y06cu9zcyntcfog25039w21pbiccyjfgyug3iq3hse6rqiouyfph67p8ah1ly15dl44mexecupi94qtb01pjeaa8uxw85qj6to2s8sj6dg6bnxykdpr7lq5py26k17ssd7e3rkj9mjwadq0bqx7k8owfxelpa4mytfe7m8fnq57name8qabkf6lhte1dpw76dcl6mn34s9g3jju84ch11pnd3y8zwpg22tvasup2o',
                proxyHost: 'ko1powplikrbqrhmxhc65aitczqgo086s51kgo505m7561l669ttreij3zd6',
                proxyPort: 7257199184,
                destination: 'rchri96m323jp3xg4ekjy63xznvol2ycnyinom1kt7keaqqqtojqmwkekl6pye1t0e9n3tkqr4c5grs2yoneht8oes8d8f4667cs6orcl05uj9k14og00xzqxvt9as8np0csevv7m11lhpohdo4diauro0htngv3',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'dfjtrv3doexotzbh9i1gzozpak0qu2yu79tbj5l0ybna5fbl2a8oot1jto58dy2i4m6k598ffnxko8v8l9bzyr7gi7eb9t462c6x4t25qdl13nm412j6vgthodrdlg39aakfx8ipnek5gt3crazrgrjhtt4gooxh',
                responsibleUserAccountName: 'ms8wbw8nut8m85yloxmk',
                lastChangeUserAccount: 't2rnk20ezdvn7160hrni',
                lastChangedAt: '2020-07-17 21:05:02',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelRemotePort must have a positive sign, this field does not accept negative values');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelProxyPort must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: 'i7r7qb7fbhmh6ss3mglhweiqtshrs8lmisjuoq8tbjeguzguffve9bbi0qku9mscy4ktexaj5wkxa4xoqg5muzsmolz6vjpk3ly8qyobfkazjj3klej8umpgl7hg3vesxdb30mu0bjyje0m01r7vtlyhayc8309p',
                component: '64k0thgr9xxpuf1onu2mh08qs7agnitqkpgz84709xx4j2j8gyq1dze33aa9fpqhbog0m3bwyltudza6u3j05hraddn6fqhzpgw48zsnc65nxojtljt9f1y1tkoolx1nfj8w6q1caqsmbx7yosywkq8zgw99c571',
                name: 'w7mr77k0nnmy996c4kbz9cmatyabz3bek616oc7pj9lg3xgvo67h1vpog2v6aq526kg6z9tmw13tq1lootok7dhahf1idwqfcd67dxn0kuagy87s59d7kkq73eaanuwve1ix0hu70z06wimi6n4zf69unxabwm2d',
                flowParty: 'dwmm4kh20xb1nwxrzvl3duwj3oyihxsdjwf8fu217hamntzgu6c7cedhcwufcoq3fvfsd1t8omg3bkvr05g2aitfql89ts6xed422ry5m9zl1vm3cais24hx2sm46mqiy5falc2h4git4i261q5rhi6zag059471',
                flowComponent: 'wmp6dplfp21oy7tx79zn9diau59hz72eufa6w6663o1lcs5ycpy8k3b6ghsqygiy13td7ds0klatdq3a3mjduv16fdbaoxhqx6o8ydeh5ivtpp1tt4aytajkea9subo0f311etd64hvxsa5hpq561cnwmq8qxt2s',
                flowInterfaceName: '89v396f4eqvuj5427u5x9vnyzbiuk2fojxtnnejfdtswhbnm7jtjdtuyq2vdkn0s8458v0xwxxn4twt2k0gm3x2yzcxxlfr3cr1dynqooftpf5qo44kxoaysp5u0smt8a2ubxh0ykinbw49emnew3ycljk8970sk',
                flowInterfaceNamespace: 'vzae4vatvdolaulkjrfypguyr6br6hsb7de4qt6a5fzji6otqrosl8xdi09savhwc3dd2gkpjs95za74sexciwxfrhcaydccjgz3a95p4deb40u9lrwve0ei4epx6goe7nf7sju8l2sed12qh6jbjh91p4xmvwmh',
                adapterType: 'p2auwo7tll2qqv1puydrroujafacaorlq7oq2h4mqxqzedrm5peyeyo0fy8x',
                direction: 'RECEIVER',
                transportProtocol: 'vjosycv7x3gpzfn6np0u9udbtigqfoirpl8vhaze7zswmwv97vnjgzqgrwo1',
                messageProtocol: 'zn6qntdyvqqn9v2m9e60pw7ek4hw1soncp6jaorprxvk56o4iof9cvsd6cyp',
                adapterEngineName: 'j883eoydjh6y4tb7bpuvf7lj89djtocdkus615uwoafjeax2koexnk31oi1bwg006ydlhgyxmgb8o9v57hqu101yedbdoq5twub45w9ubpxst9nbgpn2ehxp8m1girefgjy94z93z92qujfwj28i9vwyoxpsd4gg',
                url: 'v5ioq9qqgd4m942kyagovbkf0n543z84gblb8xs9zpm6g8974ur3rzo1h8l3xt54nex90r3gi6kajbs3l0g09do1272w2eg2lsf674igp6olt7sh34eymun92z5xzv9ugn3adn4gd9r988t3xqqblnol76jm9n3m8g44mzvaa4ki8qp1wsbo9rm0lxaw9rrdppqf4jiyh9oixrq2b69mxupcxsku8spu8requ8c6aeawndp8j9nvk05h14y9zavmxc3w0r4qt71rontmky85na92ywasmhscxrdf7z6fbwixr432oz8ifylrdakap2mj',
                username: 'bw0z9x1phj5cfmj2q3xptfl1ctg1tsviw572ioqeo6w5kve1x67nhtss6rtk',
                remoteHost: '5nmesmksgj5q5cfwull4kz45yfkmjjz99p1mx283kve532uzv7eg2veplxoh9ifpzetq58pxbkn9fe3x1zgukjgzp7vrpd24gslwvph056anr424tj4pvutvafcnt5fqxold4kzcufxprbjppfc819tadoqr1c3p',
                remotePort: 5235535270,
                directory: 'oy2ql98r9lupijviiig0p367rv2utfqdmnk2bckrv0wfgw887lh4sy0mon7pjhq0qnp8rpf8jwrseh9ghdh8u3uv9w4ug9xwjmpie0x0jji60ngxr3mr542jg021j6db1y22nhufeh9d3vylwwdbajgafh9f06jy451k56qke2r0hqqugj7ajogyinkgsfewzgsjim14rpxzphzskvor9ill2ygzxq7ae14jbe692wttdoe6o6kwsftzmysnvbjyhjgxgedhokock7ifmri5n805frnk5rg80gzrvemf2t50lyl41bnve1cizn4dpkg7h82wabua68zkx5rnbftr2xzuc67cgzb7g8qswve9oxtu3hk6i8f4lhftpd4yvnq6586dsbx51b8o3c8aumwa3y7ek1pl00ifaeprl4g1prmsgmx8g12rr9jxkxroqyc5z9cyzbfhde9ttjcwlreyb13n7568mz8dlcg5ulpo2n9iohajsgl9t9xrqzlmrwvu3465u3q8soj0id4vz09zvvbbheus29x8odrft1tpjdk6kl6h3dalfibcl2dfmuvfw7l7lh18ar8cp6g3rrdofskbo41vo0xqgol7p3nd5tnzzmv1kc35m36x9dcot8gadjjb0fsz9ve1q5brv3a9y572sl0zpyp2jyhqbia3la9e9v5dw6frlz0vt2xbkl2wb6kdvcdmea8emxthjfflpbaw5jx234nrkfcdczfhw3t8hae2447zbmepqpx4c885ib34gpaiady1o9rpy488nracan50nwqhgzr2j3ls0jwy7q8fq7k1bayug40aejxminsnwlnsybjgklktqvqmqh1ejcp8vha3fsotrfuj0qm0xo9pmitbqqbfvhbgkl5yfpyjmmf5klf88zytfl8vhvn9wm6k4ux2ulcxhc64gxbfdu91obpe9tx13rjbs2hf53c7axx3fpl6qoaxi8v826avsb43d8upwkbfd9po78v2fqxuzvo7n0rlf4338xll',
                fileSchema: 'eeakytrys0p3qzxqcpmhcu531bfpho728jbw3n8aaiy3sny1s1pto1gikqhf4bvxcj3gkcu31kmf0b6v353bogwa23qx24puwna64cz1bq4jeo7aafpshbnml7fm0zekegrdo07df2fu6sj47cdb7g4tzgbsr7jsl0jjk7awt91plfhorvg03wkqqe5ve02amz2z3w516sk0brw8a8jvwf6zv00adhkdv2qbm6x1lgutt23jq89smzf2avw6x372xdprupx6onpahi5kig3c08kjbx5cvhg5f569d3sd7nkeevb3ldzmg6huivmouh1cgdz9crnud3fba3z7axzzt65g1pn0gja9v540b9i1r5k7p1n59vcs3cdfujvdhudzjigpbbm4u7f96vpcb1qbt0adaj959o1702z4xnzj40544vor58eh90dw0t6qrnw9g1tfae0jzaba6pzamqthqsmuc0f8eeosagpo3kedsb55bduw8x73eflr73z2tvujf9q6u5pwyc98mth7q28ld1dcueophgnuwwcb121c8kt4wuccf7bm3bandueo92os7yhyyi7na6rc53wtkty7d1u5zjb0eix9vsq9djswotsofovk32zasfuuil4kiyt4vw3d7cd7qwialn4c6e18niokr0k8utk4f9gmt8tjr1yt47r8hgztd4obx3l8914d7er2splf96c8p37trahfmeyta96tquibop5fr2twtvxo4m8akc906b5cj33rqijojmrth2edxfsxzfdd45m2ehm6y8vyreu07dpbjoq7wkidyqukpurc8j8ph3uoljihha9f5kjbg3urfeqybnvgy0porrmoid9fgowpsqit1un8y9ydwsd5sboquamqmr4f42o7tgmpzwrbn6yx3pxs2slcuugu9odye7erbyuom6wbqk4myfzdkwy056kbcumssv34vsptnxktaz85y03rfqahtutb5y1q46i3slrwrn8l7j1onnygei5vkiebl0ei',
                proxyHost: 'x7wyrb4lrhttd6riragspw4ne3mbnff5adjf52bzgz5ynx2w394bybosyref',
                proxyPort: -9,
                destination: '7awwivuzk0n64sjewvytoe1ubimwmsknuzskt53fulwz63njium2g7nzygfx687lqs7r7ihqlvvywl5b27lfxmt3drxzh5god15v86i5yyub8nl0yxm2m34dr27kje3ihp7oq8bki5n7nsvf4tp03mz6ivlezz1b',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'qxooljckvoe7js9k6kj64afbgvce07v89uqmqrk1h2exlvxvrzyfccdyb5vuk7psq1lq84s8aespwgwoz2sg38dvyy6ajyew234v8bupa4s80hcfy628ypo8ermjm6aovu5vw3qx2asfj1ozq6vkweu581lnbgzp',
                responsibleUserAccountName: 'lo7u1zr17walfit925cp',
                lastChangeUserAccount: 'ymeydl1mojujlevas54f',
                lastChangedAt: '2020-07-18 12:31:49',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelProxyPort must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDirection has to be a enum option of SENDER, RECEIVER`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: 'jkovycj9qn1sqh9f2bg9fmxb02oegsz8d8c3xua0slzmjsj5ac8du3hgbuqi7c1xwqp1n1jiaw4dtuzy01l53fd8mumnds2zzgdgy0khvtlhs9es5gg5nvrthm9akh3t2ojighm0gcfcd2nt01dwx38ijn8i73h8',
                component: '5j6xdm0omn47l0hs115ke887lbcq1c7y3008gynnxnyz47i0ghf87on7u8qf9e8jbmyrs9jfdmwye5wg0m9ak0otocws3es8thgp97jb65ac1welrx5du50twiae6rrlx4xc5pjontw5w8s6yobzh047i4mbfrez',
                name: '2r4qgcg4rof6giwpkzo7eff08jr6696wuj4vo7f4n8bxv0mofsem0zwqk1yxwka67wr290og8y8iidi9vbfpx79n6fcszo9ndhflgjjrozar6dku6chr4abec51vd18maxf16e15rjjthvfzeqz4tagroyb6r98b',
                flowParty: 'ozc0a8uea12d5a8uc92ym08sl7hq1rnrd4tr2538frf4o1qye19ky1ab6mmpslerqet004rslo42dylg7yq8t95bbmqux88lthdd51049g2dih7zzbwxnuxa0ihphqfyq6ji1diyzwi0e6jer7q4fgcubb8d99eu',
                flowComponent: 'udyf1tsd21zq5her2e5wad3xys2lqqe1yu8qo12dkz94304z4ga8t6wfxuoj4fip3xbvkt2l79l8wfvub4d4cjft1zloehj5ekc2s00vhkr60294z66wg0es9w0tlqv8qwzbltnt6ztla6qbyr4m8270fvdrbgwr',
                flowInterfaceName: 'h7d2ywudx5uu1psk9wkxblya2ijdc6jjtbkxdewe7olo736hpef65pyan10hhucqzk6maotfnh8d8988wzh9n4u6wlxc6zl4baegw1g57eb38kxas1m13g06bear7je09kqg3yqaomqlf1hln22lrwbwnv5a5en2',
                flowInterfaceNamespace: 'q5zarlrzy5zf6hfi97dyc2wiobuig2vrbq5ejfs47paycy0f667qjlpp0grrj1yc5w2bj06w0yrlzjsl1jhrw9mre53o3tzl5qc0laej6492qms3imue3hc9lsz993gzcuxsu5o6esgux3p55cmhx29aosaypok7',
                adapterType: 'jd59x6n3xl4456swinpt1bj7w06p5f3dirv9020gpythrn85i2cl0pb6mvgh',
                direction: 'XXXX',
                transportProtocol: 'hgznl3vtsggor2yjw8s1p1q203ghpgfwoitb2doyxw8icyjz6zt6asmb8hxq',
                messageProtocol: 'hp3xg2h02npliap5f92yavs3bfgs09xcj0b2tn16soaf1a9pkmbxtgydsxdf',
                adapterEngineName: 'mzv1qdmtpv878v96bja0wvykfouow9h42woc5yke4gab7l8s8ky6blnhd0s01burnb4b5ks0f3hq3e6po6h3n9uss3aeiadc293twgbbo1s2m75vyarwrlgac1vxjfevv7h42jipcxmu2iozshi9iibokq839ikm',
                url: 'xnld0603xmx7hi3djo4p8dn657p2ai3isgrfdb0y6w9mz6mart90xzab9n2nax3ucmris5mwbe3yem2l71smmlywh9xpejn57xfztip596r81swqtwllucbkw9hqddyh3sq33asebr66lz43zxdtve0ty415di5qlbir47rvzu5p6x6flzt5ye0b7hijkw333vowj377h8tdwhezw5w6ficvnaxygempmb31e5ttoj1p33lpavlrfj8ucel373jkbmwl8c8j179nwaew4d7vb6sgyvhjsgy2y2y6863ng1kg0lqb137j0nma6y5ejvbi',
                username: 'a9an991uq9rgfw15irmxpm22uxugsp5jq9lfr5isrf1sw9os6p6dixk5c67m',
                remoteHost: 'lgrkavdyxql5fwqucvcuvdyd8wnhfewzqu2si4rhb1e3ne6zrixlhdjkvxjscxtgn3kopwirvwl30qm43lmjw1pd4lmkyrqaaysbm9pq4ke4peeerb8ifp2t50ya4ksv7d8hclplarjyss1dcaww7ekgpmntk1m4',
                remotePort: 8497224978,
                directory: 'e0a4in9p21t4qfd84q36oodbbpfj2gg4vvenn2th8ty49fzkff1453jlm5e3l3r3rh6h3eba7mdkzf4gd07gowmzxbe3td50fhindklmu564p2jpgtyqd6kwf60rk2s53jg2ekipd3cm8b8r2n06o4b4fe08q89jixcfya0kunr918p9nvu44de1kopvy27y21okxq8kk1cjzk13ag9txemf6j5bm2hzwy5du4w4c1gk4m5hebzgj9y90pkksj8q6ew2mubejt0mhco83jwe4u8qqd74args3j2l27ds5g5748wy8bodo94fgih5pto9ilk1ed6yti5dptik675up7h3ino6iop8jusb53gt5bey10uqhekqda6h1igh5rj853q4fkeiv6m7zid8yxopi2ffspld4wk5uum3ndxf17kjcqq3y062hqwreodnzfrf7zdpcwiakulo4wdpz1qrwom32w3jy8kdnha4rlmhnzvexskmufq3bi3rb27uzgi80x72aowln9x0ld8qohdia6tprdpnimn3z6agjl1zdk03d2hbbzv50mrjgrqxx5yc7hagfsu3fg8gf5sm3cvey5k8azq5whwp8u8so5sv2kdiyhg5q6j4s8robi9fz6a5u89jw85hthbj10vxro768f570ikaems1xwpnu5nmatpszvpl0q0iyi93sy8gc5434i6er8z87821chjm5l7v9a6uhm1wnvirxyr7es2ubgqromb0yplq5oqqim8f2ubdfn5a04njcxmv7341qfi7xq6rpv8e1l3h5qc1ihg7wmxm6y60qnfv0fvtfgaqec671npnqv1uifk068xybvzz5fousgru7dkvt5eu8p7rbaoi9gn2yu9z6monf4mw5f4mlo2ydizkgksx7umuwis4f164hx0ygq810ae6fazjte3lbdylxgfz67d6t3betaqw7sn7e9inse9n8ywlhg8php6qh5x0xjux4uxqsu4u32ts7kkk3wjtb3h8uqkn27w0',
                fileSchema: 'z66ikftshvmbw5bse93289l4khdajsggq12tnigzuesu752l0n629hale5i372q0ytqnfj5wmoqagbnbpkwa8kp8jhwkfbkbzqfhlvbsve6e8dhkihw3kmkaazgp69ckx1n225xtuiqo3tfpvihdhstknkn43y6la7jbk38bx1w8tbnmpr7k024zvqtvmpffz68t946ebizpqi9awro6g9gfwm5pi28ftwthg6j69ay8wd1trhin319sgweo80rwfhpt803cb27wncrx8jrm5q2qv0t4y1r7y0c4mohx7vedsoch4j27pc97nx0nroyc5idxlgsv4jg2xi1jasyr7k1c6pc9dabump2tqwds78frb3tc4k6mptz6uzrl1k6r9bii530qn4lkm1vjwis2icpnwvyv7ccdg9e3upkipxqrfonm6t70exrxowih04m9ncmpwo5efgkqt94o0pzpd9nns12kfc75ffeysshs2vi9u3358k2rd99orrpt7956owus9lirxrhrvn2og7ro7wrii1j1bgta38w53bkwxldr5ly3gxl9c205ag033k8dx822njlh4xt022zeyo46q9h566dmn98nvwginqee8l49164esvxq6d8eia0zlh1kuffxalk9pmlrj09pumk800j0mc93i66keb7r2bdk9d87b24rnmswlepn477127do1r5bh9hmlvm6na053tt1hzj9hinb2qphqcfbx6rj5h0a7oh4ra2z5clxxwr2n6k36rllo5smivksao15dpnh7h2tsxcto9kudb1dr6xx60lhao9o7g3vt5z3hth12o7yg5i09upsypw3szxebrilihm0tpz1vzlcgacnq9wd2shbr880hj4k6tz09cq757sel66b9edz86elrhq8x7qa778q6g6u09kzilxkt02hxtas1x8cn419kpv42g7i7oqts3luiyx9w6cere0x6qulj3ce4ea97c96om9si19tamhkjs28dowc8opa2h6lfd1e',
                proxyHost: '8qjjtfhvba8ju5xjaqaelye6jx12sbu35twd3x8cdg0p20crp5bczoi4npvz',
                proxyPort: 6603153178,
                destination: 'unkagl53g2lhsqkms460nj610g6fb7iv7kil4s49jgkuj973kztk24jyz7sp1z75f5bq8i31frsyalhov1go14j5r8b3jz6on07wvrh0mtj5xxexq8683ra4bzmlx72uqu9nsvul4nfq0ewli8zfhn82vobvlrqs',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '43k3zftc92swjowarsq9q03m2hilhuuk4s3k6apmhorsvbyo7otblai7jt2if8n02jcsridbn3dei29418y0lspfkevpfmk4bq0ri29yffkakrgorf4c45k7ai13b9vf7zbtl7pdexsjm217qa6ri8e3lktwvmi8',
                responsibleUserAccountName: 'ac20lt9q2hu76jk9e8ls',
                lastChangeUserAccount: 'hymxus5ux55lfw5opqt6',
                lastChangedAt: '2020-07-17 23:31:57',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirection has to be any of this options: SENDER, RECEIVER');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterStatus has to be a enum option of ACTIVE, INACTIVE`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: 'hk6mpjhinrrpd3gj7ysuonkum0qls7xhnylfxms1scoa3m4muchlc2d0haif7j11v3rq5kynt2ni24n1obip76zbh6t4bq9xppadr0dv5xxcbbhwww326jd0qadd8cq2kw1eyu7lrw6rx9m2gyftaixymaeb678g',
                component: 'ou2uotvbyt8w3tpqked7o4r22k86j1cwt04m1c5gylfop52dv68aa9npgj4mmu2k65r5nj43dncgtn1u0bnsgd4zaxv3bgdfr2gs6kednlnzdmqd1383up1xtgz075ngoahkym6m2clgt9h901hlswpfmp3duixg',
                name: 'jttppfyt07ytv6qqefts2axoz117t0psek06bvn2p4uoa2d89jog1rx41w2uy2atd95f615h5b6byg1hugxqs4hudzwe4o3264pjd25ehhjkr5j4q2biekclnsvz220m0d19bj1dpabk384fsdf3ai23g3d7t07f',
                flowParty: '3v48jkwqhfjqugfxmila79x37rcsqdewb5jm88udrrdil3gegueujwxjsqd1owddj7qqmo793hugphikb2njzfa74lk6wp5plw72jip84tau44qisv26uda49s0dun1lo5mxnoofp2dldnv0i2wwzsbhw22xolg9',
                flowComponent: 'x6ojz46ecx643nefjjyd9go8b1j6tfalidtgw6nxrawsbwuxu27ejvrnl55txhvsj50y8v9tc9vpha7lesfbk4gexjs4havwp764zpjbve4j0l6ri1fawyt994640fcpb7kl85ob3dmy93njko00xjtf1u5alcs7',
                flowInterfaceName: '6p1j8jaqa3lktgpzjk6jlyhre4s3mjyby2a17qwesilfgcwtxaj3vimd4niem98e62xxjnj01lb121fdq457emt2kfet1i2ewfj9shmnpvc6pdzeiwdcji3chiv76efukib4svcuqrzby2anrldbxcrm7jmivq44',
                flowInterfaceNamespace: 'pt64u5ivh20bfu98x7dgoq5zb1wiopzpj2behjwoq911oeish0vsvi2qhwgcdxjzmd9r36deapjztknyehs5d5xz6zvx736pubtiwwjyls7a5ixcr9hsapg6lp57131vo1cj5ssj98o3rxxt8eiw0bsyjhck35oy',
                adapterType: '6ma4bsamhh1djlczrjp93uk6zq61maruvqi6ms1fc24jkwvo4rjk3e1ds0ld',
                direction: 'RECEIVER',
                transportProtocol: 'hdylvpb43irvk2fvomg5wfu5pn451uq0knmkusdnap9mv9rrpkwnq620o3ja',
                messageProtocol: 'szd0bnu19qhpoxr7ib9xvd68n9oh6eoc81gv9229pmmn2hn8ks1fj7j5dd01',
                adapterEngineName: '9rx8c51jp6axtkoqmplqppyjfnmqfjpb67rlbmx8u9ab079vgw0uy4bur8f3f6url51dvqqr07p0obqvofpg73yg3dxxhzlysf3rx80i8t5w0xcwsaknyymzjegb2w6ghiyvr0gpwslc2ellibk5yijq5czlf54w',
                url: '3im0ifuydv5nsxk2ixnqvglbiwxuwh33c1l1dqg10a48j00gckddhcch3p2m456zuw1w4vj1252dbh0tbamczedrn0at8riezag24lrz0n14j3cb5cxv42f0ciw5jjmfdjndkjmejtapbho25amc6ayh3ng1grqyt83xosag4721dwuz7exo6sb9oc01e2u5jnbn396tib9s99gksatqq157fstaf6x1c4sevflzca37sq03mzsl1ly1zk77dntgdpmyyp5wragx7a0578avr9aqt6wciyfwbzlpiwt1bwjw412lo67nu1gmr3qx7rwm',
                username: 'xfg4wu9l1s87n4oy0xt6wdz0qtd9pvywblc3j3xzsrdeucmhtjk1y2vx7d4o',
                remoteHost: 'zu2x3tx8lvr1j68qf0bg5ptglfisbtwytcl88t8a6npm0y4xdcay8pf6oqr56oiwdv9rkm90mou9ikjlysc20cpdsj6rvthzlf4ihgd6f64uq1veahr4ohqfg80ilbie7sgb5w1p2cwzbkv75x1ycmyr1i8smz2a',
                remotePort: 2522744669,
                directory: 'zg2clmmv06ph40hic9e9f1n53ttptmk17sfw6fkqm55ljtxj5pqmsgpvcuipbl9u71riuv3xnwejpg2kwkjispuqz8w6cguhft6t9fvi2ix2gqu0k0dtbmi8m06kazmqggpzldfuabidiy4zn7iwrswcabtlejbt0zoms36qs3yd10ow8bwgr4bmlm0ltqg6roihyczsnezj187eosdxjirra7ckx8anbp7fom3p5i999j2qchtw8itpo7aidpvv8e6oo2kbcwqgzbigdxz2sovts4oix9vrjrp34kgdg748t8t3n9xw1wfegch7gvczd2ira4zwy883p390tlerk813gcxiff8u1vydr0mf9zf4f8vken6olrnq6zzgolrfl0jvurk4roi6q297fu0djb87gu5x3h2mw6pvashmaxffl0dy1p4tembmifu5nz5xwk7jxuur29yjrkg8qaz274wg4pk5ilw7crqdvnpqxgme752upkmnrjzxipxqn0yseo0w21qduw08tbf2xytt59ymxlvlu7myym3xboedk4423r7ti8psb21z1txjetgnumhjn5p6736wq7qbhuiyniv6y54ghfmrdazsmgf3wexxqz3u99yk7fejmo75vxozjxy7cdr9ej9wmatermdrc6wj65iaqpa03cipek6ce75skj3mikssut147hi4ijry29d72m3chstbq7vxkmqbslbuwgn5m173615mdp57dasd6wo93yxdvh7b8rhrfo2hbpdx22dpx956m9pu89saw0nsi3garwzm345sa702p2x91iizvcabvaxxpxcjl1z6zip3fq86genp7mxdsuub0si4t0k7pdzax1y18nha9a9rh2ely6nolrx4szmw3p5od4302zczyaol7qkbwzdhfsgplw3uvx5s7e03q46bwtom771508iiuf0sxajckb4rpqegy46noxthgb9vqzz5xt9zikmn1t5o5vuxc53r31bd1dtm9ek49tjc4pazy7dz',
                fileSchema: 'hsyc3nwn8j9r2dcsw9697wqk6rvbg6fuxbxeqv71zzhjquxwrhiowuht4fvze3l200bq2k16sat316e4nsd5d0oszaagu6p7vg4p517qkm9m6g3plnq52lv0j0b4mnnc8ul7i5lxr5g6jth9tvedbfdwrtzexx2cfk6qkewjjbjbqxbopew7cwluetjun5qx1z4tehzrn5dabho78l7gn7aa0f2rlrt7vkf1s4oh2plqm3yqqqhz5fzcst9ms48nefmpwizwbbrs75a4jjdwodvryw8qzifp2ndjmj04xe9wswzjby1s7g6wmwa8fnmhml3e32rg7jqw4wri5fey1gxqrcoy6zt7d36s4x31q3xx3hdpswtn6e4fed0ubryy1o83ov2ojc9r5cxxz49r7yx77rexq2zoq99q3g9qw4te734inqqnv4mhllu9kfrdz4hypvmeytpsoy5qaxcrq97e91uf8ogpv9p4o4pg6p3o36b0y2lpwfujegd4p99w3plxgi3kt56oe6q76xipcw5lbjll1k83gyj4nf4mi02166fpzeumgd95pjnrq4do6ar317n1jbtiwo1v6qf13mtas0cinjz2judx9d15bvqw74wakywx8k30so1iuaxhtj3xvmec26k0xf8rhj83gv8qplf4ocowd0ycd1evgai1lwfqe8o5p7o99bbz1317x722wysaqmcy3sukpuaenf90so3aw9j0xxg6jeq8mvw46yxqu5gewvee0oag9ug9ue2reokwx3psfbnd1eie9m948c41st3ojdgv52fpsd0vgt18tikl2h5ja0j8ry67qj4q2i04x7vevxj6g2ppmso24sr84xyrg4p8k31inxgx1jul47l4nw1hl6ja6sj5ul121xurygg2aippblikyejr0rub59d6yt1dyylrvwqoqx9jlp402mio6yxbs1de54pd7ca33ykwuu9bvlewg3mngm3mbop7xd100q1tqhvmnqm7ojazo4h5ek19zw90',
                proxyHost: 'rihyyeupm6xbmpw6cd1i649z0agucidgsd29l1xfnptl38461614wcmy61xa',
                proxyPort: 5032808813,
                destination: 'e9v9ezbdk4abs76xnjemt1oixqeqel6m8ntq33vewk2h7wdzybpkqce96vkz35dsms6zg7m5bp366afyjla2am92t3n8dz5u997lmwjq5kxl1r8pepymek7ty0ftx8b4k7i7ufa7xlcd9wn9wikgmucsivfisu3c',
                adapterStatus: 'XXXX',
                softwareComponentName: 'z68rx3y1m9ivmupn4uk6v60a3a53x0gwn3atsjo08x1zrhrpkyri9htjxlj81kc9695iu5n2qiciip5miutn0vhjckv3ki4kia12afyw8m91cp8qiguun18fsb3pjun5x5col2p1dhzzbpfdi7biw4oc4y70bwd8',
                responsibleUserAccountName: '86eaoay8pn7asv15zzvf',
                lastChangeUserAccount: '4a9bldona9u5kr91pbis',
                lastChangedAt: '2020-07-18 16:36:13',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterStatus has to be any of this options: ACTIVE, INACTIVE');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelLastChangedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: 'm396k76zsm34yt38k6jcnifztfy2dcpvvx9sadvzonpdjqjos688t0lclkuq4zfdo8xxqu35sowubff5il1m5u85k40mp81qaqth0h648xtlra097cvipzb7srv61672hd1hx7jqq4q0o7bnwtqyosledrl0ous5',
                component: '8vh4hmgpmh111reoq736oxuyq4dcmajwaybf0yboedkwjq5oh4crw3a2nzfxefvynmqpk6xzqjlatzjnb9iurnq1caazcugrcxkx14zwizodnqbzdbx5hub5u1objq9dk5m4w129js3ft11jklawtm6pmlxrb14h',
                name: 'x8g7axk7gr65ds6kwn86ug3lkg6uncku3sluaokmkb13h1x85765ypgw4e7hma507abng4cc2ovt2rcc26l30stux6msntfijlsvk0g1y8mq0z7b9welpr8wc6fzzln4uqs35fwngn2jsmb20m4kv8hvmk5pmxu2',
                flowParty: 'vd3k5w6oq80vja5hydkqgokx8nnf33n6slrsnybro9yqmkreyc66kr30e62gk42z5htpfqty5s7zep533ca3hahcy452kn7ar3xbuwjtfuqio690xrqjescvehpz9uv9fd0v8a6g6ak2d771snp9b3hfc4dimcj1',
                flowComponent: 'yrzqrqwojw6vaqk9ye7dnlka9srg23a2k34ayfiagaxu35mxxr4cacj7vh82bungzknh3r8qz3ewhzrfugreugwll38fsdryyyjrh3w13zlvebgaf7aqbk6u2l3irisemmfzwup5biinjw0bxdnxerq9h12inm4g',
                flowInterfaceName: 'a2hxu6ccflztsp2c6ksnh5qmhzr7ew3bvi5vx52qgbhw2j48q5n64axwp3qnlw2s6cvf1vxjxicj6r4puvxh4phiouefxm9d9q6xlxeri3v80s6nqipl4opehg9x5dz5xqa6jb5mtaaynig9dcrio12dwxoukyk8',
                flowInterfaceNamespace: 'xtugmtdqv0fvldm7t5cwakqn5tdz3kra23l1afydzao51itexnvqpbrw8i1j17iyovf4qtra79bk76at5j5qpyri4uh3iviqdrskdly93mnu6f8dvhln078k3dae79t5j2pj8cdralphsgeluudhw65xxiowmn9t',
                adapterType: 'tpzqnjlfeb6h2wplc876v78olq8cc5u07616i30hciezk9hm6ih138i15d9d',
                direction: 'SENDER',
                transportProtocol: 'u212bu8tt81jxdlgwgxfr4qwg78inun84m728sicrxzlso483mv2z47iydln',
                messageProtocol: 'ofv2wtxrdq5o914koyec2iq41tu68av1sd1g3gml5jopei8higlwnuuaf30j',
                adapterEngineName: '7ktef8r1pwt1hm64c27nk4iqkb17j9kwgktgsxbml5lf4e00cthdpp11t77m21zb7jbdupq5zu4cyukxxpbms3ri024pkkorug39na539nqtcw30zakfj2eruxv7q0jriafe4wbmta3n3u1ayzcnah64go2av60e',
                url: 'h5005l0oc0jb1f9sbjd6act4v6wfy9sjh29wd4u0gc4graeazj81sfwwce5qog3w5yxvce83aum36yeguym7wg0vm0zxryecg4az79oaq9qncar8wk112ssfyn9zd7cud87qgjpip9grd66rmkhlsfq6ucbq1czg211ijsre2cw7heggqrl6i3bcwnzxzyoe4a6otpa605n0m69gsy9tt6lty162s9gyql6ihw46tpy7m2rmsw2ddtc6jcx3iaohk1d2qmkjpobciijrljzl0egyumr9t4my7u2glta65c484xq5n0q4z03reptbcze3',
                username: '2at2aq5xehc9qpobs7pwt6ulo5bao672kd5v3vg1yzbyd9im8e4z659pbz1c',
                remoteHost: '402wdndh83zfjs0da6oxn3yjymw3ifj8bdplrjfqg9d55b60icv41e27pa4tqsgnu86ezvdm7gwmcpqlevc6e2d7790dxks93hpqyndyx3qw6dcjc0n9u98jmj7ivvugddzql8vhk9levdgshaz9skbne8rottw6',
                remotePort: 7050263003,
                directory: 'cf60qv75yf8xo1e4xoy6x18w9aef2abt4voiluevwvoxpawuiwfuwjafi6r8of1f1xxriy50pspgn7nu7j50jc5glofzmqed8ho6dye53z2tm3t65193sr89wp1mpj76d9o5bmze824py4hioqf4v9op8etnlfmcat9ziunygchvrpbdz9qp0x85htetjo3qe2rujuy3ulamskevq3n21bbwcqd1xui9nnsdk4gzbonpimiv96zmrv6wpe4osui464n91d7d5g3vfhs0q5dtdisiwtaizx32yrfu79zukkdl3l47thwk9die1z281qjgy0wzujivoob6vs8d2zsshs6b86ip8d50gwxfxlxtg6716vhody6tr4x0f0t9v6lqabvy621e2mbt6g1wm4lcd5wg89h3gtwkpbik1phllbiyrmxmlii7uka0x9zfs2r9v9nmx55imqc9ge1mqqj0sqpaxa7361cpusmheets5tvc3tm43y7r4ij82yx7ldwrju5d50w1etlv8o14dxbzv0srxdjkxpk2k10zp61iovrbw7k518uyo7j9y6rkvm9pmc9z72ed4bgnbbb9g1ny71torn9q2yuwcq8yvuomo34bf2yty8u0gr3w4aoprfdmo842267nzsfwl0swwa4xvy8x5ecncnzhuqxcgb8sqn95chowq7lukh111nxtdh14bygljxds07dm3vfdyf9j42n6tf3jow8iw37n7e0lykresomh2v7ja6l2xdyopet2c7hp6gq7ugyckov42jbm1c41fn5zfmt52nbovd7gjd9lvtlabdnxpgmozy3db144tu870cuifs79qbpljf4exsf3gapj3elrcug5zgymvupd8iuahlmf8bedm0dsw3ht0vr6zwy0zhhl1pognlvwui0ksnif7md19s65vmtva2kp76r7hufsrqy8n55fl1w2r94jnya23x7rsqoz764i2ar6sscb93zpswolvfj6bflgs5dze7i64r631r4czzjk',
                fileSchema: '31u2gg9qbbovyi2xtufm31l1v9qvrwr30xmpvvbrs3gw2z8l3vr654ya7klzcw7gby1zdy4p2jiw7dplg0uln4o69dny4j2dx1aikbixufohsb1kc0yxzxvla3t60cewf8hzg11ollv4vly2tooyz27ri7di0sm03mpdp9gc98htmlavnkbrfhx1lex0wcmmukxg32l2un9nl56emsze1djxovgx4ykxyrvlynwhk3gwuhqxzyc8i5vzenf1rauid48zdh3xqze10826mterz73cdu1mgl5rtnemtg9gwdzs7l6y6f0n98g99pokntpzwin6ld57hpbehoug6wtl6g28yoitcaup8awl3hwxgy85sq6a76fqb6l3yffr2ik2pilh09oazmgv9vcf18s2qzggulfh4pzk8q9ofglpaxrdto4gby3eeq0nuq7ac7oqw4sz0sh22rn48qfjbix98cvqgbd5snae368h0xdpin67z6bwew4ku2vllnboj086t6oof69mn09e53qvif4if3birueovwkb7d7p3o2gfgk5he2hy7zkumm6lzo3emiixftlgtikox76zuhi2qtc4o3vd4xcprvuyr84codlj8cawo4j5y7npe0ua30d443bru9ag2b9etipf6oxlp4w57poezjxdln2m05xo2fri2nnxtivwamaampunpcfv6qp83tgrnpvqxj70mlcdkwguhi5qhwdh770o6ht42fxw84y7cic6o4zcjxfyxrovoiq1nbjijnr56hyphfwpt7z46zwtkvikv8ti40349gh14q4wzawfhkhw62iknm1nnhvca3kh74fkpt0jugcof8qzw3ocajtiiyn7ka0e24fmdc2wnbz33k5ld8wxr89erzdb3pefs2eby61bsjqmujg0n3i961lfvslppalavqi49lx4xhiy0buymz1f1sjm01v6mbofwq4hsf4pa5szv8r8k3ojfk4yywb1zpdrcsxnfnfp55b9y268noajetuzjjr',
                proxyHost: 'c47q5veyavl7rz449hgjpypcogxgg8cqiuxnh9tyye8cftx613ndfi4w022q',
                proxyPort: 6947783606,
                destination: 't0np01j8kjqusa4m14kgozuau5epmnig3w4bpvrmjzc4i0hfvhn5fqaqvufa5mm8lg7zgc2ks3wg6a3lz9o11haqjugiwy6pksalj215era4trcozp0fjetkfvft2la9gfuoik57h9vpk37maqbn5fycqemzp2ty',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'rf8ltwtwc3pm71k43a7libjejza9y5wvbj3ydxjwhmienisba5fmvb1vrq8ppqutu720lqxnx4i6d96zb3y4jk3rvo3cmjatmxxcjptlsbgq9wmpsifnqdh4p7sq1bhzpnywvdm6irqha5k05a3gy1y0hri1qo00',
                responsibleUserAccountName: 'zamts4x53aqsh1wirq2f',
                lastChangeUserAccount: '2m2edix5kfewbqikscpx',
                lastChangedAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelLastChangedAt has to be a timestamp value');
            });
    });
    

    it(`/REST:POST bplus-it-sappi/channel`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: '3dp10ehn29s5t064fxsuq5mxr4s6h7gqtsnc0y6vss1ml8602tic9mhuiez0b2nst2rxbooqbwfogxf0y8xex4jghs15zm6lg32erbdgx3sbkj5xvulviueqs44167ofr5y0q5j3l47j2a16k86oe0pvrsk9h58t',
                component: 'tuvlvjupopgwtu84w9y8x7t9pdtk3c2xpyx3qvm8a1bdzjdt9kd4p468t0qtk6552yqu14cdnczs6rvf4ooelw69d9grekv7a2avagh2skq5ltsgesjunkz84ftgeae9i79610gcbe026d1eng2wbeau5647rz00',
                name: 'ivps971yjnd3b0puza3llsu9q5u50wrt0z2ijd3l8yqvgioomnx2mkx1jc13e55enz4zad12aliuq2csek6wgghyql65y1fizayxpr55oaovaeihmhhu9g7wuy5dkt5f1m08ekto93yfdf86j7v8xte1806sxc32',
                flowParty: 'wewkh8ulv3wey7vevf8fe0vtyhcqtdlwxkw3ireq7bp3phhkootv63igswr64i9712526znyuybs2pif2nkhmhi3nocmuf944ujihp6ptttpaq1imlbolwtj5cpvt6qf3wac87t54h4akyaoy9qvsy4auuncdi6y',
                flowComponent: 'o8ubv6nw7abxmn9v1n22b8lejfi619sznnjhqm0jn389nu6rpqslkx6zpcvauzfxqqafqqjrwovqjn9cui2ouzd3kwcl7wn9djob5cu8jii6k6g8pjpzlae3uqnuy6c05832t13lpc306pxhyumtmpdyvm7r3h6h',
                flowInterfaceName: 'm9abq8rv616vbgdfuy92kzo96h3utz68jcpebz7qyt9b7x0uq2fzf1z0rsbtohca2fzntgi4egit7sitfnpp3u35hycuoz20ij0zgkdgg860yq7406gqf2il1zrngs5oq78y6z84c7j4368adja21xs2nwzub1k0',
                flowInterfaceNamespace: 'l3gcgcumvxw760el0fr2wks23uyor4ked5zz8004bxkcedixchmjlwb5dyxkb554c3oizpmxaong5iab6n66b5igdn0o9iqn4ut6iqc3pxjqoki75ixq4hl3f5or7zifzlynozjv4sjc9qzc9dg36wfwukkorauh',
                adapterType: 'nm1eyyyps4p6kzfkawi1ektgnilkh62tf8jstotgskvyrrkv2vcc03k3uj6u',
                direction: 'SENDER',
                transportProtocol: 'bech4qs9iza7pba4ki5c5l3edydgtl895iklfbclo05anj300p5s947mqdms',
                messageProtocol: 'zxbfkv8pp9w6bioz0qmzitt57xj1csp3wjj1lv9fnmjh4yvgtub244yifpwu',
                adapterEngineName: 'kazt728mutk74tbnj79i5g08m9jgwdzmhoflecg0s18z15fwt0six6u7jox3y9nhdru1xucnz5f4yv1l7natmt495j1peg64e0t053n8d72z6vmlt2651me44qijkb1oovyu4n9pbh6j5ws34svq2ehsb7mir3wd',
                url: 'l8dhe7gv6v736zox46d2s1mvn73yzmq16gn1j9q7n1s46agazx87tyncfn6wbxp7axx88pqi0capvv9p3ungcn0xthb1bj5rcocegypgtw53myas2223ybxrzlrqm00xk7gimkvx03efklio5kvq6obuf97ahkpn836qmjbi5pa1azgllakoxbsa5yxzzz8r71o8c05u3k3sd8l4cujjzh808i8uxl312hu19fq3y2wuaqxz4j87otk9v2o3ovblyot9ti69c145gawcp223amti1jlnqirkd6oc7bmek07wupe77o500q5f0zxnx21m',
                username: 'mdtmxdystz2zbmdtketm93rg4e8yz1i8qa0sgqhe8od6fml932bo8m40erlf',
                remoteHost: '0l9im94x64zmcyjej11ejnq1pko6d4zpyra7tofov8w2w67tjn1ww43ngwyeubtkvf95rz3sxpx8a1t0jo25lnqm8y01i4555wqfx12zljn943ntcrncsj5d1qxrhbi922ncz7xcza8ryzfp5ueu4tus0c23ialo',
                remotePort: 2629899431,
                directory: '8xltmw1j1hm4upekoy1oynbjxolo8csxeupun1psbmf8q9y1lowz6eevs6nirmt9trr1uwgaejd87lll0pjo7jx6ok5xcry0pt5vvroqfm1wv60j11s7ufsftttrsizwy1nu7rrjiut4gcpapuuyxkwvuifs9r3ne29s74059m529ms8ud7pk42d8oo51ss5avskehlnd25od26ro65qiaxexhhoyc2aqezz1dgn5n81c93lqagrugj6xv5b9ior1pk1666n3dzr5u7veojvqf134l2t3a5i7usgnnq2hdc48z5ru6a6n43ktm5ntwrkqkqwmp3vsrvesvdxp5u55fvvgh3cpv8rthaxi7rb0nehg2rc2kctlb2xh0ldi73nn05ttnizx87hfifyitb56ilfugdw8105msavd9hxhtbmm10axzxzsxvnbcqfskpmkoowj6tt8945kbcxw29qkw5tkj169xhhu4f29tuhw7s0tijbo9nuv28mtf91rznzrm5yh0fdta2fyvha8isbq76a1p5v0dszdlp30cmvhobhrusa15yo59wftgv16oojasnm56vmbvnvi5u7tag60h30sgigq3desz1ebm8sk5brlawea2xut5x9ww2yg9x8lkrv1o18le7ct8o4jnqtgsuctruotxglvyhgp68csa5wne0qh518v06mcdhli4g5e6uz1rad5b2cgw1um9z9auqgu1m746xzvyqddo7fv2vm4jh6brxhtcxz7ea97n8of01wz2hdkw0crc70auor8zgmtdcjg1l5nxqe2nm7n8u6n9i6asdfjlzcer7c9rw05wax5cyvi3momrdbt2gm6qcczmtmr24dvjfgadaw43mfmt6iow8enimoqkw969mh94za68myploc2iluf4lvc1sbya2stxc3pjce6913gw8bemsyf7qvq7wyi3mdkdbkyc7qcifxtdu129n3pok4dx5mxxyfkg6fg5x27ex8zaibs3xyc2dppqq6bc2zo2gs',
                fileSchema: 'h7c1t3hq44q5brk5jxfdhh8lhuugxif3a561h1h8t5g0woz2m0m5xrqp3dy46s6f9ilv7m02xgpdumkbqlwtffhmz2f1mhl167fvb90w29o2gr6p0ldgxgimgogom31bs42snn1ubvymq467h4siio9smx9pqp1ky5pj5ck4a27dcphr6k8pz6rye2ekf3cs16ecmp58q7p51wj6rxi5ufok60t7joghzn8fgiutn1brlw8da3zut1527k5uj41ywsm9u1qu65leournkayzqmb5gha412kmp4mumfgqxkgthacg0h4r0nulh43crd27yzmpssaco7ii97ierh3eb01fb1teugchy9owjuubq5665jct60gkppf5cdjv1g7cgeaye4kocfbaxj31spgwqtykcz51tinpgoqyhu43tq81pxfxdk5lb9vig7gwizrcr39p0p9no3yigzfgre4bebsfhf95sdblcvlbee7yb7h179pebyf6gpy492srtnxx0wgunbymwky7bxm73dt8xthxb857zj9obqyx3k3a0ygu19pesaeezu3jcy8h2xz0l9q13iogg5xyr960lbqzxwqf8xysr3kx7m64mdxs7ejv44e52gin7knyvj3zk59ff0y9w92zo1ucywiomixauaqmzhqr1qk5mjn88swmg1mvp4c9em8e744xihxl4au14xfrhp3hxmajo2qudnxeihuyfk67d24nwo0m1twd63oc897dmm3qbh76tt9a8fwrado1z365ddbo46rkybp9hx87oyhxn19o0l1gfhx0axwk41ep5b53j1b1u0nvjt7c1de4fr6flwo42mq9nmv3rpe3n0b14to60dkwwdkc13iq0ly8yumnuigpqhh5rtjjkselryh4qufm4b8vqded5amcyo7rbyzzs0lgcv3zh8ysdiuzbbd07pr9vmfiud78ysd7j6mdnckdwjul1yc7gqm7s0gzk49dhg1fx14dhzwgo9tm1psq4o1l6lisrrxb',
                proxyHost: 'u4gd57vzjef0ea81i2gtkj2k6vq0336hy1seiyk9wsg5fnheq2opbt58o4yj',
                proxyPort: 4330590517,
                destination: '1uh2pob3cp8ypmejfb63v8071u19gegcyi0kmdkzoo0y6h3ht70cpbe5lj5krc9xdwc2xxzrkvfb1126zywng4vh5yee7iaxqi0q0zq85tynacff78rggjpk3eqli74mwrahxwqeinmslr30p3kesabfqsvk1fz6',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '9ynqb1un6k8fgg5rguw4vni7fgfof062ubc5c20v0vwrb8oncytulxkzdwuy4563xq7jkxy2tq0ct6gvaf712bi2jtiqnh84umzjs70s0m1csqwfs5w8wkwztqqygsw1qe7dwcul7rviky8d7qt7tx2yf2fkshyq',
                responsibleUserAccountName: 'xsv1ebkogo6y5mgpe7b4',
                lastChangeUserAccount: 'drlyx4xadcysioqok1vl',
                lastChangedAt: '2020-07-18 03:47:33',
            })
            .expect(201);
    });

    it(`/REST:GET bplus-it-sappi/channels/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channels/paginate')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command: Command.OFFSET,
                        value: 0
                    },
                    {
                        command: Command.LIMIT,
                        value: 10
                    }
                ]
            })
            .expect(200)
            .expect({ 
                total   : repository.collectionResponse.length, 
                count   : repository.collectionResponse.length, 
                rows    : repository.collectionResponse.slice(0, 10)
            });
    });

    it(`/REST:GET bplus-it-sappi/channel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '00000000-0000-0000-0000-000000000000'
                    }
                ]
            })
            .expect(404);
    });

    it(`/REST:GET bplus-it-sappi/channel`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '227dd6b3-43f5-46ad-ae48-6b31543f4d7f'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '227dd6b3-43f5-46ad-ae48-6b31543f4d7f'));
    });

    it(`/REST:GET bplus-it-sappi/channel/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET bplus-it-sappi/channel/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel/227dd6b3-43f5-46ad-ae48-6b31543f4d7f')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '227dd6b3-43f5-46ad-ae48-6b31543f4d7f'));
    });

    it(`/REST:GET bplus-it-sappi/channels`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channels')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT bplus-it-sappi/channel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: '698e7162-1e12-41e1-96b0-8f33856a2974',
                tenantId: '62e78797-5bf0-4170-bad4-07eabf917384',
                systemId: '2860d9a0-8762-4643-9cf4-120937b927e6',
                party: 'yqow26w5d7rzbd9p13161s40hsdmv0mq1r5y31gkdjupvwgxwn27otowj8n3q0i9dp99iti8k5g64f6kwk15mcyx2xpl9g6an0fb6w8g74ifvefgkdss2snujdfngwahz5036cgilpzp11zhd2ze66ktwkptiix2',
                component: '1cdcdl5q7va7ang3vk7ffrjxuc8k1y5d7oitwfk1zl2xrmnmv7w3xiop38ecva3kzyofxbrktj1ck2gff39cif3bb36omm98uenft5bf27wekojwk8p1bxdxrc6pdl1453ramn0b6scrrrbs2y4drbd1mrr1hkjy',
                name: 'idt99riyno0ltekwhks0rljtbofte2zc03obav9d0b7eecimmmnsk3nzi9inconl7r0nrtu1k6mw0ukwkgfcoi66kajox74tnpjt029qwzog8mxzihdyxmvesoa8fzthpsv2e62rted5514tcvylln6a69p7rci6',
                flowParty: '10tbkr9vyk856rkooc1g0f4ncs1ari8emamb8cggrxw3ufn8p2x5ajq3jz8zybsequ0075sztj7mlsckm0druuvdf43ludlqr8n2hcbl8sgjxq9sn9tq1jobbtiw26r2k61slzvxi15pl6s1ffrh1fi4ztmi2e7v',
                flowComponent: '4uosmg5sw1euqsh0wbiotwj1glq2hf6om7ieenpm76yk6v7498fp56qaniiu4pmuoapg8sciizslaf0gqb9ssx4bjoqq650jj3okyjqankb2e2fbv2a8fqhpbhk9v65kf7yarm9b2h3jcbyyoohdsseea7ets8ru',
                flowInterfaceName: 'i5xengbkt3vzxgx4s5ln3qxjnle6i7709uh4qbozc2xxju1yn5q4lhd4arorso6j2pq1ow852tsubqi0dz4uc9888i6efeuczenj5pl2fyaav7a9w8z58rantxhrf9nlpufhxoonhbskm0c1re11dlddvfle43bp',
                flowInterfaceNamespace: 'vbbn07h0xbw1fvrymrosc2sptwluo0nj0ah8ktf01g2jggaxhvxn8unu0sgi3vu5jip2ut4icsx6a6x3wlk5kwqdduu490v9ethgdgwvz767adb1xq1gv6e7mrc0msjpgwuvf2rh26l53yarn4uzk0gv3nh6jig9',
                adapterType: 'v6n1ovu885h7p9i050s1korkhvl9ifciixfmjn8f6hvsdrujhm202p5y0jro',
                direction: 'RECEIVER',
                transportProtocol: 'vpwuotmin8kkggd6djich8yi86q9csaab3m4zyncnxbnwkq2v00rhgngvkyg',
                messageProtocol: 'jt3afkgqnjqff30o53avbvkwzbsnhxu3jsubxxehnruue3e9y95l8z6mngjm',
                adapterEngineName: 'sk62kfkyx6k3z4oa2mqybqmkbxnpur4wlwrutb17nl55qa9jquxrykjz8m93fqp6r2ycevp3q3uvaephbln3e2cj9wnih3pzb6ksn7copxn7cy3ljgw1hq59ron4kk8kmf016adfufyjwz4im7yoenrurfzaqrfm',
                url: '5uwtq7e9bd17ijld37ogrgif1cpycm9w4o279bn0dvq4uw6pc73kgbzxh2giuvle5z5pni8ggc8x1nwtpzfq9fu61f7ifk9mruaikeu9q8hmstplhwkdbtwalp974z4hrkmtmm1sz8cm37prn79sw2nxkxpagr590el3gxmswrz10wntl1swb1krq9eysuowb1giqdd2htn2du9vh25yjgryn48mxl53a9z5ps1vqy5cvhkzy3kg3n5cmexes4xg80bcucfms7mczshtbfeohlh8t22yisakbp7p847l8vphagqgpmvqdg1duxpwagx5',
                username: 'z5vnkwuxz8bl5c0wdx1bcnvtdz4aosw9gurzz91picgch60lzkypk8ne6ohy',
                remoteHost: '9i9vlbcazamab7nthkohierhnglzzxe49v6yrxg7fwbbarzgrf4m0e6ps98zza7yeu3i8ch270lwzccz0vifcbhcl8jda6aon6m5jyo4vncu5ri84wm7g543qgvk9lrvyebnjc70uyz0wrnr0jbdz0kedwctd5sr',
                remotePort: 5265785950,
                directory: '16n5i4sdnxpaaftmh3cexprtjxv4ybn71p434t2kymyacb55catvdbj1zr96uq4qqdqgpe00jk18139uy0ufs9wfaelib9t2qi8s6yb0oqs6okxkbvnv6i6pwbutj6bfvdqd4bdqjnoimbmzgoxu0wmrtu07eizz8u9lpx9tae0ll3mb6ze1cmv8q029kl4ivjg9fn0qaiip35dsxlro1eaw83q46nxjg8rx7q399h8bsoy4vh5kg7h5zlcd93y49crxoxddarm0cgvsj27d7olhbw24n0eewaitlk5r3pnm0d9zr2g194txzfgk2njwhd0gzbfieht2o1hrlc346l49b8kn3t57ge2bwtqmk3fhisea4cv4f8dznryjywy54dap5nxech3xkykxgr6uezrzfejpmhexnyvq2ysy625u48nui5lzfrjdg996nm0qxuubvte51bynomjikgiswtuc5nwr0n2q26av9qx04ahupiu3xunlwwnrutwid7muy4hal4kash54cwnwm92rq0jucsz755m32adaldzxpr7ovuxafge7u339pgj4inq1o4kkltiirg9tmav9zcs5ffdxqdbw4iz6lzfyg42nqv6sn2uivj2hfb689nqa2emw3ayqsirqsajltwejry5ffzayb2um3heyko4ykho67mku96yfufocufqkkryfxskw86ugc436ki9bluuy0i8p01qkf705w6srk4pgx2fe83wuktj9pel50mjya2nivpnh29jbqulaed8ckmkaalphew3lijvdltfqpfv6brm6677l19bn69193n6bw1z2c70v6rdo0llo5xhj2223qghmk1qq13s5oc27sn8rgs830aq1e2lclqr7xf5vq7rnhhub1rwgj8dprjl13ifz1si7ch9jljliuf5a5fymbgodonb3j6co2c49ee49t4sbbrm1ykovpa5submu52w0xjeqhceprbn81rr9hnwzqkgxkqd37fcm2ztvabgb9g964l1u',
                fileSchema: 'sp55qot954n5z4km88jwdlyw96zl3t7osd91u7n6r21yxmjd6muq9z3dkwls6wmwctlrmux7logzvhde6rgabscptgepxh24gkjt04q2cvkjni5yzv0e0klxyprz0pmpsrjiqg0rk1zhvu9wf1u3arvkwnl80609ymy12gl465lob1lbsxi34mcldij8nmazefujfuawetxmh2801phm4nyjlc6rm65mkdybvv0bl1uzilsn1xsjm8zl0vf3uaca7hrirzkz2f2jlld08z25fq46colmu6alxpt0gb4kiz2e6p6rwfnx9ysa9t4zugryf2mxs2hufm858z6uszm9iu594grxn1vdh6yaeb161djj3vdr6gld1h4otqx8245asgub0t7ped2dua5mqwpew8ggv7p37wdg9f7az9z2kwcoskghivmq5avx14sexqjcm3h6e4c6hzd4noyr9d2xqd9v2mw51aboxsnh8hxoogfga0kakeb37gj61xx0ehg0hvysw3kzqqsjgg91f8hcshevuk93ce24on37exrcz8oxdjj9ta16gw3f3m8tcbyw834vrmryicud4q2swvcfinhb1av4zin3hp9vu2ntxwdr6n5g0zdj0srppk927m3gj8h04hhp8khwx70kdwzs922jyrthf8ddneeintfsiht4phcti8sqw4ugk5ka4g5z7zzp4c3r8je1huxha7cat9f815u15i1ydpxpb2vjvzqxc9tepy0rq3hkcyssxbiqo0fczd1ud0a39mjdp3lz5si07xk3yuvkqcq8hqv0qalti6bx7gp5jyo64m3adr3larus6lmbvpnsoxcfowtrb7ya4xi4qpunjsx4qw20ebfzwsp283meg49bb5op94j6mgay0n4g29kkkjdserc3ox6b6yrt705eln87h9um9qqj8vv64jhehihg8mk0959dni4an5v9fyqaidl4g2zu7mk0b8xt2wae65eh4227dgmlytbzn6186g8fvjf83c8j',
                proxyHost: '6uxdicbntg3ifez2ey80uc5n5z11i1goulxoizrp8hem1ky8p6lngmz8xhyr',
                proxyPort: 1958459574,
                destination: 's55sjytbsh8gjafokpeledzr83dkantp09v9imc8ay2t0cc58z8gauq0bxr34niz8lgndtjxk0dgb5xinlejww7ixxjujmvirvtezsg3bgumnqf149n5y0h8iqyru0r4i06nfbcz6e1tfm3xz9oora7kc01paq6m',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '8yxbkeckxsgmechhevahrqeatk2va2o0cszmqu9n111l2qgge7z6e2e1iu2xkj744djg3azxsh6jabgehn636dg9segwnmo8fkib89wist35ye697gdvn0wy7sx5h6kpzq4iw7kj6o7krrdk4j5l1cl7c4nuz5x6',
                responsibleUserAccountName: 'ufhce3vuniubao414qgu',
                lastChangeUserAccount: 'vu9ganedq732zgbbl0ew',
                lastChangedAt: '2020-07-18 00:00:09',
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/channel`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                party: 'snmr4hsrn2ztkqvv2qbpl9f99s9eeis8p6199bk32oe534mmgywz2uth7qgyaa7t1p6un61gtzhwxe56n5u7sdxgnicebzhea05fjjfktc19exukqs7y5rnfpd8aekzod4kewqhmopcqckk67sajgkk9aiiwrro1',
                component: 'n347i0ox44nxjr1bmsr1xyucditp6rza5cgsn55tjkzt5sz2gjorjp73vh9a7926ryn8okyiy4j67thgazvxssvnlqv0z4xvfrmqm8hvz3vxieb6wsrbwmh94rd1xjisi3msutm9inj5khujwrod35frmaqnzwlg',
                name: 'js6j02spt3rk4f1j8elg4yhsgvwcrdu8rs8f2ug4lpm7516lqunpe89ip51gxnq94392jd3ybprhxy0lmobglfo9h8shp530kcu6mwsiue8htehjwtp2hfica5xojgccjkp5pb3wpfsy09ulonwnea5u5p3uax1k',
                flowParty: '8hwbjd9o5adg95fcts0x9pryct1l3f7x8fhxzqn9qqcprgbgaeo09cw7v7d6033pydzqlbq4p4pq8w3jlcdeh0f2qxrbznto372d66q6jp0iw41adrf9vr4j798c91cms9befoxablb1k8nbsrkocjkiau8iajgr',
                flowComponent: 'rid9qhczequ9dh2y4dvv5d32zg6499rv9o0e0q9h0unabaiu3l3jdioqh5am8e02t76kdfy13klttphkmkb4w8wjkfglpjfom446kvsplyq8z66whne4ytdzpkvtcmfp3d9cfuakp7aht9wiu3jxgo4kx2hv50gs',
                flowInterfaceName: 'wg4v2iybbhcstptgwe4t7nvjh5uz58kqc9y6s42g0koep411pbda97g0cebc9elnzkvmoq0u8d575s2czrmyiy4tta52q9867pvii0ohqvmr2fmgya5fihcrtno7lsrbfcozcvo3cta2s8851iro8fr3dkf0nawj',
                flowInterfaceNamespace: '3anbv1edzdc1tf920g63o4jd5qumc1dktg5mpxqbdwd7rlo20ku83wxqq6pev52ddplpee89nmqopk04oppfwpde6jzymsf0olvson68pwt2b18agb8ev964c2o75myqnss12e05861wgu934qpuunsov5r6tpxu',
                adapterType: 'vfzoozbj5c1z1p02qicdb5y9sjbodje3cpmo3o19pyvhj4z7xmkiinpegac0',
                direction: 'SENDER',
                transportProtocol: 'kh8hss2zvt7g1b5nz9mivpxfrq5yw9zc80k7zx06f0ki9w89lwc8ielv8mf2',
                messageProtocol: 'd6hwxsrv11my1rptm42rkvw2sm4zexmyun5pb36cfud81mvfzi5nluy68hag',
                adapterEngineName: 'hdh8myu3ew8gxqfbm0xtpg0gpybwq6jwf94brpbsra3nu0r5w3qfeqepbnwb2kbey7nykp0sn3hsivsrlr18qgvc0dfrmyrt90o28xhiezgspzz7mux87lbbpqy9hjgw8lm4tys9tnnpoycv447c9oxij1rbh0zz',
                url: 'qvng4oafinzs176g3d1gnnwi42tc2n5rw47hcwxv9fu4tzzyhxby87k7h0cf2p58gmx6y4h4fmx3fr5nv9cnn8668t6wa3ublpm8wi5d5jerzn16a3pbdt07ro6bzlw00fir60ars0aa2fgyz7so7qkl3omaj8oe7u6lgeyjy4f830krsnzbp1s12wpca8xoa68n3eoodaf13q55l36elb1roqz1po9sk0hkc3n8ms4cwrg4wqb4qhdhxfwe59nw34pdf27vc9jzctkaxsq9u2nl9ekawa0ftl9undon5p681oek17zomkuj41ekkwze',
                username: 'cxu8xyscq8hgw98xio4zuxpb9yrtae26dyur6847h91bsnsy3o2dgski70oc',
                remoteHost: '8tnx5gd6zdza7cl41zjqdfv3fdsyicmlu6zky6h9i98gl94hdybj30p01kzz9gkvqmwy77o86ozid3ujglzdezrlt7zkkbx9dlzh72hvhdw11iwhjz60qqluceb6i83qv24zo3tf527yvtpcbvs1b2el0xbo4t9o',
                remotePort: 8180060309,
                directory: 'vspmcfb9w1tlc22dcy4o71ulqtsn6yr3kov50whip2abhcznquqk5kxxiyel6tvdnhf9xekufqgqwqhn3rlmx49apyxvpxymbqad16ye7dajt2qik5ppxsxrmb8rwje6c93j9bbjs641l3r2zaoatnoo8gdfv5gu07p3tgxwjw78bjusucsl5e457hmz2wp8dwox69xedw6sd5dntjo0daufh417c48cmwf35kmy6yn9lnip4nl9ulzovd91mvl35fmcojw80iljl5dp4en4ikpgmyk9pskyxco1zknxllxoacpagholnybeulhzjb6ua9jz0bxubrsqwbeluln6sm2fbyh6cbjlazqpsysnxkn2rxvzt3l0uuwj7uivwrk5lzi5itf9oz7y8h3oweu7xih7vkh9aeoufbp4d9u7hmezakdn39woznkqlkdehwii5bjr1vffu3jefz8okfu5tl912yg8qdbjj6cixcqvmuayvp6kqz99ywc1ekoy3y2mo5oifbykvoogen9xmm1pl4v36p2sthjjpy1v5ajfzwtyqpnb8hayzybhu94yki0in3nvfhduu36gi5y2gd35or1t3rryor3x5wvbadjxgkdbjsu8mawatwc7ykgyvlz743l8atbjr1j59xf60rxfvmsiwyf99ur5ospwtm0pm6s82zw1vp0irrk8sfj0cxmmhkwkdlmdzqzpqfv98sl1icyahkvm4xmqyydxisfkpyrkzx3bxouxgp7yu72xh50m3mj6a91h5fwb7baev92wgd4o08qpgsvzumkun04d0a33iu5jqzuh2fd7fcju0oguv7yvlm507nyd4x41fw22udnsvo3pyz4dx4j191p0a8xdwc6a7ev0q3vu28fur8a58p1j6f54wb454ak1r8p5nv4g68rpute4dtbgw10vpeetxzhf33ra3heqjyge1fnkraolutma8b4f8d0dcslltq3i4umh3cr4n7vf89jmffcdcnfbzwx1tfw1vsx8ejao',
                fileSchema: 'sicivuecx2rhet91ineq0xablj6inz0y4ysatza91nhlg0se8gt53yc4s5pjsrm05sev4mm4bww5w7yofvg1149ks1vdcbx00beevr3fo12l2nik50yel7gp13u0e1p362w49vyjclj9hcm7f04xcgwt4iph2lykr2fp8ziih31uf89iq2rvy2ni3akqj38c4lc1wqheprn4a4kmg606w8wl4cut142k7x1ej0uo7htaxu6a2fjxvzqb5s4tikrea7wzaj00as7jhxmx7xv7pl7bk63vbesntmrwkd0j6pbyxh5nvd89g8hncmazf5jqnb3f11z6br9edml7g6wveams1rfle0hqhl93qty2exewkm8ep25t41fdsxg0ru3eo7wsgtxq35nbtxzop3w3zj9879syn0kczifua733uij02joki6u6indjfi306eacjy9538kv8mna0xpls03trnbsaatgtohqk7qq2sb1pk51cm0xwumosnl4vq8uag2scahoi03m529cr4tspd336nc43tu4bpy7okqrdobq75lm8bblbpvwpcd58tu2t3bpmtyqfy1vs7pyti7yu6zry6ci3bq48fno8oeye9h43nqxckgg42elyamj6s39484gmo8jfar8fejjxi1jnopb0jsp24fgb9mnsxfaki6xgpnmj7wolvcgnyxo0z7xn2xmict01yvhlz9y7bnthhproz2by8jcdcfxlpt9cly4v44sy02cxwvti0yhi20awpai57n4gkj3yt9rhgs0xmh17m32fsh7qytl728o2lrqmmc9s6zx4z137om6npmxk15z4e9ys6ze05p17lvjlamygmjs5dmkqccd5484eaguvksfm81pjujwv3k3d9xozw4te2sixg2x5zh59p689chmmb3dlw3bdjr2pvgudwinjo905cuwz40n601ao67ezytn9d840wbxiyimptz852qpowhfo3sgriih1d0m423kee8v4eca8nzazo5aa185vvbk',
                proxyHost: 'dmcaol4ftebkbd8z7ehh97a302sjozqmp3gpnblze5cpxv6iav80nrjps5a2',
                proxyPort: 8444583557,
                destination: 'dqrtik7oure2w1i9wf93lddiogstprdpdi9v80ln8knx1e2jo2k03yatgdzzd233a19xg473qw9eky9qs0u78wdcubgwujtg8ee93s3cxaj2phlq0bhvia16tyiuqnxpskzkq19rg61r3srarvytgsregp5gff7h',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'fwd3tof6ruk99suokblwtlb2gc3sj6atz7rn6bjrom52o2xxfc68rpnt4lvq9uxf9c1q0gzkt9pb1iqon3l0caqdikka6a0jvkbaal6dz2rytonh7r4borr41mmjk2p5wdgcjw4j80v94r36y3qr5dcxnob5gcm7',
                responsibleUserAccountName: '8tlgtbf3aldipptmeyqz',
                lastChangeUserAccount: 'fscu1s8y7yc0d4l319xp',
                lastChangedAt: '2020-07-18 06:46:10',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '227dd6b3-43f5-46ad-ae48-6b31543f4d7f'));
    });

    it(`/REST:DELETE bplus-it-sappi/channel/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE bplus-it-sappi/channel/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel/227dd6b3-43f5-46ad-ae48-6b31543f4d7f')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL bplusItSappiCreateChannel - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateChannelInput!)
                    {
                        bplusItSappiCreateChannel (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            party
                            component
                            name
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: _.omit(repository.collectionResponse[0], ['createdAt','updatedAt','deletedAt'])
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('already exist in database');
            });
    });

    it(`/GraphQL bplusItSappiCreateChannel`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateChannelInput!)
                    {
                        bplusItSappiCreateChannel (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            party
                            component
                            name
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'c32810b6-762b-4636-b083-ce55c35d5a02',
                        tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                        systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                        party: '47jbkzj8v43gfpryxl31l9fwktz7a4byqil54eive5w1cr0eao39tf8iocbn5tj76pslqstv0sudoxl17suhudlb6wt2plgt9j0toya7l4kk1ay7ao0d5lcwpg0yot9erxkp5c1c5j2b75jgpdwhb68u9vje1mr1',
                        component: '0lk4easl87pkrgholwl84frlby4klefhskz3jxgrvrc7kl22kbtjnrsumqmqwexz74k5z1kfh72hdzz2uf3r1y6ppal3ikty5yglvlkn3jzuis9bf6x375ax0t7q0q5s88t1ss9usauh45ig15zql1hn6v0pc0l1',
                        name: '5qn4kqqwe6bmwtp6ki8ceemtxlflnlbzpipyf5ds0lamalaw7y74muw5gu8yh0e2zjm6f68izs4shmvtbjerlld3rr1btwh2ipyctmwpwr2klael6tmn2162rsx3rgzdoo7chxinorzlbu0i0zlgl71cvm5698w0',
                        flowParty: 'r8ysr7l2w36i9t5ghsmzhkyjfctojm75dmdrr78xn2ziehrl106lh1zea56ip3zw9ktj8gjb314y1i2dfdif0ax0w1ibxed8uygcdax0r27hs8brxxjuxh7d9rwnhv3ulrbdqq0ty66u5iusk381gbq6fbxjcz73',
                        flowComponent: 'kntjnt1ey9zf99jt3e4h31zuh1mecbz6j4co6ojo79qnkx4gmy7x02030j5b6awpo6iyy1de7x8tii8d7y4qsf8fxzn8wsz6hn0nsipnso544sv27h6hdsk3dvwfcntcywwqu8tcyvahxfe9dn81nbcjjobt76u0',
                        flowInterfaceName: 'dphx3xidzeis1vsmm3bc4ws98hljo4uxkimonvkub5iyuhadnm5c3mklnan9gzftqdaz1uar3g6vt3a0elm4d9kwkac1cqsj8mb0aoz61394bgr0favpwa525hzyvh7jhmll5gyizsuhv02ucxesnnl6l2tl0tw4',
                        flowInterfaceNamespace: '1hmh1dpk9t0qhddlj6fju8dh7qhzfpommi60ztrbg08qyd7su2ovk3mu6mvi0b3vagyqimodp9ryszjlnwwbjiy3glx8w0wa8j3355m4qm6fg4992borea8dpguymd9dj60ba3kxxy89vi58m4hsv46gmjwwb67b',
                        adapterType: 'eqaiihm8xqvmb38oddmdtfey6mz2tdihw4301ecjtyxv97oihcctvucgny2g',
                        direction: 'RECEIVER',
                        transportProtocol: 'dh8x0vgvztmkoljwgiuwodzhy6r6us313xybyi6z5rb9peg96iwz3sw63a6d',
                        messageProtocol: 'okg8j5pbcmct2q507xriv0vxbu4yre9x2l1pa0indyobdcnx1tk01gr806f7',
                        adapterEngineName: '1h714k1q6w0w3uffasbso7w8rizjaedtmzi203246lw96cb6wpzeozo9c9gxqjak00l13q41j2vemouy3r2drp4108rgcczwwgfx8t36jl05jsayzqcrwxv294wavxym0kop3doj746lu0qpvkxhl3pfdpegcmhf',
                        url: 'aa6966wqk0gitz0kkoho5p1k00cx3tqov8nzud4akr3dletowxezkjfvgxgtjdswgitsip35jwjlm8905sv12j7oxsa4e3d4jrckuu2317eby9pz8iw4hr8ip8yri6s9bfg45g7fo9hc07fug8ebyvwru649tuctph5x87f4ktui501lxbzsmmm88z8n1cp753hy9g0qyj1pb9agev1it860949gxad81wag7dswvdypm4b5luwwlixh7ushdn1s4z2cjhtdu96b8gg2lhz50ai21r5zomz8f6ntty2tspikatdmh9f7582jp7bcwmcq',
                        username: 'v6dok1qpocov3bnhhvgx561rj7qhrpn8t200znzmb1s2x2nehb4kfifys3s8',
                        remoteHost: 'g0vb4ava0y0tukjxqovhdldtahj61wvro320f01d3d68fyof1bhnhteg6y8b25rqq7hy3iwmjnap32ha51w9vpzh176m65alel7uav4vnf7cutm6yrstwfz65pkwd450djdmlyx9a1sooat9chhngittm1g9o3si',
                        remotePort: 9985335566,
                        directory: 'i3i8ur9nojiwfy18frn16woizo3142xpfk51a3uyis7ttw1y8fqttl60dxglbt8hctiomwdqgm430pxh0qdcngbayvtak9ml3xmvy6xycoyc18jaq61onk93ng8d78jqwah5ola0e2xuajwgj1kj0ib09mlxe5s89r0uk0u9cb5olomkyv66wwabomstncuydwi1cily47vksn6i25br9v7f80xthsf4aqfe5t79hvxbcgtohi7y67dzh1lnyyvyxdpsylr20pdueo47zsf4n1talokv1rt18zpn70f0sq3q20ru167zw3no6516jeoueo0hjmtlt6tuma983m0gf2ry9583mprww1j1nron4dh3u9jab284ym6nez3ohoxmmaqdpv1dip2irjgf35vj0w31u9dmkxdcsq0i6il1hls02kjb3499mbbvfb3xyn6z7vblat5qc0x0lv3m2sfuffe2p1yfjw6vkzi9petyraujit9atq43mhctjl5y3z2sfao40yawdpgr9bvhribt0biq9qbvissnpldy1a2pilqxqlkozt2lk9v1kxzol7bytco245mjh24tiq9zvtpkbsusedme684qpovq08jtwf1qmup0wv4or5f1hu723ewdoa3cqly573mj0vx9ud30tf3qmki33d7jelo7iwkrhfxofgnlus6d76tjbxga0q31cps3nszoml19pypc4is53sv4chqnfs1two1gt8xmdsg02kd7ybxkntg1yums1lea9xoaqroencz8563twpyncwo2s6rs8he3xw1tbhyzmb3z63dph6uaqkgjmxf1qgtobw1wx5ntc5ex6c2f9ceroehmx70nwdvn4219791d6rrvlbf7svo8hz618rw84gz8z7654wxf5j93zn3qtkh5hq1aloaw5z2mxpe4ob3luaosh47lb4weu9kxy4kwhvphi8j45zlyjpxts4zmcuzvac1a14twj0adtakcpf0061618duzdqd9oerjjk1dm7y1',
                        fileSchema: 'e5rtipifn0ed3gl7a2bppsfmjotogj2jvodhurp686pywrwcs3mbm659z9lnd4gysfipgrknutuqg4ezwqq23zmhoht6m9pw8n9qb6po0hi832fq8jci6z0elsk1udz6w09xbww6r383ixgdf1w4346e2ns2eeapxcbi5q30wpflkqw7n5dz6xy49sjyt3j8pph8spiage2xkqaib7ilhd3msrlgotv89orlywmte5jtoaa801cnh71oamqgjsebgadaqpgye2uey2pupzwe297q7spb5mq4e0ml43zpm50pm8ceejotqq8i4u6rn6f4po6wvea1lc7vzgp5v6b8ufgzpczrj5ya7kybq9pdzufl7zmu0khwagsi6bzru0ndrrth8t2oka7ndt14g56upge91w68t94morhsg7654q2bgxnt20ohanezjzfbfo4yo5igsrhdktriruc66fqtak4m2x7lh125y7jb5gvks4lnsip99u7omre67cpr534cnvifqjqiuanv2ds4jae0v4cmkt2l2w2axhzro0alxw1h52u9jovc6m81a5bxlr7g00oljx78nh84yurkiah2361ydktwhum7lam3p92tjuala3y00iv0f16wqqmf62j25rmrwxsoyvkvsfrd4qlncl3rogglscobexqy29rjtk4us2fnch7jmkcd5mj874qw0r3zhsdoaspztdayxabbiqz3oiet0qbyx6acdmzfw3fsis6dxgkufphhjmhh9o7q3pkqu0mxmdtrmrh73themq4nl7chtkujcgyp29esrtm48raed3e5ks63dtopo1m856xzgxsk284jy9b6nm5iak13vb3udt0dp4p5f2csvhpgnjfxryxcy38idlcusm46vu6685vg428lzjpj2kj7xu5qxh970jabretvnyv79l1ei7cqi7wsacvhw45ulcox9r9b0xkxfra32ck9i3w9y44byyy2mjmidien31yctz7k5oilg5ua0j35p2h1vxre',
                        proxyHost: 'o4dahj85w60awrb92zpc97r9uwkx0q7ha8fqblb9yodwp7uxf1bhk4a8s8za',
                        proxyPort: 2471857043,
                        destination: 'l6qpwz1zjd793ohs0tubb51pz5r4mnvt64x7l02sqou24h386pd8yqqy1d87zr8e6dhvwoof4gr4z23iozdgq8825deduzbwk7ib02nme0k572jy82ioh0wjucdglbdi75glkxidn7w8lnbfdjiut30mdmb4q3hm',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: 'dwtyfa6rt1vs1umlevb8dzwupapdveg78p0wv7ydqqp3kb6v66jlq8gyhlc9hdhnc2xzq21qdme8oq6m1o61szvm86gh9rpu48ci9rvu7labfqn8ax70kh39vx1z5rl4mf1h416j06za3nl59zl2e0a9fjf95vo4',
                        responsibleUserAccountName: 't5e2cwhwlw1e5w5cbyxh',
                        lastChangeUserAccount: 'yrz8s439ev4vd2w0qw58',
                        lastChangedAt: '2020-07-18 06:25:38',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannel).toHaveProperty('id', 'c32810b6-762b-4636-b083-ce55c35d5a02');
            });
    });

    it(`/GraphQL bplusItSappiPaginateChannels`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateChannels (query:$query constraint:$constraint)
                        {   
                            total
                            count
                            rows
                        }
                    }
                `,
                variables: {
                    query: [
                        {
                            "command": "OFFSET",
                            "value": 0
                        },
                        {
                            "command": "LIMIT",
                            "value": 10
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiPaginateChannels.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateChannels.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateChannels.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    it(`/GraphQL bplusItSappiFindChannel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindChannel (query:$query)
                        {   
                            id
                            tenantId
                            systemId
                            party
                            component
                            name
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : '00000000-0000-0000-0000-000000000000'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    it(`/GraphQL bplusItSappiFindChannel`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindChannel (query:$query)
                        {   
                            id
                            tenantId
                            systemId
                            party
                            component
                            name
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : '227dd6b3-43f5-46ad-ae48-6b31543f4d7f'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannel.id).toStrictEqual('227dd6b3-43f5-46ad-ae48-6b31543f4d7f');
            });
    });

    it(`/GraphQL bplusItSappiFindChannelById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindChannelById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            party
                            component
                            name
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '00000000-0000-0000-0000-000000000000'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    it(`/GraphQL bplusItSappiFindChannelById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindChannelById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            party
                            component
                            name
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelById.id).toStrictEqual('227dd6b3-43f5-46ad-ae48-6b31543f4d7f');
            });
    });

    it(`/GraphQL bplusItSappiGetChannels`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetChannels (query:$query)
                        {   
                            id
                            tenantId
                            systemId
                            party
                            component
                            name
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetChannels.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    it(`/GraphQL bplusItSappiUpdateChannel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateChannelInput!)
                    {
                        bplusItSappiUpdateChannel (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            party
                            component
                            name
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'a66060e0-33cb-4950-bdab-a3fb1b91dfb3',
                        tenantId: '1e106c5b-ce0a-4e44-8ff1-c74575007f89',
                        systemId: '888962aa-d0ff-4a32-8753-e004940e6590',
                        party: '4w7tasfhhwlp1jdf4uoo2izak4i6xmb4ew13lapknblmchnv036icscz5qs8ue82p3zwou2h0im5hr3jpv8hq47jxqz3p9f05hevc9wyfd63nzulq39y0bzwm3gs0jmmb3qatka3o0dldknx2tqhz6kpgp632ih9',
                        component: 't5gigxrne4xr17g5pvyv2yi35ik6m9qpocv5108uezis8h80sjlb18abljylyninuc2r2vfb1tzzpzoh8ppt2rywso9sn4m8nt7tc7hft1utul5q7kvieu8mi5d3pshhxoxl4rtdcgkhzkw1x3wb0hh01hhkjq32',
                        name: 'bwn1ey16nvvulf9fnjgpswfkb0tjzoitgtod9xyb2ob9wj3w7axlvcmhzrco1pftavqzz0atmeyapdvidgl1upayxsdaj3py67k3rf7nyvftdi0mz9uoxd1ty9t991o4a1u99zdiygn4z7ddt8gc9alns1noqoa8',
                        flowParty: 'j8n8t1st9vfwuczu58g7gon4qez5weo52bbac8xkjutsknh44d091uar7sx0lz2827z92anugik9q4qess2ib5wtpoy67mnzzo0yw7nahtc3r2zfx4uzxeejdkv825xlxp7fbcnjvygolagwby5d1qycf0o8bd1c',
                        flowComponent: 'hy0g8lh6qp3w7uh8st3cap1rhirduzir47i5va17o35i1ngq17w9htuojeprav0yx8b167sb27cxtbpae52etdx57e5p2kgiqqcbe4tqq847xc4er68l2ymh4f375p0jf046n74i535bs6wybvfq6ya03fp43ben',
                        flowInterfaceName: 'ntt6fwhjb5zcfr9nq6yo2uthjprwr4zfgan1kp7fvfk8fqqeiejweql2439delgcxzql4zo7lggvnv1yzralo3emqvdkfn7gszqg71jmxli4k8d2n4kfgnza46guw28k0rokga2k7ga96gkrjvlpzuy0sonu56eq',
                        flowInterfaceNamespace: 'jh3s4yum0g8e07co0mbok7234ojal9t4tk09d5fopm7cmf4n3rtwrezqlw7qsiict2kuiq9qfqbp50ql2f9uq30710gw3l6kw6eezlvhiou7t35vqg1dc1rcszbw0riv30ylcesmdv75zxuypew8q98p1hter4l0',
                        adapterType: 'q4cw936fbxmvdwgzqun3tzwu4vdl3ytke1rmz7mwcx46g0nspx7zc7m3b2w2',
                        direction: 'SENDER',
                        transportProtocol: '6t1du9s4md1jrih6oh4t8ve5mvyknxd69zjhtk4f3sj7g22wt23poo4w4k5g',
                        messageProtocol: 'ovjjwijj0r1u0sqgwenrkul2f2hcre8ujeq1hn172te4q9c8r87zlfogmu02',
                        adapterEngineName: '3nyvnvllumn9l9fv4jt7mosu3rbvxjdyc3tpjpv6ybd5itnxyaif611xuf6xvsskgtz0yic4pv5enzvxkww2oye8vc2qk2hr5wm3pes0nbzog7vcr58wu9501b1duw5x5y5ixzavprezfcacsvk77blvboq8d498',
                        url: 'rzr36uaci9i4a096nww88zh8p3v2rlqjkswufhh0wuiu3ygi7xbyt8zhkvwzige1m4o2062mlf6zso51546bbbf1zbq1bol0uh8xdjsun5rfecu54u3kr1abnqp8ga22q1o872xc3qcdxrzvo6s2avidbrchym5piavs565n8kgf8ppawv1c0oux7cmeqqdz212libxdmu6kbujp2cxc8fvefg0nz2152rdyuej88j3bdmaibbrgcmthu86bhhreyb4exbrjhka38kdtjoc1izecof1bwyi3kq0plwic5hmgepzoqamfywmjbfwwopkp',
                        username: '9sgiti2x2e90glw2jvnl6hl2zkpwmkl211ddtzrxywviktpag3mltqlfuidw',
                        remoteHost: 'cyt34srwqgmqnlg5m51guw2b0sb0lg554zbjo52qflzyy1h4glh75wcm8m50x8fx3ivpbzzhh54gjrvea6i5eq7dl98naztjmtltc6f3i8giiia2vswo0x6k21v2dlvj8fvtfcnh2n9pygock97wqq93f5mpo7ra',
                        remotePort: 3613656532,
                        directory: 'jvshlu99ujmxwss438maje5hh2fynrx0n3y9zmt56cr6fnt3ultnbtkly316sfl1lxnp9i19pggk2niqx910j4bi3edtwp9h86cjmvtk1s3j64rfgeyuxdgljonx87ulry0j016yf5f1r38011pscqs2f4196hxmi6sar0l6o3ffz3rp06knix35bdxb66zdsivnbgfv3u0y7yaoighpl7ke4p0nmkfv49xj0eyis7lawmv6d3vn1gxnj2jwnsadtwvt5vunblwg4194f8prhiy420y1qa0yjkvw552u4d5xsvithcezovdfccn7lyul4pnom5ecee2k8amujv0rghpqzartkoahwbqqokv7thikt3ki7h2jp46dt1yqmwstv3zb0acukbs3vlay59jov8w2ubu8s0ivcdbqgwb7k4nr8x44uyix4yyz7nf2oynlwp6t1wdlhadpcjpdk71hysr1tx5061blrdlcvlxjeb0h0y3o2gmjgoty5ztqm0yj110fga4ncngdaq357z8p3cdmj4r5mzvaihdoi6zx00ccn4tctfdjf9639d3wj05d4z39p49hme1wlnc041sh1jhozrw8xii29tqg2nvo24d0sfkhojnm3a38wh2of10ey6bzk15jkir2a896vqmnrtlclkxda5jy1zt70w0vs203r0im4rnsvhicitcia17qn83zkconzu6n357qcx5t9b6y3nvxpvzunq17lvsba0dyx9x24gzk35jdby8v3t5cqydzg70hwc2db474y71j7pwx5w29yue51duuy7ez11ola85sg0nf3azwq48h3bsftasmpy4saj9c01feqe74coj2czi9z59cw1orkl1wf2b92am0kr0ii3awmy22ewrnekdxzae5r7mdh1xy355f4culxw4rsno6n8d5sm5yt62qt6tyu4tdhnb22k9hd3wan1hvqqp1yob3p6zrvvlp7covkufu4w3hppm1cse5cycsulby8lxmmd1e5q5hkx3u',
                        fileSchema: '1ra3a2parndkae6jhtbvl6ce24adskf5vcnvdishifyl43ytx19is16huzerwloq9sgnwa9t55yt0ovnmgq5eelaycwez4lbol5wot2erbpuexbt0ufcpulp6um1zg1nue03cj0xw3iamz2mj1mk6825do69qfb5upc19nim51fzxlkdlee8py1az92099amaplnspv643e53sdpe6m5uqpoqr35shutqrqlwqp0khmhxzqdkrhvr7zja3t8xyl99ttg4p6e6mtf6ra9xx1o71somd8rfkov6ywk5cp0kl4emz5a5zkazu2wbf007m21znovz7pfx64xtng9ne7tkyb9pbp4bx1ccu42jki676rz1g61867n8d0xscpdsksjs4wfbijt024du2toc33n9dnw6frend0pbp8oojihj5yc0dt6i1x5md1i8lw02k3xfystktc4mhbeilrlbuc9visw9aoc3pyg54ncx60dkidwvm6h33q4wb5oaa9pl3sks87clzfmdslkkmcc8hny8mrzqsw83fmwm4vnh529ou6o4g2p96q1c9imylwfl49qt9usb7a2vb09f2bohvpw6wkhs1772s1j2au9hqaaocjeu1jrypvgxtmhlbqixo06bv1odtlfm64g0nzz388b4dho74po1b892ihpvvf00ke90wt455w75crgukld79a06z1fc13ugzwcpipo481xdenbg6euy7lb6gaclsis9cmfh75r7qw5te2ktwlvm5fivqrt7gn0md1vyi7570yilvp7jbkt2u00j0jlw5cz66sh1tt4bg6efhzn3boek3o9uwlqoctgmopsqmppf589bqvb5wnstmd1ebbimwwkzftntolf08a5wndr5776k0zftfury9wcalmekd4mfvby4qg4kev8750kmfh5yxf2mf8pi5ocdqtak7pc6p1tzp5xze0jtoifjs7c6esn5iohzk7fi9bfm9y1cgsvm7hat6746v0lfqveldch847kwmr5',
                        proxyHost: '0sz2kvchfhe10v6ihxwof7qnxomv1uucae60ldw67m9l2vfoqaih65lyruze',
                        proxyPort: 2248820936,
                        destination: 'suzfwbmmsst5447y0kawo0kx69m1re4dgd55lq8wxnxa2gqlrvy2ml6b2jl1gsitziukdn7ex80xjc8q7cn7ohu3mcx9pwy5mrx4ahl4nd543972uediz71qy2z1beh2sj31pw7s9cvujvjxlqsrf860dhmxcyth',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: 'gyiuwzi2eqofr8gyobfjc5y8vf89zrtcmq5uzdme5mzbjkrhpi7aj407kbi1f1o4va16iaw6aecnxwf4gwqeaou1jvtiebtqrftuetitetypyc6lbfjrmj3yf5oqnhowcoypa3x1003y2hfrftu3gsr7anl3e4a8',
                        responsibleUserAccountName: 't2kc9c5tzxu799xarap0',
                        lastChangeUserAccount: 'r4m62v2187aa4vomwm30',
                        lastChangedAt: '2020-07-18 10:20:00',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    it(`/GraphQL bplusItSappiUpdateChannel`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateChannelInput!)
                    {
                        bplusItSappiUpdateChannel (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            party
                            component
                            name
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f',
                        tenantId: '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce',
                        systemId: 'dad995ab-8a20-44c2-b73a-a37c488191c2',
                        party: 'ws1qex259619h8z89lr8kfgfarrqjpzmol1uxyyaouxahhpizei67ajf9gkjvbvtdgjnjw5o99w854kbqn97dbzlfa30uizu1kkanvirvevrciwjv87ohhe03f8daj4zlqkced67rqudoov8ackl8efjztwomu3d',
                        component: '1gahi2d1r654i0hplcbillic8krqt4c0yxan6gkexo3bmeubkrughru9uc04eq45gjrbxgb1nmr2zb0hqa20rdrp9433znq59py7hu1pnrw5ui7anp0h26c9c56d3r34zwd88khqphr4b4y7gb3urphx0xde12bb',
                        name: 'uzwcop6ohmsazecmo9qt49nq4erju13sa9kmnmpwms91fmfldnch2o4cbw3s6tfsut0ft0qom2mn7zo1eske5sysgehpzc5h58et9xk1idlvcn6u8c9rc1wmiu7t3k8h91v5i2a705fkn19bqy8o4ncxr12o5mw2',
                        flowParty: 'g2bdjpv38z2yl7ywe9qngi8efd5lid5748xyy2e719gzcirgfh7fs8bre9giw182wn7btw9oewvzxuha3oa1pvqro8zw4bjuwxsc8rt7kvbqsn5ho8l73rpz9m5z35w1obsr40ev1kmb7flab4jsvxek3pzezw30',
                        flowComponent: 'mqqff2g09nff4esbxeueuls16l7m0ct0y7wx0ut6z9udx6evqrxqnfbkfoxbnkcdkfljr2x5pwk4o5b4pueqsujocduzuuqlcorjydnbeailmmnkpe3h7uem71aunu93tww68160fw6kmf3r7vwuzz2a4xgdtle5',
                        flowInterfaceName: '4k6f1r52lc2u802meceh4sk1xiuw3vyl3xbt9aowdt683jp2b3lodhrrg5tyi7qyvbqigwyvjvwv8h8z7hb7yoq72nu297e2wnvxznj093g8784qnl5pf17jhzp83ow8pv3tnjn6earfrly70nixe4kh448j4ta6',
                        flowInterfaceNamespace: 'z0r8wo251sodse9khmz1yjo03hivdspckmnf7xu8987vdug652r69opzis95u9h8dtesrk1ygov0qtoncwb50je3c4qve1uqvdam679oobk3svqnfxm43e739e0ppb1fb27er0eo1luesllxiadv8m0amiyqsqkq',
                        adapterType: 'eilmbq9hzjsljjsqohfe37skprstjmzfavqokxlhbtcbkpy1owzh4nqo6hrn',
                        direction: 'RECEIVER',
                        transportProtocol: '4ez6ltq22vmt2s6j7xqmmvfwuhgje9tv6guxyeak9htmi6i5oz1dqz0sjjjt',
                        messageProtocol: '4hd8gk8fzlf2yvaa8ej3fsahmqndv2tv167zgu8wfnjvx5fgjkz27in0f6n2',
                        adapterEngineName: 'jel8deytfc7fousgnjs8xbqeczg3dr7acudq7zu8bczrtugi3xdo2jgcfujxyf0n5kuz6zqyzobg2ybiz2ymz1dlcwnsg5w55xhuhaqhxwxc6fbb3z3pc874teh35cm2m2z7lp1qg0lsjcqxy0yxngqbo8stvdrl',
                        url: '1llmh0ao9gt6sawb9jqvc4t4pswun17ketb6hgg4z7y49hjhpow9ctblr5njkd9gobp1nhruudq56urxfdzpsd6ep86vmu0uo5sqoi6a799lor6klsjhnfwl3v7g2x8nhaaocyj9b59z05sqde6zg9naa2mexbvbapvywr2h1bdx70dyien7swqfzyrgogn7qio3lb36xt0gqv62qi44jf2sxbzf57bwghruhfpfbh0tpmiikw2ngwswl1445kjtt2k605vjoibwo1vvjpg85s9ctn8quecx5r7f9xcic4plnw8yyvpgwm245vz3vn4g',
                        username: 'x054g982u3abu624atje98memmrvbolgwhcdcowygyt707g82g6k5rrbraei',
                        remoteHost: 'bw6495fc0f69h11zwz1fuwwgrihz4brwtn7zihg6nuqkejt4dcolt7fo2hgf8a8e6b2ex8pzr88lhc4j8k9xjydnfrz4yjapg128sq9uardylu5hkf61ukjsi0hna5zy2qgzm6xa9mpg1lg0jbxzf6sv4snyrvsp',
                        remotePort: 4044036516,
                        directory: '8xczfhiw3oh6jvbdx40khbo0tgzzhhkyxn9ky87s9erlk51zm9nyvn0u8kvhnxnck5bdr4vpbm3yqr55iq9sxga00948alvf1an0t5f6tz0x657t8v8bxk3m2ithos0pf6gm7ajq5ycbfk40jt3pp8s4lhl5say4vwky6gi6c5k9dmh7g66f5hkwro1rn4oi3lx9w4dyvkfiakfw6y6v15z7hxw35pfm46djokwkyoe08giz13iir29auqzvxoi8o3aqv9wf369ciyr9cz36i6ww5euy1r9okqbtfeuyft92xbbcwbj4tqafii63x2u0si25sfh0q6kpxuyu0c6gsb9k3n4d9zp1mevxnu4m33egghbbwir1xn831qp32iykkm8lwkn5r5momco5usq7qp2099kp3a9vja8zfcjuxlgbms6nbsfnih55hqxnw2ebcrk7zfhb89f0xmxlvw71gzt9itf0e0ew4gd1m1v65p7rquomocd1bv419dm0qete58t8efibxgfjrume9n497f38j5gwe6ianbxofbuum3qf3jgo56zbj73k5a69op1el4m41txc75oxk4sr6msvh4v0susdngqpsx7wtknsiwsh4ll4owyqjdjgm7d5j3ex1hex50g17dde3bf4kxcgq6c5k1mtdqxg4lnezzs59p3ft2plw4m0wph2sqd9lmvimnw4ls2xau4cmg31swn7n0lrweunpetsc1zwlf2ofhl4m5ocfz41evs90nvnd20lmhnb625sfyhcwxfclmmea03jm2145ibktm876eaulzwik3682s33xbeeogikbc1p54k6onmxfr4b3c4vzlhtf98ly5ta43p0o1574fiuul7lf5al0ptch1cpaa0cg3cpswq4b2fxqpwr3v67izobo6f1skz8d92fv8csh1nexe4qq04oafaitj5o69wktnpov8vo4tbndppwtkkgildded0kd6zwpuulg2inh37ghooqaaprh20t2e5bgm6dhrr3',
                        fileSchema: '9i3c84e1zlzx0m2pi6nz033nxd55j4rh8kew8yn3cflxghcr3594281cx03ctk2xobitmhqrkcd3ica68jhenhob8pyjycip2jf777t0e0a3oeahfbd4zgm9h5entagafraevofh5dwtfz9zuzfxnyygf7usgffuegh7n7rrqf9weib683g7srv9ys51y3doovv1y2bjnhlm7uczxl2uq5n3s1olqk8vja27z8sg502wmbzvjhi00rxb9i0h0pwanul14ho5vf45qll76e66zkhrnpmmipq6qqhghb2n58oa7afh5dubzxxqemzeb8w8gwpuqaa2kfp1i30r7cs94zddh0dvy05ias9t60101elxl0ak79px8p2cjir45poeby9tkf7gs94w6x46whxmhexbieammo1owa5jlqjz1oqzotavux4sf3dse4os9c1ksnsjzi06ycawltfofw34s4zru0scaus2w0ojm2z8vzd0b3pa2zf0nemugkxb10wauin6xotar8ga3uli795rq1ofc5yova6lbdws96b6m7n7h5k657nv5glxd46w4h4uzg7b32yartu0ksv1925a19n4u4mlz2brlm6c2741f9k2xc0vi2rhg6qjr35oljshe0mtd3o9hb0ejrs1dyxw6htjsopjht4m66cb6b9av6llkvm97h0zdoqauqkdve9o3l56czpv9to098nn2szd92xkab3nkwxboexhl5lgz8keo3eqhxjsb5ltagyermuro3mxd2bp4nq4acsw8aygxlq117g5f5774lsm27ly3qen8aid9ttmt9dbmstug7avdcz8jkzel1ouhdmcdqxgpyw6u2hxlptnhwmqdxfa04jzg0vabw481s4x9zctpy66juvp0eip8yewiea81epe23e848t0patpa7glijx2squggrefs31n02xj4815kz9bycl8ncvwm3dqqu0x59e03wtk382ny10egkv88v4z1d7w9tnoz7g9gli8x2u4185s',
                        proxyHost: 'pgsv4bd1hotcoo764x2igxoudj52yr9ij251aofjlo7081w8558sg4a41i52',
                        proxyPort: 2022118443,
                        destination: 'bldng2rf7a578u4ef7de27bnz7d210jqxyegt678d1338d1cv3z2kpj132yz0w5twv29qd2e9xv9dbwjzzrn848yoc3wgvt4cll1w8xs2tg8tz22p8jdhrez1e74f0lr3xzee8s1hbq6hq6umytev0ivfa9orjg1',
                        adapterStatus: 'ACTIVE',
                        softwareComponentName: '00kw211mhy33g66v4jjn0j7iqe11llbgutkz85ayp1aoohus0nac30p84yzpyrjtksbpxf5mxilz6tnvcj5gw9487dxk7mole8a0rswl23zvep0i2fl4lpelgmn5r30iisv0g5vnhsoc0recp900fwor7bpqc3gv',
                        responsibleUserAccountName: '05msnu1y83fs7eqxiokz',
                        lastChangeUserAccount: 'fx374gl0muzdl5fzex5o',
                        lastChangedAt: '2020-07-18 02:37:12',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannel.id).toStrictEqual('227dd6b3-43f5-46ad-ae48-6b31543f4d7f');
            });
    });

    it(`/GraphQL bplusItSappiDeleteChannelById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteChannelById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            party
                            component
                            name
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '00000000-0000-0000-0000-000000000000'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    it(`/GraphQL bplusItSappiDeleteChannelById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteChannelById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            party
                            component
                            name
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '227dd6b3-43f5-46ad-ae48-6b31543f4d7f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelById.id).toStrictEqual('227dd6b3-43f5-46ad-ae48-6b31543f4d7f');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});