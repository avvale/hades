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

    it(`/REST:POST bplus-it-sappi/channel-detail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '08ea6898-c808-46e0-b5aa-6587eb458e0d',
                systemId: '1872191d-3649-49d6-9bfe-4f871cb90c87',
                systemName: 'xolr5ux7tgso2ml7s9yn',
                executionId: 'bab4872b-d33f-4ebf-8e26-e24112fdb459',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 23:59:58',
                executionMonitoringStartAt: '2020-07-17 15:20:45',
                executionMonitoringEndAt: '2020-07-17 03:35:59',
                status: 'UNREGISTERED',
                channelId: '65a58e8f-a01c-4206-bd23-33c36604ea63',
                channelParty: 'gro77nrrsx2ssaobtwz7jk6yh8dhqhtj3y990vwq18eymgoq5xts5a6dtw38h68v41wvces4joigulyg0fyv0a7t14chq3cwa8wls71wka252w99nptp69l4qxsqza7oeb1x48skxpbz0zoq56k2uadzr5bj4qkx',
                channelComponent: '8i429c9pbhx64r965nlu1hyles88zjp8pye0suzvxs4l06vprls2kr161q97trtb2xpk61iyi85arcbaanpnmcs0ooqyx2i1k6xsswkidy7dyr7qb32ykkuuhziqmu9z26gnbz4pwlm9934ydouwx54pfinxxcm9',
                channelName: 'k2ow0un7tn1nu8h02l48tf47jigy074ultebmb9ow36h9g3hlxajkf8abxv8no1wx9374m3ofu4jcwjkqfxbzjnp35pz6c5rkfu4jl0cxbr9mqs1f2yizehnl3ic5ojehr8d8jxd93arsf0ou7ippxfci0qmud46',
                detail: 'Eum voluptas totam. Omnis impedit quis sed iste dolores omnis dolor deserunt nisi. Veniam laborum est in ipsum sit consequuntur. Hic at est. Cum quidem ea accusamus et quo reiciendis. Quis magnam qui.',
                example: 'heaxua46vb09zbxzt497i7t72zrrvkg9opewkptyw7uhp3dder2nt4cfnnm9gzi0yst3aivxog5ze8ceohfrsy1y5iuofuudu3yf52rulb67usl3jld99z4lhv0qfn9duzwzz8leebrgo4vcgy1vkz4tuj8vj4uz',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '08ea6898-c808-46e0-b5aa-6587eb458e0d',
                systemId: '1872191d-3649-49d6-9bfe-4f871cb90c87',
                systemName: 'iwblyujjwj9eljx39suv',
                executionId: 'bab4872b-d33f-4ebf-8e26-e24112fdb459',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 00:41:46',
                executionMonitoringStartAt: '2020-07-16 21:03:12',
                executionMonitoringEndAt: '2020-07-16 17:14:56',
                status: 'UNREGISTERED',
                channelId: '65a58e8f-a01c-4206-bd23-33c36604ea63',
                channelParty: 'j8xl3dgdhyzjelwsj4sqrdf2ime9newdzg0gcwumz7874x9yl0r8dxxcbn1qbmxao5g69lh88ju6jsla299jb4s2f1epzts45buzni10okkp8mr316c456iybjlcendl0o3ijnxz1izr078pla1r6tx7cr78xdyc',
                channelComponent: '37xkmsld7nwtsxalvthkem007jscm6quy2w9ulyaftrad5tgz838z59vsqjpk59eu966aezbodwtrfjqk32ufyyd4ejmod35gd19hd69pgu2uva214h0uyluhtnit6vfsn9ydkrclkddor3q3c1n2fs0geyopk08',
                channelName: 'buekrcioqgw3sakdpi9xzfune0cvzmaklq54twa8hepynxeu3qhkde29dazf6h6z28ccbwxxmjbxfd1gdmtjqcm0z5d74ij49ge1wc0q5vzzn1tqgpsfdbfk7bz2pm7y22oyo4u8j2ja2aebkws2339uyy32992s',
                detail: 'Inventore consequatur expedita deserunt omnis et nihil et consequuntur. Omnis molestiae dolorem. Sunt qui sit cumque porro mollitia et dolor eos. Sunt voluptatem iusto numquam qui ut distinctio fuga dignissimos. Quo rerum sit iste architecto.',
                example: 'f9d3macl79b8jnafireb4ulebn9y9cq645cjrd4w47uropsbpjldww7xyl0xmsu4vmpx1azrvbufxmmxjhkiskodfp9htcdovp48k80dt9yi3j2a8bfyv2lqol2vuqql54bagibke8zj7jbp853ncluk7zb3s3ij',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8955fb29-e3b9-48f1-aed1-e0609284bee0',
                tenantId: null,
                systemId: '1872191d-3649-49d6-9bfe-4f871cb90c87',
                systemName: 'bqeta5fbmly9a6puiwom',
                executionId: 'bab4872b-d33f-4ebf-8e26-e24112fdb459',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 22:11:59',
                executionMonitoringStartAt: '2020-07-17 00:45:29',
                executionMonitoringEndAt: '2020-07-17 11:59:26',
                status: 'UNKNOWN',
                channelId: '65a58e8f-a01c-4206-bd23-33c36604ea63',
                channelParty: 'zhbpz5ctytqbl9xzx6zuzg86pq3ui17xs3hj8zo2n74xcvi0fa46s9qybiio1az0oad6wkrrsdd5w8cgpc594vfe2x2rhaayoh7sn967avojizqfq8poi5q4hqk6n9r1vk6vjthkzhym22asa49l3ps9xqn78em6',
                channelComponent: '7hob0la2h039mrpk39it3kt1r2pymj5w26aut2b6m86a7gdmhxm9cgpwm68r5zyhqptnug5ptnclq1gmhtpde6agt5pehwdyvplccmovnnr24sai04685jrb19b89i1uvskxzjbd8x8tryj7aou2m72e2sqk32xw',
                channelName: '1ju56kcapxubgy0d21fasayktorjksx8ly0j452qv21z3iq00jh93l76o2ds3yqsir8sbfxiotr084jgz7ewl22y0j35udi78fz1eezewgmpnblyqgpqt4z74hz17ounn079mxtvp5krrk6tyaqe98ypq08rbsyj',
                detail: 'Sint labore sit dolore. Ut alias deleniti non voluptas. Molestias ratione temporibus optio occaecati dicta dolorem aliquid. Quis asperiores et sit.',
                example: '52vvbfjm4z221q5d30waz9efck2wm9m7nt7ya5kg6gk3aosjjg2cp0b5lwe7r2kolqjoa6or5yvnryfdedf5bo95r8k1exjl303xgwwgjqwbfer123jn3jhkk4yeoxxi41k6b7uuidrdd3s1ghy8fhuktng7d2iy',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8955fb29-e3b9-48f1-aed1-e0609284bee0',
                
                systemId: '1872191d-3649-49d6-9bfe-4f871cb90c87',
                systemName: 'j2bjzn6f1nkcl34f98m5',
                executionId: 'bab4872b-d33f-4ebf-8e26-e24112fdb459',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 23:21:41',
                executionMonitoringStartAt: '2020-07-16 20:51:51',
                executionMonitoringEndAt: '2020-07-17 14:37:19',
                status: 'INACTIVE',
                channelId: '65a58e8f-a01c-4206-bd23-33c36604ea63',
                channelParty: 'drj6kqfyqdgzqglrluwisl25rg8nja4tr2txfxmx113v5h7csi26wp1bvdqq1l1o20u20kclnndketr04vmpqg7tmwx8bdz85u7osk06klereo1qyfvs1wmy5waxm0zo2k31wj7ru29q1w6cu18qq4pxfm4wz6vb',
                channelComponent: 'f1za8vm4to9mtz7ayj6w1pwhtf01g9herbf8djqztdxh86ykv4kegqfrv8ewda4dvc383crw2760iy5dwdxcbh1iny3g3m3935ityk4dzeqthx64e5mqqlt8d96os5krdcy0kicu5f99l9c4z7iref8qg1okqk58',
                channelName: '3isfrpc5hnwbdscwj016sbhi2r3ydiz65r9ygabzy0uatfvv8r82gh3ct1svwsi9yekj5ugq40yg4xzzembt1gc3ee3qwdk6uu08vitfrdvcqskzrw155kwe4h7ecl7x8lsb9j74mn0fa3vuipn356np3a9ln689',
                detail: 'Odio ad ut. Et nisi non velit perferendis libero. Tempora rerum exercitationem et est qui unde earum.',
                example: 'cmepen8fedp68h8zc5yr13zwof146zjob2rcq6lev71jquzdsqwifhho4mhmg7cda8p324s13qr5j4hmqwld7gh5bkqljyqznep0lqx1jkxb1szqz5786cobvgyf5m0s824f61m7urn0shhk7yf97lp6md1b7za9',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8955fb29-e3b9-48f1-aed1-e0609284bee0',
                tenantId: '08ea6898-c808-46e0-b5aa-6587eb458e0d',
                systemId: null,
                systemName: 'i68xgbx8mh3ik6yclsw4',
                executionId: 'bab4872b-d33f-4ebf-8e26-e24112fdb459',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 19:24:49',
                executionMonitoringStartAt: '2020-07-17 08:41:31',
                executionMonitoringEndAt: '2020-07-17 08:03:38',
                status: 'UNKNOWN',
                channelId: '65a58e8f-a01c-4206-bd23-33c36604ea63',
                channelParty: '54tdzryffr9vtgnt981pkjnt6hbjndeprggt5ctvi6vgrvschh7c6bepegkb5qoai41ra9y5gstxfhgpigkq52m3ou7qyh1t4wihefsb34umk29cipsps2ld0vylgez9c1z5hfmb3zw4huu9zyr5qgqvq1jtn9eu',
                channelComponent: '65mlya8l1py1485d7co95heq0ezoh5x6uesh3zael5deibbqis17c4o1x6b8f93g8cqwqww80xdxgt9cgzb0nhzkzdp1a409shai6340ere2jsted148yqela0fos6vdgwekpv548g5n577i47hsfg5g6uspbusa',
                channelName: 'hf5mtfo3mjy5v6dpvwrjf3o1kmoqf1aecm09273ntiijmc3deh0gnifi5viruoac2oh6t7ht4s6k6plzb5b4ds02ebwzvwyvl7tli4yohmxnmffrcza3gdh0610i11z0vx23gdxb1gadbyzvqqdbder9g20xizni',
                detail: 'Sunt rerum laboriosam quia ullam expedita soluta. Est quo eligendi nulla sapiente dolore voluptates recusandae sed. Velit veniam maiores quo qui tempore veniam numquam accusamus error. Eaque sunt molestiae.',
                example: '9uj5xgdu6oqd5w4k701lkdiqt3jwrsapn1zj4bsw4g5m3e7qob86upn0bn3h87bl0go5nytx4vgc3m0gr9s9qfdzll0ej1ajezaddeoov8gdndqgthu0i2hj7gwlujteq90705gmykcht4qkc95nx6rfqux5sg2q',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8955fb29-e3b9-48f1-aed1-e0609284bee0',
                tenantId: '08ea6898-c808-46e0-b5aa-6587eb458e0d',
                
                systemName: 'dvp8ws6adxn22csvki1t',
                executionId: 'bab4872b-d33f-4ebf-8e26-e24112fdb459',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 06:32:13',
                executionMonitoringStartAt: '2020-07-16 17:26:31',
                executionMonitoringEndAt: '2020-07-17 07:58:04',
                status: 'ERROR',
                channelId: '65a58e8f-a01c-4206-bd23-33c36604ea63',
                channelParty: 'zlq53g53d6la36h4hybkobj1cu9lsje4p0we0tnf7zrt764mih4rr8v0ohdl8shlm3x00k7qkptc8aa3s18niieepu21y52ef9zogzrcktufvtzrehnk29cwe6xqy81gd5r9cbnp3lrkijyj8awddo0tqhobd51j',
                channelComponent: '0suiy53qdeiw11riuszw7e4xuti3x77klbqrrrc2akepnn555an260afsx2moc4nk7uczkccuznbyx08r0grj6q2yxr1kixbhjlgrbepofl0cgxsld9mjc2uxzug452ue92u2y725fznv41u0om86zepfgxggxia',
                channelName: '1w6sriflbigj6c5fpzed4ptpfafmblhtbhch1my421xd3pg8o4jeo194g73t9fqccne1js6d4xe3zvvev87ble0wuz2d93d0rtvwu5i6rm5t1ou9gabqwk9424rnbe5wobyz36cz3epgu1gi6b3ndbayqtsj1vwf',
                detail: 'Omnis totam odit ut nihil. Autem laborum doloremque laudantium necessitatibus quia eligendi. Voluptas sed explicabo. Explicabo quis sed aperiam perferendis praesentium voluptatibus et id. Maxime natus vero at quis non.',
                example: '8xs9nnj4v2q81mxmdkb0wxvk59h19p3wjoq6tcu6k1fhuv00mb75t1bgddr9g2bt6dic09g33l6yqwfswbcb9p2skykgjvc5uq0y6rmj6wmrse5zo8t31gxi50swbr00s3f0sk4jqiwz54tcdr7c59m2u00tolnf',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8955fb29-e3b9-48f1-aed1-e0609284bee0',
                tenantId: '08ea6898-c808-46e0-b5aa-6587eb458e0d',
                systemId: '1872191d-3649-49d6-9bfe-4f871cb90c87',
                systemName: null,
                executionId: 'bab4872b-d33f-4ebf-8e26-e24112fdb459',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 22:15:47',
                executionMonitoringStartAt: '2020-07-17 04:57:14',
                executionMonitoringEndAt: '2020-07-16 20:20:04',
                status: 'SUCCESSFUL',
                channelId: '65a58e8f-a01c-4206-bd23-33c36604ea63',
                channelParty: 'qztuwlfzc47s0djztnvne3qmzk3aqhhco6od2bepa1q451rd73y6xkucy9zn61wbiblyzfu0pjeq3pbh8exshppuy7cbl0ew49zw4hpp2hy1j1lzlc1obagq3nfzgqd1guby2wkf0vh4zf4ur1lrn4prwac53lgj',
                channelComponent: 'hyukscn53un1lqmcdaqb6wustxkzyvtdyn53et9ddoo5faz1ymmt9gultic9yi94m5koa84yr20x4v4yfbubt9zg1iz5qag73efd9ylrkpbm7g046rcfimvot7gsm6nqnrss7tda9tlo33u2qyhle05oseprgd1u',
                channelName: 'scu77bnd0jmc63pot61kastrm28nwydz5oi29gtc8ipc6p3q4bk3nqkj59ztfotsbriqt8cneh7ohx9ywfryrgyeojb7bkpluit1u88n04ac61f9y1x8y8v237uk6j4o3mr2cgv2vq3dd3k42qry95lizbok2jq9',
                detail: 'Sequi maxime nihil dicta. Qui at nam laudantium quia minus cumque. Distinctio repellat vel minus ipsam excepturi.',
                example: '1aboet9qep8la40td8nwa0aa4no4s3aprrpv1b1ll2kllqis3rwl1glknpcjiv2gaphb6fj5apxm2t9hdk77wwm2vcebbu2pxo7kee3amoxhni65k0qgqz4uowyhs9u3ju5pngunkaf3ft3z7y749qhlecrwp9py',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8955fb29-e3b9-48f1-aed1-e0609284bee0',
                tenantId: '08ea6898-c808-46e0-b5aa-6587eb458e0d',
                systemId: '1872191d-3649-49d6-9bfe-4f871cb90c87',
                
                executionId: 'bab4872b-d33f-4ebf-8e26-e24112fdb459',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 23:55:24',
                executionMonitoringStartAt: '2020-07-16 18:48:31',
                executionMonitoringEndAt: '2020-07-17 15:19:17',
                status: 'INACTIVE',
                channelId: '65a58e8f-a01c-4206-bd23-33c36604ea63',
                channelParty: 'gh12xjuo2eifupb1zfmzszk63x26efuhseynrrahriuzas6fhnjcj4nc0msrpenaha0ul0rgj6q0m33av2h7vjrq03ji5mk4hqoyyf0s58b5c770k2h349dycw8ok6vsjb2d4mblxum6q1bzhxehird1hoquwjsm',
                channelComponent: 'fbu5qtrv2ura59os072dm9r5pml170zvl3n18uygctl30fy6rwmi47vqc8r62y4k5hgygw317xekl3vzv6txpre41r40e9chn8h3agyaawtomg2crb3n89ks1zv16on1af5pf2xm63hzwsq6j9rz1bdf48g1zm3u',
                channelName: 'wu6z8wg8y4poh7k4d0l8d8r09h1k43agyy61p3xde191qfky9p91nfaztl9tf034uef64kzq30kqs0p4ueuzszsiwv9vqx61q0otbj9jilah4y3sjhstd3xlkyapx1m2hhv0tike798bfabtyzgg3psdfygk6lsl',
                detail: 'Tenetur dolor accusamus quo cupiditate facere modi asperiores. Eius sed voluptatibus aspernatur reprehenderit quo nemo quia illum fuga. Eum perferendis voluptates libero animi aut sed ut quia incidunt. Animi sunt sit perferendis laboriosam voluptates ullam aperiam. Reprehenderit quod et.',
                example: 'euls5kdf8lgg4057heh0de50rdrq22fo7zwpkdaxkuu5t9zasebd0v641f6egu1d9mxs8aya92lp0py3h05a73cofl01mkgsny9u8ldn24di8pm85a7krahaf6w8ua46zoz2nrk11ert12vj06h1x1t4b9fuqdgj',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8955fb29-e3b9-48f1-aed1-e0609284bee0',
                tenantId: '08ea6898-c808-46e0-b5aa-6587eb458e0d',
                systemId: '1872191d-3649-49d6-9bfe-4f871cb90c87',
                systemName: '3c1sbmt00pvub0oa226o',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 08:51:31',
                executionMonitoringStartAt: '2020-07-17 05:30:29',
                executionMonitoringEndAt: '2020-07-16 22:21:35',
                status: 'STOPPED',
                channelId: '65a58e8f-a01c-4206-bd23-33c36604ea63',
                channelParty: 'rc5gqmvtztwtiigmbv4k7q451s4m6q3ivgwynh4f1acx5im025lv4v1lw3q7zs99ygtd6ni00ekk2xcksgr85d0qfcods9hli8duv3a1s63y8tl1luuc174tlqqy2eiw9pyofyd8tr6rbzvyzd9h61d4vxjqy7if',
                channelComponent: 'oca6qm6fp06e4zsk2mnv995engg9gkzjh06560cvx8f9clv2hik2i8xwajb15mztr4s60xqff2ur6arosbv72d8ti8g6dij24z0ji7oxtj7fw0xtp9az949uejsvqwk7bd1imnjdnt6gobvbr1fvmd6hs6w27o34',
                channelName: 'goquup0afbykvx6jy1xpkimjlchblw6nyykmlxmbzniycx5a7rymprq4kk2e7i848ovxehyyuyjsbhf61k2tywsnyo03f2kp7tncg5h91l2l54h0mgvena3105hmsyf9mv904dvdfwkcu8x4g6nd4j560iidjff7',
                detail: 'Repellat voluptatum omnis quia sed voluptatibus possimus quibusdam. Adipisci eius animi aspernatur accusantium adipisci accusamus. Ipsum animi quo ipsam vero. Recusandae vel blanditiis officia. Expedita veniam rerum est dolorem odio consequatur sit. Dolores nostrum nihil laboriosam.',
                example: 'z6oan3vfpyw42qgjdrvanloiflnrup7y8sqat2jmg378enjuejd9wslor7s2bvuebf5dadjqotvzexd7gnrvjjwuctos3yvcowlkez59tbrmbnksxrhj3hyrnpriom1974wzm67v4kxmlwxpxwwt1iifev80j61l',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8955fb29-e3b9-48f1-aed1-e0609284bee0',
                tenantId: '08ea6898-c808-46e0-b5aa-6587eb458e0d',
                systemId: '1872191d-3649-49d6-9bfe-4f871cb90c87',
                systemName: 'j6wbe6azdmhj9oybt7eq',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 06:59:07',
                executionMonitoringStartAt: '2020-07-17 04:49:36',
                executionMonitoringEndAt: '2020-07-16 21:31:17',
                status: 'UNREGISTERED',
                channelId: '65a58e8f-a01c-4206-bd23-33c36604ea63',
                channelParty: '9nzttsrzluiaq2gmhm88181amzjha1bhzc2k3j3y1xeuszhccz2el555bjx3x1nbnp0o40055xenrfqgaifauzqux4d4fabocyfxrfkgucykbroqi8my2lwg651thce5j521rl6bbs8806hqdkzeswdnzzxc0z92',
                channelComponent: 'vobywgohpsomzxn99bp7sokq0o6iijt6wh837xhyxp7827boc4bzca3uzqzhi5uvoa6zkxg8jb1ka48b7kzg2asahl2eb9ilfhb9l0pw4thpd1wru7kxek1zo7dc75ilvs5fr8vsmdl6bcf61k8y27fwx8u1pns7',
                channelName: 'u7g2r15r0rltr7079qjosggktat3qsuer3wr2yqo5382cx0c8x466h8i9is61ueoaefvn17lital80pz4btahfitsfk1hxuzi79ygqu5kxq91f50a7vl2abuscivvnhnb9zoz1h9ocpbkjmh9zkqv6lckya4gmea',
                detail: 'Qui vel doloremque necessitatibus eveniet aut culpa. Quos eveniet id. Sit voluptatem nihil temporibus est officiis minima sunt placeat qui. Et molestias optio sequi laborum eos exercitationem qui ipsum. Aspernatur et culpa dolorem dolore perferendis et ipsam.',
                example: 'pjsa55ghx94szz3o82h0i64306efe2hhb62sdcxe8lelzgwc7ssb2bzy2nh86ali4fxi8bxt05eaohfkgcosxy3un3f5zbdegsqy0nmwgzqbg9gsoz6jz4ojp853uhri6nfbh7eefwy91y23r4rbf3tusqn14wqo',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8955fb29-e3b9-48f1-aed1-e0609284bee0',
                tenantId: '08ea6898-c808-46e0-b5aa-6587eb458e0d',
                systemId: '1872191d-3649-49d6-9bfe-4f871cb90c87',
                systemName: 'y6tri1gnhld87gi9swyi',
                executionId: 'bab4872b-d33f-4ebf-8e26-e24112fdb459',
                executionType: null,
                executionExecutedAt: '2020-07-17 07:35:06',
                executionMonitoringStartAt: '2020-07-17 02:23:43',
                executionMonitoringEndAt: '2020-07-17 02:07:09',
                status: 'STOPPED',
                channelId: '65a58e8f-a01c-4206-bd23-33c36604ea63',
                channelParty: 'cargyih0nujwipw109vowpk7bdu3wl4r4omywj2dwyth7pgvavsbbua6puez0evakxuvinqbv8injw1ol10c6onez142ahlnmyr93ivqpgcjqe5ds61vsrdk5dr0y2iiml9o4iaztvozztduklgkfniycdjv3ob5',
                channelComponent: 'ywc2ld2ogiw4mtogdl0oks5zqj83kwlhix7hdpmtqagm543sktzag2302u6fr21kysrwa95x4zdbkhyop57v43pzlfrig6pzsp3g53i1qs0q4d5w0n8hyc8wj2sflarrp1vo1jo3emh9emn5ox5wki98zb9l2hgg',
                channelName: '4e68m6gywe5px0hvdb7t52sv06zwbhgowsexvr7dxaxpr3t9aw80smb8bx7p339epbn0m3sl8kl7u5195rjh5b53rj1xxan17zc1vldlhpaxsusks1xxdmxn1cqh1vfpuizppv28vp5ddfo8rhwuagie240u1rsi',
                detail: 'Facere repellendus nihil est totam consequatur et est est labore. Itaque et nihil et. Vitae corporis occaecati ullam laboriosam. Unde dolorem magni et et magni blanditiis earum est. Aut dolores ut placeat eum.',
                example: 'dy9e8d0xoxvb56zly2bpyv4a3vhnv21rrixh32m9qsopzvaguj5qaz23cdkyk2knndk0610vstujudzqxffofhwb3q5zcm2hzr09v394tmr107w5vtg4hvkx4ly26t5gkpww5015r36dmhe62w3dohlitcoxasa2',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionType must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8955fb29-e3b9-48f1-aed1-e0609284bee0',
                tenantId: '08ea6898-c808-46e0-b5aa-6587eb458e0d',
                systemId: '1872191d-3649-49d6-9bfe-4f871cb90c87',
                systemName: 'l4b8oj3s1u70lof8rzfa',
                executionId: 'bab4872b-d33f-4ebf-8e26-e24112fdb459',
                
                executionExecutedAt: '2020-07-16 16:34:34',
                executionMonitoringStartAt: '2020-07-17 14:23:12',
                executionMonitoringEndAt: '2020-07-17 08:52:03',
                status: 'UNKNOWN',
                channelId: '65a58e8f-a01c-4206-bd23-33c36604ea63',
                channelParty: 'y8g2x85eax6zc5lut5iybt0n3jxrmdmxs34ycdnlgnrtxexyro0e10quh0uybkw5m7hwvgk3h5p3nrj23kp8fxp98w2uvy6gwwx96ktqayb3lsbbu3i8r55iryojp1lvszcffrysuld9hfv7wnxjqwvmnfp9w30i',
                channelComponent: 'hr3qq6vma5sve34eszpyc7bcxcey3rtvn1pz26vsowxmtwtfz32pmwv7v4t9byaish3ulkik4f4g18mno317ivsjezkmjtqhszg17xg66trn6oftg1tfzaho003jzo5mrwkux1omxc08nmhbheqki2owjlqbd8sc',
                channelName: 'ajgr03oc9s3objojn1j8g6rr12au0sp9sg0zxkaxk528oy88ryc670bg3kifnisf8gmd2imd7iy3kgcrsujpm87ovabf46niimqj11y9sdbq6z6iaco0hgvv61idzw7sbu8h95qwft5p7i72yq3biaog6qvihj91',
                detail: 'Est quo molestiae aut hic. Delectus doloribus ut praesentium repellat nobis. Voluptas aut eveniet tenetur cum. Autem beatae hic quisquam harum itaque expedita. Est aut quo rerum sunt dolorem.',
                example: '7y7ngq72nnc0t3jbxhe1u8ib3b0552humb73qtfncaxn7z0v9h13gvschk857sarzd8tcxxcg3furifc0yis4z1ult0aaw8fdxsak6tngjxuffpondulhegqddrj57s81tpr3vig23be9e3bt7qm3x9pes88dybz',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionType must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8955fb29-e3b9-48f1-aed1-e0609284bee0',
                tenantId: '08ea6898-c808-46e0-b5aa-6587eb458e0d',
                systemId: '1872191d-3649-49d6-9bfe-4f871cb90c87',
                systemName: 'tvhlw0g3k2okluvanyfd',
                executionId: 'bab4872b-d33f-4ebf-8e26-e24112fdb459',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-17 16:26:53',
                executionMonitoringEndAt: '2020-07-17 07:27:06',
                status: 'ERROR',
                channelId: '65a58e8f-a01c-4206-bd23-33c36604ea63',
                channelParty: 'u9s4h3g9xgrxo4iriupqrp6ufrh61i9dyxb64vc95vkav4keyrknm4le3emwcpp9zm1hb5eggpyla5uxq478gvix86u82blus39tlfim647q0tiqosteboq2l1yslyhudlmi01d21ksthogcyy8yoxe6zodm3giu',
                channelComponent: 'wd8e91pq8c20pjjgv2favzem2t90vbejnvqmkwycdpoulq1etgtu47vb1poemq7g2znw29mr2npjz8f4yxwt0psuvfl2q6fed12u0cckt28c3phgzegwwqrfyazwbjnfpzfb98fcgg6wsszssipy247ihljh2ngx',
                channelName: '07l1ul26rl1zaj0xy9l38cl4e70vg1ls56dqk34jsftl8axo6ol28bfnxrg8ydahz5rx0xt0yn3rrej4z69bnox2wy211nvd230lv8ruin5dkn0eqs3ddc1lu5j8bajvws3jfic4rnbwcg2jfvriv905q8be3l9m',
                detail: 'Non minima earum quidem ut quisquam blanditiis laborum enim quia. Amet blanditiis accusantium laboriosam voluptatem occaecati modi saepe dolore quia. Eveniet quis et laboriosam recusandae reprehenderit. Qui eius impedit vitae numquam non rerum dolor. Reprehenderit at excepturi porro sed rerum magnam sed. Autem culpa in voluptatem qui veritatis nihil et qui qui.',
                example: 'd6iyqyv7zby56rpqbskcp6a3i66fkmz2jlxzyffqm3ikia8qopbeo9kn3pu9qr061xnzhuz9xenie0qbksa8gao549e2ltkhyi1anettj74gciwg56i77h0wqdiueatxusroeodaj4puihgiqz9vvyu8j3tpvu53',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionExecutedAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8955fb29-e3b9-48f1-aed1-e0609284bee0',
                tenantId: '08ea6898-c808-46e0-b5aa-6587eb458e0d',
                systemId: '1872191d-3649-49d6-9bfe-4f871cb90c87',
                systemName: 'tczqgd7k690co6ugbw4l',
                executionId: 'bab4872b-d33f-4ebf-8e26-e24112fdb459',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-17 01:43:29',
                executionMonitoringEndAt: '2020-07-17 10:32:53',
                status: 'SUCCESSFUL',
                channelId: '65a58e8f-a01c-4206-bd23-33c36604ea63',
                channelParty: 'n34qsefm26axhx4mrbdzhjnc2vrv590dru6loam19a0vt7cbku606teqrcdr9eb3na1cdciz56lv82bhat1eie3jy5s8ydbut74c23fyl1kwtqp9txcxnsxqia949ku7z5mz2p2j6u5haheuots4tcdltwrbz7p6',
                channelComponent: 'v0nqzwueddi34aqcy8gd9bfns0utgzo3o01upwvxji522ni5mnfk665wu5irjnlcg4tcfnijapvhqfp97nxabsv9kfewy1pmu27tzd9yqkonf8a8pv1jgkfrvdj756x4zi0y4swnydnxyyrpuomyayy7pfv8kp9d',
                channelName: 'wu3ncj8sv97fshxmervrny4mm6gq971idm1ac7a709cyicmpta8r6zg1d43pps26asdmahbsmvd6jsy1xr1o8gbgnww032ncxebqg6ajz5e57imldt9d5k4iiglqgnf81513oqgga9az8bajpbmbv3wr2rifhtsu',
                detail: 'Non autem amet earum consequuntur dolor aut laboriosam nostrum beatae. Ipsa et laboriosam sed repudiandae numquam veritatis perferendis. Quia labore quaerat in quas quasi. Tempore ut omnis. Aut reiciendis placeat qui molestiae. In nostrum in commodi sint.',
                example: '8jb0mv0m9gyine34laoyq8dwa7z36r3c4gfkbsldi10xt8qp10aoo4ahmfcelhiibn7cnmr9m47plymav3iga11fi0z2rpzq51dbcfqqkfp7axwja34p7oefv37hz7x4p5t9jpnt92bqfklu1a9l4mpkr0v2iihp',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8955fb29-e3b9-48f1-aed1-e0609284bee0',
                tenantId: '08ea6898-c808-46e0-b5aa-6587eb458e0d',
                systemId: '1872191d-3649-49d6-9bfe-4f871cb90c87',
                systemName: '7j3bjw9hb4tlqrbltirc',
                executionId: 'bab4872b-d33f-4ebf-8e26-e24112fdb459',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 13:03:24',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-16 16:51:35',
                status: 'STOPPED',
                channelId: '65a58e8f-a01c-4206-bd23-33c36604ea63',
                channelParty: 'xxtvxrnk1eu4ma9sancqiersowe205pi0i5eg4dqechgy4uxuz83jcoqjh7wf5sbcvnhbvinrdtrlce16xjs0p1w3vbertvok7zotfwtos9tn61om0808lzg2ng1vznpvydld2rm73aej3kuxgblo3vo9ujektje',
                channelComponent: 'pcr1kl312h6x2emucae2zqnp87rlrk8w71se2ctibq5y7mv9ow0g5sdfttc4tgo5v0j00ogelwn05l7nctavu4lbjqypr92xgrqle3xfxg614vd45ankcr3us49epo80cfv81ayryj48kcydrm7tlwhtedyw8h0j',
                channelName: 'hfzvfjjpt33rb9vn2nd5rt41zspic5acyz3qdl6l9w4zox4yimij3marcpwivavk9hm3qpas11w4eo9dwqcl1yfd9kuy3zeka9qexwidl5vb94jw69i3ret06ub7xyj9n63lgex4h214r2fe4riwnge2cvdk7epw',
                detail: 'Vitae odio adipisci enim. Aut tenetur saepe officiis. Omnis delectus nulla explicabo et.',
                example: 'db18rv0rs61p868zoxv99tkyq5blq0k2mwqyenqvqxnouajuhv5tbtsg4rbkitg0jf2nksyk6g3xr6vrrj4bfnu6t59v28hwozd0j83q5lxl5txxjtaqrgkwyed1w4s40we1kgrxj9v8gmk059yx1lffwmxyofmw',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8955fb29-e3b9-48f1-aed1-e0609284bee0',
                tenantId: '08ea6898-c808-46e0-b5aa-6587eb458e0d',
                systemId: '1872191d-3649-49d6-9bfe-4f871cb90c87',
                systemName: 'u539baystomyzoy0k5hu',
                executionId: 'bab4872b-d33f-4ebf-8e26-e24112fdb459',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 17:05:34',
                
                executionMonitoringEndAt: '2020-07-17 13:43:58',
                status: 'STOPPED',
                channelId: '65a58e8f-a01c-4206-bd23-33c36604ea63',
                channelParty: '49txlle5l3ombs8z7mlvk7nnuirpg43fceofa4vw2enq3c5jbfm46mng28aje7u1yeov8d4zgehtc3vnj12gk77110036nrv1crgx1r0mjc82886td13tn9flytrp9lyic3cnhc4pnaojodijgdt123mswuk6nlv',
                channelComponent: 'eaa4cvvcw08i7lp3c8lqh5xai4hg144wvthtm85npd2lx69ncyudyilqhgwa7o52fq21ij0l2ubnr6hnq8ih7zhzxz7vkfnrfrhg1tfqbhsdd33l6uqz9s9grl4htmydcsjw57mlrhru9r6sc228nui45pyq97l1',
                channelName: '5b3u8ngs9q4gyhgk7wh1dbi0zpnrz7ftgfpbhja41rkc8zmk99voidl06poch94m1b6fcffcw9vhqy2qaqa1w1uvzuzv87cf6g4ul7lqrufkhelc92nvqacigckk4v4khiz5qazxfth6poc1t56wyoakmym1pn1p',
                detail: 'Dicta soluta et saepe. Incidunt molestias et sequi. Minus praesentium ea. Nihil ut eligendi eum omnis ipsam. Esse ut officiis doloribus et eius minus non.',
                example: 'l7qhwh05je3k0dpmnaqw97f0fzmg31lexi5kl9nlko574qa1krcptfd4q3ny5o5cm13d39u9rlgl5lfjc1mlltv5pht6t9jf6jsp8r6sqn6fkrzpky73rx4elgxkua6drd7wjs6bfoljc1o4zynllu4d3qf3ngsr',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8955fb29-e3b9-48f1-aed1-e0609284bee0',
                tenantId: '08ea6898-c808-46e0-b5aa-6587eb458e0d',
                systemId: '1872191d-3649-49d6-9bfe-4f871cb90c87',
                systemName: 'iwk580bnamvmodef3670',
                executionId: 'bab4872b-d33f-4ebf-8e26-e24112fdb459',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 17:57:23',
                executionMonitoringStartAt: '2020-07-17 00:55:52',
                executionMonitoringEndAt: null,
                status: 'ERROR',
                channelId: '65a58e8f-a01c-4206-bd23-33c36604ea63',
                channelParty: '7cmdkeipyed5eycovsvxny3alil29de0d60ydjo44hxq28j0vx5c6shwh37lmgwg4bdxommte1gmy8cvoa8dfcni7j32nvvf4kuv4581cjo03c4gn5nwos0uf9wa0w7r1tk3m9kvnojnzs4g6yt9rwhv2uek543f',
                channelComponent: 'x30xmw0cxd3b0u7iudh7jodlu0n8aodhvmyqdtobcjq6a5o81xmg6qyxhdv8qk920wbwdfxg8oek8f18n00hnitz2gbj4u3ceiyk7qhwut9hgszudgvqbo45cwq1e79e33ts8obh80x9iruigp3ayk9evmo64vpp',
                channelName: 'g0bw7xpm5u8tozbhhwavhs3ofki1h656gmhipfe1r3xbt6uympifcmzg75jk3mgiwgwealzn5ggb4m7rnw1l3ucunne2p1g12qyx874zrkic20ci44p0duluw0khvscz9dt0kgcvt2qakos2p807katn4g8ilwpf',
                detail: 'Vitae consequuntur quis. Quo laboriosam rerum porro officiis. Eius recusandae et ea tempora.',
                example: 'msns11kz1qyyyfum3vjud4krr3x848ajenzlfvng93zlx01buzhzhakfurv9tdwijm0h8ud2j3t7hjqs4kc5dxv7c1zv5zu0be6bg9w3ik3u1noxzj624ywz6sm9qohupoldse26h97ko4oy7l3cyy6hk3mbqoba',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8955fb29-e3b9-48f1-aed1-e0609284bee0',
                tenantId: '08ea6898-c808-46e0-b5aa-6587eb458e0d',
                systemId: '1872191d-3649-49d6-9bfe-4f871cb90c87',
                systemName: 'wdxdxqwdjp05tcz9ho7f',
                executionId: 'bab4872b-d33f-4ebf-8e26-e24112fdb459',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 14:49:29',
                executionMonitoringStartAt: '2020-07-16 20:29:25',
                
                status: 'SUCCESSFUL',
                channelId: '65a58e8f-a01c-4206-bd23-33c36604ea63',
                channelParty: 'hqb5rxuty2ug7tmiznwy1p8co2iurfw4qcrqe4okfg51dh970iq3qebed5l9vpmptd502ui0aky5f4qojoxf0ihedh718gnpzd88c1myvvrkvwpn23kropefvbzlplgxvwtkvyvfpcv7rgznglfyym1sfiv6vmeh',
                channelComponent: '9mxpcscx9cdigopus22y8mdmn8g8wa175lk9ze4halfdc3xjwwif1gouq4k4z4uklvpmbbu4mtzrhll8wfu0xzv2esa3ptprzry1ok97su9f5u1qg6eikw0dqm8oe3mi0lmt7j1zaf82r9u9u0xvgfvuk5fyac0q',
                channelName: 'zn7n0c31zyuc4nzn943hrk2tu0ujf7d9q8jci4vnsfzg6tcq3yk2vm7q7udtozvcq37z87wv7dir16rvhqxhlw3jtch0n7u4c8a23qh57orj8u9awe5vem1jfeiyu9qxmbbrwgj83smybe9idprrmr14lbhhsolv',
                detail: 'Id iusto recusandae vitae autem similique iure. Nulla voluptatem soluta dolor. Quo et non quasi. Ut sint aut sequi culpa.',
                example: '8gx8gynd8u2j431g4qcy5mp0q2rleh80luojak2h8sft7p8pwbtm4dknlim5u95tqvdfhwjybi91urycu6klc7s5idh2fl3bn0qk5xo79r7fx02tirykrr01cdb05euvq81e84mfp6x7xnwwimyi5r7vvzno1m3t',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailStatus property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8955fb29-e3b9-48f1-aed1-e0609284bee0',
                tenantId: '08ea6898-c808-46e0-b5aa-6587eb458e0d',
                systemId: '1872191d-3649-49d6-9bfe-4f871cb90c87',
                systemName: 'nx6h8uqoakrworria0f1',
                executionId: 'bab4872b-d33f-4ebf-8e26-e24112fdb459',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 00:02:22',
                executionMonitoringStartAt: '2020-07-17 05:51:04',
                executionMonitoringEndAt: '2020-07-16 21:06:59',
                status: null,
                channelId: '65a58e8f-a01c-4206-bd23-33c36604ea63',
                channelParty: 'eqsb51zkbtozsz1fe754yqe3kbk43my9e5n2jq0732lkhq5sy4sbajmh83s3b6mh454svwkw76uwifh36r1tw3g6p4h383arytl3nr1t7q6s7tjhhqoa5jcyk9fcqokbh5kubmxvsrvuyb9csmh84rchtkz2pufg',
                channelComponent: 'fd0yvtoimxafd10wtpafijaa68rsr8ptrrmejjrr91iyaaqiwgixx50a320cmpv1jx79h7vr5kboq1dmmuu1aekgyuok63ja3ai14jwmj7k16lgr11jxiq2ekdgwkn7grw3e4r2ajm7810106wks7huiuacbk64j',
                channelName: '6mzty7uzwdz9fr4ce0b9mji1xhszn7dti70fuzi0vji4txlbezeqzg4zjwbtdjkkyby7e7v7fwpw290ohnpvjl18waf6rlconaye3yphs391escuwf0swvt17s3dshiogql757e58mj3dhtduxbvx50awe5147us',
                detail: 'Rerum accusamus quis. Non incidunt qui. Ullam unde ipsum. Laudantium quia magnam impedit ut sapiente. Voluptas tempore eum nam ut. Sit iste eum quis cumque quia aut qui reprehenderit repellendus.',
                example: '6t5blr8zs7c44ehfiwoc8lztmz216po8it7eummbmjftqzojs4ioqg82v6g2j4obyx553ify9t5do867krfhpzhgfwwi7fdadco40wwo2byjhst7nib4p025dlg3ilwx5elgxw4o4vzv2v52n88r25k5yh552l3h',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailStatus must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailStatus property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8955fb29-e3b9-48f1-aed1-e0609284bee0',
                tenantId: '08ea6898-c808-46e0-b5aa-6587eb458e0d',
                systemId: '1872191d-3649-49d6-9bfe-4f871cb90c87',
                systemName: '9esowzzyfi5ogqwybykq',
                executionId: 'bab4872b-d33f-4ebf-8e26-e24112fdb459',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 20:32:53',
                executionMonitoringStartAt: '2020-07-17 06:56:48',
                executionMonitoringEndAt: '2020-07-17 07:57:29',
                
                channelId: '65a58e8f-a01c-4206-bd23-33c36604ea63',
                channelParty: 'mj8o885ffpj5eid6ilvalvu0kzogz57p2dt8jzunxl3ej54pslp1acsj38wxwqjtnl4hzz6g496pb6d79ax4v939vzapkw1y68kv6tq0iu3xco31et0ptdb9m9x6gljn6m01ytf9ryi899ob5ksaeekxputtykml',
                channelComponent: 'mw3bdk801kxdkkykvhe1sgtgmkqhitg8l9d2v1raytmu805jbgqv7vmo4rxzz5xwl03jqu5x32ir5rm1aydc4xwdbmblk3w2l9ytxa4n8wsj3h4rlboqmgjx9qm0fuu3dv2gcd1ir26vo4p7abrpq7dleawb9n2x',
                channelName: 'vhsosf7c3f45rsk8h3mpwhgozbmwiebf24dfd11dynbw6zs9u3a8288o7f6upohsh933hjb2ibk2k6ew6zwx88m3ogcipbmue8sfx24nnkceivlqzhmo4kpi4328ydbrxiyg9civ00rwoe3vjgfbtjvjztjcfzej',
                detail: 'Laudantium possimus quos eius voluptatem. Qui esse explicabo numquam doloribus et molestiae eos est. Qui voluptas enim quam eius similique. Error at rerum quibusdam eos cumque soluta quis voluptatem. Eaque voluptas modi a quisquam et. Velit culpa facilis nam fugit sint sit incidunt quia omnis.',
                example: 'gj5fvicd5mz0pf0wyw59shl4dnfqb8qqgxiklni00rx4l46t20767t749284oc20hdoowe1863e03scweh24rsw71lko1us5nwnavb7vu2edbkdeu26fm1s9diuz8lxp3h05gmj4xbfgi1p7fhw88yxjcs9r9jwl',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailStatus must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8955fb29-e3b9-48f1-aed1-e0609284bee0',
                tenantId: '08ea6898-c808-46e0-b5aa-6587eb458e0d',
                systemId: '1872191d-3649-49d6-9bfe-4f871cb90c87',
                systemName: 'k9pfkw9dmo2bjymo5ylo',
                executionId: 'bab4872b-d33f-4ebf-8e26-e24112fdb459',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 23:02:15',
                executionMonitoringStartAt: '2020-07-17 01:35:54',
                executionMonitoringEndAt: '2020-07-16 21:07:54',
                status: 'ERROR',
                channelId: null,
                channelParty: 'pwdmg4lcpjbr4sdmh9v96nal8qjk6npybfdw2jdndhsvix9fv2w4qha77j2wryjt1nuxajww5pd581tpfpekkgnyoq6sjpah9671gpqyi4keqclpm0jpkego8mpa5dkqe8zwvxxh5ekxdx98t7jjwxws7ymtnmgx',
                channelComponent: 'pluu44zta7dq7l55e7ljjcjk4hbzg7moas0z92l0uuqvhm6vfsonb90s1avp2ab5vvm841b8onzyh3cmdu460nrbjxmm4a2ustp90avcts1pqnqr18hzvgdbx4zretcp868kq07g0yycrpaedn1j8q2zehdk999z',
                channelName: 'opbuw1xa6xuk0iqmatslk9sej1woh8pomppt1e9sfm3eg0lvnjfzp3y1jf5kgmsmpf02fcesy8dkdlr1zew0oizr5xx87rou8b4w7i3qt24xjy93h7nn28t60k5en82gf5vafggd00glertq8wjba4k8vzfpm4vn',
                detail: 'Et nihil reiciendis atque quasi est qui. Mollitia dicta optio esse ad deserunt neque eveniet atque laudantium. Perferendis consequuntur molestiae.',
                example: '1t2uc1q5b61swcxefkacsmp9t7mmy778l1e5jq3tvsptb8rkyl65phpfq8xt037g51zgzsrp5y1vd9jckespp9uilu17vrri6kv7ibxpt3ufd0lkkf4hci6wb6m5rln0gtagpe6ea5lg1estn9jpodh0w6ur3dk1',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8955fb29-e3b9-48f1-aed1-e0609284bee0',
                tenantId: '08ea6898-c808-46e0-b5aa-6587eb458e0d',
                systemId: '1872191d-3649-49d6-9bfe-4f871cb90c87',
                systemName: 'm8nomtg2icphz7e1faig',
                executionId: 'bab4872b-d33f-4ebf-8e26-e24112fdb459',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 03:25:35',
                executionMonitoringStartAt: '2020-07-17 11:46:20',
                executionMonitoringEndAt: '2020-07-17 09:16:26',
                status: 'INACTIVE',
                
                channelParty: 'e2v9poivf316fd5pdse1fcycqaoz76iq93ymzogkgqc96kyyocssadglznfur036xm0vbjwx5dzikph38fax1wd96ga4axrofr4fna9uveap0ioxc2pqr2fclhwks47wjvcpxhvnrncc2roquq8u0tw3osz1zovt',
                channelComponent: '3fy5oxrou4epbdp67egxocsfi5bodwvvzh94ov7utmxhz84b66pnjeqjgb8wx4p1a5o8ji22rz70e91k1ltpuo88a3gvbe75loo5o4ydme4jse6q1ltaphd27k0u10hxq00gk8y91yz6qro4smyxb5ort6cypyrs',
                channelName: 'h9at9qwqibwry0fo8ijsdscjedmp0br33tu0h4f48t6f3aujn9gd9g4f7prsfma2q0ixjqym99j9hm45p68q6yd3omdqz0eb0tlen6xtj93aaa8cb2k5mdi9qsk81b7hdl1nya2u16bgvj9dapsvqubnz0ekw7mv',
                detail: 'Quia illo eligendi recusandae quis. Autem sunt temporibus est ex. Sit neque repudiandae ea blanditiis qui.',
                example: 'udka0a9k9io3zfijcju4nmlbmnhzwj5ww94dlykgvwp1k600g3q1p3t7wjhgrzlba0798qk17zp7dm5tglfdomna8yzwdaikl27jgmd48jdhudtkkc27vu41opr2czitvxt26j06xrpua4mtdo3yh5lhdpclx4vd',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8955fb29-e3b9-48f1-aed1-e0609284bee0',
                tenantId: '08ea6898-c808-46e0-b5aa-6587eb458e0d',
                systemId: '1872191d-3649-49d6-9bfe-4f871cb90c87',
                systemName: 'lm1pdelolbfal6w6d7pq',
                executionId: 'bab4872b-d33f-4ebf-8e26-e24112fdb459',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 20:13:29',
                executionMonitoringStartAt: '2020-07-17 04:46:54',
                executionMonitoringEndAt: '2020-07-17 14:52:32',
                status: 'ERROR',
                channelId: '65a58e8f-a01c-4206-bd23-33c36604ea63',
                channelParty: 'szpjslmeddjlkhgsgjha4jwao9ytcvhnoutbqg7pifz95qww0fqu0nqopnxbzyls5m7w83l1u2vcdtela744d3efa998ac50hrvwsvgw684mjks6tuktyjz7jcp31p3zwlkopovsl8w79c4p418krg6szg734ul0',
                channelComponent: null,
                channelName: '8t1uc0sk2tni5czvfqxvopjr9fk77isvro1n77p3p9abxpbgtyeuvhk80xmkupxp85iiyrcpaxjcnmqbopsnqeg3aglvs5xwsnjxrstcxecsz2cl7te2lh7vk20xrrb9t3h13bkt3iyem0jhd8wkm6c3crolbl6m',
                detail: 'Iste dicta velit. Sequi itaque perferendis sunt qui exercitationem rerum rerum. Voluptas vel saepe deleniti odit in. Nesciunt similique quia dolores modi exercitationem molestias suscipit aut.',
                example: 'qrun5ka77cg4znkc9b07sn1wb0g2nqntltna6u45az39dkiuphfa3ukixy466melmqfa61xc7ajgfljixph50heuqym06by83uwyhe5k509skiaw4b8fk6c27nu343ydxfp95tqwhjtqwotba6ujaqbfdcoz3l4i',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelComponent must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8955fb29-e3b9-48f1-aed1-e0609284bee0',
                tenantId: '08ea6898-c808-46e0-b5aa-6587eb458e0d',
                systemId: '1872191d-3649-49d6-9bfe-4f871cb90c87',
                systemName: 'y8fie6xca92n1apdhwcm',
                executionId: 'bab4872b-d33f-4ebf-8e26-e24112fdb459',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 05:11:33',
                executionMonitoringStartAt: '2020-07-17 07:28:21',
                executionMonitoringEndAt: '2020-07-17 13:51:17',
                status: 'ERROR',
                channelId: '65a58e8f-a01c-4206-bd23-33c36604ea63',
                channelParty: 'ifosbdg5o9t2u0day0xx38jpxqu9iv7vv4jf6mvm309f1ilso1aqjgubmipgntx9fwh185vmrio0vfammqvpesp48t07qlavaor85umk8mq0hhd4gt08yyt45jv76n2bs8e28cmc0avj3h8ou8y4azdfbbvsy4w4',
                
                channelName: '3ea92ri6xlo79jsay0dcfo3o2lnzs4zkc7t3f92uidimhkhkjbi57jr9jss753bj30iu5gt7qqnlao6kalw2dtxsl6ou7klpiruh34x7se9srb7fz6ysbj5tbtxli9uatjg7tr7qedo2v0ekb7wbw411sf7azg15',
                detail: 'Sed et odio enim sint soluta est ullam. Laboriosam eaque eligendi quod voluptatibus. In fugit repellendus placeat laborum. Rerum qui ut officia sed. Minima est numquam cupiditate in aliquam sed. Provident dolorem impedit unde nam et nostrum.',
                example: 'wa22xa14bz0aeh9rjoslqh07pz5xd9p5yswu29x99sc4877x8thihszpiy6lw4rk4sz71eclo02lvn9t86pc803vu3ph3i1vutrd7chxwmpf0im0n4cf3530mlxcvrmpni5jqpvwztx4zm1zkga6jr4lvuowgsfs',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelComponent must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8955fb29-e3b9-48f1-aed1-e0609284bee0',
                tenantId: '08ea6898-c808-46e0-b5aa-6587eb458e0d',
                systemId: '1872191d-3649-49d6-9bfe-4f871cb90c87',
                systemName: '2f4ivz0pan44fhycyrmo',
                executionId: 'bab4872b-d33f-4ebf-8e26-e24112fdb459',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 10:21:29',
                executionMonitoringStartAt: '2020-07-17 02:02:38',
                executionMonitoringEndAt: '2020-07-16 21:31:34',
                status: 'INACTIVE',
                channelId: '65a58e8f-a01c-4206-bd23-33c36604ea63',
                channelParty: 'ecsndxay09xl0nfu8x4q88ypee4jnhlsn5a7dp6q8utqbpkywnz5mpvmmcktkfj7bo621thlfe35nj2y4q8pktskjkdnm3s2eqpn1bko7ydrxhc3cavy0nnpkvkfj734m9j85rhdq93vcfzwip8q7os5ce07ou1d',
                channelComponent: 'irdg4kqgig0ez4up010bcb1oqne4o9i9he9rg8ic0oe37kw8f7iuvqadww7cauyn20iq5w2lpuvk1qutu8dgr4zjdahiglpt6ip2ts6uuhok41t7cokuj396z9msgp1e9u9dlajxc0kt6jpym7yo5sbl6eczk3e6',
                channelName: null,
                detail: 'Hic numquam rerum. Odio omnis laboriosam itaque praesentium minima dolorem. Error fugit officia voluptate sapiente repellat.',
                example: 'z84yr68qhq4yzoybhizqebhcxtsphvh9gpa184tpmh2mps5nxh24d3jvfx8a2xdlly8x06ccl0gw3839gse8r8z4i8qvm6ufho2r0mucpwrnhc0szxw8mzsgdbas65jeqc4lvbpsvwdbl84qctiojkmxm95x1g3e',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8955fb29-e3b9-48f1-aed1-e0609284bee0',
                tenantId: '08ea6898-c808-46e0-b5aa-6587eb458e0d',
                systemId: '1872191d-3649-49d6-9bfe-4f871cb90c87',
                systemName: '1hxfo71o7nh5dd2uc992',
                executionId: 'bab4872b-d33f-4ebf-8e26-e24112fdb459',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 19:15:24',
                executionMonitoringStartAt: '2020-07-16 22:18:23',
                executionMonitoringEndAt: '2020-07-16 19:28:25',
                status: 'ERROR',
                channelId: '65a58e8f-a01c-4206-bd23-33c36604ea63',
                channelParty: '7o2btbqk5ck9uaup8gf0vyztuf9nqpwaie2r8gw5jg9zfmak731mtybp9f4k6apjwf2dqi7piyrmj7k824k9lhtxgyzc95hqcfq7f0fvm6gp7zhswh5wqu86zj38d1zaelhlfg7z2bvw4iih9my6wpunicjxthwr',
                channelComponent: '6th5s52cl66wtvdthm0dmu45844z1gi35zk1es3fst1fnlycdx2m1uen1wkuylaw7s2wrnzgynizbgyvb8t1a4bi8t0gyzfr82fi3kaqwqt336423kz742w5woxxr5dow8hspe1fa1hk579lzkghnwz8xbuq01zy',
                
                detail: 'Sunt laudantium rem veniam provident cum quibusdam enim perspiciatis tempore. Quaerat tempora consequuntur tempore reiciendis velit placeat. Nisi quo earum unde dolores eos. Dolore eos doloribus modi. Aliquam nihil incidunt accusantium eligendi ut ex.',
                example: 'kyjktk5fw0vq7b311xxhpi0ply8r68rbs1spd9r3xyuo0cphegkew1of984qvj3s3auoyu9we10c8b7m9opjnaun2n8au3wehltgxbhidnehkjmipv2wf4u6g2v7jr9231zjtxesm18p8wqmtagd7dyuuj0wy0xw',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelName must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'qowf0dvcjgoiqnjxjucxi00rr6xrywqu187s9',
                tenantId: '08ea6898-c808-46e0-b5aa-6587eb458e0d',
                systemId: '1872191d-3649-49d6-9bfe-4f871cb90c87',
                systemName: 'gde8gr5ttwvi188rqyp5',
                executionId: 'bab4872b-d33f-4ebf-8e26-e24112fdb459',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 02:50:34',
                executionMonitoringStartAt: '2020-07-16 21:13:13',
                executionMonitoringEndAt: '2020-07-17 07:06:38',
                status: 'UNKNOWN',
                channelId: '65a58e8f-a01c-4206-bd23-33c36604ea63',
                channelParty: 'buvx3uxq8rfqolmx4041wz3mxqlabf4phe72bsbg1ifqlkonuo99ojvke30pxl5ev5trhp2nua5zv23auxwfa0gf1m7hty36u11kx98oee42g5l3sd587709ek1ss87coeunk6w1o80mv1vrps9gsesp0nmvb371',
                channelComponent: '87nt1m9vh5998k0cohkeoawlpj81ro1ef4pytrv8g2dxh554d4i4nsmb0gpwhd0n5oq89rp9q79qtec1t4vzgst6k3d2o7cip4vr9ss9efl36280mlx1excc9zaus2joxqxzaqemdiblw2ahm8azv0p3e0kco6s0',
                channelName: '6tu2vda88ovwqy71tt3cnuldgtxtnejnezdnz8xknwyppukq1cfpz5d71mh7cvwppt7ad55i14adf2p8j478rytfnf8za2wz8zbef6d4zdt6q949xhirfprivkzdodbkcw156e7fi5towx9vprski2qglsczwak5',
                detail: 'Ipsam eum ex et quis rerum omnis quos sunt. Non itaque voluptas modi harum sit. Dolor fugiat qui tempore quia aperiam. Adipisci quaerat explicabo est expedita quod iusto possimus. Sapiente nam tempore velit sed ipsa non culpa earum. Neque perferendis dolore nihil et ipsam alias.',
                example: '8myrhej6ff2x35o6h7ocijykful21t0lrs17ljxle39mbmqplh4npi45dvly27flwgqzzo1jlxwuuspncbwmqdrw2uu2l0ti3mychfv8wermhcv78rfdrgvv0rbytqd71uy51z2y17mfvt1dmqiq575wmehmbfna',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8955fb29-e3b9-48f1-aed1-e0609284bee0',
                tenantId: 'i9gohqlde121obdiguh4oe42it4d4q3xum8hr',
                systemId: '1872191d-3649-49d6-9bfe-4f871cb90c87',
                systemName: 'jk1qb5qujt01jc7v32rq',
                executionId: 'bab4872b-d33f-4ebf-8e26-e24112fdb459',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 17:41:34',
                executionMonitoringStartAt: '2020-07-17 12:27:56',
                executionMonitoringEndAt: '2020-07-17 15:42:38',
                status: 'UNKNOWN',
                channelId: '65a58e8f-a01c-4206-bd23-33c36604ea63',
                channelParty: 'iccvztnougxoomidb9w40ywzz2djmj74aoi5trtv4aq56ss7apki5aj0y570yo43ekgqw7yxce6kyelrtbyemorlnwdhztlblqmv8okxdmtxa1bj20y4ld6sk6ab9huyj7a4ej80knoa5g5blty0rl9f5n9e09o0',
                channelComponent: 'mehqzl5hb5d0az2rc3ur69c9guua42p3msiu4p1e265adgc4dgsk7q2u6xrw6kloem9p7ztcblrm3jxxcrn4occ42rk17rd9r5p20dkqg423ju743zp25fobz200jhhkvo3cikdbg0bs6w185rtid9t34mj864ps',
                channelName: 'q1f6uw8e2rua6expwkrcqxgrxq6gelt3p4usjdadavmyhds1v5ijv814acosx5x9dfpxhy35p6qaslqjpbet5rem7dsjy5auuqprup2s87kfyptn7e83fqszozke901eost3ha62smxt812b3t0e8c3l6gg9lrsg',
                detail: 'Autem et quae molestias et distinctio. Atque illum ipsum. Et neque rerum eveniet quos totam quo sint nihil.',
                example: '0dnmr54ysbd8jxnbpr8waldpdfqn1v3vulxmgwesb9ijramh8dqbvsbscwugsy0wuvhfo45cihrqt28jx9dspe4v2j5hy1n6m936a9ww3vj1x0a25gkhtkd0sv440z6ahjdn6vmx65154m3ov4alni0odii2gcyn',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8955fb29-e3b9-48f1-aed1-e0609284bee0',
                tenantId: '08ea6898-c808-46e0-b5aa-6587eb458e0d',
                systemId: '5xodp58xz60nyrsn3fihe7eicv3j0k5sub0i1',
                systemName: 'hr6tp7z8nio5dtj64uhj',
                executionId: 'bab4872b-d33f-4ebf-8e26-e24112fdb459',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 00:11:25',
                executionMonitoringStartAt: '2020-07-17 14:37:15',
                executionMonitoringEndAt: '2020-07-17 10:22:47',
                status: 'STOPPED',
                channelId: '65a58e8f-a01c-4206-bd23-33c36604ea63',
                channelParty: 'q0w2mz89jhtnfoxn39d2g4mohg20g8vjotd57e9d1lyl8etskddy9oigpiuqwf0u3jwjzqmx0g7rowkzgqes1uvjfs6wbyl8airexbnifnwlj8ps0p6bi71tutzgegxjljx6snqdwyzdbqmv027zepqferefmdd8',
                channelComponent: 'rmzjiidd2wd754urfgeepj7lgwqj1gt0h4l96z19du3mjqlpzm7kxlxlcra76ym5pyk9b0n8m2cmc02dq1su1y6gj1u3a522aohnvmrq8s5zxu7593xhmsdafa4k8yp48ydct3qjncru4vlzywuyf0xqfhis339b',
                channelName: 'm5n8exev9f9svruj2ucu5w16ub5kwvf9py7qi2yri2r3ivd836qtmtwbe7i6c8eqqg1m75qvsqps6d8xjuingobvz0oj6a05duax3fw7b9pgfxhdvdrck9xt46x5yx0uitvxr1m82u7c5dqcxqitofbvxqryb40q',
                detail: 'Velit quia voluptates deserunt voluptatem quod ullam quam explicabo illo. Ut rerum quam voluptatem. Repellendus doloremque quis expedita omnis harum officia ut repudiandae. Distinctio doloribus sunt voluptates.',
                example: '3p48v94v68a1wjcg9jj75zrv7n422yd0iqwa2juebht5cbxtuitkqxp02a1zfriruf2jlt57p9lnpmey8r5kr8mqyj0vrp9oljii5gkdn0elztyfkoefntpyaienbeoxx7cu2zp5cyiu3h9bwlcix8rhfjfdr69p',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8955fb29-e3b9-48f1-aed1-e0609284bee0',
                tenantId: '08ea6898-c808-46e0-b5aa-6587eb458e0d',
                systemId: '1872191d-3649-49d6-9bfe-4f871cb90c87',
                systemName: '5bof82z07k8x5hr2thu1',
                executionId: 'zfnqet0tluminetxq1eg2k65tnzbtiltlo422',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 09:19:47',
                executionMonitoringStartAt: '2020-07-16 22:28:19',
                executionMonitoringEndAt: '2020-07-17 12:59:15',
                status: 'INACTIVE',
                channelId: '65a58e8f-a01c-4206-bd23-33c36604ea63',
                channelParty: 'l79h75i8vsflj3yusniqlba39g84txmkme4abgtkang0vjlfhqoo0nx08554686k33u9indse16r64txteazz0ku1l87wxgppl4cje7ozi2cltpc9e97s3qhi8ocevp60wp8u3blhx5c7tdikptc1nk1czn3x6jr',
                channelComponent: 'd2oc7m9fzhc92d8c4slkw5ixy1o8icua4g3aji5glb56af1ugtufp4ouegxfegyep8xz8497qtxbuwlom4vobzlzc1lkmfg1540r9jl2rcukde20kntte72z9qw1y0y06oidx42pvpbfkbbgq38g36l59cy24m0v',
                channelName: '8gs55ijkshvtay0avdt35tsq89pwh1dqkbhfqm9casu5hdono34av7zp93llmgcb82cb0q1wpguge4ydqy57dcrtup6872ymc4avwlc1x67kv0ynk8qk43b7zn7uc6016t3ihb5accyxoruiseydvdknvklw81qn',
                detail: 'Nemo at quia reprehenderit. Minima error mollitia nulla quo. Cupiditate saepe aliquam earum. Asperiores ut culpa voluptas quia amet. Qui aut accusamus eius minus quidem. Animi sapiente sunt repellendus et odio quisquam sapiente.',
                example: 'qd006la10jcvyo1rt16s6zjnb627p8vc2q2gbugsm81uayqsrtrupxdb1qzah7jtk5r5jx316rpn98kcstl2k2w1zr3dfaw0upbbnvlcf2n9lxp0bcsibclfdbavggmwk1qkjt3ceq7tfk17uixjw4z13rposoq0',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8955fb29-e3b9-48f1-aed1-e0609284bee0',
                tenantId: '08ea6898-c808-46e0-b5aa-6587eb458e0d',
                systemId: '1872191d-3649-49d6-9bfe-4f871cb90c87',
                systemName: 'writggeqj8brmqr9qx1c',
                executionId: 'bab4872b-d33f-4ebf-8e26-e24112fdb459',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 11:50:01',
                executionMonitoringStartAt: '2020-07-17 01:39:04',
                executionMonitoringEndAt: '2020-07-17 01:52:25',
                status: 'ERROR',
                channelId: '82kysm95wmr39osum4xj4nj2uuwj3rzu2arbl',
                channelParty: '8u5citin2uorexdkftvihkk7v3kc4kuwjq4dvov1sw8xsn1qvnn71y7j9r6xlmlkemowj1m2jzeq55pgut33uzf80aire2a859k2xkxh95zw1zj2fa69woe9xpgpcce1jlpa559tk50j3bv6666t26u7d2e44upc',
                channelComponent: '9rm7e6tbtnqhdaq1b1epgnp7st02l644kt3m7ydz5fqy6gd43itrqdjgjvrn8f18vve2u449kcd7gdesz3dnw8q55z1hhdm5hgpik5k929ciukz8p4707qyci7lsowwapz8bgnqac2vns26wldmwz02n0bk87d2q',
                channelName: 'osmkbzjl4oki7nyjmlnbjrw79jxqgsfrztzbf1fo7p2xm2g5gbxknnerw45k08t96jwuvi7plvgxqmdunr7yrcfvjoeq5vl811d54vzyv98gigg5k4x2ul4fxbf1j3xktf25f62oa1h5bowp178mi2zshbqpgucc',
                detail: 'At corporis sit commodi dolorem consequatur. Et in aut. Harum iusto ratione amet porro atque. Possimus sunt atque labore eos. Occaecati alias pariatur assumenda.',
                example: 'bgrzw3du9nixy70x0jnzhjsg4v6flhe2ty33ap1v7eky3jco7kmhb11wujllltidswu2kl3y8o15b748m3yqaxiyasgmndu9padmtctoojhjsn5jhqn5vuhbz9gd8e1zss9glnmqfzy8zfl1uoozlfmq7nm5m8op',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8955fb29-e3b9-48f1-aed1-e0609284bee0',
                tenantId: '08ea6898-c808-46e0-b5aa-6587eb458e0d',
                systemId: '1872191d-3649-49d6-9bfe-4f871cb90c87',
                systemName: 'p9xzrimpbv2a0ayg7csko',
                executionId: 'bab4872b-d33f-4ebf-8e26-e24112fdb459',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 00:13:04',
                executionMonitoringStartAt: '2020-07-16 18:24:05',
                executionMonitoringEndAt: '2020-07-17 11:22:47',
                status: 'INACTIVE',
                channelId: '65a58e8f-a01c-4206-bd23-33c36604ea63',
                channelParty: 'ivoopamtofunw7bufon571im9lrgbwwg7bm10233w4uszkc1ddslhsw5ue2pjw9xkvzggatriho1fnttd8ys17mdmzmnp1fujcw0hpppe5o90audijkpxa2o0q5clrrl1yr2q4r1yf64u3up0o8p4rm4aueynj64',
                channelComponent: 'fopwlzpl9zh4ye3szl9v1rf8mzcpm3zqkzq6kjyluwdjbv1bv5nhfwpzkl1lb2ywk017vqpwouclb632ra4kxnvq5zcskb0jj0ypxrfclaxgnivpy69p58b3urbk77ctxk3a1gjx71cki0v1r58yf3g71ylceg0g',
                channelName: 'c80zlx5or93mgg88h10gk3w1ic0wng2n2m65j9at2czgy02eqa1lfrhds95rg8d6xzg36swuxnm8ve32e61wkqt6qvcd5we6rvxiav6yi3ksw48nhmyu5axgu5gs1udsgs6sr8oicfqhhkvzarybk4re3ykiha3n',
                detail: 'Et tenetur voluptas dolorem harum dicta natus. Iste eos incidunt et delectus placeat. Ab magni quia corporis. Est eum eaque ut qui ea quod cumque. Ut vitae totam omnis quam quia sunt quae.',
                example: '3b4l3upnnbr6cr5eirn2jdnlkb3ldqgk33jqqs1xrcd81p3ugxx5ieyd0tmj8i93xm6c4mf9kksihiiak08j9im2iiy6nub3pxtu2cycdeyx02kg47gp8q4i5ivvmavi7wz1dqpm4isrjz7yllbiffkr3qcwzx7i',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemName is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8955fb29-e3b9-48f1-aed1-e0609284bee0',
                tenantId: '08ea6898-c808-46e0-b5aa-6587eb458e0d',
                systemId: '1872191d-3649-49d6-9bfe-4f871cb90c87',
                systemName: '2igqf9bdy7zmzjiio4lq',
                executionId: 'bab4872b-d33f-4ebf-8e26-e24112fdb459',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 15:28:45',
                executionMonitoringStartAt: '2020-07-17 10:06:27',
                executionMonitoringEndAt: '2020-07-17 06:24:25',
                status: 'STOPPED',
                channelId: '65a58e8f-a01c-4206-bd23-33c36604ea63',
                channelParty: '25s51sie6rvm4qad0l395c0rd1z3dyj4yb7vsyd781kvmq00q7h3d0c14dzqiim3utemm1ju1xnnjmnyyf4lz3vr1aazt06froy6f48roic9jg62ve9nsnitm8k6de4bvpnaeu8bzrpqh5vgkzcgsj9riiwgldq6h',
                channelComponent: 'kygkcnp4y4cjdc0923mlr0z2412p1iu2nm9pnst6ivfhdown3vp3maez2md7s23rgaecawisckwzp2f49kwa5hqj0ofb1knym72a9lrogldw9xh2c0y9dbnzlbh082ncj9ay0kr4byw94vo7ocnpb8c0pa37fke6',
                channelName: 'jfm5c6r1rnkv15ux5hixmugts8rnob5mb0x77zyzhc905w82pv4gyha2xppd951usbmga0pwfa2eqy42yfckdxjlzjztwgrrkoasoptyy9dk4hrvukua6t6waec2u5q3dov45mannl1evib1gqdohdkcfmlmlv7e',
                detail: 'Corrupti totam distinctio blanditiis voluptas ea nemo laudantium non quis. Rem necessitatibus nihil est nulla eveniet. Corrupti voluptas eos qui hic et labore recusandae. Voluptas hic labore officia accusamus modi. Illo voluptas soluta.',
                example: 'w7980rzj47lsgq6aufs5f63p6ipohgxaw321inmic1tuuiomxnnv8dm38j7s5slvq9xhibwfi7c59p4qx6t8pjr42tv1r5srpcix63ttpday4fpi8j4izj2v9r56f05tkrt0sr1zha7p71nksd1obaxso2t2gi9w',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelParty is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8955fb29-e3b9-48f1-aed1-e0609284bee0',
                tenantId: '08ea6898-c808-46e0-b5aa-6587eb458e0d',
                systemId: '1872191d-3649-49d6-9bfe-4f871cb90c87',
                systemName: 'sx8zp1neaakiej5ozs8e',
                executionId: 'bab4872b-d33f-4ebf-8e26-e24112fdb459',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 10:48:25',
                executionMonitoringStartAt: '2020-07-16 17:21:42',
                executionMonitoringEndAt: '2020-07-17 08:36:50',
                status: 'UNKNOWN',
                channelId: '65a58e8f-a01c-4206-bd23-33c36604ea63',
                channelParty: 'n9bz28s2h7ev010eviud409vps6hoiud346qr6o83iy53qodmofjjndibb3z0t8bojagydaw6mqwefr1wruisn2lwkgzc71quey4y1af8ggtlo4icwiuxlo351lrbm1ltr0dc5cpdv3811k10rgg0ir8s83tmllq',
                channelComponent: '6ou84lejpg3hebq1zzupwke1e5qvzwaanmxkwykt8u308dt4s6pnllptlq95a4rijwsm72dot4kn82xvp997x1v3zjjw4t5h997slsyuxh0yq8myo7sjkmykpqk913n1mgcdjxkixt31gu6ijbkasj1whfc895jt3',
                channelName: 'babqy658v8gp8j8vuiql4m5t4t4h7yiq1eztbp79hn97ckkvjs6g11s9xgifkiup68atinrl2b0uwumi51m4mmcqrkrcbu34jr95mbeyk7iv1j0zzmwytuwe6js9lci47cy2k8yt4dxekm7jv2u2cirpj48lrp84',
                detail: 'Nisi et sit. Et mollitia at ut architecto eos sunt. Ullam enim quia et ea dignissimos reprehenderit ab. Dolor hic non ipsam asperiores. Natus odio aut velit. Ratione aut id commodi autem sit rerum aut.',
                example: '1y7w5kgkpxdl1u5k0uzis4crosdnco6r0j4hxugbylf7rwsxy33a4apsc3czdry1l00fy6qh5bd1yl44z2rfwzt8b5ggq2grjhaba03vr4c1a6ibfp6amrz6efi0jdeigb4r9avvz48oqt1o7llsltiv7xm0nhl3',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelComponent is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8955fb29-e3b9-48f1-aed1-e0609284bee0',
                tenantId: '08ea6898-c808-46e0-b5aa-6587eb458e0d',
                systemId: '1872191d-3649-49d6-9bfe-4f871cb90c87',
                systemName: 'akdvqrjwy7uwgfezicjj',
                executionId: 'bab4872b-d33f-4ebf-8e26-e24112fdb459',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 04:13:09',
                executionMonitoringStartAt: '2020-07-17 11:09:36',
                executionMonitoringEndAt: '2020-07-17 13:22:38',
                status: 'SUCCESSFUL',
                channelId: '65a58e8f-a01c-4206-bd23-33c36604ea63',
                channelParty: 'yyf9w4k0py5r6gtsljkgk7eyc3gmyat0qcvp696jfjib00slfhx9h7kvma7n4nch1cs27yv3tudzpdptsun222w4r8sh0aj3k6nzg6zmjtywweef3js35ko05pm3ovw92k7ea2sbxvy2pq3roxa4p0ihzl9m6fwk',
                channelComponent: 'g9fg07z8z8283g50l5bnkyeqiksmx3d5nl0mkzd4qa7cz97aj0j6u94uvalefp1f4m16nsy1wpt5lllm04hoyxvvpyfgphsaa5s8j454d983lfb7yqh7kvrgg4ti9w7znvutee5fzc8hfery7m2on0cmsres1ql9',
                channelName: 'k9158d4xgwqera7k79z1jajd546dy37robe15wh233bd8ndoig0xc902mcfl9xd0gatwk818jlycrw0mymwkal783lxkltq81uynljaf1fi8a9nolwojkc7rndbfr06ylq8ciz5kd0tffftmgvhbv3c6pv2lbctk3',
                detail: 'Aut sed fuga sit quibusdam assumenda vel et aut. Quibusdam nobis rerum nihil numquam repellendus tempore et voluptas. Rerum et corporis. Repellendus aut a dicta molestiae distinctio odit dolor. Inventore id ea non perspiciatis rerum dolor perspiciatis et.',
                example: 'jfa6va99nn8fwg8ijt6wzlrdth927ct3ym8vh48ypofxeb0uvod60ca0z5y367rqxbm05o8b4e3ax4wankr0sqegqg3lam0ebt5bxu9wzc1omvpsc8lyeyl1h4at1mf03m7cdu6y04er45923f9jzj6mpuufmj44',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelName is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExample is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8955fb29-e3b9-48f1-aed1-e0609284bee0',
                tenantId: '08ea6898-c808-46e0-b5aa-6587eb458e0d',
                systemId: '1872191d-3649-49d6-9bfe-4f871cb90c87',
                systemName: 'kd9abvemfmicdnmd0wxw',
                executionId: 'bab4872b-d33f-4ebf-8e26-e24112fdb459',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 15:20:18',
                executionMonitoringStartAt: '2020-07-17 01:57:56',
                executionMonitoringEndAt: '2020-07-16 20:51:53',
                status: 'ERROR',
                channelId: '65a58e8f-a01c-4206-bd23-33c36604ea63',
                channelParty: '87a13yk74249tag9gnsoys22cpw97ak64lhdls9rzfr5mnda7ql9vhnvd7w2acnbzxgyg4vuibb4fgx1iarcn7nc9dp4ct2ix41u8ocob7jwl3iu9uvxr91qitiwnsdfhf0jep5n2ruin6t3mbzckhkfufxfl40j',
                channelComponent: 's46bfqwioeiy30plvzcymg1x9r2co9jsr1zt3ex8ql5oa615grd12lli3tebathniak56722owfbh6z678s6bsk3s2t21ekmla6kgevp5ht1mwzhfzejk6st7vmgce1pogzllkzu5of7pr39f1ki2hgeglw9yy4t',
                channelName: 'tbx08mrgj7l6zmm8gt7kiw9876xnwcmf7756sdsb36wg4yekmsw0yud0t3q1hrnkg6lq3scqdld1tr5m99jww5e9ateqat0l8bau43nb1eugdfpkxibhibl3n1eeysm16g2lozjmfumxf20i7cv8pdlx8wr6ionv',
                detail: 'Ipsam dolore voluptas maiores nihil placeat sit occaecati nemo. Sunt dolorum quos nihil. Amet beatae iste.',
                example: 'w6mcocbes28gt4ozry1bl02v1kvlxprpxms82q0b40nirl1q8ec16eor2ysce8oigkb4746jztfoxmwn7fyi5warw97r6bi2g5frvi2mm2egn0wcur3jlwzomekt69xatprqxhpq8nr6bqty0hh6ujiu0omec3z8j',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExample is too large, has a maximum length of 160');
            });
    });
    

    

    
    
    

    

    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8955fb29-e3b9-48f1-aed1-e0609284bee0',
                tenantId: '08ea6898-c808-46e0-b5aa-6587eb458e0d',
                systemId: '1872191d-3649-49d6-9bfe-4f871cb90c87',
                systemName: 'o64nq6kx6j473or2gg3f',
                executionId: 'bab4872b-d33f-4ebf-8e26-e24112fdb459',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-17 00:38:12',
                executionMonitoringStartAt: '2020-07-16 18:38:05',
                executionMonitoringEndAt: '2020-07-17 15:18:23',
                status: 'SUCCESSFUL',
                channelId: '65a58e8f-a01c-4206-bd23-33c36604ea63',
                channelParty: '3a0nfb7e99wp9vplyn6mbzeak2x8ojctcje9w626cwgl5gphfb4dfdh0lethtv019hoalrwmi3ldw2r8bt72izfyhymdx4tljm08uepya0k5aw6ddb80txnynj9sppibvl1a2xlvx51gf20s6cua03vbxibp7r9d',
                channelComponent: 'u58ufwku18witbh8zn09ywvz5er8wic81drla39828qfr62rw4zaeavmb6wzo87m1cz770axdhbqoldt8y33sgrkjmkdss6tk4gkar9nw5lso5w9c8an2va51wxaw3xj6orq0lorjec61ajat3idmrg5r2usum94',
                channelName: 'uhy6p1y8znba08l4pjbavkqe29l0ny410ngs79lvqfe12rscyo65xe4h8zqj61w5d1pm5yf5imdxgrk02a8wa4ie7b5zwprwjtyk4ypw29obwenm3b9lu36vuyc3prereg45tazdqf6zr98zusy8ubv93j320wdd',
                detail: 'Vel nobis enim natus dignissimos velit necessitatibus harum sint cupiditate. Ut autem et quia reiciendis. Quae facere ipsa fuga eaque minima. Hic expedita exercitationem accusamus vitae.',
                example: 'nr1p44l96xhjxuj49hepgro5tgsxdp55n5bcs7bl7di3oh7pjvvvt88wxjjsbbjosndsicb8nkwpw2yowsgfnzf3z7c1q19b5bmsyt9z1mdw5fq3fhcatyxymps724a8iuert4de3jpgr5xhhprbegaw6xhgpevi',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailStatus has to be a enum option of ERROR, INACTIVE, SUCCESSFUL, STOPPED, UNKNOWN, UNREGISTERED`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8955fb29-e3b9-48f1-aed1-e0609284bee0',
                tenantId: '08ea6898-c808-46e0-b5aa-6587eb458e0d',
                systemId: '1872191d-3649-49d6-9bfe-4f871cb90c87',
                systemName: 'w516s591q6p0tyxcn6en',
                executionId: 'bab4872b-d33f-4ebf-8e26-e24112fdb459',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 10:56:46',
                executionMonitoringStartAt: '2020-07-17 00:16:41',
                executionMonitoringEndAt: '2020-07-16 22:25:01',
                status: 'XXXX',
                channelId: '65a58e8f-a01c-4206-bd23-33c36604ea63',
                channelParty: 'yx0lqz1tbszcwl4o3v7v11q3zez9icktqefctk7pojhgd1vrqxyvvhht4jjvt37uj2vfx5sbunfgs3n9ikio800qfmih0qps7ke82vvoolxcxgwtz8uf67t2ehclbi1onjr49npoh3ddi1krw49is4q3pegmcccg',
                channelComponent: 'j2456qrr0oytjebpt5l1u0g7qav2r1vj2bac1de20y4nt6v9hz03bbwz82bt4wv8zv730ba5hhbfg2cw6tfdw1f95lfgc5nsfr66cik8r02g7cvwbn2g3umf8970s92jbvb767shwk8u6pdsy407zy7v9s6mwffs',
                channelName: 'bs4mt1l0tfuwufb65ej7tczlg0vnvyc0wzzgmnyu5lwpurc00z3shvxcdhdilzyy8ryekg8lue49l13q2tuhzewollmhy61di2xwhrr41jloz1izjkogue6238o1dz41kc7616ohg2wgxhbbojmaks4jtqhpxiun',
                detail: 'Iusto quis autem minima voluptate distinctio eaque sed reiciendis. Odit quam facilis dolorem voluptatem. Molestiae quaerat quam maxime voluptates aut voluptate distinctio eius. Repudiandae occaecati et ut voluptates odit id nihil repellendus saepe. Voluptatem et pariatur sed dignissimos consectetur doloribus. Ut tempore repellendus qui id.',
                example: 't4fyas2bamhccntgfl0lwlnbwczbmp5oiv2lvha6g7603jmiszmi1f24u3bi58rfh81v2bun2mk68qzvh9tkhx85bk6ajmqs64od22fq6gqnjxss0g5vp9d8np87mn7og7kt9pjdb54y7jsqyc0tbrfshnzlm1cz',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailStatus has to be any of this options: ERROR, INACTIVE, SUCCESSFUL, STOPPED, UNKNOWN, UNREGISTERED');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8955fb29-e3b9-48f1-aed1-e0609284bee0',
                tenantId: '08ea6898-c808-46e0-b5aa-6587eb458e0d',
                systemId: '1872191d-3649-49d6-9bfe-4f871cb90c87',
                systemName: 'hp1wmorfx9xlkl0vkfvs',
                executionId: 'bab4872b-d33f-4ebf-8e26-e24112fdb459',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-17 05:10:06',
                executionMonitoringEndAt: '2020-07-16 20:07:20',
                status: 'SUCCESSFUL',
                channelId: '65a58e8f-a01c-4206-bd23-33c36604ea63',
                channelParty: '1ub8noux1bizzsd16tv4if0gasdvjkmxrk6eh92iicuhww9nf02s4uang71r5ejf95w49q7q7kflcfztbruxr1xmg1qv2u10majynge3uhig3e5exwyzt10dbm12g26sq8raa33fd9lj5mcapbxwfve3h4nowt7x',
                channelComponent: '835ekqadtl0x6sx8fuhg72kfs6oea96p67tx9lu4kil6ws1dvgp9xxjl60urtfkg5enwjnp776la8ni2842tohif3iu9fueaqs7vff2357rvc0mxnirkl883bpei5yrm96opg7ywxt7z86ptz955vk71rxctzrb4',
                channelName: 'ayxrguqn2q0loutg7b7bs114kje36m81jar6ig5gxxtbn4ld4cfm6u96oolctw209hfepv8cgsio7v31pb531yea3im9madciaj8p0ekhw8klmh5vg3dqx66anmy7nhio8v73tr8on5iul1polphb7i09dkdt1mn',
                detail: 'Tempora rerum at libero suscipit consectetur dolorem modi reprehenderit. Dicta magni nihil non qui sint. Est voluptatem eaque necessitatibus odit quo sed reiciendis fugiat. Omnis laudantium impedit est quo veniam. Ratione numquam aperiam aut quasi.',
                example: 'f00b8d3zu6s0es4rh9qw7b82j8lo21y84cxd8pcqzcwoi2m3u9w42raknt85cenqc5zh0nbb33kqvbbegctqh3tyjhtjjft09bmocco7fazatg9bg7435ar3konn9rdx5ea0lx3eywmqdrlv3soryovpf6r7w1l6',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8955fb29-e3b9-48f1-aed1-e0609284bee0',
                tenantId: '08ea6898-c808-46e0-b5aa-6587eb458e0d',
                systemId: '1872191d-3649-49d6-9bfe-4f871cb90c87',
                systemName: 'va8cggc23tnyb0wtjony',
                executionId: 'bab4872b-d33f-4ebf-8e26-e24112fdb459',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 23:18:48',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-17 07:51:23',
                status: 'STOPPED',
                channelId: '65a58e8f-a01c-4206-bd23-33c36604ea63',
                channelParty: '4a23bngtaik2z33tqkt1ixsnc3yfcceqzfe8qakv1ni5my6svq1rqw21a1uee0xrqz5hejwgdim5cyjiafk0kte763bqw20olugo7mczjlg2ahqmg8wtvkp65umokn6cnmp9jszswdsbyzv14gfkkusmto962jdl',
                channelComponent: 'tr2h6um3hh702tttb5ruw5rms2xp7zpdhnc4vm1347t1p7rcs1daai2i268ngtt1b4ftf14golxy9c16okp97iutgg0nogqtjdax8miqnxvnn087rk1ix679pf8755aj5zixmkqcd9pxfi2dig3k2cba9hxiad7w',
                channelName: '8nz5tb9yzai8c9kc30dj4gr8oxx5l9xkb6293x8zqlofuk09ty3v497zxtjvzxr1i5qtzp2m3n7ssbni248jz7yzhoe8zzzlx9okpj92yzwy8pcok6fld3ceiypycipij9yiwsrqnfmhwf94dxbd46rpmledvmts',
                detail: 'Dolore velit ea sit voluptatum aliquam sed vero at blanditiis. Vel culpa tempora. Ex sit facere. Rerum atque neque et expedita animi velit velit occaecati. Sed enim occaecati eveniet fuga qui vitae temporibus vero aliquam. Autem sed natus eos nihil deleniti facere non vero molestiae.',
                example: 'zyxes7gmyiu9msvc7paq90oyp2mevl535yezrqfsxzjl4mg3wwndam2b9bv1mw1itxa6fs5x5kvu0jpx41095vcp6248b1vec2fe42p7wdv0hnro0w8dwgpx4c42mtzw3hhfixt735qqr3etepfrd1yv363q031j',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8955fb29-e3b9-48f1-aed1-e0609284bee0',
                tenantId: '08ea6898-c808-46e0-b5aa-6587eb458e0d',
                systemId: '1872191d-3649-49d6-9bfe-4f871cb90c87',
                systemName: '8i58zrfty28std633chd',
                executionId: 'bab4872b-d33f-4ebf-8e26-e24112fdb459',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 03:32:20',
                executionMonitoringStartAt: '2020-07-16 21:03:11',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'ERROR',
                channelId: '65a58e8f-a01c-4206-bd23-33c36604ea63',
                channelParty: '35l9mmbhaxu0b9oy9pejoul4xyfcdg7809ltjdyz7o43v2p14s10ijusv52k19m6nsccyvoiz0utsxd3rqidzumoltglwd44d3vpzzvk4xzeqki59eonycoyawbo61umb6ojektc1rcwadxvuhxya6jzeuh7pejl',
                channelComponent: 'oqfarlec1xp4b3satwe4ogr7hq69l0a7co3alegipv4hob1o446utwhhaxzik6kaj4o2sm7uluq8a5mfnviain9g5qwwhommuicjdlfe4m32ptq33q205vleg2zyrto1afyjn6fmrks23t1hcahot31b0oepw798',
                channelName: 'tbe1z8xvbjrk1irlsiksxlx7oqtrsq1gonvkvu3fvygos8331zqt3a0qvbdlhb1zwuaqyqk3fchs2rqdln56tjlwjakhhh334loe4yvncsb857pvscqhrlg4of0rpnix1qcelhprc8qaq9415pempsmdr3gyioe5',
                detail: 'Suscipit voluptatem et ut. Voluptate quidem tempora vel dignissimos. Ea et minus doloremque tempora tempore quisquam provident.',
                example: 'lzkp76gya7ga7qh71xh546y1mxrau6jvfsxckhh9w1j9k0fsetcq71pnrgo27ip9c8zgt9zmfpv4jpdwytp9gd9tzk0jn8735xx4qqxvtv44zvkvvqusjmffg193epq0s0s252qg3ox5lfugj4y7q1cnwvbkz9ni',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    it(`/REST:POST bplus-it-sappi/channel-detail`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8955fb29-e3b9-48f1-aed1-e0609284bee0',
                tenantId: '08ea6898-c808-46e0-b5aa-6587eb458e0d',
                systemId: '1872191d-3649-49d6-9bfe-4f871cb90c87',
                systemName: 'vl0emfqfl6srza73s7de',
                executionId: 'bab4872b-d33f-4ebf-8e26-e24112fdb459',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 18:11:56',
                executionMonitoringStartAt: '2020-07-17 14:29:15',
                executionMonitoringEndAt: '2020-07-16 19:04:19',
                status: 'UNKNOWN',
                channelId: '65a58e8f-a01c-4206-bd23-33c36604ea63',
                channelParty: '2op4x08oon9ntaip5bpuezj7fvzpq6hyooddbxwvna8au3hrybht2lmc18353qfh9ytoz2gg843cx2zju1lqhj2j4n0chmn2fhf2gg6i8dapuaw1t0kqv6hqgbnv37xw3nanhge2t3esz5ju6vtch995yi15wqfs',
                channelComponent: 'k1uv9boeabnkuti2t9lh8w3h9d5pcxoclvtegw5nfei0ve1idfg6awlry50h2vkoeieli6is4zntptzwaku7y57r5onyk2h2ofcd6bfi7qvkgf6ed9pybjfaagzvv2snx5iznw1sjszd9rey2ahqnwb1a8cl6bx9',
                channelName: 'yl4fei3mskyzxs21ubzfi81hiuwthpuvszesocl2fqj5n71wf4iw6eeub8f1lgf8invenayb008b2stlz2dzmhxdl7lamdb4nkkz5kxoumsvcqmhtidrc2ukt1ubgmwrcfb0ey485owp1rfssfbjas849ur4solm',
                detail: 'Quam sapiente quia voluptatibus doloribus explicabo. Minus placeat corporis autem. Fugiat aut corrupti enim quia aut iure harum. Et fugiat vel aut expedita exercitationem aut voluptatibus. Ut et et ut dolores.',
                example: 'quxd9dfveiqgrf06gtfnyj3pg9migxvv7bfq4lr92jj38odu3j0iudgnbsj91q99mfdj0osnsvw75tqw1rap71vfyihhzz33tw1hszcpx4orusixdvvpi0eps7qtoseg7ripoyzpa19nlfl5r5npqzpzmc3etgzk',
            })
            .expect(201);
    });

    it(`/REST:GET bplus-it-sappi/channels-detail/paginate`, () => 
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

    it(`/REST:GET bplus-it-sappi/channel-detail - Got 404 Not Found`, () => 
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

    it(`/REST:GET bplus-it-sappi/channel-detail`, () => 
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
                        value   : '8955fb29-e3b9-48f1-aed1-e0609284bee0'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '8955fb29-e3b9-48f1-aed1-e0609284bee0'));
    });

    it(`/REST:GET bplus-it-sappi/channel-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-detail/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET bplus-it-sappi/channel-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-detail/8955fb29-e3b9-48f1-aed1-e0609284bee0')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '8955fb29-e3b9-48f1-aed1-e0609284bee0'));
    });

    it(`/REST:GET bplus-it-sappi/channels-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channels-detail')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT bplus-it-sappi/channel-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '07800ad7-6a13-4ae1-aa2f-88c9719cb95d',
                tenantId: '9f646ceb-a87d-43d5-acde-288cfa057df4',
                systemId: '74dad959-029a-4b38-8501-7dc040a1ff91',
                systemName: 't9v6z3mmaetsbxp8gqe2',
                executionId: 'cfdf3b45-0812-423b-8862-496ee37da9b6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 14:15:42',
                executionMonitoringStartAt: '2020-07-17 14:34:55',
                executionMonitoringEndAt: '2020-07-17 10:12:18',
                status: 'UNREGISTERED',
                channelId: 'a9fe4394-7288-4332-81a1-f9b88cdbccf1',
                channelParty: '61yve5cui5cwq7t4qgnmuzvwxq9ve89uz931co5m03uokliyzjskpb334akg35hae4x761ybfyrh7frut8l246wh4a8zlbtgu5uy1rc3bru93qgfhc6tg0jln3l7m0oql1bnwpzjenh7juusj1c2rpigr22jfcmo',
                channelComponent: 'tqt5eqznntv43l4xah42kekkpdz2vw243v2c8lbe059m7lh6b84a10ye5q5yyvuw1xiw78284ndmz96qf18rrddfznzdm11b8ea2uwdn68tmrcfyezmejkabd538wejp7rmv9ucnztp1r0w6nheqqxl6miyjmid5',
                channelName: '37jeyq3y6z6jv1mkk1on8cqo7vu3kb38953p1f7u8pmckwvwy1a6wajuguisjhfv67qes0rg8h5g9sinadg1pls68sbdytaf66vux0ld1q0kqcmvfpysj794efbrw9x0gtptn0l4f3afojixphf2wngonqkb8gjn',
                detail: 'Sed beatae doloribus aut nesciunt et dolor. Sint eveniet eos expedita quo quibusdam voluptates ipsum. Cupiditate ad est consequatur corrupti tempora sit. Eius nesciunt et aliquam. Eius corrupti laudantium explicabo. Nostrum fuga aliquid.',
                example: '14stdadic72xijplyjqn8miysz10k0axqk4tri54ppajiqn1q8nsbr1pzryf2e6u1clab676yzhzcub955lrnxi3x0ziz0y1bjoivwmjl2n64qbw05wvtl33psyd1x69tiyrr0f103jbopkfgxk0gsjzwjxw6vcz',
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/channel-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '8955fb29-e3b9-48f1-aed1-e0609284bee0',
                tenantId: '08ea6898-c808-46e0-b5aa-6587eb458e0d',
                systemId: '1872191d-3649-49d6-9bfe-4f871cb90c87',
                systemName: 'eelrkaou0z1drp36p2kh',
                executionId: 'bab4872b-d33f-4ebf-8e26-e24112fdb459',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 17:03:01',
                executionMonitoringStartAt: '2020-07-17 09:15:14',
                executionMonitoringEndAt: '2020-07-17 16:30:13',
                status: 'UNKNOWN',
                channelId: '65a58e8f-a01c-4206-bd23-33c36604ea63',
                channelParty: 'wll442jrgynpo9aog55wg934fofelok4gu1kq0sfmzvuce5fscex7h6gk0fawvbx9sebvu6yrvvtbtn5j0r1j925q1vtcsesl02a52lr49utyifmmpqxekvr91ye7z2tfguaqp6gj78pltneutraafdks8u0xjus',
                channelComponent: 'lra04b3zc9peubpm15n7eep7tlrmjb2sl1c74zzxacwtjytcx59jxyt32li0d1wokk2jpt2ac8axyu7vifg71hre4skpt4h9fpo5rvcgh5rg7gip8myzcnscmkcu7udm82czsvnhhi2x8tb0i98vxhyxgb573y57',
                channelName: 's5e9b55rhp9ypicprb7pquuu8q9cdzwhzg0754xu9a21gvfef7ig27vw0mrhzx62blfkdejsg084cu0ye3izmu576g8pr7iwmi164z0xddffaiz6tku8q0yddef8ahsia76uwpxa9snnoufx1kg2ghrj7gyis6ds',
                detail: 'Praesentium omnis consectetur dolorum qui consequatur. Perferendis quia perspiciatis omnis. Aspernatur dicta delectus iste id ullam ducimus vel et eveniet. Aliquam nesciunt veniam deleniti quas eligendi voluptatem.',
                example: '8lmy632o9jlbij71mn657zywlnmu07d5jpkaka885ahykmmvzmcagbicak6oe7nx60eoc78wmduqnibnwc97smojsnwhal6cbk5c4sbcll51z2a5b5yxyynlovjqhz3e5ojmnxonjd8x2nkdstxu1hbkof6ewnd2',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '8955fb29-e3b9-48f1-aed1-e0609284bee0'));
    });

    it(`/REST:DELETE bplus-it-sappi/channel-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel-detail/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE bplus-it-sappi/channel-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel-detail/8955fb29-e3b9-48f1-aed1-e0609284bee0')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL bplusItSappiCreateChannelDetail - Got 409 Conflict, item already exist in database`, () => 
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

    it(`/GraphQL bplusItSappiCreateChannelDetail`, () => 
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
                        id: 'a79d4e22-42c7-4143-bbf2-6fe0ba9ad00c',
                        tenantId: '08ea6898-c808-46e0-b5aa-6587eb458e0d',
                        systemId: '1872191d-3649-49d6-9bfe-4f871cb90c87',
                        systemName: 'qsg8iwepdplja4kcctfx',
                        executionId: 'bab4872b-d33f-4ebf-8e26-e24112fdb459',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-17 03:56:58',
                        executionMonitoringStartAt: '2020-07-17 06:25:54',
                        executionMonitoringEndAt: '2020-07-17 08:12:55',
                        status: 'UNKNOWN',
                        channelId: '65a58e8f-a01c-4206-bd23-33c36604ea63',
                        channelParty: 't9os420e994035tuzczb4i09v9zwvi9luovpn48vfauukf129gcrkklvktmfnp3v3srxd44hqzncn0r9fs0r98kdmbdvmrthtqy42z5iytiijulrdggxeqt1tx2w4sda4g679xxn5mgnt1wdp4lq8s51c372m7c4',
                        channelComponent: 'pw9dxbo5ds98hg5gqx1es0ycfkrsh1efiagziaprhczm6ugyny27ulco1t9c7a93lpi4bcx556hb6ly5t0w896p000p3yckc1766qi85cqh72190j4pvmgvl8aivxirpme3iekj6bh1ksb0nrqf018lrg2icvuy7',
                        channelName: 'k3117q99765q3otd4in3emyg0s2wwzjt1nx2sg6qso9q40lo6rkhwakv9i06vvxljpw0fup33ffbv7z8kqwgjj6fwwj9i7cib2koofwusznm7ovijkhp7xiw6ujjgf0fhvylul3pwsfb28th9vzlu94d3udrc0uo',
                        detail: 'Incidunt tempore repellat amet doloribus nobis incidunt sint est. Aut est laboriosam. Sunt omnis beatae nulla et. Eos voluptate ipsam voluptatem eum aut ut et.',
                        example: '3t8p5nwt39t9u3ar2qoiwbctu29yqi16u3d1hurysvixn5mjeundsi6rsviih2cxpik6t9wj87f2qjn5ndfs5086acwmi6y267jcde1hygdn8ts7ivv7240yn9bsse2gocppx8zhoogp8wdmevjzg34jrnkk5hub',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannelDetail).toHaveProperty('id', 'a79d4e22-42c7-4143-bbf2-6fe0ba9ad00c');
            });
    });

    it(`/GraphQL bplusItSappiPaginateChannelsDetail`, () => 
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

    it(`/GraphQL bplusItSappiFindChannelDetail - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiFindChannelDetail`, () => 
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
                            value   : '8955fb29-e3b9-48f1-aed1-e0609284bee0'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelDetail.id).toStrictEqual('8955fb29-e3b9-48f1-aed1-e0609284bee0');
            });
    });

    it(`/GraphQL bplusItSappiFindChannelDetailById - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiFindChannelDetailById`, () => 
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
                    id: '8955fb29-e3b9-48f1-aed1-e0609284bee0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelDetailById.id).toStrictEqual('8955fb29-e3b9-48f1-aed1-e0609284bee0');
            });
    });

    it(`/GraphQL bplusItSappiGetChannelsDetail`, () => 
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

    it(`/GraphQL bplusItSappiUpdateChannelDetail - Got 404 Not Found`, () => 
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
                        
                        id: 'e7630ca1-30dd-40eb-a04a-ed0f8829084e',
                        tenantId: '6d0916e6-8137-4d8a-b6a5-deaa6c9401f5',
                        systemId: '439fb3c0-db9e-403e-b7ba-9b5b82ec59a4',
                        systemName: 'xxgy53tzi6d1ocxanl84',
                        executionId: 'cea78aaa-3faf-40f4-9d2a-02b8d9ac05ec',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-17 05:00:36',
                        executionMonitoringStartAt: '2020-07-16 17:41:42',
                        executionMonitoringEndAt: '2020-07-17 14:33:18',
                        status: 'UNKNOWN',
                        channelId: '5f7db417-9430-4e35-bed1-bf4baa395c54',
                        channelParty: '5boiia04d3xu5b3xptwujy4ckphggzoplm0olhbk54n9uyqf1q7qj9edkpequuw55bga415c41au8pujavlfwffd5rytvi14p9u0v91szks8uxbttxjgpv6rbdvyg229i36kk96dmgi6tuugrsj5p4d2or2tcvji',
                        channelComponent: '64uxovvblnflc4a8gya2qk1ktxeoukwpx23jbk92e1la29tr0zf81uhnpb11i081gudenql43myjf0r6vmywj1lllz7eayzmcxdj12a7ac0mkzokdbgq3znjro9s021yntly6nlo4wy00jrst4nxahblg25xvdr2',
                        channelName: '56zh5c3ytarbfd2djbu4bsmcdoj0z790ip2l5k5l7a3063tx87ydaa110bjhk9zmb58a5k1pxnwrl4xnvmd0ewi9afng5jnd4f86of39eo88wspk94d0713lm001ubaovieqrzrwpr5vhlw1lq4prxjg5vqvjw9t',
                        detail: 'Neque nobis asperiores. Ea sequi nemo et odio quas. Omnis perspiciatis quasi tempore aliquam officia consectetur totam et. Non iure et voluptatibus tenetur non voluptate.',
                        example: 'ubyigxue0y3lqhahq6unaeg5phkcni69grv8n9839eadzcp5ht2ptdd31xxa0w9pfiq7mkyic60d88ozkq3pkmlkcswh75ld25vulqnhk01s8k5vee89qpfomd734qnkyuxju9dv6oebbbyj91e4i49bni8ectit',
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

    it(`/GraphQL bplusItSappiUpdateChannelDetail`, () => 
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
                        
                        id: '8955fb29-e3b9-48f1-aed1-e0609284bee0',
                        tenantId: '08ea6898-c808-46e0-b5aa-6587eb458e0d',
                        systemId: '1872191d-3649-49d6-9bfe-4f871cb90c87',
                        systemName: 'ej2r3f7h7lzl13crgo7n',
                        executionId: 'bab4872b-d33f-4ebf-8e26-e24112fdb459',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-17 12:46:41',
                        executionMonitoringStartAt: '2020-07-16 21:41:48',
                        executionMonitoringEndAt: '2020-07-17 12:38:28',
                        status: 'SUCCESSFUL',
                        channelId: '65a58e8f-a01c-4206-bd23-33c36604ea63',
                        channelParty: 'kot8nb81gwchaytv2y9hk1xsec9hl17vz2gozr9fvv3tk663m5wyqb634d9108x60uo5q2gx3x5os954s2ieuz0zotrr77nigb55tpyrpn15g4yv7ajnsiorql7gof7c16lyy3l0c944ukqdq3y9yyoyz41v7c5h',
                        channelComponent: '5dkvjoqe92toanyzfklqer019if40efoo5syyho7tn8tj7yk69xyozjh0xqvjw1opwgz0e5pnb8qft29aurlm68d0g7t3ir8wpzdugdxxaqxy7tmticywfjngdcdo5j59kweuqkzgsbyfnfp1nbd79pp7f1twd85',
                        channelName: '55yw4w3sklsqt2sjeivrgbtb7d7mlg8mgviepes3dncldm6ofreyw4p7w3mo2r44wkd6glvsr7p6isb1gf0dgm7schtlpxvdc4iky2c5v169uq8ygsfcsvzy52z3mx2lcqzsat0umlsrqel6jyqdmjrnjnll2i7z',
                        detail: 'Maiores laborum laboriosam nemo voluptatem a modi rerum. Fugit facere illum. Vitae et unde aspernatur impedit fuga ut eos iusto. Quibusdam ducimus explicabo. Qui consequatur molestias dolor tempore est laboriosam laudantium. Officiis deserunt ipsam non consequatur voluptatem.',
                        example: 'nj2mc0rmbih55txsqwjfchiv0owv402lj0h068v7xcj4yrh5adjfalk3klnr36lmicogjg6uvgow4qy4jpf5ogxrqpp6rtye71k73k41cml0e9k4vany939ayvqbf5d54lreyx3wm825sd4cz6njphn7xjlj53hw',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannelDetail.id).toStrictEqual('8955fb29-e3b9-48f1-aed1-e0609284bee0');
            });
    });

    it(`/GraphQL bplusItSappiDeleteChannelDetailById - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiDeleteChannelDetailById`, () => 
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
                    id: '8955fb29-e3b9-48f1-aed1-e0609284bee0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelDetailById.id).toStrictEqual('8955fb29-e3b9-48f1-aed1-e0609284bee0');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});