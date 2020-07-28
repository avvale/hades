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
                tenantId: 'fd68f554-6eed-4217-970f-0bfc51a4c4a7',
                tenantCode: 'lepyk054yiamvf4e2pnww653aubje0jxrt2uq447dw8ijyyynp',
                systemId: '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c',
                systemName: '255d8bu4ss6jzuuaa6pj',
                version: '9ydt02sphngvn3pg1fr4',
                scenario: 'kwynx9cbq6cl753td8opz8xqrua77q5726rejf686wumvkyclqjfhqny3uul',
                party: 'reyv3o8vzzbtujxhjqpul9w0ir5jo75lxjuo9tzzfafy0bk07z7fbzrwps5utt9d5v0idj540dt27iiwrugu9z3vllrlzoelhogmthbjcz1ztztrb30rchx13cbwxh5s3jkxjdb0fjx4fuu32pohveln0i7zttlt',
                component: '55fa2wcds0ch8fbt92bxmhtjb5z65ahfub0cnxu8m1pk6u7b1ggdxt88ka7nsqxsu38n7u3o4qjfus6pocki194q0eer1r9rr15vqfx9ffdeg4xf1smjyw0fnrxin9pf6nn9txmiarzvdlja9ynwo7si0scv01io',
                interfaceName: 'x2vbruau25420vcaa4h6l7wd0q5yu58s11v8t2hy0xleg558lqsowx33lir80vrt41m8c8spfrtr7zimred8m69hkljc0244x5vdfmi6d6du2d2b9xmo7xmf9cvhsj7w6o7thz9g59mckudnejwvuy6yiqxddasm',
                interfaceNamespace: 'wf9z4whxuiyjkb7pecrabyaykqxesbhdv2t7rchdv9e27eua4w4w0by78639any08wxyqloaz3u4imxxtla6f8lbne2gitoyoxtiyjvf4dsb6wgbpzyzh1tt8owho5egfrfyjwjyka8z7huimf2hfh1sd6urw64h',
                iflowName: 'fm7k13dqfpsqi92i0a7ul1zojzbtu0weqypwajw8h556gkbonnrkrx6vrnopy32yxa1ri66cz81w2h7a3ayaynmsjeld9e9wdbkfwcnsruce9ivvdhyol8bwfbgp7x6aa4lx2y7yywjq2ascq0kdri0slavfde58',
                responsibleUserAccount: '4r93i333g4gt2tsay04s',
                lastChangeUserAccount: 'rj3i85j4lgwj0vhl0ria',
                lastChangedAt: '2020-07-27 15:20:54',
                folderPath: '1lddpeb7y018oahviu18x2fbamew3maa4ft8n2bkf6jndpg5sbxr4r8l7haj3fsimxz1lun4v8gvo1ucve6p1paa1wsefcos2aels1wge2bntkziv5c0m4232x22nbj8sc4p0vd7f3fia12pf153qka7nmcrucsjv4k5654dfy51x9xvrtrlukjsb9cdmiuape782guvygf5idt37ubale9yq4ny7d4aqhi30s5ebilssfqo89aq0gve9qy0a9j',
                description: 'ghm5t4meqpqz7psosongpfnef46az7kqpuguardsydkomq9bd79vx7jf9fllbav7xxmda0duy117zdn8u22xa3sbw5crl2v3lndmdzjkfunt056m5aqn7msf488742kvajby4g10nit41jqq87rcn65puktupqun29dr79ea6diy8ox35c64u78m2jgglunzwe18wru33jjxou3m9arrpfisr6vtipxrnqnfcgn478oj0kep2kbf0hqa9gdr54m',
                application: 'oo15kxiidh2j8ft7hxr04vp5us35dnwmiax9bnqsmnukb3bgs8gtn51yu04o',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '2e910aae-f108-4b9a-81f2-fdd2bfe96927',
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
                
                tenantId: 'fd68f554-6eed-4217-970f-0bfc51a4c4a7',
                tenantCode: 'o1ey1js42u35i9ih690ryvgtpb33rgk3mdakdtjnkem916xe8o',
                systemId: '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c',
                systemName: 'tsff1f59sursgejp9xju',
                version: 'kn5actbaoa5llcdfokxc',
                scenario: 'bmmsrlfgpilxvwb37jecaqxzzduzbzv0wrqxq886f2q94g1vvm5p6ty0kyxn',
                party: 'e54dalutcb56orsevou23qnj7zpqv6vdkqrz90ef3i3h5tzxhm5iui54fgufw6jt4rn074hdcd7x5zwv6a2vl1ug5d90e17i4o77kl4sklnkbqnah0co8zafpc2bkekgiw1x7w1oskz0eopxtzyxaevri0ov5r7o',
                component: '49g9z1axa75hk81vczn2renq0ca3upzj0dmflla644y5tnjsvj2jxo4mixuff8w6a8pct4e55ihsjoozk6xz4tobso2a6bck82t454vtytotehe2jdy6ioqeqpf4w5dh1sntcfapj8e2dq1g6yo0hl5wtnt3b3jg',
                interfaceName: 'tv7foujzngj0g4s9kniewdhg8twdgaxtywm1ssb7505asclminpy879ah5ajjr3lgyxm3uualm8lhyhhk3z40i5g4bta7h0y3j5wc3ekv2ee06707wyfk6zx0ilyi188npniue041xujxay9yvl88ylklmo8sh7y',
                interfaceNamespace: 'nu1wqhvnzi2zkau6umx2ojiypwjk0fhcx29f22vo2hqm807rvaraynh6x5huo0217h8xngi9h8gdbysu7p3nyvslaevwrv269pp9ok5o1t2dsxxcraq3bimy5i05rx6njye86tgg9z8vrbhoq5da22fsdjuqa4hr',
                iflowName: 'npub05hg3ka75eyc0mvkpo21qzdzr7ee172znpe8iv5jwkoxy5nas6uc5ebmgbw0yh37tu9y5exwt24m2nxzq2re9nyqwdey1g91uuxjm2miul9tq8yg6hbfij0xs9g2dg3t5o4yetyjjeihx2aa5bx2pfmwq39v',
                responsibleUserAccount: '63nxowrwvv58tfyjc0w6',
                lastChangeUserAccount: 'x51fkytli69dj1l3qrvd',
                lastChangedAt: '2020-07-27 21:10:41',
                folderPath: 'vrk1x5lg3hdszhpayvp14zwojd7h7pmbtb0qgi68k6n83jv0h0lighe9ckinxt2baokay3b8p5x2njwhzpao9x2lzf6ma4x0bnkx13gun3eibcqm7a17ske14sd7k1tqgus8lsqwll5zt4ylgsd1jx9m9omhgwbvvj7noao0plvu8kz5dif86ydvqo2jpyekxewryfcy1inc6jjaufig6d8b07pq6cd4yu065c0eun6nfe03yflo79ffta5pfj8',
                description: 'bavkd9kstebjjkxui75s630tiw3l1042mhxmejze9g7cztjf9ziv27r0fd56uy34qjlsv5gp4xrxxqh7d7i2oq4xdk69bm3dzk48bf5xradpki6ongqkksev2vcfcfvbu5pnn578fefn2qhcd0lugll8z18ieq3t20fwfycylznij5cure69x5xzfcjuq1n14qxjtbddaqd1h5llhqwks3t5k0domnbabz9n8avoyoqyesbdvb83a0qv1enb7ka',
                application: 'ept1d03exxufgjigegytoooofus4qtl39v9w24ht9zchhloi1juks3rcrs68',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '2e910aae-f108-4b9a-81f2-fdd2bfe96927',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '1e830191-6cc4-4500-8bc5-1390347b5b98',
                tenantId: null,
                tenantCode: 'ms158oxtsnuv1pottsgs4oahczz1ellpfc4m2qhzic8lgklfw2',
                systemId: '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c',
                systemName: 'bmf1ny5774nq7jfanyvs',
                version: 'hix1l1pj7k12fsniamao',
                scenario: 'uj77pxr5d3kr3mg8gvisaqb7pe5ygprmppb0gvnm14li7yxy3ac8eee892bc',
                party: 'uqse72gm8cwpoq97vlo5hq671os8uysjrrv2mq108wrnwx7fcbpufu23zzs7exh6g7f1m6eno8jk6lzrzpudv1ve50n1um2bdned6ohdsyk0nc9f4zsxg4d28dpexycteokjy8qcfdx1jt1i0cr53hhzsd72kpur',
                component: 'r4goo6bleyw9kjv2z63i0xa53w59r43cuo2crrj3s05o1z1f4ggbpybwtyh5qinlhgu8tvkzkmzt1vaym1xpbod2eodmozkh3dcgm9hhpzr88snuh8au5l4z59xp5enyp79gom6r1ldle8a75fol5fqa1mphxhu4',
                interfaceName: '70xll5u8b6rl4d9c5shj85a14zu58sqroccgqrld7knohkt6o4wx4q8mnczwtzhjromkdjraj44arzqbh04ecwb5ywdjb17vxjxvu676td64bev78jy11g91nmwh7mnbw8tzfodbm71inbbj6hq41fhoxsz6z483',
                interfaceNamespace: 'dr9rfs2gv967vg7de6krypbxdgkml1hwmkilx0tdsz2a24k9i9n0ui0zs0n223jxiz2u4c5dyl8q74a8kcg48vap9qalyucrlnqf0j94z9zq8v0njw5fcasljaljsocr3eoyhq906fp31hk0jfj84s2rg990m5nw',
                iflowName: 'qmfcr7enmufbrnqxjy080c06jszdma9j50ucwrgptyh5wo6tpwks2i11zt6voz83i0bge1f73eioyy79c19swnfg2bj5e37kre8bumnco8ytm1hnwm1t8hmqo7byioseyodmv5c02kgi6ilavne6dvhzsuykgmbx',
                responsibleUserAccount: 'pvr2q8uya7c0tmfpmhuo',
                lastChangeUserAccount: 'v80robha9sumbtaeiva8',
                lastChangedAt: '2020-07-28 11:16:13',
                folderPath: 'qutvso1mywo7ruoa45fxtldwspjhmbtn32s7yh7z32ozvxgpoxlrixr4l47uz63nliiasbcomz0za6idfxajrwkbck5rkiv5t8cimkb6ahq8rhv6wa3ahrmjeuhnw9obu33v3e9n70n4p4e7mv9mfw4tw3mbnufowk8qsatwbwrk2um5gmo5elyvg079xwmkl6g3pdfj2d2j0pvk9puk1dz0b4uvg6tvbm2husm3zggtmbs35jspad0brnqrr9a',
                description: 'kof579l8wr7y5vgr2da2fgjtu63sqqukslbpjj3ltx1ggvt7lri9prr41fehsatnpzyrzipct1s20jjd70mk1si2e0q8ya3647au9k7hcfrwllv74f66gyd71cm5yj0bg5ct79dvug77vicdoluq33g4vtjov41r198r8lltoxfrseqeaapqflafkscr2stvull2z0di4ckc9m40i9fdti88mnj1ektoj9kxezh8fy6tjmygcngzj28ih1d09ao',
                application: '5uhr5dper3ps3zl2jjyrwk5dse9vmoxna0v90zn9l53rxpk6s6ffhzppw2np',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '2e910aae-f108-4b9a-81f2-fdd2bfe96927',
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
                id: '1e830191-6cc4-4500-8bc5-1390347b5b98',
                
                tenantCode: 'icbqd8pw9pier1d3hi7tkmgnaz55w26huqvpje3gerdh37oo5m',
                systemId: '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c',
                systemName: '9rdmbcrwsp8zt2nff4ej',
                version: '0mav40w0urwcqmnbfbn1',
                scenario: 't1z4alzmio3cwzsdad31wbswxqb18m9peef2h425wpwp9x0j5f4qytzu1s08',
                party: 'no0zqcj5kbubr328l1d58cnrve28t8xbd650u3ni6z3nerufljk261k344q5g3dnttd50fj98fems4xogyuc31ltrlkx9e1silsjhpkwiru4mrckjzu4v4zpebl7p9s9kkf1gthdm9fy7d2v9x3o59jd2ccjqe5s',
                component: 'j3lclp63f2j92u04u5qt9ktj2obm80jvm32lqj37reni04xqm7i5jnrtjzl8g6yycnqdz3c3ca1s6ltydrr29c5uluxkea7d7ri4r62vat49dasksfn1rhbhqpn5ql5ssqdyl3sam0suackxau0sv8dkg1lkrq2c',
                interfaceName: '9ezh05qaye9writwj695qjy87ii4zjw441rjrez60mwjhmr1jxy01csgdxylar2mbef0k5j1u98vw3ksl5y5swr8fkueedta0phpov7kc90fe6yiwyh7bgn94kmfwomrvsqjro836qbsfmqqh2vgeqp10wik39nf',
                interfaceNamespace: 'e60aqhzb7960z3y16zhtiu50er5wsopvky2cn49eaj7p7tbyzq2hhxgnp6kycf93qvggx8p8dqf9eiz87md1imcqmosja3awjbtf4s3yuu9b0l92rgrp6uzwzw4pm838xco792ljp7v93jf1fh0r5tlm3p0qy4v1',
                iflowName: '6txts0trzitf10uzteujlxfzx9cc8n3u3yv3ec073owm2t5uwpi08ksot9j50376fe6wm4xvhyahqxnawsaootel967kfdzrffsy39dj174lrn9u5wko55vnoj9h8ofzbe5au2vtrzs4802x7yp26hegdtcz29o9',
                responsibleUserAccount: 'e2zmtx6r2m1nlqr03phy',
                lastChangeUserAccount: 'zufn9sdwj7fkcg1y11q7',
                lastChangedAt: '2020-07-28 00:37:32',
                folderPath: 'pznaj5ampbj1b1jkkafvxuj3qoadb8papyciebb5jfldwwcczvc1pxzrmxz039qd89wxjzrqapternba5zwuq4sr9h17sqbd0n75hhzlc63d4w80czt5m227dc9bmrkxj8qo9of229pljlnq7bsz6famntfslhf0i8gg3gemm8t6c5tao1hffcv9m74a17gl439fmou2x4rx4enin2offxj6003xt0snmu2va2mfbu4l5rdk59emspuxibfjbqu',
                description: 'pu1eicqhk0gn665zi1kkzj22s4j5ao5lvqxl6la09rdiphjxpargphri7bnwfqdcumwouh1mtkndn5ugnna6n39e9pl20j9uz490ffsbgu7dvf5csyqv2yqcof8j6inm12wg196z3nd9tr9ybpgzbkuclientbo42kac8iyzoxhgajffvpfc5mz0xjdi6bwl2iravfitle5nmpdcl6ewdgpsm920lcbezxh0fmdsx1dnbcstbruc9kvu1nf9mai',
                application: '8qsgmncdfzd1g6brofhg4r2h5hvtlfula940r2oi30t6dstpxjv9l5ro020h',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '2e910aae-f108-4b9a-81f2-fdd2bfe96927',
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
                id: '1e830191-6cc4-4500-8bc5-1390347b5b98',
                tenantId: 'fd68f554-6eed-4217-970f-0bfc51a4c4a7',
                tenantCode: null,
                systemId: '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c',
                systemName: 'cbz3t4yzjvooknbeth97',
                version: 'fcmuopox7mn7zrbdqk8c',
                scenario: '97j7hqk79eo1qwgd1fukv9k2bv1z5w504j3y1y6ytrehyb61a7n8ry6e2x6j',
                party: 'nxyde478wx8mk2i2lyolt4mn4ob85slii576is7muysbtsgwokjiujjtk1sdprqy0kv4p6lu3942azxnq0rhtl3vbp8bptj2yzx5shfmpzvhptqvk42qmz82tgalvrl2uiycr9gzzy4bgvjjhpx8vvhoaa45n1ni',
                component: 'kk0jp026cw751uouna4xe5jeke2zo7qy78yul8psnsdhgiu8zyvofrb5jxhh01esbbrzsde5iorqh9ijpvoiip8qf72r0b14c09n14nv02n46w6l2389ewbalkow7t0mxjvx1d9w4x1hngtz3myqnafv6q69n5nb',
                interfaceName: '76sqemx2o8n11dt758ftxju04323bnjg110kmbk1463ry40k7zcb6gv2se7ydxlgxaj1rvfle0029kxbkwu7jlqu7xvkz1qmohm0a8imcxfu9t0xsnqhtukwlmi2w5wu1szxj5i7hlnou8fcmef6tck8qpuohpop',
                interfaceNamespace: 'nfpscu3sjorc3nbnuxw1wahrqwl3v0l7m3smfiu27ecsczjk427y5gb1ahriga4nkg6fp9m376m83okkfbn4n62r71yd7xd3okz3g8jtm1winxqmg06mor3slk8sa5dea3ddwmm930o4m6zvf6bfu5e7j6fmt7le',
                iflowName: 'ujdqknc682g03njzicng65mfp6rs0bl8chlboa9igaqrbsujztd1nqc8pnrnoawg37eop1q3o282f83wzpart59nix6a94gh0mew6pwida864pqj0y34bjdocdxgj4bnsjqabbmdedx9d80autdjh8tmdj0b6axy',
                responsibleUserAccount: 'dsimcl9wlfq1g4ioq5tb',
                lastChangeUserAccount: 'neh8iyd8yos53biywuhl',
                lastChangedAt: '2020-07-27 19:26:30',
                folderPath: 'urianvabvbut6lvgchg6cajq4dybpz1h12mi91lxe3yvx6ozfhsftfn1x3409tqifdln0yp92vnla1504w7x9xtgxjyx6vtbcn8gpd54apwcajvxyth3alpyjdh9jyaqman11ko571pn8pt4aqtg6lprm8wpiw0i971rrcg05hp8ggp6ur6uwd3r3fcrbmjwmb1arlgl78r0e09p924pblwimd1g25pokq9etnrm8o1plbbwotn707ixw5o0ob6',
                description: 'g4amyycxjwh6mmegl3la97x2lb5moek9qms54myvmn9tlfx6dncx9k9379ao1z5jc3hcbwpk8s8pigq9ltkguwzu0qwk8qcm78aa1ot2jhbg7gsicija4916eo0467hton5agzrxlupkydv0rzdb0pe0k4xg3cme541z62wxngjg9jaeuzk9k9deaggv6kamo0wdbseozgxsni2m4hcaf5bx75qvbjf6skg8i7zcrhp0lzwcqymtaeixbc7ow5g',
                application: '0ctbm0vhhexddrf3xnhrvlf1idgamu2t4rv03iiw8w469tkw1mai3eips5ny',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '2e910aae-f108-4b9a-81f2-fdd2bfe96927',
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
                id: '1e830191-6cc4-4500-8bc5-1390347b5b98',
                tenantId: 'fd68f554-6eed-4217-970f-0bfc51a4c4a7',
                
                systemId: '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c',
                systemName: 'g51pdc897vftcbbljfca',
                version: 'omwfs22x6yd8falghvxw',
                scenario: '4vdkpjeck1klglrjuvht6xyqvsxjiwunnlio2ch2jwelt6m4ljdznoeyu23v',
                party: 'nskmfgtvr9zktu8xcbsyzrl1q7i7wdhab3it3jrjvmzdfimqbno2p7iq27tcu30tzkzwrb7obsqaciwjfhi8rw0xb1nkly5jucs87k1xb50ttv8fg96qlru9x6yfilzfg6m0upkcuxfk6medcsxj6k3vdnvo0rin',
                component: 's4lfrdtsppjfatk49c0io4rtg1brly6rsxouii1i0km9zcxxcaq9j6hz234x6tn85xyrk8cvfliss0gb0i81jaj93lsjqqt4466jdj71dmsr6gkrkbp6rmijcatktl7041t4qi0kg8fh42qlily2oi7vjdjtoer8',
                interfaceName: '4kr4ptil2jsx3gqnwzx5lb4fu3iho8uc9pp3izduhxb3lpwe9wufyf9p8pal7l7icbo8c51k8xa10lr08muy38yq719nuwyod0cyfa1qcow39vv0fmtlu4hgoicdp28r7ontsolg9eg4tn02ulr5tek22rwrim8k',
                interfaceNamespace: 'vr3yg7sx4yihgphp6ndtze3g37cgmx2r4c9k98as114vdhnt6zyaocq9lxjf1cwsvba13u7bz21lk90v0xpvlkq9mta1gynmd78e9ds6rnje5g969elzoiiwq2onoyi5wfu6dbnje1rxq26fksoj3nixzrq9lk2j',
                iflowName: '20e8bxxir3xxb7vul8g6q2wsertsi3jbzyd9y05a1zb4k16mpqzfmnfndkjuyewsg2cyib488x9zi9gsdiletola1d0lbpvpbqk1ugxsrheo37j7jsd14svim7kmq30w8oxw4kgw83088ykgz3rg1vf81x3fc74o',
                responsibleUserAccount: '8dakm67va1coul65bgkl',
                lastChangeUserAccount: '8jj4qzl1ldg5386wv1fy',
                lastChangedAt: '2020-07-27 15:53:44',
                folderPath: 'dml09vps6oavs7exi0pm7bikgcfpftmln7n3qo31a5tkd1hsuqhwlu564xsa9s32lsvx68wjsugnwk6nkekpndgqkfp2gl9kasdftx5hghzb1xwiscngvhbi34gzmstxynrkj7ubnsq7uwhwveie2e637glapgv6ct131uajhtaehd05ojlzhw3z7vf2pvls2700b8u4mzcn2pse34tl1eetvndeexpuj189syohm39z73929ehumbxydxg7zsi',
                description: '1xgnmv5muuav55lmqvhj4mh0zlj97yt72jiqz4ensim3nkwi7by5anezv3y98i4iflu1be23dwh756z0y0ynabrck5zfvw09jmefspmityguky0p1vli1ffk2juuix9hovg448zmxdwpag0dy44lsf2luddijapfxme1kmu2jwr2nw86mq55mculalr6sasz7w7434p9otfzqhr5qrj3lrfrwop961m3eirbbjk8wl7ngp63m2dpqg1izygt8ar',
                application: '5ebsspa6gw6nqfp0dyeblijf424v2ut5ipefdwlz9hr5bbojxd8unns078am',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '2e910aae-f108-4b9a-81f2-fdd2bfe96927',
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
                id: '1e830191-6cc4-4500-8bc5-1390347b5b98',
                tenantId: 'fd68f554-6eed-4217-970f-0bfc51a4c4a7',
                tenantCode: '02uddzbe19v6kgt1b2vkhgirrmqbzy5u4utcrfvssjgzcat892',
                systemId: null,
                systemName: '2i5rr923xwygdo5vem8x',
                version: 'pctg21cpnpas19zrjwjy',
                scenario: 'bmpzkmhxvzesbjs4j9ahkw8xpdgyslqxetqpvjvbg0d5l64cnmd7vq8acf0x',
                party: 'jxuf3ze54pyghv9hkjohekf20mgvv0777b7b6pwab4vfzx7pngeow7gdts0qfvlmzw3uycn6rw2rsjgik9qxhaodsn6b1dti6sgdod5ouhzvwifqfks9t514xvbkpi6x4c1q2ww4t2isus8u4du3rkvpqta5z1xd',
                component: '88dsh399julbnlkvej0nx05wrouq0dde2olbekjb3rx6kcm0im1x32y6db1f22wii97gtsp3os2sdh5z8rtwi0ab87ja1zx0qdi95cx4wmlh9e59lvwsgqciptmii73jb3hhfjuizdaryiswrcuia5x8tbh6g6hg',
                interfaceName: '5kam5uce15frducbyrtj4pj5c2w8f49mtb07d83rgstf8hdxjr8grp9p2cgm6gur8u3ymrbcs2cnppjm39gh0gas8ykbi2cdq1k4me0xfpyp5l4pf3xgwdlbgna0u3w8s5q7xbg0htw5ywwqbz024jv3zg4omawj',
                interfaceNamespace: 's2x14pvd0jx4rcmlcfl0lw57yq3vqrgkri0fd9xkoitaolu9av1qas2ql7m575ow2aqisk9ztlvui13mcmq7gugpqby0m8ov3nhjjktf5v8djq246nm1ykt9oeycyw9tvjnvccj0f7wbmfqml8rkx84az3y11iqu',
                iflowName: 'aofxfd8o5uk07su2mszbtc6r9yw6eoxtc1vrz2a9c7hwcbkytd9g2baw34esldfttqnbtwdlx8qxzdegpdzaolhbi7miuv4zvxp1c25zvpvz604d7m72qnixcynfalnukcdyez3zapsfo6a1rb6e1o5h409a2u31',
                responsibleUserAccount: 'd4wz5ynsyuo2r7ri7pit',
                lastChangeUserAccount: 'rf0h037m8vwif4twzxha',
                lastChangedAt: '2020-07-28 03:53:49',
                folderPath: '16qdp0he8elifkalehl24rv86no51s28wicgw2mptbiv0f7qtl6hmjha4sggefcyxyzc6ulswoa0wrl5q1k6t8p8v5jixdoyymz1l8v32q8996aob7bq7dyo2ja0iiswpw72tvndfzn757hlpd5pumghfk5ui2c2qw5mqppak2pxguovt7uv5slsq23fumbewpu9ggx4ukhx7tipccritvgxnaxd9qnyyt1w8e4z9xawnqezcnud71r8zi3r24t',
                description: '4eo0ldzuh5j4h3fgugafr3w9xze7qwbnqk8hatmov99zcm05qqs1x6bm7temxayo0kw6uc7z525nr1h9rrc8ahbyf5fhgulc0dbpj5nnu2604dpbqc38fjyp7rda3yrahegvnwhspj2sqp9ew4a6ndq4czuat42qpkdeyh0emnf94qn7d4z48nb3dlug0r68o7me3rz205g83gdwp695io97r47pbfd839qqag5f7l069ifub0kjw4mz237x09r',
                application: 'xqy1kowtkcamsmbuw5tdxt8qe63geci8mawxti8l174vaj25efcw1bmhasbh',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '2e910aae-f108-4b9a-81f2-fdd2bfe96927',
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
                id: '1e830191-6cc4-4500-8bc5-1390347b5b98',
                tenantId: 'fd68f554-6eed-4217-970f-0bfc51a4c4a7',
                tenantCode: 'ow8ggsj4gjfl7kqjetymu7dh8b34wmh0jtzbfpq8p77xjo4t4t',
                
                systemName: 'ntpk73uzwyg7dkpa3qhb',
                version: 'ab31v42yw5vu4n3t1kvr',
                scenario: 'cgptjv8o9h0g1ewtnfj466u8f2xtecuw0246601eaud18sotjk71jlg284vf',
                party: 'xb0mw7w15z65c9yvnbwsaugpyzo4a1aymuzwdhlnoo7poir9gnqtkjdjb8jtklkmldwi21q0l289pnrg02aqrb0hxb01ctvhz10e79wv2k3s39uv03wp7kqohrgxaxrxkei8ph5girb0ugqh66pgd6md0u1l3iwg',
                component: 'n3m5x061x6xluqpqhmitk92oibxl6t8eotf0xejalfhd4ihxuj8wcbu3sz6fpgn2eokeqvhiludauhqyhmv815o1k2hka4exencgu20mz4ai3358ngc04b4vgqekmggi3eynxpvpquy13piu0vf2w6jrmvszhsmi',
                interfaceName: 'nc0tkiywsbh603bazj3yv4ca2l76p1aisvyba004g6bedu9voioe5b2yznk8ke667t5cd5mwpz3iuhsw1brayp2cy7yfztto4var0f45d8cz8notkhctksx4q6xpapn2ldc0aflq4k2fxwupbpx5a183hp6k76wk',
                interfaceNamespace: 'vlfymtt0lbplrkxe0j9yfg9b2rora0ebxiihzsh88lww71atl1ds9blupcb5t5k1y3z6s6s0wjfg4vwdgw0i76meb7drqb4sx4ycsicj6yf7l0ngz98sjcxqwns7hrgugp84g0tw3vpi04rn5vcu4vvbd69wftu5',
                iflowName: 'kadfhfft8x9if6bxa9ieag6x9ff5lgc7clan1wfe363ftnqxc7js41y3l6s7e7ulalgyr2hhpy5xrge5zexgvq7m1eceh4u22cx8pj0q769tntk1pqqdv54g0wost91beivqpoua4co5q5tzuhecx84jsqwkyggm',
                responsibleUserAccount: 'ntsez0oek923xrs7f2he',
                lastChangeUserAccount: 'mollvgcaent18z8tvv8h',
                lastChangedAt: '2020-07-27 19:38:40',
                folderPath: 'gm1vxyp6g74z6uz9tmmcgjni9dk8iavrdd2dmcyh7woqp39q6ub90i8mkoqqnd6moi6tha5gh4fmike7e54y87x7wh6bnfrdrolnvx3x7w7eteb1ewiao2bp9f2g9khq7fjm4ym1jc61wbc3xgm6s20mogrnwrw4ytjj12do1p130cwfmnraezqs4qeet629cnm99cbje3getg5deojr19nkitaqtldxg2q9bv3fjzjjwzycwcgmkajccm36c7s',
                description: 'rua0qrcv02dj3yjs4g42q37yghqk46b90tq8xthl8hf9zz885oxrnr7a9yafelb1d6fnp9pig9e6nj130n7cvjzrugruu58701ktrldie72wr4eg95xubtixelg0xtqrk65hz8168dix7twhrx5rwqbj3jvt4utni1njd45e01rjmvq6p242n6ztn1spjt2p3ude8o635bo7nuum7nt42e0kow3ax2qatlyvxmq82ai90xbzjq5umep1spcggsr',
                application: 'gfni0yk32ypa718ugratjujfyflah7fu2dv9thbk6pfyqkcja88tanztq8lr',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '2e910aae-f108-4b9a-81f2-fdd2bfe96927',
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
                id: '1e830191-6cc4-4500-8bc5-1390347b5b98',
                tenantId: 'fd68f554-6eed-4217-970f-0bfc51a4c4a7',
                tenantCode: '9n3lnhmfgn6hn5lfvcqltx5w5zzquokbdu7n2459vbu65y8stq',
                systemId: '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c',
                systemName: null,
                version: 'moaqkgisdkvrbdc3t2na',
                scenario: '2dn9p0hm9webu68ktjnu2keobdsqf7plsbv33kjkbwdes8fjwu1imic5c0br',
                party: 'yduiq717uc6l5s8nbkjb1zp8vpbl9ykztnkx9rzohgjex0skkfbioes7nlj28038gz927fu4z47s6rn8y2z899auf6mv8hasxz1sj11gd2hgjgcznj9fxpf5blpt3kckx02dn620nvaovsr0vlp1nz7al8zyc4hl',
                component: '6ymj2gvaoh5aww0w6a0t4gnag4iof342wes059qrsdzqeajn3utdjm34to4jppqvceyj8gpaonqwoonc4o0plaxwgc3b7m2732bzg85utmbub2n2a2svhyxq742cltw38x117i6u7cisq8gzhee1b9qhhdxw927c',
                interfaceName: 'z4sjnw73dk3k7j5rkp8j1s16tcqfo4ra7h8jtufwi082h72j3mjngey3r3koyxtg94vgze02hao5t91l2prcekz28ro3xiijzx3ve0hq6bgbxcbq0qe6985lczbw9f0ebjadppwy4sh5g38xh9x9ey94t2ewira6',
                interfaceNamespace: '6lhusy6wg53fs1meqeva2kvvvf7zea0cborp6aap9y7k2t6k5apuk4jzfff6npr0p2iqzuy1ii71aw9v7pzgmef30wkh3rzpzj904npws4zfvv7qlzod4xapwcppnbb0ao6w4ot5bqszj0mh95zgidzaaiit5dko',
                iflowName: 'jof4f5x892rr76uoaq6dn8q0aud3ea3c0lvvywn6mrnod59j4llg4fmdm2wcd0dwzm499szuzpf80qbk7khm46dnjltrszx39nq3j0e80tmjg4o9axxvyydm90anzo81mh2hzn5mcb5lbk817x54koar2ud1vukv',
                responsibleUserAccount: 'ntk7ucj1j06u1oyfxcrs',
                lastChangeUserAccount: 'ump48gou507kmvh8s5kw',
                lastChangedAt: '2020-07-28 01:58:07',
                folderPath: '2esalxas6rxlhlg858o5bg4qj6mszsa2kvq5krqf2x6arkqrj51nprxcctjvyv4ierk23zk9q1ggnh4rdtn5y9m4tsgy1qej2o56aq7jb91o7nppcl08nra1q6zkymbyctbs4d758md90gs8j9vulrmfz6ickqgpg1wog1zk57cnm15lyuggh8m7ll0dja2db6g7myhyjuqj7xxn2rv87wkwq27optg7ksseci5njtswvdsvyr6fwgnmhssliqy',
                description: '6b5jbpbt50pec07ynu0ipvo9t2ts2kva1fhrr9w00fv84sdbh6y8095zovyu6xaaqz0xvhpz69byvpj7izcovutzntokko3gz2hpgiy9tervqed0r3un0lx44535neovqc7zbxsl9u0fgj5w65gz92t9dpeibnntpcut28gylkcm265iqi1qnkw6kohpqi13iktvu3hbmjgysosibfsmzjazoipfbytxbninlngt73azcap23nx640k6x9ix68z',
                application: 'm6d8ii4djssi32yihm3s45npasfp171pfc6ssmmkcjxt2miodepw3oo5c6vr',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '2e910aae-f108-4b9a-81f2-fdd2bfe96927',
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
                id: '1e830191-6cc4-4500-8bc5-1390347b5b98',
                tenantId: 'fd68f554-6eed-4217-970f-0bfc51a4c4a7',
                tenantCode: '49vov4o3d9je59tbustoz0kn4ti4p1rephqlkz640lhfwe6vxp',
                systemId: '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c',
                
                version: 'zi05d3db2ck1usbjc8h6',
                scenario: 'k4lmlvpqodiv6sc1nxnfkhn9b1uozjgwla0oy7q2fkpdu9u25xln82u0xbqc',
                party: 'tkbmlr76wist47zwrkh0wyttqqcfohqrbm1hbrxn0vvbhuo9vwzce7w52vmn4g84yvwr9vwn5uqz69gooj7rwg8jokadex5aiggzfg5c664cpwa99yuyzc5zr8wt01f4uwm5xfyu2eyfw35kn68bt4ws5y2t2sgw',
                component: 'wi5ls5sat52plqlwh8axkluo41e0vwvdl29ta696yx2ud1q83idc6fya1zo9l8bnpmivdmbpp232cs8o9ubs3pk3w0vcfbeg5ktdr6fv6u7n1i7m8v40zxdq5gsqobmshm1505npiaelxk86241qvgbsf636oe93',
                interfaceName: '1j99ewoiok2t2gaukc5tstnllernfzxycov8dkmljdttzkbyykpof465krxyc15xzy2kmwz1aj179j1qfw0jdl5u5h1b6dkbwg3lc9u87v2kqy3kufvnsc0bj7pqzkryubl98ospj38iw1xmmqb6jjqomqr52w97',
                interfaceNamespace: 'atacf19jiqzd28tru3jkf8dvbzo0lmmdz75fec0cafw007yw3hd271c7t5gyipufksre4cbrd595oz3ez8jk477hnjvgwk6l846rsp2hz7w8yueqf6kfxzu945lriu24ymwyrs2fydb8odx1h19bukxi0m8uoryf',
                iflowName: 'bre608q32mjxrh6mxhe8ugt3dh7vdjuhgpm53soet048tyss3gddmvsc5oqpl196nyt215pg9wi7fnqcptgqb70ugbcvh38sp2y388oqyfv2xh3xbn7hav0qjw4bunw36zwxjzqe2k6swytytjz67oxiycf5fqnn',
                responsibleUserAccount: 'ukehdrorp91bstm3tpoa',
                lastChangeUserAccount: 'rer20xx2ycsyl3hkc0wc',
                lastChangedAt: '2020-07-27 23:14:50',
                folderPath: 'qx7x5x9xunvk5gv5mpxubyl9wifgj5s3a1ofojk0ukfpeqder3xmmbngf6soxhzbxdze972y122f0601ybsmworft0lp7my2edcttv7t6h3jwxgd8a8d9v3g4i1bm1eo1bdgmyfihmf9encfxc9meyz1fqb67zenlofpnaugofox92wqimexfbzamv4qc80245454grcc4cqcvivrkee9gfgb4j3qaxzzaxr85eh8mznt2klonf5quqpyml1wjk',
                description: 'l3ce2gyz11v82e6pla7pc3iyt3tmszwf2qpj33d9an0sbzhot2ehpehczfq0yrnnhxkgyle64rscgcmp07h3qhw1yo8h95lo13k5xgm6ne1jvrt6x6wtg2ngj4ltnh5a7fnsl0sa33e259qig583iezxi70drc06jcsoomprzjv9guk8ckkb4z2d2o7ue2fvy1jbqe6zq6ti48m15afgllj8fuxl0codkdrct3s7zj91lquz6qrinox7y9nr47g',
                application: 'wzm9ilo230261c5xhds2z4gpc7121d3sty2r5535hdgzj4nlwbq6by6e3t74',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '2e910aae-f108-4b9a-81f2-fdd2bfe96927',
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
                id: '1e830191-6cc4-4500-8bc5-1390347b5b98',
                tenantId: 'fd68f554-6eed-4217-970f-0bfc51a4c4a7',
                tenantCode: '1dfd4zxmff0uiutz0vct7grhsempo7f0lwk4s7lauk0ngw3hx6',
                systemId: '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c',
                systemName: '5c6kzrtelfijgane3k06',
                version: null,
                scenario: 'nxkga1tgey8iiucgi2xmt5qd19t700geaxoegxcww2zocl0m2jav06zhz4uk',
                party: '5nygat030224win1nkkfgsqkmfvg0cn9ucu95usu4c08aquddwj0kyjl6mn4if6mwfabsnjewwjdsizdd2o6y9bzrbqpkstni3fb7jjxlj3mtypiuf0gmwfvbh15xjh9ihe9p12pzv5nyz3bkw1tmfeo8lsnxsjb',
                component: 'wxali9d11mave4woi59yyy7v19fajnj0bgaqr8f6wftvebbwas2rgcxeabhke4ek23uczpu32a2sm7cvxsqk92ijemzmorg0fsi5je3ekhp1bbbfkal7u66k62x0rkzkn6ojy2fyc7ktzegv3n5kizpthfi95sho',
                interfaceName: '6m3z2hmu8pplu2fdiwxbu2vil5bmugbpi80lp6r4xd6ok2eku6szv6i52hl8rsffmznjedgxyof4ptds6p5t5ip4b77f1i6013sk1hyfl9bjczawfpd4r6za7et257gzesal5sqahylsuf7qvhk1ct8wsjl5w6n5',
                interfaceNamespace: 'sx5dm442pzrduevbm7hzs3vmto7e1wf9hga0a7nsorxifl7l70ocdxtl7h8ufnjiez0d1cwr3tlohnlrvq5bgqfaanabbrkiwv3uztkb91g8x8k0w6b8qhpeb4vyls5hefy4wcovgkipwvk0wt3m8j7577w3fdg4',
                iflowName: 'vxlwpeem24pgpfs3vssqz6zu87awycykl1jsdq8emfbhunqef99vxbbn9mal0oupyk8mto3cer8gfcw3iaytw73xa0i4cnmoxq4hnk14nivyt9hc8m3hq3fcv18ims3x19ptjz1rh1dqd8z6zkab6ld611ercza3',
                responsibleUserAccount: '748g9k7m11qlpd9zb3qt',
                lastChangeUserAccount: 'ppyrlikvitmuz4r8ijcm',
                lastChangedAt: '2020-07-27 21:57:28',
                folderPath: 'u39vuyvsa8zswd3urzokop7n11uzknt6sx7py1exsaf36red7983u7ijrc2uxalrvq42oteza1wi7qm5f7hcdrm2dj2te840llwzou8ictz7f2mym3tcyn07n08wo47bzf0w2h6y1tvwj10hu9zzhh03bcumlzeo4oy87wyvbh40fzdehy21yppmjp9evmawp4emga8jyxcqp6grqsx3lx9b9il38lwp7bqlt36cqtpi0ihvt0yoksnmzzo3463',
                description: '7ng22nsvbf5g3eumijnhyvpidcr4hbfsvumm1ld36f8uohdf7ntv0thzsoyaedw77cqbr9oogdp4fd6id5jnhetsanrwb9usobwkh5ac0xmc771udzfqipr5gcm6cditnuu81evls6ofydfm07gipzvix9uvi7wiu78lce7kzuyitvudx4e5vpv3r3pvp84hdv89fp5rb5aqoa3aaljlg5j6grzd5s0v25kb2chjzjsfoeggmjbhmn3faxtqruu',
                application: 'nn8ekitb4qs0byt3eigyrz3vmikza0eu9j3p8c01r6usl3eib8m0ut43kuw6',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '2e910aae-f108-4b9a-81f2-fdd2bfe96927',
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
                id: '1e830191-6cc4-4500-8bc5-1390347b5b98',
                tenantId: 'fd68f554-6eed-4217-970f-0bfc51a4c4a7',
                tenantCode: 'ir7g4kes67iud92o5iz8dq7n9da0k53zbcs8yjkkqrmjg5pyjn',
                systemId: '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c',
                systemName: 'i0u3jqu70flxgl63bhv7',
                
                scenario: 'm8rdh8xc0krxxcg20qim4prlb6jqdxujw5kvrslc82nazxobzyb3b24ftb87',
                party: '2jdkzhapyaz0zvdznyqc1uf6vtmgvxnoinitic7wvwdpm07qlr1xtt84gyctlsmyevxadhow9kvmv1gstcvpcs17pdzbj6if9igxd37gfli5na12zyzr7t6c6wl1fljvluluzfk6ojvm58cyytsyut9rm4pffoz1',
                component: 'o9mjyicqpoj1986livpn6xhppfu89zv10yuvn8c481i8yisvvapt4833yqwol38yhf9xhfsscui6qnl862rpalncclexoqlcftor3rekrnq8le4frasw1irvq4qenvw8j21uydtqfn3b6szbv1vfvz6xafowwsxq',
                interfaceName: 'hi1wxk460yqgzyfyo1pvtw4qzstl8vsrnyd6sf8bo8d2frpihgpehrrg92g8wa629dx7krgxdhm3ggt0vcj9gx5r7bypbrztj2pd5mokbrgbor198qh1j1bnwcal5c5e264ndrz06v26gey9hzps4bw8u1vzddkw',
                interfaceNamespace: 'iw3411woinms36j62oldctbmyg4o1zpud0ps100n2dpgpsszheb5ve6ecqmcdq3nqbwtz1ufmlwzxxqehm331vffm9n4erjgbnd5idedf0skk8f3u95nlvv415y9v06mnpelqi7pdxtxfz9l1h411svo833ua490',
                iflowName: 'k4n43e7wgrx97pwzs4zsqidix166i83ocn9ilhusdt5ziyq0651obdyrxzyk1fucz6ne6wmy5hasd1hmu0io7lh5owgl9q54760tvyf8iew7fi8rebqn683m93q0wnljixhhlgurmbqes87r0cjolkkzub9i37bu',
                responsibleUserAccount: 'chv8gabi1yx7t56qtsb7',
                lastChangeUserAccount: 'hwgjir5teg2e4ldaz9aw',
                lastChangedAt: '2020-07-28 04:13:11',
                folderPath: 'itrd6cakjo8y0hayhgdi767qilgj0b9xk4pcbhf6xbqp4l8k9lwxhek6fmi0062vwrethsflxkpclc9ah8fu42pwx6epipjco51us7clx2kwkl3st0jwwk98mqz4295qmmwi5i2qms3v4cpavhq06ddohagl4ofru4zn6z2fdw900tthymm0iqu9x7ur1xtvva7yd5ru4cbwuac420hzghl3wuoaiwqx9gjiu0rn0s0whm2yu07et0fh9hx6ndl',
                description: 'kyxm8b8xj2d6unxr4vd467eup8e3gvotx977xgriyq259jcoqglbvpoygvogdrif1r3i2ej2ktjusjarqb6xatsr4a1iljszxic5lan05yh59nx9o19r5n6oiwsdbxxhbjk1w6swn8a6zvvi1zepxdv7aueo3juuu1u5gynsdtoc8fkklx0zu50emojdy9zq4cp6wp6xx51jerh5uv37frkak8v2iuikgubd7y0wis8n5d4rjr6mpyemiyb2kxy',
                application: 'gw4th4p5rf19jpyt1xl2t8oyskcwyf958scm7oi81fuy42p1x35w3jontz92',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '2e910aae-f108-4b9a-81f2-fdd2bfe96927',
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
                id: '1e830191-6cc4-4500-8bc5-1390347b5b98',
                tenantId: 'fd68f554-6eed-4217-970f-0bfc51a4c4a7',
                tenantCode: '6e4qyonegbz9ns9el48u0pqmu2g721ygk37mipi5yrxsj93mc8',
                systemId: '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c',
                systemName: 'yv60knispaaybl2wnr50',
                version: 't0dgjh8fbc7wg4ovz455',
                scenario: null,
                party: '7tg701270xmkycmr2r1vxih8jrg7l5ltwkzi1atdbtoeecmuefc3j3er8ckt48yhn19il5izp6zy3jbs6ibkutsqwukoh1r5db2l4d4cek6fxpjxg2d4qlewu8b5dx05crnl0l4ywmgg58b93zxokqyx27bwbelo',
                component: '4gjwoqxq2x7lbycmz4goabaa7brt2mxef5yskyfrigtrx65kkbmpw96d8xwycupcivs9j7fs2r6utknlfc5clyc1madga1suda0fj4grrau6v6w0am4512klr241yl42fv9rklkz2jwxcko2dxs846ptgje928ws',
                interfaceName: 'csn7mogwz3wmsjs4xtva1n26abxskjs2xxqz81ha9dnfco7xgleajfxa2ldfbnlrsq4thux0ofoia1urzjdcj68fr5vz636al6zobyj6kzuf9jiv42h157f75excc9vlk0j51ohcbwcb46t26k6uorzjb1gz4ju0',
                interfaceNamespace: '34z1iqqau4trd34m4vne3zvpv8osc4wm8w7xswp0l5uc3alygdj8r7571l85uolc1jp7etnum1s4c4x6zsr49cdpq9qy6lowatdkey2shywrvp1g6i4g1jgqzhh58rz11xx47lbsp1ggm7p7irkt777tz9ykne0i',
                iflowName: 'k4yx2nivmj9b45b9nrbmob3vsbz1mwhidonriu8efqs7eqml00tw3xd3q1kpvloilnwh4zkjw9s9eehiu2xepu98cv5lzpvnc1mfbwbun70xmybsoeeriey5xt1yhey23br4xwx0vsr4czws9gnhzpol4hn5y8vz',
                responsibleUserAccount: '7k76cjsozh6255qij08q',
                lastChangeUserAccount: 'mqtw98l16nhba7s5mte6',
                lastChangedAt: '2020-07-27 20:30:52',
                folderPath: 'dw8kk76tjtfovwn3i4upsbhbge8qr41knggor5d17df6uui4oelutpiu6a0f20yc91cckqe9ihea1bkfe76wk63oedn1d8ltu80nkpkm2my14ueuas4mj8lugtqylb43a217ilkgp34q7ykt7yva5586l2a6b0pzm0ffg2kcqhtipv24bme1j64sivg0oylo1tbcfakenz2w8feqp2v8nqoaza2ocx2m80pb4xm4cdtovqwne2yhn0bqt5r7v0c',
                description: 'sxke1d6yv50mnau84wsbcgtk7qjlqxwc35dtnz0i7x4ave9ykng7762rfxram1t6jj1pxiwod05guc3b5j133pvmr55z8khomfunxaafa59xqpxtf7gkmo4d23382ohlcjquzcs7blwg4hsargr5z3m3ij3tp9rowm7sawt7q2779qvblhtfqwazw0zp55u0ztiupc97yz3pabfj7z4x345qxvc51pyx5wjimy0cea190igmo0gnpg5rpf7axtw',
                application: 'cluvhtmqeton9e7xaphtdz0n290ob4r6753h1gv40znxzoznjn8sza8fvfg4',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '2e910aae-f108-4b9a-81f2-fdd2bfe96927',
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
                id: '1e830191-6cc4-4500-8bc5-1390347b5b98',
                tenantId: 'fd68f554-6eed-4217-970f-0bfc51a4c4a7',
                tenantCode: 'qqc9fov5sxnfnkc9641tbi6vjo1k88in9lljhsq1s73ztg0cmw',
                systemId: '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c',
                systemName: '77nfq8ds8ohjt20xu43d',
                version: 'g3tx9k5rzjcvb04apk99',
                
                party: '6fwzxqu901lc4r8df784meaj7d6ln4q6zyjg0s3ej1cba92zxpcrm59h66f66sobd0nwky18ls0u60cq22umfl0mkq44n5vnhuhswswrnbdoktup0mnyzeiod807pa2kti77flsai3763egys7a8jkcszvx0jg9k',
                component: '8exkae1995408gvw6zlwohp62mlm059w98a8eg46nszu5y7zbjgw5y7j6lqm1mj69l8rxvycuqjjhyebtcjgzmwaafa8pxzqxbwlxytpe9y750ro79f4d4jya42iajhhss4gsw3n4drgfks7yjybau0u89t1eynw',
                interfaceName: 't72vz0dsmxe3name2izij46iwxbowg7i3u0eq89n6k6zoxyjkqwrs8oqnlaorgs9mzbj443snvipvh567j127kfr7bn6tfgvnxnujd9ix8915usjzugkqcs08urjmpgsaj5blhzlj1dbjvl5lfg89r8vn90pmqm4',
                interfaceNamespace: '0ixl84qw1s5hxhrz26apbkzpt8hs9qsx9yf8wxvy3imopj3h8ya2wtlarw4rz9x2lm0pkudnswa0yrxjgwmu0od3qtje1qt29qazg5xtkm31r1ecqs3br8u6a8xj9m08un2eiwnshet1lfv8xm9f1lsx7ckbxmif',
                iflowName: 'zo0pvtp500yyjr5dr1sll4go4hkp58syb25xmmejw3h79wij8zjrwvax139bx2hmmlpgnp81emkxwdqyxy3pgda76ezk3hq2vlchy5kd4ly7es5juo5zg85258ezd16sds4bvfmjk5hc4416uzd5tcn7z9tst1y1',
                responsibleUserAccount: '4bntx4sjlg5ub457qezv',
                lastChangeUserAccount: 'mmz9e0ngwiyokk98tblw',
                lastChangedAt: '2020-07-27 18:20:22',
                folderPath: 'qqsp6lsjdsmin4w1uy2xffybwx81xv56djmnqib0kfx901hmuvicm7odcgcy2li5p3j12a27t5a3apdkg4eaxiy1b92b76o06c9pv8c89q2338qb9bw97au0f41cs11s3law8aeqjkx088qddsfiqxwtwru4jywdvgk2spx5dn5n0dfldnhchbjfuly9zldt9g0k4ausw6nuox6lcoanhfa1b3dqo93af82f8roht4kxhqbs8uh23vu920fcj0c',
                description: 'bo33dqbunbwk83t973t2vw9du9zxnlw3oples02xdcmrzhp6a7jzxkn2jbtkb0kszbptxuhxf39w434dp7prkf00sndav8a1i9xpcp5plkailpbhqv4ytfmzzsbok7l5un6o50ivw04iw4pzf5p2s3hd6al6qvo99h77lgnkqejri09iloi9n7gpkxf1opl7mrusk88e0xvjbm84rc8tpj68lxofxcc4d7z7d1sj94igqwrl72p8dx69ihiukxs',
                application: 'ykmzu4akla83rt3onv1cnkwxzrnbb2585svyejd1l9yd3opcci1f37ze7z26',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '2e910aae-f108-4b9a-81f2-fdd2bfe96927',
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
                id: '1e830191-6cc4-4500-8bc5-1390347b5b98',
                tenantId: 'fd68f554-6eed-4217-970f-0bfc51a4c4a7',
                tenantCode: '1bwttyp2ivtmc8jr7xacutz8f2jk5h2jsg034haibmuijvw4k5',
                systemId: '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c',
                systemName: 'qlw1cxrjzi8jc6npiy62',
                version: 'xfp3zukyfs6vow5uzzvo',
                scenario: 'ziut3jgrf0b7w706amaelbzuf70z75bmeqtm5dtd0fq5wcl1cdzrix3as6oq',
                party: 'ye6q2gau2fxyeh9oszrt84qf9j36tgmqmmu0poasaznd7k6yvcyobf19ieok7d4adqsrrk5wepqur56yxm5cmmgrp21opkm2pddqkcuunuebnvb8g4xc3fr6mxy1ydwb59l88rax6t23tefakxquvropc0ahqif6',
                component: null,
                interfaceName: 'wx9uq4hvjtmo6su7athcormxhgr8mi03evatg1oma3ro47hyv0e4oxaca1u57l8kqwdtj7s5kba0wdc5ufesn74shztnxcfvp0efng6cmyval5h01knmnhzmdw5vnbg3oy0shw8ls17b7s8ap64i352851plm1b6',
                interfaceNamespace: 'ucfvd7n1chv3sxwymao4ehq3p5o2083sps8v83il1kujp4tsfudzcg8cipzgbfexlhoiwbdxem31o5o1o0oomn3pesabh0v1art6tbr85bj6u4jokqho8a1nb4zb0zahuil2fqqwxrknjvpmfj7ccbuvnyon5xkx',
                iflowName: 'pdfxvxfqax92czr639rid1d1zt583t0jgruca9ftybg8r84nnenbvn6rvokhvtbxousydving8fvfv6m1bqss58i9qldvkq3ica8so8cjdi4pjofxga4n45o0g34xh4yiwkzdmtrmy8rvs055tkn7o4tbjw6cb1v',
                responsibleUserAccount: 'w3ry5lsyvis54vfqs5ak',
                lastChangeUserAccount: '3jlunz3y9cycw3agkb5m',
                lastChangedAt: '2020-07-28 02:25:04',
                folderPath: '22pdg2yyk2ewoezyvbhw21nq1izr79c3hrr4fxec2zayvxqmugt1ercjuay5rbk9q2bdhj1og8v7s92efwilme068nubkck4yeuz2cioyzu6preoiqn875jp9eqsv0d2aopaegqcf54ngkb8ahzngpy2pr38i5i6a0x3exo4593fahf1wxw4tib9bpxmqi111lk7f22jumrr6q7b163sqln9bqxadgoyf8eb6275k4jkn2tfj07s65m0uyewpb4',
                description: 'qdcy1qhorb27i5g44rvxmunxqilfnzufop7khxud9bxcg4ctq41m0nydn2kd0lahyiy7vrd0dhwg5zxlsmvq4x9agl7mb9j9g9lhgtfn2r8umuuvj708nhjxagzvfyvtd0xck85hicu52hmct7tl4or7irk1hnw3zkh2f7cteh3cvplwxstnix213svgzaeikgh3d0sp355lvnjvtpij2nzb42v9zs98caylnnkozv3bwtb5fvntgspsqgbr73a',
                application: '81x0812vii5dcgybtblpmt9kh6pdcyhhx9zmw86o7lwuf4fsl8oc7ltifqa8',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '2e910aae-f108-4b9a-81f2-fdd2bfe96927',
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
                id: '1e830191-6cc4-4500-8bc5-1390347b5b98',
                tenantId: 'fd68f554-6eed-4217-970f-0bfc51a4c4a7',
                tenantCode: 'z5ilvl5qsxo60k6p6hyqqyaj891gkinvw23dfu7mpr5sg8dhu8',
                systemId: '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c',
                systemName: 'gwsq1a5m2v4m9aa10dw9',
                version: 'sjqoup284kgldb0zr4s8',
                scenario: 'b18yjdmnu2isxm78tbl79e92c12sloinzulq2l674w8o2zxuzn95gnaj0q38',
                party: '04spw9takgose9v2dygxmqvibxmop3atb2zhuufcjt5bgg8tnro298ek63uf1prokei35j847yazterygiwfxwcafljx93qvebixuquo83lv9ybw7z754rvk6huucdb33rb07g9ryh3tqpu0yxhe4lhqmygqhsu9',
                
                interfaceName: 'qwn5ngv473q8td7n89dlpjwwhbr52rruu5xve7vrthvfayqlmm40docsbj04sr49qsojj5bh5dtzchonllecadqv89igdrmzi66f0h6svzzdej3kinhywolh0w7hxsdvic6ci0ilj4zzct4exjw5cy25gyfi3s13',
                interfaceNamespace: 'kad3vqzb7ikltn8k9mjj00m552oz3edewccc7cn3so4brp4u6myg8qkj8shdk52bqau4b8pu1a4ls1i57f3ii9p0oje93myh4rw8jsh4wwwenxiegttjn3iwyppy6z4rktedq5ds8jhkzo1o0526u21o38xilqjm',
                iflowName: 'zyysh86vp3c5j8oersv1a9gx7902n05xggrivu3cfyj3qwi6lg3e5f9u6uc7f6h4nushp7st99rqnrqhcdh8ole0t6yuh8lujxp6bska934vr0sgze6lfrvdott95qeynne8nvtjjaylqb4ssmzlp4h5sdjffj5h',
                responsibleUserAccount: 'kx5llsmqrty2nlag5hz4',
                lastChangeUserAccount: '1ccojdg3klx1zvxwhysj',
                lastChangedAt: '2020-07-28 07:58:31',
                folderPath: 'upazimkmumg912xgkpqvuog78psqe6bzddyoj6ohtogj9gusdg6gtwxjoxlkbuph9ozobnfjo4mq2heari88dpqdkxnejwpso7ykda8mii5tkku0gnhh2db6q7jgecjbs7e1m0h716w3blpqtp0waz7t1pv89o7pwhvhdm4oda4dpbcncakatqu6yvp94b0ki2sruy95z2qemisoll56aa2f0f1yw32p95qvo0eq5xkex8oqt51ctkvahxchngm',
                description: 'cn9wgge7zc5r4pu43826fs8cuwd8cpjqrcaz0k66pj61b6sm2rupwnm20sy1x4qqp2a2qwps6y9wo24l0nedggv3gw5k4irnk47mqxqdtayf00mwt2v2tnx1ciyznrga3h1efkpwdp4nag6nzwfifuqxal12mpebsulu1h3t6e1kzvfmey2y37nuupz3vebdncbtzai0vwv5tjv8v1dlt5hl3mmjrtxuuhpl0jwl15kk1hw1cjdfdw2dc8xeqta',
                application: 'txsaq0vivskxtg8u9a76twpx3obg3oe6by4626u66u5vrd2cxqctltgd2j32',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '2e910aae-f108-4b9a-81f2-fdd2bfe96927',
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
                id: '1e830191-6cc4-4500-8bc5-1390347b5b98',
                tenantId: 'fd68f554-6eed-4217-970f-0bfc51a4c4a7',
                tenantCode: '2b5jimo6ltq7zvfhtcdhwz552ezeqsqxfuv9ef1qktyqj2cep2',
                systemId: '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c',
                systemName: 'ghfdrhosx81d90diar1k',
                version: '8fhlfn7g894970g8fbgw',
                scenario: 'mohdbfseabd81oxu2mpljgs748if60gq7q4y3ko3w57uz3mxhkb5vpfosb9u',
                party: 'bvzc3qf5x7pxyef9jur8avlek44vujnvcm5iah1ww3msjeibduiqzv3t7vspjj0vmjnfjrd6x235tzaooftzoaw33gw8wysu8gvpcsddzofg7xo48jptfurw9hy4c9ovxpx95vwst380jtiau0htjhtzug5pqo1l',
                component: '1mg87tc34c66kq8pnlfyry7ccx1ll2fpxnrz9b4w2tgty3axpt0kgf5z6jyidrqc3p8rqkhoambj2u1yin6956wmp9jju37z912ahc82du5pelixeai4kfnrpp7qas68f0zj955rnz6itpf84guplpthxjoi3apm',
                interfaceName: null,
                interfaceNamespace: '7bahnuwmlllkmk5o6vh2r79gxw31oflln9qgv5yrbb1bk88fnvw2hp8n8rydeei74mmwkxs5yuvlnn32buw722rsw6bqrx297288f31itf38pyewky8rb4uhgiel4osy3ecmxazvhbh2o9tmj6efjvrrnnqn0u4e',
                iflowName: 'evjx0y99xehkg7req3jmdtguxs1bc9nmd9orlx46nechomez636ihwi298igvck64u6uem04gh3b2sx1bycajkdc55ydyzcz66tiiy7wqvgrpe0ezkb72tlvpes1k2ucs2exu8no77zdhvwp83s2705fi4v621nz',
                responsibleUserAccount: 'wepdkk66eb4air2e5bd7',
                lastChangeUserAccount: 'lic09equsdcezo66d5h8',
                lastChangedAt: '2020-07-28 05:07:35',
                folderPath: '0rha4t6o600c3zr3hs74k3fdocbrj3ih2sqw5zlx07htad3az8r0bmireacmg845bdb4yyh1hvp41t96095oz4w6fwffnl3g4adizsnlh84j2imtr9lwzo0k576i561p6bbn6xbhzrvrqw9mi2069hlzace6f83qxt7fygrddx2pmabj0z4jfa94gjj58oxnu9rzjt1zkkrfvk3tmbkpmrt3f9gvi2lethyocjxpz3c85aseskt4u3kd2130d86',
                description: 'lz6qiv8p98il4ajr9bancsq2jgwxhjctuks2m6oyo8ud7bk36vkohxivygvykyhut61m72ouwp3op3egpy02rblih80u236zrrt940g4s8iyjlyj72e7zhnic12qs4xu5eygs671aukd6my2xkp1aw7eqwlv402bc8hjti6rx9nipukfdvczwmll4n0gzh0nad06h2v32mtc155ouftajnijpyahpnxin5ipqjsoxg5fqf6xjosrqhek5n756o2',
                application: 'wxebn9jkmkis1eyibo7cvf8me8yc109mcksyoc3nrs57xxr5dh5bznhev265',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '2e910aae-f108-4b9a-81f2-fdd2bfe96927',
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
                id: '1e830191-6cc4-4500-8bc5-1390347b5b98',
                tenantId: 'fd68f554-6eed-4217-970f-0bfc51a4c4a7',
                tenantCode: '8dkj86utuzmf0762533yuj9q5wi5dfb3i52i5adquq5ssbw1f2',
                systemId: '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c',
                systemName: '489bh08qvd5tz019uqr5',
                version: 'l158i78xh4n9lt1i2rq6',
                scenario: '11xwhek7gnu5qyiaj9051ee9myii269bm1jow1s60amxpabmlmft9patzjb8',
                party: 'lztr442q4yqz065rfwtrpeemv8s40cl4naim18gt2xk7kpcza9ac89821k9amguv20po17dsvybpvk2zx2xrojt00l67pxrzppxuxj1ccd0ewzxr40w4v0bebxdevufy45ae9ccww1rkxoqwok5whd9m1aed5wki',
                component: '2eromiyf24myfu63nsp11fdve5wt02xbazxqaodh9y9jnqc6ryfsrck2rqmgkjy509aht4dkgtudm2194lp21e4p9jmo4uc8odary3yzphebavoqpp16fl6wsetxwbgtddh7rrxrhrvdkaulkvgl3rsetjuxvbxy',
                
                interfaceNamespace: 'hwh73srig7ocs5iuc46zlk4njavw76aoje3egzt1r9fc1brp0x6mryj6ljx7513klxdhsqjk748gr0zx10qoesm6rhrmgjsiyj33048g2v1qcdci6uifxy8at3sjq2nmq00ggxm3fj2o0do5t0z96kdin2ey4cws',
                iflowName: 'hrywoavx5xkm1ay8qdchvwanf0chsyjlw4k6pu57etwxc5vgd1xg3i13mi45y75bu4z8f4re1j5y03zoz1mw6akitm4p91wld031vjqu29ltkdmaira0pbgr8cx6jj1wi5vc98yi7x86q3y5sch3yvci6zn0ejq3',
                responsibleUserAccount: 'edicpvws2p01313le931',
                lastChangeUserAccount: 'rpai0ircqoqlpo7egejf',
                lastChangedAt: '2020-07-28 08:04:27',
                folderPath: '0g01ilfzhxv3cuud37doztata7o2gs25nblemejpau61nucev4d7k6p499zktk8yut48uqyatxuceon7eiiwcsyrw600g0bcnjfhp1ez882hpy809vbz2uvuqlpa3zjbjg9n90h6kvjd7cg939zp8lc9xoztnc0ap265r82gd2rrhtg559d9qw4r3euxrc49vg14sup3vpg8jmj9xojq14ec19v2raqbj5lbq3bltz75jmgsjr1cv1dug803iy2',
                description: 'uhyvzhxjbx22swczy34efdybqlfehbgn209ovq3a0v07zrr723kndulfrtxa3xh2xpcmaxbaxv2k47ndut1ak0rynhusxo8qa4hd4c9we44yu8o8b4hakj998lo0cabwguj4cfsjiv8ym8kwt25p7ap6yadt56485493ddiosya9scjngs5xcf25v3fy1qh1rwkssz7vjyh9yptqibd30zc0grbtb22hjkncgzpmglk3io48zqscr9n0t4q174b',
                application: '9xqq5r3la3j0psgxhq6jc28vh9r52b1b2i932ltv7xg8fhqd0x58ihee9pnd',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '2e910aae-f108-4b9a-81f2-fdd2bfe96927',
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
                id: '1e830191-6cc4-4500-8bc5-1390347b5b98',
                tenantId: 'fd68f554-6eed-4217-970f-0bfc51a4c4a7',
                tenantCode: 'mky9acosv4dk48yuoh6e8tefm6z4fm6dq90xsj8qi0t0xfhfxw',
                systemId: '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c',
                systemName: '668qld1wdjn7pwq6odk3',
                version: '02o8wp8tre93ljt900f3',
                scenario: '8iw3tnzoo61yxk6acqzh6btctap9kv8ujkd4y0a80a8y7uuw8nq077uayicu',
                party: 'x0x2zt1y9idv6qo88hvq25ejhdmd8xfv4j5x72ts0bqm4jz90mcd285j888xkwt6k8sh8486uygn7f5wnm4i6ugwyxz1esubekko3axif7x05jdmw1xi7f5wjzsy5ncvql4q9avsu54yq4v9brtgdwbt1q3ykz08',
                component: '8fexpm5qwmxv4cpco46nm4raeexxwl3v2tp0la0i8j8jfjj3tvt4b3atk7ybogm5xjpbtqfsoonwx8y98hw7k5f7zlt4k9ubajyx1eiimqzk9vbq7480q6j3iuxyof17wh6ykhukffmijn9xi7ha4778u3omwhds',
                interfaceName: 'g9p3jvukrqfnlpb6hh9ta00wbea7ga0i0ry5dw488e23g8oj4bl4s71cvia9zh14drmolcmyhfm5rbin1vuz82ueoxeopaag4nnrmxiu7p3wouqaf1zxh3npmxgni7pm2krlf2z02ib6a4isfnfkajge45qjezop',
                interfaceNamespace: null,
                iflowName: '8x3g5py02it347go6klw3rf8l98ho4whibu6hn980tkgqmk97krr8cawapz8k149yjssjvw7s5f12v3af577z6la18j1w23hk8r4zler1e9kue8ul2i22nyr6bs5z0epu4q6tolj1ce3yh8m707046gfdlsmhn6c',
                responsibleUserAccount: 'xk9zck3q7efwnn72w9ir',
                lastChangeUserAccount: 'q194zkn1yc393km7v5xl',
                lastChangedAt: '2020-07-28 10:27:25',
                folderPath: 'xbce4vbrzqhe1ouyq85fccuj298phhy24nzjhqvycweg5uw4ohhr8qmu2xog2c54mgesh63bo56xzt00r2ovn5oe3sdd4fm6dg8iqdko09ac9njiujhpxc4meeddoj9wmg69stpfaiigvxkpxqo5nqovg8f92eyr7h13nvjdf0mmpatwaamb3jw0bqg2rycnftf0dcocvjy13yjdg4jh7gqbrc2f6wgr6fz1z54b2x8sgtrttpf6dg8fm0x4hgg',
                description: 'v6m7c1pj0ivkp5gu0i0uqxexvly5yrtvszbr87bks90m5igibqlf70sg8cur7i5lh01vdd1eqc2x72vtzqxb2oretqfur3f4p4i2q4rvqo25ur7f3fnpnzrfd28mvuyiswib3ghmsb4oryzhnvaj4avwjrbr1bn4ochz8rqzdzkfq9wvdqutj4xsgc1ytha84tlj7dw8av87e6fl9cov3imhfjsuhu45tdchca8j8heravu3psc9nh4wq8mcd8l',
                application: 'g0je6d7tgoo4h89avfadbbwzv8i1t3gbytq86h35tb1jyb63mldq6ghjryd7',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '2e910aae-f108-4b9a-81f2-fdd2bfe96927',
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
                id: '1e830191-6cc4-4500-8bc5-1390347b5b98',
                tenantId: 'fd68f554-6eed-4217-970f-0bfc51a4c4a7',
                tenantCode: 'h88okty0bq58nli0w6lhg2dszfda7ewah6wxr7l9jw21rfdlqd',
                systemId: '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c',
                systemName: 'jz1kbhvkqxqv90awf5oq',
                version: 'lrlmatos6e9ugmxepvgy',
                scenario: '3mznp4it9px6qg4tdwybfesl15idxk42g76ngg2vi20mn7ht8ehaqwry48xm',
                party: '9pitpg0kbxmziaxp2wdzraam7x61fdxxtzmu2ptlos9g8yjmmu5sz48fn405vmr22wdxq1vl8151jpovacvtgh4fet0ou1hwiivciw8le94rrl6mw0j168jj2klxlwyb4uo55mo5na6mzgqtppbnnm2jvcfx432t',
                component: '3p33sq17oa4m8mqoj4rc0cmzjihvhnfid7d7si3cuoj6bkazod0dvpcu9q8lidrk5rbzv7cujrp3z1sezsjdfjib4ga1ybmaoxls1r8yy9oi6v6ev6x77bx4ynmwaozwciavh4wbvabngot1154pso0r0ktbhbr2',
                interfaceName: 'bogxxr6ahxy9mo2zdrtid1aw5ci6qgx1s476nprmja55cxwtyc0xs5ymuv38rjqc3oscc8a73inu057966hf4jjkha9yg2n0oyt7rrszm3ewzjfi4yw84ftughxi6tmmsvdawef7xomk4jv2ylq8804jgcz6yr5u',
                
                iflowName: 'ndpinf96mtoe3umf2qs35azp9g9wjrvpc72rbgfr51iycx2okr1il5zr1tbdj5d43vilfya8amz4s97kia8naupuzfdsq42d7ibjhmeoy5203bb7ti00tw5pwnog0vr14jajk9x0sy9nno3wp8tk91grm72u5r5z',
                responsibleUserAccount: '2pzg3eiimz6odd8g2bby',
                lastChangeUserAccount: 'hb5qmo5uyaawqysgmhdi',
                lastChangedAt: '2020-07-28 06:44:25',
                folderPath: '4yo0od2q4rpavr96s0shbdsdfk2ziaji5ri89lx2b9i38cttzmol7x63ge8ddmlamg9rj6ixqxv89i3578237xqtn5ya6n44u7zlzl63r0mk90nnt2iil4z6x1u0kydosafe3pe7j5lk9prpf2va7z3zwso82mu0xb3f7m94stuc0o95sefpdsb1t9xksz08aiwjrfz3342xa2rmpo1pdane6fkmxn1ri8ofledr6q99ksghrtaijcs3koh6gat',
                description: 'pw5vjmw9augs2578e2a7xcrl5e1x1dzt9ljla47ggfnmhriaerhr7tqbh8idb5shl9g1k212qlpukesv551e4xo8ao5qclw7e9z220ounmxf4z4drfrn6av4knp6f9oazz0latf2jf8kxz6ooivdflp8nuyd8t3jy4dseimy6rnkeiaxe05im365em4scdizdik7iro2wv74ndfri9t7lz3guumjt76ar7djpwqcqj7mj3uij4rhxr4rjeyv8hu',
                application: '8s1hq5gwygbbk4y3g5nmpe6zpnxse2jnexq2wtnpoprqj2igeoo07n3d0asd',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '2e910aae-f108-4b9a-81f2-fdd2bfe96927',
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
                id: '1e830191-6cc4-4500-8bc5-1390347b5b98',
                tenantId: 'fd68f554-6eed-4217-970f-0bfc51a4c4a7',
                tenantCode: 'fd93nl550cji1o2lsgoz3y96f43ia13hmqywx77hm3ob7pvhjr',
                systemId: '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c',
                systemName: 'emrnzabqcxqk20rxmh52',
                version: 'gy4jdc8k3oueuwetnfck',
                scenario: 'tm3jf5gq7ud5dzc2dy5mxpa318owzk1655c9qnluzt9uujda9ckaqrkrjevx',
                party: '7p7zhb0lpip86sjl6z95iaidgzuzcv1kvmnwolw3xfqhq9uqcwkm3bs9w8o2jqcf6lsevuk8zotc3jevmygd74iscaowfdyg49pctdstoxnk0dlknzmouji4m7mnhd31yaugdxwrsd4mzlvbisz37aizf3tm0603',
                component: 'gy3aq0rb84jvlse9mi0f0spsmr6164th1yvb4bdwcam71jq8cma8ub7mqfw6jj8b5nr68aaiiymml0lcs6rsjphuaeip3rhbn0y7trnhhdmjc5m8rxwfcfj2cr61lz4bypv8vy3vxanhmdvqq1q69twry02nz9fd',
                interfaceName: '6q7voo8zfh84fpa6x1krx9jfbx86mfvi6z9zi9otazanxi8ty66yzoc3dwtj9bvsxq7jxp2v4zcu8gynp2m7yldqvs3amhzjxsigha3w1zqy85h0uhv36qfxt03p8abxcubkulcyxv9sr75lpe9ll2wugrwdn9yl',
                interfaceNamespace: 'h7gvq2ptox41j4p7y9lfqt8e40cklsj2qtc46gq3dzr51rxfxdliiu4jq1t5dedd3zasxb4072bg3tly3qipknnsg01uedon3d1qmiohg8gyohbd9c6ez241q6vhaevsvkn43334repd6tcs36p08sjsnzhnocmw',
                iflowName: 'ezm2ucw7c88vlycynabakdjc4faaps6c3ri4znt2d14v9tcbdjln6zn88166imwkrlgjc6mna6o0erc1x6eohkgi17m9hsin2gw48gswvj8gu86nnp5iv0suoklxcgbx2p3ii66rl8qe05nd2d599k0mfvtqj7dh',
                responsibleUserAccount: 'trjqluz0b63uj1sz5tg9',
                lastChangeUserAccount: 's687dxatgivlngo6oq26',
                lastChangedAt: '2020-07-27 21:31:23',
                folderPath: '454vk0t5eblkm89r46y19u97yt52c1ncwr9sswvrrlf34i9yeb4nehl5ij625cebrqo2gsw43lcsbs9lrcekreh0hojax9ifut228c77ifw4wylq53r5ha2pshkm59a88gduujko5pjlr1sjo3ry1t69qct1o728r6ogj7vpaxvg3ixhhsm6xbuup0fmgdmc9azcek7unx96gwwpjc2gttg9dwlta12kupqxj3vjp3t8eu3u0wa4q1822fikqdv',
                description: 'fgyybiv5bza0cuc7jmeaspz3jjddlivw5kusiwaudylctr1l88bvm59019hz069zjxomvg6o2fncnf19tysz909n37ldj6iionimlqtisrggydrxse05lgwtcml4y3x8hp2o1011a3ued9ovnbqkki9q4j38cpo6rs11vvlqe7hjopm36doqyzpy6t9keumz2obrxllvbyz1sqge6jwe95pin4rqm8r4vvr7ma67gxkafr1hwum7ivbfgryhw8r',
                application: 'gklsislfntqq8tvklar1axiag6fewn41wmqk8egj932qbo7s2x6wslbbux6q',
                isCritical: null,
                isComplex: true,
                fieldGroupId: '2e910aae-f108-4b9a-81f2-fdd2bfe96927',
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
                id: '1e830191-6cc4-4500-8bc5-1390347b5b98',
                tenantId: 'fd68f554-6eed-4217-970f-0bfc51a4c4a7',
                tenantCode: 'igb5wrfsofzkfu5wjo16zy2m7pspfg9wnqj45m0sl1cmkmwbgp',
                systemId: '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c',
                systemName: '0kgetvjigeduk8hjmbc0',
                version: 'hw334x4un6tjuw9y0l1c',
                scenario: 'zym4kp5p6tma8vs2pdkaiky2ovx7u57mbypd05160eg3bidvgnw4y2ozxtro',
                party: 'dwpottgets90y60ur61nls3g5za4z5ytbtf3bgcvu49m8ib73lcivitalm7ajuse1g35k8oi02fb5nacq09y1tbqoauqjb0wvky3yza1yg0fe8312q6feesi7nq7qnp3na5d0ulfl0s961b8oxx6s58v2nhqpaze',
                component: '7x3bv2udyskqicg40r0jw6kz4xrtsrqh9ludrk44c0noivkduq410exjlbq982f7rppyo1kv3ncl94j7nbe5dtwysmol5dhd9gwxgx3dkj3jrvgzag6n949qwk565y5ja6nlovw9v94kliskqreux2da7ia6uoro',
                interfaceName: 'c2kaoe54n7hq6wat8ir3pnnmlxw9ygcrlld15x7q7lcnipuxojku1efdax12nuwgev23cgv1oprderm3zd4jt2mpsgfl66xsduvi798sk4u83s8wksvdwzsvd0shshslhybn4fguedcesokptoj8ev5gcat1zukw',
                interfaceNamespace: 'sa55jdnsg0m9be2hke5nhc5y4bnlb5ob6mgd688pzz2ciuc0zhev8c1k47d1hfmoiailtf856nnbv846cogts5uuydg7vzeqymizqp76tt1fceszfdzll4t5n9hrk5h0s6ngeis4pf6vwqt76z93cxly1388ob57',
                iflowName: 'wrld7b6ze3y0tcgky9h52llujfp3pcevsh9oq7lkdeugwd486ohixbsvhok7xxl15eydkjas3en2vje1h23od3gb8r58q0ibem86sk6qlq24tib9szoiclatkr2exk41z11iqq89fiyldjn8xq8mw5icoep2iz10',
                responsibleUserAccount: '2cnael8swl4928og0j9y',
                lastChangeUserAccount: 'ikd1vnzjc23nqdwhd3fy',
                lastChangedAt: '2020-07-28 01:37:00',
                folderPath: 'qcondbcp48zyzik4ldtwodjj5d56kbdjcqsoc9u3wty71h848y7r0zuk0uk4us4bkg2ldpzur4mgdjam0bnbub4b14nu2jbijpi054ol7a4w6jexy4ophfd66uhj9nq32gnsglmdqvtpfvtye5fidcho74v1moemasf9q8uahms8qnonobexwnjwofis3wl9javvwqpj43d8g1b9q95adkkei66jiawx7w6fa1q5xg1c8df64rcfymnzvqhecbz',
                description: '636whxioxnq1zkabeba2hiz1di0hmpfa1t8082ksja2mni458ecgou5w4rqg17ohn6ii9is9z2bcimdctcqfu5pi6e42klmcb967txmsmdvpl5lbplktbpyx1nnrk7ef6pwu19k44h9as06tsr2xdb6ss6oilbj9eghnheommp2hq2n134f1m5tyv893wfa54cfhl4z2ih5qqkotvoomaeo6ich07080u03lq6boh854jihppj6y8ab5o0932w2',
                application: 'okqtcstkhc0lghmfkvflo78gebe0y7ct0x6ooj9s32pvuenq80und7c58n8s',
                
                isComplex: false,
                fieldGroupId: '2e910aae-f108-4b9a-81f2-fdd2bfe96927',
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
                id: '1e830191-6cc4-4500-8bc5-1390347b5b98',
                tenantId: 'fd68f554-6eed-4217-970f-0bfc51a4c4a7',
                tenantCode: '06ih8mao59yeqc4s9jr0vog2rn6u0y0ywolnx137h0hxky7rqn',
                systemId: '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c',
                systemName: 'qfwr1hhfwsi9ekpjcdd5',
                version: 'jf5n3ogi7ph9trnodyfr',
                scenario: 'fv4de6shtdeytkg0mnkhkbcm14ndy5doyc08ug15stkgdmwo0vwnqkwyhubk',
                party: '5jdgdci50pr67x8b8aegrgiis2tkf8o54ezn92hs1qirwyfyjh8403wxoi2exevtqpsmfuqepgddcj6dpf8l0fzzo4wgvc5wwc2rlfqawntr1cimrgfpmoy4nv0eg3i83pbac384tcgkdjw0rosadphv2ih7qrhl',
                component: 'yowcnxvm4kibpufeq6k2ziydvxazcfebz60hb20x184thudp9mzlpcurvomou5c46u6ap56yu2hycagckh9p80yg2d7snrolmgci11yksuzcua10tnmkkufybirzws87k252b4q21jq7z9jq2r31s2hbivpmxqe7',
                interfaceName: '8vkk7zz5f5xr8txruz1q67c2dqd31ug95is6psb2pimhvqm0c0ke0ypdbduiljfkts6qtm64q90gc18amqxhda1uv6derxtzovp9lcj6zl6nv1qzw4z6n1d0gntvfblybenvdnenin9mlgbtijk7r0y820e2oon8',
                interfaceNamespace: 'nwyxanh3nwl315ryi42wnyic5ivv3dfo1dfzuc8kyy1uogb9xzyoivdzw13vmkpkwglfd1dnqqulqpv5s9zn313vshwcp7gihwcjoauyua1z9o4908swufmwbmik8e9vu8mvyjs9h15u84h87ghfh8wv8qitgni3',
                iflowName: 'fye17aqan6dh564eb6oi3vxyjtde0xygntw127rsma0nwsukpo4hdegy5b7e8tkhlsfiynzirqbkkbm4lzq32peg2f5urgne7vka9i8m8xx70pnd4az68ghgpmxf0elj812ojpz4duogqviidjy6tamk9tfguwmu',
                responsibleUserAccount: '22fiukhox5tjlomv1cva',
                lastChangeUserAccount: 'hox8rbvrpy40e8rd3a96',
                lastChangedAt: '2020-07-27 19:25:04',
                folderPath: 'xjy3w5vib6pf11xptyn1abk7gcr5yogoyut7q7a9fggtncvgnrdwvan6fezxduf1ausopemrfdur5j8j538ks8ktvnqbtc1regel0r3z9ej4gb2ywumpivohjw2uscptig63uf71rv40q85jwf4n0bwmsph96usf2eni5tco6xj0kkseb0zq6guswciiihgde1ajo70u12fdfm2pn2830aglggdvy1wdpm93ueiccgsft4ox225klbc8pw7i5ro',
                description: 'ne4092omjx6bpyo392z953uklwuiaz6khl6xwt1iekpllnh8rncgwom8zikdvah9b2e0qk5jx4s9wxn1o0vp6fbn1mf2je1rfglmvdquppcarb4nvtprvp7lmeeid7ra8pxw0x7somjr7gwo25is0zvorv3zllj55nhtiy5589bnxhxydk19pbizn0yo1cgiy2jbxek99baopss9fgx7ducstl98vkylyjatckhkc21ewi3my6a11moth8xcspd',
                application: 'uwp3eqlyz336ibsl9dwnlmbe3dzkeauts99e1p4qs4tpie4ghedjy2lkdde2',
                isCritical: false,
                isComplex: null,
                fieldGroupId: '2e910aae-f108-4b9a-81f2-fdd2bfe96927',
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
                id: '1e830191-6cc4-4500-8bc5-1390347b5b98',
                tenantId: 'fd68f554-6eed-4217-970f-0bfc51a4c4a7',
                tenantCode: 'ec2cx8889rtpndknzabwbysohrplyinib22ewsn72igglee125',
                systemId: '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c',
                systemName: 'w1h1ocgnuur5lo49ookk',
                version: '0xai0rbdzgkg5ieey2z0',
                scenario: 'qbqqlyjpp5uo5wpnfer6m60whb8aq91djcomxf6dkwm13nlipsu30fnvsjlb',
                party: 'qng9v6k8fd6lihwfu3lf9vyiwd9j8clg1qjyo9297uvw8yg9acep1lv3y4jeu4mxvhnqaqc00pryihjk5e54xyqfm8kolsewp40minny289dkafrmsoe52tbc1cjmrjel5uuytpmhj23eafuabmkwvajwkph7hkp',
                component: 'uz3mte76fajby9hoya79o81ebd42d4gp5mam84qp9lzlu47b5o8tt8jw8v4iwsylzllea4b4vudes9h0150qafoiym243vw82bt4r19o7kyybr7r9uh3ycn0db2rcyl4rfjjs0i44jri3wv7t5tq7vcro6n6ceh6',
                interfaceName: 'oyi72vbis65dmz172q6penth9dps1abfu6ezy22agzxoj3em63j03lsil0fjfqv4frqzkg09foaqui7c9oxwt648icvwyv0hfwjqehtbnemj1lwp2n684lcrq6z4u2im416e698x1va806s9vfm39jbx6ptfkp3v',
                interfaceNamespace: 'mk678yk6e5mao6ryqcvmetcgjzkwqz3a2d93nqu087p6qncl45mb9xejdeztbzkbmx09zjwjkb9sh7xps8kvfcosawe7pilo02e4eovvpiev6yrhl5radunp990zyyr9whx6g3jch74h14dwwraky6dxi75nbp2o',
                iflowName: '9zpzo0sqq2mgnqygb96myy1rlr9dyo9gkaxizxeyxzq827snjie7zupsabf9zo8jvyay0be02rxuhf3n69c57yzsn8wnu3wan71ewkh4s12djfab80w6fz2lm5c1bhwe8dxierw7neesilglj8zwo7erp1v1xz68',
                responsibleUserAccount: 'x195t8tpf1n5gzefpzik',
                lastChangeUserAccount: '1huvsz9juqi3qybdjz2y',
                lastChangedAt: '2020-07-28 09:42:01',
                folderPath: 'zk4p0jyzk8v1mrhy3jv55w1lgvryocfvhpep4xnotb3v68fmmxurd4re3nkgn1pzz72hw7zndrjh4e99zec5fb9ns2in2mqrimzizbtl146lx2am24ervb72vrxnd47ltha9kotmeez1uppuc07ewlhg5h253mnrcs1ujjoy2v3q8tz0ac782ezqqi0703o3ei6i89asydhzkuuo8ik9aacyup0hjd9ux0fsnl8645xdk1m24h2vrh80z6i0c6m',
                description: '40musp1enitl3qu3foaqvtm4o6iuhil7gm93a8t3kkvrymi6rsdgjjsieyjg9ezl6c3yj6lxtr6tfa1qe4hzoaf18uzgw5i2e85xeiaxkeud65rovhic4izalbeim7u9qbvm74s314sdotisrcwj5e8lnphqw1osbouv0u494d5yx24i1f033e23o9yz45yczooi2fyvigiwjtzuehr2duiwlamappm2vksbsazz0hm5k50g8atr2efntjgiq36',
                application: 'illq8yrt2cqiiijv7s98mwsa6v5wdrrl8zqnsnms3d31kcvd7d3amae0h3dr',
                isCritical: true,
                
                fieldGroupId: '2e910aae-f108-4b9a-81f2-fdd2bfe96927',
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
                id: 'qn0vby4sgg23giklupaph3ya5aiq2guihn2n6',
                tenantId: 'fd68f554-6eed-4217-970f-0bfc51a4c4a7',
                tenantCode: 'ri1oc9tadwq9o8ue4tnzgwcr6k3e5khj7s506bmx5umtez8fgn',
                systemId: '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c',
                systemName: 'k30sriyhhpc60anvfxub',
                version: 'jodrwinskgiqauctyxdz',
                scenario: 'gl3otcifm256m1yrez454gg0zzfl5i91uprmq22b9pw056fft1w25jbspbjz',
                party: 'oj9v0p2nz0vrasl6nnc5o2upag6bxoe45temlo3f7fyyr5a74465h1munzvcvb0lkustydfmvahhdtp9wjvxvfcep5lw896yey0twnftb4yxf3a6sc0an54j5pl25ti83g5hkwgq7sot2pppdqq2dod1nwcnvwsd',
                component: '5jhot3r0zf21twdbzmd0hg51augjkyirpvqqz3cclkmuvwfb9tfzhp8fy4yhgoyo9yzpdi02jugx7jhoimargjisa3bfexoo4el4k7jaaizykikc5k7kdq809diw88ddv80yp2quz29j7eo8p06hy1w5lxgblokf',
                interfaceName: 'x9n0u9fgcszdfhlhjrbijbwrv6iaa53urlq4vdb0c04ihedm91cnfmhyo32lsyzglx2niltfl0vt18c6hcgoqwy1494bjs1vc4k45dqr3h15u16lx8q7tw65d8jf27fojag1vzp7lthuvc7fbt276qtkv3yhxjqa',
                interfaceNamespace: 'a7usb0oqge3uzdkp0vy69vm3kc09654kwuewgey5fht7p1gwdoem5g9rzars8ymqook9f23rav1lhlsw7b2vnvtmnhesm2ub3fqtm2av6hqce4oht1m0u5zy53dh02ekxlwef58bb47kb01fo80da7eueuqpz82v',
                iflowName: '0xcjq0d1myphyhu42kq39e48it17h2r3q73ptt78e72cgh5ysnvm4v2ype450b424q1h9d2myh7nj92dk1fi7sp20hiazed1npiqdxru3rfnfe3idre9993fu3bimtorau0wuqvlj1f4is8hbqu3zwbh2ygc99mx',
                responsibleUserAccount: 'ood0kvplh1dfssctn4zl',
                lastChangeUserAccount: '8zqzd2js4c2r65tldv8k',
                lastChangedAt: '2020-07-27 11:47:42',
                folderPath: 'dzeacta65r11zzks6sap58w7daiqfaagfgkcd38xgh3kmyw4069kx3fu47uhbt8njxsrcn8fuxlrijomghs2hybsmvs7yvs6tfl6hfon1t1kwijhhwnl4clmf6czrhjsrgu2p3l3r539lrpzw616wvjjac690cvr2brctu8cw613me06pqdllmh0d0a7x2hd135zqdviqsvogiu9q2rvhjlo5po7dejw80qqqswacuumqgsov5eb6yxqqda3wv1',
                description: 'qkadho53ivjjj5l2k551biju3475w7xmm2nf1uya7do3u3blup1ac3uk1f7q78y0oe5ckowy2gkyquia2s78ofx2iq8188ah8rj1t64wdsja300xsvor5kcan1e4vxb3qzuh8yzxg8c2irqnk5akw49fm4wciezw0gp9ed57l5cgshts8j4g6yeklt22hek7pwodrtgkrfer1ztujx5ymsz18zczgk9mv2kvbsyc17u8ezhv3qffcjc417ukef6',
                application: '3mfamyt7g8vlgvpdpldrqc5cofndscv3y9bdi6l3yjyfai31p93uv9u00kjl',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '2e910aae-f108-4b9a-81f2-fdd2bfe96927',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '1e830191-6cc4-4500-8bc5-1390347b5b98',
                tenantId: 'jxm4c5spngdlssxdnp9wqo0prbsxgtm28eszm',
                tenantCode: '8x9lgya7oig0vy0l0x9mija8aqbna6h7p7kt8q2wxmu2ssfpy8',
                systemId: '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c',
                systemName: 'hu836o8v7bwfx4z6rz1z',
                version: 'ohtwpzq5wztccodtowku',
                scenario: '0r3piidr4f0ms5qtdh5ay1a171s34zyhheaobhyk1zchtm4npxc2v765yxd6',
                party: '7q7nurihjf6ng9y0btcdu7exnyy4vizbtyzx3r3l0153774owjojzzxa9xo2lr5cgo0fi4mc5n37h0gyxj03w7tqpuwtofwj4z2nn8yny2wvhy1ve8savzdhmzkrtw0fzzf9dqkjoi8kff3y2o17roj06olw7qsg',
                component: '4rxpb7aljaehm9o8o1j982pl4l9jgliwhedxfctnndymo0fnihicsjmz6wz1ngtfczya4hplzeywv94e2584vy6galgmbxpdiutksomrgkcx0cn01txoncd5wz6zrx4qqmfvcg1csw6si3ppjviwu4t9ib1ii580',
                interfaceName: 'tw9mvbz2uy2cihtmmhr7g85h94co0drjsokz7tqsf7qxgwmrdzdq2cyka8dr6oyygimx85djd50xjzunulvacql3lpzsefy7uzqaeltixp0ene64879vldimykd76257095ocy6vkfh7hiq4whc7o6023qzxy2zc',
                interfaceNamespace: 'tnsffqxy3pd1uycvsrw1x0tl1ps22z5ovhog1cp66ejzz1fbgysnlhvm0218ojnjlup5cu0wg5g071x45whpuokq1n1yphgpylhwokb2dvf3hcsno9mrtko50ijkwde5bm6y3vxws1k88dibtdwlxmfeue8dhuks',
                iflowName: 'uo707hcmrxugf3tjw2fu8xs199gwe5dkxb0hbpus291hb3egews0mz8kioba59exv8livodopsl9z8khk20vfibacq3oa77gjidmbro3eut23q46v0xm2e84qq6qmrgqsmzmkxaon4v5vr8hja018moj4fgj34qk',
                responsibleUserAccount: '7ffnrfwtquap1kyvjnjk',
                lastChangeUserAccount: 'm3fexi12gd110rl0jipu',
                lastChangedAt: '2020-07-27 22:05:42',
                folderPath: 'unsj0wgand2f3f6a994objauiwl24y8momuxcs0p8v6ybaxlgsghddwebdw2z4w228pdyg8trgfbr7ff8wljgazvtepo0jc2u6szomqzpxye3fmwr001d1fd1pt0fm82xp0q4q4q9olzipzjjkkh1eabunyyfdabkq3uv5ykk861noctf1n7qrqg0mepkhqoj1om5mt9hixt4g3x7q7xfwhllysu6vohzz8ijwhh8hayksuvkr8qbtp8sbjzj5b',
                description: '82wftpv64w0hk4o7shaedjn97ebuaonz943y9b60hx5fbzs6l5vyd9ttfrpotjmv2txtgi19mqflq22rl1qazwz69jac1ri3rmlsr91n8qnm274zyi1fjpeedtyjm4dyajkocjyauvqjd6yoobeg8enqgp7wwvl2oy7kf796a999u3vcwadoczoqeqmz3lv8495sd8l87f9m4mt2cues2z6lmafcjtu5lkyt0ecmp9xwryshpt59yp5ihhlszws',
                application: 'c0uqjabf9gcq2cbl5d8uhwxehfj3g308yvs7sv45n5ccocpucgwujbqxfic8',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '2e910aae-f108-4b9a-81f2-fdd2bfe96927',
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
                id: '1e830191-6cc4-4500-8bc5-1390347b5b98',
                tenantId: 'fd68f554-6eed-4217-970f-0bfc51a4c4a7',
                tenantCode: 'a6ybuejkyte53bpmta5kdzx7rd563bstd4c19pygnpqvo5jjyr',
                systemId: 'otj1lb5ykaqbzimvl036jbbw6xw6bz8quim6v',
                systemName: 'qibldy8kg4d5fhm6si62',
                version: '1x8ylejvpswuihm0cz63',
                scenario: '3zuauiif68axhojmird7ywq1xo1spwx58hckmo5iy1sofe4iynwu0eqlebh5',
                party: '5d7aiia2qcafegc08c2cipatv8di2iaas4admyy1bw357med2vt458nywhctuk5h7jx5irem44ny9rw1aawg5d2hl7uvxpzuhq8zx60oqk7x6l25rvezstic2v0snn8xirlvlollfdet02qy4gr915ioyq471jm6',
                component: '4186wxmkae3e3x7jxxhmpb1is3smdn3x7hj2he39qqd0unnp7bdfna31fiji5se60lvzknz4t8mwff9pp7l1zho9pnykwbdirhvrzszjira2svjjgzraeyf7l1wd51qim0epwvd30mkxr26jlc9ynqppaow9og56',
                interfaceName: '6jf7ds22epw8a10ewvndvv76p1c3th3zbt7usnxic3n6alflwfsqzlij8eaiia5nxbdndzm4sk3bw9pztqbo5srle55wphw6u8gb8u2l2h8wnfbucc89mhuxcn7ofrswsm8t61h2jw2jwbnglts0z2hkaznn6bjh',
                interfaceNamespace: 'aydzj4i47cw9zlnohb5t1zm2odrmn6728ril7phmiaudc2eb8izl517vradm91emd11zfox0qb0guqao3ug2n7snskizriw0ix789nwncjs9g9ttbhunz3x112irnzj9ns57us0dr8uks0ag286kofoc0bl5ijim',
                iflowName: '42ds3gcxfyeq60l5r2hfn3jmpryylujsa6uc38r07vvb4lhmbd8z2sorgtsdnwfcxdpdpjzgg1rqwasy9uv8jwwuaw7zhxvr00sdwba147aikaziwfjklugqn9txuslxtjxjcxukvup7bt4o2a7fha7c10mecwhw',
                responsibleUserAccount: 'jvkdaubsyx6mcjrnvze2',
                lastChangeUserAccount: 'mie4l6sgpzfmatmzcbqr',
                lastChangedAt: '2020-07-27 23:45:45',
                folderPath: 'hyiry13kd2cdj3ziddgrm2ptkjmhzx4f66h0k977vd1oiuo2sj6maddioaz5rq6vfxz82uty0etua2xbrojc6805r47cvyrsweypxytu41g7ao830yzxj47ob7qnykm3tl1g0vpymdrhpxuvr47qfeq622xqgzi8rnp5opi6slxfdb959gkv6hsi0pytgag7l1ichn41si5bdu1gkci19q3u1gglhht4uy30zkiye2mthufwvcmrdjhkxnqsgef',
                description: 'xn8979w5jyl5hdz9qk3hjr1h8rqtm890toqdtt51hylc6vbvygyj1i4pkldv2on4crhayayeekym8325hzyh2lfpd79pjmv3nbwk5r6flf9uq9zigojkrs1gw17l3f2rzz1tb69nlfdts4w0lro68jimwx1h45tsej2q2bsfns8sionv56f7435ik14nfj5wq0s143ip5p64n54kw1yypl38a04v1s5lxzezqdr9lzjva523j2mywqlst5wi141',
                application: '02fldxy7chjtlur9a70fo990tfmeijhgtz1rhupjff6a3i7l11czcw1hmakv',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '2e910aae-f108-4b9a-81f2-fdd2bfe96927',
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
                id: '1e830191-6cc4-4500-8bc5-1390347b5b98',
                tenantId: 'fd68f554-6eed-4217-970f-0bfc51a4c4a7',
                tenantCode: '6n75wgyaxbss8dly09b9hjv033y845pvecp5cq9dlit066xb33',
                systemId: '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c',
                systemName: '44jywxa4np3sjy3oo1we',
                version: '8ff3atecm0d4hk48c94c',
                scenario: 'h9vatstdbso9ccsptg1s2yb4mavdq7or33kfbwofmgoi0jd6wgxnkat8tbi1',
                party: 'zoen0mpdc1h3b9274tknme3iq74x96e0tfuzq1z9tynp56x90cfea42xbf893njdzkq16awjwatx20lw1896d6vd6msr8o9c9grovjd20ytszesqdro9vo0ecflo1taxyoys8f2azq5nwg4vua3ljso3y6p0goax',
                component: '17mtn1pe1xuikgplghe4ell4stpl63ycv1wbyxrvpkqs6ciswjbzwdv26txkhlt7u5m0ivk5259yrpsowy3g32h5efzdi3f7p1eb81onaun81w5af3hg1swgyi95zvlwjs9420wbaf1znz4ugknoz90ieiow7ycp',
                interfaceName: 'pq904mihhu64ef628hlghzwnok87842g4ds5ikqi3qom63h30s5u49rs628ud66ibx2523y6435muh4fy38b2uy57uovipt283h8wcxh7aumlqavzl1fe7x7w31q0z7mrauvt446awlqnsqyt3r5swb0tens9jco',
                interfaceNamespace: 'bnsb1tsb8nab113a1gwyn9m65auowfepi2su5v7s41jq9h38kzccnar7kevl9ywqohzwujx5v68ot2xsevwm4x1ciyekwr00638d0oqoikf31iud2r80eufqgeo73p2vo98460uzdwgpqxfc0vbre07dd5vct5kk',
                iflowName: 'zyt14630fmnpwo5sysy5w6kcx9bln4n80sp2avbng7tpjc8uaj6c8b6hue93gmv2l8q5q1jp0951l0tu1p2sdsgh5gmb8yue7np7x1tw8lubule9kz953ly7v5iw0m9xmbcrab6o8bjsm3j4m252ed42kp3wj1f0',
                responsibleUserAccount: '46y5e3qdw8vjkuw4lxo8',
                lastChangeUserAccount: '549hht244cx0yxmq8bys',
                lastChangedAt: '2020-07-27 23:46:26',
                folderPath: 'xbn4qnfqkuhyb8za6icfrhafevgi16fh6sc6oimm60qmixzdvgm3tjeh7s87430y7ayf9iylftz35p0no2eymifh9vsr2z6bpa53dx9kis5m7i9gu2tm5ouyjollch1ir1aoocl37r2c9e9kqrso3kd28rnb6q6xrsh3xv2thyxgg1o2eoggqo7m9yipwghzh8f0m66k4ibhwwd3twtlio0ic9kz4ttice32ay5gfwnzhxwzoabnatcxppp4xjo',
                description: 'dkfqvl55p731mglsuv0qwy4d5rvzment9qno8tf2k4x2i8yboutioja9tztubslf6zfth99xrpp6a3s2zwo0kmoem0lx0jhgkbvbv0bkuym80la26agd9xhiyfmc204oeo22dx358k2asln8jxqq49yfhaigp5lguaskplmobjt0d2ubjuib05ulzean4blpc4rwc6005vs7aeiyt270eh6x5g2uys6foqset5mog1rj8xxw43u7uqukcgmy8c4',
                application: '25j9xomknoduvq93ee7s3ptzjp6i8vpz4sp3drwv9i7a0gm1cacc2gmk651s',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'wzfwqpbfjt00x5qxbsxn1k8uid2rhddhfdg16',
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
                id: '1e830191-6cc4-4500-8bc5-1390347b5b98',
                tenantId: 'fd68f554-6eed-4217-970f-0bfc51a4c4a7',
                tenantCode: '6zd7y3zbm5eoutu4fwjo9bo59g0dooo64o3r9bm6m41tobc6ndb',
                systemId: '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c',
                systemName: 'xm1p06saw5zf3ztdek2n',
                version: 'blj65mmbixsunhm28tjk',
                scenario: '5nm7tngp1cz8p53cx9ysvcyvfcirzchb7skgwykttwyn5jbvlgr286k9ogg8',
                party: '6fhe9biz1wszsvchq80qe2p58f2p2u40nje3r0gzrtvvoivat9n39wc4qq1ylze13wjchmh5kfvknskx902cqrtrjpuv397g4jeg5wno8hvhevawjx1i2dq0mofbgkjyr6t6fkmrtqqu9fyq5xza0vup2vtld2ax',
                component: 'axmi4775kfhipw04l1jgpbfqns3y2tvtjgfg130ul0hmxcui7pxa3pgcjcfvx6mu9znkiydzx3klb3bv83q8cysoq0ztzmtix5buf24xr8zsa2awna19hik1qmg6p0vbs1xi4ac0gw2p7qxgqsa2jxkxh6xvvpox',
                interfaceName: '0v6nulorru7r3hds0outj2tccy5lmyo1fb3bzvov71p3tkb6mjw9vqxbzckqgwbluewqcyyphssenzxgjebykosmogx1hzvnwhszvxhqehdd1hi2vwqalvp30zjgc79l417oi72zsqgregaflfrypojpx2d9zu8o',
                interfaceNamespace: 'vcm06nrkf4jp6xndeajtiu4edjfh4ukydv8w44c3eg21m86ptujmzz1p7768zpjgendsrdeuwdnlsjhsure51ourqawpsh47b5rkaga2sz64tp8s4ibp6tbvgizk5dc8g8x59vw6c4jyo38phxni5tf3gho2kksj',
                iflowName: 'p4wz2r1p5ptqg506gglstfa2rn5lblig2r0talilqt75behk87onzfotnspt0mqjt2enn0dx4jrb7fcitca0f2fsibr9gwwjk3w1m91ga4j3f3aayyfbznn40ss9wu7dk7pav90zcl36u57jtdpcayu3s5aglez1',
                responsibleUserAccount: '54t9q1jkioujm3qyyzc4',
                lastChangeUserAccount: 'ghz9q0q9b44kicddxq5u',
                lastChangedAt: '2020-07-28 10:37:51',
                folderPath: 'krgtglqm0srt6rg9kgbio79uqpflhgx2937y9xd9ad8dz2b3jaotzen26eoyirqm39qc5co75igg2nd8hh3uuxbyhmuc6zhjbq6bv6sl9cnee9gathm91h3q8tqfknyvr960jy08ig5oi28mpc4eers0ixb8nzhgszqt6u5deyq3xvqk09t0doifaecxawmsd4r5ioojbiutirjqodhd6h5im2xpuzhjp49ju3wep4lordd5y47cco9hih5p94b',
                description: 'lhi31fooe3f4cp6l02eperu8ewirx4u00c9l5smh6zxhqts97b9v8070lmho2pr97v92z45n27g7yakdh2murj6uk1h0askfv72bm9z5s1ogd7nufwb0vk0a0etzsu96hhaee9w99t726bq1mpfpcwpxq3d8t55wgofxt5j0dvmjikdz5b68cxi6yhy2eb92a5tgr8ddnjpfaei8w2abgm3nedd4plg2gda0hxvntcp2g1vh5naqd4y3km66uqa',
                application: 'hou8kgv5wgrwrtq1y7mi5959ci8gbcopm5d3stgp8q1xie144wrpg4eaktlz',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '2e910aae-f108-4b9a-81f2-fdd2bfe96927',
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
                id: '1e830191-6cc4-4500-8bc5-1390347b5b98',
                tenantId: 'fd68f554-6eed-4217-970f-0bfc51a4c4a7',
                tenantCode: '9w3s3b2395f6xpkywnxhl74vy927i31rrzdouqj8k4df9tdp6a',
                systemId: '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c',
                systemName: '38pgdabagb9fkx8zwj7xt',
                version: 'p2wr4uoeafbzkrqaly7n',
                scenario: 'fki4bqyl2t39b54lpltk0a8ai58g854tnfaecz3xz6l2rjb3d4kwugxl3drt',
                party: 'hsbkbzktmz2eag168jl2mo1xx2dua591bkx9at75bhd7jixme184f9s0nj2srvwii633xe6pnnumh4h0mak4lr0h44ze2rsycp0am6lhixbux0qy8m1zgvwi56n570n3bj7nkgnlgqbn31zpwe3bpppzak0trf4w',
                component: '32slnsjntrk9s96uf1p548kou2v4kd7pkv5lnw5pwvd8lam0seld1xb69kafay1rjf1ljmj1ru5u09ynqblmafoc3dm5rydr6vfdo8hps3kv0ze7i52neevyjvkaoqk5j1056vvkvum72o2p2boppvp7b65fq0xw',
                interfaceName: 'i0h8rhsot9nzymqz9xp7d0yg7pt97fjjqbonj0jtkpqpp4bzvqujus2ub4h6ft93tq57vbr5rmflvcfd594bnkhgvmjz6xrmcpsgvnh5tn5j17vcj12g8e53ccf46wrulry7cujc2c17axc0pdbfd5rnclq8vc6e',
                interfaceNamespace: 'ltcgpdklfq08xhjiuoa0oqd1e1hdqubwv4c683gmsbbhon6m2f5uo9ojkf9xszddsdunkx4ttj0hrx5l99l7z4cyhdtz7yvi5inev9e4izeomoreixh76m3m7j3n15ppnrp9zwsyrd0gl0kbpodzbgybk7b8y1lc',
                iflowName: 'iwa5eofzpkim6r8xs72ykbpe04gus1onk8st5pcbatkuh12bnhaovyxqvxcgooit90564akueledhsfb43p8e20s8qqa95dc8jwmd80037cbgekxfj1k3xmgmtdvidthtt5qiax4nd2zzyrt9sl3pgh3y1kii5bu',
                responsibleUserAccount: '9esg248rzc5zwq9w1b6f',
                lastChangeUserAccount: '4y19lhq88b9bttyzpsas',
                lastChangedAt: '2020-07-27 17:15:16',
                folderPath: 'nog8cwp670ump8tko3wcu79ak4aypzysz96zvnixcq2rl3tqmr4c4piccwow6joh2rhb7mahs3v3i9ymflxkdhjz6h5a7j7vqeuyy19ze5wapikf73g0saas7bg3i8g8kuglocnyu2gzrclgq8kh8fn5383ii3z17g34yymjvpyhqclohams9rwtheo4u9ph8abdm5i992ltx0dijwsljol8zlsjjtsnzxdja090yagr3rj6k89psa9uj34uyrn',
                description: 'mxdtpxuvg7mfoxx48ojv8yuty95qv7zlmmqgo5vd0j1w90uk8imk1cuvqb9dwxurq9e8xf5opp21rue78j94y0ql3n888g8yoxwao7ajsi74i1zgs3jdpavvc3i4i0xphrdv08jlozkx3mzg4hiostg6devw9q74aeo405yodpz7j35eu621g63wgbozhkl7l53rmq3oea712h16k1ztbkzru6oxu3p2rvstrfjkbicziigwcg8gpn3scb7q6gu',
                application: 'k3yv18r1htgccwo5f4jabmn1e7ol0cc96h67pdzg1itp0v2ri93ru47e78dw',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '2e910aae-f108-4b9a-81f2-fdd2bfe96927',
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
                id: '1e830191-6cc4-4500-8bc5-1390347b5b98',
                tenantId: 'fd68f554-6eed-4217-970f-0bfc51a4c4a7',
                tenantCode: 'i1scf0q50a7u6ss5ml5yl4yadv4jn7uf2g64080x1word6k7js',
                systemId: '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c',
                systemName: '2aquwfrvc4tynz3ssgjf',
                version: 'fmyfnplfqt8rrcoc0z3x4',
                scenario: 'qv9121lpxqh30c4ta3xfo3m70tk5g6eexbtr53imicijs6b13n8c5on1tpn3',
                party: 'lkbntdw9vwxhsm7kd1cp9aic1m9dxrl0k8d2d0u86hem35jupteolvahzlcacai4an689stgul59puqmbgev7f758zgbtawmwovd94l1xasefs72v1rpfptd8auyappfsmfrxv0dsw18xs9b5hslqjwkbio2t2i6',
                component: 'j1m2rurqq51znhjr59q8kpqvv7su0hzf58268lrp92qpvhj0v71wnpkmnlvf4engmvzwacreyaizbdpn8uvdv8xwnfjb6wxmywzwrd7jcfzw467f0z7fmcjsq5yt2s1tkozqyfh15z7kta6z4hkpp48ahkjy9t10',
                interfaceName: 'f96ddfdjmb9k3e7351eo1nkq6yygztn3tdim78ri3sgz6vpukhxzswvoupvzwuyva3cjxvowcr5gly67j7e6urkgwaofj2xdfg6sfkdkq8730yw9bj3rilvvyc75bi31c8q4a6f46ffw08gmh0jkpmmkfa05qecf',
                interfaceNamespace: 'ia7aa48s1f7p5g9osyj2krve5k7dnj7yxc6ids757x04wjdat9f0jd4wajxuwg2b8co99436ly58psu41jqnk8aaor8phi4fodyjocybaesmxceknwevgxzdsw9qck6ocxv38auk73pn3x0qwzha57v5mutwrp87',
                iflowName: 'hj3hzwqm07xt06jks63yzmfywyre3uaphywbkaaonx4u07snek9nk3u7x2h5tyapxq7rx2ml2x38o809oqz5wyslhovnrf0xqrrppu2nux6ot3gwtyqj0qd54uqhblbdl42ycqqropp7xpmo5zve9smtglwxex5i',
                responsibleUserAccount: 'm7pxbpc6n7ocn2adfwdr',
                lastChangeUserAccount: 'aemjv3t6y080kh0vn14s',
                lastChangedAt: '2020-07-27 18:47:00',
                folderPath: 'rivntcawdrytfslkw8wtpuujgk2cgwvd369o6kyy93rzj2bdzbfge3px39zgukk34t72ntg6ujr8ojaqj9xajlk9w68z4shs07jgjvk4v6lwkfd9pafn27372f0v8le69rl6uwa1546j83vy33jxz94q8nm2ryoiweeq88qvdmps58hf2phqez413eom3i41k3wvupms04cy5vw1bmiq3n3zdg3q9dbyw07w88ra8c622c2dztt1enoqomiffz1',
                description: 'z0crrd9tye01h6e176aqpr46xrsaz69spysc2n7edhxvbsaeqzhy503d5wwdjzdn2qmv92fc1l0wxfu12g5m0dmgen5v7wic8cwggdlnb24lnqof1tqu4we7yp58tzitb5h1vz5f6rmf8grv0lob5qm8ilmbz2vbc8xe9bp6zcdv7af6im3h9sofqm8334lbgxer2uenslynlby749jf82brr48r2djzhywh4x7btgs7qhnlwey2g8enjwkcav9',
                application: 'g4xd00bigsy2zeb05896f4khxa3u99rhtu5dmtfy9ly6m3ggpok04wrltgnq',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '2e910aae-f108-4b9a-81f2-fdd2bfe96927',
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
                id: '1e830191-6cc4-4500-8bc5-1390347b5b98',
                tenantId: 'fd68f554-6eed-4217-970f-0bfc51a4c4a7',
                tenantCode: 'ith043mdh96bdr7ioche3ms9gezorlrq9l8jacohww16wzwzzg',
                systemId: '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c',
                systemName: 'csrtzbpjz57rne9jarjw',
                version: '60rnp4hbrx7bxlsgd6ai',
                scenario: '5a6rgroj1ki4l0fylszu24j5g7fn9jozgdzbm6im3m5823j56zuihjojxg4ck',
                party: 'tnm8cnwrzcr7lldb1jq4bgamevxaca30r9hd0qsqebbt9u9okhnbmzedhytdq726x30yzpgatexmtcnzdns875uwyuq85agk8h666v123bwazt31xcpo28f6kfhx30tv54km9hjy0nghsnffidfrpdm222c5mi23',
                component: 'ov8edin9wcktf5imx9ztd7tfdost05z0rfgyn2rkdqtibyuntx059yfqrvkm620br9xakf39qfom8te0h5t9n61x4gb2dcl64bnytaxuoy3ne1wm0lxke4zy7kz3kuxvpi3gtet28gcvt51utd08s0yuiccy8bl2',
                interfaceName: 'e7p4bs8ck14na6e0zvnqkdlcid5z30ysbxhtiluhww0hq9f3g2pfewx92xl02xl8wtpq91e3cv4tp1wforsjozvf5uzc0ceqshdvir8871uxur1ub2hklbm60fw5on44jxfa663bbhr1q0h5gd0y6tzjfy5co8si',
                interfaceNamespace: '6j4boydugjy04uhqeg40u2t1ngxqndetlyd3wl702ohe3xbi83tc7ibba2cupyuapfg8apsdr8po03qvdiv2l540wqbb2mh5jrvf7ffb0nbyu2hegyv04l676pu0bczb3n6dm89erx7tv74gxkitlhuy2mij0o84',
                iflowName: 'ylf66xgzd8biaco6g7ysz3xbn8lgewh1ljjkjefz1jtol6ef936foja3fu1q9wjwgtlvt4i8du2tfhekz79srun3wswb1r7u7r80mbw2wt35jk6cvl28j64mvt5y0snggbmp7hzes6kqm3731uzrn5qbdfncgzqa',
                responsibleUserAccount: 'gr298pzf7ld44w4p3bvu',
                lastChangeUserAccount: 'kpevv71kvl6zltnqazp3',
                lastChangedAt: '2020-07-28 02:45:14',
                folderPath: 'ntowyiu55bjo0umd0vvmwqgvynccsid0c0jnkuc6zf6xod80b5txzz05a1zfo63iy6ktlrvk5mub38bslyc6vyzkj042ine2wt6vklml3wvbwmajp29hwwxru80grorefha706t9v543vb535xyyqutunpntqkj847cp915sld1cm3fz22zlolrq9gbjkvqfo1k68titokrbmie4sh8z4dvyevdbi6chcjk7xvuq3xlz9us28aoiwf5rlhjooxi',
                description: 'y7o4neiwvkif6n94v2ssyvh31zvyv7u742o5ett8bbi1lwbrbwh7o8s9t23l5jbuwz7iu8t6r9xlcw7e5hr9yl673w42xkx4b2hcq9ea0jqxlqgetzhb7bgrhz8dtcujsbghhckpt0y8goowqohtqruw2sqi0jgduv1ejgmqc2pikp49xaz22lfihi5z87cnk005j7pe91lws0leqocx1gx1vu31b67cdj9xohi1lonanlprmn522a5dh0z18xb',
                application: '1a47i8yqwpv4m2mfpxt7o318ibs2urzl9qu2xem3xcmse59beu4t277aspju',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '2e910aae-f108-4b9a-81f2-fdd2bfe96927',
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
                id: '1e830191-6cc4-4500-8bc5-1390347b5b98',
                tenantId: 'fd68f554-6eed-4217-970f-0bfc51a4c4a7',
                tenantCode: 'tf7mrllzdft0pxby76xhckay6m08odtl774uv4f3zlahu2d5n7',
                systemId: '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c',
                systemName: 'gx6buk881dfkfp5ojm4y',
                version: 'umo5mlv7jtk6yoe8d2np',
                scenario: 'nxnsmlo0fi3o6l6de2ytrwcgjy0g0mzwhe9tq4b3ew20i36nl6dlnrmmtect',
                party: 'z4bhyxezi5wxauw79c5rfc8f0ceiism5p9j1vd8esjwsyqo6qglb4iz2no2y2ran0kfygz1f2fvd8sfw0az0mswxljpl9m3cjig1qymgico8zt026vg4kjtgacifjnqd3ob6ky0hi79abnoxl82p6nugn182ak2mn',
                component: 'f7otni14fz27zzgqonnxbklsgkr3wrwm3khz0hvxmv6m50f5wkr1fownzwvwxlf4nddreivcvw9dlapyo52krd2jhl3br7w5h591mka2j29ap3fibovbt6iok70n0c37ugterukpc7lbv8x54dtvphj5jkgyi392',
                interfaceName: 'qdjpjfby7jfdgg76jf6w5xn9jaf6q2nk70jiuwjr68yy53x16n9heo8v60n2d3abkh8f7t03kz4uvorbl6510shpsk65csg48v5vhnn5bkz69v0o8zqjy3qd1k2u3rc2gux74k8nxokhrhomiigqilc151n0v13b',
                interfaceNamespace: 'i4w1spyu4gu18unt0162izugnzcsqlfeicwvvdk3s6xqqvjc2o91b7lfp07p18e43rfrodtz15qi8zazf6t38m4cop6wdta230xytxfgqj90x7qa5ce3kk0x4o2zzgr4agdl4to46vvhvrikap5p1b90mjta38qp',
                iflowName: 'ygladhyiwnxg5aglec01zhtz3x4pcwjx6s3wg6jzu5varav92xmwj11zrscdts3d00e5aqizfwquattcoxiypf0tg8uoxjfghss15tvfwg9b5f5kbv733kzhe9oal01y6wmg4ik9j5z3h9txfl3qxoxi7rrjg2y8',
                responsibleUserAccount: 'ern7vpc5imy66ih4xeo2',
                lastChangeUserAccount: 'wbzanhy6yki2a3n0gvci',
                lastChangedAt: '2020-07-27 18:54:08',
                folderPath: 'pf9e0c4zbvsgdf9fpq2kskedivcg8yrqmq7054mgqoscjpjepgs7m35kf7rp6ndr6naltwqjtw7z02c6onnvwt5659igtxnqkxfpxjga852lc9rlfzckgfnxa6b2yhyb0dsnm2xivhmley8arerxmpzzw3vuudy83m1dw1hs45d2n6smmn2hhgibdl6smzfn6z39c30bq0v63m942imm9i0hlrmldzgkns90c0kobbq1ldy0md3i5i5kea3yrxq',
                description: '0770tsktmpkyjxuvb3edxli9awiy1i64t3g1qlsid7qbv1uhhubhr0scn1mwwuboezn3vlls63h9n82a2roh0t3v1ms2k5w1sbdvygciasfpd7ogf3zft74z9tah621m9pknj6to94cnqh876eogxs3z3p6a7u0y8p6i4menmm8wf1viz1kzb7kmw8r7p8yb4irhetx6ramutpf8bn79eoa556bmycrzknp7ksnizkl4oif7buesmg1whv40x9c',
                application: 'mk1pmosocg89rponz0pqaugt2crby7q1fe9tm3lqgnvdthvw2261e9qelcbl',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '2e910aae-f108-4b9a-81f2-fdd2bfe96927',
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
                id: '1e830191-6cc4-4500-8bc5-1390347b5b98',
                tenantId: 'fd68f554-6eed-4217-970f-0bfc51a4c4a7',
                tenantCode: '3dxkbm5yzedh7d4f4m2a8383mwu7ccr3bsbia6zju19lrjh4x7',
                systemId: '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c',
                systemName: 'iuaxvkanjm1t3iclhbrj',
                version: 'bzl5wqew039bhjlq73sq',
                scenario: 'qhpfjz69hljfxjgmwqv2ru8hun3n3zciexzhgphmu9zmz03cbdzehwo3p39q',
                party: '97a03nbzcs4g8sfe3ee4b6aty9m6tod4ghr3jgxqd5euq17baz05gycoga74stx4aj5yfqtluy5lv9pwwd622yegxswt5b8uv9kn6e76zgvbxmb5htuhbwxgv8nyv7e5cngli2wh0rywk98g1hi6ht4rishd6mkp',
                component: 'ek8snmpgrx1uhdvv06e405gj5itrwzqg0mldvejmj21f4l78da14y4lzlyz3p4lcn19vzykz08tatz1ovn85fujgvdza2f41kt39dt7g63qdys39c9b9v1oxgwv1qbvuxiv72jbpask2fcdi2fla7wisc1haxmy7k',
                interfaceName: 'kf8fq4gjddgc69lzbtxjs5xeej3a61u8ctezyjzjynjla6v3p70804hw0euox97tkxv1r6bbuiddqmowkt2ozn1zkvurd95cp2zhikuhrl9ks2pkefmh3zbqr95f07qxjaabhrplwszotxlwzc1b3trvs5n5nxbz',
                interfaceNamespace: 'hj2km7mli4yvddy2aydjmugvt2obtb7zi5fbgmimzav9j96f3dlpo3pr4pj8zy3u26fcw6b1ssz472dlq17eyicom77qrmzhblbomh68ogew0y6b5klxzx6h3eb0g6sm14w4oghbi6rihn4kaefc6bi1wm5u7tsh',
                iflowName: 'itr2k0e0gzqnuynnn5h7b0b3c3dmqpw8864v0ap9mbf2s1wthlri73itsnbwh8z3lzljbzdj8b5sj9onpknybvg1se2prg8422hq4nqd9xdl59fsx0tbp2y7hvk022ucn90mu4u2awstuys2b228q4urr7f4ivl3',
                responsibleUserAccount: 'vncc470vryk3bx3qiy2y',
                lastChangeUserAccount: 'r3v0l0svmmqi2enf997t',
                lastChangedAt: '2020-07-28 07:09:07',
                folderPath: '0tofbknzyt5prp5zis20qufqpugdx1voivl8mxhood9im75bdixtk07vhrjp779ev8kqz8x8rehgp7hugxgzwuli5rjayzpgid81lggwqq9fadd5keu8wj1qif9paytnfsyv21b4rkwf2xmh2vz7g38n2fbhhayjbcbvppyy3xlk4kqfsujxgrggs2kgdjjccf3cjuf89i6a2ona9xqsa7hy7eugwkbitn0iuux5up8ry7hfm7adyxpugi7rhoq',
                description: '20m4n6szmadafcuffz6ns8bsh85sgmj1sh0wx5krumldq1yy1egwq945d5jhry6kwin64d34dxw6it35zzlll9ofwlq9k8vle0g8kvjy3vw8q0qz59jjkmf954oh2an9qtspc8ny9t3lgsbjs3yb815frmdxejxieb6ao6edhmqv72wsd6hl4etui89wtf94ihv57tfrs06uk478mm74q3l74kf5lkitz0jlgherp89cmqvb6e9nvd1mtcas2c8',
                application: 'p8iv0s22ljktnks7qk627zhknzapry1tr6j90mhnv8mlt7cis71dkmkuekd1',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '2e910aae-f108-4b9a-81f2-fdd2bfe96927',
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
                id: '1e830191-6cc4-4500-8bc5-1390347b5b98',
                tenantId: 'fd68f554-6eed-4217-970f-0bfc51a4c4a7',
                tenantCode: '3dwjfnut7wjj1p74htavdovnzjdpoa31h0qrz0z0ne9ibvd24r',
                systemId: '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c',
                systemName: 'qblb5xly3n6t2km8i2q5',
                version: '87ipy7ruh2qggfvagdft',
                scenario: '8t5loey82i2qv9hvguno91cevhxs20oqa2ep43zeiq270vi9o4kct25suomn',
                party: 'op7gwtjvfspmwee9qzgo822wfmq8fcf8e3z67wqt6ru363cuznn7pbotanvgvjxu6l8gkgpl7cvydb6c9c7qsea52ktjlja07abg824h4tyfnne1q6f7cna307fuyw6pqnxh7etxv2njk3yx00h4yemkg5u8yat9',
                component: 'u8ki573ktoakarmj2244old42yxpsj8hm6gngi58hmhm5fn6csz62k08lgelgpxf2zkj1nfk9dr54x6aoigv8cd3rkxz8ywuzbuinulgqhfjmv7ud4pcgg3h9v61s8xujdhem88jntf0pznt6383xbw3fxxezzlz',
                interfaceName: '3c7t98pmi79wtauaqfrdi32rixtp43g81eeij1ng0hhu163ippac3bpezwtnqlps9k8jqfo4pzywn19lmozjf3lme30n4k0avpkd6na6yaubd8uew2njhd5k2r730jix6mezgo9bbhceqnzmjqbfk9h9bck6r462x',
                interfaceNamespace: 'q4a0njoleba6p7xba2sdz12oxizj2dw0ppif7tmaf1w3nwhaqxblup581q6uyixg7c07ts7a36d8w1aduaj13g3zgom04ix6q1sg7ftoqd23np6ol3y9x3fr5xdt8qw45zob6g01sfkjmiu88x01fml0o6w3k2af',
                iflowName: 'uxbzsvx2ylpay93d04la92zaum71cdlqic6whgpfrhym9gxw426up1ywq434aj5blu898la3vwtc7b094qcewwq8i13v22hmw5rzth3qucces3zj7a53pqsg2nvlxn69sp375fgk4imd71vrp03o34ndoue81ffx',
                responsibleUserAccount: 'p38xkn4ujzziyyg3fw2w',
                lastChangeUserAccount: 'f8kto3rzdp1p4ygdqgmn',
                lastChangedAt: '2020-07-27 16:55:34',
                folderPath: '0gzskz218hisokmlwxsabgnzwali1j7r0os6aq35t3t5035jlgze9f676usmktxd73cc9k20jgm09rga8d0oat1k5rbz2g7bjcmja1ah64dq5jlme2rmmze91resoefaonlay59dohnlkm6pqrq1nf3itrljq13ymofkstupfgfuht10nf8tdz4lnuqj4uizmkon5rhxh5z0ihav6e4i0ojp218eqm08u5adakbjkagn77afwgjtrcfimj31w6k',
                description: '4she2g5js5cewebq5h4ozms7osmia3oi1oelcmx2ym8q2qzt10w3o7u4suiljrq6anjmhhq8fbi5axin468sw64425xk2aiz5fskv1n4mmjzdr4gtpw0whueieao3kzvwfjoz6wwjl6wie9p9tpqr4926hqtry4cm1e0k9noenh9l4muvisxl5eecnz3ir1n6on6ujcdcqwnm2567c5kakhu1ar5zbbtlr6pr4w2ur5zli2d6g2dkxxm4dn37ma',
                application: 'x3k2ypboahsu9i69pe3l026ilx6qqvxkgq0v7p425z2txm78bjwhnm3spaqa',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '2e910aae-f108-4b9a-81f2-fdd2bfe96927',
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
                id: '1e830191-6cc4-4500-8bc5-1390347b5b98',
                tenantId: 'fd68f554-6eed-4217-970f-0bfc51a4c4a7',
                tenantCode: '13h1baso4nqghpzrui5f6nls67dpcfjn552icpzrexf1neunu3',
                systemId: '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c',
                systemName: 'pgkqtpsqeislzd6z1s6k',
                version: 'x8ipjd1unddde2z6vth7',
                scenario: '9569p57kfvdh1togoe60cqtdtd8u798lxfl96jzd7icbjabowz01dbkzwaim',
                party: '7smpcezmwd0q4drfuvvx1e4axgxbnaop2o0avmjrwqbc70z8cf3oohnq195c1v425y1u7eel0q5ogvg7v5lg9qo3vr1jsdi6vnhvqvu80lj5y0z78ftms8ls80zkj5un7vxddq9e2la1zn3tw2tzncyiofvz42ah',
                component: 'ctlru6bmebpeys8mkm0fk9ya6ghb344jmszknk48oyw0zkvxyq9z04fq7spzwpqwjc0rs0je546yov84nv3scfilmm6c27xy68ymbff7ss0mj7833cjqfns740zk5mqzzoesh6uru1ryh8qw7ulri5l9ct035iz9',
                interfaceName: 'zzpq8ya2rk01ndm5zk3lfzo8qv64wwuzghnau6za7qxd0x1krft1gbl9yeqw6hohit4c8dkl5vzw5em4ghrn5hp6st0nww137xkkbpumm5h5zgslnbm4n6a5ew1tb6fatg2f3joz38d6b035yhmfsj06mln42ijt',
                interfaceNamespace: '97rap61m1s7brfc7j2uqn7fz1dsid3vulwboeb8kooperv1oljtkol9y5058ki7649c34e713jx5pww4em81q3k6myh3h4qkn6n6766y8r5p2wk8hfvra7i6c7icyf3eehv5a629boin8puqhsafw794yf7lno14n',
                iflowName: 'upq0szpxm5p38wgd49kp495xid0rgeswenwiinll6wmy8rv4v4ql2nluu8lyvfqbzwdzsbdzxcyuf64bi0v2d27ynrpk16vlpiji8bl6w61ewgh7f5duratp96rgfyxlwcuqnmb95v7if1pq3k019jdh8kbu1876',
                responsibleUserAccount: 'pv0rubxjcz7f9jnkbn11',
                lastChangeUserAccount: '26wgdmvyvlr8f4ugidip',
                lastChangedAt: '2020-07-28 02:24:47',
                folderPath: 'p9ed69zuol2v15u6773rf1gggfrf5a6zfl6rwpda7a35ekcd7qryv5a0m9bov34orbcvws3ogeblxh4g1fq2sugo2jnotnemwi48yhrn3eescjwsf4dkp3ockv89r1nk2xlko4k2gubbnhmwvipcl3ki2tolj8rg97lrchg6mzwbkrvieyzjjaetee4m2dxdei6ezpgb46wqj8d2jxk84g0tpe469mn2hybto6whug1yl50zsvrwalfvl313icp',
                description: 'rywchm3n8oyk5s2nz4ytsu19x3ici6icsmw9fg5podtidclo4wi40kotm5pnugn8kfdeqy7ysxfo873sql8om816iaxgv7h67dj36pc7p7imzvzq18ric44div3gilocmui204gz6052vfhgcdpnrysq1vqwyljxyr0ykuzl6i1j2zljt3uoyfn0p5l2foa3kh1i7tnk23uystwvgu7dqx0g30uhqcax2hk70ufh3lxeqkbkombkmsxgquw94ie',
                application: 'w4sa55k4at2193wuaa7byt97zdbjfx1cdt4viqo2g71zj8mwi0d7l05i3bcs',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '2e910aae-f108-4b9a-81f2-fdd2bfe96927',
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
                id: '1e830191-6cc4-4500-8bc5-1390347b5b98',
                tenantId: 'fd68f554-6eed-4217-970f-0bfc51a4c4a7',
                tenantCode: '7a0aezcnccs18n98lt85f71lc5dlldl4k1t3hqj2imllxbr64e',
                systemId: '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c',
                systemName: '0l6xokl6ys37r8s3s6lq',
                version: 'vq6irazyi7zxjtag06nq',
                scenario: 'afr3h4sz5g1x1nzly72zlhbaqiinu5jgysuc5xdpfidk5b1hm8izvlmeklzi',
                party: 'z71i1zuzm2h0sici7mmrk6dfq0f74673oebkb43jqnfw74rjfs21gvsbw3hxtgx4dciy9yk4jbr97ksp0o6bb9q7xsf2wf8qnr1hlr4vzdcbty2xfsgp8sgi0m9mtjlwilt6ep19xzkplahy1pwj3u7va0oifhk7',
                component: 'hgm4wms8ipwaxq8e8816x6lkxlia90y28shr939bq4ztpunj0i0dzx6vji2wbyc9si0d5v3hkcesadozlnlo0ktey3870tt7ng4bi9f1usbv1wbo07l7wkjwjme70uzhvvdj71egua5e2x79kwffh4g4witjwvw3',
                interfaceName: 'u7h5h01n9twnpqgdr6y4kav39wovv1o07iggg32unvg67j80tl52ag06tj1jedup7wuz9ky5hbeoxao5ku3wvrug1n5ot8qzpz9j9dwq2r3bzq5whcd78yftgplel0ychmklozgg0exi0d61cmuo892kxzt2r5st',
                interfaceNamespace: 'an2yjcuejwjifqn8djhi480q0xvz4m0av49hx3iu3z6ya8wfhgldyjciio26uvi9tohdgq7apt2kx18lpccaus3elr4e32avlvn8ltohbmlxtcv1wu4khila1mn97r29f8m4599npz57fbx74cwhefv84nbsf39z',
                iflowName: 'qnqbw81di684nr3oug54ph9ese8hu3tty7f9xh3g1vnj5lze680e8dxl8uytig6ow74x6etemnlc91sbcdosf6jox27j1cuq5tmiqu58o1wdj9s2lu35w4ppntnnvd4xa0rlfsyx5xw7fwg5sngtp3z39gtn3nyob',
                responsibleUserAccount: 'i8sqrpjemqpypa14j98l',
                lastChangeUserAccount: 'xu4axwq0rmw5xpwg5myt',
                lastChangedAt: '2020-07-27 14:21:05',
                folderPath: '29oi1lf5cqg3atz4bx59sh4j0ihxivc1muweb9koe1yfpz4wghvw2ehav7ogg5vvjj57kzzx21auucl2zrtqdukz8cv1pblycqg7fg0cckgrlujkfp3ju8xsgh6zh5jz38ayyy1j397tx30ipe7aslx3orvfbazvs89z01fqnaaveh0wjeg3t153lg0gvmycrcuofckwtv2v7rf8pf3g7oip61s6gkff4466u0nu4ufpbl20ocaud9u5j7k6ooz',
                description: 'bxf9gr9bhrcsig00hfdhe94l08zt7sx5rtr3xfkuhx2cac8zkgcg8nvmdac7281qrmtnq350iy45u9w43aus9ezv7qkbx8tbyg85kg920kop7o6yy3v79b7iqk39z54al6yfxs5waxamrl4886juatx50m2172gyopm4snc2akkp1czslddgokn0bnpor2na0st73h67fryuo2c0o4qb8m7cala0mcqhkhze0sgqlkrqmgab4pr32jkd54r6csc',
                application: 'du2rvan6gga2ni6iy7sjvic0l2p22vlocld9jr6urcn3k3w6fmga1yi8to84',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '2e910aae-f108-4b9a-81f2-fdd2bfe96927',
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
                id: '1e830191-6cc4-4500-8bc5-1390347b5b98',
                tenantId: 'fd68f554-6eed-4217-970f-0bfc51a4c4a7',
                tenantCode: 'smu0o0invs550hvjm8lhvlzzk3l8by10urkbu45f4w344qn49x',
                systemId: '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c',
                systemName: '4v8ryd4k1bu55aag9h96',
                version: '6uiltyk4h7m0t9u7twfc',
                scenario: 'mnxohkqmkors991oexu5rm6v4gpxraknzz1rzmpy0snkt8o1zonf8ir29jo4',
                party: '2aah3pl3sx8spm87v91jozx4lgh7ja0qeckb4oinadwb0nqy3je81hfxnpxssw2vsv98el0ejxk33t3ntvqy1s0rdqsslpmzwedbbl9mqkpbuyxx8h8v2sfv23cpsddsi8v9c06b4kzfzdzsr2hb7v739doalass',
                component: '398q7usaao4qxyi7lgnpoikrdvxrwqsptvag1seiz5n9nd4r1xad383g56usfihwghzh8k9yjooaqzlwqp313yudjyrkcss22cdwpbhops967ia6rwmnzmgqhdp43worse7allpydde9iu8mqnnyqboc3i74kry0',
                interfaceName: '4ghze7zprcugh65z1dc2jcgqorc0tmad91sruh4sdcg5u2mwm3vp2okst4tv6ppukvac5cklh342nofkso4bbnn8bz5l8nmx6orooh5japdcfvt1ymk8pxt5v33qz2du0nybz5af51c8fdemvvv1lhqgazvabqpx',
                interfaceNamespace: 'mgnr39pwy5gyq7j00pzbd2kt4swax8mnh7ucav3ock7mp4yjiigj974anpecn66m1wdhyak474uo0x8g4qq4b08x7ygx855vxjyhgeebedsocnhbmux38zshwk0688c6my22bbenkb5rdsw9xyavj8jnyughpmby',
                iflowName: 'gk3me5mo0chza0hxz0m5pc6rt75f08pbvdln8qw1i7t7scncddho0kwcg2i10qn7csmjz9e9enruxse8jt1kmvfdtmdkp1k44vau8trw6ujljx716hjcsoowgug4nj9aipaolghylls34qcbgtjwrenfen5bvfmu',
                responsibleUserAccount: '1rgvut9vtfvc7ru6qivzl',
                lastChangeUserAccount: 'v5idks9vyt7a5yfrr8u0',
                lastChangedAt: '2020-07-28 02:00:26',
                folderPath: 'dzd9gw0lda5aacu10na784kmwqklhox5b7efa2nnmwottdi483sekb9idefcpugcy64gixj42n25yu43wvwdlp2ttscz7rglavn3zm83dq5ipsplg3qyghlymqt1focnobg2b1nnvv8ol8ofwhvoyk63ddbws30hw2ilpj16tdybeqi8n5jdt3skv67jgnrz12zyzttql6m11ismfgslcpbdwv0z38b6gtqderrye5pb39mgmlkwisgb4z0zkol',
                description: 'e573rujk6qy2patu9d2zhstspvb3ihxpgykhvzkfihehct861le3wcofwxvph55qugcbz9ezloalzjdro4i6plr0bkrheoa3xbr1l5b5dc71j1t8rq9pq6342cyizzi6a2s5664to7cqmu6w7osf02wfytogezkbzsa7t3qy5nqtz9nthiyqtbnp92jy5xg9kb4jamwaft41538mf8mudfg86t5smerj251j4fb3cugjp5fth4vusslc1zkv0nn',
                application: '1qexg2cmgeu82f2214x33ffje7owhwdldtpihv3oavbi8iant961k2e69sr9',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '2e910aae-f108-4b9a-81f2-fdd2bfe96927',
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
                id: '1e830191-6cc4-4500-8bc5-1390347b5b98',
                tenantId: 'fd68f554-6eed-4217-970f-0bfc51a4c4a7',
                tenantCode: 'pcmpcbmxs4cfx2q715mcxrupz5upcy92ftovyusf1omxxhehj9',
                systemId: '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c',
                systemName: 'mj13dp0k2pzscdpbo9xf',
                version: 'el559f4kuowhz6sdlt7p',
                scenario: '1ec1by3e3gb9n5epsg0uxoltyrr426kqij6rvy0och7xb21zsvzm69s0lmm8',
                party: '6hs6pximfg43sz4muyf9h75el73683toopfxf5nat4tzcujp9uawrlwgd783tc4bhrlf4nvx0txvj9sgeevzexo043z4hm5bfbbglmkh1gy96i64u0h536b3bcbphvwir9cc9k7xqc4zn2p9qgoj1qkosg2gcps9',
                component: 'h9gjjlpcnage7skdqdvsof2rn2xkkoolfy2qh105aon7ntu9kylmnoegzqhwyk5v1wvxocibde8lgjbyx82pc9y42gklg4zcg3mcz98lqwk953siwbyazdquqs48nz624kgkn0accvqwgtksdcev8jh7yrbaa5vc',
                interfaceName: '37c7ry5hx9p2trrcv6xf2yy1rtlpfh1f1kkw5vzjvvwy2mgv6gyx95vgbwp5dsrmgwdp28rdz7xb8gsinf791hl9d4q5how4ox4c6iygbbfzxu1ayfmf7m7l0dqm90ge8r7a51q728ws6ppi88pi8kbdmphcvhj4',
                interfaceNamespace: '7aoz2emqo222omxjz0gcfhda1fhwd9t0n7t1dvkwwmwk231l3dcor07pvyp8p3gbfecn1g5xguwjnolqovo7pjj0ud3v9ew5waut07clfyldabg8mkfmhzoyurdm7gj9qd16fu2l3zba1bmhns68cc8a45gzd68b',
                iflowName: 'xetxcmtwg5uqdfavzahewca4mfrrxr315k2n9w3du17hjfub9pmehdyx1b5grijfm92yrls7nka8aiy6o09qabxfgdjuuymj63imx785yppg6fqwsj86jkn6iiyo2i76cdvsbstdcinvny0h8xxl1y35ipoxv62t',
                responsibleUserAccount: '3qzwp481j4c1t3lw4d2y',
                lastChangeUserAccount: 'ttot36c6lc9xasl2oi4lf',
                lastChangedAt: '2020-07-27 11:50:18',
                folderPath: '72f4rlcfk1vasf84d65nnbs2k34callke4fms36s704t0cihoge765ifkkp5ig20bhw92josql82hwlhx278tf4hvvqh4yorpf23jznl5582aqhal3xs3nwi81altgmsowq9x6h7hsbd04wzkdc2box7fal7kyii5bh6fhxsbt6w6b63l1c7vy21oybb5rq9r3oz6n0vl11kdo7cghm1rdzze6tqw7s5uji7y2g8gj25e76h4yfbuem844vi3ps',
                description: 'w3l0pjd8gb3f55wg9f3g1pjn98ifkv2iw5d2vq2c02guwpotnv8b5ax2xdnln43041zgxmmh7ub2753w2tvt3gnpvzb6dgq6qu081bsyi7f6gda3wh70nzjpmrtstimoork9my77f67osgy17x1og1cmuifrpc7lfk8pfzl2e1t7dfb0o8yiibhrxwm4cvujlpaq43tqas7b8xuij1gcs2osvmd8v7w44bj0b9ethynpvzfczydwjz1r9zkuwnl',
                application: 'ylhrvz4k0nr4bi0o3pmj0j30kuiq5cg4c2ikzdd3ik5tjmqr9qf1c3n0v0xt',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '2e910aae-f108-4b9a-81f2-fdd2bfe96927',
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
                id: '1e830191-6cc4-4500-8bc5-1390347b5b98',
                tenantId: 'fd68f554-6eed-4217-970f-0bfc51a4c4a7',
                tenantCode: '8ls2a55h0lzq8cjpdlpk81uheghahnmphgvpqaogcgj732lx8a',
                systemId: '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c',
                systemName: 'u7hstetkbpszyk89rx8u',
                version: 'pteeq6v0ry63wznpg9q7',
                scenario: '2fzmxuezmm6y2zuf7u1ihq1he279m5b1uejg9zs4xtlvslicjyc5h91hlniz',
                party: 'gmpa28d5wykpr3u1fh407kgkibz5ezoc90bytnqrw92sztl5fflnla1bf1mj38llefeeqby6phjtkprqt2ajo3gpwop1w1y3g3ytqkab4itehic1k2rurpqb1z6ge0qpuk1zjm5s2d0q433sfpr0npi79ivtja91',
                component: 'cg8ggxr82taj1k0ve1ilcx812046gtw7snqw3r65d41kkptylshrp6b1u8f4fdaswyctdn3z32tvn9ls1zu877y89gf95hg3z371e8kfopwas0hq1tulrwjdjjfow3yvky1z8hnlal8xo3vv9851nka8spkbpc3n',
                interfaceName: 'qscgnpfvadloh5m0dwb8pwyk4fkmbq8u7pwueo9bx4nvjns03j4nwzrpi26c9w8n61cowvvrfshqk7rbw8rlsn5uia59uoh06l6rdev9dnucrpjm21n7my6qyokdsym0refk3w4wljqbrea38013m67cqhdi4wb0',
                interfaceNamespace: 'roxjgx61n3pkijz3cv1t5e1v3gfmtir329wy4fq7h3bebm0htur8nxr61huw0slira9zlalhlmi3r40xdlmcuj3bf76dhy02rmns84tjzzv0om30nrthk5fiq6osm698nsddh15faaw8eitgwm91wm1nppsdfg3g',
                iflowName: 'n8c2ji2xpygi95pknevv0z3p7zjpfy0yhcnshsq7pw89tytel3gjuc4htmqu8b6ikexgkk4fciqynbfn1cai670ire8g8cs4cmbdvnt4j6lrc4b835wwswe9gnpmvjetsjgo5vm9a6uqjgioo9k4qjmx6fvlh8bn',
                responsibleUserAccount: '6yug4i1wi1i0jxzk7c1n',
                lastChangeUserAccount: 'i35au9dsupqdnutu7the',
                lastChangedAt: '2020-07-28 04:27:39',
                folderPath: 'l64xq2vy213ge9rt7eabec1imz2z8qwhgi1c8rn14fnklkhiejzvba870gq4999vprczjbxf61og296cjz7ncsjx5t4mx0eqd45tpnrtmqjdbavy847xluvd7jtk7m4sdlnj0bgweshea5rlvkvj3qft5egj68rjkfcsrdtc32wqiamccx3qva2vmqvuxgovnups844sueee303e03ny6q6tfcohoqvr7im734y7yqqtg3xl94vzusc5qekjy7d6',
                description: 'o2f563uvnd7fswc7v95wnzm1oeis06xrb9eavofoa7hx8wi02fka1v905lb7u7nyww9usq6j4m3he3w4pdj4naae4ajkpaji5wd7f1hvvzm8ypii39p64b82yhsf1boq8cokc5u8cuazu5arhqy2ajqu3d2xj2q8dqk5pq1lsctv7nfkdhqbs83ckdhx3s7no19teirxpjrqeivmtdl64qd4xk1ykmg0x83i3ith73yl3jfnkof64afgaf3rb9x',
                application: 'k8wi844wjdbzi4lrvr94wahq6hkhnfzrgwc2qqlgk387du8oe3qp31cghgzv',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '2e910aae-f108-4b9a-81f2-fdd2bfe96927',
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
                id: '1e830191-6cc4-4500-8bc5-1390347b5b98',
                tenantId: 'fd68f554-6eed-4217-970f-0bfc51a4c4a7',
                tenantCode: 'gcgfim4ef5txvt3ehfrxjn0m4ulr9n5xueqfvh9g8tk9ecz5gv',
                systemId: '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c',
                systemName: 'y2rh01oiuszibanrtg9f',
                version: 'b46zs65wpyhffp4g1har',
                scenario: 'mwtjhwxc6w13xmu9smnhz9ph0jbknak0a4w9zrilomrn9d9p4wumykmfts5c',
                party: 'twfl4vdq3quhrx1jq4q9hc8g80r0j2gee0wrliyfn7ntpimlsh4okt4j8h26s7p3tt0wx31p8ex1lzs7ph57jl4t2nwhnrolb0ldqlumxkm4t73tlpig10s2md1negbe5at7kjt6sh8m0d4jer2yy59biwo5d3tv',
                component: 'sgaqbjt5p6nkzc217pkmef7mz1puo921wxfuf494iwp5dhgj1yzzqcowz76k097i16ov51ht420yex57od47yonp85g756hrby2ybif4lifqiufb4z7gky93p6qn9pev4caw4nryi3h59w9gbcypc1ymx5707tpt',
                interfaceName: '8m3pl5z3jhvowmpxd2r50k51lnaglh2jnonu8bnryjafok6xzxb92t66qgpypkd0d68cwob5l34z415rth4bw2bbqqn3r4jilokema464bv423fchrkvo6agxhk86pst8ywkllfvu1x69jlsu4zzsziks45td0k4',
                interfaceNamespace: 'gkbre85vjhce2k70prlqi1jsmsfd3l9huhfcndaa701v7cjsg8i78ci2i9l1nl3ubc29ein4m97ob98ndvmojbfzwayki8smcjhgvnmhawzqajovo6shbdf9miywt729shcleah2ob9mctafagyexaxscix9prsg',
                iflowName: '1errnrgpuuy4j9kbr3ro2m3gatxm98i5dh7dtabdfynvowq196njnzsgjcztk1zwuzu7mcyfbzsbtkp6n0gbkpsgt4qxtq2zfuwjnzinfujpocrf5uux9vp68upp8tnb4e4hcs5tneuazp2l7oe20jw7cqgm3wrj',
                responsibleUserAccount: '2gtwfzjlndc7956eoqc0',
                lastChangeUserAccount: '0d4dsr8xbmgexvfnx5n4',
                lastChangedAt: '2020-07-28 00:34:08',
                folderPath: '2ng8qcnf2zqxj1lksh7tibugxgctbx0jcz5buswwz91gswqwca80yuhwh4l6mm2luk4xqmamnww0whjj793pig8esjygh1vqlx6badl7lohsooakdk38cw1b7e9c58f05rhddniswis8erb2chsj1hmvro8uavphwr682398nhxlykk9hki8kdiqz4c7wnvlqwq08za1u7kcx0k8675cz0uxpr4pmsa09f0zayogx6fpsh3wdicstkza5x1cwep',
                description: 'wzgzw9azpv6b163ho4ku9wc4gx74bqi0b1mkfh6e3lgr1wu6owq1sp0w7z9s1ivzdtbwy6uy1natq1eu88nu2sk5hushhvx2cqh8kng896ty1chkpocmsp9qbq8h8pdv2wil0zp0vfo08xrj8p8woooe5axd1cc8s5s4ox1yfm4jfbtgzfqmjb94ejrbintol0i571c9zuvsbnuiiet5px68fgoc4fjvpkdy0krpgneo2z73its8huu57zfpsyvb',
                application: 'a0o6ytbp9gy6ayqxui4p7d6aelyype5bv0erece4tgpfrjbkgyqxbppta4kh',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '2e910aae-f108-4b9a-81f2-fdd2bfe96927',
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
                id: '1e830191-6cc4-4500-8bc5-1390347b5b98',
                tenantId: 'fd68f554-6eed-4217-970f-0bfc51a4c4a7',
                tenantCode: 'g1o4pkwvvoxfdwthaoslbuzvwzxnx407vayiaf4t8zshyi3qkk',
                systemId: '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c',
                systemName: 'dkk5sbj038om4cnr7k90',
                version: 'aeigc6ehdu1tn41g91dx',
                scenario: 'me0ncaqj3ghkuhzulzsv3hc6n2005bnqi7f20sfr6ym6838svuwcughqr1w0',
                party: '2ueuo231fuo0bf7hp8yewipt8v900wlmw9hb565re1dq39s7se11e9i3zi8syy57vhgfkz6w9u27w474p4k0zc9wlqjdqy8ab4map6cy7jwpy0zwfjs0c6ax0d7pml9b7dkijel7730b50kd5xboa10r9s2evd6i',
                component: 're1upool2zz4b5p1yi63guhkdbq4ays8j5dunbdeqtnrabb0znlibu5vxmt1spjnhzmc99rwix5hy93n57wsab2z3xpepa23zji2u69hzx4zvw7wkg3kc2yap1khkeyy79re0zx28omcfnkozfbl4zlctidg2fdh',
                interfaceName: 'scpurfht4m4brvtknih3zpc77hilkw2vzak38s7ph1tjzawktvgdz21i2aid18hnzfw50xgvetb6jvbht1jiw0y5ab0k2jef13di7wtn1tm3iigf0jos6dgq4wkom427y96cj7t9hwopc24okw142wh2leszfno5',
                interfaceNamespace: 'lcjvu0mr9gt3zreva1rxbthzqlkltoudkjuzmxjjv6ec1m5sn73fr7yp5pky8evftxysylj139zyp17zdf0retzse9jvfvvycpk0ej0n15ss4xvndxk1089tq0b6k29iy8rxi74vbe3t3vyc3yzqy96w56eiv6fh',
                iflowName: '17ghhryrcuj72osdpn6g8j6zps6o7ep82ysinsexkmkq951805op86yy2041pv5plbjk4r48j7dkbq14kjreknsryugf0cxd7ndqlx8icm8dnnfaqh1ovdfu3v742vv7ed2csptmhlmlnar3kr6fa3r5go3ubg4r',
                responsibleUserAccount: 'bnv6bz2nl3g97zo6sxa7',
                lastChangeUserAccount: 'fikbjd944y173cnkfxh0',
                lastChangedAt: '2020-07-28 08:07:40',
                folderPath: 'yb3f8b2jbivssevctm08liz5a19sv6xh28m9wygdo1larlb41t49ii6we1qg8timvqw6bkncbw459dqdlj8lixxuhz4tidwcqq0zws090wwnki2h0jbffbbopaun3watdcw55gm8eku4uxy1sa6hhue3y1ok2h6xb6znll6pel0z0uc85kvryppbk0acurryb5uhl3rt7ssonlah1w2qfsnylirs8wnhyg6yqt5p3b9n1alm0vfr3j6nkeiyx4t',
                description: 'n3rdgpin3yprtvlfyomfeww5layq5lrc3b4gbc66gmzx4loee15hfmwah43mpbz44hdwqgedxqocgz33dsdwqnfpbd8a4m9ispuaamnpavxjxbqp80cxpsfsq3ai479yncc9h8ssph2h56vtkal0pilh4zyuhqomibdl7khj4vugpinqdr6bec007i1b4m4tye850h40f4qnep5kiwfev5kh2ge9fryghas5kf6956wp0iimjp7adpxmfpb7ilc',
                application: 'tvb2tigbu2chfls01h69c44rf3a1eii2950w897zwi1x2an1f3ycn11p69f6v',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '2e910aae-f108-4b9a-81f2-fdd2bfe96927',
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
                id: '1e830191-6cc4-4500-8bc5-1390347b5b98',
                tenantId: 'fd68f554-6eed-4217-970f-0bfc51a4c4a7',
                tenantCode: 'boyzpv66cpno1lynl9mnub5q9n69abcizw1v5dbq37rusongbj',
                systemId: '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c',
                systemName: 'en2hgzxg6kptf9dhn817',
                version: 'px4bnzl4jxx8rxzkekfl',
                scenario: 'yz2vrmr8iy9gmwaq5h2oo5te6usl9o9km06cg4tws900a5gj13diw67s7rnm',
                party: '8rcdgc6gpj3ury101ne9xe5e3lwv2y1g9nq6j0s5v84il5aordih822xf9x82vz8pd12iwre9y75k4169c66l2ppru2ggayfd9pfqzoymkz3nbn4f8s6tw0ygnnu43gkyys7wuo35wdl6x0p5c9dwunld0ta86dr',
                component: 'jrtjaptxwzhuyju2q6s239p0ojrumubi8g6is6lqmwmhm57w3wfb2uhc6bc0a4bhy4fo5kqi3hvfkltv3nog9ybzyww9jx1qdryqot1zj0nr1csm8co7elbogw5koayuaywtxagsmo00g0igi69hyal8qytht5dz',
                interfaceName: '2u3o7en7xrn7fi2skaoddw4qegmmpacj3eh4asqf77bm614xqcpvo2cwqwkn0y4ddy8wkjbls6315mlpt1m6zo9xpo5ygqladhmis7a0x4jeabpty7iwzpc3l74tkz3bu57uq1ykcgoak4vdw0et4ntn4bv1mhji',
                interfaceNamespace: 'l4owwr5k7c9afhmz7oyelk9tsau6msxho26qaf1jxodtq19hyxk3iuqehwv6b55xea4oz12mo6blnpm7yi6ndhd65wkea3f12pl1uhdfi5zx0cegbjgqwkx5imhwkhkyjk9ep5wdvovr9y4h2x7xs80sd6et5ee4',
                iflowName: '67i5ht7e296n7k58m4ygpkc309pz1kqoaqr3mqfcqfe6tutp8ja7ylhuwtsedwkynstgsraxmnsz1qex0ek6o7zjcbqc5hc10j0kmmw0x80o9r0ttdmpxwvdel24pdi0yvaz5mbus60i332coq4msi0qs7vha6lc',
                responsibleUserAccount: '6jqsitvaf1g43vidj2hk',
                lastChangeUserAccount: 'xc201gk3lwnrsxuk9x0i',
                lastChangedAt: '2020-07-28 01:55:11',
                folderPath: 'nrbves84c5q83y4olqbi7xazgtehv0pr3458uwsv1kmtoxscyxba95dwl5ch4pfxtoh659o64fpwpwpej5js53nrasvf845cnuz5ow5lx1c2ifcv5z6spmpgbyiv2rha68brrj622ghzbrk5i3dsqjrlb0wd3ua4ik4e9wuthndgnyj45sx633vk82z0qr1wzqd7p4a2ztdg2ss9utatvmw6bgt07tugw0uw7ljd4t8b1gv4iurnz134j867qf3',
                description: 'e0gug3romo0vwod1gjken9fgm232kfc9hi3qyromghlio1ry7umabsfb25om1ffmwr5i9497oj7lg9ekfkbu7gozaejxi70axvagp263vtvct42wfi7bk6eeueunhpv2omz29uvymuwaisfgj8r8akge0at6ykoqddg0y76emlzaqizknz0769l88pnnijo94x5m0357d9jsiozldmkgnnq8f7h2tq88zv7mqw1nl0oob42mxj4145gq1fs1jml',
                application: 'i40r3xfbig5gpgd1mobkd3f73a5gtpp6zy2t0axuaiz61vdhuxzuljy9gj4u',
                isCritical: 'true',
                isComplex: false,
                fieldGroupId: '2e910aae-f108-4b9a-81f2-fdd2bfe96927',
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
                id: '1e830191-6cc4-4500-8bc5-1390347b5b98',
                tenantId: 'fd68f554-6eed-4217-970f-0bfc51a4c4a7',
                tenantCode: 'x1mldb3q59ytt9smyd8faxxhyi66tz67tu8kz8h4xag2o0ftjw',
                systemId: '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c',
                systemName: 'yqtr3cuj6rbgfmdwgt3x',
                version: 'n5r422huzsn4c312genv',
                scenario: '8tcr7mg29smkt0fiy7z131o2wtfc00xdigjytrjpkknoxd1vpnlikqnlzuic',
                party: 'j8iwqos1xti8ma01kxge8tzwg2nay7ilkm0ayf674yybd0bu15n8lv1r2wg57w8zjyjqgz4yan043coiwgbp3xcvcnzd34ax45lvgsqklb07qrdcv560zzc8tz8feb8il0x2fnjto35o2blhtxms02t3hyolbaho',
                component: '8ofjoyzcuq3irz1pnbo7y5anxtsfo5whvi5vxxsxkjlbhgr7q2ij293lx7tsgvpdkp7nptu5sl804m5ong5ddcup8mm8lpagqm3m6sdbi634i7aqjc6o4k1gleads3o1dmpngl1r3utd1mztrr00saz6w5fudpyj',
                interfaceName: 'k5szq01rdctg73gd1o78ao1p4vnrlk8hkysz7ioqd450dt7ex3yyvm51xsuwrn8a4ujg58wicmnme32j47t0inmj4vw2fo3izq381hvfmi77vrdm80z9j7upmjxgeonjx3t3tzj4vuu08bbyquy3yl852t0u0h7j',
                interfaceNamespace: 'fzrj1jhqzstpfq8u5k0nt5qi42n6axcbjziat1bh7gqzxw0ds9z4y1sctfqgvk54y2dpggh7gjlh2ljn2qp8isaq4evaxhnpoyo5mpf1fejkrx2js5x603p1zyr4mhzdxrymaugvodybk0ayl4z25trjn1ok7rod',
                iflowName: 'iu17j5ynyra457ak04xx0k7fgbsu5bt88mfkhv5hrge4vf6tchcoh2xb3to9d0qn5u8btw7keb7xfjz74qfyt0r0kh6cgvek6g89tr5jqnlbi2epqi0tq1ijzx932o7sn0szdmm1xdbjlv4gnhd0skmj4dby8zon',
                responsibleUserAccount: 'qoyvlndyldgqhfjfdhys',
                lastChangeUserAccount: 'q9xob4jdz75hia1luk9k',
                lastChangedAt: '2020-07-27 23:14:18',
                folderPath: 'ij4r6h81cghhynlr7s6r2etayk9d0cv9g5penm0thnzfhgucaxw8lrog7l22wl7z62mc1vgnjlov5dggrpdlykuz82n4ixg0d829u845l7ld21mg2aq9mk0d699c149efvaud0syy8ppx2w7ynx2ejlrdfq8gb4sau73lxt4p6h23fnoigvwcl5le9z22i28nj40glbiige4ok2q8jjhld6evfr6z65vkqewpmedyze6fk5y01y9kq0yqgbklnh',
                description: 'auxhs87ivpp9brfx40mb9qft80sk4rjpn1b3ix51l9yqi1g8hugspg8rj1bpeojo2srdmpxgx50y8l5sr64doy79wg9cfd9uztm4wjsg9vhl2036ilt0iqd2qzwvhertpis9c5obaznly030fgf8ovqvkeiv2avh41ew5p6vzxlsjoqjy2xcpa3xiiuodv0q2e4zqxbdmktzw89plkkr2h69wu6tov16r9j9d5du3s3rxonm6vt3yrdodiczetr',
                application: 'm8x102umcrz3mpns3eszbwpvrczu3zxxc4c0xv85atjdqg8x0x2qrdc39k37',
                isCritical: false,
                isComplex: 'true',
                fieldGroupId: '2e910aae-f108-4b9a-81f2-fdd2bfe96927',
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
                id: '1e830191-6cc4-4500-8bc5-1390347b5b98',
                tenantId: 'fd68f554-6eed-4217-970f-0bfc51a4c4a7',
                tenantCode: 'qw90hrpd4ig44f7w0yt4pns6hsxy6mw6wfhtkgr4ievjaf83hj',
                systemId: '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c',
                systemName: '7cktgaa8hf0g5b125gs5',
                version: 'cwvfn8ugwvdjyb1dwg3p',
                scenario: 'hkk5zmteig8es8is5h4bddslnm5qokrgg81iiwcryh58w6v1t9v1l033pm5h',
                party: 'ro2vqo8dl82uy7zziywszid25zg43mrf8z7ff7sp4kn8j7rfgcdgcjdpf177h4p0quthfiqxdugmftydft9pf0nm7btvh8k9z6e6sv7tnufyqnfpmhwk6i9gle63fje804mjsqgveujajrn32shobq1zgl7ceubi',
                component: 'twt32o2fgi0dj1s9plt5vvbcp5met16em06snoan116krnz7dbj9yyv896yd1qzlshdhyn7jg5xnynfyn75003uj3g14lmffptwhhz1ipcs7knp9zc8bxz1fgyefcfpbd6a0i966m43wsectq68hk4q8zpzrfarj',
                interfaceName: 'sy5tfgdl65fnbf14pe8jwwkvyah5cuty0gn0q3mxmzieewd7prejd6ej9hx3t0oucwmj8z8vnj8r2qhfw3cf66dh194fivukzt0n9keb1dkdchdm0uvf3u7u0mmf927pe0rbj18ye4z4urcz0o48tx9z1b62hw5w',
                interfaceNamespace: 's2drz4lvjaqklhm7pkr4v2ftgp8clpgu2ilp43iwdy8y0qqw1l65sya2n4r38dufcsbc8j0spalvrjz6o0jnvyh7z80opi073yqjiuezue30r82isqyzfq2p67wx3rahy5s56x32fd9t6siisou2no3521ua5yds',
                iflowName: 'emdibymhm4v170hjqbcr0fp82exqle2k5eza8g05jqtnz5pktrpl71obu5t5wgkao6wr3zgl6d9brpo4a1d5gmgvtww93ojs4d5vbblv5j058sg73wlzjd8s1g5lotsx1m54km8q8bajtng7f97o50ot638l2lw1',
                responsibleUserAccount: 'fkumm0d5tvab9zkib6rx',
                lastChangeUserAccount: 'v9jmncrucaarye8phizc',
                lastChangedAt: 'XXXXXXXX',
                folderPath: '5lphir5wmtpx53xa9uy8vqbn463rvg3mzg3zx13jdb0bnrmrzd092vzbmo0278fz44ceanjygq4wst9wcmzcssuvnjmynktj3wukfgg27bmz2abwwsz70uw3bxca91tc6x5oiyuivlspj89d76m8dcybt7deixdd5dqyv0txv64uavsj468y4mnzyy32k4ntxs8toerd76vvz546i7vlwg950kuzg1ku4uhr0zktbmvi2afpi7dsyjttd22oo3l',
                description: 'grsenztyenkxj5najy2l7y2m2byepb60u0r78zdbjaikh3bvg354apdmh8m6tlt0ployozicyqyi8sp07x0aoxhmuncmr0tgmdcc075ek5nwavxljcyzx5xkgqxszkjpgaaig4rauaxmxppvt4jgat8mmx49cr3xqpugisqgm9uf75r5w7fn8qu09bu1uwjufxbhoeo6nwlrcgex6pazq5lnxffeqkc3sv51dogg5p82iwy7pn3td4mslr5ito1',
                application: 'scx2p4jy5lz0mk5xwlixlomw9t2n7qdhz7m64biuiao7fyl43m0rx2kq60q9',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '2e910aae-f108-4b9a-81f2-fdd2bfe96927',
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
                id: '1e830191-6cc4-4500-8bc5-1390347b5b98',
                tenantId: 'fd68f554-6eed-4217-970f-0bfc51a4c4a7',
                tenantCode: 'fzegxb3k1e2gkxk3o10ngxzejhfgxdzt38h7hyrj2nes4nl1ka',
                systemId: '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c',
                systemName: '975iu5jc9p5cjxfqm8v4',
                version: '6xs67qjhocv42ffg4pqy',
                scenario: '9yok90gvrp2ph6az2dq1iskhituvbvfw8lr6qy85rxlrva0gt7at1f240ziu',
                party: '5mxxr9fwr7mefmf40izukggthr571zps31ua42ud2l50uvg7wc9x1hqetaqf9sq3xy5krvif1vmk5r7nzb8i4e4tl3fqjlhjj6p8ybn6nkeddky161mm814b79i2aub85wyd3oyjv245muksfqne757xxnidxe1l',
                component: 'nu36mo9i2p54usknr04iokraqrzkofurn4ah5te4ni472wj6tv9penfsosn2yel88557h4yotkk5m8rlfym571sst7s6w4kaolxt1kdjwif1oeqlcjhtiqx44oor486l3qmxt07a4m32o0x809b5hgxw2bcrvx3q',
                interfaceName: 'v8wib1vuzy1pn3fq9d60z90oywpbg4mdgxptyz5v9f39bfsq3zwubmtexv88wstsgrm0z6q3aywm4ixfuqa5qnwv5ksmpnmau28bjwliqej3zuyp9z6h53wsxnzktahs1a5ef3s6b8obaz00ypbbstud7e525kp5',
                interfaceNamespace: 'r5z221pbtdjwamxvzyhprq6jsa92p3llsaqpg4z78j74f6d3dv1zu4o946z2xoushyrb1o6brr1gll7a0y4d2y0v0x9ec3d0nj87xtnwlh1r2nzgtds71kefsscbf75j35tx099i5u3cg052ifwk32i3strv2eil',
                iflowName: 'pzcxahmh1f22yysgj79kvt7f9xaathuthzveax3pux7c5n84c7hhy1lo09sh9qwxz2hcvw8wsn9fpt2endlwfomn02kif36bx6gjalloodd9p9kqqiy2u3y9azr055unscdgkcrm19qfj7peky7tiow3m7ph6m95',
                responsibleUserAccount: '83stpdok1s26zecrthtm',
                lastChangeUserAccount: 'jonraffttwasny28cemh',
                lastChangedAt: '2020-07-28 09:10:20',
                folderPath: 'wfd4sbahfmihjkg70m0nch7zorjpqmq3bffpnuaq2jw2thu9j25kl56d7fi0j32rg0bjx7um82cw4wf1hyi8xplzvd1kfeft0q0eia37y130nrkn37c5loel6w7gxuj6mv9n82i5ncgng6t346n0b0yk90jpwyh8aoh5f5gaojfcirkw3zcc7qjjozlana56idc2858b2mz1s3i657eyjq8ajrfd4zt8540wf43ovxr9a1n58huvyenqp0dn9bu',
                description: 'oufo10r3o0korh7owfvbvar57hnj6sus9sjjyajh6fn6nv2ynfykjo3u3cmzh2mh0hztgt5u6vopz0rv8nmyxybxkex39nkqt98zes4nx6dcgkgk5jua8aihetxnmsfwm6rh8nnu7ede4nqdj0zguqre9967bd3k8lkm01tavlthdj0sjhle327ln65p60ichno1x71k1keipap4okz5pnql6ja45ffpzn4nlxnsqqss8ygmgpfs0i5w1z94lux',
                application: 'yv5eqx5msx5binax4qytaeybryctsiag76tyqnzphnlkl9l5j9ta5mlxlty1',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '2e910aae-f108-4b9a-81f2-fdd2bfe96927',
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
                        value   : '00000000-0000-0000-0000-000000000000'
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
                        value   : '1e830191-6cc4-4500-8bc5-1390347b5b98'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '1e830191-6cc4-4500-8bc5-1390347b5b98'));
    });

    test(`/REST:GET bplus-it-sappi/flow/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/flow/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow/1e830191-6cc4-4500-8bc5-1390347b5b98')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '1e830191-6cc4-4500-8bc5-1390347b5b98'));
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
                
                id: 'da2e7b92-1376-4923-a4d8-c46a2298ebb4',
                tenantId: '9339b329-513e-49a7-a9ca-e7554628a5a5',
                tenantCode: 'hz5bed7mpfy2pzyn9w9wf4nja6pujm8sa4q4chsp358pi51ir1',
                systemId: '757698bb-fad4-465c-9e7f-df41e20e9f1b',
                systemName: 'p4acbk8pt8m3flqgame0',
                version: '7hjqur0zsezw17x450c4',
                scenario: 'rm0u74a5s2tms7dclkxfxjjnq7i9sjtff3o5eechaau8ppnxnvf8msqk89ut',
                party: 'x3sf28i565tzqjmj882hzmr02n3060y0ztnv55jgmwww3zfcwmhfxpdtilc8uc57m80hfp3ehx0q6vy0il8zs18oiaaoxuh2vgd6frbsvrxqdvx0twjzazht49lcm0oz3nn2hd2fs4b3e93fkjodznwmj6lwctvw',
                component: 'we54fqr0c65hxcgjnj7k0lc3sqlfipd8b03498160kvhni6pyfdhajozw66ytq12befryv9ahghmf0h98n5kzcdxrqpgttfv4j9n4w8h6ffx5g8hi8s26c63qod9f8ukgs7kjz9uwbf5tzn4n4bg62budyudrzzw',
                interfaceName: '1ushbgblbnjmrg69nk775yiixm0ylhvo4z8r1dfuv587lrorkm7lggsd5yyh3xu2mrvp2msa9qhbyjee640w26oujm3praqb9m44s2xaeiywf7aklou5c353nu8dh7dwt03c79lmgn047uzq7qhx05k1ofnxtpwy',
                interfaceNamespace: 'im1cz1shipuh6t6bpa2oavyruz5kdk64iigb726s2eb18k70h5t6srcc0uqm0dt0v7d6kchcx7bf69zmiek0osuyehqtt7wwlnj0etucfrab2zm54eotxwkmv8rlxuhb9a8z37odciev3el3uje2okvjm4p2ecz4',
                iflowName: 'apnc53bb8ch3thmmzqpm5l39xswwdq0szmmkr4txvjtxj3feze1nt3vm89s2ir07ldeuyv6n117dqxadc2xlhx571o5fifmbgbpigh19khodw0k1r51mc7mvd1mei7wx3inrfr3wz5hxb9rna1x6y45u0t769h2v',
                responsibleUserAccount: 'x4o99xbdyfhhyy87haew',
                lastChangeUserAccount: '5ti8b3jnoqhrcg3n35ja',
                lastChangedAt: '2020-07-28 07:17:23',
                folderPath: 'bj6y40wgunn395ac568vltkp4v44tvvnv7r4g9ffk0fqi5s4hvd6k9087b8c905hkdnihp4euif6lpaab6gbtxly6mafbobv3uykjrgebz2wm5kxz4037mglpw8sd8r1vqgijmnonr1hz5a9ioc8zixmdzwjkt79k1e7xaj1kvy1ruk6b1v3rc0we1gspwt7zjb2az6i7tdhp0vsg5xdo1m5az68prk4m99nkpg1a5ixgpw8m37xdym6h7b95u5',
                description: '3zfluc7qovbwd9vama1ceds1o7yhls6xfnxha04a0s9nbr2bpuhttvilfeapcnb687xetwgglbkvn75e1hdtqt1m5x9ftu4gdnkc7wcfxk67nudcsbv6njj6x63xos5mp4bhsctd5sihr3rrtk6b86si60uzeq6u1ti3xlyrbs8dg9rbwe03n28yuaj7m6vd89t9o4461vax5xra6em67nos7wuovtwzvw12lga2u5m1d8q3pq22ih9su1hzcpe',
                application: 'o8r9jg0p8az44b5cka65q5f66kliqplwfz02v1qn68mc7kp8jea0mq9m095y',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '55476e7b-b01d-4c55-a0e4-d02c6094586c',
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
                
                id: '1e830191-6cc4-4500-8bc5-1390347b5b98',
                tenantId: 'fd68f554-6eed-4217-970f-0bfc51a4c4a7',
                tenantCode: 'qaj7amj7klndyavv2avdwniqd84bxc5j8gsh2q7nrelu37p3np',
                systemId: '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c',
                systemName: 'o6dcrjak7c22u5uxfdkz',
                version: 'cbp507lci89lbg38c01y',
                scenario: '133bgr5fle2vqe8pot1y7hkqwwzc3qeytc0gh6nk3iftxelr2xwjgcb867ne',
                party: 'xmplvswlng2eqrejdrlqj9qf2asjpqv3jyeav6kdolk869cfy0vma4jzbhakb4yylbb2psbfjpa7dcom69rdq0ul90e108fidk1nemfgnkgyjvi6wj1gv2t77uebtdub4v26bb6e5g3ybgd7mjq6lhuyvfvdi9n4',
                component: '5tayt07ayfvxvt9d8oyc8m5nebsgutxxwdki2qwq8qc6sy25ej8q0afydfhkn9w0hrsdwmlta7c9qna0xk0j386fi37m9p2nuefn2icbhxzcz5psr6ypwl80qannj4yjfdymzdpxdb8c9tb0g2iufqjrennufdjt',
                interfaceName: 'oxrasrme5a97rvlixcsj3hspzd3fkgnqa7c103pjccf4kvgsxcqiamuqw7mk5hh00jd0z4hs7ui2fa78k79es21rp5hi3p596njk44k0k3dbvwxl4627nlfdq8wnr4ufuqaudtnh53tzsjwpw78u4myxv22jtwy2',
                interfaceNamespace: '90omyq4cxy5114vqiipkxd3ygb399g3ae2gwla0ou6gk8wppifemwo10a6am21x013l58a9zd70jsytifmnk1110fou9r0o65ul8lyo09r55wi7e4kr094ye6php105n3n8z896lhuv67kq7n9rd0xkwso4i66ye',
                iflowName: '1ywoht5q0yynj8tby0b97q1wwihzriqd504ptkec2n2ckjeetg3xbmdiuu4vv8weas9tpc6b80sfn1zzy6zy494uaoyci3kmifc5zxzhewhp0iyo27d4qhg3vbc3hukga2ltale7gardjz7vo6jjosg9yyyghdao',
                responsibleUserAccount: 'l0zz3z9icsj2emxujhhy',
                lastChangeUserAccount: 'hc3l53zdrttceepu2dpo',
                lastChangedAt: '2020-07-27 14:39:52',
                folderPath: 'r4ta3bu2xve6urst0w11kiccbbdboqcbrlrrjcsxbj4fj4rlpdbg707vppbs1oecdqdricozkif3cr9huz304zld34qrpvxdoqqu7sb431k11pl257dluflg20a2ycevgktcu85szi910qmxy7pwu7e2py866vzu1blc5u4mfydf6qaw8hbw6ztxlf88887kmt5g2sl0j6lm1fsdky3m88a1y92ybalsvdl0qubtaz4ufq2atpmsttv3f4fd7gs',
                description: 'yxw30cxuoxzfklimrixx9mtaiqm0rwwul5ott2xy0mafq2jzcvuq0em7ydovvjv8ka7fpcutr1orlgmid8cix20xv0s1p4ircmj1o4fjwn09591u2zgqzcagj04q20v5h1huv4aop9z2porps2ztc65sv4sziym8hh60o6nc8rhe4rt507wk61s5cn5yh1rjhw5n9wbba0s2zsgoqa7zncasm5sy0b8lk6bzwiir3821pdxcn90n8piydovn64k',
                application: '28q4vddof2d1dbykhce3ugoe7lz1yrad2jpj53bex3shd937hzh4ar2irj1r',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '2e910aae-f108-4b9a-81f2-fdd2bfe96927',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '1e830191-6cc4-4500-8bc5-1390347b5b98'));
    });

    test(`/REST:DELETE bplus-it-sappi/flow/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/flow/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/flow/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/flow/1e830191-6cc4-4500-8bc5-1390347b5b98')
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
                        id: 'cdfb6f10-c583-4509-9398-bf714f99a2e3',
                        tenantId: 'fd68f554-6eed-4217-970f-0bfc51a4c4a7',
                        tenantCode: '5sdoqfc4zi58zdkrzs5t5x1wz2up5a7rtdxtcu5evxr42t0tmp',
                        systemId: '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c',
                        systemName: '1slqzftcjy0ugusb8g4r',
                        version: 'covvxnhj7r2ovd4cbhio',
                        scenario: 'xiiawps88yt3fzbndsspshal0ix9a673n8mwccvjo6x3mz544firghpa1bd3',
                        party: 'pryfdzkrzd6rjruz730kfhp287r3b4ywa7t1tmaykkvi76j2x2kr7gkuhhsfvztrv7va62b2daymjkjvssmopli7xlc162jzidk230ubwgjrhyo615dgitcv01jgauorgnyp5xst7xp6fijv2j26chv68uhvz49e',
                        component: 'zhyxqjfojt7hr7vh19lg07k28ly3f0dwal1vb9qc2hmvdet700c4s99weeeaj1wv78chc2ns1iz72hi6pxupy7zm3nf85v8csz40i2kjxj2kzv7xinvg2ckkblifbztmc50q5owvozhm2qgcn8b1mpqp0599tiik',
                        interfaceName: 'wd5dec0l6sq3ihuyno72pwraia8whthvo7ezjis1ztey56c3dxic4hjuj5xusvfuqep4g3ne2gd858x5vdz5dkrc5wvc8bxxfnddsk8zmugpov40k1f2gsqyez0rhte5vszagk736vfzyie17ijqyjrhkz78uazz',
                        interfaceNamespace: 'q6j40dv0ebs23zedlxvyxwl6e4rb7i7k94mquebswyrlz7ydnhn64s4l6otcc566shmiztcn37d5pftj7zokxu0vsagn4zvq9j5e3qcc2a8vqspexht5ea4p01pndb71invvm5ciazpiqjsg3cx62bnvqycywgi5',
                        iflowName: 'y987d0wnkhr7i3t509jrm65tngo4mdylktia7opj86qny1x6r74uibrtdvmdwp8t9cq7ps2c0j0p1lxg9lqcup1gpiyjxpymu7v334vx40injkw00xplj54d62vn5cj4pr7vjidrztz1yvhwkkxhrjy4hmk6hf5f',
                        responsibleUserAccount: 'msilsepbvturap1v1lwq',
                        lastChangeUserAccount: 'uj1hquc6oldpr6rbm3ga',
                        lastChangedAt: '2020-07-28 07:40:55',
                        folderPath: '2tzhvn9d1790ekyvt2ywjp4wa9agonerfsy5ue31bc7eum453f8d1axinatwqcszq4nc8n03eji93drxjzjpjm8k1e1arcs055vitc9ekt32kwtbl1hdqjzbb136rhsu8bz2qrnf4ju1pxtewtcecmmwkqrl2074yt0yubip8ab1myc4ktcnd56ah4n9cm4uq2evrqqskdvlxtqvaov4cmmmawpkejrmwqkvm6fnlgcgyih0bg6x8ec1lzme4yu',
                        description: 'asai92kwh2bq0b7slzmpiswp303mdgai52ulexum53ojf9jquql7t0ya60p0h6qyczk2cqgt942m9vp47yqy43j8ukomzilahlzczezoxejt4cqtwn4j9v2i6assxqs6ud7ilqmcry4cwd257d6u2e7z9mljj99tsigzb4is76gwmdklz1wg7qe96xdkn7cdy9gy7070h1rx2mk1m1btu8241bmov2v1ofgk5i9usr8o45tzhuqhargwg50kihr',
                        application: 'mjcu264uunj9w5e53pcdj5d80yii1bdznb1hsgoz4ilnrxndllg3w7b9ypyo',
                        isCritical: false,
                        isComplex: false,
                        fieldGroupId: '2e910aae-f108-4b9a-81f2-fdd2bfe96927',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateFlow).toHaveProperty('id', 'cdfb6f10-c583-4509-9398-bf714f99a2e3');
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
                            value   : '1e830191-6cc4-4500-8bc5-1390347b5b98'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlow.id).toStrictEqual('1e830191-6cc4-4500-8bc5-1390347b5b98');
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
                    id: '1e830191-6cc4-4500-8bc5-1390347b5b98'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlowById.id).toStrictEqual('1e830191-6cc4-4500-8bc5-1390347b5b98');
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
                        
                        id: '3187a349-ef8c-4e6e-be70-959d336fabb4',
                        tenantId: '83c881b8-ece6-4355-9c64-3e2ea827e010',
                        tenantCode: 'iub5wns9o4tcw97t0sqliz6divysgcgfrzt5n2r0egw1md506r',
                        systemId: '159266b7-4ce0-4fd8-97ba-547e9117859b',
                        systemName: 'bc2qe9sfby1hvwodnnnx',
                        version: 'ae9gjj1qpc154xbn286j',
                        scenario: 'uxi5emaezivq5j28xckjqzhliipmigtpwsituf02ozuqt7fqlvgbgs2wdvld',
                        party: '2s2acyrxlo9l31fzyo4q5d6elhjf7ubmbbvz2ip4bjnjxmw23796x0o8wzngbjdtsy1ocu985exgk9t7jduxi6tpehq1zhwqutf0jwu17xd9axeu8jp1cc4dlm0qld2tmos505ilo3l5g15vu9o0szlu7nur97gp',
                        component: 'zf6gfm21mw9kqqx24t3we1mega9mjoooxhc2doq9mu84nsjdpl6vlby4ivr541zxweog1hi13umhpkiknfr9sjq6csrsvc6ffymkuu93frr1fxsu5l2zla9llrqs6pa7mvspnrhqetkxgqwysrybd0uh22siu9zq',
                        interfaceName: '3lw2qfewfb6h5mauowwkda3yewcy7cvzq0m8g8jgh74jnge008e2edvqzpasx8utdhg7j821re5hr9sivaajmfxrj0hlpw8hziuyjtz48tfl11bvt50wtuvokr5ck31whktcrf4edtyvsrgjpy2sn27rxqsehskc',
                        interfaceNamespace: '6gbuqewiifombm3pxdc9jqt87sf8fdx7sbbab8sxixs6zmrzcng62qcncapx9mvgl1saof4znakax394xnl7vw5wvzhuoctwodqgkcekqyzb3ttwjm5nz0eno89jxbjxxvqehgri3b723sxn4w3gitu2dxt8q9sd',
                        iflowName: 'cahtm6g46zwnfx8ijwx1mpxxk7ccpyzmgewfp32bqorw4637cu6ccdbjgazegqsucs5ics63nl5a2gu0666jgaajvbp45aerv3daxpfm7yl46ohk3xif0nxuaei53eih7kkivkgckc09eqxanbp6yehtw40d5e1r',
                        responsibleUserAccount: 't3cz05yv5iwpa947xidy',
                        lastChangeUserAccount: 'htpuuygo4ldg6yg0ngyr',
                        lastChangedAt: '2020-07-27 20:30:49',
                        folderPath: 'r3h73izmrefj97zzi0x3uzhzgxmemp14gedurlwkn3irnivvyp4jqlej381wapbs391bddy8leyefkcre1llo4uvygy6hp68bps77rpzslfxwtc8cr6zz85ufpkau2gvhrhcczxn2aal127srv5agoqbohb5m4147848lmquofve4afz9b3ni6ustdf4bhwitf7d923htkmb12ye6xi7pl24fd03n46vqio1zl090t7tacpb76bs9rjfde1aszy',
                        description: 'l9x7z5qsoidyz0gijf2dtwgnnhdlqnj5mqtdh4uxd9nob1dne7aj9ijki8tgigf41wmwmyomjg9zk8g0fzo8efg5bab75nx2i0q5zicz5eh3zer7d6lx87o017oztzd4w5691lkwl3mjf6b7vsaakq0fwzcy5az48c07yu0cywx6us539ng3mt9vyn2u9p0tad7iy6h9z53yys32u3l6ojn35kkdp9sy4mpbhjj1o16j1llvpmnqscyj2qcnvt4',
                        application: '8qn6q1xytek4ccdno34gns9x5jv5r765c59vhe8l5xqtwi52da8hm4heq34j',
                        isCritical: false,
                        isComplex: false,
                        fieldGroupId: '62e7916a-a5e5-4bf0-a189-e4c5cb8bfc3a',
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
                        
                        id: '1e830191-6cc4-4500-8bc5-1390347b5b98',
                        tenantId: 'fd68f554-6eed-4217-970f-0bfc51a4c4a7',
                        tenantCode: 'je79sl1blmngt2sfm7rm0jpsoq0o837u322zt1glhy3fwdtkfp',
                        systemId: '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c',
                        systemName: 'z445m4w669ekuz1xtw5n',
                        version: 'r3zthbmzz6no1l4ojbt3',
                        scenario: 'djc5162kvrdfcwej23moq8hb9hep5dvs3tjiztco28ihwt5ds5jh1fdze8zy',
                        party: 'ky4v40s6pismi0qy0o9un7b6lnmg9jn8k22zowph8ot9x2cjis4qpvowkrl5c3ml6exfn3qptd3vmx39mad2jy1v0fpd4y5dbwkuuj52rl4dou9mgogmf525lyel72t6mjo388666c7w2q933hyggeg0uhu8nhgq',
                        component: 'b5utasjlqeonchedatiiokeke5n13y36wn6a1bbrusocylu3iz63akgjsxq4zc9x1igvahg7cn5e8uu10qzdvruj1xwc8196xl66g4q86sewv7o14450ch57835ypvwg79lq0yrmavp69cm1no3n2d2skn8j99vh',
                        interfaceName: 'bxmr07cj05r9v3yhosrky2ri4rql564z1h5zar00yiqt9ugixvnsncnsg2inwckn4ipa0ehyu4o89bxiispthttq9z08u8b6h38m3xtfzp5lpyzdf1et6kjawh2qs6wpoe5gmct3j8geb7gcl4kbcq2ozoe0avb0',
                        interfaceNamespace: 'kmfg92jdnte9py5psebk788oykjm7ghz83u4oa87f07sw65wkyuntlhe4wv1bt85clqy1ql46sgnfnyezl8767xrs46ih5af95qtd53qpvi1n118kojfty948q0n1o9ciddxd7qt0iymjv9zg8kbwvuh64gph800',
                        iflowName: 'ybyqh83hed6qbp900vmic29d6ylkfgcdbhimbwz7fzk38atbp5ve83x7qrr0yast8uejioulj65kraur00ddc42wjfipgmt7f0jbui3e4bqp2822uvpnu8wh7gkpsl52xhd327li8h3u43pi7fh9eec0h3t75rmj',
                        responsibleUserAccount: 'gf8efrpi1hz7lww160gr',
                        lastChangeUserAccount: 'muf1w8lydqfczgyvltf2',
                        lastChangedAt: '2020-07-28 05:22:40',
                        folderPath: 'ftudrc3e3w3hi9474w93a2gzfr9dkjxmy81aw4erigrxi7sezbc13j4wwsyl0h1zs79ca6s6h5crd6ojkd1wqvqqr890agq6h4yfhyg29kf6q9tjhu4ajmw4rz93hyn5utsxdtswhxbyg2b9yg7xznr2n3gaujsmjl6hi85pr3e7sld7ibrd778lszug6nsz3bv21v48hoo2rnr3iciifoyh4mpxb5t52vuog3lsbd8bp3vvly3eoirjx8enxif',
                        description: 'uy7ejwdi2wd8ahjeavmxd1p1uglsid2wfowscjasa7w9yw01zv6nrw3fcpt10x3nibbc1j0gnbdtw5wcern2waguc1xm3xrsi2c02u9svly4xy4jrtubi6ohtr9dm6nvnm7fu86lnkzqvqfy9eifef995pppc99sac31dqi40o4zlxvz84erhivbrublv3mi3v0jpd596gm02b40aunj4k71405hizhr7urknvpubiyqw95v4u9714to6y837oz',
                        application: 'ag3kt9yazcq24crvsltuvk8b5p1yferof2uks8giv340nhzebi7hcueelpn6',
                        isCritical: false,
                        isComplex: false,
                        fieldGroupId: '2e910aae-f108-4b9a-81f2-fdd2bfe96927',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateFlow.id).toStrictEqual('1e830191-6cc4-4500-8bc5-1390347b5b98');
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
                    id: '1e830191-6cc4-4500-8bc5-1390347b5b98'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteFlowById.id).toStrictEqual('1e830191-6cc4-4500-8bc5-1390347b5b98');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});