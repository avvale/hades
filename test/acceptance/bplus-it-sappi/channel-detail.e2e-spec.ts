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
                tenantId: '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89',
                tenantCode: '6afqrq0z1s2toq063lr4qmrv8klrh1ploe54s7ap4wquahfeb9',
                systemId: '4bf38c59-048d-459c-aaae-c5851480e77e',
                systemName: '50nj6sscf5mz0mc5novd',
                executionId: '5ddc25c1-3dce-4b49-86af-c940712436d0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 09:11:48',
                executionMonitoringStartAt: '2020-07-29 09:52:51',
                executionMonitoringEndAt: '2020-07-29 08:50:02',
                status: 'ERROR',
                channelHash: 'p8dcah03zn8kfk7l2tqp9s8aywvyqjhihmni8w6h',
                channelSapId: 'uxh0f95g4f0umra5f7solmccdih14im1g1n3rk9jp2hanouyvo',
                channelParty: 'wdl7f2udgmmosoisc8q674x1swi3zedflshe147uwt9wyob6jahlfuawpcj5tgc3jo6utas6d8gfg2rfve8zyqa68yv84s4c4e7zh20msaoko3k50j4f585sjlj1t95kawobgpjynr6py03yqlrgyh3t52s6tytq',
                channelComponent: 'gbub371tbqtsdy1n1kvczn4xqcdxl0iu10px53bfrq8du5htgeogihzi2f6hxxpbl2tacgg05ijluf0l3wl3xjk5hh8ik1gfcvbxiueyn3xy6k8kbxmw96h0589la7c5r595mq031xcel5snuj65g384kg6xn7s8',
                channelName: 'lwkkqqi4w1epg76j2xmcrwvsdhsfwwemf1i9xlglnmt4c37wxd76ut7st286a5bmje513zvzjez7murevt282ebw9v3tq3u507m1g03qv4wrwcxe4cf203fmgi63mrbafb3b5vwbdbz1hk3ve5c8cj0z74oht9pi',
                detail: 'Quos fugit ullam ut voluptatem et. Maxime sequi labore. Illo at nihil soluta corporis eum rerum dolores qui. Aut molestiae fuga fuga sed ipsa. Explicabo ad laboriosam pariatur aliquam. Praesentium molestiae quia optio neque.',
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
                
                tenantId: '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89',
                tenantCode: 'nhsysxxe3f9g0pluvq0p73706kqscc6aqwmp8v88pm7x0au9i6',
                systemId: '4bf38c59-048d-459c-aaae-c5851480e77e',
                systemName: '3zmm9n3ugc9nf123zxxu',
                executionId: '5ddc25c1-3dce-4b49-86af-c940712436d0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 13:04:44',
                executionMonitoringStartAt: '2020-07-29 13:06:11',
                executionMonitoringEndAt: '2020-07-29 07:20:42',
                status: 'STOPPED',
                channelHash: 'ki1bbkm8t3asfezondqsjufz9fforbplw73ymog9',
                channelSapId: '73eeaj0kjxt1b7wwos05qphhy3qtluvq6gcq18cnwkcbteqtml',
                channelParty: 'jtmt4zevbqo09kirku38qnj5uqgo3dokw7lj7ofxy3cvkc5cd3iulpf4oj3gtdmcechl33k6no90yzk697pejhlzezoqngdcbnla6223tdc5gyvk8uxucrdnmi5cj88eee9ub7i0lkm7y6e1gq127yctne79ovit',
                channelComponent: '19evud0a61nhc7hdzah8da1j2hes1c0uwga1tn2ti4afgtmjxcj51hilj2bu9ejff8ii04eiwbrg0n8ncp41j4bnadacazqcivanvvtcfb65yw27rr4ffekfwlh6f2jmr6wz6tgwathsck9t26xb18ui0np9prcx',
                channelName: 'xra1wcm8n2tnytpo7cpzra61nvj5z67uiybr59f7xqelxs73k9wmxfrybne98y7xqsq14hws848xq74swi962ubu1nbm0t4nfga6up0vr1ojo7eulj04et2e80s7ypdmyld0gngafnt38qn108xeszzpiemi5jf7',
                detail: 'Et quasi veritatis et autem incidunt officiis maiores. Et suscipit qui perspiciatis suscipit. Voluptatem eos id vero minima facere ea minus odit fugit. Quis sequi qui debitis commodi ut. Consectetur quia dolorum.',
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
                id: '30f5a7e9-171d-4304-93a7-17f61f8f5370',
                tenantId: null,
                tenantCode: 'qlzi0ymfs8urx53w3tvm5cxg4whtdsutkir5a8rd2mlzasx0fi',
                systemId: '4bf38c59-048d-459c-aaae-c5851480e77e',
                systemName: 'mrzhhmvcorul37akijwo',
                executionId: '5ddc25c1-3dce-4b49-86af-c940712436d0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 20:03:54',
                executionMonitoringStartAt: '2020-07-28 21:35:52',
                executionMonitoringEndAt: '2020-07-28 17:57:19',
                status: 'ERROR',
                channelHash: 'y95vigqup07l2tq1kk9tbczed845qygib0svfwgh',
                channelSapId: '4h3hvs9f5tj8eg6msdrblds4w8y9uvjjojq7au63k04j6m9eol',
                channelParty: 'ylhsv606wi01p1whwnyrbn3q36uogfcf2c74e0cr5qovr40d27j7uah9nknu5yeqssi6wduovxgxl72u2gspvs9vv1w8s8az41cyswa301c5zlfcdzya78862nf6hwyk6n40t11l9xhlnylzadiqwumlt4s5hi6j',
                channelComponent: 'kgp2qen47uadk5a7dle6zyay7zhiu6wtnldgsyk85oa69io0pmbaxagbu0cia1rpt0n1iszklsiplsgcwrzlgg6oeuusvr495i3z9ue2ktbwx1cye5oy8hhe4wbsjvnze6vijferequgmuj1t1l53ulhakfrecra',
                channelName: '43tokuf8y4jv65s3yaztqhvzrbvde6dbvwy20t5u1qn1chvnry02bknknaagt8ac54juqqccymmwi6pq5384kwyu64a4rybosqlj9yuhkw2o2994gsu2v0msbyqty9oi0kao5np4qulzplw90l69znmyzv2uq9l7',
                detail: 'Qui repellendus ut cumque exercitationem repellat optio aut dolor. Recusandae quasi amet est vel possimus ipsa reprehenderit. Error libero rerum voluptatem libero nobis repellat reiciendis neque provident.',
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
                id: '30f5a7e9-171d-4304-93a7-17f61f8f5370',
                
                tenantCode: 'i3ovnicrp5t2dtmhbyzhdimeysghcmcslh365n64if9zvafg06',
                systemId: '4bf38c59-048d-459c-aaae-c5851480e77e',
                systemName: '52gvoawpol3g1qf09r1d',
                executionId: '5ddc25c1-3dce-4b49-86af-c940712436d0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 16:15:07',
                executionMonitoringStartAt: '2020-07-29 11:36:57',
                executionMonitoringEndAt: '2020-07-28 21:25:31',
                status: 'UNREGISTERED',
                channelHash: 'cteoenk8y8yo8xk8i0w1gw9asaxhnaqi3olau1yi',
                channelSapId: 'sqp2r113g46oqhz77rqgx8dn45bwyu8gc4y7cy5twt3pvnhnex',
                channelParty: 'wxs1j2bjdsa82ewmc2u4u1lwymtofbe3sia07s16cmyg55kezwg574r1uhyj9iqny635x6idl13llcani9mjuyyt9vj6xlhutmyjp53rqnlao7m69104rjzatv0qjtj0usyusc0pmftxcr1mkg1fl4q7ddor0i4n',
                channelComponent: 'ukknu8pomvngus5fq9dh48iipxh3mqjkm06ggtrcjxh20hlc8imwazt2601tukoxrzsyimsmapqn9nd1f91qr0b8yki15snpxrrd12ltk8d4n6ge560i1sb18nh8w6g5ez8jpnpapvz4pcwfo0ke3uva1xzpsgzn',
                channelName: '7skx8z0l005msrf11q4glm1lupciqfz8s2dngxpuw2oz8lpfn1is1ktlqoaiw76qmo7oh4pkx88txnq188t8gtppcm9i7cviti1xjr12fbh175katdd71a344vh4z6dvj816zqbi0natrq17xxem7fwha1b0lgoa',
                detail: 'Reprehenderit quae quos rerum consequuntur consequatur. Quis minus omnis cum sit ea est. Nihil voluptatem quia velit quo in qui repellat et. Omnis pariatur sit expedita dolor sit nesciunt occaecati alias non. Iste repudiandae quasi sunt repellat.',
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
                id: '30f5a7e9-171d-4304-93a7-17f61f8f5370',
                tenantId: '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89',
                tenantCode: null,
                systemId: '4bf38c59-048d-459c-aaae-c5851480e77e',
                systemName: 'mnsiol5614yq9mrhoq5q',
                executionId: '5ddc25c1-3dce-4b49-86af-c940712436d0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 13:57:26',
                executionMonitoringStartAt: '2020-07-29 05:49:44',
                executionMonitoringEndAt: '2020-07-29 02:24:32',
                status: 'UNKNOWN',
                channelHash: '6dz7jvsycju8vrrly1lzmlayxrhemyp43871q6xk',
                channelSapId: 'n5tmd509gpwpgite9csyto6peu64rp3xduqwzoz175do74l32b',
                channelParty: 'bfle271soxsqvhbv90qnl7cu1p6vysfg096to098qtbmul1wcc3fyak7pbme1llp8crkbfo9ko349shnzs63graijztj7nzlrspozlrn8x2l2rriv2w0wp8v19lgba9b225ududza07qjvhh4a76if0ph7yl2oti',
                channelComponent: '7t8cl2ntefmibny0mojeyhy27g1tlplgllxesxkofr23k9oxmc720r4lvq7fvl75r5hxltgossvfjc2p01i7p9jl8g2ur8vu3n7mvmp8mn0672g7r9mxe03nh9bzh5pwtyq2yhvsjnx2poyi6nrt1pnnea65mzfq',
                channelName: 'ckdpo2c79uecdn4c7e6du37wxkkqfvik0y1wmz9rb2qe4ky5i69ujgvsoofl1kcitqywvcjn262tlx4zm7n9wvccvn8eayvvu0hc9z48cjf88wjpudm0bw3movha8qz8pfmgrjgcpqkysj84x0pv9agclqn3eglh',
                detail: 'Ut ut eos occaecati. Ut eius qui. Culpa dolores aut qui velit accusamus quis ad id nostrum.',
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
                id: '30f5a7e9-171d-4304-93a7-17f61f8f5370',
                tenantId: '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89',
                
                systemId: '4bf38c59-048d-459c-aaae-c5851480e77e',
                systemName: 'uf7jhq0vqux2wyj7nqpt',
                executionId: '5ddc25c1-3dce-4b49-86af-c940712436d0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 13:47:43',
                executionMonitoringStartAt: '2020-07-29 09:51:04',
                executionMonitoringEndAt: '2020-07-29 05:28:56',
                status: 'UNREGISTERED',
                channelHash: 'y08itohilfvd1hsh9weboylxp8b31ef81r684m1x',
                channelSapId: 'zevth08chweia9le9684yo30hbien1mu60w119sys0g5hqkedf',
                channelParty: 'em1uagiiwt7i9toul5zgk4bcu1c7fveeqrxpwpfz0uxnjbk9isq07esb9a5a85t0fannh3ixw4vwcuw56tucek09t60gdfinyj20jn0psa1spjyzabu5ftkgubcepqlprs7aaq60csq0ifqhd0ntfap63sjrqms5',
                channelComponent: 'r14f3n2e3ndx64bk1ji1vjvj0emrgtd1vrixim1ylti7s7kpps69ybnuzyyb8bohh8ib0m1tat7qzevur5ytbpd54cujwpe5jxw4ts0be9j4zczdfo3y994ia8wc2p2bjymzwimh8xv69i62ge8q02j0zy2vt5m1',
                channelName: 'ffauz1jvx2c1mpgsy0tb75ngpwtshlbeqzpbsluwzhpdxgwkm72w33xs1m7ldyi4en00fujalui1ew0c6anly2v3addpnmat4ts290wrq2tr3f2nefqp3gtvobewhyvfy8c542op9kt5bnrn4gzm8qrs5dhds1km',
                detail: 'Aliquid voluptas odit ut voluptatibus repudiandae possimus. Velit facere quia distinctio. Molestiae non consequuntur et et in nemo numquam cupiditate dolor. Rerum reiciendis voluptatibus laboriosam veniam harum doloribus accusamus. Dignissimos praesentium adipisci omnis iste quo et.',
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
                id: '30f5a7e9-171d-4304-93a7-17f61f8f5370',
                tenantId: '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89',
                tenantCode: 'bmtazr7iiy9hp5unb7ghvydryldzinufyusmluo576dbq39foq',
                systemId: null,
                systemName: 'n4akuh4zebh09j9mypxg',
                executionId: '5ddc25c1-3dce-4b49-86af-c940712436d0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 00:28:45',
                executionMonitoringStartAt: '2020-07-29 08:41:22',
                executionMonitoringEndAt: '2020-07-29 09:06:51',
                status: 'UNKNOWN',
                channelHash: 'qsaxxtfzuqvf195pqmuhobsqy5nuv26oee3fribp',
                channelSapId: 'z1ryanz2w5jv607l27t6mkobu1aa1xfvzbtn5oqtm6n6387jov',
                channelParty: 'lvcac33776fmbrqn3l6uh8pmvhas9wb9jyr1jg7yw4emkext0oalvtx6tpm99t3zpcjue9gxr3a1pe149c26bg5i3t1f2cnisk8l6aad5tlwvln8y1gc6o35m3admzl9pqcz6l8dfl2qzpcg7h5ct0j5ictq3a12',
                channelComponent: 'd0ss47uo0xbc1sikh9v70u9ge56y0kmx4fexxyfibuahnxvp0fcr3fih83nexi70xyvbre0p9tf6s60xt7irmgeat2bv3p1zbrw4l84k8ioc6kfx33k2d2aanwbq3o02mr2xe2y9gzq6g6mqrfl3pc53o71ohk5m',
                channelName: 'sk6jys0pr0a9b4oeqehkp8k3oyp2yp7mqd3ppyx7fcvhd6oa6c16lkajxul06ocph2bugzcqdmaspjmb5rz4p1ouu4jsejgb0w4at2g3eitnr8p6lpbk6efj1kgg69okpkss1yj2gwzrmi1fm5d2d36d2p5efewn',
                detail: 'Velit dicta sint libero similique quia non repellat quaerat. Omnis aut in modi omnis vero ea quia. Sapiente quia nobis aspernatur est facilis. Et enim nam et. Quo rerum officiis qui adipisci veritatis.',
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
                id: '30f5a7e9-171d-4304-93a7-17f61f8f5370',
                tenantId: '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89',
                tenantCode: 'dxlzrkz6euuuiwkghhddittgjr02ty3v8floo1lf0mj2vk2hjl',
                
                systemName: '66anmex7y8e7cev36055',
                executionId: '5ddc25c1-3dce-4b49-86af-c940712436d0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 23:19:08',
                executionMonitoringStartAt: '2020-07-28 16:47:24',
                executionMonitoringEndAt: '2020-07-29 01:32:47',
                status: 'STOPPED',
                channelHash: 'q6drld5d7oj7oi6xqksvddx1y43zg3h9m9mu8el7',
                channelSapId: 'pczxdz549ts7hnyfs5r5c9vshehih65g08u04nx8v5eeof1y3q',
                channelParty: 'r54wxatxo7vbwybj4eae8ognm0hxgsfjzgnh9fbfq5uflmz1beelzp2ikulushnpkm5lhp0k2ur586tkce7td27v6otrgzs7qfn9cnuoqyctmdtfd5ecagxcnvcpyq6tv4qjmkeueugycmjubmsb0lte5w43683s',
                channelComponent: 'i68xbax0vi67dwxes6y8t4u2kkergxxa4du0zx0l7auz6o6b5o867gfum6vjrpijwupimw6vsfejniu65iv2j4karmk0jco5tgezmdmxpg38xq3is2xq545j3n3t3kwnvh2ht2vhxnysej31d5gh2jhvax83pa3w',
                channelName: '324oihx3l86vps46p82ius8svx3sji94mxxzhkmv6nrwy2c0vubeww4uejk7fzgt3h5m4o5ofakfn7qtbw6x0oz8gx33qcr8hz3o0zhe41hz03r6146nhv2id2czh8xwhv83kdawm3zjejb9tfizg148qhhf9frs',
                detail: 'Asperiores harum amet. Ullam minima non est dolorem corporis ea. Est rem sint labore id optio accusantium ex delectus. Non sint illo nam quo sit eligendi alias aut eos.',
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
                id: '30f5a7e9-171d-4304-93a7-17f61f8f5370',
                tenantId: '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89',
                tenantCode: 'o1nah0k8g2btai5f14qgck86v92d5qom77bmid0j3237yyoc1u',
                systemId: '4bf38c59-048d-459c-aaae-c5851480e77e',
                systemName: null,
                executionId: '5ddc25c1-3dce-4b49-86af-c940712436d0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 22:49:30',
                executionMonitoringStartAt: '2020-07-29 00:30:36',
                executionMonitoringEndAt: '2020-07-29 00:10:49',
                status: 'STOPPED',
                channelHash: '7o5f64frz667xioe8ras9lp94p9tcwulyv6qgrri',
                channelSapId: 'tvjfwqti54jkch1l3y9mcvnyinerl7eckiwklb2mfcntb69xei',
                channelParty: 's2qfdjhr3g79vwlvck5njqs5senb5xnszv04zczcpl3nk0lger23iub21nt1b6q89j8ng2gjw5f6e406ue25vqwq1kx0h40yialyhnltg4l58t47sxvc9v3lszewuptqagbsmljfwqk7r0j0ntsr595sohcf1g5m',
                channelComponent: 'jk5dgt6y03y530i8t2ur3rl14ptf81atj7gb1mvlljapcianyisv7kgayji4cufaf8p182m3mgwgbttm6qicqq4xrce6bhd4qgr0kh334wj2juihruxj5itb8i2mt2e9gycvdtx2gn8ecxyq06zwl8zk79962xjh',
                channelName: 'hioaegrb93t0ek7ukrv5k0jh0ys1g6t1drye50omjbly2sk752tqfb3spvohiji6mc75ww3czbh7h09zw2slbolv0tveojpwzaajqh4b4u64mkbtqv4x3n0dhh0qioia1xxpprakkguajq0vo3ammq9qjgfv8rj7',
                detail: 'Voluptatibus totam tempora voluptatem consequatur. Iure illo facere fugiat quis accusamus animi. Ipsam eos dolor illo. Saepe non totam quo veniam accusamus magni sed in. Consequatur cupiditate ea sequi est ad accusantium ea veritatis tenetur. Ad culpa est sit minus odit.',
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
                id: '30f5a7e9-171d-4304-93a7-17f61f8f5370',
                tenantId: '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89',
                tenantCode: 'ovzgp6ig5sl184g2ztvjcqzjyzo8rolobhf6zb5150m2f88m60',
                systemId: '4bf38c59-048d-459c-aaae-c5851480e77e',
                
                executionId: '5ddc25c1-3dce-4b49-86af-c940712436d0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 04:34:39',
                executionMonitoringStartAt: '2020-07-28 22:38:58',
                executionMonitoringEndAt: '2020-07-28 21:05:57',
                status: 'INACTIVE',
                channelHash: '3z139vscam53vysr8eltoyy04nx7q12py88xtm0u',
                channelSapId: 'ua7trkn4rsji373ltlhv2phv4gymzsd5jbbc6k6cboctfzrjbj',
                channelParty: 'n530tgr1300ofhkjo2ssx1jzdlccy4jpc46dkag4snub1lq15gkn5a2o02z755sr8j39yxp4h8zu41v0qudqjn4z09ui8qysjcuqdio9msoq4xgv572s82vtn17t77tesamfr3h3mf7opghw39jlff5qqq2mbvd7',
                channelComponent: 'zyi94syx3bgdu015goxicuqmn4hmfgzkrtaobb1kosz2mhrnsb2euk924rhyee02s7mpp79xx5t082op58vvrxg6q64789mgjgkkxyn0misid7p7kxireczwww92al72ew8kbtpvchxf9z7jiwqzxq4cvlj2yrew',
                channelName: 'lzrhvypxrstocrlz85yqjbzrdoyk6r3626p2ej7hu9gmimfri64h74x5nnk7iv2din4iqkwmi9sarf7458e7pxmz24t7i2dtw1yxw3ev10snvak5d4f9h3ch6qp6tsxs2ybis24pig9ul59oefk9xaen0n6vmz0z',
                detail: 'Aut possimus laborum sunt veritatis minima veritatis quis necessitatibus sit. Ipsum consequatur exercitationem blanditiis qui laborum. Asperiores aut nobis eos dolore voluptatem voluptate labore. Delectus quo rem magni minima et id perspiciatis doloremque. Reprehenderit odio sint iste voluptate qui incidunt.',
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
                id: '30f5a7e9-171d-4304-93a7-17f61f8f5370',
                tenantId: '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89',
                tenantCode: '60x7tr65zlcsfx1av1a31xvdqtfd9ruk7uhmirdatj3oac1eqw',
                systemId: '4bf38c59-048d-459c-aaae-c5851480e77e',
                systemName: 'rsbxs9b6sojhswz6pqox',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 22:33:26',
                executionMonitoringStartAt: '2020-07-28 23:38:18',
                executionMonitoringEndAt: '2020-07-28 18:40:58',
                status: 'UNREGISTERED',
                channelHash: '9b0uuzlkp9tpt0x9z1ddwti0iga1622zuf705bhy',
                channelSapId: 'b9w6z0kzpwrgdkvfiglwiofecy404yoog7403hfbwtraho728k',
                channelParty: 'i11ekr1b02he6g3tvv0tuor90m6503fqi79e58ncn6k4d9w3jnajxsds6hnhb7biwtkp2a9qchl8uujfsjxzhv5rl3t40f0z7j5kj0zr83geovgbx1crthg22xb2zpaxrz6rk3gfb7v06kkd565hpfglz7c6w4r4',
                channelComponent: '5lidjlgfwngbqakkbnktmc1fe281opz0g1tgwhu1rk4p9ylpmglxg9v9d6f926e4bykxghlq6j0omkfpjluuyr2xc892yr6vpsoqx2ws8dmjmv57jtxjn383lyq2pzdpjl0w37qnwo64j7769ksj0cb00zv7p5cv',
                channelName: 'ixn354agjj5cnzk8j55mvcxp5kgoficxx7i7rgc1higgfjwxaoh7dkm9js8u04oq7u6xnll7tntpxfp9eb7b9oagxukxruapif0iihlxs02gcci7krr8cyimsd015jtab79hiiqfm14uqzmem0a6gina1wf2syd8',
                detail: 'Modi natus quas quasi qui nulla accusantium. Recusandae illo aut nostrum. Hic nobis qui veniam qui et alias vel. Omnis hic ut voluptatibus laboriosam ad et voluptatem.',
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
                id: '30f5a7e9-171d-4304-93a7-17f61f8f5370',
                tenantId: '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89',
                tenantCode: '8jjsouq8zkpmjjc64dvr625mix0xb82za7rkftfm4wxs5c92ik',
                systemId: '4bf38c59-048d-459c-aaae-c5851480e77e',
                systemName: 'v59ynrftfnsboqtnajyn',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 21:39:31',
                executionMonitoringStartAt: '2020-07-28 22:50:36',
                executionMonitoringEndAt: '2020-07-29 02:04:34',
                status: 'INACTIVE',
                channelHash: 'g63olevfrqmmwg35v1cjy2pbqqtbpky22qkws1xk',
                channelSapId: 'c7g7win147fnk1yyuvw2fihi5wmevyodyqfbti9wufkiido3mk',
                channelParty: 'h3aqei784wth4w17vs3g4zqh1nifw2uzkerkbnkrshfqulj1yyloleibg3h5wflvededum9tv8mqpul86bjlr2hyz51iirw6v9ps3yeopfkwf1v44qya4o11g4q4igrbefcmdwr9mtyc3s81iniunjnhnapik3ff',
                channelComponent: '5x1u8kcz82y4y9x2cqen3bmjd713q7ajhwtqb1fe0c6y1hodb1fq9dlv8y7vybye446gisija83cmb9pcqdnxv46wux7720nf5iyai0o5k59rr95358utpvezt1mkaplrdnblvlgwg4883yk47ijf3p0v9a3fke9',
                channelName: '1muz5efcycxathq3xspqhr12iza8jecxjfdvsdu5m0mibut43bsbog48s8q6dh1lb159juf0js258pv6ecdtaolvlsz1av4nu639afky72o5g008tpk2jd8pqj4u34xz1gbhebl2jdd6zx41dqgfuuqyreftsxz0',
                detail: 'Atque vero non. Ut odio quas et nulla nulla iusto. Neque velit quo ullam nemo provident fuga perferendis. At facere molestias id cumque ut est labore. Eum quas aliquid qui voluptatum ut sunt harum consequatur.',
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
                id: '30f5a7e9-171d-4304-93a7-17f61f8f5370',
                tenantId: '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89',
                tenantCode: 'pkiv5wk5ecyqanpb38h0brw5au5o7wkgu4hfp4gvxgg29wi0p4',
                systemId: '4bf38c59-048d-459c-aaae-c5851480e77e',
                systemName: 'joknjh4df9gkm3123tja',
                executionId: '5ddc25c1-3dce-4b49-86af-c940712436d0',
                executionType: null,
                executionExecutedAt: '2020-07-29 03:13:49',
                executionMonitoringStartAt: '2020-07-28 15:43:00',
                executionMonitoringEndAt: '2020-07-29 12:38:43',
                status: 'INACTIVE',
                channelHash: '7swvxn4it5ltaqjj11tk0rbk5emyezcbfhq53jpv',
                channelSapId: '46edpble4dhng16u0bijpiat5lqpslx41i8tobk55ye3qo60b2',
                channelParty: 'mxt1gamd89bty77bpj1kiy4259cqynkbajvlfxm6eaoa0eavej7u5wt98dyhn10o955hdu429vqgrn112z9qfkzblk9vr2pl6ejydqy7vmk2hqbktvbv1c6xryf5dom5356e7zjl9m9yt3zphbafvg6w6cn6jsnc',
                channelComponent: '0noktivldndiodx1etk28t8xo2jb2o7mluwks392f4zuob0ohep9kj6zrfrvmfn40qpd8qruuuem4sqqxmjwhluj5g4nly6n92ve093phpalk0ux0ui3wzm27jbs5atd0k1w49fehzuqwv9cj2dn627lwmsixrye',
                channelName: '76ph6tfphddee2ua0ocysebf0c3l17unmy372j4wtq8u0cio9vf4g8i3skeqqv4v3t12sf7nqrmz8wi7clwke45ijbd18h07smzve2ebu50u10g4iko6nift02bjxg9sh5ty11b8zpw1x10ultiy7pm3gdq18790',
                detail: 'Omnis fugiat aliquam sunt earum dolor rem. Qui ea soluta cum ipsa. Ea blanditiis doloribus sed.',
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
                id: '30f5a7e9-171d-4304-93a7-17f61f8f5370',
                tenantId: '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89',
                tenantCode: 'go3ihrgwaj9cl35mn0z5wyt3sncmkikw9brlvn01ig7dgjxril',
                systemId: '4bf38c59-048d-459c-aaae-c5851480e77e',
                systemName: '0i78m1nxhb3wkl36hkyt',
                executionId: '5ddc25c1-3dce-4b49-86af-c940712436d0',
                
                executionExecutedAt: '2020-07-29 00:35:18',
                executionMonitoringStartAt: '2020-07-28 16:50:49',
                executionMonitoringEndAt: '2020-07-28 19:10:29',
                status: 'UNREGISTERED',
                channelHash: 'mfyxde1o659441w2txfugjgb2ejvupkahymbof32',
                channelSapId: 'uarfnqgxy97g0x5aofkzqv43olj6vgyxeyf3e3ob8e0gzt2a3b',
                channelParty: 'irysvdny0f242ptlygq68nylker0vaw469wvugta4epmsc5brmj611urui1uzw41uaj7kbk3q8m9dhthjiacsmc7ga2xlxnktu4widg3fqax6ndevy4x1k0wua8rf6lyigoy0idy2i1d3wfc0k3x55nv1yy021nb',
                channelComponent: '1q8ta6e37msci4h9htzeurd6k9k5fsomo4fb4mqqn4yybbcpley6h8s5tehfid0lgensr0toccw2hqndhaddhsz7dfphx9qql08obj8uerpij01j3g1d2kzmwun1axjv3a07v6osvs1xgay5orfe2lqbeg3gg0sv',
                channelName: 'xk7vedi43t5tmns5i2k44wc8mtekrfobrbnmwrd0ufbip6y4vfzkp1faxqfayu8pz6xotyvb9c3fgkm821cpinbszc0ntdur1fdgv8vxesbiwx486tyon6k9oyw663jb6hhtc9cqzwfx61lj6h2lt1v0ixdnygrh',
                detail: 'Facilis ea est vel consequatur. A aperiam perspiciatis non iure delectus. Nostrum qui molestiae quia. Illo placeat consectetur ut corporis. Sequi perspiciatis totam eveniet officiis illo rerum fugit. Ipsa autem alias est magnam id aut laudantium fugiat debitis.',
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
                id: '30f5a7e9-171d-4304-93a7-17f61f8f5370',
                tenantId: '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89',
                tenantCode: '8n6qkoinf6mghm10e2zykso6dcglrej20dm3argjvrsbr32krk',
                systemId: '4bf38c59-048d-459c-aaae-c5851480e77e',
                systemName: 'skfi5d0coybmcbw4zox6',
                executionId: '5ddc25c1-3dce-4b49-86af-c940712436d0',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-28 19:30:59',
                executionMonitoringEndAt: '2020-07-29 07:16:49',
                status: 'SUCCESSFUL',
                channelHash: 'u98eyeiz4juhty2l6bahmjpj28wntpemao49deoy',
                channelSapId: 'cxszpww8b433mv5n52bsdp0dy4ta8q589rhtmabugr1cc4zziv',
                channelParty: 'awzxie50jax53odhipic9ct9x18pe4raebylahdk4k7qlksyb73va8k0ppvgcvjb66ka9s108ubv9n5pqjungq5yolahw600mepa5ln5dzpf2ipmh27pi4wzul91bdzo6stto0brh8c26h12l59fwz5n8idqmdn9',
                channelComponent: '3ad65lqhlcuwhyehini7i7h5ed0rbt9f00y7c3ecg5os6p2k4to5m9lapeaqqqdjmz4q0248qossddi4bfsisaogxp9ufwxktw178ba5brn5e52kt8ia1i7bl2cxohqg8jnlc45thq1jid283rnjlodflrpbwqgy',
                channelName: 'af5dk07ycfplsq1kobcskhnwwjthrmisbs7fsc7gds9qp4ikvlfye3nlur92aecc8di9dyggf9ylh4vgvqlvxc4tdhn72k56vmqtjtwa1rftf91q37q0ymes1e1j67dbcy1ea5i4lawjaagzkit7ctrdcpfv6u2y',
                detail: 'Qui qui ad est reiciendis in vitae. Est reiciendis in accusantium sit nemo. Alias cum at repellat est.',
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
                id: '30f5a7e9-171d-4304-93a7-17f61f8f5370',
                tenantId: '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89',
                tenantCode: 'aa4rtk0uowwhr0lqt07ryz451aljpwvidy5oh0h2qcksiv0gqo',
                systemId: '4bf38c59-048d-459c-aaae-c5851480e77e',
                systemName: 'jmg8w56ljquwzwhsg9fl',
                executionId: '5ddc25c1-3dce-4b49-86af-c940712436d0',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-28 23:14:15',
                executionMonitoringEndAt: '2020-07-29 04:03:06',
                status: 'UNREGISTERED',
                channelHash: 'vz26gg5ovqjuy9t1hi8akugwkk1ss26lynxnfjtv',
                channelSapId: 'sxga1pjijs19w2wg9kkqtdv36l4bzjqnkgyu2oci4yvc1saqzg',
                channelParty: 'koxc6lw4miuj45ghzwdg0mbuypxr104tx5qwuitfatv5r149k11dfwnsw9aaf4zmikqnh1ewlh6q80b4b8pyw09ga2080qbg5397ojxfp89vpgowvtl39brgtp2pxwhgwnmsn3y45x1hoi00c5dpaakjjcd6l8zk',
                channelComponent: 'dzgegqgyxftdt7071350e7binvvxxovfad9m8k38sbct3tkj13k4p0bztot2pcrcvcaby3m7h29727retw2b5o9xw9tuxg9cqx06q8htiomb8004j7g3ga3jpdgwl6brresrhetxy5q3pihhvu7xeqep34oo8urd',
                channelName: 'mytko5ninxmwg89zq582ul0t6ybbugg6j76oulrkr77emvrxd7pbfos1c0dlvaftl7ggj7q59a1m6hb1zfg93n2d0285f56jifgfrbum5lbydkuc0a64enzo7zo64nsaomfdm5bauhyeof6j92f7ax98i2x20umc',
                detail: 'Quia nam qui vel sunt et. Odit illum in provident mollitia laudantium itaque et quia. Eaque molestiae recusandae voluptatem et qui.',
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
                id: '30f5a7e9-171d-4304-93a7-17f61f8f5370',
                tenantId: '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89',
                tenantCode: 'kgcatstr8djyize59p0fu08dsad8vmi9n38673lnbqzvviq1ns',
                systemId: '4bf38c59-048d-459c-aaae-c5851480e77e',
                systemName: 'owrncwtlykr1tp0t3ixa',
                executionId: '5ddc25c1-3dce-4b49-86af-c940712436d0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 22:01:31',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-29 03:55:59',
                status: 'ERROR',
                channelHash: 'snrdkp0hrhcwaeqfsl3k7cj2nwdq2czez1no4ynw',
                channelSapId: 'el804wnhs2pofwr94d4qs2kabdv0qbcazqeg5xhkdehab6rkyq',
                channelParty: 'c7x2uilg0y2gq9dimqi9so0yv4mq8mes8jnlrumm6j8nd16m5vl111br5jk7h9ykxkusyrov5pc3ev2wbply8xk26kj530n0m3fmyrn46knognnpkwhtzypf7nj4rwp9i2a8r73t1mjiqzyq5aphhgu3n23ao1h1',
                channelComponent: '2qtnxbir1mpdkg06u6pvxljggffcdck621jh7s4wwm48epwrc6g1b0ebyjdc1nlr0o18f3bxtpu2ic9676gqpcdu2j3f7feattqdtizoj9uldmvi4j1jquucxonlj42qzfp05h7e336smefc7n49u3w4a7a5odkx',
                channelName: '0yz5qmiq643xhux13t6x18dyklaht1rpfwfaa4zf0twb2tjx77wtxtvi46724i4pp4a69doblcscstaoqyy3gr28poxyvwd3mwv9tsmoa82rhsv6l6fkxw7rzwjl9u5nl9b5ersshvf1gvyin95euzsemqatt0ak',
                detail: 'Facilis voluptas occaecati quia natus fugit facilis vero. Ex ab exercitationem sit adipisci cumque. Et et quod assumenda quas ex doloremque vel occaecati incidunt. Perspiciatis consequuntur voluptatem est.',
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
                id: '30f5a7e9-171d-4304-93a7-17f61f8f5370',
                tenantId: '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89',
                tenantCode: 'lqznf4e2bj89rf04sowmjxrschr4xr6rx5ey1o036zvgcwh8er',
                systemId: '4bf38c59-048d-459c-aaae-c5851480e77e',
                systemName: 'hcr9pfdw8caky1rjf3zc',
                executionId: '5ddc25c1-3dce-4b49-86af-c940712436d0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 03:01:03',
                
                executionMonitoringEndAt: '2020-07-28 15:51:43',
                status: 'UNKNOWN',
                channelHash: '4m6kxkx9pa92gc2n0wbse70r2il0qozefam8r0i4',
                channelSapId: 'f5dvxgk4jac40n6fjrgjht6l69v9w1gnvp4csbuv403nxk79wu',
                channelParty: 'i2drj2emdlcn2rhs7vaysn98ym2c403k3nw7mdmi9p4fc1a54kxmxc8b0w1xqynjy69sej4rn4k2fc0e3w8lkx4t5wwsgx9s0bvvkxhj9xwv23mykecg666k6vgbtrzpmpj2mrwww3pd3qjlabmdxrofk5r64472',
                channelComponent: 'xrkjjmehhjc8iq4n9ghs1242arndgholllxvywgupz49agqgdxluxu316b51pejxm1ho9h9xzdluil84otpa0xw8w2r2ru4xjp9p276llmvg2uq9oxouflwy2mkaq50tzweek0zk78f3vj7tdtrh2cc9jhcs9jrq',
                channelName: 'uuaojc6le7xptvfvbh0o8mptizscreztg243lz963xr23s2jqwy5ufnzdmyeg1veuetcf1iilhe59js9sve3xy8jqvml4ts0ryhyoogbf8hjvocb7dvdepunryqsfpc2jx7x3fmiqv8pdxckabcd3sct85n8lofh',
                detail: 'Porro ea est et possimus molestiae minima fugit rerum. Assumenda nihil voluptatem et. Autem in minima aliquam incidunt et.',
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
                id: '30f5a7e9-171d-4304-93a7-17f61f8f5370',
                tenantId: '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89',
                tenantCode: 'zupnwavzovyluy2eyr1pg90wkx26emwdc6x7x0b8pg0nedja9p',
                systemId: '4bf38c59-048d-459c-aaae-c5851480e77e',
                systemName: 'e2l93aa0jkpelfbcsg4z',
                executionId: '5ddc25c1-3dce-4b49-86af-c940712436d0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 05:31:16',
                executionMonitoringStartAt: '2020-07-29 05:22:52',
                executionMonitoringEndAt: null,
                status: 'UNKNOWN',
                channelHash: 'addb7v8os5v7h5tp7b7e2pqo1pajwbrot32tx9yi',
                channelSapId: 'y0pqu8vusvxqw2mwvdwybnn8u4xdi6yu5k43grnbyj9hmxcl5d',
                channelParty: '12lgts6rhjt7gl0cj243mbfuoqxx6j8su6uul2a86ntjd0t2kdgi542dpkgn89fte0kgyisgyvdsk391bvbudahs23lywo3czk2iqffm7jemquxjomn0txvra270w2oumw56m2tomev4rvycvbzb2ka5ennfuwi7',
                channelComponent: 'dvy44zs3rievpvxep9fg03ms87dfccwqb1gs1zbk1fufcreniiyeqn05vgk9p3kiyq9uw907nviy7hensuxelj5dj5jyc4p0viajdknipq9hhv6i8kwfbduci5jnxau54beeqiqknlaqk257vvyv2pjdsqkig27g',
                channelName: 'els6hpf1hf0uapm4dgvlpwhkq49x7ybhxq7j5muqkxr5shmfl6mjh8y1js0gf5zv6nelz9xhjei9skdsbv5wsza0hos5ntmq8atu0yu4d21a6wk186muahmoyljfxo88spi0yfbumudqgz8q5dfta55idyvjgua9',
                detail: 'Est beatae corrupti quod et non consequatur corporis consequatur recusandae. Et molestiae harum repellendus corrupti. Harum aut qui atque deserunt. Aut quia tempora sed beatae illum sed.',
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
                id: '30f5a7e9-171d-4304-93a7-17f61f8f5370',
                tenantId: '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89',
                tenantCode: '1z92p06ilnh4b8fihciaejd02iq5tt90lpipqsx2woivdqivvt',
                systemId: '4bf38c59-048d-459c-aaae-c5851480e77e',
                systemName: 'wrmmkpez4a4ykaxmicqg',
                executionId: '5ddc25c1-3dce-4b49-86af-c940712436d0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 01:05:34',
                executionMonitoringStartAt: '2020-07-29 03:04:16',
                
                status: 'UNREGISTERED',
                channelHash: 'fu6ashvhjrh5sfrlq6637qukzshdtqfrjbqzm67f',
                channelSapId: 'dm2hdrtq2vg9da7ctixo88i32ftcf9yf6pu2egw84u15bl7og9',
                channelParty: 'yzmztzltk755sku14yi18o7evnrxqohy9353biovn6aiadn2xcdh5dpqtd8odo0dk5wu8id0embdlgovc8l8av6khnv3ltvcq3jg1j4e4wrj2xgljhsfwc4wp2143uzo9ltsarleirr5jxrcjaeurq5tn4jfvktc',
                channelComponent: '6zz4gvi9fu91bmnqg5pnhwmcxjmt8jyleob874db8m8anm4gtonkid6rtbb3x41qpldg7gk0qpwz1sy1orn2gs5e50qorw9h08wotazv6crjqs79vedzvnk1s30lqn23a4f3bu1kenwoxdcvilyatq7wm8k0kwxw',
                channelName: '9055fkgzhqbs2egzj8yd8iagv58tk6zmnh4utwhe2kyf4jh7buw8razurwr8io5dfm5wrisydn39x7fv0qrxqw61ssx4at5fcssk1r43v9gnzydgjf53pv1y6hzwz4h5m5pxhjhcj498g4coxd0ivdu1x599580m',
                detail: 'Sed voluptatem ut. Aut fugiat consequatur ipsa libero aut asperiores. Et vel accusamus veritatis at et est temporibus. Dolor labore minus sint accusantium quae cum laudantium maiores. Inventore ut nam est molestiae delectus non.',
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
                id: '30f5a7e9-171d-4304-93a7-17f61f8f5370',
                tenantId: '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89',
                tenantCode: 'rli9g8wq2izmncq2emwuy6xqb0lrib3s3psl0p6twv0gvyyp0i',
                systemId: '4bf38c59-048d-459c-aaae-c5851480e77e',
                systemName: 'e79hi0ztk1l0hif79v26',
                executionId: '5ddc25c1-3dce-4b49-86af-c940712436d0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 20:11:30',
                executionMonitoringStartAt: '2020-07-29 12:51:50',
                executionMonitoringEndAt: '2020-07-28 18:06:33',
                status: null,
                channelHash: '9uchz8o3n0l2w9g3zyo7p5cjnwomgd71q4uu7yt4',
                channelSapId: 'k7osbgfajpyirj8cx75pnll985yn1q1jtro2jljf9pebb3vem5',
                channelParty: '3ai3z5pd1160e9nfyyup8cn7xb6h1mseqr2mvtgjga1lbzrp2lhc94vo42x1dx55h7y70707mvw79sktxuh7lgx3cgztr8ym9qq3myibmrffgfzhopip71t9ye1kpd8c147bjyqgq7ygk8g9re8y367yjbhwlvke',
                channelComponent: 'y2e4ivscwsy6pba58qpn8v6ry5aktsee2cmwy7ra2773yo0u5v04puljper1na8kzrw048avhdb486oinmggyxlx6jlta72cfod4aaoq87bpm9bm753n6mbtj2q0n0jqstwghas404hnao9530hccxiufvblat3g',
                channelName: 'tkqylmxsjdlcj2561ya963zms5izajbnkswzglyrwtj7mgefx8wtmb6xydppbysbgyosdoininwo2x8cvzup1s9a9tnm9oygadvaxxe80jbf5may4d01316sctedote8mss1n1horfcpy0y45eyfnmsautf65b7l',
                detail: 'Aliquid a molestiae in laudantium et distinctio corrupti quia delectus. Rerum animi est quam dolorem et ad recusandae. Perspiciatis id rerum voluptas fuga fugiat eveniet quod nesciunt. Voluptatibus voluptates nihil et qui dicta voluptas consectetur cumque. Voluptatem iusto est sed temporibus deserunt.',
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
                id: '30f5a7e9-171d-4304-93a7-17f61f8f5370',
                tenantId: '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89',
                tenantCode: '60uqev14tx14pfix7f5lkdn68fzsls20y10ytlo22y9lpoomn9',
                systemId: '4bf38c59-048d-459c-aaae-c5851480e77e',
                systemName: '45an91tj12bd4t6vekus',
                executionId: '5ddc25c1-3dce-4b49-86af-c940712436d0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 13:41:51',
                executionMonitoringStartAt: '2020-07-28 16:55:28',
                executionMonitoringEndAt: '2020-07-28 22:49:50',
                
                channelHash: '1qb8g692hppoihwcut80739ors5xm3frfxwvqi83',
                channelSapId: 'i2bqtjxrte0ab38p2fmw3nfn1c4rtyk4s33rnpgp1uuev0n5zs',
                channelParty: '3k37kol2t9isqsov7echegn7wpzen4poenvth86nhhs1n1f84ot0c0g7jzodfiz7ozujhmq5wl9wvsk2k2wph52n2h0jf7p7m7nsxf7nn5oodyj5u6hwt2bblwn52jpwrxpfycu2hy94p27f2vsmidnk0uri0huu',
                channelComponent: 'vk0ng9q3p8dpnqb535us4x7faa8huija52w2y0cid80mwaeh058n63l0kbo4smloguzw71iqoffh113pfzovlh8i0ozted2qb7ix9hb31prtvhidvlilkhurk50rglnwk7oqpn58txj68uo06vnidw5f4di3k013',
                channelName: '4l54n3lrl0j6xo4nbf8iwj39zwpv5z6vnwfn0ijtv3f3v00ocwuwxfunwvvlejff4quspi3s8dnuecprd4ja8u8m3qaij5tnmqgyywauknpirbayuquswzt687t31j1uldjes59sqtfnockc6wsz0v60qhzpxuem',
                detail: 'Aliquid cupiditate asperiores dolores sed vel non ut corrupti. Ea accusantium velit eum rerum molestiae facilis accusamus. Sed rerum quibusdam est doloribus qui voluptas odio officia odit.',
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
                id: '30f5a7e9-171d-4304-93a7-17f61f8f5370',
                tenantId: '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89',
                tenantCode: 'l2xaoup867mzkfdq56rtdfdyoz81ed4dsss66zivep9mk3r2v7',
                systemId: '4bf38c59-048d-459c-aaae-c5851480e77e',
                systemName: 'i25w6lovftvxmont8rbk',
                executionId: '5ddc25c1-3dce-4b49-86af-c940712436d0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 15:02:20',
                executionMonitoringStartAt: '2020-07-29 03:11:31',
                executionMonitoringEndAt: '2020-07-29 05:36:50',
                status: 'STOPPED',
                channelHash: null,
                channelSapId: 'jhzceoi6c5dhi90t1eonb9xrel9apgj6kkfcrz2z6c81ozprmw',
                channelParty: 'xvmsxmdkx4guigcccfrcghdqymb2dhwbf0pwa30xvotkr37u7a42mp9y9yslki0vxy15extqo983xjsqv0t61zfz36bailssxsr2byumlr5ftugsgka9m6xakael65sogiss2o3racr9tth2yeyfd3y1fw90gpdx',
                channelComponent: 'bmtczvrpg2bepw5cyar6dn3030s90zxs7fm4k7nxke75hy9xp8pxf6nr52h1uosqh16wgi6z7iw78po0fdjzombk5pk07x37wsowx0unc6mxee0uubk1kyus9hdnytabpns44x9m89wrr7p05gshjy5hoi0g3wpu',
                channelName: 'f041jl7mi1ojfitkik826nebz6ui6qun8cbit4my4j1zzr2ijx03r0yjxmxm9e8qgf9cnpvcvwmhsa73zssef0ajs4cbp89f89da3sp29x136n14wo6ncwrjxz74gdjcwczg42257nj7ncwh0ptgav0z193i21wn',
                detail: 'Iure autem eius. Et et vel numquam pariatur doloremque. Natus magnam doloribus dolore quaerat. Omnis aliquid velit voluptates. Sunt excepturi ipsam error repudiandae magnam ea ut.',
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
                id: '30f5a7e9-171d-4304-93a7-17f61f8f5370',
                tenantId: '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89',
                tenantCode: 'rofzj2mjdk227zoxipdltdp1lozga6a93hp2svyq01hwn6eztt',
                systemId: '4bf38c59-048d-459c-aaae-c5851480e77e',
                systemName: 'awkrq382bbvqktrhy7mf',
                executionId: '5ddc25c1-3dce-4b49-86af-c940712436d0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 23:23:16',
                executionMonitoringStartAt: '2020-07-29 06:35:18',
                executionMonitoringEndAt: '2020-07-29 08:27:45',
                status: 'UNKNOWN',
                
                channelSapId: 'kbxei8mxargk88pfqtuutgsk3jwep9aiq0p9hqm8d651oxvisf',
                channelParty: 'ciuzt2ev0ln1xs945kpsaff76r13itsuik4p19b2pp52y4hruxxfyw27y19r7ro39p9w74sydqj2n3kroajduk6idx7s5gfee50k3hz1z4m0j8hr2ki778tsn30qkmxsgh6ykbkguj3b7b1flue8c8ui6oxfs6r7',
                channelComponent: '4psxxffvyplgjjcojl9e1zn87eofkw7gkdfmig5ifplwqh6ou30cycmwsz86xi2bngk2nnam86sz00fm9jyuh365ouhb9cteme5gf7tgbtv3hnqyij1mwf759cji1enwkgn54d53ypig7u6qk3f6eyb8yr86ox4s',
                channelName: 'fa982r387iyat3ewszqehkcacgf15867r28ebalwjm8aofg9unqa4xpaej99zmzwkfzyxjlpw035g0nhl5yb9lttczeiubf6shhf90kq8p4ipniip3tep8w9h0iijppcjz0wmvvuyu2rv8t544lr6upgnxr43e92',
                detail: 'Veritatis ab sint illo quasi nobis et minus ut similique. Reprehenderit aliquid reiciendis. Ipsum eaque repellat vitae maxime sint.',
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
                id: '30f5a7e9-171d-4304-93a7-17f61f8f5370',
                tenantId: '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89',
                tenantCode: 'ov8293flfro0iq52hc76dri2xsgebzjp2jft0k6kkq7anelb2w',
                systemId: '4bf38c59-048d-459c-aaae-c5851480e77e',
                systemName: 'vr8kbryj3m5sgpfpbu1u',
                executionId: '5ddc25c1-3dce-4b49-86af-c940712436d0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 02:09:32',
                executionMonitoringStartAt: '2020-07-29 14:24:30',
                executionMonitoringEndAt: '2020-07-28 17:13:53',
                status: 'INACTIVE',
                channelHash: 'yhik72q1aobyq17rthiri782ikq9hfjo9s5e639o',
                channelSapId: null,
                channelParty: 'm4ff5xtqypbi8d742qyquce3l2e81oelfchlzl47ohtzreakux2aq42hgqg57tkel683bvxxo388ca7l2wmnbktwnq0rmrshh6avd81lldzq7f2zgg6csmzjxx4rad3iwy8kuopezriwkpgnvspb8tky5xuh8u68',
                channelComponent: 'dlios6o7i4s0plp5ly12axd76ycov9wlgg3kxs07zi0lr59pbbah1bcgbmbfwzvvhu60xyh3r509qe7jnxxej4h6nqco2i3985sz26cmwalevew4hb7exy0e2svmxdf3zk20rq60id0bp3g9o3ccrwmp0ejsuior',
                channelName: 'xo4qm67mgjicrgsltqd7hmiryhgbqjsu01h99gdgy9bi7jzaj81o35zd514q43iyefptn5mp39ustgubi51c70ecej18d5tbeov9gjiiznhjd255mrygy9bczfsn2jl64mkfztor0xx2lnejjfpy12j7rklocl57',
                detail: 'Asperiores possimus doloremque saepe eum itaque repellat id voluptatibus. Fugit velit doloribus. Veniam et eius tenetur ut aut et velit sit. Quaerat molestiae delectus at laboriosam aliquid.',
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
                id: '30f5a7e9-171d-4304-93a7-17f61f8f5370',
                tenantId: '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89',
                tenantCode: 'fnsmrm8jyq30asnw60l40lvrrcltgcgbv0l1ly2kq4wpy4pro3',
                systemId: '4bf38c59-048d-459c-aaae-c5851480e77e',
                systemName: '8v7b6hitfwbawytnmqju',
                executionId: '5ddc25c1-3dce-4b49-86af-c940712436d0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 07:14:20',
                executionMonitoringStartAt: '2020-07-29 10:25:03',
                executionMonitoringEndAt: '2020-07-29 03:45:13',
                status: 'SUCCESSFUL',
                channelHash: 'vq4d2holhi8ask4sff90898ebswlheb7cqclesm1',
                
                channelParty: 'qjs1dco79xiq5qtsmappvp07cnln8frmtgnrwi24l3j87faorn9ar15d2u3nwrxhozor6ylvk16gq3wj5p9boxv9ie4ogyy3j5tggwmaqleqn6ucb8k5gjzyzqmhkl2v3cvlc7s4ih4gloir2f5p1yg59i2k0opa',
                channelComponent: '7x9erby7ysh3o3c80mju10lxnx7doktc3wx9yt6n3lsumrkelr1w7eb57wjjn4w2lv70zp3dmig0hv3ysyhug69j4nn271i2lh5xcsyimu3cf04e74vdp0xl17xew35qkx2dlmz91uhj0o48kfra2m6n9bwksl51',
                channelName: 'bkly209ffmz5yj6x4kghs6n2yugnj9dvx7e9ff3sip41o9e6tapmogzhwh7mntu1z0usrinc4c4owt0vc46a0pf4fhs6csq8asjjbcci86bqj87lsjg8p2egef12kiy8hl7l5iddfrdcb6ngyn0g72i6yzz9y0dk',
                detail: 'Id quas deserunt ratione ut eius placeat beatae odio. Eum aut at itaque pariatur rerum aperiam. Voluptates aut qui. Eos eos aliquam quo harum aut aliquid magni at nihil. Numquam sapiente est a culpa qui pariatur est quia. Porro enim dolorem rerum vitae labore sed nisi sint.',
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
                id: '30f5a7e9-171d-4304-93a7-17f61f8f5370',
                tenantId: '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89',
                tenantCode: 'i3h6rlp8jlj2nstv80tle5ifzjxnyldrir9681p4b2e36pd39u',
                systemId: '4bf38c59-048d-459c-aaae-c5851480e77e',
                systemName: 'bnsvuxjs3mz4amph3tcg',
                executionId: '5ddc25c1-3dce-4b49-86af-c940712436d0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 04:10:35',
                executionMonitoringStartAt: '2020-07-28 21:27:06',
                executionMonitoringEndAt: '2020-07-28 19:19:56',
                status: 'UNREGISTERED',
                channelHash: 'xeuyi7anibgrm1c2szvb7jkujnbnn39nx0nv6emz',
                channelSapId: 'h1q2xm2xatcfv23v89mcgdyzpl3nr0z3iuu2t0e8fzvsmrlxff',
                channelParty: 'rwliql8r2zwst7nh36q4n3l300p0nnbvwd4v3ufrwzuzqif7ym9uf0g53tle6abb6p805yuq8tacs5v7yr2uto7u5x54edd3jdfwkjxksndnncopagy6ajge6ml6c7nas8j2wvl3ae4pj3b1g4g6fgc0mhdsjjlj',
                channelComponent: null,
                channelName: 'on0e4w962e74n25ifo8ue76528oc1g6pef9skmwtvpnf096f2f45u109gahl974dsfj6426d0wg0u660nsxe8hsuzdwdcaug7f1zoqrnnmdqq0tuunr96zjb6wjrqd1sxbn2fvcbx0u48afp2683kwcnz41yer4s',
                detail: 'Cumque quia vitae velit dignissimos voluptatibus nisi. Rem id ratione et facere illum est ut veniam. Et amet voluptas et et distinctio quam esse.',
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
                id: '30f5a7e9-171d-4304-93a7-17f61f8f5370',
                tenantId: '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89',
                tenantCode: 'gutmb5zrc4dycw4qa5uo73j3iaklf4qp8jks44vavthkhsduis',
                systemId: '4bf38c59-048d-459c-aaae-c5851480e77e',
                systemName: 'ydm1uha84hfxvwunhicl',
                executionId: '5ddc25c1-3dce-4b49-86af-c940712436d0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 00:44:19',
                executionMonitoringStartAt: '2020-07-29 13:45:38',
                executionMonitoringEndAt: '2020-07-28 17:56:48',
                status: 'UNKNOWN',
                channelHash: '0x19pd6pblnxsm3ly4moz1svozjkhgopz30p5pwt',
                channelSapId: 'g03mqry9sbzyqowby9a53i1m9raq51z0l3ctfdlhg19yj1q46w',
                channelParty: 'gzhb2rc8rv4acnvyb05hgnt3sscyfw26amu4u65gemcag9s2jv3awc147m22hkpzq5bqxpjipkumraoowsfsdtvucprczvc8qmywa5j3gfz3t6jmd4393tjhk4shnkbw3z7re3cdhk8ipdhmkz4d00tlh6ruhgqh',
                
                channelName: '5wq34ax1o1pfrnqc9cwjn41i7dtyvn6xpv5furaiesxur5bcinvbasl1zzwvm7rhrj9l1moz15vki3ww00xtmabp0e1o0zmh1lr4zpnx1xibvfw16carpmj9kye1siqwdvgr9s0lysq592sz0ysgpznjutdh6rnj',
                detail: 'Facere harum qui asperiores in eaque enim eos perferendis et. Aliquam sed repellat est fuga animi non aut architecto qui. Id voluptatibus ex doloremque est ut nam itaque. Sint eos aut vel ut totam. Suscipit laudantium nobis nisi porro. Voluptatem qui accusantium unde doloremque optio eum sunt.',
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
                id: '30f5a7e9-171d-4304-93a7-17f61f8f5370',
                tenantId: '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89',
                tenantCode: '3kuwk6lkc9qc24jrguf8ztm7o3n1xvgier258b5vzy15abfl25',
                systemId: '4bf38c59-048d-459c-aaae-c5851480e77e',
                systemName: '9mz8n8iqxh6tr3a8b681',
                executionId: '5ddc25c1-3dce-4b49-86af-c940712436d0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 07:42:40',
                executionMonitoringStartAt: '2020-07-28 18:27:16',
                executionMonitoringEndAt: '2020-07-29 02:37:50',
                status: 'UNKNOWN',
                channelHash: '99gqfacs06l963o6sab3tl5be3xn3kjxc1jwvruo',
                channelSapId: 'cd0ezlw1e88jss8htmser2nc97bhzhfoba5mqeuhmenmromz0l',
                channelParty: 'dphdt5rok0jmonj9qpt2cu723693adaqz7xx3y401vmz5od6qb2skob3j8m6mklyo74f4xdlqs263pufv5ho2vp7mzson79cxib2erzn89bmh8bn9ltiqc6axno1deoai2c84m55q4g2sp13b163m1rinhdc1ijn',
                channelComponent: 'jvbhsig8j5fxhrbjoj12kwknmzvolwe908ahrt2lpvpgdlsxqw5dsp3u1balug0z93bioyjh8ouy7wkaxv21e2t3acpxbmh3u64b20fnpoj7x4tao7jh0l6urcse6pfxd5bdmk4svc9d0m156mjjig8bwmqcwi3e',
                channelName: null,
                detail: 'Dignissimos modi nostrum quis iure. Rerum totam beatae. Commodi vitae asperiores. Sed reiciendis eligendi voluptatem quae quo praesentium doloremque hic commodi. A aliquam unde neque ab. At ullam hic voluptatem.',
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
                id: '30f5a7e9-171d-4304-93a7-17f61f8f5370',
                tenantId: '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89',
                tenantCode: 'ij7lt404b6927xnstq4qu8zz3d4uz3ztd6oqyogtuahlokyji5',
                systemId: '4bf38c59-048d-459c-aaae-c5851480e77e',
                systemName: 'iih4xkwpnzaogpykdx3l',
                executionId: '5ddc25c1-3dce-4b49-86af-c940712436d0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 17:00:33',
                executionMonitoringStartAt: '2020-07-28 18:33:51',
                executionMonitoringEndAt: '2020-07-29 02:16:24',
                status: 'ERROR',
                channelHash: '1ak40w80fblgd96cuy1e5ul5e0emx683jna5a5bz',
                channelSapId: 'vcvprjed8yn7xzlqw83bbfaxv7ba7y9l5i89x32ozscv39u8v8',
                channelParty: 'ef93yhzo8fqtrpb7dmudlfp5dlotqt9xtzd2a14fstak6iifg0gqyh40bksamp2xr3g0adhebr5r5c4jt0ch30grez7rjeez2g2bn0qz3nsrtvn2dgb1wbx4ab6ffilsv8ncep3nb4vidf48nhzq7ujhiyr2otk0',
                channelComponent: 'd03807xwsuaiagaxv92graf00ywyaxxmwx30szckfqn1ec9fjupl7jfoy3aodgpn8b6de6ae5ghbjb424ogumwwieptij9u77xzs5l4fwtw08p9vb72kwm3l2oxvxos270ft1f2efdeekfuwzsoviw797my0mvgi',
                
                detail: 'Expedita dolorem molestias vero corporis ut. Non architecto quasi mollitia impedit corporis consequuntur voluptatem. Dolores a maiores.',
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
                id: 'riqvtk75jbv7uqvfdnbzpt78r1pf5p3urgy8u',
                tenantId: '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89',
                tenantCode: 'xr1tqln8c211isekswnj61vjeez1kpmsyv0oguvhn5epeivkl7',
                systemId: '4bf38c59-048d-459c-aaae-c5851480e77e',
                systemName: '9eoczw2flziynwvwdn0e',
                executionId: '5ddc25c1-3dce-4b49-86af-c940712436d0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 04:23:32',
                executionMonitoringStartAt: '2020-07-28 18:44:34',
                executionMonitoringEndAt: '2020-07-28 21:47:23',
                status: 'UNKNOWN',
                channelHash: 'joe0c4yjie8kk3ymivxwcdnhigmaawt9onzoazpj',
                channelSapId: '6uy71uz7akos2gfb46fa2knv1uq6j8tmroe3ogqlffy8yoaq26',
                channelParty: 'l5kt3r3l8o4uceklywrzukqaow5kj6j5h246c7qm43jh1b1fihfz2ufmsbxcrl10pu75i5aqvea555m7uqyhnrisz91m8zmadubinvaf9skt5gymoskj2u0mpiepc0f3jvchd6xzdi5xh65ngnh0kyu9dgu276yr',
                channelComponent: '688jtr9spt1g61nv7rhhf90fxhy67qe1u9jp7az8l6q7dwuer16qv6km92wzlb9bnppanjwru3ei4nvs06ckrccps7g3ang9cmqqv3t356o52ebq3gwb2ba1mnzn4hhwe6i0u9y2bbez43hdu57ljrxdmj9qay22',
                channelName: 'emx2npzvop3o4ivznapyoiunefemgl14u1m0sa2a4z5fbh7yoytoftfh60cnnvifa4ubfipg08hamyaiu06sb17nppe8fryxs060m3fjm3y4qm8vh3gjnac60fli98a0g626n6wjqsugoyml2n0razy44mj9fer7',
                detail: 'Dignissimos ex commodi consequatur praesentium. Et ad nam quasi iure nihil in ipsum similique. Numquam et voluptates quia officia voluptatem.',
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
                id: '30f5a7e9-171d-4304-93a7-17f61f8f5370',
                tenantId: 'l5zyujqbwd9dkog01t5mgp8ds6ikp41sxlwcy',
                tenantCode: '6yncyg8s7gyudqx5bvkly2rc6cxz240vr65rvn3u7vpkh8lx3f',
                systemId: '4bf38c59-048d-459c-aaae-c5851480e77e',
                systemName: 'wy0ucnh5nqimqccglxvy',
                executionId: '5ddc25c1-3dce-4b49-86af-c940712436d0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 02:38:58',
                executionMonitoringStartAt: '2020-07-29 05:41:39',
                executionMonitoringEndAt: '2020-07-29 04:38:30',
                status: 'STOPPED',
                channelHash: 'reln9v8e5a5dmk5gmzuvfqymy6uj4qlj3dbci4jb',
                channelSapId: 'ifq40tnyqd5qgyjgqsv5a293c443mxzj0neq2llkuk38ryujzw',
                channelParty: 'ip681qsxr1xw3nl3sv046dytzqn4c5gf6h1d52lj2eb0j61j810ilzdqhszjfr4mub9z7maz8ebe29qysjjpr7ywpjsb07yfsutx6c1rztkt324sqr5o7an2l48br7xbuzwp6iwmpa9l7zt9b8ji5il79sr01p8p',
                channelComponent: 'lxlt4lb9430jh96o4c0e1h5tjp9fqm7cqfq250es6yk40c904uq4t8hls2mua797gzi9n1uw7s17zmpm7no3d339dqdvqj2avt72ltr6mkq8ek73amjy9rj57t1arvtzgd73k1a3bbk9eldjoezaz1iidb18iz8i',
                channelName: 'hqrca4gqizzfmzvgi5ojiutm7u5nc5vqbryrt9dql71ufyk26lzcbe8unbrn03q36gsmo36hhxlivo2qfktkkmm5w2wcztbaqejkmgr1yiafqsf9li60z4zeas9pzgkro1pp5t7iujq3nyix6i00elg09upt8j82',
                detail: 'Tempore amet illum veniam eveniet rerum est soluta velit mollitia. Qui eveniet voluptatem minima doloremque id culpa error voluptates vitae. Unde qui rerum. Molestias sint alias quia. Cumque aliquid est. Ut sint saepe facere voluptate et illo tenetur.',
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
                id: '30f5a7e9-171d-4304-93a7-17f61f8f5370',
                tenantId: '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89',
                tenantCode: 'j613q5u497au3xm2t394u35wb5218iowo20tku3zpta4omk50o',
                systemId: 'abztdntqqg75vuwmglyfg930m8uvgqn7ky8h2',
                systemName: '3eq0iyaetzvegncdrghr',
                executionId: '5ddc25c1-3dce-4b49-86af-c940712436d0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 18:08:30',
                executionMonitoringStartAt: '2020-07-29 06:23:58',
                executionMonitoringEndAt: '2020-07-28 22:04:20',
                status: 'INACTIVE',
                channelHash: 'mmcqi7s9horh35fieh3f8psfsigpl5dlzi3kn6j6',
                channelSapId: 'mm885cq3pas2f7b3fi7hfv610700jaadsbveuzgc2bofbk0l0i',
                channelParty: 'vwj316mwv87xmxunpscycupv4cwwxm12iw7bzwsm04rmaof3l25o6vyj8008yu1mvga04c2158uyxaf9fw26md7mn9eirpn1hxb73rcg6y8mro5vo0ywaumtug388173gm6nm1t3ibsanxtxfeevksfd0kfam6cw',
                channelComponent: 'ipx9hp1dlud0qxqaze848dou3paivzbnf2eli09ynesomi5cv9pbm6qoy9ljmjlg5ooe4zcfk5nul8nreq8dlw85nm9lgl82197h1rsdbqjfickreodln556e8kyhttr7h4mqadk61v2at4bwxptw7hr1qc41e5l',
                channelName: 's4mbhr8q70argl1e73fnjf457m7qqkls5ruuits4klfinq29wwfqrf4sv2ck0rz26iri1ecpf7gb8ckqlqp7amz3d44dlp69leepg1vohmeml9dwtwkfhbyxas7yvj7rn2qbwi5qxgxizwiwceo6w7cps7qqzizv',
                detail: 'Excepturi rerum iure est asperiores. Et nemo id asperiores recusandae quia ut aliquam iusto ipsum. Autem commodi quia earum. Quia eum est saepe et iste ut quasi quo velit. Voluptatem molestias et occaecati impedit aut. Quae sunt rem quos debitis qui dignissimos quod id tempora.',
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
                id: '30f5a7e9-171d-4304-93a7-17f61f8f5370',
                tenantId: '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89',
                tenantCode: 'wbd3oln6uqkfur1r2eltca5zqnnyo24or3hbbvw9bx9m3flvg8',
                systemId: '4bf38c59-048d-459c-aaae-c5851480e77e',
                systemName: 'nqlz5cikgmlvli4if4yq',
                executionId: 'wi2rux3aspugcv2dm11vtr9xg227sx25d1tlf',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 16:17:13',
                executionMonitoringStartAt: '2020-07-29 06:02:47',
                executionMonitoringEndAt: '2020-07-28 16:50:12',
                status: 'ERROR',
                channelHash: 'x8emd2qwmyg37us2c6qjkgdrhkmx86wqlh9ziwl8',
                channelSapId: 'mjt7cuf25dfqktg79bfw95siszturhlip45c2khxvh5g3f7v46',
                channelParty: '2qjp8uqx49rttnhj2qhq9b0wutw79dst2l20zh9bx5ce1lav5a6nkxrn5914zoxetopusx5by8wurnhfh7x2r45dpmhj6se8bvqjybkiid34oq71nwxn3306sca6ghnh0celi6qximt60cmd4dij9vmb3jiui71h',
                channelComponent: 'akcyi61sxxrvlk7d2251tv36084mf8k9tonl4a41rxmzd6lirdnqts18k7wf42xdj3ujanghs8mlcuktf731etqgnmnyonedcxjrg785yznz8pm0260958mzyrpt4668xkksqsshncz1hntclr9o10j2cfu0d7e6',
                channelName: 'ndv21yjepcc65f6xko65520m049r53dg5chrb51rkr0lpqxkz63z2ltec7zako976ee4leekbn1z6fabm7b7k8cstg52m81oi1g8598jbfshlgbwpg562l8e4tgkrxkottninr0eh0lwxdmnm4olc0kovvnksd88',
                detail: 'Saepe repellendus aspernatur. Ut nihil laudantium numquam corrupti. Ratione et quo temporibus saepe consequatur accusantium.',
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
                id: '30f5a7e9-171d-4304-93a7-17f61f8f5370',
                tenantId: '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89',
                tenantCode: 'g71ha8xrujk4j6tubhqacka17dtmn1iys8jvyf4epl7ttp1un5',
                systemId: '4bf38c59-048d-459c-aaae-c5851480e77e',
                systemName: 'xb2t4m5wa4yxfcmwwrnp',
                executionId: '5ddc25c1-3dce-4b49-86af-c940712436d0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 00:05:45',
                executionMonitoringStartAt: '2020-07-29 11:15:57',
                executionMonitoringEndAt: '2020-07-29 00:36:38',
                status: 'ERROR',
                channelHash: 'otj3ki2jdjig32lb8j0hxleyzp6f7yqhtl3ki4o9m',
                channelSapId: '50ougdr8r0h2y7pss8ldzjt4ez8x97c0t1mzw838p7k99o43g6',
                channelParty: 'm42m50h1z69fzuho5nw0911snblx5ats3v8zt5fm9iinjv20m4sn8q6bn3tqelixcp8ct2e7vwx1pixnqjtvrakvax3ei67oo34ojj4mg17g6abugzn1ug4cy6xj5aa0hzov4jc67bccjnipu6ziv6rzxkxe6z04',
                channelComponent: 'txto876zc6doljcs9r0cdbh5zmu64g6sjaztc1e8n8wqakctzpymvygje7f2zedqom27v0nck47p66zm7i89sx61waoggacqhj9q5iz7pdgwoekuhdj9fimsw4ec5sefqx3iybd0ptsjuoyiu315y3zhts3aj5mm',
                channelName: 'i9nm2lii0k3tfphym85rpp3a54gexyynfvvtfpko0lzrht9uxizr2tqyxelwzdc32lmbyz9wybnpy3q5ekkmfd1pymfm627n7i1f9r9iju2v10pw7ulijjof3mgcorq0vujf36ecdgzs5nra96msco11yflhvlgq',
                detail: 'Ut tempore quidem esse amet amet ipsa neque. Eum quisquam id est maxime consequuntur ad. Ut incidunt architecto non architecto quas aperiam omnis totam. Veniam est repellendus. Non eos quae voluptas maiores accusantium ut commodi autem voluptatem.',
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
                id: '30f5a7e9-171d-4304-93a7-17f61f8f5370',
                tenantId: '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89',
                tenantCode: '12jxdteyyref62k2h0x0mr5m78xrdtnlo0n9dwjtq3f4bjegpv8',
                systemId: '4bf38c59-048d-459c-aaae-c5851480e77e',
                systemName: '5ixo3tigdut593defu2c',
                executionId: '5ddc25c1-3dce-4b49-86af-c940712436d0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 16:29:21',
                executionMonitoringStartAt: '2020-07-28 23:25:28',
                executionMonitoringEndAt: '2020-07-29 07:42:56',
                status: 'UNKNOWN',
                channelHash: '2ug7uhwpen2clfqzrh4vm46se2tox9vlcr36brzc',
                channelSapId: 'bdpnk1sckuimry7wblcxks9vbb4sl9cyht7fm20uxeurtc9r8f',
                channelParty: '5lx5r6errhpbvwd851l9zr8izafcjr5l7khc1e3rhlg4xmpld7pq7hsob5oddha8ekb8wt1rnld3rse4lwiy73r9cbk2t4bnwybj3xbekr6k2k9uyfzqjgc2w3oc2ark0qbeqd4q5f4awo4vte6r9qpy6ct3gzr1',
                channelComponent: '1styf5jxjj04fx0i8wlvayjc286jp7m67hoarj4bz6x39hird86k9it8r1ic3tlnoxtpdjj8htkk2vp4ol0qgjh0mp9rwnowmhcxnd1i6mhk3lmnr1pw6b5ovcae9n66ra15fsld02m9z5xzjti15776t8zaykrj',
                channelName: '3vtbf9eikzyp0iif90maukzpnwzmxfkn7xhms0twa5ab01ehpq11o6sw0imtoy3qnmy9p7k41ky2qh0bs9a5fvk0gegnhyhhz8ya0ivzkirn5yyrji27c419vhgszcpbg7d7x56h96ngf8uix7whu2659324ggrf',
                detail: 'Ut modi nemo recusandae fugit voluptas. Exercitationem suscipit sunt. Odit dolor optio voluptates non reiciendis sapiente saepe velit. Quia consequuntur et atque officia veritatis sint dolor labore dolorem. Nulla quidem voluptatem amet.',
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
                id: '30f5a7e9-171d-4304-93a7-17f61f8f5370',
                tenantId: '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89',
                tenantCode: 'fp4y5a4aav794trdqom0gos3fnqmowiobt99pflvf3xc38a42t',
                systemId: '4bf38c59-048d-459c-aaae-c5851480e77e',
                systemName: 'enwbvnacyaqwa60iqmvan',
                executionId: '5ddc25c1-3dce-4b49-86af-c940712436d0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 23:20:18',
                executionMonitoringStartAt: '2020-07-29 05:10:22',
                executionMonitoringEndAt: '2020-07-28 23:47:08',
                status: 'ERROR',
                channelHash: 'depryt4npimymglxjmt7ycqmikq560u4154yy02s',
                channelSapId: 'pexwpafxwsgq370n1mqa1olbozlv2gjw7spk4lm2trxwdidiur',
                channelParty: 'r7de3dvb0jnromhop50k3w8jxn8pao25a3zfesmv0qks64grigbwgh0e3u9xuca5ckuq0bzld0f9996lzm393hmflmk02s8bv449vxj3o2vuv8vwd485qavxufrpjch5hw25bv28mbgft9rn6v6hbxeq50cs4f32',
                channelComponent: '9u3zsvrm8hauk1o8fnug7pk1dcm3y8ey4cawkr5gjntmhkp7jy3su2oyvczb869vmbrdw9ljijv3lj940i9kgruyk5y0we8ci1qfj4uyebpjld5mlxh5ly1f7iuod0e1p5gbs1k9l22dc1w3dmaa67zirryjnj1n',
                channelName: '7l23n228bepisqxa0cm32osm7gay1akyakvz53esmkscjt2j1o5luungcq535kkzadoyusk50v0qzmpz3yldi2qkfhswjv8z5jgqqu6hxiw73v28g753pnem7sinj7pg56edoxcwuqvibwsrnt6x8i2xwlvdlvay',
                detail: 'Quis doloremque voluptates sunt consequatur quis vel. Ut aut recusandae eligendi. Et blanditiis voluptatem explicabo fuga accusantium voluptas illo.',
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
                id: '30f5a7e9-171d-4304-93a7-17f61f8f5370',
                tenantId: '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89',
                tenantCode: 'zmcvia5aygr4wlbxqzcclwde2as3yffjem298nd4xba9v1vlee',
                systemId: '4bf38c59-048d-459c-aaae-c5851480e77e',
                systemName: 'b8wkf0935l0632cuz435',
                executionId: '5ddc25c1-3dce-4b49-86af-c940712436d0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 03:45:40',
                executionMonitoringStartAt: '2020-07-29 07:11:42',
                executionMonitoringEndAt: '2020-07-28 23:01:00',
                status: 'UNKNOWN',
                channelHash: 'r99f2ypezrfha4mii3n4rybp7ke02m3aanzy11mm',
                channelSapId: '1njnef7bxsurvysdzkxl14gg0sl2aj00xihjw4mipoq8ssc0qqj',
                channelParty: '28ixsmpg1emg8je0f0zwbiauq16ex6igp00a2xbyizo6uf5id86kyjhz7ifnghy0suuckrjic1b8srexakz8hzu8a7lw5snnp4ov4mkdfqmiahu6fvh55792ntookxvi3dnthebt8xkyxqxb7fwgb28u95oczity',
                channelComponent: 'k5wav8u1mdhrvsxn060r93ojn978qo0wm7kdmy2mi1djxzqswfgp4zxr6ncfru6wqo9osi3qz3uj5u1c5egle35bw6bos76pd8cx5z4nmvwgirbulcen27piqc0ufjxqb303v164814r5g8gn8kmscey71cxtj0u',
                channelName: '2qfpm1njlmtem1yhsfmo4scnccnrnsg36oe2i93hci5kro1b5npx9p79ridxzzs3npxipkfj7zohfera7rr0a3bvx14i030ywgi3q0vuxtwtry7xn0u7f7avp2gh1jmwom48c1ber0y7iyva02jnokfevojz01u0',
                detail: 'Repudiandae ut quam consequatur repellat provident neque. Aliquid ut numquam consequatur. Eius soluta commodi est est praesentium dolor velit totam.',
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
                id: '30f5a7e9-171d-4304-93a7-17f61f8f5370',
                tenantId: '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89',
                tenantCode: 'wvf1ffsp84usfzqbxkd9o5zw3icb4itiw59xk8ut90hfilljfc',
                systemId: '4bf38c59-048d-459c-aaae-c5851480e77e',
                systemName: 'e37e0hfwow8senuupudp',
                executionId: '5ddc25c1-3dce-4b49-86af-c940712436d0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 22:08:27',
                executionMonitoringStartAt: '2020-07-29 08:22:21',
                executionMonitoringEndAt: '2020-07-28 18:13:09',
                status: 'STOPPED',
                channelHash: 'c3f15okq2eould7qx5oahyhl4tmtcbntpov39kbg',
                channelSapId: 'ls8hjwz9xj9lt3388dqxo8k47v48g9td22gwm0wgzp9xj41z6i',
                channelParty: 'el4yhlju3oy7maxn2rmnyithwhgfdert2nbjr2iwaa0yp6gjv81kxj9heruwwxze7efafy9lifs1zwwlt2fxldn7bqka0y89vpme26ant0rqprsl2jusyztpie6f4m9x21qze9vjp0uupfsggaxp0gc2sq7lseo83',
                channelComponent: 'mnytutnpxhq9id9bpngnh9f9g7104xv271070w7jrc1pm537umy3lqs6g4sjczpwmyhiaa230h1bwxlbzak89q64ai029iniw4yrrk9akuw42etf4mb8h9zv0ysob0uk9mmqekaz3aqomc9h14r9v4pjr9xyj2kf',
                channelName: 'uxo6r48obncdnthouasqp0tao7n2tsmg2r6uq5nqvq2et139guoac0evtwp4cfmn4kvbxxkcyyc9btghv71tf0dg86zlff29j4ccd43014pajau31la37cdu37etkj786we0laym8p8ykvett82la6pu4kzk01xe',
                detail: 'Magni doloribus vel saepe aliquam. Facere minima molestiae perspiciatis et et sapiente quibusdam numquam. Veniam et suscipit. Ipsum quo a vel cupiditate.',
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
                id: '30f5a7e9-171d-4304-93a7-17f61f8f5370',
                tenantId: '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89',
                tenantCode: 'a07dqy0wjvjntqi34q908tvq3uwfsdiogid12r6koyjkvx02c9',
                systemId: '4bf38c59-048d-459c-aaae-c5851480e77e',
                systemName: '7nlv9nu2dn3kurdoribf',
                executionId: '5ddc25c1-3dce-4b49-86af-c940712436d0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 14:57:49',
                executionMonitoringStartAt: '2020-07-29 14:32:00',
                executionMonitoringEndAt: '2020-07-28 16:33:56',
                status: 'SUCCESSFUL',
                channelHash: 'e60zo3v0603kxa0qhs2vqwiwwhtw6niuz6xsaznk',
                channelSapId: 'sl5pzkrihtppcomgzxlpa25zlorkomail8znp7o6pe8w3jj4qa',
                channelParty: 'flg6ktictgufo9oj3x20vivt05lc97iu44kcbgkb8xocljwodd3pideme5xmanddm9yx516hwdrg5ak5uhmuwpa1kfijsrc0vfo6wpzki234ix1v72u9zbjp9rvuq6h7vbbr7v74nko5q2qjkiwgqydjavul1mwr',
                channelComponent: '3ug6xoypf0bw2mh7fuqxrjyyqf7gh8vhwtj9a54s7m273pe0rri4jvxjblcawatt36xm11l9jt949clorq39p9pxf0iqtwtjeeahf581onp920r0nxe0tkprt0cf26x7b0njljkeair0g1ct3nwbdfhhpx8t1kixx',
                channelName: 'ppfsl4elqcjatj4lei1k4nqy57qei62nnlpwvun9hz8uv0cm1ndh81fl366h11cdicaij1f6txtnc1sj5bmp0idkwv4ozj1llou6qrgfumg0sq4f07en4d76e12q7iekcyfr5t2vedj716ed9cmwyttain88t5ly',
                detail: 'Nihil aut animi et nobis ratione est quis assumenda ut. Magni id et nostrum aliquid consequuntur assumenda aut. Sed repudiandae facilis sit quibusdam. Aliquam vel et. Nihil eaque voluptatem iure aut.',
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
                id: '30f5a7e9-171d-4304-93a7-17f61f8f5370',
                tenantId: '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89',
                tenantCode: '7c2ozfwi4pxhx023agwpyb669q1yo02mt6bbsrgw1g9m1324jf',
                systemId: '4bf38c59-048d-459c-aaae-c5851480e77e',
                systemName: 'ou57a3xz4go8p4shxukk',
                executionId: '5ddc25c1-3dce-4b49-86af-c940712436d0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 03:26:49',
                executionMonitoringStartAt: '2020-07-28 23:40:51',
                executionMonitoringEndAt: '2020-07-29 11:48:26',
                status: 'UNREGISTERED',
                channelHash: 'opd7lhxxu5xk335xh3moi9yu5rpoywe185zo6w1j',
                channelSapId: 'l16iw5rim2g5m568lprbs4cqbetgfye1y73nzwyoq9m3kgve1m',
                channelParty: 'vr609mbqfi0zi2qdlu9oklamuvoe5jpx7anknbblsbjxou6as6w4gw66zo46ji0opedfetivp531kojc9z5pcqz1p1t552ckluzomqwm81ebdervxbrjqxatfhsc0skr9my44t4ckmljlw7z3igv0e57poporp74',
                channelComponent: '9tiq0ikwsqkifbjjxjp5ot48nbjswgczq3xfqgtobgddcufeo6awek1nwaqmiy3xca83696hewr57xznou4490xn8tbf2erxhturltrvd1flet5y0ul1qanfk3d3dnnlmxrkpr6qmp7vddw53939f7gta07t5zs1',
                channelName: 'q4qmi17jrt5423n8m2hck1v2fx55iyllftdb0wdz68jlpnlfsm0h14dnrig9dndgixr6y2xgvi6sr8pigwa0vkb34srxx2cnbtwkqzkinyrzmmnldszeazbe4o0n3vx7c21b1058b4dczgtab7rhkja6m3bvabiz6',
                detail: 'Ad enim iusto non saepe. Id consequatur illo vitae aut ea mollitia saepe. Quam id eum rerum repellat non iste. Et id veritatis distinctio voluptas nesciunt. Corporis et dolor quia.',
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
                id: '30f5a7e9-171d-4304-93a7-17f61f8f5370',
                tenantId: '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89',
                tenantCode: 'wkklhwyk83b88cncwl279ur88l7mehpa694qpiiejrw25693z2',
                systemId: '4bf38c59-048d-459c-aaae-c5851480e77e',
                systemName: '6v4obpckyb4uo7uw6j1r',
                executionId: '5ddc25c1-3dce-4b49-86af-c940712436d0',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-29 11:30:12',
                executionMonitoringStartAt: '2020-07-29 00:50:07',
                executionMonitoringEndAt: '2020-07-29 01:00:55',
                status: 'STOPPED',
                channelHash: 'htbyffu582gza5o0elct32p83refshfnyppvafdr',
                channelSapId: 'i2fiuhmdhkr33gxpy1vejv5ver87pmcb0jufzkwmkuribw6xty',
                channelParty: 'whs6s9fs8erhq5qw0h4xavd1ipdliqy4sz0uvitz4lsegf40wi3jvwyesybi2gpee965rrmymwww5d0c2ixiav1bjnv455tau4bqrsjo169y9d0niwxn3vwtk2rkr52aq7bpcub92th6wt9bxw0faccqz2e7v7vf',
                channelComponent: 'i7u01y2j139f9whbae9n87a20hxhqak6xlxl89q76cy0xmh6oe1yizraor3vbsetmk6m0a6oo37o380gtk4lwr23u2cxy8heu8yzji3jiwgcvp55b0bqafwnnyc1lxm8628ydgxl155h781y2mqed1f1pgno6eyf',
                channelName: 'hpzxens6c7z75jja3kxkfd7snexq4ygzni66p5tbhpsbq76a1gnjuh9qw9ic9rl0cyyg3hz6oom9mf5e0tw1lukwtkocza07wfr97hjqbn5y0lnjz3sy50izkc6ly1jkcrfkbq3xf5tq7scgo6olrd08lf1umjdo',
                detail: 'Voluptatibus natus optio assumenda aut iusto. Maiores omnis sit nesciunt maxime veritatis voluptatem. Aut fuga repellat aperiam pariatur excepturi saepe. Voluptatibus expedita numquam provident est quo harum aut. Deserunt necessitatibus facilis corrupti minus rerum numquam. Omnis sequi nam.',
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
                id: '30f5a7e9-171d-4304-93a7-17f61f8f5370',
                tenantId: '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89',
                tenantCode: 'ltwifitqrae48mqqt2c6z5a72l84xfskde1t2az78iwoovp6ys',
                systemId: '4bf38c59-048d-459c-aaae-c5851480e77e',
                systemName: '2o3dnrffzr86i1dda3r9',
                executionId: '5ddc25c1-3dce-4b49-86af-c940712436d0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 20:28:18',
                executionMonitoringStartAt: '2020-07-29 04:49:48',
                executionMonitoringEndAt: '2020-07-28 17:59:29',
                status: 'XXXX',
                channelHash: 'jsre1v68uxz5uv1wkn1znl45t2zdf2xhhadlg44e',
                channelSapId: 'etmv33nr1ow1vev2qk7b8q5od2vhsw0si4fv0qh61mcdca7t15',
                channelParty: 'brytayq7zwoh5qsbnbef8o23r7jh5twu80b9bekrlp6tcekf74seglbmt8orhvn4vzo4ufhdbll2wnl0xxq2lzezhj7d4s6fgoavbdxri8860kzhg3i0ubo8b7qsxccubbbgjmrx1p70rmcgqjlx3l9xwivnfkrx',
                channelComponent: 'kl2z97nxqsc11frnxuufsc8tjp2fd71jnw7c6acqlc65x2ttbzc6maq90xseasqsx2tvkj09yxve34kikb0bwglglic05t7rnp62t2mrm16jdv9xo4nyj1yl10xoftywaaimzzbp3oyixxoetegumzcfrb6skqut',
                channelName: 'xmffshq4grjj9kt8lsvrmj6tct9116b8v2hspqwu9wk8ab0ogwzthyi4rawb114qjbtns6tvu7jrivpybkhv774y8tm0k34466hogbw5lbtemdik1p9tke6zhie584c4krdfnda9a1kqt8xz15y7nrgoorh2yx6b',
                detail: 'Laudantium fuga eaque odio placeat repudiandae omnis quidem doloribus id. Quibusdam explicabo mollitia occaecati at quam maiores id. Provident optio veniam repellendus natus. Blanditiis dolore in tempore.',
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
                id: '30f5a7e9-171d-4304-93a7-17f61f8f5370',
                tenantId: '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89',
                tenantCode: '2lp61yvih5dcjpeciia178hxznxlom4ee7a6lgr1v82fukw8wc',
                systemId: '4bf38c59-048d-459c-aaae-c5851480e77e',
                systemName: 'kbjw3fax2mvateahwwmy',
                executionId: '5ddc25c1-3dce-4b49-86af-c940712436d0',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-29 01:47:35',
                executionMonitoringEndAt: '2020-07-28 23:47:01',
                status: 'UNREGISTERED',
                channelHash: '8kykworj1eio0e70xe4vdybgptsxtfudne3fvax7',
                channelSapId: 'ztxznvbxgzwz0oc6u85m4t1oj2dvchxqsuauftp4nqw6negrb4',
                channelParty: 'm1zoik29cpoj7l0klba03w02q55kz5f03ek1hqui08vfzydid1q7kp2n8a33227jf4y59a0stpun3rvxrkzgolhlf9wxlwkprp6u3mmishi58v4qsuuedkoe6lmbm2i1m44mtclytnfr14rq5cnvns4et6wlr5qg',
                channelComponent: 'kwn8jr22kovc9zlsako7i7cc4lavd19jegl4lh2upfeosnfhojwqhh40pqlyqp0en3826wk3oxp6r79687r9s61k9xhbcpul3obmqedsfupofq942zolfvsos574sbahk3txx5hcl9bdamibgxoz1gp4pcbndoks',
                channelName: 'e5ghpgpvl4r95568t5y1mdaoadfkdz9hocfpsp35ymnglmj19vt4itd4ps3t3edmnbt80nyj15ro7dztaw66srr6uww5gyuzqdzki1fz7i83ejhbr2zna97v9zzq23s03yxqw3fupfurq4b6a0oy40aue4ly3wq3',
                detail: 'Sit reprehenderit corporis non nisi magnam ipsa et fugiat. Totam natus perspiciatis dignissimos omnis. Vitae dolorum laboriosam adipisci qui veniam blanditiis. Quis provident et incidunt quaerat delectus quidem sint. Aut numquam libero voluptatem et eum deleniti.',
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
                id: '30f5a7e9-171d-4304-93a7-17f61f8f5370',
                tenantId: '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89',
                tenantCode: 'cfe7xuau7ccjebeptnzn3m13xh4d5hs01jp2cyvzki506cltqq',
                systemId: '4bf38c59-048d-459c-aaae-c5851480e77e',
                systemName: 'd27gx2tgv6ebhpqpqss6',
                executionId: '5ddc25c1-3dce-4b49-86af-c940712436d0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 07:45:42',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-29 08:41:15',
                status: 'SUCCESSFUL',
                channelHash: 'bs1drt7hym2830pu6jtk33n0mof66gccj4vp57cd',
                channelSapId: '8md72ptmnoxm5dafjbyk9qtz33sjz32x5bo4llibx86fcb6ezv',
                channelParty: 'tgrsj75y118yej2znfl0p8hpwvqr22k1h2tiskxgvbvb886eh62pslwtbvpy3xs713pmfr7dqcofth2x4ttqghn7v35dbixgkbiq9cj0n1i2zvjr2dhrvbyehca3ysy273hjduzw1p1vj0q2h1a1ftiz0gq2blop',
                channelComponent: '87ejhsq30c3aaxof7d0i18jogdlqxmh6roas3yygamug49chwhurm0fwmbx65xryx2mypus61mjeusmkdcsc3kmyvy1fnf3akas20d0vfjqwfqh7d7u29q6mhud21cofe9oepcpgg9b477jayia53v5cmb42qwau',
                channelName: 'aodu9h57h84sw7hq3vr6qfwk7zycqsdyzcjrnieki9jxr57dfb2x58wxv4vp6qkbfmp84j7hrp917ctspr8gvw6r0s8l8wh42wi7eyuza59cspu34we9qdbcjrtcoqmbrf4zoetvosqrf617voezj1fjoj837eig',
                detail: 'Eos laborum distinctio atque ea totam. Laboriosam saepe nihil quos quis aut eius. Consequatur minima provident doloremque tempore animi sit non sint. Fugit rem doloremque eum architecto explicabo qui aut.',
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
                id: '30f5a7e9-171d-4304-93a7-17f61f8f5370',
                tenantId: '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89',
                tenantCode: 'iuwbc9j7h0bt2s41pojecf9i4hhfof2y4uelvjz99v28cysl18',
                systemId: '4bf38c59-048d-459c-aaae-c5851480e77e',
                systemName: 'lm90sweavb6p4os68w2s',
                executionId: '5ddc25c1-3dce-4b49-86af-c940712436d0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 02:40:34',
                executionMonitoringStartAt: '2020-07-28 19:42:07',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'STOPPED',
                channelHash: 'sq94fvsp1grgv6sjmlza70t33xw8mchff7gde6om',
                channelSapId: 'itpv8g3gpejh7ibnatdj94h0402ejr62l2rzk1xxif8tc3e6jt',
                channelParty: 'q4n5hw6m1a56whigbt69pnhbmq3ndb5px8hl5pswag3f7xdfvt2ql9pmz715xbaryds2gji2e5po1w47pzoj5hv2iyd48qfroswr1hes019xdl3rpyl740u60ged9i5czg2yg8auus3cxa63miigyp5bp16dg0pk',
                channelComponent: 'st08ocokw5nc4zbni9rn2jgr1j7ok43rdtkrzarwc3malso8ogc6533ciipomb530xp007p3ftywkp12tajtyc48yvsb9z9v4gs6tiud3kp949stof67qko30g8kei7hkjckaj50unjzejlorrvhzsby7fsoumwu',
                channelName: 'pn3i5f2pgnqxzpqpxsrau0hm8maj150ecsqqrwu96bv1kygzyzyy0lz5oer1fm8g3e15gbdelisdd11hkyth6t1kf889snktg2gpnvd05vnlsun07q9av3a6mjn6vl8y2uq5j128aais67hhztr9b5196at3riyc',
                detail: 'Aperiam velit at laudantium dolor beatae debitis. Magni autem sint. Adipisci qui nihil minus.',
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
                id: '30f5a7e9-171d-4304-93a7-17f61f8f5370',
                tenantId: '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89',
                tenantCode: 'eq6voynm9mu7p5dokdylgfb41jclq42znfey5pt9hjyp035226',
                systemId: '4bf38c59-048d-459c-aaae-c5851480e77e',
                systemName: '6wuhw4rf217maqdshdka',
                executionId: '5ddc25c1-3dce-4b49-86af-c940712436d0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 19:01:46',
                executionMonitoringStartAt: '2020-07-28 23:12:21',
                executionMonitoringEndAt: '2020-07-29 02:46:48',
                status: 'UNREGISTERED',
                channelHash: '6o0l24wnp1rw5z37qffhkq4z4uy853qkxcjciw9r',
                channelSapId: '7ppqh8zqrj1lnu2mboig2lo7wbccgv4i0lj1tudfe8if3c6syt',
                channelParty: '7wi2e3dnstpntpi3d2nnbcdb3bdbkplwvz03jdyajdavvwas9mktpwivc2z5757gnwxt9ztahqdnut41c0t0yz66qa78wvgt99vh4joeeyuxblxrx7lzq4uryx6lvep2brjlonjg7qs2xt91q9htkkqcherdm9kn',
                channelComponent: 'rkxrtnyd25cewrw6wnnmpcijjbvvimiouoavu0z35emrlscdvvrf037b920l0mnaiolekf3ayyp3hszoak8k4zprs0gfhimhpfz2alrjucrdp3paesemzpvish5n4qivpjp8mp22jqsj7t1wo6hmv5h0ylz7h18y',
                channelName: '9maoi4fnintdukpxvq0nzpmdjtnwkalhd0yb9iqfprdiznxm65c017gs3tw3l9xs6quv3tscw4etjvmngu4ndtxk1zstdu8pae6edypjvwrn2m4efd1fyx78j66mg31wkqc7o2lzjey835s3744u9trzm65jcg2l',
                detail: 'Pariatur delectus doloremque quia provident quia at. Perferendis tempora sit nobis laboriosam eius pariatur repudiandae voluptatem non. Corrupti sit odio natus impedit sint ea similique. Dolor ut voluptatem eligendi omnis veniam ut qui.',
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
                        value   : '30f5a7e9-171d-4304-93a7-17f61f8f5370'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '30f5a7e9-171d-4304-93a7-17f61f8f5370'));
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
            .get('/bplus-it-sappi/channel-detail/30f5a7e9-171d-4304-93a7-17f61f8f5370')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '30f5a7e9-171d-4304-93a7-17f61f8f5370'));
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
                
                id: 'b8dc9b59-e317-438c-aaea-74f79439a418',
                tenantId: 'f94ebfb6-406d-4684-9f1f-252307e128e7',
                tenantCode: 'u52bxmsz8e6pb8wm0hahfq9pnz8orqx18egs24iw0sccldxhh1',
                systemId: 'c7bbe251-313f-44fb-a21a-74ef24e119b8',
                systemName: '5hbtenz9km2e5s3z3lm8',
                executionId: '4ee201a0-a282-451b-9b4c-408910aee174',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 22:41:28',
                executionMonitoringStartAt: '2020-07-29 11:31:48',
                executionMonitoringEndAt: '2020-07-28 18:12:19',
                status: 'SUCCESSFUL',
                channelHash: 'ncbujvxzcyjx9h4imjx33kz1sc1zer6txqvwisxi',
                channelSapId: '0z3nuti9a8gquo9gays6t6x1zm0vrmeksyx1euv50hfxymvral',
                channelParty: '764t8t0tvmvy1xs1xn5thgavtb8xfoqq8c78cl5mt7s347bn2twezt2tlwjgch1ihbzscitg9hos3hzak8vjiwyayhgzy16s1csg822d6x65ozs9b68nii5jtybwisvk92q3wl4zekwmj1c7vtwklxdq6u2doozx',
                channelComponent: 's4cgcz0qrk1q8g8rwhkxvzisbt8apml45kwzsksz5fk69sga5zwd8jrwhxqliktwf81esopajf4b6r53v1i5tu6jgo7y1c4sbgdgg8tpkhm5mmgspr7nivusio8z74ek1uecj51asqdxyzqn2w1nzajffx810i9x',
                channelName: 'gmk9q99mjnmvddgyenvolxqbimwp0c1lkvwjsc086ddfkvnhcsjgcjyhxzr0jgbkawmzg4dq458cr1ct09acf7q0l4ufqjgs9y9shgqlz4bh376gnhva8d9zmjp56twzpq8rz0bptge5vv64umuy8nsgzstf6051',
                detail: 'Itaque officia sed voluptatum esse. Corrupti ratione numquam dolore tempora error sit dolorum. Doloribus qui consequatur beatae. Cum qui voluptatem corporis voluptatem quos. Doloremque neque id modi aspernatur rerum optio ipsa corrupti.',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '30f5a7e9-171d-4304-93a7-17f61f8f5370',
                tenantId: '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89',
                tenantCode: 'ue73tm7donxmuo99ou6velg2fh70tqpf12xjo6b5vq9yjgew2q',
                systemId: '4bf38c59-048d-459c-aaae-c5851480e77e',
                systemName: 'jy33ryjdlqhpxk61nr9j',
                executionId: '5ddc25c1-3dce-4b49-86af-c940712436d0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 13:00:15',
                executionMonitoringStartAt: '2020-07-28 23:20:09',
                executionMonitoringEndAt: '2020-07-29 02:31:50',
                status: 'SUCCESSFUL',
                channelHash: 'rc8on7hxtpj6ie8idcuqdi5dzc1j8gt4zezs6pg2',
                channelSapId: 'wqdilxqs7rs9h3qnylttvkhw594wo8p5yk9wh1pkaaxc59rl9h',
                channelParty: '28aw1n0e81baua5iy51g2x0hrdf3v8vktzl47ae6u1rzrgn5kwrrvevchbeeuzljizb178lviiybande0k9lhm6m2tx1tjp1xsn7y6mvj2lncofh4y9cwjsm16s861cz9k2nbcx8y4iii0die277yoioz93ibrra',
                channelComponent: 'ghu3v280alpiz7pi9fe3ovqa5ngllkg2q0u13tsi3smg6m6gftlopg9gph9er5sta7tq288uh60ahyyqny100em8vr3snd84x4tzro9ih1227bc8wx8mwoogzrsmudk1146jqi3jv1p4g92rgip7c748ln01b14b',
                channelName: 'd33v211rhzrqn31fyfcz9d9vk811y3af7brhloycd0h6ea3fm63jer4m6nitp0mrf5au7nw8x2dhanxbrhxkb47x4ykquxl4czv0scgxh9slzs5071mv6y9scqtwmoj1vfz5uhpwtu0gvwz41o735xshlzg98n1p',
                detail: 'Occaecati quidem voluptatem commodi non aut dicta. Suscipit consequatur officiis sit. Ullam autem quia aut et quidem. Non cum dolorem rem dolore molestiae fugiat.',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '30f5a7e9-171d-4304-93a7-17f61f8f5370'));
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
            .delete('/bplus-it-sappi/channel-detail/30f5a7e9-171d-4304-93a7-17f61f8f5370')
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
                        id: '1aabdc4a-e6f1-4539-8883-a865817d5fb4',
                        tenantId: '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89',
                        tenantCode: 'nkjp8n20mymdtnwx4fx0v7wvebzx24f8p8uyggwjahyof2ty68',
                        systemId: '4bf38c59-048d-459c-aaae-c5851480e77e',
                        systemName: 'krm3dl8weec99iqwerqf',
                        executionId: '5ddc25c1-3dce-4b49-86af-c940712436d0',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-28 16:13:41',
                        executionMonitoringStartAt: '2020-07-28 16:56:36',
                        executionMonitoringEndAt: '2020-07-28 16:02:22',
                        status: 'STOPPED',
                        channelHash: '7blhvf84c3hirpwpjlzibhr91pije4d2fg62lt9y',
                        channelSapId: 'mn4mj8qj08wwa7rtzjw1itmh095qgcyhdqpcfgh3vse838jela',
                        channelParty: 'w3xtvbifec4mv21da7uelzvvu6cab7p2d0bw9lklrdwsm59xexlvib18p1dl9kdrkz6gi84oezv7keag1xfco0cxu42gm3v5ozvgxrb6061nu39rcq0en62qi0xrx9im7xhfzmmbrwgp4050w4yx531g9aqsy9r9',
                        channelComponent: 'y034o7ghy6628a946ka0cspxurpsl95kyr9s0d5ftnbw1jb4cls4sdmryowt4y70nbmgm6nt2m3leilc8u2gcjcei7umimu3pgu6f3tz5d6e7d0sg05axyy9dgwm6g1w5dyjtw5gja2g5qork94pnwa8hkeqwrnq',
                        channelName: '9mskdw41jqqwwp9tauu17wp894z28ja2ya12b0uqn99yayi7x02405x0gtgtzhorttzc8lai2css8o96y58u1bu18w6clxuwtnrrvtpn7t8xv3jiaw5gbbten43obc85j8mpj8dfnwoihp3dta11ezz3rprc3dwr',
                        detail: 'Et veniam repudiandae natus ut tempora. Est fugiat placeat alias sit non rerum autem. Voluptas alias in sit ea dolores nihil et. Quis consectetur et.',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannelDetail).toHaveProperty('id', '1aabdc4a-e6f1-4539-8883-a865817d5fb4');
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
                            value   : '30f5a7e9-171d-4304-93a7-17f61f8f5370'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelDetail.id).toStrictEqual('30f5a7e9-171d-4304-93a7-17f61f8f5370');
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
                    id: '30f5a7e9-171d-4304-93a7-17f61f8f5370'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelDetailById.id).toStrictEqual('30f5a7e9-171d-4304-93a7-17f61f8f5370');
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
                        
                        id: '2b6039e9-1a96-4816-8755-ec04354ef7c8',
                        tenantId: '13a783f2-8872-4470-a2e6-26296cb62174',
                        tenantCode: 'il1jtyb7am4raxrxx0qcpcy2spzyq6bh1us4u68yhzzh394pk4',
                        systemId: 'c5e482ab-cb9b-4c01-abd9-d58590510876',
                        systemName: '2tfmn0x9tvh1term7e7e',
                        executionId: '58237870-856c-4815-a479-699b55878513',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 12:01:10',
                        executionMonitoringStartAt: '2020-07-29 05:49:34',
                        executionMonitoringEndAt: '2020-07-28 15:45:45',
                        status: 'INACTIVE',
                        channelHash: 'kqzx9mhwmvjgomqqax4gxdchn5qskjk5buntplur',
                        channelSapId: 'jmrkhur5ecp17xcyez1j41l9efol0lwskxzk65o8gkqvwlj919',
                        channelParty: 'dstlmsrldhoj5rj3808nrxrubafp0bo1w1js141yb9zs887ktl4twy7h6cahipq4ct2dw3635559k0w0k4y9lg477pwn1uhls8t7edwoue8okvyo68ce99aehkm3j64affdhutbv9ll15ejnv2sz2t6uwqe28y7q',
                        channelComponent: 'ms1cetx5yw77n1znnkvkkrb3xfn8k41w2cg877k7mxzz22u0i8xba7iscm6ik5pfckiqy7thnhx8pwo4hipa850gkwsdo8g2le63izlfzx66gpws90cyptg41cs9iwpqzrzqo1268z5xzcjdgbexu03yay6rzolx',
                        channelName: 'r2dh81fvlwjjcbggcr6zfipnuoxspmaurkewbhnrnuaobqz7svfxmy3xuktjn2u4w7adqfgysn03zzdug5uvq39zxvc7e2jfcnjanmfhksjg0l06n288t7joqeec1k3stih2tlklbbt9kidk7d4jv0am1tkgaxys',
                        detail: 'Enim odit quis. Vel architecto quo veritatis nisi consequatur ipsam vitae non omnis. Aspernatur consequuntur eos vitae.',
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
                        
                        id: '30f5a7e9-171d-4304-93a7-17f61f8f5370',
                        tenantId: '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89',
                        tenantCode: 'qop9cwdniw1xap2f4tiw0okb8cr3ll5ftcor26pgzlcz9mud6e',
                        systemId: '4bf38c59-048d-459c-aaae-c5851480e77e',
                        systemName: 'i7jtaettrpfsup0uixl5',
                        executionId: '5ddc25c1-3dce-4b49-86af-c940712436d0',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 13:21:22',
                        executionMonitoringStartAt: '2020-07-29 04:52:32',
                        executionMonitoringEndAt: '2020-07-28 16:54:52',
                        status: 'UNKNOWN',
                        channelHash: '7wmd50hxjybt9jzkyi9mxasdddzhl5ftaynvrssu',
                        channelSapId: 'te0quz9lv7w5epmr6cyx2zlb64r4b0nwoekm4urqm0s8oiyw6n',
                        channelParty: 'tkbrkbmzseis8m1awev2li5x54z2d724rf7wrzlcki3m2m6m7wk3iwj9m08j1p7kan1iadqon98ofao6m9ngcctyltrj6wz91r3oqi3f2hp5v1udvn0cg5vexauqu7f3187n1ex9ditxvr7k0p2s5ixgwn4wywj9',
                        channelComponent: '5ns4w2ygvttj9ewxmsqj94yx05o8os1vygcmck73wb9vnp8xzcz69302r0xpm96cyvrrk125rjc7lkz5g2057z4e8oyehqfowh31s82530fs8bikgwf5xorxb015sxumcjopck3bwv167atkb1ajzgtzbvgy1tj7',
                        channelName: 'spt81er8uv57cdbz8unlr7rg8tsmw226wt978jw4m5ra6n2ycl78daj8dwhq2uibewxg4q7juk0cv0dl03wle9s8w29eidl0wig14ttbcdrv91sxuz3agfmz0cr9ufxziyg5adzyz9mnmeu0knr81ycv3jmkrmtf',
                        detail: 'Dolores molestiae fugit quidem inventore perspiciatis eum dignissimos. Rerum hic ut adipisci ea id dicta autem deserunt et. Voluptate dolore nihil voluptatum et dolor maxime. Necessitatibus sunt voluptas. Esse architecto expedita laborum. Recusandae aut eveniet alias sunt rerum omnis et.',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannelDetail.id).toStrictEqual('30f5a7e9-171d-4304-93a7-17f61f8f5370');
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
                    id: '30f5a7e9-171d-4304-93a7-17f61f8f5370'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelDetailById.id).toStrictEqual('30f5a7e9-171d-4304-93a7-17f61f8f5370');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});