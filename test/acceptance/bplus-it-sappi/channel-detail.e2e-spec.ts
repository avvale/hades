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
                tenantId: '04dea72f-4666-48f4-8957-aa0d3149f993',
                systemId: '22670223-233d-4d94-996f-1be8f793f547',
                systemName: 'khumcph8bqmvkwit70jv',
                executionId: 'b2bb4e30-6145-47b4-b18e-35fbdbd8d216',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 08:17:11',
                executionMonitoringStartAt: '2020-07-21 09:02:47',
                executionMonitoringEndAt: '2020-07-21 18:48:58',
                status: 'SUCCESSFUL',
                channelId: '8fd7172f-e38f-42f2-a152-1d0079b549df',
                channelParty: 'sbzqc6ywco0e9pjduj4aiy4ponp8kntnuduipjqksd3sn56aps45hxlhp3gh4zlrh50c82igzu06qhl5x6lwimtx5cmxowbr8sguqq3cwvtdpyte08jxh5ojndv0cdqlt3ub4pxy8eqqurkat5w59fpw4u4y4yzd',
                channelComponent: 'uegypudhe93hwuicpzeblxfededdb05h64rwvkvitfnq1ylrukha5msl0ejnfkrtvg01s5dyf3tplra0evbi925m0b8fyhw35vihjthq0cg2fbec5zi6fibhjea02vkv6mm7wdxho6b51iof90lfpw9md5x0wgwk',
                channelName: 'az9cnrhdg5asm3bazpoxxr35709hb1wftefmlcijl6dc75bjo87glpiiwlbu974klnfqoq2zc6hhyk6d7e2xvsuplr7u5gqyrj3zufkbicujkjr88nz7sp118llbjqtc96zmf1qldr8xeg1fbnbfqwnhc1aqvkcq',
                detail: 'Ex at quia. Sed culpa voluptate libero recusandae cum ratione qui. Maiores ut quia consequatur. Ut labore quis aperiam eos. Occaecati earum nam sunt dolorem voluptatum in velit magnam.',
                example: '2b0riza5rmeqp26j9qlyi6rt3k0tefbsa8094y5adn8ko5qqcnz0iwaa1fc1zf94y146s7se5g6bhbfmqqbrhc4zbmr74acgicilq0knb1kuxnh1sdedg9pz2ahqq2hvmyfokf824pyeogqkg1eyz8pvux3p05zl',
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
                
                tenantId: '04dea72f-4666-48f4-8957-aa0d3149f993',
                systemId: '22670223-233d-4d94-996f-1be8f793f547',
                systemName: 'tgmjns3te5cwj43m7icg',
                executionId: 'b2bb4e30-6145-47b4-b18e-35fbdbd8d216',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 09:17:43',
                executionMonitoringStartAt: '2020-07-21 13:03:54',
                executionMonitoringEndAt: '2020-07-21 12:19:37',
                status: 'SUCCESSFUL',
                channelId: '8fd7172f-e38f-42f2-a152-1d0079b549df',
                channelParty: 'dgsbo29io0o8pknopucmhycvayvk5hqde0bk4wucbmb1hef8rja5glbjcryu9js8mx8fewb2i5ho5179hexg1jt2xt5irqf0sc5dxkrarmfn907mfdiojhjh54le7wkt2w7djqfnj27r1cjygs5hlx7b5j551gxs',
                channelComponent: 'twnd2tq08neu1d1ukajilst512pljz4bg40ioiijsrfrdi1llzj9lvuvsv5pugihy2ok8x81j6vvqk0jp7dk5e7m5vk12mvxthvbg9nejqhq6rgjnhvamzhzbzdec6vy18t2nie3dk5jjzzyytcowa9k34pgrlbh',
                channelName: 'goy8n4kgh2vgflimvfh3nygp6wtfdn9nut2llpilrntj796mo7741t58qoma4lc06us87m2knytg43xgxv34pv3rh3qv6wfq4tw8wwdyvrwotabq6zz50h2uencs6sr8ha7ts1taeq41f1w5cefir0rivqlm4fi2',
                detail: 'Facilis autem modi reiciendis ea harum suscipit voluptas neque provident. Nostrum molestiae asperiores distinctio esse. Nihil enim et iusto molestias alias quas. Facilis odio in numquam optio facilis. Reiciendis veritatis modi quasi necessitatibus. Omnis eaque voluptas non atque et quo itaque.',
                example: 'eyxn5mcvhsa9btdcz3rogjnr7ksqdcxlzuc1h19xz07htjo8006lndc7niuq8v2djkuews8cv69ga17mmjsp6yjguxjb0h4smaj9hq3o6gr71ykbjyupyy28r6f6ddqicp21kcj1twll9ujemt2zk8abavwghkkz',
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
                id: 'a1f89b4f-784d-4888-87f5-9f72d75a709e',
                tenantId: null,
                systemId: '22670223-233d-4d94-996f-1be8f793f547',
                systemName: 'g5ilz76g26nx28tt41td',
                executionId: 'b2bb4e30-6145-47b4-b18e-35fbdbd8d216',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 08:44:45',
                executionMonitoringStartAt: '2020-07-21 14:00:31',
                executionMonitoringEndAt: '2020-07-21 05:28:58',
                status: 'UNKNOWN',
                channelId: '8fd7172f-e38f-42f2-a152-1d0079b549df',
                channelParty: 'e6iz59hjnwqc3nux1dtv36ykyn8f1r7jyezisjesb61btoy0fqi0ypo873dt4n43xlwphl707ai4230qr4fj9smkegwk9swscnx31jnwhlx67f4aoi7zwdi4jci5rrxau7on8dkl50jtjn05i1plp79z4bpmr97u',
                channelComponent: '4vaeiv5vr9h8a2msus606eijznf25n7a3b8d9h1gd4btruc7ib8fyaq0pvnviihkuq0x4k3qpmvd994epe7lo1nusu44i8k7mshksimmf8mye925vcd1s0yq6y80eucgd35610t25ckw3ayzrl7vye0z53lpn55b',
                channelName: '9d90k3nsjjn9zznwkvj09xmx8rvg6gxwvl9amyjgijpv9ne35ic1ugns1y2089hrtpj2f3zgh46lzq6y0xuvycufrbajwkvn5ul57bg7d6y0dkli65bddbjqwilsd1si2nhmcz1i44wzd0rut8kz34x28kn1yq46',
                detail: 'Alias maiores adipisci tempora. Nulla qui sint distinctio iste sunt et enim modi incidunt. Qui sed non quod ut ullam aut. Voluptatibus voluptatem quas odio hic officia. Molestias dolores voluptate minus voluptatibus aut.',
                example: 'kchv6vjif2ouqmohiwaekj13cuc1vd2qrx0p4qmk7xicwoobnlymz4as4drs13pp74bobpqwnvmya0azhnuui8r5iemkb5biao62dokh1d06ao262ueac873w61p1vivuwmh6ex5k61jy8vlhez0a6d6gy8vj4kw',
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
                id: 'a1f89b4f-784d-4888-87f5-9f72d75a709e',
                
                systemId: '22670223-233d-4d94-996f-1be8f793f547',
                systemName: 'lsd59ar9x24408o0r40d',
                executionId: 'b2bb4e30-6145-47b4-b18e-35fbdbd8d216',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 12:48:11',
                executionMonitoringStartAt: '2020-07-21 23:18:13',
                executionMonitoringEndAt: '2020-07-21 08:09:48',
                status: 'SUCCESSFUL',
                channelId: '8fd7172f-e38f-42f2-a152-1d0079b549df',
                channelParty: 'xfb30jmem2ok3dqvr9dxgyl434g5vozicpqsh0p58v96xpi1tfsfn7zr80xfyvf8tgjbylbeaya8nmhinqemc9k2w3qje1sqyr8j0exy16hp94f4zvk0z5h77z4feff60yb32oem7g8xegw2t92ojp8ug02ru2cx',
                channelComponent: 'lvsc887qw044unu7umshy6pglverxk0bxcpq2l8g6zxkzqiq2ps9yx0rsonkbf15qnwu1qv80feexk3td2rhjfpcuhvz22umzhagf3i6ntfil8tgaxg9sca3fdwyi2nc3rv3o72wzapgyqc06ngt2v8rj0dyifur',
                channelName: 'nf4wphyrh34z9d3a63wcfrdgiclh154zg5ncruvsglmelv099xkya4joonm9nwza5rol2vjstgeck0hjda1h8yhd6h35e7m2uw9spevzlbuyki4sctlucbp9zfooe0f9tos1oi6mlr5nqdj2us3dpxw9c8kfajr0',
                detail: 'Placeat aut sint eos magni quod occaecati. Autem voluptatum quia distinctio minus similique modi. Pariatur quia et quibusdam praesentium aperiam aut. Non soluta iure ea culpa temporibus ad dolore sint. Minima nam illum aliquam in culpa necessitatibus ea commodi. Omnis optio placeat enim blanditiis cupiditate impedit cumque quam commodi.',
                example: 'r4oj7jvfoug4hwrf6qad2fgoydoc3mw26ftbhddr0j0rowndpzbwaasjhz1lqelvmj7bl109ezdap5erz7d1yog7t4j3osx54gjbf3j3n71lfco53m0iplmhby8zep1554dea825bbv03ghrqkvj0omuw535foqa',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a1f89b4f-784d-4888-87f5-9f72d75a709e',
                tenantId: '04dea72f-4666-48f4-8957-aa0d3149f993',
                systemId: null,
                systemName: 'pmi4mbj0tpmyxrrbdwte',
                executionId: 'b2bb4e30-6145-47b4-b18e-35fbdbd8d216',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 01:12:46',
                executionMonitoringStartAt: '2020-07-21 00:54:37',
                executionMonitoringEndAt: '2020-07-21 23:54:25',
                status: 'UNREGISTERED',
                channelId: '8fd7172f-e38f-42f2-a152-1d0079b549df',
                channelParty: 'enihj38p33r5q5hriqzb0z8kpts6arw8taelzo2qbnc02om2h7r9zbmyblkfm15ih627ottv2fvqwvtk5sit9noy9gibhc9fdrrus609fueoen0cemkhjkmund7tt2c1qcty7o71ashdpiny2o0n0d9uoby9z12q',
                channelComponent: 'wy6swuh8r9stv29xg0q84s5qfnvuwtmzo2or3jwdgccxvjdt5yi9lot9vl5tjnvlwsp473ni0o3ics0woh20goee5tmjgdt7abifassucnncxooi7m4mt86t39aiqigbakesjpow5vlkes06c4d9zbqq9q1gcnhy',
                channelName: 'fvju5zvc3tfb4bydotelv8imh2t2rk9ns7mhfb9wtfiz5aoj50zgyzx26rz5j4x7zoggcwcykrkqhmgspdtktvp0soujl3pdty7fml335wyiz7ppp0mmxbgg3sb8kivhfecr3mrw35h8r8kkgxjpu7w3xhn1m39e',
                detail: 'Enim provident sint doloribus velit sit. Et officiis aspernatur eum ab qui corporis. Vel omnis ratione nam ut.',
                example: '7hdabut0lpqxg9i92o7v6hh01bdrj4vz6wlg8beev1zzdnpqq41g6k00kf7zqe3vcvyl2nsq25ce504dzjnt4lrunyghumv1lcbdsid0rkex0w1bf02izyin6hwvdjulqcbh0fhncl61kdhxfh9k2idqvndnv7vg',
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
                id: 'a1f89b4f-784d-4888-87f5-9f72d75a709e',
                tenantId: '04dea72f-4666-48f4-8957-aa0d3149f993',
                
                systemName: '9igm9vhls8hoz6xxpx7a',
                executionId: 'b2bb4e30-6145-47b4-b18e-35fbdbd8d216',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 07:23:36',
                executionMonitoringStartAt: '2020-07-21 01:53:11',
                executionMonitoringEndAt: '2020-07-21 04:49:25',
                status: 'UNREGISTERED',
                channelId: '8fd7172f-e38f-42f2-a152-1d0079b549df',
                channelParty: 'iejwsbblrejojy791w94dlvg96mqit0mbjbc6dnw9pks9e0k1n3cfs4qshhhvfngjfuq825jhnsqggccg0kl15pfthc4vva0igzv6ov01isy3ol8558p7pu561iuxz4wq8yem88uwx4le1mno3d8kxddnt4zgoyb',
                channelComponent: 'p7kpf3lfla6uiabhn379wansruiwsxebxapdh13i42xlljm0rqx4xu4fhbshixx5243362osu5kmeznm2xhr2edjlvpmpk6exgptm7x7kb6f8e53jkkp1mizp7jsncc4kewnyeycxa7si3dmy32u430w2gljuasv',
                channelName: '8qfuszlb9mhkozgjjna6vmf8qwspwo9xoyrki4hrbdv26c0nnt5g549jcqz8xfqn7of4fzvqeetad8g1052eadsm1isb0c606x8srcx7f4ti6pxejz2sd8fwp2cfbfigfvbku00nhvs6me2gtje4vl210vlj3ne1',
                detail: 'Officiis non vitae minima. Voluptas alias nihil explicabo eum. Iusto est possimus et quaerat occaecati enim et.',
                example: 'g60yo97lk8b42qdzpcgi3txidd1lorkylys2zge114zoj7xh8oiwz8u994l0qrzvo4a6y1y44av939cu08stru9izgtcuyz8mvq14vk1xglfyba42abqjfb8kqo96soygwflv2n1xjfrghja0mby2ltquzpy1jjj',
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
                id: 'a1f89b4f-784d-4888-87f5-9f72d75a709e',
                tenantId: '04dea72f-4666-48f4-8957-aa0d3149f993',
                systemId: '22670223-233d-4d94-996f-1be8f793f547',
                systemName: null,
                executionId: 'b2bb4e30-6145-47b4-b18e-35fbdbd8d216',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 04:32:20',
                executionMonitoringStartAt: '2020-07-21 18:22:33',
                executionMonitoringEndAt: '2020-07-21 05:54:54',
                status: 'STOPPED',
                channelId: '8fd7172f-e38f-42f2-a152-1d0079b549df',
                channelParty: 'qrd1wbhm4sfihe28gzzebeb0sx6t18rwlgdi0wh9exrdy339jsnyjbxsvl8h9z7gfetgj502bz7dg1ocmqcevmqq9bae8wt0461sve56v1ngfzjtee1v3x0wq5cumhgt59h565igt3nemj3tft2849ni9a1jev99',
                channelComponent: 'jx5639istnyo6fxq0bsy4z1vp4e7j3n5kgtafz677zhcgwqs8f2cf5im34m3po92ltiz3lbh7zxph2xim3i9rwii5l3b8lm6dj8lb4ft788ylobsxfg6yte4td201xvb92trgatj6zzp0nu06x5sqjgznairftub',
                channelName: 'e3mgp6kxtozcmop34chqsijhz3h6998gl4xp3zxvdwvkr2y4htb7nhfijjc7s71arnjuh53p97f3kd1mq00ogwzr92c2dcm2w5dtrbg53wf0ojnor12rnsu1n075oqbxvwdd1gp224h1ga8igdgorith9519wbnm',
                detail: 'Dicta accusamus eveniet facere. Libero quis facere sapiente ipsum repellendus suscipit eius. Consectetur veniam beatae et provident sed sint temporibus.',
                example: 'yuxygx5058yyf30evj0m62hmxuyxxu91gjeyyu2t9lkj11nhpf5uyi1autr9f4s1fu2cf29jtkf69w7yt8y3gs8zmzuxia7842gyg5batoexxwx921iwyazxnptacwizajgvkfu3oygj3ah8d9bj78e7klitwk1b',
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
                id: 'a1f89b4f-784d-4888-87f5-9f72d75a709e',
                tenantId: '04dea72f-4666-48f4-8957-aa0d3149f993',
                systemId: '22670223-233d-4d94-996f-1be8f793f547',
                
                executionId: 'b2bb4e30-6145-47b4-b18e-35fbdbd8d216',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 13:27:37',
                executionMonitoringStartAt: '2020-07-21 17:49:01',
                executionMonitoringEndAt: '2020-07-22 00:04:53',
                status: 'INACTIVE',
                channelId: '8fd7172f-e38f-42f2-a152-1d0079b549df',
                channelParty: 'kzzzpgxud24dxir1garxefrsj01cezbrrns92m1qqn77bddi20o40h65tqanlkm00syh96nd72a61ovd1u58hqm87pmztusd8ih2utvr69oocffl41u7z0ta1j9vnpubyijd9m6krf5u410umstk7rjv4wnll4sr',
                channelComponent: 'aso5qnvzw0mehuv78nkouhc92jglppr8sya6fmjpx2se3nzk0ush0lysl1vmgi2bu1nq9sn00b6y1ugi2py5edfvpt9cgwu4al2xbcs8l0a2m2j9jfbh5fwe8b499pkxhiwpg9zic1s78cj332mv0get9yd0wsfb',
                channelName: 'iqipt5upu1m4vele6a4xj0afw4j7be3com02kaskorviimknozm96q73vw2yq9iowrnkk0hofrvmewxmu0es4zoy9qz761bc5g575vqi33zyndx9vwlcw0xjn4mhzxi8ckj37ky20rb6sm4faixysldioubfri5q',
                detail: 'Iste velit qui. Velit impedit facilis qui nobis doloremque. Eum ad voluptas iste suscipit vel voluptates. Est et perferendis et asperiores ut. Blanditiis nam sed nostrum blanditiis nihil. Et assumenda laudantium atque voluptas aperiam sapiente.',
                example: 'wbbjoej9cs57wkzu70lae9cpatadx3b9oze82twkz771epjwypkgtf2qpo368qn3np0950ewdz8jeti4bnksoivm2fe87sl84x7eclllrbiwh1lev36rum6ptf72aezoei5xrukeyyq70k78s5jlpev682i8jlil',
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
                id: 'a1f89b4f-784d-4888-87f5-9f72d75a709e',
                tenantId: '04dea72f-4666-48f4-8957-aa0d3149f993',
                systemId: '22670223-233d-4d94-996f-1be8f793f547',
                systemName: 'oy33g509z0kf54z3uysr',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 06:19:30',
                executionMonitoringStartAt: '2020-07-21 08:48:46',
                executionMonitoringEndAt: '2020-07-21 21:19:40',
                status: 'ERROR',
                channelId: '8fd7172f-e38f-42f2-a152-1d0079b549df',
                channelParty: 'yebzoerl2a9hy9bim5jnlz9rwqaf5ga25v4j7f1x5s782zvy2ftzl4atuaf9sbp9jbic6wvrxls3x0whec9emew4odpzj2jiymrsv7zff1fo8e65suhp94xg15kqdt5ja3xebwm57s3lsd4o3metfjj7q2bed6yx',
                channelComponent: 'jxvnlagmj4kv5w07ydpwxwwsezrtqanq79t6axxir2tv0r8ou5j714ep594bcvdmuyeps9ebz7ct8hwb1vczczth6g2svxa8p81v3k3p0vdkcq8hwifif9elwh5r5ub5lyci735wtbxp4nib7uku2n3dtfbiumoc',
                channelName: 'ocs1eq1no0zpefte7rme2v0msqecymqa4h262r07o0u9w6x5c5666n4aj5f5gu1scpts7sr2sd28h170saktx93t61cj01w2aztosrorieqp4v0vezrueiv77uba42d5ytwksihgpl9lkf0l87jdzadecbc0wj4d',
                detail: 'Doloremque ea non corporis ex minus similique dicta et delectus. Aut earum magni autem. Tempore non dolor rem omnis nobis. Architecto repellendus voluptatem voluptas optio exercitationem.',
                example: 'v3picas5r285mfx3d3ws4thy69bytjch99k6qx31rb8jihejquth8bb9fhvn7zpth2cvajak6jv2jj36x8ins9dhubwexoy2k0lxocad9vyiuuz9a31lkkup4d0xdzkgrpj1i1hvl2u1sdjht1eto9m94p3sr3hn',
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
                id: 'a1f89b4f-784d-4888-87f5-9f72d75a709e',
                tenantId: '04dea72f-4666-48f4-8957-aa0d3149f993',
                systemId: '22670223-233d-4d94-996f-1be8f793f547',
                systemName: 'ka8stgdkngdd73h6meum',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 18:52:09',
                executionMonitoringStartAt: '2020-07-21 19:20:07',
                executionMonitoringEndAt: '2020-07-21 04:14:31',
                status: 'UNREGISTERED',
                channelId: '8fd7172f-e38f-42f2-a152-1d0079b549df',
                channelParty: 'k664mhey9yug2f2huanb0u7ur0sf9j7swkbc0j20neb6rfl6ekbqhqcebbg981ejvl0x7rc36lonqg6g8s4k8hd8ny78sj7yb62dxunak8yx03pdo5nic76hd4uadmn179el1okld64xmbn0vsy08aof07imepnh',
                channelComponent: 'omn7y9symi9v7q9m4g9vhy361sil9xu0icg63dap28465x1stu5bu1270v2u16lz29a28bln79bjsjjtuozfcv0rxra3p1abs4g2u3pcy4mf8m0hfbksabclyh8y1ehyerewhx9ptv9c85mlvfn23rmtot905ltj',
                channelName: 'lprcbxv43q7ikrc0ss0ullc1bu2c2r7wjlybuos7ktn9chjlb8i4fqyyv8269ntt75x4kvtm2dsu4hq8hf3io9jfbtl3dga72metuh2lxz2k1k1o7orgmgvs7i24fum8kfmeyuq1br3u632lqc9l783n10la9d72',
                detail: 'Exercitationem illo corporis quia quia exercitationem. Nostrum voluptas sunt. Iusto consequatur omnis facere qui iste alias. Omnis aut tempore dolor consectetur.',
                example: 'dxixg1lvktfn8j8nnbplmzp1foslbj8h5p7am8ufkuw0v9tms5xpofk30akjjeezvug5oip6qxyc66686anwg9ccucz8kigovdx32ayn8kslrm1ob7rwuq12ywzwcs48i3cj2cnf9zyo0orq056irkivw9bivv9d',
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
                id: 'a1f89b4f-784d-4888-87f5-9f72d75a709e',
                tenantId: '04dea72f-4666-48f4-8957-aa0d3149f993',
                systemId: '22670223-233d-4d94-996f-1be8f793f547',
                systemName: '90jgo4xo8hfvmulsi7sa',
                executionId: 'b2bb4e30-6145-47b4-b18e-35fbdbd8d216',
                executionType: null,
                executionExecutedAt: '2020-07-21 13:28:31',
                executionMonitoringStartAt: '2020-07-21 20:41:32',
                executionMonitoringEndAt: '2020-07-21 01:53:43',
                status: 'ERROR',
                channelId: '8fd7172f-e38f-42f2-a152-1d0079b549df',
                channelParty: 'cuclbjvbvnj35gdeszhlx513p568y8niwfi26r7pqgb2lliikj5dw4i617xin5recqmkzeor5baftz276gehl4m6ql2bvvk24h65o9n101l4zoawrlzx4v9sxrbkklifai5yl9bixmt384xilbsoznym6bskn0k8',
                channelComponent: 'z8qdntc6xpgtot8mbbma23gmxt0l4nh66mym8zg9stjibpiubeaad7mr2x7nph4x480vthsrxy78kq5vtxzzchgdgf34vrrkxtq0zfk8fnngefw8b9wtpdc4p0dneg46gx8ewt4h9wq9y37owy1fkflvavjek2ky',
                channelName: 'rcvwksklsfovm1l5dwy12j6rhzknl8zf4wus57el4mw2lkwme851ae1nucou23xlus6vcpjoq15wkzeznoipdmk0f42hcjhyzy9ehwxp3rd2dqrg4ggwjqa2atm267p8ylx73jxkcy2alixm99te6tct0dtqbnha',
                detail: 'Sapiente sunt sit rerum ad ipsum. Vitae recusandae nisi sit. Quasi et aut. Deleniti fugiat consequatur suscipit veritatis maxime. Repellendus molestias voluptas. Sint libero non et quod rem nobis.',
                example: 'bxshyjsm8t03zco5s0khpkyodcmzma31f1t37wo38rtrb4srvxmud5g3euugp5cmq6s6qwoc67r0912nbch1fbjhb1vigatl41pjc0i3rgfin0u3489bgrqtjzl0uh5i8d3ous87zxzwhbmfimxcfd0242m7cwg8',
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
                id: 'a1f89b4f-784d-4888-87f5-9f72d75a709e',
                tenantId: '04dea72f-4666-48f4-8957-aa0d3149f993',
                systemId: '22670223-233d-4d94-996f-1be8f793f547',
                systemName: 'ecofhlzyens12ufk2wwu',
                executionId: 'b2bb4e30-6145-47b4-b18e-35fbdbd8d216',
                
                executionExecutedAt: '2020-07-21 05:27:10',
                executionMonitoringStartAt: '2020-07-21 15:45:03',
                executionMonitoringEndAt: '2020-07-21 01:38:16',
                status: 'SUCCESSFUL',
                channelId: '8fd7172f-e38f-42f2-a152-1d0079b549df',
                channelParty: '5ezan5dye7us9hkba29hm4zft5fyjoxrz3ym3gtbg2a8blc4oqye7wubylqy7rcgsn7qy0wpfl0hnno7cf86kfnbszde088mwutu4zuz3ns5hpxotcneauho3p3rd57199eipnbygtr2qkqf4zlxi5et0dqdznm6',
                channelComponent: 'dv1dod4fljeuo8d8yg9bhscupkqdha7w18wqfgrga9zmx6p110ezytvkxszhwv70cgjarcpawpfg4k8kskp23tj2dksmm83lmolvs6goi8cssemkik9wna16uur51av3mx13f02ooop82ka7ddhzszuzybb0p8pb',
                channelName: 'zbevj984m5izhnmbgbqjyff7qr8fke47dcuo3f3xj3t5nujzttph81xs2vgaxrt6qhaumec1ixwx4x5t8vv9day4mxn9wa7gk3rnn8evnh6mpkaxo65h430ly83876a3z0sqomxy16vwcv3bx5skjh5gat6ihvwj',
                detail: 'Distinctio rerum odio. Tenetur nesciunt non enim. Optio magni quod quis enim aliquid voluptatem tempore est.',
                example: 'z7144t0pz208ewpv2oapehvul9qskwc7spsn8fy55f7y3m6uy05k13ew63pej8rpp8ygp48jds6w7hxx2nkz4iaqvj724zokmoq4vyfo8kzsn1a2hto7ivptz8575njtjung9yizjyfc1v4tuoghbdnm8uqwsvm4',
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
                id: 'a1f89b4f-784d-4888-87f5-9f72d75a709e',
                tenantId: '04dea72f-4666-48f4-8957-aa0d3149f993',
                systemId: '22670223-233d-4d94-996f-1be8f793f547',
                systemName: '020tcpes3i5muov0erv6',
                executionId: 'b2bb4e30-6145-47b4-b18e-35fbdbd8d216',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-21 06:18:42',
                executionMonitoringEndAt: '2020-07-21 13:37:00',
                status: 'INACTIVE',
                channelId: '8fd7172f-e38f-42f2-a152-1d0079b549df',
                channelParty: 'l8jrpmfukoawrgzeubv33l0e72n4m8si9hwh22hkbe65wugkq4a4n5idpe6g3fo0fzrriedgjzqn9opwmbnc6hymow3ackzygk0kut3ffbbt927ro7yhqyg6icelakbqzlu8wzo7we6o0uce776oq0s5gzl1r9jc',
                channelComponent: 'aj5np55wv3us0nblr9x1h0nb35rrfry5dwg5purmxlpmotl2xzh2orb0ys4vdys9ovxzk672xaepzq1wb02zul2pgpbaji3vq5qja2q4c9761s0wrkvbcw0vm3fsx6kl31l85hxhaasgedaar56nloq1a7ie4u4q',
                channelName: 'utzdq2ye1sy7gipqhcrm6frprk9omhem87ac1ld2xefjnoyxcxihy1cibqliilr7e239kiz0ufgwdcwic3q61o2cve7i8xl7p5a6604oggncswh47ht3y4q4tzccgw633ogjrtem378ld1dt5pkvpej7hw1rnb2f',
                detail: 'Id animi accusantium repellat reiciendis neque. Est et adipisci et. Omnis ullam est quo quos. Aut aut ut.',
                example: '66pt2mn8up0q6htg7jxlculrhqmxqe43qq0khtu3285s6k70s2tqiekzc74c3qyy2o9z2fhwitflw82olgdq60qu1w52kx7ywglfeaxc43uqhfcshizc2wbwohjfpnq9t48bzg3dhmy8djvagduwn6gy93e31lzc',
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
                id: 'a1f89b4f-784d-4888-87f5-9f72d75a709e',
                tenantId: '04dea72f-4666-48f4-8957-aa0d3149f993',
                systemId: '22670223-233d-4d94-996f-1be8f793f547',
                systemName: 'ibig0yf2zgjyfm8bbi77',
                executionId: 'b2bb4e30-6145-47b4-b18e-35fbdbd8d216',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-21 23:54:26',
                executionMonitoringEndAt: '2020-07-21 01:48:42',
                status: 'ERROR',
                channelId: '8fd7172f-e38f-42f2-a152-1d0079b549df',
                channelParty: '295rlrgatckjk4r8h4dcl2k2wufht15tx09omh07qnzp8nmq0xk8uc8wt694ekderfa45lpzpn5gx8dz94ucu7tvt7nblbacig8unqa3fglflriv6pan30pm0mhgis2qchg7u3aekhdywe6oa75ktifywl55av03',
                channelComponent: '2kf5jnxkzsus5smne0q6f45r0xa9745fyedxph1eb78bye5dk32n35c73zon41jh7xfbbinttidizv8a4go5vabddcwru45k1cnxvltj481ca70xaew47k7uz1b9ijbj4ac7tb5rse8ztak49iula99jqqlrj4vm',
                channelName: '74a6ucpz6u6ruyoub1qjw8pxrdshqkghrws8t2b9z4hhim6rnrz7aoywra7w5kw37ocqqcstigqh2fw663lsms2qwg5170oboqhv884ozcopsexreon2oesl890gchy7yyv8q2t6qh67s9v5c6u746gx20tgstml',
                detail: 'Occaecati molestiae enim iusto qui minima reprehenderit qui sunt ut. Dolor asperiores voluptas eligendi debitis velit vel eius. Velit eum possimus non voluptatibus consequatur deserunt officia tempore non. Sed dolore totam. Et reiciendis eaque aspernatur dolor quod dolorem qui.',
                example: 'fgw7zffnjmoyiy0s2ij6kxbb264wmmckij0kqmtpxrfg2rephy241fe5zrcxf96435tj131fyvbo5e199tk2ughhucbn34ny75na3bpyu9gf6rthpsln79dmy6jr6sdm1jg8j2ajhnpkvxzym9jca3xo4h65pfnn',
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
                id: 'a1f89b4f-784d-4888-87f5-9f72d75a709e',
                tenantId: '04dea72f-4666-48f4-8957-aa0d3149f993',
                systemId: '22670223-233d-4d94-996f-1be8f793f547',
                systemName: 'tk9w3ekfz38fb2181quv',
                executionId: 'b2bb4e30-6145-47b4-b18e-35fbdbd8d216',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 12:31:52',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-21 06:45:25',
                status: 'UNREGISTERED',
                channelId: '8fd7172f-e38f-42f2-a152-1d0079b549df',
                channelParty: 'tct0y2v3jwrtxzpomipoe6afz1gguflk4ohqp23e501qso9cnuaujxznr16j0jtk3p2y0ph77ir7qdrs2sd2xucrmhe82t2fmpymsm2m042zwut8alx5ygr26vos4f6ywfm3wsdfffvokqvothsnhnjzocainnad',
                channelComponent: 'iw9dacbgyqe21n3ddir4a3zl86c0zhml5e2s2fabuy1909ruxt9xo4xsbc71a91fyxn0z70dwdznhmqm6ur9zw6kmpz9rzk43oc2e2y1pjdjpc2j8oeo7lmmro9tychjp6pynzsmykzfi0e49flmedpr1cu3ml9x',
                channelName: 't3p2nxjm6i6c7hfazl6tmqxr7twaop3phg9sid8cwmfvz0kwcqerlhft5nm3b0rejm2mh0lqjbz2nbvb94zh1beiwct9gpz6corbyitbp6opvedgeojznyvz3gyb7izzehywdo6ed4f1w393w7704ndkbtahtvw7',
                detail: 'Et nulla quae a quia ab omnis. Nemo sapiente et aut ea vel dolorem vero. Repellat alias laudantium nostrum expedita.',
                example: 'lt7ibrfnfygwf8vqte17wvv6kpmhxno8wsu0jafgtfr18nr8jfqepn55esh1t518dgu66rani7i5v99lcxub8ffhv83fdp7q5cmz5ycldl4czb72kxhm4a9vswmgzcf8ox99wyhisogaepiwdfruq87xkakyqgq7',
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
                id: 'a1f89b4f-784d-4888-87f5-9f72d75a709e',
                tenantId: '04dea72f-4666-48f4-8957-aa0d3149f993',
                systemId: '22670223-233d-4d94-996f-1be8f793f547',
                systemName: '9rqe816a4hxeizedlccn',
                executionId: 'b2bb4e30-6145-47b4-b18e-35fbdbd8d216',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 18:22:07',
                
                executionMonitoringEndAt: '2020-07-21 04:38:53',
                status: 'SUCCESSFUL',
                channelId: '8fd7172f-e38f-42f2-a152-1d0079b549df',
                channelParty: 'e8caou9mijpxgmpuwgmhc0c77m5xbz87poe1ug1e6nd1e9nep2gceclctso8u39dw39fbw0z6di28286855q78vrvyfusisva1xfl0fcn0g95l76fniuvsidzpfhz97lx7eqe0aavav37ghks0tnsh5n80za2ed9',
                channelComponent: '0gl8hccj3kt7ihw5x3yhjaknuy7vp720r0ylv2yl7oqrayyjevyfvjnlescyuiofm4efs7lt59jh1dewvf8558rn718sgfwicpd2na84ncabhh1yfiecb93aigsqjx0qn73spef7r1hkggqz14tucfvkih6r1zgc',
                channelName: '8nj3guq7d56oap06l2hrmkbiyyh9jlizp2zdl92lxu7zm8p33g3jyxvhypg07cj4j41ukr2nzh97kxu5wk2qjkd11yq9grx2vsc4yv92mnj1vh0k3iv944cjrgnipa8i3zt1vsi674oicnomqf1rf2wh0b1w11db',
                detail: 'Pariatur et velit repellat maiores nihil ducimus quos illo accusantium. Autem odio nobis aliquid sit voluptatem soluta qui. Aut ipsam pariatur eius omnis est iure corrupti. Iste odio culpa tempora laudantium voluptatum deserunt adipisci debitis.',
                example: 'zosnfwmws9ltl1fjahlf6cd1ylpcaq4pqmjt7ei0d6xpj0bqf4o5i949wmazlz00g76im17rpe93sfbwh1kmzmi4p0pfhc7tufrld78y5hmjtwftpgqn3cps3usi0by50jd5khr0hm45dy2n3gliohzqvnm9qi6g',
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
                id: 'a1f89b4f-784d-4888-87f5-9f72d75a709e',
                tenantId: '04dea72f-4666-48f4-8957-aa0d3149f993',
                systemId: '22670223-233d-4d94-996f-1be8f793f547',
                systemName: 'n8jv4mo8bl9z4wjtqjh9',
                executionId: 'b2bb4e30-6145-47b4-b18e-35fbdbd8d216',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 21:09:12',
                executionMonitoringStartAt: '2020-07-21 23:24:09',
                executionMonitoringEndAt: null,
                status: 'ERROR',
                channelId: '8fd7172f-e38f-42f2-a152-1d0079b549df',
                channelParty: 'd0lhi83emrrio2lhi0oq5pgkykd643xpf5ql2q9jo02uxgocp62zc7lcmd67oftxgspb8awmabm6pkjc7x7plw96gkpl8kbr0j5lyoyllgea39k23mxp2394377xqyznbgj5p3yc2g0cpwkweq3ma1x3lbtawxo5',
                channelComponent: 'dgn0nl39i9cf45knyersyq6agb5a5ziaias0mq8do8ax7eughx9fa4jpmg09rcrtzxeh2vek4wcebbdpipyswmqxu12i1m0k2473xwydl1xlao3xmq5sqatchi43c4d3rqe2o6d6h91dmh2lawutmpjfqryf5qyo',
                channelName: '9a7576aq0qv7vlrrk2sfhtu39rmou7e745e1kor8rhxur6y65cu923fa5r77c3gbuynhpw8tahmn80nisxt5dt4opllgz0929mzw78um64ibv1ctrxxe9a69fk3iti7ogvwcuhmsz74wqz37n77ogg6eltbx3vcu',
                detail: 'Qui pariatur ad corporis ea aut quae nobis eaque quasi. Laborum sapiente voluptatem ex dolor. Inventore voluptas harum ipsam autem.',
                example: 'f3xm2a141runcb46pm2n8tlu0dz6ppdqietj720xy7923qc8p0cp0i6hfqke69cgef4k4jkyuxra85q238ywgkc54o5qy6e6orkz44n05hnfq9h52dr7kcwy4ghu3k6wqllbobf6jet7933l6cgxflnul9r7v5hk',
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
                id: 'a1f89b4f-784d-4888-87f5-9f72d75a709e',
                tenantId: '04dea72f-4666-48f4-8957-aa0d3149f993',
                systemId: '22670223-233d-4d94-996f-1be8f793f547',
                systemName: '3blc5adzvjcwnzihn9vx',
                executionId: 'b2bb4e30-6145-47b4-b18e-35fbdbd8d216',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 19:19:54',
                executionMonitoringStartAt: '2020-07-21 16:25:41',
                
                status: 'ERROR',
                channelId: '8fd7172f-e38f-42f2-a152-1d0079b549df',
                channelParty: 'j8fs43gw4o2x632sq7ivpvma58x13753ek6opb4rmodukh1hjto40jdtyyqw1jx00xxi0sz9ip8zndnblhu4p9vjng4lpis7vd58npmv0uym9je4kvv8ix1mwkjui8u2epm7z59w6axknuwe8hkx6zgxtv0ky7t9',
                channelComponent: 'w80ueg8623wuddlj2b0opw2adf7nk9y96f4val8cd518pzry68tqfiux75zlvy3fylt0va3fome1qllch7xkxwsnj6paziewkv14ues5fyl0qfe1cein24idzau2ua3eta5uhaqalorhh4hh7bj9tld5xf1kv89t',
                channelName: 'eq8gcvxacjd0dd60012c4afl6lurc2j4sdnd4vgtq2kbgt1e09u93csf5amqo08xo313ku4f38a0ds1ebc4zyfc2bx421mwhe1r0upbeu33zi7lrqa0driixaifzn44dpilv3gf2vgp6bdetf9gprzmt73tgc27d',
                detail: 'Nihil sit culpa voluptatem molestiae consequuntur libero sunt. Velit aut explicabo minus rerum et nisi quis. Laborum et sed debitis explicabo dolor sit quod.',
                example: 'ywr7m0l1oerv72x92eunp7a9090wwscmaawkuwr4qo3v4sj0pb8e4ywhcad0i1x8b4t8f5z8tpadiyvd0hbjglhaj9ufn6nvlyfdshzncd87052lp1xzvjg3ysyicz4pdcpw8l1cq3fxzrh7ak3dd7np0l01dkyx',
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
                id: 'a1f89b4f-784d-4888-87f5-9f72d75a709e',
                tenantId: '04dea72f-4666-48f4-8957-aa0d3149f993',
                systemId: '22670223-233d-4d94-996f-1be8f793f547',
                systemName: 'v6sc3iwp42yfzsnldxuq',
                executionId: 'b2bb4e30-6145-47b4-b18e-35fbdbd8d216',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 22:05:44',
                executionMonitoringStartAt: '2020-07-21 10:41:54',
                executionMonitoringEndAt: '2020-07-21 04:57:56',
                status: null,
                channelId: '8fd7172f-e38f-42f2-a152-1d0079b549df',
                channelParty: 'mam044pnprd872d4zp8thgivu5ka7d6wri6gh9pmw6lzsd9lutvqkmbtj9x5zo4qxvhlxau7wl45i3h2cyykhqxeseuxatc0jd8udp7u7g9fhtw677d8f953ws6ny7bwi44w1cktnuz5s9y8jt0n038ed9eywwc2',
                channelComponent: 'dfsaitu9m7ucr0hl8l5f0qwms4l1oyrjrcpax5ik89vuz4uv2cx9o6d0cb5zevu4kydhf0awj4pjbz0lmgyj4gjcht5a1arg7ypnprd1qencspyxm4ju2edxdjup67w476p06lfdilzr3tto0oxdjugxpvy0xgw3',
                channelName: '03xtx3kpts6s2rgeabgpd4rt3ppbcpa56xam06chwjwp3o0gq922uqbi18hmqbvv69yswhd4bfyngwnmi3a4ui42k8wgep7v06nska0bbu8ct5d2r90nf5ijc9lg5m57knxf7h8dkui1f2vzs61sskpfj8z5kyqq',
                detail: 'Voluptatibus nesciunt dolore quos id omnis iste aut quis sint. Nihil dolor ex non pariatur similique eos pariatur voluptatem nesciunt. Illo tempora provident numquam consequuntur voluptatem doloribus est.',
                example: 'd5gcnvpdjsqt45xk62bawxrjzkczp72x7zarjf91onnynjkj140bjmi0axdkspd37f42zskev0lplv866finbw5un8uggo6l6wf2z95v5u87v6pk15h5yx716zdd4755zut30w1q4l1p7tmod58mqgwof4s7ti7o',
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
                id: 'a1f89b4f-784d-4888-87f5-9f72d75a709e',
                tenantId: '04dea72f-4666-48f4-8957-aa0d3149f993',
                systemId: '22670223-233d-4d94-996f-1be8f793f547',
                systemName: 'hu2ujutsut0erebpy6ol',
                executionId: 'b2bb4e30-6145-47b4-b18e-35fbdbd8d216',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 07:05:18',
                executionMonitoringStartAt: '2020-07-21 19:10:19',
                executionMonitoringEndAt: '2020-07-21 03:24:20',
                
                channelId: '8fd7172f-e38f-42f2-a152-1d0079b549df',
                channelParty: '63tz0wuo8dgeg7573p0tyxzbsyxbuddl6h6ff7kfk51q4auy9lo1jl66tnr2krw567yhzxie2dct1p6own8q69dxswu4a9qs496cfxncja3xqgu7uyo4kspv6gh4zwrz6p0e404grh2tqc705gqpxwrgtcmj7ae0',
                channelComponent: 'f4oaykwfnulbi7xpde4rbsx790iwpcfzgotzvybtx5qfnfvimf3tgpd5eyetg40qp7virb72ha6kc4h63jglzyhfwe03lx2zm7l91xcsrjuf5k3q08r7o9pwt747ryqfmjyag2hhtbct17n9p6pwgz12qxyeucev',
                channelName: 'ch1yqh5g03519u97pptjkws5qxhr9pl5wkih43an8g0thgx0oinxfk1423el78ml89bn1tif1ryui3svpusx5ou8tcz3nns7ptwisrti55zr4b9xqojxd4162phb8f782qfj12pzw1cfyfg2cm5bnc0udcc87msy',
                detail: 'Vel aut qui quo maxime fuga non est. Ducimus non reiciendis. Ex ducimus praesentium inventore facere et. Consequatur nesciunt voluptatem.',
                example: 'l5n5uujzdpcjppzhxvimlv514kmq8uq96yp8ord5a2nnue9956dp0m82cagkh91gbt1xdogsu8s7afsglo9zi7szt69naj9i7txd35f880xhmsjy51p2nlq3tnbjrf7plhpz6967knm124mygzz0yvq2xn9z8hhi',
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
                id: 'a1f89b4f-784d-4888-87f5-9f72d75a709e',
                tenantId: '04dea72f-4666-48f4-8957-aa0d3149f993',
                systemId: '22670223-233d-4d94-996f-1be8f793f547',
                systemName: 'e7x0gy25z8mtprcwf76x',
                executionId: 'b2bb4e30-6145-47b4-b18e-35fbdbd8d216',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 23:36:09',
                executionMonitoringStartAt: '2020-07-21 04:54:39',
                executionMonitoringEndAt: '2020-07-21 08:01:00',
                status: 'STOPPED',
                channelId: null,
                channelParty: '7f9k2aj7nvslh1z9ezwa9phnnq5k84vv9x030nitl3evz517ixha09zj203oj6zmijwa0qwrwfgq9cx1pe23nrc932f0bkm5kk80wzrpzliq0a62903or3ud3sjhsn36qp5jmx68heaxhn2i5nrcnr4ia4ka3n8y',
                channelComponent: 'lyxt7sce9vs54o4uqx9pwb1trcdn4b6wwavpccvkkwquxijvl1rbq58cbkrywamsm8w01rir3dd34gv2qfdd9xlfd42y723zw0cykkol94sp1vr41cvbiuto5nnqg3ty1auk75rdgm7n0mczk6d8t7q7kieuo6ka',
                channelName: '9zhptfciocbw2rltdy0t5l3a36ng8zlgzli1bs3wyyo491k0ynih278ivs0nfbdrno6apvqsd7ddglr57spvi4u7bngybda8l1av7y4p9p2vtyr61nlk8danzjdg0sctw7bxndkk2sdhe2w1y5bd4se6p1ca2lo2',
                detail: 'Iure quas itaque ex ex et quidem harum architecto ad. Voluptatem numquam et consectetur libero totam. Rem aut dolore atque reprehenderit autem perferendis odit explicabo.',
                example: '2z4tmtf0ci9o84tpltewdxmk9k7rwxr3ywbvc3iok2xmv0sqy1gmk8e2fgb6nzmpdqnd14jk6nkfxrit1rxlygba3ygukmv8lo3skc5pjzan281uyengv6ucwcaafpztrmvn32kcyfqmahmlkcpybfw413zhi7rz',
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
                id: 'a1f89b4f-784d-4888-87f5-9f72d75a709e',
                tenantId: '04dea72f-4666-48f4-8957-aa0d3149f993',
                systemId: '22670223-233d-4d94-996f-1be8f793f547',
                systemName: 'qc8d5sd8arrmw7ya1b86',
                executionId: 'b2bb4e30-6145-47b4-b18e-35fbdbd8d216',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 09:50:28',
                executionMonitoringStartAt: '2020-07-21 19:02:37',
                executionMonitoringEndAt: '2020-07-21 11:40:46',
                status: 'UNKNOWN',
                
                channelParty: 'e3chbu33m77n18id7hsnon7atu736d3uylmz1q9gtp8wr89ruvcrk3nyas7r3eyqsmam6205737sw3i5my3p6qya3xlw72frn16gxnvaxtu0qdzz1ob2bb7cabmn69pvoa9y7igkr20wpk66oij2oy6ly2p1oorj',
                channelComponent: 'vozjr7ythvdcwa5jndooncy98rkg9hnpob5y9v9oau79o8xn1b6f417fvyof9tzyll85iol7wdov3z60y1ofim7ua15t9uegm0ia3ta1eaeskkf5p7yindnqtihnidteixx3ygg4594c13cniao6k81a1b5wkzbr',
                channelName: '51vz0fszm31j70f4c1dmn9u8ybjiqiw48b9jgmhcrrzuplwdp7qn5nu9sq6ucx8i5r53weqanr0yj9seg4y2ash2io4kazxp8uh89pzsc9zcgn1xjvz4ufnavlx7l63d5prv54ddtl3eg9ejtniazdzumpowqa5o',
                detail: 'Itaque ut delectus. Veniam quidem aperiam. Ut eum quia libero error quis atque distinctio dicta.',
                example: 'cnhcwvhm6w7xengpq2fnppx0hw1kq2d1en1j3o12lpd8vnrtq9bih49j2pcceouxo68us9vdbx1hhpqmg1szebu2brfo048whnabnbzxxlez0k46bo9mnlll9pqoq8cjj0h4s08trn7ieq1oiwm7cidv77sk0kic',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a1f89b4f-784d-4888-87f5-9f72d75a709e',
                tenantId: '04dea72f-4666-48f4-8957-aa0d3149f993',
                systemId: '22670223-233d-4d94-996f-1be8f793f547',
                systemName: 'bzlcly2mcavdv919hkg6',
                executionId: 'b2bb4e30-6145-47b4-b18e-35fbdbd8d216',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 22:49:28',
                executionMonitoringStartAt: '2020-07-21 09:05:35',
                executionMonitoringEndAt: '2020-07-21 11:26:20',
                status: 'INACTIVE',
                channelId: '8fd7172f-e38f-42f2-a152-1d0079b549df',
                channelParty: 'g4ic47ltrrmbm6ph01kc20bhb7caplbwidvkfno9l9kr1pwpshgd4o500cmzeygrqhc3613y7ote4svvqrx5wtftokn28y3stumuofk0xwe0b4ub6bd6sc3hk00o5pfve1b5tqu9cdcyp3cr48gbdekcdn4iud56',
                channelComponent: null,
                channelName: 'xhhim9qa0zpyz5zi36f3zyzuj3k39xerwwtgnq757n4r6c46d0zrb3iwx6o8t9qf5zftazicweoh1uua1daz9mwd6j671iz9oqzljahcke8trt2091s323mi9t9t9qcbk7wezb48gnnocqxyxmqniqdw8z9v6fs1',
                detail: 'Labore aut eligendi quam quidem et occaecati deleniti quo. Expedita vitae itaque praesentium ut. Totam ullam quidem et. Facere quis recusandae qui. Exercitationem et qui deleniti aut fugit ut. In quia pariatur eum id omnis ad sunt expedita.',
                example: 'jn56sq9x91x14ixoexymd9u9lcq0sbbn5go1shmvnde31eaeolzsexddg5ux6myx2z1wb7sqbwbsiw4rz32mjn51mcerjil3nyy9ff98l4dbvhc96nftrdwp3nkpqegiyt037l97koo5chlt5nlzyhe4k7fxw4at',
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
                id: 'a1f89b4f-784d-4888-87f5-9f72d75a709e',
                tenantId: '04dea72f-4666-48f4-8957-aa0d3149f993',
                systemId: '22670223-233d-4d94-996f-1be8f793f547',
                systemName: 'bcqlp5o4d7ru5i4qpvsy',
                executionId: 'b2bb4e30-6145-47b4-b18e-35fbdbd8d216',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 23:11:22',
                executionMonitoringStartAt: '2020-07-21 08:59:48',
                executionMonitoringEndAt: '2020-07-21 15:18:12',
                status: 'INACTIVE',
                channelId: '8fd7172f-e38f-42f2-a152-1d0079b549df',
                channelParty: 'c2ho6d3bob6zvkla55n8g67rpisywl2fk9mqlds66k5b2o4u16gqlgnm5dk84j9mi44ldqjlmr70k3wnouuyus4yphbstd70x35in6l43wemtbxoox2stcc24do8b2rqix1xy3xusm0fz5l4orfs4o0pr2uql2z5',
                
                channelName: 'cfch1z3fd6g5rf7imzqij4c1m38tkf6qsxbpnz2nmi1siqciczg8yxn8nfd5axplq10fyj76fz0qtda5dje83fdal0q9g09qjecxng9ditxzhsh6zqit8dit6j1kwjfpv7cjq259p1krzvum0njfm440mhfui1qp',
                detail: 'Vero inventore sapiente et nostrum enim qui aliquam. Ex dignissimos aut dicta. Et aspernatur quis sit ut magni facere qui. Quia iste totam officiis sequi quia ipsa. Qui vero odio. Quisquam esse quibusdam sequi.',
                example: '7cq7e8fs5qe6xlqvofnwl5w612e0jehe76hmcxg44imqh343oiyyb7wb0z1o0cr9jfrzmx90aqye1hbk2n2iy3i8pamt1ji7v0os5zu0l9x1jivw3d6qyhwozladxh5luc8e0lb444zpbqd8zfby4gbz0wlvoorc',
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
                id: 'a1f89b4f-784d-4888-87f5-9f72d75a709e',
                tenantId: '04dea72f-4666-48f4-8957-aa0d3149f993',
                systemId: '22670223-233d-4d94-996f-1be8f793f547',
                systemName: '1hbauj5vggbms01vtnmu',
                executionId: 'b2bb4e30-6145-47b4-b18e-35fbdbd8d216',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 18:23:18',
                executionMonitoringStartAt: '2020-07-21 15:22:20',
                executionMonitoringEndAt: '2020-07-21 19:48:07',
                status: 'UNREGISTERED',
                channelId: '8fd7172f-e38f-42f2-a152-1d0079b549df',
                channelParty: 'b6yc1x3eza1oh2v0owkf2ekwyz3sclpcidyij5npgwa1w91ot70jvkajaqsukllsaal4qm1pzo5zphe8yu59tkjfvi94w5ac9y8pngy0s5vk0oomfglr37okt54o77kxzj8c66262us1e9mnvkwolaxeuwey7ue8',
                channelComponent: 'm18ktv7r6ef4aety63u8uo6z412htxfo4xbct1xx9gm7djp33phmpb8qni407of08z3pklp3jo0g60ew66eh00jpata02zudg44cxtz4702zp76mzski9qqz3ntrx7p8q3rxxobqv6immosxb6mp831xmpas37ii',
                channelName: null,
                detail: 'Itaque cumque sapiente amet hic est ut. Possimus aliquid odit voluptas culpa est alias fugiat similique impedit. Voluptates soluta qui aliquid. Ut dolor vitae voluptate est.',
                example: 'zwmyadf5ncr5i84yz3n9n512btix9x36u1rqo97dvxhrlqxtg1434rxojtq48ll6kdu0y72g72cenfs5xk4ykap4dwrvya2yomzo5iar9vh0qc60p9wutcasz0wz13619eviyxitxt4c0jp3r7znilpcmo45wogs',
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
                id: 'a1f89b4f-784d-4888-87f5-9f72d75a709e',
                tenantId: '04dea72f-4666-48f4-8957-aa0d3149f993',
                systemId: '22670223-233d-4d94-996f-1be8f793f547',
                systemName: 'qk186qdwrs2t7tl40rvs',
                executionId: 'b2bb4e30-6145-47b4-b18e-35fbdbd8d216',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 14:06:43',
                executionMonitoringStartAt: '2020-07-21 21:26:17',
                executionMonitoringEndAt: '2020-07-21 07:19:09',
                status: 'STOPPED',
                channelId: '8fd7172f-e38f-42f2-a152-1d0079b549df',
                channelParty: 'ngrvrl5h8bsxgmvl5ck4upn5wdkq5rvrsvbkz4avj1b4lwch14wqi63zsz1tzrx0333k6qw20g4p5zzkwrf4ziovy2l4ogu29mchuuzuaif4hhfrk5m44or3hwu5bzaiaktago2ei4u1yo4fdieabk0p5zth1mgt',
                channelComponent: 'vtrhocy8c8yc5zeh62gmvaypp7p0maoutwni6zroa06pay6v3tga8ahk4fqqgfqkq2pxx8o79txkzk5zipy3aryqwbc6b2qmmoi4pge826uglgpldekb9z29mpi8ek6j7fy7n0oz3n6xt7k6rk3u1bcav4edrhna',
                
                detail: 'Est maxime qui omnis. Debitis excepturi ut rerum quidem. Esse dolores velit non qui nulla. Aliquid harum dolor maxime reiciendis nisi possimus culpa. Sint accusantium quisquam illo. Reiciendis ipsum ut inventore.',
                example: 'h4n1bqopq1f1h7tdvqrqy1wt32byfohkuq6mtpmoox4vspy7zfntz8yg617c3rdi5z158265cmhb168gxw29gpw9rakgobgodnjsl4l1lmym2bgqp8kl3gr1zbjhaltit3r9xq03nx1wa3se1l5zbi4hfauwobd2',
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
                id: 'y0kr30gji1tihstebmap744usy4sqlgm82mov',
                tenantId: '04dea72f-4666-48f4-8957-aa0d3149f993',
                systemId: '22670223-233d-4d94-996f-1be8f793f547',
                systemName: 'yn2aejqqyg29ba683hjx',
                executionId: 'b2bb4e30-6145-47b4-b18e-35fbdbd8d216',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 18:15:46',
                executionMonitoringStartAt: '2020-07-21 21:10:34',
                executionMonitoringEndAt: '2020-07-21 06:56:59',
                status: 'UNREGISTERED',
                channelId: '8fd7172f-e38f-42f2-a152-1d0079b549df',
                channelParty: '813u2902xxcwtnpda9ur0b9s4fckuf4tbwd3m5oj6jikrcuiij1o2bo94v3dzy58n6b9gcvaugwx47jef3h2q4tvngxseq76vbbqdaf2yjsjvl0vu5xc0nmc7j6dgx3a76rbgrnnu83zaqx93f84siuxxpuypqqg',
                channelComponent: 'ezlbubma0201zstd6aml3qianw9p12bmwyzy1rb9jqnxf6r44g76rufpaeoaxyib5xyj36fl2xqde6bzno8npzrr0d5q3082e22h4td7l473vfhkiujg8jdhtleq0ri1h4m0pq8q0hjvs4fa3r3yx47lwrtlktgp',
                channelName: 'rm0chxso3g261l9vql8stauylcxw3at43ukyq5aaf8cy69p0h34jmf2uwucwfu8n7la79cq94x1qgw47tas2odzlgwv747rxncs2w3hcswgjf383n2nstxfs4akdozufgcvmn35gj92s7ni4ot44dnt32sp5q032',
                detail: 'Est omnis laborum aliquam explicabo dolor est. Assumenda excepturi voluptas tenetur laudantium sit voluptatum tenetur deleniti. Nulla aliquid perferendis consequuntur suscipit.',
                example: 'm4azn6tg07rqj9lyqktq3l4heqj9jq4higuknf1iv13lqh6wlb5ewcg120uz8ziqbmefwgr4l8owwo2t8qjg8jgfhu4pbvvmnlvxvea8hez50nr30xntpm4tenllm3vla28sc9k022kgph67l3qdwlr4fms48odt',
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
                id: 'a1f89b4f-784d-4888-87f5-9f72d75a709e',
                tenantId: 'l2ruexdmwwipw79qi37zzf9qfjq05n8k6tl3s',
                systemId: '22670223-233d-4d94-996f-1be8f793f547',
                systemName: 'bel7jx7c68uzk1zpy1zj',
                executionId: 'b2bb4e30-6145-47b4-b18e-35fbdbd8d216',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 16:40:26',
                executionMonitoringStartAt: '2020-07-21 05:53:19',
                executionMonitoringEndAt: '2020-07-21 11:42:40',
                status: 'STOPPED',
                channelId: '8fd7172f-e38f-42f2-a152-1d0079b549df',
                channelParty: 'i21xavzzqelq19im7lla99ibwle75n5bu6l1a3kiw2pfle3gm1sstrtwiarp990c3c7nr2ovi3y8zyjbshy2dxz7shr0njfspor9u09nnp45balcddnhbqao5yxyrztexe6emewk31vtcrjncpawqck6ol4jbh7f',
                channelComponent: '1h9658dnb91tvqe0ok15a6uyomruw0r83mur0epzsnxgde5gfhcil9y1ww9v54vjbbggb13ysnvpbt5jab97dyezg1pyxecmr66wpbmem8rfedxdfb5luqqwpxai8tpxin86x6u85jpwv6e0oj6w0euzulcx7s3d',
                channelName: '4nlzweevsp5gwy88492kv3nkezm14ffjhvg88dua0uwpkke06b6hl4f6g4an3jflvdgty6lthanj2umeml4g3iazim10s5656spacbv94weqq8n79f6h1eoq5v4x8c24qlvgtrbczc4wwdnjypww299xfb1ja9sb',
                detail: 'Expedita quia ut mollitia delectus. Ut sequi sapiente et laborum iure dolorem sit. Eligendi cum placeat.',
                example: 'uv49oioe58w2dgxiyjklf7f51t97fndx7nv0bl62w72zqllks12fmltmufjqabgtxzgmig1pxfkjg78g73ffqd4h020kryfrh4fly49zs7uyx07giywnuupninws4rlwm7i1jdjuq9lpo53yxkm8x28rx0bv1kyd',
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
                id: 'a1f89b4f-784d-4888-87f5-9f72d75a709e',
                tenantId: '04dea72f-4666-48f4-8957-aa0d3149f993',
                systemId: '48pvwt6zsvbrbsz2k411fbitjlctmsud3b695',
                systemName: '348szm520jy9ztkzug0j',
                executionId: 'b2bb4e30-6145-47b4-b18e-35fbdbd8d216',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 16:00:12',
                executionMonitoringStartAt: '2020-07-21 11:42:31',
                executionMonitoringEndAt: '2020-07-21 09:55:45',
                status: 'UNREGISTERED',
                channelId: '8fd7172f-e38f-42f2-a152-1d0079b549df',
                channelParty: 'hg8pbwid5mv72f3shhgdmxi5d6rvsmsz7ckm201mrg07anz9mzllb7ekfi9yy212mxu37kekuoa4bgkuac422tvn2rb572xn2flnnengcsl62nm728gffb0t4mooplvm7fm6tuwawrl1nje8ud3x5q4onlbgpqda',
                channelComponent: '06k5vzf2trd7xpcbbtjqd9m5uvsv8gtozxcb40g8mtgh7kahplxtc8e83y8g928eaqcpv5v2foen5c7zkgph7ur22k2w8q4itnhhwcj6npdeb50350guxsk3n4jzev63ubkllfxf9lpk41dc8kj8erb7p9e7oldn',
                channelName: 'hqqxavnglo90nzwauhrwiole1e644eg7czj4rty9nf3kvkzaaqfbahc04ufr9kin31seay3sbq5n8ck3y9s22isq7eiyqkul4lvy71p1wajjwy8i3xdj5qw0gugtgxiu5rv057ydz6gl16fg1tjh4f0w0q8a0s13',
                detail: 'Earum magni et nemo rem sit laudantium iste voluptatem et. Sunt iusto ratione illum minima ut voluptatem occaecati. Consequatur omnis voluptatem unde veniam. Exercitationem beatae fuga pariatur corrupti doloribus.',
                example: 'j27kf547qputyhlpd5rxp7ozflma7fm2ypql95479d3osfg1o3sz569lb3z9i1g9pre1j3mds5rvmwax7q2zs5ggxo65dlzai0ua6ipe4kfiibotu3zz08tb6zt580922e67mpow1gxpfkz00ufc1j3zup8yl5pw',
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
                id: 'a1f89b4f-784d-4888-87f5-9f72d75a709e',
                tenantId: '04dea72f-4666-48f4-8957-aa0d3149f993',
                systemId: '22670223-233d-4d94-996f-1be8f793f547',
                systemName: 'i8rc5tdruspo7y387rhc',
                executionId: 'w1bvhfyr56wopqfhvgvupx70sw8anl9xlsvep',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 13:44:50',
                executionMonitoringStartAt: '2020-07-21 18:07:09',
                executionMonitoringEndAt: '2020-07-21 02:10:16',
                status: 'UNKNOWN',
                channelId: '8fd7172f-e38f-42f2-a152-1d0079b549df',
                channelParty: 'ieux98qcziw6oewudpotdr5ziw3h861tgfbqaqozot1jfl6zbn3zwk8l04lau0zbtxnqdvp3ifpth9b5lkpz2cn9oofiyhtnvvda38fqvw64xz2trruoriwalhzw2xhzhyi6gf2o22sw0ew010mqx990vo92p54o',
                channelComponent: '52672nw4jg47w0zfqkyhb4gog5jw25hhpxtx499edztooqnoxxcpfur2inu7t4b1vlmd0keg8a4mxji5zrfl2xsap2xwwhm9vhn3qls68rri91rwb4e1n0x297kxo55v2r3w5drajn0w60ucr3fowmhhq1dbm1z5',
                channelName: 'fvu3c5138ep8p47hhdcsnl0396rohbqwn6inxlqfykq7peu0rfvm32y5kulp1s0boc67uv3h3bz4imqvrv3w2glir9h68u1z3i2a7pnz9gr45sd4ldxz07ykm53q45crt52jbv29sbisn9hcv7xoilak1d0cp026',
                detail: 'Praesentium consectetur aut tenetur dolore. Sunt commodi expedita suscipit ducimus quis exercitationem officia alias. Est sit pariatur consequuntur. Cum quisquam adipisci et consectetur aperiam facilis.',
                example: 'az6y2yuwx8cuflc4pdgy7og849923o87bnrpyt9m8h80eb21bhhmnd7rgo3ggybxbgy4sfwkkcwsp91g4nsxml5bjq0v1eno5yfb4dw5s0dd982ji04zgexu9w2847baac3luhj630ye2r2hl3nrcqod81d8hjm2',
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
                id: 'a1f89b4f-784d-4888-87f5-9f72d75a709e',
                tenantId: '04dea72f-4666-48f4-8957-aa0d3149f993',
                systemId: '22670223-233d-4d94-996f-1be8f793f547',
                systemName: '3757ud2r596ghphth8w7',
                executionId: 'b2bb4e30-6145-47b4-b18e-35fbdbd8d216',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 20:48:12',
                executionMonitoringStartAt: '2020-07-21 12:06:09',
                executionMonitoringEndAt: '2020-07-21 06:27:46',
                status: 'STOPPED',
                channelId: '61nhdqu1qh0y5w9rmr2eecxeujnoobutz536p',
                channelParty: 'gy2v9wpq4xjqbtjqpe487oyoc0nzubdmb3wym1tsxsxu1orle0lqu83xt4czc2do73iz4ghb8qz31valdmgdx07zjang2i65tx5bq23biqsj6tgxf0o25nqg440x6ks17bq9cpq4uxn3otnk6ze2tpd02hislgc3',
                channelComponent: 'djp0l4f61nnuooef2rjshim47uoq7sy24na9p2fadyyv3ta7mq7d0ivdoqrtt649715kz8ry2q2k95s4iyrblo82uz0ibqn9ksf3x6tfmroa2de4jxactq99si3gprrmg0b8s8ocd8d7jiaobzonwjyvhhsdx30w',
                channelName: 'i2peyd8golbl18ctnq8qem7sncqvxvj2wovwai5lg3yphyx0su5g8bvlnws8lqbawtmd6808tjec6vcj2wqfhjumkah1slm080yhhsn1bljeonwx5ds5xsyorjm1zw2os8z567dh82t33zkm3n3vd0z2h4yjn3yk',
                detail: 'Sunt voluptate ut velit eius iste cupiditate veritatis. Repellat rem id atque voluptas harum facilis qui atque. Aut cupiditate rerum iste dolorem est omnis aut asperiores. Corrupti voluptas soluta fugit ad beatae.',
                example: 'pm900uj7iaya1u2ctd2etw5hz3zntpev1hl0fsraj7drss4swy4frd4cr9t5q4nu2gcwzcb23b94mfgcv0x9mcpvsxnvxqzk40eul6rbtq847a3s0ktggnahj740nwkrrlro7ilfab5zdr17mc8jqtz5d43escod',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a1f89b4f-784d-4888-87f5-9f72d75a709e',
                tenantId: '04dea72f-4666-48f4-8957-aa0d3149f993',
                systemId: '22670223-233d-4d94-996f-1be8f793f547',
                systemName: 'tvzp9ilscmps01r49owj5',
                executionId: 'b2bb4e30-6145-47b4-b18e-35fbdbd8d216',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 17:26:28',
                executionMonitoringStartAt: '2020-07-21 18:49:32',
                executionMonitoringEndAt: '2020-07-21 11:36:31',
                status: 'SUCCESSFUL',
                channelId: '8fd7172f-e38f-42f2-a152-1d0079b549df',
                channelParty: 'm846v3mhlmxftga8fr1ldx1olea9nh1yuxnzs60crcwlzrizbmrd4k1tpg10tm534kc5rp3wd34k8le0no48s9a35j08t9qauqv8c3fx0gshaq6754hd6qgfwutjef66mq3su3a8z4sap65nu4s2kw73inozmui4',
                channelComponent: 'sfi7fepovrhhmx29tvwecwahm4ohm7scsd2c7h8yx6vpei4q1k0jzjb0kh6mcy2x6lxdp42u3uz6ye2x5g05icsnd6vcal6wm9e2b7ovs8vc2p1to9smtmv8vb9jf221lqf311m9db1mr71dfypv5g9gpv4vpku2',
                channelName: 'wvs44sq8llyiz7pfz326k636oydqu8r5bqofuyw3xapysdyxmeoh3ljtmusguas0wol3u5avgcef9camglybxe1gf35gzdx78uzeenmng7f6ol2uw14mqy6xs7b79n4o1ypg2w2j60e5hakcqe0rohtq1dt792nf',
                detail: 'Expedita voluptates minus nemo non quidem porro non. Est exercitationem officiis eligendi et omnis alias quibusdam. Dolores consequatur sint in et dicta harum est veritatis. Voluptatibus quam corrupti.',
                example: 'w097ov6s0idim1qyctyn7v6eqfx09fynl5lxfzq1iqsq914ru7kwmv8o80ibi5psvh4lti421h8lok2rkxh0fv0uannks2xowguq4stlb7sc80ppnqsglrrg4ehmzqs96bsur8rlfy5kswwpaaeulnh9lw6erqyd',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a1f89b4f-784d-4888-87f5-9f72d75a709e',
                tenantId: '04dea72f-4666-48f4-8957-aa0d3149f993',
                systemId: '22670223-233d-4d94-996f-1be8f793f547',
                systemName: 'va31iayunqg3em5fujdt',
                executionId: 'b2bb4e30-6145-47b4-b18e-35fbdbd8d216',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 22:30:20',
                executionMonitoringStartAt: '2020-07-21 05:34:50',
                executionMonitoringEndAt: '2020-07-21 07:33:42',
                status: 'ERROR',
                channelId: '8fd7172f-e38f-42f2-a152-1d0079b549df',
                channelParty: '3572wuyu9ztq4u6fh82lb8mf2upvbmb6530l6jj5d87hx8ob555jirkgpukmjmzgyraju1pet01t4leezvdpvs623o76w2iixoyxp8fj5qj7q8lbom9x72xldy5k6n2hrhobffbmvgda2ck1yui2ggs2u5u8y0i6a',
                channelComponent: 'tkcfssph7oh45ugnzr7tdlqogjeo41h0x8izrtsbl0q5vxk6fa6a08s8u8ohhmchm22ggex5pnzw4jqmfbasjb5vgysxos6zv32crlkgzhysnrz4z0hrrrz2qd8ivjfr7l92cbvqnw7radii70d1wqqsfr6zp7v8',
                channelName: '38q1pn18pparr26fu32fz0pi5fj2b47b6awtb0tme0lbqqamklb14ii7ao57txit2okfrlzkc23b27ld9lo26zlzepfp53etridskvdo11996t22v4ih2nvb0lopdyebiabolpcht59pjh5xh4dkcyt77yp66da8',
                detail: 'Maiores tempore est dolores dolor recusandae laboriosam consequuntur omnis consequuntur. Et aut dolorum eius officiis sunt ducimus rem fuga. Minus quibusdam nam eveniet. Hic rerum cupiditate qui quod similique. Libero quam ut ut non et ut sit quis. Aliquid reiciendis ullam non commodi molestias ab praesentium suscipit provident.',
                example: 'rhgcn0k4fw1fizzb54nlmeho4zlfiv3wc53j3fvut7aqa5lie33q5a3659oz9b1h585wigautxjmhru9ebxcd0xe0m185bbtojt1bnzdetjzurqu5zk6sgfxk4v3bbqfnf2rujs71ow2tdo0tfbd0n6a93dygbk5',
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
                id: 'a1f89b4f-784d-4888-87f5-9f72d75a709e',
                tenantId: '04dea72f-4666-48f4-8957-aa0d3149f993',
                systemId: '22670223-233d-4d94-996f-1be8f793f547',
                systemName: 'lvyz4oitt21jgmobyog5',
                executionId: 'b2bb4e30-6145-47b4-b18e-35fbdbd8d216',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 15:32:14',
                executionMonitoringStartAt: '2020-07-21 15:41:24',
                executionMonitoringEndAt: '2020-07-21 17:18:48',
                status: 'ERROR',
                channelId: '8fd7172f-e38f-42f2-a152-1d0079b549df',
                channelParty: '15uic355foxjrnkgzbq7cozdhzwl61dn2qtjdlpaw041iarv9husqyp9uj9etl8oodtp7fldbnsbd1jwc0tx3iqq5g9jw4435ppxqobrrac59c8e6xms1z18543v9ff2peaaukkxke3o0z0313q9awckcv0yipbs',
                channelComponent: 'gb1tx3wqf1j62vbhsx67dxqxu6sbim9h4cvsixuvu0qa4d1ssgtf3m2w1vf7wmrqjeiig9goxfrc4rowoz5oy09khag3oa51ymcn99rkgbrz42ut3h9c1ws4hu4v20j51ynnrvkrxph36lhh19g083q2rz0i8s7yu',
                channelName: 'ygilu982qxprwiaxb7t37b3xf5oi880sheizrbv9lkrtrg8z0jotljm4z8jtv2g1hkjp7eoyqjn1zse77toamq8gaxr8g9k8czfsbhjagkbfs0sxg1a2bajx7x4mwquv5g3xp5ou113la722j3a68ssockcqk2eo',
                detail: 'Eligendi et magnam maxime odit dolor. Cupiditate et ut non mollitia. Veniam ea velit dicta aut. Et maiores distinctio et voluptate. Et sed fugit omnis itaque nulla porro rerum repudiandae. Sit dolores id at nesciunt ut.',
                example: 'srswnlj78sf8sitsptwma8wbv3oxvw0vkc9wq4qg7tftof2fkvzhw775wi75ogc7ml2v9pecwyz5shjw58z3amxsuye5iqp6eqol3e93uxfupkx80lk8wb7fjj8ydh796i2lehpe6deznhx5r5ykah2flp06bxg1',
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
                id: 'a1f89b4f-784d-4888-87f5-9f72d75a709e',
                tenantId: '04dea72f-4666-48f4-8957-aa0d3149f993',
                systemId: '22670223-233d-4d94-996f-1be8f793f547',
                systemName: 'ehj4cam279vsxxh577xm',
                executionId: 'b2bb4e30-6145-47b4-b18e-35fbdbd8d216',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 03:29:31',
                executionMonitoringStartAt: '2020-07-22 00:04:11',
                executionMonitoringEndAt: '2020-07-21 04:37:37',
                status: 'STOPPED',
                channelId: '8fd7172f-e38f-42f2-a152-1d0079b549df',
                channelParty: 'mm7tkpwkd63j9xud87pkep7z6ymtqbwn4fsl79ohmawks401gkjvwvxckpdvgt16zimrh14uilnb5p49fc64y1mst3j8cs5zmou0k7b8plz0jes1up5xw0d49cbeny9ddrnm3yvi5youl8f0z0m178mal7v2lnkt',
                channelComponent: 'pcooi19esrqkhllk2om1dns66096f4j4tovhzw34bvvzceu1odbmmpf5awcciv6gzjwz9lcq0ybdm0m6onw95t716srq8lzw4yko3c71tvu8w1xbjg4ojx1zdrkqef41xqut2iiekakvd8bf109y917olf70zpjt',
                channelName: '7n9dgus0tr0e7a8c6be2guz7cjgm4scjhxf4na8dny0dg4318c8hqn954kfgl8qzfe45c3wyzsz4ozenp8wnxxfsscs8ixgkgz39h1z2uoy28ew8x02coyvher25k0jynmo7zjy3xt8ordbfipxlvfi9nekpp4oo7',
                detail: 'Id occaecati quis distinctio saepe sunt omnis et. Possimus voluptas voluptas quod tenetur exercitationem enim voluptatum. Quis error et voluptas in repellendus est molestiae excepturi. Et laborum suscipit aut. Omnis corrupti et labore nemo sint.',
                example: 'btdoir6t9mlpcjoijepua6mwiurtyzic2kmqna2pgb0wtgzolgpo9jn30pyyqesgfloydqhzjtj18xor3fjj9pel9mzucylvueu4wg9bd2iw1aopwijtenuwmbrcheo8ltb3uccye0dxqofo26bysrigfy5ftthg',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExample is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a1f89b4f-784d-4888-87f5-9f72d75a709e',
                tenantId: '04dea72f-4666-48f4-8957-aa0d3149f993',
                systemId: '22670223-233d-4d94-996f-1be8f793f547',
                systemName: 'aqfw7lbqe5wez3mr7yfi',
                executionId: 'b2bb4e30-6145-47b4-b18e-35fbdbd8d216',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 05:01:38',
                executionMonitoringStartAt: '2020-07-21 05:45:59',
                executionMonitoringEndAt: '2020-07-21 10:05:08',
                status: 'UNKNOWN',
                channelId: '8fd7172f-e38f-42f2-a152-1d0079b549df',
                channelParty: 'e8i3x3izcwa4noixs9rbvq1h5uuyc0whz34usblz4e1abreox9lvipjm2n2oyvt9ymnpz0qj7yd4lulvp8x5wvsvbksxoceju1qfef7mx06lqrso7zrov97q4rxngd7bcu9rk33hbj0x3gl8us16zigoqgbbhbpw',
                channelComponent: 'qcm368bix88ucj7l00602o85s8099n5jvu556o6m71nt03zu868iw2nj8j2dmczxvqgnb2gkde6qcnnxi43r34pl9t4io27l2y3bft75bmj3gscyhzn20ujnt1fk8nwy3opyckvylndvuwhgn18b8t4y72leg5h7',
                channelName: 'uflmwfr96dvqbivxxuedaemcxtioky9e5rvhow1pc96p8fp7avlzvdfev8qt6wielsb9t24t324hcp7nkmnykbnbwc8t9o5b0nmv65yctxn8kh9l366hy58qebkwyaqyjmf3xrei0vucxslxvp8q4wdos022hg7x',
                detail: 'Neque quod quasi. Reiciendis et quia voluptas commodi iure eveniet minima. Labore ea iure asperiores ut. Molestiae et at sed vero consequatur possimus.',
                example: 'oxp3do8z7ms9o0sygbj0d3utt69dhmkszxip9e8oblmhwe78sgf297vtcttb92gtnfp70cmo6qqv3818kci8vxa3z18irr2teotgctnen9b6so6xrvj5zcdrql1fv1r9r4dqvg62gyfxb3qbv558ay22wfer04oqa',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExample is too large, has a maximum length of 160');
            });
    });
    

    

    
    
    

    

    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a1f89b4f-784d-4888-87f5-9f72d75a709e',
                tenantId: '04dea72f-4666-48f4-8957-aa0d3149f993',
                systemId: '22670223-233d-4d94-996f-1be8f793f547',
                systemName: '1d0zonjo7mvqau8jlb4n',
                executionId: 'b2bb4e30-6145-47b4-b18e-35fbdbd8d216',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-21 13:08:17',
                executionMonitoringStartAt: '2020-07-21 04:11:31',
                executionMonitoringEndAt: '2020-07-21 18:32:49',
                status: 'ERROR',
                channelId: '8fd7172f-e38f-42f2-a152-1d0079b549df',
                channelParty: '024nf6o1yotnhkxfzn0j6yv2o3wwk4q849882c8rsr5awhrx420qvzm1tps5b7u0o6sb15g8b815l4fyu7hzh6fdd0qmoxf31k55ns573vlffu4svym6xhbd1xclocpm9bzzxh7xvepf8nzagst9ygxsc1yxuq01',
                channelComponent: 'tgs9axbl6uprrtoabja7at2whtj4u3l4lzq40zhsarxhpxo3jnlisx942mco6nqvnp4s3fktwvsmepvpxxfhbcjoxfljbddskl5jn3i0rv7eu6t9dujdkz8ovu49m9o2taw4dj9lz7y7j9erelw66qa99ca6tkc4',
                channelName: '1hn35ptdmrsjsqhxzn8j1dp7r9d1f0wllkmacuecw0d71snomz4ox55r28whmxoguntui0aa20b4alyobhb0q1y3qkhf8331nq21jegjddzuh08sm9mvl1b167ivdpkyfby5mbd2n1k5fdbii7zcygr42xn6rx41',
                detail: 'Veritatis reiciendis quia voluptatem doloremque. Ullam cumque atque molestiae et ea consequuntur et recusandae. Odit aliquid nobis. Sit est autem velit in non amet sit. Et ex pariatur eaque eius quaerat. Culpa culpa quaerat eum soluta facilis eligendi.',
                example: 'b0fp3ayo6kknbkl352x31h432nfur7i1wk0468r7ymps4izdx080epmj29ozl67vu6vaydopionqmwwr65wgqo4jrpgokestes561efauva428lxlglb9mzt956dadbnjfne17w17mval9uiqqjjyoy6deizfh5a',
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
                id: 'a1f89b4f-784d-4888-87f5-9f72d75a709e',
                tenantId: '04dea72f-4666-48f4-8957-aa0d3149f993',
                systemId: '22670223-233d-4d94-996f-1be8f793f547',
                systemName: 'khhjiq5fstamxdm6x565',
                executionId: 'b2bb4e30-6145-47b4-b18e-35fbdbd8d216',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 20:58:14',
                executionMonitoringStartAt: '2020-07-21 23:58:09',
                executionMonitoringEndAt: '2020-07-21 15:14:55',
                status: 'XXXX',
                channelId: '8fd7172f-e38f-42f2-a152-1d0079b549df',
                channelParty: 'rm243vixs5ch3yhnor9epb0sykc3h995ls0j6tpyywd515daly8blbejbbmejze3n7qwc06l05rw6t8rx8bmwmapi1v3xj4macyzlhyen4ncoi1s5frmyax1whjjlemsacgz63rcsrrkncbmehmwxbieeejbj16g',
                channelComponent: 'l0jyu3vivu7h4s2c5rbny3u9etgo8puuq2oqpty4juo7ksmriv556dr3ee2lyq66txj408mk0kn2zsx3vtzcg515wxxfvty0k6fdqumgyicfm32tzlx2boltar78gcrfvooci9en7yn51fm0kcwnmym6szcw45jt',
                channelName: 'am1h5h1x5m1yljgms4bbdqimqb3xdxmndm8zk2bf9wlz3k1143pqsd0wv0u424dnj8ixzmpljg0bt45c3n6oyjbcf6vpzon061hw0gjzn6xn9q212izw32hil6yb7u2xvh55gmgkicv6mkjp21dsu21t4c8sag4h',
                detail: 'Praesentium accusantium laboriosam. Sint sit quo doloremque blanditiis pariatur est sed sit. Voluptatum aliquid voluptas maiores deleniti laboriosam ut. Qui mollitia reiciendis. Itaque sint quaerat numquam sint voluptatem consectetur est.',
                example: 'phndgrr2z6gjan4i6wfmbxzniq1mgt7bqye9zkf4rg2vfzsh1b7703vzhyz6hrrefha8puf1qg6shuad18ljdvr10n6uang2j70fvg79skg5ufghrcr0j64rj0ai2iixd2wzjl0safs5cexav754k7enmsn7rebn',
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
                id: 'a1f89b4f-784d-4888-87f5-9f72d75a709e',
                tenantId: '04dea72f-4666-48f4-8957-aa0d3149f993',
                systemId: '22670223-233d-4d94-996f-1be8f793f547',
                systemName: '5viue5ecmxgvurx5vf4a',
                executionId: 'b2bb4e30-6145-47b4-b18e-35fbdbd8d216',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-21 12:05:32',
                executionMonitoringEndAt: '2020-07-21 07:34:53',
                status: 'ERROR',
                channelId: '8fd7172f-e38f-42f2-a152-1d0079b549df',
                channelParty: 'a0bi242acbpxccnhgnho37sgaod4fuchvfthjhb5rb4iuy2ednvk8mo43b8cnb16zmkuil5julkkzzdyy2l7vf5k4emgkcx5o4djc2wstspyaftrdbtt9c7e8a0vk7j44jl27ovh3ft7z8z2t5lr5q1nml85kyvj',
                channelComponent: 'sh09thy0e2nkqadmpbn2zxvkw4hcru19eg9ccxdnslb3jheuucsn4fv5x6kfm1v7euwq5kfy9nb6hfjacgok74swohhf8olgmta9biwlpue36ctnepw37t55w797iin5vyuh71iazjt9ndijjfxvgyfld3e0gkf9',
                channelName: '01yo3gsqyqnhts8m29g28pu8gxvcv3wgtcfwz5t33qtqvsfwpdd0vlul3dzkdudpzf8gfr9fv4qf1hq9o9hmxvfihsj0dl45qd5p2pno5ug0w586zqo9wxdf2pqdpo14wvl5uahti0jkkjarxm9ikgk4j4opdsz9',
                detail: 'Cumque temporibus dicta molestiae quo ullam eveniet qui. Cum quos id aperiam repellat consequatur aut excepturi ex enim. Magnam occaecati sint eligendi enim tempora ratione. Placeat eum qui rerum similique. Libero voluptatem explicabo est est. Ipsam at nihil et consequatur in ullam quia non.',
                example: 'lnvmf8b00b95x7iv8qi4d6ig1kw2wj5tm4jk1itopxqcv5dwt2b7hvl8jya85xgw9wg7ubwmuomvtx52i51xvmdl16gxgbplvmh9vk4lwe167zsnhlad8sk608tym83dto6hvdgefgjfioxptf31uhvaqt717kyc',
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
                id: 'a1f89b4f-784d-4888-87f5-9f72d75a709e',
                tenantId: '04dea72f-4666-48f4-8957-aa0d3149f993',
                systemId: '22670223-233d-4d94-996f-1be8f793f547',
                systemName: '4886h9983yq9jjxo5ev8',
                executionId: 'b2bb4e30-6145-47b4-b18e-35fbdbd8d216',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 11:30:03',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-21 02:14:47',
                status: 'UNKNOWN',
                channelId: '8fd7172f-e38f-42f2-a152-1d0079b549df',
                channelParty: 'nadeqys52ij98hpekuoiay2mu1ybnkzzj6rdo1kgzl88626t9id03ca98ieboso9dutwv8qos0cafl2843fld2ep6xae4tjxmkc76ec53ypwxzej6kg55cfd8hvr6hkdeq263xety7vb10y8k02cuu60isyx85bs',
                channelComponent: 'o6g11ygf09hngfm34jbs2azrqfpzc4252b59hfh5amy0qk6acm00qnxse7kafe84imixw3nap1rs58i6us76c3oee0ysm44tfi6d78747esy60i2zw6plvknq6y0fn7967yxk50s945jsp7knj5d1jp6j4tueuu6',
                channelName: '1052g6vh5dg9lyfa1wmpjs13ulqr2sqyau9bztrr8ez8rblhrlazvgg67req8ust42mty1xofoux340tvi6vfovfu65l6p95u89k7zv5o2qq6q7tlp9473sfb55zoief6nn8x51ifuw6a9he807ml0bvami8poti',
                detail: 'Ut nihil in ut eum omnis eligendi voluptas ullam nemo. Tenetur consectetur dolores quia odit qui et doloribus minima accusamus. Minus qui doloribus perferendis.',
                example: 'vj0hjtgfapkiqximyr1hf7tgeoac9ygw1rvj65qv3jdvvzdwmc8qmc97t8bbt77dojlnh72k7gc1d0r4ai5b2sg8whnbi0te9572zbtkebtuw0vikf678xt2dzoeu07mwn1ykyxonqanzi88z0gxlkmggaq8ra1l',
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
                id: 'a1f89b4f-784d-4888-87f5-9f72d75a709e',
                tenantId: '04dea72f-4666-48f4-8957-aa0d3149f993',
                systemId: '22670223-233d-4d94-996f-1be8f793f547',
                systemName: '10cxd3uy336dfhq65q2r',
                executionId: 'b2bb4e30-6145-47b4-b18e-35fbdbd8d216',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 14:59:08',
                executionMonitoringStartAt: '2020-07-21 01:56:50',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'INACTIVE',
                channelId: '8fd7172f-e38f-42f2-a152-1d0079b549df',
                channelParty: 'v68r9k14inl8letprb4rfo2cav2cafgccrpcbgjgqjboxhgpar3xjiiu3o0hcjxuqj0klinhmiysbb7djdple7fwx030adzlc0mga4po9ix33ua036rnjqf9p3ze0xo5622elld6z5xwnuz5qiey9pqmj0nic0ul',
                channelComponent: 'm5m9swqlvgdh2efbhq40dlhr1xn78b2id59d8t3g943lanf1u7gtc2oe9i2vgmiuopyz3dcraxtcpt7l7xbk8bwgt6f664nhqicv5k4wjfjyfinz56grcdo0bojoznot47n4otqyucxybtjuru255bal67l27227',
                channelName: 'qlflp1l5jxz6n3uu8tm7qbmmh6opxpq9l4l5mty3l9l8e0xxgxcvo2gl86itru0xznoweuy0aieyo70j95lu0nm5fn2ib2tixfqn63a6udw16cvbqrzoc63k1u2jst2xt837uecrda6ouzrp3yef32pyr7ibbq50',
                detail: 'Vero qui nisi perspiciatis sed quis perspiciatis commodi quia at. Id ad perspiciatis molestiae quo ad sunt. Omnis ut aut cumque optio asperiores nam facere.',
                example: 'noqkrz1odkj0brg0u343s24enqk8d4x8orm7jnb9hc68jf6citsgwjon4ktitnv6a88b1oaaacdq6lsv8il4k52uwllanyzasavqwoc5ydnuvdwzej52hpexfakd1gg6uzwlfzfjfhbaav8nw2sh2cceqxqo2ca0',
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
                id: 'a1f89b4f-784d-4888-87f5-9f72d75a709e',
                tenantId: '04dea72f-4666-48f4-8957-aa0d3149f993',
                systemId: '22670223-233d-4d94-996f-1be8f793f547',
                systemName: '20k0om0qrb6z3fn1b2u5',
                executionId: 'b2bb4e30-6145-47b4-b18e-35fbdbd8d216',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 17:29:35',
                executionMonitoringStartAt: '2020-07-22 00:21:01',
                executionMonitoringEndAt: '2020-07-21 18:20:41',
                status: 'SUCCESSFUL',
                channelId: '8fd7172f-e38f-42f2-a152-1d0079b549df',
                channelParty: 'wpmp7bcwjeco86bcimbb3g5ixkmu6fvlr64gkpciwshi3md502w9uc57s3scoyu44tvwz14n3psnezxvgixjjk82fb6y71utngs1rl95jej2nqwqzza0rg15fteb2cz74rc7yeane9cv6et811bhpz9r0q9na8wg',
                channelComponent: 'qd1pfs3e943sw85iqyq0kbif62h5f4s7oen366tbvyzmxobolkv2xdw2lvqhx8uftmd6sqqj4k33svg30otryjssmne30yb8zjojbdo2r7gfwrjarp7o1342ajgvsbehjee99z0tc03wct0jz35qn1x8objz7ica',
                channelName: 'mfggy45d8c6hvz3rhbttfqp77u670eibqiknih6nb1f1tfuc7z6zs5mnr6gut0hfxqci4i10s6uw2tojnvhq7hexc98bvl8sllqifch59kb5ue697bmt7ztgffc444df6br8bcsxdpbdb2do0am2xw4wl3puheuv',
                detail: 'Quaerat aut non facere minus assumenda est quis dignissimos. Ut facilis placeat explicabo consequatur consectetur est. Quia laudantium provident aliquam atque voluptatem. Eum reprehenderit quo. Aut fuga quod voluptate animi blanditiis eaque perspiciatis id.',
                example: 'vn4rdam3q341z7q21xcbz927iichj5koasqn81d98iv32xpfmo37uph76v42wn8iani1vmeoi57b9pipexwaip9jfjt7nxmfm8rphycbca2ozispt9msnu40kowexwm97tjzk7s1bsnqy6r6r27hmkbsqr6008qy',
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
                        value   : 'a1f89b4f-784d-4888-87f5-9f72d75a709e'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'a1f89b4f-784d-4888-87f5-9f72d75a709e'));
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
            .get('/bplus-it-sappi/channel-detail/a1f89b4f-784d-4888-87f5-9f72d75a709e')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a1f89b4f-784d-4888-87f5-9f72d75a709e'));
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
                
                id: '433490cc-7eba-4a80-8f8c-7f98951c5310',
                tenantId: 'ee127d5f-bcf0-45c0-9de9-20fad244a6a1',
                systemId: '07d97ee0-9053-4f45-80f0-5f6e3b033c6a',
                systemName: '2j4doiqsoyxpkrwa8x7c',
                executionId: 'c88b1fc0-0aa8-4ff4-9b72-e318ffb592cc',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 06:26:14',
                executionMonitoringStartAt: '2020-07-21 11:22:24',
                executionMonitoringEndAt: '2020-07-21 09:57:29',
                status: 'UNKNOWN',
                channelId: '5a5bde1b-6124-45c7-9965-5c7eab25e86d',
                channelParty: '8akpagp4wefefttho6zhn0q48tef306roqh4q06ged85anre1u8521w0uca73udk1bpuosy85dl9pbox7colxq71dxgvci6gg054oc60v14yfui9sjkgo3q525x8vveoy6rz0abgtsqw83wtn9dtkousdhoi58y5',
                channelComponent: 'a430ddyzif2k2dsuhuq760sl6rlc3qhyaxdf2erwfgaxar38ajx0ar1p043f0huraxna8fz9tyo61den2om39lfe0yoocl96o34urgrhrwyq05r4pt9maadqw9f5uypxdgw95eod8fzajq8marfqzzfa51mzbx6r',
                channelName: '88pp21b7yoznombfefwcn46jn0yyfo8ejhoccixg6akvixngx778n09njnmr2qcg1xwy3bx4ccfvoj902hqhpyor0yy5vltc767nv8e31igutrv07irwz5b08hg9ses5j36bhnznj0nrv3mr7e36hvqeejdfer38',
                detail: 'Rerum repellat corporis corporis doloribus sed quis at tenetur. Ratione voluptates sit. Excepturi voluptas corrupti sapiente eaque aut provident.',
                example: 'gmp56xc6w0b1gj1tze6wrw8nk314qp8gnmr9tau6muz5rhakb9vy79yp57nledmg4ur3osxdgp2pjxf8y7krll723rxffio7wux9r0kxk7hgfggw1tpmi1dw5cr38n00vkizx65m6r7ifbdlq7y5o0sxeqibtsvr',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: 'a1f89b4f-784d-4888-87f5-9f72d75a709e',
                tenantId: '04dea72f-4666-48f4-8957-aa0d3149f993',
                systemId: '22670223-233d-4d94-996f-1be8f793f547',
                systemName: 'y125zehds3tobhsjyws9',
                executionId: 'b2bb4e30-6145-47b4-b18e-35fbdbd8d216',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 17:05:41',
                executionMonitoringStartAt: '2020-07-21 22:15:19',
                executionMonitoringEndAt: '2020-07-21 22:48:11',
                status: 'INACTIVE',
                channelId: '8fd7172f-e38f-42f2-a152-1d0079b549df',
                channelParty: 'j3lx3sr1omte17ouzabtuieqed116ab2o5nbppns0ddzt9xt0h8wl03zcbxnrjvovk7uiueg6f8b4aeam51vxrw5k0vcyff1pbfhuef9jyid4hk7fyq4oj1im4ljm7weg5km9cs0tvpesr6yshjokzm4n79cky36',
                channelComponent: 'xvzc09417drj3jzogr5k573rk7ts1slsrl2tzi5nguux29ussj81ztph9u5aaag178018dfd2rwjwg0epnlrn2tn3d0nct3q4wci14y8biho1iq052tzu1ehh2lbgez6gx2zrt8xull190mqgn7fyk6qtn1wrldm',
                channelName: 'nw9iucz93pr0tpdikli33cczlgmn4q6r5ctjjawykxy4lofjq6ty3lfs151uq337dnrqgyfp6wsrr5a10l7bzc1kxou4by6047gcszfs1qfigr44i4nabcmrzx3xpj6dhrgzu9ykt06n8u2efrv8qa3bdgglz2l2',
                detail: 'Quia commodi sunt. Architecto occaecati esse earum est. Consequatur in a fugiat quia mollitia delectus quia iste. Ipsam veniam quod magnam quo voluptas facilis sunt neque exercitationem. Fugiat eius porro quia ad eos iste quidem ut.',
                example: 'aqx7op7wik29nlcu7c72e7snuy4wwt8g4ls2lqku8pzas5t7s3ait70tqksstcs2fg1994miwaxzm252xxrrdk4l7dqmw03uqzi80cwui02f59x4dq9grnlzqbg7mcif3ljisumwnj5rzd7l06kna9zijvq2fyul',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a1f89b4f-784d-4888-87f5-9f72d75a709e'));
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
            .delete('/bplus-it-sappi/channel-detail/a1f89b4f-784d-4888-87f5-9f72d75a709e')
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
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            example
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
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            example
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'e9f4edb8-5255-4146-8d73-b7f14fa3d095',
                        tenantId: '04dea72f-4666-48f4-8957-aa0d3149f993',
                        systemId: '22670223-233d-4d94-996f-1be8f793f547',
                        systemName: 'y6fjt1gs3csx36p3yrmi',
                        executionId: 'b2bb4e30-6145-47b4-b18e-35fbdbd8d216',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-21 20:54:40',
                        executionMonitoringStartAt: '2020-07-21 13:11:42',
                        executionMonitoringEndAt: '2020-07-21 15:41:13',
                        status: 'INACTIVE',
                        channelId: '8fd7172f-e38f-42f2-a152-1d0079b549df',
                        channelParty: '5wwtgn0zxepux4y0pmo7aptdhmkov3tfyphd0y27scf136xju7rnuars6b6u6wmmjd6vmnx4knjdp9mczf0pu8h6522p6mhyuvq06ry4vwfsac4ut51tbvlo3oi6lc2jby3l8ux7vvrkmvoxcgcpw3zb78b60qf8',
                        channelComponent: '5rej2qloplwwck08a7jx90xdqmcldrsakhaj87lwdcdj4suuu6niftaqj19uwszavl89rb9736zppxgc1ofn9475e4f46bjicobl14npr1y5pg8uqleunkuek5xchiht2einbpa0yyuirdhm7b82yhy85ifd4z3y',
                        channelName: 'v0gzzms2a405sjs84tw21c78jr71rfrvz0gv3gnsnlhqrx6yqfwxduojpsnwjynahb08pvgz0yxws7grlknqgtzyqcmmqrztslzptdt5zzdodk77w8jm7la6upsq7czhh27deq0mumu5zqojwbqa9u7cqtsnc1u8',
                        detail: 'Repudiandae repudiandae quis. Expedita ut et maxime ducimus aperiam maxime hic. Velit repellendus commodi quos.',
                        example: '3u679aulq5m7y8mcam490j4xx6pwglmbx4g34t5gfo5tkvf6rkrru9nejhulvbpjnnerfqxhdsscbt92yy5w70d8736ahujkd9ujljahr7sgz1c1kosepd8d2ycwab7vsxj6yy5mbvarwywtkfeawtgmxaaw7smn',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannelDetail).toHaveProperty('id', 'e9f4edb8-5255-4146-8d73-b7f14fa3d095');
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
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            example
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
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            example
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
                            value   : 'a1f89b4f-784d-4888-87f5-9f72d75a709e'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelDetail.id).toStrictEqual('a1f89b4f-784d-4888-87f5-9f72d75a709e');
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
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            example
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
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            example
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a1f89b4f-784d-4888-87f5-9f72d75a709e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelDetailById.id).toStrictEqual('a1f89b4f-784d-4888-87f5-9f72d75a709e');
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
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            example
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
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            example
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '2075165d-7248-4076-8535-9bbf639a4614',
                        tenantId: '343db66b-f07f-4bf8-96a7-7b8fddf2b3f5',
                        systemId: '30e7af39-f72b-4a8e-8225-9e10986cb0dd',
                        systemName: '2id3pd1p1rudt4wv16fx',
                        executionId: 'ff342f16-2237-481d-9b1b-ba5b777d70b1',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-21 13:24:58',
                        executionMonitoringStartAt: '2020-07-21 09:38:31',
                        executionMonitoringEndAt: '2020-07-21 04:06:30',
                        status: 'SUCCESSFUL',
                        channelId: 'f99800a6-3201-49eb-b847-af9c94f5356a',
                        channelParty: 'zfp3iqgdzx3bxqbjnmnzp30q2xk3n3et7q75kmldx941es2db7xb1tw4foknww5ol2za1wraohklegjn2ee0r7tkvrd7eeucytp0ulx2grjcu6htganir7tens3hbujfcdjasiev3og5geipcugsceb0ixt2fwgh',
                        channelComponent: 'sqbqmrw9cx14bj9u6aw877n2g69j03fumkj68nkv6wht0wsa7ou3n8tcpwcnvmb7gvry6lch32hanxbgyqw1pdkna5327o1svbb67f9bmylwdihfnvdlh0cispvuswy5qlfbjkwi9b8e2gzz45d069lpxowxebhx',
                        channelName: 'crvm31mierksx56k6fs44vhcvpyu2xz5ws2agukr8be7a7lx8c09no11dba14ws240wa966ctltl4328j4v0uck9o684ozk975psqunacj58o4blf38yt0lsyyjopky7fp04cntmnqn81vth2aji1ct4am9aad6e',
                        detail: 'Pariatur ut animi voluptate dolor. Quasi odio et esse. Velit nihil quia quo officia mollitia delectus quas qui.',
                        example: '36wbje3ytda8i3mrlrerc6du6azrofgilfsw9qgxlsql9xz72uoidrrzowvplgx6w5l2go2yzf9fabpflytd89wwyp1bszj3ixevvku4svz2w1wv4mrsppdwdxqri8zydtizhc3jy3nq4r80rhiiw7wcyrc55ovo',
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
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            example
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'a1f89b4f-784d-4888-87f5-9f72d75a709e',
                        tenantId: '04dea72f-4666-48f4-8957-aa0d3149f993',
                        systemId: '22670223-233d-4d94-996f-1be8f793f547',
                        systemName: '85fydyk5kn9sn7clkalz',
                        executionId: 'b2bb4e30-6145-47b4-b18e-35fbdbd8d216',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-21 16:02:26',
                        executionMonitoringStartAt: '2020-07-21 09:55:50',
                        executionMonitoringEndAt: '2020-07-21 21:27:52',
                        status: 'UNKNOWN',
                        channelId: '8fd7172f-e38f-42f2-a152-1d0079b549df',
                        channelParty: 'zigmw0kn5oos0ju1tthabib65qy135y22f67ocoisomjks6s54tmbbs3x1r4ki006rmhu0zaqqgttzv94m3q0qrjpzmz8483huy01lycw83ojf2nnwjtnndoklg3binmjqrk2oia55ah60xzzsf8wnrazo16522k',
                        channelComponent: 'ipizqr4jd8y1shpyixnbhwf5bzj1nttypew0fegqzd3v8i74gvhdn7q7518jis0a37f20qyhz8rurrcm9lu07may4n2zigv0e1afgdgxlt322w84im885sji8c8e1n7ek5a6rl1fp81kzj7azut7qze2fw6a4ycc',
                        channelName: 'iokoq8q03luzyshtvy4haq3vfu73v9hfgpdkuthwpaoolgc74bk8vqr2jc7ood734e32m8uagb0bw41z15fdmtmovy2nj1iqppk6lrrokw43356m6iipgodhkjp3alyihh1kuv85tkhfc5asynigyiwwcercwx1q',
                        detail: 'Officia aut delectus. Nihil occaecati laborum perferendis et quisquam sint. Ut dolorem atque similique atque aut odio nisi optio. Rerum quia qui asperiores at sed nesciunt vero.',
                        example: 'dp9cu9u65qr6oqsufecnyk6u12t2hsbnsaili5yv3q716w5l3mozxcz3vepm0h8foxi72gho474fep3ijmouswdx7i3g3ip3qw9mcqf4gow9k88rlqfdeq2pnnaxvhevtsz10ht457aowgwz91vqtxj4dmrdx5bn',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannelDetail.id).toStrictEqual('a1f89b4f-784d-4888-87f5-9f72d75a709e');
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
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            example
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
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            example
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a1f89b4f-784d-4888-87f5-9f72d75a709e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelDetailById.id).toStrictEqual('a1f89b4f-784d-4888-87f5-9f72d75a709e');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});