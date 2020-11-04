import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IMessageDetailRepository } from '@hades/cci/message-detail/domain/message-detail.repository';
import { MockMessageDetailRepository } from '@hades/cci/message-detail/infrastructure/mock/mock-message-detail.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
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
                    CciModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
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

    test(`/REST:POST cci/message-detail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: 's324otpjtzc78fgrlxv5gipef2dcqc2tjg2wczsdtwo8cnd0s1',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 's9pwp45v7k4r6ovhflor',
                scenario: '3whhowm2lygja9ax9memeamctrk8mymd9smq7a8ztwc4f8o08pl3vkmzu889',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 21:32:42',
                executionMonitoringStartAt: '2020-11-04 22:28:55',
                executionMonitoringEndAt: '2020-11-04 21:49:31',
                flowHash: 'bf62dmqvhb4y6a2cdvbc1f70icq1w2mjrb32z8sa',
                flowParty: 'uz0px0p6wpjz89z73m46urc6jbwcx5vevmpzsqvoqrxgu4u7lmgzgsyeenwuiguy7r7tvwqp0hzr0nqfvo3bcy7217vgbtcjdxg2hp69ce3k3222y9nlmooc4vebv5io7zzhc659emlw2zca1suqci4a93huyaks',
                flowReceiverParty: 'owjy2ykxey6xx90vr289gageezsva2lrht9a1nv5vgss28w5q6bcf6ktjpp2lel8giihgox405x67yksbr88kkfrgjqwljj29ltz41gq917c306c6f0lii5ez4r1onwgue1ky76l9uzwq05i8a2ok22tyhjnsa9i',
                flowComponent: 'hwez95vzvt67pckks7qwgclu2ta9zue1fou4g1wdhb1db71kaskfca7mkfx6zaxxu9rj9nv3a9709rpbbhqidnp4p719ogi53mpns6nioadfhwr4di55fndo57u225lnzvxs3hk5u9y7jcsw8tf0e5m7cg30yecu',
                flowReceiverComponent: 'xhc876ddi302vp6xn3blxrjkdlg7dmoir8956lhzmfykfbfz5r5ia6smcs1j23oy58tw1az944sqnqj8l4zzzavpb0eihnyrs4davpq6skg36fxjnd0mvf1juadt9l5ftrjsmg894j4vs9kbynawfsfza6kgsbco',
                flowInterfaceName: 'b2f0k64a7uo2ort94fdzafxc9a40apoebtbzsd1yphsggl5b3ib2fppgu9dutk27r5u4t1b0fd4w9gv0x4a4m7s3xdpjrs2ijt0fm0mvgkhl7t5no28n2337bso1oghfqbfkbsuupphwu9mkrdfv1xu3e69qegr9',
                flowInterfaceNamespace: 'r7ni593vxgembni149lfomwaqi7mtlo36kkmr971dnhxav8p4g1zlq3ys7qtvfs1t814snpc7tza2w6bivulky2xffsrlj4y17zxhbwajzjccrr7xf066tpeva8m0o2ow4mdjtzc27uhjfdjoarrhvyb4znnkwsr',
                status: 'DELIVERING',
                refMessageId: 'lhbb9i4vdmrrd9tcrmgodz8m2bqkmf4qc13x05dlfoq6r2hpvr8ut80pd58r4cmjdry1lyt66di9651pr0ohvfkeunsvtaksbz7jjv0b7m1riiwzdihcld5uj0q3vs6w9c5fr4upkjiauf8al2u0uz7zrirbqi0o',
                detail: 'Sed expedita quisquam eum. Non veniam necessitatibus optio beatae perspiciatis voluptas totam est. Harum qui ducimus voluptatem est eos excepturi tempora ipsa quidem. Rerum vero eius dolore. Non architecto sed exercitationem non voluptatem. Molestiae sit illum facilis quis odit repudiandae nihil aut.',
                example: '79pmjl27tagztd84exosy9pidkfn5odv36amje7kbz8mkk4u4hcb3pdhkx89boxwiqnbtmv61sai6tvyr3msgjmkdqpcrc5ytvmcd5ssx5xlusei0xb1r67m8tmy64q9czmapappkuma8l6v9an4x0xl5zaqww77',
                startTimeAt: '2020-11-04 15:52:20',
                direction: 'OUTBOUND',
                errorCategory: 'd4l66usvjz2zr26jq1h4dzfzh65axo2m13oijhyd3e2nujep9we1zqe7l68sq777bt9nlrg31oxx12tucuj8mju1ojf5gh42z6a4iev9jjylc0hlkv0t247n3x1bw3i0uoxe9672nhugk4v4zoff7dqylu22stn7',
                errorCode: 'sz36nq9906wn8sdcqcq6i1bx22id0qllmab4fydmov8htlyglr',
                errorLabel: 692965,
                node: 4849849856,
                protocol: '5k8okucasvnajq557fa2',
                qualityOfService: 'kbraxly6iw49qb7k7l96',
                receiverParty: 'tenv4e3my4ntttq2xhdntmsnr7loozg71spyupcig99gzvs39sgbyyeyvswmdi26zowohumosw79lci7bn2e99chvtk1pkz4tfdy2wobgm0puzotmfcw5fraulwb873yix7jm6pjpyalubcx2xljdurds9vujjtz',
                receiverComponent: 'gdjtzq4pjeayffbbkdjhnmkcpq0ub301fjrs69eldztzd24ekgbfap56i46ajkkdsv2go71eqytaitsbbxx3a7wksaoy2l019mzt2ab39zm4r7lhb7sl66ajkvo93em3z1lmzvd1zzz4zgrjhjd8t58qz6qggsio',
                receiverInterface: 'j1yiolknv93b9rgek7n8hkiit7vkxi0iqgxcjk0s72boy7lkjlawptifpynt56l3r8jwy8jlnur5hl0mgpfiuevryzr4j6nwrqyaxlrra0er0b3im4w54kdp88a6lsuct31ts4k83ptv1fow0yi6a207b0fup2xs',
                receiverInterfaceNamespace: '6vbtesfat7ts7abqo9cjus0snheuetan9erwpag4r2nbnpxpyyokfiyc4qv9ah801hafw1qz32554baggpmklyxk6uvrn20vs95o3isq769j3lspfkjvr3t8z3ymng5af00jb0f8dcff6sn2oh0wox2eia5pro31',
                retries: 9360562615,
                size: 8838448325,
                timesFailed: 5541644723,
                numberMax: 4419839286,
                numberDays: 8185559814,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: '1xbwhgdse4f5adwq9q4wodh6h31uidsmp5jhej4m0don0etncr',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: '7jq2s8gpjn5jnx3dbknz',
                scenario: '563sh1dxuph5sy38h1rdhk0mspflcf079zai28hfqxehq0nq325yhba8pmpf',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 05:47:10',
                executionMonitoringStartAt: '2020-11-04 16:32:43',
                executionMonitoringEndAt: '2020-11-04 20:16:34',
                flowHash: '35nc3knx5gi33pifdwxx41qqsiae3ptjluoa7gx8',
                flowParty: 'nu6v170fnrlbxahpymkzrrn8x91rj8m4ov9mhvskl7vu13tluhcrztyfzb4kl7mfgk9tm7kuhc9h6p8olzwelfuybniqeu387ghyr204yb1ipy9tg0ybkluf9p2guz41phyaehmsfu404i5x8l7o7zr8acm2p2d5',
                flowReceiverParty: 'dgw5xiy7qupf3s8gqlypnhz4bano1nakgft51itpkxacuothov6n9wt35qu5t9ntb0dsdwt42qdrxo63lrdt9rf34vuqtd57sjapkqete9vuo7p4mwpruzzostb6v3xg8xla31lv8s6ncfuwukixwq2rkzdmt81d',
                flowComponent: 'p24mjrvgueuv9o2ewbyhmv9nkqu8c26bsdski2jo4hnaqpi1fwjk5oembtxpe3fjnf10bxh3artiyl4rqakwdpkiaumxwe9vwmsqb0mkb1uby1uby0e9jc5tr8n63bctpxbgccybwhh2vcjv2qr8tvek8pnuu7ya',
                flowReceiverComponent: 'me7knx2972t8nf0etm446k2nahwo24madbxd91d50cnov05molfbs924qp4834mrn8cvgf2aveki3735hk3gu2ss0xhe6u695ib3uynaqzm5sr2sv1ejf54cmjnx2wddw8eea96q9buhm4ib3n5hgz064jisgcqz',
                flowInterfaceName: 'af5uutw9o0brimvmlmgrt2zj5y7irfut9nxmmm264488y0a738tx99aqgpcotey6nhrcwjero6afda6ehtdatdi309otqjpxl2nzime2w812obba1gpm59nkeujm2aj17zc5taudniagzctv7qfthvx6xpb53nsi',
                flowInterfaceNamespace: 'mhgiddx35sq30issy8hgw1ukg21ebwbmoel776xaruherwrv7zm01z87asx3vi2p5thmkzok71fufzhln6f9zaozb3rli7mdq3h3zsvz20cwh9gtw2jwv9hs0llw8vdv8b4escsuffm1s1ru1878qpfz6bwbzom7',
                status: 'SUCCESS',
                refMessageId: 'ucc5sgwj1rzycr86il1f6kylw7fds4bp0e5sjnzcn2756h7mb88g0t1h7wsrbqgopmbecsz209xaq098djd4thvhlyja71iakk4g4fzpgaayehaajpoxl6jupxeu7t7cjtmpqhilh2nohxnepgjtxugrelrzmzoe',
                detail: 'Pariatur veritatis dignissimos qui magni repudiandae. Maiores autem dolorum assumenda debitis aut. Enim cumque voluptates. Ea repudiandae voluptatem facilis ullam veritatis aut similique ab enim. Excepturi sit et expedita mollitia.',
                example: '9xl7nh9cf01djubz4eb0tfysrzyze7l5lmv3uy5fnb69mxpg6qzxl7uspdl6zfcvol0cv2smjq4dppibfw5n09bcur8wnshm3dwasi4jzq57ycfpppwsl61krc4se1gxnpgqxxocda4x86yb3z3rtfs0e45xdgg4',
                startTimeAt: '2020-11-04 06:39:48',
                direction: 'OUTBOUND',
                errorCategory: 'bqy19pjaeb79pnmbu7zg3hfsag3p95ai4my3zsh8rfutfr0kn90js7jzlokwnjxta9tmp3xpacbppr8wcqlclmcl519ghe6js31fuejcb2mkuxmgcugl0zhxxae8kdcweexzh4h26ns1i1h5r2c6laoxjzjyuulj',
                errorCode: 'q3a33coqsp8tpqpmx41aklk5bsyosjf24cbpf3n6xrczr49xpt',
                errorLabel: 216579,
                node: 8881424092,
                protocol: 'aqcsf5qsgsdu24t7rqir',
                qualityOfService: '9gpu7q69z88q1vk5wiih',
                receiverParty: '0z4dtnvaubfg75wb985na3d2l1y60fy20pgc2w75287i38s8l81wkupl3wj0sahzf8v15fz3mht7qck5r8e351mtlncr1p936idj6n2w7vptecvl94k8y4gzo0nik7laxqkotjkho0b205r98jqapinz0gkild2x',
                receiverComponent: '5rh8zcglnfr4dyvcsx0kwpcoyt7oglt5380mozxsu1gb4ytrgcqb9n5umpyj0f4d01pymyc0crswxpo7m59nnczdadhp7qltpkc396akhx8dzrig5nf7q0kfnr17trcbq2m4ji0oc6ai5k1seuw8zlsizfmjxdu8',
                receiverInterface: 'u45jne4rxg5spe78bm864w2he5vlr3w2ub0d2aoglshlfm0yx5z4vmaua9eak8mqwk6dqyftydnaeuubwzyj4lzgem4gjo4kndennzkpecpkaapl5x62ttv9yyallmew6r30zggd1xuz7ndokicibs04j06owff7',
                receiverInterfaceNamespace: 'hvs14eiccm4nphnxcn9nsy6ba5pwkgtewxthv6bv1mqo5azk0jsjapcl2uhvce80rtb6aytq3bvrfw3euvaxdz7rxeg3jx8jzbd16x81aalo7gh919gt3c1cd307ss4snw44nnnq96df0u7nqoc0zqil59ax8kwt',
                retries: 5817326013,
                size: 5859661577,
                timesFailed: 7087088480,
                numberMax: 8827594611,
                numberDays: 5599704084,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: null,
                tenantCode: 't0k5506mgqla2tw6da2qpduex8zh8nae3p98xl3600y3bfif23',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 'ce98ztseqcr5ukmmhr9m',
                scenario: 'abgqwwr44t4yqqc4r7c6y9zjr89lksc98gjxp0bx5hzfe93lx5t6wyghtb70',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 15:19:27',
                executionMonitoringStartAt: '2020-11-04 05:37:18',
                executionMonitoringEndAt: '2020-11-04 05:39:46',
                flowHash: 'bz0ehnhkc1ciffns2uwj5ylljfz9nefpag0hk6bd',
                flowParty: 'n46sl07euax139p9z26oqsph297isi7j89wtz1d7zlk62e75874f3afv4ed6nu2ej20p7rz69cgwj6sjwv1lp97a87wtzp1ea5x5hcxnum5e1xeemk32sw0fxyga6kaumhb01upb8r7voopj2qa4puxonjhkqj16',
                flowReceiverParty: '44dlfcewx3mxzwk17szhyg27thcgi9og8cyz18aw1s2ge76h2ea8g39js1kgwrezhlr90corhuuvrd79tpxf7pvpqleyybfgmhcapw2t1o73xd62iq24iydx1cffr7k4dmdrw5ctle89qjysic0s326hst29u216',
                flowComponent: 'ixp0bu9k9llhxgarpg4646luin3e2dtae55vv1rcye87hlf5p9pju5cntmgh3kw855eaxda96sgstoolk3git7h9q6zl0nlagf4zqxhhnxkvx4nxyjf89m875w4vj332gurgw70okvgeezkwr1jihk3pz3hvcbi6',
                flowReceiverComponent: 'ecqq88wrzup93tozg204zx776432zx4gharmrpvv9tuu3qn2htra8f6xkwaoplijfinqoe04v17dlge26yijwy7p0n5sfmhaful7j08lwq4xwnrn860aid9i7qhp7phau9wfxnirvydaiu9puvpy4po45ncdo5dg',
                flowInterfaceName: 'iy8ouy19fgg7l80fbbt9hjh54arq6wi8su44j8wa2xlavzcfc71e1e60u06usm04i014fwgf0w8dcml5hph7485wiqeou2zkmei3jreouh6ndy6f0yuhq0pr820yrcxw2r0bd6psg7fxp7wd5pmmu2ynnz59hm4k',
                flowInterfaceNamespace: 'x45x3x1ve0upknpvvlec83dnop96h1q3es820n5ewn1zwhtdzmognapr44bbkkqr93062cqalgm3paw6nx0zi2g4hpzq9oxlk9fzpneois7m5uh8jnot68gja9r2f71qo4naa2rjbgp314y8tkcavv5qdogtri5b',
                status: 'DELIVERING',
                refMessageId: '17ooobbu4ysu8uj72hqu93qq15dseiy13qfvqa8560r16xu6viyk5r9fflr45muteheyol503ltzgn3vz2bt9aspvsnbsd4wnxm38jmxyh49kvkdw38b97dr9q8rk56nu6rloec1lhm9b32rja3wpbccist4408x',
                detail: 'Aut autem aperiam iste perspiciatis quia. Omnis reprehenderit quibusdam facere ab cumque maxime officiis. Omnis aut ut ut ad eos in et. Officiis et qui et inventore. Dolor provident et soluta aperiam dicta consectetur quo.',
                example: 'tflbobqk7j04fv1qeaf7bny2j8ojii0q0hxovcq2zvmaf7v8pnoduojy5puq2bl0cusydapvj23xgkehgpi7038hbybkhsxwtpk8yhvalt0lgashgkmsjujvzz5pazks2l95vi9rf0ywwlyk6d1q9ghur67twz6m',
                startTimeAt: '2020-11-04 17:27:49',
                direction: 'OUTBOUND',
                errorCategory: 'eldwfl40gg56d1jnf5zhcgxcwjj4m10mgz1o2t498m5x99s3tzmaiijlw33w7kpgurxnn7tmk184mxgs09fe3swvwhoq2895hv6kr7vpvejrw0cpxgujpl4qwz5wlmajrain99l8ciegh3xszo54y3hssmwx2lkq',
                errorCode: '8hyhd64ule2wajlvzrovdufj17yas3oi5t00ksnokhccjyhrtf',
                errorLabel: 313280,
                node: 8460737574,
                protocol: '9owsj7fcbvq1ouo316ew',
                qualityOfService: 'dh0qum70gxzkf6gvq9mp',
                receiverParty: '1qm5zhlzs3k33ql6jw8vwdyhy5utqroetylu7pdud83j3dw1f1h2vd51248kc2czvsbz2thv03cdyqaatg9rlpzijejraz0i3rz8rsi3039xsbshla4jvmwdsz47bnf18j1xmgrmbo5gz4t0u672wkr47thnr4z1',
                receiverComponent: 'ft9uv3x5he6jkpd0tghb62zpvrmsgp2h5gzt3br3oxlfkzo1iid663psp34inz0tfmp48wetdwig1oe4qosuejseh0ika8dm18s5rv0txsykfdxodf8eajqv98k92yl5r8grkd663f0tcg943592g1hvjh0gpr6e',
                receiverInterface: 'ea2ah5ngsesumszn5l7wjuo8b5mg01eewrw16vy0jcnnp7ed4jjszno2n8sk6iwzvl8j497iaoz6hw8c26pg4k6m07bkudkj0rbimfbh04nfa021bb7t4mr7p9zhzhezdciqzfnxjrbouncxtqqr2q7ort3xqa6s',
                receiverInterfaceNamespace: 't8gruokq3haezhyqzd0o85417v8ow7btuj0zpelio2gzoeeucbcvqkck5103h8fao9fpahflo2dv5fyze1ansvwgxupdn4ujy9b5uzuh9ewwdwicay9m3c3fum7hvn0ureoqru33993tsh51igbbtobsq952mg9p',
                retries: 6704713419,
                size: 2004729122,
                timesFailed: 2380155968,
                numberMax: 6367112725,
                numberDays: 9516463486,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                
                tenantCode: 'iqedzp4lxnw9pik7kzixwspzccy58b3adsspi6ikfq1mrjnzet',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 't3og4e1z0bkemshlpk5x',
                scenario: 'lk55yfw7exb8z1cegiykbyju4rliv19fp2e1qaudtc564qq2dka9p4j77kev',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 12:26:25',
                executionMonitoringStartAt: '2020-11-04 15:20:55',
                executionMonitoringEndAt: '2020-11-04 12:47:16',
                flowHash: 'd38blvtpkla2eq8f038fppal6tykm5ip7fhfotcc',
                flowParty: '8yztwzpj86yf3wuowaa2a1o4sk1v3jestsgtj14b3aa5zm9lmtko2lv2gii8iwdxcr4hqsidd2yqux5jztcyehxrudkfqm3aboymgcb551re8vu3ugd49nzfwt4r9qp22e0la7djbvvgvzk2eenj8879fautg5oc',
                flowReceiverParty: '9bufqgpiifkl39o7c5crmvxhphmf4egt5a7clpbuu8li71ni0wcm97d9fgn0pyfep0uerr6l0mqcrq2z220acvugok0b6bwvszc1ly9wcu0f9l5rr2anxyu21o13xefz5srfkv1ujh6mhlxp7fp17h4wgj8uu4i2',
                flowComponent: 'jg45catv38jzqsoff73r19iyghzugipzpmnppk663fwnyt1gx8vcsencit7w4jo934z4ch1qz351csu0h6wtdxirg8jzw512bityjvszyvhwxd92sa2pjvebppvcbgp78q5ixwv11dbbmsf0kmxj2zryimshnavo',
                flowReceiverComponent: 'k277flhkmj4o8ucndzi20w75zbvy0i6t59os5r77nbb3vae9ea39gt2gtgzuqz9ekwgh8m8n8s3u0zjnjky512le8hy4gs8ubr8jx9qdltognixiqii6vpuc7xyati0g73m56pn1002gvxn80ulpps4sp27h2wue',
                flowInterfaceName: '1dnxz296xn2j4jzlkv1vv65s3udycjislm9t2zjqhmzcywez87f12nizc13tnzoqtimcvjsrf0cj62da4g7trcaq6z5sy0iihd7269tvpuamdrl04511aotyy0pb9zjw9a8dzfceil7koza5c589p8pny252mf0v',
                flowInterfaceNamespace: 'pnru2sp9nxlra4769y959321gmu0wdocs4dhlq0xoe2h0qr76zposabm3lqnkxzkrrrpmekpllf5spxibj16629dk7ujc5z4f951uyq4tfwhi3sx6v01yqjjuvr9ew3jnei6nnqzj8uz0mqaod4vosegyhf4x35c',
                status: 'DELIVERING',
                refMessageId: 'ctjm2rsz3y302w05zp9u3kw1nfqjvg55qv3e1fs7zeqreq58yuy9y3bw4vpx7vxigdj0ejdb1mhdxyv61peub5c7ie7mwla3v3h2t5yys0zlmt8s3fz73wa0ocn0361i0a94aarj66t6fnobzjg0h0fh9i5z6n5g',
                detail: 'Ut fugiat id nisi quam et. Nihil quibusdam sint aliquid dolor nisi. Perspiciatis qui ex quam et.',
                example: 'b1u7weefhc3amve91tchakb3plfg2f9r5blfjjrlj8b2qs78wogl7ezezxtgxtwenyw7yg4j2mqgpq7t1n21j3obnfppq8gbilitrotjc8dlo80iwfn06e6pvet4tlzbp5ssg20hfymz0l0yy1f3lmjovjcpnkhp',
                startTimeAt: '2020-11-04 00:57:21',
                direction: 'INBOUND',
                errorCategory: 'nb52khk8prye0ip6lzcky40xkvmog3ydls4svjrw2b7a2664cojlni7rqq2tgag3h08737z73bv5xd025rf6pbezsjj2ey8zd1nzvlbiifnqf21dfgkgsflfmyb8cg5w67hyeicu3uy6o5prmw3lb5bgi8tiq6j6',
                errorCode: 'qr30cfbnsr0sx6o0iffa4kvjetrolq6r7dqj1kq4n7izw9ilie',
                errorLabel: 144173,
                node: 6542137723,
                protocol: 'j94ubdqr9cuuaahib5tl',
                qualityOfService: 'lnam6gfp6hn2spjjyknp',
                receiverParty: '0pvf85ubooer3lhdz00oqnohcc3bsgh2mjdf1nlfaquatr5nz3v8siepyfao3kp53rtngujlvsk0hkzrgwym0la8ydr8vi0tsrx55uy72z1xgegwyb44sa9q0k2h4kqvp0vqyb1mhwzeuzlu8anmtjl5tfljqoea',
                receiverComponent: 'djjlfiaf1x8gc8nz2qwz6jqus3f0njb9pptygul0rtg7c0dcavpvg33ky2mx908o8bokjem6i59awiutx0qn5xlr2hsjobs7v5u4ge99gkdljuqzq9lqxbbkfc61dtwihnm1fdjof1gsxzezt9727l97vfoff6yb',
                receiverInterface: 't49jr2az0cuql4w9swei0avko88w2oleecdjixgvgubxsb6g20anm36qn0e82rnvw7n46p1v5juashlyl5iabpp96w6ozrz2k2xxjpqxu42vuhobbfndi2x2hi8gl3q2azack7wmmwamslvfhfnkee0afh3fyket',
                receiverInterfaceNamespace: 'd0wdbfhexmz8zwu4yx69r4fzk5i656oxjk3595eyjs7i3ol39k4dvqgusyx0jxrzkf893kpekuujxtvw75zor0l75cq6glqv5oanyj68bror7ar2m0c0m4eh1g6t2ezezmhsvzs0ejujpdarvl3srnccbl8cwq1y',
                retries: 1560943911,
                size: 8918209798,
                timesFailed: 8228309898,
                numberMax: 8513893098,
                numberDays: 8892183271,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: null,
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 'ls71ixxnbqaablx5i5e9',
                scenario: '9gzultp79wfswxfpaz0yh5wfwb85bqqbgotw1tfqpn8w4z9ci0x2ykhwe5jl',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 10:40:41',
                executionMonitoringStartAt: '2020-11-04 10:11:52',
                executionMonitoringEndAt: '2020-11-04 02:01:38',
                flowHash: 'oddjz3rr3jnx1m87v4lmbv9v25ri25951fjgwl3n',
                flowParty: '900ik2b8b7fxik362dfrbrmlwfdryonbggwkvdwrvclszt894qfcv88819c480kfyfg42nlvk0lpandgp4uvhllwbou1qq5wtj5etb0k92k1e1dfy9l62dz1i28vbzseot0tjqobxewttz4vr2ceiyd7bua2ei6h',
                flowReceiverParty: 'y8riu7huv0ysa0ndbu8p433jb8si6evqvm5gpn7y48n8o69817h0qac0u9502gzd8azls97pwq0jc96wzca87q4bcemwnqvomu3jduh71ukegvwsb9f1nzpl73dmnems0hzvhoqs3kvlizesgi892rcpfcqn4gjs',
                flowComponent: 'w95fpcr2n4ur03idafa42wh3sjtl3beiwl0sq3s88qeffsxqlkzi3mvyijn304n2ys7c41izirk97q88xib1nu12480jjxw2jocmsf8dejkk06hhcs4oibbhp1kwafal4wyar33x288pliklwio0jcjqiut0u5bd',
                flowReceiverComponent: '8b71xpq2db4a8ucuyzuho92s5sxyvq4q22gvukbhiw3swd5e08cu5su63bcj911ap9jkihlygur2ssoe2z3jfhyvlpg4v2eh4hooui4mclvt6is7mb04cci8nqnr084ba9s1kp9d7d5sfa5m6ri9wrcd0tgjsl67',
                flowInterfaceName: 'h6i2zlz2ppunl81jl59o41qqj1r1aoer4hayw4k8lftm5agyex52abnoarb2aztnex9dnvn8ti41quhnqx2ycnfg83oukyonslwmfbacofm796dxvhapyia1dklvnhw4nwn9c4ynoqht6n85wui79bc0rnx5kw4r',
                flowInterfaceNamespace: '8j6aawaov0ps55aedub0sjydu1q24uy42t12lk9a84rkf3k9pud8eaf39t16639qppz11mirw0j1zzatekaz9c5ugellashcb82a5dff42273pgjq3j6tdncdus6tvqdplx758dttqgbg99tpznj8eeb673nrqom',
                status: 'ERROR',
                refMessageId: 'shxkda5c2sffkxgetvj1zfucbjty9p4xevnspeyy8f00z0go9wj68y9oa1aoz6q015ubetl080oqktplw8o66v75us3n3g242pp227721w69r9rb9kz87e58i87l41tyqjy8nc7vyr9ybrak6frk4if932i4uwqc',
                detail: 'Voluptate fugit voluptas voluptatem vel sed. Provident quo at voluptatem nihil vitae laudantium qui repudiandae. Aliquam accusantium voluptatem facilis aliquam molestiae neque quo consequuntur.',
                example: 'usj6y177fth4o13m08bob4yvcmahb17x3gkbtt2a9wn9z72nrtbx2szvv3558atonr9ja6a6qklpyp03336utromu6xq2y1pj0jf26fdzwqakoqjcjva05932xddoybe9yqwk131t6bk5dtlukwq1w82b6h1m400',
                startTimeAt: '2020-11-04 02:28:55',
                direction: 'INBOUND',
                errorCategory: '0goioeuybkdyfez0gde6u7blhth5uxmcxidnasp7srx24mf1qg2v327j517nixifmk32vuhx6j0d2rhqxerif7huu10cbh9k84hzqjlxliuruh7mgkixm3qcpau0g2xvaj1bmh64z5vs6uv9z52gkdfbph24a4b1',
                errorCode: 'd1c2t6lijr8i47aoi7ow5z44f7oa0ekr2dc16lpa9x9incbkcz',
                errorLabel: 226421,
                node: 4173127036,
                protocol: '2x8ux1ata1ywdxg4h8cy',
                qualityOfService: 'i6ta5zh5o573huevdfil',
                receiverParty: 'j52oa4lqeizi4fpb4fjicn8kulmbcsqgiuh3zi2hqx56elk2ydew0o8opai1xtv2rxxaldlghuyccngn42vx8klf029pj1hodouxih33tziwurglev5lat4lw19a4680xrd4czpet555lh2ygcazzc74gcf6cb46',
                receiverComponent: '9365z0lvgox9xn7z3479mrc8zqg38590f2kmz2rbf2j520xs75edep92yhfu511q54c5otnf79usir7w5trrfpiku4fv42eeifcqkvaitomum00ma08gnutn4le2o4a81wze3cd1c7rlph0vl4dttspbnu4qu9o4',
                receiverInterface: 'trfqi6k5dzzdhdh3y6tcim0iqljzlxxw5r875f071wl9ggdrr9s6j0lbh05euna31fsu5e0fuz03lktqw6rx744tseue22rqnfvd31qwteqzhjz1favz8qxxp0p83t3kr8dqs43f4t74h8vg56t9z8uxrf97xbbg',
                receiverInterfaceNamespace: '1g3o2r9qmsv5sely56vipkonudapo80mtpfl6iqg3vp81qhdu15eclhb8kbnyvostb7ck5zyr1comuqgcnc5gvimd3qkn00fq728ykmglldth2evsdr6uuccfotiwuw0urdizn71mmtkakn6c18mf3lvah227vfn',
                retries: 8401193859,
                size: 3731015317,
                timesFailed: 1886468495,
                numberMax: 1112826953,
                numberDays: 3462204961,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 'n5hugugevt673b2nbeeg',
                scenario: '3fee09pqlwmuow85zbrzc9w0a5541mt6kcfxe6c3cyfb6b9higs4skh37q51',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 10:19:42',
                executionMonitoringStartAt: '2020-11-04 04:50:25',
                executionMonitoringEndAt: '2020-11-04 04:27:53',
                flowHash: 'qunpru90fv6c8dgqf8b9fygmd53jvz7s4vnxum9k',
                flowParty: 'uab8i72m8sx5xe5hclsr11uk6m675o37thagn1v8b49k1dpzrca1sijjl40bcqg9a1e7ltdfd9dhwpoujkvk4f0gms0f7rqqv47yxqd1ebouvcvifpg4hsix44kxdkahp477xt7ss3ma9jzbu8auko0fp2jgk905',
                flowReceiverParty: 'etsxa2c07w9dilk8tnxv9e5dgtfou0s9y0zm102oeq1js25jow6kvfed60gu3we3xtlrkpgiwb1uxvs3diyxlaj5bldxarxr3sabbrgt22basw8j9pjruw3vj0mhl6bbyiueq68cnli72o3le5wrxjp0q9tnp5dm',
                flowComponent: 'a2terrzt8vsxippfqbc9u784lumgj3la7tf55q0zthwrndfj3zc7qp3k3l9zcmnbvfzreicmthp7orq7u0rn5fy7w4lel8fkqtd9ogzsd9xgamh9ocq32lo4c3uvgsy06sw4wtpvppuwa16anbrvhsxn8dv8p86k',
                flowReceiverComponent: 'p7kckzomfgng977b3nrs2ddnm8r7gl76jqrfrd6rn5r3k2zlfqalvei41xzvnyb1qb4aj69onnn2gcvntrbjzjqft5owpbnka226zvi22xqb7g12u48blnr9wl6owqvlzgbixhs2xeeg66qd0wjksz4726mi0gv3',
                flowInterfaceName: 'wn5bx997aa7hmg3zf4lbo0i21dvx2spqikcxuh0d49xqyvqgvx5p85tn2xt3scj9ibx23kvui9ulp7msb32y3pe0p6fn2h2ct9l3ol2e8qnhcm7z06az1yvxraixw8dz6dw9ldi8i4hy9wxv7ee15jo3q40fgk2k',
                flowInterfaceNamespace: 'nssuk0y41fausilk4rptezmfg6qtsuknen1q3cwxpeyhxpvgp9j59er50p3g5k43vvvqdaygqyu6sbc95rxj8b9rsz7h1jl84km9trg5yu1jy0k98w8r2tmc6o3m3q3iib3rn1vqqywfpd2y9yv574vg6vkm6ibn',
                status: 'TO_BE_DELIVERED',
                refMessageId: 'ge68ve2w73g97z0tysd0ve5wo2u1cm4h5ji4bd8k2zw050bul2chbmmb56oq00asabhznwk0es4i8kvkyr5yu6q09ipfwsa8qxvs68a50j0ivqfmas4bpp2bxe22mbh778uuflktzyd4a46rjr6olfl2gkpwgcze',
                detail: 'Dicta voluptatum quibusdam sit ratione at aut sed asperiores. Temporibus hic id aut eum autem. Consequuntur nulla inventore accusamus placeat fuga.',
                example: 'cigwr05bbr86prz1op2hbmsc63gilbeme0lxp0fo8i71701qcs6rgms4pgvv79zstp4xud8yzyvazcmkhqfymdgaiw4aie73hdd4w4f3frbzaqg8miyyd5knqt45v9204mlfb7jifcwl7512c5nhprc7ay4i94pi',
                startTimeAt: '2020-11-04 05:21:02',
                direction: 'OUTBOUND',
                errorCategory: '4jzyqcljnzpy67pxhzq2qm4pazyfk1ytyk5xr4bfm3cj93ub7hg70zxa40j1qfd2111zlwbiwm4ukg18luj1q7h5vykgw04do49ut9gagqvtk0w644vi1jrmclzl5cmc3a3n7xgppxdgjfi9ibb4h7jp9ina9dne',
                errorCode: 'sv91aqf1ppyc1b4uz1belxg673k8v2kbfyxjvp08okh6j7rj81',
                errorLabel: 589757,
                node: 4327036171,
                protocol: '1hs6hl8i7pjpkpz17h5n',
                qualityOfService: 'zimyeovgj6mh5xkqk2zw',
                receiverParty: 'xawyc50xwy0alvqzas1kkfnyvs8spj5pc9onhi8cf6rii3elw9frii2wcaujh69aodlojdp29uwwzhyz6zwnxf1ge2ylqa9g5vrgwib1y2m84nkclu5t55fo66qhh7kk0cilzxsvjg5r3cfkjv0xz1flt4dhvle5',
                receiverComponent: 'ux7x4v7at25w98ffbirps1ads8vi3qd98z27ghbd7z93oop13m99l3ay82b7xbv9hkcvdjwy1yyoxjtdofbck6190d4lqki65w1rzj6lohgvap4b5ei8noe4c2pgca01xo0tmvk1xxru9jt3ndl7j7576ifyqig1',
                receiverInterface: 't0e891jqhime3q7nomx71cbht7xwzrqffatqyli9w5eeto732t3cdnidv6kqgbf1jie59md5cofeuzbo1v2yfbcrrc0phqxcuwlni6hgto1gp46q2wg17whhe2r8ey9uar18ap9k927n9cime1prah9y2cpqyh0v',
                receiverInterfaceNamespace: 'u9j4hu4gtubqpsfa0vsbwifkgc51tqnxwpitomoqp9g6o61b8alpuzj3or3xg4tj0qu3pgksl3tcr6twqbicbagjkpgj51opi5ktqrzdiv8cgbrnuyscma02vt3je5nsxuc16cho803x7lrhg6a2vgu7yuohmo51',
                retries: 1106388039,
                size: 4900037265,
                timesFailed: 5940435758,
                numberMax: 2543326745,
                numberDays: 4168421615,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: 'fmlvqy8ajok4i5g327yc212dqbaxmmn0gatvpn97ibqpi212u7',
                systemId: null,
                systemName: 'mvm0nsjhykyrj02suet8',
                scenario: '0z1hbuvi4b4y0dkk61t7s194b372eys8mr19etc6em3wdkw5zye73hyuao4g',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 06:59:10',
                executionMonitoringStartAt: '2020-11-04 02:23:25',
                executionMonitoringEndAt: '2020-11-04 08:05:46',
                flowHash: '7hs2sljri2ldpg7ixlyfa6j0hggqiqnorthfyayt',
                flowParty: 'v4rv6njodx1zal2awcczlc7gseyt78tobmq1twr83khozb8gcrou618x4y0bp1nrm68vilskt7p6olhylrcqbk4qvts5rp9ut2ymeqwr0vytpq0d6jvb5rj4npd2dghsae66pv16e31lfzt5gkxh55zqgz4lo92y',
                flowReceiverParty: 'ijpm0la41puyadcnrn9pm4ya7t405pjyep1k4wmor5zbxd8m1hg66e472xymh899n2rkgryx7wendqztbrbajan1f7wne6w9i42b08pc4rzkwcv80z0wyhe95jjmsmvbj2p1kugvcvheucz7kijjex2kqn8b45mx',
                flowComponent: 'sm46ohr3qq9xvxf34wj5vo03gktc5jc5w4s0iergnao6bvnug4fq6p8oixegkczexj7l7kumud617mciqwe2ppwms4are080fefvibceprgjuoynds9zuccl9qcaa9fizwk1pikgsn7c2odmnsxf8z95cpbe8o5a',
                flowReceiverComponent: 'pyu9l0p8n1fh45p66jfx4eohz2xgrit5886ntdwbzmghmnrt583vqzdtqhe55s2j7a8xjtm3psorb0iiaonu5mx01gvj1uo4fmsf2wrzfryit83xhxqci5epf7qs5xd1g31epbq4gpog9h75wwid1kaumb4n76pd',
                flowInterfaceName: 'jprkwetcwj3mz44azctp0e0ifxlimv5yov1ii83s46654ig0qpkd25mf62a2andtncty4sgizcm7yv9k7p0dje54j1kw2kbt48071mgrwapk7yitm0qhpb8t73egp71pfyvp3op3b8kxx0ca6wwdv2el7ix702be',
                flowInterfaceNamespace: 'j7c3ch5hwnd1gex7tm9ca56wcrprbz5ijjqqspk3raho92laxevx982bfzx6iuwg6brdba2cdm1rw69dn45mo80ba3np0dto1fzd7recrsouf6oow04ckweqr975a4qc9jacafldyszfuiy809qmoprle29kl05v',
                status: 'HOLDING',
                refMessageId: 'ooj9em3cny8b007m2ocnlwfbxzxqmih9x34f9wej29741ka6pn7qp76jckj7g47ghd0bgztby5lo5n7k5zf06yegowql5dv1f1v2brslcw31imaq05jdhyf6z7768jdyg3ud0h51n2cb4hgvuc1m7oqtldmnr9m6',
                detail: 'Minima sed aliquid. Animi fugiat ut tempora perferendis voluptatem cupiditate a quas. Vel corporis ut suscipit aut earum maiores at.',
                example: 'f59nerd2925p8ujxo74i6tfka15xezeg6u480ngbrh40hmowpvpjiquc6k49in7l6m6f3z9xt224xjnmx4a1epbk5tbx7mj6u3wwr6r0j0mii06kkdpqrc2gbugdfnaihftllkd82zcj0q1yqjke5arl0ksufnwh',
                startTimeAt: '2020-11-04 08:39:53',
                direction: 'INBOUND',
                errorCategory: 'c90v2b7jxwojf4somlexiypgo89oocpm05mnbvumjk2ph4qzdr7tg6rcd5hc30xfilrc5qfoyeieir1g9pdqs0ho319j6do41ip3s487kwc3iff01miq78gn2xsr6me9i2touu9npb32b0hey824tndkccu8cw7u',
                errorCode: 'n10dfxla4muji7qelmx8p0enzap52kxp9p65e1gen0ktgrdhly',
                errorLabel: 908688,
                node: 8272266516,
                protocol: 'jqka2spudy6fsdorzvlx',
                qualityOfService: 'go57177gsmnjpumstrmp',
                receiverParty: 'quvzlftuzoqk2x6ttrgnicrcmudutw49tvnsax2ahncwcufy9ekcv4afpiy5q4cpi0o53vat7ufmgn3ig4rzzrtxpwi5uvxnntkgtwepexzkeq60iblj0rk5cqd90xtimgryw3ycd3whgmj7lv8bx22fu20cdxvs',
                receiverComponent: 'r192ju3kx0psx7oxt4dw9atxka0bept8ad36k9ak9c3vzm94sps535wzpuk41d7o4euvp8rxdd4ttfegmhuzikoif87wg26b4pvrvi79m6r8casmfxlf8s2kzxd2j8rfcje4w9kdiacs9x7fp6tjta4gkd7n4m8j',
                receiverInterface: '2oh2rko6jfl94oob432wtol0qxoxn9crn6sewn4ukn9s0vynjxji3eprsq3mww1bwde4rq7h83ayefvle8u54etqaa0k2pmbe9a8c5h0fp56phxlkfxn40s8vjez3ih227gi664f5xuor4op78raz0w6m4hnszi9',
                receiverInterfaceNamespace: '499ogcf6godiytiveq4r6wk93ah2ryj0sc0wuuxbzf5voxuqjiii6eriiqoharw8z0m81ylfcuvbuefzmjqoh8g0msfiaswbj78e0yg7fqn6431g8dghnjmxsb0xkzwaaebfh053mz01zho9s985hc2vbvgnl2jy',
                retries: 2165895133,
                size: 4437418621,
                timesFailed: 1776557810,
                numberMax: 6533955008,
                numberDays: 7171941196,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: '02695vmahadtcmzsew01s97uvan9sgj376k3iaeeztqdyztx9c',
                
                systemName: 'l7u6x02izkub0gujn2ys',
                scenario: 'cnv2jz8wglnyo0so29nmrfj415ks5nhaq6av3xwap56iavzt4bwth3vndjcz',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 21:42:20',
                executionMonitoringStartAt: '2020-11-04 05:18:59',
                executionMonitoringEndAt: '2020-11-04 10:34:05',
                flowHash: '1em0ybgfevoudiob6am0fo6fmzx31h1rdnz363y5',
                flowParty: '5ajdaur76m1rxzjx9l6isx5rsddtaklgjhnb3ve9s1th05le9n56vkc7dt079qn4cfpzfrsafghuxxoe801h13wgq1i65uao23y5ayslhzdl62bmdepda764zyve69wbujzig1j6cxk40tm062f0zbven7wknsfj',
                flowReceiverParty: 'wk4n5bdprf21an4nzyjsrwbu47sy06udkaf1m49quhl6g1tziz3ea2glm62zh73v0z9nlahxep177u20wldtdwpysxx53qljhb1umfchwn8t78thc25op4gu5nmzpfkbg5vj5puq0glphwpnjdq88ceq04h49oso',
                flowComponent: 'p1sq1eoufh511dhieosfidq6ssfglbxi7ra9k7fm12tcpxjcqh4uiz5v4pjq5x30zubx1hs777ckhg5y32b2j91y0638egxajz482sev968dvpmx743mt3p9oodj9ms3qbi12cmgy4aokj4ajshgr7cogiz9lqz7',
                flowReceiverComponent: 'kcwajcbsxdbebdzzwcmauq7uz11u78jh1mtocd7tj5rczps2gfgmpw0pph0gbv15yk1svf45ujrrlbnhmiqxq28cuttsib9j2v367flxev5xzvmhvs01qrjxp4tkfk96ez5jhrsjvo5v6p25n7ie95fmvui3d8za',
                flowInterfaceName: 'sgudk7alhmn4mo8rhzfu8ayf8y0q9sm3n118igjxnscbgfve3bep8yxmsvtecsd4oamg5epbp14i0wvqtfueju8qec2eor31wopyhfn454fkuhzdo97fyipxwsz2r9n47hqgciydvkfzc003amaxm5po6ye16fx5',
                flowInterfaceNamespace: 'fksce6ndywssgwgyomj573ak6p9ntfaejkqjrr1s4viyeisjjndz6piim2kf3w1vwo0r8wcb31yvfr6kezq0bgfr5e2yu0gorr64bxjwg33uhjojm4lyyyu5ran4y12l5x0bzwesx4sqt4ohrk3h0mjyw2tm4z43',
                status: 'SUCCESS',
                refMessageId: 'd5v56t594za1el1mg7yuwk5c4y0in9evqejf4l99atbdjaaulkpappfo5fq45zvp9vl1wvw6h8dz1pah8y8a0ciwxvkdmgcv1bw1slejb069ohag1veqfuca4ggec7ap1epqr1qhz5uo7dgegadsevuixdrcnyqo',
                detail: 'Officia modi maxime. Voluptas sunt aliquam illo distinctio modi sequi. Ullam earum qui sapiente dolorum sit placeat. Non sit et laboriosam magni consequuntur cum et. Voluptas et odio dignissimos. Consequuntur laborum cumque qui asperiores.',
                example: 'ol68nrq0ximv1x6qxasa6dzyzennnw83nwvn6oadgvtckx0pwz7xdlxpanyj50ykmp3jgvhk1flpd3splxrebxacxr22h9vn42xnxa7w9wmlyq31e307317ej03za1gmpv4tl61obv276eyw9gt7fk4834uhm4wn',
                startTimeAt: '2020-11-04 00:30:06',
                direction: 'OUTBOUND',
                errorCategory: 'hbwvbttx165co7dszjrp5o8xm429tqmzff7i8u1302fz20np2yv2yv2l0baddz17vv8r0ao3b9inj86hfpqbqfk8e3bt4ida4rvp1mpgq0yxhbh7fwq2cwnp6s82f1d7hb79dwfzqsxtjcd4ratehft9rtxh1ylx',
                errorCode: 'k10eflvi71ucvicu0vnbevffosfu8571dvv1ia7iuxh61uhyxq',
                errorLabel: 789149,
                node: 3019189973,
                protocol: 'v34w716plo7xgrk0ugmy',
                qualityOfService: 'peakhzceyr5k9unsqul2',
                receiverParty: 'y0org4bo3ivn41b5lln3pa93e1qs7dzg546vpi1tmy4yk876bq60knkvwl0nhnavmko7eh1rmzs6rvn3gugv32kiox1sd8l9am2kyst4szlb0i9v42lwyp9ee8a33duath0wtqd5qsjj1alzvhc95isuadd2lm4j',
                receiverComponent: 'vzdn9ihtcv77295qmnvdprtr5pu8ua0f1x9gdtyv9a3d4eniqz07y68mtusgeyby5pfvqxckkv69z3phy9cshy9tbjeb9d9azwm5zkgj6fecruvy6b5nuxi3xhqyoy36sgagq0baqew1jt8ejfsnbsrguz6y3kv4',
                receiverInterface: 'kh9o84q9a5zqkqm1qw6odxofw1i27a0i4hvyn3ngm4x8pfblu1vsmgk976joz7zgoazlnp90tw4zd8zcrnsi7xvf3kq3alfxywncb77sydp0cet5ui242egv6c6tv6fcutpysjq0stgtjblwecv18z4895a9juqg',
                receiverInterfaceNamespace: 's9ql0m3we50qd5dgm63uw18qeg0amncp9ptmzpkr23hqs87om178pvvf4k0nc7vno8folc5hbuej0yhso1dvqpvv1hajvtmqg5pv49kv3067j3c2cnraeh6bc5vgjyg6c7onp2eo0q98p4f75xncx6xit5ykazoe',
                retries: 2715444115,
                size: 8168089607,
                timesFailed: 9633680047,
                numberMax: 5830614142,
                numberDays: 5809339116,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: '0oqb4a4enbfd7ea3dokn4zyaii7rcmp05q5wx9oqjju05xqmw5',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: null,
                scenario: 'wd0zu0mjk492bg5xsirh50h3ue9o98su7n25l6cquqwjhepdkdguuwc2ddrq',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 21:48:22',
                executionMonitoringStartAt: '2020-11-04 09:27:30',
                executionMonitoringEndAt: '2020-11-04 22:41:04',
                flowHash: 'ycs8ln1f57318ovh2a55nim3fvewe1ydp2o50gjd',
                flowParty: 'r4ur9vo3mzwe5txgqcqi39bg9azu8j43c6dq5pywx9izdliakcq4oibu0e19pllmujbcroz7cwcuiyv8l5e9wadyb123zqsau99z69b3ig3c0uqjc6nyia72daj4wiwuzorghvawu2r168a0gxey0ylb9ouxnfnt',
                flowReceiverParty: 'pvoptuv5v0ltwf10uf8gnscf5zivi0nf544eo4cdt2f2y55pn2kzeqh5ned97a7hmwfzwh4drdvx9ryth2lxjg0z2dlh4xx4ewgkk521fci32skuq4ss65sayxjvtujkmms07fmwtpfgo3d81mztnoywp9fnh5xp',
                flowComponent: 'db3whtnn0s6pzei43qnxuk1totui4p2im9dmnmucj5kgdees3tcqod0qjsbgv8gt9cf9uze38cnc7ofelaawo9hzmp9jgxsyypk7rsb0ax7n8dj8bj5py1iygw621t049e09jk3or5sfn761z1zvx44n91v49emr',
                flowReceiverComponent: 'pa5szgybrxpadeoyowpz7hfop8tjd8r2l4frhse31pvpxnub62oj923ov05xdq6710pcxl4saq9cvkw3796j7frxnveusvbhvz8hrukvklryo6ntt7k6c4dqpu55qknaemodgd0c6lbmh5rx1ee2onllcy0r2l6f',
                flowInterfaceName: '4oesk8wju7zrl71kb770y8yc1e4tvbd7dcpfbuavr7s8zinglci8r4z33eeeemzxai5sqckpfpyjz279jsqhb97kujhvctk1xoxocjpqoycp9w25yz5suqwy43g24jc7ra9kfitijz0vketpoe8erhz70cfc6nfq',
                flowInterfaceNamespace: 'fb6zd4dovv0hlj7t99e7lfofq8tl691njc43wuposmsrnjc32ba3hv5fyv6pkzffkvxdx5tmpayfokwtj0vy3j8lfloeheyddklqjoox7z2d1p507uo7xroz82djdwxd9bdyy95pyc2xmyzociphun683qtmawbk',
                status: 'DELIVERING',
                refMessageId: 'jyccsjg7b0w71c9uwmdddcfznpu82gzw2ompy06awjqh4r415ttqizq00vvf2rh7kwvoyzbw6umuswfraq2tnkksasi5oyxldcyypqvqohafol7pwuh1yra39nabpbarsa2dlpzkmgj6zjztrmtt8zc3awghc6iq',
                detail: 'Consequatur sed consequatur adipisci. Quasi sit est. Repudiandae molestiae impedit nulla dolorem molestiae reprehenderit similique rerum.',
                example: 'qdnstki93ox8u2qiivsz7gg4ax3mp7cpbfoa6ld2yq22et3a1mqpnn1bpvv3qut1g3wm8gzmjleqd98pqdn0z2gnxrd7nx5fs88n5ppyud750e2nvii7zxfudnr4oqeen7aas4lv7eodrr8weiqs48c0t2qsndkb',
                startTimeAt: '2020-11-04 06:46:53',
                direction: 'OUTBOUND',
                errorCategory: 'i03tt4273xj05xwo570kvjq2a0jd883dpcchqa9htpt3vtdirntgkvoq6s50uenahorez2ol33qpca898prpht361ouuuavczm8ombnet18knc08ac88hyg5jydiyek1vfex045752h9lq6ftb7bsj51uzr1pvg0',
                errorCode: 'jg2zcsvj60oa59npbt0u7do2cs8n8qoow5o1qsqv964ec3j8lu',
                errorLabel: 533933,
                node: 4221238243,
                protocol: '17qlm2rvcggbl2hyo0mo',
                qualityOfService: 'b90e0mwx4odiifqpi7eu',
                receiverParty: '39uabzmasw2v3ez679qwxlrsq8zry9dkt6bmuttv6xraelrzt3ysewukn4ryuuqf8xbf38km2mnyyrz790n4q59g18opkd66hjk077cifowl40m5i6ov3guvrpnmf6b3nkl1pgmsf2n63hlm1s1d7353r03umpca',
                receiverComponent: 'qnncpvr2foc0wlpx88l9adltnk8f1j6vma40q0ynecq289t7me8odwhvjhbopto739blueh06hgv29h095fu3lb51kc8cpzjx21p4f0s92qzaietykkppmr198imkdsjetwjup9qrvxdnd0zvb8tn6rk6cvgdds7',
                receiverInterface: '5uahqyu4xse31kyk1p39gay4xlcokupj62z0bxmg7nomrz5hj4xt4szusn05ovgaf4u1fidlfkzj3l2g7th0ivaekfpl0g6hv6nggr5xqu5e8c00jy2r1i0tjwn0msybk3hxc2e16wjhyrkop9lkm6bsiuznaxjj',
                receiverInterfaceNamespace: '9qiakreawmbbko0qpqghvixo6514kpdj1np2np0mseelfcogd92ctd8x63mgy1pmq0zx2tyczie9ccvwzlr67qx86kc2vnvz78k3r8my7bkazzjouvh6fs6wx3bwlukxbdhz2zlmych1wl86tf8bhe8zqk1ns07s',
                retries: 9829827634,
                size: 6166024896,
                timesFailed: 4821124337,
                numberMax: 4274416773,
                numberDays: 1843684715,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: '7qg2ycvkmgp46daerghpw1o57lvbzbh2cgjwcpnlr3qamcdn1f',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                
                scenario: '6gt13icjof2ut8jls7z0itprzsdw9y7fpsn9qktiqxqhrepszwr2ypysw62h',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 15:06:32',
                executionMonitoringStartAt: '2020-11-04 07:34:50',
                executionMonitoringEndAt: '2020-11-04 01:15:29',
                flowHash: 'dgoqa8rpq2uv5n8que9ecdu3li63qf1nfo0mmv14',
                flowParty: 'g8peks60bom92w16unvkvmia66suk8j29oz82xti3rzb99kmry08ds1qia4q5sfixia01ssyfoyy41koeoc4164qpzvdqu3m3u438fsl8lxsqennyyeu0itt2lelqti9it2w9rsoec83uzshxkfsn8rkxsoazftj',
                flowReceiverParty: 'b9fwit3z5xj8ekv8t9x9yfm2it8vfi0e7tofij4jouip40b4r5dzmeve5vw6e1og5x7vv50wntfjew0w4ujeyqkgpwpnav2doezy9jzczb8v28b9ljg4we5zjlhn92hvqsp7wqklp9y4ta58di5oh2pxgfcmvtob',
                flowComponent: 'let2wgd3354f54brlhdpkg6guuk6mj22ahnrc0rc9yrwukvu6rj5y74nu4o1wdo0eaahxebrbwfdqzeypnl06bfoo0kxhz6c71keqn2tc04m1ee6e1jvd3c6soexpb5gr989xcx9nol0o28duagzaz8ot7h7s0sq',
                flowReceiverComponent: '9wnakr9sw9hyhun70p4q99zixfvt2zw681ze8ej947wbl5c4nyxt5hd57qv1i31zazv0lxbvsh54ptzeztkqgc3kgwsp194pd66d7m1wtz4jmop6zlkmanipy76xtkorh0o0fcp78hhordrnyo8nxa0hlijjgfy7',
                flowInterfaceName: 'c8wl85jvctgc2b8vdlvf3emk05xr8zvpduckq67nw5f4tny7513obod37tlz2sn3g1usxjatzc5f2280jcqwxhcrb4vmuucf06etrxd0wmel12xcfazifb7p3yvtjqcrwybd4mb5uy16rrnzygwo1d19bu437pr3',
                flowInterfaceNamespace: '3rhmkouhp5ugbla4fk33v60uykkqzj4h00n820y4bperww8rfo8klmkjgrsd2cberdvjsdaabqn5gwuioyvqohvt9pdktexnq59jrzqlgvkxkkuhf76mxofxpqrb0vt75tjeaqs1w7ojqktrzruphye52p90e8pm',
                status: 'HOLDING',
                refMessageId: '4hxds4sdhr7eyj8ggu5lb6n25tw66m3aejk6zf3r7hu4p5otuer01jr3xrvkeqe8smavy7r565fvolndcu6yvu5wgzu62xxn3to2ac6zb93npbkw16yr9brzyccfwmyfsh2oqht8hhshnhjt7uxey8p56peodlph',
                detail: 'Ut dolores quia quisquam ut suscipit autem qui. Possimus molestiae inventore. A vitae eaque dolorem eos. Repellendus minima autem suscipit soluta reprehenderit illum vel.',
                example: '26fvqghdw0y0vck2b30baccyji3r8cpiwyhrv2ho8v37zauuiqn2m91ddcnq6l0i3i93mu4rbptdhbpexa8uyu7en45h91bru6qfd1j0vu955jeb705ync1kaq520s2itxbvzucriuxw0ualmnfl1qugbrlhuzuy',
                startTimeAt: '2020-11-04 07:31:06',
                direction: 'OUTBOUND',
                errorCategory: '2kynnnc4ol8h8kz7ek4tmomgxoaledjrmntbrqcoanfbz72ux0radci3idtmr5v8ajg0h55sbmy3hhh2svaoakxkxisbw7k1icrz8dabqofl4aiyxq73qdy8ok02309wtf4b7dmcnu1rbvzufcuwldea5oj9dyjo',
                errorCode: 'phte59bda0kcaw97mu6vjhirbwph0mdsltbgikt3ybxcrm7p3h',
                errorLabel: 340542,
                node: 4195303928,
                protocol: 'fth6dviay77hs7pnr577',
                qualityOfService: 'cqdpmmnnf1u22co2e3p5',
                receiverParty: 'jktld2m5m9l6au2yi8f8tpdc6ixkfigb0cwcx2mp6s36dimt6ryq7o415lovbe5hmzhi8gjcv12r78wqhomtpdyqopq4qacehzf4qvifrom6ijia5uod9s72frldgl04cn4nvkl4wuxkww4kr2q6ddslte585efv',
                receiverComponent: '33lhb6qd0kclaruvi3o07m0hwg4qwi5mpk0zurnx350v2b41tiif09eicggmf2i3w5ebq9wppxae1pucufu4svmxu3gmn0ecmvny6uj5nxnfl803m4xov8vodwkk285g3jz27bv9ev3zg8t7nqc0r3no4plkvt9e',
                receiverInterface: '9b4g6bpxu6le7v0jvk394l8cwaatbe6monlk8plvhucd7bncvv5dou00qypr37890y7a4ns8njyhjlx75x3ybbs4qi1ck9fzmbzfc4rwzbq8vx4nj8v43rtylteq3w6jng3za1ihtsdek8l3sj08ambdwb3dxocq',
                receiverInterfaceNamespace: 'zbmwdhehw9gvlz25ov950ursfv3wbpanro5ipm96qnpi83nix2ncnlk6qa6y4x46khaqq99in6ssm7q6a0v55depsk9pi75t7puhlei4nlo9uj6t6kt52c2ehr6hclf1d1m7h1nulnbxgic6mlp0b14kg6hhsjof',
                retries: 9225409114,
                size: 8719565352,
                timesFailed: 4292716733,
                numberMax: 6313270521,
                numberDays: 6653300969,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: '5faqwhhws8ih42n3yyt1e8r8b1nk2luti5gk7xirzrajgx28ze',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: '4v2ydwnszaymjc35r8tk',
                scenario: '22rpbu73aguz7209x0qmtwolh49rae3g9fbxhlgi1oequtmlw8srtgnvu04j',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 17:48:40',
                executionMonitoringStartAt: '2020-11-04 14:20:42',
                executionMonitoringEndAt: '2020-11-04 11:04:56',
                flowHash: 'l0n11bw99bitk9kt80yh89gft4gs8zzxrvpjp5h0',
                flowParty: '9rbrv1waepqcv45bs0j1b572p6k9xjjz0l5mgu84xklrybl18tddc9bp0akyv7pp99ivyu7ex69r5n76z257d19zuexo0w9f05q0pteg0rv4uaz36spe5w3o0dmy5e1zckhu3cw7vxlbnaicv96hbwxvv4jxlwgq',
                flowReceiverParty: 'h2b0fngsv4t2gxljq8cecitmfz36i1g59ccjs9mhxf2a84b62hrhttxqxb9g5e8olotljs83tih3ecq8skwn8reejq4qqml2t6pcnrjuj71wqqyvptl456nvqp8adduhd01mxbxh7tag72tusn3ehclm211iyu1k',
                flowComponent: '2d0v5h9cdwt4dsqc2ktirshwj5swe4cts1ntrp258inuczn654mfikm6jq64n6lorsmuxdrc1t7494d6fqs89iprl51sn6886jhi4izv25qrw88j7y0g9fv68s6vcwoiw5zmy3sxwekfwm7kkzj78ovlogi5gy6b',
                flowReceiverComponent: 'j5bjn1iutcs0kd6dfm6s5bkwtdkmtcojsnkn42prbn4incltumqftzrct0p3tj0jrj5zj1cgqogb1240r0qr9r97c2la2gitgcpnbl56ku1qno43n9mgnhde2kuxbblhqtgm4ciluv0df0q9fxx6ih0rbsv3scq3',
                flowInterfaceName: '5weti8zswbxygyqulexs0dky7kefeomnumlicvh57xsi3qe5qc32tfe2j9o4xq6qif3hjjkc3oj0kmexwnbvdu47w7f357uxc177r32bqe5confzc1lzqxknlziwrthcftdpofyh97uc0w55ujb8mcjskvwbkvz1',
                flowInterfaceNamespace: '1wsbzj370dv1e422szjo3zimn7krs77ouqn55oaf4mn7c7pkv2h5qfcn0eugdzud67z4zg47rs3viq2m9cqlx3aggxwnlx96ye1yeatd95cy3wjtlz7scxazybctkbxh16gpa6ojiswew07imxdgqqou4dl3gaa1',
                status: 'HOLDING',
                refMessageId: 'beanezkoyp0et8dm37j1nii4y5p5209p7934ovdkxq960l09w7dryapwzwekm3wygonrp0ix28wdiq79wvgn4ylr6ddgvjm76i7nna5koh3te7kkktocjud4godsyuama67r1ushl8azsgt3sjuizk369lmdbwjg',
                detail: 'Dolorem laudantium doloremque aut nobis similique ea voluptatum placeat quia. Nulla praesentium sed est esse et maiores. Eum inventore eum sed sunt molestiae sequi amet deleniti.',
                example: 'sj4dt1mgmn0emh3dp29am04cp9jr8dttryo8n71q1rh3h5daql3cp388cxiy52f0oen4476ouuemcf7snjt7r8i6m8og8fzc6qpt3ifvhkk6goe6zp787j1vbn0bssiws3conpbo8z7ea4ylr8g369gdbjykj3u5',
                startTimeAt: '2020-11-04 19:19:40',
                direction: 'OUTBOUND',
                errorCategory: 'dkajew1i3g8q8ilcn8uw6p3cx5k758j55tceqp53zkzj48s25pgl4lyawt7e0fgbb711uu29h83efr321tayk1x8e8rykb5aw3gifv2obst6bxm4i6le6lkhnukjl3yp35h9pxq4ri0ffztks9gl5efi579j53ff',
                errorCode: '6p3tcrdq6rdzbh9hcwvikln49mx84f5gwfalerp0fg0iu2qg1t',
                errorLabel: 555134,
                node: 7397042109,
                protocol: 'aapgp9480agjbur8jdbv',
                qualityOfService: 'aqt5m6n42h6u3agcm9u5',
                receiverParty: 'fsnze82uy7rfamsscjmj5uz7oepbdaolbc4x5hex2cnx0xi4y3bpjukm6lhnx85dzkugnlw7c93z43j9jbz0kf4981s09lj3fvmd0fmk4voxj2r9fi9q5zcefwbjxj78152t4wl8gew8h1rxbf01bnajga0njjqy',
                receiverComponent: 'k5j1zf1nspscmv6mok3dvn5hcp24qyyb36ygwle1tfttbrxeykwm3dwm6qdewoqxyg2b8159kqwu9e2lvuyk0plm1zjrd9w2krdatnjppwskwdd8o5cxot7pqqxcelpbcj8405mtou7zap3o2kw3xf83l39d2eot',
                receiverInterface: '52fm7wxdpjb5jf4yxzd399m3bouyllmv9q905i3jj9o2e35wyk2vu5kuo41ga3ocuwwpybnuhumfdjxmfebve1s0h4mlnputcb01qwozdluje0rblbgese1m09z1ykuu017nq33mm39ug5qexv37w0tzltf8y1nt',
                receiverInterfaceNamespace: 'v72vus0spyziu6aqx1eb8rwggnzmajjj0kt6md1i7atr7y47xhhef6k485gfh6vovaapa7z4x2dvekpdxnl13sfgvtucobq0oyq7kopcjvx461r7u413zhf2f2fxs4kxa8rmbesmdv6xh3qj5a9ccao8ej8rb5ah',
                retries: 1126410596,
                size: 5217450476,
                timesFailed: 9439528304,
                numberMax: 4380282777,
                numberDays: 8237479007,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: 'gjhbqcr06zxldao131a99d6y58mt247elyiqztzquxp07r43g2',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 'b321m1ozbhjyzel5icsx',
                scenario: 'jrhassvfjw6rh2cfosmahdt8081v4vv3x9ek6zlaqwgh4ngiq7hc81nejyzd',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 00:07:13',
                executionMonitoringStartAt: '2020-11-03 23:20:57',
                executionMonitoringEndAt: '2020-11-04 17:09:44',
                flowHash: 'ynj4u5c1g905dri0qqjawrgbmemgc7o4zipgoxrk',
                flowParty: 'am5no5txgh8v9bn4owrsowetdavxm293aphwop4wreet5kd6zflknc5im5n189r82bh4fxppdgqsrfrm6eni9vuibqtjib02fxtkh1kym1pw30qzbimzi611g9j2jk7e0vlrptluu217mhi4t9hgk3ldh5cctknp',
                flowReceiverParty: 'pl2542nbwadzp409phnr3g4gejr5v36z0cbjuljpv9wnke8j4nmgdzeldigjir47gujszodm888dqm8oajhh5n9di4mpb7la4v0t7h1wtnxl9l7qph78sw82srb4406jidpdqh3f247i7b7ooa1qain373xq1vbx',
                flowComponent: '41uy34dpm7ncnme08ql6onrp07kqf26sjvluxsc54bxmglhslddq112yqei64oh0gpa9674k8nijsnu5eqa7epd5slpublgy63goi8mm4eshedtj0tp7yg90zshuwsxo8wxo9m6gpc93pj0hjfg34sf088szzgia',
                flowReceiverComponent: 'l4sucv1kvuk63j9zy05yh8ynqc0c3wreahqso7g8254jnv9f742kdp2f9ldc9xvuxzj1z0xk54v7g82rg1qpubx4i4up7f40l7gpi8prmxhacx1134erwnc6xckc3jrg1f4lj58wipjsqd7k8shs5pvdzm65pf0m',
                flowInterfaceName: 'eoetmm6rqrqgh812q42yio0r6rdzcbh74bzy2gsb26cngrypd59idjjxvnrmxlg7dgr1cdgiio7eohkcmx1npt1pxlw3q32buy9nqqgmw8m8jubsp29hgrsvgxtyjbraxmowxuc8z09sbuxdlvlhglv8zxp3b6ov',
                flowInterfaceNamespace: 'vtl3f24lc3sxz6gz1f6oes8w4boq4tj1iru66ms27uauapsyv82cjpofi7bqqfdyzprp4yz1bfumbdlpbxycnljskyralah1g6fxvijizchb7zan1go14yist920djhius0pl6xkc218sethb045ils47eecu9lp',
                status: 'CANCELLED',
                refMessageId: 'pr07p31eis3pw2n466cjp5noawfnhz7z0b0xycoslyyn5ka6c296zxjwj9vrrdvwg66hhe5tninyesgavd8uwxqt7b5ln04kfz187l42xm5v4kiniy28sotgfgek25det6ztexqm3rp2bpbtbslwh81gjeptsjeq',
                detail: 'Vel repellendus ut est. Repudiandae similique porro inventore ducimus ullam. Dolor modi eum consectetur magnam qui sit porro qui veritatis. Exercitationem nihil quasi et dignissimos sint mollitia.',
                example: 'wnbf0h7i1jlbk6gxcgma9t1aaed1z9u6s01fx41ohjg56s8jepv434qz1kr0nvm0cpkq2jvgw6yl885k6xu53rd4y37jqbrauzbhz2ypoey0i0l8mlkz2ukr6jyei4art3vynqiqw2t5ark6cq0wefrjm3ttthsj',
                startTimeAt: '2020-11-04 17:23:47',
                direction: 'OUTBOUND',
                errorCategory: 'oewf8c6u9q8yfnwqg2hckyw7uy1p8pwpvr7qvcqjggr4nlndyz7yv5zbau0gvz7ggp4zo0nq0smyb4j5m2ul1b5iw6ncxouk88mdle2f7t94a5s3e3ytq0bjb8e49jl38l7v2pr9ft9gy9649iy0wt9d80359p4l',
                errorCode: '7p4h8kasfb0e1nvhqvplsd2ziwujlujvymv8sntld2sv7gn4aj',
                errorLabel: 626597,
                node: 4861531744,
                protocol: 'm5jbcrswogbypeok1bry',
                qualityOfService: '6asmslsidedfbrpakpm5',
                receiverParty: 'y37si24c8xf0naxr6c7kz1b3swfgnklg1ts56f7a9hu47q72fxca9fnn8l3r9pcz5natfu7x908ay8zfobss4hx51rvb105wa01uuzv1k5bof1fj9oyz4bhmcqpz0hs2ypr3vv2blc92vi3uptxb2xvqa0q9ak8z',
                receiverComponent: 'l65ylsftwaiosg6uc3307qm77977h4d3gi9go9itcivm8oym63g0kuzcx0k78ewb63lc5l805m7ctkvgcxig80vepshnssy9dpql19zqvnvbwgil9ut8httej6hqggu8m1lixm9u566rdyiikscan9hdla7w1w62',
                receiverInterface: 'yrpa2xpyd2mouqnsl5hkc14at7umhkwr2q8z6iocdgmhkya84y0y1uu6yx3k8rq1mwbjwlesq9jucplalaya0b31s9pquy4kkgk21cn0xiwgodryxjrqteseyevuu7hpu9wfo0ukgl6okwd1uv3ia7iu8ntstj46',
                receiverInterfaceNamespace: '419aaoox3177mw4cwq9hyk6ikok8e2t2qctkloz5b6w0m6k04gatvue9p922fp6xmr0x1gadfpc4j1kqln7nw9jzf2yi44o275nead4202sa40ey1p1cergeglsb0mg0jp34a7uy8logt2rrbk12pd4y25jc931k',
                retries: 5167217852,
                size: 5910987984,
                timesFailed: 6419806077,
                numberMax: 6141177252,
                numberDays: 6749560360,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: 'g1x825a0p32jw24natr7sxoyta6ohy27jpu88ruy1h88lel3js',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 'lz7qeap3wgt3r8finqsd',
                scenario: 's07pga0fcwjvsdedsradrmzb9qobkk9qdglwf10eczugahyk8payucvt013u',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: null,
                executionExecutedAt: '2020-11-04 07:32:56',
                executionMonitoringStartAt: '2020-11-04 16:16:41',
                executionMonitoringEndAt: '2020-11-04 08:25:49',
                flowHash: '564jkqq32l5ju94909t4tqdlqtjgdkihrnq07flb',
                flowParty: 'rciuw0ectw9qvogoz6ylkm028bvwvu1cc8t48gbykru8qtn4qrg158191v5unanvp0llcqiny7oers5oeno31v6z1d9wp0x5s8xxn5n70q92qm86m1xtjt9hrm55aywart754w4or6it17x30rsst5h9zeypdart',
                flowReceiverParty: 'dav3huv1qqv0n1alvvioc4vpcwv3dqymra8ev2w2x67ei3ca8z12ei82nf65j4bijsmabiho968ute2sqlu98zji9iqxz0dnbnvio0yjkhbbgx1qiba93n5c7m56qmv4dpc2w03vae9g0l4gkk81mvo5plajgu0e',
                flowComponent: 'cgsiozzgksszvx4wskxt24ldpyo1re3ktmekalofkrboyowcgpvfxuxgld3k3anqdj0rmi4yw07g48tqmakbbw74223nmkq3n899gdw27udizt5eknz0cggjeh60uwfmu76o4x8xynco5qf6h3tm9bm05s1v8plk',
                flowReceiverComponent: '01ekybrsvichf42039ydjk42qa8fykyo9g4oczpvqemrimluk6bohmdb9i1q375gkyn9n2r7z1da3y6bolkob02yxf5qz5ykyf3lh84qkc7bgxnuizrnbwwy8wb5hxxy9mg2f97ub1tda00678hjvoacvmg5tp52',
                flowInterfaceName: 'j68530w7seuk4oto97ddq4gr2snkamds6dcp9qgn7helz3r2otsgvkim163bdbqks02k740n76qgt0fp4ik0q79fpl5mtu1shflem6qnbq8tb7q9btod5hf3zlowk2xh1cuz90xqwdp40miswlze63ehgvw1nmty',
                flowInterfaceNamespace: '84xfm4xy0forrre1lowuje8xglkw4uqjwzspoxvlyyyzow1ukfrjbkunlcg9qd9z4j3o3ez4f5vbgeyxbz5wlocl15fb1ry2jxwyj61le8yxhcfxpxybmthn2oybq02a9jjljg9f40i1wc17g5qyy6h9l6na1rk2',
                status: 'SUCCESS',
                refMessageId: 'xqe1aqlg7sysch837lwsnu7ff5lgo43y5jphk39h9ts0rvoure8pj32ka82wyk77odvlw4vbsrn1kvckeyn32sso1k62wec9qp8npf5ulwvaeg1bnulqg6wfa0yvkwfl46jzd3dqrr2tjnqbt38ehvwf0f1uylxx',
                detail: 'Accusamus qui est officia aut rerum odit. Provident quod numquam. Est dolorem deleniti. Perferendis velit rerum sit asperiores similique harum occaecati expedita.',
                example: 'koi4aof17xpcs47axvlenguc4fyqy50ch50phuvtxtryv96uwvmce3jcsm3mdqezsghormmzqofmhoewwbqiww75h2abdkfwtjded6dqabtufzhg0es4igkp2895utw6rh465r1bul3s6043140t62auj9586h9p',
                startTimeAt: '2020-11-04 04:14:21',
                direction: 'INBOUND',
                errorCategory: 'cit3a6p3ptkzv76z2522in2cicyct73hfr12hhc76ppedjg8dktdb9clfxc3ctaxvzgna4lxvn30q5tm46fj5a0h4odd6khtznj91dcwoy2usr1wdtikn20esi0mxiczy8ghih5zuh2ljevf4ufoc855jzwffor0',
                errorCode: 'ckv384dm5o1a2jigojeb53rjuri3q4sn13651gu5c7l7hhopma',
                errorLabel: 257703,
                node: 1584539957,
                protocol: 'kkskmle7jy4vf0p7edrc',
                qualityOfService: 'sgalwln5u1wfyw7lugcx',
                receiverParty: 'u354bgohcj5xlyp8t9kfcu1p4genhekk66he3ev9tnd14tge2yuljiwpfbfv1w40r91he9doogv94ct3jvs9oe6hoehp48ucehkh9h3qvwczebkfsvvar18tde5ce6j8yxrdoom6818q28ovf08xz3fgc2dya8ue',
                receiverComponent: '9d8dd3w58dpf4cldwhljh89vh8s38pvt1gt1sp5kivsopqd5qtat560hlsbbpdyvu4j6axvjhyhwqrt1d2w9vfgudjdzdwob81li3u6axkpdolcuaw939s3ba0i11wzewkg1aff6lxvk8lqa6zmgsdl1x2hw2wwk',
                receiverInterface: 'vu425mnzkaf6ztwn8q1utof6okdjvbqn97hbq0c4ae69dyr9nocy6gqjgyimdpy36k39vn2ed78eodc0mttyalhsh60pcxo0364hw9gbh2jvsjg69c12cplvtabkre6i87g4poke0n4ccmmpn6t1sai46mc5f64h',
                receiverInterfaceNamespace: 'oubeohaq9cq3fik4rrq4z09tcoylwtswygr3go0tzzfk5b0zlf00e8wzhsgjtbe0nqvo8y0pxnmczxq9gmz6yzhokd6wkt7ms17iu0ly3z0a14hp6w0vgocvs3z0y5xxema90miqzmn3h53at8gd7cr6ki725tyi',
                retries: 4727141146,
                size: 1555241361,
                timesFailed: 1840041519,
                numberMax: 5142396553,
                numberDays: 7894337873,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: 'g3nk0fubg4rfq7j278ftwwizb98y1r0wvdndm7qr0t34k62h2l',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 'xk61j9eawms90bf1llg6',
                scenario: 'ko8tkpfy4f2wz68r5yhcs4k1bgff5yhaw2hac73xdd3ai730u8jkxgiqc38i',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                
                executionExecutedAt: '2020-11-04 15:29:16',
                executionMonitoringStartAt: '2020-11-04 00:18:29',
                executionMonitoringEndAt: '2020-11-04 04:30:19',
                flowHash: 'fwg51nlh1x3uhfl7ncsv9eqhkc49dn9mw2d19hxt',
                flowParty: 'woc23bqad15c25qmnw29zed8o5pugg1gz9ch5qler2lv1xfiuiiy43kp67qtuf5fda33neeuxpopwlam1ve2k0pp052l23j6mss9eo6ldczhty1kus6h762lq86uvz0k1jk4k647b5xlslk0itdapswp4vxf2mlg',
                flowReceiverParty: 'hxy9rdmjjg50498kcrlvvdinryzp2j324tnf8pp0251s7ejetet1107qosuhqj1g3xin4x5hto1ocuupcblx2whj6h4d3bexxtyvq99h62be2db5q5lm1p1ecusca90a21aegyqdw9vaszm62k90czqvddya8u56',
                flowComponent: 'o1pv1guac257yl45ejmj2exhi885oci0buvxdj6f4o551izruzchxeyh0g8d7a5y8c44fwd4mdmgbpv0y1qrd3jyenfpg8klebgpi753cl5uuyim5rz8hasc5qjfxtde6judqxxm6oakuo46txy4h8foggcddllr',
                flowReceiverComponent: 'vzouf69ok67jggrp6w1pxrwy7q73hq24jrb1i7trf4y9z118g1w3t17g14oj7v1352g0xopzdr21u7rd5d47kd0jm8ur6row32tt3atdf90dnmtsxqvxjbj4agz34ca34fojmg7w0zy3n81fum2q3harp6kw5ixx',
                flowInterfaceName: 'sfx5jz0jy2ckbx2yptt9szcgds9pa1fz7fku51g7lgvtpk206hqikuj8pg2x14re1nnxvu2zfv30bmh17n53h9a6obwngzfoxj8qdxr6whujpwlln4gw5qjghh588iknb27i169whluofgi5guolq0eqoyx5za0t',
                flowInterfaceNamespace: '91m5qtx2ek6yt5unwilmm8p4rv2yl4toqjfccyf4byy4dq9hwtutqto0wkt7ceot2wq4wz9ap0zme2jia1p0rnxxg0lnjiu6nxwyqrh06nup87bg2xtwbbb89etljselive7qhbxwr41snbxhnrwjju3f6w9ay9y',
                status: 'WAITING',
                refMessageId: '9gddsgbe6052i97bj4w5x0j4714bt0wlyerehu50n2eqaai0ip7tv34l6fbl5gmrahz7esojn6pjrom938ex4kv02gywxfzlhqvdocvavlfwl4xpdlq9c3rjcyultd4vw4nynbq8daxrpcjmvicf8i8461yn8oe2',
                detail: 'Aut enim ab rerum ducimus voluptatem nesciunt velit porro. Eum porro quia laborum illo eligendi iure vel. Aut enim quisquam debitis molestias aliquam dolorum id cumque quasi. In quo magnam et libero necessitatibus. Voluptas aut voluptatem optio et optio. Qui et omnis iusto vel.',
                example: 'fyb3d2j0a3gq9c914cw1rurjod3j9rq6rrpi4w0he8qag1ca9k5vpqs27grbkqrhumhfgw8taw8gnwcpfqk8fpmg879pnls9ih7dh6z64b95oto9utlspt65ycn6z0lsdta1d42ayamqdo70hdix52t4m7227jhc',
                startTimeAt: '2020-11-04 07:59:33',
                direction: 'INBOUND',
                errorCategory: '8c3rm7fbhloviv8mnl06z7wtjvjja6l37kuvi3vnrgrp4k06ls2uf0nah9gndcnxwb1sne8pr3z49pydxa1sghpyic4ir4g8svpd54nz67nmmqa2v4ydc5yavi32leh16d9obo5w8ke7hbgfzxui4khnv9v2u2qn',
                errorCode: '9g5w6x52mrpzv475413ers42w8bg4nzzuoabzxc6pwwvek16ds',
                errorLabel: 803471,
                node: 6792007256,
                protocol: 'o2d84w2jou91ymy7bl34',
                qualityOfService: '11ovfvka3ya2the11njo',
                receiverParty: 'tk4yavbkujnqd7yyroig40tebp9rmd6eh93amuq94o0s5cvswp4axsxftjj73bobuakrntngxp7licmfjaqnl6x1rgy2ridpibwkbynk97z34u7hg3hilmw82r5z3agrc9irrzc96a9t42mxgktd1cirl6ohjf5u',
                receiverComponent: 'gaf29a1f8d6yre2zg4zlnkfsq1mgnybsoeilhltiujufz20cwf0oc0wb0xpsttbmossqyln1n8twqig8taw816ahmkqsftf1xknqa0clcv04hwseqkazxf3hrpwstc3gadf3s2de8aqp0mkir3jnrur6l10hvg3h',
                receiverInterface: 'nqhzvfvq74tyvhq9b8stvd322znlm5by2aref0iyhmkg7qa2djzr5134fs1yw9clggysoz7ou2chu8bdhrhfxe1r9178omrs0pqnfufthqwsdaqcrz91kaxviqvnhum32tir4vo620mq829zio9ywhhwgh3cdb8b',
                receiverInterfaceNamespace: 'eth3oww77bopgm4tb4u8kst0l3rpgc4thwpcf0y3wjgcthhmqhznd1w3onsox04yim4dec2yuaof6qkhafhico3uklpswuw203u94bt277ig3e0imzii1plzsxms85aag6630t5ijo3f64lbqzbzdoip11ugjweo',
                retries: 6425048788,
                size: 5230592786,
                timesFailed: 5017325291,
                numberMax: 6712966433,
                numberDays: 2971287272,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: 'n186c83hyh1wvmptrp3l5sgdkcq7ce7snnkz6txi6drw2vxhlk',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 'nhtw3ly9q0fx2al4d068',
                scenario: '8e70wxfqq8ze2lpl9fgz6aj6may9k4200o80h03a3motdmvinl6z632gsuec',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-11-04 18:32:30',
                executionMonitoringEndAt: '2020-11-04 15:44:39',
                flowHash: 'gv1sav8ydzwm5zdj3t90fp2e4kejv9z8150uinlt',
                flowParty: '5qethzr83zhspnscuibm198i6eg2kyxk0fxvgc6q8ykwzpd0jraq3mbdzdi4wv3uca4wd8iywlnkcwmi4ujidl9ppvoi3a5f1rmylhc51r22657une7mkh484og0muqd3kwxj3ra4hewctnlr94gwjw74frf4jqj',
                flowReceiverParty: 'tora1twaze98k4hdjayftld6oh5rtgv7txh0agx89su8ls0ggebwxslfe1hfp26j1p90b9k96v7lpw0asrep8s57gje73biqm9fw6mtvqnz6a50qwzq3q0a5xl83pozoouceay9b3k3axplrnhw5go8gl8oys9bf',
                flowComponent: 'ibg7lg4qqxokf17k8houjx4c841o18esf472fzozb8fcaoniz0l1klv9cstyrd4denuoftw40pamtn26iyt37hvp12f5vnsjofqwd68t86g2quetv3iw4paz3570siqdt31lpodzeqkmpr0i0qhr95slu9eaj4lm',
                flowReceiverComponent: '9g9zjpl3ffxe9rispbbbbwv0rt7q3w7j38zi685lz66zlwij032hynlj0xl0t05zt5jnyyoml043nym0csh4nnov714lkpc5tc0tyqmtkz0pvofxhok7o588001re6yzoowok8dwu3uipzdmmu5a8yec6s3fqyxx',
                flowInterfaceName: '5lv5owsfxfosakixrhk8u6jmf83syu8wu2220l72qi3uj5crm4dqbgtlqp2vss0hlu4hganeu91ol32t2ri44cnd3g2fx59uh4xw9njkjtsl9p050lv3ls9tdmaz6c2yu66s5sh6dns466mfm0uzptmcldualaoi',
                flowInterfaceNamespace: '7l00tf52rkqb9ei2tt1bbfpa0x4pllo6w6pn55dvkcbc0l1sr5wog7zf6f6q1ob4h20l66v6kv5psdquocen8dbbi7yx50wnxzte4sp2mkr0a301lxl02ztnc3r67a5hmu3rlyx0j299gvrthy8f4b39rvgjq01c',
                status: 'HOLDING',
                refMessageId: 'wx68ud2jjsjwzpfeihd9son2vr7hnbkbvsnh2pwavcqncnlexvxd01ea9xqvuf1mo4whswnxz6jp3jnzyrowykc3pjncz86rxg2okfvqjef9bcwe5jrl8s0f630h9q8d81mqa3n1uaek63jazvol0ohdiwqtxkwp',
                detail: 'Deleniti aspernatur quis earum aut dolor ut voluptas consequatur voluptatum. Perspiciatis quia ipsum recusandae. Sint similique dolorum.',
                example: 'uwbmjdaf0b1aqe5boyrzk7hsdn9jahza7j5f7kirt3uajuu1d49temst82k39cb327hkhtt43m3ktydkr9e9tsig5yevih5mxn99pto1clevpn6124od0kwedwsohx80t51fgxz2zblwsunmmth0aozv5du9nfxk',
                startTimeAt: '2020-11-04 09:46:11',
                direction: 'INBOUND',
                errorCategory: '5uswgwsbyei6lgchgg7o3tc4jnvlfem8aiql1k7bbf5j77im1x9pb74ewsv9m677zlwj885brteg5urd3gxi4lg30fqwn69r6pcp7h0xol9z7sj2tnp845flze4d4wuonisvtdmei3lj7wlmyh96iakeev31x9o4',
                errorCode: 'eqvdspr0242cey4573or1nhok57t2u9t84td8do6wiewvekr0y',
                errorLabel: 995108,
                node: 2301299714,
                protocol: 'p4po0ocoddef2kuhqj02',
                qualityOfService: '2wc4t7h8mbzrxgrb2l43',
                receiverParty: 'q3mavdihejtx4zfgdbli4qz8tv4d2o69hrwrezulnzqcdmzhq28qryrz37aljl5n0obaeydcyu9dzr103fnts8kr6an4o4w8btoowqneaxw6ua9fa5s81zdjbowuv3pk42wxbksp30k84ydaezlu1jy0wlzayvwo',
                receiverComponent: 'ftjnr7gsj0jn0ok5arzsk34ijqdcq3teu4s5srkkbsfv31dor9c5itr4pkeczl4x4hhkgg0itn4lxm5nh84bcdi7c5hj12rsutnktkdcffgj0vyq5djlxbai8o1amklrx7umnh2a03y39hcew0iui05edt8zg7s1',
                receiverInterface: '5qpm4hvakile6uf7w969fz5m2c3ruhw95zkh2yxue2hmb10ly3miubdxmsbqpm7gao1w87yf78oc2nd3jv46lez3is45x0nz76gtkjllkisi9l43msg4mk1jw9e7dtfmdwnljv057fz6suruhuw9utmri9xq16s0',
                receiverInterfaceNamespace: '6ka1yhxx58v7kvianmz8g88lkdlr7dnkxhl04c1j1m4autsul66gvkhe7uof0565ohznt2d52lx90ci0rjpf0cri71kxw4kwa3pas98yxbr7pjppq34jxgfg3eatu2dwky6o317s849n94s0ybczhtxeqolo72pj',
                retries: 6196413343,
                size: 7580008088,
                timesFailed: 3876906783,
                numberMax: 4297638349,
                numberDays: 9653148507,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: 'ax0dfiozorxtcfrc1ehaca14t80gu9udfeuhs2cjcxdb56msz4',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 'hjw1fj84gd9w63n2y3eq',
                scenario: 'sznjk6qnxdqj7kw7pdr82511w4rx55hj5jr35t4lbwyqa06bp4i4o8kzp0dt',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-11-04 12:20:25',
                executionMonitoringEndAt: '2020-11-04 16:47:49',
                flowHash: '5vq6xf9b70ezjug2akvnph453fwgw4yf9exy9mkh',
                flowParty: 'che690dgbwg8zixstn7j0dtyl2fy0kknpx6zsdwp41x7a89gd2nnxdh0tx05vfvgbz891ft14ttv8n704zp5lhegvv84qhj05x3ueio3j4zz9tj7ppch50m0g6divgqa5n9mpzfc3o6v3j09jqgudy182il44dgq',
                flowReceiverParty: 'jz2r2pyuad0jsce6vvgbp3d8lluh314vokie7pv4nzcrj1vh30vjaux1johw2a7ijaiiqu6jbgnb1d1ard2ct1uij9c092obhu58k1qm8goasknmbqf4dqamg5jx3cl9z3tb6f3axbtrfd2m6jxvzk8clznu3luz',
                flowComponent: 'j8kbp7jgb6p4ojz4b7aobccl5448jop6xqa8ihsta2kw8zahjrf5qzwgn77wjo3wmxymk10ru2wbyoet0uap5hjhxu5vddf8ihs9z5buog44jizkwgfcbkefffri9ewbnbj7wtfv8bcs9slyreg58i757wzjx3uk',
                flowReceiverComponent: 'r3cctezkjfi2blskmaj39lex1m5fukqhtkrt69txgaxhnmm5klzzpfybjriatljqq5gv2hf48ia7j13htb6buf7hmob0hdiq11t9hv0stfgzek2yravr0xtjc4c8vgbkh3d2wkbhvbom1vj68e1mo352wwcseowa',
                flowInterfaceName: 'eujlu153aywybnsvejzhho7f9wzhfq3ttwfzs78lwfa3mzkrkvucweturrme3tf6dtjp273iakkw8l1junmf7r466hjspbh1b5bomanx9w85h4ypp4nt8yw2yp5tue5u6oexh92beqosve50qmf0s8dy3l260c9q',
                flowInterfaceNamespace: 'z07axvyo7d4uhpkjtry3ofq84i48jmaijzphw92yo83ns3wgia5n9keatzkhlh21nyplog735771z6sr3m2bwubbk53r1cvv2nej2azp5tsazjtqxrmzh6mvqiaj086ijezzr3c1p5wlbtnzojg2dp69lbz82uif',
                status: 'ERROR',
                refMessageId: 'o6x4sjyw60p0xqlr63q86sw3oy6x7mo2bl33xg3n4efnz8hrvkc6rzvc5o1h7txou2wl0g0hh5b0p1dyw79kfq0znnoyjv9y4kjjc94oha8qloat4mr9ws5d207f0mfjpm7ph8xqye66d8lduousgn7hxvvn9snw',
                detail: 'Repellat excepturi dignissimos. Minima et ut quam rerum est aut harum aspernatur. Amet exercitationem facilis vero laudantium quia dolor sequi ipsam ullam. Et eum autem enim repellendus. Velit quisquam molestias quam.',
                example: '5t1puf1816e62w0nnf2ne6n3yhmiqtxvzc5apk9n9a3yrx6ou92lgsqmf76ipcjdghwi6zdird2iyr2jqiv7qc44hhyepfbqauqn1dzaz2guk7iizmzwbo5oyjoigretoa71feemlaycropjv09rx4kx79w3ev8v',
                startTimeAt: '2020-11-04 01:49:00',
                direction: 'INBOUND',
                errorCategory: 'ink8nb07d5o4bhjgvibm5zenkcruij859f0xqzdlmi6iwfrqgmz6n2h9ic6h79r01xj2ri3hz5w9k4a4wafjbc2avxitypz1d5vg3pzkefj29afaxvutt3ecgjs4wriadskv6tf4svxfm4gdkr8q6b775lkughh3',
                errorCode: '94snisliih3uu23pg98a8oki7tahn1jmflqk7yol5znirw1c0y',
                errorLabel: 842685,
                node: 7490049305,
                protocol: '47sdulul13wav52ou1mu',
                qualityOfService: 'fa5t2u07extwkah6l9ns',
                receiverParty: 'i5mqbs18idndzy4rfimielvt4q7hg9mmhzavwdglhpi0mhf8b58z98qplne0hfn9fg4g6ysoxckup17507e63mev3fjnzqcfx6an6vye5wavxr6p84hw5wsbrkjhx2h9uxcekeqfg90skq0jh87t9lmbl0a5n4o3',
                receiverComponent: '6w7ckm0uv8rya2hh6l6oiulw28ke3uf7njkwka4ta8lwap18hwf9x7onvhjswzhe4iga9uqnxe4aej9tezg2g04qb217dnq4bikjkftathq80e493ng4qaqfi74nvqtzu14p2l0miqofyk4ytc8p79yp1dn8yctl',
                receiverInterface: 'yfugyp554pd8uz8v7rh3tggoys2xhjxacuv01xgxbja0rrel7207wzqndt3n6wqdxzwwfpb9zqhpkudonquuqu0rtocb0dcspt01od0xf40gbhyngf3799eiedp9u4snnpa2nd3bzu81lmk10ja3802tg6tyn90e',
                receiverInterfaceNamespace: 'li76ksfkv5b80pdz116i3c6sbqfpalhv9vsymnlsxl1upyp21rlnpsjjzmx2jn0tyo0vinw1q52omymrye33bgl7zhxs50h9o5vaexm4w1fb6odhkeve06slyuzsctnxmdh0mo2714k0s1qjpnskmqds1blbybba',
                retries: 4293389190,
                size: 3227022967,
                timesFailed: 6708195420,
                numberMax: 5610329039,
                numberDays: 4552634406,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: 'z7hz6xzrx1whf5b53q55qfrzz3rz9jorqgkalbpy782kyvw6fu',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 'vb3rbg3dk8fif0knn7ar',
                scenario: 'wdy15ftp0hbh0ycnmq8yrinpebk90rjx63nip4d2pghyr4cnfeheyc42d1u2',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 19:33:32',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-11-04 14:24:32',
                flowHash: 'bbbljjnm1ezg7qyzf9m32qpw0g36txm0056cygcv',
                flowParty: '7vvzg1ecpq5m9iyv39ej6j31976mmmby344ku45ghp5apjsw2ghdifsccicrrdldxhm3s28nwl8z8toib8dhhpw1e1f1bdbdbb6eivozunw2hvd477ghqdghcmkrpesbnee1zxoai4421cl53frha0pr3dpcfkgg',
                flowReceiverParty: '4aj7tw6esy78n2tgqvla1xte3jxql6lzdh2yhobcz8gtv9si5q29ki4dlndps97n9ywzgul29349c2raw6ymuxycpu76p45ul1e7btgltu2e5u76qpz1cwqfm984tqfhml5iolsf6aupih5dnj948d75vs1oby0v',
                flowComponent: 'w99j10dtq1tj37krf1n149lp9laxjzotybeunkk1u5zhesmt8k6c9tw1pu513zwxfq9nu9coepz1mczlknvlaakhfe77f732bnt887e9ct1crf0pvlhngp6mz55n41rsuqqnjiq163574v1q2d7tms0y2el61rfx',
                flowReceiverComponent: 'hsr4fib91065e84s6d88n7c7yad4iylq4wb2kdt2a3979j1r5z61wzibh5jbtzt5175r3orbqkqhvszritqe9hr2v30i331exks0two3wbpj4ce05dg94wenj64l6nt4edgpxmvr11u6cwwql0bkfl2tft7kfedx',
                flowInterfaceName: 'koghdsb1b84tpgnx4db4i2onztx88z95twea1fxcyb7mj15xqaw0ulk8lx25y257sssxsoohmez68fin4sin5lv8dkblkno2ltt2ybvsc1vtydnmmqnksa84knfin5w7z00li6g5mg8yyee8jlyay995ogm9197t',
                flowInterfaceNamespace: '6lbecpcpyt2c5uqrwbr0po5czw1u4dttufs619u09kedva9fqn2pk51pqoma8lqw18xjux5zrsikkam9b4210bou04o9dpfyy2bd5h20h0hn4yacyy4iy3lkzww4jk9ej813lphpqpkcu5ios4oto8e9j6lhkiex',
                status: 'DELIVERING',
                refMessageId: 'p40cn80lgnp98g7o424dizpefp3v1ge56vq4gakfmnbz2tdwlkqz2exveeorq2r3svdli2tpqj3vo83q5nk3196gkh9t35h2zmrrm13r0c45k1ytaevusuo3nsw2vqahy7jr54yuefox4jo02xa2km3sng84vm7h',
                detail: 'Molestiae explicabo maiores quis tempore praesentium totam. Aut sunt et cupiditate dolor reiciendis reprehenderit. A officiis eos et aut. Eveniet illo natus rem in non. Eligendi enim unde facilis nobis eaque.',
                example: 'cmmfubpg0nbjhfsmfl8c9v1tswm9igis1ni7ccjqsqpinopgqd2r7r3jvurskqoab7k8tmv3rbhu59mcg397gdps27lls09qq1wgjqx5aa4rjqv7mhwhgmta3haswpzgaissmsvzkyiawe13yj67eq0bg29vjvog',
                startTimeAt: '2020-11-04 14:40:42',
                direction: 'INBOUND',
                errorCategory: 'kjwfzua1zhownw0n0c9mk1ao4pyegma2twwdy7up21gag7yunz84v4ji79ap4icpuphj652j3cdirvl7lij5fh3t5n0tvkjf2q98wtogh8upjft9r2yqqoo19znljlelfrafcbe9qkr3akjyuqwnncr8l8tf08r7',
                errorCode: 'xz36fhsf373yjztuncqw63hu7e2ckx0jdvjzo0vpak3k222h2q',
                errorLabel: 885520,
                node: 7716201224,
                protocol: 'lgm48rur8yqarpcvdip6',
                qualityOfService: '039feujaewmb7u6lnek1',
                receiverParty: 'v3r9pep3nljyr2mgo04o3w99epk912t7a2qxgwoaib7ihkq6nlkk7svxi1g2syzafbukwzoq9484qvdxe9sdjzbyauoqbtm08basw5qwc1ziq2felefo599dadrk2e6h7jn877ngeqkjimf4i53nsfz7edl7rhec',
                receiverComponent: 'qzb3h5ev1nm96zb6k88w0n47l3nuy5crsvo8z315pl4cmjfvs9brvbtb6ybj2b0rks299god1dg145fx9n8gjypjf9e41jabc90txkjpfimkxz5td0t6fa78zw8ljc3vyl1uvv8vlk6ppl82exv07onolsp93hd1',
                receiverInterface: 'd216ycbshrnem97w5b8lcs49ugbzv6s3wy01bpoi9o7r8knt7zb2de2z7lc5foprpxwvt3dzho70jpqrvkv3lfvzehmbo4x2p4d5pc1o48qcp88350o9q0uedy5hqeut74q08g2o29cc2zzz3eyc61qv6r1isuyg',
                receiverInterfaceNamespace: 'nsga91pwsqfu576r56elpc6mb9xawasxrolmmx43wxju5onwumdeo1ybdrsu6glhstc14v9d2vpd0dbriw13f61cr0y9nvsgiyddvqwkampbpd9p8xqx4yvz1fu15ohcgd7c1e50km7gr9ouapw7qdotxybhg5pr',
                retries: 3075093533,
                size: 7555425309,
                timesFailed: 8907170823,
                numberMax: 8495912200,
                numberDays: 5290792322,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: 'uhx4jv2pw1jvhxhdqpqzife1oaw2wvl45gg2r9gc56fu5w7pce',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: '19k4v10earn3nkousjq4',
                scenario: '63p0aze2x7fumjr7jwax3qjvsotedixglytkyognyx90jck1sk22dha5vvez',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 22:33:45',
                
                executionMonitoringEndAt: '2020-11-04 18:36:48',
                flowHash: '2r4qt9zdcljk2z1lg01e1o1n91sg92d334e83qbo',
                flowParty: 'w9pgxwkaitizxic8ii1r2e7aiwzkewvgv579ps18pg40zf4jxmvr504uxa54hr0bnxv9ev1q1mkiak8hi6yt7bff9uwpfkg0wsdk8fyp6mnhrts38rs67t18hocshsx1zj51ge538qtz77tqj6tmermv7ti1d75v',
                flowReceiverParty: '63mdqisc9pq2234xgjsebcpjyfw98dgi0qi53ffg1vplpzy22so3omortw4owef02aw7z712k6e4mq0lpv83ipaet1ixvu4vcr29gdlmi8o3wa7vmzvcp1oy7x4vpqlhnutl17f4on7kjb6vzj0u7hf1lis1rcl9',
                flowComponent: 'jm42zb9ohh2n68js6a7aegsk1ni38n7vkvtimxjqkw5rgh05ymrcni8p0zmtosmmcaml1du0iz403nywei6k0yvhrvwpfz5yvq6llpcoi566qrxw313vl8cmdtvl7199o5q0q80sg0tpz8szdocyrvbe6byy341a',
                flowReceiverComponent: '126im6zyorzi4fsun017tuljgtj9ex1g9r400ip3j8xid3wa1abrb96vg26oxuoj8b30ypewwiwjfbd418qx6k2qvhxyigvvs7nh877yuukrje015oa7f5tr19n7gjfbztjddue9n5obhlfhxixb5afvl23dc6by',
                flowInterfaceName: 'hokm07t7r24bkqqbqfzkk559nunhj4cik04ozx7xswqr5v3fosene97ii7sq87eyr3x88irbcf84ahe08ipycc9szrkg1o61ns6wgefyjpcodam4a64q7hrnx5d1lrl58ya3tzysh0kaq51g8dfsta9bs6uavwt3',
                flowInterfaceNamespace: 'kmib8ixbmi0loct3nxw819b7mfvmsut2awkicl7cfljgzonk6i5j65jojo504jfylx5i9hb02yemh1iunodr347cwmdclmx0o7ezsvjn8e9s3g8zc8prcsr3zio10u5hbsis8b40hmp62nh2v4yu6iqwjz8zwinf',
                status: 'ERROR',
                refMessageId: '6zm3bq8y17vmdssxsopswi9j23i5hih28qisrymo7llak5xl1dl5dqogf5k5d2y4j5ltrvs3uwh254dm2p31yxb79qx34xk2lbxy58cittmefcrz7cn22w26l6z15dbydks6puwcb8hk3mftca4upuepkvnibgxz',
                detail: 'Alias ipsum expedita et enim sed quia quo. Id vel quia quod est sit debitis est. Fugit occaecati sit quas. Tempora et quos dolores aut. Non culpa quia cumque id facere aperiam. Aut repudiandae iure.',
                example: 'jksz382hk1xzjp29mukn2im2kxa0aouo9iurx5xtizlvohdsf4o4d0fkdb9a5xytnpkmryaqup6wsi9ca9cr225h8jgtq4auzl1kaj309p82x0oiq29gt8g9n5trahbxnmeplq8b595hr5riw6ypir7wdzoxou0i',
                startTimeAt: '2020-11-04 06:32:05',
                direction: 'OUTBOUND',
                errorCategory: 'o770t099dvivd4n204etsmcp29xq7sh1ee3hvqiz3uvqeki887lubwiftsezn1deel37cg1xa97j930k1fefbv75fypc47u1fanb3sz4eum3cyclamnt0s3ki26nd5m7lzo0je46l62l261td33aq5vee7edai3k',
                errorCode: '31a2xxwtdhvbqb3esf1wad4q5yisy96btr47ccevjp3wbrhj3w',
                errorLabel: 872550,
                node: 8559180494,
                protocol: 'nr6o4olwpt43586pdqef',
                qualityOfService: 'v9vajdjwwyy7jx3cnyli',
                receiverParty: 'vtbs1w2cs8893tv3hp35mzsbeknpvntwm6l1vokdo926vk9e0r7rgjq1s8a02mez2xn2i7hmmxv6ssokrx9degi48wdo7jt5j860r8tuv5ktobjh0163qpqmhxdjl7tk41t3yml4a1rk9epu8wnonrmxr4d7d7lr',
                receiverComponent: 'vet0p3uyjcafe4009ryjur7w6vcy8jzgsz9zkwq537igw4do4xtddp8dbk9g6t9tczqtcquqc7dwa645hku35r146xzoy5pos3jd436omq182adu8glahhrvmhdouxjlmbhw4xx9kqxkm78sry70xj5d3bnwke8z',
                receiverInterface: 'ucmbccu35ij6w8tigbbdvfl5ibeul1stmkj1cu3avuz7i3tnlugig824qhfnii3tyddn44a41lbu8y5jpvd9x0qrm9fuq6gndjc7ltmggtaxqv7do0dv3l4w6etulkzd8swln4d768bwfqx9jpkcdduv9n94mnvt',
                receiverInterfaceNamespace: 'ydwn6wrkvbojf634hl9e1xffo1erwy5rq5is884h4te40m4hk4am8h0nasyyw4jrt5gm7ectu8lhtkucenl8wct7anebfbo75ikojq64fs3u3e75wbujovkvyl42rimqqak5pysk1v9kgq52biduohzpc5wx9bgz',
                retries: 6960212446,
                size: 7929362248,
                timesFailed: 9242529719,
                numberMax: 5552904623,
                numberDays: 8347127029,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: 'bitzhiklww7zkbzcg6en835hlh660e7ibyv7qnis4gzrpjebzf',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: '4i3t45dsi71jxikyruuy',
                scenario: 'j92dj20wfryozhgao17r4jjnyd2qei592xmg7s9i21dt3lg0kx2sql36a9rx',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 12:35:10',
                executionMonitoringStartAt: '2020-11-04 02:24:40',
                executionMonitoringEndAt: null,
                flowHash: 'n2urq40ealf5erd6b5ntxgyt71pxzrfqqyw4tkwm',
                flowParty: 'uu9hdxy06a8zbgw74lppnvfh15hlto5y1zsyss6dsyjazjlsp0dqa28vdu6b79fxstuz7zmrnid44atac9mktp2up2px4zkpo3lg6yp5upxolefobxq4mgm8r2y68bn421700ctrzxm2vooo8mebcdqilp1mfi4m',
                flowReceiverParty: 'fqt0d3m0w2w9rjqjddws333vo36mrbyb68axm9bjz8d7576dh02maprx6kmipcckx07u3y0pxqrccgb5c3x6lqbv47kq42kd5dccxu1q6nnbt0cm4wjfxbjbu6lgrbz1uxn80lpjdk995h9xl0sffkhb0awyl3w9',
                flowComponent: 'ee1kxaf4rf9gcrcv0rnq6tymfdqfndg83547fixktvyf92qpzndfubr59idefttypgh3ncj3v8zid5n4ohi080zc5wkxplo7lpltvmtul6hwqkbga446xojdme3syrod42efqsetggfl5z2cv2hehjrsetoqyzak',
                flowReceiverComponent: '9k3hmg39pig4wu86y0o6jbw2y5myi2wujbsep35yixswjinbr2bxu4kljpzqvfnanatxwh3qwcuhe22pkfkgt5zxzolkacxlf4cfqs8mbmf442ez5snd5wflrgvuq8oiicqo4o96k4okmxg932uf22e0hvtlzgvy',
                flowInterfaceName: 'h40o4568s4o4rxyb7f8qs5yskxz3vo3xtx2wqd9tvsabrtvql7i4y0570it5gq4iof6gmisisk4lx4vzxq3htxtri2b8k8s4v5frt3cge7y3trla2i2tc6401hyy01l0lp3fc21uprdlmkpxxp8yzsh93dz57v6p',
                flowInterfaceNamespace: '1r6k2jpvarxq46kw2hkkyvoyiu4ugfce064i62i4hmutzqmxmbt21gekw6xfneoucpy2cq923gjie28yonbjl3h02s7qwxr1gehj6r6mplvc6xomgw1ujvis3lhl6n0wcu09hw8a7hwaeo87tuoa5xgo0zmfn6ih',
                status: 'ERROR',
                refMessageId: 'gr0se9htnyz0horrnnr3b0ngq9sln6l81uh450iuqxf6e08o47wm7vgb4eyqnesu479qg5j28023s5wb6fv4wobkwzgdcbmko84rjgekwa53xxrxt9wbc5cqn5ez4bhigxn1e5774pebibbx9g9kd24zeg5ipeuu',
                detail: 'Ex est est voluptatum voluptas mollitia sit. Eum laudantium dolores vitae quas sit corporis. Quia rerum veniam.',
                example: '0f6geruphlbn3e0h2u0jn2t72mqxgs8wkhhj9n7stgnu4lviiev93xpq04648h55b79w5ln5ndg7cyz4hotawre30ikiyhaqpe9c12acl64j0a5rf3gjpijg403knacjyhuwg0cfgaes9dbmlnhk0xsbfi70l9nn',
                startTimeAt: '2020-11-04 09:45:39',
                direction: 'INBOUND',
                errorCategory: '503d32q77lpmz2edsmilmpexd98zduq6x7yhpwlsy3xbwvyal8ge38ro0biuz57etohz71p22shk5507qxflu078yt8wyjcyv3vkdrn5xod0wh0c53bmuozy4ejdtsmudzgmfrtw3i9xvgqmz2ixrffh6mmn2lz0',
                errorCode: '80nl2h7e5fd7tfn65k1idc08krl7ydk2c0bvvptsznnfqb1fex',
                errorLabel: 516821,
                node: 3528514204,
                protocol: 'wh7h94ygpglfha9aqjma',
                qualityOfService: 'dxx3xvs02lara5phy5gk',
                receiverParty: 'sk3zlbfyu7mlzd469woovzgp5c03kqolqhtvc3vbyahurtyxfz6pk4wnjlruogmqwq2kdmzmno5d5d9jfv29af6j85016x9tolowa1zdyi5ht1640yb28dyndrahehbnndegqsidxgdghig79vyu5gscgomph9c8',
                receiverComponent: '01zkcv6xuurjsf7x9bezlvi1d2jl2sz7y4w2s09e6zlcsx5agu9dsoux2sp9a9vou968j9q7530gcfugoppxno4qnaoc3094k4dytbyow4pimot1qxhp4u3hnzn3qhtkw7g7uuoj5unnts3ipv4uimj4hhk4o1zn',
                receiverInterface: '9qi0loyigit5an0qwttr2qpbojwzol7vznozirvdn87jiese75ybnb51im3w27vixbmwsz2q74o3ms9ru9986ruaa0l2fbhy9aaxgxkcd86hsrjjkooc1oxz2mxurqqvd75q0vd6fzavcgics9bb8e63xlbnxzee',
                receiverInterfaceNamespace: 'rdz1yqjk272f4uamdbei9akx95na8zomkbdollx784i2ljb3iyt8fetrenk93jvttfantyi40q3aoyjpzqscddsfee1buvs5cxhl1tlzs7xjemorxgltdxk7803nxcvbjib2r8aw451dhmz1ezl25c4if3spthfo',
                retries: 8599236631,
                size: 2022422146,
                timesFailed: 1135195969,
                numberMax: 2980636639,
                numberDays: 8621820806,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: '0sbjq4g2k05x3q5pxb3h0pvfyju0ef8v5x25i944nndrje67ce',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: '028ozdzqyoijrzfgtipn',
                scenario: 'ss3k2yvs9dmg14gc51fppv7kay3eyi1bexoj7uhw8kzmmfoikcqsjcoifndy',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 19:17:05',
                executionMonitoringStartAt: '2020-11-04 17:07:59',
                
                flowHash: 'gt1zu97dancikf9tg85vg9prn68oia6em851touk',
                flowParty: 'rbh2111fgtjktm5mwliszvu07bjz61p4zz48647gxhza13gqw0uwbcknrh0gfpzeb1psgiyq9qaebjji60sdqjl9gstq1rpkcfzio8s7cdkjsafbk6wpp5iq5rz2tlw13rtohxy40pvg3c1irnrl5lvm8m8ny8ek',
                flowReceiverParty: '0zjvtm1q32nr1p7ph56x2232131n0bmawx6vyokksge77i6m33h6y3lzglhb4iih75vqusg04uqrf4p1f07tndqpmbso3f08vnyvxcydp62chrgzk0eclc9we8uvs0bmuori2d1h57hmjzixcgm62hvd3f5kyrqf',
                flowComponent: 'c92eqsnyqntmdmzm24bestia7qt6t6hotp31r7bqevq6ccdpv9kwzniaefuolz98fdo9877ucjzd7hws6qx3u5fp8lt4vgdau1iof4fgrzdhbfxpz4mdpy4bk49tki6f7jtb4lytf1r83q21o1tob0lo7y9gpxyy',
                flowReceiverComponent: 's08h6w6fdclo2578srfnfbupv2jwnjukte16cbqus173hrkwg9y2q24ivrnj5c9lal58kbj4cnf6qigzgmyu4dgtz90m84qss15w6fbq1ohg6er83hnba68r35e6ot8o10r6vi20x2m9d7k6fibgqdt1o7fjks7u',
                flowInterfaceName: 'i0eume0nsrgopr37gdrrsnia8tgh7vf72s6xc1s17zq6nvs3mevkc3lj3cu8lqb64q5kzigck0n08xlu99g38fq7x6okmw4mdz81ulucmme1sdkr7k10j3rn6arxmggquh8i8v8bdghmrqi8rkvtk96buzu98cs8',
                flowInterfaceNamespace: 'cam8vy1q7umatuyxhgznqsach3xs258h2xo3elu83kojx5k17w89l2147c7cekot5dbmhoiazr6tfvwe06dmikmbaz3t8jra34j966a1zx0ofb9dz4be1lsbeeakb6n8asazr9hkiwn9fxmvgeb2di5znyfsi1ln',
                status: 'DELIVERING',
                refMessageId: '5dvcgdj5bj62gvdd1tkon0mx64we2nodnfc23g4cl3pdk0na2089bkj51yf9ppxuwyf1ff2xsbzxvjmygt55jijqzokqkuuy9oakiozxk8hldn90hv44b9wmk55s1inu9v4o1gfstul9c3cfulwe5bfo4t2s2yks',
                detail: 'Quo praesentium illo maiores itaque autem voluptatum asperiores consequatur veniam. Id sint ipsum aliquid omnis. Qui quia ut temporibus soluta illo unde.',
                example: '45j3tvfbzo1f6gss6tnc4vrlv8su3962mggg3dkt3e70jysbqfzy9noofgpfrkl5hioldh7pwcy4ae5g3a784ld6x8wmwddpiz88wq3js2gxex2z2pyge1lq6io4t1rdcxwvjmwyyxwkchpfv0iidjyh910n7k4y',
                startTimeAt: '2020-11-04 12:28:28',
                direction: 'OUTBOUND',
                errorCategory: 'cb0jsxhae95xz572cj4xkhjt97fy7y1b02kbe9rihxjdyu6h8lheuc80ald8natgydyelslrxu3hnff4xfv4ovqyow2abbixbt904d5xejcxznbnm9la6vl80axvrj9jpwhmabe958evavyg5poc4pn0dkdv4h74',
                errorCode: 'cpy5ry7oddzop1s3ot1ei2txdnnmxu5tl6ceg3t6r4o29avr0p',
                errorLabel: 282419,
                node: 3419210712,
                protocol: '9uvoy5m9nne8tqktxlrt',
                qualityOfService: 'q65wf3ey3hj6j93eb62d',
                receiverParty: 'fcbiy2usbw2aix4zpw03pzslg53m8rnfldskk0wc9p51hgzddn0qph6k75z9o8y8xf9dqryg7vc6o0fw6lcl6hp52y6fjaohk6uc6mtvaulx6xeckzakelg6ca1ib83w69turql9ozjv3u99klqii9yg4oh9ozk6',
                receiverComponent: 'xsfgg3opc6tnwxx0eejwef0gulq81nldt0b32efmw0vmgiz0pgw8s51khqytjaff3s0ix67zuhk5c1y09o14m121wrhlu97jttc19daxhrqizcaiqt0z9jysggfzjcamv13ylowzr9nwpu4jpsdup591aejcxsvg',
                receiverInterface: 'ja4q601p2799gqz05vuc4s5b2j3cinyzuhid4omovdtfxesi4fo19y6k17c0ol72sqyr1bvv6q32avau06ddx782wbpkn7jwoozr7rhze80iyvj82mxupj7qwiltm1a192vwlcbynnpucbniba3m1x1jbq54e6es',
                receiverInterfaceNamespace: '4q38zy7gnhi9jb360sc2pp4rzs3yijt3lgs6rrc8rz7oytl84p49elj5fh227vrxskzynm9l33id8lmocl4djjheuuic2smqp0ssgfboyk38qtyj729yjafrjkbjvscjbtlac7jx34s60y48vuk8mtraiwkepcos',
                retries: 1761595424,
                size: 2221910842,
                timesFailed: 4650379519,
                numberMax: 6204054993,
                numberDays: 2057013435,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: 'y38sghih7qj3daxxztckn6iy28p35gy10nsh5eka0eqyiwo4vv',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 'faamjf740l5uljh7sg3a',
                scenario: '2qbqinnjdh894q3z4378db98a1uui1er5bxkhczhqmzs2ipq91yynh5t52wq',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 18:52:52',
                executionMonitoringStartAt: '2020-11-04 00:36:32',
                executionMonitoringEndAt: '2020-11-04 06:43:03',
                flowHash: null,
                flowParty: 'k93trievj2pofk65vuwagpmz9nb30cttt5ch84cj6qtqilww93u7gzr7ekkf5l73rtdlwxywqu9sxeoonv1txpf6bwgkdgekqxnsq07aed3g6jex3p7gr6ux12st5h4fxvpwl6ffg6c2coxjs2v21kulrko6cndy',
                flowReceiverParty: 'menfn92u2bb7krzpqx2072xb355y47z3aq11wq1uogsu5uk4dhuf2xfcl8bg8hco56wh9bbqecly19mhpeem2eajnecuc18ihswmlsieuimzv3ucb4wkeezb9y6jc4cdltgf477w4blnzx71xdhavddyfbhkcjuy',
                flowComponent: '7dv47mvkdjhszjh2z7sb7walvyt8zf8u87vs2x8yhgm7skxyl76czbqaqu9qbnu4nypyby90kg51npx73vhsoq69ohgopok19nc0xyifdnxl1f1kp0q7cd58zql5gr84opi6n4ridkr8p9kyv2yrusjk7zm32o6n',
                flowReceiverComponent: 'lwe7k2clmhgknsbxvzbmf1h3t1sxl078o5t0b46p6uvdau7mmwha1w8z0qhdvdulkst83o87mkhia6y08qcf4wlgbipc6lytzawmwcawsv079pomq2ccyjqzy521cn91xy82psrgoue8o31e4jkk7f1fpwo2mqk9',
                flowInterfaceName: 's9hsag9gvufvgp7y654ehpdbm516sy0yeairawlr39rwv401svhufexlqnnq3doe7xw6og2bp4xpilgtz22z91v5p75uc6uw8fhugy7fyirluuw9o0lbqmikuiagmrzu8uerlzd3h5edzijsekyyko87y8tk3lht',
                flowInterfaceNamespace: 'c3ou1jdfci7wwi95rmyl9nvclfadq7y70mtuq2qrd7endp0k9m1fxu5mv25mcgxjor0r77dh0wb6qtj087x0o9axfsa7cwdxd7ya8pav0lxrrvgwiv3mf8fqayvewry068z86oxme1qduz6mmwkf3o8bgny9c8wi',
                status: 'DELIVERING',
                refMessageId: 'wcyffzkz2h21ltxhrg4bhqoxvnql8m5755vi13t06sfl62ojq21u241tghkzeod8li47thax78qs3mlnalmufs0yabbv6gd2k7tvdgyx87epuwu869hbrvsvtkr9ow6red5ojwkfkbpfqji6nnzeaoclmzfkr3f8',
                detail: 'Quis maxime provident. Doloremque est aut. Molestiae quia omnis ut numquam. Repellat molestiae accusamus dolor. Et non et sit velit illo.',
                example: 'zve8ev64trq73fhvr0k5qv0roszkg84drcp6mt57g66cl8zqmj5o9ncfy1s7ij23o45v4k26a8gxe8karle8v19s45jkfi6nxh8unhdmn1dp9808ppf4ibgubnoy78egtpzr33b5ngxx2kk7f25t5nndfcn1wzb6',
                startTimeAt: '2020-11-04 07:31:36',
                direction: 'OUTBOUND',
                errorCategory: '3cmmbrvd19b20hpyke4ah65a10li3c2j0hncjkr54oqzokbarepds3te1wc9ipyy83jdg4yg6u6p7730x49yl3c8cft4ejvf4266faxxu2mu8eve9owbwxl3j0dmkyf9m88j8z1njeu4ora094zw52r2czmez8me',
                errorCode: 'eqm3o7n759spurdqlbbxk3ho9tnf8pqkgk45289acitcdonys9',
                errorLabel: 626238,
                node: 9928244319,
                protocol: 'vmzptcs3wwjs5q4v9xp6',
                qualityOfService: '42qfxqw9oqk0ahjukubb',
                receiverParty: '1fl9x1xz0wjsuc7tc13p3nkqs6yl1fvn01xovpqpoynsiokip5ilxbaovytcw489db0apcgzjwo9q7t50nj79qkxw2bv8wifa9ac0yedpo23w7ua710k7a87uo1c9hp7axwh7oomyzc0n368ugm27h5ig1bvru8r',
                receiverComponent: '5aw5y2bnxhkkblvoy88k19co0lgejbjgpbjeu0itlnbyq4r1psa0k8wif8a9eyy4whu2bamk0norestbe2j26n6wyhxak3b5je6yxmfmrvj4nw87gwy6uph8659na7st3jvwydekqdv39kht19bj0kqgsy289uc5',
                receiverInterface: 'ikvv3f4ngj1dqy50wrurihzveyf07pved5gjge0tri2uyr3cagvtvo4f3u6mrq2wctzzedl3k0prbgo4x0zp6rydczgl4rz5wxwrybbq5i4k1fwih65fjkfchnwfe6m7gipctklwvmqjcxc2kpadu5plkdapwt4f',
                receiverInterfaceNamespace: 'kuxib66envwf0z4nt6ytvyu990hk0aqvqfu37ssh0ayvec68jl5pkhomfr1pwukpt46xwjd1p7tzgfvc91s29cnt8qvgqizfxiijdl8yoqcqfk1ms1fcknm8pc7wfatrhuglc3blxo7prkrm1kauq4o2uwws2594',
                retries: 6604676329,
                size: 3025007033,
                timesFailed: 5326130485,
                numberMax: 9893357240,
                numberDays: 8002576384,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowHash must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: 'lwnt0nsrupuz9b4fhn9bsrahyzowmatpq0qolxjlmd9hp4ruob',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 'zlj0dvwcf72e48owawyw',
                scenario: '0fqcx79bt560eh906pmfwpbnorf6ms5xkc5obx39d4gbdp608bmindrldtmd',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 15:47:30',
                executionMonitoringStartAt: '2020-11-04 08:28:48',
                executionMonitoringEndAt: '2020-11-04 21:46:44',
                
                flowParty: '7epn5saekya6ms2b09bh0pzhswe606k063rzxilhl5sjfjz650drfsu07yudpppfrozzkw8y9upj3mg53owl8mjjm58jvwayglhsl8a8m8femkzvdf7l1tmrrehs166f6qou6i0u5jpo3kmxv6dm20d5ppvp6ylo',
                flowReceiverParty: 'vpmau2vyemw14edfd08ipq0vdolyosw38u7ex3blq85omlhdwnr44crscpuggogfost9tvb9wixqv3cqfxc6wftl0zpzlpkrq77p5g521turuc7g5295xuxfyhwzyp674jnfzdxhcya2kt98o4ww3qrih1cr0gx4',
                flowComponent: '10h7wp3gxavdbpz9a8yhwydh76cez77lyeauzbmix55we512sjz6o5z7fk3782p5qugtvryjab3om81vxvzdfwptn5jgeaw9izvvum058mu1uflfmo8l3vixldvb6pw7ewbac9zf9p7f8i984vvmewatbjmvwq3k',
                flowReceiverComponent: 'b83ifr4nvy10ms35pqeolgmv0biwax46ecv61di3c07tx3fsmrxb7ewr2tbymv5w81ar3vbzw9cgjcnv14xyifeg2y7sbiy04ea7ckszrx4mp7ig0o8ei4lvpvwgzngiqeksng9ok9g0osrm0y30ib8yltys3enp',
                flowInterfaceName: 'r0nvv5l4nr4749zxhltdu1pbb63sqed2f2lmdye6oprtkl9v2swp9okf0ebbhw9vo13z02v3vkjqbw5k5ds7vlav3o3uq2zizc5jng7jinnxtxklblzdb6k4vmeyp8cj7e5izo0kjaft6gnqdtrq4pjsdxnq3x4h',
                flowInterfaceNamespace: '36v9iwj29ydhxgr9d55pv5h7jlqp5x51vt1fpo44e0vxj5mkx7gn95q69xml16hfalj9fcvgbl90bo4ydv29163or8kv1aqtpk6q2x9yumu8yuixst3awkkt4p9me3n67imya2wiz6n10cidbambubg347qe0fl5',
                status: 'WAITING',
                refMessageId: '2utzmjiojnqdudl5ziexzmlnb37mpikzy81vmmqagthbllt27220wyu325cdlb664meu81kjp57gi0voa1adq6h9l01h5z0c0pg6s7mg7q7p5zclzm5gid51n2gq6mjgqz8h01yxcmnn3bz15y4oru1ti44810ro',
                detail: 'Voluptate quos ut debitis distinctio. Adipisci qui eveniet iure similique. Quaerat et vel quibusdam tempore molestias. Voluptatem nihil quaerat qui in illo in. Aut nam optio sit eligendi et optio cum ut.',
                example: '6w2w4iqxlh0nnj1yf86ibi5n5s5n2s7sugalpi7isbkabmhj8hel3s08acixdy05124kdtuplkttd4cps0abd8ylbki2lvv0sxwehqtle1hhawhwsneu8wqoj14vff6npz71ijmyfqhgp5qzvj5pb99rnh5cfa49',
                startTimeAt: '2020-11-04 06:16:56',
                direction: 'INBOUND',
                errorCategory: 'kvz54n9jika83q88vnav17jh1b5px0ydz4omi0xnlao9wgfvush7qbg8wltc4shafqb9pn5hkydvx0zpi3pe51wkezsfs7715aqqqtlci3yknzory7iu2mvh7dsir2dqtt4urie8q7q560evbkr6c9tvc4nysyi7',
                errorCode: 'wlrjrptd3y8wcaxzbae0wpoye6pk99olnd6n74t1fjegefxjg9',
                errorLabel: 462163,
                node: 8011790662,
                protocol: 'ztf7yxz5sl55bia8401n',
                qualityOfService: 'lhkm47hikkubbyez3v5l',
                receiverParty: '5087y2yg4ivunbs7qn0cuihe4jeikumdoumzsets41ag2mcjhsud1v8t14ula19a1003e0bac3a9vuchv90ryj614t3owletzeud3x5cfnxum56ruas6p2j91nzegcfjpmqbnkbf6eeeb19ilzuzzaicqzt52h3z',
                receiverComponent: 'op1u7upyr2k9gemaquwiayc08klse200jsuf6z024cp1d72zvum8paw5ndlpsn8o8khttv3xyy9og693jn1ucmj70s8siowsvllhzjf303hz6ecwxv1s3kmffay9lgychds42771bqgngr065mlu4v8mxfsft1ed',
                receiverInterface: 'mwqfb7n0cokai26jug5vhbnhfm4hgefi4pygcwfau2y999m3wseyy7fnvth36p8ktwpizx18mcl80an1pwh6wl1dda6xou1ciko15oz44hauay3gh57735efy766w03rn07a3tizkoi4ps4npuysnzras7uuqox6',
                receiverInterfaceNamespace: '1msxrt8m776o25ta60kqdw3pbzemgdv02n6xfzyq40jiagm6x0hop1pxlkg8ubdx7mpzf7a9zlpjzzytbife9hzybjbjn72s1btymfqz6h0wexpmlxr9i2g7tf3k601eb3ar0gw1xfia1l1itton1uu70ufbsunv',
                retries: 1849460659,
                size: 6953650492,
                timesFailed: 8228348897,
                numberMax: 4704052386,
                numberDays: 3159012604,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: '6likowmdn3rvyl0bwteg8rvlz231wb3p4tlkbydm2bkors6q45',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 'g11o8qpvn6dw7sbbr28e',
                scenario: 'p2v1w4ygc5hr8uxfbjnlj8g1kcrazst371qubls2i8rd8cih7mswl4mg9ayx',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 20:04:39',
                executionMonitoringStartAt: '2020-11-04 16:13:09',
                executionMonitoringEndAt: '2020-11-04 15:59:49',
                flowHash: 'u0doffte0asvxcv5rsf9ornb1p17v235g11sttqr',
                flowParty: 'zr6l6ef417lte435ieln00x07c5xmwtp80b60ze0531imxwidn8foaxabqfv0brczu1fsnvr66q8zkabq33bfauwhmaangobntrx1iqvst5jmzqvf5eb9761huu0w5j6jfz606yqq8r9699e16r6l1sawag103of',
                flowReceiverParty: 'ntmz123dvng1g46loq0ejj5i5k7clc9yjauyjlajlmyzkdx2tzoowo16pe66vv10sxasizp26koicjvlrkzbxneo709ta7v60uuav9lbbay3pza3wbgyf3euc9rf1c8er20pl0sberbdr7i7jq3ts5rq1zy6zj3k',
                flowComponent: null,
                flowReceiverComponent: 'mj85uxcsqwgm9kk3hm1u11rxjyr9jona094jryw0gu68hl6n41g7k9fe1ce77n27jq16far0wr6x279kcaccnwp3evv8b4136b8ymn6gy4ioitgp3es43eduts2jh1a1nqhrbrseb2tu65igdnsmhf08q1huz6bl',
                flowInterfaceName: 'heeyckml2djrto8c4rj37vcn0hhb3693ohiykcrpb3hsfzztei17747fovw0nnu8k3mqm2qqny1630etguul3h3zmevf6medmrmklkk31kggghqpk1km5zi137b2g0ri9y9dxjc0vf4fq92ifdpnyg7wvgs9epf7',
                flowInterfaceNamespace: 'gool63cbr9t8su0xiq4rptqd0nrkcbzlkwn3sbkh22p78yalhyev6awqf5meepf25rq69vmvykn6np78don74wovnmpd9s49mekocfxg2ytvi7xvtqoh3wgwtzzyyzkfx0d669ckll3b69vkcvuyfupn22pujccg',
                status: 'DELIVERING',
                refMessageId: '0spnv2ku5nbo2q5xzl2st80npi8p88uj5coyxvqb5mss9ewc3pou2kzvfyxj79rru7l7csfcz8glipeik7v5eoltb5hkzx04hsyhlqpivura013lw3ddcaa1kflfuwd9q2hirjqlusim7fa47mmlycpl5rxv8d4f',
                detail: 'Aliquid fugiat error ab possimus eum culpa. Corrupti quis assumenda doloribus neque eveniet esse accusamus. Eos ducimus dolores ad. Dolores veniam eum maxime voluptates quaerat.',
                example: 'kj490bba12oiaabsd95r686i8ptkpn5fhsl2scyefjkky9mwpmu3xl4gaxv4whtd55x8qun8ioohnx6e4csf98ewjdbriohk03k36yykbn6pswi41gtbvlu29mmpr3f7gspere8xmga2sf04xvksun1m0eddpb05',
                startTimeAt: '2020-11-03 23:12:03',
                direction: 'INBOUND',
                errorCategory: '2b7iewmwsxxa4v4fhqpwaq8op01plz4fjfj24zo3v9awdwcgs9vyrpvxvllnzed7ffvenlyuudc7afojb8mfhrqf6y79zvcdizjs0o9pfyhag525m09pta298twejvptm5t466acmi30y5chnzws5yhlyd7rnjfw',
                errorCode: 'vrnzcz79qiqg30ng7wf7r0i0klybg7m3o9id0ajlowa9ull1cv',
                errorLabel: 419600,
                node: 9696969420,
                protocol: 'fn2tc7m99gl3tj4l3ze6',
                qualityOfService: 'e23jboszghhi9p9csttc',
                receiverParty: '9xj99nhqy8525nqc1cz9i5ehr2hdrhh15om6v68615whoo797obuh9rspipowufirtmyl04cv26cucc2hnmglbrqsrxkxi6t9v1apvojnpfbj7fxpptq3ktucd9ikrx8l4vezzdhnfr9o2to1jjf3s2o23juqp9k',
                receiverComponent: 'gahgufnnr6073661txtulrsoow2i0fi3m1ifkitcdonp6hd3betixvr5qm540f755espd692kdgh0qepo8wc05v3tvjdx3w1nbdw1ij8cnjlkklklywliawxrp3bn5m1k6wp6mkkrw945uur8vhb4tx2ljxj6qmg',
                receiverInterface: '1avuj5wuhm1n4ko07rnxe4gwnw6bo7wvh6vdefhxbva1hn1guluegcj44dty2m5x97ujihioa30a3mq40pct5qq9c04y9rxav7itjujfko6udtpopvvy2vzyfkx1vr933nebovja8jtrlpgnh24fko4rz3nfy7yn',
                receiverInterfaceNamespace: 'c3zjw5fzr4d7hgsywg4a4lhh904vej0u2od4k6wlnykmcg4rsn0r3r6nrzftp7ucij3if25o5rh3hctka4spqj2gded6ozbokcb2yfi9orm1f6kh6crodghi6cc24157n56o16cf5blyuglnieulamggt9j05n0u',
                retries: 3048704068,
                size: 1905469594,
                timesFailed: 4131033218,
                numberMax: 5219707250,
                numberDays: 1746546964,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: '2zy5643pfobdp2ymd4i1xy7wa3wrtwbss61ky7myr09fnybaj5',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 'x02ncngjl7xu2whlzvwb',
                scenario: 'dmyhscvgkwkb4trpn1cyy9cg6gxbxceo4iocbjv3xapklm3wx7wh3g7h2x5a',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 07:40:48',
                executionMonitoringStartAt: '2020-11-04 23:00:21',
                executionMonitoringEndAt: '2020-11-04 04:58:34',
                flowHash: 'lu1xgteyadir5dg19vb8ucjr5huiv9p19yaqpnss',
                flowParty: 'vjllg7cmmvz6dpir473zlui8g0hvfydeb98k089wjjapih5eu3ioomn8kheqxg6t9fs2rrp06v18mjbhx7bwcv1m6p8neqmugxx8e4nzm7axqiolqd0ln0dt3k3iavnajoxn09abqivvgtbyd550pdmi2y94uiec',
                flowReceiverParty: 'xlog7cbnuytfamf2gpp1vcc70nxrplan3a6bswanq9jgvd15o8nbw2q5o34ztwj1j2jcevjbc6hmyevwkicpsw8zv9k2pynod9j6kum8sflwd1o25cmk247qgytljeufzf0xqhl9da3qw02gal46yf4rfx0qqvd5',
                
                flowReceiverComponent: 'irxbbd5hbz2uhffrxm2hus4a148i2mbovemahu2f4msr9xoz6o0hph676y1w0bwwkmxgw0g6hsf2recmerytysz7mz0nwcufqxrcjwp1julnkebnxywa4pl33z1ccti9r1ujnj8f2ejoyi975w29j32qvmh7ay66',
                flowInterfaceName: 'ny2ef586m2wtltl5a25k9ofxk64h1mk0994vnbviihimrnmfskhllnh6r9v5w6r8p8gfuatzmfztjek01jzxhllaov4el64mviu6p1qy839et00m6f8wj9jgk591alxy2b1nv6wsj2jjyk6xzha23yxb3b72y973',
                flowInterfaceNamespace: 'e356m9rqbqd5a4bx5e7ub2rbd8q3ar6ddpf2clfrcb0uv0ope1o2ukvcv74nknp1sydk64icur6bv31zg7eslho3nwvjmumhw1ycu75fhrvtxzken662edb51r1em5s9ji20f9c8cud25r9u2ll3cgc612dn1mtr',
                status: 'ERROR',
                refMessageId: 'a0s4xvhf2ar6tk4a7bbipe6hhv4a63mxjoj1r64dmj4mhfueqq1ls281tcpg3v66xtt99zzp5a6z5h2l0rhpy6zwlugxtnc2wpuzrtgtuc1c4g8o82kgy83xypwrfuunlivj34wafam4hfmgr6p834u5wzkip7fa',
                detail: 'Et sed eligendi cupiditate repellat. Modi voluptatum nulla eos qui pariatur. Architecto veniam at cumque voluptatem et.',
                example: 'vxx06ae7fl4f5beq0cxjx84cblfj5fqvrlpwthxpyrtidif9zumy5zpuncb4p5i5sd4d40mw9msvrouy89y3gzt15t6wq7h5ej77zqqdz9jfjiq2bj5nc0e9zcyotpbr8vw8l6nurqsxmdpng3s44ijpb8d56boj',
                startTimeAt: '2020-11-03 23:30:55',
                direction: 'INBOUND',
                errorCategory: 'zq2u5j58y9qaiyh0a1l1qaakhcghiz1s2ccy4jmy5y5jb9yo6ekggzg4yl8bb5peccn05vdbzc3u9k8n4cy21s1u6z6mcmckqzclt7mzxch3hfwm22g2mdii1kr45xwral6ipk6yen4xlwzgzh26azl1kwsygwhx',
                errorCode: 'botcdoopw27z7wno55jg6vlhbgrk40a6e1e69wnvtjko6d2jui',
                errorLabel: 947168,
                node: 9816979955,
                protocol: 'dspduptfcxvwyaoswgx8',
                qualityOfService: 'n879xbmor1t4lnev11c2',
                receiverParty: 'gqtxknzuakran5iwbrt449o2itqfhap0hls35egpycvu5bj2xfixumyeh2wpbq4yn0gvfv1igfn9wt9wr5go2mhgbt53user0r8s7ouwb41uw7xx83jc0rvruhj6i5cj7qoz7e69ugpoie5z827lpths85c883n4',
                receiverComponent: 'hf8mjirsb7j0yfsxrhyu6p0jzdzkea7vdob0inyox7yuelpwnbtl2n6aqqmzf37jxg39xw24vs8r4siyp1x7bhbtx21qnrjrmnkwcg98dpngqq1j7lt5p7d1kl5lvku6i8wzzlychx357j9q15tj1rvopk9z0nkg',
                receiverInterface: '4dr865418tgb7xzjwzbo9gyuiwkgjmbt85j6vrnu3ebqhb2aoiyowwq2qbkywa4gsp94b4avpnjnpu8ix0z44o39411zzcwl7upx5iztcxnlezrsvtzmly13e9uu0fgsfxfr59ktp360g77qj3g6zjqr7ikqbi6x',
                receiverInterfaceNamespace: 't0e3dzjrxz3u0wb6afzthwalp1nietp317g3xqahlhojb5seevzo8fhfxh08m5l23nap0dh019m5dvrmbpsqeonoda8mtp7x0k83fp6g0ai9iqrukhp00tonteqld4g2wps1253tspxbqya6e9981cwvozvwuoqa',
                retries: 3437264655,
                size: 8874279426,
                timesFailed: 7425309128,
                numberMax: 2074025655,
                numberDays: 8233313034,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: 'ikpfoqjl1nok4p0c1l4of5d481kcov7p8ttr0czeeebrax2s4b',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 'j4ococ4bumn892a9l9r6',
                scenario: 'j27gz9axi6cloxouwartn5y7khke7tpfwieia4yayhibdnbwyyvx8vyjohb7',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 13:30:52',
                executionMonitoringStartAt: '2020-11-04 17:00:21',
                executionMonitoringEndAt: '2020-11-04 21:07:04',
                flowHash: 'jb42fwxd7ueq5pbyo33df0f8yjjewuzy5rgomea6',
                flowParty: '5u5ujzqob8psldortfvlfwxv3taz09lpp928nnv3p213b01ldbom8gsiuc4zou2b0mq8gww8v15m55q8zare4vfks24pvwm9hyrleycy99c8m3f7guhll65u274pddl93g44b717kgygtnk7fid5bioec4v5x5x7',
                flowReceiverParty: 'l2wvtudtjrrnbx7o58l7wuqowlm5j6tbzkwwgquje34ez8n5ui1r1olkjzz34jnr44jddmaaibpomahwjzbvwbz63swalwjiswcs3rc0t34rz1f7fz8hoyciowm9trh0bq8i6sur7kpk0lmee8olpq7ftdhl1ua6',
                flowComponent: '2sxe7iuuuo4ykwvxn56gv3f3cio4crf96qhqelqf6xh9d9faogyns37b028pwobh1648b6g5ihhz6vs0x6kqkados4wiidxuahc4crxxyq5ui9lrl9n2jk8v2n5169ib031f13nx1uemwmxvygwpbvl6nfmu78h9',
                flowReceiverComponent: 'ijut5l9mqxmcjebt7iu723dwibzpk45rvox7uu27ll0d7uyuvk4j594t3z3rfwz7sbx695c68hj1ffjvuj07qxezqzkwq8vdthuvqjd0hbjyujx81k5t37q8hg271daxm7af73w5esvx942433msze0a1cjsn8o3',
                flowInterfaceName: null,
                flowInterfaceNamespace: '4f4vxa03wvxtifqyvph04zogs8z7ljgczqvlmlrfrypps6yojpcg99remy8qfjii3gt5iji9m85yaio6ioxdre7hzjbxj0idjyauaa2rymct1lqorjthpxz36fdle0lcfrwes1mbup6mvx65svuub0nsgpobzhb8',
                status: 'DELIVERING',
                refMessageId: 'ufmatq24f5s7s9x0h9msq5icnqv21ikugvjw291rjyyhxnziz6fb9wb53nfl20i7sroj9h1g496vjou6e6v7l8u8pd4dvh84wyznvutwn845rtd2hpu6vj6ajg7dr5wjnl3a20bst7ul68qv439d91msfooekn3s',
                detail: 'Deleniti sunt deleniti aut praesentium. Voluptas neque molestias molestiae tempora ut vel voluptatem. Ut est earum libero quis voluptatem nemo quod quod et.',
                example: '1shnlnanpinwzpuozj11dhzidevw2az69713c730m581q4c2ohnu82mmbvlk10jsemppnkduujevl9vprrtcsseauw10peaj33iofluto8c612zjuh2w8txqmngvd9rntkyoqt2mawpcnfx0anhkxjo3gjsb95ua',
                startTimeAt: '2020-11-04 11:38:01',
                direction: 'OUTBOUND',
                errorCategory: 'n9w650336e2pm1jmb4hqw8cfueh4w9l4xbqvw0j7nxgjl1i5z38fy6cnzwqmlbwhf517icpswpyhy9i4i98h26rvqdtdbwgy9ww020bzovkyykoeo4tmiyulb76hur8eju6odbzdwqo9j2aaeq9azd4rirmfke4e',
                errorCode: 'kukbmu8qhb1azoumx8pvoyg1yunrt6i55h5w2y8lztj7rcrdsb',
                errorLabel: 281182,
                node: 9383986567,
                protocol: 'sk9fovb9fzv1016lprr7',
                qualityOfService: '2fgvizzh74vin8yrizsg',
                receiverParty: 'n73mwbdrmic8xtd69ho6jgih80r9iycnpsomnj0xrtn3ibmua36it0h499xfttkmlwa5v1h03u0jjg81ul8mipeejkts42hbkymckqbbsrbg7du60atbp8r5lyo95y7p6ltsppuyxrwybkxdjc47ywnf6ctpnrhm',
                receiverComponent: '1dzpllm0jfbl15poe0ko5eioem6d1hiyiu9w7qwe5dqui3ukxuluxo887mc7qb1gkojfzk6woes9dk5ghwkf6icmeq3z1gx89nryixav86bnnm633q7uwz3xgwg1tm5bh5n6tpqu59fa2sd58junlassu7hv9l0q',
                receiverInterface: 'dniz9h97v6nikxne91803mv6sack6w8iqp1xnj2heuqonohy4or0b3toriftllewh2anzzgcokpfuvqfmwxxk3dypnyuhwsovl0m8uakjbfunsxntm4if4kkrvpvbiclm4ybcx0nl7ilfn7tyuu1d24na10vium6',
                receiverInterfaceNamespace: '15elg0tuo5gparvkbzye4de2ed2c3mtg2jmhbdr9obmald19v53yfmkde472pw6wai4xirncei9aojhk3mm2lglujlbpmuon7mvvvcvxg2dbh7xtba975r0ll8sie0nlljl6lhne95d1zql85ffoubu02qibg2mw',
                retries: 6016609831,
                size: 6178023741,
                timesFailed: 7745489204,
                numberMax: 6808589201,
                numberDays: 1473302701,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: 'nmt49ym35vzndo04fpv737jwai01vfrpxhxqs318wfzws9jeac',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 'xbi1f84zty268f1d2m5w',
                scenario: 'o4yrdicpho7x6diwy6bgau2yaif8su36vj6z39nfnagj1xw5g7k4voju0b6b',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 17:27:04',
                executionMonitoringStartAt: '2020-11-04 16:33:52',
                executionMonitoringEndAt: '2020-11-04 11:03:10',
                flowHash: 'mqefr6ueu1f4dw3fuylnsp27zluruqo9jzg861fk',
                flowParty: 'rp8zamrj8mnug0dny0jpxemcblqap557mflkvwvz7x8dvhobqrvvschlhtgu3d48n0bpbceccnxp2nrxh21wutc3987yhu03jj9jj1g0wp4ag8kant5gshdsdzhhbwbz83fk5cjufi31lqez7t8o7wdujei6cgr3',
                flowReceiverParty: 'vkhguvusaazc9o99aqdf7ulwope4rnr4mz73haod6r26n7hakywmiixlrya4hkw4k2k1tqhfqx0pyvhhps56yvec48z2thrbfqq90wsevt8coao74id1a98j7o4zd4zaelpp2o4bwiqrqjhng96sqf35x1sbcb8q',
                flowComponent: 'w5nwoi1pgedj6rjyyvhlb0myullmuv7hjq9p1ar090di9ig5ciqyrj3jb0wqypi4hmzchiu3550mqlkjy9kb4b79wfgfkpki4qxsxso3mlolforni67yrdq2tlfy9fqjdtboqi9pfxgmjtjnecyzkr1lzmy4kp01',
                flowReceiverComponent: 'kfmcmncwfe0mxnu9420eucylt974a0onw769x6dsloa923uwd1zybpo8n8tsxvnk7sidj2w19mkqrlg9qemh0n983iy1rwa2uv0epm5x9tsm9x36xhiurs1mtepr3vo624a0qk6tfif4qzeg4bm6g4vjv58jvoto',
                
                flowInterfaceNamespace: 'lapeqmnt6iuhu78if7sgg5bjgqp1llp2xibwnkvcf3qunk4ko6rwzc8oussk84rzvj50rc1eujawdm9hv2eljneq2vn078yv5jc6x5rtwew9boyypcjl8nmwvyini8s3un7hrwx12ocumc2lt9lasnpb3vmukn33',
                status: 'ERROR',
                refMessageId: 'ajr2z8yxwerax02zyrzlpcl2wuizv67o841d86yr8420z3fv0eujnvabp04mpvapyptww0oaetb4fo32j6mk0ucto6kh5l1by4if6151usgelfeikajmmq7cl5u9jlc6rrm5mr56seqch0zr5nrqs3rl04xql1jh',
                detail: 'Expedita doloribus explicabo ut nostrum voluptatem nostrum. Veniam vel recusandae. Omnis fugiat at iusto modi. Odio et deserunt harum consequatur illo minima doloremque. Rerum ut et.',
                example: 'pjucpxi5098917xjruik1obp4hxnhe0vs6j7gz05v1b1suodaq77sn12p6ms1iskn20y1874elor3k8nnkcr2pf7jdvdawkpwlc5zzxhxo7fj7eguudkfgbr860ylezyocicqlh58pekqm8duc1rad9rcly9q3ka',
                startTimeAt: '2020-11-04 14:41:26',
                direction: 'OUTBOUND',
                errorCategory: '498iflp5kcdvt0unyvf6fishro4ls8zaxmqstjrpaho9419gg6a8yccn9u8llpg1rel4n1drstbmjl7bmaie4422re875ak671mdt91dptaf28hst8kdj56l1txvkpzl7mq52o8118wmchgriphzdyquuiyziunh',
                errorCode: 'b219q1dskcr0kltq77goiyb29w77zjhc3hbuwwhkph6hw6aw8z',
                errorLabel: 116607,
                node: 9201489974,
                protocol: '1ccnb4lbs4i1oagejayu',
                qualityOfService: 'dwb91rpty678l9fw2eeq',
                receiverParty: 'z0ijn9034wk7htuci2m6ba03g2rtkdtlddfxi9997kghkft03nz6htmwx97qld6oixydmf5mitt2bitekxuuexkybgrij5ef3gsj99hjscjhokco55todjpfcuty61pqkjrbvv07z2n279c2l079y1picj5j16up',
                receiverComponent: 's0558z8pbozukeyoquhwxmclwyv1ebs6fjchtjleucbx7z2vys2u52z3ecno6n0758j4sl2ye57dh61yofq5202cwqtaugc4150hcvumtoyfxkq2f4qo0rxjh780vhei709jnvx37iqsu2cyuxxgpa6f3b5xbx5g',
                receiverInterface: 'ydxgltr2wh35igbm3vk2b9snr9z191ig92wjahnfspupqgvr6lvpr7d7yi1606vzipxaut6bpzw58zd19i58ew4hvzh5cilr7653g1hmq3n234ustart38ew9r5xwxhj5a96p8kslwg1d87miftlgwdpc5g8mrek',
                receiverInterfaceNamespace: 'umu875g1pbyxext2zvohmhmbuz5x7u9tcum8dbbncowif3mca1dvcy7orwsi8kcsn47x4hmhn0mk78vkw6mkspix9d78b2jh0k5xoy3si171svaqg6qdnj339dkefps9x79mttctar4sh9lda2f9eshg9xzevjbw',
                retries: 9418030391,
                size: 5599773368,
                timesFailed: 7737005041,
                numberMax: 4890072458,
                numberDays: 3727711737,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: '3pr9poyoc6a6f2hshfwvdf8hf8plyvw1csbvynloyonr51gesj',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 'fcz3bf4v5gnlh0cw3o11',
                scenario: '62rvypkrfvj0q7j8uvpm3afm45oxit0ipn3274hrguedjbigm494equtcl5j',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 13:16:52',
                executionMonitoringStartAt: '2020-11-04 08:00:29',
                executionMonitoringEndAt: '2020-11-04 09:06:30',
                flowHash: 'pf7d5atoftrkablsy2ryxjepkgn7tr85ieyjbeq9',
                flowParty: '2abwumrcklv6rqw82qgcygynf7rb7pcuvukfki7m20hoz82lpy647z4eskibm1c66ybimkv8ze5k7gewqa3orkrkq8ozopzz1gvvh67w1k6ez0e2f1vd7no3hwbim9unjmb784xk1fbl6g8z7j1zv0p9v1er973a',
                flowReceiverParty: 'czfqzjlirj14ch8uzlwv9l5nmrfxyvioeeja8hl79z80mg36m8dmxk2lo2ks0me2dwuwcz52ikf25o4r44bzuhnda4jqcu01hrbibdc53riviq3p1m340ht4litmcru40zb2c6hs0ij0f5owkju7493ikyytx5fm',
                flowComponent: '01fe0nxii6b5ymwwwv74b7fw3ufe86vma8qop54tvoeatm6680unp9nqbq2r7ebn2bhf8m8yvlid41vtvrzfybv6mfnlxx742lzogxkqw0569ugqs505pragqccc7odwi8bu7t34j5b3jadw0jc57r9m4irjb5pb',
                flowReceiverComponent: 'dkk193udxvchs7gfzkydxkhta9mi3e8f7tc5qspyupr332u4zapzmthp29q1c949y8p6gufzc43o28fkzjfow77eyi6e48cccg5dcfok0rxtnsxjaqmg6g1i8fqi3djg82sq1jdojg1fuzu4970r0bb3iobhuok3',
                flowInterfaceName: 'h14ljrbcuey8cf118ns91mv7vzxo1ve0vcnfs974n7k40ah0tgngk2vecscug1ywm6me5kn9xtucqsfstktkmu9qpcwoabnh8i6o7q6p5od452pz5lcmt36p1wss54n87ck834wtnu49ti8v9j03hleghn5rv2sr',
                flowInterfaceNamespace: null,
                status: 'WAITING',
                refMessageId: 'iap3lxrralsir3fsmq18mlrsjr99vwf3h0ek37x2zrbvavkyltk6kay2eg7mf49o0br1vw6x37bz06j6uojo3gkx342p3646jvenfeceodhk315trh1c561s6wzc1dkrksgi2pq29oj43ak2yht12adzjjb2ay3m',
                detail: 'Nesciunt iure sapiente sed voluptatem qui eum architecto sapiente. Maxime error esse. Veritatis illum ipsum est ut sunt non. Debitis dicta doloremque et quos rerum. Reprehenderit omnis nesciunt et asperiores dolor explicabo. Eum facilis velit quia neque accusamus autem molestiae hic eveniet.',
                example: 'jk6lvn9fnxsmre4lum6w4fv4d7wr1uhw4pzupq7op0qfagvdw3vlxlymw5tqeles6fkn137hwmsd0ymz9v1rnamlajscxoo43d7ljasxnoqo8tfetu4fmah7i1m3u7ki4vnrx645jlqt8txvwxfn9tr3grqpfw9n',
                startTimeAt: '2020-11-04 20:04:54',
                direction: 'INBOUND',
                errorCategory: 'de89oz9wu7dlpl3d7omjjorthv7q2jmjb9qtjsqqqxub3u14v542de6ru1slj46kunoffag6hto5fpswzj45rzfyeswqbxpjtg7uqw1t3owj9sfdfhkmk5spby6ru1p0ri7y07uxo2ns4c9jntps1qxhc7sp23fx',
                errorCode: 'h62vwqi4wro2lmte9o1w5shg4bxsiduvgcbiwe733uugtvh7x9',
                errorLabel: 700991,
                node: 5222970173,
                protocol: 'wkczjt1dx0fzw76k1kdt',
                qualityOfService: 'kqtkj77skn9hd5dg7q3k',
                receiverParty: 'oc9itdqbxjelqu5qgm838011i3onjsuzutn9zlsyncsuajovnqul2lwjpd44allj7xtjebbq50pa2to2o6zpdpp1tvlqplm7dr6w43fvaz27j9wud3ai4zdndlrh2rzhffh1cuvz87z8vjn4ccw9vqhnwp0mcctk',
                receiverComponent: '4xgci192hf9oka8r1lr1lv794fw65024tkhc1txm38zoyefnil2jmmbk03ouqsgc3xi5cmvph4th7w2x8kwcifcuuxa3b3qsp0f8t1l62lcb3ymep1i2dt37awfa6jir3xkuwfpjdlrf8vy7tybnxu90wfhzmt0w',
                receiverInterface: 'cswx11qjf4ytlg4cpn90s5epl3lcup2au16hfed4g64i58l85usklka5t4h5sa9nbhoutbq3q3ene45o3vj24i7d4cg2lf9o4gdmc8mwwt8vmfxkcoaadtj0xfpavlastnd1dvjsun4hbdzfleaa2ktbs6h4b6b9',
                receiverInterfaceNamespace: 'tdex9nw34cess2qr8pu1rodn9g523d7hlguds6t4q7n6p3kt0u1dlzym7fqvbnnx5zzo687bift41pstkrhniol9z2r27l2jfq1fgibrtph0lqqifkbycx4uwwtiq0c3bm23fqpq2tp3z3npuaroow5p99c2761p',
                retries: 5781201003,
                size: 2730982693,
                timesFailed: 3033025983,
                numberMax: 4335383061,
                numberDays: 7195977755,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: 'a2sx2hzttpqdeb23gx6b2wzov0b2rl4he9hrqanpa14ic2bdgm',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: '0p0zqvvjljhl0x9tk8f3',
                scenario: 'yj6j6ayvyci3ruq7ozxuciks8gseowanypde3b4jync07rr80mi9e3geg1e7',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 22:33:47',
                executionMonitoringStartAt: '2020-11-04 13:38:52',
                executionMonitoringEndAt: '2020-11-04 03:20:47',
                flowHash: 'p08vcqmg7fy0fmf6tz1agx0s8w0holhoqp2e07ee',
                flowParty: 'qdp3jxkv8g560b1ef3in3prdjdbhyfkt3vzkqnge80p9d6a6yv7teeo642xxyafb7yyfm2jaryj5i2pmwh6ou08lrmp8ig4rkdlybuuqb4m0n3tcjgbanzw3j1de7dv5e9ba7nz67f6avuwcjhoxqpmdwtnsl084',
                flowReceiverParty: '29e5ro5dylunnd2u813hbpx52hkbsc0qfx13e0qzr71hbsgzc4cpe04kurcxwsl5wz18awh95i5wcmeuaf0br0hgfdnmuvo5ruvzjz0po89vhput9y4fhtupcndrg1qh5nx2hsaal1jnxjn0p1ngiw2aw105o78k',
                flowComponent: 'n9sf1w03bsnoookd0os3omjsq1dotjj3sr8c3y990jiqz9m0qoqxv1pq5ekakatndzwqvk2a1iujp2x8nhx3zc3vi371m435x3hcrkgipjgdlje4b4it80edypol5tpzumtuy8svkifpwp2bpxpw80ee3iulran2',
                flowReceiverComponent: '33ks89o6kvdprzugw9wvp9ocfz80d2zsr5lfhdp4rf00lxvs3sn8q1vavv64inemqm63wx8we992zzkrk9l9bnlzbd2rdjkazeoahgh9ww2fbug9qlvovckudvsisie2wdp2620t1gil99nd4s9fvd61euxxw9mq',
                flowInterfaceName: 'ysxl21n3nzmu40k0ewtinwkvp9w05750j6c1joh73tnbqsz6bt8k7y8d920qxnd54xl9hixxyce8awer6b88t80u2qm4z9906k2j3e9v7cdbp0jdfkymq90fk6fi11v45cvzelfv516t1il87p47zrvuop5v5ye8',
                
                status: 'SUCCESS',
                refMessageId: 'z5tujhusc40u88nipzqr6xxgzfb9mfwq9cotj7n32tri0udyg99501rk4w38aufwe09y55lj51rlnz096135n9tavz4tqoui1o8w0iqmpcpdg2slq0a50psdwzuesjpf4lxc0fsrxm2t8lnpfs2fgae3fqtua2qh',
                detail: 'Id non et minus qui laborum amet. Autem quia sit. Debitis nihil qui aut. Corporis aut repellat. Ex ratione dolor voluptas qui a et ut consequatur. Eveniet quidem incidunt accusantium minima ullam facere mollitia distinctio.',
                example: 'f4lf7v7vgenvjddni18v7gaw651dw094q47q9qz1pn115yz74p5oy1zuwpzxhtsnm29luynzn9qqomvi6gy2n7uvclnovdn5p1k0fr7mmwrdqu8zxtlv4ayxldq2j7ta80bdm41me8fjbblzqcgmgz6uj7dgqa3v',
                startTimeAt: '2020-11-04 00:51:43',
                direction: 'OUTBOUND',
                errorCategory: 'x0p9uzbxaptvp4thfqwfi46x28c5lxndwrbvhn2wcbyj1ydkuvg9zzo8vh9b8wy1l8uq7057ppdlmpby6odjwxb7opdmjdmg9gh2uam3tck36x4wtrrlil8g26xj2as25k3lxax7l9zopqvviuep2thwe6g0rimd',
                errorCode: '0tu3e4asi8hj9eccz1taym1qnzdk4y4z1toeqkgj2d5rrsnmw6',
                errorLabel: 784095,
                node: 1991298512,
                protocol: '4zdxldcu9opl47ifvv2j',
                qualityOfService: 'nokdipogvxcto755gtxb',
                receiverParty: 'pluw418hunstiilp8rvrfs7dpx2p5kh449ag61xxr5ptmn1u5vhal0vtuaz9rtxyc1hbr21u352vsi74t5cq1zynhog730sqcy0wjb3cafo4413rwgo6jkdjoc3xyrekuauevjmuop4ja9yr6srk4pdiqs7qsp8x',
                receiverComponent: 'g6fy6kvzx4h66fodkksv0sv3fx0epspb963m3kno3zbht31e3h78toninn92ieuvuduzyo84ibu9zd0j9o8s1m0q8ksdye8fq18fgefwmmhvftgkn4rc3f7ekx0thlvafbsy73jbbupw0zpm6y41aozjzoc2hwfu',
                receiverInterface: '2wkcvlrz545r5e6bmqeavzt76czvhxte0iqhkudkg56uihb4u0195g1k3wxy93zzuwhu67i5zbrt7hdzdk1thfi5zzoqc3lf19w0q2m2jh54lf5vhu2gfbllif0bs6h4z6dd0i38d09y6mvht1my7jb2f1rigf7r',
                receiverInterfaceNamespace: 'dhf41xhtqbyxjesjr2wiikxvmuxdz7s9xyuvmpuum6cl4tlan6ccsezlzk804905scdsltzkos5uy21zdwwx85ftp6de1svi466ty72qjbhjen6vza8vezg8yx1o5efzcda6urxvjieooswvwogltlydeqof0quh',
                retries: 7287090875,
                size: 1313418965,
                timesFailed: 1445412685,
                numberMax: 7612491426,
                numberDays: 3891274209,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailStatus property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: 'cdizi4mfrz9bpjv5q039rnxgnfombfsh4edzwb032y5j4ukpal',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 'v24exzuerisd9z5hnk1l',
                scenario: '2la9ngsbbnidoq4tz7f9oprbs6zcnizh3yrtljo1s4lz14zsmu1t3jr10yky',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 11:03:50',
                executionMonitoringStartAt: '2020-11-04 07:00:23',
                executionMonitoringEndAt: '2020-11-04 09:46:29',
                flowHash: 'sbx6kn8fzqysv51i0byuqalukdbnjyio55ko9bxe',
                flowParty: 'sej7hg1wyn7zsko5ojbxab52os0z11wq4cxfu7tgqimocvuh0ebzevk4rxlw5snpt8cdyfwk9aat72yd838xiojwp1vb18ay7k5xs1qogn0m8h0sh835vwweh2qgoz5v7xi6jqp2bepei3zu056bzw967ant63xw',
                flowReceiverParty: 'y0vv7619spl7coz0ydwlf0r0te7mllxulc3yhj41kvr5wxi4qx2fwepn3607jnnkbrr09kojllqd1g0rzonxt19ligvlw3lnu3qqb3dtoyelrkctnerlabbpb4aa24sxtrjrsd9j9nrxsmhywt7zcalzrycuahil',
                flowComponent: 'm2opirq511h0k29a1dx6elcreltkjksvs82txixqezn8qlnn5i9q42lme70js07ika6n95xvl2qahi81w0rd8y3gtubu40fes7aix8u8tbwvqehsbmrwl4x94deblmjpded78la2rf56ikzs9s235r5a6aayjmrk',
                flowReceiverComponent: 'aheomvkyabzzq8hvh6nxkiqe6k0zz44cef861o0lu0efnns5k42qsmf98irnt8ae4qoz8cksheqv5kybeg8wa57nwny45fxusd3tsi6jhgsbve7kxuw6hfgoc3m1rafzaug2jmns3hxlcxdkcy9b3ah4qxh5r0te',
                flowInterfaceName: 'l6pxfntyjlgtcibjbq3pnzyjpsttqon8x7jiytflw9074kx40p7x6kv83jziqgw21cu5iifhijm93v0kkrjfo66ndmnytr0nlvhpi9mf7n50u0065evi0h17jpxqqmpzbc509fc1cb1ckttdwn8plb5k15781ek7',
                flowInterfaceNamespace: '1diskjo5tuq0jd5ox0jg5c218tbzg4x2xplj1k7x010r0ea3qk8tlkgs53va41hcnps9qnys7rzpdtovy8fiiqmxedo6s1m4z4uqtwg7fe6iuvdv3dzvvjfdppnu2chdt1ri3g2uuu896jojho9exdfeav408sfw',
                status: null,
                refMessageId: '1wkoiffroq7b1ik8lggf73evno8bz0uhsadaj6cx4tv5qobgwb5dz5tyxsvbetu1twi0q7pgjlow9au96fa78g8r9plozgq2hf58pjgei6hr0w7u37acbz84qlrtxir85ylzx44vdnrvprebq0r7slhawdb7hrvr',
                detail: 'Porro eum sit. Natus eaque qui illo vitae ex. Quo vero qui rerum quidem eum tempora. Quae suscipit atque praesentium facilis. Perspiciatis sequi qui harum et eos voluptatem dolorem quae.',
                example: 'aymj725or6sgfbwueahtx3gq8n8ofn7qusvfw0jio8zzww78nrmg1y0cfxf6gg3i11hxdx9du4eja211fgwzfquzel3wev1wr9ldu6hmqbe13r5p9tvzpnvhwh11xls84iovfbtgoewo8ejl3ocqz4w9orftoh46',
                startTimeAt: '2020-11-04 15:36:44',
                direction: 'INBOUND',
                errorCategory: 'ao2am7gfoesk94nnsjrigwyqal0vstufaqahb6yfjiq1jugxgndbbxr7i1ibwa246bz56pzjh9pd4ri4f579qyp4xc3u0zq9b684itkl6oeqn4ilhtlbk5czqavdal5jnxcs8bfawfrg19c3qcjg416ylufvmxfh',
                errorCode: 'tjph3c1gzznhufmga326ocn12gijkfubf3tgt9lfwtumrk7htk',
                errorLabel: 973188,
                node: 5899084733,
                protocol: 'p276adzta99sw7uec3em',
                qualityOfService: 'x74j6uum9pp6rohog2kl',
                receiverParty: 'if4ux80vde066gvn6djyti7ryby48zti5nyh4kz4fxw6e97e9xc7kgr9d2xg4bgkis64r6l9zb4nz1ekdexd4scdn927z2o9difoiczu0pejsvej0m8zchpuqedg00hfvlligk6hpfoa6nj3f7t9422i4pqd8hmn',
                receiverComponent: '10g0axuzzaatynod7krn5palotzuv31w3dv7g0ehidtc1sjwhp7tmwy5sdzldm7ek7mfw8l6evft2b3phwyz3qpmr0fjlsauwr8w5mr3k672zxqwxda3mc5zipovczk00dr39igs3n3be0rmoirssm8d6lthr9xh',
                receiverInterface: 'g1sdfh0m02vas49drc3w6wmav2yq3dybosfwzu33m6oejswqkq7nyhueagyqp1hl6xpyklppfxpyn79fw1iug3g3glabfw76twxjm83i7auvabk5h1klhx2iezbho2gdgzjl2jm7w59sfqhxi3iyyej3eemmgw4l',
                receiverInterfaceNamespace: 'qusbd9uv7spr4o6xnd4gev5ydubc6y9sbfbgx5ljfozwg8g6kfsqjrpmh8go0zf0e1r9bka6a0l3nyojsbgcp3xz1dsm4shumv48ikpjq8ropcr685kmjix8q4zswyoehkza9ifkge7pdzdj6mlfz0rns9jsezb3',
                retries: 2696840962,
                size: 3418347238,
                timesFailed: 4359751285,
                numberMax: 1170686257,
                numberDays: 9895736795,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailStatus property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: 'qiutqyotql4l8hc5nq6nypddwm05ri9odqtwyq9fslwc89tv6t',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 'cv11sat5uyuw5gb5hs90',
                scenario: 'p55uzx8p9u9z5yh7vzxnk2xgho2eni67ja31c970hd86jgppyn3ja8f9rwy5',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 01:08:54',
                executionMonitoringStartAt: '2020-11-04 17:33:48',
                executionMonitoringEndAt: '2020-11-04 20:35:21',
                flowHash: 'y9t3775ngniooqf8sz6tw1lam4plsnxe89izxefs',
                flowParty: 'dmyzo6gnbbinx1boi37aht2oyhk3pi13gc7rtq31ay6q45tkjamrrqnqeb2hfi43dmbsjggxfdf50t50q04z83v4iifv8qxnt3dlyocnyw7xeo9ahy7ro091333ky5ad7qlti0sx2lrxpkmbzob356rx9t2en0vd',
                flowReceiverParty: 'rypg3qtgh321fw8tnmywy91zi5fwsqr2z3mf1dsu86totb665ufmgxs0q9ndfsphvttdzf74lswn7gu58h10dtod3r3oxtxcwnvmu07eou9jirifzhybo5wfsa2a0vx71x1epyo44uo6qblbyzdqhky0wq4v20vl',
                flowComponent: 'e05pto8hnu7q6qktsr1lf0wxdsbudcisjjwv1yu197ostoxqnvc57xwgpk6fwk3lmjsng78tmlarwnwzogmdqveg47ynmt50ior05dvv0kl08x0u41plgezc6t2j8n2gg1a7fmdpknw1m1lwqpnbtwrtd4ie5ryr',
                flowReceiverComponent: 'gzvfjul7c5t9eqmi2teekxwcpcmxtmkiq4nb31eiwx9hdjjtfemrzp54z7c08mg3jp7oc0m3uumv9d0cl2svhd4ld3plzpotjpj153apz9eq3eylm3ww1wkv3ufbghwdg71t8cles9hy6axq58g4abab6z32j3dt',
                flowInterfaceName: 'vpbuuhfjoagjmtwx6lv9apobz7ia1tizjrwuct6hu11ztsild3digvmmxddslg2897dhglbvntmgmcgo2esmfg9enleke87h9oexabq2t4j1v8orec74d9ln2s9obh0uzdu0abyvwi6ic2crbp1ly99sinjedjm3',
                flowInterfaceNamespace: '361zm3n1uubbd30kv00rfpo96lg4fdigozkd3gafaobh1wo4x6wj4iamzhpmtumblc4xves4v086q9p5q6gpx8y76m1sm7mcjghnv2q613idei6eu522vssv3rvcy4tr51nmguxjn3233fwocjqd6uv0byp8m1t4',
                
                refMessageId: '07mikhw4dwzd6me06f338xrykpx9k5cjyw5h2ms7r6ev3s8vwz8mn1lhat3jlxixtktc6tkby9nhn84csoj59uyumnywd1h99g27sn9s8nnukfl6qsr2m3ijqf0lnlwjokhr4kkb1joc4gqrqf09s5xcojgo9ny8',
                detail: 'Velit nobis ullam natus ratione et nulla impedit voluptatibus voluptatem. Eos consequatur sint. Illo labore itaque doloribus quod voluptates doloremque aliquam officia voluptas. Corrupti provident aut delectus corporis voluptatum et odio.',
                example: 'ozwla5fwq6tcr525rkcmezy9i4d00ia7fj0lncw5h5hw0hvghluxuio1f7h6nwrhwxz0q785hp0aj908q7wy0zbflrjd1qv1zgby306ejr0h05h6zhuowbl5eeuhr586wj0ahvuuq6dv6e6oxdw6fm8nz6henvao',
                startTimeAt: '2020-11-04 13:32:49',
                direction: 'OUTBOUND',
                errorCategory: 'm1vd6ok3wpddh4198t8zyqiyxik4lt5930e4jh4hl7a79rndu8snr0vlb9y1k77nr0og7t9nd92rjcvshjd7ihlq4mfiohb4utlgf6t3dy68m2kt07z95qsb0f9e7i6a5chtx02b7aes73nftlvhzcq9ztldqvh9',
                errorCode: 'hedfg7p24cututk5als14msx78cqa3sggiv3s3kahjqi3s7zyi',
                errorLabel: 224594,
                node: 5841490520,
                protocol: 'va5ydrhz8x9hnqe5oy3m',
                qualityOfService: '9xxyxdd81r8g92sfn4b6',
                receiverParty: 'xh5zih9omnjx25jh49te2n094eaex685crs0hmz8i7gmoc9i2vhp8f6pswp3ta6k8672dtjejfmvpbuzhc1ak1ppmsbagcfnihum3rix974m3f0ulsquitlfmu4g70ljt636mnkqq961lwhh0vt5bkuzkm2civld',
                receiverComponent: 'tl3os76qiyvgxm52wyq9k1q45am7yvraqrfaecgp1s9xcvn6u40pme26obeufb8qjzbzkueh768dy3mtknnor7z4kb5wmiiu2pjh55s7xoy9jfc6fvfq9spiyfe79tnrci6dgil6x3nhuga4qmv1vf4l7ekx8m06',
                receiverInterface: 'ng59ri6l6pzzlw8n837febqi06kjd4e5i5seelmrzu3vm7e9hxr6wmuarh0mold0o8flszlolzxp3awycbh0ryeqdsejsmq3x38h8itosbf5n2qlp4o405huiyxf5hanuz6sp5bjwl9immtwxkxxq7yvb38uw5qr',
                receiverInterfaceNamespace: '58bwpluzh82v6llyapi0nggltkdtdoc39cf2sj48o7gl03mm65oxtra0upwg0m6sbs6t203dz1fhjmcd4vss71446bkvo0oprhkahxovxa0ok1s9o5o0hcubfrbvotzrdonf9xka60uujqy8st6t01pg70wxffkw',
                retries: 8771201158,
                size: 1807021180,
                timesFailed: 1256868505,
                numberMax: 7560638906,
                numberDays: 2166756214,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailDirection property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: 'qo1d32r88klnwclb0cbtngdkr5i64orzbuc0ztgmmvthm8vogc',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: '3ehaw2ngkrs1iro8pm9m',
                scenario: 'ujb4cuan4u4fkyoab7ome87tct6js59prr936yh0q4hajpo83qhm65e2xb20',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 11:05:24',
                executionMonitoringStartAt: '2020-11-04 21:11:38',
                executionMonitoringEndAt: '2020-11-04 15:50:10',
                flowHash: 'gjl8xysywyww0480a86gkya33w3t8ugdblt7o2x8',
                flowParty: 'kvp4ppzmvryfxc88zexau9czrjj65h02ncnllmb2cvehymvj9kr50qozfe59gwosu6puxwmm9z4ejy3i7s1e6pfotog7haiufyqxnvhakvc4r7ouj9cenmp4lmk2zwidtbhzuhtzqdxzd5thvdixp3loqpuembn9',
                flowReceiverParty: 'tydf25vgf19jwyznoruuyjd49xz4bk5dret0k7fnmxfah6c2up96bf7xu85l1pfpto9xaj93611r6spmvltb84p4xjbx6u18lu5q35t5oavknejpn4tqpxx7ol2tvnsxvimy7guee81f3h51xzq3lv6mk2vg6oia',
                flowComponent: 'ekly2a66t6gmngk94899ca3c9bv6hhtwgr3jafkimbk4xumj5bqndfeauq1d79yhq43bp4k5iw9x4y6pdxjh05znhi02f9jt1274o0z2jmrm5wudlv70fa7gi1y0xebbqbbipg6a55n8ao99irod1ks0xdjtezrq',
                flowReceiverComponent: 'd69z9x1j6582rhfskpqh4guilne4seq8ebdb497s1l6mcsbx0e9vj8rdrt7z4qinj8tnxuq3fw4r8pusu45yyu5ihzkkc3qznmcqb8ollmz0iuvvpvbtl9upvfieuq84zhb2nhrzszzmpri9zks4ta67hu843b5y',
                flowInterfaceName: 'ugcsvja2fhcbldn6077xyh3buqg2z5nnh71dbap0gdg8h731jeq29xgmk8b01hmuhe34o90dpnufe7bllmn6w22afaoedcjqc9zh84945q5megvqiru71pf99km43jpcbwsto8qp1gqpvhplnpw12cy0pfsjbabz',
                flowInterfaceNamespace: 'ia88ma5zkj1m5l88ik0p5f810jhqr9qzcbjjlopdazp9ic7bgglkervavfpn1yo55ds7dzdcb4g1zxyhxktqkv8ghk52vu91b6mc5luwlhqkn5v0dq7zujve9es5p14sdqrmlcgjkltzisa0ece98fwrb641mnan',
                status: 'TO_BE_DELIVERED',
                refMessageId: '90i7fbsxzzfv43xgrqgouhz7umbqvnyusrq0e0pt1aeht5m1u9z3tywbqrgepb3w2vs3kmgt6d3zs92f3flf9ykdwxx1ms33zgl5kqoph8wo4zs5godthqn4fjm57kmhrbnxa1gxtrfnw3y6puvflpcewy10ovu3',
                detail: 'Non aliquid perferendis in. Totam ut voluptas dolore reprehenderit aut. Accusamus doloribus sed facilis totam qui qui accusantium ea. Modi suscipit pariatur. Natus tempora et. Unde et cum omnis sapiente sit.',
                example: '5b7943a5h0zl5anwl2jf4r1ovx0wfnpbpzkq0hb4e8ivt6q1mex9nzya4u4nlknna9q8qevxprqz988wqr41idjbdcfixs1ta2xbii6gh8h0joe2vozjvuh3dqv81r85jzsonk3hlf81zhc11hol0kw49ylhgt7u',
                startTimeAt: '2020-11-04 09:23:13',
                direction: null,
                errorCategory: 'faemez6jgjq2f907zsddf38vbpswve5r1fmuld6hhiw4cvqfqe29tzru75rpj2g2y09eb898ia3ebyyc1trim095g5i8kdnnf01alzhavwnjtui1qj8m1kehkaafi3jpi73ndcocn3y292ar3zwdzyieaylp08v9',
                errorCode: 'zjr2dv7exsgzk5k5xl4yv6ef86pxxp5pve6c8dd0nyui3n5ep0',
                errorLabel: 815160,
                node: 5350541343,
                protocol: 'w4pj0f2umgvos7jajes0',
                qualityOfService: 'uhrp15kw6tvywlv0cdhw',
                receiverParty: 'ssy3z2923qhy2w8xk966urltx369v5h1rftyaj6ry4p3tdlrcor6xooehuiuxcc375i95llqoh9n0vcpskj2r6hjiutzya3jwye4yygjixcvizrg9a9krh5eegiwi1jds206ywb679hn1tt5uog70d5vpg7d05r4',
                receiverComponent: 'tz3r2orcr3swhjqyr6pprgpfjtglyqcjyj8uapg0sazq7lqzbbzm72puw2m7zcbds3bg8k27setusucdbekiy5e1gp6qt1frcw5aumfde9sra5rnc1x27ca8sxtc4s3uw8g0kic5sm6i3vgea5aynbs9uao6cn2z',
                receiverInterface: 'qf0fwu8t79elsenua570vjqfh2cvazn9de567wmecvqj6jdp4j7equkbluzwhurqq3fsoyg8614h7pyj1hu09llabke9spe76detxumlrx1vr43ycj7s3m1c3m81ab6z03xjfc36dmoilfevxt7wpzwqzro4pehd',
                receiverInterfaceNamespace: 'gioyivtrtddpirxe1jjuqvwuw73vtxiv8m2kl11htrl29vrmdnrfttp0i14cwcvqatdnniumz4rgpqkkwok36xy8yiwjpsw3zifkgf1l3rou1m060hr8q5i403xeb4l36ej0x9zpv4907efcytf729ujsmdg72df',
                retries: 3885286447,
                size: 2333258561,
                timesFailed: 4254370513,
                numberMax: 5615431522,
                numberDays: 3102574946,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailDirection must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailDirection property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: '55s3tku40vfwbnxtr5f08a3xepjy2p1taiznh3j5sj3x9vh8i3',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 'ok9zl46c3dtza0x8sck0',
                scenario: '81cnqadl62t7kt3jp8tse9w1eql2c9pj8gnp3x6mpxanfnt3i5wnpi12nhgb',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 15:45:00',
                executionMonitoringStartAt: '2020-11-04 05:06:28',
                executionMonitoringEndAt: '2020-11-04 03:25:50',
                flowHash: 'zf4kvwjtgzprllvmys8cchk9rz07wyq3gj6auqqy',
                flowParty: 'a2r7g0dtyp11m4r1k9jhjci3pwkb2dzgp3oex9t3ejyro5nj71yw37h9dvs52y303fpuuri4fjbbvtvgqqxwp833z8qssbwsv3edr1vwc5kvgtc37qv60qkzxhlgoqo9whl7choanmmn95vbsgxhldepzoxmovrm',
                flowReceiverParty: '2xd72ybu5v7nt81wqfrmr2ug5yet9ul75y92kv78xit95h06bhloehh8yi3y9n9pzsqgwrnjmjpo6mnu6dnkp0drsporzltk2e1q5ns5kfc8cmh53l2bouyp11t1kcsizjvk1tz1yyt0qqp2syle84fxwtos0qdy',
                flowComponent: 'kmtblqrhjp9oo6zpo2qltv2it3gqjof18zmxuwd6gvhx0w5e54uqke5dcft4njc6fl4i4az428paelvt21ed4ohjse6ri6xcesootevq4cj27e1e7b6py8qvvuf1zit5yhwqlzh0wfnzgqq0rq97ykx04yherw0p',
                flowReceiverComponent: 'auktgpc0hcx5v0cgntiyfdfr5fcafop5s8u95vot9706e0p29b8itr81v9gkui598cm3vgc8c676j7o198g2q2ae2dd2fibj9izafojh0w1q1w5wyrkiqw3lmjv1xptfr0o4e66clg5td4z4q0nn4me5r3jfr8d7',
                flowInterfaceName: 'aif9z2xkt4i29m44c65qfqekb63i5q91hjb1w1ory8lw7pz6e9drh7vbvbbb0s6c7jz3a3lzm5e7x9b39p8mja56bakfnbweimotimjevh7o7abcj7r7r1e8k409vtunkidw4yoytzhiwwkfif55fp1ud2p656aw',
                flowInterfaceNamespace: '0gk4d65x5cv17ooram13tk1n1fewqz4cdlrsum9iw9llxdctp9tgqprjwizspk4r9t2hxzh5n85szq6hitql51tjwnjqk7pnsjv7x43jiov8cdj4xt1v0e6slk34f8ttdf4tfw30kjhuuv38ebtnpofnylowzuyc',
                status: 'DELIVERING',
                refMessageId: 'gf38if8tfzfosmxcuvnbh7vcksx04l62t3rg11deedtvg08k1i2efgh7dekgs4db9i5uzc8vtvqj0ee1zitpk7xxaztbxy8nas9djml6d8n37v5rqwf5f5mdhra7v0her0y9azc2yxznaaezhc04zt6bhic668i8',
                detail: 'Asperiores natus quae distinctio aut velit aut rerum sit nesciunt. Dolor voluptatem qui quia neque. Laboriosam eum omnis illum aut quia impedit aut impedit illo.',
                example: 'l1i11ghudfhd6ww76l2k3fifn2w66f1oz2l93bjtef6lx7789ezdtfaings2cf9dzsv138zo8lyvgwc4covk212m0whgybdma21isvg6jgh4qy6doe1syykwul99s0vdnkb4ro9cpe0tqsdbmr34ik4a2me17qvd',
                startTimeAt: '2020-11-04 20:35:10',
                
                errorCategory: 'e4af4ssomep0xtz7qaz7dd671exh3ldzlth8s4osr0bxnlgcta7h6chrfunb7wkn8wf7k9p9f3f0bb8ctfiwfcken0otk6f5ihgvut0arebd82qv0kxzq4expxe25gqfnhb334uqb9n8083rau41mn3rlzi0ozwq',
                errorCode: '1d1jp39wzm7tj9hzgp7vja9n3kcm9ftoxwqxivkdpld748sg9s',
                errorLabel: 717866,
                node: 6801277118,
                protocol: 'vuvkf3ebuniz0q6jnua0',
                qualityOfService: '9xa4q08v83h935nrpqg8',
                receiverParty: 't9khzhvmsi0gfqx5kpwmc4gergll3mhno4j5ppu8sc575r5q5leqqh1phzp5l8kg3ffvdu5r8vj904ng5gxvo3oip7ci801wwoc9depukdqwzmrcvsj0eixhshbkjmy0nh55rgq5zsgug3eu87upp8dm4z8ixn3u',
                receiverComponent: '5hfqys7iqpkhy9znvdjjyvecrp5oarmxylciex3zrvf1gplnsjgmbsxyhz4zw6x3zn72i7bm94c65vha7t81rhwgr9vrs6vrsc3cd6qttor5an27rk7bqq4shp5hz4vphdnv6kvmlvfh1dbpo4jdh5zul3ynaxam',
                receiverInterface: '4ei8hugbucq0tiqmvhv4cizox2baezgnz7l4l57zdzl63j2kijla4tx5bk1wniuf1taozj51lwy3bjn559c1ozfiql42a11oczov8ppu0fhzaz4sqfwpxql4rp3gzau3uz9pkhq3bbhmnvafl1e7xnwoi6hd2u59',
                receiverInterfaceNamespace: 'zzcnnffziujrh516jnwjbynegmrm7iqwrrczyg7raey2eypq444reflowkqmzxpf5pv3lpz5wyue7jc2mlg8tni1i8q1b7ggdbd9zcflnxkkvg10en4rj6ss0vjyoa96lj20a9qa5tjbu5ka8ltpnx7eps957qwe',
                retries: 6420024047,
                size: 1788214498,
                timesFailed: 3207662615,
                numberMax: 6444296035,
                numberDays: 3706595562,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailDirection must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5chfnx0lp3p78wn9t563g92wsc8e5sy0ye5rt',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: '7dx0a48js5afmzzx3lvq07fgt56etibe2u3uent87ln5l7s05k',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 'les21exhxwlzkqstro7j',
                scenario: '74wrhbkp2zubws24t89xrpkcl5xc9c458m1x77frvjur5jxm6bobj4ubjof6',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 21:17:19',
                executionMonitoringStartAt: '2020-11-04 00:20:42',
                executionMonitoringEndAt: '2020-11-04 00:52:43',
                flowHash: 'r2d7h2xf7p10pp54jb3ixr6au0tqece832a2dvrr',
                flowParty: 'mb053qxgidcljalbx1yoij7kt5nrkhlfe8ec0ipcq5w1fuxgefxf35w5d24aems7re8npqiowdnp7obz0dfx39wsraxww4w255zb7tzil7iapym71k5pp5joyp1kldwjahwvls5b2bkhw8zko2io534v3ilfh4jq',
                flowReceiverParty: 'v5compgqkue11wxj9tze9ja3n0q91wrh0xbp23olp74eo8gk6r0zzkn080vagh84qkfvbu9ed8h1jgr0q3rpmz7947oj8tkuw5f0cob08lyocib4ncydqapdmf6ztfe2t7h2ys4tr1uk7an5d8bfoetnyuqeyezw',
                flowComponent: '3vtyutzfidwfatn56yzvlmao1drdoii6bpaabt3s5rz0ltqishz0sjukorju0vjdibkivzpee8xlo6edinf93ek785b6r2r72suspb1tb67rql91uoq5dh838m4xa3n7okemcd19s5yjxbulab5ku534dj3i54j4',
                flowReceiverComponent: '2bbolr1kgthwtyng83nakk0s40delyb5ism4egm1o1naskyja6x2l4scump591rwkcb3b7gqyzki2r2mowbi6xlz2r6f0iqcb701nhiz1zkj549es6wjk216xheg8eojj9ougjlhg0hqjzmkz0y1lmq996d9vrg3',
                flowInterfaceName: 'xmxzqoadyqwd77vxpitvyvwmui2qk5wtpfhhn9rdy3bavptelqydc2oh34a9tbco0qqy1h6f5wcgk5833gsdyrafibeqh47mehamegbzc5cz8hyosmhxbagw11dighzvsucyp5u3fjwbc2h9txnp4y7b739muq6k',
                flowInterfaceNamespace: 'p88gujucv2riqmha03c5ycfmqsg8mq9j4f17o6bvmq98a43sryzhopyt2xz58govpbmrt7gr0mw1tk9cferfkcg2drhq03qc0nzomi78yxfl6n3zvessx4aheslhokop5qg086c3hh41wu2r9zq7l8v4a26zimyx',
                status: 'WAITING',
                refMessageId: '4ftr857cxg6ikifw2ulb177f3wwk8r85xwyqneht4a2hig48zw9fx0zickk5ub38cig59luu58gvpb8twccqkf09qpb5ao5hmb1oc2qkvwqvbi7fo9gf61aqb1c0qmwgv9ed6jtv2lguetdcscwwn8q6liegdviv',
                detail: 'Id consequuntur sit nisi beatae sit quibusdam. Culpa veritatis consequuntur. Voluptatum officiis reiciendis necessitatibus dolore laboriosam. Eum aut aut vitae sunt excepturi est omnis.',
                example: 'e5ezl1w31rcxmrczeouv1qjt97chdurg88setxsxkcssmiqn1j9iaixct9wquk0om4smn5z21ayyh142mn51syglcglk8cdc0dy8f1u83ipb0wk18gxolymz2hh3axnnd7p56ri2o7894kn8ic0cwp73ls64aj6y',
                startTimeAt: '2020-11-04 10:22:29',
                direction: 'OUTBOUND',
                errorCategory: 'plqgn11p4dbsn30flw8pautmd68iuxp5285omliybz3n1dfan9iu73r5jj5l0lgrct7nhjcndfzwaeoohg8gr4o5xyvqddvfkngg4iz15vsm5rwmfjuq5tp0tt9zd5v9platndsu5ipw5zjzejg1wupqog5yw098',
                errorCode: 'rxlqhm23stk1e1xpwhycz47zuczxzkhlb50q0zt6b93a0tnenq',
                errorLabel: 997196,
                node: 3974679018,
                protocol: 'bbexszwmn50xtd3g97cb',
                qualityOfService: 'a25nb6fe1sgbdoz1tcit',
                receiverParty: 'fg6q0omgxif0pr52qn246gqmkl5lx0c406yq9yw1lc8fzg5epo91cymxke5082bl5dn6qul21geea0nh3nafrb0tjrqj4o655zkhv8vgdrbff0cnk7bzj9c9og555bf3p0oftpakbmsuz79uk76czhr91pnz72z4',
                receiverComponent: 'tvcblwuj90xk7p2dmn1bd429vec6zm826u94k9oco8cfvwq8fmf5bpv3a9ppfz4xxhg25fmcj6e5u8iwg726vehhvxo0uz94u6hbkfrbyuee2d9ewci8g481fwsrtpsy4lm0pfobw1rd9kxsb80n4ie01uscqryd',
                receiverInterface: 'j8c5ise5gvxiqcjcsc6l7ouocs3fzusoeml3e8a8i0qsi4m48pdr1csln364apyfj4mw9wupv0c9n53qst64yvyfya95q4uevdygu7d603x03bsl9awqbzzaeb3z4s5qcq3xd9frd9hryulz3xg1w4hhsdwciffm',
                receiverInterfaceNamespace: 'ysg57tucxqb9yxkx2ydps5hctkxtv2m29eit6t0cy4e0rnrrvh2b43vrk818annmf2jn33pcfwsjtakjojx81pczy5ijzaar60skbwxs0kbob09a0fbbmmmacurogf7cgouuf2gnb0qbficu6r9352s1ucpe12e5',
                retries: 3191996249,
                size: 9562066720,
                timesFailed: 7969320465,
                numberMax: 4178069279,
                numberDays: 2345915024,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '98a7z0utpimh9gtokr2b4662byh1b8qjv5am5',
                tenantCode: 'k1p87utr8o2fo000byca986q0qfz9wp1kzfbjl8uftlmk3tddm',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 'd19nruj5z8f9alv71650',
                scenario: '4b37j6jmfsc8qmr60aq1j9fru9o7mwb0v9jno1wcrfcdxruzsc17q978thxw',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 17:23:46',
                executionMonitoringStartAt: '2020-11-04 03:39:22',
                executionMonitoringEndAt: '2020-11-04 22:26:20',
                flowHash: '1hf6h3pvq2tc039gngr003ubqds80r65lbo9ia9k',
                flowParty: 'xy8oh1avtd7zxtxob9i5f0287oo0h3yce7rymptj70kfmscf3adibjogttmqqs371t7tgh2uywqp3kecc4szbxuvaewev7ldihmahw80jxtsei87t3pimgbm7m5r1kemtrzueilwwuvr65tm7x0negas5ax80tux',
                flowReceiverParty: '8xap6l93wej8tlrz9vz2wgqrht5cnny84okfpc6zn17um8cha2a27bbmzflr15x8ouwmtxsg3ruwfpzdl81wscpyh4cdo3y5pfet6k9drl34pa1lf59zt9ximqa6qan6c5i02k5fh7eyhf1sf4han5fkacqq3src',
                flowComponent: '7fki4xm6a1u2ltc52vfmq1twxx6eqiuoyjbvn5ea0xa0yytoyxzc0f7dwcl1cxjqbizyzxa4la7lsatr5uv9gy5s0ylduoogy54jhb63t9wwiwbzk6nf82jmeqiw65j7k4eyrer6d6fluwqjrublf50fkexr5gm4',
                flowReceiverComponent: 'o7wahkieg79dtd6qj2czcv4htnj6jfmw8vkfwq41fsb5w7oph8pnmy5r3347706w7qbviu46hsbphs544hk42g46cdxey93inuzwsofsq8yzx45g2553qav9r5ikbioagqkzhpyx6r2eh7nx1t3ej39zmstb3ih5',
                flowInterfaceName: 'p8jlrdvvogtbrf1fkwk65tjgdtq9zc85lsfjale5p9z2s2sx5z5espkw10el7eekvggxuy628ida5n72se1yl4ekso9vgrsw1quq0rky62vzglgbqygad3yvpm9cjotptuobv1j6tpw1axg5v7py1glzsinceqat',
                flowInterfaceNamespace: '0upsn3k0kobgmelsp9p5ji3jjs99gv16p9eoof9n54i5t841oddvl9lf52lcrprj6bkvu9mwvfrw2arcxsolka0cokfohmwicibo0ema97zx9v9lwtbruaxa4s47wljep09gwxzo85qnnmv5azbbx8vh1ok67hwo',
                status: 'WAITING',
                refMessageId: 'dfgec7l8sr8r9jk2cbnsi3ikapqbut7dswosalp53eqgti37tudsg3a6bm9rourm9w5jqv89oixqpnsnqs1u4ha6l5e4dbk65x2c1skkexjzqzkqg78fyyn57lpokejckd1vsjc4pejsb3y77l0sj4wujefl2zx3',
                detail: 'Ad sunt ea blanditiis suscipit voluptas error sed minima. Repudiandae nemo ut pariatur ea rerum laboriosam ab. Voluptas minus expedita tempore commodi unde. Non rerum qui a.',
                example: 'murz2gdxcj0hg5cl8ecth6ii5o9ueu3hnv61aucy4c4s00slh47a2q8ne7hilroj5fzfca5zsez5pqrp4vel5llfd71tgq9sw0fg3v9hjrt1iam7lqozt1z750rgrpy9qmxcblzpc1p6iy14v3opawv0phswvco9',
                startTimeAt: '2020-11-04 21:28:33',
                direction: 'INBOUND',
                errorCategory: '0cvzn9metm132d9jqc66wz1hhgs809e75ziekdkkwn38jo13epair44h6xp8p0ufcsifxccy6al9o6wfvt8tkikygqpim0uiov12s6kr4ap2m75fj8sb3vtau063u069q18ol71oe4v6pedn3lh2eenhb0nrq1he',
                errorCode: '6eeymi6bzdd0mzyn5b5qva0t5zpb2g67qwya3p4g30h7biogvk',
                errorLabel: 334767,
                node: 1719044600,
                protocol: '9s39x5b2erc71xh8yosz',
                qualityOfService: '9w8t5p810vv1yl9916mj',
                receiverParty: 'gcr09mrzsdnkqqfora95gqsgssflqyz9qnaazw6gfwkeg8me1t5x7k1x2xad44uk88vrpul6ww5ja77ycsdxcqqdkiqjcy98kszdknz77o20k8mzrn0wwl0z8clzn7thsz5ij9uwm5rir23k0tpm5hzi6tvrdn2c',
                receiverComponent: 'er6714wpalptwetr37dfuabc5qk59n3iue1mbu210i1y7wugg4t8j1d2m5vysmg6iranoiwuznfikkzzdoqas85ph7b54dup0e176h44bvr6rtmv20z4dse8brfzip99ctq6vj99u9q0v1x1kcaifriotp9r4uqd',
                receiverInterface: '82k3upu3f2gcugutfjdhngc44ntsrwqb4v3krqzkqg2we3r8khtzbb1zwgp5fj3x47r54getl2pbpc8ij67s6wze1rqml8k8ui2uaqv5epzm9jl01s60gz2gejjm2w3eplj9qtknkyl4tmay857m3b36cqf2rnuj',
                receiverInterfaceNamespace: 'x17ue7rc9ql059yuqhxw6mwh1xh6q5k9dt7zdxem466wa0yirgj0em9g0l0jeukmadkdmwyutrcvv3nde2gyxhsts2aki64i2m8gekd9gegpsob1rs1we4gj9yi528hnj33on1r9y8b3nvbu6snbn4m70ze3ezrf',
                retries: 7490383550,
                size: 4142041520,
                timesFailed: 6653453145,
                numberMax: 2138951618,
                numberDays: 8972307736,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: '6hjxmcs337fw4vxlke58h7l08qrf08k4xhizpps660oqa8xi3p',
                systemId: 'e7iezkxxg8vta3ut272ac091moq7b3c9xotdz',
                systemName: 'lp16hp2wpuje6wrtopta',
                scenario: 'kdqn24nz62fcwpthjr4mxsgd5740yih164y0erluge3mwmkzbwva5fsprzss',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 23:46:41',
                executionMonitoringStartAt: '2020-11-04 09:26:53',
                executionMonitoringEndAt: '2020-11-03 23:59:06',
                flowHash: 'w5xiho8zwt3k9n0l6jqkt55o4iwtztk168694kgj',
                flowParty: 'v2kdxekgko1tvc06fdwrwduq2bdlh4gemvhl0wh883pstaebln24e0ibleo5d5w8xy209scxs9mkmkihhhmaan6r2p4sqaqjmvmlrkokiyf3v98jjguevpobgwhnprd1h18pcmbtltjw9265hu5qx7ag8xj0jyjb',
                flowReceiverParty: 'bdyz4fwrhghpo7jzvwxec5x4vuykmkxvtc03bnrhxx9bmqg1ruymdda05rpt2fh7q4m6cnwvhd0yfm9rjo8aaoidjh76g4ngj0726i822ejqlde72wsc5de6nr6tqh0005uqbqfj4sqpqqurf36u7542lygjphu5',
                flowComponent: '8pin9kxknd6fpn3okz76why78hdz9pv30c4zk5rao0qxsps69tmxnaf3uhuhy1sf03k73iaptnmvwp7t6s45g3qy1ygs0qukxwrdxgtqescff6gaj6v5uadnwwx14v7qffhesfkptesdqjgmd7gpk04tkqj847d8',
                flowReceiverComponent: 'rr1hs1b1k5efrjpqsl9ekoddkinzzg5606c490lcte76g1d6ots9cky3xjm560n5gdj40faj04k54v4x7kxg7viizfkb88fah9nrk7nf8nmwihooqd6qold2jmx61tkhlxe699fhx9clvnqot5ibyzr00eol08ok',
                flowInterfaceName: 'jqhfopfnsv3fnd8k78ydep5ld1qv70wpss83rqflk6scobmgqo2a9lxwnz9h74rvfd38wdh9fgk3mdffnfqbm8f1sf0al36e4pacdq28hhci77ywu2ned4r0ac5jklgtgx3vp2o2k587kygxzd67mmg9fhwah7s3',
                flowInterfaceNamespace: 'h9a3w2n0m58yqwzqlg87we3mw2kh1jfy02ckr7m715qlst2o7yzdmzv9siy1u32a277f11dh3p49lm0py4yazrpc2hun90lca7bln3v9z0tsinnncva8jr23ioe4jffl6ett60a4nsgyonb3ph2qa7qcop6aro1r',
                status: 'DELIVERING',
                refMessageId: 'pgheg3ivie0rgw2gk7itniw91vhadz2vx2ldhnzs9u9gco6arskz2o05wap17cx418qqtzu39eb99eyi4mhnvx6tf0iiayps6a48c2b134ml0e3ehglf2u6ss4m9wdnjjtye2al0kglsesi0kd2s56gjoejizb74',
                detail: 'Voluptatem sed eos vero maiores numquam qui. Quod aspernatur odit ducimus autem ea ea libero totam vel. Et temporibus laudantium odit facere deleniti ea quia. Magnam in et perspiciatis et nulla recusandae vitae et dolorum.',
                example: '8oi1ax9khb00lkl7we9ozrw8zw8i6teatnii5j0qj8fq80krc0x8mc32igsmdx1w1iwhx52x1djn2qlk6t20hbfa0pl4hji2wedk4p0yqj16lzhgfugndrxkrd0z61umrhjx43qkrnxmhjpg1bqhebgcy1f52ylc',
                startTimeAt: '2020-11-04 01:15:59',
                direction: 'OUTBOUND',
                errorCategory: '6e876hb48juau4rtuicbbkdpoxay4pjoy8gi1ipxq9bfbmeanxu8mx00g75m7i0lz6joby7he4qn99wl11qu7m66zaqmbwp40l1626aow15khdoqhdiugl12jm8typtldkba1xt7w95a9vlyywgpw24g90xt5rii',
                errorCode: '66yijatuwobj27ekpaah3v37b6jp2kbmzgg3lxhy8g2efzmw6i',
                errorLabel: 473100,
                node: 1484391234,
                protocol: 'vf1wwl1sddfrj3mqdmbu',
                qualityOfService: 'f4ydoyzo8djvxqh3ezye',
                receiverParty: 'wle1dmnz20z5hjvt9hw219cdmcicn5oj4ondm1dm8kftbkemzs05d1p013fx5l1vyx912v9lqba0qiprqd9qd4s3v2b5hfb0xdum7yj1fmkzyqe604f0q0l41ty7hkgurd0rkxigufg5oat48aqmh005q542v05k',
                receiverComponent: 'b7pvha2sckuu0j1dxrtkcday25p08s6rf997xp7r3zkr9qbwpkr3u2r3h7rphxheyv26p09yvboje3k1r645ahqiezjm20u0ghrfyja4hd9668gn3r72n9h9x951ng2lllihghrlacy0smcewvjc2673902uxya9',
                receiverInterface: 'p7hd5mka6f6cjs675o65zzcyuso95niiy4fsnn59oxnouk1rq09war6nmarj23avrkcwp5bmwkw1ofbuj7pysjyqr3qy80yfhxjs88cnq5nz9jcji3txvki4bfgi5u7jwllxcvj57gd923q6hnuc2tilemoo1eup',
                receiverInterfaceNamespace: '0j3qjqrf49jk8cgf86rmw9nftwb55zyjw6nj5422b394u1p7ek9s36csik9v0dgm7x3ran0c6howv4bge7x02n5cq3km84swgzkcow0j6fb7afyjeo5y60ayd099xcm6i09u9t9z5d94b0g5h33frchpry8my5qi',
                retries: 5168816997,
                size: 6859607315,
                timesFailed: 3701976479,
                numberMax: 5297549614,
                numberDays: 7922685922,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: '1r6avp6ai5kn1grkhulzh5yo6d3ktyplaal50kanw0zz5mabo6',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 'a139wpmug11s9f6gqaj7',
                scenario: 'gts7xfsxbid65kcnjfjec9f1wykaw0142avse2y24mun84mu6swl3mbqd38k',
                executionId: '1ygnumk8wcmnyvm8w7l5q3ymfc7np9ygc7mpv',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 20:18:38',
                executionMonitoringStartAt: '2020-11-04 06:13:45',
                executionMonitoringEndAt: '2020-11-04 15:31:04',
                flowHash: 'cowjbur8tgr2boz95350xsv5ex0xhvyk1pg7f1kr',
                flowParty: 'nugsn52vjec13quoys93qgwz94wtm2lt2wjeyg3h6fj195lv1dqcmplcxne3et3wsw0nddtgq2t2vh982jtwke0szr8tnu1ckmvguyvisne3dwesqcj4kfdc7qijfm5q4aho28rg0d8j7wof82c3e259fcil6mgs',
                flowReceiverParty: 'gl5w51y2967n206jt8ideb7vybngnr093f9obiu8qhd3e91gpps40nh8uyj06d98mbg35m90ohm9uv1pu10vhk6g0ylm8u5gfdrsxmi02p6i3ayzejjxfp2uobwvy7cnbv5x01e0n2x9lyu35762wwo2gl2clsym',
                flowComponent: 'lte5q4v3z48y636ggdtu40zt63mp8jmbyrnehrwkwiqlnai9qk4x9nfblng5adcy8jaml6kgtopzeza29f0maz9i0h9gldpfyfhnqoa7ql7nf6c6uijoqeuna04aat6rqp1u47ikby8lbweqhhufic0f0v3nk9ys',
                flowReceiverComponent: 'f7ws0yuxqdinukmc9gwnagfby3w4s7ogb7yxg9wnyw3zc49yidi1y76r2wnq5gzb8l9gcvgf04416sjcqgnvow93nm3x8et72a3wskrbklcupgxtmom6omwyog8q5s4ml47ccv26b11ymu32rvd1a2x4damcp8i3',
                flowInterfaceName: 's6k3vwpmmr6yr30uluc5ns7u9taelphx03zncmhf0nj2sr9sykngjzu99247t8buhpbz9lz17w880nui391cuphq61k7bg2btz6m6kij9zyrdw6rd12zwgxps4v3yshrg5fg1fybkd08tfv7477j5989y3ia96zg',
                flowInterfaceNamespace: 'ne9aazzpua56fgl9jhq07woh69wizd3kbibotjkhlsqt7wtzuk0jcbg4dwsytjvc7obl7nb9ss7skqlixqmot6iu9v5mwrpjl8y3t524edjirfniedu8yer7g37m5n3eivirxrhr9ryypvgg7uu256shxh8gf8li',
                status: 'HOLDING',
                refMessageId: 'dqcrerp4amncwd6cvi8bd7abhktgrdnp5e88cey4wm2dsb0f72b9f0k33my6qwdqfaowxos5mp5dgt6rv8n4804m2ff8jk9tzbn6cktvthw2eydzrgpfnr1q13bu9g707bayqchyhjwqnngs05calslgmn5zipe5',
                detail: 'Rerum nesciunt ut qui officia veniam cumque. Culpa laboriosam similique voluptas et totam porro facilis sed. Quo est sed aut dolorem.',
                example: 'm31yo1m5ywn7t6vazdyh2gceybdc1jmv5mb9h1kdgxndnkewiihksy5hqixcml81eoyp5qrwufngm6ovu295av1gu904mj851lefklcshmks36pdau792mfie6jjhj4d2hfme5i7dtw43b0yqg6y6y4px8ebs99x',
                startTimeAt: '2020-11-04 09:21:59',
                direction: 'INBOUND',
                errorCategory: 'w4msywpnp2x09hfdqlwxtgr9jm41q1531n9xph7m9r06hparjjjuiy3oblalto3zij3dd7sficw86irq18qb4dncbmceepryhyh9qdj5r0flmiqe5cnzsm6blsv5xhgxhf8rmx6kybhuzv28bo2xk7px2k163oiq',
                errorCode: '0npayts0hbivc2mp0bw119aylslflnj0pb5m0eusxi1kyreg01',
                errorLabel: 568319,
                node: 8171589995,
                protocol: 'trzhaip35or9p76ubfn7',
                qualityOfService: 'kgnzty5ucg9ohon25t66',
                receiverParty: 'dad40rjj4jm49wwikcp16xtckilf4brwme0rytogn4q3t0dntckgr917sazjasymn8i0lsc6t59ousfp3y9jgcnnnv3hj57w4oylb7jn4yi948geg853okltx9m1z00qjrzpjbmzo0oz84jqg0vzgkp8kys8l6ks',
                receiverComponent: 'jv1hqsja9a3a6qq1syn0ogcwcecdvf6j9kf5adik9wvk1kz7sn3anwczsc8gzdoy395juqz3yxeugk8u5x9ssm7jn0mgfl5x1zo3hq1n2830w12hhb89fhu6dj7uzpj0igttkfh8ryufx6ret20y8v715tnqgqnv',
                receiverInterface: '2u8gj0yeeyrgedbvcu8rfrpsssvayaeqlhtjdcjl9lpejiqxjldmndormib76fmz0j8oaam5hh8n64k6jhr7f81jgodirt0sk4zdflmkfvz1f6b1b2q96amno8ojy47u0o4pykw52a6bk7qtygf147ath12q0kkg',
                receiverInterfaceNamespace: 'v00k95g320y5c8fmx32hssearmedgb2y9hpt14lo81lavlnny07yjz6kc4dz8rpqgekbp925kfbtpw9konkz2ta0kq2y0k3nokexr8z78722brvl7pz2b08zu100rfvhjyvkr1jpkgy9a6qv3oef5cgrexl45nct',
                retries: 2640767739,
                size: 9278265893,
                timesFailed: 6453676979,
                numberMax: 2094632496,
                numberDays: 5963979282,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: '9w1nhu77ojpuyzbuwhkh46n3tc3e5w6nzsnx720r8kbu20ywdf',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: '0zjm9vu8xoq8mfv9rwwu',
                scenario: 'eh3aqenli3aad6zi868ozcjjyjcfdonsbiu1pqfpsk9fe59jhbbju3ifzc41',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 07:17:52',
                executionMonitoringStartAt: '2020-11-04 06:12:16',
                executionMonitoringEndAt: '2020-11-04 05:17:17',
                flowHash: 'eytwvnoqhd48zt007eypkxtgoma11jsl36qr5meag',
                flowParty: '6oio4u48qiystduj8cgy39spml5bywx5lbu2yvtyenqv2ha97ppv77nx0kvc41gbmct0s3qvvapu7l7ek3vbuc51486z2vfcx7ar19fsdsiu65rd6r2czu1nxkouysux2te8pouuacyht0eyhx6h4j643klyrqzt',
                flowReceiverParty: 'd2z5n88af349exrtgig3mdpsp5z3z5jbyl75r3xujag6qb89mywo0jf5kiv0w5cr039ec4v4lwa3bmiivqxip2p9oy20ud2uosc8scce7u8ez0zchua467lf6h1yjrc4fhcl6445n9ev95ubktxmqskqpqmc2d32',
                flowComponent: 'snczef7lg0eetw5hz47edli9yjnxtu2izptivgf7h7tk6s6nbxvb7shp9koz2p9eljilkzksuvrcrhzug2r0sqm3oqxqnvwqahugaysjmakzluc7yddtexfbeiuousv5wp4f9d58brkj3azc9pj23bsmjtosx962',
                flowReceiverComponent: 'gqnp4d4xg5a01zcz3dowjnsqngvp7cl7kopukoibb4fhyj706nu7e53dai2bcsxif2sqlagh02nozuomynwh3540s9zbi7d023sjr4z5u86w8hdw0bscg9x6rs8k72iwne7dwm1epiri4eqw4nwfwck7to2hlssj',
                flowInterfaceName: 'cz07zg322rb6vwz0179hb4td57bwbr1co1gha3qi68qwau3li15jnqondji4am6ed14zpx2b8zemw6h494uit77u0bodgswenga25ukotrnwfmhsygj0x7offakg04ppph6jv9ap8igi99q0hrmbld1izn0734ji',
                flowInterfaceNamespace: '9wimza7k0r5m5tkxlhrt8pyj9uecnevwx3jbqw1g7eypnbxce3hu00x5f8fimp3x18n2obsqothuqdkkrexaoutl8ylxxqt3caj3y2sa51f6nklyy4l5cs4wfyh2tu1gbh0gmqx4n1qr5y2fnm06uvik8du4ou13',
                status: 'WAITING',
                refMessageId: 'ydmnangrc84oxixc19gk3ugguh5tbu3w4es3gsql26ytjckyc3kzqpebe82ybpfq9k46h1smpclocqkfz90xkouvajx3a33yj27a3i1h6dn8u82rr33y8kdw0fakxuye2v1qrn8ibfrn8uwtjuqlunjgd71xthrz',
                detail: 'Natus qui fuga qui eum voluptas omnis quis. Qui molestias quasi est voluptatibus aperiam voluptas. Officiis deserunt nihil sapiente. Quia dolorem alias veniam in et numquam placeat doloremque.',
                example: 'wm1l49n1oj5kl9vp0kqb4zz2a2lidb0pz6x1qkvvryg063wp5i6i9q1crpqop0ock5oorz7qhy9x8ps05ffqoq5duij304m7bp74tvfh4rzg5oifbmcfng8geqni7yo3r64gftdgs7k3afmzo0woto1q5eie2mkv',
                startTimeAt: '2020-11-04 22:48:02',
                direction: 'OUTBOUND',
                errorCategory: '50q3mqj7dkj7xk9pgxycyeuokh32me56mghazgckwfwkpo4g9z9i5yabl9pr9mqn9ktadhtgtk5vf513o9qb3uapbpr8v9v707w323x7xnlw8o80r952lokbu21e90zw8ge6zs0wrgvz6zslld2614z1cj1ix3w8',
                errorCode: 'mb7jz736xijkenwdjd6gietdrwy8w348ibsqppf45z1w55ocdj',
                errorLabel: 658300,
                node: 5448981900,
                protocol: '9wdcudp5k25npltehr7p',
                qualityOfService: 'zbrilwqy34db0ntqigql',
                receiverParty: 'rro130vaqd2i2u2rzwyiv1uc24zrizzu96n5c6301duonsvgrh7ei0ej8485c9t3cg9peyd3utuz7cef4ygd8ihu7h0ftocimbkrx6rawvc6gvnlhy3uhxjhrrwpzmsshbad0bdc7ma0cg3ouxtue7s4pr3818rl',
                receiverComponent: 'oy6jw5ka798g0n0qc8yd1julu3hxkqznnk1pxcwygupighj013puh6x3v5r9ss5y92t13nd4ezv2p83l07pvuundnxgcvyv6kp1fgoxj4us75f2ipkgo2oluvikk8jv0i6sas5ee6rdcxim4z39ndyyczkr304ni',
                receiverInterface: 'hrt1dq5zrtz7176gxg9a9zrqi2zzshe2jlsz6wzcoouwfbigvsoai7py3ntbxotwhuvke1vr7hcgvgtvjyr7w4iykntmf8v76svm8vwxngjir37m24s8fdjjwghy09btm2lqpreui6e9itto1dpki73d68h30ngu',
                receiverInterfaceNamespace: 'zacdjhyh79nas8o8e2tms235nfgrjslyl6bj54j1ndfqnlitirc403j6uznzdjqp21i16wnyyksmgt3k9r1qlfbyeprp2f8xhoro7pw2wzmu8czna2ikivfzukckead8gfqlxwhjs8syhew94864e1i81ut25bwy',
                retries: 9531221826,
                size: 2383154753,
                timesFailed: 1324305744,
                numberMax: 8013784435,
                numberDays: 7177914191,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowHash is not allowed, must be a length of 40');
            });
    });
    

    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: '0cemfz9vgvrrgwf0qo8zshr2rlwhs3t5m9eecx6sq96g0jemr55',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 'u3hkvr3uwgog4inu1fa5',
                scenario: 'gycoz0c1im1ul0f92t658oa3va2nkd6xozxg11b624s02ggwwrme8f30ksqj',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 18:23:17',
                executionMonitoringStartAt: '2020-11-04 05:22:32',
                executionMonitoringEndAt: '2020-11-04 21:03:48',
                flowHash: '0yp9kg70mv7kthj52xq73wsjwdx3xyvzhgcvgja0',
                flowParty: '0qojkn6ru8o8cz1qhkk0wwsytdi7fqdic72mmdhdxl90qndpp3s3nllffesgai83h1icr0wr0qdnlj56fodtwbhfzv0k67l66cusc5rzvqcq9enj5b92mbl0vg9ek8roxp1wz70axjbu4t936uqtxnzm06s23j2z',
                flowReceiverParty: '7a0nlnmm30nsx2i039mdwctlm0p3zg2ukeopi62y0omr9a7a2l28o7o37t1zh6vka9w3f42pp3i38dso0elfys0jdcsnkv8z4cixlldoqttdcr8pma2rohly71o0gnichjr8rp5wjid68soc3s6dqqza5tknsa4n',
                flowComponent: 'xtlum3ftvq48ojig7duotmoyk71uzpqt8egct1yqylso0fm7lfvz8zqhc38mtz48wdvble7d4u9hgd79nl0b5n1hlowxw1lgl872b2vhtj7pqsig5l930ktmctqlo1y0huz8u2cnuflnmsx1usva91sr3monv8cd',
                flowReceiverComponent: 't8d3m5g5qyaj97tgqmvbc6tufaqveew02c28bc1u93obzg0sjvjqqnu2j5ophip0te9pj3zyc516rl212yqrtg2zwb58hpplmeqc1ck3rx79my21mtvlrzpcn2s73qwxxras2tasld18nfllkrnpnlxt2hox9z2g',
                flowInterfaceName: 'w32r0xc208vu34d39s73ndmpikgojryv2tylzl3x2mjajaouqbxsvbcn74iqwz79hy1u5oflikj4eqchc0svstnsy0ler1v0l7zqjsxvzlluyf1igyilvvz0xoe8qfy9lh7nedv86tlbovv40jie5zj9cbmip5qf',
                flowInterfaceNamespace: '8snozkblncao6hgt9yr1ky08agxicsvjlyc8xhanvoqts58sruxihw23tgku5wrx2ncttaacclrl8uqqps94l8hek41vros432xslk223lbav8cv0bat2hku47rlkn6eoiontnspcc3ifl6hg4n21x9cqaq5s6v6',
                status: 'ERROR',
                refMessageId: 'no9wsuzjk2bu20aesktxgwcwx41mq52tfbogrp96235fzgjrh3etxnewsbskghssyb7kjd7e01d6r52imvvjezh3v57xvcybk77h1yv0dgx0td9tmfjyxkq4f910qcv5o496yy9kxnxl24altl3i8c0hxt7tff4q',
                detail: 'Velit voluptas molestiae ea. Magnam dolorem similique aut impedit. Vel quasi ea velit.',
                example: 'rf4p8chthuspyfwmgxjgxvbms7o8yvh87krlct96qnv2ne9v4tokripemhihi2b5um8zvikuluilzb67k33y1sygqg8f9rlb7yqyd28y0aksfipvirqc5exube2veao5hh01csbaq2zy76r0e3ngtyleoztyo8al',
                startTimeAt: '2020-11-04 06:09:04',
                direction: 'INBOUND',
                errorCategory: '7ouyk9pfzo6cgqn44k3j4o0abl6rle7isyzut2yz9fpvhoetf49c2s55bc3kr36twesq4g1h8akhoa5p670t6ar5wfsgmgvawtrapbn6x8boge36fle29dv13xh2s0rwshlein85zlfro2fwam21coitvykiqfzt',
                errorCode: '0z87jso0brgyhfui366zaq05gc412vpy0l3c6s4z3anwlqwgod',
                errorLabel: 120035,
                node: 5284436295,
                protocol: 'yo2n6ruiavikt1ic5gfm',
                qualityOfService: '1q62g4isjbf373ss9ahj',
                receiverParty: 'n74tc4t7tfpeqm6w0aippu9wfpbqkcwghhfx9pzerdo14ci7zl9apvkt3o5hltys9hg06sfoeipejx0448jtu1by42tmvsquxc3suag4uy79zlkp3urgn4zhgi80weqew5uvms6p8pp1w25kf34akpwgko2hwszw',
                receiverComponent: 'slonfhi8cm87cbvbj342qm5bgpjfjh5evi9cl36iks5yfndaf8qfunhabqepw48rdbzmawou5jt4wqypzocj0965oeoztuhg7r5i3prbtxeh7e8mrgx2u4oxx10gqwdc0asbuutkq7n755ve7h12kzoll9gg5gb6',
                receiverInterface: 'owbk3m3c8k20kh1ns9zwkg7bqxcpsis9w9j09ysq91su3zneazqd41nlty99sfhyc4vl35g7dut8d75z3i3unktvlqxroig1jugi1efw253vpb6ofef2cvstjusw40t7nryj0xqpab6i7mdxtn8hmizq1e4gqoj8',
                receiverInterfaceNamespace: '0wgas71h6rtxmyjdas20dq8trvpwrc3cd3n12rqgizewim4t6z4wn8knllaiax6j0a9tg04ysupsyj4sd7iylrbp0ehcjrgmq29fl1n1pxgas0l2x390ap5qe1m9nblqdx8a41h4ke29dingzmz0yfb6be6bp7sp',
                retries: 6401511797,
                size: 1720601150,
                timesFailed: 1353894445,
                numberMax: 9473207642,
                numberDays: 5271319697,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: '305o4l9ve7ef04ybm7o70tu78h26r475noqaomgmz0wrgx497y',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: '24ljib2dq5ki97lhn531n',
                scenario: '2hqobkz1ypq8obk91wm0lj12qagb10ikastpwn10e46tp058ct2drnj8l009',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 06:53:30',
                executionMonitoringStartAt: '2020-11-04 14:17:19',
                executionMonitoringEndAt: '2020-11-04 20:48:14',
                flowHash: '50l11y4zehlxlhnc38gqy25z1rn5tmxy0z5jn0l8',
                flowParty: 'i2i08in4wy3v3ouyvfle4qs8tozh6hho7o7o42wmy9f18nwp043nbqxkto23rjd5iu9ngauhwt5hnuatye1yr2gs3wxtzf72lqrspcu5vnq73g1mnwm5w7jlnkd2nwgxdjtpucz5cz44ke56oliipna0xka9in6r',
                flowReceiverParty: 'zckjxsfned87vhmexqwn7qnij46xs9afo1kmamipw5wwo4gjeiig3fustie6zrz4qb1jidau80wsr4hg93w5mtlsg4ip71k013jzxzn6czgebpvrfnfb7h5l1mdv17ze10x8ovhhnodblzhfdeisqot4hmf3zjf0',
                flowComponent: 'ffj6ex9tq33kpw1x5qd2yuq1p37flvvaj42pewij17ij8l82ctmyjtl0kgvv6tgd427nl5vtekpb88fz7dha7y0rhyj74oyga3q1tfz0nyq885zrgm1ulx4k32g70f6zoxnktqgfkz6byt1z0mkmvgt1b2sowdx4',
                flowReceiverComponent: 'udpu22evygzsobsmjs323ppv4nsejxnfbo6ml6np7r7bvyw6syu9txunp2u5j0hche2p6v5tb325qrg9rbn5r95xh026tmmvf8qgz6f48i4ewt5tiu57712aqqo778e4rzphkervmg2xcshcrzlhyotgc766nl9e',
                flowInterfaceName: 'im22m30ds7jhqdre0i8dknpfpg8bxwyv105kol2wm5xmuw3m0m5sn3ce44x7v3o7inov54xm6so6xogtiepg2mm6i7un3gjsmmici67tjtqnoyng8m63gdojv1dv3ar1qj7hqso982scqlpxjbgbdq8gbalgd997',
                flowInterfaceNamespace: '88uxl5sj0z99456xbmbssar4fxxzz0vkagdzj89may31jzhr8hqkc4lea6tckd167d11hexgf85vgvbq1jwcu1dl2ypfodw69zz5gc6nbeh034dhfulsvpi9adbku0k9yzwwuax6ag1ra5zokkcm2kehfouj4a1y',
                status: 'SUCCESS',
                refMessageId: 'qfdyv5ga8ghbg68sckmr130qtxp1h82udu1ggyqbhzkh1oqlaxwe8uikgyosecm7nfit8niot13z1c8dg1qwh71qszld4o68ptm7c43uqx2h6qkz1mh66qrd5mgwm4fno3by5tvna0ngn9wa6wwbyb8g6lw202yi',
                detail: 'Rerum illum dolor cupiditate. Reiciendis quod quod ullam necessitatibus at eligendi. Amet repellendus ut et totam quaerat ad rerum voluptatum. Voluptatem ea qui non quasi autem. Enim sed omnis fuga consequatur aperiam. Et ut aperiam incidunt numquam voluptatem sapiente.',
                example: 'l2wkrjg41sulbm3q05udalxle61ggg0jf4jnz02byt5t7hlv4nwsn2ky0dn1j90jv1011439fmt4e4sg7bycu4r4k2y807tiiul9qwm8nmqveqy0p2e6i57i005b5um9btjhit66cri4s34t6f18ar8ghf2tye83',
                startTimeAt: '2020-11-04 01:17:35',
                direction: 'INBOUND',
                errorCategory: 's42yioiofgvylfe28ioe3x5osra03xcgp30yolyqd70sls08vryd0oqz6ho7kfo2dfwndzvuxr1w9r830zt7y9ltcox4or71t5b9rwh5u24u1yu5bqggtybfwf36wg80udkfuanq1054zbykzm1itmj9ihdt8u01',
                errorCode: '45rlawitgw1bz485ti3a83p2kwozov9pzyc7ilta9secl6ez86',
                errorLabel: 119816,
                node: 7145184071,
                protocol: 'nqv35b1rutlvzteb3vo3',
                qualityOfService: '0b3g40qswpgiboa58ik9',
                receiverParty: 'f6h82tcl73x2o7mw631r7os6gu3pcq78y18lv95ffpb0bt9fo9fbrmggoexapua1yhjfe56qs7n9wd0xcs18a05p1h75we03k0pip9bbre1y4h5vzsqce1h9wvvq45g6myknafdifc174saik9gvt0ydwkzvl6yj',
                receiverComponent: '9m07a25wuyxtec8jg5xkqldwnwi2k8i4bmw502aohxpbjywe1xekn6fe44khs8o12wnrojj07vsu4mpclgtbf1xa3rrud5deo8166tcux3241t8oqq3gv0upofv8blkgeedw83rzq35zgyol2i00pengd127hczc',
                receiverInterface: 'tld95ko75moa5q8vwi94qgldx8hyzucjxnpc59o1wv7zdpy5qhd37ufugwftslb70a0ej7c5j9rxjtxieo973hziebtayk7gebz3eqvkxbfmdu77mvukd4hwa2b5k8ldvpduhb5e3zcnxoggp2m4wyqepn75w9vg',
                receiverInterfaceNamespace: 'qwsuuh1sr95eeruwfbockkuxoa2m2qh8b5bdv1o1kh16yyd6umd2nzoss5fz571bpsjqu84sk82jnpusal6aah188cewp5c4kytavrsy38tb6qwpxh5yapfdpqd97izm9jbpmqgunx5qb3bo8c3lttfiberl0kpp',
                retries: 3699408309,
                size: 5463968934,
                timesFailed: 4193271122,
                numberMax: 1436454584,
                numberDays: 9498559578,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailScenario is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: 'bnnf0vhx9g8qsutfhto4jgsd82s1mgfbd9cbueao2vytcet59a',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 'kphox5k19um99aycu4qe',
                scenario: 'l4xdy1i76gopjy17ju6x8jertodj8cneyki3oyy26rxaemtmsw5ov6m4ss10s',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 05:19:04',
                executionMonitoringStartAt: '2020-11-04 08:31:56',
                executionMonitoringEndAt: '2020-11-04 19:59:24',
                flowHash: 'jbtlw0c2r00uxnvdlyak3ecx0ahetyr93iqz4hn0',
                flowParty: 't7o1k4s6xnvd0x3dny2l1sbfcuavcrolhc28zntqxhknscaxubld5nbc1omm2bjn01ip108rwl7v1xv5lft8lzfrhu1gwmky2yv6bob2f0jtqrl5l9eqpt0kib27i3nv251m9ld8r1wxq77ahvroegi62c2pw0e2',
                flowReceiverParty: 'ewj2eo69ipnvb735l8o11pejg56fqzxwbm1tmh780n0w1xr95jogilth8lrg7tjv5z0akx681ske0846xzv682og9y2nf2zve5cxv0z76wu1y1bfvyy74p2kcgoszk13kpkw3dd3x5pkcuk6iz3b8ehopfsx0qb5',
                flowComponent: 'qurvybo2opkv45nkd3wiu9hejfwzooronzutiwhp3e0xokyv3q0igo5prhnmy3bnbe8b2jidqc5nrbtqxd4n752r2g0pxxmdmaf700bbfh0hghasr4twlp0u6zr7wi8pt3l62xus0cmaxcchgbkzbklxvl4njsla',
                flowReceiverComponent: 'f4sz33djkw6n9b1pjf7kcji11c7l9g4v86b5ykw2adp0ee6txfuqa3jubxswa0xyhj0x631p2tnqbqer5fxmx4gx0dnnyvopaq2sljrrd52sd71f0jjq8wm2v5ykid71cbfxzkw18cbtv5rq8bi4omky82w6cvs8',
                flowInterfaceName: '5p1qyx8s8oddz6fnjmcidst2l6vb61qw699ie4y2d58ojjmuika5wvtk8jou7f0d1cijjgcjmt6ymiv0w67wmjiz17e1lmkhfyiu7yj12eo1serca7j7nig8c9dhowh8x7k8o96ix91o6x56yez47onzynwvib31',
                flowInterfaceNamespace: 'sj6uaa15kigeihzo90ge9ku2avd92q1ij2b8lyya3uh6fbba5fcy7qlymygg6h0lzlslmpibabmlcw8zvut9a2gnngw8qot4j1tvl7me5awwq7oz3cggbrj2tbcucmwpstp2vcw2om6h599s82r0aqcwdolvisor',
                status: 'ERROR',
                refMessageId: 'zjiuhusffxpouqhf5ud6uk8e0t3nt69bvefgov6ducm6mebg2x4xpb2g78qd7p7cgch8xrlsm884cd00i9753d37e7wfpnewpe03ql04liaweln5ynovcnop3n3p5fvkg7hj1xzj5u5ktfi1tw2xg4pv56v4fd1i',
                detail: 'Distinctio cum aliquam eum omnis doloremque rem voluptate amet. Sit sed dolor modi. Ipsum nostrum vero quas quia est eos. Dolores quibusdam iste cumque quaerat voluptas repudiandae sint ut. Quia et quia cupiditate consectetur est in est illo. Veritatis minima et ut culpa aut nam quia sunt.',
                example: '5xshumoober1fax05mk30mue1h6x36ipa4m2i17kaopvspvzcqvv9nv8zb2dxn6x804mlut7a8b5z5yd29czcbglle3yk364oh1bmobgmhbl758gr5e3za1ffgko3uqvcncu7riyuvkaxkcjjbhdw5j8px7zycdq',
                startTimeAt: '2020-11-04 17:45:23',
                direction: 'INBOUND',
                errorCategory: '57loogaalriq0grrxckab9mnoft8iq6s54d2sm7hmokotl7prmywj2pzb70r7hrab56k8y5sc6sofwarezi7oibbtsyns1i66r21eyv0nvjyy21j22szu7pko2lvhp80f582gxzkstgfuffomw6m19yytsljq1vs',
                errorCode: '8u3cjwbnwxfq3toijbs4h2enrf43967dz4qu16ddalhlxil3qo',
                errorLabel: 771591,
                node: 4105346740,
                protocol: 'rj8462xku78ioewf32xp',
                qualityOfService: 'bv9n7od8gprflubz63ls',
                receiverParty: '1prcgivajgqr247sfnr9kg09pb5yb7krko4ulmfu780xrjpggzzyvwwv7v0rclxzn2aguohx80zdi8hkqw6zgb8yu45b9eqb2w47yedhb5mpbg0zhwwxeymuebvlq0o4sukmkryd7tdhs5f2759yiahjh8cx6qp5',
                receiverComponent: 'lcmq968urjj2v7c8htegtp3r145w6wziunmmqpskq3yv5uyxbfg60un8fto84u99ozz7du9zhxl1kvmn1h44fd9mgpnlznefj4b1zobfndx8wz010oy8nbegfufmsj4d5a2l36nxv6p387j2vgbfms3ofce66b2t',
                receiverInterface: '7k8a9ig8wwl774cybdn7kcsm73lqremxu6ryn4nqej5rcp7pwya7ew3ncouenpj3zfn8ujhpa0t97bqyz1gm2wkaftws6nbvlhfzjh7ba9c8iirfei4n1j7s6z6qv6h08z436n8qaeqj6r7w9xapunxcfrynkp2m',
                receiverInterfaceNamespace: 'vffoq79zlehqrdgopq840vrrui8p2pg6fjiu3j2fn46mjxpxxj5gpq0tmju5u4hy3duhlaweraaofhkljrasoobt05vku11vjca6qa7rie9i29c5pjdlxos9eo2s46z5mzqgixl20u37ywljd6b26b8htb5lgx7r',
                retries: 2837673475,
                size: 2669609948,
                timesFailed: 4522472675,
                numberMax: 8859258202,
                numberDays: 8671622621,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailScenario is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: '0n2lyucxd4m6njxrrvyfdi3b19ln5a8w8gnvuzdw0ufzb5eu4u',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: '094vwcn7g43hftm0jonx',
                scenario: 'extuc79grx10m02b3guz6t1a4692z7ptv7iggfaunsoie65vnwnkidt2g7r7',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 20:06:31',
                executionMonitoringStartAt: '2020-11-04 19:55:56',
                executionMonitoringEndAt: '2020-11-04 15:47:08',
                flowHash: 'gt3qfec5b5lsg2ns9zmm0bmuctxt863vfwrzaeg7',
                flowParty: 'ulysbebzve6kto0r58h132s7h16vvfmrjwyxbgb07z36ts506x0j8gc0s98ax0zmb0yfbyw3ah2r2u6pcpqzof6lfju642o0r04rego8byp44zjxtbr2d0hgqlooymcivj7k8mb32eq1dbzlhai6ch2bpwl18tubg',
                flowReceiverParty: 'ty59utpym5fvvyli5dcfby8r83xgfcymbmgbygv05sh32qt70lvw294d8hdsf8lwx3lmgqhp552is3j96xfzwqjay5s9o1ej9okj8ooi3s93i3tb9gks19hkvsbkbrcnkfkw4ruo47hnem63812leodtyv469u24',
                flowComponent: 'ir1pqi9beimsm9p0ih8nr76xhqx3cxhme8s4tuuiebdwubndjpsd3k7p0qn1s61nv9kds4cjbb6ofhtmankw99q78fvklqeog2axgf3t2f04igqhmqfs5q70t9regy9bpvftgxnku69owfn7i4xqesvj86qafqx0',
                flowReceiverComponent: 'wgfl7d7xv3nj1netfpfv3on3bxudk4xo88d6yfh25qcj6aazr9tu6oiab28myey45tk4hzulm3bk3v1gwpby7j3y89fwgp5znnwrsr7j8yq3motfpzoigsa61otkvil4jm3kxod3r69b21muki6h7c0jf6anfpwp',
                flowInterfaceName: 'kfijr13l0fkznj14451gkf28ezeq50i8hffuz1uz92a7pa1sku67qzwiksxbi0zkmirndjjq2l69t2dymxbyng2knehbf0bhdgfx0dju55a4hxnbi3foyxi765d9i24c9witzaqxv200dqnwlko66oq8ro0p9txt',
                flowInterfaceNamespace: 'jjuaetkqe8syfsum12l89k2qk78nm5luieyr1pta2a8ubh4e70vd9zezyelcfy2gnawgidz2xoke1z6f81xw7y2k91lupcwsy7zuu3qbs9seccygpi78i98e00q4qbhwf454u24ww0i3vfeq07bdiunv36xtwuvw',
                status: 'HOLDING',
                refMessageId: 'cppbcmo4mldgllbgl7igh2kkrjmltm3fkdeshzk8y43r0z34uzhsvw52tskuaew6wx411x5k8juvopn4rhc7xe94dga48d2cpzi3c7boocfyfy5s2v54k2nyywoeatn0xadzj3azrsc9790jf3zoan44sh4rygyn',
                detail: 'Omnis et modi. Reiciendis velit alias nesciunt aspernatur esse. Est quas corrupti similique vel. Aut deserunt odio eius eveniet fugiat voluptatem nesciunt. Eveniet necessitatibus totam. Incidunt veniam amet dolore unde pariatur numquam maiores excepturi praesentium.',
                example: '7ihy2u5pdj7m09hvd3r3xh5ybf6fy3m3k1g5gmpumx4hhrcnsm7p9siwlzq8ip5b4vpgw5jgjz4mn3hobwij32c3l8e8lx63eg1929hkj4bjsqmqfa9da9ooy9foi4zsw3pwulxg98bq8sykr7d5g4cho4klbr22',
                startTimeAt: '2020-11-04 15:31:22',
                direction: 'OUTBOUND',
                errorCategory: 'jr8pxthdc0lna6hbq4d3doy2zbcznfmlx677yl0wq9wtz2psn40noqaxgp9sm2hf25e0q29i9b9wc9zyawisnecciwep5sz3f1x4hve8yw7xqqqfr1e11atlr4s9ymx8aa320vezht88wppqf0pp94u82evnzyjz',
                errorCode: 'z3d7i5ef8bxm8n2782cjvef7y9pjw14k485pkugxdkimgpuo1h',
                errorLabel: 345198,
                node: 4800809022,
                protocol: 'p98qinidmisix328tl10',
                qualityOfService: 'ag5cv5p12imuguhqd8xb',
                receiverParty: 'ifir29ln5c9l6jsjr97d5tn48ad8vuc869nd5iwnwg2iiht8qs2zh8w5vznn8l8bnth5wsxzz215ow76nr3mtsegne7eqfa49ks9wy2bvd2swjxpccq7y7tvbuz14z289xpq6spf0etu548uf0h2duxgaxlrkojd',
                receiverComponent: 'qqxquoo7gjcdingzft8uj22tlzc1tsjvivyp8jpn5ar46iit0iu93djmbwbx1jndwdkxh4mgytu58k8i0e1kvz2h7zs0oeceoimycb2qu9guc4tr7vm8ys4uikfabuqzgrqcrc45tcg7z679zels0mazo8y1ocbi',
                receiverInterface: 'zw3ikahuxhoxgk1pxjmk5fgyazy6rl4fe4i65mpdcz7un5tvc57deljni925dx71triw03zcy2qn87uizpuuhu12xzr3bkqmv0c13ohl46w7hzr26sngu59d1rqzj0nndhobi1ayj94z69oym7chrqblzfap06w8',
                receiverInterfaceNamespace: 'epowm37fe0m1l46r3cym9j9pb75dthwaoxw51korrx4sh8lqiug26ilyb0jqtiz4j7jomejyh6scnynyzltodyd9e0kjgjsts9hv9tdvorgqnh9cfwr1ti4ilr7uz26ga9qqe6je471m91vb9ysksdg85m2r5e68',
                retries: 1253305868,
                size: 3163256650,
                timesFailed: 8144040047,
                numberMax: 1331897615,
                numberDays: 8065218612,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowReceiverParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: 'fn3ki1ix0r15qwxuwpscieh3s4p4w2jcicu1151kn541txnyln',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: '6lo653fq1e20flmrnfjd',
                scenario: 'oxcwmz3evyyo673vi5c1uyog9pqf63dni6op61vofnq3g93divrqpgfx3mul',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 13:27:50',
                executionMonitoringStartAt: '2020-11-04 05:25:26',
                executionMonitoringEndAt: '2020-11-04 07:56:01',
                flowHash: 'g112mevvy4iocuofnow6tn3imtebvz19wcqj11nc',
                flowParty: 'b2q0iiiwa1bafqwg7nl1gxd6g7rmcz1h3cy0bevvnywjqjrppamhdeuoi1828wf677awlh3noophtb2f55b5f8z22bajhbworqug946swwwxn2qwp76vupxiu7s3lt37r0dmiwa71n34yigazd4vqwemvh065qly',
                flowReceiverParty: 'vqbeuh8jfopm4snuew0bczc2uiugyle8tm06g82dmc31fxikev8ohjeye05ec5w5mcokssvoygpe0vqeif1jupmu7nhh7n0xhzgyg60032fr2x8hrkxq9xro2nk0ihls6dqrngcle0k962w6pqplr8vufhflc3r5p',
                flowComponent: '7yk7lhjlgk434od2fvme57fvakva7k8bup99yczhic4vmc1kjr8uskuumvko11rw8minrivn8njv3ryo2letp0g2n9j9sdavw8tqe55iusje95ijsejcq6dwlsn5e8oru1leaj3tj3oi4jkc3wj7o3dmxoregmba',
                flowReceiverComponent: '8nblkjx2k4jgun9vxcnylcle1gljnbhu3td6o1863abzhxxvbasscj9wcduhs86mjkuderg7kd2rxjy7vu7k8nnrof7stewc554wmqqfydb3qeybyioo24xezoxya7yedsbpukpwti2w4dpkmx4t37xqltvq9fl0',
                flowInterfaceName: 'pe4o6j7gt95hjkpgf7dt9gx5fk5ijvb84q9tb3vl59hhc46drs7ou8f36v7opso3nixlxgj70d45961tol1txasc560jkznj8wkqsgfbip9idz6hgd5g86my0tqkx62s52cbvi59sqc4s8wp983y6mi7gnxuqggz',
                flowInterfaceNamespace: '4cdshkdtjs7gx5nbde1lkkkib9udotrlbbcafz38p6cut7niedb1ayxwfwowrwxqpynd9ff132dtafpq1mxnaw98s36fyssky9yvmbwacp9ht4seqk744i1y2at2t44brj24icjf17pi72odo04a5627m389gokj',
                status: 'SUCCESS',
                refMessageId: 'ityqhaehjsaa6rl159czuvzaw7dto1ffvtewlozgzhqxvjy322kdrkca5i57kps0inz1tb3u935jt1yq57brak3269l8ygw0arfwedc32gnn1vc27j0j8nvuhrz4pk3armba27cdo3qp48hyaxojus2j3jff815z',
                detail: 'Molestiae quia rerum iure est sit. Et quo et sunt quae dicta delectus iste qui. Neque porro aperiam et. Recusandae maiores saepe atque commodi aliquam maxime iusto qui.',
                example: '1v0l20f7jo2mt67mktdm9jletypkur5a5wriv3p4gxi9ddjfz4fk3wxfy43hecj407tyngxcjhnmqzxr8fxeiirq3zmpal0troeaf2vwro99n5jw0nyufxl1jot3l2ockrw62y69v97exklyh2siaq7uq4r1crig',
                startTimeAt: '2020-11-04 02:02:41',
                direction: 'OUTBOUND',
                errorCategory: 'lnia0e7q3spoojcki79caoty6pe6gjrydi7s0rjo26s21oko973ti0uufrunntafuhye2fe4aujyej0u48dfv6rnlhfwiqz8l3sbieg114yvc6arvbbg3nmfqig55ga5bnd2fbmsjcj0m5kzxll1kkug0mqasf8c',
                errorCode: 'gs6twz460tx3rwajetyf3a24tg7us156xrasq5c8ujxcyr3tew',
                errorLabel: 585399,
                node: 3531522085,
                protocol: 'heggd16vhqzp2vtb3esa',
                qualityOfService: 'lb74t28sxhm9zl3k25py',
                receiverParty: 'jhd3k1kazbf93ev89jjulhncy5g8qp75l8aj20lnuye36yq58qb06rgzaz5wn2t0po5ti179rc2goa8mkfdue6lwwe3iuw4oq9js7ao4nq03qajinkdxdotgn6n2mt3tki6zcqlh0he4xkznt1wt36zn61afwgjg',
                receiverComponent: 'iu8ygdeb4309leyozgf5fbvtompjsiucj0eiptcjpurpvfb7xtw4r92c7jkoo39dxvx2oguld227y74fefls4grh6msj4w8iygclikag9mhtwjlq51nou884ydqqehdv28882zstubu1dz8021xdvdtd9aib8oql',
                receiverInterface: 'ond69bo621ff3vcftpo1y5qhwvwlkhkrxns81agv3xxsf8adowtp56d55g9td1mpzbd8cyb564eg58t4uuilzh33m7u74hfz40mimyu4aee1e7usawl19xqqfv362m0oe5bpniwejwreu9qqimqioaba9f0eik6p',
                receiverInterfaceNamespace: '0p2pk3h5ei1bjfbxok83dhjmead0sgpn5y6tvs9hinby3kridars8jwpor5tj3l5gvyfl6sbam1scj66tw81nfqklxgxe1j9nyle52wjqnbc6k8zq2nusqqw1ya5ftno2w0q4x3isye7751la3y2fot2a835feuo',
                retries: 7148751119,
                size: 3432043285,
                timesFailed: 5847981625,
                numberMax: 9830886956,
                numberDays: 1570292768,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowReceiverParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: 'n4ow3qnm446u1pmduddxv426gzc8c61l97qp93p69pmi1hswc3',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 'm1hoo4crg425i2x1cv1o',
                scenario: 'cgixcoreve383ratlefejf1vjy3nz1kpyt2jua4lknqsohitvmkn9blpnbxk',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 11:46:11',
                executionMonitoringStartAt: '2020-11-04 20:24:04',
                executionMonitoringEndAt: '2020-11-04 09:38:45',
                flowHash: 'tuurcenzoxp0kcnmwa9rulam0gtalz628udylaa2',
                flowParty: 'vrdx6pkj44czs6w8jpiedi4h0rhai5yrhbxkxvusse8fzm8yh1o7jq67bv8np0cd7bk80u28c0nqtgkij6vfrsuwgy0gratu28k4kn8gggt11tdqhisp9aztnnh8j4ks6jeqbwgraf4p7wf7d5bqweex7cvkd6zw',
                flowReceiverParty: 'ubc79y6rtcfhrx9lu1j5i78pty6xyaljza0l8u9vlvnvvnakaogrw6tmbj6rjiq3fomcqd742ju8nu7zmbjh6tz9y0bs8f2kd20rgk9lrhh15bwo3f8rm3qjkrixw170wionk89ljve6zs3jlw236bxj2zimhy4v',
                flowComponent: 'd2zkpltin9z5i33ypoqjt17qy8gkbdepahjgjie6up37p1ihyuzgnzsd57fiyjio2vzwce5p4574dgw2qksdh67hgn2bzm63jnu9z865sef2h5svixxa4ib0aypwuq6djrm6kgf33igarohe5ngd8gda56surf2df',
                flowReceiverComponent: 'mvyjy713dqh0enesvryuoantt7ve2xdq60ahdgms1xsc93ejqcrk0n6di3et4g4r55v1rg01v9zvnoryq1hdghw27w57pa4nzwqdz21535dnwfi5popmkju8qmncjg81jrczxfg7dqty99delm2may1e8crwvlcf',
                flowInterfaceName: 'ue1tztqrzmsoa90156ayklqhpgp4d09slv0h7jc0fi2amconv16ljp45x009c8077j5zluhgw2xbum7ctvpsy3wuanga2o0qbyy0421gzrzrcggt29qtzvt7qd5ad2hj27pbxlm84orynvsu8wtm3jk293x3ukkg',
                flowInterfaceNamespace: '646h8ndddc7h97ggi3geev3z59ogofgbowwjmnbcx2hrfz59zkzsai17t2ev6t8cxohi74y5n6gue89hwg0nr0dotmfogekmyysue0k9u0dpuxaju8osaxz5lvcvaqg7a5rxz54hl8q7fxr8klrxn9r5bgs48p0r',
                status: 'ERROR',
                refMessageId: 'aum2v1rbpct2v85s57ybjjq17z7yaaafpgzdp6x5cd7u25afs5vrg76q1ye88q13a1fyan3mshk9jo0f117xxu4j8fhjutv8kfv9zyo215glvcilurxhq13w8ngk90bl50op2d0ah3z1b6a22wqaqvxnlz5ho8ra',
                detail: 'Eligendi consequatur ut amet similique magni cupiditate ea sed perferendis. Perferendis amet sequi totam. Architecto a amet reprehenderit ab aut provident voluptas repellat voluptatum. Illum dolorum facere minus inventore.',
                example: 'pwausl6fdlrrb1ml4wh2dg8tpf8hwsi9ktjlcn7nrqws57drkfyvrt9b6e7vawt87rdbqotlam8uyif2cxgrra6vuucmtn5q22p50t8u3x6z26u3ggdv74h5ok6yeerw44o6gyrlm9r7jxddkluycxbkm2k3lw6n',
                startTimeAt: '2020-11-04 20:46:49',
                direction: 'INBOUND',
                errorCategory: 'gb86hmhbmob4la4ft6nftc0wgcclauzbtdlafxpfuph3ftyhqfueqvdbdrl7jhi5bt6jqb8cpcsjwtwztapvthkfvvhmcnqwnh5vk5ch48pbuyjqmhcurgfzm5htvyzzhyi6iq6q72fysd065og98ls0fmzzpyx7',
                errorCode: 'c3l26v79mm9s20r1v614g6ipfpy0k78pufyxfbm5knj6k0xwc7',
                errorLabel: 904704,
                node: 1765377255,
                protocol: 'u4pgqibxus5e0qglpgn0',
                qualityOfService: 'fd8cy63k864prw4ivbo8',
                receiverParty: 'e7i11r318p00viocypbkode1fuyvdateh5okpuwdrzw7b07anbnyqtopc22s00voe1x84obgxdlkwkc5yksbl6k06v9uhgoc05mm2n61vpotu0yiz5085n1q469v1msb3do2yqjuo3lbamakgo8t2yciku1mhnt9',
                receiverComponent: '6s2dpnddd9r99oei4h9d6ztwe7qe9pd6c4c4daqp9pyzkn5okgv2wmtlpnk87uk3xe4f8blqyc17zmqh892qovwg64uoe8t4atai9sadisia5ihxjqjgo0x0qp1sgwu8aaq49hxnlg5um9yenrdi20voshwy3tfq',
                receiverInterface: 'wjpxlyxdxksw8b1h5keipde9dv3gee91a2hd2ezvod00u3cam3amcwccjz4flql5szdv2fv4e5mby6g02hrdwd032wq01jtdtxjslm8wymt4hxopqt3cxklx8qljl0uy7f12n3tudu6uotyiaj9t41armxpuf89g',
                receiverInterfaceNamespace: '0mtpms3jevqzqjnevnxw4b7qfacug0u0c107yohxwnjvv9phrbpthokweel943gxog2w1tco2w0zev5nq1osk1xbst56ubkjhoe1pfilgjaulla0bm23d7hx2mquy7n43hoq7pi6qsos1svw94kz4kcexlron9sp',
                retries: 6701366057,
                size: 8608480086,
                timesFailed: 7000590603,
                numberMax: 3185180986,
                numberDays: 5988780128,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowReceiverComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: 'mka0fuyvjuy0iogpge8dis7pqra3e5lkzxempvir2hppqpv9g0',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: '8ylofohcdxdr4n21u5um',
                scenario: 'imz19dlzoalx08ni2ta3e7fvtj79b8nvltba1s2q567a64y5ye03wsim1sjw',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 00:38:31',
                executionMonitoringStartAt: '2020-11-04 15:25:50',
                executionMonitoringEndAt: '2020-11-04 19:52:41',
                flowHash: 'lnq1qvlljwburmfmv970julq0t6r6ys38ofnkess',
                flowParty: 'd52r1eqlw37u8jzn28yrmfqgxe4dyptjw8bcq29exevls54l9ra4xttag63m6y6a5kpejtgl1asgis350iqhbl1etqg2lpjfyvy1hadr4ognvo6ibl181hfwk0jk2hlbz9nbnwq7ew6kk66z6u07bf3kmp9bh85c',
                flowReceiverParty: 'qxvhm72p7a49eehypf6c0q7yezmbn9hsivdu4x1dus65p7mki0td86od6267zil1dxhf0kjkhf2hq471vesespe241qo5d8z9uw40rwcls4k8jxeprlv6t16kkpz81fb8o8l13j3vlvvsohl2gguguu86z3d5rmj',
                flowComponent: 'z7zylx614vap7ki50onfwtuswfywmlz3mh44pinur2dj6wonmc2dtgt2lvlgawwyf4i8qbogvhhxgcl34tohxnmqjq5vrmhf241shv6orgmrampqn8xfhufogt36blhzwp2twd9ue1a4yrygivlz4uwprdatx62h',
                flowReceiverComponent: 'lu0c6l99tnhv6u8112fqusf1iq8j9g6fevqyy07yorkxd9ww0ie72u57e32q6eo0cmyl80l02y5cesisqk6q7sjlz9fl79gyv918ydzkxw7f0siry5yd7mnc2lmltyf2kj0srcbb01t78x0d6jvqt83sxgeht8oi3',
                flowInterfaceName: 'bpzggzssfdrb15zpda78hb4t191qxqw4511w71mylcqb5s6pz55wmf9p976va8eg7dp2jxij2q1g340q81ojn3qv2bzdi2vq06poxsyhpdzxtaiucptz98ya3k6rwf4dytgl3j953v4uqbrdgfslm7nch4jrw22n',
                flowInterfaceNamespace: 'zdbiru2zq01v8z1vt6aragd5keoxq449jbxsux5js8o0chedi8zu59by8bh5nfdouxi17kxrs8wrwyj6eu84xc0ha5afdvboqqml3k76y2fuawdfneezfgfkjjpy70decgkfg321wxw1z86mj2s1owdbw7rtd0d8',
                status: 'HOLDING',
                refMessageId: 'n46vi37j25kuq9lmgd5z3li6a2fpcns50q7dau1k1tec25esm817qwgdm404yo0l2zz9zeyeks7cteqms55bff11yprjey06jr0umar5otzvoec4zzuqb469mn1sby3ggh3irwwvqcphriq6ascro9q203cdkwbg',
                detail: 'Error harum est quasi ut unde. Consectetur eligendi porro illo. Ut molestias aut quas distinctio molestiae incidunt. Atque amet officiis placeat saepe.',
                example: 'hwyialev7c6lq61pmuu74hukkxegbg6urbi9zgibl6z7o85adleumgvwyo7a581iimgoutseilplkc77r1p5lwppr3220bmcc57d72se62gu8sb37pt1gnp1okev9pjgglwyx0uk2eqcxpomadqq9122oqevixz6',
                startTimeAt: '2020-11-04 12:11:04',
                direction: 'INBOUND',
                errorCategory: 'lkymdx51k42nf4a0pfi3d6ab2pb2pvgq3komydejsbhn5ypiotojn2gd5e5y1b6d4v61zi85i2upuluktkeoogvtz4lzhfyi4jscuul3ua1tzf70n2chyf5f723at8la5o5spkwe49v9eod0u9q8m5yg5u08lwnj',
                errorCode: '1oafrnap7dm73r7wf14f0s9o3n5a0i45m28ipbx1223l0hg2co',
                errorLabel: 310431,
                node: 1331083239,
                protocol: 'ehbykyx885vum7bb9705',
                qualityOfService: 'uieri7g69syq15iinos5',
                receiverParty: 'ycq9h7x8hem93vdsy419i4lwp5sg40471btokkaa4h7l8wkt8f6rirx2f3xes6ubicflr6apv1k0ry0am1iz3q3szbroeigbzzqshb0t9xsxa4r0i7b5fglyb4ra2djwcgtmbgrh6pjlj46sgtda87zaywyj8ujq',
                receiverComponent: 'havku800s6rq5947vo4ln0xosocb45vgv9183unzycf0qbinmheg346utlhqrcxw9unvqmp2udfh64v9pduzrhp0vke9t839d4p9p4f76l4ce9efmm61dyvtpeqgy0k2arsfwj3bwuubmwn32rqi4ogkn8mu6lr6',
                receiverInterface: 'wlq4lkxkjgp84l3t7p0neiab651cmqhu4vj0h49ytd9ng21od3x55326e63zkqo02ugocrde56yt3fnkig838ac5v2iunx5jr4b8g04y7eh7d5tjx38y99s4s848tmzm4vbk1bsortejxu9ns8ikxy2ca1q3h4jb',
                receiverInterfaceNamespace: '600li94p5uksrfo4c4ke9xu5cmkvvzd9ovp4i2qd0021ofn86v5ul8zjal3gj12ha4238ifiureo6ydtnv6ylytp3jauk7p925puutghff3nilaua9tpj33zdwkgp2wru6cfmpi1y4vok97pw321le07olapd3rs',
                retries: 4656065821,
                size: 7016640895,
                timesFailed: 6512445189,
                numberMax: 5385390597,
                numberDays: 1798968872,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowReceiverComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: 'itnyfct1k7jis73f7vpas74piangkwpe4j1fdkomf1ny9t6z20',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 'qk0lmi2sh1hsfbtme3f0',
                scenario: '3scjmb9qia7xo3zt0vk0d0hxprd9sr8wccuuegi2q0z6i4k79dd6qvc0585a',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 10:24:32',
                executionMonitoringStartAt: '2020-11-04 03:36:50',
                executionMonitoringEndAt: '2020-11-04 13:37:49',
                flowHash: '46q3lk3u3hqh7br7m3n4vmhn46wt0emtvbabsatx',
                flowParty: 'kqr3mp4g9ezr2nrgeh620pfdho3h43zubjl2231vj5y5pareeehkiice0b683dqhpoqg2h0c0e0tq0drxr39lmz8b0woob279qgok3me4l3rqzw44kdeefp7kv64wuldhsgc1m5zbd1u62hx5f8w8uahjl90e2mb',
                flowReceiverParty: 'b2z8hd2ogvj8bi697kpvfe3xo9pmfmw3iopo709p52qfl7hty6eeun0fj6o9w278l84r9nc2pq92ln3trwgh8aqporqc7o13nic0xccrx71v5fdmbzugwxgsh2grdl0492dxdrjeaz352qhnfvrlc48cowewft0g',
                flowComponent: 'j6d5hrxftr4x24z84qff2bugng0oxc4ovp1fb4dezzug1wu7ln8op6pnk3v6q2qjmqvuwj8x1030w7rv2oyzgklto3jzl8ij0dgcnqtevngg6v6kwxerkavzl3xm4m06sxh0rh9kwiej9bskxd2wyblfl963irlx',
                flowReceiverComponent: '2crx5j7w30w99498d8hszaf4yc1yjq111vqzmaor5uso4m12r82yvnf19dorgbt1w19eyzz0siryh80j1xbwhqrurdi7kp1oonyyztoh1bbmip45t6r9u943p0z7x72pdau8tm1398275854u8o8tiegt52d6t3i',
                flowInterfaceName: 'a4gpk00039u5vf9ms4bhdowqwtve7afq822py17g26lg361t2fba7meapvlsv4i02c65qubekumuam5nf4006u0yfiws8skjrcnx14m75wk3wcrppgww8uaceo1cza6i7w2gpmnwdnx0dhlapsaak102fpll7ejf9',
                flowInterfaceNamespace: '8e2t0y77f6lg4mdb1if1b96bjwijuz55bw7izqwil6lfx554klc93s312tpd625zvr86tlfaw2sldes9k48mcrtqgenho2oj6a42uv8m8qbk1ebjg6yc188uh3fi8k0zxh8d3vh9ntrgaa2iq9aztigf9eoa9x40',
                status: 'HOLDING',
                refMessageId: 't4tw62a67usmvyvplqtt1epomjy8y7x5v753px9g9deu2kvabveeh8gzzbe4dmxihpz8f9l6bpq72vp97iil1jbn08x6tdzwvjxl4rvg91n8091bhajri0dvba5l3agr6slb95lyzkoojkhq27gtpl1zcfc44yaz',
                detail: 'Consequuntur sunt sit eveniet quia sapiente quo vitae illum. Eos qui quibusdam mollitia quas quo. Aperiam aut odit iusto. Labore soluta dolor. Numquam iusto eos enim.',
                example: '1ycxjh6c6q9vquamfoiorym49kypwtm3orj8zxo72p459tfzxb77z8gy85mu6mqeydjkz8oq37wjj49x1h5lmdrb5zyrv2crmh5ogyky2m452kmuhiegew889jadgnpw1ipm90kcfplmjbw70358hhjab1dg30dr',
                startTimeAt: '2020-11-04 10:40:51',
                direction: 'INBOUND',
                errorCategory: 'u7afr6zb55bt9v5zm41vak6i2ayoezf0kpjlyf1ebowwu6ubnni85zzvb9l3jipg6piziuw5z0znjfkv5xu98mygj1atkzpbxglo56jqyxpd7fa6h9nr3rufvs56ps3nh08uq2p9n2hl2xzncw5k6zd6pou6tkqz',
                errorCode: '12w7i35jbzb6q2plcq4x9w4mgxk9eulo6wgp6mro76kqq0tyfc',
                errorLabel: 906948,
                node: 9348936187,
                protocol: 'a3pq1wy0qgaj6u9a64yp',
                qualityOfService: 'yr4jzq0fqmd0tmymoyy7',
                receiverParty: 'a8ectayb9mrh5ox9k2qljxo33udwbo4qsh7wfbs6e2ccseay094gfinzgzp3hbtbsgqwbwdv5n00kuwltq0vloydb6taw79bgbr57jipupy9lp0sanofxuxbvkpkv3hhpdsmdhzgezafffhmj00rg5op00ii4vks',
                receiverComponent: '6ik5cllufjmm2ikspvua943v3xau3ap34pb0o3lmprxihoy1z6adqpgtb5ix1kxi8h026cxwt14qrddbr8zepqrdyl83zmubwm47wsqa526ezi7ebmr0nal9fjq6oh7suubhr2lg5688v7g59cmj56z29lj8489v',
                receiverInterface: 'yfjk6r85t47cgzodvj6si8c2t1w3q6cvzigtmbvrp6zbvzc9uc6zywbgf01xjtm0wjhitbtfjjxxgj52imooc5gd5dpfh48rn81muvak9f8cwadxqnp1a83qe91s975qkmr5mrris2izu2fbdojkzjkqvk81b91k',
                receiverInterfaceNamespace: 'ckd1gi4tx4cluoh4i71qq19zzpwen6uis9anlhkiism3d4u1wgnytt0dpjtlsdm33n8dhknmas4bm5zcmzkwjf3p17txjp42204byuymm0k7grbua6h5zx144qy7dlx1rs08n55wv9plwy8hafwa1env962t5lye',
                retries: 8169213993,
                size: 5637250401,
                timesFailed: 6114655929,
                numberMax: 9921906878,
                numberDays: 2771668116,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: 'f7iwmc87b46c7wmt2890ze7no1yjlzub2gb4kx87wxdfappnqr',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 'vy35gjd26x5qmirojk40',
                scenario: '9xhgo985gkzjfsohhon82yfrdon1rx0paahdkavmskzhp1vjxty0lfgli19d',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 05:56:16',
                executionMonitoringStartAt: '2020-11-04 20:43:32',
                executionMonitoringEndAt: '2020-11-04 19:51:05',
                flowHash: 'mkrmrznmuupuaz2kjo90eswtispknhi19kjlz9zt',
                flowParty: '8u55f63126ofpict8npvq0zmxdmqwfwihjcudjk1ipzpy6jg48qs7c906zev2ot1rvv3b8ovkgwfhm590ldc2k4piq4pivtelyyo5lnzhfi8qn3uegql3mwkynzt0q5su9eftnsww2jszpgh3fgn1cnysyg0s11g',
                flowReceiverParty: 'onfaazj581dp32h1z9q4nh7l2rrufn7dyl987e74letjdmaex9dwhizarq6608fb563dcuud1imgavyz2jilohi2c1f8wq1v4dy8rnusfool7uy1uuk7n3lm1lyerq4psq39yhqbb6zberbqtbeln8r4m71dzu0g',
                flowComponent: '9db1l81h9bdydpmfqmbmm848pd6ntyhiewax3ok521y5ctve5z98x2fiv7iv353xx1z2f1wn9gqw0zqshzjakoo7qu3kwd0qjezdypochjfhdsky4234nh749nw6q2r2b0gf795dy7e32xlhl5wtxep37yson456',
                flowReceiverComponent: '4dapc47x43uifgjc82j4yct8wytwhrb8ezm2wbk9pxwkpi7q841t4n6jo1w9w0m41hkf15246o576ly44pi64qj5m34njncmqimrph2ujnbx7dwvhs8jzt0n110gby2ej0d69k47wvk1rvzp7mnznvzz09ip88ey',
                flowInterfaceName: '8mpedcs4a61t5v425ehh7hnsooscokmf4g2564f57mwgw1rtb19ygtdh2iejdig7u9tk1dpniikwb6e7z7qarzctoto3t26eufqt70zsi5a3mfmm28bzmz2ouhkn7jvyswi0apdawruutoinya1nv60cwvp43tf7',
                flowInterfaceNamespace: 'b3n7c3xk9abjr1ssr2owufoutubk7jazehzgedi79vyy8zzw9mmjtwcl3rjibvkb4uskzqws6b3gu76v90fbjivkfptvv36ezldgav98bk2usty0s7c6dtb9r10kmtpq4zw2aeuba80gbabwq6qb96iq2dhj73omk',
                status: 'SUCCESS',
                refMessageId: 'ebo0q73hzl30abrj2lg5behqkil4493rwu6krdp5bkzml4ok27pldd37uuyy4bqn6xsvnanpk9pvkhnjh4iy77eupz6cbio8sk3kjc4sl9tgpklgtsrab1ohbr5ey51y2hgm9wbcrnunkjlaupw8lu7th7epecou',
                detail: 'Corrupti optio eligendi porro et velit aspernatur et veniam. Ea veniam qui qui eos voluptates. Quam aut saepe doloremque saepe dolores eveniet quibusdam illo. Voluptatum quia exercitationem. Saepe quos officiis ut molestiae sit.',
                example: 'fn0z18a3t8avrnzvvjh2les7uzbfhgj2cfa2h1zlkndhl90sdq9kv3dn7sz32hsn1fwq167za1xtb9zn1iu5ldy2srmsx3pauouthn60iorid21908d5bfw1vcm9x6apu03o5h0oqlel2xr84hturjw7tssp6a4m',
                startTimeAt: '2020-11-04 21:34:59',
                direction: 'OUTBOUND',
                errorCategory: 'ylpgwymu6re124yj7ol5f6wxs6gtesq82q43p07adoy77j7a7ztm84awwl1oqdv532tep61p2tz25xfh7u3i1cbex3kkz1bxccxj553ko5ps3fx3uf7kkny03lgjqwwu8jjjux7mo8it29gujz604nlaxrnzxudp',
                errorCode: 'a8ughuvsp6azb0ft9rnrtn59li9zteyvv79j3f312cpnkrtq5a',
                errorLabel: 823564,
                node: 2601547737,
                protocol: '7csicc0pc9kcfrm4m8zj',
                qualityOfService: 'deofvnw2241i9grjyi6p',
                receiverParty: '1eod29iragqaec49a89hfvi3ab0jmc1fxvd3i8o4urlnesqkj0oqjktrycoamg234unnydbz4au3gdjbcl86pup5dta5slyh9rmlsawzbi5v0wgrt4ogg6fmatwx7zprbblske4qdgs3ofjtif4rzvlzwuv0b6d4',
                receiverComponent: 'q2jficn95w5g6blca0q89ef0su82mto2b83zon4led51xjz1j2qxdulymx7zcklxkuw4tdk1s824oqqkk44rlejn69iefy84eyk6rkcoigmqkqhkecu4c8ex9nqy32k1xl8iqn46n8hsvu1lmjrz92wkhefd5vfw',
                receiverInterface: 'tma1snnodcpaqyzjv3u2a4lit6iyp8a8088lo9tiyq51g2xk5ee4jj5ztwhzkyru59d1l5vhdhl444g5sudp26gw9u83u3ldsk5br293x9kfinqpti4fx3hba3r5sb4sl8q9tt1q7wr3h7txdcncobdgkvuwoy3e',
                receiverInterfaceNamespace: 'x38tnz0g2v3yknb4j7ln83s1ljwo06btj92fyrt58k2jcvqrj3gbwcrr9c5g5vyi3ji4m3akkqj14ljj0tw0z9yxjhwy69wy61q6zk2g346hiqgz8kx3dmajuyea1ytsawckk0en8ip8iu3yjc8evttqgc45b5xv',
                retries: 1247705117,
                size: 1143587426,
                timesFailed: 2583639695,
                numberMax: 3381540268,
                numberDays: 4358711687,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailRefMessageId is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: 'mjp65s2bxx3hcycgqidztvs0puv4anx87dv66pfdtrmkjxde37',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: '7n67nrs4nwj0dp49ka49',
                scenario: 'da3oij3ztyn0mdlob6v2trheztp8rjvjd8toismpb1xnm56j3oj6fcq1v07i',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 04:54:19',
                executionMonitoringStartAt: '2020-11-04 19:59:23',
                executionMonitoringEndAt: '2020-11-04 13:24:41',
                flowHash: 'hmw4rn0tywin9wid62mggdnr9bikz1hjdp4yl2ap',
                flowParty: 'wvxuj430sutte8vquqnemw4elx1jx3x3sdyf1d2v9syb8vma531nulxe0ytp7dv1mu93051upe4ix7ubxb0we0gcm5t37a8ufdigdr0obob59ma6iyij45dle2mgauikubqesmuklnz9chrj27l0tnplvmdaiwxc',
                flowReceiverParty: 's3b68akvq7dfbed2pzpuhqhunp8b7le17xxrlawvrjbrwl6e6cvzuzvq2k628tbv73up3313tlo22nzxdauy3547346yk8uzbwjg9ok0kybrvho3xct92zusbtlrendo7wdlqsb6h5qq8qdjn4rk3epnfxv5p8bv',
                flowComponent: 'sq6xblp6sc5gcl077susrtyqkkjvgu9vryf9d6db5vzgyk6hjnkbbyu99fu9jsbsxlboyjvz7pug4ufor4r54ghcls4om6zah3mnuwf5dzfscmccfq341238flkpmjseivone6uzlhqt4tqqoqblwq7mvv64xwq5',
                flowReceiverComponent: '60qp713djovvs55sv7oto3p8suq11bvrmtfkpm6frqt2uvz0sllxqdymavmilqymqmzpnnruu4fnn3x3fwrntwli9bu3iktgsw8w865gd8csshhwhkfmez3xyvaydj112rw1x85k6pyv0i1k86fckbvfzozfnuux',
                flowInterfaceName: '6xe4tfvdbva890n18zpwipdkv8if4fnl6dl8wo6p7fs9haz0znz4cw15393nfta37t56ezvv9i074ebqf6ba3m27oii722wn90oprqmgu1n3ouh7pwe1koy2k1l3gv8n9sipmqzqizt9yizabh1gybk1xz8w89e1',
                flowInterfaceNamespace: '0hgdp1tkpsjgdzg623mmkzxhaq212x0w8ptsgqczmzrm3iigvpwnyn1fll4m24qx4yhdigmpu7ta4w9hki3f46ff3y9czhrzr6zz2gmngwfbplyt7mdykz6mzfxmq231wr5ycpogm6v99sfeop2exutt8ycmapde',
                status: 'DELIVERING',
                refMessageId: '5r1ez8tn3xlg90x083dion2ajhqfqqb1oqnfaspcda0yh6292n8fdloadyc2grd5de1nf3wxojsgvrm8kmhrhssdrrv5tym0oyvpc10380qhoam05xznmnl3ec1jgz34xsbbzgg20ulsekamu5bn1s55hmftuw2cz',
                detail: 'Temporibus enim eius voluptatem dolore dolor. Corrupti sit eos. Explicabo delectus ad quo a aut alias sed voluptas sint. Minima sed ut delectus ad corporis.',
                example: 'lsjxjw6reky2g1641v1j58eltipapmylfnqkxm48tu3t510il8ulisvyrl7f0i2g95xzpht5wqe264wmju4irbhpwkfybakeq42fczdfen9a2185gg6wdlip9tlonc1abg1zml2frvi1lldjmerxqnnouwzpwvac',
                startTimeAt: '2020-11-04 13:12:16',
                direction: 'OUTBOUND',
                errorCategory: '1gkvcokqeicx8s9gvt3ql11339m1qydv73gvtn0cz2l84gh1p25d61k35s9m16hmok3otui5jvdtaexvy40h6hreanpvso1lsl6nxx97tby5mj17g1qi59obwvfvo251vgkmh8vfcq5bz5k3i9i4kewodx2hn3cm',
                errorCode: 'yb39x1g7w008dkcfktxxmb96ng1y076ul4lgxyhlyej8r27i6i',
                errorLabel: 271209,
                node: 2736357925,
                protocol: 'hvt0t2a07m815lz3d5vd',
                qualityOfService: '32f6uuapixkz3rkbktpq',
                receiverParty: 'i2vyymsbszxakvxveon1xfgtocmmugqrf5depcim1i13b46shwbsutoe604spr3mcodkvxjocu8qg9grmlg9fsd0tl9knwbza3bgs4f0q9vcz9gw84imbha5g7lchr32wiobghjv3kf2t4xsb88xbmvi37nywbuq',
                receiverComponent: '3dh5wyisczcs9oq4fhujxzmpq9y3omgpjpz3nt54fd3l37purv9jo9i8d71v4r102rhsiyun593ouw7kn8di0umisty6wzl6f2nrz97q7mb5m8f4wrk0qx2sqlj9uzgzukt1vyb4k9px2t1h03r4s47dkuajd9sj',
                receiverInterface: 'ujlw5fyk5q3mlbxlaurai4q7tcs50j4vkagwfs2cdnsr3yp07tjjptoefyifja3060y8vk0rjyncwcgtr207i4vr70xijypjmtodwrhrux9kn88g4wbwbwdho2a8izpjg94oachme1tbb25fyfe5m2vmp9zittvl',
                receiverInterfaceNamespace: '7irixzf8vb0m3ynqxq3z5mb4yomngbeluyvmopo7nagkt7cqk8opwpktvxslz3nuvtcqmhqqi0xq6ho7f3w3axctor5x2q3fbwnxm0lxitrdzmwssuh0iue2butedt9xqy41wnx2ls48v8r1xt3znie7gzwehj14',
                retries: 6532380760,
                size: 2543205234,
                timesFailed: 8744774909,
                numberMax: 3017406138,
                numberDays: 5500551886,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailRefMessageId is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExample is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: '09zb7pa2ilps4nrg7czne5whr2mngbz0p6v2ubgftcyw9oduq9',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 'b3uc6vblfaqv0a6dvozr',
                scenario: 'l17vt3s7761li9c1ncslww5tme9fn0ufu2eaq02cqzby77e80gpstb2ylfmh',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 18:28:19',
                executionMonitoringStartAt: '2020-11-04 20:38:36',
                executionMonitoringEndAt: '2020-11-04 05:53:42',
                flowHash: 'b8kvs74gu36xrxsbvbcgh4lss062k3q3t656n7ps',
                flowParty: 'm5sl0dsimd2hqsvylq20z8zps7b10p9qucfd1aobhbixh724l5w86q8gww33wurr18vag1xqh3qx60en27nbjkpprm9jifh472i3ef9jgzttmnu3l66qlxdmxkw587si6o71wejwkm7a5yt5zi92lscy8r5oc3ba',
                flowReceiverParty: '763txd0hhn2ptw2dli6gkh6p9k0o60pr4nqscxgueadl8tdil12qv773h3wwj0axbkhv1qsl8csqm7k4ak8n55b8y94nz90hlais57inep483pgje9w10w284eb79uy0p1wpfexoiit1r5xyy8nwyst4kfkqwxmw',
                flowComponent: 'ilgf73akkr6u4eyx1ngskn74dbq5qwch8gk9tv1o3trmqutxflgm3rezbqm2jbf7g9k8ctp9bf3jsxb0s2902c9821uqul4zp519plce655qq9fexkxsor1bssb9833t7u98n2wafvp20e59oprtlnmyj8c58w98',
                flowReceiverComponent: 'xrziulrlkoe9ssihniamq2i2enh0zuqqdu7nkh3cyq6pl2i66e12kwsje551spdv42qqvlxh6h3jzs2f4ap3g7dgsd6lzjpwmzhuzmzh3szue16uuz85oe1xsur0v1n95rbet0elkf70le1jecyjnxhlj1aukv2q',
                flowInterfaceName: '5bsk9y4qc6z2tutypzad045bckv3ptrk9jrwfbdkm49ozxb24wwuwydn30a13tdwb4rz7aznz3ib6i8njwzp63mmpk0f3w3cxtnh6nnqvkla0pmu049dh8dt7ljisbptg9xe5a22eyhqf6079xb1j334uiffzm87',
                flowInterfaceNamespace: 'd2x76wkpg5rakrelw0ve6vvkmzlv1ollgf4e3zujy751gjb3uizeibo080hjbj4udijkc0biqly9wdv0g5v20v93wtq1yok2uxhzp17cgt6mz3gf9qnvsk66s6pofqpacejshlfwiz2qf5xm4h1fb2oozd4wupic',
                status: 'ERROR',
                refMessageId: 'zar7t0tjhb66qu8h3n59bgaow918e4up6wfp9j6i39wh0orjsgt7a3bnsqhtq11l49z3ypoxqmwbgv6awc7h9hq7c869r11mihbwba0xbdxqx390p3m7kgwl8gl1dcawpi5p56nzvglo53a8wbgov8rycg0m7sde',
                detail: 'Qui alias nemo et placeat. Rem quis eos voluptates et expedita voluptas reprehenderit incidunt. Ut veniam dignissimos ratione dolorem quisquam molestiae alias nisi temporibus. Officiis molestiae quo est dolorum sint nobis sint vel.',
                example: 'kpfon4mo8xbyur9in7h0rm4s4m2by2k0gjmjahb6k0y2ricdtewjb22brohfepqdk7an68qtxsm0mowvyqjpanbqnvsj4krvgs5nx2vxt6j8i21kzstc1946731e93gsyqcj6hrhds2vvrs75bv852xm7tvbh1ry2',
                startTimeAt: '2020-11-04 00:54:27',
                direction: 'OUTBOUND',
                errorCategory: 'xztv1xy4kbdh1esopd40cfxnlw2tlb2660mxpk7qertd32002i3xja7ulrpl3z88be3yzn7zytoq0kfgh7knm97hot30sta9magmeewvhaq76vxsn3i9brhs4b2imyk3n5kismlos05es1ohraz2pyncg9ta0bcj',
                errorCode: 'feym4jorxkr4o8unmtlt49jy2ndb33tq72dz7uelq9nd6ekvqr',
                errorLabel: 590453,
                node: 1989843582,
                protocol: 'fewzzowyj64o37zfgd8m',
                qualityOfService: '6s1bt1h32ey8avd1v2sy',
                receiverParty: '92izprn4rw6rcnywdq2t2itjjvkbbigqzejiejyfg2orzj9uxl5v2b913ykt68ecdszvo7tc2f8ae9v3hvy4oacmp5hmjf13q5ylaj2y8zk82wi1jvx25mxbrth4k40bcpmv4qe1q42k6wv2zguz6dfe8osq0ym7',
                receiverComponent: 'vlgxtz97kdekucv4vmnz4oviorspmza2lbnyjzg5cvxbolc7c13ivb2gjsgt9jao9tvc0zcuct7rfic50eoy6hjvwjkzep2dihu740jlm1p714dni1let64ebml1m6okt2caz0ubbhyyq8vddwy2snycm0uxlq0z',
                receiverInterface: 'u6sq1r9tjkisur3v4qtiry19c7bqe41960lb5ppjz344knhtmhejmdrcjw2lff49902wqs5eigi0qkutvs3qj3txdfhri5sqy87sxrxwxjb2323g8tu33px2he6o91nyrrjtogkeldjoxo9b73at8p4eirj0z1ck',
                receiverInterfaceNamespace: '0d1jksds1tay765ofpk4h6ly8q3xde9iuzt176b7cx22tbydtgzs3773ujozjh6cs9ebw566y84pwf35d2bie9gp3v29o26ld6zwe580dfrlgwe0iqyo8cscpa08tki48y4qbh87e0awpv5ia3nn4dacmxxitpmv',
                retries: 5377113970,
                size: 6389353965,
                timesFailed: 8585873098,
                numberMax: 9677281675,
                numberDays: 5692005011,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExample is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailErrorCategory is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: 'm49fankn437g73xc10cbukxv6auqdopcbwxkdy1mk2mm4dseho',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: '9203jnm6wrbsinpkp2n6',
                scenario: 'w4fn8n6ms9a4ajq8ykgmu27pcaoczj0vfw9hzd14tytztm9nxo7cwoq9xi27',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 23:37:11',
                executionMonitoringStartAt: '2020-11-04 21:38:42',
                executionMonitoringEndAt: '2020-11-04 07:01:48',
                flowHash: '0afdhyfd2ojyb8td1ky1mffdj7fkblb1wmpbunf7',
                flowParty: 'f7lnod544zftikjopg3s45fp37fxsrufw1ofjzz8jbyanoyif4rxxonyoglmzc9o0l2r128gwx0axkab0s1j25hr0cbanvobbxeqzvmn593tbpus9i0dc00plhi7c0wosr9odcsagj9ozp5hmwxirgw3qx4uwp8s',
                flowReceiverParty: 'nd6plizd5uqvmwd0ovlmsjyxmfl073c3t046kit6r7udlj06zdg5h0x12yte3ls0szw1eu0uqc7vnmv90a8bvsj2jnw5o1qaus5uee0xuq41x4d70zf3pr6nq9q2glfygg5i8fufx8gkz14xcmbzg6miiz5q4j31',
                flowComponent: '61wdsab2m6ct4dt59vnzq5xh8qe85rzarfecbj1xuzwdgt83e1c71jfqxkmwz1oczsjxtyhs5dpvittpwkwak649f4jyujpraw5x901lak2ry354zgl94pgceog8oinhmesqo1vkjb73g5rb4zfz8vykpnr92uqu',
                flowReceiverComponent: 'pe9i6qnhv1abxqcty8k7n2tgaahl6vo7uc6nvcaz8r5w75nq6bklcvsb6oajt7ksijkj7d3pkqabajt2ab1qi3cqoxg32ir05bdc4td31v40ul0h1i36lzo7yhnskrxq8u4qpt4modybak5rzijgw471zvz3wkdw',
                flowInterfaceName: 'pf27e18f1yhciapfvg20hvbyet68su0m07yi4wsgt5ojtqwuxqh58hycl5pe1odosw4id022wzkyoluev3rz83ngnm9b6kiwnq2mlg8hqngdnm6ulw441dwb10j8sg3h013lplgcysp8obt4r28ymu2071oclq46',
                flowInterfaceNamespace: 'lacw10k1y8bm73r0qkdzzwu5k4fpzl0vi9n3jitu9z99mly9fj52kyqub59govkeawlrnkxoqz7j470lylkr82iahs4msh4jvs8pjkp6ov4qr2jup7lrcsr5u77rnl16lkvudebk0vjvq0an8suxhkeh4bx99c3g',
                status: 'SUCCESS',
                refMessageId: 'w6po5n6lubnw5c7tg39u53ferj7pc3mxcz16iqni23u354bvv139c8vpovjuftgj0ev66i196s02itfu28b1qjnowfwco9jr3yhy97knbv40w8bs3sj2rpyo52cwyyiopawmeozvduv4hqrtp1srvhz9s8ahr0io',
                detail: 'Qui quos aliquam. Et quas cupiditate pariatur provident corrupti. Rerum dolores aperiam cum. Quasi dolore libero quis quo exercitationem ratione quo. Omnis voluptatem assumenda officiis aut expedita excepturi. Dolore delectus non et.',
                example: '58401nnwcr8rjfrtt0bsiostfi9f4hoj4oab6qi1mks91e7houwvxbal2qdv11jgif4qxcy89m587tfsjy565qo0boih87fjln46u2pgm0w2m7kq1t5r4wfw3bpc8gmxqejdbuokn36kb1m88k9zhyi515c9y7nc',
                startTimeAt: '2020-11-04 08:38:41',
                direction: 'OUTBOUND',
                errorCategory: 'wx7qdet7n6heanfa8te0z47luj6iwq716tcq6okfuxw5h1js8mds3pahmaagfuiitx1xlfwqiz2wgonvo7em2854d5qs7gf80eijaj3eop13pssonkivxfm0hmiayhjm89zycktul2o35rzvqpdw7j7n2vfgpp0f7',
                errorCode: 'dx910pw110c56hw9ejwrn6nu11s00807xvb7f7es5co0wz9bd8',
                errorLabel: 385700,
                node: 9074839756,
                protocol: 'lgna6hjz5mgw8ok22pk7',
                qualityOfService: '2l8gx6qp6x4kxc22uyhp',
                receiverParty: 'ozhwv776gs4mnqf5lme7gycc4k2qj7x9u4vfbcex3o8geh3o03eww951fyoasa0pojs9stouyb5oo2l3e78eddj4zw4m6xybtyhr9inq0ns6feny2eyphyohi3mbx08erod4uvds75or2m15uk33itc1nkf5ra1x',
                receiverComponent: 'cj9w5j5ihs1bjabentphl0q2fekgtv94jlf711trsu6cevqzqdyiw61o7an3gbbne18qma1le3g2lfvis22f8uwjqnstazimiggkqbwpojdz5w9qlp7ko9pcscqjewv1han3op6wm59fydq4w3jniiynrnslgx7v',
                receiverInterface: '8il4abo4nsfafuvatpxkkdcx1d06dc799u91pyl6s660p20ub2cas325peg9nwjnjc1n2nsy7iyb82gn8mmly3crdj4ch5gcrfzlgcdi6fsgkope0cz4hj5ftqpzxcba1vdzjq473g0evv1vt92pb7qa5ha37dyt',
                receiverInterfaceNamespace: 'rf507cyydcyxt1c9xxze1r76oxg0kg2vspr4nenbear8m0557mdpukvlqy1vz612tcggg57goq1h2d5qqtt4sxdrrnnnrbkkkle5k1mk5xx4m0w1owhqu54m8qxc971tb9cmnoqogp1pj6tagrma47dwm4jnqe8m',
                retries: 3059911371,
                size: 5458036982,
                timesFailed: 1189494048,
                numberMax: 7135976730,
                numberDays: 6803136292,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorCategory is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailErrorCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: '2ywzlt8dwgnfcaxgprbfuw0evnq0o6hdwihguih69vo7cf9vbb',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 'b2sjl3kooiurs46tbdhh',
                scenario: 'lhkblxv13eytzt6axkt6qxzgm3ms8jbtu8qfgadvuyok5zpukrqwvz4ddhjw',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 13:46:16',
                executionMonitoringStartAt: '2020-11-04 16:34:22',
                executionMonitoringEndAt: '2020-11-04 16:24:26',
                flowHash: 'svrdj568kz7u8er9ugfpql01czc5lyg7o7hnufc2',
                flowParty: 'o9glsgtpbznm29ed8pyrzp366og2r4f07t01aozaz8zdaalyk3t5zu4r7kvoo94zotxm5gtpdptsql765gm2r7zq3ky0jhev2fqcrkodzbqi9afwzlwo48vq4s1qd8edndeojxj8x5qrppw1mq71vj3uc99iklg2',
                flowReceiverParty: 'dininl8bzo7sb9qz6irza0lrlilfxrhhk8mw8s94i6fl79hge2orzxs3qq77csrn8hopxdv1g3llth6f228a5npp9h0n9krieeijueeiqiy78awp9nfxjhw1fy7xfs805suqq4qspa8jonroqbsc3uyor1a0i5hy',
                flowComponent: 'n9x93wk3xwi48ww7i1z2mrz75n7q3clmj48soehns0fzh8owgoa09holvl0tgc5rtfkh7mxnse628f747htdi5yq7oa805z41d7u4v0kx47k4maobg49p4yqz14qkzfmw8f1qza58sfx2js3kf7xwyxzsw4p0mz2',
                flowReceiverComponent: 'rtpcvre95wb7id9bchw521g8cl4dujz33e7id3cewo1ffmg3dw73oxm19nm5qsdaf8261lsvol5glz2nijv31l6jaqmq60w0w4u23uczzcta4xsmzkk9cdbff3bqw77gg1ksdisyd3609pmyg1pjtm91e85sp1eg',
                flowInterfaceName: 'o2tubw9fe5y82ygv2cgw224ykfa964o8tf8siplhuy7q6z8qy8c0bz4epway9tx2zo843739tbz65pv8gyzrrg6pwauwfham03gef1me8ro8pofvvnryetdh66696upzrtts5enxfidu34prvfkk2fbrxra6sm5d',
                flowInterfaceNamespace: 'wmq7ws27li9lsr06c0d7qxmasb0wnnp999gtyyclt3f4jvhinifa7umfyj3smhoctv88tk4qfobossk9rllb1wr8x50cyi4eiopyjjpwx0gvgczguv8vlfunn4ph37iupeejxf20woqva3i7tcusmlvags7z39wb',
                status: 'DELIVERING',
                refMessageId: 'nkoorise0mbfpxvn0p0fowlm2cykf1a5jl8whmu5bluuq1z3g3q50we7hqjbedmhqyg9ewbge3yca9qpfefuhqttze2tw3ub4adryozp294mnu4o0mm86isrwkasyn9jzy0j54qjxhmsb954lvee6n4crbs66cvp',
                detail: 'Nisi beatae minima sunt ex necessitatibus aut. Eligendi ut voluptate quidem facere rem eos ut hic incidunt. Repellendus rerum corrupti tempore. Quisquam quia labore molestiae aut rem et aut et aspernatur.',
                example: 'osrp49ld73s1l04mq1q597f09mhh4qfzlmdd9g3vghzgtnrrltx4a4jkmkia3fbae7yimfy152n7c3bamxzqg0373kfeirxwnjgsh8qecae9v37kfv8jr2azlsbvthg5p5r6twhpbvgosujzazzo5334ll7fvdhk',
                startTimeAt: '2020-11-04 10:33:42',
                direction: 'INBOUND',
                errorCategory: '63o8x01ntk9om9e88vks2xp5ywll7hh35llruq2imis5qflwmy8hab55yj9dnjk9350tjaur9ft2iuoec355c1bi9c786grueuoxcd8cccn71h6l4d2axg20fmv683mcomof7di25pa1u35ux8yvhj31m8wt4bje',
                errorCode: 'ojqpfth3abbdyjivhraure403a9t5kzgp8t2p05yrugcf0t0fvt',
                errorLabel: 892200,
                node: 5757318267,
                protocol: '6ww3pv9mf2y2lzhc8fd8',
                qualityOfService: 'p9k7v90fesd08k1o542s',
                receiverParty: 'lp7shuqf8ra3ofndly2cuhgqxpon2tiinfcv3qv793y0vpm7ujq8ymc7ocmutexf8v2663rd92ne72tredspigdfple0pun66crfkq85nah5oo4bipsyqnjntqbg98l0tmmijw1nhqirysdrm4cj72qo3pcck8l2',
                receiverComponent: 'c57euwqoaxgseh3nr0zt33z8z0gv0jzxs4f6sxzmslad8nel51w4rb1k4bqyxn06humwrzllpb0r6244g3zxhysk6hzudivbfhm0evkyndpisado01uoc9z107rillggws24y5r61ef23gygz5n4qojlfz0w9x9t',
                receiverInterface: 'yjmr41x1q0gt4jou3534bj42xtk66p5u86c9pc5p5ztlgksllaw1n40zryg6bq1il1qld9vd9ybg8lqm07mhn87b12769agoohfcp64725tjyedrw6wj6oodoglypxyxuwz1n6qjkv056yw9ym4sguiuxzfsmseq',
                receiverInterfaceNamespace: 'c6yg6zrylp7d77ckn2ayy8apx6fhrzm3vhrqsxo3c6oi7mn1rdh92moajxg3wrokwn82wffw80g9p9phi3z1j6z5j3zzegahzwiwppufb9vfo4lrjodaieppe80b4b9md59n4pbmvx355cqil6tnlaynv48usww3',
                retries: 6791628223,
                size: 4236666142,
                timesFailed: 4004117740,
                numberMax: 8894544628,
                numberDays: 1399071657,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailErrorLabel is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: 'vq6mxvweymv5l8dihyr7szjurwnnjihncdt8sjriydeb5bc8ny',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: '5rxagkha0u1o1009md61',
                scenario: 'trdcpdvqb0eu4ljbjx4ffv8kxslmyd39l8hlma1zn3gqhrqllgufk4rtez7g',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 03:08:18',
                executionMonitoringStartAt: '2020-11-04 17:49:14',
                executionMonitoringEndAt: '2020-11-04 13:58:13',
                flowHash: 'z1rsoi5emghayj5a8j68cl1by55tljh4a5fzdmmm',
                flowParty: 'jtc5pwxpu5swbp91hkuddd0xw0hw58k3mqtib2jvoyqwglxltd1fnojlfhewmzsapadvuoalbj1kl35ern7nxys04harjrh25ncxbvr1wdiz2thahxyxlwlf8djawoi1f5k87lde8q89u34eahqbj9yws6oq0u0w',
                flowReceiverParty: 'pkqpp671yirrx1ee06ks58f9vkect8of73ij5xb5o89ywoauswir1fbkz4w3g5wpopl3y2swmjr75fvsg3j0rb5oqu7ooxgh5o1n4bm2koztmh1rqjuodl113o8msla648ccancxfdm88h3u6190dua07jsigjqa',
                flowComponent: 'svljmhlltrwv61fmcnq3tffoju3cfqsu8i8v8ydcum8ikxgmwdlh64defetdmpyc7dcz0wnbntu9e34ure5w3halk4faluz2rwrd91a9hboaxfmwji6x79yhdpadcyqxjg2i64ljs3kndu8c0lcsvylj75blw2sd',
                flowReceiverComponent: 'avlt4lnnabisfpkzw9u7f1irdwpjfir1snqgygxegq5o1xztu27cdj2bz8axpgccl0o07nivggqvlfm4iyw3cik73l4py3pg63w0yrxsxhkumc7fjadfud1fsdj1scmz47mlc6cdetes1oxlotucom6ierrjfpq2',
                flowInterfaceName: 'hgx9b09tj73fswi8p9rcwqqqkjy7wa4ell015ayanwy1pyb5a34r5cuhbfngbzyf3gudj6un1l1n0omvtzmospj0l51gfegmnp1ml6usyv88qreuvplozhuri8fxu9fn9rf7dp4rif0vs5cipmrv0q7m0agoo7jg',
                flowInterfaceNamespace: 'ygqlimy00kax1l55c9kny9ouspriuplo3xutg7griexgymmycu1so0filska8j6l4cdvajze3baqjwfgtqosicplolctm1ymu1hqp664d3bi8x8zn7xnvke8ngayu1g9slvp5tsi81x7iats0dkb5y0jk9ahno75',
                status: 'HOLDING',
                refMessageId: 'lcgjjdv781dgn8wkceznasuzeo9jdypiygayz5x5s5qvf70lu0c8l9q58iim6oxrpl8kypkvdp8vbs8rw3q7a3ebs4epmat1p55zrmv4z6hz7wklaqgcwigpxy5mfovmr7w5q9ssjd0m5gq0nc2jlobkrflcyns1',
                detail: 'Nesciunt dolorum voluptatibus. Labore nihil rem maxime et. Iure dolorem repellat ut magnam tempore vel.',
                example: 'nfzsbyj6glio8qj3glzkqk1totcg432ht1zvbf8imbc4wqubtctodaan9k42zhowdwhuv4jokpb3hwwhbtpn7jlvqk188bt10zqh8qucg93mhwoooqy3bxt0ptdw23lfbcbbe7aybhbaup0v5gmwxpbnz34aqswr',
                startTimeAt: '2020-11-04 11:08:17',
                direction: 'INBOUND',
                errorCategory: 'w6r7rzccsvyxhgf1w38owr81pecy7p17s7bkmn7mk7twlpjrgz3ksxoinbh3i6uhnyygfesq6sq0ixsv3os2a673otu1htaornghrre7in46ktkfre37c0e69s2wtdjhi8mrvx800dygwl4l3ryy584trdc4c8cx',
                errorCode: 'qg3nwsnipk2zp1m7381ygq21hnjdzh38fudrys5nil4l56d9i6',
                errorLabel: 4341231,
                node: 9711072171,
                protocol: 'z4p3tgk1b7mkub105i5w',
                qualityOfService: '1pscrff0tmksohcr1ha0',
                receiverParty: 'ftllxppri1z4u563cklblbivoc3smgrhm5sjhpt9609bxhclir9opq6ahwgroj5qt6xyhxjvmnw6p3ng0guey2n49uefkw06jmrpq3g33bym5iic27m2ex6teschjqtxassaa82kc0ojykmuehe0m0ejcrymwoa4',
                receiverComponent: 'lhgqjf7xnimj3x3iqvfor5zzz0xgjh0c29lyj5qf1rbxukfmik18g01fsogcqgs1zglbka1qu7zjd013qook8ievl50ja6mbiykee1ytg0tuth4ujqmhk46vwsoo5x2nzk7wjmxi9qv3jnqrwudzny92qpqpqz3q',
                receiverInterface: 'i5ph6mbye8a3kpimm4ijc88urz8ev5qcfohss74b04v9chm6n4r2hlxqt1nx9vfxy7hwczuvq0im07zstmrxnvhbktwo5ovolq2b34aiwnl4xg334lgm2ffqoqxuqahrzkm2rdfb8upv19pex7faad0go35pbp7c',
                receiverInterfaceNamespace: 'h9zrw3fqb35ovugvlhbklg714t3tvvk0n793garnx84ea6ng2gjgljmra7f498o8ul97vglz26nhq31wtck20i4bcyf7cb5xrwqbxhns8hj41q5gyv5y8v95d4fxvwtvr4nduuj5c5pqchte7n8r4bpdy7pcuoiy',
                retries: 2849738895,
                size: 5718989782,
                timesFailed: 9305964867,
                numberMax: 5279648029,
                numberDays: 2478350728,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorLabel is too large, has a maximum length of 6');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailNode is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: 'fgbijj8jmfjzjwrgh9u4qoujdodbibmqme17l4h3925das269o',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 'vpdfn2drei5qtya5d620',
                scenario: 'ek9lkdoko5ek5didvs5txs1l7iwptf16l952c4ezednp58lc2cble49z371v',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 07:16:14',
                executionMonitoringStartAt: '2020-11-04 01:07:17',
                executionMonitoringEndAt: '2020-11-04 01:43:57',
                flowHash: 'xe6xhc9e5a1i8r0dvuyoxo3c1gsrqb0gycdiyju5',
                flowParty: 'hgbnab7qzqbi2bymppvz2lqwf7y7sdwooomndvom9s9oo9lfebcswmb8o0fa6kjxnlp1lk06oqhp5v2tjd7cvenwkrxgqxx4po9aq1j8dn36dadvvsj5t47z5m2ee65qj1bziiuh4l97wden6rp3cwkcji6gvlmu',
                flowReceiverParty: 'bcur5yz938p7v2vfs5n75vfgks65lxucuridprdlg3t63iwwpwv1b5r5426nxu4ec42s9nz140n2nihve054jlfgr8eh4vryxxt5lgsd57agol89d35awb6oolb6enn1ht1r1st7lgoilsq290wxfxp6vf41lahm',
                flowComponent: '9f85jjjq6tcnoo3xuv7hxeiz4xnbgqgfaj9aytojq63dkxflayqzb58vyhakdkgpye31bklz0fkkqprocwf63e9l5vqrb6ggo1kksbbsw644l03kuawtvbvrz2z2qdubso8vx0rm56kgw7qo5dmfw092kiu4cjhv',
                flowReceiverComponent: 'pc20qqzad3hfuek9qeavqs36g2lix560hbg51eho2g6iigl74s90w5abai00fckm7r4a5c1t5xhwdh2gfyd2yvnegoqpl0m266qukezpqjhf5z0wmn2gxnad4aryghshp82ckl4v7h0xm0lainnod8v66v4wqhnt',
                flowInterfaceName: 'vag8dg5d458qc3vdcn6es07p9ui5x5kxpqxm5y77irlsx35wuah3hco8jn4ikvd6zw4izdocconr6xybkacsknor9qwbamxwlqk6gmfrd574f31awbyxy35r3dnrxfmq06u6cy5pw88jtt4qb9h8j0mhos4lugdl',
                flowInterfaceNamespace: '7gkq59kh262qzs1pw6py7vgn154z9ka1te6y7y6sxmt676yvwqfd1wq6bb4ahrd1q4oy3qqbzm3i46sz8dnhwzfdttwxhiuu1opqjasfxfvg5uet3uqys2rq7utcl6qwhud544c0in47921ciu5ciu81ue7p8iql',
                status: 'SUCCESS',
                refMessageId: 'bhdczvu6695zv2iul86vcipa2dkg1dhlliokvfelnoia3cp6f5ovf63l176ro67qcsktextijoumztky6ky3t96dk9b7c127uti83s0mux93xqm98cmkqm6nvwlayxcyardfqmuqtmecmfw9241sgol2994snu10',
                detail: 'Et sint ut similique deleniti nihil dolore. Mollitia quia dolor deleniti voluptates aut nisi. Eos temporibus non sint soluta aut.',
                example: 'si3pkv85y03py7t06ekrslh3uzci36ohru7bzc0hrk005riac6smtv7wxjtdqlohos0pp1idvc84opnqg2a5995r78xiwqwmf9khojcx1d8dy2m1gsv20trjq99zg8zyl8z6tk9kewu85g2wngciry6fkxe63r3k',
                startTimeAt: '2020-11-04 11:18:08',
                direction: 'OUTBOUND',
                errorCategory: 'rd6ix3gx12qaifs6de018xexjcdy1apcf1ojd0evyj1wr5khls1qjc6ats4a9n05sdz0f4g5nvyq27xlfrxa34k807z4dishz9c1veynlk88z4of9j577uayyfx037w49iq5dyl28z3j6yzc2brpnzepduzww24i',
                errorCode: 'pirs2yzp6xhituw39yftjqvzd97jtkg3gadmjjt6u4rt7tw18i',
                errorLabel: 210226,
                node: 89410139387,
                protocol: 'w8sc62yunsjs2ovjgzox',
                qualityOfService: '32ps961v9us17h8zmjj6',
                receiverParty: 'p9hbmef4fjz0kevsuon6vf9ddzd0p2sm9b8ldiy14wkc6086619i08ek0v3f7w0854tfd4tues8kgnqykxd7sj7bq6i5pojehzfl4as33584tiikqa3oee3npi7839hksy3s81we2t1njlu0zm2x8f1fq9szfgyn',
                receiverComponent: 'ph02zx1mg5rz0njp5brks2e5r6rxh4psw5ho5fkfz3ymfa6fcnq60lw8q989i8ugnpac2u862nrsv0x2zkisqp0ds4rdverm1fnyoa2i4yhalyz5dvs8ohbp2429unma48hfuk762768vju8br6rpiwlw5w2orsy',
                receiverInterface: 's3isukf511ysq8w4eqn0qemm4f2vza0d28zrbp51fxyya2suqg0mydu1yzuy7vzb2y2m9c8kzez9fv3c71b6c5wmbph69ynkpm3vhr2nmlf4w6io95fnm7ii6ugwd6kcdjkbkvpd6qzpj8ttaskfwql22bn2kstm',
                receiverInterfaceNamespace: '9ds4b0gj4g7z6d6edx49gmnzrwld99xbfxugkccb1jrqq29h4nam95m8t0rvgnalhupw4n534mtrvhzwgpf0h8bwevahgug08kpf7pfm4gb6jyv3me79ocszt0wymau1sndqhbbjizz5wzutaviya61dro70as7j',
                retries: 4106630667,
                size: 8916990889,
                timesFailed: 6753837340,
                numberMax: 4687858401,
                numberDays: 4026808086,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailNode is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailProtocol is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: 'goi06osnnlbem4j8knsblquawogp4v1nyy3rh72ag58aq4s9qj',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 'majpvxqj76ntyjbuf6md',
                scenario: 'wst4mngar36ee3uc876bgwik36yl2lc9qcurqklhuddtu1lfvpvvkmmh06cu',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 23:44:15',
                executionMonitoringStartAt: '2020-11-03 23:53:34',
                executionMonitoringEndAt: '2020-11-04 22:31:21',
                flowHash: 'zzewg7jv9jxnjpgy752esxenwm6c4x8eynctovfb',
                flowParty: 'aze1xl4sozy5xg1192v21o4dhxodnd9e88ck7kps4il875e4hsie5nj0edvy2naajpat7iyo7fgidkhqclb7zq4dfxbx4crep4u1i0krvz2z64u8gmsmf61rtrh67a15h2yuhm31iskmjo4xvku8e0v7a7o3mej4',
                flowReceiverParty: 'lshpmmo775xdddl2exsvl3tx4awkz8jp753kb8xp6p630cnzxtdhh6uee4pomn7ck40m7d4od1qd7po09tf1n79d02h1o58uaukxsq72hp7roqvht7z4jmp5h2semggxsv59sys85vf6hxtfo1gl3fdpu9yxp3fb',
                flowComponent: '2m5wgr36osrdx71hjrbzo905yxa7gcg6ob33h876387p1lvmpajmmhhzr4ekoj5x3g0sdybw8fky59pz1s7x9a458wl4khwoodgr838iw21wjs2keh1tmagxekp9mt1b58ddj3x0ju95guxqmob3la7u5t4hpqlk',
                flowReceiverComponent: '3r86rwc6mopnaiuof7k1gj5qf8inwgycuy7wrw0yas6sfckyxr2b5qev1rx62ppkuczldk5sp3njm3cmo5bpwfknkgskim3afslwlxthc5zxgwalu7wikhqgnn2owu2kyuxi99o2fd6cl356s9fkcl0rwj90djsg',
                flowInterfaceName: 'x6ywoos2x2b9gefqz3n5nx4une407mix2e7y4tyljo308iu7h2th1opkteuv8qej2aq3mi4z4v4q544zjslancimz9wgzgzcf6by2wf7k0795s4gpn5pttnixox5kadf97tuh7bf2mca1dts2vxgcl7f8fy9mtty',
                flowInterfaceNamespace: '4gj6lpamfwb8tn1yg3qgb48gilbety1dgdatrhff6o8ty5yogwq3uy3wvdjoveh8l2xzlhv5buvr3hvupa0w0i9v7tfk60evadkw5ll93nyag9kxxc4gunxxu0t718rstpbxvojcx6szodlewl22srwwkyhdpqon',
                status: 'TO_BE_DELIVERED',
                refMessageId: 'x2fh95zc50rhxjup7ryoxajun3dhm7yfwux62sxaatijpyojscii32iwpj48k8w06jb0sfm4eycsarb9v0wlmg4ywfwu3buojc2b9pa0beqa4wqb5qe18f3as5g8vmmdk4etq9ea6zlws1pevi7zgm08hzhgdp52',
                detail: 'Aperiam quaerat qui autem. Doloribus et quam incidunt totam fugit. Quis nobis harum eius harum tenetur rerum.',
                example: 'ihjpn7fzwfduuxpec5udyr26t2cm2pu13ofyrrq3s7fw7ffoxm2saqcd9sfoea2iwfvwn30j9x7sr03igdz33f78u6nyo9jc7v2y7n7g1eslj8770q6mb9ftvai340mbzos76i02ip5p7cvuen9u0o4v50lehwfe',
                startTimeAt: '2020-11-04 17:14:56',
                direction: 'OUTBOUND',
                errorCategory: 'o18kz0sfekakwzv2f6q3wu59993jk4h44zxm98ogj9kyi5esuhzaa9jmd2tcrai6et9lcvg3v08a39voci3frfwi07tbhu8gaep9nxkmetury1ok7vfjmuy4jauda3a5tjla56bl01khy5virwdmvoymmo6pd1ux',
                errorCode: 'kvcoqe8tkd7rxs61g04rwjkfgy7jf8pwnly0cvtk8gkm3xit5n',
                errorLabel: 587453,
                node: 3336675278,
                protocol: 'o3dnfp2y4ljzwwqb5gumc',
                qualityOfService: 'j6fd3js2ywgxh7f2856v',
                receiverParty: 'zuzt77cao1tyfwtbav8soptyg2z6bo7n8h9jgogwhk9z60xbh4w7l97blr0hh2exj5czyc46mk8b5oc9jo3r3uw7khf2s9dsyl8jr6evy3z3ayvumm3lovfnhm1doccopanh53ehqujh2r1cx54jc5524s5xahlz',
                receiverComponent: 'ys2815i48c5pk6k6t5hxvyz9wxyltjx4vs3nfgebh1b7hyaljetluwb4dvjfpv9m1ttxvudt9xvbzcfn555n90qiub2kix2oi0e9iw49puj9l8ogeu8ykowki2uqtulj6iv8rsn1w2z0a7q8fqe2ppbp70rei89u',
                receiverInterface: 'ely35417v7lvw073zs63sphd48pn6y28h1wszlaxq5iqewanyg7ps6srmom8wyhdrgst47vs6m5lxu3lg3m3eimke6auw6z4cox84x9a7pz41wb1i0cpgii76zul5us62dpsewdi7uxhwgrdiq9djb26e7jykdqv',
                receiverInterfaceNamespace: '62stnvxfyu1q9ak72kbmf6gla2gttdbbac8s2bfhq1xct5xqpg7xj4q3f4atr8b03fjx8nje1t5emgw8qhxy025nq5uoej1win2dd01tc2301a23hnx1irc8wlijgpv67g6a0g1b09mp70mphqpccnt61tro1vel',
                retries: 5962318713,
                size: 3836952760,
                timesFailed: 4605502316,
                numberMax: 1447541839,
                numberDays: 8708478479,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailProtocol is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailQualityOfService is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: 'bi5cp7bostpsdv0y054jnyc2d4szdnzvnofco28v5j6s9cy5k0',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: '02h3l4kq3qwsgjtnqgwx',
                scenario: '6pvaplaaxw9ymtrus7kaxmyrq0xfo2i9xcaqn4im51klr4wlh3b0v973mxow',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 07:18:31',
                executionMonitoringStartAt: '2020-11-04 07:12:32',
                executionMonitoringEndAt: '2020-11-04 08:45:58',
                flowHash: 'ergatdnzs2r3bxtdboszp5izdqt1w11ok7qtshyw',
                flowParty: 'iwiyrej9db05k78bswrptvtb7ypaysvw5b4jjsbdu7ogguyjt4rprl6wkxq57w84od4gswqvujcjfmois8o8s4mp60nybgvfk6xiryy4yrb8vbyn1l3cby6cpftvuodtp57qjlya3dsnkj950ocwlaw85pcs7u9v',
                flowReceiverParty: 'bp58qs97v553ynbdq2t5dz1tfu8kb4bm4v6vbq84vgsx55dxk8lnmpdjjq2htk17ip7wve1c3e3sw2y5tbnzo8hg8pv399r303kp93vmuxf0mvk4e9biak5lx9v547mzok70ihotu9nrqf14mzemhbh640u2qwsf',
                flowComponent: 'nvjesnrnwzldy3xfm90qmkclsfnuxjd3ep2l7vccrx31rhorv25yaktxb0cew34wodolpv0i2fqg7ulrrg9z3yjs04tln7ryc8j53pvfdknf9xqyx6h1i6utqs3ptys5l81wzqgjx7vhlhny2zqr1evb1cs2pfmf',
                flowReceiverComponent: '8rqp2rxctxte8202v2x8baq9idvtwvralff67ypi0x6p0djtn8ouu5hyl8witbuj7abhpenokmad6c2p9i9zgbhgxk32dctqgep1lt98c46av8z12ewn6t0n6abd3ldf6cfi1rhquvtfrbf4x337w5p02w05aekl',
                flowInterfaceName: 'uqd2g5rv6ljnvwdevx1kkrpapabjz9b0xo5pfht2vmv3dodav35rhhjavheh26vkw28qq4ulw1p5chb6vtqa7i1o5dmssapbgeeph9f3fu5ycku23k9tdx7mn5sh7xo0wx2r74dp3zvj14boa1l0zt8p6u69trrf',
                flowInterfaceNamespace: 'weisionrlndiq8gcgsohlpogjzmkbhm9y1w6e9g771yw8efknvnnxjxfnw07mxsbqwjh3d9oqczw72u5thwoedyjdxvt02dvhqb09pqmrb08dospe1i9ptwnbfccvjeyxz9hw3yua4q1rlk3seqsi34205hl7jxc',
                status: 'DELIVERING',
                refMessageId: 'lqrc3rfts6ewfx4sv92mairch8dhv0x1lep8mgyf4cf1j4et9k4xq19l1v2fv5xyqj0mp2ssl8fo6zmxrx3e0urbmg25b1cmv5ujyfbiy9ayos04l5avt7z0t33thllsa0jr2x5v5m06ucr17dgskxorzbqkw3w3',
                detail: 'Maxime quia rerum neque. Sit voluptatem vel quisquam aut voluptas. Et non quam.',
                example: 'mw4hezj66athicpnkmda83djxrokjvl7l8z7yskwq5pz5mg7qj69utr8vhjvbwxzlh60qyfxp8mxy6wpeunip3a2ndzrbvtm5kwcaih0ueg3nkdwk8ciosd449e66hxz6tf9blgh8ynots883okefr3uwvfvomaq',
                startTimeAt: '2020-11-04 21:29:54',
                direction: 'OUTBOUND',
                errorCategory: 'quio4jwbzex88bavzj5whrkz28bp3387ixigc6quvsod7ir479vwlv4m53aw24ufybde8oxuqpn1rlzvqnh6ndq0soxylqienqzczzc3usgpsb0e29zbjyuectbo9ayoapvqgmjuart49agupf5r992xou02qddw',
                errorCode: 'g5syx3ilkg3utj7zo0vop51f9qo656u6vbj3w7jvq825g4wrxk',
                errorLabel: 850244,
                node: 9324787737,
                protocol: 'adnjpfrago0na7lna0e6',
                qualityOfService: 'l8bsl221qd9hpoe7in545',
                receiverParty: 'nhcspva43byv6lx8rtzwyqderooh3zhhk36zxkcmoa9f0cnkdht5plg9g5naj61mkzifnakbulyrov4qtat953mgvtz80a60dlc7ajlldpxrxetedoulor6j9yblfqa7um1ao0arjh7rr79von2buaseowz7cx57',
                receiverComponent: '59e4bdu02ig2ndljithpc6yg1ecv65tta3b1fl63tsi6k3x8jkm91rolafu7cl3osfnuiigc7g8l2a76aalwf3b7bygbapk1dr7sbdn5gv2k3vvg09kgym0gyg156ro21a6bavd0v4uxxr5v5mf6i9iweryd1sqp',
                receiverInterface: 'vo0j1jnjb21w5e3ic1h5j8213alpivwtt1k0s8kn329oyp9n936xqh41quzvj2a01nflyd8cz9zqam7l31xj8snsbxl4sqe7qpr583okj8xsl8gpdj1t0m3q4i9wmo1ezpv8dh3qy42qmxfgbabmec8iq24viscq',
                receiverInterfaceNamespace: 'hnjaj5927j4l4u5x3m54bxgyme3s6n7k2gddclmbbpi0wa0zm9cm0y7pd3hkntl98i788tmywr6yunysvygrazt59ucx2k5rl4a3duhhyitu68p7j5ed9wflmt1efmil8cm901slrhxs6slm5lbbev9ldkrrzplv',
                retries: 6263971096,
                size: 3352608692,
                timesFailed: 2874677293,
                numberMax: 4056193849,
                numberDays: 3182576095,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailQualityOfService is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailReceiverParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: 'j2n7tvynbtjo5j6xksd4rltrxemuj8giilhwrwgl1d1cnb5r29',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 'rx99a76duxth6d2ggqdn',
                scenario: 'za0aumm0dchxczlnx52ih7tftqgfoargabd61mtil1jytujs29ijsxzxxhf8',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 03:56:50',
                executionMonitoringStartAt: '2020-11-03 23:44:27',
                executionMonitoringEndAt: '2020-11-04 22:07:55',
                flowHash: '2gs1ick2ojkdtzjt6y3pkzor41h7ml71c7tsx7cn',
                flowParty: 's7jon47chuplugwkblu72chf6orllfol6fleu18fw09jwtdjjupgxwlas7p9lpn4urw0hlnx5i48gzfxgr7a122mmvwshzj0vwx0pvmunewg9basn4v0fm3kgqft64lzetr5ajtkk27k9xst9yhgx7vjhkavrda8',
                flowReceiverParty: '1tvt8k1t2avm5h3f4kwu9vbn6zik4vc577nt19iijhfaa3sz2ff7lxrffre713q47psvlwlqxehejh27b94h9pjrntg8juzx34jklg2swq8abib6f9rc0nlc7xldmefu18yyjhm0xzbe4xvt0p2l0a144gnnnwlo',
                flowComponent: 'uhka8oykph6jnqivhzd7dp0oxumtlgtehzvtao50gl2eqo7lokny28cbw2drubdgmm7tpsfghmvwchmklc2894emih1zmfboim63p2ldsqzkkfr9oj0j0en4esw5sz48yvd5kfkw2biuxf05jjvp9ioywp5s7m5z',
                flowReceiverComponent: 'blj8pi23du3vjsw1ci0g2iw3tron75narvt1no75w6em2l2ao3y6jun3hk5oqcceotloiukbl7jrqtzn228orjw5p160l4647hk1ivaugh7pub6wnmcejbuvhrsgretajpzv2mvmapvwcu8ssk4p0virkw1eiji4',
                flowInterfaceName: 'ztdpjxyxj25m12lyhudfxxlp29quyul7dzq4mw9x81olvp6lhu84hyrrgvdsai6fnzskdacytelfjh10c2nfdv4p89ch1760pnlscvjno9poxi5khk5x64wlpvsgria1e5v49hefvexe48z13ge1rpjd9ss7isr7',
                flowInterfaceNamespace: 'btmb0cut92w5n5nace1p3e4c7cxt48ndfotpjiyhpwss4quyiv9w5rt3dp7zbkipdbie0q8v8exqr4cwo6pcv6xprwqyerfo2prac31y3aieawqj2ylltg8y83lhycur6rrr1lrxdvop3q7ifalixdv48p6v2zx0',
                status: 'CANCELLED',
                refMessageId: 'uwa59a3n3x8sa9p6i5wtiqjy7d7oh36cjdr7ihp7afxqevtac2h9az553vvqkfs2761n3wglomel46s9pbdmuu6s8dwpjdy7ov9mh0nbcn6epava6iqm7tsqgh3cum1bkphfiyxt1mg8w8jr2jt9mck8swyuxcj5',
                detail: 'Voluptate molestiae a inventore similique eaque accusamus nostrum deleniti. Est laborum facilis esse dolor aspernatur ab est accusantium natus. Recusandae perferendis aperiam dolorem. Et maiores aut rem sapiente impedit. Sed est aspernatur molestiae velit vitae rerum atque vel. Architecto et consectetur.',
                example: 'h81oftd8sa7m0snb0tzbbt4601k59y6y24k3ep6kttqopv8r4efwy5nwbqkzq9ue8mtynld93c1d5nsupb1iyd8ed37rh7z62sljyjkwntc291ubi6cpxpdhwxf06sget8clzta8jhssf3ncwrivx5jod15xj8l0',
                startTimeAt: '2020-11-04 19:13:33',
                direction: 'OUTBOUND',
                errorCategory: '4o3j32732s5yy84ifpea1njg7q0kd7ipmbp0nq5rnb3qe0j10f6evk9etgll5cyfr2036lorvw2hqdwcd42f09713u0a83y7t14vup47k9sd2z4yuxv0iaf295v66c2q6im4ibsxa4kqeyy96vb8rjnq51wz3i3o',
                errorCode: 'citsw8bngrgoanw1syo8keziscd15kfqnwgv1ljlkkq1p88348',
                errorLabel: 175846,
                node: 7923047509,
                protocol: '7nvyqzcibd50yl14unwl',
                qualityOfService: '6ezwck3tb2wkjvmtrdtk',
                receiverParty: 'av128eumiwzpd01to3iir5lxq0qckforq0yw4gxrl9vima0cp915iltawr0bpr8nu16b3cbd7jj4k0uv5b0upjdwgr044r6amkq1kn4xi5erwjzt68sa7eh6jip6d44cmzt7k2x9dwnhue8lqmdr7ummoc1gbx46l',
                receiverComponent: 'ykuie73b259dzn7dzipet3ihyze28r4u5coi2l8ifynhb5bl8sscxdbtk6x41232c358hpq4rftxkj0q9nwp6bipohrun3p7pkxuys0yzemboojrm1v9wmra6y0iwkrm2pfg9prld2mpymjmj37vsuoqpk902kd9',
                receiverInterface: 'nhltd8uklf5qt2bdo00v2ko388wp10buix6qkhrgkb42a9r3pttmlw775099ffmn107xnvgpxqv39c2u9q2dfx7nql4f60ad40wipmu8lzagifnatkdd2pvobufvwkuigux9p6jvs5je7si1l9a2hl4qi6o9puhq',
                receiverInterfaceNamespace: 'ghw6fezqj1t8y7qrpwhs2znrhf1a0lnf3l4fa81tvk0l9bxtfbhr6am75bjeahr2islfjpkgxty4l7logbqdtmnyg4bk6jwamc7s8q4frvrnimmu2esi4wmoxg8rf42cq86ial39akezvw4vifkvmfceaguadrjt',
                retries: 8673468517,
                size: 9432850061,
                timesFailed: 2726911325,
                numberMax: 6212008788,
                numberDays: 9193632803,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailReceiverComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: '2arbflrc3y03bomkxfarfnls1wz03pojavbdin46ffgcfcdf0m',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 'i5fune1mhototof5a5bp',
                scenario: 'shcx39pyl6dmtg130065xbt99fkshhlj8x4s0dkd6fflsakjjbwmck72z6t7',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 21:29:59',
                executionMonitoringStartAt: '2020-11-04 09:14:47',
                executionMonitoringEndAt: '2020-11-04 21:26:24',
                flowHash: 'yuzijtzl2ekilxyl84p7uer9iyebc8x4znul8b5i',
                flowParty: 'b5yyznkm0zez3o3u0pbcp4jdziqtv8vhfwe0tb3084pxxcxmi57l7pwqixysm3z1yjhg4hduni1nzsim3s30bjg9m0w7rd5t98bd5qlz39ntzxlz2qg90bht3rxzhpmldckff57211sbhds5hictqjzoqlu8oni9',
                flowReceiverParty: '38c1acncrxxs1tajp6bvf15b4w2zw6x4va3qblx20yqwfnie0xct6ki5imk1o5bkte592ucdmhd2yt2rso73kct38vmhi7g8kwp0psz86pgmdlq4xnrcm9mx0m8f37uqiqjmar0c54mo57fina41ahqjdqmnjs0v',
                flowComponent: '5m3df6laxwqmp55gm20i5c1cd2dpb9mkqczc5thyk6shw4l7gvuhjfe6b95gqz0evnbifd3vuz4idtj2vqvmn5qj4vwjyvdecmah5fsh5at951i683d31xq9t4j7abq6rnnn0ze968l8h2f5xsyy2y6c0yx9njw4',
                flowReceiverComponent: 'rjowvzj2dy9c0ipcxrgti5uhdswnj170ejwvftbasu27fxuy3otkckk86ucvatfcx97ytbrvi0g98nya0rupd37gnkufnsky4wqifn4ytitbedztgcis8dluer6t2e5wsm8jcgyq9jimybljhxyoe4opeabg1ra4',
                flowInterfaceName: 'zia6hpkxhm360j45u1ujqy8ra6jh814n307bqhhr7kt5epgzxfo59sf6d0ytvghrvvar904w20blk0kjiqqx9npi88z34euu51qqijliydop67l3rmhyqe7fit7buc8azawbz10o1guwgh9au08gndenn7r4756m',
                flowInterfaceNamespace: 'bqul9gxet8zl7h6inl5ldu7t8ins6a5aopczs64kytsdyu65w65l5yt90i369t637berzpldg7yaiel9lmfa3ju10eozp8wi7fbplo580jb1pcl5qkmf7r75zrcc5w71v4bblzybwhmbo3qdb1dsk6qbwplcb9pq',
                status: 'SUCCESS',
                refMessageId: 'qlq4ncvp55qxc5gnc0ighzm5akuw34wg9m5cwmgmtwmers6e7wv6282ckxls33sbejbaa1jyau8luwewzyx41afuh1jg7ruxyov534x36xk8lfmmla75jkjeirbjm18l30n6lykwntaxc9wdv40ppquj1ow6tlv1',
                detail: 'Rerum est labore earum maxime quisquam quas. Dicta sed doloremque beatae. Porro illo et enim temporibus deserunt. Quibusdam at unde et assumenda vitae ut accusantium ipsam. Facere voluptatibus saepe modi. Ut mollitia saepe.',
                example: 'a6u28u0ahjz0sk841rjuzyfxv6nczuc0k4j5k3ji2ifdflnjbdcs2z6uoys0l9yt8qaunz4jl9ddwnnx3y7d1z94jza0tstvn04j8stq2oll4fx61recv6wjq3uajlki56xr0sroc1qbgz6giqov13ztth7bys6z',
                startTimeAt: '2020-11-04 10:42:05',
                direction: 'OUTBOUND',
                errorCategory: 'st5m5fx6i7id11gb5mm8o48a8li3ymi2vbbojckyl5i7rvu3mwtc1euq4frcr71me7qw0go4kimxdezupmbptm0t5qdeq53bb594m8hv2fww1qabjn0niilio6zk28tqglij00sk08f9q2jonwfsjkiydbd1xve2',
                errorCode: 'acuq6veez5ynx6yivuf7r8n36jnexxoxp36hz630b4mhqfrbjy',
                errorLabel: 189272,
                node: 1079925486,
                protocol: 'jti6vqqr4p7wz7u9v4iz',
                qualityOfService: 'f406fd2eryrqxcha8y1o',
                receiverParty: 'faunkpavusnrrpo6nszlmm4vsql18dsn91dj5c1xb8l2lqb2v8ouksnej5h5k0yklhqdhfboz4lm2b2lnid373s0eikgecm8k885ypmhdn6jl3bnjurf1o554iscusnaewstzrqs979f42x36ryqgtcaqp7kr8ew',
                receiverComponent: 'jf2s0qbyrv2qflx3xcrwac4v7d8gikln9mwquagjnwv3p2b5tiw3c438f5neptilzls7z4xk6kxljdbuc563elhgfcrfcsu6dis0sib3aftyozai1ql1c6v2restqbx00rk32j3nvj0m1ea6mqg3bletqn6h1uaa9',
                receiverInterface: 'ejmbmbj0fs6j9im8thewp1hdnjkcbavwerrnqex81aczmaotjs2jzxhaz3nygrfv1y7o7pbu6c4tlavefezo8x3yh436z2bmuks6cm56pu3b9t2hmya0mj7m1ckkpjullpx8y5g6ld700b1mnrdedw02l0o7tj5b',
                receiverInterfaceNamespace: 'vu1gywdt0r6q2jv97xycwopqr6jzf4w4p3z7pflmp9wo7wj445x08xvydxv5tq3kgz96qnod0pirrbwbv64t5lh6onqnygw2psqm8kencfu5ptl14wype5im3v2f1mct36nl8h958nutlihml95c7h31xsbgvu1t',
                retries: 3238336835,
                size: 4412604960,
                timesFailed: 8781017021,
                numberMax: 9882323179,
                numberDays: 5825111262,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailReceiverInterface is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: '5f6pyqaxtyirc3f3dhigghigfjbc5d6zwflgvrga12vh9k20gc',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 'teuomouyajjg3jawqfix',
                scenario: 'fupfrykkzoqlt823aq4okhyt9nvqlkouul1hx33zvbenutm8ys8ddgkuzkme',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 06:50:27',
                executionMonitoringStartAt: '2020-11-04 14:22:11',
                executionMonitoringEndAt: '2020-11-04 20:08:01',
                flowHash: '7vf0u8slhsl9qbhth727ef8kvb2ejqm7f2izfkdl',
                flowParty: 'x3j2qbx83fwfrotx2pt8nbwdggpwilh6xifhvbd30yddq1j02cpr1rvba6zlqu0s18b7g6cfun2g55ectyl11o8ni16x36oflp3t34adnz3h5t1p72m8jrczd1f1ulx27nm5jgbxcttwpnqam7x8xkui1ixlf7zw',
                flowReceiverParty: 'i7j58fc1bu0ky03aek727who1yzo3i2p8rrsyoiv08663ebqlqojqod5diz4hu2p62l7mw97ep8stmywwfjjw9o1jn17qrvjt3j8q12wsz5oblpdruilx0awlnggk18oc96yzp15jrhqsd0zhya7coavhw1btmnh',
                flowComponent: '9kw9z69venuu93wij3hiossgtgoljg00i3nzr6se3mppgzx44taspvgvzdwbx6kmnxpook4mvtnqpckof76t9388cbjai9ibsf4h131ceyhjvekk41nhrmrn5b13mqx807exzqxn9qwagslhbntg1qhjv7ml3is8',
                flowReceiverComponent: 'klcu9rbs72n5c9ksqefn0frst8626l849pvs98aw8rmae2cdfsvwig23w3yqth17lrs4pcwkm7r70gi3pcyvu7i3nb0qp8be5otlh4v3uoezlq1mkosc1ant7v7qc1rzsx6voxatkxov3p382h4ej254qt6sy3dm',
                flowInterfaceName: 'v4gsv2uv6mbg8jmfqodx2enk2lretintq2lchh8dg69gehwpew829ucg7pbj553z21a0x0v7km6nwq14vxfam98vr8muy9xracjh5iha1v2wwdgegmbr3j1tc5rqo2agj5l0xy1jth1sfd8t7a64os72umnb65ob',
                flowInterfaceNamespace: 'o6f1y92fqppygmqxl9fpq99a9056dxqv7wt1cqeq634f5goxsau8udv3z457anm4yhqgrj9cpmmsnrk6a1olsqkticlisa8yp1d1knn833ux751nwk5snyaq4lfsqazp9c6gwz0iiw6xfnxro0yw4s3f6gt9ne8v',
                status: 'CANCELLED',
                refMessageId: 'hnyl38mrqhigbashvva6xk7fp9j0e0o4c1ejfrlp1u04yin4ll31utmeug5hhcn477dnvqybbsqa74amgotjvjp9pxkad4s6jw5w800am2f3kkfq4iry0eolsltneyth4ckijhj6xyfofz2m0130vii0ygqnrr95',
                detail: 'Repellat nam aut temporibus et. Incidunt et repellendus aut mollitia ut et aut. Et eligendi in tempora quasi sit vitae accusantium aliquam ipsum.',
                example: 'rny7bc3sy79yjkqef02r0pelhidh65fhsh1vkwzcgapkqxnt532yd9wz85ghgfvyk5wd73mvriiymtqno4dh7myeqawn1onsgzvpcqstuvdgmgvc0abvmjj27ktlgnh48bllzp12w1bvaxdns5j9s4jikmvq1it0',
                startTimeAt: '2020-11-04 21:43:30',
                direction: 'INBOUND',
                errorCategory: '35ow332rbdf3cxrxoba1vcdegy9v8m2rcuqxv3nuir7uh2hfneeiyx7hts0ydz9rdme3xacfiv6t52po7ny8kdiy8qx69hpcjv9mndxlb92ab3hau71fxmv3fehe5a0i06unj8ii9lmj9id6ulj4zms8pp35hebx',
                errorCode: 'mohrxideogri4acdrtsd1ecbidp8y662rp8otj1f77c5i0gbny',
                errorLabel: 779284,
                node: 5989465130,
                protocol: '8f37ffntyxr0qiqsn3e8',
                qualityOfService: '0n48vwe6eq9aj4j921so',
                receiverParty: 'b34rr4lb20qu2pvi3fnpebsoqbl959z1tmadvarmb1rqaoyhdwy4ga4fx1e134aj1ppgh30vrwspmsn721rldxfq8mg9kzt0w3j0dgik159psqkhs7gcgxu9y73dnbctb0d4toe9kcqlpy56wmajrlzmztzm7q7g',
                receiverComponent: 'g1zg723bczzb4kroao48jc31rgmwwg8wlj7glo6hl04mqag4xo9hroiu1bkv3d3ywzmg94kwb2jt30wuwaovrn614x5d217lk6fgrigjxu49bc8l8h3jnk8s0hbtho6mn2e7ojw9p8yl1qyofqq3k6cj2ezbdfme',
                receiverInterface: '8wj84hbcxjjzuvs4hmt2bj1nso6hf2ud0gx3sd9u8loavmsz61y5h8bathwmp0tnbbcjkj618nx6mj40wtfv90suhdpsr7p5f8vgkp2zv6h27tmc9stquuczvidr88d6y15421u2yv2s7r6s4fhirm1o54uy1619q',
                receiverInterfaceNamespace: 'flhz38vsqfmm1y65dx8q3vllj6nn7b75km4ctk7k01x9imd2tennn0wenj36tsayxvzgg3a7eor9r19nmhv185hsnp9qnxlauf7htf95utg0uhb0qs9v70uv45741dj89tqpgyk6oizm4pvzsghpzj8punegc2im',
                retries: 9162583923,
                size: 3650109605,
                timesFailed: 9115907722,
                numberMax: 4170354927,
                numberDays: 9714082198,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverInterface is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailReceiverInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: 'mzi96ok83qey019zhf83340u6xpjrjach8yu2l6k7f53vxjmfu',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 'lbc8lve2j4ti2e5ytolc',
                scenario: 'ihbiyj0dvo77qud8sxxrod5r8ncido4tyzfdd3o4mb7lq80t993w3b2vsln1',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 20:19:49',
                executionMonitoringStartAt: '2020-11-04 20:37:03',
                executionMonitoringEndAt: '2020-11-04 15:04:44',
                flowHash: 'bmoufxmyh5gij0z22gxsx29nxtaiodb7zwtllsex',
                flowParty: 'z1qln5nzf1gwkkzljyt2tk1abtjtki8cugue5wpt6c66hrqkrgg4u0hc26u9864w7m5cpk4pv9yxvsvdeuxir5656z29234e5l2urnisv16ra3t5d7o7t3qdx5gf07yh6jqkzh96g1sni1u9ny8p3160fan9ontp',
                flowReceiverParty: 'tq47uy1fd0ty09ujqta3k482b69im0cv1bs724wluzo7pmpjmibfwi7wx8uuwycggk2f3whqvifbjgxjxf6mr9xpyvcoqtd06jr3deio4jyx54vvjw8laqv8uyawjwope17t16ewby1bzgyh13tc7aoxvsrsfzhc',
                flowComponent: 'dof8z8qpgmjxydzx8k4tqmgbkmlep5g9dibiu9m9a9u99gqp6h1o3euworuh5a64p1c5a1jn5rn9w3uu9xzgt59otjq0l782gxnxtrlssqwyomwopgxbx7q9074pskb98hu9gwsbe973u5b246el0pxk0g2dno4m',
                flowReceiverComponent: 'mbq3goc69uxi84vocplm45h1y9hmpb9vpxutuaiz2zbmpzv00q7fktqm5zpcz1uxyzwcurw7hnqh7psyavcp084ros74vjkp7k5cqbtphg3yqdyppmop07907kbcwdc4xm0iwive9l7oi9daytxcvxwi2oi6a9ok',
                flowInterfaceName: 'y0dh5cygviszcucip8mb9p7ek97cjjvo4u6aowi7nk0cdb69z9xabj8fczz785qs14e9swiwjpq4i3kdggad56pu1ug6sygecde8db8n230ykmnd51cb0f0a6gcl2o91bpzejnh5s99e6e6k45zec0hc1r2vdhti',
                flowInterfaceNamespace: '63r1lcwaexmq7hawptnxvn02qez4g6uvbwdrcbu17vmffosnktvqqk9upy7iw1smx1pn9y5vcfkexf2wrhd62rskur7ssaf5q45vtcmlpzl2s4jd3nfurlcjk6l2p19rpxsk2q0gi3kbg4swarnojnj6wanus5pl',
                status: 'CANCELLED',
                refMessageId: 'e5kicc45hjo6enxh9eexker2gu59iubrcfe75oycmxr4dx0uq0xa3q9x9n7w8chs2oomlsbkmaqishb74w33acyi392cqjiaokp4not2jy1tv5yry53w0pzt9itfgut1y31j3e1d72jstzpwvagm9v3h7p0g0i9r',
                detail: 'Totam libero aperiam occaecati. Tempore ea iusto. Animi sint quibusdam sit et sunt. Quasi sequi tempora. Sit dolores consequatur ullam qui. Unde eveniet rerum veritatis quia iure doloribus facere.',
                example: '7io2iwrhchg67upuvt4c5izt1mjhta8gys4rayr9cafvo1d7dvjmb8mjlgz6400xgf5sq9pdotq2c7f754y5dgrepqaxyx1sqzcglg1snj98jkt9o02tsef8dy7p9p806oav5lpvw39vushz9ylpoa4co59uv3au',
                startTimeAt: '2020-11-04 13:08:22',
                direction: 'OUTBOUND',
                errorCategory: '6h8z8mkpnapffdfgas9wpsjpcnm6x86kng4tyvyzae9czfqrslhnjh73rjr72dhdxp2g00phhef3cr7by4rrkvo195j3vdttj9izovig4b6pg9k22nu5koaz83g1ygdkoo4nh072yx8b4et8gr3qccsy0s02qs5a',
                errorCode: 'dstyh9osp3w0dcu9tffsef8mnis1zeyn9wwq1w0sshxont9aau',
                errorLabel: 901537,
                node: 1773669435,
                protocol: 'lzt614qzbb28jrm2e6hf',
                qualityOfService: '7b4z75oa3sdfuti8p3f7',
                receiverParty: 's75vch4he20c1m9iegy7g2x67sttw9vj5pyfd3bmwygaplhqqihd4l3fthv5626tmirf7l7o0zxzw7tu68ld8rx54wm0i5qiouuudflyosl2s20hvittyuikjw5rg7svb1b2wn58hmlcfyx3kqg47xwapu5x8y2a',
                receiverComponent: 'jye9q9zcmja2o7yssu9bdnvk5zt53vn40rpbtnq7p0boudagqomm0jmvc7l2x9vu61vv861b7n8d0fn3fv716fjyykt6dcqy5ku7urdpt65571nyy96ao127x4ej8rhcwyalonalyiftm0hqxs2oax38otbw5vv4',
                receiverInterface: 'z9wz5vnbh3my05hm55x9um9mcejveyz4psylpc6830s2oi0qs0li0izl8qteql65myctzg115xr0gtt0k8cms490c2mqqyzgr1hykeyatxrxg1o2rjim5a7ds9tdmjyx3bed8s934l9dpl66dpqoozxsaaa9blt1',
                receiverInterfaceNamespace: '2zfe705g9ml6jimsokz3sqw3lajxowethkkjx2nkhhl7735p7nmk72s0arxigx23tec21w9lpgv38qzzlwb35b4qh37xpfeielvc245xa5nfcdeyurb1jq8somz29mwjstchwmfd3zbb2c99ocyrusnl5xzq4vxzb',
                retries: 2854885872,
                size: 5959067683,
                timesFailed: 2187875907,
                numberMax: 7369979371,
                numberDays: 6655972222,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailRetries is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: '9qgprbidr0gqxhp3rv61avmrbevc6q8mwechvh3was8ex2sk6i',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 'fj2j6oei3h6qovv1imnz',
                scenario: '2yqef733johi240s59m6x7a5aupict2b6an0olb1v6gxotl2841lkq4vdioh',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 01:18:39',
                executionMonitoringStartAt: '2020-11-04 12:35:15',
                executionMonitoringEndAt: '2020-11-04 18:14:51',
                flowHash: 'clls9lcp1rpb68zqg68ahe55v5vp9o10m3xhd3b9',
                flowParty: 'skohrjbb0bl3vquld4307u4dc8fawc8kqw3al9jye04xcpy3opis2evydkbzunm1z4dh1yrm0fynegfh1vbrjjp0104rvosmeihzkf24ux4u3dhpoqc5rh8anam2df7fdbwjleoq8g28mi09gg2z3ga9ecixvhvb',
                flowReceiverParty: 'y5jxpi1cjj3mizah4izv3nlumpd2wjloln2y6xf3xh5erv39fxgsx4ajtnm1qckrrmgfhzpxk0dqzwflufgpt0mc80hhbf5zwvhv8aqbwfd7cdvr20753p1psobemuqjeeqzp6hs7og16pmnu6wwr4ifk0zojvji',
                flowComponent: 'z1elwhum5gekcvnkmu12qe1syb92qj2azo2a260hjxufnkd7jpnlmqw4sfnct9ipfm7ze4t7zi57lwsg9f95b1ybbu9z5louyd1g3fxti6o9gvli6uhudq0gf0bhr1rwciqrxnjyqh4ofzf7g4cozd3n28le3btb',
                flowReceiverComponent: 'v4smifsyhn6ofqjr4dnmjwy1ml99v89mxj01e3qqpyhq2dwjjvjivw6ire4gk0izbpqpu6opkictti3qwmvs2aapth7evm2j66otem59tdvt0oxkh212cj3riwawfhzlu1ah02y3a2xjoljjwty2027jdz4dpttp',
                flowInterfaceName: 'kcqanxqk2tpb77s528e39hj6l1ysiq0a303ppi475zrul5t23580iq23ln3xpryj6mix8ou4r8vhpl20cw76ssv9gtavs3op9ccwzyfy72yachucsvmz35tclu1yio0xa990iq75c41sj45lvo0ven5swelm1yt6',
                flowInterfaceNamespace: '5n9yhrdray10f7wd6a0pnvhaigzoqqnki4m9qomum4x3ryv3zld90pxcxla462f5gw8fsmw68d5glabwe1q4tdox89a2j0eqmulwbiwocvwf0kt8xzr15rtyhxvdo41gned49h87m15hqm7ts9k5392klwh1fy4c',
                status: 'TO_BE_DELIVERED',
                refMessageId: 'k90jl4mgp7h1l3y9m56rqav7f6g7p41ofjjx7axqmb6rs2jqtmms9iqotc50yv45vfry970eq3ssnacp00st2tjkagdjiz9vgh7fs8cmisc9zwmbyv4adrngdsdr8tl3ec7k3a8siex5mwuiuhj8bah935nfj4q1',
                detail: 'Consequatur sit nesciunt quia provident laudantium. Nostrum quas veniam. Minima vero dolores aliquid. Tempore qui incidunt ea animi nam porro optio. Perferendis omnis reiciendis veniam fuga laboriosam at quam nihil.',
                example: '66tagghwe4x8dgcx00cjbt4gtzwp4nnzvuzoch4l06ge0wrcms79kzlgqpclnm3j1gzmhf3ig6vetwch3moxkkgzirrbnz3tjkmthku76wwuzddh29e1z6ny4d0bz9od21n5on31nt9l94921xna8m7puia8k8mm',
                startTimeAt: '2020-11-04 16:16:41',
                direction: 'INBOUND',
                errorCategory: 'ho6lu1akadqpegjmsls6l0s7g3ngudhkmg1yemq25smj1jjr41klfan00l936lbzsmiivuu3szphgi3hbbbyj3mtyc5phn2tanj48saltcdbp2cnd5z894qdpci91ff0rnml3x3tdzu90pheuf53asso2eej8oml',
                errorCode: 'e9hjh9vgptpqror1tei53vy5dtq18iqu6qbb7doowd26ma70qg',
                errorLabel: 726814,
                node: 7686456003,
                protocol: '6naacmmj7027ah8yayu5',
                qualityOfService: 'dvvst7g3e32znbk8kk2o',
                receiverParty: '380kf1ky0301lcjja6dfjthf502q7lmrvx9howbvny8h89yq2j9nmmmmhly2ev2xcu8dq7zythx1rjrvtdtqxo1p1icnzazczodyme70bgngduff46gb0uzdcdiffvuur788jnpd0vuv1yc3ovtspgs0kz42tqsb',
                receiverComponent: 'vqcvl62v8s2ephzb0zxrlqcwawcqbxj4sigjop8ejkxz4o42eh7zpx9or2y4qujeab3wdlekvz59ta9hhdc3ocfwlyby6opadzbpk0doh6lme2yvzkrkw0dnvbipmpz7m8ipkd6ukyb76diu083k8iuyh36g9ly1',
                receiverInterface: '0qv95q9cnj35te5y2phjftba8udfe92x4epu1gmc03k28sb71pdtrbzhvoh7mringk8qp4fup2r267ba8cpz7c74ghc7fzfq1kxp9goh27e513jd1dn1zdj1l7tuprjlzwhxzbrlpw9ttut7633589095q9mmitq',
                receiverInterfaceNamespace: '5mbdnl2a5b5s1r8axptezmxexjimj9s9ydvkj2slwvs6wrx47o00o4t4g4zdjkp2iu71z8yr2yuudln1gesfawvu1updju4m23ztd8s6gxkxrdnhskhv7b0u8u4483chiqo5cff411843ldehus52xagnjmlhpyn',
                retries: 90331772753,
                size: 7116406405,
                timesFailed: 2524662432,
                numberMax: 8763330361,
                numberDays: 8519407893,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailRetries is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailSize is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: '9zeanh8xkgeyzeuz2nwf9y0xv0arb8r1mkxug14ho55so26ng1',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 'lxwleliieb4gmddhjqe5',
                scenario: '9ajbdg1hhp9vx8kz1j4h1ff37trjitrv3qx1bhts39h053h7xx9hazmkrcjv',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 15:29:24',
                executionMonitoringStartAt: '2020-11-04 01:53:43',
                executionMonitoringEndAt: '2020-11-04 08:41:21',
                flowHash: 'ldr7ipx8pb9ip66b0z19rktx1bjhs22zi56kkh8i',
                flowParty: '4tc3nfbk627zxyew6wiiddg4uzx132lzfz3n3ltracd5ysd26nxodfel6hizgqia9s8pn817aa4eoptmj28phy5f0bli83rvboblof54mca2cxy8qpxc7xvnk6xa9l7ojaywsyv4fjaqjmp1wh2t1bcqor5zxof8',
                flowReceiverParty: '4fk45evcld8hk7xvnpj56wmfns1gdt2e4r2vovx6hql200qc10il8hxzhltczaj7u5lduxb207h12rqh4hbfu3x5eaa2zeg2ewb45dn34ff5vjmf8ovpm5yifo5h764s42xng6mc7s58ne1250a5sp6lkyz8r6hk',
                flowComponent: 'ybw5ajcuczh7dojtsj4ln2quzx4nqbrbf3qxqlkjondybi6mczjcfeiyinscgw905sbeh10ni4a3qqla4irou23s5340wz9vw20ldp5a2lmkldt4cr7qtodify3o62w1yoi2ucznp7vhgi6e19oomxrsowb3zyq6',
                flowReceiverComponent: 'pcl1qnth71tw82xpxinododcd913wcd9116k80r1ffx7qsfqcc29r0c57dxlo6nkhs5nviw7zulvycenazs2jef2hm6mq5bpi1du891bwm9ecdog1wmf7s8azm0cgoiy8b2pxq3uioolmhu7w2ra5i7627j93nfu',
                flowInterfaceName: 'djqdygf0ktesdr37hpgqoidz7g9kxq12j3qpd029fck70e750j4j4znrbeepiktml3atn9mtraehk9jw2u00o0u2nsiya7zaxm5x3h5kc99ui3u4fq4imkb2m86owpzhq1ef1dxcqgh0k5k5kdov8t3jez2ei45e',
                flowInterfaceNamespace: 'rg4k4iqf2lf903mp0kifjr51i1cwmzbhntlzsa370jejhnjur5oqz4w15jid69j3b7ujsik1kue79oobvz7hlfa41yuu8fb07f1jf8notfii9qy8u2np72jhdb3m4lk1k0klg5h12c89dlhga8mr53b15ttpswhi',
                status: 'TO_BE_DELIVERED',
                refMessageId: '00xipg7up1atn4xbcodd8mfu285uykp3d86y0n1f885eo4ckxfwn2wmhyl3ilsj8vrnue9ikh4748cu9j2c104jrfhk8flnayhtppns4f5bnlvpy9hti4ir4atkqo89ecjf3inxoicfufozab0pma7bs0lfo9bb6',
                detail: 'Quia blanditiis vitae eligendi debitis. Illo et molestiae et delectus quasi quod sunt. Explicabo vel soluta.',
                example: '6fuuptyvioddwzz4blu00qhngidttbihov2uihiadk2aze3safs699h0i4wpdeq66v3ky2ggpgty4lptdgojl5pgawpmu5byyqnsa2dvm1p4bb97oopxiurhe3thruvxgubd8t9teuhyln1ytzqyfkazclu9fc32',
                startTimeAt: '2020-11-03 23:26:09',
                direction: 'INBOUND',
                errorCategory: '0wn8xmcypo1111wnih8qjnsxtqejqfcryjr9of9hrlv2rqm69lra987yym72f8dklex9i4z4chsa6tdcv88f33v5r3zootp0ub7jlocqf8ds37ie90lnflyjeep7s984d2iw5we4a6ap6f2fo83rj8u8wqi4f2qy',
                errorCode: '54xlc0qtttq3vb03u730ayd8ihjncibbopjagcbwtcdvfuroys',
                errorLabel: 530612,
                node: 8049552945,
                protocol: 'zhzmov0cim63va408izl',
                qualityOfService: '5lzvscqmfxb5uhywqaak',
                receiverParty: '583l7v7cgqfni7uhst9xyjc431ike47w1l2yo2zblpkqz8dqr5zbsdxes4h4k9d895r2re4vqbpi1q3zep3t6khlfvbqd4t8hqtiytymampnl735tgbwdabpdtktskmlnaqs871qvwqw92138w7sk6c653al5c8r',
                receiverComponent: 'f3vo2e8xji8e3pezf1mfnmqdbj9r998g414nohculpnkn3y4o2pmdu8632aqqx6tp5iz6nu5cc89mgq4r7wunvl46pi83kbvs42odryx2lagrjnkxp8wlmcap6jhrb8c22lobunuiahrisfuz5azsrcygxkrdymo',
                receiverInterface: '4igk4jnmxkosb0ab63dzogelbyxryy4o8nw81k9c9crxjdjflabsrrqyra37f3s7r3hq81ef7iawxqy72q7m8omkapp1ftqryh4b42mgjuvgebnrv0h147k13tp0w8ukuteqnhwqgw9qq7a3kmtzo0ozddeijem5',
                receiverInterfaceNamespace: '77ve5j73tz4104kxwsxp83hoafdb5rmoym7g9bucl87v1i9cvcpy8h0t8p1wek5l75ig4klpje1un5pwyamel1v1gzi78q37jaavujqfit2r3zmu1ksja26a8em8laehr1wixfocoh34kvo9p9pnk4hxg8eicy3z',
                retries: 9102200624,
                size: 78702691022,
                timesFailed: 8779830900,
                numberMax: 5439895318,
                numberDays: 7265055609,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSize is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailTimesFailed is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: 'epjs21oh99lwzcbieq4edi3r3sxqzsnyicsr4jkiczyfeem7un',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: '9gtxrjnldch0160e19w4',
                scenario: 'y28q6pcl6ggsf3b5jjigsree526o9vs6lxuft12lxx71njczfamvdmw6slq4',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 04:42:14',
                executionMonitoringStartAt: '2020-11-04 11:48:15',
                executionMonitoringEndAt: '2020-11-04 04:28:48',
                flowHash: '3xonosgf6e99av8lyvi5sl1nkyzm9xg0842f4qut',
                flowParty: '7259hyxd9opuubfpy3bmgbm4q6534stv5umz8a204nia7f0fuxvse9hzbi1tbz8slm8him424z8r7tv3zz8desv6kwh7qql4i1zrssye8jg4qwuozjtqim8bi79htmuvwy9oib07pwxbtot196oifznozvvxyusn',
                flowReceiverParty: 'ky842cjxxyh51gnk76dof30y7a6cyemybu20zvt2dxrxuqj1g3iwmkngh94rgm14oray582jirtlv4y0ncm2rs6bs2tdddr4zez5o5yx6yem3cyqt0qhuy0csqpmbd2p32attfdpb4ckuuurhqvkn3q55c9wsr8r',
                flowComponent: 'ifq69mtb1enk6nhe1jgtcanbeso0tzb99yx0yojj7ofb7czxubwdbwlh10llh1bc1ovga0hr0n8fw24ez48n3pxr4r3rjftcw2zaafjhg80dqobw2881tv4r2ngw1hvr0bgazlbhfpsowkrzsmpwiqdt3p3agxyo',
                flowReceiverComponent: 'aisqes2zd5xknlmfo8uxz02hb09a9cfoafvtck65old5y9c3wnd89513jw3tvgjunar3j43yp0hqzksgyptsmdum8ljlu8xh7h5tz0sonqjnxplxxxk8av1du2nz5obxlqdgn5yu116lcvarnamour8si0e59s96',
                flowInterfaceName: 'xvmrpnix1tnr22hg1hh7b5uq900gx5q22fktaxk60hkwwelgsined2vyptsievck2urte9909grhkfdn96cq8ul38jlg33ruuc3qi4fwrkgs5yy453din0dikeo0c4r07xmu865rparng5yuuki83ctqb083rvux',
                flowInterfaceNamespace: 'iuyzwtk2jnpqxpqcdhizfemal3mgkuc4rt14qll92u6wi8qtuynddfiq6q1gjyu8q5miq3937jqph2416v4wfo2vg74d2baaozbclct6y0mjxc9uniwr7rlddj77p5z0dhcaqr1xn31l1dh9qw7n27jlzmj9ovah',
                status: 'CANCELLED',
                refMessageId: 'dwoen43231xaclpmfa6n5hmy4ewijkz3jlxcezd1pe8mb9fhiif8pn0gwae3pm0bdj79n41cifg1ty8d25qt1e1m8oxsznkdyprj0n169xnz9gdvl9a76jhw7fridpynshacquw7chs0efhikky9rtwz0q6vp8bw',
                detail: 'Qui sit ut consectetur eos. Dolorem at praesentium. Nihil voluptatibus fugit ipsam ipsam saepe aliquam ratione dolore sed. Ut et possimus repudiandae.',
                example: '68a31o79pox36git6h61zs1t4iup2lb6zvcxd5p8q39u1p8lcg1bywun9u8qjk48lq46cba97p9zsfg0fz89vr6n6y8wtla02obuv5xp3kumek2xhb7k2x1nxgp174m4qmycnr5cqe3adxwmrnz9f29jbbl1ksb9',
                startTimeAt: '2020-11-04 01:45:26',
                direction: 'OUTBOUND',
                errorCategory: 'zbop74ncstxzqgcrrm66dvhxr1khuwbciyuso62rp92ufvrs8idfvgeh2n7rg8fohm9e0ik2yo1fzvqdpz94jz84iafm0bvy6mbwbbl4t6lgrqliro5zoj1svsomsjazs854ngbwy2oto3zphuff6t2om4bi3065',
                errorCode: 'xjs5c17j8hlqg7i3w786hja5awjbalxjioi3jo407bzgqm6q18',
                errorLabel: 162567,
                node: 9582987733,
                protocol: 'o4vmh9pzvumpmm0vyvly',
                qualityOfService: 'nrmkd1gr96vx4t5yr0ey',
                receiverParty: '6upszoviu5ttzpsiv4do5tzf61s908y84ek0cfqelmhqlvqvqqqepsu7me6kurc0idi1nmcnn3xachioy7bdz3eeocc9gw17bb32ng3xfdtyuqqkpxocngeufvyu4w5u7ew8nr1848odsyc1zezd53b20c2e1nzt',
                receiverComponent: 'z3ez6wkwlt51euf9ipms0ibmq1re8mzyt8ncew1qf0qofudrak1n7d55kl7xbzspxw6wqihwi943os9c4fr5hgeigbsx5c69quvgajez6a7u54tq34198e4qi3r2ukoia3vwc883omqr2xkft6q74xatin60i3t0',
                receiverInterface: 'f92dokwe5ko8r6x166jjgtnn4xovs31ri1huig7hphtfdtgzh3g9tun4615yl9jg7xbkxtxk5tklrqgrvjwa35a7um95ljwfmbvkdhw14cvtagzg8gg0b9v5bcoc1ldrky7wrks3i6w6ed8ropjxzg2ifr20rqwm',
                receiverInterfaceNamespace: 'aqb548xfwynt8lg912dt11h0g8t3fkuhj13qr7yp8gxmnx1qdw9tgruofd2iu1m3znr0vee0r8t8dn99su58fe30m4wwo92wqece2nutxievi2xo6tzm4zu06nfe7spj4w7dmsm21486wwe3em8kuekvx2ek1jep',
                retries: 6937741602,
                size: 2386577051,
                timesFailed: 11236579327,
                numberMax: 3640807978,
                numberDays: 2423354316,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTimesFailed is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailNumberMax is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: '2fr2fu31qro1nqciqw2lk2z1x6abubnscndpb6y0z20ay731va',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 'drmofhkaqae5j7pe47lb',
                scenario: 'lwi8i8917j8mh1bkpjuzw4u8dtjaqcbyqmpva7foxoullezxcxzu4hmfrckj',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 07:32:57',
                executionMonitoringStartAt: '2020-11-04 07:32:26',
                executionMonitoringEndAt: '2020-11-04 11:55:46',
                flowHash: '5mm7qilrtjzgmn1ysogu0wocjmtbrvlhp5ho4wg1',
                flowParty: '6ehazrb7w1j7wexlco9g64ytvhrdv4i3xhv2yo3sj1wfm9m9v9mswko76ey387lnbwnu8ynilqpgookudiw30j51ges1h6gyp959qke99qm767zuyp10hmtmttaxknv7hvpb7xlx6xdmkfxxiykkwseqpp72zspa',
                flowReceiverParty: '0tzscnmjczfyojanceti0rv75gf0mezwqmr3bm09dh1hhiyjq1tvu7vs7j9kltc7c6ujjzqsiodvb2665jlegitcgdgiyp3y9x9fw0ifst1x62pkim0jdb8uhlzpdjb92j4n5o0kdi0iy9d3ysgoh2pup8u4uhzj',
                flowComponent: 'f9qporzj2q7vjx0xiudtou72fm54lmj62ws1nrtp28p2wfdbzkxm4v4wijdv2pqgndscqx9pw4kdracp8x9ffgna7rai22gqhpfankr65xx6yztr3vil0fx9lg9hpeg3192r3z62vablyhe1uup85co5til92bct',
                flowReceiverComponent: 'xd00u87829uv4xaq35sxppxv2q1fy4ejbwxz2i5en2a4888bewhi1ht5a4ud8br1doz5oslhro57ifgkos58fx81ah35b5pgz0odbtqzyt6hhho609nic0f5mrug1aa98d0rxh2qijervcvd90ex33l221wpljot',
                flowInterfaceName: 'mt9g65zuf3kheaozq4qef90op1d4879qeqlshzodkvus9sug3ijfb3ro1lp3n0p1o2gm4dhpesylucvi6zpe182rgbsbomw1l237u8mjqzj5owclund2k54ktbi52t9u5jvkbpcqpvu3k9xz49x7mnfs4owgjqtp',
                flowInterfaceNamespace: 't2wdnfhonm2xd08o02f37kuy8vpx8x6nfih43npdt8ynxqo9ooh5jfulwf00jz7nep2p5f08sdyxtnbe8ewhv3v16ya2ugv15rovhglcefcitsi6fb6yazk7rie0yxqocy3g78243yodqt371hk32hzxwo2kk2fr',
                status: 'ERROR',
                refMessageId: 's04e69lgeowu0oiej86jmq0037o5z277ehutuyhue5n7odr54ekoh5fo34mn6skf24srdh9lou17oe042njcc29ludsa9jmljnh26o3rma5kc0zjv15coqnyutllutfit0spb8b9hrwpx0xp8e4aei4oy1oqaqlx',
                detail: 'Unde ipsam eligendi est sint tempora ea. Sint illum voluptas recusandae quae. Atque accusamus officia quia.',
                example: '26cqd9duzg9289jptn3kmt4wy80xfv065w344hmbx4wjuuqc2sggnqco16l2leyvzho3igoc921ae88gjejcuy4m3832mv2vvvbjjv6wiefcfx6ihxc8w1gkpspyj4p9xvrchpa5zy22oy3mt9l1b8r1hmvcybor',
                startTimeAt: '2020-11-04 11:36:37',
                direction: 'OUTBOUND',
                errorCategory: 'hw8nxxx2rrxszirhoii6yvxjohpeyz8l3pbkk2k3rg41ic84uf74zcc8ud3nm0l9h9oje7f2c4qa43gziag00kt4ujacqkxzeekre9aue2i4mqkmd17idllx8s4hvayeos342hgikxrewj4oox1ccwvj1ojtuzdf',
                errorCode: '0hrg2ci3zukau98a0xdb3dbtz362l7lxe7vil6z16n47dqc46z',
                errorLabel: 697932,
                node: 3728577785,
                protocol: '5kklu9yuwx5donedrowa',
                qualityOfService: 'i75hnj9785w9ay1kzgdv',
                receiverParty: 'lf3zr2x61p2l498t1pvrq38sma9jjefl6mtea4akw87yia3a8n1nsi3t01rxwqdjbqc1haczxdtxejg4x7wd6iivaf0wlyu8a74dn4d2fw333mmvwg6itot26pmhmv9zdxo91xo5whgaaq952b2au9m17pguw4qp',
                receiverComponent: 'e99ferobxnlekdgym7hntg1e57sj2spqt35bczfc6hk4tbxfmqzwnt2jbzdd8ddfkhmj25ntgl16yk2xkoa0qk4z02hk09un61gm2byf0mttklq7awqaoxfn0q5yjtaw61o3o55knq3pwuopcj2y0s69hirz37ox',
                receiverInterface: '5zluh72s5yupx4zqovtn8pxfvwikjejgqzi0ihnwz8y7xj52mldojngm3oymgiq9l7e5v0820e4yqns6i8ayhiwlzdmpiuwprcj202e83mggeehc07nim855q5ikuolo6uw2sahvcm1s7ywkydpewo38kzem90xe',
                receiverInterfaceNamespace: 'zqzz1krwxta1mbts8jmhf76pi4sa13xo6nqwsdm2r6b5910bfei0100ewysn2ohxhugtuzwbx24hz3da3lo6kv8asayr22qziwuanbmsr0kwa7b3y7wclhn0jmchih9y2nr9690x7aomipj7mp2r6dv1af379n0i',
                retries: 6166695729,
                size: 9328429795,
                timesFailed: 5218179267,
                numberMax: 66887531360,
                numberDays: 8763442681,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailNumberMax is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailNumberDays is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: 'tb6gxj4ae1ikeuzzuv71mbzfpzsj8hsg4ic0nkln20w3jgu86j',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 'wvam19ay7ormm974fvv2',
                scenario: 's3kobeybtp1llqofxac2rdz5w0w7u5ir0ohqwipplqy79dmjtqpqn8sd38ik',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 17:48:23',
                executionMonitoringStartAt: '2020-11-04 04:30:18',
                executionMonitoringEndAt: '2020-11-04 18:29:49',
                flowHash: 'dgkv0s4i0439jamzkypuvoi19v9uzbu7shubzk2d',
                flowParty: 'wz5u43u1jhp5o5zsdsct59cd1eu338gnjcq3l2lnr9fb5zxqudmo53fcsg2vwn9on42xsybm4a1oxmlypy09tz3abadic8s9wgvgw06rogj831egywdsb1f9rsm2s00sgjatdud1suvhksq6suur8le323n2c6la',
                flowReceiverParty: 'oydu16o2c97ie5tzljmqdy8sz7w753zlsvu0j48ov3byz6csau5jladc31ma7ebtc6qszquux7z2tybg06tynlou8kqoiivy9763tq4x9dp8taoffnf309kjwh5i4m7nknpf4mpqcuy6vf3wmd1jmqqsen01af9q',
                flowComponent: '0trw7liyorytp1iezt60z8l8ozwjnq5o2job83gytqcj1nkgvrd3y8dj3lssv9vmytpscm1zjt4qoicgy89e3lk59ifnn1t3dphmb3bfk8i3uepdrbjxiak3vda8xobuzxstrtyypyjlz6a2lwtvzi8d8syk1qr4',
                flowReceiverComponent: 'iljf6cn8xh0m6ritqd3mxdq9slhkln5797kbudblluoexk9xps2bhaz277vf28xiuwlosrp63o47gq41z1qp69vxq2b0yam8kaj1rbdswluy00u9mk83wlxuih0aup0izf4jkht57cihgw1dvmvvhufpco8jm0as',
                flowInterfaceName: 'fbrc26s3zxqy2gbulhnzr25a6nsw0mwkyont064dy02ixad7w3zwn3u935gqhehbl94l9fpvm79hw7s3mijgmgzol4kkawod3am4qectpxrdskv7x025i9oa2eejdr4wdttgrjn442lvuzhf91jcr2u6xv4ytevk',
                flowInterfaceNamespace: 'nxrgeymd4ianhcxufqnybyggwpccdlh73zoaf87pwpnmnt6czdnnrbdh4qcz3z13jt9y979i5u2hkrbm9fq1id4o4l97bqiyqipw7hure05c6kak5fjdaanq4asqo65tjh0dum3nfk49k0vcnekcos7yg9i8hty5',
                status: 'SUCCESS',
                refMessageId: 'dk2gjfqrrz552fpiq9xk6trznqz3czm20mzcq0p0pr35d859477fdsk0qfhlsrnezaq2xcbqyqvrqas0bjwscbun7192ic79sbrr57djj8jl4qmsj9ds4r31e59kzobbh8hem7bl56a8hsvmdp1er58p7bv7rmwf',
                detail: 'Occaecati earum quas alias totam aut ea quae qui pariatur. Facilis ipsam eos facilis quos blanditiis sequi id. Rerum sunt rerum magni voluptas molestias eveniet vel delectus. Est sint dolores voluptatem nulla animi eligendi. Suscipit sunt ipsa recusandae voluptatem est quam aspernatur quas. Tempora omnis vitae consequatur.',
                example: 'yupig46vtlz0dz1cu2hra8slodvjlmw6fdqr1nlbinz5bzrcqz3hgt5g1j74x7li3inxsvjevxqdrw2tlbb9x4ycrpvhijdych5001yyu7mj8ldm5yhe8inv4yqmmhzy19znef14ay6eszgqa33qexzdffdu73dg',
                startTimeAt: '2020-11-04 19:22:28',
                direction: 'INBOUND',
                errorCategory: 'hej4z2q7ipued59quy6m52l5txphic95scjiiwlk3l2njb03fytcx75g8g8x2z8ojiq3lcl9s0n36k4le0cpktaci7su8c946wylwpjkij5dv0ur0j56d3wndrcq9jjwhkmfi0j29dlr4xz7yo2rnf9jecjj44q8',
                errorCode: 'uh8lz259m09cguvbmojf2nx6i7nd9n41xjhmn89zjcw686uky1',
                errorLabel: 437980,
                node: 9116885101,
                protocol: 'zohdrl81mde5z3gzaugw',
                qualityOfService: '22rm796xsizttqw29ast',
                receiverParty: 'dqy57llnnatbeoo8dbrzm81h701ua910nqgx5dg3wv8zj5df1lr9y3c3hyzvx4fng1xzn1jr6ww62lm0dicgjaqyto1cwcqdme2zzsd1566xg0f9cb73eq6yo0mujb3myi9efr1is8neh62s6tz9z6yomtc0sp5c',
                receiverComponent: '3h0mbn0v3gj7hil7jdhknowf8dujb4jby8wo2m42nwvgd9bv2wbkqacq4l7t3qzbdzykmttcm6p465ndadaf1auf7q18k8qdpdn2imvkx2r72g8tj5bbb94t0g3qvrr4taisf9cjc4e5cfkcw5c1e454pol2yfu2',
                receiverInterface: 'l0mib31uzoft4r0amb2o24xzgcibz3a5p7bkuanwuwemtb7of43d4qqpyqtdoe39mrwsv8phyouk366x81epzawa1bq5zgp2i918uwmmaswrvuczeniv3n89v1jpp2sgx2r3r89fhpkxown43a7qttlilqyko827',
                receiverInterfaceNamespace: 'p0ycan4vh79ylkso5fuv70gd4ud7jzc5efpggy3290gsmwece2ln90w62c9k5t19mlvu3p96i627f6iv76hs6fefwl4pew6omert1uoywqxqllzid44fcc6k35zw31w3pxw55ospt4j060v5qnl25r3nea0m2f6a',
                retries: 5457616772,
                size: 7520535012,
                timesFailed: 4005648632,
                numberMax: 2921032272,
                numberDays: 49420662763,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailNumberDays is too large, has a maximum length of 10');
            });
    });
    

    

    

    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailNode must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: 'll0boxdmao5c6t6c93j09pym6onjedvlbev5b6ghvfr99x09da',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 'rquo1z7j34d8k6a0jwwm',
                scenario: 'cxgnqzmz73z7gxx6qssrklesbjrrm9v9tfr5x9i7t5mno716odv24jnwztl6',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 11:06:24',
                executionMonitoringStartAt: '2020-11-04 07:04:58',
                executionMonitoringEndAt: '2020-11-04 16:56:09',
                flowHash: 'o6rukvm6t59rlpon41h4qyfch2l9sa4ve7114h5j',
                flowParty: '2qxfzyakc60rs97wii0tlqsla3i15jvqppjvp6206z6ol98tapys1886cuvp7tl0nyzfrx11l63smiexz71b794u0v5lgs9jpmysjvcd7n4qd2vgfbijcctbf70xzzcoxnul01rn512jcjkspj90xyygdb9e2gr5',
                flowReceiverParty: '331ib9vk54z2q2t8imxxh3v7vkh5elvzejpcstoogfqqxb1sev2mm1ymalitsfbb2jm8lo5r11rfcr3jngx2nrc19bolhov6ig58royqpyw3qz64zswmqnne2f7t6w17j5eqyjzdhajkvalzmu27mx83knmznwqq',
                flowComponent: '6u28s6v5c311dh57r5a6r7bioryi37s8rbvxzguw97czfqb7y8npag4u7q7ppysdq8cx0aosooxq6z2cxuxu8z5c0ajeo7ob6erd6zg0oxbw24eyrwx2ngefwsx1o6l4v9nj1o6wnfotawzfe3v1nss335qjxudw',
                flowReceiverComponent: 'awhwbfjp6qfknwmzc4okn91uf3lkohaywrzze5db8zsqw35k7el6xnk9f7tcwc9jw64ge0d7yxjmwrteae8ej4zt8vj0pi373kj7nxto70bi9sepi8s56pk3pwwb5kcwv743ik7f0gggqahg79bcbl56btplgo1t',
                flowInterfaceName: 'uw2bwuwyv3mo77kg5t3dhszts31h3oyhsev8jv8bj4oc5o0n3jkqqz2g6o4jcvmpyf36nqp7rb7a0jat3tg4z3wf8qnrk28vm45r5xrftfa3dupltac3qcnxuql5ahvhhb5v7k6k737oz86r5u32lts1405k1gcf',
                flowInterfaceNamespace: '8ycmf7wm8e7l1b9eyzg379m0y9ahx0gw7jtasyyyqzq0k4f1wcbc51fbz4z152egffo7xe7xa6jl1jwx05wkozlpvv70edatz37rwxlpv0jkfy4jhjzttmc3yvpnm3y6yrwtc5ji3d54yx919oqvf40ozhrzwv4g',
                status: 'TO_BE_DELIVERED',
                refMessageId: '5f5hnn2kyozpiim3al7nf5mimun47gx6pm9iix307ct4a70x51r9mbmnqio6j0i2pfdmxpv8ubmzpalqgj11wwtz5j8sdfnww9k1t334e12n3qkl2kxksbvecq50b4czqebodbpcaefrrjtbmwnwlxtyj20jv9cy',
                detail: 'Enim iure occaecati voluptatibus inventore. Recusandae mollitia cum est minima est voluptatem. Aspernatur odit mollitia.',
                example: 'fu6aijux1snyeyxd7bc88ubhx9poe3t0z35kdaf6caqn7l5z2h3wigdbgm6u5lhdczlun937li9x12vjqerwp7bhmksvwyofkfvxrv5sh5bwzf69jcn4xqsbb05fygf743xscaakb9rrj0zzym0ba3oc8g3vdjhi',
                startTimeAt: '2020-11-04 19:02:41',
                direction: 'OUTBOUND',
                errorCategory: 'dsxd0e5ixpvqnxcoluz5e64u5evbg7jw9yt8av91uusatcsu3iusshqd59xelw8f7zscmfyj0ghdh7exzp32kr4vpl5j2qinllsuuro2ben7qx9ouxb5o24iyrwvfkdche7oxlarnc6qk2phie8izseelp35mxed',
                errorCode: 'tldi12y55fu93y4n5etags7gc9ivv5uqoicf6nott9vesvxedr',
                errorLabel: 233217,
                node: -9,
                protocol: 'gix64ak2pztf79a9uxm9',
                qualityOfService: 'sywul01zud506kcu6ys2',
                receiverParty: 'njo7l5b9e9d21yhzi8e5qe09hv20qqjyefxbinf75avfihj7wlnydg2p8s0f7rxq8spxo4o1h5jlgqqhy2cp8zuyw9r9tlcdtch6yput46sapxyfdwr5znpkd6oo0o3yi1uagzgclhkfgi86trtu3aak7zm0mae5',
                receiverComponent: '4bu8pkschz6wztc73lotrn2h6q6ovqvp2kyc0u1hma6mqbb6inak4yohey9dy6i90bn67mc5w18r6avil1d0jaiq3c2yxu7eig33vas5sg8wetiecoy8n3pjfuxm0j8ohpi4y3rt2p4ufiw7ztilsqankoj1t490',
                receiverInterface: '48m55zogpbevwv6lxs7dov7vlzh7ry82a8rvvzkwtjtbyj1cixyffewuncl45imoay80k23ceqdsvhbzvlh3rcz7zdme518220pdj9xbfr2pllqu9ke7gfpdfyo4qza8adr062bananmcx2rvgc4ttpjhysp7f4f',
                receiverInterfaceNamespace: 'vo2ye1nk8hinbrk8kzx76yfor0081gqokwfj5nzc5oh3zlg4k2g7wftaz5dmw98stwismj0hldmla802fbi3axs8xxtz2rjizgorl9c55ji6l292nx1a3a60bwhoovv9n6tua38y6u044q2fwfu5vo7n2wfh1nlh',
                retries: 9472232759,
                size: 4548372299,
                timesFailed: 5334499050,
                numberMax: 6911850148,
                numberDays: 5396015778,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailNode must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailRetries must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: '7iywrnun4qlcnf3ttxv2h10akmhtx1un38ck9ews88o5ep02e1',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: '67oxvl8ropzw2h6v1550',
                scenario: 'shipi6sswwpj57nmjc3n4vrs0qq8st4gelur4x9no3z8bd8xai0omqi6pibf',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 10:49:08',
                executionMonitoringStartAt: '2020-11-04 12:28:35',
                executionMonitoringEndAt: '2020-11-04 22:01:20',
                flowHash: '1qirrgm6ahf3dgrebxrn68s94h50brw6s3rvz7vg',
                flowParty: 'ju0de1rzn1mcgledvkc2hlb9tj674fmiktgz8knwm6pq0bd9ndvsomuxl7op0fs3g0ev5t9e65jhglii1a697rqhepwbl3gqcvke2oigm4y9zxqsubyq6vn1ux5s74dsqlchkpvj1vcv03swvr3gsgntg9ymslv5',
                flowReceiverParty: '1hwp3ex4zr6hbzr20eiboapghygyc2fxqwfkr617g54etmry3sy4jonfozdn34k3v3mifjpe1qt8tubzf8zs7drfwun1sobgywumbq60w87oat877bfb79rysvk5g53mv7ejg2aigwg1vhskrtp4y559okj5fi4a',
                flowComponent: 'ir5fw8sus9p7btql3tjfdunb6h8g0h7wc6fib7u8sfj5m5ndrb44ceuwsk4152dszwno0zuxk6vbcc86ytsu54mydbcs00inml2xbg5kh8y2nfcbqc1fwts82g80rn5ih3as8g8j4a42dmo0xp8hi4l52x6bj9na',
                flowReceiverComponent: '4ow4un6jh4fxr7nuex1ga5ede241a3chbzqd08dmgs7jzxveexlhkz3ofqcz1geu7obiawjuyw1n2aierfxldi4ipe8v7fwpa5cyemcrtkr0rvsbaaitf1q7hsncwefqdayjpga60y685htvih2pxic5midtbnti',
                flowInterfaceName: '8l9l0p46f6ertjacsbo4pny8kbofr0eeoiyia8odbqv9eg3k04kc5f97ye6k0rd1vds7g2ikkygn93z3vkp2poxy7tnr8i3gia204sp6m1kfkdnl850l0vok3jmozb2diiy1kk5k4ncs6e7bkvjdjtdupp2xr9fw',
                flowInterfaceNamespace: 's7m321xzjjyc6gmyrq0vu0gxs1gd6qpo5dlb53hlxnofj9l26clvy5pd9998rzciso2z218bpb0yylrgjubcyl4np4v460bcm57uwwy5av2a7az7xtva66zfkfucjh5jlfkjgdbiamrdfxdacjiklaq82k7h9vjo',
                status: 'DELIVERING',
                refMessageId: 'bmvlfwvm1w5pbd49xs4b3irkd07t8cugi01tqpsn5q0hy8z4ycphaqwjm4tqjuhnbguag7vul01y6g3i37ydlr1hozdx4e87mjcge0nke78lbc9yj31a22ahms4g06w2zi26x6r68vpfh5ra1c6zqmtp5g1ttl3d',
                detail: 'Ullam consequatur tempore molestias est et ab similique. Veniam qui non aut fugiat qui eaque repellat ut a. Molestias vel sint maiores est a ullam quidem. Tenetur iure dicta illo sunt quam eligendi qui porro at. Tempora et delectus consequuntur ut quia est molestiae. Non quam aut veritatis iste ut.',
                example: '07y0nquchq5g21li7x64f5n85peuh0qeg78cbfkag4lfhwo0lohtfzkgkz7ms507pabl4t7xkcl5y8ns99s2u273hgykc88v4tqz225y7iv3v0r6zdgr61sd7tpjs9oo70b26w8sphg2vcy7a07tpuwokocb3aia',
                startTimeAt: '2020-11-04 01:00:34',
                direction: 'OUTBOUND',
                errorCategory: 'mlrwvutgnail54btqkl7jh5u0rwku58r1y0j6uoxc1jwacb10gb1zt9kiwp53fbhrjvgrf6pzx258msdl96hrdpgfqpvsps6n221c4agwpzr3jjm1we7n66e9o7ur83gaberljd5m711tw7c6b6vzsyu18iib76e',
                errorCode: 'oyfxt4vczt9emmf671tao6g06qb4vjhesewh2beg5gpsy7d7vf',
                errorLabel: 134874,
                node: 8813466669,
                protocol: 'qkahvry696eg0sxyfvd5',
                qualityOfService: '7m61rd6df8dq21r40vbw',
                receiverParty: 'e8nvbz1isnsk98moxq8h1bvh583156welxl6jnd9njnfhfniee0ntzo6w2syyx3tvjf3lxkv0mdp1dfw7utr9lia0eau8i7zsqe484norhypull6cpkg9b8itkdn8hb5y7l4gnx1tvr96rjvhvvufv3i3dtup4ig',
                receiverComponent: 'sysel9ckwyau8gdh8gll2tgb1ftglhhveqig7ikfsrvhp31eaziglks1gsdrzl30ceaz97nt8fnlqo4895zqu7phcdm7v2qtv4ud0tuasa8a113f6p9dh5ui2mo0mntuok9xff7bintb4sgoz01ttnq1deq7n0z2',
                receiverInterface: 'np36g9eh3rgcadbxl8us617hvkt729ufndf79ob8hv85pja4hvs8n4h6cx1pwpaf8tpe8h8mpt77w8qo2gsz6dekkr9wjf1jccobbiuzk2qpls5p8vlbimwwlyimolg4n23c9sxsu8bemrtqgbw2z7hno6xgocxs',
                receiverInterfaceNamespace: '9hyjghk6u7kw2ab60xetet745ow716neg49m76wro73yc1xucvf46opq9cozotbb6i5vq119r5ghsc6dtqlyqadq1s5hjwciiwgczijz6hz2nqwkshbw9pj8j5ormirb20okxnxcklm9rr1thlfnls8vt2v0wkeb',
                retries: -9,
                size: 2757418643,
                timesFailed: 4732458556,
                numberMax: 7124425130,
                numberDays: 2129766351,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailRetries must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailSize must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: 'hwienqb494guhmntluro697xob4lxh0rdc3d0uzlafy5v2c1yv',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: '6b9cevtce0a7wjdntfe5',
                scenario: '3hqg3ga60t00k9i19cje28vogsy75d8nf0dhh22mkm8yx0r99ji8dxzw7ipv',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 22:04:25',
                executionMonitoringStartAt: '2020-11-04 20:01:59',
                executionMonitoringEndAt: '2020-11-04 22:32:09',
                flowHash: 'm50vrowo3etr93jszb3s9yefs43rx0xvufwcr79q',
                flowParty: 'jn2jhgd2ee4kuht6ifynioyswhtxqrngsbcocwliccchag8mqfthh48kb59x9adgsaw7vn74byz1j2h9mek75kpbfmllvry067l14gcwzwoljplpfywo8rk09k6h6uyvtmfryc26wx4vcmzj710ns44ki10wklrf',
                flowReceiverParty: 'gpl2kzhzxbcqv57gn7qsuo00ldpa7uup039d9nzx545a46hjkf0tttzmu5wy44m3wvjc3mcs3lqsqv12znxrnqgo8mrejxspivqz8qy72i0egb1o9xlel95u9mo11hpproggz0ru0ibjgxt6t0rmxywkbe9xg854',
                flowComponent: '9go7bmvtuq7z6m1n6yqs7yyupnlp4hlgrjwgv5qpqhbxz2zq97cvarzmp17um9wznkk38zniyq0xw7z1qj7hsxd561dqs1jrlt4rc4am1v7q7r4bexycdv0cd8a7efxs4egh9rf1giue852mkm3n1i3t18aecccv',
                flowReceiverComponent: 'ronnqko7he2z62mndlf1w0fqa008oxifs20mp0mkbpj59bp77g19r3hz1fkpapifiqdcbslij2ydvcol9ttst3oxabmi1r0uy9rcrnhdx6fn8n4xof4yi19ksu9190ag06p928kuvzvngo6mrtbfipctjkjim66b',
                flowInterfaceName: 'z9mzslwdnebilqlhxffug26fdhljj2b8ouk8rnfs1kr2md6wm90oh6vi422gvk9l4t4895zpkwpqunng7zf64pbqg8dwsglaea29bo6cv0d2gn4kyzduer9q2nex8bhj6c7vwg77zusftsg6n1e7c6bukx8dhv04',
                flowInterfaceNamespace: 'o17iyehdb0734npni2wh0wf5ns4h0p7srzvwaqo00tklutylu5li582dyef4mi0skivvcxlrvi53dte5hs4kmta9s0pt4reiq9ek54m0419o88knqy5aoqbui0xlnwlo92vyu2c90ez7tgyho40gto43uyz46xwe',
                status: 'HOLDING',
                refMessageId: 'of6uzlgl5bikulgzlts8gzoqog8iivsa1bavohtnlyi2e1xi48rqaqqjmmxpbep2aaot5lndton5w9cba245brn70e5rozua5dryepxa7rpjfee79rxohqo1gucil76zcba4u0ains2z731utvw80newohhfwj3o',
                detail: 'Accusamus facilis est id. Molestiae sequi blanditiis et vel. Iste dicta sapiente cupiditate atque.',
                example: '8035jpcssn75iifm3ihcxhbbr5cykeycm3akx9htf6zmj5evuo7ki0gruthkzoewqla1bh66wtiycksla09ia7d8qo3fdf0oxhvmaiw4hxi86w3fecvte3ebw6hycayti1e9z0am2mua7tmdc9t2xscohf0rciwn',
                startTimeAt: '2020-11-04 11:49:45',
                direction: 'OUTBOUND',
                errorCategory: 'gilssy5nu5t4tojhcfm1ybh9ghjaoeqgqkmc5zft0pgzo43v0e3fch2pk300ij0x5l2ad8u26e1d0cu7f0hdd3d6pkmlnzo1p88f4wwq0jler9l9nu0jdw3iegbldan1z5ll0uclmfqylnsvye59kpdy3oggmgqq',
                errorCode: 'pppn6vu3cpz5cmapwohvvzl31j2k7pipr8btqwugbq4svl63l7',
                errorLabel: 694577,
                node: 1433153465,
                protocol: 'prpu0cb0ycpi7bq3abry',
                qualityOfService: 'w1hmtos96sknv7n13es5',
                receiverParty: 'gzh9tjv50g7dd9qjs01xpaua0o4y2mgn34qu1mlzfkrx1ciicm9xxlk1lle0atxxl1tsbd7pr0s9e93zz3hz60pdg7j6dmn6xvcxxm7nuhkcddids7xtmyj43kqrlr7kdsrnslzdn0mt05wcj692lmz6x9hw7h6s',
                receiverComponent: 'tl7topbn9ulmigtlsu4080jc7xdox6fda7qdjy0bwmsesjnxshy3o2xfm2ctgcvlmgx0rmn8trgpu8lat1344f73zym4obmo8xcch76rmmi52htnnjshcjcy69w9co0hf99w2jufe6rp35mbxmdbe48ajx3kkq4s',
                receiverInterface: 'clandss9o99ayvzlzix1hotdh1wrvylltvnsjco1zzxs103l1iec0n9unx4fy3o2aqvpnu4mqe87klu8mm5quj34dko0dx9nylpbskrpiemgbr7pzbinp083s2s73yca2ar2ljtiyjahlnenayouwa69rkzprv0j',
                receiverInterfaceNamespace: 'mfq4xc298zn5jmbh3w5zy0yquhkmh8r5syjud8chs0m9n3dst45r0srxvoygey4tp00p2m22v1sec3qk6c1io5xfewx9o51xfotp6s0npqbam9xfndtau91gxtv5985viatdnwmwm16oik8887676gcrioxi62v6',
                retries: 7180460854,
                size: -9,
                timesFailed: 5484724132,
                numberMax: 2324969368,
                numberDays: 9363428886,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailSize must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailTimesFailed must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: 'loxg1p2irbqxtdr5isnnaegozm6bai0otxgw3kupcbe13rhocb',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 'zmqflu9kji625csfxfe7',
                scenario: '3a98g6by8sn08o7sd7obau2zp67r4z136x0kdqy1hqzu826zv68dkyeg04is',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 18:04:19',
                executionMonitoringStartAt: '2020-11-04 21:21:04',
                executionMonitoringEndAt: '2020-11-04 10:40:45',
                flowHash: 'kbwrfca2okm4v0ecx29e3hdii5cuj6ex2zkesp12',
                flowParty: 'zlrergy8t45jqavbkydoknw3jb8t4ejpq57o7aan7a8pafxiuj4q9agebi9tis0xwf9iav7k64bs1sfhoj74b5j3gh9i7of58y38t1ulxi3ktvix0zg1hlxu829gpy36ao3x3fmxdn2ewgfklibxrjx3woj4htsh',
                flowReceiverParty: 'jxuacron9u5gnigdb8xyol0dpm90c6tony7sxfy5k4oygfiag25gc8ot1jjlwg0sdm8lepxbldebtpvnkx8c34p18ka7x1l5pp3lc4uo5ug3bzdpxfpxlrxl7stzweeh27oq2mn6ovdrap4fa0tozm6knc7ywon9',
                flowComponent: 'lxggtsld77phmh3vj7sstgvnmnnk5l0u6pubf9bw62blw02jc6vrdmruz335mmhwlemw3l6ma6y0c1oc2lipumxs07u9rx3mslxgz15esa2liakuhw2ceo43iiwcelznxhs8yhdjgiiacbpcljdjwgon4n5gczkc',
                flowReceiverComponent: 'zd0gk98x1q0sgyo2zags3kf332ge1xqm328j1772bf4vz5ake9hxlgr6pxda1spdfwam8d4tzpq560k3kohbx84yfsajhcfmo87lzkrnepxg04ea3ph5s47s19ltssz48mdfz3s4h8od0nfzks8ig1ytz2nx0jhj',
                flowInterfaceName: 'umbebtfaqzllwxkrh1tmuekegxs4cclqe6ny2viflz3ktgsdtzcva9jfz2y1qer8mu0zv9vrkxzdah2hkx8u1iesvyhyvqvvd60zjvbeii30vi4x0h5rhjc9hmklgw64l7niyvd4hki50jph21tsjhxmaxley23z',
                flowInterfaceNamespace: 'fnuphyyoq3muq96lxs0gd0nxyzdzlpwhglsuiddk0y5ae7i8aetisdtb0ygt9twze5x5xnmcqcra37s1thvdeu0zpzf3r2zpcmxj138q2gnukxj7m5to0p4yhzuknu0hypcvmhwhgbkd6fwxvhwquwqjfdi9gyvq',
                status: 'ERROR',
                refMessageId: '3yi6n0u1bx9gb19qb50rqdb2hsp9bq8e3cemquw2cyk7ecegiztvvy94h2zxf5f6u4dmp7swyxfyba4x6yxb0qj99nbsrxpa7su6p9rh939c4d4867r5tdonu0l08jfx4anvny5hicqezsadoiqu4450v6nnk4bx',
                detail: 'Repellat sit sint aut non. Qui veniam placeat cumque sapiente ullam rerum nemo enim officia. Repellendus molestiae sint. Aliquam consequuntur et nulla voluptatum et esse fugiat voluptates. Beatae optio praesentium cum vero praesentium. Praesentium quia doloribus culpa nam fugiat.',
                example: 'w2u70icr7zijyemxnwy8p7hbqybtk6f9k8r0sm39ita91re491ssjw95nzgy8qnbqvci5kup6mate5o5yy4zxqw9uedtijduh0xf2aoxrykyibaqv0k2cjshfad981vl9jjyexhs2z5vvtcxpbtmkqim2z7q45s8',
                startTimeAt: '2020-11-04 14:56:06',
                direction: 'INBOUND',
                errorCategory: 'pkfr5yc24wlmiga7d83uvzyvpygsrtqn921ti0wbutjppz1uzxv6indov2m6l06k0q2chctyjrqx1voap36htjx2hu3m3etwuvkgyt0kojrpa12u1k1z7lq1m8ubqy1b7el3xp5zf6cxgvg5gz1dptehgyspfz2i',
                errorCode: '47j85f5bpky1uz217od0l82klyf8ra1fhyoal2x09i98xikqxr',
                errorLabel: 976188,
                node: 1771843630,
                protocol: 'ett73rsfuevq88gyltav',
                qualityOfService: '8g7awnxvmipictj3bik9',
                receiverParty: '4359p339t45vxlh8dfzec7ab1hpuyjcyz9im2ga9n3cw0aibbjqlqfqpkn3dmxtase3x04gkwh5i7euknb6zfp2nlrsi5k7exsfy0rnz53d0i530hmu9mohssj56j904tn0boe9q0xsmb63ju5ro3ql1pcu7i7rf',
                receiverComponent: '70a71sth0zgoaxyxtuipb9jtvydyj6wajdbzl3pbdvknxi7ag6gl1gjkwqycdxs6k55n9xlo5awzoxzopx4umfytk7lulma4119sc46o5jbn33fl2gjsctbm856dsnf6pqmm7i07kp37h3efw7m3q5hvm1f26eke',
                receiverInterface: 'ej3ahg7rkipjpbyc3y7lsnldlm7dct93egidryiszfqmxm28769k8foa0ixj56piufyczpa4cpyzrgftkgwrte3hmf83o6uxlsk00jwb7yc54tt7i12mz6t42437xhbnpv3btsnx8o1mhddy34c8w1vz7eo3iooz',
                receiverInterfaceNamespace: 'c5nogkxh4locrt3ukbba6041uw2edza3nfyqu6mdbbcylcv91lgx3cnb5g16kwgu4if17iyj7pzsc2xx3vkzg0h1b4gdz9vddnh10a47cf86qn35nfkirmryj1coy0kjnk2c96ell1ykwtntle0cxysx6w9myg7q',
                retries: 4266408824,
                size: 6122923566,
                timesFailed: -9,
                numberMax: 5538493237,
                numberDays: 6503333440,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailTimesFailed must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailNumberMax must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: 'xxhzlt423m0gvovw4cqgvnqhwt6mdlhhek87slv4w1zj40jb3u',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 'ou8bott1r6lpu6sr6gb4',
                scenario: '28is7je3gxr7wwgb7oq15izgtynenag5utuj2km76i37xojur390r5bn6nq3',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 10:57:03',
                executionMonitoringStartAt: '2020-11-04 10:17:51',
                executionMonitoringEndAt: '2020-11-04 20:30:40',
                flowHash: 't9lgourasw1co1hyp4nb1nfyi1hjoia6nox01m1p',
                flowParty: 'wkk3z8b9d9ozzek5ey12ho1z9gjbn0oyggq8ez7w5kalzclvhlu0ujxg85ld4k51pxufqk877ar4me7iznfvdpmx5jj4cpaxdivc5xnlehuf8imwc0kbc92pow2u6mvzs6i9lx0zw889cck6xu64j1y5jlz7wh8o',
                flowReceiverParty: 'ifsqqtcmzio8ww8tz0a16rsizn1t8o4czsu1924z47ik56011ok68n7o2g9inxa92f2qrd0aoqt62jj6ugse485i0nk8tut9yb2hqaoy5cef4ixf4omnthgsyt26vj6co46go6sjzbtxme5ffd1isjh4lfff42dz',
                flowComponent: 'bbyy1kyd2k1qurdbmsk8k6latfg83j56061wh2c7xiclfvr9mftbnynsgxow6fxdivacd8zi74txx44tx99xn31xd72m4r81xtc7557lznsvwubshq66b6v855c4r36u1d9xoqkttk0d1yfwrroa7emax3lr9khz',
                flowReceiverComponent: 'x3kud43ynm8gquzrdagpmnkvqittai0gnh6nns9pjb45ktlsqd0yhyz59y6ohb2yry22fs4gftndgleez9bflp2vepyxy1aw0el8d0lnxeosyc8151b6956odqwoeozv6j6gloeadefzlypkinjvybs7a18gwxhf',
                flowInterfaceName: '9a6cwdpauq89uhyc9i0pclzpk94ybhpparucl8adqoq990ra6an89ij1gs07avm4lpto59028u6pro8c7ilbibowtpzx5ar3wda83ojcpg1xggr0rkd6m7lm75gpb8ys52q3s4udietsmwkms7t6oegipefkbekd',
                flowInterfaceNamespace: 'rp9mthi49vmu8n01p41hh0c3uietn4g2bm5hi077vgwh4ne5cqqic1vjk1pv1gx3ime9batan3ykmdn5a8c0qtm642e6llauqdp5l28j9ttcx06d9ydpm5d7qbbwsiwc26db45yp1qwlwmdevgahuz636n98pa9b',
                status: 'CANCELLED',
                refMessageId: 'd7dowze3vl07qr49mxkbljjq5gwyvi136s3twsgwu3e2gizz91ubl6uog6dwgbb1ct57ahy7l8wuswz4o7r7awbfdncklmncx4ykf6nf01prl63su6agqcfdi305k9sodxwfkeudtbmvpnaycawlb60fro8udbo0',
                detail: 'Est iusto perferendis. Perferendis quasi sit. Sunt reiciendis est aut aut. Deleniti recusandae quasi aperiam ut et deleniti nostrum. Quasi iste porro qui vel rerum.',
                example: 'e0b5s5sr32fv6rrvuyr06h8skdw4boqdkuu633dv2fl3jcnej3fn9g0trtlf5d60bg1s930sml30seccjn4tphk2zatbvmifuvvrp1jbaotcz5em0kgq72rx0gwb8kb7i2vvqxe2ot3xr05i2uuufsk1nvcrccg6',
                startTimeAt: '2020-11-04 17:30:42',
                direction: 'OUTBOUND',
                errorCategory: 'dcwp15zq2fbovyum2x12tfwqvtmlnrk91mlb6mm77amj6otsucvsyku381xa7vhbzfkvrxfah4d6vwoylt6o0o2lhm3jeisld69795psb887xxug204rjys1d4m9m4x719f3twjiw5x2fdktcwsg4dseesx7stmu',
                errorCode: '3isl3jqf04l6nwxwk24bp91foza1so3vm3v5iw8mmbyuryrcj5',
                errorLabel: 573425,
                node: 8714275158,
                protocol: 'ru327w2h0sm6rcb5opmr',
                qualityOfService: 'gcjtt3habycf4rgee1wk',
                receiverParty: 'wvxjwesgyedq53p2zpva4xorw8vgafl39dx2kytb5oi3ewbv5jib5bp14jr4fwm1p676wezcd2cy3kdtldxt7jiztty5uahjz2sy8ljywv982krb6gne4cd8ry4jxdi3jp19qp5twxqptlbk9xfdl032xws382rh',
                receiverComponent: '2fvmz909bscz19efnn5b1a6uqwbg2im6dvtowjf04uxo3radvepag6lpimdiy94z8stopj1fj8hb2t8g03m3m2km587z6dbly3b19k8q7y2z6ky1dm42k8fwafpitiy4zjx5pqe0qf4e59n3tlhrhctmztz2obl4',
                receiverInterface: 'tqkn2tc2ociimdvv2xr0w36mooilgbs1xibkoap9zelozr7aym6k5jjumi3a1myg8339wwgphkflbi3he6bx34czjhi1pjo26ypxw7qau4o93911ndh6lvpm42oxj2gckdm01k7kmsswhvu7ostsnt97p0q5lw9t',
                receiverInterfaceNamespace: '4hs5ibyog4qqbj2aajqxsw6ul7q4d3jth1npaza64fqnrr4ici77bcb0kl5phxlosmj27hwif4ba528il4q7jf9ajoypeo0xipasxafjys480vcwfrvufwfayhormvc6lb3ewvo898qx4ykngxtuqkn67y384xo8',
                retries: 5185701072,
                size: 7664715484,
                timesFailed: 7710773717,
                numberMax: -9,
                numberDays: 7505789942,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailNumberMax must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailNumberDays must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: '20tdpdjfm0qo6jrwm18b7np2ipk51y30cl2i0pty8h0lwo5v1w',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 'ash31dhnehc5jphjz92m',
                scenario: '6fqifsuyyduv0nj0res38solyf5jalse0ot4hi3w8n3q8ladcxkj4b3scv33',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 21:31:04',
                executionMonitoringStartAt: '2020-11-04 17:25:12',
                executionMonitoringEndAt: '2020-11-03 23:52:31',
                flowHash: 'hdhsv0o4b4cozzd86w7jgwlrqkc91vwyl4c1iwh9',
                flowParty: 'bavo97wlekmf0hjbcjspm8je3m5byl2nf2ja9boh2ui5xf8bl8pildb2psflqjlz5ytlc8m7hytwcuuh0g6nh6bxh7wxye5qe9vpbchk2p70r9hgkpn7nexvxu5d0pp154zvllxwy64gx74e5y5qpi2lzoqb2tpr',
                flowReceiverParty: '2i6yzyxu4lyyrvywofel1owh4kj0fbkmusudu85lgrpau9o2ymy7au4yvp23d3o3nfuhdvsja3vry2kd5tt7ipxr34ehrh9ag91zqy75shemdq13vs6lmqa0bajg4ruk9f78s7eioi8x985izisnbgd15umg9vif',
                flowComponent: '5i6prgks2pzzk2u2he9ual5jlwn8xkqyal8cdeem9h1s7ggjd23yfdgxvedf5vt17pb9d9ibpl1mj2dzw8qt60n140wvl4f5ujkud40tfveorscn1vt8l9ftxqkku1dg49vf1ua2rlnnwnjmn7dww08f6cw1pf04',
                flowReceiverComponent: 'daz42e7jy097t0cvk7ie0rxv91d1ljou4aiusul51mgz77meg0fnsh5hh68yssvym5739jzbf0mfi2oahkiq5a5397w3s4ug9wfidb7o5de60rj4wu7846qo0k6zxdq81ziaw6c3s3jz7oxqe3jfvaywlieny7zj',
                flowInterfaceName: 'sjjn9sv9qfxvdys941u7c200c5xa7wowfgfwvevf1nka0sjbh80q5nqme76g8i4rkp7plcxgtzl8pgw3ly9vusvcdoeqax9ycobut6l31l2cj5tw1dlsc8vpeyi3q979rz10zt18w1meadg0lbg9k3k1nrlmnr1k',
                flowInterfaceNamespace: 'gvmlw80ni0xu43tc0fy1o84tvz7bsri665uy4xgwrj3c06af6riaugiofv1lpk62swbarcgz1qv46wxhpqco93gktq5behqckadvp2cgb732t1f4m3yt0wgne2nc5zna6600ep0defhhncu7c63oe7zq2d3qzkem',
                status: 'SUCCESS',
                refMessageId: 'qznqrlig4xvufypvrv0j3926op8gfd3empuod90p9k7yaiu6scc7xxxneok8u6ox6gwk74325epnldsogedbqys2d0ikqv7mq6lbbd5w6s861mcsb10u5mft8ads6p2c7o8cuqca147qyqg3d5godyturcfc8o06',
                detail: 'Reiciendis adipisci consectetur id ea modi ut. Ipsa et aut fuga et minima et. Et sed excepturi dolor saepe aut et. Sunt consequatur voluptatem nobis.',
                example: 'qxlilqgvug7xdo5vsembr73ykeiep97tu2efbli9dfooxjwwr2n3y9dpjuez4dbsgs3l9tqtrke36mo6bmie0zztzb1wauhviv0owe5qkyhj3nutt3o230tbhu2cjzp2n57qoe4iweq0nh2nwfggycddskuh30ig',
                startTimeAt: '2020-11-04 20:43:48',
                direction: 'INBOUND',
                errorCategory: 'a2q5tdb4zivfuxm5au6a9hqb34dykcyw593gvg4l4d2y7u19qe0vz8hb3zomptusw0wnyg7qnrzo9n1v09vsrkszcin30vgrictca76ssjq45abztul7ijp4oa93kwmdt94korrcndp5lsvmvl3c58ekelrwzoxy',
                errorCode: 'macp96cpmplpbbzqpan6n8x7mt23fz2w1qy3ref9qz6txo89sk',
                errorLabel: 703875,
                node: 9093722274,
                protocol: 'uoaozodf8d6y0ipfdyfp',
                qualityOfService: 'bqe2vqrzuou5vtxbx2om',
                receiverParty: '386s64hvrxi99kjxr0s9xlq876mlqmo6kug8nbtulyhn312ar6teglujph7ade3znksrkxuquc2o9xhirl5dofnmqjsr0tbopzzvibrmyxqeu899261c9k5smy7kh7eou472yj44k8yxm6v3ribfz83emett47yi',
                receiverComponent: 'kivwrrgh2buixp9sowdcl6ohhmvdtztidr2rl8fe4j5h94uzf6oat0fr6mz51u34v68fal5jlazeo3z10g640f7klh9z1jzjyl1ar7jgrk9jqxveofurdy1vyirj6rwn8zomub44mfdutva6sjerre2irglpcta9',
                receiverInterface: 'grwuo4jjiox9kdym4zwkx8stq80ocv1vbb27zh5w4m33wex15dsostk8mxbczbu47torjtvzes0qk9agpu08agqvj79opzrimsd2kadfht8nvimwyq705c1htss8zngh0xjnsx78kbi764x2fz7zj60g0h76xicv',
                receiverInterfaceNamespace: 'qqrves2hw7c2s4ku6qceqbhkc1iaexfw2smy3lp8qxvtiirq11ufvu1nk2de8qcgxjxv3xqjy2g21l672l7odkk8muvg4r6wsb7afr2n1bu9e57capu29otifxhhfqhos1hqd7s4wq0x2igmhmdt3ni0hqmr3zor',
                retries: 6612208455,
                size: 7490940188,
                timesFailed: 5499297634,
                numberMax: 5767042073,
                numberDays: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailNumberDays must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: 'cleoag6lwvqc9y74ty9brihvv10ei9912x4lvd8pfd36myp9rh',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 'n7vnsjq01zm2uihf4one',
                scenario: 'xde3thami82heuciwmegkpcd0dyuqlgrqwm91kborjelxox1ph6otka32alp',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'XXXX',
                executionExecutedAt: '2020-11-04 11:21:19',
                executionMonitoringStartAt: '2020-11-04 10:08:34',
                executionMonitoringEndAt: '2020-11-04 22:57:39',
                flowHash: 'xxozub0etb15mj1gppy80burswfmdyoeb06jz43d',
                flowParty: 'j3xoqxrhqca0a6wq05xk7eguzxnd8bpdsqz40ehlrd6t72baceg84u7zt6grl4pei90cpjbktasof84a8azqfm4uq4osxj3zmn46d7xuxouhpm80v4rqruwcmmcxnch6j8r3sgqcqjzb9ztqe9o4flimx8i8bzwf',
                flowReceiverParty: 'pnuyabmuaf7cefm748tegnu9ggxvqcmies5mdkg3i9ml2dcimfujqtxxysev3of1wthi2i9b5b6c91xf75lfcoawkhu0am5mh4r23jffa2e6p2k68s462j81uwnbji1i6xbcd27gjgvv47pbeuxgmpmxkiarwxxl',
                flowComponent: 'ahrpzpl8vk676s4hyv8jrp4833n635362cq8wwrtqp5y27juoelup9jzgvucjsas1povr43viwg3sjitozl9i0d5ckw601lch74hevc5uyvln0xs2fm4t7lnxcludi3x88qas35q1vehoezs1sbsvz1rt8956qhk',
                flowReceiverComponent: 'c76zvkg48s1743wb5jfdibuvfrssjcnk75j78ds8ci8b8p1bck2dyff0cgx1qaxyqeb9bl5ja3n28yr1a5ltubdgow9ggdyzzz4soae48ipu0mzo1yi6w5rz45vi35cyie13y8yz0v2ch63rf9mpgyk0jn438t5s',
                flowInterfaceName: '62zmcj1a2dinuwpmnsw3kwb6x81jvn2e2280bc44jw4tnc5uh73jse86h6ygh0i3tm90jbaoexa6z21ofj9yk6mchmpp2y5jqbopnjdx2h3n8g1a56bj49i99z9frxrvy8wr1930a7exlp3wmo5vkep2xnsq8r0t',
                flowInterfaceNamespace: '18dv5dubpin1g33pe6d5nrsa10n2ywzwhrgq2k5ub1u368q3bsjt6ec4p5g5bh5o8zstb5mctuaslocrdf4fpfwhcdiek8azk564ela55u0hjrsqgc12ik7torjjan3m73u1jtai6afrhe4grw3mwm96i081q83n',
                status: 'ERROR',
                refMessageId: 'mmgjv1h79ytw7t19t85ahy8stpo2mpv370n8d6rtf0fsk5y2s0rfvqot43pfj4a412np2m3hjp599r0pch4flbvhflamqquqvi9odzbuujfwxhdm1ohtbrnvxw99p6wzsxn3qf9h2oxq7flz4kyutnlxp6lbq5n8',
                detail: 'Vel et neque. Id a et inventore ea sit vel unde dolor provident. Similique ut delectus perspiciatis aut totam neque repellendus et labore. Velit est id similique. Aperiam assumenda molestias velit expedita quisquam. Qui officiis consequuntur accusamus incidunt quasi rem dolor.',
                example: 'xuz4ws4icwqm8gjomo930gr6j2jw1hhnradeo15boo5nuv1mg0zzgkts58n67cp7jmdfus4t5aap894c5t4spj19uzv9b12lbutdsbyc6ph99idwr1k6us57n848rcv19o11woqtwu6lspri2p73t2cvndv96vae',
                startTimeAt: '2020-11-04 10:17:57',
                direction: 'OUTBOUND',
                errorCategory: 'poee68d07xggvp3ieumlop8axfujh63qtp69mefmyfcdobi00dws8ajhx5vvc05zh7wqj73b719s36jgcrv227y9jbktjdywl1ouhqdlcsbnk2mfhgodetrpyl1m0ky0flju0jpg3hb4mxss7wxtie9latnpzimd',
                errorCode: 'bh6r3g3rpf4q5aoseowe479d16omkjq81pb29y7q3446r8dqqa',
                errorLabel: 498088,
                node: 5042911294,
                protocol: 'kk9gu5ew93kwfrcnfukm',
                qualityOfService: 'qe3q8u2822qt6d1qewtw',
                receiverParty: 'sw72payx1xne210vti0eggz87i7bz4ij56cxs33b9hp5pbiwgiku574a4pbr9sxxj6dp5a8gkrj5g6x9bygp3jsl5t8hh3nze15vh9nzvj9y7nl8mnd1v91jgejjz90gguqpcljqt0cyqwt83w881zdr5k7fj5rh',
                receiverComponent: 'qjpl8k3l8gztdyq8ea3uhfw54jdxwgvjxmy7vzsthjb351t7qkhxbz621fe8v6engl2xvsgo15ia4yt8p4hus2lakthz0jw4ziygf50vvtkxgj7f0eqdf4fewz7ubt716jj2pp0rg359ojk84evkxzu1cycfnd0c',
                receiverInterface: '9e32l25ehi7ph7x8sujvndwn8152uoie7pu5v0fiuy4g2xhehx1ddl98ol71hw9ll6uh3o1etwo0wjoueooijgkwl99kpnmpn87ukyyjgvd8jod1or5co05g4mjz1q8wysm9wi8u5gpm5hey2ahcwvm259z3oosw',
                receiverInterfaceNamespace: 'wmfr17gbz12zlq5vx3rohbd5z6b97ala1trbdbnc7jr1dmyr512vmujw9qgpidf9syvxsmq45d7r71yqc55efd3lvyvbav8zfi43n6nvw9hwmdgdyz039nl0sa4d1f1a4pm2i07jpip1vq8hngsbpv6wa6preba0',
                retries: 2959127526,
                size: 8748633192,
                timesFailed: 3675899016,
                numberMax: 5159409772,
                numberDays: 4965937092,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailStatus has to be a enum option of SUCCESS, CANCELLED, DELIVERING, ERROR, HOLDING, TO_BE_DELIVERED, WAITING`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: 'b1dox7d8dcp8i2libyrg8f294tuio0h7un8yu8bvtkuu48hyq1',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 'mpn9k9xk6sv1u1mddvte',
                scenario: 'fnzydwhwxnebg0dssbvyi39p3ge4r7ing329x6az0rzj9poy1uujraqhjy9v',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 17:15:14',
                executionMonitoringStartAt: '2020-11-04 13:19:58',
                executionMonitoringEndAt: '2020-11-04 01:29:42',
                flowHash: 'd6a3ar9j7iknu2s7h9yjbk8ownt9n2jwz15emipi',
                flowParty: 'b0a5s9pdzlb4d1l6w9wa1vn7x2k1v1ltm4d8on9xqy32rcehkmol9twor3jm8ep6owqepkni4s2j3gkufdhavpusrtuilajeifebtwan6nnm7q0djcd6nlaz948yu7tlb7n4e0ha1ficz9x9u77sk9r3zwmksr2x',
                flowReceiverParty: 'e8dvxg2xyqjre46jpid5ru93nqxeth25447mzmcsw83ac4144ddv3co2nae9yjvn667y9g30pysq2atq02iy2sclujqmmxfey0z5movw0s1hkz4v1an7udkprztseko3hbbt3kud38dbtrhvoxvkro0n1meeqwtu',
                flowComponent: '6j0s7u0gvkw0vd5e3x791ogvbtbtb15twx75r7cak07llixshhxvfxo8573y43qjfxyohfn09apbdt1f1ol3i1pkjocpzxg260iy8moqics822863fwe2kb41nxt5vdkxk36l5na8yeijawp9vgzjxqbr83y359p',
                flowReceiverComponent: 'htac5o3kl6fhobi0ap4d3a5op28os5b3elcjguovtvinogkp9tx92ghyllq3vpab4q59heaiap4mpgglw6821cskacwcp32et5tqf2amkc6qq3097ao3lu6tzte47iitgvueiwf5jul22w6prvz6fbh49yemyq6f',
                flowInterfaceName: '31juahef8f5t4deuk3k2aqc2slphr9z4rirx3dyzqmht4gk7njfdokxtyq2da0jlpryhox1gt3opypwzsqm1yilwyp35otl9527sbrs8jrq03k6c22vux0zybl0src1bwrnkd73g0amsjhbgr74vq4ghjm5n2q5a',
                flowInterfaceNamespace: 'c8ev5l60kbm3i2z8cj2s7j9dybcelvliey8r5pvmq3jggtzwncchkii4t928ainxwyc4i0axbssen46rhpbujbopq6419pi21xdi1pdvyqvw2uuss4rpof0rxbzs1a8xl0i3ugrafh1wtc49pe3vazb8v15gx3qz',
                status: 'XXXX',
                refMessageId: 'ihkem11cyyn574g93kj7om6cnqxrouui87r727gh8bn9aukb5t53gg5w3as7srhgea81n956k5i07i1yjttkdz40h3hpezj5e1b0tgvoshfyllr2uaybuzh279lgkcxsj2j98uwf01w0siu4d3arra78uhsglrgp',
                detail: 'Doloremque nihil magni aliquid qui eveniet quasi incidunt illum. Praesentium voluptatem impedit omnis accusantium quod in eaque repudiandae. Fugit voluptatem eaque ut laboriosam dolores quia dolore voluptatum facere. Facere recusandae nisi sint non velit et rerum quos. Quis quia quis rem et sit quis minima sapiente.',
                example: 'ahyfbc813l1c8oh0hbxr4us2ig9moygkthw9gf288bu8kyvgvtezdgd1wy2tublfpgoea1gsq2l5b1t7klm6wac14zxl92jni53889h682zju3grn3kezlusfqonccn1nce9keg0tdr5mtmph5skf2ka5ihumlar',
                startTimeAt: '2020-11-04 00:44:49',
                direction: 'OUTBOUND',
                errorCategory: 'k26n3m5dzhel6s9el0g5gtha7ut88untggvfyry8z1btoomdzl69p1mf4jfcagd1zanoj3q2zf643rteqp499j1n3dxpts7w6yhxvygwr9c1yt723t12q3oitxd62721popna924n50iqedoyhatanm0u7e3yr8p',
                errorCode: 'xmsx7rssqlhtgqq2ah0yok48iaoiytrimqf8jvfrx2612bfzat',
                errorLabel: 842362,
                node: 4050808887,
                protocol: 'usv7por79fibokhxudrg',
                qualityOfService: 'v6ep4ab8xpiwql29qwzq',
                receiverParty: 'y9lcc70of3187k71crhqu4wgbx9an13plrd5vk6ff0gyqrsrimwsmfban6h9yy42k5ohvqdd06y6g20elejjjw1s57wyh1w62tjuka3ztjktgbkukvz34uiiecf5c43hwhxiyht2y80yf0sop82num1smj08w8wq',
                receiverComponent: 'cn39ktio5qjitqu1njxag2cmu4i62ybubfgfgfz9o8i929n31wyw878y88qs7lpce1rvzw7zip2sb2unto07gqc6gmi4sipnp6d3fwhru61p3fiw4guopkino7neb91g9ttq5kxng4a7to1uhgdpey9wkxqe82n9',
                receiverInterface: 'i4qf0958jpa6fzofrkpw0z6966b10yfjxigvy97hnxxy0wkrsvjqtgdpexnnkcnf42inn8p8itfuy8pkj1ned5xhteowlyvtevjzk34uzqmsb3yw9fzhwken4uxhs175d2ejrgzdqxrufjsippw72qsn8teo1f6p',
                receiverInterfaceNamespace: '1qpm4omffn0c5ra82nvg292njywqm3cnsw82u1dj655ja2x6mqqxr3zfxrga6dejtocumm586prvuk9zyyawwrlcizscims8aqeoiw6afcn7515evjn31mirslpis5jopjcql5kc76o26qy3zzr9w2bbqmgndczp',
                retries: 6232103658,
                size: 8899533774,
                timesFailed: 4933478947,
                numberMax: 7054266243,
                numberDays: 9732615125,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus has to be any of this options: SUCCESS, CANCELLED, DELIVERING, ERROR, HOLDING, TO_BE_DELIVERED, WAITING');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailDirection has to be a enum option of INBOUND, OUTBOUND`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: 'sbp98pseabq3b3g573wzs4jeegob235lagz3ekn37v5focnfya',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: '536yn857z57c4u821ql6',
                scenario: 'vwquqd2c1xfql1d2ag54ir7bdnijnq0ujwzceqjptu7icb521h9mylka5ox0',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 18:00:29',
                executionMonitoringStartAt: '2020-11-04 18:39:38',
                executionMonitoringEndAt: '2020-11-04 20:14:04',
                flowHash: 'xd6ftae2docjh9vglcfaf91ahqpz3qlyoaxh3q74',
                flowParty: 'agmtlfvdqr5fi31rhiucmi62go9g3pq2y1agzbo69dvhb6e4v8l8zujf79wwbs3hbpjpselv7weybeficfctgc3acov8wxgx1k7wk8xabppf14ryiegzqk9fqo1s8h5ul8kp4800xr2she0i8lmgvmff158vdt5r',
                flowReceiverParty: 'xmp51mv8b83jkqsyilzldoy0ix4eh0ofmzw4ssc6w36o62uksprp4b4m4vhnyyqsxx8f134ky37300o3ec27wq8k21v4v3j4axavzw49fgqqh133w737lh1zdmxgshbtkkovgt3b7tk7abfnpja5a5u94mh1k2hs',
                flowComponent: 'ws9iklwf3rr8h5sf8zggazdeja49f2438jpa5qgpiq1uorxwqgfw0zq04pjzgwlgv415sq17wp5cxlydc3cr7qslz4rskiaveksxxtbx3dmwl1rbba5bduwy2thmsv27151op3y0fj8r8qlybk3t0vzd6qdcouvi',
                flowReceiverComponent: 'z3bafu28n23eebguq6470osd794a5oqqzpesja00hbjqsu463z2hsvwq9oqo71qk4al79rv10vkpvzs8725mk515vib4tamc8bmbmd6bn5glkvwf47c386q655on3byweb28myvf9yyshhd85ohfk9xdli19tgr1',
                flowInterfaceName: 'yg8up432gj0tk2c5rkqha79x71wtcll6711ugbp9jk19na87x4h41f9bpwuyegrsrymao428g8009uxoktkqowodpqr0slr4o545e0jjiiu6k8aazzx61djxi1vl5s8hzcb0nhtaksuu6eqzyl6gzo9knpbi0r7m',
                flowInterfaceNamespace: 'dcoovszp9hommsjflznhenloyatwdxfjis75ubd0hs4qzdsgvxpq48k454dbxrh0g8c579zq01i7wgy989d8jh8c57lh991pbayul4vqxe44rnclx30adims70s72e561ni2bdzh3706434x83dt0gbdyrhr7pux',
                status: 'WAITING',
                refMessageId: 'zlezm0v72e0iufhzexzwnbhs0m7o2w2o20g2g2xwu4s0vgdql2824amzxoykr5778bi9kugo4cojjmgizixiwgpwh5ukfuhtevohaxqpa0f6zf4mhe1jmtmrjto5rpg6pfic8rrtogo8ystsaz3yy06fvm8u8xlp',
                detail: 'Quia omnis numquam a commodi minus sint accusantium itaque. Sit laudantium aut culpa quia incidunt perspiciatis quos debitis fuga. Sequi vel est nesciunt dolorem illum id tempora quis.',
                example: '8c02obio9xc85g4gr179j43jsknwb0npdfwgydg7chqunafkzjoyk8lgwd42z4xfwth8m4elfqyecjh38a2xvby1h2q5mtb9a02f0qj816q5q1lqmqvn4uc0srqz0hwmltp64l28x1j22gg8cibb997fay9gm6qg',
                startTimeAt: '2020-11-04 13:37:12',
                direction: 'XXXX',
                errorCategory: 'lwrlgce7hbr34a90n8amr9dfl9qnztc4yrqo9hbq81snwnmf90nvildihvplpg4htgfurqzittkw8ffy73fgaiuzw9m0ta6mw09ibcxl2c67pofqem9byab8319xe656u4a3bl4ahl12lvc1w65m5oziircdoo9r',
                errorCode: 'j0eykm6hs19i9ta9z73ss18do20bq6vbfjhtxu3pqj3hljcv9m',
                errorLabel: 517564,
                node: 2447308858,
                protocol: 'il5bav2dqecd38baolxc',
                qualityOfService: '02nhx4c9phbicboks3vr',
                receiverParty: 'fjdrtfw1awp12ylwfpppk5dj7w187u4uqy0pnsgdnat2v3tf51jq0bbj8kl8uwy4o47pyu1hbiwr55favri0nzj2m0gjs61lg9mulfh08ehiwelrcde8616gjugmywmo31lctnnq49sgb7tzq7pd5szq9h4gf6ke',
                receiverComponent: 'mn0vu5t7yvaxl041y91kf4ivvpshgx3zdabyddp7wwx0es72p8ibf80szix19kxjoq1dff06y2usunetnxrrffgv5a6mvy9ypmud3xpdin3j9nmeusnmpeg8kyk4fjxcaweklpxaq4j1pfjt7to2zv5iaubdl1kb',
                receiverInterface: '10f1cvfhtc8q05lehg9pc8zibqjue8ppkh51vl1g5eg2zkqmep96lluelza8krvive6zu537g3ft0a2o3x4pg2lmxntkiemohpsql358czcnj3b7o045ei3y3qn8wupmemsfi1lb3haf80jr6lcho7cls8dl1g8l',
                receiverInterfaceNamespace: '7qrbki643v5sr50kly42zoiz6tn31ievjloypuoifptm6dkqb6vdae70ravx0lv3h3fxmysqk8hhf5c62frt0z1qeuv6efj5t45mt3y0n85so5mhcd5yncdav23ojgfkwjpnjhkxr9vbq9fmmyg0vp0dgzsjymyo',
                retries: 9581231718,
                size: 4856604243,
                timesFailed: 8585258454,
                numberMax: 7620199348,
                numberDays: 5525932582,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailDirection has to be any of this options: INBOUND, OUTBOUND');
            });
    });
    

    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: '8sblbcseutlrs4sscwzc0psz5bkwykva15ytc7wn7baknv81yh',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 'o99vphgep5acs1yb5rcd',
                scenario: 'np78m15uryrp9pts60lwi3c4681jo195fkliuxqzqempizwm0n9f879ppqgg',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-11-04 17:57:41',
                executionMonitoringEndAt: '2020-11-04 07:27:16',
                flowHash: 'uetmcp8jd1u47nbe15auergz1s4mvlffxl5o20z6',
                flowParty: '8x85vovd0bmot4qy0ro7hqfhvx416orq3opvp0ydqyy1p8lbdhgp6tgphvnc0hey7ne0mf2pvnboae2ihl2zy0dfkeapmh6e8fuwy5o3emzcqr1u8fhdpi7721rwp3t6bz5wme4zbmmvkr422xjg624cvkdobkf0',
                flowReceiverParty: '72i1hx6f4uny3zow62mje60jm459x0oyjh4vuu9e2zd6yn6lxefbajwoy7dx2ojghi9dhg3qf9t2qnicxays5vd58jleax99zjujjg17m3v0mp9ftox6xwrdofeyynoyekpuz5c129tiu79g16mmbj4xum586qsy',
                flowComponent: 'i1x49ngeks804mq6448jnrvbhqbsz8mesm0ahnayeu4u07s439kxlkbiqorv4491nypq7a21cuja6ly96kck8wwmre73fuee5u97m7bwkxne42isaliyrt5q5zhlbl3qeujw0p29mdb3ru7nb2wv60rcg754r29c',
                flowReceiverComponent: 'yvhpv7dl7uklbdq4mmlb4atnuwrwm540jpz0gy5xts7uwg2bn8e8611883pk4gdfiq0ygqkz45xtnjrzi6ka961ruujlhn0emlrny5s3sknga7bk0ajmfgd6qyvk1tsekwnt5cuvpvmbu1fjutz26khrl5zpqder',
                flowInterfaceName: 'qg2lrhsbe3t4xtndmkm4zcsjkc0no02r2ebdpf8xdzazxwg2xzorli6v0tt3g3lhb8dzz460cqu5vq72yyco0t2dpjvoi7bwjtz52nr120575jbfiriic7hn913pd9eme2ity2g2u5trajqvxlj7che173kp1a9q',
                flowInterfaceNamespace: 'nmgzvckqcgvpxm9bko53zy43uxseqiaawdwyotp7jwerxxuevhyhtyovb7sgv28lpscti16o3487nkbjqlen2g2djdgkmyh2d7p21eshd8afzn415b2ledeqrkkop5ku1glfqowbw86khucgg6uwpzsr4ozndu6y',
                status: 'DELIVERING',
                refMessageId: 'wslknsccsgwz2xm97u22juojhewtjya59vomtw0th2cztzbazxkru99wrnlyhag04opli1bhzx015ls0ggrloi41y5ula0chpu0falhy7egckr2r3wplm46kl18fpy17zsgya5ttspi0oqnk0a52u5a7qkh3tgb1',
                detail: 'Vitae odit earum eos iure iusto aut facilis labore. Repudiandae id quia dignissimos eveniet maiores dolorem culpa mollitia. Aut vel autem officia quod earum. Ut voluptas eos fugiat voluptatum rerum omnis dolorum et. Perspiciatis enim expedita ea temporibus assumenda iste.',
                example: 'j5wodlxqqtwrhbr6mi49h4iymhza1rtod2wp5ykndxoqyczdruhh4eptvohdqmmtzpbgw8taldxt13cjxtoez9uj761aoeyf2cgctusx7a4cwxagpj9lgb786q1baptahy2hv7xpammggj37qjc2lxvs1jj4799k',
                startTimeAt: '2020-11-04 01:46:14',
                direction: 'OUTBOUND',
                errorCategory: 'iwwi0p9uh195e0jo2kw7ho8ca24vtqg1qngtkg8bqsjflncskfk7eivxxcvd0u6lwufyck9g687pggxqsmate15gknqca9mgqachny2ppxiojaenvltc8zp4qjgsgknquznmgi65cu2ek1gc2fx23ztt56exaycv',
                errorCode: '2zyxplnd4gm06q9ljqc1d7ww1q4j530mhm5trcbp3yzddeq7hq',
                errorLabel: 984683,
                node: 8165291459,
                protocol: 'e23059fxit53wcp772tt',
                qualityOfService: 'f6buwu6dk0epvcabexsz',
                receiverParty: 'tx6arefaazcuf9ig4rlypmzoltehka8simj5t2k0gpfiakougyeg205n0xat4311cb0fqovsnxwe8sewbkmrwnef1hcgi2r1bh3crtzktslq2o5rpp0619gjadjrya3lw5fg724qdaxcttbfjiqnqf8p3fiwwzod',
                receiverComponent: '6i439a3j1su91p7as7kypkj6aubcd0xkxosu0nx7y4s7zqrts0cxmmi544wr2ul2b194dj0cqwha0b5yi3zk690fzj63cqu3z93p751jkrtgdulwukybp4khkma5686yjzj3x15by5hfcm94dn9fmcdh34zcvtwv',
                receiverInterface: 's2meobgllnl9j2qo91bhmp47wz748yw6a3d9rl03n60n7pfhb640tlnunb2dvrl6j7pa72p8hs9ukl7tzq5w6xklis80irz3ygdatfjxt7omw73r38oaaa9p4zqs4s3lkyu538pj24vnnnonz1rom5bkpw5tj2vm',
                receiverInterfaceNamespace: 'wjlrl0m9npwjbx2enb5wnx8revq4y3x7mde15ktdzgddsva82l6pv8hb494bsf5ai4cc3l8vpytgrneihbxkpcvbn2oreh710gb0iycvtte09snryfdpyzergngnxpj03szf9q6t1uoznlktnbtpdzytnbbmfscp',
                retries: 4765474225,
                size: 6954196135,
                timesFailed: 1239133704,
                numberMax: 1542558065,
                numberDays: 2875850199,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: 'x7poty96q2rj5wl7yeyf0ucufb0r8cga5l7dravtfuc20vkyy6',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: '4ieqmu1emy2qckejkezk',
                scenario: 'wgc1larxo7a12tftysvf4r1cbzeky3lx49hardksc8t8mtg4cb96h4kolidv',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 04:31:54',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-11-04 07:43:05',
                flowHash: 'kvo9q4cxsdsc8jpjeup36x2d0kuuef7l5416i9qy',
                flowParty: 'oisycxza50tx44xwn4itg8odyf4rmjrf5djumxb4vaith1fjqv749ypkf85ephanedkhbnkwmbzhbhqrjqe4ov96sai49r34won1sq66ylixxdlbu7yjrib6we3g2arro1okodvgey6nbozvz827iqocorfm37if',
                flowReceiverParty: '5zsfkqx3ghebc8ahomh8d1ejtx7v1rl2y9n15kjjc7z8f914weyupsg8ig26l9drhvpxwdao50sn522ztbuhcqj6zs5x3zwg1037ixqqw6dwqqtva1gepxl1yrlpjazj7srcnekuqzwqdf2gbxawuojqm5061ucn',
                flowComponent: 'zk36jzr7qd3j74owsegw5fpw85yv74jsh7u3sm0i7h8jrq1amobo77rjp1arao8ysaewvhg7eodetwfzwx8bfl6fyhfceqyv2btl7i7kwu5rsqdxrt7o0pgzw8x7ctz8dskb93ok49x9vh8x7vd418z853u0hm04',
                flowReceiverComponent: 'vflzkm48v94uh60xm4i325zrt8ib5bg5efmc36ja0i09g3ao5nmxye0qry92s818po3pwxoyo8orm1yrhyy7acotqt8b039rhbc5rrbbtsw5ghca16az838mak45kiw3y78rr9ej3ivc7k4kh5r37sn749tmh8sf',
                flowInterfaceName: 'o2irypejbwug09473yb314u7jko8fumram7gqq04svn5uixjp9k9ckoflra8v4vht86osnaxp9v9z56lej4heuqd2hiadvwf1xl75hcrxcqw1gwooihq8npacb1hsdlnmjym4imkqwwevzhqdy2yw7ut63p3yx9h',
                flowInterfaceNamespace: 's19ahd9ki4dk8mp6eeaw83zvjfmeu5elj0r1tijqughthxo6a5v7vlxc0fnqi6hgw7vdfyo1lpbxzyuiuc22fli5upcs33beh48izf9tmovxzb4xoofk71bzknf3uy7c43lxu152c4kbgj46ejrebo3s62930tq4',
                status: 'HOLDING',
                refMessageId: '9qb8t81asur2jr2r7r2xj7axxwgfqgc56gk004btuux5iu4dityo15l26h89enuz4m4klmojogdqysm62u6yvurobri133y1s6dxih12gdl504gbl5nax1d6gawnb0mcykkpa9j7y4pi7yj4f0ljhzkppvhobyhr',
                detail: 'Ut sapiente quaerat accusamus praesentium dolorem dolorem maxime. Vel reiciendis est incidunt similique alias quis. Ut aut reprehenderit quia voluptas neque cupiditate suscipit et natus.',
                example: '5avhscjwvi4aij93t44f50lorcvom2bv2nd4fmw6klvjtzutkooyk7ulxo8rch7ja5xkn1bqd06qkzlfkvg89e28sbc1em37h02ufi5vfscf30z81fc1b7dijd7zamxxicwvne609ggce2gxhpdfwowcb989dbtb',
                startTimeAt: '2020-11-04 02:49:56',
                direction: 'OUTBOUND',
                errorCategory: 'kznkiijqhmzclzic0p2v65kgoevle4vfop3byl3rd1x80kg1la46unnjqp59ku7dp8gyqh4x05gwgxv7htxnaz3g8qo3n7ls628gbjr83n4d4ux7dot0scbyo9ngu3u24es1x65z4fjudkdjsx3asoquc8o3eai5',
                errorCode: '39gt5ssymrvveuslzf6jdez3nxlvdn4pzublw2zoanba4pfsou',
                errorLabel: 986554,
                node: 8130353296,
                protocol: 'i9837by243nwooc18qf0',
                qualityOfService: 'lp8lxwdc3ubhnizz8r6l',
                receiverParty: 'yg6genkokp4biptj7y8k58q7339wkhn1q00cimyndy8w2i1c41dgitu7qvnj7y44tz2scayeaosf6w3o2px1slrmdrsbqy2ymg2tc2coxs3d5o7bdngv1ojnf2n81uncbgpglue0o3i49556bu3otyjra0e0du2r',
                receiverComponent: 'ynedmwknvu3dm6hdn7noiylbuctw0xos5hkitcxvi6y6t5mfl3van7ol9nsnj09t256g3df16mi0zq2a4rh1684oz9eewdopxebvdu15cz19m6k6x33p4q9nc1lbzz9yffqyfnoc6tkixehfrf862vuew0xa6c6g',
                receiverInterface: 'p2s84qs1x3zxlugvzaj05fhm8u2ldplb7m0snbu8ecmf6ng3yjifbx2yju5omlldrg79ep3l54q1lvfworve1imt4tyampsjjk7eg1btl9mf9s9w5os02mict4lq33cubbd59uw4jqxsfc55ehoog1qxkwjnamk3',
                receiverInterfaceNamespace: 'zzmwau11syikqbb1k4vli15hor7o0l8ef6jz1l5ry6f9u4ncbig0ubkubmsbm8fajiy6nhlfaxhe47tvcum5y9fdbko4g0awgr23o8q2fgc5p6emqw76kbloa6q6w97t7t422wc8qwj1r70rn5fg1ecxke3tb21z',
                retries: 7603784795,
                size: 8167383619,
                timesFailed: 5459693970,
                numberMax: 4081575866,
                numberDays: 3651762062,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: 'xmpawyk8wrrurx9rz5mx35pumittzuk95mb1ao2z09qaaqlxjy',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 'm0y9p4nzhgadpanlykst',
                scenario: 'izm0mr6w4yxloysao2i144ig3xswyp6qk9hdesgn4tkb8ibasw6ptl03saus',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 14:23:08',
                executionMonitoringStartAt: '2020-11-04 18:29:17',
                executionMonitoringEndAt: 'XXXXXXXX',
                flowHash: 'k2cpllfetfjk4xa2g0prez97lv8ydvynrm6t6atm',
                flowParty: 'lsm55q1i93rzi2e1pdyqo9jx4vfc77ndxn6tvs4vrygkf2qoz22j04scgfdih1ko3bzfxp148c35ma47rc1b07noqbr3ixcbp0i4wlhzfpo412vtjhha8vq5mdcswnacih3iajbz39f87luu2yatnth86z3fqf9c',
                flowReceiverParty: 'n9sn0a2vmkowp049lyqz0a2tn1mgzf1bku80n8u5xks442edc87z1zs48zog39tdsn9yogdfm12utu1j21l9o0iefynbhuigxiplymg823ukr9ginsthut9octiu1voqgo3v0bbcrp30cd8zcm2mo18lv74jyin0',
                flowComponent: 'hdajrdszt4y8mgdlr6olusz91de9ddt8scif7jify1mp5bueljjs0x818exwzwmyya8jn8quwilpc6peamcif1h83hynl7j6l6leknpuwpavsq59g3ia4gx119gop60lewpae8hphlfom4441vxylup3hcg5fd76',
                flowReceiverComponent: 'c0xmtftlzgvfm0era7l0lo1p1ct8acapj1eb0a9gpvwqqw87ifn4otd7tu6spgmyvaz9jplvjrp6808z3bxb1eohyyie16l4j4djcmysgoxg9yftxauju17lpwe6axvz3dvlnudqxhh2nwj27jqu199wb5oo8adn',
                flowInterfaceName: 't7vg5lqd8ek7ufv6cremgh14bq2ss7mxhexv7v13v3dybme3egwk87xmr57p9bvs8jdvjnziiqgoz4z5eruizq78sq2hmxkuyrroxnnhtgqivq46auevmp581rhb6p8ow0dpq7nj0eoqgkd4s6vo0vlid4pa15xv',
                flowInterfaceNamespace: 'ge8cbp5yal98sasb172jx968z23gm1rzwjo119s3yoi4rs28257srsiruchbpeb18hspzgn4lp71rugb8vc1jt5zpqc2mpt4jqagfkp4g3a914dwgr8hbgxwtlsoar9ye0bukr8bndfljcbyf59bjtq6145zo6nq',
                status: 'CANCELLED',
                refMessageId: 'uuzsaycbyhuisjcrwghz0ih78wlnthff9fl0kg1g7sjhj59sxt15koc2vj5fng1tlck107vuxkawp961h7kxlxih32s7adwhrlx0qoujvzrydharhgfbonqziyhf9aza7l7r20phjhzzfzv4gj0wpki5p86xyg8x',
                detail: 'Reprehenderit laboriosam nam officiis et ullam officia. Exercitationem nobis ipsa dolor. Quae autem consequatur similique quis sunt est officia atque nam. Aspernatur officia aut laboriosam fuga qui delectus natus vitae. Laudantium aut fugiat necessitatibus vero molestiae tempore nemo.',
                example: 'wvyyx0mg12ub1r16c8vsnoamufdlzoax4xxxl9zb2znrq4l66mb100ucyb8ky8z9pezp3z6rf3iegfaovwkg2nhi649qeiypxgkmc2vu45bwdc4o6n7zhyqqro8y3v94a3qh20562rl35qrraqdp7wykmrlrawg4',
                startTimeAt: '2020-11-04 12:57:23',
                direction: 'INBOUND',
                errorCategory: '379y9yz5u0pdxcgy0l1ozrxq18vv8b95klyvf91049b67y1mxnp3m74elekscvry6bzvq3qe0z31te0kc28mmbrag1pquwtfqeed8ixtg4x1xjf6np81rv1evcsweye2iajxli57k1rw5i0yp5ftt0hwwja4kg0d',
                errorCode: '6ezfubi88dzre4beg1xmmzvdx4trhrfcqhv3g1puw2jum7o81e',
                errorLabel: 915268,
                node: 2891242555,
                protocol: 'rfb8vs8bjpzky9yt6064',
                qualityOfService: 'cxmx5zvf6ntq95b4xr6p',
                receiverParty: '54obkdkcaws2sepalrn0n5rhcm2hehpwai48hhn2j8uwto7uwnh7ac69kh4ywfmu00r03668rky3lenb2bj8ci839bo4k5xsuzd52lg651ttnk9r9h2hemk3jpa23d0u1cs8kqrkm24b9hpzrz050n7ce3ymiqrd',
                receiverComponent: 'vk2zip5cchtflir1tf8976pahei5j8o51bm8ej1bcric8omfyi654qt77tsabzy782z1z3p24z67otmd8jfs50ejuyrbopwjuvom43chusgtb1onuxut7k1cazv0qnfg35ennohs2n9c5pqiud59ltbqr1ndwprs',
                receiverInterface: 'nkv3qkijv7j2cd8btqe8e7t8eq25laiw39mtcuqsq7pa129oqkn53qbrujup5g7y6tlj4c3c1ktlp8rcf2822pa5n35lgmvnrkt3lhc75ehwxaz192mtunybcri6x9bpjaws378mze8pyyzambjy8zp08rj9c4ub',
                receiverInterfaceNamespace: 'bka54boltq5vlfox6esizw1gn2a28p0anf589qexjoc6614st3doyuaz7kkc72gx1skc5fx080nabg4g82qsiduu4l06ds0ufkx4h2n5wwpnfm2641hf8317xgket4zljlkgb5ymezi85s30dty4q1w9hexbmqty',
                retries: 5002857537,
                size: 7581235405,
                timesFailed: 9682743205,
                numberMax: 6402151163,
                numberDays: 1785238653,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailStartTimeAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: 'f0xlxezxoinbsl99s73lqp3o9awqptgk9binm3h9pdfffnty8j',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: '34ybjfpvl678bke7gdv7',
                scenario: '6g2roikrmp40icstn5rllk2a9hsvdtqzqtm274to4frkg9a11drrd5wjpn23',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 17:31:57',
                executionMonitoringStartAt: '2020-11-04 21:05:15',
                executionMonitoringEndAt: '2020-11-04 11:35:06',
                flowHash: 'fqbqq1m8lhazuul8b5m7i3d21m5kbiu1tf5wo7l6',
                flowParty: 'i3aetgl4ryj51v3gho1rm56o2jhy4n79noohrwzdlxy9n9pq4zh65950cunnzn6wukh63g9cbubqaz8190coqq3lsoh0wazelsq1w3n3k61rd0bammjmsq96kwn1s1vg4rj3o6um0su0u19mej1pcwt5umv54jfc',
                flowReceiverParty: 'p6qwrs7ccylf7l3zy95vqxptxexe4ry7o27ywfdq5kk2ll7wr51banj62m4rgs7app1akxt16u0d9pzk87qopgxlomwahu9gvuwzwmae2wdb0f80nsy208wsnpgn41fluqdvrxyfa7ozglqqjh115lt2toef3zjc',
                flowComponent: 'piv9zmhp4koatup2gj4grp0uaxoyvtup24zk6x72ayjxx145o5zm15j441gm0ikbaot1on3f2j5rvregn1t6pja4eog1whqtay8apsc77f5tkjk3opuro1gsi2qgauaym5abnqftvx5pclg59r2cn7ttgvx4wypd',
                flowReceiverComponent: 'c9ipx7jmzikf085t4yr1hle4hyp3vhp5kju2zt9n5y4y7c2mw09hit5aglhppswgc7xeepaiwor9j8v4zqk4wqhqamizkz8cb9d5gelrdp7vhfsfp04v8a3r2jk82vspvrbx1ux8xa0q015iopopedeubg8ge447',
                flowInterfaceName: '4zx8mzoonlm6umw35nh25hfux8e1bu6tvuvexs3eeq7dgctltjblq1ay4acos0qtsyz0qiy3u367ilhl2h9ynwgeq21hm1nlui7tx2rxjbba5bg3v049h3zj428xl3svyf4wfrnb80qrnaq2ocspsyfgshenyqx2',
                flowInterfaceNamespace: 'y8ovnrrodwecw08zezi9wpczqli0c7f7ge4p7okcme3lkp7o06zsoxai32xa49s8lyj2z50uzmyajkamy0bm9533v7jtmxxpyo6dzhmksb4gmdlppjd2r8akmngzh3j0l8zao7mqxzfd7xe7ej4jccyxjdnmjerw',
                status: 'ERROR',
                refMessageId: 'blhlh8tcrf74twlp22x1j25qtpqfa5rjp18qsf54t9fot7q8pmdgzixekpki406uibm4ilxvbth24y1a1gzszfhuf3f7ieyk27pm4ox0q2g94qb09pl25h5e49ayp4ig40buqthffeea69euxkx8chwcp3so9m40',
                detail: 'Dignissimos fugiat eum laborum. Et sint voluptas voluptates similique dicta. Ut aut cupiditate eveniet aliquam.',
                example: 'i63qthlesd77u45onbo4xh6ko9w9lbmmefo50wiol164kb01vjmsueppkvznnuxyxxuoa29k52mr8781rnee0j8u8axb59hjt92ybmwrdraaclqwlt5uqwfh5exdoknfom7v82berg3i3hdob5nlns6rencuqml5',
                startTimeAt: 'XXXXXXXX',
                direction: 'OUTBOUND',
                errorCategory: 'lsjvt320dg2spe7jehz5vcpfxc6j8sweuo0gbd7we4m94k5debd1umcacd6ne5wiiv0zppo3valh7me9mf4g96iq5ajdichj0sk5tpwbwhu4g519tt74cy63irhvwk2v00m31vvg1694l3kt1249jbksa1t2xowi',
                errorCode: '28ry7mvcfgv68ahnquzaeh5dn9vx04bfkvnesdxtsamiqofgis',
                errorLabel: 342847,
                node: 8165141121,
                protocol: 'bigrmaydhe41x9whwbdw',
                qualityOfService: 'r69rrfagp7ym881zqa49',
                receiverParty: '3ledb76illt4zfrocrgvaiziyj85p7pmtyag5l6ral4cnk6atnrj6jmh8q22flz9pkip8oyrmg86xk9hzwx3bmk5d9ys5ch7hyqflp8cgdjc1vx2fsna1xz1bgs2u413s6nra1f6v8evomhv2t3x2pi8rovcxak2',
                receiverComponent: 'ahgfptzijmyivi938xz7zk3rpn93a5zo55emeqaf1iiehtag0nxzxbfww0502crxwrqrypv3zbukmla4z94rgpwjuvi9fzwwraozdpqz3g3aetzqaa5sdt2jjoxks3d8625o7ovexepeiogl6nuaexedv40vui8m',
                receiverInterface: '4vd54m65q5yyaenv4beeg1fssginbw2axt2d2e9kn99z5anewho6vw4wqk05y2geequgvzlqx5fpp0d3r9hakeiljpdx2qkxqf4m8u0pdu70bdluvjk547rbzxtmsfhy5vqk2f3t7ks27re4gzghos2cii8l8q1n',
                receiverInterfaceNamespace: 'rktb1vd9s2mxiisz83gyms68kgds9rrgyjvj9g5txfkq1nvs9n3nrer9cb94aehmas1oalrrox1wpyqc9b592atdl4x7woq2c0afgf9hxvkqxtdmg8zs9de5p121d1n48fpv9oi550xjj7kjuzjn8xqbktq2kqtk',
                retries: 4086282566,
                size: 6042786918,
                timesFailed: 3539960274,
                numberMax: 2700857363,
                numberDays: 5074770142,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStartTimeAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST cci/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: '1ue9yu6bbf0e8898glhywmzxbmpllrep10j2d7qrgirf9he5mr',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: 'rmq8d45i9qya9gqkzb4k',
                scenario: 'a4wdxuxf7d9o1anbd4plfcxi3w4i7ltbf451okwg3q26q9fhkvanzanuyx8a',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 05:11:16',
                executionMonitoringStartAt: '2020-11-04 07:31:25',
                executionMonitoringEndAt: '2020-11-04 03:07:20',
                flowHash: '81eguvd0ms4vpqx3irkun5brdlhslunc4nn3bncc',
                flowParty: 'kd67rhc8yk8lw0o46433jdgo0atkk68z70br4r2hu43w7gvthne9y2emo0e3bf3rv90tpep4cfbyyfb899p3u3hze5j9gtsrlvbc3sl8op9afipqkh6a7hlsz7a95k1a1k745tu57m7e61f2ssueysydiriyhp7w',
                flowReceiverParty: 'fx5hy4oi9k3q1eg0119wu7isf5v30q0qvslysvh8ox3q1g2onl5eokcwvousd7wual3lynx2ijcrexms418yjfz5bt5ciavm4kdb6nqkr13x8ipnxon1c4xgfwwkxxgoe8oeesgtf4eiwzjw8273p1nc14v0xdeb',
                flowComponent: '2vlojsluci3buj1y9ru1ga301j539pz3b5ndho7sg1a9mgcdb8pf9t7280chkac7bwo0ek7nydqljiorq1wb1t9gskpo1lgq4z6cxc67hkapmb5t03ybsw08ppcgmf0u33ng0gof0c9fslr28wbvqz83v38o8w92',
                flowReceiverComponent: '5530cmrlcygxepu2catnf3p8mn0jun2kcgnyaz0n0pucx3rt70pbw9wn884s94amiwa7p6yonhbw8ddqkuf8d42s21gw7c0r2n7fweqw7d9c08n4pajjfgf0kgb01j9fpqueq21g5il6e11p2tvynwkagftwwyah',
                flowInterfaceName: '7r7w0hwnrbsmkpyt5qnfv52597o52gag93eblm4c9xz4ol1wulju5ehtyuig4e3tgnw8mmgxlvz1eyo4qydqa15jbfnv8baj21t9wyv8o062zycn0sas3s95083colc3000tazybmu2lwgx7gao3fjypepm5e0et',
                flowInterfaceNamespace: 'wrkqk9kiyrqvd6srz6ftllepslraxgcsc5r3iml762zedgrm731010zhuo2t59b9qsm7d9u1vb60xgk6e8cev0bp7m5oucrmv43dk3ltsyk8n12mfkv4dxbnxuxmboyxj1jg3vr6f7ualfx96at1aoz7e65c9wxn',
                status: 'ERROR',
                refMessageId: 'nidvjpr612jd9dwrhkrxxj13lb626edme1b806gxxrjeozclij3l27jg6az13f8grpualgunilwa5v9kr492ypn0wbpn1jz7ubj4k16vof52ndcodxdphwa6c6ew60z7gwdtrukh26ix1tgzgjfgr5tth1xkmxii',
                detail: 'Vel sed ratione assumenda consequuntur corporis eum maxime. Nostrum omnis sit labore perspiciatis facilis aperiam rerum magnam. Modi explicabo quae blanditiis nihil quis neque ex tempora voluptate. Dolores ut rerum repellendus vitae et vel veritatis. Expedita est nostrum. Rerum illo sed hic laborum qui non.',
                example: 'rhmsom5s9wjeyh926j37t02cd46qontk9se5mh8waa83uij4g6hyyl9ktkt6yzb2lewtrl4dyacdbqiygm277mmtfycpiobzyvb57yf93m4nic0340b3g04qrfg59gk0ejd1q5bg7iubgrdd2i7btmczl17p68um',
                startTimeAt: '2020-11-04 12:07:59',
                direction: 'INBOUND',
                errorCategory: '3lguiw4jvqu8hy5997s5o7feq4ylpahinn6pwwy9p07848es61d02op0xhqhmg747fgam9lxo335qrxmxszfzhj74ge8koaryfys9un3a0hwchppjsc5zmvaefrmywwcbew1yztuut6nijfms9p1vlbqbvlnhlm8',
                errorCode: 't4gqduojlmozx7ikviwbe5ezaki1toscbwi9tdx9ro34b3ct3f',
                errorLabel: 483207,
                node: 1315338371,
                protocol: '8kbkdxhz6zyrmgnxneh1',
                qualityOfService: 'yitbfsxz4dpedjljn8iv',
                receiverParty: 'ibofa6bvlb2ojuv2u9z8d8ljzfa4s5jrqbpo66lbq29nghgt8ue93a8s52wxprxqiucinzytj480q9lzrnqmk4lfu1xbz6fegwzijv9qrdgxes2aehohje5j656mqbqw6c0s5mhc94jcthslowdvi4fr5flrve53',
                receiverComponent: 's62msthek4cdc7falovkzhj9l48rc1i6wj2s6llij85r1ppeixyk2cyzzqsejwkveo1bxq93ixtw4c74ozvs84inwnpdy7n52l18sgmju9kvi012pk6s2si4pw77nxzmcqqfsvo6s9m75qps9w9unv2x541l30xf',
                receiverInterface: 'zdbzce7hmzjnq7qzrpoo0g7mohi7m2g1fxl2cf9jnvxusdriqrjqdup41kqliw0t51wb5yzeoww5m456rigndwlqtlschtkpyjm6q6fnwicuhzk7tydd98iulqpklk3wwrpkmvjmgmya688gz0sv5391n1eu52ru',
                receiverInterfaceNamespace: 'nmps1ktiskahabk647gxblh9bydte1kjxtkmojn2zto0g7klaf0sv1brtde0e2wne3xo71aa01i1sts8wn0vq1n5j3lilu2ur5ycnsdesliakdjon5xe4ooneba5lcdf0llbvxj0rxqmxo8yg2o2achdacic2knb',
                retries: 6156883680,
                size: 4701932257,
                timesFailed: 6612316790,
                numberMax: 9065027080,
                numberDays: 3275647527,
            })
            .expect(201);
    });

    test(`/REST:GET cci/messages-detail/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/messages-detail/paginate')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    offset: 0,
                    limit: 5
                }
            })
            .expect(200)
            .expect({ 
                total   : repository.collectionResponse.length, 
                count   : repository.collectionResponse.length, 
                rows    : repository.collectionResponse.slice(0, 5)
            });
    });

    test(`/REST:GET cci/message-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '51190073-4b0b-4e23-a29b-bfe50fe946ad'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET cci/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '7f4cec0c-1a20-45fa-8e39-b869883f6895'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '7f4cec0c-1a20-45fa-8e39-b869883f6895'));
    });

    test(`/REST:GET cci/message-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/message-detail/d08c8721-d8e3-4116-9418-890e9cfc10a5')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/message-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/message-detail/7f4cec0c-1a20-45fa-8e39-b869883f6895')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '7f4cec0c-1a20-45fa-8e39-b869883f6895'));
    });

    test(`/REST:GET cci/messages-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/messages-detail')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT cci/message-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '4875404a-1162-4dd5-8a36-a971c532e552',
                tenantId: 'bbb348cf-9604-494f-84fa-79851704d228',
                tenantCode: 'qsgnqw2xxsohqunytpgznghlf8jwnt8n3peahvu5rvcoedy3kg',
                systemId: '8fc68c22-57f8-42a5-b8ce-fd08d2014807',
                systemName: 'tkmelfs1wbx19xpfd2dv',
                scenario: 'k6u809mkqqr6eya0gmn2eriv9px8u8pwto00lmwrgn3fm4tl5w59pwmfvvka',
                executionId: '8da315e6-5ca7-4a16-850b-7dd4bee71722',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 18:58:59',
                executionMonitoringStartAt: '2020-11-04 04:48:50',
                executionMonitoringEndAt: '2020-11-04 06:21:16',
                flowHash: 'r3vrpe1as4k1cpdsgec12saorh5llglbklb49ksv',
                flowParty: 'hfnz571nwd7hf96vrzgkwbm89yavvq4by1zuf5yqab7c7zv8mg8krf7v8zonv7z77y9h78b5lljp3w0wy9d302ztpdpbyl66m98u0ruwh8g181o5ztr6mdhldytewxgpnfckchx5x1ffk0r3d4zfphb18g6zjp4d',
                flowReceiverParty: 'b4m6dyygb8j6jmpzorh400h6mvy3mq1ucv6mjkhwse13c20efn2qmxz44sfpsuhb5tif5lonthnpsrw3k3p5qfycx8t5jlgju6hqigax0e5hnsxt88v9x7b70fmqrglss5a40j9wybyec7yr1ef66eqpuiq0ynh6',
                flowComponent: 'i8ej5ssr9labff08voi01ynzqvu21p5hapfk1o9idemy1y4rcpmpcedohz9fc2xlmq655yelxb78vkph4zltqqfrims00j2jtbxlt216rqtsnpoo1ddj1qy7wsjbrxd0kjebb1inunk9vs7h50jjioh3upkt3shc',
                flowReceiverComponent: 'bw48g6x4m43vzzr9l3osdft5qdjtwlp99k9qdhzhs8fraqhku3en7wbclvaqgiqccfr6gcogt3e77snbfk20fpitv3o7g397eubjxpigobb223p0wj6zule8sajxj0v7gf10zqga32dkxpmggvjd43cndo1vlc4s',
                flowInterfaceName: '131cekl03sa7xdb5u50agoz3uessl77zov4dsi9pvxufmtdkvn5n59dc5jzgiarr4bbuxic6u74jx0cal9vw1afxndpqr6er28tcduzgnusqtuj0mp9kar4pas67q26qhblzh3vcii8hohkjbak2dgfsk5mvgzzg',
                flowInterfaceNamespace: 'vxbgay3e8szc7um6e4sjmj3m1zmqb31ptd9h0htoelg5bz6ukqezvm1vo2jnr1u86s8rqlzmrc07bpmaw7n7csi7ll6ie7ixmjejiwg5ehvss3nh0knzvm200b4iw8l5m6na0uymf1y7gi9vupw1wmyquraxmlhc',
                status: 'WAITING',
                refMessageId: 'mou48ok7ls71odoay9r3fl1y87zzx67p3299xxhvqkd3hqy4svo40ga8le1kf39nmmrq72stxhgqpixj6ul7ks7fk24pyw6gi7nfwvoxlwyf32vrrq82lsbpc9fvmvb5281dulsjqgemwr27nurz67b1urx22plu',
                detail: 'At illum ipsam nostrum explicabo. Et et similique sit aut eos ea aut. Sequi in voluptas pariatur exercitationem. Iusto reiciendis voluptatibus distinctio qui sequi id esse. Libero ut itaque distinctio consequatur aliquam. Suscipit nam eaque expedita repudiandae unde consequatur reprehenderit eligendi omnis.',
                example: 'njwq3hg28mvwz7404ybwhtshl7698gium85kc0nesa16chwackg6n4ybf6h660ho8tjw9ly13qhi3g9bqf5013ogjr2w9gsm6ivc5106hnv2xabyt3o5wdpbu9k42jufli354qon6sn3ik0x83rpy3teg6d4ttbz',
                startTimeAt: '2020-11-04 12:14:43',
                direction: 'INBOUND',
                errorCategory: 'd8ifvabfalu0jfjosvwqrbhj9adjomicfxbsii2huuuaaczgd9thz5bg6v8s971dgl64vx5onyk4do8xa1ha5ui987q4nuo087lbp4cycm18m9ihk7lb61pcxy9g35o7lwwnl79wnjphc78lsaiubmfcx6le2g17',
                errorCode: 'm8nght9rt52tw2igbp02l8xn3bhudjjy1pivws2jb9fiu8v7p8',
                errorLabel: 689138,
                node: 7500639769,
                protocol: '2uyyy51ow0nt3p068p7r',
                qualityOfService: 'd2zo7ps103ebmro3o02k',
                receiverParty: 'oa3o31m4hnpbutci73u1swo17caw5aefuirj1y7k9ffhatc09oinevo82rwjxdjdl6ee22wby48qwx265l9tnuyb25upmuddis04fpg88ry3f8oqarho6hexksceyj76vtf40nz8pq6fyh4hnnzb0zyi4kpjc6lv',
                receiverComponent: 'tovdsvf1r1dvpd22gvilkx4ugr8d81igalfoaiuhagynwq12ptldeitdr4tvonfxll8fuertbji78d6jsf4o30rr5h6pr0d8gundmus391g6i3wjzfqgcq3w9kck7cqsqi7tdf21dughai9w81kk0zab2knvogd9',
                receiverInterface: 'orhbca6f481ob57f628s0njczkm2wd3a44kopzaiso09tnedlowdt953zv8m82lsnvgqknu3pjzvdgfwizjqbcadhu9cx4t30bp1lkvrjre0w3b3wkzy5t6s3f5ftsmnw4jix1dj8wzei10lnt8jszj7ir4dm6n7',
                receiverInterfaceNamespace: '2lgmp7nndbqohoqe2j3a5njgaxcar60rw6pnwnn9tph2lz3lejucxk8gjy56oo8smeafc4mse2lufch5mqdz2ubsv1yibhtbsumyb7xusj7emjkix2vhtfo0wzqt01foyr0gu3kk4zb28mqyny45q7bt9mb34fns',
                retries: 1510974840,
                size: 1024333766,
                timesFailed: 2939509869,
                numberMax: 7207836001,
                numberDays: 6617088658,
            })
            .expect(404);
    });

    test(`/REST:PUT cci/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                tenantCode: '9mxambfjne8z4q4qh07548y6s4eicx3wro2o1m5mkobt4n4a7r',
                systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                systemName: '8pwvudwll2etei2h9pq8',
                scenario: 'x5o5h8opdby0k3fuu3oflznx6zgd68zgjl1lxp4ytohug0j19ogz4tn1ujgb',
                executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 03:58:03',
                executionMonitoringStartAt: '2020-11-04 08:20:42',
                executionMonitoringEndAt: '2020-11-04 21:54:21',
                flowHash: 'e6rbp8lkvkmawwtvyba7q9a4n1oc1whgabzxx0ig',
                flowParty: 'sk7r7ypph1z5y8pli2m7pgmehz5c9trwsj01ytx0ou26wu0q67xi0ry7fk5wyr2b2gnc3j4eshfimpoh2eljxbi1iptq5tficb8zluvf4ordjt3reijfo36mlgqhxieky5dxfkrdydpv77t38mm7q8y6xf6lt17b',
                flowReceiverParty: 'nkqpow3bavbbxf9lqq89h6oxqi7do6ytejcucto47rsxp3og5dupuqsk82818ikp5j5se5jgsn2h7t0i6ab2b364jntce2o44tgme6l7ekinl5knt2td38m5xqc4wqsyyqz1vskjzgjvywm8yyi5c90pubkc8x8a',
                flowComponent: 'nz9g23epsv5xuxe4lb0k9qg410g9h9g3k65rulpcz3es0wo47d211ljaxsttspsh1asmmh9az14wqyow3lyjgtdpq627xkpktsexakv7uft0xwkxlg0ym9x3sszjeiigobl4wy5j3nxwrqoein3inoijkb6mgi9e',
                flowReceiverComponent: 'y3vq36ls8x9j5r87pjpsly6z1u2fcmcohc3yruc9d0s0bxgol9lvbz0lq0ftr3k8t6tg7i28mbb2mn40vpo7varcx8bjocytimdh8nwlv2kpx134c9cttwg0o77n7lm5uf97xvg0q8kn8ya6s7hmh9uhj2vncfng',
                flowInterfaceName: 'pmb4j0juaxspt7unkjylcmadxtdczdc1rmyfzw8dpqpnlbz3t2erjnl5un510nplwg7pxh0mwv75f43vnqygjk8r5lau7tz0fxtz74ril5vkljzh1v3zugu3pizw4fl96u1mbkz5dbzkntsyj8rfxkdzu24yre5s',
                flowInterfaceNamespace: '2adqvi4cpsxd21epu0jichvtej1wz03rvvlokx608lzz76qq51jpexfih0qrxlon8i31y97f61cbi1svvv5p6mc67562gxbmhxeb40zwrtxgyrdsnmi3nnfc006my6u99khm8m6o8amx6org07dx6a3rrsv4ltt4',
                status: 'HOLDING',
                refMessageId: '4xkxwtb0fl7zksj3jd3f3kjhuzsv9sdtmz4liwnv6ainrt9bmpqkbkaw1ihrmjiy9jewm2ubsweevwtbpskuctc00gjgnjuued0aadqv4ci7nqh1u0ijwk2kw9vd1l8imhhudxbamfjpkqor6to943dmogdkzs9i',
                detail: 'Repellat enim fugit rerum distinctio porro. Laborum illo eos aut. Unde laborum quod id corporis. Atque repudiandae facere autem nulla at veniam aut alias. Nostrum quisquam sed rem beatae. Animi delectus minima totam et.',
                example: '6fored692rqlv9oheeuzis6uu9eikgxydnk7pvcwi6otrhrp6ma2ba2fvvvqwd2rlye83lufxoitozv5yrs62hu1n0mcj8npt850f1w3wi467jxkyohyvu3x6uke3s789alalr0tmspbf9cax1pmo457bpm6gi7v',
                startTimeAt: '2020-11-04 18:09:25',
                direction: 'INBOUND',
                errorCategory: '015krivwqu9w2s7ifpjzn9cdoq76h0lttshgq6wbs29ppm7q6j6elhpec1qlr1djs6z65r99tst9pv0gu0hhusfqbswfi73qmw72sgp783omh7mhd39tsaxjp9stv4xnsg79wmk3u8v7btorglheg5nlccjdvayq',
                errorCode: '9yb4526nw2k0zj591t1i6i0qko3kkq56fb7jxtgkhwvcms2zdx',
                errorLabel: 984591,
                node: 9368320078,
                protocol: 'hcf2khxo9wepj5yg9qmy',
                qualityOfService: '4eazcigvtu3rwd7y7bk9',
                receiverParty: '7jh04t3ygma0zx822fxbxu4g2oknogsztp0g4srgbqn4iwr5obghiri506k0cgb8qx0x23y47o1pvon8fe2whkxqukhescweuhdvmfktq9kxvlulyqt6lhxlnirlcd2w8vfe3id511b44zev47i3rlzxihmjyqmm',
                receiverComponent: 'tszbe0m764rmi6gor01m78rxh2f1pdhhgr8amw5z4t5a38mepkfdw4pmv1zk0thc2nbttgenczuhf5dbvzeix447ftbi1kh4zt9gfjdlj9tywtxyzosexw28a9veier17wo8zxssqgh7vgbktyi0myvk3ctoqjro',
                receiverInterface: 'myb3royj9grfqiyqnya9fwfrqaoo5eaisgappqdqt84ji021d5jfgiouodmdzq1pw6irqjpag570m099ke6lgxnybq1ww7189npu96kapa1stfnyri4olxhn8x33n9io7shw5iog1463yeeapfjikjbllx43l97i',
                receiverInterfaceNamespace: '3hy20p9dgc7ffw4t7zp4yvj5y9yzqjmv3cd4vlpb2nbgniejwwjgtqn9r2dok1qqu9xdmfv9fwrfbpp16pggim379hzk5ityp0b07xktpyr2x0aexwzus1vt4fci3nvmtxk6la7klclj2h8qife3a9l3ujuxisbe',
                retries: 4363281203,
                size: 5056923490,
                timesFailed: 9271774651,
                numberMax: 9350956336,
                numberDays: 1297315420,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '7f4cec0c-1a20-45fa-8e39-b869883f6895'));
    });

    test(`/REST:DELETE cci/message-detail/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/message-detail/a3532959-d552-4863-acd5-878bd6c3aeee')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/message-detail/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/message-detail/7f4cec0c-1a20-45fa-8e39-b869883f6895')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL cciCreateMessageDetail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateMessageDetailInput!)
                    {
                        cciCreateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
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
                            numberMax
                            numberDays
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: 
                {
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

    test(`/GraphQL cciCreateMessageDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateMessageDetailInput!)
                    {
                        cciCreateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
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
                            numberMax
                            numberDays
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '1aad79f0-77b9-44e5-8dbb-1fcc1d3131c5',
                        tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                        tenantCode: 'w0fn3uhsvduckvp5wu0durwcggbk0v0n1ycd1hzwp8ic5i5mxr',
                        systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                        systemName: '507ctnnn12ze1uitm4hw',
                        scenario: '38dn3na9t9xim75k4sjd8d4ilzeh0u69qnebxlop55g539s5fy2pdunxpama',
                        executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-11-04 03:02:14',
                        executionMonitoringStartAt: '2020-11-04 17:12:18',
                        executionMonitoringEndAt: '2020-11-04 07:11:54',
                        flowHash: 'co0zzn7wufg642sa4qi3ojk2h197bq0xczjlye0m',
                        flowParty: '1dsrkhtgs50g459nb485thi9idlbcqscdzcr2uh01wgy7oq2uut6l5i2d6a2ce3i7kvlwageerxbb0as1p7qukz7roz5uqwdohtkk5hvccy2xc7omqdshtbk0r537imyg1znkg0q2j3v07r81meluhes0v71dh0n',
                        flowReceiverParty: 'ecfo1ssvqjtfjya5uzwmvbr8ko49duujabu6ybuuj9mzwobz0ewyij6wlkddvoeqosyzfjl7i3s3p7p9tjm3676wyl8wodpek7jxxkvkv3n7thke92qm5ibqf9zzzbj35341lmh97vkexem09z764o7kei86genk',
                        flowComponent: 'vma295y8xggoqhylbm1vsowm71bstgi6ndvcp8a4o1mgsn5t4s6gsllws2t4x5djnon8aoxctj1ogv9kc6g2mdxkykwqkt9xbxr20tkv7uvrb20e901vitnph88ypx8vt4mnd8jykt0oor0h2buxwjgyv4p2v29d',
                        flowReceiverComponent: 'ep6kg4gp6f0hq7i2ara4rdico837ghke8yahbwu084zibs144oneiyhfnz0pa9myhzj6rmwtbu1dp674vv4l60z1wsg6ghv865wwrzcahlr2pu2orh5jpgc946ugcj1f56czxezi4orckjm5pf7ha39p7vy2bzcg',
                        flowInterfaceName: 'y17u0c7yoe91y516po0vyifg5q5hdqcb0vz3obcqk160ayxi0h12yqkxyhi1sndqbvai2rr390nrord5s8ddj0gvl35mfkuc79n7jjmthruafrnp5g802yt7zrsn19wh9m6mtyktuwt0c4cn9ihebswnzse47gqi',
                        flowInterfaceNamespace: 'j5qnlt1lph8gf8srxxtp271ro0uqpzkvqfrgdo7t2ls3xx7c79zb079wuexxrmrlmlcmmmxioqnacv9lkb3dj7fs22fzv7u8ph8c8r7s5sscj2tn45b8q7tvouq073n047sq080p5rfipping8ao7f83729h00ei',
                        status: 'DELIVERING',
                        refMessageId: '0fhnlgnut2wgh7odhpqpxum6xfv1kvvff5g5tceyev56iwxogaatgjt6b8d2jptefy42x0gpen5afy9xb6ycagzvtkhrbztdjci8in8sopn2m9h02rc7uy6kjcfk281i0oh78wvrhj758ropa3gd847mrhd443y7',
                        detail: 'Illum dolores dolor maiores aut quisquam quo ea eligendi repellat. Autem occaecati non. Reprehenderit veritatis illo est natus architecto. Nobis adipisci dicta ex nihil quis aut aliquid. Est repellat commodi sit.',
                        example: '2jmtxp0lftbayfllmrvggqylcey2w1wlfmn9iycey0japsr89gqmgw1pysiepuy8ds26ek7q628zlui98ddxg1mfbr11cnmisxapap5zih0z8cq8ser08wx1f1w0aypfe2i5a6ltx0r18fzl1yuajfd5zy1z2743',
                        startTimeAt: '2020-11-04 18:17:16',
                        direction: 'INBOUND',
                        errorCategory: 'mi8vmfq9svj8zbg4mu6w70xejfst01x73vfnq3hdh8lth0jc9grt0y9r1uy0xhjcxjkezk24qcjse948m29r15utmdsscnzkllwmkreh8n27xhin8bx79vyqcbsvhzxev1226fsu74l7wbpy8ka1oleujtv29501',
                        errorCode: 'zolil03gue5fgszr56gm7pfli6xlspje56ff4vnt8s1bu2z742',
                        errorLabel: 182831,
                        node: 4388030252,
                        protocol: 'y1sfzmdca9an5vpm9r8i',
                        qualityOfService: '1wt9o1ffshhvp6yi7qoe',
                        receiverParty: 'ha1bgw5z0zalnmvijckzwdbv4klrcw32tc1zvb70vj67ep12hgehaldwvkh1xa775ycnxwkabkalhytpsjqlpbaajwgvbov5am745rkv0v080meydubqp4j4gte2ewd5dxdac6spvw1npu9609rioiic42vx5h08',
                        receiverComponent: 'wex5ex7j4hs1qhwxtzd3gxs0kg477fts7jqnfvj7n9hy2bhfancdj6nvy7idnvk7whdnsyq1qvb1tq1gd81m6mrool6u6ylpf7qusm8wly56s7e3iiltgzbmbhbed2swr84b8xbodkivijlflwxjmzp3fbiindf7',
                        receiverInterface: 'jo13da8coxnve6qoxdpt83fx2em9bs1ovjx82xyqh70nj5qgjijya24cur94mnyyiu3zpvwsdlxg9wsrnriqcsqrjd3kp4kkm4mbl4k9i9nt058kw0k9rhj6oy665cgbxl2mc73zbqv0nkdoh75yh8r4zkxai2ju',
                        receiverInterfaceNamespace: 'cffzbjly5jb5njb96vgn6ohaxfn04zl375v6wh6bkb8j8o6fvbb9t9jwr5e8usbcqqmfgk0y7gbswp112eyjjud2a3e72jcd9lajjddq0cp8ll4ds64m3wvar74qruw7nl3vvsbwakf3cniedfu6a2mj16wb46ns',
                        retries: 9796477793,
                        size: 5335940947,
                        timesFailed: 3625854511,
                        numberMax: 9297817921,
                        numberDays: 2351884308,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateMessageDetail).toHaveProperty('id', '1aad79f0-77b9-44e5-8dbb-1fcc1d3131c5');
            });
    });

    test(`/GraphQL cciPaginateMessagesDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateMessagesDetail (query:$query constraint:$constraint)
                        {   
                            total
                            count
                            rows
                        }
                    }
                `,
                variables: 
                {
                    query: 
                    {
                        offset: 0,
                        limit: 5
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciPaginateMessagesDetail.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateMessagesDetail.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateMessagesDetail.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciFindMessageDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindMessageDetail (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
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
                            numberMax
                            numberDays
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: '1a0ff178-7a84-4170-9fd1-5b0b592233b3'
                        }
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

    test(`/GraphQL cciFindMessageDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindMessageDetail (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
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
                            numberMax
                            numberDays
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: '7f4cec0c-1a20-45fa-8e39-b869883f6895'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindMessageDetail.id).toStrictEqual('7f4cec0c-1a20-45fa-8e39-b869883f6895');
            });
    });

    test(`/GraphQL cciFindMessageDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindMessageDetailById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
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
                            numberMax
                            numberDays
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '9043409b-fb73-4d90-886c-e4ad35a3592f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindMessageDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindMessageDetailById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
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
                            numberMax
                            numberDays
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '7f4cec0c-1a20-45fa-8e39-b869883f6895'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindMessageDetailById.id).toStrictEqual('7f4cec0c-1a20-45fa-8e39-b869883f6895');
            });
    });

    test(`/GraphQL cciGetMessagesDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetMessagesDetail (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
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
                            numberMax
                            numberDays
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.cciGetMessagesDetail.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciUpdateMessageDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateMessageDetailInput!)
                    {
                        cciUpdateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
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
                            numberMax
                            numberDays
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '6895ceb0-e825-4e3a-a476-1db04eb16282',
                        tenantId: '35f24a2a-25c4-4bb4-b41e-4660ebcdde48',
                        tenantCode: 'oeivfyjd0ufz0ai90tfr3wlryy3dkjgdf51kitzk0e1h0s6kxj',
                        systemId: 'de44c83e-66db-434c-b3ac-41a7efd85ce0',
                        systemName: '5lkkhqcig5rw8ord2ao3',
                        scenario: '4qcv4jnr7ot54r30kwiyz3apn34e9kh9wfixfzroxpbd4d28nnnblc9yvlyt',
                        executionId: 'cac84119-4200-4b97-b1ad-b606453622f6',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-11-04 06:32:30',
                        executionMonitoringStartAt: '2020-11-04 12:32:34',
                        executionMonitoringEndAt: '2020-11-04 12:00:38',
                        flowHash: '8bm9goh9vtovkrlgybfd2aolz8ryk74o3xcdatd9',
                        flowParty: 'ijakqmfpuvoqn0r4mpt4ivatt9n2nffxh5xf7wpasw1tkh8s9o7fcluixg50dfwyjnbsoptb3totnlfk9d7qisurqczxdtxzn0q49pxm9pq3oxnjf7hyf7kytbl8zabod9eced5nwpe892dt5h0552y9d04icmkm',
                        flowReceiverParty: 'y4kzrn09c9kdsi8okgmzupi3ixtp2wpotonyws8hukbduup9hr8be0n9yaenxydgws7gfwm5yrk9ptdpy05ou90hhm3rccufxaoflgkeo5nthixuvc8c4b2ju82ic5ag606tfz1qxu6g2sqb7n1efggt596095kb',
                        flowComponent: '12s7xivz8m0om68737i9rxor6zbn6ja6jufpkfqd5wupm3yfk323fsztivox4v1w9s9ma09ob6740ssr7iv7solclz07n7yf6wd1l9yizc0o0xyp4j6n56kg3mp25a3qisv6m88vn3t6u1f7mnzu2bfz6pjgk6mi',
                        flowReceiverComponent: 'et2dcw5vqw6ubzywx7vzls73nvdvgl9itcs1u74rpj2r29ycvms8q9u4vulx7slkzk9htfipvoobfnfus0wlvnpwevjfw8zypkdt3yf2a7tv6t9ax965tnqj7f682cbfdclegzgxmnuayvr48t6ag5ol80pp3afo',
                        flowInterfaceName: 'rejtuo4usd7gccix9gxeg1121n1cn5tt5wgvrru28wo8z8u6koyrm9kg9z6fngxv33tk1aznajrk80iof5gh9a7y2dbubmfi4thr90ojieu2p5a0y5steerj2tuaj51z7tomw543e2fk1q2t3fsxlq7db48r8y34',
                        flowInterfaceNamespace: '8ap47py5mn8z741t44p4ouq49hnke5485jjqaurj8lcvwrshecw2t0rstk499r0wrsige4mr7ogxctghg0odzu7gsvl4ogol4v7m443ppc0up8485x6akh3rs4o5gbonjrxt6ypppm6k4k89bkkxds1kzbxgoaq1',
                        status: 'DELIVERING',
                        refMessageId: 'yplzr7jrjs2orji71eix2mxh1s7bt1ez0j8vol1mr3a2ndtv10e3x83yxy0qsfve3il14pe7nacqcae5p8r92mtwt07inf2im005nxwbsehkq6gtb6jtb19yiwz60kw86hn3d1xzb3otbvtvptz4z57uhm5ww3c5',
                        detail: 'Maxime deleniti ipsum et beatae. Optio sunt quia illo quis hic sint. Tempore totam aut non voluptatem quo fugiat placeat nobis. Non quasi quia dolores recusandae aut amet ullam impedit. Eum et blanditiis voluptatem sed nobis dolore aut. Voluptatum saepe nemo sit dolor.',
                        example: 'fvexe235zccl80kf4wyh4lbwu5rw334axqda9grju9ddvhazx3hlknt8k74acso8uzsfzl04q6g9ezsbryii1tf8hkbkdskhkt6q63phor5hna8bx3qdy1mgoo0f3wz2f39sr3blsiwobrtapphnr8c6zsnr76hm',
                        startTimeAt: '2020-11-04 02:11:36',
                        direction: 'INBOUND',
                        errorCategory: 'klzykhydphzv15996871s0yx74jgmj7zek7xkp0arhx5hoty648w3eetfflirxv6632dzv2kezzbh48ghn7mqpm499glrv5uhii5snzm3qvp9gjn2ypt1e6vvfcw2tckan2yjg25jpupziinkorwxatyzjv6ri2g',
                        errorCode: '7whssrkl4uza5tzj0f8nca6mq8ta59zthg87rp3ri81nln0mlj',
                        errorLabel: 942296,
                        node: 3611906087,
                        protocol: '43xj2qjdrnhwg91xxyg7',
                        qualityOfService: 'n50bnsa2gx6p518j053w',
                        receiverParty: '7r0oydydi6ck1ip2l0r0p1rcyudp3q5s1in6ix1wze787f5qkwt90iaxlkfnfggody2ciykmsn3uvzcuwnjwrfjofcly16hln2tnqo9qv78cvvwm4zcy4d11skdv2so7runvritpdye0pag4l3mrfinbgw9a4m79',
                        receiverComponent: 'srmwcp54foi57f4c9fatttrn9wm5pm8voacjfggjl90vdbl3rl4tyaf7ivk8zjipn55iqc51sqkjakuq1ja1h1fmvlyutpj07xyj6d2z2ybjx48pd77a59otkd9up238nl1pcyevvzwatqd0d5w9s4eo5y8ky46t',
                        receiverInterface: 'uxk7nd1p24w8tdlr3pa5jrggdqcvyhewmthtnfstismmikbu1vduhvhldfn3wk17y1zer5u4vmtum9vyjmei5jxgcz67zbxydotyino9ssuqgpc8ha15iwq21m4cqlo5h9p3sllinyhifccqknlbn0wdwdmmml6f',
                        receiverInterfaceNamespace: '81bpt4qfzlo8amu0cypl1kxybwbojqoakoi4ndojg56m9yncj8rd1c35ibj8wi4kcclpl46cldgt20wve83sbrm0tldoksgs99x6zeinfqk8irfhdoe38tnyu6y1mxzul6m2hvmppvpd2z9ehfdcwd068n0d61a7',
                        retries: 2206876607,
                        size: 3125623103,
                        timesFailed: 7196877733,
                        numberMax: 1688914252,
                        numberDays: 6597992556,
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

    test(`/GraphQL cciUpdateMessageDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateMessageDetailInput!)
                    {
                        cciUpdateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
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
                            numberMax
                            numberDays
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '7f4cec0c-1a20-45fa-8e39-b869883f6895',
                        tenantId: '1508ae16-7800-4f1d-a9a5-09525cf3f2c4',
                        tenantCode: 'eop4i5qukua6maxog61wnm1jjpuh9ghb7uezhclzk5c7gdl4n7',
                        systemId: '76030b6c-2930-4c86-baa2-8449e67080b3',
                        systemName: 'o87f32ex4ktlai9mfwj2',
                        scenario: 'mjzlz7qb5bqg0bgkb8p29iofpvhvsx0cmzr0mok8xspvapz22x5r8idn134x',
                        executionId: '65ee383e-ae02-4ca0-9f03-eb364525d753',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-11-04 11:00:53',
                        executionMonitoringStartAt: '2020-11-04 10:38:39',
                        executionMonitoringEndAt: '2020-11-04 14:05:14',
                        flowHash: 'q56owfr62gnxfz47bq2r0k5rr0mdyefiyb9axhvf',
                        flowParty: 'w9x061skxzjgg57pxgbeb4b3anzu2j0ggn1jxod7kpzp5zfkzj0cvwooz40y3ql7r8etp69ojjxs6qurv0i6ejc1zbhkdgpjeaelvukhf17my0m2ejvz1nci7wiq8smqahgb2n9l08ev21vh1ddxizj12s11mthb',
                        flowReceiverParty: 'tm7lzchbv03hktydxo5gdp9et5nmsaja2c6pvqegy3yh6ywjxh22bdym7cyr4mb9auy4fa6v2codfp2rpy9dwm0kgykmhyst3n4hwezu341ljytejn0roamo0artwuq7uttkaw4wupix2f67ivcnhrd1k9c0rh3y',
                        flowComponent: '57q1ot5muoo71wb6d5pwn5wen5c5xyudodpehub93rw53wzyiz7awahxy38cotkrk0ecw83vu4satkhnxowqga0oqogc8kht08ei6ttglw1c3e2haelxmmqh8fseuha9zzbx6hy785ha5eibn2yc8yg9fjzcpj8t',
                        flowReceiverComponent: '625pi5f1vy5ioh7m2n5bvylynif9zy0ermqtqbkzrutsm5ji4n3ojmcwdowau2f8j1ic2jy63lxq4m0efih2ll1e672yc0f52q68ugla3s8uv3q8pub9b9bkjsj0ossvrf694il4r6z8nnpm1m280pvd24icbbdr',
                        flowInterfaceName: 'n4pdajq77d4gq8s0nrkkwkezdqki7iu1hmlxiweavdr19zxvuwnho1wzjjkjwaoaoc4vts0e6kwkr75f83gcshrjh1li4vrpt3mkg1ayr0zz4adnd3s4jmgntcyndjcu7ju762leqqswfn3ozjlqkvsxzrbiz8go',
                        flowInterfaceNamespace: 'bp4i7qm9o0hlp8ljlar0owtnfxsm2n07r0w7j8eiji8otk5bmd7y30pwja19xz7h7210hj5jvrhp4jg7boeghkkgl2z6kbausftrra11dwufu86bodp4u8zxxlvfgxlm19n8s4qv57en8kdrne8idxybqlcju1wu',
                        status: 'SUCCESS',
                        refMessageId: 'nm5o6udh4q5bxpmm316enhoiiaj0cky7jwbmr7heqia2inoggqcyhxvksrxrx3enhfpyy1f0hg795ebxtlddnlsfz2robwouuhk3y4cdhy34vstng6ak8opdiyeuvusw1ycv0s8d9agckabo047971w8jc7p8ngp',
                        detail: 'Eum placeat magnam voluptas ipsam. Perspiciatis quo distinctio. Dolorem voluptatibus et. Nemo sit ipsam iure aut qui dolorem recusandae nam incidunt. Explicabo odit dolores eveniet.',
                        example: 'kkxhjo2wtgiprxt95wynu4hvsnihx52d1oi9pvcqf4mqetwh5qdbc9otzj2yubk4suy5b09xhg28r9hsydm09gu794wbok1nqxdzhw7g0ev3c17bar6o9pip4ce9ircn4khm1iu21x79pnx52ji5icygxu816q3f',
                        startTimeAt: '2020-11-04 15:53:08',
                        direction: 'INBOUND',
                        errorCategory: '937r96j8ckkvijali1dy8i8dmtsq8icwef2cwhl2pzll9oqj7qm4ztr8spzt7jhn6szwu5691xcuzgpipqmjytj61v77bhaexhpawtzis9wxga0cn84rb5b4vj2f64azj9hj1a4ecolzdzpv73clo0nbwxdi2jmm',
                        errorCode: 'mdf37k5rzl92smkdoxiewa6xmn6lxaeczgvdj7tybpi17um90r',
                        errorLabel: 706382,
                        node: 3676180335,
                        protocol: 'u0l8txw4b54ne5nlzuur',
                        qualityOfService: 'lj722a1binhp4szrg6fy',
                        receiverParty: '0ghq696waqlt6660psxqgvkvcl0oya8a2qydyxib2n71osopumjj3v2kaqzyp97n0mvntbltc4orkkhlc1joogjclras2duuteelsr0w76x399ni52hinttgvddu5y6w4pydphzcvsj6yrzql4l66v3els70k6xm',
                        receiverComponent: '3cxyk4b3kfxywmw5ksn5bo344xy4a82utii5nmbg0kt4yrrebnz6oxkr8ae72maret928mgk9krjlxzoyg1ho9n4c2jwnau3y6igl8jplqz5y39nensza672zturd5598wpqg0308z57kv0taz5faqg2mlr6iv8a',
                        receiverInterface: 'hy1gtvbl5iyzyvfaoc4n13d115nalx46a1ilev7q291y8f2ws41g2l3xlc2w4wvnt0lhhbnhcs00x3jjdwt3699s5l0ntaw2be1m9phi64emzbkhz0og1mgco8rus94anca79p17ztnmrb8gzv37mtx6yixyclu1',
                        receiverInterfaceNamespace: '2eccb2k1dbrdccl0mb6cn5ysga2zgdg1j4pyuysryxo5ajxsaonoqa6vhwx4oizt1kch5b4gmbz7yhfkphsubt3n7h0vceknbxcrlyl2ocb27tfuzesta0ogca61i0kl4s83ewto6y40s6smkddqz1dpjt5tna0f',
                        retries: 7880639822,
                        size: 4246156150,
                        timesFailed: 1863962621,
                        numberMax: 1096943910,
                        numberDays: 3393724955,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateMessageDetail.id).toStrictEqual('7f4cec0c-1a20-45fa-8e39-b869883f6895');
            });
    });

    test(`/GraphQL cciDeleteMessageDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteMessageDetailById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
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
                            numberMax
                            numberDays
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a6e18711-9adb-4670-a190-8b2cb44467fa'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteMessageDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteMessageDetailById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
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
                            numberMax
                            numberDays
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '7f4cec0c-1a20-45fa-8e39-b869883f6895'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteMessageDetailById.id).toStrictEqual('7f4cec0c-1a20-45fa-8e39-b869883f6895');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});