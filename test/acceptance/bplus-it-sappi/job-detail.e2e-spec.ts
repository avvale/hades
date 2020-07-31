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
                tenantId: 'ba7aeb09-5232-4001-b6f0-10c0d1c492b1',
                tenantCode: 'sbczp33abnbeche8k4eucx94gxuqo0bqk85r8y0zmn6ocm5jta',
                systemId: '52f4eaa8-2be9-4460-9fd6-cc50c9a18b6d',
                systemName: 'ojv6igox2vz3kyko9or9',
                executionId: '8c80c82b-c12f-4e1e-b5e6-9eeb23a16783',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 08:35:25',
                executionMonitoringStartAt: '2020-07-30 17:53:17',
                executionMonitoringEndAt: '2020-07-30 19:12:45',
                status: 'CANCELLED',
                name: '1bggmqwitxt8mag407ue49vfbvnhbx3bcl1ojj05apdpgi0ku20yojyy3ueyecvouzpxdg1q9zz7haezfqf4fxtuhvfmysxdxehy0zp69j2p7vugpyhvgzvbm0lj3g8k52gczyyioume67fnr47nqvlztkzbo4v9cn40l98j09453rdlt31nou35dn2xu2mg8uw5jln58v92u35jvh3c465d6x3l7j4t1bo6qo7iyrzc6b8rknonu8q77jdmkqt',
                returnCode: 1470523366,
                node: 'a4iztb3eh4wj1ejfo85i335eynmoedzwczd2dm79e3zb9jfigc4sruggabnqm2yhykl2ygmhs58p32ums1viy6od58giaujit8mw1uhycipw0rw2bo3jdylm2kvdaxbnrgcncpm4wk4tp4a8m8l86zikdvffec5m',
                user: 'ld3u7b2ayjeiy6zbkrjrfjlb8r41snfrklhxy12hggob05ofbux9q63eeahal5646wmikdlrrwvbc3fuh3jckn6umiojc1r5gzo85b1ah5bi0yl9mrou8sw9zb3894fsrk0ncey3k9ydx8c6pbgxtbglm3zg9m98eproiomcj9uuwrxjlfxzsmpif34vgyc54csjg2et96l97lbnivowaji2ygxqqas9hm8hsinqmfsb3lvnz9dovk99pwdn6nd',
                startAt: '2020-07-31 08:35:07',
                endAt: '2020-07-30 23:07:16',
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
                
                tenantId: 'ba7aeb09-5232-4001-b6f0-10c0d1c492b1',
                tenantCode: 'nrrey52mrngafw3rdng1iy86rwgimnwg2ygpqf2s4vxkl6szq8',
                systemId: '52f4eaa8-2be9-4460-9fd6-cc50c9a18b6d',
                systemName: '6125hoog1j8j9mjdf4ep',
                executionId: '8c80c82b-c12f-4e1e-b5e6-9eeb23a16783',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 02:39:30',
                executionMonitoringStartAt: '2020-07-31 05:07:14',
                executionMonitoringEndAt: '2020-07-31 07:55:03',
                status: 'COMPLETED',
                name: '4ssi9d6ouwzv3j1kuxou4jkwt1kdxvz2gr0tbnm0nsk0rqbmlcxqaoitfwg8ob8wy34qwyw7c17d6nqsoapulusedu9ig2hmrvlrpob4i5sr59wgytbhinfap9n2iqva4ko1esq56gp4qqjuz48h3zqopauhzedcv51r6hcy7qwentihdc7jah3i0llovf2ymz3pyjuen6d1knvpyvciaaee73wclgnftgzurpq2w7frwf5x20pn2373q8bze9a',
                returnCode: 4376513726,
                node: 'rnadomuybkm0elquwq7tddv4gn0qmj5n2f9976zrt62n22pxux6xnah8ktdboy0v10nwnahvy58n5jmx8e4dnjuyfuhnwhhmn8m3is406n8nkhz5xsfn9p0hk43ddygzbqexkfwgy3db7snbh1my7k6sf86tlk4q',
                user: 'bxj8vz046cu2b694cy5l1as3r1d2q7cgwvlbaw8yflzj0120c0bqqzz85cea4go34z08kchesrvskcz2pw6eh8y1j7qvr0vvqezsycwrsswcd8ofhx9b26hikk6y2wap5krbxp792rcbeicgm0h3i28b60cnwt0zlhgtdyan2z3sbv7fqtuabh2eg33mdaeggbp1evlmekzypufu7uz0u4c7v6z3kr1ax3cmvwrikq0shc2al2m0rpsg8e9g3dy',
                startAt: '2020-07-31 12:26:50',
                endAt: '2020-07-30 21:09:38',
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
                id: '63e94615-5741-48f8-8632-fb55e367792f',
                tenantId: null,
                tenantCode: '8zz8j508g4efdq4gje1mdfft52yahvf6iybm4izgh8usf8vy21',
                systemId: '52f4eaa8-2be9-4460-9fd6-cc50c9a18b6d',
                systemName: 'g74g73sw91ov54iizn9h',
                executionId: '8c80c82b-c12f-4e1e-b5e6-9eeb23a16783',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 19:59:16',
                executionMonitoringStartAt: '2020-07-30 19:02:42',
                executionMonitoringEndAt: '2020-07-30 16:42:57',
                status: 'CANCELLED',
                name: 'xnlbohrriffq4di9to4hng4cu10z0kmqcn14ijbxnre97ym01dtp7m6orf9dlol8qzc6ri4bkl9xtgsapow6u45gvxcio6ct4teb2zinw4a6loonq703329jc39cx6qkupfa8kuu7gonuoa5q3n83x2yg77ud6uwvzne5apf0yy2wg9c6q82dmdpyhyiz5rj354lkgtz7964qndn1ufc2vm3b01r85cze1w6n80s6h3oque5dyr82c0x9r17jf1',
                returnCode: 6244635924,
                node: 'atjl5bp8s2xvxvvnzub0cj1e6a7f5v8i5fb90716y3t4ttn2k7zbwb6duvdtqce89ykmjul1de5ysu4xdgu5x2a49z4ro77mg3brjxyj7sa3hlgvkm008xgvn162joz4k04nm0z4qwbtamhzl0wk04qn1zfv9vxj',
                user: 'a4ldm2btb882py8466yj25zwwvx6q399e53rtkm2sb7urhmneosxu8jdcxm9l7bbt4n1a5bzvq33kx3qz93nwa394wbi4j9lojyc8e3z5eh2g00zi3h9b49bwxdnzooo9q19bbd1go25d4da48ugqcen1g35ke2rgzm6tiu98qe4eq3b62npgmhmpap50573rchp6gu4tt8sauwk1kpts6iavjk4tuw7i3hqw7fka001cbuqd3ecv0qgazhc4oa',
                startAt: '2020-07-31 03:49:58',
                endAt: '2020-07-30 14:09:23',
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
                id: '63e94615-5741-48f8-8632-fb55e367792f',
                
                tenantCode: 'ie9cl82bhn2yzhc7hrw4ykncyqbx3ihv8dekcu5ruah4e6k1hq',
                systemId: '52f4eaa8-2be9-4460-9fd6-cc50c9a18b6d',
                systemName: 'so88opf2e36xe2qfad4c',
                executionId: '8c80c82b-c12f-4e1e-b5e6-9eeb23a16783',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 03:14:26',
                executionMonitoringStartAt: '2020-07-30 14:21:56',
                executionMonitoringEndAt: '2020-07-31 11:19:02',
                status: 'COMPLETED',
                name: 'p3ugjbvy8spx3aztluvdyne23rp25jhg9rqnwbs2y7jx2v8jhvq7eubixdsqkhpy6yelubo4kw8flg4lc2p04c4ap68a1563npgtthedlj5eb0k7qx6cxngk3xqa1gk0qf47sw4ouwuzf35bc7qx3l4997qngw6yn5i72mwaox6v38lms22m3wxn4wlf52ppnvdk795t0nlrmvwjccp7d82aipk4wb9qs4bxpukf2lyk06t5v7cm61w6pvz0ng3',
                returnCode: 9729610519,
                node: '7hd4kckx5w6n3bgjqmff4gjmdy7orc53ymcubpj1mvxwsjidnq7rdibnblz4og1jck1tuhovevc4lnf6cm3wrdo90g30oa89dym70p5hbk8jx3ccjqqivvovkgujrrhn4ux08mdsywe72omtdex9l1hw04n2efkj',
                user: 'p9kfmoivbter1jfgxz91tx2o6imdn8h7fciux9npoxlwxxrw2mqv50pg6ef3jqfk8phq6y12kkky6rk4a3gp0xp3kjpr5ovsroe644ic4bmk12ox7nnjdu4pjlq12k75ti7m0may3nkhv9phcl6scdqvxng2k7e3nxdxz694yjus8hklbyq6gck8td4izbh0yuf268h31b12b7sw8ycp478ibu7eku0vrqa06nb7oayqtx2lkjocrgeafaaqh0k',
                startAt: '2020-07-31 09:41:20',
                endAt: '2020-07-31 09:38:26',
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
                id: '63e94615-5741-48f8-8632-fb55e367792f',
                tenantId: 'ba7aeb09-5232-4001-b6f0-10c0d1c492b1',
                tenantCode: null,
                systemId: '52f4eaa8-2be9-4460-9fd6-cc50c9a18b6d',
                systemName: '4skdsfw00hkn99snfglq',
                executionId: '8c80c82b-c12f-4e1e-b5e6-9eeb23a16783',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 23:01:23',
                executionMonitoringStartAt: '2020-07-31 06:30:55',
                executionMonitoringEndAt: '2020-07-31 13:20:26',
                status: 'COMPLETED',
                name: 'cw99qmveewy7lt7lln0350ccumqzc9akc79by2oh9jihcfkm1vc67zvbi6wgcfjsmbsy11ldarmjmu49ei20y7yb1jo51uyp1z4955ypqdor0k8vyg8jrlrpjx22m85w79l7r0v48ew9gh0416cx4kf4b1s5vuc6c9m23jl924i0248xmys1coul21ordvrw99c7db49f44554ldilmwoveb9dnu25wmztuf2c3fze22oozxpu83akr73g0r2gp',
                returnCode: 8174587237,
                node: 'jg95f9pp2f3qddjungn3xbhuu5xq7flwyo90a40607o0l6r8uum3td6ss6u5r7czmdisdauy8czxod7u1r4iyulpt3m00gk5putjn76doaw36pv656vwudwla591lvtex52ljiz12sa27phofwfdcghdw2ceytuz',
                user: 'ilo60p50ed94jqc98ac8ia2y7fuz8act6vm2g0ozwe6prshas63up26u8xe12wttoqtqcq23owop9r3kpfxegg90krbvuj8pqugtg63wxpebfub7yx3u39oobhjavl3toqvn95bpjiq9ujm0ouuqggqekbbgij68jykfjet34oz70ehs7q4yzfj2ku0nhffcwp8qvryrragc6xou0vbsonslujj58q4i1rscqnjv48h9zwqn81imi3tp7u00oaw',
                startAt: '2020-07-31 02:30:47',
                endAt: '2020-07-30 23:52:30',
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
                id: '63e94615-5741-48f8-8632-fb55e367792f',
                tenantId: 'ba7aeb09-5232-4001-b6f0-10c0d1c492b1',
                
                systemId: '52f4eaa8-2be9-4460-9fd6-cc50c9a18b6d',
                systemName: 'fwjfpu8bdg416hfb4fc3',
                executionId: '8c80c82b-c12f-4e1e-b5e6-9eeb23a16783',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 02:48:05',
                executionMonitoringStartAt: '2020-07-31 02:14:11',
                executionMonitoringEndAt: '2020-07-31 05:41:58',
                status: 'ERROR',
                name: 'b3e8ft9oshiitjxywofamiasv0rsrp0umc2hmhwc1p0rtyt4y5pidw63top4939djg0lvdfk9kx8n56x50s5gcw2bedljgvq8twezk0jpckd29cl7wt7up77o8iik33uuqr43vz4tbxurlwapetf7icqoywacr0urlojpn8rsfcx34awod4jcuz3qkj259y833trfs21xy3s9pgmif83cqtjxdkp12a8vykhe4ua2uvsk8o1k960a070izpc52o',
                returnCode: 9469972969,
                node: 'hogv1027u9m5r0bi1l3vf776r80lcnx30ugfiowgwdobrdb30srfki9y4m3q2m1bei5m832850994l7vzvh0bwt5m4atwyreavxwnzjdad7xzt2b25dckpjt18qzandh8cmh7jptd376h47xh2pc6d5dz678762z',
                user: 'ek16v4vzsngpuqjfxhm07tt5c0aua5yc6wi9gmpky1rf9wpqqk1ax0t9s9afg43xf77berpnixzrzp5hq6t3au1bwurmr3z8fsw09va1k8nk92al0rj43tb9h7ils7zhwuvmk44a4u77dpioag1810f8duz3i2kql3v0mhugn4qccylbmlql1xdab9jg6gzrptvifyxg64yohsbypa782n4xm2xzyn2nlku87s23z6qln4q439t7zm5v1fal394',
                startAt: '2020-07-30 14:28:00',
                endAt: '2020-07-31 07:53:06',
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
                id: '63e94615-5741-48f8-8632-fb55e367792f',
                tenantId: 'ba7aeb09-5232-4001-b6f0-10c0d1c492b1',
                tenantCode: 'ppsze2govsxm6q7qohdw9thk4i3r2pga5usqbv68m19tsg0yik',
                systemId: null,
                systemName: 'tiq5m8touifztaxac9ud',
                executionId: '8c80c82b-c12f-4e1e-b5e6-9eeb23a16783',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 11:46:59',
                executionMonitoringStartAt: '2020-07-31 09:05:59',
                executionMonitoringEndAt: '2020-07-30 19:14:24',
                status: 'CANCELLED',
                name: 'uqkawj8e0hqu5rqke39rnoz90bnwe8ric6mwvpffpk9ma3wpk2zlaz9i6jih3b87t5ns5dmk6lrflp3mxojntg0z9yv25743nam83vwgwojgt1102aul3rm4gsn5uov65hlnw6im4va9nrnuy4avofwv8xzhccqxww84ectzgj8x4meq3meqc2e8sxqln27tyihko2qeq8aia7v5v149hset2z0fopvv3vjqdn87x74nw8qziojvgw2oexq5oxd',
                returnCode: 4286882812,
                node: 'pgp7k93iztxrzafa6mtionlhop0jnjkgvgd4lmw96or7o8e8ek5gonipoekrx8lx5sicsjas5a7vx11mn2dkn5hpcdm1go51nx8h0s24t6nq6x71466dv1xubkkmxjrfkhw7j7fi8ukq8ik0uqtgycg73zjk43vk',
                user: '3ad7tvu9mrf53edq26kdezuqfmwk53gnw5hl1dy41kpfibf4aa46gvyhixuscv69r7uj320vt88dg2mnbg6skrlhw2hl6m46xmutd7bc1xx3thb5jlhqc1n6ws44iw7zds6sgw402d0791fcp9ci8wr8plad6fo4ufg3gjkq1wa5d669hjl8asfofbj48l18yck4e8bqiv1cjmvijhciv03qtudqyr0wc4sci9x4em7hd6y0go2qfuoh4927suf',
                startAt: '2020-07-30 17:27:14',
                endAt: '2020-07-31 08:25:31',
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
                id: '63e94615-5741-48f8-8632-fb55e367792f',
                tenantId: 'ba7aeb09-5232-4001-b6f0-10c0d1c492b1',
                tenantCode: 'an193nnok5jq4xdsv10lrsai1lxitg7koolkt1iy6kmrjdbcyb',
                
                systemName: 'ij8d6bnacqnqxv1lv960',
                executionId: '8c80c82b-c12f-4e1e-b5e6-9eeb23a16783',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 22:17:36',
                executionMonitoringStartAt: '2020-07-31 13:09:09',
                executionMonitoringEndAt: '2020-07-30 19:07:31',
                status: 'COMPLETED',
                name: '0a6hmnzl7v0nwxf7uxs7dsstvha572pyei8265ke8bjm9ygwntwzitr5tepxqm343sfvl36xcdo0er73l9gx5sx2gjejiy8n1hrdvdoj3kfnogwsif2qbq4nazi0eeoj9hvbinzxdefael7wjjj6uuxl2lbplzw5rjwplzzvbxjlctbyi72pxy688ub6g6ui50v53tc8oq7ngxu7lsk0wwh3yjlzpzu25mb43realag73kkdusm9jdv2bw279fk',
                returnCode: 4189456478,
                node: '87qwuc1jrpo79g1un6g5e1o72c23g880xa9tje29aaakk8rwc8krvsb74bi5g8j0371apfk7ngh1euozn2wzl83v789f53e8ayw2mujrntr13ymkrou32u3ni7pp9gl8tol1jviklnlj02hhwvcrqspk5410fwwe',
                user: 'p4ba2m5ssz91898q6w0rhnd8xlvo6mcbbt6u0s2llwcnneeydz1d5apwps3sdavf7pg4x81akz2xdevsh8z0ghpnfqgpf3y9nldcarggljv9m2yw2t1986se0bkzkigz6gx0kdbtng4yne2gmzunyi46ftvc6z3wt7fzxe8mbqksy3skrrbyk11pur05jj90tnztioxsidv5g1ppyb7yglwhnooqnbe9opttdbu0zkkrnejcr5da1xl25sqlv7b',
                startAt: '2020-07-31 06:11:13',
                endAt: '2020-07-30 15:39:52',
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
                id: '63e94615-5741-48f8-8632-fb55e367792f',
                tenantId: 'ba7aeb09-5232-4001-b6f0-10c0d1c492b1',
                tenantCode: 'sz5myyt4d4ka4n1utk1vlgipdd7b62fbeux98zad5l1gi33qp9',
                systemId: '52f4eaa8-2be9-4460-9fd6-cc50c9a18b6d',
                systemName: null,
                executionId: '8c80c82b-c12f-4e1e-b5e6-9eeb23a16783',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 15:48:23',
                executionMonitoringStartAt: '2020-07-31 11:46:03',
                executionMonitoringEndAt: '2020-07-31 13:42:23',
                status: 'ERROR',
                name: 'o5kisc1s9biuf6ghq054z5pf7c0jo3ycp6gueavcpnyaxtwfbd0hfykpjc725qo48oy882ws3lk8jfytxomdpnrttleo9pk1lu2vtjtwq1j1l3judqcwzsmwhtyu50wv91k4sagtk6534gq52a4rd1skkiquk3ftdvaix8ft5oe4mqp9rnj057wsy9r6tz7iaafutzhpujj6dz9loq8e2gewjo05lk1vjn3b9mux5x537l69gamqm8jy3odt1t6',
                returnCode: 4925866627,
                node: '89rdbof927fpjn6pef7prma079uwq0uquggu86bx18ti024cf7kt4vpdv3o0mdkp1eaufpfnvsc05umgyubcpd29c54y2rdtpkvs0nlnx31kgwrouwjuv4d1iympcxqa66zgmm7xjmabi2jd2zxna442ym3ir8fm',
                user: 't8bay8t4l2und0dvp4hwlkema3q0yze1l279pu6hhcn222uylvjwzm1xbdx8f2zzgifp54agcbgrdpa0wgkgslo3a7ho1dn1y418pb86t1mdod5mbkf8rsik7srq8cgtyffq2rdepupusnwpli8hljkivo47bkmxxiq92zj7iar00y451mhqc8vih7ukuw9xcifoflg9svharfruk210v0hh3albw3tsfd511vuxw3ub5qiatzuw25qkyzm99jy',
                startAt: '2020-07-30 15:21:02',
                endAt: '2020-07-30 15:52:59',
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
                id: '63e94615-5741-48f8-8632-fb55e367792f',
                tenantId: 'ba7aeb09-5232-4001-b6f0-10c0d1c492b1',
                tenantCode: 'omu1t06bm5lc0gykwicbain38sp7o1gud1yj0m76zbb45yygbo',
                systemId: '52f4eaa8-2be9-4460-9fd6-cc50c9a18b6d',
                
                executionId: '8c80c82b-c12f-4e1e-b5e6-9eeb23a16783',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 04:03:40',
                executionMonitoringStartAt: '2020-07-31 08:32:25',
                executionMonitoringEndAt: '2020-07-31 13:14:20',
                status: 'CANCELLED',
                name: 'mna6e9oeiho61ay70v37weromvyr69dtye59oxx8dgtybq7bk85o3e9lrtxjosh31afg4wz8l489lp4uvzquvucjypiop9stf61ki7ryfp88gsbkpyidzh5q0j4ptco73a5w6g0pkx0wee43c7dafjh2rjyzix42lshrqjr14cg3pdoswcoo3j41ib98jdcxxrvxnm1ukeiks6ig5h4md3ezt9m6j48z0ggy89xnlyimltdk6gtstmnyzlado2h',
                returnCode: 9424272758,
                node: 'kse83a5vvvh883x064na5xlsj0j6h91uiyli0xhi507c39s9yxqiuo7c50nc2uq72b1hfvl4f5i1m4wxbiabvncb97bhdy94h64m2mhvokuvm9hcbm3un2rpni9xep6gc0r6j9v7o22g0lp2tn3sdmjoqlpaes5g',
                user: 'q9y7654413e6wbfxijwpzd5dh40yp72vg8554wssbl8lui394kb7nz97o8ngq9sv6zh1py9wfmbzue50adospd087hkt35gaa680skx2oc9bokzjxeu8rxtebo5bwhkwfihz7ly6zw6xfl68gscorbaltsfebfar3qb18wmvqultwh7e7pbgwkek71gnyji231r9uquxvp0frpfht6rv3eexy0s9kzv7g6xzs1sf95xoy3oar5pekjl20y4xnbu',
                startAt: '2020-07-31 11:19:18',
                endAt: '2020-07-30 17:06:34',
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
                id: '63e94615-5741-48f8-8632-fb55e367792f',
                tenantId: 'ba7aeb09-5232-4001-b6f0-10c0d1c492b1',
                tenantCode: 'm7al7xxzjrafub2rsjbb2hccs908lr78qt9u2aloz1vtcb9odw',
                systemId: '52f4eaa8-2be9-4460-9fd6-cc50c9a18b6d',
                systemName: 'p3ogij1j5e0d0txkcujk',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 07:59:27',
                executionMonitoringStartAt: '2020-07-31 06:53:14',
                executionMonitoringEndAt: '2020-07-30 21:05:14',
                status: 'CANCELLED',
                name: 'avphuspa1mpn83fsf19sgmm49mwklqpfp3cyfjzy85vpx7hwup1osih24915474rrn2fb4kok9tkxwrmdcycb5h7xfdc4m0bxx6x7z6zcxe2mt6vf2ar6sco0b70347dfb6uv0jyg9e0kqowglplgl0gnqbzr8igcjgkgm40gltx4q7b7tmfdbhq7b63ifold5mw74xn45oe3y56jfcnrg3n4ww376a6k5lmj4kntkzfazicgox1m7e11szu4vl',
                returnCode: 5821022527,
                node: '1osdxs1e3zqzgpejmw44leecv4w9jrulggcagldiwk4gutjbubs7ssjvw2dam9rziunyyzgfrnceygu9ms1528p07offns7r21pm36yolucr8r4c38afdxbyar3z3qgxi7hai7juvxawd1qei7syqyxacac7a0ar',
                user: '2idmyffggha2lbrtwxtd2o3souzdf4mva1knlvdvov10asop4x30t3du6hh8ihr7okbqop79ickvuma24kslp0qyj8voigkrohnmwj0ctud9xu6z13n88nfckeg2lzuzo61rulgi436vl24y602j39fn6rf5vi73wkc9ceapef5aoeu2j4bv9x3ywt0c28c7v4fxjmnu8xe0fnogzuppenr5btiua5zklsrzmc1bdx4hy8932isbv2lj3cbnkfl',
                startAt: '2020-07-30 22:53:51',
                endAt: '2020-07-31 04:19:49',
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
                id: '63e94615-5741-48f8-8632-fb55e367792f',
                tenantId: 'ba7aeb09-5232-4001-b6f0-10c0d1c492b1',
                tenantCode: 'f8ac9xe51mi5hc1c9r05ch9y7foutj929r2y861knebzdzhdu2',
                systemId: '52f4eaa8-2be9-4460-9fd6-cc50c9a18b6d',
                systemName: '0acw9mff4u8ezfdf8us2',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 02:08:03',
                executionMonitoringStartAt: '2020-07-30 20:44:11',
                executionMonitoringEndAt: '2020-07-31 00:10:46',
                status: 'COMPLETED',
                name: '2w28yuix30emfru4x8th6pq3slud5o86vbl56rr96zasbi3eel88dmeno2ylejb5amfk702dzyo7brawvp5sddvdrymhslww6liubc8faypjii34su1feczb635y177b3ynthjfxq7e7lgv7ovur0h5gxnxw7fvptpxeibfi0sml2pyb7rtq3z8ine0540bie1c2x6zu5ph16eawbmh89id8ybn8f0bfisme49q43bmthoxrqsq3tcyawfe2z5p',
                returnCode: 6376721863,
                node: 'kdm43am87j8zctu5nrfvugo8wfczvshdbabqj0p9vd721wn3j4yx6inxelcrp9710avjbp4msnahln1f24hz7kxku2m1fdj5nyptjl0jaik9u3ilnzgrrpcyk19sc67eo3z6c40q2pvipdsspj9hwjg53szq814b',
                user: 'rderjajdt4708d8whxgm36rtsdd0n4bh9huzez76j810sgcai1opwnmhxcq6e6s5jlwx5jlbkibn6n5ldk75kgf51zun3sy7wo0h3l56lc9fneqdp6nw46ickf882atii32jkq04dwmsfkldhfauy5tfsreaogzlahuw8zdk7iq1ptw0eo79hbgky4s1wvaojcjb84k9vi0b7zo8mdg5uqv08wg30u1h5bnhpaaw5242lelf5zuudaya93sg71y',
                startAt: '2020-07-31 09:25:06',
                endAt: '2020-07-30 21:14:36',
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
                id: '63e94615-5741-48f8-8632-fb55e367792f',
                tenantId: 'ba7aeb09-5232-4001-b6f0-10c0d1c492b1',
                tenantCode: '7l9xl9f2kx86yveu9uv37lpeqf02uot3w6s2ce5fui0n480pfb',
                systemId: '52f4eaa8-2be9-4460-9fd6-cc50c9a18b6d',
                systemName: 'gwk74jbwl35giff5w2l0',
                executionId: '8c80c82b-c12f-4e1e-b5e6-9eeb23a16783',
                executionType: null,
                executionExecutedAt: '2020-07-30 15:54:13',
                executionMonitoringStartAt: '2020-07-31 07:51:22',
                executionMonitoringEndAt: '2020-07-30 18:35:42',
                status: 'CANCELLED',
                name: 'owioa1oyrsfteog50lut0zonuzwuu1t9wnqqkcnn4ozabjcie8d1rwyjnu1ihzssql58au6wkb0rj0a1qotfjt0royxt1b83ofzpneuxy7qefr6z9e1dw52fsik13jl5ymu234wtk1p6gjg3cul4k1ai66jay5kb1abl7yr6qezhyuusegpaqeamsbn7qh9px5g5bjuzdu2injruz96bbnjepx0vgwahe9a520omd51nbg3c9bajd15djv4ra7o',
                returnCode: 5188474111,
                node: '2luyj8wfuckaa0zeqkmb8vmxiui03p1zom3wzp2ktidg1h8qptrbeh8861bhuwx8dq9mqn3qeyol19c6hx0vxsgre2wnks7g25xktjcxy8qi7xbycmi4v65q7p6i2pxe79l59qvcxow0e814dyzy2iaroikz4nfm',
                user: 'pxqd7tny20sfzjqh9r8hwiht00w1av7kntwo6bjbqiei1tizrtoj7cya2wtb9970opqhhuidzxd9nyng00gqftq9jnj847wi2kml49y12w2cos92bnvbv2vs18bdiaom4q45pupqyqigem25yhbeappfbeg9fgto7zefdpd4lmt4karq2eh043erlu5vdzmv7mmok4vojv2yd1ple93k08y4gubdu3fxsiimrk8c95x1pba0qp62e1ywtbbqfbu',
                startAt: '2020-07-31 07:27:42',
                endAt: '2020-07-31 07:47:54',
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
                id: '63e94615-5741-48f8-8632-fb55e367792f',
                tenantId: 'ba7aeb09-5232-4001-b6f0-10c0d1c492b1',
                tenantCode: 'sy7f23hd2u9omdced90e9e0qf0oqaoeffqm21bc9ow0s76fhdw',
                systemId: '52f4eaa8-2be9-4460-9fd6-cc50c9a18b6d',
                systemName: 'yxj27wmevueesyzo6g1u',
                executionId: '8c80c82b-c12f-4e1e-b5e6-9eeb23a16783',
                
                executionExecutedAt: '2020-07-31 02:51:48',
                executionMonitoringStartAt: '2020-07-30 20:09:58',
                executionMonitoringEndAt: '2020-07-30 14:50:02',
                status: 'CANCELLED',
                name: 'labdfvyqum1qgd0mwbqdmjid9xiou8scih6s7mxan3v4zieoqna1vso1qnmveea0tlm45neb5fv5a85fn4k8h0f1vsxbo589ii1sh7zaxwdp2ijikm3sa9w3g2dktc1vzx0vntl3sz6cpk502y9tt82f1x522rofoc1ooqa51z0b5nyn83voot2xdj1pafw9c4g4ukq5vlbt3bxsbi86je7sx3adoxhi1185ef3u60nd35b7ny6sicfscan3ag9',
                returnCode: 4766711839,
                node: 'puxi29ao23o1n60kdomt39nd2qd9jr7fb65rhnlatdlmsusn8oheciqtkhqmv2726zvzcwsr4teywo9tgv1a4vhwuy0c53zmmu7n0j7enskf21k1nbfzmnihyajq05nxk9codjti3aormbftx1iakjgzulhpl3cr',
                user: 'ku4yk6454kqs4x2d41j7z7z4r91jvhuqhiru36xc5mjq2nh6wu0xdp04hgosopymo4l8952vj979tmkoz6dhd7i75x7mco71elf88ny392uff5s3l1ofw42k6vvzw1f53yrc0fmztx5qqma8id7vrzx3l2vu657eygbing4xhh7tvtm4q3cyhq32kmdjdmpnvajs49yi414ny6168a6hi0b9jhhwuxxt9z54ygch5afi7u1o84jnhjinh9nnq2i',
                startAt: '2020-07-30 19:55:20',
                endAt: '2020-07-30 16:50:11',
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
                id: '63e94615-5741-48f8-8632-fb55e367792f',
                tenantId: 'ba7aeb09-5232-4001-b6f0-10c0d1c492b1',
                tenantCode: '7ru4mi4yx12tgcz706lkyesorotzv8d8i4g79pucrv83a0x8vm',
                systemId: '52f4eaa8-2be9-4460-9fd6-cc50c9a18b6d',
                systemName: 'oxrzdq8epaz0v7dtju5l',
                executionId: '8c80c82b-c12f-4e1e-b5e6-9eeb23a16783',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-30 23:34:03',
                executionMonitoringEndAt: '2020-07-30 17:40:05',
                status: 'COMPLETED',
                name: 'dy5a2tcc4gse87x62t8svm3pe5bft9h420ocycij3e6t1odn5dfobpuqn6j76uqfqtre2pxdsw7qk56ojauh5l4kvf9qpdjna2fsntdgmqi2diqgcwlbwc84tg7lhal1j2ienplz3wsm7iwalhropaj9tgfn07xwngfu30vvkj9ucid5bise002qcy5tcl54otgvl3e49mxdqlajjbw9mriggt949zhi9kmknotudy6ae864pagdr153pin0ogw',
                returnCode: 5766134749,
                node: 'bzqn56xsky1r1a9gyee71p3f6d0ajim9yc9skm6vcvt62w7em2jcll7ij05o8fuev78xryx13hu3sa2caivzko4l8mk11dkbx1lmhnbeyh02hirmkzq07la58ypzqlskr1zlcstiun7hmyt3o9c70iriqbukcv62',
                user: 'yh542eiau2k3hsmvhuvazkciftpn5p8sbse1l4pd61aosgm5351vdpavzl8qz0fpxs94nlm4xdca5xe29gxlletqr3m3dmcjy1cg1tf6cnmov0u73azpudodofrt6k4tvt61p2hh5zdtix9td44kw2jvwfjxmrikjh3uz681qnkv23zlimh7at3sauel5hijvdfebbkuu8fzb1oxvmf04j8yadbg7lp54mtdm56z415rer8xn1lcrg7y5d55gn1',
                startAt: '2020-07-31 05:53:43',
                endAt: '2020-07-31 06:53:56',
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
                id: '63e94615-5741-48f8-8632-fb55e367792f',
                tenantId: 'ba7aeb09-5232-4001-b6f0-10c0d1c492b1',
                tenantCode: '5monvq44jwzv879n7n9jkglwvwqqk8g7b48jmbbrpcbq3rqqov',
                systemId: '52f4eaa8-2be9-4460-9fd6-cc50c9a18b6d',
                systemName: 'vs7xiijfllz05dkrpdtq',
                executionId: '8c80c82b-c12f-4e1e-b5e6-9eeb23a16783',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-07-30 15:20:01',
                executionMonitoringEndAt: '2020-07-30 21:09:06',
                status: 'COMPLETED',
                name: '9u040axr7li7bhto442fqo3f95ocebogwkx0x2qo5jvfw87mljz6xke22vq495l56yxpx3o95q4j4y2tlc2crie02q1f1yzsas6qkdvphloaaskmd9jsqv7wkt5w9xthmz6rdrybxazbljjgkyuvl89xn67gjs8icbjwkt73vpwjgu9e7wvps2ao5qpr110ha2vtteset3h0djyertjnel49vqtorlyn9491mhjpe55uebd4jqdm748zspt2lbk',
                returnCode: 4401018978,
                node: 'pe2ulqwcwcvpn6xoredkhhghip8mmr382viyhb42d36d77poqndp88gp6yj1p4jpwpns5uf8o4xgzygx064swvaxz6pph722rx1rbcbvfarut97bkvlyx7eh8t3l1kz3xwqrpxuh4cj69v9aeet0qog7uxbcxd3j',
                user: 'i9zc0pj0ntb14l27gtcuijapdi9xj2s083uo5t4gf4yuo2lzkip0sud80lfzmovh8grxxqboz1yh4ylitm7lhf1tw9l16djp1pqobockmyqzbm1u03djnb958g6x280o0fxquy4ey87uqm1wt250auyc65c1i79czl9cbv9jyz23y0p6trc7u8q5fo0p28mi4r8fv9r9uqthr9tf7zcrwqiy2de7145kipc6d94wllca58cvyajzo2h71oosodn',
                startAt: '2020-07-31 03:20:26',
                endAt: '2020-07-30 23:18:57',
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
                id: '63e94615-5741-48f8-8632-fb55e367792f',
                tenantId: 'ba7aeb09-5232-4001-b6f0-10c0d1c492b1',
                tenantCode: '0ngl9wmxvorywn3ywuksvqt0nlt46x53l0vk0cdcg3vq8qhaxd',
                systemId: '52f4eaa8-2be9-4460-9fd6-cc50c9a18b6d',
                systemName: 'in0gow4wwkxy06aou3j4',
                executionId: '8c80c82b-c12f-4e1e-b5e6-9eeb23a16783',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 02:17:07',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-31 00:45:37',
                status: 'CANCELLED',
                name: 'agn6d1mlo8gh0n60tx6x80c5d9f7r1rp1bqc7sjz0tx14wy6kpbm9adt8u7duesndp1ryzf4pz59a28hejaltr8wslr6rzbfa2d1vz80cqlv9q7eyr51iwrcd3y6gb5y5xcflpe4grkw70gghz97j8djzzpt1dhzd3qgeza3bq8mqc9awx5tu4nyqky2ojd1j3zo4w6tck5e9uajvh1m4ddt213hxhtl7qz7bm0raatl13njwnuret5s9em3upx',
                returnCode: 8532482715,
                node: 'b7r4jxuq4h4dl0rbb5aqnwz2r9he39z5om8px9j31uodmyo5hz75hukiko38snzl99yp0l1iwrt8j1ts1tkgl3xb74cqosgf5agidlja67y5vkd5lkk8dnam0cm3e5yhuftqqi925fgumqpq8ozidp0y23wbw1bk',
                user: 'tsxaqx4w678pihikm01nhgt7hwp022r5vusax30wlnpg7t2g0h19hzxost8ip98ry1wk4zb6txlnjxxpckb7acgumpjmp12546cg9ql9k4i9x9k3zc9ra35lzarzux54mqhisemuwfhsosaw971hcz0t8z2x9z4nsut26akqy926klpcu3sv746d1h72uvhk5nmampmv71m60zvj4evuhuk3je5zeoibhhzotk8x0rstkrsrgorsuj58xl5p4lm',
                startAt: '2020-07-31 02:13:08',
                endAt: '2020-07-30 20:49:51',
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
                id: '63e94615-5741-48f8-8632-fb55e367792f',
                tenantId: 'ba7aeb09-5232-4001-b6f0-10c0d1c492b1',
                tenantCode: 'ryl0d4odpqbq4oaevb2dajf7ptrhcmkmz6c4prfbmppf2immq8',
                systemId: '52f4eaa8-2be9-4460-9fd6-cc50c9a18b6d',
                systemName: '8phpwd53vo5x90l61mbh',
                executionId: '8c80c82b-c12f-4e1e-b5e6-9eeb23a16783',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 03:00:59',
                
                executionMonitoringEndAt: '2020-07-30 16:15:26',
                status: 'COMPLETED',
                name: 'lvwuueko2xuuu4wz9jb8ya3ptgvui9rdckyoxm9kxd2rb0hq4m01u45zflotgc3ihtrnj27jk9m42yv4hip0s0u9ky1oi0l9urffpkf8nio277t91gpm5u44r0kjvhnpl8wup4dwmbyffc08a95wg2dspgqnvcx5tozu236hnjsnha5395lke2o7fqc0m31we845wmhkcbgskvo4fz6omdvkruq4l3daugqtm2v4kwrjkztnqk1ceb2wh5buw1z',
                returnCode: 8300438519,
                node: '7tlo5dm34hp8xtvp4h18y5wemkxmkic75baqa3c4hfg10ughtatzor0dth0wlb8vqhxuzma2aljzhtmlhdetrjm3drotuqo65lqj9unimm9d45zu1dt1m3h2nsx9ysyjieo4i558qhdduzhe497po03c0xfdvlex',
                user: 'fgqnv3imt0tjlcaedgaur57y51x3zuu2cckgvgee39e59nmecdu57t58ei7qd8kokz0kpfw0ea0ofopizzh9e7r8gadx9dodwz7euk78gyj4z2aamvf70cpbllky3u9k28g2yuo3agq1pjht17dz9o3bhrkjkvzmlr37188e2isxfja1otx442n5hr2j5cpq99fxxic83psdhio77o4eylg6owd1dg1z8ciwyfzkaas7ou60nw10kmvv69ro05r',
                startAt: '2020-07-30 17:38:11',
                endAt: '2020-07-31 03:52:22',
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
                id: '63e94615-5741-48f8-8632-fb55e367792f',
                tenantId: 'ba7aeb09-5232-4001-b6f0-10c0d1c492b1',
                tenantCode: 'jwj4xqp50ea0s7inehcep8mlh9cbu2d3i76kh9xpupewjgyh6k',
                systemId: '52f4eaa8-2be9-4460-9fd6-cc50c9a18b6d',
                systemName: 'pvmv30es5024zl54p0c1',
                executionId: '8c80c82b-c12f-4e1e-b5e6-9eeb23a16783',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 15:40:42',
                executionMonitoringStartAt: '2020-07-31 05:53:24',
                executionMonitoringEndAt: null,
                status: 'CANCELLED',
                name: 'iivybo8wmmwbigbuddnd21ryn9ydmaer5t0qa365kbhypg546icrejhwzek2y1oh2q5ismgrk682f9vvotuqr9o3elb69dgw5y2fojftgeqeu1qehj6vujmgnq0ky18ivi4taq9ncy5ctdgvv7omjeqw7fyycmf8vqfrwwezitha55ydzhxyhnbq4r0l5o76l7toyyj91jx9o57c7qoh2zm1bnxso5vrkdn1uk0vkbdnkeal6gy104jhsdhydtw',
                returnCode: 2105033172,
                node: 'a0p6rytkqdiy2951arhk6a3acbv51ze9n3fadvja7fqrz3l35r0qj9gh4eq0u585108knlndhhqhqg6tnu73mpr5wlu4do92ejl9ooktsn4u1js0ytj249z2mj2fvsz456j9gtmoopvv8tkbnngwru9ocewo5xk2',
                user: '05scvk96nugnkl5329ri1z4y88dwagvxtloq5sdchwpy1i8yu6vcmfxwmxy3ih5tmep2s67fbl37md3x9fngqwxepqkkpyboc24fot67cfjrui86npp6wb9qvomk6j2phgt5y6m1rshge8wd8oa414d54y3f55suakmjoexqmgaxytyg0q5pr0qp47nogjldjhnfbn1c2273wbdgiyps1fencbp27h68h2w1z1hmmbpx2y6ncubi6ofn37bmtal',
                startAt: '2020-07-30 14:45:11',
                endAt: '2020-07-31 04:35:57',
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
                id: '63e94615-5741-48f8-8632-fb55e367792f',
                tenantId: 'ba7aeb09-5232-4001-b6f0-10c0d1c492b1',
                tenantCode: 'e4eko6su0j5npgp94jqed1p3q9ka5at4o0w068qiox2fxrk737',
                systemId: '52f4eaa8-2be9-4460-9fd6-cc50c9a18b6d',
                systemName: 'e8zni1m3ih6ejav0hk54',
                executionId: '8c80c82b-c12f-4e1e-b5e6-9eeb23a16783',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 05:38:13',
                executionMonitoringStartAt: '2020-07-31 05:06:26',
                
                status: 'COMPLETED',
                name: 'vvpjylshlv59jqw54oo2b89jp9olf7ofi4l998zt8raftwjqiqaeve4l9lbnuj113j7c62d35kvojk69xl7ks0nniufkhbh2zpijjyogf9a7i8wgukdhl82i0b8z957efk9kfaglh3v12wqmz8l01mb48fo2crm4uj7vklomjjpn6vi11h1afj1mvuiodafo34f60xtwjnm6vogg55prc791p2fx2id938b9j7k06absp99pit2gcnfty1xkkea',
                returnCode: 1870513502,
                node: 'dj5o5dpl2v03nuvvtgu2sr0jitaqizls1fv2cq5hjrp8bhfg0wpeatts2yvjit5fn5f8zuj5a7stpj9hujl7rjerp3a03togll70wsv41r37ocdnhbloveyp3pze1rivt4hplmsxelzab96gp8brb8z3uin0cwfj',
                user: 'hz3uo2cq410h9zotw96x8237cq6bno7923v6srv4f09gm76ovjs7ysh8bl2negg5ikv9j2t4pu8zfv9mqcspm8tilv0fttz86raip6iwskspg75w1t317tgw1i4a7lo5i2fl913l5fmums7svzcslpmdg1z8m8veo1myd5oeygfmeb3ji612vuqad51aovkqldhy94p4av5v6vmqdhva4074tdwjxu85psnkq5uxpc2l9913iaki44aksvwgog4',
                startAt: '2020-07-30 22:55:48',
                endAt: '2020-07-30 18:05:09',
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
                id: '63e94615-5741-48f8-8632-fb55e367792f',
                tenantId: 'ba7aeb09-5232-4001-b6f0-10c0d1c492b1',
                tenantCode: 'bywjizffuul6l8ckoh5695nvwj7e1loi1ppm0k6bo6kmq38tpm',
                systemId: '52f4eaa8-2be9-4460-9fd6-cc50c9a18b6d',
                systemName: 'a92day3amqajnw1x2w6x',
                executionId: '8c80c82b-c12f-4e1e-b5e6-9eeb23a16783',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 22:00:56',
                executionMonitoringStartAt: '2020-07-30 20:03:27',
                executionMonitoringEndAt: '2020-07-31 04:02:16',
                status: null,
                name: 'ms4pwe8sbnam5o7jnsohke6iro70fopttghs6ahv0awl24hlriqfi282m4j5axz36ijf5wneynz6txekfdo3lyrpmrtpt0ussvunlgmyyj79b70t87c5eorkg1487198zkdrnkju0grlzfhmasamgm7x0wx503kkb2eew9b8ka83ncgzm42lq7sal8l8jf7ifcy238fvtel2r3lievb4u5t2byi57x78a1mpidbtylzj1b0peafnitnb79kosa2',
                returnCode: 6197707484,
                node: '4ujlpjxx5hkwzdoz3u0pdn3krsvfc7zzppce36tubi8gkb2mz61m5bjeef9p6bmo9gzbwqubgdn2gh98ew6y0jdwjorw966i9nap74hexr86v8vz5t0o0fekoh7ps0yldx0ijxfvbaq8qk6b98zu5c16qhmcsjz5',
                user: 'egcstt1jjd3lntd4pex0x48mj9gmtsme5fhvuuagyhrcnhv6dj4zsj7rs9k0n11beclk2muv2lu6vjpsivsnrf74wa8o32nn51n9ua6bcfk1didtvp6fv05qzkvi9i75f6rs19w5awxv1zv4l7edm4w287p6d0dzzu7pxfh7jdq1f3gaxdgsfbzh3fp983x3cbrmnqzht0v661q1wnqdoy3mfvfzib4dnq28fbkn5sj05f20ehim7cc9tqontg7',
                startAt: '2020-07-30 13:57:52',
                endAt: '2020-07-31 12:09:02',
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
                id: '63e94615-5741-48f8-8632-fb55e367792f',
                tenantId: 'ba7aeb09-5232-4001-b6f0-10c0d1c492b1',
                tenantCode: '4srg1qi9o8969o0kuiey4u8894on1hb6hf8go7ygwaf2lsnwr3',
                systemId: '52f4eaa8-2be9-4460-9fd6-cc50c9a18b6d',
                systemName: 'w2f7moakkwu7a4cxy1du',
                executionId: '8c80c82b-c12f-4e1e-b5e6-9eeb23a16783',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 06:13:19',
                executionMonitoringStartAt: '2020-07-31 07:50:49',
                executionMonitoringEndAt: '2020-07-31 07:22:21',
                
                name: '3z9a0efnmb74g1pfxd0pql1g55cveg9fhyq21hk4lsyrsmr2w7l2h3mi7e3cha848ifdwidnqzpwft6l2v8mcg7wosuh5irldxli7upt6xglfh2amg1ie3jhsh5w9ha4w86xjnmj691vutulh59t3wggo781renh6s4lmpoxlv7smr0999mw7a1o59uhtpsy03cyg6m1nxsmtjq36mm3zumcaqt0uhpnpfw3jteuk9yktyb1tturaldkqqesbhw',
                returnCode: 6729049700,
                node: 's6whug49u3sarrh09x0au2rrrdf97hsym1fnvz0vsuoa31xw0wa2wdjoqall1jntadb9ri12aojkm51qsyqayzcbqa5v4r4j4z0gjx0vopexity0rme6iong3mnjyperq9xdsxizk0yyoxddchfbrj36e5e6lg4q',
                user: '78rzeie386tenmtw4wklwit9fmy8o7g45pu7fr1nz0h1eckizkfbdlwuimgwa6794yfrjnekil8y72l2bhokvpvdk2r46olyc4pr2k8o14scvy1asyl1xbn8n916ehp3oxtu338of2aqjjj2efelas6uk0elmbxef11z4o69qhs9mlybgust2erzr0hoadl9fmzvvuficio6gwp46aybav881hmlizvq8kyrlz08j6lcn6fs084plxk72e6ccqo',
                startAt: '2020-07-31 07:06:57',
                endAt: '2020-07-31 06:11:32',
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
                id: '63e94615-5741-48f8-8632-fb55e367792f',
                tenantId: 'ba7aeb09-5232-4001-b6f0-10c0d1c492b1',
                tenantCode: 'f5ilgvyn2hl52zrk22z910th7mocrkhsu0ykw9cnboip7avw9m',
                systemId: '52f4eaa8-2be9-4460-9fd6-cc50c9a18b6d',
                systemName: 'm6yhqm5kzsbaj42wx257',
                executionId: '8c80c82b-c12f-4e1e-b5e6-9eeb23a16783',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 01:02:33',
                executionMonitoringStartAt: '2020-07-31 13:31:08',
                executionMonitoringEndAt: '2020-07-30 23:34:32',
                status: 'ERROR',
                name: 'dwpebwy6hongsfi71azny025esrphe863sbsd8gq20v246aouukqyd71uqz2hrym1cguoslqug7qdlmrm0vxqwfnnivc24sqxarh8pemjnzlmjqnz7tj9751ihmaxy6y4ji6fmij0fqk62bu1m3pgl6obsxpkqbrzznihmyept48sgpncnefe1kyu0ukqz7wdtp3fmlf4z0qzputs9dc1uwoxqja9f1xc6y2i56oce4fr9fqmx8pkcjuova12mb',
                returnCode: 5803711953,
                node: 'bv8njtbrn8pai3m8xqym9f6zitzsn74eqauod81nktylbnyfjpses6bkqiwnh70b7ocz2n2lsslgxu0s3gbwqesg2vqrr4mhxocit8e1wblmff289k9i9r9dda5z5of0ixghhj2h43d5ixybyhq37oobt9xjsg62',
                user: 'bn9jvxhu62zeg8in1psgsizmpuyoc2nc65fuy9cjuu6qdy8qx7uqlouel9yoims41msxowhcjt8jsco8vkby1lkeksag2w789xzkej2k3gqqgd0yayppyegkkq4xp7jgauh5kyb2nr88oorypy5y0ycyldzq8h7cyoci76zucoysnw5r4szjwd2wkqcw6ewnjax8vrx3zi6bmgavovth2jhsazplulehqaddiewtjiynoqbtpnvvo2oa50slqxh',
                startAt: null,
                endAt: '2020-07-31 11:56:30',
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
                id: '63e94615-5741-48f8-8632-fb55e367792f',
                tenantId: 'ba7aeb09-5232-4001-b6f0-10c0d1c492b1',
                tenantCode: '6c7yhrcio0voxbbqesihjvfijv8knknjb7jcqeaficteelvayi',
                systemId: '52f4eaa8-2be9-4460-9fd6-cc50c9a18b6d',
                systemName: '1dyrq57wvo1paxcnxwl0',
                executionId: '8c80c82b-c12f-4e1e-b5e6-9eeb23a16783',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 04:51:50',
                executionMonitoringStartAt: '2020-07-31 11:17:28',
                executionMonitoringEndAt: '2020-07-30 19:27:36',
                status: 'COMPLETED',
                name: 'iwd0z8844ri4np990i3zp1rkr251zjktypybxupsg9rz9ypcng72vduscqbt6l82lg33d814o02l7gbhn774q3ii4jf0k4yj308a88nsn3q2erbzpxccpt4buhk2ro7mddwtbqmbxc2e933062lkc943yxvck37anm0lgzaucn3yt9nrjfxp3eje8crpduuak9at6wrw316uto0cb581e82lk26x9r809qmr63r3vh5i76wmb1d0wld9a1n7m73',
                returnCode: 6330817340,
                node: 'qasfw373vhvyh02qb6n9hxyvxlnlqkgoh53b28lozy8r52ac8x885nb21408t1mq8lur21ghumloiovm8f3vglwanbb5eybxuvilutcv5wkksa656ewgibj8f0ve45ipmmjz4fvspbv1cyozc0qztr679sr80nqg',
                user: 'a6jecjvgni4mcmy6teleycz8i5wv962qkd36hzg6hozx08yi4wn781kjsk19jn8i3zxrpaz5sx80xy2kujj9fojjz4crhln3rc4841hln3v952o9x6fp5dqedh5o2dgv0k2fmeh9no7qyi34pjqf2b5h9x0wrsujxmbbcreczqmamhs93cxogmpub9yhlhcc854kyewnavrkpq2emunvebaouq8wti32vog6m4qs3mzf6jkaxale3ky0cc6s468',
                
                endAt: '2020-07-31 05:10:13',
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
                id: '63e94615-5741-48f8-8632-fb55e367792f',
                tenantId: 'ba7aeb09-5232-4001-b6f0-10c0d1c492b1',
                tenantCode: '4ahvdef910zco05ckhdb7yjietc5q76tqxfqkcx7ovngw1es73',
                systemId: '52f4eaa8-2be9-4460-9fd6-cc50c9a18b6d',
                systemName: 'll6tr6eldr2t5icwfpog',
                executionId: '8c80c82b-c12f-4e1e-b5e6-9eeb23a16783',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 00:17:49',
                executionMonitoringStartAt: '2020-07-31 01:41:55',
                executionMonitoringEndAt: '2020-07-30 22:11:58',
                status: 'ERROR',
                name: 'rttuz9ww6hjbtzga5c9zi9ltlq56szw7qttald70bwh9ahthvg7a0wxdzbpvhugj6utetzhnbvtgmxng83za520un9402su6g7s5al0qy37fiyi6yzj6ksgl4fkjruw52c6jzmq6t5x2orvr3q4kq87oo3fv8jch4i1pmwmb7lsvlejg5w46447388zoqzrzbew5uxh4amlbqkugyci5gu9x9iuq00ctblqtvppchx7s4tvyzefogez81hs7rji',
                returnCode: 8572372097,
                node: 'a4gq6mpe7yhrjcefhmg306q96hfgpw8pa73gqkglihtiqtlpdg8v8000r62pl6ptdnlci6hrli0n8rcmc0rv1pby8xi3f8hslmvvpmsoc6fhkepx37k5mid9ohlfxgadjnwkavo5rwznh2xafplt1mflpzvgakxb',
                user: '2nvdixcwkmgqix4p4wpv7lninyinc285mjn5hqc4uu0pbzt83mt27jut27apl8odxc5secuzxztni64bcw979prl08fjw0fdz9elbgpf2j9392h6dnwoxo2e6en4viyd0zjc36vhsfti0v13f4azw0fa9am5715tloyk2zueetl80rc739jfheae6t66rtv013xpks9oqvvu09qq8t965gk77r1ny63t59um3z1ytmcdreowxyfah9imcfond2c',
                startAt: '2020-07-31 04:41:29',
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
                id: '63e94615-5741-48f8-8632-fb55e367792f',
                tenantId: 'ba7aeb09-5232-4001-b6f0-10c0d1c492b1',
                tenantCode: '55o2pao6wlm92q6ktnyp5jm7t6a3zun0g5gsi4uyladh8a40kq',
                systemId: '52f4eaa8-2be9-4460-9fd6-cc50c9a18b6d',
                systemName: 'nifw7ov1ht4rmjnvd9eb',
                executionId: '8c80c82b-c12f-4e1e-b5e6-9eeb23a16783',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 10:23:03',
                executionMonitoringStartAt: '2020-07-30 17:51:26',
                executionMonitoringEndAt: '2020-07-31 00:38:02',
                status: 'ERROR',
                name: 'tn4rpiwrcyiqlrs20y09hsvt6lgp93jcxrqxewn5sbrqi67ocffvfmohqte3kb9absbv7ztrf7t1rtzswipl73r8ughypjsh37a76kcbd1oyig4egz6gmxemnqxaofr4ik1ntoe3b085lpj3vma2ucohtceol5qtjcvigpnzkunhq8u12ntfe4scmfreb2jwae7m0mso79q43i0zaevhj9cxj8io68z57mwf5kfcfdloh3lrsfq2gl8j99xevc3',
                returnCode: 1300129183,
                node: 'q8bi6w6qeta9i7sldi8var8yvhevr5rb35eg2hmmb17mhevsht8ktyizwcv8gwfojbum5amitkfj0n597ddtccmhs4xetixn33pr4xlbg61g05p2bgjdvyz3yfmvrpa8j8vpdf7kinugkm734h0zovp7my0r38ec',
                user: '3ejeguje9ufejz60j5fmf2up2m7yb6r9pzqtnzfxmlfdyta75rok9agv9vhbnrc93vqjm5pbmwfjqje6qxsco82u1miq11xhlschqe3kqq4vpj9nu75juwojxvkuh6yj3gt2g5wnu2d4woafwua87vyn5yahzc6lnb7kptecm5cpk3x7ekbja5vahk6zf4g6pvwml8odgj4nhw0dagt96azxm1mx6bwnuidibxg27htmhiadte1xicsqgyjrwt3',
                startAt: '2020-07-30 19:46:12',
                
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
                id: '0eyqnwjvz6fdljc5m4gf6gsf1ozz2jrmwh0s2',
                tenantId: 'ba7aeb09-5232-4001-b6f0-10c0d1c492b1',
                tenantCode: 'qjdy1r6am379r53ioyahj5uptbyg4fdl6mrwolv9wbmb67ru9j',
                systemId: '52f4eaa8-2be9-4460-9fd6-cc50c9a18b6d',
                systemName: '4yqwc5bqaqgspkndw6bq',
                executionId: '8c80c82b-c12f-4e1e-b5e6-9eeb23a16783',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 23:43:00',
                executionMonitoringStartAt: '2020-07-31 00:06:45',
                executionMonitoringEndAt: '2020-07-30 22:21:09',
                status: 'ERROR',
                name: '7p45rggwj6yg00hr2eh9pw9n69f2fz2mv1a4f6a6rw1ohsqjjc6zh8n7cz30bznp92oime634xesqt70dyl5os5l12vif1vsp04085nvao6svy1vf0lrzsyhyw96br20kfczqw4wo0lvhtmwdqw4en2f2ywomxw1eioolfucr9q2e6aoan2y8rdzuo0pdrwyz4mxmarcevl6sn6bjygotn9vyr8hj27tg3cyuf916vse72ile2dwb9ywushkdmk',
                returnCode: 4760280222,
                node: '3jp82nb77d8fynrcpcvdgufiij7wj85hsm73j0o51b1lu962dy1gaj1zxojszz0pks9f3sn5yt4g6b7a79bjtrszqtapl6s3qhswczyx9qtpnrsxzma5aqw6hslxq3q6pc8fdapwphw9vaxinxsdcx6ck1vl641l',
                user: '9s6lznep7shhx2qy1oxw5l8u0ys2c4rxjzlmj3rvpjqetm6xbypph4sta52upoh80fv3gsqiiqiam7ijcxazgz9ed1b0c7nknsscyl1w7ct0tizu092qu80252549dpchzrunr9aswpe57d2y1ft29qb10wnpomucnid1d471yp8iz233b1tsrr06tz7afpxuaarnbc72p9xacr8lu8zta5of32yt4h0xsj4jz7eazfvdk45h2j8obj5srkkrz9',
                startAt: '2020-07-31 03:27:20',
                endAt: '2020-07-31 02:01:46',
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
                id: '63e94615-5741-48f8-8632-fb55e367792f',
                tenantId: 'c08y0osy47sn76vde7ugda8axlwtyifxrhywm',
                tenantCode: 'vfu3pv9e0tsubudv71nr6ewwyhxpbnocriynbf9gq97xsi3n3w',
                systemId: '52f4eaa8-2be9-4460-9fd6-cc50c9a18b6d',
                systemName: 'o8moa4zbfty6qnekajw4',
                executionId: '8c80c82b-c12f-4e1e-b5e6-9eeb23a16783',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 06:09:17',
                executionMonitoringStartAt: '2020-07-30 16:01:42',
                executionMonitoringEndAt: '2020-07-31 00:12:33',
                status: 'CANCELLED',
                name: 'n3i0ozayoolw0pdk6y9isra9df14865a5u9dgtgb9ct6q4btrq94rk1pex1pxmlq2u95blqaqiud26qcyxjpknjz99frcognmsv15s4fxji8adk467tm0uvp6epi4ljtplvvoaitdgnnntjxd81yhqd4l2no3vx9f7aq80lq9la6kndw4vjkt7vmauxx762qdjr9uqqbybujg76vlko67es24imwxx5gx2ddlytkkavbybuf4rb7qgwgt0fjf3k',
                returnCode: 4058147208,
                node: '6e70wn52kyzu70kivejlh7aso33yk196y5fcejohgp1xjv72pyd6o6vm9dpt5zpit408j42afae072colqp0p2k3dq9lf4uucodqvnqdg92fubosnyb097olgiajf8uxikabdh0yjhjs5lsiixoz7rawbwrkstj5',
                user: 'nkfv2qfxe26jhkvlparjiysh0xkxo5tzr0mx1x5p9bwhyaqtuonv2znl7ax6lfxez6r2e7yn8aygbef5wdw0q31fqmc0opp0u45pt6xkz8bwsod80mxb1wio62b3j8zhia05zjwcwavu73r7fq8xir50wr3imsr55wo1m9jjs3iu25tawi477m7vh5k7g4c0zqhb7uture4fhtvziqn7mostd18y67l4fk7fraijegcxozyi90c6so36588huqw',
                startAt: '2020-07-30 15:37:22',
                endAt: '2020-07-31 00:04:59',
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
                id: '63e94615-5741-48f8-8632-fb55e367792f',
                tenantId: 'ba7aeb09-5232-4001-b6f0-10c0d1c492b1',
                tenantCode: '5gieelo90jbvnkme3jg1bwh9idj2drss84d0nc45v7qwbbffum',
                systemId: 'wos6rmkydg99c6zbdshfb837ml7yvd8o62vkr',
                systemName: 'sdsegjegzkqd6acrdir3',
                executionId: '8c80c82b-c12f-4e1e-b5e6-9eeb23a16783',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 21:38:15',
                executionMonitoringStartAt: '2020-07-30 23:23:08',
                executionMonitoringEndAt: '2020-07-31 01:16:32',
                status: 'COMPLETED',
                name: '73xv2hmtyamg8uworynem4qw9eenq2youpabkn55rpwbr5uhp3q5hf347yfvs8bluikoiad214f7xetlyy0h4dkzwroc3czns4c666jk3y92hg5oh6998djjsccwo5jos7mdqaaenc58dse8czi2xw25yvd6n36mt62tq1jfbrdmtbaia3ukg88jbugvkg6dbplbqld0bbvc9igub6xo7euaj89brh2675kiuksmqhugiq18h489twz19ysrvbw',
                returnCode: 2277724272,
                node: '26depq2lfh7rr1oparlc7lj985tzwrxgq3trhhymtcpp2ecfaiy88dap5em68d0hpglbghweisd9zto7gox5txncc0xs1tt0iygcr26o83mqmakekk7ym2zir4eviqsao1uzcw1jo4w6qia8on9cnykpacpq9k6e',
                user: 'ctsgpbwma4p9ujdwaw51fd643aue2e7i4ev9cmla3g4p44q21pflj7cbw522f2u6s6jkwyfhzqlnb0l5w4qgct2r6k28ryxoofbu4zk6dvlr5quux1d3heaodcn78wq0d2m74pkjh9eg6aomoqwo24en6okkwaj3kpsdvb2pealzww0lmqetwn2c474prb4qrklo64qw7fud5qvtdsrl466oe6og1ifi15d7udtf4ngad22xivc2cw9deba26kg',
                startAt: '2020-07-31 12:21:24',
                endAt: '2020-07-30 23:54:29',
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
                id: '63e94615-5741-48f8-8632-fb55e367792f',
                tenantId: 'ba7aeb09-5232-4001-b6f0-10c0d1c492b1',
                tenantCode: '5bqouj1tc4a8a7htfrojlkkhpypxl6e69tz9m5ebkwaczquqrw',
                systemId: '52f4eaa8-2be9-4460-9fd6-cc50c9a18b6d',
                systemName: 'nmty9jerer9ujq0i1gco',
                executionId: 'qg49alnqgvx378d7ts9bnsfm1amoaj6loykle',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 18:36:46',
                executionMonitoringStartAt: '2020-07-30 20:31:10',
                executionMonitoringEndAt: '2020-07-30 22:57:51',
                status: 'COMPLETED',
                name: 'm8bu88639c4wlde7gek5qx4g5wfvlg5d1gmwwh9czyqod9ytqa52546ui13qoqubl6enmszohm9r15ks9cqkrgbm827y56pd6qap9ulo990obimjnauz0a1ow1c01sxm140mwwrbs0a3a1leyba3e0vo2n554fvkvburace6v9x0o9zt78qp7qd72qzzexeyy1mh4oif5fj964z01mgoovhws7ghtxfjqhias6scugvbv37gxwo4oaze3zc8jdg',
                returnCode: 1973671103,
                node: '63j3aqaenje2zvsqb18cxh0ujzbpqpygtc0cc2x17qizqoafp9s8bbx6dwwo15iaar38orby0ilgjprjcjxvc2mk4m55xl3vhemwwq3bizjmibrsgpxykf6aen48qiuy83ofqlu1e495ku12ovl7qxkghvzisqpi',
                user: 'gj4ty8sl3m2qzxad73lqzssy4lt1zie4aa3n1z381hbve3g9ybrowz9u72s5vynh8zmx5zp4dhbk1vx4de5zj1gg00q7eb9tjoqgfwmpc1doxcxtba1vi2d4mfunoz5559bjnbjc2y27l7dxd6scxm8dua9wx74b8o96nt278u19npp4kyp4ekmce6vcsy66uk0gmoyzlr4xyhfaljmmaxwv96xcbhepy4p862uw2pdctw6n01ievse3uriq37z',
                startAt: '2020-07-31 00:49:40',
                endAt: '2020-07-31 01:48:28',
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
                id: '63e94615-5741-48f8-8632-fb55e367792f',
                tenantId: 'ba7aeb09-5232-4001-b6f0-10c0d1c492b1',
                tenantCode: 'pw8knxnzhh2z3bmigr5d7iuvz2rasz4wilca6wnv6ddgilrpi1i',
                systemId: '52f4eaa8-2be9-4460-9fd6-cc50c9a18b6d',
                systemName: 'w7t66n2srsql7mwk6jrd',
                executionId: '8c80c82b-c12f-4e1e-b5e6-9eeb23a16783',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 20:18:39',
                executionMonitoringStartAt: '2020-07-31 08:45:53',
                executionMonitoringEndAt: '2020-07-31 06:54:25',
                status: 'ERROR',
                name: 'c5f4km5i4d2gw4hbmk92a782ncvb5gd1pe8k34cpknsrfr6oo594zvtxey71fook47r09qx2y0etompebu5ey84tbb4pgp7rc7a7pp3gc7fh70gjcwqkc2sp8gnq54hea9eth3c8fgjpjqrm8skazkg4hqaogwurzrinppzdpaur2o0wgu2ivpqbaw5go5xbimryxdckwrowx7osh0s1tn1nzt3tbhrucjof2jpiuoth61hq1zqlb36ssvueep8',
                returnCode: 3910201327,
                node: '6pm7qexo2g74cdmnkcw20v7fmdqfvpppwyhb79xe2b7bna14jf5cuv9rxai4gdxs6lbuaqz9czdoywla2kp9h7zgj5xfqx1mx10xykfy5zdjbq5tgsjidjxklrwurnj12iaqpvipvjfanir1b69amws5csfy4nad',
                user: '16a8pw0wxz79yw9rh3bd38m857pq2o81ku9f5ouv41ycu3z92fcrh7mi1x6pkakzr0z90sljb8ocqohruo9lgpvj19fwzi2peaomp543hcxix4q62bjszm7o5arky9bmpj0meihr7icutwiggyod1ol6j20fh1k6nrdgllbved761sjnufmkw079acmrp47uriv735he5ykbh86re03roiuy86d53323159nuzpi95amwlq5hoxitbfo88pyq8r',
                startAt: '2020-07-31 10:11:16',
                endAt: '2020-07-31 04:55:28',
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
                id: '63e94615-5741-48f8-8632-fb55e367792f',
                tenantId: 'ba7aeb09-5232-4001-b6f0-10c0d1c492b1',
                tenantCode: 'aumf3cvctcvymj4d1vfjge9cntjbmhacvrrkf108u0cx56lyxd',
                systemId: '52f4eaa8-2be9-4460-9fd6-cc50c9a18b6d',
                systemName: 'caawqjizdod2wq12olsqx',
                executionId: '8c80c82b-c12f-4e1e-b5e6-9eeb23a16783',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 22:41:03',
                executionMonitoringStartAt: '2020-07-31 01:42:19',
                executionMonitoringEndAt: '2020-07-31 09:50:05',
                status: 'ERROR',
                name: 'ccpk12jymbio0mma1hmluev0x3sfjkjpzl4eenoe8j4fvu394douz4e8u30ru09adrkq4ngzu604nxtl8mpdbhm9byzvzhtnassrlaixj01mhlowk6d16xcfr42c8wjpxdayek9fqlmr44oxxkxyva209cqh1kudx56eq5be7a9wlae2jci7r4clborg07j2e35zjc5n08x5v84hkoj64qesz94xpiun53jjzth0r5o0y3nf83xc3n2kcv4n3r1',
                returnCode: 6968645985,
                node: '7dll1oexx7du1501qq6kpu4nmss547bq1gmnqflsr8wyzu9u5ecbnk231dv5c1412ter2u5xels7qb2khmc625xfhs052u6aznjy5he0dvlju4x3rm5eln5jmxxqxfy17r3p2ltkciox46fpnggrpbill5iwk0yk',
                user: 'fndagu2ekdt2hddj6ubcqaxl4mxv9xjonvvvmsp2gnkqr2g5udsnyz70cl2i099hd233hlfzzqwi48z9veovoh0sfeqn48uk0gugnmh5a2upq6tsm98q0t21juejlqdncmwfktpygk0elejla9upzzzgro7avd0pg4yat91p04zqhq46g8egrowrvzhj96itqy4tm8m6e4vk5qfnee0664uv450oqec5exgo9fsqumitu00x4b6wnqt8yqw9duh',
                startAt: '2020-07-30 23:58:46',
                endAt: '2020-07-31 13:25:21',
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
                id: '63e94615-5741-48f8-8632-fb55e367792f',
                tenantId: 'ba7aeb09-5232-4001-b6f0-10c0d1c492b1',
                tenantCode: 's3ttd421hqzqe6ln8b1ttm3lhl2jnjm4sjb3jkslnoev4qk9ut',
                systemId: '52f4eaa8-2be9-4460-9fd6-cc50c9a18b6d',
                systemName: 'rkgf47psriu8ma2lkg6i',
                executionId: '8c80c82b-c12f-4e1e-b5e6-9eeb23a16783',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 03:35:08',
                executionMonitoringStartAt: '2020-07-31 01:42:58',
                executionMonitoringEndAt: '2020-07-30 14:49:36',
                status: 'ERROR',
                name: 'o96hlu0irbz70n6mrhcv89dmo609jj1pbvkqi9qd1ez4czw0sackj6qbxvhcp56plhwmnmxgw7p0qn1pbkfynnxg958sx0ytmfw2y8jt5xkx8i81htgh0pj68zt39rdbq4v0gk40f97qx3wc59r40j8tb2w2vkhspmj4jfmwb8fujjnh6u7vao5mhyx26tc31cy1z39z3xoy3113gvk4hcfglkj1qwxdwggmhlpgk2nqrkiam52t9pxvaohqo6mx',
                returnCode: 6123141510,
                node: 'ewodp9ninr0k2e9j5c6ffbzymvo9wp2jktqpw509oxjvdmbz5j40h466koqcqvbt8dj7ghgvrba37ghl6zpkl1eldx6lt3lhlkv63f28u5h9m7b0yc9zap8770cpygm9mnnzd3lv1zl9vg97fwlu76ah5davi0pe',
                user: 'izn4szgu15hwyioh4jnipdjyoe694i3iurdvi19x5y9zl3706t24s0qyhet7v1xdy21ew425rtyrn3ihe71nf3vvfmau86f5iumx9hgb0mptjt85f7ke198s31sl8b7c65x8gpkizp2bewizf7nhwvaan3kmey3jy8d543k2acb0od0kb2egpi6xxf2qhgrs04sjp7ype1vcogzcg1f2sk8pggqzdid5yvjuq4pwbq4n13w00jbs7dl1fri6vub',
                startAt: '2020-07-31 09:12:26',
                endAt: '2020-07-30 16:08:12',
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
                id: '63e94615-5741-48f8-8632-fb55e367792f',
                tenantId: 'ba7aeb09-5232-4001-b6f0-10c0d1c492b1',
                tenantCode: '5a5t0uj3q99785d7nv3ba0vuwgcdpc7zldo41iodta9isx595p',
                systemId: '52f4eaa8-2be9-4460-9fd6-cc50c9a18b6d',
                systemName: 'rehwkxi9xizgshnoeia9',
                executionId: '8c80c82b-c12f-4e1e-b5e6-9eeb23a16783',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 09:37:37',
                executionMonitoringStartAt: '2020-07-30 16:59:45',
                executionMonitoringEndAt: '2020-07-30 22:00:32',
                status: 'ERROR',
                name: '40rwepmcdje8t8foo026o8qx9hbknydn9arftcbb1btcgc0t8u5at05exja4whpnmxi6hyj77sdvv3b31oh5mdywf9jynq2d1fg6eog4kkvwu4nxieyt1bv95wdeuhb4wmqzuox6dzn75of4uno7qwp3v3wsi9rul2n12btt2odx5q4bl309l19gdkyhiqmfxdvjj4bhtjbtngr23bkafzjshe5fjbrqd1g1u01dtl3abdcoaypfgv8rkuf79th',
                returnCode: 89202261328,
                node: 'kn0z6mjpze0bowgdmoqac9k7cj7hrckmc3clkdfj235roq4ih0l072t9syg0p0aedc2f6ha039fypt6w1dk64ov7sr70c010j3knh5c782up0qnx0abw0iksv2ckithlmyu49316hwmk9qiheinvozfys8fnlttp',
                user: 'jp821zh2ci9waxyzn69bry0yehpaatql9vyrsztn32rjdm3dvs7r9mux7ptcucuydji2s6astjrjytda5rdu5cnqs9hu4p1jahh03yf2b0w1p9l1mqu2xbnvntr3yldps9b1b6hgmyyacrk2nqtcnkgxy5ixpo7k1ec3u2woyeoi7phsm8nvaabwkat3sfml940u1xz4w8vislqc2by7n155f9ft98zhrncrs8sy8al7vw5pdszlo36ij03ycf9',
                startAt: '2020-07-31 12:41:49',
                endAt: '2020-07-31 06:45:49',
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
                id: '63e94615-5741-48f8-8632-fb55e367792f',
                tenantId: 'ba7aeb09-5232-4001-b6f0-10c0d1c492b1',
                tenantCode: 'htqu2wqju493phsw06axu9zpva9mz0bvpw1rxughji73vy8jt0',
                systemId: '52f4eaa8-2be9-4460-9fd6-cc50c9a18b6d',
                systemName: 'g4flghjj20fm5qwdufwb',
                executionId: '8c80c82b-c12f-4e1e-b5e6-9eeb23a16783',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 00:39:42',
                executionMonitoringStartAt: '2020-07-31 13:25:16',
                executionMonitoringEndAt: '2020-07-31 03:52:10',
                status: 'CANCELLED',
                name: '4y7ysdb048tey8gdm8hjkbzpnv7j9pu28w20xvhjacxem0dqzxy222pff8nbh4k101xt7laczbpcmqiu3jo4ko9g16kia5avkh5xdow3a4yjrr9m0essdlptjn45kbrf2dv53q97880t88ph325lqpc6xntfwfzd8l0ofnmz9fde4a1fwq6by5m4x4dcew2vot8bvyv6yihmtz2dk2o7c8du01m80cfaqggh4gf4kllbj6vvr5vaoudp5yekhko',
                returnCode: 4044102278,
                node: '4zhid6i0c6zgzftdwg3pbpuk6qjmk3zi3im36il8w2hhqfxk35nr0qnwjne0ngsdtnavjl125og2bcrifpjtljt0bpd1n5xw486ri5brz20ezm5x2k96m1xwaaatdxrbhpnj76a1npzzxzpipu4jn5dmifqgarmg2',
                user: 'ax9psaqpkt3z6hxjq53lwzx9k5ntkm693092wmc0b03oms2l4blp1jolnmyvzza6fzwrpp456wkh7ml1i61rkifk4s1ovj4drkswsbf9ez73xvcclawk8k7jjh0zr19ozrk752rrlzocx9ky3896jni8t2epz56uqktpc7bsygqb9jebozhspqw6aukrrffhcxj3x39e0odqoki0lv0hocd4udlmmcvuqxxuqlcto56r6y4l9okgrwtg7633fk7',
                startAt: '2020-07-30 14:57:20',
                endAt: '2020-07-30 21:46:12',
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
                id: '63e94615-5741-48f8-8632-fb55e367792f',
                tenantId: 'ba7aeb09-5232-4001-b6f0-10c0d1c492b1',
                tenantCode: '2646whkpprb4y42x6ehsjgqot791dr11vozr3m2tb6x4i7k4je',
                systemId: '52f4eaa8-2be9-4460-9fd6-cc50c9a18b6d',
                systemName: 'divez5syie0ojv74i18z',
                executionId: '8c80c82b-c12f-4e1e-b5e6-9eeb23a16783',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 10:19:10',
                executionMonitoringStartAt: '2020-07-31 07:06:52',
                executionMonitoringEndAt: '2020-07-31 00:59:47',
                status: 'COMPLETED',
                name: '2hn96tvm3y28pusqr4jdo0wiiu0is9t7bok0g3l9p7ybqea8467iy0podn1klpf2g2hgcqjq38f1mvoyioybx2tr32r9888fjlhd4cc6fcdscd5dj5qssehlulybzvrgxaidyh5q5so4f7l2yetw5497kid48thltq76i0i2nnxszosjfrvivitfbrjy482ymizk1hkkkkzez3gib35cojn8igm7vchmck15hshspyuugwd8pvk3b3oh3wrb5up',
                returnCode: 9937648529,
                node: 'p5djxf7y744xf2jctokzazkg741hh94cy8j2sgo84elj727q6vouv4al15hqgqv9cocci10w20zc874jz8fjey2tqocmnosjxgsffgzmp5yxtzzqdauko6hytuwflrmh69bvfe9z6xdixfokdd26oy7mh8jdtxyg',
                user: 'lfs99agfrzck60vdcndr4fmhz5hncg7m8gekh72lr3aitzueg5u6h35wx32d2pvd8xkxw2ypf84qyaxd430iva0bceltxw740g7j0m1njaix7k4kneqn01tbk594qprb1t1f2r2ok4d7b3rcf6dn22ikri90kz6jboe1v8adaej5i0a6i8eexluvmkv671pzonresw441l7f0pjay4s8ex27izfeglr6cy9tz8k7jt0e5pydayispt0btx52i5rp',
                startAt: '2020-07-31 12:57:30',
                endAt: '2020-07-31 05:52:15',
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
                id: '63e94615-5741-48f8-8632-fb55e367792f',
                tenantId: 'ba7aeb09-5232-4001-b6f0-10c0d1c492b1',
                tenantCode: 'd13rtdybotwwqw8k6di4wbaadkj9etulqqe70xyi8xa6jc5x14',
                systemId: '52f4eaa8-2be9-4460-9fd6-cc50c9a18b6d',
                systemName: 'zslsrps64wm189bh360b',
                executionId: '8c80c82b-c12f-4e1e-b5e6-9eeb23a16783',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 08:32:26',
                executionMonitoringStartAt: '2020-07-31 00:10:33',
                executionMonitoringEndAt: '2020-07-31 13:01:15',
                status: 'ERROR',
                name: '35l06dm2mzcm54pgd7nqu0slryt2od4zux9ob90wukr6n7pvv7eey922f0hu2o9ibklgctqrhil9340cs959kwf8veb7ffhxz7tnogmzoexls9uhskbvgumws6ewg8arv4u5eix6pix0y0744e3d2wtinhzrvoq521te1m9g2axcig86rghuzcaitogk937f76ohfb6cf4zf3gdusgs1scnabt8c92m8h1r4belqugegsllqxkrz2w9oqb75sn5',
                returnCode: 100.10,
                node: 'r5d4qj5np1wpifdlx3t1w28xtae7l7svqcqxk9bckjotf1208y09lzioftua3mf9uh05xfi2c66d2lfuwabgnjnhkmyai1u1i85e8fcxlgv13zin2l6fasp1adw3o8iutyvhzfsbmajjusc8xm3x35y51juze9t9',
                user: '6qc05wpig3c1wlm2zunlcdvzp1x5d1on6my8df1jsrbw3don0dvx8ahmb7gt7nzx9orm5qyzpuqbcdt8zmcbgdhlb6po0rrojcsyglsxgzobgz3z5kpnrq895g7vb78xk8n4oienawtziye7y733gmk6tx91i0yw91udshn3lijosmbxz9kdwcs3izywao4whfhaispv9zvesrjqpejr1xk4ouee0mw6820clwt9tc7j81sejr6to5kslyptuoy',
                startAt: '2020-07-31 13:05:50',
                endAt: '2020-07-30 17:55:42',
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
                id: '63e94615-5741-48f8-8632-fb55e367792f',
                tenantId: 'ba7aeb09-5232-4001-b6f0-10c0d1c492b1',
                tenantCode: '475s7yc9ggd22wbpwow4qfctpvnntdp7ubxh5uvxrpeboa55td',
                systemId: '52f4eaa8-2be9-4460-9fd6-cc50c9a18b6d',
                systemName: 'pi1juutzm4b3wafvqv01',
                executionId: '8c80c82b-c12f-4e1e-b5e6-9eeb23a16783',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-31 04:27:47',
                executionMonitoringStartAt: '2020-07-31 09:33:58',
                executionMonitoringEndAt: '2020-07-31 09:38:06',
                status: 'ERROR',
                name: '7lbv28csmmqq0oqzvswj9sa7yh52xqyxkpb68xpfn8se41bywm4iwhazv23x7wzx0krd4vmmimhmnebjhw8wprwzf0ch8a3zm9c2vm8lajhvkj3u8yirznrlltup70h8j4hdufggot4owgr8603qcm39or7ihluhhbpt3alcslxoba1rk684ehe8ncbyagpg2pgrbxob9l91fjfwy1lorevzgaw2ylotaixjujtdfzbx0v2pu5v284hoi3djcf2',
                returnCode: 4883677103,
                node: 'v6gvnc9wq0401wbznv089u5mi7t592drqnnubd6mt0rlzzkas2jo5otu2reny7ixyzfxodeqpo03awhyr0kp91icxcz78fbqatt7pak3vn232skq5u4v3sxui3jq4u5poau8fo26321pvgylj86ooixlve5jjgza',
                user: 'cmuh98boa4nn52rlblonky8dk8lpw6kfkcshnfidbmnc9e4ixtpg51zey5r4mri7ac6cmzwrvg0fv1jnuupx1q9o7tadehkpfz13z4m3scvolt6t6m7k49ex7faz5gpnxc7gnzaknkul1ddzr6zzqcn0yuiig9ji9kpp6231khtk91iamdzl93lgbodzck9tczx4bj3jlljepa81397fbi197klu81mf3731sivnfyxbq7hkl2rm36tljlz6pms',
                startAt: '2020-07-30 17:29:51',
                endAt: '2020-07-31 08:22:08',
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
                id: '63e94615-5741-48f8-8632-fb55e367792f',
                tenantId: 'ba7aeb09-5232-4001-b6f0-10c0d1c492b1',
                tenantCode: '3olnv9p7ih3t2wcdd6lj8ileqn4mdaice5ge3dzoght1wlpg6u',
                systemId: '52f4eaa8-2be9-4460-9fd6-cc50c9a18b6d',
                systemName: 'sgq6uqzyaagbq9mr9136',
                executionId: '8c80c82b-c12f-4e1e-b5e6-9eeb23a16783',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 11:12:14',
                executionMonitoringStartAt: '2020-07-30 21:42:51',
                executionMonitoringEndAt: '2020-07-31 07:29:18',
                status: 'XXXX',
                name: 'fjad6hlud703950wzrvg7enye818pqq21mcwsufrkatf048bstnann4nt8vc65eeqa8liz5a20y4cnba88ka2zqtalgj7874e53rjceqkjbjbg6wl6jipnvod4vy6fftphcoa2i4kjs2f89zzgt2uefcxfizt3qmwdlp3444bcc3n1u2ju73ufdt8rlsk2fsuja4hdm3mh64m2981b5b6qblg8kcgaftdr3aynz9ihyjancq1m4hx3ym1590vna',
                returnCode: 5199383184,
                node: '7fi57qis3d7ao3sl1b2rt2ubgt94bicqakmv4ohhmprdgm0caghrec5aw0hp0at6f2aacpzpc9bqpsls2kxp3h0tgcwjdhscuz9lv7cnuy9bpk01lauqonllmyqii5dmx9av1yas0oapa8sxztwk758vxpv8malb',
                user: 'odz6innjhq90fta8q1whu5yyzr60wyb2hb21movwuxs6epmi7tbgurcm30kup8taiy7w776dsdicma3bmhw3pr7e82rsokuxmspyrpauw9ay9cdk7qob7knu68l4wscul2rl3qeodl7ykjfbcurt0699bcjdguhb7dwktqqirbnd8p1vrtjj6z55rwqoxk767djfjek95qlhs8sfzaw441voerfh06ebslm4wyhpbygatxonyw2usebpl3bi6ux',
                startAt: '2020-07-31 01:48:01',
                endAt: '2020-07-30 19:32:40',
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
                id: '63e94615-5741-48f8-8632-fb55e367792f',
                tenantId: 'ba7aeb09-5232-4001-b6f0-10c0d1c492b1',
                tenantCode: 'r987t93msu0ud6p6pmxs6deaczypdnvwacb2jw2tu02naosww8',
                systemId: '52f4eaa8-2be9-4460-9fd6-cc50c9a18b6d',
                systemName: '1bnz85ux1b1ilruxqmm9',
                executionId: '8c80c82b-c12f-4e1e-b5e6-9eeb23a16783',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-31 06:28:25',
                executionMonitoringEndAt: '2020-07-30 23:32:33',
                status: 'CANCELLED',
                name: 'qo9pe2cz3owmn98g1pes4l7gtb1smydkvz763inkkeepwmfohof3qbn32vwa6a27k49118vk702iibsowdjd8928pt2yl2fsx1fl1us9fxidyzl7f9wsxvzcvosebaj0y462s9ewqj99w1mespessfq91gelthsefixh4duvlhdkxet6nfghwgmx2bse0nuvpeawtc104rdmwdq0sm7et2kxo39dawi78lnp5dig0ql6jyu9gkn2k5tmzkwcm96',
                returnCode: 6168970039,
                node: '9txv2fd3uulilumm66qevnqzoj3tvekdb7f6dt3h2bkn7649puzdqzj5d35qh25tujtfsf5e75b89sfu2td18sf2l5vg59dm8rm8a9h54sf735p8h23es8xgxv0ovaz8e82a399xwz0yl7yxz2861ytrfskmyvh8',
                user: '3x6id4qnoxevjagk9b8yfokjaqvy0q73vo520tlu34n1irna8c09p5iu1rrnqcbl5jxjvoeqwjec9ru4c015rek4q22u41noai7bv47yd8qfpe5o8vsvhf4x30potqec52147jjrhuzp1pasq2xd9oxecxl3rrqm3ar4vvhnnscknsamid4ot72w2zgb0z99tnfj66d4g6mmnnbkmshexnx40udkp5dldx6krb28qpigt06fxvxrl03cftcbwo7',
                startAt: '2020-07-30 15:53:49',
                endAt: '2020-07-31 09:46:24',
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
                id: '63e94615-5741-48f8-8632-fb55e367792f',
                tenantId: 'ba7aeb09-5232-4001-b6f0-10c0d1c492b1',
                tenantCode: 'ycyjoba7svlqm4e99eoosu37i7b4ivr4n4rtvphq0b0ogydonj',
                systemId: '52f4eaa8-2be9-4460-9fd6-cc50c9a18b6d',
                systemName: 'ptifvey97vfhhscbqrhp',
                executionId: '8c80c82b-c12f-4e1e-b5e6-9eeb23a16783',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 21:52:57',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-30 15:51:24',
                status: 'CANCELLED',
                name: '5bk1cjvdksbxdcla27vo5e2ea7ew7wgv6k5pjqm3ueikmocb3s71h8b8ga3l8910khjcy50nstrs8rs2qtu5un941berqmz8iqzna837ka4iitusr3n78jy73cfb0c0tkycj2e21ligsswq94277iq9ngfw7247r726gx97mfn8ulu8cwz5emsyfe1hx6sldj3pi6vgpkmhg0uzrytfuzqvxn59o5vbvx07erodezlpre8kcpbnavkpjlluroy3',
                returnCode: 9457331230,
                node: 'pnvvrv53kyp7u0phd0z695hb8mk00n3oni09hg1xyi4c8pnir9qj7vhtjwsk268kc71uioysq34un6rx9wwpdrrliyas6ke81d32wm0qv7w6pcsbelqa0mirgu1xhpjyn1twraipcu87xbb6k0obo1bho649a6t3',
                user: 'u2wphzdhpp220f0p26om6tjp51rta34j5dyekk5rwj2hun8w8ierljsolc3l7ld88gb6d775h9xnypcr7nzst0lx5dcaoijxy0jjg5dyg4crhfgha2j5x0z5r8p1f5h62i6f6syn9guhqejhq5p9jt8re589vb3wczm2ep9y687mx2b59zvldn2knn92nlfxeobq2tnacs7qos0p7mhtnqc7bsdnjp27gtyv1u0au90o6aarvhxmccxhlu2z89n',
                startAt: '2020-07-30 14:16:35',
                endAt: '2020-07-30 23:46:18',
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
                id: '63e94615-5741-48f8-8632-fb55e367792f',
                tenantId: 'ba7aeb09-5232-4001-b6f0-10c0d1c492b1',
                tenantCode: '73aotlajq1wgy3qcp3xo03o8glj4cuiwc9vm8cv2hbmi4ebhxd',
                systemId: '52f4eaa8-2be9-4460-9fd6-cc50c9a18b6d',
                systemName: 'de30dcixnb29tftq2pqn',
                executionId: '8c80c82b-c12f-4e1e-b5e6-9eeb23a16783',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 13:54:25',
                executionMonitoringStartAt: '2020-07-31 12:24:06',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'ERROR',
                name: '4lrqs5iga0fg0bohzuon6lifz0l3536qx3zyqrh3qbd1vqraxjgrtzhedpknp7vk31xc9qholsyshtopddzk50gyd8sy73d8i7fbips6z7g7jfcvqtrnsd4580jywbjbic4i21jar52y4fj1ol8veuwarm4aykl5v207x7o9h3hhrgh755sloksu8hl3xtlc20ibqom2a9t1046rc2sn9thdxz4q81d7uzgb2xx7i3ugfuw439z1uetqz935tiz',
                returnCode: 5681360329,
                node: '8ib7zvuavnrk03nyt7fglw1nhyfuqz6bjqz03q72wbjrmd4x1ylriimfh5a88hq9tg4vh6ozmiunwjr2v44un5sven0rxr59h12adbtiyqln916p3g07qpurqchq2qzb7i87b1oxi4vs5ndbtiv6mu65xue16giz',
                user: '5xw76adexh72a2sl25n489hvwewz2ge5jcpvg1y26gonc21pe76rddd27khej9khigs4x06ilddkfxodf9wz8skdc2tctoeg9evfjuljdv4picxdw4jp18ldyoug5hbsri4ye4fznx8ff910yxc0cbsqtsslny2poo9pde33254h9wmi7x18xf3flgum6f44bjvanxcl1itykw0spk85hggbrvgod3lzdqpplifvo0upr4dvz2ejizqr4mipemn',
                startAt: '2020-07-31 00:46:30',
                endAt: '2020-07-31 09:02:59',
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
                id: '63e94615-5741-48f8-8632-fb55e367792f',
                tenantId: 'ba7aeb09-5232-4001-b6f0-10c0d1c492b1',
                tenantCode: 'n4ih5ti440d4wsklm75gj7cbongonby6o72hj77s9lwg54qxb6',
                systemId: '52f4eaa8-2be9-4460-9fd6-cc50c9a18b6d',
                systemName: 'o681mk7270tt10xmxw9y',
                executionId: '8c80c82b-c12f-4e1e-b5e6-9eeb23a16783',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 21:11:54',
                executionMonitoringStartAt: '2020-07-30 18:47:17',
                executionMonitoringEndAt: '2020-07-30 18:06:08',
                status: 'CANCELLED',
                name: '1l96tv1845gygb96e6671dmsvwkwtxxzgzzjmti2f1wjw040smwabb5b5pptq89pkqjm0nrgut5jrdt3z151ofa95edumnwfla25oyzj381x8snaa8bzgk6dvch8pytkx5ks4q5u54yqf1qj1acqvvdk2heporhdr9ykhaq8m6uz32rux7qsa9jacixyokviqwchk433uaj9druz2reil3r5pctyo02gwu12stb3ltn7i17g4hhz8xf51me5w4b',
                returnCode: 7098907273,
                node: '2gfkx0jhauxg09ii5r1tkkqmi5eeza05lhb8k78m4o4bkoowxfm08yvt68yq4v8x7w9t68vemf73bnrlupulgry8blt0rj9rtdgslr7c6c1cvdmytwv9ysusslpuuyrtzvj5tcxxyicb61nljjk8f60ew11eopps',
                user: '5n0hztpo96km5didoz8davhbh8lm36q59mw71sxcelrlq3ys5lbscs64w8ko63zu8f1cb8r86vaxsixcx54gouk1q47l2mntct6vgiyb2lkjhl8k2rf8cleqckzeojfjny77ti1mtpfbxtl21hhi7ifhptlwntrlw8uzkyxwf6l7ptmtjnkncci47s6yyy9sloeloxehczhd4dvh9ofcfxajuxfjlongallk6f3c1ijpc3v3uzps8dwgpaw09nv',
                startAt: 'XXXXXXXX',
                endAt: '2020-07-31 05:45:58',
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
                id: '63e94615-5741-48f8-8632-fb55e367792f',
                tenantId: 'ba7aeb09-5232-4001-b6f0-10c0d1c492b1',
                tenantCode: 'c869vf00m8kck3dyfl8hvwby42qdn3sumcwya0hk07savac05m',
                systemId: '52f4eaa8-2be9-4460-9fd6-cc50c9a18b6d',
                systemName: 'zrqxdnu4w0j0yrkszqxu',
                executionId: '8c80c82b-c12f-4e1e-b5e6-9eeb23a16783',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 19:44:18',
                executionMonitoringStartAt: '2020-07-31 09:46:32',
                executionMonitoringEndAt: '2020-07-31 04:29:48',
                status: 'CANCELLED',
                name: 'geu9e0153q4onfq3zcdpo9ftiotl81ysjwk7zdqks10d9k1ww0nb5nhgm4lzctdcgsartmvkqtepomzaj7e9fyykseyi2sw5kwbfvb6u9lbxucd5haxehzw1dofxz9swor97qcovz71tdt4c2kg2z9o4i0kksl8ia4yrtee40rpdmjzf1e7z10slrlo2cix24ylb4lidy325usr91o59lzan6gai1a0r0hlsbdod627ruuv4hcal4oo84iqvv5e',
                returnCode: 8062043851,
                node: 'v1zufwr2xffooijt8mh3lvqq6rt8ns3mrxmctf7520paebcxfxvmzy1km48ot1iz83gxcdsmlu8tgpr26da7oaw82scwwqyedtg9tjenre15hw13ku9mvzrmg4xzxjju0ar3w77dyyz5khfkf5xeleuizlo7ozdm',
                user: 'r3ukdx7bcw6zyzuz88fs2hhnxcy337xm3n0ahl9mbbuk1os6j3v1ayt5ywlycfl78sjb81eln9cynqofi9yu0u6903uos3rfqj09x45yutfwd5quxtr7fh8lidjrnj3mfc92bs6mmdk8ej8euv72g0q7alofyjnr1wwyjfij3t1gc3g99tmf2bsksan0gib0m7xfikq3z3kondejnalvdbnf0vbtbnbz2xu0wr9pgum0r9tfaigusdh3rnps6qw',
                startAt: '2020-07-30 15:58:18',
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
                id: '63e94615-5741-48f8-8632-fb55e367792f',
                tenantId: 'ba7aeb09-5232-4001-b6f0-10c0d1c492b1',
                tenantCode: '8hakhnitc0c0fykr6zetkvkgef2dgmxeo10qku07ffxq2bsbeg',
                systemId: '52f4eaa8-2be9-4460-9fd6-cc50c9a18b6d',
                systemName: 'iuonk4pd27eqvfka2cnt',
                executionId: '8c80c82b-c12f-4e1e-b5e6-9eeb23a16783',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 21:28:40',
                executionMonitoringStartAt: '2020-07-31 05:52:24',
                executionMonitoringEndAt: '2020-07-30 17:49:19',
                status: 'CANCELLED',
                name: 'dbrruaroz3c8z7e8itmv2nch95vy5l3t7mi3owox9hn9numpg95phjxetol2b38ibn79y7l8133w2f56u2yknekmsusvhjj1c1n1h45jyv09p7vba0t2jixyj6qtiero62bu0qnmcupgbm26lc6hx0etvhvy3rnwvo5zj0h8z1su8gle4wgi59d2lrz7ivxn2jp2ug5suwehklwkmaifwts5lvgit5iqjpsyqwlfchvje0np914hdnxewaml558',
                returnCode: 8434739582,
                node: 't6qyjrp1u408vbmoqse1x71x8cakz9n2o1j3mac3xhvmhttant8ptttd0ogs3cchwjtzc4nkazadwtflzmhbrj7pjzwsg16rphlcxs3fit3wh0q65hpt7qbs9b5fug47h1eai8leei5j50v3a0fhjy522rti6s5z',
                user: 'db2s95ag0ued8ceux8yf2tewgkyx64ouz0yaxeh0zoqroa27s9govjni8e4uxexn73xks0b2v3ys1nbc4v5v6z5ctnrvu5mq0a98s59ne6fckndazhw147c90v3kzwrja8tjtjqzjm2uzqrn0i6tu2xgsw0i30u1rbgn0ztfi8h7irzhkiqhfiqvmx987nt361k8833q67q9tosphtwmqlxm8qshus1qi3rfg4sqiszdiru7ugizf8ft0crbd2y',
                startAt: '2020-07-31 00:38:30',
                endAt: '2020-07-31 00:47:47',
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
                        value   : '0e5a5011-6ebe-481e-afd9-f25f224cfcb2'
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
                        value   : '63e94615-5741-48f8-8632-fb55e367792f'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '63e94615-5741-48f8-8632-fb55e367792f'));
    });

    test(`/REST:GET bplus-it-sappi/job-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-detail/f35be654-22fe-432b-8879-625a15405b01')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/job-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-detail/63e94615-5741-48f8-8632-fb55e367792f')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '63e94615-5741-48f8-8632-fb55e367792f'));
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
                
                id: '8be51a6d-39d9-4ab2-90bb-bb41456f045a',
                tenantId: '7bdeedce-6d7d-4843-91fb-80715550841d',
                tenantCode: 'evkgfwrl8tb5q8otrpqbu1egr4utuz6jaiuaylffgfxwq2l41v',
                systemId: 'b459ae4a-5183-4c24-9bde-aa52ee73ad47',
                systemName: '4c97ogfpnphava2atqi0',
                executionId: 'c9171e2c-a9b0-4da3-96cb-09a2956c5e41',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 18:32:37',
                executionMonitoringStartAt: '2020-07-31 09:27:30',
                executionMonitoringEndAt: '2020-07-30 22:39:09',
                status: 'COMPLETED',
                name: 'j3fx2021tyb6j1ej5qfx8bjduz8phyc5ezawp1stdtpr3t34hdtk3icnnqx0hhglr43w1btui6dlxz0yw7my7or201co0xspp2b7wns99ozxepkp9omcztr0m1c21rfqffwrgmxa6b8hhh2h9cipuvb9o1jr8w24aib4kl97jfx8af6ll49d6tyemx526ug8efv1qas1ggl0aejw84w1eslg4dsdhuarrlqpcv1hza0dde6mqa1eo7pi0jpj3y2',
                returnCode: 3403136753,
                node: 'vt1jt0iayvzlalz96hlb60oz0zawum7a2hdx6668s2slwnw3swcg2dyodyuzv8cxlzk58ql3dvmemigg4dzu3e5em73sf2hsq4vlae96l2krw46ixw73dux80wpooojbctby9ip8wwio0a6odx0v48tpjk0tncmu',
                user: 'y2z76j9rsyy256i4ypkp0rew3omrkdtrnf6m1cjiwgzc6xqx40m6k36lnxrqgypxmp9rqom4xjm81hl4jae03afj6iv8elsgqopd76k688piumcx18vj8zwbvd7avpkoa1sioqm8i0s2fxu0vmd8p11omy4idvd4ls3pmdx0uxjlcbvdmbcawhtc64arx7wy33qvd6p5wtwoazcdjekzeppzv68opraro1lbz3935tk0w1tule42enenar61vbb',
                startAt: '2020-07-30 15:33:47',
                endAt: '2020-07-30 23:43:07',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/job-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '63e94615-5741-48f8-8632-fb55e367792f',
                tenantId: 'ba7aeb09-5232-4001-b6f0-10c0d1c492b1',
                tenantCode: 'hf3xngqso0prk7r3i9u3fv9dtjcrhekzykks25mpnycbd9wdbk',
                systemId: '52f4eaa8-2be9-4460-9fd6-cc50c9a18b6d',
                systemName: 'jnwud6mjsovwihvs946j',
                executionId: '8c80c82b-c12f-4e1e-b5e6-9eeb23a16783',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 23:00:21',
                executionMonitoringStartAt: '2020-07-31 07:12:45',
                executionMonitoringEndAt: '2020-07-31 04:16:24',
                status: 'ERROR',
                name: '3h48t3l6r4upelqt5ny47w1omptnmxxddx9oeh3a4jiugygfutcbglpx073bny7ox24wek703vu8wrnsiaxouc18vbxeg07ol328jvfa815xtg6b8pfrq7z7oz1bg8hsi1xtsle6yjsc5j274d5407oj049esfwcsw9njjcfqcyfsrqvb6wptp8eyniuifu8pwx6vjdau5on8yf6pmpu1y6tlslhra820db68ctc07xmwp8hd3hn0e5utd1nedq',
                returnCode: 1107619396,
                node: 'z8a1hlv5akrpj62wtvezaci8isxkxnfpu7fz84uynthoql5bs3n7xp8z9ia9ke1yzzs0w48rzw10p1tqtnvwy08s02iimutdca8v7i4pqmtnonkzhjrgn71qhfh1ey8zl1ii0cmfkccazf8r3ze7a5uxatcn60u4',
                user: 'uv2ly9y2d5q819nwc8et4jgtihj56bhruirqeaa4ao2p0hzso48c0kbjsbivts6qxihk65nj8yas20cjutia4dsdtxgpgrsgwsywkiuvqna0ooocr6f2tuhippdlf0isbqqk0zj4v6ly75iyp3wlf0x9tkggi51iuoan1r9u1mqluxn9gkqrwfajvk7xk3n9vlu8dqs5o15itbisn1y8h7e2dc0f3xibi0vu9oxi52kctfk2d4csrn2se522jea',
                startAt: '2020-07-31 10:40:36',
                endAt: '2020-07-30 15:50:06',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '63e94615-5741-48f8-8632-fb55e367792f'));
    });

    test(`/REST:DELETE bplus-it-sappi/job-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-detail/b1e712f5-bec5-4fae-8c99-1e3cfbb1a017')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/job-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-detail/63e94615-5741-48f8-8632-fb55e367792f')
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
                        id: '4ccd1ef6-1624-4cd3-9bd5-190d36d72d0e',
                        tenantId: 'ba7aeb09-5232-4001-b6f0-10c0d1c492b1',
                        tenantCode: 'exv37adex82m3vk6l8ildi9klafkvxeap7t1sjs2bq6yr0jfln',
                        systemId: '52f4eaa8-2be9-4460-9fd6-cc50c9a18b6d',
                        systemName: 'izg2z7bdllfa06sxkbi6',
                        executionId: '8c80c82b-c12f-4e1e-b5e6-9eeb23a16783',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-30 14:17:38',
                        executionMonitoringStartAt: '2020-07-31 04:09:27',
                        executionMonitoringEndAt: '2020-07-31 03:43:33',
                        status: 'ERROR',
                        name: 'iuopic2x2iazke7orgrxrng7f230d8ycgsdhezwk5fu9svx01mneu2ljel49gy09s4o496llebr8yx9d6r47h19ggorfq5ytu0gb4y56vsls8dnwcmz5ywutpc27jpjq1jnym46ek7qw9w4wp7yv0u38ceydr3hrmoz412wbmcz0214xmhzffea9bmlv3pzqd05g3qffd6e7diigkpjmd7hltq8y54mevckvxl97wuvg5zp7063pxsu0gvy5sdz',
                        returnCode: 9192312340,
                        node: 'r17nwjyoph3rlddy52vj4e1kx9pj79ptu2vg6lnyausvyqun96qhoqwvdt9ozl41f1p0yqtws6wesxqx44s1qt112hjmg9kv5z5wzxfgz1pzd8w1g0i2q3cydhvkvrgct2ka96nwv7ldp65ape3gsasvrq0kkycg',
                        user: 'smmfv3qkizbj5lymmqlxc3gy23fgsislnw7uwxz70em5dr9kfn5fm6blwo8ms5so8fxu6k0k50spsbk2g0x9or3giyll9zmhlkve1jhitdf0jinw9nwuqt9x5og4kx1ttvn08zdmu1pvjzpnwwqa3l49u675fycp8ei93fqdxfb1kxgvw5su528lmy1begwqas54zwrc3gaqqe669ys1i0wjqbhjmzn7f2oo22z1mcq0vg0ocu9xvj7fpfxhmxc',
                        startAt: '2020-07-31 07:29:37',
                        endAt: '2020-07-31 06:57:13',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateJobDetail).toHaveProperty('id', '4ccd1ef6-1624-4cd3-9bd5-190d36d72d0e');
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
                            value   : '5abf497b-8b0a-47a2-884f-b1966a451b4b'
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
                            value   : '63e94615-5741-48f8-8632-fb55e367792f'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobDetail.id).toStrictEqual('63e94615-5741-48f8-8632-fb55e367792f');
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
                    id: '0d997565-8ac1-42b1-9933-427bbca6e115'
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
                    id: '63e94615-5741-48f8-8632-fb55e367792f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobDetailById.id).toStrictEqual('63e94615-5741-48f8-8632-fb55e367792f');
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
                        
                        id: '242c788e-af26-4b4e-bf68-e0e11ebd7646',
                        tenantId: '418ca127-d72a-4ba8-a65a-3650968e7e8c',
                        tenantCode: 'r6wsdvbg459yxs4ubs9p93lg9q6zwrapi27uz8dolf8dj55sio',
                        systemId: 'cbd215e2-5dba-4870-88db-272e0e0fd427',
                        systemName: '594skxsvxf22c1r51ur3',
                        executionId: '981b3f7d-a8d2-4b8d-b6b2-b720d860509b',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-31 10:50:38',
                        executionMonitoringStartAt: '2020-07-30 20:17:54',
                        executionMonitoringEndAt: '2020-07-30 19:13:09',
                        status: 'CANCELLED',
                        name: '42a8v3473m8j83yxbj5ddkb1z81ppyrvhvux0b09bvm5ngex12tl0wzoa8ibpvptdex22w1r8q1ey4t6ow9r78geqaflyjecaorerxaciy7vcr7l3qqvdjqm1fc4tou516c4rpsh85vp92ak3wuj0bsost22nbeqjl6p7a9av0hyd8flx4xwhfsrbz311odizyyzjd1tcdlez284t82re7s76h9ted4llpwbxqy7hrrf7kt3a2kjxu1kiv5v3or',
                        returnCode: 7974042202,
                        node: 'hjdggao2drzl80ckb7ujgal6xq6wxagiapf04yo829pjlcbfb1su0io4d5xamb5cysz6tcaqyjv8bzyu99g76es3npq0n7tw8y6xmi1avdlcds513fxm9eadh6prwd3z203i0xuxgsj3zi1x62j1yyrdh713sa4b',
                        user: 'qmsylgn793qnk1aizovtot98oimswxpkmzrn5er6ni3sjh85av3521s5no68l1guf2sqnujd1ua2cfu5q288y7r80q6z1bzdiknz59tsmtq67pptomfml6ukelei5usxgtb4u2t213y7w8j3lzmagnaa63fn9vrzy4c418lmu049vsb75twax4qsa6vm8nym82xm987tf538cm9eoto0dwz41ojw8aw0akpdrfumgngyvrfvgaigkq5p11tpnd9',
                        startAt: '2020-07-31 10:48:30',
                        endAt: '2020-07-30 17:53:47',
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
                        
                        id: '63e94615-5741-48f8-8632-fb55e367792f',
                        tenantId: 'ba7aeb09-5232-4001-b6f0-10c0d1c492b1',
                        tenantCode: 'tzaqtfu3un2r66gbsw85a2cwd0goqmheyspj7i2g75wuokv64x',
                        systemId: '52f4eaa8-2be9-4460-9fd6-cc50c9a18b6d',
                        systemName: 'w25vvwfxnci7lg619iju',
                        executionId: '8c80c82b-c12f-4e1e-b5e6-9eeb23a16783',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-30 20:31:03',
                        executionMonitoringStartAt: '2020-07-30 21:28:18',
                        executionMonitoringEndAt: '2020-07-31 08:04:58',
                        status: 'ERROR',
                        name: 'abhwvymzi8ri0yvgm2y0i0jov2ntr0gro9m08sozgmszfjp1z3qmhlr84zparuai895y3kesjtimbpd8qgiq5m0ts3cn4pm3loetr9k0jnso0n4285fq13tq45t4xjkl8013j2ugzuwl1ox2s9gluqh7y5ikbl4scg6gp39kzcskok35nqfnhtuiuhzt6l1ltplzi5t3reryctwq1epk43b6yt5elx2aq6a11zm68oyya5rn39ezydvsaj7wlly',
                        returnCode: 3911484283,
                        node: 'dhf79mcwmlkjff1zocwtx3cxsm38q3qag848nwom10zhgh6ao1rx6od60yta4yas42nyhmjyj70bvv7u7pxxf9gmiajgcggk35m29rswkne3c7zwwc3hc5fwhujc74qdewttwblshgyelbyy9h8hppwib67ul5q7',
                        user: '4rp4jqd1ed3lebof5627jaae3u28yv3bnv0rwwvo7zgkpge2kwb64o6doy9zg6zt0psld10lo296284j8f22dh1p7xmu3456b6bqbed8qywnxutcriqpe0qlip37a7ikdiik78ac5rsetoe90bbonkrgqqae2f8am26akuff4fv80eufri8jle1e48pxfmzc0n8eldw1hxestcw46xrpym162m7npek2slat468e9eo8ydkwr6lnezkp8jol6y2',
                        startAt: '2020-07-31 11:42:08',
                        endAt: '2020-07-31 04:55:25',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateJobDetail.id).toStrictEqual('63e94615-5741-48f8-8632-fb55e367792f');
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
                    id: 'b5836723-73a3-4547-89cd-0ea86b05579f'
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
                    id: '63e94615-5741-48f8-8632-fb55e367792f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteJobDetailById.id).toStrictEqual('63e94615-5741-48f8-8632-fb55e367792f');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});