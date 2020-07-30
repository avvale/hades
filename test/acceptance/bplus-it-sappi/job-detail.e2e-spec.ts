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
                tenantId: '820ecb20-b97a-433b-a4d8-35a4a3df7e14',
                tenantCode: 'b3v4zxbbxl6qz608bedyvo3ptx7afyo2vzp25n1t9nxnmqtop9',
                systemId: '0bc27a1c-220f-43de-a154-c67655924e86',
                systemName: '3vkapf6wrq527b2brehs',
                executionId: '5c630944-af1e-4115-9a84-9b3e04feea1b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 10:08:11',
                executionMonitoringStartAt: '2020-07-29 10:49:39',
                executionMonitoringEndAt: '2020-07-29 18:36:09',
                status: 'COMPLETED',
                name: 'otp2j1u87wi6tr9tti5i52xj5bz4c0jg9dftyoi7vaznhnv7lrt05ukapyz08vctmpkgr6jxbzgvv4eobeyjvp8xzlk7ddrrej3xcnj90a0e51gq2lfn4kpkh2orzl65ti5mi5dv1tecbm5mrlibcqopkzlo00yy4y1zew4aou9anexu5d2jtoc3aw3vdzceafdnt8notkm2c70bm8jjlrhen8mj4sms7vur2ho9r2b2zunoa8t74526ewbf1u8',
                returnCode: 2059317042,
                node: 'd4nqu2x2g42ro1kqjqihgtpxl8t4poz9973bxsbc7ghiq2hjl8amdcmkhgn6jjzpesckcfo0zso6wzab48cp4x0biq9gxp8llsgaf40iynpbatkptd8dhtppbe12o4ri1nahhqm9zx9hwl5v0uvlje3xadxo7rqh',
                user: '1tk5x75lup0ucb9jn04zzswkf2okdfek9s1abqke5umdq2t7krn2p1j4vj1krqdpnyr1ri8oxe3kcofge2oz6dj47uehgea3eyjrtlzu76m78rbgkxnfqih5f9bmkwq1pjhndcu8pc8hkvnifzhumx5x6w07g0gvsx84lr2iaq5u5i4ymx99lox9eo5poenza2ejzzuiuqjspb76anx5e5jc4j04tjsxc8tcvwj3tott8awz4jm3sp4p186heg6',
                startAt: '2020-07-29 15:42:50',
                endAt: '2020-07-29 10:47:52',
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
                
                tenantId: '820ecb20-b97a-433b-a4d8-35a4a3df7e14',
                tenantCode: 'sh2v6udk39etriybduid90lucrp0mdojvm42etwnpjlf7gif5y',
                systemId: '0bc27a1c-220f-43de-a154-c67655924e86',
                systemName: 'zpvltwnsooxt0vklw384',
                executionId: '5c630944-af1e-4115-9a84-9b3e04feea1b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 14:38:36',
                executionMonitoringStartAt: '2020-07-29 19:03:33',
                executionMonitoringEndAt: '2020-07-29 02:47:15',
                status: 'COMPLETED',
                name: 'z9cdsiplaion87sa5hylsz5kccpn70ky42ye2ghymkcn81q6i9u9fa8q9xbkqkkc8vmt9qrn9mteh7zu4insfcj6k0qjjgh5hr71zqfy5gudoufvrle9nzzd8jzn9cccd6nge2egjqlng8v7dviujij5scba132ppour5eiq16pg7ojbbjfv89cixyzubq7gdflkc9uk7g08imatlw3kibgssbkhhuhdt5snstjrfkylgekae4j54ow36713dnl',
                returnCode: 1255481486,
                node: 'gc4uel3hwg1a9j91xzwtnhqjxiqdisfhf1orkssgz3fjmmth01n82b1dchrkkxfl0ums61gfq8zk6ne7gu69gu5h1d6zlz8f17nv6sfyu2z695ip4m18kotw5t6s1qjzut8o28ydc3togjc3xakwxnngwrt6leyv',
                user: '3qz0r7fnn5337bwabr34it3ywom61m2ilxbej7h72ykgtclii3cwp89frlhq77jxsk8kfw5pb6xgyehldo50ve9xq6q8yq7ew16fhe6jf71m2ljho9fvjcjd0z6ehfyqhwkd6g270hv1towvxsxuxhw6vfqq7qezppfamwm5ez1eana9saf7n9qz2s9qu6rcicwu2a5rqe9nqwiqmddczbq3vjailto20jkl38k7ncjvawl0tzdfx37lfivetmi',
                startAt: '2020-07-29 02:59:07',
                endAt: '2020-07-29 05:43:00',
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
                id: '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0',
                tenantId: null,
                tenantCode: 'z3rrpogk6yiks8wldkkha9wazq7tlgtf76ozbmg9pd2cr9m9dp',
                systemId: '0bc27a1c-220f-43de-a154-c67655924e86',
                systemName: '41qirzey6rw4qpua1do7',
                executionId: '5c630944-af1e-4115-9a84-9b3e04feea1b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 19:09:50',
                executionMonitoringStartAt: '2020-07-29 09:04:35',
                executionMonitoringEndAt: '2020-07-29 16:58:59',
                status: 'ERROR',
                name: 'oz42fpspnlvndl6jenh7rwepdv7bzr3egl64lrq0swkcccwaejjyjd2u0r3zxy2ckyeh2uojzkn8nos040n52c7bfo4ppl6pg1qudub35tkatcr9eac33yhs8iyy7mw30hgvu0auowcybor67ptb1037uicxxazyleyr5fh4s9jl3oe043w68xgr7ko7lqspvdokktucom96lb3uczxd83vscjy8tv7n9flt7qm7e59saxed4z1h9pd9nqt4j26',
                returnCode: 8641529378,
                node: 'kzfrgtwdhzs39tdki5a2wuarbrufq9s18qgmv1138sk8sn9d2tl841v0xyz8q33a8tv1p4740xzj4o43g04py45q9dzw1hnoo3h3jf6abu5z0xf916xdjxhjqtp4xadnoyxx17zlj8eush6dmo9pkpphwpbeaff2',
                user: 'jww5nvpeskbq74mr8nsgyvm3kz63dv0dp2xf8p3gjqdp79pz9l2u69nvwhkvqpm1n94ixr0sjgn5ryybfy56a26o45574mvq78xm6ks4iu1xscke30coikoqsg7ps92zho1ljinovra5kmyea2m686vtebejk2uu4x52hj1htz53uv78t3nyzdsz3q78tp4d3ybrarrse4iwmcmmki3k51l28quttr7o7lazhupyn4uxghmtszsh3unp1sb5d06',
                startAt: '2020-07-30 00:42:07',
                endAt: '2020-07-29 05:59:22',
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
                id: '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0',
                
                tenantCode: '37i6nf6dikf8od8e157tzsjpaey5v1udi2w1fiunfbkf2gctmv',
                systemId: '0bc27a1c-220f-43de-a154-c67655924e86',
                systemName: 'ab27tr0o9586507frrr7',
                executionId: '5c630944-af1e-4115-9a84-9b3e04feea1b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 04:54:14',
                executionMonitoringStartAt: '2020-07-30 01:56:35',
                executionMonitoringEndAt: '2020-07-29 18:42:24',
                status: 'CANCELLED',
                name: '2y1ak3k1qo1meifrkweso5vp4ank06olfpngceg47yxuixembpsoi40m8psnpv76j20l5j7h3gofzidn5wk9hmju6s7h0qjrhhy747mc716nl9r8dsl1izd5k1214hlm1pj6pe0i5rey45f1rknpftmwsslg4zxxpk4cbf00biexiduk4l7l3k5fkjqyb7ne05kfgkwcfws3r9mq6xb8lbuocpj03wyl9ppwk3mh5i6q2seavgfsa6gngavthv5',
                returnCode: 5750186304,
                node: 'tq4gg0tcxdrtnbpb3kbnnkej55mr5l7uoinrqjuyr5prwyhy9dmq1hk66j0h416poe6v3oghvleiohoyfp3xzgs1i6ey3cw30nixwp24q3jh39z4yyojtng4sheaa8k0ip34q2p0ognbko7eensueqgjwnqfepbh',
                user: 'z8d6o84h6p9l41o7z2sqv5j84in2zunq8cp8pzzu748aqpgo264aufbh55p8l0hvlugl1dwr5yz9cwocdhxoxjyfscuwjfgdfuobrj8yofzcg01fusmwkedcac2do62rtgs9bsk1ppmhhrx7rz3tsiefgyi3ghavpvsbe8qcwsd147r07dqrq5x4qxun9pnjpgwl4aieva96jxdwmyq7laag5fg42l6fgt3tbazwogxu1occr7b0klcs7fnqy08',
                startAt: '2020-07-29 21:45:24',
                endAt: '2020-07-29 09:03:36',
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
                id: '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0',
                tenantId: '820ecb20-b97a-433b-a4d8-35a4a3df7e14',
                tenantCode: null,
                systemId: '0bc27a1c-220f-43de-a154-c67655924e86',
                systemName: 'nk0d1ak53uzvq43xsb48',
                executionId: '5c630944-af1e-4115-9a84-9b3e04feea1b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 18:38:15',
                executionMonitoringStartAt: '2020-07-29 10:33:34',
                executionMonitoringEndAt: '2020-07-29 23:28:56',
                status: 'CANCELLED',
                name: 'ahx23rqa2lc0uhciadfej8e56r5k4xtskutyl25o4hbj8t1pj3u8ve5m9b64i0ovk0neitrrx1yedbank4qhk0bitnujdsd0111w94qg9kzufajlbvh0kdznfrefk9phuox10b7b5i7kzo12cjfbw3u5jgeftb946eedhrq96jcgd2nhwr2f38seujgh5fpokxtm0gq1q2ynx6ld23s5c0vta4su79ys0151998decce2rli1bnjta2al0enkgw',
                returnCode: 3964454304,
                node: 'lsewd0rqqzqmydoci90x5bs2mrnqcdd2r9r72jezgk61y77yyih9v2mh6cggm0wgfk1gpiay0jydqr0fygkzgtiwa91cwhm7wsur7tj7jgi5pxbshazoufz9xcfctwpemjqrrttfjh4juab1hooo93l1qldrratl',
                user: 'u7v8z515lw7wrgktiepehgkag77jojzculo5z75o125lnf25spaz93m2csodpv20nfdh0h6eppoa4xvhu9slnwfsr802jal1ei2uma6y0snsx1o15cxx9g0dvsrx8c14yj0a5wb6ogpe1kc7c69qk7ipihg8hzmx71vhyy2t1vayv1eh2vaq3mbyzjqrmuw9qdr0dsf4phb21dwiyvwc4mjlm5ssl4wzt0io4r88o5rxkdhlsyp7oukqm5fr5g1',
                startAt: '2020-07-29 21:02:12',
                endAt: '2020-07-29 02:49:28',
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
                id: '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0',
                tenantId: '820ecb20-b97a-433b-a4d8-35a4a3df7e14',
                
                systemId: '0bc27a1c-220f-43de-a154-c67655924e86',
                systemName: 'ioiymtliccz0lvbudcin',
                executionId: '5c630944-af1e-4115-9a84-9b3e04feea1b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 08:39:25',
                executionMonitoringStartAt: '2020-07-29 16:23:05',
                executionMonitoringEndAt: '2020-07-29 11:27:56',
                status: 'ERROR',
                name: 'quzrfcm8bl003bktv9pbtvtupallnid3dha9urhjdm44kngmu7dhz064emdtmb3n27xst2ejlexxtju6e1vf675d0qsi9p60mslihi2zzzilk5tf83w5ouybjgq6ysaa1ag92im79rbpis7val1fbw9m3uycrxmzzxifkcwc0e5wgu3k3n9mv7ptoytpnh3vqt091mpaot3vujdqup7kr81w3fi9lish8cfxwfn724rdj8vwkte2h1r401oyx1t',
                returnCode: 6207111740,
                node: '9g6wozicvayuaej128vcj3x9fb288y6kdewzmziip04znjcj75v9s2vf8bquivuisk4um66ihb8a0g80ey5ughdu9h7c3oo6v92brji4ogh5g12rpuo17kybtm778vxvbwx464oasliy5wpc16jsj8832nbyrwmn',
                user: '6x9o3xwbmyywvkqa0n2dhpns6qni8ltb2r3pzp7m67i56gzv953uzpivxpmljij7aoh0tg2dneqrb6rt22iluvuzffoy0rbaxxhn367brdqq84v4ey7hwfnqqjuikgggvpfeb5t8eu2k87j5yvzft9ghisbmvjojp1piq9dam3qyihmhura5n49pfpf6pm6w7h9guq3ur538rn2gtugmwweg3kc0irsiqkzddv3gh3x3jr91ad2yjkjpauqp3um',
                startAt: '2020-07-29 05:08:51',
                endAt: '2020-07-29 20:57:01',
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
                id: '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0',
                tenantId: '820ecb20-b97a-433b-a4d8-35a4a3df7e14',
                tenantCode: 'mf40bceleekcl0u2jxkmqewn2c0qb6src3t6536y8im9avyde4',
                systemId: null,
                systemName: 'ln1sxkw2cl3gkdg9q37q',
                executionId: '5c630944-af1e-4115-9a84-9b3e04feea1b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 20:22:00',
                executionMonitoringStartAt: '2020-07-29 03:50:16',
                executionMonitoringEndAt: '2020-07-29 18:54:31',
                status: 'COMPLETED',
                name: 'gra124leexwve8cyam9x6fumjzbv24rsyd7u6glw6nsgol4xc8s2vh6r7zkkkbkesjwdug9zsdqxiqbgoetokko9yziccgg50drwmgvbmla4uihcc0ioav4oylqpg3e3ej5vhpfw5ilj220ywzhhl77e0727hb31hxbj25arhmv6mz1skizt2tgx2ja7pl1pvlea21tlia53z9w737p2qzldte3314q6emndn7ly4xq63iw5q3quglybc7ltyy0',
                returnCode: 6071439849,
                node: 'h80w8ld5ogj0pb492ot7tqas8dvy3y369g78x99yh9ps0fwgpeadig3h44wb9kl5sh1fam2eitc882b13m1fiszg1ai7rchz3y8u9njitp1soksue3akzkg4dki6f2p9q9hesjv4lqdwg0sea0sjfgc1vkcc5czk',
                user: 'nzd2eafcg6vmtv2wc9nvggm0pndmft1gwugtkv402f16hvdbphrjie9jzui2zwfhulds4xzoeb0arml523peu30uyd7oyv6580rqte4h9u311vez7x1uom9eco8q93blnmnng4p56r5yz86l7rv9wqbhon863zpqaavcew1s5f8eiiz61qekgl4tp991xr2tw9t3vkudu802n4cidg5ik0qi5wvwerer9k0mkewbgxfxksv7hdrfcedcqturjj9',
                startAt: '2020-07-29 11:14:45',
                endAt: '2020-07-29 23:24:27',
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
                id: '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0',
                tenantId: '820ecb20-b97a-433b-a4d8-35a4a3df7e14',
                tenantCode: '1jmwsw4pjqd74zr35alnizb10flba6irpiusezlkervs8pf7h5',
                
                systemName: 'iims8bl4k708odhvkoch',
                executionId: '5c630944-af1e-4115-9a84-9b3e04feea1b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 15:14:15',
                executionMonitoringStartAt: '2020-07-29 11:13:45',
                executionMonitoringEndAt: '2020-07-29 02:55:59',
                status: 'CANCELLED',
                name: 'tr6z4sblgk2cmzq5pm24hv4owz16mmtcg7mf0l4o3qk4gky23mi9tq5rc6tzpok4f9b32w08kie9zwopctodwbl98edx7uodxuzge3hyl4e0t84pgf6tlgu0ha3dxodnwexfdsdllegv8udgtrt9c6r3xfy49m0elr0ubf0pj8roijfm3uj6e81vri7mhf14cxj7hzdbqu9spy32qrpaa3v8iwuvou8mw57isdb1t8pl59ok155hzlno0fh7z48',
                returnCode: 1786145646,
                node: 'llkf6n483pj7c2uvdcf0s8andofceyi4ltplms8zivm54417os5rtp6bp07bfreyp5nuwkj1yv5hcf2dfhpgey2hlqk48td555yibmawkcxzip7b0vkp9wb4ymxmfzqlw0iyonmrcqsry1nhkitzdmaahilnhsa9',
                user: 'rzk1blt6dqzktyudktt4t8akwtkbbhw8hfsnedmj90qs81s24en9w2p1hbaaqhwybftolkd0bki4fqagnlrf11xqlnylcv7ixta9knnwxzrb354mgm6iyw4bbirlrzke2ydotavemx47qqhkvfm4ifo3pg9sklz1c11iqdscjgrpl0i4324v3jbw05q85t46qn7wpqnhxq0m5p8kwq8jzq265ptvqflaqvsuvof58e9c4f9i36z78zmaa26lds6',
                startAt: '2020-07-30 00:00:55',
                endAt: '2020-07-29 14:48:49',
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
                id: '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0',
                tenantId: '820ecb20-b97a-433b-a4d8-35a4a3df7e14',
                tenantCode: '6bhsqn8xpla9zorhy0uczkj3w7a0k3nnejy3g9wlag41o6i0sy',
                systemId: '0bc27a1c-220f-43de-a154-c67655924e86',
                systemName: null,
                executionId: '5c630944-af1e-4115-9a84-9b3e04feea1b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 12:51:05',
                executionMonitoringStartAt: '2020-07-29 05:36:03',
                executionMonitoringEndAt: '2020-07-29 08:55:18',
                status: 'ERROR',
                name: 'f9cgjjc557mtxt2vgoxes653tv7u0ljbnta8uioesh43wemjwc1gosq10pow0ljhim7kfrmdmnf9tnnjchkjvlnnvz4wsxhqijevxhoplaa57vrd68u6iv4ohjxs3eaeoy1xfmpr48ygertk93k3cqkz50n75k1g6b219we1x90bh4ajvnne3eat28h4vtefovruzkqoyu7drd149ihewfn1b0nb2x062cp10tc4zaa6hyag3asaa9ibfh89rcs',
                returnCode: 4426897521,
                node: 'hqfz3k4u68os0uua4hjsx7kzd6lzu672j0ld4pcdd63epoumg5bkojset5e84aghf9hzh4qkoelli4m5dy94rfeyva3d6fei46yu80hbmbz697vfk19nk5rzssjeu1hamq4l9lxl5pg5yiceu6e9lrc2tmkgt48e',
                user: 'sehu0nstg2emf5mx0kj5w1fseqmjbbvrph86jvqwrbq92hkzc88nrhautrcwdpjm9gcglanap6ei6ubjwyy7jw7xbc3u9sz40l0k0ftlakp575q99xaqq3g6lqwut5hvw3buadgzg6y6bzeoh73071vm8wee1lrlg1s3srypah76gcccm1zikdy9xw99pvpypnkl00lkx1nwqr7054x4q9sw1l9ghza5ph9nhofc3bjai323tde1tv81hrltqgg',
                startAt: '2020-07-29 11:27:02',
                endAt: '2020-07-29 14:40:47',
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
                id: '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0',
                tenantId: '820ecb20-b97a-433b-a4d8-35a4a3df7e14',
                tenantCode: 'nf8vbsgtt1apwofarllatohpicdn194e4gieryd17gkowsffs0',
                systemId: '0bc27a1c-220f-43de-a154-c67655924e86',
                
                executionId: '5c630944-af1e-4115-9a84-9b3e04feea1b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 09:51:27',
                executionMonitoringStartAt: '2020-07-29 04:40:09',
                executionMonitoringEndAt: '2020-07-30 00:09:46',
                status: 'ERROR',
                name: 'g02df4bnt8m15fw1dv0dyzbj0pfixxcegn29e0c2xjyvlnhfgnoidi0m5nmncvaze14owmdgm2uncrx9gzie36mnlp2w5u7u74c8fkrcp8wu17kbva9gw3lrey2urekc21sa1gvw9psu7mhfk3x5szr0wxuoqvoodf1nuv4fsxijclhd3ouw4mf0pvse0cttyf52rr2pmcx4te18e630yq9anhtgmp0cfkuw0ni9rwzwhxvjxfbzxnpn8ouzgjs',
                returnCode: 1488534389,
                node: 'atanyza2zwv1iysph1sfez0uoo3xruf35hfmk87ilxbrpcm51327sx1jnor7d2ldxyimqj9k9b0wwiorpbe54ohw62hawwm5wif0ddcnfbup8pavzvsw0xdemxmhc341cbu172z3ceew89k418hwta321xi32y1p',
                user: 'o596j1s2khz3zmqvgasfx2j64vjj2uyh1j6331rvbia7k5v6qr3ch8rjp6n2nwiwagnudtyg0acn3aibhpkb0q0d8vato548k5uh085zl1y3irwrztfueedhphlxeowcezszzdl6kwhgha1x161cp96ns11nv3zglyqcllum0mqyffoy1r3gic1fzm6gehymxn37d3j3kz7m28zmgfubv5v6t5v4zx54dg940omubw2mwcxweyt9f8emkgza40x',
                startAt: '2020-07-29 05:38:46',
                endAt: '2020-07-29 23:44:29',
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
                id: '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0',
                tenantId: '820ecb20-b97a-433b-a4d8-35a4a3df7e14',
                tenantCode: '9txr8fl6viosomieb13uxh1gwx694tl2nvutuo0qf97milodcp',
                systemId: '0bc27a1c-220f-43de-a154-c67655924e86',
                systemName: 'jlhyhblimzv9aanc1evo',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 07:38:32',
                executionMonitoringStartAt: '2020-07-29 16:02:38',
                executionMonitoringEndAt: '2020-07-29 09:26:40',
                status: 'CANCELLED',
                name: 'e9gm00fupdl91zgdov4l5oyckyc6mtdrlhq1txh97ww5t7wspydwfwnug5rspmkilvawmu9b150lxwzkef5nm9vw57nuy4736qtyo59aqetahvylbhgfc0ynk0ige39x9abo658iar90z3aycaa1tuicqoilkpa7acyvferdbo9h2ogk9ch84ogg9uwkw3ejgf6dh7avckn4qyv8juko9dmwr9izu8x3d4d8vkvraa4qoc4fucojnekfozo9lfq',
                returnCode: 4272941990,
                node: 'qmw874irsuwlxo5ljfz9g76xdc7m3pj9opfghto6jtrkecnbh1fe59y5uk79p2amd6bg8y1d7t2xit4hc7vnnwol9ourdvy67ox1ldu9yyqhggofncawaqc4mlb7epiuwha3dmrwoitp68lmmbba4efbsg5req8d',
                user: 'n0c1v87lpi56avbim4ie4s41rq8zzua5akp7dpd8pqtwico9pvrilsx4gmgsbgqxyyqq99sr8navgxjac2unka9ycwt211nkeo7gsos3idxs05zdphay6gswr5j094rmm44iwgvpws03hodflojhen35nyz9ffwvnc5ugvmosrfdz3rfoj4raj566c23x0vlret9y2ghtf7y1v8sgd5cgjim5gciwgc717ppvycx1gginxnudwnwkzi642eya7s',
                startAt: '2020-07-29 20:38:08',
                endAt: '2020-07-29 13:04:47',
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
                id: '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0',
                tenantId: '820ecb20-b97a-433b-a4d8-35a4a3df7e14',
                tenantCode: 'xw3ha59uv13c9d0mj7txf02o4wjplue2u6zw33xpu75int0en0',
                systemId: '0bc27a1c-220f-43de-a154-c67655924e86',
                systemName: '7989wrdvmrrjoldsqmjd',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 23:57:14',
                executionMonitoringStartAt: '2020-07-29 09:21:08',
                executionMonitoringEndAt: '2020-07-29 08:31:15',
                status: 'ERROR',
                name: 'qwwwx019tubt5q365mn6ikupz7uzivq1vqk29vulishp0797phdn1iwnxrab68mfsyy60r146mpyim7hhfq8cfmtx6i870wt9hgqwiyl6lq8oiur8qfrgrsivi1lzvc4ovfxsga9n4f6ky0wtll5z39397ebr4ue1njddvaq9jo9gug3vkk4jdeg7fpauo2aqqvdhssdfxkqo2s298l96rdjjki55s36nm1mdbb9fe8yv83zyqevur89sdkquff',
                returnCode: 3246357879,
                node: 'k9obkwenhf50k7a4trnlk24dd46fzmnxofyz754om4h6w3fjf2rwyycy729w4195xb3hoiq7nw0isr5dqzafa14cnra69z9swvkbn9dgsxd5j986paepkukpbsn7zhb4w84cnutloujnrlnikyfy3sailkwxdg6t',
                user: 'vf0eykprge6o4pt008r6yar1tthctigqdayinemea7b1kyyf6rb1vqgilldpy62pvkrqcg95e6kbzahil9c1uw6lpkqrwd7wtxofhvm367xx18jak7lx2t8xelwez6a90zcwbdnxc8y8ap5tvap33z3kvi9ymrwqtpea48luc6tbf4wd9zp74sax3sz40wyxym1pww37s8mgqt2ongf6monun0y11yr4w5ppm6q2gq46m6hdvhogw7zne96vfxq',
                startAt: '2020-07-29 11:17:10',
                endAt: '2020-07-29 11:18:01',
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
                id: '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0',
                tenantId: '820ecb20-b97a-433b-a4d8-35a4a3df7e14',
                tenantCode: 'xa99efmlae738yt6rspk45darqpcxz7d84pemkz0my864qebjl',
                systemId: '0bc27a1c-220f-43de-a154-c67655924e86',
                systemName: '9v0lwe6m5183k5wdbitl',
                executionId: '5c630944-af1e-4115-9a84-9b3e04feea1b',
                executionType: null,
                executionExecutedAt: '2020-07-29 15:00:13',
                executionMonitoringStartAt: '2020-07-29 17:07:34',
                executionMonitoringEndAt: '2020-07-29 14:08:16',
                status: 'COMPLETED',
                name: '97bzb4jb8sgn6fkdgiyedxnbtzkqnr455doupempmmpwlmzq7drphvca54a22h5zjiir4l080aabf19nisqbcimzp9rdlrmh92dl4bc88xz4cputk122n0w98ovt0ll244zfuwnptewhr7jwodgr6qb4onwaagtmxf4lu3j4em14rt8xnmrz7poiyuza5hn0uwxqsmxtkfa4dw1nvjdjg7bz9k3zodfgd8u1ux7byd8qr4kw2j3bg75n35p4qy7',
                returnCode: 8142611064,
                node: 'gfyalosf5166mbnvw7rwu8ji3zd3q4d7jznw49uykjbw8vtogmagke0rqhomd26ncd3v97wsh3i1nf7byxiaflgos9n8lezem1vyau0eo7783eg34v5g8hlx6mde3aeqllt2oommn2lbe1tvvymi4frdt3j54qdp',
                user: 'yi5sq0ipi3uvternwh5wf4zoj3v5sjqbsqqwn5ta465pwct8q533fetihbgh0ozl7smn7p7k2vjsyxvgumgksyr4375wqr8k5y5q47bf19tyz1zerx66fi1o7gmx6pyasbjjdlc17cq7g35yg132lichu52380fow23lsfutaartbk33v2r2mul9lmrml88dcj0jkm3kht02wtklz7cf39oozibe22ppw29zhk27lw8lgv8v82j1xq77lbcuogs',
                startAt: '2020-07-29 22:25:31',
                endAt: '2020-07-29 02:28:37',
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
                id: '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0',
                tenantId: '820ecb20-b97a-433b-a4d8-35a4a3df7e14',
                tenantCode: 'wwzo18nn3equ4kebhrkjqk5dpx6tmy04j3481cq1q0rxxqesrl',
                systemId: '0bc27a1c-220f-43de-a154-c67655924e86',
                systemName: 'di2ibjqm4828bbq4enfo',
                executionId: '5c630944-af1e-4115-9a84-9b3e04feea1b',
                
                executionExecutedAt: '2020-07-29 12:25:35',
                executionMonitoringStartAt: '2020-07-29 04:47:11',
                executionMonitoringEndAt: '2020-07-29 19:53:04',
                status: 'COMPLETED',
                name: 'ijwfkcfcuauyw1zy1f9g1zqerpp3mb35ka6itdqqoemtq961yvul7l27j57hcxrc5w85obguw343ald5ev53pek97e1pir84rplhc2taqg9t45e39maxzdrcm55wdvligcldv34s2qsdg5fnej873ssly5bcxhi1xp6i91aw8g6gjh48qn1u738s7ykhexfbddaete5pt2j39wsbkg7bhngg9co21xie7b3gyezagnltuh0zhhe82uqclyzggc8',
                returnCode: 2819821740,
                node: 'pxwi72lkphag63hokcq8qi714lxgskwfbh4zb02rqf55cnxy481k21c7kknyu38uzvycyc7c89oihqnf064t9lgj4hf0u5s0nouw5gbbxyippugc68p6bwf9tgvn3987wjf1t5cge7rgl16rr8arr397nw4u93iv',
                user: 'ho2crwjy1ws12wkm6orzjbj4ak923n51s5y3n37wgh3f8ebvufxqn5elkp3qor6d0g76j6fepwv419hisqvrqhugk4dkgfk6v9aqsyrgeyl4qizkh4na9bxl437mmn1ubae2z4l9eu0ms9fq81kce3yp77n8534rmbgpqivugbhxtomvm37hnelaliijhzdlgnt0he26jphmbi73ju20xgzgobahv6hp1p1tgfydgzqnpwn06ak3q7bieu5rjk2',
                startAt: '2020-07-29 05:52:54',
                endAt: '2020-07-29 13:35:13',
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
                id: '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0',
                tenantId: '820ecb20-b97a-433b-a4d8-35a4a3df7e14',
                tenantCode: '8njk2eyr13lonl9yunhlvuif33yd8kwnurlrl6n40yn4224gkr',
                systemId: '0bc27a1c-220f-43de-a154-c67655924e86',
                systemName: '7ov80s8qbvvjx9cctk5g',
                executionId: '5c630944-af1e-4115-9a84-9b3e04feea1b',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-29 20:30:59',
                executionMonitoringEndAt: '2020-07-29 20:15:15',
                status: 'CANCELLED',
                name: 'y1xzfem9dd2ua0ajypazfxdclqxg821i62jq1tn7aqqj054pxdv1h9zdxsfjxehkdpv1h0737y3b2sdw8l4vto3ttxwvl6ya0yr1ymkatyg8jcqvfiapg1ofwuelweibmvup05zq5fgalwiztg2jehg1bq0l6k93n7h7k82fvfychoxk6pyfp94gj6pjk22863zvjpnsl0wfjchq4nqy1ohiglrcd1nczm4rjqvw6uiyonev7dem5dso1b902bl',
                returnCode: 9790018726,
                node: '13bx9x7tf3mz1hp3fzpem8hhmpywqt64s2gw0q88f0kr5v15ikscc14cvai13hee1l4f5z1av18kh4rtl2wehmcg79r54vr2i03lmmwvdg9oizug9px10tjbkizpdc8xr4jycwvxm94vpz80ktxv3sz4npdds1ez',
                user: 'hdqlnasybdzfhx02kbvub3w2l75v88e8v6jdl5opg7o99h9nvvf3tuq8g7w9wx8j0c04qjir1lj3zia1gwuqt225luomkbwd2h3feyb96qvdqqgmlvhhs77dlu02cg6gx5vcwrim9hvyyx8a7k2qhjmfz78kvb2y44ypgxcs5cp60n8nbzl5zxpg2xbrccshauc7gmixz9xam056g1xsoyg83msy1h1pjon4gm17mb9z88fm70f6lupizkkgisw',
                startAt: '2020-07-29 07:47:47',
                endAt: '2020-07-29 06:14:13',
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
                id: '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0',
                tenantId: '820ecb20-b97a-433b-a4d8-35a4a3df7e14',
                tenantCode: 'ffcd2m5ljvujk9xnu3h97b4c0xl5xk2rw6fpnkfppnnw1mc86n',
                systemId: '0bc27a1c-220f-43de-a154-c67655924e86',
                systemName: 'lqyzqlve5dk0mae2ikps',
                executionId: '5c630944-af1e-4115-9a84-9b3e04feea1b',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-29 15:08:24',
                executionMonitoringEndAt: '2020-07-29 15:53:27',
                status: 'COMPLETED',
                name: '8ae0dn8adzff4368hywlsjlqmnscyebiuie67n31vg015hsawaasl5pbfwclivdym011pj2fs2bedn1365q0pa102d20b5ssh1vzlgtc4q3etef8ekffqb6dkt4999r53t1n3i8mabuyw76uupgzhfd8w6mqcwoed7yui1n503wyivtho4ehr7mvrq1xjvvsdaoba8qfaanteo7x76mqwuwigkh2euhr0nwxec7i7fbscps462st4y80m8eqbx9',
                returnCode: 1904229744,
                node: 'v5g8xo5vi57jz2vtlu3wfj03v2fdi3ow8fcjurgxzc7dg1fqhi80o111z08xbrpxq7xsb1vctl1hb4u9ohoph1yrr5ie1f9zgeiyrmzwn1t6g7f3qn2vjtfinc858rz3s9eojs356zo9wnhit6v3xzgrbix6jg9e',
                user: 'y30w5r0wo83y1innkg3um5akmrlbayofsp1joouel9xelmbs1nh0pl7ewv6cuu1yomrz4jho3afnb1sztk9lf4v0jden8jt2hmjlgjv546c5cvwmq60tptddnafyaxaq7r9oy4id57jrch1donq1pbui7dr5n8lgrgwva336t182d5ubylsumbotvp68w55ae418axybj5o60g4re3zt6v38hishryeb67xai23tpbqq97g2rz3zdmmpckdaizg',
                startAt: '2020-07-29 09:29:27',
                endAt: '2020-07-29 04:29:43',
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
                id: '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0',
                tenantId: '820ecb20-b97a-433b-a4d8-35a4a3df7e14',
                tenantCode: '7uibpkb87m6pfc99lf10plgh85iejzm31te3qg5c08svqnv5ab',
                systemId: '0bc27a1c-220f-43de-a154-c67655924e86',
                systemName: 'o7byq7s2m61o8vq1czvl',
                executionId: '5c630944-af1e-4115-9a84-9b3e04feea1b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 07:37:04',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-29 12:02:13',
                status: 'COMPLETED',
                name: 'o2qd7tkam96scu8tj6uzb38h81bmaicaupocan9nshldd72ym2qnqqh7rqtwpm80fnmhdpf451fv1vhoxig8ar6jsfiwstcokpa2f036qfxfsfbrqurq7jt2e4h6559g9t11phm2juby1y8xua3ft9nq0ohcqcoxxxqia1zigyt5buq2vvqndu2tjwsq1ln7ebw0d40ku3dacw2aqq2cl2psc4qczgqg3fomlupxxo8or4vgpaf8reih4lhe78y',
                returnCode: 5034055826,
                node: 'qm2nyquym7slupb6bi8rkem61vvrzsc2jlv7yc4e4kzuo6yvf8h7q171ief7vyytlkag14dxflvq2r1j2syxs03pe7qf3kqoft4viz3a30fmazektafw0zemn3xjdj7ow0ahfwjstao1iad4gqj87n1ei13xqj8c',
                user: 'athdydf3yc94t0btur0u7vm9x38k7klpq0ymsmu71j3j1m47o8tw58iw8t9lg1qrp70xklw2ufcd6urz9lx9ie4c7u1xkv627pybyh5tcey7u1xthaoujlta1yf3gg2f2bmdyxbblfluih66tk4a6rtr411ilqg8ii2pkgbz14ajt4c9rzz6158lwg3001rfjmj2auxvmwpzpybt6y89ay29fse6i5a1140sknsgcbibbwsajke8o2e1atoqt69',
                startAt: '2020-07-29 04:17:26',
                endAt: '2020-07-29 23:15:44',
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
                id: '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0',
                tenantId: '820ecb20-b97a-433b-a4d8-35a4a3df7e14',
                tenantCode: 'lrj7iipelrmtt80car3vvwl8d38lxls8m5ctp4y95r1x24xuad',
                systemId: '0bc27a1c-220f-43de-a154-c67655924e86',
                systemName: 'bru2rnaeme62t623ue49',
                executionId: '5c630944-af1e-4115-9a84-9b3e04feea1b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 18:56:21',
                
                executionMonitoringEndAt: '2020-07-29 23:25:47',
                status: 'COMPLETED',
                name: '2laa9np4f2oyis4stwnt31gzet6qmdlv3d4h21pdsxav8uffv939djg488j9usob6wkw27v0e96lvargk64vfvknhy7nctshlk578ocpxqrc539u8hgdx2nmv6wutslu8dppavlrc9v5rtq30ena9i53nn0ul639b6lzv1ho14qh03q2nkoljf0sq2wd8n5kfnttxksivmwh15cp5yg5v9xdhapuahlm4prybbftyyiq8zbci42tco3oiu10t32',
                returnCode: 9336135358,
                node: 'unbi14nbrlv9kc8uwdvtz7dk6jk8mexp4m0iak3mh9aq21duhxi8hk2137j2aldx45hhd53fu5xeo5ymze5zmd956puvx5lnq7hrgk6dwdgvqqlcq08zvw7v0c0xlel5q84wsq2t3n7lg29l9lmald9jc832abg1',
                user: 'h1zh2ppl1p9w40bv8007026gh68a5icy48sgaaa3a8hvaq3xjbh8e2bhxq0zgi792rz0jje9ep39rodgp5qv1plo703fs2ihk2va0ibfjuba48giw9446s31pa4ixh6j2nz68gfskkj4n6c2sdf8m6gtvy0b4nbwygi7wn3u4k0gtnle7gbubnjs84e7b2emoqpx0oqkc1m4lzwfvorlgbrnmorhqqicisdmurbap0cb837qxug32igrqck7hyl',
                startAt: '2020-07-29 06:26:05',
                endAt: '2020-07-29 15:41:41',
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
                id: '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0',
                tenantId: '820ecb20-b97a-433b-a4d8-35a4a3df7e14',
                tenantCode: 'd6da192op1214bna7uhw1h54qmbzjv85x28mdqdk9kd619evhd',
                systemId: '0bc27a1c-220f-43de-a154-c67655924e86',
                systemName: 'tv46g0fp8d8jueq71ocn',
                executionId: '5c630944-af1e-4115-9a84-9b3e04feea1b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 05:17:51',
                executionMonitoringStartAt: '2020-07-29 15:59:04',
                executionMonitoringEndAt: null,
                status: 'CANCELLED',
                name: 'zru9jhtrsgs1k99ykzvt27xu0bu8cbijwys8waieuyfqe8xirxwm6jwgnnd60nd5pfem8xv9nfba7lriuqj5muyldt9ziffe144jbuiiz89kuyu3owmgrtj5u5lwuwkgqzve7rhqtrw7mkooyctfjmi55unvcz11a2oxku3z9cmw9maph44uqbe7h2nyzqqnqay1nbhrosl8xavff6193qmidjy7gpxs6qxftk3bg27ixwro6d7wx0wy4stwpyh',
                returnCode: 9508932832,
                node: 'ra80ao7hvczyg4spp3c2u2rcybavy6n7bapnmb6mvhcs1rcruw08tf9j5lhvn9fyszs6zassgtys6syfcenn2bpxf5ymq8qiwqwxtz6318wj2mctg5g66nxfmutdchq30whf0zliirskq0ya8wdb50184zwxy11p',
                user: 'pbxhrki7ejcnpv37rnd5ey62pwhnoewxgzkbw298h5o1d6gh2g8hqqnlbgv1jo5xaxdzwvfjyces2nqkic817mbmen024frvnm8vzxdb8gfysd41bp1xkzx0tti3413e4efp7h73oato63sjkz2b7p77caw5y7lly2w3um4zyhy10fm20qnb8gixhsop0t8m94yt61kpm6sn1ouceum5h2bxhlglvrg3mbvwl869vkpqzz6v2nca1gw2cka2isn',
                startAt: '2020-07-29 06:57:34',
                endAt: '2020-07-29 10:53:53',
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
                id: '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0',
                tenantId: '820ecb20-b97a-433b-a4d8-35a4a3df7e14',
                tenantCode: '8u63as5rx1g7sj8dsiwt86kvt28y67ftzbp4d1e6wsaf3zpxtr',
                systemId: '0bc27a1c-220f-43de-a154-c67655924e86',
                systemName: 'sze1nshoc0r88jt75q7y',
                executionId: '5c630944-af1e-4115-9a84-9b3e04feea1b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 00:52:52',
                executionMonitoringStartAt: '2020-07-29 22:07:08',
                
                status: 'CANCELLED',
                name: '0vofu86m6bhdboku4o75wdekmu2p0dtwe5b9oky2cyt1jlyds8lreds3qklxx2fpawkm842htf3rv0ds5ze7a18pcurxbk6u9sve7zkwiwtkmv5nz3v7i2zyk9rk7phltrsqst91drvvzqc59y3a7e3mwg8r5qqeb38roopecp688xiddx093zje4xlxvi0y0pb1nl68dd4tdl9jy1jcs6g8vchxfzgpy5g094jdtiduw5bnjco63aqmz2afnsd',
                returnCode: 9269777253,
                node: '6etppx5gvty8dz1kwv74cn68dzapgouszd5pnul30wcvg6v35sjdu0e6l22ygbfvioy4h1dupw7hxa5bgcmrtqgjz8ddrho8d1jn4clpuy2nievyns53ygdrv6nnuuz8g0ql6m1du6as4xwkf5b9qj5y0k7y1paa',
                user: 'h232npbjohpmmgysu0iej4zut8fq0pln6u6gfburua9nhhffgws9ufyk5vq9gxm63md4dhm3078gjq6itrk1j2r2rgbhqzbpsvws33jh3se9elmtvoo19o8iwxesdpfidj77qpf02mvvnq7kvwkrfs9kz8c08yvoowvr21a5d19mzrwx7uiy52yh2yuj5ki37569u2jgbhl2fbfw78ehtd3lk6xkg6acri8icwebv5ohpifecmkthz0w2vv0cid',
                startAt: '2020-07-30 01:20:43',
                endAt: '2020-07-29 06:17:21',
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
                id: '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0',
                tenantId: '820ecb20-b97a-433b-a4d8-35a4a3df7e14',
                tenantCode: 'diuz2ldk8qgiof09j24mj0degdc2s98jjbza3ahihis95zwplq',
                systemId: '0bc27a1c-220f-43de-a154-c67655924e86',
                systemName: 'z5jqk8ifaavtam0nzwjw',
                executionId: '5c630944-af1e-4115-9a84-9b3e04feea1b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 22:50:28',
                executionMonitoringStartAt: '2020-07-30 00:37:26',
                executionMonitoringEndAt: '2020-07-29 19:14:36',
                status: null,
                name: 'jhvvjaragq4t8cttz2prfpn08iatjne4wlys4bmng0jdzgsntljr3gqn5zp66bftbfgj2eg1udc8f0bpva6byfywc11p1raxu6x70zxi7uts0z9fp351rdbrg7s2fi467xbdwy2zjtji4hhi7t1mnwunxhfvpcutwgr7rqdm4q05r21fcwdkymwk9w6s11977imlguuqn5c63vdhcgcv058vforyte1mp9sqng4brietrbwzewhalz8zzw4zra4',
                returnCode: 4460721070,
                node: 'cooodwts00hkt7ldgakjgt9ixcvl7t52vwdur0pjc5jnw6ykndipd8ymwdolml6w53hlpnl58byh0miodd9auwvapu0tdcskwyyw5gjbi35egy5rkzqorxq1vwff42tkxs0o2jd39rv59x5dsp848xhdrxs9d3a8',
                user: 'k4qx06y3v3olt70i5tuv74efsor0q6u7al1ub67fyr9y9f9pohtdloa7yzxxb7dy6uz9tg8fz11se8bfo9ux7j0saz9nxm5ghxtyxnjbwxy9at9jc4hpnzyip04jlq5in494tax41t8ka1m4a10vfs3r5acc9bz6v27i5rqbjkyg90tiwo7nk7261aevmc8107do31qa0v99stcqvao8xamriisa799r87n68e8mozo8b5ve1arsj8g1frlfzux',
                startAt: '2020-07-29 12:17:29',
                endAt: '2020-07-30 00:21:19',
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
                id: '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0',
                tenantId: '820ecb20-b97a-433b-a4d8-35a4a3df7e14',
                tenantCode: 'la7i7v9gzuupaz6mxg2alsy32rbue8wp5eugmcv9dbw9riv54u',
                systemId: '0bc27a1c-220f-43de-a154-c67655924e86',
                systemName: 'e58ywi2j1rx0icm9a17u',
                executionId: '5c630944-af1e-4115-9a84-9b3e04feea1b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 19:10:22',
                executionMonitoringStartAt: '2020-07-29 17:09:44',
                executionMonitoringEndAt: '2020-07-29 08:20:43',
                
                name: 'jxeta46kczfevtnspltor3fozbvympjyuwajse4pgurc3z72ztcghuyb7x4p0ub0klqipln72tjz7wrhufzw71j3tjc3csge7xzvvayxtygo7o3dbvld26994vz89ij6wklrko6zh1rytr49q376mfg3cr4toaddqsmh17qnekm6k0a9cwpury01kd5oncun9l6g4stj39bt7tsa5smppb8f8lxz2xcejmmi040wcwksbu89zfgcndbl1gxdlb6',
                returnCode: 7935868848,
                node: 'st4qxepqt02x9bdi3zfuundyvde2mwa6kpgao329d9vg82ftshz9rp5abfypbrg5lfntmnmbmjimld564txjzifmrtmpfwtgf4zndubo3xx2o5dkq9ubqjgji4i5zklosf1siikf4mntwbbo4cqvdclvnesjasnc',
                user: '88wyvvm25oysm3pv6i4nwk18by3g03jyr575xb4hwdbwgfdj8cf33rrdxde4wwzfg7ekz9yrzm8b1d7op4o5zu2o522v7efhgfsc77mfatuj4u9idb289vuqkmdkbpmgfrg6hxhkf3its65pfugm8i0eoux50ukxyi7xeafiqnjeufwgusfkuqq2sffzaq1q4m1peqlbl3znywldnq8yuwd6dpgk8jm4nzg9mgir8kna3jdojidoyonp16smmpd',
                startAt: '2020-07-29 16:09:27',
                endAt: '2020-07-29 05:35:07',
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
                id: '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0',
                tenantId: '820ecb20-b97a-433b-a4d8-35a4a3df7e14',
                tenantCode: 'q2ixclv6dryjti0hlphwb57fzjo26397qr1f6qp3gw0tfa71em',
                systemId: '0bc27a1c-220f-43de-a154-c67655924e86',
                systemName: 'w349vxdmdp9q39ci76hc',
                executionId: '5c630944-af1e-4115-9a84-9b3e04feea1b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 20:01:50',
                executionMonitoringStartAt: '2020-07-29 11:36:00',
                executionMonitoringEndAt: '2020-07-29 03:18:11',
                status: 'COMPLETED',
                name: 'jb7xg9xnh236g9gdx57jnz1zodv5fjjs14ae6xi33s31en3mv3jkdmy2o9shzww3jmh9mes3bxnxfse3v3s9u0qua6u03m06wh0tsf92em2a75zl0s8k26a9gctb7p58rzw99dw3i1202xpdfs3b8xpy4yod06avfiy2rxgrfueg7hw6z2t164473tabwwwbkgyhxpjut1xtsmjr1r9d3lf2zb88w9oa7yg87ln0i2y4kjhhymemd0q39q8vfis',
                returnCode: 9225647984,
                node: 'x8wbkbwt4bwvxyerg4l9u6rc30cpe0o2k795wvo63q6pmjypz9qv09c0n4xtufgz0q1sv8zgogkqbmv55oczt8p5dvykdwl4768e3wwp2r2a3z5zp7g69zty31k6c81jm8c3fj6inuesc6ir33xdg2wgqfvbtuu5',
                user: 'lddnvruy6rxixvho4zxfca6onqkpokv5trte5eebntnv4vtqsp5492tncm77urd69wx1tu17rted2q9el4zkxycq0bwpurs6otv5x9uve1fsnbs2p40yjicg66e8z6nnit7nnhszk3pclvlaxjiewxjp9k3ke8dc8fuch60gu9qf14deovmsrehwf4e06ntu9z4z2uswfu4ukaw5jlpfvy2l4ie062r38ny4sk77cm5t8y1y0ct6vxd9h4x7cnf',
                startAt: null,
                endAt: '2020-07-29 03:43:18',
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
                id: '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0',
                tenantId: '820ecb20-b97a-433b-a4d8-35a4a3df7e14',
                tenantCode: 'a1tyfk8d67sd50kf8jc5s3fc0b3u4ywpl6a5feg50y03qk1cln',
                systemId: '0bc27a1c-220f-43de-a154-c67655924e86',
                systemName: 'fptzxodfkdvos7vl41bt',
                executionId: '5c630944-af1e-4115-9a84-9b3e04feea1b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:55:40',
                executionMonitoringStartAt: '2020-07-29 12:48:34',
                executionMonitoringEndAt: '2020-07-29 03:02:36',
                status: 'ERROR',
                name: 'xy4aq2ty51q936mr1463w7yitxzm7bg9edip3qedhukb4gox73fvopems01gj56lyn2fkrh5peqqo9znb9c4o81vczupknvh5iddo5sw7jjgwheux29pzpec865tbcqfaorvhd2olhbmnvh5c956nzgahecl4rkvh2h6w3x7nqc75qpkqn8c51p2tdbcgn6fxtbxo1e50vuj32jab3lpqgj1wm4bw3ku69xcodxyew09t2gz5sx75rmnqortfks',
                returnCode: 1763400777,
                node: 'wavmv1f8rts4q2zd9qgq1jyzaedhu9rria1doezh0ncwg9mgfed2r15i6m8zspoc58wdweqqtujdt9zxjj52igx1l5k1h2aldjz5wkb85yicux1gtera09abiteeb4y61ppoow04qe20efh6m4c9652awih2a5s5',
                user: '75w6eoez5ax1sgan5sb1j1inxlz9ov12r3nvme5252uirue8bgcpalhmy6c1wqjqyw6lerfy2wkw9jinlopk8gmkkm4eabbt4esfqwlzts3frugnjoatovkk9i4yxg5rhbufqmbj14bylhnh253qk8ntnjsbaih2841uo16fexv5qh9gmq4xus0gn07as4glvseozwbn4tkqmjwh9oi0pw75ws595cfb8qhi00j1by2lhiyqsm2kec1xdzv4mxy',
                
                endAt: '2020-07-29 23:12:49',
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
                id: '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0',
                tenantId: '820ecb20-b97a-433b-a4d8-35a4a3df7e14',
                tenantCode: 'jt1zhgn2nq2s3r3t94dxgi8khulscdhitlkdd7hksj93d4dtrf',
                systemId: '0bc27a1c-220f-43de-a154-c67655924e86',
                systemName: 'ce8ud4wq8qoj5224qcn9',
                executionId: '5c630944-af1e-4115-9a84-9b3e04feea1b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 22:11:53',
                executionMonitoringStartAt: '2020-07-29 07:33:07',
                executionMonitoringEndAt: '2020-07-29 13:20:08',
                status: 'COMPLETED',
                name: 'vz9ou91ec2rywah6uxhls0ide4tp68tzluhmtvwkwb1ytj32weu0kfe2weq7hw50wmvyvf30xpkoh7xocv8ndszvysfyob7ujvtu08ohtkkk7909sbpf9mm9bqv1vkzg3j61uiqu8otjcp2z4vqbx7hy3420jv7cu67ahzj69uhykv0x3fthnmmkt4dqmf0kqi3nqymtnln0hj1dq6jju9tidf9502jp0o2yi9w0bjyirkblcgqwmt9xgv8iuh9',
                returnCode: 7611279146,
                node: 'g7lvtvi1au9dpmeegzh68p1c0d4hpny4pe315l12dxpvgess06t6xx632p52ap607y14xnwcvnt4ekt33og4bqvldjdsc59hjyo4i20blwo9ilyowalt9sq41ll3j33veybk6b93b2bmelrqx7r6r0ywet6lteha',
                user: '5ucu1t3v7j2dkas62qwvxkrfd1wgoe9xskevfo4hyaglxfaq6egq211i54y7o6ovlhqbl4el2o06p80imtfb8s33sd77lu8jxp26mc7oi3sg76kugy5v8k6hzobea6ve0prazhuapcm1rm932398d0zs88wq6y6h3fr05ql0kq5sr434cfhnyo0oi4pg6wi2dznmhfld0irvrhrqx2a05558smiyvnkldt7kv59vf3k331wks67ykpu5kjylyc4',
                startAt: '2020-07-29 23:57:32',
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
                id: '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0',
                tenantId: '820ecb20-b97a-433b-a4d8-35a4a3df7e14',
                tenantCode: 'b2b4cwxbknd6naunxsw1dhrkx30y327c3s6cyjhygv78cavjaq',
                systemId: '0bc27a1c-220f-43de-a154-c67655924e86',
                systemName: 'mghh0035oqglqdb638br',
                executionId: '5c630944-af1e-4115-9a84-9b3e04feea1b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 21:10:17',
                executionMonitoringStartAt: '2020-07-29 22:14:38',
                executionMonitoringEndAt: '2020-07-29 15:31:30',
                status: 'CANCELLED',
                name: 'ewuoydkfcvkqq09f4teigj38h186ur38jx480g6t27z21jbarnh4atb90o3tl9l541h6ikhcgxr2sufji5uipw7l0zjv6q1sa1ihcho3boycmlxcwag1kepdn3w49615nzem3dwq6kl4mzwn8adji2atxrbtkln7pl8wxsv70ovy3ojbp6sarhyyib15p82q9kfgnr1g0lbf65wnqbx0wvtv7s5ah0g2r9miw44xu078ko0ttt2s8kcdeyaxrnf',
                returnCode: 3400316791,
                node: 'bs4ecxmjb5ol4rnbcj9oux516ti1xxgwdl6d47gwe3pj98h40ot2q711dz4ufo207tofpasig6gy6m4jtrjzb3pst400qx3oeyt1c5esv3p3fciqof0ctmskn9jyptayg97xypat21cochv4g0hua2ydauqcacvm',
                user: 'dboca9i5mhhg43vh24f7qjm2lcp3xhnsld4xm3pmspfciszskhpnkemb33si4emaj00et85mffsk7lautw7fotkb8xcltu5c3fug4syudmtjcrbjv2itsm2y4a2z53q1pbbj3w1xuo8ou9szrkrmhe7lcn3xc3r04kl97g709bqv2a62gm075gnoecgnrx5endbydfdtsdwok26lm6tdise8ci0cli1z0g1zel46we367n716ssz0d1af0gpe70',
                startAt: '2020-07-29 19:25:51',
                
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
                id: '4r4x1ysqym49d9vyn1jtrwq8ay0nrlb5x9uil',
                tenantId: '820ecb20-b97a-433b-a4d8-35a4a3df7e14',
                tenantCode: 'j8c2j9cd4hzwjfr66293c33s6brdxihqmc6tp1x1kmyyd7oxqi',
                systemId: '0bc27a1c-220f-43de-a154-c67655924e86',
                systemName: 'bf6x4s1o09xxaxupteov',
                executionId: '5c630944-af1e-4115-9a84-9b3e04feea1b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:19:59',
                executionMonitoringStartAt: '2020-07-30 00:25:58',
                executionMonitoringEndAt: '2020-07-29 14:58:30',
                status: 'CANCELLED',
                name: 'r1ntoq4b1tzajo7bjvt405joznafhposmvwvf07srzmz4qflu3078um46n55annt0oo4kskg5uhsfrlmbs4nx3bkwcazd0xy8gjnetkcryy78m15v3m1njelqbv19vpahkycbswaz5l8x9owehcilw63uxm53e7uvv5yxxqgn3fzk79lnfhl926dswqm1kbnq672fwppcoqva70id9l0o672i1sj0f4t7inz2uf5yt3mx46evmzyfgxnrxqta1q',
                returnCode: 5384601819,
                node: 'o4lrd2sdbzi2qy4gvgf6hremb3z979r43utthsoplgdjefp8tstjxnfeomd8464i1nw30y41csd5zfdl8ax5btx1irzybw9ue4ixpm12f4uyo64ioxpy5r3fe04ao0vzx91ss6tk5q1wjuzj54me68wxsk2g1bx7',
                user: 'ncpde82yxvbo425kzl4bg2qmzmd34vycht2lr1yj2lt71kfnxvoww7ktp81fhazf97bet2vjzmsj1mi0dh00lyb7qu57zaybwd8j6hys9510p1ycv2kpcg4j4f12ojwcifwnufmwu8beft2r7rz6yt2ofjf3q6jg7i4nieiaoa3yon8nz4m6z2u4m181myox0lduqk33t0eyc8wuooovdhtwvbc9s8h32pvsx6wec6n55smrwj6u2dvq4b9k0b9',
                startAt: '2020-07-29 04:26:24',
                endAt: '2020-07-29 21:39:52',
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
                id: '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0',
                tenantId: 'b32ysilb6uw8igvqtkskuu06d0yopbz99g2z3',
                tenantCode: 'ii40po87ktphnr6gxnztjffs4nl9o1fow6h1rzjqevuhn2cjw1',
                systemId: '0bc27a1c-220f-43de-a154-c67655924e86',
                systemName: 'jb6ie1vck40yhw5vxl61',
                executionId: '5c630944-af1e-4115-9a84-9b3e04feea1b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 01:23:02',
                executionMonitoringStartAt: '2020-07-29 12:12:40',
                executionMonitoringEndAt: '2020-07-29 23:02:37',
                status: 'COMPLETED',
                name: 'oy2x8203c6twymv3zb5h2b2hzf4g2sv8rrq6g6sxbmx3nd66sahdbw05o5vefwutfuor7t7dwtcxxoe780fhbmrjesrvq78ypuvub9lvj7qa1tblqje4mc6yh9un5a3zxq5jigbthm31qwwp3bu0phf6ofdudon60ft5cws7ozii8xjon9eh8cnznn82uj0gwu9lm4173utyezk5fg4noax1qcj5ye4bqv99v4wr99vm4dcw01rvj786ufv4i7o',
                returnCode: 4804130565,
                node: 'bzzs9xw9a50ee8acs0aib7yfpguze31ze07jgx279aonrmd94bke5jjv2elz0zbrz0gohbqge269d5hhq56o4ojksbdeygkhro0v30a1wzifhyjkn2eb0ciaruhiyakxzm1pos883grojdtct88f2hwgx5y37x2h',
                user: 'ql904ffax6kdiobi7pb8ijpbch96icxdj3v4aknbi2wzy69yds1cyxtyc02k5gnd4kxpmvrudafdok8qgizvyoiwlgma71cccrd4f7t3q8wuh6msv6jia6ai9xjkqa7k88913ba9mhge4abrnt37jj1sdocgdkw28stms6nkwnxq0dagy0tu5hmqdg4ec9hp206su5x8e41dhzncog2ixhee22l2pdk65yj6ntmx71pgscdy8qctpvy20cj8mxn',
                startAt: '2020-07-29 12:36:27',
                endAt: '2020-07-29 08:33:08',
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
                id: '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0',
                tenantId: '820ecb20-b97a-433b-a4d8-35a4a3df7e14',
                tenantCode: '69yw9mx2r9lhpra6ghsgjmv62egytn79od8ymeyr1y9tdmcy1j',
                systemId: 'qdgasv0shg463zwfr96gv9atfl46ko2oh36g5',
                systemName: '6cnox3pr5h1f2ufqtxzg',
                executionId: '5c630944-af1e-4115-9a84-9b3e04feea1b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 02:09:08',
                executionMonitoringStartAt: '2020-07-30 01:19:19',
                executionMonitoringEndAt: '2020-07-29 17:13:53',
                status: 'ERROR',
                name: '7qztp6ozhc5bpmuzfjmgy5xbpgs3665u2i1fczoc75qmkcveok38iy3jkcv67juh4opxwkoj5itxjf3orphq80pi3m0wacs4ai06hhshp1f4582kskxcb3xy9etpwrmexn0iqp6s37ks894w632v4cz31ppqzykgxoolw9pm4ee56nww42a7upi23gsc3ekf8g5swfdd30xi0dxmyiwsl9efbq78smqhb06rn3he9fudwe5d716pgnf1t4t8dzg',
                returnCode: 8298318589,
                node: 'dbyx5je9diknnjpt1b1fphdyngtylivjxas2bknbsg613qs48uqvbed9u4f13gslqwo5bopzm7gjm5r0tt2p1ot92sten3tqv5xq26x69a7td3niulgr82i157d6mgcpth53u23azv3jsfzfb46unra2lwxi36z3',
                user: 'drx47rg801dyvz64t3qtwoof13lrnteqowey4940r4jimd5r4hu5ddr5ijjwa0xkaoq9sd5cmk2hdnzcw95fr5h6myxrzeo1l88gvfhyw7oggst1upu1bmfmn29f8ne9z8vs0tt8mavtkgdadgua5m0bb33l9f2gnb3p733m4v9kiruprnvdunnwctfsfgyviczk9c9azy0w11pj0jt96pop2h5tqs4t2zn8eosgc4kixkrvcw6gh70ivrmf0sc',
                startAt: '2020-07-29 10:02:47',
                endAt: '2020-07-29 19:34:12',
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
                id: '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0',
                tenantId: '820ecb20-b97a-433b-a4d8-35a4a3df7e14',
                tenantCode: 't0b9y8t81cet6st1aqi06jyhpkkw3h5g8kcjv94gbbhcvl61he',
                systemId: '0bc27a1c-220f-43de-a154-c67655924e86',
                systemName: '1e8cpj560knemb7kdc5b',
                executionId: '85l2n1ovbug2z889frqv889gjl9gehgez9ve6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 13:14:48',
                executionMonitoringStartAt: '2020-07-29 18:13:43',
                executionMonitoringEndAt: '2020-07-29 22:19:23',
                status: 'CANCELLED',
                name: 'ysgoivpssi5ee1kacty6ztb9vmsbd0w6sx7mcnacpe6n6zet9xvqep5lk6hjoibif88ldb0kbqce7qe5u70fwo53lv2qrv7zo8nkns2ioplhhbjp5k22zxwqv2eptkaxzu0q5ttur6tszlmougmjb2oy6dilropsq45rsw6zaam2bv4cgovwk8a4rq5029cro8p1cll2c3qcx1y8ltlfco8qjdlwrga436zgdtn4kyorl9iegp80tg23ky9sjrc',
                returnCode: 9801752291,
                node: 'jvnmmb1k73oj3z0l5dqyw3j2um15pbyvm4as95d9nj13xlqb6xqi2m68tiwlh35p2y0aiqr3kpc6j9oaswrhoswtbxzc9fdaokcrzvho26n5hh0tk0bozb7gqog1zuc35e0n1s40m5gxf7xd9kcm55lcsp7j98yu',
                user: 'rmg0339dr8jdrl8nbhrrdo16wp7n9nbxhgxx24yom5xatb1317moic9oeyuzqi9mbdx4p1blmzznu9ys5vuk3nwz7g02q3ortspmncw5oemjkr7lhfujfp549xgluk345ey6krik62650sdz2h9z9qc2b88g21n373p78t9no5wldf82ojfd03a8dkoxsmmx3jmlmsxhsml8w3qtwbk655vju6rf3v52vrsmixsftxay5jj2jj5evzkdd5kxirx',
                startAt: '2020-07-29 14:35:50',
                endAt: '2020-07-30 01:12:34',
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
                id: '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0',
                tenantId: '820ecb20-b97a-433b-a4d8-35a4a3df7e14',
                tenantCode: '2chplbe31ktnpb3fko8n7ttgjzbgw8cws4gsx9hdkmfzvmszf3t',
                systemId: '0bc27a1c-220f-43de-a154-c67655924e86',
                systemName: 'f3fdzkimkec08igdsojg',
                executionId: '5c630944-af1e-4115-9a84-9b3e04feea1b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 10:42:46',
                executionMonitoringStartAt: '2020-07-29 12:56:13',
                executionMonitoringEndAt: '2020-07-29 10:50:32',
                status: 'ERROR',
                name: 'axzid2pynoe3kuhy6wt72lnbbcymw082q894vzjorin1w2nfavx411ia21jjgapp8navr1guuufs7n7p4e1a3lpa3b23ygoa97k7ilgzfin9bu5rizfc8vl2vaa94m6nbius4b6koow5o4fc4bvy1xe2fwvutxukxtohoz0cteh4c1xr33y5s0tq5zgj3jc3wuxvdatqigud7vl6q8qkbpzt8d07indclblcv1goq0g03xjigqms0qz00zfngf1',
                returnCode: 8520997612,
                node: 'gc7vqktc1umjk6gu5i5jy68grldl5db7qrgf186u4h894kq7fulqtbp11wou0nnwvo8paz5q96ukuvmdh1row0bovx3b2b4gdu8l3ufwhmzcqcoz16grqnq22dcekt9boedyiwytryo2x3wpgjali8w0256jjdi9',
                user: 'xk10ag4303wjjlb8a0twh2h25xy714s0xkhpbr4tsyzyqb5jnbyk2c7p7kdma18asukg5btody062b1k1ypj5f1wu1t1fs8he2fvtb4vroezwm36jb5kxfl0mbl2er7oq5hq9j7pxv3v85j4kwsqxgnh0iohs6im8jk26aes9v1ub5bpicojnndm7c0e93i28m9ubdcaazaon1frmo8pzj6bbi44pvzbov2aj9c9bgzmvtkwbqavwghyglbj3tf',
                startAt: '2020-07-29 08:44:28',
                endAt: '2020-07-29 07:11:01',
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
                id: '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0',
                tenantId: '820ecb20-b97a-433b-a4d8-35a4a3df7e14',
                tenantCode: '1ry765rb817y1usq99k2mhc0mvc42jbv6g6w0gcrxdpquw2wjl',
                systemId: '0bc27a1c-220f-43de-a154-c67655924e86',
                systemName: 'dqz190ds9sodslrmgpp2m',
                executionId: '5c630944-af1e-4115-9a84-9b3e04feea1b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 08:26:17',
                executionMonitoringStartAt: '2020-07-29 14:22:33',
                executionMonitoringEndAt: '2020-07-29 04:35:44',
                status: 'CANCELLED',
                name: 'jj68eqltis5szy89mykloi2u993zf4i5hpfjy154ktngarwi2avdxd7iu3td431qnxc6e9gbt1ilqn3ei0kn83o9nnn880oxy9cgdcv9k5m4qs2f3pif8do9hl3aw8yi0z1p8az2moxcpilgdi9at7n0gqdi8c0mqvuij5imdx7k96os0l77uv9n0mq2nyl03gn2bozq5cyasukrnykb57cfk3dhri85y7jm9c4e0l2kqv52awpuepuwgmycznh',
                returnCode: 1220515174,
                node: 'mqs8xwqipm07l320wi3hxkp50i31zwmyiyyzmfcdba2kukquubmys6fpaz9m9sx4oljtovcghuoonmxl1dfg26k5sd0k12t9wx353um7sxf34tb1juatci9eqf9334o7gj6xfuggayq9rdt7808mnud53zlwvaco',
                user: '6ob1p1c9tr0bove2wz9h4ijsjouwwu1nl9efrpa177f60pmzad0uukc6bxqtcksmy6ivmfli3hzgrv6v5cndzmeugwtbbi23jkpcv9y1m8r28nzbrwcliq2moukj2l6tv35zcj39ukt7hgbp6xhsfpwht496av1rkwn4un3heuqaxqafevlwlssujeabr9j7dnfxo1yexq7plonibggm9q4crjdtru6l05kgbz05nmeltgyzfsq35qiluwac3en',
                startAt: '2020-07-29 17:11:13',
                endAt: '2020-07-29 14:22:10',
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
                id: '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0',
                tenantId: '820ecb20-b97a-433b-a4d8-35a4a3df7e14',
                tenantCode: 'ic63uwys78i0b2xoo6lcialwz2gzovzsvafuwv5l3ihpo5lvcx',
                systemId: '0bc27a1c-220f-43de-a154-c67655924e86',
                systemName: '3kooezd8vxd9uhsal74u',
                executionId: '5c630944-af1e-4115-9a84-9b3e04feea1b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 00:35:30',
                executionMonitoringStartAt: '2020-07-29 22:25:28',
                executionMonitoringEndAt: '2020-07-29 18:52:43',
                status: 'COMPLETED',
                name: '76jmgqo4x3zsshj1osxtr1ic1kfhiqikf2v8ikusdravglrfp2zfsvvf4k17cy4dxe7oo9w3ioh7esft0jjjpr2nv3nehjwwmkmy3chpqhi42gqv4r38xzfjwrqxzv250puhe298nmk1je6gb51oh05gfp0ro0oqqbhssjallg78muhma48or6zcycc11naekto343ns2o92be0y96b4mmlpmayd9bonwesqw1e4cbeuwjtz63fwrh5y3m85fl1o',
                returnCode: 8585547482,
                node: '26zfr0855sc1963y1afi7p88oatn1eh38dagwbuw89yddlh8qa7uri3yyyu09zru5ygrjga2pd5gpl3urss6ad8jx7cvyzis9te659afizbihxm2mhfc7hfvgvgu9hp61dkaqjhbb73s4t1o2n0lmdlj48gb7rqd',
                user: '2xxiej3nsyi5k4wspc1wa11euuobog8a1ijfkayyc6z0c0c8rm1gmfdszcvywvwsib6vfha0dngd0rebnygv67oje5kleh67z04rq0h30tqxg0djxwxxw0d3ky0fw3agqidiyeub7xi232g3qnsdcwogihtzkc8fvn5af0dd5zk7ux0i3ubfga7pgx4uta8yj7ua2uv58o3is3wur4gq60akcyyrm87i0w82y296ekpf1hk4aw4i4yahllud5mx',
                startAt: '2020-07-29 03:34:56',
                endAt: '2020-07-29 15:30:27',
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
                id: '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0',
                tenantId: '820ecb20-b97a-433b-a4d8-35a4a3df7e14',
                tenantCode: '2d7rsmjqrrq3xv6zh7obabg5cv6o2nk5k8w6bg9c1b20herjb4',
                systemId: '0bc27a1c-220f-43de-a154-c67655924e86',
                systemName: 'n2zum69ywns1c7vcvjp7',
                executionId: '5c630944-af1e-4115-9a84-9b3e04feea1b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 22:27:00',
                executionMonitoringStartAt: '2020-07-29 15:43:55',
                executionMonitoringEndAt: '2020-07-30 02:12:41',
                status: 'COMPLETED',
                name: 'wis3rkawnwmwdtlqrstkhdmsnc8y5npnfsyofytgzo92idphfn82yws4ur7od4mmhkd0s4d5pv00ghb4sxx3xr0dchuclygeq7z2pri16yhnp43kkkr0qi6grhb2h5hq8s4hjjewu703tttfsbrx1mxxumtohdid51yc69jmxc51zxlou0xwybybhe0ijjhwd06a68zvyb99a5umrlfcdlw88yt5kfp9wc4jc6gaidppov5riww30jlaak3sevb',
                returnCode: 33376266172,
                node: 'aceqbhd0lqiws9h98puaz221fvdcjpb1goowzf81z16768ztav55ffmvto7e1w2vi0n698v6i9j1md7ct43pl5b8ewwfd91c7gmq1xdnganldygjb88stm17ba9hvomji7w7vuc4r0jdzekcl9corolq4231idzn',
                user: '8le93suzjydicr2gyjqp4acv1atmyutkyi56nfqp8rin2gkgx0yo0m3yl3piq1vq6x0swouekish4giwf9yq5dg89fr12tnr93l4a4adj9cnlh9h6kt23xgldseosac19ynp88fd221f0c1c86h0y4yihnedunrn5k6fqd5qp6y8zqm84teion78hs6adkowdhba2uubw4yurk0u73y9ktk5t1925jjichdy04i94ef6d41l1lrzfrxzlsejg34',
                startAt: '2020-07-29 14:49:18',
                endAt: '2020-07-30 01:28:04',
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
                id: '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0',
                tenantId: '820ecb20-b97a-433b-a4d8-35a4a3df7e14',
                tenantCode: 'cj90smsxwhk2vboim7x5opzxahzepmal70eyo2rbm13x206rwl',
                systemId: '0bc27a1c-220f-43de-a154-c67655924e86',
                systemName: '0tijop7kv848lupl5ywp',
                executionId: '5c630944-af1e-4115-9a84-9b3e04feea1b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 03:53:07',
                executionMonitoringStartAt: '2020-07-29 19:03:15',
                executionMonitoringEndAt: '2020-07-29 10:20:28',
                status: 'CANCELLED',
                name: 'osec4qctywr8pk7q7jmvtss4p3uz8d86g5ksmnmxye9w7rhg5a2hbx9397drfcr0n3pwuylt8idsx56eudcyh24q7mipc1jnasfosj6v4goqmqu3jdwtxkjagm2lg01zwsegjcthgzt4hef0flin4jp0omdr75w6rygmb9iqs40cp2hmso58gks7uy646l6xrp1w5t6g34x1zoolx0iye41q6ab2jw2f88xzs98l67m6ynzvu3fywwtwrjhh544',
                returnCode: 1553454810,
                node: '1gefbisf0r2xfol1omrhrh8wwjkbwxu558866nog45f6lcxf8soilopnnyxtrs79ys3giz2zqcug2b8p64oyr4gr70dy53nxsbt8kts1rmfskkqgwtr9hwwg0mpgbodlgkr2cxup0h3foejbwd5du6uls9kp7ybfe',
                user: 'eeewjaa9ep1x0nkgfjvm0si2bcth0ip3q9n7nlb9mvy58m7vt46q1xa2voq2lsr3ydi9ve9pz8b8wz21atw73zr86jr595t2dfa7lztebbwge7v3zmlg76c119l4d8b2esuzmgbs39xhqlp71o2cghxf8bc1vyp96vfj3znbzifsjil2zp4nhz78ssvzcdnk92lu2yjasgq98ydc2wev3n7trcg25m9kjswx1778dcgpedb5q05n0ybgqxzpdi1',
                startAt: '2020-07-29 19:33:24',
                endAt: '2020-07-29 15:35:44',
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
                id: '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0',
                tenantId: '820ecb20-b97a-433b-a4d8-35a4a3df7e14',
                tenantCode: 'w8w7ynobd5dqqw0ezdeovclkqaxkyb3zvzv23njj48ebcqjdj6',
                systemId: '0bc27a1c-220f-43de-a154-c67655924e86',
                systemName: 'wthbv72nm7f30mcr7rkf',
                executionId: '5c630944-af1e-4115-9a84-9b3e04feea1b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 22:03:15',
                executionMonitoringStartAt: '2020-07-29 09:07:37',
                executionMonitoringEndAt: '2020-07-29 23:15:14',
                status: 'ERROR',
                name: 'pa39az5e1469efbugy0jz4o5uacuw431b27b4c0fkbitb48lq8d0n7tpik15sety31tgw5jx0fdinlp310hyjx9jcigzt91kzn3cmlryrjuxfaig0g6uelo16o0c22xy6ifwr57vwn87l5s5p8u0tsvhlwhacot95xg3rq7lk0mdf7zrmufm21f0e72amemcmqt41vadnvf1qr1wro5locppwv0c1ug13uylf5wsn89feqjscjfjveizvuea1lj',
                returnCode: 1008587658,
                node: '3opsl1jwsw6l56lthaedxxv90qidigymv2gc64npzo66nzf2eo0be781mmzzad4k3wbl9667zum0bfut8aqpjysiztc9lkobdpeai8zvlnnlm4kn1e3nciwlb6k9wvu2tnx0ftprtno910kg7xvt4jbbmgv2t9mn',
                user: 'zyo0jx6d26884tmn67ulgsdb73sx6wfcf31qkrjkpj02ym92pjkim7j91sppsain595mhhvr7g4m0tsb4sdyr7ov8wzj7ctxgzq3791h8vsh5mceatonqkzypd779y0tgd5vxqfue1lgp7mfllw6z7tfqs47b509e95ts8jraml04c7fbas53zzpua4ewo9radggr5u6ueehtbtvvq0e68mxz6o9ygervc17n17xyzfpdyqwt15nfgiydvo8256l',
                startAt: '2020-07-29 12:19:33',
                endAt: '2020-07-29 18:13:24',
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
                id: '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0',
                tenantId: '820ecb20-b97a-433b-a4d8-35a4a3df7e14',
                tenantCode: 'qtpcc3snpo0d5ffcjwui2103ildync6cxy3fu260d7eazdo6cr',
                systemId: '0bc27a1c-220f-43de-a154-c67655924e86',
                systemName: '09zyrp6peusd1pheonpj',
                executionId: '5c630944-af1e-4115-9a84-9b3e04feea1b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 14:37:07',
                executionMonitoringStartAt: '2020-07-30 00:56:19',
                executionMonitoringEndAt: '2020-07-29 15:32:01',
                status: 'ERROR',
                name: 'j8gtmlv4tzpxrxvq9wqtuasycmuqqnoega6d44od0hgro5dksl4m3lbqfky23se2swu3nvfplsg28qxvt2buoftkjekmiyrqwj7g7omjmvqdyiv3l1vpbh9j0ogx74do0v2yymionlpmguauzbv0lwn3rmej9enawylgz5altbs0pcqlmn8hvsznh5omke1w6wdwbti46paur50j4qx6lhrqlvmow6xemzhkpro56dshrvcjcu5ykhift3vp1g1',
                returnCode: 100.10,
                node: '1vq6km4a3yl3xf4cznt8h2dgcahexver9ilzwrzkin9mpcu8ml46ixeg9om1x4u86yulc22yeybcdi7c8hoaz89iodhr6kufa0tpctk4hvi9byzp3bb3ljlrj6ar70icec4v845fl905z7a83xmu4of6x11brjlh',
                user: '3qbrddnlu8orvho7lkju5qxdc9gkjenuxhoxkwcq98hzn15u7ci3dcx7015a12pvescrer10cotw1cucmzc0v5olsmue0avq4v2hps0nmy11ilvs7c9wvxtcnxo00f0ns67mlezp9sfoy1wwzmwhztuuk8rrdims1pk2fr905nmdlittoqde53m86ppfjvfbtguvzzyk5mlmtvn4qj4mg8atl97caaayzeob0ha7sfbgbeoh3bmjy53xyst43zg',
                startAt: '2020-07-30 00:35:58',
                endAt: '2020-07-29 11:37:37',
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
                id: '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0',
                tenantId: '820ecb20-b97a-433b-a4d8-35a4a3df7e14',
                tenantCode: '4ox54pnx0qs2vyma04ns7op9vsjx1z2fa3ouq4n9aywpfspyvg',
                systemId: '0bc27a1c-220f-43de-a154-c67655924e86',
                systemName: '66pzq8oxotixwznzq8w2',
                executionId: '5c630944-af1e-4115-9a84-9b3e04feea1b',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-29 13:09:36',
                executionMonitoringStartAt: '2020-07-29 16:04:30',
                executionMonitoringEndAt: '2020-07-29 22:54:19',
                status: 'CANCELLED',
                name: 'wz7r4740ly7xtsz06wb4bunqlwrd533y522log6gc68hyosyn67gbnpf41ts4k1j6gjpvi5tphoitatqy1op2c0sn72gqsiewetr933qkz8izsq5baj8ex8yh6y0k88iv5bw12ko8g1rq6c4x3o5fs1i20gx3w7vofjq7dbiayss5wpodlgn38614jmwubrb7ziru1jp7ad9wpuj8vxwv3n6gvz9uunpfhwxdghswyfj45ij96lhcuxty4tlctu',
                returnCode: 3814893267,
                node: 'jxmuuc5kkr912dhsj3doa9zxfjsa2utzgn9kcgbl3m86w3syfy3n8a7s5eg2unpl1xq9wupnvkfyta8ge2i8ecxx1y3zk9ohmez9k3rqwqi5h48vcl0gc6pyxku9fpqc5qs0vukp5ldhdgbaog07723houzdk7lm',
                user: 'kd07sy053avjz5qfle2up1yeka4gj6kve7jrzgpm31t7c38mmkjfgjqyapd17dz10t9lyqt3kjuu0bsxx35fyrlctvtgoj0awbh0o1diy0p06pj79w80580qfuea6jg1p1dr3zvanukqmjdv8iq59hy485xcbp83caje7vg7qfdpydzv6zkxtivuwfpe057cu0dik6cml3lpejcol1hx0cmv180726c7ys9d5gms3ausp9kpb7jbjeotnv4e3ux',
                startAt: '2020-07-29 22:13:06',
                endAt: '2020-07-30 01:22:30',
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
                id: '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0',
                tenantId: '820ecb20-b97a-433b-a4d8-35a4a3df7e14',
                tenantCode: 'kpub6693dqv52l4nefq5n2scwhguua7mk3146bsttyo9ox6ffb',
                systemId: '0bc27a1c-220f-43de-a154-c67655924e86',
                systemName: 'vousupn24pi4gxshkz8r',
                executionId: '5c630944-af1e-4115-9a84-9b3e04feea1b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 03:54:22',
                executionMonitoringStartAt: '2020-07-29 02:24:53',
                executionMonitoringEndAt: '2020-07-29 19:23:41',
                status: 'XXXX',
                name: '7dk45hhqw8kjfhtn6n8y9bduscvjrwq5ma1tixqrhn4j30ubthf1x7bztgiczbjmpq6x3gsozrrhpmfq41tdkh1wvgcwjzky8ubrmk0f82suudoudom37i40u1qqh727g3ncovvh2hso5pkt24f37fixliam1t84slsgsq9lvc183bhylmzw99f6crd8d7jv1qdoupl2cqc8rp9agokywai2mhl90qkj47t6uy1ah7g5agbfgv0ztl8ymng39dd',
                returnCode: 9574611746,
                node: 'qaeu9c6sl599jsklskhjscg38idol8ebe04v2ty7i48d9keu0jm1jhmzn1ezmcwokbuf5oeq89z6pwbzunvfl1ehivr3fjyt6sl49ovfhvf9voysqkiw7cnxjpruxdkqhoz3x4x0y8htuteo8zink343onop2s89',
                user: 'vpodfti5i8a3cbkw6n4zc2gp92td15wmogtfvoohrpyudohbh0uqh4n5rhzazoabguowkkcj537dgg5p46mrht2xzv42qk5kfnickn756vt3yxcpbd0xosde7vgyhcaefze1ppiissihline6d03zfbc9yb32kntkv2u2bm4uigeqz16ev0ctvee4i1gepjhi3hx7mqgx2q9o63jidd1xeph1x2uszm5d22nb8eclm85kat2rt7f3rqf6p2p8gp',
                startAt: '2020-07-29 16:19:21',
                endAt: '2020-07-29 11:50:22',
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
                id: '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0',
                tenantId: '820ecb20-b97a-433b-a4d8-35a4a3df7e14',
                tenantCode: 'cgmrlam33f1hixwvoqmlbtkphplsngwolbd3grwrtkulrwde0a',
                systemId: '0bc27a1c-220f-43de-a154-c67655924e86',
                systemName: 'e88mqxf0oo4lo9jbreki',
                executionId: '5c630944-af1e-4115-9a84-9b3e04feea1b',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-29 05:58:06',
                executionMonitoringEndAt: '2020-07-29 11:33:09',
                status: 'COMPLETED',
                name: 'hfz3h870kv9egeu3pdkyplbe0ikvc53cv6m0dvc2nc49a2zm5zd34tblo5epvu8tzufjmessucqcbwc1evnl7lnygtj4zd64jppdpoudzi2rd7sq0wmxv5ykivseaeqnzujgrv531h3xky10rt7bhjue895qwjrq85qpi0vv0fkdvpmw9o296yc17lw7omzd11yosk6j7a0jqcb132abx3ptnub2h4ccc655ao0lsaqv6xqyzrn15kviid4dcgc',
                returnCode: 6433689166,
                node: 'hqm1j4v7ja1cg6q53nhu9zwx53f60yuzm1h3jbde8ad48dvoslo1k4e49ia2igrratnvjk04kff4tg8vvfhgmvmhv5twg3t4csgu6rig5oxf9zg5er4aoohp9c59q29fmfmd2qf9ktl3sia7gu262xewhw9ux6wm',
                user: 'mdaguenuiv8bat4a1tmazqe4k1h95t5mte12f256ka8av2d69sa1uys3y47fp8omxmvzhveyfpdq78hepxw9gdzsgurfd1opyx7dlei8gq3ig1s2jfmykl8yzlemn3lqfstx018jo4ndw2ch5e76ikyoef1mx1unmyk0wjxe66lkxd2dol094xos28y3jjtfg6k3exf7a7x1l5tmksn6nqdz57wgf8c8d1s0ii7ds5ltmed7em5au7s5pzcau41',
                startAt: '2020-07-29 22:10:31',
                endAt: '2020-07-29 11:06:06',
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
                id: '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0',
                tenantId: '820ecb20-b97a-433b-a4d8-35a4a3df7e14',
                tenantCode: 'js1qv395wacrhau611nygpp7hp0k0rt0pgzewy11p6s8venwfb',
                systemId: '0bc27a1c-220f-43de-a154-c67655924e86',
                systemName: 'cq90uxgjygh2b9fe2e2s',
                executionId: '5c630944-af1e-4115-9a84-9b3e04feea1b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 21:15:01',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-29 20:20:39',
                status: 'ERROR',
                name: 'efjuab1lcg4vl0u1hscef6uo4v6o8l87j4it2y6x45m4duzg0j60kat7it6gqigcrxap1zhwyd9gw2a92ryt290laae8kw5azk6hrq7b9l8p4y0cx4n4hqjhuoygx4gwfus4a5zceyxkoirbcsivqrvsnc51rlxuhu8tq5rg56w9f7ul4d74l55cjg45wha6430set9hhnp7vcpk0r8dwo0fnpj56u2v852nje02rgx40im045u0xkhw8csrgak',
                returnCode: 2593173898,
                node: 'c346q8ayq8j218lcoicfrp2af7umxtf8ukuitht6zx9p3c2ci5nngy878i5f3mnnbrjjy3rkexywab9edmixtfegwhtiq5hgklruqrvdu7xtf72absozzqiv0ozx6c0af8zeww7vwf65t0oab7jrmuw3c3hy31q3',
                user: 'u6qi64s8kt10d2yz1aavpuvck6cz9fccovflrkgcl1k6lv718kcozi3bh4d11cnb443j0ltyqvu4fgzehwxhzarj98vjdylrrvkxdw984aee259vnrhs8seah8l20nltjdcm0llnxd8pcrpycsxh3bbaij8h9fhuky0nghk5xehrjw3cy54koi5dqyqnx1bervu7ypby86mp57w4oyrxw31uqjgtp0ocngetyc9wz073fychcnmgxalm045oebh',
                startAt: '2020-07-29 17:24:04',
                endAt: '2020-07-29 05:03:12',
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
                id: '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0',
                tenantId: '820ecb20-b97a-433b-a4d8-35a4a3df7e14',
                tenantCode: '5pb6p3i4rjh03ap3l8o902s0eu29o1dfq47hmqmyadrz7ww0vp',
                systemId: '0bc27a1c-220f-43de-a154-c67655924e86',
                systemName: '4hnktdmb9nzvxcyvs5mf',
                executionId: '5c630944-af1e-4115-9a84-9b3e04feea1b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 14:36:43',
                executionMonitoringStartAt: '2020-07-29 20:23:13',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'CANCELLED',
                name: '80b2a6xx52ouv27bhfv6g3a828swl3pzozpvzgx6zc27yt6orsoohshp9v86mbkv4ew55wr28q4pvvypzctr7pz4b1rs2wpj8j9obgpgq9ertef52bvd3cuklckc6uk9jc32q75q1j42p0xh61gv0d6l8ynefqk2rvvpws0sxt4lhmmt06z1k81c49c4c7je1ii5w4jczg3s3ykaok6df495my3ek0dde4cnbfkmsmi10mejf0pjxq7cn01zs9x',
                returnCode: 9397494847,
                node: '459802dessoeee63nk4a91v307tawhe8dcqi5t9ew8s8vv9u0bkewrr2f8sn3fzbq7x9dvrm3egd9q557y1o4vj7c2o4k1s6zwr7d2b9alu2lceyobj5y4veebm5elhe4apny6eoylb0r1bmgve46kjdyobyc8jk',
                user: 'kbmmsjhynt4te77ygjfe3819w85g1cvv9raukdbpjuguevu0za00j7wa00d3urw6iltxmmow8ajkoiv4zhzbjkfpv4aivwipmrnvwggni3yibkbh22ki9d0kyz1e95hsjmuhj6kww1t8eecyiiqokluovuccdlf6d88fb1t63hnrulu7bytcjkw14ywua7braowx4tbadcnewqkl1h636fdbi3rwuic4tcnta4mkg6eldocgzzui8nlpwqgc15f',
                startAt: '2020-07-29 04:41:44',
                endAt: '2020-07-29 09:21:51',
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
                id: '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0',
                tenantId: '820ecb20-b97a-433b-a4d8-35a4a3df7e14',
                tenantCode: 'go02pq0y9zbrfxqubzoojx2lfb106tw99jgwca8uwzzfqoza15',
                systemId: '0bc27a1c-220f-43de-a154-c67655924e86',
                systemName: 'ujnqkl5gevg2l5kppw4g',
                executionId: '5c630944-af1e-4115-9a84-9b3e04feea1b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 04:04:57',
                executionMonitoringStartAt: '2020-07-29 17:47:12',
                executionMonitoringEndAt: '2020-07-29 17:12:26',
                status: 'CANCELLED',
                name: 'atyd2aajkyi73q9t2hdckzvjrxf9h38ld96jp144junply6z1ogj7p7o66e64gj2ly22hixfpl6vq92tk7iigvzcasrn9m2bylzkdgpeyii7jzsfi784hxl6kfcar0pcxwoumet94y3yv3ilyy39j3webc3dt0l96rd3mohy5lx8ecarn1vvnuw7hdbewjc3zq1y5b7mszomu70r02h9b148k1ou1gkvkojvbp0c5hhxbdbdcnkxowq2grdv3iw',
                returnCode: 5007852743,
                node: 'mwa5pvfdwhgxm1ioluspuc3ywa8r2qcjl8a7jgivxvmumazcw5y023u344fa36ga1sl0x89xuuyo1pembtd4a1zzlovh8d382f6v2l9qqdlyianm01hpcp0smqorsn58s8qr915yc1o2tvbwbrjxd2iwdbowzlzf',
                user: 'abdr78da2027kmu1t0oskalm9yuu3o1bfnoveftt361aboqqgiy9fm3q113sdn67p3wgtj2nwqt5y9v5m3kyyaoewml5wb585epmdlu672hy1d7t84vky0waw85vdu81m0felhqk50ss6nlo5fjbarg0bl5571epnzj8g6gnjta291mvvefvn6dp25jxq0jxj8u6ytfalarno6o960fmajy6mhw7yzvri53zs06lbp0b5aj8u5rdmq7q79d2eb3',
                startAt: 'XXXXXXXX',
                endAt: '2020-07-29 18:24:04',
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
                id: '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0',
                tenantId: '820ecb20-b97a-433b-a4d8-35a4a3df7e14',
                tenantCode: '5b7ola2ggnrf2n0eee7wt1812yd05le07qugz4bfeg4gpe1m8y',
                systemId: '0bc27a1c-220f-43de-a154-c67655924e86',
                systemName: 'hdx6mvs1cqel7a28ao9r',
                executionId: '5c630944-af1e-4115-9a84-9b3e04feea1b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 03:12:44',
                executionMonitoringStartAt: '2020-07-30 02:15:06',
                executionMonitoringEndAt: '2020-07-29 18:59:50',
                status: 'COMPLETED',
                name: 'v8fb0eu7hvncd4gkmgrtln0x5e8pqjw29j0rmxvqxo9luv522ftqiinb5r6ro4493l47uu3yag1u3sbjjs3m1vj7oamactxwhfhhjmn0x5padnychfawjsp8fuc22uz7yepj34oe3e7os3rtgztbsdd49ucou5e8dyt2sd8j0pda6wcg5ndrol06hi6y5luhohdj6h8xamk0d01ogzuapiflj39z1ltsr53qdtveyh5xfxuz8h758olh82j8v0q',
                returnCode: 3192132798,
                node: 'qcrtqb1cw8mq45jk4xtkm1o0pn51h9uc9adlz6g0fpfqagwaag14tpwfi6bqjdsh1rnjf78w37fnitdiar6dqunr9i0y0yy242dt8qw4yiwy5v6s82qaen013umuc4b88dxq6q6usvrqc9szpy33ephh9iqy9ju0',
                user: '4y9r8njkfzctngwhsvr4fk3n5wzjl7fn5xk9b0282fg8bdwemeqm7qahgt2l5cqaj2691m86qyislejjynbavl1s0b7bnl4mp6tdxpr6j4ly8df7karp3m0ok2pn5w8soj91lcv9xxcz29h6dnebqbuem7u7n7q41itgyetu69blgof71k2bxq394z9ands6a0khal0eri6rhz9myfb6go6sghf59zg0tm1y48pxhwcrnw234r1yotasd3v9h53',
                startAt: '2020-07-29 05:03:22',
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
                id: '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0',
                tenantId: '820ecb20-b97a-433b-a4d8-35a4a3df7e14',
                tenantCode: 'u964v1at8r5y5w4ra14ikzh1d4pils0qntkm2jubvbhkwzal62',
                systemId: '0bc27a1c-220f-43de-a154-c67655924e86',
                systemName: '0tv909nhx94a4a7yuo40',
                executionId: '5c630944-af1e-4115-9a84-9b3e04feea1b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 18:59:46',
                executionMonitoringStartAt: '2020-07-29 04:45:33',
                executionMonitoringEndAt: '2020-07-29 10:37:11',
                status: 'CANCELLED',
                name: 'm25c8v08shlimnf7itrdewutsm3pmycoaskaq7oo6ei945pqkz8ehdv5s348lzi33c8z7xp97jrzt53nx6q684tpk6ng4h8uesfeowiiioacio13iy7bz67if4y7k5n76nvy7lj31pqkedym1vadivsaad4c3w7345xmyxe7put8i8rbvkj48b27i2f4gihxoh644ib6p6qxmretf8ydba9668u9fac4btpc7an2px9loawcq37rackfwogjatf',
                returnCode: 3039418158,
                node: '6x46g6jcs4cup5njqp52ka12t8uarpxuzd91t8l81em7fybacrg4lezs9s69i7xnvmv2kpmoys5i5einrokmaoxakpb8caugfxwd152si185vz71ex5d1zfnwd5oqdycy2m0rwfc2bs2nw0qtp4f7dzhokdlhngd',
                user: 'mdsepjqjl63lci2l6p4ww2j1rpuxuzbh4lk5wq2e5iojm7s2rwje9e4gxiuyv6wmi0pf8ckxq9lu001yl9frggccvjzkow13qjwnudovnlovczchpric2k4d8oll5sdx2yoyq702a6age66g056tb8sgupdw3akv07wy12haxuka3jp6er1p42xzbgjexn92qv5dquv1m7m7s2ih0zu49yf9p26dj03z9jpx78cildtpf3m9fkn43kq8lt7h0e3',
                startAt: '2020-07-29 21:56:07',
                endAt: '2020-07-29 04:19:35',
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
                        value   : 'af02aabd-2b5e-4047-860d-bf45c9e27d80'
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
                        value   : '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0'));
    });

    test(`/REST:GET bplus-it-sappi/job-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-detail/a4b47a29-fd1e-4041-adc3-556112c022b9')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/job-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-detail/4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0'));
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
                
                id: 'a338921e-58b8-4e78-9bdb-11cd09683adc',
                tenantId: '91d7fd69-aa1f-4c2e-b257-9ad5b46e2051',
                tenantCode: 'ubd6f2qtwkoig5uzab2pd4vuo8w0y4mnjer331fueyvznd18ex',
                systemId: '5995b6d5-aefc-4071-99c9-3d55d84f555c',
                systemName: 'dzb7rivrc0v1bknd6keb',
                executionId: 'e3dadae0-99cd-4ad3-8736-41c6f17ea8c1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 06:05:20',
                executionMonitoringStartAt: '2020-07-29 09:09:39',
                executionMonitoringEndAt: '2020-07-29 15:58:03',
                status: 'CANCELLED',
                name: '3rb227ce6we24ult6wro054krryjtsuspf41dn5wctgfi039k2tuodq0bf37m9u0t6zctpcp0z56w8osahyescvqpz7fqiy72mi3m7bjsxeaytseh4t9v0680f37r647ltf3uy1p94pt38stt0kfcj89jyv082ax0hn86vxn8zt0mtafzjsou0hrd4pu3csslgrwfzjk5m58g4ou3frevtqj5in8fpin6qmuyq0bj9yrqqyovbyjb6c2i1mdbe2',
                returnCode: 8407700296,
                node: 'wy2b3xdvocq618oqeh4vl9sblh15fdb9zhhj2ph0sbkecg60su323olb3l35ptostexftxc3fkg2k4qxjwkag83353jmixk80v05utnog8dz8z2qtzpoazx45shgxs45zouff2ftgl68ipd17b69wc9ufpmgxw2m',
                user: '3qghqa54l0djcwuf6bjsvxy47vgiekq2jf1i8otfbym3gls43c8o3gktxeev9amgy0e6d3ilefiprl0pfewp9116vjng0g4dgkbnm4xtvcf5hww8us36gwihuyn5ykk7g0r4ho2zx1sblvgrkibvd3zx1fjqtrpjhdv49zxktorhsef2mb021ejjnwhnq1a5la5llveubcprnhbyirrktbfytile4q3mbq2gnxb46lqp8g2yxjmuvgbf5vq9xu4',
                startAt: '2020-07-29 18:28:41',
                endAt: '2020-07-29 12:22:44',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/job-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0',
                tenantId: '820ecb20-b97a-433b-a4d8-35a4a3df7e14',
                tenantCode: 'voxexs8v1nrk9i4hzaiqelbw8gpbw3euov360ofvrxzbsl28wl',
                systemId: '0bc27a1c-220f-43de-a154-c67655924e86',
                systemName: '17jo8wahx7hbn7gspkta',
                executionId: '5c630944-af1e-4115-9a84-9b3e04feea1b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 23:13:28',
                executionMonitoringStartAt: '2020-07-29 12:06:16',
                executionMonitoringEndAt: '2020-07-29 13:20:50',
                status: 'COMPLETED',
                name: 'lap5xyfhtq1jkqc5p98135qqjbhjy5qvkgci65lf0jyd1fsglevdxanv3z4grfypg6phynjxuuufg15aiowx72sj1umsbbz4uv2ecx725z8y66e0znwg74ayuq5wzqozi610fqy0vfecbl75kh75j7pgxzp7dduqzntcb3qyppks7f8w3it1rhep2eja2ia51mqdrcmxcs7bzrpktfmew1h3519nx4xopfu05kqh3odkul1a83t9rba334nuabb',
                returnCode: 2203693398,
                node: 'hnk42lwbn4fp15yb66im6y0piz3b4hqr1hy2hhz3szm7zm43bpj8m097qt9m4whtetoaln47pb14owejjaddyqogt8cntfb145gzrrbxzf41sghq0o2roteuh7srirwa0zedqw4aztniuc3130jziacp17ba5ywo',
                user: '0y150cr48h746oi1dkgplijlsif7ic8v72hhwit4hbsbbo3cuh73ibxyakeg3om5sa6ht8hcyrrhqtl8dfri9rqjqg632yg6s002iie3lt7xfifma94dtfm7w97l8zqp0a673cx29kibtarfc91jyt7cl8f1oy6hh5jp32nef1c023w97vjsdjp0omw4tkbyqxcp3c61z3miuuietjoru2rh4vc5pbt3mzrezlayooy3fv163fi5ecqbaxg94vu',
                startAt: '2020-07-29 10:04:16',
                endAt: '2020-07-29 20:42:15',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0'));
    });

    test(`/REST:DELETE bplus-it-sappi/job-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-detail/21bec355-fc4d-4f26-8dee-38e8ad2babef')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/job-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-detail/4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0')
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
                        id: '448f387b-46ef-43b1-b9d4-f9ec96b87403',
                        tenantId: '820ecb20-b97a-433b-a4d8-35a4a3df7e14',
                        tenantCode: '7118auabrvmq3v4n9tamckusw0gnihrwcr50m9ro1l1xhsv1zp',
                        systemId: '0bc27a1c-220f-43de-a154-c67655924e86',
                        systemName: 'bj2290zsshdkdl74zboo',
                        executionId: '5c630944-af1e-4115-9a84-9b3e04feea1b',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 17:10:23',
                        executionMonitoringStartAt: '2020-07-29 14:41:24',
                        executionMonitoringEndAt: '2020-07-29 14:22:15',
                        status: 'CANCELLED',
                        name: 'hgjqh2zmtfrt25xye5ismjattl413p6uao0dc8m7kq9znjoltudhoga7ic7kkr7tc49ldzfgj50d5geuy07pdpf8sr01bqr5699pbzo53nu1qp5pi0mrnsibxs27akn2ei622f5nlyyw5n52e17gakc0ay170l6ktu9yul08ua38my555vsdwugobl5po9y9wwcvv5wdbqx58j4y0zrfktzqlz4qun2v7tqbk1hd6kb5ng017r416qu6mk6ui1q',
                        returnCode: 1811260023,
                        node: 'xul4197t9ieaykmebkivt0yp1clc1wte2wrr972coggsqe4803kmuck9flt89vrfal7wuhlpbux4nejurmct97dpq858rktcag7nlcayg2i6latas8f3gw0mu77gfm4pedp0by4ybuo1okjm8pufhdoxe0mn3k1s',
                        user: '469u9aziimzdrx9g8c70o37luon9pw0c3153bnl2105zfbzn5u3jbxdzkkaeo6fkgrwnwqchkhdiua8qgnpc8azmwjymdifhfr940ppviltpvuc3ngcjegsuccpjbdojheb70jz5f5tnof4qxsvb5s18bdc5nk1qcbtmaekarrgmg624ywo063r5fbbupo2z2r7lo7l8uofyfhs0yn4ul27hvpism9ec7x5yikjivpw3ccfdygo4jghhlcsldq6',
                        startAt: '2020-07-29 05:18:30',
                        endAt: '2020-07-29 02:46:26',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateJobDetail).toHaveProperty('id', '448f387b-46ef-43b1-b9d4-f9ec96b87403');
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
                            value   : '3cd3307c-7881-420f-b2b1-d78fef118c90'
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
                            value   : '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobDetail.id).toStrictEqual('4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0');
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
                    id: 'ef8b0eb5-a197-4c6c-9695-ac33b712949d'
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
                    id: '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobDetailById.id).toStrictEqual('4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0');
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
                        
                        id: '7d9e3d78-2db9-4902-b09b-14b19c08776a',
                        tenantId: '1f5bc200-c066-4ab4-8f52-4ae82549fa04',
                        tenantCode: 'd0t276hiy5rmux65nc8xk64bazi5wf1kc331edbkt5se1av0lv',
                        systemId: '74738d50-a13f-485b-b8ba-995044c75734',
                        systemName: 'i1olqj7gn2a2h86xtpeu',
                        executionId: '3b31d0fa-6ff0-4c7d-9479-a0a955a8db12',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 23:32:51',
                        executionMonitoringStartAt: '2020-07-29 20:55:08',
                        executionMonitoringEndAt: '2020-07-29 20:27:31',
                        status: 'ERROR',
                        name: 'e50f3o83uu1whrjvu0xy2xsjl3hogh61roty3icr09dgw914clmkv2tvfpx0te9zomndriarxiut8uxdbha7f8n51gpuc3d1rke5hbnkfa9glzr4xdy6041ze6whrnpaih624pexsv9d0c0pdv9b0lmlhvjz577nlsecyp66tlwqw932dhhcx72tzj2gu7osfv5h03r54xnpnq6juiz4817wueuvfyreh3uyhdkvtt4o6ckw2kj9alyuclsc0kp',
                        returnCode: 9848451822,
                        node: 'd6q5ps8siwcvrxogvu10ek54u4ooa3a2dyedszvp2lgf33qjxk0pmaoxufamp08qauc7ej8huepdqvl97gr5j8vk3ourba808jv7fbjf69wj6cs8qyi8x9ihtb57mmhexoybozgbjoi2crdl8qoai6ah0wy8p5fj',
                        user: '98rs993aiz3rhej57qrn4d3rfyk4l41yxtvv2fh7dxtihhgtvu3hz7xl40usz1bk6f6wfesp0l4axuqkfzxmy9k16lhjrj9pu4iu3or08kl23i9simi9u3qjkvsnqlcmrqek9xu3k7lnxaj8urgh89qqadm48mbj7f20e9qfe20idzbbw9hjrpwfnhvb6g44dffowqeu721qnclqc2mnxiwcilkkikp7jfc5n6kyflkxfb98u2mh2fam60nlm7c',
                        startAt: '2020-07-29 03:41:26',
                        endAt: '2020-07-29 15:42:17',
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
                        
                        id: '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0',
                        tenantId: '820ecb20-b97a-433b-a4d8-35a4a3df7e14',
                        tenantCode: 'psopk7csvkjonjd1k0h5n6xuano466wjg9tletn3qw2ohgh2e0',
                        systemId: '0bc27a1c-220f-43de-a154-c67655924e86',
                        systemName: 'wx5jm03uw50td5vixfdu',
                        executionId: '5c630944-af1e-4115-9a84-9b3e04feea1b',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 17:47:23',
                        executionMonitoringStartAt: '2020-07-29 02:41:31',
                        executionMonitoringEndAt: '2020-07-29 09:18:54',
                        status: 'CANCELLED',
                        name: '85rcc9zzx80vz5oewe7ygpcwwloi2l2p4nr9gab5kiwpkw4ko3q0oj82660l3ufbqrqirznvc6pv1w92n8u0kmgoofbfhlsxelfbcvdnqytyprh9rnlarxk5ubuf8nfr0hf7z4i5wkrxxpg8a62ej4f62jdpc9xyq5waoxfz8rpt44ryy6hxyvkv6zdagah5te1jeotnzingpi8sr4c508x4uxwup5252w2tdpw9o00cvcr1s6x79o931zlrbc0',
                        returnCode: 3633151792,
                        node: 'h61psoej22qs2i93r9ut5qs19vo963ooxmloor56s2y6fq4e4xpx1i12ajb2pxhv3situ3yd7d6k3zlg5hq3ofc1q3agszb8w4vnxgpmxvyo53kc47le7dyerqt9hj0d3fxmaxik1455a82axhnyv9xilv2e88ht',
                        user: 'cqde2ecip326z6y6fx7laaglh14bydrtg0cfax0c3cz12x7gurbw6eo6nb88lwbirtrbjmxfxlwngo8vwrrlh0511lvhwhj8b4b7avy1jcj7tyt2drilpvv6hyjwzqi2nxwouzq2zi0d45mrqzy3x04v65frvqslrva3upyh5p0bc5g9zdlx0yqph198584p8tg869pxayavype9j52fsha5clkkso3m28p2odsiiu0kuahxkq5x0llmxr43p50',
                        startAt: '2020-07-29 02:22:01',
                        endAt: '2020-07-29 09:46:33',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateJobDetail.id).toStrictEqual('4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0');
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
                    id: '117089ea-e376-4190-94f3-571cb220481e'
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
                    id: '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteJobDetailById.id).toStrictEqual('4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});