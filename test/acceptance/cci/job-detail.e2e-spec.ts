import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IJobDetailRepository } from '@hades/cci/job-detail/domain/job-detail.repository';
import { MockJobDetailSeeder } from '@hades/cci/job-detail/infrastructure/mock/mock-job-detail.seeder';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { JwtModule } from '@nestjs/jwt';
import { IAccountRepository } from '@hades/iam/account/domain/account.repository';
import { MockAccountRepository } from '@hades/iam/account/infrastructure/mock/mock-account.repository';
import { IamModule } from './../../../src/apps/iam/iam.module';
import { AuthorizationGuard } from '../../../src/apps/shared/modules/auth/guards/authorization.guard';
import { TestingJwtService } from './../../../src/apps/o-auth/credential/services/testing-jwt.service';
import * as fs from 'fs';

const importForeignModules = [
    IamModule
];

describe('job-detail', () =>
{
    let app: INestApplication;
    let repository: IJobDetailRepository;
    let seeder: MockJobDetailSeeder;
    let testJwt: string;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    CciModule,
                    IamModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRoot({
                        dialect: 'sqlite',
                        storage: ':memory:',
                        logging: false,
                        autoLoadModels: true,
                        models: [],
                    }),
                    JwtModule.register({
                        privateKey: fs.readFileSync('src/oauth-private.key', 'utf8'),
                        publicKey: fs.readFileSync('src/oauth-public.key', 'utf8'),
                        signOptions: {
                            algorithm: 'RS256',
                        }
                    }),
                ],
                providers: [
                    MockJobDetailSeeder,
                    TestingJwtService,
                ]
            })
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = module.get<IJobDetailRepository>(IJobDetailRepository);
        seeder      = module.get<MockJobDetailSeeder>(MockJobDetailSeeder);
        testJwt     = module.get(TestingJwtService).getJwt();

        // seed mock data in memory database
        repository.insert(seeder.collectionSource);

        await app.init();
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                tenantId: '7d28e7f6-9bf6-496b-83b8-00f4e1ede376',
                tenantCode: '0y5c6tajka4h8rs7c2rlvf0l0he5vramdi2dpjip5og5j1krkr',
                systemId: '70bfed55-c2eb-4f16-8b4e-7f49f35d8146',
                systemName: 'm0a6cehzv89agkbmhvnz',
                executionId: '7c093658-5931-464b-a7c8-0805e77e52f4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-22 18:00:05',
                executionMonitoringStartAt: '2021-05-22 16:23:52',
                executionMonitoringEndAt: '2021-05-23 06:44:02',
                status: 'COMPLETED',
                name: '5femeo6dir6vpdz036esfb4tbewsmfz4u0ut4tqnleq52un5phnvid3heqt25s0o0kt3ws9d43pdg1901x4jp1stu4pgfjs8bil8lqrhyew17qbzc6ezp65l6a1xpi6cqt5qgm2nuduf2ay58s6ms4jddi8q1wb6t49o9qy3bzq48fc4iu58wqb122xputnb03124257v790g2u5da1wwkzhccj11py28vjjnift4w5d2mh4yz3uzuptuqnoh0m',
                returnCode: 7693739909,
                node: 'ioq2veohtycp5mckjsm7g4zgs83kh53q7lu2k1g2ib3rt9nlc1fpgawrfu6y9x7zdajzrxwu6f7zx0xn30an0fdvf6yb2nqsvgv8ti50uuof0v5gcfzcu0ob6uyrjfp2k750tb3kkkohbjqjrjfx1iv99o47967d',
                user: 'nu07udt0rr4m317fwvrzc1jdonn6bb7k4wr87nssidd9h9dgz8ywrprhjp4fzoytrmssv62cs12hxzq4s8d2ax6iiwop5soqsveoeh5rezd3d51xazzn2u16f48elfc1xfnuo8ydf4pgk57df5arl3ctvg41h2m6fajl769mkghc578qok5b6qfacuqmaiy7uaadfndkq5bq5eucazh3qishfefsq6jp6a983d5ijf68jrsjhg3we4lk2l4t4s3',
                startAt: '2021-05-23 04:47:51',
                endAt: '2021-05-23 03:13:37',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailTenantId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '828f8db6-3c8f-423d-a989-309f077abcd4',
                tenantId: null,
                tenantCode: 'gsk43kma5uzobulr7khcxxrr4j663qlxgpcous4pyascoutgzs',
                systemId: '49763a85-6bd4-495f-bb09-10e1f11135bc',
                systemName: 's4ky0njcvv1r7k40xapj',
                executionId: 'f9364a33-e849-4861-bdb2-0a5aa4ff051a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 00:18:44',
                executionMonitoringStartAt: '2021-05-23 03:22:17',
                executionMonitoringEndAt: '2021-05-23 10:42:18',
                status: 'CANCELLED',
                name: '3n4qzn66xjvne6vjcnlyhyn2mcmofbyupn56og9gu2y83ypkvvjrpvj7bsteyl0a5wx0gbyn2gtpeqwhip8sx24lxds1uxlcayt4qurc0w53w14p4nm1u4dllktf3kfsh5j0moyu96k34j22u9bnv19zra15wa9h384jbm7jq0qov7vrxpxzdj1df1tkt1te488cilnijpka0myu6wc22s2totpvd9i2rdhug14y7jekvxg41m5b33gurdpmxqk',
                returnCode: 8004354961,
                node: 'v632wsbi6gd79ftz960fhglkf7wvk4qakt3q7vr0vasfva4ppd4feubw4951l48xazip12udwoxr8iu68r0zebpe6apwv5q534hjodoziky3rha2wpdzukxx9ldxac8cay1ymln17i8mio25p4avx09urzxj0o5o',
                user: 'x33iki0dcp9ugtw487i917ivw0mjotzfsvm04m3q0469r2o831beav8vaabf07hi5he0uyfzj9hisj184dxc53zel2c7gxndash7gqw5nspwii3j9mtu6k6ay6yun5uai8u78sr6r6v4gi62abw67lle8u10fihvp7x7aluqnj7o83wbyc804mwrxj85gaholditkaekwh15oh74jk5b0dqavs4jqjlr4wz6j10svh2c1n1eo7xox7h606aed51',
                startAt: '2021-05-23 13:21:33',
                endAt: '2021-05-23 05:29:34',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailTenantCode property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b53b0db3-be02-429c-bdd7-8b848788add6',
                tenantId: '4c641d2f-8500-4162-a501-3ab70abad6ac',
                tenantCode: null,
                systemId: '3c14fd3d-656c-44d3-8213-dfe36b93d1ed',
                systemName: '1j0800yrwtnz04xe8wjs',
                executionId: 'a2e9843a-8c06-48b3-aabe-70b89d7b17db',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 14:03:45',
                executionMonitoringStartAt: '2021-05-22 14:40:29',
                executionMonitoringEndAt: '2021-05-23 12:25:28',
                status: 'CANCELLED',
                name: 'v8d6dn9vx01wp21073grdzwmv5nnp6949uyjoz5l24b49j76wbiy9h2z4n11bpg0hbsedu17jbpsp9j2d53txxkqsbd9tyy8d8g676rbs7ptwtjvhtt6ez7cvfp2o8hkp53ksr2ymf2xi4u7ocl8e4greepk3e8xijxpjtxku6w9i03lxbpj9mjciwiu59mky1a2evvh5ju4jds9ec4y6tz1g3nf9bswpyhkca70y2jibygpg0m59dl9h7o55kd',
                returnCode: 3722253052,
                node: 'qyh2piq0u3y4rasjk5c39sr8vylwr2t8ptiohjs1s2u3wzoqgaqtd82qp6j3bglqg0rfks8b54gtfgsk23e67u6ekykyboisqtv4rhkgy6l0fciey8wxyallsgjq9fowaclbmdjv4gziewpmd788prxw2bkrh5r9',
                user: 'to3fbdzn93f8b5q19tcw4qigsbhllyj8l3ih41jgl00fxhtu9ulah3wzkc48ex8u3ntm9p8c3oxak0n9nh5gmzpbeelgs8qf553qx4lln7v8ebh51jiy60nljqktrtnfe9maq6wbfs1spjax0cyvovs2q5cd3esg0iu2hngj7s93e2ecb2odelfyp46b5mqyclg5h3ecty66wok7lqzw09aabmbxc5c9m335wjca3r11ksxlnp1n66vm7i2i218',
                startAt: '2021-05-22 17:17:54',
                endAt: '2021-05-23 08:18:16',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailSystemId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '91a72d9c-218a-4142-9c8b-bbcbe465b6ca',
                tenantId: 'f910cd29-e829-4231-991a-8052c9dd5746',
                tenantCode: 'zbqr6kaug5jwhd7krd3tpc0pwb6kx9pzfnmdaqw2wh19mj8mpo',
                systemId: null,
                systemName: 'opgqcmh87914iojfv781',
                executionId: 'd64ae52b-dd9f-4f8f-87d9-0e2c448f2d0d',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 10:07:19',
                executionMonitoringStartAt: '2021-05-22 18:19:03',
                executionMonitoringEndAt: '2021-05-23 09:17:38',
                status: 'ERROR',
                name: 'cwpojtarrbmzao1npuby4mxup3xa09bu8xvl0vtvgx3sc3crr86nlu15ap4asz36prnisn7e1lsanqkx5wubmtw88i4lxp9g1cxeob4qx85lgtbr17nr6inj0v4b3lktaiv5k03wwqdbw8di6kz54vaxjgavqew446746dxjuag3dr8oagkzfl03uj1mn8lalnqqzy002qtzjs1tfj26n6nlq1nxlah9ek2c38cek8425f316al1kbu7n21bkrd',
                returnCode: 4516759348,
                node: 'nn1xfj25ppuas432mfzf4o9471xwrbss78rw51kgrup2o0cmqwanwaemdfy0d3gdp3dsdfixxn2zq83gm4yfaxbw1a7v21ta8cwo189yph43emupui5iq8tfdhhrs8iejdvmzxi7l8p6qdao8ptidaglps8z04jo',
                user: 'w3j418m8n75i1ovexanfrjwt0v8rf6mfhqrisw4jo9kau6ityf9j5zlz18tous1nav6mry5rtzf73z1wstdaqe8twid1e01gm1ustwkrysiliif9u2ey0ysjw5lzcrhvc6oowuow86mjlrh5czkyy3fjsmydli22rg3qz4uf39ykk2p1d0rhybx8fe00gm82459oyha6dk8xioyn3qpy2m5j0dvae8g6rg4zwpoyunrmxjb8ihophlwna38qeyc',
                startAt: '2021-05-23 03:26:52',
                endAt: '2021-05-23 03:32:59',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailSystemName property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '04bce7ed-e3c1-4ae7-9dd7-f3792755a198',
                tenantId: 'daebd6ed-e3d3-4498-8932-bed81d632823',
                tenantCode: '0ac3y9zmov2dzq1myzvlzly889fw55fj4vk0qpgg88on9muo28',
                systemId: 'c38a876f-d7dc-4783-82a6-811b6a35bb5d',
                systemName: null,
                executionId: '0432ac84-7a3c-4f9d-b860-5c3dad121c5b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-22 14:21:30',
                executionMonitoringStartAt: '2021-05-23 10:48:10',
                executionMonitoringEndAt: '2021-05-23 13:30:19',
                status: 'COMPLETED',
                name: 'snak3kqsxjpszfu4f4d6j6kf5k9wklvnnffj7eyb69hyptv4r9sgbjgg8kv8n3bueys4wqpr5lxll7gl2ukdj9px2b3nxecif05a9mcng3tz4etp681uxgvln9xfp4rpqkbs4v840ecz86msbite76ohw03u6mgghc04d2iwpt3japfnk2484jy5zz44ry6t75501e8x54g7x8gyzje2x5f9p9twonq9skj18ahklsjp8g2qixarb2nqm7tuk9q',
                returnCode: 6266891295,
                node: '15zonq2oiurtxaq9e3ciy48ov9den8kfjty5w8xrchsv93ziwvz4frwyzewwvot8xrw4du9jko11xhvnxzd7n17zl2ylbr0epsmw9spwww10o6qixz9qlpt1vkoywt2x8dig0tkumhr277ino2q9fy4nhqyg4dg6',
                user: 'vh1icb4i6jj561arzo18ovg8qlnejiayqxocd2era9ayz3hkyo7kqks7a4ndgntlbfvs4r32blzum555z2m8eunolhda3v2wco4a48f2fsid04glu5e753ymhadzxwrfjiw3ar3i9afbi4j1pgjiupeh1i7lhav5k2wnqgc0mvazty1ehdrd3e10lkd8a4b2newi0pbkzypz74lavr9ghg7uifxohk7ffdy3ht5d5wbsru4vmm5yqa2jjvbzpdp',
                startAt: '2021-05-23 01:20:52',
                endAt: '2021-05-23 01:57:45',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailExecutionId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '988e4f90-1657-4987-8258-26117bf0a87a',
                tenantId: 'd907146d-c875-4532-aa44-df3959586910',
                tenantCode: 'zxlmw4h7gbwto4u2lhlaeckrziotjzunc4suqrqbjhgv1jk31c',
                systemId: 'ac4c852b-2a0d-47f1-b23b-7b230ca00c21',
                systemName: 'y2bptp42u4fmh2kllpur',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 01:47:25',
                executionMonitoringStartAt: '2021-05-23 04:29:55',
                executionMonitoringEndAt: '2021-05-23 11:46:38',
                status: 'CANCELLED',
                name: 'csueh7cet43pveh54irimqd8y4qjlaghzw8pm3xbxdkjb41w4jhjng6rdqjr4r5jmdhi0zx6ycr6jr268bju0ijsnvaxi703m3sx2xuvbgnh69cx1co4ut4skpnnd1h64a7sfl5ev0zm0n6ylvy7juiami5g68sjjgeu5wtqzflpwsa4qwvbmeng4kemonk2zir2dw4bwtj9ib1sefw64gr3l45v479lcjpbn6hb31ecnjwtet1vvtjyb8mbw8a',
                returnCode: 8127171361,
                node: '6vrf15wi63v43po5kl4zjfy5e2nz60a1yg7kzek2qqug3z8yq7o54ym34jm3g1nv2jy28a7g1mnn9th8jwsdpoeulx62c5b86443dagg747m8a1ln8rrj4ldzi8ydhxgo17snoe36or6mgoe7zf90hc140qce8v1',
                user: '35un6e32899sq1j6ihgpqve9te6vzm3el94bmxme9htzcghm2aup20bf148ckwujzm0ii428u1o6mgh5rj8lug6f6fuwsisq99qwiwsb21xjtskimv93j9yn7vg62mf3007qou75jot9yho771lw2r52gf3ydzngf4259k5h8etrfim17hdhzbiygl15wyihgm4rgeqtck4jylblv2aa8dk6pts90xxtz55dszla2lyob6rq6n4y8fl7e6l7sxj',
                startAt: '2021-05-22 19:22:23',
                endAt: '2021-05-23 11:13:48',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailExecutionType property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '6e9e047c-a9be-40c9-bc4f-bef4495a6ea6',
                tenantId: 'afd478a1-c471-4608-8a5e-4af60d5eaee1',
                tenantCode: '1kzbqv77hwfv0drky7skotzw0q8zubswxlk5orpuqylobo4kkw',
                systemId: '1361e023-574c-44a8-8ade-352a11c17624',
                systemName: '4cw4tbpwifz861etxi37',
                executionId: '2da7c8aa-5d4d-475b-ba2c-4dde724d968e',
                executionType: null,
                executionExecutedAt: '2021-05-22 23:57:07',
                executionMonitoringStartAt: '2021-05-23 03:23:30',
                executionMonitoringEndAt: '2021-05-22 20:36:18',
                status: 'ERROR',
                name: 's3pyis5wscnq2vhheezvjmbsb9sogndmiq6hgdbajs2s36nwhp84vgcvz3dibhfr1w5mmz73dhqj0dtqk7355eh3us79z4jbq792b4qtbeq4mdihkow5ans1y1wdag52hklhtptpdlcrr9p5lqbr21dpxnsv8czj9quc8zmrbyknwaz14f7hsy9j6bl1tlhm65gsk5cbf2h9g1gohpmmoal76ha7qxkg7py1a23u1l5f3rwfn0smz8r8hvljkxg',
                returnCode: 9470178773,
                node: 'w4hhbqqepi7y8p0xvcglcshzzs6jue0s2d4oz6murwcvzbjl56en5y2gvxcbblnthk7r7rl7xtmufm1mq3u1z6gitw3f5j1u6wgmup1gqms5z0jbrtzyfe5vbkxgxcqn4qtz6z34u1ig2q1xvtrpxq2ms6ygvznd',
                user: '8772y4z421bvcmp7dig4jz837mjkxl9alrwxu9q4pwi91aduf34pn20qvpwnba6b5a3mx2hsqpgqrl1ilrtbqmp9hqtr4ne937jvhip5s9rm26d4yu7l6hrcb7maoirtk1njgmsc9tvmg1kvsqcwft7243fib99iuk4ef37yuolp7dkkzgzgppjeejv8pqla6x5rtdpxj7p3mf6wewpjoonvvpxnc4z6bnbo789gmspybhpwxx6gt7ojc0i232t',
                startAt: '2021-05-23 06:16:38',
                endAt: '2021-05-22 23:34:02',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailExecutionExecutedAt property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ea79112c-a8e5-4e77-ba78-46eba59d2e76',
                tenantId: '011a70c5-f238-410e-b067-f836be40023b',
                tenantCode: 'k6sldyed7008r3f9btblhy5ktwbg3v0s3gj55lf5siozkbxlpx',
                systemId: '9fbef197-3b0d-4299-a0fe-af2af794da3e',
                systemName: '0cf5lei68dc6xqftek39',
                executionId: '90cf3abd-6e7a-4194-b057-bc72a2e71a5c',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2021-05-22 17:11:50',
                executionMonitoringEndAt: '2021-05-23 02:21:49',
                status: 'ERROR',
                name: 'vfl689ez5ukdgtj921hv9lgwaqmjgsc1ap0klza3zphomjc6c624fkhauxlimhkx6j12vr76p4trz2c23bwt1ol1fdrnll63ucn1zkbnsei7m0roy7209ub57czrel5dlwllo7pi2l3bgslshugknqvf93gwylvc2acoju6d9tjlwlii9q6erbhv1qqflksfhtc1ehuio37v3y27yib4j6oc5gdv4q0uwrhasrxy1r75c5afiyoksiydqo678c7',
                returnCode: 2410183644,
                node: 'b983eigwfe8gop237ryj2kvtxlyrvp8bqydmmbwvjuo82flyo6n0kvtmyiwyp6sogsqp0e4kjg9or2werk356le7zyi1eigu4tkje1u8lj4n4npfai70wzhrggxjels8j8oubxat9q96ugk4sd38dbyi6ez07fcx',
                user: 'jtbb0k6nve97gfleqxp7uxwf7sbdjo68bxu0t7tqkmndnnuof3kkrdk0q0rm5vff3zxh4kghoe133fwfslsszj6dkhpry41qd3iykxa0nb9l90m49xvdfxudobfxg16lu3t1ru6wjiplg02oexwl7ugz2xit1payaa8syabwnu88di3cituqne7a7hs7n2omp4ix5ik2y7pemehe0ly6lzwgbq9270p4ityp3hn74s0oouxwfnvqkhgx6torfn8',
                startAt: '2021-05-22 23:21:06',
                endAt: '2021-05-23 01:59:53',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringStartAt property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1a52d648-bf56-4a5b-8083-b80d47ec2261',
                tenantId: '2fd55efd-ca7a-43c7-90fd-af9923a57532',
                tenantCode: 'xjily1gzmiuraltys0dlql1uhrvkzsf257c7sgsfw3ylzkrte9',
                systemId: '8cef46ea-27d0-4105-b3e7-e5561ddf1613',
                systemName: 'mbkuun4wh4jbya49i8yi',
                executionId: 'fca6c7ac-6000-4d78-9d93-6bad68076c05',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 10:48:53',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2021-05-22 14:54:13',
                status: 'ERROR',
                name: 'c6l7n8lf79gy8izezqxchg9ek48gyvjaj6t0wnsswc836ypa2edi2ib9n2b0qy8h4vgn3datu3euhaaenm1jfmgnzuknrdp8ec26oertzykwrwafrckapar9j6wwoo6nn75sdjwp2nuc8d3a1rgxlmly4tt4gvt6m9mc8uvcj30pdqcyx3q4wat6nt1zgg1daiyv44na9zoj93r1sacekbnqj8jwcqq5aa5k1me5q6654lo3ho93la1b4584fh6',
                returnCode: 4159605674,
                node: '6ur62zrsdp7lpbmdlyg5tyly9oh42xb9w5jivwh58yv2rw9gj4z7cokvgvx90pbb8pj98wge6xchaolxzp4lpfphy158zvha2k1kd2bdft73v3rur9gc5oazg63zmmxs2brgcsgpfzaxazdkktaywan770azytds',
                user: '8t5g0z823bndzj8loohzo63kfj999edv6nlrmjr9pduiqn048kujif4vya64p80gogs8s8s9oqhl9of2il78zry54nd6pfnrerc385cdc44euqj2pmwni7zbk8cbc5gbibdamfpj54du4old4un4srtds9cpqcjgmwslu8mb2fqlfitdycv9it57ga2kp5x7e88lotp03gnkf0k2v7u9f2nvsp1h7o3uxh9pdp1pwx3p8y73hbn7bchixgxcb82',
                startAt: '2021-05-23 01:01:03',
                endAt: '2021-05-23 09:43:33',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringEndAt property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '16a0196e-a2f6-4631-9677-b16ad8cd5c4f',
                tenantId: 'a59ec62d-573a-4569-b022-36a30e131d8a',
                tenantCode: 'xur1goys9tltpn112uso6m2euu6yn91nr1qp7clmxc4q76esp0',
                systemId: 'ad94b6ac-22a9-4bf7-bfb2-3bfeb2422ad1',
                systemName: 'nahhn4cf7lpfdhvefuec',
                executionId: '8115e846-606c-4129-a6e8-b535a2cde17a',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 00:47:28',
                executionMonitoringStartAt: '2021-05-23 05:31:40',
                executionMonitoringEndAt: null,
                status: 'COMPLETED',
                name: '9h3uivmsjtjc07f6pfyrih6gmjh590v8l8r7a4jppaff47pj7ey2lwrw6mo40fvccscg37qh0gvq5uj13mq7yxn91j2bwbzqat28y9rbga6tm4rzpnt13m8487fsmn6adbr4v9afc169jbhwbxc0ngaaeykyvtjox6v9nxkmy91ps919qisjkovlf7dhm1cbmqs6ot91ysaj92r4yqq0xacov2gso29fmqi7553d9o29l5nmivnj2um3xrxgzmu',
                returnCode: 4214591521,
                node: '9ngze343p4hd0dz2rsxw0i3o967sz5wmyabuzakm6v3ouuvfxoiqrtk9skwjrswakfb6m0vlt1ewgq5vxpuxkx002d6teh55v0mtc4vqn8ms3rjzdlxtm0lxgzzcrzi5cjhxou9f9jjnm4j2ucpxvn35v2k6dthf',
                user: 's6i4fj5kmfc90f65rn5t1k1cflrapzwpjqw1ce2w9qs6xtb3sfagdovhgvc23z448njp6lc4prwlicjplkdlakm7cr3wlj9z11dnom37rugh016xin5s8p6f8gnsllwj1ijbnymt6dfoofix2iseshr5xhy25xyzb4nwyixuv4xoryf45kc6ux4jpdpy1up3uqhmjr7vonfvkyi2r7ixueil0i9xsg281hfywvvs5f4c5hlbpzlh91ggrsh7pk4',
                startAt: '2021-05-22 23:10:30',
                endAt: '2021-05-22 18:26:43',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailStatus property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e26cfdbb-6875-472d-a13f-119aea538af9',
                tenantId: '00af10ca-b780-48d7-9a9e-65fee0913c52',
                tenantCode: 'e24vdh1e4pj8hjkmyqj95u2zosavxje58z4vuj9ns3bp8gokxi',
                systemId: '2707b31b-9111-479a-a185-843b77d921a3',
                systemName: 'gvgh1yvl5h13rlpvuj78',
                executionId: '0c08663a-88f5-48b1-bd22-d8ded3dd06e1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 00:42:28',
                executionMonitoringStartAt: '2021-05-23 10:23:44',
                executionMonitoringEndAt: '2021-05-22 21:52:08',
                status: null,
                name: 'fm2y5fivm8cdpzhi9mmfviu4vncm0axxeojyni5x7we0umc2e01bicly33zj5as2nrp7cw9revdto3n6p1nypvaglxevxkwzj3jqknl9hyqmrgieadeutz59zbygo6t291nxsgco8vcqzwszjzrkikaitpr0gf11bf4566i0ehlk3s6pdv8ngilwpph21eu81o202g42coqnggmudl28c0i69ff72hltslfa9gv6c8106vzj5dblr7lw28c52q4',
                returnCode: 1451498379,
                node: '6ckqseufgoehk1w2gndehir4d0ahjefzzhk29iwvlnu5del3npxuxfwvzx9jj2908wmhul52hukmuxmdhpnlkv7ifvyrba9c661e4ow531e440l04n7m40y9jghznajafxjari82rea871zsxpcdx9rlgl4ju376',
                user: '4omo0yhh4ki6nlceah3oujgzw4r20yqiatuq3mswvitj2o34sy1k01tm76dk793km5y0wyurjtecityfofuehfsgq5ltu1w8snnhlol6zrm8qktrx29fdobg9t6jp9yhstskiwmkwafz1yfv5kfvio74ctk2ch3uqab7kdru4zojmspt4isxckmpgqw7mtgpx1t1easbqv5jqpe1x6kn2ar08svgsjbfmd285l2uvomgs5mbkjydj3ioo1f6jvv',
                startAt: '2021-05-23 12:05:29',
                endAt: '2021-05-22 19:38:24',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailStatus must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailStartAt property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '12694248-c6e2-4c62-be7a-5505f0111b9e',
                tenantId: 'aa1daaca-67dc-4572-88b7-76d221a2c392',
                tenantCode: 'fcuqyeqcgd1fw4r2kt5f3ld99rw366z6om4jgyezc63j9d2xuq',
                systemId: '204b2953-5424-493c-abfd-a185da2e8bbc',
                systemName: '8johf8gdkmkz9zghiiax',
                executionId: '761ffb74-bbb8-4536-a3df-1e7b775fccca',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-22 18:31:49',
                executionMonitoringStartAt: '2021-05-22 17:34:36',
                executionMonitoringEndAt: '2021-05-23 08:48:39',
                status: 'CANCELLED',
                name: '5uvd5h3grszephs12g69e2bkju8b1587rkjqdbpf75n8mxbsmd3g58mhembzqyg0xvflwck7ps7xlb3lyyn46xv4p48d1sfyq7iajhm4b8i17wy2v8gjnnvbyyb8yuk2g1ypiiyin90oxwsokrj3bst387lvn6ughmmy520y31ew3gxse4dajfyuxi2pg4uejf90x192jglz6ezxxiug425o1mggsdjf2g8pqt03vi4aym7odlxbvqp653lojfv',
                returnCode: 4992748323,
                node: 'r7gai36o5e3de6fea4fhpghg47rohcq1er6g0c6qpxiyquz93yu6kssbijsyuur4o1cxjji8rh9oqleitdyidch2puj8ql3k9cvdb41rkunoe4iciudde3nrzxah5sqgxd44vd9cm3fxw39tui9qbocr6wsq8rk1',
                user: '787mk4bccxznj94bf1ospvjjgp5kvbla38thlfzzlmsmsd4gxm8wokyxt8c94nllmnprdaug9450tcjpefle9xui0608apk6sjr3jnngzlz1fkevu3dsmngjlywbd240fwfbluxmeple9zj12hgkozi05tnkteq4towy3atkfiqsel2l4dcb1lrvvsmc4usyjmokt6d6tymfvvodaxpsygjcn5juzqwko6ncn41eu59bcee62e574siowl7vixv',
                startAt: null,
                endAt: '2021-05-22 15:15:35',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailEndAt property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '8badc46a-125e-432f-b23d-f03157e1e289',
                tenantId: 'de0e63f7-345c-41e8-954a-1e3fc907ae29',
                tenantCode: 'v44dzw4g7suyxv6h1d6i663oalrw37vz230e3hbbl84d95t8ce',
                systemId: '42c9c27e-cb66-4c10-95d6-fe859db5c8cf',
                systemName: 'a1kp1lio7ti02oro9n21',
                executionId: '7be94ef0-ef8c-4b34-a54e-4dc8379b55d1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-22 23:16:13',
                executionMonitoringStartAt: '2021-05-22 23:08:28',
                executionMonitoringEndAt: '2021-05-22 14:15:58',
                status: 'ERROR',
                name: '6ygkh02tx8nvxwgnxbwklswvsubhqlhsx3s4k00u9vfdvkta7kaqlrlluz1kks4fib5dzj3sfgz0ywzllorgjpqrzyog35cqlrtp6ksntalwwho47i8d87zpc5jtncykcc4i5wjgehra3h7ntb8h4gryo4u1g6axes2a1cwsv5b6xr18mxeniy30udw68g7lwpn1c4d7nyeil4uc1yvghsxfkzwkm3s65z4ely2l2fl4ehk4z3pwycxuv1mwmyw',
                returnCode: 8181073321,
                node: 'ntu6mz1k0pxghhuchxazk5axwyp102ip7iksxxssxg55213vb78hrswvsmvubpf1q8se2ovj4zieaw6wkif8zyjxi7zzsx8mz1l9m3g6ju95rrzekhsu3t9yu6wlfixfy925amg2ium3wsmhx0oehq1x3ul3xve0',
                user: 'bprhjas0aaimupzvkshvcfgnhtucb2u6azhzi7ykugs5xudq79unhdms4jo1gsdr375lxl3rafryq98fjia6ntm8e7tb2utxepn38a93cjs882u7gcsfyji6djmshmu3iawrns128ljbxe1yamegfkxh9b5sdcy46ez2sr3dwik7gnoutjx37drkvp0s89ud2k3aevigj9qkyd9h0two9flyq8kd2k0g40gukjttlbhml7z79u0qw4kte3cscbm',
                startAt: '2021-05-23 13:53:15',
                endAt: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                tenantId: '0b8e5f2d-8efa-495f-98c4-c245b49b1389',
                tenantCode: 'rornanc7gbljnl6hpj9bhvkbo1t3jd5xoysq0ikphtg8lbamnp',
                systemId: 'bf648f1e-b60d-483c-8bae-6f207496f63d',
                systemName: 'n4dqex4nu94jxtjbqmho',
                executionId: '03212b04-c4c9-4936-b24e-d9b425203017',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-22 20:54:11',
                executionMonitoringStartAt: '2021-05-22 19:50:22',
                executionMonitoringEndAt: '2021-05-22 15:46:11',
                status: 'ERROR',
                name: '51q5i6u78tqe7399mcqs9ygxquqrpyz0d21csifw0bq8ac4h9s9gg7mwdci0w5brxskpb9im3hu3t4yuutn2lq3ovsi3es1fns7ka4i008xti76rtww6p10q8xxfofzem12gq908470mnkgpnceakn6itpnu5e1mrtzo5o6ln4ehhsay2gdrco2obh70uxpzz57od7pakufwr65pmuhqm5t0zd6v6twg37kj78tne7je7sphnyb9z4nmwruougt',
                returnCode: 6621253191,
                node: 'e0jmnsc8fwprsuih0415vschbdohch8cdjf4w85a1pq49ruwll6lcxio5mnbq7z6rqyvwzscpk7hx7fpm6at0f3fdamphpc4khkxijpeqdwwe5bgbor4850ghtc1iiaph7fxh68uuawoz0mj35k9rl729aszth2r',
                user: '60z7jr087crslo22zr4tov8m8wv48wui12k8chd4q8l01ozd6q9rzcnjqj599z6s0jl8qdbxtatxa3pmnl0blehciwx4y5qiakhl47q6afcbbnfrwpwb3kyiagq2ah5ra1dmcy6m1wq3clfv0cywxrzxyw8t75aytvl69rrnyu2tmm4v0wl8e39ai1rk007w9qbiksn4tfta9sarrhwvo9a7wkum881vh0ogqvgtwmw6rjpj5sawcmywahuu7ca',
                startAt: '2021-05-23 02:59:29',
                endAt: '2021-05-22 20:45:21',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailTenantId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0a89786f-8a42-45c8-97bd-926c992580fd',
                tenantCode: 'od913kxm7abeeqoylqubuqf1gpq17hrbmrlnz01j80ntaa3a87',
                systemId: 'e6133012-f0ae-4533-b4f7-69a16fb4e899',
                systemName: 'nag741nmg1bnvcvkm8cv',
                executionId: 'c1f62c8f-cdc3-4da5-b5a0-777fa9434375',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 08:53:55',
                executionMonitoringStartAt: '2021-05-23 01:18:15',
                executionMonitoringEndAt: '2021-05-22 14:56:32',
                status: 'CANCELLED',
                name: 'kpdqubtkht2vfmnekcd7j2rilcpolm9ekbx0nvkpgkiw7tcc5rzqziv7w3jf5mbvs93wfc2q3bif68pdln2rgru3urz68yg78nvx5jn9993q33k9e17bhb2zez3zxovg3ji1wxpruqzbckfvig8brgnowvd5k2uytsj3dz5j14k86bspl1umtb1ltzcp8kae1vlm175r6d8jxpos8q846hkqo8yha7lnnelqhfrg8j0274u2m7watfzc305g38z',
                returnCode: 7582232249,
                node: 'n95n89k3dz61t5lkass5astlig2w1xfof98te91zm4vncvxsg1o4d8ybtai2g9cayn19lcwhugzzs5myl5t25tom7vd78e00vp6k7zfk74px15omf7orc24rz6hcvg76jd2osncw7dqeiyugo0b8ktenv97o300v',
                user: 'ry3n1f1nyelj1o8y4i6pm7pklkvqbh607bcwx7f4qqugui2yt1r7f967v51ove1r3f972oe90kegxpoqf5p9dnll1p8501qjgtw36yvecjxxr77xck24qqwt1spxvnhv8ivuwjbfk38z3jfzfn48ngkfkdvln7f1az0cudnzh4xuocnudtx1j9xdeuca90x0t93a7fihttujm8u1j7wv6wymctuuakkpf0xv4y0jvddho184k0p9rdmywlmleg5',
                startAt: '2021-05-23 00:49:23',
                endAt: '2021-05-22 15:30:35',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailTenantId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailTenantCode property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'aaccfb3e-afcc-4e0c-a5ed-1a2d3066d2dc',
                tenantId: '4d71829b-97d2-4fbd-a0f1-5ea0e33d8e35',
                systemId: '2e2bddf8-ad1d-42dd-b579-67234042b395',
                systemName: 'e938prpeyc6wwqz1q7aq',
                executionId: 'fb527ccb-ef68-4e05-aa70-c62f3676500b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-22 16:47:02',
                executionMonitoringStartAt: '2021-05-23 03:41:25',
                executionMonitoringEndAt: '2021-05-22 16:09:23',
                status: 'ERROR',
                name: '6kcpi84nrrbab0fmslyy4nfchzftdz62qeo9o7nnh2g0cng31lfu9ktxqw8yq4l11wxrfs7sphaa5tm7ize07ld7vcsdvfanorwhfys048yvs4hrwxp9js3qg97cjey4revlxspag235fw8tk148wam570x9wi9uqtr2iememdwegtnbhq42bv6cw3brti9x8hmw6palzf2zhugg5wtdfm5wffzkwulsu8e28ym8kw3kikl9368ve02s5zdye9m',
                returnCode: 7937494294,
                node: 'qd7z4ktk06bvl6922ld17um3bfe607l5og77p3dqsd9qd9btlrenrq5wik6sux6pu9uzsz102u9hxx2vy4ccc18s507pp400aci2b2tuuy7xxxkcsknzmxp9vk8wcqwrlksoyzv4knosrg7vvviw4xac78swxh3p',
                user: 'fbivl69h6h8lgt6litehvxjeid7ukwzgvr6e4hk5eustbsb199lv8s5ge2yqu5iuruag9jz8drbwdg91c75aljbm6g3ggmt17u0k4wvje30dmb8ikl7xm1wh1lpxj8c1bhvs4dodat6nuxvurcewnydddq0lqn5pc2gfifriy1qa4dvcmgaody9t7w2tzift9phcitjrbt21m8tjhq7aodzo1btkywjwllixugr2q570mqd053z25erhke5ysdk',
                startAt: '2021-05-22 20:43:13',
                endAt: '2021-05-23 01:38:46',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailTenantCode must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailSystemId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ddcbafdf-6d66-402a-a197-77d24ae5dc8c',
                tenantId: '83b08d3b-32dc-4c13-bd5d-58743dae0951',
                tenantCode: '95149k8reti65cwmolcdt7oeaqtpwmkfmezionsnowcw0ifjva',
                systemName: 'rmmooswloagcrhtf7oes',
                executionId: 'edeb03bc-ed5f-45d2-9276-ed0649b86fd5',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-22 18:21:10',
                executionMonitoringStartAt: '2021-05-23 03:57:35',
                executionMonitoringEndAt: '2021-05-22 15:16:12',
                status: 'ERROR',
                name: '9erwjhn3ckcfcclwdyrc328a9jtlx6v1f6yiy1rj84nb2ralr4p1seicoa0y0j74k5wmdj4eos0zihoqk5tc8t2m4j93f2u11okc4z7xhtmtvzgddhcf564sam5dhliy1abjtelhznk33kr4p2zrz0rckregxezuel9p6h07k1rwnnsml4auz9f7stpkxkoqbuzj3hs65jmntz2p7kfkb7ec4mgleitc5stxle25c7eq5y7j12m9grws3sw4iwy',
                returnCode: 4964895316,
                node: 'l27uj9e1i9i2aqa3w1tjxs53h6upczew28ku7u8gq5nyp3nxmso9rfy1kkp4ks4zhwrbyln3omyykr53344ez96fect3fo3afhl8sghn29g0ahtfzmh04ixv0b9akfcr1v164ciote1hrf59t3g3sszefdd9bnzl',
                user: 'jfno562itcyiy0rilvbsxtf5qbi2u1259fvtotkq1elq7tb3mz38d8tycufiimhjtw9sbc965e52erdsdajjhlh6z77iuk3pfvbh3o0x5xf5puq201ctwieo5o686cdzzifo3jkb7nb7c60a3aplcuup87clpwq58gvvkqx6k0gxezjle9gc0oac1jvqikig98mchg9v1th02e8y3oddhhvthloy9r1yjonohtgucc3b86jyk9gl45koorry802',
                startAt: '2021-05-22 19:00:23',
                endAt: '2021-05-22 17:49:09',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailSystemName property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '336cf6ef-70e8-4381-8b70-e62c5d09337c',
                tenantId: '3812a81d-d6a8-4728-8774-7dd5e0406686',
                tenantCode: 'h1swko7udosi3ew5y2x68qo562obimqa65grzusdux85d3gvkd',
                systemId: '1fda4292-dc8d-4261-a898-6348ffda6229',
                executionId: '0f6b055c-87fc-4938-a41c-4e4ba1b9bd97',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-22 22:09:13',
                executionMonitoringStartAt: '2021-05-23 03:46:07',
                executionMonitoringEndAt: '2021-05-23 00:29:32',
                status: 'COMPLETED',
                name: '41z6o1obceih7094s1mhkc20w3ewbdls49fliro2ljrq3i32qkow335elh14maxiv3wuel68l9yle8zz879dp48u42fxqmhjg9qrmjo0ezgoqf6xsq99cmu5yz0gntpvvmyj6xjrg6emy0glylebsz1f7lnyxml0ddz7ggvdvpvhhg1cp9k2m0sseuygpoehzzhbu0h6ikjynilkemb8xb193zcedjgoz5c343sf5dly62y5mkd0wtf3krjosxm',
                returnCode: 4962155022,
                node: 'cxnwl0e7nocls75gi8ltcgql4r41jkctusk2jrhdtuipurfo1lvsyr2rd5bgcpji5xb3tv2tzykgrgt05ns1r1n00jct59xa7r3l7c6vk2oe71gi5vps1vktzizshul4t9erwt3haxaontbunrtpkc5eeu9eegc4',
                user: 'f784j1tgkftizf5p5q9vex76ki3maz7x3d7b0iirg87yy36nkmxy0zdmlkjcel6q55ovv55qfqjowwsgitozqbzxkr75n40w79ldf372rjuhdihkq9chncqs315g0bjac2ywtighmfp7y3fj91lfli5yjuyacggk8b3gf0ijpsnal5xkue3x9l1o0j8vto499p9auakqjavzulzcfwyzdldpcimsi11w1i3ovv2bwwrb47s0jjbc3s04h0jyx0d',
                startAt: '2021-05-23 03:34:16',
                endAt: '2021-05-23 03:30:27',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemName must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailExecutionId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '220c0c56-4d55-42ca-856a-b4c2308d9c16',
                tenantId: '409ec378-c39f-4663-9e1a-c8fc8043f414',
                tenantCode: 'aomvth7dauty7kf7srkqibsmakwgerugfc4t4vr6yezgelvs9v',
                systemId: 'f01428b0-b078-48a8-975c-fb5415aa3619',
                systemName: 'mfrsgs97fq1hoor7moop',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 06:30:44',
                executionMonitoringStartAt: '2021-05-23 10:57:15',
                executionMonitoringEndAt: '2021-05-23 12:20:10',
                status: 'CANCELLED',
                name: 'b1gr7sg8bq22ze2m9b3nci0l65om2do4lqzn44gg66swp9a2cyfkm73tu6ut4wdh1zpw4hme6sefigfdh57cb2vyyt3a80bzcqiifci9jsmsk4i5xpnu5to0i9re5ao503z4sp7bbqyz1lpksin7rbome48y6ymy89wwbfwu38vc2fhnp1udp0w4ff3id7lg4l2h46eit07667eeak58sub9yytpdaizwfw5zk1bfvtks08rv5bnfq0l54z166s',
                returnCode: 3829166135,
                node: 'fa7jye9cpobcnm3771mkon3rvagnfl4h504vwplgq31r38u16wc6zalywpfj503q43uenn8dgg78mg1jtaf2c414xpco7nepae8gzc3z9rpjm9pvpgkuwk1r3nsornm6myi6pe0fiu2ed2e21ko0lnmyn74efgyz',
                user: '87bm7v645m7fdkr45v0uly0f5f4yj50f0nik3c3z6g3m5vcz6z4t7dgu086to0o9ykqneqnvo271gxut0ttb768qo7irniebwexgjn5gb94zkyjq02knjvzv1siymmzwz2hw8og15nxr3ghq70vdhch1vjvv8uriwqgotgr5t6j6nhy72vnr6duo18h8zeawf9i43js7akcx3zay6zcp55q1dk9hnnx3aaa1pi1winstarsevznx5glil20oell',
                startAt: '2021-05-22 20:14:11',
                endAt: '2021-05-23 02:30:20',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailExecutionType property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b11dfa74-4838-400a-a26e-dfc4bda542e5',
                tenantId: '366eecdc-1b7d-40be-b6e5-be8be3b4366f',
                tenantCode: 'p8x00drdtm6376rgjp5nxnrgevmmzbv5m4vijummu5xhc4qj1o',
                systemId: '1fcfe639-c34c-4148-8ed2-138348ea1ab8',
                systemName: 'jk3a2ahn6rbn7ncdyhfj',
                executionId: '494a1d65-541d-49f8-823e-25c592717534',
                executionExecutedAt: '2021-05-22 20:00:30',
                executionMonitoringStartAt: '2021-05-22 20:39:36',
                executionMonitoringEndAt: '2021-05-22 20:56:58',
                status: 'COMPLETED',
                name: 'wxiy97saclm70pjdvly2c35ecmug5datmjwg8yv43ffv9l7ogvsq471miemxlr5l5j6mh33lax8jzz5yewx8bbj6sht9wi8v93234zwhcknsitszss6l45vvfhibzryzakoub4zmrn4ddi9xjmq24awzc1xbee1jfn000jnga9q4xv4u5jdca1ob1gu7k4zac9mlibs76mod1vrz6loz0hj66rlmrsu5u1guztq4kdedh55use9f9bze108bfq2',
                returnCode: 6654102142,
                node: '7c584qyc8userv6awgtydlnk1aq92fsvh7dfwreuwr5vuyphy395797t4fjyny9q8plfj9dw6eypcdg833iiwqfi7ejdr442671iu6houmehkir83ke4zx40xobaffa3nngaohdbqgkcjehiuwftwoqev6bnrnkw',
                user: 'nx5kmvn883gosgd2miiduk0c4i6cip95setebpglp60y5nov6jq96zwjps9yyre6uekj7r453jbcqe3q929sv0iwqws163957xxvqu1qt21e3spyelrv4mqgdhn91h8li4hs0ttpyvfm0sby5q5gq10xpysdkre9ai33ryfzch1n7eflhsuzh89dt6c5azpg34jrmlofc8srvbxuuv0y7m2eqi67j5bs4mo7b6lldrvve1ofj2nspex6edzrq1r',
                startAt: '2021-05-22 17:00:32',
                endAt: '2021-05-22 14:45:46',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionType must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailExecutionExecutedAt property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ba87de60-7047-43a8-b82d-2286eb621cb6',
                tenantId: 'eb94eced-fe31-4047-9e8b-c6d396cbfaa3',
                tenantCode: 'wvdq9id5p2eidue373hrzua9mqzal3ltbhn8aaob6w126ps4qf',
                systemId: 'a9731fc5-ef1c-4e84-93a1-82195e69cb0c',
                systemName: 'ds8otien7jqulvrvyoim',
                executionId: 'c391d8fd-e24b-4688-8391-031029223869',
                executionType: 'SUMMARY',
                executionMonitoringStartAt: '2021-05-23 03:57:01',
                executionMonitoringEndAt: '2021-05-23 04:08:23',
                status: 'ERROR',
                name: 'fij9bsaoweyhaxna8sy2iwl0sn93j8kx8harzyvblys1qwy40gai84s2fyogojqf54dw24gvx30yqtiowkgnhc4t2xr4thqcippgfld4q5w9na79clcgc5otk52d0s6osrfeouztnxuxzzawbkbc8zj76e91mr7gfsyoovbhn32oqskjazc75j5p6op714wchoc0zx9vpd1dqicg6jbeyik8odsjprcch3u9lat0vc19ie71jjuvw71l899hlal',
                returnCode: 8819019764,
                node: 't6ig4p109fzvdieloqhfikj660q0xqxes8u4sdjlmk5yx8wx4a3al2i1clpldroxwxre7rvpanjky4far1kkxu6ohw790t0q8vb98161su45xpqb354s5q07krpfj8gea7ihp1c7nouhhusmjai3eka5qer3hzq3',
                user: '60hs1gxl1d4pwvdeenjo93l9xdy6lnxcipmk90fnta4trx5j7c14025xkhrog60pk68leldv8mf7u404xkl94h10z8ojbk941igfdv0dvyguejg1pxjml3yrmg2257sw3ydkzkpl08y1wvror4fhpwpx8tnd2ll46o5dsys8xqxii49p3magv5cgvf3zsgilbnxly6pz4ibzc0s30ok3fkkbghxv33hikg0xf8chko7navafhfj4ne6tw2nars9',
                startAt: '2021-05-23 09:48:04',
                endAt: '2021-05-23 00:01:26',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionExecutedAt must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringStartAt property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0931b74d-530d-44f0-a086-f89021c58fe2',
                tenantId: 'ca4f271e-af1c-4365-8f1c-c21031b2d8d8',
                tenantCode: 'pbc041awaghculjzqxhjjv7h1645wt1y5nnfe8tclaq3asus7h',
                systemId: 'ae5f4713-41a4-4c30-a1e4-0a43ba5a146f',
                systemName: 'jug20yopi9astk64carq',
                executionId: 'c4c25c7f-43c4-41f9-8d08-fa1c09f0b65f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 05:37:19',
                executionMonitoringEndAt: '2021-05-23 14:00:58',
                status: 'CANCELLED',
                name: 'ytjqdfs7vspolcc6f0ljeybyyo7tct9bs42t4yl29ialr0ownpgmbpasxjirz5p69bdfb9qpyxtw6c9je1jq9hgq8gdd9eybmrgsevcqm107h2e5hxetvyl2d2b09udhlp57jpfqvpcxrceh4rxkj1ehzi53cd4jiof35qcisfaa49jrn56doa1psyqyqz40dm7o3uk1mzenrzonnica1ny09gx65k4xjcyf9iat59lo3tyloesbqh7nnp37ks4',
                returnCode: 4264289539,
                node: 'a2yz7p89ubjw3zskmlhorlxvszl104q78p8vyj1onu9lnbk5i055sm5s7g16ui5l3kat8zsl7yyyuovyb32f8vczglmwfq32d2uwha8i42czgbgo11fdv6jaeyxtjgammv76eputa9b3l3o2opfhakng0y5db21h',
                user: 'jotp62yebx67alztjxnlc5r38wcm2bmluwyg01clrjvtvkojsdx6bpzpeqidzu8wzlzzojmuf3n77k6qw69j7r8gtbr7qwgp50l1362rb5gm38xvt1styvla5kygfwc5fswwamcsl1j1fre2g3550rq7zhh5clqg97vcy87s6ne4fj3lge4hzdqi4kifglp0pbx1jlpotdscjkbxeii49vi4n1kj29ldfg9eaf6zhb21t71iomtlfkdowusjl4b',
                startAt: '2021-05-23 04:49:46',
                endAt: '2021-05-23 00:38:41',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringEndAt property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '46f50f35-647c-4046-a568-b217d3b048c8',
                tenantId: '7123e144-d07b-4ca4-aae3-fab4f20a1564',
                tenantCode: '3gd5xib59d2ofz7ebngfhkbv0t904fy9qu03tyzspeyvba9h0s',
                systemId: 'aec91e82-3c71-4751-8a3b-956e6e2765c6',
                systemName: 'ovbplmtckupjfal1aaxu',
                executionId: 'a9dd2214-69f7-4e7a-a808-6f9413da0095',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 12:11:22',
                executionMonitoringStartAt: '2021-05-22 15:06:27',
                status: 'CANCELLED',
                name: 'xqmx4q8vby65vunrmh767herjzptl5kqldheptb68wizt6xbvrhnzfvdr7vwua42eurschwga1wevz5evetnclm2shscoti1fm1gxkv96mlqx9squoj6fcpqhpjhtrn4h0lfh1exf3kbfqlwke3huso4rzg9jw909jt7spyx71e60t4bnk2ihdnyun2kjo7xasxw26tvy7akz25dyr70st1jjhbhaq4phkjn4ln8kx0gpd4a7cv84z3cvzs5w92',
                returnCode: 9082704317,
                node: 'sy98ptamni0brf7uys1fp5eq2a7qnonxt9v3agj3jnqhmogv4u51jtqt9d7akedim55ef6pydzrnlpwox0wks0o02uab9kq46ux6d5z0xw2pxwnz3qc4ispx4loh4uijf2sx2ynmssepnq3pn2syvmbtypz2grew',
                user: 'vy7y9v1anl156o8urbrb6nkpipzpscwyuyb6t2sa2ebtgomoxvqbdbs4exbrlpnlng0smoa7g2y52xhnj05ynd3cbwiyjmtz9goggbdaywn33quvf5k8wt098wxcmfv71sm43xt4lig22zbrlzco037w53xrr5szs4jcffbyl46ltl345el71nycgb2w74jlpjjj1diy9as1z71217nui0ffvaasl4blakg4g6m4mccj5wrzd7c3s7hi2czus55',
                startAt: '2021-05-22 14:20:27',
                endAt: '2021-05-23 13:14:48',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailStatus property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'dea68b3a-d9b3-4465-b343-43e03fa1e483',
                tenantId: '6e886a7f-2c47-4d10-9869-62c1b7e3b5b3',
                tenantCode: 'rg7c5xwpnmi4m1ntyli7v3okhjjk6p1lkv6bokfd9alq52qsmb',
                systemId: '51a76d9e-821d-4dc5-9bc2-574335ce7a8d',
                systemName: '65w20kvssk0vyzmajwmy',
                executionId: '17657ba3-6395-4240-a2c1-f1642f09a4c9',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 10:55:10',
                executionMonitoringStartAt: '2021-05-23 06:42:13',
                executionMonitoringEndAt: '2021-05-23 11:37:48',
                name: 'a6s21panyaot054shcx71if9lqqrzfw8c6aq42e87fvqc5w5lh6k3rrb072rz7ccnohon495mnk3ezcj8qrrxs999bfqdbktkxkg0vmxm6wutha3747tsz8vauubazt26ndwsw6nrqz8t4ojluyhgg52pgwq861o19k8oa0swwislaz01ghi61apxtsev48uxmtr2ytv0dznoryst470dsl2lwtwkq5j9xutovl7wkc28kt5i24ag3lsgvb3ewy',
                returnCode: 2094970926,
                node: 'tfxmijn71vikz9tga4u6zmchck8fknhpz87fi7qiuj9slbt5k7zgzejeitlkynaiqglnwfjjvs00zg1jnczksdxtgfqyd1qshubcjayp3skdvgfzvai7e7r4padfhc8cs9nsc8d0n1iufqhqpyqwebrjl4gmvjrg',
                user: '26nlr2hifdraa2k8uiy3ctw16xbnjmaqzsljpyhmprsg56jspvbbqgqowz8xczdy3p4q9httoylc4o59x9064fyrt8yyz96lek4xox8gk2k6pr0max2f7h1vggoe1v7h4igsmxfxkgg01kv8km8unycg75q2j2imb9rjeidaz77i307lap7bjo3ffb6k16odji81mue2rq3vvt7zzedv5fkwb6vxse2uu5j42i30441hf3cqb4u7ea59xew5reb',
                startAt: '2021-05-22 19:29:52',
                endAt: '2021-05-23 00:03:02',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailStatus must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailStartAt property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '01729e70-ac7e-44e5-992f-784957090f4a',
                tenantId: '8a9dfacf-ff0c-486a-b515-a8f2bfa07d44',
                tenantCode: 'yfadgjy2bkc9smzch47xjangkkl9zny9xq6ddbpk2rh5tm4wuu',
                systemId: 'd369d1b9-1e5e-46c8-90bd-6d3db76d3e78',
                systemName: '1pj4ztmvx182pi75omxh',
                executionId: '4b4689c9-6e50-4839-988a-92c75947ec11',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 13:51:11',
                executionMonitoringStartAt: '2021-05-23 08:29:37',
                executionMonitoringEndAt: '2021-05-23 08:16:34',
                status: 'ERROR',
                name: '81e4h3zhsvdtmixc5fd0e9cghng9r043tmq5m1qd3l1xfkbs9gatgffrt8sjme8z3qf2v20cx49crwv5xhvk73whazz6b78axtfk24utasb7ywu4qtudzaof74al1dgsukwoz2ikx2ksku6qiwox36y45jcqqv8fh7wdxgb643arvm1zgp7lwfe85kfb832pa8fkd3e3x8o4v4f2n3azx71hlzx1gl9u78wkn26naf0rbjnmss9h462vv5nz0wa',
                returnCode: 5284323305,
                node: '43n28vd8fxxieqt8kbdx7smmqq2y9pf5br2spq6ujobbxbgucvu6un1p9tmuhm57ddsi69ozk8f411rercw9enak22cwssydchlc8090jas22c5jnjz39p51fp1uaivsxrmi3yidpbo80y7ufbxsnx73mbgisg26',
                user: '7l7hkpdy0tku7p14lz8vcmobmiq80orc936x5fh5vufwoko41kqps0k97xudr3rvuezxbslt9pbgskpkz4bjnb7jgbxf0o5ca596xm14src2f9tdp8pfy1n2ge2u12le4feh4j465fjmvbvgyquxm1h9zalpr7ybq60f3mo6cxtkvn6iwzc9svayfl3zxz7831n9zqkoqxsa2j9oxtoyn2joy9d1nkba87zecaxfk1pxn9ww9a0dfrcekg4bxiy',
                endAt: '2021-05-23 09:40:35',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailStartAt must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailEndAt property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '129baab8-f9bc-4f89-a276-64cfcc6d119a',
                tenantId: '8cccda01-088e-4103-b456-fc4e760259fd',
                tenantCode: 'kvcm3ik5gltxepylzsi5aol7sdfuy21z35h3j4c4b5m558qrjt',
                systemId: 'b1ac7689-0900-4306-b0a5-6a25a611b069',
                systemName: '1cltuwiqpkal4a5tdmm4',
                executionId: '56a8a3cb-5454-428b-a23e-68f9407e1d0d',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 03:49:26',
                executionMonitoringStartAt: '2021-05-23 09:18:16',
                executionMonitoringEndAt: '2021-05-22 20:16:37',
                status: 'CANCELLED',
                name: 'n9lqomnz2vjnmmz1qhsrjlrfhvh1e39qbsv22tz0gszhy7lw4iaunklev029ptzwlmip308vsouueimbh2b3i0e6kva9ri22n78p1mw42anokr1vmhruke407ofb2jnstlh9cgfyevrwaertasbov7hdjdvt7m26ifqtbwyu9hbgo1jmcruj3oomp5k1fd5vwvrh3sm879x3frmtwga9hkv2cix7k71ki2zp0gopsi47gpsvpop0zgfomage8b1',
                returnCode: 7140552705,
                node: '78sp9dibrrk7ovbi62z2yopf26sc6bnwbt7lodm1vwji2zydrvqxk7e6no2mkniv76t7iluecn1t7ce7g6w5qr70gy70mhb8xkw3hwyyiaj35q1sovii0910vaqcvvcrhvhieu2shkwpxioytw4vwxjmawj9fnho',
                user: 'orc1y4z4u5ao2kr25as2nl63hrlc8c5vun5rovaxyd347455st7wzvhbywapsw39cld3jn1o2se3o0utx09777fj2z0lpi3jhjwevxjvqw6a5xzhy0wz9dv66u4yl9udn3ek00w51w7tkpyn7k8jpempejarvy3g9ayu4jukf76b3521ozdlvfp1s48kpu51ryje3hcergdqzqlbxoq4so1f3tzgjoqkvstnx8c8n2fj1p738gc7ldesqhyeezi',
                startAt: '2021-05-22 18:25:30',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailEndAt must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e28rqhqelg395ztwzhgkoz4wa5x3s9l7x2utv',
                tenantId: '130e5497-8dec-4b0d-af79-79b337cbcb17',
                tenantCode: 'ma3a3sr0lsmrtm6ha6hp20sxmjpnnsn0b2x8rgyskklx4tot76',
                systemId: 'ea6f1bc1-20e4-4b6c-9477-dde5b8eeac72',
                systemName: '7db8bk6mpmzecjmh0iy0',
                executionId: 'fa6a99e0-125d-4c27-ae8d-bfb714e1ad4c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-22 23:33:45',
                executionMonitoringStartAt: '2021-05-22 20:57:44',
                executionMonitoringEndAt: '2021-05-23 03:49:52',
                status: 'ERROR',
                name: 'kvyge3v81o0isljba24x0ijhwhqnacoyfs2ypqkzlvjvw7tywbwnmfsr0xy8px3zmy64limepgt2hyn4zi89m9v0ac85y1hbspg9fo2jpoqkk80883gx4hnmkd8cgooizy9o6g85m90zz5hpn2guvmpy9whia90mifo3wsz73ik9sg0y7rbhvzm7eshg66bulnpq4j4kxrsvb8i57ajty7dh8krne9wte4amaocur3tbptpr1leo4xhgejrv3xi',
                returnCode: 1786441207,
                node: '7vw3v2ec8e4f4j39auyar3v2bhdubxfiwm1smdwrhxw8lwxg946kg3d0u63q0hg4c04hle4hqmvev6bl6om26tecqffqepu6sdh84ninlr0zv2pc9q6g040rvh10uki3ska6270gi0lax3tuvs6o3r7fwwrpyg6b',
                user: 'd43aipdyopk39qhwvnu79b1zi15n4pj8vyzdv6w2b0lpamh0660b3o1aifrgx2np9c8qkxibt75vvqe2ka70n8n66ql1i2pcrw8jywdb56k4ogppym8eb5vecpla8eino4j6egnqnq6igmibnjxuy5bxpz5xmfe02gyc3fepex01ax9wqnc39k3fs4x8wybrdm6tos584b27ofvk9495blpf9tepaqo6y7ld0jiu4ub2hu1gmywgsdl9git2yfp',
                startAt: '2021-05-23 06:50:33',
                endAt: '2021-05-22 21:59:47',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailTenantId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ec9e53a0-41ad-44db-988b-95b86fb02955',
                tenantId: 't5q7rlfawk8vplishs1g48pmowfwlchgcje8e',
                tenantCode: '7nnj984w4wrtaa71r3yu5r8mr2mfujqs79eesudwdss6oz4hj8',
                systemId: 'a9046093-010f-4cc2-a7db-4d85e939cf0e',
                systemName: 'ij03vnozwcbctwpb5pva',
                executionId: 'a50d4c44-9a26-4aef-bbbe-33380b665f9f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 06:58:41',
                executionMonitoringStartAt: '2021-05-23 12:05:35',
                executionMonitoringEndAt: '2021-05-23 04:46:44',
                status: 'COMPLETED',
                name: 'o8wqurfi69nmg1p91djltzboaxob5b9cy2zy3jtj2oflfc31oxymiknaadlbfxkyb1432i3tzt1tb0sgayysiazfd3lj1yj197nv8uaawp1rrvxioev8qmx6ln42lc8yf26zdmcdbmdq8p94h4x0ofm51orkqub40njnlv3aswj7clzd7vajjj9z0wosswxqxn7vsm0nc6cp434woq22uwaw0gf87glklymnysh265cfcr1l7x5dhdke1b3c86g',
                returnCode: 9301928005,
                node: 'bjz6zba2cwvf6mtiew09ri764uesk9o3wiini94edsoy3rustei5euzjct52sz5ainro6bbbj5rhmfl8b7zi7w7ahg5ws4oz43q9tj61tuaov4u40le3yv8i9qz5lk18pp4x6yvusvsvwz98vp80gm8rj93d8qz2',
                user: 'mlvklhfxkwrpirqfmmiytzcvf5hy3z6u2z44cjsktzizt4nu9tnhf9pbj9rf7uxznwcgwyvzpmq65geiyonhkhqjy3r837lu4z31j9tygn79ipfnp01eqb97sna9kbrybqmj24rxpphi4az95rq9kw5y9w98bcoc7wgk7ksggv37tonx5cg7hnbuafttop29e1f3k145df9ewy9r6fqau538od5nx6inms1duc3m2z2g0nr40krunzdp65wjreo',
                startAt: '2021-05-22 22:46:08',
                endAt: '2021-05-23 06:53:34',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailTenantId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailSystemId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'c6344b2d-236f-4d1b-b6f6-e90b84ff4fa7',
                tenantId: 'b46777d1-ba15-441f-97fb-fe08304bc622',
                tenantCode: 'bncdz4i95o11azylkf2o7alm88gzbviyt3b6oq7uk5zoj8xm67',
                systemId: 'xhevhi7ra9ejef5i2iscycy3mob3zkeyu74hp',
                systemName: 'pdyieshniep1lhvr6ei4',
                executionId: 'fcb0fe2f-54fc-4f76-ad0c-7292ef1c12c3',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-22 15:23:57',
                executionMonitoringStartAt: '2021-05-22 18:38:22',
                executionMonitoringEndAt: '2021-05-23 07:57:25',
                status: 'ERROR',
                name: 'q101dibyh9yt4tngn3e8wdgty7565nssigvjt41qej1b3ic9g6hajtpjptxy0wat15l717yq50fkomxsno2ydslil33xmz3gzaspn9n0yt8lju6leni36m1zar36vzn8xp48qedole2ebarqwm62a96lz3n1486mmmp32oeuh11ndb1lhlcpi7phuaz3luutvjraxbizoasac5ypg41kxnnbrqrh7lznjzdkszkx8xce4yot1zn5vfw94ovn9h3',
                returnCode: 7241280596,
                node: 'yhz68wumfr6su1kkdl2xxgtv48ub625wbk5darelecpq7ccf787gxkdwxmlmd3wl3jnzupy07ev2o8uncir9lks70zlmkkyvxqtf4y6mjr9e8hcv51xxphhh7ujbwqgwny4yne976kbeq6eailgbtg98spdarzpm',
                user: '64mtee93nz4hhbqhile6u7k5phlryj1x710l7zew5c5yexs5ywhw7qeg3fzhjp3ivi4s0hxh7i0qpul5q5wtfo51esa76am2u0ah7ahi3ukvz7hetw4ak74gnuvxkjbvst3oxgkiimv58oglyfns8x9mh7wdmgnfm5rcfl0ms4w2r3mr3u5f1ogf9qlgj97wa4qctmcbrs621j9giareqxq5lp04bz1hqetn81cqfi6nbvcxxrvuszkxop6qj96',
                startAt: '2021-05-23 10:26:27',
                endAt: '2021-05-22 23:24:51',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailExecutionId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '44c5237f-1067-4996-a876-4d72a43fa365',
                tenantId: '95604119-991a-4e89-8370-d9a09a794cd1',
                tenantCode: '71z39cwf6x7nr4s5dgrvtn8wlnqqz5l84ibxrbxwvrr8o8xd5e',
                systemId: '180fd31c-b843-442a-b001-e60425c9521f',
                systemName: 'i17hihqqd4k60fwjkn6d',
                executionId: 'cptpu3tw4h05n8nykwy63eck0jrcl521c5q0v',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-22 23:47:42',
                executionMonitoringStartAt: '2021-05-22 21:44:44',
                executionMonitoringEndAt: '2021-05-22 18:32:32',
                status: 'CANCELLED',
                name: 'h548obprghxrnn25ve67hxxu0ec64a2nwda7syynuq5sne60n5u79oyoubjbx54ykrf90hfqxws47mxy1t1xmws6k9l9t8yok8m9bwbaae1kqw6ck6zi4aszsu041lrq569l6x5aq9nwf7o4vi65hoynh4va6jhmw3gbxvv3eyt0sbb7wyqw71807r15559yozq2w6d3nei1jrv4ls7yb0hamw7jjcc2v9bccwni1om760opztoqvgm11qyfbku',
                returnCode: 9279790992,
                node: '10hzjap5vy2aihf5lmcuuc2ckvr36cac9j5an9lafv5syap7j0kiddf8wkm0rierkolnbpf9w7syqr2earst7yz202hgxzaollzjvl6b5hqfrwv13q4l1i2lpb1iv67b70ailbyxfcbeacxf8dvz5kg3ihyhv6gq',
                user: 'm71tm5j9s2e5w0elnjbj0scv7j887ifhr94jcvaucvuyp9vu8av96zi3yb355gp60ieufpmg4edx1i5cekbxg0l35ybbzw870sgw12yo7aqfqtljnjf4m2zmbi8pn60yum1k58rwuoo8eioaprwkcvbnydmqi4svigqnzl0k74m01u09xhm2yykn53iuevm7bryhb1emmwxxuhi9e0yfren3evqlsosi8u3tqumsrmn4eouwfano6y6cxfs210n',
                startAt: '2021-05-22 17:50:23',
                endAt: '2021-05-22 16:47:05',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailTenantCode is too large, has a maximum length of 50`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '2e37ee52-ebf6-432a-8a08-2d3b82ea4950',
                tenantId: 'd5e29fd7-e6c8-4f00-a53b-b6c1035d6cda',
                tenantCode: 'q8y0zazi3arvwyefv4zosvupkmwwbt2bat120omj4wdvs89e8un',
                systemId: 'c478d67c-42be-4cb7-b2f6-cbcf7860b579',
                systemName: 'tupchylvda1cc2eo6kh7',
                executionId: '8c5133fd-94e0-49e7-8e69-c301a6f11d8f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-22 20:12:27',
                executionMonitoringStartAt: '2021-05-23 13:47:54',
                executionMonitoringEndAt: '2021-05-23 07:16:51',
                status: 'ERROR',
                name: 'ntucjnn0ch3xznyyf2k0hik4cfmumxxj50a1udjbik2z6sdzlmnzd1oroea9uz68wuredy46w5qeg2sxs79umt43o60ok001l4appaa6tlhd1eworhf1n4z4qwwgo7e1vsbpgstbefuabfhg7qa8us3w9pywz2558es8u9xc4eo6n39n8s1pua1q44yryw9sefkk9u5lrnlgo6itmsl8ov2x2oo6xyo2j3kucs2jhyfi9eio6k5hb89c5pgosep',
                returnCode: 6933732017,
                node: 'n4y50erylwguqp9nacxzraqz2rur8x9uzpq6lpkjwhr7pso0c7w76p52plrmtdryus885pq00o6pg3fynrfzqfx3jisnmgztcj72kbtftdkvvv85wmgcp5mytlq7r7jtzfzqlcd7ak2scvbvbk06bp8wzhjadjam',
                user: 'igo4l1jxc5fm688mhr0dnsla8vlirqcco0gijuybnv99kofxwkhk9z5evkcamv4il5yit3rzhwec6gdysol2pd4m2ikshkf5htcr3b35xgnxwv23e5qimv919nog48yxj9o4uyah4mi7n9ia6d2l5mfst5o5101scxgfdbr9vd3y9q2vhnejoy8nkhzs5l6lb3fzpvfzl6ogungseg090bmhsg85q91d296axetnmu4g6jfzcid0ko58hcm2s14',
                startAt: '2021-05-23 03:02:52',
                endAt: '2021-05-23 09:53:40',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailTenantCode is too large, has a maximum length of 50');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailSystemName is too large, has a maximum length of 20`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '495b066a-d6d9-4853-8a6c-464784335c88',
                tenantId: 'd6da3da1-97c2-4924-a520-9a49bb8e2e65',
                tenantCode: '5hyr6ylqwaguiox9ov7mff0m6dr06v1z3h7y9t1pk358j1ddyo',
                systemId: '57f42cac-5cdc-49c7-ac2e-a5fe3f640e67',
                systemName: 'z2v4yd3cvwahtvwzl942x',
                executionId: '3e8f1976-3c95-46ec-b9fd-8df68d9be5ca',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 00:07:39',
                executionMonitoringStartAt: '2021-05-22 15:46:32',
                executionMonitoringEndAt: '2021-05-22 21:51:03',
                status: 'ERROR',
                name: 'chlr2q7zdv0gljlb9om0361m62s9rvmszozspoupc067yyhgq41ts7r8yb7nsslmm2vfgzxl9mb2rq3qb3m8wrkm07302bjq32f5q7savux23i18rykuau9ssbf39xzievnmainumugp3ebamnm28bcyykwx13bfmu5bh31ufnzyksxsuaufmfav2j78528hxcbaxb92ynon6s5bhvischlewy0lpxdfdnnym43ae8n914b5s8h0xsgrcr94m32',
                returnCode: 3004331429,
                node: 'azkx3qngesn3zxuq3yda9q5f9nyfgmqfpanqlvt1w1qsmbmjsgnltu8x9nq225zuxezlz43iqsnh6q6532uvqry8hv1y2kkn0o612hm1wsrg5to9ihohkoj3iu8cxto76h68imhq0c7km3g0s7u5rj7bqy6l1n6a',
                user: 'as5nmnlsb1lwl5ie3foe61x33htdqevylkde1qxh1w6aj7mqinib4pthnsmzbwcb6srlct81u8lyyo1c7cmwa8k1cfdezod342zelvx9u3x7tou6woepm94uf1smhb86v6teqpkjfrnvpy7l3j0e4u757arjkczum16kit3n0jn5texft1f3mbebm2virbd9a7rzydkcvo0qmw3m1ewkyps8pgnl4101g8472mq4twnwsr8ynbosisereo07xs4',
                startAt: '2021-05-22 18:41:03',
                endAt: '2021-05-23 12:00:56',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemName is too large, has a maximum length of 20');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailName is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '6fbf0e86-809e-4300-96f4-0df74a7d3831',
                tenantId: 'c0ff19bc-3e5b-48a5-b37d-bccad3dd33de',
                tenantCode: 'ussy3296bwivhp8ds6dx1d23l49d6gcarhbacf43f7nkmvarqb',
                systemId: 'e35e24e2-460f-496e-a6dd-c027f233f6ff',
                systemName: 'n44svkb3cilrxykjiw68',
                executionId: '22c3de95-6ebe-48e0-9eea-702b0a78aede',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 01:22:51',
                executionMonitoringStartAt: '2021-05-22 18:24:12',
                executionMonitoringEndAt: '2021-05-23 09:38:36',
                status: 'ERROR',
                name: '8tfm9h66d6o6xk5d1xp4bm76byhc57d5sfm4od0739nx7r0zutrqmuo0d8ld14vgukm9oj2xshwo8gde4fn9oew43fo4gqz314e30qiuhoi8hhck6b2fomczzwj3fxtskklamirf1972akl10w1sxsoz6nb2g2zhxsufhlk6kmp8tz8awmo8577zts0f4hzmkum2wzf4d62l5rcdnhg3a1klpc7tdr80wd69khxatnbxbwttbft0xjmtwv16ve3v',
                returnCode: 2846422643,
                node: 'xp9dy3euhekzxkpexeqd8bws07nyxde7cbwqmx2mf114athm853ma1m7lvwvq25oye8ix73v1at6z2b4ndhwsuz5yjd39sb3fehd197pq60vuxq93bruod5263q8ebr6ca1n6v2typuy4ijw79tazphlxxk4b6ub',
                user: '9qn2mcvnweym9kacqnwsvlz6pay441yhn4463xk5ikoxqzmfl90tt3502oo881teic4lqu19emjqmt4a5n0o98tq1t2j7e6exhv053nkkrgr39lozx141q0k3rdosyy0s945ecrl2nfjj84g7g9j6bzxl8tr3tmoi7hpjcujwiw7yfb2kfgots2vf2ddiz1scgg8npuok0gvvjj29etaee0qeynmw3m9zruh042qfli21zmcg569kjncs0gkdmo',
                startAt: '2021-05-22 22:46:58',
                endAt: '2021-05-23 10:11:32',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailName is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailReturnCode is too large, has a maximum length of 10`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1ead963c-2c79-4eba-ae7b-bc0a1862f02f',
                tenantId: 'f680fe22-2118-4732-97b4-514967b2e138',
                tenantCode: '9xox8ra4u8b55luvsjy6mr6gvboimc6z292589dz7via9c3do6',
                systemId: '81c20b51-8cd9-4ae2-91e0-c65334d98652',
                systemName: '42sbfqv38apgor05fo1v',
                executionId: 'd77861f4-2bcb-454a-a2fa-b6098b052bd8',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-22 18:41:48',
                executionMonitoringStartAt: '2021-05-23 10:38:52',
                executionMonitoringEndAt: '2021-05-23 06:23:05',
                status: 'COMPLETED',
                name: 'npap4t3oazl9m9503s1e8f6751x5662jbq0w4wsdkaonsm2lm6fi8ce011koprmpd02hn6p4e3n3vz9qrymb3s8frvdusr7u8thbcq01uodty7x2lnehzlismb3vwoh4ff9872elridmlorjod2h51rhuroglz5nhx24341mn4txc4mx0jwn0u3g10z8oc7dxwc9zl19z3w2r3pxsuoeooik2s1pb5gxesc3xxtnyiht065vdgcgn5mt02mirpk',
                returnCode: 85194474010,
                node: '4jydtasx4s0y1ifi3qz4brawt9tncvstt4pc88db0bwjwposhll3v2lmvpb5xh8klki6jr2fbzubsklkh4bdzr5ouuimedz7gphbkm6lkydezkud4hpjut3dw1ly0od6ti7t927ehyr5nrnnvmgwopek1fki86j4',
                user: 'baxsjqee9joiet0z1j4z3624r2n4gii6ygd6o7vpv9uoujuyf04syf3nusprcmpand4kqj6gxdllf81ryhxddjrxr1hnx5shwxd3ucg7icaft2ewn4a122ccalmwbxjqj9vj6tlwzmx6jtl639ma58en7oph0tkx3gdkayo7fiho2k2df36ut7lpkahq2ok4ps7k3ha8sslwsmbal6q5xqk6l0bjuyfvoxnneify8f0ut2ov6zmwc4uzyvs1pq1',
                startAt: '2021-05-23 04:53:50',
                endAt: '2021-05-23 01:41:14',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailReturnCode is too large, has a maximum length of 10');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailNode is too large, has a maximum length of 160`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '3860ea28-1e71-428f-9ef9-f537c6163838',
                tenantId: 'befc61c6-27ff-44ed-a46c-1aa28aafde60',
                tenantCode: 'uy0kl6o1n0x4crckfg32zdotm0d5amy1n2i4ke1axdr042be6x',
                systemId: '2ad6716f-dd94-49b3-9775-f16304a328fb',
                systemName: 'pqsrp1qjxu27sehvxdcx',
                executionId: '986ba531-f85c-4ddc-b1e7-50721b5d3c2f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-22 18:21:18',
                executionMonitoringStartAt: '2021-05-23 04:00:37',
                executionMonitoringEndAt: '2021-05-23 02:21:08',
                status: 'CANCELLED',
                name: '42dbdktq47o59x2t6why9b007smnn9ytv2la0yt56bx9sdauiagcxszvezg44jgdi0wm4gnzus5p6ida1sxhpxxpf0k8qjzynpdcee93rodebhvsyi0acqx5w9z9bqbmzwkjwbnkgqg9fakq6tx8816c54zg0taqhmofsjns4opswpb5ogpk9yzelgn4jwgzunvmufadmpm3090xsjqfipger0jdostmu9udy75x062exkx6le376leagenmqgz',
                returnCode: 5508801962,
                node: 'zl6xaqv5rrz3t7m6ngzf71uoldc7o6z2gj9vdzhwr9jtrx62ai34fyzsswlh5wbmzikfkrfr9273y2vipbc7q2syl00oeafga7pqby7r9oar91ibifoxoo806728uougnwkw9jvpnx1g7qe9qu1j0ixqpewn3wqg0',
                user: 'dw4lfa8oernao71qa99gwh3sravantauu4mac812wp59j1h2iu8wzb1sz5cbfw1into2cmx7fk7i3rfrk3swwkn1qpflhaz2ipwwat3gvbhxkrikvbfxbh53kqjo2188onoee3cpw5bmuvg149i6hrk7r7zx1licp3l91gmcxe03fmuoga7ymqb07sqx4wu22lw8zz1v6t5g3sme09o5e26rsxsco5vtcpy0uuzxsd373rfwe0oaslc7pkyzzo0',
                startAt: '2021-05-23 03:35:26',
                endAt: '2021-05-23 12:58:45',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailNode is too large, has a maximum length of 160');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailUser is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e9c915b3-76a2-446d-b045-90d742a9fa2b',
                tenantId: '780c9905-da9b-4c02-8ed9-c92c278f5389',
                tenantCode: '1xxsl5qoykuclbe7wxqa0cwv5qt8s08m3ve0azjo5kjyauanbh',
                systemId: '4caf8b9a-7c9f-40e0-9b52-a0dac27f5742',
                systemName: 'lpcnvgsrky1bd3hpmds3',
                executionId: '46f81a0b-bde9-491f-aff4-79bb9c4806e3',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 05:05:03',
                executionMonitoringStartAt: '2021-05-23 12:20:41',
                executionMonitoringEndAt: '2021-05-22 17:49:49',
                status: 'CANCELLED',
                name: 'bajnwftchzmtl9la568qy7zn3afhdwb9jzew5su1nhf0iqzkugf8wtuyd04tda1e4hr54h2wcg31826snzq8aj0csrurgziopk66vxywnuvh4hx0zj2wgbd6s9xpi88cx8ab8t6amj0ub7veby4o7sc59jwxkr8igbcq2e0fc405xwff3e6gexxkzhlzkq3cdl0jcamgtcgxly8z3sfouxer1hsgdcyjfxma64gtclx21skwz5udtyz458mqtn8',
                returnCode: 8258601986,
                node: 'qr31erk586gq0anoutk429xafwqfv5lu59sxj13p2gj4shcy43ur3l4j2rd3eivmgkfsfkjgzrblr8q1yqrjs3cro1j5jp1a5dse9l4nj8e6g30slf11ypsjr6nah1c83izujjj3eme8iqge7lpbt61tegsvurak',
                user: 'ifn1eykv0n8jnqpgexjwyoxq88s8p58r3a2y5pxb2g5sntin14szqk1o9e04jfc7zt37tk1928ywpphaxbqpf4709b1ca9z339ood90z8ohkobeodrebvmq88jwoviuno8jgate6yqanypwh43kqt50tbne0ln5u95r7jn8ixlxmyjq9ezjazjy7vje78dx1zwjbia5cyj6jztu7uyyxkgruymcak5ajbc10o0x6p6f82ga4hg49kembe6e4bgf9',
                startAt: '2021-05-23 11:22:28',
                endAt: '2021-05-22 18:46:51',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailUser is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailReturnCode has to be a integer value`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b68205b9-7473-4804-baf1-ab82bef8daab',
                tenantId: 'dedbe7ce-1586-4043-9435-41883f029147',
                tenantCode: 'k8xe0tz25k0fe44mw62wgoiao0v2x9yy1359wgrvltqc5ymkme',
                systemId: 'b0912226-322f-414a-ae4d-4dc238c88986',
                systemName: 'il7kp5t6x2lhadpstgai',
                executionId: '22be8a16-373e-4056-8e1c-ce2cd29fd915',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-22 20:47:24',
                executionMonitoringStartAt: '2021-05-22 18:06:43',
                executionMonitoringEndAt: '2021-05-22 15:41:44',
                status: 'ERROR',
                name: 'sslyd774ptmxvpv1oy1m00jc1adissuxfwr0v8ttclfhwlntfoc8lfwt9b28mon9utqr1zdjmfkopv1rl8dbippshq5cud49yha0uk8uuus9xg8dwpfyl464prv95bu4i8wf3pih59laz639d17ndwftvjitd8a3f7a5fz7jotfszxzrmfxm93km1f9tlcuyefg3wd4w6sbz0u36gaots356jly7rmqyzxiuas0ysoi1fsxifzpu1fn8p71sgyp',
                returnCode: 100.10,
                node: 'mpt39yfyk0hlx6l0ez2my4sorxt41gy45je0q5k7wt7w6xj2u6i2oovegiqbt6cipo35fba5n93wi96xt7ykygurf4rn2bvbufz5s1katp8gz371e13tqf2so3jddt85lkvxsn5milq8wsfozhy7z86qzy54m4b4',
                user: 'vejnd8cpb50quhvxmyryyz9d9dolmnyv7e4r0m1xw7lw3g5ydx6ojwoq59p1cn249f6a42qi1h502bqblblcqumf0g6akvgzobcaerf9iha5v29i31ra8xzlob6tfibgatyoledrymfniepm2v76jhq6fqxyr135e41egeh5v0z3qzq9ztbcnow7m679gd2j5f3t22zst4qlnyzjbn8hkptheqkuyiipybmftcrfy2kjz5oprf94ujmz51oapuw',
                startAt: '2021-05-22 19:06:22',
                endAt: '2021-05-23 12:43:54',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailReturnCode has to be a integer value');
            });
    });
    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailExecutionType has to be a enum option of SUMMARY, DETAIL`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '6f92b1f6-846a-48dd-80f9-4f8d5e89e5d8',
                tenantId: '0894530f-b5aa-42cd-ada7-4c922ecb2695',
                tenantCode: '7u33b94l24vvr6uomi8n1qaoj9bwhtxvywcc1aflly34eb3cyk',
                systemId: '7ee1ee33-ba9a-4c33-9dfa-92190d2fbc9f',
                systemName: 'uk3pbtrqt7sjx46d72py',
                executionId: '223f965d-ccce-465e-8402-d8304ec0fdb2',
                executionType: 'XXXX',
                executionExecutedAt: '2021-05-22 18:37:27',
                executionMonitoringStartAt: '2021-05-22 21:13:20',
                executionMonitoringEndAt: '2021-05-23 07:44:53',
                status: 'CANCELLED',
                name: 'ks50ywgq5be44tjf0gs99d90krt8b7j8gvbruxljncjolr08f6ha2b64t5yoa4ga3345keiky2d0ib2y6u6phhprus09x3vxe4hifdesezimnjicamw9j5x5r1ckg9di54c89nldh0xadv3awy47zjlckp3xynvg2k7jxlkr8dvcuqv6t1uooyhezuprgszhxy9jaqaszrwzzvm0z15evmkk8ofhkl7o37l7pvbr0mr926qqj6qttso8hfftyon',
                returnCode: 4314512018,
                node: '95s53tjlistmgp4n4kf9p1xblmuh3ezhko9tahtw7mi7ucu327dn13sydjfjpafwsyh13xydj9tuh7bgm65woc59vlwtgez94t0n2qq4vkjhude58lvkew4s5yymur6g5mezc3slx4x1qbkjlcw2892hyniop35f',
                user: '87obfdtk3n1mebeodsaymw1ogkxfbvnqhkorlgocz61qt2h224k77dd0jveq3khh46rvvt3e1pywgc8n8xxut448f19d8k31nub9udjni4rsastjrs0i0rvkt2hlakrbzn8el41omhauyjreh0xvbvegm5fsoopjpurlurk04tfii1v9dpuhn9nnwnrsiya1aysbg8t8dqxew2r7bj5c7o9jomuhzzcxnwzuc15mscmhw4q8vfuo0ax6b6j13qe',
                startAt: '2021-05-23 01:29:39',
                endAt: '2021-05-22 15:52:17',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailStatus has to be a enum option of CANCELLED, COMPLETED, ERROR`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fd89a983-1719-44d5-bb9d-ea4a96e814ce',
                tenantId: 'bcddf798-0e5a-4414-8d35-f48aac7d6687',
                tenantCode: 'j4cdztdto1y4oodjid1v4k019kicuda64fe05w0u2fxbybhfrh',
                systemId: '91a5711d-da54-46b7-b87b-5ee6ba5c9f7a',
                systemName: 'cnut124t415tew37g3fw',
                executionId: '3525a433-5f3a-4411-b974-7b4857e42028',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-22 18:31:05',
                executionMonitoringStartAt: '2021-05-23 03:28:02',
                executionMonitoringEndAt: '2021-05-23 13:46:13',
                status: 'XXXX',
                name: '7shzutrnlz49w8z62godhvjabu0ldxoqcze52hdm9hkdezgect4k7hnznt2v31byhbyzscex7ghntiwwyrb90ue2orhl66nn92u6h3bes09o6iyblp4ljujkotr1yr9jsnmxcm9e8j1bcnz8nmj8wiycprl0ar4zauy5y3mxhuao2mojzgq5e4j9aqvkomue16mb0szmel8e5o93nxke4iw29bs81sd5poffzagvrutgbhtu0m5soc6rb0rt3m0',
                returnCode: 8400385035,
                node: 'eyn9ruyqvvsp5bs38bbaqtcjzqf8o8o5rofran5f8ui95vmh1u1syzgoqwq9zgregg7mfcvo9qccw887ciekqnuynxj4mechuaeq6un8yuoweopevrmbqd7t9qve402ufqqucg4z7v5js9pa8yd3ndgafdlqzcbd',
                user: 'g0boen6skpgk0apb1wbe1vagy61rvr78n2u3xes9lwrmr8j45tdmc1pu11c62zzt99zzlvopmo7ddcqz6sndljdpkg5p5ksr8b678lxtmot4wnbnt7eugf2qvuf374z9s2fgh3ev6zrm9g30lbljqgijhgmibe7xr6yc0lejjj8cfmqigt5iqp8vw8hh813tzyrfv3wxuh273m5gujoytoh0zt6hdsxrd6tvb7a3x0onmbck73848b96nase5hr',
                startAt: '2021-05-23 04:07:09',
                endAt: '2021-05-22 16:41:00',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailStatus has to be any of this options: CANCELLED, COMPLETED, ERROR');
            });
    });
    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailExecutionExecutedAt has to be a timestamp value`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0f2a74d1-8100-44cf-9d42-aaca36d340e9',
                tenantId: '47ab1fac-6fbb-4604-9516-bb8fcae90d64',
                tenantCode: 'lx9l33y7w4ngvxxf1vhj8snqg80lz2x5j7q7sjh52tntpcs065',
                systemId: '2c140fda-8b20-402a-addf-1c124fd47e19',
                systemName: 'uqmhl1r8j1g4cbujex2o',
                executionId: 'e875993c-7a95-4861-b92f-07e4fddca3ed',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2021-05-22 15:25:14',
                executionMonitoringEndAt: '2021-05-22 15:52:17',
                status: 'ERROR',
                name: '70378e62n95uwpzkb11ls7sq29prjf1sbqd743dpfec5rfvvw255f74edoz894ugi9dkabbgrs9mogvoc3f71ljh0wfg72hde5w9vrsadq7k6im3twl5ryqwvaer24ncujq5bgdj6gqnjtmygdue2mzq699odq5x3zocz59szw8qt923rmij399k7owm2zylu89ra0ekw6n5qiph3622rmtuze3bks5jwzm3avku9g9exslar07o8mhfgjkus3c',
                returnCode: 7288438143,
                node: '71yn3o2nzgo4pmk5vevjfb0tjt6m3yk8r3f7prhbtnhwmv7c1rwd673tzby69fy3pncg5v7uraibl6libfikm0imyyeqvckpum6up3arc8m2e9z372x6le28c02wv3zlwmnop4qzn4c8lrwrg6f7x8pzyw4kemaq',
                user: 'qagxicqudmc53holxtanir17lw2vz49p1s0va01zgshpydrmnhrf6ok9y51h31tvcjc7bzob2l4b3y3g3uzif6el4l0vbm4omjuirxgykqbg022rhg4bx8erpfxsif3imuqd3pjazjvsbo5uzihabr91qeanm6zqtai4kbms2jt69at91g7rk1exlha0ow1nnjykor3atr1m61iruksw33bb4zwjgqh34zgu0qmh1ij9cvi9a2j44kbr8672ipd',
                startAt: '2021-05-22 17:38:42',
                endAt: '2021-05-22 22:57:38',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionExecutedAt has to be a timestamp value');
            });
    });
    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringStartAt has to be a timestamp value`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '30c84b87-eaff-4f99-94fb-b503dbd72923',
                tenantId: 'b1a804fa-66d7-4c44-b1b7-6bea432c500e',
                tenantCode: 'lymmff346dsj1k6hde3xhd72cqlxzb80uqmfn70dpusgm4eak7',
                systemId: '43ed89f9-f2cb-49d2-ab6f-7de542ee7948',
                systemName: '79qym61dvecnd0jck14t',
                executionId: '42a651f7-a47f-4a50-bee5-66c9344f9901',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 01:19:00',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2021-05-23 04:00:49',
                status: 'ERROR',
                name: '38yicbgwgt2sfv4uf8jdyer314jf8cpecgg2iy3x9axtkd71ov5pgxbmnh2fqx06a204n61hfkc9z6s5rg3fy5cut17r57qzp27u2buvza3euw1amqrbf5pssy0vpamud85tjfvzynyj18i31p4v5ark0j6gqwjdh9s789wuef1a5vzbd6zwjyg7fjhg83ayutuelt9yxow0v51t0rkl8klgx9s4baxh9yswms9pv0ariaopra2nwsf9hg3e7pi',
                returnCode: 1196130826,
                node: 'k830envbluv1tk48n3060o0fec5kjsx1tnj0riu574srv8lqkdhf6xwkn6lggou31amvjq0sxw9ei61frc9hhgo80jgj5uer04hkvmmmvjeuhz8fxjx53xcwog93xs6bnzk91e89ws657rsy43wxz7i7xprv2fhh',
                user: 'tqfwa63m5c3m6pyc7okl8kbxfgqcu3b9splpv0oydmxr9i12zftvgix75ayns6tchxvw5zboj3mlm04y13w4fnu7jzbcukiit8wmg2ras64lian8ieulaj544g99sqqdrzi1oz66lrlfmmtl5vkcd4xho1plg0mz5j1m3i9qax8anho51za0is8felubgd2s91xikr594ewe9d3uc1rc8fdzqj1xfu82y6fb55uqtpq2q5v45vfdpe84a8n8tvs',
                startAt: '2021-05-22 17:05:14',
                endAt: '2021-05-22 18:29:13',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringEndAt has to be a timestamp value`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ad94b1d5-68d6-4eea-8d58-4cb21280b3c5',
                tenantId: '113f5c67-4dd1-493b-af58-1232f01989ba',
                tenantCode: 'or2hx32m0sj1oazdpm5y2pjkp394rb7fhijwlbw8d5dyxsgjez',
                systemId: 'fac633ff-81a5-45af-8ed5-362256c0762e',
                systemName: 'h2hb0t31nkfzud7iksrg',
                executionId: 'a5e9bb4d-d026-4022-b974-b84b8b636e6d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-22 21:04:07',
                executionMonitoringStartAt: '2021-05-23 13:02:59',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'ERROR',
                name: '2fw8fa0jor20ygin07dh5pb1pjy51n8hxb83if98gtum7c1arin5i5medngicdnlko7bvpt3rfgwakl3ag2vno6mogswx6rzn6eye8570jx3f1lmqndi6447j99tmb1vewbnul27wwjrpx8bn8ggqlzrvivoxxmglnp8wzwnpp0z83ur91z7cdfps9in4rty3rv7dq4qvhdpmeagi97r5t72l4xnpyq8hff429benf9hegxx7fhhon0zvrbd1y1',
                returnCode: 6103258751,
                node: 'aspvu2plyitbllscsooz6l0l75xdknda08vrqp0yfim9des0iwfveg0tbn5bj5r1280vfam0hxvglssjxbp23slrqmkt4bnwa8etndy4qgt8eiy5v6nnma5sg86bxbwa14ckrn403q1w3rgc2j5mmwzhai8davv2',
                user: '8kqg03rgfjlfjrz7xpyvlvehqn8h83vz90bp55tsec8pecdn7d4bx1d3cy1taio8ngby2oesii5arcpyhks3c6mzhk3j7wn5vpylpq9x0xg3t7idpvzkrftkw4j9j6abbeafbgwblis2v6kdxml92e0ar6jrgyoro3503hscu321art6uj1n0n25rmb2495m3cs1xksya9ywi14h2r7xz4wk7o49ekmav34aw8tyhibqo6x3b9k85ck3tqzvgvn',
                startAt: '2021-05-23 06:21:29',
                endAt: '2021-05-22 21:12:00',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailStartAt has to be a timestamp value`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '2ec30acb-a5fd-4857-8798-a0b896d3a941',
                tenantId: '9649b9ca-ad33-4965-a9b7-06cb111a7792',
                tenantCode: 'fq0fbjevsf6tzw2jp4o01do6cz5xp5j91djz7ylb8deqo7p4om',
                systemId: '0daacb2b-bf61-4b3e-9a52-8c67a399e17e',
                systemName: 'd06jvjxcacs951odyodb',
                executionId: '05ac086e-3d17-427c-8083-3395905cd461',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 12:31:21',
                executionMonitoringStartAt: '2021-05-23 08:55:15',
                executionMonitoringEndAt: '2021-05-22 19:01:44',
                status: 'CANCELLED',
                name: 'ykzmnk5sebmm2ma1o6hlauoeuidfdh60tzmzvjsdzro8cb62g44lzfb633qn7k7unb0jtqbr3roc7nzaaoojv5abw1skdaes9rlnbuqul9l4z4exo9jcih0ldkmjlhp7ndqy6qwiaq22vo3a55j78mwjcrolp5hg6jigok8lmvwx9qeufuxx13tyj0u8u05ricvo2i756c1mg5fgg2olclsrwg5s49ec8np4lka6ijopgwcq660aqvv4lrflqqm',
                returnCode: 1737307723,
                node: 'h0uw894yd3czv1iq2pjs8g7d56em8t4jyvw6nonaz0wvkoqd2ydj31rvuszibrvmxcc6kcy7hxvvb7hyt7370htu4bgs2d2hrqj5r5r9pnnju5usd6rps2ey0wnx1xjionlmfe6vy3gpe01aos4du39i2yqqxj2w',
                user: 'leiakoslwk2zlgjtmhdb6w3h8xufjmwrcjaipoepzl35moztit3ayce1gwkckyt2ijxi0lcl1qtkp2py6p2gjydmaxc1hdrajlao963ojevm7fcm5ft5rmh911033uakcabltinfmn1zf1ophmarfqo1btesks7ui9r5chfkk7mmdp1978bgs8iff8j5c0fzy5kmjhljxck3irk8oexacyqcde883p0eseler8evmctild37lic3e92yd2lm7ln',
                startAt: 'XXXXXXXX',
                endAt: '2021-05-22 16:27:39',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailStartAt has to be a timestamp value');
            });
    });
    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailEndAt has to be a timestamp value`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1148276d-e35e-4e3b-94db-61fcd8e7ad0f',
                tenantId: 'd3e91b3f-cd31-4115-bd6b-ab5b3886f525',
                tenantCode: 'kzt72h3bne64m3qywj67wliqvk6hfq4xib6jzd9znqxvnaavr7',
                systemId: 'bac93c51-29bc-474e-8589-60275fcde3a8',
                systemName: '6rdrptk4eijiifqh3avu',
                executionId: '9526ee7e-cb79-4275-af92-34ad533cc200',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 07:06:15',
                executionMonitoringStartAt: '2021-05-23 12:03:53',
                executionMonitoringEndAt: '2021-05-23 07:47:18',
                status: 'ERROR',
                name: 'l6ujluw2kyokoehiov0rvljdaobpxusuicfeteeg96oo6ktad67nbjeqq8kifrcbtwl73k5122mna7vjm61sjmwbm3599iy6xgdvjjlf5lpfog92zibgedvcdl30wxrx2pqwpidaot0uplnx9ryy9v9unmus5cmmnsiyfe9xjzn3zko3te5g0n98u0apn7dl6c6s4vemxwbdw7iwof1xtleg4ubueiswo1eu5nv14mls0x6an1ua8u155k7651r',
                returnCode: 3180916309,
                node: '3sqew0y5gy428esieie20yj8swix4hx10pviebcpex2quowbclvmz0ik8r824qoefhpvsfnp6ujizikn95v1ud60q1okul5xxca7c3d0i7np5o4thb44h58dizkt0m56u2v45om9fu15yypywjdw4my4imx540jt',
                user: 'duxicafs0233n2itibwxqlyt183uwfvsof0eg2n0y2l81fa5fxp7ok85a5f6eif0cx3k0ob8qcydwg70de1vnx6zb98bvce89h6ogvnlfay1mpcns9n14nd9wb0s1fjbbjuar8zsex52h3y2an5b969i06qjcpzmnq18vt0e2obsn4wjwpu4nd2dh8p9ayfsza2299v799q6hky8kaobwkx9paq3b05be49918g65po6tkkvhv0ptdqy6n8mlev',
                startAt: '2021-05-23 10:06:14',
                endAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailEndAt has to be a timestamp value');
            });
    });

    test(`/REST:POST cci/job-detail - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(seeder.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:GET cci/jobs-detail/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/jobs-detail/paginate')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    offset: 0,
                    limit: 5
                }
            })
            .expect(200)
            .expect({
                total   : seeder.collectionResponse.length,
                count   : seeder.collectionResponse.length,
                rows    : seeder.collectionResponse.slice(0, 5)
            });
    });

    test(`/REST:GET cci/jobs-detail`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/jobs-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(seeder.collectionResponse);
    });

    test(`/REST:GET cci/job-detail - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: 'fecf12d7-1fa5-432a-a830-ddcfb446c536'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:POST cci/job-detail`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                tenantId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                tenantCode: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                systemId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                systemName: '4iyw9pwsdxcmgcu744j2',
                executionId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 11:12:54',
                executionMonitoringStartAt: '2021-05-23 11:12:54',
                executionMonitoringEndAt: '2021-05-23 11:12:54',
                status: 'ERROR',
                name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                returnCode: 1421352518,
                node: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                user: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                startAt: '2021-05-23 11:12:54',
                endAt: '2021-05-23 11:12:54',
            })
            .expect(201);
    });

    test(`/REST:GET cci/job-detail`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:GET cci/job-detail/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/job-detail/8b1f24ff-64fe-4a66-a4b5-f89344a2c048')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET cci/job-detail/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/job-detail/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:PUT cci/job-detail - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                tenantId: '01d3c56e-5728-46aa-8427-4d9639511b96',
                tenantCode: 'scnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvto',
                systemId: '9189c277-fd22-4a5a-a692-63a1c56085f6',
                systemName: 'zwdlk281zptz1leq1e77',
                executionId: 'afa030f9-065c-4353-b1eb-3e148b092012',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 13:50:50',
                executionMonitoringStartAt: '2021-05-22 16:20:34',
                executionMonitoringEndAt: '2021-05-23 07:33:35',
                status: 'ERROR',
                name: 'ru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql3',
                returnCode: 2295590237,
                node: '6g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqj',
                user: 'y1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4l',
                startAt: '2021-05-23 02:28:55',
                endAt: '2021-05-23 07:02:42',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/job-detail`, () =>
    {
        return request(app.getHttpServer())
            .put('/cci/job-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                tenantId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                tenantCode: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                systemId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                systemName: '4iyw9pwsdxcmgcu744j2',
                executionId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 11:12:54',
                executionMonitoringStartAt: '2021-05-23 11:12:54',
                executionMonitoringEndAt: '2021-05-23 11:12:54',
                status: 'CANCELLED',
                name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                returnCode: 6829489384,
                node: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                user: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                startAt: '2021-05-23 11:12:54',
                endAt: '2021-05-23 11:12:54',
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:DELETE cci/job-detail/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/job-detail/a171d387-2f9f-4502-bcda-85d9b8e095ff')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE cci/job-detail/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/job-detail/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL cciCreateJobDetail - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:CciCreateJobDetailInput!)
                    {
                        cciCreateJobDetail (payload:$payload)
                        {
                            id
                            tenantCode
                            systemName
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
                        }
                    }
                `,
                variables:
                {
                    payload: _.omit(seeder.collectionResponse[0], ['createdAt','updatedAt','deletedAt'])
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('already exist in database');
            });
    });

    test(`/GraphQL cciPaginateJobsDetail`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateJobsDetail (query:$query constraint:$constraint)
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
                expect(res.body.data.cciPaginateJobsDetail.total).toBe(seeder.collectionResponse.length);
                expect(res.body.data.cciPaginateJobsDetail.count).toBe(seeder.collectionResponse.length);
                expect(res.body.data.cciPaginateJobsDetail.rows).toStrictEqual(seeder.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciGetJobsDetail`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetJobsDetail (query:$query)
                        {
                            id
                            tenantCode
                            systemName
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
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.cciGetJobsDetail.entries())
                {
                    expect(seeder.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciCreateJobDetail`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:CciCreateJobDetailInput!)
                    {
                        cciCreateJobDetail (payload:$payload)
                        {
                            id
                            tenantCode
                            systemName
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
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        tenantId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        tenantCode: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        systemId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        systemName: '4iyw9pwsdxcmgcu744j2',
                        executionId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2021-05-23 11:12:54',
                        executionMonitoringStartAt: '2021-05-23 11:12:54',
                        executionMonitoringEndAt: '2021-05-23 11:12:54',
                        status: 'COMPLETED',
                        name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        returnCode: 5825809714,
                        node: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        user: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        startAt: '2021-05-23 11:12:54',
                        endAt: '2021-05-23 11:12:54',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateJobDetail).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciFindJobDetail - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindJobDetail (query:$query)
                        {
                            id
                            tenantCode
                            systemName
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
                variables:
                {
                    query:
                    {
                        where:
                        {
                            id: 'eb4a26ff-255f-4d68-8b8c-90f182881365'
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

    test(`/GraphQL cciFindJobDetail`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindJobDetail (query:$query)
                        {
                            id
                            tenantCode
                            systemName
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
                variables:
                {
                    query:
                    {
                        where:
                        {
                            id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindJobDetail.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciFindJobDetailById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        cciFindJobDetailById (id:$id)
                        {
                            id
                            tenantCode
                            systemName
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
                    id: '26a4ec8f-0e1c-4a1e-a5cb-18a538d9f7b7'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindJobDetailById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        cciFindJobDetailById (id:$id)
                        {
                            id
                            tenantCode
                            systemName
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
                    id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindJobDetailById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciUpdateJobDetail - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:CciUpdateJobDetailInput!)
                    {
                        cciUpdateJobDetail (payload:$payload)
                        {
                            id
                            tenantCode
                            systemName
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
                        id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                        tenantId: '01d3c56e-5728-46aa-8427-4d9639511b96',
                        tenantCode: 'scnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvto',
                        systemId: '9189c277-fd22-4a5a-a692-63a1c56085f6',
                        systemName: 'zwdlk281zptz1leq1e77',
                        executionId: 'afa030f9-065c-4353-b1eb-3e148b092012',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2021-05-23 13:50:50',
                        executionMonitoringStartAt: '2021-05-22 16:20:34',
                        executionMonitoringEndAt: '2021-05-23 07:33:35',
                        status: 'COMPLETED',
                        name: 'ru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql3',
                        returnCode: 4108687147,
                        node: '6g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqj',
                        user: 'y1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4l',
                        startAt: '2021-05-23 02:28:55',
                        endAt: '2021-05-23 07:02:42',
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

    test(`/GraphQL cciUpdateJobDetail`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:CciUpdateJobDetailInput!)
                    {
                        cciUpdateJobDetail (payload:$payload)
                        {
                            id
                            tenantCode
                            systemName
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
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        tenantId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        tenantCode: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        systemId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        systemName: '4iyw9pwsdxcmgcu744j2',
                        executionId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2021-05-23 11:12:54',
                        executionMonitoringStartAt: '2021-05-23 11:12:54',
                        executionMonitoringEndAt: '2021-05-23 11:12:54',
                        status: 'CANCELLED',
                        name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        returnCode: 9511564541,
                        node: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        user: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        startAt: '2021-05-23 11:12:54',
                        endAt: '2021-05-23 11:12:54',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateJobDetail.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciDeleteJobDetailById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteJobDetailById (id:$id)
                        {
                            id
                            tenantCode
                            systemName
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
                    id: 'bbcaf106-3360-41d6-8815-020782d4033d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteJobDetailById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteJobDetailById (id:$id)
                        {
                            id
                            tenantCode
                            systemName
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
                    id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteJobDetailById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});