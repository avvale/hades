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
                tenantId: 'b583a1b2-557f-44ed-8fd8-7c3abcd717cb',
                systemId: 'c05f19c8-3590-4d2f-a384-427e73afcd57',
                systemName: '34pnquy7cswuhr2in2oi',
                executionId: 'c9d8831a-2f37-42b1-a801-34ee35ab2c3d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 14:53:43',
                executionMonitoringStartAt: '2020-07-21 04:38:52',
                executionMonitoringEndAt: '2020-07-21 11:03:15',
                status: 'CANCELLED',
                name: 'b4tq8c1o70bboqi33imvofi4lrtgqytk0jse0l1amw1mon0ixy11w7c9rbp5osya16g7nl460wdqezdu2goh9q6kb2voedo00jyl62lhtlbu5h0gsvkqnkkms18xqhkob2291w99fsd7j8m2dw483rmanshajhjq4p7hmqlercinuxxvnflupsgjxhoi6262jtz5iyub3xjs1hme0nta8qufz0xojyafthyf31nrvybnwhh5fqqbosf6ic02vw0',
                returnCode: 8173252762,
                node: 'woogbnbuxffdobr1epqk6q4p2dq95odybg57njxotqa1vz3i8t84xyis35k5u9zwws81dzm7uo2poav53ds6zm25i6gr1ol41nea742qyu0v59wt4z1bmzjy343jlw8wiciicrav8wjlpzeqtmypib4b5bdwpkw7',
                user: 'uynofckaqmo21yn69f5ppq5mso6hox5zj3ua0nx0yui90fwqgolajsde7jhoytr5hcgoneupqw7a0iiav5oc7b5baow4xiode0ol3gvq382r08r7r77555kgtt9i3n8yypdp4w9c49zupzdy6og2nd1l9u72cwgsmyx9sr3xklrg3jbdcu15ad0s3qmti8p5yeblihkyep6wfjzim3cdsw2hsp31wcxdt4wr8usa5odayum4le9k2of1ja8yqkg',
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
                
                tenantId: 'b583a1b2-557f-44ed-8fd8-7c3abcd717cb',
                systemId: 'c05f19c8-3590-4d2f-a384-427e73afcd57',
                systemName: 'rm2vhc3d17x2vse6b497',
                executionId: 'c9d8831a-2f37-42b1-a801-34ee35ab2c3d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 17:00:25',
                executionMonitoringStartAt: '2020-07-21 22:42:03',
                executionMonitoringEndAt: '2020-07-21 03:52:29',
                status: 'ERROR',
                name: '89eea1cpwvxx9g0xnj2o94qm4dj2rw6v0r5hilq5xbgtgch544rz8eoebkjoe6241hc7ksvehi8dj2gobmve2hxywc1yjsbjdcz56i9fx9fddwsf3hl5hk7kd0mo9e3cy52up82eevfthefqb7lqg6oo92s373ms5n78d9llwhlt6luh8l7qolvdujy6frtt33cigoxwcy2x46m6yyb9g8u3i1xn6kovh1y6kme59tqt1gfjvq562cneajf3f6a',
                returnCode: 9908893912,
                node: 'z9k79vid46ikgvaymnflkc2hex459i75ti0yn2gcdvhbjd6xzzhiag0rbf81vhpi1t9ebzbj49mrrbk0dsjw8gw2ypnpu4x0z9vwvgu4lqouy124lugubm8b1kizzwli4pytlysrig0mmn6yjftor0a8lxj60aq3',
                user: 'inyhswgce8a6y0jjb9p63hhgrck8o47qh5tnv268xdaocfb0gopf5tp6zgxnkg5otncm6bp1oiqk57jggmk4b3470wmlu2mzmrx8fxwatquwvv76t9u3jhum0bztrmkntuakejcsa2vmswk9404ue66lmtev5doga8ylcgisc51uzsbd440msjw30y7ofags9g2n7hgk3548to85nwq2t3ps7eelsgl2nquoem0i4qdflkykxlf0ukcfusllapj',
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
                id: '59563238-3020-4aac-957b-1e8e91805f46',
                tenantId: null,
                systemId: 'c05f19c8-3590-4d2f-a384-427e73afcd57',
                systemName: '8uq84fgx1kz9i64m6uka',
                executionId: 'c9d8831a-2f37-42b1-a801-34ee35ab2c3d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 23:46:01',
                executionMonitoringStartAt: '2020-07-21 02:42:01',
                executionMonitoringEndAt: '2020-07-22 00:25:14',
                status: 'ERROR',
                name: '2f5fyla465b3d3iidmc54h3huscqxfmhcwnoaknbv3bctebg624l1pluvhfhenjvdtlts0pt6cxfh3xi258x9k3p0n2f6zwg5qnjtlpma9wpgoxgix68zmqqli1kb8vyuz3aj2w59zg8d47b7u5mpr1ancgikgfe49lhjnxraaphxgr4bwdzmvxcvxuupyihozsrcljyw1w3kse9z9um4ru0xo3nrpt7zt6szly2p1f25j96yidq37se6qlad5z',
                returnCode: 2150716673,
                node: '86kygw5iedmv495huyawmxwuofkuheihn3qy9yovjwj93ly2kvr9np09od955e4bgxknvoactj7uo6c2wu8b9yau79ab9tk5eanp6ztchwkxpmvz2w4g4ayfhrjozemogt92kyzsj0j3opg1p0rjqwevq1opphi3',
                user: 'aqeprdw59e7ywuzddulufpo9pl72fl0wzb0hke26j2nts54bstm6xuagd92yzp3awyb2m2bvimkwexkqzyszz14dcph6byy5x8hcrmav6t5po1v1vkihtly00em6j4cn5tc2gzn0q2m1vel8t1685g0cfy214khso10tar55tctiquqg70woltxxxvvdtdddzdftahwk86udvpiiy8nlul4m5grfugc6b67dgcqtakmh1xa6b2b05bznn3xma8a',
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
                id: '59563238-3020-4aac-957b-1e8e91805f46',
                
                systemId: 'c05f19c8-3590-4d2f-a384-427e73afcd57',
                systemName: 'uatw9nc0kofw5n8w3s2a',
                executionId: 'c9d8831a-2f37-42b1-a801-34ee35ab2c3d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 20:45:32',
                executionMonitoringStartAt: '2020-07-21 11:49:48',
                executionMonitoringEndAt: '2020-07-22 00:03:40',
                status: 'CANCELLED',
                name: 'dtrdh45yy6grtdozpdguvljx59b8101b8qcnfpfb8w3skyfmcmmmcygy363cz3y0c0aizb7apoyas548h8z522sznnzmb1uhqjqywcx1lhsoxjqna3pom1gzy6lsc6xouk8ifx2zm0atj2fwvpv6bpusy5jnxosftxodjk9xao8r2zfc410f12ihi0it79uj9y9cl7jtskungvkju81ogug08ekljs7ct9a34w7tfav2dqqmo8noidz79lf2uqp',
                returnCode: 9960046258,
                node: 'kdiggalm93xt5harlevo8n1cygwh0kpecbn3dd678zinlblpkzj18i044dlzcarzr3ju6rycd2lx9ibg0vk9dijho6mxiexqdizz2aznhcoop1ylaer6djsedes56mf8tlv0s3xanvmg0khoe8hq1mh6o6lrvwce',
                user: 'o5d2d3anu95khe45a56t2cg51sbtui5328r8w5opc49z05f0t1rxjnu0w9s3kfvtsgb888invfghietaz1qu4dkcy8d8udp6hhccrk6jdxo1pq8o9sl4dz05m6bmsm0yfxypztwa51oakiyjttd9cls3v0ihgclkd8dy8l4t9lyapl90hwaitldqwkpnrk74exwatn2ae33rd9vys18l6qk0ybr7brym3nsyjceod11qcphy5armv8dj83tauhi',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '59563238-3020-4aac-957b-1e8e91805f46',
                tenantId: 'b583a1b2-557f-44ed-8fd8-7c3abcd717cb',
                systemId: null,
                systemName: 'sywawk5t0xf3syibo2ci',
                executionId: 'c9d8831a-2f37-42b1-a801-34ee35ab2c3d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 14:36:07',
                executionMonitoringStartAt: '2020-07-21 21:48:15',
                executionMonitoringEndAt: '2020-07-21 10:35:53',
                status: 'ERROR',
                name: 'hwut928g9n3crcyuawl5e31fbij3829yq4mk8iegchz8jll9wllqiga1gdf1jyuuyj4v0ns6mpn8o3fuoehigagw3h5s0dmy2e48co8kn5970eg2u7ffauih8ly4l82rupjsovdvo7uzgwp6wcngofmdb84coj0y5vmyvm05hhylk2d4m670k9lyywjlomrr9rzeylbx9dt9g8w8ymcuzheq3tw5xvpkbda1va8xp9nhiv7m9xcjl5evmno3oyn',
                returnCode: 1417324844,
                node: 'ea9htk4e7ohbdxd2dbhd5hvzvajjdp4h0wtgpj3cuait59ryh8q2gpgtc2u1lxsgja1rnn2528wn9v0w4t6yrrwtji2k9o7w9pkfjpdgz7laiu2u05iosmorekz3nt94jvrfg4don81ku94t1i3m430oz1tuuk3g',
                user: 'qmzxg3ho2o2camz5uce5q2ochyswqdlquf0iajxrnl2t0381r5t7q08kkvokwo23l832a9ohux9bmafja38p1597kdomlgu3whdkwsetq8mo9bcj9zwez2ospoxy3dpjo5527f20wmd3ueo1i7c6yho0fri2qe5lzmvtjjgd6qxesufi0fld54wana3bl18og49ipdbkpoi7e8wq3clbteu29685yk6e6nmdvk2kblftgh3dy8du7yhrj4yxlys',
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
                id: '59563238-3020-4aac-957b-1e8e91805f46',
                tenantId: 'b583a1b2-557f-44ed-8fd8-7c3abcd717cb',
                
                systemName: 'nnh3n4iszc2jkig4b866',
                executionId: 'c9d8831a-2f37-42b1-a801-34ee35ab2c3d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 11:17:09',
                executionMonitoringStartAt: '2020-07-21 23:58:01',
                executionMonitoringEndAt: '2020-07-21 01:45:24',
                status: 'CANCELLED',
                name: '0ynwn6kmdovwkrilw8c927z15kzmydyrrx1jjdlqatponwiua61cyabo9shablmj1om2029q8fzg8c7j9qchpr85vvwab1vztc16ca6db1pyr696uo4o1z32iu1atk9aw8xp0roumdrzt8pefrgcihef9ck17dl72tls8veiudbisv6meag95dg3r21i3zq55ry41evn95prsf9x90e85a6gsgxucagji7jajxy7athsidx1yxqr0xru76kntyw',
                returnCode: 7792765746,
                node: 'f5ao18xxw2mtt8ozokazt5ugrgcyfrm9mj83ue7w3mu4xvvmxq1manozxvngi5u065y2yc6x087l5fyh3cbeh5bz31qsm8bskk5n74lzkaz3uo2farhttmhueqv0i2egffbg335ipsvfxcy630mdwq68ucqvv4qd',
                user: 'iju20r0f5qkkdpch3uapmkmrjj5v19zgcwy1qww3fx7wdny3bbc6k5ddsuuk7f9gu2n23oiczzjm362vvmko11f1mxcmgwia82kqdz3fybl13t0ahkwijzorkxxeucqwwcj2siql61x5k51kd3t15tmuqyuscedbtszdongfzpn0xs3vfgg4o34fg23xzc0iyjl31r33e0ihv68scd6zaf1hqldnwmpaq11ow28s8he6zpb6dzz70z4xpogcx6i',
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
                id: '59563238-3020-4aac-957b-1e8e91805f46',
                tenantId: 'b583a1b2-557f-44ed-8fd8-7c3abcd717cb',
                systemId: 'c05f19c8-3590-4d2f-a384-427e73afcd57',
                systemName: null,
                executionId: 'c9d8831a-2f37-42b1-a801-34ee35ab2c3d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 18:39:59',
                executionMonitoringStartAt: '2020-07-21 17:35:41',
                executionMonitoringEndAt: '2020-07-21 22:36:57',
                status: 'COMPLETED',
                name: 'lyimosvetny2bs0zlwtlqt4mcd9gqlao2rafmet06xvxafeaarzth0v6f55zx1hzn6b80b96fmsp4usbaq8a64q8xjg1qr1qrgv57jwwu1qvucn9vrx0bbh7ieq6flw2piqyt1gsfln6xlpuqtgw1m8315vpbyqywpl6odvawzqlh2xv8a7pjkog25xzk5x6hbnau5ieywjyo0zuc0qkdjxivggh4ggpahcmwsu83rmstwtajrfs9gihu6111iv',
                returnCode: 7113631081,
                node: 'khtwuh8hlulul1hl318ycvkzkst1ye4d0ov2wjy4g9qjgt5fa3bazkm28k17qcopvk3i1qpn4lnn5bqxi4m40hy1t51l8lz5vmr1kdohrpeo3n5wsx4eq2pk8g0nroqdiw7nd8pit23l6tmpu0lkvr4qrlbo3eb1',
                user: 'i2jo98p4kvdz5ounahyqgav12xc5bgi1iegluklfvodp1n42y6ywl6h0jdjwj29qeaboqdga9epvnmluoaqqfat8tu1an06rzf8kkz4ekly502nuoi11ffzret5gvnp48idlneiadqo4jbh60d4btd7vhm61sv9kj6q91enefixyk49b83ehzuoby4zk1h7gj1e3ajdh3ty2mnft9y4eymp7wqxbkr63on73wt3ex4g52jwcqbemvxpvoib8e8l',
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
                id: '59563238-3020-4aac-957b-1e8e91805f46',
                tenantId: 'b583a1b2-557f-44ed-8fd8-7c3abcd717cb',
                systemId: 'c05f19c8-3590-4d2f-a384-427e73afcd57',
                
                executionId: 'c9d8831a-2f37-42b1-a801-34ee35ab2c3d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 09:07:43',
                executionMonitoringStartAt: '2020-07-21 14:33:18',
                executionMonitoringEndAt: '2020-07-21 09:25:08',
                status: 'CANCELLED',
                name: '3r4e4xwa1lv0oxqtb4lxnf4wks680rtcp5q84xanoti62lcy3bi350u7ujf4clamtt2x8t8roiv3jh2qkg7kwiwauqyqlq9rum298ymizr7v41bked13h7epai8hwa072y6mff7383h3wr896kc402ibbu8icu550coe8noi1vvrzii84w7afqdghqv06uz5rg5qkqcf6jazma50x13b7edhk9b2l697peg5des19x3xf65ollsljiy9kvp0m2i',
                returnCode: 1306993587,
                node: '9f8ux4qtl8j9nbwyiucfmthx3i7zwtbj4t1e3drndykcx9j2rr7db0hvmpa3qw43pz1d7odqdfovew44hqrriikt8h94fb7m36vjee9yecs2y96y3o2n8ko33pnqr0csfds8smthahmnv50759hxeobp2apn28le',
                user: 'lggrcca1wfjcdbz2qv5waz0f7at5u7yexcekoosgkti284d5xxa9azbq56hybnmzpsifdjw05k7uykxy6r2t5i4e7wql7erkn2l7h3ap841d8ozw68tyzih6im4oouvttl486cu90nlcs2bq0rzoygotcjxz0jvpnmzfv1xsmkgejhim6exr3tefbbqgkiuo02jq9ggi5nkv1d6gl3s9ro69n64s3bv2whn9wcw0ma53f78vspznygsqyv90kt8',
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
                id: '59563238-3020-4aac-957b-1e8e91805f46',
                tenantId: 'b583a1b2-557f-44ed-8fd8-7c3abcd717cb',
                systemId: 'c05f19c8-3590-4d2f-a384-427e73afcd57',
                systemName: '3eykfdm9581b6s9ibsfb',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 01:13:53',
                executionMonitoringStartAt: '2020-07-21 19:36:37',
                executionMonitoringEndAt: '2020-07-21 09:01:57',
                status: 'ERROR',
                name: 'i3dqr55rl6oyarugwlbjubexfafwmut4bxq90mgr7il838cwdivzw549lhjgurr64dwl3zvk6trgglubzixak30n4q8k5kyneq3pqiosybnsinoy9jmofvc6d6zfwmemt3099mt08oxgl66jzvaygcuabr92lwoq8fqfdtrpi6xdk35uldv6fni7wodo1a2lirjsyojndocj18jc14loiwwfsdhml6axhflasj0dc0vyi9kxe7p40u65ccw9tat',
                returnCode: 1830839870,
                node: 'qf6i9edb8bnd28nraariedpk6ug4o3kts19a526x72ftgdvoaptnuwe6y67wf0ni4qv3t0yl1jdtmccrnn44t54jhdmumdp4z3cw52m7jpligpgp5er5fwnbv3l1nusim14ngdtigj68k3m0w0e9sgvhzrrij485',
                user: '3wxjqqkaw6pn7wt65j7shyxp1lh5ieyxj3iy3jcsm2ntfylgm0ibpy5cnkdl1vrnk1ycv79eoe844ddqfmlht9y5vjugm2vnmmcmguf6y0g8ukqqlseqptldr8szq63axu6hzaqy291l4v3gcdkjaaglos3nij2v187y77gt53jej3xfflwjmk3skap03dvyf70346bs28yhtxqhprxkcvi21csxi4ecc4pjlu6kbxpjyev58psaf4hupq6tbxe',
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
                id: '59563238-3020-4aac-957b-1e8e91805f46',
                tenantId: 'b583a1b2-557f-44ed-8fd8-7c3abcd717cb',
                systemId: 'c05f19c8-3590-4d2f-a384-427e73afcd57',
                systemName: '0jadv3wfyn523fyyvtio',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 10:21:13',
                executionMonitoringStartAt: '2020-07-22 00:02:52',
                executionMonitoringEndAt: '2020-07-21 19:52:51',
                status: 'ERROR',
                name: 'r86vcybn0j3bvmanlfyb0w5avvniamx217dr1wz7jh79ijrto0u1gm6f45zx31zie713jjar3342gb1x5ji9eezsbyemgwpc06qb4s6es2dwgizcicuxbsy0xk7kajlwr3fiz8ahcclv1j7k3qyn1etnv7mwi4xwozvjolx6qcdm12qbc2v2on51ilscsj94bu70yrithat05cut2hwx6w563nbr56cm4m3gi00h94mhlf1hh2i0ahkdzwz7i66',
                returnCode: 7197933808,
                node: 'vlw0z7fmkq7urt2c1iggnw0k3r0yn33bdn1k279m40msnl9zvtid4kqmg2j35bdywdqe0nc6dsg3qpie2rbav4synpl75v8lovapmkur56i0ck2a40l28hqzyu22zteza34nsvop2cgq4noig1kz1qm4wtd5pcjn',
                user: 'jlespmqs06k60awpuaf84jv4skvzuk0zy0nslwjvqwzu7c8320k1364c6yuy1hm5bpdo1tj7bt15hcp0d8g6ob9zxpnhblq16m0tog791716twzm6qjl60yx2utd29zu5sxvf51spcksxj5xmn4kcw30c1p3owmlcdjix7gb8evyzzxspvb2xk04r9t38bkk6x7isjd8uv36clifdcwjezlt24sr25fcqpa2puwxvixj7y6kyog9w9qe8d1ew79',
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
                id: '59563238-3020-4aac-957b-1e8e91805f46',
                tenantId: 'b583a1b2-557f-44ed-8fd8-7c3abcd717cb',
                systemId: 'c05f19c8-3590-4d2f-a384-427e73afcd57',
                systemName: '3zmjl0x7uqyes86zv9vf',
                executionId: 'c9d8831a-2f37-42b1-a801-34ee35ab2c3d',
                executionType: null,
                executionExecutedAt: '2020-07-21 19:20:51',
                executionMonitoringStartAt: '2020-07-21 21:48:49',
                executionMonitoringEndAt: '2020-07-21 08:38:38',
                status: 'CANCELLED',
                name: 'h16e1fahvok1d89k48vjwrrzxcqxemwfgdcyvnq0io6pnrmq2ab28neq1bt1aflsb75z75bwso5pzvytt3nha5odh8tlg354y3yyi4o3qqxthfel0f3d4no4843hxisd38ta0tn07irnz58s4gh8fx6xr6l4l0dx9lrod0nr4jirpxk6q792dj1zqosc5fxf8kobtkr38qtmshs2ryolbsvy7e0awqjh5z58ghdq33tw5ejrqv9fgno85dmy967',
                returnCode: 8690987759,
                node: 'ze71krkfjyxhowhzxd9nnw3z9em59ye1wgppy0dfu8qtnxa2s93y99yu19wd7aj2khi3vxuveiinzr38adcs5s53coywpf2vffne7ygtsdhfaosxucvynaehf5mnrbk14u3gf8onk9qg3ilxl87fawi7szl2t3d1',
                user: 'g2dpgv3qxy33sj2hi8cwd071cy4ze315up6i6pyg3yjwy0srtk56ywg5uzx94olg15q2id50jgckveqe542sa0rm2zqnf7uo99n652oe04t9qzbqmdsz5zzqmw9xnji8xlokmotl7rrndjoqw0pc2htc4bofjnzxwey2lyfsd4af726nqm1vbv6q8jibgtsf82qd3x55920uuwtnutoak2osglatpwtxd1qtb649omcan5m5nbevzw7uadeh1vg',
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
                id: '59563238-3020-4aac-957b-1e8e91805f46',
                tenantId: 'b583a1b2-557f-44ed-8fd8-7c3abcd717cb',
                systemId: 'c05f19c8-3590-4d2f-a384-427e73afcd57',
                systemName: '8pnu5psrutepwecq8an4',
                executionId: 'c9d8831a-2f37-42b1-a801-34ee35ab2c3d',
                
                executionExecutedAt: '2020-07-21 03:14:52',
                executionMonitoringStartAt: '2020-07-21 05:29:06',
                executionMonitoringEndAt: '2020-07-21 20:42:51',
                status: 'COMPLETED',
                name: 'dqwifumxh4mweo8m9j00x4cfqtecu2mkame0u6kf1c0ydmtj96sflmgfmuh1j5oan621hjf359mzd9fyecplj0swu8ypcn0vhumlcwkm8eohi06d92t5b1ebqifbuuif4rnocxs4rn9wm27g4hem5a22i5uvg80dmk9g2tz5msvvma9xo3x76fnmmg758fhzw32h7ne5i6wxb1vdi76jcqg9bznk29j2ba3b1sl6ppmnhx5kmedvayyj1j4b0md',
                returnCode: 4189665144,
                node: 'jerqd94fqsx7gz37u86efxsu3litqq263ko5e0t3o4qtpoib7y86evraqm1txe59330q3tffcjie3yhtt9yb1m0qsuquu1ul9zcu2veipf8lgv8fjb3tpj4da9snd63jzkzceykm9zlvc1fun63oaxbcush1u27o',
                user: 'vq82kxuzqkzk20bxrkuqv9kdgio3yy3bemat5c1wqs7885uatyoky8qmviv943zokpszz040dv7vlvt7ytnj5lkbs1qd3jvws8i4qut46hlq0l3e6jlcadrh89j042vh5ywz9afq56ifzhtgl27dkk5f6mvm2b1giobi6pwg0eki8lgx7h6d6wqinaynfivs0c1ollz9mb6pn36q12w1m6xhk3wv3cyg6vhbtquefbfjrx0pv2e8wpwvuav3oto',
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
                id: '59563238-3020-4aac-957b-1e8e91805f46',
                tenantId: 'b583a1b2-557f-44ed-8fd8-7c3abcd717cb',
                systemId: 'c05f19c8-3590-4d2f-a384-427e73afcd57',
                systemName: 'jxt290yf6l7a6obq47s4',
                executionId: 'c9d8831a-2f37-42b1-a801-34ee35ab2c3d',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-21 16:44:55',
                executionMonitoringEndAt: '2020-07-21 20:38:42',
                status: 'ERROR',
                name: '7el5q67cfza5gzmaxow9u4pqn8k2qvzzbjen4lbzim0unaerbf8zy795h077ir55cfthy5qwrov57wy46l58hbv2rro8qa5m5g1pdpuwtfyo8funoehf78xoe7z5ya3mrhuftcm586yzdov2c1co5tbmsowgehju4jjseqdmeuttca1ty4j8hoxva58kjepb9bi1y30925czx4nj51ne6itiudrqd5ofgnz2q9s25y4nlm7fjtlzqcpx6u1nipp',
                returnCode: 5298004790,
                node: '55imhgoas5dkpt3lxp3z6uoia62okih56b6rqfwgf2gtx0aydenr65n5m9dwwvi8868vwtzs5irlflg2931fgx6lg8ivpy8blqxnd9uwl6drsvlgln3jkqbrwweopd3w8xcp52tnglrbrjoi40rzc0zy50k68yym',
                user: 'cg6kyv96ysfdfytk2ow53awbzixlgijipkbtnl17s3ga7n8u5kehtca9igaqa8sbwkz23gbp1jd4ha9ptypmfsreihq1re5k2r8cqk193axkd66iztunjkdt9vnbcyrkhvgk6i5gep4qg970tf05is3dsqv5y2fhf6yn5kgh6wgmao9fsdtn7vutjpablx3vwgcz4gqe7u266uq0817o0c3i6rhwixjlp4jhwko1n5l2qyegw1wfwwp5sklq6eq',
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
                id: '59563238-3020-4aac-957b-1e8e91805f46',
                tenantId: 'b583a1b2-557f-44ed-8fd8-7c3abcd717cb',
                systemId: 'c05f19c8-3590-4d2f-a384-427e73afcd57',
                systemName: '3fsexo9huxe1hywjn12s',
                executionId: 'c9d8831a-2f37-42b1-a801-34ee35ab2c3d',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-07-21 23:30:09',
                executionMonitoringEndAt: '2020-07-21 22:41:57',
                status: 'ERROR',
                name: 'pshps20q17v87wv5r9x0bqlljvu6pjbtvimdxa4q7fg85a1q4pf1998f40brhgup64wqfb3m46aeawkzhdgimu8780urauawa10mjlv9f3m07ep163vhmx6pccou76b4g0fbq625t0sc5eqph8wwj5yanm6gzg3dnh22zuyaa22jrj21m22t3tacmdhhes5g4kvyd61kzu2yqebccdzintnx4x26ev5m9r6x3xof6btq6mnxnhutq9824kxcqrf',
                returnCode: 6390041403,
                node: 'zfj0vi8fw0i40f630r2agr45oluu739y76a7ugsfu25z78y9ay44l4fdpf4kya432z4spgv10esu8wx6nbgljc4wmurbq17lf833s6q8tzp5vvwgaar7asl5j8nqn3uyyy5t9kn1ytrle3w71dgsrnmkp2akd37b',
                user: 'dybe30ldejrc0u4lfb0jgu5lq3zlvupk86qqz9atrsoeheavjzagyeambfzek4pjmoowpbn7gmr92pi67y2sb5isqjvambphhyltopsd59h2rey31pngot1genig56e3j5cz1hd1v4sg35d0rn1893l5qrj9mto2o1625awec0l2v68nmybvcstvhxh6vrfvulamvrsethsz4xfs8lpubgdf4ll6zhfby1msg4r4snmg74e0q82qypnmv5lfhpv',
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
                id: '59563238-3020-4aac-957b-1e8e91805f46',
                tenantId: 'b583a1b2-557f-44ed-8fd8-7c3abcd717cb',
                systemId: 'c05f19c8-3590-4d2f-a384-427e73afcd57',
                systemName: 'zgzozksjg85opiass5kc',
                executionId: 'c9d8831a-2f37-42b1-a801-34ee35ab2c3d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 03:28:01',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-21 05:46:29',
                status: 'COMPLETED',
                name: '3d08joq4qk5xjt0s2en61qetov7jrrb8y1eqni6xjzesdqf64furlxk7d4ym1t2yu9n761gqa23qlcjwy04yo0v2hlj35gy3g4ub6orpgrgx0tu5oygmi5vy6xbn6uzrpollyuvcdgm3xd4prnovj19sk0ke62j1p0gad7rx8kxez2n48ypjj936dm67zflfnjjztrkxavprv4tr9y0snj260ur13e20pspzmw2p6znuilyry8fdv6x1vbmlp15',
                returnCode: 9458897926,
                node: 'fhtucbobdwahxbnlxbloqyh81skp6v93s8zbku4e05e46h6sa0je10pboy2rdrbzdrbv86e8459447cwcai7ic3xmzp3izucqm29pa82cag5t9km8630vdpe8b29bo9m2ia4fpvksk98ddafpnb5strb3mkk1zcm',
                user: 'lmecfu0ho3iispmmqth4tv5kgxo43amra7i76019zedcsmni45lr0hv6ahcctf449fy12mie3s4dmwhlvma0pg6sleohf4dxxmoeeq7610y5xw8gl57aqorey9b7exortamw15p8wutkg8nunef86gp6t51qp21xus0ib0aw78o2uhaf6q08elt81g4f33gravomdenf1uqurvzq2n2hbzow9hsun7krb55e1hq9y8bx33qmqc5izj02g3z12yt',
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
                id: '59563238-3020-4aac-957b-1e8e91805f46',
                tenantId: 'b583a1b2-557f-44ed-8fd8-7c3abcd717cb',
                systemId: 'c05f19c8-3590-4d2f-a384-427e73afcd57',
                systemName: '5mgq4z408wg09miyaezf',
                executionId: 'c9d8831a-2f37-42b1-a801-34ee35ab2c3d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 05:07:59',
                
                executionMonitoringEndAt: '2020-07-21 10:00:29',
                status: 'CANCELLED',
                name: 's9i2rhd8uwbojibzgqwdbn4gzc8v2eq2ziwpq7d94tccredw093be4npmt1vx5wh6zin0h56ynwsmqj9w70cl9hw4qelue4lxioqs780qd6p5ry1u3yf3ky69vfanmxx3nvtdx72zdszk2nn89b1vkdyog5n7yvq86b9jj92cb7xe07dwfjjxlvsscidpe63tw7ihnlb242e2x1s2bs5c3niil6elqssf8lzaq52a1ytxe7k1x35le7ttt956ya',
                returnCode: 8707107305,
                node: '1yzyemn8p3j2p2n814f3optiv5qzqv87c9ay95zj95swi860ay89r4r5mzs30gdc1tjl1ehhbnxifbcrj03rq9flzg6x42df30tv71zp2otyplh1ofy5she4lb36dtwj4jiokdl3u0lzhy18w7nc16lib0qgzvdt',
                user: 'gbowmipebo65r5omhbf1mt83lxreypjpkr86dh4mqmp51l2o3u6tkhper285sgux2whzpwjtm4dhd2jbwpggly7u97vnoy5uk47lh86jquevrn9vzew91smtpptruvfxntryxsm0txe8988j6tw12ui63mpff6kie95byof3lhaeu43v45f5hmsnsxshxxup6arxdlcg702z0plq34yap7kthgdsg7tar150dgnl6vhzecq55a95ye0sl6srazk',
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
                id: '59563238-3020-4aac-957b-1e8e91805f46',
                tenantId: 'b583a1b2-557f-44ed-8fd8-7c3abcd717cb',
                systemId: 'c05f19c8-3590-4d2f-a384-427e73afcd57',
                systemName: 'gsh5xfx6ow4prcr8kxjb',
                executionId: 'c9d8831a-2f37-42b1-a801-34ee35ab2c3d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 16:05:20',
                executionMonitoringStartAt: '2020-07-21 17:41:07',
                executionMonitoringEndAt: null,
                status: 'CANCELLED',
                name: '6juuf97zlq1xboxrkefgsjnf6a6g6wq8oylfhcacbf6ajw5m9qo5azz5n3vcpmzsj2nyvf1n4wmctpw6426q1ms5yj4jk3swqr7mjq5b5sz2w1a5uzyg0xovl11qv1xojli68b5gn8crnge9es6as9humshr2i8ybrw0xnc3sqlov8gh3k2eneg37rygrc70xpkm2c86osreb42wr36zrfz3knb2vppvz2wgexkn3pcipud5orp2vhope5fca03',
                returnCode: 3583021878,
                node: '8f8b1jx2cvk17aiq8874oe8r2pz04jn3o8tvcdj121xe1cxi4qrrsfy36ve5kd5xnqjpgsyk4tdujxbrz9p3vis78hhyuuflfdt9h3t69wu7z4yhd2waojsn65slnl31z89c4cf44bi32r2r5wwd2bmjj84elyk5',
                user: 'nj39ixh84j9mn999v8mtk523rv3i4smnthp1666s3m39e0xt6l0sw63p3o7u0su9z45diqc7plwi6fnehf2snhuyndpyokjuom3qnroxts4hs0ez4ikcva0spcvdqd34dvtd3ttl8b4dtipc48n1x0o8fx6i50bfnziegw8xue9kzwat68o1iblmw0llsg4qkw9lftkapvm19xuas02eeh678gdpikvssyo4kfic5jw3aorqfkqh0udt3wylz3j',
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
                id: '59563238-3020-4aac-957b-1e8e91805f46',
                tenantId: 'b583a1b2-557f-44ed-8fd8-7c3abcd717cb',
                systemId: 'c05f19c8-3590-4d2f-a384-427e73afcd57',
                systemName: 'zwmdwb7m06jftsy6e66q',
                executionId: 'c9d8831a-2f37-42b1-a801-34ee35ab2c3d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 07:32:35',
                executionMonitoringStartAt: '2020-07-21 08:48:09',
                
                status: 'COMPLETED',
                name: 'r0whtnhqufvtawo6yh0tvgr8n2dr06bm1y97ey5y18cax8ecc6vvzhbpsfx7m5ntb1w7lc82yp4uhwx21lht7rmgsffasmkv27u5pxmh3zhpbf2gjr8r3zszetn7l516jh0h1t8lmcskio7n5yrmxat7o1sxor4sqs5abl616qm52z03q6c7afa18m4acbwk07zncqf6syf0yruwfh95lz9mutla5zybj74xk0cyo6ohcj2deeo59batesuu4hs',
                returnCode: 7769720532,
                node: 'rx9vrmv6rzviko618g1its3vf44kb18ootfmpdedtmv2iwtuw7xuckjuya8a1qunmfrbhs1l36qr21zljtupenkdi70eg0p7wmw90yw6b7pd0k8zhgz5htabnhit1w1kaiap91nqvynzl2q4sd5aym7w4il5y16h',
                user: 'rfy9lt3xh3qzt5xhtsm59foi5blqfzs2tgeozh6x1xfmxsssgpvbferapskcnuon6o6bs2im9gl46ciptmctwkkot8amkgihehtn66bw2gmo63y63zyi45htxcnp6zhx273p6946ap2s9f1owmhx7gw1xigiym5j6n5dbqy6g81r07nqpzbi0hu6r63phaw5f52v3x1qcyvsydv6v6nbeu6xyncpql266jlg9ntwos7ecxvket9s3xez4h1qroo',
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
                id: '59563238-3020-4aac-957b-1e8e91805f46',
                tenantId: 'b583a1b2-557f-44ed-8fd8-7c3abcd717cb',
                systemId: 'c05f19c8-3590-4d2f-a384-427e73afcd57',
                systemName: 'htb2stnf06al5vrz5i2b',
                executionId: 'c9d8831a-2f37-42b1-a801-34ee35ab2c3d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-22 00:12:21',
                executionMonitoringStartAt: '2020-07-21 08:21:26',
                executionMonitoringEndAt: '2020-07-21 14:31:32',
                status: null,
                name: 'btrqzkyzh5sgxx92sxubbbev7v4ydqo035nkzcpxyqplwa1emy8gy2v4cd9zjdgvguu2ybj2cc9bn5ptx1x3g1uy52bl6nfzbvzt656lksbip1knfbwsmlu7j8959i921z4hlc3kadotxe2xmlgjiy7hobityq0gr2zwswq8iuw6oiugvsa7wqrakh7z40nt9hj51gul7cmiiwu4t33uapnym74vokdlanbwr0oqlrhna67nwgok1wqq714yrgk',
                returnCode: 7671207972,
                node: 'xrf1nuliildv8qtroc3ddrm7kg7ig0k17nabtskhcuqb0k70f24d0uuec1lpj4j1akgtj9bu78v7nw1quxujbh7c2mpryl8k6gs2k2a54ya6ko0hqd3f0prbunobla8d6gxlsa1tv3065k6duijgzc981t3dt7m9',
                user: 'l4ulk7cyumxwa7nuqkpwu73qskdkx9orv12dyvd1b40mhz1n03t19a0sizpb9isxjiw2szqh73oks8umug2gn35g80ulb5v9if1q61g6736ymel1f84gaavbn2zx152ulvt630a8emgdhp71uj63bddnp4gxx9puljoob839dn3ls92y9krm9fuompczccg2n982ghsb6otw17etanl1x567elligk6j1sjlo95w6vrp347ym0eih417h5vb3vt',
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
                id: '59563238-3020-4aac-957b-1e8e91805f46',
                tenantId: 'b583a1b2-557f-44ed-8fd8-7c3abcd717cb',
                systemId: 'c05f19c8-3590-4d2f-a384-427e73afcd57',
                systemName: 'cvvh54lna2pari05asrq',
                executionId: 'c9d8831a-2f37-42b1-a801-34ee35ab2c3d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 09:59:31',
                executionMonitoringStartAt: '2020-07-21 11:55:00',
                executionMonitoringEndAt: '2020-07-21 11:29:56',
                
                name: '0e4jpgvy24abubm926m679tyqsz8nrygkwfuyb97qkyf03vvmi3zgpwl6sembzgeb6mttdkog5rqmegdldr1gfp8e35sy72f8uissxzlkeujnnlg52hehi0vy8dr362hktodr0v1cnvcgmifzdf17bldkigczt0o5x9wukhom14n91rxsu60niwxt5b5amo72cor3v0puf7r1qmqeooijlw4zzrkf8ep7ti5pnfqeh3ei3e7n2bg5ljby1eyiu1',
                returnCode: 5797792084,
                node: 'e68m8s7421hjo1ere6p01ajhsu3ogk8i30q6py2hzyfj0eoawmcfu5gfku3bfx5ackbfn9egvnx0fzcsxjxs8um9b1y6q0ws1ffpgujjh9r6lzlc54dxfvvpo10ojipnsdnhmu8efhd6a4wx06mz2lazffoitugj',
                user: 'iwskics4xdab6wory7d2ua8lt3bcau0nv3vm0xr00h9woz78tdv5rg48jzhhr4re20wq3xa3irsfyljp4dp6rqkufb1nloo0oi4hmqwys19gmd2mrf15s6t9j094402behvusqp477azbi38eeeekzqtjg846xestjxx0r005una4drwckyg06ovwlnrvzuo6ttblqd99hwv14ck3r6k78h9jmpym37n43k1b31skjamw246sxewemdnq39xu2j',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailStatus must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 's549bvshe61yuuemctmdjlbktgabg7hllbzzw',
                tenantId: 'b583a1b2-557f-44ed-8fd8-7c3abcd717cb',
                systemId: 'c05f19c8-3590-4d2f-a384-427e73afcd57',
                systemName: 'h49ywqv1wljp2sskbo1g',
                executionId: 'c9d8831a-2f37-42b1-a801-34ee35ab2c3d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 21:37:08',
                executionMonitoringStartAt: '2020-07-21 11:24:00',
                executionMonitoringEndAt: '2020-07-21 07:25:33',
                status: 'CANCELLED',
                name: 'p0o8bj3jaskpywqiep8kvoo9ow17sup3s7il25jkqdlick42pys3ameydfrlz82vqyim8ev2dp8dwugnacdijgfxb2flwrzsjlc537uiusvlrxweec4qveeeugsmjtz49b0fqx8mc7hut2mbfu41s592wpxs0h9dk2l7n37mf1ndk1na7dhhbihtc0ullepis8jgxdekbs8aa3qnoua4ugka2isndwsmz8pcwuoidrdssnd5a89guuf1838a0lz',
                returnCode: 1863961757,
                node: 'rhp1nguz8pje92vbjdg1d5frzy96xlafo7y9yx5rw520h3pbiy2sbpachf3j2x67w7bc1j7s0quhgorxflg20zw2qlo0x5b94epbl4jrq1cdss0amve9c14yxhxk5p4kxdl2mwi4em3trqktjjfi82vqepfsjxbl',
                user: 'zpe1rhkfp88mfnbryfo869diw65owie37g1ztw110sjt9d1l3xu2xn3kn9zchfg4lydwz89ichjdftv7j4gpj9prhnm1zyerrxozscag2i9ji4xyvvbhidhfr7np1s3z8oa2599xnt6uwpdd9buybym6e0knovr77tjxqfgrb88dk9doqsqjsz50y0zjkwjxhkpx1h6spooqd8e0yya8b4wlj6ohx7v3k9uxjledtpv64lezfc6r0sjj8t3pss0',
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
                id: '59563238-3020-4aac-957b-1e8e91805f46',
                tenantId: 'hshj6pc9w3vzvdzxu2iq8qxll1d649lqpsj9k',
                systemId: 'c05f19c8-3590-4d2f-a384-427e73afcd57',
                systemName: 'n6zz667yzbspvng40t81',
                executionId: 'c9d8831a-2f37-42b1-a801-34ee35ab2c3d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 04:20:11',
                executionMonitoringStartAt: '2020-07-21 13:24:49',
                executionMonitoringEndAt: '2020-07-21 08:09:55',
                status: 'CANCELLED',
                name: 'gtick25g9f41dm8oyttioswsv3yxvri57j5n5q7ql28glkd3ko5efy40ehgqwzeuacf235rjab8270kmyo0prvxqazm83akuqk3dure9q06a876iyqaqsxtwsiydppz02m8ox7zmxlyxp1h5johyzfcfbgi6ljxzahpayk0bun8u0e9tkizrirdivzt4e72w466xgxbbriiuwo5ah8o1ychczz2786000yavybdcdkeefko5tweo2elv6qk4l1f',
                returnCode: 8259992999,
                node: 'm4t7bhakpwujepaaxqb8a66k3j7ir3szwui6st0rstw7yvy8xvkllebhhociq6hff9pcmw2ym1q7zl5g2ni3ra7bvkb1z30moce6oe79j0zxgag6nmp0v7p8ew6qt219zof59bin1jxlipbi0ayrro14kbk2ur66',
                user: 'tmzro5qw1pp7jfth8whjmy4lzx1d7ns6pc88bp80gcc45cosem3zpw0upbdk2ry5rknhqxkolt48rwc4ipx9cbprafxp7n8hcfu0rwplyj1fiqoj0xx140wqxi72nh8koy3wcacgrn5xr4ll0v2de47obq2a1axdx79ive7sdgwu4oczpnz1pkwav4x9yl8v00o5uanqm0r67ucvzx84ix5tybef1g72jxnp2s8fyxduqts0oevrcig8n11bj49',
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
                id: '59563238-3020-4aac-957b-1e8e91805f46',
                tenantId: 'b583a1b2-557f-44ed-8fd8-7c3abcd717cb',
                systemId: '5zgl37csidheu30m8956i50s4rgjazpj384wt',
                systemName: 'hw27obg5jtmmmgxpkb2i',
                executionId: 'c9d8831a-2f37-42b1-a801-34ee35ab2c3d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 17:23:18',
                executionMonitoringStartAt: '2020-07-21 15:28:30',
                executionMonitoringEndAt: '2020-07-21 07:57:20',
                status: 'ERROR',
                name: 'naan9kpdar688f1ige29c2szqwncuxf0anvpwtncx6rql4hg8wniyw2ixc47vdptwv27fneiyls6feyld7w74rt898ennltwo4sa5z5kgxfcupylyetsv3uofv1zml5x3abr5zlny52x49uotcsebqut7dbyuyo2ji5azxsypu3pav852ob4yjibpvs5b3qvhv2dp0qqxf8ecjl28osb5olghnn4ota83vamfkvxqtces5z5zhctxqmv72fbqpy',
                returnCode: 1352596085,
                node: 'sglk0ketqhh47z544npbhzhbvmfqq9bc9wbcf5me7vjx8mxpfyl20ji8fwpdk7uewh6xmmszrgil26bag5h20p9angx22ve3rs0l0gtydqmp2d19e1vsfkbx7nt9hdta01sa2tcv4ryjr6qjngec5sscwfrtzcf0',
                user: 'uz9z1qb47ol4frswqhflu5gsbbqqdt11wcecg024ckrrx91hvzlfd1344upy16pukzifn3v32dsq03vaomdzlrc5imiuir0vks647o7aniht3a6hlpf3uul7n60h0ua62s15d7t2d8tjnnag8fxg9psh733bkev8ufkyfl1rffi1mwi6pz8c0xsubvfj23b96saoo6rg8amn342enm7p9ak8flilruafu4hdzjuy86xahewmvcide0p6wlmdj9z',
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
                id: '59563238-3020-4aac-957b-1e8e91805f46',
                tenantId: 'b583a1b2-557f-44ed-8fd8-7c3abcd717cb',
                systemId: 'c05f19c8-3590-4d2f-a384-427e73afcd57',
                systemName: 'ejfqchn4ssb5pk6z690t',
                executionId: 'k5kjn58vnq8uzq11eac20ywa00o1ovyi24xq3',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 02:46:57',
                executionMonitoringStartAt: '2020-07-21 21:47:35',
                executionMonitoringEndAt: '2020-07-21 10:59:28',
                status: 'ERROR',
                name: 'k42uazjiqhn0uupd58cs709difljjk92tqj0zk6zc0pb4i65n9t0wzo3twi6j98rfjt33tjswjppgn284ao3u96n2mz5g489team1v1mun26gmuwe6scku95zirvdxc8nyi3r2g3fcmtvo48lz83pnrpvwi1cr2nn4o6obwugf8907ub3v6j8n2hjcskdp5udjfq4r5vhoc7vkf3lenhjh5eb39n6y1ihc7975ij07yij1i4w88vx0u131tc2c4',
                returnCode: 6735432953,
                node: '2ja0xau9m37cxfm0qb7cedpo9b05qv4sbhgtdqlwoi8stxvdb4jics641hekr4z8esan7575ln8r3csn4vmfyx497wbsuws1weyb9bd8abz3jyiofhe4bu3zz6ic05vjkv63990pgxe23vxr7vfvv29jklwfhcez',
                user: 'wvv12quaigy7bhlum0wafqkslj6e67sx63s0umfhzzogcl0tb3k3mchbomoc7zv0nd2ffrt4eqv2gbka4co5sp176hclhgwsutmroqhsz0lz40smhq4r4tlsv317sfkb7p166o17t7lbfdqx3uio0smws5ufxmxp9djbkqyxblix95c52wpj9ekwjgx71bk8c9diw4mlinwzrsm1nuugdbscn3jq1gdjbfmcj3fvm0ahk3nbhldwc8ev4ywnc6z',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '59563238-3020-4aac-957b-1e8e91805f46',
                tenantId: 'b583a1b2-557f-44ed-8fd8-7c3abcd717cb',
                systemId: 'c05f19c8-3590-4d2f-a384-427e73afcd57',
                systemName: 'dx5hzbi6bbh20u0511qtt',
                executionId: 'c9d8831a-2f37-42b1-a801-34ee35ab2c3d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 21:33:30',
                executionMonitoringStartAt: '2020-07-21 08:17:06',
                executionMonitoringEndAt: '2020-07-22 00:42:22',
                status: 'CANCELLED',
                name: 'cy7ba5hjccaf7u2b00w00vbw36fug7qf2bnrutlovedsg1xselmnm51lsu2v1tahcvd0rmgclhagnc6j8pn5fu8u94r6iy4bl0mp4uzpquofogxxztxg8bgm5qi7263obtsdmik0wo1crct53hfst6kepd7f3e214ol8eyzftgeiobfwl92vwmmddrvg6f8dtbnejt4ox2f426rnbt3asuvaailfhdyo5ib7yezbu8ghyim1cb7iauya57guk9d',
                returnCode: 8728396968,
                node: 'xe1msmufrpmezyheou5t3t6uk1fucvxbhq6pbv4k5lkm4tvpk94lmjebwaqxqgar0klhvnx2myju3cmhjyuxviei6x73xy1pi4c8420kgauhbe4318hwy2pimnkgsj0bi00hw99s4qyj59f9y05yv5sqow5x1iti',
                user: 'ntnnyljl3upxlqgu9wl37go4xi1et2hvy8829bu25kqnkkg3cx0ue08flkx15nlqs5tge2amgz6bavjjc9ygpdpl3bp87objmq3n1ymp5j4pnn373g00h2757e55som0tf2akw4b1f7plzfuwwyfnggo4bmfkhqk3k1zvx5fv57y4p54rp0ghcgok6df0hxv7xhvndondeqaqpwk3mgrhexasma3p3f5tcvjlwkx0bo4ovddwimey6gd03v86gv',
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
                id: '59563238-3020-4aac-957b-1e8e91805f46',
                tenantId: 'b583a1b2-557f-44ed-8fd8-7c3abcd717cb',
                systemId: 'c05f19c8-3590-4d2f-a384-427e73afcd57',
                systemName: 'djzizimnumn9wk1n7prj',
                executionId: 'c9d8831a-2f37-42b1-a801-34ee35ab2c3d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 20:19:09',
                executionMonitoringStartAt: '2020-07-21 22:06:33',
                executionMonitoringEndAt: '2020-07-21 10:41:38',
                status: 'ERROR',
                name: 'bn50fxdbcd6n2abg6p1sqo64ytcqfka5k3eny2x0qtebetlo1tj12rp8e3pcwgvu0l7lrx2ybc1zgovy28mkg89cxxcii9d3nyk88fqfs7n32h2cbwek53qeuwz81iiw374wkwqj0x9ln33u18shvhdrlflz0dpuhhpt7nr9jx0d5y2ggbvpd54fw6a1mhpnkihrfvvz44df929baaigczy9dytxq9ektfwjeqz8a0325cipaxihi5urw1qz98vz',
                returnCode: 8866071197,
                node: 'g1jwkvhfg4pvoy150glw40vfyws8ckja0zdntem8g99su6nsc4d705a12tnj1oboz3yjs70tvhz3ih0q69neu5tjozn3pa0c3013lmticxb782u3sxjumadgja0mfejw9o5i3l6l66zvwlmmk7iwdq20qcqhayjv',
                user: 'a3c5nvitmpnied1vlhpgki5j0k804v6dueio1p41mi6jdday1pbv27lpqqjlhm683dl320qbvxvmbi8zo75m908vgwsxhf8flzvwx4xocf7i1a9prjv335uqdmgv4rh8fn2j8lyyv5jtwz9scczf0jw182mkscs3i2tbc6z21ibo2pm4wk4hbujsjbunt857twwcqfqry1g4w59sdxl96rbrcuy4c0zjls3jldjccnl4uk2clvpes4fgrss394w',
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
                id: '59563238-3020-4aac-957b-1e8e91805f46',
                tenantId: 'b583a1b2-557f-44ed-8fd8-7c3abcd717cb',
                systemId: 'c05f19c8-3590-4d2f-a384-427e73afcd57',
                systemName: 'js3h6a3mx19hw6mqa6k3',
                executionId: 'c9d8831a-2f37-42b1-a801-34ee35ab2c3d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 03:29:17',
                executionMonitoringStartAt: '2020-07-21 05:37:45',
                executionMonitoringEndAt: '2020-07-21 05:40:28',
                status: 'COMPLETED',
                name: 'aiwoi8k7x34p9ovv2o6f9xka70gvppmj8kgtf4b7y6gbik6chjtwbjn9b6im6ekr7xfaaoifsaa0qc8tz9wydkez5w2jp5vsulruldk9fhmxqlclm1aivrwqm55rbf6jpwpc8l37t1h8tvk47os8f9dyog7f0na4gmthcej8csftvocykb6xk02psf4ak3jm5q39hoh0zp4wg0uygq2sfwh93zz6tj4sxiuqd7rb0qpl3diajsnxgl7e57xvntj',
                returnCode: 64765959173,
                node: 'tkpmw8upqepka56j9da4gfzjvh1wy1ten9sjssir1kfjiap88rqhdfzeet4l3ouob7yohj974z7lkzqqszs5xmbom9561au4euqdfxf7kv1z3vmthbnpmm3eoge7h93w102asqwevclxiuyzpp7w5tn0c6p38ryw',
                user: 'jjoy3tqq8gdafxyi60qkvn721txsyt2crugeltz45zoyk42rk080nvurg1tb6kf36djlimf6la5ipe23g4brshpqad1x8c3kjq8uo9o18ybh153mofi5nbjd9d3ydvpee89sk6zdrm3j1jp7yi78t7tfdr40vptqre9tkyj79j4hbnnevn871ybapd9kvdixqmyh1bs127yz4dkmbp3c3twsef1yad4dkhu2ovo6nvbfjoc1gg42alvqx195lfc',
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
                id: '59563238-3020-4aac-957b-1e8e91805f46',
                tenantId: 'b583a1b2-557f-44ed-8fd8-7c3abcd717cb',
                systemId: 'c05f19c8-3590-4d2f-a384-427e73afcd57',
                systemName: 'f78wtb2ya8upxzrlxa77',
                executionId: 'c9d8831a-2f37-42b1-a801-34ee35ab2c3d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 22:02:05',
                executionMonitoringStartAt: '2020-07-21 06:35:16',
                executionMonitoringEndAt: '2020-07-22 00:59:25',
                status: 'ERROR',
                name: '1qxr6vxdxvjeeqdn9zq8ov5wai99eruh0emcicv1fwmd4u581zrot8hagyea8d7gbmqdf443ri7qeo2oobsy5xuou6k9ifiyhyngfreg8gm4wl53ybhafllwdt20l5ayzsvuom99msdw71nxyu2hm6p2px88uyeirqp9i2ti1oolu9taqaputkp8g3vois0jxgyfvdwg9r9oce21hn7am2d67f2ht4j00igx9x5airx0h4jubbyfqg4b82y834w',
                returnCode: 2573274238,
                node: 'utk1fazkech1e4ap475smy6fvo9xlbf5mif8vseplqahug9yhzrxpdgruqi4nzjlfgkg38u4dy6em1czfyiwdbpshaagsbaifkjtx8yj8czex7anzmxtvswdjwujmr40t8kg7xhuvy7q4wcdf19xe5l1tu0ghqlum',
                user: 'gauun5fdqun52v5qruf1ghq2yer1802b7g9sigbedxkyzpkn4jeh48su4llarlenkxe4262ksd6j3vhy430seaed6mg8rr17pbxrucwp2o8h9nepzj4wpdjpw9xzu0cz9t2iukmj76m1qto29m2kzjoi160ye60jz0e07rg49a5e1xahx5k2la305m1smqjj3fa9zdjymjunxjb3nqpc84g9k53r190qzkvxu6dfmm4iuywe3xw6texlot115r1',
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
                id: '59563238-3020-4aac-957b-1e8e91805f46',
                tenantId: 'b583a1b2-557f-44ed-8fd8-7c3abcd717cb',
                systemId: 'c05f19c8-3590-4d2f-a384-427e73afcd57',
                systemName: 'ddfnkelnpqcnk5ipi170',
                executionId: 'c9d8831a-2f37-42b1-a801-34ee35ab2c3d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 20:34:18',
                executionMonitoringStartAt: '2020-07-21 05:29:19',
                executionMonitoringEndAt: '2020-07-21 16:39:46',
                status: 'COMPLETED',
                name: '9ksiwvrmbr2g3532ukssyid4ree437frcjdzq4xovdp9pcsrqy84rssw4byennkbt5i79luimm3l3gj8q0z2u0rh4dofyz9cxqa1py9fdxcbx1mc1jl0h43nfwrk12hj2x3oj68bl98eu7x7rvnp2vnkqkp4zjcfdb8qyxar0ki7l0r7no2jowtgavt1yjadyarpigcgrgih6ru0yq71qljypg15175d6agtujq965lt9hcfsg5ow68u8msborr',
                returnCode: 7070907673,
                node: '9ukgr9pit0s0ry3e2pt6cm378t1htr4zye2mnguavzowjx6dvnh6h5wulqepnxupjrxrw6lu2uwnall34ktjl6usxxulm3tuh5hsyb5kdl3if5lrrvnrwjk662gbfodxk1she8rssglj6ozzikwannm1pzh6d7io',
                user: '2oitomwadmyysyrf8zqwbq4tvb2wi2ohcdav930sajs3ptuh26pw0iusjc3g8hrmfbx1eu4xnpeootfb4iysad0riwe6edumb3t0dkmzmui76wl1rkovx0nljndijheoxzu4s4g0mxkym4f06hvow8pgrrn7o9nkxx87mb6qi6ht3hz74xqtjslo703tukw3kcrtx124g8w3x4d1gb4h34imsn9b2fu53gsxepr2uz3r9jh0gip5vn3zoav721dd',
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
                id: '59563238-3020-4aac-957b-1e8e91805f46',
                tenantId: 'b583a1b2-557f-44ed-8fd8-7c3abcd717cb',
                systemId: 'c05f19c8-3590-4d2f-a384-427e73afcd57',
                systemName: '63nv1kpjn0dq46b8ybuh',
                executionId: 'c9d8831a-2f37-42b1-a801-34ee35ab2c3d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 18:30:57',
                executionMonitoringStartAt: '2020-07-21 17:11:48',
                executionMonitoringEndAt: '2020-07-21 12:27:08',
                status: 'ERROR',
                name: 'ahaoq26nsq3lmz0nyb7smvp1zfdlbon00jp3ydvhfjt3v4r9btjbuxop9kgptnnlp29wdc9v5ximp978dt4m5idli62vw16399anc8erqkk4hy09i5bnw6t8l99ueyyjlktquhzfceq0yrys0f1a51sv4cvlct6wsio8gi77gkqs5h8horr4skot5yjb5ajl6oe3t1p3ecdlpb83mlyys0n7sz6nac4ihm671d2k9m4c3gghmw9i7sfr8a111yt',
                returnCode: 100.10,
                node: 'q1oupriqb6pxr81ygjw74sy1ld24dtb38frrjwrfjecteejhxchsk950oa41qmaextdmaa3yd5ku76b22libjbmk6h2qrel6xpoaxfad3hxq4lvcwdis8qxrzldv1d8w0ugemwj4jly27q0j92wik59t6ktmykwv',
                user: 'irbc4wcnmf8ppchw4wp83kl07qgnexlbs1g25dtw6zdvapvrautmpn423zqb23svm9but94l4zhe02sep4zkcvmq6lr9nin4uvjjyjcf8balvq7uvylqejuf7yfz2kdqi38rtxtoo3uwsfzn1qbx7gkyg6zgo95s1a44mu5o1o643k35bo7q8zadeyga4zta1u64506sn14h07kwg63tddr1qqg40qw87vg9l1kxf5pw23dhhlgt3cn2rg4dj50',
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
                id: '59563238-3020-4aac-957b-1e8e91805f46',
                tenantId: 'b583a1b2-557f-44ed-8fd8-7c3abcd717cb',
                systemId: 'c05f19c8-3590-4d2f-a384-427e73afcd57',
                systemName: 'z3awp5kwuktzxpfm5dfb',
                executionId: 'c9d8831a-2f37-42b1-a801-34ee35ab2c3d',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-21 10:02:05',
                executionMonitoringStartAt: '2020-07-21 22:39:23',
                executionMonitoringEndAt: '2020-07-22 00:36:59',
                status: 'ERROR',
                name: '1o6128bo8a18zbzd95j3zr2ddzjz5m340afvpongoxdbhdyde8cp5we5qdw9hhep9h0suxamj1ty2h56f98dbqx66e2m0ny0mhimdmvza7skekn65o7cw4z4cdk3ydzn0rzynhuy70utdehdbqq4vukpto8mn3ke52v8g6vkj86e2sys9b5k9maev73ty92i3aro89bcjv6lhgojhn27rfccq9gwcp7ok03jsify2mjefj7qgcejiwxdsjdyrn1',
                returnCode: 1214803010,
                node: 'iuo9jm73zqm9zsy07484t1dpj0caolofafgyn8txxqv0teb6cxfibf0sew029hlxti4xsy5457n0o4k6099n1bbchcrc58wru1p054o1bvck2nt7sbbya9yiz3x7yr2ieqzuajfd9mo9vfiglbl5h3lufz9wa7ts',
                user: '3810qfjpkji5lpp3pxm3vgrutbpmed7r69kpsgoow5shxgueocfaw7hl5rejksr6tc5g2r24z4crf04jx2r65lm1oeyld9mnxb9kcu935diwc5ehcmnyouvryp2ke5fasyobca39nr7zvdqdx71pzc1aef0tzqqm5u0ig5zwqlb2sm7zkp94g1jxtzph6fb6le3uoejjv6xo6nap4t8a0e49rjfbrrb3998b9whcr8e8rz2fo6fdchk6yq5um8w',
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
                id: '59563238-3020-4aac-957b-1e8e91805f46',
                tenantId: 'b583a1b2-557f-44ed-8fd8-7c3abcd717cb',
                systemId: 'c05f19c8-3590-4d2f-a384-427e73afcd57',
                systemName: 'k6lsv9so6c9eauts7yfa',
                executionId: 'c9d8831a-2f37-42b1-a801-34ee35ab2c3d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 12:12:15',
                executionMonitoringStartAt: '2020-07-21 05:57:36',
                executionMonitoringEndAt: '2020-07-21 23:11:12',
                status: 'XXXX',
                name: 'lx5rnc9n7po1fjqfs5wbl7vo1g1on3tybavfcb49cygo3vt11o8n0w4840r562wmf6a1gqkot7i4oszlqk43cp9en72fu5ircv7m4ugozgaqgtd6jou1eum9df7ufy73s43de52tp8u059pb7f3a2ouc9g1pgnqiomr4ro6fe33ylpwngoo23fjdlg03gdno1azxqe37cgqt8b728fpc04gt4s7ri85culpvoq4o73niyw3tx98xc2wy8e74h49',
                returnCode: 1001113329,
                node: 'nph7aigswneoagoz8r7dwpigxfnaek4bhfeyxkbfc9v3o6ggauej44rxhudf0pxhz4afp3xhkolfrrwes5swiibxqi0e8svsznbd1n0oy1q36pi0r24n8zydxt9x7axcxgkbyy32b77djig5mzhbpicalb7ngvky',
                user: 'giet27iubpdvhudn9r2xizc0wgvnvephvdnl50lg1ffdjm61rssbtneojf6j1jfquzvfaka1hlnhplcsm3glrrr630aodjdvb8nkw3nzptf3olu7w08y6ur2pyjqdh7fxo2mxxxwyplqvnfoxhp6duuegh7wcwc57jjexayz184fqd1j0109z34vpo1r1vqlckoo8g0lknbx1xdfeqbm37ra9oftkrycuv6zuinq4ezlnxrmvgkz44u85vhrcpu',
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
                id: '59563238-3020-4aac-957b-1e8e91805f46',
                tenantId: 'b583a1b2-557f-44ed-8fd8-7c3abcd717cb',
                systemId: 'c05f19c8-3590-4d2f-a384-427e73afcd57',
                systemName: '9thfy676q08e5p90ic2x',
                executionId: 'c9d8831a-2f37-42b1-a801-34ee35ab2c3d',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-21 05:08:04',
                executionMonitoringEndAt: '2020-07-21 18:17:02',
                status: 'COMPLETED',
                name: 'shyysqiia6vqcv0jo1rb3cmm7wfdgak5a3tdbithed7r22q0tcoslmcuwgcwwcnqnsv4a4rkaxdjx9pmwj2p3o5dq8xrcx5a8hrs8u1dscok9emxe250tbjyd0f5z8n9gm6waf7ythvyxe26d8qsfj7ebwmuxx71v0oi307k3eewhb8nzbvsborjnxkpujtvrvuyih54vsj5i94t5e0sciqvaaeh9jyd57qdmn6n48iveajhi1lbwmuko0ic5mj',
                returnCode: 5544059142,
                node: 'l4dm20umx42nttipdqxse1nciigqb28c45so7idgr1sjcbwrhkm61jcriykudhe3sqnffxawxy1qhzg7vz0hu9hshw6oben14c3semewxveu8g1mactl7pu6p4qv8svj1acp2c6rry6whp66thj40hmzt6znix94',
                user: 'wfqwi2x956gxrh5wl5gsg9rdjwfd0tdg6snl7hjaoxbbrxcg3nskm8wfjhth2u56crmg43bw3vgt2ckwttt32qp3f8jx87yshsfi6da2xisd1rfdah7179ymj31tvv1axvavas0rk1ic33d2xc6hpydgj4t2e8sdoglmhab1kiucqp020rkdjy4oskm0lyp24htaeq6wztgxrhetgpx17ua5rpsgmhpnzxjp7uve4wmw88urxo975hjfrhm07wk',
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
                id: '59563238-3020-4aac-957b-1e8e91805f46',
                tenantId: 'b583a1b2-557f-44ed-8fd8-7c3abcd717cb',
                systemId: 'c05f19c8-3590-4d2f-a384-427e73afcd57',
                systemName: 'vni1pq28xi3jj6luqvqq',
                executionId: 'c9d8831a-2f37-42b1-a801-34ee35ab2c3d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 23:11:28',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-21 20:26:06',
                status: 'ERROR',
                name: '2scfu67lpqt8qkxjb35ph247v60v7zqdzhsureq2zgdi63c61alf00wqmgzwavsl1ngrrd5xtppnzadn5eh4q2yh5qvliohpwk864pb97r998h8ci8ioca0ov83v046wkws6t4mrjx7kysuwraienvfy9m332nr0yso8tvqg5vo81kxo5yrorwl5yk69n4mr9nfjtsiqdhopddi48e1zk7zh7yuln6agbwzetyxee7iy3l6g91dxl28q3rn4n0l',
                returnCode: 8068394175,
                node: 'go2z19zep048ykbacjq9ym268yuhkjqyhrtlj0m99ej5qgvr4k9ipcw4bus4fqmwahbod82c5q6xr6u9p8onpus1h4tvgkd65e50g6y0cji35ovxbq2g54jpt3uo3vopw38i2h9h8giwj70ei0fii38uhlyaw9lv',
                user: 'b3zdft291ae5hb5ipdlr3276nwv4botukykddphewd63ew19qb6eabt56so6s368fnz68kmp0f0levqbmr54j6ry2echqziq92amxb2v1keyl0bwhe2jsxfvfoprakueo7npieigs6ooqdl5q03f7v8kohbjet9ef9flkmjle3zgvjvhgxvi806ekn9hz117fkue6bhjifi4d446xeez6hs4rlan4aggahirivrgnhdbul26h7xluma661jna44',
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
                id: '59563238-3020-4aac-957b-1e8e91805f46',
                tenantId: 'b583a1b2-557f-44ed-8fd8-7c3abcd717cb',
                systemId: 'c05f19c8-3590-4d2f-a384-427e73afcd57',
                systemName: '5s95a9nuvx30sj8dr8mw',
                executionId: 'c9d8831a-2f37-42b1-a801-34ee35ab2c3d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 13:18:03',
                executionMonitoringStartAt: '2020-07-21 21:56:28',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'ERROR',
                name: 'm1zm59zo7zpk5vqh2xacn2dvqxoe9q796w281s3sakx9zsj3ot1g3jth28catm5ilbvnvre9edrn9vfhetghaaen2mvfa14xoopa9zuau283tjupcxyqfcdl3hre35rz27iu7mctp2lf6r5qvq9kisro6peg96bw8iszlo4nqmee8q21ljfx2c6r1se8ocspgh6xac6pr5a35tqq9da0x5xmvvjko9cjtqgsgbgc1rli2drr4qkg2k8z53q9cz1',
                returnCode: 2239614555,
                node: 'xgq4gjbk8pl8kdukgxf50avf86qxlpznqt3jc0c67xlqvm3kmgkeyhbb6p49rzbdpp90rm7w2boirhy411on9tg9ure5cz7d4qp981pvc18ajqcywxogz811km1hvusdux121kpq3jjp35wu853d3tdfkvbvj02h',
                user: 'ih5basuxm0jeklhwsu3whdrgm3csbb3zdhn56t28se96o49n8b03e51ezc2zqog8wo6qleakvd0qddig4fdi8f1u8v1qwe7hu4ovi933x609tr8owaqldu6xuujwni76rlnu8t0eg7ebiu4aefsmx85ikdfwgqmkp3j5lk42yok5eaf20gdlwa4mx7hgdkbuq0aef4dkz53x2vcpfjux1y020at6kkjqjjl10cap4p6aq839pxrvjigeb9nhsiw',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/job-detail`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '59563238-3020-4aac-957b-1e8e91805f46',
                tenantId: 'b583a1b2-557f-44ed-8fd8-7c3abcd717cb',
                systemId: 'c05f19c8-3590-4d2f-a384-427e73afcd57',
                systemName: 'hwnd6gz9gjhfdp5jmool',
                executionId: 'c9d8831a-2f37-42b1-a801-34ee35ab2c3d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 09:44:01',
                executionMonitoringStartAt: '2020-07-21 19:15:51',
                executionMonitoringEndAt: '2020-07-21 07:24:46',
                status: 'CANCELLED',
                name: 'jc2e0z2sfg46eftxxcj0y93tpinjf73e99oz0jyjpy4vqd13s5zrpw4kz9pffxp0vv12mkn7tvw9avdr2z0rq4f9vrvdxywnsffpg37yxkjscqcge8o20iwhoa7c6zine5itxb44rs0329j3if4csr7do8iapg1weikbn803252hd4y776ls07yp8gkh0vf69o9x2bl0xf7pgels6gcf8vcli08sibi6a7wf3526ew8fh9kt0h6lau0vrmzn9ri',
                returnCode: 7224412320,
                node: 'tkgz3nun9nhibe9zim3wo530d5xeyypmvxx7b6cxtm78p4ffu45vrxtuztndco2qjc77vvtu8ol68d04hcpxykvthrt7fxgbvoliresr725ec2lygcuspaep5n8tokpmvuxuw04vzglyqjrbbs0tu9h2dpt3aqot',
                user: '5pl86t2h6tww8tstfqv8rquzmw84j5vzkwwu3bjog2qxfgzbm15n0zuf2dzkreqkdh36r0ie9232imcqpdho91orbpzajl9xhgal9ipy3ebqod8mmpf18h9sren4m6lzlnocyipinidimfjk3s6st8a0erwms3z2lk5luq9r8c63e1k7veq4zkjp3uaazd50i2w02bf0dbsssxzsgyu0jqov7vip0srp500hs9gszzdjhgjlqvxhoohskl4eyly',
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
                        value   : '59563238-3020-4aac-957b-1e8e91805f46'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '59563238-3020-4aac-957b-1e8e91805f46'));
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
            .get('/bplus-it-sappi/job-detail/59563238-3020-4aac-957b-1e8e91805f46')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '59563238-3020-4aac-957b-1e8e91805f46'));
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
                
                id: '48e582b1-8d11-4e04-9c75-b1424b575817',
                tenantId: '6116c1e1-30d5-43bf-b129-85c74e64c879',
                systemId: '055abff4-7791-4038-942d-c07f254eb8bd',
                systemName: '9bm2424tzstinammnz8e',
                executionId: '09b5ef70-b2bb-4721-bb86-d9884e17d647',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 09:47:53',
                executionMonitoringStartAt: '2020-07-21 16:35:33',
                executionMonitoringEndAt: '2020-07-21 13:34:50',
                status: 'CANCELLED',
                name: '1sjin24cw3q5gm325qwszvsjsnkcbvsqbpd0z2joumdsyda39f9u8jy5gmgvzy4k09x2or4irc4m0b72hh7ewnl44j4350n040300ou6elj1qiclm48jhzrpbk1oco4fbctj18m19jxm1qmal2bwb1igek9pr3t8pi3gwt6msooter2qp0317oykbqr5wd9tdz4xmby3lzf5orqhesphfxkg6jb1xltfuw7z9oirrnpy12elnc4ewcqzjnuewew',
                returnCode: 7684553430,
                node: 'zaq2o3xhiybdvmikab8de8mcy2iee3523z2evlohshnl19chdvxztkv5glysmmcddy99zfw8bxdexxogztxocl1xycb3zlo31f3vxbx7tdviuio2rwsg9bwbzude15bhorj71a1b2x4og1o0g1ueioke8p8ep6ra',
                user: '67da75mhg1pes8yh0jjwswrbyef9sk4wvhss2ak4kzbszi175hi1n7a8zn57vf2sz43ayld36t139wbsfmm4j1htje6s2p8jexsldqo7v1ihvy8onp7sxat1e4wn43cm1vgor6fa3i04bcjpivnsvx9202qkskmozs0j5oxk1d76kq55jtzxi47zeaw51ey18vmjzl3ucvqks7d58sm3wz35j13zhwvfyzciphgjbpop8d9pw9koii3up7698dg',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/job-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '59563238-3020-4aac-957b-1e8e91805f46',
                tenantId: 'b583a1b2-557f-44ed-8fd8-7c3abcd717cb',
                systemId: 'c05f19c8-3590-4d2f-a384-427e73afcd57',
                systemName: 'achwz7qleb0l07q43btt',
                executionId: 'c9d8831a-2f37-42b1-a801-34ee35ab2c3d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 12:58:18',
                executionMonitoringStartAt: '2020-07-22 00:46:14',
                executionMonitoringEndAt: '2020-07-21 18:25:47',
                status: 'CANCELLED',
                name: 'ocnhns82bkm2ygbnvkj6bi5lvnxe5gvcbtn3fna2wkgroo6dhosttpzczwzjm3cnz54lgg1hls61rb7xhm0lqzyr89yg65v9ud9reeiilb7ielq3s0euqdcpu6cf7x38urqhstxn5aluwj2wy65khxrs6ofs5tzdpa71dmkqon3zqhhok7qupxtjd2my7tlabyuraukemyupmunqqbi86fhtauoza0kssl6h30ylghrv7f2xg6afk7aqdyajtxl',
                returnCode: 6973074366,
                node: 'yrfof7xf11tnf6zuaa0mbhglp0qc7ihd4loq23oijzd77gvlud9mramu14or8gvdo3qgcvgpz4nis8vxcxxbkcrdxzkpl8b5wnytysq3iqjrzd13g2cp8vpogr6j1th21qz604iy7nib1wj5q20cs7z1dop1gm37',
                user: '18dyqvsryr73t4ly1enjmynzw6ojfcghdrgwd7woijkns6tfq4whr5rwz37fi4jt26effgd9tlk2qwk9pdfrpvm6dm6blqrqzuz1nyxlqw5s3sej4pufij9xdidwtgdl1rp0truo2vafpxokc5fskfdg4dxlxnxidcc8v9gs3zi1ruklrgwyrrhmfdyiza8xuvuwv65qw7soy1jb5c336wclgpm738fn0tz4zuqyjobqhoprxjjy61srkk8q2u1',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '59563238-3020-4aac-957b-1e8e91805f46'));
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
            .delete('/bplus-it-sappi/job-detail/59563238-3020-4aac-957b-1e8e91805f46')
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
                        id: '9714e2a0-485f-4860-9c07-17905075618e',
                        tenantId: 'b583a1b2-557f-44ed-8fd8-7c3abcd717cb',
                        systemId: 'c05f19c8-3590-4d2f-a384-427e73afcd57',
                        systemName: '3qit2pfbzp8ils0do0wb',
                        executionId: 'c9d8831a-2f37-42b1-a801-34ee35ab2c3d',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-21 23:47:45',
                        executionMonitoringStartAt: '2020-07-21 20:20:43',
                        executionMonitoringEndAt: '2020-07-21 02:02:26',
                        status: 'CANCELLED',
                        name: '94f9j63wrxjc8lspfoasr47yi6439e6lnwckrw26yavmk3h1pv169qiz93fmwsoz1ax4srogwod3mvp8lvzjyqn2urrtx8c7e8r45bt7h2embnqk6tinsg3bczr3wfg6unrow17w91qoxmwiikqivck2v9ypfp5af5uxtkh7drv6gootqd0cr528rprzjizjogqrhaeoee22ymrqgd59w2dzp4kigcr60o738m535hnk64r5h6qotipdrhzh8mc',
                        returnCode: 6449880472,
                        node: 'y6tmwfum6pqsn6eco1hqm1vz4gd7r9e2yda3ku4wmj6zujwfkuvb6g4x5q1ssn4sjm74efbpgyafbs7wghbyhpn7vbneepteiaxqug4qudp0bbbn8d3v9hpmhxxmxbvz99rffd0gz759h2ykxx72miwprcb9xrey',
                        user: 'nrkah1q5d1b3hm511f7lr57zxce84wadpyseirln6f5z4f0qnpqj5pqi6i6a3wk4l9na04shouvycup21p12xnt7ga29dfj60x2l3fbuwpj58tq84nns4i7gx2nt8gnvdoejbc68e21kurgw1gicfdrta89ndft4m3h7svhu1put8pwsun6ugifx0ti2ex2d6hbz24os7g6n1ljes0w1hzxv1e57atgnk9pjj1z6f5hvr0xw8u9y1xdjs3dvo4m',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateJobDetail).toHaveProperty('id', '9714e2a0-485f-4860-9c07-17905075618e');
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
                            value   : '59563238-3020-4aac-957b-1e8e91805f46'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobDetail.id).toStrictEqual('59563238-3020-4aac-957b-1e8e91805f46');
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
                    id: '59563238-3020-4aac-957b-1e8e91805f46'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobDetailById.id).toStrictEqual('59563238-3020-4aac-957b-1e8e91805f46');
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
                        
                        id: 'bba9da50-e490-45d2-976d-5b502773d703',
                        tenantId: 'e77a26d7-f2e9-40ae-91d6-a2f415d4a7eb',
                        systemId: '8fa23dd9-246a-4cd5-a768-22758ee543b2',
                        systemName: 'kmta5t1285848p57hfge',
                        executionId: 'c170ceef-dc44-4dae-98af-1e36c5b18bce',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-21 04:23:57',
                        executionMonitoringStartAt: '2020-07-21 22:15:12',
                        executionMonitoringEndAt: '2020-07-21 09:52:06',
                        status: 'ERROR',
                        name: 'adzta3wfqcwzpquze5dm9rpg867kg9h3e4aeovoasvxv2axuccu6c79uvm2wecv9ophekb4mri043mitbsb6zd6sbijjw3obmiw8zj5r23m7i8btx423x3mkl1nw4tqhvortdq7lgc01byb5gn1w3h3otli3pjizs69m4b2hjkyayeyw7arkh9lfx6sr0bu7zzrgwk8af8ze8avnfjwh9eohlsvjdst8bgpclad3s47ibt2soiisyrpgn2b8y5b',
                        returnCode: 6092664612,
                        node: 'qdgw15s7o8u56w5dv6hquy9k9lzjqngbeng9eaw8loay81ve4yqt85ec6hm1wiebqyfbdfc70vy8rxjfncg7xmq3xqupyndkkiz5bxf78ool7gmyri6lfurqa2w3gety5q88097vtirl9zolw0j7zlufdovwknti',
                        user: '60qv8axkhnpe5871toojmznuzpvollum7kukwfskxlkiio3zc2e2284ik7sot52bna4qk7j8nci2cn32rxd6e1l9qdaqex7k93tlg4q70rqa57hd42s4iielh3gpmiqbc6uraq88eaqdnrhbt496qin5mekye6i6moj4o3jbr4qjhyte0tyt18kprkvwxs44e928hjz8bjcjf933g8flsa5gcfd5rt0v231baaq4cxlpcgtf1heuzetejygry48',
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
                        
                        id: '59563238-3020-4aac-957b-1e8e91805f46',
                        tenantId: 'b583a1b2-557f-44ed-8fd8-7c3abcd717cb',
                        systemId: 'c05f19c8-3590-4d2f-a384-427e73afcd57',
                        systemName: 'rb4v5mgodricgfurk5t0',
                        executionId: 'c9d8831a-2f37-42b1-a801-34ee35ab2c3d',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-21 18:20:52',
                        executionMonitoringStartAt: '2020-07-21 12:33:53',
                        executionMonitoringEndAt: '2020-07-21 11:30:40',
                        status: 'COMPLETED',
                        name: '5j6ampphishkn4x9fyewk6ambynw6zqk9yq4iej5bfi7ij1ysain4vjc0vykcs7292xq3zuezuutvimpd9yje42clop48jmomcsmxuwti3krqt0j1tc8dd7377u5qbcm04ydgdpbwdgz6ttaik4nbpsoozyg8hkl8swfs9ev0z39t40xgf9bihucv65mbgbl08tzunroe3fzoowiwl7du5av16gtz4z99gp8vvm8yxjicrz9pm0th8jxfr2oosv',
                        returnCode: 1603733881,
                        node: 'urcjniewtdyji4tp7i55a2g8vfjbygvfd8nhleldw0r0v1toa138wbyh14i4rr3e3znfgvrxhrw14g6g3mvnlydott356yb2aa22c5wi9yl4pw44ghowzczhxl357djr4tzx67efaxtzqem39ucyakny41crut1e',
                        user: '7mhsn4pjnor4qxngi2fbfucfuz9m2dxdlpli53eqbua2xbi4sublbjdhrf87mri9kvvdbna6wwu9xvlyoafnfrjj3pll91nnxkosw4l5qt68y1nq3mbn37ewv3ezbjdmps6mfxyrrd1mih3ws5eqydf586hmczy0voo5yvovnmp7x8t1grgyezd0qth4kd96ucb3w7rsq9l0b2r8gzopei0s4zrucysxh9badpjo2ktmq3yyqievo7xoypiepaa',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateJobDetail.id).toStrictEqual('59563238-3020-4aac-957b-1e8e91805f46');
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
                    id: '59563238-3020-4aac-957b-1e8e91805f46'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteJobDetailById.id).toStrictEqual('59563238-3020-4aac-957b-1e8e91805f46');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});