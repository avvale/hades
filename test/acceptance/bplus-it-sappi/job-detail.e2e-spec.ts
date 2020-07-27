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
                tenantId: '85be8694-947e-4a9e-b932-5efd98d56480',
                tenantCode: 'uli6r497qctavtt1b90q6yg05vhj08e9n8z6idrohtoxfwoqjh',
                systemId: 'a41580c4-2f5a-47ce-8ab1-6a7584b4f5f8',
                systemName: '30hl5n8fbik60tfyudmi',
                executionId: '452508ad-9976-4bc0-9ae8-266fcf4f626c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 13:53:35',
                executionMonitoringStartAt: '2020-07-27 01:57:45',
                executionMonitoringEndAt: '2020-07-26 20:56:16',
                status: 'CANCELLED',
                name: '20cuaukjo10tbfp1n439mnc5qptpcvxzicdeuozaho6r4rlqu1fhem9gxjkbv4v55xacuyvlxxqhtdzoapzb8f2cihazdvy5g021ov9loqsk5v2oql1ngjdc5csjhnuhamr3s3bi39ai8enxgta2p8hamdi4wuwd9ti7xie73c9ycb3oqactyvghbsqxl5dou0uhn3xodtxg6yp73lkoo5eguqj20m9rgvux81hbqutms4h6351078cr0a69upy',
                returnCode: 2907248510,
                node: '7ojjbt3kct4tzqoz0qw5cfo8vkm9zfg1opvrp2iacxrkeqfp57b527ut9jqelpss2hcpwexft0wpgb7fh3afdh1wt5dvnq0rqc6lopkrql2kyihzl3vjmupmli7wta5gs3ek2w27galw4amu7hndrs0l0lldjeeo',
                user: 'v07qtzsgkd1dlbu8bvoy9x31wzzlkisawkrsuczfsriif3950uqilz9sf6xcwddr8e390phc8j8yb3dga2tk1bx1xk0zgfb567z4h54r5t7imbuyovcedlv3kxvjmmmr7iwcietne60dpnu0lej3vzl37gn8cx0v5g10roznzjqliwrja3qhyw2bdfduhqxit31kn5ik8dbstcdmlco3m86f89k8qw1m50wt0r88x7gea8fwr1qnrwkd779y1tx',
                startAt: '2020-07-27 09:47:19',
                endAt: '2020-07-26 20:45:42',
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
                
                tenantId: '85be8694-947e-4a9e-b932-5efd98d56480',
                tenantCode: 'fn73x5btschkx0fnzk0pak1akss4da0zl7o6188gy9emkzq74l',
                systemId: 'a41580c4-2f5a-47ce-8ab1-6a7584b4f5f8',
                systemName: 'ig3m9x9z8cyb68ppzotu',
                executionId: '452508ad-9976-4bc0-9ae8-266fcf4f626c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 21:02:03',
                executionMonitoringStartAt: '2020-07-27 17:49:59',
                executionMonitoringEndAt: '2020-07-26 19:09:20',
                status: 'COMPLETED',
                name: 'ldf7otfcx3h6gew9s9000fclysc0fpzfaoj470idq96qiqzdmzry96sm1svo98war00gelu3oklkqbyv05x0cgop42wz8f8q86ob1lp27q6t30s2di3qhntcgjmsc60zgftbclj8eklwn44rse0w45ibew8ji2z1438vxigks3igb89o8zp5oku6qn6a592b08suvbimp013sm6q8fl9cny8nyq62ivgokztct51fr4j9sc8lm6tt2ba3g11lhx',
                returnCode: 2015435380,
                node: '0f2xbtvin32xw29m4b3w527x0i42jnxrjquzwbt5q9l3137wcbtjqh92nt5b2tqw0fi2x0752hcfrdmtlkxuum33s7iagjbuog1bdd7jmwi6zh32419qr5p5so1hj5pxf8ez625t4hjci682fhxrh00fem7xtm29',
                user: 'x5b5r1us28cgyubdsaxryouixi604y1q7j9o207fydc7cgigl20x6llvm2wpva91iyyk7aukbzn3pexy9gdlfg0mjp4z16213u7by7h50htrbi4nn9lk7ace0b4n7nxppj8hpba1dc3oa174v4c1ookpicrv422iwj197d22bfzeck1yt5r5yl98tzzfu4ogezazg67eb6js6nqjt0ls5tff3eyjitz59diyb1nby126rysqt9mj7cv5lnb77xm',
                startAt: '2020-07-27 06:16:50',
                endAt: '2020-07-27 01:29:19',
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
                id: '24af86f1-ca66-463e-9ec3-225a479de7b4',
                tenantId: null,
                tenantCode: '3im6zwaapuv1vcp62zixxg4gry0o7ybtabd05pap2obuv66z6j',
                systemId: 'a41580c4-2f5a-47ce-8ab1-6a7584b4f5f8',
                systemName: 'xf9oajaiwh6ynu52ol7u',
                executionId: '452508ad-9976-4bc0-9ae8-266fcf4f626c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 17:00:48',
                executionMonitoringStartAt: '2020-07-27 08:35:08',
                executionMonitoringEndAt: '2020-07-27 11:17:20',
                status: 'CANCELLED',
                name: '1gzrztvair8g609osxwbrp4zcqantk3w15b68z1i3ej76xqjwfdy7t1em4n6y7jtmqo8m0n6pohdx5hol2esm6lq8i1gsllgfxq9iby49xs1oqa36j8imox2mdxvxlp5fo679y1ajk63a0xremeak56n4z121wbxkoy05g4tzc9h2b4bl6oakr7t9xu93aupbewn7knpnhtm7ko7nnoa8szt6sc3bo83jj8rihsugv758xq9myz1qy2199x6dpv',
                returnCode: 5800659408,
                node: 'v77ejexrbd7ul1zmeaz1gvnrro2ewx5b24xjx63w88wpyk78otxs3ggvtikqi0d7r7rgxmtt5h8fd9xdz32ju7v9vmoebkzet5wri0xbog74uyuypf6r1vntp4nxbjb8kr9umtd57zzsw1y4eradamxgiauvhaog',
                user: '9cvo6t23t1etreywqvg1wfayfnesk7gbws7x1zg32x5ttp9144e9o44uog6o91suj60xwsy5f7x6ksp9p4ihh5atvmllsw9dt3exofjbeuwallz1q8knu3qnqp10mlt1usxapm3jm41baj8oi74a6cof2hvimk96lyze892r87g32tc33g4m52o6r1w538148xn4f3xstp84rv3zgi9wuz0g9csiwudo854dnxzpxuxh68aismkk05y1ej7w6n8',
                startAt: '2020-07-26 19:51:14',
                endAt: '2020-07-27 12:17:05',
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
                id: '24af86f1-ca66-463e-9ec3-225a479de7b4',
                
                tenantCode: '2hc5nxfumbk1cqfy3sgzesta5p8gk5oidr1hv9zy3sdjls75v1',
                systemId: 'a41580c4-2f5a-47ce-8ab1-6a7584b4f5f8',
                systemName: 'azqu86ncmocqbslt0koi',
                executionId: '452508ad-9976-4bc0-9ae8-266fcf4f626c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 13:04:04',
                executionMonitoringStartAt: '2020-07-27 03:37:04',
                executionMonitoringEndAt: '2020-07-27 17:57:58',
                status: 'CANCELLED',
                name: '9okdtk8h4h68osqtrmn5m4bh5x97tu05ppydkrl5d7nj7rj08n3rc4it3rdv2j85nn8x8gqps3erussl6k87go13hjabsye65qy1lc49x8t3d8avmjd2ylab96ss2vvo6tvnbk4ygghazp8sqjlgzjn0gumdico8u03blds45l3ucy0588lfcodd7jnn1ugfnllwu7atrrgmfr81hu192qrx1dlrqiyvx5irid5tyb6uphmvuad6n6ykwalrw9y',
                returnCode: 3772555684,
                node: '5zq3kdr4aq3ds7v9h8ocvusllgtiul1080f52qwquj0bujbmzjvfc7li77tm1kmsi2cst3siwir4w41vkths0lfouhubjuhs5nc0t214ac30krkj4wxal3t3uy872kz3nx5qi4wfy3eohnhm3ay0b9wfa9w69nn5',
                user: '55ntmlis2uqd8a4c1hq7mimghpunbs29i0ka2zbnfqki6grwk3ir6dsw0lcetqc9dfaic2b2z5h87hggoxoabflifqmi3mqf9g12837jf297mqmujm0tkt5evkxxs0jrw26okvdpyksrpzhz6lh75148pfkx3eyizgbldp1ey6dqsrubv9zm3mc6zy3bxsb1h3e5gdbik7afol5l8v5ejtxqmg3vx7tsxq0bxlpb7qstb6evnpgnwvt9edu1d4w',
                startAt: '2020-07-27 09:29:05',
                endAt: '2020-07-27 07:06:53',
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
                id: '24af86f1-ca66-463e-9ec3-225a479de7b4',
                tenantId: '85be8694-947e-4a9e-b932-5efd98d56480',
                tenantCode: null,
                systemId: 'a41580c4-2f5a-47ce-8ab1-6a7584b4f5f8',
                systemName: 'mwsc5joierfanvlud005',
                executionId: '452508ad-9976-4bc0-9ae8-266fcf4f626c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 22:30:30',
                executionMonitoringStartAt: '2020-07-27 04:25:50',
                executionMonitoringEndAt: '2020-07-27 08:48:35',
                status: 'COMPLETED',
                name: 'pacprwputvl7tq3bcjq4f5yrbs23xwpy8duh1um4ifnnox0pyoff8oizes3ay41pxd1t10xg8h7h6xb9793ekfkeo7yai18gjgq05cum3b6195p9s7zzpy19fhoprwmbwmgw9c9yyxg7pyhf9bs066yc0zhze16igo0u1xm1x7qzgsrw8owwge8ulg2w0aqwzyvan54nminqwsv8d5wa4y8beierybw42r9ubnb5myx5o93lvza5sqpiswui955',
                returnCode: 9985460663,
                node: 'marugunsgqjaz5fmqp2q569v5402y96silxycxmn5klhwtlrl8avox1yz5qf3whwexj4uwo1tsppnq2liy5qo2kajcr2gs4nkrhw4e4rzeoma8fpkxawm0ejvd9korbi0jwmjllcaq28x72xvspyoap1yyp7agy4',
                user: 'b6n1iw9ylsifixywcds0ii30xvolpnb716fwqjp5i60q9y1pw6aauj5og9tyevhnhd8foe52k8xuiikk5rwyjdqm14gxedi5e54bdr0mprvp8bc59bgta14xjbscpfcumhbz4dh40hl96ekpqf6uwuh1k8okytx77rw7cw7ucbygx0e8nmpdjaxsgi96bbzqmgyszr6put05jjlox6314jt2ou04vxi84rch9roy9yr9fgz94td40pydbdoj0xo',
                startAt: '2020-07-26 23:00:38',
                endAt: '2020-07-27 07:07:11',
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
                id: '24af86f1-ca66-463e-9ec3-225a479de7b4',
                tenantId: '85be8694-947e-4a9e-b932-5efd98d56480',
                
                systemId: 'a41580c4-2f5a-47ce-8ab1-6a7584b4f5f8',
                systemName: 'hr1ct4b1wak61a0firum',
                executionId: '452508ad-9976-4bc0-9ae8-266fcf4f626c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 11:38:04',
                executionMonitoringStartAt: '2020-07-27 03:44:55',
                executionMonitoringEndAt: '2020-07-27 15:56:22',
                status: 'ERROR',
                name: 'aiz7s9mdz2tb1rkqyasc6qx17f5x18vuukckkkbknjte46pk4r2gywu8xj6chmvii1wete3kvz91i60cepl3ve0ghd9t193ddpgbfy0jhr4270n8hugfkty86xenk0fkfpgiyl5ks5uu0xea9pi758ht0r4mtmxvi3troniebh011r3kj1n614rcvos8nrw84ytbxp7ib5bfcuhyb4lf800637xt832pqdq6hm81fr70x1h7yt42lkfw2hlohiy',
                returnCode: 5056438181,
                node: 'k3hgmiixmbdazrxlqpus8fb0hzrhjzgoc30tc4cjetraazu2mcd7gsxk1q7e6gm7arz1gee1yildowynpv6ubmct3kplxegxbc0gvk465mflkiequo0dm08bjwd66q9l4te4qpxqpq7denxa2e67xogzgx4c18v0',
                user: 'vxd0om6sjh1p2ja4bkft7vw2e4a68aqw1ogucjm999r6ku3w2qfqhtvg3bf0yx09t7hv723yl6nm8681dd95z8r8lu37dlhh6inst0ujuh5ckujx0dn00pfqcy3x09ma1oq8gn9gitwx1l32syr3jzvlhst1hi6bstvvqur7q6sr5wwn459h2euj4ivtni8729v12h7edf7cpg5k62v3nai9qp0pwplwfbs9jzejnj3h1su1j4h9idmkrksndzg',
                startAt: '2020-07-27 03:16:47',
                endAt: '2020-07-27 11:07:04',
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
                id: '24af86f1-ca66-463e-9ec3-225a479de7b4',
                tenantId: '85be8694-947e-4a9e-b932-5efd98d56480',
                tenantCode: '11v9iqszik5xpie3p4xmdmq8tarik8jl7tq8v82rowccdoy59o',
                systemId: null,
                systemName: 'r5w3r0bsjgerv9xvpq6s',
                executionId: '452508ad-9976-4bc0-9ae8-266fcf4f626c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 00:38:44',
                executionMonitoringStartAt: '2020-07-27 12:57:51',
                executionMonitoringEndAt: '2020-07-27 08:05:17',
                status: 'CANCELLED',
                name: '6fibgh8j29e2it9qhyq9cxh0gslwuw1h027oub4xx7xgtwbygh8or08yagf3wp26uaeo2htjqu98b52v4g9lrz3xwiz6vatcvipvy2eoqhbeohoqe9hy0rec8y0zhyker1jsc2sazk8k9d1q6u2upy69qzcsh2ucxjv2ma13zsi2kpfglk4jboz7ykwjrt7zd9l48v0ybqq6k94osqvg6iyi65fope86qdorqyuhdrri1122pn9vexfljo6dpny',
                returnCode: 1675341391,
                node: '17b6a3hgd0ejbfpn0rh3m1anedi3sx8pvb4o5838j11co6g0a7z2liwxt7iiqebst3jezhhnymvg601s1y49p4g70eocszase4abhy1fxwcyb0o63kguds37zteg89qa3y1rm9ag887j3xofnf93dfk1tobr9xis',
                user: 'tbljcys9jfi74izt127e2o0v69miufnu3z7rnlf40phj86hxu1c4078nfrfwdhzjczmhgax76dbw23nerocylhsz15tbokxfmdfeq56l5vtmn14a3zqp9m67lsv5w5szfgltcc7fxij7bx8hi2puzcebfe8gk4sz5bwldav64x1couia7m65pw1x8sj6518gt8asp41xs8k3q27zb7vxelitzdq2ipt5qpdxjpg1nq0uj4jjw0nuqhiyayqy745',
                startAt: '2020-07-26 22:47:58',
                endAt: '2020-07-27 01:50:02',
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
                id: '24af86f1-ca66-463e-9ec3-225a479de7b4',
                tenantId: '85be8694-947e-4a9e-b932-5efd98d56480',
                tenantCode: 'iwhmo8oeafixaxqutthqgxl9vr8nu5kqvmqvrcd5gprps830os',
                
                systemName: 'qrfpewaiynyfkdobwp96',
                executionId: '452508ad-9976-4bc0-9ae8-266fcf4f626c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 04:16:44',
                executionMonitoringStartAt: '2020-07-27 17:48:10',
                executionMonitoringEndAt: '2020-07-27 16:16:03',
                status: 'CANCELLED',
                name: 'zj1r15wilcbq3049pf7hntiqi0wkxp5sm933yvbz743vp1i78hp7lxc6jc31znk303cnfy4rezqxjn1u353cft21se9c7xugchnrkrlr1sw54e9m0qoi81q5in50rokj89bi9r1usp8iblaoshzxbt5s99934eo1ay4y782g57f17exo8o2aj7noyjnl6wtpw4bd77e8gn8nfi0p4gmuyybzu2f5htaw9hea8wkn2prhd2mm6k94p8plp8xh124',
                returnCode: 9979237345,
                node: '0kwbyitelbbumu0oyyvzmmz6s8mhlizryisgnq6rh3l1io1qey0opcl0x4t9pkyu65p8etdzfz25mi5tzp1axuebrh36kvskj6qivs0kbs6unp4ktnvct33gqluprdd9mnflkqlkrfvpc6octmz775nt2mk49y37',
                user: 'q4td1rk0odsdsnu8x0zhxm8apfuj7y7nmc28h0dw649gu18xjpbqyaadrs2n4ugd477gbukveh5o31s8x6gixydal982nslv8cfhgotc7nj547phtzd3f0xcftn9sgdv33amfyg1kjo90uqtbrkbfvyb4nimph925ryb3bl7bnd9kcidiybq204418ex6fkpz3u862mlo5yd6x67dcdgkkpj5396bx8wv4qt0klgljwb3as765kkyrjn59ebetx',
                startAt: '2020-07-27 04:49:20',
                endAt: '2020-07-27 14:20:23',
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
                id: '24af86f1-ca66-463e-9ec3-225a479de7b4',
                tenantId: '85be8694-947e-4a9e-b932-5efd98d56480',
                tenantCode: 'mqreizzuv0dbe24x23u7agwwkw5wxao1vv4e16gffc44uj5dti',
                systemId: 'a41580c4-2f5a-47ce-8ab1-6a7584b4f5f8',
                systemName: null,
                executionId: '452508ad-9976-4bc0-9ae8-266fcf4f626c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 13:24:39',
                executionMonitoringStartAt: '2020-07-27 07:06:27',
                executionMonitoringEndAt: '2020-07-27 18:21:24',
                status: 'COMPLETED',
                name: 'vftll9wu7munqjmy993n933sgg6sp8kpg93x7xwpqa02ms4ad20o5p9apjlhwo2xa35b3ephpzmkrfotqq4arsbx93kxqgna4sgyhy5siv11b6dlf98vmd5tidlxk76g76ikcf4icbz3d9bprx0kcpowx57a15kauc5qu9t9j8as9ijh3ui1hlozc22e2295rvgb4x9svfawq29j7w5ho2j90t4uam1bg23224g6l6rgiys6e1lf9gmm7kz3cq3',
                returnCode: 6399097520,
                node: 'fc8of2ay44knehx8m08g0xjdvta40co85o6s6ha7tpxftpo1ftgbuw42eri1uhi7r0iy2rq4hfmtpb4t0xr44nbco6w17ew4qha6utq7sn4vhu6gh7qwyr2m4zn91gdyci6enafo4446nl48bac5aolm3gezzy2l',
                user: 'pql14j828h2ubrqmp4ucpglztt1ubgqz5m6u1q6gy89mgh972nvdxt50bdb2cs9tkk89nsbb2r9mwyi55x2bdns7xtc7con2g6ooj0r1ym9bcu6qyvabbejmrqdior2qn3716ifm2bst76mt1fhjslrwmo4yqacbk2dnbdv1my2d98zrbhxi8w5evqq80b6adw22gafdx1n12e9slp1t2mhurgaxh6w82suvptw0l4at9q434a1tgv9tnstwnv8',
                startAt: '2020-07-27 17:19:35',
                endAt: '2020-07-27 03:33:55',
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
                id: '24af86f1-ca66-463e-9ec3-225a479de7b4',
                tenantId: '85be8694-947e-4a9e-b932-5efd98d56480',
                tenantCode: 'dvk2drbhlmkrkx93tlrs8zh7yi47xvlefqs2l4jimwggp2ftms',
                systemId: 'a41580c4-2f5a-47ce-8ab1-6a7584b4f5f8',
                
                executionId: '452508ad-9976-4bc0-9ae8-266fcf4f626c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 09:43:57',
                executionMonitoringStartAt: '2020-07-26 19:34:58',
                executionMonitoringEndAt: '2020-07-27 12:13:03',
                status: 'COMPLETED',
                name: '5ssbgzdy6gddnm70go2dirnucjeviuodvbs8d0a72ttlr5bvx2fqyq683te92mjsoahxmidh01w5hc0d6k11nb0pklafjzrtnaxyvm6x8lydhh1xgxokckdj9evkfoz4hiw06jrhy5xx6nkwikhi29yihrr48ss5afsbowunuq19g1rydk2f6kptuf12l1lab3fpw38onr0uz25gtdac15ox4rgni0nw2zmb1ordz45fvkmwtkd2p1zc85b7wo5',
                returnCode: 8470993118,
                node: 'prkwawt7ptv6a5azis31uytuy0hqk3x67bw27s3bo5285dghmqrvuugc73v30rydfww59rbvwm1yce2llm9xk2sn7rqafw7af6xwc3mox0l4cusb5nnh6jkrgghj2fo3x9ax5zmjc1iztq67jwpuk9tw2t9du5nh',
                user: '6w9ue3y830cbh3ztjomal9fhyzut4xn3rgonjjnhnkt2nu4qelcb3auyssazf409hjyoqvwksmhuct5a9oeqkx1pg8fxhgntxysxzhajdg4b057d9kugmnysvzsn5tb3mfiub7lj06bxtxayuukj7iqyv3mxmlp5w4yog8g1kz0ax5mqdr1ldrvp01vhrrhyck243sov7mzr3idt7xxy0xfyhl4o3w5iv1z2jxuvo5k45a11ca0i84z6j9nlos5',
                startAt: '2020-07-27 06:33:53',
                endAt: '2020-07-27 11:39:10',
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
                id: '24af86f1-ca66-463e-9ec3-225a479de7b4',
                tenantId: '85be8694-947e-4a9e-b932-5efd98d56480',
                tenantCode: 'dz38cgymhb25m29o34vvw5l1gfghf7f52v3k509j192o0mtnns',
                systemId: 'a41580c4-2f5a-47ce-8ab1-6a7584b4f5f8',
                systemName: 'pi05inbd2fee2b2iu8n9',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 08:51:30',
                executionMonitoringStartAt: '2020-07-27 17:48:41',
                executionMonitoringEndAt: '2020-07-27 04:24:58',
                status: 'COMPLETED',
                name: 'ax212zxp8ugg6p6og6jrzu3ohldd1s7s104ew2t4ixhdadkr4rvq7y3xm8ut3ijtwsqzu1cx5v1173rswgrd4xl6qo4y6hzr8r6znn63mca2idd2hqsov2i5mtebvapb0y0ask34w5vvbtxlt7b05kcrmq37bommp4i71gsamr47zgmnalu7utt1ip8a2556q84fivwakyi4yp2677o3opbdx6noygpdo6crb5npwpgglbw8ybxqm9jymskscnu',
                returnCode: 9648683981,
                node: 'f3j0z9qm9lzwfw8cf6fnixrtveesrpm7y2iuny32lkqebcyopl6x8yf4clvm68ytw7t0z4t4uljs8m39nedikx2v1i7q7gztjq67uope2xs8kuhr4m5v3hra9d7tz0bybi7gzhy3x6q5yp5div70fbwpfskzsnci',
                user: 'bgj8ohk1fb1kei16oppecdzawfke6e2vum4296jravg3asz65n93e5f8ocielkftxenr2zy4a12khhoapemmcjcix5xtx0gq2w04g05kbxoyjxmv39yo03r91ttqtfpypqll5yvwfn3meqmftrnnqhp43znkhp1kagux6wjc0jfbuyyd8c87zhby179gv1crjnabtc1oswcduvxwwk9p2cal801yuuxi5hwziaxasr45sjplqgkrfnq3eg4q9jg',
                startAt: '2020-07-27 11:23:58',
                endAt: '2020-07-27 06:30:08',
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
                id: '24af86f1-ca66-463e-9ec3-225a479de7b4',
                tenantId: '85be8694-947e-4a9e-b932-5efd98d56480',
                tenantCode: 'ue4me4kfbfwfmz0t18kl2au9ud4qcugeg9v95v9kwsl19hc38j',
                systemId: 'a41580c4-2f5a-47ce-8ab1-6a7584b4f5f8',
                systemName: 'm1q9sqrnlafipwmql7wb',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 06:47:29',
                executionMonitoringStartAt: '2020-07-27 08:23:40',
                executionMonitoringEndAt: '2020-07-26 22:49:23',
                status: 'CANCELLED',
                name: 'rybj28sbotycdd434zmkq1trb69l6xv5rx7vhtuido48mc0gxngba0tkm0dy8wqmfuyvjdutg34ag92o954ivc2j4hk3pq7malvslz5165n14e31ir6akewd3vhsa3gzv6leo9klvs7hjj477rhfbjkejboqybntg929we9thots9bto9pslzof64u01a1jv7wlinkg4qrc2p5n0ytuidbh13qlw15vrq3cy7gikeabzqjvqrbz1j14rv5aws3a',
                returnCode: 9425027824,
                node: 'kt8hkmaj2jjjey6auwhsq6slp909srxkkdsvcuxoltnkdn44abmgl6rbwonuklppg2mtejqq37mwkomd4eoat1o6d3qxfk80gp8o78e1r51qfca9h0crdae57dz0q2564aziwds2d515jzc6pgok3eswx2ul8o8q',
                user: '4uncko41f7ihzvt79ge0v17o8omtecrppd3lukjdvpxawk9wkxhsh7t9ffnpstv85nzjeg5t1yujo0tmyb4scvq71mryauz14vrnkbbnn7srrixm9zf6ln7rddjyc6c6x4x41qxi6r49t9vxhmum030bh8b17vopvp8tzgpsl15ai54tjpmko3czeb4t3a1g38tg0v9evxxi28aegu5cbc0xlh45wu8sibbdxvc13svm6buc8mzil4pyvpu4tid',
                startAt: '2020-07-27 17:04:14',
                endAt: '2020-07-26 22:36:13',
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
                id: '24af86f1-ca66-463e-9ec3-225a479de7b4',
                tenantId: '85be8694-947e-4a9e-b932-5efd98d56480',
                tenantCode: '266daetlkqdcdxrbqlopn7a35tjvzndvzifikymt0zaklq6pma',
                systemId: 'a41580c4-2f5a-47ce-8ab1-6a7584b4f5f8',
                systemName: '376to46fbl83dlor5p01',
                executionId: '452508ad-9976-4bc0-9ae8-266fcf4f626c',
                executionType: null,
                executionExecutedAt: '2020-07-26 19:35:31',
                executionMonitoringStartAt: '2020-07-27 10:56:15',
                executionMonitoringEndAt: '2020-07-26 19:07:03',
                status: 'ERROR',
                name: 't7hlfvs094c2r8yofypocvm2zo5jzseubbgwyn90de6cx35wriosekqz3oerb87rn1fiddz4ocgrzi83oluipt4h77565jaqjus7x2k4ify11nmoaapwc55l05bfckcxh71mryvb5iev9gy3s2jqlp0qntfzf824yusbxyhdxzf7d92vylvtfqtvldqzu3nllufwmay8x5y23v517e0knvbegkrg1ymm4n808xr8ehvnavu3d6wlyp8syubk95w',
                returnCode: 8015741312,
                node: '9uk173h75edwzpdo8f4qdiuyfu6n3unlp4wql61ia35qoevb3gvjaipa9wk78mcb92krksv1xgq2ogpbctdz3ob93l5wfo4b1uqjwzztn71lyagiz089iwtj97tupiw9y5uvt4eb5qsm3putykjnbx509ynehdpc',
                user: 'sy2ki5jh7gkgv9pq2rmjvndmtd3qpb0a971i5dlexwlxehcppcva448hzzwvfsj8um5xkst84l7kwubprmxc2slacpafhh1n1egea50kxi9ynspmspfzhdhr81f0zsc3f9hnyfhzhf47fqehynbht0j5um36xameu0xye6t632tdvca155zzyq69krokbpsdpycscppuq0u53yggcjuaz8h0xdj95l11908xj1pb5tmoetk9wqavngjylio9xin',
                startAt: '2020-07-27 03:36:19',
                endAt: '2020-07-27 15:25:53',
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
                id: '24af86f1-ca66-463e-9ec3-225a479de7b4',
                tenantId: '85be8694-947e-4a9e-b932-5efd98d56480',
                tenantCode: 'udpn3l42180zi7mclbf5g1r04dsjw44tddna6pl1d1hwii5pdz',
                systemId: 'a41580c4-2f5a-47ce-8ab1-6a7584b4f5f8',
                systemName: 'kx9irdr1x0v52c88zql7',
                executionId: '452508ad-9976-4bc0-9ae8-266fcf4f626c',
                
                executionExecutedAt: '2020-07-27 02:34:37',
                executionMonitoringStartAt: '2020-07-27 10:32:36',
                executionMonitoringEndAt: '2020-07-27 05:00:31',
                status: 'COMPLETED',
                name: 'l2x335u7lobt3tyw3t0s9ru1qb7aw9fxdzabxpb4mam8vakonkoyirjawr5rwb4xahz1n6def9r38f7ywi2n03avu5huyfgp8xibz51sgr1p0i4e3vpswps1bagb816gwrti0n6k0bv1aowywuc555d1ijpo6hn7fp1924mqyzcirnroe06haeaojpmj8lmjcbhq5oo2m4s6bfhcx17ucwzrnkm09nay3urpexhkhyn578jz0yi4expzyntyl7x',
                returnCode: 5219949101,
                node: '49m52f7pjqjgiv2yw6k9tj9clui0sm1zpduvfynryh2a57fbnoyg9cf8hr3vqiojtugcabgh5wu49eescylcrb1upmd5fppc3ihe6bdehge4h13mz0timp0qjaurxcjh4p4jdk8owz7a47ayj5qnbkxqylsornk0',
                user: '09a7d56zuuyo9ho77bbajtfqsrkb82zwb8150ebvd3iamsljlf4jrg6i3vq3wvok7n0il8fphllloj7q03p2l3u6wloldh39e33c0gkv1z0bx6cmaloukgyq0y1bcdogxsc1x1pgbjy57mtxhr6lxhoqftxdaqezqopc3lmq9ucyk9kcrsqva7ibvzlt4b98amvjqq1g8m0rrx6m267s7qks0zxd1v83rmrlcj63e7tqzfsuspzddloig4bb1g7',
                startAt: '2020-07-27 06:39:34',
                endAt: '2020-07-27 10:32:15',
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
                id: '24af86f1-ca66-463e-9ec3-225a479de7b4',
                tenantId: '85be8694-947e-4a9e-b932-5efd98d56480',
                tenantCode: 's83k9r2yn5jzysj3dfpntbwfd2baeva5lp483x92qjfay83pe6',
                systemId: 'a41580c4-2f5a-47ce-8ab1-6a7584b4f5f8',
                systemName: 'ultkxnzgl8bdpw74rdt8',
                executionId: '452508ad-9976-4bc0-9ae8-266fcf4f626c',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-27 12:21:22',
                executionMonitoringEndAt: '2020-07-27 05:43:13',
                status: 'ERROR',
                name: 'qa7jrigfj4p694rlfo5vpr1actbyzih6n0m56gtala0dy9blo9sl00q0woou71kqcaegkq3jo3g0zjftia9tpi39lwpm0tg535ytc4sy4qsm0fqaonnamlr52bdfptsmno1nerm9h7i3p2vgxz5fpxiy6fm3unlh2wfu9befo1hsddob8lvnztdeuln7vjco2hs5yaw89nhkqdymqy0mfdhtirenn89ho8091w36tsaz8yy2t1zrwu2mpn17ily',
                returnCode: 4249679569,
                node: 'xb2rce4595of9obt6iitrv22m9z5d2xdg1hw7pjjsv5vc4ewzxum558d7w6xz2th364q2yibmf17lpmk1r0fsprklpxbhwjghyuf9aosx10hzgqo88k1r6336fvk9ltq8vn7xmowicq0nox31751jmgncm68eai4',
                user: 'xm0l84d3mowrlgsivzpjlrm53c31va0dxi1j4f4r2uowznaod4sogt8yeysx4sk60z2y7fodzi2bhciyp2hh36rqimxokxkycpcm2wbess3lknxf8ss5tfp6pth846kkf7i3u9ljdb1b8at8qr180yz6clp99v73ohmmigfaomjaamdv6dcqd7l34g2qua99jgkt22agiyr8wsduugjkz0i8vh4o0mfko9nbcf4xlvi7rgsjdpm6q4y2zhgusmy',
                startAt: '2020-07-27 08:57:04',
                endAt: '2020-07-27 06:53:40',
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
                id: '24af86f1-ca66-463e-9ec3-225a479de7b4',
                tenantId: '85be8694-947e-4a9e-b932-5efd98d56480',
                tenantCode: 'u84eatwfmv95rd42i8xcxx66llj17acg7mmtrl70rox9udi2g0',
                systemId: 'a41580c4-2f5a-47ce-8ab1-6a7584b4f5f8',
                systemName: 'igh04kagnsunkxckpyg1',
                executionId: '452508ad-9976-4bc0-9ae8-266fcf4f626c',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-07-27 00:49:06',
                executionMonitoringEndAt: '2020-07-27 03:17:36',
                status: 'ERROR',
                name: 'ddbj1cbve26wpvay1wxkqrwhy16wkdme8e909tnqqb4g2y4kq6r9c0mtrnnq2mha29qwjr2k1jvvtpdd5mwaj59q4iwuu0zg7971t5ubbzdon7bruttetj8bw5c2v5tcq4g28g39l6zxjzxkwlafmqipgqv42rjp6t8x3ptfxqub0gasninns3d7t5vdz1blk5alj8ut9ardvot2j1rlemxqmxrptng0kzv0kfczjh2yrr1ol3raaajdpgaic2k',
                returnCode: 7177733193,
                node: 'd2oopxyiwzgro48u5axa1cwt1zlkz1bjtof2f68642z2p1z3bipbzooe1k3uthbpm7permpxw6ysesoshjj77q807928rdbpwnhyxqko8i6siqeekzq5bxwi2we237zyhmspz2yxbc36wg6i9v4ealwl4ok9wa7j',
                user: 'u609eemnmv90hrfnwjyh51f47ot0dhse4prt6mhl34w49p4144m12pfrgpqwmqc6cg5vnlx803uhc59e8mz25zusqrca6e7r1823j5viui39esk8eznanrws1ph1ld1d2bghgktkvn54iphwp0ds1awppd0gwxzqbk14u7xv1z48ida7sqarx2a5pksyr2adul3wkstt9fnufj1ckcpc3zb2h2map7tb3syacaluwi4xpr28b3lfq7gzwf5l174',
                startAt: '2020-07-27 08:08:53',
                endAt: '2020-07-26 21:40:14',
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
                id: '24af86f1-ca66-463e-9ec3-225a479de7b4',
                tenantId: '85be8694-947e-4a9e-b932-5efd98d56480',
                tenantCode: 'w023uomwtjrvk1lz99mbcz8ffpd2285fjhqyl2aw51gl8ngm0f',
                systemId: 'a41580c4-2f5a-47ce-8ab1-6a7584b4f5f8',
                systemName: 'kprsl4sspuxats7p22ef',
                executionId: '452508ad-9976-4bc0-9ae8-266fcf4f626c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 21:24:07',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-27 16:17:35',
                status: 'CANCELLED',
                name: 'dhugw8ogk9qqvlgbdzkjwhwae5elqv1oddbbp5ph9ytxov9juhdcqeoudo9t3fkg19s3ychbopomxxwgbyxnzpd20nrldgixiqz8qcivrprfc25mu8xxy87h97jboqxfe0pbr0t6f15g5mds2tul4wujso69hi4no1vur6p2gvvari0quj53xwle3ki998fa3m4jxyi2n8y59ub2jwvhazbtnb9k8l5ddysq49hsodo5heuk815q0gz00durzb5',
                returnCode: 3992107634,
                node: '6kehmk5vz6j1xyl293x7i0prrgaqsuk2vad5vnhgoft4420ypaphkqb0xnfz5pdwpso41bosq6b7wewyousrfgndft85ax915vu9lbzseg8qnhcp488ycsb0ltm8hazeaq1bpoc9ef9cc4k7vwu58euwlt1ul8e7',
                user: 'wkncljtxztj0dukb255x0u25iy8ssqtd4sx0x3ezoflxcdw4hnum8892rxh2hfsy2mibqntcp15zia6g1k2lkdcnfqf2gi6lbeu30yjnrz1my7b8ggazoi80gcykskpazpdt08ga4rdhcoqu3c2h4wofkkmh4e907nj0ovxwx7u8rky3a63tnzw0rlk6ht0ypm9gkvduvqyzljw0umwkiltoylah3481xugesy1k7z5rnhc13rim9g5a4xx49ip',
                startAt: '2020-07-27 10:03:02',
                endAt: '2020-07-27 12:23:42',
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
                id: '24af86f1-ca66-463e-9ec3-225a479de7b4',
                tenantId: '85be8694-947e-4a9e-b932-5efd98d56480',
                tenantCode: 'kfstoo9mp0mnplbfdq9lhgaonvo1c804td3hl30na4hur3b5gw',
                systemId: 'a41580c4-2f5a-47ce-8ab1-6a7584b4f5f8',
                systemName: '9dqgqprebx36t7vdtmrz',
                executionId: '452508ad-9976-4bc0-9ae8-266fcf4f626c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 13:35:17',
                
                executionMonitoringEndAt: '2020-07-27 06:09:24',
                status: 'ERROR',
                name: 'egm849em9oxaoww0u1geihwtu9gop8p9j9boi2sn2ak0xolq5hfo1wpvnnjt73x5slcpv6lmyuyuw3ql8ph0sxerlw5v1emyea3jt67tpzrocytu3iizd3w20b4gq8big4ygtyd2ubo446ivn4zppz6v91ads4nc24u3h2e4d4vpy1a46lam3p4xqxoasf87yvo99lmw0zuxtuc75mnqcitxgbm4jhsuk4e7otlx3cit0b3osqzut46sa0fmshe',
                returnCode: 6376948412,
                node: 'oxq6w9jdmbhrwxgu8zsnr7kstx0dmmqzo4cbe7pcbiviycltukjv6tcrph93l3lzglwl0ayc4hwuv7h2u3h26cknvfkokkvxd1qdqszkyutrj891sfrdfr84j5aoma59xr4nipv4m1e05v1p77c10vylxaw9ggou',
                user: '9q0m2ah66l4wx1d5l3lf1xfekri3gm4e5nb5s81d8eg4tvzmlbdsd3a2wpyqs7cnqm2cuoahrm9avf7xukt8njo1g1qedn9hlyqm0jsortw69d2pmmkpq4dr0ub6eqrldxasaoloctj4bhedh6d7avv78ihrgzzzmy96xintt9dlhwqo1q8vvc156zfo7uqq7yws88a4aq1xqrdwez8tzrbi4p2kv76oj83kmijflxq3wc2lmw7tqinnw6ymcd0',
                startAt: '2020-07-27 16:47:52',
                endAt: '2020-07-26 20:35:56',
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
                id: '24af86f1-ca66-463e-9ec3-225a479de7b4',
                tenantId: '85be8694-947e-4a9e-b932-5efd98d56480',
                tenantCode: '95xk8w54fpuebus2fu5q6mh5z3ro3f9gerhawqrfglamk9h6e9',
                systemId: 'a41580c4-2f5a-47ce-8ab1-6a7584b4f5f8',
                systemName: 'ep2i91hpmwr4vv3m4g6c',
                executionId: '452508ad-9976-4bc0-9ae8-266fcf4f626c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 20:42:39',
                executionMonitoringStartAt: '2020-07-26 23:07:08',
                executionMonitoringEndAt: null,
                status: 'ERROR',
                name: 'nt5vmc0mxondcvlfbuy90znf0rq7b8f2gw4ibyc3fqsun1n7vlz5tovfph7m4xd5acs3sqb6ovicnbm8xms0tst8g46m841y8vcjvtqzasjh88qjoerkw9wg8kco9gktg1iulr8cnruyf0ugye9p5h039b2atshl65psswstvvh6t6vwalbwvwgfjbbd9672uaywdkplltz68a1j7xkbulx5i9ahbh4gaj0ar7cb7x702pa78fgx3kwvfpp7opu',
                returnCode: 4766048695,
                node: 'cq3hlo7s4x25t9pkk7xs3qnjkcltg1263sb2nzgbpllwqkn5u2rw35ov1z4da46wq4lu3xn4xtwjol2fxs6trro3cv7u4xqnw2err3b1qdpmyd2b9lwq7wlftw1zdnq32ydktsmamu26rye4xkyrseu1yx2hcep4',
                user: '76ub9wztdyox4qkwovle8bejez5vi1lhohiznx02thd1pblm10symjjipqbuxpmoll0p90gkdvl3rvg0wa7ox4r4pxn1v92aevbc16fu1v05l5kmtm9yavq7uhrgjlr4hptfqeokuy8vfasbidkm29yz8s34xxgv0xitfe95yumfrzu4jviegnazc1y5krqfyyirt2hyuzphdn29jzur9jknpf85wtha28kjb5bbfz966s9nir1jb5yb0euvp9v',
                startAt: '2020-07-27 06:51:18',
                endAt: '2020-07-27 15:55:34',
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
                id: '24af86f1-ca66-463e-9ec3-225a479de7b4',
                tenantId: '85be8694-947e-4a9e-b932-5efd98d56480',
                tenantCode: '20jumakjg58j6itb2dkcbhz4loa4ix9mhqwtuia6csqa45c8u5',
                systemId: 'a41580c4-2f5a-47ce-8ab1-6a7584b4f5f8',
                systemName: '6jku3h4thr0mapwl59rz',
                executionId: '452508ad-9976-4bc0-9ae8-266fcf4f626c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 13:07:10',
                executionMonitoringStartAt: '2020-07-26 19:39:58',
                
                status: 'COMPLETED',
                name: 'rm7uawc1zdhs82xvzh1rq0spchld9brlzyt8nzsqkppgw5bm2to6ofjrw0l4biqseu425m6uu5h5lhqbott7agbknvu68q9uwop4fvineqeqm2gqfsx636g7o4tru17u277ff6j4icrvl39hoy6n6yydsll0fwihcjcd6gl3ln8jjl0ppjnoiqggibqa3my2jv3p1cq6yr5e1trrzgq3x6st93ljxbn55slc2bx2qiuemtl8soz3y71nny8osg7',
                returnCode: 5722338910,
                node: 'rmo8ho32fb5jnss1ol3j906kk1ycni0kqmku6v02up7jdyord3aua7emdi592efh7avob3llo9adio3w66h0260eltu5bmr8h0nsc1zh0pqpzioi2rjstozzhslz6ic7q6lulin4t9lsqioib13n7m03l4zo9zd6',
                user: '9u8kumslq0mzevftfbc37nflxfc15ga6idx85uoivyjonlwetbowcgtd4wighngxp0vfwe0wl7r21tmip138fdf70p246tu9mywczmxlzyuo8pzimoq5zjdchgrpyv1mb71587dst9o3o650e9ovyfc2qoyd10r2vr1r5out9c8cuxmn9hd3tdkaimrz5ngr11ydvbr8nyqqxc7c53yqooibcwbc933pfke6mek9b6qufwxrrn6b1qx4ur8mein',
                startAt: '2020-07-27 14:09:55',
                endAt: '2020-07-27 11:53:32',
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
                id: '24af86f1-ca66-463e-9ec3-225a479de7b4',
                tenantId: '85be8694-947e-4a9e-b932-5efd98d56480',
                tenantCode: 'dk07qn7hq3042kxk69f6bac44srxwg18831ybsiirsphumf7r1',
                systemId: 'a41580c4-2f5a-47ce-8ab1-6a7584b4f5f8',
                systemName: 'zepnhkv8oy82sgepty6i',
                executionId: '452508ad-9976-4bc0-9ae8-266fcf4f626c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 12:46:25',
                executionMonitoringStartAt: '2020-07-26 19:55:03',
                executionMonitoringEndAt: '2020-07-27 11:10:32',
                status: null,
                name: 'ej4wj25qsy7ib9hibhor3l1n5hne2ojnqkddseiczk4qeoq296cmo9w7ytujulg818wua18f7dxhsl6ui9jb1jblaeh3bqo5u26x69r7469w6wdmzeytc6o2t1y3dq6xcs0w53b05qf5zr0s5njcb9ia3e02j7nw1ecf43gdb7yh49a1hhga1bk3nt29psrck0gihck140g722yjqa4to7wknfordl4l6ii3xikt881voll0k8hjp7pkb2qqodv',
                returnCode: 6001749979,
                node: 'd5e69pic0016q9bbsscu4b0iyv17tfht8npi5xe7xr4xjoro6zm77ihac8nwbg74c55q6vyaoe6cliw8b3zxcsakhsr6unnl6qkdrj5pqeat0ncecuy80dzjb8enobkt8t0bcvhxtq2c9c6rn74nu068dmtteqxz',
                user: '2kb3helpnt1uthzi4h06ut7frlxxnts0jv3lllk0dmme83h4j1s99nd8pjarggr3tnjayj447yhjy39di37mwpdzox0e7w0tk3iwkx3v8ng0a35999emr3u9jrehbw4hcxf2llxc8gybdqfkguxh4u7db19zytvn7s8pty49z9zaha6x6tzzttn8mppo1pd9kvdkha7kl1zmh86mf95pqcuix5ddglqn74reeujjci0b3unqrgx51txvh5cxagl',
                startAt: '2020-07-27 01:17:43',
                endAt: '2020-07-27 09:47:07',
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
                id: '24af86f1-ca66-463e-9ec3-225a479de7b4',
                tenantId: '85be8694-947e-4a9e-b932-5efd98d56480',
                tenantCode: 'vfr4imj9aflcy0pamyt2poffz1w1isd97nneptsmqyxxrc5unm',
                systemId: 'a41580c4-2f5a-47ce-8ab1-6a7584b4f5f8',
                systemName: 't3or5reokinwj0x0eevw',
                executionId: '452508ad-9976-4bc0-9ae8-266fcf4f626c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 23:10:11',
                executionMonitoringStartAt: '2020-07-27 12:39:38',
                executionMonitoringEndAt: '2020-07-27 05:11:03',
                
                name: 'l5t5geqjg69kaa974op44g2rpqzr7oz2ctusxxdfk1we2a0rjc73u9na9kslpfcs0z7rzugeinasd2nyq1oh93w9zwqu0bwjvjxx95l4alxys6g4agqqnnsf045v7aghudr2ln3n4lh7iurzai1ljvnxlbr3v5tdwlsu68a5uv7nl3nd1urbe41tg08af8e9c2fk6k9rtx5aaq2gueed32m91xi6cmf5bcnny0dtlyjt10scgc26g8ucalhx7ly',
                returnCode: 6938261978,
                node: 'qvty1z3eks7rg8hjcj129mhw7xkw4o6twg0a3pxonc7u5y6b9xskhq23je2doig4i9rlvhme8xzhfbb40p0l6yh0v1juqyvalaw88guw1s51t3tgwdn3z06qmf2jmmjcogj8du58vr1eu8pug4lkswjjxh6b12o6',
                user: 'acyf38k3oa08p10mroymsia5zaaly0rn03jzwcpwapiovqg304au89v66adjc7ysass9jm46mpa3asr767ynd1ar53olwvrtelqzbskyfi5n8qqjn3jwxwomzoclpaaj233fm406b9rgltgzij4ou8gslsh5a5ns29cd82m7jbkq3ryess37bhfo95hy42jrcsdq44mza54a29cr8jkikmkeubvamj3xu5vokmkipp1909uyldonf8al4qkj3ig',
                startAt: '2020-07-27 11:30:50',
                endAt: '2020-07-26 21:28:49',
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
                id: '24af86f1-ca66-463e-9ec3-225a479de7b4',
                tenantId: '85be8694-947e-4a9e-b932-5efd98d56480',
                tenantCode: '089vye7q0z1zthocnaqigypxwesg92vkcpnt0ifwr874wmzqqd',
                systemId: 'a41580c4-2f5a-47ce-8ab1-6a7584b4f5f8',
                systemName: 'r7bkmbrt7qtsmfklgapz',
                executionId: '452508ad-9976-4bc0-9ae8-266fcf4f626c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 17:35:54',
                executionMonitoringStartAt: '2020-07-27 16:39:17',
                executionMonitoringEndAt: '2020-07-27 04:08:13',
                status: 'ERROR',
                name: 'h05f523tjrbd1g00to67d007qr3sw7nucd0sh2sbbel1ehlmv4dec0odwwi6ppw67mz3rotea77fspxolpv6qae2ocujl6wnjciu4ylkspevd5pdstlu2rn7ldop7i5fttkfoa43yp3scnz72cp1x3titbtv4b8ghkbo5j4ac16l0w8l8fmmqot4lcppfqjnvzxkecuj65ylk41skhyzcnpqp2ab13jf1diiu5eulql863yjv2xs9iysdtox068',
                returnCode: 3073908184,
                node: 'i5t02on44pa8trobur78idm4z1eki150wz92clrubhjr7xnepti6tg2dyq1lbmwd8iz0or9hykx9sw6qsaapotee3shgud6gt6gxs4u2w7t9d0nj8xigcy9wz3j1ysqdhr22afgrhxhm93fuwcf4rg1lq8zdirg0',
                user: 'eoxp7t3dvrv84lwj04lih2jew2qlq4umt6jklmjvrm62k7avmqxvxk9xznri7m5m62y518oxeyl2z0xa80qw9blvqadqk8pulpi39szth03vms50zyj1goli58n4h2ik52zvw2ebbam6zr278q2j6ofregklhmamokci21m1j3wy1ttyk4tw9soe6q7ii80338t8ycm2k0qjurodti9s6ad1em3d74eipvd1x3n8r7q0l2tidrtkzbft86o33de',
                startAt: null,
                endAt: '2020-07-26 20:29:15',
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
                id: '24af86f1-ca66-463e-9ec3-225a479de7b4',
                tenantId: '85be8694-947e-4a9e-b932-5efd98d56480',
                tenantCode: 'zfig3yq3th015bfdgl64xox2ytqi98n73akh9l5p56xfaddpne',
                systemId: 'a41580c4-2f5a-47ce-8ab1-6a7584b4f5f8',
                systemName: 'vgrfgtgk8jxptvje3z5x',
                executionId: '452508ad-9976-4bc0-9ae8-266fcf4f626c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 20:12:04',
                executionMonitoringStartAt: '2020-07-27 13:08:26',
                executionMonitoringEndAt: '2020-07-27 05:16:14',
                status: 'CANCELLED',
                name: 'ctxlxfz846ua5died1v05rd2s72vzhzly86kxpgbj3zd94yl1kzhxgpii4hsldbra95ll7kr26bfmpqr035v2qdku8bobae79yih65xiabj604ja7bylqymf3jyf4tdhfi6lkyoqs9778kzlv6eg72dm3he01g6gxafeads0o411ffl2jyj4q56bb8j02qkc8fj2mcc5z0dpf7u0euswvcea5h9lnp61otljh271iszakkp2q85otlflilopkml',
                returnCode: 4951108548,
                node: 'y3sicdbtdpuu7g7tv79bb63hgjv9yomzndcfl5f0batee2zz9zwr27jhi02zlgt9pqpf5lj3m51mpthit0elpgjt2mlcplu0h0w8wttfa1nbg2juldtl91mene791t8bdm322eg9582b3c8yxi8dzox850a93hrg',
                user: 'r00aal2ug9u0w8g8b663g8zk0f5qja5lbc23vbad24qak46p49hi2rc4ibbex16gjlauc6pbe0dq5of0tqoc526nph0zk0idmumckzkhxkgb3gmzdomwf5wduvt61k0gia5lxi65p3ohi666ymho2y15kguew07k59n0e1f0t8ovyeyapqlyk4qay6l92egze9ztdfzv60pw1v1mec5bvcf898cjaebht6buktgrxhl0v4mrqw1i8f8m706lup8',
                
                endAt: '2020-07-26 23:13:42',
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
                id: '24af86f1-ca66-463e-9ec3-225a479de7b4',
                tenantId: '85be8694-947e-4a9e-b932-5efd98d56480',
                tenantCode: '2wjmcr6gbqpc4d6l73hn5y0xjmihf5zhkjn025ydijomcqf7kq',
                systemId: 'a41580c4-2f5a-47ce-8ab1-6a7584b4f5f8',
                systemName: 'o6zfgrmsj2okdmh920zg',
                executionId: '452508ad-9976-4bc0-9ae8-266fcf4f626c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 14:43:16',
                executionMonitoringStartAt: '2020-07-27 09:47:09',
                executionMonitoringEndAt: '2020-07-27 11:30:01',
                status: 'COMPLETED',
                name: '4jowd4pfsct3rwmmalg95jaz266pkh1f2kz0w02kz6h8ad7v14kggg0zm56yiqqdzwh1jbbnncuz3tb1thzvy0mceigdk3gx3pqh86zlq8q3oodxxkpcvg4imty8fv1xd2p661fn59jiltx84305xtg56hnbrtccsw80a071hmma67odz75k5bf16g1i6txk0cpqy96pgis75wntswnv1hy4ocqzb7ypsh1iswq42r37jzh419b6oyl3mp4y2dz',
                returnCode: 3174364377,
                node: 'my26dpwe6e165jaimrrbcb9xdt5qy9pp4tatalmfr5d2o64x1a91axfzqfj2rgi9dcseliebzdvo3vgbodmnza22g3xitdzrqja7ggucpva96wrlfdwe6efoimzuiu03la7iv16itp1xexv9l1pjdkiu41iz17mf',
                user: '4q0tu4cjodb7fr8j6ipxg2utl30wyjg1btl0tg667m9jaipnxep9f20upuqwvb50tslccwjqkibugz27cov5mo3szpdcpl23v9qc9ou391o25fjcwukkmmhjo7xstn2k66q0zo1hkzmw9mixkl2cdbi0ki84f9vmoamug0wybhseqku0lscwafbdvz5q17e1lydk6xl4fvgdn9vino6l0orint2nw8xkmt8l5dos19fescvdcz6o49erqi6pf6f',
                startAt: '2020-07-27 17:05:12',
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
                id: '24af86f1-ca66-463e-9ec3-225a479de7b4',
                tenantId: '85be8694-947e-4a9e-b932-5efd98d56480',
                tenantCode: 'hsxrnzjm098s0zb35dgbpprcenpkrpm5ugj6uifq92c42tcvme',
                systemId: 'a41580c4-2f5a-47ce-8ab1-6a7584b4f5f8',
                systemName: '5rhlmagqf40u9ep8vs4z',
                executionId: '452508ad-9976-4bc0-9ae8-266fcf4f626c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 08:37:31',
                executionMonitoringStartAt: '2020-07-27 12:07:02',
                executionMonitoringEndAt: '2020-07-26 20:42:29',
                status: 'COMPLETED',
                name: '0mqaml5ow5cm20vyzjs36jk8s0cv9az6uhbbyo71m75lcnbrggzl67l4bj34jedsq2z2bhn0zvvccg7sy92v987cbmauer7heqln19pfifl6e03wefd5but0pkl0kblqjasd4gd8seo9sg8h8ouemvhxmjppo63hbr0spjqyu2hmv8yrgumpu7ha7fzsgbg1v6mx5von33d4hmik4571epbn0zvigfweyyp6etcjogqps25wl0cytmug70jkuzr',
                returnCode: 4663207639,
                node: 'ye2itykatiaqi1b2r1p5z9gh1sows4hc0hwazbixgz46eakzwwwk97z2y42fr7vhqwuv3tmsc61wif97g1zp9w89akctx9plzjlgnihbv8rdr9yoypubf2xj1gnzse22kam50e5ia2x9hwequiu3ejyqvelplqvi',
                user: 'gs3ot1xyjyxy876xjaefzs60se3xble634prgjg3z9f00qqxncn2vmnxwneylkze3vcelu6hwtwy88utbwbmc3g9d5acn72pqq89apm13f681fykwh0kp3bbqftqwgx3nvh2cl8o3vydbk574yrg56ddkjzlfr9xrv106a3bttx6459zcd4wregx6qcu4li8gia49iz7f5juvt7euqe0o8zusvoe00lfwe082249s1obpkpt3uryjzm5ptn71fn',
                startAt: '2020-07-27 09:11:22',
                
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
                id: 'zhf7kyewlt8z4g2rqwrbd7u2rxbpiyygdo6ff',
                tenantId: '85be8694-947e-4a9e-b932-5efd98d56480',
                tenantCode: 'a5twchl1sm92ghzhe5r23fer0djiuid82fzhuzxtlg7n8squdw',
                systemId: 'a41580c4-2f5a-47ce-8ab1-6a7584b4f5f8',
                systemName: 'rkeal4dl655835zl9uxq',
                executionId: '452508ad-9976-4bc0-9ae8-266fcf4f626c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 05:06:54',
                executionMonitoringStartAt: '2020-07-27 10:54:25',
                executionMonitoringEndAt: '2020-07-27 13:25:59',
                status: 'ERROR',
                name: '1aqyb7u7f1swxf812y0b6i3yzlwygddeh3bb2bgzlmn6mdicc2iuqjmvp6m6o6s7m04m2m2wnps04yth8td8frroirieh7gqkaj0fa827ow6bxsmwd13c364lb6viegb99puqc7g83huy3srunipoeyn429z28twsat8nnde7b3dn7qwos18xf5bywgbhetenptymvmsz4vxkc0kfpwzi3x3qf7xbskrd4zoncsmb2mkh31whhgs2xzkiagnie8',
                returnCode: 9490149510,
                node: '40y68uulhl2uplhta6sb996ib1dphybkvin2p705mqeeaiwha54d1vvo63lkmmhe6h3ez4n341y3315bup0uywp8463ad4pu8sr7pjcygkwlk2czxcbd2rfo32ajs8q6ek6qrm6jx6q0wxg7n1g9nel8s45m4t2g',
                user: 'ebbqm1wrom2gu9f2nxe2mljgcdlgbqbupqiv24l7d077dsscd55oh77z0t2b4gmkeh9l875khz5etgqdw4l8bc6qqv8kq2xeu1bcrwqlf7yl1s91mntwer9fx7yh049xzjlic2m4ghu4ngqree2ul7asev7jujl5u8hxw2zjkpxbrrrbgqyiqqowiehi1liissvqvbew56l1bun2jmi3fo9yy9ooej3m3l0ljhu4nzkxpzmtxko6bmlpdz72kwr',
                startAt: '2020-07-26 18:42:33',
                endAt: '2020-07-27 05:00:54',
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
                id: '24af86f1-ca66-463e-9ec3-225a479de7b4',
                tenantId: '5u83v7i8xrkn3tujm1747xu4xmzq2gk0i2z45',
                tenantCode: 'phcelg4fv6izj59cjo139ljckh88d4m3hmbkoeqzymdltrl0ze',
                systemId: 'a41580c4-2f5a-47ce-8ab1-6a7584b4f5f8',
                systemName: 'i0b455hsdcl2t4tef1sy',
                executionId: '452508ad-9976-4bc0-9ae8-266fcf4f626c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 09:15:36',
                executionMonitoringStartAt: '2020-07-26 21:08:57',
                executionMonitoringEndAt: '2020-07-27 05:20:15',
                status: 'COMPLETED',
                name: 'jtswa0c9grrckweu74lblg5qhcbi13nbq1eoxd0x3ok2ww6degeli5of2u4rbdxe0urbfp0ge6mprspvae8ykdkrw4wm6d2wzsp0e4b75ft4i81hha3kz22kza8es5m07ufih9wauo3vcld4mxv0o0aohtz929flyfcm83sz48t7d5hv0nge858l76mbvp0mbr7mtyn2oeszixyhpbkcrgumt43s8t40x3bk3g4q4g214ku7hpcpizte775wbk7',
                returnCode: 3551852783,
                node: 'm4jkk6q6bl9iwx58w8sliojuan6v94xwkz6y0kwbond4ni9ed9venogo3jxu8u00s0incb8i7yk0dii73w2c7b1u4ebbr41fj91nzfeimgqv893zgu1tckoou83txxtrtmdf6qkrt2qqt115no1sn2dj021pgp9z',
                user: 'wp3lintz3xptaqgmfz8exktsm3hiaffjt7neezlnta2mpqgl6tl9lj2oirb3s2nnumwrhg88sm3gr2xb8tehfuxgqd83j11b1y42fm7f825mqkblb6ee4prsoueonx8ydp49ts5eaxkfpqihbq3blbmi20bfc4sdac9g248fvaw1f0alr09yuuax2i09h5g9t2hnqmp7p1nsfgpjh76wfccym54c26k4jtrezqmmp6zs2rjabugmm6pb37a7u76',
                startAt: '2020-07-27 01:48:19',
                endAt: '2020-07-27 07:28:49',
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
                id: '24af86f1-ca66-463e-9ec3-225a479de7b4',
                tenantId: '85be8694-947e-4a9e-b932-5efd98d56480',
                tenantCode: 'nezh5ackie2seid8ofchjmycv28i6esvaah9otgg9rs7st7rva',
                systemId: 'wqaojkwxw9oapzhydimtymdflnp4e5lem04li',
                systemName: 'w02riw85thoa8o37z37o',
                executionId: '452508ad-9976-4bc0-9ae8-266fcf4f626c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 00:26:18',
                executionMonitoringStartAt: '2020-07-26 23:34:02',
                executionMonitoringEndAt: '2020-07-27 01:29:14',
                status: 'COMPLETED',
                name: '62lv5uwururgzbzjwwjh78h1wtvkejct2q2ln7v246ji1rvjayeggl8yit4m6ctij0mcfz0ujwf0zrgecblfrr6nm7f0yis9ekb7ud0ig9dxsamwgah0yoghfz86e8oxil5mb1ujyf2o1ntdsiwko0c6siowh3hd5xks6c8fcpcg1t330krv90sdug9f689u7o1aae608qfa107uykzbkq3jzro6aba6t5erdisrucr5j84g36gz7yq57439o1b',
                returnCode: 9241680202,
                node: 'ylod6pnvma8oyvkcwqezjao708ary4j5jj2ju7ucxapagsx3iacg309dz1i5jxjarlsx8ckj3jjw1e7aiixfbhl9cgzsuzeun4usqcs216g1xlt0gfkyk9nz8hmdbdlsucds7npqt0r74udcbmqvczmuydxbo8m8',
                user: 'nnq4bu7m605hxolp9fyga06qq2vzh3wm7mwlo1uqe77amzfs8a878ux723d3j9f092wfqchj9gya4zst5u6p7hsdbn6blaz85qwvbh50aqrchnals8go7onnjfaio34xio39796vrom7jchi962d4rxq80gdtknbip80vtsm7463cr49sl74em10oxczq9tlmu04w50vrtzh7sst5hd3monws4rxj2itl22yltrbuo9hwicziz9hcqhtqmsyxzn',
                startAt: '2020-07-27 13:47:11',
                endAt: '2020-07-27 07:13:05',
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
                id: '24af86f1-ca66-463e-9ec3-225a479de7b4',
                tenantId: '85be8694-947e-4a9e-b932-5efd98d56480',
                tenantCode: '2kqqtucyhix330trfu8pzgnhavdjmr52sd1nmmkikntykuyivt',
                systemId: 'a41580c4-2f5a-47ce-8ab1-6a7584b4f5f8',
                systemName: '3fjgcm2noz3i795nwo12',
                executionId: '755o16oenoqet33smujcbojz6u0p5tgqg63qu',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 10:51:20',
                executionMonitoringStartAt: '2020-07-26 23:53:48',
                executionMonitoringEndAt: '2020-07-27 11:24:08',
                status: 'COMPLETED',
                name: 'vdlbzohr35373p5ly6pkrx6s5bp42m4a0rb3y447zxqflxoi0w3n0kn4h6msh779wn6lulz1zg62ks9c5190t9qm54e40jn0a3ges39kot41vd6j0kzgcbovx8i5s91r1u6owqkby7ssbj98j0g0qa2f7yrhr9wcsvua8oc7m1lequg78x2bpa9zl4detegnoulzko0i46f2qo6iwe6j3lhb094lutlz6v310q27fz2xz2aevpx6vn24dso3m6r',
                returnCode: 4745748452,
                node: '1axa5d4r6sk7rqoh02dx1jgma8lr0zpg4zurevr63opnwgkc9q67r9heuo9ez9e1rte8f07se6o3t1ethqo212qpwsa6wtt1heslds6eefohxwwk3odtks9wk1ulvze33ega2oagjupa4o17a3758okgpg2t4vgu',
                user: 'c0hp94vwef6up5k1bhg5ilioxcgwyqsf6d7b2im9xoqo595s0rc3gt2j3c8znkh90ab3bztzwbqd2jsa9eadlkscjhqfhnwussw6ju5s2use1ihi5v4nzygj9x6xfvwcbalh6ww6um5qsob7b7wat9qx72hl0vgq9lfs6ohrczg8v7gwz75erztog8dbs73b0w8chw327j3uss928sn95dm1z0z0bgwd58oefk9oxudhzjz4qpyu7smzgzo95z1',
                startAt: '2020-07-27 10:06:22',
                endAt: '2020-07-27 07:13:25',
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
                id: '24af86f1-ca66-463e-9ec3-225a479de7b4',
                tenantId: '85be8694-947e-4a9e-b932-5efd98d56480',
                tenantCode: 'iazmplo9efnt7qy3184yfbeuxc4b3mckvsosuy3tuaaqgnq7r0c',
                systemId: 'a41580c4-2f5a-47ce-8ab1-6a7584b4f5f8',
                systemName: 'p2q8jjdh62ebomm460bh',
                executionId: '452508ad-9976-4bc0-9ae8-266fcf4f626c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 13:38:04',
                executionMonitoringStartAt: '2020-07-27 04:16:09',
                executionMonitoringEndAt: '2020-07-27 03:42:02',
                status: 'COMPLETED',
                name: '9wqo9adagpilkphrujon0t0kshq6wgj137clcghfs9kj8yf7v2zivtiblsjh9g2pp4hm0dvlchmk9i7li06te5temm9l59cnlco5t9nil9muqneihfnoq6tg8tm7zg30rgzng5q1ys3pgjrc3pc79ormehpho956etme4h9m6zyjxx01433mfzppxwcr6jqa53fwor8nyb9unjsgm3u7z4xh941wzr0a0t2yf4vhrkzhndkrzybfzemf2jwmj9f',
                returnCode: 2442394958,
                node: 'nbhzxx6ja25srt4fxjstf7yv9iiq9577b10g7ka2t93jkgsgff0g7o29vh1960g338l6igxxc38gog2ddfx91c8cqsg4ktkvnr0lpi28jh4jsizixc0eyrgmzj67ti9ysoa4sh778syb0xpv7zjhvt92dj4vke1a',
                user: 'nva4czw2r96xi282jubck0wgdl3in5yn2h9dpenkwla5hjyq601yopfzds3kxg1q0pa0671n23kuhnxax64ahzfdzwagpqfxfa7h9cywi2adqbj2zd8pv3wjbn9ooqm2t9iwx1gq8ap6ufjsylqe4lc0iy20e2ldqq5q5oae90cdjwni3aujhrmc68zk4p3l1fhi522budfx2n1n644nu29xc7xm1tf1uqzkgivaosdgnjiclvej3hkat584g93',
                startAt: '2020-07-26 23:38:50',
                endAt: '2020-07-27 18:16:00',
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
                id: '24af86f1-ca66-463e-9ec3-225a479de7b4',
                tenantId: '85be8694-947e-4a9e-b932-5efd98d56480',
                tenantCode: 'px3klprk5awz6ozrsguzrbev15yvd5mn23jxzgpk6fk36nuvlw',
                systemId: 'a41580c4-2f5a-47ce-8ab1-6a7584b4f5f8',
                systemName: '7wt07kaybjqw2wtvz5n6v',
                executionId: '452508ad-9976-4bc0-9ae8-266fcf4f626c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 22:29:29',
                executionMonitoringStartAt: '2020-07-27 13:22:25',
                executionMonitoringEndAt: '2020-07-26 19:02:21',
                status: 'CANCELLED',
                name: 's65qcbmk52iwnsf3x29ojcsn1zhoiyzp7c0lyjpdh8312ook5hvv934m44ueek1k9cxpbewqdsm170j2klsfhmnxtdks0dw46y7joaai2bntdef1lgbky2f7fpff4gqtkwhasy7wzw6827ey4lkb4ijex63c22yvz2uk0kjy3thlthnwp1jquwc1mo8dwqg35i7uyab76vli3j96bg56xuni5qkjidho0hczfy94rcjb8gek6tgn8id0hnm7vbh',
                returnCode: 2497289184,
                node: '97qydi3y5h1jdjo1a6t0z9e4s36e1bh6gtehosiye2n66pwfc5b0ua8j86qa80gc9weat3du71f7pe89130f2bqevk84sioo4rhyps2nzuoiy6v31hm7rbly0e1lw20h9pprocasigyrhab3ii7k21ky2eqxahv9',
                user: 'nmnviext856ohoeqhxv1984mn9ex4b4btq0s2a8xcosrd9k66c87ofumzj432b7h1i0s318nyn22bryfv1g7722tnlqm8200k4unsq9815vtwjiuxup5g9tldszzyi5cyrsraudmuf88ybhl0r6m1h7zm6f07ja0073i35akzmtfywe8n573rqxoa7y483joo3mpz5nz5d04y01dx3n7mgj7cvg5qc9hgvtbj5xw50gb1ujfrxzb5ttywaikck5',
                startAt: '2020-07-27 09:17:26',
                endAt: '2020-07-27 00:20:42',
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
                id: '24af86f1-ca66-463e-9ec3-225a479de7b4',
                tenantId: '85be8694-947e-4a9e-b932-5efd98d56480',
                tenantCode: 'mvzhvsqopa6ikl0s8jteoj64jc5o5a90n3gbysd6kn8ui7k4c8',
                systemId: 'a41580c4-2f5a-47ce-8ab1-6a7584b4f5f8',
                systemName: '9thg207u4hkno8eq2r7o',
                executionId: '452508ad-9976-4bc0-9ae8-266fcf4f626c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 21:35:01',
                executionMonitoringStartAt: '2020-07-27 09:08:12',
                executionMonitoringEndAt: '2020-07-27 07:56:41',
                status: 'ERROR',
                name: '5hx95wryc7qy9z5kbvjeqr6jtqz36adr298yzh54oq7cdoscgr5o2lbylrx43vogiorrhxmmo1h0thgnoee9zmyverip647x4eazif1tp2elpp5okoq6zzzc9ewiuv7b1o9khjmzkw3iu4xm0uoeoyu98h2gmbl337bb8dtf4jjvw08d16s32exqo5hibhyspvh5ckijuar2rr4w146rv0pv84x2bjjj83cn1uiyquqiy03w7soizh75gkefkvld',
                returnCode: 2809035257,
                node: 'hm3zjep0mtaiqmj9r47p57l299xfp4434fr0653q57tilyz6pcsudpq8zfpfu23p483jtir4ccnk6eckfi865ljhe4k4azgoa8l5ke2hh250iws1e5crfp1kdqnjul4th6uwyxn58oei28vdcg62ao0sx4o0f6hz',
                user: 'd1gvd1m5nh1ttzin9f0z64mxqrckcre3ce7futsdzdrxbaaffz5k953bx1g4l1sheaovruip95t4hvswb1ql6slzmcpcpfvmyvf0bb51q9jpw9q9x9b33kscq7swlg7jei6ajg7mkx3tx04db0nbevam0bn24i8k9n0jahd4bxs5tt6tpus9qwsq5umdqi25b96q6n0zccd95dmd87xyc35p9o1o41agifavpqwpxkt79g33azcwasr6ij34ma1',
                startAt: '2020-07-26 22:01:20',
                endAt: '2020-07-27 17:54:44',
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
                id: '24af86f1-ca66-463e-9ec3-225a479de7b4',
                tenantId: '85be8694-947e-4a9e-b932-5efd98d56480',
                tenantCode: '1mdzu87lnv9v7xygdyfzs5imlf8uec3a0ipud0au28s2sjtt3u',
                systemId: 'a41580c4-2f5a-47ce-8ab1-6a7584b4f5f8',
                systemName: '0k5ngbyy4c0r6c8zzxs6',
                executionId: '452508ad-9976-4bc0-9ae8-266fcf4f626c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 00:43:02',
                executionMonitoringStartAt: '2020-07-27 06:41:38',
                executionMonitoringEndAt: '2020-07-26 23:23:35',
                status: 'COMPLETED',
                name: 'sijp8maq21d4ros5j4ewf9o7kb3zm6ok02od39n12ef8kk31lu9nahcy39ily0f0mjab40chzvapphjc1c1mxuaafv50n3fsq7xgguniw6pht4e80fvnqtr4nmsousxq2or34f64gpgourhju28c4zy26di5lkui5g4w1u8g8ij5ri0r2fkjpv64pxnk75bwekirk668v6f4aokdolu7wob4vz1or2ssa7ku2yhwu2bekqh0sq3bp5ynbjvb5a1',
                returnCode: 56995727810,
                node: 'l85l4isv64t1z5nuzl0b2z6xjg93duct6ppc3mg07zn6u0pe7sxgt60x14afbo4xezi1gq3jftr7xa162t7wfqsfmet7kce9647gxvshy8lkkezguhg8kx80rzfqicwdbvyse5axsc690pb1ewnhqtr9cw7dq2gm',
                user: '01us2105oglvuxwagbt37rhksq97d2mp9rw4qld02r6mx22276cjkck22q6ox43c0n89o4s9oneql4c9thncmwdfluhkge21e5wgj29d5b860trzey760tda8lzab485swcwgle9bmize022jb0fefexzyvemv8lszwveavge3lmd0kl8f3hacm1jarudunvrs37beplvrkzp25d5o0bh57yawc6mvvwr1bcj1trmcnkb8qyjumtel1r7pw635z',
                startAt: '2020-07-27 08:26:24',
                endAt: '2020-07-27 10:24:01',
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
                id: '24af86f1-ca66-463e-9ec3-225a479de7b4',
                tenantId: '85be8694-947e-4a9e-b932-5efd98d56480',
                tenantCode: '2cbz4wnbrrko72b5tlqnj5d8mzt43jnj81hej4w6nxwjv9r0qp',
                systemId: 'a41580c4-2f5a-47ce-8ab1-6a7584b4f5f8',
                systemName: 'wjt9yu7rh73vc7t6lhou',
                executionId: '452508ad-9976-4bc0-9ae8-266fcf4f626c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 01:25:37',
                executionMonitoringStartAt: '2020-07-26 21:48:30',
                executionMonitoringEndAt: '2020-07-27 08:19:22',
                status: 'COMPLETED',
                name: 'i4pt3y4rniqom4prrf92fymiece956m0ijwl4okxbrgd9yqn4otwwpai0f8puvu00rdrpxw7u9ai3i8ssfzx4tw5hm9mi98x3eoxxsoojwo8grve1kfm426gf5irrwbowxlxfx1khuuhfgj9jzbayxk2nmuzhfnjgwzvse7j78ctqh6nvy8xy2tbflc5y5t7vi9dg352xf8pph0xg6rd7w2yssyzhtyu3duq4oi38ti81ekkufksltkqko9ywrf',
                returnCode: 7963816263,
                node: 'vd3ye89tbregn8u09buq5pv7z813xphxvuiqawlv1lm4jxdbdg2cbk3zcdzku765o5jwypcom00ongz7ubi6m9xcvcclimfs8ylocecy6mu2glocin8ycn0ysugwjaakn9zl23gwkkoqu34i5rzumoe8lemsrwe2e',
                user: 'to5ia0bp84b939je6ns0z32xtwo5k5twvpzjezbhi8u6jpkqgwsvddlrz68ij28y70eou6b3uauwxwo1i70vc9faszq0yaek4a6g90ucwttvfxugphy5xumvuq57j0lrfae1c0be671rx7a0cmatjvl90qsqh2eyfdmpolm2i0becmsi7ka03a7cgkwnfor32iokpu3ar60nouk7uxkzx8mwu35w9wepo84s4izr4u0142kxamjpl988fjkrdvi',
                startAt: '2020-07-27 14:11:28',
                endAt: '2020-07-27 07:43:17',
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
                id: '24af86f1-ca66-463e-9ec3-225a479de7b4',
                tenantId: '85be8694-947e-4a9e-b932-5efd98d56480',
                tenantCode: 'tt2qdnc4wvfgrb9zkqsmnf6ye2n8kwze356oevi7hwjoii56sr',
                systemId: 'a41580c4-2f5a-47ce-8ab1-6a7584b4f5f8',
                systemName: 'o3ywcvv85ypetgs2l6u3',
                executionId: '452508ad-9976-4bc0-9ae8-266fcf4f626c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 01:54:05',
                executionMonitoringStartAt: '2020-07-27 14:25:42',
                executionMonitoringEndAt: '2020-07-27 06:43:14',
                status: 'ERROR',
                name: '6d0tcmluqshkbt0a07ikp34go5lm5kixrqm2vl4lbcbql8q9bo5mfbsis7mb1dz3x7poi938r7xzgswh5roiz9oudacw8kub4a8osv1ya5cl78or1oc1aezt6snxnf5bu8zl6pzk3napp2ukce3wq1weehyw1tvomfsq96jx02bohvg6sulzgzn3l4dqqd5fp21mid1gl4x8jbfxgdtgzf5iccqhitu0q6nxe0mwm5gdf3xajxmjeb6isl43si8',
                returnCode: 6489012267,
                node: 'nyt56qxcwdvb9m719scxc3mwwrbk01ez3p6986vi4i2yto0gyxpb8u8b20zxpom7pkrn4nrvpfwec5mier1ae1clvxgrjp3avbl78xg6r5nx9zk0skl99kj172bvfl7e0mg9s3c1umoj8u5a1242ud7s9ihqkiau',
                user: 'co43b589fcfde0q0mdunu338y2z7d844w9q7554jcn8v6ras4sz2c69xdpgqcjmexwzamkb29b6h7jrkumc53spg1hgpnqypkhu728puit09mec5m08ucax74f2c6e8j43fo93d9s3v5geyffon66x8qjy0uanlbol3pws0lthulcn473ty7a2vawaqu74rztvubq32lz1gzfh08q0xkvfeasrdkng4oyacm06m5momtuvik7foymc2ew9c4hq5u',
                startAt: '2020-07-26 19:12:24',
                endAt: '2020-07-27 00:05:08',
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
                id: '24af86f1-ca66-463e-9ec3-225a479de7b4',
                tenantId: '85be8694-947e-4a9e-b932-5efd98d56480',
                tenantCode: '4db8utx5v7yj9iftp69n6iy1yhpxdwa8oclt96c32l7ngiv9q1',
                systemId: 'a41580c4-2f5a-47ce-8ab1-6a7584b4f5f8',
                systemName: '5m6o9i4hlqkr1jwqptrk',
                executionId: '452508ad-9976-4bc0-9ae8-266fcf4f626c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 18:43:51',
                executionMonitoringStartAt: '2020-07-27 18:00:57',
                executionMonitoringEndAt: '2020-07-27 14:42:46',
                status: 'COMPLETED',
                name: 'azyuvwrcycn09xgjawso95u3mgfhzhxn61v6koos42zo98do4aljp3gb25pqn078r0tyzgyxfgzk5p8szlgawbjggm18rhrp1jhtwkqofup0stw1jkkbhkqrd43m7rwounb6jpc176ewa3kvp79vpi6c0ho97sgwq63j2iv3g3qo9zky64quuozdm6io810hktvjkn65d1qpuu8f376jv7wg6960kbwgj4qtnv4d6apgn9qc5p9whca19pii8k9',
                returnCode: 100.10,
                node: '2lhv4994bv1ly9ehexwrhmt9f91k5e8gtjgi6mlkgmol7jp7femppo00h2ar9zpkcuv2gl8x4aq58kg88opkbee828j33britfh59dv84cj0fok4tble5utbrw5smw365o6ywi3rqnu45hbljae1zwnnff3ug14j',
                user: '12tavdzouzf2j47etrkwwcki8zsz630nj5et04s7s3fqw7uon1gz0gich68jx222goyjudaz29cthob8zmilwxo1y8s6on0ns65xgxj6oykj31jjg880dr11twlvtqi360v72yik78vcoa8y5i4lh8iqcu7hroknchfopf1805qqijcrqjjm8dosczzcrdwo3q924p98gxy1m53frsubgynaarsl9zro709fg2g3h0xk77edthnyzrj7nk43wy9',
                startAt: '2020-07-27 17:24:19',
                endAt: '2020-07-27 12:28:05',
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
                id: '24af86f1-ca66-463e-9ec3-225a479de7b4',
                tenantId: '85be8694-947e-4a9e-b932-5efd98d56480',
                tenantCode: 'u2ht3gw89jb6l85uom7h114ikexvh0zab5tw2rmv11qus82z9b',
                systemId: 'a41580c4-2f5a-47ce-8ab1-6a7584b4f5f8',
                systemName: 'wengcoifhti0v7ots1tl',
                executionId: '452508ad-9976-4bc0-9ae8-266fcf4f626c',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-27 02:55:29',
                executionMonitoringStartAt: '2020-07-27 03:51:24',
                executionMonitoringEndAt: '2020-07-26 23:20:11',
                status: 'ERROR',
                name: '2q7jqb13rb4o7zp8zv3rb8p21bgf1iyhf2wyvdiucaz95m3w5ch4tb0roc75iajt1qek6zidtn1gbc7at0m5i6d0wkfjwvt5of5ohxtuesxrzi0c67qz9ytu5exmnn7z2hgjgb6gtbmxbg8nknv9hhwgv4qij4iv23gx9ca0odrtxwd151zvib9eplbsmqnvboqc7ux3lbtcry0s2hd8s03h39b4u1r00xm3wek60q0mvx5hvh9x3i3z1of4z6m',
                returnCode: 3752329359,
                node: '44mawnex51phhpqpdr2q4c9gq9m4xfxhcnf6ay3hs0nxzks5085hq99uwmcgsg1kiinl4vn0nwl5uso6vax79yo5rg9sd0fwr011kqcsecx4d6jaj6sfi891phifnt4oj9pkp1y8z50dj1f88eoldd25zc5lou1a',
                user: 'hxirwokrkv8e73wiv53e25j4o3c5fb1tlazvq2m111rdzbmck6fp7cltus6jo201yox65h5o608nr2t6qm9xc3cmllmwme6d6s6h6s2fy66v5qkxpmhvudzkcfa6dtcu1ajhe9p872aungqutrtphjw6rj778th3e0mnl0qe2y5qx98zx6wmbhmhtodkyep11c82ts1vwn5342een12t2tzqx7drk9zmcsfx4ybf3ebrbihbgfc2qxy58kw315x',
                startAt: '2020-07-27 06:30:44',
                endAt: '2020-07-27 15:19:18',
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
                id: '24af86f1-ca66-463e-9ec3-225a479de7b4',
                tenantId: '85be8694-947e-4a9e-b932-5efd98d56480',
                tenantCode: 'upfgy1da086l77rnpv1u5qu1jhspwfhp8eek7lzmme5ym7c9ox',
                systemId: 'a41580c4-2f5a-47ce-8ab1-6a7584b4f5f8',
                systemName: '3ojq5s2gbz7mkv51m4xh',
                executionId: '452508ad-9976-4bc0-9ae8-266fcf4f626c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 03:28:35',
                executionMonitoringStartAt: '2020-07-27 08:54:13',
                executionMonitoringEndAt: '2020-07-27 02:12:23',
                status: 'XXXX',
                name: 'f7tkuii0aukm6ij0mhjea1jx0pae7qaqc02rcbpfvwke9l3ize8xk5scjxi832tgj00mqod1s8g8if988glws4z09sdimxstqagtufqe7r6pd2uclm1n2efd3nvz7t6vocbgwqqklwccc6m6pw10wynf9yymu629cird28l6w6gc1a0qsi2x97cd3fd75248tqkazqgvrybj3u84y8kxd245gmnwydo0vq1ce4ke4tl8urtvgxbv5gkx7ee308a',
                returnCode: 2349264688,
                node: 'y0ae68lxlwr4qfeer55l9ud92hl8dtnwld2f3ke7f2mw6fdluqd0yjn35r60ufsftvqr9pmvwyq62lp8cjkxw04m55shej9ij08z8hal441umte52ytkbt1age2cmh4bqhrwtyy2u2y9i1pq41rphwo8yvjuqf07',
                user: 't7e1a328ckj13ofoizu598dhh77flca451nkjywv0lhybfulunvmo0f7u81vxew30pep74jehyqj93bvmuub0ccecp2kv2hfca2uw3i97yhbp6eh47fvxd79ekj1jwor8xct7tnh1bit8jgcfnyj6lkw3vlig093n2ec5x5v7fkhkmm8gpcnrzro8oo65d7sgqyt9gu3rmz02eaz73nftgb3vskewata9o0myeikmw6mdyk1grps7jrpkygcgid',
                startAt: '2020-07-27 04:28:47',
                endAt: '2020-07-27 05:11:28',
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
                id: '24af86f1-ca66-463e-9ec3-225a479de7b4',
                tenantId: '85be8694-947e-4a9e-b932-5efd98d56480',
                tenantCode: 'aawrukst10nr8csbsga8fnzfyhy7d4i7vofvyn692h5w6f6ti3',
                systemId: 'a41580c4-2f5a-47ce-8ab1-6a7584b4f5f8',
                systemName: 'ry6hwxze455z1un76j6v',
                executionId: '452508ad-9976-4bc0-9ae8-266fcf4f626c',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-27 02:37:29',
                executionMonitoringEndAt: '2020-07-26 21:43:40',
                status: 'ERROR',
                name: 'm9qtdb17kvo6dcvttwdlbzlwb1my1k46n5ab1gbossrouhposaf50vfqkge1oqrhrirp9bjg22dg6k9brp3dzv6jkkrwvmu24sovvwas5p9fn4az0jyh7gdb0hqxxv75svpho2oqk4jk85cn3081lj9qz4itpbjhml0k45pqtxvu52j3q1rln77phq2my51ylpkrdofeb0g3odqwvl3rcryxfgmg27s8ib01v5ck6elkuflivy7y2sye4sn4l1t',
                returnCode: 5240079454,
                node: '3qjln8ljyv0m2yth9tq11aca68hpqwf7w4v32lz7w4fq7ktywxzgps5flz503ci0ppjtpr4qv0j2q2mj7solajtq1140pyzvqxqtczd498znjs2num0t2l4t120k44t5637qyqptx3u1tdedcj1q4myrcm4mr793',
                user: 'xohu2e3elcdidk6hoxum8mqyd47f9s84gj5kia3ay8kv7dm34tbu6chyfeccoq6wbdcz8xvrn95qw7nfdc8bemq0fiuug6p5bfg09fazvcafrk8b90b4wka198rbiipo0z1v2dzgdwrzsgmsfcephwyz63x8srgjmk16tajw9tow8vvuzki7ae4ghotm5ayhui2lqevj0a16zerf0dksgcv2ndq1732ufuiu2p5ruxp2uz7p2vqpjzp7hszxvzb',
                startAt: '2020-07-27 08:57:56',
                endAt: '2020-07-27 13:48:03',
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
                id: '24af86f1-ca66-463e-9ec3-225a479de7b4',
                tenantId: '85be8694-947e-4a9e-b932-5efd98d56480',
                tenantCode: 'iag7obet0ngpmb2igkd6lrw4mlfunnr37edpolwqvdr5fdqh3i',
                systemId: 'a41580c4-2f5a-47ce-8ab1-6a7584b4f5f8',
                systemName: 'qyzjueinpdveda9hadvo',
                executionId: '452508ad-9976-4bc0-9ae8-266fcf4f626c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 23:20:06',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-27 15:24:25',
                status: 'COMPLETED',
                name: '4fdiipc0nqw3mkeg9y53xnecgwsjkhps530sbblg96xhsvri2l1fkzviqeukbd6mbcq38l6gasdlyh250nbv7om0pox6wfqbtzqmv40efjhcihcqz8avahxidbce974jjbhdqlgbdwxfc6g45vdgw50glkhutjetlk5rbvzp3gts6d938xj6bgmzfrm1grm9uraepjn0utbablko673eu2elce60lh4tenfrarkm1jop23bydd3yhuo905tk59y',
                returnCode: 8283878580,
                node: '7vv923gksksd7hcksuwmgsez8gu6736ar75rngkjx4a8zymxs0z7qw37i28dlo2eb46uf64mehbd34k6pq6sqwb0fkf4xr11uldtfxrsdo69id07sbngtcbmx9512n09o2qv12e17ysuy8t88yf8t4c55irch4le',
                user: '4eywc9yg5x7vjnnlfk0qkvlthwfy87xehd455f8y07yjzx1nisu2v37w0wvzb18yu0evtkgeyxk6qxkvc9atsgu86ppuwr3qs31xcky05h3cyxgkrn5zbnjh4bj7xqea5jwvzzh07egyn4sdmad9z8sz19m0tf88o9affns9k2yi73at3ibm74al172f3j54oc1zq9bi7icbelpgjk33bsxjp6qae5c7s16m17dpx7wtyqfsmzqy63tnah4q50f',
                startAt: '2020-07-26 22:34:09',
                endAt: '2020-07-27 16:06:33',
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
                id: '24af86f1-ca66-463e-9ec3-225a479de7b4',
                tenantId: '85be8694-947e-4a9e-b932-5efd98d56480',
                tenantCode: 'i39rprddjtgcec2vyffwq6kg6cantw3qz8ornoo71hvt7ew9nt',
                systemId: 'a41580c4-2f5a-47ce-8ab1-6a7584b4f5f8',
                systemName: 'xycvdcqa9luwp6bou76r',
                executionId: '452508ad-9976-4bc0-9ae8-266fcf4f626c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 17:59:42',
                executionMonitoringStartAt: '2020-07-27 12:31:16',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'CANCELLED',
                name: 'qjbak00ishv1c406hju16xbyt8yjpjlftbo8av9x0zc2ni10uxzdcdz4tul14tpgblh9p0g8oqz1achkth6qdtsk4uyuvn4sxpsc47ammffoayibvxwd61jx80plbnvs8wy0gqmlhyap4hxowkjwjtwzg9yr4s67m8sl05mibafcylmxx117sequtdojdz0ode8geuvx1tucirrb3ykupzuwv63davuw91usedswolnxhohr6v5315moeuf5aum',
                returnCode: 6708179154,
                node: 'm7ot1u6seurd4c2izaujwtzd4sfs4kbxr736tfl1hr0tfypxcbfcr2hr7l53wgv55a6ax53s0luhjw99tgma74uwr4sh3osm1e2v7u4gh0tbsaidxdib36uf7deafghdebh7ol0aixuav4tgqr9pi68z2mfu4us7',
                user: 'a4epwf0dbf6uvwj2l2ocyjnlki3u3qucxb69rx28uubmapnecfimep1xhnwd61qkai2bkz8tpjy8l48mlnmm2sggw2d8ja62uufg3ir5mv23nmniuxkx60o0wxtrlth0oxn91ki84nxg7b74681mvq9n6ztvswe3hp9t06fim30q31ni6rjnozppfymiyr05lcrvx2m5k0ncarzq8jvf8xqu68iqxrijfqj9ahlc47do029ypwplfjusaozsw96',
                startAt: '2020-07-27 16:48:30',
                endAt: '2020-07-27 01:17:26',
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
                id: '24af86f1-ca66-463e-9ec3-225a479de7b4',
                tenantId: '85be8694-947e-4a9e-b932-5efd98d56480',
                tenantCode: 'efrop2st4k8mm5ninlv700o0rkkiv1zaqhwojl2te55qczel06',
                systemId: 'a41580c4-2f5a-47ce-8ab1-6a7584b4f5f8',
                systemName: 'j73rnes10psimig0l6oy',
                executionId: '452508ad-9976-4bc0-9ae8-266fcf4f626c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 09:07:54',
                executionMonitoringStartAt: '2020-07-27 10:45:38',
                executionMonitoringEndAt: '2020-07-27 02:12:09',
                status: 'ERROR',
                name: 'w80oh5i227xege5mrkcyaf6c7th2w4jcsd7garbxtb2u3ayd5xye22mk0nyfh3w147lj1eui03v5ewhg6m96mku09hwtm16shpcl04zmy844q0b4dtv13r8f3ptljheksvak0zu1jbp9iutlihccdbo6fsljf95brz0dljn83417psahbh1zfcz8u5v2piky5ha2g3pda3jv5lza6rv1ncsbfx8vl6b6xe9de2iplr65zdo1j9x7eyo7x007jmz',
                returnCode: 5436180616,
                node: 'h4p3dkjs1btfjhiau03y7n0slrcnh02pa0am48p77974djnf7rbdg5yhzuspz11srxw9lxn0y8nueumk45ysfjoqzxv0aq4o2380vaxb4mwpo5kcw6c7ikfvpabv8ormp6lnqv6b4j5k580blf2i7emxl18ubvdx',
                user: 'h60jt4hj92f7s3qyayophww00z2c24fi8lntm8wkn14z2sg77s48tgznbhw21cwoftzu9kdi6g6ijkx9zw0x0z78b5ys45vvrlxc520oyb4p73bwojw4xasu9l0ja85ezcyy6jfi7829ggs8g5wpg77eahita5afz1uznerncocevykox2d29hgjmjpiv0u4j4cdgs3dc4h45ikcdgk6uzecwpvagtjb98ngk7yf3tavgajmypbrhws3cdwudrz',
                startAt: 'XXXXXXXX',
                endAt: '2020-07-27 07:27:49',
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
                id: '24af86f1-ca66-463e-9ec3-225a479de7b4',
                tenantId: '85be8694-947e-4a9e-b932-5efd98d56480',
                tenantCode: 'h0f7zjmbedw3wqx5enc3mqkygf1c3oyralnyjdd81pzq4mjpmo',
                systemId: 'a41580c4-2f5a-47ce-8ab1-6a7584b4f5f8',
                systemName: 'lm9ej4rq63uk2em17mo6',
                executionId: '452508ad-9976-4bc0-9ae8-266fcf4f626c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 17:18:12',
                executionMonitoringStartAt: '2020-07-27 10:56:36',
                executionMonitoringEndAt: '2020-07-27 08:09:30',
                status: 'CANCELLED',
                name: 'cabnkp3e70zg5gto1g770gjr7y8d6lvxrypetfgtksnn12075y14aerfizfvnya3q4248nblwivqh4jizlv9tvqw2cnz12s55059uecjrngikix4qbgkrqhtk1brjg6o8ptpa7jy3pg3996ldzl2xz3wg3lo2mxrtj1swewkc19p78vibs1jmjdm9o9domqgv1j1co1usbwuz967cob5yfu8vb0uv23w583t8juireehtfzcm4ek41lgdw0bayu',
                returnCode: 2383326041,
                node: 'flwr8jvf6ctkif1ozqnay7qtpdn2xytdekfg6mcpmafumw2q3g7rewv1noq1wimivlbzdedpld21rlw82l8f0e51v3fubu3ckctj7wd9g7dg16fd7o5voooo5yvr0g78c1tnpzrbouj3nfd5cs8rl1u5nzhrabcf',
                user: 'a48rodi5itiz6pssxfo15w7gymg7nb7ergot0ymy1sj79429e6x3baudttbfxawq0hr4dcaicddckx1cyqt3mo7w8p9oa5fccfun3j9yz2tzsrnplj0m909vk40cyszdjmuf7ie4n0loikwdvkfeetuclohf0rd9x7td15s4vuuktwlax9qa281iumgmei5mklvrvbwk8jklw100whkpt45a4hz7juxoh234ldvkxbya6mruim2rcgs8384yezn',
                startAt: '2020-07-27 13:02:20',
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
                id: '24af86f1-ca66-463e-9ec3-225a479de7b4',
                tenantId: '85be8694-947e-4a9e-b932-5efd98d56480',
                tenantCode: '9fvgiug64dp4mnxgyjjdzhznzsmhpw9h270ffr7zpwghgcxswt',
                systemId: 'a41580c4-2f5a-47ce-8ab1-6a7584b4f5f8',
                systemName: 'x6l3q89dcvn41da14xow',
                executionId: '452508ad-9976-4bc0-9ae8-266fcf4f626c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 00:05:14',
                executionMonitoringStartAt: '2020-07-26 20:57:45',
                executionMonitoringEndAt: '2020-07-27 14:59:07',
                status: 'CANCELLED',
                name: 'oji48q2dfqh6kn5hjlc0yzyxws7rnjv9c0butd175suo8gy5udrtf2xx7d3zq04xcfyjmpwr1il04wpz7go2ks3z92o0u296skxypei8xa4sznpk3sf7kj2lblgi0xittk8thx7dmg7122gpslv3agaaoskiwmc7qmp1bspi5duu6bydry11s6s4xas7htwzirylmpgrxdvugdv61qvsmbnw84rvnzlp3fv81csgap8tjcf07m6te24zizjgwf5',
                returnCode: 5286773718,
                node: '95v4ucy7fxuhnvz3yp6t1g35jgtd2bolcov4q5vycwp4pnvd7vonb9zspncsfnpys2je0h1eys3jpky60z2g4kqqmw2esrfo89rns6ep5vfrq08p51d4d9cwetymft3pa8do2no20l3b2j40nh9lyfxj8roq35cu',
                user: '22evsfm00xnkmry0c2as70i8vcbtpm5t6ywbhywrj7sultmnzkneazq81uuqsq396in1oi4nvi2gc737rmuk0ubgwuve2vee1jnmpxqerzr5nml8gml5l4xh7wl67ca5iuv98yheuhqjyewx8vd0xhzdaew2kuje8jr7n3mj84yeqqk7jzrz6rkf0tfy8ssvocnk9h9b94wiwl4d55d66ov76dcujw5sytrafnxx6k1jr1znuea0taiq34s5gcg',
                startAt: '2020-07-27 12:14:13',
                endAt: '2020-07-27 18:31:53',
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
                        value   : '00000000-0000-0000-0000-000000000000'
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
                        value   : '24af86f1-ca66-463e-9ec3-225a479de7b4'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '24af86f1-ca66-463e-9ec3-225a479de7b4'));
    });

    test(`/REST:GET bplus-it-sappi/job-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-detail/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/job-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-detail/24af86f1-ca66-463e-9ec3-225a479de7b4')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '24af86f1-ca66-463e-9ec3-225a479de7b4'));
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
                
                id: '0bb65c60-cc06-4eb4-844f-b5e4173ebb80',
                tenantId: '388ccd47-4684-4c71-8836-f453f5f7fd91',
                tenantCode: '5cx8i9e3gop092mwkr04zt51gr69rfb37yuu5zxtgp0a3fefib',
                systemId: '5280b0f1-1deb-4c20-bd3e-acd282743e5a',
                systemName: 'wnia25bwycjhcxxhobuv',
                executionId: 'ad900457-31f5-404f-add3-d243908befab',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 07:23:25',
                executionMonitoringStartAt: '2020-07-27 06:43:26',
                executionMonitoringEndAt: '2020-07-27 07:15:20',
                status: 'CANCELLED',
                name: 'c2136dojv2mvu3abwh0i3f6mfi1d1s7emdl3njlydrgb3y7820vgqy6zndc7mby455w29f9weakizxg73s2p2w4oa905374zufne2soowi3g2bllcnsgf0wprvkc5a4pzhth3acte8x8sydc9hzui7eohsvlgv6wxwzbudl5rzstody4wsnb9gcwsfy5lfitk2zr2lv6h3vj6zd54ny7w8vpwoidu5jv821641hgx7gdsyhvjd125qzo2joyee3',
                returnCode: 9671412743,
                node: '62xu957yzxrabe9ufhyed3mhzk7sdz69lo79d42y1fhetpwh0zvhacuxzoi93dk0dbhj1rwqy5uiihwou99s135vi9n4dvn30uz948fwxgcqfi52ifa3aw9i6wkzw01updme1ckhnplxst6pop612tyvca8qi5y9',
                user: 'dk4d50w4fgkr7m56ldcln9t1x7x75ede24uez2shcoy19lzk2ngrgytg70hqljz5wkdnen4tjtrhgsgv5qbi88nxt546kfd74w2e5rc267yb98kxvg24orpo842o4x18qdgubwmoz95v4dhg6clr81t6xbb69rntd0qs1srfzudvs1ie0xymhv2ehsg40dzqdudfpw5ifcjigmq62q79uhptggze07ki48gv0ciz7qhaooohz2839igcqm2g7ra',
                startAt: '2020-07-26 21:25:53',
                endAt: '2020-07-27 13:32:08',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/job-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '24af86f1-ca66-463e-9ec3-225a479de7b4',
                tenantId: '85be8694-947e-4a9e-b932-5efd98d56480',
                tenantCode: '00x6vios1nnpd2tml0w7qnxymxhgekcc0s9q3lllwga2345ypi',
                systemId: 'a41580c4-2f5a-47ce-8ab1-6a7584b4f5f8',
                systemName: '2roz8pizcwljro5j4bev',
                executionId: '452508ad-9976-4bc0-9ae8-266fcf4f626c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 22:21:34',
                executionMonitoringStartAt: '2020-07-27 15:25:32',
                executionMonitoringEndAt: '2020-07-27 06:31:25',
                status: 'ERROR',
                name: '54lv278505bnvzrz6jlq9v5mr1k8ynfnszjcajk2zvytvbw1j6vupl1yn4tomblq253bx6tj4syennkb044vn31avagzjkyzoqr6li5bjmvqc7b56d7484ayya6lv4x5cgmkotc4x1tc14xgnm3rberbx39dhb44wgkyi0tdh160b5cd82ma1ltk32haq0wha69qhfadvann1pxm66eh1etfa1iyi9g92eqxprvgrfb095iykykw3iq9ghrgiea',
                returnCode: 7119305104,
                node: 'gsqxrgrorshmp441mfrshdzkas49ttq82puryxgm0y16ksh1nbfhundjiw00k3rf7v8vxb9zd0613m5ag84et18x9g06kamb3toovmnorxzvwsd4a7ai1kx01nbtv4e6nr442kbcg5pszvi0i3gxdwt6h74v6vft',
                user: '5e5mt8wy7hn58t7npx51jagbbjsmw7p444nqajp6hg5y3jk4vqx8jnf1e07ue42qt0cakhy0cdkicuwhc2nwlcohmvmgjz0oroa5gsr0mufa8zib3b9pkgsk0uirm2y0on30d8moat2pvfutv9ef2abqjdavyupeelr5e3hbcb0vgw110gs0wfawv1nz1kl6p0aycvggytzzvgco7240sctc2mmadjb4xdazg344n4uudfwkiersitv1c72ylk2',
                startAt: '2020-07-27 13:24:40',
                endAt: '2020-07-27 18:31:53',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '24af86f1-ca66-463e-9ec3-225a479de7b4'));
    });

    test(`/REST:DELETE bplus-it-sappi/job-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-detail/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/job-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-detail/24af86f1-ca66-463e-9ec3-225a479de7b4')
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
                        id: 'b7248fe9-2b74-4d81-aeca-1ad0aee78fc4',
                        tenantId: '85be8694-947e-4a9e-b932-5efd98d56480',
                        tenantCode: 'izw5jfv7fnvplwga0shokza9u7f7n6vpb0noykgbbwsv4u659e',
                        systemId: 'a41580c4-2f5a-47ce-8ab1-6a7584b4f5f8',
                        systemName: '55tyyk5n2syycz9bculb',
                        executionId: '452508ad-9976-4bc0-9ae8-266fcf4f626c',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-27 04:11:09',
                        executionMonitoringStartAt: '2020-07-27 03:12:21',
                        executionMonitoringEndAt: '2020-07-26 19:42:46',
                        status: 'COMPLETED',
                        name: 'gk8q1cd49nwp3cha75f9da28eo55tjyuwzmo9bnfz35dw4lmtrqb0u6r86eo4zt7tvixyz9bjishue9azhmviksn8aplm7nniuwy6gl36dyo4jm7owyxq5v6png9ww4niouzxaih2l8g9a5zbl8m2jdnesp7yl2t24uwd8gmurvn5hlxd4yma253c3u21qz46u1pyf0ab7gcm9dd03ho0xnz71kqith2nxe7cw9x4gmdkzh9llco9m63xy75ln1',
                        returnCode: 6892590715,
                        node: '6af4tjsf7ph410y2dyjup2jnek7xtr512r6yugw5zesjwc8v7b7smq80m610quili5gbxncgovf2zgjuaj6e02zgxiq7xj0n94yvru9t6151iab104b8r0ob85z9khn0yqkrhlry4dg9dl1236eip40scbdpi9rc',
                        user: 'pm878p84e2wvlgm0kxvlewn7j0tnro8w9zx61kx0javnhs1l21a890xif2d75qjfs69oecfccisf8vged928j6ftcurd1wpvjzqikubm9x0siosglw16z5snsm3lmqramirf4peqot1u97pol443n44anw3f0pyi0hk7ttx2l0itb5b4oks2ot96gijwoehkh19mpr16aa8cc9wjpbfl9a2ok5qsqqe5bncuximtxvehqtroz4nxj0dfbn0xu7l',
                        startAt: '2020-07-27 07:25:53',
                        endAt: '2020-07-27 12:18:14',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateJobDetail).toHaveProperty('id', 'b7248fe9-2b74-4d81-aeca-1ad0aee78fc4');
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
                            value   : '24af86f1-ca66-463e-9ec3-225a479de7b4'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobDetail.id).toStrictEqual('24af86f1-ca66-463e-9ec3-225a479de7b4');
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
                    id: '24af86f1-ca66-463e-9ec3-225a479de7b4'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobDetailById.id).toStrictEqual('24af86f1-ca66-463e-9ec3-225a479de7b4');
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
                        
                        id: '8d0bf8bf-5077-42cd-b2b0-1a1fe9b589bd',
                        tenantId: 'bcc492cc-4996-4398-ad2c-ed001610513f',
                        tenantCode: 'a3vtt8ul3o99wt2mcuqelbf7earnch33k2kwwotxtvbs4kpq17',
                        systemId: '809b9fdc-2103-40d3-a4ad-8298c0ca3430',
                        systemName: 'g8wlmqqhblajde36fkxb',
                        executionId: '4038fbbe-1294-413d-8466-fa23d1b18c0e',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-26 21:04:20',
                        executionMonitoringStartAt: '2020-07-27 02:12:28',
                        executionMonitoringEndAt: '2020-07-27 09:31:33',
                        status: 'COMPLETED',
                        name: '6isimr9h87sj0iobwqqu8rk3kb3uh20oa3pi8ko3x4ehxy8xq77gcob66e0krr8ajnwrk0zw683mg8tiniqrfnsy7w8v7lwfnaav7wh94kjcqk6fjx5ij1k2u19aqzojom2ukp8cfnjqas4amq9ogw98vlctazblg53e9gn7p7ui9lee1szu52mpe1kis6rppoyak3tmvpa7e63yd2zfo3wnumu29dex7bxuxobl5hf2brvk16lmizsstc8i4ke',
                        returnCode: 6726448969,
                        node: 'okefer8dxklj47hkgrx0emuloq3jrqlj8rd3ry7oezutl8h0waukipvpymu7ycwu6cm60tw76amt0s8vrvg0pettfs42w9anpcd5fd5aktfyn9eu080nd777yji46v5org1sf5gurfj8n7s19a4pjxidf48o8rf7',
                        user: 'x8yk8rj2yoviar9gg0r2yz0ukryi5ydl1m8af3iq713bvb9ui6wtv0ma2908j4ph5eodom2jje3el6k3yech3e6bp721cycqawn8jhk6geut9lscbzwhofoivzkv2s2x086u2c41ub6hlhhomewjtzu1c6j75008d34xu6qq7nz27yc7ymk4zlh9bd7g2dgwfo4qgj740w0etao1kjtmp5n6wj5l3533lzhddvtm8005a1pg3ua7kv6meo7zf9j',
                        startAt: '2020-07-27 14:39:58',
                        endAt: '2020-07-27 06:31:03',
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
                        
                        id: '24af86f1-ca66-463e-9ec3-225a479de7b4',
                        tenantId: '85be8694-947e-4a9e-b932-5efd98d56480',
                        tenantCode: 'iu0s5vtykpdplyo5sizak4qk5fpikdv7ktxor00mnb551jud9r',
                        systemId: 'a41580c4-2f5a-47ce-8ab1-6a7584b4f5f8',
                        systemName: 'okq5kvhe79la3xbyt1jc',
                        executionId: '452508ad-9976-4bc0-9ae8-266fcf4f626c',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-26 19:22:44',
                        executionMonitoringStartAt: '2020-07-26 19:18:39',
                        executionMonitoringEndAt: '2020-07-27 10:09:31',
                        status: 'ERROR',
                        name: 'tne99ewvmtie3ytfdjp9l4kqdbvehowrbtht4uw5o8jog0bxgitjs5m9a1hh74uo9tqgkmytukpenj6lebka2281d89v4dosigmedrgu1lx2qyynahuthixy0mq5oxa0e6su144fxc5mg3919z62tif9pwxj7r7e5ff48q4wvj3swuew8whj0u7e5adqzfz7tjqurj2yzoiv36xl5rjt87aywg08i53nth2jd0m0jt10jl8lfmfwfbtxonan0yq',
                        returnCode: 9734264139,
                        node: 'pzxjqole2wg0w7rnsul3lp7g0jqyh7vkydpkbbvfg851tsozjjs1ia6qsnnwijqd0677f01cx4okps5v1cboriuy8sdwielk598mwn6eer2tije9y70xy6c7ou15cex0szqx9y69iklmn7wit07pwrg2d6gwe00w',
                        user: 'pamtumyug2v6yjmhiwzl43jlfvo0ezw1qlzf4lgeeo7u7a3qawlk9xp09sar76w6czeags5cik0snbppgzacgohhnkqii7vm7xiz2j6b7py7n5imb9lmsfjiml8nw63e5ag2doxtfyl22fiw086eojzq268icj8tjlhhphjyrrwk5f9dik9ysetqfiyt2cgryphpf42z8qhbezljjyeebfzegru5e4vifq9h3s3ufl0cde3sd54kk1vgjapdpzm',
                        startAt: '2020-07-27 03:12:33',
                        endAt: '2020-07-27 10:23:50',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateJobDetail.id).toStrictEqual('24af86f1-ca66-463e-9ec3-225a479de7b4');
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
                    id: '24af86f1-ca66-463e-9ec3-225a479de7b4'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteJobDetailById.id).toStrictEqual('24af86f1-ca66-463e-9ec3-225a479de7b4');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});