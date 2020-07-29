import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IMessageDetailRepository } from '@hades/bplus-it-sappi/message-detail/domain/message-detail.repository';
import { MockMessageDetailRepository } from '@hades/bplus-it-sappi/message-detail/infrastructure/mock/mock-message-detail.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('message-detail', () => 
{
    let app: INestApplication;
    let repository: MockMessageDetailRepository;
    
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
            .overrideProvider(IMessageDetailRepository)
            .useClass(MockMessageDetailRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockMessageDetailRepository>module.get<IMessageDetailRepository>(IMessageDetailRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: 'vioabeoemut5p4xufc0yrnytb8vzqg21jnc1pkh947mu359h5v',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: 'ewy93w4at5jw9furdny1',
                scenario: '3fhjlqd9x6ixqx2c3xiwdksfh4dlabr5gg415k5a4uszzyli9ko3h6xq4a4z',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 12:51:30',
                executionMonitoringStartAt: '2020-07-28 14:46:58',
                executionMonitoringEndAt: '2020-07-29 00:45:18',
                flowHash: 'cab0alygnranx940hc4wbjk5yphnisgeg7qb91hl',
                flowParty: 'kf5zorsdh5dktm4g99ra2oiqay3a8wvsfcdqm0qjpcawhoax0aqd0rjtmboeihygfttr1l2472uu5vx3v79liz3tooovubijopdvshpe3o80ffgi6c4odmn9bu5huxlm9r4mmpx7xl2rurd6qt5kipgdy5z8emiq',
                flowComponent: '5c9r7zy8u9lt0w5o5pe989czqaywp9ab8fd022xlyq9xgygx2g2daf5sqy1zqak3whl1e0bskoo035tyvex293kyqlurtb0aa8ie9lshrq247daugiph5m9nfdrfhjy9m3501nzbp3vto604160tes5baaxohw7y',
                flowInterfaceName: 'lyo2ov7ngxkbx39rzrek92piec1ter1ujyn2o54ke7oi9b5txxx935iz76em2mr8zee2o3vecqu8pgeiobqvulu1arg2xx8ge7ld86xw72zf3qut01hhn4ez8cggaqffd5lz1z6qy5sxihnt0e0171tq4pxsabgd',
                flowInterfaceNamespace: '0yxz3az9ddgm4kf7imauvdta1muignmn2iswop7tuh3yve44slscl9iv46xt6y9aelprq0v96wej2p6um1rchyvtbyvq129u90cxsgx471bpchppb1be78fjfdjxcwiaicepv4swtvr133hhi3w7ftg029ekboxa',
                status: 'ERROR',
                detail: 'Est excepturi necessitatibus laboriosam officia eaque porro. Tenetur commodi aut. Ut dolorem tempore ipsa sed dolore rerum. Culpa est esse non voluptatem non officia.',
                example: 'uqxdfrhgkuf7jwo7sflvuj7iugho1pm18kl7kgp6a5zfzr0on00v0wyadozfckiybp1ve0k17xwd4g0zlqxdj0gp4nt1o98xjzztje2hvi71u5mgomnqo6j6ttc4j03cmvbvdbgvegdkwqqarpcaeqw119aiosoo',
                startTimeAt: '2020-07-28 17:58:21',
                direction: 'OUTBOUND',
                errorCategory: 'bb3bhkar951zm0nevbhqg2lk5rmgeomw19fb4slrjnt7dq7yuyxugo98yzt6s769o3dciy4k851hd3m2kdly97xblcfabyllvwjun32x2j0k0r4p8zyk7iconyzb7vy6lklpm7g6h3zdv7ioec3uh87hpi0rdiih',
                errorCode: '37m6ul2r6epfbqgj614v0e1qtjuo1grwxj9vi2rsglcjum1m3i',
                errorLabel: 406551,
                node: 9174758543,
                protocol: 'd7o4jh0dgu025bjooylo',
                qualityOfService: 'et7gtk57d8eqeejbcxn5',
                receiverParty: 'nbz6vpgwfiidu9ffaqxf42gs3rtlraah6598m1wwt7apr9ky8h5ecp5xxn3m5mhkuazj2h0xwhnk4hhyb99n4xol46p7jhfq06hbtm7btcpioqb6wtkyvtwn0a7349a05nc2rhjkv4608exyq526fn62mv3006hv',
                receiverComponent: 'ig45lv2jznhaoytwfrwwgvpdc437s1555n1csj3ej83qlusg70lnd0pknf84pjylcvzn6fwecj31kt5bj6dihj34pebfreldoupsgtz9pgoa42a0wxrgid6r59u7w3mctm3kxybw9j19mddjal0ztl4tfjzgvp6m',
                receiverInterface: 'k237nco35pk9wcaisrht2fox5j0r9xmejx7mmxdenilxvsejgy36qlqqhszgctn4ms5ssdul2h05xtkf4468plumytyog2zzjpse8j6h9hluwo77pgvto529y4n7c43akeqmw8szz4xm65l30v3ow23obi3bmth5',
                receiverInterfaceNamespace: 'ejn6aki9fvnkvakjci6re7b997apfoxior0vdwdccpj8oslit8n2msdvhi2ei1uauau8flcnyz0nt9mru0uwlq79jlfvp97glgmu3x22hb1hid2zems9jlukof7iayzrmx8rd01p5kxth6fa8rs6yjkkly16wse7',
                retries: 7499763877,
                size: 1643774429,
                timesFailed: 6047923959,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: '899ih6uz2gmumxxqwltoktxbe6n9mshwudkrh8zl2aj1k8dakz',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: '19ssh6g2436ronz56lz3',
                scenario: 'v4t7eeeow9ngxppgy1blt0veh377r0520b9v4jsakk3qlp6peg6q5sz5gtfj',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 18:56:32',
                executionMonitoringStartAt: '2020-07-29 07:00:16',
                executionMonitoringEndAt: '2020-07-29 07:26:02',
                flowHash: 'cen2omcpsv5ro5l8abq9cq8tzqthu8jevj2xrneo',
                flowParty: 'ic4pxe8v6v5t6nrbv0dp7yrugg7btg4h7w0r9v84hkplqddbauup1up0aqmtbxm42m3fbvcwl8c0m53j5eq3q6nqltb866y62xiouf5xgs2kdaivh0qf0eta9qg8cjryput8sp67bvt50q2zqqpaswquyyx9qfv4',
                flowComponent: 'g6xg6r2bk7o3apfjldnlmxbvf37vu0fw7d2wjuc63qslgx4fb0so7jvzlio0cafxz82c4t6bz7461xzji1nzu7ej8fjk6xwg9ialicd7akalzxf07qrde8z75r9wu5nijq4deyl62oogrte3aywpzma5tc9gjgfu',
                flowInterfaceName: 'bdx4kzjsp762r3rtettxsdo0b1fs1myfxdxf5vgx0qkpgkvawr56anqh4vuvxy24x69exd44lfhxd446iwrw8hfcgdmcpp10yz7ptguhl4i59euyt1fdejulp62qu3bw45iird6d780pbjjrby488ty5kx2nkkkq',
                flowInterfaceNamespace: 'f18xplxyrhj2nmcyja7tk5bdyvr608oxzvgdxc8fa5w30yjh2kpw3v9yjz129hea3aqbknmd7gxyyl1ek9x7tsd8aocuy6k2sexanvh8wbiskfgehgzqihcbjvdfnwrxs38s38o2ywszvxosm38y7057guwagqet',
                status: 'SUCCESS',
                detail: 'Minima quia eaque sit ullam harum. Repudiandae sed et tempora temporibus aspernatur totam. Assumenda in ea aperiam.',
                example: '9gs06j63ofkv84ynrof8o2ysvwzqmy2em8xjv4wpeo80dnhx84w4wwsy2lluhct3c25jkkngdh0k03pqpmiexf6yvzmkjd4nwjzbrs3pmmuoynbf6phbjwjc7vhpvew7dpm8rb85o7ne6uywepp1zg26g0rp0bgc',
                startTimeAt: '2020-07-28 20:33:30',
                direction: 'OUTBOUND',
                errorCategory: '089cmkr6gr3k3t002iracq2tkf6hrdkmqe5j97pz0mxtj7khxj8je2psqdz6m2gy7asohyyqy6vo8azjsm28z3p53yggor07mbdo42yv0lzz6csjywwpa1y3aiq0wfw5vzab05jv177npiggwj3kgjwasg19laq3',
                errorCode: 'kci6d45xxa3gyvshwk2xgrkbq9b8jqblpfdipuxbsjof34plg7',
                errorLabel: 332076,
                node: 6210108488,
                protocol: '1ckyhj3xfbsrjcz1024j',
                qualityOfService: '9ejw382fergl326cgp0g',
                receiverParty: 'an91mv22w9temhi4qa1t715wjnxyr5nbzzaf9jlr38whxo5eycxjvixb19u3p20p5nhaxjvtw9qip194rvtq52nl9i2cuf4739cif7buillc8m6f1sj3u2kp4rj1bti4095j0u0gpu8a0qg8xx6qlq3pj5vh33ak',
                receiverComponent: '5oepg229o4iosbe9himxk5im0i37vtew65ki1801qlsw5gibinbuqdsm10w9mtf8wj9rauuxih89383euyc2y8o9c42q32gaxd73qc5ag6hejku5kftgdue7qvnvki1q9n753ikfpjx6op9hawc26xsfoiz2wsl4',
                receiverInterface: 'hy3e7cooc4ppf6debjuyoba7ptj5l9wqiipgcsexb85460ftauhia01x327eqqoiifgaljuyomysutxsg9rrc4xp25dd9xozefl35uvbx15oaonplqt09expwrm8th1nyvq8le4dzke7ysagumm02tir4noj5mkn',
                receiverInterfaceNamespace: '1pyd38k4eyf6dmv7qtajelxv8cfklv70ugckfeg88v121luxmxnpwvasygvxaggs8dxt2533omvpush4jcpcl3d3djgtf6ycn4km9hpxzdqg8uzsvn25ry30ch2g1okex0h8uttvjik06usn7c8caez1rk1n5wun',
                retries: 8874018352,
                size: 8499804684,
                timesFailed: 7531329906,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: null,
                tenantCode: 'ejny537exqe88mmcmu9m561ljp73jlw1xljr8u67nnd5p9mmuv',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: '25ipx266opjvl651hqiu',
                scenario: '0bguei3sakv88ehwqezgekztkkn1yy3jebbxm0ujcp3oyk1yc1vrkn9xgz5k',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 04:19:32',
                executionMonitoringStartAt: '2020-07-28 19:22:31',
                executionMonitoringEndAt: '2020-07-28 14:46:43',
                flowHash: '4heqmkrvqkp4no5ddnvxklqjjde0bajrt5hn0gbu',
                flowParty: 'pyn87f2gqz8v85fi9yjrmxfpw5s2ap25k7b5vv5zfb3gz9c2xtwykx844l1oulpih4a57s91zxuaiu16fnr4rsuqflj3j3i02fl71cf3b5of84ber53j3b27qe9r6n9p44qzneo9vvvw64nxpfryr3a464wgzwo4',
                flowComponent: 'v8byiti41mrdmlrhitz4snmz4z9tyudmyk7w30zwa9xc5uvv2ftchirvogo5e16xja9wz1td35dxn3fbohw2ppoojyt950lctaw9m5zl8n2epk2gj866s0qxu5geebft2ahw20xzmbv7y0uf6q2nmn1vbjw9wau8',
                flowInterfaceName: '0l7sycs703nfc650wg4517zzd2eb6avviigk3q4yynt7e7gkyrpjnyj6ku7763y6kod6ugdg665gj9a9v7e9oi94me1togic07x9tqypxndxiehxaez417u40mcuhc2cc35li864jep8bz8j9nilqai1ltkrlgxp',
                flowInterfaceNamespace: 'r77z6falqginzea4q93c2lw9718niu1iqm9fjk8ndyj1uquug0bzrsc4xbz3km3uofdjgt75gebjkebefl5q3lvgk2ufddj645fumpcxi6te8enuf72rfbvcgpc3ifzuxic60x3r5t9bltb4i21sz2spie3d3jyg',
                status: 'SUCCESS',
                detail: 'Sint distinctio eaque tempore id aut minus suscipit atque. Consequuntur qui perspiciatis veritatis voluptatem aliquam quae excepturi ratione. Odit perferendis magnam sed.',
                example: 'v49yrs05bsnrxc9v4g1271puwb8b75lubpbtnxfc105n227nan63p99tdf9rjudtzwkhlwmee6i1vnjv7ady8vt8ca1cgy9w8u9uvqbw700ry4rofls91mlzbnlcxo901t8huwo2v2wbhd1p6dewmfukc8cworgz',
                startTimeAt: '2020-07-28 15:32:51',
                direction: 'INBOUND',
                errorCategory: '4uxk02suoufh8twwarjvh9466hjhl5npuvro4cn1p0rbldyeygvhsysc1mgpyt58kufy879oew73fgx2al0nz4svbzji64ux0sm9flouqbsx6hml7nrdm4kbjm6ot0r2ags8wfz0608j6tvi8qa4ovu99vwo07c6',
                errorCode: 'u6o3wpi0xhtjzdv253e5kcma9oy0toffz9792o3ybwiy2lmtqy',
                errorLabel: 479451,
                node: 1063548532,
                protocol: '236cxzjkgqdszq8smbsb',
                qualityOfService: 'g9ipo6ic517bkzxu7asv',
                receiverParty: '0svmf3s7iumc16o1cmx3oq66x4v695ttl3mpabxg8luh67g15lzspjft55qjylqp6ja3i1g0lr8oq5ovgaob74czlnw0ci7c7fi6bwd4pdnyjazzud8e2ytcs6fs46edqcq3p4mi0jkapr9g2c6ly683x31vqd3a',
                receiverComponent: 'yj0wopwq28gdk9m6aa3h0kx5yll47j3u4b4l3xgwmlzmddnogw7sf4lxh3kk9duo38t4q8dyl20b0s40pme1inxvpd9j9kwy0rva9x68bjv3shm5njxjhpra5uxxcet8yk8km2q73jmzwrsn5bor33vzn17bnxan',
                receiverInterface: 't6jpoqd92m0hkfokr59rzqiivr2uca9uxbfz6uinlhij50xh8hjidb196urkteilmftxw04tpr6cm2hlq7h7x32sd2zzpn02v6v6v6d85mzdim9im1oq1ib3ruszalq93z1zyxyrr10qlq3wz007xnmiuwgfmf17',
                receiverInterfaceNamespace: 'sc0iunz6y7aj2b57g5d7kwdz82hk4k8m9leliao1vdt7gvtrgdpslpotilikwuqnrn36vwxnc7r11b5mf60chd22vqke1u3kf9kxyfvvyvk07juuuriwnp4wz9nu0rce8j0rzmph61ibxd8w8s5kuh07d2915flb',
                retries: 4411909388,
                size: 6673468328,
                timesFailed: 4673835270,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                
                tenantCode: '8njdsnnf6vf7i38hhwxspkw9ydwggy27pehvled7ksk25a65w3',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: '4juphdr3dgc5ebob7cfi',
                scenario: 'bvwqqiayk5lmxwxo5tffohoetmj8jvdqv3pjityxo0gm01shvt6mvoghyzvb',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 20:23:52',
                executionMonitoringStartAt: '2020-07-29 12:14:49',
                executionMonitoringEndAt: '2020-07-29 01:27:14',
                flowHash: '9wefq1u2hfm61lnx5micmbrsp5hvjcl3xlzwin3e',
                flowParty: 'ckq004g1chtkrq8rjcrwus8ws0pwgias0t3dg5bgfvo0dn9koadrw9cj8sqcltam6mpz93es3tbmuhhokkx3qq5m4reer08wykd3dg8lkhpda2bfq2oclymdqk89549znexjkgir0flbfh796ppia9hsqzrerb90',
                flowComponent: 'z33i2h5tl0vzmvx1x9wm0t5cm298gfp9306sdqvwtvoatgyf4xwb191qpbj9zlo5gq5vau6bzfctc87woqcvjav2o9txw29bug0e8r8si26oaddj8iskwdvnyg7kmiow8aax82rv06zaoiazr6tmd62zpi58jqqt',
                flowInterfaceName: '6puatrgbtrjfjxanlfh5m510sdraai9pafqjmcr9zwdapuh3l9fl6v5kxx3tcn1ki9yx5w0agqgz59ey7b8drhludnq88nm4l789y33kgcwpd0gd097so73mpmjaj7wp762vxyz2ujcwrhiiy9096kk50k16cqpv',
                flowInterfaceNamespace: 'hbrt2ksjr2o5gc9sx5je9nb1pfo7qsnaaghsrkotdv0rnytknzqsxwalsvfi6l5mn4fucpqav0k6wi7ig0gxh7qxvw273b4bqlsor7vrptdzjshtvg7ru6wek4ce33jxl5t43vsn9h3l4ti9bxu9jle08fcxvcys',
                status: 'ERROR',
                detail: 'Minus similique aut unde unde perspiciatis et nesciunt accusantium. Molestias voluptates deleniti iusto minima tempora eaque harum suscipit. Voluptatem suscipit eligendi sit sit illum et eaque fuga. Unde earum earum necessitatibus aut sed. Itaque esse animi. Nisi nam reprehenderit sint modi ipsa molestias eum assumenda explicabo.',
                example: 'jo4haiz76x1mvn9tkl0jqo5rslibm88c7y0ajf2v0haksjqbs76xeh6ecjtwgj1t8o31jnleungghfawue58gdoc6oz9svcz7hahj9nlqlowabzbfyuep69iahw0dpo03lc5fgthvsy51kkpfvtxkmarokj7szz0',
                startTimeAt: '2020-07-29 03:41:34',
                direction: 'INBOUND',
                errorCategory: '2jgwi9tqsv3855unezm2rgzwzpxirmtrwvu9nx9pz3dppbhejdwxsw0reiocatw6y5fvq9cf66carqmzpgeu796p42zpvxijypw8l7s7frd21z47qqxfwjdpnysogt8im6jbzxh4hxehozv9p4o4mjmf2araij0n',
                errorCode: 'bk5dhphm7sntr1ha0vulti93q9bri4c7w2r7xju0n6z6mtsd0l',
                errorLabel: 405353,
                node: 8405778718,
                protocol: 't6g72rd823teyhlmtaf0',
                qualityOfService: 's0zvw47q7wii54t3zaqf',
                receiverParty: 'nr25ot1k3r3z9v6r7jecpbimvzc1t1g2npjvenr2bfyekhzop02uoht93cutbde4gnnr4ur0z1u59oniwe5jghow454ta3s8ezg9b2gl7gc42hxnlol82jz614v9loa92vmcgbmyvjmoox1z393g9c5hu8z1x3et',
                receiverComponent: 'e9u5pp5pyu46oxreh4owy2zsja7y3svg4cp7oe69a8xee929f81zennv1nzlnvascex0pvak5gmiakmspvig3xsopfyo7ep6ws55huptwz8obru4w22815pdoemrfzi1nvx2xpwbh200t1kyh4tht4vrk0o5bwk0',
                receiverInterface: 'sdp3hfs608mmwmh9gqm2f364utahlluj5umun6vqbg5dxeblcc1mme6rnrw0e8vnbt8vx205dgol25rtckoxruq7s6fokqhdix78u1ugeyj6q777t8w77nqqa0212frgevxc7r3dyyxan6tu0l2muoxqesikbn65',
                receiverInterfaceNamespace: 'gsm742qu5qmkbe166qvw2n7tkuqerx2ezds3u3rqom6rqi9qao1hqsksluylochj4re99q7l17sanrlkid1xvh21exuqnlj3njiz009b6y9xrp4hot8c4r7seguh17m6w71fgtdomdb3r1uaz7zbjezqcrb66qta',
                retries: 7628873825,
                size: 3980586775,
                timesFailed: 7367251310,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: null,
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: 'y7b5egl2i1oz19lgy4eg',
                scenario: 'eqtw2sewkmdqms9c2ck0a08hjm1j4lg3cmeuxrtl1i6je73sadxwsqc2rzvg',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 00:14:32',
                executionMonitoringStartAt: '2020-07-28 20:56:19',
                executionMonitoringEndAt: '2020-07-29 02:08:56',
                flowHash: 'v04u6wniqs0wd0ri34p666521w9zp9sc4iuedsbn',
                flowParty: 'd4dh815lmcznnc548bnh8w0mxc6ii7gab6o8pl0gued6fuj5670324uiet6pmqduf4agvozl8c4pii4fzofrhjd4w47yrswfbfh0jpv63d51udb1kcw3ju0a19oigt0mus46fliqvwm7jlpllwbd7yg7o1gl6v42',
                flowComponent: 'o2b3vexmjipi8ova1eynjywyspk8j6b3l6savs2d8qf2jzq91h9wwmstjwvewfm43msoin0zzdd0cy7i1ir57taq27vzcjda18b7oovqpi1tm3r585fzmkjt4emnsdp0dzkhel0oiq6soi7xohpc5f3enghkx8jb',
                flowInterfaceName: '4h4uxaey68ncg9lj9r86flifmzg19g3bhef361i4cdfcj1wf4vtaveevlpn7w6jmplfgqvle3dpmc8u5se2t2t5gdmmxoe6rid05fil9q0cx2plu3q7uyn1p4vkzpj8pu70d6cnj9ph8dff5c7tjbnpgt1u6ah6d',
                flowInterfaceNamespace: 'y5j3kns1xg4ybseoqpwk3qdh20287g0hs0tg7eifmov32u5014b60woid4lq1gpicfkwr99pa8x6tompi83d555x1ctwlh93x4sk1ooddxy4mdh4tz73b22fv0vi0zcynkouamfkfxcpk3hixr5blf7ncy5951cf',
                status: 'TO_BE_DELIVERED',
                detail: 'Facilis quia ipsa est ut earum quo. Voluptate nisi vero temporibus voluptatum autem non aliquam qui. Nihil et quo. Aliquam quis omnis commodi.',
                example: '8sigxfv4x4r4sus0oltqo0q6phum18qg1ayoabycg60uvdog5b0cur9gdxk6q74ys0fu1lebtrbqdljq0idigj0pdit2k7aetaugp63of3pzy27aaaivouka0vm412jnp330t8xc8mlwrngtw5zj6wbf5yk43vhp',
                startTimeAt: '2020-07-29 07:52:51',
                direction: 'OUTBOUND',
                errorCategory: '6xlysj2nps6ivys1tm0hp153co4l864wu2g3stfp21m7j7qczybp1or6f5311sly9cgzjuexyfu96g4aviccu0uuuo5kf807xup77igdi0yv7wxfnd6q30dlbapawhr8xboue8hyo6c4knxlnalcjennkvwceo4e',
                errorCode: 'w84k06yspt0eqe02byncduueh23krkbbrmj1i5b977mxdvc4d4',
                errorLabel: 335971,
                node: 1690665021,
                protocol: 'cr3yiscskyao540qc8t7',
                qualityOfService: 'eayty3y9hx99gzoto1hs',
                receiverParty: 'efbqq7os7ijv3h3yyd2b6by6axyszkdi05w31s3a52tnpwbweyndp22enoegl134ffu8nw20k7aku3br5uh8lxodlyqycylo5ezw2vv90v2zw0leshcinr0e1lhse8br7q4yed10u0pzb6eiaqumey9btobkw6na',
                receiverComponent: 'rwtvj1yiqjggwlgiau6r3gj7hq1wq9fglhm04cgspnyl8senidxuim8bgqgiv9wjel1jor1wldelx0sd07a4i0z4r5q38jw00eqt61qjxoh5vwg28zzlkmlp0y27uwbz57q2er3rpnodbzxzrx3utxkbugda09u1',
                receiverInterface: '7fcp6zphf9c9nc98df2g6nij0oh4cn7ysgwstak0n90tgjiccmqe522xy0evu00xlvmhzdszlm92cvucblau8meffq8ybznscv21c6lha3a33c0un3u4ewgf1fddwz9ks1ox5lwyltj6946gch74nfu875jnnt4h',
                receiverInterfaceNamespace: 'w4q11vai5bjtv8yus32n2crum3b3gh1ygwcglxfk6vqzl7voedebjbxygk661ysug01lkdi5azw6v7nul8ssknhk3yiqi22932raurv4s040bsyemw82finrzxcf5ogoksyt6j8gi2vg9domw1juawnu8se8k28j',
                retries: 5439085084,
                size: 3366477804,
                timesFailed: 2136865142,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: 'zc74s587vufrh3s6fu0e',
                scenario: 'u5lwda78y29hun4ra734fw06nsjshaeazh538eezjqmosjmi6ja46j422t0c',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 08:56:47',
                executionMonitoringStartAt: '2020-07-28 15:00:29',
                executionMonitoringEndAt: '2020-07-29 13:03:07',
                flowHash: 'v692xxhkgkx5www13uts5sm05p6ljelsdddmwaqi',
                flowParty: 'hqzuvcwey73zmgnqg621nj9vzs65gxr3cuqidh4qnn3rsfaiwoi66vbuud8ovspjp4wmrndnair49sgsml35u3x9fcwmig32qtxa1yxi720sq6kbd27bybzgm67qktxvrr9kuqpmc6splrj9ielvdns4fxf8t4z0',
                flowComponent: 'aamy7woi003kmsj20m0ms57oy75ekbf9idx1jvq0ezku76208u1wazdqqr0o7uman5mh3jkcbyfzthdpu82deho5mmiv2euprk8p69pvuxbu8l0xl867hor9h7frp6nvlejfhzy5zc1rlx3ly2nhe0nq36c7uaqx',
                flowInterfaceName: '65sx14bf9pqlpaxo1hz2ghcz2kjpa9wnayfiz9qllr2m0cy0d7xxnittfzczdzftf6hl5r2jq086fxsq4k996h8r9dny7xj1kag238ohri1orh5ujy4ytbr9pzp0ug6x0aubfd37e2nplbhmgn159fybwy5tjcl4',
                flowInterfaceNamespace: 've6vdwh88e326hnjuipflbgg6ppb9xsgs4f7oks514vgz9d98dtx3yjcf9pxooh3tgmigl35xxxkflzluw1zkk4nk4qzyeir7ac14vef00ecm93mklqbratu2654lbdm7sgyt2puap2uld9wqida8yquy8y2ksff',
                status: 'WAITING',
                detail: 'Ullam labore officia dicta repellendus commodi pariatur aliquam. Sequi dolores fugit ea. Magni amet quis.',
                example: '609aixvaq3tt9poepmt850f8tr49tlsty6zp72ywhki6log5va1zt0k253qg2j3yvoet86iaos62h5ujc4ugmujjz5fyf6h8h35t5ma3s2o755ga0i3kca0i0kx4rr03wqh901mn0xtudpq2l4webaybl6jgowuj',
                startTimeAt: '2020-07-29 08:17:41',
                direction: 'INBOUND',
                errorCategory: 'zxk9bs0kpdbyqy5zyxueussijt5mpmsy2idkylehoutfmlkpmwevt2rph6pho83hidpbpscch74kdzl86rnzozo9mo7lw3ywxj8pslrcjjffkubbpedaf32j2w4refjqeirjvdxcwh2uzmt7si5ahy2c2ogs86jp',
                errorCode: 'z0rmetbk5yj20v4wb9qr2vligqc19tpgskhgei1mx0k81kgvwz',
                errorLabel: 213498,
                node: 7874927731,
                protocol: 'uvsw7h4fu0jujstas5yo',
                qualityOfService: 'wkq1bzw1cwx1g54zqd46',
                receiverParty: 'l3fr5288rqzrkr1okosvdhenutdh4tgydczsz7ynzg60rqu047diawl1m3lijrob5hwn2ayeoit7wzfl9l8dlek2rmrbkqf8oz57y0qrfub6807kp3dnirt9hz94uhy4w8w9joqnge1vgp0b8umglfl8e0uy5ogh',
                receiverComponent: '8g4zpuyt5wkcxtnums0ejad0f34uyuzll2evkusunzeaopr86yr5fnx8b6i0urzwuv8s4ymhfm29m2vb4ltu4l0o767bzz4pfwzmqpyegdowzvndkfuzx00o8zhgx85iomrpeai49rnpvocwarx4l9inhr69kcwo',
                receiverInterface: 'fzc7o7mf4drxmomyv9drma0uxe7ewmxafverf0cw3l7nqgp7nhqxqe2wy345g1lcampem9s7cm1zwqhg2iskjrjxwdpnzhqq0m8sbqxc0qbsasbuluesh1hriofpu4ea9ex9r44zlputhwt53o52fq4e37p1k5tf',
                receiverInterfaceNamespace: 'ecs6kg6yuqzwj7csqtb86z8kb7jq7p07mtu3dz5upa106tm69w3ox4var62abudhp27odcqaumvqe0je7etto1964yehx1thi22z7ace6cjdawlx3iadygehhqv85eidkv0wx552npoai1duforj7p2ro532v4jg',
                retries: 3701602119,
                size: 8437621148,
                timesFailed: 9420545693,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: 'ra5v9wcvs6h40edmrxp6ne21m52qhwnvszn4ko0bqbmkczqu40',
                systemId: null,
                systemName: 'sr828bfsttnjixroz1hp',
                scenario: 's23dgv02q03lyice53i41y8ismcb4vkdgi0o0btoqg0q8eseyopr389dytew',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 06:02:10',
                executionMonitoringStartAt: '2020-07-28 14:07:04',
                executionMonitoringEndAt: '2020-07-29 11:05:10',
                flowHash: 'm6c00gcld7sz5kctj58yvl7yytsdd87lmesmq5h7',
                flowParty: 'cwmlot4p54ixeee8moa5lubfu8he9nlna89n0u5qdr6ajim8dfz8jmsg7w4ers36ybv1qwlhvtjsd1y66un0skmlsmdkn0pit7obhpz04jyjwmjo3cdm49863tgam6fuea9yf7pv7tba5g1us1jvwfs9ilp7qkdf',
                flowComponent: 'rliwdmq3snb5tp5mk961fgs9ibkye4revtzql19s4wr9cw6ycsawgsahkrzyx3apkbkxw8qelp9bskfze88big8luj5ghpdihvw8a0ux9df6dv8cosl2nqxke2puvgy9qke90x2y0js4fk2vbxl1a1kl64yemrbb',
                flowInterfaceName: 'kmav79l1s8mh9l0lka0c2ufqhlt34r4ar9nltn8763yp1pxu0h2z53kw6ivlfg794k7fqyq6isuppbzxwziwqkwafi8x9lddq42mbk6iqlohqgohf7hxa6uodo6tueij4kcx8llpe3l7b61x2pk94dgu0g5pf7g1',
                flowInterfaceNamespace: 'sjcxexqeh7xtkpswawmtujczfzg55wcc5hplg3p1x67ng1ec9y747iosz42746ij817ori39safqcob8bnhf69scsyg1z6m6w9fzwbdo3cfsmgirwrrxn7x54allvjrwugvby9aeqi50i0p1hzedfqp96uhxm757',
                status: 'SUCCESS',
                detail: 'Et sit voluptas voluptatibus doloribus tempore fuga exercitationem. Cumque non ipsam. Dolore quod occaecati numquam officia. Earum molestias iure illum nam. Possimus laboriosam hic minus libero beatae quo culpa. Sit consequatur animi consectetur quas ut sed est ad consectetur.',
                example: 'b3bbg1phkmurw0nvjci2nd7gw5yh4vkdsxvguwvvlhrcvxj8qdsrif4v5v2ceax57xf4t40ism5uwkyxmmv4h6c2wz1mftvkiaueu8xg14slt3jj7jhr99zg5ambrnkazvu1rtf27dy72vtwa4jw5y0k6mroj1o4',
                startTimeAt: '2020-07-28 21:14:17',
                direction: 'INBOUND',
                errorCategory: 'vdq1kjwwz7pibxgofyiz31i3sd3uwyoht7p4ru6cdsytm8tf77blrj96o7rpnbwn8gxw1iik4ovwfor07nvd2moi2zv8epxjwby69cez3s8qgjqnqo4xje473njlcbyjsenzwveojpx7bly3vkbt4ejhrqkat2tv',
                errorCode: 'z1t7fdearums4ybcgkair6vef671azrd5z54uaan92nvgzioqx',
                errorLabel: 538175,
                node: 2067030416,
                protocol: 'fk3eq3et1plq1tpthnvn',
                qualityOfService: 'lznva9wwc43071lpizy6',
                receiverParty: 'cvkaxbu6hse7oi4oocad61x8l1ybbma5mmycneulmi60g0k7go0vbbiq95y52o3vvo0n7grmr9aojc5q5lqe0qxmgnjtu7t9tvneoo6i9qbx9iou5wntm018adkc834xojleoktk0whjxy55kdbwtsfzfc6505rz',
                receiverComponent: 'dbddkt2wdvvvlc8rh889g6rakwr7uu0bkdlrooo6gsl12w4iordfhppqs706y7jlk88mllssguahv8winyrvaa3baxwy9aguihr5mnsmr1s7gqcu63szuop1sf8jpy3fxh56a20hufw606pyrk98r9wewfrgo96d',
                receiverInterface: 'mj5jdlwia4xaketpqsrobv0w4g4uuxbxkkw3p1nmdlm6eq7nz425ecp8jclg3utyjoguuhkmvvbkuzx48xszl8t7gz3oulfwiujwjucx6te3vzz9hsoh6dvq0zdximsp1n7g2a4coefhgop9oa8surwfuods4atr',
                receiverInterfaceNamespace: 'pcsbrit1rbixw0eaih06fihh4k9ulmyvjnwylsvhek4nnyx5ctr3ymyvkmfd0929gbav8tiemb43l62qvrr3pg4evhr056yqhutycd5xoz27dzwvdlpybi50ew289j4yaawmr45yo6z6e6yqbta2uxez2tth19z7',
                retries: 2230605282,
                size: 9605883489,
                timesFailed: 8003776740,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: '1flmfes7vf490sjkr2ukgcxld5bw9uxoxqm0kz7fnqbo70k2be',
                
                systemName: '9bfnh52w3pegu6qvhaxa',
                scenario: '36bxygu8jze1j95l7poan1tipev2ql9dwfysted0dwob2bgz3bbgf2vv75yf',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 19:02:06',
                executionMonitoringStartAt: '2020-07-29 09:39:31',
                executionMonitoringEndAt: '2020-07-28 22:48:40',
                flowHash: '6amc4wdqwhxosk6cg59nuakoschf16sk8qi6f4mt',
                flowParty: 'rbrkv4841rsywysdwiml6gpaod01nw72vameq1upq1lvaz8kt9q1xdw5a8py0wg7xalo60tw3xelp5q4hx1wc72tj65j2hig8bcwft9nut44fckfnr1k1duyhxxfq89xp2mrfesz81nl90m3lwse3blymuw2n1ci',
                flowComponent: 'cr4ghz9tob03gymhre2ewfd1adfa07e2t9x66xatc25fd18ttom1r0eesxwvw839m6933tm9s5taxpyizs44lmbwitebu0odu2d2hokwexr1ot16dxo1r1ue8paujewz3vv42oo4584xer5nos7g95xngzuzkamq',
                flowInterfaceName: 'iw98ogreidyih16gfmgjns8ynr94fl0nq5ly7ydq47oetqk60g9sf2e0ikc9pk23zuwpcox7hq19dzsp3vg9cswiuofi1mowmnxpb9hvao43xzcbd7fib178re2rigrcmobrbo7ch6eh0l3u2megi1ghyk2j0ofq',
                flowInterfaceNamespace: 'keybni4om5348gkbi9b2z173l0iudxdq5d1wda201zovcxhb7zu5mml8gmpifb6clhvchqzqlu2zyojuwzakui9jogh25c0crtmbub2etemphoobp5car9ubokurq40f2yluv8h7w6b7xsk5m7hqnuw5p6mwjw0m',
                status: 'SUCCESS',
                detail: 'Maxime doloremque sit harum sint quis. Quasi distinctio omnis. In corporis quod autem sunt doloribus natus in.',
                example: '0cfee65scakwsu0jwgtkzk382gtj40sfucoooie6qfcr8eusbwf6wmmw6w5ihxf0hs77eb926c21nllificxb1jrqn8fr45bxvmit56wsi7q8gbsofxtnde2j0ew00dft78s5x22sinwr9ty1w5vusv3mcvn91kd',
                startTimeAt: '2020-07-28 18:23:33',
                direction: 'INBOUND',
                errorCategory: 'bg3nfynnzzy4k7qc1uo7gxbcu72k1ypdofb0t7b68hp4sjbo1ygg1g3x12ngeu526rklk66g1kfvvbnfm0yb1xli1mjhlxrl6kuek5z2m8mxwrybrmynyu2k6xnqs318rbdwy3v9ltfb3g2q02f7t1trgjra5lzm',
                errorCode: 'aa5yq9bstkixaxqa5q1wvatxveq2hpl1n25iq4aeope40wjoz8',
                errorLabel: 609998,
                node: 2402967316,
                protocol: 'o9gxy7935j4h4ufa10uj',
                qualityOfService: 'zcew88bf3ng7agmtoa1j',
                receiverParty: 'bd0ouv5l6oifl4vhk5i42o3aap3svuhbvqp1ayrp3anwewsvr07gjcihm5ke7z0e8coztuldb7n56667s2nfsg18dcv8rmc5nvhvde2z998l8m013hrh90hv7fd29736q8olx0vcg87c2aed2i3swqjf8mwjbt3x',
                receiverComponent: 'pesh8dsn3mqz81vljenw3t66io9bfixsjxupwx6gph4pg938oujxbb4fqnlxfpmh48lutwm5pyncgr6xu9sw636sfbfmf2ptr1g5jvbateru6rbpe5mmijv08v6voj8j7ip4xry93y9m6ou290qq1hxjd1t3l22b',
                receiverInterface: '9crvot65wqapv38yh9hyq0wtoon5y1agijrh0h8ncrfy8kfmpozl9q1iaz7qv9sojtkahqry3yv4yi69kmpydd7gcwdm8ad7omjsajrnpjnl50kr7uvitn04esoys3ce936sxo2aumihoyh6vsu08ycsd5v9rsk8',
                receiverInterfaceNamespace: '0gysh3h47yluns5z4ybjjoz7bxb9jzb373gho1hsxpeckybx0lkv8qra6o0f1p62wl4xu9xpbag59d1p1cdy5obhe1g6hwg25x1zdp8wickj6msjqb3m0ukdx9zyo142vz9vf394l6dylzw2m5lkqa6vurw7wb9w',
                retries: 2425883361,
                size: 1560015203,
                timesFailed: 3122049088,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: '05wjgpyl9ly9tzdndjocajlykr50w9jaippcdasgb01x001j0m',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: null,
                scenario: '1iwrylcydyp4d3zdt823sovviv0nu8648g6nyyk4f7ffzmjyqdo1r8ju08wz',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 22:05:12',
                executionMonitoringStartAt: '2020-07-28 20:40:43',
                executionMonitoringEndAt: '2020-07-29 02:52:32',
                flowHash: 'c4kpaxx4tks8idm6wyjvoy89g8mq57q992czh4aq',
                flowParty: '20lan5kts2sevb0kll6zt9a1s8reac9z0n7q0zb298hl9h25br4opefkvr5s8op2xz7kbgzsfqdbakli00mjmpbkauy7ih0eowz7h6qffzmk9csrvzq5kqhqi1t70qa0rymwrlgm0610y5eaer5srhqxstkb6td1',
                flowComponent: 'jv89v0hirwhfsogp0bccdc40901vq11vzsx8gc43rdhmrtib0yqqv2kift8a5z2wk4yvtg5lobd2r2buzd664ttf6b0u6rzxys8c21kr6oaht9vn51qqvdip77j0ydocrmo4sc9ne0wli6rtxo6n801zb9wg03gm',
                flowInterfaceName: 'g4g2wvjmgaby2uz0ksarg3x3z7vel6cjafdl5a6mv3ow12ph51fattis5jis6ffsbyw9o3sheixa8nsj6c8n48j38hl6m0v870denudem78krtxgsifnlancmq3xdotfhexbr9h74f68avi2fut5m95im9nkgabh',
                flowInterfaceNamespace: 'dg3c38c6bzqfa2cr161v3v3rizbnl3v92gyact2s4s9qjzk37r94ga7pyul7whpulo211j285eu2zyb88zj3z634bqna16citfaleaucpljaf4jznvvq1jcglb8y8ej6juo4g3tsx10r9yn7yrnwfqdiomtuzclz',
                status: 'DELIVERING',
                detail: 'Maxime ipsum consequatur recusandae perferendis quia. Delectus facilis voluptatem ea molestias et cum quisquam sit. Voluptas quos expedita in ea quam et eum aut nihil. Magnam voluptas dolores architecto ad fugiat ut non. Dolor qui dolores id molestiae voluptate hic eveniet delectus doloribus. Quam quo maxime temporibus dolor eos.',
                example: 'cc2aajubvb5xlb1ovv6wdmou2u0bknop9p46kmzranqe9bs5ti6xkazljm491islt92t2jkzbp7h6v6zbzzxm6exrl5ol88savhv4sdeiw6z8len8y4ldoqjy8xo15da3ujspjyxq0mj9wecpbbcnafg95kh2gc3',
                startTimeAt: '2020-07-28 20:30:45',
                direction: 'OUTBOUND',
                errorCategory: 'fkz7m5mr20oyqu3i0vyqcvm9qdfuoajnxbi3sozlqv729ewfhtz9fq61qpd1volg9ss69bvg2svd63snc2i1p88an02fg5w24w7smijy4e6wz3ntlchn0b1oc2ljvzn0sy2ce736pz73we32un4up8tfff6fddfj',
                errorCode: 'dqvpvb6n95517nykykxdl8mdz1m0a4z015e2xbqu7f1iuq32g8',
                errorLabel: 328963,
                node: 3112016888,
                protocol: '1fxodycix6gbt7cegldd',
                qualityOfService: 'u2zt173wgypmrrrfdtms',
                receiverParty: 'jt54abtsmfbg3bwdb8hw30j66jvt1wqrh8une1vhhwg3ecvdcrv3lch8jrb29741a4xbyxbr68qvpojh4bf5ol9mq44f6z6f3vrt7wv9jo9jn9k823aqg28o0960l9ozyecu70tlmwx75m88i8ij2myx7oj74lxf',
                receiverComponent: 'n6d9dh4j1d4xajqt17oxopbzlekmhaq05fzs270ig9z4cgqyjwguqcqmye85403om19zdg4m8qs8rcuk7de7aa6kg7i1kyyg4fwxq0oz1hj8kcjto34ih39vh4e3gihzgtgmvk70bzy1w5qkce8cjgqeqb3390i2',
                receiverInterface: 'dudzn1z768a30s0c6ywwq55j53481ifc1auqmmf5gv27rn7bxj6y9rtwd2j5xdzx8oew3mlvc698alimbsie0o5nfwt4jetkk9xz9scntxq904hcxblv1q2jurr88mf4aoyrnhxsn3gfb0wo61awgg6u64w5mffb',
                receiverInterfaceNamespace: 'a55h1kg0janfqsitjpdxmm67pzqk6lpp0l2g9m5wt15ofx2o7titfgpzw7nfk1n6xez5smzrcgyu35fzlclewinmt6qsfhef3q6gi375f7f7wykt0p5mzshcc07o6uzfihilv2w3ezg6vczs0v4b1r84l8j6yzt7',
                retries: 3210990236,
                size: 6343794637,
                timesFailed: 5953740892,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: 'gbjw2aqwi47n2r0imecojw9f086vnwrq1uluj7av4rn8g9s7hg',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                
                scenario: 'hqscgbgxvbrtwekab4ogzs0nr9xkvvizv9whur8cn6y0svcpmmk1fhufrbr1',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 10:18:16',
                executionMonitoringStartAt: '2020-07-28 17:43:22',
                executionMonitoringEndAt: '2020-07-28 23:52:36',
                flowHash: '3es2sk1ds5ukcre9jptfam3gryv24t7li8he0e7n',
                flowParty: '3zxg2vtyyv2aahh8wvzaj2yaxco3ud7m1ngb73nfyom84td8lfjgxrj0bkm3bzq19ublve7308cbrdbr8njbb8sfdk0sw5v1eoqk932t7s7d83hlo1cqzrtun250ka74pbfezkhwxdgjht2yl8h3sd8i31rq3i75',
                flowComponent: 'ws42hqjt7t8qugvieesxn28tf4k0lzmdsaz2e16sxj2rkto1n2q3nvqioqwipseku914fragfb312qkps3asjtznfc44jf9al981i27vc1novl86h89u43nmqa7kg3lycw120dmco302qkba6b2vhc5d4z8xgrr6',
                flowInterfaceName: 'porvgw2k2f0yehvl9fc7euv3rmi5u4mkcnwkq7i69crggvk0m4reet5jce7divj8labn1zyo9t9pqvjjbyaygxjn8cojhvbskymu94kfec7w0ed97hjq7ovqtyto3k4ogo4ook9aro0u1y6mlekq08y3prqn7uzm',
                flowInterfaceNamespace: 'fs0esawz3yey6yc1q3u2l2ws4ulhvy0uckhgzrevmrfvmp71d8hdirct1qei2imrnv7fugybf5t4kf6wl3iile3jquy8yvxpyp3m4ef6hnqljh8yt1is49cy0b8fqve4r4qm89536dcn8h58bqw2j7diwx94z9rf',
                status: 'ERROR',
                detail: 'Porro aspernatur laboriosam non suscipit repellendus consequatur blanditiis sunt. Voluptates facilis autem harum molestias. Sapiente pariatur ad nam provident deserunt hic et. Repudiandae sapiente deleniti quia quia eaque natus. Consequatur iusto in ratione aut saepe vel et laboriosam corrupti.',
                example: '4qjppl0ling96e0emzb2gtysxvrw9bybph4dgglt8ayuayqhiw5kmuhlobgedqj76xqcm1qtsl05mhv6ghy4ze5w9k4ridxws4lmzd6jtpl2398shu6zk3oqrghn40bk61d5i07itqqerjokh8h0hbyrjq8exrpe',
                startTimeAt: '2020-07-29 03:09:22',
                direction: 'OUTBOUND',
                errorCategory: 'eyyg7iyfuxr4hi3fyk4ii6xtofjh3pyrbvk9nud2ogsyznirmo6sntv18prjkx1xzrm03u1efeghw1m8g1dml5746xm2i60iiau4z3bc8mud4eqi95u6q1365lnvfve4t97l3ew15mykw279q6g2zn93zxk2zo11',
                errorCode: 'qphirqlcuzvvwlx4ug7rzb0i7i19tnms6ew3y8674011glkcqv',
                errorLabel: 376651,
                node: 3877797978,
                protocol: 'ii85zqqylmzindpycbns',
                qualityOfService: 'tcvw8fgw4o01t9l0kgkr',
                receiverParty: 'xtrcws1dcpbff8jsdcr1x69hzyvcgfngxiwqz8n7krri8pl4uu9wx6ka28auxivl5xw1kefmjl14fwussc4pbv8qlebmy7pmrlja16gapy1vr12yekz7l50md9a470bkjin6to4a3scc5b47m7h5nddf3mmxu452',
                receiverComponent: 'ywkab2h59usmdvajcubr8ce4a9eg5znqv0fhnt6fyp3pzg1x3u9x1t7r2t1dy0vcntc74h7la2c83zju20ye2q2ysdki5tlvq0qafb5g1g2clu9xpv2c3xygsd647swktuqwiptte7zbwnz2d5xokkwoa21i1669',
                receiverInterface: 'gonguhe5yxmk1i6ybgmcqaczraxxb27skqr3uisbl3787nllz20h9e3n9jmn56a0n9jvqomp1uuse5rs15wh0g4qajqdnpdxl1ldkld5olpi9i0ul3pvfo7gs8fk0ct74uxvhyt4xa2cbnxscmdbtt53zs33cy5f',
                receiverInterfaceNamespace: '6y416ebkp7rmerhznq032lqs4bpfjx13bh2zrwy2o94lypfid72ow8k0bznqknl95txs19u4yawuh2t1puvc6b9st6jhv1o2h9kjbt9umqfjbqs3tgi3bgvaujbukuokvyojnr3w1pgu70k8fk4tqxn95o79q5bj',
                retries: 8991938932,
                size: 6733985736,
                timesFailed: 3698188597,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: 'fpfln1sf1hkpyyam9iz4d4rkq0ty1gqb1hlzwwetiqjp47vmdn',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: 'gqp8e6hiqdlxwz24hruz',
                scenario: 'w895sg5lc20sg96qmd89kztkh9aqn7ug7rcqr384gztwdkimcoo3b0tcg8y1',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 21:26:01',
                executionMonitoringStartAt: '2020-07-29 13:13:44',
                executionMonitoringEndAt: '2020-07-28 17:42:57',
                flowHash: '4wopft7b15e27ovu5a75zj394rlr40ye67fd6hev',
                flowParty: '4ldm7n1aao4p3gqsm0ppo2jqiktbaf7sxo4qxnhmtqx0a5foh3lv6m8a55as7qz5im6s7q5i650y3vqoqnqjkz860tk2p9vt5yumuy0uqox5xevl1o0ey329cwyg2ro9lo507tg0sf53wigpsw4943zroglmzju4',
                flowComponent: '57xrzoah5y834p6rlexvgekqjbs8lu5hm5mi5fmq1k7daxyc693zucmlkcg9x5s0wy20icksuzwekkdktr93qd7tqnrmo7d1sz0w1znxuiyuc0545kt3dt6usza9zbm7i7oshvhy1o4xtb5akcsw66430b4kvd18',
                flowInterfaceName: 'p8dgmdib2h8xa33ct8a3f37nv5zr9evqnm7jguxvlcarkj884pljs9c88i1vq1xxp66fccaagykeds6kpd5cm6kfhodammbr9c26hgvxuh71k58z90jw5pcodd0bum1dcqubca0bpav7arcbjtr7eeqfn59x5e5b',
                flowInterfaceNamespace: 'to0yop0d12doeogf3szvhrdq8ppoix7oafdnkrwbujd50dfdwbdbjsqn6ongdlfgels3dkh20x2k4edmsf3oo00ta1cvgynr33fvaq3y3l1dp6rqurmuin6zjm9ro21grlfr830ow8frfydyhe9rpkqlyd9as88y',
                status: 'WAITING',
                detail: 'Expedita ullam tenetur molestias. Fuga saepe nisi est nobis deserunt dolor eius quia consequuntur. Autem rerum cupiditate voluptas. Ut voluptatem magnam voluptatibus laudantium tempore incidunt nostrum.',
                example: 'uj3jhnfr2ofje7i923c2dlu92qp0sbjm4nx1dqk3cr4wqznave6ruezxn2qlu79ovkmvrmwf8qtp8fkxdyi1c9gl5rsx5kkg61rco6u338k7vlkry5za3jwd2ada05gpz1nw12wclq6tswo9b1i89hzun1x8hufl',
                startTimeAt: '2020-07-28 17:24:48',
                direction: 'OUTBOUND',
                errorCategory: '0c753heywaucywzlzgxn6g30v3ggoyfyr7tll5qo53ge6gkcowk5p03b3ef9i6jij9unkt67jsyf4d7g0jxj92xs1imeuvvi807qp21a41wmp79ml816wcmlrk0dznub7qucsxbj84ssf0ym1vxzvs9uxtura7y1',
                errorCode: 'p6p1h3n9vzallyrjc7t07y5fggmvfr3bney40ti6mikex84poc',
                errorLabel: 403365,
                node: 7804795354,
                protocol: '0eswqca0gcgwad0dzcf8',
                qualityOfService: 'jvdnf3z9ixlaylh2dh38',
                receiverParty: '69x3g2osjzd494xl4akb5u7ngu40o0c001yhptwqim5aiyd3m3fsxn8a2csngi8v0n4e32yx49bkx88be40kdq0hv86tsrx18avg5u4prgjpp9ptg148k0qmo1zaeghkmsqvey5gctp1ej5uaw7c81kponlwg6p0',
                receiverComponent: 'o77zdzpo8smlx2s01o9g51ztkcf6w6jv7vv6dhy4x5i254ro5hj1nf7cldp5g1ejdstnnio1t22vgzny6jl3xhopf8xddcpvy8xffjzvyirttbtz1oitaukhojit4nl1w6sd8ptgpjokkkdfm0wrvcmpd241wgt1',
                receiverInterface: '001620kgo3rifyzu945bhyn0r5r89rfyk7p9s6tvv12rhihzaihinvboptb50a4dnyll8hdnx494szr40i2uw08gn08rk564z4fw1wg3v5d4fb2yera4fe1k3tevq9t8jeoqmcrqjssorr8ppssz7gy1y7s3yozn',
                receiverInterfaceNamespace: '1buw0plj66zbo7y37oqghgj4funy4t7v6y2f6m547rv8vfa2lqzffzoqqv7x4kktxrqgr9xftiwj1t0rq5yrvl1woudwnm3ioqhteja0lfbghqvodtaxklo2tn7jaf4btvu9xryn6o7t5lhp8xit7epeks8y433k',
                retries: 9597989856,
                size: 4316144200,
                timesFailed: 2982722777,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: 'bs5pe92r9f65lqpbofl5n2phyaf76z5obknauv84bsqwbmu11e',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: 'etm7zjpda2i2f9fc4fmm',
                scenario: 'fp5sdukj3acalv76ygj0odf4t4efebypdh7vy9pii4xxgg7cpjurkvu97qau',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 03:23:10',
                executionMonitoringStartAt: '2020-07-29 03:50:49',
                executionMonitoringEndAt: '2020-07-28 21:07:03',
                flowHash: 'vr40xtmng7jcd8gsqjxz9i9jrd72bptwoojgfvs9',
                flowParty: 'aa719d167sxw5j8lh49pq2i85j9o1dplpr28v2pvk61aze6kogqr7cvm7542xctqatsube0qp1v4evrniuephj1nwmsxbzrcttqx399o7krc5q14vzu7u4aanbykiqitmccyqcbmvqircldm7ikdqmzq3atu8bpl',
                flowComponent: 'offhqwgph3mefxkw6m9kp8wo2a4ajppxdz8rc7s2cx1a5p00zeo3t5gdrlb4sw96zh6an8qatr6xrx0i4hdj87nn195m68aetwzjvfujvsdyr6duige96vuv2csjlnmdxuapcifcdp77un1m2bltsfniz7zu4kax',
                flowInterfaceName: '5h0vafns2byjzovfqu8wuvsum1szwzrxytyl2rmvlmp4qpguw0mvf2lw9pz1ekc3dzqp9a4kj485c1j1h21zzydgpfunysv60dadepggmg5p54ht9szrcvv7kqqfymemzz2hsqvzfcsvot4i8x3b0l58umaa9bpl',
                flowInterfaceNamespace: '1okw7r5i95ngagii18gmvaptqwpgrifbehj05ev1y3zt9oztyhb2kcs0n04ikule8pd5c93jlnpidugffk9xrxjzwgkfmpx96sc7fd8klnvd1ef3auzxmi813s9tx8kkptg6hbkpivoyrvxuiumx6mdzrwzs5l06',
                status: 'TO_BE_DELIVERED',
                detail: 'Esse dolorem quia odit. Fuga consequatur et aut vel est. In molestiae reiciendis ullam ea modi libero dolores suscipit. Dolores quibusdam eaque et voluptatum tempora. Quia cum eos laboriosam est ad.',
                example: 'svkfqfqr8bwlgu0djoytaid74x8ycz6hv5cq4yz4ovh17epe5hu4bj4vmt1gzv85ypqrm1exku8e302vifco2dd1kv5pt4pkxnirw4gsarqnckqlt55g6hhnpqhelu641psfyte8hz47a4jzows5a7r1bwxhrmyb',
                startTimeAt: '2020-07-29 06:37:29',
                direction: 'INBOUND',
                errorCategory: '72ttxaiz9kiksjaijumg8ivvu946w8z5t2wd7w9fzo17e94mgrwnqbpxfyysx270o3ivym7k3w3rig89wg18hhcs2b78ken1vrrgqlmtz22gc3ga2sr0zscqk11w7noepazz8fjiaybwiub29efrrlpscrpw2krm',
                errorCode: 'ez3qb7j08mzefh7m5lodypscyw6o5mr7no8m424lnuq5pyr85b',
                errorLabel: 595295,
                node: 1554482715,
                protocol: 'hss2wehqwat0tseudpnh',
                qualityOfService: '4hiu8jtnli46hjy6464n',
                receiverParty: 't0yzddcbgumrpzrcffw4l9ixwpd7zcp3oayl401qi4ggx0lt5u6y0enp8l2z37ho179t2jyxw4f94oz0ak55abmba2jkk3j0oc5259g94pz64xvccrrvrrcgecxef3w45ibl82py6w76btkke693s9y59i72jtd5',
                receiverComponent: 's0g53465rgv6i2ff47xasp2p70ede0p88vd7n1ftmccssobc298th2sdh4rzggq81ahjiumgr0a3gq72n54lezayluj9fqw46o62dyzq12cj5ktvsx5oryddj4ezjtkgz8kyshk3z19oyojxjo8f3h9y7kpkdhi9',
                receiverInterface: 'aep9xadt033mwcx68rd0p7f8twrm0dnzorg6aeu8xni6jchsof0y3knveei93aa19i5ybw08q8quy1rtvwbxkzlfrmb72tgm2jfft1c8zero5kr94c003togv06njs6t93c6up3cd4eur7vgmocn5phmo0p4dwvw',
                receiverInterfaceNamespace: 'lc9s9ekr5rob60w4i0mpll4sxjnnb7zlr0meu5zlkai1m50ca4tp6pxbmig722dl8znn0c34u0nhkg5z6417e3qxfnj8mybj8o6adokgztu7wruxwramhtjp57udeyx3huy8v4rwdw1fns67hnpdbyuczpgondi0',
                retries: 4082212027,
                size: 2950868714,
                timesFailed: 8199106579,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: 'en03lh2ks73gklrte9fu6k6cawcg0ombzvxj1eis9njpkl3cyn',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: 'dju0frakg9hv9yhadkzk',
                scenario: 'um3puapxxqs8smf5i6ijahvyakeu6m4a2uo6cfvuqilz4g6uo5qao37nzlj5',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: null,
                executionExecutedAt: '2020-07-29 01:27:26',
                executionMonitoringStartAt: '2020-07-28 16:11:08',
                executionMonitoringEndAt: '2020-07-29 01:34:58',
                flowHash: 'dsnkbus335q5jef99jtc1bue9lshdn61300fb1d1',
                flowParty: 'dk9gsgrlg0swj3c4bxvsn88q3oa0j2mz8xa7fhp26inr5ll9ol9w726zxoqa916gtiul8m3ilbtpm0cr4of0eoror2jevr2mu31vig64uq0jmjctp8nkn3e2a5ltebgmad36djphjuydi7z9mc55v824f2xbv8z0',
                flowComponent: 'wn91s99q4ot788ikj92431mkdn5hlfcsytyfax2ze43r0yxeaj7nfr2l1z8rfnixk1xv4ga69htn3qygow5gt71iq8ln9qz26lyl09nmy39892dpqb2fr0s7iz473p9xkllw7nh50wgsntsoaoeythzhsglli0sr',
                flowInterfaceName: 'dnnuucwfkcphzwyzd3axotg5nggblr34mojbmgoq2xv7ee8gntadjnlsrpjquo4bnnsejj4wzoc5912vn9fcr28jbu18xt2ibclmmnh1xh9r2j1daigsl0rah9abn6ui6mv6k0v6kv43yyrjgtabby8uihv5ps0p',
                flowInterfaceNamespace: 'jekuh2wq8ve5ko53ny9epg67c8mgf1vllgf3kwmbf8do3vstnsirdae0n7bny4zvowo0npjucou1enr21mb6k0ztjskt0gxbo3sttm32oaf0uz84154kkx2kn51p9akkyap7nosqnng5j2kwg2bgj104fovzname',
                status: 'HOLDING',
                detail: 'Et dolorem aliquam nihil voluptas harum. Repudiandae fugit voluptatibus et non laboriosam autem et facere. Enim dolorem quaerat accusamus sed voluptas enim earum enim. Reiciendis quidem ratione rerum ducimus et. Pariatur commodi velit. Sit ipsa omnis quae modi deserunt nihil nam rerum temporibus.',
                example: 'sazqvgrx6c616na6yl5tbzami0nfqjjq16cjwuauidgl44ime6wypnb7jvq2qiy9zcypj0vqogctva73cojvq02uk8b8zz6rj21q7fg4h0p8tlrrs287bxu3p0a61mcxnsywlrvtt15dp8csuyziytkwmtzpum5b',
                startTimeAt: '2020-07-28 13:19:45',
                direction: 'OUTBOUND',
                errorCategory: 'uks5no65jlqu2val61ukx111zzqdbosr4p9alqogdteqrjh2h50cqj435llkir75ugsvb0zbytncu18tjgong0mo5zxpn1dkevj867dmmlegf3cgxdxrji42xtfenpe31wd93ollhh9tk57c7b26985xe1kgdic8',
                errorCode: 'tzh7yz0jhu1ire5okswq7ckyxosh1c4py36o3r5kdzyioyiham',
                errorLabel: 699372,
                node: 2333856474,
                protocol: 'rjfd1atnzk9fmbfdmd2g',
                qualityOfService: 'f2sem3jx0ym5el0wni2g',
                receiverParty: 'u5rmfobpeypz1c6vim0jejt6hivzxwcf6mmx0mrzufu07vwz49h4ynwqtl51hlv16g7ebbu34l3p3e5l1yo87gcyk0a79g4eixa1rkylgmm3ppqj4hsmnhgrs7pi7xxnj6u5c0rv0b9jb7n9lh3h1l3dbyymr6p1',
                receiverComponent: 'gmnmm5a0fkn00s24xfhnsq9b3wz2sk0yoqdwf3dsto2tix5zhz1zvvof7fzntm5ft608x7h7t0dpvkk2ipiv0vxwrs8af30l07q6rp54by83bjsvbwhx8h6mk60l9oru3f3wl69z3xqjb5lgb2df0u5y60vcewji',
                receiverInterface: 'qr9wuy2h1gwyor33zznhslixeicrzppzhva9krno6xcjw6iehtnf18j3ntj3ghar2nij8beqp886bamw3nqp5q6e4ftkaysa4a7m11tnmfhdymlcl1f8y16ujxrhyh36zwpwbi1y4832uultmi3ad5wtvzboevi5',
                receiverInterfaceNamespace: 'sk7gn8lmwis3qtfdavth1drdnelgf0qgdf6ehonjn1c1ht05xg0wlsbye1ikh3xm2l2j88pwf9ug4jwf3i2drk0x8eumwkn9g86xo2238d8ksoxlognlslz028lnpdahxac90tp5zc1actuujp5dff03t9p69h71',
                retries: 4708095054,
                size: 9655625018,
                timesFailed: 2769383202,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: 'eqknq14qyw9jnsuoji1ue5u5qhwv91f6ghmippion0lagbv88w',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: '9c9skeovhep1dh2tvuk3',
                scenario: 'phqr4wjlabn6710x3kcitka7zf970omag4s6vs6dcsmzn6ytzp9wr39igr0g',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                
                executionExecutedAt: '2020-07-29 07:53:15',
                executionMonitoringStartAt: '2020-07-28 23:12:51',
                executionMonitoringEndAt: '2020-07-29 09:19:39',
                flowHash: 'or5eyt5cjbcz209xmrb0krrqcrkb0a83i2t3yhf0',
                flowParty: 'gx3igxzozq6mkc4s6ql10jfe63aczm3amt26eqhrwjnagmq0w8axiacznxujawt3r1g4j8acc4ylr1y1kd6ny7eh60kk173a1aqx8uqy4ahy33itqhnug2lfhsvf1sykgz5ousdg1l7cvb9dox4qfn8oskvn0fq3',
                flowComponent: '6erv0anqc914d46i0us5hue42hljh95kf482grhab5p0s976sxl7qvj64wruqzqjhxzexl99per70y40c77xlw71worre19ezfzr3bdzw1uvhsp8gxebd2ggx4f1zrw7yx8pokflirjetj8bjyu5j7dbeu42kfqp',
                flowInterfaceName: 'qjnmk7rc0uda1r1rzxod3nnlikrp1c5jtql1cf0ay8qpb4yc0bdp2prj7u959ca3hbd10tmw6koutrex2d6z4lbwfq1fj8uags5h7kirj18bruxbmck584tj6q2csc7g6xob6kixtzfpc9oi9vmjhptca26u82ay',
                flowInterfaceNamespace: 'dalzavna3cepcwt2e5mk4pjwrzucytoh0h2cn283wudiyqs7k1z47ip0dxzgeeeesuawg2h7vbea009jcpjdg2etlrc9bj8ywwcvticy6dfjy4wq1zg7oy71jlk8z3on3et21h149neicrwshuoxqkslsnnc54s3',
                status: 'HOLDING',
                detail: 'Quod voluptatem ut doloremque perspiciatis magni voluptatem vero. Ea qui vitae laborum. Est temporibus iusto in. Voluptate suscipit rem voluptatum necessitatibus nostrum voluptatem. Voluptatem voluptate aspernatur autem quam quia eligendi voluptatem quaerat.',
                example: 'mlb8q4fq3i72d6upvohmac6m3wtz0cgws1o2gfjtqx91czq8c1jssgi24jtvlb6e7lmfwgwz1hbg4suel7zcnul6t7iiif863moiewezy5mx4hv06uxf6nfbvv9x74t0s3khw5gkmy1l4btnea6ktxnll5f4znfm',
                startTimeAt: '2020-07-29 10:39:04',
                direction: 'INBOUND',
                errorCategory: 'k1zkv73brfw0brw5xyf5po5kyboiwia42z12ip6xa3io5fip25udnlspeo9tnz8sjrix7x9naijo0ueh2coa4o3qk3qc4pwe7gxqjz4dcv6b3wmynldl9fxddyvt1yaf9s34s4na45raymxm3vofylyc8s25vh8n',
                errorCode: 'p32delkyxu6dldj0vsdgu0zy1itirhgcucjhabafz2xd7fauib',
                errorLabel: 614409,
                node: 6284114012,
                protocol: '2ztxf0oimtr1vehj9um5',
                qualityOfService: '0nzyffoo6o7j9odchzsi',
                receiverParty: 'qvhizhwfgjfk046dwvhbcmbsj37ug6gayya4fblyl1lmj0e2c7uy6tkk3vfdzoqmxu4n8e81rtv8pxkq1z5ucii6b3nbkx78f1zuoabk4l74eaipi4iuwjgrp3lr5ywqi5sjhndzev99aksqd3vbnh04yq89tybc',
                receiverComponent: 'd2fw8vf06ta3wbkn3jx49fo5t0ythrx09doqbj34edfu0jsv9cjgyzmjms9pbczd4cc58neg05m8hzooaxucphgzdvd4m27f43ku8k0glgs5qq14y029i2mq48ih3t1y1stwrbzoyrkg56ukkfhqkdxy2yx83p24',
                receiverInterface: 'rb3dbosil9pvu5rmu55lmpv6rdlnk8ldv8t6hgcpgtum3e0v3w8ey2s7ohfh44d32m1by871biphlo910vtfsv9ao2nimyyjmwsg61kd257hddcln41fum3abyzdcfiguiafbtxlr43cbxpfwf1a8u094d4l0hmc',
                receiverInterfaceNamespace: 'j0kibjs86wy7piby4d4hz68zw56pnmucld40cjd0fvbnl5wa26xt6l8qo1cxiewfyd90u23mbqzn6pwb77iphdggxjus17n596t9l1gjaibvj1n8hvdtexsex51qa2ezjod6d20ttjvqfpvfjlgs0nthl2sp1ua2',
                retries: 9506767469,
                size: 2764096738,
                timesFailed: 3126478909,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: 'vqj2egw9w692hxayegwhg1bf0p8leclts4evsy65nim706dbpj',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: '8ra8xqhjkolunse21gq6',
                scenario: '5twh0lidknnt6qx1qlhqlctg5mvbik7xqn02oa7zkpydmecnxd0ow00pm0t6',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-28 21:28:54',
                executionMonitoringEndAt: '2020-07-29 09:38:11',
                flowHash: 'hjgdu87i27p7xgajag97ezqos9afw7p12fh0uqkt',
                flowParty: 'quwfv7eio3jzymz45ieour89n0zas3fhlozf3f36b9j9n87r9j36w1uxer69s9japir46dqk0b70221voaklty3jmfe07yjub09jyplbh1qogmz62oep4ptzyfvm816x2f2v37jms1ou4rc2bm1agyorcvfuf32o',
                flowComponent: 'd06i1xysjjt7n1iliqfwuue1zmpzqmfy76smxa57dkz5m9uuc0kajf1fnh7jp48hwsp3zbjrb8am71raska6d65nqpfffh75yyp60hioy0lga33p50rsj7v4h53m6d8mkbzca4kawvs5t135n96gemmlb7d0vd7d',
                flowInterfaceName: 'ituniv9gims29d409t99b81g2sc8r4mbum1eaopqlnt6zme8wagcx8cz3x7vdk3miihl2gt0hrauur6fh76fm13nsalaw44hznccaiti5ebw99elrepllb67y0a7csciz9dbs8dh1ff64cxxevsrb6r3zazxmz4h',
                flowInterfaceNamespace: '8u5xfyvuqh5jimumsziwpczdvh2j7i5k4el64veivh5vafqsovrhqsgfbh60kvkqdfv9h4nvjjpmceigz81w6m0ryohaz5lux7nbzl1d13skrne4lyytrwdarlfgs51774csllrwc2cay07h4orkj2ro7jq78mg6',
                status: 'SUCCESS',
                detail: 'Quaerat voluptas ut ut officia doloremque alias facere accusantium. Rerum commodi architecto magnam. Fuga aliquid et voluptas et unde. Animi eaque et cum necessitatibus et nihil itaque. Enim qui labore aut.',
                example: 'd0ikzemuckiqpy7mmqpr8gx0kof0i1fbkhk0em8i0jcze2mdnbvs4u2kmijr52zq371ohku9ljn9l77sff7u4vi8fsy3cbhjzkrkjd7ndkb0csazzm1m5s6er6ou0sbc644hm6l78fcm7a1oxj7jbuxz7uz4eoeg',
                startTimeAt: '2020-07-29 09:17:46',
                direction: 'INBOUND',
                errorCategory: '8o5b7o89nzg5f3oeji2q8tn4drof5925t6dvz11kjdr31xvs203a0hn91mhsmlnkg14ybszple3u9vu35n4sl2xuyxadej4wfy8vank1c47ve1gyws8dbrh478bluy050na7uig0id5yu6vx8zvbbnxmfudqwr7t',
                errorCode: 'koj0kascqb3kzmggyzlwwx8agqipfxq9thn95lex5q30fkocq5',
                errorLabel: 943405,
                node: 2180391718,
                protocol: '7i8sd4w2hj8q5l1nqkbx',
                qualityOfService: 'pvzpdp2pxs1u4vxgo82o',
                receiverParty: 'kg811ut6nhf65zzpolmqmqpu11qi7sgapjd1gls5hbha9h1qit1ib0huuukdxtjtf57cj81p4tjg84pace7ukgiu9bbz47bsz3nnuvkigz5zn8uxvr392hdrrkbdky859wf3t37vyyvfp9khplh9jm60bvphcdlc',
                receiverComponent: '09y2lvjx5t6wtff5jwcacm1t6tvt124pxegqs1snx8dusu4u90ac2tpug12oxx0qufswei62nmm9jso1prxhj8p0l3pa937eqi9rlvxbcia3p28ofqf9wrx0yqh0hwufogjxg8ebe0e7el6h1ix7rtftzvvcbsnt',
                receiverInterface: '4w85k9gxlykweo9hd40aze4aadxkhg5hmxrayn431tqkn2ctm8vze7rojesl1g0w90hpnjveurq0n84nnubzosjr65c6fftxibmwi9pzgrurl00dkvul7ybtbcaubse1ahw2my18okafoh41qivblb6dsu32wsw7',
                receiverInterfaceNamespace: 'e709ytv35096ogr5sau80bst6lwnnglylyes3s70go4gf3nrh94qo8z8ekipdxzs31d1lzpyc6ou3xfdq46q4dzqy5gdcezktunfc4x68vpfsmi4up6n3y45lgfun5a06nzogb894cec4ty7u9a4al099sjjsofo',
                retries: 9778781290,
                size: 7865322227,
                timesFailed: 8320249349,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: 'iuyphsmonj1fsffnvuy3rinb8qvt64li8fys5u2ykenp9nigq4',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: 'e5r8lc2mkkfotr0w5wgv',
                scenario: 'jf5esawv0ikqbp50gl1wleaypewm406fzak0uyxl97tusi5stvjjp1tv8rqo',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-07-29 07:21:26',
                executionMonitoringEndAt: '2020-07-29 03:45:37',
                flowHash: '5d7vrnkr1eglya4aye07m74hzv519ydvi6cj2h4v',
                flowParty: 'm7nksx751s7ug3fbd1a8xcpaqffeferjznd1imj2kcke5j5oi2xeocxiaoisze38g0hdbqm1d17yioxkh43wly6sc9zm40lc6emiu321vxhr67buysklgpme4t5s9qtq85nggk80vv7hei7495gellghzzfu61lr',
                flowComponent: '6mov3ttgm7nddh3yxgjmzdz746funi5vuklfiadzn6bzvm4jrabmq5s0507xfy9rvje5grvsv2znli4bcq7ynticxiw232z3hjpnt93x3qv0ix9bem3hz917ht22bs163yj38havlybetcviejan4z76gkd4mt8m',
                flowInterfaceName: 'tqhmw00rovubl6mk3bgovra82dm4e1anf92kuwhkhky3wwfnjem2qvnxryzxjfvpt6j01o128ujna90bpdneefcy5ycxaa1wvuqbik0day0x0juv5n20292hdc2oy2dymfh6m3pcqvahi8dbkuq4wxoys9fpxhc3',
                flowInterfaceNamespace: '4cdjc65xo8j16otgp4qal8hkz63khnfj8eyjojpl6xe67ykfjsjl17irxtuw1shfidjgevj6a45p4q3nzvgm22ycg1216xbbrkbzr852ysgm98wwm5lacnzqmsl89peswjdx6c9wqij3gk24i6xad4qeu7j3uu57',
                status: 'TO_BE_DELIVERED',
                detail: 'Odio qui id sed est qui est libero dolores facere. Id eos eum quo non id velit. Sit labore corporis libero iusto. Distinctio natus nihil sunt distinctio fuga repellat dolorem beatae. Assumenda odio delectus illo rerum quam et hic.',
                example: 'wdspsqmwel4e8nm6cjp0wiugp3b3u8ofkiafpb2rjm35anmageoozqgehd3mf1901iszpxkdhq2x0p09solp28em4pbyakxibm4rlmkw7hi1g1qxhgrrkxt42r67753f8a9kgns45mqrrhzf6ztwlunvndjwhxby',
                startTimeAt: '2020-07-29 08:51:28',
                direction: 'OUTBOUND',
                errorCategory: '8onbnj01tw1h1v7ykxu6ubgccbqvwhspbu2ju5ya88iq00pt2m1n8ushbgyeny9jm62ke65y8by4dmj0jfm3mtkuzcolyh3fmgxbgxt5w8ir98jk094a80pcm1pn59ozi3rtxgraclw5b78lasfrvrftnu2e05m3',
                errorCode: 'dn36z3o69pj7xnmzdenqfyrn3ghcgqpfh8v3uoroldkn9rwcz5',
                errorLabel: 911052,
                node: 1453510618,
                protocol: 'zw5b1qdj1bk3nseu7rla',
                qualityOfService: 'ormhqsmcm85mn6rfh2py',
                receiverParty: 'z5q61xrlnsgsnouvu3oe7xhruc8a8h6uatp8nit6wugjjpevvhlz04onvz96ees2ka81pmhnw8m4k81aio8tv8l4xa9ni1qgq0d6938twc1dhs6us52i6tbxe2m3x6ynjyjr7aiyy59gn9r0fv68od3s1nmnhysm',
                receiverComponent: '4rzcjfg009tnebulk0o4vcoytay3yyu30iayz89gos977mdi5v2ym6kxb3ab6qj17zfxucztokdwq9febfadbpj9io4lu883nlw0vyg90dv5y9cx69ehsrii8nr5e35b1rzzpuc4pa2keg1i9q7v2wfii7ezm3aa',
                receiverInterface: 'fib1wh6gj43x1ape3ugi5hf7n2at9zual4qo7icayfkp96ab5zcjaecal6gs67tpuc18eg335a3s04b7qv8kzyizxj5ge16v7whmsuewjulo8yl8ido7k9aggu5tdlwo5awzx7uaf3u7g3wyai532gblyh0li2hk',
                receiverInterfaceNamespace: 'a6qycdvhqz0rxm46myl44tafoonx6g5dif2w4y7tukmvk4p5julo3o7mprcsdzgo985f9blnyeb7442oddihdr3zevphwxs5u31ns7ew9yondmj37bccgvkiumi1mhkc9rki2nlm0png7gf0aitzn7mi81dg43wf',
                retries: 2064388463,
                size: 6383559930,
                timesFailed: 6548331849,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: 'hszmucxpotdciawlt9dappfww1b9fbp2gleoltro8yervnqpdh',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: 'ua4tyshd5jqkhfpuzyvn',
                scenario: '6yux6unsyhtvzfsculkpi4ffkt19pkjgznmxmu65rxnwg4zfk085bbdjardf',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 14:12:04',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-29 01:18:27',
                flowHash: '5l2ujvvprjwo2mrf9ihfvg3bng4cv8mtagi2lwxs',
                flowParty: 'v87343w0txa56cgnxo4v9fmhkwcgl4ps3sorwp91sih37dl80dz5f6fjg95n0wipa1qaqx82a2zjqgxzrhoa2lvk7ckyt2grs1112c6sqtq3l76p8se8jldnefjxshb4r6la9ffb6gzheiheerhx140ycnx4bolc',
                flowComponent: '3y76iv6ucdkunz5bk0tccbpd3mvt82lu8kp3pza63kw3pvv5ccxo1mfvkpnnplzvsjv6tahdfn14gmfkbu72j7h6zm990214x3aqkc28l7jicdjceqc3ivgi15ry79almch8iow36ac0st0jc7u90z2rp22qrj70',
                flowInterfaceName: 'k3h0b3jcvear7bt4cx9o0d6qkgs49eyz1nkzuxeph1wsev1hz4oeeomfqf30z1x42nay7yo5hqs2d78m2c16cvkmfkf2l7z1o15pvyytrrjzy5a6x5zl7wbaefe9yxvhi2bpoa1wvr8zjks3t24j620ods9g36s1',
                flowInterfaceNamespace: '2m99nkflgxnb9lbm1bkx208fmnhvkcgulhkocpzgm61kv1mmhveofa0g29m1cnh4btqwppvjn1e03jtvsozhl18pshky2tbsvmyexqafil3tq9e625b9wub3dl00b61v3npp5qm2qlj9oztw1uj25x4iuzinpkoo',
                status: 'ERROR',
                detail: 'Nam est et enim et architecto asperiores consequuntur a. Aperiam distinctio voluptatem. Aut unde possimus similique id.',
                example: 'rz2ihd7azrlbz7qxhjd5u5hefqsd3mf15rygn1285wuktxvzm4q44of0536x7yv3wmvj852ia684tnoisls0f1uopexnus21uo426xxrdd4uye78esly7r9efba579f6bk9bq8emgehttol5mcfbkcsimndr00m0',
                startTimeAt: '2020-07-28 13:32:46',
                direction: 'INBOUND',
                errorCategory: 'wqoeyquswtf1ogyb0w0ncoptncx8ojro2u7n9l57ebclftyb11s9mab1vtjg80lhjs4krnx0amteyjb54fnkfu431tt5eoytu4py8qzf3hokqvgmsbjaxu53i69n45gwvbslagr4nsq46qcgmeyus7evdeb3vg6v',
                errorCode: 'mda5g9k5kar15g0lwbty5ywp4y3svqaopmsomddafbowwfj0fw',
                errorLabel: 957727,
                node: 9923578249,
                protocol: 'gtle0etqinymaldxqf4o',
                qualityOfService: '8yfz4d88sbhlwgi85bwz',
                receiverParty: 'icxd0n0mrk8xmetfkxhtwjf7r9hfhmfpqsq3szr7oowcepv5nc30fdat959rh1z7kyljlgil8xhvyk7sv1ftao4ahk7nou43d71wpu1vxhf8w9ausiaj68tpmcoijt0jtv29ydpr2zwfm4f8l1fuk409oxfi58q1',
                receiverComponent: 'n43922lmk73uagjjpodnxefbho1zghqvz1ir01bwtog7dc25h324szka0vbijuye0qye5snkqzvqntwfc7iltzgn0qsy248zquvak7wujq2r0qlcuciq6sfd7nlghwqsoj8qouggf5kbdceswiif89sbf3vav6y4',
                receiverInterface: 'rnx3gijstdobcjbd5n31xp6y5hucq0t4bk54zwiw9wt53rup8ui6hos6deru7vfquj8lb2cumbtczdfzhclbp1boh0p68gdgmwiwkzrg80p2cwzbnwe0xwp1howtxw86p412xpmrvanf8mik1g41qwvk224cwlxq',
                receiverInterfaceNamespace: 'bb1bacdvk2c7lisi9njxhz0qhy0d4s97du1f9w9spfnqfynzx8256hk0o989mwy97a6ooqw0ethulgounwqsej2sx4wnaaeoq5xmntbs8cb7no6aopdnwb93z92yvf2rrzk1fd712vanu8da9cct9g0z8ln6ylx8',
                retries: 8940518788,
                size: 1781992716,
                timesFailed: 7755590828,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: '1wcq5x2yp1phcq5v4nndg2c1m1rs7n35abk1tv0yletifp2vax',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: 'hkqfreof8h3hcx8pnxhe',
                scenario: 'f4al6nsczhpwh6nd71lrztgaxip9a97odk1li19u26n4944e855fxmm6ksjf',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 21:04:07',
                
                executionMonitoringEndAt: '2020-07-29 02:48:21',
                flowHash: 'onerxctan1n2ewzo99a5rfejacbyvrdfj0pal8m2',
                flowParty: 'llxe71ys5a884adu1lmm5do2faef7biye4xkzjmyjlsik8dzuw77ht52k0qbjdt1y9q89k7n5b0v01ygygs5hydtgqof6q0bo1kiaty0pobhiwj0eh95mcex9tex1s4n0nd6gmzy1ea3buau6v1z5i64ts1a50uk',
                flowComponent: 'flrg2tshr126q63armi1qy14xrik2w2vbcki6urmgq6uyuk47ykipaekvq980xva4agrsxva9on2b1r1gf4es8ff6umb8kxsan72g3grqt4vfynqczbielk90bncinptcbe6pywxkv68txxqr0nx4jqrfe8he7ms',
                flowInterfaceName: 'z8lqqn0k25ne3nxordu8wiz2rbjxk4r4qa8u9638j69d6d5qkgf7qcph9luk8vpwrqo1an876m88i0u7qk1hzga2zjtk9vbrk2q859wgc43w48qs0ex2x3drtq93z7feijq6kc9ru4emlw7an1tfciaicwrw4l6f',
                flowInterfaceNamespace: '19dizjk3i4dk78l71r5jogubcikytyqzuzw8qyulwg852b82zgoe5i2p2eknati8oc04652vivbfgqjcjlr3b0hkkrh5umuc3pnre5hbgd1xiprtcosk88s3t1rjc0hxzsx7jzx8tdbc1jtemsif7c3fp7648xma',
                status: 'WAITING',
                detail: 'Eum facilis hic voluptatem autem maiores. Sunt voluptates est nemo. Aut ad at necessitatibus laboriosam pariatur. Dolores vero et et autem consequuntur.',
                example: 'gg1rly4fef4mgkrgfbxz1stwx0ffvr3gknxlxewdafghl0cwdqa8rnsqdiiigwfqyfmdxba52vxylv87z2vky0gonnihu1e0p4nk17jin2vj6grri239hbnyab4s5464minpa2xt3mcg2nato1qsc3u5yhkat6sh',
                startTimeAt: '2020-07-29 04:30:28',
                direction: 'INBOUND',
                errorCategory: '6xjxkymx7dxynapgllaevubtczrbqea8ubiu76zu77m6mlltmoh7kknutcqhy1imvxl85sssgtd88s2jel4nedo9w7cqylrxr8md15sjurczaui111um511xt815foim90rkaadvx0qiyc7uezh0b1r4suux29xk',
                errorCode: 's1cwyq101rr61uwoyr6n9j06tet98ed0m3uuxekwlpqhh93aq9',
                errorLabel: 650992,
                node: 2154575644,
                protocol: 's7zmurzij6888bp6ekai',
                qualityOfService: '640ikt408jzi4c1gx98q',
                receiverParty: '8mxrzmjm27m9xtcd02x8jjyejtb9t0wpxwx5g2dumk3uwin8s07br6dmg88yfndx8vw30o11clb3kh9zns9n2x9rf1tx5q66k5jyt68ny4qpkul9s8qlogjjjfusm7qn9crrlgegdy5jd0jpmo8a26ya44vahlol',
                receiverComponent: '8cgct81ygktlyi585f5yt2zjv4ef9km2t4cop0l78iv1fn7he2mjvm7akw3wcvtfv2l7bjlbma5xvyeg5ym5ffod93u99z8axvh39zc7iyuk51buxwxcr31furx74y2h1e5s2tvwyx364ooor6hfu7hzo1f4bdkq',
                receiverInterface: 'o0ygtp2gipd1e0f8tz3dxxc9jm8sve3bwxyucbosrxn9qc79lcd3yjculi91paai78rqg33xap8swmf300233z6tps0pgeodussggpv42uxkfce6koq95q5revorlpnjg0r2mkul243jnnqwsglpcgbya1ynncw2',
                receiverInterfaceNamespace: 'a1qu5t3epman7okzabcis13kqg5n630p21dv4mnccdc5897zwf2dmybdy5cfuf5jxz06fzg2hmdwsg7hu0d3n0kgouvuclmgaqc9uf6ltkxghf3gl3svctrlvbrx19bo8y9y3yabfhxioi9ahzb9g78jjcoioe56',
                retries: 6580810215,
                size: 9914119170,
                timesFailed: 6412975647,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: '261f0ty153khs3canmd2n06bek5qpqiem2zqkoqtkwxeicxm60',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: 'y8flsrlh1olnw16q1t53',
                scenario: 'skzc6n7u90b8hsr6cvjzyan43fni4mvve9bkjtx1ytuenf552ocjnpl89gqi',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 15:34:51',
                executionMonitoringStartAt: '2020-07-29 12:35:58',
                executionMonitoringEndAt: null,
                flowHash: '5cfkxfqgpxa7l6yyv0ms1nqzf6b80dl4g7y8qm7p',
                flowParty: 'ip62nfcjoxepk98eldi6z3mlaqm991xnnms5hiw1ltr4o9wfti0378xnpx86jpwhgckjw0t6o0yco8fm4lxekhf7i66xpjgqlo0miuq0mmzemxsd7kykvggk2k6vwtkgktgax0hwlwmpemrhx9rkf228414oroer',
                flowComponent: 'v0gii7171i5c1i8ybn9930xqp5jj9bd93q5mtmug52d2j2wj429hs4f8kdf4r3z8n0462noreqxre6f2mc4tujfg7pr7z6triz8gol122mckzwsqwtsk3omay7v5r9rueic92gbhxl2ywlpxedu8vwidmea2fhp7',
                flowInterfaceName: 'rxrgezmceatmxppr7a5jjhjh0kp65v9g6qwog7o12469e8ujvyagvwgkvnp6rh9mbxrrw9ytvbz65z38fitma8mmnr0pldzdd7x8ig39hc0j5qvb6gnx8l2kqeciu9brh92fmtqgvpx89skcawcj1gwa4elxuqqu',
                flowInterfaceNamespace: 'loffqct2vdsauo257jdzxeeodygtp774y2u6gthuzqzfwahb7wj817ogs0h7m0hbvn3aerv44jlfxrit2ho0ctcbjfce3a6ngfsumqj48tardmg2jm5zq3uyt8tcvc0n2qa6co7drrtkdymz9hr1oqr9xbksaeap',
                status: 'ERROR',
                detail: 'Et aut asperiores quo molestias impedit similique molestiae incidunt. Velit ut animi rerum nobis accusantium. Ipsam nihil temporibus unde blanditiis enim.',
                example: 'ile0mz7tiduhebz82djudhrh9mf335h1z6q3shtxkue1cvo4z6hwse1s94afgqdlf4mnvw3d2krudejrmonbgb7kj3b9ebgxnn8gbah8j8weprc9q76rfuig5iafhi34vwixob2tev2nazx87ayssvpt40fk49kp',
                startTimeAt: '2020-07-28 19:51:52',
                direction: 'INBOUND',
                errorCategory: 'bnwqme5bk6sj91az1la4x2fxq46lekckm8u0iz0y2s6d35z8waarswisgf5lbulri271vj36b0b79herwj5xsjs9uz6k1f2l9xveu92l9ky8nn89oof83b2gpxvjjgzdibyov8kzefu8u7lkbquz6vardlz774rz',
                errorCode: 'w8snmx4uiktuu4pctj9mk6gg70zfnboy6f0wpaklv7402eld26',
                errorLabel: 797030,
                node: 8743326271,
                protocol: '7abqrdu5f3oml08kkdd2',
                qualityOfService: 'hbue4ir58dnqnoenhtn6',
                receiverParty: 'ghdn1ag61wjlne2h39b57eyx1vhn1jsrhl13evg62cxtgzmv8e48tf9nir74u3g82p8zfsxrd9kuyv2w2fqcggtzly9qhuqkb3fa401rrj2uxec3ro9jr5prrwszrv3uq8g2ppepzucufg809m9gkp1bdxmnhvm9',
                receiverComponent: 'rbaaxr85g5k9i0s5najj3h7nbukvj273exw8ok0gb9umjccwj4yq900sdmot6siyxxpv716xjxpded8mk95rbym9sjo0japhhwfs32qp9lm7h6mrdgqjja4j4wdb1qen9lehspivcmb2qnzqf0twc0w9qo0u9vui',
                receiverInterface: 'mxwq251uajb034qhpjvcrw3561u6oan3bgzcjrb1pofg1ulyb2hl8sltfzp5h3097bb0a3k26cm3y29025bio1a9hcm4leq3q6oy3aw5s6ot5jox220akp8kai5s0phrwqzw8cpkml5xyrjaozuw1fk7jid8ut1z',
                receiverInterfaceNamespace: '3gnazfyyknksumw36s4j2cy00kl6mem3qswtgwq0cpgryhj9wo7ev3sycxf62ffotm0znupuueaqaa9hmqvn927jasmadn42dypacwatleyxaatobi4c3uuf7rvxopost6pehikdq113c3cv1nd2es8a2em7or4i',
                retries: 1097653969,
                size: 6261103944,
                timesFailed: 6187715193,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: 'y7gn08yede1yikz16oo1z4q7tqg57bfp32v454lq0gtjqsqqlg',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: 'nr8tmrvw54n05ogwab16',
                scenario: 's5g9firabmvpc0qss3y0cqsqc22128jvn57aozc6w50yy0i6v2wzk3h2v513',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:22:38',
                executionMonitoringStartAt: '2020-07-29 12:14:10',
                
                flowHash: '2x0yqf7cfumh86du6lputpvfvcrqh2po7h397xpy',
                flowParty: '6s8fv1nt2joah6z15ul8mvthvxb6szdgyb5d6by8tst9jxcmikzge5h6yqwfg8m3uuxl8kfrfi7jb6r865u2svdwxzsooneernax1r42xiukmyo5lgvsb4ue6u7fvszz4s328xlge95pf2p6qg2ecv09xt85wzn6',
                flowComponent: 'ketosezae8ql14tk57dlbpgd8yujzy0h3s0de4pyktcts0mezkyg4uzp8v6tf8z8sva9g1j16xlbr5pe8h0gfnlxn4dop1e7y47p43ynye911jyh19bl2qxogj11rvigfvger0cbfih00dam6evvxsikk6y5s1k4',
                flowInterfaceName: 'rniit2vtbm21la80epglpu4dyl11k4kfhyn005j6q4b70zpygumxps17wb8bzlzpytgvgkf2uxd19d7omly53qyenqut8x6v7r937mez1ajg8ipipm9rvjb962jkv84i3w3w4958y2qwzn2x3rvq1q8nee1vi4uh',
                flowInterfaceNamespace: 'ir89nxgtux29gh03bvdad0nktm5g8cl2rs6wayxh3igg118nq9vznuh6esp79w2mkm8tpwzkevdcsy7ipnpylhgobf4ke6lkr86s05svcd03bgeh583q2fv5blobkcj5as2zugpmwvzy2ie4s9p4ra3enljufuqc',
                status: 'CANCELLED',
                detail: 'Adipisci magnam aliquid illum atque consectetur velit autem laudantium excepturi. Maxime voluptatem est pariatur iusto quis enim et accusantium. Consequatur rerum aliquid.',
                example: '7uye7c7ycen385qp55i36j3hj61mpmn1k9tnssysmtdil9cc2vo0glvcwio8oaou1lv6ndddqfiwv7qqzjfijgbyf6usnsbi7g6f364utdxpyip6o2nlxajlvp1yjgcjgz9lf30dpsb3ykkp3yjd2bh7q01es8yz',
                startTimeAt: '2020-07-28 21:52:04',
                direction: 'INBOUND',
                errorCategory: 'stbq1z4yn4tm0w1h96k2ung7fbh7w8548gsy46bu3teyf24szmp1cll37lhwkv74bkopngl9a742qwpvs8zaglnpymzx0bfswprb4aw480p5hax90xizhcz3fjhkgr7x647bphkwyuqd5o8aztcgcxuruu0cm9qb',
                errorCode: 'c7zxq903cg5j4z3bzbi0mr5scix1wj4gvykemjklva82s7mcfe',
                errorLabel: 548032,
                node: 3828610982,
                protocol: 'xu726lh4yvnt3zh10zbw',
                qualityOfService: '5d8srimrfyztf5lxaz66',
                receiverParty: '02xyckavdlbjrkk02ukn7wq6cx7og1dr7yu6cx7422bgiu6qzmsqjbs9472cocrw76djls6b4jprw08v1boq8ymyqaqr8yoeuaw628ix3be4xpfwy2cal4gi5djtup09gy1r3x0x9fw1eak3oxt70ccv8zj1tgi9',
                receiverComponent: 'dk78h1l3vcm3qx1f6tv9jm4pofol94mubimrk2rhrw647ypdz8z5f14jh2xwgeb19kgtak77kmhcgipu3a7k4h5ozicph21s605zcgofinvtibb5kuvrhc36zjdammqetv8yk95yywh6agp8nm84hn9yawpjjwd8',
                receiverInterface: 'x1jxuc1gduq1so0m94fk8sd1n5p1zwyxbwlmg9745cvoyzwp1u2fesguweiloynst3fa1z10hg4dqsr15kknd5ehl7sjk5znhzbecddem6hl1gelm4w701hz3bbhpr7basywv4iihliskbsmo5n0bkyp3pyhtoxu',
                receiverInterfaceNamespace: 'c90ifqd2c3mq2gj4h0ervof5eewvb2rbri02u7umttll7m5ja2upcowkb4z6ktbdcg8frfmpu5w6nlr3dn0cgw1crer1udok04ojc2uxxdr5tmjpyagypsbqfx3revtvjgdq0wzqn4xbmgyd2w4zn0rnmc6tgdr9',
                retries: 2262632781,
                size: 3476581441,
                timesFailed: 8853339263,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: 'caj21bpj83u00yjcbvi03cxwae2513ulzrdj56x2ek06wqta4i',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: '5lb34xyw7i4y26qtm6h6',
                scenario: 'can2mhz6rau27xmsrsjryos370kw2n2v3ahako20cgaw1cv4qrjfv7cthll9',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:22:58',
                executionMonitoringStartAt: '2020-07-28 14:44:25',
                executionMonitoringEndAt: '2020-07-29 09:16:56',
                flowHash: null,
                flowParty: '1ov0mv0dptpw6emlmfa932yw564nktwi6frhkpq0u631p6inzfc26ui617xlxa8y9ignvm1aljj1r9gjlfidywwhdil30ql7kioxx9mpks33x3zrxre8pxnj7q0z8b0i6ls4yzb42lya953w154t8g0o16w9e5do',
                flowComponent: 'y7xp7nh5r8o91p4zit4hyeep2l3i3rvfhd9cc5w9v261byenf5ph5ghpl2r9b0b81iu33my6laxjf979xva60li19fyqvbwgfodux7j1ypi8rzoo0ivdzj0mr13a3jl0u34oayxzf1ztjvh69y6kqy7xobeas8h6',
                flowInterfaceName: 'fzfmidgspplyxpt6c6utdhl00w32i34hyrqy7xn0t0xjysh3vryckmz5l4qkjclzfvmelqbdgesfec3sqmuz1wwayfjll5bddtyacpi3p6b6u8t1eawfalc2sml77jygvtd061y5o99edkr6k7fdzntjvcnhzr99',
                flowInterfaceNamespace: 'm8qc7nb909e4azxs383z43zspsx82rm9decanagkxt6v216opx0lqlq6i3z5itk1f6o0o1idjk2ph32zsy8ndj9hycakcbxsh80pus83jbwv5tnoimbnljo2sxvtpda9i6j8dnndbmzon4r58zelu7rnt0pkajh7',
                status: 'HOLDING',
                detail: 'Autem dolor sit occaecati dolorem suscipit. Quia officiis unde et provident modi. Suscipit quibusdam qui. Odio consequatur ipsum consequuntur ut odit in velit quis incidunt. Nulla qui voluptas voluptatum sed. Natus voluptatem reprehenderit dolorum deleniti.',
                example: 'k6pjr4b7z5nv13tbegjl8e5jszay8mbtmtqabyjadw11ekrxis1o5q06p9aoth1bbiyhs5mxuysvty5wx03ss566mpedm8hsr1ppvmzjynivdttq88bb6rah7q95g5jltyh8awp3l1w5kmjhdcsb9xb94od5siwa',
                startTimeAt: '2020-07-29 10:01:47',
                direction: 'OUTBOUND',
                errorCategory: 'ag027itrabznarpuu4ournicwg7dc7az7whryfv9sxer8dse9fgomcqnr6w35l6it2pzlr2n24zbukqcxcdpomi7cgznx1yfi1pznibbheh90ad3tmid061w4fa67b83xd5nfbi7uh8upzhl9dkewu439z2c8rfj',
                errorCode: '9pynekn3iuoymd1rt5j0loj7hu2k36gm7gt8ldqidy0ucex5u2',
                errorLabel: 875774,
                node: 8290376261,
                protocol: 'om8hjf2dpe7x08hej9ae',
                qualityOfService: '6qpcj8536dn9zm1zgf51',
                receiverParty: '7g7p3u88ce1x82x0r7fqpxd8condyv13a3mfphe4qr5qofhelkvempxu8l1aq5bvn4wzb0w41l5ddqdd127hlmvdljp5nqdkqs8m6z5threpf9fx6e5k1mvnxdkoy4l5ev9uzc0s8q49vf7m1kxrp40nj32gm433',
                receiverComponent: 'y3wcs7p1jk8rk0dh6cn33dadkoaf0ecorq2voy57ymokb8zsin2ew9jo4qvd6fa0wkxsa2ngoo7x7l60o71voecmh0gqfr9taeck0afhuwbbk4ac3quwv1zczbp4z8d7zo22u7gzybmyqejs4zs55z294unq5ty2',
                receiverInterface: 'bri39p348ag9ekiu4e2jf7nc3wcijpo49bcbaol6kzpgztvf61k67z2d5p3hyp7gj8te9z2gkqbza4d8zq08j8wugvqa4btbqb477wfw5fhoi43j2h8al0qyaurph4fe6nukt514w953xyibtxuzjvc3qo6ycxib',
                receiverInterfaceNamespace: 'fieg4yamb4nhd4u4i73gh4mruuosu3toj25tyitvtqrjrzftzrnik0d8kp7lzv1ue4g3fqafmrydalouhekvzo7o1xhwtp49jqhe9jh3ync8voi2mwuqne48xpsmpqm1lnna4ljfdmafkcap9g8dwt7ln11hqk02',
                retries: 6673809442,
                size: 8869311243,
                timesFailed: 1048347635,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowHash must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: '1d0lvmuai34w9oxlkiv52gp9kek1mknr4p7i36tz1hfvturjb8',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: 'q5xsnvgpgkjbxd7buhjq',
                scenario: 'dmyyyhcce8xobemuentz6hvtpxq7wi9pea2srluz4nuuik9j4o4ag28b5chp',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 06:06:26',
                executionMonitoringStartAt: '2020-07-29 08:48:28',
                executionMonitoringEndAt: '2020-07-28 23:03:14',
                
                flowParty: 'hrmzjvbs6zek8t1m326pp6mesuy6dkagxgxisshrttvuv9sgfl9et1m5k9xxezlcfplm8x1oupv3w3pv5fb90ul17ecmurj5vb1s0me7zeoszb1vh4dl3ogb3sqbo8mo3ii25kqy8b7ciemy7goj6tvts41hoqjq',
                flowComponent: 'mn8bq8sd73dsh9itg4sni6r59bnkwpnacj8km9gft9m4a8mcsi4x6wzgjmo9c7bj64sz0n204vkvew3ur86xlfqdfe0i7sgksdiyx5muo3odn7ifp68r4nsfnx1g70f90qk6n2rwxt7pkhrnvxv20tu6cdfls5zl',
                flowInterfaceName: 'c7ik3516papeba7szuhqobn4aojwmyk3ox2xrrqjk9z1t3tuvovs3caoa1e10isgd99bdlc1ns4f3frg8buj8iuefnzbxud7m4dtwjvcpcuc8dd3xptnqb1bzzw45nai4pkfu85klwb4hdym9cf4jdquz14xultw',
                flowInterfaceNamespace: 'rn7un87xkbtrujild0h8c0ezw76hmwstmrniobcovj7kxxfmleat2nqbrwblqhzp8x5yvpfs5aaeurb67as1v1u0pg6mqvfgr4ug9fqg3yycqsgej54ke0bzribraxvtfe4nv5i65w01ktn1f2e18mcq1yzydl2b',
                status: 'DELIVERING',
                detail: 'Dolores eius perspiciatis. Nesciunt nihil est beatae asperiores distinctio qui. Corporis necessitatibus velit id id aut quo rerum. Eius tempore expedita. Delectus consequatur praesentium omnis. Id rerum rem doloribus nulla saepe et earum.',
                example: 'yjev6q3zsyxnv5bw9x8m9e6l6xifbg0ar5o7kuvxxpue48dju62jgnop0vqls241xs3fju0pgysdq9og3oieixnnbc09gs2fgmroum8f30jx9ow7c0od09e20w6n2pilkohxa5cavtfyv04uff4srbnpv3auecoy',
                startTimeAt: '2020-07-29 05:07:29',
                direction: 'INBOUND',
                errorCategory: '9y74a4imw2bvij65ew9hiutw2upanhr1li2lpfyhj0wyq2hhcoc9rf6igttnfeagebsmsewhq78lcnr2p2x7yxnmhk0gnrwlhb9m9uhmh8t7hf2967838hwr1d34kdan0hjwgfcggki8oy15riiub04enu69z01w',
                errorCode: 'dzch9fp07go6e5ctgozfriiar1hdgfcsut6ndg0gl46lwoac7l',
                errorLabel: 107360,
                node: 8192196788,
                protocol: 'dfhq6gc82a6ck97f32e3',
                qualityOfService: 'x6accrcq3cu4n5wf4a28',
                receiverParty: 'gisoda0axk4925jnhunzgu76l0zvrzbieiecrfsf07cy8g4q9ypeg957z492d4n0bbqru9hj57cje84qsfitqcmz3i3ymm4opp2kkxt4wzro6hxdmsqvumopi6herm15ylwrvjiatv90vsfoxvuzpuv2kd9du1ry',
                receiverComponent: 'hnf7qmaoqpac5odszgohbg4k0xkgi86mm1w2xq89fo2zs8e3vn4irfbwcs4t85rkeb9ytdg2xpl5ccoecuo5f420peghqk1yid7j981gse5g3mony6mncx512y531b7v3bmqem7iszzmm1h88iymnup2u7g0d6er',
                receiverInterface: 'poqzpzzkmh3d250gqsffnlmwzsdmmyafpdwuekffkuato3uk283b8aatdch7ciq7gcyautt5uxkrnnvx6msw3o5u8xzg9eq0bss63ehcbh73fe2cwicl646842efltxyoay4461zm7yb5fqdoofse9cm2pap1fsg',
                receiverInterfaceNamespace: 'k9htwqppyifh7xm4d12iaysnve72fjae3bskacf0skwpr6zldxg44iiawf7wn0yip0kz7xcuwhx0ozkdfg928sucu3nbvvpduvp7arpo13ftyv28qjcy0i0pmhzl50rfrnqdqswus5eovz98lgwsded5ur40vnbz',
                retries: 3848207307,
                size: 1455887092,
                timesFailed: 8177017942,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: 'jj4usqh0fio9eeswjxvyy5us68w6i08qga8us9ympdenqg0h8r',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: 'zv7vbdy0jtumyc09tpq1',
                scenario: '1mn1ankqdhumsnshjjpvpq9yd1yu38cbxek3cabkztz3uxou4a27a7djehe7',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 11:39:19',
                executionMonitoringStartAt: '2020-07-28 17:23:32',
                executionMonitoringEndAt: '2020-07-28 13:40:44',
                flowHash: '88szczj12oryot40gkddrifz9byuzck0y9sk9zvw',
                flowParty: 'npglcyo01y4zvyve89r0vu14wjfofjp7ysiwkq7dm0dj7ethyned1nal5yp62bdo21uxfpq58r3au788hlw98shz9eqfurjvoecjdwg9phry8o4zxt2orfg8qodgyuxd5mzzpjbfb2kn45wyd7u2tx8xsvos2qyk',
                flowComponent: null,
                flowInterfaceName: 'jq0o5suwcarf4ti5t73aeqwrpu9vr44hvpjp51hzsfmvjkyiu65758w4bjmc9xrygp7wbohxv0bxu10npkpn7d4uqfygck40gcii9z8fgx1fxzj330ncr316zjg7hug5980wasbj5bgxxtc210zujo2yark2dwzw',
                flowInterfaceNamespace: 'hfqi06ax20isptic1sjlgsrm8smv6m214by7a7h5fwvlva6jufv5f6im51bnek239ug6i9p20ghq5jv1uqmw0os1s91ozj2akyzkc7cle8v9fiftjsvsmav5syydxufwxf2fq3eb5zd8lcomkn79ldw9hg54hkl1',
                status: 'HOLDING',
                detail: 'Aut consequatur quis nisi quibusdam et. Similique vel ipsum maiores iure. Aspernatur molestiae tempore iste quo iste in.',
                example: 'u3xbaf5wz2js10lh0opoyyxzepkvw1vts65fq5ih02hp2llrrg3qatxp1u3s6gljw6zvxmsut1c3le7z91y5zvi23t08bsfpgzz5m0ecr8xm49xehxmxshkb3jwfqu6n78ru0w0hykzva3nnvpmg3irlsm3cjlmn',
                startTimeAt: '2020-07-28 16:47:55',
                direction: 'OUTBOUND',
                errorCategory: 'rc1v96ilxl84s5rjkd2vd7adl3w3oktbvuudmezlt63wxwgax1m1jtpxdw33hlwfgxl3xt5it0o3egfsatuc9do82i9pxhk646fee4i7h29wfxns7302tekk5lr72w2kjvgss664q3dcwcc9be0p0c1b4id6s1zu',
                errorCode: '0a82d7qheyo0mgek6h2npm31bsm5effx7b4r6n4wsnwamtjpmf',
                errorLabel: 839850,
                node: 2273755362,
                protocol: '005nq6gctv8w7pyf9s2j',
                qualityOfService: 'qgoqnvyf6oxqhagzotpu',
                receiverParty: 'jh6vjbuycjy7askm5vniwe77rwvl9klfce62ycov1dfqoc76bqzcskojmbdadtv6vquood2nkdtiqbutxhvovawudpwlnquwtuopm80w7qg48u60p62ivjxop3iompip6nqxvp86gzto5qbhb87ifnne2v05mj3z',
                receiverComponent: 'qortb5y8nzl6ks29sii4a4o7rtqi4zhsgvuqpsgdjjvobkidctwt6mio4omj8jj2k5abrz8dmvd9z6qaq8woatnxf9866gpiugm3ew0ewcx3ath642d16jy56trlgfxak38ue1lz9liifqo2p33dz4as0aej7p8k',
                receiverInterface: 'ziaq78jjyss4voydhkptd73t1gnnxncm5pohiz3chnwuvnhgxwspccbx7n5dh5qr6ywe0jhfscr3th24o0y83p49lnvvf1h8kk4eke7b6dvb9vrm337t8e0zn65sal9u29evbro43q830kzavqlxwpzkdscerv4d',
                receiverInterfaceNamespace: 'k8k8wml7bcxprzkegjh5l4y8q9sof5dqniapd7hqubij1pya3ldv1hwc0711gufjq2ky0u1hrdju4buzw2m7v2irpoc3jp7ez78ufn6jev0p8of0co3x7rzjehvl0boaxc8llnbbi7r8phqmbep1hq9u8f18lbb9',
                retries: 7185862082,
                size: 9818925616,
                timesFailed: 9168521363,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: 'd8y6uu437f8trsqqauz0y5f2nf7ljeexl33cwmhq25q9uem4qh',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: 'uduoosn7akzpd1ywzf9x',
                scenario: 'mt93fzw21jrhklgn4nrqdmkve023sxo6vw436n0ieyihqrznq2mcz73q5hdq',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 02:49:01',
                executionMonitoringStartAt: '2020-07-29 10:13:02',
                executionMonitoringEndAt: '2020-07-28 23:11:37',
                flowHash: 'p38tfeg0gc6xywp1tqefzhvpcbsxct762ghq4k5i',
                flowParty: 'x0o7f0f9is63a18cm6pwktwghnsbs2i3iwer73em5h272l2mc1bvgvnkdyzphwzmdke6udc2p1zqpnma6pjkti3b85uwdon7hbgstwbxrfoayg61cvl1winh4h1wjgwhfgl8dlnuqi4jgm0l3nap12fa7kic0vci',
                
                flowInterfaceName: 'o6wm0acugcp9bah91yzoymc3evc0sgsf3v7b3ac40ka6zcj6as9c98d3l7dhq9cx82qbg1mbuzzobua7w7rkshkbpuzpu9w15o3mdhmw6x8ozkedom5d65682b9p95p286o3qminlgbne9au8p4o4efk6nuas0ga',
                flowInterfaceNamespace: '1cmtl7jy01moxg048jszf8yhi8esapn1xo4rfjfouq8whc807gi2fv9p7e2rdvbcwrnamu0d1vks7zabvkr8ooz7gwubc5my2m4bj8dbsi6t3aewslhw4m87r1ls16vr0zuwd1mxa6qvxok79sravdhrj5dwwyyp',
                status: 'TO_BE_DELIVERED',
                detail: 'Delectus odit ratione eos quia commodi vel quis et aut. Impedit accusamus enim. Non laudantium animi voluptas quia tempora omnis. Voluptas et tenetur labore nostrum minus ut sed et. In aut quia numquam nihil distinctio consequatur aperiam.',
                example: 'i7quwk76kxyadc7w147v5sykbv6zkssk7ypzh3ldu3ttzqo5xuy85kxp4zwozz746ik82m7gkeu4mmsxqr9jdwli0y7af9tyan2598hhkttzowyybgb69rb0n0js4lv6tri9hcyluq543sz4igd0jl023z9ot6kt',
                startTimeAt: '2020-07-28 22:27:30',
                direction: 'INBOUND',
                errorCategory: 'r5vuv48utozxfiqt9h2a2ko7e5d3izjzpk018xbkvvedqvadhheuhf7zqfeos9izio8mi7rnw42fmyuyx3hzqgp94htyprjrqnuqejq6lwnld4p5pz5fv360i1m0wtzsrj8bcjs3q0o6qwr0t9q3sk1p14bxq58z',
                errorCode: '5bmoyxrz0hnvtguika3qf4i2wqt4y99nbfo1wb72kd9w7k47ty',
                errorLabel: 308275,
                node: 8057160889,
                protocol: '2phnmqf7mpt83w46n0ns',
                qualityOfService: 't54psgtvlusrp8mu4vj3',
                receiverParty: 'aud1nb9g0pl5n51r5yxskfut5lfgng2i8id3h99adukc5vteflapa8yde4i91l0s8svarqb4achk425eezh4kw1dz1e0d1lt37cdy2g2fdv6uebm1disxzf3vr5ja3heb8cuwzpmnkmxl7tqpzwwhoiae4whdrbp',
                receiverComponent: '65b00m2zes8ytqu4j4cv7gyvuwc6aj3daz9cj5pso39bzbsreb6v2365gd47jlfnn5v5jigldsvgd47kyjao1ellitht62y5fhx9jzn1tjwc3hh6eepvklpij6k2lmqyixch840aw59eylo304d4dszdna5zaduw',
                receiverInterface: 'ze1y0bx8d8xm6q0cif99fp4p4grp72jbsmtranp1hsi3plicel5ijae7d1bjt1e2owtw9nh8ml21ly8uyqqvskrizt3nviceu5sv4zp16ncfru5h95riwdrvfhcnbtdsptl7ie5lxq8xhbhcjxmm6vrgiafzrqhv',
                receiverInterfaceNamespace: 'dt3jfwig2yddhoai80tsj3lbp93tram9ntozbj9958eccgqwfhzm2mw5frm04vb3e9vkffmr479202ry18sbzptzidpqsmp8pp1w14lavmas384lz3mbipt98rr3p2ps0ex1ylszum9zozu9ux8rrvstgxqgx8ed',
                retries: 3382034086,
                size: 4705253833,
                timesFailed: 6501243642,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: 'nzw3c768zk3ontkyfiqbpswo9hdf1vu15yus70olxem4o21o26',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: '1hu2b8e6y52youdyecyx',
                scenario: '9kbxr3hun5mgwcfzxmaxvlixex5jn8offbfa16wabizvkue6ife0o7sjzxkw',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 07:39:06',
                executionMonitoringStartAt: '2020-07-29 00:03:42',
                executionMonitoringEndAt: '2020-07-28 14:54:56',
                flowHash: 'ggvtp8qttunassbdhns0qg4h4kd285blz1cyegce',
                flowParty: 'cog1o8388atlg8d0prtwpj6e852avwh1rhk79b93sojh04cv4x76ax6uynq9kycctzwvkzjg5g2ldpzxwk5ke6ee6fvrwpcnx1m3a4ev5vhhwt1mdguin0zd24erwpbob27e2odd7bye1czk1q5vbxxwlyw4f0uj',
                flowComponent: 'vjrdloom8ca0l7kxvpyppg31ar78g37r4ununvpbymi2gaku21jtfon7j3nd0m7nh9lfrzt7vs9qz4whbdb13bho34787kbbaqsksmb7mvj8nur3qam84ud7ih36sxh8qj13myx5h2cs5di29knippu0xevsvxwc',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'fczowvsx1f47n5qfbsygatlbdbxcy1lv5z6w8jfay7lk6puz98p73selfgi511cf4yjob8q1kt7l4nstkzkfr5yeelmw0hzedxgihlydzf94ry6fjj5m2j7avjc8rs0vn372wxnv5j4wc3znyjohy3faf2asdyrm',
                status: 'DELIVERING',
                detail: 'Dicta excepturi aut ut quam quam quod doloribus molestiae. Aliquid voluptas enim iste sapiente. Ab dolores beatae quo qui sunt ducimus voluptatibus esse. Molestias qui eius aut amet. Ut aliquam maxime id est amet odio in magni dolores. Optio corporis ut tempora excepturi facilis saepe esse maiores.',
                example: 'ps7ntrapp1isnf6dvov25hvimnnturpzza7dvwdf3xpmw18nnybby7tjmswoci7ogi58jpe43bu2vjchpc7m518fivvjf5mn3h7895896goshnrr0jgky7435v6vphf5ys0adhfhih4vquki1x7y0zofawv3ieox',
                startTimeAt: '2020-07-29 02:26:04',
                direction: 'INBOUND',
                errorCategory: '4ecep62ps5g2yxzqezzi5jeg6s9324slszvcdvjey16a3hh1x4a0fic6rbevez0li4kwznig9dcb067ge9nnl6d8n6s0jms76u09c1x83mrskzx9cm15bmg2vehi351e2v71uwdea35ecgqlxzlo7p2za038da64',
                errorCode: 'nfa6ht9mrs90ciimzg95y0h2nkcuh9fu4qyorvgzy6vnenjolc',
                errorLabel: 786757,
                node: 5749436289,
                protocol: 'is2mrk2z1jnugy8v4t9q',
                qualityOfService: 'pn4vmtpaljh9mahz77gi',
                receiverParty: 'txhntvf4oocmw0462l1lurf3h9qdvqd3vw2n7cmwheeljovt2yfef5theygrx7c3ljc272ysob9z50a6zgsr9lbbafcpszx4kssb9vqnf4vdlheudmzg9b2cu57jy2ixo3kst7w6c8nhk7tiwy252x94an16p2io',
                receiverComponent: 'qwauy8b5s73rhz4f67xswxq2y6durh5n1nsxavvb4q7jvqmehecx9us5xi3m8r5m5kyv0uhtr3407wwi78bi00zm7ggcfe6p0w9yokhyx451ksee7gt80pft87faye15n4yrnko1pvoejunhcqswlye81mfxc31n',
                receiverInterface: 'kvy4pcfr7zrcul6thujth8bidsvhdi47zfhb3axih1lwyytkc45apy69mgcezzq4vd7nzrvb46yc1tgfca66yl47es4xyyeopi386loe6kzfdowxyuisc8wcrmn11qo87z0z8hjoeh0m86dok72vqbwgfwyw7eun',
                receiverInterfaceNamespace: 'ytdllman319df46t7lh53ycs9v7w1clfe92pj4x6gdtj3lxqlj2kjxcps6a77872hadrd9zwgwv9vh5mztz3sa0mrp9ad1ye1bveflysg6k8rikkt0rk004k6k1u7lyjjz0mxg4p8pxpmqyx6jklxtyixhci22no',
                retries: 7757182437,
                size: 1269641669,
                timesFailed: 4922234901,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: 'telno68x40bus3v44u5fj0wi3kvqbzh917n5z5ngsz00km6d1n',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: 'xebhhlmzu30dyndgp4dc',
                scenario: 'btx4lblp35g7y4za00mk8ifadeuh7fehqac9cs7pkxwt6nypjdt4erglb8cy',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 07:46:03',
                executionMonitoringStartAt: '2020-07-29 07:23:50',
                executionMonitoringEndAt: '2020-07-29 08:35:13',
                flowHash: 'ccm9sh045aiyan58sx0lornqkcv3mq5l6di5n289',
                flowParty: 't5n4s4ijg4m3tismk616rpwg2fdso9owprzps1zcrmo2ml3ln54c37po4o2569arp4e8bsk2ypcwuna3e5mb21f9qz8ode6twhudtsdw2aprigkz5440iip4ravo6r1j4fuwoz88kwfthe3h51tq8tl2ttuncyp7',
                flowComponent: '27cn8ob5wn0crzltkosqp8y1k1jlvfjz6tts0jjd6wmaavmswv8pssc1rwhp53w4bzubxbk5nzbkb0xe16arndsszs0uui2h46a5rs5nxpghmykv0xowf7car3jbsoah5xh2qve1sx3ekjmth49as7fnas0l32bg',
                
                flowInterfaceNamespace: 'ht22qf7ilhvgav43s0bumt5b8l3mxkc3kofhjlfudahuepw02ygr1vkrt0nejgvwihm1ajhojwma46jrradz3rpqa4skh71boejndgvcny304r289y6jopo5vrv78e1dqci77c25w8tpuh8bjox9tovjyvmcnkr9',
                status: 'SUCCESS',
                detail: 'Pariatur voluptatem quo qui fuga quaerat nisi eligendi aut. Provident rerum voluptas nam commodi suscipit voluptates est adipisci. Unde cumque et aut.',
                example: 'h4r8aas5sbkvlhtxth8vmm5p6wy9zdb48ongu0zzk8d1bxoojyruqc91r010t70ez8abyo4wb5x3ke0nj1vcq2gqnirzcbf87s2nx2j6pj4bk25j8ne4p3o948bpqmwnvtafk1cwb9m2x6plb9f0a02p2ewzu923',
                startTimeAt: '2020-07-29 12:10:35',
                direction: 'INBOUND',
                errorCategory: 'qy0r9kk7atqrj6u2t5l4ht71sldjelyeadf80sp3calymmvlx2244k5mp8cnr5z3f8otxg5vay3gooliobsgggzjboz4874w6mwpu2u33e8ihknfjrcs3kbbu9rp2y89z2uby8ork5a14ms6ubd7kmf49cr1fvhp',
                errorCode: '9j3hh9wg0wr311f47p2ujmanzf5umwvh24kzxasbqd8h4d80ps',
                errorLabel: 465807,
                node: 2747764337,
                protocol: 'tedob68ua22zjbbd9185',
                qualityOfService: '2o3eckn1rno4oxn3fsgm',
                receiverParty: '8ixbceggev1drl909hdx6flww26avso3amo3hxaheqgdyikqrrqdvyt74plysikac93u1308czzp44yrbdedwo68gqegf4qk8vrcldqx9xne3nnomy5577p9tkf6z2oxh28dqqv2vj8l8f2hnl1mxz6qqio24786',
                receiverComponent: 'cajqmg0llaasowg1e6nfaasxut4gmpp3x0rlk9grfilha38xzjxf3zc7t96qn74bxui2wopdkq23hez17xvf2q4o4l5nrz24274926gxx0gmrg6firpz81bczhcghogze4iwj7v8zw8hwz789imcim4aip7db41w',
                receiverInterface: 'uuscqdy61jjdyledw8u4aad36h8bm8r94pm3hnzfgkokags4oby03kcp9amepn2tq6svvf6kevs24462uy7qao6raie5tozresp9jn2p7pi1a88iv0v6dahx8x4ue8aqs1uotndnax5mkzjeddet1tsnt3a64tyu',
                receiverInterfaceNamespace: 'uux6aln8aganuz9icdqiy7lmv6zrk8agqph5c0sytct8x5fjk222t7zllh0hixzugmuocfsemkxicy9pkqwq1oey34hrcoyd09i6f0t5xvo8j5xzhwxx910bdkuab6bqnkb65xwa75y2hoauvguv5x7gen18mano',
                retries: 8357192613,
                size: 6040322891,
                timesFailed: 4989440639,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: 'oaliqwweeju7gzykckqevz7m34djo23owdoj0owyvmflobe185',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: 'z14ei0sug0rzvwilojjm',
                scenario: 'xvjenh5ciscpc0z5g1flik49ihkx83f7voc35wiwa5x3v59l81s50t0kszl9',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:56:13',
                executionMonitoringStartAt: '2020-07-29 10:45:00',
                executionMonitoringEndAt: '2020-07-29 06:24:06',
                flowHash: '7ta35n7058d0lqz69g704ylzez094rt45rkbs2xy',
                flowParty: 'kx55jeygtdmd1ax474wn8jsuca37ykf2q28bw4nee5rlaepbs73tnl3t18s599jiqa8153yksuirph6htfnzdjdq32bw1hs72e84kwwg46rsmy94dbweuw0v2nlmcb3ay33qyjhydpbtzhfsqmigx6elriu9vl4j',
                flowComponent: 'uju5n3x4ev4jsmtinac31lemd7jp7zmsole2o8nvgt9kpnnl05brm8zt83oq5y1n6umolzy6927xywyvrsh0y9y3vbiiyui46oot3nx4b9l5f7zfkxn399mmhc9lv738nkcezts5ztx45w165j1gub0xevkd6a1r',
                flowInterfaceName: 'gptapj6qfjx6bqo0fmocic37v2w6pqi4vobvzhr2umqeg2q5d3f3lscu3ewny64gzv9ncvdnun4vvladt58tl6icwy90w1yrl6pqcbrc5khldfkrjnmfn4546pelyvy6q1nbxacfpmt3hl0uvvmoz83otxehjoq7',
                flowInterfaceNamespace: null,
                status: 'DELIVERING',
                detail: 'Quasi ut est quidem omnis libero est sit. Autem repudiandae totam voluptatem dolorum eveniet recusandae accusamus aspernatur enim. Doloribus voluptatem minus sed iusto necessitatibus. Omnis et vitae voluptatem impedit ipsum at nobis autem. Ut impedit reprehenderit eaque qui quia fugiat. Molestiae quam molestiae amet qui nihil amet at tempore.',
                example: '2nhheq1fayn39gtcf4puewdrq98l89otwwncuhb3zyur6o6dhs9fd0bpbm5r6apnh375zntuwdluf9ekmwel9o3fw7vnsl9lii3mm78ejnt9p23w0zq2x0yace5i1hw30m5d80qzjmg29p3q1ymf6ybpafufb2oc',
                startTimeAt: '2020-07-28 18:25:38',
                direction: 'INBOUND',
                errorCategory: '7rvwrg6wf65vuo8kspqws3ifohgt6xczz62n3r28woo3r9b5mf6hkyczi1hs61x7urxofiibm7p8p88222zh15hq6rfx3rn6tskddpi4q14u7c698m8wbk6du64r45ozkgx5x7cywg34qzxfwuky536i5pnwiz5x',
                errorCode: 'bjb7utwx35kwrtj5jzzmeryrj4evb5m5eq67krqx6r2fhzo17c',
                errorLabel: 391547,
                node: 6019975160,
                protocol: 'yv8nwj4ccmwl5amaotxg',
                qualityOfService: 'nj8gy24gpnxhkui74tsu',
                receiverParty: '2vrwn4gz0hfiipbqivdnv2dz309ccml8jnar4y4jifxwtdchbwauwzok3mmfpgmso2t6forw7vuk6s8g1c27u3dmg4emjfg4aauz3sa2myaeo2zscyarc8334o8jjmwlm5p80ug27szdnne71dzrinftmfby0yx8',
                receiverComponent: 'cuyf8l3jwe5xhqiwve6fqbgipra4ialvednvtndq7izynshks8snfz2ymq4j1cf6dsovvyoeblsclqlyeqa43corno7rjnte2h4041qa9mx785l9bo11j90tuszhmn2bumde185x3rt2xvcby27txxp9neprn86o',
                receiverInterface: 'hukmfn0ajhxu8pakoj4wdolupuio4d0a8ifjpsfsaxiw4ujfg3ht51jvqe9l2aibi2h03g5keglkoqul0241u3qf97a0u5ttchzty0qwxhpqovkf08bccta2n1bcglprlgmvzdfhpbfgydx7ocarh0384y6myd5i',
                receiverInterfaceNamespace: 'mhukya9z0ecgj6nwuj6mqoq9x3h3v6lmqqzj8cc1q5db4uil1n9mr1s93qknswozx5fcaiow400w2ydcwwwsdjvjt4bdgl8delbawvmafprvtuc1d0towvw3wdup7v2zqmy4kjsef2nrdymro480mwn0mqm08ivx',
                retries: 6020653595,
                size: 7166217942,
                timesFailed: 6597061836,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: 'sjn4xdiz1lnjxhavy8gu3jkfie5ezu6cmds8g9ogckb8flps8e',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: '5ofdv6yddsnbq5p62xmi',
                scenario: 'jdueh4e399leaq628i0qmjafki9xnyxhfbttllttz3aydwyf48hp1p7f2cke',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 08:15:43',
                executionMonitoringStartAt: '2020-07-28 23:02:56',
                executionMonitoringEndAt: '2020-07-28 14:43:56',
                flowHash: 'iukadwe19q17xfa9euj59r682jundzqfuaspzt5g',
                flowParty: 'dzdl1wxs9kkk408brus9vgtlxw1g6bns7nml8n0exiwhv0zhqozn2rm30whx0pv7utam4imes6mfgur6ajnrb5dqv9jxngkw880owyph3b46h4mgs1yt2l8wks9m8k4bkezcic7v3se84s3x629ai8pg2tvdh192',
                flowComponent: 'xgkduwl8wulu2q5n544o01pmutjjrjxvxvcr9kvj2891n35upyaxo2i1hytubjs5rc2kgpkg3o0vmo4j4l9pi6h7pjiza4glspdskyrx0kfcqomikpq2mpegg9vbz575scx532h9xacigmjj8v3lypmvw2hhib0n',
                flowInterfaceName: 'ehk44ltdohcp743f4x9mqxh3xgxmy3hv8aji4a55tfy7wdi0ookqe5k029yq94ptzhxkl2f4wia9u8z9khy3kfd5t5k48j6sk7ua2prvmhkqhwseoehpbl6rvsq808oxa7q7v2ky0sjrz5i34yaw2bc8kiyzer8d',
                
                status: 'CANCELLED',
                detail: 'Expedita voluptas vel enim eveniet optio sunt. Dolorum dolorem voluptas. Enim dolorem cum beatae explicabo quam ratione deserunt molestiae. Alias ut veritatis.',
                example: 'qrjs0nhw83gcajxstyh98hhw6qqux7c7z8idqo7vqeva7kw4nndoy9q8qk4n1x575pmw8lndhilx94u1ktmos0hj1usjufz12qmtnpkluwbw5pjtt9c2es02n5d53ofowdxvkmq5t920subwm8who6s69chz95e2',
                startTimeAt: '2020-07-29 01:14:37',
                direction: 'OUTBOUND',
                errorCategory: '6tass4qcuy71lswh3mya9x3xdl8cw426rq97f8fy8u4xhy730xkj63usm6db5tuhr2cl20prz4vuspnuisgzk1rtobxtic6vnba1etsz1y1nx9cu4capiyneg98p0hd6f9e6l83nliiota8znj7zc31uj3dualre',
                errorCode: 'w1axemrkewq5xpi1bzqq31rmhmndzlk5sjl0s0v8bes0zq5ajg',
                errorLabel: 187428,
                node: 1353457193,
                protocol: '5pik6iiv2gsxzrw71p0m',
                qualityOfService: 'v709doyloucsyag7s0az',
                receiverParty: 'lnrxtw6yw6bi8ypc8ylbjvwpouyuyi77lyhyah234o277x2r0a3g9ruq4kkqa425yx3h2la2xjlihced3u6uav3psxnrjx567zypt4qjgy5fxu20ogd4hv2kmoskgh6bktzfbcp36cficzvvcp587wu1lkszv964',
                receiverComponent: 's3201nu328f8a9wzys2dvqnobyfb2key6vrh0is1y9a55iqlumkid1elc0fowcael71ul9ys5m9v9snzaqrmvjzqvnuu859u290sjm1pihwwkcpxzfha1n2ij7iqd6qh43628bq9mn5eae78qw239fkp55psivzz',
                receiverInterface: 'rm3188h0ohpgyez9kpj1yg4xgve9ssmfymq84xe07gzrzqd6jjn1er3cx96prdhw2983earpa8hzmnh0zyacyls2ot8i7dx6yl4gc0gbz013km81ytt2ocuz5xikbrorr6gpz6p0w1ir81arx0aaza2ezq4ymvi1',
                receiverInterfaceNamespace: 'qd5gn8jjak42p8z16vsat08iearazkd8vnc355attwrupp62rlv4n4y2sh059f3yn9jk3815e3r1wiher5pr4cjblk6zw91visp44erqvn58fu6qsazyel5xwvai2chhsukfti7zz9lxwyu17p4safc5zrmkc042',
                retries: 2688630965,
                size: 9601115615,
                timesFailed: 2296397314,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailStatus property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: 'v5ifc557i8jo3gy3o0d2c9vb7d0ge3brahb279kv4104hcdfga',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: 'vy9516dutbvptlsh9gx9',
                scenario: 'qw56ylbsansgf6sypg7sekxczhf35uos2053o3otp59x6tvcu5lgskj94wl2',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 12:21:23',
                executionMonitoringStartAt: '2020-07-29 10:33:21',
                executionMonitoringEndAt: '2020-07-28 18:08:44',
                flowHash: 'z86jtbuvhe1noxf72rtjtyxmqyxzkblkf4e6sfqk',
                flowParty: 'bzhuv79f9bf12zkeo4t8n6ey7kjf3jr19inca857e138uy6lmjr83kpn8s1k1n14ofs3mm7u9lzvazzw0dgj6iru22qqxu9o9b7lo7n4ukh2akcnum7r6m1a99vma5fx9eba7q869y5t7w59kpmg5zr7vjlu8yjc',
                flowComponent: '2jq0ajfcfk8wm859x9pqky4lt06te2ivb40zdjhhmypjdlv11lwcw9hkq0al233dac9nru9lm5i9dew6c37m8myb5f00wv99g5eejet8f6bh0j6jgaddh4fglypxn1185lzgf8ogomil3hh1xo4j2pmiqle1dx3k',
                flowInterfaceName: 'e6w0p9qyyrh9wvd8qdf345pyh0qgkhbxchy7h0fmcdmqkjg0dl0a78jwot8zgzvob9946y7tnsszvw0jty6eri9si1s78ojr9o9sjxbwf9y0sal18afz38g9cx3i5rzrpjzolk3oa7nfh4f9k4an45yfi3o77k3r',
                flowInterfaceNamespace: 'u81elq87z8ecw4ifdjvu1m06h3h744tufclolw13tfepfv2qrn5l9kozmo9vfrg93m8r8mz9qd2wqn378fj0lhccu0la3f65u6uq5ccg5xpbepnqucn4hqtwk4oad62vs0vj2m6bhc775h15ucasyxh0bj0humqs',
                status: null,
                detail: 'Asperiores pariatur nihil vero est beatae veritatis. Ea quod odio sit ipsam qui. Labore nostrum voluptatem velit quia quisquam. Ut cum facilis natus soluta. Voluptas corporis nam facilis ut. Eum nostrum fugit nam sapiente porro pariatur laborum.',
                example: 'k3bga7p3ca1o5uv4jzd1vkyrx9atai9oldyuv2b671jz6dnpt8qcl86o5fcrpbr8h0dgqm1vxfn0ws3nhht1f6ohrqzfln3x9kocitw7pfnz5xbod6m6xim5yoei5ggi1zozb093x7zv88lp1ldi8d6l5sdapcoh',
                startTimeAt: '2020-07-29 02:03:23',
                direction: 'OUTBOUND',
                errorCategory: '1vbdfxapobsie8nqtd8gjsxjlljkfr1qqhmhwhfgi446rva601yyn0okxb5v6qse1tnxwi070gl1zt2iw8fvoffs9el9agqdzd6ybl08wm0d63bk907yplgecjlh0us0l6710no4uru0wlc1psqtlnddqhdaszkb',
                errorCode: 'k6prinzrhbxawd940bqgq5orol9fhy8zsinuk47m3jswqd2nxc',
                errorLabel: 725696,
                node: 1318704712,
                protocol: 'sguprbikc97l7dwafg50',
                qualityOfService: 'dk6bcp9cj4u2mc6kzqxu',
                receiverParty: 'edfl4rakch5f5rxzhoctaj7ko9y3v7aj39j3bu97sze45fe5cie9gebowysvuh4m0eaz51zao1opj6j6uk71gpcp9ubso4wl9w26kpleg750s96mb4aell9s7fcclovpqli5fx18qgilmfesg74o67vs0rkrupgs',
                receiverComponent: 'h6jtppa2w1hj8ut6fzfru4p43gy49jhprxajdzfs80cknjuwnubsjo7czzxz1kjokryyio279hdf78qlencqp9que5xy7iulbm9klencr9wwusfgyuwj7q68sizeo0xitnitnsmsqsbpgh0s14pczb3bkn6d397p',
                receiverInterface: 'rbs65wakabovb6grzrsuz4l3ztipz9q3igugiu8kph44a7t826knbqn7df8wl9eroujlxiwn2l7rq6ys18mkgndj967dg2299m5khembrz8ldfgdaxct69tm1j9kjzfkx4ai4w7qdju42ezyoe0t4xpojltew971',
                receiverInterfaceNamespace: 'wrzlxhdg8zt3kpvuwyidjc59s1cbwuxht17hfcieeso9nwln4qrhpluvyhzh6yaxksh4ngl8j5e3vl8826wye2bojdexw3rqzilh8nzx2r7e019acpc0xxibow8ha8mfmsubpn1psseyo0gemaqsin2zb51alia1',
                retries: 4943471438,
                size: 7692618728,
                timesFailed: 5711023634,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailStatus property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: 'd1qwzcjqz7yvxv2xtm8835wtrxc2sho3nhpugc2brk1z097c37',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: 'aabn57c2yjlavsfg9957',
                scenario: 'eiidv3rnih00w0l2fwr2gmz4yh8o9fgmlgqq1vqm7upmzsidocuxfpwvpxzo',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 13:26:24',
                executionMonitoringStartAt: '2020-07-28 19:38:30',
                executionMonitoringEndAt: '2020-07-29 06:39:07',
                flowHash: 'usxun5wlyrex6g15pxim8svpx1qgfdj9uir71uxn',
                flowParty: 'wqp0vns206g6hd5h6g304uoyn3vplyqpn3oyqhh6u32m93sbv1e78jttwfa9jnwas4gkx2skti3ws5xyr66m71y033uuix3ozuv0b7sp2u6cvfl29vzup7f7v2tsyvm2ews8ygs6ymkesk4bna955t778zs95cdg',
                flowComponent: '83ju91kx8hh2ig2veea90a4sd3y69pw3aznullr7c2xt7r78kq6ieum0mmbc3vf9w4b0ffkh1zx48difg3c7pb5fobfxiox7dsv9p6g05rsdwkttqk59he2k3co10e00d9qbz1lh9ochvjhu7pcq8iugfd0y5fdk',
                flowInterfaceName: 'x8k289b8n50ujhmk0xu6a1v5j9d1lggu1ip3075hxujqhh2hm7y0pzdeftgghuoc16v5gim8leezv5zpi7vb0vhrvtjqxq2y3prxaxvn8gcp9tq8e4y43jb0cwtff7aiubwi4gtgzoa544rm8hpnqtupt420ir84',
                flowInterfaceNamespace: 'jczlbx58d0jbmha7hk6w555nqqjpacxfj8xansa9rwznsa3lkxt2ov27zux2mbtcw55916j1cae5szezfqe6w3szbd3xck9702jxvmc4dx63d80juq34scrqcw4fm8xi9yqrtvvzjuctzg0xmur2j2ew2jpd53d3',
                
                detail: 'Ullam architecto eligendi. Quaerat illo qui illo. Rerum eveniet unde aut sunt ut. Commodi deleniti maiores sint. Et quidem aliquam qui deserunt.',
                example: '4dkwya5hlhxvud95c7xcmynfjgwvg7rzby1madtdi0kn20wo5xonjuic2jf48oqseic8aw3l1ro2rkfwv452z8r65e9d35me7ms0tw1bgpit95ggu7bwaeblw3n1kdntmh0thlp3c7tu2d9jo9vdkwf8svb2e879',
                startTimeAt: '2020-07-28 18:25:06',
                direction: 'OUTBOUND',
                errorCategory: 'wn4bns3ifhpn4tshnusfmqzjohc6g6461l2gn4nqpasjewob6i4yeahxwratzpkox2uhxc7f9ib2xlykm62qi1ewch7xyiskle1glgd9o9x8rfafj1cqdy2g4add0ll3bfvkyf0qm0feguxypxf6f7lhcgrmlvo6',
                errorCode: '09hdchp8r1ac91khtgvbh9u6q11am59y8o46kamsbrlshxxqe1',
                errorLabel: 237781,
                node: 4553298099,
                protocol: 'm397i3flnfgbp8hsg3yy',
                qualityOfService: 'qwjipug93q20cq9dnjk1',
                receiverParty: 'e555s81yg7d9b66m0e59rgq3dwymmcty25zfj9yefij5zruc78n3bjw64zm8msnmv868klx41v98z2d5uu2wzlvs3grieu0nbakoa3d1se72z1fvwb3opnexnz829zqlx5yn7gfvrrvj3dxf3cfla04lsucjo5ja',
                receiverComponent: 'p5n2n3f1k4gmgrul2rfnnz9ssmbi0mdl87j1kxa18dlbzuco3x2bzrxwf033sr9ymutsgka3nshjy7s38my3zzpw6hlsw9dce9065cqyoe2w94zbzqngmcyk19251y388mgr6aqetii15i10o2uhg1rctp2z1ux9',
                receiverInterface: '69jut9qr6xo17n3q7vhjbztbc3hdrz73cpvut1igclnpj28sqqshwqca77y8dnjf4mqt9fixw4cl54i6kocnm0lauqapcdah4xgs1z4qupnc07gjxro4bxsw9c7j3vxp8ipfmgrayccvy8uy9f0hpiwimf8t2byq',
                receiverInterfaceNamespace: 't8iqp1syykeqqsg110o6713uoaw1n1ltk8o1hb8dxfcuq9bvzvnop7jpa07bdv6r35nb0t9cg3rzbciwtzf669ahgchyv1owztp7lqry2la9ri124l96yk78z9gty1gcaxtz6nu1aniksk1d5hj9nf07dgw76mi0',
                retries: 6121785475,
                size: 6315401131,
                timesFailed: 6009138561,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailDirection property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: '14jgcpfh42griq8oc1ncy5dbmn0qj3zz1in9juqpwwftt5sq14',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: 'ctmrf94nvs3ad9uzmhwr',
                scenario: 'kkdakjr8ic3bbmna42sizvfxg4wsk22vz2asbh9dx5qs9jo4vrx09q15iei1',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 08:04:22',
                executionMonitoringStartAt: '2020-07-28 18:33:37',
                executionMonitoringEndAt: '2020-07-29 09:59:56',
                flowHash: '9kifazhalcl67otuy7fblyqfck86y74bv0mw5gc4',
                flowParty: 'uraeiac9ki0b2mw8ow2t52wdz2iy3u2muuk401x06gmgeo2dlph5g5pg8a95nkhcoycqccp0xihdb8altk2hwemxtnvx25fjnpd8iaedrd4j9ywfjs7bj2ndhglphg76irnpw33igm9gbschxukix8kurnxek1u9',
                flowComponent: 'gwd17i0hemk223ugs6gjve76txkq101741tqravvzchz8vw9vhbj2tmuztecmvu465maquk4rkfgi88yropztp4v1hu718ekfep97lhsfxbtvl3of2z6t13n0v2h2y4k96p580m7thoal7iwtqvg4et3vs7icqxo',
                flowInterfaceName: '1g092vc9zw8w524k1dipr37ikl2ckd3dabai4zvsygixd20ai568e750ryrhnu2btijxwm4jyd2lxiaydd4aizwzpteejom952orfaerabjio15ceppnzo3m9vqasu2u1ixf992dwa461789o0djji8ad9a87wde',
                flowInterfaceNamespace: 'c7cylu4ofl9vod335tpkuckwp6j8kg1whmy4emybhl0aonbqtf06e5jw4p57rsby0jtdg6no1rwqpxn5mezwkqsjt500qowrhrhl2wgp8mravwg9qw8rg6bc4jjti9wa5fetncu1twk3aab392ynkk9bbdtlqc9p',
                status: 'SUCCESS',
                detail: 'Eos dolor minus velit maxime qui atque eos. Tenetur voluptatem ullam voluptas ut voluptatem accusamus rem cum. Eos culpa aliquam et sunt dicta.',
                example: 'ipke284d3z5fpvh2srqszqelg0f3b45uwx4uixo21gfdc0ynx91dppl722s9yus54z4m30jn69t2srlachqvfi9l2hoqkl2txx9yqti5q7r120979d9tilsli7pvcpwgtxjl7w381fd5nrbwhe7j05n3xk53cvdf',
                startTimeAt: '2020-07-29 01:10:06',
                direction: null,
                errorCategory: 'vyn1hn86klto3ymin30orka75uqx9bbng8qee9imp1yo14lo4gdnphy6dwzyfj8hmzpyn7tzmhsfaokiku7qa6u17gleylsxdk629taoxr32c1k2ryfquku3myhwkod4jfv79e7otj9ljuqzfaq6xu2qcryoxniy',
                errorCode: 'awm7syhtes7b3avbk0xjnqigcrtafn3lrqw9tqlsqlwy2i9tzz',
                errorLabel: 590292,
                node: 4994766111,
                protocol: 'tmgdz8pp8o5ecu1c6ewa',
                qualityOfService: '90ka6gizsmq7gneadbe9',
                receiverParty: 'cfg74v5u0e35dxpflspbqh0sypnvcs6thsqtvuvuz3smngo0x7cerwov5wh8ppcclpnnqyk1lemllrv5z1au2lyga7d2it4adgqw3ctr7qic01a0mymikiz7vlgp6808a05lgpqmurxh6x89fls9c0cb1ci3hpyg',
                receiverComponent: '4qx9ngy1vu04ey8pmb7ill00fb2rdk0gnov51h2tdu1rmxhqyw20oeakl6tuw5f65p2qq3scs8bcvl2fht91j2nq8sbhgals2lfz19cop1m6g9pbwrvboptgeffeis5aptc6236884lzsup2bhm7cecoib1yb8vx',
                receiverInterface: 'wz959e71inrj8vaad8fwy0ohhtmp822ne3nogp22wmh37qr4j8bza3shp7ovvf0elkia57km8rh3okgmibhigbk9cylvti3sw8lpz891mmsm6b077v08hgsf5bmhb9nlhef90zbbw9axi7rn119wnbhp2cd9iq71',
                receiverInterfaceNamespace: '1x4bxq3htil4sc996sk48dbljk4vugg8zyo7aeg7ig0wewqmd0uobtjbqad7isvlxytinnaeuqba3t6f782vn0kycw25ees96765umr4aqsn69mk2h8ebe6hes21qqwarh32svmb9we2nqty4x7t0ep1zo04rirm',
                retries: 2244803387,
                size: 1180619250,
                timesFailed: 4898297137,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailDirection must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailDirection property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: 'speu2z5x6nrpzikqkvgpru47ir7ln9hhrdkg9pg6sv2i189psu',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: 'qgb6ejtjn19u4b5gn6go',
                scenario: 'b5j3kiuhxg7o7num5xcvlyeyr9tzvkhe67cusd4xbjcw6c147280erttjydg',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 06:01:19',
                executionMonitoringStartAt: '2020-07-28 15:23:52',
                executionMonitoringEndAt: '2020-07-28 22:19:23',
                flowHash: 'wup3j11e5yy5ag87awma69a9m8jca3x9029y1mwa',
                flowParty: 'saxfbfkxvzrsq461wlf12i84qqwhps4ilppf2aro0k6vwyqgyesltffwu6f3d5nj0upmzzd4ukn0y6c39y4w5h7v4k4to2fa1jm7ruxa4e441ymf6dokbvimh6fvq5qgn0giefeksl8h5zxme1klhlwnebi04wig',
                flowComponent: 'qd3x1y6rardcs1rb7cuqpi9xbe7hfzu9fzpj48lacnl9b4q2xella38w0earwuwm7ywe2y7389bg8eoctcd4bpmxtcio8cegh331y7ndrzw5981k3sdwfpujqo8qrxnfzlsik3a6dtgg9ib1c4zorvjd2g2igqcb',
                flowInterfaceName: '2pazs9d4wcf1rr5hvh4q4hdk3ly2ndwkt2voh5jqeuhaloxaz68kzi90i3vnhq7jwhrcwnv0f1yacywqv6zyykoum5jshzdzqunmh9ikgwlzfa28gdgm1r4uvvvn4dr57ji52x0q9r63ojj8ug7skyl3vkrrfk1s',
                flowInterfaceNamespace: 'dhmohzu4qj1xb51dxep8qv9y43jyytq4kxinmfemgvm0ghwdphyoghqoxwelg66rtiruskcvh0l5kqk9ws1abialy2pova9h3r1eua0k4g9m6mr2yn2zg4riam19wkxopbji85u42a198jfhiwhiqs257vrzmma3',
                status: 'CANCELLED',
                detail: 'Ratione sint ea officiis. Esse commodi placeat. Voluptas suscipit dolores dignissimos doloremque atque id est consectetur. Nostrum vel eligendi. Fuga laudantium unde eos dolores perspiciatis. Nisi doloremque omnis autem dolore.',
                example: 'a1rdc7i5vt1r7zbmgvsi7uofahqwpwupxs8t5fkxts09f56hp50q0buprrvc6zdo63o3kpkept89o4e7q5lffly92wx4ltnho21iqsld5n0ac8xigoluf8q6hxrebcu5nzg55dk6mjvmghvlha5gxyugogunlww8',
                startTimeAt: '2020-07-28 16:51:03',
                
                errorCategory: 'extxalppezl9sj77t5zn45zn47mg388cyftmydtbht4jxwkaeklfrqlqpc109s9kr7blp9hdd4mnpnrg9voevtj1p3mpmcj7cmy55guqja9bbqqd5a1kdqv73738d34llmngojyhvd9dfs89tpjpkxeh5l4y4r7o',
                errorCode: '6t8fos14yyxde7emvbu4faqpyh9pq7glbux278fq4pqule3bmf',
                errorLabel: 940321,
                node: 6801109348,
                protocol: 'kpipuifhq2ja0r27jhfz',
                qualityOfService: 'xg3c001hlq5ktxey4sid',
                receiverParty: 'iobyikpcskmelaxica42jk89fdiy6g04dg0gp3jy0jcqdur4vwq4kt9n8nlhaf0wffxxcfcpv7w6iexh1y9fhy0m35b7vp3lvhcyvbesadsvinjw6gozl6immlycwcnnejzqpzt05uq6bg9q7xuuc17vj5f70ok0',
                receiverComponent: 'zotcug40ly0m0oup3wtadu6wiywcf54zfcykkl507g1lm1n9eic0ln02sxp7ix3p1fxm74tt97wz6msntmatccu1i1le17z6fkrfncc6ayf5bspg6imd7iyjz9vtr7iuu7smbrhh1h3jdeq9p4g7uo2dfnzrmtc2',
                receiverInterface: 'zn5yj2ncq5juin7g7eef1gdeu1a8f3sy23wf7asprst7nays6xlvf9ylc4qm7vrjofgvd9hyebohdi8bq1o3vwa3szc2yj63a5jzhpg1s304lwlqp5piggmrra415n1osykhx1mw59yed2yvdt6kannuwg7hrkpz',
                receiverInterfaceNamespace: '15qivbahhehkgi2r6ypzm5vehva7icmn831xyk2rbqtdi5ngrvro05qh7xqz1si2bdmkol7r5c4t3a6lp4bzphbslsv91di6sohod4lfh6qyfwih0upkek5og2bla6dlej2ugiipc7pt2v916o8h3qgqynmzbgza',
                retries: 9925646718,
                size: 9736303048,
                timesFailed: 5382357747,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailDirection must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'l91ybwhl7kmqw5yjq3pdhgszcb8xmkbond8xf',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: '0r51tqrryk3zpbtnr5o5p49bxjalm6iybki9w1winbnzq5kw5l',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: 'i8zo4sw0bmd6zisopyck',
                scenario: 'wr8k9b16t0d8nc2df6pryi16ngpji2gff4fad6r35l9dw3xiwb3fslfm8rc4',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 18:50:07',
                executionMonitoringStartAt: '2020-07-28 15:18:05',
                executionMonitoringEndAt: '2020-07-29 05:13:25',
                flowHash: 'hfcqf2fj95xnlinst9z14gwgsz1gli4a4zqw7rrf',
                flowParty: 'zq8tci9h1yg9c8sxpuxfd7k10zgl2fvrxnuch8qdmocphmon39kr4d0g9xa3r2698s56w8anmkkhz4gl1i7dzvb3fm5pgefbuqs0ezut0fu39vnm7a6w78nhwpozkj78navo0vzikydrdhtu9nnrts5k3ql96n95',
                flowComponent: 'x5ysbmv03zybwmeo62p80ek3j7sdecuoti03purlnv42vxa54lab2gsf6j8fm3lptg7hzlwver5sbk6nwsj34y85qsrll2zaxytkhnkb0zu45sztkkapl6lv3p6o1799vr46wiv88r0xm89dg0f61xdwvr9diqoe',
                flowInterfaceName: 'a7egx9g3fhy8595tp9vl2755lr75la051ae6nwbxfdjjf6b2sfaqmbobv3ssuv2tcc9khb9rho4l5iqlrhe0awt95yk0i7bfo6qow8tee7f9g969wh52pdk988aysxgnd21h0kbpd38n36hrv1btv6gu8xxklaxk',
                flowInterfaceNamespace: 'mrnnc8ma8hzlgxo047ofk1xcribmbz4xfvdystvij4l2wqtredmq3raho14bdpv62dge25x49rkeoi82eq13jmlq8ov730hhp2b8sudz1ese4k9h205tlts6tzbpr9zuzw2o5n9vb44w6kwnnhlty0l97alio0gt',
                status: 'TO_BE_DELIVERED',
                detail: 'Ducimus voluptas exercitationem aut alias. Sit unde est autem quia hic nobis aspernatur voluptatem. Velit qui quidem et tempore consequatur blanditiis iste. Earum iste voluptas.',
                example: 'v5xusqo74b00e7pcb8gr1so5ajsa2d7rg0f6k27orc1ou66789zmwkfc85y17vlneg1rdk4gbl92yvo8ewgxoez10h5lzy9tcolkcupzsda4siovb1eli5yi06vzlfsl77frrxjzgzl71smjqe01fs3t6yd73tjg',
                startTimeAt: '2020-07-28 20:07:38',
                direction: 'OUTBOUND',
                errorCategory: 'jwavulqyxfddtnzzlscf0to6cy1hxxy5mc8ctt6ldwbryhmv5m2sccq99qfl6th9j8v5ed6vfrk9jnd0iz9sq0wa0r3nkyoeqdzg60bdwi0wacaz1gfo8z8n4ifz81w014ngqao2j7kjw3wb97epiteas7ax1697',
                errorCode: 'rweerl7lie4zshz7zklm6kjy1tpz5aqnlxuml38h1rpx5lzrir',
                errorLabel: 216025,
                node: 4598677412,
                protocol: 'tuwtr96tcuctrqjibz33',
                qualityOfService: '20k9yg76z0d7o63j45dy',
                receiverParty: '99gg4mhbn09gtgcwystfw00g2yln7k3krpy8g0pww5xaq2cdlloxvjzop9m31b78xzs1kw19qxnfew57it5gu9vw3vsn6zuse14ff0elnsze6s9tal438pwltql3w1y5negsuoh19hhu61gi8g9r5ezdlqj807sd',
                receiverComponent: 'yu679xt4ty91spyxgg9g3fk0ac7e81v80j4u101abz0zjrr0jwy10o7rwqgp8kdwqhrli6u6gjgcngj7ch0wujsp9nbywt6wy0ofr8rzezyisyajltm3pajvg61568xok6md2qavnprbo5rn1kci3kidvfnukw2i',
                receiverInterface: 'mtujgcnd3og30a5sr0z7i7lhoh7zvx40bbogtx7bo92n059rhaw8tk6j2l1tg29cx430c5lyin5tekn2lmqdc07m0qtd1tib0q3f73oaco9b4e1kxijdn7kjvfztk54xj9vzmy6xskat5kmh2194ko8nyaf06vlf',
                receiverInterfaceNamespace: '5ynkwcagypa3qnj4qlhza6qf6zukva4cy855wmkzwyicn6bbbt54oqba7ictzykso3sv6l5jidxx54fdvqijrbjic3xdsxdaga6enwe34zkp7gsxo9m01jmdsz5mhnftlsbiq80cstvnzeo62bhu2swa5th4qlz5',
                retries: 3995290475,
                size: 6436989661,
                timesFailed: 8646259165,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'hup5uwhp1gmbd80fvru4142esxqs779b4vdsl',
                tenantCode: 'i3f0pk28q390yp838gbmj3bjet9ykbty6vc5zac9ogsuzf8sit',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: '1jdgmd5972zm5ts1dpar',
                scenario: 'sk9dbchxesre0uqfyyx50emt8ejzs2fgq5x1rmqwpy2rc35tvox56ep3d4y8',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 22:05:50',
                executionMonitoringStartAt: '2020-07-28 20:34:19',
                executionMonitoringEndAt: '2020-07-29 11:28:39',
                flowHash: 'g76jr29qngr9zdyafdrtxjphq47v1ywj7pm8q0m2',
                flowParty: 'utglt6frp82r0n7wi94hf552cj6wtraesija6jhh7qpporfgbs61126r1rtss8c34f9rt5285me89s1rrfz9xotxsgn99o7vizpqg6oforahtd518wpp4d629xd4j5dhja5h80fkq0qgyd3dvzzkk9r4l3jujs8c',
                flowComponent: 'du8lmim6qtsmmkswlehidvhbscl8e9xvuzqcuf08uv26ulfttz8f5m2mqhohnspvz5vdhs1dcc3hn9v0qoo4slfod2kxrwj4oe3bf8cjgzj0f7h5rtbc0meepxu54crp5x530tn1099vwui5kpixn40wdpv0jjpi',
                flowInterfaceName: '3px77ct1v16kbznz9alpmuszed1fa4ovqc3laxll2h6u5rquafkxuhtoqxvcy1cqpctrmbkaf5gy4esatpxqbnf4jsi96oofj4m0m2q7r3crzlja9re8xj45mrnnfxnv8ip0aij46ftbzj1ek9tuy5guruicdvb8',
                flowInterfaceNamespace: 'flzcyuea388bac9oqslmxxv9m5ti4vu398p5oysr43gnzswf7o5qd3ge8gnchbg298fd00nlcnmjz7zwfx8clwuealqxm48ov9ltjr0t8ha1a1xwt46mtzdux4my8p416og6u2mehxf1rynses53lsy0z72jske0',
                status: 'WAITING',
                detail: 'Ut eum quo ipsa eos voluptatem voluptatum occaecati. Sint odio sunt porro. Ab ut reiciendis cumque aut. Placeat illo repellat temporibus corporis totam enim odit.',
                example: 'ugtdwmk32159465m69xibvtkw0nxuqalxzv0vqipf8u3xa6iojdbyznhlm3vomihy3wro7ul34nb8rinwscvbwkeyppb5m951vwy3gnqhps9v8atvzbb5h18crxgm6c3m76m9g7vm7hxfihgll78uhusmnhhf1ye',
                startTimeAt: '2020-07-29 11:46:33',
                direction: 'OUTBOUND',
                errorCategory: 'kdvbaemqt1bnrr3bdf3q0ua9kqnz9itong8trfq289my9s5bh3cswhwwoev91u1vd33t48wk9t1w6ii18zutdnhqxgk9yvzguazt4v277ql1vt7hs4gl0im7v0npw7jq2dvsar6bagb6qxpt9wwox6rctrs100nm',
                errorCode: 'z2z6jkk1mmm6qob1oxp76zz8guh36rwpyxe5tqv3xtnrm53zxb',
                errorLabel: 128570,
                node: 3833545908,
                protocol: 'br6jf538wbn42rz5rijp',
                qualityOfService: '8wedq8o7xd01uu2qhimc',
                receiverParty: 'nhuium3pc0c8hj9t4heyyq9jzrgou8jmd0ybkz666g92uewnjyupcboose26lo2yc4baq62tszynjjkwflmcewueojo4j8hhpu2ucnhe5sla0f8cfr9px7t5zbj87t8bs4ebttc36k414w7sy2hqh7xc960xocog',
                receiverComponent: 'h63qxx920xhkdbcrhfdsipv2zdtis5rz1cbh56wepnf2qjtl93szv7y8ikyr5z8w12bf9rrs3qvj486uq4l5vk3kkkvd792a92crg6n28i2q2e07hmgpq1yxn6f6md59ufmoxfn2fazlvq4toa8yb34fyhf75any',
                receiverInterface: 't41hke3jf9gmdnf24oa2kgwmd90cmak3kiyf2016p15fd36lvc6ppz3m2xtr4v9w9pplk3g2kruj44843yezqlsa9flc7z2bq91y2nwnaskobn2qopdapgmbdeqoewhhknli729f9p2p29p7hi1t1jqhxarscm1a',
                receiverInterfaceNamespace: 'q0n7lbhvnavy4gin1ofro88spntcrkj5c8li8y9x2wgbln4vfh7jxxha84o9ie471k5itilbr8r2yos7klvrl74e8qjkrcozmr3kzbo778flqeqznuvk7b07szku7zav14sm4u7qnny8208cmump6e9c5cojgu5j',
                retries: 9170977141,
                size: 7352128676,
                timesFailed: 1117728991,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: '57n60kgwms7zyfev1vstl9s0qkob2tkrndwblid4umksp27sn5',
                systemId: 'suu2clqk0pedxeub0hwgjftsg4815vtxtaea4',
                systemName: 'fkw9091vtl7dq9yg9dt9',
                scenario: 'y1jo57ejs4fsigdo6mjudyy4l247fqanqnpq4ian42rfoa4x07h4lw8ozbhw',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:57:13',
                executionMonitoringStartAt: '2020-07-29 07:23:26',
                executionMonitoringEndAt: '2020-07-29 10:06:47',
                flowHash: '3bhd6m6v7chxby91s5qasaz3wadeeu19zctyua6j',
                flowParty: '1jutktvpkb915wdwtf1l5mr7zt9n9ykn3dtze40xxrk7oo6z39lyj1290voclyrfkue4stjtv1sw1iy9vsrtse0ts38whzg92bwqwpm01tjhmudh40bo17mwx8sbp9pp0po9rtpa4sj6mwmgxfhu012o3z350m85',
                flowComponent: 'a1l3vnnkchn10wktgw1ny9l4iy1fz9on65xaohwyzt3n1kaullg84w0yp8xccc6ml47u45ryflthjy2b5dxnjznpmi2ny20oihs5ewcz7vasrzbkb7en3jk7btzhckbp2atm19g3rzo47rwtgrpeb2mw5h3snp2l',
                flowInterfaceName: 'sjqb5fd0bkh47e6u3kjltskwezgak8fucq1je38m6jujsd62sigyw9z8pzefyigif2hb8cbmh5hfs94m334oax91bw3rn9re4i7pbfctzje2kowv00229c0r6pbcfxgkb20w7vs2q3zntp8qry4xdbsrc0e44kgi',
                flowInterfaceNamespace: 'jcf5jn0ph8zdlc2ie0tysnn8f84za2ac35co2nr3c1c31802q7i1y6qkizcsv5aydflgu0edfjq8ax4ud05m25pteetwt4tgrn2powt3edbp9ddse5vr0okgy36xmtp1no7qsye2pu6h6c54mdyvuc3pmrzcj5p5',
                status: 'HOLDING',
                detail: 'Dolorem vel sit et saepe nihil architecto non et doloribus. Ad aliquam error culpa harum fuga aut. Aliquam quibusdam et sit quisquam dolor iste eaque facilis reiciendis. Ut dicta sapiente autem quis aut. Quo eligendi dolores consectetur asperiores. Vero aliquid quibusdam enim dignissimos dolores.',
                example: '2ux0cjcizu2m66i4r2qkly9ql2fd1og3njhijuvbogkkymknlrhben6pxs56ug6vtx210kmi166hyzzqx8wdkbb6k0frb33ygp3a4mn72teyg864q08f729ray1r7eug3f0pz0lwd39px9qtjt1qmjn7jsku0xo5',
                startTimeAt: '2020-07-29 03:43:15',
                direction: 'INBOUND',
                errorCategory: 'cvwyqmx9npon9as3mb7iv3nnsr4umz7t70vplnvvcizly4ja0j1l9l6z0mow481lu7jxpyeuhe6kqmc5u2sd5ftm9492wv3ovspanuz1u4qzdadr0qso7ac91uqrqb9wu0fsrt100l0ef48druvri6ok6dxddoxz',
                errorCode: 't387f8vorbdgt0mq6q5aoj37s0soz9dij9t65vhnpyfd60pdzv',
                errorLabel: 244159,
                node: 6978472936,
                protocol: '99itzwad7x5j23f2atyh',
                qualityOfService: 'tejoqhxbx8wnx5907awv',
                receiverParty: 'f1wroi2k9kvjd3ufzqyqwswi6rno8lb0swmxjvm94zxjo6d0ot0a86a6g8tkr6hi83subkv8ydmrsvlaudizr05f3ija4axbb6rpe8ca2dynh7yqv3em2tf9fm51rj9288s8r7qtuk4724867y6600g4t7m0ghhj',
                receiverComponent: 'yy8vlyv4zxwx77voslt67ogwdeapf2q07vu614nuxe39ngk2o8a7ssixn3f0x3bbq3xct0khz2ek7fhz20tvckd60ci7hpefwhtwmvsgs9pcd6fv1vh7x54lkfo4i58cw4wxre0idcy2dxijkjbku6vky8fug09m',
                receiverInterface: 'ft9b6if0ozes7p5vwxlvprt4qzesplw3vvy2437rioam99lmc6g6xnv5cun0mxu0tqzj2t04h27qtejbv7hzfp1vafk2r3qpzg962ywgeoaxaucnqzqd13f28kyvfg6kopk5mwqutyqviybdm870jl86xnxjv7q6',
                receiverInterfaceNamespace: 'etuuai06qhmp60209el9p1po8crco6199k902ijiorw4ti08hkllfnm6krajmi1fon5xi0dt1ryj91lok2bto9setu19jaj6bwtnr7g8ek49oyokttmghlp9sxpmst5qppetso60wml6z0lqlf39kzgiy5rnkrzh',
                retries: 8083062007,
                size: 3326039692,
                timesFailed: 6138344394,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: 'qwyw8lauk0jruaow9xj93jc6tbs41de6n6tpxy7hjxkd1cu3iu',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: 's2vm8jsd42atnze84lzm',
                scenario: 'wdqjubiou8baxxctphez02fidgun8hre69nbk700mmfl3a5r3op5elpvr2ql',
                executionId: '3rfyitt7gkz60bbuf0mm4jlu2dg326c4zpidi',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 22:33:51',
                executionMonitoringStartAt: '2020-07-29 02:52:45',
                executionMonitoringEndAt: '2020-07-29 09:10:38',
                flowHash: 'gv4i2gd4lzwc1s60ntytfc15o8569739jhdcxp32',
                flowParty: '7s26i07dmmy3xh2lm4u227m9iqprm9yy29jvoomgh08iig7g0c0y14h9tivk11ufwpxokb002f6qpj0e2w0ytgnhj2eriqot5xmms0qycwpnf1w52hvn76vq64j6ew44wnl7jwqeq1vgx4pel6o5kqofizow6bss',
                flowComponent: '795twu52ghdyzs7nzw8g5i8f0rv01nadxir7qa92qy1yeby9iz943dp0vvx7f80c74abv0lrdlg6hkhqknx6oadtqjz732d4zcl5wlbb21r49fe52paegrtbqhumi764rlyucr6xjsyn07kbqo9p7p1ydd5l7yj1',
                flowInterfaceName: 'egpmtocoh2z0pj1ixagq0n3hqtc0cqrin8nqfaj8pi0pyzs4q4q4v7kmp0znfzrvb9log2egu1vwmdo7cn7axbwsovq15q256vs982opy68xjymr83z7x8l0yg2vumu4zxwcvxck47wbggdo5cyyuiqi1wm2c563',
                flowInterfaceNamespace: 'e5jpxz20280kfpdyo73tgx8ebolwhxe1micl800ycqxftyvxcz9knvho7raaoydeiltmq7rl11vlfga12b2q2cvlxmnw21516s71nbfftcxvrnqic1phsz1wn053fjchusc7f5fujyarourw1fjm0xshijmryzgh',
                status: 'TO_BE_DELIVERED',
                detail: 'Quos ex impedit. Laborum ea qui laboriosam quaerat repudiandae. Voluptatem animi quidem voluptas id aperiam saepe eaque et consectetur. Et quaerat odio laboriosam perferendis. Ipsam rerum ex optio labore corrupti quisquam consectetur.',
                example: 'nlxqo4f050lnwar8fed3a6yj3020pxoeb62omplk9djoyzir0kedk9cg4iotwawj1oas28pzeacxoa8ubdiitmt1nw9egxt9do6a8klfbubfe8gci9l1ixhbwo8vsbhcbb6fj6va1ur8u3udoxqunsugl05tuv9n',
                startTimeAt: '2020-07-29 02:56:05',
                direction: 'INBOUND',
                errorCategory: 'ste8xegr4ect8gv1c9e21vo9l9v2es4ae3pg3ocn0b7fl1bww0zh8gds9e1ml5b08wh8668ftkukhsucyufvre322tv91wgc5ze55z5gxrf1s7v1h9ydwxwjliyw5y5covioqxxoxbmhkty3xpxe791ksbtib5f8',
                errorCode: 'qxzoua4hqtkrqh85lxwaybql6o6f4u1wao199e9rb3xcmho65s',
                errorLabel: 345473,
                node: 7181985423,
                protocol: '2zafy6whhwickf8wh1g6',
                qualityOfService: '4h2hpjtseptwra4tj2c4',
                receiverParty: 'c01hp9lgorz6szyk95l38fab83veqr9f72gnrshxnfrfevbkt98n9dtcbbehknvqbeyadsdvzokfk90k7y55zgb6g96iz27y9gz32bajb75lyg7upnhhi5qq15mdzye6fqi8v2c4omd0ujykl3b3ty1gatgw2szw',
                receiverComponent: '4voxoi14p85i28g1d8gkk7ip1q6sbeaq548etry6s32kc6sd666pf02ye5ec6wljfkoc2y36tezfrwf93nmjqnwgz3exituq504rv11xhs6gvye7azkgm3j65tx6ozqrmjtctwzye7pfr7gdq08rn3xfhe2tu0ao',
                receiverInterface: '6x9l1x132rj6z0yew19y5mnmzo59fli1478pvs70mq27zyi8f44i4vvhqwdqbph5moahxxopltelj7stn6q41f13lq1esa21lwpkurg53lbdpp13mvsuc42khidox1b0t9vevdfpteoyyp6jvm8kqbah81bpkr74',
                receiverInterfaceNamespace: 'm6bl79t0uz5e6ab24pkto0byuvmnz5kw66r5bbxsraazor1sd3i8c3jbxz8a90ul7hzoj8pyn7wbehqrgwrcgsqrkwm8fve0owyh5lbtkw293d1ku5ac181t697gz2meoh9cbbfm8v10zypdbvn5skvmi370299h',
                retries: 8333106048,
                size: 9600638975,
                timesFailed: 2524064486,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: 'zh6x3hrck1fty6kacgnf0q8mcm19r2x99rrqrzu2fytqncbpap',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: 'yk7kfspo6cdd21plojyh',
                scenario: '57gpse2fsu3niloxizosos0qczdbgtcf5zeiwndycjawfwmb3xqxmovnhcuw',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 09:52:58',
                executionMonitoringStartAt: '2020-07-28 21:24:01',
                executionMonitoringEndAt: '2020-07-28 21:47:20',
                flowHash: '59fgrfnfhnlforkxvx0jru9uqomo9rw74y5t79pux',
                flowParty: 'duf51f29iy9isqcbr01kqzcgg6gqbhh1udyx6u9mqv3irbzuzja83xnb8vo5brcftlndf3ckzoder3ee32vj07x576v343dm1ga70dz9xvtf7290n7nkmieiq79c8bvtzeksog32ncueo9zzue7v87qz4qowqvyj',
                flowComponent: 'yypafuos3uj1skf7bbreysjufx6v3gr9uyfswn8v7ouct8trwa9c5epjq234vieuy7lhjo422dgl09uq0pg4hcl8wvxodc2t74foazke6mtymyqk4yrh3o13o7cospplwgzv4q71l2naf8hhr6udmp17bybn2ep7',
                flowInterfaceName: 'wrsodovd9g78i0n6yvn99tlsepb5ab21jggabcpxlyh2pczxnrxyr4i6ghbj965nhg8d7jx4ii2ttipdjw803jf5lpjitd990itwrd14dp7zh6j9es2crm4ll1m7ho66ouuexel5kqvtwuxysn40ghgyptj8jrrx',
                flowInterfaceNamespace: 'sas0yxzhj4d8bvse7m2kl970k237mu4r5e5vn4v1mmegg3b1mvehxkjul8mih0vdpp2yu0xn033d7hizi45omxfv4vmg04s3spul6uhil5ah5v7us2p3l23aopz5cmnzr6h4zeyl31rd7gsxgh7nr2iin2hd7bk0',
                status: 'HOLDING',
                detail: 'Voluptatum aperiam natus delectus et officiis amet dicta eius. Libero velit soluta ipsam eveniet deserunt quibusdam natus rerum ipsam. Et cupiditate dolore cupiditate pariatur. Impedit sequi officiis.',
                example: 'u526zh7powezusrr85rd8053l0522pew9twvfchphl13g5unu6mszhwcvd8a0zqiqsf5l5wx0pm8j0r3foqqmypksk93seqozuwylgr20ej7fu3uhbofui0vslqdmr72rhlb56pfpyzadmp48ls64x35snctvb10',
                startTimeAt: '2020-07-29 07:33:18',
                direction: 'INBOUND',
                errorCategory: 'k6ql87t9l0zy84yh5t4kxxs6iib9bumjabfaibdxefl03bunbuuhiimc07nburwovlre82ms443oksabt66ljjdr4ajq39dlu4rjpdctibbobes1smvrmho3g4n30jmgcnjogz8hdk1fxel1y8tciiwgz3g06qyt',
                errorCode: 'tle7d7ek53if9b87ibhz7414ejtxkec2zid18p9t7w2u95whbj',
                errorLabel: 836161,
                node: 8372162842,
                protocol: 'i26nmqmco2ay2amf5m56',
                qualityOfService: 'bew74bcpkti0jv7b9nnz',
                receiverParty: 'mivrsn43nfuuar6qi7cmyhx6lszw1vhz9zxciwx9sxsvt58pr07lgxtwiwpwecxypnqksep6dee8coz5l0un4jps79f50og0xvq13xpcjk5hrq66b9jx3o3rdxshaz5j9zwn2afm1frn9pt8fbnu10w34nktd80z',
                receiverComponent: '3kcw4fzjv1obveo27gdcavm00ysr7zfiyxd5d5flswqix3zg69zmfwal6ulppk9kjkbeqzagjxnvlj3ss1ui2ns16730eujxml2fju9o9e6l1nk5363lt5jc9hbm5wsykdmbnsj91bybjvu2zjp4848o4773f3nr',
                receiverInterface: '3di09i4cxp35vy92jcqg2s0arpvze8gp9egekagq6duhf0ggp1p0m6rq2uejgn3hxh72pe7uouyrda19f8b2o2umwiyorpjxta7rfjfeuta7ntd4k11lllg1yed2l21110g6cig69lx1mx0yrsxk9nc1md84pwnk',
                receiverInterfaceNamespace: 'q99e0hqvjl5ni1597xb5tic21d67ah258acbu4s401o79mxlwthbu4hvb8n84cuvxeackr9mbd0uipcn6fcybdrfykw5oxaiavp4s4sr9bgy82qky16qvw2et5i4dx27q6ym6ewd4vzjxue5lh4nlce2s36m16n8',
                retries: 4514326153,
                size: 8225820123,
                timesFailed: 3136093635,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowHash is not allowed, must be a length of 40');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: 'h6yhntqn8cvopnqx91pgfog9a1132jlzkhrwxo76o4qf9npciv9',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: 'r21p6eravthgu14higay',
                scenario: 'wz8fwwxmsjudgsj0mqijmx5tpx7sycwepvahhkgylalmrqxgbov2bfm3m6r4',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 16:50:35',
                executionMonitoringStartAt: '2020-07-28 19:50:07',
                executionMonitoringEndAt: '2020-07-29 03:38:14',
                flowHash: '2g43e5xw14wr83sw4qaguwlxw7i0i9d6ebg7xemn',
                flowParty: '3fdwcuc5wtcwt5r2ebcm1itqzz72gi9hsuc1ezeg7ys68zi487uoo5owhtdwsb6gdv6biy1h90ndc1tf6bkcv2dc1a7h2r3yn66vkp8kryqcgqts9l7zftncbm6u2uthaiv5kccexpr2ojzyy6wq2ct34fda25fn',
                flowComponent: '8xrjlf9ji6uwnsbfso4e5vf8ieqp4ynouhs0pgxgkiz1ux5aq4djjn71qk41thezwutpmuhw0z5q0zunmj807vb9j8u0s8o4wpwxlt1hnqkunb8ygkrmqr2zwntr9nmwrghsazg1ehedzh5zo1kgps3o0aklk30e',
                flowInterfaceName: 'zd7o4vldyzrgx4ppom0wi9o4rgb0q24cd16p5nr4uduaz78gy5cnly2ykxrckqgdgco5e58u6ul2ncou5ugj481jsx0wcmmzpcw1gaimi173kgkxr8ml85to0xvd1fkx8xof57scn3420l4a3ixj58sf5tbkqn8h',
                flowInterfaceNamespace: 'fs0iqh4xp4md2gsmj6xvdcxx0kcc50t3fzwatudzawozuq2wffzk8wc1bi7uz4tq1lmclizwathbwf51l4avq0soeslmovx483lun3t69hhez84y1eaoxvefp3vxf8xog1vi4gdckstr40x2vymvq8cesu972mpi',
                status: 'HOLDING',
                detail: 'Nesciunt placeat maiores aut non. Magnam et repellendus qui magnam explicabo aut. Illum neque odit asperiores occaecati sunt. Quam autem qui officiis voluptate. Consequuntur quod dolor enim. Illum quia sequi voluptatem totam.',
                example: 'vwxspf816bymlovbaxwm57gfxawy1462rtf7yocyec18aa9xz19vtk5j6m1fv2hz6ihfo36a242ksec9jpn3opkui6icshecceaplj0s88ajl981ux6b2t5l4jzx5vmabaenxonry9qhs7wtnrhky19ajg0qjknm',
                startTimeAt: '2020-07-29 09:06:24',
                direction: 'OUTBOUND',
                errorCategory: 'dqzx3n7x5mfrak45x3bfz2z5aw61ztvkoqca41k88gbfsu76trtscq3zvy1gxv9oc90lhxuwzl2ozoefqwf4yu2v63zs3mavzu3sp6n6e1n8dbjzvy4vhv8iapgbr56a1if51znofq9o8wkcfyjspl828l8ehwmz',
                errorCode: '2pqvji4kgodpwc6nmfy9qcu61jujt651v27rj5c915mfcjf7p9',
                errorLabel: 643101,
                node: 4347556621,
                protocol: 'aeju6gr81v9xpfstg0ei',
                qualityOfService: 'c2kbd534m3qy1mhwlqih',
                receiverParty: 'qitzlcxc1uk6irmqiu5iwegkq1o6eipcsmz8pnhyngxdkl7l0d8um49lofo9ktb1umubnmz0ovp753zi54gk3r9a87xt3vtfy4fzatmx28j7mzz6qv6pxh2yc81niafn8beerrwtxeghy8we5uigz1nscj9yq1bl',
                receiverComponent: '00ihess5jqx8ylbxubaepe3wk33u0e5m61lg4695hgubz7vvcyutbu51hqgtu0reu0svizeibbwli1dbapdp7fq4u6w362ew93bsk7ihm6ln7o1j528evarevskhp4bj78ml429nry802cpy7lvdoi3znpm5o13v',
                receiverInterface: 'tc0afypqt5erpwg1vto65j69e3usf5xfkkq3t46sql75k851pscf296zprq9k3pxq28otlv6jcthwh2xhhxqrfrxx7eatnxbb1sfe58d8jwatckck6ot4ii2c9rny7kztdmjh7o6aeinxq9zufpcqsmlbyhof4se',
                receiverInterfaceNamespace: 'v7z01mfv92m81xrmgxyuqanvzos7ay2fl2dh0qlxonp0xu09tv4bjv9wuveo4e3iwdsgunbyhecdke8nnzzh5bhlpw0xgxddyaquus0ogm3690u1xltqb1duom06aklo0x1hpeg88mt9yq6mi0t31rx0o0kumnbw',
                retries: 9043114564,
                size: 3833907160,
                timesFailed: 5157219867,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: 'rjx58nvzemjo9yvlonnf75x1rlgan146kdmdwh7m6kt1ew07fy',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: 'ksh5s2azly2uq0dqvhsdm',
                scenario: 'mmzplj9k9fky7x21himesftp0m8ktvflsjc43686vitptymil0tahm0vxtcd',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 09:04:07',
                executionMonitoringStartAt: '2020-07-29 03:10:08',
                executionMonitoringEndAt: '2020-07-28 16:24:38',
                flowHash: 'lwdpun8f4i1ey56qlpk8mf7eho6u18ca9orj5bfo',
                flowParty: 'w9nr5rivpgvxp8shfigaphke00nr6mvf1gc6rpnb3rj2zaixje3n748s2q598jh14isxl099zu2fl4au4bnr0gfop0io65gxpihnj5gyvrdtvbzuqx66jolzu5eyr2i0hqrc4rn4hu37mpnamjn1l1t4s3cnt6sq',
                flowComponent: '6dvxietehhk9wd78hg5ypl99lr47kuluapimx5kztrw2s1i6dpzfq4hpqvfiy87gnwl0robm9s1hmkj4ssyqnu40x2f4ytcrw7dmmrbxmrn68zr740e2lri6xi6rheko8jna01nqrewaifnjxu80w1k1rfgd41tk',
                flowInterfaceName: 'pugw214z7c3nvs24a59x1tiywke28yiv1xzf5o4xbm4x5aey5j615vihafxcamrrw55kjpee707257g1v96qx8rk502r9fs4k3kjeuwh50g2i5k78rdvyfaraoght0ku9lyfi9ccznf3kugtray3ts6zspjvy3a5',
                flowInterfaceNamespace: 'yzb7wiyysd4p6r2ppnyrfqf61an2t1m6rmvp47dlvpajw52ckohul2bbms5nvxrim79ws83nulaca3xqrfc8sdje06gvs51f98mrqromm0qdqtp2qoi7mhblt3vsyg3ax3hlk0ib33vssiyf4bvwjuzr7adajns3',
                status: 'HOLDING',
                detail: 'Iusto ut quibusdam dignissimos. Est eaque quo. Sit ut excepturi id dolorem sit. Ipsa quae vero aut nihil. Debitis voluptatem aspernatur adipisci.',
                example: '6jyfdcb6v3v6n5s10mxivfy2fx7v7khmmztavxn7iushrd7y4faczg5k8us36ugex49067mhmzh5y1tpui2k9hvurwaufk3odfnjjlffaz3l6k49eej4w5ntcidioxbbrdiuj9o3bztohkwfog2q70hxiu99zwds',
                startTimeAt: '2020-07-28 18:15:08',
                direction: 'OUTBOUND',
                errorCategory: 'x2ymj4xh9j5xfdbgdg2v83fy0nx61hfyz2dj2ua4yf5mahyviatqrf89hi3756obsq0g6vod02vpu3aof5te9gf2p4xnh5oub7raxpmwhqq2pr2pvajjz24ruty3cyki5xhj24on5lmcmhdv9dqjc6nv9pb3iv99',
                errorCode: 'ixtu18914djb0jjc5ce0lj282yt39qzdp54qg73u66u76f4f0w',
                errorLabel: 490654,
                node: 8020508189,
                protocol: 'rxfuw9egpexi0mubx4hx',
                qualityOfService: 'p0u8pn6et3q0oggva8h0',
                receiverParty: '9oxqa9f26jyfw9rlhvgkskok51zt3i7x04vswul12rmmgefzmf0czrw0rqw61kx2mw4tsuuoxyr2wfvgagayc0o2f8e1k875bsmnlkkunc54mahrcp6pzmpfefkr1zij2nq5y0vwfy10ywf5yppzb3xj29mclgo3',
                receiverComponent: 'sl55mhkkco2ahn4qmyx8nybpwkrby0q13er9sla9q3ivskcc2lrbk57q5dorgmmz9new5jzbjcquzoso0eg60v0tryu7bhzqltqw2fw5rcwugx56fazglrfkd3aiqdjj971t710cvwrl92lr5n9l9c842vvnn2nw',
                receiverInterface: 'wm1kryddn1xbcga9u07o22jvfnjwm0t3qzmc95ts6wpd092nmam2z4i6r52ie8y4syfsk7sumd1u69a260r9t381b6n9hbm2knvevs8h0aywryke1qzmy7zttl3c8hg7pd6i9tboy5wjj8n8x81na8cag80tipwl',
                receiverInterfaceNamespace: 'szuznrke0zw4ysgphmujlp351hugqp9bcetyggfrq43yxe4uobzpc9joifb0wsi5tok3iiv3ovvupxgavohx929sukoobp9wzwr14mkxxz1lbyyzvr26ndooxbdhc907tjf8crj2obl65172zxq7opdzzrvuee28',
                retries: 3074993990,
                size: 4398849783,
                timesFailed: 3518611548,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailScenario is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: '37ag705r28s8t4worzdtjwqaqyskxr42pe653wvn61fi0czp8i',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: 'f05vttlknnh7eqc28s2l',
                scenario: 'bm3cjj97zilv98dm93irp4jqz8g8o03e0sxmjh5dvquu0ml2s5sxflwqyakua',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 10:07:45',
                executionMonitoringStartAt: '2020-07-28 20:28:52',
                executionMonitoringEndAt: '2020-07-28 22:09:30',
                flowHash: '1o0k9xsn2rxbuas8jnhtamv817ggs3ddlbmdz7u8',
                flowParty: 'z0kjyaa8ajis8lnweq4ag0g9d81is62y85cjgb8o38rps6z6gycnfb9z0n8dnlopcrg2d6tnsyczngth7z5cydy9xpkyh4d9ymjmtg2r749izxzt13re9ud6gl9jxcdesp4ikkzu8kj5d0qo331g3323fbaqdbmg',
                flowComponent: 'mohb3kgzu9q07v8ccxgb5t5pau60tmy32nhgaoo99mxrh5igorixjizs2ayw3ng3t9yotx4orzytps9fgzlflaz5j5cwr6ybvr5higyyvzxp5jgp4r75ejtj5ldmi6xpdutoy9ne4vflfnthfhoiej08rld1jtlg',
                flowInterfaceName: '3j38o48mr7yy447doq8az008bbzjr5zgzxmxua9871itmxl9fimoy3q7yse4jztct80f2ganxuilozhwr78soz5qtlt9d1q02xuu2sm7m5yqieog7ws9ujc1obgu6kdyjkdyavlrvd6hg7y3nb346seotahwmwrs',
                flowInterfaceNamespace: 'r7sh9tc14oqjjdn3a4q3bssn9hnebmp23f7pco3ocz5ksglipjiwc3lltb68ww45r5zm4m5dasuxyymttolvr0nbsilbsap2956xypnvcfne1effgia4gtba01f1elj0c18ee9zu5fouq0a7rksye74owztviofa',
                status: 'WAITING',
                detail: 'Atque expedita aut pariatur maxime quia est eos. Tempore corporis adipisci natus minima voluptates omnis corrupti ea. Illum ullam enim quam.',
                example: '6f5utwwd97h53lllgore8vi100sl2wd807uwdw56vs0inwty4oyb5l5jghq73qeql28m2v6iuc5l1dgl4vue3fqo7nnvlsylqg4suo3nxkz4yyw77p0ofwirje33cbxjj0efqru6dbl10mlz2se3xbxv7u8d7cgt',
                startTimeAt: '2020-07-29 03:16:32',
                direction: 'OUTBOUND',
                errorCategory: '4bltnt0a5uon9n81sj1e1ij4l59qzyn8vqnmznph33yp8nqyjmdgaur1reb243jx9t6orpxkj0ymxz6wr9fisdlmh4u581ug3ggtmrjf2jag02l0funa78sggkfrwn7es48gyrnmpzwblhuii2ekyuex07hviaxq',
                errorCode: 'r09yv870c3edux6radfti637fkzcc98z7xco6412b1wsclb22s',
                errorLabel: 535377,
                node: 8477669863,
                protocol: 'xm6x9203unqsbsl4kchd',
                qualityOfService: '8j788s9fmq1vcu1rf6xm',
                receiverParty: 'gp0s6ox9niskrd53wm91mwef8be1oqwv6v21n68kcsibysp6zzayo2sco3cw8oeqrsqtlwpx10wn2fl4q8qzsi40qpv4bfedet9b3n6t5pq6d9n8yzjj63ks3axr1rczopg9hzngwbosqxwlcvnuovkx5nd9m4zh',
                receiverComponent: '4a9nwgsczu9brqi12fepvo2f3kcslbfjgywfulszcrmd69x3rju4gfrisgfxow27sx66p6delx3pmjjciqc5wly9sh6dzbf0pv2jorxrmrp54nm6e43cy6425c4llzyki9ne4os1sic03bn2a8qvi9lc09g465pg',
                receiverInterface: '3wgig08b1woxrd66eq882fy6cx2lc85ynp5se6bwx8sl94nyga3pwgb5m5xb5q1aqkwjjc9q84j10huh0uoab8qujhow1a00rfxirf9mi5vin23xeqmwsggfj4y9jhukt64tw891ho5fq83ibcsdot0y9nargf9k',
                receiverInterfaceNamespace: 'fretl8urmxwjlpkr8pem0rhmlr1674uw3ydqwby232dacylupt7969ygmns7c1k8vqogk94v1502cmleul869kkioiu968wk4qsoki50ff2xxi68rneva2dtdnfseexflbqtiudcswchd1f68g64o1z74c5wbkpq',
                retries: 2186711789,
                size: 4910218289,
                timesFailed: 4161785937,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailScenario is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: 'mh5gkw6m9xef3ji6gwdfbrbs22moz8ciilpbt7542qh01mcfnj',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: '5mmx9jiqqszunq2wb06i',
                scenario: 'gmg3g9867fpm5m3u9x25k3fxw6t0mm2isva0kurdc1fnuluqkhfkqon1qrnt',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 00:14:58',
                executionMonitoringStartAt: '2020-07-28 16:44:44',
                executionMonitoringEndAt: '2020-07-29 07:07:15',
                flowHash: 'g4rnstbdyh4jft8eflps13peixzfrzaffq6li83v',
                flowParty: 'vp2d6yw0vucfe2pxoccp284krphaox4154674hnal59g63hoexwm2yzgiray9fc5ujxmjs0cjy78cmoa76napjhff244w48vztfmfqmj3h6yhvefddwj8wmx4mh4mxdupebqpfpav8iq1ir0rxtikc6pzdf59kh1k',
                flowComponent: 'v4tp2cw36ywk8779a068abislj1bj9yz0to3t1c7a908n3n01yazedq4z6flj7l324h8d5whdeyzkd3jq7np4gomonc5t7wpf1bmltb2tdv3lxs7mckkwpr97bik7nsn0lg225qxxykj5a28hptieyx9jo1aiy1s',
                flowInterfaceName: 'dwzpv7qyc1qmdzm30xeojbri7tbshh62kohkjx68lv2ky8zr068wtbe86u7eh0nivolcvzejjxs6f6fujr141i8jy3hx3bpo5r5ptxfoq9x9bvoecuu77sm7h8phh0zwl8hv35gv8u77r6smdvywzdd9ahg57r2y',
                flowInterfaceNamespace: '1orzjzy383sveige0zjynyeae2mbsp6hhjgdb2sguyfy04ywj8pi9fc93qnjusbuu7l0u7ggjwz35eb2c7o8plj2gaamnsxevflq62zm5eqze5im2oxh4ig8yl5i7zlafv3rcbdzay4cz7mklfpe6xijtsa5ya0a',
                status: 'CANCELLED',
                detail: 'Voluptatem quis qui tenetur unde inventore. Dolores qui esse aut architecto. Dignissimos voluptatum earum numquam quis expedita qui. Alias quia at. Minima voluptatibus saepe quo ipsa.',
                example: 'd109ayjtbhex7gqw4ay7zvuf37ef9jchkinrubc9az8a1b7pk5831gdd1ss6uig6zo23t75fxclux813mcaocrkk6uvr4eonj7t2qnlilrjga0tzpzfiggo9nvm1r7zm04r04q4ihbnbnfyft71rnqrvzoc96s96',
                startTimeAt: '2020-07-28 16:18:59',
                direction: 'INBOUND',
                errorCategory: 'uqkredst0y6s8bekuiikiiu9xmspd537u5fgwu0xfw3sbstlp93skubkxtj71gyu2s6q7iw1k03zumy72ikh3tvkcnwguutmd1phogixltefghxrscqcg0ocn4bqpha9fcjhnxzgnfqqnt1pb46f1q4cuq4bbs4c',
                errorCode: 'u2ojswx52wxbe58ecehfcslobz2rggzygts7dakta9jnep9mxc',
                errorLabel: 498813,
                node: 2768525594,
                protocol: 'qhqppdpc2b4acyv388ci',
                qualityOfService: 'lut488oomh53orq3j96h',
                receiverParty: 'dzsyug7j5rlo4dlorj73zxk94eeoy3vfbqm8bo89lgg4f7u082aux5ooldmk0uk3vl8crp7za75oehb5dsgj6w3fauk4xbaonqv88iwyru1m7jhfmj975fh38l8e5jf7ulh04w4l5uvk4z1y89atkn3u5tck682s',
                receiverComponent: 'ix2r6e8f41fu3bx2yy7egszte4elk6xieeosf2exluqtux4nfsn9fpa4flhvda06jcj0q75pjmlav2e0pmek7zo1qf2llvgtbkg22779zxk7o7sbdrab910mt0fr0z5q54x94m7psqxrvq1ffwn5cuen6xup47og',
                receiverInterface: 'sbve1naoqt0692lr23ftnyc1xx9ndsxqingov5wmwfg7bzrcnye92wod6k3ykziczg8y75qm0gmhz6ro6sx51tk5mlichfd2rc8brfxv96t9sjhleaby42024yvyok1nd6f2o0a8s5j85j58m9x70pd9mc1zgsj5',
                receiverInterfaceNamespace: '0l3jlq5ed75m57mgtoeemq7vta63ydqpw7024lp8md7gqy926ctdkyrl1t3j8r4ys85u23g0ubqnwncu2fokewxfxxwod44zvi7ty8vpqgmx6thbogab258h8wdijnbvzc45dfb14fam6utt1vyz8gmhm4qgo1wz',
                retries: 1838135955,
                size: 1837530704,
                timesFailed: 7917356719,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: 'bm6bifjqnmvbsr2bcu3o6ge9jzme2bgx1hlqbxsc4cwy17cnue',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: 'rbs5lj7k2xdq3bd2ys5x',
                scenario: '5a9whhix73tstrmno24bmtnzl1t2iq69o1we58opboq61yl104e2ijzkcwr1',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 18:09:49',
                executionMonitoringStartAt: '2020-07-29 07:47:45',
                executionMonitoringEndAt: '2020-07-29 00:55:11',
                flowHash: 'gwgn1355cx9ue1fekk3wqm5kwxp4dt8y0pdldvi1',
                flowParty: 'ldeq8giop6ie0sowto9bsb65y2vyxxzfshqm6vmnk1sx17o6fpkin85y932hhmd3hl1yar2cercwqalyeb82idndd3pq6ijp8x3yhptun8b7u9howzihx23fcvnk3kkvsz3fx3v4e17fdcqtpyavx4j1un0etn1c',
                flowComponent: 'vpqogyv3sm8sowbjvuouqx954e8msrlcvat5okr0qq8igiv68b2t1mldur7q8wk7o39m9k8i9vjx8dajz18xcf0wh4v277q3s6c324a04yqrsqwdg19exa1kw9nlulwzlr8of9fxhcm2x9rywja6czkj3juw874ns',
                flowInterfaceName: '4d9024xx3wac7ubf7qi1q0l8el4yguxtfcduh87vpqdgds1f5vroe3teoojznv897fe7u09javdzokdbvlq1fs1lbuusjne5lygqook4495z0g6nhoixts2ffbp6x39sk9iu6a7wn0jpfbtqxvyrzadej1jdzwpe',
                flowInterfaceNamespace: 'clevyh1iksspswcz37u1sl2x65r25t3ybpkylyvnj0qqbxsslzmii8gglc0ak7bbq3z0le2863gvn832h61j9evyqutrx164iphf548dg2a9oupiclrj5jaoea9dlri2emx955vfz41mdart0nvqyzk9it0czbis',
                status: 'CANCELLED',
                detail: 'Consequatur error id. Dolorum rerum qui quas placeat. Et quas minus enim cupiditate suscipit occaecati. Eum amet ut corporis eligendi aut architecto architecto voluptate.',
                example: '6t9zkiy6rhuoksr6o5q7p5opc1r4j2xxeisk4aqieuni51izy1tbpqfp7wvkmz9g02enxsdxh2crfwuvz25jaljyi2osy96hnx7266mzf6fd88l0i09emiclkl27ohhj1kb4o2t3epp4y2j1wxq7jih45iktkywf',
                startTimeAt: '2020-07-28 13:30:47',
                direction: 'OUTBOUND',
                errorCategory: 'przcrgn3udx2guravov2wulxljgfdm0qe41rg90e6j4ioy6u3yyfm93462ifl0ajd0l31wc31dhlwnym7ext3ruksv07ogrrbxvbfvlk749baq7ugrwyduyvxptswxma62k7rnlz39w89yp1ursjarb5m3xin0c0',
                errorCode: '0dxu8wtose783ttp4ucfimyw1642tpbr53crbjqc4x3t4zqjql',
                errorLabel: 541395,
                node: 8429672305,
                protocol: '6hgirby24cgd8c4co9mv',
                qualityOfService: 'we36dybmghcbrm1ynzoc',
                receiverParty: 'engxmnjntswnk4h59s4o19pn392r54zrjyptkripwv425gj1c48lh4wojt01c61kdgyqfpf16pk850c2trixkymq7jibn31a1h7mucmgu58bdcv14y3glzhkun3cp6eiy3ao10ed2f0rx2m9mhx1uvrbowezo30m',
                receiverComponent: 'mlvd2pkofysreltlx9ehp7ckmaav82rlqjfrwkz6vgbqjvuqap4cceauozfmsxae8rkgas8xeye9al8t6gjcu4i6jcyf4wnxyrhdp5oc7f07p0slnzlurhwu42dk2fr0s8x9raggeoo2vkbx1nxxgzphuyo0vxwc',
                receiverInterface: 'ml2ru235z9mfeqzbrfpf107v4km0b9ia0hu1tkfhcapri0r8xq6zxk43dnknmni2nnl3k5yfqyf26s18f5zas5e0vdqjjl8f35tcs1zq8fwqenj4ds8s80vpip7tefivgcnywdou82gs52dlo3law8p49e4owpn6',
                receiverInterfaceNamespace: '9k1kywkij35ouhlx8i180bu1llv8j8jzvvkd53n6xdehmvwg9qduosk0ovc9def9rqjujsgrjwj9nrsua0jas406ycm1kywm152524lmmz6utdefwo334y25ou21pwdngj2di11ngdpci33n9m8a9ivjpylz7dye',
                retries: 6678689305,
                size: 4251361088,
                timesFailed: 2780854617,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: '84gdco2maefkpnngvpufzxxsz8sb5m3zuybtgirqp6uzcxa44k',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: 'v5onoa8sgaimfy0z7nxb',
                scenario: 'u3zuzdqofqdj9jwhjdcbb8tacx6beext5xvmv6mymx20249o3bcb0q6l98f0',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 12:06:44',
                executionMonitoringStartAt: '2020-07-28 18:33:40',
                executionMonitoringEndAt: '2020-07-29 02:00:32',
                flowHash: 'mwhy99n8fp5m1hrf22gmy8i7vbpah1tdat8n3cki',
                flowParty: 'o7supz6f6usj7sdgqhy87glqx0xddpyjavdvr09zibywrgznpsxwkbhdf3k32d7wbh9knwvxt8on3b37q6vuqj9a1i5ssxzun6jbzresqz5qno6p4desm6hmoei8azap68p89aihjmbubbbpretn6fp793i8k3zu',
                flowComponent: 'x4vmejy88soxh3pr1ws7459z1z9b1kpx8n82wiuc71usicq6vafsu4yejigkxn2th86q1g29f29miotkzmk92as37o72vegifoyhrluuc4s1ounqhhfvl7ir2u7lbtd0oer6scfz29whmolj0o9gd1ifuniybck1',
                flowInterfaceName: '9aywoj9ig6a1nvo5a8w2jsrz0fmigzofm9ssi7dyh64brgq49a6ege748yo1jj1k6fxpuyjkdzh2qae53lmpyyt0h5v246lenildyunsw95uftx40g04lqfjt7k7wd9tmpxqfjbiwv4vudpx35od8kr33p70uzrxf',
                flowInterfaceNamespace: 'q4jvacg4dfc9p4pw4pxw817ek53dac3zy5dcwdbqhs5cgrps9fcsl0ilgqsawkqi69b6lgle9efsn5fb1osogdwtx83sv0xtph1qfk2p223nevz502lng9saanyxesnrsx0nvn29i4sae8ty3k6kor93snm68o9l',
                status: 'CANCELLED',
                detail: 'Accusamus occaecati quia incidunt qui. Aspernatur hic harum animi. Qui rerum aut porro ut perferendis aut error. Accusamus eius officia qui sit neque omnis.',
                example: 'gousa6jgcoufw2g9gdt196x7jzj0jg4yv9s7xn0oneoqthxrks50ibaw0ergz3lo72o0tx2hc3pp4s5i0ynrdr7gnhr990wf9bcplunbtnabnycecmyc21a5lnaunt939mljyrzkolw4eixk0wt564woabnspylh',
                startTimeAt: '2020-07-29 07:35:30',
                direction: 'INBOUND',
                errorCategory: 'jx900b1gzo9ibnzo8319y7geq9fv27kf4nsekqvbjt9gttcy0vq3y8qtpe1xcnaznaa5xdnwelvwhz0rk1hrmnxgs06m9kqlm8xuwqo7q7tbgfriu7vz3m693aimnehziw614qy8go03szwrwvrgojsir7ak5lv9',
                errorCode: '1f4vclfho7zx94lso7crznycetebqyqeabwzfbmha5hkvqei9i',
                errorLabel: 183750,
                node: 5567329147,
                protocol: 'jnsux3oea5j94el5jzbe',
                qualityOfService: 'phczg8vxcuo0wi4s08zn',
                receiverParty: 'lt0eu08i69t5bza8byjd4izvu85cigd1m9b9vohk0ogcg984kp7118dnba2uumslunpi5mm2kyfg06yk9slyi1ynoh1d44z1tbs2rnz08a7ebvoo5y7r549rlms40ssekfl7ekjin583g547f3cy15kjlqaky20z',
                receiverComponent: '0p4y0iswoa16rhexl8o8whd7qyy4y8vo9o2e6g1qjwg2aaxh3k9b3wm6kkuriqoxpyfd7y5nt138s70r6p8qqmy64tn73jvku9euuxxnukdypeiyh7wcpkqidetj09s2ucufhmkobbpia8h69e73gv07vsbwpkrs',
                receiverInterface: '5q2pwwyyc8xf3paum3ukodwth6o3p0f0hj7cpe4iroru3cqifna3ybat262pmyxux9cnxlih54c3k32lzmc13xw8wdux3uzw9z99k91yyzde4zdphuk07x46f26bvo2rd2nag8clar027cy8irtagki6jgnq6ylu',
                receiverInterfaceNamespace: 'gfd3h2mricze6qmwt1cn9bmbj5v0sskwj6esh5py4i0knxv75ek8inldwj6saktbeyv8gfeqe6fv6v3ina271wq1odf8pn31z2zp6qv1mw81w0lad29ohvtrvl02gh1c87bm5d0zivrg8b3spb6b0v9nx45l24v2',
                retries: 2531943400,
                size: 9797827222,
                timesFailed: 9873516870,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: 'wz8hwma28hpnn309xlgedo8q8bq2ompzenljxmfi7ycw7glsua',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: 'qgft8t0lqct0me3wne1z',
                scenario: '4pij8lirlr0gn6r8wo0wd26tpffi6icyugycqtfs0dywoot0b5ctj97no7vo',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 15:52:20',
                executionMonitoringStartAt: '2020-07-29 04:16:48',
                executionMonitoringEndAt: '2020-07-28 22:15:34',
                flowHash: 'qb34duy3dl1ukr0idvigznkc5czx1q3paoj1yxva',
                flowParty: '5qnuz5bsy2q7tggfvxa78875ayiwcbfzan5daau11tkskynxo6fhqn08f3ftlqu6i8zk0fim5dodmhn4gaaevrk8j4wqintpozb1m7l4g0fjcuoxzv9tyl28rw61lvtg0dq393mv4n6uitsp5rkmqb4fq283dh5m',
                flowComponent: '9jvaztf0qvppfq7pebo8zabzrd0z6qa2aw5shibtmd8tzvm8bauzfomgv9epwpdc04bpf97y2erpd3auczswxiwxfk2it49xkwybwy8q36740ihalvrgog56va5x5a5wme4ht4x9vtm9g7dtqx1x0ctibjnxf0e6',
                flowInterfaceName: 'kp4uzktzctfhjfkea0om4ixf8370jzs7vqwpj6ovhwastttq3h9fw7r96v76tjd8ri5l7h92wzi27lvyqmq3q1zbre0hzkx63ny8d5r7ye5n9fozjhb21viit7adp8osw1ipjlh3kk5r0qdv6fkmqq6kqz2sbvm7',
                flowInterfaceNamespace: '8wr2xt0uwpuhyy3cm6joz9hl4ssace3foh6eoc8th91luhy1zhoi8c0ohhdci2k0rr9nkgyxiddbbjefowvhhlcormhhiek8r8yw6kxh7eevqzfwcaz8x70zjm1ch04j8z0xsm0cxt4ybbjf1rtul6g4vqktpmuua',
                status: 'CANCELLED',
                detail: 'Ea dolor quam dolores harum vero accusantium tempore error. Accusantium voluptatibus rem ut aut. Totam modi molestias sunt.',
                example: '64iotq6qpdogotrcrlp2sgcht8873h59oh18b6mo5wxc2iqampdr26um3dqgzbm9y1ewbvrti6j8jw7akxonpzarbor82tvkr9z85h2ak3tvb91v2q8jnrfzhbbhddwtr2jlliq3ljpuw2agq37oarj976qtpolo',
                startTimeAt: '2020-07-28 20:21:15',
                direction: 'OUTBOUND',
                errorCategory: '4pzjyvgqc8yubvq3r7dsh6xys82281qvqw8yslct8vmmwnykjr62n8hn6b2nx2ixf2dqjcn2mr5aqw3etjdx0wx1u0a5ft0x3d9l0albq0chw8g22o7d464jtvcqtic8ue9utsx08w3u3rnpcw3gxdhd902qk1i7',
                errorCode: 'hgxxjjxh55yvakb8lk1v885djs3kzbuqs7ci6m1u5owdnbw7yc',
                errorLabel: 210596,
                node: 9465051211,
                protocol: 'avwgbyatac82qdw1eunn',
                qualityOfService: 'mp1f0o9yw4meera4thu1',
                receiverParty: 'uey1v6uoot19bl67qdnesiy2jpdk6ndgylwp2j95feay2kjt5drh2smrdrk4xiga965ounilhcqf26iaoob8q4imadc74nizz2vmwpbugrmcsubrvc7fi6et2er05xltbiewo2qi2839901u3nl6k63ftc7fem8q',
                receiverComponent: 'oiummhfan1818kjb7asyrb0nkny17fz35832vjt5onluzo48mvbhc476i207gfhdxj2jqqc858030ly1adksflziw4ikoxtw50pvch2qro5kg756snd1spoevuoyxx627j8in6z4ppdzxq22nltf62dd5iqo8mz0',
                receiverInterface: '0i18ym63uap3j85788k78ouci7ka55p782vh55ckqzvv9tv6tidctiebieu68d53sjmtma6p3qnkav3673o5d3byj7yo990ezfj6gzn8ox0gftwzbgkxz2kf6a5su4hkhx8pfntbztifxuwu8mx71f2s22bxctlb',
                receiverInterfaceNamespace: '8tpx4v5ag9fhj9yxex56ha6d27r6cdb10ezoklbggil6xfrdy706vaough43pg3opnwzyszhnoyb8q3pm0apbh99159gucj5pv062vptvboem1gjnweqpczn508vv06cv8jjtnqdmn2yiv11u43bi8sx4nrph4k8',
                retries: 3185714765,
                size: 2087121643,
                timesFailed: 4382529769,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExample is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: 'znagfkq5aizq0skcpg0s1wmyhqrbl0kw69737seudwzupi63hl',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: 'ac16u5g9n8t1vpnz2qzg',
                scenario: 'rmz9o1evpzgse29f0ai6xuiiq424xpzoe7p5b237fosb8xfoj2y9pcmp35u3',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 02:57:23',
                executionMonitoringStartAt: '2020-07-28 23:53:41',
                executionMonitoringEndAt: '2020-07-29 07:24:08',
                flowHash: 'l3tfl7regjju4olviuqaekmi70e5s3ydo56p0br6',
                flowParty: 'qdxvezj0hbfds9f4vyum53cefz6pzd09bp5792l8dfjr87swzr2vnyooy4qaw1jx1tkfu8k5pytkcxa9f6yym07hyovlpcld8niik4c5iqroc7velrd23encu6awfvlr7wpcvxkpnx8lgk48trpijdc5apmuo9ue',
                flowComponent: 'bhs7boh9vsn43kren9awdga32qn790xw5koo1a3skp8lqcwgxa3az9xut3e25bme66hj10woqffbgujui0zd0hozst92o4psjx8wd270g2p48mkja7l1y92oc1mzzxhuf1fugzkmj52t6qt742cr2ran977b49qv',
                flowInterfaceName: '48nf8emv11qmd2ahktjk6irp0tykh97axzcnutujviklnp00d9f8gbcr8ptq4ftxwcyibc5iqh6936226vyzvwz74qgip3thv9kkie8xtn3xqlqrjazsfxwxy6kvu6y5nvystj9yzpzx2ed1xkoq6nfky4fodpm2',
                flowInterfaceNamespace: '35fm7gfrhy75i8xseu941lpyy6gvkujjdfr7rzkmwan0m2oe0nhakkwd5mh4ymgwd8oy68eth64xpvhbal0sbpad2hla8afmkjcrvhxl0totqm5g0cvvunx65cqkr3ex0whh6uw1gf6k0xywd0kwgkhtf515afxb',
                status: 'ERROR',
                detail: 'Quibusdam ducimus quasi maiores vitae vel eveniet eum voluptatem. Inventore omnis officia porro omnis. Delectus qui dicta qui. Ut est perferendis et quia voluptatem atque saepe pariatur dolor. Qui officiis alias rem nihil aperiam.',
                example: '88m0r8e0iyq4pypg0n1hqduu6jjy7wcx3bgxqsddhz1c8uym0z812vdyoqvs3pr8mnk9jvyg7hzkqpxlngg5zkc74vsfsyrksbh4ilqiy6dsiohgz1lvgss1h3cr0ewq8u0cn819m5woolqyd5nrfabprszb1qspc',
                startTimeAt: '2020-07-29 10:22:04',
                direction: 'OUTBOUND',
                errorCategory: 'b5uoay2l4hoilillhndl42w09xitwehk4vefhv0elshv6fvj2ybdx86n27x3ee6xq31r8c7kb9m8apvmr01acdaybnwhjgq2uspvbng6cbcg6c1y6lc5nubbdhlxv73pfbukz2u9qzjckg20ucw77nuzhruchb8d',
                errorCode: 't550kwbgko6aqfosrdk19l3y3aoxjxs18f4lfr1lrb6p1f6hbq',
                errorLabel: 186518,
                node: 8215480085,
                protocol: '1nca33n2bwtxlevf9w8r',
                qualityOfService: '05gm373zmcs4x3y109ed',
                receiverParty: 'b732ybb18vbpw4v5sirvgj8bvrtdzxt34mslsrrr4cuvcya5ay622xul4nuyhlvuhb7lhdq7gjmm6m7c4htbriuedrdp63bn1y5ohz685d87jtobwc0zss0it8y7x4bhv7kbkhfzjhbp5iakaoyxop8edt2d0n39',
                receiverComponent: 'gdv08hylvqob95s2x3esxi9lzsll1zkpqqox3fd7h08p0ugq9cj11tkc795yac1db7883icvur575fhw9fc3d7cbqkaft7dzovry985ulwbqqnf5uvswex2qy9upf7afaxn6ibevsj146ezh0q0drlazsczubcun',
                receiverInterface: 'zob0ywpdd0ga016htxlrqwb6tosba2po2nie7zq1qqefthabbumvywuvvo6r4ovlw88zyiw3pgn4ajt1kl8qegvk3grew6no8ifsng0vg71nzzgnt871hxi5z88ano0qvx3ad0k4qkgko090d6d62acc9dkd5xrz',
                receiverInterfaceNamespace: 'pzx2rlecljvw8cvw5cpmsr8qv1vg3ma8po9vrnhmd5fc3yz47uyn4pm1q9gfonjefrc4zmdp9z58nr13spgfxh79zbt4enoigqkdcoglwbwlhlqy3vh76rgouqfl70ok4l16n811wn57vjw62ignkcafz5hmkcv6',
                retries: 4752197708,
                size: 3088648619,
                timesFailed: 7756987229,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExample is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailErrorCategory is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: 'ymv8peyo97oj86d7xddb6amkw31ervwxzs5tyv92puyoyu1kj8',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: 'f1kxuzwqciqpxa8a0b4w',
                scenario: '9mk3wvs1sjwzr026z49fc9v3lvslpcmuvc08x9pkv0k8u5fw8ftw57788ip7',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 08:10:36',
                executionMonitoringStartAt: '2020-07-29 11:23:37',
                executionMonitoringEndAt: '2020-07-29 09:05:43',
                flowHash: 'dyvfgn2cu8cpmvzx0tz7ijygbcrjdftlvcn4qjb0',
                flowParty: '7pt99jrymbbxm2am8dpyr4orddr02anjp96cdz3i2hjsli4heodcr03vor7o3h7ixn3ajglzixkin55kv5dusyi0q1sr8wco7ptnugzdaw65wfhosofrq7jj1gggwl88i8f73t3yt3zopaj9q8kk52hv5fvj38ow',
                flowComponent: '4ws1dv4ovliolcxju0stdpk07effs7hjc1ilebqellx2xpvaj8safos17b2pweuvkvtx04qbsk5pz3ogie3mamrne3371vzm1qhbakmmc46d9xx59aqf775j4sf485559hs8lhew30lvhir6hpvb4sgi8rjo3xf6',
                flowInterfaceName: '515w99jwpxnuwz81xunvl326zan0uys0274ypwlw4y30c076eyrhbbpxo1r033jj06e9s9dnnh2o7rdclujn5242iubrrkcr0mzlr7j9k16340vi8ql9k38f4gcovgrq6596c6tdpf6frifotnw04o4v8wppaxqd',
                flowInterfaceNamespace: 'x6euucoh7ua54s1od6fxxtqysk90y9wwzvsxqr1zcj80jcpxrzldfnouurjnznrtfic6i8kq7d8j95sbceiu9nu91orp52hnt09leeyjghi39yxfwun43kuqe5sifuohhsy34zxslsxsbcq30rfxq6ertk6dh4ns',
                status: 'WAITING',
                detail: 'Dolorem non ipsam nemo tempora autem enim fuga. Quaerat eos sed quisquam. Et ipsam est voluptatibus consequatur eligendi distinctio suscipit velit et. Nam minus ex esse corporis tempora ea voluptates voluptas facere.',
                example: 'arp4fc0r7btopggissh61kfj4r6ykxnhdbxuxlb7i7h9e6lpsg0i5mu0e0eewekbr4ltox798sz9tl633gb8gfbnmshb28lmu8lc43u9j428jgu18flxetq4zwj7s9hsaao2kmov6kurexttz2ed0eg9u170swzm',
                startTimeAt: '2020-07-28 14:35:17',
                direction: 'INBOUND',
                errorCategory: 'eoa4yd7qe910vhc7c22eaflmduqinssf0g091skusgxrazdafbljegp4zcpo5608o4fvq4o29srmwkpuz8kk3b4el67vyluzzjdpt5d5zpw3tiki1glilias2ll6nb2fz5d8szngtqwwiil7gbjn6wonnk6ayi619',
                errorCode: '90yvbdfcb8uuw1lhmebpmjwggk5089c528hbs4m0tkxysxde52',
                errorLabel: 342866,
                node: 3899984611,
                protocol: 'on0w2tfryzeeo574nu64',
                qualityOfService: 'os62czlus9entdlgjlnv',
                receiverParty: 'u9612k8j2kmkindq9jsdr7bps8b4gfp6cs5uxd9mfevx0772d7h3l683aea7htupeiw07usiq7mueq6tia6xmktfcddkbyvt6a0jd46hvbklbfnodbfmofd78d5v1yuo6h6d0hw608mjmy3lpj18i67uatw1ezxa',
                receiverComponent: 'zme2ars1lw5k52oymqd2jrxj7osfhs6r2ta42eyelfmjfvz03sd6gq7ohz4tf095pw6kug7ggko8yevobxkrggrngcfxdzvxbod5xsa8a9ogqyflnppbxt4fj40x9swdz2thwnd4omrubvlaco6mswtg51lrz62a',
                receiverInterface: '8srw3zhujih0xfzg8djx05vnwkl2jctcorckpu0mgfhwttez1rf4t2dhksc1x2g17mt0b97q7ozjba3vnwby3080ami0p4uj6nezy45h0vg9af1rhqqeww0qj563dm7a5yioqs3svjcj3jmpgsx8ltoeadm5ct1n',
                receiverInterfaceNamespace: 'i2ny2kl3ndyq3x5bz5aw7g1bs4m5hkpuyhotr5p9briv1bxociih51rm6dfg2wepm7zgnb1ze2c5jya2ms3vah8wyvtbejgig9r0i9af5x0oscwhb6ssb6tswryclkbmpgjem80iiu1rsvwksufbn540jfzahnif',
                retries: 3733304404,
                size: 6166131492,
                timesFailed: 5802144776,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorCategory is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailErrorCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: 'nzlp3zd7bvuhk8gie4koelswc4lk3eee2yl9qp6q68p2vkbxcq',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: 'no9inxkagssizr53tfcv',
                scenario: 'rva9hn2hbi89hlhd7f1jqi5gwl6sixn8okhqpij7bnuobfg2lwdp5zcu0n6k',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 23:52:23',
                executionMonitoringStartAt: '2020-07-29 02:29:30',
                executionMonitoringEndAt: '2020-07-29 05:21:00',
                flowHash: 'rv57lj9zm7hcb6mjt9w6ec3de3bv3pilzibtx1kd',
                flowParty: '3qwt9837iow6vvjs7zu4jxxewx2dijdlujkryzxk8m19tt6ma9tonvqlgis4osu9zhbl8w2wfyqi298hbrizf5s2i2pi6c7k4ziuaotytconj1eo3td1ddoc52iqqkgqc0ixk0ft1mgx43yz75gcc1omw6hwq64w',
                flowComponent: 'hmnkch8ztcsg5rd167jwbqnlwiwku9qgfxe21cdzuvlplpy4241x3qsjx2g9sasr2c07mi05hpaub0iybzstu34cw8hvtllgkvba6ih2h8qqpyukx6c78gjyfg22cykjwkc4yaovi4d5yd3a63utj2tzeuk6kw1w',
                flowInterfaceName: 'rhdb2in78bvqh8butylufwv96sblee9gv1jhqsvn4f7ulorw9yglrlplq3zl651rm13hai4wkkiznim4tt4k1hs6b90rchm79zu0fh4awpsqo3uj2xkgyo65r58egmevecucvnj2403uwh76rfktjptnh1kr0muz',
                flowInterfaceNamespace: '968ksqjqidb9xp6uehk49ttb90oac3q80clncqix9fl0o97jk2studxtyblsbi1axla7vrn43u1t4uzybv09uyo9lfyawdk7if7ttwiwt41kk48j3wbt36u0t4ukjjp2ho3dc5pbswfavanhh1qboe3ip61hy4yk',
                status: 'WAITING',
                detail: 'Aut perspiciatis non magnam accusamus dolorem quia porro. Ad ducimus maxime. Quae et aut totam hic qui quae et perferendis quia.',
                example: 'lwbzo6mnkze2h8zj80uqjnnk8wuf84iz3akpb28z34d4yrvns57a077e6vrxe5cwpwuuh5fjxli3360sqxmi8nuv5ks9qpy8m7vz4zwue0eq9lan865yv18jbip06khh6uhrg9y1ugpsa9sflpsra2yl4gtq9xjp',
                startTimeAt: '2020-07-28 20:28:34',
                direction: 'OUTBOUND',
                errorCategory: '5ndd5o6nj6aqtjzpz40so63uul5esqycg6czi5rprrxyb1jyppxcpvzx8u3okwxzmm26vuslpyrqhras600u4domhjf1w53ggzk91yz0pxj9e9sn3g0hozafe3a44f4pcw13ide63qktg0c6hoizhzr07skwjc61',
                errorCode: 'zaduec08py1o4ro5mxrcp4af4xgrwssmwwz5fuznfxedxhfhgry',
                errorLabel: 888800,
                node: 8382910766,
                protocol: 'h1mxyyw46xwaz9oes44w',
                qualityOfService: '7rrsk8aiilhitv0zw89q',
                receiverParty: 't8xm7ylha7xf70m03twwpf9za1myf2l99dtyeuy7dvdjxdijw78qdczw57zmhi8u6kfep7tvaw0ovf2135sp4a2lo4ywcghxkccthihvlwkfb7vpixpp5nr8m6xw6w1lajvhhhxj6vfyuj6279ks1xuth5gimocn',
                receiverComponent: 'kb7ivot2vjq4vn973a17sl9jytdis71n5awtnfqtfpv4mxfcd00ouiu7fc2zm413rspm0336x5dhhju0nm2ubms3rk6ucnwxrwjy7vhb04e6xlxatzq3smpnz8za6ru0jq5gv0b9zzftjildp8sbzgmd7ufqnps0',
                receiverInterface: 'uqeuiqd3tuue0ycp8xexy4tetf1y8x6hreygjcn2arxt43wxmi61mobvkgb480nx9pkmxcrxn940tofym5uidbye1l941rxye5575jrif2hnlqdyixmheju3qu6ml7jbyts3sjais8b9hpuobnfd5bb8jzk71pqw',
                receiverInterfaceNamespace: 'co8118tx1eqxu7jiahno2t92mr55toahcyoa3tjsg41i7tkeetnocm6wd4nik8x58bcs7okgyamzx5wiwkjqke8es4su43ilft714psnqpsde1h20o6yxc40s1nzonxliwnabh2buadp07s29mj00i6u3s9t1kun',
                retries: 5948433959,
                size: 6391056420,
                timesFailed: 7791494664,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailErrorLabel is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: 'cjauaan3rcfactnufx24bg4mb2908p85lawizu1muu0jj0ppkk',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: '19rdnzcyrjbp0em81ze5',
                scenario: 'wb0g4knnol2tlrjdt8qo38ow1qm424o0thgn04nho3k4e1g2p9tvrjxl2ixe',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 01:03:40',
                executionMonitoringStartAt: '2020-07-29 00:25:23',
                executionMonitoringEndAt: '2020-07-28 16:01:10',
                flowHash: 'fkvu0wgro1lu4mmpgxjq374ws10ytfhf4n0yvgk8',
                flowParty: '11a80lm0asdgn8x81u6dofyrncp6x16tfpchaapilgya5ellyrezvlxbj8ur4c5wt2w13owsb8c5t20xukn76pj7zwtjgf4g1gip45std1qu1gs8obqebw2lqyl3g3ntvi4cfaktvcyaslywiluwdysrona098lz',
                flowComponent: '66ejy3osv0tr0pw9wkxdnngpbb2ilawivkielsz9p24nvtfom3kt19eu23omfivt879h0n1dikrckth8frttgfsg5iptem9esr1df31zmw8gqnxn7lk48ui90dvlkxu43mlg5adynjbmfkyw8at58sd0oanpfjvy',
                flowInterfaceName: 'oozrjktjsrs2dd34n7x58s5wlne2h4pnadtlki03wafaaobctf1cr4rsad8gtp5a0ysqvxswxs06gqbhhu5nvonrsq71wx356ifcf6898o6li3h7y9bdw8zru00jnfztsh3n2hl63mhk16e1tavmpe643m8le5sg',
                flowInterfaceNamespace: '1lk2bjqwhwn1aiaq4fkuon29bbewd46uh0m8vh39wf1ck1hny9qr6jargmmzhoyleuj8j172esma6gomuj1ixlmicwoptx26z4uitho8vibn2p6mkm81zr8n1y3tw8llkmn0zlu1epymp2oikztrvdnspxr03tvx',
                status: 'HOLDING',
                detail: 'Voluptas porro necessitatibus ab id maiores aut maiores enim. Nostrum qui sint impedit incidunt voluptatem distinctio rerum. Hic expedita porro dolores. Saepe aut voluptatum quaerat provident in ipsam. Laudantium optio enim sit nesciunt nesciunt quod. Ut beatae corporis est quidem minus non inventore asperiores.',
                example: '0v8fj3kqh6rlpd8m77erofri5d07h1ur52duvfi4hrj3upsrgunvxpopfsjzfe5p76gic4jfhvmkfcjhyfeg0vntjrf7gdz2qnzulk6tdishfnrmje2hclw6mfqdxn5jm5zue60n0wokra2p8cumkw5gue5cl7je',
                startTimeAt: '2020-07-28 20:58:35',
                direction: 'OUTBOUND',
                errorCategory: 'wrz3hzj69ddyyk7kiajr3qvcr7gid0bp9wt6g3pcuiyp85vryzrooylytu2j6six0lq8wa7c72ojq6od8gaj0m54j440gozhlg3zvciht2y57o2r6nlnevhm6vv5s8cjntsqovc00rn6qbobdr3nat3hlnygf6kl',
                errorCode: 'tuq7rn3b9kmwng4146ul8cmr64k3w2prtfmdtdps1la9kw8q5w',
                errorLabel: 7369847,
                node: 6861371744,
                protocol: 'i8243yr3w832jajcyrr8',
                qualityOfService: 'wprwzbczwicfdf3qhj4y',
                receiverParty: 'ztq6239srud165u5i3zztum5bdouvz6lzmn2ips96ffpevfyenei3juam306rfisreanbsq75oxxtg3o70dtm89yyualzi649soyeuaqdxn5yx92ia4tmsy449v87d73ep5ve5vn93ai2ze5lcc24bm1scxcv0rn',
                receiverComponent: 'y6pa1klrl3j6ma4rt8q7t0peazdtt9o90wwpnji2a6s8os4k74xh5wn0r8rt4i14yrlut9d7gqqqf6snmoohsccmjstchuphg5ivm7p2yt2ldypoqlesavpa0xvdlblcfdvb4tt7c1nto44g95lsvcaeng8ty7kf',
                receiverInterface: '5dgn51c8ttomgxyjsztr5wfh9qzmnztj95auhxq1ovp0m3wt62hebd8fw0lzc99lkwggca8rboctpdryit5ex9wpopkdy6g74npj4bvmcwe8jiby1ko4nx1h36p0iep1fwyoo8s76er0ieou303uzwim6l7lkq53',
                receiverInterfaceNamespace: 'hnw3m2ibg0nkioc4wb3ay1u6sjtv774t4eo349i7894wz06om6crua9z4j09c9pwle7lsit9w1haqjcqr3dclj1bp4y3ey2b7jyt6gzbxxfqlc7ztchip0yec7dtwjciyisxr7kahujt8v5yhhp0hn9zgj4k3l1t',
                retries: 8137871934,
                size: 1562497193,
                timesFailed: 6495509757,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorLabel is too large, has a maximum length of 6');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailNode is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: '8f1151y3txivgiqpj1y8n5yazev07598sbsbqw7jrfrdxreahj',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: 'qysnarm5ym7glc14dvvb',
                scenario: 'zo260fiqezi61avt22j9d3viksbsa9n070f8c5az6bt14eljm70w5s57td70',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 20:16:57',
                executionMonitoringStartAt: '2020-07-29 12:58:23',
                executionMonitoringEndAt: '2020-07-28 17:02:48',
                flowHash: '9ls3m8uuwrd9xc0m8h1oziy50pnt537tnkzqe84g',
                flowParty: 'ofb6be69sa5843gwdhl9j77vt8ypx5hozwbibd3wot7p27hf4zt739bo5mkgak5gfjkfq4vze4cb58wsf0pzxrvu7bhngnwuwy8ie8jwanyfd6rsl9vnsc49oe3q9dxcwksln2bqxi1oammr5py13mtrp8r9776l',
                flowComponent: '3d8gqf88bxricy9gd2m9mqd5piin3l7f5itjdcwkc1tm0allb5uy8ihgud0yp8d4njd27mcq551t8axvx7632uc9lpk6d7vddyrwlwim2fzs0nighiw5l9slbd2ciy5v6fnio9l48nnpw2qu4ole353u5rv26ynq',
                flowInterfaceName: 'ag7g6d68mhrgoetzdmrk7m7br43dqkcu9fioanxxva95952ir9o0t4oczmn1523w3ij3yfls1u3qeeicscoc1ipcqbt4wy7i4f9md3vh9xxl3uebb9ek14fwohbc12vjrsax36p6e0453rcm6hf5e6q21jxcnqgb',
                flowInterfaceNamespace: 'uegowi0yvm328hkxgp16fxjfayyur5igowvj7ufmfawr8wjqknngqfmuhvgvoyfjhz44vgf8nr8qpp28inr7yoezh86rmr8paryyl6pj0vvfxu6s3oiqg9kt7ue212584o3kcr3zxb50ci2ee0n5t7mroa7oembk',
                status: 'CANCELLED',
                detail: 'Debitis eos ut est voluptatem quod. Eum quia vel explicabo nesciunt est est. Aut qui cumque vel distinctio perferendis molestiae illum ipsa nisi. Sed et molestiae sapiente doloremque voluptatem eum. Dolorem sit non. Dolorem repellat deleniti ullam ducimus.',
                example: 'ow5rhjfath3bi5ak3vecpp3bx403ib33e6zykr49yop6q7pohrcr16663z5gzknpe2g7g3q8oshbc2ncj1uwifshfkz3cscme29696rqkfbvivtbr2uisplselu11m391ejbc7am4oh8idizd4yxlzqawqnn0k5g',
                startTimeAt: '2020-07-29 03:19:03',
                direction: 'INBOUND',
                errorCategory: 'am4yotit0t5pxbj6xj24n7cbru2rx5wwiyrzl103b4qrvq1625z62qll9m50lp6ja8jsm5fm2jbg2cezxxr5rm4ohzip4out22agndou3ambj5nhy0ujev6jqrb1b5xlwr3zddlr3s4i7xbrh8jcv0poyoi72r4k',
                errorCode: 'qckwvbgqkqo9z8aqh42k7fi2lvuuly6cpr8wksubtst5qdq5xh',
                errorLabel: 446707,
                node: 55954476807,
                protocol: '3s9zhuutvx9e4mkm0b5k',
                qualityOfService: '7ulpx19n2ycal2bifo7h',
                receiverParty: 'ykfzkq2w2n9jp4czw4ij870quw1saa6lyt5crku7kfipmfb2598hooy104v84hap76y0apne7i4rtbffa8gf6qkpdo8n8zaxo08emrhe8et7pwz5syp9f463cu9cmicuimsh6gzfeudn4j7h0betkel1251uu2uu',
                receiverComponent: '1up3pwanwu4drikka4vb5ui01f5j4a6vz8l153uonpdrc05lw32m25knl5m35igvn9s2nnoh844ji4961u67s4ki12ch7be6ya6hwtvtl9ju4p1ytl3uaws394xs7heuzgf2pro271fusc3536uxueojffoafoy1',
                receiverInterface: '80uwzyxzp8pq3w6qgkha8r2kxl0sponazzf61oqr949v2gp55y8oykm3z42a8xk7j8emi249s3ywk65cz1t79cs9cfzbthycqz4lbjgl0gpy1w254zyqmdmm4wktlevs7vdw9aoasc00qddc2fcx2kohxukjybm0',
                receiverInterfaceNamespace: 'ji907yq42eei7fv5aob8u0rrqzzeo1qxqtrd6vbghgop4rtvmowbjvz20k0r8qitlu4d22dpyf0zvuqr5o1a208787wt4dl6dllekmqkxaqv4d31rg1xz29hnoz2ni23vya2zw21qkl06rof0k2l7sxyoscl6xx9',
                retries: 2899766627,
                size: 1735675887,
                timesFailed: 2480153479,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailNode is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailProtocol is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: 'yit786j72kynr6gf9mb8767z8cbjsy97mqqdjudxvic2ndt0uc',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: '1pu4srb7p0ok77m92q0o',
                scenario: '532bq6gd4f3yswa58ew6s4igpwe79uipxrbljfe61q3x3trodyxi1mrpznmr',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 15:10:09',
                executionMonitoringStartAt: '2020-07-29 09:56:42',
                executionMonitoringEndAt: '2020-07-28 17:02:08',
                flowHash: 'ro89gq04su92f7iwzmea5p9ytmp4d3d0awjywi9q',
                flowParty: '4td5puvbb08ep6t2tzqx3g14arix18z4mcavcht9xdmekxabvrvfqot6pkafm5cyk5208h0tg85gvlrfy00xfwrqa321x7lcj9jotes6k5rv13kk1hrgs7meun9sp04b3w8i435egvvhzfys4a1dxqe3vfehp3xo',
                flowComponent: '8lk93cln8avv4546whf28fpsj32ncou2hx8wi8z401oy6ngu2r32e7urz7f29fhckq4f2x0o4jqyvbptz02lu4dsh616xjpw35ntpsxon0ev86fjuivru127l7x9gdee19f16p1oikyxg3pfycvm6en3saps25tx',
                flowInterfaceName: 'zqu8vk46ovk93k8t4sqjshjqdd2opn8sqatmnhlm7haz8dv4nn4i4ctvzecb07j3dzt7q50dm2ieq2w6q142gixro79uqfo0vp1jpn6es6ctwzoljdp2nt0jwunotbrq54z41jwqod0ofezq0a29ceu3ap6l0g2l',
                flowInterfaceNamespace: 'zatwviy18sibhxvyrh0pj0w645whrmjz7l9wezz68q6bskt0iksjibrvizm3nv49v99wfgmt5b7a3r0b2ie1wybp2paunb486ati3wjb9p98z2ltl0tb5qdkwd6i9dhvc0fqdpr6dnjo1m09qcjepw0khpak91r5',
                status: 'ERROR',
                detail: 'Et quidem voluptatum repellat molestias. Id doloribus magni ullam. Possimus vero et minima quia dolorem et distinctio. Libero a quia.',
                example: '90xes46ufu8mdpy5jem3ao9eclsbnb8gwgmk7n9s9s8u8vw6p2xfus3ob53mc70uc4dttg0dcenj8kg0dbfihblqyx2tald62kstrzr7mu40fz5oo88hm8qtvehi1vnk5spr1b0akjp17dn34lsriifi1kksqnj6',
                startTimeAt: '2020-07-29 02:32:14',
                direction: 'INBOUND',
                errorCategory: 'g74xai90myhppb2cgunv8vyl9nk42c74s9180fjgx5bdlugbskmealgd9qvjjxebvif8l6g7sbqpw6nu5u1wtg5ahru7n1mdhqnzx2bv1ug0nsoqdt6s6bicepyyaki7hcear3b6rmd0ug3hqzf64ch0qk94j7mt',
                errorCode: 'lt4m32y9p9bfrgxo1umrebkt5f8pug41u1bm5739kt2ebee0ut',
                errorLabel: 524742,
                node: 8799077640,
                protocol: 'pajwrl08z92kdcvdr8ctr',
                qualityOfService: 'ouyqjkkewwqkwh7oe5ka',
                receiverParty: 'uc5zisqmyzq6f1ir4j1qd9igm3an0flqkjqjcuhswiuqxv3xlgdsrzjdd52o83fm4qvl7rthfotc8u8p4kq8vb70nfrrva421zz8upitxu7xgk67qr4czw373lsslds0x4jw4jz2g5ko98bpit2ve880bqgdxexm',
                receiverComponent: 'urik7l56dxcujdmyxcxge883xaqmioqnljd3lg6y1qn2hr27mkqsp5oksuba0821oe6zt59yo9vluxl3pqagfk0ozssfkoinbqlh6fvaovg4c7vecw0evw6s5eibq56057296yqeqb3256l71zzr53o0tzdgzyab',
                receiverInterface: 'cx6c40ika9jp8trd4ywoe5s2omptwd880018q5q4wi4y10d2xzzpmktkx6grsqpeoanqe3blr2mkk8zda7z4pa2mz7biflhh9dkeik54lugtv0bmfrtfns04d3mkeg4tgyb2an8x79b2hf6imfiya1741opupmk4',
                receiverInterfaceNamespace: '6iy3zv08uioj39suy1f3l2pg25j3zzx0k2ih0v4rhp08lied7h3lh2itcslsck80ujdaadykel90t0ne8d4sdq46yrgfubzh7hd6ji2cv2ihrarsu0k9n2i6tb9sdr8pu8y0zz60asvtvn1s7j4693y9nbcagek8',
                retries: 2366878943,
                size: 2418790749,
                timesFailed: 5623077507,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailProtocol is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailQualityOfService is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: 'thzr0cazuuh7kycgrzvjo7y9iay1vin5334xp97vpc08v57rr2',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: '3yxplo4s89q6m6znyi2z',
                scenario: 'mu9zvtvztoeqlij9312rxhyr1czl3reoofk9errot6sl0bev26sxx9ui7pxh',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 14:49:48',
                executionMonitoringStartAt: '2020-07-28 15:31:14',
                executionMonitoringEndAt: '2020-07-28 14:04:14',
                flowHash: 'xqa2yejzyytlesx61c2dnk8qsd0bzaquoogpa8uc',
                flowParty: 'n4lwzfegezzux2vvwcsfmdf8udquxs7teldlhvngd15zabee72rtgqe66hlduahkn8r5tpqjdk2grk32qum5h2j4w9i0ra138fjga1mtcbmya3iad8xcrz03qu8ccn2zwj3f3b3xoitypl2nz0jehrzrcfseds5z',
                flowComponent: 'hvmj6x4rneei79cmd6no61xcde8t53ejz96mabwynvd9790me8jyrrc2wg45f2qbqhwcimhnyvzl9odh5lcltd9qalong0m7w8s5lswignuz3utzwb57mlhcfn3w6jb5n1xg62d1epwfavijewc6to1rbqsamuo2',
                flowInterfaceName: 'p0ki7voqitadgsye6iv357l23wrwew9e9z39c0dbl9ymopgssir33itad7hqophjxf9qk1bpim27w80lmx6ltl0uy5gw4sxi7pr9r5g2rjlexfnrhnna0davwrlpt6cjit857j99wd4jguyxdjshe3gdj3ugcwn8',
                flowInterfaceNamespace: 'iofrr1a4xy1xued9rplxe36h5k1jyb3deqxf54gn6f09vzezbftv4cpubezdr5a0k3dylidwi90x5wusc1ohn9f13ye3q054e7c5ggagtf1p06fjehnyrgph4llgx2mosmvkcecoawlxexl86iq8nkg4c2j523vt',
                status: 'HOLDING',
                detail: 'Eos dicta incidunt a molestias magni numquam modi. Mollitia ad quia dicta. Velit alias aut officiis voluptas ut et necessitatibus molestiae. Temporibus facere neque velit vero et vitae temporibus ducimus sed. Sunt quibusdam aut molestias amet id quos iste alias. Neque ut illum et laboriosam.',
                example: 'yqonicvtzrityphhq4k77qo383xcvp9pej9vvouy33zd129urpr9z7jl1vusrhkpwhzx4474e6ewjpqup5v4snpm2sgbmyruujyj47q13oqzn4yhnmjtieci16jhsiw5tk62au2c5ocv0l4b15yprac0ao1gdxwu',
                startTimeAt: '2020-07-29 05:06:47',
                direction: 'INBOUND',
                errorCategory: 'qivhbb9mgq6z4a9j5lxyvw15ha9hun0kjacyyyy7wvajh8z6sdlulit3f86vlkeq67g03u62wb9e37qg1hvh3cer3fqn8xti4jsslf22qx6f5qltqur557thydvq490ehassp1tbz6rq6ra1lfegp2dh3468l6cd',
                errorCode: 'eygswtuog5x8pzge5m3bi37tl2xfx2uvxzzqg0nnne0zofkvac',
                errorLabel: 429702,
                node: 9937852738,
                protocol: 'mzwfk3j1r21kabcmyyk0',
                qualityOfService: '1pbjh68coxmabned4h62c',
                receiverParty: 'j9xmvr1i2k7jnwqja3gxs9aztc9xsdusvrqvh2ejv2g8u7pgcv1k2gs9l0rtu21mitd5w1gy0sveybz1zlm4a19pyxnj7oigkiyfxzdr5ii4btnu9g67c1jzt5ye1xfq56uce2bckagf3yh1rdly83z56yy4zaao',
                receiverComponent: '3cskvba7so619irbv4qwv1l04hmwzup03fcdyypdi13lfwlagznmaww9u9iip23k3nyeyyfbno60roqgnyols9re7291mt7us708c7smlqc4thoj4wvsb6weh6gy6pbzxw4wyc2kauylbifupvdsl3d9vgmud6s6',
                receiverInterface: 'ykvmec292rp7ign33f5byasf80nezq4ifzlv85l6tw63phzka9ma3uftsqipwvughnt0bzj8kcs4hw1td1vkzto80png9y58u1hmhaa0xj2yz0o8tbzrkchq6fw789ykiyfzz1tzi331ru51ph63ifrclut34eal',
                receiverInterfaceNamespace: 'eq99j4qni6s9e1zbjg7o54acyhtlyeqyf5gpu0zguu4fniuf1r7gby3woe9zed0qgdo6nlyppf7ffqscl0rp1ulu4g9fiwmm3qmzi7nzxubyswnz63nna69zr6t7tyttd8rr1wo0br3ob4vv18zukzx6xn72ms1z',
                retries: 9199891999,
                size: 7564822090,
                timesFailed: 7016072480,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailQualityOfService is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailReceiverParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: 'ls2505cmeuh00ry3sifcydsvvjx3xezk2eiwin0s9f9dy0dn0n',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: '1ctl6q0iby9nyfxfk5vq',
                scenario: 'il9uvnrgkztwsqcj2a4y7j78xq9a7hxulrc30dvutc9bklneiqby6h78nvut',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 17:10:26',
                executionMonitoringStartAt: '2020-07-29 08:45:55',
                executionMonitoringEndAt: '2020-07-28 18:24:25',
                flowHash: 'm55o47uxi7kwfgszoquii88nq4t5nhlm6s676wq1',
                flowParty: '80icvr10s7sznmz9ncckzdvbhh8u706mi44kxi7ow7ss55w5eqver3n4in7xhqupqauaw0yoxqkelxidfhdkubr1yrj9hvhvqd571ewe3pak4gdlj24viw27trxdrjxlqkhy0ol45xr4sqc37at5cwncws3ndn1c',
                flowComponent: 'olovehuki3k743e3ub41im7b12mnah9xzh8u8awo7xfh3i47inma6nze7xu8m2z7v7rkknw143cabrlf3tjdz1mzalcokdlanapyzfx66fw7hzrlzxmjs7ncmrdoet8e6fi24f2l0d3wft9eqaalrmh7be6cnszb',
                flowInterfaceName: 'xn9ll1bf4vrq1endoxao3e23wnb5g5khdo6wlbrnvfe53t18138xq4qf2kbltczyqdbv19zxwzu9q5lv6zzftsl7uqsn5qrm9np8os0coqd6hm9oj0wtshof2qk38en4uizu3az90wciyy4irhfmtc074qlpu5be',
                flowInterfaceNamespace: 'mu0yq9vnyxd11959wxepygg4z91d9r7fyf0v2wnqrwz27n13k40t87ekb31sqnv8ll3ez07pay8ln9x1lku8xfyyxb2fgdxuqddno0fcabtgjv4pttow3q7auricoepj4yxgll2i6dq63gtrszkwxi6i1wikwshw',
                status: 'WAITING',
                detail: 'Quae quibusdam nihil aut aperiam. Vitae libero quidem. Nam officia omnis dicta ab in animi sit vel.',
                example: 'j89e5g6ii7xevlvtyu4tw0dj65a7qv7g6osvwd2mbjwhrwqb60rvdhyvkkckj1ks9c6ygzbspy2gkpeir5m8h12zi9drn69qertadhfznssittrm6kfirq5a0prb3shmuug7aekdrqoind98eay5i36px1h3ev0l',
                startTimeAt: '2020-07-28 23:10:19',
                direction: 'OUTBOUND',
                errorCategory: 'lzhyp3svpxk4jw1iv67s2nu357fwnbgoqb3rfjo5xooy6l7s40a8ldbzmgem44zjf8fk4gg5qsn85aosyzdhp8w8yy4clvkiyheecobhdg391j8gfdx8gfw5ndqvyfapqdunjpy0a00mha1qni23roij311hi4w8',
                errorCode: 'ji677nwg6gz83gkx3k97sgb6q66qm2jlqtsn81viydtcv0rmkk',
                errorLabel: 639111,
                node: 3494536628,
                protocol: '7wf35egjk5kw71eebzzy',
                qualityOfService: 'vw3mqtbc057vfa01nci7',
                receiverParty: 'saxtuoxa5dqt9wzp6bs9f21d8sgvvwm5taymz6m2yf9jsvqyg7gnuu31jego3dlewewakj9kc6on0d2lc1yvfxsf2e9tpfwsup2yjw1f33ywwciw0nzpxv486yivqjukexre9s8o2n4ux7d1ivww2xa6cy273t5uk',
                receiverComponent: 'c3kzoh220wjzyf59ccagvv4aa5w2gdq3j9bhh9hht8ogqtp7cu2sxv23n9rol2v8kn5n59skwpbqlamge6l8hljdqpthpogaoxgb2qbkw86qxq7hizqewu1bnp1l82z7ph18k6xm0kpgzhvwojlamgn4csooyjq2',
                receiverInterface: 'uuye2kkzv3l0bj605agmjrls41whl6xtrhkzix5t31wnkkmyazi0esnoh79ip9q1bbr3ykjp6pvatntss31pqi6d587dqednb9y3n19wdpomamxhx1bgbsqphzzrl7r9wy9pq0kdea5b74yh6xr1a9fpqxgqyzs5',
                receiverInterfaceNamespace: 'pj5489i3act8yfmbl78eft01qbh77t0f9gyciyfwnxkhq5o5rs2u5krsrq5f06nenz2jog6554whydhfrdg3n29l0oir2bbve8hj798ra5cd0ovs1w02d36859hkgevms1i38eqcjmd63mwl7gircd6u0l3cndn7',
                retries: 4425683821,
                size: 9723805291,
                timesFailed: 4752558419,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailReceiverComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: 'kb7vvldgscu6703vim3oc1t79u7jbf8oe8k8dadbz80htc79g9',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: 'wrneqtztw88n2nepuby4',
                scenario: 'rgxznzf86k06ajw310ah88xvkxs2rzd6i49m48wau938imvu54wcd8q3wxvw',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 05:22:40',
                executionMonitoringStartAt: '2020-07-29 09:23:34',
                executionMonitoringEndAt: '2020-07-29 08:15:31',
                flowHash: 'iekelgtsck6hh6ae8akl7kgwjr4l8az00lv66cd4',
                flowParty: '32crhh6g9n52td449quc60v2nmiwfvoofa53zt2zpiae2cugrbly6pb0c5y275sdlp590twndrkxz54pn8vsrmsxum3ciloiz3ny4at7aff5ic7m5gq6bm8h35036jlc7gfqsy6d8ohqq92hgdgwkvbjux94eanm',
                flowComponent: '3cn15b71l89z33ealvo8fzham6q653btxsog353yoj4mhnz2cklqlw8ozbsr0c287ou0bvhiybjbtco3ha828uttqqrvxi6ml8gcg4qoz3sf2fwoohk22rv4ccpxusmmvv25vw7rgsxtxqoxsz3wg41ithnl9jol',
                flowInterfaceName: 'nn6q23j1bnzxtvg25t3cofm3yenmhybappef2shq1m36tbq4ngdjwv6s7dm2nrtqcspxtmqo9tir8ayhpc79hwvtel5d09ifnr324y7bn2z1ztg42qci3dlgkz1slklgu53jovvjlcfc5xf9tmbde0j742zdhi9q',
                flowInterfaceNamespace: 'c1ebg9tb1agfys6z88j4zt8o3p42lgibnwrp087uh4xurtkz7ecqucg1tzjdq8eci4nbv2nwyjo4vh368x8kf0yti45jugxtrywv4k2klmp170tf9bsdpf0sjn6tfo3jja1i1hizxwu0e1lm0m311d0qgtcwxuyo',
                status: 'TO_BE_DELIVERED',
                detail: 'Molestias impedit ut odit minima voluptas. Voluptatum corporis odit. Possimus maiores possimus quam. Qui repudiandae repellendus temporibus quos qui molestiae saepe voluptatem. Ab repellendus est sint quam. Dolor debitis quia adipisci deserunt sint.',
                example: 'e0vve9wl9yzt4g1vv7t81w5w17oa0nvqov3g257llmtawlnru8nfn5gxbuq3fuwzi2rudfm76pu9oq1fu4ot5elpsjzy3f9iyyx2si80yb1aiee5mwjd742jkhllx7ueaxojol499btlfmrx4m8i6f9r9x6yt8ki',
                startTimeAt: '2020-07-28 19:53:32',
                direction: 'INBOUND',
                errorCategory: 'sneikz88gfshdilak6oudr3bip52yz7cfk7vm74uaa5g6g2w8dchfrvjuqrg4itjcb1b8tzaqxebf9yhhtdu2hm5povv8j90ff64ks55grcwqzu2dckbwlodhak769m1xo8scw71k15p9arqem3a1y4x0lwobg3b',
                errorCode: 'o2phfonwrs4g9bq6lgyleitl0nzc17v3ef7stvprpvhg9kkrie',
                errorLabel: 902891,
                node: 4682524016,
                protocol: 'bkg31jvn7ozqsqzv49sz',
                qualityOfService: 'ohtb67wer3rjd2bg5ke6',
                receiverParty: 'gzl18ujjasmql711evx8zdgtarb90379tc9vww7iqgrlclx9pvibxg8vf2fodvk7fe95xjhmxl7bk30vpylvl0mhya8z7w309i5p4z7cxcl6wxxozghrs4xu7p8pwcoggj07lqhn5vz8edjhoff0w6cklcqw6tf7',
                receiverComponent: 'jp7tfcn4kv6vu8og6k3pzwq9yhm22w412uxdn3y7cp9jyf3l4jhrqmwtf4srfnqnpzpepkhhknn6s95h8y1lhldhnfnnik0s5b6lhpv7t05hmoscpec8394obf6kovy8j5jsvwbrdxdoje5qvc6ty7kfbryiz332p',
                receiverInterface: 'f971x84kppumnicqc3hh3ora81hmp9n0kfwes8vvd4aqhdubx4jcuk4isigvn2l20yr2lid4wgk3unpcna4ugtq0x4tq30p9jsgz1f32w3a6jxd7g3xpr6d18aube1lch40h3pkf5ipqr4uvra2ktnseqxa0rlyx',
                receiverInterfaceNamespace: 'jc84yetsl1gt0ghur766hqwqkccsu9rmwx8u7h4nxakvxd9t7gtb92pqlmgprpf92z6ch6cldfmq9k0nycekvtpptr22x6wbwpzup3321jyyaw1n8sl07sooe51eq5c63dhm4bjjt2mr2ffb39dhdubu5w9d9vys',
                retries: 7558532346,
                size: 7920823550,
                timesFailed: 1960955447,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailReceiverInterface is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: '57mm3it074r09ptpk80xmmz5t1flgw8nhy5qj0t39c0fcvfjzl',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: '7iiux12n2kxutnn2xb3y',
                scenario: 'n1hwz8k3lkkjqu3hismu4jnv5aqxx2h15ojetbx1v5unuy7253hmlrc9bh2n',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:30:00',
                executionMonitoringStartAt: '2020-07-29 06:56:00',
                executionMonitoringEndAt: '2020-07-29 05:11:48',
                flowHash: 'sq58pghde7uw8e59lsv0o4inhpx3xnm4i1q540zt',
                flowParty: 'xvbrrox7zs1jufkov0omcdwqk17lijzzpg45mfslgwxkei6ihm7qxttsgxewwgi95gr00vsxoqjre1p687hmna2v3o8117o519z1qhgjeydof4rgyrhlje7ysxfbfjurrrvocjejbqe7u19l7ivtt4enbshkpxym',
                flowComponent: '065n952ltzb6nd540208xhrhwus08outxmleiikt9fhcgxxcwh5kheqd5b0oyla7k7aib0g0hwc9rfyycjqrpz6d2lyl4rr8w7fimgayf2auit3y9qicij1zw79schzu92btxcnq4ml5w3eg0ybmw4mefc191k9s',
                flowInterfaceName: 'xvnn2exwnyhvrad1mqcnf8sm30lswtj1b6ab8w8bgn6aawhrxtug3jbricrrkskelphr3crwtp6n1s4zpga86tdnd02rmkpjinsik85ezkr9vilbw9k5w5tiy6fknb3hnnc9gk8k2tc7qxnjxb09wh0xll2oro0c',
                flowInterfaceNamespace: '22v0wncrcqg8upf9ddfqpkexvds2jkmikooec4upiq1c1k0qet8ne5ficrqc5y5vchiqfejqlvo3gw1rtnai2zua6d3bagbeiyplfse0jdh3zlp16djvt47e1wees6efimvo86gpstfbcfb9z8m3g68s9y41jtyp',
                status: 'SUCCESS',
                detail: 'Eum qui iure. Libero dolor adipisci ut rem quia itaque quas esse voluptas. Enim sed totam facilis quia placeat soluta est dolores. Vero tenetur tempora. Fugiat hic pariatur animi est iusto ea eum. Ab est vel similique deserunt repellat saepe rem quod.',
                example: 'bpjuvots7ixuw325awqev71wbqzvyz4a9cpz0qyl1mf5116j2apteo2vjjd48sc0g2t053h8gzve21x4x0sybl9s6wvsbfbq7ad9abnwbwel0tbkg3usvh5q283t11lkruwwmupbldupzwrejlhq11gebeuwx7y5',
                startTimeAt: '2020-07-29 05:28:09',
                direction: 'INBOUND',
                errorCategory: 'ormesjirjtb3hmxmjsi0oozqnnrjd8le4ygw92xkjwb9ib2k202d9i3qrnunmnk95nr4jnx6tb07mmnuwp2nr2384pihdsfj8h8jxms1rp2x35u6s6qx6r0vfcv3q93sw7mgsgeob28t5ifvmjy6mxlj7k7y6u1i',
                errorCode: 'qdjbwyr9r1oixkzefj2puxe6w3ydhbc2smfjhj4g57d6vn74c9',
                errorLabel: 823587,
                node: 8068104347,
                protocol: '6fe14rhnpzgqczqjcqde',
                qualityOfService: 'iigdziqu5r3jmjhxsevu',
                receiverParty: 'cj60c7c4vbucur80k6zu8d1ejqy9ru2st7783x3tx32xli4bflcxnex0z4tdmkcdi9kryts6pos5ksy5e95d3ffltqpapnziwgbnv7jkyrsto58h90btqquzlec76uatt0c0j2uwy9qb1jolasnav6bwptgg51vd',
                receiverComponent: 'tufba42kfl50y7w03gj840r5fmrku4x9tdx2zqpbepj8rrqw47cs2rpvnw3g6o7aw23iywupyheam9h8k2vfd2q97byl74ypimh2jonebpwt0vhsqwqjhpm57zmvc2noiqj9rkn4d2pev6y6dl2dka263p52s0xb',
                receiverInterface: 'p91gvip2t7go8xyra8cdgo2oah89c8myfh9cadoswo48c1dufhgiqq496fnr3ya1v9u7mld7qxzyt2dhsme8gk9m6oq583mwypwh5h8dp2ih39agf8kzbxyz9k4x0m86pbhsdckvrjihxp7jhj8whmnmlvbc9iwve',
                receiverInterfaceNamespace: 'ew8flm2wbe452el94pq7r5k4ku61lwrk9qob9j2ree9sh9nv4e5yxd9inhkaq9cdsux1txfxyzpyk7hdgrt6ep6kan2qy6d4ow371x7rck5qmmuzcy1r11w62431fk804vgn5ihyog3o4zpgdxz91fho2fv9ocx8',
                retries: 2050691114,
                size: 5835528645,
                timesFailed: 8679000585,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverInterface is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailReceiverInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: '1kdkar1ejiacehfg887w5gbktkd40wii4lwz7dfasjxhtz9p50',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: '5gh6p7qwcrhjui11bat6',
                scenario: '579f0kb8rw1cm9xi5m4y1ya41hvur8zvafzf9b38nyoyx47m1tfqpnfuvv8s',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 10:48:56',
                executionMonitoringStartAt: '2020-07-29 04:39:38',
                executionMonitoringEndAt: '2020-07-28 15:24:23',
                flowHash: 'vxmlo4qvsdeoyqr872bnbhywtaw3h9h7dza6gdmr',
                flowParty: 'jiap5bmhkyu58d8ju1krk98mw1vottrqw51y8grrn7k6a4yzp82ng2vf88q8cge5t9k0z5nkid28vfe57ziwfte6v4cigr6f9fokeo1zv21y0nww5h3nv6oa74qezww2w1msbxurazfq88tbyuz420tjkltxsoub',
                flowComponent: '6ibgijb9kfc5lsp9s16bgxci1k983n31rfv86wiv7iz5vkw48v1x4bjrp0on9p55p4p8yj7n5rrfa341nhvobqa57vhhcx96x484yn3flyau8lb7p5ckmx4dju2a0uk1jigu6ysry9j9u6ksj60mtw7caiwlw259',
                flowInterfaceName: 'nrkeevrjmygeih443eahr1cml9gmd1rweev63aogpo6x3km66qizv2pkxcr8xilmuypi6crvx9r1pnw8di0b7xb3kp8d50rpi6ylipqgh6mnkujx8t8zaicqhjzvu13se0if1m8rn0zj8rkbm8hnpcwplfajl9mp',
                flowInterfaceNamespace: 'zcur4c16yd4571x95bcq8cykn4hpbxylif5ix7n60zkni3ffyd3m6on38xqczzf501vtg4oiv548h5wucr82uej4wvtquidqqdu0y4kmztvb0dxfvmtoksyn146go18bsoo9mvvoubxsusa29ggl6qtpmpvj6loi',
                status: 'SUCCESS',
                detail: 'Sint culpa earum aut consequuntur at ipsa labore sint. Aliquam inventore dolores ut aut libero. Est modi fugiat eius. Beatae eos a libero.',
                example: 'yco5l15hkd2vs295u991gu4adiuqqrrqubeog4nwze3atez8hxfzlrntlj8p19liild1n8y73v14sk8knxz8nmkd5p9245dl4fvruxv93xd7nz2vqngjwix503i26lr5fih3njmv53jzyszzq1m80etc5t3294rw',
                startTimeAt: '2020-07-29 05:30:38',
                direction: 'INBOUND',
                errorCategory: '4ff8lq523gkiyk6lieki4o0t8zvfuwfwqymvsns98u6qiv9p3l2oiyur4e38a0cbubkphpqkpecy1ycss18jxro611xobcun9xi981dx17rb727d2k9e3fzr2h09ut5wfw4goizbahf00m854xwq3zr1rt6c9yk9',
                errorCode: 'keylqiycg2vy6rfw13rbrzi5hofh5g1algh0sw1obwqdnuwfur',
                errorLabel: 955621,
                node: 7073084548,
                protocol: 'dg1nkizm25dphqgtgxbn',
                qualityOfService: 'r66u33mrxaq0mpl3fqgc',
                receiverParty: '43jqaz92aqwv8iaddrny4we3l41hp1i6hulr1zr58vssvqsfrte53hactc10vmp24vgb0s1ash90kusu1ug7apclijryg646956jo4kbkpmf474eto6ptrl5xphg3pofzfiafls3puzloki4w8i5nsv9jzp1vykd',
                receiverComponent: 'jf5o6gyxltat0wy507psl6et9ugjgsk8zxi4rjh1b104veai27yfpitc8dqivfn95cs6b7cff8c15ltax2kd95qb7jnze2gyp34ulm6nsxh1f27qjd9mv3jmnkerkmapbbaqgwnrnijngnhm9efragp988lsym3t',
                receiverInterface: 'e88qpmnh7spc9yrfq6ofehyr45hgrl1dt0ffwrg8xph07z84ogiuf5nfxp0wrrg5q5uxp0i95ux425fk1oxqmrzho077188ng34xkktkyiiaud86dsvklnta6lh43ohyjmeuo4w3p489drwwdcite86f8egaraqg',
                receiverInterfaceNamespace: 'rgoy4aixxdp30w8j81kcpjtesw3cf0tqarwfqdmjqog4quucbtb4nrbyf59dipc0a36sc0s90pjyobuo37ewpl82ou771vo8385c16lbxtcdyyq83otnuh93klhyban41ur2p5e4nnahb8u3rx7x0phecw4giarmw',
                retries: 5053499289,
                size: 8024806362,
                timesFailed: 8459094929,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailRetries is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: 'j09ab0jw689z2n5i83sy6tbns02wt6cf4l9f2ei4ujxekgt0kl',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: '1y52n2ps7hq12sw90qar',
                scenario: '7nya3lygutk1mlilymgt3aeum95rkqkxe0ms2vdnhymhdh1sy76eh02ev4jb',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:36:41',
                executionMonitoringStartAt: '2020-07-28 21:16:03',
                executionMonitoringEndAt: '2020-07-28 19:43:06',
                flowHash: 'fc6prqpu0r2k9p8wfavnvok67v4crys7ac3b94ke',
                flowParty: 'lbrwtkt8tus8a739kmdeh9jvqkyhgnacptrnvkj2b9te8t4ntamu84h8c5ogasfypioib1rfav15lj9hwwg6qg704vzejmeixs36n6pwpw1ywz42akx93rrkqsssl8bekxymt34gkxucgu6ogv0vn9ii1q8plzzx',
                flowComponent: 'dulb8yu97mim5lpzqctmni7sztj5xyr6uo7wtkrfxxjjpwcz2bisnl6nnwv9paqbdrtjn1i1p6ynxhf6rn8kh0i081a0uar58y7zayw0103nag17av0l02vo9mvfjitdi72d6hutzshtev65de4t4r0ii1of3yvx',
                flowInterfaceName: 'v7pz4zl7x1ajfik9tsq4al7chbppki3i5lcm5ll3ul5iaa9zkutd3m7qleiegodqeekekz0ap1ieg2h53imr7lhmdaoayxtmaytvtivuqkdqyl1pw7sgkt0n9plz2zfrbkin4i9ioluxkxm816q3xx9tyqgxkot2',
                flowInterfaceNamespace: 'c3yakexxelam7e8fuvnro6svz7jw8125akkxyc864bsap7fgzrj83cvo02yvvviudzkgq2ibok6f0fr42aglv8kvtjswq8slsvvxvv69odh4lqtjx69r3ijz1f9d2w226963ix947ly5xwuoojrxt15ebhqgvk8m',
                status: 'WAITING',
                detail: 'Quasi similique odio quis quo libero ad id possimus laudantium. Dolores est quasi. Veniam dolorum est vel officia assumenda autem quia ducimus. Placeat deserunt alias.',
                example: 'ql6tdoj8d9bgz1v8nuksz6rq9othzv6x5k6bhzcqwy34pvd8sstzr7r2jexe9r240tibjmvm8gddoszwuy4ybkbt3kwvwk257ygqnfci2n2y5yi7i1ffr2sy39ct7ibubp7kx12smqrzw0s6lpw11z4mq6gwn1mu',
                startTimeAt: '2020-07-29 06:43:10',
                direction: 'OUTBOUND',
                errorCategory: '55446gyg4tttfpbrnt3s2fgjabhrb6gkn7zqd01i86iwaa2ahl4g3qypyfy8rs95blyk2sl2vill2mm27p6c0uhqa4rb82m2txubqcpemfdsaxk2o99xrprmhuxhfs3yeap4ydemyb9vmja6hti7ybgh88xuz101',
                errorCode: 'u1q7u44rl27vac4fgi886net9acgy7omdbo01rjbaomj0vh96d',
                errorLabel: 770110,
                node: 8593325509,
                protocol: 'hpztvspcq4aajp6tvadp',
                qualityOfService: 'viff7gy3k9xxqyr0bcgy',
                receiverParty: 'xwzh994sygkp2ohny0vvywr6mg3lejjjep55pmf7rx4pa2ignxhl43fw78w48zeuoonzfdxh6s6vlbhedlsk8y0gj6ksrgahyx99lwb5r62s37f30w0ys1x6jny2k337hnop5cchd1o77et69scdpcwqy1z2c73k',
                receiverComponent: 'c3rs5mpfp0sul7ip8fsr2zckpe19drs650t9b50azm25bn7inl9t8cqkwc5npbu433u7xyi6biqlogeo31pf674yymecr7848kxvl5h2jana8g9o7gmamzfuut46baiymklpkc2toff5z58gzkgvfeg1i2qrul9v',
                receiverInterface: '5robrmgnwg5lkvxukhtkyxifrcl675szcpgs08g6ifgmw0xhemj8p55phqq5l7qqm9ci4aakwg7667opup0dno4cu5sd3xzhimsh2oh0abyhbe6zs37krurrbmvm8fvnn47662ct1iomvon0hh0o6ksl3e8f1rx9',
                receiverInterfaceNamespace: 'q8ybgwhq0k01w1a80pou5z9jfl30jwxqfimf0ubip7g6usmn9gkhc3ci3mmbqnulzmz4dnomgwxmp73er6yqsp5aawvjcnfxbwt4hl14x7s8zqc4wwre5hc14e5zxm2cy2a5iwmeqa09g83hxpt8q9m2ve03g0er',
                retries: 50057698326,
                size: 4098481409,
                timesFailed: 9508107391,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailRetries is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSize is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: 'va57zxxc4t8lnpcrv758587ourcatvaybgvz02zxycf1i2lmgb',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: '8iiz5xooa3ssvv2in7e4',
                scenario: 'c9kxx7242lykdmee5xurfhay9bs3orncg15055i2s5bc0ym7g2srrcl9tct6',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 21:51:34',
                executionMonitoringStartAt: '2020-07-28 13:28:02',
                executionMonitoringEndAt: '2020-07-28 21:48:21',
                flowHash: 'w2lqunrhp1wlda8o8yzf0x8rfbrnhy6p5nebo672',
                flowParty: 'u3ubpz664hqisf5qhbefez9q7p3gdx3cn8j9qk295217rrmavskb17p2nzxcwjy44jo852h67ta424c909od2o119aqwceo8nb5z94s5c7cyoau7evpxqmxcg6k7gjvrcfsgh6whv6ubqorhhxpr1bsaq6qzlfgl',
                flowComponent: 'aduxu1tn6jb7qxloxrzldw1gcbe8ii1kocmv5h13yfx4c65uh1645239nhbote38ui4qa8s7b7tk6ja65vvs8zzalmta4viq3erihi26aoo6719d0qt4u07zk0qo8dbntchx8rfqmsl5nyo2o1lqh1npgnpn9f1r',
                flowInterfaceName: 'r6ctg9zut1902v1hla28wzg79nwxgiqy07ss0nawpqeq8pk8c3duns2iwm1qbvcmgqewni36fm8rc6qbuyumbi8yzo11cymcje141xp61hz3w8g3waeeecnff49fkas5u95uyzxwufejdqliz3cf5w06l01nvjqb',
                flowInterfaceNamespace: 's40yxg2gtskgds31jmgmhf788sy5ti697yxigr5n822t7gq1aghlaolpolobfhmifai3zmcku4uesi8b572yzf67mo1lkc6ml1vz3th2u2xcumtnjym9zbd066u7sy90fdd2rfep2l198tyochbqljjg7skjsfw7',
                status: 'TO_BE_DELIVERED',
                detail: 'Harum itaque repellendus quia rem fugiat. Laboriosam recusandae ut. Perspiciatis corrupti sed nam aspernatur a. Corrupti et possimus voluptate possimus corrupti et. Quam voluptates totam vel facilis. Consectetur ea velit ut consequatur qui autem numquam.',
                example: '37xcwf0y2gwhzj5j04t8wqhc7ioyhberow4h36s4a8wshod6bpycor8yjoqva4k1y96kq3ysaqkfy77y84ahp0eztks46f75b06o3l9tgmmgittsofd0orkjb5n1oioo4q6vkasq3xazd6qjzfspivh35ozzwta2',
                startTimeAt: '2020-07-29 06:44:22',
                direction: 'INBOUND',
                errorCategory: 'ug2djt5joexgkwji9a1vx9qozga7yis1wwamam7rl5emyjv2s5jccu42u5xj1fcy0mjt87jd36u4acrpmenf6y95z3dio1ckz60bndjq994nhvl7z3q0hkzjzkg2j60p3dtc5ifnomd6hwyt787g37gsmo2klkx8',
                errorCode: 'gn60kwid17zh53v4fa4bt5qrj8wb4rnzsoh21y381ofav196ze',
                errorLabel: 608800,
                node: 3564353316,
                protocol: 'd5b4553e1i9bchx12tu2',
                qualityOfService: '3sulm6tqxfg1dhx6e6b0',
                receiverParty: '7ip5poys86ldwteadm6fjqcw8hgrs3b3sh2blul9o7fhninubhvus8acov80ypjmg9cor1fw8clkksfo9l34kuf1cfrzi4j4x80io8dvq769cs7p3lnrjfrpsuookbb56loac2js7rfjv33o849v6cfwsits6wip',
                receiverComponent: '5zqku3lp0d9dxio6gy8nafi4n6npg517lomidcs09u1dtzdvejl4z9qeij35hwy8ssoaid1j8fuqryrlmq90hpvw995gxpnp60tju14qsi58fsa3d0pbwqoue4mik3yshn6s79rrr9lq5ymzfpzvy8n7yv6uefyg',
                receiverInterface: '5q3kipxi18f1q3m7roykuv2b1mwa7tbm5in2fco8ziv4qga0uvo5ue2a8y06y6qz4b18oa88og0sbb7ynfi6y06ndl7h2ewvfzaljznifcmnsdmmh6kcf5kyu3vo7r49lu9wu60mm8ezdctd5vfvk29gv6dcgpzi',
                receiverInterfaceNamespace: '2pkfm0lccxtnsk98eicra5dmodyuylg90fk22baqvlf0s2bdy8kv3w32244imy8byj4v0n4zf9w7ec4g1eff1459ru5qgebby535bg9cm9h446xk3ea3is3f28ofyl766yzrzek0ain2eurybw4908jlsfrx1g5n',
                retries: 1603041897,
                size: 34910717119,
                timesFailed: 5166609069,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSize is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTimesFailed is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: 'npntl4m82796rxj9oioacnzwi47t6hv0qlcmg78p81u57rsv54',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: '3g84zpfwli2yx6mu37sz',
                scenario: 'jlu5lnnxs9mak75pfya0ao58dgyya0mxtbg5c4p1m65i2dvu9fqkzruu61o4',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:45:23',
                executionMonitoringStartAt: '2020-07-28 20:30:50',
                executionMonitoringEndAt: '2020-07-29 06:03:59',
                flowHash: 'dlmm68gbkq92lvn53ro4h7gubntkhvj9s7h9xn9b',
                flowParty: 'gklap5a7cfxcovxxil3dalsk2dbwvi42kn41kvclt3ic2ah5fvrgxzejldzntodf7vrazyhpqiqwsntscesanuarv5v6vih03cilttg91pfql0j9pj1ciq6ev9uibp57030vrwfo6rn4fb0a3l2c71c6a829rwla',
                flowComponent: 'en0i91j6koc7c5kandl0tvlwhr543et0oo6bjz0ygikqf3rh3dm0d39cf6n9ym54lef0sxb951gfm7s29l1a6k2j82dlupojuw23pxpbypl1o9tifb7lgsmcvkjd6b3ky8022nkl7fqssixzi7sf0sdtqdlx0e0c',
                flowInterfaceName: 'rhb7yzl2n6ewbiyiy1t0rssyxsb697ngspd18fesqp3j3ah1yp9mfwtz3orhqx3cmmfkn9hhtbgeysm82dox7gom07ywl0irbde8vbwm3xqhcqcqfq0x21yrm2f2dm8rerpvqx9amoq05wn1g4zasyq1pmmwdvsu',
                flowInterfaceNamespace: 'r7ahsofh6n2gdvot5pefhf1firedef3mtiu2izxzhu31v38lblxuy7yv90gwalzzzta0ej9p3s2v9zl834cuix919hds113xnd1ahtshah4s3psicltyaqt2x1s8hj8yvj99q8yu0xi28zpijbmtef3uq700ynx7',
                status: 'HOLDING',
                detail: 'Et ut sed tempora quo ut tempora ad. Odio aut ea qui recusandae. Qui soluta repudiandae a. Omnis at consequatur.',
                example: 'idvn0ua0y9xslk6vs2mf1yie49zfap8oysr27ofiqpc5ijsanq2mqk2077hu6su3dz5ye4zvj7uasljksl7uqe4p426uisb4hm9hyraqgwqb9dyqxpzlei7e5qsejn9nv4gg5c6xgksm9x9addq15vpe9dzfhyj3',
                startTimeAt: '2020-07-29 02:34:26',
                direction: 'OUTBOUND',
                errorCategory: 'f53k1dbm0b8d5470igm27k7g75szea0afsvymqtzettgf0rsnpqv9t5rv81zwl9yzfy0qs4rapt7h4l7uw0gizhla45kvfh70czmc29axt3a5v790e0hpq5tkmved14op87k54jtb2pclioi9w34igjc5dft9an5',
                errorCode: '5to4585b1fxn5rqiw3bry59z59hz1v143kt08uwt5s0c3co3b7',
                errorLabel: 989694,
                node: 7514556727,
                protocol: 'jwtq36li4wyu75fcovl2',
                qualityOfService: 'f8e9l6yhydzd5gqqf738',
                receiverParty: 'tbthrts20tma3mbwt182087cpdaft83e5nsna3ng7x3huh0lngls0omdtpjnr8owj8bh8l5nwji3fx6gmc4ypv2om6gbfgi7jh9763jf6kowm3yxoacgob85aed1mrbovahnva9szgytl53fqppouel6rtkp2zf0',
                receiverComponent: '3g5jh6yi0sjha55vdhvqd4mar4uvuhdnrov5gd5lq8fgt3d5o25vs3nnftu6ilsiqjs11cojfkpmg6if8zs7lsqw6sbl785zadlt6dlv7x0shbzha6onjk5tpood4g3kf8jap2yt2dkgpo9rsw7o239wspiedm59',
                receiverInterface: 'y2smhp1l9dte781726tw1dwz5w11xafktgd4r4hn5r3tmyu3pznn8k4hd78lyqiqdpv6fwl41rfsovocj33h29hutgmconm4noxrx1a9604pej8vppzl1tdy8txrkfgye34vlm1bsibzspj8a22p7nbw5dweuzff',
                receiverInterfaceNamespace: 'gtej5a3k5fsy5gnreo35thpn8iajktpzdqgd5f2epqy44dhyd9an0ofdsi51piqh46pctb5w9bjghe7ommr75uwnc952kg83vkd4sd5eyhkikxd073oyg8o2qozf5foze76ez3trvha9k2cja6ayq0ijquhfiusd',
                retries: 6345532983,
                size: 3307481218,
                timesFailed: 44885783862,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTimesFailed is too large, has a maximum length of 10');
            });
    });
    

    

    
    
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailNode must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: 'kso9rpjp71unxozfis8fpdgug9w9cprs0pxt7iornciikn6c38',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: 'rahe0jt24qkkwp2jilhh',
                scenario: '6vd9rybu6sb9onl7v8rp2wlrc12dzqaev4vp8tdh1jfzkzc5c97p4cln2nkn',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 06:39:43',
                executionMonitoringStartAt: '2020-07-29 03:37:41',
                executionMonitoringEndAt: '2020-07-28 17:22:24',
                flowHash: 'gvi6fzi7wrwnj1uq33i71dfnlx6zsv5i5k1l9x3i',
                flowParty: 'hrwq9awksxw0t9wjm34cpy4d28qwav73aiovb7dpmrqwfi8burzwfm0ml61zwv2ftxe4ueh0sx6aljukmvkcuvac6zfy05bt2ej1hveqb8sw8hjz0uj62jledyaon8le8526rpzidmdr3kitf6na8569rhvvtilb',
                flowComponent: 'u7chomzj6mafmbwow7x19sfuwujspw5b53qbzwv0hryhwl3toqt4lsmfto3dhbugw02bxmsj6ld2sqbxbd52hj1jj8wr5x8y43lz8un81izt2r6wak6ps0dsxl0nskpcv23tdxcphylho82vlakt8ebu8f4kzwp6',
                flowInterfaceName: 'qzqmlqocbzr1px4oo9ztj0ta5ff95lfrfjx46bhnr7bu5mrvqwyj2szzfhq4wcngtap5wy75vznpsnljtd7gaflmsd3m17ayya36ropyrdb86rlof8n7vm2q35tl0xp052z2fi8qmvl962o620smfnu4c1odkw9f',
                flowInterfaceNamespace: 'y8xryqjztr5nkig3g62br5h5j70xjp11e5hfzot37bolohwcm2avmt0k5a6mlcgdehj9u3bobxnule097lx93cfqkc5nxvhgq2e480de6jhykhykj6fuo3xs59oce4son3t40wf0w04rfactxzj3edopg9464i7f',
                status: 'ERROR',
                detail: 'Suscipit dolorem possimus. Consectetur molestiae voluptate sequi nisi. Vero fugiat ab. Et dicta quasi magni libero quibusdam quam. At similique cupiditate eaque.',
                example: '0eu7p4eceh48u7svgnuvrjxu2xm7puhxfpebryl6rmkmy2c021tz446vxjt7frodw0gx8ylmwjfqz345z99rp1rdv7jkhnfylfahf82sugn5hsb86u25zaccx8mc5j3m8x23i6wwl8k6ut0qcc1a22vf5pbw1n1b',
                startTimeAt: '2020-07-29 00:41:10',
                direction: 'OUTBOUND',
                errorCategory: 'fm0o9hrxlcteu2n8m2nky03lh6ldhqwnqw490bbubrtor6t4nrcuzd8w4lnmx7lftqb7y665oaqg1j26dh84sbi5nk22qkc0eo19rmkcgfjkhh4r5dx31lsywclk48zk76dz6ozaubbpnoizw3stvrj2wjpwt7lg',
                errorCode: 'v8z9b80t2wdup4jbmslazu4igd0jitypm0fbpj4j34ssti78de',
                errorLabel: 696918,
                node: -9,
                protocol: 'y7jr3qpun1h5360db45g',
                qualityOfService: '2ftkdkkrki5w6vahd1rm',
                receiverParty: 'swhv9y45ibi32duat4fxxbloh8ttb5jn0wcso4q1eeuzfk0cqulnzo31v62m2gj3ox2n1g5jm6k8slwq6qujoicj56a7mn83c8jvrxuwzb350bsyci0lvpxymcyd3gmgzkb2esk9lrpemgqhqfzevja9vx31orii',
                receiverComponent: 'phfwhmmz75pyfz9bd3ut2xbjc7v2e1p6p9fubnx55mq0dj5vaae11nmrvqp235uqv82e6qblp4on51mhkd3fiowyvj2sx6pwgl63zi65n60gm7oqddpui7ldb9804j1bx5nc11w4g3cbgaxqkzvgz8n5gm7xlf3a',
                receiverInterface: '43nz43v1c472pm20zoay0byqgui8ejmyl6g3epx5508ueygrb8e3r6btajvgx12dipzc1t4x4kpu8bpalg85fimpq5axjvyw4dkr2awu0jhlvw295igzsktgs3t716hcvpgviodqhalb5b7bret0irxk5cbb1wni',
                receiverInterfaceNamespace: 'hww4p7bhr578ylpja3ymm9ndvg6zh12c8stfnvbfqjh7bu2aabvo3wdd83u4gupsil7jkzc6gkv7tyjw2lxnfz3arpcp4acupf71d76f815q8y4x0m2qo68zt1gc17867nt88o8zc0312y8gitfzwwtts9ui8env',
                retries: 6526771633,
                size: 8002836772,
                timesFailed: 9730478370,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailNode must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailRetries must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: '9rvd5xofyfrij3yt0bqcxb3b5of652akdrsz5o1bwbpyp3704d',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: '4j8hzw55azjvz2byzxhi',
                scenario: 'lpli445gfqherhz4g0ibx7qcudpiqdidldudzwjdm1us5apiwnyxjpt2g0jx',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 23:08:06',
                executionMonitoringStartAt: '2020-07-28 14:16:29',
                executionMonitoringEndAt: '2020-07-28 20:21:06',
                flowHash: 'u8zbscr6d90su3ybw78284bcxgetk11zi0f42r96',
                flowParty: '1xfz9d39ho57tazllv2akj3ojtqdf9f78wszr303ot0p4x86afieremykktifyp00kzi8n0ko37nb7bft67m6nbsvz7ihbd4wlbe05g3cjyb39cybcgwm3s973vyylgi561ou81fn271a6ks0vqo9nndcvtzk0aq',
                flowComponent: 'xzyhv2j30dg7pi1gf5y5hb763fq5whfray8aqnjdrq9hfz6kehtdn7quaiug6y3ithhqqevgnkxgjxpfrzah25o95wvanugqa2ehbilp7ege2gut9qsovhk8m7l261yk437dvmhda2el8bzaaqh371hc6mxuydn3',
                flowInterfaceName: 'kxr3xyiydiwxyrks9iyetaqki8lk4yezaa8ij5u9np9ykqzeomlfsuvym38ypndd9xjsm5dzh3wgddmxdb3npl3uncripi9ckw5zlh2oh2h2e1fba0qc7mty90kj1x5utj9rqq9fe35507pi0rm58oqq5emj6jvn',
                flowInterfaceNamespace: 'vz2a2hrx6x1y6is1fak0f94z3f4zfvbwfqe3bu972a720npwt7a23b7mpp2doem7l35g9fbpjpgy1jfoieb3mis6zpavu0pb06r9pxxib5acb334ocfyn1zcasl6hbjhpgpeui5zoetankyuq67xjcp4zmt6ou2m',
                status: 'HOLDING',
                detail: 'Earum consequatur fuga perferendis sunt veritatis possimus rerum rerum. Possimus enim officia enim asperiores rerum totam sunt repellendus est. Eum ea amet facilis modi. Ut nemo sint quis odit qui. Consequatur corrupti illum iusto similique quae ut modi quasi.',
                example: '766dr22yux5z1w3rnfj0zwbbfxgt2c8k3tsg35w3fd3qri6nj8o9021u5f1djhnem6eda8hbryq0syllqeqq31lync412h1qg3yglejkkmqvgpd2gt9gu8dm59vmop8ezl2occpw9p2g9v3w4218l7v8ci8m3yej',
                startTimeAt: '2020-07-29 00:33:00',
                direction: 'OUTBOUND',
                errorCategory: 'vil5spu5fwogvd70ytijcst72p4vu0556q4mptenx7n81ot7f2zrns15gyqbhowtf1glv9nne2bqpih65eiinve1p3nxj2il5tw4rso2csthqd9fdq5g313tro9mmi0io7xqic4v7w7hvwu8j4vitqpefvl4aodo',
                errorCode: 'icaflxtsrr88cyvosl335mzcdkd77j62fu5nky55ew4ybnwvxd',
                errorLabel: 237601,
                node: 5810232106,
                protocol: '5xceigbfhd377dg2i1l3',
                qualityOfService: '3kjuo5quvelexi3ace1t',
                receiverParty: 'w9ec4lw5jj2btwkbnqtbhtncqmugaz53vtegf2qn8z0cwsv5bbtn80d2jjmthj0frr4sbprl1lx8stxjgb42bye7sc0cw9k8c1jjw1cv8mwypwogrmuu5cmuaq67z6b8n696rnzwfzn3i21fu99wmb644jkr09u6',
                receiverComponent: 'qkv4rg4gmfvukb1qrtpvanol5fjcvoc20hfrnio0lgudlnni99gp828dxs77rrw5oidc0sp9euh4j25beqam93vxbz0e2pnz76hlgf4auqwigabm05yuwxojqcogbq7yzkz77ucitxarwcy7hlmkmnxqvyy0j3i9',
                receiverInterface: 'vz158yg4pn0w23mjfcxr5xo4vkbfprb8ctamf1bbui3h4z8uq5f0axkf0v0rrrjhmruluowj7tzqm2dbum3db25rk9en4020owf8g16kfs5q4mmxcgy8wb5pjlovqgs18bhj3aqx1f7zolam4bded2iat0wk8lxi',
                receiverInterfaceNamespace: 'jiqzw58f8r1t9j41fk9j9phahc2gcd4f1lbl264snugvx3zvjvpmm0oz8pf93v5gqi9xg731eyp5hf81h7790fsbk7csrr4b4ben6gsyqx8h4ptxv7wos2qr37umiciv22flrd88k0g3djrp9w8sx64ax0kxebxd',
                retries: -9,
                size: 5056033105,
                timesFailed: 9037193309,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailRetries must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSize must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: 'u2y6v0ztzop53kepj1binlufx6696ur0or1zlsvabavcl3hvzm',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: 'uya6whs1rd5u9xdhjed3',
                scenario: '83zz249s2pke9cq7e7a066v1bhl1xykctvkxbfy33upyi0un2utlbj645pf1',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 14:45:50',
                executionMonitoringStartAt: '2020-07-29 04:31:39',
                executionMonitoringEndAt: '2020-07-28 20:48:42',
                flowHash: 'fjhvz71s39o0vpcg071wf76ops719euc8lub6w2s',
                flowParty: 'sb09z13ozkbp7cezz8qefvnn1xhqrg098r23n1e2vmsklnyznwobuev9upf2qqb4emvn7t9px60gml8r5zqqv71opzm0ylw8zdtysdqe13pnd12l5lnl6kjlqjabp7xw71cyrsdhomlnif2wqghgatjbihsh9z4w',
                flowComponent: 'c8n22admrgvaqs1kfgekcoa5wzg3nm1fd44304cfaumrtbvpvh51iu5o5quujl5ojnealstrs4y6ocgx7wd7eoa6bhvebk7phmu6uqcre8swzcp41kx37wy9puq1tdcssa2oomckkw1gp9p29argwlaj6imwals9',
                flowInterfaceName: 'fkptr86t7di5inkuj6be95z9jl8p67s0o74qpbko3ozb4s67ioziqj4udw961217rkw4eg3rhmlcm5d0ulss826g06eqfcc0grolexo1x6kqfdv395w5kgpc9jh3m3zrbp3zy703xyw40y9xqwcqrdqsezjfg48g',
                flowInterfaceNamespace: '47x5b7v5gqgyx9righ4si4xfjy1r24q3y1o5a4foubr9qp3c5lgennv5yn0gky5aw974sx6d48chyu5hhtm6z9n44ulefpcvfe7ckf0lqj7ri8r2t8bum14vvqt2iy7hy0milj8uttybxxv8f8qrm26lxlwjalce',
                status: 'HOLDING',
                detail: 'Ad fugit vel qui nobis architecto eius aut eveniet. Eum aut quisquam quis nesciunt iure autem facere aperiam corrupti. Nihil sit et est velit aut facilis. Suscipit eveniet expedita et cumque quidem et similique commodi. Quidem qui nostrum vel mollitia qui molestiae magnam eveniet doloremque.',
                example: '68rg976rs5i73zsll33wv00jtxlojchmwtcg56nnmfmtxdtxzkxhwd9ut1wt3zudxgke10ziz7bzlh6gz1p788m4tc3tyy40ducoz914oo747hfnpeetpyhgix6cb0d3g8o9oa73plhy0cvvfijd8nye74sm14w4',
                startTimeAt: '2020-07-29 00:24:19',
                direction: 'INBOUND',
                errorCategory: 'll0tfnrdx33ox47oblb71nk15kztgb7r9ojhvu676x76byz1g63l4st70v95srfgfl7snajqz5zir9v4fauzx7fw60lyxt8owj1djx0jmstjjfrprsz5bi6gqub3fecqthofephoaine60h1l5r4hp2movmr77h7',
                errorCode: '1dbt9u03jx6digu68i1lnd5p1352t7x1kcyg8fe9ehlwcm1t9c',
                errorLabel: 906761,
                node: 2321967080,
                protocol: 'hl5b4c7e5pxg7u9bpoh7',
                qualityOfService: 'bmsgfpvo6c5e3me7bgu6',
                receiverParty: 'eto08xd7np3yv7cu55yorh8si75uursc7ucihso6s0ismabeckvkfu26z568kuxxuchvfocx69h57j12t3veowdypeejnr8gkh81394el26nompk6n9rdy13nqpvh3dkxrfesa70rgb1v5j1hb2t7qvjofzgqv97',
                receiverComponent: 'b33xmgq9u65z81ifr8ztyz7iklp78fzy4e2kiqvl2nybbpcj5upv9xpmlgzyuow2ajivv3fukev3t891sr4l3kyztypvc9umdxl5aff50cmxd5a6d0sr9lreunahdqs30ohmom5x56qgwq6m90y68s3io4bzjhhv',
                receiverInterface: 'utyc5n9shu9z9vwy9tag0npvlmnushi3sn49vkgiot8lis6atqti8f6k8pli9bd0bm9ay4xseg2kxdzwlctipj7i5wpyovr8xheronm2r6jjm4ia9l5tigfx35axmykjicn8gwj4nvmdgbpqgg1uyxg1q9d6le0w',
                receiverInterfaceNamespace: 'xk0qjz8n9iasd22f6v6q5j9usn7ooo3vlokabep9rktpyq7btnrrry7zghagkz091ptao6b0lecb32vemsyiou9aumvl9sfes355bp15u7pif6240sx03472or0nau42wpqukr2xfxl9xxmhf94ymdzwcp5bwjv5',
                retries: 8354933694,
                size: -9,
                timesFailed: 7999149539,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailSize must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTimesFailed must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: 'yxdy6s0t0d928eupytzhrgtlrop4vfjn0zl3cy81hduy8ks8ea',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: 'ppqlqyxl34vu1zb6awfp',
                scenario: 'baeei4aukl5fsaq8eqabj10zu1t7u0n2iipiarli0q95k5jh5i5pi9kme6hd',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 21:14:46',
                executionMonitoringStartAt: '2020-07-28 13:50:26',
                executionMonitoringEndAt: '2020-07-28 18:16:19',
                flowHash: 'fuqgugsul9pncvhv2bgv4h0ktzzbj9da1q77dyar',
                flowParty: 'eqfh1ylwpgxbb2onk544y9uspblad0ejujxk4wpoqp66321e1odxsrtfh53qwcbe9ndoqkls85d9akxobd66nu01milex9jikauyau837u4jjr1x4gtjkk989mwsjyzdzv0if6a65xvdnaf04ns4pfkze2sdwzdq',
                flowComponent: 'lmx8t13xzvy443zskwob85fzyugwz07ei8hjgcwbxr1rzuobb1tdlw26a4cnrsi4pkbqlcx1djjzz6y1p4t7r85ti7cl5ho6vhnwc23jwl65lmoc99jcikf9dkelj1iibq02l55fyabtnwryv6g18i3ex0p5mzpn',
                flowInterfaceName: '8yfbpjxidgg38ss1obm65bcodf1tthy0spapshcamx2m957zeoig964o1yoikxeedc2c0pp533og8uedg1f7laqapxq6ph8ljo4m8qxsrz5xb1zkfmkv4e8qrr20u2qvgos7k1mft76f91hjesh7noy3l9t10vbl',
                flowInterfaceNamespace: '266ozh00ox5qjqoq565b0lcqoktsekqi1n2dbutwhs21mqstq5480fltychk0k5ji82pf4aht0k7tnxlpjvhtnkn7sgses46tvg992673n9z7qlx48eco5qu7kgbm63ukrzlqqpwu98ajjmj3l4t4ty7bncgbzls',
                status: 'TO_BE_DELIVERED',
                detail: 'Itaque fugit dolores nam necessitatibus labore dolorum. Blanditiis doloremque maxime quas ullam ex. Excepturi illo est et qui sit ducimus.',
                example: '8nr3l19ooh66jcqq03l4map4nrrsfmnrwubo7whrmv6qe2dam0k2uyx3oy31g1cygkni751q1xnbagpydofmip6fqp4iukizc9ps2lstyu973j2bbas78zdijdqoufpq1tnpu26akitdf6jq3rw923n8oqluvyh5',
                startTimeAt: '2020-07-28 21:09:16',
                direction: 'OUTBOUND',
                errorCategory: 'p61bvq2trovqkb68mf3u8gj0hvo08lud5tkfhbmzz4woxajkvfncou5zlgz2zf1o6njfu76uqr1s8jn5afvxlq84h825ry23r6av6cp8wyqle8vxxhlw0shj65nk0pwps7adb7z903g8kyht6voa0hyad02esdfq',
                errorCode: 'zsuzvzn295udilx5zyxcs10h46v14u157vixosz0sbpspbygj0',
                errorLabel: 389905,
                node: 8413741122,
                protocol: 'pcbflxw5nbi9fsitdqdn',
                qualityOfService: 'sp8ulc4idhyxj7khusv6',
                receiverParty: '7hva74evpwccfefpj3wunqgij66hvtw59ulfv9304bk7pnapa35ak2zyer31nu7ogvhtlg6b3n4wtubdurrb7vhbnxd94c5ew1tvz6diktc2nyl6a9bkd7ymttsnasvsms0vumwwob70nahn40ztzswjrcuysk2s',
                receiverComponent: 'r8r2j9ydgfgbhbykg8yq9qmyawqvnala56rrv3rrinxi1e69ya9ed3gc59migl6zgpvcif3p51pjm4sbrskqjwdz251cgi86k1zgq6jzi1e9kauewcdwsk5e9quzr22vzmfs1394lwtwmd72nw0ph8aqgpx3r5yf',
                receiverInterface: 'ajpj77d6tvgb7hhqjdrozlgv7im1tywpv2z5ys2yyajyb7qtvc2a4fhsm7f7if5j87jmoj3ipml0lvauhgnddqutgw5wqb7pfm6lagqo0o4y67d9y0a980pizepfrmfk9ncn95erqlfrtv4jypq7x1aaew8wl4vv',
                receiverInterfaceNamespace: 'g8leads4kyydq6z1u5bmiv8qnbr48qhl09z8p72owcwfruhm0vl0270flmf0id2hgig3pjb8qc5mpgz3vepavegyqdx4mr2f00twcv4b0arx7kufdzzo9sqc4siiwsvhsn5kgm4zv2buaj70xnabdkupwz95r3d3',
                retries: 5474683164,
                size: 4249419987,
                timesFailed: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailTimesFailed must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: 'byi7yto52j9dnms06nxtjpavo7epdcslawx0y84rkgb2ttboor',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: 'k9fcw5pey0t063bffw5d',
                scenario: 'oi9ooe5va5f17zpp4b5vdoii7nkted18bkjrnaueramza0rxtny46gbbqrfw',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-29 06:51:00',
                executionMonitoringStartAt: '2020-07-29 10:15:09',
                executionMonitoringEndAt: '2020-07-28 22:13:31',
                flowHash: 'djx8vl8pddd73bkkfycbd98gbg9r4840nc8dxgeq',
                flowParty: 'ptac82y6g9nowz6oc23ndnpzclezmaf8d1o0aue4wbmrd3jxxd74ojgirsuoos6swqgtxmnv9lpqnkotm21983a040uijywaewg8erzljgpsav0tdbpenc5l59iv7svnbrd1w0uytcwku3wpaf5942wm8y2j6bh5',
                flowComponent: 'ehq772yi1kx274xms8u9gg2f3giyv48v1y0sl7ahe4koz00m6tp6ucb3yaivhaa1h13a2fjpqmft7irto5mpuan3gzgdlj7bnd66jdjoo6wz4wpoy6plkdg9wuxwc0ahlyhs5s4eaqnkoiknfl60xw9oqerqac8w',
                flowInterfaceName: 'e2k4pwwbqttwdf4kexg3efswizajgz7koycjt6pu2foigc22oezwmuzudxqorhwzz7hlip3a06djh3gvyg373jhv0yzclg4u3znwwopomda5z3yem5ld691rfjyoxg50vot7it5nn5t2oe5lwaaodeobumxf14sc',
                flowInterfaceNamespace: 'pkjso7ykso27qh5r5aqt9iyk0va8um17ewwesky9s132coi2l6u7sc0sktzwwuujm1z9sf84ws1peiepkzpbj5p9vkh9773n4pqj5wi7ax2c4m8e32n91zpl5u891cfzs370b7lmn6ghrls2mzyibsydm3ows07x',
                status: 'WAITING',
                detail: 'Reprehenderit est et et aliquid assumenda sint velit neque. Suscipit molestias est laborum ipsa voluptatem eaque ullam in. Molestias incidunt molestias unde.',
                example: 'qqdy8t5nchnm9eg6gatonru44xyqm7mo1ehmhxgt1zv9n9kje8pc767opil4j7d0sc8m2mud0wm6xlpdfdoioo5tizlly7oztdxx69qbtnnen2oyzr9b0uks5pcbpury9pz9pod0t6ym99m7c3erdxywd8zd972b',
                startTimeAt: '2020-07-29 02:25:00',
                direction: 'OUTBOUND',
                errorCategory: '7eoepwc59d47k5kf2czkyc9zt04cam4gsp9c9mno3kp3f4nwxnhgvbnrjf0zxbklqg9i30f56paik5zcog0pzw0oxfp6w97ue03ls8n5qmf5cqmldb6gy1tbrshakkzpcwze7d3pbnd9s63tquv3kq9ko2v4v889',
                errorCode: 'xfdj14bhunk9l7w05mk8vf932qtehqwgf6p8gult1l62k4tyk3',
                errorLabel: 721346,
                node: 1493981518,
                protocol: 'kj45sbccar64esbe02c6',
                qualityOfService: 'kvkstmanuvsv68jio4s5',
                receiverParty: 'z86czcogcrr0b0euo5bs9eq1dkyb5gkjzzwnm43qq9lhi6423fcdzazi6ggkzuyp01e09dhef0vnh03oq57v48589x4dllmzqd1ntsoyksy3brhvqpct04op0ihglyjiia8ijw2o0n32xybeteud6fr7closf1sv',
                receiverComponent: '13d68h1edev42jaoy4rc1msayo9ia7ry1wx8iyzgb8p3zzgvl9kgfvplx04yzplzptgvihqnek2o66lvfcug0xg2kfth71tmh4vql9isa6axdjcenjfopq9jgsleuarbll3sitc7q21oos601jgjwolblq8rn5mm',
                receiverInterface: 'vwoidk9vyjkzbjuho3c0zdx0szspzrx53249m8b6jl9znh8v2nwty5agoe5nxe1jt2exlgiyx5l1lgfmr077m5pv1jwf8hkyu1bma9p6ymndh3kll0uukzwhc4ulb4lnhtahd610by0w9n5gpwjsvxbt5puf9j8j',
                receiverInterfaceNamespace: 'fenofhmw8mv172gq013j6old9gm0tps8cft8goslfe0um0ndp266sru8mp2crfvtagyabofmk9ukxe544u4oqzzyalvxku51eleizekuxvs05pkpia3pftbs81nrjpizhhx33hta2slnpa5o2926kymnyfodk4ah',
                retries: 3547301372,
                size: 4072565984,
                timesFailed: 1980482599,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailStatus has to be a enum option of SUCCESS, CANCELLED, DELIVERING, ERROR, HOLDING, TO_BE_DELIVERED, WAITING`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: '57k20ygmevkcjk8nz3hz06iqfla0bxjlkhw76kprdjtfpm2d47',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: 'gc6bpicjyt4rdhb3aqri',
                scenario: 'ueie24tlgtas28xraji9qzd9hgtxfl023uizbtqo2qvjyhxud7lhb1qf2mx6',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 02:36:58',
                executionMonitoringStartAt: '2020-07-29 02:31:47',
                executionMonitoringEndAt: '2020-07-29 06:20:57',
                flowHash: 'lqydl1b1kwqq2oktac5pdw9rh2526hmysumaf5jn',
                flowParty: 'qwa9bmr73kj7890bxz9x19fr5lfuf8g7qox1qis167c148ot97jf35k2ok2s2m5sqm6w4asn74dwttexe9a6vvbrxace51dug2hovqpg4wttcd0z76v0ca9jraw5p3sttf9nyybpaxjy15lv2olzcq7ynadg9rng',
                flowComponent: 'laupvdd4mb7ty01p95idg9qra91qj9vm7g7zf4zaxhs3f4ob6dbdyr91hzymeiem8hzxgny6dnegscea2vfbwwxmegxbv1ixm3j7hyydxujzruhnpa3kxrh2id7piqfoy2zc9t1ooei59gdlvmm69u1bzejkotww',
                flowInterfaceName: 'er9msffbiey10j2tdulzvn3h1kelm8kat0xxsowni2azt4jhqsbafj9mplzmvzat6xsvw4g3y92x4mqq0r3n6jezf5va0eqkubnywnkp6dqdz2mecnznyznt0gx5mqhke2txbiakie7ikmqxa90zgarscjsv0q81',
                flowInterfaceNamespace: '5hqi9mzm4otvu2ukid0u2pywkga7dgsv1evpko19ccnlkp8mkcy6sc5q9o6b18k1fsgjv1dy4s9c9szjoo82mr4fklve5s5xebzruwhhkomurfv0vh5exgn42w7e935uxqme6tue4nfck3zp2hamjcdcfcm6lacw',
                status: 'XXXX',
                detail: 'Animi quam hic deleniti. Optio laborum excepturi et qui molestiae. Quia rem doloremque ex. Nihil sequi iusto eos provident. Animi voluptatibus sed.',
                example: 'j4ptrn1r7eysgbc8h1zo330aznbh9cub8ha5nocbrqfgygszyldvq6ddeuw0nwcprr8vvextho2vktv4l2rimyvgsg63i1l2ryf2s7q9087zn92x837k59nwqc0nnxjj14fe7l160g8u4o9phgcctbbnnyo5i5kx',
                startTimeAt: '2020-07-28 17:14:08',
                direction: 'INBOUND',
                errorCategory: '25gwl7rj6eb7dvipqajc4u6peiyfgeah0gi3r10la43dpfn9vrw8id2ca4u3l323xtgco2xp2alj0pd7dbe61jqbfrjf832staagmhixi1upo8grevx51q11i21feyn9sux08a55epao4o65ak5hswehowxr1p02',
                errorCode: '22lhgcockk2bufsqxg5e1vj2hnxoxgc6vh5qk3z9wal974abeu',
                errorLabel: 811167,
                node: 5595732902,
                protocol: 'h5auz2im8kkg7ryqj4nq',
                qualityOfService: '1myi4c73w15g3witf61e',
                receiverParty: 'a87uf7eenbznc5m0rrxdtg7icejhm7z1ve15mu9f1hy1rdfgoirqtb5ycz3i0wd3xkvr8kbhv4ck87fs8d46zz7rc3n49b6eac77ftpydvua9xzitjh4mp1974vi4yrzikki4d4hv8er0auwe6omyxh3s7od7d63',
                receiverComponent: 's99xm32psq8dy09dvzygd9xfyuwfkrf8p0isee24rfk5miat2d9bays4k6xhan00iiois7zsv5baa2apukb559hlzdehzui74cul07chrodls5bx8kwddmxirn9ic61f1z9xnrq663re6mf1rgidodamiubo1qit',
                receiverInterface: 'yuji4vtvybef2l7ayndeyvq4suzpvgapin7ietvrv1jal5298sme6qf6402ors88czxhiii8og9fzrq08tos7dnoif220uiq8cgj19fgttok6c57g2mx0p56os03qcqigg22r8t1z6ubj8dd3hxgwghqe7w19tnx',
                receiverInterfaceNamespace: '31bgumrmsmea0y5fylih4uxciqdop32y4j1frdbxibsq23i63geu740y3ywl1qnsdhnm7bkfusi4s23b5mvqqgspz9hlgx4x729sbx1h187nf0ffei7ozupqwhv556y8ow4lipyqfg0vgun84sj99m5ushkayucb',
                retries: 5493426673,
                size: 1917950527,
                timesFailed: 6020448239,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus has to be any of this options: SUCCESS, CANCELLED, DELIVERING, ERROR, HOLDING, TO_BE_DELIVERED, WAITING');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailDirection has to be a enum option of INBOUND, OUTBOUND`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: '6qkmqb6ve320md8hld2f29avzazqxpik8xnbzabyfgwwyb9tlp',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: 'hhw6inn90t3lzlus730z',
                scenario: 'ckrzc95yq5af7io47axxpkmzjr53gj1xxpfl953k3bq4cbn2r9nd0nxhyzb9',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 11:01:43',
                executionMonitoringStartAt: '2020-07-29 06:18:25',
                executionMonitoringEndAt: '2020-07-28 15:06:55',
                flowHash: '4lfk7oa6ute43qos0nq9tloi6wa3tmv9lu0jrrnh',
                flowParty: '7egjanupqvppiap3x2w9m6llfnb8154s7xme61obq3knuudo0hphsnb3awcxn2462cs9jb59sc4rbodi1v2visor93fty7cw4cjho1z9c7b4kqb0x9l3gq8jtcb63lj5laaqc5kugza9pf5dc2yhtthu8bij140r',
                flowComponent: 'c3deib5bdtot03njovj00ig1e1dv3stps1zcdeioezmfl5f67f0du315iyinhmq8ezxddm0qvouu05czq88m5ay58khxgvztk4vgs13mxmhxao3xj87k2lixk86d2jisp80mx3vseoxqtnr7cbkr918qoboevo0u',
                flowInterfaceName: 'sk55q5w9uxgc94qz2o8mup4q3dx3xs3nd7yeeftrv2zp4lr6b3p7xr8fh3mphjtgp3jhwmqmdnkotg7t6rq9wwwkn7zegxvyhexnyih6fij42prjxj5umwso4oaw4xw6x1venuci70qng3tnlx1q9m9ki60jbbmk',
                flowInterfaceNamespace: '7a0iabortc0fwrsc12ezpwfnpl7mi7qv8md7symljrg68sl8rikr7lz2a4n9y23p4hbqoitono82q556uenxqxu54jyutz66nlmgeea6ss7k5bxe44jwy4n8f24yvuwvt6372keb6tua1ahkw4b398oqfuwkp8a6',
                status: 'DELIVERING',
                detail: 'Qui natus autem aspernatur. Cum voluptatem vitae. Voluptas iusto omnis repellat ea.',
                example: 'vr10qaf3zwswnxcuzi9p3efxiltjcagcpp5uapebpnxwsx4qv8b7w9o3v7hs1m3vszai1qoi1ds1lzvit8uc5s4hv1960hkemuy775ij1sivl80lywhe9drlav7rlogk9vvyzt75ynrvq7y5pp92d0fl74w32f7e',
                startTimeAt: '2020-07-29 07:28:10',
                direction: 'XXXX',
                errorCategory: 'ppwhiaxctlgznxu0a2j6owpf9n56g3zl7grei9w2jw2nqam0fm7e2zbq3zu6iz1cnd28x86mckxf3vjvun5wrte22t0xi5368jl5whuz6lyincmohxv1pei63scy5ft0fgjcbsgcunawavas318wm20f0nlc72cf',
                errorCode: 'k2av85k04825118s08ej7j9s3m7l6859arzgl2hm0o7d7ormw9',
                errorLabel: 937695,
                node: 2062484034,
                protocol: 'bbd6ejxuorpyqz39tif2',
                qualityOfService: 'sfvtkbc813ojbp2dgg9d',
                receiverParty: '0y4jx1u723hy03y9chdlmar1vt7bg4piiu6e9l0i8gaw6dh19cvdcppwhjkidn8yese3v8xtkvqks08sh66xabqc67sqodbabsmrrauxmw5ckgwmf0nh7ny3kizxyc3znjcmrjykf0bg7wkkp2aleysxaetagbfy',
                receiverComponent: 'zfnnoxxj4jugrf81d6rpqf8cwsoggg9kf5lybxet829q43gxbelsw1shmm1mluep2946j8d3xvb32bmrjw4mdwibzgij6si8a6xqfw93ted7ga3b7gyu1s6ew4oxndq9m4ohoz5jydyn0ytbx4qhp84a3i7s8w71',
                receiverInterface: '5teu3o2cb5amxjo4kj46sn2543adz2zv9y8qyv8fkfkhjo6pjooh9zypjlcsq2rijambav51j2r0siw105cwsk72pd3z8ze7oedmcqbeifv18wocrdwuuk3jrkv1rghbpnj0rx8bonp1j1w7ziu7e4izjyhhn8w3',
                receiverInterfaceNamespace: 'ngr4e3cp92duuqezl2pw3n927lp6qoaubxcqj7opmq38tmlqa52cjqgw9te09t6j9g6fh2km8l9yo13f0gpbccjcct0zg6tjrt0t4dhowm8mbkaxly5sh1hby8mfou9r6mtnarbr2i1sohbh7hdawd7yfc0lf7jr',
                retries: 3846753554,
                size: 3369496760,
                timesFailed: 6747262265,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailDirection has to be any of this options: INBOUND, OUTBOUND');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: 'zum0lqzmorswn1ehzmnvwh7osrgnizjt0kc7c9udswf2de0gg7',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: '50mwjiui9d51cz8d2b5m',
                scenario: 'wy2q925ignzttz4u14nw0x3u5i3rm1lyhpvjspoyozdc8pea3c30urbe32r6',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-29 13:04:43',
                executionMonitoringEndAt: '2020-07-28 19:02:01',
                flowHash: 'j3iuz0cyu60adp9javsk2qkf1z8qx12ks7646pah',
                flowParty: 'aymx0lv5skn8o6afc5d1bg8gc3wrgf3f4xaq242k4pxb50r3e8faaut4zsfrkm4gnl07ft9978cyqakfxhjpkna2nncv1xxg0gz21dbv2m14t39okc4z868v3ffqgvbfuivtpq7woqwj0rle8vfg9c1ah04us9s5',
                flowComponent: 'a3v0d8ju156vu9vsp7jxgvwovsexc9zhp1dzp8udh0d3k6wue22u3cydcvvd849cemdig4ml7dp55dvsr1zmbk4rzbo4utv7yiyxj2drteuipoxb4u30bpjt842oc2gpploexqzalx369qkc3cpf9mqrichgajq0',
                flowInterfaceName: 'hdoww3x0cnchjhsktizx6sifri5o2q4bvjjw5eqejcugfa8nzid0xtq09s8jk8r16pjue2eq4jif46uthh3ubskc0a4u6recczoxhmyjovi11sxf2rzw2i3qgkp9ziigksgh2b6qoqri4iur6t4x5qi6zu4y97mn',
                flowInterfaceNamespace: 'z5azka4jrjvc46rntfln59jwpdlm6rmi2am0aid4sbuhis4wvrn8rrm0daavxjvz7bovmdl7qq94kvtqi4kxt2spg08oql7dj7uchxu4137rqipllmzdr8y9vzjzcq52jyflyqg5sszuxwetk4ccubp5c029yqj2',
                status: 'HOLDING',
                detail: 'Perferendis eius est sint asperiores laborum ut. Hic quia dolore autem iure. Magnam dignissimos fugiat impedit. Perferendis perspiciatis officiis veniam occaecati est quo. Amet qui omnis temporibus commodi.',
                example: 'frygjbedmooc64xwkru1q4zz2odcvy367k8aq5dngebfr46k2wlw0oltg0xu6ebfrk7y8hutspwt5hpbccpyfv4s0vuc0128020f552sc16rwgokeiv8wzlurb574k71b7alp5m5vjd6pqv6tz5y8bp6zsms64hx',
                startTimeAt: '2020-07-28 21:52:07',
                direction: 'OUTBOUND',
                errorCategory: 'oybw4j3t93eqy56qz0mj3ti6qjqr7ai6h8h4c6wgipsbsomyv8qsi8jw3og2lv2p3l4ovwneae6mrkemgc9t2h7t9ezyhcfwm4xd0kv7bp7u0ms8d2ickonow3fqffs5n8fajin0mtn9u7g1kqvsmgi4pgz400c7',
                errorCode: '34jfbk7gco35ovmoc83is5qyb8csumhvd1yd8o7i01wubvecjn',
                errorLabel: 195103,
                node: 7477577009,
                protocol: '5pc6mkhrowaj1azzm7yi',
                qualityOfService: 'hkgp50epx9drfqdinp54',
                receiverParty: 'pmrp27q6bp64euczn35p2uhdr4edn7y0ba3zm7a8ptrd3p7fsyli3vqfjngogtwnowrltbqjasd9mrso08hunsydgrbxpnrmfgjmpm8bqhheu58p26vjecmerhaxxbsveyy4fft3gocxffa80ic0oqijfb8hvwxc',
                receiverComponent: '2aq0hw7yieg72f969nxh1e7s53cfsg8pvklfxor4w2xh2xf69c001loaaq21ymf4vlcfhazc7tgy1m8jkiy8klguscfsmtyyvku3pqxc9fxz051ydak26i4va9ersz15cmm482gjzjlxiacd17n842fcxy9ae2ku',
                receiverInterface: 'fi2z21k1zrnncw00h29kj01seu7b4yi9pwlr6iyfn33tzrrtvpuhgpiquwlib0hwgdyb6oe49bg3g67hwiedxtq4do7z768z297prs3zei9w44nfxs5nwkq9d9ngtgw4sdrlh1ztxk1clavpybm2prpe8689gc5s',
                receiverInterfaceNamespace: '009iar0n5foqz6277vzbeyv0p62s2t6yvwzzomhdrdcq8hi8zgnxzvwokx6ujh5s4txaejtscx8zwivt6rozz853kfpb77o07i5sz692ctwy23ozj2280xm87w5sqftki61d89jioh90g56esxzvdbmo9fquqy45',
                retries: 1325507161,
                size: 8167964854,
                timesFailed: 5135127001,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: 'mgjty3i5amxakeugw7qead43mfsjafzycczon5s1cwuks2wd7y',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: 'peyv8wq2yngl6h7svi6b',
                scenario: 'j25g6xc757t9y9ilbopdlct6wwk0z07il1ot0wr388ov1mr11cepitqf70ur',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 21:55:29',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-29 09:59:30',
                flowHash: 't9jtizseddjhugv9aijof9eu540oqfanldr4fanr',
                flowParty: 'ikx0peku3tsy46ddlavt0kdixvi5vv0h6y7xdhilxby0jqyd41oesirpf08tlovcokw2kx8eycuip0obru5m210wnsa0d6e9pw50e61w51vhfmnwjh2tqvqr8el7hycyrsi6yvrq69yofhkahzb6rlwfc7s110gi',
                flowComponent: 'xevdg2qcc0xbiulkcr8ywifvu9kxm9ou3t261elfajymuhgy75knk7ux2uf4blax38cad3er1984lyml88fiyan93xu6j3ldq3kfiijd2oq6n954orj95k72stdoa01rs85s60rk6romatkoeiny8xzrjxtlndrh',
                flowInterfaceName: 'ahzohhpm53twfty18x5e8azo6dftgw480istgiqby5i8b5klpjs06tkkkq9x6td75cetfcqdy3conlqsachk4eeolv1j81fl1c6feqxiewc1xn1537v4mkq84qgn254pv40b8f0q7y7ck00crxpwkhb47dpxlbjn',
                flowInterfaceNamespace: 'vll5xocljm1qytjguvzyqllxz4x12s4e6y1qva6ctdemoxqc6w6p087js9z3jvzkv80zmf1tcgjmp71b402gyepu8cf3xzxwz133rjmfbna858bmy4hknvsvi12ah6io22dsai10nmejydjkyzc58xx8zduvkto8',
                status: 'ERROR',
                detail: 'Nostrum odio accusamus corrupti. Provident vero dicta rerum quas. Earum enim deleniti in.',
                example: 'qtwowhtz01opg3o6d72uhf9gzhx556vmz0e2ycqcjfewrkf7b28rvs4y6sujasnuoplqg0pm3h20ffp0l24wlxzlth5s2dgxf2oabu7u9aq7qo559mjkwbzzmb1c0r65nxlwiouu7vnrj4ckmctqkk0vrmgt48em',
                startTimeAt: '2020-07-28 19:24:35',
                direction: 'INBOUND',
                errorCategory: 'x2up30g6cegeyg8qv76c5hka1tt8ne92rdts2efwtr2wjge3x7w4ha4l1td8ulos963gb447ft2mo7a10pdokf1nr7fezycg7pbashxn34amszc89cbllsmha2p8lxmj1sqapvs49zzlxyhdh0urxi46krks2w5q',
                errorCode: '1wprb0kbfz0fg5g5n923hj70yyqybd8w3yds409y4vaedxa64u',
                errorLabel: 246640,
                node: 1057610312,
                protocol: 'tp8wgug8n3rkvqtvd427',
                qualityOfService: 'iu0ka9kq331z2q0n62kd',
                receiverParty: 'jyo8w26og3sepz1f6e4wobyi2oziheprvvsii9npvbvnulrz67jbaltdrzevjr5b5cx7hpv64b4s81m1mcrrinx6eh2m45sss27n6jd8aqh0cxdi5f0bmbvt0489i64pmoju235fni9z40p5u2hjub1udxcnhkz8',
                receiverComponent: 'e15mvjlarhn26nghmvh5n9t8m7baggnpqeuehzl3p9elwevb7xrh511h6aqmlleoa7cur4izyfswlohnnbne42qdbczsafka7xtn469okq866vjqj64c2htas94x9maktbl2bm51ruxoau8aqr30l32fh89x3ag2',
                receiverInterface: 'pl2rsfuckhnxsf60aou02k7nom82w6p1xnc4ryvf6n05ly0v749rx7razoicliu52mmcd7md77c7wj8vi1runkwafucivxswesjlvppeyjwtp5zh5695l5uwndic3zntlxyt8v6rr9h4kky4l38u9r0zn6kv76k1',
                receiverInterfaceNamespace: 'w699hkg8sm7cj6l14al9iuib7f8k4xijb422woxu62u4icbp0ox30ghwnlu34xfrezr8d4lbwt2hdxfxzctkqyb46xpc8ulwotcso4n3l33jhooe7pqw6isqowdcwppw3hib8usfd686nerzro95dslr5sy8l0ar',
                retries: 6593257359,
                size: 2417641571,
                timesFailed: 1557959257,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: 'gg2uzbbs1dcc9wu0xi5577rlzj3stk8z5eorjr0yj7607zqh38',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: 'lszamw9q8jlhahhk178f',
                scenario: 'xmp2ae5y82t95x33uxbwpa8pmfjpo8pn09xqjfw1wn0royhy6ngsyo4np78b',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 22:49:18',
                executionMonitoringStartAt: '2020-07-29 03:59:51',
                executionMonitoringEndAt: 'XXXXXXXX',
                flowHash: 'zjvuolxdoy3eylpctmhjm0ggboyy8c7sxkvasyfw',
                flowParty: 'znop5frrd0ms2syqhid6p9pf2iij3r7yly8fwv09d569udx7m8xxoscs6lokaabv3c31m9e9792exd96h2jjt2zpipzexdlrdap9uetau63vk9nmytbq4zn9f0ba88ygth65bzy258nrrxeg4xt4rcbsga37hxew',
                flowComponent: 'okqn790udv9s6ejg3tjcw2tzvdw48czra26dxxg8thxwp8vdfeiat0gnz5tdwoq7moj82cs0kg3prd5zefmfhju652lrd5cm9zh2bah02plhy2po1vecvlfqsz164tfta2o5a0oro6oi80z4elol6ohpkk7w4438',
                flowInterfaceName: 'ma91vvlzlezstci0slcwkzc8m0skj2sr8edkr8lp9eld9yha42dk1r6g5t5jgbijz6pq45ns7pcu2jmbg3ex273n8lrzfrgnbiuj8no5peil5chp66vk46r8w5jvhdl4y48uoymhfo7amqt130tyk6upj5u038vh',
                flowInterfaceNamespace: '91sun7vo2dleqgqxbqnf0ptcbcdabnqqfu63txfahagrbalxim6mocaz7kazbqmn9d223phjv3splmxdl9hz0hy99yxnhz36sal4r0o9ls0u4owv2aph9ziypu13577g6jgot458n31mrgaeiz2r7czffm8138tb',
                status: 'HOLDING',
                detail: 'Laudantium omnis temporibus nam perferendis eum suscipit ut. Aut quos autem id quisquam beatae voluptatum. Aliquam omnis sit quos. Sit ad amet et et maiores est. Minus sunt voluptatem et et.',
                example: '98wuuks5696lq2jyj70tr71bx6ygsrvum2w0hqbggd66ab95b96uhyl0ckpyg6dwlop37esxn05idt1ni2zx51c858fyeyjflswhnmxbfr6cupolxleydd6jv2bf7vy4tsx4k6enu1azqy3urf3ec5i1vlrkqhax',
                startTimeAt: '2020-07-28 16:28:36',
                direction: 'INBOUND',
                errorCategory: 'ngpvnkl9zbtii8u9ketycqi2p4scuasqfnmurjwvrjmke84kdi0lhjd8sydy7a1m715w8gspyqx87pcw3cvp7t1pp0do5vt6ukuwyra5c5c93bwrgvptcjheo6txwh47wy8kjr72umve0piwq2ahptsg61nz9u9k',
                errorCode: '7qjsbm7sike9rkf0qo5r4fvbktbq8gb8d4va549p180ssi3j42',
                errorLabel: 622706,
                node: 4369410069,
                protocol: 'uy5ji4n916m1whsb08y0',
                qualityOfService: 'pd34ql7b5fpx9s7tkewj',
                receiverParty: '2al5txka89v2cij91qt62d43uiayak5buyoz2k8vz02hwsrezkc6thbq2rws3wds0lhosi3vxy0s1vukqq7b3o53rmoowm8us9lpuwke05be6thl6ut9mebfdbwd0l6uztxaftxjinb3kfq0c6bk469wcdpb27ah',
                receiverComponent: 'fv0i5bnpzxikq2gipznhpsxdjhemzj80v1wwovgp464np0vkp1wh920q8zuanxyme8ewxeqmdjikul961ygaj51xy4mdy50or9ka47i99rgfmeqxzhtops6rpmawkmxogjm96ubqloo7714c7yh33jmul75gbk91',
                receiverInterface: '9r2zdrq2oljj5xgovmk2vymrnhi92xjd2zely3z0rj46x5an9a8sy9790zesq68zn1e2khj98n9tm1hu9wcfmeta2znbxa78kxz9hyg0f0f75ltkw1h0cn5hu422yu6hcrx90y6gzbve77bnw9nxsibs3js6om8a',
                receiverInterfaceNamespace: '1phh5c7sk2y1kwnuhodf3349jqtf774ucd7ophoybeh6drntwsmix894mf2ifa4p9kr489ovr5p97n6mtgkirpkd0ehmfnt4o2vqkpeyto282oyrc1fqjiyyso14he8d3cbjgc9v9sc052xnn25bpq30xuzsjuv7',
                retries: 8170313956,
                size: 5095872509,
                timesFailed: 2770822878,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailStartTimeAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: 'vsd6fby9xttcr2xi7i4vzd8ybhkyu2aya7u4rxhcx8locwc8dc',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: 'dx6rzqlv409upxpl8206',
                scenario: 'exomfyt8ypps98epie58jp7jf5x2up7wupbqxmmggrfs3munqa50a7kqyttu',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 17:28:14',
                executionMonitoringStartAt: '2020-07-29 00:32:35',
                executionMonitoringEndAt: '2020-07-28 15:00:07',
                flowHash: '8fyo7i5uu2e63sbkopokjo7o2wtjlq7rske9t650',
                flowParty: 'mpbu7hi1w1h1b1rhgr8v4ms3eoxcixf7t8qurs1d8zuoub9tcerzzudox1oeezxknfjmp8tk5u3hrc58f3crzxfluimbhsx0sfo7f6rjru9odhrfzdc5oy33mvieb3rcjynlvegc2eq7ayxqffvsv134k5zes92e',
                flowComponent: 'gm3yqxkprtecgifpm0nas67t9xscvi562hlhm9k738nl6hg8q845r2wirmjc72ahk4nkph23d6ttwfk5v9faztucwtylub34xnqde25yytiexh7zcd1pifsw9tajb4bi1wdsfdaff7jet3xf0vtsz6tsfqtegw88',
                flowInterfaceName: 'jnv7lnny301t2uuluwjl46u2qf7na8ul47z2gew2odcqfo2riwyyse5effkhbrcyz31xb93yji7b01nu3one4d9c5d1mx98uk4e50dl99dwk0xymg1h5ss7da5zxfl12j169te1lbba8gy5qz6c5sgr1pkhn7d3r',
                flowInterfaceNamespace: 'nlxxxphijdao49vf8sufoefcpzaffxa4ivc9v8c48rjkj899i60897ctqn9o8bpv3uny04wplumcstm7u37ydofr20aialfpbl08eueqacnv3wn30q1535oi8juuky4eiffganuknyy05gxfn0d6r7x8xyfs9jxh',
                status: 'TO_BE_DELIVERED',
                detail: 'Possimus ut quisquam tempora saepe rem molestiae eos. Dolore dolore et. Velit velit qui autem fugit sit at quia fugiat. Nihil quidem inventore alias nisi earum quia esse dolores dolore.',
                example: 'ac8hnxa0ivtqw004bosot67p2an7i3hg8rxpwea2ij0majdced7lgemq4imh734hsgzwdswc8n82oszim3vutqqxxv9ugqm12bazk6n0v5185qbzrxtiqgq771wzw23uby6kzcfip2h0a4g3mw654q3ioz3k9yg9',
                startTimeAt: 'XXXXXXXX',
                direction: 'OUTBOUND',
                errorCategory: 'la65n1c5a81p180evdd1uhn4kkli85qrmh1g1rk33vazdh5485fzn1wy1fdgs6h7aexs1jdfohebtzbvb3fumhhbnbm03sm3r2do6hnmhh00id44hwxl77hhkq94zoou2nrhvv8wabkbgjnu0w2fvqtqh5irgrgd',
                errorCode: 'col7jxcaym61z9uc0u9bup71oibhmxj1bxpv2ahikblxs09r7y',
                errorLabel: 173405,
                node: 2923548371,
                protocol: 'dvvn0u9r1tk8ub07f4zf',
                qualityOfService: 'k8gcg4tngx07jkmph7pp',
                receiverParty: 'ef0b0kbo52134w7shn6nw9id432k5wl6sofdgbypm89drudalrq4jc9xpqc2192yliutcfexh79k8ywgcr2t7spp1brdrbks00fabx7hoex1x55hz5fnvqkxy742gsi4tp796djdwaig1j5ujr8becayjw93darm',
                receiverComponent: 'iogdcqpw92uk91tenlqcdzgyoctduqhunobq9i6uyrz85szhsc4bone1q965t5que8zqckz36s6nhgj94dkvcxc40ms9xe91t0w49ebo05ay29hoqe7fyu2e3vfo5zwyd4dw5mnxbw46bxgr8mmqhgpuqqv91zfj',
                receiverInterface: 'q7tjg9mmfctflqr20z6pa3we2fuk1dw2chgfzkjv50e2lzm63ywhdee5mvyi7rhdnpa9qtr9435not714ogiq8lp1n6xf54kikphcab7vr8dolsha5v6kql08i9zcb2685hve11lbbrxs5mdu9fpoxniv9ond4l3',
                receiverInterfaceNamespace: 'kvgsjj2baxfkqh52ag85kfkxjgnim1rr5nlwgujiba0cb244yppws0uhijh1mmy93j2jbl0xoc4cas62e9h6j7rpiierwol6psm8mgjwvqq80yron9az40s037f3f62qzksd3p0ws8vmgprpmno5ikhyxsz4ao6n',
                retries: 6259276206,
                size: 1129353957,
                timesFailed: 4824673393,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStartTimeAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: 'ek73ag6ofxf9nu8831cqe6rlrdw5xh9ceoskum07bsl50awfh4',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: 'k8r3ek0i38y7f275vb0o',
                scenario: 'a78xngq9ht0a3cikg2i16jhqzlrto0avq79k7xdb41gw1tff8aa4oii8k2q5',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 20:31:08',
                executionMonitoringStartAt: '2020-07-29 01:39:44',
                executionMonitoringEndAt: '2020-07-29 06:11:42',
                flowHash: '9jfib0z1gm43lh9ctlswyau0xap8bray28utbho7',
                flowParty: 'avc2o8ltieq94pcpvlj4jmebsxcecx8yi23xzmhqm3crpip06bn0yqsc1pqjv4yn2bjjeovjzvlxohurmkzhlmpyprn1h6ciu4kk6ga78m1mrgmzz57env7gx78ypu31hy12h1rircg1ek12p8ajpldxkxejc84d',
                flowComponent: '7gqrwxebnthind51ojnftaebtybgnpzqesvy572c6z3wyahvtiy9w64wb0ijjbwyczmzdcyrj3igtacnpykq88m2feviolfvwt9oasqey0xk1te3lm4xzadjw0npe87vyjc8dmge9eq4sddgjt9hoy84ngwv0zab',
                flowInterfaceName: '84s6n22u5vf8aypmmff60e8ldi7kgp94jg378hgx6jmtjbtiea7hf0l2q9jlnxkajfufipzy59w6xghj817da4vuq0sqqkqihi50u18530233bie34ty9333swquz620lfhsmo4eyjzvlvojseue9oviule0hqwr',
                flowInterfaceNamespace: '2zha95src9zynavow9bs0wlbbsi1zcdl4qzfhvlw8dz1vsvwqdcn4uwv75iyniu0ytif7jjtwktnd2lhj0yy1snatcm5s84tlm69338767w74zg5bq6meodvjv2xoc95ta7tr8vlz9kyofe0v28tfsxsqtsbtpld',
                status: 'HOLDING',
                detail: 'Eligendi consectetur et quo consequatur. Veritatis nam adipisci autem error sunt sint doloribus ullam. Neque dolorem suscipit et aut molestiae incidunt.',
                example: 'u93306ddatnv6fqghipnmq453pm5r7bbq10wh9212gxqob38y1axm6ipj4blmmmcfduk1dbc7q0mtlyxizhvlju5swmmol7h16e4ym5qars6vs0yx63eaolujrdl6e3j2c4pp3jlkp0hjdw4ybj4v3tqrd3ch3es',
                startTimeAt: '2020-07-29 10:02:47',
                direction: 'INBOUND',
                errorCategory: 'wo46xcrn8f8z7knqdn7lfw611kg9gbifwsd6k66unqproah76rvs4hnh2vfvcxymttka0t0r7zdsby3fu7agpypcih9kw6rjegnuttw7gzulzw4hx86flgvvobhbnu87y1u736hbvemcws5k5vzwj41bkhi05y7h',
                errorCode: 'y2zc4lp7ou5cw9s7hbotgxws63vc6dikf4l0fk212hrn3xm97v',
                errorLabel: 510921,
                node: 5997509461,
                protocol: 'j47oolo84h8fcxf5az17',
                qualityOfService: 'rz3r0a5tbz17xak6fy5h',
                receiverParty: 'd7ufxmclu083lfuf2arogcmkqr1hbg55fjqyyc85ogupsrjrsbcv6tlfy1i2xnssx70dy5bizns291ecdepqilyjwzfdgezhl3nf485rl5b3jzbdlldfdwzlojulpsxqb13ohm5jq1wt2oae1f89o9f2txw7a2gg',
                receiverComponent: 'c7ykorncj84lbbokhl66ksjw5lxssfyy06gn68w7am9du156jp3gmv888mdpfh8hq0i50q3m5bwp7ytvcx4yvznc05nr4hal4wwfvdjzz3ltwubbombjixh3gx1poi663n7pm124t7z11c6lk9bovndlpz6o0zaq',
                receiverInterface: 'tl01elatn1vnizswk9qa9956qsb38kg4x9eqy5pae6u718v4rx43lvyza2gbcfuu4xx16q0qpzqzt3443t6djtnuhtw9cxctodvw26j0c8vmqzhxehk7mpw6u3tzbldvs5pfyudvgpucrql92atdwwkxadnadq4q',
                receiverInterfaceNamespace: 'k6nu09v0glbwv4051nr73eunwb8ozzuzxcw9gtsl3dvgfhple65p496cfbt0kablu838733zdjkibas3whdhvhipzavy8mivnddvt1sncbnoc4rlz26uikoj0wab5t51msqx3012hfu3b08do6jlcxgmfpcq9yls',
                retries: 5294903818,
                size: 8697266298,
                timesFailed: 3402202371,
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/messages-detail/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/messages-detail/paginate')
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

    test(`/REST:GET bplus-it-sappi/message-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail')
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

    test(`/REST:GET bplus-it-sappi/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '6538794a-87ec-4570-8e7c-7d32b64d10f2'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '6538794a-87ec-4570-8e7c-7d32b64d10f2'));
    });

    test(`/REST:GET bplus-it-sappi/message-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/message-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail/6538794a-87ec-4570-8e7c-7d32b64d10f2')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6538794a-87ec-4570-8e7c-7d32b64d10f2'));
    });

    test(`/REST:GET bplus-it-sappi/messages-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/messages-detail')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/message-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: 'bda5e272-9bf3-4532-904d-d70a47672d0e',
                tenantId: '5b5304fd-ab1a-46cc-a710-f75e288948be',
                tenantCode: 'uyg00k34i52nv967uc1ygxg20ss99az0s3nzndmqvn9snwf633',
                systemId: 'e476a6cc-b66e-4f07-b386-6a16b4946ffa',
                systemName: '4fado5jztvqq2eu1qpfw',
                scenario: 'wsx5lqxkgmhygsl9i14sefsyfqo0jei7kic14rzmw6ohtfzhwj1ms62jjxmy',
                executionId: '64fa5b53-b131-42d6-b341-e48fccc7d2e4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 12:22:55',
                executionMonitoringStartAt: '2020-07-29 10:43:12',
                executionMonitoringEndAt: '2020-07-29 10:15:25',
                flowHash: 'sc54kidjqothcdqqpfbrm1h5p4mwo45hfvlicu60',
                flowParty: 'xr0pi7xbn98p92i85ahur3zgrrnjmp0huhz2yku829080qp5gq69im5kiqzj2l4hnhgfd0afkre577i03ij5law1nl9np7a4q3n62asoudcponaqeal4mvjhohyuk4cugh3s0x7b3ci08dyvt43vqftdrbd8fw6i',
                flowComponent: 'l7ts8n5go84k1gkwgtx7ri8pa4trs1zuj98mabvlh097p0l6l3nh9o9vqls5aa1tjziq2vopeep0z7vd7bs1vndheosqz8vdw9kukx7kiluvwjp0t1ptn0zr8571s99neq1wlqg12mfno0e9d7bfcszyzxh2mymy',
                flowInterfaceName: 'iqpdtw7gc309csxwhz87de4n2lwwqk9qr2336c4hya4i6slbub7cthxlqfbn3xzt6pr5dqu0qf70j3aszppfclna47dx4c2gdqs1olol4fpzmfd0em0igqctf8npyub8q7t2netulllm7jekabpze0dudazgpzc5',
                flowInterfaceNamespace: 'qf74cq6mgbm18a6a6wn2lshsqnb18yd18db5n3pum9wziyvdfwwt4p8agcsuguk4hhcmsuayass51teshkrp57072wgv1kki756g1r3le5b7dv0125iq2nbpegzn1kuaflppma792nxsal6zeiuzrjopiravqby2',
                status: 'WAITING',
                detail: 'Quaerat praesentium quasi omnis quisquam qui esse deserunt. Esse distinctio quia. Dolorem odit id consectetur. Quia aut quia occaecati. Aut officiis est nihil dolorem nostrum tenetur rem.',
                example: 'dtf375z70o8qcmmdv5qh95izxokvvseckf2de0jtpavx7mvpkjtd6kxzsuoebcscntndwum19idc4yd848ul2na9amnor3lq8mwduujk71x1kt1d6vshlq3u9gjgbe8fz8yu1oocaql2c3ya49au8i4fybt3qvja',
                startTimeAt: '2020-07-28 18:09:27',
                direction: 'INBOUND',
                errorCategory: 'rxay2mw0mm5rtprhnpv5mypuy49spwrhlyqufzs1x6w8hiroi2e6zcxtxkrz569iq7e9fb4tp1jri8q5txisdq6fm2ise35um6pv2di0t3x148cnckpdoh21766bbv8finxsp8abymujvhyfpeou5tm6y49zc3hb',
                errorCode: 'h74u27ovc31wzbhnjwxtqfc3jfe8sdxcjhct4bwbec5ixdqfe8',
                errorLabel: 304624,
                node: 8116987004,
                protocol: 'dm4i3ca0riftsozfmpd6',
                qualityOfService: '16fi9hnwj2l9qyg5zf61',
                receiverParty: 'nbazsk024uhtz0ix0ja7zhb57120vza1wxpctzz2h4aqqdnj5130rqwhclmsbkrhipw9562ewfkr7vn3x6e052z29qw9o22tsjfss89c9dw9f4mm9ahq9f6jgihk2e9fem9jp7aw76v7ca8e0fniqii35mxnbm38',
                receiverComponent: 'vt18htx34qhppmg1rjftq6sswryzw4t0cvkvn7p7x6rafa6yuwgybd17wvnqxr2h84i4fvy5j76gz9nm7hukwat9jomwz5986ry1f4w7h0d0u80xdw499cq3hj0s0vls8lapls8f87hq6sdx4xskrcw8emb82rcl',
                receiverInterface: 'x7txpy4qvopza8had4jmg4zhrychbkan1p9w8fjn2sh4cyg7zn443yrpdx2m2z29zkbus8hpn3vyqff2pjmyzgizlok6c8iwnhwryobhwxivua90uvc634p3jyu8s0cc2yg140osjk8k0c7ogu8slfr2sorwcb5n',
                receiverInterfaceNamespace: 'p0wftxqpnvp8ccierk92bwypig1725jjry7785mtvze2bwik2wazwga1bap5u8mxda96rhndq3ltj4cs0l9s8x6cpck83rmn0t3fbmnkn26kze6fhe64o0uwb0l0ivhmarffor019ktnw6mvjeq6oppo6ku3j21i',
                retries: 9906887705,
                size: 5120348611,
                timesFailed: 8930009332,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                tenantCode: '1acifcpleb9rw0d17sz8of54j95kps9l75r2gknpnu7itx3ira',
                systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                systemName: 'slgi5us5a4r7qos7fjxp',
                scenario: '480g257ivkgqy12djvipgfw137h06owjhre6gpjkab4gi435i75inx1m5u00',
                executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 10:18:25',
                executionMonitoringStartAt: '2020-07-29 05:33:39',
                executionMonitoringEndAt: '2020-07-29 08:53:11',
                flowHash: 'gy38yc03boq87tebu5ojouzmizsyoix837wl4w3z',
                flowParty: 'ay0oh1ad0ml44wm34fu8bsqj8mwgkur5b3wd0cy9os8f9w5rjc268lzcjwx1kvg4ygnysnu9rzrk5ecyztm6nhgzrdtvajkw8lynbqlajnyh9a8mh528dw3wgl2crwb6rtj6myi0ewc0wg1atr3dgodog5za3tq2',
                flowComponent: 'x09qol5ud2l57igjehikhf5ry3pmbloofs11wcl5wweogiyfog7wnxtfi4hwa9ahfezwlgzjgaob1fa6qkqhqkmwzbv1mg7a6hxv0xaai5eat04iwna3pgadauaturuw3mflak72odd0ctpg91dbzevoie5mixa7',
                flowInterfaceName: '00knhq1v1k73u50ikq3bzsr5izrnzm2y2h0byns96ze5i30h63q45s3cidkt49lg5ekqajvgct75ky8sbrrqriau5f4wcl9v1v89tg29hrtr3ff0487fq98u4x0lqdi5ttv5icruzf6jcm0crirw27yyr5ogx7ao',
                flowInterfaceNamespace: 'sf5nbs5jrfnks0f67hbgp0ssrx4xzmtjt8wvdhhyc6j2g4ylsnusvcu1fm8r3f65owkdcfvs1j36avb5w81kc6cx2to4gbdrzmsywytsip6tdox6kl5fe81iruyol7jbjz8ph219p8afko2owrowqtz6hmy4c0o9',
                status: 'WAITING',
                detail: 'Dolores molestiae qui eum voluptatum non quia cumque explicabo. Necessitatibus autem sit eligendi laudantium et qui. Praesentium ut pariatur tempora reprehenderit quo ut. Ut perferendis quia quis est. Rerum id natus voluptate accusantium porro maxime perferendis culpa et.',
                example: '3csi4t8fpyy83artzwjgj5mpxyp698e9meo5uj7eljmw7smzgwzrmy7e2bjhfc2dnj2gt5zd0ab5htss4al57j9gk1hri798ln8v53we6saq1at88i1grq1w92wi6ynd0482mbq6to0p4mn8r96i4eim7utdux14',
                startTimeAt: '2020-07-29 12:15:26',
                direction: 'OUTBOUND',
                errorCategory: 'm7x80yr4dtzbehjuuicf0qicq0vax5pbuuynwuvhyvl9e9hrtihdg3wfawu1nz81e4prxs9cozkyy6f150nurryap16fp9wys0z0go4q4etr8o48f5naivmrlqjb7af5inhirzmslbkm2j19s5iwri213nbvplws',
                errorCode: '2xxk6uxpyjee4ylhgf43tv3t4sy8qn0xxyo8dvmetmy2jnvacw',
                errorLabel: 396230,
                node: 4742516785,
                protocol: '8oskyyx5mlqboujx5nu3',
                qualityOfService: 'efq6l3yv3fm9purgd2hr',
                receiverParty: 'l5vlj1vmq6xpvhvi5mp4oiem5mx46kl6jpn84abm9w5gzq3jc1glxtvmhzodujcsu1dac2zs34pgq5eaugymvremjuyox3lxuswgxuxvn9aqi67vopudn8usa467ns4hpw2dpy9l9w1satkb9azkhp0qsy7oopxi',
                receiverComponent: '9qwvkdffk4928rb68u0mhd9h840vfo9b3lnox68x6823wey9dyp9v5ne87ih44c8xqkhvkdrtiiuj27wanixj3x84k4raipkdzyi08crjx70jvquyhwwhmjxb8wbpqxt59s4e0alwsp6es9kltqrxrd9v0dv4pj3',
                receiverInterface: 'qhdkyre5j4dfj6c8gxbu9ox84onnmuox8sgotuy6l4jcl8ldtcxkgqgkfwsn2vx8myteehapgukh2ned0hfhgyg8xqeecxqeufp2wfqncs8ci9cssvjohx6y6od9xgcvc10bv52fn8fzmcsacuy8fec1njb0beaz',
                receiverInterfaceNamespace: '3itd0j58ixz9x0i7us8bgqnmrdbj9m25kqpry0upr61lhzer1ppfrs2h81b615cu5hkudka3eppueidlp3quqwieban83ogopej8a2e5yt9lcpcn1kam2kpw17wd7p7gg0y76s2s9me1wgxalmgytv6nevmkjgpv',
                retries: 8003136128,
                size: 4590466994,
                timesFailed: 3902951545,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6538794a-87ec-4570-8e7c-7d32b64d10f2'));
    });

    test(`/REST:DELETE bplus-it-sappi/message-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-detail/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/message-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-detail/6538794a-87ec-4570-8e7c-7d32b64d10f2')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateMessageDetail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateMessageDetailInput!)
                    {
                        bplusItSappiCreateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
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

    test(`/GraphQL bplusItSappiCreateMessageDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateMessageDetailInput!)
                    {
                        bplusItSappiCreateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '63795abe-f00e-4e5b-9084-3fd143f818da',
                        tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                        tenantCode: 'ukn2wlc6o9p90f0uumqb351pmdobdsuwryzinxxxsiqvn02nut',
                        systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                        systemName: '356k7lgpwlhud5u852qn',
                        scenario: '9c2ybztd4u8ay0ql69kyg1jx7sz5h0kgr5c6ugcrak3ehzk007ty0k2vbtua',
                        executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-28 23:57:41',
                        executionMonitoringStartAt: '2020-07-29 00:30:54',
                        executionMonitoringEndAt: '2020-07-29 13:08:45',
                        flowHash: 'knxpn9l87trty96hilp7nhw1pxy8sm9nq4gq42wa',
                        flowParty: 'zt5b5a6ojwspfr1huxwv2hvwesh439epg0ebwsua874ekpaiqb9wd2f3c96amat9dhixfofko3ya9xghn6sqsfyn17qe0lohewin2rn9pzzdhankw0d2jnc4cj197s08si1wlahnv7l3ur8wf1orr1w643nel898',
                        flowComponent: 'ddgmbuqei9bn8efqtr62ndsfgm52zhnykv8p4pu46u925ahdbblywipxpyc9wqlnslsalcauc4ls7nclr2v23496q93gr6nd24iozco1dow3xslwacwe7tnhrf2yb057tdowovf123ok32gr77vpfpwygfia7wdv',
                        flowInterfaceName: 'j9fa3mxwz97rvcaeaficufi5odd1e8a83v4o3ojp1i8eckj3wd5axuq5dtetlbk6nene4nqa0qyqbm7376wy0p7h5i5zr7k7fpjb0mug6rmljtw6j2kngpgpgj999e3ounh9ux9t83go280u1tzws2bb41wnfyxg',
                        flowInterfaceNamespace: '6dhldrjuj8lvas37to2u6y123k2mzlhy8l3gfckca476buxw1x61siq14ealp50ce5fl0luzojs4f0wd2ju99xkjp6pu3nhple4uqh24fm1f8n3ch5lvgqaz5277hcy95ik0zbufdifg4oduiouuog5l52xuer6g',
                        status: 'HOLDING',
                        detail: 'Vero eius est ipsa necessitatibus sunt nobis tempore rerum. Fuga deleniti quam sit. Rerum molestias reprehenderit repellendus sed odit aspernatur eveniet quisquam. Nam animi ratione eos nostrum dolores architecto.',
                        example: 'h6zhge32ju78qsxohvaqxy7mkdx71ry82zl0eyzekeluy373l6q4hu3s82twt91d63bmtfa5l71othnmg6k9ieso2nqh5xuifdn3pq9ay85oadfinbzxzbu3nyhxebi14atf0c3w70inrlgyzm01asem9fyuwdv6',
                        startTimeAt: '2020-07-29 01:41:47',
                        direction: 'INBOUND',
                        errorCategory: '7t3ixuj7s34bttuzgapyosth5iu4awezb0qku6zmdzhq7b8pc9x7g18exfo2yto65j15ogjf1fh4suepcy9e54d1k36rqc7i65vtqh5318rrisl3rgr1nao0erwiccvk8d7kg10s0908n9pr8u4pib6jf1vug2tb',
                        errorCode: 'stwe0kn3ndtozsszbo8dp16znzpf4nytkp6cl7m7ug0mjdu5hi',
                        errorLabel: 471287,
                        node: 4057928384,
                        protocol: '350kl1l7o4eyub5u0g6o',
                        qualityOfService: 'lezux44eksthrw2isv4t',
                        receiverParty: '0lrp3ty4hnzicho2apxafffz46yc76qtilg5hgyj2sbisy2qgoq0bd76yltmfnqmm8pcihpbmmw1dt47df9dt6moduy9264bef34peatmubl4792udafh7j6035m231hrv2wri3o9jqonhnd3nu3rcu68rqryw16',
                        receiverComponent: 'i33l691rmyi2nl42swf3lflugvmn5myehj59aq1mqs2p6a1y8ee04ztza1pg2bu55iq6yeck3fggrbudhkoq1jtww4rze4vxsroxw3ojxvzagldks7aolz7j33z1akm0e8mng5t09ttw86m53trvorwrrngt6b62',
                        receiverInterface: 'hnzs2zibvuz0j4ewjz3kaxfm95fkfxyvxrwbxhlw5pcygc6fgt48mqi1ua9gj60d5n6xlfismzlg7d8t8hkpidc0azu45gjjok317wuzfp1m16071v9lq8e25v36h9kyvh8l9c8pi38urkaa9t47m2f5rrvv57fh',
                        receiverInterfaceNamespace: 'vc44forbob0eq73jxkbh11e8ntki6uugd0ue5mnpx6nt2q1mazchsrqlnesmd8posa7nnq3y8aj7q6y1ramxvyoxxrpef3gci05v48458kqhuwmaszaugp0zb7ay26u57j9hf1vfugd44jgax8ljn8lv0rc1v3sv',
                        retries: 3000820668,
                        size: 9766047634,
                        timesFailed: 3073694090,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateMessageDetail).toHaveProperty('id', '63795abe-f00e-4e5b-9084-3fd143f818da');
            });
    });

    test(`/GraphQL bplusItSappiPaginateMessagesDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateMessagesDetail (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateMessagesDetail.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateMessagesDetail.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateMessagesDetail.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindMessageDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindMessageDetail (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
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

    test(`/GraphQL bplusItSappiFindMessageDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindMessageDetail (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
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
                            value   : '6538794a-87ec-4570-8e7c-7d32b64d10f2'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageDetail.id).toStrictEqual('6538794a-87ec-4570-8e7c-7d32b64d10f2');
            });
    });

    test(`/GraphQL bplusItSappiFindMessageDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindMessageDetailById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
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

    test(`/GraphQL bplusItSappiFindMessageDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindMessageDetailById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '6538794a-87ec-4570-8e7c-7d32b64d10f2'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageDetailById.id).toStrictEqual('6538794a-87ec-4570-8e7c-7d32b64d10f2');
            });
    });

    test(`/GraphQL bplusItSappiGetMessagesDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetMessagesDetail (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetMessagesDetail.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateMessageDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateMessageDetailInput!)
                    {
                        bplusItSappiUpdateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '425946a5-00dc-47e8-a11e-f0d18c3eeb48',
                        tenantId: 'dbeefee3-3fbd-41c2-b681-a35a74f7ca52',
                        tenantCode: 'a9x3z6fph36kuvih4ube9r103i6xxmnm79dtevzx62zh6uw4wp',
                        systemId: '4dd88e85-33a7-4caa-b781-a81ddddf908c',
                        systemName: '7sqyaylyso1jzsgzhzlw',
                        scenario: 'jzt03ej8ou50txrxdaqfa1d4ybvxt4rdn6ztyyctmj1vpb3sibawpokgcutt',
                        executionId: '1f909b1f-4224-4d14-a787-ae0bbd225c3c',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-28 18:22:04',
                        executionMonitoringStartAt: '2020-07-29 01:34:40',
                        executionMonitoringEndAt: '2020-07-29 09:24:36',
                        flowHash: 'i6fynok32u32c90a7jd0f7aaqp3nxzxh6q1obqh9',
                        flowParty: '9zsznmh0q5ryna5mgle3gb53jx3newdjxg245a8mzdoyxdisvp335ylspgromv911tsm4lfz88qmwtowz930cfxhylp0f9p2altgrxb2h377zu01ytoq6cfbelworlgkdumrbn8i6ip14lbi9v1jem9dl6smlztq',
                        flowComponent: '83w620wovmvcnoxdcv54x9yy66mp8sqezspsr1lj4h2iolk490s53qpwqmani1z6xdtx8m916ohgbtwjzwilc1ele92ylwbpqhg62d55ilo34d9yjnlgqout6wr5tx134vji0045oqdqvkgh1txjs3g44ejcgcha',
                        flowInterfaceName: 'a6g2wxsz6payknm32q8317o438fw489vu66x8kzpqk3wupahwvgmxv230fojydbe1omu149lq796vdujkig3vdtsr3pxcr4a4di1yzf0k4122a3y94rfek8p08d47e4bqcjyqyz3f7ynje4v7dpply8z5n1mb6ur',
                        flowInterfaceNamespace: 'flr1ahsddfullwa3o86yt85k5vu77ciuhyfgdgiin2gvb1uy3zefvk8p6ceqi47we8ko4h8nesgoqwyffuk17imfti1n4opu0jcfo61drnohlwq1nh9z901f7fn7z719kxiast5b46zphqhn1yudc0hy2c6tg1z9',
                        status: 'TO_BE_DELIVERED',
                        detail: 'Ab omnis sit at sunt. Nesciunt sit cupiditate sed aut beatae. Nihil optio et sint. Quia amet quidem natus eveniet.',
                        example: 'oh2thwfxyk9d9yh0jh5yzj7pq1e9l9a32yclx06bsu5b6qpx5wxidprqnbamr7jdwpeou4cx8wxdis9uz942vgt265i5wyvcfjambnx1gnojpnbwvyxvpoct5j3nump9qcb3e6hr42vfhwismf7p1p0pelhdd87q',
                        startTimeAt: '2020-07-29 11:51:05',
                        direction: 'INBOUND',
                        errorCategory: '4niyytxmw5t54hf1wsyhwtcw20yee48ckswiks3qy9qc8ibz6yiz2051r506eon0w45mknfmcnttm4n5h831gffmv04th26vbw2f7yl9mxb7n6txv1rnjywq2bn4r17n2mo932k17pd7uvhrbb0r9acclxkq45c1',
                        errorCode: 'j38wrhar4xt8hjbib4oba7gm12ild2pf4u48iz4qw1xyhyfdpm',
                        errorLabel: 730875,
                        node: 4937371349,
                        protocol: 'thhic79xjyioco1ijb0o',
                        qualityOfService: 'zsojaalni1o2lksfgr6l',
                        receiverParty: 'zpqv5lku7wzogjwi9zcxacyn6kh9ls94s47bffd0asuvblwbc424x5pe33cw0yxn75h379cdqwqszbjo72o2sjrfk3yofemprruu9p94dx8u50dbl2bsy1y52x7yfjyxdf1yl9gegcq8k8gxdy1q1br7a9r5yikh',
                        receiverComponent: '9dudhtmgh5p5vwr4q2vhyc5ntd45pf9doihkbnjr5jn0lamjdqrzxcw0lmzs38jtd22uj6sz1mlnn6zva2yg7aftwwlz10rdr2d66cgyeb9vf1wk9ekkxo8202t91i3a5s7xkekzjmaukhhhssr8k2ehux5l5upr',
                        receiverInterface: '9eybyhngak6r7n56x3ivqoez3m5xkbo0y3sfbtipuvrz8i54nwogjxwznzuxjynta6sooctzvi8rsblms4yvhwolqq0kay0ywogrrgwpsty8zlrqdqewx62bjvpzpgocjch2im2lbyro1ewxxq3s1trxbcu97yju',
                        receiverInterfaceNamespace: 'lyoawd2aykwdwczggytqrwtliok06yq078py4wi0dqxlp8kigftzy2x0dlhv9wcztdqlfo1sb6igi3h9hgyfur95yx6pofb505ufl0embjcmwbpl28wxjy2notcpoges02id05ow6jp4ovhx1owou9ph8x71uw80',
                        retries: 2401768545,
                        size: 3045278192,
                        timesFailed: 3315703778,
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

    test(`/GraphQL bplusItSappiUpdateMessageDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateMessageDetailInput!)
                    {
                        bplusItSappiUpdateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '6538794a-87ec-4570-8e7c-7d32b64d10f2',
                        tenantId: 'fc089b46-6e30-4672-9499-ace50a73cce4',
                        tenantCode: '76c9i0lc7l5w6wlo7pzdxu7uhedsccvf9vabh2y03wj2yv1hy6',
                        systemId: '1fb13b0c-f722-4791-8b22-6096eb52a5b4',
                        systemName: '67a6ispdm3dqsx64353q',
                        scenario: 'zln9vfm46dfdjgkkb1qv4hlxotsijgczu0isn0o7mqctfzg8x6v2u2zn8we7',
                        executionId: 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-28 14:14:16',
                        executionMonitoringStartAt: '2020-07-29 02:40:39',
                        executionMonitoringEndAt: '2020-07-28 20:39:40',
                        flowHash: 'w3cvnvn8tjmhbcvjcgpvzc74k8lfnpu0pwkikc4t',
                        flowParty: 'xvijgekzxs7zbg1xbxx1dqw6d68ms96xix9p3wdoixm39mpw60d18soqm76h95kra00oql3p5ygz0swo7ujhsx9sz1p62rr8zqd2ns5oc0e69n870j0i5y1nlxbo53cchq5dc4hi4uptjfanareopzsesc2k542p',
                        flowComponent: 'l0ahryhe2nksh4munm0i3hzpjm1fo9z3ye2cguovbmp1arxt8xph80rv1huwffl0gkvg1jmhsu8seawcv3t5es4vxf8jpmudacqz1ujp05hhsuh8w84qxoxum70weoyimcyeu9s62lpwqwx1qath1weop8kf4fdz',
                        flowInterfaceName: 'w3z1mdfrdmmgz1q77lfc7gyhzzjymx4ggnpssk1vh8rvfol5ab2m56yyumvljyw9noks8vc84fvamij43nqb5ajw9cpiiplped02h9n05a5wb2r4finc47t1prv95t6fc0gwkfhq38ex72iib9oqxl4231rynknk',
                        flowInterfaceNamespace: 'lg8qm3gd6dznocgq3qs58lhcz4nxkkf1xscgdd1dfl0id7o71wg75wsiqzoit75tezkayuzb1prhhds8t6s9fqtqkt30hzwt5il49m1eyodrc4prfibmtztchjqq61nnp817toviqcc9nrovlpwl24pdmefaiuk7',
                        status: 'SUCCESS',
                        detail: 'Odio est sed. Temporibus consequatur adipisci unde. Nisi repellendus nemo facilis nihil voluptatem veniam temporibus quia.',
                        example: '7f7kqifknpwc68hon8v4owqoccpm6leq9t2g0n2ao91mpe9cuqq333bnm66yh7blo7ow0mh66eyqoa0wi8phntgs2rvt0dvjm3a98t6l8r9ack5ltsdlg0oqyn7zirycqenudckhdiu70pq2s59uvoykzysydfpp',
                        startTimeAt: '2020-07-28 20:07:45',
                        direction: 'OUTBOUND',
                        errorCategory: 'atnaimo2ghe0r3cwtntxu4jg957d2qfwnd61d3m3sqtb91ns6eg3mbuz5nxs9gk442deup3b0p44f590ebbxlgx9ztg3362xw153bjj0gvao0u35eu9yugvh4ezjpyrdo39ixdnn4wrv828jw5vxxcb4bbtvqsbs',
                        errorCode: 'ku9r9s2bg50xqebk87bgu2xqr5p2ikak7zwcrk4bqgvkbfpe4b',
                        errorLabel: 304990,
                        node: 2052478773,
                        protocol: '78fpg05tvz21awtb32wm',
                        qualityOfService: 'w09aez3o54q3igu76tvq',
                        receiverParty: 'd9wvddnwfa7kaw4oculwflc1waog4a8umzksv8o4hf5bjb6gh3zvsw0abqrop0eqt7pffslsl32hsopwwn6iuynhfwmcibn92q2gybspd33glnfdtlq80i8li6624aunur5xnywzecibw121f3uu0aeq89r4ggkz',
                        receiverComponent: 'z85camp1chx5d5jqnk6c39fjlo9wi910wt7hn7v4gc7lpop9epifko6jcccq1tx5jg61oyelsl28msnjohgwbnuhx6qcw0px8p4kgky9lat4magkqv0hqfwp64puayhj08a8681n2nyd100pk3spx1t8hxlzeh9t',
                        receiverInterface: 'z7cr1vkgnrwoov5tf57u060012yv301do5alc8df0uema37zbv3azrb7pzicowzcw5verl84v5bxocfgufu0o9bbzeutq7ko68r6aftbhy3okuwe198wpok39x1qadyi4nz0jn9rj6m9y67z0sqpfpcmjns3vlaz',
                        receiverInterfaceNamespace: '6hjfmz1icm9hytxn6irn72s0ey25u6l9pprou2907omb8tyxr3fi1q7v99sh76s0j79zx2223v9p29f9ckx749w9q51mkvc5se5hhoujwqmu9ba0hivxa7kms4poysibn7pg66g8ql237vvvr9zdh3u562jauze6',
                        retries: 9357649338,
                        size: 9867851905,
                        timesFailed: 4409663199,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateMessageDetail.id).toStrictEqual('6538794a-87ec-4570-8e7c-7d32b64d10f2');
            });
    });

    test(`/GraphQL bplusItSappiDeleteMessageDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteMessageDetailById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
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

    test(`/GraphQL bplusItSappiDeleteMessageDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteMessageDetailById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '6538794a-87ec-4570-8e7c-7d32b64d10f2'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteMessageDetailById.id).toStrictEqual('6538794a-87ec-4570-8e7c-7d32b64d10f2');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});