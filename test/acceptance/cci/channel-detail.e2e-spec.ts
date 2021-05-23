import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IChannelDetailRepository } from '@hades/cci/channel-detail/domain/channel-detail.repository';
import { MockChannelDetailSeeder } from '@hades/cci/channel-detail/infrastructure/mock/mock-channel-detail.seeder';
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

describe('channel-detail', () =>
{
    let app: INestApplication;
    let repository: IChannelDetailRepository;
    let seeder: MockChannelDetailSeeder;
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
                    MockChannelDetailSeeder,
                    TestingJwtService,
                ]
            })
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = module.get<IChannelDetailRepository>(IChannelDetailRepository);
        seeder      = module.get<MockChannelDetailSeeder>(MockChannelDetailSeeder);
        testJwt     = module.get(TestingJwtService).getJwt();

        // seed mock data in memory database
        repository.insert(seeder.collectionSource);

        await app.init();
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                tenantId: '86c971fc-6cb3-4b0d-9572-7b0889bbfb68',
                tenantCode: 'e9l2am8rwbjgonol25a0tx7inxyk66syinzoepjesd59qb77ke',
                systemId: '50ed104b-8488-47a9-b6e1-a29ce9b0fde2',
                systemName: 'bpin8n0npb86fdddd8bh',
                executionId: 'f595a2f2-86c4-440b-ab63-b48210061564',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 19:51:08',
                executionMonitoringStartAt: '2021-05-23 21:46:48',
                executionMonitoringEndAt: '2021-05-23 21:15:28',
                status: 'SUCCESSFUL',
                channelHash: 'j7jeagk796x86b4xsprgonh7pp1ao457i9zx8zs7',
                channelSapId: '5v3365phadb1b36ds57ljr670e2nf9bimn8ymc2bx1slkwz858',
                channelParty: '4d0r7kajm8exda6ijrhiwpusy2bh7q8hcm90gch4ae0jnahr9cls4q56m70gwdtd2odmvw3hwt67bux96mns0uemu631hurohh57deewhnbks8j7gvlm61xan1e66f21fns1g2x4qsbqwacdhkthdajkmlb96z9b',
                channelComponent: 'loiisbngv5xxmaqdblh2w3f9fss327g5mzwgf2s9418xnw93hirsicyhc3iag0etyq40fhcob3qkkw84m6kwjgdo54qtm7ftcp1njtu24xlrsidjfhxfl6an9fyvegq1rj4us586ejxo891eaik1ve4tfbkvyg8b',
                channelName: 'krfvyhtizdc92tv9uqsjgvxg80lnmbvtjd5u82kzhd3d1ej5xtmhkvvj8ipy5dlgukl2yc5s4gunx748iurezgcpq2du4bnb0cbspwt6j0qth323j62dw2babet5dr6831g667yps4jw8bees414s7s25ulp2702',
                detail: 'Et vero nihil. Magnam libero consequuntur autem voluptas maxime doloremque. Voluptatibus et esse ea ullam minus laboriosam nemo cupiditate autem. Eaque id rerum odio recusandae consectetur ut illum eum. Labore aspernatur adipisci optio voluptatum architecto sapiente quo.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailTenantId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '3ae45ade-b9c3-4553-a290-0376b80adf51',
                tenantId: null,
                tenantCode: 'eqd37imdt7uw8xokku158a5vihhcuckklws8ok4w99xsnmv5mg',
                systemId: '79975636-357b-4834-8e2e-598248fdee4d',
                systemName: 'h4nrl00d3s52a4ipruxy',
                executionId: '449d9616-23c7-42df-9233-dc20a5d1d793',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-24 00:13:27',
                executionMonitoringStartAt: '2021-05-23 05:57:40',
                executionMonitoringEndAt: '2021-05-23 13:43:57',
                status: 'STOPPED',
                channelHash: 'yxouj1dbjwzp8wog6ioxa0uug11uhebyr993ws7r',
                channelSapId: 'noocjahcm8bxhr5aiibab9whj3fpsuyyh6r61g9bkiiql0fe6p',
                channelParty: '49i2zbt2uz3w2tknn8i41uzw223cdztdqqz0yo8vhjxzoivejhexjpf7mumq1k9wid0lsawqdmgki3l19691y710rbvyxoy6j9f3pktf91tw7qkvpo2x0h7jucy4h39mm8u9fa3z2kxrkdh8uv97livkj9mpwdoz',
                channelComponent: 'gacyhl0y6puc6or6c5ba0243l0sfvh9xgfniv6n67mj08tfas5wvqwcvl443jtgibic9x3gna774vxtraciyjj73vvpochog2pnk5op2tl1948605lm03uwtdoxkx32q3ickkha87csk0wkoz607i9y48h8nsxdo',
                channelName: 'ugazvtyeihp8zgw4tzbes0q0bsrcqw717h6bxjpkhgu6g6kr5p67usmob0lrjyxuosb03dvym5z702u5mtdjsubj1bt23l9rmfymq3mgwunb6ifut03xrll8lju28v0e3i4p6pbugbfoyb3ea32ldiup0dm8khi1',
                detail: 'Tenetur eos ut dolor quis accusantium assumenda odio. Placeat et quia est voluptates quis eum in cupiditate. Eveniet neque ipsum aperiam in temporibus assumenda optio officiis. Voluptatem molestias ratione delectus blanditiis esse ratione amet vel. Ut earum labore recusandae. Vel aut inventore voluptatem.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailTenantCode property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1659535c-b972-489c-95d1-accaa89f0541',
                tenantId: '50e34170-5523-4c21-a316-e9eb0ef1df47',
                tenantCode: null,
                systemId: '2b07df33-6cb7-4959-a572-363bab887529',
                systemName: 'dg7ej7vi2ub7yao5rxj3',
                executionId: 'a85875c4-ae2c-48eb-86ef-7378a1d8d5ba',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 17:28:06',
                executionMonitoringStartAt: '2021-05-23 09:05:03',
                executionMonitoringEndAt: '2021-05-23 12:10:03',
                status: 'UNKNOWN',
                channelHash: '0xj7bokcya0gq9gyn4tavls89ihjyen9v4l27jf0',
                channelSapId: 'zplnqc76dw24lwodi840n63hcm9fbwz204d9yk75jaay5khi2u',
                channelParty: 'zcckoz30zezh7fqzff1kc5z7lmg11v5gl5yn0bi5j5fplrg0pqab33h1v7svc6l8anqtscdb022neiwt39ntaib5612oolcmyj8uklisjlrosrtex06i0oeim9g755n4ohtc3rgeicrpqmizuzgkg6quagkb7cbw',
                channelComponent: 'alj8owvaicv56gc3xjyytt5epm2011p3jkf2k8uor879wz9plfr6o03wg303xxz9njxv3t8ncaezf0o3kuvdrco2yjesvdby6ey4xvw3tya3mkbbuga68oqze2ho7de7ng4xk6x3oa7uyg60wmwxa0jo0kmlvbtg',
                channelName: '9b70i0xtvfxrcdye19by8d7ey1y1dclb30i99uk15z5jrnpw2fjr8fyq2xakm6vpkhcyde9idauqs71114f7sf126dwirp8h71jhh2hlq0su6emj0cl5l780m28c57d528g5zic9d3dusch5v4mz65j1oc0oqf2d',
                detail: 'Minima quo vero quasi cumque explicabo. Atque sit accusantium unde dolore aut sed. Repellat sequi atque. Non ullam et molestias dignissimos rerum vitae et in.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailSystemId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '27e5eb6c-65a4-4af6-876a-1f1cb9687c71',
                tenantId: '632d42a1-c489-46a0-95bf-312a907cdefc',
                tenantCode: 'gifvilnh7ppmg4dkuzho8u4kdvkfw96cvp5c4b5dcfwhih4esm',
                systemId: null,
                systemName: 'j3aqi43u618t2n5qqsy6',
                executionId: '03273636-066a-4a3d-b16a-7e770a19e27c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 10:23:09',
                executionMonitoringStartAt: '2021-05-23 08:24:17',
                executionMonitoringEndAt: '2021-05-23 13:57:41',
                status: 'ERROR',
                channelHash: '530kakfqhwwxcgaovk5x6mbyc0r0x74st08jc4nq',
                channelSapId: 'nw2qly5vqbn0obg7xd6t90rdtkj2jxgyz6tjjqlawzuwpxuyoa',
                channelParty: '03ymlhn5712663t7w89q9g5pjtxjzm9rzlowvj7v9f7anxug3bkug5xdref1z0eizc6sc79twbmwhjb24wks35bwxjji3x9cwpzytbm08aygzdill6g5pit98op6af3puiuy9wm631h78ymifteo70frhxnpcn4b',
                channelComponent: '41kctda8pxrd1xu04ovkit4gd56bh6ww0tfpecnh504tflhd20793zt8rjq9siq170il5delmv175cj6zr4s05yhobvl2oqestgu56y5cfs8s1oy9yqkfp2o6n1x5h6n89ce2yvqz2s4j94npk5l7x8arltbkogl',
                channelName: '6xobbr68rwa4jj3oa4cnwmc4nk6ox7enefu72um35sd2oljb45ab1e913fay7a394io1y99h33cq5rrkt1bfwtm3ys8f3zsgjnk8djr6l56yrfbun5mz4cuuur67it6pxoccrpa8wr8ykccoytd00rui0ndk1gmd',
                detail: 'Reprehenderit natus sit non facere consequatur ea consequatur voluptatibus quo. Quasi dolorem et placeat cum occaecati. Quod culpa consectetur aut neque autem consequuntur facilis numquam. Facilis praesentium qui nulla est quia nihil.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailSystemName property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'da1d86fa-7cc9-4118-a6f1-6558eca7d575',
                tenantId: '7d2ff474-f551-4bef-b571-8940dc88a1cf',
                tenantCode: '63aydd5m9ui5seqedny0oky8bav1x1hhh361l2bt8lol6ldhgp',
                systemId: '22782bf3-281c-479c-9be0-410f1bda8a86',
                systemName: null,
                executionId: '35adbff3-8977-467e-a28b-0a80b587605b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 20:36:01',
                executionMonitoringStartAt: '2021-05-23 11:12:02',
                executionMonitoringEndAt: '2021-05-23 08:08:05',
                status: 'SUCCESSFUL',
                channelHash: 'mip5ty9c0moivdrqgwpjgmzfxdh0t9v7cm0ixf22',
                channelSapId: 'eznpz5mma3fqodi7g5ct89w3t2tw9xm0h31c9yffg7xsyafe4z',
                channelParty: '7rifznfb4h2rpx7fwt8tdmi3f6sxi1g7rl6jf2iuyz6es85cha0yjubb39lfhhxoyc8gcq2sxy2633dw1adqgbau6h8z5wl3ei0pq149tjx4xwr9cm41p8aie2fvi6v2iwqnsgp07vx7zo38yr0nn5r8utvohenl',
                channelComponent: '89ajdud7p4cqni6cm3xu96bgipxl1cd2knuxn2s6rhnv6mqoz8l7qk6wwcgl8yft7ybp9ej9wyka4fo6ak54eqm4peql9kbtdoebklzp0f9xosqdku1hf3uos8dzfa7jfybo1wsgtmelp5sddul6cqu5axerkjit',
                channelName: '45af2yc2benfvly6rqgmquqh5al88m3wik8nzepiauh219xeuxm8fbd0at92yo3oc7h462hq1m83iidbzbowwhfjv5a2qk7lc2d272oxcbip0puhs2uvzmnkerd9eq4l0c2q1019flk9zk5arye6apzu37l081hn',
                detail: 'Quae rerum voluptatum ut nulla aut dolorem modi. Quae nihil et et sint nemo esse rerum. Qui officiis hic quia repellendus beatae voluptas unde. Odio quos voluptatum qui placeat praesentium.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '38e67fd1-0b35-4c8e-830f-842c27dab934',
                tenantId: '0704c271-73dd-4cc3-928d-21a27c414722',
                tenantCode: 'sqnynaqp6dksxfykbnjqsugx3w4xy1v8bea36lq0rb6seu0oir',
                systemId: 'ddb62635-eb57-41ed-a42c-92405026477b',
                systemName: 'rg0p6ljh082tqguglzs9',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 11:14:20',
                executionMonitoringStartAt: '2021-05-23 20:48:59',
                executionMonitoringEndAt: '2021-05-23 02:43:03',
                status: 'UNREGISTERED',
                channelHash: 'klh8vj72blz84m5aayzjqbxzrd86f9gltok08mk3',
                channelSapId: 'zwjvfezl5w6indcui6rk5bu2zfhojjv3va8z0vadv21xngx49t',
                channelParty: 'cmbcv54p44pzkyfkqndc9b1xszjbwoxi0hgdpdyfg5908dwmmth6g1nbkmb71qthdfh649xjcw7l9ey0ojyesqfavmddz78zrp7qfd51crjsq0es1f74j4rnt8cmwd7gdkb5t894ezc2y6t44gh70u4xdrbchsmb',
                channelComponent: 'ddwlg3vbcowaf6obaph4ys2tvd6tspar92uyeprc2rgn1mmajcsxrknooo12nk8ccjfb1qn89cviyb3g71s0l53m3m9u14g09tlb46c34vmgxiku8t6pwqa06rvvg42ylr1n3rbatcshmeuicmfus3xi82qug5gp',
                channelName: 'pq37bv8s7de6belkrvvlevfj6sguf41jlaph5t2nsd3po0vv8h9ct60uwxh3wvuxgnum1bose03oka3ysoudqk4f97w4q5zmjzuyisnag5p13u0pczk8qoasxj016pomsaw4swnab9g7co2dkgfuf3qpouk3lcsh',
                detail: 'Earum earum non et qui. Ipsum magni rerum sint similique. Velit eum et ipsam minima natus saepe deserunt veritatis pariatur. Aliquam earum quasi sit tempore deleniti itaque sit. Voluptas ut eligendi. Illum et omnis sit quis reiciendis mollitia est soluta.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionType property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fbeaa221-8090-43c6-b5b3-db6d3b50413a',
                tenantId: 'f1cddb62-0e08-4107-8ccb-80b337930e23',
                tenantCode: 'b21mqgacr06hzn5wmm6y0myf3cn0ue5kuv8n5z2v7nxdlbv7yc',
                systemId: 'a6856751-8f4f-4aeb-8883-884207f1cd4c',
                systemName: 'aqnqw1t3cibq0o2zl7sc',
                executionId: '2d06a5d3-a9a8-42d7-926b-c26431445553',
                executionType: null,
                executionExecutedAt: '2021-05-23 23:56:11',
                executionMonitoringStartAt: '2021-05-23 23:39:38',
                executionMonitoringEndAt: '2021-05-23 02:13:24',
                status: 'UNREGISTERED',
                channelHash: 'omw1q6eikazw17tk5y77cav8jvmanqrrzy6f95sh',
                channelSapId: '4y8oboli72c7yckmssdv9aobygpid2qysh9uy4lvnvluoxohxr',
                channelParty: 'i1p9gb82phqtqs42cswuzejapqj6mde7eit1g7pdievs3w776y80w01nxs9td0ef3tay22mmxcetg2b6uxzj8q696u31c3540ek1yn1o07gt6ozokrvbz32ib1av3vlviq5h6yj4bymk25krph8pbtdj9ulnyxvk',
                channelComponent: '3ghzhw8mmc06eb7ysb7p99uy0pge82onb6sk5k6001ylrvc0z8asmy2b621bwv4pnc36l69xcyiarnhtdwy5fihbl7yk2qv1bim642fiaspdqj6cvul1tuhuit4qxiyubmk2ojr451pe9s7rzu7cpv7bknffeszp',
                channelName: '7reb9cj4k9em5m2s4ezx4kkub1e98oefuicjmz4dd531c5s1iqx5g19rcl56bnug6h2nn51lmc8prjzf9nyjecey4irigrxzfm9bblqhxlmu82277orwiij5hp3jg69kay83hs18qs448k6s3i215rfe6q3oq1x6',
                detail: 'Qui maxime tempora doloribus ipsam repudiandae. Praesentium dolor repellendus eos culpa aut dolorum voluptatem. Maiores nesciunt iste ducimus. Aut earum ratione ullam ea inventore incidunt.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionExecutedAt property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a55412d8-b1ae-408e-85c5-e359f5254e5a',
                tenantId: 'e00d6d20-25be-46ae-bf88-778bb4bb4251',
                tenantCode: 'ylxuqz2i0hm8ay072zjgr76buh435o71woq8xwfqloi0tjvblf',
                systemId: '8d8f292e-577b-4e54-aac5-d48c39e30f3c',
                systemName: 'cav1b8eopmv8hmalc2fm',
                executionId: '77192053-1380-4d02-a2af-3456833a9d62',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2021-05-23 16:07:09',
                executionMonitoringEndAt: '2021-05-23 01:23:50',
                status: 'UNREGISTERED',
                channelHash: 'xpgmdyotmk8ml2whn2bpgyvr0yr86m6bfnjdrrdp',
                channelSapId: '1bodli2d9zzz26z9cpnbdnxcvyjv01sggsc1p77za5oqrb4tft',
                channelParty: 'olgntzv6k6hxglragstu4bbwx2z0j0yprwbit22x9swoltw6617asilqbd1cl4igqdea0fpec24pfhn5w2adeaopwi8ejpuey2jkj07sr84jpw53lwfxha21wdnwkn15qru326yy3zzobbku38qbppvma2ggtr06',
                channelComponent: 'e0exm7ccd5efkm0786mjvfu9878vpsqcw665j0o9g0grf34k37h87pzbcx8g1jl8re54gwflqlhjtyqhoavaicr5rpbau0dr2ogz7z0zb8blorrhnlt4hwc2tvb0bxg6v10forbn9pqndaoddcw0uwjtr40eanqc',
                channelName: '0b8ec09871heibavpk2fkg0qx00ck82ulf2pgdtqnt5dmuq4gyrg4r3irz818r36l1e6oikymhiw7cyfqk2o7wf6a8zh0pop83korbjngf5ihyuterz71y7j4r62co6rk5hftkp7e9pz3bkovq633ivhtruh225y',
                detail: 'Dolorum impedit rerum doloribus aliquid rerum autem autem. Quisquam ea sunt. Non nobis eos molestiae facere sint cupiditate explicabo occaecati. Repellat iste rerum doloribus pariatur minus. Quos voluptate quaerat.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringStartAt property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '6a8fe634-815a-4469-b32c-e3744472ec52',
                tenantId: 'aae4179d-5988-4d3a-a30b-c234cf771ed3',
                tenantCode: 'q3dhjohqpunhdl6kzok3kpwkbq3lplugixfipywo4mg1rvtlr4',
                systemId: 'cdd8bbd9-e9fd-46cd-a311-83cd4ccc9b00',
                systemName: 'olmhooxhoz9mu9j7rxz2',
                executionId: '578448b2-aa8f-4a8a-becf-a51c02ecb5d0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 01:15:11',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2021-05-23 04:56:38',
                status: 'UNREGISTERED',
                channelHash: 'p7gyghfb37vbdd4777u8ioprv49hx9x2pxq1mi3x',
                channelSapId: 'c4ltsncb5z4808o0te596paxxt0q86tpkz43sfg8djy6nffazv',
                channelParty: 'vuei2xjjtnwdn0spkw00c5cv2b1gjd7oqs4o1v9g315prln45t9nermofql4lwrj03ca28oxjdkjxwxohs6s6afqhwu6v4xj09llvymuoysshdwnup693yaeia4fl1okyzzi5qnwolbgr86nmch3fll1vizrlmab',
                channelComponent: 'siv3g8wa4e9mcj0iq4jwt0m6cflslihzuw09a62hggd3jxd2tndsvsnwdmvl6lcturvs0ims673slbouykiyublp8onalfzr0s72kvwdpge733ufj84m3hfrfrujjvl7w58sjf4z4q3fkcava4am79fhxx09ivga',
                channelName: '73taz1zb9s7p6jnp2lxtmpy1xhdglokccp1a7j8kgz8uv0kk40k6vk5lsuqy4vi4euhrjczql7u8h2llr7nmxvdymzorz05fioe0u59qof4p7ekdacs5ig0bhj7o0jh0dw5aernyxygj6rhv4y4ohrx36wxxo5dn',
                detail: 'Itaque aspernatur illo amet quo et delectus aut. Quia minus aut consequuntur non minima vero tempore possimus excepturi. Quidem et illum debitis est.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringEndAt property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '008b206e-3608-4b8c-b474-95752cb3a211',
                tenantId: '02788612-8d62-4c5c-89c7-93a30d401beb',
                tenantCode: 'lfkrd7jwfxv7h5cr5p8qogyfoul3gqv63vvs1g91xtuyv8fo1h',
                systemId: '7f70d9a8-d756-4892-a927-8b2ad31396e1',
                systemName: 'sndrg85n0jbz9w5h93tr',
                executionId: 'be6f3242-0e23-4765-ad5f-d8b2d78157b8',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 22:06:40',
                executionMonitoringStartAt: '2021-05-23 02:03:23',
                executionMonitoringEndAt: null,
                status: 'STOPPED',
                channelHash: 'jtbw2i9r7l604ejnbkpy2pvhp1l3o2wu26q5qjdt',
                channelSapId: 'xl0uvu88u9r0pjzb2221jcfdwkierturr9vpatza7j0p34v89o',
                channelParty: 'qv2km7ctci5geym3n381xs1jscvxuehhkncg6set5eabqxkliu9zyia1k1fr5q58ld0mirk5kyz0ovncfp9f6pbideix91iunlcb85cs8ccvgj9g25aheqrbxb1c5xhux9kwygbffy48y1gi4jm2lldnjf9kbhpw',
                channelComponent: 'f1zfhfpsg7ojb3knwj860fcnx32yv4jwjx3ziwpoo1hwej2a1nabpio8w3ur6t0on58a0l2lxv9aw6kd32jksco1tecrnyt4ru5ipy3u8jkvv8gl6jcsoed6ch590cx21086ypbd6pbd5j7q1dodzvuowokjdjwd',
                channelName: 'wvf8pky2oejmx772r5w61uu8e9blcgbaj9pvu9elx7m29xn7sd4etzghy2eng9wckj6pc2jgi8ev704duhy8twyt1de6h4w2gj9fn9aqeecbh409tusawsuom0wz1jp7xsylhsvofpjsy34owh2y8xrdldd9fu84',
                detail: 'Laboriosam delectus enim est provident qui repellendus accusantium dolor. Necessitatibus nemo dolores minus voluptatem asperiores eius aut ex. Sit est est omnis incidunt dicta et enim. Cupiditate consequatur soluta molestiae eligendi vel eos. Voluptatibus quia quia eaque quidem omnis perspiciatis tenetur. Nulla doloremque aut quis quae dolorem minus consequatur quia ea.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailStatus property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '9d7c5131-09ba-4d57-91ef-83cfc9ad68a9',
                tenantId: '101fd173-0579-4f89-ae66-f4fea0b185e0',
                tenantCode: 'umxjx0q5qfqsit36k9r7e4l837vp32foy8byp44t1k5e8v9f40',
                systemId: '20afd85b-d372-49a5-be07-baf598601407',
                systemName: '4oqg55ysp1viozw0zwpe',
                executionId: 'c1faa3ca-d10e-40f8-bcbf-7e640284c19a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 20:45:58',
                executionMonitoringStartAt: '2021-05-23 10:57:03',
                executionMonitoringEndAt: '2021-05-23 09:19:01',
                status: null,
                channelHash: 'vpip6dr6sy5e0l1jughxda37ecnprydb1a6fm58d',
                channelSapId: '64b6tmoeuj3kuis5d6qa3j8z29zcv5c7rp3wqrpky7vg83t5iq',
                channelParty: 'kev0735imoktpixxtkkmyqd94lpr330e1x5tbprhif0fa3bkbmb596plegg22jpnrrplu38u4vv38dcrkclkkzf0saj3ittn0tmu67k6vn5vjkzj0hoyfsdysy7becs1tfj3xyylrz0tblqk8u271pio4jzdjjoj',
                channelComponent: '13ql71y6vm18k9m18ojluy751hysmcdj7ysigdnbr6q57igdveprya13r8wt31ki1fjs5dgkkecwxylmgbg3jbe0rkt4zw6cy0b4m8e31t3grecwhu7t9zeimd1d6946zz9gpin689z4zwzolu3qztji4mzymds4',
                channelName: '9sj1jx173cavz6b9x60retdz2yeucftqiks17r5khj2v8ta75bn819dk3tc0kge0a9xc14fu4q1dj3qzrgmcv9l4897win4qkebvd3fwaryrl4v3opewxdl3m7ho0vnt72gmduju0eaaykchb0m69olos8u8tzyq',
                detail: 'Modi natus est quidem aliquam modi ipsam in. Reiciendis fuga est recusandae repellendus molestiae numquam. Dolores vitae at voluptatem maxime aut cumque vitae. Recusandae labore error cumque qui dolorum esse.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailStatus must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelHash property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1ed19456-3187-4762-af5e-af86994c4922',
                tenantId: '157d499f-eca8-43e3-80f0-9bf80a418eee',
                tenantCode: '9nvluegnjxu3jykd3ych4zu94gcw86urxu5ckjmpwvizgxtfq8',
                systemId: '32836fd9-2457-4fa0-84b1-6296b4bb935b',
                systemName: 'hox13uy5by4rds3uhytx',
                executionId: '26166320-4663-408a-a9cf-fba61c3203c6',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 01:15:27',
                executionMonitoringStartAt: '2021-05-23 01:13:39',
                executionMonitoringEndAt: '2021-05-23 03:37:14',
                status: 'ERROR',
                channelHash: null,
                channelSapId: 'lstkd1u5bp3b6n7xooit2anrr4y09is9idxwhmjw7pncb33iat',
                channelParty: 'uvmhmzn8a4kkzh9htqqjennplq6lmh029gxn3lmyve4r3xs0tq4qqlzjhaap2tzid3w2gkij46brl3anfswxt6p25inj13iw118w061by9ds955ndaru5w8y4202evh4ldme1uv04xsx8t1m5b59c0khkfuytqp6',
                channelComponent: 'je6zn9tzyu81i86o2y8zq92cw3zfjlsw1ex0bazd46yzhzq8dqxvek1bk1bmmo19nwkbegbrhqbgenoffvada5hjg3258d92thj9jtgfcc8062vqj68ow8t6z1yjwqm1ofrjv146sj78zh7lt2ruof9ml5ro794w',
                channelName: 'f3tlhbliiyrqau9smnpxas5qfoj03k01j3khaazzej5et0sbtenn4yc6dewh8un14atho31uvirjwsy8k6zj8fbhtfn5j7428tc0poo1iynnbx0xw3hhyjenwurnqapdufy88xx6ago7391cjkxo2enyxgm5muxj',
                detail: 'Est placeat quasi. Optio perspiciatis sed esse est rerum dolor perspiciatis. Rem illum ut.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelHash must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelSapId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b404a860-7729-40b4-814a-2e867c989f0f',
                tenantId: '3e2c5d88-575d-4332-b837-1b81a905dacf',
                tenantCode: '5mrzsnte0zagjfkbsepelykk0md3edct6c66ecxkqhp0eyrvcf',
                systemId: 'dc4ea4a6-68f6-44a1-97e2-957072eeb4b5',
                systemName: 'eqnhqcsmu4ajq36ghpov',
                executionId: 'a91d500c-0672-439a-8f4e-c284f92bd68f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 20:40:51',
                executionMonitoringStartAt: '2021-05-23 02:35:04',
                executionMonitoringEndAt: '2021-05-23 02:29:44',
                status: 'INACTIVE',
                channelHash: 'nzidtbxf3e55qm9y3jblbzsgmmi9u1zyj1qbc5qd',
                channelSapId: null,
                channelParty: 's7fdka45fb8zcz1kqswmo9ouzze1ftqqppq51r2pbblhhbllbzfqich3lbo8r2fxgk1ih6adk81ig4xtq0dwuuj00x27zoi2awv4yc0gk1hdjebarpp9oq780e2fcfu80rcws4797pyrsgj5ev8p9d67qoleqoen',
                channelComponent: 'vw2hr5vu8660xchcgylhx7972h032ngdt6hkhzerzpf4t99k2u41sxbbiuqyr0iecnk0vxt8m972kfi4ci4mdal4cllk8oodrirfmddct65xf59vgg2f2qzdrd53n5jve1mmbig2aruclpx0sqjibt79hpvjcdd4',
                channelName: 'dfhvtxf9guiehsslzm7qtc07hz1fz3tjo53wa6q2nwbssdhdxtaqmnmifd7zwxqc3fkvxzc9ydr9p0u0slhgja3ewzs27awsr774fvv8prdy4srvgwm6jscbnubw4oie5yy7x29fe5n3tpkn33jrdi11ln1wuwoh',
                detail: 'Laboriosam ab sit adipisci reprehenderit ut cum soluta quod deserunt. Dolores quo sapiente tempora molestiae quis. Vel qui animi nam.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelSapId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelComponent property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '3563041c-1044-46ca-85fe-3d3588ced48c',
                tenantId: '4e602218-daa9-47f6-953c-4ba6dbad1589',
                tenantCode: 'yyu4hni609nga8ngt2vmempyc3oan6tdi2ngzqls8y6dq3mspu',
                systemId: '0248a383-d013-4744-9ea2-7c2820329be0',
                systemName: 'v7nu6pd4v4jrrmiqvf9q',
                executionId: '71516b60-3ca5-4a23-80da-10c1143caefb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 20:42:50',
                executionMonitoringStartAt: '2021-05-23 04:57:55',
                executionMonitoringEndAt: '2021-05-23 14:11:57',
                status: 'UNKNOWN',
                channelHash: 'utewmzrwmw8i3nk9gh902y8udcl8e94vf3rho7e5',
                channelSapId: 'g6vw7hs1mrz76h9uxmrw04bla9lk96rv93xi0h123y1x487yh3',
                channelParty: '2x5yksz45cy6xptymmgiqej1yga3vpoxh3bswku6kubuweuhzeon5lqgox67vwzn2yxs6q3mjpblr2o4j3qis57dj0cboc7wfq5c3bxhi73yde3fgz9gmk6sgtclqjogkx62zi44l37wlvonyfudp4y1lhv58bq2',
                channelComponent: null,
                channelName: '7uadx999nt6clozjroaxljz2xejo079lqrtsna5gzcqsjd7v3g6cdmk2jcvjnyua1z6ed7umd2p9d2kqin2ablqw1ov4pagnqsg88bl84s8e6pwbe1j1wm0uvyf0go4pg5t3ug4h9z5ca1jmw2516jld3c3wjkow',
                detail: 'Voluptate modi reiciendis. Quisquam enim iste rerum. Recusandae eos neque in atque perspiciatis excepturi maiores. Commodi similique dolores. Cumque enim molestias ut praesentium. Quos explicabo est dolor.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelName property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '13067766-e466-417f-8a5f-6ba78fbcc244',
                tenantId: '14daac79-5ded-4d0f-a3e5-1880c84d9de3',
                tenantCode: 'kyp0twushsj6oq866ddd4e7st68m5vwjh7qlr3l3j09aexbzgm',
                systemId: 'c612cfe6-433d-410c-bb2f-9556492e1481',
                systemName: '43lqa79hljfnts11j0fd',
                executionId: '63cf8eb3-a4a3-4aa7-8c3c-14c93a018fed',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 07:01:34',
                executionMonitoringStartAt: '2021-05-23 23:46:32',
                executionMonitoringEndAt: '2021-05-23 11:18:51',
                status: 'INACTIVE',
                channelHash: 'wr2vjrz9gi9z1l0xaflj6yz99e9frbx3nt9e3pu0',
                channelSapId: '1qd9vfnts93ddnsg7zxxq955ohi69i31lkdpezdukjnd1s2nuw',
                channelParty: 'tttio8moqjlinsn195neqs81u63nkle7c360zk4jnu6emekoukspuakiedvy1nvog7ensv3pjxdydos871zhlds41w5quzux232f0dugg8mx5cipf5ta88cbjc9anmfc8myvagbm2uu6ejwzqm1ua8rw9tt4q3cb',
                channelComponent: 'dkjnwlnb42p0vdzq3sjk5n1ohfcdhzcesjq5bmddnjfyu01b4ozumth405lb01ki9rn58m1lcy6gp5yyhs4mn57xu30ghlat5iec6c57xen6t4dmwp2vslnbno6wc2qq24hg5elyxw2qfrsv4tkyqgteceh1e8f9',
                channelName: null,
                detail: 'Debitis vel et veritatis officia nobis sint. Enim vitae accusamus delectus nam omnis provident est. Omnis et saepe sit. Nam et minus facere nulla voluptatem. Quod ab qui.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                tenantId: '15eed535-abf3-4771-ac47-b515d34fd21f',
                tenantCode: '46jg0r97l08jipdqq1jz0sow0nvfuvalyyv0eb3ww1tjnr1is0',
                systemId: '8c2961d7-abf7-46df-b312-6f38b8a35256',
                systemName: 'pvyrtko2gph5g9xyvdtd',
                executionId: 'a1f04ac0-8513-4a25-8678-d6077b7f6883',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 13:46:29',
                executionMonitoringStartAt: '2021-05-23 03:25:16',
                executionMonitoringEndAt: '2021-05-23 09:02:34',
                status: 'UNKNOWN',
                channelHash: '08xo798wk2rajy5mgi7rsugxbc5qd1891xfk0dcy',
                channelSapId: 'ycbc1ypjz17aoh0xxtvgixsojpjkwr2yofdtz4fwbkihcxe7b1',
                channelParty: 'labjqu5x8fuiq6csaz7mhwr4ijj6rbdusl0yi5y8bfsma8rg998x3hkbkxg4dyyszf2vpy1wgy71q2qrsckcnsudrh9s4rhlpp0vmbbzoksc19pgcb35ap69o2sehzpoepubd7gw4a21ep10v65y7jx3resrmgh7',
                channelComponent: '1mz34siz6u7qqn9buyr39fziijydmzi5a4c3co68h8muk0kv1o2xl2mp8v2ofps1mtwzhyoql6g6h3v0es3lkcrawyjnojib9m5xsfj39bl5u5tbm1zsfpu15w2xcknqqngl0j47p7e4q5ksu46cx6sk68xqkb1j',
                channelName: 'j732umvby56z3nr5k9thc6q10al66uungufgn2b2aij5vromivxfemyd5vx5ljv7fx1mnn0jwbhfzphk2mnaspit16eisariy6iy7jw0t323kejy0os18vgno7vihb7uqksqw6rs60yo00cvus4aixf3k9hhbm3g',
                detail: 'Accusantium deserunt accusantium accusamus animi cum et. Vitae id neque. Eos animi et. Tempore veniam et non beatae saepe et alias facilis vel.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailTenantId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '4572e7c0-f2bb-4d27-895c-2dc43dadc6b7',
                tenantCode: 'gxpo1d22jxq7yjvuyg2hz3lf655r1juhou1geypbwzxxklasqc',
                systemId: '3e4de85e-c6fc-4bd6-a5b7-2cd58b8aa807',
                systemName: 'd9w0suihrwirdp040xif',
                executionId: '8d086e33-4742-485e-93e8-e6a16a6a5b7d',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 23:17:35',
                executionMonitoringStartAt: '2021-05-23 06:25:11',
                executionMonitoringEndAt: '2021-05-23 20:19:09',
                status: 'SUCCESSFUL',
                channelHash: 'ev9ej0mkgw66494nf826bk5gd4sp06e0iwttqhyh',
                channelSapId: 'd5agvegjy3dbigsz70a0shus1ilmy7r6u3m0lad2tzhf5bdkpk',
                channelParty: 'eym4v3usq8smb6lacgomtjtf56wuol6cfqquiezwqmtd9eydvy8jos40z4pp4ytppmis08hhxipzljitdosmo37r4g0zhvo8j4cwhd5na7h14ulj86k66i8t9dk2f9qmb63rb1b9owztrujf9rwv0mq5ydh2u97q',
                channelComponent: '2lufdm7340aexq2x8iu2a4y4ydh811jb3huxdlpu9e072ia915ks11xojd7tioe2frqqpaiyp1c3vzsxooe538hfpxdmo8tixh1m8xyavcoqc6k311sp4fobybsr2ezozt9tp722qy2pf04z19lgpklegzlgmkf4',
                channelName: 'wfy75zxqwrli5tjby7g54c0kruqycpeus3cfwq66hco0cjn35r9681raiw0u03i8qxzbtllb5871zzjg3kikx4i2hp6yltxpqz7o3izfpgxspfmy7omj65y6oennc6d404adkp4ia2yvdt4d15pa1qpq5pc377lv',
                detail: 'Nam et dignissimos rerum officia dolores voluptatibus. Natus et voluptatibus eligendi porro. Qui et sint omnis. Optio enim aut. Occaecati qui dolor recusandae id.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailTenantCode property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'd2b9170b-e00e-4129-8053-2decd3d7928e',
                tenantId: 'e352cfe1-dc02-49e7-950a-884e207963d0',
                systemId: '9680db2b-42c1-400a-a3c3-f1b341234a15',
                systemName: 'im5f1p3ssgnd9taohwff',
                executionId: '7e0e094b-a53d-40de-987d-9c502c247018',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 04:20:42',
                executionMonitoringStartAt: '2021-05-23 21:50:56',
                executionMonitoringEndAt: '2021-05-23 14:54:21',
                status: 'SUCCESSFUL',
                channelHash: '0sv8y1j3yzbfngjz7rz2j0fzmfynhel75bhcznkg',
                channelSapId: '24ortve0r3v9b0brc908ajse8df8z37cbgxjxuj6chj4iwjnq0',
                channelParty: 'l1ug7j0vk19x5ox003v0r17q5cyqbqb8tg9fxbub86v1ytt6y7leu8dlr7elz4s1gxheayu7wqe4qmhadikoem3pu3mny43dvo8z9qq85ar86xl3irziwvcazyoq3a899km2rtvk4xrzcc4aprq7d1fhyda5r4sr',
                channelComponent: 'q66vxai53bumhcqdbddctjqaoj2gb0akqby4rfvvu5f8zbsymac278wtci2rnl71dbuzh1b0yinoznxxmcckl70hgsgz5zasylzzut5t7m9pgaei9buq9tktqj87ic3ghspgvnk98jsz8q9vh44x2fj0mar8q0m3',
                channelName: 'utz2ff4309bahvqyr60y0m6tlimxqhpjdr7e8ajw5gvpc9gyo7ofp3zyo1v2ekoaumat3yklffkgaonc6y89stw2e8iqhyd6vneldim9wjq1r0p73x7to30bfppfrc2iu2ch9m7cgv0sy79v1d5a694oqt8tflpo',
                detail: 'Ut deleniti ad molestias nemo repudiandae sed quia. Et dolores cupiditate sed voluptates neque itaque ut. Vero qui sit. Numquam placeat sunt repudiandae neque unde nulla.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantCode must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailSystemId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'd092ff2a-5c54-45c1-93cf-fc0eca18505e',
                tenantId: '7b050c21-e2d0-44f9-addd-a3bbe8bab8b0',
                tenantCode: 'rgayecumlpdxeo5kkj5qh1ajdimuhrjv7amjsbhl3nihxk2f75',
                systemName: '656xy96dqbetuiir178n',
                executionId: 'a5d3bf2f-b397-49c7-9692-ebe7344d1494',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 06:05:34',
                executionMonitoringStartAt: '2021-05-23 21:10:26',
                executionMonitoringEndAt: '2021-05-23 04:47:53',
                status: 'UNKNOWN',
                channelHash: 'zt37u2orb5x28a4jnhjnrfueu22nzdqwy4nxlcqc',
                channelSapId: 'hxzvlfb00qnrcc096nv1jyw1ticrccq2v886p7gz8harevoiyd',
                channelParty: 'ip9iuujgwj9qe28v1v1ywz6owpcm6thgj8zwqkzpkdef5wyi9lodfb9sg87vmt2g6cjq6wg0sgeoe6jmxmt2pqmlannp97ld7mg4azgj8k3jpowkroy2i6h2395gqqenfhq9ax0814zvvg9132n5u3fkn8q9m4um',
                channelComponent: 'ys9dno6v6bxxha51v0rcma1m8qjrcp9zmlh0kk0k94wzsw4cvfamqe6fp90tanjqj42ace6n1ehskchlegsuaiv7ob53bky65updniytu72nxlrtzb70suhza7g6ka7sjs7dw3yixte721tptaqk9gp10zwx7zff',
                channelName: 'ywwu5v010usd6gjxt977qywpj8ouelax06wvthfk4blzgsqhemgck231l0wmw1sjb30tiucqasl7btg5n1etu6i4rmcaxqdhn9y0tep2zd8mo0jkumw6vgj7zpkwjgqd6w9kw60ioinpdxb1bilkxp6qtpyyqtpo',
                detail: 'Id dolorem nihil eaque laudantium et quam. Esse blanditiis at magni est natus quia. Iusto id fugit excepturi dolores. Et odit eligendi culpa repellendus unde qui vel odio. Aut odio neque.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailSystemName property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '758e24ea-6b24-48ac-bda3-2b7079468115',
                tenantId: '762252da-4c44-46e0-9678-b40667b3326a',
                tenantCode: 'flaaq66s8tobfuukzaxh0j6c7133ohdkgy5qs8h1rk7zqivw6o',
                systemId: 'ecec61f0-2d36-4c7a-ada0-5a4df723409c',
                executionId: 'efdca4cd-2584-4c95-a3ae-d8a44551c7c2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 20:51:39',
                executionMonitoringStartAt: '2021-05-23 00:59:06',
                executionMonitoringEndAt: '2021-05-23 06:41:28',
                status: 'SUCCESSFUL',
                channelHash: 'b1226vrff6mhddn0nriru5bzoemfxrcduixd4veq',
                channelSapId: 'tg3fz8l7eovuhfjt2qhe17xtk0v1kcyzgqu2x0m7hnytbqsy36',
                channelParty: 'bghbxabfm7x6a6m0xllrf5wejorqpmz0osyu2mddw0d016l6ngbg9fe64hx3wwonwnt6wn583u6q19vvrhkhy5ytrlz0buu7tdlg3x76ejg45amqqxmkshm9n42abkruakld5ryz3sfffsu0wg33gr2uh4fbpcms',
                channelComponent: 'uvp4syg7gzalv1mo16044m492gr6v6dak5nb0qapc7sj4r8r2iaefhx3bmqsmhotllznuv8t4nyyv0ovga46wyklq167ivveil2cbhugwp2z9rwk0o1las2zb2teoo3pt0h7k8zvyclmyy2s8x4260tpf6tc2ca9',
                channelName: '6vuxn66iay4dbtcb1kdfl7htak6ed7rbu0gcb7jxequqmcpn9nxyr4i2tvqegcfki82qiu7u54pwenzydvt2mrcafh46c7k9c3b2h3867i6a4pnsl4k13zny4hxyxno7q9eua8gtcy3khkwlw2wropg2qkq34a5w',
                detail: 'Sunt magni laudantium rem repellat delectus. In odit maxime ipsa doloremque facere ipsam et. Autem ut dolor cumque veritatis ut commodi architecto ut aut. Dolorem aut quidem accusantium facilis itaque ut. Alias reiciendis fuga corporis animi sunt et sint consequatur.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemName must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '70be2f4f-e107-4d87-a690-ea216a732d49',
                tenantId: '04980f44-4120-4652-a44b-a154600b587f',
                tenantCode: '9q16pdkorhjdmrpu69djhztik4chw0rzdd8eyo3rnb0vdk80ie',
                systemId: '3fef75f3-c050-4dca-8e1a-0e318dfd1da3',
                systemName: '88of40x0tv7lym7r90qy',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 10:50:19',
                executionMonitoringStartAt: '2021-05-23 18:21:28',
                executionMonitoringEndAt: '2021-05-23 20:00:16',
                status: 'STOPPED',
                channelHash: 'prx741s4ygbk0b6ajgq3nd8yirxso9xlqswssd2p',
                channelSapId: 'joum8n9tdaonyhocd9l7lsep3nrd8tz96k9yml2n6w6xfchjxi',
                channelParty: 'flwv7l2tap65499sz98fy876mtkyk38xff0zxyh22n2qmfsgmflie23owz08p48mpzh51c9uw1mpsl9wt0vi7s84mtgqsl5lodtq556sz3nr2h9ahmqsj1c2dl5i5oi8fhl8wkk7iolhz7o14wfnf0zk3ac51esz',
                channelComponent: 'dn9nm5ryyi6wx2t78srqbkzs07yl635mna9glgwgay583kxn9dl18scicy9gofvqncnqf4lkrouaf8s4w07ppsuggq1xxq8oxaee18vopebd2cfe83zwhxvcz9flz1l6ls3c1aw5lhi8ot6hdgtl7xgwojje0t2q',
                channelName: '1yiq4bxn9w5jp1gg4gylr94zuul3wo1hg9k6yl3skerwowc8dqkrdh5f1trge8saianic484ej0yqvg83lsxev06nj846j5lx3v5dkupk74ary9aiyo2t8twt1f5zqgpryjprdfbi9fe3qgpyu8pz8qh7y67i934',
                detail: 'Ullam quis beatae harum pariatur corporis rerum rerum consequatur. Ut est minus. Illum placeat unde qui molestias. Cum quia ad velit expedita. Libero tempore in et harum quos.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionType property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '95af5702-c8d1-48d0-896a-a35715ce2580',
                tenantId: '6fdd6b00-a700-4c99-a674-d0536c68d2fe',
                tenantCode: 'k8j6rx8cqxs0dnss6zs9wmrbs5mfyyr293oi2es51cafa3yzpi',
                systemId: 'e173ee56-038b-427e-a259-0cdda4a40ffd',
                systemName: 'rba8ms3mjlqbvt7bim9s',
                executionId: '02b3b318-52ab-4541-80c2-77562d99f140',
                executionExecutedAt: '2021-05-23 18:23:57',
                executionMonitoringStartAt: '2021-05-23 07:19:05',
                executionMonitoringEndAt: '2021-05-23 17:59:40',
                status: 'SUCCESSFUL',
                channelHash: 'r7wrre3bf3op2fmsf6ejlr35mkeptvrom8mz8qb0',
                channelSapId: 'cppriucczu3ht6cj1q37450a39yykpglj6cgns8xxgbornh59t',
                channelParty: '5egs8strz9li3no3icrrpgl732emytcu3672c98yf3m8s3utjy0rkpgj3nznosqvgsoaogjqn9wdxx8af81qy5qbe2mo713kqsnnhlx511lzl0o4b2qieyziksu1fo5xm7sfgbzw0otmb2tg14l7hohwik2itw87',
                channelComponent: 'jwhdxpjqgshg471ygw3dct25pjwn43thmqc7jqxolzxiwnjuwuubz2jkm7kijwp91adps1gyen0mqf6ldesq4j3can7gh7wu3fja4drjl0q3jn8pq7r3x8hroiorw4fmxj748v0th7lx0c6gjxe6ocgov9zv75da',
                channelName: 'k5j1ec15tddad5b6i0laz0xnidid0hean50j8wmlnt9u8cse0j0kro7p2biyhnc9im1rzkukznwv272qs8ku60puzk9pt9xfh64laba8mp05gek8xvn3ebv5nvqmesty1xilpiajvp09y6jpq6d1gx35b3tx269p',
                detail: 'Dolore vero facilis repellendus vitae porro at reprehenderit dicta. Illum alias saepe. Enim dolor sint sunt cum. Odit in quibusdam. Laboriosam id praesentium voluptates.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionType must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionExecutedAt property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '67c4b5e1-6b14-430b-9df9-0a47f949d3f9',
                tenantId: '6973d920-f6db-483f-a8e7-e510143f3719',
                tenantCode: '3qy499n33ewri8xcmvchehntgx1xe9rjytwh9dkc2b3m3lh46o',
                systemId: 'dd020e89-e630-433f-ba6a-ef3ae6c5b73d',
                systemName: 'oqi2jkchht1nj073p0av',
                executionId: 'fe88f2e7-c564-4606-98c2-8292e217e7d5',
                executionType: 'DETAIL',
                executionMonitoringStartAt: '2021-05-23 01:58:52',
                executionMonitoringEndAt: '2021-05-23 04:19:15',
                status: 'UNKNOWN',
                channelHash: '42kk9l86ktlondlhrmank5xxe2ur7x2gxnp0hk5c',
                channelSapId: '1rcg3x31q8b5b42usqgw7bn7l89eeuhrhe6ur6aon1qpbv4zsb',
                channelParty: 'ruz8cqrpa5aova3ruuspscrabqta08afqa9kfgokexgxm4pfxawg7kath4wm2177cqo4g2wqdkn9d8jijfigja08gknq3ultu7wltggezp1xerpg8t1uspbrtpic6u351euv3om6p6887pq4k3zbfa0w9275p4wf',
                channelComponent: 'ge154nn2516qb308mrhd9otuy3rta4y6yw58m5l2m3wgs84l0q6rv7kr7ywjzh33s2k0mlpxe2iifq1fzuw3oxik9a2kyj6ztob4qm91mw4ibtip6ww9o27ck6gitfdi7laqbnrq2irdrwacuxhsjb3wtx2nhncx',
                channelName: 'ntzschfotm4q7vwqrvhvcgdfiq4tik5pdopnahg5nkauy2iok4k99zjr4y73yid7wantoccf4kp2vqj93115othjfdg2xl54yyhuaz05ocnt0zitqyy9vft9pp17bskadste13tpzs445epcn64u68tavcgg1d1o',
                detail: 'Voluptas vitae incidunt. Sit ut rem rerum tempore et aut dolorem sint. Occaecati aut in ducimus doloremque.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionExecutedAt must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringStartAt property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '4eb6b2de-283e-477b-a6a0-f079c677972d',
                tenantId: '21308592-b1bb-4100-b847-f31e6b091403',
                tenantCode: '2da1fbn6n2ivgvgkmwdshahtilgk3xogta5yaivv2epucdzx15',
                systemId: '73982bcb-79ac-4de9-ace9-354d4ee0865b',
                systemName: 'wu6uqrtbchqqr87n2jze',
                executionId: '7be56189-9e9d-445e-ad45-3affbc54982b',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 02:10:04',
                executionMonitoringEndAt: '2021-05-23 22:06:11',
                status: 'SUCCESSFUL',
                channelHash: 'sx78usv0stwuaytn9r5fxhxnabzbkpmnb3rc5n2w',
                channelSapId: 'kyw6o15euyfh0f1blx5055or5j01osjhoejnjl2tgpswpeg6r6',
                channelParty: 'jadut36y6fcrpgln0xqh4at3kvcno922hngewe2znzd2kgz80v8jcsb81jprj5cac1opu45knm7mpb3u2nm4zt8adujhepesjh1v6cl2c8b2u1f8v6fja0x4smse97rwg49mvydujr5mkxv32mu8v5cbmmc3rzhr',
                channelComponent: 'hu8ulna6spkeogtuikuiy3m32tkl1eh8dacwabha3r6bj6649wcdyny07gk311mnf7uyh1er503869zk2lrr223bde2xrc7dnqmcq6p8vy8pra4owsmtn12qmzokolexovfcwzc8m7hgnisdnvxen20ywdpvv3nq',
                channelName: 'uqxrr3zm0mrfscxrbid2yo40hawarn2f4yc5673x5ulc629sfse55udeza9dwr4az70jbodrlq7lrjws237x7b1pi5afqxgzpwgn5e1c95tbwpvkcz8y2altteqjiq0on1kx26wa26gql2lwf0l1whvgxbh68nh6',
                detail: 'Vel aliquid et autem. Cum provident nulla nostrum corporis. Aut ratione tempora consequatur. Cupiditate quae sunt rerum sed perferendis rerum ad. Illum eos sed quod aut.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringEndAt property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'bf43f313-11d6-4a7e-9a52-bcce530ea5c2',
                tenantId: '13e253d4-7904-497c-80e4-049c0ee116af',
                tenantCode: 'qyqij3rgb3fm2jbcjv6f03d1lhut4wsysuzhfcee0ttn3ndnas',
                systemId: 'a45b185b-064b-40df-b6b4-79e6621b6298',
                systemName: 'pg8oveqbpctlypx4i9ga',
                executionId: '9b16bc45-9759-4580-82f1-55476eef01b4',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 10:38:28',
                executionMonitoringStartAt: '2021-05-23 06:06:38',
                status: 'ERROR',
                channelHash: 'z7eaxtr8s8i3o4vccd20gso1173qyf6s98dhap8y',
                channelSapId: 't8v68ht4oc2m9wv76qisn2rjkhuxpm3nrl9k2h6mjofocuj8tu',
                channelParty: 'szu22eqx3pvxile2smyar9zbonrydn41cyql5y0d7qo4j3hs5k2fi017854g05qp0arig00m4b04zrzzmufz847oy81o121m8df8k8okwvwxnbwi1crex874hlc7t9kjzgahb86l6r2prz2xt4k6dp0xm9z7mmct',
                channelComponent: 'm5d7hn1a5lm6wtldtooptxo2g5mhabryipbshndy5d5hsoq4p9a00bua1ell07p3bblta30hivlq3lbqfkcemxfa0gpg75ysooxmypnwokhp4fn1fmexqg6dd20l2fm2uaiimzxyf7z4gn45y1gqoyt3nirmksln',
                channelName: 'sti2ijhniflyiylapydmgsnxpxgftblovnczx2yn4bv4p0yzdofs8qlrwlfientt0a95ba0irhpb2gn1npy4r5plu3hp6x2ee9al0yj72f7gawyoow5upesed8ikj757t7lx5sbpo2re0hhoi36en54q0say5m6k',
                detail: 'Alias magni minus sit voluptatem et est expedita ut. Fugit ut error. Est aut dolores quasi natus.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailStatus property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '71f5c1d7-273b-4e5e-bb42-2c4858f63d36',
                tenantId: '1f11530a-c0e0-427f-8afb-f4ad087fc91d',
                tenantCode: 'uv7dp5lhqng12pq3d34pciwfd1lm1cbrwfqp0idyi2u1nj6ew2',
                systemId: '4159e937-20eb-42ed-a9fe-bf80cfbc2f0d',
                systemName: '48uxo7ohmiq28vjv9z75',
                executionId: '51e245fc-6535-4fbb-aac3-46ba60d60f2b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 15:11:38',
                executionMonitoringStartAt: '2021-05-23 09:00:24',
                executionMonitoringEndAt: '2021-05-23 10:14:40',
                channelHash: 'koe86bu730sgz1kez9f8m2hybmwhayrail2q68ml',
                channelSapId: 'mch9qaie8zjhh8ox5fvdpmuk8y6fd2wxy6497wudauq0lrzk1t',
                channelParty: 'lubkhm4rhyvy6c32drsj7xb37kuw2fv3atycm7npohdeldd80al1aqmszh7it57zhjya430zm4fdmszhxvzcqsljtvhxvz49ghm2akv1y1ysmidz6s3bkjtx2czfeiurufvox0tejo5o15kkqr9whnca439i599r',
                channelComponent: 'go81bajysv1x9nggompx6gl6gywmp6vh4c0o1lkw2tcz5b68fzh4o39ww0qr22vyardyrk0o0btq3scth70ivbh7nn0uygad8erqe1b8p6i0th837fpudec326mtul78eiwxl97zv0p4ad3b8g9uysmnh9gih0p4',
                channelName: 'hmpse12q86p8v1lk2lm33qvqv6pz746id15fewagsacs9yi0pqqn0ev7kd6iopuxi9hcqhou9pncbyh5o3092dpbh3m53b6tacd2k6b3xgtes75u1vdc4apr81wb3l8nz9qx3vx7bkto9xmvgl5ptcxptv3yad5k',
                detail: 'Minima dolores iste amet ab pariatur consequatur autem labore possimus. Magni perspiciatis distinctio vero numquam et quasi. Iusto et officiis tempore corrupti rerum eligendi aliquam. Aut nobis culpa dolor unde. Vero explicabo aut omnis necessitatibus.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailStatus must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelHash property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '988d94f8-9565-4a3d-b5cc-194ad13ed37b',
                tenantId: 'fcbb9500-7676-4ace-9bff-3dc3e829deee',
                tenantCode: 's5ja9glnadeirknhlc3vauzvosyiyhyjpgft1tpye2txrqbnvb',
                systemId: 'a203ee67-da30-48b5-84d0-1fef0fb4476d',
                systemName: 'v52jz4hlau8o48z2ra9p',
                executionId: 'b488412f-329e-4af3-ae84-03c25ccb054e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 07:01:47',
                executionMonitoringStartAt: '2021-05-23 19:35:01',
                executionMonitoringEndAt: '2021-05-23 03:35:08',
                status: 'UNREGISTERED',
                channelSapId: 'paxtsxeax9we1uvbe7d603s6oirgqkzxl0qe92y1uow9v7tybx',
                channelParty: 'l5dh36fv8ikktpw9mja6af5dpkvsgngfirfb8tq8c5s8hcagd02179qogrmvy2oqlz3dr9lvwyjbbq93ur32d5mffmg6oz8b417gqvqivdam0r1sqbmjr3ramlef46rdi9nfhabmkn27s2le3o7sq30m0w0m66qf',
                channelComponent: 'bbuzzgrolaqstdlekx3ielx5x7zuh2aqga6pf44n0dvoafw87d6oxarvze6dtqy2553gk23odliwm68rb8ghx2ztwjj8xwo3l8pid72mniv4l2g9nj7h806k7unws4so40ygz15ecx3nb2vw4ywnlznje768a1xy',
                channelName: 'z22ihxg6sjx521swuef8jmuipt9mfd922b3yy2v7gh4zqxkwke97a777qnqvpypyunlrjuss26vz3ekxw0je2l2l1on1mxl5b17cc6avfc0wpda30cew8rdc5bxlvcyeppz2esmysegfnemeef1jw80jp6tsmlpz',
                detail: 'Aut et doloremque possimus voluptatibus. Et voluptates harum porro distinctio quia ducimus sint. Enim est sunt non harum dolorem facere non.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelHash must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelSapId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'd4f1b365-fd06-414b-af84-7cc514b7e7fe',
                tenantId: '0c8ed848-5bda-4e7a-94c6-0cdc64f8a02a',
                tenantCode: '6k81vd5n6p2mma0wyook9wrkt2qsil7ukfzliwvpa5ueda8mfd',
                systemId: '7011a4ca-aba0-4715-b38f-01c58611b092',
                systemName: 'wmlswrh6vop94bpp10nq',
                executionId: '349e058e-3456-4fb5-8502-105b280725d2',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 16:32:05',
                executionMonitoringStartAt: '2021-05-23 23:57:34',
                executionMonitoringEndAt: '2021-05-23 05:59:19',
                status: 'STOPPED',
                channelHash: 'hmlp9c12817do4hzohk2e3ylt4lfqk07vl27whl8',
                channelParty: 'aw75wf73iykso1fpxjgeesmukvck22yug7pnkl67y6rm5k2fkjcfqkl3bb4s7eslb8bm8wmmd1t9jkx7mj50k6whk1peysbgawkv7x0m0euzzi7acgzfbtuq6bb23u3sy690dvp1tqdkn4yl22z6b1widzn7c9xw',
                channelComponent: '2ph4z0uz3s9yczn48phdq2ibyy39raxwm45e9ftcjauw4n9yi0a9zkn56rjb6d4l6zj6219kv3hw5ysdf7e6q0kmpea3i8mrun5xtdta80k8z7adx3g9k1hklhgiugl21gsfyeziy4xxtu68081ch2zr0xnjlhnk',
                channelName: '7impix5nxm1csgrb11dqtrij7ygf7gocqytjo4tb3nec3r5uivs4y3axh7615nhsdgmmbjqwil182q82y7jy6cg8rkkcbq36pqazrwk7f5e5we9v9gg84hf9zw9i5o0eb76eqxm6bp3ecrda58fzvy1pde9dtnsr',
                detail: 'Fuga non deserunt molestiae quis vel molestiae eos consequatur. Deserunt reiciendis culpa unde soluta quasi nobis. Rem in maxime rem et veritatis ullam molestias. Ratione rerum non molestiae corporis quisquam quibusdam expedita.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelSapId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelComponent property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fbb14619-f4d5-472a-8cb9-0d25ef85558a',
                tenantId: '80a7d12e-6835-4eac-be0b-71d885c11c4b',
                tenantCode: 'rcharfnilrrartkyzb0ru4phbdy410i7hf0sre1m1no91dlk2q',
                systemId: '7aefad07-6f8f-4470-ab39-4b9c2aaf0e5c',
                systemName: 'nf8684q17k3vbk99tctc',
                executionId: '19ba9964-9402-4baa-98e7-2701594fa0ab',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 10:27:40',
                executionMonitoringStartAt: '2021-05-24 00:02:26',
                executionMonitoringEndAt: '2021-05-23 21:18:27',
                status: 'UNREGISTERED',
                channelHash: '2qol487spfz8v6rkdx3f17le0nnm1g9oz4w12tzg',
                channelSapId: 'jbxlcl3f61s4mhog0g232rar2zsm6fqklnsoi3cruxmh3h39ze',
                channelParty: 'g57pe50vsvl8kgf4ed26fd3dbvrgazhz75i7g71p3dz8efsjwtsl5cgbuv4g7pkybk3jxdxogni683fs7fdc0tn947o5o5lzdvi6fravbmoxta3vpz82onv2d8ozcuhquul3c0i1q8af66ttezplnvye7xzm25lc',
                channelName: '6pyv1f30ttwap6xvm1kdlchvnlupv42g96mbl5jwvuduj6a83gnlpn1icoaforlaib3cmq3hl4h1gblmg1ne702rgz47080tgy4z180qzmlt9qsgptq6m5ajatq7a3qd2l0x4dgbydxwy1eufyri4zjbvg9smk7g',
                detail: 'Dolore distinctio molestias sit. Nam mollitia cupiditate maiores repellat dolorum maxime deserunt. Aut fugiat quos expedita laborum ut corrupti nihil dolor. Cum et accusamus dolore dolores et. Quis sit magni ullam accusamus omnis.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelComponent must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelName property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '9f18f974-daf0-4b1f-b7a6-0cf556b30186',
                tenantId: 'b43640ff-75c4-4627-9f80-ed50c8dcb692',
                tenantCode: 'v98250vx4vh86sgojdmei5oi5l5o3m526auv5bb3udhoyqb13w',
                systemId: '9026c720-b6c8-4457-bd3c-9196f176f3dd',
                systemName: 'ketmutap93rph9a96ys7',
                executionId: '71021a0d-89f8-4cab-afeb-804a4bdbb721',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 16:59:40',
                executionMonitoringStartAt: '2021-05-24 00:24:15',
                executionMonitoringEndAt: '2021-05-23 16:43:33',
                status: 'UNREGISTERED',
                channelHash: '6214hnwyj21z7z7j6ewc7e0mrrenfm5a322qq5nx',
                channelSapId: 'g9r5jnbyd8097kslpj92bymfy098gknniqrieaf9aqhd5deuiw',
                channelParty: 'o0jqr4eq05ntx1arzrdqe8hz6jfpw5scxyfbcupnce9t8viz1dirz2m6l0p5315eteiw7g6687lsxyxati5t7h452ajc7s70cq7vswtnz07v6s20qhry631iclpi528ec9bvxse4vj2l3ofygc1swsrbku95birl',
                channelComponent: 'dvfogobgimgcokxi6v7mjyo9g57y743vvxua7stvl22hwwic6ijipaalscooijs8ipv2v89wb4baebfthl57j87rd0wgx047qnfh53kcuvz3p7657fmucv1bnwdiychq8ffh2zxswji27s1h2y8gxyklwk5eug3t',
                detail: 'Magnam eos exercitationem impedit numquam doloribus esse officia laudantium tenetur. Quia dolor cumque unde. Minus sapiente et iusto eos. Ad molestiae velit atque velit et. Quo quis aut nisi. Amet ex voluptas ut veniam quas rem ab in totam.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelName must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fbdpzpk01vsvqey8qf8af8bajyf2rkae0mrew',
                tenantId: 'e9a66d3d-91d5-473e-826c-55c6b820fde4',
                tenantCode: '3sv89e7jeo80jool1rn389a70m4b71j7pm8hlf3hzee2z5nyhf',
                systemId: '8998008a-e898-4547-9a0a-18d289eeb621',
                systemName: 'fpvr9o6ts0yttetbgk4p',
                executionId: '3d37020d-b61f-4a02-a72c-7d6722841295',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 20:09:31',
                executionMonitoringStartAt: '2021-05-24 00:04:46',
                executionMonitoringEndAt: '2021-05-23 17:13:52',
                status: 'STOPPED',
                channelHash: 'a4bvydhdkiayei2a692v4ax4h6wc56uynb9w1w0u',
                channelSapId: 'jcxl70pfvnkzwrdpc99zr7xnfkmyguz9gqnpwe6gm4ex6ucdia',
                channelParty: 'vya6gf6f1wpx042d1n45yfpy0rg0o8mgpbeb9i1jr5qdrf2kbhwxg5cmzkwsc78peu7o7g83r2hxork8ht49un39vgn4jertc6ft7rernacibx4dd26zbhqdvq2om8wkaivad72x321ybwopdc325ahmztkjvkbv',
                channelComponent: 'bo4qv35z4288jo0iacrb5z3irlzxmc8fp33u1b3fa7fjl7a64k8s1jzvtibuouwbziiuyp5qm06duvj3lqucl1lltu3d5efwm8a755ht6khe35if3rcbjae3x2fwxr4r0435qelzuer1myj3z1e1yqrl5tjb2to9',
                channelName: 'l08e12rfqp3k1nn6ss1ltpqm6y7y99un1rg0xce7ifxhy7b8mp5z4scw1wi3244dwcmatbd8t8vqtzoz3m63ua1hi08xj9c2ni85v8weciphxpor1s957mpeevlu58qd95pnak1xzcg5gwk5awgstpohnnfedctb',
                detail: 'Voluptatem est eos. Aut earum quis aut et consequuntur dignissimos quae. Aliquid officia nobis a excepturi non quidem. Sequi doloribus vel qui neque. Aut consequuntur minima ipsa quis sit voluptatibus explicabo.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailTenantId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7bbddea0-d653-4758-b91f-09c511898db4',
                tenantId: 'cdidmbhp7vw5l6tgrw30ulkkrbaczw59grf7u',
                tenantCode: '400qr7i2l3tvmj9a2q5u5m5sc6gebfugbg0o8v3txnqc7a2xrr',
                systemId: '87451da9-e063-4ba4-81eb-8000b8a9b732',
                systemName: 'wmm49ig0pb5iqh4axjxu',
                executionId: '6b05c073-3fac-463a-9e26-a5fb95965c29',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 05:29:27',
                executionMonitoringStartAt: '2021-05-23 01:39:37',
                executionMonitoringEndAt: '2021-05-23 15:38:25',
                status: 'STOPPED',
                channelHash: '4m0ty06dmwbt1qfrwz7g01hs51y70qhsa1garkmu',
                channelSapId: '6sin2zyzzhvdwjyge0h2ljxkvq4mszd6nuxdhn4uosbxq2y80z',
                channelParty: '9pnef30bf4ce0gnhoykayr4os93tje3f30riz5yayhilv08wz6dnfp6c6o6ojvrucxlswg1gigkfhs8mgu3zb3rcyjy76i239i4h4ephioveyoci16llqs2nj4nkf6whcb71gscxc4q4s2rbcl8h1tgt12g3v1qc',
                channelComponent: 'cr2lgrqwphsi6crc0ux2xyes7hhz54lun7r7feng28u2tkqq1z2bwtda6awtyjwxf2w6pakrxek4j599ignb6km5h7g11a2zkimvp5bgzoifj65935g0a3ycwhd30psaf8mrk6bfwuwb8619hwsk4y4yzuwiznj9',
                channelName: '698btmr9r33octbqxkpczhk2lwbek61pe81ja4r7jiszq0knz3qs8dnyfqwpnn4ruzol2o9nriqg5wwmc8v2mlsdqr89cv5v001r3wffc8sgt6k4r1362wa9upvzi5ek1hql3qtnxrx4kgtr7rffu718t7lcj8i4',
                detail: 'Quia et dolorem quia perferendis dolores rerum. Voluptatum alias et eum non et ut delectus quia ducimus. Corrupti ut quod sunt minus dignissimos rerum doloremque rem. Et numquam autem vero quae cum quo alias. Voluptate quisquam veritatis. Et vel qui iusto veniam reprehenderit sit.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailSystemId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '35a28e7f-6ddd-4b92-b17b-0398232b80f7',
                tenantId: '1187994c-a658-48e9-bc5e-03c36e57c688',
                tenantCode: '9n61kf1or0vica3wa98qnko5r6db5lg4le24agtvdbtl2s0cqx',
                systemId: 'bnpenvkk948shuwd4wnzcnvut4p60c6dgjmtt',
                systemName: '12zal43b8jjam30iumy4',
                executionId: '341b93ef-6f64-4e80-94ac-5f6cb0cf2758',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 18:50:07',
                executionMonitoringStartAt: '2021-05-23 21:50:35',
                executionMonitoringEndAt: '2021-05-23 08:49:52',
                status: 'STOPPED',
                channelHash: 'zmiksb6uk60ucu1f5w5mm7e64hckgri1fj8qbtpx',
                channelSapId: 'bsjim9mx83i2p8kc9nxnf14qp6l8vqc9zwi6euyk0lucvs9hnz',
                channelParty: 'fan4jzxstbnubec57e8n81837rbv1nilhiec1kcc83fm9jsv15fkehik6ua52cq0xf9mj6w30u4p714athxcd7q180slkjnwuojgd0gznc903zrzlcnp4537a6eywid2j7cyg8wy627k0v5pdn9xuaq4i47j7rdg',
                channelComponent: 'uy75elev0fn4az0oxyi64tbu2m6gwhrli6zmosvm6phpa3n079hmlf0apz0vfiohkcdfrwyw522mc707xckb78628gqqra8t1dd793zcs22r3d6sqwbirofah8roajrk0jre92ym3zavgvyk6ziswfnyau1njcjh',
                channelName: 'tk38direojcdlp3qbng4zuxdr5nyytchrgsa1tnmmryfdqm5gb6kwsxmlm2bce8tduuyvu6blw5u3woqwuoe6b0vzj6um1p8cg6o4nzi15r7hhtjvs79l3ppmg9dg1wmmyvar1edc0opo5gmdobaa9m1nlyzp11k',
                detail: 'Incidunt molestiae laboriosam sint veniam facere velit quisquam ab. Perferendis sit culpa. Et eum molestias rerum necessitatibus consequatur reiciendis reiciendis.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '313932b3-c6df-468e-919f-45997382dad6',
                tenantId: 'ca278856-c3f0-4df0-9cc5-a32f34cb93f8',
                tenantCode: 'oqx9cxeyx8jftucexs89b33u1bzvfbjv92fsiiqamcj2dco6fo',
                systemId: '1d116d72-c5c6-4b47-984b-6bf8227b5e49',
                systemName: 'qtj4jodznyhqzagpsnj7',
                executionId: 'gpti7mrl5lnqqgxcjrvok5u38wd16rx2ztt22',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 03:45:53',
                executionMonitoringStartAt: '2021-05-23 14:39:50',
                executionMonitoringEndAt: '2021-05-23 03:50:28',
                status: 'ERROR',
                channelHash: 'muaxi6fotzk5gpow73ue8jumlio2c0scy0j343i5',
                channelSapId: 'p447udtjueud29dd31jbsm0relcxjky1f0463aqkm3dgher5kt',
                channelParty: 'zxi3pio9twnztc8rp3mv4m9n3j5innltembak93f2pblmph2pxlgofjjy2wtp11xsp75njmjb9nbshr3pqhhkbpn4k1ypu5czi72gdsnbom8dcm5m5ta032274zxzf62tqppoctmx0jn4on0yl06j2d1oue1pmal',
                channelComponent: 'kgsylqic95p63uht3tuc7aqv80a7gixkkzkhbmk409p9i37zog2yl6v3vj40hwjz1478cmhufzht5cjf6xnzkh2ivviblwtoms2kj3qin5b5nwhzqy62vvonx0ne4an8zt1bho91oytp9hst33g2ouw0t9a2ldam',
                channelName: 'x78373bzts1pcxm2toyfbxj0ulw48e1tqjvl3imiu01b814oo3vfqgp5ydm051g7ufkxp958se8c5ek0clhu012g94s5vn4mth7ofujddnyurrs9xskaqii6xlailr127jyozln3bp7j4nkopb7ppgpdv87hic9q',
                detail: 'Dicta ut tempora laudantium hic fuga nesciunt repellendus cupiditate. Voluptatem suscipit modi aut ut rem necessitatibus. Doloribus voluptates et voluptas numquam officia eos qui quia.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelHash is not allowed, must be a length of 40`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '44368a9a-dc9f-45ab-8728-20d72010a0ad',
                tenantId: '105a2d8b-1f01-4c12-8a6d-53d0e72aef68',
                tenantCode: 'ctm4os4wzprczyzg0obeop41h1btxfj6bh4zl7tlx7g63g1t7h',
                systemId: '07de5305-f010-4785-92a4-3e8ac1439630',
                systemName: 'gbpadzapyhg2box6qwhz',
                executionId: '8554ee3e-1133-450e-9a84-59926bf1877b',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 01:57:17',
                executionMonitoringStartAt: '2021-05-23 13:08:18',
                executionMonitoringEndAt: '2021-05-23 15:43:06',
                status: 'INACTIVE',
                channelHash: 'zdxchefddjs5n4q4rcec3dmtc0jtvy8rxbekmn2an',
                channelSapId: 'jlnzyh518q0s5hxmg7uuw0rez3vil51dyfh743184bbfabti5u',
                channelParty: '7k4owlo79n7em88r9v7pdmpgnvsrwhxcu27bbo5pejhnsevl8hndqcmgw5bhoiqbp5kbymntm5no06ap0z32ztnsketwlb5v2lhb0jl2bqydaq3y2k3eeonhme9d7ouejdw3ggslj12ia54x5rn7p9u2z1edhncp',
                channelComponent: 'zkbb4v8l117x0f4qxkyeyb5y1eqea6o2yutun5hsywbrwwowyi55mfbcg1pdd6r0qgvly5oc1cizeekliud03rxx68exszvn51qkw8gz8hq8xxvvpssemcwib1fd6u7bp10ithh2dcbckjgcl13znjfnmtcjkzsh',
                channelName: 'twcq2ob7ek7z2ayvhj6ehpl8zauuj8krqhvzaiphc9s588pi1vnl1uykn65vgeg9if2ey3t0h12rfcheqqmvddhnaiobz6zi47c1wmla69rx2d7ktm7uy3doaollyc36oiqwy95iv7oplavddxglmj8a9w5v3kzx',
                detail: 'In molestias non recusandae est aut et. Repellendus tenetur aut qui temporibus delectus ut veritatis at. Voluptates debitis qui nihil eum voluptas. Officiis veritatis et qui. In distinctio expedita quia quia earum. Labore ratione ut quae in corrupti impedit.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelHash is not allowed, must be a length of 40');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailTenantCode is too large, has a maximum length of 50`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'c7078e9d-b4c6-4ec2-ad09-5647f8d37133',
                tenantId: '9c333ba0-c2a4-4075-a23d-a27c2ea66508',
                tenantCode: 'eh5qf5mngyqyszj5ywgzplybq2pa8mp22b5v3gpn44o7g3ldi6p',
                systemId: '10a31966-04b5-486d-9fbf-960c9b7d38d3',
                systemName: 'ccn5bxcej27ax485jlj0',
                executionId: 'b7299156-b595-415d-8710-1a88767d8398',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 04:27:40',
                executionMonitoringStartAt: '2021-05-23 15:08:14',
                executionMonitoringEndAt: '2021-05-23 15:59:40',
                status: 'UNREGISTERED',
                channelHash: 'cv19he8e2904kipiq61kcu3d2dsbio762krygt2t',
                channelSapId: 'fviukvowy8qpvzflrenhw8f0hlytp76r56kv3vgvd62cxcazf2',
                channelParty: 'szkv86039uwopzbzyybsnzaznlpf2m2044k9dslrpsgyxr88j7lwoze90ykca3e0a0i57vso0vkpv7pyy9mgdu5lzeto86cnvebo3cvzyo3wmem6wkq41d1k5f18dmn45zvv4zx679vjg8s6v7150rugzp097ee3',
                channelComponent: 'h8rkajxhj4de2xevtn3r6ko5kxdjc6txa65p8we3y1j1rtkdvpmgoc6p8m9yj9ddz5ju3nai1y857vqolv354lvhf9s8z3ohr0s2ytuezyozmp9rqhgi4pshhq1dowrcu8rp7d2x0oa4rz86c4ec6pu4ee23b74p',
                channelName: 'qjgyltxudjxzsmblmcwnsgf9e44hnkffccvmkabktba87ejzx3jswjdbgajnols96q76vohm0frx0s0qr4l7tfwvr7am0uzdixpyig3m4gz5u5ena0yz46fwbpz710byd9l7s362itmbviyvwwgjcazsi13rv3mw',
                detail: 'Ex qui mollitia beatae enim. Aliquid harum atque rerum et sed saepe neque. Sint eum voluptas expedita et est. Voluptatem sapiente iure est. Error quia et illo voluptatibus vel.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantCode is too large, has a maximum length of 50');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailSystemName is too large, has a maximum length of 20`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e378d7d6-7a3b-4b0d-baee-c29778300072',
                tenantId: 'eff7a893-79bb-49ee-b024-a8aaa998ca24',
                tenantCode: '98jl47feofylax2y4emf2nyognq1clojdupt3nhvgu2rdrrihx',
                systemId: '5876ca5c-a2a2-45b7-875d-8d013cf646f1',
                systemName: 'nlah8jst6i0fzbeh494cc',
                executionId: '4dc4cfd4-48cb-4a74-afb7-835cbe71ce41',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 08:44:09',
                executionMonitoringStartAt: '2021-05-23 17:45:04',
                executionMonitoringEndAt: '2021-05-23 14:54:54',
                status: 'ERROR',
                channelHash: '52tin8mc1c3km9joxb1jty5nn4xrw3xw6ze9sbhq',
                channelSapId: 'f966qhludzm0vd2tlfphe2yfdbgc8e7kl1pcxi8e19fypap0ip',
                channelParty: 'ksc18a4x1t53za75bu2o3iv20js4hs2yb2jm3rfkznjtscchzgsiff8vtus0yafqihyfkqpa6lj1o5ifkhyoqbv1g9ut7fvbk8kav1b8rldj2r4i86kkvmjuugqex6pn2d7ohoiz49is0wf3jcdq13e6jbvqba8f',
                channelComponent: 'lp2ezeuzitgv1hq6av3iiu311ggejg0hwo4aaq4vg9f2vc5400hrwwxcwcdryxa42tfe519019kyoxjcurcyfch5qngl82r86fnppc3xshmp5d5y5jefe68v3gbd6o2xphoxh64albtldu4431meywpenbmht6e0',
                channelName: 'vne65nnh2tizrrw1818khe4ovbbclqqmjn1hbgashjftnee7yc0cd205qiaaj7tw3x3mko3wuz1tjzotginz7kdztiifkk4wnkydoqy1z7ur867gyua5vre4kilwdgmkbrve97ttf60dr12tociw8imtkp15xh10',
                detail: 'Impedit aut eaque. Cupiditate cum eos culpa et voluptatem asperiores. Est dolorem porro voluptatem ad quam. Qui fugit voluptate. Omnis maxime id est vel nobis et quaerat et aperiam. Atque magni deserunt distinctio ex quia quae pariatur.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemName is too large, has a maximum length of 20');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelSapId is too large, has a maximum length of 50`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5ddd05a7-0c40-451f-a83f-0cc15a31a90b',
                tenantId: '84bb19c7-a59c-4146-9614-441fd896cbe4',
                tenantCode: 'jesx7p6ycrt86gjq3o9bucj5p8um2z4fb795zgusqkqb0r1cgc',
                systemId: '32ecde98-f2ce-43c1-8c1e-b5af90fcf528',
                systemName: 'ph0mzgpqmebe0jgz3dwh',
                executionId: '47971aa0-2cf9-473d-bd21-5036afeca5cc',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 10:40:44',
                executionMonitoringStartAt: '2021-05-23 10:05:38',
                executionMonitoringEndAt: '2021-05-23 13:33:38',
                status: 'SUCCESSFUL',
                channelHash: 'lwkoyghmbj036m9u4a9d753lt03qeutge0zcd6qb',
                channelSapId: 'cwer2d2huuxieldaesxygnnykwjkz85qdmqrqpndq7zjdlkd8l9',
                channelParty: 'in7cr6v8qngusx1lntonydoiv1rzk9msugnvc8qbgz8ed3ljzzb2kbbsnkjvtqwvxy2o5la0h96hm995ym89egx16v3vmhptdc0pliwmcix2n2ydq49euwxgdoeun3skc82q6fgqkz75wd9wwyzte6vzs0jj4us0',
                channelComponent: 'f3xq5i0nkcwcd7bwe318r489wfgkrteebadz7f3caroog488k004vzr4jkb3if68od07b6d1aoyj4lfgtsse4c8xof4ouvr42dnik8xpef0rhutm56bgj63vt1kj625ywtsgcj9p0s7156yfy76k81sihth0h2es',
                channelName: 'vcslpcizhc5s2jt38i8eo420pk3h9sffz7hqhve6mwn5jo4nbkdjrdony5fvurs0cj49g6wohiwkg95ncnie2k1ffle59v7o2ec6u5nsovgz5qfdcl1ypru7001yslg9zvh3vq3czmlh3d4djtn12dofhg9y7l0h',
                detail: 'Enim ipsum nisi labore velit eum sunt ratione amet. Omnis qui sint ut ut. Qui consequatur in. Cupiditate voluptatem nihil maiores sint iste voluptatem veniam.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelSapId is too large, has a maximum length of 50');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelParty is too large, has a maximum length of 160`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e20354a1-8ace-4f62-ab90-d1f406d15185',
                tenantId: '65d8332b-e90a-4231-a011-f2c9ed7a5da8',
                tenantCode: '48xui72hm7l46mdfu8rjmmwdilgy7zvj2ei9e1nqizn1govin5',
                systemId: '02dadca5-6c38-4b63-8b64-b6d90dba736c',
                systemName: '7k1acw6rl01asn7ygees',
                executionId: '75bb85f1-d2da-440e-8d5b-a3cc1e8c8aab',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 02:55:32',
                executionMonitoringStartAt: '2021-05-23 18:02:43',
                executionMonitoringEndAt: '2021-05-23 16:20:04',
                status: 'UNREGISTERED',
                channelHash: '2a5vjziqj3442hfjznsnbl7qy4055x860fvk98sc',
                channelSapId: 'hovw8kedk053vkrxxg2wxdi77tgb75cpz7zi80gryzqay48zcm',
                channelParty: 'ua2480akq7obp07e9sptn8uvxu8qlkug127bpcowm70z749f87n5a1abr6ppjlxv7jw3n7ohiututah1y280r99txv41v4hiujw821buiusu673n6ezqfw3aecab46gl0bl9u35pzjy6v6y9zeg630ubjro5bwvaj',
                channelComponent: 'uau9f8x5y448tapai1hvn7jpqe86s70mgovraish73b70mrte66x7scb0wovy58teguv8goag1qcz310ruuo7zpp5rqbgffgsoxzeg4yx5ewahvdhz4g4yofnz4f0z0xlvdjb6cmhmlal4plwz648am5ngalt8ok',
                channelName: '8jpgoskh6f2vuheerq9rdaw5jq26ampnr6x06lffk8my0vn5gktso7sg7nchrulbxh0l4fq7jnropt1w9il0p31ie6fsolaqk89byygvl26e1shgbvi8vtm9d8a0hnaesmpljq8ac485a0250pqypy9g1848t4om',
                detail: 'Nostrum et doloremque cum provident officiis. Minima accusantium eos. Harum minus dolorem.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelParty is too large, has a maximum length of 160');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelComponent is too large, has a maximum length of 160`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '3d0ab8eb-16c5-4d68-a66f-b8a8121e4463',
                tenantId: 'd876f449-fc8c-4ed6-a436-c8805f61415b',
                tenantCode: 'xiwlto23jhqdfpyy7nfaooq5ls40tknhd2aq1hkyuufxm3ii6h',
                systemId: 'dc6735e1-ef8c-4ffa-8507-27fbd31fd768',
                systemName: 'z1b9k1nhp7q10xfjfn0v',
                executionId: 'd631bfab-366b-475d-be55-f0162dc6f1b6',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 13:11:58',
                executionMonitoringStartAt: '2021-05-23 16:32:03',
                executionMonitoringEndAt: '2021-05-23 01:24:32',
                status: 'UNKNOWN',
                channelHash: 'utrsv8g9lzm2zf28fd9wixxno7h29ekweq6a3i8v',
                channelSapId: '3cxx2lpfic5il6x2eksnski4jfkqqexl6yuaee0delqigg6gsu',
                channelParty: 'fud9l1qndvh5jow57sxcw2cr7auvai6k9pg2bzmahss1nqn07ol0pv0c0ujtdqx60onua6fths2ok7yzrcpu4jzv222q0be4swho7lex9a9urorrs71fkvr1uycwb6z0y0zs7rql6vqxpoolhzexxv9i1pdqkbhk',
                channelComponent: 'rdths2pzjfb125l5yclx1gus7111z912znuv95jz2trucc3hg1pppg3lge6sve0ii08uzv0t7frpq6x5impjx3caoja0i14a7beyv2jdad27aax2l46xpd4c18k2s895tojoel3km1run1boshq514ols51hqdtyg',
                channelName: 'jbs18b1oatva558dvnunb775jtygb8jevn0xeswxd7h22b6x5y9vd0vrhgn6g0gn1zykri3jmcwy25c2kku7mjv30id9eb35eyil3lbxz974q66ga2f1dc087mreokih50nrtpaplrkn0bw2kanlgpr9yh4payh8',
                detail: 'Modi tenetur eum saepe possimus et et. Eaque in aut ut. Qui quia enim adipisci sed sed.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelComponent is too large, has a maximum length of 160');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelName is too large, has a maximum length of 160`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '9e8bd3e0-553f-4e0b-873d-785ed5bcc55e',
                tenantId: '1dbc4957-00cc-48d6-bed3-ffb70453f875',
                tenantCode: 'q8jyqu6a2ounknsw7ugair89cf4xdhajd1jh7a9vhcvqohx4gf',
                systemId: '6ded9a77-f715-4355-b23a-bea45124af3e',
                systemName: 'hacvamuquctkzd5ypzuf',
                executionId: '00a17869-0df9-48e5-b33e-dc80f1178b73',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 04:10:56',
                executionMonitoringStartAt: '2021-05-23 04:10:26',
                executionMonitoringEndAt: '2021-05-23 14:27:36',
                status: 'INACTIVE',
                channelHash: 'xcrmsyt6521rdmu3bsltqnu9vrpniw0onvq9xo0a',
                channelSapId: 'sxwjdr42cpraqad84r6jgvgp53hn56rawpjkt3pzx3i8r9210e',
                channelParty: '0taeyv9g8t6etdp0ii2j4simn41hzutd5ptpegaimy0mfzhazlbwwwse0qlnejnkwcef7g1ynf28u4mgvv1b0owjpeuwrlf6ricaclrpp55yo6bcbgns4mb0qpy3bp44xa9c09v53fhs0wtrcwgnnhyz8v9132im',
                channelComponent: 'sjc45cbel4w2bq5k93d1jedftlnzuthl6legjac4kel3krxs05fkghpi6726aqyxv7w6ibmf0wfvlz137y5mbstkoat14jjvrpde6q73iw48jlt1lbuxpmjk6gx509dnh5ld58xj2rzphc4xte8vvbhwcl65i4pu',
                channelName: 'ke85wok1cjnxcknx9gc9g71e63k4owfdnb76dzz1xxs4dxx8zt1indrszc5k49usbt2pwsuczsz84m8ffpkdtjedfrv9ds79p076cg55mo0t9i9sxjr82xg6gx9hvzp1qfnvo492qec3sb0h56f88muot4d3op0t6',
                detail: 'Veniam velit fugiat sint nobis iure. Velit eveniet dignissimos asperiores. Asperiores iure doloribus consequatur. Praesentium accusamus dolorum ut veritatis inventore neque officiis magnam. Molestiae ea quaerat minima doloremque voluptatibus possimus asperiores. Qui eius porro.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelName is too large, has a maximum length of 160');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionType has to be a enum option of SUMMARY, DETAIL`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '3fb8ce73-4ba0-4309-8818-ac8a178eeaf9',
                tenantId: '04219a9b-c854-40ea-971b-a49cde914191',
                tenantCode: '6y9afmtor4nvqclv8s5lclebc4fu2y9831kuchlxyufx26nr8s',
                systemId: 'a3d6fde2-2c5d-4074-84e8-4bc0efa372fe',
                systemName: 'rg97uhpr41k6t3c4foqe',
                executionId: 'beff5adc-d7d7-446f-9481-24db6b0d31f8',
                executionType: 'XXXX',
                executionExecutedAt: '2021-05-23 07:06:40',
                executionMonitoringStartAt: '2021-05-23 14:50:15',
                executionMonitoringEndAt: '2021-05-23 09:06:19',
                status: 'STOPPED',
                channelHash: 'fisglygmmt8ikcxfd5iq20e1ldlmr15m93xepgy8',
                channelSapId: 'i0b49ew7a07l4h27s0q5gmurmmfglqb885o7f4hnaeq73yc77u',
                channelParty: 's5feffcxl2s5nykzyw5fzsrjgvesbeq3wkr23cvtspoluerdg54v6obyhq3gorhkg2x6u1h6ninbdx63gzns36ssrrtag31vvfl43xg7nqxip84yb111q68co9ewynkyr8ng1i6nx7nnc6aiszic6mzsnscgnvox',
                channelComponent: 'hyl0hy2pno8n8u8vbh7bwpxmgpv11bgqz4qlfabyrr3n0vs2q9ghbha01yhnuxw6d42p2xunly4swt4drgn9csk6d9vxol0iivx8ha3nfgjt5vgy6v34bmtj4573wrvzd52cvq6y5r7h4yocxn092vep2895oq71',
                channelName: '77c33xsb8nj86qot7dmx3sksyz2x19thbdcrvrqyhwlamn8ni2szwjtbla0c800r6otj14sg0xgjbafratzoefsk5ext8ncr05lpsibtqg2apt2x4uxuufjo88h0e2denk4s8brgqn1ao9vi3d8ecfj4r610hfnj',
                detail: 'Sit consectetur in quis dolorem fugit corrupti quasi corporis. Asperiores quas doloremque. Occaecati tempore tempora.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailStatus has to be a enum option of ERROR, INACTIVE, SUCCESSFUL, STOPPED, UNKNOWN, UNREGISTERED`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'bd1378a0-73a7-42a3-8cf0-1df4f0b142c2',
                tenantId: 'e11fe233-6b39-40a5-8fe1-708f6ef1757e',
                tenantCode: 'bdtkyq6fozuttmpk87c8l8xq3i1lyae5c8c2s5e4joihcn9yjv',
                systemId: '6d03d45e-e681-45f4-b9fd-b221cb765735',
                systemName: 'kxb9lcd8hgxvpt5623mh',
                executionId: '592625d7-8f60-4af3-9b58-987efb390dab',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 10:33:41',
                executionMonitoringStartAt: '2021-05-23 13:51:31',
                executionMonitoringEndAt: '2021-05-23 10:10:36',
                status: 'XXXX',
                channelHash: 'q3qix7sb2xom0qlqrs5r9il2opglha9tuj3bzfek',
                channelSapId: '5anybhua7rmv1biq7r7iyrsq19226sc2ue1ls9grbscg0e4bql',
                channelParty: 'bb3qn91910r9hum3rb2rl5a3fw787hrld2zwanugrd2nocfsfki5s6uevyrwduw5boqh7606fb871ad8xmeih59f7hyemx8287aet17g8c67a910j9mk8d7hxo1h4gsl5kk1523w4jm79klliibo57s2i70omhgp',
                channelComponent: 'am1tmak4ko7ygoz7h6p67cd4lu3q84lr201sumg2x037r2bpyqrw6wkks155onxszjgz44is2wyynyq7jh1mxeky70ej7vuxxzpnlp4e1lr0hn74nvcuatjdcaqgvhuwafawi9onrer6s0wubu8owvbfdksfps1m',
                channelName: 'mst0924relkvm3otmkslieukod5uiod7718qcjmdio30uzu779kfod1lfz33bo7vo6ca757g8wz863uftm9sp3yxn0gtjgu1vxdd8svq2vecgn1zfzplkedhqyvdg2xu6osntbu0lc6zjhu1tabwvuci9ptf1mcw',
                detail: 'Quia dolore assumenda voluptatem eveniet aperiam dolor. Odit id incidunt earum non cum. Non expedita vel rerum illum. Ullam quos a et dolorem.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailStatus has to be any of this options: ERROR, INACTIVE, SUCCESSFUL, STOPPED, UNKNOWN, UNREGISTERED');
            });
    });
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionExecutedAt has to be a timestamp value`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'd5f7bf43-aa53-4646-a938-81313b3557a9',
                tenantId: 'fe8a0eef-cf76-41d3-9244-caf5c527775e',
                tenantCode: '1b85l2five74z9cx29b84c8hjicxmtmi8gsn03vc96m9dq4yna',
                systemId: '9247d7af-ea8d-468e-bb27-088e26c8a21e',
                systemName: '0fesvsp3ccntmtmjwsva',
                executionId: 'bfb0affb-34ca-4abc-a110-da317351e9ef',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2021-05-23 22:12:09',
                executionMonitoringEndAt: '2021-05-23 14:26:52',
                status: 'STOPPED',
                channelHash: 'vd50ar3trtrafwkxxtyhc5egu3g18eo71rzvv21i',
                channelSapId: 'azlg0ha8e0j5aanuayu3cgzn1fmxm9uwx8eequl3swahizr4mo',
                channelParty: 'wzg4ibhk6zj05bhgbp19dbgakov59ut7gxxzta9r0open58njuzd1jenfq8pr1ynbs6en8dkqwsiymrkgroe0fkbnsiupj4rdnwogqpss7ls2pmxoe710mb8n1a2ytyfl66wakn12uekcsa0jimnv00i2e3jbuj7',
                channelComponent: 'ejvwmopozgsxv361vulxgxlmqvscescsw81s7pii97sbkhmdzikekxc6ii2n068b23neonmig3bifo1gzgjalzq177xfbkrno4rx82ypgtvro4pcmpf37gsx56lffi42cf04myg8admv4zggsd29auebd9cusn79',
                channelName: 'scczwifdanpauhegglasdlb6zqg2v2u8x5uwmtb3atc7wnpmml5i9bidcneigag3zpi8hloujtsq24rawg920k7vn2yg1dd5mbrr345p8ng084k6fv7jf079gsdf3fuvpr56ffrldk8mze9pkwekxvm4umqg0c6w',
                detail: 'Aut in est voluptatem qui sunt ducimus. Facilis et molestias rerum sunt omnis. Qui dolorem nulla doloribus deserunt harum.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionExecutedAt has to be a timestamp value');
            });
    });
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringStartAt has to be a timestamp value`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '270e8d2a-48c1-4386-b92b-19f5d3b62101',
                tenantId: 'a4f10b11-f7fe-4551-a12f-523711d71ff6',
                tenantCode: 'jxt6bxgtkgjf20vrtbrxyt508ympihcg7v3nb55g2h3ktio9hq',
                systemId: 'aee0480c-41e1-4bde-be09-b2b04456adf8',
                systemName: 'mofcoyjdg6ubn4cq19b5',
                executionId: 'e273666d-ba29-4df7-bb6f-4879cacf7509',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 13:46:51',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2021-05-23 13:25:28',
                status: 'UNREGISTERED',
                channelHash: 'zlqgc32m4nrxjnac60qkjed0f8meblmp4mwe1v9c',
                channelSapId: 'cjjwhmw5royflmo5zky3njh4eut0wwerp01mzio1j0fvydn68m',
                channelParty: 'oafnfl2m0njg4fvmslz4k557fv3g3uuq0sq0zhwkrmbjo31abum3yuuxu9u2n1k4p2abrhiiju5a5aisrg4051wvmgegopfysenigy6emxqgvfs77iqydclv533ojoth91wpl10k04ntz81vfs3aw9mpohgi6edj',
                channelComponent: '9vc2iq184wggndtve7vajeyhc7ye8unv90epi24xiqo1zxik3maq65aae608hkawqvqlvmkrowg58mds27cl2hcfr2xij8w2rgww9lb2x30jgcwogtex49d9kssb6q75evlt047waf490voiotj9mhvz474chgfe',
                channelName: '9575tgq09ebij0vcdsxkrunx31ek5k58hiyplyu3yr6z77tjxuv0kecouiaxz2wf0rdjqi30ahn78siqsaqsakmgr4s7nop8s19pjxzwtclkmcy8yeh2q7elgcq8z4n7owqnrkqkp4jwwlmq5ctebs1afwh8v144',
                detail: 'Quaerat qui exercitationem aliquid. Eaque necessitatibus sunt molestias. Minima sequi et tempora ea nam vel voluptas et est. Ex voluptatem officiis. Minus ut odit atque minima inventore. Velit et delectus eveniet repellendus architecto autem.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringEndAt has to be a timestamp value`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ae38546f-290e-44a6-8582-3f405f8172a4',
                tenantId: '85d54fb8-83e4-47d7-a078-6918c64406c7',
                tenantCode: 'pe4zlbeycempzwopvkj6z28x7a7eq3afq1xsy0vt7t2ok6a97s',
                systemId: 'c2c18b04-8235-4af5-9209-7a0d056ea714',
                systemName: 'kflxnp10cmtjeewshk75',
                executionId: 'fa157504-2fdb-4cec-8557-8d0fbe66be5b',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 16:20:26',
                executionMonitoringStartAt: '2021-05-23 09:42:34',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'INACTIVE',
                channelHash: 'mzl0759x8gokdle5gt99m4eif8d86zf1zh7oam1t',
                channelSapId: '18fac0ehi65s2qdk0k6yy9lqbjbjygekp5xz9c60njrzyamagz',
                channelParty: 'gyk973izud9bu8brd4uyzoi9wd855vy8hq7bt29ik7br0fm2umf8nqbomwmqjkq9lyt3nb2c9bxhdgljwmrk8hoo118edn1wru2lj7qmy6tsbn9k6gg1911o99859tshyz6c5vad6r6ywh2g92ta8u398ckzlj5f',
                channelComponent: 'clo6su1zl0290yyarekp2ilzys3dn0jecxvd9tx9p0cnafooy4w7qabqz5anx9qjv8kj3fnmsssc6x0mghiuoecsbitrz01kphdlhh85g7e4grq6hqvponfazmvqamnuok8cbggvjks90l66u39v5fd0ws1iohqf',
                channelName: '5hian7m3y4g407g5vlxypkykzije1gvf4z44xbwrt99o6wzaaxwli6copj0hg35oas72vi8zh3yi0xipfbvnovdevuj6pz4nxkd35y6zjih9yd1i0zjdklnt72hdjfxlyay1oo131i1819ajykkbsiog1cro9v6l',
                detail: 'Rerum cum quisquam est animi aliquid fugiat delectus in vel. Eveniet molestiae aut similique expedita vel ut necessitatibus. Eligendi voluptates nihil necessitatibus debitis inventore similique consequuntur aut ut. Nostrum rerum et. Minus magnam voluptas modi.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringEndAt has to be a timestamp value');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(seeder.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:GET cci/channels-detail/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/channels-detail/paginate')
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

    test(`/REST:GET cci/channels-detail`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/channels-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(seeder.collectionResponse);
    });

    test(`/REST:GET cci/channel-detail - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '99cbef59-214a-46c8-9701-69e2ef37b033'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:POST cci/channel-detail`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
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
                executionExecutedAt: '2021-05-23 21:25:00',
                executionMonitoringStartAt: '2021-05-23 21:25:00',
                executionMonitoringEndAt: '2021-05-23 21:25:00',
                status: 'STOPPED',
                channelHash: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14u',
                channelSapId: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                channelParty: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                channelComponent: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                channelName: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                detail: 'Delectus eveniet quaerat nihil eveniet omnis autem. Suscipit et qui laboriosam voluptas numquam quia sed perspiciatis vitae. Eum ducimus sapiente magni earum.',
            })
            .expect(201);
    });

    test(`/REST:GET cci/channel-detail`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/channel-detail')
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

    test(`/REST:GET cci/channel-detail/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/channel-detail/0ff9df6b-2d23-4cbd-be1e-7f1a94b3b688')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET cci/channel-detail/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/channel-detail/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:PUT cci/channel-detail - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                tenantId: '01d3c56e-5728-46aa-8427-4d9639511b96',
                tenantCode: 'scnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvto',
                systemId: '9189c277-fd22-4a5a-a692-63a1c56085f6',
                systemName: 'zwdlk281zptz1leq1e77',
                executionId: 'afa030f9-065c-4353-b1eb-3e148b092012',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-24 00:02:56',
                executionMonitoringStartAt: '2021-05-23 02:32:40',
                executionMonitoringEndAt: '2021-05-23 17:45:41',
                status: 'UNREGISTERED',
                channelHash: 'ru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmv',
                channelSapId: 'hpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43',
                channelParty: 'tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8',
                channelComponent: 'xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd',
                channelName: '3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmt',
                detail: 'Deleniti pariatur vel consequuntur praesentium vero. Quibusdam dolores non qui natus minus. Quam dolorum id excepturi id in pariatur doloribus eveniet non. Et et et minus reprehenderit enim aut. Inventore enim placeat dolorum quas tenetur rerum voluptatem et nam.',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/channel-detail`, () =>
    {
        return request(app.getHttpServer())
            .put('/cci/channel-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                tenantId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                tenantCode: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                systemId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                systemName: '4iyw9pwsdxcmgcu744j2',
                executionId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 21:25:00',
                executionMonitoringStartAt: '2021-05-23 21:25:00',
                executionMonitoringEndAt: '2021-05-23 21:25:00',
                status: 'ERROR',
                channelHash: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14u',
                channelSapId: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                channelParty: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                channelComponent: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                channelName: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                detail: 'Delectus eveniet quaerat nihil eveniet omnis autem. Suscipit et qui laboriosam voluptas numquam quia sed perspiciatis vitae. Eum ducimus sapiente magni earum.',
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:DELETE cci/channel-detail/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/channel-detail/53eaf02f-c453-4b31-847e-a591b0ce42cf')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE cci/channel-detail/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/channel-detail/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL cciCreateChannelDetail - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:CciCreateChannelDetailInput!)
                    {
                        cciCreateChannelDetail (payload:$payload)
                        {
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelHash
                            channelSapId
                            channelParty
                            channelComponent
                            channelName
                            detail
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

    test(`/GraphQL cciPaginateChannelsDetail`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateChannelsDetail (query:$query constraint:$constraint)
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
                expect(res.body.data.cciPaginateChannelsDetail.total).toBe(seeder.collectionResponse.length);
                expect(res.body.data.cciPaginateChannelsDetail.count).toBe(seeder.collectionResponse.length);
                expect(res.body.data.cciPaginateChannelsDetail.rows).toStrictEqual(seeder.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciGetChannelsDetail`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetChannelsDetail (query:$query)
                        {
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelHash
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
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.cciGetChannelsDetail.entries())
                {
                    expect(seeder.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciCreateChannelDetail`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:CciCreateChannelDetailInput!)
                    {
                        cciCreateChannelDetail (payload:$payload)
                        {
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelHash
                            channelSapId
                            channelParty
                            channelComponent
                            channelName
                            detail
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
                        executionType: 'DETAIL',
                        executionExecutedAt: '2021-05-23 21:25:00',
                        executionMonitoringStartAt: '2021-05-23 21:25:00',
                        executionMonitoringEndAt: '2021-05-23 21:25:00',
                        status: 'UNREGISTERED',
                        channelHash: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14u',
                        channelSapId: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        channelParty: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        channelComponent: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        channelName: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        detail: 'Delectus eveniet quaerat nihil eveniet omnis autem. Suscipit et qui laboriosam voluptas numquam quia sed perspiciatis vitae. Eum ducimus sapiente magni earum.',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateChannelDetail).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciFindChannelDetail - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindChannelDetail (query:$query)
                        {
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelHash
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
                variables:
                {
                    query:
                    {
                        where:
                        {
                            id: 'fbbc740d-f2c7-49eb-bd2c-42dc9bb771b4'
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

    test(`/GraphQL cciFindChannelDetail`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindChannelDetail (query:$query)
                        {
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelHash
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
                expect(res.body.data.cciFindChannelDetail.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciFindChannelDetailById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        cciFindChannelDetailById (id:$id)
                        {
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelHash
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
                    id: 'fbfb9f9d-4561-4f43-af05-8e88acccb099'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindChannelDetailById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        cciFindChannelDetailById (id:$id)
                        {
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelHash
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
                    id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindChannelDetailById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciUpdateChannelDetail - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:CciUpdateChannelDetailInput!)
                    {
                        cciUpdateChannelDetail (payload:$payload)
                        {
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelHash
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
                        id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                        tenantId: '01d3c56e-5728-46aa-8427-4d9639511b96',
                        tenantCode: 'scnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvto',
                        systemId: '9189c277-fd22-4a5a-a692-63a1c56085f6',
                        systemName: 'zwdlk281zptz1leq1e77',
                        executionId: 'afa030f9-065c-4353-b1eb-3e148b092012',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2021-05-24 00:02:56',
                        executionMonitoringStartAt: '2021-05-23 02:32:40',
                        executionMonitoringEndAt: '2021-05-23 17:45:41',
                        status: 'SUCCESSFUL',
                        channelHash: 'ru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmv',
                        channelSapId: 'hpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43',
                        channelParty: 'tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8',
                        channelComponent: 'xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd',
                        channelName: '3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmt',
                        detail: 'Deleniti pariatur vel consequuntur praesentium vero. Quibusdam dolores non qui natus minus. Quam dolorum id excepturi id in pariatur doloribus eveniet non. Et et et minus reprehenderit enim aut. Inventore enim placeat dolorum quas tenetur rerum voluptatem et nam.',
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

    test(`/GraphQL cciUpdateChannelDetail`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:CciUpdateChannelDetailInput!)
                    {
                        cciUpdateChannelDetail (payload:$payload)
                        {
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelHash
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
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        tenantId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        tenantCode: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        systemId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        systemName: '4iyw9pwsdxcmgcu744j2',
                        executionId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2021-05-23 21:25:00',
                        executionMonitoringStartAt: '2021-05-23 21:25:00',
                        executionMonitoringEndAt: '2021-05-23 21:25:00',
                        status: 'UNKNOWN',
                        channelHash: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14u',
                        channelSapId: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        channelParty: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        channelComponent: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        channelName: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        detail: 'Delectus eveniet quaerat nihil eveniet omnis autem. Suscipit et qui laboriosam voluptas numquam quia sed perspiciatis vitae. Eum ducimus sapiente magni earum.',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateChannelDetail.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciDeleteChannelDetailById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteChannelDetailById (id:$id)
                        {
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelHash
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
                    id: '4ccd70c1-ca85-4394-b5bb-1101e403b4a9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteChannelDetailById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteChannelDetailById (id:$id)
                        {
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelHash
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
                    id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteChannelDetailById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});