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

describe('job-detail', () => 
{
    let app: INestApplication;
    let repository: MockJobDetailRepository;
    
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
            .overrideProvider(IJobDetailRepository)
            .useClass(MockJobDetailRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockJobDetailRepository>module.get<IJobDetailRepository>(IJobDetailRepository);

        await app.init();
    });

    it(`/REST:POST bplus-it-sappi/job-detail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '31d05bcf-646a-473e-b8d4-f5d51a8a8af8',
                systemId: '01e70663-2b70-4307-bd12-550eea966a57',
                systemName: 'a2vgirrrptwuc4gyfgf4',
                executionId: 'da856aae-21d0-4401-9221-57022adb2202',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 15:32:29',
                executionMonitoringStartAt: '2020-07-15 11:12:48',
                executionMonitoringEndAt: '2020-07-15 00:56:57',
                status: 'COMPLETED',
                name: 'mlls0egcrbq2l9s27o3a6bgmttvjzzylgo4po3uvgtsul08zt9vjpipa6dhhwl5rb0e9gca1ezr9iwf68qj3yl4uc9x9205vqioe821qxgzw4hujciv2jka4t5zv0tv31yrm138bvwa93rxv48xo9go76agcw1ukwacimamuskzj9mjv5l1wofk05408383lk3rsi05bptj73u4xv6d8t2dgbmap14ivyrgi2q7wb7jvyl69qxfzx1kvral3363',
                returnCode: 3608248876,
                node: '6w5x1fzz95plairjz8nhtqslxp704730bppmoy0l8lrkbp6zobx90n7p4u31ww4g8aic15k3xd1977rzpuqyxczcax1h8cfcyf85a1ddmuwab86k310xw8fn972ifjadttf9ta79inmollq3bddqeom5ytmlm741',
                user: '2bs47hc38qqa5lpoij5pns3528qgfz4udsxhs67caf4na3jl5dd5jlrl47u8f7n78wef2eco9chgaolsdd8z7nb91ibxhal5o5k5ynuhgkmj47buda2hhhz2r4at8s88a11gnho4948pqzltao7wytzpxlu1usulq3zjvcycr2os1vbjlm5f7aqepp1io8v6ro4krorwqlp8axkek0y81ise6lleibj48epkc4oj1n2mgwgsmdgmsm9wxavh2if',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '31d05bcf-646a-473e-b8d4-f5d51a8a8af8',
                systemId: '01e70663-2b70-4307-bd12-550eea966a57',
                systemName: 'td0rmu30uijdnqu0f8s4',
                executionId: 'da856aae-21d0-4401-9221-57022adb2202',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 04:47:23',
                executionMonitoringStartAt: '2020-07-15 04:12:14',
                executionMonitoringEndAt: '2020-07-15 01:53:53',
                status: 'CANCELLED',
                name: 'am5cdm3fwq9s1yq3km1e680wdgqp0edityv43kjk0olxg09bwhswm2r26g6d8qbnxh6i7h6mvex1oaeoh17iz4o0owqbq9gwovlkc6z7cwhzjp0e1098bb6diq4so56agspcnlwz7uxwn3nqcva9kb5wfjarjb59o46zvq80oyn2vdqvpg5up15rph7rholmdbblab8s9wzswaa9h0yaha0gz5kgyxe82t9gom8figpadd5r5crmrd7csojp2n3',
                returnCode: 5248864744,
                node: '9klirqo9qgerb6zqw1esnz6xnr8na1jcn4sir0rai9vu3rn26q8pw68geo780ki97wpy4mndmiys6hp8e7l9q1lqdq4x1n8yw3duw4rcjkrqhpqo3eibmaz8qdzmzovjscmestxcagw5wdnyvhe9okdlpemrck8k',
                user: '524bcyk62rbmdkhy8rb7jp9cia4rvfrbcvh4b385rr8ooj76qra3r9dpq4nwce5my854j8fmh79565cmonr1xfra49im78a9zqszvgjjs40mzxz33hb8xggqvt9lk8sjau8o0atrei0vhihxjg6cyco3bnldf7a9286mjcs02nyadpd5num5pw6n134qduig0gakxijnnioszqlonk00kljpyt9n9a8f7ovob5z6a0jd0e2ziriqtb4jxaa1rce',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5ace48ad-32c4-4b97-ac98-bab9c6671545',
                tenantId: null,
                systemId: '01e70663-2b70-4307-bd12-550eea966a57',
                systemName: 'rpxdkpl5s5n8xi230i3q',
                executionId: 'da856aae-21d0-4401-9221-57022adb2202',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 10:18:17',
                executionMonitoringStartAt: '2020-07-15 07:09:40',
                executionMonitoringEndAt: '2020-07-15 04:07:10',
                status: 'CANCELLED',
                name: '823nm7z9oio4y49nrc1krqxqd88x5n7tf00xeo878904hig219f80l73ziqcrdgnd3euyykr7rp183bet6k9rxla6k6u37ai5mnwd8ig52tsoy1q2ffwtbdv9gejx8yancik6xc6fhybl86e9zdqx34g99a3f6zhjkoukoomib61a4uehbq07h56fdztkoyymyp0np7zf4w6opqiayljrg58dzlr2ig8ea7hilmpc6v1nnnff5qeg7ikesr5kr9',
                returnCode: 7427589433,
                node: '5ujq9tnkm7erxw3o57fal9ejej8qmjaf7cyddjz383ozi1e479xnknh7grezgjjr16k2z2fzmv4tugcqnhm4fnbapskhruez3yovfux11cj4ot6wnac9c9pw6styj5f23sg8h9f87ch76x5vx0u7a4rbvs9zjq4f',
                user: 'wdulftmir3v1fo4r472abyjrqg8yk15kkm73y6f371y11wnoyy88yksde0t9eq14ud860ja02mmrb0poqbvcvk8hug1256ugtof7mdvjh40t88i6icibqzmfjlc4go9l19wcblu7e7vyenown1w2waamsz0rfp3au4s8oqsoeno1jc9zuj8s6bs3cf42emoppt1hhz0y3j4n4s2ovxk0af5siidt29vmknb8e5r9oqp00s50vw8m5hi3mb5igxv',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailTenantId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5ace48ad-32c4-4b97-ac98-bab9c6671545',
                
                systemId: '01e70663-2b70-4307-bd12-550eea966a57',
                systemName: '1o4aptbq1d75gmbwjqzd',
                executionId: 'da856aae-21d0-4401-9221-57022adb2202',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 13:18:29',
                executionMonitoringStartAt: '2020-07-15 01:55:52',
                executionMonitoringEndAt: '2020-07-15 00:21:54',
                status: 'COMPLETED',
                name: '9iw7elnbuqdjoxeq1iyzdptze4wav3n29orqdf1jwv88deqdo9tu23i5uaagjdk7nv3m243i0ppslwiqoil8tqliqy0mhzuiijc3dyivris8tibfurmf1b9qmdjx2aqan6wneqm201g9u6rlajmrbnll0hivgn715xborn0rb4u2v7bssv1wgmfo9j3ctwhui2m0ycmjf6u1v83e1p62g1n5w77j1skk7wuj5byqyeg9z54oxlzjr6uz3r2k7a2',
                returnCode: 4941066405,
                node: 'e5iwlyns3uujvzl4ciwsbqdzybc6ha37llofv9ek6kn9l8wpy26s1iml8nzx3t603d5w1k3q4t2pixymvg0qm3mowthctlsbt9yothdv91355hn8iuobv3npgotl7orelb149pxoosjg7piwxkeblumgpq33w5xh',
                user: 'w1xma6b6mstoaenu97u00c9llkq7dccezgwhhuaukocizza4aavb91lb9syueezm4vv1qkkrhpcmwnis2pvq8plk78fir97xi0l766n7kqlsktru743w7iz57wh8lxrv8hpu3903em1itj4nnlsw5huka3cttdq08hemkwigka3den90zn9kzrjnnm39r5ya8njcvcjvyajiv8dvpv6wu92tbv7guucwqcxf87nn8q27vum01yz0o0q8514im7v',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailTenantId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5ace48ad-32c4-4b97-ac98-bab9c6671545',
                tenantId: '31d05bcf-646a-473e-b8d4-f5d51a8a8af8',
                systemId: null,
                systemName: '4yrsn2tz0c52wxxfb2r8',
                executionId: 'da856aae-21d0-4401-9221-57022adb2202',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-14 19:49:34',
                executionMonitoringStartAt: '2020-07-15 18:21:28',
                executionMonitoringEndAt: '2020-07-15 01:13:59',
                status: 'COMPLETED',
                name: 'pmv5vivdfl70dj9jircw0vyrlklwmhbit32y9zij0vttuo00zihsnwltbi4f8jkchpxft3t6dvy57ou6es50bjnhnuc1vnuwz01ja931zrm7jsrs570ai9vd8qt90ncdzkm30mpud5go4jrbrn4tpg8uhwjso321it5eb0ltxd1yrl0izz7gcc74cbt4mp4cl0zwxlflg2gizq5endtl23yj0nk7lmsy1jc59mbzrss3wm9oscxpnh2nzq6np4p',
                returnCode: 8280388523,
                node: '940uufnggffrr2k4x886z280oyyu4s9iiy6llt8u9754mkyyhz4gszimxhoese2rwfvd4sm5qqih1sf10jlkkred9fssqrj3pnoztogv3au11sret1c66xktc1z8003gu7cfp1w7uz10zzd88o23u8du8v132v6f',
                user: 'bto4ie5siv3jiskuualsvooeqqqya88yvje7i2wwo93ivh0cr7kdomkqn98tvr4djcpa8qealu6ker0w0keln0op9meptavcaqslddpb1ox15926qvc51jlhoy4j5rx10dp9gi886r6nv4hqa9538oxwlxirjw1syl8q6qopc7fys67139j7nxn2yvo52d8c6la5uvrx760b5wnsiuy3a86gbayr9rjmjeth0phtwlulqp1pu6lgy7nyu7lpnpv',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5ace48ad-32c4-4b97-ac98-bab9c6671545',
                tenantId: '31d05bcf-646a-473e-b8d4-f5d51a8a8af8',
                
                systemName: '8xbabapggk72or868usv',
                executionId: 'da856aae-21d0-4401-9221-57022adb2202',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 05:25:55',
                executionMonitoringStartAt: '2020-07-15 00:00:43',
                executionMonitoringEndAt: '2020-07-14 22:31:40',
                status: 'CANCELLED',
                name: 'wj1ehkxlsh6ru4435ytdipt3hcqgdcwfwpngo5wadevx2w2kru8v1nkvjcaxgchjwp0p4b8cgykux6qb3s5cv4molkntsolshtbp7la53rwr5zl7fybzq12rw572wzsehiiazn5x399jvtvfaav5bmvmflr2uyf3mgoh68f8wn0stxu1y49yg2fbjzoz6c3mtpu6qcxorwbwf1trs3399flnlcr009ds5ckiwd0yfglserdbpuy8a1fdpfjyi1r',
                returnCode: 7994525127,
                node: '8q4xtlhgrjw3v9lyx84fv8o9w04jfz1ssttrlpqrebx7l5km8jc311fj6bijeh05gse6dm87rdvm5cpzab4u9l156usovqn1cmnojjhtjas49pgj282di3imvi7yf27wk0ic2semizgjg8rm4o7ma0gtm8cj4rxe',
                user: 'w3l5ag170ibyr364cesh0c7ua3bwnvst1xlw9nq4l137op1xtebz37c5402ym74eyjkboltne829h9mz79i24eqd5uvj1c73erd4vyiu5ddju1pyu13vmazwsulvapu5qjzk31nbwpurisiiljnpk94tp73ln6h0hu552j5umvfjdveowhunxbbkxq2l22h87ocmdtzcyi8w89ydm0cxs2iqmnu6q8e8onxj45uw5njvo4vgblg75ze655vys0q',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5ace48ad-32c4-4b97-ac98-bab9c6671545',
                tenantId: '31d05bcf-646a-473e-b8d4-f5d51a8a8af8',
                systemId: '01e70663-2b70-4307-bd12-550eea966a57',
                systemName: null,
                executionId: 'da856aae-21d0-4401-9221-57022adb2202',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 12:58:40',
                executionMonitoringStartAt: '2020-07-14 21:39:50',
                executionMonitoringEndAt: '2020-07-15 02:38:16',
                status: 'CANCELLED',
                name: 'koke4mat1ym9kgcc45fvxqpua1wd213esw0ktekycm3llec3qq2kj8ow8vpwhlv76vo9m65968pm2v0ee6w1ikm1l1k4xckopyo6bcdjifgt5ry5abayykaasnvo5b1xvgh0q548r4kxh0rn77x6tzl0h70hrxt11ty0mtjw582fdvlz6qmgg1pmren7ju56v7ul4gr2z6iwoyehzp32zwcio7bmpncmuitcvffzwgnr3et97sq19bjav6nwrw8',
                returnCode: 7680579334,
                node: 'bq8wz7t1si2yqtdv0jepu8p5e26oxi0smtu7cjniqgr934ch7ykxkximy3s9wplazcvql8ul1ko5oehghrr9tm9v131j48pzauw2juaz0dwrk6mq663jao17ctqb66dttcp81dpdaj3gn0uzd5oh4bqw1rvrhfes',
                user: 'csc7zzr48o83hjkwbsnd0xeoccnn68hpgxrndes624l4mnrytek6fe0do7shbs4edlrukslvs64tqq0pqkxvayzu3lf1byor7xaae337719jd1en9o4vty8lbbvd1lz1687p04zzsj6e0pjiym5p8zt5s8pcsfyqx4gkpu3qebbywjqzc39jkzxv70uljvqpjzriy7nfvv4ve2dq0oz2j30dgcuarcs90pbmkt0eb9clux8fm5sy0a0722kqwul',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5ace48ad-32c4-4b97-ac98-bab9c6671545',
                tenantId: '31d05bcf-646a-473e-b8d4-f5d51a8a8af8',
                systemId: '01e70663-2b70-4307-bd12-550eea966a57',
                
                executionId: 'da856aae-21d0-4401-9221-57022adb2202',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 02:42:36',
                executionMonitoringStartAt: '2020-07-15 06:16:31',
                executionMonitoringEndAt: '2020-07-14 23:51:57',
                status: 'COMPLETED',
                name: 'm5lnn8fttc718afz6kll09ktj9464fla8dpa6p53e02uyrp9gazwsoar9bf4i19wyq1moiosr23bpdsfatbd2wvwsti1bv4w9v54x3ke6vd2e7p5n3lt0qbbiv4zqhcoe718wngl5ucq6vuxpsz3r015f8m63k9juezpdlvxt0jjz1bielphs9jobolre8w4b3s927mpnczv58ixj7fgr4n46zcylra8nrt694l9uvvh6iq00b2285bg7ytg0fr',
                returnCode: 4465047693,
                node: '4f6ycfv11dv0nbizqtqsthxlasl8qwvuujrao7l9lndr22lb45x2inls4bevxiwk0n7ao9s301yksrrdqugdndbvahuk468z77iuqzsa0htyc6hyv3l5bjhovw1ljn6xxdzn853k0r3i37p9773y2wgodd7ylwet',
                user: 'hgu52zeevx2v79ssv2d7b8ryof68mp53lokdr5kuno4znmj8kr67r7wf5y2jdt9u3lrnw3y4v0211fixao0gsvkti4svcuefootvrsy56j7fwuklxt1x4vv1ilk73qbzvnkzhmy58gsfxoosie9vompo4zy0yvj8tggd0heqh98ids2ec4pw3mom8vgk2xfeiscj5nn5t0z770a4yhoq432v0krlfmnyzdax7o4fhg5lfpl0tpv4zde07j2sb8q',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5ace48ad-32c4-4b97-ac98-bab9c6671545',
                tenantId: '31d05bcf-646a-473e-b8d4-f5d51a8a8af8',
                systemId: '01e70663-2b70-4307-bd12-550eea966a57',
                systemName: '0l7a1xnh7nhu38kddv55',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 05:50:08',
                executionMonitoringStartAt: '2020-07-15 02:40:04',
                executionMonitoringEndAt: '2020-07-14 21:37:06',
                status: 'COMPLETED',
                name: '1y81gpepd7tid6qwvqzqpg1u6y0e1vjfw9asc6mxxn11qa4j1pejnu7y64ab14gwwl69w5gfyojicjz9i17sg2n1ekoeqk194u6m0wjvf1k2c8o73rys2qui1gpbzfsqz0gydlxlg6dpx7fn7det82yq91c7p9sxaobf4cytnuawq3jdq19xvzovhjml9mzfjkjpi71m954wrjpbh9e2z5vubx0j3inqe2nngskbu3l3b638ogcwcs6yb9ck8qs',
                returnCode: 2977254729,
                node: 'bcejyyln2lkix04e1u741c43t2qx3zrubuamvlpgpop26v13yan6uggeoyenya1u2dyj22qk3jjjd42zzveop9jwms6awq5zs260jo3aq3s73aeuk8gqg8x2uhrwf59ron6dekcshzqtyt37pi36xv8kji3g2aih',
                user: 'rk4crwf08d19x6gdtah5127i9if85c2uxmc34c9eyewy386qw0wesmt8o40rkkwuxri9as2bjfux4wnk249k291tq511a2317fmxqbtncadxctqnuszyh3qgybcoltohjade66g2yq5hd72se7mrv3rzn9u5m92memksh23zalhv2nn01kvcz1rbuyhlzrpn09ldhtslwqhmak6s3vuuyaftb3q60ob9r3dvl6wgph2kjp65qw6bshgfbxoj8ec',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5ace48ad-32c4-4b97-ac98-bab9c6671545',
                tenantId: '31d05bcf-646a-473e-b8d4-f5d51a8a8af8',
                systemId: '01e70663-2b70-4307-bd12-550eea966a57',
                systemName: 'o6anvhoqlgm0xfv5xgjp',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 06:57:06',
                executionMonitoringStartAt: '2020-07-15 14:27:41',
                executionMonitoringEndAt: '2020-07-15 14:00:07',
                status: 'COMPLETED',
                name: 'uotqnx4u223ywku9zg9k6faqddjoz0vakd7wxtygo17u12uj0rg610ibxucjgmkrp8wd3ivddr2w170zh13sg4q96c6lp2icsttjpsd76hzmlgmggfbmt073hcjddtdjh70wj0o4ignazq2aspqd5zpzfizwskiiv4xhzx6p4doupkaglvl97mry4r4iv2a3vprhjzsbjohxbe09xd9o0rnd04kuug1ukgj9g0b0gq02o5h8q32wsd8tx9dh53a',
                returnCode: 1702853008,
                node: 'ibt5siyqj3mnr27ce8m9f0hgyt47fb935w2skiet9zgahtc7g986m62vnp1h6fcrr0t17k88qx09oy2thui6v31jhegvaozuotp97bw0z9dvzd492sz1hd9dc0xh25yf5xjsapv6j7krjf0dj4oymnsagtjgbh90',
                user: 'nej9qmoxgr4mf7lzz0q2ft7eh07ej23orr1ojbn03prd7fjynt7yug4vmmpdynafsjivkm3ee4xja4hmiig7bqwqx7s1xerto9k49pncl5mrv9gewzo790972nww46as1pm64dsl8itzg0amotwjuv0gr41ndrlwkjb7hz3a69nejqwlp6c4n7xv2okm9vkf13rzf8s3hifmqrkmv0u7hoax9st8fjbkrpw94umwf6xtf7etx9yl189gik7coow',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5ace48ad-32c4-4b97-ac98-bab9c6671545',
                tenantId: '31d05bcf-646a-473e-b8d4-f5d51a8a8af8',
                systemId: '01e70663-2b70-4307-bd12-550eea966a57',
                systemName: 'j0dmmpzcobyfmqfo5i30',
                executionId: 'da856aae-21d0-4401-9221-57022adb2202',
                executionType: null,
                executionExecutedAt: '2020-07-15 10:49:55',
                executionMonitoringStartAt: '2020-07-15 06:23:02',
                executionMonitoringEndAt: '2020-07-15 09:39:35',
                status: 'ERROR',
                name: '9przyfefktzfysr8eqk0dfwo82siagh8d0ys8cgi6szbotnj6qx5g6yh4mtwmjqsa0ajr0luvtsbcm4nn0l13nv3dxr7r1pigqyru4uxvlqrd3lspsfqtttxpb0zfsu1ip8o6e9yr8436qonttam0t4ncezdfvcwji00qc7tpdxv8zfal133ybnpzqwrj3oly8yjuh0485k77p3ec5rdrmhnhsfb7xipzzx4zix0yj6o25cef4e1skrlmrd75wh',
                returnCode: 4529555282,
                node: 'avyxy07bxdaypnbwg2l6theps4shdzp3s2iz8wrxabs70o6749em4tc6tl4k7p4p0ww70dc52p88ubo73z1npxll2ejrmu5kua4dby94ypep977s1ocy5qq1nxqfsbv378lg3gkergioj1l6l11uev8p6pbejuzc',
                user: 'cbp5ugc2s7prvci8hie7iqrso95njb52b0uv6k2wc4nve15zohea49wka3i4y4r6b9g9wya2gib4nwgno14ygpl6ilk1ft8436qdpdifyvo7py5mw62jsiylc0q65bk72pt8hvytjxerv4sagj5xv0u3p886vpe4dsejmuhsgexb9euanzjqqtyt2878qkqvqpdkv9wnam9m4qoz2akqlsqqyuranctysibr8qzwueora7qocaorrpok4khw8q0',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionType must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5ace48ad-32c4-4b97-ac98-bab9c6671545',
                tenantId: '31d05bcf-646a-473e-b8d4-f5d51a8a8af8',
                systemId: '01e70663-2b70-4307-bd12-550eea966a57',
                systemName: 'czg6r6o6vlctukvwlbzu',
                executionId: 'da856aae-21d0-4401-9221-57022adb2202',
                
                executionExecutedAt: '2020-07-15 10:43:35',
                executionMonitoringStartAt: '2020-07-15 01:42:19',
                executionMonitoringEndAt: '2020-07-15 05:04:26',
                status: 'COMPLETED',
                name: 'gr0r0ccpt4pjdlalm6pwfh4wuld6ab257ymm5zc053mdosaixx2q1vacdhgkk9rnlh3c86ofign4qcr2plfh86xlcsb9v6ykto65sd9h10dhfl7pbb2hu9zqyl3gk4w4w1xte1s130t06zugrxs1jh4pnsueq7ijx1u5zgifo1arufx8o4mdkkbj92h10eyo2hsxgj03u2vju3gjsgeblhkzos8v0veu75z8qazvrg4d8leyzjdzjybyta22ak2',
                returnCode: 3065668643,
                node: 'qoljo48wow5uwc10zztxw66lbqut2qwazauezrbox2ls3gnhq4k7ubqgzrotoplztxymx07mm1r1ybjkydtrrmczenflrd8z3gcccuyj298m4acocm0dqzrxupdy5exmyhh6dhvfnl0chh48q6d9h8qancl2twm5',
                user: '3ufvo43d3opxy4vsgtzt74vipsphxi85ildkn6zg1gtvwo4hfyb9mytpgt9zy65ttkq69ip3h075wvlrk2m5ip6kc8b9lzicm9wrsov0rmf3rywwnfjtn9dwq22l84y9tkzryqj0bt96zz2q96rqzeon9w8gpec9a2pxuzhmii9bxjdpultbiumcqb2taynttmftp749ajtckh7z6s9k96poteuecv3m8bz6e0pxkmi7w4eenua2k66mx0pq9bn',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionType must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5ace48ad-32c4-4b97-ac98-bab9c6671545',
                tenantId: '31d05bcf-646a-473e-b8d4-f5d51a8a8af8',
                systemId: '01e70663-2b70-4307-bd12-550eea966a57',
                systemName: 'oamy33k02b9erluf3h99',
                executionId: 'da856aae-21d0-4401-9221-57022adb2202',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-15 00:06:49',
                executionMonitoringEndAt: '2020-07-15 01:36:23',
                status: 'ERROR',
                name: '1b5zn34o9ikolznhm68raam45odihx2h2aws7bjxxjyf1bkyrcjqy7wc0hldybtcrtnfi7w0yf2k5mc3vm9nsnmwdrn240jrhkla5dkaxgzseo64kzef8xz0ftvu8wl7ano5wzknwynwcvs1ctpoeuynmj23yd1vr2mtnjckbyf0vwyqpyukjhu0qg9o6x5wsuwah975s14cmnd8mg9034lootejlm0gc90mi80b4sm1m2d1pktvrb25zvogmrl',
                returnCode: 4884789576,
                node: 'qgk331233co4hhknq4l1hmgtuh5ccydp2112muteo3t3sgsgsrcqs5addit2fox7k8zmr3rrqhv6du46ayd12068agw0wb1pirg3gn69fu5xo0jniqp9u6xq3uyaciu4i3svmhnife9f14h4mjl4bz40we3hjzpf',
                user: '9hc5csua522yvhpssasx2nq2d8w54nm9ho0veg3a6cv7i674wf33hrweftcjp5fp1wpu04pa642ldw91d87e9w105qyxw7890usnj4t4bt2p75zo5z6u5ozzslisz1truietws2br78iixq04k7blzze3in70h6mvpdmh0vbj54zuhdo7s694mmg040kmnojhzfaf8dgr8mitvv4ue0gq8xlic9sebjuutkpwbcxqknznaenqtwoi943s564jqh',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionExecutedAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5ace48ad-32c4-4b97-ac98-bab9c6671545',
                tenantId: '31d05bcf-646a-473e-b8d4-f5d51a8a8af8',
                systemId: '01e70663-2b70-4307-bd12-550eea966a57',
                systemName: 'ky742iszaao5gyq8fcal',
                executionId: 'da856aae-21d0-4401-9221-57022adb2202',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-07-14 20:54:13',
                executionMonitoringEndAt: '2020-07-15 03:16:40',
                status: 'CANCELLED',
                name: 'h1jxf6ub80o51bavpxh3r0lpwqxa3esem4x6be5tt0cu3wxbhlekpokgbubxf02er6qgc1izmknebnsu07kizdr3br04gd3yrdzukem8glw7gzzxgmo4k5tvur0t9egixx18palwrtwnjzbvejcem19fmf6umk5ggtn7wmthimpozar0gpfy7peqdvj3cnz6ogzb0izf2hmzcc0vt7awvpask1qvpwgmfji840pl7gqxctzoswxcn430bzpth11',
                returnCode: 7699574973,
                node: 'qhvq8pmionwxqygb1g5ale3e8l0xa13iw7hbxqtpr7ot8dhb2rqpfgs7fpf7zconz4fhs2xqdg2nech0ky77k3b6pxtxnyh3nyvgss04gwflh4hax1s6ocfswf8zh80brb777a527rq6bi9enurvzf7621387sl9',
                user: '4ggkgibm5v1esavvoc8344mtrgsee0vbkqgycnp1v804eemccfbgnldtksxomt2qy4gyx3l2neg799grnc3oxpsn08f6sep8m6c74ym866rotpbb3gx1lbkju1im0sqt3i1ueie7pe8c74srppnfvxv98jiwx6hb710sbd0x6fbf2481c5k7lqio6t5dxz7ihqm8o9pdwyk9bzauthgc1z4o91hydmdcsyuosslxklet74brqepoma80zc2yf79',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5ace48ad-32c4-4b97-ac98-bab9c6671545',
                tenantId: '31d05bcf-646a-473e-b8d4-f5d51a8a8af8',
                systemId: '01e70663-2b70-4307-bd12-550eea966a57',
                systemName: 'saig26v1vyi8156tjrlp',
                executionId: 'da856aae-21d0-4401-9221-57022adb2202',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 05:11:47',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-15 11:09:25',
                status: 'COMPLETED',
                name: 'l25933zqzlyrvwzm14lkj199ihq6mbbl0coiyuiax9a1i6yh3ughk81cw51xma1lvm73p8vlkg6tyfgg5vh2r9hs7ac3urq8idarad4ub2g65d6lw7zj1gu5mb6vivlfgsx0xzhlzq94fkn6ca484vwzwoja2c6hvnog4m6t7pnhrepxmb2xmwaxo4ra6ksnp97aho2oz60n3jelmwf0ni98w5mycp7n0lqxkf8bgpgnzypp3yunr891ksx8gf7',
                returnCode: 2404806503,
                node: 's686469bske1j4gdqooo01b2l7it7d58ljm4y9emt48aeol5805ryc6udfcf8yci3a68oolj3zx6a7snuizwb7o91pmsqohlxnyoqqorrqhgk5lks6h17tnt0f4tvqxv8j7dfaq9vmm7k30qarbrg0f0szmglas9',
                user: 'w5lwktc3eon77zckopxr1e3koy8rh5998sk25ktsu39ghvt6jmoml5ge57xnxjw4kimmpffxlbrydvihfsyywwcakqyynvsry4gsiu7fvht59te6mwv4uy26a0e7z52nyzy3dl1kgmdeac6wp3iuy9wy4wv78ja3r55bvn5miimfn9z64aiwwr9n18l1kk6b9optf34n08wv3m5jrl1iwv8y11iz0q9atuv0oalen58w8j9rpq81g5fs45cy8gh',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5ace48ad-32c4-4b97-ac98-bab9c6671545',
                tenantId: '31d05bcf-646a-473e-b8d4-f5d51a8a8af8',
                systemId: '01e70663-2b70-4307-bd12-550eea966a57',
                systemName: 'tbfagzq4j1do8mwlvi0x',
                executionId: 'da856aae-21d0-4401-9221-57022adb2202',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 15:36:33',
                
                executionMonitoringEndAt: '2020-07-15 05:38:05',
                status: 'ERROR',
                name: '2pyjj8hq185ecrwcdlfce0eskpl6t4j5bk4abq5daia2tk5ultuecdou18wc1hzejvk11ct50ahlcfmlc3kykkt1k9y50ih9o0t1tp2j0vlz35haujx3smv01rue1uztw9ja5zji5ook6dw2glqspt2y7aq8y8oy632v5ziwq98nnp5au3wlyyccppnjkmkawo1a3bec12r23rxbj378kirb4hudew58rvnd964zdzlk67ahy44cvhsc4gad0qi',
                returnCode: 3681054957,
                node: 'rp3h92s3o38l9ml2zt8yomknb548kh0n4ewcutypuratwj93i1fk9xhdv6k6qqhpi87617ufgid4tpc7021xprdq3v3uljcr08ymvl6mbba87l9asymdmhej2xw7wee6tk59c125lm07u71dn2jk2u32euuonqvu',
                user: '98bft83bhjlsl4dof5i56zed2j3vcpht9zxxh3wo65kozrhox9b1hzgnhukqixs7inrspxedo7hrvbiq3cp5r5x376i92htfwpj42lw2p90ivbkmejmr5p9s3lspsiok07elxbvw2i3eexjd9gyenp1jedyv3f6g3458s1stkehg17guuigijz2n28xtts4uhocn9q1pmtea0l3ug6pjg85mmup7k75ybngvzcysiook2bgoakt1kbw84qz5umh',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5ace48ad-32c4-4b97-ac98-bab9c6671545',
                tenantId: '31d05bcf-646a-473e-b8d4-f5d51a8a8af8',
                systemId: '01e70663-2b70-4307-bd12-550eea966a57',
                systemName: 'oj8bbi5dq52v1k60gn15',
                executionId: 'da856aae-21d0-4401-9221-57022adb2202',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 01:31:23',
                executionMonitoringStartAt: '2020-07-15 01:23:02',
                executionMonitoringEndAt: null,
                status: 'CANCELLED',
                name: 'jr1x2nd5ithbq56ylu72qnifgomg0132it0lwecdxvy8uc0xa6z6xth4hwasz5wugodohi60ex02b2rrlq4iuyzljsnuz48ubnrgnkz1azmfvssz98o0k22lpa7x89fboh0ywggfpxxr4fzrvo3a7e5wble057lsixcthl4p73nat4bt4o1fv7y591wd6lb6e639gxc1han2ne1h3mo3tn8ngi5t6aq6o23hnws13t6iqp07oa4ab3sf6iugun8',
                returnCode: 3741378443,
                node: 'xiy18pf4nbe7r5964q3m0sfoj0a3icwxsb2fksk3xnf0zpdb9wbyluld2lmo7gm23i6k5xvrbq9kva4o2xndzlp4ej79mf844vzbow6b0ze67szx7i5uw106z5wvx5uud4ujm38glj4s02addt9l6bqdhe9azq1u',
                user: '805v0ojwj1uq3e4zy1ivucktytz3j0dah1j541jeaxwvhw8tlvbrvzbp3lw2akg9g2eod10u24z647oixuvwzn52p6792r68besg8aircu2oi2q9ac4pf8ru8kgyr9q5zng55azgj7xodwcp3g708a14iplcsonxitekozah12h3ogf265q4crexkictm14zg5e30jfq0gk30temsi630u9ot9be05watfzmlc3uxdyzs8h88x5fc8p3jnwppdz',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5ace48ad-32c4-4b97-ac98-bab9c6671545',
                tenantId: '31d05bcf-646a-473e-b8d4-f5d51a8a8af8',
                systemId: '01e70663-2b70-4307-bd12-550eea966a57',
                systemName: '6l3dh0zfc6fndw4x61g8',
                executionId: 'da856aae-21d0-4401-9221-57022adb2202',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 03:44:25',
                executionMonitoringStartAt: '2020-07-15 01:56:08',
                
                status: 'ERROR',
                name: 'woypyfjsu7n397p64w5gbnkjnfcl955zlji5xj7kwp6van212gvhperrjg6mbg38lf9zvw9h3yxmq4fe6ucb5n87wlw4wghosm2a43735djvmmpoo9wwsf2mk1ub1ufjudk8dmc7gr7mpnqs6qxeauf0u65x2pxeohvi6aqkrz446945dq19bcs58xrwfran2ezltoiszo1g8qo8iusaeymkj2cm4s5yfogqxvjrs75zvlz9l6hnfct1wy78rdx',
                returnCode: 7934643429,
                node: 'yw7b0uhj1pc4i3qni0ta411feohduw8wjr1mleco417zgc3ahqlc729a9e3o0wghbqdidkx2xq2npz5rszsr0brc3u0aw0ejwdfs7a56jpy1f3ge4y35s4wk51jrojvu07exlv03bdug2qm9e292gcfcrtxr1pxi',
                user: 't05gzhe5p56z0w11kkrb1rmv89mrfinlg199n03mtvverblhaso1l5ou24s0vkivvfc0pt0nogeqnqk4hyw0qs3tl9opz9wy4oyqnfqw15vh39pkkt45glt7ictsw8d50sog5pn0lkoae0jo70ncn548kg5w5mo51otbey9ds22ztce47njdbfjx3gtvekjkp05og0qhqiitnk2axhivdfbbwpf9t1sdp7gwopbk0lu57aefxek4upc6l0ptoto',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailStatus property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5ace48ad-32c4-4b97-ac98-bab9c6671545',
                tenantId: '31d05bcf-646a-473e-b8d4-f5d51a8a8af8',
                systemId: '01e70663-2b70-4307-bd12-550eea966a57',
                systemName: '3edu6d5z5ijzrgqvjom6',
                executionId: 'da856aae-21d0-4401-9221-57022adb2202',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 10:49:46',
                executionMonitoringStartAt: '2020-07-15 17:09:45',
                executionMonitoringEndAt: '2020-07-14 21:58:41',
                status: null,
                name: 'kdegj154g7e0v3r41uztb0h4hyd8lw8ikc3e66il6d3jkcaq1nilyv08jcm0cp3526fptfte3lwrzq9ml1veb4qsvuh2jlcblpssevqgx4wkpkd5z0bzw6hh8i0xe6m4t90ay2jw0q5y52eo5w6hnk293kv9v08yg8p5ig1jf76izfrnr74p46nz0rph96cum28lnu3lgylr7b12ckr2o222ndch8mio9j37djk2varhqtpput7dxcv795sfxq3',
                returnCode: 6937339973,
                node: 'mf0oe8a7nw3zla88b3ii1scks1txvwp4pp7o13py885okcasfsv374mdtvkyh2ss6z22uenk06pn6d8fj5ll2sgg8lyomz9wvut9ipekepwxqa0m937h8c2him1elnl0mar59s5ebaaprsfqo36spqclmmxmiq2h',
                user: 'xv065ig70l25n1hd733jfz750ibg8900ow1yhobrqg3o2eum9meyn6jyrg4vxbphv0sxer16darbnbafbba52xy70cbjgv5wwsttdwj4it0w4tphyeujvvu1jscsr3638928us1y866qvg4j02lcu0ip4jaq2486j300ij00t3ppvuqp2tgjzkbz5sbri1xetfjs4jvkc5aaz7f9cbkssxpa3xmrau1hkixxflv8hpwekvlto2vu6i5ptgn3wnj',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailStatus must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailStatus property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5ace48ad-32c4-4b97-ac98-bab9c6671545',
                tenantId: '31d05bcf-646a-473e-b8d4-f5d51a8a8af8',
                systemId: '01e70663-2b70-4307-bd12-550eea966a57',
                systemName: '4t9it5terzam3ok3fqne',
                executionId: 'da856aae-21d0-4401-9221-57022adb2202',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 03:55:56',
                executionMonitoringStartAt: '2020-07-15 07:28:36',
                executionMonitoringEndAt: '2020-07-15 10:50:31',
                
                name: 'm489xnh1fqrxy63ni9fheuh1h9tejpfai0pmcdogz6cwsfc3qw3ygow3uw95vtw2u1diya3hzbb2h7t7zif2fe1eltypxcha5hojfl8aluiiznnlcpf8dl92q0qv1mvci2pcxpaxrlxutkfiu0qpqjr075a6zbitsxaqp765to7fbztekqipg2aopyxz8lx7mtgrhxaggydbss59ntptx500y6zi5dl53fa8cf4soqt08jith0pwiu36sfnr5fc',
                returnCode: 5415211891,
                node: 'fc0vex4luoswt4jm8nhtwpcphxhmxrlsoua3w40fpuvsa80a77lg6epm6elb5sms7byoz5i7mgp4p6r4quji2kzbvruntsszg4zi543yqd4huhay7z4rid3ev0ho6mjyv69i5jt3o0v63t8c3qj5tuk0cwgg8iio',
                user: 'sm97jqmfx9s353shjlzafrgcbd6megse4d14e0k2n9te6ut6mop4fya0jldo0e2w26ffh8tgnf4qq8vgbj88qwx7eflj362p8cooh6fnrl59r2eds3untm5fprrdmd518jcytbmwz3ybayietgp11604wlnkl4drn004bbxdgysd8idmciwsorg2yg909arxezcy6s8xt1iir41f2jt5wq40g47ukyiyabu7qdo74i6v8tbdscky88fyu6t6wwq',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailStatus must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'tgj3p9qhr28qo03n69b1iyk5majyai8v1svyz',
                tenantId: '31d05bcf-646a-473e-b8d4-f5d51a8a8af8',
                systemId: '01e70663-2b70-4307-bd12-550eea966a57',
                systemName: 'ozcxj5j3c07dx6zgts4o',
                executionId: 'da856aae-21d0-4401-9221-57022adb2202',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 03:23:28',
                executionMonitoringStartAt: '2020-07-15 01:20:14',
                executionMonitoringEndAt: '2020-07-15 17:41:03',
                status: 'CANCELLED',
                name: '5q247e2lvzph5rpxcx4hg8wac8k9t4g7l2457nphd9bq0pp8ltl7wq7wit4umag6j721cwmqimyv1pvcxda8v8f3j8huxh57f7az3wkz64xxtlqpqc991d42unc6pvypl263zfqpslse8bx15czvn5jkwz7linypoz08c92xgcwz2dagmc02vt9am3q49sxhw7faw6bcorg6qpychl3ayhgykm9p7s4hw1u4tj9mknoj3gnucv73xo1kavzry5m',
                returnCode: 4405494497,
                node: 'ej8vlcpu3zwwlqnryaoy4skwrqipt6rg0v9zzv5okzubi0i0ufhhkf2fd0fok3bzh2tmez478q1riaxb1lhyvmsso0zaxixtcaks399mrbwmdqe6w0xr3p32ggvkqpxt9uxiwtvpjb67pllcubv0lfxwrj59igdx',
                user: '09j457brcdy7e5skobx9glqre1bj8tb9gnthi0fjmbs3thm8al62zamxsv5eqhc44anqxn5cyeh5pw55rg1tlpyt4688y6tig661sixoi08k1aqs97f6shrl3y8pt7tv6g3lgmhnmqszi9amffomrmy4rxlugo1xh4d4n9gdrbq17cj6htahqh3ibrvcs58y3gzh164qd0mv6x2z3uwg8qy77q7hr1y9t8ed1jpol2eic07s4u1xjr4jc1os4bq',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5ace48ad-32c4-4b97-ac98-bab9c6671545',
                tenantId: '7t0ubgphnbcrsnz3b14ihbur3moq8av3ofhhi',
                systemId: '01e70663-2b70-4307-bd12-550eea966a57',
                systemName: 't48cpr18e764sxw8vz14',
                executionId: 'da856aae-21d0-4401-9221-57022adb2202',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-14 20:55:03',
                executionMonitoringStartAt: '2020-07-15 00:39:23',
                executionMonitoringEndAt: '2020-07-15 00:12:07',
                status: 'CANCELLED',
                name: 'y2p34m1ng8ddad7z8hf23lfa3sev4lo72tgajwiopvkhzg59236ki5w0i2lxhwzg1xf3txajlpxvjt1kgkdgq88ji7tne409za6thu3ojja3zjibbtf9iw16pwonos2wm6tumxjiuv50kjcfooo6eazk15o8y3i7gjsy6hb3svy5aqn3vgrwg58ht4well4lj2bdtqznv1dwmngstaag0qop02yz3fi1hle36g76bsit69x96gt9w4jc4pf6oid',
                returnCode: 7713608506,
                node: 'zf7abo7rq94kbosdo40rv1pvg5lg2hsge4qubatt5jf21juoby0snsja3wlopdl97zcuyq91vz9ia6e8v4a6mm01paga7rwrh3fuxzccz1kxqbnl0w2m6z721e34pje0n1lj9wy95mly06pgboahc1jmr8um5kjq',
                user: 'u6mkj9yktbv80cj9mnqa64xftaw5xw0vnckt88eq0omjha4hu0ogxeyxwufp3y0q3t7j351u0nntyxzaa063y5q0mzgnle70k7uxvoosp0c35arcjvvta8magz66h7saa0gu3xouoaevnl8i40br4rost66zsyneievfnfut757mlajezm39hyuwox5dliuvj73y99tgjc0hjeuot2r4bxokleb35yjo4j0vz3ukta4i5wpdymz47t365uc6sko',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailTenantId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5ace48ad-32c4-4b97-ac98-bab9c6671545',
                tenantId: '31d05bcf-646a-473e-b8d4-f5d51a8a8af8',
                systemId: 'ajwyd3jm5zhrjen453blkpi7rt49h27jsi3bs',
                systemName: '654h5qlciffatk43iid2',
                executionId: 'da856aae-21d0-4401-9221-57022adb2202',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 03:49:41',
                executionMonitoringStartAt: '2020-07-15 03:11:51',
                executionMonitoringEndAt: '2020-07-15 18:30:04',
                status: 'COMPLETED',
                name: 'nx1h318q6l5uwp1zlrvf4hl0ncxftnvyb3vv5nlivo5v3hhyafgxxtp8xx5m9evx27skt6lrcch2vf76xqtua11243x82yyvg63bbwiehppkalyzxq69kd5obpxq6mifg6yd63bu85wpzy2azfum1b7zizad2779gmjbiq1fgw2spynbc9nfjyjt5v45orftjtp2tuc3fk10lrwr580pjuqq9zirmdqtjejsyf3p291zrmti698sfnglj9ql1hs',
                returnCode: 8922840904,
                node: '0tij7vardxn2brif072fbtr8ud4eq3bcxpfqze97t87tq5gilci5kvyimapza17wg4o306bdryow3vbnh5d1ojnousfpg03kbfn7gin6bny2d6nh26rzj9b60yw1nfardpw0oy0i9uhnx3te7u51qjkhsk260x5n',
                user: '15mra5yv0pgu48ymtds8i1fvhcxwt6bmjuskc1vjqwoz1wegu20yhp3470dlzwwe1vbk1chjfalmv3ac50bqmacmr31vj6iva40sso3cuvruyif5fa5zd2fnu3sr8t2h4vjk8dq4xqqj6mqtkeho7uzo8ngf9ermms9q4cliv7wuvqxds9eoxtw83cy28ol666ik1aj06gw9y0ngp3jegbtp7xk3lgw66vqjpm8w8l9qhi4vxdj1tx3cperb6nb',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5ace48ad-32c4-4b97-ac98-bab9c6671545',
                tenantId: '31d05bcf-646a-473e-b8d4-f5d51a8a8af8',
                systemId: '01e70663-2b70-4307-bd12-550eea966a57',
                systemName: '7nyoh00ae7acgav7o5yu',
                executionId: 'jma3j969zu0qjp9yer7maxdo6kck34uukhiwc',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 06:35:37',
                executionMonitoringStartAt: '2020-07-15 09:54:14',
                executionMonitoringEndAt: '2020-07-15 06:14:56',
                status: 'CANCELLED',
                name: 't99qvj7zco4deo103a57n8ht1bdjgavrr71g4oaopi1pvshh8lf0utcwlsvmlj6m6fkns8pjtqv5enf6emz7cxiraup5ur7s99yl85xibpj0lz5k2ewrm3d3ntdjndm949qqsp7btqxsf2g043m6ae4saof3iuqdiizhqofneamejqka7bttdhcwpt0qw0xtw5di4uutewfyqjfoxqd5vany4tw8oqlygnnqzn3qrz07wc7ty9ljrjnfr2t7n73',
                returnCode: 3838226115,
                node: 'lprd6cr596rmv27u8n0fl5pytefmi5g7cpj4lv4a1ob3ri4nn72st842t4q0qiec7vldrtyjsr6bcouyg8qrz2sdn14u9c67mscecvv5mcl4csypj86vww8ipm8zeibe3e49elnvtj38r5ggia7nv00vjsl4g6w1',
                user: '7ered5yd2s0j7kgq8gvymx9apfzox307kcx3ig7ecbzbl11gwfjjprc8ju39i5h17wst6ec0tzmqgwsg4dk92a4xjbk0wp6ysn1jqfss2td7tgursd2ryqu0vh5uyt91rb9jrbrfqqbiztrdeud20c3nlyuhvifqk7o6otpg9dd8rodgix5b7c3qkqai28gn62wl49q0bf5wgjd7bigktocyx7e2euhw3ojgo0iz81j8gdls2e3x7otn2jjv5r0',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5ace48ad-32c4-4b97-ac98-bab9c6671545',
                tenantId: '31d05bcf-646a-473e-b8d4-f5d51a8a8af8',
                systemId: '01e70663-2b70-4307-bd12-550eea966a57',
                systemName: 'tftlvslbh0zqfnlj7o074',
                executionId: 'da856aae-21d0-4401-9221-57022adb2202',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 16:47:32',
                executionMonitoringStartAt: '2020-07-15 14:30:33',
                executionMonitoringEndAt: '2020-07-15 12:57:30',
                status: 'CANCELLED',
                name: 'i6oygoslfobhdhocpg3g48su5rgr7tsm4gcytywdxx1e2qshfojpibvfowcr32z4vjomusep0b1uuvlxainlz990k8t83j3dm6rjx442dk6u6yx81irpa7eqrjm9gqlry53jm91ha7uatabuneemslc7efsr96n4pu4surk3hr1wo0yjvga3t4ozndtesgoogzby1mld7fsvrkd68ubknu46d6e65kgcvdurgl25q5i6ihgcvnt6t5d742xzqez',
                returnCode: 1019044579,
                node: '52i1kv40vco3ues6d34q59vzeane2b5e0vpos1e8dpjdb5w5y400hvo1j9q2zur26fyf3m1g6wjfsr43cuonavj2at6xtcdoptqzv0dbi3xuu99puz96a2lm71s4lvpt3vl5h7bil25b432wjyps740xm25jp54e',
                user: 'h2ieycv33gchcv2dc8mipvwetq1cf2xmzfbv7hrzvohdgxshqjlkt7fgg3n52szbi6pmtx9xxxexbanvzj9e4yi9d6sehhpnxhbsme9jvjl7ij8rzuhrc8r9ks4kh0hhqxgoxeiieikqyf64dhgo05zsewwb7s9alyr2kdb5awfa6fao7ffgetdr3mzgrm6fmx5uvptjgeh2u3uw2kfifkn60ysxs6hish9mplngmghki1xx1kqukyltlsdwl2j',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemName is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5ace48ad-32c4-4b97-ac98-bab9c6671545',
                tenantId: '31d05bcf-646a-473e-b8d4-f5d51a8a8af8',
                systemId: '01e70663-2b70-4307-bd12-550eea966a57',
                systemName: 'did7u2tv4gcwwivu8ke7',
                executionId: 'da856aae-21d0-4401-9221-57022adb2202',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 03:23:56',
                executionMonitoringStartAt: '2020-07-15 10:43:04',
                executionMonitoringEndAt: '2020-07-15 12:58:09',
                status: 'COMPLETED',
                name: '0giq2w5076xms4rsqkpbt388gmjy7t88txpq5jtc8uvta6jxowfs032o17abotnsk0m593w0nss56xjw6b036gmfjc0418enti84d1p1510zu6qj8im28bnonnh54izzn1gjnuz90p6txct44v98wfyezutnohsauh7zh7csync49k2cooeiv7eisuijbb3xjukjb7yaw2ok7ou6o0636l26klem9hjz743ve97vxhsnx3kiyykfsdkzu2i2dez6',
                returnCode: 9578556640,
                node: 'mrl6izyt9pv5ykywsnr4gxf6fc255f72c4njyd6tmrvuzj9ds8ozj5rxrqzwtc4he0wd4ykmo3i0qud12kdigudyzubyudqq7rw7t5nppcwjeab9g9qi1llf96e0d2imes1pcl0byk5qwamg5606yg2gg3bp18ow',
                user: 'dghtgowyox9m7mqoic6hyt3cu5n8fo6ckfx8ijtmn9ylr9tvhau8rgtb1uzmztnzr2lq33m5mazi4scuq6rrhwi1h61pe1t2eurbj5gy4raddfedr65f7n6s80wg6gyscewnh521je61t6uiy492y4jp5e2cpfzqk0tvvce9gucxj84uxxhnwxpx6wia8n5qbco0rrq9q84lubowj1kkhkb6fsax7vkydmfpbbeq7lvaaey79vv3g0kxw0mdjvt',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailName is too large, has a maximum length of 255');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailReturnCode is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5ace48ad-32c4-4b97-ac98-bab9c6671545',
                tenantId: '31d05bcf-646a-473e-b8d4-f5d51a8a8af8',
                systemId: '01e70663-2b70-4307-bd12-550eea966a57',
                systemName: 'gi1wpo2csyzm4rj3ahdj',
                executionId: 'da856aae-21d0-4401-9221-57022adb2202',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 06:08:12',
                executionMonitoringStartAt: '2020-07-15 09:41:21',
                executionMonitoringEndAt: '2020-07-14 21:05:44',
                status: 'CANCELLED',
                name: 'iytxnn4er2opxywdj9mm47ybu03js4245yjd10jyeoh213feo0z05e36g4iviyuu0gm91m0gtxn61kegwuo5m6iu0ayac0hn0sxelsr6sbrqk76ze6w4ko376hltgj30soomazo8f8ptes9cqysn00wl0i9px76t1twt0vswxzeu8qdsktb97ly77z0a30lj3ijvc9xjec59ghoe8kyspb665v8i46sis9e3plgz7pbl6qob0ppmphy18s5w7re',
                returnCode: 11272481409,
                node: 'xvlcif3l52c3p62ki9i07ki3tcnapzhbdv3tkunpr8s29ac1z8hseju9vqulr5clyjvhp2cli5ruie47tpktfrhxbhbegwi2zea45l5ndz2byafvhqgimwnz0wt0u4sxc3okz4rx3627gwvham4pq3wptybcu18z',
                user: 'kyhv6mfrrav78tqdz5hilm0y7najv3e9d80ss273ni4c83qqllb6o6ayu4fzgjheiilencv6ui3br3st7l81zyifyiflngz55irn0l4js9qm7c4f3j70marxhuopbfdy9721ssfefb5ff009foj0pa6k60atcru830909twy7je0k15wxnqpifb4f5023vgh9nk8lw79ns18qyqzc2osyap8xe4mghdpc9ytjiuj7r82vy2ucd78p8vumpy2l9w',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailReturnCode is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailNode is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5ace48ad-32c4-4b97-ac98-bab9c6671545',
                tenantId: '31d05bcf-646a-473e-b8d4-f5d51a8a8af8',
                systemId: '01e70663-2b70-4307-bd12-550eea966a57',
                systemName: 'ee5v9t3o2k7czajf5u08',
                executionId: 'da856aae-21d0-4401-9221-57022adb2202',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 17:38:10',
                executionMonitoringStartAt: '2020-07-15 07:14:39',
                executionMonitoringEndAt: '2020-07-15 05:28:09',
                status: 'CANCELLED',
                name: 'on38qv7ukwreringxxjok56fewjysb1a7sz12xflq7i1o2ykngi1vti8r3p57euxrzqg4hzhxir94yuw76j06sctr8nxkqg5w9moijo6m4a15cropzlkws8tjg2w2uf13sn6kewk5cc47lryldxitbswpspq4ckdaqjapct2h91cvizbnasspoeuon4bzfyk7g28hz4tpd5plcu70eijuslup0y7ykdawx6r7yky9gujtjd1dnb63ox65mixgsc',
                returnCode: 5922280875,
                node: 'qd9gkmm0c6erdyu9rxkj22kt3ow1hicd6j985itnwxhuzxtyb79o1dl1v1vylhcxzax1949oi5oxf9vnhbuuzzc90lbt0ejwlfh4d91idjk4hy20rjan1j4f7g9nc8vqgxc3oncdrs29g9s4ulaw720kiik2934ti',
                user: '11235981vvq8fxf3yuk9jcz5i3pb3pl6n3iisktjdk9ezr5ta3v1aggdchqcmvhdwf5s19bd5nzrg2eqult7hxq54h168eew85pei70lvr92kxucl3oy6qavv4uj28m98yc1ozoobj60i2xqtiffy9zhed1vbe1devdjy7fo8bcly1scddz5rjbwskci4vng00o6f6d8b2ff3szmn6rr96wo5lrgovwvk4lbyweyddyzreyviddp892svpla9jp',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailNode is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailUser is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5ace48ad-32c4-4b97-ac98-bab9c6671545',
                tenantId: '31d05bcf-646a-473e-b8d4-f5d51a8a8af8',
                systemId: '01e70663-2b70-4307-bd12-550eea966a57',
                systemName: '6uehtqa6t9bw5hnkvqb1',
                executionId: 'da856aae-21d0-4401-9221-57022adb2202',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 18:33:41',
                executionMonitoringStartAt: '2020-07-15 06:00:29',
                executionMonitoringEndAt: '2020-07-15 10:44:17',
                status: 'CANCELLED',
                name: 'qrduu7j6vfixtfsuc60hky38ztjbf2ejnu9fsjw8rjhej12kdd19e7d928ys1z10ngi4b9kbjxn9qfaf14k1bov5y9bu5u1b7rz65mjnqicl4jnxsb24n815ufux0ujspxq81kxufp0zt8xw2uzl4iqsf9kl6kuwunzjvfs03vhbmr1ycxalo81o2nmeozr4b33her24nosjn8zrz8m9qgfpe2krhoas0tuodeydubf1tyadxyagkzmn4fxwoxa',
                returnCode: 8501936185,
                node: '3socwi3ham0zs0zar648zq1exu7hpc4pymxo0xnf5huntznr6b67bu3tl1zlpl7qw91nq5otljoscnkpmbkrceiwlqyn04flrux8v20kdt75tmkbpcgmvv4p3oj0u80zcokk8d2c15cckrgjfexgokkj1c2145db',
                user: 'gszq9iljvurjgix8dj58rm8oh8v4ks32qow2k0gpif3xz47lxrq8woubz93etg6iaczqeieu3ey1oeqsnrw7n10spaatcolclej8scg0kv4ua9xf0fgw7lpc4bkasidawvicmbopa61ihx3hp8cr2ol98zrv0v3jncj034d8r2jgij8qkti03pq3s4i3xvyhi55020g3s89faidwky0b6u46d00ucxn9qu73vyxi1nmqf79w5gx93dkfklyo0038',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailUser is too large, has a maximum length of 255');
            });
    });
    

    

    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailReturnCode has to be a integer value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5ace48ad-32c4-4b97-ac98-bab9c6671545',
                tenantId: '31d05bcf-646a-473e-b8d4-f5d51a8a8af8',
                systemId: '01e70663-2b70-4307-bd12-550eea966a57',
                systemName: 'vn8czv20yyr40rhk9u7z',
                executionId: 'da856aae-21d0-4401-9221-57022adb2202',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 00:30:03',
                executionMonitoringStartAt: '2020-07-15 05:29:41',
                executionMonitoringEndAt: '2020-07-15 15:53:29',
                status: 'ERROR',
                name: '95jg3t4rpyt86oxz6lbpqyols2zbwl7phe7crel5w0eur3nayelwdaf8d0tgg4lnhkmqoh9jhok49shnugbx187ix213wq7e45cq9oo09l01gawyr29vt6zsf4ced7uyrrn2x7db4484kcs49d5kci5h816mhtrs7lnq49a8cup0ci2wnn5cvf7msywaxb2k39c15jk33qwso61vmwwhyh3eeybfz57qeyl2y32z7x20xbm7ctvkt10qoa755n3',
                returnCode: 100.10,
                node: 'sp9t38vtbfg778j2vby8zrt47p0mycf34ky1u24o83qlqc504r27cshrxxw5sk60hgjapmwimtqwn5q3pq3bvtzdajkhz6xlz9hlgf4asjq0vraate3too5ktb84zl02tjhadb35xb2jxxavq71poifly36d0dcl',
                user: 'ah7439123ibn826a7cwunqvyfvnc9lovwrhbwgedmtv18zwsgyavmeepk7gbp9zmkygnhbnw3n82wucmqmho5b0ul2jw02f68kykz4kr6krxe1a6qvf7k3hiv5o3vfn0m2ck14gprlcu8wsz4k38ggcxpix3u3szar9lurn1cdxmfyzvflvrxvxph9wywvteysg5g4cja4lrvxm6z6qunx83b460ksy3gvtzmqtbsk8op7uiwzktqtrz22d1334',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailReturnCode has to be a integer value');
            });
    });
    

    

    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5ace48ad-32c4-4b97-ac98-bab9c6671545',
                tenantId: '31d05bcf-646a-473e-b8d4-f5d51a8a8af8',
                systemId: '01e70663-2b70-4307-bd12-550eea966a57',
                systemName: 'm10dyt25nazk7srz8em0',
                executionId: 'da856aae-21d0-4401-9221-57022adb2202',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-15 18:12:34',
                executionMonitoringStartAt: '2020-07-15 07:45:15',
                executionMonitoringEndAt: '2020-07-15 05:24:35',
                status: 'CANCELLED',
                name: 'tmamd5kj6x0nlm6rcnnvh8rj7p425bh45lrfhflkgkz3t842eka2sxpmkgnbykkvk6f4qg00xskotzrepo3yh4do3n6yigizu3umgiebnzvl45gpimosaq6o5gwxy0re6746w2uaie3p32d9btd98ije43dumwduu76q7i9sklh9sh476y7y9h185ewllwnj14lbnpi9t9s0jsgvwos3lj6lez6jd5w4vyy879n36szcoj3i6pr0h87gszoc875',
                returnCode: 3548332362,
                node: 'iylc5nh93jx1vi2kvsutalsu0k8tziv4n6tjvulc2tu6rlr4h0g6nv60q0xpjn8nqsel7q62t5iiispiaswjt8erptsbmw9og7oi0zc82bf6svorrfzmsc0ym8pmjq9qnwfsxg3neoza37sy96qvit5xi4970dc3',
                user: '488xmn5w5ruoewxvzwdtz3rl5sfthy8f1ucrk8g9x11zpahwtbu0acb9lxnjt5h6yzka8ujnyl238bi9wzg6zm8jqzf28y2ssokl19c7g9ftkwcui622zcclnbe9okpt7jheo9e7vjwe9nxw0g6zzvbbqfvw381yslve2jg8wuf10ktvkf0ecg5phcn55ax5yvkheum6tf0coka3kdeyi9lnbsia6fp544fwpue6adq6d3kvnw052dn8u1rqp33',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailStatus has to be a enum option of CANCELLED, COMPLETED, ERROR`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5ace48ad-32c4-4b97-ac98-bab9c6671545',
                tenantId: '31d05bcf-646a-473e-b8d4-f5d51a8a8af8',
                systemId: '01e70663-2b70-4307-bd12-550eea966a57',
                systemName: 'qn8w4iplfyrjupf03f5l',
                executionId: 'da856aae-21d0-4401-9221-57022adb2202',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 04:59:02',
                executionMonitoringStartAt: '2020-07-15 01:08:46',
                executionMonitoringEndAt: '2020-07-15 01:40:55',
                status: 'XXXX',
                name: 'df4fe3gaz5pm7prw24coteug51i14eiceqdv8r5f4mzel16jrtis0ehag5qrbe08vu3hgz3xs11d9394tfciur0ng2ue57252fqgmlizgy6mo5p1tik2yrlr6r2cw4eb7nxqsj8hksr6ulaiw3j76uvt5ggnnwpkbacvzpogxydactho699qyeve6sqo6r8d1b6253xl90mzba0eqtj0oq47ah5fps7ky78v88qorldxccffl3gy6n0zozimn73',
                returnCode: 3362374560,
                node: 'dcnfatjvli8elt43bumzpyg1rc01r24omkyabyyy5y1l3dcnr4ghcuqsoobtu5n8i6b0inu3xtg1knb3fn96alnsvu1ljyvh02n80dl3qt82dhsv9jwdtof0yscj2ubsreo0okz6cqqqdg9xwu4dfowivaot7rsw',
                user: '26f7610jk228ryxo07pq8whxqg65720zd1tkdpnozk0ecp5n4ux1n36lydizhuarcmj6iek8fedkpl12vk7l0lbh4odox5ucximpvugbf34o6wa7y4x2rtwezop5nq7ixkihy5aycqoc90v8crj0mx0k25j5q22ba6u8p1xwxscdmasupmiupbbvjsd8x7j2wnfkgopyam0tdnsiix19x5ml9veb6x9kczape6mfyf6j2fbfxfibee1btuogjtq',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailStatus has to be any of this options: CANCELLED, COMPLETED, ERROR');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5ace48ad-32c4-4b97-ac98-bab9c6671545',
                tenantId: '31d05bcf-646a-473e-b8d4-f5d51a8a8af8',
                systemId: '01e70663-2b70-4307-bd12-550eea966a57',
                systemName: 'xl4kutopcvqj4693t9mr',
                executionId: 'da856aae-21d0-4401-9221-57022adb2202',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-15 13:36:09',
                executionMonitoringEndAt: '2020-07-15 07:38:57',
                status: 'CANCELLED',
                name: 'jmklo31n2awkn7c1ls8rnjviblk6k348myztzx5poa8r41d37rujvow1bqomxzua0p8xaaqjfz0qtk8yqpkvq3nms54dyt3rvi4k1d9wa0xcexzggld1cdy2uokchvgjoia94qpij7rly96uof943gs1uic5cqyrs6b4e8c37j51ngct6ooxk7hktczqdbi3rygm7z56upd57rv7vcegtk9nymto3rxsk6aofumdvfiqoj1dm5mhs7ba8zi5vbd',
                returnCode: 4955088533,
                node: '9bwwa2h2998tuj3pucdxurtbnp4e78mw4u9abshzh4e2yanzsi4d3n188vho90ny4d4v7xhl93iyjsh31aoxqm07szvb4xc13preqo4bugwq7gmk5fcnbni3flzoemh35oxty2krbuqxuvk6xbznh3b7rpmyhskj',
                user: '8dq0pttqf2p821ab1flal4leu2o0cixs7v7j9qzj7nz1ktnwrm0lcw3o3egbvi0dsxc3ox0on29nw53xruoa3nu9pr77hmlul4b0wr6cs9ygqys1hkk1l21t8qs7ltmkq9b13or5i46u0aogbuiuh2uwtfzedjs7ffo42cywe3yrp90ia8bimz5vt3fyugdlt4j4zem7npefrd9aowqsxel72e0xy50r296eav1xnnf22ol7w5eehiuxpao33wy',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5ace48ad-32c4-4b97-ac98-bab9c6671545',
                tenantId: '31d05bcf-646a-473e-b8d4-f5d51a8a8af8',
                systemId: '01e70663-2b70-4307-bd12-550eea966a57',
                systemName: '3om6f8zgefxa9e1kunu9',
                executionId: 'da856aae-21d0-4401-9221-57022adb2202',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 05:04:44',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-15 09:14:05',
                status: 'ERROR',
                name: 'yyxdtosb29a5raeffva2wv915iesequqfrza23nzexla98ref6zy1mxf4m025lg6uce74anuve4xjtscc7d74vsumd3c5xdlf44exv233ctnzu7wiv2f3uegkiixbn4t08dzduqvb46yhqrvee8wjwlk05m92omk211apzqporuy4cpo8kejt1ocx2kxdv6s590ih98lntyh6kfq5wc107wp5ib4pvg2al3i5vcox9py06rfayo4wxflvbok6hj',
                returnCode: 5121031989,
                node: 'ih9s96jxt0g17fo1hbp4m8kta6ms46owvvzhsep3427mhr8yij3cyomkdm8g2ta2vpzwugjs2fztcu9drgu9fzlt06yqg5ahwtmn04r71mv00fv0ryqnw1pkqecjn3tkp0cgo7m8rkbbxm1ueliwq2eqdelln4ss',
                user: 'oa0gtyswgytb978iwpinqglvmqohtkijw9ejojum3jkxwo4x42cyf56su4z2fbgz5m9pr7kb1bpa87yl8abl6ttxpq62qi95zg9yvgu1umy7zx1hoebkjubfcj8ptjt683fc05j2cr29ou1720snese3m9hv7cnm9lyf1luopyasrt9u8uftpli3ltqytlek0kentovgqyueiwjhqcgsqlu5sdk0op42xlkpliocix7cvi7dlkngxru5k6b6kvi',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5ace48ad-32c4-4b97-ac98-bab9c6671545',
                tenantId: '31d05bcf-646a-473e-b8d4-f5d51a8a8af8',
                systemId: '01e70663-2b70-4307-bd12-550eea966a57',
                systemName: '34scvvp7lnd56bnycf3m',
                executionId: 'da856aae-21d0-4401-9221-57022adb2202',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 06:35:42',
                executionMonitoringStartAt: '2020-07-14 20:52:09',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'COMPLETED',
                name: '4i5sr75kng9tcemae780cjfyw228ivk64v4teftw0v9jeknz0laiqvv14zmg29s2rjhkrm6hoa8ggbil3l9w8f9zq59r6yo65mkemgljg1zuaxgz2sgjw2pail0tonpy3d3e3k9762ibudv8bgljyb3q9keciyw0gnjg86byftvcjj5m470wnrt4btw7yl0vdjt5o7ohtgdpdb51e11xi0p0t4sj55xd99mmacnjy39jx08bl0gka1jdut2dkxf',
                returnCode: 1562008918,
                node: 'afickadppfsdzghyngwzwkh513fmypm9y5d1ap1uwk268vfnrgk573p8jx7qeej978mdzkj5nvf0so9eu14v9rst9lc117s76ra9r3mia26tylbud0bj7kr3jun5t8fv5zz9p8q254m0i1319s3wxyybbvu42ab3',
                user: 'dp664b65mq0qdk93mk26mvqfrmv3s5ilvpjhvkrr77pu9jqpu8hniz49f91hgphzn8p5zdxz7wzq64ce3t2jukeuomccolo2cv314rmmrm9da63f8eut9njb7cg0nt7shtjbkhhr8hhwh9js4whti3gbbelmfjxqgcaemkt8jr96c6wzgl9uqhz84jpolefhs0p92bht92pqg2pmfhwdd4q04wjji22u6emjv97n0l1qkfamdmkbrgr9xkeulzu',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    it(`/REST:POST bplus-it-sappi/job-detail`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5ace48ad-32c4-4b97-ac98-bab9c6671545',
                tenantId: '31d05bcf-646a-473e-b8d4-f5d51a8a8af8',
                systemId: '01e70663-2b70-4307-bd12-550eea966a57',
                systemName: 'rv2xfdwoi17og1b6qu8f',
                executionId: 'da856aae-21d0-4401-9221-57022adb2202',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 11:49:07',
                executionMonitoringStartAt: '2020-07-15 00:29:23',
                executionMonitoringEndAt: '2020-07-15 15:01:10',
                status: 'COMPLETED',
                name: '26hu9slq6s9ggelxzdxpbvll45gmp0b0smcpp8891sqbk7643hq92i1j2sr6ywtjd10gaz1wfe5qpenvjhppnylregz7arhpflae5nor4xccs5jfnckyy1izu7fgnf3o1zn5kwv0htdee074s6byimgy7bqzxkj50m21qf5pnydeyue4q7qj5ifsnpu1v6zu21lqjkazhmtiphwzzsnqv27lld3v6qvjxlfprdktrj92l1240qrbrffasf04xep',
                returnCode: 4200728037,
                node: 'kh7bl58ckpx2gjk5jygg2xexnp2i35glb5j59ov9vih44qhxhpt2e73327ww7br7kiwt4zcxdmgvm7icg03pdc113puq03h4lfvnmhuwb7v0y064n98rydgaqi87lgmei07sjv3vn13sdmy9c5m8kzm7z0483vfg',
                user: 'xtqsekybrc26hmvieowjvewfp72m31xvqq9rlusxzfdn5sng6nrd2id3vk3yp8zslq65tg5e4sycyh2gfxo9px7uevtcemhycnz65qet7axaqipdjwjjcrrd0bjioahxtkmdynimb3hxq9b0z9jzd7edvrahi3te4c10ukbgqbegg3eb0w84dsckeyu6w56pjo0gn4esvew7uq7yow2bamb3y3ry0393n5uz9q0v9xyap5cptfsarykjuio65td',
            })
            .expect(201);
    });

    it(`/REST:GET bplus-it-sappi/jobs-detail/paginate`, () => 
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

    it(`/REST:GET bplus-it-sappi/job-detail - Got 404 Not Found`, () => 
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

    it(`/REST:GET bplus-it-sappi/job-detail`, () => 
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
                        value   : '5ace48ad-32c4-4b97-ac98-bab9c6671545'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '5ace48ad-32c4-4b97-ac98-bab9c6671545'));
    });

    it(`/REST:GET bplus-it-sappi/job-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-detail/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET bplus-it-sappi/job-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-detail/5ace48ad-32c4-4b97-ac98-bab9c6671545')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5ace48ad-32c4-4b97-ac98-bab9c6671545'));
    });

    it(`/REST:GET bplus-it-sappi/jobs-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/jobs-detail')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT bplus-it-sappi/job-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '9aa66d25-5e1f-4744-b335-c2b0f1bfa92d',
                tenantId: '26f55c64-bd9f-4603-b236-0a370577009e',
                systemId: '01b47e45-66ce-4503-bd76-f9caee6f5f2a',
                systemName: 'x0i7p966ijg7m2ahmda9',
                executionId: '21e52c50-6906-4f66-8a90-598a35ea5b56',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-14 19:33:20',
                executionMonitoringStartAt: '2020-07-15 00:08:59',
                executionMonitoringEndAt: '2020-07-15 12:03:55',
                status: 'ERROR',
                name: 'g304j6vku2bglwh9go3v5jvi4cnce27gozf6q92k2fv15jyf74euiagv10rrhzouyd7o8cp4a8djepea97a093oixg6p4rniouc0hzmo1r3buyhes5mubxll73qa8vyejatgcyx1yzxmgniy5enz0jxi50uphztrf1m060c123fsg4iq0cr8l6v82mom66pzep7wg8l216b5dztm5aofjm37sqbyhenpv7o1folp27t30r1qimsa8ama1c115tl',
                returnCode: 2955570959,
                node: 'qu6swboujulrcxb0leejth728mvx3ca2eiaw09bcj8k7i1qbwxntt50zx5ymm81rnat4vtbc5gu77xdtsefqp2xdxpcy27e97rtt4tfk8hjb81lstgf0niwq6q039fsgwnq217ny9snsjpzmn21f70pv46ts6xvn',
                user: '6rtii49473592ysmlqmt17mezf447ttim8vx567bogl87qt69w8ba86s6z4k6b4adjx0jk5um2mv9jololfvgxgdit4qhwwq1d17dwvve0mb9ynllv7g6cnla48iumg8470mq3fhhfq6li02yyqfgyq1e7a5529wmqo55kzrqpvytfl12fa6uqamu3ctjdzs2lkw6xjsf0kheexqp7u92qx0nku2xff0aej44ynwlnrmpwz3oo3jp6r8oybl72d',
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/job-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '5ace48ad-32c4-4b97-ac98-bab9c6671545',
                tenantId: '31d05bcf-646a-473e-b8d4-f5d51a8a8af8',
                systemId: '01e70663-2b70-4307-bd12-550eea966a57',
                systemName: 'ezgp3bj6zy4cudccq5x2',
                executionId: 'da856aae-21d0-4401-9221-57022adb2202',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-14 21:45:15',
                executionMonitoringStartAt: '2020-07-14 20:22:35',
                executionMonitoringEndAt: '2020-07-14 20:48:33',
                status: 'COMPLETED',
                name: 'r78pg7vldvwrz5o4yy5690qi4cbjp8bluhhcftt2vkzijkyilr2xssb4u8v7ov2sg2b65e556yl67jsnmv828yjkaxtod49swad4xvcni43u8eblnob15nw9tpfnvo26lfiggqqtboznshhsxlotdv14mgdjky76qo0jdym1aclnsx7k4jne19qizhugjqoe3xspssnmqyeiyaysk5gwwcpnactvrtsl31svny5c8m8zhtbo543jl4joya3jh0c',
                returnCode: 2469122031,
                node: 'qsd11adu9aj3vxl9fstv3vrwhuoy8sab11p3l3myrn5puy3ne25cub9ibjfzqxv4j4tnlog33p04bzo89qe0t21c4wi4ql7mqu2xlaywif9snd7shoa9kx8m6sopq0acdrusgqc16jniqwcxbk6nvyqh0us1vx7n',
                user: 'oilfej5gg5yog80c8jkkron3cc2kwue4xwoyzb1ji019osn04g5exxhzf1yivmksdgrjusi8g0xy4vo2rqwrza3rbk1ek60qpx1ppwh4vqeetn0i2j1gz3lt45c7vl10oyinodaihwnggz3gudghil5xpmjdqz195gdv318obm0hdx2xaljfvtjy06bdtr3udv40j5p3cc6jp7dtb8r5xqvxgb6xy6cdu3u8py2m0un2xlmd69056bkjuacby27',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5ace48ad-32c4-4b97-ac98-bab9c6671545'));
    });

    it(`/REST:DELETE bplus-it-sappi/job-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-detail/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE bplus-it-sappi/job-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-detail/5ace48ad-32c4-4b97-ac98-bab9c6671545')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL bplusItSappiCreateJobDetail - Got 409 Conflict, item already exist in database`, () => 
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

    it(`/GraphQL bplusItSappiCreateJobDetail`, () => 
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'c2f14aef-4d21-4ce5-be70-e12a5192e6cd',
                        tenantId: '31d05bcf-646a-473e-b8d4-f5d51a8a8af8',
                        systemId: '01e70663-2b70-4307-bd12-550eea966a57',
                        systemName: 'm6zrqtullv9l404l1rjs',
                        executionId: 'da856aae-21d0-4401-9221-57022adb2202',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-15 06:46:32',
                        executionMonitoringStartAt: '2020-07-15 17:09:50',
                        executionMonitoringEndAt: '2020-07-14 19:24:43',
                        status: 'ERROR',
                        name: 'vlml7s14oop6pwbgaxmoe1wkkspatgk1fcg79v14nx2sgh2dybdji4xsyc8lfrap0oi6gfaiv3amd09t47agzvwholm6v5apvy22frq1i624e3yezi9y6g04knixb5uausaq8bgtcxsz3urf54bigxn11fwyz0voohhz6hdf5tv4z5r3x1oriidjd48nl2eq9s6lyjmffk4dk9j6wb3vbdabaep2u63it6l1p06pew1meuadsmih92on0jzcrh9',
                        returnCode: 2604442386,
                        node: 'ks7ottqm5ozvjrsexufutqjwm7zvijr7vu66pxeiehzxx05l9qa3ir8kp1w335mvg8gerc9j939a65vh1yglr1rz921c1phod6wge290apgyhj6a2rd3o0faxoqy8hmwx821nve2pyedoaaqhhzfw8fzxp5cb9ez',
                        user: 'jhp7y4jpzumleqq5dz7a33mh9ccsz3mklo5bp67jsocz7p7e0eqzwelv7kuaz03k82w3wzvgnf9eei5wwo1t77cgw4wgrlh25610uy2hthtibr4rgur542jfbhdye20i83vncxf7o3lnljb2sbc7qbz9d0oh5ci6tocy9l5rmzkb9qgvzk5cln9xaszulgcwwv0kg1ri9orjfisdlybet278o3535nc5h19v2wcqxwpvgqk3syo81vpxnmtp26a',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateJobDetail).toHaveProperty('id', 'c2f14aef-4d21-4ce5-be70-e12a5192e6cd');
            });
    });

    it(`/GraphQL bplusItSappiPaginateJobsDetail`, () => 
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

    it(`/GraphQL bplusItSappiFindJobDetail - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiFindJobDetail`, () => 
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
                            value   : '5ace48ad-32c4-4b97-ac98-bab9c6671545'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobDetail.id).toStrictEqual('5ace48ad-32c4-4b97-ac98-bab9c6671545');
            });
    });

    it(`/GraphQL bplusItSappiFindJobDetailById - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiFindJobDetailById`, () => 
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5ace48ad-32c4-4b97-ac98-bab9c6671545'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobDetailById.id).toStrictEqual('5ace48ad-32c4-4b97-ac98-bab9c6671545');
            });
    });

    it(`/GraphQL bplusItSappiGetJobsDetail`, () => 
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

    it(`/GraphQL bplusItSappiUpdateJobDetail - Got 404 Not Found`, () => 
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '40ab6bab-22ef-4c57-a8a4-4903d53fa5b9',
                        tenantId: '48a45d59-5dd2-414e-a650-3ab0d80db408',
                        systemId: '5961370a-8c70-4455-9cc6-6c36f8e38778',
                        systemName: '77x0xf2osjucnfppnmy1',
                        executionId: '59361057-4cde-40f1-aecc-29a55af8590e',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-14 22:58:11',
                        executionMonitoringStartAt: '2020-07-15 17:37:19',
                        executionMonitoringEndAt: '2020-07-15 04:23:16',
                        status: 'COMPLETED',
                        name: 'punpzx90l5krrjkmjl7yw0bivft97lku5u3tumi0qi33lvjsn17z0ya7rtq16mco4n7h1dkx1npgvye5umrtdj8joarpnkng221kyb3aegtq5zy3dilxp8as3ir41vvt8uffp79n2668571p83wejji8f59oda948yo16noho1fgcdxjxtzvwc38fc9grvef9ml7wixvoaakbrfxnhjkzuo7hrus23mmd3dvn96y63p3st5eqw9kspzv0o6o3uy',
                        returnCode: 7559957763,
                        node: 'fmemqmeixearlply3zby5s145rwj2ab1si4fgdjjujsh4m34qpjbxxenqi1w6qqtuvey0clcbvxqugpdamxvxoiykqk1071p1fnazgfc139tsz2dba3qhb7c0z3ml46nkvulqym27mwtaszagzacmfn5irc571mb',
                        user: 'spc1ode40bvmz3yo0rbubyltfram1j5who0dxocq51a6hmji4jd4hyaae1zzus3vcrhkpffzf7abjc6fgnkyok1r1nh4ccpy49ohbtpeshaf7kevu4fh3rvrpaehkfcjvyus909k0v0ovpdyek2omqvso69s0b35iz3kybu3lc7qs4x0fzxm6bnmk81xhrlg3z9nbcbci0827a03xh56j35a50k1fcylt53tyblp1kap0arjyyb0fxja6119rsz',
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

    it(`/GraphQL bplusItSappiUpdateJobDetail`, () => 
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '5ace48ad-32c4-4b97-ac98-bab9c6671545',
                        tenantId: '31d05bcf-646a-473e-b8d4-f5d51a8a8af8',
                        systemId: '01e70663-2b70-4307-bd12-550eea966a57',
                        systemName: '9meniho41o5hxlet0r0d',
                        executionId: 'da856aae-21d0-4401-9221-57022adb2202',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-15 02:39:10',
                        executionMonitoringStartAt: '2020-07-14 20:22:41',
                        executionMonitoringEndAt: '2020-07-15 17:20:18',
                        status: 'COMPLETED',
                        name: 'xn6habb39fe7d6b4bgckmbm0rfx8osy5kxjymdb5wjlwzt32wta0nseu67b0yco7avpjdntqdb3m515m3ydl9u3jlybl58xq53ar6z4hgstt4faq2ydvi4wy35z3rnar2ibr0cqr6p9ilwiy2i3c605zv7q4trewt79xu2m74b0yfb71hed8tj9h6r6xamvyuisadh2kdv3vswkccxyd227dg0cinngsizst03jspqcn5izo0czdltt5xs4ay79',
                        returnCode: 3803413260,
                        node: 'kiy5i3af5wwl9p3bm2twi12sham01scue4feup2ryhotun8dgq0671plcnrzkp54n0pr69wfc20ur8eyzlf478yayj5luuvjklc2g1wguuxbes63fwqzj4o3gx2nagw1vzmp2zid3pux1bf2aksz4catf72vbo0x',
                        user: 'zoyjvu3edb060t3y4vghsgdrcnzwanbpm3y62r3ki7hzdoru558u169tu2w8gw5lv55y7sv5r4xavfp4qsdr7ons4926nlwdb1jipdl66w4x4lkbo7nnbzm2ql5c4ofu3wixp44068082bn0y7iotsjw03k7etqfj7d91yijzsk3xsyzw4yzgg0k8bpv0bekq54pgmmkmdr0f41c341cvin3704y6muex7fhiata6l40s643j9w8kh2vf82w9wz',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateJobDetail.id).toStrictEqual('5ace48ad-32c4-4b97-ac98-bab9c6671545');
            });
    });

    it(`/GraphQL bplusItSappiDeleteJobDetailById - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiDeleteJobDetailById`, () => 
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5ace48ad-32c4-4b97-ac98-bab9c6671545'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteJobDetailById.id).toStrictEqual('5ace48ad-32c4-4b97-ac98-bab9c6671545');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});