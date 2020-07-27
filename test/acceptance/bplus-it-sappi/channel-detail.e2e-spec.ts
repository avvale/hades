import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IChannelDetailRepository } from '@hades/bplus-it-sappi/channel-detail/domain/channel-detail.repository';
import { MockChannelDetailRepository } from '@hades/bplus-it-sappi/channel-detail/infrastructure/mock/mock-channel-detail.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('channel-detail', () => 
{
    let app: INestApplication;
    let repository: MockChannelDetailRepository;
    
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
            .overrideProvider(IChannelDetailRepository)
            .useClass(MockChannelDetailRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockChannelDetailRepository>module.get<IChannelDetailRepository>(IChannelDetailRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '3417d5ec-1f10-477a-87fb-f7d0fa0562a3',
                tenantCode: '9foqcia7tzsb421fm0h9ppevrbo3t7i9ku1w46iugbxsmyrpqe',
                systemId: '74e7e1cf-88f4-425d-8795-33103ff20f73',
                systemName: '0iyyp54npyabg97q17yy',
                executionId: '5ecca706-d8e1-4495-b131-c36f7cc3cfab',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 15:37:35',
                executionMonitoringStartAt: '2020-07-27 05:42:24',
                executionMonitoringEndAt: '2020-07-27 13:14:19',
                status: 'STOPPED',
                channelId: 'b1050b31-ad63-421c-ab5e-174a0084d9d9',
                channelSapId: '2s2zrhl305l28w8zuaoxjxwk5dgwcq0ebflmy714rqevf75y4o',
                channelParty: 'pnpow3gd82qyzf1q6imyqs9scb69h0hlyigsnrhl85ol3i5wod6ip0sgdjyd85qxrme5crjxg53wkbljf5qubopy13zub17c6qbb40szxkjev0o6w48tv3tfwwmwrnhfl9dt7asi8t1i4isjfbvq7i5q8x4l894k',
                channelComponent: 'ecafuf94z774qoeliso911dbkjvrnl5bvmu2yczbnsgq9542hivksepo7yditos9wkfr06j09crpnl3ynsx1hem86i56737m3rl15wdmb7kdd1wjhqm7aewn2r1ncqjh1pw8c4utvckhp4r60ydo4a55rq5pxiat',
                channelName: 'lin0xpk3mwsvxj95iaubrd3lwc6spbkhzgklvqin2k0yo0ndx64c7aqq5s9xq5lo60859b6h6yb1hukb02odxsuo74iwsh9wb26cb5i7j2w0gd03up47qrdwudjeisfvaij4sk2nz0vicmjgliyhiypwmxnzmipl',
                detail: 'Error in autem voluptas voluptate. Impedit libero voluptatem vel ut necessitatibus velit. Nihil eum est. Ut soluta quaerat beatae. Similique qui iusto delectus alias qui. Impedit commodi veritatis excepturi labore voluptate.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '3417d5ec-1f10-477a-87fb-f7d0fa0562a3',
                tenantCode: 'qvqp7skhme1grmps039omj1mucgykbr52599wba2x9f5gkqkwl',
                systemId: '74e7e1cf-88f4-425d-8795-33103ff20f73',
                systemName: 'jtpmkwjxkxgtll4ug1wh',
                executionId: '5ecca706-d8e1-4495-b131-c36f7cc3cfab',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 08:54:00',
                executionMonitoringStartAt: '2020-07-27 19:03:26',
                executionMonitoringEndAt: '2020-07-27 11:46:27',
                status: 'INACTIVE',
                channelId: 'b1050b31-ad63-421c-ab5e-174a0084d9d9',
                channelSapId: '5a23vvnwl2m7gk7cskvw28rp0z16pe9zxviabhb1o8w5kac1fi',
                channelParty: 'hsbe5xp9xrukcgmptbo3ofixz310znm1dinw9ux9k4on7ify2tem92aq9ognf8zk9xxax0roa98t0i9bs3jkp7v9f8qpkacq4qtin4au95v4x8jlxa6odh187cn3th1q6s1gxx2vpi4d8jm56c813e58bceovrqw',
                channelComponent: 'a520cla9bm0izt3avj70wzsc9cn0e1y8m7j4nsjmanyplehfs6i1xugnhp9t7leg9t89p10z0qiej6645xmy6fe269ocmesfqx1mp47opm3lpwd8p7c7gtl2i5nkjrf5csoewphduelptjf3fzhjbifgul5ouk1c',
                channelName: 'fxlxw6ofufvo904bbinu40ku0jp7otobe8tu62c5cx6dteoxkugde8nhsdxp1uc16n1m6ma28962ssucohdqxjldw84lvpj048erhdkqlgpaank74ol2rk2q2x6c8fcgozkpy8itsz098ndqw1pjmpcydo9hhebq',
                detail: 'Enim accusamus velit sint hic assumenda omnis. Asperiores ipsum omnis labore. Dolor et et quasi non ipsa. Ex quisquam porro dolores aut voluptatem porro impedit.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '436f18ff-0a01-4f81-84cc-50bc62254e61',
                tenantId: null,
                tenantCode: 'bprlg4hqy1emq3lt35is936ncohyjfkui8hp4zosquo8du2d8h',
                systemId: '74e7e1cf-88f4-425d-8795-33103ff20f73',
                systemName: 'c1zoufw45yiydaz771pb',
                executionId: '5ecca706-d8e1-4495-b131-c36f7cc3cfab',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 10:13:15',
                executionMonitoringStartAt: '2020-07-27 14:27:27',
                executionMonitoringEndAt: '2020-07-27 23:26:47',
                status: 'UNREGISTERED',
                channelId: 'b1050b31-ad63-421c-ab5e-174a0084d9d9',
                channelSapId: 'xv2xbkj409velq7bg2pzjrs5smzyttsbup4fbawx4g2pk04kd9',
                channelParty: 'el7sskt2lcjs8gvdd5fx117pf2ki8pqjxy8cq1wxrjvf2rkk20lb4js56fwtg6bezbhkmf2evkzb1lc8ptie630j835xh4mr4ohlqwy5va1bxfsrxzno7ksr3golmrpbsb0hz8j628ya7tbt42rjd4nroys6lpfk',
                channelComponent: 't47e9qlapnumr6s2l30ru8v8tn9i3exzcp962h4l5jkh71n36ohmb3njb3glb6iatxmonkuqj7tzgzq9ehm9jon99p8m6ub6awcomf0pkb7figcwtvaxm5g8o77zmud4k1kvu52ppsggbg2bo9xgt6qjdqhpqz22',
                channelName: '30uyeq6icc531kudeix7bm24yhspnwry7in2tf8knwcahdlxjcncvfpco2e8esft6taealja2j5lnviy0ln3ihxfal02l2mrh73bs23oexfjb7tozikgwlfznvs1lmmte9yd80ugss6aju6xvtrxcd6g377a97dk',
                detail: 'Suscipit eligendi porro. Sit in dicta veritatis aut. Dicta id explicabo. Sint eius voluptate commodi voluptas expedita. Ea accusantium et ut quia. Sit et inventore veniam debitis id et reiciendis doloremque ea.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '436f18ff-0a01-4f81-84cc-50bc62254e61',
                
                tenantCode: 'v14uyjhzsl974u2vrskg8o48qb8bti1rggoku6bkahgqz479jq',
                systemId: '74e7e1cf-88f4-425d-8795-33103ff20f73',
                systemName: 'cr5ezkuxxnr9fov4ngtx',
                executionId: '5ecca706-d8e1-4495-b131-c36f7cc3cfab',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 07:41:52',
                executionMonitoringStartAt: '2020-07-27 19:57:19',
                executionMonitoringEndAt: '2020-07-27 11:25:09',
                status: 'STOPPED',
                channelId: 'b1050b31-ad63-421c-ab5e-174a0084d9d9',
                channelSapId: 'ryirb5a2fuxdsqgycsc3c53qhdq2vrlbjvr77tpewuzml9x949',
                channelParty: 'crkxat1ss84ps2ej10tbzxnhhidhyclockkdrmm9f0dfbmo4tfco3u8hb9ygx6q5s5i7ohq1m1lsfag488zpdhnyzxwwlzk1uo1g2mqnqybajy1fih1dl3ef2ficru9m3nh1dso7kzdtjfm1pq243q7yewiyc5cb',
                channelComponent: 'ieyvma2y1lw6qc6di039gt9prqpy515fepmdx2zfvvhoq61dady4af0kmfysazqop7x35b9a00gi6qn6k9pr2exty4ialc3grsef77p3u42pkupxncqef21eek0ge9193vtdrfqews3plmnttw5dm42o5cit3tbq',
                channelName: '4jvwu62jeq42hophi4ck1pk0j61vs5o6mxf3o0b8ktyu4yml9f7f55n4yuik8bhbubftplgbopssir8mxjwqatnkdm24lvp7lwaw4dx3r7oa66ezku9uxza14hkis7zmie1pk577ttgjnc2986j6c5hyfmw3nt1j',
                detail: 'Rerum consequatur odio eos dolores error necessitatibus. Harum voluptates quidem inventore distinctio aliquid tempore at dolor. Dignissimos omnis numquam laboriosam est odit natus. Libero ea et et ducimus earum cupiditate natus.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '436f18ff-0a01-4f81-84cc-50bc62254e61',
                tenantId: '3417d5ec-1f10-477a-87fb-f7d0fa0562a3',
                tenantCode: null,
                systemId: '74e7e1cf-88f4-425d-8795-33103ff20f73',
                systemName: '6yk7o5rv16bd7fvarn2s',
                executionId: '5ecca706-d8e1-4495-b131-c36f7cc3cfab',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 08:03:01',
                executionMonitoringStartAt: '2020-07-27 15:15:53',
                executionMonitoringEndAt: '2020-07-27 05:29:46',
                status: 'STOPPED',
                channelId: 'b1050b31-ad63-421c-ab5e-174a0084d9d9',
                channelSapId: 'aof6up5falzdnmn0zx14wzm7axhy7xigy8uwe822r647k987qt',
                channelParty: 'olfhihfl8e2i9209i9u61vha5yvtc0oqnm8e3yfpstbe7lcn5a1h5hixpbc84bh7xe7nbh29xzw4srzp0nth90dx26ycuinzn9iqnor4mcch2wbdlvismui62n7wbhoeuftr3jg1yhfgw2ow4tvar0hv0xuxdd93',
                channelComponent: 'jii6qnrwteiifdbotslomlcooptam6y78b0k20y21oeuk6kbqs13ts5hxh0kywoxz7azg7h5d9k5rihl40pp38a2ykmqa60b8q5c5e5weq2swi1fr9bqd2rihlw1ge472z86anywwuytkrwaw68g35mvnt24hwc8',
                channelName: '2hlohlvos6upd7zf5hq4x4jfqbzc42oiumavhyd9k42mkw7rz8gmjqjwbit2rhkri4o94yss8qdlfoa0ywtl6lj3upp3qni0pyzavd0jseyhs7fyju7x85f4by5byd2ivr9diuewe6hwjsye9atm528cvbpnhva2',
                detail: 'Itaque hic suscipit. Voluptatem dolor error quas ducimus modi. Ut dolorum qui.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '436f18ff-0a01-4f81-84cc-50bc62254e61',
                tenantId: '3417d5ec-1f10-477a-87fb-f7d0fa0562a3',
                
                systemId: '74e7e1cf-88f4-425d-8795-33103ff20f73',
                systemName: 'vi1gh9qeu69flwbr9bdr',
                executionId: '5ecca706-d8e1-4495-b131-c36f7cc3cfab',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 14:07:37',
                executionMonitoringStartAt: '2020-07-27 20:04:34',
                executionMonitoringEndAt: '2020-07-27 10:36:37',
                status: 'SUCCESSFUL',
                channelId: 'b1050b31-ad63-421c-ab5e-174a0084d9d9',
                channelSapId: 'gw9qn2v2aejhnsac7xb7cp9gstyxvl2gbdc1ew3wu8ag86hcc3',
                channelParty: 'ehge5qyi7s3y0z9ldiyj6gnpnhorjerxy0hfv93doyhmr3o1bqn9kbjhnwugx7gguwsla3zpuodm9gr3niyvglqzzacca46f7aipmr9u24tipwhp10op5chnjc41snr4zgwtn4z5dggf356geg3cgi23nxf5frxh',
                channelComponent: '31yi8hv1izperv5f7lmkpe7j062pwqhl0bxdkn4h3rwf9r75hqw8efexblk9x73sifyznt4ok19x9mgmvp7vrtynwr12iydngwkf21zi0w63j60eouiht84w3szw0b4pncv89u56343eydlt1gn40ifvfj7q3zbn',
                channelName: 'komntp6znror2b33fclqplc1gfquwvquxzl68yro22jyv9kvxnci6pt6izkbq47wc0wcukh5dautz4xzj0rcktk79scqm8azhbaicy254smhfr8ik8gjubsuawl8kul6jwoe4asucxscjz9veqh0s9cmlv0fjpt4',
                detail: 'Consequuntur at dolor et voluptas et exercitationem error inventore laborum. Consequatur consequatur minus odit architecto est nostrum nesciunt nihil. Reprehenderit aut est quas necessitatibus et.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '436f18ff-0a01-4f81-84cc-50bc62254e61',
                tenantId: '3417d5ec-1f10-477a-87fb-f7d0fa0562a3',
                tenantCode: 'oucrf8qsq9axjw25fcjykysj9a2yd3bqz2zlnitaxx74mum2ym',
                systemId: null,
                systemName: 'gtl46ycjbnhycn8fftxj',
                executionId: '5ecca706-d8e1-4495-b131-c36f7cc3cfab',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 18:19:10',
                executionMonitoringStartAt: '2020-07-27 00:57:29',
                executionMonitoringEndAt: '2020-07-27 20:28:27',
                status: 'ERROR',
                channelId: 'b1050b31-ad63-421c-ab5e-174a0084d9d9',
                channelSapId: '0oop9mczfqr0265bplca7xuiv2109dgd1ky3nl5c5xyefokfa3',
                channelParty: 'q8mri7cevyf31rzk2rtd86v1jxxvl8jrdrd5diehmi6h32ucathrrqrlm2fze635cxx5rfl943bfwsfpt6skzpz4uzm72f3t64k51kmxsyd6webqkwti4iw7ikkufg1zqzv99etjlezv4su4kkgyvhbwv8qpp7hl',
                channelComponent: 't1y7rdipolpmq8gjvact15fwg15spers7ompy4sdwfy4f4qqvossigrewnxrsxs3et53ch851jrj5qk5n9cce6ghp5s7s78rl5vedfjhjoqdveofa4n5kz1iuanvmc1y4gnodxriy5jd0c8s6td5za0lylh3xv34',
                channelName: 'risg03czgoojv97igxo9fczgst0al6aa7nopr4kaqfw7lrfx6vsx8zlqyy5lyyhus2wgg25m091e1rydsir306lc4pcqsmmn1x9r4f25ma58z1hg0w5bjn9mukob5jjmz8k7tr8tkq4tq1mkm5apz8ymco5xgtzk',
                detail: 'Fugit nobis dolor qui quia cumque fuga. Sapiente qui voluptas voluptas officia enim. Minus facere voluptatibus occaecati fugit porro. Dolores qui quos et magnam accusamus. Et officiis vel quia voluptate nihil. Laboriosam qui nihil fugiat quisquam assumenda dolores rem et nesciunt.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '436f18ff-0a01-4f81-84cc-50bc62254e61',
                tenantId: '3417d5ec-1f10-477a-87fb-f7d0fa0562a3',
                tenantCode: 'ffuvuha10md6aibsrr367e6noi51b4hn7is3h49fwfctcxlgzg',
                
                systemName: 'v4t5qy9ks4nv7urrdgfi',
                executionId: '5ecca706-d8e1-4495-b131-c36f7cc3cfab',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 16:14:56',
                executionMonitoringStartAt: '2020-07-27 18:45:40',
                executionMonitoringEndAt: '2020-07-27 02:39:28',
                status: 'INACTIVE',
                channelId: 'b1050b31-ad63-421c-ab5e-174a0084d9d9',
                channelSapId: 'ezas3ac2xjb8kwcs43tl6ghcaxy8499odgwb0ts96azazfvk56',
                channelParty: 'fyu04xegvabq6n3qu8yuouvkajrss3uhwcdd6ttb4k27ofujof9k19xvmoez2n07ysjn3imjzpl9jow3g99uoz1t7spibsv7177mac5jeyrcxv74kw5iaaj3frgzbsudpgshvz6fofbpj1z39i3u0vrphzlgai5v',
                channelComponent: 'yggrny9vb2tgez8f4dwe460327ak80em6yxwhogtc3w50d4kteo2camr8jixyk5g0pnrf5c1f7vy5eouhjlel5y08dh5da9z0xlm70iwhi1ih19vlt9svwthh9cpau30ajhen31y7i5p8vsxqwkrkxocj7o0cimf',
                channelName: 'u0d96g8rgjpnuhiw8rwzc7ls9r4tw5jvn17gzbr10vfgw2ze4dfnq7l9ayyglit38vj8hz3wre7qbr0kpbpiqim8uta592ipr85z70115mv3sjeh0fb9frdlx5w1mb85b8h6k5d2h23lroneg2bfy91mynp0dbnu',
                detail: 'Optio voluptatem exercitationem accusantium eos. Harum qui ab molestias repellat consequuntur quos rerum qui. Error quia libero quo earum consequatur sed qui omnis. Impedit autem qui recusandae. Aut et architecto doloremque.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '436f18ff-0a01-4f81-84cc-50bc62254e61',
                tenantId: '3417d5ec-1f10-477a-87fb-f7d0fa0562a3',
                tenantCode: 'r1518pvo6qrl8lqenr2zv2hyspwctld1fgjclja4gyn3tzdpsa',
                systemId: '74e7e1cf-88f4-425d-8795-33103ff20f73',
                systemName: null,
                executionId: '5ecca706-d8e1-4495-b131-c36f7cc3cfab',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 07:53:02',
                executionMonitoringStartAt: '2020-07-27 09:33:50',
                executionMonitoringEndAt: '2020-07-27 03:01:44',
                status: 'UNKNOWN',
                channelId: 'b1050b31-ad63-421c-ab5e-174a0084d9d9',
                channelSapId: 'cv5o4x9l91njob3ceiqu7bo3nm23ns40qebhav124shy6bobg4',
                channelParty: 'z2gyp4lhb0zg68a6kla5h9ufst5n9ei09ni1i98lf9laotbks35wzjoxornf5dwsmyxis8mnlj4k3q52yev2vm9qxqjm8bmpkjjwf3w0rjj55gd5nis2pwdv1y3w56cq2d099wjkfkaj5jraof3zofl1kx5rm5xw',
                channelComponent: 'rrqp2omvyonek1ip194cij3kg8pu9g4515zgk2oi33p82da7y80tedh9hjucjg8ux7tmximtj77gfypdp99nfgchttebgiytuvp31lon5o5m01j98i2t0sa3xymhvtr8p4a61prc6h0952ovvbz6jfqjf8ss4mx5',
                channelName: '4qtw1h7uf6wrc8ug4evoellcpbf4pz7411k5gaoavc1xde00p5f5jd5wkbodth7nwmbsj5m8tsxeykan2u9708s2vv606ng7e0vyrekebh5ceuiaoxdl4lkwl9stabwkmtflzowxzaavi15g2d37rxt4ij7mbmlu',
                detail: 'Praesentium debitis id voluptas laudantium quos. Natus nulla consequatur eos magnam totam sequi qui cum enim. Nihil eum unde quibusdam doloribus et ut repellat fuga quibusdam. Qui explicabo laboriosam ut aut cum eaque similique. Et asperiores error fugit quo. Placeat vitae aliquid id atque.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '436f18ff-0a01-4f81-84cc-50bc62254e61',
                tenantId: '3417d5ec-1f10-477a-87fb-f7d0fa0562a3',
                tenantCode: 'lq8n64f2ddcm845tbh6ym2aoh7sf375daqa2njk7mwmiqtglcg',
                systemId: '74e7e1cf-88f4-425d-8795-33103ff20f73',
                
                executionId: '5ecca706-d8e1-4495-b131-c36f7cc3cfab',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 10:07:27',
                executionMonitoringStartAt: '2020-07-27 17:47:08',
                executionMonitoringEndAt: '2020-07-27 07:09:06',
                status: 'SUCCESSFUL',
                channelId: 'b1050b31-ad63-421c-ab5e-174a0084d9d9',
                channelSapId: 'u9xz8n8mj1j48rtrdeba2pzv8mdc3nt25g1ghx8roxh3c2fj7u',
                channelParty: 'wwydnn4b6gop5rtemoam0838qb5922l6ya5i2bbwonrdg58yv8tc8sqlkxsk7igv3iot69c3z10c3z2pe8l74d2dvr5w6f33ch3doguyev4uxtojeqpazbk8mp8zvxnbqdjivapnaa9s42673ifisg7zbthfyuh7',
                channelComponent: 'oforpliufh3annxo6citibf5e7d1h6wghexigi3yhojh62c6u0pkcrz0055egurzl6dp72pzy3fqbcnsb32a9ghp8i9r5n5a0pwrxqk5lwb4xks1n7lfu3kory1y323jksrk5t40usk8701pelxuvqvwqbcyb98v',
                channelName: '3bsvjjhghhcqjpoikyvv8xrqbu1qxqg2znwbmcyapgkuweis53zfgsu4awju7lawmibeoaoinzubofwn7eqm7msnruuxh6pedy5yfgmn5c213blfnpi8hv4j8xiolq39mnd40ox0rd2znvs38nqalo6ird0dsj7b',
                detail: 'Repellat fuga exercitationem rerum. Quis quis error. Beatae deserunt suscipit aperiam eum nihil.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '436f18ff-0a01-4f81-84cc-50bc62254e61',
                tenantId: '3417d5ec-1f10-477a-87fb-f7d0fa0562a3',
                tenantCode: 'k1g4jy8hcy532seqsrh5m4kqm4p0332431bhvxh5n7uumcapo9',
                systemId: '74e7e1cf-88f4-425d-8795-33103ff20f73',
                systemName: 'j9w63az97yaq0odfxl21',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 05:28:42',
                executionMonitoringStartAt: '2020-07-27 22:21:23',
                executionMonitoringEndAt: '2020-07-28 00:52:36',
                status: 'UNKNOWN',
                channelId: 'b1050b31-ad63-421c-ab5e-174a0084d9d9',
                channelSapId: 'xjjj35dembbwv84sp33vmfbojz9n05mipyhg2accyt113i0eaz',
                channelParty: 'dfz8crx6879hlcxnns91b66zwg6n3tfpzig3k6moc5a0v6gbdfc9uv7jqfzi6yqw92nfvjhoqj0ib39i4mrv745cexoxnhl8aufhs3m6699kqah7wc4aqe8depjngq7317at1r2i79i5kgxuvcfq11rd8oi5b695',
                channelComponent: '6minewcaubbjivaqb2q65aivt48qfl8bosd82idldghiqyj27ybcjmbi0z3emyy098ct9p5wwehn95k6czj7c3y5e56ua6eaow18u0qtwzjm0gcl5jix2mordrc7n49eavc2nnj3bquumv03lk2q1zupziyobm9n',
                channelName: 'rnkqknx53sv3eg471sxj94qelvm7s7js7zus76wbug7bhvcdq8gu9yk19wjpddcvpwznfhqbl7vmyjshwal3rrdwzuiq9121bsdmyk5uehexbs6qzrbfqlp9mxcysk8j0f8mkt99cn7a20rp8iqslx740cotbwhe',
                detail: 'Tempora veniam quia incidunt modi autem quia nemo et. Nihil aliquam possimus esse ut eum aut quis. Enim ullam dolores totam quibusdam itaque repellat voluptatem. Sed quo iure eum a eius incidunt qui facere. Sed dolores cumque voluptatibus velit officia sit. Amet blanditiis iste perferendis.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '436f18ff-0a01-4f81-84cc-50bc62254e61',
                tenantId: '3417d5ec-1f10-477a-87fb-f7d0fa0562a3',
                tenantCode: '69aujrf4n5aloql6e05rrf4k3cyojwp872noh64rql0wioj1uv',
                systemId: '74e7e1cf-88f4-425d-8795-33103ff20f73',
                systemName: 'cxuywcii20aavxi50gwg',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 03:18:39',
                executionMonitoringStartAt: '2020-07-27 04:14:33',
                executionMonitoringEndAt: '2020-07-27 20:23:29',
                status: 'UNREGISTERED',
                channelId: 'b1050b31-ad63-421c-ab5e-174a0084d9d9',
                channelSapId: 'ukfzsrc0ub0opchcnk9fncmbip2j3dlxao95adfh3px9bxj8ls',
                channelParty: 'w960e590ytel1npb33uilxbde4qa4eqcbvl230uj1b32hgwqmhh3lyyqdlrfhq9kdulfv1x8d5tmsce3xb42xnxre3uy2xlwn0f9896zjwlevyhkyzayqu2k1y1uiz4b7lqryk3n0926nk2hx6nqm1l6cglzeluw',
                channelComponent: '1l5nqln8mshk4bmnsrmwt158m2d802dyxmzlwuq939j7fasrs9dvar0h1uqjieejydi3morambd2eq0moecnpbpfcs6bdlaen8s5984iw99p6kwuc41htmcfb65wvqrd0ch7chnip1ntforju3sbrnbx44w2nghm',
                channelName: 'ttkjouukrscvseypmyavvobrfp4wxi88icwgtc7hnllrh5nuo1dacr0hamgko0zc72055kyfw9hzk6z6os2mnj04q0baejmosw509ggyo8fmbvzesnod8kgwshrgulseczwwxo5wt7pd3jsjbhgsx2x0pkdzhz35',
                detail: 'Ipsam quae voluptatem vitae consectetur aut ex fuga. Ratione nesciunt at vero minima temporibus ut odio. Nobis vitae mollitia aspernatur qui. Ut iusto dolorem impedit ducimus soluta aliquid. Quo quibusdam iusto a temporibus nihil natus debitis. Voluptas dolorum mollitia repellendus.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '436f18ff-0a01-4f81-84cc-50bc62254e61',
                tenantId: '3417d5ec-1f10-477a-87fb-f7d0fa0562a3',
                tenantCode: 'xudm1tx7ny7fvleos5e4vhcaxb112lxmakqs7a7qd14ehkc09w',
                systemId: '74e7e1cf-88f4-425d-8795-33103ff20f73',
                systemName: 'xf9l118or635036u1hti',
                executionId: '5ecca706-d8e1-4495-b131-c36f7cc3cfab',
                executionType: null,
                executionExecutedAt: '2020-07-27 18:30:54',
                executionMonitoringStartAt: '2020-07-27 02:25:04',
                executionMonitoringEndAt: '2020-07-27 09:51:09',
                status: 'SUCCESSFUL',
                channelId: 'b1050b31-ad63-421c-ab5e-174a0084d9d9',
                channelSapId: 'kc3l7s14rby0gampramwzzuvxokcj4qpkhph3d5gyeqvcek23d',
                channelParty: 'bkkwp1gutkeeha9i6j1eci5wf1mgin8xqvp8foijx000avhl7kjqz768qwyw8yjz8k62thzp98ywe0832k1mwqjusu2c0ujxemef8n9u9fke5y2ua0wpbgj9n5vkg3mcg6fo8nq2b2xpriaf9wtjloxv9n29lvv1',
                channelComponent: '9bd4qiv6l0v623cxq7a9p998jus7nh2erjjp4ou2qacx9fkxdw4iecjnndexytxrn2eiy395k7reen3uwt6veo8vpoxmkg2fgdsk7b0dagull4a1uu86ag3po28l2ik90yl4maaaitg8t65pgv4h46rc2mg4uos9',
                channelName: 'aax8dmsggm0b9alt0u5o0bko5g0brwtz9sg3six30htluu9thjrzdji7lpgeqj9kptecraw6joq2kljlejruttvsi5zmue8kjlklwbdxnoyxpvpptdptv6104rfb3xgx7lqxe1p0xkzv6x6b6uxvdot775v959fl',
                detail: 'Ratione doloribus blanditiis. Nihil dolore et distinctio. Incidunt officiis libero ut. Dolor numquam corporis non deleniti adipisci doloribus.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '436f18ff-0a01-4f81-84cc-50bc62254e61',
                tenantId: '3417d5ec-1f10-477a-87fb-f7d0fa0562a3',
                tenantCode: 'u6y9yb6x5qmrivuu9108zxbsv49pkhkq70fydiejrc58054wdv',
                systemId: '74e7e1cf-88f4-425d-8795-33103ff20f73',
                systemName: 'e70t5jcs2c87ksutaqr4',
                executionId: '5ecca706-d8e1-4495-b131-c36f7cc3cfab',
                
                executionExecutedAt: '2020-07-27 07:42:23',
                executionMonitoringStartAt: '2020-07-27 09:55:46',
                executionMonitoringEndAt: '2020-07-27 02:50:56',
                status: 'STOPPED',
                channelId: 'b1050b31-ad63-421c-ab5e-174a0084d9d9',
                channelSapId: 'v3snjzfn1t50lrb9c51yjpwnva9jxyf478ciqajvyud3o5xbyt',
                channelParty: 'ncgr020wwxoa3zr7v2mzb6mi0y8038p1pargz2t7nhectfvk1oggggfnxavero29j2pya4s9maqyieifbek8fotf2me33fek6sitopngt1j3ncjkmh2tts9z13478r8s8mhqb8ef9qkagkx439guuyycyy54soey',
                channelComponent: 'uujxd3o5sw2rhbbrlo23mjetdpoi4zqlqef612avmphd361wmj6liwq9rzhc6d3v8ze2z0uhnqhn06ot5388lbpcnjq01jkretdtt5llwyj72i7owul2mor1fawgdgem5gyo2tu4if4mbl79570v9ef45v3hoaeq',
                channelName: 'kxqiuqizbn1gs2d7nd9x5oe40r1yran44uy23x17jq3zslnzon2fw2pncicvggqh32eb4xhmnsqpv8awfewx9nzgb2s1utkxdvldqzyxk3j9qtt2ndwbuzpc3olw3kez3ucbtzsez52i2k3it4m2tyy9967vmcnb',
                detail: 'Iste voluptate officia voluptas nulla reprehenderit. Et neque omnis aperiam est. Dolorem commodi voluptatem accusantium eveniet qui reiciendis. Nostrum dolores blanditiis exercitationem provident possimus nisi facere.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '436f18ff-0a01-4f81-84cc-50bc62254e61',
                tenantId: '3417d5ec-1f10-477a-87fb-f7d0fa0562a3',
                tenantCode: '4mv7plobknb4yz0vm9r48rft17bzxm5o4zwc4dj1eprrj4apwp',
                systemId: '74e7e1cf-88f4-425d-8795-33103ff20f73',
                systemName: '9wvqs6twojjjovxs7u2x',
                executionId: '5ecca706-d8e1-4495-b131-c36f7cc3cfab',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-27 03:10:25',
                executionMonitoringEndAt: '2020-07-27 05:06:20',
                status: 'UNKNOWN',
                channelId: 'b1050b31-ad63-421c-ab5e-174a0084d9d9',
                channelSapId: 'ims0op9hdtvon6tyhvndqmsb5ryhqcm8z2moeivuzajf2284w5',
                channelParty: 'ydeadcd4um0huvbvwqwyvvqjq9d1ia07c0tjdn06mch4ysjmex08zopzk818e54zu03gkwa9a158c16de6f59wlqrqffjlu2eofjs0i8l9o4pe434dai6aky0vr0qqb3jlmw5ieh2u20w8ps0fn74ajluh41cbkz',
                channelComponent: 'hlyetg6g9mo9p9sqx9bp7mnslwv46acvmysy3gpaa7yk5cqjm7q5cw4c4nh30c2g4nq1hb81762sw6e16j8dctfzyo11qxfc0m8rik8c898bn5flv3on7sivhjhrzqfm32xjd4cqi3o0yplw1ehlwjdo76jcerdw',
                channelName: 's52zrk886uanjznrnzo0jf67r5bdr9at6vxntcv7hit30zq6t24dk3dz1hcvw46rurv0tgkud0js6lyh7jpwfdl6if04nj8don7to8f40cjf4xyl49f8n6lu6xij8zikgno5cjggoeiero3seihawv4dx0exsp5s',
                detail: 'Animi neque vel numquam cum earum ut eaque voluptatum. Voluptatibus ut labore. Consequatur necessitatibus est ea harum labore et in nihil sit. Error voluptates numquam voluptatem voluptatem voluptas.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '436f18ff-0a01-4f81-84cc-50bc62254e61',
                tenantId: '3417d5ec-1f10-477a-87fb-f7d0fa0562a3',
                tenantCode: '414sju6xke300ahsdboj5hbnre22vme70mgbtv1mhn2w1pdocn',
                systemId: '74e7e1cf-88f4-425d-8795-33103ff20f73',
                systemName: '0x7xl2u5sxn5qj666ha7',
                executionId: '5ecca706-d8e1-4495-b131-c36f7cc3cfab',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-27 13:41:20',
                executionMonitoringEndAt: '2020-07-27 17:36:06',
                status: 'SUCCESSFUL',
                channelId: 'b1050b31-ad63-421c-ab5e-174a0084d9d9',
                channelSapId: 'wpwf93308bp3ln106bu2fgizenf17i8jhga4fjah9x1817or1p',
                channelParty: 'e0hg0qinma674wn5e8epy7vr2zfhbpkjj2yo1qpq8otidrlp903ey31tsgbph7dzggr5t2qyzvof1tl2p69la5ugjdbc6y11n0nhjf9n0wjkgurg3dhjts0uaqw140zt0dbte271rv7xtqq0tcjchr15ulmsr9mx',
                channelComponent: '4h4b7lt3otpphggz7bsd73nzsic758nozcmjbf7qb30yw1gylv1e7y8gtt1m547m52x82z1fr2es03pljdxd1mal63debrsvdtq0scyo05n49byz34cw6ogx55062q0e1jsupqg7vmwlho5eqzme1ngngxed6wpb',
                channelName: '4fcj954m4wqiis9z336obcarn52izrdllikbw227pivppvdymied8m5lzgekh668mitf4scw4mjr35r5i066vv2ok9zb2gb9ht41272m7mstdjadensycohcdm8njq00j2gos1vt2e8zldlav3wwe5st2alcg2t5',
                detail: 'Porro quia sunt sunt rerum non ducimus soluta quas. Perferendis dolorem sunt ducimus cum officia corporis distinctio quas. Ab delectus distinctio qui illum. Velit nihil repellendus magnam sit doloremque qui sunt. Ipsa ipsa fuga tempora minus consequatur error nulla. Distinctio quos placeat mollitia natus.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '436f18ff-0a01-4f81-84cc-50bc62254e61',
                tenantId: '3417d5ec-1f10-477a-87fb-f7d0fa0562a3',
                tenantCode: 'l9rm4ayn22bwd929zar6ktk5tv589w27rnl3dqvp0a6oax4l6g',
                systemId: '74e7e1cf-88f4-425d-8795-33103ff20f73',
                systemName: 'blk8aq6de0o01qkxqaus',
                executionId: '5ecca706-d8e1-4495-b131-c36f7cc3cfab',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 11:11:33',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-27 18:30:29',
                status: 'UNREGISTERED',
                channelId: 'b1050b31-ad63-421c-ab5e-174a0084d9d9',
                channelSapId: '4viyo54y5snsyan5f0kvwsm1s6490buoeab592h18ws5zvila3',
                channelParty: 'bwtlqnd22qokr2axwbi2sueps2y8q7un79pcy3hfj6bqlrsd2wvbpprljckfvtcjtuw02b47tbiwjprq9fazsfk5n0n4v8j11qomap1rbkxa6d81a7rlud2mdpyi4ffbgf04vb0bm86owv6i6i6bwfx4lfs8lqhh',
                channelComponent: 'ckits9edqi77b7jsvkbmch24gno8pratnqdhx7lt7r40rd9io4iz1gir4qq4suicv9gy3xy69jawy9k0rwyfni6547uvolaue7uzzu3yae98s6f9iqlgfwdtzq84dil3ohn8jabb2l2v3d8b3g6vpgjsx6pdczog',
                channelName: 'a0fb7fotdeqphy013efe00twr59mohvgpterwv7lrngnom2bv692a3sc6mojopse5qmr3hkq26ulkkex41xjisbc0pb0axgaozqv28ti8669wsldxv6ve6mmod4qgn4y7lu3evltzk71766npk15xektlk3vsrd6',
                detail: 'Qui nulla eius. Saepe tempora et ratione voluptatem. Sint et at quibusdam. Molestiae ipsum placeat sed voluptatum accusantium. Placeat provident dolor est ipsa harum atque. Incidunt necessitatibus corporis mollitia vel est quis quo ad.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '436f18ff-0a01-4f81-84cc-50bc62254e61',
                tenantId: '3417d5ec-1f10-477a-87fb-f7d0fa0562a3',
                tenantCode: 'q6nqjc6ats4slfk3euud67t4h9iitr6s03vin35gs17ke83rvk',
                systemId: '74e7e1cf-88f4-425d-8795-33103ff20f73',
                systemName: 'btab1augx7v2bgxl4lxc',
                executionId: '5ecca706-d8e1-4495-b131-c36f7cc3cfab',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 01:47:42',
                
                executionMonitoringEndAt: '2020-07-27 15:07:34',
                status: 'INACTIVE',
                channelId: 'b1050b31-ad63-421c-ab5e-174a0084d9d9',
                channelSapId: 'e59pjf5in7s3rf55c0pwrfiqr7tcqe66xknucxp3zebmw40kaf',
                channelParty: '7ybk68zq5pbl9c90hxy055ttjb558m9j8cfknqjknw3kwix879et2aa5xlzduuy44j9dbqdvd3yq0kcht0lewrqjfgvfiqcjy35r8h36s7zokxeqlzm70tmjwbodhp05e0pd5bzpgaepctjw382gdsdorlgw4zwo',
                channelComponent: 'm7na0l6cqevf5nf7jwju6rv3tth44so7vfdkv735phbbv58aakj7ub7rgokv2pg8lo3lfwanyp3wcc4e67i603aguoyh9941my1gn3ta1c0hbk5j3kfof9b7z0a69vhdly2lk4g4fxiudkfftaon04t73pehgch9',
                channelName: 'oc3tfz9boo4qzt25ewpxw0dejh9ziexqshyrbl7gr3hvvlylqymdicy51a93jcn41uwmwd9vb2dlwoekp25opo8a09neizptboqnwrro417q8zjjj66rveuknkyieex6tpl9xmni1av442fvfgowv0vr5ur0w3ht',
                detail: 'Et quae fugit ea modi doloremque corporis minima minus possimus. Reiciendis est voluptatibus iste dolorem vel saepe ab fugit molestiae. Beatae similique eum et minima earum cupiditate ut tempora.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '436f18ff-0a01-4f81-84cc-50bc62254e61',
                tenantId: '3417d5ec-1f10-477a-87fb-f7d0fa0562a3',
                tenantCode: 'c4jbfc24o989yz0awoi612wifnby774dzam4or2ugba59ar0k3',
                systemId: '74e7e1cf-88f4-425d-8795-33103ff20f73',
                systemName: 'hksfx0i41i9rpzgl56r7',
                executionId: '5ecca706-d8e1-4495-b131-c36f7cc3cfab',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 14:21:57',
                executionMonitoringStartAt: '2020-07-27 17:05:00',
                executionMonitoringEndAt: null,
                status: 'INACTIVE',
                channelId: 'b1050b31-ad63-421c-ab5e-174a0084d9d9',
                channelSapId: 'donjt9v2vx4es4evorenqv6txowhdrles2fvjo1505r4918s8m',
                channelParty: 'hfmwa038nhaocztjge3cji26z3ll2z70gwdjc9zhierbd3wxg17h68tqgd0zjd6gtfude1wwg4w22dgizl4o6i99lpv2kipyemqth0pzlzvcq5pyez4f59qc3s3kxpubl5aiotypw1h9i9whn7u70wq5klcappoy',
                channelComponent: 'wwigvvsy9h7dwn94s9lr9gvr9s3g97qhzbtlz9pm6g3f4k2gryzl32uz9pyqn9x3126kbfwu8yb1z27mg2ltkfu2gua0iicxho2rv2pswgip9ngdl5vubrstiind8qdkgpk5q7vtvbd569mq25dbkematdo7xt3i',
                channelName: 'puk6g2hjkifsc1r17tpe22v8whx0w321bz9dn6jmc63weocfl3r3l6jvdqjx45wmvl5crcggb6krk2lmuqp4s2y150poxs5m2bvw8vlutt2tfe39x53z1rj5zr6ijkybf7k7bm99qyqk77zjot5yryw30bp5ed1s',
                detail: 'Est rerum vero atque accusamus occaecati omnis saepe pariatur. Non mollitia velit totam dolorum aut consequatur. Aut enim temporibus est corrupti culpa ut quaerat. Delectus eius voluptatibus minima nulla et vel praesentium. Quam et repellat deleniti et et impedit est deleniti. Officia quod consectetur non sit reprehenderit temporibus natus et.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '436f18ff-0a01-4f81-84cc-50bc62254e61',
                tenantId: '3417d5ec-1f10-477a-87fb-f7d0fa0562a3',
                tenantCode: 'qba4v4t4iq3r1ysjp8ttwmvgyz7e5a4dgp1kp225h7rhg6r1k2',
                systemId: '74e7e1cf-88f4-425d-8795-33103ff20f73',
                systemName: 'qyouvx5hedb8w77emn0i',
                executionId: '5ecca706-d8e1-4495-b131-c36f7cc3cfab',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 19:44:53',
                executionMonitoringStartAt: '2020-07-27 20:57:56',
                
                status: 'ERROR',
                channelId: 'b1050b31-ad63-421c-ab5e-174a0084d9d9',
                channelSapId: 'a9cjxbzitxp3n8mmupludhp6x1f34c5k1iidqfq05iie38kwkf',
                channelParty: 'at0ibm32b9q8e0divqsjmo3mh5edeb3osr72zf79rx7md9j2rcs3aytys4wvhrr5kjwy9a5110rfxnvb9jc0zq5sri07i1wuxtvrdmj2pw3y5nvridmrpuvchad9qa6ob0ms9l11hktwbsuyi4c238sypkev9dxa',
                channelComponent: 'wxyblx8n1qylfw44ya1163jith8khdmtit98up1j19m3m8djn67vijtbo5olwjqfo5lgf770zmwde5n7nvkfbzr6zhc9nwxrcwyttmvqpv2sr7ypmon9ueel7j35hisflya5un5mi7y5j9l9iyomkt6xhldn79bz',
                channelName: '03t7akhsr1w8keky79g9bu3orjk1eilociz01zibz3cvc96lquy620kpne5ag8ke2i83zf1az8h2fbe69tsn8dkste7jirzwnrr6sltf92dc20b9sc4fm28albx1ujqzm51t7xf3z3raep3a3tawc0dkhmvjojcm',
                detail: 'Reiciendis tempore nobis velit exercitationem. Natus est quaerat sed voluptatum possimus nisi enim. Dolore quidem fuga nulla nisi reprehenderit aliquam quo atque et. Ullam distinctio maxime assumenda dolorem facilis quam. Error itaque iusto voluptatem et.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailStatus property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '436f18ff-0a01-4f81-84cc-50bc62254e61',
                tenantId: '3417d5ec-1f10-477a-87fb-f7d0fa0562a3',
                tenantCode: 'dk2n2gicdmuvi5uajiu50zsz8j9ytbdj3hce4ka3frady3rhmk',
                systemId: '74e7e1cf-88f4-425d-8795-33103ff20f73',
                systemName: '59tlyhc0qc0cqub1cgd4',
                executionId: '5ecca706-d8e1-4495-b131-c36f7cc3cfab',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 12:39:57',
                executionMonitoringStartAt: '2020-07-27 23:57:05',
                executionMonitoringEndAt: '2020-07-27 23:48:11',
                status: null,
                channelId: 'b1050b31-ad63-421c-ab5e-174a0084d9d9',
                channelSapId: 'jw2giaczirh177zrbt8aumn9vip1gee0ivjl5xqafidcv93nx0',
                channelParty: 'al2zgsmygoubqvhbpkbvu8x9ir39eabm2glyyt7b0l1kli46t1q8oq7o3o5swnslau45nbtnudn2xxbypyffr0xnd40kw0sqq0lzclqoqkhj30f3z69jqomzt3xnmr14an49gfmbt5vj9g4aiv5ive2xhgk5j7j2',
                channelComponent: 'iza9e4tawb8b2sqd32mm4kac7xxg54m7hdqfan15wklqsow0r1cwae4lan9avazbmae48wfkh4rynngy2dvkgzwsvgz05md3tgoet7bsg42wuwjs0zb6nqezrbbbp8np7v7ll4r3mzloeun527ax562o9nhv30i7',
                channelName: 'x8c2150ykpwk4pif0m3gay903w0pibziamcz2dh9u4b6djxkoqdxk4ike6dfhrlhb6f7axtvcn4yxa8kpbiood9dj17cw7c4xgtagnygob6ah4vckv64cx521gl1ldz5ds1v633w2z48219aod6bf8oa8llrd3hm',
                detail: 'Modi eius in quia et omnis voluptatem. Officia delectus deserunt id quis eum alias nihil rem vero. Sunt ipsa ab voluptas expedita cupiditate exercitationem. Sed tenetur omnis suscipit eos dicta delectus. Rerum aspernatur quos dolor unde vel repellendus molestiae impedit iste. Qui animi eos et saepe vel sunt.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailStatus must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailStatus property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '436f18ff-0a01-4f81-84cc-50bc62254e61',
                tenantId: '3417d5ec-1f10-477a-87fb-f7d0fa0562a3',
                tenantCode: '5cgh5ss4hx4kyj3o0imgosqsmcwwie8fjjlow7ji2yhmcwgfox',
                systemId: '74e7e1cf-88f4-425d-8795-33103ff20f73',
                systemName: 'w4kj8rwqqgagdqezikp5',
                executionId: '5ecca706-d8e1-4495-b131-c36f7cc3cfab',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 08:17:03',
                executionMonitoringStartAt: '2020-07-27 19:46:04',
                executionMonitoringEndAt: '2020-07-27 19:47:44',
                
                channelId: 'b1050b31-ad63-421c-ab5e-174a0084d9d9',
                channelSapId: 'uqbuvmz3xe64rq2ajyj9okdvzjdnozkexn1oa4wa07mqogc8ft',
                channelParty: 'gm5cn0y8zq1yzeigqoop10kmdvuvbp1p3unq79x4gm1akd273vjiigiqumrubh712gas5pvawxlsgjagdi452ygkab6zbgntkoh1tj2rt71tbi2o79mwjba0dlynvw63oyujezso8aiscyikvovs91q5tdpomcdv',
                channelComponent: 'mttq6nljph4l4d83mqrutkwpep3l2boetj93587nn7cny7bj7pabvaj28p9i7o0q0vvg2nye3q7iqt5hwshumij8z25j5ks12bnia2w9drorpmchg3nf861gswv3cbqi2c6a2oy6l8yv7limg0tqunzwwrs6rgb3',
                channelName: 'db1ixff2ovsekctlr6noa29rjvutzek3kj9cxst3zrr0q91sk25rozyf1rlfiyfw58l5plpvh1jwyx6sszmb2db72iqnekbm5v2mi7eym89wfyrgyn8ekzi785iomwzzerh1tfbfxwlxj6tnp0pvvg12s53ykxfv',
                detail: 'Possimus sapiente voluptatem suscipit consequatur eos tenetur cumque praesentium quod. Adipisci corporis excepturi quos sed ipsam. Cum recusandae nobis voluptatum. Voluptatum et animi quae a deleniti sit veniam fugit eos. Cumque qui voluptas accusantium fugiat voluptas minus vitae aut.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailStatus must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelSapId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '436f18ff-0a01-4f81-84cc-50bc62254e61',
                tenantId: '3417d5ec-1f10-477a-87fb-f7d0fa0562a3',
                tenantCode: '4an7tn5ouop7byi61l7rylavwza4m5rqrg6essh4xhr3jo7j4l',
                systemId: '74e7e1cf-88f4-425d-8795-33103ff20f73',
                systemName: '8q27ltjlhremr9kztbg9',
                executionId: '5ecca706-d8e1-4495-b131-c36f7cc3cfab',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 07:03:50',
                executionMonitoringStartAt: '2020-07-27 22:00:36',
                executionMonitoringEndAt: '2020-07-27 07:50:31',
                status: 'INACTIVE',
                channelId: 'b1050b31-ad63-421c-ab5e-174a0084d9d9',
                channelSapId: null,
                channelParty: 'dd6akfixa9t5ccxqvcb7odvx0ky59vi0z7ce6tt94c2nx9cqlfpps0l0zz58e8ewh42trhtuqtd5g9s29asxsd27duo7s183t57eabq4airfnr1f7lj6ocb61bi25an3b9b602r730i5dbb9ck774qkmdv8u0l2t',
                channelComponent: 'i5dqv2zutk7qq5mbhy9p2hxtofsfsttw7tvpo94vwf93v0cehi86hsp2allgs6joi0pz0wt3bgwvwbo0gvwlc3xn8pmz9sc8yegk2rqc5kr0zzikpnsb2bnfumxnocf6dev1mt4m49k1e24li6n86b2d1gv2nl3s',
                channelName: '3j94sr7medjbf6bwzfmblj2m77n8q301bvoihtfktjsb653fu3mk6fjygzpyjqfvckzqdsf10bp5ycegy8yqcc5crgc76n6xwbaen9qesfkjd62qom6dphoexmyc6gx8h6d5jwf22xgbct7zmihkj80wkn1efm5c',
                detail: 'Est sapiente aliquam repellat consectetur dolor ducimus. Eum quas molestiae modi quaerat nobis molestiae quos. Repellat vero est deleniti quia aut facilis molestiae. Alias fugit consectetur.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelSapId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelSapId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '436f18ff-0a01-4f81-84cc-50bc62254e61',
                tenantId: '3417d5ec-1f10-477a-87fb-f7d0fa0562a3',
                tenantCode: 'w5lodml5okzpy9lhs40iywebkpsskl9obw4balhcvujwwkj5sw',
                systemId: '74e7e1cf-88f4-425d-8795-33103ff20f73',
                systemName: '9e50pms63vrcpy9gcb4m',
                executionId: '5ecca706-d8e1-4495-b131-c36f7cc3cfab',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 08:09:20',
                executionMonitoringStartAt: '2020-07-27 10:32:44',
                executionMonitoringEndAt: '2020-07-27 12:27:08',
                status: 'ERROR',
                channelId: 'b1050b31-ad63-421c-ab5e-174a0084d9d9',
                
                channelParty: 'muxn4dwr5c0zskncekipkmbp03vydnqoocd273o2bvwvo9pre08kksttjiy6jj0abgqnskbz6yz1gv4urcfk9i0bgnvdd6jc8fnhwqrbpxmdmgpy6pdsghho3mcuzw71zen1tj6q8m5thasd2vhalt7su38cql7f',
                channelComponent: 'zpodd66kae0blxcdz1go1ihn4mufs0nnaab775jv21ip51rnjxzecad3cg0yduxz503hjm96sld66v5dtc2tj6r4ra1x02d1l24bn0p840yndj9pr1kjvurigk4ejawznx7v0rbyg05ireikpdkq0ht2a8xa3v62',
                channelName: 'xyx3m66i2i236u4n80pvdwy0sfd6ph8rytis8joaq4lg8xw71636qv0w7yhnd8cg2qqy05aveo7hdzmd2hqr9masbivr9c9b3qhktujb7cp100qjyfofqvwjmhvrxpxapxckw6u5zyun1mjb5fwrlbvcg5hqp0cp',
                detail: 'Praesentium aut eos praesentium ducimus et. Sunt voluptatem sit. Et accusamus esse sunt quo.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelSapId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '436f18ff-0a01-4f81-84cc-50bc62254e61',
                tenantId: '3417d5ec-1f10-477a-87fb-f7d0fa0562a3',
                tenantCode: 'gjg8eljmzbqka3riemgvmzvi2xu8xpcsy9gd2rqd9d8p8c7ahl',
                systemId: '74e7e1cf-88f4-425d-8795-33103ff20f73',
                systemName: 'sot2imijir3k2an2uqd4',
                executionId: '5ecca706-d8e1-4495-b131-c36f7cc3cfab',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 11:14:15',
                executionMonitoringStartAt: '2020-07-27 15:08:25',
                executionMonitoringEndAt: '2020-07-27 03:12:36',
                status: 'UNKNOWN',
                channelId: 'b1050b31-ad63-421c-ab5e-174a0084d9d9',
                channelSapId: 'asstyv1pzjucdb2dbrkweja6fx0q7r9zew7tphzw967zk16moh',
                channelParty: '1y7bapq8yerabb14rvkg981n2x6g140k6fj1sy0oaf9758294a7i9vziz036hpiuw0oawg0gca1ca2apip3g8hsr048u49wjb4hya83mjjn700da7q7s21jxwehfn4gdqmmfkrjywf07clr4wm0xqaok2q9he8f4',
                channelComponent: null,
                channelName: 'uijvnuaj22570ml1hy5udxqjd5f5a1nl4rufd551ecffxbduq0ixiv5krsltyf8ddgd0eymuu2y5jo4zquth68gyjgnqwnnjbqp8uys7bj3ht38kjl8vpfpews6cbsoo3411hexfyvpv6o7gj5wy26f2xdhjdee6',
                detail: 'Consequuntur officia in non dolorem. Quasi et vel quia aut cumque alias non sequi est. Id numquam voluptatum nihil in. Autem earum exercitationem et commodi praesentium sit sint velit odit.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '436f18ff-0a01-4f81-84cc-50bc62254e61',
                tenantId: '3417d5ec-1f10-477a-87fb-f7d0fa0562a3',
                tenantCode: 'bz1li6rz75mftxkfgfqtv4xwla2sjwbo14zdesa58wfks9otzy',
                systemId: '74e7e1cf-88f4-425d-8795-33103ff20f73',
                systemName: '9nxjxm9m5mes4njv9izr',
                executionId: '5ecca706-d8e1-4495-b131-c36f7cc3cfab',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 18:52:22',
                executionMonitoringStartAt: '2020-07-27 08:45:26',
                executionMonitoringEndAt: '2020-07-27 09:51:35',
                status: 'UNKNOWN',
                channelId: 'b1050b31-ad63-421c-ab5e-174a0084d9d9',
                channelSapId: '3hwzn345re1xiw1e3uyql2xm6u2hlenfs7vdarllm3w1dh1l9x',
                channelParty: '5oscjq90g0g92rpdjm57c6uin2xoyx7d6b13xs8pdok47002ktu72bbxb2rplhsb7t9sgnvwuaql5lswpgx8rrigt5v81q0y1kmlyjelt3cp6rbk4ok6024n8s7nprzbfuaaylufb37qdh4v5supayi32bj5pope',
                
                channelName: 'aj7gvn61dyzen5nj4rjog65h6rz2739f9nmls4jl72ikbmawvqrpsav7pqbkuquy6u7mzoc05o10cuct6ee9b3rcgqazdrgepol8qmim245cn3hot3ldi49p0ybyt5iw5dbconzpp7pprtqwy7xgy59540g69sav',
                detail: 'Quia autem facilis iusto quae sunt qui quod excepturi. Minima dolor eaque aspernatur quia. Mollitia laborum sint cumque cupiditate odio eius debitis provident tenetur.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '436f18ff-0a01-4f81-84cc-50bc62254e61',
                tenantId: '3417d5ec-1f10-477a-87fb-f7d0fa0562a3',
                tenantCode: '29kptml8i80j5jfvlzr98fn5097hj8bsziw4y3jnx5zketcdt9',
                systemId: '74e7e1cf-88f4-425d-8795-33103ff20f73',
                systemName: 'm6kbay9oypyijfv3opgv',
                executionId: '5ecca706-d8e1-4495-b131-c36f7cc3cfab',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 09:48:59',
                executionMonitoringStartAt: '2020-07-27 10:17:36',
                executionMonitoringEndAt: '2020-07-27 12:28:19',
                status: 'INACTIVE',
                channelId: 'b1050b31-ad63-421c-ab5e-174a0084d9d9',
                channelSapId: 's70tqvtooezngyn0a5hlv0v9qkkrejc05qoec9d8ot29yxw5el',
                channelParty: 'ucla1a50nu4kk5xhy19yfqogq08xg7vptup76m1gjn235qb9v543f7m6b6e3xj3agjb2epwn0fda4kulx9w1f2wd8m9dosvrbrxr4r62qs7mqx2eioaw4303wu6s88sol0w8cy9rcxdfhas6ob8vzvbt7o3xi6ch',
                channelComponent: 'o6xgzg7l3600mszmveilmh3kmmg0yjd25uwvzfmnmh2e3dx35ogilktf0ofq3pc2dgf1mt4617krlnv8f4ejydvwy4bpfudhqwd0ugjwhhyckv94ovw0z0noiy4nhk4w30weqzxw2xofsbokabtsmhk6c7dmixs4',
                channelName: null,
                detail: 'Saepe in libero. Nostrum quod at eos rem dolorum illum quae natus. Consequuntur accusantium eum. Modi quas similique minima fugit architecto aut.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '436f18ff-0a01-4f81-84cc-50bc62254e61',
                tenantId: '3417d5ec-1f10-477a-87fb-f7d0fa0562a3',
                tenantCode: 'e3olew2so1lsjjuhjv2534iwq2ev68lz1mswgqzzqcghrq6vum',
                systemId: '74e7e1cf-88f4-425d-8795-33103ff20f73',
                systemName: 'zx2z78j2y1trseghpgj0',
                executionId: '5ecca706-d8e1-4495-b131-c36f7cc3cfab',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 04:41:11',
                executionMonitoringStartAt: '2020-07-27 01:03:42',
                executionMonitoringEndAt: '2020-07-27 06:08:51',
                status: 'UNKNOWN',
                channelId: 'b1050b31-ad63-421c-ab5e-174a0084d9d9',
                channelSapId: '73omg45mikvj8qtwswybhq0kkyvnbla5bj4nittjzcnb8szw0q',
                channelParty: '93507ijrf749l0wlmb4atydoxrlqxxekzzbe9qnhmz3xyxzmyn712ls6piu6qmpke3iiws24eqhj2sce42rzu0j5fdkq0qx9q0b1b3gzfz9ugr95z9t46azupjuyw8yqsb289mtalq4w8mesy2j95ygrha2umv3t',
                channelComponent: '5ax44cavd950f1mxc5rtyvqreww0a14r7dw3c8icxjaw5kq67u437abrrc10j497i90r4hptclfjbr2m9h7lzf459d0h842wtj0idkembmw6gxy9f5wqh8n5j2c92c4izu37sa87i0dxurn54w15s3d9swf9hfm7',
                
                detail: 'Eaque ipsa quod quos. Corporis at est necessitatibus aliquid soluta. Cupiditate atque eius.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelName must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a84nophgitl806ir3a13xrd2h0879wcq4a72k',
                tenantId: '3417d5ec-1f10-477a-87fb-f7d0fa0562a3',
                tenantCode: '4owy3qxa5i70aqncbyq6yk1pgwqnrlh33av1ylm97e8ts4auvw',
                systemId: '74e7e1cf-88f4-425d-8795-33103ff20f73',
                systemName: 'gdc27x75n86kasnnykkd',
                executionId: '5ecca706-d8e1-4495-b131-c36f7cc3cfab',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 07:03:08',
                executionMonitoringStartAt: '2020-07-28 00:26:22',
                executionMonitoringEndAt: '2020-07-27 15:08:42',
                status: 'STOPPED',
                channelId: 'b1050b31-ad63-421c-ab5e-174a0084d9d9',
                channelSapId: 'hlgt7ytyzmwcvojr72p2ascha7xdh9em8di0dp2bpum2k1mepu',
                channelParty: 'lcu2ntyf4bk25gygnnziedi28hl503itajpgpdbi0d181jg6c1gb1dkpuynzjuiw06940h34orzvvjvsh1v0r3lrnlx5u3oqvpfhvr0iybpydfrnzkbgmtvkcjgyecsaffglkyi8r96n3sy734fu21640qwujsmi',
                channelComponent: 'y1abeseg5oaecpj57jwp4tkuf3aiv8heimb5psd1x9k75st4tziya9kzz4wga960wjc6f07dd7wonofyouxbnt6k8od0rowotg9ed2newlwyx34iqbysa9fd2bq6a2hzbiuqprqhphjmv4kn3mwe5g1mkkua3eyk',
                channelName: 'iak3xyzzlizl7v71vtubxwo765569zaro6edak0ussbmc7t2rhv18t4vf5vx3427kf8l835vzcvv6yvoaoaoz2nf9n72fh28p3ulqs07c4k7dubt67oybg4f3zjnj6m5it72h15doik0fhuvxrq7eiq74hn4mlvk',
                detail: 'Voluptatem rem rerum debitis debitis sed. Magni dolores rerum ea facere eos molestiae error harum illum. Et atque qui sit eveniet officia deleniti quo. Autem consectetur voluptatem consectetur minima rerum.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '436f18ff-0a01-4f81-84cc-50bc62254e61',
                tenantId: '8mnwnnotag1quk4gxog1gf3pv1r8iozve3j4s',
                tenantCode: 'qt36z6umbolrw3joqpjgrqhrb5dqrgzgpt825dmgo8gwn3t38b',
                systemId: '74e7e1cf-88f4-425d-8795-33103ff20f73',
                systemName: 'xno9dl4f9vevo7k8s33l',
                executionId: '5ecca706-d8e1-4495-b131-c36f7cc3cfab',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 19:54:42',
                executionMonitoringStartAt: '2020-07-27 12:20:53',
                executionMonitoringEndAt: '2020-07-28 00:49:52',
                status: 'UNREGISTERED',
                channelId: 'b1050b31-ad63-421c-ab5e-174a0084d9d9',
                channelSapId: 'ci88h2km2g5acw6isxkm3drioaid60n56cdlpdsv8bn1ck6xls',
                channelParty: 'wo11186vlykf3dsiz0gejedx4ohme07muevjb6eyd9j8fnyk0zv5k0hm31fsw817rfaarjmodhsec9ioo2u6irs0ganidspp7vspxk5v35lu2ue47i4czg9wzqr2q4j61pu4g2apspj3o7y9stufg8j9cdz9ayn0',
                channelComponent: 'appktzcko5r1byyx9dcqvcf6vdntldpmfwil0oudona9dtukmd0cqut070gtl6fv1y3ohgkuzpvenj6mextd36xef1hftabxam6sm1urkrbi7jzkwjvlqnj74druwnfc3x4ur662njndgsjs8lt143t2ymr7xzdj',
                channelName: 'pqupw01yinaijl4ap11i9iglednv23hv8rzhf59hszdl46uhctfd4dsocjv4olkgm559jlt3fugqtodhbz4cblc0b6k9xlb2wo3kt6ppd2pnzncyjdkpgxnglc47mdmgthlnhop3dlehqqbyvvkrfp3n7y2pcsw5',
                detail: 'Quidem quaerat magnam molestiae. Explicabo corrupti omnis iste dolores. Est consequatur et ut a ut dolore.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '436f18ff-0a01-4f81-84cc-50bc62254e61',
                tenantId: '3417d5ec-1f10-477a-87fb-f7d0fa0562a3',
                tenantCode: 'emnxpz1cw1zeiialrnbqkofpkr95vhz320mr8qg60dkqr0mnqc',
                systemId: 'gb7zv2wqqp7oqigvhxqd9l8x0s2w6dildxrdh',
                systemName: 'p3btl47cblfid1sz96kx',
                executionId: '5ecca706-d8e1-4495-b131-c36f7cc3cfab',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 17:33:51',
                executionMonitoringStartAt: '2020-07-27 08:50:36',
                executionMonitoringEndAt: '2020-07-27 04:16:02',
                status: 'ERROR',
                channelId: 'b1050b31-ad63-421c-ab5e-174a0084d9d9',
                channelSapId: '76r7f6yfm8240ekm1ypoqvxv5x73h67imxb880glln6gb5sat1',
                channelParty: 'tdwgjo9b2eq6z79z5pm57n2vy0cffukurjc86pm04sgwbg8btenhwfr9rewjzdqspjqhxbvpa0g80p0ej3se2hsci0q9tq4qfndi4bhbsbh1hayh1d6wcv60dfxme8zvghhji8rzxpx3oh4dm34rm506qkz4qfvn',
                channelComponent: 'rclpuh9vanvr7sr8j8g0iy4nws3rd0dbijqy6mxs3fjyt83uluzn2sbur1hua74ezxpqyd1ywk7108gpqndmps081dshhzy64s0a3uqr22rtoe07t8rjt5q6g33nwwfkou5oool76zlcvp0b6tc6kh5uzdm66tyz',
                channelName: 'zeev9txxchlf94exv7pbkuj08n1dl0012axp9yqs1ygs2ymb5npdsmi544srri86b3ysirfjlwqb7fuxqdpcdt8oa9ixtnd8xnf48hg5g08c8tv2gnjnaxy6vlb6g1q6cwhdgmt1t2azvi4y9xxkuhw7441ommv1',
                detail: 'Rerum consequatur assumenda reprehenderit non esse harum suscipit. Sit esse sint quos quo. Fuga culpa recusandae explicabo praesentium eos. Quisquam explicabo assumenda autem. In iusto adipisci eaque et totam.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '436f18ff-0a01-4f81-84cc-50bc62254e61',
                tenantId: '3417d5ec-1f10-477a-87fb-f7d0fa0562a3',
                tenantCode: '43aybdh2q7nh90kg21hlwvnw773012lo43bpx5wx9gbr8rd1cx',
                systemId: '74e7e1cf-88f4-425d-8795-33103ff20f73',
                systemName: 'qpnqgvkp6zy4vax30cn6',
                executionId: 'hkl9p61eoewpf3flnkr8ipmaphacx79w58ra9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 08:10:06',
                executionMonitoringStartAt: '2020-07-27 06:57:43',
                executionMonitoringEndAt: '2020-07-27 05:28:53',
                status: 'INACTIVE',
                channelId: 'b1050b31-ad63-421c-ab5e-174a0084d9d9',
                channelSapId: 'c3zh9sx5ejhi8ai8avtlhs34np6kppayqv5im5cnn0n9hjj7jh',
                channelParty: '9sk1sfw7t9e07ujbhpsiyn73i131cl923jp7e7d48w2b4hi35kf30vdo5tskmv4wvk0hhrxx6vme5hcgbb172ro83lm8zd3ch4wscpc86skkwgleesv5uhxzgm8bpqi649mjw7if7skrx3rirpbthr7n0q0aysbb',
                channelComponent: 'rx6ud0eyizo5a0gfmq66zeicdrrd89nmnbx1mq6mdajd2e2a00xukkve424effuf3bm75o7g7sopgid6f5hs5nln7ixey320f6w4j0q4vxqqs2adqpjwgixmvpaw523xo17hhjpyhp5nvbw4r9an8yf81alj47s8',
                channelName: '2tcoh35tc6ja1oe9f4y393i6cuul9iy0hpg0su2nigo1e3oeuj0rmjoc72k8z6kjs7vx2t3k0ckv8jh9j0z49ry7ednydj9990n0l21s1jd0s58nn5w88cskzpmlbiwvqlt3z35g3x1b4tblyb8pjjkuunkn3ebj',
                detail: 'Id pariatur et et totam consectetur et. Dignissimos nihil quaerat eum quod ut et possimus culpa. Ullam rerum fugiat sit dolorem et ullam. Inventore ut officia eligendi.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '436f18ff-0a01-4f81-84cc-50bc62254e61',
                tenantId: '3417d5ec-1f10-477a-87fb-f7d0fa0562a3',
                tenantCode: 'goion168yyrknpzjodmrwl6vj52wwpg6eao99gdoyked3h3m4v',
                systemId: '74e7e1cf-88f4-425d-8795-33103ff20f73',
                systemName: 'vlzn6rwuac2siduwc9ho',
                executionId: '5ecca706-d8e1-4495-b131-c36f7cc3cfab',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 06:46:38',
                executionMonitoringStartAt: '2020-07-27 19:48:27',
                executionMonitoringEndAt: '2020-07-27 12:44:50',
                status: 'INACTIVE',
                channelId: '7lxwqq9j5z6w0najazt6kvnwxvvd8ocf2xl7d',
                channelSapId: 'fxeimxptwmne1e34tw9jro7fwajf802xas03m3dff9div858w8',
                channelParty: 'cnh56xnhbpdrpahndw00xqvs9js1tycicxeacg2k5we7i937dekf3ozgf5nor9h0wrvj1238o5bqevb5w6ai3lmxy0xiktffdebget5twob3tge93w4s9fsy8e9jr2mq9zbtkmskv94u7qzmuoprx7zc2puds9pj',
                channelComponent: '3ekugk2mm0mwlc59fe8kbtdus7ctjf79e1w4n7f8yhefobp0apb02zcl62cstcz8kfblyrj8zekj8g4862scut7sqco5wf8ws6npoa5j7di1iszvfhec7ocopnm1cpjqgl8vrqnpxjzwungeb6edwjreqhecewax',
                channelName: '3ms6cjbog61xj0hxe31dpe7jhfpwzw03ielkeyxhu5ngtq71qxyfuo22oq16oc8jx6d51521f3z3o3wzpyvpjhlahe63x5wywlmoq5z0seinaqg1xe4ezr21uyyhfxh9mnq1a7yp97fhdzxbjfw20q23myc1r7p6',
                detail: 'Tempora ut veniam nam non porro temporibus. Soluta et quidem fugiat. Et sunt ut rerum facilis molestiae dolor. Non minima consequatur officiis incidunt et aut doloribus reprehenderit.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '436f18ff-0a01-4f81-84cc-50bc62254e61',
                tenantId: '3417d5ec-1f10-477a-87fb-f7d0fa0562a3',
                tenantCode: 'no82mri650hjseuazbg6culgke9q7nxajzd4au6cehw90x57n8f',
                systemId: '74e7e1cf-88f4-425d-8795-33103ff20f73',
                systemName: 'kahr3o2t7k7rkjotp2dx',
                executionId: '5ecca706-d8e1-4495-b131-c36f7cc3cfab',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 00:42:03',
                executionMonitoringStartAt: '2020-07-27 03:19:23',
                executionMonitoringEndAt: '2020-07-27 08:08:48',
                status: 'UNREGISTERED',
                channelId: 'b1050b31-ad63-421c-ab5e-174a0084d9d9',
                channelSapId: 'x4kqev0qsddcuo7rq7q0811ze8669l4uipjg4j3jm871767r8r',
                channelParty: 'q48w7cijbayetgj2qe00nuc6avopmvuf2dvbu7joj0wn93wmc2y4j1vp6lfgqddcih9gynqmhl5l7do6506cddgo083sgpckunvnh4nfmvnbvsdz8s86375i9q2rdpjs68p2vb6upli9o97zyabwai9hvhoo64vh',
                channelComponent: 'ee32md0ffigygrfri9hel78d7eox70sqv3g4ccceinwlowi5fzye98djoe8wqkhmgdbgn6yfzbuoj0jrk577xdyiw00djpi41qxgweudm2xux2f0gfa7lcz32t7z7u6uywkoba49ji4357enyf2f9sxfvulzbnyd',
                channelName: '1gvfxbhn9jjvqpfs72mh33rv7y4np6qlupwmx396q07sahry82kkqbz1fva2318jnhns41rtrjx6ra3ltev8rfz3n0jjizzxkwl2x1xuz427va62ztv818ggevq093elgrgfj6tydw4rrva3bmap759ekqwmfjme',
                detail: 'Sint molestias minima placeat beatae porro aspernatur libero rem. Magnam quaerat incidunt est quas. Vel deleniti tenetur. Ut unde occaecati maxime harum. Sunt explicabo illum.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '436f18ff-0a01-4f81-84cc-50bc62254e61',
                tenantId: '3417d5ec-1f10-477a-87fb-f7d0fa0562a3',
                tenantCode: 'vjdgrkekk06cylfy42sw5gyo2b7lzuh72svhjserth0alb8fs8',
                systemId: '74e7e1cf-88f4-425d-8795-33103ff20f73',
                systemName: 'lgkzptdaqos5j8qtsrpvd',
                executionId: '5ecca706-d8e1-4495-b131-c36f7cc3cfab',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 22:28:52',
                executionMonitoringStartAt: '2020-07-27 02:57:31',
                executionMonitoringEndAt: '2020-07-27 03:30:27',
                status: 'UNREGISTERED',
                channelId: 'b1050b31-ad63-421c-ab5e-174a0084d9d9',
                channelSapId: 'lcu9d6d54le7arvno9pbe7osreujqtx0q1t9n6yaw9ixhmpmgq',
                channelParty: 'd7u25h4eiilj8v1eh7iw8repibgagw2jcwoczc2nfj7c6lmqudy74h5a9cgsp447w0sma8sawa415gdjvvj9fmsqpelxkooiv9cgx9zlfcnlotg15ag8q1xbspheupxzkofu9w38g5h655blli73hdrmrj26tc07',
                channelComponent: '1ve5z93idcb2q7avcluve0s61mauhl0mgs7l7ikdc25h53nlcm5fv6nk8aibiwkov5qi9erm6gg4m6dtkodwyqhphxzz0ut0ylxiafwk96diqfm8m6aydqzsu1eneeaj95ge3ljgkor392uedn2w15x8dzznf6sv',
                channelName: 'saqzigy49w92sa8delky2pqmt5g6do3e3zlvetkm4twyh7y8wspylfbu7cvmp7y7mvznyms1bpity3lkr3drmeiqp7xivod5n9bcq1ekb3101alkap2g18kkva8br0plklyzt5p7k07asho4rn2h3pywd21iy1za',
                detail: 'Eos non quia aspernatur sapiente voluptas ducimus. Itaque soluta in omnis quas est delectus aut occaecati. Veniam itaque commodi. Quam dolorem sequi laboriosam. Magni aspernatur libero.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelSapId is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '436f18ff-0a01-4f81-84cc-50bc62254e61',
                tenantId: '3417d5ec-1f10-477a-87fb-f7d0fa0562a3',
                tenantCode: 'c561v59em1qwxnpwp8nvo5tpwqc0s51lqrzm1my0tfiay5dycl',
                systemId: '74e7e1cf-88f4-425d-8795-33103ff20f73',
                systemName: '7ghydcd6y1qo0kdhadza',
                executionId: '5ecca706-d8e1-4495-b131-c36f7cc3cfab',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 22:30:29',
                executionMonitoringStartAt: '2020-07-27 15:55:40',
                executionMonitoringEndAt: '2020-07-27 10:46:39',
                status: 'INACTIVE',
                channelId: 'b1050b31-ad63-421c-ab5e-174a0084d9d9',
                channelSapId: 'jbq7ohg0fi5mqmcxs2qmrys8kuxqt6g85so1ifl4fumbjro4sl3',
                channelParty: '55q2kqfihn671sbntn3nhe3e6yz1c8amz1kvme6xjdapya3bv2vtpfx74m5rl1i10ywg9fxk45y1r1gtwyrz85q9vqdhozi5jqm15ywxhfyrjz9lcdyde4a7vhokx35eo2yvkltznkalzyxzmsha93he9044lrm8',
                channelComponent: '5bwckgpad26fio197vup7ytqv0eftuyq9706fl2k8zs5cacm934jajtf7vltv3uii4ef1afijx01hnwfd11caw9ehvogogd3js3nho1ykigx6xzwjolbn50kagd96qt12loj4co1bf2274jrxz1n74whb5bkv6n7',
                channelName: 'qlxw741dlvepm647gfpufsiuacmbo8yxt0bwan4guzj2r4gd6yp1mgza71rxypat9egc6q2vymkm9gyf02mgpfcqpyywwy7r8sl3yfmq8do3cdxgbtobo4no0bqua82e20mpo0tuy6yn7dpqm6rxq6prt42yuyya',
                detail: 'Possimus minus nesciunt natus consequuntur. Aut sit quidem et perferendis quis voluptas tempora. Rem reiciendis quos aperiam dolor officiis repellendus dolorum in sunt.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelSapId is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '436f18ff-0a01-4f81-84cc-50bc62254e61',
                tenantId: '3417d5ec-1f10-477a-87fb-f7d0fa0562a3',
                tenantCode: 'g5tx9mucsf3xjms9gbmr42dzul8fra3eb8wdeg8ml1bwlnbn9v',
                systemId: '74e7e1cf-88f4-425d-8795-33103ff20f73',
                systemName: '0ys8z3y64k7yvdf099re',
                executionId: '5ecca706-d8e1-4495-b131-c36f7cc3cfab',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 08:45:16',
                executionMonitoringStartAt: '2020-07-27 09:56:42',
                executionMonitoringEndAt: '2020-07-27 19:25:00',
                status: 'INACTIVE',
                channelId: 'b1050b31-ad63-421c-ab5e-174a0084d9d9',
                channelSapId: '5rh79w8gxcwogff2atgzst1l2fclf1b3vs0cgxkjx2x8rqlop1',
                channelParty: '1noi0sf6he8kcr6kr36w3l44mtqrdbqzf5a7ofcusncmqnasli5s4tkz00948syd5dixnoxpb4srx0lr8a0ovqsnww2rmzk9zgnorp40nswj7efpv8eot1mif2p1ogoez55trlbp0xnu1qh7o2gzpntaaka52qrq8',
                channelComponent: 'cw168b1omyltbhdgv8finc4x46uc52dbreg8rjnty74rr2ls9f4u1k9xuqdq977g640clj8f5mzjnr62xz7ltxhgwnq5y7h6hum549ct6ln964t805sg0t95z2f76ya6eyqg3yr080e9rifwab8jui173l87e6t7',
                channelName: 'stdnqbmt11v9j11crv228ta09c0gi4e0rmmrgua8fr1tuk6hc7ldbp4ml9w13f003m2cj1ldh0nxazy8x8i290c11x9wq0wtdh5695aissg61o15a3zm2acdxwswhadw6dp8gato9jaha6jx814h7p7uu3s0pxuk',
                detail: 'Cumque ut fugit et nisi placeat voluptatem a aliquam. Ut eum doloribus consequatur facere ratione. Accusantium repudiandae dignissimos est molestiae quisquam aut. Voluptate ut quia. Qui omnis error unde at eaque eius. Dicta sunt laborum nostrum quia eligendi vel quaerat totam tempore.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '436f18ff-0a01-4f81-84cc-50bc62254e61',
                tenantId: '3417d5ec-1f10-477a-87fb-f7d0fa0562a3',
                tenantCode: 'nxcet0x2oae1ltiv083xf07q8bhkg07mc70dx1rw3m91pab5ua',
                systemId: '74e7e1cf-88f4-425d-8795-33103ff20f73',
                systemName: '21bg8ami54pmmp8b3rzj',
                executionId: '5ecca706-d8e1-4495-b131-c36f7cc3cfab',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 12:40:26',
                executionMonitoringStartAt: '2020-07-27 11:49:14',
                executionMonitoringEndAt: '2020-07-27 19:34:48',
                status: 'SUCCESSFUL',
                channelId: 'b1050b31-ad63-421c-ab5e-174a0084d9d9',
                channelSapId: '22uww0txt80mg2jzi17t0lr1rmtug3cimq1fb257ed58ihcogg',
                channelParty: 'wxvs0w2o3j5esvc6lhkwsswlfnufy4blica7bi9md5iilgfmjmrfsdfkjpz4n81z1l4qvabj0jkxjukww2y6fjx7emlanrd36uoffxzah9inb6bhljq822o2bba37jqq1budqlbwh6738wxqmjy5fxrnziepti8y',
                channelComponent: '6b3iygunsx8q58dltvh8ybbwogniea5kktcsgv80cpx7077i3k9iduz514hzbjukjj0tuhppmn5f897v65mb6r07ymfs347nzxkzak1729ips6ss1tl7pb9bb01q80ftk8yjouv5b1nt35enk25gnqbojfmcr0b32',
                channelName: '6tejrnn73jn72bnuu5prhd7arepph035rixlf9ee24kk4w2skj689ufijn3kerfil1dnk1lnnlt1g4y3zkc8w2wb2xtnbcicbrwxif2y27m4x1ljlvu1ohccyt8q11mwl5bhvmygcvbj6pp05iuqf03si3n3aoiq',
                detail: 'Eum dolorem corrupti qui maiores rerum similique iure in rerum. Non ipsam exercitationem deserunt voluptate quaerat. Dolores possimus sed atque et autem sed consectetur.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '436f18ff-0a01-4f81-84cc-50bc62254e61',
                tenantId: '3417d5ec-1f10-477a-87fb-f7d0fa0562a3',
                tenantCode: 'jsh63q8hldkl9aubnmqldwt6em60dqsrn1bg5hvszqbmwaxjed',
                systemId: '74e7e1cf-88f4-425d-8795-33103ff20f73',
                systemName: '9oobyy2qpvxtssoavboe',
                executionId: '5ecca706-d8e1-4495-b131-c36f7cc3cfab',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 10:02:02',
                executionMonitoringStartAt: '2020-07-27 22:08:52',
                executionMonitoringEndAt: '2020-07-27 14:59:08',
                status: 'UNREGISTERED',
                channelId: 'b1050b31-ad63-421c-ab5e-174a0084d9d9',
                channelSapId: 'nxy3n7d05b72kdlxck1l1ax7hezp5mkbodkf8g3y71pc4hvwxu',
                channelParty: '1c6sh7f7fu04ltvc0m4n59ezpmc7767r87670fquu4hg6h0gb0c6vv303x0tbsss4qpiikml4414b3oywetlmgnk5muv4oaa6nw0ndhqnd5qzoo96s5qkacedx8kq8diffiq30fm07v941ef8p2730jrghnpdr08',
                channelComponent: 'k9kledcib71i1u8lh19ifdmz9sbq0apssf29sv8gyx13m6ul237phs9r1utcrjh17rg6j5067xuris7ntn9pznh8thcyj922i7mawpsivw5w545i8iitf8h9e657fzk97ip21c2lgsxam7l1rzdvirefs8115zy1',
                channelName: 'iw9hcuxmk33db0kb6nu8v27np1ddkqwwpclqk0v24ysm63pyth5gtqo1s7do39h8od8qv8119h3zwfce129e6ckc4a2higp1axltcctwt04drnacxpl7v1pont03h2w5ioanqkz2g5p78lsayzd92mhiocjgza2p8',
                detail: 'Est quae rerum esse. Accusantium sapiente nemo. Sit ut error deserunt eligendi temporibus.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelName is too large, has a maximum length of 160');
            });
    });
    

    

    
    
    

    

    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '436f18ff-0a01-4f81-84cc-50bc62254e61',
                tenantId: '3417d5ec-1f10-477a-87fb-f7d0fa0562a3',
                tenantCode: '2t55qttsp7a8quy935dckxsb9bdo5hwznsgty9ig15f29h5x84',
                systemId: '74e7e1cf-88f4-425d-8795-33103ff20f73',
                systemName: 'a31zxs1ijol19tsk1uh6',
                executionId: '5ecca706-d8e1-4495-b131-c36f7cc3cfab',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-27 05:17:39',
                executionMonitoringStartAt: '2020-07-27 22:17:55',
                executionMonitoringEndAt: '2020-07-28 00:08:22',
                status: 'UNREGISTERED',
                channelId: 'b1050b31-ad63-421c-ab5e-174a0084d9d9',
                channelSapId: 'sksou5zm2cjfi24ms9ng1ottoogai58qryrd7p8n7cwgsy2i98',
                channelParty: 'eddnrl138vcxuoanyosi4a8fe548id4cpjk9etl8g6m9siqxc9s2lrk2f6wwqguv2yy9u02lakyyf6ejw34uqh27kmn4f5k5spwn14pr9t23n2jldb3f1jyrmezu15pkm6t6fpyi030ohdxx0w80unx5g8lzec2l',
                channelComponent: 'ee715bq92u3x53q8dajbfvwwle95hzldzppbkfnisoezilt4wjlvskchmej8919lds9zq8rg32ucl98wbykza1qf34c761gv7acnxgsvvfs4pwaj47p466z22h1vy2x2v45haopu2i9ojh4ehqp0zp38d04u5cy3',
                channelName: 'hukni0srt37m32lcr3z5hrwpvj62ws4eqd28oz9g6p0f28zfuwsjjyk1sklumvhlnfftzk2rv47ugas0ie327dwd2m7y4scc6jrlg3xzb3sdqq3qrblkzwms04s8trmnp0f93zhfyb53b3pkl53xjrdnak5oymt8',
                detail: 'Ipsa reprehenderit quia ullam possimus repellat qui impedit odit. Exercitationem occaecati sed quia error. Corrupti ducimus ullam harum saepe totam rerum tenetur quis. Officia labore consequatur nesciunt ut quidem illum quod nulla. Possimus delectus ut.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailStatus has to be a enum option of ERROR, INACTIVE, SUCCESSFUL, STOPPED, UNKNOWN, UNREGISTERED`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '436f18ff-0a01-4f81-84cc-50bc62254e61',
                tenantId: '3417d5ec-1f10-477a-87fb-f7d0fa0562a3',
                tenantCode: 'n43408pfasm52ii9mkueu42bd84y64oh8fwqlef2nt5fe58kmj',
                systemId: '74e7e1cf-88f4-425d-8795-33103ff20f73',
                systemName: 'alonwqvl9tgasq74e1js',
                executionId: '5ecca706-d8e1-4495-b131-c36f7cc3cfab',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 17:44:16',
                executionMonitoringStartAt: '2020-07-27 07:18:04',
                executionMonitoringEndAt: '2020-07-27 23:56:07',
                status: 'XXXX',
                channelId: 'b1050b31-ad63-421c-ab5e-174a0084d9d9',
                channelSapId: '7cf8676dtct6jt3y7t9ew3ouzbl3nmgwrnlbaojjf8ncobrju7',
                channelParty: 'ufsmcqietnroot5kplwfrftavf41lnho7ufktozpun6vp1ve4iqixgqkkm4i8cg2umr3j9ldusa10w6pft75gosijffkkatmmdjnsq5rhgpldyfge6x2hugmr4dxnd4sivvdjhjwn7znrqp4t76p4ahcxglxaedj',
                channelComponent: 'cvbcujcuxrk8ykmawlba3rr553jvv0ptl25dfg8i5i2nraur1c51bapxogasv8s74grrodi36wqnwgee7ccsmj11qd64oezm4na9a05ka2c3nwhvp3yvijeu0xtip7kx6vcyq4qvi132dkieb2xzsz5lsnxo2t0b',
                channelName: 'zzfbuj4iqcd3x5iak530sllhyn3qtxzsalnpdk7cazrrtg3uyif9q8s9gzczx3e0nb0mn9kj0fyd3jiokobfou4ehh6vkm3d4luthh6g9q1bvn1in7mcc2hw5yt8kk9rnan2nrdjiwdnv8didogu5n65hwrj8rzz',
                detail: 'Maxime numquam tempore nam sequi maiores architecto accusamus totam autem. Est sint nobis sunt voluptates non. Labore voluptatem voluptatum explicabo recusandae aliquid labore quo. Rerum numquam veniam nisi aliquam minus deserunt. Amet nihil praesentium incidunt pariatur quod numquam tempora similique nemo.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailStatus has to be any of this options: ERROR, INACTIVE, SUCCESSFUL, STOPPED, UNKNOWN, UNREGISTERED');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '436f18ff-0a01-4f81-84cc-50bc62254e61',
                tenantId: '3417d5ec-1f10-477a-87fb-f7d0fa0562a3',
                tenantCode: '1nspk7nqe4seikvfjwyrwucx6mwc47z0jqhxhcmhkn9hak97fs',
                systemId: '74e7e1cf-88f4-425d-8795-33103ff20f73',
                systemName: 'zbcw9p7mut68mzo5qbm3',
                executionId: '5ecca706-d8e1-4495-b131-c36f7cc3cfab',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-27 06:02:24',
                executionMonitoringEndAt: '2020-07-27 05:28:17',
                status: 'UNKNOWN',
                channelId: 'b1050b31-ad63-421c-ab5e-174a0084d9d9',
                channelSapId: 'sy5cj2i5wa38cte5f3mrach4y4w12u2ikss8nihav3dwlbj1o1',
                channelParty: '2d4legk4ykjz6b3vax2u2qq07shqrrl7697qukewo34lhr7pdre3bgcsidmlij7hxpj65t3bf0lypfy4qconicxdc4c4r8spz3piz709c09tewt4z4jnb38yf1j31ra6h57hli4oxxyvnwq5l8d8ytogh2m6k2xg',
                channelComponent: 'svs0hpf0h8w275yd0l7ni3ro4ei9786gn2gr6lpq6ed3undvvx1yi6xkf842g6qp4lcr74f88e2wwqt0ko6q6ocjbkg115l6lwrj9bkqxw5pa9ufz0mb40qa552q7i73un0fddddyc4mhy7lumu5f05awo5f0zot',
                channelName: '58cylsdoferdsofong0hyz9ogrpozswlcs5881pkoxn7b4sbhweyyw38z9qhpupcc6fvhlu8hougn09al2ucu6ae0afz3ujruprpb5cz8z8a9p5x0jamm03p4351c2ks274cyv3qoyx96c68osdj43hk9ti9vplj',
                detail: 'Aut perspiciatis dolores officia ea officiis. Adipisci ut accusamus. Voluptas architecto dolorem aut. Voluptate sit corrupti ea aspernatur non maxime labore architecto. Dolorem dignissimos non sint iure reprehenderit adipisci aut ipsa id.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '436f18ff-0a01-4f81-84cc-50bc62254e61',
                tenantId: '3417d5ec-1f10-477a-87fb-f7d0fa0562a3',
                tenantCode: 'dtmphm1a00bn8ra8af8lt8jco6cv28gyo9zbc17btat7iqfkfx',
                systemId: '74e7e1cf-88f4-425d-8795-33103ff20f73',
                systemName: 'debyairefep446z7ygz5',
                executionId: '5ecca706-d8e1-4495-b131-c36f7cc3cfab',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 07:17:13',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-27 15:56:17',
                status: 'SUCCESSFUL',
                channelId: 'b1050b31-ad63-421c-ab5e-174a0084d9d9',
                channelSapId: 'wax1glxq5t9c0u43ovrx21jq0vkkpidumugdrjq5qkmgglm7bo',
                channelParty: 'x720ydra5hh18kdm3hwja8v5gx5monzkidf93xm2il3cyqr5gcstp11toc7waetj4hlzn927pqx21nsqokkvdej1v8jgi3wu5ob39oeh6c7nol6g753r1q3mkzrugzfz970du87r3qntapsf1kyvfmyih2ayjs7f',
                channelComponent: 'lc59q15s7jgkg7xdb9w62e5sy8a6rcqi5fw966j7r3fj0z9gj2i64b5pu7dwmek2lkqi4m881kh8bwxi1wqw4g34l2dft3q8o3zhygfg23c4sji9w8fduxef8h15qr3oj67efrxo87dix85e3dzvn8u7yce563mm',
                channelName: 'f17s8sed6kar1cmfspvuxh28x6yz0oh2ifpi7u64kvu96eww2d8bginj0nuhoc0fwxbqtzlnevvgi1ceygd4m2pja2f7h1txji8n6tji8cjrfqhfdojp7sd3bhevq2q29uphqfyz4szuxiqobj6ju75uf9yvzaru',
                detail: 'Voluptatem placeat quisquam. Nam consequatur hic et reiciendis. Quisquam voluptatem exercitationem. Qui dignissimos voluptatem dolor. Est voluptatem culpa blanditiis deserunt aut minima. Et alias rerum aut et id eaque molestiae ratione.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '436f18ff-0a01-4f81-84cc-50bc62254e61',
                tenantId: '3417d5ec-1f10-477a-87fb-f7d0fa0562a3',
                tenantCode: 'kth3fn6o7dojkt4w3pmpsbmfvtc4javi7lsiaxd90wj5jowbyf',
                systemId: '74e7e1cf-88f4-425d-8795-33103ff20f73',
                systemName: '6ks73aya9qn2azyfyaic',
                executionId: '5ecca706-d8e1-4495-b131-c36f7cc3cfab',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 14:04:58',
                executionMonitoringStartAt: '2020-07-27 02:41:12',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'UNREGISTERED',
                channelId: 'b1050b31-ad63-421c-ab5e-174a0084d9d9',
                channelSapId: 'ro8odkt0gzlk9h4d3xco03389ptv4v1b97fq6u6glc7nn9qc8b',
                channelParty: 'o9v8bh7gomzciglzuucxqbh2de377iyv8269x672r1xpoj23zxuc6qu1da9q39h8tgeqq9xloz0d0oasijb8x12dlp9ymqeec6932p15uv5okrc92sx9p4l8xucpevj4151awah2lss4fxgg6mxzu5igsigtxna3',
                channelComponent: 'vw2d7icxkmp26hll23uzekn4kqfr98xmviahvckhj4tvdc7gvfk9qig84papdy5hiqjykbus7liy3q6ko297hyv3by4o2o9qdk4xrinrjwj7i4kda6zn0q68323ql1n643ba7zftriyku5hwrzbs7zgee1avvrzt',
                channelName: 'utd917570yreio0or93tdfs2ncctb8c6rc3iq5fbxqhl8ydl92c4nedghszjfmheu83t2pa47ns7kifnip6zq3ywhlt9ofuqjdu67jx4rr5jnahzpit85i8djamsdhmlsh69y6jda8rdieiifmkg1n2jnnm8mlzp',
                detail: 'Architecto qui culpa ut sit et non vel architecto. Quia enim dolor animi maiores voluptas accusantium labore. Architecto qui quia dolores accusantium dolorem. Totam harum perferendis magnam expedita qui.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/channel-detail`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '436f18ff-0a01-4f81-84cc-50bc62254e61',
                tenantId: '3417d5ec-1f10-477a-87fb-f7d0fa0562a3',
                tenantCode: 'hyjtxb5wzmq8n1vg0bq5ikp60w7q438vqihvbk9aqycih930nb',
                systemId: '74e7e1cf-88f4-425d-8795-33103ff20f73',
                systemName: 'cuxfv1dsdnukp0slkpke',
                executionId: '5ecca706-d8e1-4495-b131-c36f7cc3cfab',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 02:06:13',
                executionMonitoringStartAt: '2020-07-27 11:48:58',
                executionMonitoringEndAt: '2020-07-27 08:29:14',
                status: 'STOPPED',
                channelId: 'b1050b31-ad63-421c-ab5e-174a0084d9d9',
                channelSapId: '7vgf884waevjn9c38wijqh1eykqttlrlb1ia9zoz05twviex3k',
                channelParty: 'd2jqc0otg4rtd3jlqtilp7y3mq2er79w9mwsjdsa10feq9fpt47nvsc4eiti87nf7sz31rf4lxvewe527x88u0cqk7donxj26i1cgyef5z0pnwikd6335z5ikhwafdi1n9f5pwl14um7r1u51zlnmiy8a5djz9ij',
                channelComponent: '1ed38l5jfbs7qlxylpq4eegqvao57gm35awh9kosl9qhr94s1exyosdhflar3ejfdzfz0v69h4q8iqx5in6nwsphnzob1m8z26uqqn85dnhp6zvwz68jby8owpf5avwvqo7382k15ivqzj0g09oeqiq33b8iq9gt',
                channelName: 'q51w35wj4zxedqs4ddj1gidq11drpvmrxplbfc3mvvb3171020gfmrct9sfwvespxhoa6cfx4u4g3tk39awl1a6vdfml9m1tibmtkasdq6288q7b9ukk6dssvivtshhqet4yu0ld2bmbg6kotq5mi8kwepb2eyiw',
                detail: 'Molestias doloribus ut et qui earum unde quod et laudantium. Et in enim. Nobis perspiciatis iure quidem sint labore inventore.',
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/channels-detail/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channels-detail/paginate')
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

    test(`/REST:GET bplus-it-sappi/channel-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-detail')
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

    test(`/REST:GET bplus-it-sappi/channel-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '436f18ff-0a01-4f81-84cc-50bc62254e61'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '436f18ff-0a01-4f81-84cc-50bc62254e61'));
    });

    test(`/REST:GET bplus-it-sappi/channel-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-detail/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/channel-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-detail/436f18ff-0a01-4f81-84cc-50bc62254e61')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '436f18ff-0a01-4f81-84cc-50bc62254e61'));
    });

    test(`/REST:GET bplus-it-sappi/channels-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channels-detail')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/channel-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: 'ed65f7ea-41ca-4cc5-b948-7b18353ad744',
                tenantId: '928544e8-4922-4b97-b38f-f8ed988892b5',
                tenantCode: 'mnylr0d8j3u0uequhhoiivie9k1l55co0jxiy2zcxuilp6s4h4',
                systemId: '0bee5927-2bfa-42f1-9fc5-dbf47177693d',
                systemName: 'vj94ez4zdm5oyp8hj04b',
                executionId: '7dcff00d-5774-4224-a70c-51cda1017fc3',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 12:13:15',
                executionMonitoringStartAt: '2020-07-27 20:22:01',
                executionMonitoringEndAt: '2020-07-27 07:04:20',
                status: 'INACTIVE',
                channelId: 'c57544c7-ef0e-481a-b452-f1869d5a1195',
                channelSapId: 'sai7otj5vyygwfd9lnxkppoqugjgjuz7az3usfpt06hr70sxwi',
                channelParty: 'd9un2ih9l0m3v8u47b5sucvvid9l01tgcgj22y1jiatfe26b9bxtwmmso2b5kayw29k8ho4pmjzpepkn034s7bhn8wls7ld2df20lcg4kdpxniudqmt4tlt2kdmsw3xlni8toww343l5ypd65w6cub576diw2h7o',
                channelComponent: 'v8hqg9075mv2lz1o3kbbddzd5d8c4v6ola5b96nhcihcxki43zh6e7r3s45tmefo6xmfwtx8dn4yqc1xxgnajbqyvm59n9bg8jhjpkpd3btpy0r85h8no2m6tfpzh8gbjildnzeohd677a3zsbq9iz2pvtrbbnou',
                channelName: 'sf9igo3z3xl7xjoi7ikbq3qkhejvis8qhrlunukq2hm935isx5ee7dmjcvavkubk7kooi3gu6xyrbkwv3l6kmvuxt5bw21nfpba4nlm45zww1gvi3a1j2h8qwuhx3ecu26m149b7zwtc31as9rp0bgvssqlzh1ot',
                detail: 'Cum vel dicta rerum sed ratione voluptatem. Dolor eius qui. Repellat doloremque libero ea enim vero.',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '436f18ff-0a01-4f81-84cc-50bc62254e61',
                tenantId: '3417d5ec-1f10-477a-87fb-f7d0fa0562a3',
                tenantCode: 'gjdx6iaqf83dp124ppiz7vkojlaj7y7zb0j1hjs8rq34vhnyf8',
                systemId: '74e7e1cf-88f4-425d-8795-33103ff20f73',
                systemName: 'dkqvjcmvi149weqdjrk3',
                executionId: '5ecca706-d8e1-4495-b131-c36f7cc3cfab',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 12:49:50',
                executionMonitoringStartAt: '2020-07-27 10:47:50',
                executionMonitoringEndAt: '2020-07-27 19:18:06',
                status: 'ERROR',
                channelId: 'b1050b31-ad63-421c-ab5e-174a0084d9d9',
                channelSapId: '9nfc79oxlawozh5vp5qpwyfefbk39miu4z7ak87rtxzqu7px5f',
                channelParty: 'ahrqhwgzwr3c6n86ltupibra3g7uw954y1o8sjn7izui8e6oxtwteqg4x3nqyy8iwmfsm573zwxj8g7qw4ixhv8olajd5df1krnibfdcdx4krxubmk0wb69jarvvh1h9afo3cbncwxy9919fiqzpjt795qefla5g',
                channelComponent: 'lajwgy1ggty3e9pruozo8zjidzitl0xstyfpij0kq22mlvk6kulv3szycif5egb7rlv02g7ogw2rnsghfdgchkgrztip7xawfqmf7az76d0y7aqn2w00c25hd87rytq8lt0x7gxqhhea5wnjhqwzejxc5bqp01mn',
                channelName: 'idxgavtx2pm776xyxhot2fybj97n5slo6z609se0n61ylgwbbp31ju0yeyd9xw5q8exwahsy2j1tann82jr77x874w5ibv3cfks87b39okr04e2zycsx59v819owc7z5axbe6wozdy73huw9a04q34qb4phb2qix',
                detail: 'Cum tenetur dolorem tempore et minima. Aut eum eius reprehenderit delectus laborum vel eum qui. Dolorem eius aut beatae non.',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '436f18ff-0a01-4f81-84cc-50bc62254e61'));
    });

    test(`/REST:DELETE bplus-it-sappi/channel-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel-detail/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/channel-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel-detail/436f18ff-0a01-4f81-84cc-50bc62254e61')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateChannelDetail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateChannelDetailInput!)
                    {
                        bplusItSappiCreateChannelDetail (payload:$payload)
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
                            channelId
                            channelSapId
                            channelParty
                            channelComponent
                            channelName
                            detail
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

    test(`/GraphQL bplusItSappiCreateChannelDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateChannelDetailInput!)
                    {
                        bplusItSappiCreateChannelDetail (payload:$payload)
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
                            channelId
                            channelSapId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'd182b6c4-94c5-4ac2-9e9f-d0464e5f186c',
                        tenantId: '3417d5ec-1f10-477a-87fb-f7d0fa0562a3',
                        tenantCode: '4tmeslhmkupxxzfn8d3mj62ujipqxgmz0byen8lx5qj51s7q0w',
                        systemId: '74e7e1cf-88f4-425d-8795-33103ff20f73',
                        systemName: 'mq2nk99zbo9sa89hiwy4',
                        executionId: '5ecca706-d8e1-4495-b131-c36f7cc3cfab',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-27 13:34:43',
                        executionMonitoringStartAt: '2020-07-27 02:08:40',
                        executionMonitoringEndAt: '2020-07-27 22:54:13',
                        status: 'STOPPED',
                        channelId: 'b1050b31-ad63-421c-ab5e-174a0084d9d9',
                        channelSapId: '1krjnf1k6x283ym5k78jufhqoi1q81a9mgdmjooqnfas2gi4qd',
                        channelParty: '3p89ckpfyl96u47g0vkxppsfim22shf5e3bpupjdqwyuo2vxfeaqpo6706kf6bceljrq8rw33l8y2m58hqm8tpoii8qhkm7dimeujq5jgt79xgwe0m9lu27ptw3zaf3gimzq2iqx5lnanxm4yn6ql0gspo40ksvn',
                        channelComponent: 'n05a2zoaux1w3z0s8zddp6rls87sqsk9e5w76grqwphhy6beeo5vbnwif5p9ih7oz782yucv1lahtvg9w336ncknbnibviztvmetb18vy7wphap6xsrvvx3i4o5hokhc8isavebci8v4vfpek7pfym5009qi6cdm',
                        channelName: 'nezrjcy7os3lbibgpoge1owdvfx6acde14wsmxgksu21ud9pweql91td6h53wfyhpzq1q5q7t6pk5pnpe0xppdpyqfl7m8we6o14bvgvtemxlvoodjf5psv41h1zwgzyo8te6ca1qc0tnmu46dltj9fvx13bqvi1',
                        detail: 'Blanditiis beatae praesentium omnis soluta omnis. Sequi numquam laborum sequi quia dicta totam. Natus porro eaque laudantium qui ea explicabo at et. Sequi officiis nobis asperiores sapiente quam. Est tenetur nihil quam est.',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannelDetail).toHaveProperty('id', 'd182b6c4-94c5-4ac2-9e9f-d0464e5f186c');
            });
    });

    test(`/GraphQL bplusItSappiPaginateChannelsDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateChannelsDetail (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateChannelsDetail.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateChannelsDetail.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateChannelsDetail.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindChannelDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindChannelDetail (query:$query)
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
                            channelId
                            channelSapId
                            channelParty
                            channelComponent
                            channelName
                            detail
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

    test(`/GraphQL bplusItSappiFindChannelDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindChannelDetail (query:$query)
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
                            channelId
                            channelSapId
                            channelParty
                            channelComponent
                            channelName
                            detail
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
                            value   : '436f18ff-0a01-4f81-84cc-50bc62254e61'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelDetail.id).toStrictEqual('436f18ff-0a01-4f81-84cc-50bc62254e61');
            });
    });

    test(`/GraphQL bplusItSappiFindChannelDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindChannelDetailById (id:$id)
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
                            channelId
                            channelSapId
                            channelParty
                            channelComponent
                            channelName
                            detail
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

    test(`/GraphQL bplusItSappiFindChannelDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindChannelDetailById (id:$id)
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
                            channelId
                            channelSapId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '436f18ff-0a01-4f81-84cc-50bc62254e61'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelDetailById.id).toStrictEqual('436f18ff-0a01-4f81-84cc-50bc62254e61');
            });
    });

    test(`/GraphQL bplusItSappiGetChannelsDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetChannelsDetail (query:$query)
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
                            channelId
                            channelSapId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetChannelsDetail.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateChannelDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateChannelDetailInput!)
                    {
                        bplusItSappiUpdateChannelDetail (payload:$payload)
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
                            channelId
                            channelSapId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'e2d21525-634d-4e4e-8c73-d5a501eb1c01',
                        tenantId: 'dffa6461-8492-4b44-af87-6031bdb9004e',
                        tenantCode: '4vhtt48qssd26k1sg6joa5wesrot40rwoq0sd0ffgpcolxrwh9',
                        systemId: 'df33e02e-100c-4fba-af70-fc47b6aaadab',
                        systemName: 'n7y99pahyy7ucr3rvb6a',
                        executionId: '42e4e80d-e5bb-4e35-8e17-99898080ccdd',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-27 07:25:09',
                        executionMonitoringStartAt: '2020-07-27 06:40:32',
                        executionMonitoringEndAt: '2020-07-27 03:45:13',
                        status: 'INACTIVE',
                        channelId: 'e9966cb7-ea94-4702-9ce8-1fb98f2daccb',
                        channelSapId: '9ri6ihwnfzoksl9dj5bgd7r8c1qno3l121fnfieyvhgd84bh5x',
                        channelParty: '0r73ve87l8ebq46njt7ajm0evgjf008bpjv3p93oat8hj7lwq0kauao2bz4hmze1jjr5uj3unm5oskcp8j5wuq1sxc9wkbhcktexqk40o0j24qc3x2dnwlpx1olg39vr3b7me2x1bj84vwrjfotmgd575qkpknh6',
                        channelComponent: '3ao3z6yhpa9i5k7h5u4t9zyb09bdxo070vvnzuej7bg9ei6g9taboggdfryjo3lhrcbb5k963zhb7fnl02j27nvmj1r4mnjow72ozkwjvvpxptckod502zn13hd8n3o9cgal63tuc4yaagpd3hoz6nut98hd50uy',
                        channelName: 'urnv3lqibiaoaob27g74w0yxe8xyd934rfum6t1hui0ce4yppzvye8jr7jba4g9z1b9b73m1xjd5918l5xawx1yvn6j1ignop5pgfry1mx07x6o4tdij7uiqpbc1wgs77jlwf9jfowep9k1z1ud9qzrbv3ivbl88',
                        detail: 'Nisi praesentium officiis vero voluptas molestiae maxime exercitationem et. Velit sed et non enim neque nobis necessitatibus dolore esse. Vero rerum sint officia. Itaque voluptatem cum sint id totam quam omnis. Voluptatem dignissimos incidunt est eum asperiores recusandae. Autem fugit natus quidem officiis illum.',
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

    test(`/GraphQL bplusItSappiUpdateChannelDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateChannelDetailInput!)
                    {
                        bplusItSappiUpdateChannelDetail (payload:$payload)
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
                            channelId
                            channelSapId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '436f18ff-0a01-4f81-84cc-50bc62254e61',
                        tenantId: '3417d5ec-1f10-477a-87fb-f7d0fa0562a3',
                        tenantCode: 'cnu8w3f4wvppdbflovio554bheai5d7gtqb8eyp00hdzsxjohl',
                        systemId: '74e7e1cf-88f4-425d-8795-33103ff20f73',
                        systemName: '76wo4ao235yqgc7ksf63',
                        executionId: '5ecca706-d8e1-4495-b131-c36f7cc3cfab',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-27 16:35:53',
                        executionMonitoringStartAt: '2020-07-27 06:48:23',
                        executionMonitoringEndAt: '2020-07-27 20:16:00',
                        status: 'SUCCESSFUL',
                        channelId: 'b1050b31-ad63-421c-ab5e-174a0084d9d9',
                        channelSapId: 'fzlhgq51q0t25lby9fpnxp8s9jd5ud6fjotlsqf10pqn1e9cu5',
                        channelParty: 'b8k8cy484frivnvygxsuz5wqvr7a0dlj4c2ro38i2zvzdohr3fj5g3wgrwx9olekg5ogks0xig27j6oz0sqsrrlk5l5s3yvk6c8ba1dyr7h3cqoqht8vet264b97c04gjok7y24l40ff80j66c50znxn14xmlevx',
                        channelComponent: 'ue5mtq0w08xlssesf4m1w5r45lqceln9c2r8r7vmke406pighn380fze56bguwvoncdo1f9k5zfhg5gc0s6ip9zx92pa8q5b6pphth2tqczzynjhl0wzqb7um6h1lpi5ewkbjtlpjf7c30umq3l8al56jlba4exo',
                        channelName: 'w78eoxdat7jstg3dx3cnwbtu8ah5afhycnz9ectftx8o8kfd268x8ehqk1c0qrvhxj0n6x7ul7oenz07hb55raoq160sbyim540hsa6hovprp62fvt9sh5uf53dk4dl4l29ctua2w6jwa0nfcp1dsoe0tb7e8b2o',
                        detail: 'Pariatur laboriosam et in fugit at. Eveniet eum voluptatibus non enim. Quis et iure quaerat consequatur eum fugiat. Sed vero veniam id.',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannelDetail.id).toStrictEqual('436f18ff-0a01-4f81-84cc-50bc62254e61');
            });
    });

    test(`/GraphQL bplusItSappiDeleteChannelDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteChannelDetailById (id:$id)
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
                            channelId
                            channelSapId
                            channelParty
                            channelComponent
                            channelName
                            detail
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

    test(`/GraphQL bplusItSappiDeleteChannelDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteChannelDetailById (id:$id)
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
                            channelId
                            channelSapId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '436f18ff-0a01-4f81-84cc-50bc62254e61'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelDetailById.id).toStrictEqual('436f18ff-0a01-4f81-84cc-50bc62254e61');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});