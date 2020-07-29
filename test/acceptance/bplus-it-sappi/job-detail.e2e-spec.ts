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
                tenantId: '81611d4d-e85b-4ae3-9405-fab0b18c73f5',
                tenantCode: '7cbk1mwgfg02h2trosucghu301r57v33hxmt13130qyy9d9xof',
                systemId: '648cfca8-ad0f-4226-8784-294418508a88',
                systemName: 'pw43t38h45qhnigavp9x',
                executionId: '104e97fd-31e6-4673-9382-1b374502a2ed',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 17:49:21',
                executionMonitoringStartAt: '2020-07-29 03:12:20',
                executionMonitoringEndAt: '2020-07-28 22:11:03',
                status: 'COMPLETED',
                name: 'cvba1nxqerqxcx2f6wc4id44l8wyxssgyudxb829xunvacm81vf1e5qfpstv5wuklh5oksyhibkeeepcuky6pc2mirx8fwizzty1o40ukg051plp42vgv6vcty5fyh7qiou36bajsh6ilupcd2j25k7ampr1dy69ljtix8992hrrtwdzwk8d26kjmqy1jfedig0rd891yfifzlakgq4k62kglkv6c6ddtzn3zjdlbnsnacnyvbdot54jh0spxdr',
                returnCode: 4709777926,
                node: 'fmh9pdv62ok7e7yr2poue5t4fsh6swobdb3387h4vy2rfn94aswyro0sgllq2wdpsux82pvlqch20kr9dp506fvuij0pbqqp9jdygq8twyhbrr7vx44asn8f8urr1wq8aika4iqi0j3j4kl2n7zxzwvj97r10slt',
                user: 'c5xg66226x6ca6ca9s8viywq0emilctmcxb035hmv0urih0qljdy4pvldyruxywqfrdzmnesmgr6bbrsetcqn1zooefw2ia30fltqomvqhak6syjszs2vhn4yi848p7x3w6w6wksywd2tggz5kz88ju96leksn0mx25f4c5a9hy0ik542tzmvs6kwfppk18i7medlk4f99jl6ghlbi61927y5gmxr9uz7986sd9rgdmlp38irvd7tko7zlv7uif',
                startAt: '2020-07-28 18:52:56',
                endAt: '2020-07-28 21:58:49',
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
                
                tenantId: '81611d4d-e85b-4ae3-9405-fab0b18c73f5',
                tenantCode: 'idwtohf9bdwth3fuqzo4mz9151ii3pr013gc4jew51z07ykc8v',
                systemId: '648cfca8-ad0f-4226-8784-294418508a88',
                systemName: 'amoppr5y8phsajx9plgm',
                executionId: '104e97fd-31e6-4673-9382-1b374502a2ed',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 02:09:41',
                executionMonitoringStartAt: '2020-07-29 04:28:57',
                executionMonitoringEndAt: '2020-07-29 15:39:54',
                status: 'COMPLETED',
                name: '1rjyaqhj9oov5s4rp8p94h4nwfavi53wvoy3kxc9simuww5ah5wi4ofaujjt3esj80wjkd9fxjx06q556speucfeu1yhqmxhx48ue8y9rbqatla8cc5k4bp9wpwualcv5aesv8b8wl19rmvx7p67az21me403rn4sha3lrb2x1jywgs3b862h22g9d46bbhrqxhzfigsqun96ey0jhdk4pk6d4vibo1eo1ocjfr0ec8u2b7chgaiui47bx84imo',
                returnCode: 1763591129,
                node: 'giab7ta3e4mqkrexhh76dj8w6nvisqtue1fnv3756gcsjadvgl547siuu42n9lem1olnj66vbyx0jn4e3mt84ngdnul31jnni7k6ccmjpn5rd7b76iger5xe5zarmtgocgvj2h8u7oqrz8ne1sug2fgedj0plofp',
                user: 'y63bdvxhgwmh3fo8avlfw1o7qco3a20vryasxljrsx4ds2zt7xdx510dv2dq2e64k5g5jbmxdxm2nap0xm9vszk45hkz5mt8nm36x6jf0d4mfzhonwutg1bt8rs6mgev2iqmxeb94yy9g6e9u723ghlt8luc4xzzoysze6xuf3glt31irnr3yj0jlmeeaa5h7rrkjg9fgy84shlw4tqlu23halpzm2ckyykzyn43xborkpgjvoh72l7e3zeufog',
                startAt: '2020-07-29 08:20:17',
                endAt: '2020-07-29 00:32:17',
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
                id: '2412f3ed-d085-4c94-b97e-35a7b50cc6d4',
                tenantId: null,
                tenantCode: 'cdxz8co8yoorhi5uhnc234yurtcdedss59y61vv4tyrttyxgdy',
                systemId: '648cfca8-ad0f-4226-8784-294418508a88',
                systemName: 't4r0gui1rhj1ibz96820',
                executionId: '104e97fd-31e6-4673-9382-1b374502a2ed',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 22:40:57',
                executionMonitoringStartAt: '2020-07-29 00:10:08',
                executionMonitoringEndAt: '2020-07-29 04:14:54',
                status: 'CANCELLED',
                name: 'pbt2ruv69vjemudpv6jsjfm2wtfe29zl63ipl2twac1wyquda6lf96owh1jg45cp31qwew1zq9730x68jxh2igpy7edn6jm0bjg342kst0ige7y6bvkl8v4wu2eyswvi2se3np53yr93usg5lyomw85eictosyf8q5cibuatqcwii7e0f36l9fgrf7k9qh0i72ixo7rxe6ypm2hfjlfq5mqnzgtzhnzokrh06eft2xjhruhl037krepcloixfhk',
                returnCode: 8073657337,
                node: '1h7tkxtldan20xuyzrgo8ygubatuni860eoli85bj88gh2vzywij8fb1vh0pdv1mrd2vkas6n8pxmrifxg4khlows1i95yhemwww293lqq8tzk7wwh5hgqnhgou8rhsdpg1t9l2z4dvd2k9lzrj59070ck044oma',
                user: 'of5vginje28ms7i5ks411ms0xc3fr7dzd44fydyrr851kh01eq5vc85ic9jjmqi1kt2u7hyq0ay3o92w1siqgmxq1zxjsuibdqir8ikbwshno4oddz0c8jcyvdk3mp3sd8wvxenzus6ky8wrktn9t3ydo8rfd9gamqwr23mseg8oq9z9quoxs1lr994531v4v8mn3cypl1odk9y7hagqjbxdg51bblduj4sbewxnzluo2qnw10z6d2vtsb0to9z',
                startAt: '2020-07-29 16:10:27',
                endAt: '2020-07-29 05:08:24',
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
                id: '2412f3ed-d085-4c94-b97e-35a7b50cc6d4',
                
                tenantCode: '37a8dmsxxpce2ys3fooavpssa74kii53h78wyxd42b0w8vvyr4',
                systemId: '648cfca8-ad0f-4226-8784-294418508a88',
                systemName: 'cb391sa80jql172igtx3',
                executionId: '104e97fd-31e6-4673-9382-1b374502a2ed',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 17:41:25',
                executionMonitoringStartAt: '2020-07-29 02:02:13',
                executionMonitoringEndAt: '2020-07-28 19:15:38',
                status: 'CANCELLED',
                name: '2v3ovyoeylb75uzfhnzgkdjp5puguo2re74rod1unmdqnjeouioap8ob5d6430amhfe074sh2opain0sfbub55tuzawnkxgiosxjn66q6u0c3guyj812vbyioykmydl11g80c1xcrltidwf7fzukcmg7buu4zgc1j1a1dt6hm13bgdsa5qlskg65ztzq09ze0sc2jrlqgnfwz4s08t0sc89x17n5s6r2q4d4t1anmno755u6nccxyas7hnyzj54',
                returnCode: 4933671646,
                node: 'r1m6jelultaztecxqeabfcugjhj7r4uyahdbfykq5z1b3trkatr1rur9qb7loguprp74j67itkj4aa71hg9oiajz9bijn9edo0g1vzt2u9r314i715szbag0tjontlmgo14hgxjdkywozpkdnkctlgch0m3yv8zl',
                user: 'jb4t4jdlls6vgtwyu66571jgvkj80b6eu0abfzsucgofb59w49wa2c1m48278k61r4go3a7kkjx4r34a8aoeqt5j00jjcxh3fx3pmck84bepv7kml9zx9w2tbbkuz1pwhsig1cp1sap5dsccmhceo0192ek8c8bvypg7vs91r19mxvkkxttlf7li5u2a8qs4o17emcvh8xpj86v1f8nc4nuz589cibxy5wtbdpc09e9antjp1ojkrema4tdxfrt',
                startAt: '2020-07-29 15:48:21',
                endAt: '2020-07-29 07:42:32',
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
                id: '2412f3ed-d085-4c94-b97e-35a7b50cc6d4',
                tenantId: '81611d4d-e85b-4ae3-9405-fab0b18c73f5',
                tenantCode: null,
                systemId: '648cfca8-ad0f-4226-8784-294418508a88',
                systemName: 'f6zttnu8uvv01u7molcl',
                executionId: '104e97fd-31e6-4673-9382-1b374502a2ed',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 10:28:35',
                executionMonitoringStartAt: '2020-07-29 11:53:48',
                executionMonitoringEndAt: '2020-07-29 14:23:37',
                status: 'COMPLETED',
                name: 'gl4nh0ym6xvrwcrllwv3bifsr45nhkasno62hhppkg95bkm074uflpi8h0yhybejnda0flbphhwvul1bgbchuutvpcox5gmu1w6r5ob3kzxmsnizhdf8mcakncpyku3oo38fr3u1cpjrqx0m7xf8w6poszdncgbnr79id6vhmgscmjlnhmstjrftjyhxiy7jqd9gzsmnixopzbwkvlj5v0g6gmtuliaqq9xa9w8w2ccnxglivq8dp10n6jb658r',
                returnCode: 3934895972,
                node: 'epcdthgs6tpxb7p1wjc06jnibk0a2sq1qzenzymkuhb3mr1g0noe4j5rcsm9rwliddt6n5ful95t7fyyo7u9clrgp61q1dsir4qx1zcti9xbpqmbsidkpkvqm071tgrkobab0qnw8eixf5dc2g2l3tzp6e8syds5',
                user: 'iw3nxrtyjahivzbvy6bdowbf72kev4fn7igggwlyx0g3813jcbr7nwoka1d56nkcptxkxn8vef8izpv76lhidjiu8354j52pqfqovip36oel2ihc7hxyygf2lv34xos0h8186rk4rqln3b69wg8u0tl0y15n8nogx8yc12rrequqxap22rywx914hm88ukd4qsui9roebymkpwcgttdxb9ts7odcc62zvn7h3ateq4hb9j9gkeqgdp0rynsqy43',
                startAt: '2020-07-28 19:09:18',
                endAt: '2020-07-28 20:47:59',
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
                id: '2412f3ed-d085-4c94-b97e-35a7b50cc6d4',
                tenantId: '81611d4d-e85b-4ae3-9405-fab0b18c73f5',
                
                systemId: '648cfca8-ad0f-4226-8784-294418508a88',
                systemName: '67lfsgaz7ct4djn5nehs',
                executionId: '104e97fd-31e6-4673-9382-1b374502a2ed',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 20:20:05',
                executionMonitoringStartAt: '2020-07-29 09:41:27',
                executionMonitoringEndAt: '2020-07-29 14:42:55',
                status: 'COMPLETED',
                name: 'ezd1u66j4yedsg3crbmp5m9wdw78wiuqtcxoxar6sc487bhiddfyrvh59b3xyar3kw8m5duxzgh3n0u24sv364wlmqzy2c37umtlk4tnsa6gjksbqqarkju8is18pee362slejvo3yt545knizrwvt0ve8t20aub9ksxj9v8g8kyef5ff3w6oqve3mk3jnwzdm2s6dejzmve8karaahisczv32x32z6jsj9nk3vsiyn8ijxljm1jcg1nfyv2z69',
                returnCode: 7986363714,
                node: 'ywvtgsposcjmxm67meinyjlhwj6esnwzch3t5rx1n1v0wi0ejdyl882s5ql71yvt04npw603tbx7nnzrm83pq8p8bzbogo3u7nn0wtp12i4rbqi2ujj2pzjspln4gig6i22i6hop00a3ajscku5yq1cyk06hh0y3',
                user: '6c2uje5iazvgpeghwec2r0pcbqnummbt71920caau2kz5xqaq5mjyzqtacdwr013k2v7m84lpbx2zmm9r8h5nbi3g6y8u94dcxap0v7aliryfrmhirsigehxqzcuxnzleh5y6vha2r6rrrmhyp8zwa5wun3zdfg73muqt311zrdg7o7mh0kznasb9yoovshtra1o2f6sk047xxkf9kd0v6i8ddk600jlyn7ptee8g8np2ej2g55gwezgz166hsn',
                startAt: '2020-07-28 18:15:28',
                endAt: '2020-07-29 02:20:53',
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
                id: '2412f3ed-d085-4c94-b97e-35a7b50cc6d4',
                tenantId: '81611d4d-e85b-4ae3-9405-fab0b18c73f5',
                tenantCode: 'kwpoihbm0qjjg8f5akc8pu8ymkrwntbk0wgi527y6ezbxzkw23',
                systemId: null,
                systemName: 'j4bl1sc2sfiw6ssl8xwk',
                executionId: '104e97fd-31e6-4673-9382-1b374502a2ed',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 14:43:49',
                executionMonitoringStartAt: '2020-07-29 13:19:21',
                executionMonitoringEndAt: '2020-07-29 14:55:27',
                status: 'CANCELLED',
                name: '6awldjtyr75d625olbnwvn12b5hyk8tzdo7scucly9q4oo3h73v4w9b2p5xnd62m66ytivjsfrzzd3urgdn26ot3ir25hzwy1b19x9e3sbp5uo8h1msvyka34bvxvgu0t5etsldhvy1ovter8g9jed74wc8ebxx4xmfopgegpuq9aosxwgzn77s0urqhbk82pcsyxzvg8cl9recbflajyq1vovvz36mbo310c8cbjws14puefw95hsgovxtbdo4',
                returnCode: 2642667759,
                node: '8nhi6kl2j3dbwobl2ejc2omuhf4ffofgou8rntdu0t5rcym45yu4gti0cx7ao4xe0zxvvm2137pat87nxmzo8ddwk0sumamq52fked5pex2bmeor31wu6s1u1g4ct1ul037h1noaqoa6srh75vprontymf5cc9rl',
                user: '7r96mpufc2cgyl7tziq9h6vv74ztxxacjbt6bmpix6u61yj0b0345kb4qxcs083pzvwt1634mj8bbihkdc50u6tfvut9l6oqte47b9fphbo5kaekmawjpkxbf7hyy1gv0ofybtloapcrvx3o36sneznrm8nw6ohzf2u8nfrb45nuhb88whsu0it5au7t2oizoz6uackvbiw58huzmjj8ve769409qtbq7ldsa0c5gx51l3fydc4jw1vao8iod9h',
                startAt: '2020-07-28 23:52:00',
                endAt: '2020-07-29 10:24:17',
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
                id: '2412f3ed-d085-4c94-b97e-35a7b50cc6d4',
                tenantId: '81611d4d-e85b-4ae3-9405-fab0b18c73f5',
                tenantCode: 'os6yrrab3qv198lzjdm30eoautuusotm1auk5ikmnu3qu1x8k6',
                
                systemName: 'j81z67pm5jz8ob62ylpa',
                executionId: '104e97fd-31e6-4673-9382-1b374502a2ed',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 23:53:33',
                executionMonitoringStartAt: '2020-07-29 04:38:17',
                executionMonitoringEndAt: '2020-07-28 19:06:10',
                status: 'COMPLETED',
                name: 've1p1ud4ygyt0o452k7v7smqq2v6ar87x46exl6ekarye6vagbp8t7on7cf95bzleu7sog8osisrsu2rhova3c2uyj4lxprbtb2r8w2cynlxnfp1uzh9erkh178b4biiif6nbrod2t7eps0jbwsxuptdoblz0uquntyp3aoht9phnqa0bcw3lug3r4n61kaf4xjzlpfts0thwb5j7e6k02mwlpntil1cig2msjyvmndhzwborxhmhplpvqbk3r5',
                returnCode: 6563415610,
                node: 'kkds5d9ob412w320h9coz2037575csjmnybj50b3nyen5zg4jg8e2c98xxswqohsugbjhdhylfxyqk58yqoxjvxqibgmb8uwww7bhuifwvojjb8qb3ibj6xnnjv9a3wjt6ajp4l7j011xbt3l25jbvk0jzpht7r2',
                user: 'srn5jr8351vettkh6qg1ss3a3mmcyfaf9bv37v6721hxlzr15x4ylwlfu4emsbsavzydv029i0qyoklgnd8gchk2m9fej12n2mfl1sunsdowehtkqjhqu82w9romin0h0ks4qbqyodha92r8nlqa6e0c5cwbwzrd18izvveec5itolecf7l42at8i81ow3qu87ssn9difjru2u30uoz0uhi0dozx2c0yp23gfx9q9947p2ge7ju9og77l5i6tl7',
                startAt: '2020-07-29 03:39:23',
                endAt: '2020-07-28 17:19:59',
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
                id: '2412f3ed-d085-4c94-b97e-35a7b50cc6d4',
                tenantId: '81611d4d-e85b-4ae3-9405-fab0b18c73f5',
                tenantCode: 'ausvfpz2c9fmk93k62u194tcyh4nu189vmf0av159e4e8xamxu',
                systemId: '648cfca8-ad0f-4226-8784-294418508a88',
                systemName: null,
                executionId: '104e97fd-31e6-4673-9382-1b374502a2ed',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 09:21:49',
                executionMonitoringStartAt: '2020-07-29 07:40:09',
                executionMonitoringEndAt: '2020-07-29 01:18:16',
                status: 'COMPLETED',
                name: '75uzjuyoazbree8kjekkpeyznimjk2toqor7y5r5e5567av9yo4h7je8oo2e2004io5xyixjkcfexykwecpxhpdyob5xv75mcf5so5tm2uu9cbmlnjf7nbnox6hd33vixmmwxsfc83i1iac0cssnwiggg4etvddiqnkm7a2m6tcfsefmaym8ax1pkbr17iig852mx0oucrfk7vq4p3bce2sotjc662brqxn4hvcpax7i9hdesrgn21atfkvmxu5',
                returnCode: 9302320016,
                node: '0r0gv22a8z9305mrircas2ar1ezk97nziz3llz5rzx1zlyqszfe4h76p29hkdjax92mj49ysi2s9y40dyt0dig0urag4wcruouomeyy7onjd2qy8sfeovnnqmtejbwpeykjaiilrzrj9yejaq6yrsjavd0ph22bm',
                user: '91rsnq3z62rerkownr25hztmlldmrq4usg7n546oqacr4dbfeb5fwcsnbgp6q9zxk8hkp2eudzo7juouhx4e2q2sxdv0jp9oolafu5rzfqb71a0k0tk3azl9t7n1iv0gpholc054zfwf8v39gpngn5pqviy5m3zpxsit4p1zrdp97b1ew72hh568ruwse7gllyihg0ggh9ekk5dkgd0vhzf2f0reg8acq0ett4b6hnds7lc4wegjfsgspi3zd37',
                startAt: '2020-07-29 01:25:38',
                endAt: '2020-07-29 06:17:43',
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
                id: '2412f3ed-d085-4c94-b97e-35a7b50cc6d4',
                tenantId: '81611d4d-e85b-4ae3-9405-fab0b18c73f5',
                tenantCode: 'bzuc1okhg29lr2yge14z4sns0gvxajo516rxr6hawr0kzl73kf',
                systemId: '648cfca8-ad0f-4226-8784-294418508a88',
                
                executionId: '104e97fd-31e6-4673-9382-1b374502a2ed',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 10:05:38',
                executionMonitoringStartAt: '2020-07-28 17:13:55',
                executionMonitoringEndAt: '2020-07-29 12:26:00',
                status: 'COMPLETED',
                name: 'o6ak2w5p3nf865t0gj4hu5lgz7y3b9tgooyewyyvk0941m89nt0mtvmvv97s2ce3tn4oxxjujqi41579cjh8hhzcqn3u75elxdjagmqmdbehefq8w9kcb7snkb8tje9mtskg1m7urct53rb7j6c3pt2cl705g2tnyjn18lr6mjqlsjukz3i55qzbf9d3mkhg8hr2bqcs0g3waxfpn94fnk8sm3qmhc3wwwq3q7zn3z8tvre4qbwi1uwztcocdrb',
                returnCode: 7971863188,
                node: '6rcvpcgfiiw02g2jdhn7cvva1tdr0uslqf2eq7m16gi4ejvj02v5phxvy124m81yby53yt55hrczyg4xk7krmwer7gwl8eodsncr65eask5rfaqq116ujtm3up48spp6p0kda5gojlpecmmdfe7de9550pmakpva',
                user: 'vy9awnzh50znwrld8ajzlft7d29zj0pn776foljnb0gch0lqggeouqwyjfaiu3r6k6alb67epy43n4j9bvoei7ujfg9cx6dtzht4zm0hn48797flrl1ifi240hmhm9353sdjprq9058vb7btzjeqbesv2ebsfcxl3nx2tbuk9i5f6r0x5zwgr9nzygx85hkgx4k5b5rgrqyys4wno5271whkjq634fpdjg2dhff3y3wsmqcf4zzk70o198kvolv',
                startAt: '2020-07-29 12:18:06',
                endAt: '2020-07-28 22:22:20',
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
                id: '2412f3ed-d085-4c94-b97e-35a7b50cc6d4',
                tenantId: '81611d4d-e85b-4ae3-9405-fab0b18c73f5',
                tenantCode: '9awbi05nypnv7pnn6k1bygmzdd0nel135gbvwrjrfw4d2oc0g1',
                systemId: '648cfca8-ad0f-4226-8784-294418508a88',
                systemName: '6qike0xgd67w5ub8yvle',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 06:53:48',
                executionMonitoringStartAt: '2020-07-28 20:01:41',
                executionMonitoringEndAt: '2020-07-29 04:28:52',
                status: 'ERROR',
                name: 'korr43fmos97i7ocpwpt7ajbislcda4o1pn7owpmac6lb5a0sgef6k39ja8qie6su3ignsjd5ewar206m3r797sdkw18le43ksqsocihzg4wvi7wgo1o1sawur3kyxp2ai443coots0torjjr9n9v79bde9tynp4gbxjhazqzueyr6q38yykezxld1kae1c3qaeyy265b04d99dt4n3ohjvnbwvmah3rgo289piraof7obyep9jhjd5vsr4swb1',
                returnCode: 7888236956,
                node: 'xyh1iuun8dqb55xdv4sk6ohq9w7kalw3xwvc1ynis6ivr7za98ykyr1p0nykorqb823uj6k0fhnfpwdi19gfbqnsae95lnouol6sen88ejozu2bfnru1o74va8c391yqwnoo8o2ewe1frgkzojm43gztmd0hqpxs',
                user: 'b1k7v3sk08hcmav3x8tk5uxa3ifzj2c240w7p0esy5m9zbw496awn4gk8dwnaadaekmw2enpesil3vxbr77rdpgq2vm3y8coqmau5ip0tqjoz51bm2yk59412redyz42gcqa7m4575qgn9d6wnb556lgf13ksduspvs5n8am6pg6y8be1wy4hrnwicffyshy1e291exux74u6ke0epw7rjofswcg5ch59ewl2ty8zst983tiidgnfktg49i7hms',
                startAt: '2020-07-29 13:20:39',
                endAt: '2020-07-29 14:22:31',
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
                id: '2412f3ed-d085-4c94-b97e-35a7b50cc6d4',
                tenantId: '81611d4d-e85b-4ae3-9405-fab0b18c73f5',
                tenantCode: 'k3rwcbjsq7oe35z024qjknpjnasmtcetylmddflprhrgk8peem',
                systemId: '648cfca8-ad0f-4226-8784-294418508a88',
                systemName: '68pvcx40tjx9p3ewkuub',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 03:49:45',
                executionMonitoringStartAt: '2020-07-29 08:42:07',
                executionMonitoringEndAt: '2020-07-29 15:35:22',
                status: 'CANCELLED',
                name: 'ge308a2ck33xvcyceyoq9f77q0ebbv7gsrtwcpuewp075ns8fb86teyj1hpxmyy785p11mfo490ceabd8t0ooa3hzuq2sptj2ip1jodn1lvs594odhyurb2iisojws1haehqwvxnwskzfml029whykol6yk45f7wfp24lnc0flg1ukxxf3p9wgth4636c3ztvrwssccq9ed3n6eeucda38l0ntkl3mlk848wh7r32957qz42mrkikf15kq9i43q',
                returnCode: 4438043369,
                node: 'ryy43bmvia1sgksrxh0c9speah5ccxpqh1qggknmjo4z570rxubzpl2i5iwt0ts3wxowtbw0l5xae1pyjoiamloi0o6tjt0r4rj8sz5htvwwop7i5agp1ggv5b5nsn520amoxm27bkb05aw098m1mxqot6tqlt9u',
                user: 'kk7n98zudrvsjbgqtr7o3lyk1789qyfp7ul7aynfxy965bi5mqb1svdpkudrxsxa8ckjlhrliginpvmh4qiskgau7di2mtpk83zw8lgg8i406atxgjplgjr8gy5v1wy7mfi49aexwxt6hrytsvo7yf3nrn0h7b1c8t15w16reppdahx340q6nxxp9nojxg9xfk0kuxr450wb7v6cjsths9ww4upy9ts3okq1hhysbsdszzbfnne5ky9kts2qfaq',
                startAt: '2020-07-29 10:52:41',
                endAt: '2020-07-29 05:51:43',
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
                id: '2412f3ed-d085-4c94-b97e-35a7b50cc6d4',
                tenantId: '81611d4d-e85b-4ae3-9405-fab0b18c73f5',
                tenantCode: 'u5862aa8y9a4j0nt2f7i7dppwb1t1t6iziort1e5dk9vsdn8wr',
                systemId: '648cfca8-ad0f-4226-8784-294418508a88',
                systemName: '0y763f4n9yehh7e5ojsn',
                executionId: '104e97fd-31e6-4673-9382-1b374502a2ed',
                executionType: null,
                executionExecutedAt: '2020-07-29 03:11:41',
                executionMonitoringStartAt: '2020-07-29 15:36:19',
                executionMonitoringEndAt: '2020-07-28 23:47:12',
                status: 'ERROR',
                name: 'z8aytggsdkvz962qynr7c7uhl7vcxr71ksur9t5lcz8vql0cpb5p6q1l1l8w9908d2mvu90mk40daf5gykk5gvqvywu239m939hlvblc6ub9udmiutij34rgo2nsqd367yeepa8wn98wp3vndzzbqonikdlexy2tm6gx6olyrmg78nckpv5znbu2g0wo4huvcosnbiazump0z0a4pjgkzi7qcj9wfqg5aq031te54ca2pirgb4aup579yu3b6cd',
                returnCode: 4992733968,
                node: 'ckcuxzl0pey09yx6ajnidj18vhbwx5a3qfsw2rwaxllof09wuynddoe70upkpyrwofkgv0ryblygdv536lc96pb0vsxnw7drgmw0i74i0exmjutbhrh25pu9on3m3tyo7dzq6ql12mq8i0wnjxh7ngu5l4slwhtg',
                user: 'sjq7gpihwfn4ig2dbzueg574fre7ppmfb4nw5bxa8fdgxyzkaz3axa6oh2k1n0yefxc51piejq75k19lfn64v80f3v96ydjuu03tmh3rw1tp8f8z4vxwuze2p7bbmf359hlkju7da9tyg3v4m30qajmgocjb3vvxe72acfm2hru2i5oa8k3p45d0zfsxnx8fx0rfdjfskfxddr6xpc2pteu90uuk2v9n0tf9ydxvoa1l3b76jibi0lp9zt2z7wy',
                startAt: '2020-07-28 22:58:29',
                endAt: '2020-07-28 18:08:46',
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
                id: '2412f3ed-d085-4c94-b97e-35a7b50cc6d4',
                tenantId: '81611d4d-e85b-4ae3-9405-fab0b18c73f5',
                tenantCode: '02z8y1007mhqridzyx0kb33wk68c5gm3b95t093vxnw0ywjebi',
                systemId: '648cfca8-ad0f-4226-8784-294418508a88',
                systemName: '2j8o53cc5houiue91fg7',
                executionId: '104e97fd-31e6-4673-9382-1b374502a2ed',
                
                executionExecutedAt: '2020-07-29 10:30:58',
                executionMonitoringStartAt: '2020-07-28 19:19:41',
                executionMonitoringEndAt: '2020-07-28 22:39:50',
                status: 'CANCELLED',
                name: '5z5c8sqvojj4i3ados8xrd76o2kcrrmpnok6zdqzdtgg4m9jygjf5z4p9217ws97242fpz9bfenhokbbjyrz2a5rkhvjhkm4z9c9qvixwlvmc95w4yars9yt4tzvkazb5hjskenfz38th1s2wqu18bv8e4r8aheqos1o10v4xm4bvef5o875xzm3ne08xmrt0b0n7tzm3j5c5zhhqxlx1b8j5o8rxomair758g688s8jr0m6zy2031z0b4r7arb',
                returnCode: 1940614513,
                node: 'oho1122yivxtee318qzz66wknxiqamuoxwxzdpujqhrwyvtpl7ie9oue5qo1r66g2h7xvip1dkiqbqiexif2bcs7h6z8lqhbhtmjoxeiplv4e6w9q6yptz7gzmptxadayspiiwpd792zur6cuga3m7om2zm2qcoj',
                user: 'dchwwmwqcpufo1fix1jif5ft5mhc8d46syet5bboj2gfe3unt264w23q39e69ig2qaxvvdhc2mcdawu4nogsc5wv0enrq0kq5lrzjyb06u270lzkf3o4o09qnphfjmtn65aaugtq9t1o1rx6gk1v4whzb6b40xl558t4djl3mmthlo5m4stxo46wbyk9pvdtirlswop0s6t4lo7daaslbwkkru87alvvbyof7vt2c1myasqsla5zukpaqha7iqy',
                startAt: '2020-07-29 05:07:25',
                endAt: '2020-07-29 02:58:32',
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
                id: '2412f3ed-d085-4c94-b97e-35a7b50cc6d4',
                tenantId: '81611d4d-e85b-4ae3-9405-fab0b18c73f5',
                tenantCode: 'cw9sdx7w8ksxl1fw2xea6gaei1dh0qni45jjx6vg2p1d8fhf3w',
                systemId: '648cfca8-ad0f-4226-8784-294418508a88',
                systemName: 'oj27sqoykjuizfvn3uig',
                executionId: '104e97fd-31e6-4673-9382-1b374502a2ed',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-28 20:08:39',
                executionMonitoringEndAt: '2020-07-29 13:18:11',
                status: 'ERROR',
                name: 'u58hnpfboguj7mzzkr3x0hzsvl015wfwycmx8nv9bq4d4vheyd5c97djniav0g7unepcx3yc1sh0cprcgx4k3d324v52qxwq9x6aqn1obm36s8imy0isajapuu1hoeso56ennv3j9bdunwh6dr8ubxegomsm4h06d2wxuf02cf2e3j6mhgkrwmfxaxeiyhney87vaqxf33w4f4xen7ace1dt0suhymprp09eo5hocvm7ez6qgh94zlip9okg62b',
                returnCode: 1128176301,
                node: 't1chx9x3tg2k9perbamriaycukfbxcv2er3jr5booti9b1ykq4vrxdolxnrjk1ddhr596lp7nqyaqbtt5fpjowuix6hu33tin6vj0pvxbbsnmy0fmlmk1sbep1oyftvh9yot6ave0phv2p0dwpzcj5bd8nb0bmbx',
                user: 'hiqfk3xn7oj6hamsmojidiy9kv25mryorbzng5csmqmthrzbb09501dp84bvh8f5hbmhsztxjopuoznx87cgiztd5j56oimexusq2ez98dz5ikb5510qd9trln4w1yq31ml9o5ria4q3wipk349up8lm5ery1nh1ogn0fihdtqxhby5bmeh4554j0mapjyqj1qi2lcht2udnwzufwyx7mq424h73cdftdgnf5nje7aec8fcknnskxah5uyhfol1',
                startAt: '2020-07-28 18:23:16',
                endAt: '2020-07-29 07:55:09',
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
                id: '2412f3ed-d085-4c94-b97e-35a7b50cc6d4',
                tenantId: '81611d4d-e85b-4ae3-9405-fab0b18c73f5',
                tenantCode: 'o6k9xdbg0vkz1oqcsjplusfmbv8ngz12iujbdjta9hhmkzrcfi',
                systemId: '648cfca8-ad0f-4226-8784-294418508a88',
                systemName: '3g4d7db4t1unk8g3opuj',
                executionId: '104e97fd-31e6-4673-9382-1b374502a2ed',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-07-29 03:25:29',
                executionMonitoringEndAt: '2020-07-29 00:04:36',
                status: 'ERROR',
                name: 'rdakqezyxub7fy1ud0bdxykyc4fjr3sw525yzic4m9618f7byol54foovir4u64g6b95pnqfs3s183isos6cyf3iqb07qdk0u6s1fdthmankfcb89vzf50c4r49ehiy635oqjz4pyb90gzaefov7pwrp95bsjpqthhavqwrgt0318emhpuytizddw2r9y7ebr9fcpbrd1cvpda7cs2c81qvvyeidyt2t49lk14ekqmc2ns803jf2boubbfkzz41',
                returnCode: 4340672590,
                node: 'd5ban72sar6ai1wcjcnunn51yfedjqe7oxio3np38vt1lv2ggg7w9uoyw94wd7aokh7vj8qdsh8p5jvhw4xptdlx5gn1ye3kvcg45oipsyyz2zrcl6xbjofp9xzx2qgtrhj6ukmss0vbwv5h76dlaaofco9ww11o',
                user: '7m6d90649kjg5m9knqdvfdulq6oz0oyg0tehpngl15ng97n1bblgeb60kbwvym98e15fuf5tjxwru5u6o52aeldtst79g305jivomyqngl19aplnd7cyjkwbev4k1mqnnc3ar1rwiy8997t0paldal3q6p816f38duw3x0y5lta0b6g1n6qs3brasxl16fv5f6um64shodwppmts88s4q6h6l12738ukhw03k6hvmqaydiphfhpkam4jvul9ewu',
                startAt: '2020-07-29 08:40:09',
                endAt: '2020-07-28 19:38:57',
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
                id: '2412f3ed-d085-4c94-b97e-35a7b50cc6d4',
                tenantId: '81611d4d-e85b-4ae3-9405-fab0b18c73f5',
                tenantCode: 'ow68hkz2sxwvujvb5qbgdc3mtd5wc5krtqq83979v51pq95fmf',
                systemId: '648cfca8-ad0f-4226-8784-294418508a88',
                systemName: 'k1yb0rvgmtdqbxnbq2zq',
                executionId: '104e97fd-31e6-4673-9382-1b374502a2ed',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 21:37:34',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-29 15:15:29',
                status: 'COMPLETED',
                name: 'ktrupo9iiwh70ttommqk5tg9amgigtv8mj8ndg8ow1k8aex9ewaqlpa7awwt7prmkfsf21yr4cpfwfft2yyvj92ltoh2sfijpp5qfo2a5n2b2etkeeoj1mmu268b0cii25fjasd65p5brq894pchd8w28p9vk4rrih4mdn2gh6vg4cbyz5ttzih4zqpafi92t7hwur4ftxlnmednx91ok4csnk0ho6z1kk4etcl7j00da70y2vovs3i1thvu13z',
                returnCode: 4899829156,
                node: '3ldzbnh46hmj1c0ui9msahk7q555ft8vhzdgmjr2iuqls4kqutupirxb6xmz01jqr16uuxv0xqnomcnzhw6e1vtk50afx5bkm6hrdf66kdvcvq5j9kjd4y48pourbxj1pkxyxuhtpuiny1lo7dx8c5fxf6a8r4ha',
                user: '2isouicqpobo5swlahxio2ddx68pum61xoeme4bh93bu4g0owpog6qp4u64pnwc5ee13ba78s0b9pzj9s9r7zqgiby0zy3t7i7y8b21azous2yfudl03wg5rlxmzn89j84mhr5807lubah0p1k84hhk0ou2jeo2kh2561htakicg2yii5xjgesy6c9tbyl7aj6t7p0il02z2i3emses1p1bv0egazxg49re3s1jkt0rcmcyp8l4664pcflyrlur',
                startAt: '2020-07-29 05:21:11',
                endAt: '2020-07-29 12:51:17',
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
                id: '2412f3ed-d085-4c94-b97e-35a7b50cc6d4',
                tenantId: '81611d4d-e85b-4ae3-9405-fab0b18c73f5',
                tenantCode: 'o80ox28e5w9b9ztdt2qlvr60hjafuvy2ga1dus7oclyx3yudnj',
                systemId: '648cfca8-ad0f-4226-8784-294418508a88',
                systemName: 'zs2r03tegdrmul9hdygj',
                executionId: '104e97fd-31e6-4673-9382-1b374502a2ed',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 07:16:09',
                
                executionMonitoringEndAt: '2020-07-29 13:53:24',
                status: 'ERROR',
                name: '9oggwa0ilg8ar0kib8fsjwrax951xes6yz806bx7phmcvmeawv2lwiuflg5ol4g2msb2xam3i6411tuzzun64rwwf62kc49m0h84taj0i1cd8z0ng4mvm0knzrm7m8a9npv1rsz75yjyaa377ujhnuti4111zhdtpcaeprzzgj3a76ytv7f4n39fpalevys64t4xuh1sfh4nf17z9huqryd01tqophgaxgqujmh9u5gkfugucmb6zv7qcgiefag',
                returnCode: 5633304875,
                node: 'o4jjc11dq09n7lbtfg3yd7u0elkf7hcia4uv5klgcjxpsr84uubz24ronfllwwhgextvusjrtov84phkibia3ieurx4ndfzmehfds699z7q6byn1li9arkhqpq4ef7p1yt0horleh6szmtn0rx3px7b3n90gcbhc',
                user: 'hn7k2s3caffv5hrwm008uq3b4l5au2tdyi84fxav6w83rgb6ln7v4wxp0qg5wjgpulr4ojo5cd8sgaiayn8qeg4n2j1o3y0pg4vner2cmr6uw9y7xlbr23d5or5f2e8hg7af8fjiyucxwjt1gq1gg6m35mq76oovppm065l8f3b7qcey18ldc74qr86vtifo8a8ql31y6ucyp7hgj6mgb2wktq6t81l4u2b4iiylxgyemko3vuokt0v2vfj9t8u',
                startAt: '2020-07-29 07:13:08',
                endAt: '2020-07-29 01:04:04',
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
                id: '2412f3ed-d085-4c94-b97e-35a7b50cc6d4',
                tenantId: '81611d4d-e85b-4ae3-9405-fab0b18c73f5',
                tenantCode: '92fyy5tvw8co5pk5t0636bk9dc350b15nnj681t27nhcjrdzfl',
                systemId: '648cfca8-ad0f-4226-8784-294418508a88',
                systemName: 'bptgzuxzjpswy6hxgfdg',
                executionId: '104e97fd-31e6-4673-9382-1b374502a2ed',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 02:23:35',
                executionMonitoringStartAt: '2020-07-28 18:28:39',
                executionMonitoringEndAt: null,
                status: 'CANCELLED',
                name: 's8cj4c7uagewor915ep93rz9nfrg0o01x3gi8v1gf4ecw6c8b7i7j44skwrk6zjv1vdu0excuea2sbzbk2c9e15bplsmgh5cempll548is1ob4honrd7rcznntewec25z8s27zt1lq6b0xadhh72ctncj4r60167p845n40254dx9y215k2f9m8pxo3d6zixis54issnk1pvyc7n4ai1lqcky085hiied60bv7i7r8ku5no7f8yi85a44w8b715',
                returnCode: 8081139570,
                node: '83zq0o7lh5kaxdevn3agtd1f5h0euymb4j0ppw5lqv01q334b88t7na49xgryk1impm06uivy5cxo8jgxiijpa0p5i2d2grmzf8dw5tw4lega6ddorvwf27sgssdxff4hablcujt9ku9wvi2d7hh7h4y4bdkbc89',
                user: 'w3x4tt1y6qfjp0vf7qgmnphvhwr1bm2ymm2whwy4nzgb495t9eincocxmyfs3nm0wp658mvy47efhssa5bcttdfbn2d7mgkrq7p5nreld4d2yxtc2ebravjr8hgkzjz4pmbvuci76r1g9up9efmkjbk1x3ip6ul8hsc2wqmz72niq40i7n3ly0bcmcciz5fb32jp6g4c2s0e5712f7zpj2rjk69lawpkxhwe99i4t3grk5ouoapmhivlkg4oe11',
                startAt: '2020-07-29 09:32:47',
                endAt: '2020-07-29 12:03:46',
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
                id: '2412f3ed-d085-4c94-b97e-35a7b50cc6d4',
                tenantId: '81611d4d-e85b-4ae3-9405-fab0b18c73f5',
                tenantCode: '4iqli996jjjuh2xqtjk8tpzr51eooosp4b7ro8jv139it52a4l',
                systemId: '648cfca8-ad0f-4226-8784-294418508a88',
                systemName: 'vzdkt6h96zcaiuy134hr',
                executionId: '104e97fd-31e6-4673-9382-1b374502a2ed',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 07:44:28',
                executionMonitoringStartAt: '2020-07-29 13:15:41',
                
                status: 'COMPLETED',
                name: 'g7d6q9h5df6p3vgr42pjurasyi1zz39r1zoiq6s1rfjdizi5npnxz1uvlozu77x1htfzxkmi1tcmetqrmopqpdyxvblgy5xmy3fszgmzdd14g6h26hqtwxo7vvbtvwpuen18az3sgp6h3t2qnlouk9rmh8wl8cj8i2b434w4urvgak0zufhpb8cgd3gpzy6ksp5fu2xeh39wogzm6jglwlbh4wega0t9uug0s8k6eucy6j9qfnl45cdk25bsgai',
                returnCode: 4228635065,
                node: 'yg3e56c05hlgx9hnfg0uqvit9689o8zv1yd1f8ggzyxs17lw8jel6ofrw0o3wf6ok8o9vjwduex28y1zhsm6vf1goy221lpll6nhy5im0cedaevshv4044hdrt8mhmvfdwiz1byywfhiux9fvtq8xk3iisa1yvgb',
                user: 'xmda18ub6m1mml7llkxlm88ghrw9sgm4b5tonl7jrikzii8d9cqbl61156wehpxhomami4s1cg366sh6u648gs2xblzrdlcaoowq78fmm0jn1sogdlw52stun9sa0wqgz1hz53onheye2y3bqw4odfsto18tqkdfkw23e8s88b9lztfe99jh3bgx38r4u0618bcdjffl75lr6jipx9uwwmnna6wsycidpz8n7u73kzqf2g23tf3rdcqofm6lnj7',
                startAt: '2020-07-28 22:08:53',
                endAt: '2020-07-29 03:41:17',
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
                id: '2412f3ed-d085-4c94-b97e-35a7b50cc6d4',
                tenantId: '81611d4d-e85b-4ae3-9405-fab0b18c73f5',
                tenantCode: '18uy38wo2yddu2irf44qu3ucsmvnjo07a3w2yejm2htgw1rw9v',
                systemId: '648cfca8-ad0f-4226-8784-294418508a88',
                systemName: 'k5f4c6wa4pt0a3yxj84j',
                executionId: '104e97fd-31e6-4673-9382-1b374502a2ed',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 10:58:23',
                executionMonitoringStartAt: '2020-07-29 05:29:17',
                executionMonitoringEndAt: '2020-07-29 02:40:33',
                status: null,
                name: '9g0hpi8hjtndpoqvvgfe4uc4fsb015h66lkmyol7dpf8o0wobwxvdh3ohb8cqf7qalpiyh9ylrf45w5qd8cb07bznyyr3r8o06u1wdrkx1et3yqkjegj53ivhcnlsit4zzt1u7ckn5pq9e8qitjf099pxf9ze4g1pwlex19ccis0eieetksqms7gmem3q3djyxu1pkshjzlusc6jt1ty2h1teomaluifio344imqu5lnwe2epjo9siwmx73can3',
                returnCode: 9405285700,
                node: 'c9d0unhd69izey94epqgshw62mnnoo1dxwzchwashmzgpvhznykpoj5jj85d6ej6nrruj5ytn9e0ulhuigq6r0jbdukwmohdh6098mrg8gxqydtk8dr8b5anqlwde6ydf7mkdz05cqzz7eihgipdj5lzuczp8b3a',
                user: 'an783vtnmbjpxnqkz9u2ik4wa72bm3zopo9zt3g51xvng9n2fy0ehzg04g7knzxm375c5i8a0l8ygnhxgfxyevo6r7qk18ag02ytqrf8mr9yxdtqgc2qnrjqpjisp5p8tz48e3327up08jf062iyqvlvrxvnytsintl22fcciq5phqqvgxaxf2nazf6mfmdponf6iqlyz6al0h3r2dajuzy2l9g4766jxmd11af88qvtj3oevudv3fh03oxtmtd',
                startAt: '2020-07-28 18:30:13',
                endAt: '2020-07-29 10:22:37',
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
                id: '2412f3ed-d085-4c94-b97e-35a7b50cc6d4',
                tenantId: '81611d4d-e85b-4ae3-9405-fab0b18c73f5',
                tenantCode: 'u3m2tl8u83cna1kgr3xvqrnjjm9wo23s9ttpqrkasc69c8swo6',
                systemId: '648cfca8-ad0f-4226-8784-294418508a88',
                systemName: 'cbr3vjqa6sq2b04ziy3e',
                executionId: '104e97fd-31e6-4673-9382-1b374502a2ed',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 10:44:37',
                executionMonitoringStartAt: '2020-07-28 17:05:47',
                executionMonitoringEndAt: '2020-07-29 14:01:30',
                
                name: '6ndlnpnf6ix7u9bz2384a95gtjkq2qelz84y3zegqq4tm25uoi4dm3rat0wf06wdjgfxxfzvuvunefl867pduo3tf34pxualse7iz2ei94xgrf3q6gf5quvt14wx018td44bksyf8uaeksjumdv1510bmnmnzm26kjljw602xxnkdqewniwogmr2kbtcx6d5duch5dihlbk4rxctokcwxv0td4ihpono978oata4woh44d32jee0boez0xbnfiq',
                returnCode: 7996078201,
                node: 'u0ozy48zkcli271g5tgs5641i2zjbgt6afdh4gv6emdc8bddz6jbjjvwvrsvrp9pv4s8p68k7nlnp43hyqe71u4otosp7zd6mpkulg0vcdc08jyrn4fmup25lytcoujlpvfkjymmkrlhrzcuoignheb9uhnpygtj',
                user: '6bnlatwt10hjl04yhbh9vvh9rs4s4s5we94rdqvmz33gvnb1nsyzlvd2mwpk0vw1c1qri0p1u54flxf3y22su33p9vu6ejj6zmmpkhs4veo2mnw4gj9c40l1ul6ppnffhwiiil1h5lcn78pkee2ybfj25omwclfnhxbtzxkcuxk9uqxl9dtyywfwzcfrl1bk1dm5s0hfffk6aj64u05kt5bi9mgpiay3kkinnp463ur2u6qtb5ufz7eav5geprq',
                startAt: '2020-07-29 02:21:03',
                endAt: '2020-07-29 15:55:40',
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
                id: '2412f3ed-d085-4c94-b97e-35a7b50cc6d4',
                tenantId: '81611d4d-e85b-4ae3-9405-fab0b18c73f5',
                tenantCode: 'juxm19gvyfvmyvswuotxsw0dez7n71ipmysfj6xey0nc5k6bta',
                systemId: '648cfca8-ad0f-4226-8784-294418508a88',
                systemName: '9glkc6cwi3a0yavjuac1',
                executionId: '104e97fd-31e6-4673-9382-1b374502a2ed',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 13:02:37',
                executionMonitoringStartAt: '2020-07-28 23:05:45',
                executionMonitoringEndAt: '2020-07-29 02:56:39',
                status: 'CANCELLED',
                name: 'a5i6a8nm7x8u3idzc7tt3b68epimxfsxv1b0xst1s4q7rs83z7cyzbzgb0f0s5njg9ykz79bajmu5r27f700stupqrkuqiper76emytphokln50x5kifnqa7a5nz92vn365p5crpl5jsvf619dc3kyfsm754p3e9zatmxkn21itweixr0e3kpwhmbnffw55kyc907gh2elacd20eqa6njh33jkwmc4zyx94ojpqurotosdsmcwsonox296x4g3p',
                returnCode: 8088476962,
                node: 'nd8in6moaxdtl3gxklap0p3aaon4kh3fne4igno2pzwby3o7hm1qd5bq657k3oas4c7de1rzqdhhqq98x85rub4xbxpe849p2h5zydcvdpux5zunmf43jhho4m1qm78wuwxu0tsu9ep4os0crsj2n3f3by02pgsy',
                user: '74rzos5hv4e3s9e7cr6d43vfsnthdihx0y6w7pizbwzizrba3bb7zpotlh9xcq94o4z3r1tzcsqqzwoe8urqva11q0rnp3uiv04im6pl7zn8e1sokamppyftne17zmv5mlssdljpt8ybhtax5lto8jiys9l0jvxi0egm9qb66qvn2gqej6oie653cn6ffoue9k413x0hhosblc0dwl0824p985k3g9y4rcb1tobbg3uf8xitj5gfdzuk58nixkm',
                startAt: null,
                endAt: '2020-07-28 22:13:47',
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
                id: '2412f3ed-d085-4c94-b97e-35a7b50cc6d4',
                tenantId: '81611d4d-e85b-4ae3-9405-fab0b18c73f5',
                tenantCode: 'u21t30ki2sgc8x1f3d0e91sqmqwdnnlo3t9cvkqheetzfzvnva',
                systemId: '648cfca8-ad0f-4226-8784-294418508a88',
                systemName: '3lmc0tucndwl0v5mnm73',
                executionId: '104e97fd-31e6-4673-9382-1b374502a2ed',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 13:26:13',
                executionMonitoringStartAt: '2020-07-29 07:32:56',
                executionMonitoringEndAt: '2020-07-29 01:49:26',
                status: 'ERROR',
                name: '9w4xlngibyuklnazwtajn6swfp1uv5dvicj0is44kjysr4baeqwdsqkck4fzodyvzmps6vycg81ztrb6oktaabbkt78w6tjjt9p1eonly9p11i79k3m6pmewvs52ucpq9qqxn5o0rwzuk9robo7txmh8ccrfvlk0rdmjkb9isk109c3w5a1894mt9752g2qy7wugc00eai8ukyx7v8ce550ul6ckuhwymhp8awy034yasqd5zrwqk8g2s7q95gx',
                returnCode: 4488443675,
                node: 'f8ofy8tceaugjilytilzn1ru45ij7ttdx7mohzumsdpna5uom4kwibnaohdwo0363qxnizgdmrsimthuexy92fic8dwjt47or5ppj2rpj9d8g3gp2pundu7n3fa3sv3myut9pz0om5wbgeco90wox7j80vit5fme',
                user: 'uzt93ic8y8xq8zapy6uxvtxe3jqeny31cyfjhls63mi9fceig30wxw0gwfj1980fglm96qaui3vkcm6xppthd84hinewtxgyqr076ixvkq8atbs8l13qbl6x57w3wmc372hx05o2oiher9vwv95gsq7q4laxeb36fakc0iamsybq20b9588psgsgnvegpawx0ajc9vmj1y3yhgt88zvc1coxbp7bkorfvspk9c2973n10xri2ua8xdtmjfolibq',
                
                endAt: '2020-07-29 02:13:53',
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
                id: '2412f3ed-d085-4c94-b97e-35a7b50cc6d4',
                tenantId: '81611d4d-e85b-4ae3-9405-fab0b18c73f5',
                tenantCode: 'nlnequgbytzoat8uq2rjx340naamnpibnhlchlc0b7g73oqavu',
                systemId: '648cfca8-ad0f-4226-8784-294418508a88',
                systemName: '1k6r5l9imko29h69sy2r',
                executionId: '104e97fd-31e6-4673-9382-1b374502a2ed',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 13:49:54',
                executionMonitoringStartAt: '2020-07-29 02:05:13',
                executionMonitoringEndAt: '2020-07-28 23:52:26',
                status: 'COMPLETED',
                name: '245xhgb222ng3ack6xnmmoerudo9sb7ffw9h9x5i145k4ou7t9xmqm510fw41ldgrzgk9zezej4doty7xj4oy141bzpon6flwolkfgd80g2jh7anl404hf5vr5qem6qtaz8dqp17dn55743uqr3bz4eulifjyxuwxgqvx42gn6ih1ghue4rfjwi2vspgss7o81a0xd3mfj7yd5x4okboudihsyfwijfkh90lia16joiqyr4s9ah856gbtxib19d',
                returnCode: 7960991091,
                node: 'xqzqeqw22qdeoqqtas4ez7b3i4ynguhnvccze4lwrh6i8f2q3cly1bfvoe1vm6bx1tskzha0c2uqdo1umgd43gmbp1djrklsyz6nyqwxnh0u2gxclo7wjbvl9j2mbz9l5ulw0x4b9oen88zo6yjuov2fs1li59sh',
                user: 'bt07p4fte71v01un7opzxfjve4oxsfi2a454rtp90wuxor32eodmszi3y74fqn3sbfgkeveeefcy41id4xaf0bzmlsj7af5wc6m02ggpmbl7qj06o2qekfxg4pf9vgwmcbme2niwbdcp3izx5c75zgd8uidm8kusa2pz3m99tc7o3a11ci3s1mtv19oyljfb8r195gbvg1ujlxuhxopo85tenyghnl09hppbw8rxhei8t9pchhu4h2hqm03yu2x',
                startAt: '2020-07-29 00:42:57',
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
                id: '2412f3ed-d085-4c94-b97e-35a7b50cc6d4',
                tenantId: '81611d4d-e85b-4ae3-9405-fab0b18c73f5',
                tenantCode: '8srxdyjg25m6lzqzntpbpgloj7gfh7d03lr1jwacpyz8p9chtf',
                systemId: '648cfca8-ad0f-4226-8784-294418508a88',
                systemName: '2pm2944q3jn4cpa2n43o',
                executionId: '104e97fd-31e6-4673-9382-1b374502a2ed',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 03:25:12',
                executionMonitoringStartAt: '2020-07-29 05:54:49',
                executionMonitoringEndAt: '2020-07-28 21:58:49',
                status: 'ERROR',
                name: '7oo1g2kkvls3iztps78hyy8p9qv85ap2lnhq06zqxqnucshdo3xpu2fqd461ip94grdrninuwkchz2ilpv6wqftzjdbxhg4e1dncrv27xa4xfumdqt3ld873zs3mn6fv0wn41mns33trhwo8odo4ddvxegc1otjhemgvhombzhzn2bbu9mov3zgt0qijgpezl5gmr4s7hdugcc1wmioie1rsq72k3umr5emeljpxke4pefbz54e6t7f84el32ii',
                returnCode: 1923590362,
                node: '7mlo9xnryp8dm6pie2jgcs136px4dca4x7qjo0v9bjaexaea5qovww4qzh53rvo4thx8so0ziub43l2gdf8jzyqglvlpxu1akoebcr849fzbuxfm4j4s76yuhhx9jqx1ocoauen0slc6miyllawkz06wvesuq1fa',
                user: 'uwkxa9wnj9vkvwxbnab3ag408rywtubn61by87b5jm9sgx2fujvdz1cbyx6ifkr28z33rinw0u303lbii49s06hi212xh6svn4ab6sgzm91kgfeu6lrmo2agussj92a7wbmt9809vaqcmoyjirbn4ele411eocymm686vwqcssc8nrao8391lefxldbnxipjn15coz66m7odt3tq63co790lo329xjpdushpr1zg97gs8wyw040hnxtr6tk4tic',
                startAt: '2020-07-28 19:55:29',
                
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
                id: '6lfzaw6osh8ijn6au5dlt7ezy5rb5uryuyif2',
                tenantId: '81611d4d-e85b-4ae3-9405-fab0b18c73f5',
                tenantCode: '2xn2hznxej61z8jqitudbnja6xn8oxa2ygh2bv41k27rce9exj',
                systemId: '648cfca8-ad0f-4226-8784-294418508a88',
                systemName: '5i9cdu9cwknhne7wuo8r',
                executionId: '104e97fd-31e6-4673-9382-1b374502a2ed',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 03:48:58',
                executionMonitoringStartAt: '2020-07-29 09:19:49',
                executionMonitoringEndAt: '2020-07-29 01:05:01',
                status: 'COMPLETED',
                name: 'lsiyumgpn95w2123sshk55yhu0b0dvgftzjoxe7u3asx13vmmhwl0re5xs0apf0ag89cxgdnkho48b13l4mprbvt4i9eyhso4wruz4x1urup8p4g7z6xe416gw78z7vo2sdc4wgipaccjc8senxs72ufkhar8g1g5606aoccskas8vjcfu9w7jkgpru7is5layc3m7lss69uvy64xkgpq776rsczf9rir0l1x71g819cff9lri4y1v4m5e02r5n',
                returnCode: 1518112614,
                node: 'exa2d9zr2bn3ud45fj6kzw2fteocp0u9qut09ov3l1zg0ehdklnofgz376vkzc1vhh29r6d8ad8vltyhpfja7wrxvzo373k3easor7tt402j4q11t764d3pcp7tmydm3pm67bdd66tfmofr7ogqmdji4cb03ahko',
                user: 'bqpms4ddsk0b6jngkq0h3k09mcobkh64lfaoy3nxyi2n0gvoeri29ogs9i4b3advhaxsn4a6mqeimst403rs932cy8qmqlq4ns0vb1ekfi8e9wtv7lknv5hde6l8qdzncn35b9x00u8dqancekqx6u55xqjh9hfltmtd7cqi9rq5z3g0e2orpskwkj1zt3ium82uqj1d68ljy7os9w7y9hrfa0a2zsxiio2nzcwtx6ovxt6bv547bj5kza52di6',
                startAt: '2020-07-29 02:40:52',
                endAt: '2020-07-28 20:19:03',
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
                id: '2412f3ed-d085-4c94-b97e-35a7b50cc6d4',
                tenantId: 'l3bqur4ooqmabri2etkwf1vgbigyxcxwiq3an',
                tenantCode: '30thpinzch9u4r0jjyusgo7hbnpp2qx2ept3t8jq77dzkx2a3h',
                systemId: '648cfca8-ad0f-4226-8784-294418508a88',
                systemName: 'tjsmz2uuewhng9s7fk2d',
                executionId: '104e97fd-31e6-4673-9382-1b374502a2ed',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:29:55',
                executionMonitoringStartAt: '2020-07-29 03:16:32',
                executionMonitoringEndAt: '2020-07-29 04:10:13',
                status: 'ERROR',
                name: 'uag215kqvs5eytmlr7wpo733vx17f64sucr172ifgriro4firltqsogw3fgnra92zo8pm28tjt1spp87ib9wu065m41byvfuukh26uhzgwuj5x2zyhfngs8gvh9he8zmmr1q9jw6cr9s373p8c2o6xjtzjgznnm4ov3oy4valsavd3d3skmyxmjhnv1qs6gdrvjzsk0ho2r67g83pyp0gkl0i44khhkj8d1p7bwlb79uguyaq8xfs4seqf7u4nz',
                returnCode: 4746478145,
                node: 'xl8lam0385tolbatmghjko7yx8voam6c6gxf89uamprnmykw6zawf6fiq09uwm3407hmahu40vey6dov398rxqa03rbdsbclnjhhyxxfe15zzclcb49sech8m7u21ew43oivz6hcg15jwgkixxijwvm40ueqs8zb',
                user: 'w6gz3tftqs1ysmy3egu97d24ex2xrb4ebyobk4zjt10v57ub6aix7rn5lf45zl327cu0jrbalxpga90zjqq0fx52ab212ayljz4mh1v6r1dzgarc1y9awq496dzy0rzfexqzv81jokoyuzqvergv5cj9lwrzy4nj30wuzwo1f90bl6ozpsu7yzqg3xfrovsqg7ydk5qunvf6j0yfx6czi2tky9agecits8lwkl7opcg1sfrb7hh7g0jnffdd328',
                startAt: '2020-07-29 12:03:13',
                endAt: '2020-07-29 05:34:29',
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
                id: '2412f3ed-d085-4c94-b97e-35a7b50cc6d4',
                tenantId: '81611d4d-e85b-4ae3-9405-fab0b18c73f5',
                tenantCode: '60oglrym3t5ds6x1wgkesvl1n162wsprg0sotwinyqz64h76sv',
                systemId: 'ytxlps51dcjp5nsy51gwp9c7zxst9pxa69cy9',
                systemName: 'itiyybyeouynvl3c6f6f',
                executionId: '104e97fd-31e6-4673-9382-1b374502a2ed',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 17:25:22',
                executionMonitoringStartAt: '2020-07-28 17:11:54',
                executionMonitoringEndAt: '2020-07-28 22:59:35',
                status: 'COMPLETED',
                name: '8m4y5wdmm43hdtemfmlaqi1ezb8a5ox2fv51ddmfdn4441dnqy10h6saa3wkny1uekn41okf3tjl58s32ahnicoq9t50mz8x5uxpfaurb8itudwz38or9gysh6hhfnmwqvr95hlbbcpw7vtguz8s4jgg4sjs2qeeumd6r31y6dhuzth1kacg0uctle2k6fyexj8bii93wbxdej5cf5ag9vlf8ox5szbryi42p80ut7ok3oiyidgw4bvl1ih957s',
                returnCode: 9718676673,
                node: 'c7krq5nzmrbdyz4eoww00dlso8za6gm56ltytcvtbmbwuqjdg05apaz8zajfrwsxwe5dzvdbddrlqws5b4h2p1s260um6vs012a3mi7o2vlhrc3l7u6iasklcl5wnsuv3c0zv27022u4w5bpm2ocp7yqrp6767fg',
                user: '98fyey3b3n2w5en29e75hldpirttg6xotsh2uylcxrxaj40wobyijm6riwqkpftjthimemvt25ampld1gr0pxm8sckgw64o75tfhp7ylvi125aef12eiuscsj9kjzchpygg1adexlrkd04ri8p11ksbdf7eynzqcq007gofwgrlvf6r85iuzjsy7ak6b2x49oq141xxqrqfg90p9isimtzsvq9k8y3grq62ej1bgk84unw6t3ltb19gkvgba0rg',
                startAt: '2020-07-29 03:22:11',
                endAt: '2020-07-29 16:00:37',
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
                id: '2412f3ed-d085-4c94-b97e-35a7b50cc6d4',
                tenantId: '81611d4d-e85b-4ae3-9405-fab0b18c73f5',
                tenantCode: 'cjcm08ybbg5iy76hmiozeoyjdl46vvrgxtuak21ncpwipatvu9',
                systemId: '648cfca8-ad0f-4226-8784-294418508a88',
                systemName: '5nk8442q9mogdc4t99de',
                executionId: 'un13tzuus2e5wfz57wf960ybs41v6tavxmfee',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 21:59:03',
                executionMonitoringStartAt: '2020-07-29 05:41:12',
                executionMonitoringEndAt: '2020-07-29 01:32:58',
                status: 'ERROR',
                name: 'g5tsusmyi0fyctigf5ujic0q1ruq2gqla9az9ftkh281c4u7ja30qn338uuv99fcu9aavjm7nnodx0mt0kzan30p7kk6c4jnnon7vpfjcolojf1rpg9oa4g9ahjbir1awlky0xhlnotobtbrabv7kd32aqmej4bmd865n7o3em2z22b9b1k2abr7ydh57k7xt5zzgrrm5uetm9wfk7b4ib0hdy6n6oe66yz88fi60trfj9lgyvq9yzyymiviv6a',
                returnCode: 6395425015,
                node: '4tmp6h65cvdnt6b29nlbjz03p7niqq4kxup09mjnbojgdsaql7baeq00b8f8vrpw4meiecm0wzfkrzxyusi0rvzkdlkqzy8riy3dyr1gkuu6adyrdh6l4heixcg9t96sxzh8w622pm2z8g4sbdx1zp67soct33zu',
                user: 'w8q5h6ydmajre59qgcoj44bkycf4zwbsi35o4lwy2h1dv1d04uf9kzdhvnecn3loufe26mko0m9gh1vje2bdotfe83t6x05qje0cqubvh3844hcsjc3hfe3k8a7cfe8mjnyc7mah0hz0tljmwuaqq4fcby0v3iblnamfcnztekwco13rc66v9s2jztwaxzbdepfrt6bvlsi8la3hzjqu9b9p2yil28bodedcoeemkzoisjyitev5shef0ye921q',
                startAt: '2020-07-28 17:12:26',
                endAt: '2020-07-29 10:42:26',
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
                id: '2412f3ed-d085-4c94-b97e-35a7b50cc6d4',
                tenantId: '81611d4d-e85b-4ae3-9405-fab0b18c73f5',
                tenantCode: 'daq0xzu0n0ro65ge4qnyvdc13hdev301tkqtk1q6d7x42egfhxe',
                systemId: '648cfca8-ad0f-4226-8784-294418508a88',
                systemName: '8td4ccgn8e3hro6rqszn',
                executionId: '104e97fd-31e6-4673-9382-1b374502a2ed',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 09:01:47',
                executionMonitoringStartAt: '2020-07-29 14:25:10',
                executionMonitoringEndAt: '2020-07-29 11:10:20',
                status: 'COMPLETED',
                name: '9ypppp542jjcpiek8a6sb3f7hlsf5x7yqej20etxeh4y2k3pnn5796qb1p76jv5cymyebwh1nkxb7tylsemrt7d4zxkysj40cxh5otv1v2hmmmucx1wg5l3s9ejli9hhk90oxvup8ta6aggagt5ejqa59ylswtkyfae20yds2wgw87zdkwo1f2fri6gug9if9ngd2uprnju7tx1dqg5ohpp01lgjp88awzfdxyjvllyjbpq4x4u87bzssy2j3o2',
                returnCode: 3254590973,
                node: '5kcj08gcmpan7tkf5pwkfjmg35zhe3o2wi1dk1d3aobah419jdoo48je5a6lm06js9dlbrjllpdatukuxmjgk42zfp365zpetwpmp3t2ua7nfqqcdaq3big41qvellfwtg2f7a6dwevlzqlgcw6s2yndurxl3er1',
                user: 'vsxvj8tit7gu29i594z4c0bdglitd0qmmsj3vupu6wf10a4jrwnva4qfqpl3hj98d2f49ow3kv0u0hl574hz1r1nu4oov4xtva0pwa9bl6kl9yhtg4xy3fh56mh85yle41niqdcemcm7iful5c4v369gulcz447fuqj5d81dk81oci4efujce8perj61rujx221nj40m9n6ograob55dacav0aixfhlqe3mqljncuzum1s4nyugpcuy1tcjnwo0',
                startAt: '2020-07-29 08:11:44',
                endAt: '2020-07-28 19:03:14',
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
                id: '2412f3ed-d085-4c94-b97e-35a7b50cc6d4',
                tenantId: '81611d4d-e85b-4ae3-9405-fab0b18c73f5',
                tenantCode: 'lbaox7yggp04o3o5564fu1oh0kr93yvoxlp5ums8emt6vvnnuf',
                systemId: '648cfca8-ad0f-4226-8784-294418508a88',
                systemName: '58ztqh6vui59m6wvdzm7h',
                executionId: '104e97fd-31e6-4673-9382-1b374502a2ed',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 08:05:58',
                executionMonitoringStartAt: '2020-07-29 02:39:37',
                executionMonitoringEndAt: '2020-07-29 01:17:19',
                status: 'ERROR',
                name: '4gd3bz8ymbw9cnj1vm27fov0uqd0ot64ud2db7udlpp5t44okn0bg0cfedubsfbaemojd9szfvt1wn0f4n1nl7glal6b5zzbbmh871osi9osqkgw5hqizqzf2j2txe7s3w9r3rf7y7ttpscb2nf2yulctue9hgeqnc0c6wo0l7qvqz9j5dqmksnmrpmg1e08nscvtw4j4qnzd9kj1ebvq0hkgi1i4ms43789qctorpjsvmsgrzha8puskf80tl7',
                returnCode: 9724387588,
                node: 'ywyahbw5ku1vwcfaijgwiy2pblzqhu9w62dl4mlb5og7tlhk3uzq3ykqm9e1wyil4c3p18mxqy9avvogevrp4po1ydtaftj2kqi8ly2pa6y2cadjp1epih3zysmimo8z38e1luafxakv44fd4zbbq64kqm2pfpt5',
                user: '1qbg4qp6jzs90v1ey9xjyt493sjme6amwkaz7k82cjmgodpheygl5vyxtvd13fwx4lcwwx6y6lqgch7y1hzjqh3th42sbm5l7w14lwi5d1mrqwnqtdr1ktyw3eyjpxmg8u0gxn07nh251o20t3giyq8ew6zcfp57bm8scu812kiv7eamsbcs0qo1ix9bdjcacf72fr6pkgw0ceulvzrkpi0kymrxmxjglkynuto26ivno8vwh62dmgau673c4pv',
                startAt: '2020-07-29 06:01:08',
                endAt: '2020-07-28 22:36:55',
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
                id: '2412f3ed-d085-4c94-b97e-35a7b50cc6d4',
                tenantId: '81611d4d-e85b-4ae3-9405-fab0b18c73f5',
                tenantCode: 'hwsr69kg1hg20ndmun8wxmnfdrlc46jefmhxc5paqgyt6pltdd',
                systemId: '648cfca8-ad0f-4226-8784-294418508a88',
                systemName: 'khispt8mxz9bxzhqt32t',
                executionId: '104e97fd-31e6-4673-9382-1b374502a2ed',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 06:05:07',
                executionMonitoringStartAt: '2020-07-29 00:35:18',
                executionMonitoringEndAt: '2020-07-28 17:28:52',
                status: 'COMPLETED',
                name: 'us3ri5vwv41fh5bq046ivypv6r8pb5cuwq3vgvyjo0b0x98dhtnljw9g82kjg7sa5rup376ij65cqyd0uyypt76qlszock8xaagfhxjtygh4brv0ejcdiqwsdy27wk98nswbbjkwclm123hqg12tv225zsypon32xt1681u4w30kpckamm5umu4az76c7mmb7j7kikzcsojybt3svnjzjb13of93wa85xwgm2lfowu4tze2rnevcln7gcx2u2y6f',
                returnCode: 2743431534,
                node: 'u90d863a4mmtn2o16lklzbozj2kurzz4jdgcvjqnov8dw3ugoo7vrw5oten4l7ftjctp415mjolvj9gox9zmd4jho8jhwefkbsz80zim0zdnxvgejsmcec9562s14fmfvz73yz96rs7zjwwfhlcqd3zg4mqnr62n',
                user: 'qrumw02pl59fqewnfbs4xuakwg5nrx6c7ejut7h1ew5q80fl5irb72a9fflj09zi4gq5taqvijofxliwx07jctyo2dnn981tmboyhg3x2zxngzcpykig6ec1hall2catgqrmrtywfbku7bdk1m2psej8et7xcfy0mcysbb6g9k8xnaat12aw1aicuhunwylg3w24cogp5v1tkd38vt43nkoj03e2cu4h4a0g7hjhd9ezguzu03txjhctb362h1w',
                startAt: '2020-07-29 04:29:13',
                endAt: '2020-07-29 14:52:08',
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
                id: '2412f3ed-d085-4c94-b97e-35a7b50cc6d4',
                tenantId: '81611d4d-e85b-4ae3-9405-fab0b18c73f5',
                tenantCode: 'm2b79hu9nns59alad5n95tsufcbx1osn2io5u3f37pzpvhutjp',
                systemId: '648cfca8-ad0f-4226-8784-294418508a88',
                systemName: '051avoradrz38dj460eh',
                executionId: '104e97fd-31e6-4673-9382-1b374502a2ed',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:52:33',
                executionMonitoringStartAt: '2020-07-29 05:37:30',
                executionMonitoringEndAt: '2020-07-29 15:49:28',
                status: 'ERROR',
                name: 'egrv3tc30susxdtprpydcw4a08qtwd55cldafu5z6eqf0lke5y3cvxvaw3ertdeaejzs1o9zqc0neqk7gn02to0z9li2l5vb1unhx6tu8t88ul34e0qm1i5nk2bnnqsq6zseb6bejskiodnf5ju6v3xcdz5fu2wbzhomn0z6ap6zsnlbzm5zw9vy6zthh2m79nomusqx9ut4nlel1pgd20dib31bvdl04ne8bp2oihl8jto42lpwbliprogkz37',
                returnCode: 33505588026,
                node: '76mysgdcoqtukmwtc2czgxw7mxpno42x9azczgrkaawc2s9kh581v4uudwdo6zuncxq5y8dzx0beaidx31ehjjrgwbew6w889zeefbqxhnhjaoekhf62rh0qcy111lphays7iv59j2h0ntuw2lj4gashkb4f3y3i',
                user: '85z2r8ibfoi99rbnfrqnao03gvdkqbr5h94x8kwwv9xu1jtyjinie4jeenpyivo5p7vyzk88xbcukeqcbp28yq3o7hwscg38bfn3ki3ijna8y9df7arx5tyvxuhd9hfri3c63ndprl0jj8fw0pbav3zmzgsspmwdh7xvii97bd9koctpb41ru905f6ce63x7yrw0lzf4g6wuknwvu9mw67zev1gsbnk1sjddrwrixdfxvq4j6foac66ra35rxst',
                startAt: '2020-07-29 13:27:46',
                endAt: '2020-07-29 05:25:30',
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
                id: '2412f3ed-d085-4c94-b97e-35a7b50cc6d4',
                tenantId: '81611d4d-e85b-4ae3-9405-fab0b18c73f5',
                tenantCode: 'z4cjs88va189xvdnqxwcuuk7zlg8n42yyfolt0i1shi4taq6bz',
                systemId: '648cfca8-ad0f-4226-8784-294418508a88',
                systemName: 'shyzov4rqcx5o417r5dd',
                executionId: '104e97fd-31e6-4673-9382-1b374502a2ed',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 12:11:50',
                executionMonitoringStartAt: '2020-07-29 09:20:00',
                executionMonitoringEndAt: '2020-07-29 01:59:33',
                status: 'ERROR',
                name: 'toukcxk0qoc7juh8gjwe9cw3rj2n0ev4bt239zeu0cx061381ljws4mrry5z43oseu31wqt94nctoc8w3yzjr6j1k8fe3jvhh6f2yiz3ao3awhd0n4na46ju4p8qtyfbopr26sj2rlm3yas21qlz824u89k5kbz35qf0djfguafe5or486bf19enycerkeipu4bkqzk1fzxfvsffutklhpdpqbcrk46m8zdctv747oehvl68osczimftv2w92f0',
                returnCode: 2491202904,
                node: 't6lro5vlxeqkltinvcwkr8d4k0f9vl09gwy34drsms5vk010gpza5emser220eofmqrl6z2rtcokbobbvexz8wcebvvoj4bt714lk9gdlfrrrgh46ueghyown4e05s7m5vbkis6wge9ts05n1a5bw1rsv0o2pes78',
                user: '5lxyno4rlrdpjfkc1gmwvkd13psl3u1vyo5a13oi41ra14k9ni94qvtc9ftykdhh573zl04eh4tx16eq0becp9ckznmiksrfz09lv52dsez1l52kh9jposgq3dy6zkyi246xj9kpnijrcho3wr1wwh9c4xuerhlovnpsxwychvvmzrjohlxrg0bzwc99mu6bdgyq68onlv056qk4q1yyo8k2u7nb0z1gqq0j1wjmlcska0sn7tb51uq1zftrkf2',
                startAt: '2020-07-28 21:40:55',
                endAt: '2020-07-29 12:48:56',
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
                id: '2412f3ed-d085-4c94-b97e-35a7b50cc6d4',
                tenantId: '81611d4d-e85b-4ae3-9405-fab0b18c73f5',
                tenantCode: 'oka0fjt9gdcej4dpiib8q488mrtv6835upa94wtadzi8pdvn0b',
                systemId: '648cfca8-ad0f-4226-8784-294418508a88',
                systemName: 'ebt7nhi2mwgtixrk5nr8',
                executionId: '104e97fd-31e6-4673-9382-1b374502a2ed',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 18:28:18',
                executionMonitoringStartAt: '2020-07-29 04:55:56',
                executionMonitoringEndAt: '2020-07-29 13:30:17',
                status: 'CANCELLED',
                name: 'ubiz975bv56wruoy1hgky0a2lovhm3rem9ub90bd14uhu992ee62t0umcs0fiyi9j1rpedpzjgvht8zm5rbq3nkvmutd5oec2tc7xndwlu4qi5cpvbnb1yxmmcmt58zr9bkzgbsfqwxxlpvh8onqktrnhq0dj5rojab7g78qns6tex3pzy5606hrxdbqy8rcub9izf119f9zam9acaxnkjxqpuvofm734zv4q3v4gvvwr15anxmkltnj4nmwe7b',
                returnCode: 1702738464,
                node: '45vetdukg7eagy715jqfcyenudyjqazzy1fiudzo2i7r5rul9sj17vy5qemqzckbd1lesfyhs98k9s0m2o3if6glnxib0b8tmlgepoavmeyvegeyg0692sl54fj1tc019wnugbhpg8xrh8vytsegns95lc9z8ur6',
                user: 'lh9c3lwxnmfn8h6y6d6arlqzpvirajohh0xe9x4tay2v9e3q5hgyz1exr4elfqfaw8qlgiytuaii12qzl8p22c0itmkl8ijrq5i25ydxmt5td2tctcupo5q34rg4d7h0gtfswhzhaujegtysc9w55hyu8vvnn6qfg8s5bhcypof6o2ijsm98gjzman2pnhk3feitn9vm33j901sggde7gswkjpacdlp002hmhdszt8dzzlsyry3w24whqy26j8sh',
                startAt: '2020-07-28 17:22:55',
                endAt: '2020-07-28 17:49:54',
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
                id: '2412f3ed-d085-4c94-b97e-35a7b50cc6d4',
                tenantId: '81611d4d-e85b-4ae3-9405-fab0b18c73f5',
                tenantCode: 'xo84s6sngmhgjc6brp7uwqa0bc958tocohq51f2bl9w2bg1uhj',
                systemId: '648cfca8-ad0f-4226-8784-294418508a88',
                systemName: 'sawdyhphpx0298w6u5ub',
                executionId: '104e97fd-31e6-4673-9382-1b374502a2ed',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 02:46:04',
                executionMonitoringStartAt: '2020-07-28 20:23:56',
                executionMonitoringEndAt: '2020-07-29 13:28:35',
                status: 'COMPLETED',
                name: '2a5fj310ms88oo7n3gxbe5f4fetyxj11kfcyupnt594rn7o5wn1qcw36fjietjmmtyqtqxuedj970lus84hte97hv5myegh216q6afhae2tp2unofimj6s7rq884btf3pb8g1d8u3mh90er3ljh0thll580z88yns1fcy7vmrib911xwm9w7e9ttnw71bi03jmci7guqclxl6uc5l1w3t3116pfey2qt9pcr43fhknznoq60qsm4myyw9ro0oed',
                returnCode: 100.10,
                node: '77a5c2fzx253ajrgqfzuwgg0m2fde4qdivg5qoyramzyz7gaj9vp2ddjdbt8330gyz5n04whti5vz6xn4a1xwa7pr2dkcbz3iaamhbh1md4h6r2ndmw759wtu2q5b12dwvor7ltheyciulon7l7pugs2r2yol8nf',
                user: 'zk90qzw0j45jm9ggzowez8zmylg3wcyymvvlc2bjygih54rqio3vsf0nhk6pbpg8myhlh71agnf7hmxwypkrdv7m7eders1z9d08nbrs1t0gledncsxcn3ha3mdb9gyvih63vht5393pjuenm6tudbdhi2ve4tl7yol3iij68zf8ezo580sdiwm7wbh9otopwkpe4v6640rgrhqli6mocclsqmdfip4iv0avg38860pjykvk0s040flkejl1bl5',
                startAt: '2020-07-29 01:46:49',
                endAt: '2020-07-29 03:18:29',
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
                id: '2412f3ed-d085-4c94-b97e-35a7b50cc6d4',
                tenantId: '81611d4d-e85b-4ae3-9405-fab0b18c73f5',
                tenantCode: 'k59kc9ygolb9k8c9toptazloxk4lrsz862jfbvscxue74h1i4n',
                systemId: '648cfca8-ad0f-4226-8784-294418508a88',
                systemName: 'j20bd67hx5rjj9ehgd8s',
                executionId: '104e97fd-31e6-4673-9382-1b374502a2ed',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-29 11:35:18',
                executionMonitoringStartAt: '2020-07-29 11:59:03',
                executionMonitoringEndAt: '2020-07-28 23:34:13',
                status: 'CANCELLED',
                name: 'qd3fx70yzl8e8tycl0fgwpk0labonzy8o245lqy5fo1zu6w3g5b4b9lhwkhvm41pphpg175zvxjm9fbr9ld7jh8q1m8iu0x021olb106ga5durezsdwmyam0ybk018g18s5hrkk4a2cejwyg0vgndqh97wnhqd0hxhln4wo8e4phyt8ygawt3ohc120cphacgttcuj8znua55rkqdp8u3bllw47q2j03vi3asrd413951a8555y9s0y7hcdvgvl',
                returnCode: 9390072690,
                node: 'qzwvdmry0o1amx38dsd716bat0zmvz3te17yb8wd7lvif77fkql51ygoltkb6e0m6j02nsrvnz3dg3enjbz937pcs2a38olr2u0imk2o9r4vrufemf0t8j1bgybskfjbdoac9tmcg87rrum4qjba0bnawjlm91yh',
                user: 'si07v2tex9re6prv6i5skkdw3to7ms4i4b7wkex0qj73yjfojf9mie4ysh886stbfa1p8apsvkzjap6jfd4y5s85csxka0abur8gj8jmtmauujl38atgiv3xrbijkb8z03a480klemt62u8fn9xeouzodytkmdx161mgqq2uifv17boebzzotfcq7quni9blb6jlfr77gjjycw4p9csqbwgdm3dc5my858wfnyzwun2tuyfqxudzo6cm4pa4wdq',
                startAt: '2020-07-29 01:24:31',
                endAt: '2020-07-29 08:54:01',
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
                id: '2412f3ed-d085-4c94-b97e-35a7b50cc6d4',
                tenantId: '81611d4d-e85b-4ae3-9405-fab0b18c73f5',
                tenantCode: 'h3kbojm9ne1lqustgk6zsiih7as0xsy5z4unknprwlw9e15s4q',
                systemId: '648cfca8-ad0f-4226-8784-294418508a88',
                systemName: 'fj27fs2fx9a0rka4phja',
                executionId: '104e97fd-31e6-4673-9382-1b374502a2ed',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 14:37:02',
                executionMonitoringStartAt: '2020-07-29 08:44:31',
                executionMonitoringEndAt: '2020-07-29 00:10:01',
                status: 'XXXX',
                name: '3o2gv64gab2welowg072jzetgiux083oe2u1ddbpod8n9dzjdy68gt1c0n2p3xf1xx0bb0k3ds1culi922azkd8n5kwpia3phj3sjkzmekhmpr1as336r0t4zki4bibsu4b7n488rhrlqpecgwa53ca7b87d3daq4hcoac65vtp6fu9aby8g5lzmny4il3nlb0yfaacjhhopswi5g4lkhpys6sr63ivrz8o2uk541tovxwycwjplv9q8bgfjthq',
                returnCode: 2065847051,
                node: 'lghgv2cqz3mqtfmf31eyr8q5l571eo836g14466yfjvotpowlscsxj1dxius843yy9ia0lfkff8b7kypnjy64kengbwerj7mcova62vewpz56hg2ql77mno081vuycy0rwb4rr7s1jud2qqdfqtkjn57e26jay2b',
                user: '935usxj4w94uixdws1zfkb0346qerogdt7y6bkozzab2c84vuomqbdypsef29m606ff0a54m2pbcy9e73q3vlnhr236eznce1gp085ihqflk63nz84m9o8h3qkwhtj1jzga7lzlsx5stscal40nphie6ulqnekcqww9cotmaqhg2luf7nmu79kpja0c29mtyvxfw6ocyksfru72tv0efsp8zt30rxziuz8fy67ir0gack2roob1xfrpqeyrlijy',
                startAt: '2020-07-29 00:28:13',
                endAt: '2020-07-28 23:34:14',
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
                id: '2412f3ed-d085-4c94-b97e-35a7b50cc6d4',
                tenantId: '81611d4d-e85b-4ae3-9405-fab0b18c73f5',
                tenantCode: 'ob8nyqyiwm73h35voiimkwh7d4noqzq5w9gq1n7leos9o8bygg',
                systemId: '648cfca8-ad0f-4226-8784-294418508a88',
                systemName: 'ol5mwdc1vwe7gdu52mey',
                executionId: '104e97fd-31e6-4673-9382-1b374502a2ed',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-29 08:31:38',
                executionMonitoringEndAt: '2020-07-28 18:51:57',
                status: 'COMPLETED',
                name: '0vspk67g6kg7ozmgc4jq5zoyai73t67oub4bmw9ngnshpy1k20qs28w84l3s0xnqaeu7rxccoxw3zn716adjuhkpsych958lja15i5p96vefx2zwaawbys2asyshnn2ylt6i1xicjbd5zg59f6e776ojgdl6evylwct4738r91gpgastgslhsqi1es3jicqbrsdnq9dq1azjdgh66mikzsd9qk2s49sjfmv0v3p04dcooamlzzbb5vtlgjlprzz',
                returnCode: 2832906270,
                node: 'nac3d6b1yl9tvld0od99zt9z8ms6rz2a6vmgkx8wbovnzh01okdj1d35liddidlbt4yocrut3wmnchrbyb794ygiuudo3eqk1rofdgmopltna5rrlrmujfhuixhbg0kyys43l2jkcoapuo3pa7k8z4do2iowenz0',
                user: 'livrwz2voqlm700vmk04bmyf6zdacxv7dqayqhcx5e7rymoq3uavhomeqv9e2j7fbpvr27bndj8s3z0ts5xi8rzupfueplrtkra8ge6ivck98fvev1nbv3wfoa3xb20ipom206iuf1itdu6z4dx4wor9wd0f425nlre8ruxu85arh585xil7l7nz04i5m3e7zf7f8n0gg09wml5nza67ku3u0c1t0gm6g2ltltgyjmn7ijavqgxzybsj20p2ezn',
                startAt: '2020-07-29 01:39:51',
                endAt: '2020-07-29 15:16:40',
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
                id: '2412f3ed-d085-4c94-b97e-35a7b50cc6d4',
                tenantId: '81611d4d-e85b-4ae3-9405-fab0b18c73f5',
                tenantCode: '1qk8y1x3kb3ug46ledyl4p9ftvfeqy4rm7nfk50fqn37xxbk1x',
                systemId: '648cfca8-ad0f-4226-8784-294418508a88',
                systemName: 'h1wcnr66pdrbtezoh21q',
                executionId: '104e97fd-31e6-4673-9382-1b374502a2ed',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 23:54:49',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-29 15:34:09',
                status: 'ERROR',
                name: '5w14qqudperrnxx7ar0k272hhrxcb1aotcumeezgplndnzsi6g1veadrqc8j4h9shih7sqm211txs1g9s25fgmwaz4tpb0gqzq9ir7bfh5f7veyeylhixclrda1yvvb3tbmxwmqsq7wc5yvidorwuv4hpf0knq8hfh6799ysra18htrylg6ku70eb6nr7jys6a3nu8czjhh8nchi2c394vsjpwp5ved4q94ft4g27n0y7dd5p1lfiybtgiybq97',
                returnCode: 6140332727,
                node: '2hmpl3sv67u1xdw8vinoq02joe6pef70h945qhvoacps00y4yzszy6g80sn2j7tn7r1onxkyrsux0htdoxwul2mh9x3s4zjblla2unytcka0ee5annoazmgteusbjha40zixe1xynn1vjz0ke6v6lq9mxyi4l74g',
                user: 'wduephuidzd495du6akavb4byz1ng1ncj7h29riyxociyqz89p4cqdq7mewxo6q6i92mr1x07b6ak7qwg1fdgtreew1cf4ehubi5aye5kx5mnvw7rjlm3u5tn3ajcszqe2ryy5papabzsnlmeu4hoqs11orcgrao6n1ejjl5zn84pp0ekighy1d3wd4twzpmaypsdet52jacard0deh38bszhwqv1asq3xj9m3ld3vglj9hm4gh12rn0aoyem3j',
                startAt: '2020-07-29 07:34:24',
                endAt: '2020-07-28 22:28:51',
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
                id: '2412f3ed-d085-4c94-b97e-35a7b50cc6d4',
                tenantId: '81611d4d-e85b-4ae3-9405-fab0b18c73f5',
                tenantCode: '3wrjb3zse4ti3j1lc3b0nlqb8c6n2angu496u7ni1nllhdu8py',
                systemId: '648cfca8-ad0f-4226-8784-294418508a88',
                systemName: 'x88mb69qsug5jcw3wnhm',
                executionId: '104e97fd-31e6-4673-9382-1b374502a2ed',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 19:46:38',
                executionMonitoringStartAt: '2020-07-28 21:05:31',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'ERROR',
                name: '32syv3mcnfnao8ak7kms0avuzj6n6po58a428elehiywpbgreh6lkiciz0en7qw2t0256yymrebef4crjv8shwgsdeieku6jdml0kidj7z312nx2el0caxttfdlnrme8wtoc05pcwhb7h9vfng0b2jxhxopqcjk80jg6h1csxcyqmu47oyzuqzn3mw5gctgfckc1stxqekcumamtrmixln3rldec5ntjl0hzn9rmda8zv37m3k02whifw4cfi6d',
                returnCode: 7662260376,
                node: 'zbp2fbt1k8g01vu7gsg8rosvl807nvpz5ujj13s72ofz1e6osapw21qdjtl6xgk3miyize0vnnujiyz4n4zfjieod2o8bhh8njb35rxrr7jywgh4k3rsix7wn3ga8mp00wzayi5ng74kve3j7h5x71oylgtofi4n',
                user: '0w3jjka0rn382hfb2rp1ew8o990pi9ybk8sn2ih6f0ldp4kc53aq5eoy4efyxv9ujpegq40o0fk6kg7i0ue5lkf00vfp88qgwwm20x9s7o0h6dlib0wnr8z3ujk7pv04bhuu19xk8ufcjcj7iu4wohvegjeygpop3xv01bgsk0fu08i1psb65qexaw7eyht723u31ykrs7qm7fckoctuwlvhav3rrjcodcq4wo9fn054bugq3hdurtrsrs35cke',
                startAt: '2020-07-29 11:33:31',
                endAt: '2020-07-29 03:46:46',
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
                id: '2412f3ed-d085-4c94-b97e-35a7b50cc6d4',
                tenantId: '81611d4d-e85b-4ae3-9405-fab0b18c73f5',
                tenantCode: 'o59bfph237qt75gorw0wzp3a1sktltlcs05x9l1d12ib4yd7tm',
                systemId: '648cfca8-ad0f-4226-8784-294418508a88',
                systemName: 'a07luw1977bc4nuqfr5r',
                executionId: '104e97fd-31e6-4673-9382-1b374502a2ed',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 19:05:01',
                executionMonitoringStartAt: '2020-07-29 02:51:48',
                executionMonitoringEndAt: '2020-07-28 21:11:53',
                status: 'CANCELLED',
                name: '64yoomimrggg2bbetpbg9khn1xvcoupba7mbjfauwqk9pzlicz64ijpii5qvn578tgpizp029fpnw8no2iitqykkqi1rwsgfti1zokd6qz5qo7a1ji3a2ffvvq6mpsaxr3scpwmso0vv3vtdgx4nd363gko7zvto2l371sjyvew6q98vlrld35sxmv3ekel8mo1hmhs005a4h3grmce5y673laps9mbs5uec3p015eoey39ztsh9swcunuvgx3k',
                returnCode: 1602663987,
                node: 'oy1mefzc54foepscz8gd1dvbeqk90kobhnxlfohgzdfu3l4of036t812ax2ouuajmvonqdlyttskbyd844clwfmc403ubvk1rrcizp72svlei89i05hyc4mvkc9a96ue9vcwtzpgx69t1p1cl8vfnvkvvpmh6ce1',
                user: '547wtaem1n9ncr365g1yv9k92ztqtptrq8ena6d57be3sap3431od1jaxwdbjem2pl21qkde76s7etid4awal1h85sxivbqkj84nll8aoks39oul8hg2u0uunzh1i5p8dj7o0c9qpndvtlp3coz8e5b5lens4x7521aqz6l6chp7zq6c9tuawsow73aub9akbpvidme0e0lerv7nxrdwth7aow9vwpiyu490q4iylevo6frnpyig7g4segzd8hi',
                startAt: 'XXXXXXXX',
                endAt: '2020-07-29 08:47:58',
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
                id: '2412f3ed-d085-4c94-b97e-35a7b50cc6d4',
                tenantId: '81611d4d-e85b-4ae3-9405-fab0b18c73f5',
                tenantCode: 'ulttu2bpabki0rjiidktwosj7uutnhk0ywzk99x8691x0z0nju',
                systemId: '648cfca8-ad0f-4226-8784-294418508a88',
                systemName: 'v13zmzl3y35l8pfb2fg2',
                executionId: '104e97fd-31e6-4673-9382-1b374502a2ed',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 17:38:31',
                executionMonitoringStartAt: '2020-07-28 23:33:18',
                executionMonitoringEndAt: '2020-07-29 07:22:47',
                status: 'COMPLETED',
                name: 'dpy9qf88l6i75gr7mgct6utpll896bf7ivsseokvhn966v04nl9thkju1yuz05q3enxyinzrgp4yqdeid5m75pzlj14cbu7e489aeqmrqel5z50nytte4qoep77etfsizx98n8jlh6tv7f0i6sio5x3m5b5mkysq95otbs7690xvsj4zz96nm5ny8eaq6eum337xkag2dcrrn4yvwhncin2whekque19wamfmxvqprun2vxbeidhi7wyjb3bnwj',
                returnCode: 7174575543,
                node: 'g8ml44lwymydq5ux5kvnhuiyawp5h5xtzymcpjtxsdxyfv1m7a907uciog9c1t2qfatvndjutthj8f0dwi39zg4sr7x3du99wc3465xublgj7mkgopj1orzuynrlt7m982sasktvtnzgtepgtman6deu1beaio7a',
                user: 'z7l3lbtr2csxtnspsw6y8awg85it8hvki52j3pwfjr548whb28c38s810p6m2ybuv80w3e5lh08zo3z4c2cplfn5nu4z8gbkid6obg13e5138gbexh1ci42f6leucf0qi0slxn99f2jshs3kidb2mkkdbf24iufjd3mi36ijwsbdw5bz3ptkezkkg2u3hu0hd3u0eax2l3fkfhtm9inkej69hhacqzlw4l8mkfj6vvqaxwvq7abo6wnsc3718ik',
                startAt: '2020-07-28 19:21:44',
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
                id: '2412f3ed-d085-4c94-b97e-35a7b50cc6d4',
                tenantId: '81611d4d-e85b-4ae3-9405-fab0b18c73f5',
                tenantCode: '2ufm2xnld8gbaqdt61r350lzw040wmtn4j6scd28ektph850du',
                systemId: '648cfca8-ad0f-4226-8784-294418508a88',
                systemName: 'y0vwzf0n6e323uuab9fa',
                executionId: '104e97fd-31e6-4673-9382-1b374502a2ed',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 12:37:03',
                executionMonitoringStartAt: '2020-07-29 05:51:20',
                executionMonitoringEndAt: '2020-07-28 18:39:02',
                status: 'ERROR',
                name: 'l1aqb8cdebdw2fwxsxepbih9y6il2rto8qkefu4e27i2yh75ddov8lrqtdkcrg1ig8jlghbfymnfmagx78os9ma6bajq3rj7y7wvl98f4941ggxg0aehgjb0uh1raczqjibo401i56orhgd9gmgmpw2dd2os13btmez9mw8so7xyjlfdusm829fuq5jzauddjiwgmn08vquxdreanb0ccn5anhexyvrs8rvhaefxqsyv7lx3zekzta1s0c3kmoh',
                returnCode: 7570609140,
                node: 'a0gi1vy1bkaujgtceaqq3picl2c0qmym5zs9c86lc47ipprwdh9gshmgmso3dpkorbou4guj7g0fk8u59lpuff090725uoo9o2164gxjg3uln1nfjwomiautcrse6pfbsmyhp8qpgj9mop7l5t95ss43hxe0yl9l',
                user: 'ypg9zsfxhuiqklxhuq38klyq89ozalz4yixt23f1olagtjektqn1gfqz7mtnf4gmkfa1g8s84m2ukdeumwtm8iunucktiokfhaf4f0ssf5zguhmhg6e3xeepos1sokdolwmpzaiyugk3jawh0mgdsrncb4ox1unmxk7shqitm1lxxpvn5l3wwkfwb7pm4cx2uq4dwduc2zocmbghttx1qmd21uk3tr9j1yn1v3a3i3kzc40oxd5sh6n586kamsh',
                startAt: '2020-07-28 23:21:07',
                endAt: '2020-07-29 09:12:33',
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
                        value   : '2412f3ed-d085-4c94-b97e-35a7b50cc6d4'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '2412f3ed-d085-4c94-b97e-35a7b50cc6d4'));
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
            .get('/bplus-it-sappi/job-detail/2412f3ed-d085-4c94-b97e-35a7b50cc6d4')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '2412f3ed-d085-4c94-b97e-35a7b50cc6d4'));
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
                
                id: 'a444d342-373a-40f7-8036-30b860e78bd5',
                tenantId: '02000d2b-515f-4dbc-8ccb-4c6fb020d6ec',
                tenantCode: '7sfd40pjvuqrl6b4osdh7k73678xjk5dj86fmg0qgayd702zf8',
                systemId: '36c8616c-0573-4e70-a985-685c0ca13395',
                systemName: 'hx6se090rg2ykc7nfctl',
                executionId: '642a4f62-a819-4452-ad88-8b9079dc499a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 00:03:34',
                executionMonitoringStartAt: '2020-07-29 03:02:39',
                executionMonitoringEndAt: '2020-07-29 05:14:08',
                status: 'ERROR',
                name: 'm2oy5fp5p4qyfm0a0pq1bd4lc95xap9bvzj2dr5xg4pz39htvc5653nomsr3v5q6ht6w378d98l6r64abbi94case4liek1rxhkmh3kqq74rzc3m5a3cr8gvuhsaveauhhnk528lagz0d7s3lwnhidjc1qpv6j886bk69fxtj944nx7qta2xjq6ui9ijawuvju9ziwwrksrwhmeryc6bfyf7qupsmerqcoajt5r3d7x0apz30q36ul6jisuymbt',
                returnCode: 7702441505,
                node: 'eq5mmt0ml60fvxhmgu7eevyer8f1zv5e0ymyelbluhcmjz096wj8c4ernoo9zm5tu3q29uhoj17hmc2tobvxs72q7ylr75l9xin0maslw014u8yr2ubu5z9lnujtsr23pg6qhbdwkxu3kj9vj4n6vwsc46nu5a3d',
                user: 'uuxqx2as5utsucm4er1fpbrnkouewpmqyomilyo3yawbusmgeu656ccxyrv1dy4ipiiqcrhwiz7vtqlf5dwfufutwsy9vr99ebptv4pi2hrubqxb2f04w1yy4edfcr5457yi0nooykg56kap1mkkhut2u6kh21pq27xri2wa0mele1jhv4vj1l0322sq1803evzkoirf2pnrxfaim03iijqcqwnu0ldg26uvlyjwsps47gxxyfiig59nl0qs7sa',
                startAt: '2020-07-29 06:54:40',
                endAt: '2020-07-29 09:11:18',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/job-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '2412f3ed-d085-4c94-b97e-35a7b50cc6d4',
                tenantId: '81611d4d-e85b-4ae3-9405-fab0b18c73f5',
                tenantCode: '89j835hstwirz5rcnjjcwrrsbgha1voy0nz8w1zpqghhnnfkdg',
                systemId: '648cfca8-ad0f-4226-8784-294418508a88',
                systemName: 'ocesc92io1y560g820o3',
                executionId: '104e97fd-31e6-4673-9382-1b374502a2ed',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 21:00:04',
                executionMonitoringStartAt: '2020-07-29 15:20:58',
                executionMonitoringEndAt: '2020-07-29 08:16:38',
                status: 'CANCELLED',
                name: '15lhc49ikjr0lwv7i04hb0mmgqtlplqmw3xb9mu2fmv0m9huxdjafv0cf2mhvvsxkd9qblipxbfl3xx5pvekhv3osgc5ireen32yqe9xyv1pwa79edm317g11n98smf5cxsyksivh9uabj5y4ew7dqocjhe4xm4dnobt1wtogbubctnlph2stiew30c1q5j245ydt368nxrvhxtxo0wot6ppde3pxlxsr4lr1t96mhzu586r5hp060ckzuff4x5',
                returnCode: 5859302352,
                node: '5kdd72r8ozirzvbdu00uavhby96vfi7bw9hkaw09nv5wb3hp86bgcvyzxs1vna1zg03o10el754t51ynyvr5d4c1w7b3oqb0jgkzapd832sjho27nvyz0xtecnza9xoazuhf4i98ipim3p5qprsgjjewkjlz9jls',
                user: 'kynk0t0vvoq9l739n04an2p2tugh18i4tpedx3ihltc2xld436mtrkofsaskwv4hgsa08ceaarf2x4ut3rkdjzzvj1pk91e3r1ditxvdhuu0kwfmqp52e3tm181yht69u0n26da8xhmazkiu8nyuh99t8t3txb2notamd1cyho2mb4w0622s7cldzfg18lzzjzouevjality6ub75y5a6b7tycthm2od0hcdw9xkdm83gezacchh1mjgdn7xbku',
                startAt: '2020-07-29 08:17:10',
                endAt: '2020-07-29 00:16:03',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '2412f3ed-d085-4c94-b97e-35a7b50cc6d4'));
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
            .delete('/bplus-it-sappi/job-detail/2412f3ed-d085-4c94-b97e-35a7b50cc6d4')
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
                        id: '6fb610d8-3a97-4dc8-ae4e-4f54a3d768ee',
                        tenantId: '81611d4d-e85b-4ae3-9405-fab0b18c73f5',
                        tenantCode: 'gctw1oujg953cmukdbcbm1ztv32o7qlbg7c3pjtd6muept8s27',
                        systemId: '648cfca8-ad0f-4226-8784-294418508a88',
                        systemName: 'ixamuygl86v9roc3t4pc',
                        executionId: '104e97fd-31e6-4673-9382-1b374502a2ed',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 09:51:52',
                        executionMonitoringStartAt: '2020-07-29 04:16:51',
                        executionMonitoringEndAt: '2020-07-28 18:49:00',
                        status: 'COMPLETED',
                        name: 't0d8ysmvpm33sbnd60kzx9ocsdvjce3wajomzffr7jydp0woovwd2kqm00gkup52cp0lvrtp6bnb42xk6b5uhn7ckjuvp2eyi2jq4we917vefm8h900zycvr40cx5tykldpwjilw8tqzb9n0iwc1b5ktltcfnic3twdq0l6avgowauflvdbeizz5ubmmsm5dalsj7tmpj36w9r675xjrgn12h0iu0vk9i1obgvkqfhc41xtq8pch2cov22f0ecd',
                        returnCode: 7593933195,
                        node: 't5j6dewxk0rtad2y4sghdra23ddg785ajvdzkzuowin01og9fb1yi1aqdlrcpcq561p85vw8jklql9cdi88qpmks7yrhtig9s0zqntl0wh5ukqqqxoe3vuxh6jd59war8v58ysz4qls7do2cp7ief7fq5e6e69ks',
                        user: 'mbyl5zgeb9bgimr3u8ua9fyg1ed4a9q8eginc50mo6j58pv479gr3meukod40nxs4jkg4fffj5kuyu0dwqtzqly48dkscux46kfbxshsvv3hrzswdkkh0nyr8txzvmvfrtqf9iz9ovdyzl62lbuo18ok48e0hnwsw7uezeoxd2vu4aufrvrpdpoug6l7a41er1t3ijqxbasafy9siva3fvl9t3jbayj10nhccyp5h067trfdsb48f5fdw0tqsns',
                        startAt: '2020-07-29 04:26:34',
                        endAt: '2020-07-29 15:42:41',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateJobDetail).toHaveProperty('id', '6fb610d8-3a97-4dc8-ae4e-4f54a3d768ee');
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
                            value   : '2412f3ed-d085-4c94-b97e-35a7b50cc6d4'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobDetail.id).toStrictEqual('2412f3ed-d085-4c94-b97e-35a7b50cc6d4');
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
                    id: '2412f3ed-d085-4c94-b97e-35a7b50cc6d4'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobDetailById.id).toStrictEqual('2412f3ed-d085-4c94-b97e-35a7b50cc6d4');
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
                        
                        id: '4c4b170e-b35e-4e9c-b7dc-8c9d93066ee4',
                        tenantId: '8b16a623-7dad-4508-aaf4-96e4bad3b196',
                        tenantCode: 'sk04ipj7jig7wphblnclz09fqd571yiocqd59qg4wyyv39nf0g',
                        systemId: 'e81ae6ee-b826-4699-81e6-52180434f933',
                        systemName: 'euk5uoacjb332t1iovke',
                        executionId: '3a281169-de72-4a6f-a6a8-5b76ff5e0e46',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 01:44:46',
                        executionMonitoringStartAt: '2020-07-29 13:27:09',
                        executionMonitoringEndAt: '2020-07-29 06:26:41',
                        status: 'ERROR',
                        name: '81gwpug9z9b18dkr19t99v6mhd16iad0qzzomy82aies6kl5hqlfk3ul5opc513uge6mlznygorj1sy1lcswpzh5fdnmei7by30zyiisbqafetd1aukf7n3e06y5iyls0ym3tt4tz73vjh4qa14gi1s9s3v0sazktimps66htafz48kkxoconqypxsc71gmd012kjhm3ymi0gdl4k0j6i0987zi1ltbjkqht69qifu1ajvk47ydkc5ei8mm3u22',
                        returnCode: 1146734266,
                        node: 'cp934q77yxteamcr4k41n5b49wv3wwgfpmgymcm6v7ma8ywu558vqo7whltn1cwsj0qtibtvbv55b5fhqhtnbqa06mph83upg85lisaasmj1uuf41sjouf6k6huix2uy5vs18jilqqlm4l359e04r37nvvfyslqr',
                        user: 'jzsz95cib0q0dvm8ns4ttdo9awxi2c3uf6o5yfb0wti5kw5at1jfho05nin6oa79sq04risn60cf53gj243gmwf1z037gwejqg2ohqyosxob5lhueoy4zpnc8zcv7je4lqt97j3w235v2mcvci85aptxsxh7vlhoecgxd9auixbbqkz8bzf69iyzg8vdn5rk8f1p4tvjzatp7ot9mgywmhhait2tqxstarhgz0twlhexbvdfk81k2ild5lx1vbs',
                        startAt: '2020-07-29 02:12:10',
                        endAt: '2020-07-29 10:49:17',
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
                        
                        id: '2412f3ed-d085-4c94-b97e-35a7b50cc6d4',
                        tenantId: '81611d4d-e85b-4ae3-9405-fab0b18c73f5',
                        tenantCode: '2rwp6iglaazoowhtlqnvgihnk2safthkmivsriq9byxb3cmulv',
                        systemId: '648cfca8-ad0f-4226-8784-294418508a88',
                        systemName: 'j6bgzchanlfzwgr8avfs',
                        executionId: '104e97fd-31e6-4673-9382-1b374502a2ed',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-28 18:58:21',
                        executionMonitoringStartAt: '2020-07-29 16:27:55',
                        executionMonitoringEndAt: '2020-07-29 06:03:20',
                        status: 'CANCELLED',
                        name: '4g95utpg6r696w82uixnxq43nstctyinhxu2o5ctltxh8xjcbyzcw84qpn6vxku7a5tkftk08gphaes1yv227c9r0kkkhjt4cdishweb5106h9wsfjpesp71jysd706vb7ga3ylnghc72myq861863ue1okrrglj14hxv8ujm3mwj7c0oyjq0dpv7tek3yw5rl3x1seq5bruug2j6k66wrkipcad983ak2m5l24yxggoy72hgw24vxernrcj7hn',
                        returnCode: 8986415171,
                        node: 'uz0ow5hmp5hgzlv0arrtl148jsdc4cgh744skffjyv5zkdrltttad5kh17ntu8seaj1xjvbsvtazk7s4yqbt9m1ir8ngmgv5j84q0q66o15z8fh6tquqy4vp3jzqsgol9dfd0d9mduq61t25zwnhmegqbrl2hby1',
                        user: 'l0s81t52nr2u0somrdohhpuucofn3winkhqlcyxqkrqpgn8ib8mrqcofx2iem01f0robf1tav26lae4r9p8uoyddp7n31bxqxzpy6lkb2nua0wm3eels1dtcoiczpoxlncuofq3r5s4k7pd8nq02lbmjsnnn7t88nmfcsf2kq366b1sjrec68ewr9qlc7ozig2et3zzqbsd9wdz2mi3cf9rvvxinb2sfmfw2d79dbroap23idtz6xmf6ofhlfw8',
                        startAt: '2020-07-29 02:20:32',
                        endAt: '2020-07-29 15:44:24',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateJobDetail.id).toStrictEqual('2412f3ed-d085-4c94-b97e-35a7b50cc6d4');
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
                    id: '2412f3ed-d085-4c94-b97e-35a7b50cc6d4'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteJobDetailById.id).toStrictEqual('2412f3ed-d085-4c94-b97e-35a7b50cc6d4');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});