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
                tenantId: '7c8431b5-5c3b-4724-b0e9-a565c1a517aa',
                tenantCode: '5jz71jl9nfnpfbww3e79mxcf3bh17evl148t8hlhao6986h15r',
                systemId: '65e672e7-873c-4763-a507-b966e4d30cc2',
                systemName: 'qb09cn9fmyo9jc01j329',
                executionId: '03733274-f683-48fa-b13f-404a1aa09bd3',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 07:51:13',
                executionMonitoringStartAt: '2021-05-22 14:58:10',
                executionMonitoringEndAt: '2021-05-22 19:09:09',
                status: 'INACTIVE',
                channelHash: 'kkyd60iscuu26eniiybcv73sf1mu217r87posbgy',
                channelSapId: 'r9btt55gtyui06fcabmwucbu8ospj8dg1mkiwg5i1cz75atbpb',
                channelParty: '5a8a5o2j2p6p89gip4gr3e8bdu1pq2ymih84fg5sq672xaor0s1vgds5dfz6rp8mnhr3v8wqolobebu4frxqh7dlsju45xp81n9yptqxsaxw84e73ecmcs5hpfifjzfncnreap5mf6rixd97qixhtblr0124i2is',
                channelComponent: 'lcad92m8bx15vn1k3k60ey09dzw14ucluxl3x51t9k3r8ozummptl6gnkn6e896w1kkikdx0l14kc8umkopa2eoynw23zp4d1z1e45ao7qopxw90p0ke81ohb9bhqtero4ik7f6mjz21f94a3or2n34y64rdex2z',
                channelName: 's8djr17rkwib9avzbuvtdkjbemtl3ig15udsvk66sf3yx598u20rgclfxr7k9kjxpvgk99q515zerxne3e087elgbdfufceggthv3u2triartiv8d5wrzy6g04zdipahsm5vlqfhfgeokufasitl6ui7jkn02k38',
                detail: 'Atque et quo et nulla laborum. Quas temporibus iste ea. Enim voluptatem quidem quis velit omnis aliquam tenetur. Rerum fuga quia. Alias quo maxime sapiente voluptatibus eum temporibus accusamus. Voluptatibus consequatur placeat odit at.',
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
                id: 'e7526763-2efe-41f9-8d09-fc71426f6f91',
                tenantId: null,
                tenantCode: 'qe9qrrpukn1a614a4ar1g7are8p2n980v1qkll8ocps4s6oevg',
                systemId: 'f077e6af-30d1-45c1-9aa9-771b25496f9c',
                systemName: 'dmwjsbagbftx2fk493tm',
                executionId: '502c51e9-4125-41b2-9177-4fe2a3a01d9a',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 04:52:15',
                executionMonitoringStartAt: '2021-05-22 22:03:33',
                executionMonitoringEndAt: '2021-05-23 05:04:19',
                status: 'UNREGISTERED',
                channelHash: 'rh3gu9z108vimtu9v0k4rnfrcx3gihhq9chcg1ie',
                channelSapId: 'lirrdxdd1tly2dvnc0kaxkvngx3610qy322mjygdkeh4675g0u',
                channelParty: 'it5svy5cs9dym2r734l4uztb4fd5kfo0jxeqs7133watbqxc71mp5p3v50k7f06s28v3qp7m5ur9qjtw4c7nbmrpmavi4tachngcw4qg8xg4w8yflwpxcidknp0urcig721icj930r1o0l5xld5o11wbr8mcv2n7',
                channelComponent: 'r2m53wrtyf3maqnjvmg6o3i1u6hree3djgcmm2rsmrbwwcobsz7vx58cwrssfiizz3lqjo7da0ydxgldgy2g1wg6104j1qzcsyslp6okpza8e7e60353d3rjgrd4spu3whuzftp6e62xa5072557cuz9q794zz0o',
                channelName: 'goaopp15zlbrbjhaulpww27glnbxyv0h9nbc5x4xxbnbgxuboti26c8cwe0vsxl6h16ltallay4gp7kjzgzril8ax2xrep03xj0cdukji9dzd0ea7rotg98fvinz51th62v9czo27i5srhxzzjz9p5rkdfy8nkbf',
                detail: 'Dignissimos pariatur nihil sapiente ipsam. Qui dolor aut maxime dolor nemo eaque nisi assumenda temporibus. Tenetur recusandae nobis quia aspernatur quaerat et provident eaque. Veniam aut omnis facere ad optio. Et quia aut.',
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
                id: 'fceacbbd-e613-45d1-839f-6e2c5d33494f',
                tenantId: 'a3cea6cc-b971-4987-9f6c-3ccd77901f9c',
                tenantCode: null,
                systemId: '4d6ab8b8-ef47-464f-82c1-2befefa27c7e',
                systemName: '3kywznciubwzvwz1lm06',
                executionId: '565363f0-e8ea-4483-91b0-a63250785a70',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 07:43:33',
                executionMonitoringStartAt: '2021-05-22 19:38:37',
                executionMonitoringEndAt: '2021-05-23 07:09:42',
                status: 'UNREGISTERED',
                channelHash: 'eqgfrudc3sps4c02jp7x0p67ziq9fuu6327mnmz7',
                channelSapId: 'd3kckg688k8crjxu524a5ycs92xe2gfo30g1uh3cg8eeu8wx0e',
                channelParty: '6gfybiefmld23iduwwwlkbp8e202v062jcph4kej3b4fsfloq3817h0quxklcojqw1me6l2lkdq6mqbotm2y9uyj4k63c964y82kkl5s2v3psgdgzi7yy8ll5pcmo167j6b0d24fw1ugwphpa14qvog36sil3g1m',
                channelComponent: 'k41g6sed3ewdn5qywnrmt8e828t70vz7ugb22t1vl46t2l0jt0wzrr2otdt4tpy854rjkeqig2lulesoox0euzvvm0gf6rnr951bbx78zxb41bpnqsdzms6pobqijsjwob38ax8s3542v2jqyxx1oxvctijl1you',
                channelName: 'ycveswdkwehuqz3pzt5x9t4sm0tg5h66xi5utp2mldx4bmg70vwq2oogl1c1o8wu7hkyu6kgd71sj6j884utdhwdjdzvypin2wnpg5av7sexgwrloxvtavs2hldpbnbuqgmg21kuwuthlz2i40a7cys0jrxvt44p',
                detail: 'Ut ut et mollitia expedita totam quas. Impedit ut et accusantium. Officiis impedit laudantium culpa ut deserunt quod iste libero. Qui illo expedita beatae quasi eos.',
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
                id: '8fbbd56c-2f2d-4c8c-bbdf-486e5f3dfadc',
                tenantId: '627a3326-c6b3-455b-af02-756c9e34b15f',
                tenantCode: 'b3ycwl7v1hweufcld81knr31edse658r46iz0fnlvo27ymjjd9',
                systemId: null,
                systemName: '16i4e7vu8drv22pnwiof',
                executionId: '1a6d1692-007b-41f1-a8c7-d452c098927c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-22 16:26:42',
                executionMonitoringStartAt: '2021-05-23 05:01:48',
                executionMonitoringEndAt: '2021-05-22 22:55:58',
                status: 'SUCCESSFUL',
                channelHash: 'i0hr5wyw5zmno4wzup5knml75nkajfib1421y5fj',
                channelSapId: '3p0u062p9vm62vomw4963rfc73j1xxwpjnx6fbebyb38h5mtjn',
                channelParty: 'ij90612f3x2mviby7yh8ke9r2524x6seb3qkicw8tj4mfba50kfcvl3uhno0d6gqgtoy90jcjv3my9izbszkjc0w81qv3qo58hmk75o0jzlh7zza4bz7tbmqg9ymaeli36y4qm759im50fej2iijl0f51po9ergm',
                channelComponent: 'h9lir4sh4at5x1pohly6evmank9iuubkv4o9882reyjv0dnqvgokph3ikwbyrlns8go64cjn4y60hpqnpvkqnt99act4h8booj8k9qscikcme99jcxly235d8ulgk54vaoryi7f0silg2c4wjgzg6ihfacl5ewlu',
                channelName: '050znripkjycfey6cqq7qwk54z7qy8edsng949dfibio9b28la5i8pkx3mecumf5cqwrbpynru3bajrstobpkzyos90ak2g4qh2aje1b0m0kom38c71boagkqy258xzmjbcve6j611x8sfw5cur9oeet3rxkt0pn',
                detail: 'Qui quo et provident autem dicta. Laudantium consequatur nobis fugiat aliquid fugiat corporis quia. Eum beatae incidunt perspiciatis aperiam est doloribus.',
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
                id: 'cc7d4864-ecc3-4be6-bf68-4a0c99e74706',
                tenantId: '47b08794-d0e2-4392-a942-8506843331c4',
                tenantCode: 'su6u64k73hvsru31uobtc6zom73pdche927al90ud9q3k3l3km',
                systemId: 'd1d26ebc-2a2c-44fb-b3ef-a3a111e322ad',
                systemName: null,
                executionId: '49eb3792-8002-41dc-962f-fa0d558c00fd',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-22 22:08:49',
                executionMonitoringStartAt: '2021-05-23 05:33:13',
                executionMonitoringEndAt: '2021-05-22 15:40:21',
                status: 'STOPPED',
                channelHash: 'x3oz3oecrjgcjy45pc79bjhbhzknndf0ttrl5rrs',
                channelSapId: '79sc5vx2tiiezx94ya9lk2chtth5skvujxpxgwocw38umjhpoa',
                channelParty: 'i6r2nyyeyc6k6bglq6ss0v4ytfbue6q4gyqdw4ji7927sbe05g8rw4pevkfhtbecgj1rm8dxipjebkefs0lt7r5r7eb29ikx4t12s259n4c1oq3ol4dxg2f8imwo15cw7yyfufjgv08jkj26fdls74tabsyrvdps',
                channelComponent: 'zywte9px4zb0y7k1nqne6x9cnfi5a83h5zzea7zwcpmtahf3d8pjna6mdyasxc86wle0ssflz1q1d5f8breezvu6gmkwy8d074w65ohf16pugxgegurzoyksshtl48ren6ojt6zj9moo03yczzla1rty1fkdqvaj',
                channelName: '0nyap98h2zqdsge04wsn3qrmjb99362nbd1bcftgrcxgki9xmrawo3wplgufrqt595rm0qaf4fkgiqu7in0uzo6wjv2f2onwmthrhizzalwwr7yqummxky7dfcwt14bkynnlmffb46iw9c4d1aptz2qmgw3a1qyq',
                detail: 'Unde esse quia magni voluptatem dolores qui nulla et. Et corporis doloribus deserunt adipisci soluta ipsa voluptate ullam eum. Commodi itaque molestiae cupiditate. Nobis fugiat repellat voluptate et. Culpa quo delectus consequatur natus a id nisi rem.',
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
                id: '50ce0e2f-7a59-426b-8153-f81c5add8838',
                tenantId: '37b4f136-b198-4029-ad48-106e84db4b43',
                tenantCode: 'ha4ps5til83gi84i3dyglv1f6zghqw7wch6vh9uk282z877amp',
                systemId: '11b14b8d-2834-4c32-b1a4-dbb4eee949ad',
                systemName: 'svzuhuygyju4hbn84mha',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-22 16:22:28',
                executionMonitoringStartAt: '2021-05-23 05:33:40',
                executionMonitoringEndAt: '2021-05-22 21:33:26',
                status: 'ERROR',
                channelHash: 'kns26uidwp0fr3yxonb894pe1ndb8vqd28x8eixe',
                channelSapId: 'vtbsnike7a0xycowe12hjolbrn1wa8sidc7zexopact4rta4sq',
                channelParty: 'eyp2zs33y8knxol4d1ew76izfechdha94lszla8wexmmul00179xu74pvvc48kq9ka241554uw7er1avb2ln6ovyoqecg70g2muz0q2k7i9zqk0gh1nejfyf7y4pg7ti1th17gooprkg829i2miqj8ia04ycawa6',
                channelComponent: 'qwnhq2t8yutut7a95wcshll0ipsdz7yodg9m4ryxoyejkfdkmwajl8zf1cf77lkylapjm2b3zepk0rqqf78kapnfbrv2zvmq2qywaqhmld05uvnwjcwg67zo8nnhp6hpudzrv47364vl2vp6amll3xjobsfawpd6',
                channelName: '9mf7u5y0g8nc8unn4bx55heokzhfc3atrwm7pd50uef164o6ag7g3quttorni6652zbqqdlf6rpo62qlqri4fyb1a476ccz8cvivb93tdrwdqam6fq3rz2dlorq6ri65qylgg7dwsou509b0cr003h5spzgrehco',
                detail: 'Repellat voluptatem nisi eveniet voluptatem laboriosam. Aspernatur id ex a minus et ullam est. Quis eius ut eaque ea eum praesentium quia eum.',
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
                id: '22e9beff-07b2-4d5c-a890-f3f26b8b4535',
                tenantId: '885afcd3-fab4-4654-9c00-9fbf390205df',
                tenantCode: '698n8pa14rvv0dicvxpadinfjic9ocz61whyggggvmrwi01xh1',
                systemId: 'c00cbfb7-3198-4371-a3a0-dd03f10302be',
                systemName: 'oavh2zzt2r1zexj6yhel',
                executionId: '0f0bed47-ec17-469d-b25a-dff82bbd7b48',
                executionType: null,
                executionExecutedAt: '2021-05-22 20:50:54',
                executionMonitoringStartAt: '2021-05-23 06:44:20',
                executionMonitoringEndAt: '2021-05-23 08:08:28',
                status: 'STOPPED',
                channelHash: 'edm4pzi6rryvi36gsss9pyheob1ycgit1wnzwb4q',
                channelSapId: 'q6897vje6eykkea2kqusat9r2iqau8li78j5h3g60zy3xulb70',
                channelParty: 'cdievihjcvww9q5dl1v189p7kh5c6i0znl2ie4f4mkvyfn6rrm0232v19he9dwj78tq8zb81653cx39nm1521lvka8iy5v006hsfdeu2qtu8q9bqlf1u8qazk5na7wnms2u4zl794k1zgononynoe1aj8jtntluk',
                channelComponent: 'vkjemh8dqiutun79cj9k3iqxwu77m64efjg5f5zjawmmaz73swnsw6y94bf5j9erwe306c8rzdn1h4hl2bjljg5ouezaht5ududepnbgi55xl8xd8uvkb9y39qtok0wuaorcssfujoatvgxnzf2393d5o3lo86jp',
                channelName: 'w9o5yi0akur2uqqv7020jsp6vlgxaq34d5r7esuwood323zqkn9pafon30r5w0q310vv36g06q4of73fdlryg88dbt52e1lea2t1f67xjbz6mz8c74fafhb6rop08fmd10ntihpaknukxgobjj51l9kov0jd34fl',
                detail: 'Veritatis vel commodi et alias. Nostrum soluta libero. Animi vel enim quia perferendis dolore quis accusantium.',
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
                id: '1ea51fa0-27e1-4ed8-9200-d0b7c1770ac4',
                tenantId: '3779ebb5-09ca-4483-b7f8-3860e4ab38fc',
                tenantCode: 'bw0cfyu0z1rhdiw76mug8nm3mev3jhtcqw0jav5uqyftlxt7ww',
                systemId: '500a0fb3-a75a-40b0-afba-c85fed417244',
                systemName: '13hel6hjisj31otqx2qf',
                executionId: 'd679cf03-0c55-4ad8-a289-de57bb8f3fd5',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2021-05-22 17:49:34',
                executionMonitoringEndAt: '2021-05-23 01:37:23',
                status: 'SUCCESSFUL',
                channelHash: 'cwhdv4pbkwwevon7py5mrzuh78s9bqknozvg27g2',
                channelSapId: 'u5ddlg3zng3xh3sb6231aoccbxbfhs5enofj6ebo6prpmsic6y',
                channelParty: 'hmfrducxo1noungnl0nbzpf1pvrx5ekqbd2xd0vmecd2ess80c0gcqthv0n9wt0n5jxk2phaywsnrirp07ai7q6jhcvndsov9ilpeovzcgpwemxgos64aexcecakv5w29qd893uwo5e3o1ln13iwbd8fdtgzjr3k',
                channelComponent: 'ops0zazlq95dnxq9ygf8n6qj7in907rjfet9lzfckfe1e37gfg38etezb9hxe1qnnc8owh1erixlr1eriruc41wyjc7g3tj7lg3n2b4kiwjw1rhtsfnqwzqyeknva2ewr8y1tc4w9lsntgkyo98s7wa9566yyg6c',
                channelName: '1j3qcgq45wf5nq018x6508r3z7akq7zl6uia4g0rhbpktvcx25c3z1pk2udmxle9tw6yuwbbl7xuw6b9wqjarmjbnsd937r9ap6eawfiq8apt8vadxws8xggvi7q8pin6xhfhew438azb3gn7p4c7s5gjh3xi97e',
                detail: 'Consectetur dolor eos excepturi ullam tempora consequuntur dolore. Sapiente et quos atque. Aut aliquam possimus pariatur enim laboriosam quia labore laboriosam aut.',
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
                id: 'c61a509e-b2aa-4cb1-9ddb-6e456b38486a',
                tenantId: '71cd4993-6307-4c35-b673-af2dc5e4505b',
                tenantCode: 'fr1agfv6ws29kn9sty8hem7mg6zepb2g38ot8fvgmlfs80tvgc',
                systemId: '60411ea7-0867-48c0-a296-be5bb3ee9a68',
                systemName: '6koqrqdjc2fwedea7bmq',
                executionId: '9004b01c-d00c-48b8-8d98-393e26a5c790',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 10:25:14',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2021-05-23 01:19:16',
                status: 'UNKNOWN',
                channelHash: 'lkdgvv013z4uoe0zq0vbvicv2a1llr6ubyxv4lj1',
                channelSapId: 'pfl7ct3cyqchqbi2l65hpby33vbpvdv82y2ktw7j0kquyjr4ev',
                channelParty: 'xce08zdjxak14bvianw3kol0j05mo40v4nkgm2y84lecmrgmo9vqxs6iwifrtvnlphtda7wd5esfeofaqbd4ajfhgxgnaycevs0dkg8tig4zj9fotwql5vsvotlljzzszckcn0vs5jamp2r4xymrxz74y5vi0sgx',
                channelComponent: 'btmkctor1h7d6gej2f6u5vya86n6lfbmcankytjtkqh81jje8n9unp925ggy13qbs4bd010z23gcj4833ikwwumc3ksakeokfpfqn04n66djie7xldnly4w8margo2wmnh10musliomjcb8l2d9mmctfm4z5a89x',
                channelName: 'pspcbeizs96fs07zdztjj16ahmmjx3ilvpgvi5qe0tesia0t0r4516w0x16uj5ib0lf9c0cthxjaftbpztnmrv447v4rlfp4g8asemeww6mqxhpvwu8jukmu2tg9x1apr422z2smlcom2rdsngdujmptcqmyz8h9',
                detail: 'Maiores suscipit delectus distinctio dolore illum. Reprehenderit ut nemo vero non enim unde. Reiciendis quidem magni sint numquam qui vitae enim aliquid. Velit totam molestias ut rem culpa sed est nostrum deleniti. Aspernatur quis est quae facilis iste.',
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
                id: '162f193e-2d65-4125-b678-a447648c429a',
                tenantId: '3aaeece2-c6f1-4732-b00f-3c227d2c1cf4',
                tenantCode: 'cin10vpqkt3hi4znetzlytor6icp0h07ggfhouo30vk9vxb6oh',
                systemId: 'af0004c1-8ea8-4361-b5dd-d7c3aeadbddb',
                systemName: 'lxzr75t65m2f2o76jug5',
                executionId: '6fe0c4a0-4070-4291-bae9-dcda61c4e412',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 01:49:00',
                executionMonitoringStartAt: '2021-05-22 15:58:45',
                executionMonitoringEndAt: null,
                status: 'INACTIVE',
                channelHash: '01unsgrlfoztm8kfhua4oor7zwphl802pg7bnikt',
                channelSapId: '0wa0kqnt9zkx341b2rdskud34r5ekklgkz3v51jyiu2jby8pm9',
                channelParty: 't83picxpkcjs1k8kdb3wddn4zup7lyn9cw085d159ob3641e8ruwg4bevfwdew613icz4l69ayoao81d7iaf6hd6sc0togp3i5bv2g9p6w4rqhdtb8tf3f2n2mt06t5dez7ivqoz0zl9ktvjwd9re2gtada4esw2',
                channelComponent: 'qfrfewg969iogh9ns5jmd6tb66zm5l3z0x5w6wc0nbcivqisf2d0tr9fdz12ft9phrx5z4c3y8e2ojbza24y6syl23avulk28h5p45z92ltqz0l34cs9vi3112w07sjw11zvtnubh38p6pv3a0wt2hxsghfeqgpz',
                channelName: 'vnhe0vp4fvo4z4x5ua50hybg9m7yv7hlqjgv2zvcgtcic1q7qd7r1mij7ju56v2lzcnqdsf3w0mwhcccvdq7gpl1rugq70pwxsf2stjikbyh6b7ejfd9esdo4tlf69bodkljx7pe2we54g07ig2oyi4t2gxqg7oz',
                detail: 'Ipsam enim voluptatem autem alias earum. Vitae et expedita dolor ut sint. Adipisci inventore quia id quod iure facere unde. Cupiditate consequuntur culpa optio qui saepe est est quia. Aliquam rerum veniam corrupti. Ratione numquam nesciunt ducimus reiciendis perspiciatis et voluptas vel.',
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
                id: '5b04bccf-10ec-4896-991d-c234db25a24d',
                tenantId: '90710506-6edf-4602-ae43-babc2321be67',
                tenantCode: 'tfarwassstm7xo3w72mwgpd8gx1zu41dgqskr6ysuuo9jrc5f5',
                systemId: 'a4f8916b-5b94-47f5-9172-518c2683b5ec',
                systemName: 'ri6kw6oedbe93qdw2xoz',
                executionId: '16b73d9e-a2cb-433d-b7dc-1ee6abd8d909',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 04:36:45',
                executionMonitoringStartAt: '2021-05-23 03:58:40',
                executionMonitoringEndAt: '2021-05-22 19:26:43',
                status: null,
                channelHash: 'wfzpd3pqgxl5vzo1dd16g6uumhkyi3ngj8r5exj8',
                channelSapId: 'k3q33d6l4hy03owmpadglsum77m132huom88wc3ze23tjo4yv6',
                channelParty: 'j4xbgwu4c52x1ycni6lgektqhkot4c8bvidepyiplx5sw8fw35jww8py3ekv9tmumkm8hz5475751auhdxs8b3usvvck7pn30v0rtx8ghi3z9y6y2k9mj31v4jdz4e6w67yubwhun37cxvg3634sesn7r8ifgc7o',
                channelComponent: '6t0yfniihulu0syzwf4ggifirjrq8mkjktt0xqz7g9qvw5pi1lp476xyo1elr22t9gn9qyquml6nqdbqbfq7anm7oo7vur42qnqbqr4s1bp93s8l133xpivv9x0g3s68wbbrdpid82rm38efxavb0hp7xssc0njw',
                channelName: 'kc42xpc0maxs2i475db7qvd15k70b4xazwlsti25c4slzru2u2lab9c9j602q4fmc8p5rmrizjektmcwam8z9lxlo1cqim162zkxzag0llhljynthmuk7ni7f5ji8a1itdutrcr9fz9gdmexy9az80btwggf7ssk',
                detail: 'Molestiae architecto repudiandae non qui asperiores consequatur totam ipsa temporibus. Qui omnis quibusdam omnis. Nemo ut dolorum odit quia laborum quia aut porro aut. Consequatur vitae laudantium animi possimus.',
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
                id: '08ac2bd4-ff71-4af5-af37-4401e7733e6a',
                tenantId: '11712637-c328-4a64-b10c-210672698863',
                tenantCode: '2ql51ctkdlzsc5irpjaiiwacj97asirs4nknjf9aj1ryt62ki6',
                systemId: '791004f1-b004-422b-9b0c-1aa66185a45b',
                systemName: '6hyhd26wv5wzuy9gle5i',
                executionId: '50de99d8-e235-448a-abf2-b9a0a8b54684',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 01:15:31',
                executionMonitoringStartAt: '2021-05-22 23:45:53',
                executionMonitoringEndAt: '2021-05-23 10:31:43',
                status: 'STOPPED',
                channelHash: null,
                channelSapId: 'tkrwdsv4m32bf1k9hcgk3uvvaxf5pev5jh2evtkycdzb0hnjc2',
                channelParty: 'lwh31k61eozpdyz4p76ucn37wuqeq24lzr22gv2uavwtix2p6no20tsz3ms88hikdjlayr59i4add1a3mvexzo0tp7q63dikvuwtrn9vb819nw8qll15q5vqdctzg4sj0uczprt18pb0vh2yrmgp9bq0k5uzq1rc',
                channelComponent: 'tr5vn8emdwmhc5chveax2vfllslh9fl3dig3gj8dpi62annmiwszt66qqoayhskq8fkhrjrwip51hna7qyjot6wz2hurp2t9i9w27j1jxmjlryl1vjptrcwj4a58t6hmxfbkccrfchtac6ibwr90ttfe8wt4hr44',
                channelName: 'nnq7302mjcfunb34ffax4ac2048kk6fbjj09vi2de06qgnsgzv8gyu5y62spvgr16izkjesz8beuakf7eck2s6hkj7u73z537mrdimadwlir4zz0k4q1ws0dttn4ccmorra7n67wcwgjytwi0ys7mtz3zpd1i3qo',
                detail: 'Delectus enim id modi qui maxime quia sint. Et corrupti debitis et. Tempora cumque occaecati natus adipisci cumque atque facere sit. Sed reprehenderit et doloremque accusantium.',
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
                id: '0270c5d1-6cd3-4dff-966c-5b7fd143eaf5',
                tenantId: '6ab98560-6c6e-4762-8b34-93ec40362a99',
                tenantCode: 'pjlusib2wu97wdraxlcx0erw2lq2b9d0hlv9oipmw9t8d552nr',
                systemId: 'dc3f6f6c-b2a9-42f9-be89-3d94fc93fc8b',
                systemName: 'phwx93x22iouh7c87ri3',
                executionId: '9d8d6267-57cd-4364-b8b5-4017ce072475',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-22 23:31:10',
                executionMonitoringStartAt: '2021-05-23 07:55:44',
                executionMonitoringEndAt: '2021-05-23 10:11:32',
                status: 'UNKNOWN',
                channelHash: 'l9x4i5o1d1p3hcorn8p5ljpsfdw6f27sog6bsqbp',
                channelSapId: null,
                channelParty: 'thucay4fnkslccy926ia1mqp2yprlpx30epnn0xq3mhohwjp0qdg06xh8tutk5u6qsrij3ci6wcfqjep0eog98aq9i3nj2j66qr9km38vl3xkbde8bus921vrsvkgkkhshclp4ozla735cha29a8fh9r7sgbui1w',
                channelComponent: 'hp8stgezggjigcdx8fonrvzvlhz6m83sej1dgcmls4deckbl3kan6l562fiyo6hcobdwu8d3f921223pmt8q8gpg9bkdf06ar06f4u5zjzyc1mje04pjb0cfbp3rq0viwqbtvihcoy44esq5konzp6i0c29yobeu',
                channelName: 'x2wnoni2qd5yv9ntatpbs7uer5y78u78yq6q0yavr3u10jzzl7jd828m60o3g61kk4ric3okl75kkh4gfsf5ao6upnbxftn5vipdh09p53dm5ajsdzl0ri473ppvlwfujuwnf2nvmnqe6qks7pwloj4v1ssx7mq3',
                detail: 'Eveniet architecto enim est odio error. Enim quos quod similique. Odit ea quod dignissimos placeat. Saepe aut voluptatem doloremque rem velit tenetur velit.',
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
                id: 'ee9120aa-0d17-4bfa-a150-7f27178e8c57',
                tenantId: 'f629f11f-9822-4f02-a18b-fdbe4e6baf34',
                tenantCode: 'n6ki7qi9sblhhtx2v58w7thx0v8h85nkuinwvo8mp6sqzu4noq',
                systemId: '66bab663-1a95-4da7-a262-3f61ed8af98b',
                systemName: 'obrxdn0uncwyhn297s5i',
                executionId: 'b3f8bf38-272a-4f73-b93d-32532422683f',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-22 16:43:59',
                executionMonitoringStartAt: '2021-05-23 05:23:43',
                executionMonitoringEndAt: '2021-05-23 00:24:42',
                status: 'UNKNOWN',
                channelHash: '6d73c4y3v4afx7jt8q6j6vhsolpvwiave1lvi1s0',
                channelSapId: '2pt6lii0zhw6o2cz4xexe70q60462kcan71oh6tik21edx7vzz',
                channelParty: 's9n6gndrt7cn4ygc8t4vkidbqowtfdfld41wwut51lxun2a86hi7am206tiydawscn1bkps0z2kj6z27zmlpdbrbpc4p65mmul664oa1ngbc3bg7ry4a8f8x21dt8bx3akrf53shspee2x8uc9dzdicwzujt6kxa',
                channelComponent: null,
                channelName: 'sxsf3z8j77axq5k09ufsps2shh5j2qnzp1d5kc88f0ftys5d9aycikgsto2pql5vbsbwysekvp7z2djuc55rbe9xv85o9tvp9y9x9cdylz3ila361lis8688p5ac82xlsidtri0o0kldb7n3xpovbe5to4y1quca',
                detail: 'Neque alias ut eos. Delectus sed illum voluptas in accusantium quae. Est quia quia veritatis quae facilis. Est quod architecto placeat maxime explicabo alias officia occaecati qui.',
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
                id: '0cd7ab3c-cd78-44b0-b0a5-5105d8f25e91',
                tenantId: 'e026ebe3-4ec2-4a74-9bca-acab2c26df2e',
                tenantCode: 'kmgiyn968u43rnac2aydz7zesdbexqrt65plefrkdsamfhuxbl',
                systemId: '421f132f-25b0-440c-a40a-878b014273a1',
                systemName: '64wdxeyasx3whijmc83j',
                executionId: '25e90a8e-67b5-4a16-b35a-ef547b6daee1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-22 19:43:38',
                executionMonitoringStartAt: '2021-05-23 02:34:28',
                executionMonitoringEndAt: '2021-05-23 07:40:18',
                status: 'INACTIVE',
                channelHash: '2w6q6k9xe2f0yojfvspnf3w2rbifpl399rcyx3jk',
                channelSapId: 'hldtjfrj8us39jqkp8l8up7thznexm6klur85xnpx5y8ehs598',
                channelParty: 'un5kvpko3dh77j14fy6p9k16srqdsav04ox0n88wc98wknctjni84ber03xr4ctt1c5qaifdzxzqf9burndolbhsfg2zenc6fecme1a2yfo31f51rf7xyo2t8u3hllboil6x7ehlwz5uhcc7uma430wtvlx6zy4z',
                channelComponent: 'qqa7il67ag27dr8zflrvdm3tg5ypc40ta9pwu1wdreais11mdlhzd1x67kiwds1pjnx0q7whar034siunqrbw334fv3k132n636pkfezdibzhs9cxtlq49s0lw6iwpjx8vd81qsgqdzqhu3x2wqdgsu5p12a6ega',
                channelName: null,
                detail: 'Occaecati voluptas pariatur totam cumque laudantium non. Qui assumenda excepturi omnis inventore consectetur aperiam voluptas ducimus rem. Enim porro ut voluptatum aut voluptatem optio. Nemo labore alias quasi voluptates et voluptatibus excepturi.',
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
                tenantId: '1050730b-81f4-4a0f-bc54-6ce1c9d09d18',
                tenantCode: '6caua93lwmf80zzd2wbm2pon8u94mfp8i0bm83lwsndri7n5vc',
                systemId: '2704c4f2-caf8-469c-9843-fc2827704b14',
                systemName: '929bf8w1lz3ah25e0x5s',
                executionId: '22c4f113-c5c1-43ba-8220-96b803fdb1b1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 06:59:34',
                executionMonitoringStartAt: '2021-05-23 08:07:14',
                executionMonitoringEndAt: '2021-05-22 19:35:43',
                status: 'UNREGISTERED',
                channelHash: '874qzwnqzan981d8psoon7ycgbr7hhnggsb5znuw',
                channelSapId: '4s9eet1cau088no3aky9litn5aq2ql95gqarvu2zascclj9fgy',
                channelParty: '83ixmvya49s0ernncwokrj5i54o5dyckctohji49d7k3ltwqxkwelaswpsqzsonr1p34o276fyxbh8r8ajwjkjq7jz21279zn6vs6hxdw9uo695x1sjoit27v5tmxlfxwzcmmdsj2lfzzqtoab76545kcssbnkvd',
                channelComponent: 'pom4h5dceshpjh21jhre32jamig8kd9iunxzd19oy02z084y36vfb4roha8mafnjun0kyf2u3hm2wk5zub2uwp8z6she5reb9353ugvgp7n1blsuy0w0vz55qp3744jiuluxm94umdapw7xdl1461vzfxwnw9okp',
                channelName: 'am7fnc9t18r1bby3favrdfewu16j0w544go18fr7rxpmt7dnq2rhcuz8o6dd7k2wlyt4ybe4zsb8qvielqacygpf6eg0ddcskkpsj9w5u0hc1bo1us0i2piosxxkp4j4vs8gc67gdkmgygvvxd7112jwdv6bkvar',
                detail: 'Quia nam amet sint. Vero voluptatem rerum dolores reiciendis provident. Et eaque vitae quod temporibus voluptas. Molestiae exercitationem voluptatem culpa tenetur ipsa. Est eaque odit eum vitae aut.',
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
                id: 'bb0a1dd6-ed85-43b7-9565-c56bd73b6a13',
                tenantCode: 'dm5ktg4jj6acpxxgdfqd2vssc5uete1xyeagqikr29ln75t67e',
                systemId: '40484051-309d-4823-b6dc-62b9fc6b6ba0',
                systemName: 'nxrw9b2vfbg70krj11ru',
                executionId: 'eb0de306-27e7-4cf3-aa7b-bc6204f50905',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-22 21:59:33',
                executionMonitoringStartAt: '2021-05-22 22:50:12',
                executionMonitoringEndAt: '2021-05-23 07:59:49',
                status: 'STOPPED',
                channelHash: '2ng4vjo9xl060451ooemvchd6ffe2orvxivgdz9f',
                channelSapId: 'koi1khlx5xx9gxwwwe477w1xhss1cplq4yuv0qvk7uaorqsy0w',
                channelParty: '7l6x2fn7agopyjtod6xqyvwbaqyu2mwbqbw3z7tmm3t2j2v2hx9c0eojah2x5mfjj3wclc9w77u5ix4imafpgffo67ee0efuqqj87xknn3exwsi3n0lbyscvg4lvp17yi8ibmiwy4ub50ft8dy99seprtl5vt6m2',
                channelComponent: 'n89ov0srtgs2m5pehv5j956wxoaidgd8vmce58dvuuydp94dnasi14y9x3a3ifj1z9hh8ff1wpwt4t1sf6fevpkroya9e7j5jy5jlxqntrb6ogcrl6agc1tx06vgb837z6jwx7gau8c9npgbjf6oic84zxba8wdm',
                channelName: 'a17pnbirp5brnxglil9dx6b9efo82ue2pvfz23ioakwg5r82rbjj3hrckog6fmz2vmdzyj4l3jhc6twqtxkyxa1tmokb1ry2b2ec5jrzi3185c364t8j56qy97erx933iggb2fvgziijwx4bknejw6ki86xbkdlh',
                detail: 'Eius et optio tempora rem. Officiis quidem quam rerum vitae voluptatum laudantium eveniet. Eveniet est non. Molestiae omnis ducimus optio dolorem et voluptas. Fugit non beatae incidunt et eveniet harum et.',
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
                id: '028a6626-1c39-413b-af0b-7b8eb9fb90a2',
                tenantId: 'a9c7470e-639a-42fc-a16d-65a6b27be12c',
                systemId: '8e1c4cc3-93a3-4085-8c29-f2aeb3f45b55',
                systemName: '82ne4a7irtpoxootny9d',
                executionId: 'dd2cbc1b-945a-4539-a083-54c02b73512c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-22 15:03:28',
                executionMonitoringStartAt: '2021-05-22 16:13:57',
                executionMonitoringEndAt: '2021-05-23 09:27:15',
                status: 'SUCCESSFUL',
                channelHash: '8z7xnkkeeum4v055a16mmj4u82hq8qxbtwws3d99',
                channelSapId: '2op87rmyhs6f3qzqlwxo8r42x7ovrsn3dpfjcaacl1a42s2xnf',
                channelParty: 'bewbnj828b8s25lwvwp1f786gm29yu4dgdfe73cdun58esal4l9xfr5c7lk8f78ob4yzwj3b0a1p2r8k8tgdertx6cgypjz4fen9e65mcxgjc5ztuem1fjee6rpp102ijmw0a0ifbdya037zar87cp8so7b7fk7a',
                channelComponent: '2z1p3oeos9ymafpwd7djbmb1n2y2ku0mk92d1y23lhy5093s9yi3mun74a9fkdjd68k01j9kupr3b9wiqw10p55m7g1mr5givvgeasfaubmff29uwdtnr6g4i1hlapynxwmimzrs16v0x4wln89v7h41ozc18346',
                channelName: 'jzp4wyh4vswmo60daob1796spqy9p9cb1juejllusz8kdrzy18iipoyomcfqilngp3r4k9valnuhmulwfqqxemfk1o3eygolnh0hqss5bv3g0wxvwb0zxr9ovrd5bxwlptr3fivz0ozny9tg72x2sblgo1np8j8s',
                detail: 'Quis culpa eum fuga delectus. Quod recusandae eius delectus quod inventore. Minima ullam vel est.',
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
                id: '5a4ae1b1-314a-4927-809e-412ef93ecab4',
                tenantId: 'f16c87ab-ec4e-4d5e-9e1e-108547f93196',
                tenantCode: 'qoloe5lxmf52kycv6utl9bom2bhpupfdgpowexizbxv3hvo7cw',
                systemName: 'b1jdhxvigh615b65qzqw',
                executionId: '5e8d6203-7f43-4d7f-b060-e95c3c87982b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 06:16:39',
                executionMonitoringStartAt: '2021-05-22 18:54:05',
                executionMonitoringEndAt: '2021-05-23 01:36:33',
                status: 'SUCCESSFUL',
                channelHash: '4hfeo8keg3hen280uvm6e8rkmehsrazydgo6kaqq',
                channelSapId: 'ysl0q1v378lr6miciu9lrihlaablz14srlclcdtqqklyh664y5',
                channelParty: 'h8mtbhov7eam9vqpj87z43h3z1dx6ywj6plvga3x8yyhrkfnhvfhbqq2u5r1ixgofidigogbin7jxi13wpsvgymybs1qusmc6vo8li0q9nf52h53r36wmw85hmja9nrga0lnjd5gfk5vpng15qebca5k4frz363o',
                channelComponent: 'fuvedaeczyhddorcfn14374rmtlihdi9604cqzyagf0ln6w32knwfk0rvtyb3mlota96f4eb97fhtielzo5oxqxehbrqnkvjh5y2g95fa2qaobysdq46dy5h94q24eeygj14vfqebpg0arc4bbd1g8j94xngp1sn',
                channelName: 'agc99ocfyhz5ud4mlm2cj0jto41otgbiy57m1gozf3nn2p28ms7tyam0t6b80a243fidyg1l0do6pcqgliexsygkjhnvdsaz0b49hwo5d75fpjulmsop0xfhyvfikr4zl13q7mhxwue9x88h0ec9tw9io31s0tyl',
                detail: 'Omnis quae architecto quidem omnis aperiam nesciunt quisquam eos. Dolores voluptatem laudantium atque optio suscipit officiis eum. Veritatis sint distinctio ducimus. Natus accusamus doloribus sapiente omnis cumque dolorum.',
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
                id: '26d95ef3-adae-4891-a9e1-183d3d0fdd5b',
                tenantId: '8ac2ad41-c514-4f48-873a-828509079ab2',
                tenantCode: 'ui8yxl9i7gixekalz69aiuow5i9fmd2ydplycncpmeil5tovrq',
                systemId: '103dfef7-57c1-4af0-9ca2-3dc5b72a6241',
                executionId: '87590769-26f2-4d42-a898-bd61e4d758a9',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 10:13:41',
                executionMonitoringStartAt: '2021-05-23 01:39:38',
                executionMonitoringEndAt: '2021-05-23 06:45:06',
                status: 'INACTIVE',
                channelHash: 'h61kc85sx5aodaelxhpjk35phyfr71lysysnb913',
                channelSapId: 'zvs1dkztkkp4c1i791d1ijdvk9cgl56zq76px8fnebnu70isjj',
                channelParty: '4iiff9h0vm84tk068skn3450jlmfuezm5p1wepviq940akkjapfoj2b0rmg54r74ovptnrefk588qpqu51qdciffe8b13vivt07qqf1ahw3iypk0hxgeesep86nb1esywdre84qso52kpfejegdtrsjcgahsbzmu',
                channelComponent: 'zpb95mwaj3xmzq4o7auw9ug5l4pzmluhszn5f60ah94ib334g6kjo28m49mj0l6sz86m1d87wf6n84lckqujqapa0eokoofmlvdwzqlhigmtkfo6ctmzfv4vq8ys9owy2l4yk2c5ay4rwa40t0m76z2cx6z00wxk',
                channelName: 'nw1b0rqt75tnuhuf6lhg5brnbxbi3sawvzwmaron4ced21zf78zlp5b1yckvge43addisnd4vt9o975en6cbubi4zg4bssrb8clynaa87stjg2haug9yz03zy916wfiqqk0rt3z8zu9ptjs9wr5686vknf3y3zxi',
                detail: 'Voluptatem quos laboriosam nostrum rem sed eius. Dolores natus dolorum ipsum ea vel est odio quo ut. Doloribus qui dolor fuga itaque consectetur. Non autem quo. Ab et sunt expedita quam. Ut optio sint perferendis quisquam maxime.',
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
                id: '22a44907-bbf7-488a-9761-98a7d245fff9',
                tenantId: '06260c21-3a5e-4e01-934a-e574e4746ec6',
                tenantCode: 'ocqw3z5ietsjhsln48o7xor6etdpap50x34i64dvtklqvyrn91',
                systemId: '2ec35bbe-d46d-4f58-907f-b80c4bdb99ef',
                systemName: 'xad0au8fqynmyry0eehl',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 13:31:35',
                executionMonitoringStartAt: '2021-05-23 01:51:49',
                executionMonitoringEndAt: '2021-05-22 23:31:12',
                status: 'INACTIVE',
                channelHash: 'knhzmuu7x811qlua4ohu9yx4q2yfizeparffoshs',
                channelSapId: 'of2oor6lm2ig5fz8isbpcwt9cex6g7b3a8bdebt03v0w6edmfq',
                channelParty: 'pueq0t25n56pl4o8yrz64xypzx8likmb79d76viuwldinndfo36kuyhbodahy7v6qhwws5ewihw96pwmvl0k2nf781u0qn4pk66k0isqw8mm16v0fj558dbi8caxtq6qjmqpmyu1mka39bxiuwgg3k1g5d75xanm',
                channelComponent: 'we5lafiye5mq5f4x23lv4ga86oef4i64xg2g9dmxmodf68wdojqtxecz85178odvd4m2q82xoysn4esaa1tx6dldk7c40musy0aysd85f9cqhubvj7gbwurhap7vdppj1ijm4xb1fcckqxll7fw3up538tun233m',
                channelName: '9vv16t2krbcq7vd38nf58xzz3ubi2c1bzekngcr85116s0d9avdqsp8q69nn3svzm2tynh533gmmjzfrc1m7ihwd30djo8byh171zs0pv51wbfmugzt4ww6rclei435g503fjx0fh3z7fx4k2q8c0asxnjxykiyi',
                detail: 'Quae officia ipsam repellat consequatur soluta. Ducimus soluta quia corporis maiores numquam deleniti quia nulla. Et atque error natus. A quia fuga. Sit est fugiat fugit non numquam neque ea.',
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
                id: '5ec0d3fe-ad58-4aad-b238-4d070ad6c1d8',
                tenantId: '76d6e67c-4246-496b-aa7d-a2e8ad862aba',
                tenantCode: '4b72ikbkuqmo8fdbdobnv8sgcjdxsqh6zk1hu7ckvyueebfaqo',
                systemId: '169ff891-5c63-4670-81c9-37149625d6b9',
                systemName: 'rnivzzvgpgpggcpr4rd1',
                executionId: 'e28d23db-80b6-4385-bfb6-37b842258ff4',
                executionExecutedAt: '2021-05-23 02:54:56',
                executionMonitoringStartAt: '2021-05-23 02:26:04',
                executionMonitoringEndAt: '2021-05-23 02:32:21',
                status: 'UNKNOWN',
                channelHash: 'oqpit65bw0103ke9mkh18hueejzs8z8eavbf10u1',
                channelSapId: '1ivvroet3yov1ag4msx991ribl1565r2gg6molt1giba311cao',
                channelParty: 'gm1lfs8wxty126012kq3gikgnnjmw7p1u661aynamnf5bpxx8otvf73ia2g190wywqzdn1i7lwi55k9hmgcxx1d9an6k1danczmuxx224g49zlq7mg0fs9xx87sih5x45ue6zyamswjc6hf0o02z0lprg2cf29va',
                channelComponent: 'rxylb9wc9gcctn2aq4p7cmpownocdvkkfosnr403klhxrgrhma1geu4flcrzdfzbn231zaujhbxgc873alioemyhl2rh8xw2hsfjwekazme6jgeny5bhqn8h6kf3r6dftum6i47p7iif69dm7mt7sivc4ls4r3p8',
                channelName: 'zjb98i1gm7uakup011o9edpcpaz74o0desdp1jxid1p50suz4odxrq8jyin33ygihczq0z7ghwysjg26hwi98hri1i4227djz7hdfewwy9nve75majjbqefsmc49zerunjujqsgvfj1lvbwkm8a7j3p5qa1se1rg',
                detail: 'Sunt voluptate perferendis cum. Incidunt in sed consectetur sit ducimus neque sit vitae omnis. Illum repellat debitis consequatur laborum.',
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
                id: '3f33bb8a-6ec5-4f77-82f3-82120602fd65',
                tenantId: 'ea25113c-4d26-43b2-9c58-cf492ecf7ca5',
                tenantCode: 'qxfp5hq1oxrchuewwzkkmatidqqbmdxl1x7yleev0hni7ndr92',
                systemId: '9ee101bd-d1ac-422a-b318-0c64a56c3ad0',
                systemName: '5y30xv25sizsdtdd69jo',
                executionId: 'c4d945b0-a0f1-440d-b585-92cd0851a2ff',
                executionType: 'DETAIL',
                executionMonitoringStartAt: '2021-05-23 12:52:06',
                executionMonitoringEndAt: '2021-05-23 09:59:28',
                status: 'INACTIVE',
                channelHash: '9bl51a0fv3kah0abajfyjz9eqymwdci7ehfgogml',
                channelSapId: 'zv1y6h4e7j1n5np1txqky521kep5ebgsnjgufk0iuka7v5nmw5',
                channelParty: '6bm97lgnlnviih991rg1iczofio7iv290v01t590t7mmoz0aatutadbrddjys0386z4j2xveni36e6piybt5plxaf0ugc5y4kec48f7lgfolkmuh7nz2urar5gj3mk0xtxmjcwi28333t8pjl1cj6wg6uo92uq3q',
                channelComponent: '6i2cldzyln6aa7opt5evraeetskkqyvldnu6r2n1ys9a37stlsz46qslkgpssepf5egwa0w5nlmo7q130bvxobjvibokgq1exr3l4p1xb8tw926mt7aqkj460esiwwodagmt5liq9pkb8u9jl4gkrc4aviwhscp0',
                channelName: 'vhsrxrcpozv1t45g890x52p2ef7jt3herqnqmqzc8mgr6qqd577bq217omq2pnz3c10sxm0dlnhc6ktszhjpqgk57ffrd6o3tzm8s7zp4bxjlomdllt0i4oq40bs3c2hk9njq25j4h5nmnodwbu7awm8r2ru0773',
                detail: 'Enim soluta quibusdam et tenetur. Et est esse. Reprehenderit fugit quos minus nesciunt ipsa quas non. Possimus voluptatem esse cupiditate accusantium. Voluptatibus neque ex exercitationem et. Aut molestiae quisquam ab dicta ut ipsa nulla enim voluptas.',
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
                id: '3eb81188-4069-4b8c-9c54-00f5f4df30c4',
                tenantId: 'da8b0cf7-59fb-4da2-b815-72a9675b7a6c',
                tenantCode: '4rbde2pw0sazlnu963cy09yxsebxydw521b6cyqmwadkahb8up',
                systemId: '72b46ce6-3652-4fbb-b7f3-c429fc72b925',
                systemName: 'bxvvs8sly8r6r8oguabp',
                executionId: '041abbf7-3355-4045-bf82-9e468ea5a5f2',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 10:45:46',
                executionMonitoringEndAt: '2021-05-23 10:54:27',
                status: 'UNKNOWN',
                channelHash: 'lhmwto4ald013kr01dhhhj463gpdvyheeqt88q5c',
                channelSapId: 'bs9gm62343vmmsa0evas1igtminn9cphc5snag1tpxehah7h7a',
                channelParty: 'o7q3i0zupf01dhjrq48q6b8wmaj8q9dezcltfqhhwzd2mpbsk7msdsqxdrz48mewlv9hm5yd6kh3iuqao52gao38w72y98bpvjdcabpkbk3qxyu1imkq5py4c0blmc3u4zaf4ttvl2fnxh6cfri9yrnmrxcjyhph',
                channelComponent: 'ftettzli60pawa259jxgn96fh7jbybaqggnyxipgyvncvejrfc9sd7fh0fiediqvmag4rgl6apw6e0oifxb75p5te4zbki0fmplf7477s5963qp1g4gd1d8e9t0n0zk4gh26cafx8k685g17x2tyt2dwn0z3a812',
                channelName: 'iv1pcr3zlyif82fhw6bsjj01xrqgafju9u5qn9x3rhs9937ilbkquaeijbylhhv0zr0qnddkxtbrage4yvq6an9zg4t8292wjvlf5yze4wwzf86aj6yjrv59gvc5jpstwr8bqeb0mwqg5fv5goa414egusp0eqa4',
                detail: 'Praesentium odit rerum. Debitis doloremque facere. Et aut est quia quia. Repudiandae facilis non aperiam rerum quam. Iure incidunt sequi. Delectus et eveniet et non aperiam qui quis dolores.',
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
                id: '796505b7-2205-4cef-9760-2b5914f3bb07',
                tenantId: 'ce25d137-dc10-4724-a5de-70dd6c85b91b',
                tenantCode: '41qi1xhwyjsvzijwp4go4n0n3azum3pdq3ymd1m2uwbe896nii',
                systemId: '0aa45642-cd75-4338-b2c5-0ba869d10e20',
                systemName: '5gkuyp1rjo24t4yskurg',
                executionId: '653f661c-bf2e-4b0a-aa56-498b6827a44f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-22 16:54:22',
                executionMonitoringStartAt: '2021-05-23 05:08:02',
                status: 'UNKNOWN',
                channelHash: 'zjzl1szce0guqb8fff9q3r3vwxv2t2hcjy7lpfw5',
                channelSapId: '3jhbs4weo6la9qx9o6wv0gpzk974dmmkwlnhkg1o237cwss4ns',
                channelParty: 'a34gmjikwqb8bjp2byd3zs3flblw2gjqw159wbxo958ltywu0kqjr1ucdhgke5wh4dstjf1wy2hwt1ip8uu47h4cap8kmhzju52zrbik0ppv7jl88se1hnhmpxa7ow9zyuwuq1gjvusyjmjbth0innny08f0mruo',
                channelComponent: 'kr8725dd1sbhpse4tj6jgpf76myk15kr3saoekx7dppwa1r80smb0t5uezwu0lkp0cnxx8uq4yciox7qei25hmpo81ud5lvjdpft0nb9acubtrhlgj9uxllnsktsy9bwuzzcgth05nnvz830k1sdisd0me47kjqg',
                channelName: 'jdeojhfgtn4dcw8hdk364bkzs4ocyqf5s6b7orkhvdqy4jc28guifraupbw0md7biq98o80vrrvbe3rs2vdscfmi9rpujfimrtucm5wbw5ufio7wnark4tu06rfq36l9oihrhjctlbpfz6ra1h1pc92p89s7adj2',
                detail: 'Fugiat recusandae aut tempora quibusdam. Maxime magni nobis quibusdam quo molestias. Dolores iste odit rem qui qui fugit nesciunt. At assumenda veniam ipsum nisi sunt porro minus consequuntur rerum. Ducimus enim voluptatibus repudiandae nesciunt aliquid cum culpa autem praesentium. Aut et rem dolorem quia et est ipsum ipsam.',
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
                id: '4c784652-b7bf-4b74-922c-b184effaf316',
                tenantId: '9d458f35-398a-4d0b-8963-8a1a82560826',
                tenantCode: 'l02q21zndbdcsmvgr8p7sso46ltjs1v4486eaq295rwnnnwx0b',
                systemId: 'ec430880-b80c-4e1a-b44b-31ff94218612',
                systemName: 'yrf7pa2jiqnjo200wflu',
                executionId: 'a8a55920-c5d4-4a2d-9126-fc10a8fc6f00',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 06:57:32',
                executionMonitoringStartAt: '2021-05-23 13:49:26',
                executionMonitoringEndAt: '2021-05-22 18:06:42',
                channelHash: '672nk8cbv2tcmq9y9xlwdeoq5lcwgo3a7lhhcyr3',
                channelSapId: 'rcsn1zdybb4t9dc779s81znbc33vulwk23m00urr9zicyxdt3p',
                channelParty: '23mvzptr9u89redpqrdbfcc9xn5uy9nmlxktv9whar8ma1bfcfg0vbp1m39qq5kh2jyderulq6voi4newdrj5wu8qbupe7r35mm0ss2ptoard68qxz6hq96qk1jhv3f2o3rcdprkye8teyejhrk09oopm69e4qnl',
                channelComponent: 's01ixvlrs7ln2vc0ktsyxneqjh4m429p7gq7u1u6qdc13u0xnlrk3hb9pe8ke7bfpf8g0c69derlz3x9w4qv1jnqu208zrzsr560oh04kg3s40di7mwgekrqzzqnrnct49881qk3kbqpud8mmkf39pt0ggw0owuv',
                channelName: '5no3igjt3c2qci55oh1ktun5lj3itdlcht91sxswn9bh4nl7klpumogf4s12s0s6311kfoh1r9y8agreuktdhq896ijjy6pafn6onarqwoy6fdo67zwed2myrf16fy58p4phea9hadv0jjeqkxgha6cykhqcrvrv',
                detail: 'Et ex et unde ut occaecati corrupti. Ab voluptatem maiores illum perferendis magnam optio iusto. Sit quia sit.',
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
                id: '34f555da-0e0a-4c16-b6b7-3c8cab8c84a3',
                tenantId: 'a205d65e-9eba-4c24-afdd-bc82a0c44fe4',
                tenantCode: '5c2wgpsfo3w0idjvmliyvzo8jtwed60e0tz1quc1ydlt12ts2y',
                systemId: '35dae2b6-7579-4946-afcd-e3c0ead0e82e',
                systemName: 'nu5nwucqethyfsf38el3',
                executionId: '4ecc408b-a51e-4080-a5e8-248f0ad6a52d',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-22 19:36:04',
                executionMonitoringStartAt: '2021-05-23 12:58:18',
                executionMonitoringEndAt: '2021-05-22 17:31:27',
                status: 'INACTIVE',
                channelSapId: 'ciqv0478nkhdy2uusqq052jcuqgzq8j9gx09p4ababfe75rhhx',
                channelParty: 'nqn660xftvmdhlq66vqb1x3bptiqnlnrnjye5gsvowm0b9i9slu24spe7cpxruq4aqkr65jkf9lyuzzmhxad6vqh0964bwwp1jt4h7v4itt7mzajdx9wot9hc6lsq150wfe0pc32lnyrg46ru28roud55xp27vhy',
                channelComponent: '53av89obivmvpmz8p20m34j2r6sqq2xnlfay2z8ddibt81h7i1f6j7w1g9hbbd3c4kuxqdp0gxj5taraaea244xf3q3z11weze35s78567bgbxw6i27u6m22qpq94613mzfha17u8x08pi1mvvdtqbm9227x7beu',
                channelName: 'garerfp7fta7xsq33shxfvy17tn4i7wcdelrvat2cgo0lrd82bkvlbwehhlhrcl5jgs4jl67uzbyc11nfggdz2us69zkpkcvegcu0r72do1znm0uxyw9hia98nxqbwzb4lyu0n4gtz423wtwnt5a2e1ej9kew60o',
                detail: 'Incidunt earum dolorem excepturi omnis illum. Sit consequatur quibusdam. Omnis ea blanditiis similique sunt. Sunt optio recusandae ut ducimus ipsum.',
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
                id: 'a35aeda8-1e5e-4c8a-b315-25b55a6bca6b',
                tenantId: '55896746-2ff4-404d-9953-328af735c139',
                tenantCode: '1knxj9qb942tkq1gxmsuq15kt73qjgbkt8arxxt3nlsoac3vdd',
                systemId: '5771fb86-4c44-4ee0-a0e3-418421d31702',
                systemName: 'mkjd0yaqhcwud2yhxyxv',
                executionId: '14cf7a60-9cbf-49a3-86b3-8f0c9bb172cf',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 06:33:18',
                executionMonitoringStartAt: '2021-05-23 07:12:52',
                executionMonitoringEndAt: '2021-05-22 23:16:40',
                status: 'UNREGISTERED',
                channelHash: '4cf61jq36uxnessgw0ropwh88b9h51ixp9bzkjmh',
                channelParty: '4sicdc8d68l48zz8nbzfzfgmnbg8fe4sopw618nzufxb0ifgzvirprxur6r1dre1q5qz7chzor80douoq221c8az6p9enza0zkepq6odhg44tqsx5lgzkfh9hedzqh7vpeg0slh8t1t62sv18m5ooq8d1bsihns3',
                channelComponent: '7qalr11dun6rfscjr3u2ojzsoz1fiz60hi1d6mczxfsaqxmkzkhnnanhnc3l2ykr35scb06m294pmr8fexplspnhpdw84x548qpcfj897ktqolnyemm5lbutnhedn9evgb5jj3pfrrcx9wbpo5mt0zht1tuzmsuu',
                channelName: 'rd8zedgpvskcqonhy54pc3xtjg4dkf55inbeoud8y7xqdvaqntx4ds47365s3302qyql9msjt0lkr2hgt4lu1c6gtxcpdsawzc371p098xx1kfzgt4v1uuhi1o8uub5sed7q73fdwwy4ojkxvov54iixvx7022oq',
                detail: 'Corrupti illum vitae ut delectus saepe. Beatae reprehenderit perspiciatis rerum et. Quas iste tempore.',
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
                id: 'e0e10832-b8c5-4021-b2a2-6c6d42acc4cc',
                tenantId: '1deb9c41-d362-40b0-badf-01d96ba3d79b',
                tenantCode: 'j3516t24h7a9ez9rtt3e20v8ws0tjo1tld1xtj599l9c35dl5h',
                systemId: '4f37ee06-b9ce-4cf7-8a6c-45964eacdfc1',
                systemName: '4ycogoj3xhnw83cougu7',
                executionId: 'c79cbaef-2493-4ca0-b6a6-4435dc03d6a7',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 08:28:55',
                executionMonitoringStartAt: '2021-05-22 23:23:58',
                executionMonitoringEndAt: '2021-05-22 21:44:53',
                status: 'SUCCESSFUL',
                channelHash: 'ec53l4llu92ig81brd6vtj5qsdmbzkh76dnlfm4x',
                channelSapId: 'hps4rb37cutieouh38vmije5ptgqnyms4wdtlxkaaqzvr04af3',
                channelParty: 'ijlf8mrijtir3iym9f7zw5er5640ehjrwwwfwps9cv307u467t4if7cc9klo2d6xl8ripudkt6awvx1e3pp0exmhaghitjtw85mlqed0xt1gwh46ax0pb8agu18g9ghlpe0xbnxbtlti1pq0hy3tpvkaby1tqrno',
                channelName: '4quiz0p59eevtr9h0t8te9ampp5x1wc8885qk0w56vl1rbu7neypzti8092tigl25tcw7dqjj5u765xb0oc8hgc4pif2sjjih6js8w4ejgjpvltmn3xrrlysqak9g9uy7cjn686qg6cbqyculrzbctk5c89imfbf',
                detail: 'Sit illum ratione doloribus. Sit id ipsa atque sunt. Iusto ut sed sed. Hic in deserunt aperiam et temporibus autem. Ullam voluptas molestiae consectetur dolorem officiis perspiciatis sunt ex expedita.',
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
                id: 'c593d074-77f8-4f4e-9e55-bee36c710b8d',
                tenantId: '0bf6c380-7730-486b-988b-3b6ac9619ec8',
                tenantCode: '5nmxeczqv725qubteo6hi3tlkkdt5izr6ko2apziadkcf0iyiw',
                systemId: '71025fad-748d-4f1e-af02-f8a00e3c5ab1',
                systemName: 'xwl7gssomo4f5iowisqm',
                executionId: 'ac99f9af-e9c1-4430-b2bc-7f07a12cd933',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 12:17:24',
                executionMonitoringStartAt: '2021-05-23 08:27:47',
                executionMonitoringEndAt: '2021-05-23 06:36:31',
                status: 'UNKNOWN',
                channelHash: 'mxdd01rm2sstkenvar4ucjamrim9zlrwlqlrk94z',
                channelSapId: 'sbumydjhse0dj8abiol6yesrldv8l5jd8tuxyt3vvesy9mus9q',
                channelParty: '5cew6lvhq13ywpz87t4q95up0frfg2zvxju70ckdxwfdhhqq5gz2saqwb34orfbur01z2vzmc38cas6vp3iqafpuof3g3z3iwg1crzxuamjrlqlfscdl15ju3s53laqxmsjjn7qmmkl3kolg8k1rvcnlq91u564e',
                channelComponent: 'y8kr9np7fjkmt4rgcjm14pni01wag20e3kv6zl8ijfn4j5si5nytff0tx4q1i8kgf55p2ym2sq9eq2vhqnmxdrg49xj2cejxhncg84mxfwi4jzgquvaxzwc2lg3ll9hqqvr3uqjyzdbco1nrf0r507egyrwkgigr',
                detail: 'Eveniet omnis facilis non autem sequi. Est id qui. Ullam voluptates nihil vero est molestiae dolores qui consequatur corporis. Doloribus molestiae sit dolore aliquam. Distinctio ex nemo ipsam voluptas enim fugit velit necessitatibus voluptatibus. Vitae officia velit.',
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
                id: 'puc7yiqnv4hs12omgubbmfaur2zgvy4pd6wlt',
                tenantId: 'ef379d55-18ca-4d5b-bdf4-b729b9433d94',
                tenantCode: 'grwntzzu668wvkh0lfls8d6akazjip4pz61dqm7q1obawhk695',
                systemId: '0f64e1c2-e54e-4c5f-aea8-12b2dc27718a',
                systemName: '7erf99qj2ok6qlwcdz5y',
                executionId: '4827604a-c522-4a86-bf3e-e0d409e4a388',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 09:39:00',
                executionMonitoringStartAt: '2021-05-23 10:17:42',
                executionMonitoringEndAt: '2021-05-23 03:04:37',
                status: 'ERROR',
                channelHash: 'qbhwwfnovpszmz6iwvhss7szcfm7fnxukqy7omri',
                channelSapId: '17pmetv4uxc42pajrlnlpxdrtgk4zdwosx3jmdi3y7so0jfbqn',
                channelParty: 'xut0nvqso3l7iqp8qmwjydmttrtpztlv8z0o011hqym27pllpkxgdn4ujnp63358j1na50oosb58c1pgjimwysfji1sdabkxwqjyaw545kzt2s92u08x626r0zc56ah6i4qqpss8ojda25g3rc4ufavzftm53f02',
                channelComponent: 'ayj6ezv0sztm3ybn5id7qusl6w52x9dd8pmitc17cgj9u1kgc45er1gr389i35f15eu3wbsm14rsyhs0kjskyqrxr88igyq546s9jrcafgq4mgtwjw6eojpdjrn0bzblmzdsxpmtw201zwlr08t4k62mp73fd31f',
                channelName: 'j64wcfbnnt7xaylynkpg1oudsdd8gvqrrtoybj60xqzcfpcid9izap8ms1x24wqx76om6hb5d39orsbnpcouttja9cce22v6mmf2aafw14je9tm9ggyl32hpmxjnyvif6s2k5b868nj6ga3fpedfvr51zt7dt1cy',
                detail: 'Ut dolores quia tempora distinctio eveniet nulla laboriosam omnis aut. Voluptas autem id accusamus repudiandae numquam a qui nostrum. Quis voluptatibus provident ex.',
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
                id: '061d9b47-038c-4672-959a-217ecff06887',
                tenantId: 'zls0hufd7g8rfgmzuojt32dqcnxmfg49rxbtt',
                tenantCode: '7el2agcfdk61c5dh18x4lql8n9s2njqehoj4auq8nqegwpie0s',
                systemId: 'c837e17c-7363-4ea9-804d-d068bfe2a806',
                systemName: 'a5kqwv452hvl49vali1a',
                executionId: '71c7bcb7-59cd-48a4-8904-d7c524e155ee',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 01:56:45',
                executionMonitoringStartAt: '2021-05-22 19:11:29',
                executionMonitoringEndAt: '2021-05-23 00:24:53',
                status: 'ERROR',
                channelHash: '9q29ct8ncuf0dux7h2p3zw3nyzzoocrbf5h7z04e',
                channelSapId: '7w52lh8eefjtm2qr9xtzcxio6l892yayh533fkip8cty3qjw64',
                channelParty: 'm7so0kmxmxa395lymctjrr3vyodxt5uzb4uh0resn8g8uufe4eqd6ou4mj8acl0plsord8fg3qh3qez6dgqn1zv1a3ji0y8sss687i00i6y4xzu41e1760j4tkrpdh7h9x1lvk2wzos1hn0us26da6gpl2x19cyd',
                channelComponent: 'rmni1ct8jdcsvv6pr6h822zls4fe6sti9muoqy0zxar9dj6e94pl74qavjcb5m8zwkl42bd3ojxg78kje6nxabyytxdh5g4q9dkczchygdkop4i7lii55n7o8s8sen23yuifb6u1pzyu4u47ubt41b1ei97enz2m',
                channelName: 'p5n2did43nkfzwyjumratx6dubcj7sso2pk1quex3s11mgd2xrb8uzo8hnnowyvd6yyg3mcr9yhadwgtoa45duopyv2mmijbxzc08y4a7nul4kycxx8moc9uckmyv68f0ildy9msgsu7i8cbsorlny2oxgje3d27',
                detail: 'Facilis inventore qui labore dolorem amet odio velit cum est. Autem est ut pariatur animi eius molestiae omnis. Excepturi ut aperiam facilis rerum repellat. Hic harum iure dolores repudiandae iure non repellat. Aut dignissimos qui consequatur facere odit delectus reiciendis repudiandae corrupti. Excepturi qui consequatur.',
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
                id: 'e37525f2-32b3-4cdf-8de7-92f84bf553de',
                tenantId: '9ec6bf94-0b3c-4029-ac7b-47438bce9fce',
                tenantCode: 'x5wbzdlc1lz10ujdo8n4wkp25rih4bg38cw6blyadjr5aq43ni',
                systemId: 'pxfkxo59wcgqnlfgv064xvm1q9ir7guyebhwg',
                systemName: '6ufmfgkbs02dl0kp9n7e',
                executionId: '3c8ac670-87a3-4dd9-881a-664a64a4bd8d',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 13:09:39',
                executionMonitoringStartAt: '2021-05-22 19:16:02',
                executionMonitoringEndAt: '2021-05-23 03:00:05',
                status: 'ERROR',
                channelHash: '44mzw1scd4fakbjeh0fl6jwb57fkhiexkotqx1jg',
                channelSapId: 'q4ieu43i2d6z60kpleivr8d3axvv19lnnitukzyldtydw6j10t',
                channelParty: 'mymvb74g3aukdqzqka42n0d81mq6hwkaas2sdprzs2mnlxdb0jhb1ihjn4os4s68zbnxwb4wg5uk0hln8mqwov51g9gcailr1pes8a67zpbzx43ctsbp549q23lbtefrsf903n86k340au2l9s0psod7aki9qg6z',
                channelComponent: '1po3jsgmrfybvv5lej0uvdwboyolf4kpq0085bt7d45z1yre9unzxmf8cbpqa1uhjri4kk1mwr1d568196i12gdtd5ayxzldrq1hii9p176ee1d07sp65geb6ciibglg929z254qdvz5nbedoshvv2x3botzgunq',
                channelName: 's2humrmmzezk64n6jjcbq8o3xe97698uabmvw4780sima6vr2xm86117ljhzbbz6bc8j7srwmcz7na12cdi32btg47z4d3ytuplww0m0zj3b1qukkeifw8va418yl210f2a6n1957pihbmndqrb9ixdguamrqd8j',
                detail: 'Reprehenderit iste voluptatum unde voluptatem perferendis natus et. Deleniti nihil dignissimos. Est suscipit veniam nobis. Quia vero sit libero distinctio voluptas.',
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
                id: 'e98cc667-d250-4e43-8dd5-a72ee8c50da1',
                tenantId: 'a47b517d-b899-4c93-aa52-a82efc19d685',
                tenantCode: 'qluz0kj3itcte5ytukj7a0b2r2prm6yq002n6pr892zcc4utcb',
                systemId: '14c1bc0c-5828-4eb6-818d-30228d631a18',
                systemName: '9ndkns8nu0r3sggvj5os',
                executionId: 'x8wghd94mowrsur93spb31wvdi9pjzbr4z9yx',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-22 18:42:43',
                executionMonitoringStartAt: '2021-05-23 04:23:37',
                executionMonitoringEndAt: '2021-05-23 06:14:18',
                status: 'INACTIVE',
                channelHash: 'd6jriu650ixrxujp40mglaijjldaodvkqhm46sjm',
                channelSapId: 'cwob2h7937mqw9cke2h63qyhjs28315kv67l3ro57rtjegf3v2',
                channelParty: 'c4qfsycov7afu3zgsz1pfwbzkrvlwlvbuwgfkg9dwagl78lrvz6ke1ecvgkz9umq0mas1jnjgqf2u7cy1wf91aoksckow1nji832c9s9me51tyollskh0epmmamjmi4ay6vfpakudrmg52okbhhw8h1v24gepiaf',
                channelComponent: '0hj6s1jhv5u7x1dvq6qkyarxd0hxk2hy82vgrs7lfn8bmp8n4llqikq9k99tjndn22wtaqds3xygv84mch4tymcqnpvwfoh1o1cmqjir0phpb8uaynrp5et67m1ifr7rt9p227q0kexr62vza9i4facd0y9u5o5g',
                channelName: 'wiseknc63net7xozs0c367dy0sk0gk6hnjd8u9rodrpj7z2c0yt5knjzuk198xccoxjlfznz5jpwtuj1zyf7tflzxclnogldjt8z756pe4k690398wn2yfdcbvka7u7141a98z774jsqrze2wa8v7bopdzvvpbhr',
                detail: 'Rerum quae vitae necessitatibus. Vel accusantium sed delectus. Ut modi necessitatibus occaecati hic dolorem. Sint dolor voluptates temporibus quas praesentium asperiores. Rem nulla neque excepturi accusamus omnis quisquam. Et qui est sit consectetur soluta.',
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
                id: '4ce1d8ff-1f88-4ca3-8e43-3c626eaa0653',
                tenantId: 'ca0595eb-83e8-4116-8f2c-554e1c2a4d40',
                tenantCode: 'sduhpdjdfw0c3bh9sjbpvyztbnxe1587tsbaiqs5ux8lav40lz',
                systemId: '3038f065-936f-42d7-88ba-fbae6b28f4a8',
                systemName: 'vynp1ednkd5pv60qncp9',
                executionId: 'c68f03eb-0b59-4508-beda-ba07628025c6',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-22 17:56:03',
                executionMonitoringStartAt: '2021-05-23 12:52:23',
                executionMonitoringEndAt: '2021-05-22 16:27:27',
                status: 'SUCCESSFUL',
                channelHash: 'n58sfrgwkihcgnq3sttjn33llikao56lx92c5zt03',
                channelSapId: 'orwe71ql2gng1oicnbsqqdxeq2pwteeear9zyo8h8ftjnayonk',
                channelParty: 'gnmtcj85a20s84z4jy9aaq9kcd1um62wvc759h4ydfeebv6tej0uvo3wb1fp8503qca346zsq872dsrmxfmhp2oenzft0f1yif80ua6ma6o0x9il5uw70j999rdo83mt0ks1ro7l51asozrf01nkfgykrzztz22j',
                channelComponent: 'lgbcg19qf1upnbftgtrm26he4l1o6mx7cudtupggbel5wa0lmzwlomu6t6i3y31dxduwj62ollarj4y7e4lexygpbchnlw6wfwvrjsb2mkjv4qd3x9fp3bmjgyqfa28i0wrctyuwfrel70kswihumxi8h2mdhreh',
                channelName: 'sddozd9axbm2t73rvnth0yn7swuyapcwflwa9okv1g6tdqpm0tk1qfnnhb3tujdulyia0kajfgmgrryuphqmam36z8zazok9quwsfk45sgnkw18zezohwvi10y24octldqx0ixmk6it6ksn2vyiz8jd70kjstk9j',
                detail: 'Consequuntur ut est ullam. Eius aut temporibus sunt illum. Deserunt ab culpa fuga aliquam quidem esse distinctio aut. Enim architecto corrupti odio qui temporibus maiores. Adipisci omnis ut consequatur sequi ullam rem incidunt.',
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
                id: '0a00beb2-ee1b-48aa-baaa-8cbbfb5caf86',
                tenantId: '776ea03f-2aa0-45e4-a691-ffdf9ce35a64',
                tenantCode: 'htj5ey6a8ufmgvpfyhq5fvagjwo6pfsslroiau790o25uij3pzs',
                systemId: '8de563b9-400c-4cc5-92f8-33259d9ed689',
                systemName: 'fba9c8elmwu67uhwpwvg',
                executionId: '6c45e095-c931-4c66-afbe-c396be5a6ef2',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 11:05:46',
                executionMonitoringStartAt: '2021-05-22 18:14:47',
                executionMonitoringEndAt: '2021-05-23 11:56:53',
                status: 'UNREGISTERED',
                channelHash: 'wf0gn9qx4y0x5m3wfk23o76tetcsog1blopxv3fz',
                channelSapId: '84m5hcwffcvgg5ke95zwppp8457exuq0mt84ff56zr0j7nkbax',
                channelParty: 't1cs05eap76f1jwfdaxe3uchctp1jj5fvt5azq6y4m4oni78socebewab84q0ghkndvqgy0w8025phbnx7qt2z86y3wdm3f1pqqq5y3n8vikuoqln5vckq1bbzpf6ng8k6yvtdsa981ogyd5hz5m327hikytg2z3',
                channelComponent: 'sz2zqe8qklg0wq6lhttsb3vrzhziylvxrtnd1ez2f37xbitwc5ocsdquj4grjueqltcoe59wfzde942vfa1b63q7dur0nq9j833m952sqcvvrisrnjlel1q3a1pdspebi0a7xq1phptraqfsegl5nm6iax52vmrw',
                channelName: 'pq1o33u8mzn1ozxmvqaedqjqg5lt0jw9xmgg1rp2vd6g9r9ozpwmjmol3kkhf4fbxjnwbl64qnh08es974bu4hspoeekuj2bai3tt2hg6j9c1jkow577v0ucxi35awm6vhy9nbyolfs91vw6y5aip7u27a8rwb0z',
                detail: 'Sit voluptate ipsum doloribus eos a facere modi. Ut qui maxime nostrum cumque iste ad. Voluptatem nihil commodi recusandae quis eos qui natus et. Ipsam non consequatur et ut voluptas. Amet omnis voluptatem distinctio non sit beatae eum iure omnis.',
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
                id: '4118b52a-4345-4d70-a4ac-d64ee733a2d3',
                tenantId: '20d54347-8dcf-4607-b663-0ed455c40e06',
                tenantCode: 'scat795kcy42uv5dwsuz3c4bznafc2uvm6raadjil5je9ghxve',
                systemId: '50e71133-d5e3-4bcc-bf61-6c4cfaed7fb0',
                systemName: 'y8tu7ko2ye0drkkdnokl0',
                executionId: '9e448d1a-80f6-458b-ac93-8baaebc2f0ec',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 10:00:56',
                executionMonitoringStartAt: '2021-05-22 17:03:22',
                executionMonitoringEndAt: '2021-05-23 13:40:29',
                status: 'STOPPED',
                channelHash: 'oqtgalsurhrsp2vrkg4mtvpjwu3bkunubv0j74v7',
                channelSapId: 'tnnyywx32uijhbd4rb0twy2eccttzhcknb4vcexgjqsospe09i',
                channelParty: '1ljk9nsnrzza9wikn4wdarvn9gmouq5putd47meo7ssuc6gr1finw4ivfvotz6gyhn0ptvncni5m506n7pdtq4g6c1t32c8mnazpgpiwfcjfjcnxhvrrfb4iy5zjnqz3cofjjhvm2irosbyh1bwy4pc5o2jwo869',
                channelComponent: 'vicb93zvtauufdtu35p96a3wse64m5na6cbz2aeepuscxhu2t55congz7bmpe996dwvcpqokxxbiro9pr387jzsd4bgf1sdx0jn919dkjf35r7ctnn6eclnyb1te8ky5qh989x9xa1xhw9ks221hz1srspr5479e',
                channelName: 'ne7bkb54m02qoi4d6fckki4yeuurljlq9cev8uepnz6vyxqq9h4ohrj6pttzxdv5eci3h59mgya6o74tjfjkryxkdaxe7z5mriuv1llwsaoig8xmduufuv6js06yxj9cnxrj57boex4c5c96htvjiknvtsuu9elc',
                detail: 'Aut voluptas amet. Soluta et dolores quia alias aut labore debitis. Quo natus perspiciatis sint facere eius. Nemo eaque consequatur tempore commodi in similique. Quasi est perferendis non voluptas mollitia ratione veniam nostrum.',
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
                id: '78df2a80-11ce-4ece-bdeb-97c0c4e385e1',
                tenantId: '9f5c5a04-dd5c-45f9-8153-33dd3f650443',
                tenantCode: 'm2hi6p2dtpqwpg7kj8pwrpc0ud5uhc51ei8g4rs54wlmqai1ke',
                systemId: '3abe3052-a4c6-4104-a501-6238c7b999e0',
                systemName: '7r7hsrm1lsloih8wcvjw',
                executionId: '38004ec2-77bb-47a2-9fdd-5fc396cb14f6',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-22 21:31:55',
                executionMonitoringStartAt: '2021-05-23 10:48:13',
                executionMonitoringEndAt: '2021-05-23 01:07:20',
                status: 'ERROR',
                channelHash: 'dzthkmx42xvd20bh13d1y5qw2msaoe41gcoqpw8t',
                channelSapId: '37s2az26sga4ae8nfl3829dzk5n5jqzxrrncn1ujuaezpzfshq3',
                channelParty: '89skuy8b1xfv8yyvaqwt7pw237sx67k5qbr78j8452wy535lc6npos92amx4dpzx1j4uzgb7j2bden3s9sv11oh0apseqlnjmjlqtkno53ejroxdrpgwvans1l7qs2v5dq1ludjvmcmc26o2pvtgoatdrcphuw20',
                channelComponent: '00uxph7rk1dex9thwzntbd3x02eszu761kx2k4tawiu2xgk2quxnyvdjd2yn9w4oj5teum0mdfs6ujbjnz9ow7gwnnsuwtk6ab3nvfy051y8da4owl0x16t1ikrcpmran919pnylwn4i8p9lujg3ja901h7qne0m',
                channelName: 'u8e490jkjdfzwgg8iggxn37wyx2x7khxea52k885t7mplwsfttubb2wuo09qce5i7h2hpepysbsd9dxqatlxu6bcf2wdufy63e5rv3tkhha06t71nl5l43ze08lphp2cp8smiqpdp3ct65623m70osz8v0hkesc0',
                detail: 'Ex ad sapiente rerum et. Ad molestiae alias. Et voluptate praesentium hic iure vero ipsam cupiditate reiciendis aut. Ab ut sapiente sunt consectetur error adipisci est est. Molestias eaque non ut ut quia aliquid enim. Perferendis odio laudantium cumque fugiat aliquid ut repudiandae facilis.',
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
                id: '9c439e24-d29e-4e6d-9394-ad442fbcf00e',
                tenantId: 'bb38436c-fabe-4cf5-a95b-ad6d562a5e2a',
                tenantCode: '4flndkui4ymidr0y18tst79b9pnzlwekleh799oqpm90f9g01u',
                systemId: '0a2db82f-cce2-4f54-85e3-866e33d00702',
                systemName: 's11amyc1b0lufs5oyeye',
                executionId: 'ee27b8af-4ba4-438f-9b16-7e8263cc116a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 11:40:00',
                executionMonitoringStartAt: '2021-05-23 00:26:35',
                executionMonitoringEndAt: '2021-05-22 17:53:42',
                status: 'ERROR',
                channelHash: 'ivb70sjm7x6kqb285xc44zx3ocbl72000c5mnnbt',
                channelSapId: 'gkiryv6ukbcsxxhf1tvamekx240tnhjquk925lbi0j8aqfexl6',
                channelParty: '0re9lq9j83otnhvpb7bb8681gl2ddlbb8hdsbgoeg023gfmxpc18x2sn8q22wdt9jic2znlrizdu0u8lyefzth0jwjo6kxdzj26ar4p8welpoe2096xxbamqx5ao7g9aji8ncpoxg3th581fjvi7e33ttx1i38bnu',
                channelComponent: 'dj9fpmwenw69k6rlqfznl9c3b3fqezxq3anqocuywx4byk3qv7izl072eqoyzjlpnzhok4bs20najn6aaa44thjlf7unyaro17pwguvxgkdwggojdmhh1o2pe8b64nmhfke2rkhsqzfubjpfu2rtlr1apypdutxc',
                channelName: 'gp0sjqx9jvrawmqcrzzyc6xp9g233qocaa3bevb803ikn7m2qykbzvzvk5vn0d71ahp2r82z71w2djeopenybjqb6gdizc86o8o095avaej8ghnp2xs4agp7q36rbibc3w0tkdy876fkljep5xzqv4g1o2eemcab',
                detail: 'Nihil beatae nesciunt assumenda quia iure sint dolores ipsum. Quia eaque voluptates nobis sunt recusandae laudantium. Magni nisi harum earum nemo nemo nesciunt sed rerum alias. Quia dolorem minus. Eligendi nihil neque est in.',
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
                id: 'a3b203f4-c053-4ff6-ae83-328fa89bec1c',
                tenantId: '049771c5-01db-4e1e-b9d2-a8635d825190',
                tenantCode: 'c4r88kiumw80v8n7e9ddfulel2benb22x40j5oqgcfc8y0fx1q',
                systemId: '3bd48062-7ba5-4147-8670-dd6e53e56c69',
                systemName: 'v6muluay20vxj9nkgoyp',
                executionId: '5b47c46d-3694-460f-9283-b087592cb458',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-22 20:41:14',
                executionMonitoringStartAt: '2021-05-22 17:25:48',
                executionMonitoringEndAt: '2021-05-23 13:15:51',
                status: 'UNREGISTERED',
                channelHash: '95uy6sau95kzvj6hk7h5vx4i6nu7dczo299l7eqm',
                channelSapId: '6qiws5qt77vy1jcwi8ygocc3vvcihq3jaeulc3ykzu9wrfm0vo',
                channelParty: '69wdezox28t3no37w7n26yq5oamoh47q8n7bt81c02sulmpf4q2evshzq0txvu9a1olmzo2r65o51d7t3t8wugbec87e9sbhxef4zprx3kq2x6s90rffdznr8gus0an7j5mtptnxciywzv3p5npgslzyh1it4hwh',
                channelComponent: '6l64lyqaosgjdb5vj6nyshu7zln0g421midrief8yngbfks6harmcvf156zrslhrjti613ll7tzmfylcx6rolq1yd9bjqp7yqjm5p6ltm50v0ldty49lthr6hodivsp7sr27ibcmbn93k588acjpg2t4ei0spzyfk',
                channelName: '3o9kxplbql400v96e68zi7p1hjcxfrz0ulge8vwenap6jzmlakcx5aw7mcpkn5v2qe10gz50c80d3pk4s81gh49s71x3grk6vzb8xilpsc9xoze8xg4w96j9juawisedgisahthc6ioi8li58lty82yknbjht3s5',
                detail: 'Hic aspernatur qui ex ut quia sed sapiente. Quaerat inventore quis et pariatur. Quo explicabo magnam et ea. Sed velit ea.',
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
                id: '577bc562-8b6a-4a96-acfd-d7f4a0916b5a',
                tenantId: 'a92d2303-6a2d-4c0d-b0be-48235f0132ee',
                tenantCode: 'y2xwxd9beddfonpraavovorr43ti633vhpnxqzprh6w2k5y48k',
                systemId: '8f76fc75-06f0-4857-a55f-5588e5847434',
                systemName: 'u84l2df8279ksl5cicbr',
                executionId: '0c209bad-c876-4d15-8009-ee6cdd442b9f',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 07:50:31',
                executionMonitoringStartAt: '2021-05-23 02:43:37',
                executionMonitoringEndAt: '2021-05-23 12:46:37',
                status: 'INACTIVE',
                channelHash: 'x26rwtx6ssqo0h797rzv3od6ewhccy4gz45w0x9q',
                channelSapId: 's83eijp4cas89rith2bs9z8jmwg5unt666gobjetaaos4y08gm',
                channelParty: 'dakjwuu58zvaeptyiyed69020i4q8pmjp7hsskx6mx9e885rqrxkniuqwjb8zhbzlwkvj25tmmv6zxiueivthcy79kzg6zo52079t21055fpm2mvff2qlq1vkksgj81lan9w13unvh8qe3b2005udy6hb8yhr09l',
                channelComponent: 'rb63uflilhjnrzkfry2b7gbwny2rta68pfodn4c9j0cgsb56c6vz10wdy1b00vh7nyynx6jq16x3bfnedhb69lu5gjajmoo9sauvjiyrg4ry6uh5gtmieo4euiu3r3ccg2inboig3zfgt2783hzg83tu3gn7arms',
                channelName: '9ef5mlth1kqkuvcj51xnd764mhcmsf7lwyhk4bwuixny58tg4srvevu3rascuush6gtho6135ynn3fu23pa1zxgp9qq2lkbwsz1dazc91117q0u78sshj8czrd1dxnur0rw03ttvlwe2a8heo3v0tvdk2b8n5mrah',
                detail: 'Eius nihil velit aut rerum quia dolores dolores. Aspernatur quidem saepe consequatur totam vero quasi quod nostrum. Et quis velit incidunt molestias voluptatem. Repudiandae quis quo at qui temporibus vitae sapiente. Odit dolores architecto ut rerum voluptates est similique soluta et. Pariatur esse fugit hic.',
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
                id: '459b46b9-1eb5-4a3c-8a62-29a3922b7fba',
                tenantId: '85e3de7e-ef1e-4242-8fd0-dd6467390c56',
                tenantCode: 'trckzcyxq2exetqhrc7roza64vq03yhginjct3jci1ily3qz77',
                systemId: 'b53dfab9-3e9f-4d4d-b4ec-57047df8986e',
                systemName: '0213n1y6kfrvwnlpzvkd',
                executionId: '7d888950-eb21-4a68-9ad7-a9b19d5b1c91',
                executionType: 'XXXX',
                executionExecutedAt: '2021-05-23 09:48:20',
                executionMonitoringStartAt: '2021-05-22 15:06:50',
                executionMonitoringEndAt: '2021-05-23 07:22:59',
                status: 'ERROR',
                channelHash: 'sqm33sp2b3blyifr6fz75ucpf8thwqwa4xejq63h',
                channelSapId: '0ua0pvr6u73zrki2m85dc9vsr0lldzqemabb7o5rcehsh6bjsl',
                channelParty: 'j1zady86b978ygez5eny77c687gnvq55ip3k7nvbrdhdbf8uo5t3qfe45j1y82ct7oapw7negzuhgnwwyg3o4i6zh6z3ow560pzptp0yri4q038yu16sqlfqkk0wseooit5r31i6ir44uir5bhpm22xs2x0h8ftx',
                channelComponent: '07fnp8aqcz687e3aq8ld3a3f8tjcv0j91tpe8cqe8k5o16oitu8aveb2uuquz1wktbwcix7haa25xi55x692v3ueunnox0o20ks25m3hj9m77z4z41tapx9b8w5ri28birn3wi14ai388izpc8hhmhuwoqzeb5f5',
                channelName: 's2kw9nvt1sh99zdtw7qf5o2m3bi6qrpodaitaxfjjvv6mv46z9js9gu1ktd985djee6uvs38yvyipbvmjo29phru6n2hxj8bs56h8khw412ighfl6sf6st276z8gfzlipocgtwjvuguft2q392n980wcinrbbfn8',
                detail: 'Iure dolores eius. Rerum nesciunt sunt harum in quos. Qui recusandae laboriosam rem totam voluptas.',
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
                id: '44a02e85-ee95-4e46-b5a8-d8ad8146570b',
                tenantId: 'aa82996c-d497-4cb2-8081-37a91c7e407d',
                tenantCode: '6mlgprmiwds9kdago6tpkwpjqaaq2z1qb01fgrstylnco64e3v',
                systemId: 'd15ff640-36dd-40c1-ba0c-f06f8a9fccd4',
                systemName: 'g8htl2f7stqf11ufx7qr',
                executionId: 'eae66540-9ba0-4ab3-8fc0-1cfc981c1af7',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 06:54:11',
                executionMonitoringStartAt: '2021-05-22 19:36:03',
                executionMonitoringEndAt: '2021-05-22 18:57:31',
                status: 'XXXX',
                channelHash: 'g6im19k04i0qjgurejdz10nahmwoekbqocn5wtya',
                channelSapId: 'ii129ahqd4htb10tqns45aqty75w9ivihrscvxszv7udqf0cvc',
                channelParty: '7cisyelcquh2yfud9dd0nyv2x1y2msma9hy321h9itjzbpkx0aqbre68330sh9rtmjabnocy3rpbmnd85foforx037ug9x9dm1w3e4ghsh0sblb4yd1redwdjt3suunfp4xay1oz0hc4qosi354rtoclf1093f4i',
                channelComponent: 'ri5ld6gooq9mquyddf6oky7saba8efw5vb0p91z8xypy19k0ltw43b5428oal33ae2wc134gi7k0m692ewnzdycw01hqetg2ezk2z11rziwber5proh5m4wsftmmkon2xflca1r29suuvszpat75tekybe6zvhcx',
                channelName: 'q4nv88r6xlznkqop5ja64xlvyfqall95pu8m7pwazck2c6gqjd1jr94zarhwfwcwexkbe8lw984xn8dnyf2cgy6qyvpcnwaqkc7vxokzfgywsjduy35yd33l3yjjc745ilakuhmqxglhvlu5txgh4ks64yp376y4',
                detail: 'Placeat ut illum voluptatum asperiores assumenda dolorem et. Quod perferendis ut reprehenderit corrupti accusantium. Officiis eum in dolor et sapiente ducimus. Mollitia nisi accusantium.',
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
                id: '82258b5c-9344-4ea3-9f1a-ae16f51bd25d',
                tenantId: '6392d678-7145-4b2e-b8c6-d91c90c6665e',
                tenantCode: 'o9uoxyhy1bd3pwl44vopsznafcwk86f4oszld5pja6ug37w0rl',
                systemId: '47b1a347-c40e-44bf-9ea4-82fb4d308acd',
                systemName: 'cawzuldm5d1askyss4ua',
                executionId: '5c10a1f0-046c-445b-80e1-fbe063c83c82',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2021-05-22 21:13:51',
                executionMonitoringEndAt: '2021-05-23 00:48:16',
                status: 'ERROR',
                channelHash: 'ayj4o1x33p0whxzp2o62epyyhf06769ozicy6wdt',
                channelSapId: 'masfc0imcej2ghhfv1fsjbs3g69tuxvbufpvaggoj8ek45nb4h',
                channelParty: 'uh9903ksxzwhzrrni9vn7c9n30awtf3s5nclwg7l5itol5lz74e2jh7d3qohepmju744aaqwl15ekrl9er6hd5ii2ji9z017tzdpwzdtpn2f9tgg50jpfko0yzqpkt7sjxlzgyo8mnm6zc91h2d1z6h6t5cox8sh',
                channelComponent: '0m5ky9xlsbl9a4q4spchxrysm5tvhcuttc4mzljyr973onozf540nzsqtuqaj9ug2dc7lmd8cxi9l7bkgc4kponbyk0qxhcslp2i904ja0u55l8m5t9xvq3rebyr5xwz6ob85aeprca25567f61ddpc7ptfbxqfm',
                channelName: 'jpbuq351d57dshciangwo4g45llo6d8rfirdj42hn0jf0czyaxlpkeyb8k98a6cheszbz191kphbjuzscdcjkdjdhasznaw7winaqpkvtdsa843aj69vsuwkb6fpquligbq9pl2me6ebh2al8tjmrkh5o479fj0k',
                detail: 'Nisi quisquam nam dolore consequatur quae odio accusamus non. Possimus nesciunt dolorum repellendus est sunt quis. Officia aut molestiae delectus corrupti soluta. Id doloremque non quia voluptatibus amet qui saepe est voluptates.',
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
                id: 'e443506b-c4bc-4831-807f-ab0b90ea00e5',
                tenantId: 'b0f8fb73-00db-4cfc-aae0-ea0111b90037',
                tenantCode: 'tm0joi2dwag9wduq9zpzki59x8nx829bst92xufsd59sjkbvom',
                systemId: '9c48be87-0c80-4aad-91d2-73f65290f299',
                systemName: '5y5b4vthz56a5verezv0',
                executionId: '8bcb1550-a6f0-4834-b58e-57d2e5f31c54',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-22 16:38:10',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2021-05-22 14:49:31',
                status: 'SUCCESSFUL',
                channelHash: '91m4smew2u5phz2hujes2nedgswnquw0iqquedro',
                channelSapId: 'h58nkhy0u1t7k9z8sgtot8zfzwpwuyyuqfn8lhbvo17umyt1wd',
                channelParty: '5pt78v2i4o8o2oyl4wo1up84s947cxlz395g332w6ge8bz7nx1sdt8rhqqjszndagdvesyjjvls2f5z8fpolierurk5xfn0xkyy36hot4g2lrkeomxvgeybd66f4dxye8uazws4tydvfugdramgz0cmivtq3s9u0',
                channelComponent: 'no6ylsrorbvyk48884oozvjwofccy2t1y01mb0w24rvbqn2uf4ejt6ip926jfmr2yvszr3ptiemhjlp9834iv9rrow60kni8k49lpoiyp61x0kwgp2qxvyisimz82agp9h9zw2xe6oxwojquxt4rpl4j842kr4um',
                channelName: 'gt2ebw6sns63lq96dcf2d3baasrt3snkb9rvsvh0uxahldrz1zwqnu9zh06fbk2j51hgu5iv93ez5lbhprbss7hxdcgc6houfcq6b9j28d58o9cozisssov9gdmzbgzrsusok5nglruqn1468b913ulnhayqknu3',
                detail: 'Voluptatem quasi repellendus atque fuga magni qui qui est. Explicabo et qui voluptas facere. Qui quis commodi asperiores qui corporis quidem aut id temporibus.',
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
                id: '84326c80-2829-4d83-9bd5-ba683660e922',
                tenantId: '071b1857-625e-406b-9bf5-c94e95a63597',
                tenantCode: 'njrgi0ubsnijqbjoyl1lcwnrhxdqpc6enjkhe0vsa3f0uovogx',
                systemId: '34e6e810-1ed7-41cf-8439-e8d79f365096',
                systemName: '9egcjtj9njpxoamuiq9y',
                executionId: 'd287f4eb-1b68-4108-a4bb-f3524169f1ec',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 04:29:46',
                executionMonitoringStartAt: '2021-05-22 16:54:50',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'STOPPED',
                channelHash: 'x1yv9633g5cgjdq6cvwajzb4a3cnr4obm2pmzuo4',
                channelSapId: 'pa9fu7j6x5vg0kl26ais434av9t98vlqnxa3d5smb8sc04fwb5',
                channelParty: 'v67pjkg0v61v13vvcgm5721if0k6kebk800ts91lb6ldbr9tbho7u55wnitu088la6kt77x1w2q77na7v293fkhjkqq8ivikh9oj01c3860ald3whe00yhd2j6ko61lizedkd78o17ji3dy6qmq8q41hpl3upbmw',
                channelComponent: 'aww9qy2zvqvtdpush4kvxu5vmbqxd30hh64rl2d0sgp2xcheyq2w785wwxdii8xlvd3rihj4bf5z09ojuhrqy14ae4psfzf2hdc23c9nhpf8sgdj9zxen9w1c5nsrroho3x1zc3wkge18zygj6rig39t00d6c48f',
                channelName: 'uj7wtedq32obaskfyri5ldqja2pnhwykpl60dizpqzv0m02gq5jqi0f0m0bkxtgqvsq3h28ai1yrv216lf2liq152ahntbvszqyheysak5692urag87qfkqn3ieb62vtw0t2yg92obwot4qq8uot95sah8apwyu4',
                detail: 'Quo numquam dolorem. Et et cupiditate aut voluptas delectus quidem repellat. Voluptatibus ut deleniti. Quos aut est repudiandae et rem vitae ducimus. Dignissimos laboriosam totam ut dolorem adipisci aut fuga dolor error. Assumenda error doloribus veritatis corporis eos omnis consequatur.',
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
                        id: 'b5cedc1e-eb2c-4c84-b017-5fc2be84dca9'
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
                executionExecutedAt: '2021-05-23 11:11:28',
                executionMonitoringStartAt: '2021-05-23 11:11:28',
                executionMonitoringEndAt: '2021-05-23 11:11:28',
                status: 'UNREGISTERED',
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
            .get('/cci/channel-detail/36caaee4-bf0a-43bb-8b1c-4908b931b890')
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
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 13:49:24',
                executionMonitoringStartAt: '2021-05-22 16:19:09',
                executionMonitoringEndAt: '2021-05-23 07:32:09',
                status: 'ERROR',
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
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 11:11:28',
                executionMonitoringStartAt: '2021-05-23 11:11:28',
                executionMonitoringEndAt: '2021-05-23 11:11:28',
                status: 'STOPPED',
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
            .delete('/cci/channel-detail/53957a28-c9d6-4fc1-b337-c6aecbed34b3')
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
                        executionExecutedAt: '2021-05-23 11:11:28',
                        executionMonitoringStartAt: '2021-05-23 11:11:28',
                        executionMonitoringEndAt: '2021-05-23 11:11:28',
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
                            id: 'a94e2852-c8e9-4d52-9845-be58ee477250'
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
                    id: 'fa48d5bf-367f-45e9-9fce-74d85dd467b2'
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
                        executionExecutedAt: '2021-05-23 13:49:24',
                        executionMonitoringStartAt: '2021-05-22 16:19:09',
                        executionMonitoringEndAt: '2021-05-23 07:32:09',
                        status: 'UNKNOWN',
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
                        executionExecutedAt: '2021-05-23 11:11:28',
                        executionMonitoringStartAt: '2021-05-23 11:11:28',
                        executionMonitoringEndAt: '2021-05-23 11:11:28',
                        status: 'INACTIVE',
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
                    id: '56565be1-554f-4167-bcff-70f7e909fcce'
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