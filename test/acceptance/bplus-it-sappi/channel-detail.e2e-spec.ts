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
                tenantId: '6b2e2446-2a9a-444c-801a-ca8f814cfe62',
                tenantCode: '3s0kqq4u838yghcgfzsd4iozwm2elrloaj8muk49e0s3x629if',
                systemId: '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c',
                systemName: '54tqnfmqernifq6dsr2n',
                executionId: '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 18:30:35',
                executionMonitoringStartAt: '2020-07-27 00:09:15',
                executionMonitoringEndAt: '2020-07-26 23:02:26',
                status: 'ERROR',
                channelId: 'e3542545-7b8a-4afa-9f33-b560847d3bb5',
                channelSapId: '2n0xznerlmcvdqp4gh0b3di9e3ezkmqbi0eifpwxtzhk86bqtb',
                channelParty: 'slkm1rxf92vpfzfg2gw6r8wfvgh0q5ecllnysq3w3db0p6d6nsg6tsepjlg05kidnhes99vz3h5tmgk14avojugc6but8hvlgg5vmg2teksyfmpw5cvxcmjicz7wmtzkvls1pfew5bc0tzhosuy4ibvdt61sfd37',
                channelComponent: 'a9c0ld1bff0tzjlbxlnc1pdhayqve91tth2q5c8fu4qlt6humq7zeadp1divi4ogj5e0nxoecyxrs43wjptoqbyxzg9k90mllh17om56wz5td4dcas1b6w4zg2rd5kl7ksvslds60omel058diol8l699fmnyeka',
                channelName: 'c6u46uc3ijo8eaz4pohihs3tvmhk1z8vxbbpv83yl3q78q75d911b1a4us1uqq8n6o1wzdeomj37x3ss33dl2brp8hm9t9hz3gu7qjxe3zqo87jvzba74h9qucnew49xf4uo5oxh4faewq55fwvy48yup0nkvcgw',
                detail: 'Repellat explicabo dolor. Voluptatem animi veritatis magni illo enim inventore cupiditate voluptatum. Praesentium sequi vitae enim vel sint ipsum. Quis ipsa et dolorem nesciunt aspernatur atque est. Voluptas dolor quidem praesentium autem aut voluptatem et.',
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
                
                tenantId: '6b2e2446-2a9a-444c-801a-ca8f814cfe62',
                tenantCode: '6dl6k66gjkecvc50ycd42sqr21ucjywvqnkom27le7z83tdyxs',
                systemId: '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c',
                systemName: 'mrya1yc7e6ilaou6m10e',
                executionId: '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 04:11:41',
                executionMonitoringStartAt: '2020-07-27 11:44:46',
                executionMonitoringEndAt: '2020-07-26 18:54:47',
                status: 'STOPPED',
                channelId: 'e3542545-7b8a-4afa-9f33-b560847d3bb5',
                channelSapId: 'ebcawm9co8z1ysht2dwe7v8dto8v1fmfort111eu3idmapwg9m',
                channelParty: 'pynjjzc8w8f3r6ekfdtm7gvd3p9zpnfdpwbrzndleab8j660yrdjmiw70r88j34wpxrmk3du5a24u7113kh16bqb09uurkd648eencyvmncfvirkblh822h5b08ej53qfw0psf66e0dfk5uk68bvjf4dcvy1vxat',
                channelComponent: 'rhmm1ldo5olurx3hzpmpd2aio3epf7cwn4pnoydw7dy1u5katmbw6oj9gr8smiyrfz1l2oyd697kuygzcd23ao7rlcps471r44stg9ccoe4lw12gqoteswkym9mjlhv4716d27e80rd2ovpdxm2btwndhawi8a48',
                channelName: '9vf33x7zpxzw2xfyzu9hbupzduttwhwpchlgcd0qbbwmm10n1j02f7ih1i7lqnmmbamenhhapkyi1qzvvtz1u4jgs0k36o03b9bjuu8mwi5vnjx4dfwpjdds9cwxo7lt8yydhawi6liu901vqpc5ks3u30kl04ms',
                detail: 'Alias non soluta saepe vero sit. Magni ut enim est id et. Nam eveniet ut veniam.',
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
                id: '3590528f-d23a-4232-b036-a58070348587',
                tenantId: null,
                tenantCode: 'lklxl2l544fiayxpr6tc528w9s24se4o10bgczs6rsk4bqsyw7',
                systemId: '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c',
                systemName: 'wx9mvla5jve767allarc',
                executionId: '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 07:51:03',
                executionMonitoringStartAt: '2020-07-27 02:36:08',
                executionMonitoringEndAt: '2020-07-26 19:04:31',
                status: 'UNREGISTERED',
                channelId: 'e3542545-7b8a-4afa-9f33-b560847d3bb5',
                channelSapId: 'hk7gjhe6pavdqizwvxuqoo05od0tsu183ifegwkcgz27ee3y27',
                channelParty: 'qq5ykmqyiac115n415swjgx7fg3npyf80g0jli8b5gutd05iw5h0wga6s4i8n03mm65z82miuk4hrcmeychiacjkso1eueft2xsuh5gl768ukuj29eqtezzn86pbrgv7j3krlkeodq24kjyyt4tivv9ds6d6q667',
                channelComponent: '6xwvp5524krrvrgpkdur87m1susdlmy8uksos7j2mz505ugfrd42ubjdtz18rcpwtypjla6gt0w37vl0ved3m5ok0gclei6nyf6c4hoa52t44t1jqzdockt0o2btg4gvyifdqh1wtz6wg577pzn0nfi1utg8ytqx',
                channelName: 'l72qh5zr5qsz9bzzvvg8h7bk3iaht0xilqltb002zkn558mjp68u92m34j7w1593iuvdpt8pe3376cygtptqup6fhse8bcpaaprorxwmyll5fqczbdimiwfq62cxtq35s0ul6in7o6t3rdx9j7jqfj6dwf5jxs4q',
                detail: 'Quidem sed provident mollitia aut ipsum quia debitis. Ea eaque quis et saepe est consequatur officiis est nihil. Corporis ullam minima animi accusamus et laboriosam facilis explicabo quo.',
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
                id: '3590528f-d23a-4232-b036-a58070348587',
                
                tenantCode: '1bzrha9hjq5yna0pvavep83p9xc1rrc3irjbo7q86vpdknbndy',
                systemId: '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c',
                systemName: 'nl15nbp3j0fj22dq626t',
                executionId: '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 08:38:21',
                executionMonitoringStartAt: '2020-07-27 13:25:38',
                executionMonitoringEndAt: '2020-07-27 01:54:24',
                status: 'UNKNOWN',
                channelId: 'e3542545-7b8a-4afa-9f33-b560847d3bb5',
                channelSapId: 'gieulribx7ddg3y6zm8w6c9rmy3tj8slm0aewqmlv97hka95i1',
                channelParty: 'sqktpm0s53vtt289ll2hkd2nuks29xbcaifjipe7tf7c7585h50ypub2ofaxlojvy8vttw27niivbce8fvgvq6urnxg3129kgchp06b7ha082r5hh8t2fb4agkuc2i90n8lzq71jeqaygd4gtzzrniacih4myydt',
                channelComponent: 'uwk7orajwkkpwhjdz490acg2unf1vhwi3ms83ydfp5w9dwqkyxl1zs5likgoxohibq6bse66p1u6ccji171o3gvgj8dulv6jo06ukustk0akq66rucspgy8dxb89q3d2ci6al5ygqdn4aafkhiyw3zwovpwz8vgs',
                channelName: 'sikftkb6xirjwuabcqb918z9q483oc1sld2arnys249pqxc8flldczhhullwx4gywbelquejbjsuy7mzcxkfe49en3bgammkqgu9y9kuyaedgmajx105ttgnzfxmqhu4l50j9upguskge3wgv8phbyuyntg1kwvz',
                detail: 'In saepe rerum. Quas veritatis repellat possimus sequi ab nobis. Est et tempore dolores aperiam.',
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
                id: '3590528f-d23a-4232-b036-a58070348587',
                tenantId: '6b2e2446-2a9a-444c-801a-ca8f814cfe62',
                tenantCode: null,
                systemId: '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c',
                systemName: 'ny86dsb99p6jmzji8bqj',
                executionId: '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 07:21:53',
                executionMonitoringStartAt: '2020-07-27 16:20:07',
                executionMonitoringEndAt: '2020-07-26 18:57:03',
                status: 'SUCCESSFUL',
                channelId: 'e3542545-7b8a-4afa-9f33-b560847d3bb5',
                channelSapId: 'gt4vrztl3sp76jk1n3fgisttywbuy95n8m0x0nj8c60n46j25a',
                channelParty: 'vs608tegsjznpnp1gph3avjo6b2o1rhrh9edhjwil4sohafybk97oj9cwcbyranqco6dhkjh9ptsi1q6e6xltqip8qifli0u37yu94zqnv83ppc0bggx6akdvf7tjzqsdwz88ovix8mqmi9ycx2muote7bqohxdq',
                channelComponent: 'ly9pw9f07n2ilri70ibglh1uxvl80kxfdu0ua33fb14ormm1f4exjq7mf6fgvt5jkxh4ojvezzxouoc62c85rdlntjicv1w21lrknvertirzy3frrj72ja95ob0s0thtjg3ajyymtgxp6e4dmyvxff9kqj0plkx1',
                channelName: 'p6imlyzcf7kf261v889t1lfsiyzlhht9fvgbr4xw27b27qqqvf8hr6ua3rmo8jf0tnbsdjsnd3f8k6t53nic8q9rxlf9bxsy2k1h57fvhbw75uln7zh36f984885csjsk2ol1yi39eeubkd4vqjlxrsxbjr6x05k',
                detail: 'Dolorem similique autem et officiis blanditiis id dolore voluptas. Fugiat temporibus quia excepturi aut qui quidem velit. Aut vero esse est quos in.',
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
                id: '3590528f-d23a-4232-b036-a58070348587',
                tenantId: '6b2e2446-2a9a-444c-801a-ca8f814cfe62',
                
                systemId: '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c',
                systemName: 'yg6z32swi2vc2zi5rf9l',
                executionId: '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 11:02:02',
                executionMonitoringStartAt: '2020-07-27 07:54:37',
                executionMonitoringEndAt: '2020-07-27 07:50:08',
                status: 'UNREGISTERED',
                channelId: 'e3542545-7b8a-4afa-9f33-b560847d3bb5',
                channelSapId: 'ulzusa0vlaj7roqs0a2x09fup980hvhzemir542k42hbo72x5c',
                channelParty: '2f68tilshg6rilambxfy19sqjbdxgr99jdvip7d7v21q7ye3ai9oog9iu08os3hmus3rj0d9yj6m76iwn0aj7vuqk83qe42mivfuy2hbn7jvcbuxprrjipllxtvdj5u407us6a03oec4x9m7no58fq25wjmseehg',
                channelComponent: 'a5op31o5zwzd2kwnkvuomjowjg2mbrywfm6mnsh7o6u65dt3ote5zhcsg5yiyxct8r66hq3fluqr5yk4vohefef3tpuo4gspf1cug3n0i1xqkoln5v07e7n1pttg7pelkjw6dbgjkrjm65nesbraemv6copl67pq',
                channelName: 's2toknbuuz41slg6r7420qmoym847qne3t0z12woqjiko4ojcjullzij0l9i2dpxexlcr5y6d204i95gods8yubaynxp4lc9q8o73lfgtnivzuh5oaw9wzi9saup43jv2kkmipggc313n28gojvqcline4g83w55',
                detail: 'Ut et ipsum rerum. Autem fugit ipsam ut ipsam commodi ullam at labore. Id ut sapiente rerum quia et doloremque beatae voluptatem. Qui nostrum dignissimos.',
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
                id: '3590528f-d23a-4232-b036-a58070348587',
                tenantId: '6b2e2446-2a9a-444c-801a-ca8f814cfe62',
                tenantCode: 'vricaa6gi3zc6qh5f8mbrbcbzvde6a8upzu2vgb806ob2ygp4y',
                systemId: null,
                systemName: 'j4h2odm5uic1mq9kvplh',
                executionId: '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 12:44:59',
                executionMonitoringStartAt: '2020-07-27 05:41:43',
                executionMonitoringEndAt: '2020-07-26 21:13:31',
                status: 'UNREGISTERED',
                channelId: 'e3542545-7b8a-4afa-9f33-b560847d3bb5',
                channelSapId: 'gc9sv7wnh7rqqd5se35hqgw0jygv99hqc4qvv3qq8wgknu9vc4',
                channelParty: 'ij2xtcsww8i3o1s8eehevjtvutg19ntrq6szyt8b0uj0ewqcbsnx02zh6t8kefsx1c3ucha6hwd2livl20ah25tb2r91fkynmmquz2318oj007h98mkr260fj309xrcw5uk2nkc6r5xixvrz710p81hohs12kzhr',
                channelComponent: '0o8l8avrqdx9pyc9xbwtosy7wehh13jl2pn3hhohp0ifguq35yd2qd92s4ljifi9bg39hmx0lb7c91qd3ogesnjsruay0as7wv12mxf45fw89k5n0blaj6cskz2zas21p3tna29c6yuln5g0zq0ulcch67zen47a',
                channelName: '42s78gt14iwtabzyurqn2qkx4x07adxvm0227t6bdce54feuyqqbw6muk409r126eatkunyr8l8brquxj5cg98wmacbtrpoztw84ocjow0frpisutkp9wxq8wi8ow6lnln3gx9xzsbblq8yo2gopdd4d90jbgn0o',
                detail: 'Fuga molestiae quae eaque maxime enim accusantium. Minima repellendus et assumenda voluptas. Est recusandae natus unde neque ad modi.',
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
                id: '3590528f-d23a-4232-b036-a58070348587',
                tenantId: '6b2e2446-2a9a-444c-801a-ca8f814cfe62',
                tenantCode: 'qu4hkx4ms0bq3qm2ctariq0h15501jmqvazu1we05glf54521e',
                
                systemName: 'upy99olnh4sccvnwqnyp',
                executionId: '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 22:36:45',
                executionMonitoringStartAt: '2020-07-26 18:51:34',
                executionMonitoringEndAt: '2020-07-26 19:22:09',
                status: 'SUCCESSFUL',
                channelId: 'e3542545-7b8a-4afa-9f33-b560847d3bb5',
                channelSapId: 'zjd8uccrwez5yqpe1i3qph6tpb6mcvys3bmfrzpoys042oylnz',
                channelParty: '3utcgl2qs8oc25wavkb1ls69to5lwvkkg68ak4picyuhyhgxkexv10c36dvnsviv6vghuje5ljzsvi11itx5i34rapiqnejy7aq5sb7wlhjoj5wyihxgvld3faj1ic92z3lymqknivr34k6d34yd9yq740bw4hdt',
                channelComponent: 'kxru5n99ifx3t40y90g7e25dzzfrlhkc0qyl4lrn31nh248hln1283gu4ui3wqre3xmmjzco44yc56hy0xo4f60bz3gsqtuc49l3m2v7c81wkqylys3fvtli2cg5yj5fg8xz2qgu3ku37443exm0t6y2p3k6rumg',
                channelName: 'oae4ssl2k8skz0rgz9y8o528qqwvr36sbv61z7ck4386asol0h7vv3h0mwrbabup4tcwibcccraluuc37v1e27ikcs4hxf4xbzrr2umlaal727zic9l7ydj9wc5gx8pes2eu0w9ko7457vr8uskiiz4nr3qxk18k',
                detail: 'Quae rerum molestiae eum aut quo perferendis quo ullam provident. Mollitia corrupti rerum sint voluptas deserunt. Aperiam aut necessitatibus unde rerum. Quas est ullam eaque facere blanditiis qui suscipit ab est. Est ut voluptate minus facere accusamus.',
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
                id: '3590528f-d23a-4232-b036-a58070348587',
                tenantId: '6b2e2446-2a9a-444c-801a-ca8f814cfe62',
                tenantCode: 'jqz8xit13wu2xx4zq3i7dg9g4gh41rffm7wwlust88zhw9foyn',
                systemId: '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c',
                systemName: null,
                executionId: '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 12:49:23',
                executionMonitoringStartAt: '2020-07-26 19:13:46',
                executionMonitoringEndAt: '2020-07-27 06:50:58',
                status: 'UNKNOWN',
                channelId: 'e3542545-7b8a-4afa-9f33-b560847d3bb5',
                channelSapId: 'fcqve9zvsewhclkpqvrmx18nwpna8dl1gluhhk1ascpgdscrll',
                channelParty: '8m25ug2napnb7ounapf2p8yj9mykdqx9dfu145vnlswak4ocx0boe3pfes1zuxpxsiaqzx3bq7nx1h2qnzrvzo59d79by6rikmrr3yavoxw9ivfpq6m7083qyi3ihwwxrgc1ao6hnm1krhf1v99icpx4zjasvbq9',
                channelComponent: 'ggpdkebocmkxg6pydvpxsb9ropbfjh2fihcaw89236777e5bodxk2ky9fpzcayfrpz6cfrxc55opun9goldngdu7cxn0tk3wk606udv1y40u8r7j26x1ywj0n922nv7ncfi54ytcoyrogzlvz45v53hygzszsjx4',
                channelName: 'g086jkktaivz2x49owvevb3socm7xavhqoymv1gsirdxhwt0xuk6p8t9pzxhy8zmb2kz9gjilaa2k3cuk3u98mk3uf5ljip8w4puovt509flmpgq6lyt67s5e8umacvxe76kwypysm67zqi8o9fqbeqslonl44c2',
                detail: 'Et aut distinctio pariatur ut dolores repudiandae ratione magnam possimus. Cumque dignissimos architecto harum pariatur rerum. Vero non omnis nulla voluptas sint vel. Reiciendis vel sed dolores veritatis quos facere. Animi beatae eos blanditiis architecto voluptatem sequi. Quidem veniam nam architecto fuga aut corporis velit.',
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
                id: '3590528f-d23a-4232-b036-a58070348587',
                tenantId: '6b2e2446-2a9a-444c-801a-ca8f814cfe62',
                tenantCode: 'phz8xppr3pyjv6dmbtzys9pihocp82rkv9wh29g2us65wn5eqe',
                systemId: '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c',
                
                executionId: '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 09:36:15',
                executionMonitoringStartAt: '2020-07-27 01:19:33',
                executionMonitoringEndAt: '2020-07-27 12:02:51',
                status: 'UNKNOWN',
                channelId: 'e3542545-7b8a-4afa-9f33-b560847d3bb5',
                channelSapId: 'ptqpmxczqepm6tcx9txjdhs8dhu4emtqmcp52fjyfos3quw4p6',
                channelParty: 'mtfdxv3zyi9o97usmhy5nekddnknn3l70vb006sge6p870xiaef5vpncg37jnbnscodnnw6vmuw0b70gnbo0x2th2y27izw67o190849kop972d6f7l051bpjf7h3imas5tklebiyxxl1tfa2dgyekqqy1pquogo',
                channelComponent: '0lxmnlwon91styst2025w2ycyee1igxut0pw89j049ysd2uxh6ngjbwvj8h04ekzjp1u19p0sz3usfksfnsg44cfkom05g3j295pl2c2mlqtt7ef5c1znd15e6v77qmzqnkc5lsz4ymvcgovnigql8c51ef7lech',
                channelName: 'qq2n36bsgo3uubnbo53epz95bfrzh26stk21l4mjpgio1d1f04f5zpnzifdi0kiwp1xce7z9j3c0onh2a490gc358cenou78otdtvd8f9yssu3mhj784kfuaklb1zdag5ahra9blkava0s0d26bj192kg8mb253p',
                detail: 'Qui perspiciatis eligendi ex perferendis maiores. Earum ipsa quod vel inventore accusantium eius. Reiciendis voluptatem aut.',
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
                id: '3590528f-d23a-4232-b036-a58070348587',
                tenantId: '6b2e2446-2a9a-444c-801a-ca8f814cfe62',
                tenantCode: 'si70maouzdjmnp8gghzghg0vgiryctijol7vz9z52mbzh3c8xg',
                systemId: '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c',
                systemName: 'ux36n6t6au33xstcmxet',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 18:56:20',
                executionMonitoringStartAt: '2020-07-26 17:42:45',
                executionMonitoringEndAt: '2020-07-27 09:05:28',
                status: 'STOPPED',
                channelId: 'e3542545-7b8a-4afa-9f33-b560847d3bb5',
                channelSapId: 'wo0jeqdhiwwh4lx1oro4bxey60xz8yoi8gzts4rlaqqwy6go12',
                channelParty: 'lrfkxpr2v5b8e7vk8o8m2k4qbgl16na79sl6pram5pk3pogkji3ynvr8zqlrxcgvnbyyxsgbgdrxeh4h2jt4gr958frfh1t5w0nf9v6fzoqepf7pcddbadf6ibpyo7rmzsxvogs42olx6hisrleayc49z2accj3v',
                channelComponent: 'm469v6i29bf7rfrluddbt4donzw9fetrzk57z65a9sv2eniz19sow0c8c7t7hygdjf89imz4rbg5vunihn8w4ka9bsbqn5so5k4xioy1aue455dx1tabx6e78b0c2e6owfkowbkgt6gt3kz7b4k8m0kyhqy6h9w8',
                channelName: '394eas5mzjyr0o7ei4ybsmeg1mtp6eez6e0sac5728hfo5ek31dwpf2somewo4xs1d1rr9fl6c1i5mlbef4vyqojoorwjzxarfhh7mzw6sk0x55ucmzt3uopl4dmo7yjamkjd8dx920a3jg1xbn53pgnib60brmj',
                detail: 'Sit nam tempora repellendus culpa blanditiis adipisci tenetur perspiciatis. Asperiores inventore nobis. Dolores a ullam itaque molestias. Et rerum est officiis ex pariatur aperiam. Distinctio placeat in libero.',
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
                id: '3590528f-d23a-4232-b036-a58070348587',
                tenantId: '6b2e2446-2a9a-444c-801a-ca8f814cfe62',
                tenantCode: 'l8klh5v6bczi7xa07buhaztrv3vb8hoyhzeeyrtpxhqk7uhoa6',
                systemId: '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c',
                systemName: '1ddlxwxrdbj1rh9tkd60',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 16:52:37',
                executionMonitoringStartAt: '2020-07-27 12:22:33',
                executionMonitoringEndAt: '2020-07-27 03:33:30',
                status: 'STOPPED',
                channelId: 'e3542545-7b8a-4afa-9f33-b560847d3bb5',
                channelSapId: '3ri2i6b6wb0eke8a8di510zvv2t5ahzlcoui6k1iy6tr4c5d2g',
                channelParty: 'm9dak4dhk3wfbljgcxtxfpd5394psfoa60cnmkjaitqze25jizctl0f1tn3qxngdnr97dd5sjjncb54804qxcg74kk85dbv1posnxmnqz8hfmnfami66kc5kqo9e3lyj5u9eyfneg9o0djnmvanixmzcftati4hp',
                channelComponent: 'ihf4arnx9e6o56krwv4jrbrvjrl0pkyrs36qsg4317v1g9dwx7yvx5reesirchylguw4t2stqec3vrq8qfhugbqb31slevf157f53rcqjljdrid28vquwl49gfg0frmgp11k7wtm0mjkgw1tpo8r3wnw7reoxrsu',
                channelName: '39q6b95vzh6oe24vvpve4sbswdvepibajviw1gyb5dy2k3qfb1jnk5lell4aggvfm19dww0opuzh4ol7qqdhh8keyyiynp0bi6eal4ap544v3jcuhczzv5z56yf5r333ullf7pjoox9wpdzh66ceyr7tfxftr2i4',
                detail: 'Doloremque accusantium hic et sint perferendis ipsa velit. Rem quod omnis dicta est repellendus quibusdam. Deserunt recusandae amet voluptate. Ut sed qui error sit accusamus suscipit. Officia qui voluptatem tempora facere et ipsum qui. Qui consectetur itaque occaecati et.',
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
                id: '3590528f-d23a-4232-b036-a58070348587',
                tenantId: '6b2e2446-2a9a-444c-801a-ca8f814cfe62',
                tenantCode: 'q6f6unb860rvmeca3f8d5bigp42k4la39z9hgn4n8gx46s603b',
                systemId: '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c',
                systemName: '5rlo45fc9yi1pzbqdqcj',
                executionId: '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f',
                executionType: null,
                executionExecutedAt: '2020-07-27 13:50:40',
                executionMonitoringStartAt: '2020-07-27 09:07:31',
                executionMonitoringEndAt: '2020-07-27 00:55:29',
                status: 'INACTIVE',
                channelId: 'e3542545-7b8a-4afa-9f33-b560847d3bb5',
                channelSapId: 'yjzkvbgrpdgoc2ivahal3i7t8bii9fba0so6b4ntok8k0a1bke',
                channelParty: 'reoiqkl8yz54e0ybsyksyx6okdi0jixxddmv0gi0mkb3xhk92jlybyd75d750qpmicman0uegslc04pxruknwzp7uov997palo60303nx0ybrt4wfsduz9xpf5oire3ni3qddb146mutg3sfwo052d5a8y7zgvri',
                channelComponent: 'd1rs0ouik16ekhifhy1bw4ksh374y4ku1isym04twsodse82blmtnouslqkiupjuxr9paazj7gxo8aez5rh7jxfm1iw06w3mpwz96cyb8nclbn19g6fnx3c7ptf3wll0zgh1dww5er7mp7kf3xs3shv5x4q6qijw',
                channelName: 'xggozbvwxomjl4ma451gysu6n91lzibl7ag12gcuwpsbufsw28f6kkvf0r3aowo4wfk9wnxaf5umatq9p0q9dj803lgqe8yq9vhmchvlrg346xj613qfrqnl8t5xe2kz0ca36juu2zi6u34hjli8shmm7keo5qkr',
                detail: 'Assumenda ipsam omnis reiciendis nemo corporis non libero. Et aut alias impedit quo sunt sunt. Explicabo exercitationem at aut officiis nobis autem autem quia. Id quasi quis aspernatur odio. Perferendis maiores quae voluptatum ut. Dolores quis nesciunt autem atque omnis aut in.',
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
                id: '3590528f-d23a-4232-b036-a58070348587',
                tenantId: '6b2e2446-2a9a-444c-801a-ca8f814cfe62',
                tenantCode: 'mib51uhhfzdmn06ef7wj7be1h79evh0neb8xolzvy2c5c9tbap',
                systemId: '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c',
                systemName: 'drxqct381rpi4jqzg25u',
                executionId: '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f',
                
                executionExecutedAt: '2020-07-27 13:34:46',
                executionMonitoringStartAt: '2020-07-27 06:25:18',
                executionMonitoringEndAt: '2020-07-26 19:12:41',
                status: 'SUCCESSFUL',
                channelId: 'e3542545-7b8a-4afa-9f33-b560847d3bb5',
                channelSapId: 'jjmzmp1qxpt4zn3ykut06shu1s57krxkxck71zpo2kehqmv8nm',
                channelParty: '2gseqsa6r0fiuoch2s6ii9hv5970drg7c3ybhm2a8v4pw7l2yvjdxbk9zh1pckrpg7oj0yrl4fsligl24aakl2unl81ir0lc7g43ypo3xelj6rvy7m9823ibsmj1kmceqzdl6xpt414kuoegm2crt7pj8nutrl67',
                channelComponent: 'kqxgd99vdewm59xyydppil4xjo3ovh0w1wz4o5wd36pt0spffjg0xdc1jtexf95jghlyhv2evumk36ao02q1oupstrn7xkched22z5yoo1k460ete2vyxflt1d40js5vdl54wdkkbrba83ebp6826q395jj1inl1',
                channelName: '2s1yrug4ca0x9koezl0k9xcjyo61p9t5o8fhrfrj02cuvzxw0sb5nn6gdxevy7cwrhkwwbuq74npk7agmjmk7zi8jb71eku3wfroa180l8778yciqtlz9qdgb7cuts9jivy8qzrfc828bftglzgm6s0o5mve7kyy',
                detail: 'Et eius consequatur quis qui molestiae. Et modi excepturi. Expedita explicabo reiciendis sequi at non. Sint occaecati in eveniet.',
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
                id: '3590528f-d23a-4232-b036-a58070348587',
                tenantId: '6b2e2446-2a9a-444c-801a-ca8f814cfe62',
                tenantCode: 'au4a7kptr5rymmail95f1c3drtg9jxzdm2h8tnszx1vv62spkb',
                systemId: '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c',
                systemName: 'wrr32903dyezhzrqgbl9',
                executionId: '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-26 20:09:18',
                executionMonitoringEndAt: '2020-07-27 14:04:22',
                status: 'UNKNOWN',
                channelId: 'e3542545-7b8a-4afa-9f33-b560847d3bb5',
                channelSapId: 'fh83rk1tj9vy6y876jkiajhikrfiwwg189d7ivjc6pln9vezgs',
                channelParty: 'tsn68oedudopr67p62r84jy7zhmqsvr55nb9168osdva55z82g7uqk1i5tko32t3ynqqmgv1786hy71mdsjx9wn38rni4kujgpdkx09tqj3usgyeve11vbcs376hwt8adoeuq2rvec978evit12j6q7rc3zawyaa',
                channelComponent: 'pkbmib8b6wuc1h7wr5ebeq9l3qg9itza5k0x7m4y58doyq4hq55fmpl7kyrefs6lvdibzojo6c2dveq17vwqyllm23ht1e4t6vejstwgmyu9srphhm5abgu4w1tsa7nzi783i5fil3ezjsoxg76823ojezf0fb8t',
                channelName: 'r2n7pdhc473mp7jukbplfw8tqgyo7rfrl07repbshp1aswre1gpwtb0pciqir3fpactdbxsri8f7oalz9k8dgyv0l26awy4ngm4nlrajbv0s610k8m3qhzda202v9gzejpkf58z8rirlf6kdpgvsfsqaaarzjik7',
                detail: 'Enim voluptatem rerum deleniti sequi unde sit suscipit tenetur. Odit consequuntur natus quae vel corrupti quisquam ratione. Consectetur voluptas exercitationem odit omnis provident non ut saepe. Tenetur porro fugiat ut incidunt quis dolorum autem et. Possimus sit odio aliquid porro quam.',
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
                id: '3590528f-d23a-4232-b036-a58070348587',
                tenantId: '6b2e2446-2a9a-444c-801a-ca8f814cfe62',
                tenantCode: 'xvimwsluffbuqvom0yti1zyhbkdwirzxtohwnsef13d5ldw8ib',
                systemId: '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c',
                systemName: 'uz22fig2l2qottvwdlqb',
                executionId: '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-26 21:50:37',
                executionMonitoringEndAt: '2020-07-26 20:46:22',
                status: 'ERROR',
                channelId: 'e3542545-7b8a-4afa-9f33-b560847d3bb5',
                channelSapId: 'z29v3pkuipij2maasrar9l3qpghx4vh78t6qesxrcg97vkqeie',
                channelParty: 'dwjttl6xhl7gzc6nbx4hspf2rw0aypnx9ot5f403c395qy4k2lyqip5tav3ax6guq9iiqov8uf7jdhn7z3fqjfs3yodknybu88vjtyu6tyvruspv6v356tewxo943p484095svnwsdxw6bsrn5r9q33h1b69noaa',
                channelComponent: 'gfdw0n5mhqpwtq5mcc1baeteyf50i6q0abttac7b22a929f1udxxemuh54xe1wgtrhwqp6ax6q3gcbn7ehz1z8xdgpjnf95ms28nokjme9o9jffyxiz4puz9aur3obm4ymc33vxpsj6djvtqezbgx7czin3gsf4b',
                channelName: 'w4ffqtv1ib1o3sn1s5yh8yi01dliu65u7qrmjo2l6nc6iiusth396ex43233uf8ilhjm3o3ogeg62eoslop8iwb9qh3oyytw0uj6f4ma7r12ldm7dvqljdz060eethbboaklm6wn3ujnqaku07x5j34tknc4oeir',
                detail: 'Eos aut aliquid blanditiis dolorum culpa est. Earum quia voluptatibus ipsam quo repudiandae eaque eveniet veritatis. Error enim odit neque enim veniam quo quaerat esse.',
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
                id: '3590528f-d23a-4232-b036-a58070348587',
                tenantId: '6b2e2446-2a9a-444c-801a-ca8f814cfe62',
                tenantCode: 'iczyyho9d1b03abl05fez2s3ybhw20afck5oxzw4bgtzzs4lcl',
                systemId: '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c',
                systemName: 'pna1uo0u4o1s9ldq7ih4',
                executionId: '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 02:17:03',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-27 10:53:15',
                status: 'SUCCESSFUL',
                channelId: 'e3542545-7b8a-4afa-9f33-b560847d3bb5',
                channelSapId: 'd52u43eqb8l9g8fc2987lcvcudzmclrc9e8n9skop6kinqxb2i',
                channelParty: '60i4kpsrd1u422woz618hx990x7mmiyczvlivt4rjaqastn02o0rvfucmw0ylnjdi9pg6uhlfuvr5ihrmfwkiaduxmfnyvgqu5uc5qdu0fwle6832cwqrgzcvi7rcxo7zjkp2k2r34s0m1qz1gcscy7lu5d845wo',
                channelComponent: '2w5kalbps24z3uxg304ns75y2dqb4st9jf1kn7ayyjh5jvjd6k8dm5kljkcejeq6kpw0to53uvblxe85jamebsz63yqnss16gw29ca7xgwnwqj4bvp1jnrwo811swcghy109mx0ij6hl9s4jk68lyrd86mfsk88w',
                channelName: '2iy07kjatdo1ioks93z4a1idgn22d443p8g2vup7l80gc04cgsqs6y48zys3cbcmpn4ay2mxjcchwkshu010bkyj2kdvlbvtsm538c82oahqiz01ox0wtwcgeuaurlvptrp7wzu8pzxkbj7om97li3b2wypiwu3m',
                detail: 'Molestias tempore perferendis nemo. Illo vero facilis harum quasi iste. Est voluptate perferendis rerum nostrum voluptates eveniet iste. Accusantium eius aut expedita culpa quis. Ut nulla esse. Provident incidunt est laboriosam et aut ipsa velit non quis.',
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
                id: '3590528f-d23a-4232-b036-a58070348587',
                tenantId: '6b2e2446-2a9a-444c-801a-ca8f814cfe62',
                tenantCode: 'nqus33lix8wzmi2da2qjcy1pg5jg5xkojeubdae7q7tl7yzgxu',
                systemId: '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c',
                systemName: 'cn6bonkawlpgjx87l88h',
                executionId: '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 01:40:28',
                
                executionMonitoringEndAt: '2020-07-27 01:16:21',
                status: 'UNREGISTERED',
                channelId: 'e3542545-7b8a-4afa-9f33-b560847d3bb5',
                channelSapId: 'ggthap851qs4sewsx20x4jp3cic6bn5ctkyxfj543z3azilnot',
                channelParty: 'w3pjq5sgszivtqr4hm2cemizw37h0bo21xbl9x0wa7z0ow2fufm0rorxhtu1g5s48x4sbjaph92g0swi31x2gue7w2p4ulxn7f1gx1qq2rtmtw5eb4p3ma8rnq6l52hugtf8qcq3ydqlgnb6mdzdplgpmk9ci2e1',
                channelComponent: 'paai1qte9h0wmjoesaw1m7awyn9rucc4qco8ey0k0cvfse9943qvb9xvexsc9dx0bd6pbjfglf6hkz4zviywrilw2rvab6cjtbr70m2jg721nyu45t45ug8u7vf9u2qet8bo6pitiy4nqdhiufi3cp3yahxw4l4o',
                channelName: 'gy7g7e07c4ksshy00pqhsqpkv02pjwygvq6u4ykg216rofbdb3o9bzgvxnnvqp2civlltfmv49l4ui2yz0u0ovo2u3ax2n7f949a1tosbc7b1quprysb2boo5p81sjgojm7iacuuk293gvwyhtb5tf7ujqhrmxm6',
                detail: 'Soluta laboriosam voluptate accusantium. Officiis architecto quaerat magnam aut ea consequatur maiores quo. Qui deserunt fugit. Vel autem culpa.',
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
                id: '3590528f-d23a-4232-b036-a58070348587',
                tenantId: '6b2e2446-2a9a-444c-801a-ca8f814cfe62',
                tenantCode: 'nla7tr26cj9ihwvxlsye9ddlkaut0hod886sma0rbtnzk67skt',
                systemId: '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c',
                systemName: '8rfywgquf3fa2d3mgwvw',
                executionId: '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 21:06:23',
                executionMonitoringStartAt: '2020-07-26 17:38:31',
                executionMonitoringEndAt: null,
                status: 'UNREGISTERED',
                channelId: 'e3542545-7b8a-4afa-9f33-b560847d3bb5',
                channelSapId: '8en9lorwd90hb95e979hrex65qv6kir5advml84x3ej7fnow34',
                channelParty: 'ou86qok2sn5a4ylu8ttosuq9t84okf6i9z196ev01e0efiil95dme575kg4o3nkafpm3ese6nj0zzadf53cxr5rdorspstmoxctqfrfvdsgmogw8d16aghi1e621ejj9j0r05lrugpkewan52oznnvtn5bibtfwj',
                channelComponent: 'mm5lwq9tw6nzdk4syaza1dyhrq2tysw4g1cpuml16laznbjeorq2on693u3qxkcnv51zy476vnahv7jdim7jr1tsrk1uxm2ja4mu2k94szjnxigslm7ehmf9q0tjzf4rgf0ti4lafcn4t3ynchw57wnqhu0jkwmx',
                channelName: '20f6a2wav2bzjzx6rxip172szujczuavaceyypf9w9gkp0taukw6ou5wwpqm9rky8elx5mvtpp3x8ns3nce0fzr9hkn4ojmj6t28v6yzf0d0cxxzxkqfh7638w49d22arpnlvbodtc7gfzb32ngjhnj5mpsssvtr',
                detail: 'Et ad ipsum eaque omnis nulla. Esse quia sed vel magni eius nostrum qui incidunt et. Culpa odio fugiat consequatur et laborum sint est quasi.',
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
                id: '3590528f-d23a-4232-b036-a58070348587',
                tenantId: '6b2e2446-2a9a-444c-801a-ca8f814cfe62',
                tenantCode: 'amtaqufytxt2va1ozzq67r110gpu7s49t8pk177mya8sksmyw2',
                systemId: '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c',
                systemName: '61oaamhuqaj6d4nrdsoz',
                executionId: '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 13:47:04',
                executionMonitoringStartAt: '2020-07-26 21:21:39',
                
                status: 'SUCCESSFUL',
                channelId: 'e3542545-7b8a-4afa-9f33-b560847d3bb5',
                channelSapId: 'th17ngo9oxa4l26njqqmrg1ykg1z9sz03cm2qh7t3ukn36cf0o',
                channelParty: '78rxwmw1oosdiu5njlnl26rov0g0lv7s4h20so2n6owpb53ihqexyw96tcmjx3yk7u1l5okm0dmknbla3ihggc2duhdher2pbut64ao37xilwoaa1lnvkorb78pxec5uaj4sayjka75wyhu0amwcy9qw2kv0zkpm',
                channelComponent: '0fvyrrk7gthn9i6mj8kwm81fp02iy6kd9itmx97qr7ds86xtk3qv5mfw9brawpnsouuo4mgwe5ux5wa6u9appjjh0o2khk0ijufg35r2bws3biw040kjxcwuum09jumt5pn4f8yi0i35mqagghjc9yl905h4od3v',
                channelName: '57y5yc4y3npyg6ndp6jwi9fg8k939ddlabmyhqy1slcbeyg8bzbvvwbnadcl8hfmvmsxwacl0opxnosyvr8nqytwu3megcmwsixnm252aphd9rqkwzecxnqe6wj0vhz7p3by5ulcc56a0g8wmclj8cqkn74v6gh1',
                detail: 'Eveniet et maxime error vel. Dicta asperiores nobis et. Ut exercitationem pariatur.',
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
                id: '3590528f-d23a-4232-b036-a58070348587',
                tenantId: '6b2e2446-2a9a-444c-801a-ca8f814cfe62',
                tenantCode: 'mi6yzy8rm3560s80qeddnbmg9hxmmpsruojnni1djvsyt1hhrm',
                systemId: '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c',
                systemName: 'oqu8zunt32saspv70vex',
                executionId: '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 21:02:08',
                executionMonitoringStartAt: '2020-07-27 07:40:03',
                executionMonitoringEndAt: '2020-07-27 12:07:40',
                status: null,
                channelId: 'e3542545-7b8a-4afa-9f33-b560847d3bb5',
                channelSapId: 'jal0slm2rf9n4nshdkmzhxuo3mdqwb7qoe4jcv5wwc0mxjh303',
                channelParty: 'l1knhouod4otetovaatyslhpi2jtcu8b6b8ga5lp4a7uxytioj17akb2gs5pqivoj7u81pv72ds4cm2yzu3p0ftd9zpjy9ym37e2b065t2zk9ycdbq3p9u0cy8jc56g6gtmuzms1vxvvfrqpphxkfszhycncnkh9',
                channelComponent: '0li42vd8183vbs7qk7itb82xt6m6xf3zbc3xh0wkof3aj8ev1kv3mymiw4lkpfdna7y49xekl9wc6f642r4kc2na63ytefbz2uvgrydzwzg55vv342f12ax7sk4uk1k3hhu7h86uxu2110ffpla1ecz8klmase4h',
                channelName: 'atgqjifssc03h0ae6oz8tcmu1dajs5t520janqlefk0y1tnp4olw88oy0z8v0anwv6ojkv684o2ab5ezloib9ftaawuhyrg54dywwiwo21r9xacnqpk1f04kckshtoz9hajj6kwvgpphsh6uflvd9dq9yyfc7vbu',
                detail: 'Sapiente enim eaque amet ad. Et iste vero voluptatem voluptatem et. Similique consequatur consequuntur maiores voluptate beatae aut. Nobis et omnis modi sed.',
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
                id: '3590528f-d23a-4232-b036-a58070348587',
                tenantId: '6b2e2446-2a9a-444c-801a-ca8f814cfe62',
                tenantCode: 't77fleft0nqehxifgojn1at5lzoxkknknmyf9c6zjd16p3kdwy',
                systemId: '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c',
                systemName: '8o28lpy84hp5pfpi1ny9',
                executionId: '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 13:18:15',
                executionMonitoringStartAt: '2020-07-27 12:15:36',
                executionMonitoringEndAt: '2020-07-27 11:28:03',
                
                channelId: 'e3542545-7b8a-4afa-9f33-b560847d3bb5',
                channelSapId: '8l4irfwge4g1vb0khcslw5no5q6w42s3nywt1rx8pnbzhu5c4m',
                channelParty: 'yfbn9u2mi2czm10j4jyb4ft5uwktb0rijjfayoi5lgx0vsq2jdibperni5r324g3o84xudhk4eb5qki7zvtfn0xat6wxtfxamxpwqlhoo90k6rytk3asir1tccwgwxtldyz356t4ijdx7acu2jwlb2kggut0ejxp',
                channelComponent: 'p53sebsiob9lqxdkfvstsky3z3pjg0t27kqyxo2qmuvmqjx0o64un94ttgvaazxd4nvwi7wx7pk6z376nyhzajy3a8u5k5rpy2sbw5iqehrmgc1abav14v9sbp13ik6vvhulwnufrvwufu9mkecvt8lbdihw039t',
                channelName: '7k5or78kp4hpqxwrg3oj58upr7dtnf7g2dw9kq2tzpejch0affmvm3xu9kut7rk8l8vtgamjz4m7n1aoef74nz04zwi4nobqvoifgyrq2ocl19b45yn3zh32130o3hmvkrqz9fqcm2rrdceyjgxg00rg9a0kzkh5',
                detail: 'Enim dolorem consequatur voluptatem. Eveniet eveniet tempora molestiae quia et et quia. Pariatur blanditiis nesciunt molestiae iste itaque ut non.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailStatus must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3590528f-d23a-4232-b036-a58070348587',
                tenantId: '6b2e2446-2a9a-444c-801a-ca8f814cfe62',
                tenantCode: 'docwvraa4zlh56dxbgzgeoy3rbfrspz4jwmjq3j7oazwmzkyli',
                systemId: '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c',
                systemName: 'e4kpwcn4xhjddqzovnmg',
                executionId: '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 14:04:13',
                executionMonitoringStartAt: '2020-07-27 07:06:24',
                executionMonitoringEndAt: '2020-07-27 07:52:46',
                status: 'INACTIVE',
                channelId: null,
                channelSapId: 'bmb97ystw6r2em8kzrssaz34wwh0isnos5e5l7q0acihdyahex',
                channelParty: '0d13fhs9ljzoqzheq4jpyhl3gkabs08qyisjzrcop25sb9l2ptf4hyb5vacwnirvy786rupc266cgdovavuubh47dii6wej8d9ci6b2q1htcr06nmcjbtxhkr1qx1ojcic4e48kmbsjohux3rc9yrdozg75uiqj0',
                channelComponent: 'qxczeac1eq7ef02ko59ynq5m1qaukqz1r0a0tqpnplskwwoefm2ipx2l9z2uftkea377jozuh7sko2k6wnwy8m8g9uziwr4stnw42haujkwu7vbzi0tq1rlt2pth5zpbbk3xknyhsrql8tkmuhkc1wt2hgxu90av',
                channelName: 'ibh3r3eidhhkw23t097y1abypzjywb0zdgtyt5o8yhh9lcrcxoh7r3w243396a547kluf454cu3ks87msskpks4d3tx0zgok1ghof91j5x6e58skkzqa5ayfwurragw0bl2uy0kh3bqeea5dwb0arh4ffqpnmgvz',
                detail: 'Quia quo suscipit modi dolorem velit. Omnis tempora autem est voluptas. Dolorem officia vitae sed voluptatem eos.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3590528f-d23a-4232-b036-a58070348587',
                tenantId: '6b2e2446-2a9a-444c-801a-ca8f814cfe62',
                tenantCode: '20asd3vm8a6kyg2xi09v86m0v6ibb41adae8k5q48kyy0eawrn',
                systemId: '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c',
                systemName: 'moii6gb0roazrasya9h4',
                executionId: '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 02:43:07',
                executionMonitoringStartAt: '2020-07-26 21:39:12',
                executionMonitoringEndAt: '2020-07-26 17:04:50',
                status: 'SUCCESSFUL',
                
                channelSapId: 'tia8tq53lsqujk7yfwd30ojo3zo0bxa3vgqshizb0jne8e6xvc',
                channelParty: 'v8hkfijnsp2imjna5dwz0un1dyiz13zb9web98e7tghl5penur7697gzu4hs0e580ihm2z9tdq57o2lavobff38714xai2qz5mxoejsavze9aw4640ft3uz7kew97cd0vefhesx34i2pvowdze5x2rwzihptdrxz',
                channelComponent: 'eifyft2mu68tqppjm6hu7xxqju2k50z6sidwulh8ikxzxxjqj8vpsolch3s93x8uxqlb98g6wkwkvndoebt1imeslsitkwfui9h0panz525uf7eyboorvzpqh0l6o1ez75y93p1qqiymnef85s74t56s22d4ju0c',
                channelName: 'k1klqx8coixkor7kuc9fwrfd0goz8xfi8nf1dg63k8j0ed0mateuzp533xutm6ydseetszx2kpq31hxok3x8ctcdelh9p2d1p4p6y1e3s2z69lljacgbzg28m0rqpa46hrcvht6rzf56rphqwu0ecb0mrlz8wgpw',
                detail: 'Eligendi doloribus est harum officiis autem aut. Repellendus pariatur tenetur. Tempora non quis qui distinctio quia et. Voluptates et ipsam nesciunt voluptatum dolores illum omnis. Architecto voluptatem minus ut et eius.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelSapId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '3590528f-d23a-4232-b036-a58070348587',
                tenantId: '6b2e2446-2a9a-444c-801a-ca8f814cfe62',
                tenantCode: 'g8i7u7olvl2l8hvhr3az7a9kp5f5yq7tyw8i0fpa5ewyryvxio',
                systemId: '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c',
                systemName: '1cva0ll73wjwnlconkpe',
                executionId: '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 19:13:44',
                executionMonitoringStartAt: '2020-07-27 04:53:13',
                executionMonitoringEndAt: '2020-07-27 15:06:06',
                status: 'ERROR',
                channelId: 'e3542545-7b8a-4afa-9f33-b560847d3bb5',
                channelSapId: null,
                channelParty: '8pzvavysnhbt13iuvghupwx2lq08rd6z4yvl1xkl6z58s0bop66cc2m9xvic8f1anini7wflj5cvh7y34t9owcczmwx8yv1kur4f8wm3qub1ejgrkvtad40s9y6ls6aw0xikudos9c6kus1rrki52c2z8e5ehpfo',
                channelComponent: '4z8euvbirytkrgtmwvapob2dzt9xnnbyekhuguf1roan70kexw0nx3uczyno30w5cxlo2s1mxrolbk90qhruwuw4d49vfn6z3y82m0qh5m14ebkr0av8t81ynt5osmjf3bnuyepvte3bhr2nu5fu5r4cq6luignx',
                channelName: '2994x9o3pdw70kpb4qshv7s541p4atu6iok58izz9esep80aqnbm58p7k33cwel6l1oj34kc5yuk62esamunyhavndy9ubptrlgutzbryt3z64dca5z76bhsgvik209qbonetjyfhxhbjsr186g6oy0tgvrhrb4h',
                detail: 'Ipsa omnis aut dignissimos numquam suscipit. Consequatur quia minima facere. Suscipit eligendi placeat earum facilis reprehenderit ea.',
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
                id: '3590528f-d23a-4232-b036-a58070348587',
                tenantId: '6b2e2446-2a9a-444c-801a-ca8f814cfe62',
                tenantCode: 'btj75nx8vlx1vp59mmyx9ihmhvqhrft0dise792y5hn72s858a',
                systemId: '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c',
                systemName: '7auz7bbwjulo81rsii0a',
                executionId: '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 11:05:31',
                executionMonitoringStartAt: '2020-07-27 14:01:07',
                executionMonitoringEndAt: '2020-07-27 02:19:32',
                status: 'UNKNOWN',
                channelId: 'e3542545-7b8a-4afa-9f33-b560847d3bb5',
                
                channelParty: 'lcrd7kf16u7lgc52pufpyq4bnmzhk6sfm6drfk8ijvcf1hlnffm08dbxyjfz0kws5qid0xbjn6qgbvvi4968p1sx8kq0dwmg9ptv12w6ldcffr9qgzsazv7ewoeh4n7u2vafs31ornk93mfitwbg8rrp1oiz4khd',
                channelComponent: 'p87vhrsdrj8oiswtkacab7jirzs49kdyd3y8ndb3x59vdrni1xwrddqfpw4s4yoho1bn7kt74uvsj2g44gryizqi0fs08ec4ld4edea0haqjwzukx54n9919lesiqmqlbsq66827g9tnd9cxx3bjc69ptfx9hwlt',
                channelName: 'bzoc9bwtjbv5whrrske89ykjd8eq2596kzjl7tfyhialn49n8unwwwhrb2is7b0nna4x86kk0x5fzeis9atuyen5xy7juwyebmgg3k1vd05mwbzev3wdkt59xlb5qwy6yj6gi77eow3nnf35y1p7ijc65vbx4v4r',
                detail: 'Minima officia in. In fuga molestias sint non dolorum accusamus impedit vitae ab. Exercitationem aperiam suscipit. Voluptatibus nostrum animi itaque qui. Atque dicta eum in saepe vel.',
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
                id: '3590528f-d23a-4232-b036-a58070348587',
                tenantId: '6b2e2446-2a9a-444c-801a-ca8f814cfe62',
                tenantCode: 'f7r0bvuk3jbmrnc25wnw74dhj8wxkkarslwo521u8lizau3cex',
                systemId: '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c',
                systemName: 'crg9c4yrtay3kk7wfkwz',
                executionId: '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 04:35:59',
                executionMonitoringStartAt: '2020-07-27 14:40:35',
                executionMonitoringEndAt: '2020-07-27 08:18:12',
                status: 'STOPPED',
                channelId: 'e3542545-7b8a-4afa-9f33-b560847d3bb5',
                channelSapId: '7x4styh3am3eyqy3o2c1rkexytalztg0ql9dr1ktoeeuorxfnd',
                channelParty: 'hunt6matnxw91qwpoec0uf4r98c6edz207fpdvlpf03hz0f351qti3e6xbbdj02chfqjo1rua1z39pvxs60a4jk4vl5vm93dwim3th0ojnoks81eeavz5rg3szps7yywys956xsew5yt8rr5f61x2e4nceauk8mh',
                channelComponent: null,
                channelName: 'mfbevh3g6ile988ujp24c7p2xxvkbx8zzm81ku3sw57alaxrvoi0r3x7d7y5kx1vsurq3mgwz25p99pwnzizi0rzp82mfpbs4lyaj17lu24qni9qsfj8cs1ecflng095ndl8oun0703wa8rqr3apti31fg3y0i72',
                detail: 'Et qui nisi provident non expedita. Sed quaerat eum rem. Occaecati id voluptatem aut et.',
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
                id: '3590528f-d23a-4232-b036-a58070348587',
                tenantId: '6b2e2446-2a9a-444c-801a-ca8f814cfe62',
                tenantCode: 'gckngt7wvcxd3dwlebk4w1y1fpgv142n1k99bnfb93w192em7z',
                systemId: '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c',
                systemName: 'z45z5et6zmdu1p9qea4g',
                executionId: '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 15:38:17',
                executionMonitoringStartAt: '2020-07-26 21:14:10',
                executionMonitoringEndAt: '2020-07-26 17:29:03',
                status: 'ERROR',
                channelId: 'e3542545-7b8a-4afa-9f33-b560847d3bb5',
                channelSapId: '8tj831ubr0ga95chpvsggat4xg6dnaadnsbpj43cxx8y244ha9',
                channelParty: '6ouhc3r3c1m9x1z387gizr6ejmkix6hrkd8ra7qbb652yx03ya3qtnl811juh6shtrlo3qbaa9i7j1fdtaqrose63a3ogn2tb21lqj6v3s7ahh3hjxbteycfn2jibtqfieb27idzdjy8vodyxh5wr1hvw0ylkvak',
                
                channelName: 'ye6l3sac4h7qoqh74we07hrdbcqjy9izz90wwr48slykz88qemj0w2k81frida7xxxsd3u9nr2hgtomeugfat1snro3baf55u3vbc6w7oztf0zbev3z7sdmr2h99rbqjfuu5nvg55xr7f8h3kb5txprhw3cdc8ot',
                detail: 'Non dolor dolorem atque et enim quo nostrum culpa. Pariatur et optio ut corrupti aut voluptas exercitationem soluta. Eum nostrum possimus molestiae fugiat iusto ea laboriosam. Aut magnam molestias animi.',
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
                id: '3590528f-d23a-4232-b036-a58070348587',
                tenantId: '6b2e2446-2a9a-444c-801a-ca8f814cfe62',
                tenantCode: '2zpmmr6ekod5nhi8n1u6uvwdiz8bhc3zoi229el35gsrfgwuqg',
                systemId: '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c',
                systemName: 'p7avb35bpkp5fw6pc02i',
                executionId: '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 08:38:45',
                executionMonitoringStartAt: '2020-07-27 13:59:25',
                executionMonitoringEndAt: '2020-07-27 02:14:30',
                status: 'STOPPED',
                channelId: 'e3542545-7b8a-4afa-9f33-b560847d3bb5',
                channelSapId: '67uce4nou23mszsfpw48uz2d9ggyr61nk29vjdav5aj2lrjwd1',
                channelParty: '2nxvwgtrfmgm1q9vjzcfoccppygwl2nbhy23ul29z3z7gm26l5l2n34daogvj9258xh9u4wjxfjhb97wzqxugh6m7wnc2itm3vz55mob5sm20o8hugp8r0reotatyo7iq96a7mwluh7x0r4a4aiu8r4ms5ex32su',
                channelComponent: '21ex7baoyms2dm2nzpgmrfjyc43gbgqq6p2zo37kzww6p6b0jfl42ei18eojcmb4sze27qikcllc5ojtirs9bacj6q440dj3hwu0rt3ex18h4qvzfcnn60fl29ga29q5iioysz4jvvs3qvpz9l0uibwpr9znntd9',
                channelName: null,
                detail: 'Aut eius similique ut vel praesentium. Accusantium reprehenderit dolores qui qui harum dicta quibusdam iure iure. Similique molestiae quia minima sunt et ut unde. Sed illum tempore ratione exercitationem enim delectus itaque. Sed qui et possimus voluptatem aspernatur nemo velit. Vitae harum vel ut asperiores ut laudantium est qui.',
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
                id: '3590528f-d23a-4232-b036-a58070348587',
                tenantId: '6b2e2446-2a9a-444c-801a-ca8f814cfe62',
                tenantCode: 'agm6sw4gk3tnkghoefazijjbysr338lwuldhbroolv2w8ylcaq',
                systemId: '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c',
                systemName: 'd0eq4y1aoms9ymokbp03',
                executionId: '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 21:26:03',
                executionMonitoringStartAt: '2020-07-27 09:54:44',
                executionMonitoringEndAt: '2020-07-26 19:42:12',
                status: 'SUCCESSFUL',
                channelId: 'e3542545-7b8a-4afa-9f33-b560847d3bb5',
                channelSapId: 'eir3ywm4sfc83mfattc79364uozcqk47rdacayhu3r0eth6mfq',
                channelParty: 'hrgsf39ty8pav1aq90kqes49jg2dw5suc3c07sqzjx3cn35cpzbu8a3sg2ccvgz9bxlxl3vnyjcq6b26rjenoi197hnwq00lzy0eqm5v9iwhk062xtbhhvw1fbhy46losgtfjjm0isdlrzo9oyk300xlssmrxclz',
                channelComponent: 'b18k1he13092skoohltmi1cviq550cs0rbaq3qbkwez62igk1d6wyq421vs7ht5zxrdfo13396m6tyuidjbiwxk8fx6yey3pe6re64q5dcxgs9j2nxonf0xxeig8b8mwwiqkn8lpnwthd57reaf8tqo5jrxjqzss',
                
                detail: 'Asperiores libero sunt ut voluptatem. Nihil sunt nisi ut molestias saepe labore. Quas assumenda dolorem iusto id dignissimos vitae. Hic exercitationem nisi autem quos quia aperiam dicta.',
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
                id: 'zvmv08b6p6remj7yivuvjv1kcncblr28j2vpo',
                tenantId: '6b2e2446-2a9a-444c-801a-ca8f814cfe62',
                tenantCode: 'yxlypv0u66dpiw32gxkse4js5w8eyfeieje9ale9rni9v0ilr9',
                systemId: '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c',
                systemName: '8ws9fi7abluma15b4cy0',
                executionId: '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 17:59:52',
                executionMonitoringStartAt: '2020-07-26 23:34:01',
                executionMonitoringEndAt: '2020-07-26 23:28:13',
                status: 'ERROR',
                channelId: 'e3542545-7b8a-4afa-9f33-b560847d3bb5',
                channelSapId: 'hcyt42o5g9y13qwiaeckd45y71iufgj8wdzk9wp9l2ue432pus',
                channelParty: 'vcm2suqeju1jm4wry1eswwwbkpsaypuh5t5c3qc8bw6t2c1hxuu89uol3ybm16e46i3hma74tb0jhpc4dupdxqwomhpebrcd1izwkdu2o0eloobjqge7mk5hcdsypxl6zaurd65hs3fhyaoc090dn5u7whq768jv',
                channelComponent: 'groe32ndx8u1z47tv8ax6u6t214s5edmy14h1vpxn3qpsdp61uij1a76eyeckkqf779ih0ikdkkih2qyenq020ig56phe5j4z7oko6qbbx083ti0f72arww3rg2mbm0zimdmet36362a50wjh219opoey8d0hqno',
                channelName: 'k46agv326v3o3ykpctje31suelemqfz2dyj9mdi5z00b1lb444nzo5pdkvguvfeqp6qbcis2x4i9nxmf8yxczh1zvi6pib0vz02vw7x1u6qbw267s8n6julap5c4joobyh2xo1o7r9y7edyokwlqzyoiow03vfrd',
                detail: 'Cum harum architecto voluptas in voluptatem ab recusandae sed. Incidunt dolorem consequatur voluptatem quam sit. Natus vel id et et saepe dolorem. Atque est et. Necessitatibus reprehenderit sit.',
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
                id: '3590528f-d23a-4232-b036-a58070348587',
                tenantId: 'l7klze5rjwyq4vcaubfj3bglswb8l07pa0mg4',
                tenantCode: 'tg1zbgharourvrjgv8u0eeco8c2oxvusgvccfbz28q7lopdcsg',
                systemId: '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c',
                systemName: 'k11etjr2ztjqi07yo5x8',
                executionId: '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 21:05:35',
                executionMonitoringStartAt: '2020-07-27 01:06:04',
                executionMonitoringEndAt: '2020-07-27 06:07:25',
                status: 'SUCCESSFUL',
                channelId: 'e3542545-7b8a-4afa-9f33-b560847d3bb5',
                channelSapId: '992tl7gb08s57gzt6vry599swaclxjntofmyvzq80zx0aedl97',
                channelParty: 'ap710p3huq6s096k8e7ib8zaeyqbgtc2j5kwlbd000b1g0nfd3wndhhhc84dgyde0cj83ioujhepudyokvk4fju21emi4m30sx6vwnj61acz9tbh69n3buscfcbuc7rxhqz5bzp1qe8yzik332z2lg5uuws13pn8',
                channelComponent: 'ya7ntjddmdy7kvcsisr977ju5hb5e6dbyjl9k0hnptbwq0jji8imqnu8z0d59yqszlf6nhhuieudn78jrwuvy8en5ae25qlab5ze1hv4bzbt1lzqjgs1u6htx7foz09lf826977gm98u8rep7g7qt9wmqgzghb3h',
                channelName: 'ys8xkpxqq4ah44bcekomvzatyq0vtejf3jym8nwiliqj8aiamakzuwu3wfm6obfa2tyqza3ou3pgsy7w5fdt4mbel8iawgg1r4hjwk3fnlan4103lp6scsblw2cb6ywsn6exd4925zv0iik36p7l5jk2pehfg5fx',
                detail: 'Quia amet quis dolorem. Vel consequatur et facere quas ut. Qui velit sunt. Quam at fugit omnis recusandae repellat. Consequatur culpa ipsa ea nemo necessitatibus dolorem.',
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
                id: '3590528f-d23a-4232-b036-a58070348587',
                tenantId: '6b2e2446-2a9a-444c-801a-ca8f814cfe62',
                tenantCode: 'weabqwzux0u4ntlrvwxryjbko5oqyz8112uxlm6jwwc308rk90',
                systemId: '0s6squlmxduqps95qiq7ycz7yppl6t6qe328b',
                systemName: '0t1lsvt5oslybgpen81u',
                executionId: '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 01:13:13',
                executionMonitoringStartAt: '2020-07-27 13:08:38',
                executionMonitoringEndAt: '2020-07-27 14:15:19',
                status: 'STOPPED',
                channelId: 'e3542545-7b8a-4afa-9f33-b560847d3bb5',
                channelSapId: '2h9krgvgrsp1dulqwzy9ihm913xfknly3qyb9uparr70bgwlww',
                channelParty: 'ki5lozuz3ozzh69ypdi7vsf74i0ky2viyrbi3jyj66uvpjd0kqm3cl1yqqzlv7lnsldm27gf65u9qclyr8tatyorvhd036063r7xvt5a9re6vqdl3jcd2z2hkh51vboyxln5wnhwp32qqi4mkcwg4ikjpv31yrjr',
                channelComponent: 'iv07ks0nvvitge8zfxym3coo1a6712yahxwiwzbgybdd5dm4vyltiygoxzcm1f1bm3hjcpf66eu0oin5gpu40k1fzfsn3h57hqqvn3gpcgdxyf3gd7ubhhxirkc4e9u0k5iynf47q3y3nz0hyo4s45cd30atuzmn',
                channelName: 'jd1m3zwww3y7ez4o6mpg9d2vb8yfzjv2yk1enm9j8nx4ejphfiroexrajvulsifilq1wuu62mswcf4sxjcwucog4o0rxiei39z6pm6zwomm9fsl22seo477u76rvfnveyfjmzvlevk0mv35sghpfigwypwbw05n5',
                detail: 'Culpa quos reiciendis quis et eveniet. Ab consequuntur saepe consequatur. Odio officiis qui cum dolorem quis. Perspiciatis totam odit velit corporis id. Repellendus inventore eveniet delectus omnis sed. Inventore deleniti quidem quos error quod a aliquid.',
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
                id: '3590528f-d23a-4232-b036-a58070348587',
                tenantId: '6b2e2446-2a9a-444c-801a-ca8f814cfe62',
                tenantCode: 'en2k18v2ruavxkzaf066p8b43dagp4yigcrv1pikzou8rg9xim',
                systemId: '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c',
                systemName: 'kg1u43wqbxqulatl9l7o',
                executionId: 'yesmcp1k3u9kagde9z3hiun39zvclw5diwhpw',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 08:26:59',
                executionMonitoringStartAt: '2020-07-27 11:03:51',
                executionMonitoringEndAt: '2020-07-26 19:39:51',
                status: 'UNREGISTERED',
                channelId: 'e3542545-7b8a-4afa-9f33-b560847d3bb5',
                channelSapId: 'iqy33nphn3iylfim62z5ctvwb98eix8th8ho561ljdjodk2wfh',
                channelParty: 'fxlivpybpalxszqeccz6o5a4ir26fjyzt7rqons3d4kmamtea2d64lfwkmtogomtqbui5zocv515qpc1kg9jexudhhvi8c9dkpafh8uxzdbxil6jumk4wjppioiakcb7pmv9zs1udrbkb7exoknmbswq7kl9u1uq',
                channelComponent: 'mvndfyryyb2gofqnm22frlpo0kude3mcd744lbvnr3g3mo97q00jh59r1babuz36fa2zkywgvnxe133vlb27qqj5l6045h8alx6ichxuafx87olhf3mxkqi3ur10rsh6jaybjruie7azzsqvuifck2mw0h7ohbit',
                channelName: 'rbtzfx72xbikab1cko1c94owrffjtqe6e7jbg6a60zwxpoam2m2jh91u94zis203lc0indp4bd1z7lg9ayzjh3jetjdwr1x3kokgfff0z03gcb8dhwbulb0ebcki3suf05q802kjooixs4jki2mwlgzos7ynftz7',
                detail: 'Rerum est aut dicta vero nesciunt dolores eaque iure. Adipisci libero et dolor aliquam eos. Qui natus omnis vel deserunt. Quae eaque alias ipsa in blanditiis. Et consequatur magni reiciendis tempore non quae provident quas non.',
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
                id: '3590528f-d23a-4232-b036-a58070348587',
                tenantId: '6b2e2446-2a9a-444c-801a-ca8f814cfe62',
                tenantCode: '5sikpger4tg2ylu0nmt8s1kaxq7tt6cu0jjnlwvs951niedc1f',
                systemId: '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c',
                systemName: '645olu17cfpe5ba1tyqv',
                executionId: '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 07:13:38',
                executionMonitoringStartAt: '2020-07-27 08:05:14',
                executionMonitoringEndAt: '2020-07-27 15:31:31',
                status: 'STOPPED',
                channelId: '6x62koto23x0d2uurm4s1refvmeffr0rl992z',
                channelSapId: 'gyudcehwr31al2zniimk8oolletzorkihjm7d1c4ow6uug213i',
                channelParty: 'by9vqxb9vw4rs0eogubr3nv83mce3zbug02v9kxi62b0ttzmau1knl30vr635qe4hgo616022i69kv6eomzljdqle4v9a72oiyecyr3zlf5xtm9gxetevp6g7ac6avyuv7w1dggs0zvkw0w392yp7rziy046zldz',
                channelComponent: '5i6cdaimgsc6n37jdy789q7ejdg53j2qqlvhapwamkvofotrmje1yp6s83z4u79ofnb0yyscfp3hnwr3ifw3sym447bzpvtt6a1b671mn2w96vyk7j1tpx7rjho9dma7rxtsntmty9ne49gq0pcgc1putq6dyex2',
                channelName: 'm1tmdg8lt0sl4v8azepgrbshi8mmwrnozb5gurio86vcuusnl4gva3yqglix6g0agcbslj70mkqlbxhc40rtr73q853aqq3q4grqwilr1qyxxwfuo84cfhyj2om33tpkuz39tl8pkdqumtmthofnpy3gslaeelun',
                detail: 'Quo et maxime quia hic provident inventore reprehenderit. Ut nam consectetur ut labore natus sapiente et sed voluptates. Delectus rerum quod sunt. Voluptates est sit qui excepturi quia fugit.',
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
                id: '3590528f-d23a-4232-b036-a58070348587',
                tenantId: '6b2e2446-2a9a-444c-801a-ca8f814cfe62',
                tenantCode: 'isc0owolbpe7e2u6cnjocacrt4n1ign0sl4qz82kx3n3wfggeqp',
                systemId: '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c',
                systemName: 'q16nbkntysbg938oppza',
                executionId: '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 02:41:48',
                executionMonitoringStartAt: '2020-07-27 11:40:28',
                executionMonitoringEndAt: '2020-07-27 07:03:59',
                status: 'UNKNOWN',
                channelId: 'e3542545-7b8a-4afa-9f33-b560847d3bb5',
                channelSapId: 'k954e29ibu6s7v4h6bj9ssi7xpwsf84evzdowo96jld177y3gm',
                channelParty: 'htnjtp5ewgz3vaf55srfip7k19wjwgkey4eve8swvndiwe8tfpnty5cdhbgp8rgbd0ssm1hx6xg9d290thtbpenu1z45l50cl68bwqkjs6ay1h2an518orjq5bnszsnhibp47yyo0yz6vnuz5n31gkjhl74ev6ty',
                channelComponent: 'ccmn6s1hvghj9qlhh5xt4lvh1eoi9hs3f7okn5fy7gicg3anghamnj7urajpohirva8dc9osczicsn32e5ks0iuct4bqc3r5xxgas429s4oeijlnzl10osbcbqnarua3yljr5zitpd2tjia87dntv85l6t2cdcf5',
                channelName: '9xmg0orhhbmitl90ngmzwy4m6tavxvzohoeilqcgn80a8l3hjkhc4cna7ik572e7e84883af7d06aon7wbsgofoj5nsffk7zqfjzzh4unpe06qc0910hhxk6hk2ytaipyoottu9ocq9l0lgzhndv28f7y2arxidg',
                detail: 'Recusandae est fugit harum voluptatem voluptatem. Fuga ex veritatis eveniet quisquam ipsa et voluptatem ea quis. Sit maxime consequatur.',
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
                id: '3590528f-d23a-4232-b036-a58070348587',
                tenantId: '6b2e2446-2a9a-444c-801a-ca8f814cfe62',
                tenantCode: 'extpavh9lj385w5oa8ju5ezuqgmz82uecltmi1rk2q0bb0mb6m',
                systemId: '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c',
                systemName: '87fkl1nrvpf1rzbjcua2j',
                executionId: '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 10:16:47',
                executionMonitoringStartAt: '2020-07-27 07:48:39',
                executionMonitoringEndAt: '2020-07-26 20:49:21',
                status: 'UNKNOWN',
                channelId: 'e3542545-7b8a-4afa-9f33-b560847d3bb5',
                channelSapId: 'gdn09ez62ycrcluc8vv1pzbkowfeai5l6hyzo9bryuqt12gj3w',
                channelParty: '3xuguf683xpvb6a52yugj3cgz2512jb2mjljmdr3bu3j0ga1bc4jcerhahhl3p09ell5vhvpkru5sfj539jztscnlokmpiwkkpk2zv1d91tno4c5gdptpt5vyca2oihpj8t3f6nqfn8gkw1m9fa5y84tnb7rlt05',
                channelComponent: '0qj3jwpoyi83q34s8fgt5ftrf15izf16pkgck2kptqo043977dgx8060kj2dnre1mri3y93oi1uda2x2tb0jfn81l0o8xe2asd3jtr46q9k2r0p5rdsusiqmzp7kfs549y3xvi2zod5jpz70rwe2ci53g9pmjep6',
                channelName: 'nq8vmrldet5ltq619kfkcaxd2q9pxqwsumtpbm4b5ijzmb1rawux3svxqdsscv8jao6nmestc9wtzjmu07d29fu4ftyko2t05f7yvfbuu9rcz4isruwoz9poihe7ksivjoavpm8dj2wew3j6wkmpy7yt28zgr1fb',
                detail: 'Eum et dolor deserunt natus atque suscipit eos distinctio. Voluptas vel quia quisquam eaque provident non non accusantium voluptatum. Est id velit eaque voluptate est necessitatibus reiciendis cumque impedit. Ut officia recusandae voluptatem voluptas laboriosam sed quo est. Aut voluptates autem sed amet rerum error et quibusdam.',
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
                id: '3590528f-d23a-4232-b036-a58070348587',
                tenantId: '6b2e2446-2a9a-444c-801a-ca8f814cfe62',
                tenantCode: 'urocrgl0o0m8wrhwadtjw0jc7jhh45c62ugo387yl9rol657p9',
                systemId: '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c',
                systemName: '8g4jfxbmlm3389kij9q7',
                executionId: '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 15:33:15',
                executionMonitoringStartAt: '2020-07-27 01:44:05',
                executionMonitoringEndAt: '2020-07-26 23:06:33',
                status: 'UNKNOWN',
                channelId: 'e3542545-7b8a-4afa-9f33-b560847d3bb5',
                channelSapId: 'nr1fe9feuzcaksrprslkau1pdy81cs8uosdd78f9c0fvya0q16u',
                channelParty: 'lfqsy6120mf7p9iim5bhi84ajkspsrr1yucnj7r6nbgd8fm0ncdca49x6en6vwx73iinorzvjmhh6eon8hwa3mm0kvmbzhrubcq1ifo6vtlma2omli8zo2ypljnuwkcmo48e1n02o80wuqv0sff3ti49s2ozzr1v',
                channelComponent: '2z0rxut6fyoyu6m2tlyjbtfxvrucbhnkpbjljvwg4u9strksb1czcmyu1dx359nx0235zdeipqqju7qfic8v3fado64l1bfbspw0xlv26f0zmced3sjzm54yhd04c761lngnvjl2tdtl5mjvqp3d4611tlaes3tk',
                channelName: '7gz2fwe2zbqxxyw092x9etklxcf8z2zln4hqlcokysaq8yjbclpuuabkbm9w9u8x6luj5k387omxsrh56pt6r6ck6owtds8dyxwfmr8s1221jxzj4teuz2ssui8pgahmlt8aq9s3eoi9mg5cmkwsnk8or897zzma',
                detail: 'Voluptas aliquam architecto ad non vel rerum aut. In et repellendus. Et ipsa et esse dolorum quia dolore. Sit sunt aut numquam aut exercitationem et eum. Consequatur cumque sit consequatur ratione distinctio.',
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
                id: '3590528f-d23a-4232-b036-a58070348587',
                tenantId: '6b2e2446-2a9a-444c-801a-ca8f814cfe62',
                tenantCode: 'nm8gcnzq67cm8ovo71qvnc6uj8jw3dfbng4ylodbq5oj1leyjk',
                systemId: '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c',
                systemName: 'wvpa6ydwjysgx4pjdqi4',
                executionId: '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 11:47:39',
                executionMonitoringStartAt: '2020-07-27 02:42:36',
                executionMonitoringEndAt: '2020-07-27 06:30:26',
                status: 'UNKNOWN',
                channelId: 'e3542545-7b8a-4afa-9f33-b560847d3bb5',
                channelSapId: 'eima6xcf06e4ylo05hi8pgd84t0xg44q806vjz5739kkfk0pxw',
                channelParty: '75x31cno41380ribsrflhh1inhosmc2zfsftnr0ldvm4j5wdov4zfrwfoyrmxwspxki71icten9ra9p0tvcafj1tcyuhpuojjheu7zdq8fsepchw8jzkq38mmsawnjs67fhnj0axgtk7j96t6j0ruwrv0f8vds4k2',
                channelComponent: '0rp23w6p925sqd9o2w5chfq8flb9rv5ffjdzdsu2rj7i1kk2d8tqy46ozagxhsdqacafdzwn86zu8zxyxww7zbwzctxsob7h3862mk2drrlow2fpmh2b517j2bbet5s5bobyzawjhs53cqxvxuossh8ndmb3u57a',
                channelName: 'wfq0q9b7dyjwgkhfj0xnm5cpmt4tvvjtju4poow8lfsui7sveu20q9hhclgr5a4bcai7wouus9jvon1uvb5ym07mponbvo2recw8391scjar9wrtajps6k36kwq53yx8vedaflmdcgjxxi6agcxunexcxmhwu2rr',
                detail: 'Impedit ipsam aperiam optio enim aperiam expedita animi doloribus. Omnis modi et velit officia ut quam praesentium non corporis. Quam molestiae nemo. Sunt dignissimos laboriosam quas magnam sed. Ipsum minima voluptates labore officiis.',
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
                id: '3590528f-d23a-4232-b036-a58070348587',
                tenantId: '6b2e2446-2a9a-444c-801a-ca8f814cfe62',
                tenantCode: 'ptpwf7mmxwemjvsq7rm3j1nds51wls2cx374pj1g0p7t06sl3g',
                systemId: '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c',
                systemName: 'atiwyi1ukmvnp0gsisx3',
                executionId: '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 16:40:30',
                executionMonitoringStartAt: '2020-07-26 19:33:39',
                executionMonitoringEndAt: '2020-07-27 14:22:42',
                status: 'UNREGISTERED',
                channelId: 'e3542545-7b8a-4afa-9f33-b560847d3bb5',
                channelSapId: 'pcs8a75n95xpg8jpp6kt7lfc6x19h8rwjmflsdeudvhp8dslhh',
                channelParty: 'k8ydq8tn4zseix1y1ot8qswbjne8soy3en7aqvtsal525stgp4411riho3nfxrnaj8r48do9hvrt1l5m8serqzgk5rvxbtbcid46ovn3z0gu1ip1gsr86jrx8m6sf3o60rvsl3ha7jfruo57ors9jj55lnp9a4ng',
                channelComponent: 'vn2u1dia1dq6u1s0t8l1hk21ob9uh8wgjj7waz5aylbk6zynb1ttkp5o3s7ny5balixpve4f0wnz240vuogmol1qtfax3bhpb0lx0upiw2gdnzc444lt8wlkjsro1gqud5iuhw63d8yd42gbf17e7u4mrx1cqgkfe',
                channelName: '9hv3slfeo0fjnx35w6tocq9eb03rk5vb64nalvi8xezfliqdou9oeyzx1ffhuns9pfa6z1r8ucklyonqqlxym6hdeksubk2d1sfa4x4g3am6h4ejsb65d7tecgk6jilslz0eis4269hb68q0yv9n0alsplxca5xw',
                detail: 'Aut sunt ut amet qui libero. Cupiditate consequuntur itaque officia numquam veniam autem qui aut ut. Est exercitationem eos est sed qui tempore eum. Rerum maxime dolor quia pariatur sint necessitatibus. Qui est eius ea.',
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
                id: '3590528f-d23a-4232-b036-a58070348587',
                tenantId: '6b2e2446-2a9a-444c-801a-ca8f814cfe62',
                tenantCode: 'dtkvo63k0873yxsh67bdvzu1mf4f0991gsbqjapqpyv17a1zp3',
                systemId: '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c',
                systemName: 'ibfnom5yt8qdws0e2u8n',
                executionId: '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 21:13:54',
                executionMonitoringStartAt: '2020-07-26 17:39:24',
                executionMonitoringEndAt: '2020-07-27 14:18:52',
                status: 'UNKNOWN',
                channelId: 'e3542545-7b8a-4afa-9f33-b560847d3bb5',
                channelSapId: 'lwq6d3hk0btk5iybfuvq7wbztqs2vx7g0gfacv5m55mgg9jnt6',
                channelParty: 'evohq6b3qbqmgd5ikkmra6c63acm8e33cgmy0craf28ou0d5b59e5tbuave0yndmpxwzehoii1ggw5us3o9lpicd7f6hsjt21tazdo6o1qxrspfixdwsomiruhgglknenhtmf9432p4gb30gkntry8vhwtjk1wvl',
                channelComponent: 'ny7tuio3m07veei99wna9tesoym71n1nydhqp09j1nnw4p7sy67x4jckwps31jsd0sht0a2r9unc8lohy2dizndkpfc9eqayizbgw3s589esqz9bjms3n03lsp8cp6dfzqzoa3nuhcl02x3cd9gi1h5gf4xix9nn',
                channelName: '7xjz06h4103jh100illikuwdtt78ivce64fq4jjczetiadaxkv273tzfq5cje3vevzcq58aiunwufhw5yj13ksppn8wqvaa0hu2en9s5a03y0vuilijcy6jgqxf4vz5qkkaxle4ss95ctjt13apah3qwxwbveus46',
                detail: 'Omnis quia quisquam adipisci. Aperiam qui similique. Sunt iste enim voluptatem commodi et eum ut.',
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
                id: '3590528f-d23a-4232-b036-a58070348587',
                tenantId: '6b2e2446-2a9a-444c-801a-ca8f814cfe62',
                tenantCode: 'mwuo8ri3h845l4i1jlvm9p91w8kh6jespexe5llat398fu3ure',
                systemId: '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c',
                systemName: '1kty7zlai2suffu4ys21',
                executionId: '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-27 07:56:44',
                executionMonitoringStartAt: '2020-07-27 06:55:41',
                executionMonitoringEndAt: '2020-07-26 17:13:46',
                status: 'INACTIVE',
                channelId: 'e3542545-7b8a-4afa-9f33-b560847d3bb5',
                channelSapId: 'it2e2fn3bab8djmc3xbz6zzpcnius3ad8ezg3o6czpu6z66z4n',
                channelParty: 'laj4lsclsmsqsygcz3o5s74duqoo3fery1sw9u8heu8qvwy4dfchfemew8huvcg48xr3r6xe75m4ilkcnbiewlviwe5ndh9x2wktfibzn8k7jmsqna3t0t7b3rhkvjy21lfyhyuqo322q390ait14q0gwnztpf9h',
                channelComponent: '1s4l6b6q84avp6iv7so21vk2xcyybvxtz6oeqi1ur9ps821ngj4ofj2s3sor1087xiqyj72qlnrecmvz9zlfvnx9vl9tq6dcl1v53ok42akn3idw29qqkxbguakdmusdc8tk9gwv5lrvjv8t1w4ep93sjprwbmbu',
                channelName: 'dryql7wk6c990us0977pcg77pg3wtvgsuu8a3xjj60ffts1zhhz3id3c3333dgxidv44065rh8s16igguii1nmi2y63464yssvnygbq37353rc6mhauuhyrgozxaujluqqpxd983iewpvcvzd9q0jzcrkk0otcsq',
                detail: 'Eaque at sunt. Optio similique vel aliquid exercitationem. Minus deserunt iure ut dolor velit earum repellendus consequatur non. Maiores sunt cum quia et velit.',
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
                id: '3590528f-d23a-4232-b036-a58070348587',
                tenantId: '6b2e2446-2a9a-444c-801a-ca8f814cfe62',
                tenantCode: 'eapakbaqgj8mlro400zzj4dewqjl9pv98of012vmy7pvs4nq3n',
                systemId: '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c',
                systemName: 'c9hd2znl2lfceynchsxk',
                executionId: '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 23:58:30',
                executionMonitoringStartAt: '2020-07-27 01:04:27',
                executionMonitoringEndAt: '2020-07-27 03:54:12',
                status: 'XXXX',
                channelId: 'e3542545-7b8a-4afa-9f33-b560847d3bb5',
                channelSapId: '5bcx35zu461epg34fokpy54rprbjzs3ul3dik31viztxrd7e6n',
                channelParty: 'qvmab4tiwpw1fto0xg7q6nbg1kf1h560tzqh5qrncsdss9z5a7g0rbfj4vvp77iem23ywn31lkd4ygxhr0jsh2rtskc07gk48gt6v9aq15kw45x2dokrfo7u34z5crbng6v971o35pqaeowycb2rz4wqpfo4ufhf',
                channelComponent: 'ltzxr48ciprfd58rh9fhyfrfy1xy57mw6sxbz10wcudo4ohj2pbttuzl3votls4a2f5qte7coj23lqb375fqkxlvhfyqfbzkixz8of1ns4k6v5vz65n82cghgibqfzux2vatiwwx54gewce6an6urk7k9ibgtb78',
                channelName: 'w5mc2n3fif8i8t2t25d9jvezerss512fvujxmjbt8eyz74pzmxd1dxpsomjst985m8v6x59qwfpysmnb2nrnxbgm2vd9tld1sxuz1mwusufpmopmnv913pwqjzr9do6rga5jerc6hjksd0h6dos0ld0r80l7u3t2',
                detail: 'Ad libero in alias. Non veritatis blanditiis veniam excepturi doloremque neque. Dolorem molestiae voluptate est veritatis vero occaecati. Qui dignissimos perferendis omnis. Sed alias quia ut sapiente a.',
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
                id: '3590528f-d23a-4232-b036-a58070348587',
                tenantId: '6b2e2446-2a9a-444c-801a-ca8f814cfe62',
                tenantCode: 'msuw02hm0m7y828lotqi03ai6qd1w7sd18zvygygy19udhpbw4',
                systemId: '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c',
                systemName: 'nr1r4uplz2aqqrpyobbb',
                executionId: '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-27 02:23:17',
                executionMonitoringEndAt: '2020-07-27 00:14:08',
                status: 'UNREGISTERED',
                channelId: 'e3542545-7b8a-4afa-9f33-b560847d3bb5',
                channelSapId: 'qnbdq32xc30dw6r3rv9m4sh79mwgfs8m4gu7qvjw4djgwk9u9e',
                channelParty: 'eakz5trecj6plax74l31zq20byo65aaym83l78qyvoiwdqcsqfsx3rp9ywppmwp0ijfs7nusdfpp4h407vh12irb1m8uqf9hgayevgawibfj18sdavxmflby4tdecdbu8y0dusuh5car9bdttp18fa4dkdgjje28',
                channelComponent: 'm0cm3fjoaiqspxgtpbq8d51ekc5cac1mgx5m2tlvyq6lniuotbjko4cqzmwbnnm75jm8q5yizncvepz9ttetzuye0tgtursfb2mtm6v9hyuziv7nnx023l6z754evr6ig4n3cpxf76rkjnnq4c0za6wp19qnfory',
                channelName: 'tcfqab7qbm1w6riakym069rwawykaqwbzdbh1qlbe306aqfewq680h3lda9898pq9ihgfjicqyz4g40ciaupcmfenpu8sybw0s5e3b63qsh5f1frz3kdmq6ma58yj3jevgyx3gdolhpqbi1zj2zn6nflodkw60jg',
                detail: 'Vel soluta eum aliquid quibusdam laboriosam magni nam. Eum vel reiciendis error dolore. Cupiditate excepturi aliquid consequatur et. Et incidunt sed aut. Similique quam enim unde exercitationem aut enim. Non velit debitis quis eaque et.',
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
                id: '3590528f-d23a-4232-b036-a58070348587',
                tenantId: '6b2e2446-2a9a-444c-801a-ca8f814cfe62',
                tenantCode: 'njf3ge4ktygjjit5wkpu0a5e5yusmop1a55vtyq2ag7gnqpnd5',
                systemId: '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c',
                systemName: '5s1l3thzios16mnmj6kn',
                executionId: '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 21:11:39',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-27 07:53:42',
                status: 'ERROR',
                channelId: 'e3542545-7b8a-4afa-9f33-b560847d3bb5',
                channelSapId: 's09gxkya6ion8udoyuawzhzv5aqa269311cq3szwpkwrlsdevk',
                channelParty: 'la3q2reey9kymqoiq4d4lc2pfk6cp5ravixnw0l56k7w7z8pcmoofp9c7979ojzijivkpikewa69xyr2j64obhj1gqsj99zlof5n6zip9r2gm0k6u9hsjbpd62orts1kj014m3jghhihwmibrtlacd4n4rmz1a32',
                channelComponent: '55bm7ynx1bypohl1cja5wmd4vi872yxl3oolqf8xs7g8ta9cfqmqcw2haen2d7dzxzfjfmmcwh20obtzigh3wn8si294j99r2ia9hxruk0c8qp5k15h2x0io9hxq01alrpfq6vsisao7tv1d08o674grqia68u9j',
                channelName: 'v1imfuhciij9gscj6xqm5q6lftglam5zuchdc4rsq7kt25eevz3ctcs570552p06jswd6nn7m65h7g1i2srwv6x2ybwyg26ljuiok6wsqh6iv6sw6e9ymo8tfcdapfdmnt63rs0md24hevsa8xw47gxwq0ezq288',
                detail: 'Blanditiis minus qui qui. Omnis cumque dolore repellendus quisquam sit placeat deleniti nesciunt. Temporibus sunt ex. Quae aut aut accusamus iste sint. Facilis iure molestiae quis doloribus commodi rerum ut. Sed sint temporibus culpa officiis excepturi tempore quia aut sequi.',
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
                id: '3590528f-d23a-4232-b036-a58070348587',
                tenantId: '6b2e2446-2a9a-444c-801a-ca8f814cfe62',
                tenantCode: 'ygd1v40uyl5h3qgymy40r63npne35dxunjlui6uzyv1xemb7bn',
                systemId: '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c',
                systemName: 'x17td1d6j6wc0xnjnvhl',
                executionId: '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 11:01:42',
                executionMonitoringStartAt: '2020-07-27 09:41:55',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'UNKNOWN',
                channelId: 'e3542545-7b8a-4afa-9f33-b560847d3bb5',
                channelSapId: 'oecak1emuefgcfojimg18ve6mew6mv6b8hw519ascw26r5833o',
                channelParty: 'zwqavu45droevyemyq2aykmve0vwdozwg6shmowztpb86mkndyfxf0qo198cwi9g3ulnjxvvhmapyn1q9rub0qby74x5kgcfatx0j0nqea2zfgdb3xqd02ws4vwase6c58d5amnefqfklonbv0r1gzyukbc8jra3',
                channelComponent: '4ev5i9gohqrt7a8jp2a4ao9jrfnzvjg2koi1im1lx6u91l7twxa2go9o4wlh95mpj74i4lote4k73k9imqb4u9piga5akur381ofwl82qf5x3zavnknj1mpib7cct7czwf3e9houqs781lt4sl88v1oqtsnl8bby',
                channelName: 'chgu0qc4v06rq49b8no3nqm3t40en06ypqs34hxvzqiq0bu8rqikuiqtsz8atnkii94pvduj76rdvrobl3gbjfkfcx0ii18kisfbwpp6fhtgqjsoy5x4oluiqoskigsj991k2ruxpslyxsu0la7iuihq923fhsfz',
                detail: 'Velit et odit commodi. Dolores sint quia qui molestiae neque est qui. Et facere dolor et veritatis aliquid.',
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
                id: '3590528f-d23a-4232-b036-a58070348587',
                tenantId: '6b2e2446-2a9a-444c-801a-ca8f814cfe62',
                tenantCode: 'vp11q5tgcfcklajv4n7rjevccdhlq6m04ofoaf9q7gko9j5s40',
                systemId: '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c',
                systemName: '75mdhmbr61fw2xx0eln8',
                executionId: '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 14:22:51',
                executionMonitoringStartAt: '2020-07-26 23:45:23',
                executionMonitoringEndAt: '2020-07-26 23:25:00',
                status: 'SUCCESSFUL',
                channelId: 'e3542545-7b8a-4afa-9f33-b560847d3bb5',
                channelSapId: 'v26nprc3a4lfers0hwhh9mdc7e5zssogl5ddricbgpk2kv8ii4',
                channelParty: '032mu1clyu6lj7a1woh0oyx9hmsjdn1mg7ppiyl0uqw5ujktvvidzx13kw9a4bvkcuecqbgi832op3mc0x8463e23r4f23amwqsw9e6nyzb25wqbccp7zzywyonpjd76t646m6qkrhawvcrj1b67f7frwy0mnwj5',
                channelComponent: '8oef4bcralwk52e9c6pun55t7k58l8z6ab3ps1podxq3dts8mlets53q4smev87wqzst48gnoubctrpmtej0yx052urpef1v5ebhyhy3i7j4vx8o6uindt1f55mhotqj11dssin5lwztj6az81ihwfxopdv6m7i7',
                channelName: 'j42svjlzbedwc3uyy9a9kn315xqklux2aitszed42s6buby6jzhrmk9nbfm5gkg7vd8zwkw3sa5ovzgzzh9afp4vnqehl6rz0dw8fx27a81uknjio2sn9dt2dji9b6azgaxf581l449fa8uk646y4brp6bfbg0c0',
                detail: 'Ratione vitae temporibus fugit nobis cumque ut et aliquid tempore. Dolores laudantium aperiam numquam ut rerum. Perspiciatis explicabo quia. Quae tenetur eum perferendis facilis et voluptate. Doloremque tenetur quia ratione labore consequatur labore ratione enim illo.',
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
                        value   : '3590528f-d23a-4232-b036-a58070348587'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '3590528f-d23a-4232-b036-a58070348587'));
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
            .get('/bplus-it-sappi/channel-detail/3590528f-d23a-4232-b036-a58070348587')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '3590528f-d23a-4232-b036-a58070348587'));
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
                
                id: 'f16aa054-f31c-4b53-95f9-41f93f97e53c',
                tenantId: '84c7bb65-2de3-4acc-90d2-ec347f224b54',
                tenantCode: 'ailjdkt24ed370o4ne2skwbq9h90dqy4eeqclowgfgyq9sinmc',
                systemId: '6586a0d4-168b-4f56-8ba7-d4e35152235a',
                systemName: 'jz7e7dz897fsxr2oz0qr',
                executionId: '485836f3-21e7-46cc-bf67-9f9b824c0b45',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 05:00:39',
                executionMonitoringStartAt: '2020-07-26 17:45:48',
                executionMonitoringEndAt: '2020-07-27 09:06:49',
                status: 'UNKNOWN',
                channelId: 'd07be74c-5302-47e7-9af0-370bc9aa84b9',
                channelSapId: 'b2mpu1t2hgq5jodk2pibqnghzrq8ge5lpokmtpbb01uyaw840u',
                channelParty: 'olqdzr3hfh4cvfwmut1lw2vvsb49jj8krcp5n0pgcjv2e1hyeiiiqovc4vlcztebg21b5ez60mgt9gcrokmsfaelx7q91rvvlcjik4aoqykpararwjjrukjivwt1qm8gial2zmg6s0adgnu99p7mt97350jcuj9k',
                channelComponent: '7e4mv6ggyha7xq0wvhm1um3ro1d4lb22cvo70gttfvlueozq32dizao7m2bvi6wvkg46qytbr4pvarqgezv5h8ncmyjko7febyfxr35v5dfrhlqmr2ferywcab1rvu0ix869j6w4kuxniwplmhemxln1i35vk9ii',
                channelName: 'ee0icpe9jpbtzxfxasvdq7t7hq2u5qk18h61nbt35mk4gvdezdei9ysz87vxghyngvy7xf6d3rq274ykqp516rxf1vsjw6cq6qm17yhvcg0fxa3kppcbi8poihi5l6fmqv2leu5vcq26rd2mdmfqql9kvexklf8i',
                detail: 'Dolorem incidunt dolorem exercitationem voluptatem et earum veniam id. Error voluptatem est sed dolores molestiae. Sunt ipsum occaecati ipsa amet eius sequi deserunt. Quam maxime voluptatem perspiciatis quo ea voluptas deleniti quisquam. Vel blanditiis incidunt. Repudiandae quod consequuntur omnis dolor.',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '3590528f-d23a-4232-b036-a58070348587',
                tenantId: '6b2e2446-2a9a-444c-801a-ca8f814cfe62',
                tenantCode: '7efywqcz21oao98c2kqvy65rl2iom562ny9q7q5ra15tpww3br',
                systemId: '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c',
                systemName: '1u8d96f3kf9ly4u9tn8z',
                executionId: '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 21:42:10',
                executionMonitoringStartAt: '2020-07-26 19:55:57',
                executionMonitoringEndAt: '2020-07-27 02:36:46',
                status: 'SUCCESSFUL',
                channelId: 'e3542545-7b8a-4afa-9f33-b560847d3bb5',
                channelSapId: '7qwmjr5tds0d60nir08nor8nxp0z9401njzlibq2kk828gg03r',
                channelParty: 'vwp1qascignl5seal6n0u8c9zmn1y7umj04ozro45e3ajfooh14hxcvfbroqty3wzy2fhgnyq22g2bhislle8h5844vq6xpzxy8xs27dfe6pxjy01gh52aubz8uv4atf9d2ro3pd5x5is19h0rvqxxjb4ekct9yr',
                channelComponent: 'fuxfu8rpn642ejcbbn1bct29uesv0ievfqt12cvbhvmwm1rlwd9m0m2517lyzt3brmbd7retf0b4j4kxweaof4rxhhr7u60nmzanwbpl83bizxo04w5bg5mclq0nv1x9o7egcrhime0slm2s7w6ma5t2ssfwplvv',
                channelName: 'ngyo9hx21twelo5905hsbklj0jpa7mlzlpx10cbyqgc365ao1rvujyqji2ume7d7fau9z0pqxk0f4zo0110bzgq05emkfqnsos6j0950qg3mlj5s75jeo0iohjsd0fex2jfrznj9p0iepebiq5t9r4lcficzmox6',
                detail: 'Esse iusto nihil sint qui a. Magnam quia et in deserunt at ipsum sit ea voluptate. Suscipit quia alias. Tempora itaque laborum eum quas in quis aperiam. Dolore quos sint quaerat dolore non voluptatibus. Molestiae est molestias repellendus asperiores.',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '3590528f-d23a-4232-b036-a58070348587'));
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
            .delete('/bplus-it-sappi/channel-detail/3590528f-d23a-4232-b036-a58070348587')
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
                        id: 'b806f5bc-aac2-4916-8f2e-8853c2b9a6e8',
                        tenantId: '6b2e2446-2a9a-444c-801a-ca8f814cfe62',
                        tenantCode: '82k0p9dce8753c5yrusav7w1wnzewqzb8vncqlblp1rnfnsem0',
                        systemId: '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c',
                        systemName: 'oc2ox1lkwz65yute2ec5',
                        executionId: '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-27 09:41:05',
                        executionMonitoringStartAt: '2020-07-27 10:22:46',
                        executionMonitoringEndAt: '2020-07-27 01:28:05',
                        status: 'STOPPED',
                        channelId: 'e3542545-7b8a-4afa-9f33-b560847d3bb5',
                        channelSapId: 'zh85e9lned6uvolwdf473jfskweue1cdnysfa4owd9xqp7hpol',
                        channelParty: 'rcupvh9xp74xsnqikwf34p4kowzy6wn19495l89zq6tuxs7pm0552m7ax4ksq5cmvg80r2q5avp4knkdg9uymaqpao83669aqcbdymu3tt1w0r6w8tfht4fafosjxjs43hrt45zjsti7zgcitb23a2hpatnenaj9',
                        channelComponent: 'lffw96u30yaevfsh69duuesyxftwek0ibpcn7gsff00ujzxg7dz0v1tiev2e5dx7aaa18z6r8w9zxh6i15evduqxwnq601npkzslohrwzhr9hy7e43h2e9aw8lyc5oum68cqndqd46kb2eamcyadjckr42usnbg8',
                        channelName: 'amaces392y4glt12d5rmptoh2mxpljjodgbwf5ddj7sm5qg4xs1cddpqx92bs2xya2nre01lofao4wk0f6beguwj2kycm1tg1rjd7k76jvuygu2owj1j8sgk6qtx3jwiyufo62yaygq0blko4ne217cedpohlkpy',
                        detail: 'Dolor similique quod. Aspernatur eum id est praesentium voluptate nulla nihil molestias. Possimus temporibus vero perspiciatis sed quis recusandae repellendus sequi recusandae.',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannelDetail).toHaveProperty('id', 'b806f5bc-aac2-4916-8f2e-8853c2b9a6e8');
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
                            value   : '3590528f-d23a-4232-b036-a58070348587'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelDetail.id).toStrictEqual('3590528f-d23a-4232-b036-a58070348587');
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
                    id: '3590528f-d23a-4232-b036-a58070348587'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelDetailById.id).toStrictEqual('3590528f-d23a-4232-b036-a58070348587');
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
                        
                        id: '10965e6e-3b28-4c2a-8440-a7a9f3171825',
                        tenantId: '7d3c3e6b-b272-4113-b7a9-bfc5fe488a0d',
                        tenantCode: 'onanibaxmo8cm9nvayoubosdggerxxbbvodbn0kpwtzcck88of',
                        systemId: '1896a24b-1b3c-4cbf-9047-558a6a23622f',
                        systemName: '7etjhb5khrrg6h0snid1',
                        executionId: '0a97c5d6-3e89-4733-a18d-0ab4ecc963a9',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-27 00:26:32',
                        executionMonitoringStartAt: '2020-07-27 00:25:23',
                        executionMonitoringEndAt: '2020-07-26 19:18:34',
                        status: 'UNREGISTERED',
                        channelId: 'fb6659fc-a791-49e0-bfa9-cf8b8576aa3a',
                        channelSapId: '8clr8v9yjczdiqlug0m6ve9gjlgavxjevgvo46e8ia2b4gtpjn',
                        channelParty: 'sc5329ztwdifx2ns3zu72pkt5erhm62dybr1orth5cwhwz3w8bio8n83kaasuhqhmk9x7lphazvqbekell65ik2x36z1o1xkws7h4qb02zhcucih9ma5durj3r1v4luo665pk48wbppiyfhewt50evb4ezt0cxg6',
                        channelComponent: 'bslm30vbg7a5atqnctkp0yi2oedhpx1w6pu8t5an7jezxadyo9mu1n2exvmef3a0ioyof3vgh6ojpy4oc0enqtz6mx4p3gx2ofkm5bnh10pgztnsetnwjgcvf32supoxzqrdt4x9ztw986363jie8xxq3kjr5fs3',
                        channelName: 'vfco39fshoum61waeat00m6w8tqzxx7r5cd41d2xs2inq0rqhfpaehsx0nqqab816fgjdr0dovj9xei7yv501qz4qee5pds9ho3phko4cpko80t0jlee0xo3vf78te8tcxnbqzip5rnoarevxm3bfvuesm4dbfpo',
                        detail: 'Fuga ex id quam distinctio repellat omnis voluptas dolores aut. Et repudiandae occaecati accusantium nisi iure assumenda. Amet non nihil. Aperiam porro est a incidunt ea sed esse. Ipsam totam ad et et ipsa et.',
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
                        
                        id: '3590528f-d23a-4232-b036-a58070348587',
                        tenantId: '6b2e2446-2a9a-444c-801a-ca8f814cfe62',
                        tenantCode: '5021m66as390qrunthf98yh6j1nmcn4e00l7c0dxcdsydf39l8',
                        systemId: '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c',
                        systemName: '9uav28gp3s9g05x77i4x',
                        executionId: '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-27 14:33:27',
                        executionMonitoringStartAt: '2020-07-27 05:57:40',
                        executionMonitoringEndAt: '2020-07-26 17:31:01',
                        status: 'SUCCESSFUL',
                        channelId: 'e3542545-7b8a-4afa-9f33-b560847d3bb5',
                        channelSapId: 'mljokr7vjueawqjn7z6oad7wudpe0nrp3i2uz1vd5vpsyjzcgy',
                        channelParty: 'do74q7v7r278o1y4ejqjwemkg695v488gmy5pyqgsb6y2wki72j67pokejlydrats7u2170xi48rgypglqef4r289vepm6ihm5s37e5dg100ndpy8c60tbuoyuxy7vrxzju9fey0sr208xu1w7ztguy67azdb3t3',
                        channelComponent: '6hmz4hdmft19s2ip3pvvde8albz0be1qprcin0wmobuqe87j4461kx902267bjnhtgd07dhdeaw0b4tq9herbm72f8y9uskpyusje45pw5ceutqw0mo86ejl04eiypes9fcchs0uiwuhjoq45ycdn1gelhi46skd',
                        channelName: 'pngox3kqr7su1dizo4jz1018y4y1bvsego82pv4ae91oxk15gk5m67py4c1d8ar9f92mpumm3u2g2kloxmli2zzp4v6wxrifns2qu3t7681mhlfx141xmu4z7ad91yjija3s9ignxnygp4o29s9yxa0g5gnleioy',
                        detail: 'Dolor quibusdam non quo maxime quisquam veritatis quasi laboriosam labore. Dignissimos corrupti et sequi minima et aut excepturi. Magni ut quam corporis cumque est corporis et tenetur quas. Iste repellendus sed et labore illo incidunt nisi sed. Magnam libero eveniet eos. Eaque deleniti non dolor tempora aut.',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannelDetail.id).toStrictEqual('3590528f-d23a-4232-b036-a58070348587');
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
                    id: '3590528f-d23a-4232-b036-a58070348587'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelDetailById.id).toStrictEqual('3590528f-d23a-4232-b036-a58070348587');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});