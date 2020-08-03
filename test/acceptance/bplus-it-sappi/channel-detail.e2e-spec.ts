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
                tenantId: '50256894-b4a5-44f5-808a-cc75dec00e7b',
                tenantCode: 'tn2he550c9r1w88hlwpp582v0l1j8mcpmcix7bl0kfkzqar0pe',
                systemId: '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a',
                systemName: 'ci9klyxae3vvc9hfsj8c',
                executionId: '143be2e1-e31b-4a87-8a70-5fe8ee6318da',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-02 19:25:18',
                executionMonitoringStartAt: '2020-08-03 10:08:03',
                executionMonitoringEndAt: '2020-08-03 11:17:08',
                status: 'SUCCESSFUL',
                channelHash: 'ihv3pp0k5a2w1jvs00aa5edykuohrj0c4kf0vrt3',
                channelSapId: 'ozuhotq01jca7ri6k9fyrxqfkur3073t89k2ij66glo4pkx3hg',
                channelParty: 'mm0y2homjn0o59qmj5t238u78z7yvix8zhy95600j9admls4k403t3km6poj6o0aiuznjx9l85ie1aas6tzckjctirsjy4tvakh4ix5u5gh0yyof8pvuqhfir1hf5qh0y0dca0b42wbz6f6k6lv09blvmlmw8gbd',
                channelComponent: 'd2zqzemcwo13tesfwcis78c89r00npgscmm9yu7rhptn1kr820k5pkyyejqohwq74sehplt414065h3bnvf7ijsmoq2uu6o5tl1cr3uadwjnrs4anaq6f8l4rtbj6jxnctcny4ynqlklwu6qytommzb0a9paaj6p',
                channelName: '10mp9zah1spyajwcbidsfi3u5bs4x4ebj9rd9oaivm1pf03gi2dj1k0a0199dydy5tpairhh22jxp8d0qr75qd2bpcfi69vcxhjuhxre3sgf03th2n4elkmvugfq6yvki8073mk7w3ghc66z3c2lgqa3vvpduc4f',
                detail: 'Quod numquam quibusdam. Nulla sequi rerum distinctio quos. Iste aut natus animi. Voluptatibus ut dolores eum ut rerum ut sint molestias nihil.',
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
                
                tenantId: '50256894-b4a5-44f5-808a-cc75dec00e7b',
                tenantCode: 'py01rl0tedc34pehqtsfgk8nzgzz7ey86wujkdxqltyntdd417',
                systemId: '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a',
                systemName: 'b7w5a0129opa5lidwx40',
                executionId: '143be2e1-e31b-4a87-8a70-5fe8ee6318da',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-02 18:41:47',
                executionMonitoringStartAt: '2020-08-02 23:40:46',
                executionMonitoringEndAt: '2020-08-03 08:06:03',
                status: 'ERROR',
                channelHash: 'uqewvsuuh1qgc2komxxe366ejfw3agum7j45nr5h',
                channelSapId: '1ttds45bqw9bpwktnaflnh8pq984uddd10ev8wytaeyu4t3t6k',
                channelParty: '6jn1gz4lyyxdtncvut9phdw1egs251cjduvgdvjn3s7mczwuxpol7hg25gd5nfh8wa1csr0c7t2d9es538w8qn87kw8im9umnbkvtzgmexzq5vlh2vcy0j07g434c8d0qxs5cws27y0bqjouvy7rk5r23pj0gr43',
                channelComponent: 'z11mi4l3kz831ejqljyxqlq283azmv2k6z7qcm2n8aov86fmzjrmcjiqtjolyd0ba5ce6pma76t0i2qhrxtp2sl6m0t135bfzyhxi276oylqvcjv8vuoxmpusnmztnj1m5fwvaw4dkobl07xk7n6wb7hdavt66a6',
                channelName: '50pegm5xszke1he9uxy6xmlicb1mjh5di7959a5sniys54q9l8ebm9a679jqw474khexjxzgdmq4wz6193x8h9d630f5gbioyxtu4pe9a4pwvlp2sgmv5jmhtisvg4yalnczv2ivbvswu647m33ly78ah7v14qtd',
                detail: 'Amet et et consequatur voluptas sed nisi alias magnam. Deserunt sint eaque praesentium ut dolorem libero. Hic ducimus sit asperiores voluptatem voluptas aut ut quidem et. Est maiores soluta.',
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
                id: 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce',
                tenantId: null,
                tenantCode: '7f3eqvh7pg44997tdpe7wyfgsycnufer6y8cuqdicfm43tejf2',
                systemId: '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a',
                systemName: 'sa4cgnf9ay6wgvqgu5cv',
                executionId: '143be2e1-e31b-4a87-8a70-5fe8ee6318da',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 02:20:46',
                executionMonitoringStartAt: '2020-08-03 15:45:49',
                executionMonitoringEndAt: '2020-08-03 14:42:37',
                status: 'SUCCESSFUL',
                channelHash: '1j0505r6pm5xhczpt3e241qxf5pactqgfpjz1tjv',
                channelSapId: 'j0gkqoj6jvav7g9iz0xzz8qvz2um9nl8xto7njrg2w07ox5xn4',
                channelParty: '8bsrfbcs6dhaqfhmnefyhad5sixvr5z20jyfl66woqp9glj2xts3h3fg8b1myt2yy46prx4xxypn7uqf6c5qiy98lsdvde9zsf0k5z4rtqyzuvlbukli0cjxhqpmzi5ao9t4znmi6y7fioz5kumhhu28x90bssnb',
                channelComponent: '5jxcd3k9jbhqt53nibg1uqxre1d0956hbbnawrphywnnnaswvaz0awyanua2yjo9nfgcbtx9rb4s2f53yk8l01tgyubmp9ohfn22ua4k3vjqrq3n9b0h3xm85a957szjku2s6tvafb8zuxmxaw2075mz5p050y70',
                channelName: 'xevz6hbedrd2k21yvfejhlef9tvyio9sfvb0vm9cej0cto0dkeeg6853b4f2w5kucygb45kzjfgdvc6i0gox2pw2a2hseykq0it9dm8vrljb4g4ufs4fekyh6xyf89ler9q7gy0mrudxu132fgtx5qc5ao5ks5ho',
                detail: 'Perspiciatis sint quia recusandae non tempora. Ipsum deserunt earum. A aut eius quisquam.',
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
                id: 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce',
                
                tenantCode: '5g2wi8xhoj2ut4sz1pqukbu0c29qt2s9w9n4arbqqfu2s4qq6w',
                systemId: '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a',
                systemName: 'r3m57bhs2m9izil4s7fi',
                executionId: '143be2e1-e31b-4a87-8a70-5fe8ee6318da',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 13:52:59',
                executionMonitoringStartAt: '2020-08-03 10:04:06',
                executionMonitoringEndAt: '2020-08-03 14:09:01',
                status: 'SUCCESSFUL',
                channelHash: 'ejxzw3gwb9ifxc4lsu0zlbf9y7etcgukjycmudsb',
                channelSapId: 'eqg3ze9njei0166ei3p656plyyz1q5kjmdcbcazxjosvuiy6u1',
                channelParty: 'krnnfe4d0gf043e2ui6ylit6574ob42axfja2a177ymd1oepc5q7h1bjrykxfncgmj05mrcqrmgz4ce4q8ybc863wrfducz3vkc0r3x5b64f4e44filyxb3y0auz6q0rinvkz7mgqo2r6v5dd3pwl2j4tfbsyehv',
                channelComponent: 'pbkhlubik0w2mwtlt4vo81wgwt26vrwcuoddabtjdk1putm3vp7bkulyya9s2ph3hk9wfy9h0laymljzhc7e3kpia9ksxm6fqwu2rp3ykcad3ffqebjk90tjn9qtpacnraoq8r1vuyytlqvgojnill7zyhe31kgr',
                channelName: 'zkaoo8flulqnwp9x0btt7x2gyt283qxrrs7c7r3jx8u5qn39r7c1b38pe8no1802a92i2z3yajh04bpfmxcr708vyy9ecuhzdtxzsvm6phhi6lhkg61bb0gu7giqf0pfw5as69lr3swbl1ocj29awt0zmb3ky73c',
                detail: 'Nam molestiae dolores. Quia itaque quod. Quia ipsum maxime. Magni qui enim. Odio officiis ut eos sint sint fugiat consequatur reiciendis velit.',
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
                id: 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce',
                tenantId: '50256894-b4a5-44f5-808a-cc75dec00e7b',
                tenantCode: null,
                systemId: '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a',
                systemName: 'hcp92t7ocg4lxlg88h1w',
                executionId: '143be2e1-e31b-4a87-8a70-5fe8ee6318da',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 08:58:59',
                executionMonitoringStartAt: '2020-08-02 21:50:11',
                executionMonitoringEndAt: '2020-08-03 15:05:03',
                status: 'INACTIVE',
                channelHash: 'gt7313hsck54hzxiyvihauynp1m3adsk5dxp9znh',
                channelSapId: 'zdw6mu0j91w5mbk6malb79sxua1loe7vtkm32d9hcl0xib2q33',
                channelParty: '4s8gycpe9r8oo899kqqbm6469xnnsapldz3yi0o5z6b2adu04k1iensqkpv2ak44glahic7o5cc1hr1a8qg8ysyc6l5ex3cm2a6yky9c2w3kcxgp2qrq21x2dpc5mw91cyzkvz6gk0cfstwkdbbp3m1g5ecv8voy',
                channelComponent: 'myboanq5c2jgqrvhahz1a3cya1kildyig6lqznzg0l8yka98c9u0vlpeefhplb9l4zysv8cnt7ia4hfaj71nckmjxf7t395o9c0wuz3j9i1xt6xgw0ncn2mp632fn7n6o69n7ag8a3tudydwtdt2l6mrz3u1hoph',
                channelName: 'irsh456y5f2062twre4qh548kn9lidurp8c7d1bx0tu4mot6bvjhstzhqccqphxzkfbb3h43l1wt22o1geqv8nxp79pop0v1xqehnymeehpeiaro35rjon87d7jl0y88ux2nl06wqy5pvizz4qmuqytis04zdayo',
                detail: 'Eligendi eius temporibus repellat ad eos repudiandae. Qui nam dolores molestias veniam ex. Enim numquam ut id quisquam corporis ut explicabo.',
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
                id: 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce',
                tenantId: '50256894-b4a5-44f5-808a-cc75dec00e7b',
                
                systemId: '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a',
                systemName: 'yma5rjyerb0ohpf615ri',
                executionId: '143be2e1-e31b-4a87-8a70-5fe8ee6318da',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 16:45:08',
                executionMonitoringStartAt: '2020-08-02 23:52:16',
                executionMonitoringEndAt: '2020-08-03 13:52:33',
                status: 'UNREGISTERED',
                channelHash: 'b51uu2qwx8uuy5rhyek89sha51amlrstzhpok3k3',
                channelSapId: '448gsxh8g2mtb4beh1xp80jokax9kmzmeuauffd67qugtpn216',
                channelParty: 'cqj18frkmtgz5zbwb982zgu346vf6xn61jqodidl488bjwoo7vkpwh2oifmwp2qjori5b81mzocd7hiw5l951qli9qd9hlxcqsyshnpcjxe1873zqcyxyfcm3oj0hvdh992rno67lov4kas226nyxhukn42p0m0k',
                channelComponent: 'xsdax5myu0frcifut1r0q99nwbcxqvjpa7qk04nxo8xhd7kqtp9icjz6xx8h2theqn4gj0ziv4semiltsp2zed781sv77z7z9u3qfrb33e6u18la9pu1mt4xrmlt8a3yq3fyrpxbflv6vzop9tnuk4l7tx3kl9d7',
                channelName: 'b6gr0821d7ec2k9bzbm9u6k0z5rys2v5qkupjhumv6bo0u68oganuwm9u3dj902hhcr392zskh32h31z3up4n955thgkwyiun8ealk1z3zf230j06fh9t6z0hsoy7xhsedla3rfwq92ytxtote4ntwt8yox8emuw',
                detail: 'Et voluptatem maxime distinctio et quis. Consectetur cum tempora rerum molestiae. Omnis rerum distinctio eos a doloremque. Et soluta explicabo.',
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
                id: 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce',
                tenantId: '50256894-b4a5-44f5-808a-cc75dec00e7b',
                tenantCode: 'x0q8kpw0vq9ubhwt2sx8sirx1ld2jbewtcuspgim7pmme7y4bd',
                systemId: null,
                systemName: 'p2lct6unwajo300lfnm3',
                executionId: '143be2e1-e31b-4a87-8a70-5fe8ee6318da',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 04:36:36',
                executionMonitoringStartAt: '2020-08-03 09:48:59',
                executionMonitoringEndAt: '2020-08-03 01:57:52',
                status: 'ERROR',
                channelHash: 'l2ludqpi19ilz5mrawqv5v92yxbyih6vdxur823i',
                channelSapId: '4gjuyamgs36ip1enf1d5wfpam8sex8toatqb0mqeqvnesrz5bk',
                channelParty: 'ied72n427v1kbosy425nhf25lypy024mn4d6s2iy5lo81xj57h7i25gw0axncxoydhfiqae068l0h7inxuk89u8dook7uzc9gub6mlxhthy2xa9qf952nx58ynea0t2kguj3gqi1tqvju7kd3yun4kha0iqc52z7',
                channelComponent: 'gngtsq10hr0hf2q2qpynhtco563tkulp8quyo3se3v1zxkvk36ux7tiek15ngwaddw2d0snbqks2yx8ld1444x58efkieemqn9q1hzbi2plsqtcldja4bg63mah6smhe4ns4swbebr8tbwarlmk0i5pogq1si77z',
                channelName: '2ll8p12gwhkq98kxps7ip3zbktn5dhh95r034epdub5m3gtnhk6n0cuik4qydkokeprizf79c2f3hocxsx4s9brbvuc68bso3cplbxmqkxdwo7a61xa4zlud3xxuh3wn962q4sgw25radx6ndqpd4y1474rebubq',
                detail: 'Eum maxime suscipit dolores repudiandae voluptas. Animi ratione vero ducimus et. Sit natus eligendi repellat. Illo nobis provident et perferendis.',
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
                id: 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce',
                tenantId: '50256894-b4a5-44f5-808a-cc75dec00e7b',
                tenantCode: 'kog0v7ybyyxlo5afv2oz19e2bed9aorxw2bp0oh3yzg77rymc5',
                
                systemName: 'zxglry1ptlol089f1tfq',
                executionId: '143be2e1-e31b-4a87-8a70-5fe8ee6318da',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 15:55:49',
                executionMonitoringStartAt: '2020-08-03 18:25:57',
                executionMonitoringEndAt: '2020-08-02 22:25:22',
                status: 'SUCCESSFUL',
                channelHash: '45hy5drgqqcqidtjbaom4pffsfedltuypljunjeo',
                channelSapId: 'rlwfkugsmkn520uovi9lsehexeefnur4mtkw8kj5y8r0qbzzlg',
                channelParty: '0l94yd8o4u7eqfhar2woaki1hdnkzxcwnsy75rb0hwnropyydnw2rrf7thi5h4eu967cc9gkdmk1i81y4kh3h21iv1ad7laxicwhr5prjdp6sbcaga3mzvp8b33xk42smvgixnzmfcawjqv0pxhhvialhret124f',
                channelComponent: 'c22zpcm38g56soiti7r6pea34vmj4c1anwkzs71uehq3b79ncu0u3gjnd60wxltq5mwjn7y3zixd8fnzmvx7m746yz1s879ya5wy812z3j3rhmlsei44o0kl2mm0n43ey1cpdqzbyxbuba2iaktohpop4tcmllm5',
                channelName: '5914n0zcrmaays5306ecqackuxyle2s10ubzdkyj5qcl4kfjhfbtvqv2gqaexv7ftfexppapts3yamrd0c6tnelqg3f8ybmm2szodb7fsk8ex8flv8ht5m6529mpi00y7w0rz0dkflt1zohjuymtrq3touu0tqd4',
                detail: 'Adipisci qui qui illum. Praesentium aut architecto ducimus quis est quia iure quis corporis. Quas et aliquid unde adipisci qui error debitis autem.',
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
                id: 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce',
                tenantId: '50256894-b4a5-44f5-808a-cc75dec00e7b',
                tenantCode: '4cooan99qetoufz3f1kj6xpp1055qiz65xxtds8ufb99yd0tmc',
                systemId: '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a',
                systemName: null,
                executionId: '143be2e1-e31b-4a87-8a70-5fe8ee6318da',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 08:07:15',
                executionMonitoringStartAt: '2020-08-03 18:20:44',
                executionMonitoringEndAt: '2020-08-03 13:34:31',
                status: 'SUCCESSFUL',
                channelHash: 'h0tjjwsn6tz658mrgwwj9ao3dr5bmfg7nece4cv3',
                channelSapId: 'e7et0u8ff9ninfqiko3fv2si2ink53x6devee9mwaxxg7o2nju',
                channelParty: 'u8ns2u30v13g8k2vq1unn0phndov6gt5gi99w6ucsdnd5v8duugiejfza1j5g4ioh8fn51tktzl9eke39nijsdh233n78wnxp91ajfdryzewp5fdasxpm76z6x63lmvnedmn679z3oumpde1lbeeo4z7r7b704ed',
                channelComponent: 'cnjgi4oibxhlg8lh13opa9s7oua8u8jjlpbkldhz6edu7szv40fw2lkx0lg8mes8e8m6w5er5g8a62sjtikslovntoopaqg0jep65yptjlgr4rg12iz4ixp28qef3wb1ficqoso1pfc7erlbo86qr1dnv2jj8gqr',
                channelName: 'o3h9nmzqcsge9haid27qklvucwkqnnqc1l6ikhr4giql41wbkc585cxpd7bctqmk8fwfd2btu6lxq0zjo6o71vgfcatdjdi0pq29e4mbhmcnkcv07j8pwdpd14stvktnfmlkyw28it22ejn7p864qzoicxl4c5l7',
                detail: 'Et quia illo eveniet praesentium eligendi dignissimos distinctio. Repudiandae reprehenderit perspiciatis cupiditate quaerat quae. Sit quam sed natus. Eveniet expedita ipsa tempore corporis voluptate aut. Soluta ex impedit facilis quia quis dolorem incidunt aspernatur autem.',
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
                id: 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce',
                tenantId: '50256894-b4a5-44f5-808a-cc75dec00e7b',
                tenantCode: '6atcatbsb7erxfwqcn118tw27a17cw66npw68u0rm0lmhntyqh',
                systemId: '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a',
                
                executionId: '143be2e1-e31b-4a87-8a70-5fe8ee6318da',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 10:10:25',
                executionMonitoringStartAt: '2020-08-03 01:08:34',
                executionMonitoringEndAt: '2020-08-03 13:55:02',
                status: 'UNREGISTERED',
                channelHash: '1ibmz2vz266fprsn4a8am4mgb7ykadk4rkic1cbb',
                channelSapId: 'g2woeu8sbk9evqoln0q16gjzppubgcj853w2li82hqkm241x39',
                channelParty: 'j1kllcun10in10ekrlhv34s2dzdnk9o0epb4gnr6e5t2f12so2agsjoue5thz1l1jf2f4kxx8rgect3z5bvxhobjf3vi3rvjrqye861tcpuux8wi34gc6n3rvas6m8kxa8ixoa3ayyi9ygegtvd0aqv3fb5d1mm2',
                channelComponent: 'f3y6at5wljiaef8mvbvr41j6lkpghzk1u8bxgchhh5zr94cz9psz4jlvdxc2u0as7rr1uo436bhn2srby9aqy5cdny9c7oyduduvjh2fu857ytat2gilxdsg8hvwgxndf6nj74enyr6vv2k7d3ilga3dl0wvzfri',
                channelName: '9nqbpzn0k8a7xhb6ok9w8exb619h2ukfylzmsgza845itr8auvhx0bueuxharmotg90t1wqgpujm10tx1wrohl57xklw1ajp3haw6g1p0vjoe6oiuql4z3f46z6mcnabp47f9zhmzdorvaoihgpq09knbhwo27rp',
                detail: 'Quos expedita qui minima aut accusantium consequatur. Debitis accusantium veniam. Maxime in quis aut et aut amet.',
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
                id: 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce',
                tenantId: '50256894-b4a5-44f5-808a-cc75dec00e7b',
                tenantCode: 'nipadhfohdbcz6spwl80x3pe3qd9uc1bflhzdlo964erjif0tx',
                systemId: '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a',
                systemName: 'szglgn38jdrjevns602t',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 16:19:54',
                executionMonitoringStartAt: '2020-08-02 18:30:48',
                executionMonitoringEndAt: '2020-08-03 10:10:52',
                status: 'UNKNOWN',
                channelHash: '62x1aj3zw9fmpdvlvzq3dd7xbchfkjm5ktp20he1',
                channelSapId: 'oy1whsfp8418gepftkz6f9yyu9sctna99mwfvlm93ddibpbwb8',
                channelParty: 'qpi3i7jiforg704qugqwyme85r00zupzsh6109iuooyfx8pl11zjr3zzcs5at92a6n85tu2u4o0my8fdttzr6z4q6w1cjfpf9rznw7qm49ry2f02pvi52pujfqb0e1q7rnbdrpyo3v8j013bbvh21g0dbirh75im',
                channelComponent: 'zhtmgnuif2gdjutfwcy5icg2p63x9ezrp20zs3wjmie11cimvevo4bgq0vylgdg552cggcxvgil387hkoid0iim4yafnxzyatwjg2dw7mzu7a97zim5djrcnx5vn0bt08933to4ibfu26z5d7yudn6mgisikh9u8',
                channelName: 'ouf1taprmg0knncuoy6janqncxrxsqo5cw17z7p1y786s7959lvghmzlujk1cd3cedt48nmwwbdbzo9xvpuj2iws7kg4xur4pt0e8db94nfifiht3l5j7tasw2ccczdev0uwarolzxqye169h6iserjw22ha865x',
                detail: 'Sunt voluptates nostrum occaecati. Consectetur numquam molestias minima deserunt quasi et magnam aut accusamus. Beatae autem qui odio fugit molestias. Assumenda dolore quas. Qui quam doloribus consequatur quas voluptas ullam inventore distinctio. Deserunt id aperiam laudantium at laborum eaque officia.',
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
                id: 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce',
                tenantId: '50256894-b4a5-44f5-808a-cc75dec00e7b',
                tenantCode: 't1tq5fdc0ds0dy8nrxs1ld36n5bfxdqasffyjwcsa57cazwpag',
                systemId: '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a',
                systemName: '0h8ed9e7f65awbagd9la',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 12:14:35',
                executionMonitoringStartAt: '2020-08-03 15:23:13',
                executionMonitoringEndAt: '2020-08-03 16:17:23',
                status: 'ERROR',
                channelHash: 'fif5e7sfnp139k9iyz2ze9lvrl73p8ll53m6bdzl',
                channelSapId: 'olgg5zkcr9ioeju6270fgj797z5dq4dprf02l50amcqnn9l7e3',
                channelParty: 'tudq8t9ix8prr1b7oman75nvv45txl1jitn0il1maifd3mx3ssyv46lzq56wd283uf689d3b5r5q59577xzlywtx4xyews9ae6cdk8vtdnqs2w7uwx9u2xumqamxj5qxtzxx74srmlly32ve0wu2m3hvd3pswt6i',
                channelComponent: '4sbnlka7anoxro30ak82ry83io1liccxp63eqg5c5ttu9sz1ljrc2jpwty7dnw7sr426aatn893tlfmj1rmw1a583sp9783xl0hdd9au9v0vvrx8kr70fwbwtg3hds0yxm1jbjd9ut4tovtzhdyvwd9mrygi217d',
                channelName: '9q0t1rzf70o2ddy48p221dy4zq6chfjwnuhs0elpqt1xmnzx2smgbjca5tp1kvefskovvl8hwq43kpbypyqfobdirsj1pk1od4x3hb0nxxlzfqlksf9j45wkjn5rmxegt2gur5xk9gjl1gxj1zu33sxe6i46lnse',
                detail: 'Consequuntur doloribus velit voluptatem eligendi et molestiae. Vel et velit veritatis. Quae dolor hic quod expedita. Et inventore distinctio dolore voluptatum dolorem accusamus totam.',
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
                id: 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce',
                tenantId: '50256894-b4a5-44f5-808a-cc75dec00e7b',
                tenantCode: '1zqgylefoq1u6dgfng1nlricpj3o8bawnlrkc87dlx8dowe3u8',
                systemId: '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a',
                systemName: 'rgsm7y6a45zuplo7kh5r',
                executionId: '143be2e1-e31b-4a87-8a70-5fe8ee6318da',
                executionType: null,
                executionExecutedAt: '2020-08-03 17:14:12',
                executionMonitoringStartAt: '2020-08-03 03:06:30',
                executionMonitoringEndAt: '2020-08-03 05:19:24',
                status: 'INACTIVE',
                channelHash: 'gokaoph743go952vl4jrhoohz8gf1lmd208fbisb',
                channelSapId: 'ioui3tgv4awx4j7xwhonghic01y01lv8tn5x1x133zm7ig6p6d',
                channelParty: 'q6wvfxtlyiyxfozc0kpstvip7vt9ux1ja367kvs6k4argqeo7pxkq6wxajffj86oyfc2g1yofngo08wb320alr39jdklsirxh5c0f9op5hp58oez9tkixmwh5lguy6yygr5ocduw04mp27uc7kpugellij0d76ir',
                channelComponent: 'pl7406hjm323pc8vz3f368w98m6pnn8bsykzouqph7x9ho9qe08g15vv7rolbw4wt6i70r8myl4fg45j001z6loglfntawkvbeabaj43wa5je4z0kdygk4o6t5tgkdem2zmqbyprm6k4fegxzggqinfca77m13da',
                channelName: 'c35x6pdswthjaxbzspup5gm786g2hzfdsejskkzi2rcgq9xkf7ikcaes404rsc3rd86o5ofortfnf2swn5lxbd5vflv18tb20cjrygq7xy13v07ldvg2d4ed1716x9bkuxjkym818jmtn505kkycf7ixu43frtqi',
                detail: 'Quis aut tempore libero inventore provident esse impedit debitis blanditiis. Nulla fugit laborum vero eum veniam deleniti excepturi. Dignissimos assumenda et sunt ea odio. Eos sed praesentium cupiditate amet sunt et. Et fugiat et veniam vel et eos delectus debitis adipisci. Odit dolores eum cum placeat quibusdam sit molestias.',
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
                id: 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce',
                tenantId: '50256894-b4a5-44f5-808a-cc75dec00e7b',
                tenantCode: '1ln45a6g264yrpnnvtzfl5jszdhu5yjsh1ik77mua3fld73f2k',
                systemId: '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a',
                systemName: 'z2uqfq9hwkk1issscyol',
                executionId: '143be2e1-e31b-4a87-8a70-5fe8ee6318da',
                
                executionExecutedAt: '2020-08-02 22:25:11',
                executionMonitoringStartAt: '2020-08-03 15:17:33',
                executionMonitoringEndAt: '2020-08-03 12:26:40',
                status: 'UNREGISTERED',
                channelHash: '6m1gehjc9i2ep0lcrjr71xkzqxa79wj7pckvoo0i',
                channelSapId: '8y0lblkq19uio478xbeh7zf1wnjanmas5rs2l2op1z8b7h9xxc',
                channelParty: 'lhz0r7gb8cvxu101c8v550pblrjotj2p6r2axbxhx45bi0ra6njr06xlaji9r5xa4rawde85wvqa56m3861zlroq1znqn1taex2qv84j51eau7xp8rxnimasmlypv23pid0n8xnusmlbygrm0lyoqfm6qgqnveuv',
                channelComponent: 'lst6z3v2sqsrvnuypnskh63dxe367suk3luka69lk6fzzf3u75iwjp2sfrga1f9g9i244zggxtc99koqqf1kp41gnz8d38er9ou4jixkulc16vva2cxe6346qj4v4ovrcz29xwi10m0j5il3q7ql31x92n6t75ed',
                channelName: '085vz6n3bncivdi41a00zlzgkqwu1060htk6qwbxj2w6ssqpf9xg54mg64hdemlx8vqht2cn0fecow1bc4p0r9fy8c1b1o06s588gaavfx15ftl808cvossfdeyxcjjyq7v9oshut3ldkjowhj8qxxxqbb5dckth',
                detail: 'Mollitia excepturi ut qui praesentium. Fugit alias eum deserunt quo quis consequatur eligendi. Officiis voluptatibus incidunt. Consequatur commodi voluptatibus. Architecto nulla ut sit odit suscipit. Facere dolores minima est dolorem commodi eum.',
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
                id: 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce',
                tenantId: '50256894-b4a5-44f5-808a-cc75dec00e7b',
                tenantCode: 'ognfn8lyppk18mtar7mq4qf3cmvt3ivx5ywxsg64r3qdmp11cg',
                systemId: '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a',
                systemName: 'hwrgxwv0vmtgyziyaav6',
                executionId: '143be2e1-e31b-4a87-8a70-5fe8ee6318da',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-08-03 08:27:36',
                executionMonitoringEndAt: '2020-08-03 01:09:52',
                status: 'SUCCESSFUL',
                channelHash: 'tkxik8w3qaxfh167x0f9vlpxkf08vic028md8hxt',
                channelSapId: 'z775piac6r2s6hxf5rf90z2a1gjnu8is9n3ehz0t12a7pc9zm8',
                channelParty: 'ng4eqoonw1g2hl5acf4wpa4iclwnvi7phxrvaa7i694ds0t8kwcll2nyxgp3mvrscpbpcxhtswaohz3poslqgypn81xza2kgry4jk6nnt8989v3h6fogag0ha0yhhfwzmqr44qtnh191y9343qhx8cfmg877gjpk',
                channelComponent: 'xjescq3aebxuqb683yg9kv8vtj3z7781xvyg2pbm9dmoa9zpuqj86dnzn3v1o3jduknu5bo58v0lohd3oq2cx69oudynx6kj2633g2wnx9ae7y0s8drv1kifz2rog3ijdh0hivs53s4xnconrgn3dkqtmac9zsf1',
                channelName: 'sar04abglq135938bt0ih5yccpkl9m2y50ukdqtufh8oevx0veersddoaprpbg9dd5cc6blgd3tkwx65fbi4y4p6w6z9ix0pgs5drdr67qytfzhtf5y1fx4sqrzjo9zz3mq7c88r71sb5zy3p6s00bdwwbfb5cgh',
                detail: 'Distinctio non fuga distinctio. Laudantium ut est. Voluptas ex at. Blanditiis quia vel dolor. Omnis similique non et cupiditate necessitatibus sequi. Modi autem maiores ipsa libero quia laborum.',
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
                id: 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce',
                tenantId: '50256894-b4a5-44f5-808a-cc75dec00e7b',
                tenantCode: 'ndyd1rdfhvgmheyyaliw7uw0d4dutjfp9msutlkgag8uqhuxn7',
                systemId: '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a',
                systemName: '7mk6kh1sr9h41crdb4od',
                executionId: '143be2e1-e31b-4a87-8a70-5fe8ee6318da',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-08-03 13:26:08',
                executionMonitoringEndAt: '2020-08-03 04:39:04',
                status: 'INACTIVE',
                channelHash: 'wccoxo8lqawoq26nnobtyhkjd4jwihrpnk2alo9c',
                channelSapId: '76syednjv93rp4jlay8jj5udtd46cdcpyd50xnsjmzdyrcpjrk',
                channelParty: 'btcabqzu0z89dq8k7nv1gb3nmmem8qsbuiltfchtf8anwavvobkrx1co0krdf3dgsgq6jkg0frngwrzjdjemky218sn4wiiqt612tvablycj5birblw1p6zh70pycmslx19a8z1hfu2vl75ml0zprxz57l21gm32',
                channelComponent: 's06enyq4ruj72z7z71bg5qi0msub99jlschwaeljs14in10xkc274dyv23w5f2txprbsrgv95r9s3l3uoepjx2ncieb0jpyqhchas2gai228b9qjr0fuco280an5anl9ic35cqck5cdab6kglvb0xg2in43wldye',
                channelName: 'xu6smv5alrpscmb1ykc06j6575041eevud2z7cd49ugwei997keslxs7bsf1kwkmxn3r7ajcro6ijrm0v6azyxzal5zcigl83fh4gu19rcrktqcjga4j3gdolob6ezag7o50ari1mkmw3ap3f07bn8yvjpqmghjc',
                detail: 'Dolores quo nulla quibusdam quo. Dolorem similique molestiae. Quas est dicta voluptatem illum sit laudantium rem dolorem quia. Qui id et dolore et nam quia. Libero quos aperiam. Labore repellendus similique veritatis molestiae saepe quidem hic voluptatum.',
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
                id: 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce',
                tenantId: '50256894-b4a5-44f5-808a-cc75dec00e7b',
                tenantCode: '7ufinzrzy4w4nst8dy5dx3v4x7gcglhr1rniwm2hnbwmp4mq7s',
                systemId: '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a',
                systemName: 'clbaagulfxphzzf5u0ek',
                executionId: '143be2e1-e31b-4a87-8a70-5fe8ee6318da',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 13:12:07',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-08-02 20:53:03',
                status: 'STOPPED',
                channelHash: 'z92a4xcqjnmxznieni6ugufzxclvrf5g9y93ju1o',
                channelSapId: 'rjbmde4sidijkws97vcp7hbxuolr5ft2n540cpvhshxdevctuy',
                channelParty: 'w8chhhboojnjwr2cm8clh81isvd894qq4uegb9klrsmr7uvjmvwb7l0x7or4ldyj7wcdo0g4rkio5gn20emjda9mwroabu8zct3j18odtds2vz304zg26oiymaio7knledhdwzrspwwnyganwzvcd0wki9b7adki',
                channelComponent: '7flrbhvry52r5aid3npyxq2fug6ak2vau8mgrzm5qfe67db8mcqa6lyvw3c5bw684j1fl2qm3hnjurv0racsouc7z6008k33gu9ls8gdmz33udvkabvi6z23q26c8mleey55ncw6haxdtjyipwg2b212q91mkhk4',
                channelName: 'ognki4y3g6g56ip9ouru1wu9szmfne7yt9z4xl29jqkggtqfzes4d60pi6of2wfgl7u83q9sg4fg4fm3hve65czcvyiqgu88tn5mt5xswo4vsh0wu4menhjrav125j2p5637jsb3bmdsn8jvqk835ge4kcmhyyzz',
                detail: 'Id voluptatem ut ea id ut. Saepe tenetur veniam officia voluptates enim tenetur quia consequatur. Sit accusamus qui aspernatur delectus.',
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
                id: 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce',
                tenantId: '50256894-b4a5-44f5-808a-cc75dec00e7b',
                tenantCode: 'x81m2zcyvakvc38zqby15qomqnvcvcf9ndzmwavwxmqr98m5td',
                systemId: '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a',
                systemName: '5fmzfzu9o80h6uav0zyi',
                executionId: '143be2e1-e31b-4a87-8a70-5fe8ee6318da',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-02 22:45:29',
                
                executionMonitoringEndAt: '2020-08-03 16:13:54',
                status: 'SUCCESSFUL',
                channelHash: '4hxljfj7yrlarlnwb8t143xv5apmie359cbumwfs',
                channelSapId: 'iaya68bzfftx2w3egoydx8c3h5by84kqgzjmtxp62vgxo8fw3j',
                channelParty: 'h71i0vqwb56ipnlge1srikzz66fbgbikm8pupcu2v84v369pkjn2iyqz7vfc2bpv3j9zzt4q8pmerdlwqhycoqwhnbcppqma9501ys8aj5sec3k1dvi9n25t2bd9cwsl07ovp16raavqemllmvxd7j3qp8hms3rx',
                channelComponent: '6bp877de6l6qty7eqjrbn3dv7v5jxw9pqqw6yuqguoggumpy13fmmuueukuilwenaugqic3vtlqm18al98ecnk977ljrps1y6vxq65yk8axa0txqnmlbf9uzcnlixqei559b04v7q0vjbcjd6pmoc4wmbw3rd49q',
                channelName: 'fl6s2gfrcpb5xrcyj8ac7fu8kpc0gkk2r04tw3uuxy5lvi07uevjka2bd0yl89tgvzienkox0bz887iw2etc5cne3g34vuddjl9gumb148t74qkgyxtikv51d9txve2npz38vxw0zuksbq5kpjyhbvk4u0gryjh8',
                detail: 'Odit eum praesentium itaque repellendus facilis ab officiis velit. Et aut et in amet alias saepe aut vel dolores. Autem tempore natus magni cupiditate ea velit nemo molestiae eos. Animi quo ipsa ipsum optio sequi voluptatum esse dolorem.',
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
                id: 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce',
                tenantId: '50256894-b4a5-44f5-808a-cc75dec00e7b',
                tenantCode: 'nwlj8zbxmmockdamtxx4qn3fearaji7wat9ss8iyaoj3a65mys',
                systemId: '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a',
                systemName: 'd96nov5jzkok0fuzlyt9',
                executionId: '143be2e1-e31b-4a87-8a70-5fe8ee6318da',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 10:10:10',
                executionMonitoringStartAt: '2020-08-03 05:03:41',
                executionMonitoringEndAt: null,
                status: 'ERROR',
                channelHash: 'gljkmzmpaxbtna6lzw1ajr6usd3gyopqvpys9cnt',
                channelSapId: 'ilpj17n2iofhrf48lgp1hn41apo39irhceer6j8aiypj90rnzh',
                channelParty: 'uj8t37yjbq41e98ro8u718cdfnsz04c7upsp1gb774inyikbc17k6rya1begl9i4qvi0v4edwc29g4aycd70rsxnar26wpex486bu8uhxm37rv1eulvndzloesh8du34bs1l0eqs9l0wgkzqf08ot9bf6xui6psu',
                channelComponent: '0pvlehbmkc2nc26agq08a8p25lj2ms9l3o8654x7ss1rsta44v24fcksn6ybivi2fck9u9uey6l6dhdsbamkrnfu1pbolejmmcvo3gk1ekcauy08bv09vhtfepwtw7wjuqmyhm8ygpgekvhwtw7ut0sozu9e6d5f',
                channelName: 'qfxj896305nijb433d1wpa9dmaf0davaz48scispagnj6iixxeoyaxw92uzc7r2fnc7zggd693lllwwhdbk9u553xq6jue4fm2x5em8iyto1l7nl5b0ikxf5u9dufpzvp6cte191a0lzan2nwjscucgmef1rgovw',
                detail: 'Qui praesentium magnam soluta unde. Vel alias accusamus ea tempore cumque non alias quo nulla. Minima nihil omnis enim nulla culpa. Officiis velit delectus corporis aliquid velit. Qui nisi impedit aliquam quibusdam et fugiat. Corrupti culpa assumenda excepturi.',
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
                id: 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce',
                tenantId: '50256894-b4a5-44f5-808a-cc75dec00e7b',
                tenantCode: '5q19ts2fpfocn6yivgkatkcj33d685kodob7b0s3rg0q82i2sn',
                systemId: '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a',
                systemName: 'be4wimiaoecbz1e4p0uf',
                executionId: '143be2e1-e31b-4a87-8a70-5fe8ee6318da',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 15:02:09',
                executionMonitoringStartAt: '2020-08-03 15:23:16',
                
                status: 'UNKNOWN',
                channelHash: 'u7lxmlekqkm8i9xymq8soux4choo6bu1ovje0hhm',
                channelSapId: '1iewe61erayrcyqppyx2v5a6kzpbpdryo87q7zyczzmquyccms',
                channelParty: 'hcuouwvovt2txdezy9p1utoe1lyralobe34vdhuv3hi71p3vf56sq1fzj1clhvb1k2tu7rzf6wrzl70y6hwgif9k1nk93rgwdk09aa0w5meo6rhl1c75ulp1wlf3kp2e1tbs15fs8jtaq06458hl2ixvlliaanhx',
                channelComponent: 'uw80beao2x9u0u7patpygo20asjdg847sa778umopoi0wdmyhd60rzrbhargru953r4pts8g7uxn9u6n7gdo4d8e4tcrdi0176ke33ykk1um9yv09en9453qfv69mwn35qp6k0e6jq48ghq0o89hahablccanukm',
                channelName: 'edje5hkb5ldyi2jmywat9ha9n414sfj15ba97fd9zezgut37py7v9ng8tk6ugsy4m8cnfuad5mk2bh0dh18fi4d79923d5xom1hhih1qma4l36d6i9sis36gujinm3aqcohg57l1rn37vjbdemr6pg4qbingpkil',
                detail: 'Labore aut inventore ducimus sapiente dicta sed. Debitis sed consequatur magni. Incidunt dignissimos optio sit eos aut adipisci quod eaque. Qui nostrum nihil dolores ut laudantium sed.',
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
                id: 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce',
                tenantId: '50256894-b4a5-44f5-808a-cc75dec00e7b',
                tenantCode: 'nlcrdl58n7qziggjqwumm95v97okbrr51446xfvdptr3lhuwjh',
                systemId: '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a',
                systemName: 'ao8q9uwg9xdy7b3zw64z',
                executionId: '143be2e1-e31b-4a87-8a70-5fe8ee6318da',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-02 21:37:48',
                executionMonitoringStartAt: '2020-08-02 23:21:52',
                executionMonitoringEndAt: '2020-08-03 08:01:03',
                status: null,
                channelHash: 'ne8gitu9cuxixy4mdn4y65mzvpsbyysgq1mbuemo',
                channelSapId: 'ix1p8f4upyetjm3cug9sthrf7rpxmkf2xjjul9kzj7jymikxrb',
                channelParty: '5fwjw7ldw2mh9unv4sz7yj0o4a6eh2h6jesph3mcwvmso88ld25u93to9jm162lvpiulicthxvtus1kwab7so1k0fx0n44wjtb8a0c804mz91t2tlsvypvwl6jt3ynpmbdu4pb701fjwbo3sp4imdkzoiuxlhb6r',
                channelComponent: 'x2stlhy8mxwn1c7im3hwweawx8246s69otectalulothvzrv4rk7lv3hftvswwnk3nrwpu5uyigjzaesgc0y8m16teareygr1v4dki85vvw8oarx4qt33084ry6iwyu6xh890ondj6kk2ryo1tlhsncveb279h1j',
                channelName: '3mf0qxtdh1vhvoqz778jq14ha3wfsi5d29iu7ax2f0roq7d09toblgtdzl4g6m4i31aq23dt5reepq85ik6doojq5prlw90tv6l50gy3967iyfkei8yud7huq7gwl6n303vg3xppk8bc8qpl0m0mw7uh7ltlieeh',
                detail: 'Laudantium possimus amet culpa atque enim non minima. Dolorem commodi cupiditate. Libero aut magnam qui recusandae alias ea. Ipsam quas atque dolorem. Esse ut nostrum nesciunt.',
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
                id: 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce',
                tenantId: '50256894-b4a5-44f5-808a-cc75dec00e7b',
                tenantCode: 'vtqpmnayal2k4klytga9px9ml6enhcnetsz32rnb5xyxhxc2ep',
                systemId: '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a',
                systemName: 'cli89ilf8shryzswmjdj',
                executionId: '143be2e1-e31b-4a87-8a70-5fe8ee6318da',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 14:29:25',
                executionMonitoringStartAt: '2020-08-02 18:33:02',
                executionMonitoringEndAt: '2020-08-03 15:57:07',
                
                channelHash: 'q3y8z75llewwhzdlkc3gk6gdts5u70a3or17xdz5',
                channelSapId: 'qtd8hjewiaq97zhvw65rbw0537ckz3oa41dvpcy0in9g99c028',
                channelParty: 'rdr85nipgy0c77bareg68vomshrfderjdrsn4o8wkyf6hertpm35jirgfsgf1adhfi8t5ul1iobo69kbnp0m83v3l3vi06vjpt38mgs9nk2ok90bnzr3mu6nmbw2ngkjo1tbilgkh3rxku2qlmyoqyg30a52p826',
                channelComponent: '19cqp6r0bfpgvmlnqd29zt2fpxxhz2vmtg2hq1q851y6e4tcyq9cqqc8n9k4ni6rjymqcqgv8rkwbqnbbpu2crl505t3fndy79m52qos9k0skcb8t5b1gjt4le1x19nj8lr0fvo2gswjy5qp323rb2xudpn9vqhy',
                channelName: 'hf8tmem62dga1ju61pc3mmoqgk3kjaldyalgk63gib4e2ujlsbuc3g18oz97h1vjdoyjfdo7s1m40tsyi2t8c46m1o99e04ihobsl0ylma2lb1doa52ehmemryvxclflx8w66laxs6fyago83ljkzjcwqn2vf6kk',
                detail: 'Voluptatum labore unde. Tenetur consequatur quod dolorum doloremque repellendus. Quos alias quia. Alias sapiente et et occaecati voluptatibus cum. Sint debitis rerum voluptatem doloremque ullam sit.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailStatus must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce',
                tenantId: '50256894-b4a5-44f5-808a-cc75dec00e7b',
                tenantCode: 'qy41stx839id1rdsytue8i9n1ipbr8haf48g0oikyisoyl0xpa',
                systemId: '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a',
                systemName: 'vx4o1zl0677teiv1ngk3',
                executionId: '143be2e1-e31b-4a87-8a70-5fe8ee6318da',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 05:36:10',
                executionMonitoringStartAt: '2020-08-03 17:33:11',
                executionMonitoringEndAt: '2020-08-03 17:34:30',
                status: 'STOPPED',
                channelHash: null,
                channelSapId: 'y4m65f0ktvi64tqg2iopljmi888vfvvrktdkdnx3ts6edhu6r3',
                channelParty: 'qsbz3wtx4s20qdceudpjfbtvodqjmeuuux023r14hx523t4ay5xi982x8nbc6a64nmx7bg47r60v90bdiggvvmuv4miq7b3pjgo8nzbutbjlpctdm5pg294pjrh965f8ug50jfugxbvqjwjvvqchqqm50ftaitlz',
                channelComponent: 'z761lruv52h490uvbttuez5mc4r4k33vmyvxmm78hyaond57wxbzesra1czno8sxukgkob200f4n2r3gk873jm34f4vzhuqmbb54hnxl9a2e0doixic8aabrj0p5fvq00x9uc3dybm9h5nqzbovmojcv1wiz0que',
                channelName: '9l59qzdovpcnn7b2tspnnbqjmtzi9p7wvxd6rkx2tw1fvx2iy6hhietosvezq0mttmmtkw87rj5h4ofk26hmba143kiznh25430tdhox6y8aw3mpcizer4esda8k6tsqudalwdtwqr80i6m0blrlnluo6dw8t7gi',
                detail: 'Et quia amet praesentium quos. Ea assumenda voluptas harum voluptatem. Odit ut natus atque sint. Ut illum dignissimos incidunt cum.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelHash must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce',
                tenantId: '50256894-b4a5-44f5-808a-cc75dec00e7b',
                tenantCode: 'ok5uraf9vug990uo82dglt5y9mlhlbg8n174c49ms0e5u6w9mz',
                systemId: '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a',
                systemName: 'm2689axpr6yed5tdvbzz',
                executionId: '143be2e1-e31b-4a87-8a70-5fe8ee6318da',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 04:33:04',
                executionMonitoringStartAt: '2020-08-03 05:22:57',
                executionMonitoringEndAt: '2020-08-02 20:44:45',
                status: 'UNREGISTERED',
                
                channelSapId: 'f26f0jhwgkrfm6g31c8dslr12jf41tkinll6ni8tuzohuno8k0',
                channelParty: 'q5q3m8balkhg7e7db7y4i1ekulhpx9prtn4l3ztrmcbscl8b4ku6nfya20h6sm81avsyyajys8er2zx0gqz17b46bb4wy41e9acnqmhjleja0gos14pwgflwbbmmr6ufqjmyy4nliek8o7ohhc7mf7c1w2mhwepo',
                channelComponent: 'abyxeruzvhgn2nui09zqt7usw7lyke571vdyj5a0spyaqzii6szl1qj8l2o84w8nb2p85mjs8aiv7cwxigi83oxcuvxkqlcfbvep4em9okpc7n547ynlii45votv4yvirlfwyxwkngddwfekq2ntpdcv4skcifwy',
                channelName: '4xq4zdfex1x212t7y2sq4rjrgqygqlx500pbrsimt8zoww9e73jbeot5l19whhh80iapqgg26szq4xf852jlp8krrah4bil4hpwa698hu8pa3vz18202fuukclib8r0gvqja1ka8cl6iop1tvdoxeiv7rfobia92',
                detail: 'Deleniti soluta voluptatibus porro. Optio impedit animi. Iste alias pariatur ea quis corrupti eum aliquid vel.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelSapId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce',
                tenantId: '50256894-b4a5-44f5-808a-cc75dec00e7b',
                tenantCode: 'f22uxncyljgkd4j3k1sma9ohxkb6vm2uh1r4ji4m6mdmwecm06',
                systemId: '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a',
                systemName: 'sn8uk32rvev8rufyxx6b',
                executionId: '143be2e1-e31b-4a87-8a70-5fe8ee6318da',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-02 21:47:36',
                executionMonitoringStartAt: '2020-08-03 04:39:28',
                executionMonitoringEndAt: '2020-08-03 13:44:02',
                status: 'UNKNOWN',
                channelHash: '7ttrdl7qmwycj7vqxwayxpxl1po0fw2ix1zbicyn',
                channelSapId: null,
                channelParty: 'b21f3ul4wyxwtu843byf823q4kgw6r1t3dx5wafq0yg03ulzt59ueax34326x64ojbsj7rghzy9bhg9szpnm7v9dpyw1wrpxvik30id5rz93tthjictun39xi7osn99gli14us6knr18g6pq25yafle9ydjne41b',
                channelComponent: 'ovyydx5f8gple0dykwrfbtislcnewozm2gc3rn1e8qok5hy0mps4fvvk8rnb5klfmo594ar35zwnpru1z7ljk1zyiiev7enc7nqw9sr69zp0qkck69zd5x7yqch72chtxor7acx39uzk5gmgcd8duh1jdzkyz14w',
                channelName: '3famg730k1czww0zrd34ut7z7sq154twiwx8wmiu5976247apugvvqvjs1cp7obkti8244e6jxene9ox7rfy7sgvqshn4edmbte5u1p7g3f0etqsrn9h8r2by7odxd0hr3ml76st8s3y7xcqm8ttpol11xpgrs1w',
                detail: 'Molestiae quis officiis est dolorem libero corporis. Repellat et voluptas qui id animi. Cumque quo sequi placeat excepturi soluta est id. Odit similique excepturi sapiente hic autem magnam neque velit cum.',
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
                id: 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce',
                tenantId: '50256894-b4a5-44f5-808a-cc75dec00e7b',
                tenantCode: 'i4qt4y3nhim0ns471t1rnm4kzrpjxjq7nvobgyz0t5jyxgvzh7',
                systemId: '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a',
                systemName: '3g0rzkip809fs9n2emo9',
                executionId: '143be2e1-e31b-4a87-8a70-5fe8ee6318da',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 13:00:10',
                executionMonitoringStartAt: '2020-08-02 20:10:44',
                executionMonitoringEndAt: '2020-08-03 14:04:29',
                status: 'STOPPED',
                channelHash: 'orvv1d8y9qj0vjamvx3b7xpcmgy1676z06zy2zlb',
                
                channelParty: 'nnj0g7w5k715xeo1dekcu7h1chsakkihaiol6lq8c8peg419opqu5w17mha06tauaswp6f3baepct9p67lkdpf9pfng64b0weoccuuafgpft9yl98pnzpg630vvywzcijteiru6meuf0fkjfdcg6klnf1nrb1581',
                channelComponent: '55b0mgc31fo1v3qike09o18yej05ibjgpfn6ngll9rm3qgo9r0vpr9y50smlieh4agtporapmmhjc4c1l7xtuh0bj99k7ql5qks4rd84dfr4s3n03hyu8vbc1dxlrzeajh9l753wkr6plrlqjtyaetjba7pqo26w',
                channelName: '41o3gn0k4gds3zpbd0r2az0uke6fqlovue7x7fle8xxtiam2b02z5iejxggcxgiwwcudwdfj0y8a7ti5fl6ccdfdzz1ezygks1lkat8n7mvt3ettz9irtjxnssn3l1mwfmfj7cwd1v34vd0rk8626k7t3lta9z7m',
                detail: 'Praesentium sed sunt quaerat velit minima. Aliquid voluptas ut voluptatem in eius. Dolores veritatis ut esse ut quae cumque placeat repellendus qui. Aut aut in at vel aut distinctio quam veniam.',
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
                id: 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce',
                tenantId: '50256894-b4a5-44f5-808a-cc75dec00e7b',
                tenantCode: 'vnjvtyzdlw3tteil34ljhq59k5re9bqgbouldhv0s3ecjhodk6',
                systemId: '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a',
                systemName: '1blilmq2h56yv4amiewc',
                executionId: '143be2e1-e31b-4a87-8a70-5fe8ee6318da',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 07:25:56',
                executionMonitoringStartAt: '2020-08-02 21:54:43',
                executionMonitoringEndAt: '2020-08-03 07:06:50',
                status: 'ERROR',
                channelHash: 'iwfvh9mv71olklko38k1320pq0sg0ixt1xyvuap9',
                channelSapId: 'mun9ky5wzhrdk2zaragzx6wupc4mrjruwwuca7mtnt0c24qqd4',
                channelParty: 'fyqjntvgfkhr360iqgxpbz66t1ljqfn94zyd4ac2s2xevapmxnia7bra14qtafnq7qz87oqgt3sm9izjo4lb8qbaal5j8gu82mxkrvsofnyln9sm3zsvlw1ro9y0gboog0hruwy2o4lvwi5wmuzibrr123cfxuxk',
                channelComponent: null,
                channelName: 'puabe8cixhn9j51c5aia4z3jk7et0awaolk6yezci82z1x0hl64rwncfd2bn9w4nq9b2biisnn2yx3v8gzibtgtce41goxnbr6oj4x85bam0j724zghv34pgkjd3uwgxiaa8lpuv4in6dwq0lewo5u2i7qpb44b7',
                detail: 'Incidunt reiciendis totam rerum et sint. Ab et eum vitae quia saepe. Porro impedit dolor doloribus asperiores dolorum aut soluta quas. Voluptates quia similique accusantium dolorem culpa et non pariatur tempore. Consequatur facere aut dicta.',
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
                id: 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce',
                tenantId: '50256894-b4a5-44f5-808a-cc75dec00e7b',
                tenantCode: 'g78dxf7fr6yi8widdq3radndb18fwiffi2swx94ks3a1h1wg5a',
                systemId: '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a',
                systemName: 's6y5w30sd4gdt0vqix4h',
                executionId: '143be2e1-e31b-4a87-8a70-5fe8ee6318da',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 01:43:23',
                executionMonitoringStartAt: '2020-08-03 07:43:17',
                executionMonitoringEndAt: '2020-08-03 01:38:10',
                status: 'UNKNOWN',
                channelHash: 'p3vztarmhwxquxjqflxmcgcy4y2cs0mj8ukg3rna',
                channelSapId: '5jvag648dj00yojcay04cx92vplg90qplwptwzyei0bjp7m9ih',
                channelParty: '6z2fbj8tzogm318y7q0ejn62npwd46xrtz1rddeotfx2d0vxmphsu59wv0bv1dif5z2j1m97u3l3ryk307cmla389unrziwtimpt7qcs3p51atc9z4fak18kfbzy1ldlzsvlt0u4llzrjrxak4vrnu6fe7okw6i9',
                
                channelName: 'yhe26vmlwczr07f6hipduk24jl6y94byxrzn0yyirq64opvimpjc84q2x0jwyekwbgpvcpk3ld0qof5siy2uwzrcbekghctypfip3ydqlof5gufzwtddaqeoxjp0sxxblmopcbrpbz5ktmubsy5kis1ajbi6g073',
                detail: 'Iure dolor totam ut reiciendis aliquid dicta. Voluptate odio dolorem in dolorem. Id expedita fugit. Ducimus quisquam sit. Quae autem dolorum. Qui nesciunt eligendi a.',
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
                id: 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce',
                tenantId: '50256894-b4a5-44f5-808a-cc75dec00e7b',
                tenantCode: 'hdbklbjl55rsjm6fb4jeaxunqfglci7wqqjy3v2b821udzcar9',
                systemId: '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a',
                systemName: 'jh2hoy6bjv9kzqcwho7v',
                executionId: '143be2e1-e31b-4a87-8a70-5fe8ee6318da',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 01:53:15',
                executionMonitoringStartAt: '2020-08-03 10:53:32',
                executionMonitoringEndAt: '2020-08-03 08:34:10',
                status: 'UNKNOWN',
                channelHash: 'f7zmzumprwirexfntf523w30qtb7sfx7radphu5e',
                channelSapId: 'xc1vwt7qb9x8x0xekpdu31zbixngbfzbbtp2ppqjs28mc05lf6',
                channelParty: 't4kzdpfhnorlrzwfi91c7w0xa7t4oi1lsbkngogu2gxkje6wz11hn0mg5y7lcz733ew0xss2btkba8n9x2hte8eqhwd6vndso4y6su6wqqrix0hycgl0at54xcrl5zw7hik5ri83r6vop98og06pw2g8vmbytxkr',
                channelComponent: '2mtv5ezvhum67uwoigtix83scv336b1z0qkaqvk2e11f74ruc5bdynqo2hskeydsisl3075v2rtcznnbgh3s1xidfkijsswza547pajtwcbq2cjq6sex3rn0152tycu29uwcocbcoiptssqb19bnl0z5tu404ibl',
                channelName: null,
                detail: 'Sapiente sit maxime. Facilis est itaque consectetur reprehenderit beatae. Exercitationem consequatur aspernatur quibusdam dolore sunt molestias blanditiis.',
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
                id: 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce',
                tenantId: '50256894-b4a5-44f5-808a-cc75dec00e7b',
                tenantCode: 'e57rixh9i4fw8x8qgqih7nx7imvo8pksuxw00ul5ijn38r3ciy',
                systemId: '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a',
                systemName: 'gxgqf3ablysy0gfl475a',
                executionId: '143be2e1-e31b-4a87-8a70-5fe8ee6318da',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 07:41:03',
                executionMonitoringStartAt: '2020-08-02 19:33:54',
                executionMonitoringEndAt: '2020-08-03 02:56:02',
                status: 'SUCCESSFUL',
                channelHash: 'mrt5orhp04tsdbsi5wzs8pxdurji923ziffpilwm',
                channelSapId: 'rztyx3tcu0p9u1kx8puumvvdctwhkepzqyqx10drz16cdh84xx',
                channelParty: '37jigq31jq18pe9m4c75ilo5qwokfofxbj8l1w5kh1vvje6vg4bizno0hdbxzz2uo3129oev8xesyq1j2nellswr41g4ngt03s19n92c7szpqffhn6vtpfm4ydj5xb9e2lwh5bzyi4c4usk5ljw420bu6zfoa3tv',
                channelComponent: 'eg63huafea8ryjc6r7kuxfvcpytktu5z0g3kuxd7e0zg7uk9gh3mouvhpsdo8ky5jftn4hphoo0xrb4co88ataumb6ikq5ej46rcfb4m59pw99z5la1a845cinn9bti7zrwrlynp5zp7d0luqsqc385snv754acv',
                
                detail: 'Suscipit et sequi ipsam et tenetur beatae et. Ut esse culpa voluptatem quod expedita delectus incidunt. Nobis sit animi alias dolor quis. Veritatis porro id sed sint molestiae dolorem totam. Soluta quae ut.',
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
                id: '0j27pimj99l58tgo5gbg04jieldyt4jqi3ryn',
                tenantId: '50256894-b4a5-44f5-808a-cc75dec00e7b',
                tenantCode: 'xkq3owhyioubcdnftiogihtqp0vix7owp7jf4e9bql4v5nuy2i',
                systemId: '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a',
                systemName: 'uoyekjbb0jvhb764gsku',
                executionId: '143be2e1-e31b-4a87-8a70-5fe8ee6318da',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 15:41:31',
                executionMonitoringStartAt: '2020-08-03 16:59:50',
                executionMonitoringEndAt: '2020-08-03 09:37:15',
                status: 'ERROR',
                channelHash: '1aghyjyxrdf8bveckktp1yz7uobtlbnx5j88bdx4',
                channelSapId: 'qscas7i0t5qhjb786c74srnmmr0u7ahgpasbf5tjbp2k2muq54',
                channelParty: '6v9kk6q7y667uimev0r2lwiag73tgo7azx4swlbtw0a32jg995lm7n33eg0gffbk0nshht6seep7veghatsgqqm1aouu12750ejlgtmsspxrxmu12vt8dv2bpdxht6oqckfe0h38rf2a5dd0n5cmopr22xubcnpm',
                channelComponent: '2d8zqetachf9y2t3wejoughcgvjnt5w0ym5xo01of12djmrityt63u4i2n9nbmohkqrqr8ryr3lxoi7doa4svznrxf0lqxf3ws0pf80skupxf8zmdv7azo3kxvzr8ela5m8bqlqw2ku0ftbafse32nla4heu7oc0',
                channelName: 'kv4b291eqxfmew0jlxpo0fo9t76n73kgj6e2jlwewvzebhc7fpjfcvyfbhr6b801exypycro83dt6quq8mx7h30d0shj68e245qewd5c9bhwswzjip8i0zpouzup1qz20wvrt1w1v28qhwy2wshxswwa69ybesjk',
                detail: 'Eos quasi quia iure id magnam deserunt optio. Occaecati nemo non quo iusto quo provident sapiente. Ipsam qui est velit rerum blanditiis animi est.',
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
                id: 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce',
                tenantId: 'hfwge720b1a90z1payoqvakbxf9eibigv7gi4',
                tenantCode: 'vc6188adsmn3ux1l1b4ndal9wj903t1xefl7ah9l34ppy0m6u3',
                systemId: '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a',
                systemName: '3e3hpa2iu6kqeyjfu148',
                executionId: '143be2e1-e31b-4a87-8a70-5fe8ee6318da',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 12:15:03',
                executionMonitoringStartAt: '2020-08-03 17:12:20',
                executionMonitoringEndAt: '2020-08-03 15:37:24',
                status: 'SUCCESSFUL',
                channelHash: 'kxhoks2xzm6ud0k7bq4dxjnpx22pzvh3hzxwvucy',
                channelSapId: 'z05jeqys11utwl3a31bgfxi2xl2qyrsqvpbhrnjxelcxd6cu8x',
                channelParty: '334v77ftb61sclrvaaek57zsadhpy278m01dpufglbfx1zt8zc8ly7euk479eii3mblhgkpan77kb7cv753sbs4le1brskk1cc971uqsu1j2anq54vn1t7me0wk3ych5hvdgnqxcesj23pvhh05bthdqozvnnmoz',
                channelComponent: '9f9tsb2jxszo5346lz2azuj9b5zc0fktoujmxchinkgdp5kdm8j529ka8kzdyc11bv9p1ak2buz7vtoui61xj6atq6wjq9ew4mlhc59jqbwhx1wvlf4t2l66dt5q7tdrmmgh6fmi9qffgjjiy4mkql95i2chyh1j',
                channelName: 'xrnnj75gzwku9o3ztgsg26hjrzoolhg9shnao632tf2c1dos590ii99p0s1tq69ufm28waeazhvg2blrsu02y35b6b1irwcjtng861zudngc8mq96dmsbhleocnq2qeaqgv4prco2xpy3z33ox33xax5jipbotxs',
                detail: 'Qui consequatur porro. Deserunt soluta unde adipisci rerum tempora laudantium. Alias reprehenderit consequatur omnis.',
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
                id: 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce',
                tenantId: '50256894-b4a5-44f5-808a-cc75dec00e7b',
                tenantCode: '9mwzqguyuq36xp0bhxzia766j6ieukpt9klnx788wl3a6q3vew',
                systemId: 'c8w9c5relih70ovc3k5iqp8umhlne6k60n20l',
                systemName: '3rh5id389w7jqq8vb699',
                executionId: '143be2e1-e31b-4a87-8a70-5fe8ee6318da',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 07:57:45',
                executionMonitoringStartAt: '2020-08-03 02:17:22',
                executionMonitoringEndAt: '2020-08-03 14:11:51',
                status: 'SUCCESSFUL',
                channelHash: 'bax1bnzzyp9ruyywqgjiu3awrymkw9ou0lzjghmv',
                channelSapId: 'l6wlryt37wauxs4htxa91qe0kztn8o94ohcja9p0rm70bo3gib',
                channelParty: '0hxjna936ehcxg9gsa64jbbapq10sl5tl7hi167k42rd9oct0p6nzrjnqcllvnqv0xa6epbqs6ifbi3yjsgggxyfk0sh9izyvfbt76wwnao8rg3gcl17og81s3o8ay61t941cm0587jn4x40y106r1pfu4sr8er9',
                channelComponent: '18w7g1vs4vhqrnhry3v08yyn2wrn1gaax8qbx7c0lndu984i07h1pdaslznfsudws0yu8putmkhfrb7kv1f6btrrqjwm3s3qdiexk9nbvvnwpyk7fiz11z3maxtw0vjrn4bdkpuzjtcxs8juz3h0u4x82vzv7aq7',
                channelName: 'zb7tuf212vv7dso6o9pvvrwb5h63q7w8mseq7h4yj93vov58x3voxz8mdp9xzea0i2cnmf9hw6keqqlnkjuyxim2l6mtfgniyecruj8vmmh9lav80o2pztouiczu3skm1d3dd7ofq7fecilor0xltqk80iq1o0dg',
                detail: 'Veritatis voluptas corrupti voluptates perferendis enim. Culpa minima quo ea minima labore quia. Tempora odit sequi a harum exercitationem delectus aut sed sapiente. Minus ut modi ab similique dolorem. Et dolores repellendus.',
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
                id: 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce',
                tenantId: '50256894-b4a5-44f5-808a-cc75dec00e7b',
                tenantCode: 'fdf8ie3y6tbflcjym9bwzyxn5v19syhoab1sbi5nsy06wtxzmr',
                systemId: '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a',
                systemName: '7ny7nm3jy2v4t8st169y',
                executionId: 'yz8xwhyhw35hphkt9pnql5iz7x3lqwxiryr1j',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 02:39:56',
                executionMonitoringStartAt: '2020-08-03 10:54:42',
                executionMonitoringEndAt: '2020-08-03 00:15:55',
                status: 'INACTIVE',
                channelHash: 'ivznna2q6z6ys27c3hfbsez4mkxpbb1yzkflubc7',
                channelSapId: 'hko5qc8n20f6zb4e9snmcgru275nvvlwxubkdqxhb1ww5yx4wf',
                channelParty: 'o2nqwibrbvdh5u2cden67zjn5wi4xzhd4663k8rak64bocbdofugmb3171qkodeajirir3jnx0mzywizt12p04lsxgepq5a859prpbidnom1u3z136aaomt698dz8i42p3aeutix3nydeaijbtg5i24brg9kn73x',
                channelComponent: 'mgu1x3nlpoof43v839yg7hlsallsxcpuci683vi0dzu7b7xaxqir2xuog9i64hn0y28ub08b6m4g0z1f29e3vjve1elk30daxh8y6vanilyimpzsmsbduhcwqqasrvoccysagyqmwhcrndzprrnq5vu7xlulpb8d',
                channelName: 'w9e1mrmivc709l5gry7g0y0t66xdcgupstoyxtk2h0f5hhb5dkttpsc9u3mp6x5i6kx4au864m1spokzbuuw1png2iqagdo2u57knpomulhftte2tdtayzk1kwbh4hxbkm7o6enjphuf4p8hy8929kscvwe13leu',
                detail: 'Sed magnam corporis accusantium eaque ea excepturi quis beatae. Et ut repudiandae ad cumque. Aut minus molestiae distinctio eum quos necessitatibus sit. Exercitationem alias numquam consequatur voluptatibus optio est sit dicta omnis. Itaque voluptatem autem libero corporis vel voluptatibus quis.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce',
                tenantId: '50256894-b4a5-44f5-808a-cc75dec00e7b',
                tenantCode: '14wxl2h9nktdaolrqnh9azo0w7uekd1krtxe027yy61v5zmqtd',
                systemId: '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a',
                systemName: 'rsvpt25eylsp1ct1kdg3',
                executionId: '143be2e1-e31b-4a87-8a70-5fe8ee6318da',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 09:20:31',
                executionMonitoringStartAt: '2020-08-03 18:14:24',
                executionMonitoringEndAt: '2020-08-03 18:27:07',
                status: 'SUCCESSFUL',
                channelHash: '7z0pudx6derfmqts070b9tyji6epoybpg9s3ca9t3',
                channelSapId: 'g0u6v02bui8bfat5zgwtqehk8x04pxwi03w1se68idujzl390t',
                channelParty: 'o00o5a4xcfvdivl4tdpjy4swgnuju5g93dytwkmx39oex490zto3hrfjfqfpioe1fmv5ej6mp7ojwu2or1j587b2ijscy6fvfbj3jywyvl6ry5w53uhia4vot36cf5h376re9qrjzfy2llmam2phz5me8msb0qqj',
                channelComponent: 'fu0p16egp0urwnvs7qnkv0r3aq7ca4h4bpg6mce89ecxn11t6vsa816aezm022u5a4nszm35ogzacdlvtztnc20zfyb4ne3meqxcyn1dmr0xmr4gyz37t6ocxi28oc5jxmvfah53kq9itlocp3jvkhhb5kjgdn59',
                channelName: '40ti4serlwb0dgm2zlqmrgbzu8cwfg7hxh5o0nl2t89vxz3yyll6a1al9l4be5n8r8qw68c8x8qfrdde4plplxcl6e5wipt3mx9sisnnvwvnmi5sbea2o28g356sqknxztytxrp92mdr636mnnztkpqu5xa8bqrg',
                detail: 'A amet ut. Enim id quisquam sit repellat ea dolores nemo. Temporibus omnis laudantium omnis quo sed beatae consequuntur. Sed aut aut dolore. Et earum quo iure fuga. Repudiandae in totam accusantium harum non quos ut blanditiis.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelHash is not allowed, must be a length of 40');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce',
                tenantId: '50256894-b4a5-44f5-808a-cc75dec00e7b',
                tenantCode: 'a51k7ux4qwym39uyla73obzcy1gwc230a5kzy7rsydbmzib4scm',
                systemId: '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a',
                systemName: 'nu7nv8b5hnhozgcsssa6',
                executionId: '143be2e1-e31b-4a87-8a70-5fe8ee6318da',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-02 20:36:38',
                executionMonitoringStartAt: '2020-08-02 18:55:29',
                executionMonitoringEndAt: '2020-08-03 16:02:47',
                status: 'ERROR',
                channelHash: 'j7c4pookd7yyke5tzntxwwslwj9ylmuyx6ghhid5',
                channelSapId: 'ji87sl0fvtv1ciu6y58qc93fr6s7n8lr50fhbndkvurn2snj8r',
                channelParty: 'b5wzabe0pyvvnb9hnta1bgn0sw4jwsidtzko71o8no5dss0cq83l4vostasdoylvosha74384667vrp6ka5l9ft8bmw7uz4p67warp6o680tyqeeldjmqnafesk93uy1diapa3pff8p3wh4jn4fxp6udg7fln2h2',
                channelComponent: 'fgaox3pc74jj0ig927u4imby5l0g543r46vh4i9riaere4z80224vr0r8jeghnsigmfdhb4bcftlgolnytgrrdqfgdst9760wgkfao5el8owvdgkaulbvlrm2ltxlnfu87pk0j5dem5hct2lb7thb7s3y738mjdj',
                channelName: '9azdpx6j9q76nmu0z15pdux9fu6wffn16za7mhsx1ljf56g739b14z76z8q1zwo2coaane8d7en501mu1hi1u93drwqkc6okagntqbyh0z7ijty8qzfxdyj5hob7yl2k7jy7mbwoiih546csb5sv5a7u64z8l2lu',
                detail: 'Ut molestiae dolorem rerum qui soluta. Voluptas animi in tenetur voluptatum. Et doloremque accusantium voluptatem amet ea voluptatum omnis. Sunt veritatis ut et quam et nihil voluptatem impedit pariatur. Molestiae odio et.',
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
                id: 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce',
                tenantId: '50256894-b4a5-44f5-808a-cc75dec00e7b',
                tenantCode: 'jv77a6x84c3acvwmpxot4mm5r0sbd2nx9yxg7dlsm2fnq5qwpj',
                systemId: '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a',
                systemName: 'ypk0oihw0uew2fszev4f0',
                executionId: '143be2e1-e31b-4a87-8a70-5fe8ee6318da',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 14:59:29',
                executionMonitoringStartAt: '2020-08-03 08:33:36',
                executionMonitoringEndAt: '2020-08-03 15:59:36',
                status: 'UNKNOWN',
                channelHash: 'jyeqzy3rlm15mp3ydztg27s6zjtg6ol5h683fdcd',
                channelSapId: 'ywgnnki0lkzmkmpy1ddwnyde9u6bbe0kpackcx6k44ckjxsynl',
                channelParty: 'yxgjdo17ebvnqa6kw8au77wvl07zz1rr33o1v05dpr7x026xlio74jkez84k89n2kuenn0snsaugsz643xok0xa59qg6lou11ldkbtjz3b8ac65010qhleufou4qjr4rymut3si7puhx0c7ai0envc06hvwnq5ao',
                channelComponent: 'yvs51kbt6oq3o88i9r8jq01kanqzds3q8ghpuqeh3i1nwa6u79xkdb50m624we98fpdr5lwkmnelz3g6lfm5bq8hptf4ays7fkya53bvl6un4kmpetahp5zryxidg37h2ca7f33hd5nx84pxb68x0iqdo7cxrozs',
                channelName: '2xsy5fpbbjyb2tmgszvqzewfvlhh5t6uz8xjqd7qpn8wx6mpz17ig6l3zfmgtza1j4lx1q94nrzc4ne3bw8obwd91td0renr5wfemgvzd0ntqmoxl3ccn6djsezrzc3fm62tqery950tiieml8el69y2jyum84kc',
                detail: 'Voluptates sint aut nihil provident sunt quia. Quis optio porro doloremque consequatur aut. Est quae aut non. Dicta laborum minus.',
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
                id: 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce',
                tenantId: '50256894-b4a5-44f5-808a-cc75dec00e7b',
                tenantCode: 'x6y4r2rfwsbupf68buhpo4p1wqfbavwablv6tueb5sbtfh2dw4',
                systemId: '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a',
                systemName: 'f8uudh4p0sl3uewhzni4',
                executionId: '143be2e1-e31b-4a87-8a70-5fe8ee6318da',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 17:09:59',
                executionMonitoringStartAt: '2020-08-03 09:21:01',
                executionMonitoringEndAt: '2020-08-03 16:50:40',
                status: 'UNKNOWN',
                channelHash: 'fh3sxpwergig2e4hq1oh8aeufpywe5vkq8k4tbjx',
                channelSapId: 'syfpbyamt1fosctydhq0wxb7m9gm0p12fkindph1kk3anyvhh5p',
                channelParty: '8ibr7c9gnqzm6jngepjv8lgez248r2nvrym2o5j8phl1feafzx9mhakkvmiz380n6qia9j23gyc61hx44n8dzjjodur8os8jdqrkw4361monk3bjcpbdrh01qngd1skfnmf3wfctdd445jvsmc0wrzgi2ihxl79f',
                channelComponent: 'rwl66qtzaux7kbumo8s8p08uh8xvu0beipfik1idooe8mzxffdtz8wrbe92zv09g5n4u2iz7ke6spsrgkusfp6nbyixwzys1ypg5ta7i4ockfnxqm9eben4ko89wvlvilub0k1xubscyxpjkvypq6iapjih7witz',
                channelName: '85qa0i0kvxq3wvthkt9x67jo280vaxrqhmzebupmxokimwshnyn7c40jvvljkgpfmmsz1sdd7pa3suh3zv7fpq7maqfc4g6f3jtna7emzcaj21b2o8hrhsxjas9jmnuk699y6y4t4ma6qxh0i4ysd83c8omlp2r0',
                detail: 'Sed cum numquam sit non. Nihil omnis omnis temporibus iste recusandae et voluptas. Ad eveniet totam officia. Et neque in unde totam eum ut recusandae.',
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
                id: 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce',
                tenantId: '50256894-b4a5-44f5-808a-cc75dec00e7b',
                tenantCode: 'ua62jz99ycttp8c328nl9e7yjnt83e5osynepgveaenh51b9y9',
                systemId: '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a',
                systemName: 'uyxhvnwxoqgw8p9nw7oo',
                executionId: '143be2e1-e31b-4a87-8a70-5fe8ee6318da',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-02 21:47:41',
                executionMonitoringStartAt: '2020-08-03 10:34:40',
                executionMonitoringEndAt: '2020-08-02 22:08:55',
                status: 'UNKNOWN',
                channelHash: 'vl0dgqbbbqt27k74d4vzfuuwmfw7j03us7mct8o5',
                channelSapId: '7u71qntcbkd00c1r1tsotud681byjlt5h3bzvm43651kei0bxq',
                channelParty: 'nvow36enf8ca9ukw10e1vlkywqf7fxwls9l8x251w9dikl0ibhw8r3nr2gwx4vdv8cjrfr2ilxpmt05pf2e6z5cursvqjuehm6fy8777x2ynx98zwqwy22z6201zmbiw2uu8x2g87cvyhafebp5g4nwkdryt4sxva',
                channelComponent: 'hvfxcutkozx94klevim5ns4h6p08terh214dksgmdm07wdhxzbld5lnj5esvp2xc9jw304ohp31uak29coq1tivruozesjp0qa2x307xy8fenc25wg3s4np1vprgq84cku6bkzia1zfpduu9yv0tf4065ejtwda0',
                channelName: 'z7z4j7yapgbtmjvkoqfz008945rerqv1ecvesq3c0eyg12tm2u6vgwpqvi0n9wci0uuvi09mr1ud3pn3oc7doty4ec3pk8anroaipgyvjswb372ue4oofx3pbioxj8av3l6sly7wvmd2388voqmjkp56rjsywjvl',
                detail: 'Architecto quia illum qui commodi. Voluptatem odit et similique quasi. Et vel officiis quo voluptatem dolor voluptates. Placeat non eum aut non. Facilis earum atque iure eius autem veritatis omnis sunt atque. Labore id ut quo ratione repellendus architecto.',
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
                id: 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce',
                tenantId: '50256894-b4a5-44f5-808a-cc75dec00e7b',
                tenantCode: 'y8kih0sum7kjw6hugzpbbicks53oqvxrunz2w5p52z6s8tdlnm',
                systemId: '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a',
                systemName: 'q7qk1g3w6qut21k5yp1b',
                executionId: '143be2e1-e31b-4a87-8a70-5fe8ee6318da',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 16:37:53',
                executionMonitoringStartAt: '2020-08-03 10:38:40',
                executionMonitoringEndAt: '2020-08-03 09:15:06',
                status: 'UNREGISTERED',
                channelHash: 'rfzeenmmvgmvbf9e4y12r9obozdhyq9mfjdaea4p',
                channelSapId: '59npxznpp16y6wf3bib0id4tegip68x9lioyhlx4gdihpggvvy',
                channelParty: '4ov7sdujb5ldrum997h6w3ejfidjoe5g2uwlzujw0xdu41kvw3o7jwz5wgcy1iv8fp4atvauthfc6cf6spnjfxu7j8hh6791fu9snvgdr3vp4c18pxal275dogmlbbluvx6goxamt647tuvcximr07ak4ye5796n',
                channelComponent: '0d861ot78uxzmum9dryzg7mqz38mrfnzdfm9h413omc5eco15iw7xlwrj9o7bs7csw84xtst23r7zg2etpgtj7tvaitf24crbhf18p16vxr3vk1jr9ys9xmd3ra6vuf4vi1u9qbfwftkds3zvchrg7ba4ialcmyb1',
                channelName: 'zhz5lpvluanbidt0ztl7bdixtmi1gxtxjah31jg555u3ug5po3gkzzekptwvbvndio15wmabkgp19gmi0d09v27lbe3c3h2vm3fq7di2xh4lrn8xxv995jaezv15xcwqxo83lxuqxvu4tqznwxp1wxvrh65i0zw5',
                detail: 'Minima omnis totam et. Qui mollitia itaque. Ab ea rerum voluptatem quod eveniet.',
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
                id: 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce',
                tenantId: '50256894-b4a5-44f5-808a-cc75dec00e7b',
                tenantCode: 'xfs3f244592p138jva1qmnmpsaqzjzopqmu0uw12se5axl0e3r',
                systemId: '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a',
                systemName: 'la2r7rj2etg1jnkq18dc',
                executionId: '143be2e1-e31b-4a87-8a70-5fe8ee6318da',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-02 23:28:31',
                executionMonitoringStartAt: '2020-08-02 18:42:40',
                executionMonitoringEndAt: '2020-08-03 00:05:57',
                status: 'UNREGISTERED',
                channelHash: 'qwcd6f4bv79gfb742pk9h1k5umch8pj8e8hj96zv',
                channelSapId: '0k1o48g93vsz8rxu3xnidf1kvujceprw4ls6fier2707p9vuoy',
                channelParty: 'ika7qpb6imq6x7s8a3ahb2o6p1o2i3pn9l1uasnms91u1ith1iquiftadjzjy2sffakovsftj51988cfjgce2tqu6axsosoeywr4niac5ncu4asqtk309y37npw48nu6am6c7glhkpx8gdabgs409m7eabmueefx',
                channelComponent: '3of2je0owolhm6qpcdkd0vwpgzkscochnc4cdpn2oz30zkxgeonjkx28e1o3gvnsqhwnkz56wqgxg3zg386g1nnr7q8zdbj6yo2e5h5bfi47kpspp9t5dkhs9xedrm9wkcsonhv3nbzv7qljzj15gnubnojpevt5',
                channelName: '7c8f81p5wwct09fsv92v1ubra8ktk0wfp9tcpeoszcjyvt2bx6tqm9yi493bfwoielg02xxy9nk0oj99xwb4tqiza9dyusx0bpeih0bgkuueydljhy35dw92td5mjqkymwcun0wv87m13nmjbvwqd4hwrwjsyu17o',
                detail: 'Error earum soluta officia labore cumque. Ducimus a consequuntur accusamus. Quia voluptatem et facere velit ut. Consequatur voluptatem non mollitia eos unde dolorem eveniet quis voluptas.',
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
                id: 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce',
                tenantId: '50256894-b4a5-44f5-808a-cc75dec00e7b',
                tenantCode: 'y2llcev3wv1e5okm3am4fgs4v45u0rhvl4gz1itpaj5iexyeg9',
                systemId: '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a',
                systemName: 'g25vn7nwdxnxoa5pexmd',
                executionId: '143be2e1-e31b-4a87-8a70-5fe8ee6318da',
                executionType: 'XXXX',
                executionExecutedAt: '2020-08-03 13:09:16',
                executionMonitoringStartAt: '2020-08-03 05:40:31',
                executionMonitoringEndAt: '2020-08-03 15:36:41',
                status: 'STOPPED',
                channelHash: '6vwo2ufyjqbelhsprd24vuywrmaehnk9tq82tsjk',
                channelSapId: '63lrjna6l9pvjftwgsnsaz508vsis9oy27jnw3luyos2z3cb06',
                channelParty: 'mncoda311c938yryyq854pg9sgqnpzqkamzx5pg0lgwlzkl92z68sppmfsothpkm8z5ve22ilrsfw7vf0dq77bfjkfkgb5iq5ohw8bpeutlz5e4zni36i46j5guv9mc2tx5ufzhmpjvekvcv5kq7ncybfuaqhlq6',
                channelComponent: '2epu7cgevbixegsxbwwfxabpmazkwqb8m35kmrnzphgzdsruay5lao5i20j5dvfdwxx67aqjmrcn3gs0j9h43vtnxw6xcq4mkx10lslntxqp7zrm2uoowq82uh8cktzukd48fhno5obvsg0zvvbqsn69q1i9yk0v',
                channelName: 'ujowlljfeg3sgwamleotmcm0arm3wwc8nn1ltdrfptelo6s13dkj9m5y7tpkneah8x5orzff72uk48vi4hfkrjqq222gy7kygz44qnuzolene1ous32y6fmd5hivq5w1iw4e17re0izambimd8r3qsuleyvgy1do',
                detail: 'Dolorem cumque et nihil consequatur eius amet eos. Magni excepturi est vero facilis dicta. Placeat et dignissimos ipsum consequatur blanditiis odio ratione eaque est. Blanditiis eligendi beatae quo.',
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
                id: 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce',
                tenantId: '50256894-b4a5-44f5-808a-cc75dec00e7b',
                tenantCode: 'c3z4ncdzyfikydcca2feddltzbafnrw10u7lz3m1narpwbba2v',
                systemId: '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a',
                systemName: '6mpxa6duti3w5g3j163b',
                executionId: '143be2e1-e31b-4a87-8a70-5fe8ee6318da',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 02:40:43',
                executionMonitoringStartAt: '2020-08-03 12:25:44',
                executionMonitoringEndAt: '2020-08-03 08:22:33',
                status: 'XXXX',
                channelHash: 'rdawqim0pwgtadem3ecqxpa0ltjr1ptjcy5kpk81',
                channelSapId: 'qphhss4q4cktro716un1ohje7rjzvv53z477i7u3mv9djx8txu',
                channelParty: 'tu0wgaizal8qcbasu2vi9p5wnt49tpdmv2ifxmzeedcvuaku80wntzewyg4236qibrge0svsf0dlulaz5689h0p3s9q14ta86rfsbb9s7q9trsk4gnzfrcz89rm3alajckdx89rzw0w59gkcsutgcn3x37bnoxiv',
                channelComponent: 'yil6kxtnqr9rhi645rmqd7w1cjdv15pj181c5auos1w3nhlxsfiyvzn3tkg19mhx5ijl7951qj75lkb4j5e39azvgvy6mpie9k67n8xzc0dioctqszur3nlefa3q20hwor29ew9f4eh6mhgtdzyurvxddatr6nsn',
                channelName: '11zfspdnp2d22hz7hm6mz8t4vb9z7sype3lns2jqy9ioidhzxbwihet6j3zp9mbszuko1k7j6wi9naw6h26cyos4mluddjl3f07uaeuxejqw1qy3foak0dkxp03d7ertq0wauyctn7109ftyyqkl83thsokr4ct9',
                detail: 'Officia magnam aliquid ut consequuntur vel consectetur ut inventore. Ipsum optio voluptatem. Nihil amet pariatur doloremque rem sint animi inventore quis id. Voluptatibus officia cupiditate sit recusandae. Rerum tenetur qui quia. Voluptatem totam dolorum id error quo.',
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
                id: 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce',
                tenantId: '50256894-b4a5-44f5-808a-cc75dec00e7b',
                tenantCode: '7r51ouwytryd20fufzcaph0sq09cct1guj7qbd3dvxggapit7r',
                systemId: '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a',
                systemName: 'sv9c69oyp27jf8k51ldx',
                executionId: '143be2e1-e31b-4a87-8a70-5fe8ee6318da',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-08-03 13:09:34',
                executionMonitoringEndAt: '2020-08-03 16:07:52',
                status: 'STOPPED',
                channelHash: 'xmliryue67y7gi3hvz76lb9husnkmcxczwxj12jt',
                channelSapId: 'qcy752sbih7tkpdtocpyzv71oiourioitqtmztcnpbzwfduxhx',
                channelParty: 'b2mpekwknre7gyynqua2ztrzadven1qxx28iogm96kkg2hkobtok7x5fdmx0may8gfr76yy7bi2nozl2qtibw71hlfpk5sxs27p5413p94ag9v2ybzsp3z56lunndudisy6ke5kyefr7h24qx3a6wc53nrpgsarh',
                channelComponent: '5k18mytoo27jyzls177xofi8uql3msdarmeehl2oolygc70qlxx9g3q3h0t5t6bxg9x7fetmptil31ggm15s9g29ncc8pbt9gj7mvqj9bu062dacd04dkixzn0ysg4cvfqgpij4a90gtst5m6m9fikkym2m72y2a',
                channelName: 'ztulz5jtyk5bd2kgpg7eii2dn70kqw47yu5vsj5146xznoitcxx99dlsmsbzwlz287tqxibcx55rxtrke3v8lpg5oonkeg2t38om46ncz1n3e9hkiu8mh40iz2t9rrnkhuia1y1icryvjamsk1g0wie2nnvlrubt',
                detail: 'Commodi eius quam ea omnis quo facilis et voluptatibus ut. Exercitationem aut dolores earum placeat dolores natus accusantium quia delectus. Delectus iure alias quibusdam necessitatibus occaecati dolores. Quas natus molestias iure sunt. Corrupti consequatur quae occaecati nostrum eum officia non qui est. Nesciunt dolor optio optio quis.',
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
                id: 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce',
                tenantId: '50256894-b4a5-44f5-808a-cc75dec00e7b',
                tenantCode: 'wa2skizrm2j2yd2v03xqp9jvvkyj972bk1wmnjzx4b06tvwj10',
                systemId: '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a',
                systemName: 't2vuyucvf76ozbad7obe',
                executionId: '143be2e1-e31b-4a87-8a70-5fe8ee6318da',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 15:23:22',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-08-03 03:48:26',
                status: 'ERROR',
                channelHash: 'z7tfiqn01cjnfo5832t3ymy60o6x001fpmwynk5a',
                channelSapId: 'e9yunf1roah63tod7hmzjr4vjbz017zaxuzrideaokysc34grw',
                channelParty: 'e28ljxkgiipsuch3p7tvgkm93hp41hcic3p0eahch6f20e67qbyftpcp1fni93ydqdui7fzw9a34g7rrjp4r6y1y1y5zzdm31u30urbx7y1f24oopf2fb0cfaw6m3qkos28tvxh7e8sbw8sqdvo9cervcfu8ygrs',
                channelComponent: 's3mel05ue9bt118svw17fr732nzohzlr1mnhnu49q8a8ot4wtz6rnjnhx9z8m8oi1wa8uxq6ie236v8ndjowde42ux6sjc0muyhr2c28jwf2iqwek7im923eqg52mhmzjccgfw2stx5e3q3jjltjzbmcaq9yvawg',
                channelName: 'pful337v40jvrf8lezy9nn42oe2tkqatygppggf1m2feexs2vsiw920z42wd7rfoy2sk4sqdze0nxefl7t7qxkf44qn5yz4ldn9egwenbs4jadvspf5nga6ivpxn7a96wldugg7oo8p3k9sow1pwsld9m0vl36fb',
                detail: 'Voluptates ipsam magnam. Delectus nihil hic est odit nostrum quia. Porro aut et consequatur numquam odit. Laboriosam doloribus minus sed. Fugit consequatur necessitatibus harum doloremque a nisi rerum.',
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
                id: 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce',
                tenantId: '50256894-b4a5-44f5-808a-cc75dec00e7b',
                tenantCode: 'l40i4sifklsj1pqadukeijgds88gn2jgza5be7onjaj0qo41lo',
                systemId: '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a',
                systemName: 'ieww3jmq929b2epkwh9d',
                executionId: '143be2e1-e31b-4a87-8a70-5fe8ee6318da',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-02 23:43:44',
                executionMonitoringStartAt: '2020-08-02 19:54:46',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'ERROR',
                channelHash: 'y3k369q6sgkcqyejw4yhqxo81dhk1pv06p1cqwj0',
                channelSapId: 'hjsxf0j0mibvdizgc0p8zdiparrwmxj92lik9feppoubct83a7',
                channelParty: 'mmtwluskd9rl4gdmp9j99ux4v6w81s3ynlzpyhm1nsv30nlz49v11wtvrojpukh9w2eivltxlmlmbinujszpoc7kk3gldr78126mdnyvizm8ag1djvu7gqseg0jn7wx39cv8ufnst6y0361anwwdsuvhx8388hv9',
                channelComponent: 'kmsgcstrqf5hwwms3a47pksapqnr254hscjksn6kqgsvedzsdvfa5maxjn5xlbwhvz0wq3mpuhd87nt4avczydjyocs7gu1gza0z2dys34qw98cmgd5juhks7hswyucfjxo5ui6ml1mt4yt9mui3l1f08py83dm1',
                channelName: '55606p2wnl687ndu82w5s36ybt1i9zu4a9rahktbsim27dpai4r76mlkyb8wjjig5gcjtel6qla0sji1d1ak8x5omuazn13yujl07a5blfhzkvuqkzrlgu0xdzkb9l3zmg1d64cn8oigxtf1threfja6y86x9x4w',
                detail: 'Praesentium nam similique tempore commodi qui. Officiis iusto et voluptatem fugit perferendis sequi aut quae sunt. Aperiam excepturi delectus illo corporis.',
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
                id: 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce',
                tenantId: '50256894-b4a5-44f5-808a-cc75dec00e7b',
                tenantCode: 'w4gif6dvd7orykhi8f03qqktnjwq8wwxvvl7fxbmxbbxo3fan5',
                systemId: '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a',
                systemName: 'evw4gwyiy64fvca23918',
                executionId: '143be2e1-e31b-4a87-8a70-5fe8ee6318da',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 07:26:48',
                executionMonitoringStartAt: '2020-08-03 03:35:16',
                executionMonitoringEndAt: '2020-08-03 06:55:45',
                status: 'SUCCESSFUL',
                channelHash: 'zm0qmuw571al7tvtd24j47noo14vr5a76a9qrrf0',
                channelSapId: 'hmujzlq90xw85cy2wt5y1zyq5ju12gdo82yo5sg6lcesx7v2lp',
                channelParty: 'lnbnwshmxg9tq08k6xgdhcd023k5wqrp6i7g49kl8zfl97bdd2damd47o53s5jrnj10n90efwv19kdcfoavtfqumuunekd2g6rdvl2soshzazqrdrdukng9d0cyw8bgqjneus2y3qhc1catg8447ib2z3t9a3qm8',
                channelComponent: '1xqf9c2ugcyx5fzv4zg4muh0231wl95p42qh3s3b7m268bh2bslk1s6cbzmma17oyxpr92tjd1ye5y92eqlm6cawy5b1ndb4ks87u3saaautps73pk59prodrvxdlskxxmvjehwuwqrkz73ggqbn6x3o87zynsw5',
                channelName: '4b63bi1q9ve37xh2tyvqu2x4ocsct4obglfmsvfd8ir479sdqlvxucjjgugbqpyy7ge2eu7zyf7odw3uzi4lz4pv1djqk52a9zi6kimjzh7w3kr7zuytm3tw34l9l30mrfkzbibqbhwdj0jgikh792lb2ymfk5xa',
                detail: 'Repellat quaerat quisquam minus accusamus laudantium nemo. Rerum corporis est placeat omnis. Voluptate numquam illo suscipit sit quo eius. Cupiditate minima perferendis facere quisquam.',
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
                        value   : 'e491c021-409b-418a-8f23-15bacbf22dcf'
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
                        value   : 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce'));
    });

    test(`/REST:GET bplus-it-sappi/channel-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-detail/f37d4fc3-02e6-42e0-bdc5-66b0a2f3f6fb')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/channel-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-detail/e5b32fe5-fe04-4a9a-9857-08840cf8b9ce')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce'));
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
                
                id: 'c1d7eea3-ebf2-42d4-a98c-9534457656d6',
                tenantId: '69f77711-6088-4c8d-b1df-40f52a13ef31',
                tenantCode: 'ao2yeh3zxm4o4kumccw7b300z2x8qber9bx3kwh01ac7nq6e6i',
                systemId: '6fe18402-d008-49c2-9ea0-18ac4a217128',
                systemName: 'roiiiokjg1dg17o0xocn',
                executionId: '9f81859a-b7c6-4330-ab93-d5fa7dc09a64',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 16:46:57',
                executionMonitoringStartAt: '2020-08-03 03:03:25',
                executionMonitoringEndAt: '2020-08-03 17:41:08',
                status: 'ERROR',
                channelHash: 'i4eyqvhlldnsrchh5tg8oa4veasegafzeudar2dy',
                channelSapId: 'sm5y5kmfnh8xnyk5vez8a590z4z85sdi0hoal6qumse25tso25',
                channelParty: 'trk71i0h3w8v7p120taymj205p5jtp7mhuk3j0cvevu5ehl9va67exe0uk0eugadbwbvq85ypt1tnfzc5lcwlf29v3wi88vaj65cmnt4ar0v889fg8al65cdyd4jbcmcp7wdr6a06uaz7ct2ex5oh4tprq2t05et',
                channelComponent: 'ogbfg98zmxxp71afees1raev1831kfnoy13a9ih30j06vzcmbpf21dn8ql8o0saobvoq2cb2desvccpr8eaapem4m8kviiosahq26mgujlcrt5766ix3464frfgifezow1cr0v5quuzdfylyx8ehrihsvvhwcyaa',
                channelName: '3jads7333rrom3687nann63sb0wzop046j9o47jrxi9l0veb29y69hotrzpzkhjb4cl8pb4h3rhu126w75xgvh8oil4qwfarh1l0qx6cw6j3bxs8s52aqdd01hjoh9s6ievwo33rkltp8p9j6ycjqmgsfj3sj2u5',
                detail: 'Magnam fuga repellat iusto qui tenetur ratione repudiandae ut et. Esse qui quas. Non dolores saepe rem aperiam qui.',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce',
                tenantId: '50256894-b4a5-44f5-808a-cc75dec00e7b',
                tenantCode: 'ggkg5d8npiavh569i1g4boydwya36sh4d5c3wa9unqqxd32luh',
                systemId: '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a',
                systemName: 'zgixbqlh5sxu6gn4qq63',
                executionId: '143be2e1-e31b-4a87-8a70-5fe8ee6318da',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 07:38:38',
                executionMonitoringStartAt: '2020-08-03 12:13:50',
                executionMonitoringEndAt: '2020-08-03 00:49:03',
                status: 'INACTIVE',
                channelHash: 'vtfzct91k37mh59u7gzbpvccs3d1h2z18uwecsni',
                channelSapId: 'rx0tbpftc1jetchxt10mp3cmdxd94rmg8gm1px2bs9ffpxbxxe',
                channelParty: 'aboyz4preotzldc90uh96q0oztav3v6668985miwoegwx3rc0fptswnawubtojzidmcyh1jzggbfty54urulazjedo18ioxd1z52ekhm10b41vpnf84l1fmp35q2avdwxmzsn01wfcjikvsrgrlmpi4ll4zxiq9o',
                channelComponent: 'tay78mvh3sxh84gt6ald9purfgkkxr5x1ihefiybl33iqjqy3kmxhs4c99fayn9op9jyfwynzbbmy46owrmt9o7tnx3gmhrb3ljvp2yvn014daqw5l5gwkk0y85p8k4wp7b5km3h63cjxghistry5wehjrss62sp',
                channelName: 'hu964gf6yhx2q5pdkkjaq7bfs2g0v1uh3y4jzew7l6aoq13v0cl32q2l744qiqq9lxo8sf6f4g0acz8il9t8h6obexb24yxty468vah3nfhj6wvqlhqvi8uur2s814vb2n192ul02726nzl5hs5xxj75dokp8zi4',
                detail: 'Dicta rerum voluptatem consequatur laborum sed. Qui rem quia. Consequatur aut voluptas quia accusantium et sed. Tenetur qui beatae tempore ex ad non nostrum cum atque.',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce'));
    });

    test(`/REST:DELETE bplus-it-sappi/channel-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel-detail/23d1ff63-4b9c-4c20-9b6f-e49a68a61aa0')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/channel-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel-detail/e5b32fe5-fe04-4a9a-9857-08840cf8b9ce')
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
                        id: '3196a3d7-9446-4ac6-9f1c-4007fefc8a87',
                        tenantId: '50256894-b4a5-44f5-808a-cc75dec00e7b',
                        tenantCode: 'fq7xljfe5a3gmr1cp9n9p7nc3sjf2jon0lg3y8fscnshisyu7o',
                        systemId: '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a',
                        systemName: 'bqa3b4nc79d50oxj4but',
                        executionId: '143be2e1-e31b-4a87-8a70-5fe8ee6318da',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-08-03 04:08:51',
                        executionMonitoringStartAt: '2020-08-03 06:13:35',
                        executionMonitoringEndAt: '2020-08-02 23:28:16',
                        status: 'UNKNOWN',
                        channelHash: '98lqg2q84vc1j1rz8g2mi44e8sqw2cjq21l3rg66',
                        channelSapId: 'uu64w3vsj0fki4z6xba2tpxmivgdf5n88u56v8o9bnrcpvvl36',
                        channelParty: '54c74e4srscjqbjfnm6jqntaezj1erk13bls8g2wrnrawa39cce6h7cd75byka1f62ihked7ct4s4fhq4ri1crcfsrc0c3yjikyuqwk50sf6z7wluwzu7q2gdiy7c9zgrr4ha0rbg4name94xy2ls2c0utezsmrm',
                        channelComponent: 'kk4tvlbnvhvwams9evpalnw9yziuwlthqgdfpgdi9okobcx93ftswqiactebhfpsu8o0z7c2j3z94qz9gekgox0ndr9frti2f6fy6x1yt4fo0enz7wyp7d7pn3o7xz3z9kf9ghcohbzpcbn0kupog6w69m8lsb7j',
                        channelName: '6rgcd2d6ovlw7tld3zctjivx29y7xd8syqkm9532iq8exv9f9m7bpf0pi0h2f4gdwmxdsnnfoarminpmpd9w0dh16lbixcllnoxuue6r3ohi172cc51v2kgzmblxlwhisqxxnyk4qcyq4fay3a3so8paa4g1fbd8',
                        detail: 'Voluptatem vel eveniet veniam esse maiores. Quasi voluptatibus eligendi et illo aut. Ipsa aut qui facere aut cum voluptatem ea.',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannelDetail).toHaveProperty('id', '3196a3d7-9446-4ac6-9f1c-4007fefc8a87');
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
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : 'b537e81e-e6f6-424d-87f0-19db07cb96d9'
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
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelDetail.id).toStrictEqual('e5b32fe5-fe04-4a9a-9857-08840cf8b9ce');
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
                    id: 'aff04cfa-d730-466a-9cb2-62fb4f475893'
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
                    id: 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelDetailById.id).toStrictEqual('e5b32fe5-fe04-4a9a-9857-08840cf8b9ce');
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
                        
                        id: 'b6aea91b-4b47-44af-a9c8-c8d5b670e7d0',
                        tenantId: '5a931277-c48a-4bc2-9fb7-3e88c9f7792b',
                        tenantCode: 'ivc0bst27e57oth70llvb97tdawu3q6qt0s7g2mpcrtbjv5v5x',
                        systemId: '6ffd3fd7-cbd6-43ef-a2ad-f7a1b195bbe2',
                        systemName: '8hkw7c4z7lpwh5q0np97',
                        executionId: '1a8d3857-5081-4e1f-b03f-7d15df4cf91d',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-08-03 07:14:35',
                        executionMonitoringStartAt: '2020-08-03 02:58:57',
                        executionMonitoringEndAt: '2020-08-02 19:52:52',
                        status: 'SUCCESSFUL',
                        channelHash: 'ctwp7gsvks2d4g44sdhb5p48le55mrbyzprhhqfv',
                        channelSapId: 'bfofwb3iqp93u1m47n3hkxte7vzc74l93lyhszlxnzvpz0sco0',
                        channelParty: 'f2qdzz6din43wn3hx8flgjwv66ys1yu691v99r7x4frwuggjdb6a7sip71awvomzzu5n0pznedkb5tgl5br0p6ziy6m04m98ka0d8ys0kd0qs1huia40rgdq8cjmsj7u3kn3x2dj5hie9ipgxhrh3xhn7o6ntmu8',
                        channelComponent: '2tnvepoqr3oxpjnmyekddwsw3xb3bbpv3sg3rthskkzxxqf8y9q8mf9spjm9genhwgod2j8hlry941yvi80a1xd7lv80bcaaehqd7rncgypzh5q2ljnakkxpjjulauirq0eka7tmyf8z7tul4wdhlr5cc1aftezx',
                        channelName: '11tdvpy5ht7dfweqahrr2czs8rvulwstjxjxurzdbpz9fq256rv0r69swvthgpmghq8c8f6vkcycrxtepld14bj9wkebngfsgl947mv7kobv32cel89uyljjar3go9ghvwrod1i8h60vzf1mt9vhdmw3lelkxo2i',
                        detail: 'Velit cumque alias sint odit id quasi aut dolorem mollitia. Magni facilis ducimus ullam accusamus odio quod id. Neque eum incidunt ipsa.',
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
                        
                        id: 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce',
                        tenantId: '50256894-b4a5-44f5-808a-cc75dec00e7b',
                        tenantCode: 'd9x8qjht2kxdjaojbofiitntc0pnhs1311eizc602syhyva5pz',
                        systemId: '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a',
                        systemName: 'ndgazjdig2p5yzkfxrit',
                        executionId: '143be2e1-e31b-4a87-8a70-5fe8ee6318da',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-08-03 04:02:11',
                        executionMonitoringStartAt: '2020-08-03 02:46:07',
                        executionMonitoringEndAt: '2020-08-02 19:06:00',
                        status: 'STOPPED',
                        channelHash: 'hoqwnluux2rgrcy20eeolxx3uwh3nka2lmg8tlfo',
                        channelSapId: 'sxrtmjh79ti42grc342jkyzr4o5fnzfmx25ogo2j0ljbh5jerl',
                        channelParty: '8p2v1c6mtfno66fhd9fom7n9qagfq30ms0f43laplilkr1kwd8cxvo4obz63ru98bksezzem79wcod0bn7kgo9l22gptr0mixada76h4y8xu6on92owljkq9l1ro0gvllcgh4cfj657ba7oc7ajccrmi6jmcaklj',
                        channelComponent: 'uh255a08vqm11ggprcinihge7xplt11yb0jxh7o5fxjs528ommefr8783cvlmykaf46brl0i14dpco6h13ibkzrqkp6xfy36lpfepu6pyo75gbptqj8ag6vka1upb8iqmo0wahd2r4u6frfa9g2h3zku792yml54',
                        channelName: 'h473agt50q4rx4r9uu2z15p40iu2o153y348j26q46f2s4s3b1gptawqohc7lrfbipzqxb1mr59svosap8pb6xy2odq22ov3t5gks6enhpbh3cxevsi7vrwgk4ia5db0fc7tyng4qleow97tjkf92knu6mikwvsr',
                        detail: 'Laboriosam quos voluptas accusamus natus occaecati maiores fugit. Tempora minima molestiae. Illum illo natus sed quia. Est suscipit cumque illum. Exercitationem animi dolores non numquam. Et dolores expedita id rem.',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannelDetail.id).toStrictEqual('e5b32fe5-fe04-4a9a-9857-08840cf8b9ce');
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
                    id: '84cd796a-37d0-4c93-b260-477e49bc0b84'
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
                    id: 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelDetailById.id).toStrictEqual('e5b32fe5-fe04-4a9a-9857-08840cf8b9ce');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});