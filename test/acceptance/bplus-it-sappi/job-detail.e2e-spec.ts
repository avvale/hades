import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IJobDetailRepository } from '@hades/bplus-it-sappi/job-detail/domain/job-detail.repository';
import { MockJobDetailRepository } from '@hades/bplus-it-sappi/job-detail/infrastructure/mock/mock-job-detail.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('job-detail', () => 
{
    let app: INestApplication;
    let repository: MockJobDetailRepository;
    
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
            .overrideProvider(IJobDetailRepository)
            .useClass(MockJobDetailRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockJobDetailRepository>module.get<IJobDetailRepository>(IJobDetailRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: 'a649482b-1ca5-45dc-99d1-8690b37f148b',
                tenantCode: '54ruuf103h3x6rjo1gyl1q79nlqzki4ixhqyqsu2uxsq7p1esd',
                systemId: 'c54583b2-fec0-451f-a242-d0b420eb0e08',
                systemName: 'eb0jciu8tds86y9u9eal',
                executionId: 'd0d02e01-04a9-4e55-9204-79480e083c31',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 08:04:57',
                executionMonitoringStartAt: '2020-08-03 00:09:18',
                executionMonitoringEndAt: '2020-08-03 16:03:08',
                status: 'COMPLETED',
                name: '0mexrma7ncozpm5yg33mi2pda88rv836q1g6xh36t6qyzl0x9g0ll363x2a163t6l4i698d3idvzca4818qmjyavhle6g8c3sy50zdgd402j3ilcxcur782b0v5s9mupc8zf80ssz4hcmk88y9fjj3y8yiphb04xpiatynbgv16thub4gcmbt2yh9w6362bogcnz2j3oecbvlxlj0peij6kjsbl0zkjk0a7kllmjrbzobqhf0fxda16s2ygsvf5',
                returnCode: 6092621362,
                node: 's126yrprfxz1ow42bek99ifdus3i99bc9dafegv7t3d99h8jbtxle6s8m8dp4uti41bl6bmow63e2qec30cisce7qmigxpr1cll6je5iccaoi9frw69auvjq1nfu6cxvwi2z9yfykm4b4ouvgwvhu033cantj9yz',
                user: 'sxc2ae8vo4x0qm2idjwzy7yw4ocs4nrqn4ja62y0rydbj51md91l4zjg8nl9uurqus4j85bwsb0j9wdi25pako57tteg01oulg1ihykq8sz7u0d423pxo0wckjizu30vp1xt0xb9re4aje1vv18w1vlso0vr2elm52trh27hcws7ckxhcc47433vlr1mfoj40l1sjff81a600dag1t0bnlixvr7chwa18h41l9ygllwbnew27jmcbeysxo4mxdh',
                startAt: '2020-08-03 01:59:52',
                endAt: '2020-08-03 16:43:41',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: 'a649482b-1ca5-45dc-99d1-8690b37f148b',
                tenantCode: 'jl95sf3hqikt3idkvz14ksqpwtjfyqyenw90zkneln9n6kwntn',
                systemId: 'c54583b2-fec0-451f-a242-d0b420eb0e08',
                systemName: 'eyx00zpjz0fg7lmm4rj6',
                executionId: 'd0d02e01-04a9-4e55-9204-79480e083c31',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 09:57:44',
                executionMonitoringStartAt: '2020-08-03 00:40:29',
                executionMonitoringEndAt: '2020-08-02 19:55:20',
                status: 'CANCELLED',
                name: 'm92qeqov78ucxkt0d47xbzhxhbubokoeqrqod5luvdtofzhdurq97gravibifu5f50x8obdn1uhpxako50jfqiuec7vz6x8656clecputrd54o1ya4ownnnmt4kosi5524sgqdm7x5pbkf9y01vhin1ghylsq44ksrxqjmawj6fsv10jahwp4vlosdte8xj3qz71mz9tztiwo50967ibvfpbenig7cgynw6tvz8ksxkkg0743ziarotptzn5xjr',
                returnCode: 6956944124,
                node: 'kuwbyorq2d7h0xdbe3792z7011gr7d3mclbuwg667q2iddcltrlr4nvy3s7i0j8j1ujgfz0r7gygvnmearszszm5p1q5nmyl6syuq4e0evzovbkg3ifc2rx06690gxl4n22dskbqg7y07kkqnqzgayes4jmn2958',
                user: 'mi0wabzya6ixzgw5i14w2vu8ca5wq4wa3yg064aitixqmoqnxi99tekrbo14kctqmymhhgh6cha7ps1vp93kakzyj0eu428j1h77uvduxrcexfdydeosrlltdtuoey1id4qxj2ivsfe73g4h6fj9fgjfyzu6wf87cw32h4h32d5rx8tochjl6atx9imcul86b5p6uh8wohgcyknadptl54boudlnr6zc219nqhdycxx5lzzu2f0ehml5e8x48nl',
                startAt: '2020-08-03 18:18:41',
                endAt: '2020-08-03 14:44:16',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7d41aa45-7431-4e79-aadc-eb95aca1ea02',
                tenantId: null,
                tenantCode: 'm3n8jvbd54ehoevx1doqtgay0uzac6h47le51e2vkrdpw0y9bc',
                systemId: 'c54583b2-fec0-451f-a242-d0b420eb0e08',
                systemName: 'zrpos65kicc57dyytj2b',
                executionId: 'd0d02e01-04a9-4e55-9204-79480e083c31',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 16:35:14',
                executionMonitoringStartAt: '2020-08-03 06:03:15',
                executionMonitoringEndAt: '2020-08-02 22:43:46',
                status: 'ERROR',
                name: 'chl0ygurnwzc2a95e84mqjhxzy2cgr2v4knxhf7r77n5qtd61yebf4ay6vfdf5ixbxm9ipnfax5koaxophw429bjko7e90n4n15qd7g75hkv4v0ukvpkk402jfgiq9bazi2pdqo3s8nkskzc3qf5hxq7qcm3kjxk43pr4f8le7v5j70q50btetjv789hsmnlzbdpycebk83ac81bcqexd87bhzkvt7wd997258heriz4lk2qcifqns5i7tfwc83',
                returnCode: 1329450151,
                node: '7m1e8yklfpezy1lq84iwkn8p4qxvo32gedu842ak9safs5wzxy2nkn4tbzi6bzgtc2mqo9qjoke7reswwy2iysa2ix2880gavv77zpsqpiwazkifupnkboerxv6wji39pzuubrzvx4csy6dewbbm2l3sths5yywc',
                user: 'r1cmd2vq15m5irypzilvsihxsnh1gqtziljecjfsnwlucac2vz3hgmqnluoviqqu1t4xme6i89ty7nbc7av3pkrl3fwnragqzyolctm5ul06yyot1khcmhnuottlm52ydtqmtk1qqb3ibp44gm0cejdkropwzr4q0xv08aexla9qn6vmhukq4k7diqrjg4462dw3fsxlvr5q01i3o1iiwtxfx6ehb7dj5g7kv3a7cnvwcdr1hdl3tm0smfg4i7n',
                startAt: '2020-08-03 18:11:44',
                endAt: '2020-08-03 17:08:39',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7d41aa45-7431-4e79-aadc-eb95aca1ea02',
                
                tenantCode: 'smnaxv5pjtlke5q6m4tjcdjibsxydun25kttbbxigjucbuvr5n',
                systemId: 'c54583b2-fec0-451f-a242-d0b420eb0e08',
                systemName: '4qlcsr2k6igx2hz23852',
                executionId: 'd0d02e01-04a9-4e55-9204-79480e083c31',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 10:03:48',
                executionMonitoringStartAt: '2020-08-03 14:40:17',
                executionMonitoringEndAt: '2020-08-03 16:52:00',
                status: 'CANCELLED',
                name: 'f8lugb9mhy5pzt366crmx46il75p099xraw9cdiqtngvw511xiuqwj6p1241lg6nvlumjuepjyf902p1tqk9h6qgfp0yyp5mfoz5qxu8dikyjtgfbekgkugqkt5sz5sps4lwyhdf48vpbaoua3qcy9ufm6gw0u5m3047rk4um9pwe48rv9wosk6hz6w0130ovu2s7g3vf5bboy9trh0tkngpzt3mx1wyj9xbfjwylqiuxz0stf1u0qyv1pcafjl',
                returnCode: 4613761416,
                node: 'vz7o2asw240uv3t5jrx7d5t1nf9xtamqwcvfomiyeuiko48x9zy8ag0yimkhuuc3928n9xl74roikg7jspa2pkzojos2obxq550nkzfmm2lwjj39nrmi04eq936mxqvanwn78v65ddb5941dtkj3uacy3mo2i3kc',
                user: 'lc2rg03u2fbek4ay6tem286qoyy67m9dmz9nrtnw25jjga6y0gbiwngjwk1h77i11y2tpb82f0k85689up87du603xrajg7aftz6w6s019mkga8x3l5pgiq1uiqtm5d688zmahyssozuhvzu3utqm4j4ay9uea3oczc0po75p4qm65cu3tfayuaug2rwkjl70k6ib4c6sltxsde07ap5d0hboft5vbzpt3hdac3cnfp2pqeu3dj8ruvefm09yw3',
                startAt: '2020-08-03 17:58:17',
                endAt: '2020-08-03 09:32:16',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7d41aa45-7431-4e79-aadc-eb95aca1ea02',
                tenantId: 'a649482b-1ca5-45dc-99d1-8690b37f148b',
                tenantCode: null,
                systemId: 'c54583b2-fec0-451f-a242-d0b420eb0e08',
                systemName: 'syh05dno8iyk0t1byir5',
                executionId: 'd0d02e01-04a9-4e55-9204-79480e083c31',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-02 23:27:39',
                executionMonitoringStartAt: '2020-08-02 22:07:27',
                executionMonitoringEndAt: '2020-08-02 18:42:56',
                status: 'COMPLETED',
                name: '53eeoo40mqgy6k1fxmodmjks8bslryawz2x7h39dxflawjzv6mgi9m1t8n5aedbbw5qfd6am8jzq4pdg7n6w80lopj7x48fm7io6q1hcfi01t7a8gijaejzjljrswyfg0lz3uuoc7ibcxz02prm5gaak6wmk9sv1hy8jlkzxmbmj128ar2hhv1ocrfvagpm7shy6sgchosj5znxkcdn3l4vhmgp4cimh9kgf10j30jtcda1lx7s7jap4tqeqyoo',
                returnCode: 4296714382,
                node: 'u7gosb2s1xgrpz6ot97agf0prbfyw74w4wc3uni2feb5cnm3xhs788qot8qdtgfx8bwierqbh73v680zqpf6e28q39h0u83fkpeboq4bequhge473jc6q812qa1zv3nu9jnltb9uhhzf53e2fmd1pb2id82ll10r',
                user: 'l3jdmzxf9rfur2zk28x5n4j6w907mlhrk0hl2gz200rowsm8p9ar6wfz91t5edk3v7pqdu0pt2zs9csp0swrd0k17ub14fc0zzykney1h7m3pee3dvnewpgh3ky54ufgq1low5vh5p33tcq1yu8byyvapry3nbx4f71e2hpqxbnyo07q8tj6q6ihwxzobiqzz9hyleih15ewyf4x30gjt41guf98n4f4u3pgxptrq1on1701w7x746mc74di4q8',
                startAt: '2020-08-02 19:43:10',
                endAt: '2020-08-03 09:04:48',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7d41aa45-7431-4e79-aadc-eb95aca1ea02',
                tenantId: 'a649482b-1ca5-45dc-99d1-8690b37f148b',
                
                systemId: 'c54583b2-fec0-451f-a242-d0b420eb0e08',
                systemName: 'xyx0rmjhqehmkcw156k0',
                executionId: 'd0d02e01-04a9-4e55-9204-79480e083c31',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 01:22:26',
                executionMonitoringStartAt: '2020-08-03 10:34:21',
                executionMonitoringEndAt: '2020-08-03 02:03:58',
                status: 'ERROR',
                name: 'ikz9izchfzk6jh6n4ri9ah6qq0cfamfi92r42ai70x91wrbg026d84hz74gwnyrww5oajqed7aes9590ayzie6otawbhjxj73h4p9jfv7ce3ebcw5soqhaoes1xx01gkba9xvg0ls34icsy4rl7if79grjagt827mh076odu9c0e3n12zth2dhrygztt8uoihmqyhsvou9d07cfmf26lkt51nopubvxpkbzmsqfcskmkokcfp6rv99lkkil84df',
                returnCode: 4291206244,
                node: 'v8ftb9hu84bvcssqt3b4idw0h9te1rvu56hxzx0lr4tx8vua98da5f4byeb7ve5vk7bnx60kv318yx114ggk5wovaafb46w5ycs4bq636urgqvfl6m21zjtkes7lx80uea1ysqh8pbu5v8otzvjnj2mvwpt8d1t9',
                user: '4kidkivxdh0vnwds2a4t99wb49cqdw3f7iltguio1ni3vxkb5kpy2wqsukuriar9pzxwf5y5pa0ezekru7orzoyn2au7vshz02dad568ab8ddlunawmalyvgoiojvq6ellajuc7wioh61ptd2xgiwi1gtzjpr1h80zq1807gqt8m43182c0k7hwdip2jwvm21m6jogy4xe36xwqmcccxhsd8g40jkc3f4b7qlx9qn66151nb996l7ur4p5sg763',
                startAt: '2020-08-03 07:42:14',
                endAt: '2020-08-02 22:52:36',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7d41aa45-7431-4e79-aadc-eb95aca1ea02',
                tenantId: 'a649482b-1ca5-45dc-99d1-8690b37f148b',
                tenantCode: 'x4sfen2i24olfj0lejuyun0ut0t18m9iwrgdvdrds84yxu6lz1',
                systemId: null,
                systemName: 'jxn4ytuuc7tyg02oymvn',
                executionId: 'd0d02e01-04a9-4e55-9204-79480e083c31',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 06:04:30',
                executionMonitoringStartAt: '2020-08-03 07:10:39',
                executionMonitoringEndAt: '2020-08-03 13:04:51',
                status: 'ERROR',
                name: '3uk5fq50vhcvprorxssk9hmu3kkluwb786pd2mqje8wy9g3uo0rt8mh2ro2ug15eu2tr6pp08kqc4hq8aimzasga9yeam0ogg7ubvxdnugxlhqdx1cmp3dtzlo52qfqqkgzlquf6fhi72k9yjutygc5ezpym9xnbnb6yiunljj4vvei2h2yuw2zegj0wuqy4vb7klubqhizaduirqhgqisf7h8klsjxgelcqw9qtpmjq19pol1s5wv1bg7pm7oq',
                returnCode: 4765883078,
                node: 'ekl33xfqwzqnk9pp5x8mophz5a2v326cmvofx21kv5xaxmf8im3kv07s2r806me12in8xqch6l9nqawh1mjaaitak24mg78unyhuxbpojopepw9atlseg20eqabpg17j2arwdy61xfk5fifjylrf6sq14swl49bg',
                user: 'bxqtnzj4xo67nfdpr4r740tvt9e4am9hphx35n9cu0y1vqqqma86qj7j7fwuaws09ant6b5o3fqjsv8tfu4uo6x8mvsla1amn404m6p2u05xuk7rshjjk4n58dwvrmdghh35jfu8i1jsuc8ckzlcb756aabqz8qoyx5w9799sih81jzlv18607al430svgz4j0ec37egzvq1tns4x2qxfy1y7f1965b2433ea6qbeyjtrp8wm20agusnoqwqfyh',
                startAt: '2020-08-02 19:47:29',
                endAt: '2020-08-03 01:56:29',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7d41aa45-7431-4e79-aadc-eb95aca1ea02',
                tenantId: 'a649482b-1ca5-45dc-99d1-8690b37f148b',
                tenantCode: 'alkr2p5nifrxzwjyczqt03ox77scyg1n4quy02bqbp7mb9x18v',
                
                systemName: 'yb9lf88f4jl17ajjqk54',
                executionId: 'd0d02e01-04a9-4e55-9204-79480e083c31',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 06:38:05',
                executionMonitoringStartAt: '2020-08-02 19:17:27',
                executionMonitoringEndAt: '2020-08-02 21:30:48',
                status: 'COMPLETED',
                name: 'tj8xd17we83ugb5yv4d1ygsyitcomld5hm8mp6ym0fg2gr6q2gjfg5qj49avcfhwt3m0ffxzsy1zxi5nit4p5we0uom9n6rj7mmpe9i56nka31b9deavabn457n2xta5htuisbi6ow4ugre1ecpxbjf8qfmqldi8ur5i3net46f4421iry7vwk198ohwkgbo7k690vixv2nylj7t48ll9wjpaily23gx8qlw9gyp0q0vu5wop53cjx8tlil69xl',
                returnCode: 1125113686,
                node: 'viyp314gach9teekdey9cfysigby0crho7ghmym4ne7pgt2r3fimxii4m36erqvonblbux6l5b5rnj5ltg4rsjpygis2gkelxj8rcbm58ysxk2kpy6jvtlsigdwz21798xmawkrwrkxfvohwpdqhcz1cd91etrpg',
                user: 'e73lpjz6ykes9rddbk5a2t4np4ygz6h9t7hxfp6jzm43kpbe9r9523np6l138mj0s2yro5eq0qdmbrp8zbz1lqgom97dfan92cu07xk3huf90hhuxj44ynnwo0i5a7caezuefltb9qkx6tvjwz5kmqvx6ukq4r47w44jlqreb8pcoso95d66dhijk7i9zrb08x5emse6jvlol7asmg6vtqfu16s9di1gqlrw2u17rgvthsodau8bu2byrcwbqns',
                startAt: '2020-08-03 03:33:30',
                endAt: '2020-08-03 04:01:08',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7d41aa45-7431-4e79-aadc-eb95aca1ea02',
                tenantId: 'a649482b-1ca5-45dc-99d1-8690b37f148b',
                tenantCode: 'abrsmkx2xmvti1j60oyamvwnr44cvx7ir1y186udxzb7ui0zv0',
                systemId: 'c54583b2-fec0-451f-a242-d0b420eb0e08',
                systemName: null,
                executionId: 'd0d02e01-04a9-4e55-9204-79480e083c31',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 16:30:06',
                executionMonitoringStartAt: '2020-08-02 22:03:00',
                executionMonitoringEndAt: '2020-08-03 08:33:12',
                status: 'COMPLETED',
                name: 'cjekqsac6s551mymid4nbqu2mn3gstvqnjg1nbc7tn8sysjkkbtwod5vbxytumhbk646l3rdgjkocd3pwb6s8xqtxsuh8aa0sjm2j50drnpg96rsdehkgc7xnftsl1urkf9n2pm9t5nxuyibajdzvtd3hsop3rcyia4zp0t8g8wvw3pcuacovbp5jhfxn01r6jyopnlxoqjrrcs9yz5hgp19qyp65o0wpqcyc5t9kndrm2n064stqc7213q3lbb',
                returnCode: 4283121852,
                node: '8sxee2wdsw0ah3n67katss4hlnygcy7i4ebw3q24q66cbdxbntd46vtp0nta8d8g1rtgmztnc2q65oc8nns8omevz426f9ea1yk9lvwo9n5uf9rnu3tltz05opkl37osgws1ijmwaqhym621p7ux9ql34mz9sh7b',
                user: '51ecoyi5rcwv7u8xjzntt7p7x1yankuvdim2rcix84soyqyuyvzmuhyvd7glq8ffh2w0w3uczsd3ywxex2wqjr7wivnvev9boanuf7n6yi6e8nz0sg7x4juubyg9hdex92rrry1qmd2bm2lw0ni4wz1rzzisoz7z5fs88662i1ih58xlhia0t17u2tsxchy9nojrnllytzs6ju2tjrs40e0deoksf7paaly8jxfjj8hkl9jbk4l7cwmo944vbp2',
                startAt: '2020-08-03 05:42:03',
                endAt: '2020-08-03 05:13:51',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7d41aa45-7431-4e79-aadc-eb95aca1ea02',
                tenantId: 'a649482b-1ca5-45dc-99d1-8690b37f148b',
                tenantCode: 'px46psgm0i6vzo1r9z9necwim0b7khp0fvq3f5b5s9j77l7jdp',
                systemId: 'c54583b2-fec0-451f-a242-d0b420eb0e08',
                
                executionId: 'd0d02e01-04a9-4e55-9204-79480e083c31',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-02 19:28:57',
                executionMonitoringStartAt: '2020-08-03 05:21:17',
                executionMonitoringEndAt: '2020-08-02 21:38:48',
                status: 'COMPLETED',
                name: 'n12yz5doyoihkorkzto6ep4s3iy74tu63b55zf5enmzmegdh3pho4uy6f2xjb756rjhf0zn10ypsl722n63qcpigobxi7xgfzson1hbnl6lqufep0gygnobc7ub1nkxtilrr81va7i6aua62rk2k1ebqc6o5yic39bq6c2a8e7agcimgiww3gzfc39sbxwas60rvu58lvvtca3qxlfd4xzpbq0gy580znr9gb6cycilsw153qaezjfa7vekou3w',
                returnCode: 3933575240,
                node: '5g7lko2w8hbt6jdm2n91telowqzi9f4mzkbdcv39q9b8pu09ichtzjmrohuuajst19ezqwzddckvn6l0har5epdm77yzmrq782f23ex3kb0lh8kbt7fwus2ujngnei7u1pqklf1oxeq6c9qan2m9fuof7vo2zmg1',
                user: 'ukle93g4hidbty39c7e3wwjjt2xrdbmi8su0z60vgasrdvauyibltkdalwv6e390rqma1filim2hf9exvrcasr7cpsktuo521k8f5svle1btdjdqtaje30gl197ko81ldc99qqzlsxr9z320zd4smd21pue8nymafctzozbm5gxbuei1nrv7kjr2hw6jarb1gnvdg5s37vq9owefh5655sp11t6m4sfr4np2nobsbolm7suolv7jn95zloeuvbu',
                startAt: '2020-08-03 02:02:56',
                endAt: '2020-08-03 01:03:57',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7d41aa45-7431-4e79-aadc-eb95aca1ea02',
                tenantId: 'a649482b-1ca5-45dc-99d1-8690b37f148b',
                tenantCode: 'jfbg53efffnyd5qldivpp0j7k8s68aqw7mm9yvcq639irwv06x',
                systemId: 'c54583b2-fec0-451f-a242-d0b420eb0e08',
                systemName: 'ta8kb6tq42vhf2t9hto2',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 03:02:40',
                executionMonitoringStartAt: '2020-08-03 03:53:57',
                executionMonitoringEndAt: '2020-08-03 02:05:24',
                status: 'ERROR',
                name: '8tq1xnfvrr5p8jio7alfm9s25hgw6tvhwtn4o1zsy1vh9h618zra8055i3u1kc2815o5rx1u0ceuyd3rns7u41h4u9y8t6k4qev9gmreaten1ulk9b11g5dwm00ffssdast979p227pgwddbpacymbjvqmruwl8fzr68v8sbsvdvnflowvsgtjohckw9e46pvlkjx5ymk6mevuldpkldhcxgqmijjkjxzei75bwa05yawg2oojhozcr9ale9loe',
                returnCode: 5979786702,
                node: 'jq9ecow41futunnigzf9u351xpuc6jvqdfkc0gyqr4s1mtbv588snfuqxfyekqctc2pfzuxdw3dmeib3rekjmw0pimqwjc8140wg7y3fkwj2tlkcsfnxzztv6nm84mvjuqd2oziwsa1g0l78pib42cfxdfmel31b',
                user: 'pr1bvumwj4sbh2xkcqee9rp1ci7fbt29g37x7niujiol8nrudodcn31x01f1ptpsg36cxtec7pts8c0j8stsvgwptg7rlj2cfr9i8hg0kgakt62l4yz64lfb1mwjd2k9s6alzsilrerphk5tqke5u313iffaqvtklugjv1m91svsitmrb4hd6v51szqodmoxqslitmi329yvy3ainn2qwtj9mui4ru6ey3d87zoltif6yizdfokvnv5s7iece8k',
                startAt: '2020-08-02 23:31:57',
                endAt: '2020-08-03 09:47:57',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7d41aa45-7431-4e79-aadc-eb95aca1ea02',
                tenantId: 'a649482b-1ca5-45dc-99d1-8690b37f148b',
                tenantCode: 'nekd1ywwko5ixhutfhmexl4xsai6xq29vw8ssoyx9k10f15tmm',
                systemId: 'c54583b2-fec0-451f-a242-d0b420eb0e08',
                systemName: 'othbsi21chkvin8wob0i',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 03:45:36',
                executionMonitoringStartAt: '2020-08-03 04:40:39',
                executionMonitoringEndAt: '2020-08-03 14:42:17',
                status: 'ERROR',
                name: 'xvc28rpit32hh9mi3qrvph406gqwg6bcxhz7dsxg4poin50ckyp7bge3euclm01t4thupld4pc83ky2wz54wyw5y97fqdh5e6s77mrt29mamupuxfloaul7l7dg23brbc2em899512d5gdrv4jjqpfvcicz9rgjjtrn6ycf2f4hd0077jdl36ccalsr3jrw2frttvu8muy14840dy0zf1dxol44mixlmo5361g15wrrsw3agwswtri2rza6ujvu',
                returnCode: 2206393450,
                node: 'v2kas3vnbwbnemh3acqid6ge4opjgaii1brbnv27tr4ob8dvp7sbshth7qbejij0koll4f3jkjos41rvhgjprl9qzbuea66aaji1kl0zg7jsd9g0n35y6irv4vdbuzxk7yoynmv32r5vrqrzb6ki7rwd8n2em3fa',
                user: '8qwn08zwcju2m13feebxgcwgpvkr4157p08qqykjdbd1f8zjg0wckkldi4buffjwbuiscrewhgfeb7mpobrmjg8x1gjfl5umpbcmec8vuw9p8c3csyctkpz3ec3lkpnzk7mp3kffchby2q6tpu8s8c4h84mndpaam4euhond9x7zfclus32we9eso3fa3k0w90dl64xz9lrdz3aswoftnezlmiupuern0i5bziggkxsr37vl7ea39zileklnfhw',
                startAt: '2020-08-02 19:32:51',
                endAt: '2020-08-02 20:12:36',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7d41aa45-7431-4e79-aadc-eb95aca1ea02',
                tenantId: 'a649482b-1ca5-45dc-99d1-8690b37f148b',
                tenantCode: 'n321inkyq9lgfp4457x00w3708r8g4cfkwpjjokd6xiern2su1',
                systemId: 'c54583b2-fec0-451f-a242-d0b420eb0e08',
                systemName: '0yv83tuqebb6bf75rkto',
                executionId: 'd0d02e01-04a9-4e55-9204-79480e083c31',
                executionType: null,
                executionExecutedAt: '2020-08-03 10:48:11',
                executionMonitoringStartAt: '2020-08-03 08:11:58',
                executionMonitoringEndAt: '2020-08-02 22:16:14',
                status: 'ERROR',
                name: '57i5pyndywjuvaucu1gmsoqu7krbjtgahtmrukfoat6wq59nalglg1ehlt4owk03zkggk7fz6w49mdhb8okzmt0s8sgbz1iq57tj50v0kzq97zrcg9y0ruw9srghn3prbxeibupia2g6sy6pgbl1pdvqkqi5ekvjcauft0nfjfm4jxyx9f6wtjy5w4umyvsulg5n0tfmn32li42aqaoxmdq2el3njg19bsq9ktlpdb7wlz48hlgp8711veinwka',
                returnCode: 7908242737,
                node: 'wbbn15no74nifz5p8hjxuvoq1b6yzilsfa5ccxwwx9okv7rgc4xhl4jyjd8ckq59eiec57h3suuvhnlp6fhrzouz3jc7bh7aooki2p9bkumkbdzojomka6v5ndhcwyc00eg1ld0eqjmpgvs93xyzew2bz7jh0nl2',
                user: 'htzwt2gyxaiyjb4n1xa3j3etge3yzjktfdmrvkirw5xushgog14oq4jrthe3hnig9p79okon7ettuqcsqzi4dp9y58k3z01k2upinhivxi7k3rmnx4ij1uhfjm12q4a8wywq2jzeihp7fq6ytkvs9s8dkacaetiool3qdpf8qsj1pdy9wr3roc2z5kltdsj13fge99p1q3yc028bpm3z3mna9qg8b1slc3yothcv6fu5vrjt7i6p5ijd65nzcrr',
                startAt: '2020-08-03 03:50:25',
                endAt: '2020-08-02 19:18:56',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7d41aa45-7431-4e79-aadc-eb95aca1ea02',
                tenantId: 'a649482b-1ca5-45dc-99d1-8690b37f148b',
                tenantCode: '4xmnuu8d140todr4zm3jgbbejvgauuhem4jz7o16aspo09bftr',
                systemId: 'c54583b2-fec0-451f-a242-d0b420eb0e08',
                systemName: 'bn7ivkmk2r197v2c0w4o',
                executionId: 'd0d02e01-04a9-4e55-9204-79480e083c31',
                
                executionExecutedAt: '2020-08-03 03:57:22',
                executionMonitoringStartAt: '2020-08-03 10:16:48',
                executionMonitoringEndAt: '2020-08-03 02:57:49',
                status: 'CANCELLED',
                name: 'pmfhd5t79e0xzzoej79rt63c0grsqor24cyr0epkshww6hk95euz25gylpxk3ulganc69np90d8avt8aygsgp8dzwywbpkdng51ac77yt10xlncfcbdtfpsps1q8ahx6xqzlbjlezqhkqa4wnttjdeijsezxsqnqyvfv3vslzul054m088icvac6758pzba7wesin7bzc2m744lycvbwa4r5u96g357llaedbwvbgg3x97z4z3o3c6lck2eeb26',
                returnCode: 8771614869,
                node: '5xtzenab7q0j2ikfb8jgf5k9b02mzrqzvuscmobuzpmgybwz6s9tfnqlyy9zv0e3yvxarfuft5dhdukphmbfyfjhztnuhbmpm151ome0engt2gvna2rtbjx093xzwishjdbwclqvg5gvpqeslhefel30dnwkxaed',
                user: '1ylazw73ajwwax79y8bgh9h5t0qpit27jdsa50b8lafr4a8p7nddrgvi5y0l9qaildtaurrusfc04ffctin7e5rowft6q8g6qz03ay9euhalj85s7itefltn7xjuw8drsnn2ugbrccx1xq9gycudvp8vfbbz6lnq7x825a0cid8ea0b6a9n19h5szh5ib1uql3ry0x5s89l7ystuw7yrqjgul2cpv003wxknbmd04onvvq90ct6hhn528lt3m43',
                startAt: '2020-08-03 09:42:06',
                endAt: '2020-08-02 20:22:31',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7d41aa45-7431-4e79-aadc-eb95aca1ea02',
                tenantId: 'a649482b-1ca5-45dc-99d1-8690b37f148b',
                tenantCode: 'a8ly1adq0p6uxalpc2eff2f2iw868qrc4a24897kr16qpbxcjp',
                systemId: 'c54583b2-fec0-451f-a242-d0b420eb0e08',
                systemName: '3tyh898qhwifisdh7zch',
                executionId: 'd0d02e01-04a9-4e55-9204-79480e083c31',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-08-03 05:51:14',
                executionMonitoringEndAt: '2020-08-02 22:26:48',
                status: 'CANCELLED',
                name: 'p7ujmmojdpqptklx5edliauqozxazkmh2683q7758i9r1a8sfdmtbe4d2a8raf17czs1udfwaepn6j9wun0m4w7o2tslbw6rjmdwy0cqynywwp85r4q7jovsruh5twl9b28o0r7z1qzzyzvk0qusyvhqdd3ovekfu04o0d4pln2z5mm36o0cuxbqbvs9dfrmqyfi8jdcorrg8hxh4zy5mh6rileyucmfsr3xcv0ccrfwb775ktlye9u3u1xrcfs',
                returnCode: 7207362381,
                node: 'pqdv524ytjjkv7rp9077lat55o3uoj7izx4drb7ecaw9uo0x94ghtlj1sg18weqhdcqneygnrfs31lp7xptxqpaehzn014thvig7xxmv5ifpd3al94mvk7e598dzjlvpmcw0o70yu8nq0szok77qbz3c2sjvfiht',
                user: 'e0qvfgwr9orksfybul8n6a1s0i4v1m5fmqbl048a3zo7hix8jox6ap9qmbz6bwjazj6g17nakstejk8i4d4u0epsyzq8ksoasqft9g5iytlsr4frtm6klydz7t1djngzi5b947u49baypqp6jx7jwfokc9vdgi6er2gkw2hfbzvqq9yn4dd5p85d8u1mzqln1k1x44bsmdaq5pws3fcds0cugsgtgnpvmvf9nh34zrno2mf2scvcsr2h6c7hpxm',
                startAt: '2020-08-03 01:53:54',
                endAt: '2020-08-03 07:30:43',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7d41aa45-7431-4e79-aadc-eb95aca1ea02',
                tenantId: 'a649482b-1ca5-45dc-99d1-8690b37f148b',
                tenantCode: 'c4tk3fdrp6k0cydfv2ttcqcqs5oqa6iku6wgqc4tqi4s18tsg3',
                systemId: 'c54583b2-fec0-451f-a242-d0b420eb0e08',
                systemName: 'vdbfaopuecge5k7842z5',
                executionId: 'd0d02e01-04a9-4e55-9204-79480e083c31',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-08-03 06:06:48',
                executionMonitoringEndAt: '2020-08-03 02:30:05',
                status: 'COMPLETED',
                name: 'rubkjy4kdm34any9lrrlr889za7vgb7ghw4qlmyn559287esfqy28cb8ymohhyagqm5hkb2609l2lkipe7atwmnbdgmnngcdnes4iwg5dmu38xvicz3e5lo3jatzenhlc5bv6b6fuwwcncjw2rliw2e72e17323xju7fx3986q3gr5cuv76c0md4hj45chl2j93gfbp2bbqf813ytyqkhtjxxscfz4u8p2s9n3ro2mhdw9l6vj3k1kxr1u1ufje',
                returnCode: 2660754790,
                node: 'xov454iepe68yq4srs05csmwrpkj8935txb5osmteaq7qohmvis5q1iebf04mdqsie0qbwso32aw348ke9bywsuef4kj9z3pujnkz9l7r7k8tjc6aampiv4pn303b15el2tetilxdwbu59olv24a45o7ik2i6dpa',
                user: 'ubkwa9u707w8p922n916r7tw70giosp1px102vy7kaczq3bf6s7iaj8pq5m2qsh13c2ubjvqd7dq59f8ftulkqxoygea5i19t2z2jkmycz4wqtn3122x33aiagzcww1py7xtc9858h3k3tjnfta0fa3v0rgqxu7xee1h3n7g2byfzrvsbzxhjybqng94ayy1gh1io1337g6mamni1enoewwz2gv5l2rkccsw2gudaxvkxu976m8mws18fqyml74',
                startAt: '2020-08-03 10:14:35',
                endAt: '2020-08-03 14:27:00',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7d41aa45-7431-4e79-aadc-eb95aca1ea02',
                tenantId: 'a649482b-1ca5-45dc-99d1-8690b37f148b',
                tenantCode: 'qgrtbaguytx5e4ct50qxf0icdfgt9uguqajuabal1cp39tq0pw',
                systemId: 'c54583b2-fec0-451f-a242-d0b420eb0e08',
                systemName: 'kqc9sez919fu3g5dk96t',
                executionId: 'd0d02e01-04a9-4e55-9204-79480e083c31',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 12:34:39',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-08-02 19:43:50',
                status: 'ERROR',
                name: 'l6pztsa5pkh3x0i6y0b2i0fkdjxu1vixwjxd61che6f4cvdskex6unvkornslhtsx40k7oqr3rv8syxlrsb4pnpwna26st1l2xcu65uee9157dqy23252wt3t8jo3vvx7nphvzknqbf8oeh39d426m5fjqcuuatuhxtiytzwvtxeward7e471a2v3h0fdbyltfnd5rnn9t4jz0shomqb1ibob71ef9cse80r377nwv2vj6widp7k92r8x7930ol',
                returnCode: 1953804176,
                node: 'w92ga7f2woyjq0gmfvqejqsgx6emhh4k2920m6za970fbgbsb2dc1qbpekmnsjkt0pvml1e0pdjjbdbn54trlkqfdchx36eq8dd2iaad6x4jay3pj7taqrquuubfbvx2h9gndno3n5329xno7esj4v47c93vqhlr',
                user: '5karb40n8emul7hl1e8e8kp08j84tifx8uiidqcj0jnw8rvxwhd1dmfmooq432yylpjtaeic4m99219b0v8xfuos3ap0r9v8ih0if2gdt0znbpposmfyp5u576zogt4f46wppdwsdjge34gck3tskmusw17i0phxxz9w0kgo4qq01tbc8b7exd5m5ony5baotvr0xc0v6pr3430k49sc6tpzlftse6b39dnqa516mompf6s5hp5t18n2rmhnmvr',
                startAt: '2020-08-03 10:07:21',
                endAt: '2020-08-03 17:20:43',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7d41aa45-7431-4e79-aadc-eb95aca1ea02',
                tenantId: 'a649482b-1ca5-45dc-99d1-8690b37f148b',
                tenantCode: 'o6tmp5jrooa0lt9ja06h86pwenxohbt3j32fmkec2nj5kkntxd',
                systemId: 'c54583b2-fec0-451f-a242-d0b420eb0e08',
                systemName: 'mrujyoi2ax7ros6ps5ai',
                executionId: 'd0d02e01-04a9-4e55-9204-79480e083c31',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-02 23:16:44',
                
                executionMonitoringEndAt: '2020-08-03 10:39:40',
                status: 'ERROR',
                name: '4h22ki0rmzo5e696bech4nmucxnpw9ncd8gcrm1mbzi7i3l1on0ex2onp8r1ytrrwg0atihfnqwxu5veg454x69dgcnc8yidc3g5uvm0iz4e5pb2ss0l8gfg5l8uiupqvkp3rmftejwh9u52tb24fy7b038joyf41wwfiarqmuxjzm69pw68nlde4g8krqqn0jc6cn7smoea2xn69o755omp20vx2w7jchvphrhy1is070m94c17zrafurfntzl',
                returnCode: 3479639839,
                node: 'jhtsalzjsjz2zmok06m2xz35muh93g2dbs5xd4wv5555hc5ok72m27z4gmyeiadr2re6oui5lndrtk16jq47rsh37ugf3rsupi2p1h84t7mv910lecx4bxrz6vedwn2i7q6hd8f9r49wgkqnq79w565bmuc7on5s',
                user: '1mfq7ia71za4lg3u87xr0hosj3qbvlgwnws1ph8v4pkbu116awhiqbug2kfvbk67egwtmmagqh1aqgtoj7qxr50l5m8qvidi3kvobysf0s7xg5eoc19r6kul2izg01373evlxyknkh39h291lmpn4zg8b6q4k9vy8v7qjq3h34ttuzn9p20bcu1v1yk1t27iq2xrjbrj6hs58qw6fmt93vrs6oqv0u1bnkzgeeuv08ujg5p6i821ap5cdnzzni4',
                startAt: '2020-08-03 14:49:13',
                endAt: '2020-08-03 12:05:08',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7d41aa45-7431-4e79-aadc-eb95aca1ea02',
                tenantId: 'a649482b-1ca5-45dc-99d1-8690b37f148b',
                tenantCode: 'oaudnp2p4bhahawesljythzma7yp4rx85vj3q1gys0jfeu868c',
                systemId: 'c54583b2-fec0-451f-a242-d0b420eb0e08',
                systemName: 'efd8wuxrf8eahsbbakcp',
                executionId: 'd0d02e01-04a9-4e55-9204-79480e083c31',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-02 23:37:02',
                executionMonitoringStartAt: '2020-08-03 13:50:40',
                executionMonitoringEndAt: null,
                status: 'ERROR',
                name: 'sy76ophwrpv7ehmve7mtett2na3j2c9u87c70nobr3dbpvsdmk2qf52fjgdw3eml0tf8f6dz0mtexo3m533gsplns8pi2qznc7sps72he1o7ps2o9nj5v9voqu1qz61im8859s3uh9q3ywh0we16rp93tfba3zcvyfaaiwlpv3ao2zwsbbco81ybn4eex9nf9vod40emhwo5rlj33f2ziffhde8j2f02e0gq3evf4qm1zaz2b5ner3r93te348z',
                returnCode: 2876607669,
                node: 'tn3yp8a4glr63ddsiwncbdou13gn1fggml1kkaeijelwwy9znmkfamoa9cet6mcveawc9il3za651ekv35glgnz562aaf65e6eml9dfz6rn73u66j9tyyqsiqgrup27ujpe4twaedoosxclppu6l64nc31cmh1io',
                user: 'o8yhzi6qr7ethwyhokgwrjkyal0jtluxp9q9g5f7fkmz52lm0rujs0x4qrknyk2m0r0aa4ka4k7fxmyv00tsze7f4jlyqdtq30xvmp8ih0eh2pstz7m3z8tn7b7paywti6z920ric2knws9tshbejic43d9r92vy6jtrjjaivo44fy7ma1xvajvcksh5hybtunodwo8uh4kufv2aipbpjmvjyfaki0iyzbzkrhm07o9ekcnx1odanv75gadeeox',
                startAt: '2020-08-02 20:01:21',
                endAt: '2020-08-03 07:09:49',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7d41aa45-7431-4e79-aadc-eb95aca1ea02',
                tenantId: 'a649482b-1ca5-45dc-99d1-8690b37f148b',
                tenantCode: 'qu5njcasi1swwv8ir25i1yslfjkk4x936q2a12ywpwpscbeok1',
                systemId: 'c54583b2-fec0-451f-a242-d0b420eb0e08',
                systemName: '11xzadbofps1652o881m',
                executionId: 'd0d02e01-04a9-4e55-9204-79480e083c31',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 05:50:12',
                executionMonitoringStartAt: '2020-08-03 16:47:57',
                
                status: 'ERROR',
                name: '5m7k2tno6rl6033lhuqlxkmisbxpgtt3xbf9dbhq7ekc28fyes7cyhnbv4tn7ynty8kesis3zipkoj3tdb0mw2xlp6dj3lwl5ocjwwczn8yrfyvfhnvsl1pdz610ex7tfmop6spmat9hyzfpfxs88h9fwa1fsmdoi40a8otot2kq9wyxioh1fz4bwy50kp5dwvgvlvojiuwv7up54zaveo0j0srrx1zv66grarjc33xuga978xszn81khtx5g0l',
                returnCode: 1412548528,
                node: 'nc3yukpkym8lst40tvgit5tw5anuqrvvaxw8j9nabah61j2yq8hv4affc18guk8ymkpmlczviudi9n810oka2xv6s3ajk1o9k3sc4r4ik9awv6s1ixg5ib6huxm7c7iofqrc1avkd9ytho7lakmryn3uwidpmvf6',
                user: 'tikc7zzhcl4ade223dijoi88qjkfroxkxmzyx22ptt7xrvii7q9pai9g8nno60btxxv4eg475cdrltvmrdynfhewasjpopf2cji1kzx1327p9ukvneqdd6a823puwgsmwggrv5in9dncsg9mvhc6psjchpcslnlqxq1gd1epqsbgw6i36a66a0mudgmb67186b27778y39swlzzemc6yxq42v9328uh9lgfgy0ac6tgrupmhz6gvj913fec970m',
                startAt: '2020-08-03 10:18:43',
                endAt: '2020-08-03 18:12:45',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailStatus property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7d41aa45-7431-4e79-aadc-eb95aca1ea02',
                tenantId: 'a649482b-1ca5-45dc-99d1-8690b37f148b',
                tenantCode: 'rhwcvmykptq5nel563jrqyajm7cjsjh0he7cfznvvcezod7ldw',
                systemId: 'c54583b2-fec0-451f-a242-d0b420eb0e08',
                systemName: '56ovnpklev35lt2uwkhq',
                executionId: 'd0d02e01-04a9-4e55-9204-79480e083c31',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 10:11:49',
                executionMonitoringStartAt: '2020-08-03 17:57:19',
                executionMonitoringEndAt: '2020-08-03 09:10:24',
                status: null,
                name: '0tbxj0y14geudnkh7ieoxjbudqyw7cbzi9blu5wh39yi0csscda3itxr4j8eo2xtz7747lsz7wshfs9jxd6iivz7b91idpirynx6lalvt4ro4r3sd8yqmp1ehgt7tx82j71nf6ojey8kvcdk0b6tsr2hy4fx74zbl51ysa8mzg7q57gjwd482fk28crusew40icqb4iwva32a9ll364zzisq60jrvlaj5to7bzg1vz3jckviawj3q99o4ikkhn2',
                returnCode: 7094784915,
                node: 'lfza0zc0fjpy1yavf5v63s7unq5pgy3d8to9j1ux8qa91o4l7acaej119hqyuoon1e05mbl7kx1l3d03yshrbjuwb0uq9u0hkwj4m68l0tbg2g9ke3nsfbvflqfw16oyghecfa1ad262pt836dv40wih7644vp11',
                user: '3sz23izj1ry7bfo842rrsqirscwu7hf1clo184o58377jwp24intlm37uo4b2fnb1pj3xhw4lwj567rw9r6j8n4ijl6n2a3s75f3an9ia1fq8ttyrcgwas8fdfp4067lmidvh0a3ayrf2n7ai5zqxsguqffsoln3gjebxrz2cthmvk78kg3un9ldj1x2n3xrehmeqd5558szxpo8ce4bywyg6fe58yqum2fyf63rtnhj5049ztrr7ule8rddcev',
                startAt: '2020-08-03 14:04:11',
                endAt: '2020-08-03 16:02:29',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailStatus must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailStatus property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7d41aa45-7431-4e79-aadc-eb95aca1ea02',
                tenantId: 'a649482b-1ca5-45dc-99d1-8690b37f148b',
                tenantCode: '9k00uaeeovcwcqj9o4766qh747e8van168g1ul9y4g9ymfhyd3',
                systemId: 'c54583b2-fec0-451f-a242-d0b420eb0e08',
                systemName: 'y3rdbli93tf2e7cf7b7w',
                executionId: 'd0d02e01-04a9-4e55-9204-79480e083c31',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 07:22:43',
                executionMonitoringStartAt: '2020-08-03 13:48:43',
                executionMonitoringEndAt: '2020-08-02 22:24:40',
                
                name: '5qmn8ff7cbpjuse4ats26vjdn7ac7ahu0tgagnnu5kzkadphzkmspynhsaz8d9waj45ac8qglk63czbxregjbcp49kynm3zz4931c499d4nqzf89fzqo6usyzhewi2hmbap24u92yjphyz7xwah6rwce6mufyhp3uuymhgmpd9skgvkyml10rhra7pn0b4ntrg3u13fa2ocy1o4sdjargragqt3w2pws2pif6j0msiapwpe52amrcsahq58f4g3',
                returnCode: 7477024417,
                node: 'axhpuksqll91dhkjqmqz1t00kyqp2l50jc5lh0gvwe13enqyxm87brnrv3cgxcc2j2epn6z5fhaqu8pr3cim1zalb6bs5m8efwezwmcszkhtb4cp9n3wh6aicee58spvzy8p88p3r8m547e256sw3bg8sb3rphu2',
                user: 'cj8h9rhdx9jgm60j4nbci52z12dmsgzhq2g12rj11vmamaqtgfler45i8ynnn27kqsboz8rluh9rgoorry3b6hf84m7oob33u8lqtnl1d3tukag5fxq4kiiu10rvbr8mpi2psis07lay7m4cbmvu9pnncen88nm9sq1ld93jj99nrvs20ttc8d7lrk3sl9d0playt2uqpt33bgu3vnfg0j9213ic4n878wipin5i8mfss0z1q3f9uxeihlc7ojn',
                startAt: '2020-08-02 18:51:54',
                endAt: '2020-08-02 19:28:39',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailStatus must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7d41aa45-7431-4e79-aadc-eb95aca1ea02',
                tenantId: 'a649482b-1ca5-45dc-99d1-8690b37f148b',
                tenantCode: '6ck4ibo59nrco5lpantxxhzq2fhesw35qwpq87k22o1n5ft30o',
                systemId: 'c54583b2-fec0-451f-a242-d0b420eb0e08',
                systemName: '0l7yn0ntgfb8odx28qa4',
                executionId: 'd0d02e01-04a9-4e55-9204-79480e083c31',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 14:19:46',
                executionMonitoringStartAt: '2020-08-02 21:40:06',
                executionMonitoringEndAt: '2020-08-03 14:31:14',
                status: 'CANCELLED',
                name: '692pcz6ruc2snzgp4mqbs7icsirccu3ptuwu8t7xbo32llv5yae89rv4y64dokracoy2tnbp5jdo4hcn4v4krzqpo5s4l0p008wcoftnzi6tu5i7t1nbtgdk3cefi1r53ta778n2l7tjqatx5qp4vuppurgvw0w1wfa5bd8i5d15uqy0ul48a7phi9pvar0usxx5tgzuwpmfpa63d5o947hjj40q8bbyg2a1iydhxamw2lcj3h64iqumjd81vd6',
                returnCode: 1583158806,
                node: 'h51tfft4h6b589xpvvdktxgfkgua5ajpzfwuh6dqvxzmenyez3l0x048e1d30e64csij3ai4bhk6oe2mojaox160mgn1s5i4vdh1yo71m712uxay8xbyws28dq07660c3sfz5jw32we9o4onlzycgvuu5c24hbgr',
                user: '621r9gm0k6922vbngt8kd6rt98ty2ozpo83n2zl1gfpl8iufnuni399anpmvneppvdkzz8er2zwfl5obnpdgr22c9300c0p72duu9bizwwrf4rmc206qshmfv3iu0tnnglfo5iyx9l3611bxz7y54x06lbah6p2so6tqsyr09bzvf5ev4380qfjj8uv0dn3fvnab3vg3wghsnuofl18h1m1ytbq0cks2dkalzqbp6efbadx353tgay8p6sgtmnu',
                startAt: null,
                endAt: '2020-08-03 06:29:15',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7d41aa45-7431-4e79-aadc-eb95aca1ea02',
                tenantId: 'a649482b-1ca5-45dc-99d1-8690b37f148b',
                tenantCode: '47iccol0d0gsymj3vk40nu2x5pv2ija9vs6wh312d2jk8vvna8',
                systemId: 'c54583b2-fec0-451f-a242-d0b420eb0e08',
                systemName: '39ei8z9wpiua1irauzq0',
                executionId: 'd0d02e01-04a9-4e55-9204-79480e083c31',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 10:13:22',
                executionMonitoringStartAt: '2020-08-03 03:35:59',
                executionMonitoringEndAt: '2020-08-03 11:06:20',
                status: 'ERROR',
                name: 'agfrqft6lugqydbj1iguxbye2rqnmz42nvh3e77ifdhvm7yb3kug91zhzw3vj4k085bptvossvuw6a249f28xfn5ojrac0ld4t0rj98y98t0jam9830ooozllrui9guesbncnqgihd1bq2645xi859q3frs14ckn8qamz0speahxot5hr77eetsuc9393mm9xszxhgedmmhrpzk1vx7z1xfhwkamy1e2av8b3theb8skahoy9fpc7awntwl1cb3',
                returnCode: 6286674595,
                node: 'qr19bme96fg3qgq0dftgete83al9s8myd0ow6258jy2prpx132zvv9xi9xayaof57d76xj9nys2omnoe7l6tch7vrf20h5rjf53nfalkz8ttv7zmwl7c0y8rk6hv1v89hczlfzkzj3vkdhsvi3citjclz6w4lq7v',
                user: '8f2sqbld2dizuv3074ya6shcppfqyyc4gio8ng9ah9vr5da9fba9xwhd8a315ia6vs28k13l3h1tsmosl99ngescgr46ovuq1nqxudbkophpy70grak9eickp3hla9warwrozgtfb3azujgdpd5ugqs7b5rhypo75yw3gcn4spo99s1fzlx44toxdswzi52i6ipsxex53wn04xqmwkpht37jp58tr2oy7qxt7ros7jyobsbflhqdgh1xyrt5r75',
                
                endAt: '2020-08-03 04:03:06',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7d41aa45-7431-4e79-aadc-eb95aca1ea02',
                tenantId: 'a649482b-1ca5-45dc-99d1-8690b37f148b',
                tenantCode: 'nueqtvo3fj82xyjg32pm3uzp826lpxzk124uots7pxu001mh5p',
                systemId: 'c54583b2-fec0-451f-a242-d0b420eb0e08',
                systemName: 'qkaxlodxeog1n5mjj6t6',
                executionId: 'd0d02e01-04a9-4e55-9204-79480e083c31',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 06:06:08',
                executionMonitoringStartAt: '2020-08-03 17:23:07',
                executionMonitoringEndAt: '2020-08-02 19:40:57',
                status: 'CANCELLED',
                name: 'gt9r3ppzoxdgqo58zpbl49xpgz0kc024v5xurvu72jtkbpo8p4wudgjypbt4im2sqycbdts5w4nhiftarivh2grpcir5cprqaxvag4s2jpc0yth56nwrk56brr69bb4hn5l1a2tey94hgit4raxufn7xiqstyqoba88m0f9mpe61csyamnplii25rlvl921psvhg4pb1fn3vv5zexkdrglqnbs1u5y7gfh4b4cfyxn9teuy864lnnn15m7odpg4',
                returnCode: 9552502678,
                node: 'jwm27vpvrksto1mxro1gc9snte4nbsf4k7659yiypm22hfav8mvp82j52zthx90rgg7z7ko3zwg5dgw72eso6m1c1o0phyv83zd80run71s5i6r08qxtqnr1vje543jeybarz7adiwrl8rq21yxjb14xon7lqeod',
                user: 'mdjnup36cm6ey9x0os4o5uvlgavjk2pb0pvlg18ya3mgb6q0kb4uzjyol762qzaqy6uvxl46hhcpcxixx6q081h74rdd8n9b4wvwfeewbobyc0sjrq4hqnrwofb18fjszj2vrpciu0fis1wgghtyd8ikfira9rah170c7mia57ip32mi6roh27uxs4z7qi0taiiuxfvgzlszzjzal6tumuqzdzcz79o01lt6bho7skultyd6z3y8e2kbht0sora',
                startAt: '2020-08-02 20:28:12',
                endAt: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7d41aa45-7431-4e79-aadc-eb95aca1ea02',
                tenantId: 'a649482b-1ca5-45dc-99d1-8690b37f148b',
                tenantCode: 'uggo3uvv3zxaw4uyi3ztrxllv5fjx8l08k1aytst9xmy43et5j',
                systemId: 'c54583b2-fec0-451f-a242-d0b420eb0e08',
                systemName: 'vy385ialgt0of5rkvicb',
                executionId: 'd0d02e01-04a9-4e55-9204-79480e083c31',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 09:18:01',
                executionMonitoringStartAt: '2020-08-03 12:32:54',
                executionMonitoringEndAt: '2020-08-03 05:37:35',
                status: 'CANCELLED',
                name: '8t90a32barhqaql328tpfqsowi3vyf19ymdky2fe0s0ma58ikee1uyfquskduavhuv8v5zpaipzyrz1ncf9b8bhly51ztokqjlp71vfket2v3gvsimot8pb6iht4h5ydas1xovo1vtuswntvvqr6j03njpirpqxzwjy63glhnt5ywkuw5xvr471v6nhxrzlajdrqd1an32qtwitw4w8qbjti47hp43z77w2vhs53sk1aqvl4uszmpw73v09z1e9',
                returnCode: 4087776404,
                node: '0u4g62fzov4wbd9f8kfkcn8ww1k4ppru978h1h9ixpj77ywx8dvr7z726l8z5g77utp60vo188vj9vpb11hqmy6paql91ogksgj9zqjmvqjmoyln10ykqzgtvzjve8qi9ekxqal0zat8h6zsg4ewk1a72po24i0r',
                user: 'xnh7lsgiafsewjhqx7vda84tj0u4qoglphbu2spzve7ek1gzb4sf01je5xr1u9ow480g0z9n2my9exj5bundjmpe11ukuxhhy9ubm0i4ru7c49iz4oeosgqqyoztyro35ss9gamxoao6sitxhvm8xeh4bw0m4hg6nr1gigdrv79e0khno5ycrntg3lgirl7e6js8sosb9xjmydq0os0z6vdongqbijrigkxnohdem6bl2utogkx60eramozbdjp',
                startAt: '2020-08-02 20:06:56',
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailEndAt must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'b0gxnsj6dp1cgny0lnqok7m7k8z7hue0471ru',
                tenantId: 'a649482b-1ca5-45dc-99d1-8690b37f148b',
                tenantCode: 'spryeyzhhgzwvvrk4ehdn9p92v2ydaly6l0re7a0fmye6z268a',
                systemId: 'c54583b2-fec0-451f-a242-d0b420eb0e08',
                systemName: '9kncpfddnga93ovj34q7',
                executionId: 'd0d02e01-04a9-4e55-9204-79480e083c31',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-02 21:22:34',
                executionMonitoringStartAt: '2020-08-03 01:07:45',
                executionMonitoringEndAt: '2020-08-03 06:38:20',
                status: 'CANCELLED',
                name: 'dgpi2p9i50gd96dndwl5ei6udnj727dyhnvc3o3qyjm54qamc65mnwmepc0oxlykelyxl3tv2m6eienhneinurqcvq3dro8a4l0k1qns1f2twiiddza29rmob3kdfc1zlezchdlduypnbootpka8jh4grs1l3u3yc0bj4namsiywy9bfc211zx3r6l2gr1qm3t53g23pyv6npeu5sb6d1fhjch55r0w1p2naps20pgdwqalizmljmic3j76okzn',
                returnCode: 9674835775,
                node: '6vvgmq30ysj1a1bhrpieuuk209uahaifuq698c374ulj59x4gq9juzsy32yme3gyy77lm8rgx9byt81x9y5k3eehohv97n8tklgv5dfv1ro7uud9b43jt6vu895nc694g2rl2n708hxgftf8hm9akyxnd6d025rd',
                user: 'rt70lodjzc3qpfv59vl5fb13au8d6hh5hv8d4lzx2giydbfnpu5t3uekawxllxlx5fflij5uco5u5wxzhe1mbyemop0ihl9q0mi7kyyocrgn2untv1pmmtgqtxt7ihpwpof7hb06bxi7wujchc1c0rwy9swqqpzsi5rulquxhmb610p2o49ra36w69qm54m3um13c4sz9a1rpvzrx1vjrwffkdk2yawtmni86d51lcvolm5smtnceiz8zl126ix',
                startAt: '2020-08-03 13:44:23',
                endAt: '2020-08-03 15:55:27',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7d41aa45-7431-4e79-aadc-eb95aca1ea02',
                tenantId: 'y93yookgyj542o5fp93iye1wwz4sxduv5xd0y',
                tenantCode: 'm4uy4r129mzn7wi6eadk1ug81gzv1an0q4rayh3yd8v7vk4qs3',
                systemId: 'c54583b2-fec0-451f-a242-d0b420eb0e08',
                systemName: '2p2jvi6j5qrzx24xb8cf',
                executionId: 'd0d02e01-04a9-4e55-9204-79480e083c31',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 01:26:09',
                executionMonitoringStartAt: '2020-08-03 01:06:17',
                executionMonitoringEndAt: '2020-08-02 22:37:53',
                status: 'CANCELLED',
                name: '2mwm9p0r3drm4b0bxgapqsqq8hsfucjckhw0mizzsr4v3zbkpgeakvgtuymrqimqnvnsuczm41smuth8ffa3zoixqgnh0br0ktcratl2hlh18dkd7uj1e2dvr3u8fmdg6yam2ikmal5978lydhrr95phbb8xfuziy7q4ph7ssxuvfvbnfa754g52zl9amt030rtu1e69g52rrdadywdzr82y4i7tbg76q6bx3mu5u6fwaaa6tcbb9ybb18jl3mf',
                returnCode: 3164585951,
                node: 'wwjyec9aeca4q3uulyakkjtekd5tm3zmwf8b6gbqvw9uj2greedxj9f4a1zadpm1rorngxqgqm4z81dgq53np7kw1juxq6ey6w7fj9knu6jdzuic6o7mdn5wtyrl32o2wryn0hjpezrsq04clsukyxxfib0c7445',
                user: 'c2shor17y7n1elxsj4r4npuusw8picxmk6rklh2k4g1gz4sb3i6mt0dr47woks7shxk2v4l46danwc5zs2bh04c0t9ciqnx3avw9uweqg8wp5r1etkn1dmlan2s2785d6c5wz6msijtdyr126h0dc5aystpwu2s8pmnq52pya1sc3sj7kaswd1v1d6ubxalis4sm3oro58033ynoz69ix9dldf3f8t6bp26ehhpdyfypegxx1pzoetx6sadgpc8',
                startAt: '2020-08-03 06:30:35',
                endAt: '2020-08-03 15:21:15',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7d41aa45-7431-4e79-aadc-eb95aca1ea02',
                tenantId: 'a649482b-1ca5-45dc-99d1-8690b37f148b',
                tenantCode: '5w8xor1nemee93diwfwk55fz2q825prufkyahyjj01t0cqtlgp',
                systemId: 'mcnyilnwnlu78o94u58qenkrfsqcl4s8mo40e',
                systemName: 'sgxff3pldi7vvddnk5n6',
                executionId: 'd0d02e01-04a9-4e55-9204-79480e083c31',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 16:30:27',
                executionMonitoringStartAt: '2020-08-03 03:10:57',
                executionMonitoringEndAt: '2020-08-03 00:21:31',
                status: 'COMPLETED',
                name: '7u1309sfhs6zznbkiz7ggy81dqxk2vynqmzdt5ioi2zdj7hfbaf4szsdoc3qi6v2fsy10bdqt35co5a5dyotorxio3lgyjaaodnya0ljaaq5ia26pj6mmv64imp8138c8hvj137bz78o481vwdorifdu5osc2dxev26vz0jw9atv7t93rhjmq893gpj1b5lkdwx2ewsh6t0upzeuhp0lyaqgf6y9kxa8k41d7yxrsh2shs46mfs31zwmhgdd7xx',
                returnCode: 7731647694,
                node: 'hwknu3i9vujb1ak7yht4woyb2sfex4mj5jy7phvxfv9lvefwbou6tycrkm9jj11h11wub91v5n39bde7ew0ba7cof0o2z50fmi6yjzeq9qjhaklig36sj8atdmueyij43eso1q55z02x9zij91qbc4wvocevczoq',
                user: 'crrmitlf3gpqmx7dzv0no9toq5rlbxk6fuzrgwggscuf1rvlfwyf9crdtda5nq9mnlaahj5r3z9a6602szmmpnoxt5noe7k6o4u70uhbiiypomwlrm48t0c0v1n8kxj7kiz476vhl0mfcjuj59bnvpiyi9q984972tuysij0uj8df0oi8k996fxh9ud46uxzyd2jlqplxqkt54ju9uhrtzmwplfz8jicvdy1j7jnh03vza7ar8c335qn7c2059s',
                startAt: '2020-08-03 04:13:50',
                endAt: '2020-08-03 12:04:30',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7d41aa45-7431-4e79-aadc-eb95aca1ea02',
                tenantId: 'a649482b-1ca5-45dc-99d1-8690b37f148b',
                tenantCode: 'at8m4vmwlgattmeg0nk7uttr42zfnuj9nuvfzq7i5swn0xhw34',
                systemId: 'c54583b2-fec0-451f-a242-d0b420eb0e08',
                systemName: 'q3vpuh8bsz0d9xf7t0qj',
                executionId: 'gus59d07ah75si1k031h5er4wuakhbv8f8he9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 08:55:40',
                executionMonitoringStartAt: '2020-08-03 11:00:01',
                executionMonitoringEndAt: '2020-08-03 06:01:14',
                status: 'ERROR',
                name: 'rr0jukm44z0s3hx9xx2vkfuron3ziveozmufxiuzo4kbsh2u3qgpdyelp03cwztfontb9a5nh703rwoy1bid1zn8x52a4098c5qn2cmgd99jlyatlatft6kbzdt1zvxdrn922m5dmbvq5nr9kj3s3sxcwvlptvpmjr0glc2vuxtx1x26buqqsaaoowhum26p7iz24ty5i3nwesonnojpbg2xcwx0q2q0z1jd7myyv5zgxvdpi33a6mke92p0skr',
                returnCode: 4224496041,
                node: 'mpxqrraryavk0dg6lv8ykgdo1oxxcajjywfpaqjrom896nyvnw60uksfzom3z1vnlgefxzulp27h13g11njbcl3ult3c051sbjeaw62j9ap3chcp4hih513ol3677ejj3wrhxjac4njnh7u1msp6afi05hnqjvtm',
                user: 'k6x06m12ylshenajlmyzgkuf3xlxt0y1eft352zzn93rjw7tskphf0yii9k4wxspsryf53bquipdiyyzjuoyisx5sx2v9x6v7d0zqfdcvp017mxrcwtpdj40x08b7f0zv19c0x2c2p5vmqj2v6gv7muczf0587xxicv01t9vvfla45bzl1zh4dga8ofjcxd9rbvwcyxtpu86ckw61gfcnsaofvfoom6kjz0f65ge8xwu06fa31r2umclvf2kto5',
                startAt: '2020-08-03 05:53:20',
                endAt: '2020-08-02 21:09:35',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7d41aa45-7431-4e79-aadc-eb95aca1ea02',
                tenantId: 'a649482b-1ca5-45dc-99d1-8690b37f148b',
                tenantCode: 's9i9js8dsrcozxebxu3d3hdsxtj2cizqqyq77yzkg9uzs6t9jbp',
                systemId: 'c54583b2-fec0-451f-a242-d0b420eb0e08',
                systemName: 'wk8u0jmacj1mbcs17awx',
                executionId: 'd0d02e01-04a9-4e55-9204-79480e083c31',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-02 21:44:23',
                executionMonitoringStartAt: '2020-08-03 01:20:22',
                executionMonitoringEndAt: '2020-08-03 12:11:23',
                status: 'COMPLETED',
                name: 'mu1fmzmo47js1iv1f0pseszvohuuq6l3l3dby5h32hzndzhj6l2b85mqrs7v8orz48umfg5u8m88nd0086lsily8rvk6m65tiwphzchnfd9f7xgik9xgklxll4imlgiuorfj1p4dc73mrc375drtmvcyjejr3i7joys1fa67c4uv5z7llihbvzm9nwkt4khzczru203shmw4wzdp57eax8n1d5atuknpquerfqata39vqa50tu3og7mj7659izu',
                returnCode: 5882492904,
                node: 'tnuxuu0qsblcxavkcb3wo5n3iinouyunslkf3lxt6skow7q4xmxz31dy30ricdhus6e8ir0vnkhrg39ftp0poq8l1tx3g8inei9rwk8b5vmsz32yzxdp2nch4ef352vaht9l13wcuun9ozo5zroq5991ksijkia3',
                user: '6wpaq1uilr0klowyuiiplbi86sedb2kyeb6qthk5wv2xbmtphmx7qqi2bc8to8eri8goe5mefpmzb2hzh9v6y2xlb3kyoyh2wu1mksascf18z59vh07aneb0yuw8welebhi61bqn2q5y2o4b22ka156ew8ci8nus8inor39p8roocm0jujrdn7i62k9g0rbt0o5apkar8f9mjfitmjfyr9zu7jccxwxufc6iag620m8fvpq5wlb4c68a1uyy4lw',
                startAt: '2020-08-02 21:37:04',
                endAt: '2020-08-02 21:29:40',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7d41aa45-7431-4e79-aadc-eb95aca1ea02',
                tenantId: 'a649482b-1ca5-45dc-99d1-8690b37f148b',
                tenantCode: 'wpaf86v7a19xno46kx540sbzcaq2sf0iqk9cueo6oqzlklln9z',
                systemId: 'c54583b2-fec0-451f-a242-d0b420eb0e08',
                systemName: 'ragjio18tod5lz72de6ds',
                executionId: 'd0d02e01-04a9-4e55-9204-79480e083c31',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 05:30:17',
                executionMonitoringStartAt: '2020-08-03 06:15:04',
                executionMonitoringEndAt: '2020-08-02 18:40:18',
                status: 'COMPLETED',
                name: 'pxxdeobfq99pvs0t7go6eb1ba276hbgvldffr17c7v4nd6rz3thsgcoumwwhic3ux367em9rhqk88s6qtkga00i2rzbbbiudt6fb8z00rmetz3yyolggd5zbkc71dby691orhcdjyw4rz8iroo5k2al5zlb3zk3efd66vdkfgzed0v2pjzw7ii0hoo655976xh0kogw5yok0ctehnbp1vuqkr3tteyxcy9wfc49banr5oe2n1i2elsp2o2423jg',
                returnCode: 6607932803,
                node: 'oznby26k0i53apxfi5otljoevsxn8lylms6mnroz5fjgjpt5il7kvhaemmshqxtl3vnfgg2ji5cju06ch4j8c6swxfeb0iunk5ppsonehpex4s5u4chlskg6f398qcfmenpxbrne5j10im2mhrjyhk8w6ym4fc2j',
                user: 'lttsxd6s6msw4iwfo1jwnoce0em1s6sspx554b8x40hw0qgf5cu65npv0zy8bchzrwvsppibl7svmca49hildawlxd6kbakanm9onqgd2d3ezxv09ry5v4yt1fube5s1983sdi7kxh2l2kxe3uz3v8tzhbhl7yakqrngfe6iixl2uzrxz5pobavs2o6epg0f7h7b9mmjf0nvulvzw8stq34j7nxgxgokj9qvllouxbfazl58qgdn7tj5h0ar81q',
                startAt: '2020-08-03 13:20:29',
                endAt: '2020-08-02 19:35:10',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7d41aa45-7431-4e79-aadc-eb95aca1ea02',
                tenantId: 'a649482b-1ca5-45dc-99d1-8690b37f148b',
                tenantCode: 'v4x7z3aebixlyy3a671un2nty4jmkek856ahg14yccgb2nqzil',
                systemId: 'c54583b2-fec0-451f-a242-d0b420eb0e08',
                systemName: 'omlm0tv0p5keetxkcycx',
                executionId: 'd0d02e01-04a9-4e55-9204-79480e083c31',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-02 19:18:31',
                executionMonitoringStartAt: '2020-08-03 09:23:40',
                executionMonitoringEndAt: '2020-08-02 21:16:42',
                status: 'ERROR',
                name: '59rr6ajw0ue1fn5vl5axzmeejw1f2b0csebwqfao3xg9botsqym4edtf7eny0a6tk5g8q56cj2eu73sy7eae2ar7yn7rnpz2oh511kq6utl5igpwh08pa2ya2nqh6v4txhiqg05wmekko31s1te09b4htv1ayrze20n4b3v32z70nefi7105sdgf3qca1g9gatp19uvb83pzzi1msq1ryllkoj9bddhy9uf16pe8kq6fw0qwvubwxddpkmq3dpwx',
                returnCode: 7407074003,
                node: 'hoq5tt04tztqngesufqraw2rw42j0us4fpl7jccl8v02cn7vkk7pxaky7pn0xsrcv03jlh136cra123ra5j187q1zxgb77cq5oc0pd86nd2f1627xeer2mfzkmtod1m7o4ok9ztkespvpgxqiusqipn2wox1ykc7',
                user: 'kf3a4miwn9xwnaz9l2nk5x2dyf5qhs8tikyt29izefx3mzzhituqi4f8daflfa2io708c8b2s48wusgx9yfoci3r12td1kap6ud5qai7ebm18pc5qq5by762bcrn1ucs9c1130w1fb5a0piu5a2u7stud1ugmfayf46rbvgkej4zdos6pc8hnsdx0rk2x071sgv51f85dnkqwbfyjf4syp57ho18zm3o8h9l2c27tckx6sr67cbshpmvx0fzqss',
                startAt: '2020-08-02 20:24:13',
                endAt: '2020-08-02 22:43:00',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailReturnCode is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7d41aa45-7431-4e79-aadc-eb95aca1ea02',
                tenantId: 'a649482b-1ca5-45dc-99d1-8690b37f148b',
                tenantCode: 'wrfhv7wxnfdncfr1yuw707uw2sc0s0nfspuoz53wcusm6z44qk',
                systemId: 'c54583b2-fec0-451f-a242-d0b420eb0e08',
                systemName: 's5au74i4ppjxx2t4mj4w',
                executionId: 'd0d02e01-04a9-4e55-9204-79480e083c31',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 15:58:15',
                executionMonitoringStartAt: '2020-08-03 13:35:38',
                executionMonitoringEndAt: '2020-08-02 21:37:06',
                status: 'ERROR',
                name: 'd9fj9me4i5ts7xqfucz9dryzxoibfbp5ss7mnynb6jibgcjifhrrbo99nfyfgkwlpb7662qrl51lmcd5qdjpigur0in4w7yk2dnpvv8p79tmcl7rwzp4eifnuq45htafwbd4rvo63mviw7qik13bnyir7u6l32jefn93lj6ts8fgk54d0azs03taorvimvez5nklibwyvg6s3x4i24cgm2chsk1w6s2slyod79hxeblol4spiasjdcglqcxngg0',
                returnCode: 44776733810,
                node: 'hqnamb8qgr1pi6e6u5lvg5qtn2c4s8qtb9zknh7xreny7iei0hi06yvdrwya4edtdzqves1oadrhw0glt7thpi20npeyfjp1tom4yb452qye73skq82534dd8e711v5furs9004qzfqigk9f8w4isl09vrghedx1',
                user: 'w25lihg4wrtvkphql4v5021a2t8cxm8fajjpceu0wcurmgd1x45sg2hhuqk54actidsu0r50hq8fpfci03m10p34ax9macnuf3h16btelscrdbs83u3rmjf86iatyqcyjpwyitbw4dnhyf5rijlekcp5koyyfcstnxydkspcw4dzrbonzpjsu4wngy4f78i9cbvs93ixwa1ihed1ey75s0b85ayrbrp5am0t0m5hk699jcrxbw8siv9vh0ub3tk',
                startAt: '2020-08-02 22:33:44',
                endAt: '2020-08-02 20:05:58',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailReturnCode is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailNode is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7d41aa45-7431-4e79-aadc-eb95aca1ea02',
                tenantId: 'a649482b-1ca5-45dc-99d1-8690b37f148b',
                tenantCode: '562rsmcmxpnzhfuwasxd0mxyy6d749mro1v4q5k7eirpyic2g6',
                systemId: 'c54583b2-fec0-451f-a242-d0b420eb0e08',
                systemName: 'slkk4xwvmmtjnapc0j5a',
                executionId: 'd0d02e01-04a9-4e55-9204-79480e083c31',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 05:27:57',
                executionMonitoringStartAt: '2020-08-02 19:13:19',
                executionMonitoringEndAt: '2020-08-03 09:38:06',
                status: 'COMPLETED',
                name: '10zrbyfyc5oyw4luo51moc8qteitydnrj1qklfqtqhnamx5e3zdy2ceiz88k0ld531ktcf541h8dnk4z6y9cb9nrv5qglb724g8cifwuv37nch7w4kxo2k29sj9trqo6gnpiuakb8ep68cebapgkkpelg8lxubbjzktee74fp3laftiap9mu7eui449gdexyxfurihxg2oqw9gl8305dd0la48r6hveg1brx6gc857s2cl2xlibf8p1nwq9ynd3',
                returnCode: 7440848624,
                node: 'tri3qqji9mzczdmhswxomwhq49urbx2c7a7h4dxu1bni347ysckxq6cl8kxhbb8g2r05750mh3sh8iuqiju4kai0m7cykhr7zzr999yr2yfgyapte805uuzs0c3ag1iwnubhe2i9mricg7bc0j8n7k7xxznc522o1',
                user: 'eb4ra16k5t9uxmgnm0djp5wj9q9837b3wmapi3dpaypu7zttw8sdawhq9jcmjtjb2kos77do2ulk8abw8gqehw59wz0i2o10kktf9s0j6ltxttajkvcufpgpn3ri0fk2rjirax1dkmxmqnxei8pd7uw4tnb1j7nlzqqrzm2xeahsx2bbl2b2wzv13sycag454shx6e7ss9ip60dq7c12d6j4ufoaosgbrx0adhopfxkfvd5ffasm8uuhsgfjez0',
                startAt: '2020-08-02 23:29:30',
                endAt: '2020-08-03 11:10:18',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailNode is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailUser is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7d41aa45-7431-4e79-aadc-eb95aca1ea02',
                tenantId: 'a649482b-1ca5-45dc-99d1-8690b37f148b',
                tenantCode: '12c6uh3qz2hbfmnsedfa46fg7wctomd0vl2hkowkgnjmhoky7s',
                systemId: 'c54583b2-fec0-451f-a242-d0b420eb0e08',
                systemName: 'k1f78h901xp36k8c0tm9',
                executionId: 'd0d02e01-04a9-4e55-9204-79480e083c31',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 00:27:02',
                executionMonitoringStartAt: '2020-08-03 06:00:41',
                executionMonitoringEndAt: '2020-08-03 16:16:44',
                status: 'COMPLETED',
                name: '53js5fl629frf6xrcmlh44m3thdogiupqpna8g3ewk6e7c4rnhuovcvlluqfzf4q9nd7rdbyipo2h2ay6f6qioix4ne35iqdxomwfqgj5oa8tplre6qzp735n6kekvqelnyozpbps3h16wayicw74h2w6fh6laenc3hb3b07yxkqvgo4siu7ux85m9qrevlhu8c3fqjy3zjiez7jv9lynz6mxwf31u0ml62op7h7w1jiry85t95zth82haor36r',
                returnCode: 9097657058,
                node: '3jw0w6ukpuxxrmsv08ripiqxoaw7lo2yhu68w8i1ybw5x4jp8unw1z5pbmztkty8fuctdi1kdaf519l06zu7gcxu8oqcrxj6ysuzctiy04twt91cwldd3kbhpx563dtji6dtwkjfzp70cpwmupsqvdj0sgmw0tj7',
                user: 'm362yiao7mi7leipx0dif10qsgc2fwbtgzed6qipr4yf1n2yf3xxkh04adgpj58musqbf5399il9xoc6jxgq64meum7cnvarjrkbp5ibkctmf03s4tgqaop6p35h12vivwxb5dggk091xms3w95dy6njcbo985ifcsl9zc9ct4jt4sr0aqi5s8kxdtd3tjy3pocguo31vyitufuycnwly6u52fm1489izg79w6nca4ezg9zjy4xsh47wydidv3n4',
                startAt: '2020-08-03 01:05:25',
                endAt: '2020-08-03 14:57:53',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailUser is too large, has a maximum length of 255');
            });
    });
    

    

    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailReturnCode has to be a integer value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7d41aa45-7431-4e79-aadc-eb95aca1ea02',
                tenantId: 'a649482b-1ca5-45dc-99d1-8690b37f148b',
                tenantCode: '6ysafi7j5cfe83sgy9mj814flyx98plorf1z6yqc389ua6hgyp',
                systemId: 'c54583b2-fec0-451f-a242-d0b420eb0e08',
                systemName: '4wmx0ysu2nbw3ilb0o9l',
                executionId: 'd0d02e01-04a9-4e55-9204-79480e083c31',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 03:24:29',
                executionMonitoringStartAt: '2020-08-03 16:23:53',
                executionMonitoringEndAt: '2020-08-03 00:45:55',
                status: 'ERROR',
                name: 'yu416iv7xo9t766hhtpi2v66oqjw6t0hbwx9y18w0v01lf61xzi7tr3i0g7ucypbmhui3mz6zctgfvfefj0pdhi175nwsw9r1fl43qhrkuqu57vndkocgnke9h3arohc192374md18ailj2yuos16ru9mf9omjbj3ebwl954ump0e02ooknxeyoow2tbff7yvqxz3nmpjekcsgyyj5e9cxx79ngw38ugno1vtigrjlij8j76ma5j1gghuke5h2j',
                returnCode: 100.10,
                node: 'hnevhxej3ix94ckq0a9vkg3y3asfwy0tbm8w6qp6lj206gmcanfn0395o3pg8l3s9jim55bb8xzqpbcfhvpvskv8c094ly5ypzgrcdhvlyeg8pps48wnd3qzvumq4i5umr3se543ryy4nkwmwyl3xcegxr0a9ow9',
                user: 't0xuk0a26gjrxy3y7zgs13wsi38ykueft86kgzlhtrnvl8pcerh7h1fxjajyc2wo0canrz6tia01lgrdfjllmmuad1bo2s20uj9t1fq21sh1zwjgvcldgx57ruyzwifa8l68bbxuv52dfc6k8hmkboac6ctmbeizdxocqt6ilbjnc2xdu2knu33c7pqx5nb7caqwsbjhrulb0c17xfm4ed3sy0r12wysispvyjo6a6ln9gxj1wnqvbwrjxulhy4',
                startAt: '2020-08-03 11:54:30',
                endAt: '2020-08-03 08:10:05',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailReturnCode has to be a integer value');
            });
    });
    
    
    

    

    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7d41aa45-7431-4e79-aadc-eb95aca1ea02',
                tenantId: 'a649482b-1ca5-45dc-99d1-8690b37f148b',
                tenantCode: 'h951emyq6ltufufal7br14v06fiyq780qtpid3dwq37xkujxch',
                systemId: 'c54583b2-fec0-451f-a242-d0b420eb0e08',
                systemName: 'o9x3ix71obkn44lt06a5',
                executionId: 'd0d02e01-04a9-4e55-9204-79480e083c31',
                executionType: 'XXXX',
                executionExecutedAt: '2020-08-02 20:08:19',
                executionMonitoringStartAt: '2020-08-03 10:32:45',
                executionMonitoringEndAt: '2020-08-02 21:27:36',
                status: 'COMPLETED',
                name: '0avqk3t1nbw39zoeayr71vw0puhesa60bdyt52qed3b906mycqzdbmxl53ezxxirugo5jmuy86e3bdde20ip8i5l9x5z8gqsc3rlkxqln8eatoeck4ikidg6funr3z34ow5ywuyovwj969igfl1ueyn4o8gcfztieml1o4ra5952uy0hwb4m7mu8h0na2gu9mt6uwa1x2xvxy6967zjywum975lpr00nlu40nrg231xdbht8ljeu3gui6b6vuvj',
                returnCode: 5337410877,
                node: 'mstw0oawvkoue9novpkmykedbk4gb5jp17a0323sz3sozsnvtjrktl41nw7gjz8oofsbk07fol6v9h46hlqj9tlsj4bai1uya7nev7tgzzrlda65pafq8erpntcvjfm8tya069uvjk8gqungaqfatafvs9r5vn7r',
                user: '3778n1vyl36f76ancnbmaf6435qt7y6f644yeeujn7ok9epzi46n885ao5sp2txsidmnropd8pnvqzpqgvrku8qu2f9vz69ou0ymota6o6mlb1we93uyvqrlrbk54crx39kcchi7id44k1aml43hfi9t8sjnludy2yt6n45g8xsktmecmjf0nl31hpz8mv8nwiykcpj38n6fgxz678cg2cxrkwxt0t6qxv56wcxm6edqn5lx8c916h6vlp5zvhj',
                startAt: '2020-08-03 09:35:07',
                endAt: '2020-08-02 21:35:19',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailStatus has to be a enum option of CANCELLED, COMPLETED, ERROR`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7d41aa45-7431-4e79-aadc-eb95aca1ea02',
                tenantId: 'a649482b-1ca5-45dc-99d1-8690b37f148b',
                tenantCode: 'nsz86w50nhg3ozxsly1gu143wm0fjkmpr1skpztn5llof80mzc',
                systemId: 'c54583b2-fec0-451f-a242-d0b420eb0e08',
                systemName: '039vuw4rmfhf7gabj86w',
                executionId: 'd0d02e01-04a9-4e55-9204-79480e083c31',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 08:46:34',
                executionMonitoringStartAt: '2020-08-02 20:17:49',
                executionMonitoringEndAt: '2020-08-03 03:08:53',
                status: 'XXXX',
                name: 'j3g4s74h41kbl8ffvvretksr9whkac6rdmvkosyymrz6axa3f02zngc87c2ev1rqssjhklm3rnp0f5co9xk7b8znm1hdupoehhrocqcxn9th4g6fw2ot06oni8j3uu6mufuf9n0p0mtg91bbcxtqsvjnjymr5ls395t37saygx4c1yvwfjgx8rvpjey1jvn4cajgq46tfm2zzpwri6yhi404iyh0h7dox92sq7amsfqy88pezlmn8cpm7cn8plq',
                returnCode: 9494784592,
                node: 'su9burplbn613miqo0mzeefz3v4tit85cyzsi2vu2y6358ix7bsfo1jqo890t4grbzqht67itkru6dntn1c9hmjb0ltcow8es902hhf2jt6kyepabr3hyfah6cc0a485awpeobac8wrea88x88372066u3nmobim',
                user: 'dz9ptj5wkb3nbtqa6zqzhrzz7i1fs0n1cqwvpxztqisahwthkxb1gfe26cv84p8h4o7ura1mkg4equhs0tgllrimsl5t8cnbb5sxq8j1eruen0hl447mj6xjpld3az1mdofpm4owaj9ovm9nvx95temd0drjbe7ysnrj8ihgxkhdw1avz1z9q7nje2mk77rg1wssi678ge95ulsc74hiogz844hudpczabq8x17v49xjc19j4okyvo7ky1gszkb',
                startAt: '2020-08-03 04:31:24',
                endAt: '2020-08-03 14:19:53',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailStatus has to be any of this options: CANCELLED, COMPLETED, ERROR');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7d41aa45-7431-4e79-aadc-eb95aca1ea02',
                tenantId: 'a649482b-1ca5-45dc-99d1-8690b37f148b',
                tenantCode: '152e3ki9pn4rld1sl1xk4xg21d7y7fqeuneo7xb6v18jgjwgul',
                systemId: 'c54583b2-fec0-451f-a242-d0b420eb0e08',
                systemName: 'pi1kof0tsbsjvewsxiak',
                executionId: 'd0d02e01-04a9-4e55-9204-79480e083c31',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-08-03 03:06:59',
                executionMonitoringEndAt: '2020-08-03 07:20:36',
                status: 'COMPLETED',
                name: 'k1fgksfhtje6d9iv4vp4fkpqxfxfa94xgp1k642eratin5ql4dz9hygpomvttuwlhsbjf7saepymq4lk3l4zgy2y9x4s13dvp3aqdnxg0yamj89x6tp12ppy5jps4twh3rvffpn4eefv97d6aym9hz5okwsceizi6svi83ug3w1kdi7u6ikyberpm8xt3smn0psv06o22gft8io5wngve7a3y1ffvlire5cyetlq0g516xgqejysokbre61wfzp',
                returnCode: 3039409749,
                node: 'qz5ddu9d4c5ja3xix9asa1zprq60igqj25w68a7j7itmmf2jc5vjfkcojge8sav1467gli1bi3vukqcq0xhl2tt4eocdflxxndir5gu12stqcn0p0xh9cwjrcf3kl3lym5hy9qbfhwducs1gi24rgq6kx04lhue5',
                user: 'jc9lpnf35ga8ubry81dg6qwxdoers7dakxj5pt4xfvr7muuiabcio8x7upls1laz9ytg8sirr6skmjchzxz290vk80t45ntkc4ykpkm4vpkfcl7bg35o53jwu4jq7eo03kcbjz4x3zjbmujk27b1b9xpomdpicyj3vszhzc04vpqu6vw4h7z9lxm7xmqhzyc6stj2qly0rlrdpulohe63tccm8cbhy1wyk46eu6tlhslqwh2medn99yiacpbw0n',
                startAt: '2020-08-03 10:16:41',
                endAt: '2020-08-03 04:28:32',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7d41aa45-7431-4e79-aadc-eb95aca1ea02',
                tenantId: 'a649482b-1ca5-45dc-99d1-8690b37f148b',
                tenantCode: '2roi9xlf6yzejs8qxfcfqavt5cxel6kg7yz5wr9ix4x2ds4cva',
                systemId: 'c54583b2-fec0-451f-a242-d0b420eb0e08',
                systemName: '43nxiow6tyklhgvc60z1',
                executionId: 'd0d02e01-04a9-4e55-9204-79480e083c31',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 13:37:40',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-08-02 21:27:11',
                status: 'ERROR',
                name: 'pqg8d3ky9nc7qwzulr9ey8m8npax5zr9h7pq3romn7k3v9h86fsm3b7euxkmy2spu93bwlhsmdh3mjy5n59r10d4q79c9yk8ksrn4o5xhw8ecvqul4u5nmkwd3dn85c7vqd36dghy1bvr1bj7sa4ngcsq4fuxzhwbrxp70chn1v8a8a8yd7z0qh3jkvu9fg19fcqwfnlcze8aapc3a155z1qbxx54vvhutxjvlxsll7jbcfahye63ooso7mxj59',
                returnCode: 4902432683,
                node: 'h9z4jub5qzui4d2q85h3msfsd0v57gnb22bz04a36gmnuz2rmf5y5j76408j3u9u99018fc76ft92futyfiqawyk6igue80bd60nz2tovt7bmh4c4l3e0vlo1bw7rkmlxttv8engb0vhoyo543yx1z9tjtb8tef2',
                user: 'c7gf7jev8krxt165j5uajnh1tho75ws83j1gos4as0ndp4nuzgo9bl5a3pxklyfd6ew77ia6hqelaj3xkfv421qaa1ewpl73ru86kbgupv0iudfu6n17or4p1x6il438dpskb55it348e84g6exmlsydrdjuc6pufmkgbyohr0aejkvj2kwc2yc8wbzajyy7m8naz1k92lcpk97hty2quknqe6n8thsbb0f4lv0tbxmwmxqje689utjawhbr8l2',
                startAt: '2020-08-02 20:22:44',
                endAt: '2020-08-03 02:43:16',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7d41aa45-7431-4e79-aadc-eb95aca1ea02',
                tenantId: 'a649482b-1ca5-45dc-99d1-8690b37f148b',
                tenantCode: 'k7ibnyp01ry5n741th345llvcwmchc1mvdh5besh0d6j71r0q3',
                systemId: 'c54583b2-fec0-451f-a242-d0b420eb0e08',
                systemName: 'rdczaxfeikz1zpie9ox5',
                executionId: 'd0d02e01-04a9-4e55-9204-79480e083c31',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 06:47:52',
                executionMonitoringStartAt: '2020-08-03 14:07:49',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'CANCELLED',
                name: '9m9dyu4sooz710lppcdtp1ck6ebxyhybxqhd69wliqwiyjckc38j2t4tj7bnfuypmhscthwys8su484sbyd29k2hnt8h3bqj1j87dt52mbxx5ak9qpzlqqs6lon3cwtappod3315mi23tubzny0flme9rvd9drmpoxxkmwlum8jnn0eqnduow8ygs65cpygid2wlq633a02x52wvne95c984d9wessr9br5eioq8y93b8jj62naxyoeqapmfye2',
                returnCode: 4307819746,
                node: '83r5246gfbzz8gsi986spourhhox4g2v9olx8gefaabq2cl96zdk4i50841u88im9t7ndhnrk0jr4py12xi3arqnleqlh1vt86kg2u6ovwmvvfw030mtnbeqk4f7v0wlpr7apsojls0d8dpwth7cvipjw6t42h6g',
                user: 'nq2pp0lmva5zsashm26ldxd6nowt1k4veucirzf4tppty5nolgqlmk0n2nuclda1tmye3grr5rabugr8550bu6vwvlyb65k6buf4s9w8osaleefsg3rejzpg2w8e73vf9j3q9z82smh01xt8bze5atgdejw3cqmc2rehhwn6960n7jwy06gvx0js4kqyea91covqou7fnjszbeggz3wuf8223ay3r9ncrwfgp0j63mblj4149rlv4lyen8y1z6f',
                startAt: '2020-08-02 22:07:39',
                endAt: '2020-08-03 11:23:16',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7d41aa45-7431-4e79-aadc-eb95aca1ea02',
                tenantId: 'a649482b-1ca5-45dc-99d1-8690b37f148b',
                tenantCode: 'bjhf6uqxtwrl0fltp9125cc2hfhhrumhrlq1d3uoj5sy2noc5e',
                systemId: 'c54583b2-fec0-451f-a242-d0b420eb0e08',
                systemName: 'gisfk6uh7c08cr9aieu8',
                executionId: 'd0d02e01-04a9-4e55-9204-79480e083c31',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-02 19:43:50',
                executionMonitoringStartAt: '2020-08-03 14:59:19',
                executionMonitoringEndAt: '2020-08-02 18:37:26',
                status: 'CANCELLED',
                name: 'c08zu1qaj3lo8ru7n2x5yfl92d9ca1dktwg8tk7jd85w7dzmwapgwy3eicf1vf1sdthehb17xo85w3gciat5igwy9i16j3rgcwmm3gqxjxdlacnw5d6lvbyrubw1pyg54k6vqdvtocjlsjzqqxumbr4e5c93kfkhc2lnntu3ehu0lbmcon0qsdqufhs6a4pipoodj37d4it5c43s5v1gy1tifcr7zq4lg03iya2plb1gncmzlu1xywffltb63ey',
                returnCode: 1482694265,
                node: 'f7jjdsd68qy2md4pjwdh08igf1jmsesmns28y1twf882e4igihhufewgqka9934tpud97oo3nsolgogz2m92ep46430cg7xses0xm0x4kxrcwv1yp0jccwxz5sz7bpjmstdft60c6p7jqmc9bu0snwg82tgss4pt',
                user: '3zt3nq2almq9362lodgpmcabp2wke0rn6fy7cba9c0qmbpqdwmgpxg5b2v7qth9bfthejdyras1nvjhka1n19ou7s75lq7za9g2gdvvu46gsucsfbqgal8lu0oi7fz05wvvm8hsokviex6o283feglbgdem1mt4kkd9zpp5ciluzxamdizk4toc7oxnf7e8wpm61td0p93g1dcrcu442hyc21fadlryl3nz2022ssbmd9gyy3rc1f2ixvnkm3k8',
                startAt: 'XXXXXXXX',
                endAt: '2020-08-02 21:52:17',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7d41aa45-7431-4e79-aadc-eb95aca1ea02',
                tenantId: 'a649482b-1ca5-45dc-99d1-8690b37f148b',
                tenantCode: 'fjf849pplpbhrc4b4y1hpling75cav79krxu11ymj94vyxzjvt',
                systemId: 'c54583b2-fec0-451f-a242-d0b420eb0e08',
                systemName: 'ueqrbnmy90d6jliokhni',
                executionId: 'd0d02e01-04a9-4e55-9204-79480e083c31',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 14:49:49',
                executionMonitoringStartAt: '2020-08-03 08:34:09',
                executionMonitoringEndAt: '2020-08-02 23:15:32',
                status: 'COMPLETED',
                name: 'mbyef4cm2rexyb6hq6ndse7rnba4pp5vtwy1jid8gzax3hbbmnq0yc4ptwz58rtwyvo42au1swtc202ug70vsy7bv8mel11mklvd0d8xldwhmc0ez6x6e162f82bw0sxhh72p8r1v0ey9azs4h01tc72pjtjmk1f09e7i35aiy7a6m921h168gs8qpjf7azq57ue5wegqul5lxdylbl0n8m7tmvqwrie7kzmkmzvar46wsm3s9g5sjn8rv2bpkn',
                returnCode: 8873001184,
                node: 'a77kra21y3qzzne1a9kwtdlc83b187x2y2xydm04xkwmnc84j6vqt6mr7y1owa8yux25p9f8g5pd3kc0vh218zsiu41zj84q2u3p06afz0rmzusvsxwvxp24h5egp334s6o88r7lalm9abnhm7hfw6sezd4nw1aa',
                user: 'rmlr5mmf4kjq3pdmf6sjbao4fvfbrph5wia6rke999lfce7hfno653tzlbwnguy9y4tlcppjg4wr1bo11w90gy3lkcgthnjyfgldrukjsekxnjvtuhrm9ozvtuu2gh6whzpuzxd5jihw4b0mmkm5xgtpvkhkxhrqthioysk6aqz5pk96lmdrgxz1zg4t1x2w7vgtocone1frjh82je0yx0tdl71edpmg6nfpn36uj6edu5qy3eaz8z7aieio4do',
                startAt: '2020-08-02 21:24:25',
                endAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailEndAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/job-detail`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7d41aa45-7431-4e79-aadc-eb95aca1ea02',
                tenantId: 'a649482b-1ca5-45dc-99d1-8690b37f148b',
                tenantCode: 'eajyyp320fx45cahe78gipyralcr6xxmy1i9ylvbi17z7tz4hi',
                systemId: 'c54583b2-fec0-451f-a242-d0b420eb0e08',
                systemName: '5n0ixx5ig065euhxsdvz',
                executionId: 'd0d02e01-04a9-4e55-9204-79480e083c31',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 08:27:35',
                executionMonitoringStartAt: '2020-08-03 00:11:12',
                executionMonitoringEndAt: '2020-08-02 21:17:51',
                status: 'CANCELLED',
                name: '1319srmd1d6uz6xvpr6a7nktauhucgokhhl7szu39nhplv4rymjalr1rt9e2yjxz0yryszym4wekj4v98hmttgpjfdjv938h21rnvghnutajjl6po49o12kgeezwgyg2x6uj2fyjvy8jt4vrijhq8dzkbv6vlsf32o4xd8lee8hp88e3kmlu7ewyz08fa8jmlhfg5ir3dmuyyrc4z347x286jzahe1fqfcp2zy3towlsbc5x411q0dd1jea94ch',
                returnCode: 9688611939,
                node: 'dpqittgs85zs0yf4s8ka8a63t8z5wcgwpfvno2dldvb5tpzebv32pkw7p0ngoph15o1uzycln9odhcl1gg7y4ye13h9cn2dqj1fkyzeqvr8zs3esam06ghjix58y3spdyktasvb42ll9pgssgrp7nb3937v42qf1',
                user: 'ue0ssio4ykise1nzwg48ewe903jb5cs213k7ddef9r7t6da65gjuf8b7iibvng0spnej6thk78ho2ttgt9gctljkd6zkm0cwsauv2cgpzillkvuk8dyxsc7avmqsn4xk82pwyt07hodc58rhrufy01f8az5r1ybh1z6jejntl67k2avcy0zd7gh5g3n48tcyqvl3arykrhctb3kfg2iekj0xov617vmwazrvs10dpee6olri1kq5a2d11le96td',
                startAt: '2020-08-03 15:14:17',
                endAt: '2020-08-03 07:54:58',
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/jobs-detail/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/jobs-detail/paginate')
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

    test(`/REST:GET bplus-it-sappi/job-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '0a134afa-68c8-4396-b277-35d4e9d68c1b'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/job-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '7d41aa45-7431-4e79-aadc-eb95aca1ea02'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '7d41aa45-7431-4e79-aadc-eb95aca1ea02'));
    });

    test(`/REST:GET bplus-it-sappi/job-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-detail/fea1eebb-6c53-427c-913b-397372b56acc')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/job-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-detail/7d41aa45-7431-4e79-aadc-eb95aca1ea02')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '7d41aa45-7431-4e79-aadc-eb95aca1ea02'));
    });

    test(`/REST:GET bplus-it-sappi/jobs-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/jobs-detail')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/job-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '0c695b26-662e-4653-8b9f-183e72b958ad',
                tenantId: '78bc67f5-11a8-4c3f-b464-1a27c6358624',
                tenantCode: 'r3j8uw5bndxvylae4epwb07zrwzq8d8g89gdsfbssbp7y2m0j1',
                systemId: '6e6c961a-0695-4d47-a8f8-0562a4815df8',
                systemName: 'etv17wj68ojvu7jbzcm6',
                executionId: '20fed7ec-45df-4b5d-a694-e0778af78132',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-02 21:51:39',
                executionMonitoringStartAt: '2020-08-03 05:05:28',
                executionMonitoringEndAt: '2020-08-03 11:19:26',
                status: 'CANCELLED',
                name: '965xgxbmmoz8o8gwfzry1807v01tid1k0w8fn6dr000dcki9s87p1j7rxqwz89xcq6akg9cjmlhh3yervlly4z88ipp9m11mrm4ntm0mlm36rhej0akwkxtv2lv2plsmrcn848zsezls146kljjudv34pe09597bjgapnqdojomvh02g5wg1so50doh0bk9p5llrbcab1qpt5ovyu3ueqwcvl2964bbi6gwefy0j8ojsp3rxchlkt9qajruujar',
                returnCode: 4040969466,
                node: 's2r3n7b657662nijj56m2jwf12oomh0uudkucxcgkyo4mmdz88i3gdl60nk6c8g75gefstvy902wfhbgbzijyi7c07dwnpwalslt1u2b7nscgf27gr6yqs1j8f7zm2bo4y0qs89cv6iohga16hzzdazyuo9zshly',
                user: 'usxdh11sakkxx6fq6gnj94v7t7pkae07fb946six3q594bscrbxbikfkhginerjbptkskop8kdvu0lmdkxt5l0fo5krqbk6lxs4w34h5zh4u71w6vtgwmie78rng2jz1ivpgdzxckilmxb4pz5vac87xnr7y9p1s26i3j39ppasxabanm5tcfetod0q0t3vymj3w0rvht3l6y7qjxxacmlvdbycu00td4171qqe4c2urix3gew3k97jhx3mk847',
                startAt: '2020-08-03 02:44:30',
                endAt: '2020-08-03 12:33:48',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/job-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '7d41aa45-7431-4e79-aadc-eb95aca1ea02',
                tenantId: 'a649482b-1ca5-45dc-99d1-8690b37f148b',
                tenantCode: '6wng1eumybje7il91i2pvr2npbcm2dax85nr0f6k934a5kylik',
                systemId: 'c54583b2-fec0-451f-a242-d0b420eb0e08',
                systemName: 'lo8ldve9vccfwfhjiukn',
                executionId: 'd0d02e01-04a9-4e55-9204-79480e083c31',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 12:23:20',
                executionMonitoringStartAt: '2020-08-03 17:53:25',
                executionMonitoringEndAt: '2020-08-02 21:25:29',
                status: 'ERROR',
                name: 'e6a3pc3m14fycscvm6ocnqoewgqvhpc5tat24yykvt0gonwszs36rne6u9opzv0ulsfo86712h4rwjvob3hmktmuk2ipk6i2fuhd397w6o8edxcspfk0ax3x7remi2kqplzhcl28yu29pjj2bhew1de0046vnc4pcqfc9q1zz32r70rol9evxbsqibc3186yy5fdm1fgy7od0g9ep9nwz04ldn87aecful2masnjevnwp5mhy4qqyfvc61bkstf',
                returnCode: 3423985136,
                node: 'mvapyk9z6ini0lgialxdlyzmvbhihpr0feawriezutqz2ls0m0kihjwif81cjriq7on998qon888mlxtmbino04w6o2yrl7sbu8jf7k0axy27q4z0p9viaxs7xel0qne2axlb6ig4coqglhbm2ifuvxtarhm86vo',
                user: '2iokn50vjp03j6znp3zyngv03om9t25t9sk5k7vmz2nyljbpls0jky43wr021s4t8o2yq19iuptmq6z1opbslx9ur2r510aezk3nwsmlhq1ub2fynbhvjrs53tr3sqkn0zs1u07ivd56c1waed5vwzjl1ei2vnwy9mkp5bh9sl0ggesmzqz4krquimflvq8x589ircmo5z4wk9saejgns39ww4mjuqe8z1ok8ysfadryd9sofwoq6vhh22shffx',
                startAt: '2020-08-03 02:11:39',
                endAt: '2020-08-03 06:35:00',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '7d41aa45-7431-4e79-aadc-eb95aca1ea02'));
    });

    test(`/REST:DELETE bplus-it-sappi/job-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-detail/b95640ae-00a4-40c6-a1b2-6c357f58fa7c')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/job-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-detail/7d41aa45-7431-4e79-aadc-eb95aca1ea02')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateJobDetail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateJobDetailInput!)
                    {
                        bplusItSappiCreateJobDetail (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            name
                            returnCode
                            node
                            user
                            startAt
                            endAt
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

    test(`/GraphQL bplusItSappiCreateJobDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateJobDetailInput!)
                    {
                        bplusItSappiCreateJobDetail (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            name
                            returnCode
                            node
                            user
                            startAt
                            endAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'b65a643a-3e60-4ee8-9381-b0a3c2c884af',
                        tenantId: 'a649482b-1ca5-45dc-99d1-8690b37f148b',
                        tenantCode: 'to304ng1uysopjpftrihogr2w1qpdscu8t3toza62e8sx6btba',
                        systemId: 'c54583b2-fec0-451f-a242-d0b420eb0e08',
                        systemName: 'sohyd1oxng4b78gyww59',
                        executionId: 'd0d02e01-04a9-4e55-9204-79480e083c31',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-08-03 17:45:19',
                        executionMonitoringStartAt: '2020-08-02 22:34:20',
                        executionMonitoringEndAt: '2020-08-03 14:09:07',
                        status: 'COMPLETED',
                        name: 'vl16j5bjx112qfu1oudiywro72rrl5dy9ohxekqs7js20z109e8g2ghtw0r2ac8ienr85tto32xgq38156sefii1m0ym0eswpnlilfhwmd8zykrrctt22513iaxvwyozhg0xrvrsm6vra3mg927l7e4k3y50kcchp43ns75exbow8jt8uu5m0jtjwiabvq17j76j6xghhlu8qofd9yce0w4m2l14pen7jpkddlu36uj2j6yxb3d6kwzrppq00sp',
                        returnCode: 5872780450,
                        node: 'zc76tx7f4oxoz0jomstwrooe282b05w51dtjrrrvnvuopgjueu3pdnnjga80gh5n3gqsduv29cn8guhm2tf3xdpchjjt00sk2kvtgfs00bskwrmgnkfa1vzxnacyxsinzlme1bbruxh837b4s417r29oyiy2ica2',
                        user: '1uzi2w6v55vazxufgtjsuch9gjqrerhgwewj7veo6atd2fpkpdgqkv970cmq04on7k6subf7amj6bj51mylkj88zv877k0s2gwfqunllbhezbx6lto49fwaa0vfa71s661wg00f36n4yj0o235hnfe6f7qlpx6uydohafnumbahl1o1dl6es3ap2chajaq2ufbc9wjgkhblmpq4xuretwm6upgzx4bp8dzslxlngahux6rzvx2c3trbtutk2bq1',
                        startAt: '2020-08-02 23:04:17',
                        endAt: '2020-08-03 00:06:51',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateJobDetail).toHaveProperty('id', 'b65a643a-3e60-4ee8-9381-b0a3c2c884af');
            });
    });

    test(`/GraphQL bplusItSappiPaginateJobsDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateJobsDetail (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateJobsDetail.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateJobsDetail.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateJobsDetail.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindJobDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindJobDetail (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            name
                            returnCode
                            node
                            user
                            startAt
                            endAt
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
                            value   : 'c6a504c8-5802-412e-980b-66f2a411986d'
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

    test(`/GraphQL bplusItSappiFindJobDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindJobDetail (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            name
                            returnCode
                            node
                            user
                            startAt
                            endAt
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
                            value   : '7d41aa45-7431-4e79-aadc-eb95aca1ea02'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobDetail.id).toStrictEqual('7d41aa45-7431-4e79-aadc-eb95aca1ea02');
            });
    });

    test(`/GraphQL bplusItSappiFindJobDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindJobDetailById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            name
                            returnCode
                            node
                            user
                            startAt
                            endAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '1a5bc346-fff6-47af-a7e3-4df5065ebc02'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiFindJobDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindJobDetailById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            name
                            returnCode
                            node
                            user
                            startAt
                            endAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '7d41aa45-7431-4e79-aadc-eb95aca1ea02'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobDetailById.id).toStrictEqual('7d41aa45-7431-4e79-aadc-eb95aca1ea02');
            });
    });

    test(`/GraphQL bplusItSappiGetJobsDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetJobsDetail (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            name
                            returnCode
                            node
                            user
                            startAt
                            endAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetJobsDetail.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateJobDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateJobDetailInput!)
                    {
                        bplusItSappiUpdateJobDetail (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            name
                            returnCode
                            node
                            user
                            startAt
                            endAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '8a36bae6-dd63-40e4-afdb-a6b460d71af6',
                        tenantId: '4e3b4aae-7802-49bc-9ba7-56cb1605b6fe',
                        tenantCode: 'y0r0fcy1i2hawy35ry0epohvu4p3h5nlq7svszqhcejbi4yiar',
                        systemId: 'dd0bd8b8-c473-47f0-bb47-022149c3da64',
                        systemName: 'a5wka7hjh5gns9250p9b',
                        executionId: '128ebd94-1305-4834-86f4-8edb826fc031',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-08-03 06:16:41',
                        executionMonitoringStartAt: '2020-08-03 16:19:29',
                        executionMonitoringEndAt: '2020-08-03 14:57:52',
                        status: 'ERROR',
                        name: 'tsynwhuprvcda3yzy9hiwdfjbh9f6jmc8kpebmouu6mik6shvtz4pi1s9tki3l83tvhnncxgqfu1rrt32oje1nimbv4gw4jigb325zudu54hcpshlb18np77zw300n4jyhzxra1ga7etg9u88rb62kaw2ncx24wj2j30vt5jhu8blbdz6ba0u3yhavxuefrgdq9616rrrjv1cmlwws3qbmvqwui56ubf1oq3bdxryyht2qklq7o5i9ozbpgmham',
                        returnCode: 5589973782,
                        node: 'qgbhap3ukr74pjxv1sb1dnfql6cq06d41n3ig3intrz3t5p5mgzmlk63jiijj0uemn4j3mfydnf6ho937fk8qa1x29bf2tz33n7q029l0ppki2fgwfoou6c6et8l6o21zm2r5t3nd5dqipyxs1jzu1dqcowy1h5k',
                        user: '3cum0ipgy1h3isrnlr44h1wauhwzrsqgdtma3rqj6zmgszi74k1vhp7vj755l26p2fb6bchfqq4suyhel51h1veinsuwazbbver0pu5o8a5q8sobt9gl6iryfi4xw2xyenxhh98kalahni2n5609hhd8kdigrymm2usm7yvj3gcweb43tirecti646awa49n0isdldmxf5wucemqn0q0v79r3q0gaznmuc7pozdfjdc3fl0jt49g0hw4320v5e8',
                        startAt: '2020-08-02 19:24:31',
                        endAt: '2020-08-02 23:20:04',
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

    test(`/GraphQL bplusItSappiUpdateJobDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateJobDetailInput!)
                    {
                        bplusItSappiUpdateJobDetail (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            name
                            returnCode
                            node
                            user
                            startAt
                            endAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '7d41aa45-7431-4e79-aadc-eb95aca1ea02',
                        tenantId: 'a649482b-1ca5-45dc-99d1-8690b37f148b',
                        tenantCode: '5jory7hdn8g3i25doxh40ftybq516z72fxvx3rdqhu4apszdu8',
                        systemId: 'c54583b2-fec0-451f-a242-d0b420eb0e08',
                        systemName: '2h3vw6kpyg93d08v9pay',
                        executionId: 'd0d02e01-04a9-4e55-9204-79480e083c31',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-08-03 07:06:27',
                        executionMonitoringStartAt: '2020-08-03 05:40:14',
                        executionMonitoringEndAt: '2020-08-03 11:54:37',
                        status: 'COMPLETED',
                        name: '7qobdj4jb7snkk00vtmd7urst9loej6t6lt0bisth2gvfjuiy0ev540854mchb067mwsiz85kpirpsleg9hdbkqxjye0j2a7cifuek90bs63zk7zsdkcsovl4b41ityoh81v0xacax8lzgs0rslgirnt6zivl4141hq66x3tijg7bo5ofr1bztm69d0kuzu8zegevu0b4w9wxj71xnnnrk7drcc0gqb2u5jxpc67q6bbz6hh7q79zkiz8pvbx3b',
                        returnCode: 5354564909,
                        node: '7q2iafqx0mu9hvio7syqdqs8qyv4r36swyovpx49ysnzlax57a6ssop947oae3b8c7t1kdtm9hnbv34dezjd3u2awb2z54qi5n3drsw8q9m4q4xr0lshguarr9u4csybrqruknter9sbb51s1bluxmvmt9ub1cb2',
                        user: 'vn66inpgxljkgtyino3cmp7tojba5hofb1mw9kzslg4bdzc4h68m7vglk4sen2k7jcklucm8dlnm3locfbi3fwcev9a71f2lwhv8ilw79nbzd25z46i2gp3kivq0qokxwkffv48jd4m2fu4qmx5c1m5wa00m1z9f4hr737xmi1guzw8wys9rj4warj4e7m11exz0znk05m0mt7agln33nz7z0cabkwlorz1o9odb1jvnrwuonvfr7z4uhisefjh',
                        startAt: '2020-08-03 08:31:19',
                        endAt: '2020-08-02 23:55:11',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateJobDetail.id).toStrictEqual('7d41aa45-7431-4e79-aadc-eb95aca1ea02');
            });
    });

    test(`/GraphQL bplusItSappiDeleteJobDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteJobDetailById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            name
                            returnCode
                            node
                            user
                            startAt
                            endAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'dcdacca1-45cb-412d-8819-6826d6772b17'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiDeleteJobDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteJobDetailById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            name
                            returnCode
                            node
                            user
                            startAt
                            endAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '7d41aa45-7431-4e79-aadc-eb95aca1ea02'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteJobDetailById.id).toStrictEqual('7d41aa45-7431-4e79-aadc-eb95aca1ea02');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});