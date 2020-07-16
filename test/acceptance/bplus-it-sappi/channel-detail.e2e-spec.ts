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

describe('channel-detail', () => 
{
    let app: INestApplication;
    let repository: MockChannelDetailRepository;
    
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
                tenantId: '99dd7bdf-e50d-4e46-9710-3df4cefc6cf2',
                systemId: '9bda5c93-a5db-4631-aa26-9c9d77a8454d',
                systemName: '3sd43w8ag6306y5125f9',
                executionId: '5b2c2d78-3728-4ef2-845c-960c83585d67',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 17:31:10',
                executionMonitoringStartAt: '2020-07-15 23:36:04',
                executionMonitoringEndAt: '2020-07-16 08:01:00',
                status: 'STOPPED',
                channelId: '3afea616-40f1-4ec5-87cf-84636acb0a49',
                channelParty: 'g1ojsssmpzeo7uz392o95llvx5u8k11mfvnphnfpwdizvccz003u5zot6ffzru4v13cfkchoy68pcjs31ma9lq0iw7etp8jax1atljwk1cxcj648e6drsirfnu8mo2eamlak1yzpt5k2004ga99ymqumrmd0rfd9',
                channelComponent: 'a85wvwmyicuud6y2y156jk3bx6wnz16nsuia83a0mc1e3wqzdpi0rq5l3guvjgyf4ts83j7hwriw8lkxsmo8jll6nhennu2watr8r5i7y067kqn5hrz3t97y8jnwmldlglgusb9mah89sk5shdg45wjq6ka6coq6',
                channelName: '16js5akb4bufk0agahrmoppac2k2cbg716f49eipkr84do26fzifppigkw483mm3ugpzzrqv1on95hyya75ky4vhdt1le1jqfe32w9zln8a8pehqfqeingfzllwukbkedkxf23mkyhuwphb0zxiaqx6cebk2vs1b',
                detail: 'Architecto numquam architecto totam odio consequatur soluta omnis expedita. Occaecati assumenda quos occaecati animi dolorem sapiente sit. Perspiciatis eveniet nostrum aspernatur possimus amet minus voluptatem quo. Officia suscipit velit cupiditate alias voluptatum voluptates in quidem. Aut dolorem similique est est deserunt esse blanditiis totam enim. Sunt esse culpa odit ex quaerat est recusandae.',
                example: 'eenx8tgupoi9xta1t61lq3354631fw8hl35gbawd2n1w7kkbhuhmn33kn55q8mk9g1t89sakquhqhv1ycesg33iipwnya00aipwd7vg66uwexy2v3740pbvebxp8x2t4vksua707h1oez1h14abbpurm7p9tonex',
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
                
                tenantId: '99dd7bdf-e50d-4e46-9710-3df4cefc6cf2',
                systemId: '9bda5c93-a5db-4631-aa26-9c9d77a8454d',
                systemName: 'mxg74d8lwuifdsuz9u5o',
                executionId: '5b2c2d78-3728-4ef2-845c-960c83585d67',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 10:45:11',
                executionMonitoringStartAt: '2020-07-15 20:45:06',
                executionMonitoringEndAt: '2020-07-16 02:43:17',
                status: 'SUCCESSFUL',
                channelId: '3afea616-40f1-4ec5-87cf-84636acb0a49',
                channelParty: 'ozkc603ncs7gvxjtnd6qkzyhhhitvysqw93tedr7rhw8ru2s07wyz7h8yw6lcq81m10j8l96i8ud3j1crcps8kudfrtxm5u7h71z0hhg741rzzh7wuwv0805x8ie5jdajyus8w5ouuqfils17n906zrx5st5j0vp',
                channelComponent: 'ymkk069ekmphbf9x70bq1c8vqwh5pu81k4i65cpok64denrzf9afzk6r53rq76mgjec3wn097ufdoat1w76nfwuyh2mi15b59gt23ua5pu8ntysv9a3ogrbq8vlfpcfs9wcnii0i839navj3hnajrbzz73ipsqsy',
                channelName: 'i2hji8o01en50lw8k13i6ez8rrsy9zxjanpq74uo3oqfbtbp8cnd413a704k3r4njxvmf8totblip70un5yfox84zhdbeub77h7z1w2zn209mp0wa6so0u4tve90ro34ifrgh986x39t1jus2a9igm7x4x6w5qg1',
                detail: 'Repellendus aut dolor voluptate omnis voluptate doloribus commodi ut. Exercitationem labore odit ut facere culpa earum. Cupiditate molestiae est perspiciatis praesentium et quo.',
                example: 'xsu93d4ng53ykqtubispev1exj1rf1e5ftkmi2re74ptdmxqbd6gezpex6lbn4rmqg3r1twvu2mowq4dj40wrd3mpfxlelij1vecpom0cmv9eqsdb9mv5w350qk3n09c9uctcdjuff689wxp7l2tt2t12phzyinc',
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
                id: '99d5404c-1667-48d4-b10a-809991f67d6b',
                tenantId: null,
                systemId: '9bda5c93-a5db-4631-aa26-9c9d77a8454d',
                systemName: 'sc1ceagae4wldfxvrtxm',
                executionId: '5b2c2d78-3728-4ef2-845c-960c83585d67',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 12:13:05',
                executionMonitoringStartAt: '2020-07-16 14:55:25',
                executionMonitoringEndAt: '2020-07-16 06:31:58',
                status: 'UNKNOWN',
                channelId: '3afea616-40f1-4ec5-87cf-84636acb0a49',
                channelParty: '62akqtjim684181bpiqo2rumkbq0ctq5sf5dhx999qmank1hkb20gjo7jgjpcsosxyqjm3jzcwob4docf0f0d7kwt3yihsd0y66fkjpx7xvissiorft0sy1d7q3zio4i19gv0u2mvpxinbvmxgd907vvqfgfw11h',
                channelComponent: 'ix42iznz2q7wukb908gty2dodrauti52obri254p66ytoh7w2o2aj8bgfbmig9560dcmlunx94ykzwjx91tk2s4xnvfijcpzcso5h2rctiohlqjbh7l22zbyejfas447wx3792ho55hckejn4nxmyrak91dz6pwy',
                channelName: '6ing9p6r47e101x0jc2nn1n56i8is6u80g7euz9wodemd3019ca2v22guxaesdlxkctso6nhomx1s4yue8c06hj09ff6es4374q2jozzax1hfekxkh1bz245ri724j1phzb6je1dx37r6fd3quiaky6ol99isjr7',
                detail: 'Est voluptas sapiente. Sunt et reiciendis rerum veritatis blanditiis repellat laborum quam vero. Fugiat eum sit ea ut ut quas.',
                example: 'bmp5ce6anlysce0u1psfpp09typ9e178zv8xylrh7nqy0xr52f5q77wmgwb819wr2l0dy4tywdd71nomx2azfhnb7iro72jijst3fifjbxq6fu0bsg6rzr0izyw1649gh70bnhvidbuznp8fl1s9a3234vbo8xx5',
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
                id: '99d5404c-1667-48d4-b10a-809991f67d6b',
                
                systemId: '9bda5c93-a5db-4631-aa26-9c9d77a8454d',
                systemName: 'm46xov9nh32p2yv34rvo',
                executionId: '5b2c2d78-3728-4ef2-845c-960c83585d67',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 10:54:02',
                executionMonitoringStartAt: '2020-07-16 15:11:40',
                executionMonitoringEndAt: '2020-07-16 15:08:45',
                status: 'UNKNOWN',
                channelId: '3afea616-40f1-4ec5-87cf-84636acb0a49',
                channelParty: '52g36uy1ywyjjwmdxm5exex80pyutggdu15q1k5nr8c4hxet1d1by53i6ihyv95yzq1ex1ugbtfwcpv3xhagtpnh8i71ruhjl6e1wgz36ugftb1yveowxka0vrn9vpb3p5pou6an0b6jb8949h667htbx86s9epo',
                channelComponent: 'milzldcxcvnbdxxbxgle8ftr18lcjyint4kwf1l1wwck2ndgmxjrk5p6zwkgu6sui3j0ohz160bsqndx8s1j1kea0x1nmpdc5yy04ytb3dnn6ds7vanebjy7zvvl27qo5jjers6auo6jm3fq3781njs53zenso0r',
                channelName: 'n4gbpenmu8z14lkklmcooqte9wmf72jkydfdr1t7abzg3jr215pkd2yij1koiz14n5kfxv5wu8fljpxngc9g73hvgje57wui36fqeg2fh8cypgq6mywelraerq7mn7f04q34qfnpezg20vlztdsj60zi8elc5tzx',
                detail: 'Non dignissimos sint deserunt saepe ratione earum vero accusamus. Omnis cupiditate fugiat molestiae assumenda quas autem aliquid aliquam velit. Vel beatae ullam excepturi porro. Laboriosam tempore maxime commodi possimus ullam dolor laboriosam. Nam non ut. Quibusdam non id ut eos.',
                example: 'jxm6vlp5fg8lvsczkfvjdg6oufczh2rjsq8bszfsm07a8wandbf6nll5k30hpzhejqagrf3dyibleie2eoum0ecuuwt6ghw80u0mpwtqbhpicq7va5vta1pye1vr2kudefzgs83zi9p828o7f8fohz1m5rffbpdr',
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
                id: '99d5404c-1667-48d4-b10a-809991f67d6b',
                tenantId: '99dd7bdf-e50d-4e46-9710-3df4cefc6cf2',
                systemId: null,
                systemName: 'v4ugq6upc5yvwb2kbao0',
                executionId: '5b2c2d78-3728-4ef2-845c-960c83585d67',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 04:04:41',
                executionMonitoringStartAt: '2020-07-16 01:12:00',
                executionMonitoringEndAt: '2020-07-15 21:55:33',
                status: 'UNKNOWN',
                channelId: '3afea616-40f1-4ec5-87cf-84636acb0a49',
                channelParty: 'r5jvgzj72fa1gts6e0edzvb7f9by5lxp2onl13lk9bx4hjpquxqnm2hvj6qifaq12b3y2vdolz82ft9flxj5vdn4e863kvag02nzc7qc5giq2hoh9mipytlbtilqh5e79g31cy478yetxo6cna6ptyk9lf0ids2x',
                channelComponent: '4otd10tdqy86nymmx4vemm200hoysl0yesu6gscgr7vdkn4t9ascd0nqzn9f24mi2t8h6avp05d9s6qb4mk53170h3a0dkn44td5un436m45xfwjtnddl48sk2pljbtw5x3ah5306z7z3hm4zkmgzbfbksystpl4',
                channelName: 'a15k1y5asmdd3zsbdz0kgu1t2ftdvp38iia1sk6rcbrj5i2shycwkw0po1nknx4sboy8sakf77jibyzgvw2nr6zrlftiv0bxp64m207noix1ujsd0siazotgi7dkoepm2wq9txxq1sj1p6i3jz3kbud8hh17hyo3',
                detail: 'Mollitia enim possimus et laboriosam aut. Qui qui eligendi sint provident aspernatur quis voluptate. Quasi et quo occaecati culpa voluptatum quia aut qui. Quia aspernatur asperiores et hic molestiae itaque temporibus.',
                example: 'k9nu2hess75gt3dpv9xvvnu6blgagnxr4a3nhuwpzs0f2fyqnfo9ruepqhmkae8z5g5w9k9v0fgoz70a4l15gco8urtzl87mv13l28oatrii4383vlpae72rjwy2qwrwuvpxzvknqtp12xpsha3sdhm0z2e4nnpq',
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
                id: '99d5404c-1667-48d4-b10a-809991f67d6b',
                tenantId: '99dd7bdf-e50d-4e46-9710-3df4cefc6cf2',
                
                systemName: 'gebft8ti9u3tirr0yawo',
                executionId: '5b2c2d78-3728-4ef2-845c-960c83585d67',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 08:21:03',
                executionMonitoringStartAt: '2020-07-16 16:35:23',
                executionMonitoringEndAt: '2020-07-15 19:48:48',
                status: 'UNREGISTERED',
                channelId: '3afea616-40f1-4ec5-87cf-84636acb0a49',
                channelParty: 'q36bqipl3xe8v3dr355ttmv6p5iakyu4q92a7rivvzbui9bxqb5y5u6s4vd761nzmkpldcnt33h1eop9qn1uppvnnmyrherzsifrzbfveg8v2zhytw0xq1qzpuxi4tqxqtrturw3xl5kwuiykru4c1f9q0qmcecz',
                channelComponent: 'x9askxluba21gbjeemsdy0gcb2k68p7hot32oo3yau0h54k5a6a8dvmnfjky2dp5opd9du9onb6a2lh4l1uktaesjg6p7d4jcxsxrpdrsuvq3zepcd7mh89rsfw6nw1y5js2xqz1fpwgdqagrsdlu6u21hgiugzr',
                channelName: '7m1r3aqf2cwun7xyh37wrfmmywpmwq4qrga54iex7ibep4hs365gnruhqhp65ry466ua7a106hzstphnn1igzs6p5v50ig7lzvh4339jvk3u2i8msq66urklktb5fvihjeys4jwtwdf99rhx96f6oelc4rh6awrr',
                detail: 'Consequuntur vel in mollitia architecto iusto velit. Laborum id numquam asperiores. Provident et libero. Quia quis vel dolorum minus et molestiae vitae velit. Sit enim tempora magnam mollitia omnis. Perferendis magnam laboriosam magnam dicta similique dolorum.',
                example: 'myg6so0pceaff529zfux56zpl7hbc0aasevnq11yjeykwt270kqkq4i24o8upcvgjwvm7xphl82cl9xfukoxcl008eq4tfs9fgyh13uzv4qgrcnym1vtlxdgjs0zkpctankzrg5yvuagcwvgya0mtm53p07twzdy',
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
                id: '99d5404c-1667-48d4-b10a-809991f67d6b',
                tenantId: '99dd7bdf-e50d-4e46-9710-3df4cefc6cf2',
                systemId: '9bda5c93-a5db-4631-aa26-9c9d77a8454d',
                systemName: null,
                executionId: '5b2c2d78-3728-4ef2-845c-960c83585d67',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 03:23:44',
                executionMonitoringStartAt: '2020-07-16 06:23:31',
                executionMonitoringEndAt: '2020-07-15 20:08:51',
                status: 'INACTIVE',
                channelId: '3afea616-40f1-4ec5-87cf-84636acb0a49',
                channelParty: 'o8d4f6toaa6pytfijb06as3411kmoszq919g6xaforycv867xy76qo4y4j2i0zgicqe2z73l35n7pxi5lk5kyf0xr6dqktpfi13b7gimdfds2yng0hhi9ordzx7bayj59lo8ahyrpyctkuwjpfa60usuxl2bei6j',
                channelComponent: 'qlwchcxxpkbfq0bj46qobu18646olz2623593npfnvocrci9tzx35nauiu122x47tfcr4rh4p52dww1c0rwk6gozn3ugurtf4bk7g8u0l62lkdyabsht2gvk6hni1glelx3mx38dorvhdyop2jtjfjtob4h38o0i',
                channelName: 'geztbqlzbne3zkz342j3wgsdmfivgzfxchxu3bqj6utedoo5nhqmcl2j8fasghwoadyunqe3fqr6de6u53ci8ph01kteixdz4i4wxvsif7apd35pllyx4uj4tjxhuesuja6dlefnl97z427lj7w5gsdb13sgev2a',
                detail: 'Pariatur praesentium asperiores nostrum quod laboriosam voluptatibus. Nihil nihil laborum sed. Consequatur est eum illo hic et.',
                example: 'z9mlauylo0zidqft09rm3qykag3qg0bxvf0o35tqmmito6dv4y6p184prz3zs212vqzc19wjyrvge199iklh024a0p7knlm32qve0gjlqmznpag9sjtcb2naeuz0mkvj0yh808jgbemf8vgpnxgxenl6r4y6c2vg',
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
                id: '99d5404c-1667-48d4-b10a-809991f67d6b',
                tenantId: '99dd7bdf-e50d-4e46-9710-3df4cefc6cf2',
                systemId: '9bda5c93-a5db-4631-aa26-9c9d77a8454d',
                
                executionId: '5b2c2d78-3728-4ef2-845c-960c83585d67',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 03:05:02',
                executionMonitoringStartAt: '2020-07-16 07:00:47',
                executionMonitoringEndAt: '2020-07-16 06:54:56',
                status: 'SUCCESSFUL',
                channelId: '3afea616-40f1-4ec5-87cf-84636acb0a49',
                channelParty: '4xtksh8kf6l5djqo4gphmtqc5qpugnb2m28iz63jy1iu1z3yq4wyfxqnuxg44t7uz426jddxc6vhxl5ihmalixr9utf6iayd32a8wep7keoe2szrrsyfbpi77nnv9io965kams88gz7zly2pz4njt80a3apk1gc4',
                channelComponent: '5atekcjibyg8y06e14k41dwhhhk2rnqjyr3pnh71r3annye8tl4u96qy9g8xdxb5ytk7y165006wwcy3o8lm8wu64q20bxmrerrjr7wmha79lu0xeaekq1e4cb2hgb0w0bmbt03vxrm5a5z4pxnnbnwztqqkktgh',
                channelName: '5b6indyz00x63wxa19oqf9izmtexkjwose82oovra02l6yte0ycrh31mu5nh15v3cg8anbhm3vwmyqjlsv41tmkxiqg95s1epxpn2onk2qvmlw4dj48i0epksmhn75ab0y8ysg8sp0x4th2i35cfzpx3d7rqkg5e',
                detail: 'Et doloremque aut amet veritatis omnis laudantium eligendi culpa ut. Facere ad id nostrum in tenetur. Non ipsam modi eos est. Culpa asperiores ut sed et eos ut. Vel quos nisi voluptate aut suscipit. Soluta dolores ratione sit alias et illo repellendus eveniet eos.',
                example: '5tar4xlctrs43g7d3pcve13ukfed5qhv2rw6c96um76xozvzxjagcrge5hti6p478zf0zzxi8pck8ep7kvhs1wjd572k5aa1009oyqnbj7hdf1ylk151cpyiwpkmej3igr0dvr2xpjeb4di6hm6kjmkkzafilg8d',
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
                id: '99d5404c-1667-48d4-b10a-809991f67d6b',
                tenantId: '99dd7bdf-e50d-4e46-9710-3df4cefc6cf2',
                systemId: '9bda5c93-a5db-4631-aa26-9c9d77a8454d',
                systemName: 'th313r4ft0zjrfe7z3dn',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 16:23:10',
                executionMonitoringStartAt: '2020-07-16 13:01:13',
                executionMonitoringEndAt: '2020-07-16 14:35:01',
                status: 'UNREGISTERED',
                channelId: '3afea616-40f1-4ec5-87cf-84636acb0a49',
                channelParty: 's1o9d0slvc4h4ks3vixj6c36oygwaq0sylvnpdcmynqdrffuf83ewgflcyg1vftsapy1lbrf3r278crmh6m47dagp4khag3w620e1bm1v1a1mthd4vytlmx4atk7yz0dhnrfygz25hveeoypicv6al1jvyn67245',
                channelComponent: 'sik8rgjct840teo997zytk0ep2708264wmt8mhfas54t81mx8sz6zqi87usfns3dgj0yx9e32lqhbzznmw9za7dr3l068a0cqqmbrtpygtssndjmdsvaodxgbjy5fwwier3zyzokko0cx6xbbfwc2om0xmmujiml',
                channelName: 'tdh4y5xmdzfnl07e22ia56wm9k5pts5aw7nvri7vxdx9syzji6gpu8s6wl8271y72weo7506tm8ks417a6fkh9280qzep7jopu3lo6l1soa1sm97zt474ul4d1jl89b2xednd4pc58z440l5bqkjss6bj1r0wj2w',
                detail: 'Vitae sunt est expedita dolorem facere quisquam. Vel molestiae dolore qui quia. Omnis inventore autem aliquam dolorum aut consequuntur omnis laudantium occaecati.',
                example: 'w3z5fznanzce256852703w62ed264vynx785tilojkrmx4mnvni0w87q0adjwmg2stnmlxrnshgprz3ghjzx612f42mus8ycvis915w7ikoqm8qyy8e34yswr7jl2yhspszfau6fqqze467wt7m73fu9zf0n1930',
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
                id: '99d5404c-1667-48d4-b10a-809991f67d6b',
                tenantId: '99dd7bdf-e50d-4e46-9710-3df4cefc6cf2',
                systemId: '9bda5c93-a5db-4631-aa26-9c9d77a8454d',
                systemName: 'hn6ukpldnp12w2i0alhl',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 13:43:17',
                executionMonitoringStartAt: '2020-07-16 17:27:36',
                executionMonitoringEndAt: '2020-07-16 08:45:20',
                status: 'SUCCESSFUL',
                channelId: '3afea616-40f1-4ec5-87cf-84636acb0a49',
                channelParty: 'scxz8s2dalbli63677i6ams7um9dj8xdixw4ymmvuu7a32lsjao8mb4mzpod996ohjdx36kywz8wx0ofo7wd1lkthsht6zyygxhr1qrhtg3wszxtibyuxgcxy5ocoj56iubntczjq9rs5kz4syiavkb2iujhkjtw',
                channelComponent: 'azh02lww61ci8acrsobwwcey2jhh0png920d275heuxzaettlx0ocqmb6tld87mfi8xfmh3xhyxdr2d5f89fe1uugcwgn2nfppdcyhkzg4anszyyi14m6m3ij8mkezu9dv5hmy6eblhrjvmog8frewgwdmqu6zqr',
                channelName: 'hj7aqcx7xaegojst1gd3hakut5y5mt2er6qwba9yeqo40x9kzkgp7dzmhfg61htdgi4v5q9jbaqmqmxeb9vnfkug0prpxsafebdoh5jx2plermkgrt0bmonad7ub3rb3qn9r8a5o44vw8n0ldmskprbcdodvqqfq',
                detail: 'Accusamus facilis eos dolores. Perspiciatis minima ut sint qui. Molestiae ex sint qui minima totam quae. Consectetur eos voluptatem possimus minus.',
                example: 'd5nim99q3bsh87qj0idh0bqhl20n3p7md5aavbtzxo25wfa50e61wrqwwnk13qnfh905ov0n6y7bnyxp0a3eh8n40iss76ovtcu1z7qh6yp0032g47vghrzey9ouq9cmd7whn2xopsv65tswxdntpnhuh6fjdnby',
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
                id: '99d5404c-1667-48d4-b10a-809991f67d6b',
                tenantId: '99dd7bdf-e50d-4e46-9710-3df4cefc6cf2',
                systemId: '9bda5c93-a5db-4631-aa26-9c9d77a8454d',
                systemName: 'jffu3xmre3kdgf34i50i',
                executionId: '5b2c2d78-3728-4ef2-845c-960c83585d67',
                executionType: null,
                executionExecutedAt: '2020-07-15 21:38:08',
                executionMonitoringStartAt: '2020-07-16 08:30:57',
                executionMonitoringEndAt: '2020-07-16 12:57:27',
                status: 'ERROR',
                channelId: '3afea616-40f1-4ec5-87cf-84636acb0a49',
                channelParty: 'p5v8nm1j4c6j1way45ncdx3y7w72pe86ievxdqo1nuhcuxqship9afitvqdmsb17dedlzd7spg76aonmaoafw24uzt4p43xfknmop9izecjd0af3ia0ohlnuwuw7izwaq0rwkqkv4v8e5qrvsbo8yk0ywk8j0afo',
                channelComponent: 'fb2f2qfxky0tkj3d7293powaa36s3zb4sss3es8lip4krmcs70mhud6w3yklwc6qlvwwa94crjraylhdd2sma7wnmjiunv5y9uy5jg015gvc6xcu2tolcvtn92otmfyf0vlwarhrmrcbqfqgvb6qgfrkqaygldwj',
                channelName: 'b070rpuns9dl1j9wnzoxpum8t90q755nl0iyao70tg7bj2vidjs3ziv9d7vmh54cytsy04h0w8v1cr3ycy7unfrg8oyt46jmmaeowa0iney16xgb5f4hcvci851qtz1zg51pgupjiw7erwqim6gdmv2o0o4f6yqu',
                detail: 'Sunt modi molestiae. Qui debitis alias pariatur. Ratione nam dolores dolor velit ea est eum architecto. Tempora aliquam perferendis non nihil aperiam natus rerum. Consequatur ducimus dolores id pariatur minima molestiae. Quis laudantium dolorem et fuga maiores dolorum dicta.',
                example: 'l2ptucjdapxigwjdv35hbeydo3ph4eaa48n7zufvgdk56jmfesuhfwapst0vasw5n60qdufgj8emtpspkdtweayh6jjochdfjndsyw5iceefd69hl379n1p7123c0qkktsq9k90t0fc5eaik89p8qkhvx6ixkeam',
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
                id: '99d5404c-1667-48d4-b10a-809991f67d6b',
                tenantId: '99dd7bdf-e50d-4e46-9710-3df4cefc6cf2',
                systemId: '9bda5c93-a5db-4631-aa26-9c9d77a8454d',
                systemName: 'a52p32eoiscyld2k8lwz',
                executionId: '5b2c2d78-3728-4ef2-845c-960c83585d67',
                
                executionExecutedAt: '2020-07-16 15:40:18',
                executionMonitoringStartAt: '2020-07-16 04:46:23',
                executionMonitoringEndAt: '2020-07-16 09:22:28',
                status: 'UNREGISTERED',
                channelId: '3afea616-40f1-4ec5-87cf-84636acb0a49',
                channelParty: 'rlgw00xv7r659u14vlmcmj39b3dgrcxn1cmfxcvpknubj6311whpnykwhe9u4kt8pgzfuf0bm88o8ieu0wcdj9zwefeezlwyik988nfoe1pgc7k9se5x0sl8idbygcav2mgtdp69wpui5hbb6atoi46ia2342w5a',
                channelComponent: 'xz6c5fbt9o4q5op78dx1fwyrgwvhdjseh3mt9itw0lrbys0fyn7o3xhmmadoh348rudssihh53eo2q2aw2jmmrcbs3um3oieweanqx8na3pk6v9u4ei30y5jhekytv3ep8gcv0h4hjeeqvy2tp2oad9gugvg451y',
                channelName: 'pp2kualv6yrial620g5dz5vsj1xh7tkor5vjak9pso7pti8bllq1u8lhg9t05pcx9dfafplbnmvwf6584tv26b31h6u8tz5m8985t5yp1ksk8x2gq65ujxxn6gral7c1403os7da1hg6h4jugo689xuycwp3wjyp',
                detail: 'Eveniet vel eum commodi architecto aut iste. Aut molestias dolorum. Eos similique quod laboriosam aut.',
                example: 'jcrltryixbpgwf59r25zz1hcrwzxg5ly5f0nxmf435cyezlt2o3diikqlmmo8p99vsswspjeaoqm4ri3pvlcjbsr2nkx2pvizedezj7ujurvlnndmvbcmoqedftthb7pm3pij8q9jylgwammkuaer76ceqor81f1',
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
                id: '99d5404c-1667-48d4-b10a-809991f67d6b',
                tenantId: '99dd7bdf-e50d-4e46-9710-3df4cefc6cf2',
                systemId: '9bda5c93-a5db-4631-aa26-9c9d77a8454d',
                systemName: 'v1lfg6u21e1njmgv56bz',
                executionId: '5b2c2d78-3728-4ef2-845c-960c83585d67',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-16 10:17:45',
                executionMonitoringEndAt: '2020-07-15 23:02:20',
                status: 'UNKNOWN',
                channelId: '3afea616-40f1-4ec5-87cf-84636acb0a49',
                channelParty: 'u6xa92wt1z4ofycjrzuf0sovnzsywws2f1cvmx8rek4jte6kuhs7egycsax9fbw8lxohyowhl020lvtthbbd1tyhp6zthaxpyd7d9vud2vvvdko42sybwbtixrlcv5p7cltyfc4kymaug85mshbsutx369re9sab',
                channelComponent: 'xsdnbya4cvt0cax7kz5ob3vdwmvalkwkcibu20ego7saoeby93j35s3vws5yf2j3898azt9h3y21vrxrzy22lwdzv32y1qnesf0jcwggda3q4w15mges4v8n789oraano2tuptvd783dd4c559md4zg4yqg05qw9',
                channelName: '1qnh7g5teb1eyyl2wc8st9ieurlowknnxm6z7fkgskmiiu3xwi03su4w99fsfzq9yxfujsnwibv45h7rcnssa25xylurqbuobcr0ms7okax3sdgev7tm0qz8mepzwezw8xw88q1cenlzppn88jlqol1kf4vz522c',
                detail: 'Quo sed eos saepe quia asperiores. Corporis impedit architecto porro consequuntur ipsam necessitatibus ut blanditiis. Maiores eos sunt ea non id et dignissimos possimus. Soluta velit dolores nemo qui minus doloremque. Vel laudantium aut dignissimos. Voluptatem consectetur quidem.',
                example: 'lkmtycvashwu55h96g24pdfd80r7bgod52qhp6w2h523nph28v91weaikkk4gwa87evxibz1lfu0i5eo3n9566ag7w9n60qtqnhgcp792qrdmj18pfumls5n55itwd2jnzqe0ewdbdokqg3sq9l9s9idub05w0io',
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
                id: '99d5404c-1667-48d4-b10a-809991f67d6b',
                tenantId: '99dd7bdf-e50d-4e46-9710-3df4cefc6cf2',
                systemId: '9bda5c93-a5db-4631-aa26-9c9d77a8454d',
                systemName: 'ivcu9h2bfxknprlcdqot',
                executionId: '5b2c2d78-3728-4ef2-845c-960c83585d67',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-16 00:59:47',
                executionMonitoringEndAt: '2020-07-16 06:17:55',
                status: 'ERROR',
                channelId: '3afea616-40f1-4ec5-87cf-84636acb0a49',
                channelParty: 'jf0rfbexh2e58n6xel9bxqwl6753hmm8xdctdg3isy5919x0v1wk7varahdhifs1svjrbcp2u9uycyj83883yj59co18o21cpfviusq41c5oigwje4u4crkqkoh5b8rnf1cr3pzk4ub3s4jfk6c1cqf7k7qpc7fc',
                channelComponent: 'vel82t16nolxit5avk7nvs20u6r4ox7chwhjaa7uigxf1e0f1uibzyxdfa2202g1v1hp1yl3n6icrxxz8ii1obtwkrxxdkcc05m7tkfbksgrngot2v6yfky8yr2zv3octk2kdbzcgdza9fbsbn7k70kohqb2pc9a',
                channelName: 'ulbt4eydvy0argvz9xkld01hw65oi9d3p093s7tltxlhcl82e6wmm4nondssw683by0v01stuzqltbnnyho3gokl87asqbnwly4f5cp2anys76dxknrjto83ucjjwly3g9t7m67oulef0mlkl1do8vv0c5j2epvq',
                detail: 'Quia cupiditate mollitia culpa in quis ut non quae sit. Nesciunt tenetur deleniti qui aliquam. Unde consequatur repellat debitis in aut rerum laudantium enim est.',
                example: 'unqbo3omqbtdxck7sz41npg9c4o1t1a8b5z4702orqixls97u4zerljv2vjhyymzoo053suefd2kctgg6ub0o6byykqtmunc5nqqmkk6zv1n9uaa7yhj5yp11az58jj6duztfi0cxikk4lvpmo8kb5jbnvqjpr50',
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
                id: '99d5404c-1667-48d4-b10a-809991f67d6b',
                tenantId: '99dd7bdf-e50d-4e46-9710-3df4cefc6cf2',
                systemId: '9bda5c93-a5db-4631-aa26-9c9d77a8454d',
                systemName: 'qqrusz9e308afbnw6zds',
                executionId: '5b2c2d78-3728-4ef2-845c-960c83585d67',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 05:05:08',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-16 14:01:10',
                status: 'STOPPED',
                channelId: '3afea616-40f1-4ec5-87cf-84636acb0a49',
                channelParty: 'lp5wyl2elleed1u3bqfknxnmpcln3ragoobhjlf0vm4a2qjy960p333g77kk83nijhxrqzu0gb5m3i0picqackx7jj6ep2c416bdugojpcfy5cyyfxpck0f9sigi79b9a1d2vc8s3v3hjmcv2ezmsnwhcswnllzt',
                channelComponent: 'xxtc4htwn73qtbyw9p1o9ihauzbk9c3hpz71ogyb0ggzgxobab5pyir9r49ulpm2twn820osxr6i91c32fl74bm8dav6r3qyd2y6x0iyxa40jjx4a7bel4vncw9g6f1aha7xh4wfixcmzmw40y7uelhqiswafq9c',
                channelName: 'v89issycl8aaiw66w7y930nqilx9mypawhty8b3enshnw7mzyi5sqvxv4vbjple8m0s2fpecmbhdygzljbnr25tqgn2p9s92r3tyogzqzwef3qlbsgdmfpy0t7qd9i6i30xo0yqsi7h3f148v9wg8fsc4w04wf4k',
                detail: 'Non magni laborum rerum ex et quibusdam. Sequi recusandae ea quibusdam vitae voluptatum id. Corrupti iure aut explicabo veniam dolore ut dolore. Voluptatem optio sint maxime et quia commodi quibusdam placeat.',
                example: 'h9d292sb1im85nbdyniga2hwmlat3zhd57njxnvl6det6ec71cdzu89j6jcpstrcgei4w1ci64hq5wi0z402rddx2zw3tgdymnknef7cs3nalygbdrubxbmy3t11f3n52d80ybacnq954ovfqq6e6dxovklvrod6',
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
                id: '99d5404c-1667-48d4-b10a-809991f67d6b',
                tenantId: '99dd7bdf-e50d-4e46-9710-3df4cefc6cf2',
                systemId: '9bda5c93-a5db-4631-aa26-9c9d77a8454d',
                systemName: '2nvnjrmr3w6vfc0ny1p7',
                executionId: '5b2c2d78-3728-4ef2-845c-960c83585d67',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 20:25:01',
                
                executionMonitoringEndAt: '2020-07-16 05:27:20',
                status: 'SUCCESSFUL',
                channelId: '3afea616-40f1-4ec5-87cf-84636acb0a49',
                channelParty: 'n12pgi4y2nos8tip3b63myi579807keb7mwfeokk84grvdufw782tfmbvog5avtxe0bvugudvituifosrotbr387tb4wrrje17hmvnmih412rh2rgc6lad5xnwlrvhbgsuzmaqrkkfddmx5zck1e23mamygs0ir9',
                channelComponent: 'zg725upyne1gktbloqcar51x0wuuxi2jd0ifc79240j76eeell6eou2ukwvjw0m64d4gumlpnl148vb6eh22fj2d0p484ags7lyynnx4pm8s00su42b39agduiel6kyvci2i6vbvl5ksosicg01i60j8iy38snoh',
                channelName: '8klg6obz3g0hduhtwfjmnptxf6g4jicwfdgm3xdsb082cleb5e733evcuqxdkgal0hyg7zdd0zjgv6uws6ys57qy6d8m2nfu4xvfs00ybd142468zm992p2p7645orrh8hbvy6r9f2hqiuw5utaiyr29aa9g0mpy',
                detail: 'Sint dolores saepe natus. Quisquam voluptatum consequatur sint est. Occaecati nemo est natus modi ducimus recusandae cumque. Molestiae laboriosam sit et deserunt et saepe.',
                example: 'josx9eeuc8mmqkdq5xvsxa3ht3p0029m03zrq0oku6iikrdnzglbafgf1adu3v6g43kovic30id37zhy0pcu0ai471ilsb3xgdfuranfonvdmw9wblr0zzow4a0qgpspw153sub85ph7jag31pdajw5m0d82f0xl',
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
                id: '99d5404c-1667-48d4-b10a-809991f67d6b',
                tenantId: '99dd7bdf-e50d-4e46-9710-3df4cefc6cf2',
                systemId: '9bda5c93-a5db-4631-aa26-9c9d77a8454d',
                systemName: '6yx7e414pfe2326vsliw',
                executionId: '5b2c2d78-3728-4ef2-845c-960c83585d67',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 04:55:08',
                executionMonitoringStartAt: '2020-07-16 07:08:00',
                executionMonitoringEndAt: null,
                status: 'UNREGISTERED',
                channelId: '3afea616-40f1-4ec5-87cf-84636acb0a49',
                channelParty: '5fi3f1f3diz14nalm5br65j6my1vg99j7dxtewu3sd9klc05wb2txe8c4ejwk00mhe5wurvjul53iqnkw3vd5v70m30r8gvw3a053xq3qmdojglfu0zrdm90ofzo7uti4jo846bdt7nfzfm8n37kambsvrv0gd68',
                channelComponent: 'ps6jw4oklmb2s64577dl9ix3qxl90qvfdgwl7gqx2k4tqpv9oro7p5p8y56ga0kh1h6dfbb3k9a8mv1n7wn7u739n8n35q3e5r7btdjwladnm42im2gigmzbzavp3j28twtjm0hz96857gj1ja9l6h3cmtlde848',
                channelName: 'vhnluqrb7o2r9psro81ul4dry2e6cuijvqk9cks3oqew9p7brpmdd2kuo1yhwzye8lwhkh6anuweolol9maiw4e3e1j025aosqcmecuu7t8aokjvrjicikdjp1r7sqhedzyyttfvveq84vfmkj7l0zelhu9n93p2',
                detail: 'Et qui atque vero amet distinctio perspiciatis sit. Aut ratione corrupti consectetur fugit. Magni voluptatem ut qui et eum eum quibusdam. Est et aut minima et repellendus aperiam quasi hic. Unde ea non aliquam. Corrupti ut quia perspiciatis ab non.',
                example: '9hdd36kc8duu43rthzxzrwdr7bt7yi43we0b2bujgjxcr2grdp9lipnybfcs6wiondqavzr1vmym2pojc7h01nzag3y3gpslm23n3xaxtuy60fjgv76kwsmjeoksj6m9p372bvyxrd5j2zxtht26crvzyr5sbzlx',
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
                id: '99d5404c-1667-48d4-b10a-809991f67d6b',
                tenantId: '99dd7bdf-e50d-4e46-9710-3df4cefc6cf2',
                systemId: '9bda5c93-a5db-4631-aa26-9c9d77a8454d',
                systemName: '3gv57i6ucq8sehbc9j5f',
                executionId: '5b2c2d78-3728-4ef2-845c-960c83585d67',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 09:50:03',
                executionMonitoringStartAt: '2020-07-16 11:38:43',
                
                status: 'UNKNOWN',
                channelId: '3afea616-40f1-4ec5-87cf-84636acb0a49',
                channelParty: '38jgz921ocum4zw02opam279cmgcpdjecufepm0rllvk9pk9creyt9l42bkps0s3kv515lorirww2z4d1kc5vstlu1fn3y0wic6uv7pacyf06086yr5lclkv2ixpvth3xhq57y6w6djfv33k5a2ia8zklg7tx1j2',
                channelComponent: 'olyrh2al47h0wja2uiu7fgr2zovrkfggjg3lqx1mbbcvt6hq46sgph9i4w95eo6cirxvolj3t1knmgnlqvkqcz7zxk0tux23nuvzw1wtngwe5jhwdpdbqz20xgmnrxoklvpgdj00p40bf2hdrtsinm69q4o9hf7a',
                channelName: 'tgx84z33p885fyym19be3t66wvshgy34o1ha4rrkbstn2degkwozdy8dylpmtg3427h34hjgfc16buy7os0jzmi71owhowp1f57m2j06ontv76lf2apwjed3lqg2bxwq22fc431196296n90sy52gxiy1x602qc0',
                detail: 'Occaecati officiis voluptatem quia modi ab. Delectus quibusdam atque. Alias minima ad sequi mollitia unde sed. Optio repellat consequatur repellat suscipit libero et et debitis molestias. Sunt nam a eum eum veritatis laudantium asperiores ipsa ullam.',
                example: 'ju2iti8249yeivmdv3ahnlakhtlpgsdjcce5pmwrrycc1p2yjqqb0dw091aqx90e2002e8wj4slmd0za7sv8ztmmaw19wb26abd63nn4ncb8reb75ckxfzip1xpgv4odxclr1lcrqyxjj46hrvbmnlpi16wauvmu',
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
                id: '99d5404c-1667-48d4-b10a-809991f67d6b',
                tenantId: '99dd7bdf-e50d-4e46-9710-3df4cefc6cf2',
                systemId: '9bda5c93-a5db-4631-aa26-9c9d77a8454d',
                systemName: 'evgdkvfjdescg1y87gsa',
                executionId: '5b2c2d78-3728-4ef2-845c-960c83585d67',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 07:29:17',
                executionMonitoringStartAt: '2020-07-15 21:20:25',
                executionMonitoringEndAt: '2020-07-16 16:17:42',
                status: null,
                channelId: '3afea616-40f1-4ec5-87cf-84636acb0a49',
                channelParty: '0dwao09gr3joqoshbxv5rnlfs6t6kjl5g5g30dea3cqvc6n2wei5lfqzyoascqqrhp7w4g0bm5n6575hs1kk60jm39fqn4pwvwe1jrg4znl4ftekdfetwjlueypxf5w3pu6dzusdt6a87v9goznu0o10ijkn198i',
                channelComponent: 'vdyc3q2k50y2jn8g0dbtlovnd57kec0snw5oeiq7jyal5eews3xp3qylcypzerlflik2pplg4x7n45t2qm7q6103ewpbx1b9i7ojuyhmo000b5pmg2jzddq037zh0f5y69bjftpv56fkxr8eb8wvn47wec7guyg0',
                channelName: 'jpuvd52wlcskjomo6lki8808kq79kzgrbceipjoezkueo9monpmbhtag9fpogzr5wn0rvorn5gqrc22h9ujuvyv5vv30xyeo4cspnacc9epbe7gkrszqrz6mttmuqdnkvqvhxt16m46p68omkexl4vcxhl8d0fwu',
                detail: 'Neque vero non id. Modi debitis quo sunt sed neque et ea repellat. Exercitationem et autem fugiat quas dolore aut commodi qui. Nobis nulla in. Saepe neque earum atque eum atque qui placeat voluptatem.',
                example: '7lnymks5nleihpqbu6gzhhw6ujyyrl2eh6hq1vfdmun0qyyqq5b56iye4cqjdmdlu5xygf0yxeuyg3j5nxjsgwc4n8v0zdara0by2emjjli7gjpevl21jnl5tfehp089ote0yupb87rd2j7q7r24ka0cpyynbrb8',
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
                id: '99d5404c-1667-48d4-b10a-809991f67d6b',
                tenantId: '99dd7bdf-e50d-4e46-9710-3df4cefc6cf2',
                systemId: '9bda5c93-a5db-4631-aa26-9c9d77a8454d',
                systemName: 'lfoxwyau6vs0r51j1cj7',
                executionId: '5b2c2d78-3728-4ef2-845c-960c83585d67',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 00:36:39',
                executionMonitoringStartAt: '2020-07-15 21:38:44',
                executionMonitoringEndAt: '2020-07-16 00:56:13',
                
                channelId: '3afea616-40f1-4ec5-87cf-84636acb0a49',
                channelParty: '5bao745tikw9egmfc8gp00cunvl89lx3ynbb41oee2ee5cgcqw5h5t4cvivtjg4g44pb4spx1oz1gfv6snrxji05fm6e214hdxyal4c7bzafj21rcwaxiyii22trixnjupcas6ezcr2vc1hstltjjz4eba3fdqkt',
                channelComponent: 'ewvzpvv622p0h3rwh59w8ywfqghreu1ccnfdhhc1e9onzd8oyc3edley22994ysx43cgctriae8rve53pisa23yuo8t8e6daxayom8n0yx4zv0fq8a56x8tfliq29wchmd84s3rk3dnrn6h83axhh8lmqnlozsb4',
                channelName: '2neubphby82bd8wlnrj4bsby5287lfcqx68ey1l2fb782mznopiqyd7t2imrbvhk7p5yrzebioc4eg7cw6m3bcltvvxk1utgezggkvng1e87xljghoqa6dbrxr8kcpgycxyswapk3e31bnilfn2qlm95uv7sgufz',
                detail: 'Et officia pariatur voluptatem ea molestiae. Consequatur maiores rem doloribus eum. Nostrum totam quia tempora consequatur provident dolorem neque. Eveniet quaerat dolores quae. Reprehenderit facilis dignissimos culpa et non voluptatem quia eligendi.',
                example: 'aab5qbd0gceq97in51i829xo2lf8tzw2pf4eqqtp0e42b9j1ioud74wanvejykqxfykyx3d2f5l56hprkk78y2goed259h7stcm1g6melpcoez99h7ux3yaqc9affv8xe14n6ab81nnebar3yc3d570xy53sxms5',
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
                id: '99d5404c-1667-48d4-b10a-809991f67d6b',
                tenantId: '99dd7bdf-e50d-4e46-9710-3df4cefc6cf2',
                systemId: '9bda5c93-a5db-4631-aa26-9c9d77a8454d',
                systemName: 'aftgtuh9tcrul68ojxq0',
                executionId: '5b2c2d78-3728-4ef2-845c-960c83585d67',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 14:13:05',
                executionMonitoringStartAt: '2020-07-16 18:36:46',
                executionMonitoringEndAt: '2020-07-16 05:54:43',
                status: 'STOPPED',
                channelId: null,
                channelParty: '5r90bbuwi2abqfzgvo4n1itgglndm4j4exozzkp0dpl4ccsg41gn6tbam91wqc1ktb0nut06xf0ovnz4gjubl6fqjtxlfttunc9tp6kzzxgf4gl0gxg2o5sk20umdcd0gryxtr4iu6kaft039o5dpg9y2ubz9k3u',
                channelComponent: '6yvqjdgwlvinp3si0ovhojdf6f9aecep4tc19ozjsndu8vcvmnlshsoxyodxup8maj327jdpw03incyq8x8ahuujf9p1b3nuiwrbx7wlflhi9kgfynyvbx281zbw6jd667ihyja6lmxzg27bj59t1ksux4qqvjnh',
                channelName: '8yifjl7ttllgcpinz3tjp39fz6a8leh6cdh8trcw2asftnu1oinlnfz46oamotsjasua8syytqebnlejrsvdn0byhqpbouezw7mmgym4yfymvgcddww4lk9uiaduowu3740nl44he489ryc9qexv8k1xtdadex3s',
                detail: 'Et aut aliquid rerum sed quasi. Est nam occaecati est mollitia facere occaecati consequatur modi provident. Saepe sint enim minima culpa error illum ut fugiat dolorem. Asperiores ad nobis.',
                example: 'kgfbhakskp4i5g2opspa8kc0ldic7thwliezetpghzak545k0lkend4qezgrqlr4pjnphkl1xqh29tkc29o12greajoaxukwc5dc3cay9f56k77pb7msk6uabppnzwqvfe3j28md43azpbyrakartdy5c43u1kp6',
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
                id: '99d5404c-1667-48d4-b10a-809991f67d6b',
                tenantId: '99dd7bdf-e50d-4e46-9710-3df4cefc6cf2',
                systemId: '9bda5c93-a5db-4631-aa26-9c9d77a8454d',
                systemName: 'lat7kgn1dh8jqulc374n',
                executionId: '5b2c2d78-3728-4ef2-845c-960c83585d67',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 03:47:35',
                executionMonitoringStartAt: '2020-07-16 12:01:28',
                executionMonitoringEndAt: '2020-07-16 17:23:18',
                status: 'INACTIVE',
                
                channelParty: 'vxidg7e8hvr19w17bdkrd7unaxv87ah49rxauuslvc7lkqgt0272ayoi1j26ttdmkb43fmgqvmmqum8h7j434nswy6088bzckl6ohe1mr8t8j7269fasq8utvl1grlxk3u38gt0jqhtp52jxq4pzl1lfffcahgou',
                channelComponent: 'd8sgucb10c86nhhzwmdufwqkkuvmx4inlcxgqdtn5g8fhvxu7ybhrbf1nbwcm4echhwg7agk8egup5ox6yep6u5fnrqadz19m3x3mm69c94t8nx8c530tgdcg3ny1f0wu9avqwcbq7khc1akg1ybwdcf51vz4ai4',
                channelName: '4cawl7lo7d467sm21sdmtlobl30rohdihjgt682n4vtjgrwba9r7ukw1pecmfrkh27jie5ievnvym4dmjmxt3ligjjdl7r2sr0oe22fnfh1syhwec98el1r8t7je50f35h0or9g8cp8ou7n4ploxhpev24pfjmsm',
                detail: 'Voluptatem est veritatis dolor. Accusantium ea debitis. Perspiciatis in aut. Autem dolore saepe maxime et sit accusantium unde saepe quas. Exercitationem distinctio est molestiae sequi sed. Necessitatibus omnis dolorem sequi dolorum labore qui nihil.',
                example: 'cq04rl770h1m65eehjsvsl77imsiy99sdsr4rk7mq2r1v8j2r1g3qcu14cdkb9rgs1luu82qoe73guesshd1wisehz2j5zn16nbixnj7gu40i4lg9dn7cmat7quqkcadn78omcy0gjye5ab1up75mvfducnfj3mj',
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
                id: '99d5404c-1667-48d4-b10a-809991f67d6b',
                tenantId: '99dd7bdf-e50d-4e46-9710-3df4cefc6cf2',
                systemId: '9bda5c93-a5db-4631-aa26-9c9d77a8454d',
                systemName: 'ldr98tslb7leuxra6s6p',
                executionId: '5b2c2d78-3728-4ef2-845c-960c83585d67',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 11:16:09',
                executionMonitoringStartAt: '2020-07-16 18:02:47',
                executionMonitoringEndAt: '2020-07-16 06:05:44',
                status: 'UNREGISTERED',
                channelId: '3afea616-40f1-4ec5-87cf-84636acb0a49',
                channelParty: 'yan5aakbppqijpkk1b22b8pv8icy2lssem07b86i6fxep65ob6wdvdsk1av4xkjqjt6y0dhcu5fzidsinuay1h326w93wodieb0jmw6gjc8sxzfgeln2ar7z4wmos63qotvg8hkjb0gdwinevlvpmo9ajkj8kfiz',
                channelComponent: null,
                channelName: '7fi6n46iiy1cgn27b4bnrldhkg6joq3y72q0fa1l44ts4ax1wjel0jvmjl3ae4ers18nfsxob9yrfea3i74w2ac97gqmct8213hll47mmfac8tshy4qqt8u9ywz6r8mho5cv8ue13ih425qbo4jvef24f2f0hkgp',
                detail: 'Sed autem magni consequuntur qui ex asperiores. Modi voluptas commodi sunt aliquid blanditiis aliquam eos. Cupiditate eum est totam inventore. Et et in accusamus.',
                example: 'nub2w4ogzlx795lhrecajtdc470qq5w89kpt9izyb6tmbhwjreaeke46dpgzkdfftck0qh6heoruwdn7u5xc8c75u9akuc1g66oscszl19tvwjfipeph463qii5tcenyqc98nbtfm3ltb3igtudgrch18b7u3ttv',
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
                id: '99d5404c-1667-48d4-b10a-809991f67d6b',
                tenantId: '99dd7bdf-e50d-4e46-9710-3df4cefc6cf2',
                systemId: '9bda5c93-a5db-4631-aa26-9c9d77a8454d',
                systemName: 'nkukeevfktlma92486iy',
                executionId: '5b2c2d78-3728-4ef2-845c-960c83585d67',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 10:09:13',
                executionMonitoringStartAt: '2020-07-15 19:26:54',
                executionMonitoringEndAt: '2020-07-15 19:54:44',
                status: 'SUCCESSFUL',
                channelId: '3afea616-40f1-4ec5-87cf-84636acb0a49',
                channelParty: 'iyumbwp4yk1fmk7tnr23k9qeplbbq4lmcjibwos8wu7ol0eo978zvqpiqwjjx28slr0vu49n4gte4hfopkmn0t5hl8y7745mkzpvrzxs45wcbrm4mbbxuayy0jqxvppisvcc4zpmvkxl3uvhsqulm3f35erkm4pk',
                
                channelName: 'g1zjqctebddviepdt5vdra1821c9dp0iqa3etfbhcyl10dp2xollg549s1j3bosnq75nbmfwn7ekyrq2uiaco00rguhw9aw20un2zipewnmyd2il1wz4ase0mplh5hr7p7rk6eldmw4qa9uypeqkgrffcmayr6h9',
                detail: 'Officiis doloremque nulla qui suscipit voluptas velit quo enim. Repellendus tempore rerum enim fugit harum. Quaerat et natus autem facere id labore qui ipsum sit.',
                example: '65mwv3gdor3daf9adr88juhure6rd7pdbjdjg3j7i7q26c00s4nrvay8awruclqfa6omz0710z4h1k1ah7yo1j669atpbaofmkswiz8hfjwz45i847lfrgz0a3sswyydep5t6mjzmlv8yza8xb2njy3r1i9k6omu',
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
                id: '99d5404c-1667-48d4-b10a-809991f67d6b',
                tenantId: '99dd7bdf-e50d-4e46-9710-3df4cefc6cf2',
                systemId: '9bda5c93-a5db-4631-aa26-9c9d77a8454d',
                systemName: 'cnucsyrpxrrfej2nvek7',
                executionId: '5b2c2d78-3728-4ef2-845c-960c83585d67',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 09:26:01',
                executionMonitoringStartAt: '2020-07-16 13:36:56',
                executionMonitoringEndAt: '2020-07-16 15:44:02',
                status: 'INACTIVE',
                channelId: '3afea616-40f1-4ec5-87cf-84636acb0a49',
                channelParty: 'sjrxqnkzlpa4oeoftib6fqnho6y307ofolnlc5ai0ng2wc9joewn0tztihhypechigatfmmca96wdonaxrs6sqm9hm7e17dqfkmob8szwblshc5gd85z5bgzsrv2jv8vaeek8dbukmvadnjz630k6vw20nesx4s0',
                channelComponent: 'amo02pjoayyt198ebvwgadj48y5ti8linvbf2ck9zfz2foixkc4kxl8r2y5zkicvj21v2s9kf5wbwo55isyujy0xgayg2smqt5qnfz61x59xuweallm9cty2046d7dbdifrox2v4nqkgti639azpnehf9aa770wa',
                channelName: null,
                detail: 'Tenetur porro magnam voluptates. Voluptatem ut quibusdam debitis aut. Nisi in reprehenderit. Id laborum voluptatem reiciendis minima dolor.',
                example: 't5sleorkpr3r5c4py3jlrjmqvupwuyz6a18o5x0xizp0rpeaavtmces3dl2vy01qo8fetrlnt2ydes4pog8r8e4ie3j7agy9b6jiso9nrdspp0txjqexm8w7jvislfrvgr4owb835tg7wc97d9h16aiang7jvwkf',
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
                id: '99d5404c-1667-48d4-b10a-809991f67d6b',
                tenantId: '99dd7bdf-e50d-4e46-9710-3df4cefc6cf2',
                systemId: '9bda5c93-a5db-4631-aa26-9c9d77a8454d',
                systemName: 'aa4r8tj5gk33mg9jua8j',
                executionId: '5b2c2d78-3728-4ef2-845c-960c83585d67',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 14:07:19',
                executionMonitoringStartAt: '2020-07-16 09:34:34',
                executionMonitoringEndAt: '2020-07-16 08:51:28',
                status: 'INACTIVE',
                channelId: '3afea616-40f1-4ec5-87cf-84636acb0a49',
                channelParty: 'v7mx9yup0ak7wznqwgb1me35mb3o6km8q8kb9t2suph23esu1haho0qyv8ygz25zw2teee59wjgjp0qx5dh9ppwtv2ceq77v1wcf3uacwnmn7h22jy1a7tcln4hkpkykyyifaz1edolskv6c4a0xdyfgu2xjvpsw',
                channelComponent: '59mutdog6yfcxokft98hui1l812glx7ywt9te1dccurmx0p9b5sx0rloml9gfe96tnzwj19l2k4aces12yyk5hu86as04u337brxhzy2fw7x8qsx0gc2p1sr6v268vw2d1wbz1e723mk8c4s433vrznvntikmb4s',
                
                detail: 'Tempora soluta aperiam assumenda et architecto cumque odio fugiat. Necessitatibus eius sit voluptatem. Et ex neque.',
                example: 'uovsugerlmydq1pmioddcuzodj63y0fn72tlf208q0qqh81ol25r293trrwo2wc85ftnk1voo838fp76nvx0iogvxiwoluzy93slhdixrv5f248jgvrjz98jt9nw8ig3fuk9g6jq2glb158gl6o6b5rvd8yowyfn',
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
                id: 'j50021v2p7qheldlwr1afvqc76memftnny2tp',
                tenantId: '99dd7bdf-e50d-4e46-9710-3df4cefc6cf2',
                systemId: '9bda5c93-a5db-4631-aa26-9c9d77a8454d',
                systemName: 'vf29vorg84egeedsed04',
                executionId: '5b2c2d78-3728-4ef2-845c-960c83585d67',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 18:37:10',
                executionMonitoringStartAt: '2020-07-16 04:03:49',
                executionMonitoringEndAt: '2020-07-16 02:07:24',
                status: 'STOPPED',
                channelId: '3afea616-40f1-4ec5-87cf-84636acb0a49',
                channelParty: 'rd1zyy8glfuz0084xyjn1ckicvd2p1lq9w2bmi01yaaa5fllwlmhhv3timi5foplasycfu8noi3v3luhjwt6rgxwjun6yhfdiatnqj5ts880xcqkjn08jt26ajgw1shbzze0vzaonem957pbbx0ytu7sgyeuokmk',
                channelComponent: 'uap4khjit0cqzqpuuvsawhojp4bgqbo0g7evh49v3vycrpcfth37ni4nm1wgc4qx89iaeyd1ix6nzpvah1xovkvawoeafh5v7sz79yx7qmfz0uxh158py32pvegv8xyyg6weunjfa814pa74q2w5et5mdbjuutoo',
                channelName: 'iyqdju583rbfoi6t5ofslgp295so6pqw7xfxlyft30apo9nkabt5bzsy00jyduzo414h7qh7q1081x81a1kbd1tueu945r2zh79oogqanjcd2qtvlr35s3ihncagc7uiwywr4b8mns2t5at3620slw7aejmzq4lr',
                detail: 'Rerum nesciunt perspiciatis reprehenderit modi qui et vel sed quaerat. Est et consequatur et. Sit soluta consectetur quae mollitia perspiciatis excepturi.',
                example: 'n89xj2kg11debxfz02cdjcymzj9v59qlmj4yg8y7as6metnle4wvdswtwxydg0zoe3yl316119rg4bqd6n31nbd80cbmhumlf6388zomxis7ms9cpyo1x6zyze4nb09xt1y9fj71sh9htf308g0bddb7nnhegmh9',
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
                id: '99d5404c-1667-48d4-b10a-809991f67d6b',
                tenantId: '1r9rp9bxe1fxpjtoflchmqzc1ynlzz1sdxhn3',
                systemId: '9bda5c93-a5db-4631-aa26-9c9d77a8454d',
                systemName: '11pi1vdnh7s00pq0st6o',
                executionId: '5b2c2d78-3728-4ef2-845c-960c83585d67',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 05:00:06',
                executionMonitoringStartAt: '2020-07-15 23:16:23',
                executionMonitoringEndAt: '2020-07-16 11:58:05',
                status: 'SUCCESSFUL',
                channelId: '3afea616-40f1-4ec5-87cf-84636acb0a49',
                channelParty: 'ls6zo3ei6ju5twfp4fj7gg9owy849nwkwmka00xm8n1zb2hoq5z1bqnqnnqr06i6ki1zrk5wwhs1c3bpq5q39gpgvwtr6f96u2ewbozvpjdckwy4i7ubjo1kren06pbumybg35ucthfeep5qqoql3jt533pi3auy',
                channelComponent: 'b9gmiwx83xpud1pm0r2uv98vgtfeoukd1i3n53y2ouxiw4d0qxoluwri0e3m50gq8d2iyhaobhmuohn1rd8d2garugnilz9d5b0ggg8bm4luwrytjswjd5kqnixsgxe0hwaszep85gyzz03q8c1egcufwxtskyy7',
                channelName: '0xb43hz89lpz0fga0v717jpdq53aedpgx8ra6hzjxfjxs4p4pyu9kxaipxyvhvhk2aekrxfh0xqvllab0030b008ui9etmispza7urj4grcywalgkjpfrz2pr5jradawsl69b2cl7ywr523n0xambo0hmf8gslu2',
                detail: 'Tenetur accusantium quo sunt. Accusamus veritatis tempora repellendus aliquid praesentium inventore porro odit. Nisi in qui dolorem voluptatem et. Rerum explicabo tempore et velit.',
                example: 'pvfli40t5f1ijai58nh6jivjv1h9pyk9qcbneor2asdu2a62hg5fiulnaof863qpr3u02mdfpjl8m5hg0orsc7hvwr8a8ayapiz2xgcx1screphr0dgmqun28g57xfni3q2xqm67lefp4qkj8uqp20bfvpx0pz7a',
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
                id: '99d5404c-1667-48d4-b10a-809991f67d6b',
                tenantId: '99dd7bdf-e50d-4e46-9710-3df4cefc6cf2',
                systemId: 'snpap0wqyy2qi17368gos7oht9qtnwfxpmlwl',
                systemName: '4sdiq01eryw6ef7dxij1',
                executionId: '5b2c2d78-3728-4ef2-845c-960c83585d67',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 19:45:50',
                executionMonitoringStartAt: '2020-07-16 08:52:02',
                executionMonitoringEndAt: '2020-07-16 18:03:46',
                status: 'INACTIVE',
                channelId: '3afea616-40f1-4ec5-87cf-84636acb0a49',
                channelParty: 'p9d9p231y19etkg47uff01mjnocemjgap4btfcpsqjes66kb0rm3s7uzuekfgih56r3c8569pp3r25oeo3hwnsju2v4acutyoi3uibli6aozidgtsjg9giosf23bv1a7agxj2sjovv5u79pk9c4flf8plru24gl3',
                channelComponent: 'cg9f93woxfb5teeu7oqmfwh2da7w4m8i1vr2pir7g5jnfuie9dlqc3u2wnvk3pprh1akrhrnpnahseoiy1t5flf3yf3mvc7ehrtb70cb1w1481evtj85tkbn67r050ywwcffztce9qwhtosxiyi8f1kf65iwflc0',
                channelName: 'kwr6zolubipys4jjpjfhrzny7fbou8abu7is253syzhkq0jzrscgqex20evwc4b3rgxn2ft9evuxz7h60oo38wt6avc9pf11jmooyfjdxf1la6ihj7fopwph0t06xgpuar58zbcziaqc0rdntmia2b1zv8jwoxxy',
                detail: 'Sint quas eum deleniti quod vitae omnis. Aliquid tempora qui. Dolorem delectus numquam reiciendis et consequuntur. Voluptatem non deleniti et nemo aliquid omnis consequatur.',
                example: 'm5j1xda1pveytpl8gwoj7jev0h5wso75dx500ocs2dlwnrk0dqbo7eghf9j6jb3u9r7ci2nqc8b9z834hoxitxvzqkxyx4yuld1o9cnjkjmnrjaxtt6s3jhwgbtc16ghlfe4fmkrokd53eao7lbcui9s16ohtiaj',
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
                id: '99d5404c-1667-48d4-b10a-809991f67d6b',
                tenantId: '99dd7bdf-e50d-4e46-9710-3df4cefc6cf2',
                systemId: '9bda5c93-a5db-4631-aa26-9c9d77a8454d',
                systemName: '684ca7vxydm2k7jpdifl',
                executionId: '4wvmtzlsezt62oo0ibe77zbti60oov18aeu5h',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 10:43:00',
                executionMonitoringStartAt: '2020-07-15 21:42:50',
                executionMonitoringEndAt: '2020-07-16 07:05:05',
                status: 'INACTIVE',
                channelId: '3afea616-40f1-4ec5-87cf-84636acb0a49',
                channelParty: '3nrsebiynnrpid6cuj4p4qzu2wz3luikpwtigcjataiq29y6m1ydyybogs43qlet6qxwd85hvg219movynozlfyibhat9wbipuu8oi4ra66zbkmiivrgkm1ig6kfkdd4vhsaud2tb3xws12uvyyvifbq27dbnkho',
                channelComponent: 'imh0nuyz64bg8mzj7k5pavct7upvgipvnxxnrz5s4bbon84du6kj319lfpm324843vyraw5b50mrwoe02ae7qw3ty9iopgzkqrcjff54ik1o9649h28l676zmdvmw5w4q97a9dzyj5hzv1ph62dwso1j971ry8hw',
                channelName: '08mwyb7ptx7fi8obtvk4j5fxuprg5swldukhdr2wcesmc0dxpbun72h1gsn07sl6dvftslkskocys6p6y9dmc80475hxmkid83zx23pta5lrmjrhvfmj7za1a7svpjql7g7qrictowkmnma4d4g9ctms8lfnbjsk',
                detail: 'Sit earum animi est nemo facere assumenda eaque dolor commodi. Dicta voluptatem aliquam fugit voluptates architecto iste. Pariatur inventore mollitia explicabo a et aliquid facilis. Consequatur nam repudiandae praesentium iste alias. Sed omnis neque reiciendis.',
                example: 's2vv2xcum615ru7ptz6sydvs4zdawudwb84vyrolo5o140xqlrths3hi4bnq0sgo23zj5o9x5770m5jskiu2oplr3oei9hugpvnmryd3end8p41vf3fm1vsnl8qphbqs6icz3qstsze9yhr0zdnv7177zxxsqjaw',
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
                id: '99d5404c-1667-48d4-b10a-809991f67d6b',
                tenantId: '99dd7bdf-e50d-4e46-9710-3df4cefc6cf2',
                systemId: '9bda5c93-a5db-4631-aa26-9c9d77a8454d',
                systemName: '70qtsrv392mdpgsaicy0',
                executionId: '5b2c2d78-3728-4ef2-845c-960c83585d67',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 14:35:08',
                executionMonitoringStartAt: '2020-07-16 04:53:54',
                executionMonitoringEndAt: '2020-07-16 16:23:57',
                status: 'INACTIVE',
                channelId: 'u9ft6fmhrxr0sg5hz1hisnoflcu6e4luy34gr',
                channelParty: 'l09jreg6vocy13k44v9dted7hupf02q1e7yaw6e5ia7k5t101ardrlfpax8fltyfv1hhnm6br08uf983htqpre8uf3y45nbyguryy93kwtfa6zexd2rczqml3j4dnyvb12gy95brizymir1qf3hj8w42ox2i3cx9',
                channelComponent: 'qwslcru8qy0eb1vi0s4pt0g1r4xxnoj28lqdgpyprcfv76q5vs8avbc147vejss2ysq1ociu07mwx6phszcliu8x9vi3ejgj26au5v3fikhgezp8ufv5xp4yorabgk9l5pnp9gja5etk3459aukldgz53pzs6ttl',
                channelName: 'r8vgb0kz5q1amy9w5zhrnt8yz25c6grj9r98ooom1q64upcbj8sc2tabpljj352w1rqu2m2sa8lxx55rz39eii0rux18d3k3xn4kpymk3v7u77ftkw8ysz20y70ezvusrnqa8ycdr30939wd3xnuw2ah22y56j6x',
                detail: 'Autem aspernatur tenetur delectus dolor. Dolor laudantium rerum libero iure nostrum sed reiciendis iusto. Est hic molestiae autem magni fugiat eligendi ex dolores itaque. Qui nam optio rerum nobis nihil et vel voluptatem. Inventore dolorem odio atque in pariatur quos quia unde. Rerum nesciunt voluptatem nobis quia magni rerum.',
                example: 'mw9vwfizw4ssywfj1ddonfeufrhp6h7navpusej2r66cd0pwuov3ektikwcs6y9pozpmtm9gggzr7mj0unwdw7fuhmsy56cyhr37h0uicbte9jbxfeybt6y61yp0ew214z2ph9kd9f5vm9aiione202pzo88tui6',
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
                id: '99d5404c-1667-48d4-b10a-809991f67d6b',
                tenantId: '99dd7bdf-e50d-4e46-9710-3df4cefc6cf2',
                systemId: '9bda5c93-a5db-4631-aa26-9c9d77a8454d',
                systemName: 'szmev3zzqsa2nc69ml14u',
                executionId: '5b2c2d78-3728-4ef2-845c-960c83585d67',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 23:00:17',
                executionMonitoringStartAt: '2020-07-16 05:28:20',
                executionMonitoringEndAt: '2020-07-16 07:34:10',
                status: 'SUCCESSFUL',
                channelId: '3afea616-40f1-4ec5-87cf-84636acb0a49',
                channelParty: '716ewbatp25fgth90ajydnwbtecqka5gavtb0clrxvue4lmgrflpwzhufquqxv5z3lmzt5x847uhwgys3kcox07zdf30gizu74oynfewlkju1fu91btqpseb6tlndxgmtguwbos7f5kk4utoxjjhkc5jn236opwx',
                channelComponent: 'lflwdedk5kevfv4bdu0yxxloon41d7i8nttoyb03vb61kh6v01ldlfe5ur5he886wyhf2l65zzex0nhxl98oe0u2iqvlqpymdwanpnq54y8o2364fgnvptunxxvstx4wvzw3y4y1bqw49on4erxg229o28g4ouv7',
                channelName: 'arv5cf10agpydk6drejqipdvf6byevy48tmi513xdff0y4x89dd8r2rrbgse5qn9zel7omi9o351u0keinf5rrvww2devoqqo0gxwv7m76mhsidpfh1oylpq07jooafyt5mjcopyhjo6jivd9kcmbu03wgoxuana',
                detail: 'Eos tempora iste explicabo provident. Accusantium adipisci et. Est dolores voluptas at omnis. Necessitatibus placeat temporibus molestiae deleniti error modi. Magni quam et quis corporis voluptatum consequatur. Eaque minima nam iusto sit.',
                example: '2ppmxg8suncl3uuza1lu4j6sgg4nvgwv53sum7m3uhw13pcvjeafsnh2eimbt59349rr3z4ryzopgsfyzron5qqgwscuww2luv9thqzufm25vsqpaa5ejdnnla05h0bhwv7fdsg41ahztdk1dwgljpf19qqcvfkg',
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
                id: '99d5404c-1667-48d4-b10a-809991f67d6b',
                tenantId: '99dd7bdf-e50d-4e46-9710-3df4cefc6cf2',
                systemId: '9bda5c93-a5db-4631-aa26-9c9d77a8454d',
                systemName: '4xnqev2zh3gx5m87phkm',
                executionId: '5b2c2d78-3728-4ef2-845c-960c83585d67',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 03:07:28',
                executionMonitoringStartAt: '2020-07-16 03:48:42',
                executionMonitoringEndAt: '2020-07-16 13:19:27',
                status: 'INACTIVE',
                channelId: '3afea616-40f1-4ec5-87cf-84636acb0a49',
                channelParty: '40c52h2esddkexf721jgihl6u3vw0f75gpxcr0hgtfhanfp5ddepalpjanr0n491xjrb29u7epdw19f3qhb3m22wnosjwm9dz8nwmcrt4xr6lp44gqvfxvjkri1wo58vku2igcpt0d117hly34ymuakdvvkiyz1ut',
                channelComponent: 'tdgv0k3klpqxx8v2ipkvr6q5fehbybt09y31vaj7xfj8zugux2s64tqjkb9jkrcdhrgf89kl96a1j4ell2xzzhqihfui9g36smxs8atf3qdgstq1lalc1s2zy99d54pxbnhbo4l8zqlm2bc9dru3hzcvvkgtf9y7',
                channelName: 'u3x2scnlbp7qdgz9vm2yivll0dfebe0dxfoqmw54qu39qt06k219aod9fbni2o9losrs7b0q26lga4wsp8eawdb2z1ylwx61t7x8ohgle6lklv3l8itdf2y2guwpcavvit9kd741eejx46bmm357tikdifcvflng',
                detail: 'Beatae dolor voluptates dicta sit iure numquam adipisci enim qui. Qui voluptas qui omnis facilis saepe distinctio accusantium dolores. Non voluptatem velit laudantium sint est. Velit qui molestiae provident tempore vel excepturi animi aut. Aliquid explicabo eius quia fugit qui dolores ullam quia vitae.',
                example: 's9m22karlzhp4dmv07ei9i7tcheuzzioezvsk87ovk1286hbsi320vvply8dwo4x9hdc0iuza3s46due68pwo4zhni9i1260c9dlc6h6dba2w9cu5f9hf8qs7fzzxtvxybqohl9oolc8bic2sui03luhpr8kg43l',
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
                id: '99d5404c-1667-48d4-b10a-809991f67d6b',
                tenantId: '99dd7bdf-e50d-4e46-9710-3df4cefc6cf2',
                systemId: '9bda5c93-a5db-4631-aa26-9c9d77a8454d',
                systemName: 'eygdp7rysjaej4up5ou8',
                executionId: '5b2c2d78-3728-4ef2-845c-960c83585d67',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 23:47:22',
                executionMonitoringStartAt: '2020-07-16 03:25:39',
                executionMonitoringEndAt: '2020-07-16 14:25:40',
                status: 'STOPPED',
                channelId: '3afea616-40f1-4ec5-87cf-84636acb0a49',
                channelParty: '8d50x4cum0axwnduyr29ikk21knm1pv9qy6strrkomrxu1oeqg67d6s8vks5otfhk885t2q6766lsfzkyltdos51y9pwl6ucfz6pziqrsmziac6i110f8deu6ojpt6rpgedbher2wxqbu6po2863z0e4yfrdls5n',
                channelComponent: 'xxeimqmu2o7hgr0cwfmbw6sk1rq0ue75o44h2is3o20aavuvkvic1ucqxjqelu70o4scekorj35ppgif07gkb2kfzv87bve068zpme3rbzexv48nbs1e8hx4d18j9cekdvquei0yhdoqdujriqiqdfo9xxt91da2i',
                channelName: '5f6oyjc8d6b12cetpwd3bf8fi7rr3bwzds5v6qo699wgc2pxq2blbqcz80bya8tpem9maaz89i1b0az5qhm99saxmjzjz0g7ozbnbcs4bgx12sml8lmrgeo4249tcnu4lsyrsqunm87zuhzz9rhcj9downehbgmw',
                detail: 'Eligendi provident eaque reprehenderit qui est ipsum in reiciendis neque. Eveniet enim excepturi. Consequatur deserunt et quia repellendus. Commodi dolorem labore blanditiis assumenda voluptatum dignissimos incidunt odit. Ut rem voluptatem qui enim quisquam aut est quisquam. Quaerat omnis quisquam quia rerum et.',
                example: 'yvnhj9pu6et73tc852l3hll5aax74pnd2fygx2iweypnsbkj35raxp1nr3tzglosr6bqncbm4t61n7uvt4zqg513mgibkmhwtdxoc6oaarxcv1rkg2b2cnxad0q5hp23oybphdjpcphrac3ly2vimcq39gc1gf3t',
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
                id: '99d5404c-1667-48d4-b10a-809991f67d6b',
                tenantId: '99dd7bdf-e50d-4e46-9710-3df4cefc6cf2',
                systemId: '9bda5c93-a5db-4631-aa26-9c9d77a8454d',
                systemName: 'wmw10lu7dme07rfcnkec',
                executionId: '5b2c2d78-3728-4ef2-845c-960c83585d67',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 05:49:20',
                executionMonitoringStartAt: '2020-07-16 01:04:51',
                executionMonitoringEndAt: '2020-07-16 05:27:42',
                status: 'UNREGISTERED',
                channelId: '3afea616-40f1-4ec5-87cf-84636acb0a49',
                channelParty: 'h1ifpvt4uqmbx2yggqezbp5ql52die38kq8iuo0o11p4gejv1xhf8mf1troyhtgah2xvbyt81jd6zipoc7jdfsmd7xlcjfjkno5idgipv67gtxf735issycjzw85fwvmhm7kipuyfpcfxdwraiwj2w6cyo35ncrt',
                channelComponent: 'c1xrn117npltpkurfk50eqlukfpylmo6rtjfbnzxb2irvwsy9304qf4npvnfai254ccfruyjnc89bqhospj4wzftcsc1vh8lmcl6malte65iixuavo1r5486z5v9bhgu17cutnuenjdrhavacmh2dxbdqnvf6de4',
                channelName: 'ka1nntfzhrlp5dxvwfj7k2btgwrbxvs8ifjcuehddqniqepwe0xfnhua701yym8qfhydid7jnc3sib1my6dzcfoul9bo1e72pdpc15p5lc6wr0ufrdp8ydz54yg8ds4d16v0lprxglrtxyk1lk06c83ebws830nal',
                detail: 'Aliquam beatae magnam. Nihil autem ratione quia quidem officiis laboriosam quia. Blanditiis rerum et enim officia nesciunt modi. Rem et consequuntur laudantium ut molestiae mollitia. Consectetur nobis ipsum similique officia fugit dolorem et dolore.',
                example: 'c4epukxbkd5aro6hosaqrk203mb7pql6iz3txfchotethvq8mqcu67ajecjqn4v8vpww0nrwr6o0ioymh455s62j1esopz2mx39vd033rvnys7gch2hxalmbphsuvoz338u9j43ux4myr1o6vdg9s7nqmdqgiond',
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
                id: '99d5404c-1667-48d4-b10a-809991f67d6b',
                tenantId: '99dd7bdf-e50d-4e46-9710-3df4cefc6cf2',
                systemId: '9bda5c93-a5db-4631-aa26-9c9d77a8454d',
                systemName: '991gtnfb6242t8y5zvmw',
                executionId: '5b2c2d78-3728-4ef2-845c-960c83585d67',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 14:46:57',
                executionMonitoringStartAt: '2020-07-15 22:12:52',
                executionMonitoringEndAt: '2020-07-16 04:38:29',
                status: 'STOPPED',
                channelId: '3afea616-40f1-4ec5-87cf-84636acb0a49',
                channelParty: 'kha0ndu8wmygs3t60s7oeds5gxhsjt2wkxz5gtfzvb55a8jqaqgc228a40660x87kqnpu5nt0t01kwuefuh1gvrjw18hqekk64rrae7jeeat5ejfxcdan2si5sfui00ke8nyppytoxvf83s6fstmj8dmqdvla199',
                channelComponent: 'cnfmqv2y7gipx9gptpavgd5uq1jsnq1n1b6bjonmzt28sox3od9iskwzmy0gsdlcyu5htxtcbtnfxxfp1qfwxsarjfrj7r1lycnjo0yyx9pz93pk0ugmjl4d7127mrgzjwgx8aptqoch0jny9p7gjmwazostwhwo',
                channelName: 'c9iac1h68m9jya9ck95zevvcccapu7ne57h4o2nqpp4zr8qcantaxiktkivlhu6q9y17mvbwsyphbji9thhnsrmvra3tr7jw4q0q75mwm0sk119hu4wkrj8bkb06bhw9rdinfr34g60jf9bqs2k0o5dklu54isf3',
                detail: 'Autem vel sunt qui et modi. Dolor dicta fugiat. Voluptas assumenda ut neque quo sunt qui.',
                example: 'j9aw59jj2tu4swkfbe3ybfooykms05mpvu2kcny0npcojl2jj388w9zgmyyq3i8rmtbfsaj9lit867zz1bl19hfjima7t61w2omwa9ih5uoi4sd1g0hh1mjchjpnhiiel3qlbmbd1yhg6z2fimp3q3jh64r55jqkl',
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
                id: '99d5404c-1667-48d4-b10a-809991f67d6b',
                tenantId: '99dd7bdf-e50d-4e46-9710-3df4cefc6cf2',
                systemId: '9bda5c93-a5db-4631-aa26-9c9d77a8454d',
                systemName: 'c9hr3uiwfkg3x89966ik',
                executionId: '5b2c2d78-3728-4ef2-845c-960c83585d67',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-15 21:17:08',
                executionMonitoringStartAt: '2020-07-16 05:39:24',
                executionMonitoringEndAt: '2020-07-16 01:30:32',
                status: 'STOPPED',
                channelId: '3afea616-40f1-4ec5-87cf-84636acb0a49',
                channelParty: '5g0itfuaf4620k6fyakx4y4ka4xbf15853dmnco2en35oi4jet6a442kdz168k879bm2z4ak6am69g4pzskij3zb6378j60tvvb0g9hccuw7k97kwp3fy2st3hrvkd4swz0w7fdlzyx15dixg8ulm9mitiar7q1w',
                channelComponent: '2kx3f6bvn99y0542bgy1faeu6gdu8xwe5i4ft84t3c36gac00s4qqrr5v2v4dwjrhrxajnphio0iid6013nqsk40y7p728m3db5wjgsuot0v7bhcrb2q1pwzbvq9frrct22cos61elkungb2rp28ey2q4pes2uui',
                channelName: 'a8zu5fado0a8hdzvkmiyzzj8lk6t9vxp4npzj9le1sgt363b3936nbpvbklkxqqpi3zs8hnhvn1qieeuk04xpfk7sdz4bpvu49h23h9smnub0ca3138ywv66799xvccu26nmlg7skhjlmdhn2mm20uooc4przdik',
                detail: 'Dolorem optio et incidunt rerum commodi rerum voluptas sit tempore. Aut numquam omnis impedit velit sint quis. Aut sequi quasi unde libero. Nulla et fugit quas. Quasi optio est repudiandae illum atque temporibus qui vel. Cumque rerum soluta et optio reprehenderit.',
                example: 'at373w7bf1vq7qcrnrdfiyeleoo0z9399lpfruflbftm0twwdyh6edlc7m4zom936uczp68a75jr6l59fhltmva2t2nfu3w3oak0khxobtywhzz8dfb7qlxcmx1nnzzbgnesv7uhfcrryuvj0adaorwubwglp0ru',
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
                id: '99d5404c-1667-48d4-b10a-809991f67d6b',
                tenantId: '99dd7bdf-e50d-4e46-9710-3df4cefc6cf2',
                systemId: '9bda5c93-a5db-4631-aa26-9c9d77a8454d',
                systemName: 'v774pdsxqisvl9mha0fa',
                executionId: '5b2c2d78-3728-4ef2-845c-960c83585d67',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 01:36:13',
                executionMonitoringStartAt: '2020-07-16 00:16:01',
                executionMonitoringEndAt: '2020-07-16 12:32:41',
                status: 'XXXX',
                channelId: '3afea616-40f1-4ec5-87cf-84636acb0a49',
                channelParty: 'gc0ietz3mfuswpxg85fxxnj82ux5icxcti316kpxa35cxhwlp594aiwilgucekmuv1sgr9wm8fu5a4jjrau3vy6dmm28m21j5azh4pntyguvqmdzw3qp0sihiqx59k4j39wjrop359zv5ex8815er62cdizbqk3p',
                channelComponent: 'eqwqcromatjad2047gn955yjk4m1fqmb6eyiajhye0mpi8x49vjg6cd12pz20esx0fpvbj4rrxvgy0255kdqw9ojjqfvwudv6scjy40f45q47iq1r67otzmzkw1mekxr921zqyk39nuhg5n27eql22uavgma0z5j',
                channelName: 'wack7vecmdoai13q6ixhvbtnrqsg2xc12d1q277sl4fa4y5nu3sfvk1k6tiarea1ro0lx09xsmk9n9jh8prz68mosidq7okbloe9znsj35bo4wg6b8luy0yf9naqlo7lm52huxlyuwblermrm1am1bzjcfkxerux',
                detail: 'Laudantium vel consequatur. Cumque assumenda accusantium nemo animi labore provident velit voluptates. Accusamus cum nam et saepe. Voluptas doloribus id illum voluptas accusantium velit eius. Corrupti quis quia sit tempore eius.',
                example: '0wuod8qzk09cn6bzt55yed0lcupq1odinmyx1s0c6nd3whqnmkrh35vjgs6ia2g41fny5cfp7ttusa1nnsq6cl1lc6p1si6mjbru9ilrthwvrwsgr42l4ottqhlc1m3vwclpywftketux4qnu5fj0szpwnvd2xm6',
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
                id: '99d5404c-1667-48d4-b10a-809991f67d6b',
                tenantId: '99dd7bdf-e50d-4e46-9710-3df4cefc6cf2',
                systemId: '9bda5c93-a5db-4631-aa26-9c9d77a8454d',
                systemName: 'lqx2ozb8od6wk40r5oow',
                executionId: '5b2c2d78-3728-4ef2-845c-960c83585d67',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-16 01:42:27',
                executionMonitoringEndAt: '2020-07-16 09:22:14',
                status: 'UNKNOWN',
                channelId: '3afea616-40f1-4ec5-87cf-84636acb0a49',
                channelParty: 'd0m9sbtlw921rkth22du0e9wtt4rclqfwy37hzmecpswfkoz5w2x84syjx1apt3qmust7jrrd197y9no27d34jy032f9elsbntk0r2lxrn4cwig9szxsh3wd8qu1lyikgeee502yimeyx160k9d9cxpckyj7b337',
                channelComponent: '80im94vnw7iega5pf62xqfhf1k4vpwa3eqjjkm5k9ubaotp7f05uvq1srf99w8s35xjnd6cle21sm0oizzfhxyijm9ghi32onc0cq7svxtns7p5a6219vwspetdn6hbi5j4p9awcx3iqcjqtm8y7zv5vwj7e9g19',
                channelName: 'eelwjqiwk73th6oqno9qr86m4976ix7c9nj9gjssy3pg39ddhou02z4vpksj9xlcxtpjdvygn8zumdkyrptjc06peub36upe5ljx11fhc8uip8gy6e2pvwg5y1ik5v861gxw83dje1whll7cp46ddzfbfqfglptg',
                detail: 'Amet ut consequatur quia facilis optio aspernatur. Voluptate porro molestiae et. Dolor et perspiciatis similique est et molestiae et rerum dolores. Voluptatem illo rerum est sequi quis unde pariatur. Explicabo sed aliquam voluptatem est voluptatem tenetur quia et. Ducimus accusantium ut repudiandae.',
                example: '8pd0npdny2yqjg2u689aknmfduthh0eva9mx9qg5op12elywmnbkc0qkok4f65c70w3n9mvijxx0dafrocbgh5qpsqsy90b4v2dl2qoh17xz9lcu9occ415bnpj1adiutm5j1t29e953qog5al3u10abexy5ccbl',
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
                id: '99d5404c-1667-48d4-b10a-809991f67d6b',
                tenantId: '99dd7bdf-e50d-4e46-9710-3df4cefc6cf2',
                systemId: '9bda5c93-a5db-4631-aa26-9c9d77a8454d',
                systemName: 'x89ym1zztymrbijke4j1',
                executionId: '5b2c2d78-3728-4ef2-845c-960c83585d67',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 05:16:58',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-16 11:33:44',
                status: 'STOPPED',
                channelId: '3afea616-40f1-4ec5-87cf-84636acb0a49',
                channelParty: '9x5d1gryvgf0yuwjayuhci1hweyqraiv114jvi31eq9c655dazyotz1v0pmh8ys865nh4orfdo7lu2nr1flb90c5ndhlxnqxeuy9b7x85nwgghol2x5zyk3mox5zpp925x5qbjqqthm53m4sldqjlzu650r9izxw',
                channelComponent: '9zk8sg48pmbmio68r368k6bop97ir2lsqmhdcm314n2ql5sl2ww6ps017sdwl2mbbm2u6u7yn5dutu6s2ca4te43u6j2ekyvwb5dl26wnw899byt2htcfi8qtjtaxmrsn1x9jl05alf8aujj2eizidik6dwd2uyi',
                channelName: 'pd0hi24kpge0gash19raggasbtolr40i7iheg0wy2vzr46ow89l69dp05gaxtb56cocshqwm3dn9ehed4qblzmav0a5l2ik2p4bpy6wege74wryrwodk1i6r1vjvhamsvj92rf00z84yyogjxpx1jxbtyxvszyzl',
                detail: 'Consequuntur corporis quam soluta incidunt. Perferendis corrupti rerum qui ut labore sunt. Velit eveniet consequatur perferendis doloribus quia. Laudantium quasi mollitia possimus non. Saepe rerum quidem ea tempore aliquam. Quas hic molestiae animi dolorem voluptates consequatur.',
                example: '11tg76qz06fxb28xerqz8bbgbi28lh5wv31o4rve11k770qodczrht0amv84klb0lgbphjli770ds9jfyxyxyzaf171j3r2lcv5farv5t722plqacpjdz6ntqn8rkmipbc4nbzd4h5rea3wxt5aepa94z85nsve8',
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
                id: '99d5404c-1667-48d4-b10a-809991f67d6b',
                tenantId: '99dd7bdf-e50d-4e46-9710-3df4cefc6cf2',
                systemId: '9bda5c93-a5db-4631-aa26-9c9d77a8454d',
                systemName: 'bqw2cr7euhd1mbwd2tej',
                executionId: '5b2c2d78-3728-4ef2-845c-960c83585d67',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 17:48:52',
                executionMonitoringStartAt: '2020-07-16 03:34:23',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'INACTIVE',
                channelId: '3afea616-40f1-4ec5-87cf-84636acb0a49',
                channelParty: '6pbovkpjwsidzbhdx9tf53cc07qxnwg6z9inesivg9xwb8s4ehew3lwmfb8i73g9aj30c92hfixh333knff9gohlg1h5akarsapxmskw6lmmowof6udt1yhpsyd7gl3z48o29etay4cvy765yy7z09xqrmo0ic4u',
                channelComponent: 'je6cuv2rmsjxgca7nj2r2se8d5egryoybgug9dymvqkbz6a1noeqmefitd8mehk6fm6zgm79ocg0j7nna2k9npehqtx7hso9doh5h9bb3sfqzvg0594tskau39d8knqymz41mdgkvaf7zjusqzl36vhpqtem6zmh',
                channelName: 'cz8182ct1qw6zcl1y4p7fz775x06p5rv98ho7ozqujlu54blrs21oyzb8zt5vvl50xbpaavc2e2byebpmkr32hgldz8494rkbnxd9lanlui3yqve06xonahlwa6jr1eja6nz3fb9rbe55c24evecidul94eq4yvr',
                detail: 'Error dolor et sed omnis qui quia aperiam soluta eos. Non doloribus accusantium est ullam excepturi qui velit saepe. Nisi cum consequatur tenetur sunt quaerat quis suscipit ut nemo. Qui aspernatur incidunt et exercitationem aut. Dicta nihil impedit asperiores magnam rerum voluptatibus aliquam labore veniam.',
                example: 'oriprucs8chp6mm9iw9r85kl71i3342rrourme45cdqdmo30kwrcbqxg4qkauhs9fg1lvez2bws3eot2mhnvd47jvon65qcs4oykn20yjh9vc2v7ynu5ye1rg0e9mahqhuhwqctne9tv76xaaezkj04bgm8edaav',
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
                id: '99d5404c-1667-48d4-b10a-809991f67d6b',
                tenantId: '99dd7bdf-e50d-4e46-9710-3df4cefc6cf2',
                systemId: '9bda5c93-a5db-4631-aa26-9c9d77a8454d',
                systemName: '4ntaqf0zxhmqjifcyfa6',
                executionId: '5b2c2d78-3728-4ef2-845c-960c83585d67',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 01:36:50',
                executionMonitoringStartAt: '2020-07-16 05:16:20',
                executionMonitoringEndAt: '2020-07-16 17:05:23',
                status: 'SUCCESSFUL',
                channelId: '3afea616-40f1-4ec5-87cf-84636acb0a49',
                channelParty: '73qjm8izpm1571ehe0g3r3oohk5yo7i1tlmf1dre2hglomxyn1dtj5zljtp3w9jctmblyrkpj989oo8e3zq945y1znxv9vu6f98n0helkijh8tfz2qjkh2x3fqfidgo8jhecigimz4q0gcv6pahticugumzeodn0',
                channelComponent: 'weuiwdme5plutlvez2qkatpziu65onzayutdhuxfpps73o4j3ivj0pd3ac0j4p4nk3xm409285hntzctmcz99k7wt6hm5b2aact5icfrbekg3q3zydyvtajqkydjlyghmv2qrui9wdv1q6eeksju44o1zv29vr93',
                channelName: 'gd13l0ushpztav7j4icm5lo5v2gyndi46kjwwbywv2ulvaw51so0jrxlbw87wfuv20qup00c2xsh5n7k03lnbocxvn7cakpc6r3e09jebzged1x96kid0nyl1f61wwyorlu3fauzfly10qvd8go1fcppylfpvu2y',
                detail: 'Omnis ipsam soluta aperiam quos perferendis consectetur velit incidunt ducimus. Et dolorem necessitatibus. Ducimus quas assumenda rem.',
                example: 'c3gdqno1bv8nfszyf7j0lxprpaiaj4dcry6ndky251slf27b5iyi9k1b8vs8krrjax2q9gkk2y90tfyjspfqriihe7z286idskq9mcwp2do3qlnbxb1yb120qhl8nacovrfdgp30edxj7ote23phyr7u3zeun4f0',
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
                        value   : '99d5404c-1667-48d4-b10a-809991f67d6b'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '99d5404c-1667-48d4-b10a-809991f67d6b'));
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
            .get('/bplus-it-sappi/channel-detail/99d5404c-1667-48d4-b10a-809991f67d6b')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '99d5404c-1667-48d4-b10a-809991f67d6b'));
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
                
                id: 'd84e82d7-54a7-47fa-9571-5cc11063795f',
                tenantId: 'f11ad968-3fd9-441a-b11d-8fbbe741b523',
                systemId: '8440b088-0e8a-4a23-bc0e-325b067cbdd5',
                systemName: 'z994560tcjvxtoqoyow1',
                executionId: '734ac3a5-5b61-4e61-a7af-511630dff78d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 01:42:16',
                executionMonitoringStartAt: '2020-07-15 23:10:30',
                executionMonitoringEndAt: '2020-07-15 19:21:35',
                status: 'INACTIVE',
                channelId: 'f18f597c-e739-4d3d-8aef-c6dcc7501dd3',
                channelParty: 'nkkxh54xn2uj863pjvia18hyziggbqg9wo0xj4cer1zbtu5e9mtlr7fy64v2qr4tpp5aeooot2tglsnivkhsdqre39k1ym4kfbiqb8ae6089rwkvrwgqnnabq5dgw9p4g5wm3nd45spev5n1e29bk1bjuos3oy0i',
                channelComponent: 'vh5snwx52zmcxunat00gub3ak0giwhbegkwo4tdvqu445rtmxxqodtywjsd0m4v16easglntdvgpk75zbu36ps5e090snp07ozzx8cemcxyt7q0ypo6vycvy27wy5t6c9skds2glhvbzpj6oatu4fngxxya18qo7',
                channelName: 'mrp16bqav510njo43xrnffylmy31twxxuvpenv9we134p8mw57za9p9e5gg1ehxvvm21wzr0p1xxz0xuom17wirvuq0hqitrrutn194nq38ua6ywcbsgos0w517osalmzhq4q9gi1ourdz4a1ewwyo5ygtlln5rs',
                detail: 'Sed provident et accusantium facilis quam. Totam hic minima ipsa ab. Et aperiam repellat consequuntur.',
                example: 'lf88ukz9hvn9rdew12kfjjx2cihcq81qqozjkcxvxvg6ny482kp4i1217z1qxegkiutvpmwkn4vuuiiw16b41v5qwve89k2k676qvhl1y2dv8v174lat8cwzidl44zpvktih6pcmw3p4lgy51u6kvi4c2qm5tqei',
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/channel-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '99d5404c-1667-48d4-b10a-809991f67d6b',
                tenantId: '99dd7bdf-e50d-4e46-9710-3df4cefc6cf2',
                systemId: '9bda5c93-a5db-4631-aa26-9c9d77a8454d',
                systemName: 'kqk4kzywxw9pymw5nuk1',
                executionId: '5b2c2d78-3728-4ef2-845c-960c83585d67',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 14:31:07',
                executionMonitoringStartAt: '2020-07-15 21:38:17',
                executionMonitoringEndAt: '2020-07-16 12:01:15',
                status: 'INACTIVE',
                channelId: '3afea616-40f1-4ec5-87cf-84636acb0a49',
                channelParty: 'tohbl76z769yoavaqhc5c91wu97rnkyr2mjfjg10duxpberagjk61ykd1ejll9wq08ly5txln5t1vu99omizlgfo3p7ev5m0xweb33v54uqgs6hn40ws0dr6v27sfkguzagfdbx50ew0wiem56le9rv29rgp5vcp',
                channelComponent: 'kqhw1gj4zuie9ci27qjk2hfj5w9yckpc4xc6ohtwzggh9l6yqf2olenontl5k7g2c8b12pe67tv7zgce3xab23i3w6gyyyg1p1rzqz7w1qo2npbo3504atz4art3s54kkfeiurmbv8cqgx6w3z9bwldths35if2o',
                channelName: 'vuvpwtjs8246gaokuk5thg8n76pfmo7athzevtang77n4ha3hz3xhhentemg8jwjhwz516k9juu9fc7vfb44mzrzl4ntvioaona8s0z3ti24n1om8aztciycsnqh5oqzszu3qvzf3a9zmuj248xd08uhmr8zvg35',
                detail: 'Ullam rerum delectus qui accusamus ipsam minus quia dolor consequatur. Magni enim ut voluptas ratione fugit qui temporibus ex. Rerum voluptates sint et voluptatem. Neque neque et sed id maxime asperiores.',
                example: '2b64of7cra6xqjb2tz4b02lp1pqc6kg8a69eqq6xw7cxb7ph8f4wuvrf6vvnorjqklf1rjpk3of53zbao25xlgw7zo0nj91l5e67zlt7zuxx2xjgof1j4pgfv87ecg155cee37dk9fba1h0lvitl4vaxiy1oky3c',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '99d5404c-1667-48d4-b10a-809991f67d6b'));
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
            .delete('/bplus-it-sappi/channel-detail/99d5404c-1667-48d4-b10a-809991f67d6b')
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
                        id: '42985cb3-fd0f-4fcb-8624-21dadf1dfbf5',
                        tenantId: '99dd7bdf-e50d-4e46-9710-3df4cefc6cf2',
                        systemId: '9bda5c93-a5db-4631-aa26-9c9d77a8454d',
                        systemName: 'klrj0adze5b6cgess72k',
                        executionId: '5b2c2d78-3728-4ef2-845c-960c83585d67',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-16 12:01:18',
                        executionMonitoringStartAt: '2020-07-15 22:15:09',
                        executionMonitoringEndAt: '2020-07-16 10:39:42',
                        status: 'SUCCESSFUL',
                        channelId: '3afea616-40f1-4ec5-87cf-84636acb0a49',
                        channelParty: 'dsobdaovx2v673gje0y0cvnao23jm6r3z722hbkhu74f9v4q9ca1tgusacr02j23igdlqz2qrwvcuvcltxo2q9d3teauygehrwwx76cgmxc16h1bulxxxhhypv1g8dh1kri9ylsgk4teikk5jl1plie57occz71c',
                        channelComponent: 'j5h3y2oa1rgh9uolx4ahv3xaailzrsekzltx5fezdhq8pyx30tsexnh5aybe035xd5kaetfzxw7w1b9mch82w0ci3xsmqkaq14a2klhewg9km7gf84c6ym1cm27pead1w4a5tt6wd0mhozn5jnx4z8hlxinz4mv1',
                        channelName: 'nnwnytmxevfm2v1ro2irrp0xily3lokqa00dmjka0tl96sazx42o10brn9ap16q98ojrdmjhjxrrjbcev1a9uslatvkey5baevvxbjgrcrbc1rjo9znpxpmerkqat5e9ayzpxfua378rlt4w8adjig1bqrycfl6q',
                        detail: 'Maiores nulla et molestias eum. Aut consequatur occaecati qui dolore voluptatibus minima. Id fugit omnis dolor sit harum et magni excepturi voluptas.',
                        example: '759mclg06q4fglgqy5n23ww482cep4t0w12374bx513nt65h0qnm6085cnahwo5qjqcz2qgl1jntlzf4yjmqszhcmstvs50cny9bzdqnz5fto4qtuccyaufhz8ntstgweu9pol3j40e4cx4ijeby25699y8ix2bk',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannelDetail).toHaveProperty('id', '42985cb3-fd0f-4fcb-8624-21dadf1dfbf5');
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
                            value   : '99d5404c-1667-48d4-b10a-809991f67d6b'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelDetail.id).toStrictEqual('99d5404c-1667-48d4-b10a-809991f67d6b');
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
                    id: '99d5404c-1667-48d4-b10a-809991f67d6b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelDetailById.id).toStrictEqual('99d5404c-1667-48d4-b10a-809991f67d6b');
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
                        
                        id: '36f7128c-fdc6-4248-a5d3-7a766c6b75a3',
                        tenantId: 'e6d557e7-896d-4066-946a-47e5f8d1a919',
                        systemId: '3bfb7ad5-24f6-4c60-9ef6-25379db692db',
                        systemName: 'r7s37s4fx0v7x2w5sqjw',
                        executionId: 'c653a70c-31ef-4730-a5e5-d8a9b396a68c',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-16 11:56:26',
                        executionMonitoringStartAt: '2020-07-16 04:53:03',
                        executionMonitoringEndAt: '2020-07-16 11:54:16',
                        status: 'INACTIVE',
                        channelId: 'b911f03c-8a28-4db2-bfeb-b737f3a2c046',
                        channelParty: '11rm363glmj17l7wl6ouhjw2wcw1hppw6t6e3sz0fwus670niwd6wjwg29mqxxa2u8vl61cw8kkao7fjxmnd375dencjoq4ctrgw7gkjfhcs48hhic8fqv7kcwa43wi0f3fr2amdl3spdbtb0y2thv8lr1qz1p8m',
                        channelComponent: 'tjkuvcorqrf6vjcm2dkxtsxf5m3l8gxtv30qm0mbexh5v3vg7hythz7w8of2a7g1biutqsh77t2x7pl7jzqiibv4e1tyzrxzji7kr9oeqj0cmuokfsfd6tj3q7xxmj5680v9rtz7mn2qnrz0wkqjoe4kjvv1avnu',
                        channelName: 'h07hy64rl39kt623y698wljln9lv45m4ks8ducp2fcw1jikc1ywcghit16wr2hqfv3aickyh0m21231kp5x4w7hshi5y5qg6ojxtwhk5cjobn5hh88be61u5pekg3su1krs4l257tr3r36ymmvvynmq0jnru721q',
                        detail: 'Sint exercitationem possimus quia ut perspiciatis. Temporibus porro consectetur ipsam quae qui iusto aut. Voluptatem nemo vel quas sunt qui illo.',
                        example: 'ltbi8prl6v0cbgwvxfoml87sq0mpnzds1lgdml7t8v1bvikq9jhfx9k9ijlztgimfl5rgp8q5wjaxe90czn8nmotbl0covn0gysx1q8006qki4550iaodft9wmnyvh703in1dqhc6bd6hihp3k413mtqq1iwmuh5',
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
                        
                        id: '99d5404c-1667-48d4-b10a-809991f67d6b',
                        tenantId: '99dd7bdf-e50d-4e46-9710-3df4cefc6cf2',
                        systemId: '9bda5c93-a5db-4631-aa26-9c9d77a8454d',
                        systemName: '14pk2m89ddceayx04bnt',
                        executionId: '5b2c2d78-3728-4ef2-845c-960c83585d67',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-16 07:37:20',
                        executionMonitoringStartAt: '2020-07-16 14:08:24',
                        executionMonitoringEndAt: '2020-07-15 22:38:19',
                        status: 'UNKNOWN',
                        channelId: '3afea616-40f1-4ec5-87cf-84636acb0a49',
                        channelParty: 'bj9nhntci1xuoyx4x5gkcpl1x2n11a3s8v6andyuil3qrfqxzn0ollmn99iq0zye86y4itn4ib57chtoqcw7jd7qds9z3lyp4lbahwimseg5u13xirqq47ebdlva8949j6lphl02tmax150fw8rvuyx4l66027x8',
                        channelComponent: '67b4tjmlpognflua5w581jpmyqjqb5ykyh373c0q0m2zvdz8kskzr8x8w4h41gcejo0sg0rl41qp3ew7h0i73l3b98sfsey8fpbwvr6fw4zjuzqqyzh2193nc1v2yf9s9uvgwn3mhyieo0159r0qt5xufdh1uloc',
                        channelName: '4f75rf79r8hne8b2990vt107qq8slyzv0sqcvzqwk30tgxovctj7f9xze5y4c9s095nsyhuwyk1rldadf20c7w0i2xfqvurgfda9xcu8i54w0jzludzm7x7cczw2lh4tut59ufar9rs15qy740kxyks5qgepvwq9',
                        detail: 'Provident maiores iste reprehenderit nisi laudantium dolor ut. Culpa quod accusamus officiis voluptas eum. Dolorem odio non cum ut nulla assumenda. Quas sapiente et laboriosam pariatur perferendis. Est ratione eum vero quos accusamus laudantium. Provident sunt laudantium eum quidem assumenda.',
                        example: '8hbeu8fg9otww6r6o3wgomle7efwhi3g1us71c7m66yyzb4v2y9um1cnjrcbiorqeapmthe3vkbdr0v9bs9z59go860d9u9s1btcbemtmc5p8hmbb4cfxmbz29a7au8yrelvo83fd36ytrkarnem0kzr39qx9ix6',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannelDetail.id).toStrictEqual('99d5404c-1667-48d4-b10a-809991f67d6b');
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
                    id: '99d5404c-1667-48d4-b10a-809991f67d6b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelDetailById.id).toStrictEqual('99d5404c-1667-48d4-b10a-809991f67d6b');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});