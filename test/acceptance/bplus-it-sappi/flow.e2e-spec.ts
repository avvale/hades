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

describe('flow', () => 
{
    let app: INestApplication;
    let repository: MockFlowRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
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

    it(`/REST:POST bplus-it-sappi/flow - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: 'c13e8197-55c4-4a60-b7d3-5061e48f7a56',
                systemId: '6334b1ff-77ac-4635-b471-fbe50e95e21d',
                systemName: '3ve0ereyy8mng2ckhm76',
                scenario: '10v9tpwqjkb2swdsi4gt9xjorls87ew61eyg3zbfwvg28dxai8z7sh8yiknx',
                party: 'ezujxvpn6ngc0m9y30exjgom44wpm2i5yn7qy7tomxjzv1fm65jef6s41waf6qm6wrs6uu6w5bv8b2lx0hsle0m2cpdyli83sfymt21wmilbeh40pcklg6xxixc9mfg5rwrlmaeqtenrtt3zwujlut3irnjbcv5g',
                component: 'jxvweg0plvoxc7xfhs72znm12qbtp2zes32vypgpa0gfrkdq8zwslx3agxvkddsv1iij109cvvv23kn0tq1loeg43l3zw97gwre9zo0j9pbsnhqvrp9hhfb46s94019h2pr0gsqw0dsqk5dl1svz06pov64hy86n',
                interfaceName: 'jwhc29uk8ybm9lvui9sgfw3z370we0c3rrfu6hfc17ys3w6ni8r1qu8zfqswx2nkcjjnw0stqphz9d3l7l5dgr7hx862ah2wmlf2y6wwa229dy7u8ymrovjosufbjwukqq5a9qb1ghu56d63bi5j7cavxh6hmekp',
                interfaceNamespace: 'ro306yx9bqlvukkgyxkx7a6dvzd4q2q105krcsagrp1auusn3loz8xu7vyaezpzrisrpjmernwqjufsc14q3gzctg1w5obdbq9o8bv57tu5xry52ncyfwc7sejv6dfu9q4pe9y539vyyh0ns8h09dlsijlpfgefo',
                iflowName: '01ghjzdr03fzfdje8i0tc8ujhm05cjqfji2y3l4cazxu66v4aqzypwkmjob5qs601460hebumcxlpm0jj1ws2njufdb83mszg4inojgw54u0iz8qseaqlcqyrerb4om54ody1y3og7jd57p4166pajws84de4nou',
                responsibleUserAccount: 'e0eumk2w3vwkepyri04e',
                lastChangeUserAccount: 'ffm48oj3tnfjjrabpz2y',
                lastChangedAt: '2020-07-16 05:44:59',
                folderPath: '1iluocb2pvd5j3u5d2lqd0hn4xy4seqo85tq2l864hau8sd4q36wvaq5echd7sr6ltup2dscxclk2jurgfimerqxr0hn9ricah3wfunp6p7ya145429s7qd1cyip8naqm5wg9cwuft0l3lq0v2m30dk17ybskkr3qkeqv4x5kyjynry70nkl58cb647ksf99hlk5zgxoqpb1nvfu7x6wjyyi51foisg2m807a6bmzioflh0qe690p0zx9jqgum6',
                description: 'o3syl0m4qawgr0ivj4sxfnh32npo1rfjvi2isdcfzao0kzz7okyqywuecerkrd3wap2syl3xfvuab0ovk2rzfa86snudqsbynk49072xzjsr7tqxgyxs350f8m3nvglv3yr83acr43e492mn2n6osdf52hszme6xqrwucmxdla1giucmxblon8yy1qy5c8g1gnhw5hx12r80m1lvd9v0ltir0rb3k8k0alsxcp6u0o22l92dcnpq3xeleopssvc',
                application: 'we5bzix7dnabe7ikic1s0gj7wyg68vlvu03isvkbolpwylgmc89bfkdgamvp',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'eb72687d-b23d-43f2-af77-153dbbb6f19d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: 'c13e8197-55c4-4a60-b7d3-5061e48f7a56',
                systemId: '6334b1ff-77ac-4635-b471-fbe50e95e21d',
                systemName: '3ujds6i14jpnvu9qiwsf',
                scenario: 'n0yy0dxjv4lki0jdhfd5plm2fdm4ab4ouizcsjeyylxggl3mgwyi3bdtdaim',
                party: 're2pxzdbt8npyazypivg3omwcf563w6ud0yshpzava23yxg2yvivgl6ae053ppl940iup8pzz7934ct4fwou8ke53b0mx3g6jmn7mni5kll68zg9gn0u146jep46dzdodwgovhd9wovqn34pclbklyeoethbc252',
                component: 'rv31wtl7mx848ww094x40iqlojsohimvlvwlc69c2otxx522cw0ln9yl4e15xacnlxntnscji6fksl8xb7j1by3r6thogvp5ryrt8yj9c0icbvkgnw7ehom3wu6qcndvi803jg2r4kyew6zhwfk8lb8nmmt9dk0o',
                interfaceName: 'su8uglxqmohnzzcol8v0umj3r1894fgw4c6wjtvm386mksk4v1ewupo2p75pzv2adl6dwq0udpmngbder3rwhh2xe7s79bppec2zk7kvqe04uam3x03pgjutrrg6cgs5jeqhkvs1vf30nw0hrlo9yci9o7tmi5w8',
                interfaceNamespace: '6zbg08pfbf6l7i3l47rkzol308l0ts753gz9bj44y9i1sgo5qfn5aqzfgzrcvotahj6v422bpbb3i9lhd8j2dc7xt5baoqh0moug2uukcoe07ae2i5spfkdcgjb8xat412rx0tny2jjkwra7ndyaphh95ln8z8r1',
                iflowName: 'jrdy40d8wl306v7w4shjrea91h8lbr7vkfxa7krk34v6m5w8kysre5ew9mmkl3svnzyr89oks07mhfz7628l5dwcqxmexbauehjdd2xf9w2pk683as2zjp5esxlhs9um3cci9krik8o256qa2wd7z1ahvz0ql80m',
                responsibleUserAccount: 'pu417ax3s1maosd2ss1p',
                lastChangeUserAccount: 'kmsg5stc28eea51kzvt1',
                lastChangedAt: '2020-07-16 10:21:56',
                folderPath: 'jtmw724bwb1wvvbpjtkt0l797sbewf1c9wcrj9ad81knj3n7u1z2jgy1nh9a8rf6636nhlqsfgx1ngy0tptqh8hw97kxe09y7wmw9qy1ijfcuzmhgaaekegbwnftlo8m92fi4fbyhz1ishjzomm0ldgtu7mxk5xghsyci3w5kvlh7ihfok2xtvzebvnjf4xho23a1pipobzkm1khy8xq6m27phu53jso7aurpqbn1bk51m5p0aofxpslhmapgy5',
                description: 'm7ezyxqvcu7ylpy1h96d43g2ao2gc2c9tp04ov8cmntgymrmc1ckouuz4xcftdzzyu75zffwodl7x6str3pnmqdh2u5h9e3qtyo4r0lfldwb5ito51tpvbva9v1083fk6lazc63x12h45zet1wkq38isg24dn9o55fe0pzfw2ugqbh7vyzunoio3izp2vjon2rfcrn1lenskkf9a87r114w8c68o92hyuqbaaqto7cphvg8yo4njo1hudoxcccv',
                application: '2lw74rg30k2psawpj66rlnaorn8n8xlqub2b9gq3s7go5wisyygj9epk7aj0',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'eb72687d-b23d-43f2-af77-153dbbb6f19d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '7370121f-7db7-4db1-8d18-f949b51bebe3',
                tenantId: null,
                systemId: '6334b1ff-77ac-4635-b471-fbe50e95e21d',
                systemName: 'm15pyzmmt28p3n4p8jhf',
                scenario: '2m0p0387g2yda7zd9lrpfwxs1vymqcg9nbi7hr58wwykni29f1x7nvyr75gz',
                party: 'aduagfu424bssgk2jcwfr5f6clfx1ny2cy3pga75viar6jzz77aq4me0jfiv8hm0awy3lmp2ejvw8xninkme0s019f7ff0aem8egfb6tizr40w1mp6g31pb9zl0s0a6j8y3kk664w2zq58enxbu24yef32zngw5z',
                component: 'jmpjr89yvqhymxfsyejibbytdypevwar6vjkl9bd00ylpb9989agxbbm3avee22reuw7iwgb59icepr1vz8xxytv2r2tcjrn7llw86tjf701ubop2fcxkxbuicle3t7307wu54rqnt1gt1so7y66xaefik4w0vmc',
                interfaceName: 'w3b0wlx0uzsoels4t2gmnam2xqz8ag78bwju5ctrlezgim13pnw95971bpthijc6wjq5gjhp77uipx7tyt9swcj28wwczn2bhshde9todpeqzj53lwayvq1mftav7m46r3ew9pcyp2e7mkeh4qf7lputnl3nfzip',
                interfaceNamespace: 'rq763wap28bc1m5bie4c0zk9vkewwsn5s4f1uz315z8inoaqhtgp3eti8mzebzq5b04y1g12cf0w0dp2u1p82sdpqw36yjs40pgb3aukmymvslkre8ru22nhp9ay60xugmkimvulx1zj6qxkl7gpgkzbndk98v1p',
                iflowName: 'dgke6s9rg2p8rebo00ojvcf1135z9i1x4doyi5d3a9eje7edjg0yt4ra05mgio9j00ha2fvxnjvy6nbr6dfgwne8oxbivj04jahopfban7py6h582on5sllcyib3sw9ucqmw3prjxphqkqo2o5jd4nvh14oz9tnz',
                responsibleUserAccount: 'fwj1kxhh6udgiu5ga9z4',
                lastChangeUserAccount: 'tlniqgsjrvkv6pb8rdum',
                lastChangedAt: '2020-07-16 12:25:04',
                folderPath: 'qgt41ycshsjvk3wstpgw4pxbqp75n30khf9jf4945qk2i2p0n2v4xvsuxd69ic4ncjzndzxrlnw73a7yti9gpil8oezn8gkwmli3x66prqfk7zng47og9ex0xq6acnhg8as6aesweh4abqnkn5i3s5vw4a4vld1l89d8128bvq4u1ftpfc4ft96qxflt0vu27d89264yrs7575loq51g7z9oajs58rw2a89uscwie8fyz3e00qg0rjtz7ffybe1',
                description: 'po5l5jlv64x03zkv5i18qpwpxpqm36tuvu13f34jj229jakd4396580qzf3ie0ex8zdi26rrq3uji0tta1igwsldnpjyqxkpuimslhzwxjnt3xm303qgr3ibxrzxakqm1ay67nvbnufqpd0v4xqt9mxq8tqalv0o48sstr6ighz25fk5gssgnrzkyiylm9838iyb5hqr6vnwov25ml2czxlxxmeb26653uqd0q3lol8ly69a6n7nfdp4m6ynagp',
                application: 'xznjt2s88galodk509nb3jf6zrjopypdzokl2zbmmif7cthg2cxfk1e4i5fu',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'eb72687d-b23d-43f2-af77-153dbbb6f19d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '7370121f-7db7-4db1-8d18-f949b51bebe3',
                
                systemId: '6334b1ff-77ac-4635-b471-fbe50e95e21d',
                systemName: 'n53yip5uw90k753sbd7k',
                scenario: '9omatz0vh4ajhhc7ljd5otygisa4f5ivnzhzpl1mz2hoqgoefdlhyko2u072',
                party: 'z22l471z1421qh5ws4bxej9q16zya7lrank66xpfc7us0fggp0yrieupgin6m68qxwxdzvznig0p9kaw5mr9yujz4icknjzhrqyzgv9rgk7blhmuc4imultbbxi0dgxt5mzcpe6tpcw83wvaaizvbm79hf74eqx0',
                component: 'd48l9d7fxxff72nhokp6w9zouekhw4q9s7ydjj0txv4p1k3uikm5rzy9bgnnjocx39vovkq3x8vtmxafahh0rl42e1ob2eykbqhh4t3fl6n4r6if0uq01evuqzxox5iqlwfzma4umti660x5y86riv1ctqcenkig',
                interfaceName: 'kor2m1iji1i5yqyxg8b4wt7cwh0bckrq14e9ofc48cas57saobggsr5b1ex05pep8op2p4941tdpygso8sjqyic5vg2k5ovpiw61tp9x63j1wg6rxdu6hspbomhfdmz13skulcun7h4ae827zesoi9ycb3rovj0g',
                interfaceNamespace: 'y2ctvoxb70w5xs0lo02rj6l8l1poeb67b5o9oliufrr8pmp6f6x9lb9g018oullf00tz9uzho8iaulhuv33p076r96k6ex2j36xpyxgr0zgoeqj9ss0a4m77xuxbrpt6m6dlwqu3dt56tjaj29lo4vo17931vqnp',
                iflowName: '9eg1e0fq6iptrw8mnhta1735v7qfznzjpqy6f8mctug6kehmtyaqddt6cglmtb5yskclwukfqetnc1qx42ly39jr4s8wzib60nfv3gbndcchdxw2pkt6e18c2mwj4apjybdadi5vtjj9h182eddlyr6fzu4f4j1e',
                responsibleUserAccount: 'iick4ls2gebucj0zbs06',
                lastChangeUserAccount: '87vlj1569992xhgztpms',
                lastChangedAt: '2020-07-16 04:01:57',
                folderPath: 'vnoxxk2efqc58yydlr3nfu7t2t46cce2bxyua3h8cr4oofme9g5ezdml6ix8mmwfqw2pu8cvu3coawif6zoc6403navf0345tvfiqnqb44jo5h7yrqqsp8ekcfji4rh12jq1nqt619xgvkbj3f405yvnlpbrbxhv39ccrarq13uw85rg3uxv1mni0so4pq7ymk169g6g1k3ylr4xzbfs15luume1hzlmidyx3nzdvo7hllfglg07dqzy862tfcc',
                description: '5j132ct3l37g8yrlmo4be6klu7pgcfovpvey5vfk09g5xrzjwd3xwbmhaoxjaa3uz93jp1lqx6rv5k90ei744yth23qqpqu6ip6bis0tix8xclb4b1f2bgdaoqum9pzw5bbogxj17eevfsksrqw6cl5099rbifj080luxfr3hicrdbipt6r7ozep9gkxaosjde5n6g67hxii0j1e0g94bkt7q79pb2jo53h6llj8kidljdgtft5qde6f94zdqxf',
                application: 'qk2b6f2d0ol2pz3ij3zglc84h2is6rpkmpgwgp2m2iksmb3y6l4cy0a4m5y3',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'eb72687d-b23d-43f2-af77-153dbbb6f19d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '7370121f-7db7-4db1-8d18-f949b51bebe3',
                tenantId: 'c13e8197-55c4-4a60-b7d3-5061e48f7a56',
                systemId: null,
                systemName: 'k81zgebd67aym9rbypf5',
                scenario: 'qi0t70z1y86x7cy76ei46yzfgqosynz05xi8u2x5d3s9t5gyt6z8039d2gj9',
                party: 'dmbuhnxphcaioog0g4t7fpbffzdh88gjt1v8zi6ipnp9fwmay23uo0w5bn77ebt5mxl10nbz1h7vg5y29b4yiqjv5d0d2zpad6xu7qsq4q9grucw4kchvl5kioutsz683bhccqi7ll2hnkti7q673e3hncnu9yio',
                component: 'cfvybki4sx6ubh2gbz84v8khbrxj6txsdkimdhixroyf1sqeuzk0ky5m6a4i31diynk4mfynhmxou74syt9q9u6io9wic75mtwz813q4yo9h1liemwya45hnx24bx263hpe37r8njgyj7ltlgx67kqqc7zfo20cj',
                interfaceName: '38yj511al8anr3qks0ffc3tpuxvoge276usbrpat15x4r021jnd6bp7q4ojyzuo3h47avvvc419ssizqfvx6yjbyeuw0tawiyfgqahdnt7okrkoj9qmy196ikkv1jsb8fpo85dla6jykqwk4trpobmidllzxvpkw',
                interfaceNamespace: 'uo2gj9w6yxkbhjwv6idg7j8b6purl0olk2zmpez64zbv17fubqw4vz7gpn4cyd9fhhptdce2crn6iufmvnegnrz9ntritnpgqcqkp6xfzlqp9kmdrmnu2ohxwoy3hxul2a9ajorst5m583jpsz0md0z0hnayeezg',
                iflowName: 'cl6a3kmklcd8pe4g14wxas5p65yatxi0vwvbcaey7srfh2emc0r0okc9m98usirfygncwuk469zoidtmsv9oryfnurveykie1057vvv40bx9aw1eg4l66tlp2bl9ykvc5kijhn3y18r5em8a5mia5x3r27su3t1b',
                responsibleUserAccount: 'utrft66leq83hkrsinqx',
                lastChangeUserAccount: 'n637gg84v4mgp0t0o3g8',
                lastChangedAt: '2020-07-16 12:27:27',
                folderPath: 'pdixvg9ep1i5cw8fwffuoaqlsgggxxdbm7mai2sa9f19gobklozvors2z5vu6i1y7yf8y8iskcttt6ezskk1nwlcviuwxep0gdlqpvug5vlyx50rydlx0l8378hputb76iv8te9s0eulyhgy2jyugm9lcfqnon1id07oglfz947hwp2l8teqpmnw1artj5jvd19grxvf1j6r02a3moosufcmdljm5jri44pai9h8ar36gh9yxz8xwo01v8vwhr2',
                description: 'ancckkv8rss4zgmr6zsojuwty10kxp54u2lembef8zl5s2c0fs4w7d3sp7dl455vga2pn6i0ckwjo7cwyzt3hdzwfxadnhmjbvfpa74eq2lbpdjhvmmtz3gebd321vl7zrm9b34hkwg9hl5g2a9los2cbgfzy70g6wmhg6cmyhrmi8jepf1j8phffbb0naaouhmnc0eecm8nhxxww87v27ofkgxstvhg7ysmxh9q1lq1tbyj4ahs7j4tw45t71r',
                application: 'z6dw9tacu5qmg3heka3okrul9ax25qszianyv39qr3g2auw14ypd6et6wkdi',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'eb72687d-b23d-43f2-af77-153dbbb6f19d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '7370121f-7db7-4db1-8d18-f949b51bebe3',
                tenantId: 'c13e8197-55c4-4a60-b7d3-5061e48f7a56',
                
                systemName: 'tmd2ag5xl428zot8yx1n',
                scenario: 'do52l3g2ktckpjpnlcn5ekz2mufyiatk79hu9a8nsyox6vly3qua30bqdbe0',
                party: 'biugk5xy3cpxd4rkqaujjvg02dgu98tav2v5k710tkekq8699uilxnp3n6f83606bu1jdbul72k7nqukgfnnka5unl24jtn4h3qbfx93cmfxcqfqybamv7hk22nalf2crn9n1h6mdc5qmooszvcgzphamfqyjpii',
                component: 'wa2ijnqw9xqkyibijroumxbrga8591bh21xvyniaxaaav7i83py9q8d2y5vmbzuon09nzo1gmegw2f1sqk4tuazjvn967jpe5g6a0i811jwzqq1uhfn5lj88gdfk55m1uvo9mlyy4ebfefid7qknt5w7miqbdpvz',
                interfaceName: 'vubpwc08rh2qclnsmia5v0fn2sa3ynexwud9rs46cdfe7t3xoud51mhr72y61s7xi8vfx2mi354ty3cdzqs8g349f3jmiep7mslrb32ytv2rwnw77kq5lsow6dslqvap0cn3bsa6rdeecasc21ztk6izbgvudqwy',
                interfaceNamespace: 'u5ogcssoc8p5ibkobxomy65ornhta3o40zr8k9zjpfptwqp7urghnlfj060eq0ucebeetpd5185m82omsg3komxs2lk8puftfjy2alan3uo4eptb6807h4dkzkg0xswu05j74phb0zfmss7xf6q668xl217plk5e',
                iflowName: 'ki9ioj3kio5riuly74jb9mqrqsnsz3tv6bymnp98a9jd8hh43w3xsi2a8lw0nkr33mni4iou5nehqn7tw4365g2l6323tbn2y4o9agaqf47h2js70aa5wcdm1k72gsmbqdtyxbj6szvlllf3ox1ggx8y76dyfrg8',
                responsibleUserAccount: '4ejkz5q6uuxmujhwrwgy',
                lastChangeUserAccount: 'h3zckvky9dmfobivyh2m',
                lastChangedAt: '2020-07-16 00:11:32',
                folderPath: '2bj9juixfvgfxq8u2kwhzv1dpb0fhl5jfnudt1x8ttsxyqha12xuu5tl6a1fjgezxbt1mramkke5zkw9w6wvyhkocwa3x3w7hejd2l83qc7bv8p2668hzc27vuvgtxgqlfkqy5lspj5sa90x3y46dj95kxqmzprdiy0z41n552vvscxl7spvokngwydx6lm33fwponsbhbfrsczhm8vxr94ipv152eias1gz5lpjo1lp9zdxipdsi2q1g3ib8dg',
                description: 'j5n2ua83ec0gy9nyvgsuiz20w6fh6algc47i93v5zj8ujxpavsu5eggapfgvjct6cxdmk7mzm2dw7pki7347q78mrvfb0lvv4gs9npbvlvzvdici7odajsnweuhshdaqw0edk5igss90r64ynvp8esj3wpmwnxeotagdreoulfo53gj4fbiuq4fp79j62b11f4m8g2giitu0p8bjuawfohsygvdjbe29ciayg830364vyijlxfq1dnrxy504f0n',
                application: 'pvrn6i6qrqxsr8m38olqp0b9ne7e1i15wwolhing6g3wbt0mni4yu2qv2g04',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'eb72687d-b23d-43f2-af77-153dbbb6f19d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '7370121f-7db7-4db1-8d18-f949b51bebe3',
                tenantId: 'c13e8197-55c4-4a60-b7d3-5061e48f7a56',
                systemId: '6334b1ff-77ac-4635-b471-fbe50e95e21d',
                systemName: null,
                scenario: 'wbg34fvhuc8b0aga2u29znaey2h8npru6yk35ktv929b9qjndhddmjzdp8jj',
                party: 'ducoxsocwq8x45g3j79picp5dm66ogz3qm55z9ddaa1lk6us89ahmlqmgntpuf6dowmb0h3tc7zw9mz6g5ql2mxv6rh57zsvv9ked2tndnotgwrds6lbqdgqa487m2tcnf271bklzgvdrgx1zwlv55bgotclpw0n',
                component: 'b1v2va04fggkiwn1dx2ejrtolfduma4xcocmlnzywzjot26ykebc65k5n38eymcwz4z8dsle1wh1wa17sz7usi970cntl9s93evibi7fqltdxbhwk44mz2typeca225xu7jiyc7nrpkl7vm26q0qpdw4z3699qz4',
                interfaceName: '68n82jfnfhr97yqo5ocatx1tlx9bv34gumznsboxvjbndipjo2nhabe7e3ceh25xmt41eewsbepmyphxprb4kuh32uk3ysz1t3jx3xtduq5gaqd43j2wdobbpcjgdlhvxlymrv5vwkjavpzjkq0po55lmhzhklvs',
                interfaceNamespace: 'f8clao3zwhizcohr9xq3fjsg4jpbmuaesgm8j45cb223nqvdp4twsg6zd2hbjakbk65ptdm2xxzwc2hmpvahz9dqyknzg8xjbalhv4clwy16qbumzkozo1umi6syztc8h3usmpri5b4ke5h74a8mv5mn5p0vcfdl',
                iflowName: 's8l45q18tzyshntfmmh9xho0r6ohgivn3bn9tgrry7i505gc0xniketyio7ab1iixa0ylntb3mhzuzhc8ex8591mq77kaif01yk1nci17c9gl9weyfcp9rzt58iqvxo6jumdvaes4uczlr681hy4ebo4pk5tdq33',
                responsibleUserAccount: 'oj6s3856qvo4wo14ptvu',
                lastChangeUserAccount: 'pxjp8ejtrznkym3pauiu',
                lastChangedAt: '2020-07-16 08:27:55',
                folderPath: 'c8w8eaiwsfr6ogeoiec53ktnjlcu6jnd77upz0suqwi3h0qyipo7vrnvpblwkkpos1qj3bg7zvkuhlngxzjqobvv7v7gddnoj84pw8qxe0n918w7nwg9z4cz8b4okd2xl70x0ox0m91dt62hbdk80sc0jvnsv0dw7q5gwo1d1rwuwmqr4u8w304mpqwuo42ehhubetiywpvyads9ptj1zfe1klnq3tnvy6svipudnq80iue74w33fw0w05ahnid',
                description: 'pbdp65vykrzv7ra91gylhaxdfn9riq9gwjoyc6q4fmr6vprry0nwy2w0pui7f7ypql4tgvkc4ip56u4fbh3pmf2tn2jwjtuzwm6pnbalottwnd176qtgrnyggbyutfdjpjugnrqsv5udpqay8hk5v1orkowzz4sn9a2awirm4x5948z5d183kun7fdrus5pn97cvi78g1curqd6o8oqe5lc9634h4aboe3ovm9ex19gnm8bz21arbhdrh45z281',
                application: 'y5ggyutjhrmb1s8ymg8a6cx3qhtfilezxlcrbvgqgifj4j2ppc47aq0bj43z',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'eb72687d-b23d-43f2-af77-153dbbb6f19d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '7370121f-7db7-4db1-8d18-f949b51bebe3',
                tenantId: 'c13e8197-55c4-4a60-b7d3-5061e48f7a56',
                systemId: '6334b1ff-77ac-4635-b471-fbe50e95e21d',
                
                scenario: 'j9ovfx2nvd0r9ssl0de8d9jjdb78w7l2t2930srf466c923yuie60y68ugpu',
                party: 'sfzq7gk4z8k5fqpufx7iw70aq1dk6r54b1kpsbjv8dzj799t9badopelij8p4ox3lfxmaxh16a6v75oefc3nc1isj3t9mfjpgbuxs7uwvprb689ozjkjy8fwn5m49y9r1fc76k340vlp256jde76u961ht5u2nnx',
                component: 'mnmwh9mmhiqbr0u5h96a0rb7txixrf60ydn151eiqu1lv0rkmg48jpb1ak80fem0gfvmdiytoln3mrvjmj5ikva26i06yqeyecz2wqrkcx33i4gs6hhs28f75plvlsgu7keb32bpd4dsdl3z5yxhxs9k99hsc97g',
                interfaceName: '4b8dhqqp0giqi06gfowwi53dc7k1m8mpmtpykcngxfmo00psuwbihi0zhqy6bea6i0oshzf1urwr8ocpfpngmh4i0gfu0elepa8i3yivj3dfqn4sxvnastz1ctmxjrsmeqgjvefm2lr4jhep6fjml7ipkvydviuv',
                interfaceNamespace: 't3l9svvwoqprcrzc7zuq4zstw6fsyp6fc3c0pvsshag6gdaohvfnbri5fkn4z58kwiybw9omiu114ygqs3853zpgmti37t6abh33mfsv5q0rvhi68eicdfle180crbrou3fe7k13vcmrsox5q4hcjpso5q1w0lkx',
                iflowName: 'sj6kluatnc8hneejsyeyzinx0xslnbnss2hsxymq36hfyi0qma7zu3cz1zg2fgm96379jk5i3hinp9yzh704xpwjm8qoi8n46w86uf4wapsfskmg0cn2f8u2y8wai1pxgdahbqk2c2cbtltw9adpy6r0d7q8a4i9',
                responsibleUserAccount: 'j9w2o7anihr0lewz3zkg',
                lastChangeUserAccount: '9zvz030c7kg2ib8yln9y',
                lastChangedAt: '2020-07-16 10:47:52',
                folderPath: 'ws851yzytvybmw4uoe679laknmbokmcn2npzwvnkdv5y72jg0y8i5qtbmwfxm5tikzxxx29rcv79vym8335tvwz6ituxwsxlww8xer7rguzvk0yskcxk7ckwoqqeoh2a77ovlclpx6g1x9p4fh60k4yyfzj6f6qnfxag64c48d5kq301mb8atoijpmdzz9waxvtiy5abvt7mhap8ntehlj577qseoztirdi72s71c7g6f3r0fmn322i0yb1cnyz',
                description: 'l0eu3t913rlvm3x37an93hsb9mfi29ukmf2w7s26vtp8yo4ga8oknalrwwq65cyxswlksslchhmwoy4gen2ysjt03ea63ikrsys78d42yvq1wsxfoe7ag8gwq0a8t0mfzos73b5d731gupwhzipomiva1eqnsgy0ow7lu4sas476kk2ngntz1vy9j55n932v5atep4gk3a8wzo1490txgk95cbjrspbby7077s0al1bdke4y8bfehg64tkhq3tc',
                application: '9cf26rdncosrdn45otk8mrfebs32h8hz2bd23sj9u4b4rjqe0q4b9jjo8dw2',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'eb72687d-b23d-43f2-af77-153dbbb6f19d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowScenario property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '7370121f-7db7-4db1-8d18-f949b51bebe3',
                tenantId: 'c13e8197-55c4-4a60-b7d3-5061e48f7a56',
                systemId: '6334b1ff-77ac-4635-b471-fbe50e95e21d',
                systemName: 'pfghbj53u5otajvjrg5y',
                scenario: null,
                party: 'yjxp4hyr1ftt6hcter0fvtcmecfu9izyj4tsz1l8tpanxfutseqkxgtrgkq4i5dimtrjnlskceedbb4e2uvzr2jeg6yxxtk094x1qeggb4k9ocvqomnso4wbpakncxxizucmepbiakdt8lorej4jakcam2rxj43g',
                component: 'lzis3ci3x890koo9k3xgdbb8qo4acxfjihha24gwylac74fd3qlr29yoks5vjw7awby06xnms2tnncxz9etnuelde64g2yhfukomwmu1ubt82dtachy9vaccdt8k92payq7vchxppzrncxjhtlq7t8hwxglw0rhw',
                interfaceName: 'zd28b0ln7xlfbog9p1rkxsz7xr4dweb2ftl9eo0uhd8ecupcvk4g519l7zdft6c2se7t9mo9obbpj1q8fm0lwl9pec3s4fmzqym10587qqqhhgb9h9hcaxzpw2vr9khwuqsxzqrtyuhow07nwk3yq46w40531043',
                interfaceNamespace: 'jm41my6zrkozggajp5fnnflsp7y8nfj1zfoi2rutcxwhnu6eeu029p0k446aqt1jnkunkiohak5imour7quwl18qmnfu1lxzhfry4uec0awscgpj0eb17ros3f7o3dnxhlcex9zx54yfqot2sacwjk2vl4sbw9cg',
                iflowName: '7y0k6rnh83pjvt9mjcrtefgs89r2jzrowkofo0jp913lhorhaqfwu85s4g12f28d7gk06zwhjge4g7dr8zghg31h0molxcgf83zr46z7jtwmevj2sgiz0p48oyxrwlgb6y38ka4cquwdc1vlf9i8cpdh9zyry16h',
                responsibleUserAccount: '49i7s87bt0dt7pluxmgw',
                lastChangeUserAccount: 'p9lrcp1l3rjtc6s9wbir',
                lastChangedAt: '2020-07-15 22:25:32',
                folderPath: 'ry6i9ciw1glqbd6oh0yauvj94jrts2qo5di835c9ryyu40wbbrw2htsnei0teim58y9x2nm5bdig5j2wy0bddvlw03omtq4jtyamrqfeftrz45idh51x720p1ttsfb27sh8eyewyy23l3lfbeobt7c0qb5x6288dy5p061zrxth2uz1dta8qdxn0kbuqbspijvnulxcfuayywcm0s0hqf0xct30vlzfhhbszm9075n64v8kkx6nqe7hdg1gyfw5',
                description: 'qt8mmcwwvb2jfnjscdvr72ah2ja651iljcr68a0yr80uk7jdj1xihg6vbi3gyyeobgaukjd6wt851k0s7vtrxrasmv6oecja8il7nxi98eaiyurlmxqkfn7vxww1bi7re7ccmy924yjq6v24axwyohuc0va3yxl4xk5i79vfcs0d6s65sbs90qw18vhwhdn7ri4yremoy4ringex508x4juvzs8rank40wh02w5220hh4w374j0ji1lvlbjuzui',
                application: '30jkl1zhgdxf4yy15l3l9y8t18vci8niu3c5x3oopf83vspvojf9bnukadrk',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'eb72687d-b23d-43f2-af77-153dbbb6f19d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowScenario must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowScenario property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '7370121f-7db7-4db1-8d18-f949b51bebe3',
                tenantId: 'c13e8197-55c4-4a60-b7d3-5061e48f7a56',
                systemId: '6334b1ff-77ac-4635-b471-fbe50e95e21d',
                systemName: 'zp0qu7axg9r89y6royd6',
                
                party: 'awzn7b1738bdypky91tzfvmzx4o3ewdgm8gwx53vehnxdtftoxorgghgeni0s9rulkyjwj36hjw1edlhcfgh354a94rhogb694x9mbo0vh2yqb0bcnntyq9khaveq6xrruav59mly17gtbg0o3ezhpn0h6wxzash',
                component: 'm7jxgr9w48uu223op1llwemsqmsu2f50vtgbs0q0lsv5nehy02uqy75e77q6mbb9aruk249gw5g3wncq3pbdorukzjblw4hxgid2kx8p5zleodhzvhqgqygxqo2rk38m0g5up27w1tr3mm5xf8pdnn5d6xwy17rq',
                interfaceName: 'aazkq8g75dj1m7kfs4ilkrlkppdtpyy5gedt96c781w7fizrrxddj1lahwflr7urq4rbqg5tvf64e8sbc1zpi6k3m9b88m15vbpoo6u8w1dr84c08kza7spmgg7ot1wysag1k66hpv22lrc7a33la0qf95xktzx9',
                interfaceNamespace: 'ez7y4iy2ej6yqz4vhh9jlntulocco9u2ahfifs5l3aqb2xms15s5953rskslkrnnx7cbkhyxh3ys3fnxwhbv94fa9xpl9nwfoed1kflsait8m89qvbcztnxq2i62y9fc7zaewr8kznf9osf8rejdur5mdd0husne',
                iflowName: 'xzunsyhgy2wfswskktxzurq3zb55xhkoztgytylxc00wlqdyqew6m1tmupy22mf58l26bleqhqrtrwt18v5setl6dgqphwcr0wsonmwichr1h3g6h70bpkebw8r1muurfnpk7dzfbzxk10yb2ee7d82ceugyqzy5',
                responsibleUserAccount: '11cgn62w3yy55704zmd0',
                lastChangeUserAccount: 'w5m6roe7yyydzm3gm0ov',
                lastChangedAt: '2020-07-16 13:04:14',
                folderPath: 'wr7s2gcyn4mq28kxj4zwyrblad2vi53elttrf571mdtrhyptiq6vudppm06mjiorzmq1rrstworsrs4wjs078gah6tj0zw3bi8grm4yrq0iuoqwcnmusonm4lpkw6q0e4ljch1f1ff6l1ybgsrs60bywoia8e9uq0wtyh1np7o28lgoi216q99js2pvogox8y3cxamw8manmasfc8os2xjsom3g3gts8tvtddyuv3deaxceao7zgz1yutxu6ac6',
                description: 'm8ufnywhl7us5v25jvmh61ymynhypqk00hvzp3cgty6jdo5t8yebd1sxxjlw0xdmqmre44251i7flj25ncych6ysfot6hbnghmon4gnzfsqb1vq7r414i8lapib1xmypre36n3p9medc0ol70h766dh4iih558jd3e3vwf66gacufigrsddyw30ssx8qbmrynoykk21y8mh5t5thqydt03h4chk7nxz3e8z9j07hr72wmvy6m51c4mgve6uio1u',
                application: 'up4111kouj8w3k80jfmb3aljnw9vkk2k8x5tacqd7ffka0v5fg2agw0d3hxn',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'eb72687d-b23d-43f2-af77-153dbbb6f19d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowScenario must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '7370121f-7db7-4db1-8d18-f949b51bebe3',
                tenantId: 'c13e8197-55c4-4a60-b7d3-5061e48f7a56',
                systemId: '6334b1ff-77ac-4635-b471-fbe50e95e21d',
                systemName: 'w21gdftksn1jjhtpoiy3',
                scenario: 'np7r2x9dyfcgfnb1kvth3h5t5qkdp6d0pnnel3hwioi4lcxz80y3nuibr06c',
                party: 'k8ebtiu9phu2dfuzifro1gpc0v31xachdm4zqwexu58q5lh2lgketqx7ras98wz1382ind399zolpgh8kpwmzs50v1rfq3wxu2a8llkrmcxj29xapqk6r5bunsi5r90cu91mkvwveycb7ze3k5wn6vc96ha1kjar',
                component: null,
                interfaceName: 'eqt4codc3r1aawyijhf0zcgaasllavb72b7vm96y7vdqvpjw9rxabq7c5fyskzufiscb9ztgq1cqmjhe5o5nd65s246fysn83boan9meq6du99evrtiem0q3v7o6d92c7mz08qaeknkqo302duuiw4xc92oreoa8',
                interfaceNamespace: 'eq7ac59miiduy6z3im2p0awnn732zxt5oqtzv1nzdue11vgiq51426ve2ha9nbgv749sogidzlesz0gu2tzf1u2okia8f4bnl6uf81xli26k09vap6p0wbsxufzdrohdg34pr6hbn43nihurdxbvixk6fuaez6eq',
                iflowName: '2e1vlz90loqi8wuxposudn36vah6u0njcnras1t5txuxkwo533f67zinhq39729rq4rqwjyhb2sp00hkizf0wijhb1fpz0gwzkzuewni98oqbhgmb144b6ht6ls3wq7pz36cmnnz4f7opc0kj8jjz9g1gh2esn0o',
                responsibleUserAccount: '3ib2dwhl1e2jkoi4meex',
                lastChangeUserAccount: '1vafl8y1lfdky47sgqa2',
                lastChangedAt: '2020-07-15 23:26:24',
                folderPath: 'flvp0z8cmx5r9jfimq2gn4739qwar5m7mhcy2spkeeb8w8oauozqivwc0n63tsrk615ah7jswxp16goyoovc4btun6cb1p7x69c2c6qjqw16x1wo1tds4ol29xwgbasfko20eud8css43wq1p1grkx8uwnk96855tj0s5stxeflhgsfsz238c6onkkv7tc9y5cm40xlh63qnjs45r8kzi008jkmwgyuhbp7g51m77chro0uc44rsu8eluyud2zr',
                description: 'o82wyx9jsd9mdfgz0sn4w7tlpwtzy12djvl766rfiwrg9u2nlyp0bhac1ctk79vths0vbqp6k1h2odik1lpas7qnjdvtty1t0g4yb2ieu4bdr5eqyy2oapwwuvow5h06x7sl69xafuff97t4tf0p7be5ckdsxmh6bfir7atxbp78ziad9dborwc6s1kiqev3xid67zk3ytrwuszj880ygk8vb6zg2chpb84vwcxbns8txis0z4hcvsc6nbq9u19',
                application: '5192f35mn1eme9a55eailm9r7hx47fgftwz5v31nxa58r5sq7w896l58khgx',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'eb72687d-b23d-43f2-af77-153dbbb6f19d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '7370121f-7db7-4db1-8d18-f949b51bebe3',
                tenantId: 'c13e8197-55c4-4a60-b7d3-5061e48f7a56',
                systemId: '6334b1ff-77ac-4635-b471-fbe50e95e21d',
                systemName: 'om03ng26k9hnjguf8rd1',
                scenario: 'rsxf7qhsea14owbhmz2p43mcd871pcrbspd6329pxqhttnvayvi3b745yj3c',
                party: 'xzfswc464l58kor7hbbyhsuzdrkkyjeupmmh84iuesa79tku8jqbq1wpixdoh9s5y9jkuspfvzlcxnrmylsl1s2mutd2blsbcn37jhnrl0z3iboxb2240y1kqwa1t762jnp05hkwhs1q12e7abtrxdbwrk87sfrt',
                
                interfaceName: 'yruo9lue6cfmo82pz3u5c9a6mlp0iogsxlfk9lhlmt61olts5dq52ks40bjlm2r27n0ii49sy71jpr0cnatluinxsftvxqfrg7mkvslhsjf3b0b37lcncgwwfeh9lv9tlgy5ugidohgpkrhxwfu1a9gk3mw3sdkz',
                interfaceNamespace: '9rrvhvygzc5uazicmxfjdz47jjuicxcgxh2jcwmlqft0e8qqshchr7bl26u83u68f1ylr369ez0omn5jeskjmtxwqkw0d7naa713inl5krkopeuez99pyj9idiycfbt2m1f2i6idv0i5b2ecjdmqqimq7sz6reaa',
                iflowName: 'rez67gk4woqfcqfnsvjq1g7idmf4qiqsful06q5n9slh8z0nipfll9em4jtzpqjy90cfcyprmny9qw3xlot3d304ala5lok17up4d3wbjraovmba2c1m4smvzchbq403ipoqjutqeyu0k3c0p46uumy61ckvrse6',
                responsibleUserAccount: 'fhx8azoa67ck12yaindo',
                lastChangeUserAccount: 'yo3v7i0lkiuk0gg8erih',
                lastChangedAt: '2020-07-16 01:00:01',
                folderPath: '7l1axg80h90p1fe1aqh9i7ppz5u9de3nqf4krk5rw6nixbjql2c6jqzu3eb9gknyytpv70q11hp8r2pf1nvs2pd937dy11q7jirkle3701b4ywokbb7h7s39bmrqtwjo3abnkm8egyeohs1dxy2us4ftk6nfzkelpr4axi4y6bmjj67s9zzkol3i7tdu916wafeevj03u2aefpr7l6o2znqnrb5a32h1ouxv0vynuacpr7z68ookznpevun00bx',
                description: 'zjhasngre24m64qxsir8uqp7y8ydhryor34z6ocj6aqo2qz3k2ml7muvts9mo9gjrr7heaj126p3h05m7u8cpcsozthbvm2tqocs0fsb5zpk817vywhi8hngpeb3xlgv6oqy95m6mixig9bl5v5co7v2orvel3593uhv3g46lbzmmm2z3cw76203b93jc8xk4xkprb5ogrdu795myve3g7zqu7zm7uqo3jhe2zj2cqyu0v0j5lcz6nfym0j69p1',
                application: 'qnzynzex008jc9hhdy6x8uyschlh1nwq4cr3yqidlj6pj0wsugmh92ds6m93',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'eb72687d-b23d-43f2-af77-153dbbb6f19d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '7370121f-7db7-4db1-8d18-f949b51bebe3',
                tenantId: 'c13e8197-55c4-4a60-b7d3-5061e48f7a56',
                systemId: '6334b1ff-77ac-4635-b471-fbe50e95e21d',
                systemName: 'vxiunsx3968dkb5pvjss',
                scenario: '1wqa1nqlyy2e9j2em6sgge6bdkwtco7exiz87z6vqwvvyo7gd6tkrqbcam7z',
                party: 'fos33wjazv7o7qvczrn3y13aah0hlytocmom1e22ub1kdmhx1ekzv6vhj309pppgsjw6evwmo8m082lxnrlbuc9mwcw5ljq7fqhgyn1q9qdr3rzmtqf69kntrhg2s8ude6pmwny9l37aze2ng8hizkx4jco9ir00',
                component: '7vumr0ifm7p7p8oueebbk0ropcqgry4wxdu2i21vjq2n084z8wtdf2t2rrivgwv9tw3j6zudkijx59z39t6yvfuw2wmc5rcgkn5jcxgd5ahitzh65sm74m6oytdu2uv5p9ctmives61w13kqfy37sl76l85iys3d',
                interfaceName: null,
                interfaceNamespace: '6kg2npmqlltgoiwvh6uk85exwe2ydh5k6937vlegtef5jg85lcs3lnqk4f9si60vko1uzcodm2kmgvdbhg0chlxo2g9cttiexfce98ux46rhrk9w4s69zmqagf3jwv5dr16dac3x4ohauiyawj9vt9mjx8823gle',
                iflowName: 'fv37ahxc4fdrjdba758lqv1ys36vxltot82n6yhz8oigf2r3btnf5lwbm40zlmnjwdm03hrzq3t2t8id7r6k3rehc92zq0ueiwfq8t0nqgcki1x2su5gwohl0l80m9qar87pa7sa83ov8rnr3q2w4dw4y7y3mah0',
                responsibleUserAccount: 'arui8oajhejn03r3hi7u',
                lastChangeUserAccount: 'lyfn9vl3gyuhmj5aynsz',
                lastChangedAt: '2020-07-16 15:49:39',
                folderPath: '8l8bd01alvthbblkkekdcfgqw1m1mstxcpkec4rj81u4pebi03626ni10f0giu8gdp7n8bl1rm2bblhc0vtp4xark56g5pp0mxme6wlmua5cxhfo40iznclhyypgv10mo4jjrhjckfh8tjfd3horw69pqi43gidz22bresm52rcrd86iso0x1vmrzembkhaqpy8horn05lbyz9psvfis5k479e844d3wpkabmvgmomc6gsh4x8lx4na9rcnzk9l',
                description: '6bdmikqup2wk2s1gfh3jfqno5khnxgad34qpng2eexqtx7961bjfpxvtho7ov3i1mfq33i23gxzzdz8a1aumljxfzele8h5641ietv12ecgemx9axdvn39wlrz8iezq0b1h3zq3smm3hx53v5zd4vw9byiq6zmecgtdm88bl7rdeneoxy0t7nanjb7nr5sgas7tfhbfbvymqd7xq3eufjpvuvyckrgqclvtfjubrmb0u6zyicnbcvd5bs1zbkim',
                application: 'k99nbqr9qri5mzpievzzsa45qr75s4oiecmhrh84gcu1ty364jzv0hmay9m8',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'eb72687d-b23d-43f2-af77-153dbbb6f19d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '7370121f-7db7-4db1-8d18-f949b51bebe3',
                tenantId: 'c13e8197-55c4-4a60-b7d3-5061e48f7a56',
                systemId: '6334b1ff-77ac-4635-b471-fbe50e95e21d',
                systemName: 'aa0c5rkwg8t09ndt2r06',
                scenario: '820mkn6fkiwd9g7nx0je0xkbhfielda6kdwdzbl35fvvka6unlq04fb5ss5g',
                party: '3g2e84x39x6dv0xx7t3otdxhy887psmr8oeakhs7hhzly0j5xn8tvrzshs95liba6uppmc99pmmbyucwuel54jcdr5tngj2m5nmogpgf7p612gdsw6gdwkvic1f6x5r47aagc5pg9totqsxjigimtevm29elch19',
                component: 'fg84ela68iv7kr5qaiix0srgteawhvsihvd493vcfdmig1awwhiei4msasowf6897mrst47hwus7wm1rb3qnx9oku8ajk4v5kws7bf4jupuzl1pvcoifylnr54jawebc9ajntkomll7gkcehoh502y5xyo6x5ypc',
                
                interfaceNamespace: 'hryyb45zgz3rcrirxz5otbt717wffpamqpw2yottml5olbzdvydm3lbfvku19ml0vickh8khx15jfyah3gl6zcs6spzsish4c3z1ho7h8yaa3jgltounr3msf3g8szl263eczl48m1x3g8q8u4qtkvpn4c95vork',
                iflowName: '28c24nkli2mw1zsrzh8trzpedzkfjq7duo8sudtign678badk7wl3gvh980lv6lz31xebt7icd1zw9o85sha124li5byp71n0c1e3txp8124oy8ht66hz0uv19nlmt888kvrtppbtmgkscsx7cehdgsprlksgvr7',
                responsibleUserAccount: 's28r9cx62cz74v31wwxo',
                lastChangeUserAccount: 'kibj41rldj39glikbmbq',
                lastChangedAt: '2020-07-16 03:28:23',
                folderPath: 'zjw5wl2zwxr9iavmxvfrripp08i9sm293fj0wn8x3red9p78iubeti3fwpb6w9psyvldmvonitatajlaj8406b6fczoip1lo2k69xez25u5vt2lprmh6dfhmrqicxkfho3ufcu4wvh84qcakjrqkiind4o4lp9y1941zxmtkit0jqdzwi2yibcaudhjmcvw999hfecwxj7o16x9hrljmfqzzmxj4l3x1w2w79qoto4wul2njnf7j35892cast3s',
                description: 'sm3jtl6qfpm79opkqib9bb7hdipbbof6wagowm975c5d3yjw6vnbg8uvm6izupb1tpd7egve93w1c4rtlm2vkbz1bdkwjczjwikpkmhpjqlx0jroqvfw3q270n4xhib78f5g0ehcn0bi06gsx13joeb3l92r5nwuzbxqyjl5bt87kik2vrfp66obr34cs76s2lyfu4tdtf47oaodnzlhvxp2psiozy65itfo64u26glj7xpg1taw3hx9auelcmd',
                application: 'lwajq3qt5j9fo3b2cou05g7fqcmit8hl6t70x890x0cigh38xhllm41mmfem',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'eb72687d-b23d-43f2-af77-153dbbb6f19d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '7370121f-7db7-4db1-8d18-f949b51bebe3',
                tenantId: 'c13e8197-55c4-4a60-b7d3-5061e48f7a56',
                systemId: '6334b1ff-77ac-4635-b471-fbe50e95e21d',
                systemName: 'vzr70inrk9bjlu38gjna',
                scenario: '0r94qv3j2yapsn5jcj148kb00p81lkl58yena3yrcyemlhbtxf5081zl5gjy',
                party: 'env4q7fpmvccsncb5ok0qdctsqv3jc1dzv1w1v30lxi1vh0cmt0k1nheq8os4wp7a13r7pct34hx4xkog8p76fuc945mz4tppm220mtyd8at6k4vv9z2podc3y70byr95xtc0dyoaivnv84fmgq7g04ms6fygl88',
                component: 'iqsaw4bh7xzbkh1wihkl810g96jlex8zmoeni4o1b4blqi7olhduf1wod3cxccshqz2scxm0ty5d9eaciqotba05cbpsbyjojd9qvyfgh8was8vwqmtxpn23um3gy9dhf9ywmy6hz8eesrb30iwsw6vxzb1h6mn0',
                interfaceName: '7ab1j3fra8w0rt9rwvtr5f9u738qfb7ri9djw0rgt604fw9m5v6slodzjq7gg2je5xp7tugn7b4cg25s1uxag1u2hl12h0sdguuindtgjpgyjeqedt0ppbrkfndf49r3oxo82ptpd9r31t3aw88q09lpo40qu5cw',
                interfaceNamespace: null,
                iflowName: '0p31z2he38p7906kf76b9a8asb9kt8o404i5rbc54by8p5zwehg1cbl27dc1pi0ntashqnrtr1xtt7zd4nk1hni82bgimjscdxsbtyd0y5adkus5qt9wix2vk8868vxviicucpmsqbveqikowrmcmwl0ywsoreny',
                responsibleUserAccount: 'afaa3r1wfp26v8bbe9ev',
                lastChangeUserAccount: 'c2z9p07v47fi6d8l7wbb',
                lastChangedAt: '2020-07-15 20:29:38',
                folderPath: 'vojnfnba3udssflu0bl4akl9ifr2auxut95vsztsvt6dcqlaweyyxeghd6jjamk3d3egwz3kbud0hmszc59f5kcmqqky917gpea3b5lhk520f9648x4wcp51wzw4jjxvm47varda9fexotgz8d3solk3satbc6difez203tposakjsp45dw2qaq72c3ej58ztkr7orhndh49akbn3jx52byapa7z7xc7o8c6rfkzeq2rj2rkkz8d9m58sg7lcli',
                description: 'fypqjhvbn795vhl63nn0tbbg24tpsa8y21nn5bpfi3f2da904wm6xo4ktdh4gpkhc837ablzrhd8vq50znpxx8624osl7iq7yk6bsbr6tjnnl6fwre5s2jd9wfyzeevlycay3ok2kbruczcrqcvav7oh5jzsinpabj5ub834j4mqaewr7a93nwcd8n429z12in4xaid8k1vz8487xo9d66q40ewazhe04yvxkp3oltt90x4a66j4ergqpm39nwx',
                application: 'pv7cvubuj1owtcm4pnlhaw38a0zntybth3cbr4ar3od6y3kzv6tbd24150ud',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'eb72687d-b23d-43f2-af77-153dbbb6f19d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '7370121f-7db7-4db1-8d18-f949b51bebe3',
                tenantId: 'c13e8197-55c4-4a60-b7d3-5061e48f7a56',
                systemId: '6334b1ff-77ac-4635-b471-fbe50e95e21d',
                systemName: '0aenpeieqw59hel70r4h',
                scenario: 'uwiwhrqxk35oq3xtx7cjitsokqmwn9hl29dy3m6dtr4mrkulz0g78cg783lm',
                party: 'gx2hneebpq9shj99jbpzten3jtic0z2ex0v110jp3fmnwiaoc07mpdg3r4p8a965dr4vqrh7e76144x0ub9pfg0cd3vuvyz2se5d0e1hljyocn5akhjjpls0sohk2tff6ynl2i99wndqucytf8z2vvnj06r0y2is',
                component: 'z7aprvq17dio7no4iop1clipm7ev55jvh50wmmk8jzbw96w93hje7vo3t8lxw521lvw7hb09szn3lntqn9k2x7n3n1fu353ix1a4iutqeihtgz65oqpao9rucgdr9qnkv14ykefyylvytxynui4b2b5t1mg2ick1',
                interfaceName: 'vchnavjm9b2gbgor53m4639s03sdmqa9haonh3yg27yj28smj9au1sjp367uwnvs3ymgfx8wygvczbiii0fmm2lz5z7g66f3twxwt9qec7dtqdu63rxzfyjs865hoznkrt1qxzcu7mcgi97a3govsxaud8f3ro7u',
                
                iflowName: 'qnuddrvlt4nj5zm8na2lnl005eb8amjt5crtl26dw1a9to6z692d4cyfd74waie9z4rjcykhc3k5awlhz9gjkl0m3esnfkdlku7eg8nzhxtmckm7sqdxzgsnr4fkg4lofzcoadtx6z3u9uivizdcmpysu3xtg2ep',
                responsibleUserAccount: 'ur6qfg5yayak7qow1qp0',
                lastChangeUserAccount: 'jo4ogr1xdn7ed9woyby9',
                lastChangedAt: '2020-07-16 15:26:59',
                folderPath: 'lrwqroj7nk1nkcbg4wa5wlgh2a8o8qrpzmro7ez5ss85k1cyebgyedfhjribqkvyvc62l5avvjv5klekymusnfqm8xtnynjxh0hvuvan0qropngn3w8m50sfuso9fcj5ho67v93ju70yiqw0jvmhhr7aumo9xzl651y548wupv0zvjb6okapxopxrc1my0n836x5p6wk839o458kqby9q0tn9khkk0o8f7nq4rfiobj5nosl0jicaeoe36k9err',
                description: 'ohlz573kit6i37f53j8ka34wesbx784p84vdoorjhmlfl2bkjq8erx3a50g7bv1i016d7ljzy6jxsobwx6r0swjtktkhnx0p75wi169ednvq59b5g71zfcj88szobdr5ncermmmu1cug0thdfm26mq4irlb4lxizbirebdmx5ahjjw2z0rer1cfurc6k76qddlvwthjzzt1x5348lph131bv1ggwl5tpvs2t4kzgxhi7oetkzobmt2wrxyuxf3h',
                application: '39r4hd203d7ekbbqj94fhipfjongxr1arima8hzgo25k0o8c58tow7783e2a',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'eb72687d-b23d-43f2-af77-153dbbb6f19d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsCritical property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '7370121f-7db7-4db1-8d18-f949b51bebe3',
                tenantId: 'c13e8197-55c4-4a60-b7d3-5061e48f7a56',
                systemId: '6334b1ff-77ac-4635-b471-fbe50e95e21d',
                systemName: '3ptpb6zt9d12tzui09ih',
                scenario: 'jbursd8f40c9p1tmqpgri7t2r472ttzs6x7buwkv4x9u82i8fgqrueoe9aa8',
                party: 'pzwxc4j3mvvu32xt2upifruerjdm2qca1lncxfjh54dl6ovd27kfywhtlykbeb9mi3tj13rrxkisizoic9hnakbgxvr916ujj2nb92tmgnbyczok50nl0auulgjdzcs6eocg3924ljedwa7zdkc9y3670ede4s7h',
                component: 'jrhw7jh18mowfciwoqcfw0wso043kmmpzwyqe5993uzof70o7mr89wxw7anufrki37lrbddeoeztblu5gai6oqkbw48fdltjdbq87qg2nkp63l6sd404naqaicbh5y23fmrqeb2z130o5zrvnf8ex1pnu9x13gfy',
                interfaceName: 'fg97tluazl1abp0g4sb96spsb8v5kdfp2p5ecax5j8t159pxsiv7sebz253lgxhh45sc4hlwdpvw4kd73wepdztclvledqm8ypbj5kh7rrmggaducpw7e4qpfepyn1372e5te2kjolo37dmgx1f6s2sdhevz542e',
                interfaceNamespace: 'v8xuminw8hggegp90vbop9il8sh7syt7xwhi5a9plsp8qmi4v8oyer0awk2kfs1zobsvhfcv0vfrevo8zklu87tr8so045cefeu4k3n8qlh8j28i574aiqxw25fh3ze9em099rr39tryug4t3akfn74z8gicbqjs',
                iflowName: 'p3qd97qjqsubslzesp2biprkn6gipmzh4sqyfnii8e309kvvigsh08juiydtsrokswpi8n21me0k6a9z5o1iznnn3rs721audsh8wgh7a3cjw7ynw3s2t8250joufeu35kyq0o6z2c9x326q5wrvfi8601zmul5w',
                responsibleUserAccount: '0chbyd3j1fb86gav9gs0',
                lastChangeUserAccount: 'pe82f78o9myg88ekcdre',
                lastChangedAt: '2020-07-16 09:15:59',
                folderPath: '4f8penhw0ksli5xfzn2m26rvighq0i4uo8xtmbxd1zw9e0pd2z26zinfp34wbiftl1oqmxxupxmr8u65apji8s6sho8r3cchfn23e72zb350lwojcvyuimvauu0kgqhmxpb6cvnr8x45yzv8v1dqln4pk3jyaesz7cjgnvnebx9jb1qjow6ltw2gvkfvuyr47fnzszgncz745mb8cwisdj5k7u8m43kr9jae75kir01a48424zqfc6iami50cfs',
                description: 'r2azyq08a3meoo69f17qgwqb0jxl91yqdmj5nbhqzlnico6ouoh0978d0kc0vp83upb263j33yanyaoji17vadstzufxd4fpzr8gywxpyad1132gf5m8378lozdgwzb154v7f4wdgcwolnonthxillea1qu5wtwgbduc16ykxme83ao9dvqd7023zv3p2eoxwt7hmid1mcllaozjs6xokyh8ahqpbmm8yrvdx6gtqcl2rfa127tpmqiw339u1n6',
                application: '6j3ki27xbuyg5weu6680ospfzbbx15wjdgcv2zcf47o444bju2oprc8vqn9m',
                isCritical: null,
                isComplex: false,
                fieldGroupId: 'eb72687d-b23d-43f2-af77-153dbbb6f19d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsCritical must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsCritical property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '7370121f-7db7-4db1-8d18-f949b51bebe3',
                tenantId: 'c13e8197-55c4-4a60-b7d3-5061e48f7a56',
                systemId: '6334b1ff-77ac-4635-b471-fbe50e95e21d',
                systemName: 'c4jgeqm1db2ck0v9c4aw',
                scenario: 'mvc8pfzecxbyoin2ctjo0ae4ukymzzcdwr1uocam9s1c3ddattuwraex4z49',
                party: 'zm58qz49mwajbk7rp4ekupfsseq78t48vxeaxe5o69vcb9irb7t9jyv2ku5xlirytgo5dizvukdhhg5ckpi11juh9nf32wyfeys7peprbr0m8pc3okdrucvsskoorirq70xrttinggsv5s9lzwbd6okvf6sntulj',
                component: 'h9p9el4xqa67zl6t9l5z6du4x9ha6wn8p0ijpmsia2ozhlc0kvenx9elo1r3ys3i88w2a20vexi8ap5oli1xsb2lp2p749d4zvc8788akh4lt540n0fo89q1wv72yelpfv6vng3hpehd838v9lc9rv69s5v660hh',
                interfaceName: 'n6f013q4g9lg9ls7b3lxuoq1qn8ubq6biilaq6cxfajcuq0ffhquzn43vyj4gie9esvpelpwbu7tf2d7tcbclx9awo4vqoxp9s5a7i2qk8vj14aq3gi3qar91qloztop4tbj2clat1srgtkwi9itia5rm29xz7ad',
                interfaceNamespace: 'hjfi041vuh9agiix2fk5xjzypkw310u9u1mzsolhkhj4zgvzkm7od5zd65ms3faoniw74or8z17zwjgdcj7x2off8z3hsek6zp36lqxw8kv5p2ab0g3l7eaag6a9xy2xyupqukhgicsp6gs63ws4kjv8pjmnvgfi',
                iflowName: 'bljufo3m2r7ahsk5ekt3wew31u1epnozct23ctvhx5t33qhikpjhrcf29pptemmtfty03g77n5zjw9cvvbyxp241lxc01p62cgrw8a0yswm5l92rbv2s9gyduf8bsi20c4f5htibgei2bgmf1m4x0b5pz0kbta4s',
                responsibleUserAccount: 'jfimvn7rldd4btcu3u49',
                lastChangeUserAccount: 'av4rpzreenxojiqkll1f',
                lastChangedAt: '2020-07-15 20:24:51',
                folderPath: '61jnfi8f7exfypnysj33wvt538fs4qr13mt8e3i21bxxk4lz1fudwwh2j4zkbkz5e7b7imp74ojm037lqsfhxjjk5ei4iuvvvdbodvd15qunrdrdl820g5or7wha3yvj7fxnm51tq415qgrvcfmbva4xz2b3r7v7u1n41kvwcmygy9x1gd2hb9g7l0r5rwehgevdudbkvluzrbjhbbk5dufg683pxyv02pj16pivelkyswhssgg8jpfophr4k1c',
                description: 's9kwxh0hhqbqruc3wq2youkxql5zacc98o7jljwbzc98rzcwpvb0n127ryhcr30e85wl3welialpwjs78lxqpke5jhxtidfq7bhz90ouhf5jzv6eqsamymfpesccci14mxgzhi8y3l6li3squudztm7yww7pe7q5zdnomu0tcu57wh5q7pph6kal48c4qeh88w25u6nww0iyeqhl1p3iytf9jf40z3oxebogxoegktajd4d3tnpg6pbe9dkfsns',
                application: 's5cifuatg7gfmmgmz8mho3tqd1wfn6gymayro9o4g83zsunhywyno2jdfmvk',
                
                isComplex: false,
                fieldGroupId: 'eb72687d-b23d-43f2-af77-153dbbb6f19d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsCritical must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsComplex property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '7370121f-7db7-4db1-8d18-f949b51bebe3',
                tenantId: 'c13e8197-55c4-4a60-b7d3-5061e48f7a56',
                systemId: '6334b1ff-77ac-4635-b471-fbe50e95e21d',
                systemName: 'i4cu35s3somiov0ob54r',
                scenario: 'tzleedn477khrvct0iz6rtr37hfnbymebpdhh84nj4rtdm4eb5ocs72kxeuz',
                party: 'q43ktes0tc1tv3knjw7mmwsacmtoykozhzsnwaizsrzt2slos8im09h205xdpked43i1scgyhw2rt2amjqk7mw4ov8r17cq4fb7yi23mkcw314kg6iilxi44qhnscnnmsql8ek2xhiatent56k381heyq9y7mxh0',
                component: 'vy9qlj37ptz7l752e1uer9hc77z1u2zascerp9efam3ubp301wii1jdnp7m9azaul0dhr6obiar4nkp2s2u3z5maiy2nyocof6ug2d56ngjnh5sz36xawledxvyxyurjnbpzvxsqx1ps7yeimlnbwa97kn6buieg',
                interfaceName: '8uu7qc70s3z89ahsol5st7nso69v7th8db9z9r8jjyda9zpyq10dg6ttefurnv9y2q7m3xddrm4bcmdu0w8p96me2rg6bnrtrgc9a913xf5wbyt88fo1q3yg2jp6g7uedexkwl3va1pq4tlk8n3uruejl7qxci4m',
                interfaceNamespace: 'u5cumscuplyx842qffp0ie1n7jcxtbcc6a28ysd3un9h0d695kurzyhqzm8bwsj78m8jvuvpndw0ucqd9ar418jncsp22kb8af4mhaif9vh4tg003n16pguynps1sxqrbzf60nzxnzamxzq93n4q4gabjzj44h0a',
                iflowName: 'jyztljk8kq6e9lrkqliaxzfai3o9sp5gstrvqj9x97oxotvocedjsva3lc0ir25onnxtue9v6n5z4l6agai1qqy7cqh2yqlar94k0kfm0kwl2kwo2k89yetnlp4cz0964j390avf8nxtwgn2kx30bek3nf5uuyuy',
                responsibleUserAccount: '4hm03vap94wbwi109u44',
                lastChangeUserAccount: 'xefvsvj25w6w1eift0np',
                lastChangedAt: '2020-07-15 22:41:00',
                folderPath: '56pv5hryl03aezq4p7uby35zhazkwomnmp2lxur8p5wo2616qk7m17zt4cwi1fsbagfsoa4nnr5odmmo9oxi5fhfe9xw5hwz4omfttok6vnzn2omjpfh5q3e4y46pz38ritaqdcs76z3to80j4l9xsx0eeezzfldus8yh15jaipnwfqjzfkg7hwimbt0o8x7eqpzapmkpsjmez085e4whoow4f8d2ymc6s22fjs0gii1db4ejtmmpqg0llva3de',
                description: '2ym6j7uvqs4d7ozq13rw46lr21wa07zz20zka99v3dykjsyefh6ctwjfh37dko43pp0oov7pjmldhh8z2xucsclop4m6kftrauggvmvnnvxrh4tcprwvebkqjsbtbpyu4vtcfd1wlym3am27b4xbjkr0938q5glbgef9846h51atwecxxzd86bskotzsuv727me1g9wbi294zzhfexg1qw87mg6z2bhf6dgahkn11irwu8czhhx78lxx0lb65mw',
                application: '2v7zeloj6ihhytfbd1pt8x4ix71wvxm1g5trd0gs729ilkj094bog08juvgt',
                isCritical: true,
                isComplex: null,
                fieldGroupId: 'eb72687d-b23d-43f2-af77-153dbbb6f19d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsComplex must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsComplex property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '7370121f-7db7-4db1-8d18-f949b51bebe3',
                tenantId: 'c13e8197-55c4-4a60-b7d3-5061e48f7a56',
                systemId: '6334b1ff-77ac-4635-b471-fbe50e95e21d',
                systemName: 'gzg2hhv3dmb57ggr8wkd',
                scenario: 'snuu3jt14piuymfdkf3c4axquvgyap7bj0p0sq8af266v8scxn0cmc92y3y3',
                party: '3qawbuur53ukod4ri9fcaf4xo114z29vzohfnmagpgfwgqwqdejdhyg7ea5133pqc5oiyfda8ddymqqx4411vey6qmsp7k00mdij7pjqdt1y62lbm5vgleql4pe1enp2sx6wi2b8dx1fbbdquya7e04d22funfeo',
                component: 'urm5jj2qpghwbsx81syg22n3oc9w84ql81qndriqydpktvtvcpbe3udh553y6mjnypmyt1xz7kt79qbqcowbzwydj54rfymo8f4kapfusn2fqwjmdry7rcm77cctzqfaivfpxaejf3f0svcvnjof487h4xgbdkpc',
                interfaceName: '41p2gcriqo47wx3rwi0a5w8gepcdpaq1gqhsej4d75jkvexbsa7f1qu28eeycadv5wieioed9b9spsc374o55pbwsv820zwo1dyff9dgqzarnl91t4bmih6go1mgqduhpjm89lgznljfqsh405vxm8g74w6alch1',
                interfaceNamespace: '0jfljocjv6w9q84tfce2bbktec5hzrq9nktxugg7xpf7dnh5f88efttxqisy3dl7m4kp0m31zlftj4jv5evymh01zo0s6dc93ikokq8ungv950p6a59h5jaq95nm53grg809vc89h8vc3ept5ln34vfc3t76fztv',
                iflowName: '4q01qegwdbltt9lb0dqdxvii7lyqnvp88tf0ceukvsrnqfzl1cjvf798w540h85sa58iaygovukfd5qwcpnvhxff6vptqr4zi742t9k7j4q5yqq765m1gokt9o0hxowpj2znnbldab59mlmelasl52alfu4r81gy',
                responsibleUserAccount: 'd3nnxlavtg7fx99mv6en',
                lastChangeUserAccount: '73mdm4rql3w4qzs4b6b9',
                lastChangedAt: '2020-07-16 09:31:48',
                folderPath: 'c0hrrb86auoz4z7dilon359y4aopvxu21ql54c2qfs1rtsr6h51xlvuazq4ro2qq031aadiog48npq9ztpyyisxhj5317wsm2k7v7i872h5hk4ghw8csycaploqe9yek0hoo9kp8q4ejw3tghz0vi525ntxkzsit5m28v60wpnihrrzbjsb7owhnn2hg7tvncuwgfuqi1i6du0wghtdp8ifu1uy56qmk88t39u9xumg0cy617i5ootij9nt4yds',
                description: 'vjoacb8eungnaa4kd26l2x9lmtsk7uvjlf8h4s9f4y85mxm41eyd51pg9s5rdgecwhjttkj2j7gj2t9dxtgtc41s238y686k6i9rz4t0dh6jxds8ed94t1t8lqj09weowp7ltuqptc6b9ij2a3x40gtb4bb6a7nmn9z9f6io76o9zqkp5dstk92s7lypg6cbdg4gne0kkdxzs4st32pduxhmd98gfa4hbub9lfuon687plnaf32a0pjt36171ge',
                application: 'kashur3gm6kss8z0nkxkznhr2zitrxelhj10o8hyh7b140coa0241e0nvpwh',
                isCritical: true,
                
                fieldGroupId: 'eb72687d-b23d-43f2-af77-153dbbb6f19d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsComplex must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'hr8t5rdvrqrb70hgur0mhmoy0j8io8o2c7xro',
                tenantId: 'c13e8197-55c4-4a60-b7d3-5061e48f7a56',
                systemId: '6334b1ff-77ac-4635-b471-fbe50e95e21d',
                systemName: 'lh6e50c771cdfhavo3bo',
                scenario: 'bir7k7k91cgsqek74zv3ry26ggxcs8vt329wbht5e61mhwi4kmo8o5nlenri',
                party: 'dzq5romhwtxc066oesg56p2z2hi7sxfvw8j2xbaflwldazbf5uune72yogqkqlzqaxf008b85c1uhr2186kcc5s0o0jeeor0kkalz98fq3p8ncs9xmac75g3mj27n8qy8wmx1fx5xlr3dv90f8rgd0w6vqdkpr54',
                component: 'zzaujavae1yeenwwi9jul7u4j7emhtu91yhdapyibxds2gmmm58qrxu7jy7y8ai87vwal9n9jv6gui3upl8lp9p9rckpmgi1xwmy1jwu5jiiuw6x6r3saou8hdqixzhief1sgqksv44bi0e8njypatbil1g2phbw',
                interfaceName: 'ixlmbxssa6i87vupo80psf32rv0lbdug5oabwqo0m2417uc8acz1lrkrjfeo0uk1oe4pmyq5x4dx63n5hwwvgyetn1zqf5rijwdeedy4lq4vw74sw736rhvfkglg85kq3c3z6i6f9xjip4ihz9dp2zu0tz60aejc',
                interfaceNamespace: 'ne6go9bvgdcuj88jl0pzb4o18f9e723lrsmmo9briec7whz1shvnd2ywy7i72amej4oy1e4ptgvj0ks0jbd2vpz3nzzik0ty1ydvx1xb56h2w5fj6y4dc4t2ojj26d5icsfqkz43kxmdmltcdm10w5edery3gq6g',
                iflowName: '3t3f1c6q9916ady4a3896v8alz4ugfzy5knz6vv4u6fkqcekqrw1cxab6nv4guehfxytzxib130nq2wkulsaxmosl6krdeuioiv5yttbmr5qd6qqyb7sbkju65vmvjy5pycwl697wz6xypmxn2f7d5yp8a44qcsl',
                responsibleUserAccount: 'nj7f4pkvyx5rdyfvyti9',
                lastChangeUserAccount: 'n4r2498xzja69ao122sh',
                lastChangedAt: '2020-07-15 23:59:58',
                folderPath: 'tp2lfdh2iynlitjbnjw8ms76aacc32d0ahr2mcqme62dp9c02vzkhg3g27qdmf02i5uyschss781rrriui776my2pohtt2h4lmf5deuz1lfep995ddlwglmdgn85vq163sejd21mapod5gonxi8oqd72dsgs3bil49ohfja2ze5zlgvv31y7bhrrc85pdxq3lngrwrfy1dok153lfaqh1yfminefzi5qngu1qgm9xcarerjbxuj2ilp0bb50afl',
                description: 'owyf46hf887i2hxw16vge6jaavikeytb9a2nf575dpys7p2ajp6rx1i1t7873s2lyx528q3gzsyqkg1hixrs94p6mbcyb38u1n7e2le25eloyfhgo202ewkx4x3i3z6ad6x4ifo3m6ee0p1nxcemrpm8qmzkvumy1t3389pek4t2zscy76u11aexdwa2kib0tkmf9ta4lrye7wosmylwqn219q1chaw7hps1ks5wzi2t3s9agjph3ktn6k2orn2',
                application: 'nxho4g8knvppmsqt9c5gcijvx2n7me9c9pj0yayklf94hc69guin6e4apgva',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'eb72687d-b23d-43f2-af77-153dbbb6f19d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '7370121f-7db7-4db1-8d18-f949b51bebe3',
                tenantId: 'pn1tg5qcdu5q7qvtqbxbc48jseabslwnwchps',
                systemId: '6334b1ff-77ac-4635-b471-fbe50e95e21d',
                systemName: '3try1j5i12sirk6ex16a',
                scenario: 'a8lyn02ge5ml9ig4iiooivbjmqdv6ar3s77vev4t2fpwaxnkhdapsa0atnho',
                party: 'lqjrr39trcjo32pco2x5c7i6dy53y2oqrmbqp8uutahmee2wpiyfqoj62pozc1redm9n25ej8p95vpjlaocfbcuuhekag5vdd05r7xry3vkt9m9pwkohd2epf811rdt5cdt0ba085mzhfnjo2hsh16xwij3xcmeu',
                component: 'uizojhng6crf3zwn16l8rlm7holl2puhp9ctzauk39agggbms43mz24f73tl7yyv0q4fticm3j3i0akfic2u0qpuxfc8tw1xgdjr9nabtsr9x2ja9lr2yufpdt46zcr08cxelph9y8xswbqj7c77bz3nagwrx4l4',
                interfaceName: 'bhjbizjlfjx3ehj7f8k4enh1x9ngz567hi7i1axr8vlkii2xsg28b9f68u26xbxxbcntrs6vd9lnu4bruqsrjte3xaqb0zt1lie6g42xy1dln08t4s9rlxsqre1bf7dibj7m38yz2hlneelio9hd49cowd1jfnwy',
                interfaceNamespace: '3g31zjxrfabwl2k6j923iw5kzg5talw0appccxfekzp16y737fsuardxni7t4752vephokhkwykj3bjmzh57lpdic46ef5rjduu0x9w444o5f1r9u3aaynu15ty3lqlz5pedfrlc6gkz9hrjuurwl39p3x7vt7cl',
                iflowName: '3s8n8twajjlwfvfjwolj1xlftyzekwo4m7lz1i28hbd3syre7cg0qumpwmeonw1cw7f1ur6zik3gfjnafcoul9xvcyup434sbykjmbxrsxplqoytzpexip9pzwbs1t07d0z3gcdv8v7tej8wfxp6fwr88zk9n4jp',
                responsibleUserAccount: 'nkji5dq0z7l6fqc0k4aq',
                lastChangeUserAccount: '2f37eq2km3216wjefujs',
                lastChangedAt: '2020-07-16 14:13:44',
                folderPath: 'pxyut9c83lyvmjf9fu8c9a7ag0aq8yb6teunhyocs7rabup4ttb81d9xd69p4xazycq898xvelskjbz0hbzv5r98z2w0w9ytnse8ox8hhbct545sko1pum17015otuwvajpajo7y8dywgnedsiyp1xvlyypy5ki9ifduqtgnphstcu3tjlcod17gay7omewhbenary548c4x7k51j9l93nay47kx4uce4fyhfut5xnst585a8qt2ok8z082xnwz',
                description: 'w63p5xlid8t63mq6vgj2aawz3x6jpctfq41rxzoa0t4lqb06ka7brkfg3zei7t04ikc93tyxlgqbgq1myy5vpgvl1xqde90hcp12yfhizmqfg3lvkpyrxu0pilmwyblt7l597pr5tgd0j8j5wdrmj8gjfqm4c8h5nuhq6hqe14v3iuk3gn3hrypr5o17c2wrgeca1v645ct76t2vkyhbcmrnlcuebvmwbqzubnw0s0ep3rjh22cmsicxm7hzqj2',
                application: '8n8o9uv9g6ggdnwlbxvtfnfqllcwwzpxptsje7bdmpndmt42n7qylimvo79o',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'eb72687d-b23d-43f2-af77-153dbbb6f19d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '7370121f-7db7-4db1-8d18-f949b51bebe3',
                tenantId: 'c13e8197-55c4-4a60-b7d3-5061e48f7a56',
                systemId: 'f1sqzqfw16s3u9mxezsmuh6s8hdm0g64asjv3',
                systemName: 'wo438ioftfkrtgwp5wt2',
                scenario: 'jq1si13cw0dzquldak1tajerjk0bf2cyub0czvgcm8oaqlmkaya480biqkg5',
                party: 'acgjkxtbenbmop6u3u2vuyy0xtm8l3d0qs1vhoajxdre8emrnqkqpm4zw97widz7li53vqrgnprs32sndi8w4ldgrdxuxoq91q2ow1ogrf2db2g4dsfgwgq09t4x29naga0lmmuxue495f2ej9741gzmwnkzxstw',
                component: 'xoxqdo1j3lxhnvr2cxxj48gytog4epp45bcasf8252va9fsa9qqvtnpkdh5st1os33tbyb4z2g4swy9powg6elbf17vy3601n75yv12367jc3jyjx4q0f0vskgtct0kww6lugeimwxrirwsmnt17rji00mlrdauh',
                interfaceName: '9f962j4m0st7w7pa7kqv88ohrer18gwc8iv6528ui79ni2wns3njjutxi57kwg7xs86rdfg26gg5u0tuzny9fz37ervw1atv7oe179mdwfxwz9dt8yx28lqmks9dx2n0qn5ezey0jpayq2s4rv79iw8vdc1ab0yn',
                interfaceNamespace: 'xpsvsqqko8tcu467tvl9kif9qbvmofdpymx3qp1fd28yfo8vs73tm66rkdvcon8txto4peyxfc4u0xo33zmpq0x06vcsl07b8lzdhyhh3309wg3ta8y49ov0rxmpiwe7p6b5a29bxy7ogzd8fgujew6t4fzl7jvm',
                iflowName: 'dtzyv0xhcmosj0s0jpfxbif1at94avztn66b3l9to3zdy285ytsll26z43ek79ed2vsipsadwfcv4i22iqm1t3umqvgjmjj4frrss3jl4hvr6pv4unkuf96qztmjixqob812lbfqvls3taoaaedwzw7ik14b2avd',
                responsibleUserAccount: '2vrlotl9xl21ran4i5t9',
                lastChangeUserAccount: 'rvafuhog7zndmq457svd',
                lastChangedAt: '2020-07-16 03:46:43',
                folderPath: '648vafqgcbl5es0nrz2goalieifxw4al10xqon75oe5nkxum7rsvwqm7t0ldx0yx2jrjeez8m37x0wppn27upzkwu80o91y736m23w59a4xbzbu5k5dry5kbrqmcfkmrpacil9q42o1qvroucyo46rbu6ib9ft7kgdo6b80ta9t8vbpv5y1zj9jq4oi1oxjojqmej39gj61c7a6xlhjp8dg20s1liyp9qhe7hdkasj9lfx2liq4hb01apkayf7z',
                description: 'ut0adnru8quzt2shcke0gm545u8g8zlvfty73jge291c32gzhiuq7307n81ucke1bq0da8dt89mhqb67go1yd48faxiis8tvd65gidlf0n0lmczwn6s89gs1y69c69f98tq8c9vezerre4agd2y24anh6wdh3qh8uj1lx2bjav2cviy067gsrifxp3muiqlzvvwbu2og14qavt1jqa1ay7g870jh8phfagtbz3eaufxth57127cl4yidfsfffbb',
                application: 'ktlnyvnv281j0g4j7eayxml42nt2wi6j6bolh956i2coal7e4o2hdwthhtd9',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'eb72687d-b23d-43f2-af77-153dbbb6f19d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowFieldGroupId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '7370121f-7db7-4db1-8d18-f949b51bebe3',
                tenantId: 'c13e8197-55c4-4a60-b7d3-5061e48f7a56',
                systemId: '6334b1ff-77ac-4635-b471-fbe50e95e21d',
                systemName: 'cxvmrcxvf5sjvfsbgbwh',
                scenario: 'og1yaulmj9w4q800lx5a5tei6m40omy2n2cvge1rfetsur4z11dcoyxqvno8',
                party: '3orbeu1illbkd6rgz7p3trkgprz9g474luz97f24huqunggmxhk6fr5c00v7nq0lmi0tqc4o0soii99bc4xftdq8nyxioadlplw3d7rjbqkox07ux68sdiew8x9u2qtkt0f40vuyk3jwpjfu1bd9sn99ub0diz5g',
                component: 'jgn86sr1ffdt80nrvzjl56x7l4ngzdebrcngucx9173nh84n27kpwzyeqkgxko99rpomnx2wuhxa122db12tf5aedhxkpfwoln1csf970be5h288o0mzj9qbzvtalnma391f68x3dzv2k27evthl1gkpc7e4olz7',
                interfaceName: 'v6dlhsyqkkrravz54xfqbh0hel0rqoxierjw2hroa4t04wqhh0v08f40lls67jqojsl765b3mlin52925zj79xpx523zayfavpwen68jvw5qp4t8snwt0k4dsnie9eo24ud1amf6gwnl85pcs1j7jim6vqpw2p4m',
                interfaceNamespace: 'rrwe7snmj2s0jd6hlykgfm1i30jrf25vyinyrrgl9copd4bgjsfa4b5y3ewea0lz4n3jxqvubtg5dfht3y8vm6phf16u36yxw8xwzesm6htpo3q8i5409c1kjnf622u31u3hnz9ggux4cjftkel1h3cs4yc97dqc',
                iflowName: '82u8832f7zbfnfib483g78zff8caf0c0donufmao40rqluu2gqz047609p8cyrzvmreo3oorq8uf88f3as2z4r3btdfkqvgi66awtof3dc3vnxozm33fhlb8cxpmrk3j0mn7m81dw59j3it3bwpvwu9mu6fasn4b',
                responsibleUserAccount: 'nvqw5yrwzlqplzrfd3vn',
                lastChangeUserAccount: 'tdbx91cywucz3skus1lk',
                lastChangedAt: '2020-07-16 14:39:25',
                folderPath: '4fmbsc0k9j4jw9fpew7cfd9pu9no8mbet56ugv5ptp2n8q7awienay1zlcsl7sv9r826flntvrodhnn4kr8euexcvlh58csesublsgga40tzepmylq31lxw80dje3l07543vla90qpyxwkdbll8zymq1ndzz31mew74t8q8uto4bhv21d1nar4b1cdh1rkmdlfbmuyq3f501uyex8ptibkvvyjyszizqbyv7z4auwcwq91zg0yjotzz1cgk5mmh',
                description: '9e2p2ac86vzxxte85gson9zoo25q4fccut282b891jl3fdyweplh3emy5amjqk9zhyyowk9wfsloiwg491ek2xlthfryga5r2jvs6et7titubpjgxziu0aqnr7aa3qy2rh9jxne6dao7hftlbn5c7bbbpq68an1jkgxapnq1l6cob263ra7581edynxg8c2imbuwmlgqgqcbw43v23y0lpmcvo1419zra7f3k6r0v5h6ccofc4zdu90yht0a803',
                application: '421e6ec0zk2fnh13r3rhuq9jl5jnze7qbuesvk3j0faw2ozmcsis1u897h0i',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'vgby92c76xgn2cmn3h3ctegg7x90td62qn64b',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowFieldGroupId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '7370121f-7db7-4db1-8d18-f949b51bebe3',
                tenantId: 'c13e8197-55c4-4a60-b7d3-5061e48f7a56',
                systemId: '6334b1ff-77ac-4635-b471-fbe50e95e21d',
                systemName: 'azhri92pacg1hhz1535oa',
                scenario: 'ypedns3ven1e50gmoaee2nw165hslmy33x057028t8mwsoakd0lf4i492z3i',
                party: 'wfbivuupsmrw0k1wyw9b9rqw5ezk8if6qxojnnc0vaogswmdgw4vnecln2m7t3huv32ybs6pysz84zrfkmac4s04q1dx4b9stv23tv1atsab9fvtu26amepyjgdci945o7a2rkll9i719eyemeb3m7i9hicd7drf',
                component: 'yj7l1uz5nuu9nvuqdf9tos9qtnxcn7zmohszcm91j4otu53fi2fbqmur1672s1vge3x5wq6ymos8euyxrkkntxeiiqm7sv2ivrbmutc80tfva5pr1rb37wqrj4admz0x0dq183qjbtrq8s9mvjk9z4w04qyiy2ig',
                interfaceName: '2lhqnsfsfn46vsye767g2riuvb0fvp1vxc6unhymhsi41ylm8guycfn8a34gojuiygkq6v1q9falqibjob2kebp4m14vic7yrjmo68h01epg7viuop7y6kextddla69l448lmncxad6p8xifkt1v74c9wd4zq0l4',
                interfaceNamespace: '4b2srnkzhoe2nrh3dejwsgx0kc1gfylzlug4jem4t0h1y5scnlynqcis7kddes380qdj8w86lm8faaq4v4vwz5ctsukg021ilwkzaltz77oqoo2o4d1kvmfh3zfc739xh38fz785rmrsoold4eyqd9zoq8k59rdb',
                iflowName: 'ixv1b6p8w889aaka1wmjg3dv1itgqaqwdf6kt7jzdlc4fc3v7r9tw5984jz99l7qdqe9ulr56c33juupgh6orn2leozvdm18ed3dj1230cmyktmfw3xivp741do2919bt66vw0httfz0jeamqx5r0gbsudyzuemc',
                responsibleUserAccount: 'n9s18s2k3tr2nmxcwi3h',
                lastChangeUserAccount: 'ytokwmoibcoo6cpdhjku',
                lastChangedAt: '2020-07-15 23:59:56',
                folderPath: 'm18wfsh17gq3na13qes8w59i89q8crm1a963652mn8d33ba8id7h3j1xhl5bbvf6faje9b68tsp7qlcii4u0mc2ub3l4bcqjt5rtzqlymyk5tksc60nm2ob2guk01aqvuwtxvo887w2il3qj4t8s9cpax4ekjy4cfc9mcj3usyefzmphk0kwjeu94c0k6q7qdzfh5hxlzbnyinllb76p67jtjsl2vwdi4ig33fve7ty280cykjk648cterc1e2y',
                description: '2rzrnx930bwwsn53dssrnciagm4g1lif3jyk7my1ft7pm9wlhx2kzk521vbp1i95f5bfbwpjy7pnzqn5wxpdbre0bhyciss6zx6ckuddjbioabfhvdfsoscop8mo67saqawu41t31jk28amzqh4cn0dwf1gcgdnfc06nxsy9vystwopf2tsl3gbe35k5ux1gdye9gp3hsizwa6t1u4uskvuznp7dga264kxul47nboqw8tvxye0airx9gy8xuuz',
                application: '7omdj1oekcx5qraxozu53m060h62q8lgazkanr4j0a3w3ugnxrwwlaoo2nsx',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'eb72687d-b23d-43f2-af77-153dbbb6f19d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowScenario is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '7370121f-7db7-4db1-8d18-f949b51bebe3',
                tenantId: 'c13e8197-55c4-4a60-b7d3-5061e48f7a56',
                systemId: '6334b1ff-77ac-4635-b471-fbe50e95e21d',
                systemName: '5nfcclyp59d30rvsv73a',
                scenario: 'pe64xtoj2w2lohua9nmqvv2vf7aqasnegl7gnvrq10r76fy33vn0opptech7u',
                party: 'o2n0riix8pkcw3u20l1yov4cy2s4dw5b0096gagwy5bficwn7kd40xttyf1fto8vy7gk9s2pvm6pwjrvdt5wpvr9gh18jeuqxzsmvlrkdaw1em0filzgfnlv8tm84q5tuxkqzgf3admdc1cfycqnmvwty6hy7swb',
                component: 'kryk4pv8rkg6ixk0ahwpius2w3aennuknos2ixdl0j5znvfzp97kwrbxlmzot9zrtx6wdlhylhfxsyozfk7e28qr6jis56916bxuf02qvhndmw2t4hcml59zlpuvb6fpx5uxtvogjcbmbz3fhcg43dsh6gqmgt5w',
                interfaceName: 'khmicnl1s15lhoy7xyha67glojrjounjjjxddlu2r1il90vda11q1wdo9wz2krxeg00ngp6wounxfg68mpxizmycgog4xtz5lxf6oz06objkspe24jdqpwjlbhsruueu783dek0gv540vieonu9mjh523zzap48c',
                interfaceNamespace: 'iayjq9cv8j2zce1xwajqqcwvu48hzn6o3g83tc8nlk1gkspbmsqait5sx5k5l0428euotv3khdvpkvt01zlemudfmdx8b6f3cwpbv8h1j1ut12fc3y8tzeklo1c0qdeq9e7qp0mqehl1vnwnwnl5xu8359c686xt',
                iflowName: 'qpa988jtya1riv610ptbs2glsrvdvqqal7tvmfwfz5glxt3ruqv5gwfmz7qygihauyktp3blpbtnjpcfcx9oi31s80qdslfctmachq0lp3gt4kdqx5lmb6o2d83d3y1q6c4ibkm5wp4kywqdwz9fn93zanqdhsn7',
                responsibleUserAccount: '1akkm9150fzpfva9fg4k',
                lastChangeUserAccount: 'c668igqpqff8xcn6617u',
                lastChangedAt: '2020-07-16 02:43:39',
                folderPath: 'j4uys8a826kd1wrva36z2rv9jqhb0lck7zbdxub7xv2sthoovw72np3a0ty744lpxnmr7n17tuctbum6walspb14zfvga75nbzkzm87i84mzg6o9vdvguc63dpy7jrww1rrmt88syx24w5fw1lzjweirrvk43f5dynm1j7e63k95i1z58p45utodrek40hxl3zkglac57du5lsrvdkmg0jspv3rlvio7kq4opjxb9ln9xccpmgrrlijztmrsahv',
                description: 'akrd34qvl2bk6mmkoohvmqfx9wzrbtq899ra1l2mvtm2xpzzz5mnuwf2b9ompp80r4zu5n6mamdqy74d8c9zfz062qax8aom80ogluehj9wdvklorpenv2vyrs8cv2q26yqk15hbirsi1dztd2gsuzy6pt5257l4h5jwu9ncyx2je1u92ntfdjb4bcqlf6qdvhm57aq2jm3cvzz36q614ajy7dq76dl7kt665sx8mbmz25b6ky4d384wi62bppv',
                application: 'p9tz5ieu8y30w2e3c7pjrktydgkk5ba25vswyha0kfa3xnzlpxjm9t8jpz4b',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'eb72687d-b23d-43f2-af77-153dbbb6f19d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowScenario is too large, has a maximum length of 60');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '7370121f-7db7-4db1-8d18-f949b51bebe3',
                tenantId: 'c13e8197-55c4-4a60-b7d3-5061e48f7a56',
                systemId: '6334b1ff-77ac-4635-b471-fbe50e95e21d',
                systemName: 'qwxkq8q1dgc9trwkdt7a',
                scenario: 'e1eviz8jq1h9gras1jd7lw57ixr36irwk3sxs7dm1604w4k3olvk7v0m496p',
                party: 'pg3mfelpz7k2d3jsl5duhn4un72936cwwx9thnhx6x57tus0ngv7xmt62llwhidgyvj0067wc7c65pl7kzj2h7z9v211pykoctn0uem4lrcfzobfeu2fqct07k3zq23k2g24zbygpmv2ykuqee7827apmvdc3wfgv',
                component: 'h2m5mhmokb5vu4aka8qrqsja22loy7dgaf0jufggyw62prai10bvgbcwo6qkdfr76x22mzqksal5fcis0zsynseg98tbiso0s5y6ph9lm9yyt50egck89gcjh7y0afw5f8hewhhj6jrf8oh8kvw4tjhc0rcmkf96',
                interfaceName: 'mkeacypde2roky7y3nx55xtemulp97j1whs49jfh9st3vuppjrpig3dhcf2ki4cskzrr66o9emdujcks3zzv3clsqb9w3qh1djf0evygnv2kbgd0cx5ckusxp76rpe8m4s0afcrd7fjfmpeb3qp6kydd8437izis',
                interfaceNamespace: '7duwkckgy7x8ualnst39200aoibbla23o99xcd4ujll1ucrauvvc0f5memymyhxbaac2phrz0mtajghnuioee1x2tzormhfimz8cs5ot863qc4ltykqhmahm4qvpq65ti8e6m207eg06i01584g4v51ta8e7ygoz',
                iflowName: '0t6p8ni9xhylcq70ig58c0j8jy8d14nfuebxmuvjstpevwqfwzi2vr5z03w6uyfk0pohr5p1jqdb5mwcwk718ptlx26hr485b9f17q94v26ecg1nlrdpjgubjgyryywb0ch9kk4q8la6jiqvo5fve23v9568p1g8',
                responsibleUserAccount: '3oxc0gk567qv0drvchlm',
                lastChangeUserAccount: 'zpljn4h9yuixzcbb5t1g',
                lastChangedAt: '2020-07-15 21:34:08',
                folderPath: 'k7juefkbdz75hhktrl0j8oh71ano058w5dj1daaro9dpn9pfn35gyaqrz3kziahb9yhojlcch373vwr1lxd1hj363e4x1e6gysetyvdbg1yh8f58vyok2fhgc1oxip56twckjsywdghdvzujhzr9mgufwumydloxi7pheefrr01wd5gyek9ovhswgzmtj3x9wy257rbgofnpdfjxcu5j1w62wvxagw88bqbje8ooktc32669j2qqa089oeb5s6g',
                description: 't2yhxls7rkt87eeqy74okyx9oibh6s1owxbzavy9f3sg0q0le2r5i0lfwzpf4ts7m3am7gvfp4lfnp2joe00f8mdjvqqp6a8d0x39c1rk5oxb5ef5ewardahcxo9kax5malwbiaiqio59ctss4lvgxmyaszhfeig85zrsr21lcoghf0utztixu71k3u6rbhwce6eeenxxio3u3hjywxn52hr3k1gg84ys1em0rtc4vh4n6pbjt8v13i23buj9p4',
                application: '0udam9cj2ojbp0pm8uzqy0krujh9fw31966fufe764pk0c8ad2colc2zc2h7',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'eb72687d-b23d-43f2-af77-153dbbb6f19d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowParty is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '7370121f-7db7-4db1-8d18-f949b51bebe3',
                tenantId: 'c13e8197-55c4-4a60-b7d3-5061e48f7a56',
                systemId: '6334b1ff-77ac-4635-b471-fbe50e95e21d',
                systemName: 'rmi7ho1tnl461j8vocye',
                scenario: '01ov879s23qo41p64gy05lmz3zryhuv4n8ajp2u7cpzsj5skrlm9njs2uu1r',
                party: 'br7cvnkrbjq2uxqfmrtzmvxwggukeykqf5wr7q5k5vacac983s8byzpu7rwveqvpddqunsucvzr7l6wzinwejvxm309r90y3lph9etg27azc6cjkgj3m8asvhcgj5tvusb5nc9wv3nxvoqqfli01oam8es539dyl',
                component: 'ax9d1fop12e7apqmdjhs9s1sscerjisul7nt77fl3orvmmjoez4qh1tb9nevh2qjnt6unqg8zu3aede4ixh1tfgnruek0n9nxuigrkmn15d04j4crsjvqo2qo8cov4vpakvbydiwhk9y383w023ii0n7xlt0cmj1l',
                interfaceName: 'tkd87niiljjlutyqx0wkbqpnj57ufle80wy3nri373u1pobs91gpbdqvk54gftft8hwjstf6e3hggebvwya1g3i8jkxrs6bikf0wqn6fb7vinubdqq5vdqwe6grz72oh1ie0xiol9dsw4galzpwkq8c0tc0cevnp',
                interfaceNamespace: 'wasj46j6bm31th4n6404wfqgy8up102nqbvrb1d40jx1ysgj6db5vwxzbqem78qz4xysvmwbcs5byuaw9kue37uumjtmi03o8zqc5xilivdpnu3dccm3xj2du36cbv4f0ekfh6w32ysxaffp50nhqxm7wrwyzkal',
                iflowName: 'pmmygrdw3ih347hcee80rwby9f8pdqcez0xgs3yq36jdiv1z08zmpazhx5s2zw6ph73gv9bgf5rnv3qsgaycyr74joz8zf6vgfqioy4z78nfctj96rtd974kpzms5df5wb0h1imx1fl4r8mkvjxi3mzcdnggvq77',
                responsibleUserAccount: 'gj0prc8uno3i4clfe74k',
                lastChangeUserAccount: 'uq3snif57rmcvia4kvxv',
                lastChangedAt: '2020-07-15 23:44:51',
                folderPath: '14faqg8a4t4kovwefgf2wr97fspcj3l3o6zkoiw0he77bclb8yxyfmwljbyp17dt38i4lfvanisua6ucm7dm9622g6ajw34ehkaye7whp8sxnfoyyqff4d75r3z0shdzyrjegdfribvx2hhcwfvh16as4gmes97eh65tiuammjfzwjk3lhnuz4t0egu8zjt72vt4c1pemryw19480in691s20isjc7xd9ba1fkzpyoohcpp9ub4uua3tnrh1hg1',
                description: '65h548la33egmhirtoosnp241c0i1sicevb4vpchlxl0279jrwpl1rc4gfew4gewgv0zozaei21wpavcynygkz3d2xa7vsifama9is0gau4pj8njuhepvjtln1baces6eteuua05bo4gkee66ghrbor6fsl4tmfs0e03z4kgwkcnygmsa8pdbh9pmlzj43mzay0rr49xsx3o903eo23bb6anq14cxecgt2tx0lekve1r7jdgaxcrxp93fmvqw7f',
                application: '1rqdignt579k42tf3goq2r88t0225ddb49c91jpw59n8te3171kuljzq8qdx',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'eb72687d-b23d-43f2-af77-153dbbb6f19d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '7370121f-7db7-4db1-8d18-f949b51bebe3',
                tenantId: 'c13e8197-55c4-4a60-b7d3-5061e48f7a56',
                systemId: '6334b1ff-77ac-4635-b471-fbe50e95e21d',
                systemName: 'ik1m4x1k160tqtalrap5',
                scenario: '4by6l6w5pw5txtkyruwcy5xraqhlsk2g3uamc4dp4ey9nzjkmf42swyh3m3o',
                party: 'c9oyggxmhoqeumcxgr77ie7s10hchz9378y5g90xtyjyt8o75us886hg59ciggv8pm00smkd3osv33qxcqj62akz55uljcva6bk34tbtrvfnzk2s97523k0594nczcgic6z198rlh5lztbhvyl30uz4113l0wf9o',
                component: '4602bqyiohkr9vjs2f9kcuwf0minjai7cyti71fpfjprz5srur18uel9izokicph3evox1cy18l6qbt7u9xhtdq4p7h0excdlomkb087pk76q3c1uvlwk88uf9ju5mj7vud29unixi6bavtmyfmjd6kdbbred29u',
                interfaceName: 'yc1wpjz54d0x6vhwfcml1y6pwhh9bdhy5ea5wkf6yy9vsawu0pbevs7l7ok86c5jn59dcayzo9r277lg8pfipxhd35h0nibher0ujgo4wcuxvu70ea2bgney97tw9aduy7i78ncj7581ev2bohylj5cgx07ecpmlx',
                interfaceNamespace: 'vv9lv74e4jd2mzkysm8mqcmxgyrniktiosxof0pap29pvmxne3vz4dq90m1wur5xnmmtmw062htu01gnzq0a3lbg2z4vehi6j8ualx25knuysm8c11zh65df8625f0fo8l2jwkzpiatp8n5z6kxvavn9t09bbwop',
                iflowName: 'eie2k3faaui4t806zdfzjtlgynkq5zkx95cgdm1zqfm2ghsolnhsg6ncw0rsvkbosaqpbl09l2d68flntnimvjl4ju8et2dzo2to1m7vssxjj8vhg2ztdcyth2gbtf0zkw3enoqv5hq672wyzy0pdc6pj9wb73nf',
                responsibleUserAccount: 'ffeykxw7xup11diaxnbu',
                lastChangeUserAccount: 'y1yr4mqx2m47ha2isso0',
                lastChangedAt: '2020-07-16 00:59:26',
                folderPath: 'lj5hylqvzdqileccxq1dihrzaxu8q7strgnqbgwome8db1hmknyuyiwd2w5hh7vkig8o1syhdp3eyt2oze7x6u6sqmnn8nrckk11isqs5tc0uw899c2mgr1ps9rg3jzgzvhyvieciwr5o4im3kn6780xuwan0qr6cl619af2z2mpc3518i3l38edwgm3wq9pu83502f4asv9ki1q3ozbyrc2d64pzxvdnl5039nraa2cd43itmlad4ifvcxpo0w',
                description: 'cq0pyiyk3pu31ek47unfkhbmfynhw0gl5lt6n8f7hi5xphvh7bnkafabc279idqw4tnoczlfsn5r9lpx0i3n0v9q1hnuerd2bxi7lo0h1eqird5g3ur22d9gpgcci893zdxppmd8pj36ywm8s9gtghaglgclit9sruqafsd0t310gnsx7uuz2z3jrrulauslzysi9diiv7r5mgyqaflwdcse201i0e4ypfszt7l7vvc9e2lnqeblklvva9kmymh',
                application: 'h0ixwf02eihmjc21526vu1nj38g0d3wzwu16zwtobtba5okvbi2ks5o8nfkj',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'eb72687d-b23d-43f2-af77-153dbbb6f19d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '7370121f-7db7-4db1-8d18-f949b51bebe3',
                tenantId: 'c13e8197-55c4-4a60-b7d3-5061e48f7a56',
                systemId: '6334b1ff-77ac-4635-b471-fbe50e95e21d',
                systemName: '9w3n58vce92u81yp62cr',
                scenario: 'wi8er4w24dexin8d2e1h014p8f30zwxcw8pn1dael0v3przl0z4hurqr2gk7',
                party: 'dpkqx9motzy1sgxjcd0xcdjlvwa9hj762w9xvwb8l8i7qk8rgfk512t19sdvw1p2qbos0kcnr5kymrg2fdu9svbeatroccn71s2lzmph3xyl5w5zjfngz2bp0nwab4qhtd62k4g7nnsf9g1coaomhuxwks6uh010',
                component: 'ydw0jtegfkhxk738l2y8ipwb44sjjenfoh8ok686t7prungc28gvutnz1fpew3j6vcpur43lweypavqj2fco5y7cjl0ttiio9khy6mi0orba9p36soq84rdv1hd5fh3gx45if0gxws46i95ldcpi7t2cd1v6pj0f',
                interfaceName: '3zvg2wxr5jo0oihrqie8ftzudo5l6wxeby7eno3ljicj0m0bb9y9hb2ft9r4nb9aosptumk7ai0myafv7a3596szqfdx07b3j19sqyaphumh9dpnyo4klm9cv0wqhmrocpewy9bq9iyfiwtnzij1kfuiyc2ed8wd',
                interfaceNamespace: 'kysmstctciln3nzn3pbkozzye0nns9jhubxrwgtte68mep6a2e6f2sqk8u4k00eyplt4akr5n1w6t5tzhgroy0qaywj8w6nammpcl6o9anlf23fj1j8a2ukg8cyt7fe0l37w520ppwrpxtiodq9604ve18c6dlblb',
                iflowName: 'vqmivp4j9gxt1vqn2q8hoslhakmt0sfmhd06dq3jmsmrzjjlv33j0mttcinq7g2g9q9vx9dnme1tiqetc55qt7vsny15njjvrcgwvmd87zl8mmcwm3luu9rr210yacwj0yunz22z3e1ptfh34tltr76l736lhwzw',
                responsibleUserAccount: 'l7kpqafryfhwshpj9s89',
                lastChangeUserAccount: 'v5jelun9czzkvdrz804q',
                lastChangedAt: '2020-07-16 05:09:29',
                folderPath: 'ybgijhvsyh3wwldqr1wtmjnbu3j0ya8g20xnzkgde2phr26phixyc0bv9dou0hxsbnyt14uggj8ov0p6bxkc45go1ki47decs9ncsqfieqbziuyx8c5459d8rh0o0purq7o8zqkgvcdagfm2l8cb7vo8vgh7kzer9r2u3i7hf7vdju7gn557olvxththutwfi5ffdsiy0ddil72bnd47m8t9wvmg5valw1xycl2uyd2ygfnb2nft1pmyh36u8d9',
                description: '0ut2lfxzmpsuiwqbl3j0fkv2vgry3upivcdc51j6stw95266vmytgx2mhcycfxwwsxi0nfabr9usd36llpa0szjdipv500c2anojo10bxz32imwszj2hy8hsdbor5zpjfmg2v2u0ffzligat59mel1eejehuqq8a55e4g852287pfzadgjg0k2hcuaq4yqchf2uudovddz2j1805r33i3kkkjjkzsdujeofgz13z16gf8gr6z3m595q54txd9o4',
                application: '9csh9cv7b0rgs2krgruexeqpzg5ih9yfvuftw0fgre0aubqhm9t3zi38upq2',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'eb72687d-b23d-43f2-af77-153dbbb6f19d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIflowName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '7370121f-7db7-4db1-8d18-f949b51bebe3',
                tenantId: 'c13e8197-55c4-4a60-b7d3-5061e48f7a56',
                systemId: '6334b1ff-77ac-4635-b471-fbe50e95e21d',
                systemName: '7gsb9om3ppriw9audn39',
                scenario: 'g1v2yqymviq7p4k8gy09bj8r8jdnwyk6xwn0ltk3tb7zkmos5jpiwapm3qad',
                party: 'aiqhbpjfihh66p8xix2u3h6sg5gj1pemf8quddfhd9b4c93ff1fhhjfslibv5jwdaf9s15xqqkml6jzbgsb52il19mts9h84d2epngn00izufxhjbs4iaq3xaf4yigkamhuzjrh1xtmmwieub7fwkssfm92ipg3j',
                component: 'wswmy5hxc4vuwqdueukpyk7vaws6g5pr4z0w5yfzgwy40i89m2mkmxjmakbzop02cfj363id8crywaagevvchhg9dgiozh2ohx5iujntte9ywjm46f2fx361fofw9d44a53nm1tksfazl9k7qxvwqt3gm7thk6df',
                interfaceName: 'ui4j4pb7jdx2tgd0lsef08imd6w6rluaeq9kwogl9852wrxf2pp2ukru50ypy2wy9wkli5mkyhank98zxvk7qbyw4gbnfy6qt7ou88dflqepy9f4e4rugev753ldbl4t9c2ac2djjydgq10cx36sk5noerqt4gw7',
                interfaceNamespace: 'klt0bq4ze5j9d82snn1day0br6xo5xz0ktgn43eb1e5jxmvkew2vg3jhelbloe0f2vcrcvxoewvqca4mwyc57kby28kliwu93ibd1nvgdc6cqc5e1bah1pxt1hxds95dg34z0s8a91qbfs62xznzttm4znm1zebp',
                iflowName: '9h4nceqtfhl7862hxm1let2xzv0purbmpalhr3bj2g5x3fn5jjawq6m4tx8dgvi1houk34gm5m5dvaqnp9r7th367tfd6e39hjjlkj98so99zek107srlze5x495w0l33r4twbs1glq3id8v34ool13h7b71nocpp',
                responsibleUserAccount: '9txu13pfrt8bwtyy38dj',
                lastChangeUserAccount: '4svvh1fo8220pa2xi9qh',
                lastChangedAt: '2020-07-16 17:01:06',
                folderPath: 'zxizg5ysid76x09knzsi0ug8hu9xubr58488gi7jxmgib0yfmvrqxlxy1nv2lkhwi5nn6uxc4bts9tspmp4uodixs4hrsvkecu2isgg50dfm8zejs2dyhf3re674krb3ity5pv0mjln4fq91dk9ibbdyfk8c36n7mbqtxz9qu1tv5ey0rrfro4skk8qac5l8udeq5lzbja4xw4mj0tisifxeoitj1ns9x1g7l7t6xo75yrd2twrd6z4vh3yr21a',
                description: 'sgbrjjjf4kdwl8moo7td38imf9cuh9rr71lyb409c65l2n7w9rotvyftnp8ait3e3ruv2ql2c0s5tzrw8xe4f3welhjylcz5ueiqg9zkaora7x4g6qru0xn8ro5q33x7bgqfebead98czlnquoynj80b37m04c4w8fwirotf4meouxlsl6e3xbim4t43xmp3ofn9xbmfc0wbrbhea0wpez1ot6pvttyinfl3fbznvalszkajwx2im12oqopjkqy',
                application: 'lkh85g6a2o3llb5ybwudvnoo4b2vhv0tvbq33jxfhrh6s43khcif9fck9ki2',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'eb72687d-b23d-43f2-af77-153dbbb6f19d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIflowName is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowResponsibleUserAccount is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '7370121f-7db7-4db1-8d18-f949b51bebe3',
                tenantId: 'c13e8197-55c4-4a60-b7d3-5061e48f7a56',
                systemId: '6334b1ff-77ac-4635-b471-fbe50e95e21d',
                systemName: 'km653zpewkvp6fvdl71p',
                scenario: 'ccadxin3a6k6cc9fwx1x1tvdrfzy0sv6u15f133v83tydh3dozdcbuys03fh',
                party: 'eqjfrpx6ov040ajnw5rg1ll3u2iobnr7c2bis2zhpln5yihwoum0xda5i9kafa05ybhfidhm4d6kk01ee1jcnlszeiai7y4yacvem7y6610jtyn80c6yuv3kw0sxbcgwb126bdn2k4n11nd5d2f8qzdvrejistq8',
                component: 'hhamd7g8ryk6vwc3n4a989lpjiam7r2f8yc9fg76iyttbab12109jpvay6zvvupr4h8sui4fnjza2i7m88uuzt7es1m3ulqz5hoy1886clcnapdtvkl3pbqhfu6m75eupnx1cyrx51hvmpmkxe9wt4vdxs58ov06',
                interfaceName: 'k35llyp5rck9i86apbwdoestmwzmwm23wdqvk3vckk5k5q8xyi3yq2cgsd8v0te9ch3jctnk2cxqahd3izq6xxba3mm29mplm8m7ap1f0b6uzzuq9ekzz5ppfdas4eh4dofwj6t40y7n20cili9h1afol2yt23ln',
                interfaceNamespace: 'i50ya4kon271jo4wbaug8gy55mnvtaqhf0bioe1y1zbq9hhfi9bsmyr607rxou86eref557z1v8we7wp588x65sg8p14jj5m8wrmtf5a3cat3a3eylcy4ua9ueyuof9hootnowitu9a6csdm6uq4f91htw9ntvlv',
                iflowName: 'hpopro023xjqpvns4ta8nf57qjb3wh3mn77g53fnh7ed2w4scjczrujd5u5maj5gk1zsplhy3b144m2kccspwtj8i0qexcvtu2mjko15mj0hoptmjhyutyt6cpt6gj8y57sq5g1a06n1ze7ewik3on9ehe8di8de',
                responsibleUserAccount: '74q6m22azryxf0mo7bcse',
                lastChangeUserAccount: 'mkztn9zbgl8yf2cd5gur',
                lastChangedAt: '2020-07-16 01:10:29',
                folderPath: 't0z5y2fiilr00ojslte1ogj7x5pb1iglro5d8gmrddmtyt7obefp11agb8xlwz5ss644jpvoh3fazb0zfyoplzqpgaugrj97uinb4mjlgvpr23tf8jxzxkip3lrjgr95mmggg89xagewkjzrxlsrrnn6380d0jv7yyjj8r12h2dxub9htv2et51ru02x1t8hv1yexsfh31odwfkk361j1mkpvmngzazlx7mse9qbzz3xyjud8r5xiy0p9vr64wn',
                description: 'sfl05rju6gk5xaxa12f3kcgpx7frbyuplm5grg8jl6hxfyv80ac6sh78i0aml0qdeky0mecyggrn23b12rxcpf29ym3jocjrrb26xj9lqsbxpcpienedxvltrpv3t7syh985biwjn7pr0y6dgvr4b01mqym7q1qaso78nlez1lpikiz6653m0fa7q4gii2a8y20lgx6h3lf5nceue9qgt40rkmgo121b9v0u6uvle3lzih0aaqqd6a0ny569yzn',
                application: 'lklfnwy2qwb33nl0t42fggpwngbe6edv70yo30fm27g5xkas81tzy6dm6pip',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'eb72687d-b23d-43f2-af77-153dbbb6f19d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowResponsibleUserAccount is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowLastChangeUserAccount is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '7370121f-7db7-4db1-8d18-f949b51bebe3',
                tenantId: 'c13e8197-55c4-4a60-b7d3-5061e48f7a56',
                systemId: '6334b1ff-77ac-4635-b471-fbe50e95e21d',
                systemName: 'q7fxrjez8qxyoev6jinf',
                scenario: 'zc2j6qg7j6rryb9bfby4cdk0xxghadtpndj6s8pkds08mejhzaoz87pejrwp',
                party: '4v7vwwmtmugyvdkxuhttl0s6qsnri5xahywkavz6ay2jhytsa4sx66p1il12zkbnl5bivfp9jtam6gna3cnmxdb88u8sguvarl0nzl36th82zhrxm6xy6ebhr4l8mvwxc1o54vrhh1l6mnaopbygxs69ihpxh1gc',
                component: '1c0ucqctu6lyhu6ki7zpdnj55oj54h4p34bd1d5fkc2z976oka4y7jovxk72c5iuyl1l9rfl4tur1dl85knydc8p7p25mhm1ubua20eigl0cxlhrybg047hg94tao9pbik5148n5ijg0xefvnhvhqho4tmo7bil3',
                interfaceName: 'i5sy5on0wm0jznenktdlqe1mf6tmzhx0u6kzjt54do680xheqsfei2boa8k1mausay4de4skfdh84ajtv5cg2i6vqk41dj5zs3sypjf3ohf8xct7i655slbe4se3c7azk8htgmr6igc85dzjmlbxb0d2tzrga2hh',
                interfaceNamespace: 'ezqj580rkliueuvvqp48ssjkvx10jg77nk84pqnehxeun7mxctfu8krxpohq789876h8cdl5zodz0jt7ybsnkbovl6ikbcsgapnyrzgwc4qkp5gghv0cryxa6osfof9g7cc0bb7srzhmwpoq38ioxl0xdb17a535',
                iflowName: 's31qbwc8sdkh0ycgwg3oogx5fz3zk97g4p3otx1avudyb532xn19e7a10ltzka1nmfo6rxgl3z2qmxr22m1u17l6myz7vlbv2gql5e8gl1x8ljoc45vhhqpbkbozu9dzg4po7mj25yocn3sztkp54ga4f50rc6q7',
                responsibleUserAccount: 'pvdfcda4ho2gj3s53wtj',
                lastChangeUserAccount: 'f921eds2to60j152yhsa4',
                lastChangedAt: '2020-07-15 20:15:58',
                folderPath: 'nbh3wryubmn210yjsq53cgc6stxkhj45282t57386r2ybjyh2azxbdbidmfycitvs4k1l77j9p449gpvw82vgs0u3u954b4hg4ztqhg6xwrotesvqrrzd7iiq0oh6z2e015q6jn74sssf54psvrroydri245rl0c9s7c8795re3h9bttz5vmh0lthbxx2tejbgmqz30kdw9dqmym4dsqlku9go6tgbift6t30n1h7y6hx244lldbr86i18cclpp',
                description: 'jypvyazo5q5j2lkb0f43g2cyk557ahv4xot2tai8dxb3i0tq7rhr60mkkp86h0y5o93tumlmscwvkznfpmmlq0ji5p9ku97javxxgpslyc9s9c11n824xgv5khjn0ourg44qe2zn6lw211izqgdgl6pc3d1dyztbtb46yl0mt63ltvogv2yzpffs76xd6mdlzdfupns4hj31spne79ift76tfeemjsqbcb6gb8mpspemgcryd56oxv6m02icgep',
                application: 'k3cs0tqcxe6t4ic3s6ahnau0faefvjnxdvghd9g94hsmo5dw7g6vgzm1z38t',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'eb72687d-b23d-43f2-af77-153dbbb6f19d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowLastChangeUserAccount is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowFolderPath is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '7370121f-7db7-4db1-8d18-f949b51bebe3',
                tenantId: 'c13e8197-55c4-4a60-b7d3-5061e48f7a56',
                systemId: '6334b1ff-77ac-4635-b471-fbe50e95e21d',
                systemName: 'm96ayqn5bzb5hxbqxwly',
                scenario: '8o2x27gepuv9s5w7rb087u5tvcsakaiiow0h8s5tmje8fwnvh5k2buzcwyzd',
                party: 'a8s2ck522pit5ienq2g7d37j45eoyqtp5jx6k1vp1une2stbx2adl8ab7qs8smzgxnv4stlrsicvzuc83fqqrkif4rwf3ndjszdq5gy6ot9zvxcs4q4efdb08jccvmz2imrbp98nfctsqd314y18uvyyv3c6doue',
                component: 'ckvb6f67hxy9p6cdhc8mogljdzwbl65danil98sxyabjkw47hzua9ib5wi2g0j6z3d2gqpfa3v6286b1c3qj8czlny6hqh550u4u0s4gcejkbhk8g0nj75etc431u9xfs6x4c0svuifmobva81kczy2zovb598lk',
                interfaceName: 'gdvkdk4lduf7m5bkt5381f16jip364eu1v4ve86ph3929bpqpu5buzgcefpzu9zauaqx4jb96831k0tmfloffxh6npkz8n08vwyc9ttbjyuk5crs62lrjhfu3lzq70unebxjbyb1uh3wqsitmvgsrn2a4ftiq8ya',
                interfaceNamespace: 'mpw29ybkqc45odfewal4th76jsiluynxjszmx3eje5999b2mbeea8a5yjwww22n0cl1o4n18yq36hcif7hzbqxillafp6zzb012fwf524xe5paymini4slcnlaorbqqiol2hsodoxbxydi4104zo7zs297xmwdfl',
                iflowName: 'syadf58yr9u6e2kme35d9qqhddjv159ry7rznxdt8ya4267c7nl4tc6iao8db2b83mhu90hwij5q5kd7ibu6kg43vol1ezh3f7spo00msgtmsvcfghozk9powu749qvwygoihpdkjioxtm58dvpr5v8aylm1jkyd',
                responsibleUserAccount: 'exe9i4n2nv0nyg9c3hst',
                lastChangeUserAccount: 'q0svxa0to33hodtjjk2p',
                lastChangedAt: '2020-07-16 09:54:41',
                folderPath: 'ztp59l5i4rwrt1i863iri2vqegktaw9oeg5nerz1dcxlk1cprv8zbw11l5hu6c3hba7vxyadn662got263ujp2ycku1xn0wd9yfd8dljq3cnxr24hadimox9cxzh9zluzmyk5oic4dfk7rb52sjpaormxkq5zjkr8dqz6imdqyvtrfhx11bmt7hac0zbcbszgy9ligi5j2b6lbi8q4yc7rw8zmv2cc2vrwaluummvql7ibq3gaetnaif1jp0sncr',
                description: '7bb606p81ngrhjfy0jzlsxdotsw1mc3fqxnc4odb35qkclovpqo8fwyxrjdxi44buotwhvbfw62bhiuoc5md065r2rgi7yx0vv8dfrbjlguac82x29sjqm7ntq04f09s86oovvudls22ffpgnoid3nxqmdmcttvthlo1kpdkkz8twr933uxas2ls00wubv4i6oebhieakueynv2ll4br7m2g5kfhsl7gna98j2locpejz2x768v9o6c3snt1jj8',
                application: 'f3l6zshynsmbkht1cnos2p2nfhtyjw1jt750oemxdxqyuneh1uvb8lul5ffl',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'eb72687d-b23d-43f2-af77-153dbbb6f19d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowFolderPath is too large, has a maximum length of 255');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowDescription is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '7370121f-7db7-4db1-8d18-f949b51bebe3',
                tenantId: 'c13e8197-55c4-4a60-b7d3-5061e48f7a56',
                systemId: '6334b1ff-77ac-4635-b471-fbe50e95e21d',
                systemName: '0yopqrxz0nfgms8g2qde',
                scenario: 'ph0sg7hvg0p57okla0qon1xu6xr1hhdn5el7icztoxx6il9i6763hnwcl1ys',
                party: 'fmv6lyszzc7ey568cqh1zshwc0irdm6mmtxjct6u30zv7y2snipsfcfpz8oqtr5226y9dx0mstqftpaz4pvgfisrjilus5903tb91e96behu0l2k44ysqg9th0l2y7tm1afhqo9epgqv7ge0u7zbgnce41guycer',
                component: '19zedtt8251eqgoe2v1yk05bap1h52jdw9z4ddsixgim3j00ig4e4xremeajaxue6p5jvhgks2odrj34o2o2xz00vryma6lwx9nit5z1becgmc3wnucq1hu4wcesezzdmzeg0ot2bestyfm48hqe0hrhmvqxfqjt',
                interfaceName: 'ctr0q26oaicl5jji9e115fvt9fx2udi42cpzx64vmzj3ajrdhinlag2cm6i069g5mu488nomv7dbtxy0edgchln8tqs6bd1h5xfgxbdoo49qvuhh13gz0kz616zk6vvhnh1vcfjs8swbsmbhtkltvwuk52ws76bv',
                interfaceNamespace: 'yyj7sk0fo0bhs647gs4wannhjzvstfc10d2wplpud9o1cac6k9iwizx59ovnvbizyelio8tbfc5fi7b6syx1tv4knhsiyt2busvmhf6hurvkaig30xlo8u3to5hs1rrvpx7wjwshgwbgyavrxks716cntjj2ooh5',
                iflowName: 'tcgri5eia4j0jpdhzm7soujg4qceqxk3c482n3v759ctclj3kvcbnkbsvc7ihdr3g7j46qby2kb5x18v6i5y0hcfarwb7czyxyfjahf3450oxa00c48lfs9zyn8qd4pok6yi5ro0o01rn4zuwuay0xkfzd2nspos',
                responsibleUserAccount: 'c0vx3y401spq01ydjz44',
                lastChangeUserAccount: 'zi3vadfwu0oc2323209m',
                lastChangedAt: '2020-07-15 22:30:53',
                folderPath: '9lvsz47lh10wtj2imbtqce82506pqqbzpqus40blslhvbc1hk0810189n1is032zs55brm6j4w4jug8wiosj0a2ds5wuklful0cume4910r8wruh76phn9m3x7l9z5i2qr6mn0qvomz5wsizcb1dvfnjq6cido8gp4d1dkq7s3i7h8xhjyezukws2yvpbaarpi7rnseq4b7kotq23tye6m09wxd0zol4v9whl2374lufdch2otyrppyl2l1jyw6',
                description: 'oo4oz3xuabc0ckv453xxqnxolo3y5h88uynm82bhd3ksndcd65oe3mhnr8qnbf13uw4f05xfk9sy300l3almt9akn7acrf2u1ldk05xggsne2mhaah7q7ikg4thaffbjtsytur8cmb7jj1pzqtzhmoo59njnfs32b5pjtv03lv1y9bmiio4smx5ec6ru3qzc0sfei9nqrviq6peizg7k4gt40dz4yvshdwy2wody2plkoqsq06v6r4qpypo19owp',
                application: '14hxiczi4is4n29lmfo3qun5dboimjxs0a15i5eronl7l1p9yfa9zwu2pcfp',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'eb72687d-b23d-43f2-af77-153dbbb6f19d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowDescription is too large, has a maximum length of 255');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowApplication is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '7370121f-7db7-4db1-8d18-f949b51bebe3',
                tenantId: 'c13e8197-55c4-4a60-b7d3-5061e48f7a56',
                systemId: '6334b1ff-77ac-4635-b471-fbe50e95e21d',
                systemName: 'gjemhvvi7a0nr0elo7kp',
                scenario: 'sxz58igexbywx4h1xvrt7i3nf8tojq5s9y1l4mytrwd6l35b6dp7n8mern6f',
                party: '80znea1kyz8pqjjrw5d5rovfwgnncvccibo40fc4brtrzupdbhe1w9l8sa6igrwlfzegseo3j6i75iifpeydfh3id6oyouphawqnqbr2kkitgc33qhtmueso14b69dzwbq7ztpskupkrb2vpm0j3rt949995iqmj',
                component: '4qw8itcl6ishs2l4363jewv2fkeyw596xm85nt4bfzokdn67rrw45xqivyvag36aafihv2nfo77xnq62568xdycxohnu72jmmik907ukazwusclpsww57ce80syh8up4u1dzvpjijlref9g4acdcb48nt7snfekp',
                interfaceName: 'fv14hj7nwl4hsugeuozu4lgtp71vje0cp5klllcj6srvy35nqd4cimcjrxxcnqosy65bz6neh9vqkkbjttmuk2wgk9zbo0nwezkgsedi9rggxofm3qscebzpt8hpn4jv63tsv4gmfmuffj28g2iitkanjnvup053',
                interfaceNamespace: 'qxa376hxx0sv52zgkrpgbljo7g5xwzfuk3esvmfbwwc6wwxx55vr16osgt46mnmwjo25kiluo9coknhlpkc8l3bz3khp89ywlymtlhoi0m6xgvq7784o6wkvlk0rq99218tmb1yewn0uw6uimh6xlr7nxv7gqhv3',
                iflowName: 'e7jcx7qfoo70qgcuo7oic12oapglv147u91oqap0sgq8b8bcp59vfrtm5f314qpsmwd8pgaoh6pxw4h8m5079esk8x3k8wjflafb2n91ww20g9zoj6kno2fjpnd065mcstohu7zhmvih20jtxc4qekd3yx0xsbvi',
                responsibleUserAccount: 'xvs6lk74d4ddofkb9oss',
                lastChangeUserAccount: 'p9nn47cueie84l7bfhzz',
                lastChangedAt: '2020-07-15 22:34:10',
                folderPath: 'nv2o78tnk4fz3dyo4ighgggqz9qmqx2x432qm6kmaea1co7ck5g64csd6zxqch6ly8f4ihaopl0zafxdrwngkce3ozv60hvzjlq854axdhxc8aev9dj8d8jwwhqsatyqqczulk1ezvwvxazi9h6h3lmb91pfpanp5ggojipg7fdrs5gjblnl38zjp2wt4bjhwx584jaezqldzvlp2jpuaxp649crhq8ofuwcbcoi81gxgnkanr7iuaf0afyj8am',
                description: '88cikfu0b1d07algi2vm6ytwfz78tmmhzptqlsofrx662mlgbhqw8z8ovqmydmvpsj3imicadzx030a3f62r016syjjumixxqiykgggzlbiyb6r92zmdoyi4o4km6098dfg4s9tomxyn9nqijvsy5ywldqn39ztnt7xiu7w217zgpojeypbeqw3caidg935icc0loshuqr6t6oeke6s0lgx3um1wctjstf1y2340lgk5qm7yfn3hxmrube5wty8',
                application: '1c1if2drderpxd96519lu7tgi6mot27blh2621m4lyqu7478ykn9opgjxn8ci',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'eb72687d-b23d-43f2-af77-153dbbb6f19d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowApplication is too large, has a maximum length of 60');
            });
    });
    

    

    

    

    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsCritical has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '7370121f-7db7-4db1-8d18-f949b51bebe3',
                tenantId: 'c13e8197-55c4-4a60-b7d3-5061e48f7a56',
                systemId: '6334b1ff-77ac-4635-b471-fbe50e95e21d',
                systemName: 'rgrxjlzfvv6ypxj3wl6x',
                scenario: 'tt2ehnx2qsftsbf55u4u8psuwuk2ffznrkiiu1ech6f0vjdflykioh63hwpx',
                party: 'gz30qg0aymyzimjdifngvxr5q2mtb0srmt9xojrladimtb68stk7ptacjvxfzjov0q2t9a3oskwzhq798s1h502knpuj673n3tekhmdtsmaf0hb6igv9rkfyg3ys8plyuewsc6ed8o0vhhxf45yg7nuakj0eij01',
                component: '79e7c64o8m2vljvmipostthrfs7022q8ronilld8apht06knaobkvufkfs1luzckkl7nz40rb8ify9aher711yjcbcm28fcl24w2ij8havis4ndktdo6etsbqcbc49gwxzr65c48wavzi32jugluuqf1uk89hldr',
                interfaceName: 'r5byxn05ce3ilnngsf6rtydokspbl5sqj3bv8ddua36yiqub8952vni9wkawmn5fvmzyp7g2zwdsf6moio8acb7vp124cmyz93vja24qsv2bledwoumjywr4zdvvg3yjxbu8jhkecjfhl1ro54bolb8aqbbiyw90',
                interfaceNamespace: '5rftni8j7hgtkxh5uqnc6p99a6fclmzvgq8hb2l15u4otrjwyyvzpnneien9obprjd8ax8fnw2yukow8vswc48yf3n1a4c8hdptarzgozao2krk6pkw73o9xp8qqn3ue9nnihfil3ptf7y6xoelrgphwv3r3nwnu',
                iflowName: '8zmc80lkgje91eb6mmmv7aofppe7zpeo4nbrdsjreo7jvdg3i1wboymn99yierfjjmc946oh1cvc4tfvtl2w69z2wr1uwqmsf22sssz2n4gbo0qkzpwtxq8irqklzq12kve3k9te5t79y4ovzh1zynt9p6i5hrww',
                responsibleUserAccount: '515rao3xcw2lckmdgn9s',
                lastChangeUserAccount: '1qe3pme4ffglc7tji6la',
                lastChangedAt: '2020-07-16 00:42:03',
                folderPath: 'ydur2b9hippordhq9bkurv02qe53s7dsbzffg60yo6yns0jelab2g5a4p0vxz3cabxnl3zm5pfpxnabzaweqmfewxoj7berjj0b3d6p5c86p1495phldd1g6i8f2w1vewi11iaou9kbxwmabkvwqex9t1nclbk2progltleyw43d7caqrigjvka2mx4rwn7jmk4xwgzzszy2ts997twr3kw2g8m7ifmjqeyp37xy11he9ksa3ibl9yeufc83cy4',
                description: 'a70i3i008kakiec3ygx26muhmo44h8lwfjoor6mna8i4mjo08i5c6c5odouqfb506quqefu8ytoz8ul9t3us8vop8ju9gesiadvs2uu793370sq39sc8ydc2819s7ijn6mx4cf0i7iflkltg3nmgza2x6jpayko61w81r99cvyp9levyej5vyyvqsbgvwc8ke3ziztsxt25xkeb58ww7g0fys4zcsxe1l7u7s224fy4k9k572toat3nu3sv0lny',
                application: 'cm086etjn99rzoppc25sog1c86ecqkrfy6w6dl18xsr8y7s1h37fsbfnlzxi',
                isCritical: 'true',
                isComplex: true,
                fieldGroupId: 'eb72687d-b23d-43f2-af77-153dbbb6f19d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsCritical has to be a boolean value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsComplex has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '7370121f-7db7-4db1-8d18-f949b51bebe3',
                tenantId: 'c13e8197-55c4-4a60-b7d3-5061e48f7a56',
                systemId: '6334b1ff-77ac-4635-b471-fbe50e95e21d',
                systemName: '9jl523ko1f8b2nmck8oa',
                scenario: 'stszibl7fr2n50xaprlze76w7cnzqu8bodkbxrwbru1flujwi0z38yy0qpxw',
                party: '7q2aslkpjjtwg8herjjyjggdg0fusgbujt9iqhk7pigqffdavuk9bpsb1s0bnzhaqs71qxbo9dlq04576uo1shk4ivf1ovjhjmoe8lyxnqnirhxya59mt1u6e8qofgd2tea9wezxbr66sesprhhv2hoxmfcyruul',
                component: 'hh3x804og78306qg2jcmi5rmwi5yt67q1gn62hdkgw2tkndwjwcs32clbf2d706yns27hc5pb5yolf6ih86vlvwlcb2k8904ps9w87ia83n9p7wyvambuw80ucxw6bdie6ykxrjeri4sm5vszxyx9hhq5myxd3sp',
                interfaceName: '8sltfulmjp9eic2sy3rcglye74rd7n6ql1sn52j5w11m1yt0bz8bot1fmw5zc4yr36r0zgjs2f8xfpi6j8h24nuuza0ordbgpfz0p3b9mds01v5w08rr1emlowlnlcxlydq49v9hyalbuflbxbzujhyja2r6kkwb',
                interfaceNamespace: 'm8wnv57ianuhjve5t72ytxhnqo4t887jmjxd03llobxel1ry0515ne4fgpvasufe4zb2ygt73n6gx08ykyvodfl29feo042a472ua5cpd5a75bhxndtvhhzej34h6nqcbtbdwj2uhnc73vqlsgftzcv8vxc7zejf',
                iflowName: 'wcfk1rzcjobt7hg6w9zo67uw9xygbb0fvpzxwxd6ofcq5h538f5r2rscsglmjwsbj8tv7ktwvqhr10fwtj4trg6txmepqcn9cf9lm7e9lvkc8tv4b6bd8lng83egwnnn899pehnclx991nazaln9zctxfc5ji58a',
                responsibleUserAccount: '2o8n3t3h0vr1780isptv',
                lastChangeUserAccount: 'eaf8a0spirp8whgeufre',
                lastChangedAt: '2020-07-16 04:40:15',
                folderPath: 'pjdo0uum5ivwvlkiyn8ja24ml4vhvf8aa5layal75k0mi72rpdhuo9ptcgzi56rwzx6sjysqk0zzcwizim55ismrfe3fyz8jwvn78mdj413sylbg7juwhqjw4eksmwj6bijcynt1kxam54p96gcphmwvkq96s71z6j1ouxemn9pn1fnf72im4he6icy8nhhgr49s3rdz33j96twj3zi27kffw6nw9k0lqa2rfukfff6uup03brshlv3j9sdihyh',
                description: 'iabyy25wxwfepbioeuf0vhbscq4fnnxupmvhwn1qz7c5p1q9h39p64ab95gdadkj0o50dq4n6lze8fbw6tzydf8iwj88kvhzyf2p9dtem8adlkrtpxhwiak6rqxvt4bje7tkgmhp60izzfmjhpocu1e6uh06z2fl3fc0bcisloqoouvzwpr6vg7e50havclvtguvclfeiggxiuer751o0cgt3318qzozn427we62t0r13qjix8mz7kppne8lb4l',
                application: 'prm3lyy2y1iu7yrika13fqfdfdm0pya34cn393pnv890v8wlah05x1h03t7q',
                isCritical: true,
                isComplex: 'true',
                fieldGroupId: 'eb72687d-b23d-43f2-af77-153dbbb6f19d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsComplex has to be a boolean value');
            });
    });
    

    

    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowLastChangedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '7370121f-7db7-4db1-8d18-f949b51bebe3',
                tenantId: 'c13e8197-55c4-4a60-b7d3-5061e48f7a56',
                systemId: '6334b1ff-77ac-4635-b471-fbe50e95e21d',
                systemName: 'vxoh2u5sw2d876cq0etf',
                scenario: 'ptzvcs2wrhh2e15byyokf1vdqrvydhigtuyji8kwz7vg0by6pnxqcmh2odur',
                party: '1hwpu1pt8kjlukpzfq4hnbfpfmd26u7dnlcovj12m6fwgdd6y3wf54u7gvddkrf19iijt7ycc8ky8aqee9upjzu7trnkh44eeveu0d7nlt3knpanjvyn14n2je5px8m1wrje6jg6a453dphkjp77on73p6if3xdj',
                component: 'jb3jynu8bc83se9myvcmuaa8yxxwwelc277dd19orxvkjzqe6r4cr21q1izldgachdh2nijq9gdpvfq18ky28529he7ae3baq9ibl1vjsrfoef3jg058wqt36y74hwyyjlwg4krijqr5to5c4pbtx6nh6lvnmxaq',
                interfaceName: 'i5g3ksq3z9o7t1ugxf11u5o4c9mzgshr9a63jsdhyfwexhjw7p2nx4h2ea11v0spkclsbrczunj718v99kt9vuclgiab3l9gc2o2bwg4w4umy1fc039rpz1jylbcdln3psjxmyrpad4523xet0pxs4aosn9484m1',
                interfaceNamespace: 'z444poiz0m5twgoxs2d4ptczndx88mnu769dp5v8f4in7ezhdc2zai1n9o0gb78i3122xuogm4qgo7dttmmczvhk7w6rj30b6528fxhs5egun3u8bo1k1dn8l9ie39tm9dnufhchpty68657hxupy8katx3meo11',
                iflowName: 'y03nhqzk7vbi2afqr9gx0cegmq6plorv75cejksncslud6vk8wcf4dkhej79qkmykr3xq7vspqz04ycnaqcmhtka2kikr0joll2azfdt3vdrb0ejzb5m1w2b1dor8nfg7mm0bgwujr48nb5ih8yhmn4htctejh7y',
                responsibleUserAccount: 'm82yueulmmbt5za1v3tx',
                lastChangeUserAccount: 'i08pu7t9yqtcky5wnspo',
                lastChangedAt: 'XXXXXXXX',
                folderPath: 'n0a1m4eb5yjyepa6mjpy74aioqnl09d8vcphktvgg307a4f2410gt61zpolz2cay46b6n9wp2gqj4ftfhsy6gx8q57o3jz5utax3bruq5kn6zctw72g2jrd4pycwdnx1upxrave8mdrgklxop9osn6yivsp648ehe6ygn4unhexd4ut78cki7qjm1cqz3j8k5ytke5ydusnlrycgje4gk8g2ku4sox305u00snk5bchsbqtddovyksm49911m9t',
                description: '7l8lxdr1hqxw1eu99myfmhwjq2pf8bbq8u7ygee2hyia1syl6hbo1kt3y0tan5z1g89mfrcrh1k85f4zocn6w3e6dkslkz5sep6rq3mftnc2fxg883v9kh3vifepu32pqywnb8nqm5ju2scz3dmscrp2e56vsfdj5m0b2hoqxqv80eu4hr6pcmam3jt1am6906s6go0x7wajdy2ou8k6lz2m463a3z9jh7anwi2iktktbryu0dw9xj4q2mxctbm',
                application: 'j7to5uo12mcemsfn9njk0knybja0r3yvvxe7p11k4a4qth1i4x4hw2dsfeco',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'eb72687d-b23d-43f2-af77-153dbbb6f19d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowLastChangedAt has to be a timestamp value');
            });
    });
    

    it(`/REST:POST bplus-it-sappi/flow`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '7370121f-7db7-4db1-8d18-f949b51bebe3',
                tenantId: 'c13e8197-55c4-4a60-b7d3-5061e48f7a56',
                systemId: '6334b1ff-77ac-4635-b471-fbe50e95e21d',
                systemName: 'bpt3esdph3yd7kgwexbj',
                scenario: 'jpzwln27z5m0wfnp2qxxjep5lfj7htslm290z5cud12v3z6fr0ena1ugh5e9',
                party: '1m2m9lplgi0wp4rv5h8fa6ynl6ygx0wah2m4m7lria81rtt21ort8ann3zggqft5ysv4auzc3od73cxvv206ick3u3h5aauku0ifo6cjlv9naocuutzmvegviur6qwr4rm96twaa4z5y9cnmwzj0jb2zd32j1cz6',
                component: '2cz4cbt7ioe7xtx9or7qxpw8ceeq5svd0msf4ayw0qrwosk14jhzk7bdy8oe9gh0uw9xlezcbnw1tb2qpconzmrx5wsvkz10tw4zbp8chioni4um5r3xwhd5538jor7a8af3ysrl2h91ozqr5g50pzkx421wsfu3',
                interfaceName: '91clqcj034s0y2lqf8oc38k7pnuvvqq4loe5h85z19ryuqk3119esom6u9qgo92weyggts2tsqyxfi8ld76ik1kl9u0239xvxov5eayuhw2tgplrvrkwcgsint5eap5z3nzhsbb85rz3cijrh4lu0imyoamazajg',
                interfaceNamespace: '7o5gbfqhwz6aszmv63y3lm7byg1nxnzkvqcqr1g2rmzkg7s2lywlagovenx0kg4m8tbk96i5r4s6bb8qzg2dagfpg75ld0my927mggvpoiex9y0fzq3etodx74lynesj4vvkzn00awb8fxego6r3q6gqyjijsznc',
                iflowName: 'tfzipxkgydwhgokevdnvoddcu6ktaaaqwadphydhu7wtosodx2yr5ilmuluzau3z4m0pacs4wa32b8pd6z2p6wc3u93a7hvn41guew8gp8rd4qzg49llrj7pvawu7ebik22d3wtvnh7v5a1mpqc1x92idffs5v63',
                responsibleUserAccount: 'ty54xp1jt8xju1g3x9o9',
                lastChangeUserAccount: 'ky24guyb1vc8e985huje',
                lastChangedAt: '2020-07-15 23:02:46',
                folderPath: '4c8inew30rteeubywy9q6xcx2qj88al0t21q5nig7gl92nhq9e0dvhv7oojasnxy4y6r9fz93fzauu6r1t8bnbyrp5diidxnahcupmy5scd4twgt2tl8kff030631knr5ce2ijthco17gkqf6kjiy1wisxlq3p9lti84y7x7bsahg2qw5plmngyptecxu5ciz0b1sbnusn3xfp934u2vbm9l2ii33r68t5umvm9c2y2dt96fbzslcg72oexb0qs',
                description: 'c047mid97rhmso8lh166zsk2kz2o5dapyumvklvfypowcywgbifpdhfytebavljw5ei6d21opz0tfrjav39cxnrd5dicohhke3x5qr7zn4t2yiakw1btcad53n2waf22y4kfijstdxxgguxvpht3gb3nwo07y4hg351r2d50xxglkla3le7271rtks7ui944kbpduofbevwo4bi0a5kaebmg2wy6pp8z5jamjoq7ebmrkaa6khwj8df0xvq16qh',
                application: 'ydndrbnbsiwkk27o4zyuvphzxlqzabodg2ua9amsx1p6l66cjlbw05ol4xky',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'eb72687d-b23d-43f2-af77-153dbbb6f19d',
                data: { "foo" : "bar" },
            })
            .expect(201);
    });

    it(`/REST:GET bplus-it-sappi/flows/paginate`, () => 
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

    it(`/REST:GET bplus-it-sappi/flow - Got 404 Not Found`, () => 
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
                        value   : '00000000-0000-0000-0000-000000000000'
                    }
                ]
            })
            .expect(404);
    });

    it(`/REST:GET bplus-it-sappi/flow`, () => 
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
                        value   : '7370121f-7db7-4db1-8d18-f949b51bebe3'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '7370121f-7db7-4db1-8d18-f949b51bebe3'));
    });

    it(`/REST:GET bplus-it-sappi/flow/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET bplus-it-sappi/flow/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow/7370121f-7db7-4db1-8d18-f949b51bebe3')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '7370121f-7db7-4db1-8d18-f949b51bebe3'));
    });

    it(`/REST:GET bplus-it-sappi/flows`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flows')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT bplus-it-sappi/flow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                
                id: 'ebb6cd15-ed4b-4f38-bf6d-5459a6fbf2e7',
                tenantId: 'ccdec8cf-f5a2-4afa-aa07-b3bcd10e9fca',
                systemId: '62c03912-9641-4bee-930d-e475d5e97929',
                systemName: '9omm0i4baxt38pvwmiyd',
                scenario: '47hybo9uzfrf2efifo77dwio2k7kuz9x0p0t6edmg48g2e86o9kcmr6kbxzl',
                party: '2q74293595xc04vt03jp4c8897lpr5kp71koq4lm04k7q2kwd3b32lo4c5wa0swqrahqdnyrhie9rf92a9l15egxy2k5euz2ykr4ykjik0utq8dwu922m1mdxj5c0qa6v455u785vsyz3un0naixqkriwqr5trsx',
                component: 'g4z3xsqnxyjxfge9mo6royyf5cl2az6ycikzagu1lhdd0fo39gnfg553znt70n97mivfwablyr9530z0lh6gojsjzqbk8zlxhyof05enwjwmhl61n1qu3jg97fgxrcngqdo6mekcbvpcbhau9vf1hmy9y074ec7m',
                interfaceName: 'zeid37m1g9nrakycd20dfo9kcadjuja8cge67vwftnp1z3tztuxy9pn29dt4xxymwowclmtmvvdtuuftyfezqsfg8k67bovzw918wts6kzxzzh6ztypsqylr9cd7ex20edk8gs1zfzw14dj9n3qjx5bxi4kzv87y',
                interfaceNamespace: 'zsiap3rpdha0m62y283anqu67p1rmrlx10oo5p3dv1wmn20jjcw97cdrgdijxc84ce79kw7b1ixvood0pmfbrpdb7yo0icpzbe7ncrgqvwoixcco8fjm661d915bp4i7kun8btukf6alt2vrcpcb0fqxeprom4lg',
                iflowName: '7t19k7pu7di3y6icb2c692n8nrj4zrib649l7wvjgtazhpt01rqs4h1jr0a7rkbbfpefn5rquxlh3q7ociccj69h4cvau14q5w37quo24ntirkokymiaihgjh7jfq9unohhcj49mzxqchgz1rcaeursmgdyhjsf2',
                responsibleUserAccount: 'o08zhxo3q3x3wu36aqzb',
                lastChangeUserAccount: 'v28fli03y8954jbldz64',
                lastChangedAt: '2020-07-15 23:47:42',
                folderPath: 'vq234063a1gaowrvubn0gsznhd15v42ty2cprgmvlpkfg974uzgdwk7kfflcuj78urtlzk3w8abb0fczelvlawp7t1dha84ukaz9w42zysv7pxb26fduy18c5pkad2n6y0xpd1k0hkuhi8co8jt8jt7a5rkncy9qgebp8uapty0gsrixktvndqf8visztzcia7asp2jj3px6m90mhvpqhy5n6uxajmnnxxum8lcw8vggvjbpfc7yhb0a1roiw53',
                description: 'fjtrolcn52t64w4y20wrh1yafaf26cfod3k0q9sm4o2h137pdheh5ebg91cbz2bvul9dgckvp0omv04y1ed208fgvza33cb9o8ow9thu539lpp5qrqx9u59i0qcgv81ds7bmo8zffrp733qz2hxlsxzmi6uzc0l0cezbo7ibjo0v7lg1vep0nqgohpagdsskhl93ljsd9nam6w2g2hfwjicz602x0a0zmgayqdpeoa7tfwbvpup3seugrmubr17',
                application: 'h6o47r89wgjv5irzrud264l6mgbkkcarl61nsrl23ooqrqhv0akn2d1mxc1y',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '8283a7c4-8131-4ec3-9b28-82a04d599fd4',
                data: { "foo" : "bar" },
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/flow`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                
                id: '7370121f-7db7-4db1-8d18-f949b51bebe3',
                tenantId: 'c13e8197-55c4-4a60-b7d3-5061e48f7a56',
                systemId: '6334b1ff-77ac-4635-b471-fbe50e95e21d',
                systemName: 'f74c6pvfs0i69oczsq55',
                scenario: '5qs46010t7cmsenn7n8j6tiqx51z7o51ugj0unu7kvsxncng07gsrwy00l5z',
                party: '54yjeoetty2y7777lzvvemr02zibg7he3zi1lqw7unjkw2e53tf2uzlrohcvgm1m54drhm6zkcg08zu2mzrz2ane33qejxzzkip430zsgfjxwclkp2e0feuhtr1fn3bxlcqolfegkypdhy5wfhgcur3r52vx6aup',
                component: '1erh2pr6cs0lvj1iy4yz9snx3ttq8b274sxuhnyw66saccts6mr74ons5nmydduflz2ez0rzp117eb3qkug9gwnx17ar6optxw88sxudxya55pioblxnkw5ymq3tmxdtodn76cz803f9z0lfmjhechihkgguv9on',
                interfaceName: '9a7febmvlde9jqdu4tugc81u05cvjyw51x1gcqo98exkldsh70svzw0km0x2vao7r6dkbewi0h2boi48h2xv8fk930anq7wq8ljql0n6hjwlnut35f5vqeqn1yc5bzolat07rij0pt0vkqxxpo1ghkfmel92qrp5',
                interfaceNamespace: 'rhuky020sicikpv3607swuscei7e6pflbairueg6r7v3vmp8mzi4nyn3cnl0s2aq7jw0q9n1c3o780rm5bodg9fvsph7dle7bpwoy5rj5wvk58klsps3x2305kopvleganwm715sjuy7hikofk517skgg05vb85z',
                iflowName: 'ogievzr31o2mo4qeuxg5kevj3962lwpps9b5n984xbzf2y69i9ud5s1pgdd8rxpn32ghzjmc05jcy66kfkk4r8k7intpe1s9z7mec77em62q213rpx600f0t6hx0ew4e334g0zxg3iz85j7vaow1aa4o4b7ysn6l',
                responsibleUserAccount: 'wo1o23dihjesx7jipcfk',
                lastChangeUserAccount: 'sw20d8z0o0465i8u4gyt',
                lastChangedAt: '2020-07-15 20:53:01',
                folderPath: 'zzlctt03ssp9fh2ee69r80rp1of2rppehm793c2xz9bsirz6f3p45t26up5lpvypgd2xm6ip4k0ztyqjrrthlqsbyakq3wtj954quep39odd2oti5xh8hz4mqswmstnem0520h0q8hspkw7i7qnx7c56bykpk6xqrwckcf9cf6oveddijodl9vwoisemi6mxxaow8aeqh9id3yosexpguxk0t6x6l38ikc17qrxh2whn3jgokctpdi88s99sb95',
                description: 'pj7ukpvyjdr8wpz3k8wchkdok4ef5bmynwctw0iguozx6hcq6uycthx91mes6dpbph3x4lo9oud0rsnf3wqkfs7y57du77oi7414p8qzo5ezfg67i2iozqynnckuuczp0updmkpj5pnupiffhb2dlw3s3w68qsjf39pp10luvi9k38puaeivg9tfrwh2zq6yf3rm6mr92lqyjlfj3satzysf3mfm8rzn9kz69fq73j4764lxx040r8r6xnwtx51',
                application: 'ihnnxb9s7nancjj9z1g3mct3almld74wbzvw6y7wewb46jifn2htttpmrfb1',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'eb72687d-b23d-43f2-af77-153dbbb6f19d',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '7370121f-7db7-4db1-8d18-f949b51bebe3'));
    });

    it(`/REST:DELETE bplus-it-sappi/flow/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/flow/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE bplus-it-sappi/flow/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/flow/7370121f-7db7-4db1-8d18-f949b51bebe3')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL bplusItSappiCreateFlow - Got 409 Conflict, item already exist in database`, () => 
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
                            tenantId
                            systemId
                            systemName
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

    it(`/GraphQL bplusItSappiCreateFlow`, () => 
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
                            tenantId
                            systemId
                            systemName
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
                        id: 'cd43c4a7-df52-46f4-9833-312739d04036',
                        tenantId: 'c13e8197-55c4-4a60-b7d3-5061e48f7a56',
                        systemId: '6334b1ff-77ac-4635-b471-fbe50e95e21d',
                        systemName: 'uxfkwi3uap7hc287xuct',
                        scenario: 's9zj5d236ahjerga7aglipucsfem5acb8yocf9q8usw65j9idw6f2q7kav0i',
                        party: 'xs5m6njyssqkoc6o6ags9yndq1n2l3qrrqifiddmfs7l2gqdmt1zv70qz0w2xfoh97o59lq22l3gahushjq5ukkrpnenj2rkgz39mbno98yy73emr3twaob8uicslcu193fpeki45bymwbinpicbp1eozr1jys5s',
                        component: 'jz80hda2bun58lp6b1217oail39j98i1g193tkgj3qb1kmki3r2alts2600l8e1oc3hh5dqchtjh8pmslpvwbho9pnolpyj2mez3zzw3liovp5jd9f4vb5jo30iw1210r70xh42phwu43pzmz7u2ecuf4nsi4728',
                        interfaceName: 'ish3byrqvv7wlyrw4b8uvhs5ial9d8a3365cetp84w6lw9bfzs1nli6bgjhrctvgt0bxo3fpi5mr3cgpxkb5w2977uc3l7aq91g4u8hohwpeqr04mtfq28pt4vav4gjnp9uhhlg76sp9uzd7oi9pv55luydlbeqn',
                        interfaceNamespace: 'rl3vy28hdonwubrvae2b8oh1cfoi9i4c6twiqb6hp8fxgazh9uws7t2e33sb94df8mp6gom9lt9656dh1seyhsyde0h17bqijg76o41mwxtfoqd6l7u3ibqqm8l3fvyagwgivw8pqjnsrhdcsnpiv03p2c1w50rl',
                        iflowName: 'xjmifwosnra1hbu6h3juv6n4sppii5411j449oj4nqlrz8yb70nx1wm4nkimpzikt2xfda512561h5lukc8snvd67dxw8x9na0xp4iysdkaojpiwvwg6y4ekqap4lrfnndafk4lzk5odq5yc40dzqyuel89jbwe2',
                        responsibleUserAccount: 'yy57by255jkotap0wwh9',
                        lastChangeUserAccount: 'b3wqoywa27248rylki6u',
                        lastChangedAt: '2020-07-16 04:31:32',
                        folderPath: 'ch9ukysq60tvhl74518p0ewyeldtu0degikl47depxs090sd3fkd7wzp3lnqfebns4ifxndxkaa59zzldh98q0qn1cnshtpaqsq9xa5h0mvanxlcha2my1e18l8uo3t3caoeu0o1bf8teyulaq5fpf9z7qk9iq1m3evuxwuto4ulk6ujz9zu2pd6a3qp6s55x0z23hy553t3095l2syllozafaohupxyg2r6aa87318giezzpt48sp2twsc8gvy',
                        description: 'rm0nbbtzwmy75judzhph2182rkzg2kcju8pfltic9y9vp4q1szevi29uqk6pyjxx84khn0491ivyc2w2m2muu6jkvbbgafvzyd3l95qiz1u43psulptbkya7j558unzbzn7v79rtqsf3z4swz2yzx343kq7uds9dmn40hp4119s77jy86rhr07ekbdreq3yc041ruuxxaz8d0od47ijesbj14abgjq3jbdg3kqwtj9gym43dx3cg71c36ekrdf3',
                        application: 'vruh9f957ekt7r8cey7f6xfk9980u814si9ncrm9ifj4txt0g9q2q9gdiswb',
                        isCritical: true,
                        isComplex: false,
                        fieldGroupId: 'eb72687d-b23d-43f2-af77-153dbbb6f19d',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateFlow).toHaveProperty('id', 'cd43c4a7-df52-46f4-9833-312739d04036');
            });
    });

    it(`/GraphQL bplusItSappiPaginateFlows`, () => 
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

    it(`/GraphQL bplusItSappiFindFlow - Got 404 Not Found`, () => 
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
                            tenantId
                            systemId
                            systemName
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

    it(`/GraphQL bplusItSappiFindFlow`, () => 
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
                            tenantId
                            systemId
                            systemName
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
                            value   : '7370121f-7db7-4db1-8d18-f949b51bebe3'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlow.id).toStrictEqual('7370121f-7db7-4db1-8d18-f949b51bebe3');
            });
    });

    it(`/GraphQL bplusItSappiFindFlowById - Got 404 Not Found`, () => 
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
                            tenantId
                            systemId
                            systemName
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

    it(`/GraphQL bplusItSappiFindFlowById`, () => 
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
                            tenantId
                            systemId
                            systemName
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
                    id: '7370121f-7db7-4db1-8d18-f949b51bebe3'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlowById.id).toStrictEqual('7370121f-7db7-4db1-8d18-f949b51bebe3');
            });
    });

    it(`/GraphQL bplusItSappiGetFlows`, () => 
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
                            tenantId
                            systemId
                            systemName
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

    it(`/GraphQL bplusItSappiUpdateFlow - Got 404 Not Found`, () => 
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
                            tenantId
                            systemId
                            systemName
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
                        
                        id: '907522f5-804e-455e-bdfe-76d2f82c7269',
                        tenantId: '31afef30-4a44-44f2-b686-cf8699766303',
                        systemId: '22f69c6a-58bc-4a7b-af1f-aa89a98dbd78',
                        systemName: 'jg41asklswsbe20xo3gg',
                        scenario: 'yw2j5hr74264nybdkonm84tuyo2eibkkrqo1i9d5otys3gki38xhx5no0x69',
                        party: 'pddk325mmqkg9mq28niy361753n1v8s9dgy2504ayp320k6rkgb96qlans70yrbul8fd4s7y1dgnrlgrkpx0xsk4wu5v0msocc4at1utvga4wcf4l2cl2iev0sljqljv8ju0d5a4r8cvnonw0h9uj35isfmql3t5',
                        component: '7p4ihv1z7k9z8geh1fcuvtn30hnlraosm0twvq1p3dtj5a98qqkd9d92qg2njnevenz98vv4gm2qh35q4j2svseg77tmb9rqie24mahezh1gkxc81dmlqtx2yu6ws9yb6i9wup0ww5ow31mgye5y52khcnwmm8ld',
                        interfaceName: 'xznfuzaxcrcdvimyt6n6qgi06vf44gsju3yknftp8zhtwzift55zlgwyb6bh6i7n261o37zpzvgcht1gk2y1tscztzzqtqqhp3b4zj0dxlz8c25ij3sh9bfftsmei0o89bewxsfyoakab5eowei3shdyl74bl3pu',
                        interfaceNamespace: 'g3hmnmmcvb9gfpedxkkta5uytacqht71iciil932wxvgddsmxhwzvrftiefbp2075tnyg2w41486d3qoke6fvsh0tmwqu1y47lu68e4v6j2ieayin1jwiexyuou7bq2oabjca2udj0xy8umytpt2uc9kqjo3yi0r',
                        iflowName: 'rmcb19er1nmpxx39p9n3vhya0n83hjnbs3avv46itm7lsqcmznp81op3p7e1vqmr4h6vh7nye7usj84qmc9vmd7f8i64jnza811q4ca7uy0h8cgw301omelc2gkhvngihor545jnpfifno0vu42sbtb5dowev424',
                        responsibleUserAccount: '7ymamo48uwzvu2yxp79s',
                        lastChangeUserAccount: 'otopd6sxt62uyvig707p',
                        lastChangedAt: '2020-07-16 10:00:00',
                        folderPath: 'tic9mvihxp4yi3pmoxwla3ahlu6ooy7n9bnk0e2f3er0cldtwqy9az4gyq21e1eb005qelnzivbcsb6isxzgf2ze18r5dk1rv5i8rh10s0i52lbssdrb86h3b74ygu4i0fpwnxuv3k6vz9whap4iukj8ug37kkjw6fxylu4ftm1t6wo6jdfr9u9sjh0gbv2vtmzktatgy4bfve13c6if8idki0gwug8ubwfcjbmeioopayt3qr09ua75aguq8yo',
                        description: 'nhrvjfh4jkrsk4zh9bnrdmxbg9r12hw4aywzp7b7rxk2jup1ku0gg9f03zxaoq90x4hj68p6qa9a9elkuzqen2gl5x6zwfebxpoxq47uxv5vjdk6ica7ihv8f9knjs9ks9erpyp7c5viga0bblwlde8mol3d3k3p04vqztu9j4hvmtrma7tf7385396c927571m5v72b62572qao5ijr5y1aw04ki5rz0wv8ltdomfz1dl4z9lgrltsa72nw3lk',
                        application: 'd1az8v6k6uhzjrwd0v3qcu3scvlk1v022ggaofzdwtek6z8mglebxzrw9i7s',
                        isCritical: true,
                        isComplex: false,
                        fieldGroupId: '6796a9a2-61d4-4066-b602-f0605efed2c6',
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

    it(`/GraphQL bplusItSappiUpdateFlow`, () => 
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
                            tenantId
                            systemId
                            systemName
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
                        
                        id: '7370121f-7db7-4db1-8d18-f949b51bebe3',
                        tenantId: 'c13e8197-55c4-4a60-b7d3-5061e48f7a56',
                        systemId: '6334b1ff-77ac-4635-b471-fbe50e95e21d',
                        systemName: 'ye0x3nktcsimm2ciu9y3',
                        scenario: 'l2tvtzi9l6xoaqzne4xwh2rb9v5sf32suqj2m49m52b64az7bfosu85kymy0',
                        party: '8aelxdnmki40lnu5psj48imvyz6yd8p6a4m6we080nbxgkqdp40rq71ntiw4a4k8ktm4bp4w0egmjib9jpffpxzohg9z5hiilqo80n661776it9e2gfj6fbv2ue6czk0d5y36grpd6p4bmac5j3mkbj9umw8jfpl',
                        component: 'mlgzmkt08xxvjf5tuwghgmcjopfpg2a2j16q3x1nijnwb7a0w0lm9bx85p5fyrd32j9jgjlev96kvdwkeqxtr2lgdex6etkbvsrguv2q4lp6szx7ft28zcqa7fzadaqckoxvhbuwz8efbgv1pokg0ii0pi85s70r',
                        interfaceName: '5bkxac24zv9mgmtfhs49xhe05z4rppdvndl0co776zvm9ueqcjgeej99jrd3d4g9lqlfoflgptxkrw7bo3yd7z3p0pelim7up9y5rkxdcr2nf2g3rrw7jwmme14ps18dqscm0zu20fucdnnlo131n4q6d1itq39m',
                        interfaceNamespace: 'y1987q0cgcfkcqrv6pw4fs4jumhm0oibnxubiy9grxgd1e1e9njib7ddp39bij25danfx5s3b2ye6u1z1gycttnp9z691bahv73ain99kye0y27mpvi0t8qo1bzwzzr26tav9edpfaf0c3hy32pxs52lla2u9690',
                        iflowName: 'tlvaeyk8027f85g1jbmyw4dcwicpa8x78uqen39nsj4pkukoark109c7lkyrdqafuyupb6hqcdf2e4dgata4yphxf9cb0cfgzhnfykwrxxaz9sxwi5os9j706j5luin33gxfrioyxmqwm79c4v6zs3sej61flce0',
                        responsibleUserAccount: 'xnacotdqoqx6ov9v7gpo',
                        lastChangeUserAccount: '18fjh02hnb5vmnno0lsd',
                        lastChangedAt: '2020-07-16 05:01:08',
                        folderPath: 'iaqkwtlglcnlypshq44rt6mt6l3jpwpqy0b0abinznddq9d6vpzt9r11b3ycdbqo0rhxkzlmrgbbmo3h28a8lv5nvl2jtwa7yukfxzvlaz5nd22fuskwj3ajybqt8k6r36g9ckqpmurtoa696zlw5dd133dptm0dh33to4pm74q4s3upbner5gzqjwx5ax4s7sb20xe1ejmy8v15xw2uss8bw8ojr3ulj1g76evdld09n2yxbbc2zvzqtrv40ch',
                        description: '5ynggxa8x960f743apgksjnvxhw8uorbk8j9uelftl8jbkhdjbvxpjubkepz8ay8l8nks3keoz32rey08c9kpn4ttlcvwtzy8tycx83e7x1cconqhuutiflaj0yns3f89272qc87b9h6vl69dtnze46d3izewdb5ossyw4uehaur5dvj33hw6r07bmqaitcpahyjlmo2mrqu3s3210vjd8k8vhpaeoc475sf4hc1dvgx6m1qjuccgikpsfabod2',
                        application: 'eh6cczwtlpejs2wgv9lkxnstvobsrdejbjo5c7zclgi6ecga5zu4aaxdlwy7',
                        isCritical: true,
                        isComplex: false,
                        fieldGroupId: 'eb72687d-b23d-43f2-af77-153dbbb6f19d',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateFlow.id).toStrictEqual('7370121f-7db7-4db1-8d18-f949b51bebe3');
            });
    });

    it(`/GraphQL bplusItSappiDeleteFlowById - Got 404 Not Found`, () => 
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
                            tenantId
                            systemId
                            systemName
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

    it(`/GraphQL bplusItSappiDeleteFlowById`, () => 
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
                            tenantId
                            systemId
                            systemName
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
                    id: '7370121f-7db7-4db1-8d18-f949b51bebe3'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteFlowById.id).toStrictEqual('7370121f-7db7-4db1-8d18-f949b51bebe3');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});