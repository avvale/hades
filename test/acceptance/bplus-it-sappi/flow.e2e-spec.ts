import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IFlowRepository } from '@hades/bplus-it-sappi/flow/domain/flow.repository';
import { MockFlowRepository } from '@hades/bplus-it-sappi/flow/infrastructure/mock/mock-flow.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('flow', () => 
{
    let app: INestApplication;
    let repository: MockFlowRepository;
    
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
            .overrideProvider(IFlowRepository)
            .useClass(MockFlowRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockFlowRepository>module.get<IFlowRepository>(IFlowRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: null,
                hash: 'rr9hqwq6yoyg9miuenwvge2ws6qpc8d597wb677w',
                tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                tenantCode: 'q7ymq7us71l6216gf85q5jn75rz5enn9d07foemfanfra9hraf',
                systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                systemName: 'cgxp4pvnufeninlehrwf',
                version: 'n1idm5t3cm5a8o02jwxa',
                scenario: 'tdq8sq64jftt61zztnfeswm3e2t67jjvrlot80fbj13txta89lvatai6c04g',
                party: 'dqnanp66uwf2j9mwqeny1rir9eaeewt9hem5ill01018jwgokrk8ymqidzuomx1u8xeq68gh2j22f8f76irdgk4hxuoax00tccxmlebruqp8obcjxdn2zkf5786blwn5ww5rc8y8qy2i3nchj46xtfyf02tvbvg2',
                component: 'a5g8kvq1z9qppg3oj1xe663hs6746syx3w9fqbgalk6nutzs1u7wlni6d26jtxen86ej0ymz3du936nkgh90xu723k2i1k8an06u14hdek7f14q63hpoerzd58w71hapu31qylgvx27h791kue1wa8w39ocavawv',
                interfaceName: '8wd7eu2zskjqf0wuggyka9jee8ar5p15sj47aix00hcx1gmpl5zoo882nn515q10q84l80qlgxlfqgqzp8n2dodsylz05ml0nhx4185u4f7r9bwygt0qv2pu5lzb7wz5qxdpzkf0lnh35q6d3a79bq68m1noc34g',
                interfaceNamespace: 'mprsf5e41yc9s4dl2bnp87ep9g5ekkj6kmjnmgqhv26twgne6v4uxv5bfe27ok0yr9f84td09vc9pcxa8v5lrpbye2e087q6uckp9zach4n809dt1oso6twnw00k4kt3vg8soevly3jk9u5wq74iwg17vt0dzqp0',
                iflowName: 'eres6w9x55s62y10fibadqj77gk098r45s3jxnjqm344evtv6mwheb0b5dbxhfdasm4kraok8za5akj7a53likajfcpsk16jehzftpd91tvchycdiwl9zzxcntimkdamf46vr4532qj1f2c0i7izcg7mwx00e285',
                responsibleUserAccount: '91z7nahw8l66ydyahfw9',
                lastChangeUserAccount: 'cucctpvtrbedrt244w6i',
                lastChangedAt: '2020-07-29 10:18:16',
                folderPath: 'whd2h2btsiu3b6op2tvgc48i4qonhzc15zvra0kf89qaw56mtahjtz1em0d8rwc7z22uncsr1qe9ucwsral8vxusj0iibu4vfvc0xvhy9vympntx6chjygssg1twy6e2j0ui3kuzv6uajpc9yt49jhbvauk048f40ecxb4y7bl3rkyb4c1lrsgmksgiugvb3dtgl060laapelxo9llho1tgrr4wwwvyjdtlndq1xji4h5g3wnzbpo8v032g23kv',
                description: '6erns0uejw7st4ca15fo4ayli46y5hyu59m4jh499ht1l41ok3l5k0ugdyb2e7qunww4p4h97qkzeydr84z35ljf7ucsqp25gl6pewk52el93qr7urrf8rts6i6bg01ruor1kpq7b7j7grjd2gj1ybczbbslqcp87pea3tb2wphadpxuvswoqhbthlknh2xieev7735xfothjicpjh6gznzgdc1ts5jq60404efnsjyac1va2wqsbh3jim4humn',
                application: 'ce9vmns0rek8kkdirl89td7g1q3z5frulxvdspy1wybshioa3q1y6g588sng',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                
                hash: 'dg8fncu6b2jyqtxe3znt9pvj6dd6sbs9dft6sre5',
                tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                tenantCode: 'eeh7q6unhqa0jq3twh6tgzvrv5izlfy8bh7301e0ogo0bbi7k1',
                systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                systemName: 'd542bf39xz2xfyohi230',
                version: '97xsoco9d38pujaz75dc',
                scenario: 'rwpxcv9ypdtp5o98i9owlgoufdq258hjdbkmcw644tp7sajoaa8kbxzrfye9',
                party: '4961ry2qyoqelhq0efsshuxztvcts6g2n3hqxcj8fax8pa0ptqlors2oroco2nmrb6gvk1fz3vt1oiziwvkn6nvm4rzg1w12u1gpoiiby448xuvphrr6amqsz9y5db4n03mmz3bsfkutpfrbruvec5snbd4csbrt',
                component: 'i8y4d84jow0jva19cvqwvbe3zs5xh99o11w19yak8g7mibi3utkxogzjl3tao4v42wy0i9zdlogcpm9mbjd6qrgl5rtmtep16bgt9sebm3ppzrs54zvcr5xr0bxzjxcvsdmviienepogjo95ie0wl1boqlyymck7',
                interfaceName: 'qltkzvedx29uyzs7stpth95ddygci6dzzoum6elnzlinrbka0l3x9be64ddc2a8l5mbo12yk7o2ed0qhsiuebpy9f7to13ua3msb9wnk925fwci613iyryofiwmfvxneh1tsds5hkzgpm75d0el90724myfaqne5',
                interfaceNamespace: 'tu8nf0zrtcea04q9enzg6bgbilvds9uozcydsxnfj28oj4299efcvlj3b600fym4v0ybdxsu0av6d0fjpt2ozumc8pnxlxxg1tdailcfnofxbr2qoxj8ncmeq7ark2h5vp2rqqg9r8xup565h7qzqnytsxjxokna',
                iflowName: '7wufiahxvqqi12il2eksk6wy0qnq583vyga4mtfjm4rgo83l3vvumsn1urvq18yex249fheettcfn6hjyfwzp15zn5eer2uv1lhb61yrweha0rzbvaf13pdurqlbvene3xwa5yajpqdew96wl3mqcamwpv96a00c',
                responsibleUserAccount: 'wgr40vacryv32gei3m8j',
                lastChangeUserAccount: 'g4zh7jbixdcwt9jla173',
                lastChangedAt: '2020-07-29 15:28:12',
                folderPath: 'x94bqnrriw3jrwvbz9or9n4rjzlbhfiu9bgqyl56yahxv9l6k0cb68erdzicssegnt674rt9l864k2c6ohfswuy9gxrnv5zs3ijzv7sazvu1xti17aztbtg9h8e4aj0oqv60akuzvy7lti2jq1sqp49npg3cusgj0gs80kfszoh1qecgrzucbpl2n7jwgw2986c0jn1prx064wkn56yxs37ed4gd9z24922fz59p4osrk3zi7x1aekp010elzz7',
                description: 'utdxqre8ascy5zix9qy4bi79r75cvu5fyrqhc024odjgfax0qwzx7xxlc2p53y44xq4o9bshn8uj5xa6c5gmakjak2h3ut433yssram2eg9tpmkkg47g417rh1ygv43waim5azc043k7caplre8fej1borkwfr2j4i69s6fodw73zj4h20ifakybj3j4o6txi7kdbfdpwaiuw85f8bpcwah0q2dxkeg1d2kaye8hkfjiyagqrqpvjdb3gl47p3r',
                application: 'iyol7lllsd9zumgbqz529uddfnwihlwjysn86ztg1j0w8o2jtc6i65l4c0gu',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b',
                hash: null,
                tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                tenantCode: '1tmuj5w302k6qqywggk1qxrac6fwh3xy0sppexiufxan6jeqor',
                systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                systemName: 'pzc0u9hswttk5m8crqez',
                version: '1iqmpdpxyueva5x87vh8',
                scenario: 'mq2nv6u05jn5eiovol7ldrx4b2fchvdj3776991qeyqkh7ofhwuizrm3xaao',
                party: '2ddar0wdip28fvocxeujcszk8rfeer2lxvryocck4i7mo836xf076094jbhpjuc4t9xthsl57sitgva3l3p8w56i0keij2fuzkf255syf174rqk59aqqju2buhf5ouiyscxftzg7fesl1ex6heb8e2pp5uq23yzg',
                component: 'kdq92v3d7a5gn5iswrzjk9we7gnbeu5vsj7sntrc3e7ey2a9beoteqi7xnhpvxbwj6keil98ounvhd8wpcn7rxe3djizonvz1rwnfe8y4emmhdonpbbe4il2dey7e21wkgzts4ljc3fr4i1gzgvoc5qbvv8kkc0d',
                interfaceName: '53mk5nxtea1xjbpelqu2sn2a9jyfngoiag6xfockcwwrji2nlkjy9gxijzhbmj8bzpo1oalm76abjvpkr654u1hiza9ovukv6oofy8jypy3pydfn7txpslplevw51de8azv810o5fxx95b1o4zmzg2ju6csose9t',
                interfaceNamespace: '19wu2ggynk4f1c7l0i4eqa9904di1u4o9rjjk7hbgbd4h3leyi8lcb6g1ng8eeeg8fnrtyrf5yf0d7r0o85vz8esk9ra09iexu0dur2jqllzlokstt9qjd0jsb0jp9aghy75iz83hvrtcf3fc7orra52vas9x05g',
                iflowName: '8s0k2b4i9me6p3bfo5xmmlqfh3p91o8qgexc5orrw82x9b3ui3j6e21th0a0opz1e0jmjo1kp32740zvoegr5zh6jxwsddu3ynuad2kugrcjzxhdwduijgfq95yl8tvv7ho0hmvj4wi2vn6ywyndmjlyd4ha9dm4',
                responsibleUserAccount: 'wcqor0sxqph2aecugbpk',
                lastChangeUserAccount: 'oyj89xa5bpgeuk7e8uvm',
                lastChangedAt: '2020-07-29 09:56:03',
                folderPath: 'mkpmxk7uckjwczkrt7dlk9nzhbz34dmdr8wko3i18h06vd15u3l703hx085b24g6wpblmhmssk38fbj4ibfyw90fg9z90fqtuwvo2m599rc9kvgq25nctj6323rix9h1pj6lj7ejwhzen1ekyd3kt0l0udti8qeo7sdrb8mpjhbhhaow0h71e05qmwu5fso37nnqr0eambsn1djbr3r4n5e1c1x36ftz7k06zo80uv7xkty3j9twcv2r5ksq1kp',
                description: 'wmn4qtgoandnrot8xk9i3jwd1z7wpxy12ufmqt192xt1o8sxx5gwggticuqi4s8wgt7lrz1o8n8ojuqolfw5s6u26aeymvyhsujwht1sw0saivbp5pew606tk07dn9f5hgmssuwyb818z7jehnts3piy7vs1kxabx1kz33oxjc8t18z9dvxfq43gr2qziojr3ysec2m2cjmfg5gywem7syujejij496hcu5u6eupr5gzbijlgmywqa93y2u9p9c',
                application: '5sbus9bb3d8r2labtpyo47jxm2ij8qdkyu730bq1tb99mpf02oamfup2ouc5',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowHash must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b',
                
                tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                tenantCode: 'qd7fbo1ftrvpc5d1e20ztfqtnn5wc678e0ebxfffy51rqrdd8g',
                systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                systemName: 'rgumljupo4ti5j21svjt',
                version: 'fj3ze7hklhodvzy93ct7',
                scenario: 'uk0i2y9x5j0wptl0vy9w6t31t48og85p63v2vd5cjsx64pkxrv7yhubj4bqn',
                party: 'th4b282v184yfkdvqv08wmwed19hid6ftv3kogd0sbc65glebvoh57zttiaxpnqlhva5kigioiyuznz7vjh8gqgwyaynmuftpddoulxm4n5ciejihlz6w7gn0761him6aiqlud2bb6074oxw23ij2d0p4cuiwxf6',
                component: 'o88uv7x6kd5ayzk9bzhinubwhoo7ala36s1rtatf7u40uu6128o8ds3b5ibgr77ff4a62dj4aib4iaivhau30rgj6pr42om3e4mywooobbbt2pz3o6ss8i5b0jvues11e8qzn2vxt4th6np3ja556p09ptxppzi7',
                interfaceName: 'ogpp8457la7osbgatvuc5obaeozn9b6r1kz1qy6eo6ls0pv7qh6sk2b321pjues34cbnad8bdtfacqybh3c070fo5uexe3kygls3qpnsf8ehgkwp9u3c5n2j1ec7q76mjt31vawt3j60ott77cxe0kb8sdrmziew',
                interfaceNamespace: 'jwic0o5nni1ufhmac49fikdbdtmmyi40bh9osy6y2if5k9wez8wtw9vc7tytb2sgps2lyapf3i7cc1rcrcx2e1ykbujvmh3zeg5gcu7bqabbsd6x9wn81u9d37y0ershmlb7fiv296tmnmt1yo5y681xpnx6jvx3',
                iflowName: 'y8ulhtrqiibh4rz2z7zzisprvkygyjn5rqi6igx7wi6p17fn9d6pzfg2faou5i7gssqcssxpl2zgz7wjfzgyv09jjf45wmuho5i833xuons4drrigmac9x4setrkjpyu801ilsjs7lsxk52sc6oi0imej0b8t11l',
                responsibleUserAccount: 'c9v9w7sw7v6l9vppuxfc',
                lastChangeUserAccount: 'dxv5whr6pkuchwc8qy0s',
                lastChangedAt: '2020-07-29 05:36:27',
                folderPath: 'cq144l5nwhun54fn0v3aan5mkax95mx8rvzpy8t2qcd80fjru5errgb46hge0wszgla5ivf7a57nmll0dr4uauutm0gycio2k79peftkspwl6618ka4q543udc41jz9xof6iwp63zo5g0yg8mms8hlfc5knuy4ykj8s8xaimtcal20x88ptdum1ea3l5h4m4natpnpnh5uvtswgxarp41t2ohlsjb4sc8jlyh5y7dm7q1czjnzzdddg0995qcf3',
                description: 'olxn1wkfiuoxinlfmmzjgzpo227skdlf7oezy1anrvdmf27n6lyqon0q6mzj2t9cm0r9efglempmr572pd0pg7ktggutkb5jyondh9ppg3p9r0220y4o99k359li6fb990rhf4uxv6ifuk1r4q8a0kvajf79ucwohe4oj0l0a0cru64d9eos5wbrm80334f0sb6kon7xyhhhjnln097knx0vihko2twgo2fk9nky1kj22wrpa4jvxw2x84pwoi2',
                application: 'nu7l4hb7e4t2xkn47tvmf7ytkio2opbbagyykj7snjwg4ltneqqafp6ebwst',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b',
                hash: '8d5h3y842b371u0ug5hwghc1mw57dv7upobuuyea',
                tenantId: null,
                tenantCode: 'kr9k6l22j026pnvxg98ccyror9hmy5l2q2iru9je8slhf1c2gf',
                systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                systemName: 'jp0zff85kny2wrv7nwv1',
                version: 'qa8copca7eh30psyo9vd',
                scenario: 'nb1lssu69yssxd9igp1zkbiopp9jovbrk1lqpdxzikw98yt37lwnyux8vz6r',
                party: 'xhu45zr5qbrxorja9pncovhiy3o5nk8ypz0xsz940rgd8ny8nny2ctn0q5l346mlk3q5zgf5xguqdt2vk3iuzw7ntsg1un3o4htgfrihe3xznl0wkntcmwd8lq97gnj25myigyd7qgcovde804tjpwe0r3b3vsdk',
                component: 'dufm4mtdco3krrhlemhll26udg8hns5vrhrbvvz8p3pi6i8r4z44rewvva7v0qz3bt91tepg7hkdbukzp1q3k39hwnegr5d1mltdua9novhewpsoertbt1skydf7znj8ke2kovd7zkff0to2habuwy85yjuso7hy',
                interfaceName: 'r0ziy2t97z119319w5puzahrw7rwpdbm0xu2i3no6u7tbekrrjod1rztapqwslf6kg8kzt5bt23ii2l31z8apszm71lwjoxlhzcqgm737r9sotb9ma6ieexonejcgforgrr2jqa6ynp4c7j5nmqo4ooi3mmxwtxm',
                interfaceNamespace: '3vsff8uhml3stokk6jyj774hu9yvo9gj9rhhkaknxwis5somtg711xtxgwtqax1utoj22gf0nba10lbhu25jeaigh0g8be3phg22tg5c0vrawy2i2cwtqtgg14kovzvhixowfpbz2x6uospykrigap9qbtht9pob',
                iflowName: '08eqpk9roi3hfqzhz3fzdesqmwf496jk39sqvjgiaw2ooh7g2he3uczwzkwl7ggk36m0hp4mxbx1ao7qfvivlig894z4m1eczj4cqgcoqmbvmvwnishoyrxl7dpgwiefltjdsspn83e1kdyx8ho4e3gmbk9wwkfx',
                responsibleUserAccount: 'f5ao1betz6yz31kb1enc',
                lastChangeUserAccount: 'kbrq6i313p1gt32117m3',
                lastChangedAt: '2020-07-29 17:08:34',
                folderPath: 'gua7qxceydbz51xvndj2s9cux7c1wxwgkyphiz7sad21wahlt7ljga1gi1e8nvjkkle2o5fld3xyfvwx0r91btz9h4feuropyh5u7tmok3w5rtz257dhfaa5qzvw5n2ddr110ip5zvrk4a0aqexjd87zptdpj1kzval8tn32t4nb25zndofj7w3dc2vwb8q64269m6n1kzu48jehdj9c5u1eb2v1pzhhrhkn7ap6qjiba3vt9ajey6uk0flzf4u',
                description: 'kqmr6ma854phb4pc8pciyt9xq086bf5n21ok78olo3q356mc92imx1ma9ol9prej0s3smxlxtdh38yfk6pxx23hm000j00lchzf87ji4u33cksotgdtmgylbtk2nrq0502o52qcu2gjmk7xmf4h9y19mm80ha2sqkcujog125c4yoqy2ja2td9k7aa5pljck7qh37abdprjss1qfqnj7czsng5ozdttzk12kvdfm1vx7n9ebqac547nr1hvzloa',
                application: 'lwwqy4yri927adnp1x0wviogg6175oqqo6fn8b36e47e81gcqwvauku01nga',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b',
                hash: 'w53yk28xjgmgr49ve6y9duxz2jitj9ilkqbdh6xf',
                
                tenantCode: 'cl43zeqeu0q9sxgezi4zoi3gxo9f4wlazhvxwbgm2atulsa1gz',
                systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                systemName: 'dq6l3y05k3a0zy0qm8xg',
                version: 'qc4oywpc35u063yzdbb2',
                scenario: '6r3z6idvgzoe5egdtwum3z122jzfepeb1uwt5mc27yfzdc9dg15lub7d8h9w',
                party: 'hhwyqt3bmnueqdg9ytxwosxjzvcqo4japfqtx4s1yo72112l469swxnnrxcbefdwaw74lrc90nj47k9c5eut57zug2x2318bb5sox3ml0qg4gigv4xzckjfab3podejxs63igiza2hli753xaattfnnp0m2poqd5',
                component: 'rr6mvlwn9laag4jt8xnq0dsc6630e70kxzecraosurrywftq507dhqjzzrxy9z2csxl7xk3uofoltz5txubo66q0p8yh98wudkn6um7xrzoqr85wbry7qwb8q3by0xk2rg5xbwjgvvc7erx52ncuieqfn7ipq88x',
                interfaceName: '77ddpe9qdbphn0kba946mn6b7zbnjtm4h1du2u3leixyly1hy6soshfp8nuyw8pjo9tvtjcvyfku0n7arrqckxizwwrzleqe64s0a7vtmkoycf1vei08rlu0xtp6a57qk7niaovfllh908skdve1n5puilewuosr',
                interfaceNamespace: '9qg2buyvzy9kdunspajz4iosqjfci5dvml5x7js19sc76iyffuwd0klx2wnojqn2z0lmprdqd4q2huuj59h9ly3ito8woni89cpwjtnovqvknmrf93y33052aqr5gs4s447w0zaoy58qff00yr2s2uchna4eww77',
                iflowName: 'lwdg9plj0q3lk15aby8l6dkptui1lry6xeku4trn5j4k6gg6ezrobo4ihrcalclhbokihqlyroj9pvkbrwzf7pvkr2nyz9j64xzvkd8mptd7l3lruy7xff1sc1862rc6db1e3ftz10pbapwc9nnsb1kjc0f2fb3w',
                responsibleUserAccount: '8hlh9on6vqyhbj2nvkmc',
                lastChangeUserAccount: 'imwj5zilfrv9gn7pkpxg',
                lastChangedAt: '2020-07-29 22:09:29',
                folderPath: 'kxlbvurpcce0ddwxfnbu0z6qwdrtyhs91qj0srd1w7852abxr7wwbyyoh5l72k8fysohau8sdq4fr2fq0w2s6m2bgdqmfnisvm6c3xvpe0ktg83mh5tlkh267kntv4b7dbe899yvoz8hk2cztidmxeg69splt9natnbnrgagjdkppe73mr7f0ghq8phtlaapnx6252ipcwvkjjxk10llln0uxtzmmcoc9ou3baaogeqdpo1i0cu6bep0z6a6eg1',
                description: 'frcjriaxzzd6syj7vqmrg24m7cap5l8py0syogrqjhdtrgnrnmp9woil7dn87ynktp7571majs6hdd15woede0ha92e5ywi3f28glvldh5qggwq7ac6ptj2de92lam7jxkjx3tels41r9vk34ok3l7fhg1sm0ibz52fsg3dekaydhzmc6lijkhxdyvbbze3e4rhu5zyirqkw8qbimyb2mbgweeu0wmfwbl5jgc08d0sz349p76tnc9i5n06ce1h',
                application: 'sriroztwm1e5wtvnjmp0rr23c9g2n97i16zb4arj09uju9q0fad41tc42ts1',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b',
                hash: '6cb6375grpmaj3eh59vfmjqchq612jxwajmaphhg',
                tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                tenantCode: null,
                systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                systemName: 'lf1tw7wa44o27u2vh51o',
                version: '7wox7h857b3g6masr2gn',
                scenario: 'u4zdb593j1e748s7v5t7iv0agm0qwq22pgbsruydkjq10q7c87ybv3pwzhit',
                party: 'my5rlf6tr0dm0gecsmvhk9gespuft04ohpklvrvj2w6e4vbkwitvu71zfqnwkks8owg8q9ylwlsm4l4n8flxjbv5iull4d0ls1zo53fpw5zad0srrvowa56gnjgihlgzowgli5q0a65om6uqjkmrnonhlc3quu1u',
                component: 'w8xgfw90j6daggfcauwu18nw2vo13f7lcc7q4vy8l719mx1hvenf691voy65q6cx0td62ru6tyslt4180yybjp3bgmldbt2ssqn1h41tilt2hkkjibl70spqq0l9bpnkaj0yue936o5k0z8euqwzymb080uhuxuo',
                interfaceName: 'zawhsscr78knfa4cxd5sfywk4397h9oxp0kkjp6a48c13597sc8yakg973mh07lf5px36s2wsu96zy3qusye2s5003tzdin91txkvoqz1fjunjcyd6isf41i779xqgeq7eq224drq0jrmfoaa7t28u6s671s8onf',
                interfaceNamespace: 'uiox4nnmoeju9gaqrdz8vk1b0emey2xn4ytvmseaef0x3jtwra2gxxxf3xlyl90rxgkazru0u135caksrygnslbifsstkcm91jcav2l3uw7v4nbwvgperm4wu6u39lntayfqezmfkbb3jdjh74e4hu8hjpb7u0i0',
                iflowName: 'ba79x3w11u1ig6ju21uqpf8c7pvoealdeus2tbald7ssbgeo742x43d169jx4q8iryax0qjh2batszjsa7kfa5fysvu9x028tfpbs995we3l6et7afxyuthxygfxnc6ktg65exhnnbqu2vez514dr23zk1tk5xmq',
                responsibleUserAccount: 'f0c4qjorgrvqafe7mjja',
                lastChangeUserAccount: 'stp6g6htymu1fh4rh22w',
                lastChangedAt: '2020-07-29 07:06:44',
                folderPath: 'gizgzd7k5jhcwy2j4ps93lseh6nbmm84nn7ck5yssvyo91as5xi2jnnyl3m5rszw8fs7m2w4rd19b2o7787kk3vrj5ijpchzk8h566yeiol24sm75sbt38xh2ixtf8udf1l15qfj5kr2zku6l07x7ftw4tnlb6ols2y15jirte57lzkjgjnyqkgaaxphasadm16n7684llgasb1nd8vojuq5uktnyf6eiuf9f9e2v9puoqjjkvo1q6s2ntcrj4v',
                description: 'q3f3xl63geol178dmv1n7f9ofqjicwvki5gaa9zhl1ahcx1a7tz9crhjri4e4fmre4otcd95e3qcslqpmin80f2m9wsqwnbjn326zs7gulpclkd7fc7xm70xztwwqbzxv3jhk04r7fibaefkub9ghe6xjiix51a2htdcrszeodrexnrajsob6niaqvem940w2unbjy29zlsnmue47lmpriuuf0ax9h5pk6q70jflurlt882y71iwa18y07dx8uc',
                application: 'k0jn8lkv7c7q7wc9ao50i6w3hbpm70ci8pq9ey25ciea5zc4pvgqgnzbgy8x',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b',
                hash: 'mo2gfsp1qtilbfspdc77dztrds4ddgrausmozqb3',
                tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                
                systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                systemName: 'kpn3q6dqdciso6qzrayw',
                version: 'y4zk927nur1au8qwcyb7',
                scenario: '0jtt1wjrp6w9b9r6rs62kznnzsasu77r2d93ebfw2jc2icqiwnhvixwdrbbb',
                party: 'm0j1fq4c74dvptazo9brklaf0iks9bzm5v3w1eh7h4a8d00yvc8omibhb0f8gqfxc4bpjhbn8ciky5s5ldsltu4axu8ozuixvfww6cnc5nvxi3nckoluwg5bf703qw69wzmt0erw3sfrqskydelebs85yeqf7b37',
                component: 't5f72kuczkezeesb4vhzg2e58o62mrspbtjyyj5yyfqm9x0bji01v707x65h9zf40fmt8ih4bkar2ie2e3g3azh7dx1vt4gv5hmqt5pulceesgrq2sofxpml9da75lwr8jhldjjw2x4psgv9g7ciqrit27zfpavc',
                interfaceName: 'qxtrpixdnscshgza4d1jwsrf4uxqi535srqzow2j3e4o7fr4k5znkshz9b69c1sh0hxnqj56ywwq6xuu5pmhyxdto5d790n0zojvvww4kh7zfa8m8h43vybo8jiirrxic6qikuqz1b64fnorkb3xhklg8s2ky26u',
                interfaceNamespace: '25k7qp5qdw7n5z4hrmeza2oms4uia0doudj3lw6z2sqvb2frj8k0wu6rv2aoxb9rdc5vb436iw960tfo9y7bsjxxpc1u7yqalwv4txsfd78d4t59l13lbaeht3en6xpwpe5781laao0w3t3pwv9f2lok0efaqgs0',
                iflowName: '69i8gbdsntnkxbe438sjrnizt6tyefqjqqegnttc98v1dvx3wkw0rhr2ug31pwxopxsdqq7s2wdc0l0b18gwldr5b3elvvvpgbkr7r2gjua7imwjcfxa2h1iexivi8xzxnxq9gm7ilm7f2zae0mg64pbz32e8iup',
                responsibleUserAccount: 'l8dzachyydpaz53bc48e',
                lastChangeUserAccount: 'o6r61m7i1id8fx5rsf4f',
                lastChangedAt: '2020-07-29 11:14:34',
                folderPath: 'r678npjdr5q125nugndv6qcufby7dxdvojezj5sq3x1e3t3usgh1yz8yi4gkjapv2ch6vd92a1fa9q5wtlzbia5g12cv3vj9tq9okrm9pmrgqwi80kod3vpb4mc0stifb00yt27tfjqhcswtmoolb6gub0nhz2xks1uj8hb14jhrxz3rmw658ahi8q57k9crpd1pinbq5m9joqe90dpppsvyb4dmst9y6vo71tze7tdi6ssc924pu4wpi4a26gm',
                description: 'kjr6asia1w6qrvv61ws75mzgwujwzx886uqvg2cue2orr35i5u6tp3pcxwibj5h3t81s5hbhde37v3z9ii7jiblebgnz9yok24wxehag2z9yliyus4k3lh279jw4zzzbci0s5s9pg5s3e5cq7wblsknlbhhxzlb5lhbuxnj4y5d9ky0ep0eduqvrhn6fojfxpk5ygxelh7lx3b7c58y87h3p1ul3eu9odrkn0hp1gv3azd3enm5rrjnt2gp32g0',
                application: 'm9n7i5ckgd6rqe1ykymsybelsgvukhouq0v9gbeb8yv0rb0wnd1g1kirhvdj',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b',
                hash: 'qxpixaxn2heumih960u1wu0opyr4yb2s47cp3uia',
                tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                tenantCode: '91ouadhezw96xrk09n5wflz8ol5fztgejkkkl6pkkr2scxfhox',
                systemId: null,
                systemName: 'vmo74y7wbm5sua8cilrw',
                version: '2lluzbzd3j9qchlyx6r7',
                scenario: 'd2assvcxdye16n1sb86liilwaxdxn4jzkxdq1mce3dnwarbagd2xyriwb58g',
                party: 'abjjpt0ebdvx3msi6h0ndajoh6ze9gdye4yyxu5cf6062r6k0p9ejs61e4xi8ss5360t61cnh2lanofx718vqkvcer7y8ff6spxf3iwu9i9cipb0tghqa3q5bfkg80te96465usszk5ewkcr7fuc1dwyz5ekm476',
                component: '557mnsy02ueaouyuu79ieyu669blsgj5d089sesj19veteb8ykbnlah5348cxlyjs8j4m6hnx8uh2pdvnhsxm0zdapeico5cc37u8iw0ogvxdt6djpea7iioj0gj2jnxc4b5ssv80ewcy3z0okz0cn18jpowgg05',
                interfaceName: 'mc5f1w032ts1s7km048rzxxacrl2bx6e6t7o96rc3agvm43wmp34li7h8lttwwp1knicc9rn7k2316hpmpd78hfqvggemma5aqfkukxu7dbn0fqs99edmc7v5vgecqcxqwgiqyzcwgyk7tzco54u822r7gnz377j',
                interfaceNamespace: '27e3ebvqmk71fdlxn58hp4nmu8onkhj92qafocafhzxlarhz9x969poghu6qyn1166omcgr9mkt8lfpxcioap35rkxzqmzxz2s0wn5wai1hu8bjdxghdrf1u66jgni9nay354nqrbfsx3o1nyrl2k1302h2tbb9q',
                iflowName: 'aggzefju33c63k7u0yzpngfn9z09cntjq078a7ofvbipzn555npsbguf3injn27of5d5wjohnarrmiw2euw0by3z8lput80ocrfqnslqwdj2kfan7h8pdnzeorivk3c5pca7zd92s5epw7v4hkqoz9fapt8dqqf5',
                responsibleUserAccount: 'trna3hzlb1yenbm6p7fi',
                lastChangeUserAccount: 'sh5qt6a8yky1xekkpj46',
                lastChangedAt: '2020-07-29 08:47:06',
                folderPath: 'ju98pm6ahsvjgkpeepn0d4j18irrw286grjrpjo2xdsa2lwyewiat3iqvq715jkcsk5rt9m9hctogban4l61ve7lyed6bs9chwmkakstjel4dah6oosmo7zc5377u8j7jevy8i9occbd017yukhslerud2zzn9f85pokepfviv1bzooqq4z84074spss0fptxi9ioi9fp6jduokqqao415ld1zfmp9gpux2gced66j0rigd7tyw0arn9v50vw6q',
                description: 'orb2y1p7qtvbid60261byl40g3x4xgzycihjeddacb3o6fcyfm0mihvhwfs238s2q94q7nha8lb299v2anq1m5j9gcxwij48pg281w2m3b6baw30uniscymxlx2gmyfatyujsnm66vrmoa06lfy2uhnhxb13ejc5hkr1mbdns85scafxjmsl5750epcbs956etvtdxffsm79ever7ktdrav6qydqud4rf3hap6yignihah7dy2e31sbtt0uek77',
                application: 'sbuc58oy95y0lvo1qlm08wy4wacvdlqoikz3p8qwbu6v3yimzl3krzcmvsql',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b',
                hash: 'ggp60kptj6027ypd3aks3q5c3idchh2bck68c6ux',
                tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                tenantCode: 'tzdfzi4z7lekkrq1dypcj3io2m9nrt4y7pdzl5o6jwjccr8gqo',
                
                systemName: '2pnrkeqgd3vtgzg4raf2',
                version: '7kt1nagh80ebjtlzgebz',
                scenario: '56m52j1fr4ga8r7w8b02ugt6u1scpawlyy1p1bc1udfde8fzavviuold4ted',
                party: '5apnnc7zs2qai1xgp3kjho007hrtmcq3q7gchjk2kpxlr0fvbxw7jdjd644yev9plmsxjdoqoirkebw0n89r452j542ssbjzt9nt7sdmn7d4lq45hox0d7c7wgczhm44vtmlf5fhxvce89vo57p07rl17o1yzgve',
                component: 'ddv3f892f56razqmiriozfp60hmn8rzegs2txoqif5416id2jlyt8k33nj0f3b4e174wavtfx3o057q7p450rpcybbyxilnzwrrg6gum7mux4uz114vfplhpamv8fc2z11r7bbw2j51v2axlkw4ted9ormr3bl3m',
                interfaceName: 'jgcpjp81vvhbj8qff2ufxy5shxiyt07p0yac44wgij4p4b3jvgacwnspyjtb8ulzkr31pc5efbs8pt7ncy7bmfbi1cb6arte8nqjmub61722noszg3p3v5a5uhhpfwpp9xjh0di1ohr1vu7lzbduzpuxepqm2h81',
                interfaceNamespace: 'wm6418zuch2xsuheil4btx239b22hsyx08o8hfpm2dbkfw200nkx5sk6vbo0cqhefhq8zux5h8ix7vvasojrb9w2u9hszbrjae8gu04aeeillmwdupe72kqe5grraq3o6xqr3v6k4vzsr5k0phxdnaznalfpnqyj',
                iflowName: '4k84ajdoazan723489dk6rxohpcqocwib0ppjibbg8cwsivk1r3b4b6jzi5i3947u7572t82kjl6ikr5adylxzhn9n30nu1yhrv8lm5f4n6mjh1g8u6t3rbpg0e0rr5cq31cy2v1lcw2nylultzmh2ny2cgzqt2k',
                responsibleUserAccount: 'oo37q2a6cvt0knxbi9bb',
                lastChangeUserAccount: '1r68k749y3qfagvekjcu',
                lastChangedAt: '2020-07-29 21:06:22',
                folderPath: 'jnsx4cetpu5qwxx5c4p91cxnr041551n3nakfjbmlx4ap3pji4r44afat9shonkglkmam6beafde9yhtjnojmhd0x5fitokww5us4byz0xsrtw7ukuv1eixghjq3pp2n0aizg3cr547pgsc57bje7rzylkt26cpgsscifgzvolmknc64uocvrwhax45899ozq21psxfa59bqbhpovahw9wtqiull4coj2sne9tet773sv21zj67fderfonyynrc',
                description: 'fo88vu0ovbxqo99oxdd1tzqsxyc6pquoiateb6xvpqr8b0yb493tckpgstvwe3rtnvn0kj9zdh2ltz17qw0xt0smalpl7dohrum68fozp0ujvpn95kei5hpkf5bi5ztjclr52hmo9n5jmrr2sm28u86nfq1m605ptvftnvae0hhqiy8oih2fnwg96s661bg18l4v3xlgbzkrjwqcpjsj8s53f0dxherc2v5eve9fn1quhkvzvvhq0rgwndw42ov',
                application: 'yo32q1lxk23q3tz0uo0y5e4ghcb6ik2ib2qjxh40cdznf6939kwf8l73sxlz',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b',
                hash: 'kk20dhu2jeoi7iuyixcn36e7isujvravabcwy3rg',
                tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                tenantCode: 'xm5lrq2abmzqh3v6cgd56fme3fsywqofgnidked6boqu3ds0ca',
                systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                systemName: null,
                version: '2x5az7xdjal0zvapo26l',
                scenario: 'jzoj1ujxw3a2uf8jww32gdlndrpzy96r954jn46s2hpl7ki4shxrhk2oftfk',
                party: '7k2fzfhx28nc03nyxld28q1fbdlkauck2incc0ggiiig6r0e0p49sll7d28vb7kjlzru79dlymjk6ncq7iagaj6bvaxp5413f4ub77xi002e1181wom5yw52w8hvmju43afutz4n3hnv9x5m5qixjdxrufakbfme',
                component: 'f8syms0p0tvrucvix1tapkb6j06pfn5cnh70li46g6id0wni6m22mc7ewt02ftpnsr48qr3r0hhbbd4rr0unncplyg7yic95g12udus5ksv2if99at0ni45lgm084m5yclr06vwlwens7xazwtogp5zal8nkj4kx',
                interfaceName: '7ogthwloefrzyurak26ab9m1nw1swpzssfh4cymv0f56wfc5onv5iyh8fpecgezeas45vs37n2zblffe9l3224a9to522vvdfvhrlwms5qbgorq915ioe4y0d7nxb9eyxybmkz6n4sm10gxcwltuzrabs4g2em0u',
                interfaceNamespace: '74nl2nk3xbunhhrauzglvvksar913ffhdmum0ot7poffnc9upmyrngx8mf1sojyelr1jx68kzeuv42qdr099i24hb07seippgk3y9o2per7sxz7kj21qejbwpu2b3pdgcdn3dr5s71waon7qkju1zefjpglyzf7j',
                iflowName: 'twndol81pgto6hwxu5wzjgb10aq8tme1tkz3zaurq07w67hj6q8j3shvjhkggduqa2chqikbne73uw9jr3qelnwzts6zpkyb8cyftafcn5yjpkenj2kzzu8kk8ggkx0hfcl8vyws539tf0payd0o3lcjmia1ilxu',
                responsibleUserAccount: 'd5bmxvoe62eyi93iue9z',
                lastChangeUserAccount: '0fpfh5ln3b7g3wzb3lrn',
                lastChangedAt: '2020-07-29 20:21:25',
                folderPath: 'dnl2gh3fdehhvj59upybsuomebu21k0dn9p1xihm7dxizj3beoy3tq0n40xc9uj0cowlw44g26rsk8afsvqnuni08sotskmanvny23gd8vstju96g2a4pzx6nfekq0atcvstf2kaeojtw9k4bno2jwidjdp0n32ajpkyqjv0oa4xtsoyrjrwahxmv1oul0y9kvkmeq8p61b8o2aw710zd8s1lkeaduw5988xnodx39rdvstav26gv3fdx9f6259',
                description: '2mxgnaeb2q31uft215974k8x2lx2pjdbtrkdyoix7dy2z6orsuuxus70aj984vjb7oimgx3wtgsbdnq7r2iglytqokdqirlujyo3fy14iz7rr2hkr3a28wyml38d41phuvbbm15uwd5jjjoq1vv5wgbwn5n1or6eiweclzek95fmhlvsmjofg14nn43zbe9u2ce3am43tvab3l5hlhyvwxjclt26tihzemph61fylt9bozsf1ty5o4ziqfxmua4',
                application: 'gb5nnrvc1ofvbydjl85lhyr8y2iabsjyukpeora6ick9esl44cirlohe3yzl',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b',
                hash: 'n4mpj2vmed1azv9avgzuhknz0annyo4x9rs7lnfg',
                tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                tenantCode: 'ahs51xmi9zgg5k0di81qn6kteck0ea0chzjrmwb9gsmbmhxspo',
                systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                
                version: 'k8pegm089pl46wvcynj4',
                scenario: 'auya41wzxfi5ayac7gsytc3bi5thunkzkcwvmntaouqcmx8yhgdkfg5xni55',
                party: 'ftaaae0hd32g716oormkg7gycfnosjarupjdjmeqk0ofx21xfftvlxfngjk4c57skm6w6nfuc2qpil9vevczx7g1vbpxm8z1zamxxre5jjn5ocztakib22hy1gu7ll1af2en1qz6hc0tmzkoxwx7oyihgg4xvtmm',
                component: 'kaifvro5rebonobdx8j6o2jnsyhyc8gs1smds5vji139blbnq05r9kqacq1l4400xtlv01h9y62gvrm0aqvqt81d32kg1o3ep9ijx71n9afagixl8o5lk1ojtaetr8mzybdw8tp6a98aep46gbogdagzx71o99za',
                interfaceName: '1cr8s2lfvinhsu7lqrm4ajfzuv9xedlsd3kagqp74gnlm6cxs0rj4laippi8051kskqzg1jgwo8spwo1x5klcq9nl2xb6asd6mwfhos1niwkmdsav599o59gz8u75pnxx2gpzqkskbn3eb2qrb8kvz8yrna8mvrh',
                interfaceNamespace: 'hd0ln8ihtx6frwrdsxxabf3gnzp6m1zlqgg6bfaqx6cgmcyao13jczj41s1e4fiplt88em8kqvnl4swb6gcmicrt503n4q1e4k67grfny43q9vr2moj6n5hebs47nw7cuqc6bup741aajmqz1i7mp29yjh7xp19x',
                iflowName: 'hmtu5wqdbi0dr63hrqvji0vhrag6610cdak3msvzygz79tonupx8gyaekre5xuvw5d9vdi6go3ojso14zrr5bppme5h4sl60ifvrtwkv56ppncuw7djmv6p6eg8fv68qmdduhl0mw488n5f451rjei1ehunfi8ie',
                responsibleUserAccount: 'iyh1vvmce60lg233wwx0',
                lastChangeUserAccount: 'qp01de92o8i8kgcjbpdt',
                lastChangedAt: '2020-07-29 03:22:52',
                folderPath: 'i2cw68hkq7phjoj0124mfp090ng7qpm63he5zh7bowq22g5ozruq3z6d11koycyay5q5plsm3ali3vu5o6ldlal71pfhnzu8ktbw5h5eiag31vup541ldczfj2akkd04j01wmtdgj1bt5gfl0l5a31lept2a2pxxsghqcxkdumhoism0bc3uk8ryj7lr1cmq12b9k020ae94zatswxct56dikyuourrrcpqs0atjmi49575a2dhhnjfomymeht7',
                description: '73pjn3ihkp102lz8rnv1cpn91ykesej41u9gr5zpvpr7azrzxhpwn7ogdraw31ng96qjcutklkc7lhsd2psyleh2b9kpqri1sqqwl73ay6qr85dfm9dyfrdfzjdf6cztj6cr97e30ci2fv6wo9zio7gz9bptywfc2al32dlouess0jeo3vt0v6uyln8um4i0ns20fwfovn6o6vy6yj94tee2lm36dn8m6akwyq1vpjtm24qzj00d42g5rsdjelf',
                application: 'gc3uh891dffvgxnswdsf871kjm3bg60t6ium3nbfoi4oeatfvlobskc9tipj',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b',
                hash: 'trm44bbnlxrnx75syfsbivozbs0k90qsp14rnqm9',
                tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                tenantCode: 'dsbwq23vpn1to1gjh99xasdhhqcsts94ie6r3zvnzuvpos06hx',
                systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                systemName: 'o3rdhzmzg8zw9ovvkpt5',
                version: null,
                scenario: 'ixvd5ohwd1yt3et5kopk3r1vsiub3raqm374qko5myecryn0cilwdvyryjaq',
                party: 'j77824325z2ze0gw4puqwhh9eb8azsrsreebogygva7tvbg4g7cathdjruuxrtmbpop43vcv2la4s6c2v4ja178e3wfyvdzlwhkd1mcm11bi20kegovai042itznjdqbws0sx2ydant5flq2rt32r47726fp2zur',
                component: 'umwe6v968m67pd06gj3sxt249usvc2pvagn0nvvl7n38q7dl0zy8y7k69o8gnd3zzdsbl1xx63z5co8tcfluyv6ollprvqpaudo2ps38fy4ez19128997t8jlii4v4ofw58evqai7xmwr40q2y5d61nq66ihl5o0',
                interfaceName: 'snqhafke58nquohtiz1a6kbh773f2l8d1k0ruvm5xtyl9alhrfubaqbnus310y3e80x07ckks6a75q4bws2s3llgmh6ux9hyit3q8druig0v6xvrb45yxz6ewgqzh8kuqvb07241p014uwd8c3hywe6zakkohn7p',
                interfaceNamespace: '2r5q6dimbu27v48fh7eo7bdx96hqcuxs74d3epxah6v9ftfoaka0fgadl5nfkpguvkiy7f9fb17wyttvnxi2ir86z0je01bygiibkhvohebv7wk5mpew2h08qov5m4yps4ogxqcvflqdckdm8qgez2drfvvg7my4',
                iflowName: 'mg98kaab9rehrvjrxun6bh4n35g0mz3u83c63swnb676jxln0xcy63k0ktjcogra02boi7l7ddm5cowu68e1fze87sl83izn5g9tontgixd8rle8fm31l0w04qg9maadplsrr4ukdigvd0f3qdob5i8jp7v2zsrc',
                responsibleUserAccount: '2w8890it12vzy5wiztu8',
                lastChangeUserAccount: 'aforsytfyl1mnxncg3c3',
                lastChangedAt: '2020-07-29 02:22:45',
                folderPath: '3811l67p0x89aosk6kve44wrdfovrtvlw45miwl7c4ynld8rw7si1pdc7ihgsf6q4ow60byafviixpm3hfe2xoo3zzjzjo3g1aho39fegii8csrb283gm15m6nl704vh1ab2xmveczlma417vlf592l3gncac10ulji5sofm8ksvjc2a89i6llby6p4rz60pdoxf80pympcw6lmgbhqloqi0k3sspgcrblzs086lo4454jfheoa2oepfmhvmiqy',
                description: 'dgmzjjwy7cpffohwfa9gswovqxhwpf2z8ilohq8pwmo4qj3n9v5ts5fkv95jzp571cfzt840avvn62wcl1s1f1utwlh5ybc9ck2ie1v3sx3vqa9twk8m6pxg3j5y802md1vx122qfwxwd5fa310lwcoadpe2pumlxhb5h1z8ujuqeqqdbe77aktphjvpso7vqwlx16su1s9kdl3726c7ybffaq0hvvcztxv58kkmedogxeg67np8q8be81zmkpi',
                application: '1zfcbm21muvl6gqmmenbinisvkscvz5cyso6fv73mkfevmwltpv65ersdeu5',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowVersion must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowVersion property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b',
                hash: 'puh1bths4nd0hzhi4huzfirqausc8wekb1yrgnp5',
                tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                tenantCode: 'qro1wgy39iqsj6rsyo9tphz4jgy3clx38musv62cesuhgvwopc',
                systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                systemName: 'kn395qvjxg4phw4474y5',
                
                scenario: 'e41fmzrzqbn7vdu7m0d617cv5svasjeizdpixftbm5fse014cvydbf9e798t',
                party: '2a3s24ktj1lyd4moe1k0mtp2yc7u7ygj4gqwy38ne7bhq7k9a5buklyr4pnvxu0pq7eqqogv7mkjf3yvlk22zev26p2x6q2et2m89651972ur28nmzgrolmkuhj1qm8pic8h6rmdzfpfiyjb32bijwcizjyt6zty',
                component: 'pbv0h3213jqp0yf1tlqll43libtn0yojqlstsyu42d6vgj9e72rhd26wo0opbj6es6hpvbopgj1xxzs52eqwrs1nhzawkskkn0fn50fzit0cz1ricw5b4osijg10zv998v3wxm11w8pxelr0k9j4626gricr465x',
                interfaceName: 'yzy8vjio40u84aun8c8gdswyoqh7gqesj2u2yj42odtwneq5ha7pudul344jfcty934zra2kr2eeob6zs915wq8sxs18ch2ilbdhkajvp8308be5c28zy2kccxrrqfc4qqlno4p6cs2s3ac8hjafhqq93lrdtr2j',
                interfaceNamespace: 'zkjpqy5lbzzqk3r6jhy4j6y4t8ddy5gb7viwwdl3ilkpn7ms3e4j6xr0luw4fje3czaw2krvmsxq14kemtvnaklcwk64lc49q4evocphf7jn5xzs4jy9jmkx9cpzvzsnbcgcttgxlju9ka40i82y2l3zkmhroc9i',
                iflowName: 'ues53hjtp6qxq00tj4nugc7zj01mgbx0rown4cdqjh2t36muyfdw9b33psa1i1twyv9gzpwfjc7uif2nfj6o29zxjz3tulpy9y2uqrknd2b9cqgrt21tjdo5uucxi77ws27mh6fizny9h2a8n2m0tzgn2x80bdxt',
                responsibleUserAccount: 'nscd498a2golanrh10mf',
                lastChangeUserAccount: '709swtq2b01t0yp64e6x',
                lastChangedAt: '2020-07-29 05:58:13',
                folderPath: 'zti74lwre6y12ffomw0z7osjfl3nesrrwlzn1lyhfcko8yi7yyq2mmztfi3819jmztcr2fcjzqke4zbijgoq6ppyxrax4o558gnltqusbkyeystr25mbpl7u97d5335j056gxogsdwh2i9hrod1axa6hmy6uuu0teaq0ywknogue1rh59g81xzfiz2ossu9qnobmlrcz4fy7lkvdhf0eaikmwlah1vzka3rmutwe1wv3yaoqb5txyoxazg3hntv',
                description: 'fish2ba83ho56u5u8kof48hj762n6u5xs4e64mg57frfbg4hgvy83a42z9rg8xisd6hktcr9srihub61ee0gd06yjaxfhua2m0hf81tzaxrx1fxqshcukzxevzzm4y1gt794b6fs21dxzcrplswcwnmlrlhuhy75i2j8bx3waxiikfb2ce1ydy0iifu5hx6hmn0hf8naj1un4qg3z96otfbd23auf99shaihrds94hvdq1mgyyz7uhvahee6r7w',
                application: 'nijnzviaivok5p6ofviw8k0w3s0dgsbo960j9o0tkezawq8lps048zma51ev',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowVersion must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowScenario property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b',
                hash: 'b6gnox1deow3nf37e0y05hjebceymbqh5opnfzsb',
                tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                tenantCode: 'p6f0r98nnvxaq7nc40lkpl8bnee7p3a6n3zfh6mth5kzfj47zm',
                systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                systemName: '8iaprrzosd1oqlf7omcg',
                version: '0rqlv1ltybhulrkiaqd6',
                scenario: null,
                party: 'u61jms6t5zvdiexqvl9gu3rp0zo0sol5kkkg0k0gx1uvxdm06dy0icm45noxvsgpkmmqoan0lkf7jzf2po6eujhi7eobblc8ubpqj4d0i4is01c5n3me2ey07a89kaz86y363o8cyaxkcn4byaoilqayw10t41gs',
                component: 'gfvdutsix7vp4f3fuixn2z7q4mebbflewnzo77qpk8err8k9br7qhny6qgbgmxqp3nlnsluwkz5ayvdn6dij4fcsf10zbj29z2reoxbfnkz55wedpj3e5zz7k6brfitdlcjqc0bypqlsp12k824g4u2a6sc6mq00',
                interfaceName: 'hd2o269f5bvljtz8eiaq7fkyt9fdvh246lnvy89x5myienhtsbgh1uqj0uayh1577xivukq343fn5bp7s1oyhd0lexgh4luz6wt6t2zby4syp6hb2sggay7v9nhcztrzatmh6cqu5dyplcefxq8b38xehq0ch8qv',
                interfaceNamespace: 'y2iveirjx3sp8fwkv2rpr91qnctgvoizuyozekpm9j27rrl8nb6x730x7zdwcynalmfy0598ub1jxf04k7l7e5uy7xxxmcr91rygdrurao48scrfavh0dc03u9a23sj57v7zzns4g6693zg56a64sdt9nc409k9z',
                iflowName: '9cyaet28s1ldob16r6feokd45u3p2h21n1j424zv0hin9kuiboz9wsok00njleg89ozwgc7o00ucqz980crf6lugxaz66inu6zeqknup68tjzwkmt3drxz46t64x2k5rux0wc4rsso9in29gek6z28iqs7yg3dh8',
                responsibleUserAccount: 'rihnmtwxgnzstk6oyrwn',
                lastChangeUserAccount: '22wpmgcggp0i7nqki85x',
                lastChangedAt: '2020-07-29 23:34:23',
                folderPath: 'x8rejjkc7anui6h4z3qlnkkf8hpqoabzn0hacybd4shpj1x8trm2tod81schlo725v2jpy1jxw5pogxzfl8sx1v6fph60l1lp6a6pfy0srw3ko5zzpnipv4t1ueds8rsjlzyc3e3i1g4c9xc7cntoiyquzr03pwl6tcnw5xonh3udkjrdn4sswrnd923bp9t0g2dy3hwszfmvotnctq15v1k0nwexnar1kuvfe6h1mf0nmo21zg02zvvx56oyjg',
                description: '7r9p5cv2v9e2uskgpt73jqan2qsp0s7i9mikp3zqo4ma7ugq53w6u63x9wgbcq9ij5ivq5ddnc6doxuza4m5t08le6ptm5mkdnafgnfdf91yxfy7ovm304lksbty2pi7unmjvldbqkf195u2wxxmcnvwfg3kkotdcinu7jag6wbdjm80dxoxz3futyc6nbghet1edagdeeimpgsebtdah37kz2d5jodqmo9kdkq6h9k3oosto3yl1ehost52i4d',
                application: '7cyyq8kf6hzv25a4wjjw64jgs3f2dfgzjujvohl7gtxsllxvij9vo0xpwmfg',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowScenario must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowScenario property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b',
                hash: 'gt4g7z78ib04mowyncq0z2321srp9zk6zh1k4f3z',
                tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                tenantCode: 'iyt7saotxg47k67xdc1xybfsk4j0xaim3v6zdjxtpg45ulz7iw',
                systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                systemName: 'iu8y4lflpaep7ettu0rd',
                version: 'jmwm69auyxrkfdbgmgga',
                
                party: 'dn16eqhg9c6h7kwlvp6a7h7rfutpax08na3542b8zi6dp1nb8e3nm7605cbcnsp9xutxhooj9ua14o21e53v756hujce2bcbfcmy2yrjsbj32oysbwjz7ltomlpzuxzk5ywpo5pcf9o70q3l6f7w4qitevqz5ibu',
                component: 'vebwculbkdcmh7k2zuaiflayznwa1k2ojjfju7w29q37i0eh4ougsll3wo4a68siita9vxd8pu50ulfjivy8jfcmqn44gz0rv14rrih3t45pqpcuqeza275fan87gb2kckl6uz0tk993cknl8hdcdr6qzx76s7wn',
                interfaceName: 'ah9whcidqs0uq3v8m4wdljge5zuggqwwfhe34yn97usn3e3z6b06y79f5c9w6jir1nuibozl6ikpbw7rw1caodltp4bxkpij4gajtmd2wh13i9pm7rujciytt7f1z44atcpglzu3a9tbreik13kr9g9igfgp297f',
                interfaceNamespace: 'ievxzaigcil3yey2hejf5bv1nqze0yvy88n1ksddw66ezluag7dk7ne44o1003pt8uir1ndx9nra62hm8p5qn7to7687l7fyamc36x06paazg3hqigwpocsb1tqr9031kz7vp8xd5reiz5aceim3f4kf1mwkge1i',
                iflowName: '3bg9pxdfef0aew9oxrtqs5c4w4ppeq2cxpnk9ro5d9xzczoqfahonkux6g774uci7inuyvdncs85t1r8oczsibduc38ifnh1119t2b7xbl392hy6x6fl6lw0e63o0d5adjd8ik1iaok4eqcx1r4hiqpkzpcmuqnj',
                responsibleUserAccount: '2kov3izs6sjo7rg9zxf8',
                lastChangeUserAccount: 'f8bhg4mzvfkoxo4dlj3f',
                lastChangedAt: '2020-07-29 20:12:30',
                folderPath: '6by8szgzpf6uz75wr03oerhnr37koc6mnvi7kec7fxwjiiikmvijju3oac8zreeydf678j6yain35orbetf5sptxhgil89q5sst3u0ubhp27xjd9iaua0kxs26j5tef0u937722foirowtm4yhrug1rsoahp4lxopva34liru70m8fjlgin8lfvkslyep5hf9vunewzstqfqh0rmemrqb7de5lsgd6w7n34lmyseznctfnpvjpxvew0bja59vk4',
                description: '8l092t0x9jy4b5sh46ghalu60hd38e1l7cys80i4az9kup3iuv6oah4t0j9h8h23uspxnxck7y6uvq94b9rw7iwt9wrlh5qbc0lilpjmxmvtdszc04py0pne788tj8csgwmnhib5yuj3r174jmlo0rcz44l2w533o8lzy59ooso7anwsm5vqrb8kyev243fxo4yunx8lxbsa6o9uucd9kemge2nr03duq6ctyjjy84btr1qz1lf69mg7gvhqj84',
                application: 'gjrqw0or0wqbamcl6hu02vhwzf0ecb58hdurlljzq615sun8t5a0p2vu5qru',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowScenario must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b',
                hash: 'sroe5gqodno51bsy0uz9egp3lqx9oishodxibku9',
                tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                tenantCode: 'q0yqxnpi1efj1ku9k6g26o2gdechefcvmjpwezkm929akw49qn',
                systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                systemName: 'vyplnpqfs9ug43l92p53',
                version: 'r4ce3hntonetc7wc8wpz',
                scenario: '998rjsbjwn7h9oz3tbrmlavnwkw6lb411b7six7k4cr5847yj03k7m4a8asa',
                party: 'qhjh440vv1c37pk4q64a51u9dwbo5valkrnu3s1jpjw0rif2ia0ysufsujr0wzso0ps74inkf4swxmha9ngk0msxfott8hr8uw6j1mzrtqk3icy79pky7uuruxoi0q37zgbr70h28jqiq1eim8jjdc1t75hbulj3',
                component: null,
                interfaceName: '9ow8tbov73i79z0e4j46kuk548a8g4um9p9oyzjytqgnfxx5mahmz3xyigdvd9y30odghuffebfbiq7ab751ybx47apfn6r9pe1uatduk78ghbye8g6qvuz4hvad839q85v7a56bimc7peei98d1hl34gsxkb60c',
                interfaceNamespace: 't6dxiq9e7ey6f9ri6voym60754w0i2fk32wwwv353yqha1qrkdoc97gtnkch2dou6qf0mqpoo91eci2ynykszou5b7z0i567xfogptqes6ffxhc9colbf1acfgascebhebveel1w6oy112ltxwvsekfbys2bs4wb',
                iflowName: '3akafs2fj2p40bzfppqsbz1bnbr7hl1gxmcmlbhqsdgdjavp7ncnzrvxsizz9mldhi03c0hxhf7ojaumsivllafeaenzcvnd4y7ojcgxwrfgyxvb41ne6fak9jf082pjkv7ii0m568lad6fk9ifv81h9piw4wxar',
                responsibleUserAccount: 'ib9gpchev0j9ijvnosd2',
                lastChangeUserAccount: 'e6zqo7n0ih9omo8tn4bt',
                lastChangedAt: '2020-07-29 21:53:52',
                folderPath: 'q3mw7f5uyt7kobf8fd3siql08evkdpc029pjbakiej85fpgrnsiy9to6d8p9ahjxxgn6rn9uqjnlk8i2573p1t7l0xbui6ajxeeax1wiae50473fmpxs138xfefk47mr2qjgrv5jfz3gidzbrdzzknfd375ryy5alf39ajhacpsfvl7qo1rh5xuh7q2q8fh1vrv4et67kpeohzla9atll4cuc3fz5g5em4i87nrxnxgn188ec8lxz0xe2iw8hqk',
                description: '8u5v3whs7tpfc2zu5prkpzha9qzvl90xgnf15y20k5xuct98ckt5aiyuzsbq9nl0dgg9pu4pdc83nu8k3h0673xhrxj3tmp63cr4qzjtec9fpysay5qfnccetbb7g29dhh412gjq30jod6mr6phspnl1uuujs26ee8ip6c9v4vfea7erqkr4pqc1z6v25fjesegq9sl2nopcsdwqgyuulbbaxslruvkmgwi2emwvr0juausonnnv4k5wijic6kn',
                application: 'ved2t5e6fju0io95jeij430jy08ppqfyv6nswwhj8g4axeji31921j3ts2ex',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b',
                hash: '0lp39ig0oc3g2y8km9w617rlyp3313nv5ar4wqsb',
                tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                tenantCode: '6onsheg7zincd64rlrjg5wactazbliu8xvu5zdnft3z6x2s0e2',
                systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                systemName: '369xcfibhox5fx43dvu0',
                version: '4giu4ofc11ffl2ozx5c6',
                scenario: '5u9ypv4uvy5nol8tnmhrs97c46ko2okz55tn62el001mmuwp2mgh8izz16m2',
                party: 'tdagot56nukx3vz0hc2na2sfqjxt9qpq4n4g0hpkbagxntqrnowirybos3hutlmkmrjt3t155gi0atitwzyt6hak2gj9jjajtdr1q1psx80mpnrilpovrv49pclxxjzwsbu89trizg7za6co15nylzqbmkp0ww1m',
                
                interfaceName: 'rctw9hxhw4kpjg1vmy387xfq0ki3urrtcthsxp7j0kppg15ecmc3ekzabpvlqqpgsg6an0driaa6bcs3d0p3rqv4cy58toglzx595d649t0kzhc71xkkef115jkuue6krho83a47wi4zaqithc4l3edrvfad1ahw',
                interfaceNamespace: '66awwrrbifoiiuyvsamhi8m9hejmjwc8tagqwhwayq1hu19q3ajdydettjlo66tonljq5xot09ngpjii4lxwledbvvv5js1irwpv2erxrskb91mnhy58rcxfou24xewkb4arfuhodisgckunnmlgf6npvpwf6ifi',
                iflowName: 'jnimsrogru0z5bg8wqqx86p1l0w8lhvbp7kt912zwd59kbw4mvgcul79azxguqcicn8xl7tfvha1fiupk9gz5qj44jvbgvmi6gee7f6hlqtxzedililoeqyirokxxy3axbjufn07kybcnf83368sf7fb3e4xkd8w',
                responsibleUserAccount: 's12viryyhr19dbmemhv5',
                lastChangeUserAccount: 'bqlo8obzcq67aramfizw',
                lastChangedAt: '2020-07-29 15:59:36',
                folderPath: 'a7s6dbvzshpsn6r2etwd936i7cq5v0vrt6b588vak4ry65w4p7p6skj0qp17y6h5menwn56wlh6oeq8wz4zntwnv9lmckiahi6a3ykdky0xpbkzrmg2bizu3b8q0m393azgecqrvxfzv6dgtnp017a6y7w8j2gzbwah29671j323lwaxdj56u1g1g1cj9rlvw14exu6wno8y3v06kk73bs2u70f4f9ale3gvza2gp4u438l69cqfpdzff6zy7y1',
                description: 'sn22g0se1zzwpz2cl0ky1yc1yc9ropoze25xu0at4sb46tc6f11rpe4h2a9ivf2j70koetbnnf81yq8fnvdwm6la542li4c2kqavk6se8797ljnb12ef3ge2z8t3eq7626jajdd2ibfezijo77lcf2cli10n82etjc9b86jeopbo8sv1k73p9l3rpqtuta9m2u40tehjhj6jn03tv2wy6tf53zxuaeigctw6m76frdghy291kdj8o65698fursf',
                application: '27lp1pn1qxoa2695cactm0iif17yym0eqy4fzjpkcwcht6d03o9exwhryh8z',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b',
                hash: 'r0mj959ug4ufcu1c0biy4sorq5orvgtaggdmjgdh',
                tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                tenantCode: '9eg6lss5auvuxi4p8qwciy1d5xmidyni5515pv17hjt52s0f5x',
                systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                systemName: 'xzukd5q544rmy894a7g8',
                version: '75o0jpkgqizcxc3vqmnj',
                scenario: 'z8gshalhvgz6sdc363gum8isiw3ft33csqifkbdfy30x9k4zzmvwguk71a7g',
                party: 'xtb298cokr9jx7iy3sfd6pts4xcmuuffjqkdjtxgs7ms5rp14em7k4mq9okg8hkwf3kpy8awcbhljo0r0hd76vrgip9lvblu138z360fpy8dij5jafo0rtm14qk0y22dd0gq96lb8881boav63g5iejjyynsglgf',
                component: 'xiecpdzxv9srojxo22f77gyrp18vy1yzm5hjkh0ojrqo9311z55r1o3l29tib3bpanyv9ferarmbtkmpf9nqvznxmj8zngwq2d47cwjfieglpkvu5kenkx1n4d9l2sz89s1xvps2ch9cdriqe26u0vfqxncf7sne',
                interfaceName: null,
                interfaceNamespace: '84hz7lvn94gk850684teg0axooqnj48zqvun18fj2gzc4oqen045qas27k2ulxmz38moqy093wngkmvdeuhhfywp37qs67tg7vf5s0dvk2cus8d9ygpcrvzr5izqnddyocv2dxsvvsw1pqhov5tx6q2ofvd522u5',
                iflowName: 'q8prqrosu3uk92c4uszgu7qtgw1ur7gi0ywfu4qzz8qvkqxlbtemc8rzomqvtnctnpzr5ibg0xamltit4op2ir0jrfx4ktech3add8tplunb3s2z2xm01xirfl6xwgqoar8dvzmx57slt00cmua7onruwlcarlxl',
                responsibleUserAccount: '5fkpadgjttzdc9a68u0d',
                lastChangeUserAccount: '09ncby9jenjagnxpullk',
                lastChangedAt: '2020-07-29 11:11:50',
                folderPath: 'zjnzzft5klkebh7z4qcg6c8u6xhzm8hucom70kogmvfid91mjas2hnsx074nie5d7h24nv81qos08myk58jhslqe7rvwh1jtr6zt3mt4knk8oict8beond83czjs9hhrf294m1ndmt3zwxclz3cl6ottr5s0i7serzlj89qihlmqvlt6x0chnq93n88pxq4xrmkdfvi2qq83jjpe97d2yrh6pfosoxsl8mnkzo9nzqtytqt7433y5ahpelq7obz',
                description: 'kfqz6wnvk2kewnof5pqk2cxv60bqr5zm8ze9upysn9c1tojd1selce8wxr5hmkly52ljgvmgtfrxj0aqfvw75jevith69hurcpdbclm22an05a5u3kdmnix7cl2hg5jkzblx505n0fs3xor67kybt2rrnmrtvqvldzhhmdkepen2jgcdc626ncibpc2z3u5ktgko9j9nh040jljeu664xocrvovcz3zuk4ptapaoq8q7xnz5jnodnd5h0oo1t7t',
                application: 'gv6tq5bus45o5zt9d3gc7q1xm3t9az0fclhc50bb39mf88guj2ssqn9l2k7n',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b',
                hash: 'ejucsym3cgc5hr5yvs9u5a7lq68c2emi7dj8gm1j',
                tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                tenantCode: 'mky0pdmbxfz6ok6qt5m4lweme4r4g4piuz3y502jg0aze7owsa',
                systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                systemName: 'l19gianunkek3r7phtw9',
                version: '6xrsllz59ptg6rolr9k5',
                scenario: '4ed1mt1oy51d9x1ose5r61i1si6z0dpdqju12pwk28y4cxk2xi8a36bcjtj7',
                party: 'ggf5gqsq0y4zz9rh3a59iek5pevgc8jia1edcqmcwk2w1vgtneuoor9exz5xu7caurjb6dt8nubt0z86dgnms6jp0nnby4ebel9wpei7sgjeiexu5r2yjlb16sn16tb4ogv5lp81967sgkiosb3il1zki5ny78g4',
                component: 'omt5nejazdwkl5delifppe7bkuouix9b9f65mvmwi0x16a4r7e0ge364yphrqbtb3h1peg75t6xq8qnkb4fau266fmlk0biepar1t2h0vgk4jkgzk0uegwlovq5o2ohhhw6p5pm9qidck1ykv18rru52sik937el',
                
                interfaceNamespace: 'd7c05g7yd0r3gv0vdbpdk8z9n8k7ajx4rofc4zcihc5milntaw8frw3qz7atwfaylq1lx1qvnma1yftehvcpjnsmjgw5rwne1rd0ugfp490ia3cbr2xgctpp66vlpuvscr20fwud28kf2k5l1sm6vgdi0prvaz26',
                iflowName: 'gt68ww12ssz882wyooig2fhsvmviik8o52m8p58epvi4ub59905a4xugywcze7fnmjzg97jr47w3cspm1cx8l26s0ghkx5wshtufflummrac9buw6x4puaru7z6qqgvqlmzmjrj64v4sx4djpzh2k3g8dqbzt8xl',
                responsibleUserAccount: '36cm3yun2kh3ei7fcaqc',
                lastChangeUserAccount: 'i7nwherm2j3fffvesinz',
                lastChangedAt: '2020-07-29 20:40:51',
                folderPath: 'uauwqrge14v4tgf2y753i5le8cwgx2x6daggrv4g58exejj1c8r9yu1l79cbvy2bneg803w06tmc83jlo6ihuvgpm7nwk2ci9jdnq1pqau7hcx7orrt388lr9j3p70z97kkduneg6nnfmbw28s38m3axrt2fpewzjqshbxdhiy38tg8f218ya7ck36328upwbmgs9pmvz5zwqi3f78kfl4hvxrevr86r25db6w4y3p8wiq0756y9jtmhsva24l2',
                description: 'ekcyg348jogtwr8ld7c2tvst84c1me5pask7iqvtdh1q0utlbgf4povo10r9kviafh5hw764jbu8ejzs24t8p4jmqe2tgmhqm81yk7dfdd8vu0d5puq6hfphtbsy3rk1nhlduzrycqpxwkypu45koly2pztszliobwj95ij2lgxt8szlyhy2dsn213k053ql7ztfpdswep6553ede509jy5x1r9b0t33m4w3ha5nnh2tvzu3knf1phxooz7p2tc',
                application: 'idepmbpbmn1spezh6gmajw8b26w77tpumnabsm6n7pbhggfid8hunz544w1c',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b',
                hash: 'h25tubgju0bhu0vjzzsajaep14h72uy8py4enbvq',
                tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                tenantCode: 'q7vy02b2hcg6ggnyllnw0bpay172xswbvvmsmt978r2periwqv',
                systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                systemName: 'pm5y5gmxopiuexhwjced',
                version: '2cha1tciw6bhm21415vr',
                scenario: 'q0dk66jlihaiv02ie7qihk0arl3yla2hbr3ftiabg69h89lkc5q0ztdkz064',
                party: 'yham8d98jp5pn6oh2wg6igwfpsohnyluvsxoxj1wzyqolhxlvzuo36aqpg35yjvaszse847zaruo8x2p7n13kuyxuau8nrl1ejlu15h712ryw2smd9thdji25srq9lhurr6slzaqwoqf44hbojifrog00q33ykn2',
                component: '54cnwk69da6vzv3r5c2c50u8nyug8y58usdd29wciocdv07x5emy5jmrads1pgjvxke2fc1yeme8iw07mqf5188x4rrpe09qwv94vy0dkiqoj3u5mgk7zgvg7b7i2fwgw2f86tsw8yo9ecxfv3ptpex4lt58ovxk',
                interfaceName: '2q6l56hzx5ob7oo0fwbsviuee13340nonnycnl87q55fni4eukkrc7vbzcwiz9itmpxsgapx6blu1c7hevyu9sh8b8y2jcgzmwd7vz53yofoci7uc9s989t883wxrjyx4b9p8wglahvrcy7xt641izlnmz9oelnr',
                interfaceNamespace: null,
                iflowName: 'zx9ca87xfp227aym7noevook0api2kqom5f59g8ccttxc2c7pfwwirdebvgd73kay00wfquo7zdavbvw88pi93hnjjjgy3qw0tiyo1zr72uus2u6jsyrdzafx7xbuzjbvefsx5hneiizfemubeivqcaf26r2n878',
                responsibleUserAccount: 'ki7norepfn87izqu7eco',
                lastChangeUserAccount: 'hepbtjqmlbl08e88ndk6',
                lastChangedAt: '2020-07-29 11:09:01',
                folderPath: 'jjlnvu3fy89smu6zy0nuws7h6ojki6tbgghzqiml7ieh8cetadsqhx6t2h58elufid5cmzszb29104ha8zis995siy2z5dab7qemmvb8ht70dfkm1win8qba5yx67z9letb3bjw64zmjsalt3fassfl0j31lcgycu09pkpcj34eokv2z72ri7ldlt55it5uqaa9mbpssgc4cr78ljkw05txu2j1n6d434kz8v3prwj101yrzir7y91biercxzgc',
                description: 'mrq5yzyru9h6hffa6ffu9srwbqg473skknsmxuagy97581pah4482sylc7l73bq2x7jdxmdyfh7be0ith3cav6fjkv9gr7isrp4j7ddw7tusaey5k4qqubn7p40lpeb67cibk4yjlnavff9q6amkxsucgzm7wrex3ttwvhfoz9m6e1kytc6wlzn5xyup54pllwtrgbfy9ajcans8xjidhd96u5sj26rhzg7utf60467p89bgiikxom1xaz1lhen',
                application: 's59pgjm3051k5ahup4l1hkqxw8ym6lg7ykdtjd2nzj3rrzmp8exievmc3qrj',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b',
                hash: 'npxfshliufqihy0bmq0tgynbw03md7qfqqzfghcg',
                tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                tenantCode: '72jycdn2b2geodml74qlhdrl89g9p54goqs7mko1hgt32tc3zs',
                systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                systemName: 'kr4qph6c3lw6phutyxnr',
                version: 'ikhpdq16v8xma1v9f2lh',
                scenario: 'df26ik4efgnet5ojkiozy001q4a7vryeufjzvew7lug5e606i541wwoyuu4l',
                party: 'ayu9o19rsoqgv2ux601gac380be9h89o4zn39wovuf9j77aq66nacr3c0u4321jogxax76dlciazvozcoau48khm39bk6bbsht3kgizrlaqny4qz0scu83tt2rhwcg7mv9mp6k6hngkp4ejk5xqark3vxhj51r28',
                component: '0f60jalw96nqo8kjhow90mi6adnfr1gk8eucphs61c8mgrx9leqkir2rukwoctvyoxwbo24xxubpzlw7lxrpqvsp0la6796zssqflyeottuexesuhvdee9m3v63s1298z2vwydbacidnlgdkjntep896cz3oaab5',
                interfaceName: 'btmptanb8fs3ja7v1eqjpy7g8h96w89q8efzp5csfc2n6flv7llpgbwnrc05j28pxf2p8g97quzcvirmaukbuyylteg4pcr99mz9aq9pvf6yjmz61wv86a1neu3v2qw39qccts0jww1pq3tf4mripk6wizdoertd',
                
                iflowName: '58jn7lwe044a5cfr9ds5kjyskvxme44st4ax3zs55e2iv5q289sfkgee01eo3ne4mu9qhwpgkyu1tiejlcf7k1wbeeggvyl69bcrka0d3q7i88bmq716uphr094q6ixk6j3hl95zh6nheul96xzd7su2qsts5jyu',
                responsibleUserAccount: '2565jx6zkcsat8zerlqa',
                lastChangeUserAccount: 'eddrr7rmcvywatz4tbc1',
                lastChangedAt: '2020-07-29 17:01:39',
                folderPath: 'aajx7lp8661bzr2rc8elragst0g5ax4fosd66yg7paegbnn4lisrjtcym0azo2di795y2lx8bhxp5wbxilw2kl2jkfn5vaud4igkm6shsjhfq1rbn79nocxzff1we5ohqxp0wshn0utpqm1unozq3tk507nhouj49pdyzbb2vf6fefrtj1a4z9mds0p0ox1ofcfiboy0oadm6eo3hwx3srdxm6sbq3altxd6v0a2jzhnwxoo83hs3i8202iv27v',
                description: 'hd4d4qqtavbxyzabulnw5uvb4cqh7qj0um2k8zqrlpe5d2zpgbyx8w154moze3jyem42lq0hf9fpsyhxltm363m01p7bfkmot8dsxzyo6wl3epodp4bgai9d1mr722owhi7yf2r6uwxn5241qo4wmtjv00or2zvbmhhtg4ctdpbleg44omxw7ih6pu4zdnmc3zny2o6ycywu09xx5h5epztceiygsl703rtet6utn20lrr8p65jqo6840h80xj0',
                application: 'ijoc71waplwjyxjr1btga4ejkxo0q8rq6f5b80kfkq8vsa60duosgqy8f1ls',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsCritical property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b',
                hash: 'lx2ggz291c4g5egb4mhev18ct4azoj0e2owu1bjz',
                tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                tenantCode: '5ocn1t0t3defg17ysy6hx1fsbniejgreqwkk9625qs992h43fr',
                systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                systemName: '7qllxjvcaaawvb2hbo5n',
                version: '2l5515lbade7zfcvhdwz',
                scenario: 'wm22b8itudtyqcb0mozf1ivas908slocuxdkdtvahmz5rjho6wbead9heq38',
                party: 'aj27fh22r6sybe8wsqs5quj0mjnq0qi2qw9o9zuzwx1k5thc3rqxrly1o5lnuw936non9p0wg5sr1y05vro9edy23zm36b0vh8g5vssgzs2lo5gwsgfbpnpjufsp8l08np7ymsvks5opyqsqu20gzhy792kijnbb',
                component: 'mbvtcqcm0udw9q1rfymyzg09jxktzomkmvz5ybbbtwppguoxyqj267ifrtrxrhwcnemzu9vd3x7g07nn1db92rd3rsc92j4j9t2adfv24jmr9rzvpy7odia1ny8y68cou5754hive36iwp3p5h743cs5ssm3kg8y',
                interfaceName: '9116zh4kl6op47ixbspobu8rcscm0li2rz862i0a2k98zfkro8due9e64ramyyhwjtza76ccifb6ygycivbylnuhmho6ihe9wq8bacuvffjs7bgmhnl41kr3jqh6z9ustordwdy1ajhklrul9996agmr6m5bpg02',
                interfaceNamespace: 'mgdm00vvsf7cvdsiy5dlhhocqdom8dbbr3nnuy54q3lbmzf63b1t21iuvbfzigrhjlsa4cvpzoi0z8m6frg2mkcs7gmdegp33t5afu1me12d8vbnz6p0j29aoe6k8jbajumetl3z83wjriivhucvr86sm2zaprhc',
                iflowName: 'k5ii427igtamxm8qgbxk8e5d37rl9y89mdbx9kl9skyi8rou61sy8xil3qxggoledjuhefvw0oapibon2tww6b915x7izvkwlipq47cwda641rv9vpdjravgjc7nt435qki0g41yjzstzx5gsy32ekzved0bakq3',
                responsibleUserAccount: '5rokheinhakhiezkjru1',
                lastChangeUserAccount: 'okmgkpn5vmoe6tv0er6c',
                lastChangedAt: '2020-07-29 19:11:01',
                folderPath: 'ask05bi68ty94io090zxusupn46490r2h7d2qq10p0cacn3x0mq99yc0snc99fo4xz4f0k7h0as5b097i7hka6s9rhnblarlz9yxj6f7qmaid6pne01gak68os09hdm9k77fe1esqbpthwgh28qgls81rwbknzsbx0fd4dfqkeh876ziscalsilfaodbvhdjn5895mtum9wgyg5vr84b1bgt5tfijh0jd4vjeg5das09l7sl1j52mo8371wkwh3',
                description: 'tunjjyy5f7wy5l95s5gh94r06tpqkkc2d0ak6nvysa4tiy2l0be4shze7f2pzsvr6j7y6zu9xg3piu0aw0ejx0ntvzf8a8crmliba1j7qwo7xsbcog0n737m9pqf177byfo1ha60hklaxip4ycgus44q2hjjjjjf3486gy2zmcsw2kbw3423o1pcp8ubmerqc7iq4piunsq5z6zdcu3qbjvwxsx0i07d26ujcnit7tt84x0h23ws6g8l74mbdix',
                application: 'njdj2npxanynl3oj7cwrq6abx7o8ve65ktfxmr3yb6hoes74v7ko7spnt1ou',
                isCritical: null,
                isComplex: false,
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsCritical must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsCritical property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b',
                hash: 'xnpgxiri88973m6sqx1xcyqqdjr7epq3u3k0r3tu',
                tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                tenantCode: 's9hp9tvm5fiwyg73ulxvfsqd977lpe4ow95qlam8ff4x8y5uhr',
                systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                systemName: '9pmvjefrpeih7m85ib1g',
                version: 'fntofocpsoxn8n7zp0e9',
                scenario: 'ih09nnyl8umtxq9y15xgr3tc6kju2qjphwo630sq05gqa9off8rccssp4fhi',
                party: 'o58ykil1pbxg8ho0xusge2u1pi4uonebumhmsj07a53inga5mhpvem1is08u64qaawzlj99jjancrm2abrcrb2fp7jumkepty9ty415muxuwkyatnkz2wwqa445agio7pzj0ho6qn0m3hvz2ornjgxf5lzdqiupb',
                component: 'icmu9ttoceryf060zb3kz3n3rdom7mc242hai05khhk8z9nd5z91imgv6c14h7a8bre2lacnh41ss25ydu5trhesb82sz8fmzz3ii8wq0ggolb77qqvxov7d5jantlo4gi6ybkdg059dxlkr3oy41ieb18jgu5d4',
                interfaceName: '6ozmpb1hxabmdcxoh6mebqw37h5dc89pya24p2auaxxqpzh25sqhtib0bl16p53zjig1vgaur1c4hb5hrutbpo2i63we1zn6gpqrdm47ax8k03tkvkaqindpwfyr8opnerz5k5njkj9h2mobreyw4tet2e5owhws',
                interfaceNamespace: '9men1uahwo7ghzos6lo5s3yu8k7s9xwxod699rksamjnzmhirnnhj4qsblz1the1ruaq7vovvwk631cmi1kt0kyy4iz302kespxcc9z0ihnqpt1rcd8k9ne3aswit5ex8r2ekdkpre35pvciahqtv3ndtxf93mai',
                iflowName: 'wwt71mn43kfsahpyb9mw07r4se4o1cq8hw4ean52ikhpih562zgm97nqbp6ulre96vkxtc89cozym3oljavg3774r4qs3ysawtfo7sr2m0kky1l62fy61feogposo2jdahpdmmjk51xblqub3yuqjs5q45a9sqv7',
                responsibleUserAccount: 'qvynz7zbbnq6vkoa5awt',
                lastChangeUserAccount: '1ue9rvzicw207r7yyc7o',
                lastChangedAt: '2020-07-29 12:33:18',
                folderPath: 'rz6fi5todg5hrtdea7m1j3g2eaixzarde0xcmi2971bzwb7crtbc2n6vfd4rdzbqxn6wgi9rtls2q1d7cw7ljj5kogmynnlawjol3g0idyum5fety65njlmhh1m475ugklekv6i5snu8v2i8jc4kpaxrb7salx526k6jn7m03p8udyoa5jn9nl1h14h5gliuw1lcnqpx9kmlz5xyzepsjscpuinr2ede7cjjfzpk91mo9z6e2v9j3z2uh28n6kp',
                description: 'la1isyhwwzqg2rxcd0x0pjlvgeiuemzh45s7bih5xtirbao68eib9vanun2nqsppmage8x5v1pxp4xaxtoxgbnyd4ij9scbs02e8gr2jxuqr93l4yuwgyx9av2gti2jkyizhp0zspkqsdwszq058jllrjrkdva652iv0a4q3x58jd3f7f6azkanufvf3dw5a0ysmoa89jiu5u6owo67dkx7gqz71mj19qd4w3l1tgg2xqxshu742t4turycw1bm',
                application: 'b85xzygabtm9mr4cihlo3xxh4rxi8jkfjypd1qmxpovmwx09cync3j1ybmdi',
                
                isComplex: false,
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsCritical must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsComplex property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b',
                hash: 'kytcr9vzsqo7okktlk1wd8273d9o094dxzd4sjg6',
                tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                tenantCode: 'ons5ufim62y5jk93dbtuyw2wmp4ksds3bci2slt38d6k2cdu20',
                systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                systemName: 'blxjn8j640k1oci5e4co',
                version: 'sy45v02shs8gybj7oe9w',
                scenario: '3pilvlzwi054v1mmbm81pt9mfn42zmm8qd0b05byplwapyoodzic0n0rrqfo',
                party: '3yoditbrymclxu6sblol1emkh2a89o8lc4iktvj5w85m3aa6i00d5033s51daox6l9io2znduwpwkmp35uri7ggxksjd1qemwzazetampvxu1si7gw3azmfc39wg7p9otyem6k3d03s38rob0vsto1rhhyywdeca',
                component: 'kcotdr7j1ncmhz1n7mbvyyidpts9dre37up5adj06eehee6o3hzov2xqmdjwvaay5n0zvf3ropij7zl9amtebtnhynkx2ymhhp4ekeeboob88p37ekmg6wvoe0hy3acem6jc2zahzhithly60wi7d9wwtnv2ct65',
                interfaceName: 'srtnpaaotomim2qpequo47mx3lpkdvhi1pqjaut70eh55yp2gq42rltvxauv8rzdwo7tjdg2faem4dhs7g46cdgywicphbku8iwpmrucovohage6l4b9xtov89qne5ldvpp4mqd1p9naz9g4vgfo4d9hipsfb279',
                interfaceNamespace: '4xwo0g3fzcqyyzyakys46on4kh2v7kb27i60jgxz50lt8i5ruvr2qf5kvbi5rrq8snkjxkpw2i6csvf7d0zpdo1m6kxprvc58upjqpk1a2hf642g74x5i3cckixgvswuy54h8a4jsi68cpsim90kvswxga90jivc',
                iflowName: 'r8q2m0dy1sdww7osx66awhucycy3dnk25ax81n508kmnk52yym1vjv7zlgn8hmqgcbzo3opoma2s40cc15zpnri08bebuhqtpfzwtvpdle4zpwsct3jo8lnrvurzl96mv0tscj2e8qvmjbi4wxbccwmy62m1u50r',
                responsibleUserAccount: 'vw8hufrmtqeqsh04y5tr',
                lastChangeUserAccount: 'y616ixwh37ichl04hbyj',
                lastChangedAt: '2020-07-29 09:41:20',
                folderPath: 'd4j23z8ybh18k9iuoaffu1ajk5uu9u0ia0rkk1m2m7974yofpiaqhiamnq6tgvthjyu9b8hni3jhkuqf44rxk4bh24nnwx5rf6fpl5ppwsfkx7ribehjkmuj806f2sfhblg9w0mizxa3r9jyr90dr6b08x5doar72wnwbnw5uafdzgzy8l4ay9dtnr6cxi7a7yz4z01boh3cahfm7mkstow3476t1ah4y2znxrkxyxq8d10d5aekuh01evxv08p',
                description: 'bwjtveic1187v84jr8jg98l5jdjzt8km9nwajmxztth00yxc9gp2v8nk08h6bcu8spd7bngzmgwf5ib38s1sn1zr0k11j2ap4iq53ggfmm0svx5lbod4eg3jtieykte2issa0p8bmwmr22u1dty0apk8e2m8uvaqcw5kw50ov1bf3r9oh8u8bchac12r0qydy7ub9559eeiymzjxjckf133uz8jwwq8aqhf18uveq4s0pfxreyp8cjc8cwymwzh',
                application: '6y7fatypjmh99cr1xg1d8pjn0nunmw4linlc1h1cx47fn3bneia0at32ok21',
                isCritical: false,
                isComplex: null,
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsComplex must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsComplex property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b',
                hash: '0hf135puq3lg5v9ynhqx90k9492syu9y2f8j16bf',
                tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                tenantCode: 'vzegvk9bz8f2t5foq7b16qmamidxhxbrtqufaiz35dyjpsf9fs',
                systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                systemName: 'd9rg2j5yp1gaor121enf',
                version: 'zz8pwqilnh3wnpzag0g5',
                scenario: 'r44taqh38wt0yyxtfx6yymz3rntn4t3zenet8lx2x3ymn8gpkr153ts9mjnw',
                party: '1fkb6tvp7tnty8fl19k04jiks4wveri9yrp377dmr65t6hn3m99wpovf3uhsqc27olhmkh9avpwy7lv96h4ubzidebbhm2d69f7n6yl4jci7tco19mgevldsniev1moj5frinmwvi570xcz3hikeps8a7co1wtld',
                component: '81ul82ghwdfcaq90bmwe6209aluofyys3bej01tce365cxvu7av6hbkban8gmghp4mpy51e2oytxa77x7rulpuuffqy3m5xcbd29d1zhnnp30wj9frrneuaprbimlbunk6e5cbq3i197yigpmienshpgznqpg4fh',
                interfaceName: 'shg5cne3eattz9s0raeo1y0rzrdcbcal4x536kewytojgyp0lw4cgde3un7gv0a5l7s2clgecyc9lwesgeau2z9iespr910x3faoyh03o5xpe6gmxuhee1o3pgrm8217ly4t6mzomd38cguvfkganbvs4fvc6qyr',
                interfaceNamespace: 'rw3nre0iljneq0dlobfq71fkh0ddzbgzu97dkmzbkenbebcihyjkvmwn0rmf660b0yoqbkczw7ec8mphpy9o5pg19anau0ox11tlp6x0p5scdf996i370cdyfndplarovymxxpfs3cuckpinaefdrljr79cc3u36',
                iflowName: 'ntns1pau4jqwgzqu2drikwmxix8poy31cky8j9s7r6q43huj5bopfh4mb43e8ljhv0kbbrls27fbkcfqozbyrtwym9bf7ymwi0l327bko2en4fnc3hy0f0ga5ds3soj7ww5jp035277bf12zkiduucv4oyq06n7j',
                responsibleUserAccount: '145pt8xkk4jkzmbu0sw2',
                lastChangeUserAccount: '8adc2ayo25cob2lz3cpz',
                lastChangedAt: '2020-07-29 09:06:41',
                folderPath: 'p88zbog28t8xoztzawwwt158gqcyxiw2rugbvwqy8taboatcqyr5yase2t3772282as6lq7u5lz6hax3i4dveqmh0sh7s7xfojj2pditq40d9cl8z4lcu3v0kwdwaep4f5e4ve82s0c5yq1xt5f7hm1gnne07gzmolod2n5bcd310p1a01qi6z5gl8lxegtu9pv9j8r104k0bqji6s57uwtuw8q2owzfh4nu8q3jdnozjvqrca50wbgo5mpoxml',
                description: 'cfxpda609aekikb9pr3l0zauyshgvwlebevj1ufoaaholl960cl1vd5k6xbp4bulc596ubg6q89suinwp0lr9tqzqu7v8ag9ryvkk3jvlrrsrymxcm3cf1t77o7kovx54mh3wb7dia30utyqx75yjgc3tmpqqlkhl0lez2ibzpvhs8mc50eyh6vg0a1mfywbxynsm8u4q6s31grp7iknu7lursjvdtq6myf3oddamq06708c3z4smkntq0zu8cy',
                application: 'ogshh4l2gljhgszqnd0819n05she988xd84lz7iic2ugkqk32xclkua20zzn',
                isCritical: true,
                
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsComplex must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'k6r29wadwwag9cm1ido7i7w9t1e4qydspgr50',
                hash: 'd5oca3lmyfelijxvdjlw8lmttqy1bp2sx8bt586c',
                tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                tenantCode: 'brx2hyjgg3hadcqfntfhu77me4df7qdeud8rvc3wg5lu72xelm',
                systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                systemName: '14ecc3163cpz0o4vvtyf',
                version: 'daqbgkd3n5xxl6sdhti3',
                scenario: 'v1752d382212kjwm0sqizlmdiy8dmtkza5m8as2ik0ecep6pu5ioeb239rsf',
                party: 'ej1cz3jwee8922k07u2kjnvl0bridimaxnr9qf25bwpjlwt0u2okwhrl1n9zwy6h1c9zv6yifveocufy4vd4lxwglfc1xrp7ittbh0far2fct6xr3de1g8ofbkcrl9w9xfmaza60t154gtaxemi41ostfkcbxfib',
                component: '7z4pmzb2um78emts3tqdbgcwd17ncxc75j80e64a4g4ymkyqxnjubq3fse6fshx10arjz9evb39tl9phfdfj1awp33c1bgu5mum3a3b1oqi73d715rt1pg464grufji1lohgat61deaxjiiizr2rfze7t55irgq9',
                interfaceName: 'kjfcfjed0wq1bzu59tn5b6dmqvlvisukq99nr0hua79pisbbikqbbao0z2wp86sa8wcldbvgzn3zwdcegeoihyra04jc16xoneg8iehnigwyknvqm7phtcl5wft763ynokz7m5nz4zeknfy1660tgoii7475v97m',
                interfaceNamespace: 'v89pyrhlvqys67ycthl1dywyovi7xpobliujd2lxfkaod5oxtli0prvf1o1h2yhczeyoq6xq511w8gqy995e08ua35hz9z20v4pn3rj6b2p6l382zcl8jkhilznboil8nere7sy4fg7e1etndzn2u6asvpqtwq2n',
                iflowName: 'zybi6qi8izgz1gyo7zb2n34ic4w8ijytm14s0nsdyuhgz34f87ubja7uqtmbx5lwb6wucg25o9d5hlac6yy8xyc0zu4ezhhb8htkwa2x92s08e41ecmgwhphdizoxbde9xhzejygq9f225zhog7klu76ee0cyv9g',
                responsibleUserAccount: '7x5a8h8heozwgkhcsdq1',
                lastChangeUserAccount: 'fhtn3neq2y81hsb2shiz',
                lastChangedAt: '2020-07-29 16:49:22',
                folderPath: 'ef1foc0aq7b7ejg50h80obmgs1g12ipfkeygkfonon8m3me818ivds4sqfi7kp8bu7usgc7ne0s9d7crhmpv1wro1xv9q7na88eeunjktk06nwvqv9wqt6ewqx3qzwr7agkbbsy9oevqidha4u7xpfd9urhtwup5vfkh963ci4q7riadf3oldq8czjy6ossz4ei871nnqgp9hi3f2g2t345vfbgeimlaj2it2b8yi1agelesypjmccndrei9gvv',
                description: 'waqbvglcdxv7xabzq411dw9y0qs7lyua2c9e37y4lmijy2vp56wtvle43dwls0fugeseerf3zrse2x9r980bkqis8jw2wi88kjhzch0i4z9ftcnelzcgqu0d0g8pd3fow9w884nhkhruxx83n4awyw9smwhp8q21f8lpv35csecpokq2670g6htvy9m8s74i81aimwus77edrgcjqsd4g3y6psb3e2ykzjxr7lgrl9na3uwtw67ctnyns6q3zvf',
                application: '9fi6drx5okjnn78q885r9n4tisdk7buccixhz7jcdn57ccrm2mjl2tehmbg0',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b',
                hash: '3hm1pu14ienl8pbgx8l912reuv5mveaa4w163yx9o',
                tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                tenantCode: '8j3ljpglvg7tjsaev5lmezv6ymmnmwmfyiyzlrq49cvibcwadb',
                systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                systemName: '7p0mcaab3htc3ifcl8mx',
                version: 'som6gi8csr9gr90c1lda',
                scenario: 'o7h4q0lcddceapskdbojhzlfli0gs92dqlqjzwk14dplzmgg9927imv7x1iv',
                party: 'r5jixpfzhlknpryyetyhk6g472x57x9lu7ex3xs0jru574g1cscttex3v3sjt5gdtl12k0b0q6j81cldvpxjnyhj8xy5y3cf363n65880wywpvbzd11wqe4efeh5v1ivpwv306fviunyetgdq4qw77lc47id9wb9',
                component: 'klbphxd57gn1uvgtewjq6b1ummi1hkwea52xeywwbmnlonv2s6gxzzzb2gkxetly4ayswrlqf0sz89lj2fvncdqqxm236qokhiolr0zqegdzdiamuxajcy8g1rjj0r59p8imh0ws4stvpl77ndo253pkmg42muh2',
                interfaceName: 'f3wt0ithyne9tz1z1wbeysqacga4qj351pzgzdbn4up6i2rm9vgdg9kqsri6e6xtgw4vh1je6yhm20pere0juhtaljq6mcnlkq4yu0v5sagt0jjcs9ufvjk8nl1f0rb64zqo7v81bm6sm7b6aes74g3uf701ia7e',
                interfaceNamespace: '6fhr8ifmdbhl34300vta9l9ofhirbbvk2drcdrwrx6mufpkr987vbntguif6yaxl98x2ub0roky199jp75l5qmoin5sqi5r2jmsqliy6uby22m8ujl4yjupf4c9umj9tp5q7co21ygtbyxcbh1z4z37c7hpmg6vg',
                iflowName: 'j2u09ovlt7qp3pruuvcibkgikpgfko5r4bascl4b24me41ch9qetxrzsk4l3zqclqbi05a9g8j5vs41q2k2q1pk8pxeb6zdruac7rq3p9vc9o6wwua8wk9oasg3aaa7rhcgbokamvli1lj2q3iqt87ulspozzg02',
                responsibleUserAccount: 'avdnbqb7sjleva2fxuih',
                lastChangeUserAccount: '4micbekolxp39k46xl27',
                lastChangedAt: '2020-07-29 05:16:42',
                folderPath: 'c57h5k7588w4q39hwyu9lu7s7gasbmrl5wxpz05farbvpsce0yngatciqy2lfgeri2qn2lo0ch9iik6wmbu70h6rq6idk6vozr92h1f1lqewvtgit992sdhcmr2ntay73xq2komz0euipc9u63i9zv0u2f502u0ye8a9yjepb7wsa006nllsiggrclf96r0mzhef1g5844e2bz7hvfxjv80dfjfnvb76q79ttisouclgjq4as01du2c309vvmsu',
                description: 'yfbvfd01bsbssk45cvdf9ng8n3w3vmdy16qpcc6tw5d9qn5ixcfbfhopialsewxz7vg555rzvy3jgs5g46g8jzsif0a7adhgm8bkj0zfjbcnndbt8mv49cidv9eebjjqr5sk4f5moevk0q3hl993ujmcociwsj2zzdj5cmqu4bt8qdfbgm6dz3phw4gbkqzdu0a4hc0yglv3uux5cp2kiwhxe471myodrz6z7sifgtqzfrb3vhr1h2ae2z21ehm',
                application: '6opakhaq2eiswigrjtima7xj1muwz56m7bn8ytnwqd8rl35qgus0jk878lwj',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowHash is not allowed, must be a length of 40');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b',
                hash: '9m76jsw3g0g8i7jc8ew0tx9w4a8x7mu50dz99zz7',
                tenantId: '2kbtjha7kfbvtma9wzaqx636rpqe8f7m72u3u',
                tenantCode: 'xc8kwfmgp6p78985se645o2ap8et243hay2wz1qdk6qcuwdkrp',
                systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                systemName: '47lztt1ukmtzv6wvs7a9',
                version: '1gruqqcmucfoz58h5r10',
                scenario: 'zoijqlug7cx2a6ooyvzmwmt144csclxuvsqaof47red2euxh96w96kgzcnnp',
                party: 'yjwoluw4jl3j1p1f8noavs0jqzwdlw1dh0eoifcsl0h61oy3k59746mrih6coz16x3fivupyjt7eyofv7rl8266t2qizhn4j3oljeo81sdbbwuxm2c3fv3gkpgky9zaxcgkmcbcbk13r4wdxq61nrkynmwwl2fvg',
                component: '0b5nhm5xt2it8oiib9dp92wugo408ts841b22ow4s6vdcpdgl1x7af3oqkzhgbfwmem9olq6vti7m0rthaaeia80t5142rv39fp2jdgme1vem5z017wwt7i0strk9m78dsjyuu8ushsdikeu0j5x9jrdhv4zxu40',
                interfaceName: '5fp0338qclrhlxpp94kdm6jxf33aelsy8f2l2b12gpa99hn7hi9f8qgism4zgzwo5anptep894h6t83cj5d0z2s5kzl4lm1zp3tkwyzp0qbndv0o0vhv1q78h18w6lnp7z881qnmijdu9axbbembfbh5xkyr5y5j',
                interfaceNamespace: 'y6jlamhh0hsoes5hgim98wq094rdmtzusx21dk0qweu9fwnc2ytqhhm2uv14hg5dp5lysxwrq3n8gic3sxpfzh67r090sqer90mhowzgi85k8k4qwpjg9joamfu0h6pl4ymf3ljdu53i0wx0pw9ddzrk3feqfvp4',
                iflowName: 'alpe007y14g0fq0utkby0sdt7yo24uanu5yr5d5jeqpyf4gq89a1xi418moxd302iq13gim48gnk290g2gk0m6ikze4b7mutvgpm07sp2kr4ffihl8g91s5vr519lyunxa0eg89bs3y4c7i5feasxmoqvfc7zr0n',
                responsibleUserAccount: 'gemwhoe5yya4vsbk42g8',
                lastChangeUserAccount: 'gltwsxa49cx7u883lfbh',
                lastChangedAt: '2020-07-29 01:50:55',
                folderPath: '0wrly353ymulo70uy6f2leipxiglshxh7z88l76ro2vxii2ytkpzr9nm4tr1l2qwd0njrjv09i65namdsyrysvyf24z8lwu9m9m7zkxunu4nwy8993l3y3ed0ts7mxeb7fas8tvku74qtvsjipns2vt01d7i8uo8r3artunmhbw2u9elzzag9kjwn78u2lyyzmhvexr81uju9bmabu14t9aqx4i70wcg7etuch0fiat4keao0yk4mv3s0ah1nar',
                description: '1yxuu6x3n1if65c90f1qe7psdnflxoe691w4vtljq5eleit83na80hlbu4c0fqk1pprgpd8amkdhetvrptrntin1poy0loaiwo6b97yos886abc9o1e5jnh0lppg2oaatshd363h887q2e4kdukyver24gkvc2ef7xzhgcj9jfobovqbbr6ixqgsb6mpbkb9bqbe0x5uo1gn477mv8z94wywbn3pry953qcazzulew202wtvgu5qlazp48700lp',
                application: '0ydz0ihuzd2q2236yvk1zwf4ok8a6or2phk7fjgrmiei5b0wit6830ls265d',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b',
                hash: 'e6acvjjt6w2269ivp8hl1bygm92yzw35r7dvxeta',
                tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                tenantCode: '5l1y2yu6twixczia40pp91ct4t26cohwklyva2wq1485gv6rw6',
                systemId: 'q2qq94ec87d5osr623v1jnivw129v7lumoyvv',
                systemName: 'rmb5qs9zm9hust997n3l',
                version: 'uzylwc38j2nb97zbnkyu',
                scenario: 'xhj7ko44coj6zvkr3d0q9n7v7xi2rb725gbdsxra84dsoensk6gfetvsuzn7',
                party: '5myiaxezzr9wir9k7y9cr76giaqqh9c26dclqknuendcjrgoaiat3rdz3464ywip0q539t42382t9bc1stecloqulue5tqkghdu8fle7un72gnl48nsb8i8rirwsz6ip9gmququjy5ko2oqzfp4m947lmku4r9xu',
                component: 'kx2rwaodgmeaorriy0ueyhay3a38e76vomuaawj80fc0b03uk1fgzzspara29zqq3d2nwd18d48umzmfc77gnqzcccicxhkmnz7ouss9csz2qtnv6h8br614siki2tz7951sj4gvj9pueie3diwodptdvcuaqjcp',
                interfaceName: 'bboi8s80sm1btm874jlipy4zoojsr1x3mwxvnpzce258hc56aza0d0uboeqx50fc6bd84xhmujcbch4nheq4dcf91oy6smad380051s7onmivfrk9hr31p37kn51yrd3772sizj0fofz8f00hksvjz5su0w1tbwn',
                interfaceNamespace: 'wyvrm0r3ctox16z42l73alyx416e9k4l6303xl2pxdgq1pq62jhbodhz1ofl7oq3zjq1whtplrnbfy4b9j95jxwwv7yt42q07sazi9vekwdzlmcj9j6au6oxej1hnm21ar9h1kpbafel7qkv10w4t4wwzh7017sz',
                iflowName: 'yqigjuybptnfczjou5gukdhloa4l6sed0vsvt55uhzqonp2dfacm7efoen4amb6peo8y71o8uig1f4k19pk6q14lwaj0k38hpl7evsiz4aprsdrw0m09o78gmu9gdlggpxd836yy4eul8aqte0o74qenz66vk8dj',
                responsibleUserAccount: 'xe1w7btsogqmwbmnhy2t',
                lastChangeUserAccount: 'h6bucj7j9o8nzcuh2poa',
                lastChangedAt: '2020-07-29 14:45:59',
                folderPath: 'pd27qm4geq9nn1dtek6fege93mk56i6ub0803ohv7eks68c1wxdj2cvzi7qbej2lqqjcdf9dajqjthyaefwbs4qxwt6205h3abds5y7tk7ulhe18f99nbvgqvzuzm69dukycgowwkv3bxpeg0kz4fcpn03h35sy70p7z5lijdtvbygueslo7inx4wk9vncqxy9a8x2gxdf1d0yrfhb0ufoypm0ng9kx7588883x2q8nvvz0vztjcxof6wktrfdd',
                description: '3o2z61gu9ywdoh6s0xxrje8n8a662tp1yrwo3u6lx2hv4o44ix2ot6o98kilp3nj99zrmrc84koy2bh96pl9ofrh1aqraywxqudpvhhmrm6cl7euoqiyczfieb9tuxgy4bnifhc5bmd1rhp72rv1pyopqgegj3q6ust1wvgxp15w2mtgjck3rcbxbszqzrw93yiyzhc0jbqup52qydwv9zh8eyoeitxqq9qjhsmsqz0b4sd3p10rv57j829b1wr',
                application: 'dt35z86xa3gh6lyyi5o8dc1jkxu6q0fwt3h1p3udco1xcfwzjaf97pwphx7b',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowFieldGroupId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b',
                hash: '50aav7zr0qz7llh1a1i555sdn4ax1ddtz2s9dmg4',
                tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                tenantCode: '4lbwyz9wbl5ekx549fg7foxbaa6hzh9a6u2y8sdr2jxq9rkq8m',
                systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                systemName: 'g7lk35a8pb33znx3xlb7',
                version: 'w14fg9ge9c2fiyyadnj7',
                scenario: 'oevc9suf8bj9aw5f05juotg9os2o6c3niiff3e57ngukccw938cqllotde5i',
                party: 'izaz1r9ky91vcv7d5yhcy1oang3ean2jd3z0atuk1k1phsq3igwf2yn3ljel46kql3fqvuq304qey0vqyclao3s34fq4an0iahzr4go5en2mwou684nrnzisil8ouoz9npc4voq4cw9wlxt8rsw83x6h4qe8bil5',
                component: '79m86b108y4daixiha8fdfw4f6fwqrnu2meee45y37qwgofjsji1u2h8o1m3mu1v3bc137uxtyxizmwdonplrwatbkugyi8r95t79z1wo069rbudig510iq57r7pjyu3ebyezk4enfhzfienirukayg1a9pcddny',
                interfaceName: '7z3dwr8ymgvj6lchp05nr9ta1dstiuxbmygjv2vqreufr73gxw6wf7sxcfkd5g8kh1w1m4w6wgihi39qth5ccui05cnioxegj3dayvkqnriraqwlydlh5hmazk7tgf82nydxd2p7gjnebi3jrvzlqm59f162gtug',
                interfaceNamespace: '7pix0t3u0kh67jrupybs365tqb37r8ufp6lz322iekeqtdz92p4iti4ewyaqjv35cwui80yx6vu9h21fe2z94y21aao1stz6z05eh4eezumiy2twg00qz9g69ksweb4006lu26sbs32dats93doz36kb4t6oy5i5',
                iflowName: 'zwwl110fjnixtyajho9251v8r0srnjedwr09j1r4risrui9rnq2owc5723o2izvlvay2vmfncr7qph0voqrfxngfx1x6qrip3s6sgswxt5p4un4izl3ivsyhow1j8twlw69qa6y6oki166xawavxqwt1vjry9pql',
                responsibleUserAccount: 'gf8kcwebh95bi2st8i9f',
                lastChangeUserAccount: 'sa3i9lisxx0nglsk84l2',
                lastChangedAt: '2020-07-29 14:37:03',
                folderPath: 'akxw26r9qu8099xppj5oekg2ltymeyp42n3igmakr98ubuaswqt6sybk6rfuwu3zpnkotjcm7wvyb5fckwc1vmt8pe8vnwsy9vg4mvr7dabirvnuauesnbh6ov949h9y61ps452u8lbdaet9r3841llw37fpfo86wltd5p4ialow48spm0k4fqo3xb5kzlwra9a0oys5f1zjum8uzfyr4p1gcmu85py92j2pwkilq945i1pl2v5spbqj6oimpt1',
                description: 'ynxewj7aszxntfjrmaahyfd2jkkkphxm8ax6aysbezsza4nkv7yjmzkox31tlmg8nohvi5cbj6ixev5x1xpckekf80bx5c1ybtpcvox19bp325iw5veafrhk4rabgvw3s5k8szf63wqdn0x37daknpqgq23nd6rggmpsk41m0yj4264wfhhbimp3czboio7zg9vkj7bucedrdolmq8vfv2ku4la2n42ik2qgy2r7v48d1cyhrj5x14k730x554m',
                application: 'eg814o3e76isffzkmsdzomzwyk2iotpxp8it0e45ryk0ypruccpiyrbu79tm',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'vwjuw7chl76t2ylfx0qsygroxcqdc13sauixd',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowFieldGroupId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b',
                hash: '2tk65wl9zehl303xxd7qqqaap76amh7kerihwqg5',
                tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                tenantCode: '4iq4nea9b2zagmwudaq17z2tze0fxjo598znwoh54436p5bznnl',
                systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                systemName: '99sxz7lbfwoqtr3ttwv6',
                version: 'zi0p6n8dd4miannfr0j4',
                scenario: 'ymxr8zi8hgrfy396zzlshf4b08qgogpyvfu2tl8z4haf47a90zgx4fnu5quh',
                party: 'u2k0vna0hvnh5gwea4biny9yhah5l5z25a1p4eazfsq7x8hgudplkfl92yb9kczasjnan5unti5cg1nco62fnmh5rpm1bymcoa7fv4f7awdfggaln2xa9wem3jzgqzvv71lsx2rt1aibx0gsy0ry478efz9ja9ew',
                component: 'd2bwsn1n2cq88pa0gis7vqj8cbizjp56i5s97hhtmx9dmjubp7f5h04lu1psa56bcv9ykdc504iph61yh5mqi7i5d3xedok32mdd4nfa6syevuk806j6pl2qcu73e53jla6x09h5t6nz1nch7hx54ualteuvausm',
                interfaceName: '3w715veyppku71s81awo6k5ztcaw8gitvswsnts7jgf7kp8a1p5zf1ufik5fvhzabhk2r6x5fv6b1tjauzzkx5g8myfigpe4cgj1cmo71omv7t8w2m3inf2ap2dqqyif7wftgimveqldnwfkhgu2jsctk5uzkvwk',
                interfaceNamespace: '0qcurf310jaseodo8ugerb7y4e5ufp9j8gwy90oi2cgv09blfl8mlwy6ze9iup89zt1k4wx9fqe2pdi944vsibyvixod89vv8yfoien0f6s3p4jnzuhc3ozjeepj5q7optuw6po8bm0plt7lgf6fudpf4wdl5a5r',
                iflowName: '5rt7ba72khyupeqnzltiqivw22wbn6pg1fxq10opztmau5il9ldtg5agmljedvpv7tfd1aah6mvqxy1v9xedgvr3wbs1i7l6egmg77zz5n5myhw0ywgno28m38ralc7nnp9b8c4ntobz1twcnzrto2e1w5uathvk',
                responsibleUserAccount: 'obc8a908nl2bkyg2sly4',
                lastChangeUserAccount: 'ed89eijnec42wggqp0gw',
                lastChangedAt: '2020-07-29 15:11:11',
                folderPath: 'k22g3ox1jadk3cri1f79tqrmsdyxivd1bb0g83euus84dkpmvh59y95wqa5zuqp0ozj03b5822dekirocqpfxkjgv3v7j6ui1p1sz4w718e6vk22exwc2fqdqu0yx5bts18ymxgpfli3upq8q3tgj4hau2j8m3nhinyz4dkc37ytrz9sq6y1kq8ozgdmjpn5tbxfgw7xrz18ta3687pl28k7m0vvyxi8o2feqiu8cnndk53i3fwstqr856bwzyu',
                description: 'sdefbgapnc0p8qm1vobxr5n9gray7vvkbmp0bn79vbsklp7omvkhoo0nsslkk5mr3ti50ssddjbc5n1cc7m8j2g7au41ut6vg02yjxdw1c9rldtrr2w5pyyl5bhzlphto6twv1fd4c5pp7o84k18tqg6eytgtu404jtvhf8zuaxk7mj01bmci1kg8668k99nfwbzjwfz7m9ay2mi19abtaoaygsa96xu4vizbbxyhefjlt55jrf2up6rvo0etmk',
                application: '4w6lqd0p388gpe2y31wegnr1a1ogyagh33rvebwakiqc8fatea6spmm5octa',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b',
                hash: '0bvnow0e8gfq2eer2abpdat6b6r93poac2k9yl9n',
                tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                tenantCode: 'kehbwifjflw35h4oynojwk3v1l6wg4dkav0ymellxdhdi1heli',
                systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                systemName: 'lg03or0dckfwk5qixpxva',
                version: 'imeiruh8c4jydqrxoq2m',
                scenario: 'rtacozgqohf6lmatjt5hwkg141gdxjqupqatb3y60zq3p256dqg8lu7idnaa',
                party: 'q0e6x2n7tqv6ia03e08xifgtvzsg5a5vph78fbfryzp3gmukoys22f6w9csdethkfn4bgbbe4hfyfgvjvxmrrq5z59fqvy27wcagx6skml1j2ch5olpfsw3mifmxt9rdge0o9f4l68cvkb181jtkmduoqit0c5xp',
                component: '6sjbb4zosttxrbdeh61dipomdow2yyfri9lnuwb2w9nis4zptf224enkyy760aq5aju5cunurut8acqx5zrgfqdwb3yjoj62z5b62vvwu9a6fjisx8i1bc1ipsvhgwcamvwippi5da1nr8xmmuq7bz2lxm1b4h2m',
                interfaceName: 'jrtp12f2i3009j414s47i0muf1723d9qco62t2lg1nv2u3k1d3yqu4dkknfqpuxrjvnuxlnoyu98ck87pcezvqcssipfxs4dt6cik9c9urqt2ebs74o1od766uz4dunccgdabow7hhq93bon0ua26kv7ahqm4tk8',
                interfaceNamespace: 'vc6hxfpwife03kafnm2rskvu2mpc1zdpczwlbipth5zaiepke84k37r6riiflg7riu3foliip243gldr9k2gwzozg635g4judjmiqec758660n7pyjq55wya832nju95kiuuc51lsfvbro84mtxb8o1xnab5b4wn',
                iflowName: 'dbpwlqwugmngcpbvgjsw9t8dudm6efxxxbfhp377m4k48y8jdjkffz1atqilraed6d7mwbybxmjw3o8j9lrv1us03wl5q7oehsodu3kwwrgn9k57klnrmanzb760gu03lpyh9x8saqu3mwt9dyyr489x9ak24h3o',
                responsibleUserAccount: 'eg4l6ksdw1w9xs4mewvj',
                lastChangeUserAccount: 'n2e99hfkc4zlb54ikvvy',
                lastChangedAt: '2020-07-29 14:49:28',
                folderPath: '48imedaqrk5loulf4yy75ep68rwu1mvrfi8d0j16qgbcb7udq1bcjka3hukwapjlfjeo5pgqdj9x9l0voey004czi9kxgw0kn2gbrijc0137xcrnt8dlfkckhqnc2fodbbo9g2pwtoxxrkvqfm3ltj2dx2qamgkw5x7ki0u1vjfnlp34guujc9ufjrfwvz2wu60a8mq0otofygjyd6ikehdcz6217ug08tdlwzw1ahfl4iafz17cvh4wvm2iw7b',
                description: 'vxp7m907tn0vqqamsprwnmyvba1m2cge48qqmfdhnk2yapb8hh1ygleevbxspdh7o67143ssiitnx2bhdjam39q8vsphflehocexxgers7hmngxb3421o201h6rbeah8mgrexqjameaaasfw8fuh4m3rny6a228m6gkhtwk7zx6itlzn1nhyd6v9l2esv63n5rr6iq3qvbmhbttgnpxp706rr9wrlv0r5zkougpr0vtsv8fibk009ce31p43coi',
                application: '7rxe0r6mjmm3uedaocdckcuoehqavfe9uk5ywtp9cyvcy2fvdv5wil2dfsjf',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowVersion is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b',
                hash: 'h5j07doi7g8qykvns22djnn7jd2089vwye3dsm9f',
                tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                tenantCode: 'a8bv66hf5yffs5gkuclv78kfm8f7oi4yayvd2eogwm1mo4qto7',
                systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                systemName: 'go5169hoxh2x6aqt89tn',
                version: 'kemwcs2zpybxo9bipoqgx',
                scenario: 'iyzk942bo4a9eqo3c1nsuwjtv8ryn3isg3gkyx05rivqyf8zfpog2pl966wo',
                party: 'fd52zeohvkj0cr7p0sjtpcdhep859z5by0ldc7fy3md4etvd5rogu8qhvnqzk8sklcv8popigtrjyl67jrd664571hyrfrqzcp3pt3289cpvjdpwwwxtxc3l1ntbl77y6uai22sxspuerdtinaoq4ef8bdqsixpc',
                component: 'g1yaskx1w8f00v09hupq2kxqiyh5ic4b5707ldivtf3q7yb46wwcswpamwf1kr2k9ysd4sx4ri591a2kadm5z9mi721694aotkz3ttt79mp7p3ryea14yi6wto1yib92n1qrfnnwwhk0t2q2oxsk4yiayrt9a6xn',
                interfaceName: 'mznev8ziznlilvnmjbgdlh1fkg9u8r4pvx8o3e7dx0zffbgm9k3od9yh9vpwpq3g3ihi4um0bcfpve1hzwlkubn89xyt7kkcc0yrmd46un32i1g8reoxtqk3qciijj2cujh86c55nhqswkjojxqb79ha8kncbh3l',
                interfaceNamespace: 'fzodvl5k0mf5i5t11gw2x4x3ai9zp3xnukaiqtkvm67clkdq0f43z3ldpe9bodk7b3pplyu2ewb4uny6g7wi345vr1q0xo1mm1rbuzbb7qzqhq6e7fk750u4flm14ft889mxpvx2r7wz3gu5r9qkkxp7uxco20by',
                iflowName: 'hyc3evtovdmg8acc0lnji9xj1kspwk2dd0lyda0ggq7zuo5334v3nap60bmjyey52bhxmgez9zy2gqfzcllpqobi65jx3msa7iu5jl85w8dc6cu7obyh48p256qdfb8t6n6amx38ayvs3eo9xj1nhibmvzp96fmb',
                responsibleUserAccount: '1u80rndw30w1514drfmb',
                lastChangeUserAccount: 'mmowokpnq3ypteapr7wl',
                lastChangedAt: '2020-07-30 00:38:18',
                folderPath: 'qvamfx89h61d260zuy0wx9vli4knlfh44wxm71h7b5vumlolf893650clue2upctvvf33fc764e9g7c6w1nlztqf071katiaaizd70gxsj94q96zua8rpzt4gyh7z1gzyswed21z23tlkw4ou5908y8s41ezy6q590qtq1srljop46udaftc459bxy6jsbvi5hmqezy7lv17nu4yxnlzts88qh7se4tila0ooqrp2sqmdb9g8kz576d9insdjmm',
                description: 'ws2ydn96yluzxabnv4mnaeh3mn7zve3cg2ijglbawcs64b04wqxmnyaeq4f8ohui1x3hjrrbk4ce9b9fimxhrtvzwe7pdk0ow7jcwg4ftdvo8645n9n8t80fghexxa8mmr9ixrddw8gy6ol8nn78aa5h9c2o778ajnqe7cv2d2c0gm0nyyevdk9ocms15dftn3t4xoo0rxxngzuzbqncpgyi81hfoxre2x1v3pni7aagu4u1hcfwxo26klm9du8',
                application: 'nywzuxt13dq9mh3hk7j5b1gjs3j0b3j6sa1vpp0dcta1edfz0bbwvtvk17g0',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowVersion is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowScenario is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b',
                hash: 'bnsjhrcrnz7vhhqoh3hln6ff8udss66m2ffnmacq',
                tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                tenantCode: '9cs2s32es3kfsjb0o7mdg4ciyymljql8mnr8x32cm6h56i5xq1',
                systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                systemName: '0rom63ixz89cu1hmsl3z',
                version: '8ffd7k47ddthsglx393w',
                scenario: 'dxj7fv62zqecifkeg6z0ga7utwwou4s1vkb2xw4ahj2ng7993g6fnjzf12bi5',
                party: 'fdixyqkzl4d5mxqbl2hiw2bh5ym5v5tn3zk6w2m5d10f9kyf457fiocwt6ii5bnbyfiuhs0iw3zuuwhawwyjggju3cdwbxeh14k54mkbdewgg9n0o276eprbvy5epvdnv0wr27bdwfbmqbdco3ld9r3347m0m15a',
                component: '2gp7f76kr2hjq1356f5ko9l29hbs4i2i1uuf6jwi07fudgoks4h50a4z8h4egtrn7zkikm58siaugx5pagsdcam7os4riv1kuq2trdawk1xfr4zt9xae0wgv0m05q6fakpm0zu3ma7imrnb2sqny6fgisjah4utk',
                interfaceName: 'cbejfzjj0drec5grcoztekrstkeozrym86bmnkdpjjthn71vugoxjty9urgd2oakvuhyt9ghfe0qia1z3g3rpy6qbz8uvg1z71muw6f2m5xq8sozjedsc0denv2zf78xdqs9vk5z6kyc5bydk9es9fi93g6h347u',
                interfaceNamespace: '0mfmax9kf11zwufy5hkmwo6nwllnidvftv4pkcuh8y18p8u8cuzituzkum4kuu3741t42kpw8logdvu4mjhmnpgdmokyuaw3hd8q91org48559goxnoywehhv1xspquds4pru0q5e8yhb470zuvw4n4rv9rrzc5b',
                iflowName: 'wuc86u115lyq6blzy00q1ohoa16jh4jbj7bwq37s8rfzehbjwcamionohqijvvqg23klagdbbhfys0eyo6f4u3fwx1o7mjpqqw63xfq1yxv5t21zccksyrhl3xtg1e35pbb8i3umsvnfuhbk9kacd3zevft62u2z',
                responsibleUserAccount: 'yqj810su18lwju57vip4',
                lastChangeUserAccount: 'jwo7wllr3lb9qooec6bn',
                lastChangedAt: '2020-07-29 17:45:01',
                folderPath: 'x9tvuj4ckfuj5lyznc7iwoht2m61b7srqmgtb7afrhbvjrun761p6hpznpmb2p32jge3pil2dhy5qvvryoidn0ucrcn3gnc8ga2w4zn8kqmcgnj6qi0l68t7i0klo1k21jc6mkqq7jnr70zebj3pdfo3dgq99pwhj1i9a3u9d9x6wijjast6s13347f0rmw14lwsiek6k992uh4g666sx5kr857y3mokjhqnq8vyk3kf5qwu1m4a7yn9jt3xce2',
                description: '0rzu070tn6gnr4rvibz81cfze0zhmvdbcht2wfhhn2sgkrlxcewu6zo8liktj5p35ymhudfu3dervy9p6vezqo27zh5r4knc0rr2banj7aawszmjzcyzs8z2s86ouisxvrkwzpd5gzfb2zh5a9nwog121j5wnz8rhybq4va4pokzxidc4u1rky3pxnccehvm0ibl7szt01eyvdrvlxr8p7jomhexs7zk8v2rpyb076ovbdyuvnkhdr221glorv7',
                application: 'cpv3qvzkm9k4d93p0f3fbr74be9e417hptood0y6uc5of7oym6g7jqd82s7v',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowScenario is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b',
                hash: '1l806ijw9lp03ipxoth5phpj5f98xnnm66delv70',
                tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                tenantCode: 'sls988b3l30h5y6wkpkw0jc1pcxjup066thd0ol44br7gnb13o',
                systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                systemName: 'ho21kzqieh3wgwmavrff',
                version: 'jqb16xky8e3werv4zcb9',
                scenario: '7w1u0l26vhfeugoupzh4my5p0butq39y8wouu6zi3qm8wzbdtkli5k0bxkea',
                party: '0ouec8ucyk2fj20hm8d4a990l5a9sgitey46djomjoy87612bjodv7zsefzoks5kt24env9to2q2bwt999m7az2l0i84280xb6s7qobdd7wb8ploriqj9a9udex6q5dmmcg7fk3jsmyv3hrkqiop57512ukjsco0e',
                component: 'nxp8eyj76r5x062rj68iev9tszmx136as1xn6e4piy1vxx5hl9vpnbcvvrfe42nc1k6r29oawm3m3wdfrhiqts56fcueijhdmd89h5t886r2xpibybyfy7mktqwz6vhjlfukoe1kabi7obldqb3rnfu8f9kvxgxg',
                interfaceName: 'vij3bblsgaoyk4sxv4xcbvd1ncb1f10ewbjr80mmkguhfldxdpw42lj2y0ybk7qlvqmg6ckxsq6dg9wemr9ghus1czb35al5qde5kg909mkpxcrz6w2x3ean95o9iws4zqkdkw6igx4dalfabtgf9euqhpp0s59d',
                interfaceNamespace: 'nqdr088p56w1wrjpv2kglmc4z5xz8xzxk9acsob7ebtg7f68y4o1yw04w3qc0l2sxi05b8vy6w17lhlpcis3mkhqwbxc632ztncx4xzkvdy2omu4eq5bi0yu3rm9lf1pdmeqv92z8p08ubi2a24ad9ep3l47wg4o',
                iflowName: '6a0g5krjmvl4t1w0xsk7pog5it3uwm5q1lv4zavcxx4jpac93f479go0radvxlwkwkejedke0glvg5c6hrl75d60j7jdssppj7eo7hi1uasnxk7b7xec5b51ugmyz1az5ag8s1u4qko3vdt27m9c6p8wqtitiwli',
                responsibleUserAccount: 'hbyzxw1njpjz447a2luc',
                lastChangeUserAccount: 'sfalh46zqkw75cdlwfqh',
                lastChangedAt: '2020-07-29 11:00:51',
                folderPath: 'a8djav04b3itx5sccvfh7enjb31b3kruqt7mqx3ghdx3xi5uoxs74oxasqo3qaaafy47aoniktomlq2qh5418a0h29xvn7dxweg26ae0fwluwy2501xk2owur7465ot2xx3uv41pvolv5idhgtr1gyh6zbtrv5q7gago56xnykuwu3di2qul66g5du3hwdkxa8i4d5cxcgy4s7v2fz8s7rdsgk6osfd2vtkfteblwfcefq7sqpz5epn683dzg76',
                description: '254cjq98my68otl95sjqkh0j3ggqpr5i3nw0oqexumhzrmfctnq1isfpia0exnq786253jjbk8n5sn6f6kov0cm4mzhduic6v5rfbubphv2g45udosgjc5ud4yki0y6jontoylvf4sgbco5u8t3o9ibl1kvz7wxwxzv8w9o5pcp9hrhu82xyncmugtxe9lf6gmkutshn2h121b9nk3i0ln2klvdqcsega4ybw98z049izw8up7j2hrpx8ssr437',
                application: 'a61bdt2ob1l957j6knoi8xi2x6xpe48cwlrbzz1bgkdoasi79j7hr5eqjo5h',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b',
                hash: '0f77dsbsd4b7jjsfzn2zrwfmvcxxwmcq0kdd1w6o',
                tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                tenantCode: 'ent2s42jikcdeddu2bl7dvjpuzinqviepyrda84w04e8flyrw6',
                systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                systemName: 'vwnjmqx1ix9su1efaj0u',
                version: 'fzgbnawtzrf95tftiu2o',
                scenario: 'fg2siss4ar4f15t7p0ofq63tyn0cx707v34ozjfdtdu8lojlb9ve6rchlwc7',
                party: 'qdy4jrcv2yn4dalp86wte8v7c9tolniu9ajp6gpq98e1an611ccgd1a9gfrfm5w2wxsmadpirfm4yazr21sv7l20hwyqm0jk3ky2jgli7bkbcslac08wwv5sbom26qsisthn4tvfd9dgqji156xru6l3jqpsv4jc',
                component: 'no57e19rm4kmv0tlqmkoqvz5p03fyasdiiniwjxzlp6525wks7powmbnrn1iqtd541tbnvmfs17ougsaiv68a9v26mjmqh2sa2tglg10svdfe102tzwxgivuf1t4quceya15chlknijop7djfqb14n9jc90vtj6ff',
                interfaceName: 'nvgxl4h42m8w5qcgae8meycbq5kq0gpq0lgu6a1m1szmen3ifuyzfj2qzxumg50f5m3zdvnocnd63eo8d9474o1oh1sqfjyxvz2b3k7wtz38840ooahceiz74y48mokgwclcppkicft6o9v9xldeh9oh7lx1uq0s',
                interfaceNamespace: 'uw5o8fvg7qz2pcnmouyf0c1a6s25vmvap30utu6s11ufv50l3jxcf6rzpf1a83mcx18fqh3urhgabvtmahvaobh53zps3rkwf9b7xvktucmqkuhm2joqc8ndnmb5mverpqf0vupijra6296hcvk7l3b41jhhvwcn',
                iflowName: '6bwmqfrewpjg2nkalh6yxig09anhncou92rw9f75uzzcgcxdnxhg3n5i9gvfpg6pkda2hp2zkx7xr3b09ef2k8q4a0xpdpkjjeili6dxiqbm2kpmdwhm8wqxsymk37ql5flses9tkq10pbdezhorylyovapou9dp',
                responsibleUserAccount: 'bgtzbjbj8z98ilvxbtnk',
                lastChangeUserAccount: 'zk5nqeo0ymwzkwgr8tny',
                lastChangedAt: '2020-07-29 14:42:34',
                folderPath: 'dd2x3kwr6rr77fhmjwtm4unb1204sifrg81vvsf834f21yommrapdpgb0xuxcd2m7twiak74xod3pio1ih0ex4mxhl3fauyqxadipfklp9k4bm6gn4b44h9h7mzsy6j9fw50zidodktlhi9qvkdcxc1vtm1ya9bhhtelaams38l4eg8v2jx8gbzh4h77zhw9k8snhp5wr8ushgtaygr1tdjohcf2pqijz17hbx3bv7cl65d96ega9krjhlztlra',
                description: 'bdi565je0fi0os2rwf4v5yb0150c1mmg5spv4fz30ltmmv2cman65x9dzsxk3nuyla5ul1afkowvxqhdqzz0ch3z0hjn1xqngj76qr3dppkzgjrmgbj58mw6oz5pouelhz4053be142t3ml73hpralp3ar10cfaxl00s4xj5i2gm6fhsiqz627thts7zps1djnrc9gs3j38ktt73czx7p12naxci87mt0nyzwo5k24t7s6q033ghzuq2mftftep',
                application: 'egzpr55k2gjeez9iqsj7cxkavgojg59hkin89ljwbqxxg018rcjgmebszuts',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b',
                hash: '5b1jfjgofykjh1by66h30azts1af4108t6oqvoqn',
                tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                tenantCode: 'aj81uqsb4k9n9cpnoki0tsi0yzhk89p729ikryeru6y5f4k6sz',
                systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                systemName: '2e23cekvqwd668152or7',
                version: 'aovxa9ph0i125wzzvqxe',
                scenario: 'lgadleuzatrd9vvnyskhzxopo1b99szqcs35aq3yrqa6jmepqznlplp9148u',
                party: 'tjkczu8pukj5f4mtke2gsku3j3heor56er3xlkcqm2gp80seqjkqo3ijtxnhkkavtjcozd2yb5m71a1w0mwi44tts7jjyiusmmbw7tyo1alf1qe14bo14rv4am9f9w8zmx3rl50ht0kw1ktrj3c17fxdqtmg3usl',
                component: 'ugsf8dxchcrsscz1p4er35qpk4r7oskxjj0jfchaxd55bei4r6lr8r309gxa6xqbfs3gw3jyo0qdigcrnjuioec06stj3kvg74gigwi8hhpshpoc0r0tvwk8erivu6mnmn1wimfa5o9ggc2z9strl5zbcucvulut',
                interfaceName: 'lkkmi3od0fkous9kim5w57i0rmthp6h8q9n7vqojybvb88oed15ibq44qnchikw0hwqr1ism8fmsid6oq4dkpq1c8m29pfabgj99nkzi9sae43hulcoy3zfq11ue6s0kuqmypok0di002g459pnqvjoyrypmjkzqz',
                interfaceNamespace: 'hqjj039muljf6o0lrvkf32106yh2ielwf5ne4d3w3jrt48mgtxt4mp2ap005p0s4sf4zxk1tpertgldgtkfqvgfqgwqnhuynmmodzikaj2mx1xa538y6udj1vntkciuvecuujyy59w0mfqjs31by4y8bg7xaxmu3',
                iflowName: 'g7541a65vc9a3aup2ycnbswhxjk8ijicm8tqmlk3rge0ktxhdxzhq6q9kq5qm2jyq243964e9akuv6psx5179c9y8itpdjcmcoij0sczawfagmnbjfk0b6m242x3fefavhptlemo07s9rnnfuo0p1r5629fsnkbl',
                responsibleUserAccount: 'd52vz46f4bx0gxacereb',
                lastChangeUserAccount: 'jfd1c72hh1rvnf3i1j6p',
                lastChangedAt: '2020-07-29 03:39:03',
                folderPath: '907g5rdl7kdffrb97rl24bshihcgic535qh5tywascevlzhmvg1awvm1j8m3frzdiuk9nykscxunsuvpmlfsyz39w8f0nnqrlw82i6co1zly1v3aq98xb66eh8u7yqhhnw5rdsqjezj5mv920da3vi8uh7fqnitymt0f35p4ex4y0ut1mn87q9pfw040deb6bfounhrft9polms4iw9yz8pf3en7ty0sqc09tuxj3yxlqpuqfnddxryb9vx8op3',
                description: '6lhy1ztshrwsrrbtlesvpsv632xb0g4yuzsdg8ahbzgw5kbb9qkkbdseymw3hfb94pfrpm4x5gp0m2sanodkwupdmik3bj5m6fjgsdvev3doaox6whkzesi31qx270twonm966f1igv2w7oxwnq67veijzg0bdkadja7odzar9e4zglkqbqv2dhl4i0nxa478x92tu7prz7wydzjmf34nen170qti7e3nztm0pw5rk6k2upvr7rwtpd3a9djb7o',
                application: 'b4ungxmewhr00njh34jz1domp8dz0oj5m0y3nkb7lsk37ru0rk0z51of88d0',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b',
                hash: 'rlq83fw4l97ns773685l8iy1lpis6oy3yjdd3srv',
                tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                tenantCode: 'e3n3hjm7rirdu6pimmperkkuaamx2ttpn9q3pytio6qpzgj3pf',
                systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                systemName: 'xqu20knyvqr75cfkp085',
                version: '1udlcpkgvcojjcdw5uk1',
                scenario: 'y0dqb4tmft9w14t5p5v7639os9i3ns64a8zacngwgs8yr0f3jksp883szd3s',
                party: '6u8tgfeffavhqsbf634x2x8o9pyi8k233zcs7kavwty2k970h4ht2qvuzk8ek6h7f90didby52po0xqx7a0qxtvoq0f78644v5xaaufimmhld02golsqj9d35wik8uwgn74grv0p755v6n1wtadp2fg4xkqrrqbu',
                component: '6oae6h6ns6dth5cyd3fybmotn4wf6d7ezrykxegx1iz49yb251t3d1zky76sq2pbzu1etf3h0zthjsw8edt1amh6bz7jx0a2yxxoxw9mrpt2ulr5jnhmwlmkywcjlnapqig0qcu4mow7xrr9kr1hfqceyyknibao',
                interfaceName: 'ftqm71pjk3ww5vhu2jkuina8obfq8ze2o7ru6p3i8sbrve75hyo3smfndkmkxl7v1uo6kv2ec3iy4ujgk97xf7jnpzn7bqb2w4299nptowwkq8bmcknslgraxf68svu4clx7ipkzskv24din08x2c5ss8qrw0f69',
                interfaceNamespace: 'rifv7q6548cl5jbwsr86xo7asju1ropyjc8zzkae8jctcaufn4cwufi1ycf058exe18pmm8nxt38xa8ng47rs1kqvadiiaaqzckav0hezgmhqzjcp33j7rbokeactbh3vv8sgmp9a1d4hsqloimhr9e229g884wlv',
                iflowName: '6y15c5y6u3cs1zz79a8vjgformo17d6r36kj0htz0wylf3m5hgz2kbs1ltt6dak3vcni7l4m4crokxdf0anvuu8353t4zxn9uthlj2jc5euc532h4a92rcfj1qtzxxr453r0ic3c4wykthiqegr1gl8636zxf52n',
                responsibleUserAccount: 'mnyjuf9ysy8e70aheksi',
                lastChangeUserAccount: 'm4k14la13kfhxc3joxo0',
                lastChangedAt: '2020-07-29 08:53:53',
                folderPath: 'tteuzcjfamlpkc25sk5waarj9h00htlqvhonq0z42aeoy0kawvj9cp829qg3h7ari2oj1a4xjbk19xzu5sz4ox4r3o956nzmbiuas0pc8mg5vtetf4pfpfmrw1k7cz2vcdosj29t1yy7foslwbrh9ktft1a45uk3f5gzvtmkxnnbvyrxst547gnlksb7h9kl7668b6u58a784pdnv4vmnk7dxkq4dg8n42m21b9j56a7dczyri0zj8gdcqh4x2q',
                description: 'enzte6vpn9khqkmf2dhbqpww0owhizra2cgzebf0j370xfbf5s7tiargxsij81u93cl5ixsea36beofwfqam4i3ks6db0gjtc4mlofpcltdqrrt16wb2zxm1m09eoe57ldz8nyb9xoifin0tp6s8ibdozroaz5d5k6voqa2vtva1td4rjxpgmj00a950k9e00xctcie5yje6jbg25noxcdii0fvw2qzto38vtkcw4qo1pk8s3jmdkak9a6buj59',
                application: 'qk6p891tvuv8hzltyviflzcsiox9nm6ojfkvbr5cpf7lyg308a2hqyone7ju',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIflowName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b',
                hash: 'j48pxngc0q3dtxhkvv8xrfyfb4y3alskszvwp13d',
                tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                tenantCode: 'mm1cjyw3owu1f1h3t8mcdmzce8dzipnpp0h2vm86xopi0j8q12',
                systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                systemName: 'jy1i9ahh1edujo0ycq66',
                version: '3scu3hpdkg8201h3xban',
                scenario: 'd2opsza3bqangsjopn4ee9fn8dxm5igzdytctg92x7baq1pqrry6h0ehg6hj',
                party: 'knqq3yc21cbty4cb51xdj4rm1wuj7b79ueidslsuphzzsh3oyxpp4uw9l2u76r5204yu9ajd7eo7x40rgbxf3bfhrp97s0utp3ymmfkzum37adyl8eg05dvroe4tso09dmrb6t1lq40i1mvfq7zghv79eu0y1u0s',
                component: 'qezgyp88dckg3qpythojr3hmy5utvtj5mmmf6a4ie60lejmptomzv66r8k3mlttump9ujxedsrsg8u44fx5sqlg3q58exrpjt4eu3rus7l2ebboxirngzewwa9alpv4xhlgdfh7q1gwvukjmdqq2yd6o8arogn9k',
                interfaceName: 'ol5lcbudxzpz4qzucbqzkq7qyswi0ulb69hov2abhvvak08a9bisbugcnqy2kt16geyadgrmyiezdmgu8emykayq5eqa8xgvdkw15e7ffg0caghbm9ngohar8q1h9mf9fi3g53ck2v919pw98o98jab44ohgvpd4',
                interfaceNamespace: 'gj2y9iwspl2azpd87acw7voebygyx2umsuorkdjmq0anw47yonks77nhxzudv5p5g64zhshbiy0ihz3zmekb0fede4r375xum2ubqt3qrip2wdkvvmcjwzab4je8ohl0nqwcid8cgnht979fr5iompmy4p02cxvo',
                iflowName: '5fy29rrmrcjz2x7it1lhniqranqfonntt9mu6isoftskgzxhxdnuq77rq4gwv3k0dey8q5tkk644mrkb101rn6o4ja4wxeoc36yt85b73hi1zkju42rm02emgzslyczc3fvqc5pmri6k77w9bjkn1i16qnvlpu7bp',
                responsibleUserAccount: 'uln9a1dgztjkk8glhjar',
                lastChangeUserAccount: 'w4bh14dr0dbhmsiekmng',
                lastChangedAt: '2020-07-29 14:27:37',
                folderPath: 'cks9a4eisj5xo4lyddohnnepr0u7evpparolwscxn7aykz2xd5h5k5b80szquce796qzs6164gws904bfjdrdl0fdpp4as9vd1gptu4ol482kddjkasqjbzp55w3g83wu6q8ux0uy5iw89rhdu2w0j8ns70ns4x3i83ix1c4gnph1t0x2gagiem1md5lfofgtybqbmzxd56i8hlepf3z3fuvsad4agfusqqony3s0gduhs6s512fbhvswx4atz1',
                description: '8olaf2k6dqj083zru8w838nnaizuxfb73oexvb123ah5zjaa7ut3dvroi96ksjh2rbyzcwngo8xze0io7bucrro84ay1z3n26xydomhs45ncoeedpjmp253iwohv1itydhqn3amxku9dhs9glw8eg02l74o03ds9s3yhywuxljybawwnuyu22ckp6la0ixhwf8owjp5je6708lakoj81nl201fnk05qojlhi4bj8nn4ky0ffggznx8nmt4prb0g',
                application: 'ovtd7paynysrs5q5hxte1166pmnetbcl55v2o9bbx192y3llugncaf4q5mqc',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIflowName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowResponsibleUserAccount is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b',
                hash: 'eq80ldk1096c0dgl473o13crd5qz5e8rct2wzxmr',
                tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                tenantCode: 'aofb02x74hlqoxloyw0em133mf8ep7i3roakzqzw2zqu54zg3m',
                systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                systemName: 'exldfd00cne4alfdsh2k',
                version: 'fs542j6ywfv5uk67gq85',
                scenario: 'rzkobw2qxemz6vnhfntgf8e40tydy0yi2inaskb856w4fitrfs13mv4rz5bj',
                party: 'nq1i28cjmghpay5pohcfxllm7g08povxdmcx6sd77w3fxm7gkkmj34tf9p4p1yc46dntfuijx9a3ftktpnth2t30e3m692ig1zm1plxznw8amjbsgzbmpuwea4s8lxxt942wn7u04egrv1hl026uhzfupvgu5zuu',
                component: '2i1gxnpsom2g9r94jb23ruvupwvgglk1f9g3r5zyz26bnde0q7zt231xdbj0eaqlf98f64hezd5i571abdf15vf4xtii2g9soqpobszrwu5r1kzv49ei67nxk30evlgjsh82dwka76061fxybx9ibl64lvo7ycb8',
                interfaceName: '9wijjxyszauov15vp6o0yip51qdft9rnqg2prsd0j0qknwuv6watapvntise1h47k93y6h8jircuus25mrz9dejina6bt2dit6pdmk2p4bxbsh41aznekkfvknfptsnhtx5fupddshw13cdgs62630ex327qorpa',
                interfaceNamespace: '6dmaz207y8mg9435f6xtaultaq9oxl6eaf1oc65txnquyvzif6ll8vg1x74ke6a3opp8g9gydvrdmd8vfmi9jqlfde9s7dcrzlo9rbaykj9lh0qqe8j32xuut05999xplfh2a8msdrcfzs4uai7b5wgw5w1niuu8',
                iflowName: 'l8pwlzffh8d89qvpj9exptxsusxhcy6bj1j2ep1dika057c73m6jakd2xng1xu3pnm0lkiw5aejie12zff8g0fv9jvd8d85r5nixzuk2af5vw0f5b7scl1dahtm239pcdr70o1vpem903a00bm7mdejpnqdipybb',
                responsibleUserAccount: 'sdqox73afm43l4lgtlsr8',
                lastChangeUserAccount: 'gw465pvk0tqmv03bmugp',
                lastChangedAt: '2020-07-29 19:58:20',
                folderPath: '3g67678roxkt8p68n5rheo8rdep0e0kdia9jo6nc20i239tas3y4udnv1wittfzbjc88tvxmjl3az3msjd1gs4vtln63rysm038gedrqfi7v8j4tpxih0raqrg9kg08772n6229il9har8dl4afap2cq1idt9wf7jnbqhb5roksnt7rbsa74n1gao8jfoy6ol9wub72dtxnsbz9i6izp3xtr0kcg45uz86bsa68yklbrnuibsmu7z1lbdjewfay',
                description: '1eyo2jqedh4sejl08m00pn4qidcw2bp4dxi6je34fyytjuewm452jqe0zh30ceab8mejaiy6qoi858vqupukrff25tgqwu7h3d6v8881soxq65n73fnt1yci7zbk6gfsw750b4mixuisre25mm2z258y9l920gsm6x2fvhtozdidzg0ub28nf3en1r5ntzcbrg04qf3rhczuqswwl1pe4b8czn7lb1xouh894olcu6vfqcv2c0vjs3lwfhot3nt',
                application: 'lgd2n6b43os1281v5a2v5uyty26rxp0yo0m5nul91cidpxt62yh7svycdb3a',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowResponsibleUserAccount is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowLastChangeUserAccount is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b',
                hash: 'bkke4swa37dk45h6ye83jobhqoeoozk5nyjwe4kb',
                tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                tenantCode: 'b95rqfaits6335f3enc6s44ayqokuo7n945hv46l0ax8z2r90g',
                systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                systemName: 'vhfl97wfesz3m2rl4cnn',
                version: 'tw5591jcat9l8tjswhjp',
                scenario: '0lpmfdavqjr928u7pnra9ag8xkihn0roo94r3m004thmtgov0mrkiyi8a97t',
                party: 'jzgj3dsji2xylqzlldna5t202g60w9g0l3nnehg7kkmnnko75awn31n6fk94l5ofcyjslza3rbm5rp36pcusy5zik1xipp7v0msg3xvpcdrqratfdvxutqnehs3iy6pa8noc5vrmr6wkjx9zqmxwlie3wk3w0bnd',
                component: 'htckfe3pik3g25tt7vec86nx6bjsqtox5bpohffllm46roj146f7t7e4cjgwc7h8dcseth86tmz3v7p2fo3mqyhcjmo9uxa8psboo2cjkvd9lbvrh478h437sfpmi0gj7lbb9hgyk76zfc07vpeym9to9wdswda0',
                interfaceName: 'a5zdbobssfnxysclgvu9kac6l629rsevagmf9adjgnvk62sl1ixane94capsaaf5i0iadijow2p3dotzkfyx3razvpmeds8w6dkice1akk3ggh1ak3qk9bnvq0xysia0vad02h2mjui5dienhlhmf21bmmuwlvwx',
                interfaceNamespace: 'mzm3puy9ijd4ptgbstdhjuw2yqir7eigd1ub4wmdscauhazli6mlephiqas75yidr35vfsgfurlm7tujlsftj6q33is7g3ul49wt4f9i7o32jfc9jggrcog511q0f0f8dcy7ekuxzkmlmvqmjppsr1xhq6q3glmj',
                iflowName: 'bac0aljogv6ovdwk7ekkdbwllzc4pcgmu1zjtiddjz4xuoh07za8hosozmunz15u92n6luz3xc4206vm2wxtive1bscgurx9ui16hyna06ooq3iehzraxm4mbylro3z6deq35wmdifk7rafkcxi96wpqz6a36ok4',
                responsibleUserAccount: 'lnx7xqnrej5cbggaiqbm',
                lastChangeUserAccount: '50dwskrh2aq2iiaty9n93',
                lastChangedAt: '2020-07-30 01:01:28',
                folderPath: 'dkb56fslolh32l0tk8wsqdxpkw2stdlwzcey83ln8yiuhv3yiodjacudmfv9vgjpl6mzkfsgu1xee2i948hzghveus5420msqkxgrnehi5n8l0p5qyhep6kw52jd2pgtaklf91ulgolfjrhr2kp4qo0g5j6s8j5wb1t0f7ixhcj3hvg80jaftljc9vduq50t0tjg6q8wp41ji86tf1c6jgcv3gkvmtwucbpn7bqp2zcdm20jkv75jne9c5zcefw',
                description: '8yvff6h8n477wo7aswnpa1591afg6k8jswkq79tpp70awtysc3q3e60khrlzujsf1ul3c35vvug8up1bg4m89plwcdi8c0g98umuz8egbrpp2ulrnr1lgrrxt4ggeyw3kf94ll2e6fcedp3hpv7dspxv8mzkqv2pdokbt75vatcjh7q8wbiu944hesmm68te77bp4lmy9j0swbs91w5z12pfz8bj6tvescwardbsnancavnbyk1f0ofe2kehjah',
                application: 'z1nih2xvaufhlfy0rnvoj2vi34k0f53akmtz3sb15akxcmg2j59lgm8f4nv6',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowLastChangeUserAccount is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowFolderPath is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b',
                hash: 'sqyotckt1hwi7d4058gjvuwv4sgn0r4q00m2fmmv',
                tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                tenantCode: 'y9xx0n3dopygqpexrh1gij70wkuax2lnl4gtn992vawzfizuos',
                systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                systemName: 'o8qi3lewvb04uak2oawc',
                version: 'qvvpgg68n69oljgfvhuw',
                scenario: 'g715ojq93oued7nqngy0whweexw6r6myb41zmv0l143lc3dtgwp6f0n3afg0',
                party: 'em9dpxezb0ixvlf3z9ol0p8id1mm6js00czteb3gm0h3oj2y39x6rmdqhqrofy26a15gpiaqr721vuy2y42sioujx3e6ruz5v6dmxobo9cckp3gg669nr3iekne6pmm9sy76cwgbxpqkkvuf6g763842opdg5q6g',
                component: 'sxw3ha0tqlhb3xb35h0qenli5briuhkmsdbvqmvj1dw118xc5mnapyfumqnb5wak161s9tttiznypoka01ucbj3xf5wbwkw29z19f24e7m8yosi0jchugmy412ddoxm2mh7bhrrdplxbrvoe2wjfktvf6ada2zxa',
                interfaceName: 'lsme9orqbaco0kowtbnzndcue3o7qog9xzyset1v52itdg6gpy48oxo2y4gswpv2tejz09fax2tvd05leob8smajxe0y4eayu3dacchftt3n19symrv7a6l8zhq96vbhizp4qefoorde9k4ek91dwume86z3hdf2',
                interfaceNamespace: '4q22ks1qqeqmi2rhc00ulvo90xkerwzmsgp6cih09wboxmykyplf5zskmzmsdpebvjcds555ph4lwn4u7lu2dcfh6qo0evd2pivkipov4zawmkibc34wu5arvc41fztw0dmio2sshks2g617pen9jq41g04zwl64',
                iflowName: '6pndlywwzj08bot9bggqdt2vfm6e4evyv95j27e8b8qbjapq8i5ww9sjwt1q4lxwqryi5v0sd80hsa7uci58st04v66j6zews00nppt80gn2iu4b4sbclocqan1k6gamrr28pbexp2wq2rdfroo9kd3a6bfn7ix3',
                responsibleUserAccount: 'i24h53xtbyiuh1zk11bz',
                lastChangeUserAccount: '5i45uiihsp5be2u6allw',
                lastChangedAt: '2020-07-29 23:53:17',
                folderPath: '7f2wp63x23wqo5o4ovyfsyr1xt4zd0jfak7dcvxu6p10cmhj5cjbrrd5is442934m0bsadjx18r8y0v03rqazyly56qfzo52utklta8rb489vddxnczp6ztfwyf7ib3irtvgf19boyb7yvnj071ux62u8ms8ohccrqsi544ypsl90uybxasv1e4ccj83sgp67lb78qtrc51uod3wxb795fq3i19s039i0qkbgm61906fc9hnpla5use4rheb8kub',
                description: 'qgfx8g3qe7x29q64im7wsc253wcyzhagr8414ridtmdefpffycmac00pmdu1w85aq4n4ak47a94k9nzyoxcljn7s5c00jbj8plfbl7xyairv7f9fpovdeotd82ovji7qwm1sf3gt8b8cxbnisz896kluzlz8j9e6mo7wsko0gq5nmr6mwdgk4eydryq9vlun6fscsek8slrhvmvhtehby8luolqz28l6kx12hdatdywp3t18a802yx7itn1t7hb',
                application: 'a5knrawz1rgc2uqhtutwgahubmst35x3e7hp5dqo0gd480xfbd916qdb4661',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowFolderPath is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowDescription is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b',
                hash: 'sxvlxm0vo8wynzinqnd5mwv9j7h17ogyfclgrgny',
                tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                tenantCode: 'ypxcbh8ogt3w0quzz3of9ojadfqwsq1wzmpom2swufg1urjhxc',
                systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                systemName: '0a1mddzaynh0l732q9o9',
                version: 'mzxy4wcylc8rry6c3zze',
                scenario: 'gyjtso5u0a7ncff3wccnnop6269fpcr9mcms9eap45q4k5q5z2wmpsnhw71l',
                party: 'kw8aofnohmnnaw4digqcltt7p92h8l1fkxgeptql1ns8jxpttgzcivjqc3x6dboretjw6v6ugu1hkpn72qql0xcrd1mg021nbcu2mtyr094txg41scllqk9mgljy0d7txev83yo1mickdgdso6c8acuy8krlrri3',
                component: 'enj0rrhpapw3eniemiqf5cac81bneg4stxkbnoh0mx9hdkdn5hw03zwpbqorqbhfkxk0l74bjm2x9jjy52p2ce6m7bt6vqdd0fdorr86dqfycubnyp4h6drrf8r8yurplx9d1jozc03qey11v5iqh3mpgo5bgude',
                interfaceName: 'kanma1q977cv9ff036p58tjf07envunsbo23sgwkz7ke6hmozaml8nt7hrcbv3ek1u28l611te4bq1pnalm31c3k63aix02ji5d5q9986yo4ft2p1zdblcwko465zuakgf4p7kgor85q4gevenzpsb7vgv5zfym2',
                interfaceNamespace: 'p7mjvmni4q6vnr6w0dsa1n4goc9t4ax8sggnyc6w2ymr47ukll9z36wvbvk316mj2jnfdxyzqhv6c23blj87ku87v3tclp8m00ort34jpxd349ccm8agcfc44svwmtlzzerwls7ahl9hl5zbhog5bgskxx0ik47s',
                iflowName: '8oqfyrwh8ak2o3hq7ej6sob5970boruj4fyijzy8bcfbwlb23vpugzv4lny9ikqu5vh7ojvmhuh7pzh5nmp2hivrfyqltobkvm2k3zq0xhlxt3ci2xaihzxxhxi0pfc1ytc0tf3ax3smcrv85sm6le09p9fvytov',
                responsibleUserAccount: 'gtqk9ilksfhrlwsi8rka',
                lastChangeUserAccount: 'nwekipwd92mn939g9wsj',
                lastChangedAt: '2020-07-29 07:25:19',
                folderPath: 'mqwgxourvmwprrtj9ox6g6rm0wmrpjo4t8s4wkwjphi3dm8fwznz84bdmppj2v6bp74ur3cm1ao64xb345qtneblyw3ok9ozaliduoypgtg3pp7x103shj9gb37yz1t8crrevxx1vp8y06jg045th72h3mim97y7bm2k0dxojr52awbl45oxk8yuwf3sah5a8jf4dfyvh71evomzyfac3572v4ggg5n4yazch32251c0czkcxxgi17pt386bi6o',
                description: 'riaxopqt2pagmhauxn91u21rvovncayhuxpiyhunnbgq92lsxyvg7fnqjsikmruvykimw1pipw3wpsfu1kapckkhd5erlmc3y7q7w72l1twxrakgdullwkz9849rk71xf6mb2hzhr6q31dnkdpk2b8whlmr2704uu6ljfijam3x2ixgzd62cyldd0mpjjrq53y0gyvz1fysniolvujjic5po7ijyxifa0hopmunz4h46515eo49qw463jcebboi1',
                application: 't2pdi62aemlr15k4fy0z6ql1cvkva6clmz9mhet6ors2yu35yvdboe1jos04',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowDescription is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowApplication is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b',
                hash: 'fpz1ungev85ham7479u3iopijwpf8gas0il86vnm',
                tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                tenantCode: '9swnqxyopf3otico5duy3vdz0p1ytljzxs0zuilbvjp2nk9ckh',
                systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                systemName: 'o6ld8dgv5kn6acxejgsa',
                version: '75jn0ordhgpmwymhw0kn',
                scenario: '3qujw2fymous6jlf69r7taad0z5o5xjazn7t6t1miyvkmp99zfjk2m237sxb',
                party: 'ya2n2n880gelbhf3kj9g75rjd67t5mf0ys0nf4dim2zjvsknmlnum1zzkklbwvo5f2ud3ok3tbxqr1arweyu308so444wc6h1obhbll51t00dykguukl83xjz4sw3fpvm4zmwfbsd5141ghp9y4phiwww74ld52n',
                component: 'hk0lt3n8goorahqgi7cog0rnrpccgip07yzd9fm1m3h1cpb45rps4nf19lqzcla7bk2c0mkittazuldpvy7l328f0gw03l7q9ey52pu1seh1vrkkmu04emb4znvuzpsrq5n27f1gyf7kxskl1w07tcc8uv7v8ayq',
                interfaceName: '6chuvs4zmwcmlj5ksm48ex6dzlxfvpig078kpxmvzrvnu9ihe97srlee2t5kdzktmr5pfbdf05thrak4i95mwcuc297lg42eq17t8pbvtlay3feagi2sgoc904hz8gob3hnogc4i99xn2459vw16vlze4kh4qsqz',
                interfaceNamespace: '9zekvi5tdfhzyfepie2u8muym35xcomzugmhp4j4rk4j4nvbvtiplwz174ze675c8v2xm2bewbw7nn96ztmgya9ah9w3w7adj2mqkx05n3vqpordulb75sbzyre5x4luru1dsbzx8sh6lpt1remejisdfm75v0dy',
                iflowName: 'd5gykr19u741q2hrcjcfoepdeezlmgaiumbm91z5jjfty7k87lxvd4b8rztp4y18fpa2kpzl5vnh28vgn5y6qxupwgj7zq1r6jhnnntz08xx3n59hso7alcy3bie1uro9jxu69d4lsescs0o48ha2nxq7tj46bmz',
                responsibleUserAccount: '5anv829qm8blepv3cucm',
                lastChangeUserAccount: 'k8giuxn7owa7xe217vwx',
                lastChangedAt: '2020-07-29 13:54:32',
                folderPath: 'zfu9sd3mu26ioirrx6ggaoyv729ky6ym0qchuhb68uw4o7gsl9gw7iyh2sevre87mnjkrexskelfygu0t67a1q6f22zz1252c6z74pmo5jpspb872kiq7ildnwjw4bevfrkqwr61qxjtr77zcksi2kn4zkszym0e784qzlqxmqqiffffjhdozfai2gv2r8alare2thnroppev3x1wz7dw5sq8a51wzxf1f2bu1tk63j5uptkkvpucl76is8s3p6',
                description: 'h9a4gmcnfyv33oyy89mj81hio9t0601rjfep4a96m8lddwu0mz0vflvv4oj1avz7yoy8dp1lfxcaqmxrdt0va97694dw5ba57equma21moubq8st1dsuj5sispbptzpmo6m5zr6fgt39nr0vkyrnymj73dczwyndl7smjeh6je4l73rgohavyyjqh7c11pluizjga0m6cc2objvg742so89m1s7c416et3gpgulkw2ded1z3yxxsj27p1322vps',
                application: 'z79i32w0oux7kqi3v9uny4k651kfdaa61gcqeu2v0ssic3uvb2phcfngvxfas',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowApplication is too large, has a maximum length of 60');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsCritical has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b',
                hash: 'skfcxhh9rl1iqx55g4b8u5rdlbjyftrf9xfwoj57',
                tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                tenantCode: 'iwr32vn2xl3vbt8a7ydmq1icgv9uwoed045eq6cr9im1sv8mvf',
                systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                systemName: 'chnmbbwm2yn3fmb9efb8',
                version: 'y5a1k3sinhutjgspbnli',
                scenario: 'm49s1qffkuopdjn4un7rriey2o59h2tf2s6ysd9lvy44ccwmk0z003bmy14x',
                party: 'na95vmjvbp7pa5ppxszn1jx1jfvft7sevcsn7081q09qvwf53cxaiu3bn0uc692f9v8p7jo9z004j2ld116dqbgyt9jgxsxln45je6b5niotiqk3ix6fo19yyeriied6u8g0zlo6x72xq3esiwzu7xmfjjrtrpe0',
                component: 'j6f2ebvetc32eh2i3s2wkognaefbapf4v3okqddoym8610b8fuj4dois9yvzmaclg7g40zm1vuovq25mzqvnypfpph501sawvwz9wk9f7tc2hz5dmhckg1es4kd0ad60urylhz0g7jqgf42nvyqw5t95djwdssia',
                interfaceName: 's1l6fryj85t7h8crpywl7wmuy1qk8lfld7t7hk69zsf8xxmp3nd3hokv5yuqh0a0naypm2xic2mr7bg0gl7beeddozk8nu6p0el9dmembupsshmagp21zlpomfcoujtap9pyb5ktfmu613r1bvbcqgwg0rn76tzc',
                interfaceNamespace: 'nwo46dy8r4i1ytfhmcg613yxrc2w41t1e4inwi613mhwyhjkmovugizupmoymzwn18dmrhiaahm8hnjk0i70gka1w69qfeiuaoblsydeq2w86eqsgvgv6lxb74i1zklv9hvlpincrnv50pnkk8s7p3mdiyou5adb',
                iflowName: '9l55fotfz7xg0byuyxl2v9vr4f717tts6npyp0qh65t1149b56g2eqq4s1e09lxwkf19b0bmbmq7wl2uxipi0gwcg8lbz7efde7m5donyxaa7dgqcm3cygn7ax2z7j96ik5at5c1v29rgpl9hbkcsv8dr66nvt40',
                responsibleUserAccount: 'o5jtk18kqu2avbojnh5d',
                lastChangeUserAccount: 'i3isizt1bxmktwgchb9e',
                lastChangedAt: '2020-07-29 21:56:26',
                folderPath: 'q5egpto724p287m1rgj24u95aae91ufv5a5afjt8zeynmt41k2o3313vk2yx5sfoup3vaor1txns29zajgtjoehd20exg8e0wit3y25pbjsemtajno7oakc6m4j59buzoftwaqvkx8hj2twwn4a6mqj4tbijhvqyloyqcl2hacb8lo6pucwwhkaf7yex6fnj0xywzdf87gnke0dzfnec0sluy5732zt34avero7iuudiao5t012ptnd9qion5ua',
                description: 'jqqejs57eq9pkfi00qs8ekjj6ytqp9zbld09k7xfhbe7kcbjtsnb6zrr6ay5qop5e4cy1le88m00uu4o4dydxlzsimcpu43o3noczfbo37b0gbskgjfv0yhfr203znwvr8he4wgdxtpks8ytemgz38dmq4i0w756oejjjpd7p4q51tly3di31byat5vecnqr25axi82otgicqe5joowoz8yms8szw4442i25ixgl9wgbd991366j7asks1xjxli',
                application: '89dzdy97puf7rcs7t7sw4nz42jmnom6yjm95b7m5kpivkx5ku243jjtwtcpo',
                isCritical: 'true',
                isComplex: false,
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsCritical has to be a boolean value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsComplex has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b',
                hash: '0tu5vp4l5dbehf42ibswx0p8jpoqjldfmmcthe22',
                tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                tenantCode: 'qngghz9j0kr7sbl25sz9dr543ve5x0rq38erxhyc8zg7y2lkq4',
                systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                systemName: 'rvkkfrfxvcceidhh1in9',
                version: 'sagbpwjhlgbhbye4d8wm',
                scenario: '44wjzy7g6q08fonxehkagzpg7lbdmyf8g89gnug0h5yvvpfc6970pzv7fax7',
                party: 'fdbs0d22a11x43jnuh8to6kxcmfcrlx5cvfu5d1xy9xeb2k6jtf8xjadz09da6u73jo684n79cvrh9t3wpi2u4lr4jw93by5l16o7xout5yw18hm18vovb3wnuoqhvs644r2xkxm3oqo2755y7sc5546655lwohr',
                component: '62tggcmifs09voe57z2mtzcj80d6885gs6uxgewb7h12tb12n2cxivi1xmq7n689sejs1z7iwpyx6vj0lr8bpky67gyjx1dgn0522prp22kenv9jf0b7mj2ov49c1sjqgokkbm4ebzq8gqmxbslqsgdysfrziqdx',
                interfaceName: 't2dcflau5ttg4mifgh6iifry33tl3kyia6o7jzetks9chlcglk43n14tzryoz6qtsnfot3so5mh4op43qogoco8gc7avajve175p4w4z3as4rga33b03cas4qzljycd6eq01tp0xcq5l736xcibl82kje3p31y8z',
                interfaceNamespace: 't7wzxbe0bdajz1aeft7l01jafdn6w54o3ef2uu5wmgxfzyj01sfitvuxt53kvz20wxv27d0i24j2vlu1p13qttkvocfe12szi9p295kqx0oky9rn2z7h489ugj8niz8pe7zjlll0qc88auzd6rqgrlqx8uwdmp6h',
                iflowName: '5b1vqwu2f251l18g5ihj4j5u6c8l15fu8rx6tsvs4uvmoo2olipkk7e45mc130l8nmltrtps7770w8zm1p1eals45zl71wh0pwgwl52mq6grx7myy1llp94gmylkpnm01sbfefearps4reba7p8bebg78i1zpvlz',
                responsibleUserAccount: 'j7wyqz9smwoao5ntnu4o',
                lastChangeUserAccount: '2fqwhp965qq43z9tctzy',
                lastChangedAt: '2020-07-29 08:02:00',
                folderPath: 'r498c3jaqido5b1i1bsyq7xywolp0kjwdseoi114n4iuos4e35f4m8fikfkdtx2dsnp7fzfwdv0jerg4okaejq4kgyscctxwyyxiddm1g3gb4z9s7u5slpgdtoj1np5igmgtohlcrlexwsd670ikk83b79equ0kh8glncmcdczrry0j8z8lhodv34zogkavwz8qcquyg0etn5gowyzg7n13nksij1e8a59q0c8zn16flr570bie4k3kovgwavhj',
                description: 'd6el4fcuc8dgpedux4l98eknm07w7qce4m9qb1wcala01s71sphhfwp7j3gobqx5r2re78ruu24siadtwsqtzd5rfauttx6l4jx0cds13kqmlpnhf464s4ti9mz6dju8e0arfv24scm8vl3mpqikp7yh5rk7rn3emjhk9wvvaavezy9oxz3xi4rtez74rof4vqyrjolu0x83g4hx5i24qt5afszjvuvh3wvdukxs8ujxkh7nhk2jyscl76cdmok',
                application: 'gl9xkxvlzxhzbm1thwez2pvyc27v5vty878yokra1cjygwjhs2pp6gkqn4f0',
                isCritical: true,
                isComplex: 'true',
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsComplex has to be a boolean value');
            });
    });
    

    

    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowLastChangedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b',
                hash: '47ab2ymjw2ndm9i8lfeewu0hmmoiwh5c6ikledf4',
                tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                tenantCode: 'aznkab6c57sbj60xvl7yaxlhbmoubly9k5ir9b8jrec72a788b',
                systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                systemName: 'm1cyuj62zkoinlrnc8fg',
                version: 'pft1fww3psnz8zz1coxg',
                scenario: 'k1eji7hgeozdj2izgrfvts8cjl9zs688q1yemhc11xm30088bpu2w2g94gdc',
                party: '6gxq9fa7ppgsh20ub7ia96zjpqibv7pfxliqit47s8lg9wta0olfkgyvdylesom3dahlqv4vhchgvwwy7r6wmyc7xvnshdthvnf2aymcupfea4mzxcsn9qy0id8yjc791qbm3a3qy8y277xg60sgw1cg4zeswv51',
                component: '3j2vx3vyspk6s9n7zqtqukx9fn3ai69mzzn1004y892gom64mio9y4rla8t9rwawbelopmapbsmmihsi2d6e8b7kr1vc7qg06g2wds1nl53nkebtv9fskbhj1fqb5hxqplm4bk94c96xnqq0v76vnw3w20qylgwa',
                interfaceName: 'qzi94aze23f36z8zp51ygnlflctecddy4ammvc8ulenyr5s58b85j6hne7awhwqgdahszcf7ej38q51mj2i7ze5nczmtlmk8sqbcdbs7lrzwz0mfindhy38zntoqrrsz5z11z7am9quaia77r5tcmtagwq7dw4km',
                interfaceNamespace: 'u5olqywm57q4u15lqnhnlckyu0r0vk96q4t1d0uv5xvf85zzyfgsmv3flxcgurv3jspno5ikb9k3tn3ni8qv4utjc7wsadlxbjna7xg0e0ytyww4fg69br62d11mh34ln48q5jc6c1mqz7jgg9pc1v7deqzd6a0m',
                iflowName: '6zewv0cwrx7qnmqeskafl7npbm4m26tjo9u8emckftw8x2h6sl4hlxg4pjd3hw0m8j8cim18qtlidqv9i3homsnoynq6evfrjzfj3lyopq5q1wl8b076evrvj3bink4lxfnxyme6osdt5i8au5b5buafvfwi23nc',
                responsibleUserAccount: 'i5nhtz6liqz9wcwdmf4o',
                lastChangeUserAccount: 'nelg3yrwr3aqle38kmmb',
                lastChangedAt: 'XXXXXXXX',
                folderPath: 'shnh4ra3z47acwrroaatnx17bfb66ms3mjrzw84obmq2uu5nrmbgfja7nyetmnclg1yex9sg1lwfbtzc08832vxilq5dzk3ljltki7io29kdhp2i5itmxuwtzahwhnfdcstekjdywe2e7lutby9mat52bhdvus54w7b79vqro409qz33o5suc7k0m1ix707tx3gk5xb4eyd4uudrj1tpdttfhz438hu62dhv88hvoip7w006gvexznh4ndnrdku',
                description: 'mke0oi8e6ofvlbfghgway5mhgxhcp22wvz4jxi4wgidwsdy41pla6hmm8mt2f4ru84mtuzz6vcq7aecmf66mhesfc1twrnmoqkketo3gwcybezbecj8c98y1mq8sipovppy71d0hbwfh9c5nifrfipuhprmbpd9n1c73yg49hu1mjmjduvdtz11eaksl0bztjqfsidzv3wdvk3526gmw4g63uo0q0dwt6xytc8w3zhiylghjwmhkrnlfsowoxp6',
                application: '3q9b3l61tukgoepn14h24ldcvbc67xp7c5g4tons4eqcwxwe0fr7904ck8w7',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowLastChangedAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/flow`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b',
                hash: '1e1lcu69y7gqwsfo4qloyl7arcbsaoj7oa0p1jcd',
                tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                tenantCode: '5dk8n75xi8p4qinjyqvhv4ujxj8wd9lj49eyzonsygzh74hizm',
                systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                systemName: 'sgv0wmn6m3q3yfiywp63',
                version: 'gwivi1g71e348h2yr0bq',
                scenario: 'm53ulzfi766tqu4y4a7r1egts3dgcgfyucx2ozxgezt192eqowkc78a420a0',
                party: 'n8625orxmups6uujzg6xcdx6ivzar74vqso2hrv8trgczr83mvqo17n239tgzc890sz9a7pw808qw6sb5e7h9io0a1p0uzd9nzdaglt24bbtzqbvki108h3o06jl1tj6mkzyyf205l0phhje2ggrgvgatzhsiw9p',
                component: '1c5ayx7vdjcp783h90wz1nmipxx0ogmhxo62nwj6rhymzssls0jmfjlwlskh5lmhefnbzb1lvwz08sv4ugfvcmvawu6rfrmjquo5b1o39llr8moe6zpgpb3c2648lgkytgroq58zi6yvucz7pd59gcdr5i08dih9',
                interfaceName: 'dxmimqz3vbdih4ffp99iltj8v5mrgcdkn3npkwjshhywa4aarl7jee51dol03ie7pga4bopt745qkh4bctprlwnmb1biy7t9lzl860lg8gagy49xux1vlcb3523mjlwemh4poerk3gfwhy9vbfyqj04ntofpy20i',
                interfaceNamespace: 'bow5pjvieqsi77mjsp4kz0ursqacv0vw0pi6kp2kt6iv2wy1396wxq16v6obr5kh5t3b58bwmzfsknooxl4ljfy3075x19q2f3qbrbmt6581gve2grlt0evw34ht1ds4jo65ty0y1ue2hmv6lgazc9q4rmf1c7l9',
                iflowName: 'swrem3j43stjsudq5vbkiv56unpqwuqvhkhkgr5eu2662yfx3xv23sxlijofblauez35dh36qtp6ct0dph92dpl39h4ityk5hfy3eyv46l6ecs6g2mlov5f72bqbj6ag8joqzgxp4k94yr3zctqvatws1eat7wbn',
                responsibleUserAccount: 'ldfri0uibf8rqwc3059s',
                lastChangeUserAccount: 'ed03hjutiyrrbi4y1b4q',
                lastChangedAt: '2020-07-29 15:11:43',
                folderPath: 'rjzmbf6l40y0eoce5x9fd470w1v023wkz3qvhgye6qaya8mm9lp0ofkma30n83387rk18jv616lcohfh9jyrj09nyiuq3yhxh9sdpqnrxsv7yx6pjos46fee7583wwllv3oqxkaj4wbrpo1q79xjpw6l6glvclmakedwnuwc82xafnckdi3e88qnuqynnx1rncr26ffo0gy54s1f7gmvjq03gd0w6fbob1goxv6zyhix2o588ourjt36alz96pw',
                description: 'v0lnysevtv1wf8kylhgvx04yzf1h7c3nmqmb7i6f0lm7xlyzqfe4422s22bm7mzu9agaue4gudmjqup8vukjvtwsf5z6xgxrmrxs6hpu5yqoiazuaa3v1lmkcajcgm06pvidf814nhn8ikf7q29i477315an4f64az65ft8o5rxt3nwphh54a3e5zmeapvvehodj44pytxku9r0w0e40pyg6leo9pruqwdxhd9y4ohb7kxz9yostl8pp199a1k2',
                application: 'al3fcmwn5l8yhsdxbh3l75122pebn65tr1d427ursubqblx7eq6lbutzgkox',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/flows/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flows/paginate')
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

    test(`/REST:GET bplus-it-sappi/flow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '4f67079c-845d-4574-bb6b-20f0616250c1'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/flow`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b'));
    });

    test(`/REST:GET bplus-it-sappi/flow/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow/86603905-9c48-4bd9-b1a2-9dc0c8b74ac0')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/flow/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow/9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b'));
    });

    test(`/REST:GET bplus-it-sappi/flows`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flows')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/flow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                
                id: '1384bd3b-db04-4458-bc3b-683f8f8171da',
                hash: 'zt6821ric40j9r37asxmqzs1vhwyre4946ufp8vm',
                tenantId: 'f32fe244-fb8c-463b-b217-466d2f178177',
                tenantCode: 'rbkdr7iksivixr6ovz672qwn2z5g4m43oa7xx1gmgi4plfv9h1',
                systemId: '9b2811bc-0161-40ac-be64-ecdcf77c0a1c',
                systemName: '7d6yyzx7pg73i6spn4bj',
                version: '3qo5vbzzswul975wia5t',
                scenario: 'pfchuydi40x5qnsjs7zc7qb42rdjl8sjpcwfvpjcpk01mfemetth28kx2vc3',
                party: '4vkslt6plzc39xi0fuevf60ncsnkw2rdh1f7x34212aniphlp0jf7e6frvx7t8c8crkqxnugkuajsuxwiz15k9zlet1weqb8bomfn8vd6hj5fv9pwo8gyvhg5ax1hypi19z23xdk0lkjs8eifocfc0m0bnpebd9a',
                component: 'rxy6wo2w50cse69hk6rmtctt57drgn0mh5x4vcj3z3kfynde10vb4tochc6yrob7be9rwmpsuhd9px3xd44ghda2a3lc5d6yvgwmwfjpibdb89ecwir9rxljj7eivmzbwkmgowub3mkug62kjstfgnthtnx8u9fw',
                interfaceName: 'o5dx7lgdksv8m22nbisp20nsj14wsrqpxgx7th2uyobf5dp5mhbm9y0iczis3zjztrvg7uewdpbiu5gdd2yuvee4ptkidp79ia4pm2z34nclhu5avzo3l9e36qjl80iiyz852b3r0a8oo0w2khe25v82w37iousu',
                interfaceNamespace: 'wlo24ol72hwp48g03n9no318i1iyj3s0jm254e30g113oh2kxwx8vqbrwkxrho5q5uo3m6w1gnbbrf3t21pswb0esh4ngp4ifbm4rg6xa3hv76ryyg0p3ogvbonhixhmmitmpttuwbnb7ztvyw8v6y3dxbataug5',
                iflowName: 'f5ncvwl17t19f7gbv9wrx85zhezs90453y71clcs05z7kr58rqcbyqguevi7elfv7zqywy78oicc0p6r56f5y2caacsn3gwkzg7fohvj9p6s7s1tatcsfcr3h5r8izfmfd66s0qy6kyya47e6jajvoepaxspvogb',
                responsibleUserAccount: 'aavan6lp1q2nllvttxs1',
                lastChangeUserAccount: 'gsyxqyt5v9cgf5egph8z',
                lastChangedAt: '2020-07-29 22:39:33',
                folderPath: '8itkc8p8ynywb43gsqum2vp61pq3eyeb50klj9nqozzxfwt9rra9et8l7s0q0wbezxy16byq6hkwrnvpp2g4sxcmw4cwvietr8u8qtxeupd1xxo79we63h3qia79rw0pu9xcl8ub68tc7sq766acan8m1og04oif0vq3fnhjso7lz623u79bafny128ofys6it60k82lo8jjpxkflyxf86qowaz7ei5iq542igiqu04odgfpbcq0a0zby6mvjvz',
                description: '4uioedo1rtlxpsnm1regqfnxhmjqzs087wizveij7iuro4ble8p8q7fa24jwekwhsaq50hgryglwt1hjufqr738cg1r6kd9fdea6ii76pe2w3i5webnwj9iaisqb4pz755nchf7mzotd58js7cfrhq2ael2gni1qo6jhn8vl8l4bdgsqo3d1jiienuetkmz8t2j40uetlvu3kjg08m1z23u4abkhugngjg4he2g4c9qmwi132eri22oi6poq3by',
                application: 'rgd64w95jrptt4bxsox63ll1uefuiiy5lqb8llghhg77kp86m8ainhr2857t',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '51a61323-73f8-4e79-bd1c-99679ca7d218',
                data: { "foo" : "bar" },
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/flow`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                
                id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b',
                hash: 'ueybdcbby9kg4ecq3trcr9yrmr299gozoaglf9fb',
                tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                tenantCode: '6rtmb8b00yekju0d29u6qg3wewl6bthzdz278v2dznavj9yguq',
                systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                systemName: 'm0ricivi4yjo7hkpe4rw',
                version: '3qe1ggn5tbqax5otmm27',
                scenario: '011yruutnmb9irennhify2g2tp02pnaopx9c784vejprwnt3z8b3ufbjezdu',
                party: 'suul4keoimw9v7ihxiss28hut6sr5h0q5neftqvjrib4ka7lgf0lp275w71d1qpomre55hx9hh9qk6wifefzx4dr3dh5q8etsunsskf87lsqdbryr0np6p4htid5cpamjk1aruc7ekfpmn5f3524qwe15fawux04',
                component: 'ghgrz62heqjwudn7a0i7ay5en2pvg27xdutns1hnbkib1r8m9txvoemck2oitqdwzvo7pw8s2bmrj2bjgv4g61xftrjmvm13k2isqrzudcefdwhxb2wtksg8nkyi7usr527izikikqkhpe11nxl7axxx8h8kf6gr',
                interfaceName: 'ndiz27oxzqpl36j0nb4wx29she48ms0vwfnsvyc9g4hkioxmj8zl4sguhe6kkblqaay8lquwott0hbefp0ykwwcr98d7erg861btso6k1lwmto2z4gp5vuud7e0ovaibrp1dgyso3klaf9oq3x4o1u206oibq4he',
                interfaceNamespace: 's2xmb6ojr6xh4nkbuew1kb41ik1h2k6jbmwrnd99js3viuye3bojyj59d7jc6907d7mpsoi2wnyo7kfdw7lhg6smvy26ci6uqhheo369jyedgtji863470uaarsife0hxrccv88lhk5wxq9g3rjdogej14f2ekvs',
                iflowName: 'ad8ff91bbs9jrkstzc76aep9gq96jfa54kvfdl0wvwesj1qgkucp1c72tmwzxcy7za3e078zx8t3u09k9c8wlgmuc2syqavayocwtk1j0s6zj158jkqt64nvwaxtk9tafwatt3pljpnlwkxwn19f9fi5vz1y3lok',
                responsibleUserAccount: 'kf4qcspssuqiiowlqyru',
                lastChangeUserAccount: 'txyps8oci85ndqnuefi4',
                lastChangedAt: '2020-07-29 17:01:39',
                folderPath: '0jzn1g81u5v3w4fxjxaobqwsq9qq05l3qj68bi3xra4pqjhdyrgvf0vm7zblvev7z44poz3yn16vnv2e52c591omusdpyysc88cfrbzthuxonpfqnru4mq6vdfd0awha480v7y8igx1s9x5zn2me2fu0cwmjjpcjibg1448k664n442kzd54k2jh2i0lr23eofbn6nodvc7vpykddsbyswglvgqv4cgzjqnrh63ydjk26k4t3kra6d6446yxjo8',
                description: 'ri6yk98qora7q8casymz17yg9scyogm8urfmq3n99t6cgg2ujts6504k6q8cbmuwo2s5woxuh7dqw2hl69y0hsrsfwhn2mdg7tv5cl4sdoako40p8j3avxp0y7n5r8djckvipiv77yw2j7r16026hjgb6xbuq0zv4ief97vj48ktnn4h5oh3wce7ffmiigbwqohrxbbwav3flyny20u5fsykl2xdn0ddyee4fq4hv4tbhm9s217vf0hvgo28a89',
                application: 'jqg5lmss33meb5cvfq983cypwyyrnbwg16fz96pb05y1kvov3le24pjybws1',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b'));
    });

    test(`/REST:DELETE bplus-it-sappi/flow/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/flow/573945bf-2b46-4d65-88e6-b646fdbec813')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/flow/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/flow/9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateFlow - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateFlowInput!)
                    {
                        bplusItSappiCreateFlow (payload:$payload)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
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

    test(`/GraphQL bplusItSappiCreateFlow`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateFlowInput!)
                    {
                        bplusItSappiCreateFlow (payload:$payload)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'e79c49df-405c-4d4c-b5b7-c8cd73660e40',
                        hash: '26e6r0qxcshmb56foxdcw1trhji79c2nj63guhu3',
                        tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                        tenantCode: 'hmt2icax21kj3ns52m8bevislyg0yzaz3dn7jn33raxmzv43ym',
                        systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                        systemName: 'bb96aarrd46p9fum8nre',
                        version: 'q35m4uzqr2hqwbqnnju6',
                        scenario: 'kiu4tiftf2jj0ir5odswv7v3nodcyvlb0u27tq8zrq877tje5fe7og6nrqz9',
                        party: 'u42nggj364d9k6ed0dlrp1186kk7nyrov6q3k9b1v8xt0859whti4okjtbwj7xo5sfkzymh6765abi5wir6rl27nj56fltze8kw50j98prf9hj1b3qgl2etk4ivjj1z7km3mtrg7p45u70a8prpcf2zuc1dpbe0r',
                        component: '8rqx2gvlq4syhsal1tdnuws120yqzxswqsvd33pqisy7y9nr4awb82z1fgvfk0bjw24hukmab6kpz8o4r4k8ss4zv17ohcbcoo33o1sei9eotukdpha27fmj0abjguqvz5nvjtq4nl8zceulpxxycrzphcv702n9',
                        interfaceName: 'cdpmhbzcaj3z2ev0hrzu6wcjd1x5rzqnqvu80k5g3cqfos7vsng6vp6or4ttu6keeoequba4cg0ulj8grsl0zcdlrctc7kwa0c4e4wcpxwnyvk46fepd4hwa6h9zwkwttgpw2c4c9b5o1mw23zt41d9zpidezsxt',
                        interfaceNamespace: 'b8a3jinmukilxwxemcikn8rod0lzqwbbfpghj6ec1wnvlrjvil0g55npxpp9769ox7zupuz9y1tqs8c3yu9cn3thq68sw6jaa2vznd4kkdvukrj4gtobnenwb8m2r7ox2qfh7ny23myhg1o1hga1yjgd107k0h32',
                        iflowName: '3rb0llb51ufljtb9sojg68gq9r9x3hi15irmb61891zf68wmfpoptz6locb51lvrz4kl3z6vqdyi37c3a3f96cajafwb2yjd3hvcgvxybyws2wihwrga2w6mdnkz7avkdx4nbwqe4u32gbmr6g8cj0hn7oxfr1jy',
                        responsibleUserAccount: 'fu5cofaju9mm22oymqha',
                        lastChangeUserAccount: 'x90n6k9k0yest1ri9kg4',
                        lastChangedAt: '2020-07-29 09:09:05',
                        folderPath: 'crt9ky6tyltteo6ils4b9iz7y3xbojqi1nsflfd1yoeom1ya4ud5mptplnk5s3j8u79lf877io2leh1p4tr7zvx35wlznlt8xhs3dnaopegurax5hjzs20ghj8o4rlatn21ml5974so6in4ilgqe2grcf1lrmfixfx1k5ekz5pkkmm223ngo8r7xmljrh223iucbl13fo2f3hdo3xtq6jiz2hd98sbcvxf74samu2vpwhxu920uqwwi3xi0lsiw',
                        description: 'umqxi5ub2h7mnfgp1wsvo8j0ql8tdmk2vrjey0tdsve73qkxd8z6sty189w77780zi6vqqnxtz1ap5be12elxse0cic4gbj1ndn4x0jd11rz27qekq850631pbuninkxhll25lmoyjefngylasjzoigy16kn87hokwyyvlkz0n7e48wcp6stc9rzv7c760brauxhfvpc7bkl9m2ifhxtzbvx1087mow0n01hk4xykc52876q17urizf55w9novh',
                        application: '5u2duocdus4eh14n7c9yaqfpt4b5kxk2tti4o8fjcobat618oo5zdqb8q2xd',
                        isCritical: false,
                        isComplex: true,
                        fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateFlow).toHaveProperty('id', 'e79c49df-405c-4d4c-b5b7-c8cd73660e40');
            });
    });

    test(`/GraphQL bplusItSappiPaginateFlows`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateFlows (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateFlows.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateFlows.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateFlows.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindFlow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindFlow (query:$query)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
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
                            value   : '0ce4bd88-49b7-4611-ba6c-2b68b08f4259'
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

    test(`/GraphQL bplusItSappiFindFlow`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindFlow (query:$query)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
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
                            value   : '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlow.id).toStrictEqual('9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b');
            });
    });

    test(`/GraphQL bplusItSappiFindFlowById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindFlowById (id:$id)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'efbf5ae5-162b-42e1-ae7d-f5d990b05f4c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiFindFlowById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindFlowById (id:$id)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlowById.id).toStrictEqual('9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b');
            });
    });

    test(`/GraphQL bplusItSappiGetFlows`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetFlows (query:$query)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetFlows.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateFlow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateFlowInput!)
                    {
                        bplusItSappiUpdateFlow (payload:$payload)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '35cc68f5-2640-4cf3-9ace-336e34633d78',
                        hash: 's3kbbsiymc36vg1ib70t3j3kifvvqniwit1jv0ow',
                        tenantId: '39f1fcd5-a495-4e97-a405-82a8056687bf',
                        tenantCode: 'm87n5qn43a603b7b6iozd3fg79i6tz2pg5ep5kio0s3b8k7zjq',
                        systemId: 'd63f40c9-ea8f-4fe3-94bb-e9801933edd3',
                        systemName: 'r15l0gt4s5jdivzvuyxu',
                        version: 'neeavhgwjcgbvrybni9d',
                        scenario: 'govczreff1zc7ustt5j20nuxh6kmgio7b9ehfosvhw5rlq6t03rpr8h6hlvz',
                        party: 'i02joopjdttprr5eyk66gk9bdoizpzbpsqt5xdjc1cff8pmoi8d3xjis5zauhcuoymreljidnegx8f26hp68d1ytehgnuefgq073nsl0fooosxenfmeq4unqvp8weboxprnxo617b9eywujr7651y4zzks2brukn',
                        component: '73xkkzljizf52xsy2fmifjpjoqnkw7yxqgegic3p6or446cbj8pgjqe7dbv3j718iglfuo9e0r893hrh6akqbjcn1juodtt2qqetpugr4nbtadt87tk4fpjb2af9iq831i2yy98dqy6yxb7luvt62zq76curm8bw',
                        interfaceName: '8eyzm8tl588068x4jsbwe9r1pox3qpe79if0bleafq28rlooak98tzn9m7zq1hjrqkleqxp4bphedbnvc1tgtr9ti5jlsuqq77yj4z7141vsxo5vkkqrp0afauhv6obul3zfevxeaw6cypk7p7n03zqv61ajk1w6',
                        interfaceNamespace: 'lq8j5kxa54yko0v5rpr86vg5w0nzqc090ncgoncret6jtpf9wvv1ssurn3ggxhenyiuz4wjdx2ntc05j6q1yztcu2l8yw9gh5wydddvgmi21h23jbh56xoof8d3qb6y87f8uj4p6i3bkw4a62pkbg3uorpbunxx0',
                        iflowName: 'hei975qns37k1jm1ubcye152imundw09rzx55xf48b6lsl7yo6b0haaasgkzotuzpdszqtz24kasr2r9z9n00pqybmj70zznvmaiky5n9axg5k63ekfl9a4q88pp91xhc0d6bftxxvjqz623qiqxiwqpj26q530z',
                        responsibleUserAccount: 'jvz67sx5th2rgavakot5',
                        lastChangeUserAccount: 'e1vuuqu8od7yfg9bfmcx',
                        lastChangedAt: '2020-07-29 19:40:29',
                        folderPath: '4zaxldsr7sh4thghack5f4zmfllr5zzfbpx3424qo9o8v8ocy03jsz7ii3ad1uuw73xsgthoumhk3dpfqwhj50hw7ygqx5c9jv429cs4jxtjqhkyi9eejbq7r7j48548a8koqehild80ge6lqzi6ekmhz0xfcelwsffzztl2gz0tpcprqilmxk01tphh37vk0dmcbminy9wkxmgh6l8i0bewlpzl8bvttu2dqmmpc2w2d3e7jnvldx20os9xt98',
                        description: '88jucfsoa3euga5zmat4sacvnnh0mgtzjm1gj0yg35c3d5im6rfw54qou7tcjhr2tnk9i5dh1ypwbsr9i8ezui39oknz6qrr5u20vpq7tz0jb4f7w1v30k4yw4yi6y3dp22wpngzty4caylpchvmvhf0u74pmac3parfl3r4g65l5a9nl66hynxif0gtulskryqo7k5oq6cslvx0l7a5vy640rtm3m4u0gve7e1sj90n6ak2behqhrqxpqc86fe',
                        application: '6q1sta3jaqzmn5eetf9q2ry79z5v8snsydk8gv41xczum9qzf5dog03f35o7',
                        isCritical: false,
                        isComplex: false,
                        fieldGroupId: '5adeffb7-7c8f-4f5b-bac7-240ecc9b1495',
                        data: { "foo" : "bar" },
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

    test(`/GraphQL bplusItSappiUpdateFlow`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateFlowInput!)
                    {
                        bplusItSappiUpdateFlow (payload:$payload)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b',
                        hash: 'a89ov1mw0iwwtvm0czvy1muqvv0idpteo54kybv0',
                        tenantId: '8176d89d-edf6-4e6f-a15b-e85ca1299ea8',
                        tenantCode: '4vw46zg0r7f6s5293pevuezqxbf5o6eejn4wkxua8sbeiv5ip5',
                        systemId: 'f07631f5-827b-457e-96cc-04e344ac8e48',
                        systemName: 'xyufb0uq8os0q7qcz0cz',
                        version: 'm492gn49hh2bbv6gyh4e',
                        scenario: 'xit4g0ms2fsg9magzs53yi23ju363gs47tyh75d9qzc1z5nnpbnlny4zy4l1',
                        party: '917r62b6ieji0k0xu0k2s626xg0ao5mrrkh5a9wdggt3bsg7ft83g0s31pkfkm7bt8tjby6czp78mjq3zhxt7esz63ydsdh0uldadsfy6z9b1pbb52hild248wpqxr00v4j2x0ycxw1hz9etkhlhodd5afpbzqz0',
                        component: '37dpv0f5svj35u0o6kft8zsmj7s6zq92ubc7zqr1ponovyzc1g4v6amtmd6avg1wxjxeo5ceqwd37h3gfxmtpmqdv27zjzy8p2f001pgzmmqvw2fxpxcmm1ot0qpdjs7p1ank8s2dn4nuaxxw3zdibumz4in6nuj',
                        interfaceName: 'y8k76cr8ke2yuks355sbty99e9rryq5elww7vgg6pt745xqouc2di2mn6f27h9dbiyjem8vevylaj8du80n1f0bt9r4k975rq4x7jnt6w0xv6ywpd5mxdiphtfueznqrl7gzmedxmvqib4bk0w1o569ersce9e6l',
                        interfaceNamespace: '6ad1peecm8zkil3vrumh390o2qgu6x4nnv1p0rr9ki9txbgvis76ak769h3mpq9jigs9tqm8ont4zkixnlupqcava9d7qppak73aol9srjn1gtav49z71glfw9xjp71jdchzxrij2hql1kebooxddcsgu7qf7law',
                        iflowName: 'itxfreclezvpbeuvrrl2n2qcita9811jx7rjo0cil5923emr8wu0nxtxizn1suy8n2wte5xvorlpcdvmuagrhldxtu4yoscpfjggebeaad6nmd961xiz6rmnq4254vv0g8za9gh0vw7h4jdn4q7rdqc43y1pxz51',
                        responsibleUserAccount: 'n074xpiquoalpe0dxde5',
                        lastChangeUserAccount: '1vz6ux0kc8sn0zy3ampj',
                        lastChangedAt: '2020-07-29 10:46:18',
                        folderPath: '7gqmhjxmdspbmkl73w9y89agz115tw65naap56ujp2yu5xuno0rc0po92z5phhe1rxbyhxnycjurewmy6f8e419m3tiwfisx9a45ebbe84grwdy3njd0lpwvq70w6chcg9i7m105o2ojh4nf5hd8s7nfcitwi0d9ad9y0cel1efql8jwkcvme0aiyjhepswxnvbozh3tooeek8xuxxmocd7z55qbvduxekmhfclow3qcnfn8q1cji4v4fv9hefy',
                        description: '1d7bcrt3l8x4l5s09pu57woltrv6kg3c2qqujidmb8t0zdkww1xvhu1ka04vc92ps5abn60ibjls89cqt3ajl3sqke4lo43nz4j1f46h35etsg12oisg282i9nos9otv694fsxx3wzf35e6kl9mi0na29hsaf0cn4cpitzcgia4xzxtw3jwa1qcussro9y6o00awulczs7qb8cqc00udcq4adbusfhplvogu0cep8v69i17jsqpfqikup3hmxhi',
                        application: '29ozhi7sb1zrtg1fsachp6sdjjh0ktfm49zo5cmg5d93w4z1v2xqg29spcyw',
                        isCritical: true,
                        isComplex: false,
                        fieldGroupId: '268343f3-70ac-4874-89df-aa7bc1d198c0',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateFlow.id).toStrictEqual('9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b');
            });
    });

    test(`/GraphQL bplusItSappiDeleteFlowById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteFlowById (id:$id)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'ea254b24-b784-4494-bc7d-d43b22e0c7ee'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiDeleteFlowById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteFlowById (id:$id)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteFlowById.id).toStrictEqual('9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});