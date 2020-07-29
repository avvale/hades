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
                tenantId: '8a31e12b-018d-43e9-8d58-8746bae6b01a',
                tenantCode: 'epqrkvijg4sih21rrcmktzvgeyj5i4gj5wo7zi39en4shgbyu4',
                systemId: '484039ed-36fe-48ad-9862-3ee3a36c0f04',
                systemName: 'lilfndqs5f9on0yds7gq',
                executionId: '656afb0e-aeb8-4710-905d-df224440e09a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 14:46:49',
                executionMonitoringStartAt: '2020-07-29 23:13:02',
                executionMonitoringEndAt: '2020-07-29 08:57:45',
                status: 'UNKNOWN',
                channelHash: 'z22ej0mt8eldzo89yusom20agtsvud6qefhp5lk1',
                channelSapId: 'yh8zbbrkexr8qi0j7hs6tmtav0i7wnv69iqc9v41jg60ytra0t',
                channelParty: 'ug4j3wstr0gf5tx3gz0zer84np77srm5yxqtz1bp90y61fajrp387prhm0rctnfvhv5z6lc3e0iw8yd41sxtbrskiuxvo9ngi4778lqxnyy692v0a9tfjw1f83zjnqenflxmzuexjy5a72ekk2rfi31p2r8n3sbd',
                channelComponent: '9bj86sk8g5b2gs9ytukl7p12wyrw5dpyr2sbsqix463027nlp4iz8uzqol9kjmzylk1yqfgrahuoy7t6ojjrqr28s136u0a1gntkoq3hibou48ntvyx7s622yawtq2el8lai55kaatlk94rqgsts6aax1gjywka5',
                channelName: '00zll7a39l80bq7tbtyyqtbl1nem9n5t4sobupms55xk8w0cuu2trnfa914d931413xfe0ck58ifv0yrsydhhzf32bh1fp15z1m0qrq1o8yzvsbgilcckvhl2paqy5x5m0gv4iw2nynyalmikkoo2yj7o9zw7zc4',
                detail: 'Blanditiis in qui illum eaque nam voluptatem assumenda cum. Enim atque sequi eveniet eveniet consequatur maxime aspernatur sequi. Vel quis earum sint odit veniam doloribus commodi nobis. Velit sint veritatis soluta libero fugit perspiciatis delectus corporis assumenda.',
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
                
                tenantId: '8a31e12b-018d-43e9-8d58-8746bae6b01a',
                tenantCode: 'jsmhjiyp9newr1l4vdavzalzqwnyrirm2u9fbftrum803pfscm',
                systemId: '484039ed-36fe-48ad-9862-3ee3a36c0f04',
                systemName: 'mqoc07l3gluoxadlswm0',
                executionId: '656afb0e-aeb8-4710-905d-df224440e09a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 04:48:30',
                executionMonitoringStartAt: '2020-07-29 04:51:46',
                executionMonitoringEndAt: '2020-07-29 14:04:42',
                status: 'STOPPED',
                channelHash: 'urlebizdwl7n3erh0pxvi7btnxmilwus1199kqml',
                channelSapId: 'bhe7wlzagutuqnzel2bv7455zl6qozpvxxhjgdorslmdbz8fev',
                channelParty: 'cumdjsntno31d9qq9lws8bykhbozsm44at0sfs9ado5yyx227ihlejts7x5rk7v52fqin57vvd3gq4fd7n8bamhph1j8n2rx1m3qx6ehy17yj4r5mr26feu3dle59yoezqj83vv5p2i5zkvdijvlxukeluadtex6',
                channelComponent: 'da2lhcivfg6i9j9hoc7s65pax7swecsf76vj9syt2q6mqdqbw7i4g0ru8zopbns4lsbs50ry6o57h4frko5fiozdhagf8rmk1jr4e009bl1he6h8npxix4opd6daedg874zrywqtnr9prw5kv9vrl26wkko4pqjr',
                channelName: 'fgd8futdkbz9mjkrbthdnwaoyowzn990aqoz1toowqmez6ru4gdoasvluw05ubc7h4q9i12lygqmoijn2nyroyck008nv92y23szfri4g4z24hxhv88fycfy44cmsam38f9ge2htu35b4z6448ulj707c39hhwoc',
                detail: 'Ad est ullam. Culpa animi commodi. Sunt iste maxime.',
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
                id: 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c',
                tenantId: null,
                tenantCode: 'vperiua4nv371m5ht8qmgw02f0z4p60xo7fluqeh8zb2p63l51',
                systemId: '484039ed-36fe-48ad-9862-3ee3a36c0f04',
                systemName: 'wafj7bfxw6xm19hxuu24',
                executionId: '656afb0e-aeb8-4710-905d-df224440e09a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 15:05:41',
                executionMonitoringStartAt: '2020-07-29 11:53:05',
                executionMonitoringEndAt: '2020-07-29 18:01:03',
                status: 'UNREGISTERED',
                channelHash: 'pfop35rgp9pbmtzgz66bi4buh3k0dp2z599rvi7v',
                channelSapId: '6fqyblkxw50j2rssalb4qj41r341nuple40u5hcdq1dpysup9j',
                channelParty: 'qie088rhb2aa2lvjonb5kjn93gpf83g96p3eqbwm2xtrysv0jpcnsg9vlsia057fsx2p6jnqkvzu2nlktq6gf155897rk6e8tv18ub700wqagjsxaco0vkthcy446vwq88nuuacxnxo9pkgymgpcq71cx75lvv6j',
                channelComponent: 'k1aj6ienid5otxdbvvkfmk0fv8zowficfo1hz1acd9tq1e9gpn1ezfgpty2yu9j07t0yqrb1wgh4im4wwe3bfxnvsamvcjlbensk29463vkr32sfbkhqcc1dgy3kuas9ugvyxir5ikpej3ghpbxaily1bth664ts',
                channelName: '5m9t3zdumqeiufvq9sxu8crsnsta1kzcn0mboidv01la1kutnt5au3dcidmqbrltui6dxa9dpjbywph8k3ibxyldgg36l2gw87par0e9cqwj1apolb2ljhg2lzw1dcs4q6gn68i71u4ltm8zqv8n03pbjllmkolq',
                detail: 'Eos dolor odit sint voluptatem nam non quis quod. Non rerum modi porro necessitatibus a aut. Minima suscipit accusamus quam accusamus asperiores.',
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
                id: 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c',
                
                tenantCode: 'br7a2sn64h529l87nqcqz673pyigm1432u31josg0azv4tid4v',
                systemId: '484039ed-36fe-48ad-9862-3ee3a36c0f04',
                systemName: '879srmykiwo0q79heo11',
                executionId: '656afb0e-aeb8-4710-905d-df224440e09a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 22:53:29',
                executionMonitoringStartAt: '2020-07-29 19:00:58',
                executionMonitoringEndAt: '2020-07-29 05:55:19',
                status: 'INACTIVE',
                channelHash: 'y7wyyhh9cafjs1gnfq0xsjll1dx5lt8tlqdhlt86',
                channelSapId: '4hctobwvvg6gcnfl6ljdw9coy4jlwnuee3dtzzxcvpw8teaknj',
                channelParty: 'j2lovbgolsww89r43c32afv9ho5vj6skfffscao9h0czx7k7kx033oujtnbp558ngvobtdh9hzkh4aufhc42zzyzggvqi4al8vl2vu3wsn1r3msnxnz7l6z8hxm732f8ipo0akzvs216z4jca4dv9rx29efendtb',
                channelComponent: '5xrva6tl3z7lk49t2zf03hg9klq3g0b1rcsqz04l1p8wgc2wamye2zxbdb0evy7qehsbqmuuz4961cwy8d7n6ackxbuhawrwpr2top54indi1rzgf606k9ubahfwuuyay36sutocjdr616e21d9xu4sgyxsibjgt',
                channelName: 'jiwzkmtyrvn12xy4itva9ms3gamds7gymsevk5exusmd6t0uh0siqzeo2zaccuq98es4p2g82993zua1c0719lsevt774pmbal6g33lyn5veyu5evt43hkvy7l5dpgehvatyovqt1gf0d10qaxisk8ypr7e188sp',
                detail: 'Quisquam non ex voluptatem ea. Laboriosam rerum excepturi officiis omnis id molestiae. Itaque sed quis eius.',
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
                id: 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c',
                tenantId: '8a31e12b-018d-43e9-8d58-8746bae6b01a',
                tenantCode: null,
                systemId: '484039ed-36fe-48ad-9862-3ee3a36c0f04',
                systemName: 'b30o05gx8qipd9bnlwm7',
                executionId: '656afb0e-aeb8-4710-905d-df224440e09a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:35:48',
                executionMonitoringStartAt: '2020-07-29 10:56:04',
                executionMonitoringEndAt: '2020-07-29 01:25:44',
                status: 'UNKNOWN',
                channelHash: 'c3mpbsdi2m0nc6qiz5x4dp4v32edcxqhm0mjmull',
                channelSapId: 'bf1v05k9tg2v40d18cf2mhu2joc258exhrlel6qwysr2qyf5kv',
                channelParty: 'lgf8gu9paxruqx3fmt8wuehg59of0dqcqxn6js3b0bghg801jpn26snu7u047lgqm7yzruqgvj4a9xl42zh157d3tkdlu5vxmyreyy544c0etgir8shsmwmr71em507ymjpu7tylqo22oiylgcjzc1kn85hf6ny4',
                channelComponent: 'popxt0renky33nza4i6yqsurp7djvd2b58b3x2dlze7oaemc92to35980005k9ruh7f0we7q9goq3mwaiacwghn8zjfg4q2g44iczoymwnqcb1130awona59h958d0p1cwtjf7wtw3rxmgxmnlpo9ua3n2fjssoj',
                channelName: '4fhb0qzycihoguqtwuilhso5s74lwneyd39c1ye91denrkvwdsjzx6auojtkfwt2movtppxwx9j2o08b2eb1efdkda9uu50qricfv2vtswx7vnfdtxhzwqzurrerpiizjvlgeexl34v8uevzyy0dazwfu1zjjhbq',
                detail: 'Dolor sit error velit culpa totam minima laborum. Quia et dolor eum cum. Voluptate aperiam aspernatur sapiente dolorem animi dolorem rerum. Est aliquid laborum quia explicabo soluta ut quasi excepturi est. Itaque sequi accusantium itaque rerum quisquam voluptas voluptas.',
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
                id: 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c',
                tenantId: '8a31e12b-018d-43e9-8d58-8746bae6b01a',
                
                systemId: '484039ed-36fe-48ad-9862-3ee3a36c0f04',
                systemName: 'fleh0wc87h41zjugjc6d',
                executionId: '656afb0e-aeb8-4710-905d-df224440e09a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 07:43:06',
                executionMonitoringStartAt: '2020-07-29 03:28:39',
                executionMonitoringEndAt: '2020-07-29 15:49:01',
                status: 'UNREGISTERED',
                channelHash: 'd1r1ojdb8p2ozhsy9e0difh48a79xa0a6v5uzm42',
                channelSapId: 'jle1mtiuvor7gub81a376df5arh81xtgt9461p9neayvm5umj3',
                channelParty: '97unrfwthf2vj8idb1dk7ago54lew77903innij9xty5uyxadhwt40i512o48jydzvlnkice3017v0ul0epu3fscy6k0was8wtkj131u2xhqe6my7jpyww9ypdvtw8dcfnwrw2csa30wg31pl21ssxabec0hw46e',
                channelComponent: 'a87drjlmu4jx3n47nufyj7oj6nm729blaemh072bjk74uz2uvaogwiyzb575q9e78ivcyqtxfan0pw6ke99qtxrng677efpsznjr5ko1oskohryisy4v0n353xwst0fznr8rszarrps2ek3dtf10hpag5tmpeq6s',
                channelName: '34e41y8us8fi4yssrtnxysqoucmh8ra6e8dbpofmlsl07ta79z8sp056i6yjr7t6vijr12jbryy1gqivw7noqnppy4atgxb84uirny7qulym1wf1yxshghh4m9zyf0p7262q7awjqkbqd61elfsy8ayj01ek6d6l',
                detail: 'Iure voluptatem laborum voluptas voluptatibus fuga aut voluptatem mollitia. Eos culpa minus dolore consequatur. Dolor recusandae nobis. Illum labore molestiae quasi ipsa temporibus commodi quas.',
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
                id: 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c',
                tenantId: '8a31e12b-018d-43e9-8d58-8746bae6b01a',
                tenantCode: 'iuw6pgcdnd1l03cmrzs78m4nc55sxiduhentbx2raao300696g',
                systemId: null,
                systemName: '8oynnr0pxkcd1g8o7qum',
                executionId: '656afb0e-aeb8-4710-905d-df224440e09a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 20:31:51',
                executionMonitoringStartAt: '2020-07-29 15:45:25',
                executionMonitoringEndAt: '2020-07-29 15:17:03',
                status: 'INACTIVE',
                channelHash: '3baclbhfnvk4wi7yk32c37e9r64v9j26h6jijdf6',
                channelSapId: 'n16qgp14of9jq3vqpet7psthtcdi39i3ihbgqqn892r15nn9a4',
                channelParty: '7a9zmen84a8dxbonidbh6kntja4hiop8d5robx7dfzwdwjurkkeheexi9cdenkm7td4rdk4s1cv6lq3cx5uhjn28dxtdgfecnc5jvwibkmhv4bnf1ym8g7ny5hf6erxbj0ywpahll6w071f19cr7r2q7k5yxe0kf',
                channelComponent: '61vc5vmpy3nynebdmi9q9icjj0egtdil7j68ca86zf4sttwgzhs0gmggw5417pa8jdlzefsz47mwk6tnms49nf54lqpd9mklnbnpa01i30oyh3dhcctwic45mwsktr9qpnss057giett2s49e517u9fq910mtbhr',
                channelName: 'swnz97u4tyzaxwcqdkh0agv6p9l0v2omk5uonr7r3wjb50fdhk5m0s2cw8g8o2m6xwwik3gg5tn1xca31gz43bpj7afvy7nf4qn8h5h9qxt88j9ziga8ynbj5c672fsmljgwbap2q29f9r79qjobajf6v6aj3ri7',
                detail: 'Nihil amet at sapiente perspiciatis. Eligendi corrupti ipsum beatae. Qui suscipit neque placeat eius. Sed consequatur odit beatae delectus quibusdam ab aperiam error ducimus. Cum cupiditate numquam veritatis maiores ex.',
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
                id: 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c',
                tenantId: '8a31e12b-018d-43e9-8d58-8746bae6b01a',
                tenantCode: 'g8fw5up6xfja5mdao1dsmfxv9epajtfel0i4vjguvc2ga8lha8',
                
                systemName: 'cwv29ee1j8ocxbgjxko2',
                executionId: '656afb0e-aeb8-4710-905d-df224440e09a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 17:19:41',
                executionMonitoringStartAt: '2020-07-29 03:43:56',
                executionMonitoringEndAt: '2020-07-29 19:41:43',
                status: 'ERROR',
                channelHash: 'iem28zru00x0y6lapurgf3nbnffmb6z4j0tx9bd4',
                channelSapId: 'hq5irc7puz91lgqwuz4j1d90lvab4ri59ieryfpmlug5ct1jm4',
                channelParty: 'ogshteyvkpzou9dtgxfnqn1s9pfaj2up7soo432mksb8qnhceuy891zc0y8yzdc8w8jsh6qok5mel65j3izb2bge4tu8uolvwkqtu7myskeneeko8cm0c6hly5b11cbbfr855dy09gefpdjr1ssz3q18y7eyfkai',
                channelComponent: '7wy103m5dzu2nfqbcz7qjy2k7ojxg44y58m4kkod6w4a4mmoa2ycu7fwiulxiuutpxn8gw26chpwnong367mbw74i54ey7jkdwhq2843jh2oepls0elb99ztzfb952aod7i9k4i9r53exffr26bhuedqbyqe4cpx',
                channelName: 'gmswqhu1nopw4t2430yyqjvdflvdvwyixev41m636evbtbm8mxdmax0nyradp6ef8qt03s7tz1o4ibfah25c34q0ny7vvgf21tvqa6odepee6m6c46z2cube6vojs2zccph2zsleuhjwknllf3m9ookz9k4pb8yx',
                detail: 'Nisi iste dolores eligendi sed minus voluptatibus quibusdam quam hic. Non maiores quis commodi ipsa hic non. Qui vel sed corporis recusandae explicabo dolorem cumque temporibus animi. Quaerat ut maxime ratione ut sint.',
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
                id: 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c',
                tenantId: '8a31e12b-018d-43e9-8d58-8746bae6b01a',
                tenantCode: '6xc820vicz3nkvn3pjgy5b1k7ko5f6wvz4szhhxflmmhdco637',
                systemId: '484039ed-36fe-48ad-9862-3ee3a36c0f04',
                systemName: null,
                executionId: '656afb0e-aeb8-4710-905d-df224440e09a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 18:32:13',
                executionMonitoringStartAt: '2020-07-29 03:55:47',
                executionMonitoringEndAt: '2020-07-29 21:27:51',
                status: 'ERROR',
                channelHash: '17o26brap5qi2j4hi2o7fa0wdsbhhprwwh81ajy5',
                channelSapId: 'km3x52cvekdydotldk2z22c1s9f4wslzu0vjq067vy39y5abdt',
                channelParty: 'k9vozk1l3ad8b8uiuhju9sfpa4bqvm0ryvyp0lyffeq294twaol05hqzr8opfz12emutcqz4it09irjzg4q46wpyrotskrhwnz4bzq4sqawlq2mmsp6xazob9c1d6giprxmhztdgwmqpe0zuf7lb6m04cui0s4rz',
                channelComponent: '0w1jup8t5jawdsetk328xg8i4cpnv2lbzs7xngkhfbj6jgy55wjn07n7cpaseea8px32lw5sjjr8xf7cvr9cd1lbhk0q7tq1oxhsnzmvngx6x4026bx8330xildkedzpl4qdyknn0wkvx4o548pw1qnkrv73g5g0',
                channelName: '15c1zds0ksn4pu2y8zn59ef8d2wzyheaykmeuijqst38o2hg5vyc5z6e0os5tjzvy4nnbgik4k3jih8qn7ov1qjhjfuks65ed30z7fdysf9jbs68gddis329j0hs9h9veol44naj580q8makawiqbpou54i5brc0',
                detail: 'Deleniti praesentium est autem esse exercitationem commodi. Cumque illum id ipsam est. Ut beatae et quos animi. Reprehenderit repellat eveniet officia fugiat est in doloremque dicta.',
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
                id: 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c',
                tenantId: '8a31e12b-018d-43e9-8d58-8746bae6b01a',
                tenantCode: 'mik9253g9pvbvte3ryhq91bxwakxoh22v1b6wcngmevr9szmkt',
                systemId: '484039ed-36fe-48ad-9862-3ee3a36c0f04',
                
                executionId: '656afb0e-aeb8-4710-905d-df224440e09a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 21:42:33',
                executionMonitoringStartAt: '2020-07-29 18:10:01',
                executionMonitoringEndAt: '2020-07-29 04:39:16',
                status: 'ERROR',
                channelHash: 'n993qjfrzb25w6pibv9g2g5w4f19tgpep5xli54c',
                channelSapId: 'xd8c4wu0t86cy2kzuc00k9pmx26eb8wvfg812emtuhk3zm9x22',
                channelParty: 'vbe08td25st3hefep67ahfsd3gugja0r1t9fv2a5m95dyv1s5e8lqj6lu0wain8dt28ii05044ewq1jmr1zj041q8zk7cedrxr9c3qxr347ytcns44ernrx4kfssjdaof9utgcbqi3u2r38vah8xy47pclq7twcd',
                channelComponent: 'y9oxfr2yfqucn6r3uplp737k9eai6sjzthksqnfu643zwyclmdw0gz1msk9c3z5ahjgwu4c0i4j08iablvtp8ibdgfjijor8vsz5mc8xr9whsypwfz3q0baix6k8wk2qqubgfio9tzq4wublteehb13np827rh95',
                channelName: 'o4ligvwdknve4jvxs0rzv5kaf15hqq7opiplzok82j3w1jz0rsts80ek0kjmsiogcr87omdc11hav75n0zso6k1lt3vj2oku1k7uevapp6jbge0eel67q0e5vof78xpqci7ugi84ucjrup9nfytv9iw983o47dkq',
                detail: 'Iusto ea accusamus eum blanditiis sint. Velit ut debitis architecto et. Omnis autem accusantium praesentium voluptatem eligendi. Consequuntur nihil dolorem. Ullam voluptas debitis ea perferendis et qui. Voluptatem corrupti quo mollitia.',
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
                id: 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c',
                tenantId: '8a31e12b-018d-43e9-8d58-8746bae6b01a',
                tenantCode: 'se1n8nyvj5bvrxs92p23zw114h4kv4aukoseciw2qdq5v5c36l',
                systemId: '484039ed-36fe-48ad-9862-3ee3a36c0f04',
                systemName: 'w94fqtb6djj13ck4klw1',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 03:57:03',
                executionMonitoringStartAt: '2020-07-29 23:38:42',
                executionMonitoringEndAt: '2020-07-29 14:50:20',
                status: 'UNREGISTERED',
                channelHash: 'cxwxsyy43bd1q3zrn2thrni078wb0tui52tvjn9t',
                channelSapId: 'p4a969nlj95tkws0q1va9n635tkop4vpos5wc2vpphbzge0df6',
                channelParty: 'wzp9bruh1w6u3cpa01oluizjgkoxk2qtvrchvgjrchngfz0ei2fmqdm7t9xd70oiuk0aid6237czt701cx85xyc2gbeiumytihs2bwzhcvy170abmk13mxuep9w9hg7gqixf2p55bld9meey1br0uagquoxwaugd',
                channelComponent: '4zsxom9irmol4f4zckw4uhbyq73ypg3fehn9h5w03n0dorad7wlux2a5ppwcd590eseac9zh3q1dr380n1ju7xh8cqaxy3civzyfkckff8nm8iuead733xy9weyu4xee14dgsar32cea27qt6xb7vdurhk9l5wn4',
                channelName: 'tcsdzdiyko3getbq0uyimhsa9ntxstvjaqblsqmfwp3e0b4ozn27ze0q8j9x1e30pa9z2wjkceg6jsftp557v2c0whsjg539hdrulpkyrb887rwu5u2we08hlj1o90rtchbe4c7jehujavn5k8twhf2xo1epfrce',
                detail: 'Amet aspernatur velit eum quisquam omnis. Eligendi porro totam dolor provident qui sit natus vel unde. Praesentium consequatur voluptas et consequatur at. Illo amet iure reiciendis culpa voluptatibus totam placeat tenetur. Ab pariatur quo necessitatibus esse dolorum. Ut officia incidunt et quasi repellat laudantium explicabo.',
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
                id: 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c',
                tenantId: '8a31e12b-018d-43e9-8d58-8746bae6b01a',
                tenantCode: 'sd2s99hk2fledqcjqeqbyysf7bflvoqti855qpkmvgkt2cd81d',
                systemId: '484039ed-36fe-48ad-9862-3ee3a36c0f04',
                systemName: 'y9ax7q4ec0pvgqszmbsd',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 13:39:55',
                executionMonitoringStartAt: '2020-07-29 15:19:08',
                executionMonitoringEndAt: '2020-07-29 21:36:13',
                status: 'ERROR',
                channelHash: 'xa71b3wmvrqv1v1zpvyu0nvvk3rth9vh2uqu3zv6',
                channelSapId: 'dzfd1rl6ckj2nmjwogp83uxw8uxx8qtkwnf5g94m74e8bcdees',
                channelParty: 'vlbbvm8a1om9ec89qiwkecp6nqml84e7gpmeymsyxpvuj9a47r92orwmr9kb3cqmytuu6tkhedskkum6zchteh3pbwcrknvgeec8zreec2d90w0ye9tggq9vgl1p1ccbygmr6gzsbdb21ris2v7vtljgms94fopa',
                channelComponent: 'chu4ayb5ud7f511jndbx4jqaiv0agj6nlf1fui13f9dwh5m80sjzwxn1s1i9he93hcjn3nwimy87yljigl7rsf306atjt34fb4ydviln0s5cbjclvu7qnvz524npqrp2gjq1pruw5f23l7nd1g18eoq8a477ovj9',
                channelName: 'j5zus77s8190g9autu5nrwokhcmwlpy8n6q1c787efdw4pano6jtukn7tx6jh685wevfxt6f7slyd69zw1gu78vbuirp28o6zwkw1j1703e2ja9ex8to28or34lmzqb7i343wsdbp77svgy9eet7jjai5zz48x3f',
                detail: 'Aut delectus sunt voluptatem praesentium impedit excepturi omnis optio et. Et ipsa illum mollitia quas odit. Deleniti quis in et rem harum. Magni odio provident ut officia perferendis voluptatem quo et quisquam.',
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
                id: 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c',
                tenantId: '8a31e12b-018d-43e9-8d58-8746bae6b01a',
                tenantCode: 'nrdm8dcko9apq3mdeaxnuyr3d2clrpy8lencygmp3fkjg8mjo1',
                systemId: '484039ed-36fe-48ad-9862-3ee3a36c0f04',
                systemName: '15m2pv9mstrlktxhzu3m',
                executionId: '656afb0e-aeb8-4710-905d-df224440e09a',
                executionType: null,
                executionExecutedAt: '2020-07-29 11:44:10',
                executionMonitoringStartAt: '2020-07-30 00:53:18',
                executionMonitoringEndAt: '2020-07-29 03:06:01',
                status: 'STOPPED',
                channelHash: 'kvenxl64dal07qcilfatuwt0fucb3pdr36ljbwfs',
                channelSapId: 't7ni41hssaqm0ev5ze5gexodi66k0hnsor3swqv9itfalsjqfn',
                channelParty: 'bysbqzuy9flgr8sf72t7gzsjlsbqlcxrp42gwgic2d753bfxkpjxjiov56qluxaa2e2k7e2mpidop0m42ekqsxwwgvsy4cl0eixvmafy486ewzkgr4o0l1kn22xq7r8ibm6mbpf653ep7kgufjsjho5k59cz65gk',
                channelComponent: 'cjukwobij91np7p5v01pilyjxijy9p1r349rwm5pvptkn1m43q2z9bvf8jkgk5tqn96d4pbmhxuy7ees24ps12lbussks4db8le94sy2dj4l4agr874yzv6qxkjpebk9nx9hzk6g6ynxy9uv5bovwqps1z5u64gg',
                channelName: 'yq1ye2l7x1hoh564vetbbuu9krh1wwfound42mxby2k3imqv47o3el2uixvl0f4cs0bnbutmwmz9z4nh3zlt441pocb31flavn0q88rc2mhnxq4lgto6mpq05fk1hpw8ljw200x76q57w8mmpmgggr02p4i8n71q',
                detail: 'Veritatis nihil sit quis exercitationem ducimus commodi animi delectus. Cupiditate voluptas impedit deserunt inventore. A voluptatem ut consequatur earum dolor. Eum dolores ut exercitationem nulla ad. In totam deleniti aut. Voluptas quos eligendi modi dolor.',
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
                id: 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c',
                tenantId: '8a31e12b-018d-43e9-8d58-8746bae6b01a',
                tenantCode: 'bh4an65f2khn5rwh8s8ymaclwemeojeasnef04rjfputc3mcdl',
                systemId: '484039ed-36fe-48ad-9862-3ee3a36c0f04',
                systemName: 'fn58wawzc0r9qymxx6ma',
                executionId: '656afb0e-aeb8-4710-905d-df224440e09a',
                
                executionExecutedAt: '2020-07-29 23:38:20',
                executionMonitoringStartAt: '2020-07-29 16:32:01',
                executionMonitoringEndAt: '2020-07-29 16:36:15',
                status: 'STOPPED',
                channelHash: '54ow8dzv7nz1wrt9uzisg5pa5607wkulcyhfevqd',
                channelSapId: 'j6id969k4h4xsff7d01vre44tkydzwoc5g0icjbdg6d1kidkh6',
                channelParty: 'qxqun5wvz7bds7xxtuhn7gj1k3pylkn549fy5eoqfhju7ax5c20za445te54q072a24mufb80wy5hoebwdjk5qgx8hjc1ihush6evsd82yeigac0lwizh7o4x7pz32azmtte2vrrr6hrn6hnm779g3vomh015pdr',
                channelComponent: 'n3umyvl2u8ojuri0hvsocsddjveq4s8gg93q4my1uzr38avtepn5hvuhfgx296lkfawrbfqez34m8v6j3hbyjs5czbssj50afkiode2l4jcpnyof6e4hygakx48b4mz3c7wl50ayefry1aahxdlde44tckdh63q5',
                channelName: 't2e1sxid4bds0v7ruz4cr7jp93e3h5ike6ghvbpegshkiw2qcnkvthjq0zxz8hhnsgwuuzww5d0ehbvhu7qoqv2m8tfrtzvww0dmzc0qhm6ae7xqqk9v61ixo94jn263947r36ahfw1jeb4yazv6wbxvvnl32i0a',
                detail: 'Qui voluptatem hic et deserunt ut officia. Consequatur dolor occaecati ipsum qui. Voluptatem consectetur ullam hic earum blanditiis rerum facilis.',
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
                id: 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c',
                tenantId: '8a31e12b-018d-43e9-8d58-8746bae6b01a',
                tenantCode: '0guv4iwduypiu3z5fvd3dh44up4nn8u4o7kq1xhl8s6v3dwmcb',
                systemId: '484039ed-36fe-48ad-9862-3ee3a36c0f04',
                systemName: 'yel1fp2irri02f9nkf1q',
                executionId: '656afb0e-aeb8-4710-905d-df224440e09a',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-29 19:47:19',
                executionMonitoringEndAt: '2020-07-29 22:13:22',
                status: 'UNKNOWN',
                channelHash: '7isgrcj75z5oxjggdojxg08lwjql1gl7bsnqkpct',
                channelSapId: 'g7j2x8mmk2sueckt2nb4hsn4qsswhi6l2167x0147unezwfbm1',
                channelParty: 'ick7a9nh8wtvzd6dcsz0gtg8hqf8kpgn56sb1nwhryb6rnetzgpdfe967l7s03ox9pb0zw9mubbqsh5pqzzcg0ysuezw767sj6zad5m5juqw8v93qjr6bilvj54t9wx0g9cznl84q6z75pek8tyb9u1le6z9fsnu',
                channelComponent: 'xbyc4n7kzxjgsqr2kd5k13v6d85ypyasbqlbhq0g8yx8f3jueqmky9wcwef5njlh73pmo0bj9mwabjyzld1emk9gp92bnib6zx9f4v47yzon9cn9kuwdbg84rrlke1a9uj4dkk7tt4djul7mlz3x1eo9vrx6w1wz',
                channelName: 'gok2j222s20kogyo7xywntbpcx00ffdtvtjkpo9ywb3zuj32hnw8m3rkwftap8pg5stmja2e7td7mtxbh2cjow74g2nnqmdh43v7yanp3vj3xnag65nulpruhqpy08hgpq2pfl2vlhoo36q1pd4038u3ckwjdwn7',
                detail: 'Sed rerum eum earum ut ut asperiores doloribus. Vel voluptas impedit excepturi totam molestias totam sint. Et error consequatur ea molestias. Velit sunt molestias voluptatem voluptatem voluptas dolor repellendus ipsum at. Corrupti totam vel. Minus mollitia unde et facere ut sed et veniam quos.',
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
                id: 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c',
                tenantId: '8a31e12b-018d-43e9-8d58-8746bae6b01a',
                tenantCode: 'w0gvipvjrijqjylw1b3n36wt32mg7gc6fticksoq0blpkcmfj6',
                systemId: '484039ed-36fe-48ad-9862-3ee3a36c0f04',
                systemName: 'hvf8g57kwxmlz8lotiw4',
                executionId: '656afb0e-aeb8-4710-905d-df224440e09a',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-29 15:20:08',
                executionMonitoringEndAt: '2020-07-29 01:16:50',
                status: 'STOPPED',
                channelHash: '1fwp6sgfes2121zlx5jqnsoeigwvnliyviwvt8k1',
                channelSapId: 'x6wuird7j71ai9l0f9ml31gvevs4qqoomkw1frsvrs5g4oddz5',
                channelParty: '9ea0py3dxqdhlk04etd5g5u8zjsyfs6rvaqyhfxzxz6jnrv0xgqjozqjpzsc7jsp2rem1wrdk9uk9ytmruj1mmzuz5ful7z3t78jhh6mqommlt10c007xmlovx5xuqyvmoeavjfair8vtq09zu74uvfmqwy33gg8',
                channelComponent: 'gbl4avo3q7k4dhj1jqcdxa418auiy2bhova4lf79yepzafo37pqm8krvfv8kw3kpbw28fqe8pphd4t4hhvyyxayxsl73topelbwxwvc57iukwhq5q07ttrn7ugmrdkgitwhhwq1ou917mposgqtk2ldpb6e9uyvf',
                channelName: 's5vo7fm8xcs8k02s7otz4s8qq92r3xbvfryduhlfxtke4h62l1sgpzczrs6d3bj22wwak6orh1tqgfw2oyqbfx0f6wfcmi7yiqzdweiips4g0woualha3bj5eoto5cax9pyjinx03lrqva0jjsxukcdykz6sqtku',
                detail: 'Nam ea ut nihil odit in minima. Eius deleniti nulla qui possimus aut at repellat deserunt nihil. Itaque expedita ea adipisci harum corrupti. Aliquam illo ut ad omnis eos illo.',
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
                id: 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c',
                tenantId: '8a31e12b-018d-43e9-8d58-8746bae6b01a',
                tenantCode: 'm0m1yjtnjyawf36l4ih9dqypep7s9m506t2po3g1hh0ezi2ovp',
                systemId: '484039ed-36fe-48ad-9862-3ee3a36c0f04',
                systemName: '0j9b4r65q0nexjtg7gnw',
                executionId: '656afb0e-aeb8-4710-905d-df224440e09a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 16:23:04',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-29 22:24:59',
                status: 'ERROR',
                channelHash: 'tujv6bzoscf0jcxwhunk1dhyf7mdjhgpa1y9lpqg',
                channelSapId: 'vm8hn9dk7kwtodeivdgotoj505z1jmqe4casq947lw24wac51p',
                channelParty: 'qvkq3mum9tmm9ow4jjgvsl9r75gn5vae68bsc5s7jhvzsgboe58h4nexo3hggy3cwoh1h5tbtt9ntalvdd8njebed7297uai261yyxaaret15ir7t6dwuymiulnk39m3dwarquhwmpyqfsh3yn33epfuxyyazvu0',
                channelComponent: 'jzt6mcimmqz9gybn40svra3jdi436w25u3aheq82xkyiv9zppebt6pu2cs1tclmmz5jz31k62tzoxhosm5b40181x3u6glfeycce8f5vr6dtzp0ywrszi44gnich04zg6wx6rez16xzo2btsyr2oq8d9hxa5ricb',
                channelName: 'dnc5bue50vfkyd4plzdboohr3n62sue75ouyus0dgf8kg0uh26kltyhn87h1fuz83ipkf5pb9qlhcanjqtk7c75834g4y6l0rdoq2ct24zxast8092utpl8gaga6maoh3utfub081zrf9bkmjdo5gk8lmtrfrnz3',
                detail: 'Sed et est sed rerum sint iusto consequatur et reiciendis. Quibusdam est non ex repellendus. Aut iste eos sed provident. Modi sed consequatur eum dignissimos ea repellat omnis maiores.',
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
                id: 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c',
                tenantId: '8a31e12b-018d-43e9-8d58-8746bae6b01a',
                tenantCode: 'olgg24gqv152qvyaiig72pfoy84q9ln6tub4au5uwz5gewuxgi',
                systemId: '484039ed-36fe-48ad-9862-3ee3a36c0f04',
                systemName: 'bl0351chx75eo2yszv23',
                executionId: '656afb0e-aeb8-4710-905d-df224440e09a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 16:02:41',
                
                executionMonitoringEndAt: '2020-07-29 08:10:55',
                status: 'STOPPED',
                channelHash: '6cq3h0k4a4xyw3ksctt78r4exrzaxmuxsau1ptt7',
                channelSapId: 'ap8f7asrm5v1z5mndggaiyc99r6orp3qqjtialx4zt3i714599',
                channelParty: '3hk308vrn7tkdjczvlai4gs9lis7aewwhqinhwgajiu8g17aoe9x3xsnqhf10kcxuusrq450qu3180cybeviegpa5255x731akr9jdv9gmdtzw0w1zvutfoirbvq475n6z8y0xfs3wtnl2fzvhwmnh36p3rh9kjz',
                channelComponent: '1muk8qifzvyaifd2kpue8oo8oi5e0ew2jt3tagst256mx35dwjeml9c6fxwu0kx14qkr3fb4icjr1ptic61rucydgt2bst9ela539136ap64gwduvfy82pjjlm5iof55j1r1lafkvp1bd30zwnqkepjvn24fa3jf',
                channelName: 'lf88eho90k89k32nby0l2rtevh8hz2imqjrxkctpm9txa2828iqmjgdxru6liibi8q8k652q65dfczfnai3m81x1bpsggokcc9ogeap2rwrru0dimtyjqs01ac628omedc3l98ytplqqkow620xio7m9ajyglla8',
                detail: 'Assumenda autem quo dolorem iure eligendi eum perspiciatis. Vel minima non. Accusantium omnis fugiat quo sit id magni aperiam. Quam minus laborum iusto possimus error magni enim omnis. Repellat cupiditate illo qui eos corrupti. Sint ut sunt nisi ab.',
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
                id: 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c',
                tenantId: '8a31e12b-018d-43e9-8d58-8746bae6b01a',
                tenantCode: 'tz5w0xsv0753w4cv6zw2imdwaytd0n2dekgi5pt2mkxanuctgr',
                systemId: '484039ed-36fe-48ad-9862-3ee3a36c0f04',
                systemName: 'tkpv8zoecwmxn6au9uhb',
                executionId: '656afb0e-aeb8-4710-905d-df224440e09a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 17:38:59',
                executionMonitoringStartAt: '2020-07-29 03:55:12',
                executionMonitoringEndAt: null,
                status: 'ERROR',
                channelHash: '3ua2z596gmw5ymuw3pvb2epwt3c6pdt274s486x7',
                channelSapId: 'g4zewk8948r1g8930b6f840t80tu6qgu32goysn3fgpu6uf6gx',
                channelParty: 'lt99t1b73sjxc5ksexkoc4p5ei0ldc9qv4k1ok3tcdsjsmf9nsm9rymyggd3jhygokn2gmzggt941jfk0h05u92x8vc4bwv5v0rs5vxa2rik6t9fbiqp4xo13ijlu7250jocbh3ykycp44lvqpkngzf1ts8nj44b',
                channelComponent: 'latgwauk3x8nbjfn595gnjxmeisbih3lmowkx1r5qgw6mxe2zh369dnrjsw4u8m60rtuqronmy2uoa0jgfwy1pe74501kjk0g0ul09d956rt4r2jem0z509j3pscuj7ksir2gc5qi57tg3ffgiippqucz9n9gq4s',
                channelName: '6mpeo499p2qc8j6ry4jqiro6gpzlhhrgl9vo0pm4bga0lp7dhnvitjlag4968ykpwjuac44yearqse7zavy3ukrpx70mhd63vhugmzpm446urw7d25zg8wmdcuz72nhtj9ihj9in3t9l61cilzlesg2ps8t2di25',
                detail: 'Placeat sit voluptatem. Deserunt non cum ut aut voluptatem et. Ut est ut dolores ut debitis. Quae perspiciatis explicabo et iusto sit qui exercitationem. Repudiandae aliquam voluptatem. Voluptatum exercitationem eum possimus id.',
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
                id: 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c',
                tenantId: '8a31e12b-018d-43e9-8d58-8746bae6b01a',
                tenantCode: '2ztmxf7s08lyjmgzf5xxjrkow1zqrk8aapc7rd4zb8j30px9k8',
                systemId: '484039ed-36fe-48ad-9862-3ee3a36c0f04',
                systemName: 'lx2e5zdaqdvuac8eawsl',
                executionId: '656afb0e-aeb8-4710-905d-df224440e09a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 13:46:50',
                executionMonitoringStartAt: '2020-07-29 02:05:28',
                
                status: 'INACTIVE',
                channelHash: 'aorhsjjc64wm0e9k2vs3jrdqw1wf5vgs5ckutk2q',
                channelSapId: 'h6u4njzpgtpo3ifxe8vr9pbkt25yryl90pcj9fgl20exlyuw38',
                channelParty: '6oa6fkof20pzi0umv1wwy58witxi1ql8elof5wyw7ghc7117nuvcqgpeb2vq6varz3ejpz2rttdfwuawix5ekmpilj4uc56349c76tidbxfyqjauvtfdj2ygu44i9zmwvkr4rniqev3heuawdxgxdr7bvjtajyy1',
                channelComponent: 'lyabg8es8ykxqvn2su7diolw5hj1mmf71lutc2xaykmfhes27jn1ay9013vcqnvn2z8ngomd07hn6vkvhra6ynt8093gutg1jbkvkgf1e89rnlo39v8v69mvwpkkn0gq7x6o0rrykz17j5i2vdcz0rjw2lay8ic4',
                channelName: 'ihqzdz5963lb26zqdqji4u1msaif34s32iwb2psoc4ul767pv3l6sxlcnp8jgl6kl1itj0ud5mtthu7c9uhg0hmicuzurmpm5q20451r5uenlwbjgjsw0648b9e2kemv9mai17p2ok6apl4rspv57r9lbloz6zoe',
                detail: 'Quaerat unde ullam quia in aspernatur eaque. Velit numquam rem. Deleniti unde doloremque autem nihil nam. Facilis aut odit cumque officiis et eum corporis placeat debitis.',
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
                id: 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c',
                tenantId: '8a31e12b-018d-43e9-8d58-8746bae6b01a',
                tenantCode: 'qogc8adxqrphcsqkmpv5c0u6tyskw0uytfzwvfxou8bqvgc5gm',
                systemId: '484039ed-36fe-48ad-9862-3ee3a36c0f04',
                systemName: '64a700jlzy3axpexmdxy',
                executionId: '656afb0e-aeb8-4710-905d-df224440e09a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:30:21',
                executionMonitoringStartAt: '2020-07-29 10:53:40',
                executionMonitoringEndAt: '2020-07-29 20:28:43',
                status: null,
                channelHash: 'q8n823jftsk47c30rk8t4n00q92b2hiildub8hg8',
                channelSapId: 'muxc2mlroskftwvt1mo8vt7b47f0xlene18ymkj7w3ldxkp2qb',
                channelParty: 'ieu1jney2de0lk045ihu2ixf8psbk3783l7kc5kcn7zasd8qb3n6s1i9h7to5bgcuunj7uisz6rdzgtjdmh7dsbi0ygupiahipvo5gjxkma3q15eetieoydidnd2cyqs514gv2gfqcbumhco80uihm63nln9c8hh',
                channelComponent: '2314q0a9zzqjf3qfwqgg0qvnfbq5h3y9ubgo36rw1at23sro3el2wi2ul9ufhoxhcdqd9pweo4r5i959pgg034jgofwim63zadzlc1xzgkzzdhss6tys1lcdgkn0nuypq2m0queiekwrxjx1kyiuj3d3k1o86mhx',
                channelName: '8dtxl3zdqo6ooh9wmrex43q7fdutsb53pluue0srr79507hsgo2m65wqbbxegmrxzx2p86aeil7knesp9kef8ra56whqj09lhfv5ft5n8nt8yc391kiden71apncb80gnwbh1734c8q3j4opy9bnrkfoyqkb7n8x',
                detail: 'Nesciunt ea ipsam eum facere dolorem. Error suscipit nobis officiis illum voluptas cumque sit quas. Eaque et dolorem sequi provident. Molestiae quam dolores tempora adipisci deleniti architecto. Ea et quod perspiciatis quia dicta dolorem totam quia.',
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
                id: 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c',
                tenantId: '8a31e12b-018d-43e9-8d58-8746bae6b01a',
                tenantCode: 'lsfkstg4eza1af05hulfxlh0macgoc8nn38x3siue58c7ls6sq',
                systemId: '484039ed-36fe-48ad-9862-3ee3a36c0f04',
                systemName: 'z4u9ncpnkvefavksf54k',
                executionId: '656afb0e-aeb8-4710-905d-df224440e09a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 02:49:56',
                executionMonitoringStartAt: '2020-07-29 21:32:22',
                executionMonitoringEndAt: '2020-07-29 03:21:47',
                
                channelHash: 'oshvc6xfik8ei29y0660qs78o7b1ullc9gfflarz',
                channelSapId: 'oqc2sxf3wqq1s3l4vfkgltjeivsv6p6rfgdyt21ti4bvo3u8h2',
                channelParty: 'usnrvvqm62augevpeiz49qwg8droqor7sfisjygtussgg24stor4numl0z8s1zmhxntwakg072ldf4j6ss9ipn2wiarbvqar3co7dq6s5216c4y4wcfwn6239qjqwm04gf3affdf8e1tr902tn0qlrxnyld9t7uv',
                channelComponent: 'iudw2f2phe4cj4p9touwetbmxx3wt2moajhy087szrz8j5hmgbtu4zovmoyfec8csrzzwcjh82m6mcmvo9xqr3bxx8ft5w68uwexii41dgc715k5glrci8ab9ap1lgp1wxrhimalh68zjkawy4jippnmuefgzph0',
                channelName: 'pt5ayibqmcilz6un7mgbwxybs9sjpqt9ggrkhotz9nzk9o3vfjcu4vym1arhsti3ki1q5llahk6fxkf22zxzog3gvfw6hbtsrgwrsjpqlkh1ic2yrlw3v7t7xxq49urx9kbah7fnaq0n7fzeia29pohf7ebqt2zf',
                detail: 'Ad est optio quis quisquam deserunt totam minus. Placeat possimus voluptatem aut atque molestias blanditiis et accusantium facilis. Placeat sed recusandae. Ex et odit. Voluptatem est quos. Sed hic magni delectus accusamus eligendi sed inventore sint.',
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
                id: 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c',
                tenantId: '8a31e12b-018d-43e9-8d58-8746bae6b01a',
                tenantCode: '8abpge6haxnnmddm8qvybiav2uwz5kxfrrs3ppm6hv9khmwf6j',
                systemId: '484039ed-36fe-48ad-9862-3ee3a36c0f04',
                systemName: '58wl280bs1cacync7x6i',
                executionId: '656afb0e-aeb8-4710-905d-df224440e09a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 20:33:17',
                executionMonitoringStartAt: '2020-07-29 02:45:52',
                executionMonitoringEndAt: '2020-07-29 10:20:58',
                status: 'UNKNOWN',
                channelHash: null,
                channelSapId: '25305ej3t1zihxbngdnhxzxl9obzzhg6rimb6n00k2ip7lx9x7',
                channelParty: 'odrnn7dqwlzh9432ie7s14mau2nl7i9nj6tns94qtcp86uhxa0rp254ku13szyv8wxotgg4psk099tjrec4w8psf04dn1cqqw1ch7nbh0l4zw2kbwyi2mil428m9m84l1ruodkqwrmjr0vz7bdv23eqvdhkd55su',
                channelComponent: 'jbqgozk2awfb9khbgmy8dtvf6oaxa6tvkhajzqukxarybglemdpxyq94zci5wkw3mflztmfu40kz2g4s515rqm5fsy122q0zi9fy30xittzursuocvuelvvtjxshw0xzlxg168bytzotv2d9esvbt8hmjgermqr7',
                channelName: 'c7yx0ipdapi2pyagaxxnfjo9cqb2ozgvo5vll2v2a79ej9x3v4wx0whkwziik52cah80uxri6fvkl50mcp88izxrik1gojtcyfvze1bnkec2wkhp0t1rn9ud3ro1d402fnrda3did798c592htn2rvfd66ft4tcb',
                detail: 'Tempora molestiae commodi corrupti inventore sapiente recusandae dolorum aliquid quae. Non necessitatibus iure temporibus quia delectus dicta sunt. Placeat id quia laboriosam perspiciatis architecto sapiente veritatis. Delectus laborum temporibus iusto quos.',
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
                id: 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c',
                tenantId: '8a31e12b-018d-43e9-8d58-8746bae6b01a',
                tenantCode: '5vsi5i6makirm6fh52potkz8w1dvjbqd3qf0ua95f11xy91uj7',
                systemId: '484039ed-36fe-48ad-9862-3ee3a36c0f04',
                systemName: 'qng5q9nv4q2hwc202yb6',
                executionId: '656afb0e-aeb8-4710-905d-df224440e09a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 22:18:15',
                executionMonitoringStartAt: '2020-07-29 02:38:12',
                executionMonitoringEndAt: '2020-07-29 20:28:27',
                status: 'UNREGISTERED',
                
                channelSapId: 'wgo4ywi1elqe1az3ip3bfdt7r6div5ovtk8snmc9f5t75kax9k',
                channelParty: 'wns2ickd8pzyf7d5gc7esg8pgf8aejfk7kd18sttxmbkrchalif57j17inj2axy6ctp48fgbid5f7xyu5fwiawsem6cbpkfnuubt7eyfvw00oj5azzgov4w3cvuhlzwrykyiqwm91d02p0y2q2hckxojrws6nix3',
                channelComponent: 'yiuhbresimwtyhvpzzvgq3e22393z45x26qxv9vlrl1ag6xs56hpf2fhmksp945iw1rtb6mz327o34t5018jgf6nxc9urrlmabn2tz08j70y3t6m1sm385j7fuvydiz2eqnb4bubprsoyrlsb8wpbex6xecd4ubc',
                channelName: '4l40bglnf80jjh0pjho61uyuy89ufj1tvnxmwouimedd3dsdi3ugoh2y1qlm0c2e2bbvlgi71ssh5xbk7upoax418b50z89xpsbwi2skwyjwn80z5819tfufaqcylcwa08z9bfgkdq86qryzts0g8gg761ohh0ea',
                detail: 'Perspiciatis reiciendis possimus ratione mollitia omnis provident aut recusandae. Velit in consectetur neque neque. Velit est vel consequuntur voluptatem quam ipsum iusto inventore earum.',
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
                id: 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c',
                tenantId: '8a31e12b-018d-43e9-8d58-8746bae6b01a',
                tenantCode: 'cg0bjxaqpc0zgbnehbxli2j017gcu8jqp2sbipgq78ftqd6hfr',
                systemId: '484039ed-36fe-48ad-9862-3ee3a36c0f04',
                systemName: 'aohtyf47eoyh4mafn9jz',
                executionId: '656afb0e-aeb8-4710-905d-df224440e09a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 05:28:32',
                executionMonitoringStartAt: '2020-07-29 22:19:49',
                executionMonitoringEndAt: '2020-07-29 05:21:38',
                status: 'ERROR',
                channelHash: 's510yc35p23o1iie9e734mj2tvaz9vrzjk6mcg5x',
                channelSapId: null,
                channelParty: 'nymj9l0dz0qk36e2bxccz2i016u38qf17f5102u7qguhit3mcxd6pxci3zamrahi1v58cba8ojrdypwypcrz6yh0133uewx61cy5r0dmix2j6120lplvf1i2iokt1o0nrvvlbd44xs0ntsp3m167i1nwf63axdjh',
                channelComponent: 'h80sjfb2mt66e03sapj63z3iyz181uko04t9594j20dib8f0a1utj2ayt66xsp9ms4mg6i0sbdjx1apebls8dt0uq8m5zgxi9a69xcrdfpnk9qwf75w0otdcba4lxeeu50mcemmszerei15a3qhxtni5fnssji36',
                channelName: 'wtf10wr6xjbqwwucza0v2ykcnxrppj987qgcnbzd29pr9cqw9ylm421va17o29jde8wkgjaei8bmpxzeysh8bt2o6nggcp90mgatl7ol7wxiaxyetbtjb31mtyt6zddeoxwqwze6xce48j26jta9rac82dq8gydt',
                detail: 'Sit asperiores enim. Perferendis molestiae maiores doloremque blanditiis. Voluptatibus aliquid sunt dolorum at dolore eligendi repellendus et. Provident incidunt dolores vel veniam. Vitae aperiam est tenetur perspiciatis. Et sunt et animi impedit unde reprehenderit similique sint dignissimos.',
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
                id: 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c',
                tenantId: '8a31e12b-018d-43e9-8d58-8746bae6b01a',
                tenantCode: 'lr4lzz1i44rcv9o6xi8depyjjlg4wg70x6r5jww37156bczrpx',
                systemId: '484039ed-36fe-48ad-9862-3ee3a36c0f04',
                systemName: 'n01x4pgypqwmfmppoo4w',
                executionId: '656afb0e-aeb8-4710-905d-df224440e09a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:52:12',
                executionMonitoringStartAt: '2020-07-29 11:36:44',
                executionMonitoringEndAt: '2020-07-29 17:55:48',
                status: 'UNKNOWN',
                channelHash: 'mhraa2nwpdfwaon6tn2ticd7nqlbfiybt3rflzga',
                
                channelParty: '8i0engotfpgg2e0zo60isx32wk60i0cgccdl3huxe80pm3uwwb6rv1o1y82n19hvwa2vgh4456xtzl6uvw8gu4k602czmvobw33acb61nzo82tdqn2sfxbrqv0wq36yco1lm89f06esittgdj5bwzycga7x7it36',
                channelComponent: 'j1wkrjr9pjm707mpdjo3n36bm3hj9nt91vacqgv2aogwl8epo2tlhp4ni7hpqm27lvkdefvdn03vclub35kqfrfn6kou6k2jl6vi21xrxdsw1ua236r2pwqpkly96zlhetj4c361t32gafi0m6sq8be26yj1h577',
                channelName: 'rl6pvji67jknjn4n79l4pvjyw714j5aikxvdt6epxdv5w89hwv64ibmw81fulby8f6f58xwtzaw3xve94aonwv02unp6rbabopvhyugf8jevyfqrvj3un305179fcgdzwkiv0d8jn2d98i03cxw649bmab9w7npx',
                detail: 'Totam officia assumenda saepe architecto quae. Error enim odit maiores id voluptatem dicta ducimus fugiat. Dicta sit consequuntur labore fugit. Architecto architecto ut sunt ea nesciunt voluptas. Consequatur enim fuga.',
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
                id: 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c',
                tenantId: '8a31e12b-018d-43e9-8d58-8746bae6b01a',
                tenantCode: '4agnv14cqp7a74dzl0lcr6t9dmgapafxuy6a7pww8ympc75z8a',
                systemId: '484039ed-36fe-48ad-9862-3ee3a36c0f04',
                systemName: '7cpghbqdvi693t2ed7os',
                executionId: '656afb0e-aeb8-4710-905d-df224440e09a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 10:59:09',
                executionMonitoringStartAt: '2020-07-29 13:03:23',
                executionMonitoringEndAt: '2020-07-29 03:27:49',
                status: 'UNREGISTERED',
                channelHash: 's9rqhhg9fkm780xeg7pcr5emn8kbkxzu6a3o5kn7',
                channelSapId: 'b9kl6dnrjg1sri27cc6ukozs5qqu75bjinbiuyvl4p58gm982t',
                channelParty: 'wnx3dqgk7juedwu4zl1yj98wvfv0bica8mmcnthgg5mrz4jrzy9voymn6fgsfs1s5pcn841aczfwat259l64cn28k1pc1tjg5voo6781119gga7u7nnl20d18yw1tskdoe7qqwo7n8dwv597zp7r0f2ct2heujk3',
                channelComponent: null,
                channelName: 'lschexri40lfdgdmet1548ce8ogvhbz172vfeyphs99b3qrza5gwyayl90ckjthrsa0p4hlgm674ztjcwsdw70acacz6hfbcywv9bi422h7n517aj6n5uwp0pac6itivrbz5x8bak82fr31nunqbdwuwec4pe8qp',
                detail: 'Sed qui porro quis. Nihil cum ipsa rerum. Perspiciatis est ea aliquam ea nostrum est eos. Pariatur omnis quo non. Sed maiores tenetur aut.',
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
                id: 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c',
                tenantId: '8a31e12b-018d-43e9-8d58-8746bae6b01a',
                tenantCode: 'f84xvpauqtoldjjcfflrbz8w7xadg242m80j8p6e7fji9orv6w',
                systemId: '484039ed-36fe-48ad-9862-3ee3a36c0f04',
                systemName: 'j8376yw7a9k42dpvbbjl',
                executionId: '656afb0e-aeb8-4710-905d-df224440e09a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 05:07:11',
                executionMonitoringStartAt: '2020-07-29 10:34:28',
                executionMonitoringEndAt: '2020-07-30 00:52:09',
                status: 'ERROR',
                channelHash: 'uuqbgre0ev4e7l3alnil3t2yf20iadlfu4vmrx72',
                channelSapId: 'blx33950lexoppc2hytarfs7ilt7aorr2itjvux4qge6uc8hck',
                channelParty: '1jauutulu5gmjirpk5nh8jd8p4w9sq2ndh52mo2m1lhr27395c0jo4wz8qj1cgmp231tb12m8m5e4mxipnheat441cvqmxmq1qppi0jh7r9rxirc0t07ls12an2lf668jo1jf299dpv77bhf9k0smfpp3xmj4vvg',
                
                channelName: '413v33ovtlpkthrc8yvujvdh2hsvijblc6g7drbp7n9p3zvq84ee8izlfzh1h2fn1ld41mt54mnkfh1vbokvce38dif3u8ierhtnp3ryv6nix2r7udcpxbim17zz76scmm2qid5ovxim44dyjckofgld7adhk99h',
                detail: 'Quidem ab nulla qui sit excepturi commodi. Excepturi quibusdam ipsa cupiditate asperiores. Dolores et placeat quasi vel voluptas enim eveniet et. In reiciendis eos tenetur perferendis sed debitis. Similique natus non nam reprehenderit facere beatae hic veritatis. Sed et non officia autem quaerat deserunt rerum corporis.',
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
                id: 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c',
                tenantId: '8a31e12b-018d-43e9-8d58-8746bae6b01a',
                tenantCode: 'c7k2uw3machjxso0sdycvhf0773mo7vqkhw7fsi7ehwd2zx710',
                systemId: '484039ed-36fe-48ad-9862-3ee3a36c0f04',
                systemName: 'xi67oi7ophd4vrr4tf8r',
                executionId: '656afb0e-aeb8-4710-905d-df224440e09a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 07:20:01',
                executionMonitoringStartAt: '2020-07-29 11:52:48',
                executionMonitoringEndAt: '2020-07-29 10:55:20',
                status: 'SUCCESSFUL',
                channelHash: 'bdmc7v2z01lztdrl7d0iy376xmp4uh1nltm8hq16',
                channelSapId: 'pp54ul6aedch6d5o4ka4qze3v8opefdg17xjm2a4uhi7yblhmb',
                channelParty: 'g1n0zaktrd58laxkw3xc4bhmsyu1r8pf13yelkf1u2ulj2kwhx7qve4jhepm40zgolazvgxvjl6lg9eli9agvjngr05pxt34b7j8f6zl2vpxucvyzqi0somnlqn34hregm3aef4uiway67a2k7dlv3vyx4vk5n0u',
                channelComponent: 'sdvuq6skgcwos4mznqjwyayip2ejt5rbmnu4lqablfwdya8b1yqb526db2lifa2c6ja5uxi25bkhfnjdcltlleeuu6u4eivy514wakpnox6fv4ezeq1q0aldhtb0d1vggvdx3pn1wqxhntpy24gyqc38ka8nq5jl',
                channelName: null,
                detail: 'Aut aut rem ut quos iure. Quia velit temporibus non eum et doloribus et. Eum dolor est sapiente aut at placeat aperiam. In consequatur perspiciatis pariatur accusantium dolores. Suscipit molestias veniam asperiores nihil. Porro similique dignissimos.',
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
                id: 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c',
                tenantId: '8a31e12b-018d-43e9-8d58-8746bae6b01a',
                tenantCode: 'jis4afs6vk4xvs68uzln4py3wgpsbfip08o35iuzbq9v7mac36',
                systemId: '484039ed-36fe-48ad-9862-3ee3a36c0f04',
                systemName: '5622e1n8rbckr6bq2fjq',
                executionId: '656afb0e-aeb8-4710-905d-df224440e09a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 14:41:12',
                executionMonitoringStartAt: '2020-07-29 01:05:44',
                executionMonitoringEndAt: '2020-07-29 01:19:39',
                status: 'ERROR',
                channelHash: 'fhki697e3175trmo2ft8yszriyd4lx18l09peaxv',
                channelSapId: '9mc3umtgieo5026kt59fpysyt97ysisr5k717pg0ohr90jk9vo',
                channelParty: 'x20bsb305ikpu2h6twvc9t8d5ql9o2ejrp8zugm50kjvs33eea66rp3z4ddr33rp34gwaofcr0hpazvmx0cwhjczmee9ihswsfuyaijb0kg7uy3t4l3xdsea8dvla02zht4wozp8dlm91l9aurcpjzyqfitgn2p1',
                channelComponent: '6wk6cw2cf7mepp8o0b6e3ndu8n4l8wuu48vh81q4v43en9t0dglicbw50nkiuj4kv2gr3hu91v3djf2jey502bs9isdwuhrtkxkaoto4kt0fe3yii3e8ogxvspgype11o9gxi4prgnq168ggai0dvylcd8xeljxc',
                
                detail: 'Quia totam ratione alias est saepe deleniti in optio nihil. Aliquam ut quidem quaerat voluptatum sequi hic. Dolor in ex eveniet culpa.',
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
                id: 'o6c5b94j3m14ptrl2uw2ser2z9egvvwsfzjad',
                tenantId: '8a31e12b-018d-43e9-8d58-8746bae6b01a',
                tenantCode: '8esf2irzglblv7pdib3orfzl21tqy1ryo6a9okyn8ni1ubkwr8',
                systemId: '484039ed-36fe-48ad-9862-3ee3a36c0f04',
                systemName: 'isfrwqmwa8mhauz6ggv7',
                executionId: '656afb0e-aeb8-4710-905d-df224440e09a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:05:30',
                executionMonitoringStartAt: '2020-07-29 22:50:31',
                executionMonitoringEndAt: '2020-07-29 22:24:57',
                status: 'UNKNOWN',
                channelHash: 'brof01vaix09gzyslcb24i14u2rl8ozag98jedff',
                channelSapId: 'lpvcbsikfvs3ig3ytjkcfuw4iuvj4cgxu182florwd995vq641',
                channelParty: 'xh2bdi3lcpm2wpmljqntm95hbi2z08wv92hcgnwihr93ak9ckblf8474vjrwnbh42qwldfbu3u6123qt62k3blfapqi1qb5piqrt60v0qsz0i7owngsegtki7mqhls15bqm09eb8z7i22c9xwgqpfg7skvs29dop',
                channelComponent: 'miwl4hi0j772gx1u37330x1wmij0r9hn6acuw8hp2pdxqgd9qp8uxwwu4syina8hwixqj47bq61jej4neie79e3ob02glkpkdbnoz61kn3dhgp0yvzbybo2tmdmmzv05qvie8fugrrmv54yw9dxw95bq60n647zo',
                channelName: 'inez7pa3w555upgc2b7racgki5zgzod17b28wivjn4hijqs5ez2s4bhazqhna0paaor7sbmbfhqpd7ivrgkxhpfsiv9reotsf8i8841b89e7nd91ik1vfikrgcif6l0kodu5e3d69vrjhpd989h421v8hqrym7f3',
                detail: 'Illo quod et sed omnis illo a. Ut in quam molestias velit eaque a aut. Aut at est ea sit. Rerum autem ullam voluptatem quia sit dolores at et ipsa.',
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
                id: 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c',
                tenantId: 'vz7c8vw74gwel1dh4gkbjfmzx7wjgpa8y3yow',
                tenantCode: 'hrgzzfxpbbq6kwqkgwm25fwiqbm0copgeejol4mvnun53zarnv',
                systemId: '484039ed-36fe-48ad-9862-3ee3a36c0f04',
                systemName: 'rqs88ft7r3vyg4u9xhbz',
                executionId: '656afb0e-aeb8-4710-905d-df224440e09a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 19:06:02',
                executionMonitoringStartAt: '2020-07-29 10:28:14',
                executionMonitoringEndAt: '2020-07-29 10:42:57',
                status: 'UNREGISTERED',
                channelHash: 'c3tklq7urluaqbsrqop09hdwel39p9zkdohx167h',
                channelSapId: 'vozn4auxnz1fdhf3llif50do5cut9mr18lt5dz2sztcwyf87hu',
                channelParty: 'hhh7usz3zge3cbavu94dcvsciv8rk8camvov5fchcfwl0cvtwyoyu85ts3pkdw6d5vrs59uz14pa024mhc62fsklfdyfrw8ruh2qyenzzu5vnmgrvy2wgut0jlsc0mne5rpq7xse8eqfmfmihanqpeiaayiih4qb',
                channelComponent: 'zl42yeqbq3cclvepgfp5opyht4ww212q8l2pwmwhcm9amk6bj0dkn90facyrjfc23hyxq4zum0ee1grnwrfiltk7ftfjtr32xppknhglsk4qgji2kzh9oaxfpl6ovcbc6x6bzfsus3lfgas5qpv5otjob7egtog4',
                channelName: 'oahtw1rv2c8pg74cs8qvqr4en0e7ztsm0rb6atvdd49zgllww9nc8kv25jlejfqds0f7lprrbear8febzpb2x9s5vauuu7emgp5jafgyp4b3jlxqblw8w9b9jz814r3jbv8khjm47ccfsxy1neviot7suyb6hqni',
                detail: 'Ab earum necessitatibus velit voluptatem facilis et ad possimus eaque. Consectetur beatae in fugiat impedit. Vel praesentium repudiandae quae dicta pariatur. Sunt pariatur velit quos perferendis. Molestias voluptas voluptas in modi nostrum magni fugiat sequi doloremque.',
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
                id: 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c',
                tenantId: '8a31e12b-018d-43e9-8d58-8746bae6b01a',
                tenantCode: '0a2i6p3gimfcfxinlj7d8tqo81f8sijy6gkp7ugmhhmkrlt2fn',
                systemId: 'a32oq0g0uh0w4184ntof1ta894y7h6bi6tap3',
                systemName: 'fbn93hyaln121a46trpy',
                executionId: '656afb0e-aeb8-4710-905d-df224440e09a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 17:04:56',
                executionMonitoringStartAt: '2020-07-29 21:49:41',
                executionMonitoringEndAt: '2020-07-29 04:27:57',
                status: 'SUCCESSFUL',
                channelHash: 'd4javbpt5iz8mmh0j61flrxtabohkbuhvx76clpp',
                channelSapId: '52jrf8tr18jlww4gwyw8v2g4tnf224qwi9v85ncirsz2rwd9yb',
                channelParty: 'gkh4d0zbp5qf9zx4m3ew6u58mney5ndcb77feafcilyxgkivsm50853zjvb2hy2ron9mzvjwucvikb6qrohws3acahjigdeufjh1b9xm5ebixxjgzetgdnexa6oidr0vjrddk210ybxijwlmua2imxsa4vwchpvc',
                channelComponent: '4quzno889y21qn42e5dyls0knm8oycmeizfgsqj4zhclwfvanqqwkgm6xpkcym1vpgfwaw12n1pujyz9cpytkgu3mnc6b7mnlvivj0xs2mdct4nsqaawviad3v0ne1xz6om4nncy0935p637n924ngcv4tkrqogd',
                channelName: 'q0j4hukbp35cmxyjjuje7aubt7f4a4arorq3uzww5oec9sfecz955jbhmt6dg6x7jhww7fuvtvto9fj5og63nzqbb5jxh4av3srbpk2mcnafomgzlatk13ad11hjczuyl8hbdj8z12yknxyr41tpqzmfqbk3a4if',
                detail: 'Magni sapiente quidem asperiores voluptatem ab. Delectus deleniti excepturi. Rerum molestiae placeat unde modi deserunt alias nihil. Nostrum ut dolor veritatis omnis eos quam quod et voluptatem. Nesciunt qui architecto aut et facere a omnis vero.',
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
                id: 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c',
                tenantId: '8a31e12b-018d-43e9-8d58-8746bae6b01a',
                tenantCode: 'cm3xjlvt4vu7d879k8205qu90jao7nwdrfwmr4wpxnl0yiyub1',
                systemId: '484039ed-36fe-48ad-9862-3ee3a36c0f04',
                systemName: 'dgmtwzhfyvv4t3vgyyq8',
                executionId: 'mu788x8t4jdpt3h66tnztpu2w20xzpqomxdm4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 19:01:52',
                executionMonitoringStartAt: '2020-07-29 11:35:41',
                executionMonitoringEndAt: '2020-07-29 20:57:55',
                status: 'UNKNOWN',
                channelHash: 'aa4o5ku2w2v2ats84do80ppupfqaa2edwt5m7sh2',
                channelSapId: 'l0mujj84lg7adk8q0uop8m3yjhaplq8ciifaqoveeqaj8677u3',
                channelParty: '0qdazee59apsyr00zyj292soraakrgvpaftobv8tefvi1k3r19ufr6anx6ye7i5cuip28rmzgyuwavs3w797z5ee4dgn63sq97ln3i28sfcuxa09meqp6zvk2k4g4p58nqgx2z1yxnjkjagva8ziix6ogk35tqn7',
                channelComponent: '1nmnstyaeta1jjvoosb22id5zy0sfjnh2pnk1rq0037vqg61eyurexvr33e4alfx5j3tajxv10405rpbbxlfy77b5es5sr5h7xy9ncbl4egy5ubssb6pstrixqo8dh3ov6r2wu1ya7e4i37lqqwitpamn9j8fk2y',
                channelName: 'io6luf90ipq9vc1kvtr9rrtpx3kdebplnkyaxjzqnoounp1v7vuerncw1651gia0k64je4oip70hadizly5dk7seepazh4oxv8kxgo6w1vucy77gytog22rzuxeli37ty9b2tysw24mvwc9bxe9tc5vbzyqus97u',
                detail: 'Soluta quia quisquam debitis temporibus consequatur. Autem rerum iusto recusandae voluptatum et qui consectetur. Quae doloremque culpa voluptas libero possimus.',
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
                id: 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c',
                tenantId: '8a31e12b-018d-43e9-8d58-8746bae6b01a',
                tenantCode: 'mrw4t394vrglsut56q36uhykm8pd27qfxtcouto73cgs6uqarj',
                systemId: '484039ed-36fe-48ad-9862-3ee3a36c0f04',
                systemName: 'n3nwrzko2e94xmk3wx8q',
                executionId: '656afb0e-aeb8-4710-905d-df224440e09a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 10:49:19',
                executionMonitoringStartAt: '2020-07-29 19:51:08',
                executionMonitoringEndAt: '2020-07-29 11:15:57',
                status: 'INACTIVE',
                channelHash: 'hrxjwt4euxbh3km4w509lis23wto0oslip4beak0n',
                channelSapId: 'udzecuv0mfzoriip0o6bhs1ru20sxqe9a4sub9z6vpaazo1i1u',
                channelParty: 'f0je3efx3luab561331dnl6azrgyf858fohaska02uy8j1t8bbteo9mgejwj5xfcptt75xrot1ct08jh8k8ylffpdp9nc8vnntjrlilwixlnjqm15f0dzctaa3jzw8m7iimccqaoc1xioknfb81opsxuco0k38s5',
                channelComponent: '504wlw7rbgfopk6zowxngrxoz1vseb7am5sbwtfs1k665yu6n6683m55t7x81ggl52hsvsptj43maeazt3v8x7urtxmf277eji8efvhw7znty76bhuunuix2sqj9i2obfbr5gfqhyhwf301v1gnz9ekm2r47b2ps',
                channelName: '9ccw5rs6oib8qsa03xb2h2b81rfxhrbyv3b2qgi53mthlaf7cgvi2hj7h2kku4012hxcgx42388lcctaxl9toqeglxiqdcsoqloat8bjh79paeqvg9l9mb5brneivd2z85ds0eu1kb3kpqr4v7nmwsi037h73z2b',
                detail: 'Accusantium dolorum vero ut quia. Consequatur aut molestiae fugiat voluptas sequi cum nulla eum non. Tenetur non illo fugit omnis ducimus voluptatem.',
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
                id: 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c',
                tenantId: '8a31e12b-018d-43e9-8d58-8746bae6b01a',
                tenantCode: 'd11rd0gpny7zypqnqz6bx7jlgl7ac9eib3pdpxzen7rojjcq95o',
                systemId: '484039ed-36fe-48ad-9862-3ee3a36c0f04',
                systemName: 'vq6ra5hpetqc5usv9ork',
                executionId: '656afb0e-aeb8-4710-905d-df224440e09a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 15:33:10',
                executionMonitoringStartAt: '2020-07-29 21:06:15',
                executionMonitoringEndAt: '2020-07-29 14:11:36',
                status: 'INACTIVE',
                channelHash: '2017lbbb1sw2mc7ddxc9pkwqsl5ej2totfkls7sa',
                channelSapId: 'x1cxyxpwowr7zt3o5st2v0g7ffn0bygo66ljov55xck6qxh412',
                channelParty: 'boczexf67kx93d99swobnomyuohzy5s646mlkihdwk1oowkr5uw2xt9mhjdlrx1b48lqix5p47hsls666kz3e4u65hc1p30bd43bmsmly1o9qfsbu8vidd0fobiq5s7b9sgj9amq37cdq10xydq77x8w9hqyv366',
                channelComponent: 'idvu5me2khk42tm6y1r79ll2o0837lx4421zqibyh7mtihgpqsnmb9o519o66dgptkgex7u5wto2t2u7afm6idysqwtprzttom8s5moj128pht2bnhgpiru8i0mpxd0ysi61h7q8q99e3u9992x8edm44j6h0j7q',
                channelName: 'vrzc4mchxbcvvklb6y15ck8rcl72x5t5twf0eiz7s3wiq8ydeqjw7epzvefwulv2bqwcovfv947aknff5q5j2hj7by00m6eze8nysflmw5eovagquacwybvr8qkmxi2xrxgq4pbr73o5q5sffyz6mblalv0xalyz',
                detail: 'Unde voluptate voluptatum esse placeat sit esse. Aut animi corrupti aut. Eaque sit omnis aspernatur dolor consectetur iure expedita voluptates illum. Fugiat possimus sequi tenetur vero officia dolore sed rem. Quia atque esse. Sint ratione id ullam.',
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
                id: 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c',
                tenantId: '8a31e12b-018d-43e9-8d58-8746bae6b01a',
                tenantCode: 'vukdg11n4hmkmc56o0yq8ctgs6ly75hdki71p3bqfx10psz2nn',
                systemId: '484039ed-36fe-48ad-9862-3ee3a36c0f04',
                systemName: 'h8qeensgqvf8twqzqv5af',
                executionId: '656afb0e-aeb8-4710-905d-df224440e09a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 07:47:57',
                executionMonitoringStartAt: '2020-07-29 13:33:40',
                executionMonitoringEndAt: '2020-07-29 06:26:45',
                status: 'UNREGISTERED',
                channelHash: 'e40cewju97fkbgdko23xacr43kfujbt1ou07fkh6',
                channelSapId: '2eq52oz9390k4fae5peufdeuy092vxczw7merdjq0kkcziejkt',
                channelParty: '7avnxpy8uzk6ctiuqou745owwcv7injhazijbhp7tjk6xheorlw03cfjctu2u9644ssj1vhfci65g8eruv71qu7p8etq2e351v6cn5tc047q235r21q7pe61ako7eri0bxeekvymfmutxqt9eo0w7ceaitvl0q7s',
                channelComponent: '9e8gkb3hmss2xpbxkp4a0j98q85n953uo48w10olnsgci5rhuqs50hkeaghd24a4fhu6x50da159dkgt5i1ypj486zpmml8fqmtdxixd5cel812tys3wguipu56luk3nx3vibxezjj16o0buirr9a0h36eph4iig',
                channelName: 'vmprbm5xhcw0avn5884m57rm9ndg6uws6l6j09tead0vio4so5y88s8ldcqhxkp7w67syga8c4es1f7urm3fmag9b8dre2wzp857a4snev1q9vv79fjssjxs7pk85a2hm7rewz0kt07aciwuz4tyctnxya55ox0m',
                detail: 'Libero vitae voluptas inventore qui. Maxime eos impedit impedit occaecati magni. Laborum sed tempora sed labore temporibus qui et iusto.',
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
                id: 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c',
                tenantId: '8a31e12b-018d-43e9-8d58-8746bae6b01a',
                tenantCode: 'ikspybkmlh0io32zsvqgoh6op0xfsbq1riyow5tncori3e81t6',
                systemId: '484039ed-36fe-48ad-9862-3ee3a36c0f04',
                systemName: '0siyemmrdmrxw9gu9vho',
                executionId: '656afb0e-aeb8-4710-905d-df224440e09a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 17:55:28',
                executionMonitoringStartAt: '2020-07-29 23:10:16',
                executionMonitoringEndAt: '2020-07-29 19:51:13',
                status: 'ERROR',
                channelHash: '55foetx2v94tcxblty5s63f6m314alx45psx6dpv',
                channelSapId: 'ek896ktdlu11ilxigztu3wf9f99eqwh4kwg6p63hxy2f7hjzfgl',
                channelParty: 'wmmcmcefaxrovalpjjux1au5wt4z9l5zne1dv8wrkuuqf1cdsfr5zwc3505jlycocu5p5r18igh238w2co5qynji2w8j04jruoylbcngjrjr2q9myu2a2et9pfqj0fz2nxn3wd4z66htekg0us674j7t85pcdasu',
                channelComponent: 'da8h91uk2x0757985ikp9q04ui8loa7psvr9qhjo7kajyc4mvhtonr14lex5fwhm0sn9i2dksysr3a8nohpytda4mz22z506z7unau4ivbbqs1ouy3pwcnq5mgic9zthvagw3j135qs3jpps4lmkmtlmc2f4fegg',
                channelName: 'xu3bgzcy9146ycskk4wyr4ymqovj8bn09i2sinielhu8m3hcrsg3mkm873mv5i1hreoff7c2gqiw7re74q0147oiy5uc0hrkpy9maa7fhl1iz5drbjc75570wid3owqyntommpxiwzd4q6l5bceaihfmt3tlk6a5',
                detail: 'Quaerat beatae quod aut omnis quo velit sunt ab delectus. Rerum consequatur blanditiis perspiciatis omnis impedit et ipsa. Cum veritatis autem autem ea et expedita incidunt incidunt. Nihil et sed.',
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
                id: 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c',
                tenantId: '8a31e12b-018d-43e9-8d58-8746bae6b01a',
                tenantCode: 'tmpyq68o34owgbhe206iedz15lws5gpx0ovc1pn179jm8hc3cg',
                systemId: '484039ed-36fe-48ad-9862-3ee3a36c0f04',
                systemName: '60fvwjnls89cz5qulq4f',
                executionId: '656afb0e-aeb8-4710-905d-df224440e09a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 08:59:39',
                executionMonitoringStartAt: '2020-07-29 12:18:15',
                executionMonitoringEndAt: '2020-07-29 13:30:26',
                status: 'UNKNOWN',
                channelHash: '1swehzre1maljgnldardlep0fya2m4lwg5f3k34d',
                channelSapId: 'ebeewve1o3p4wy5a5c247vnqm23up22dsot73pmmd78yr8zxj2',
                channelParty: '09k6of1v5netzjrlyp1wmjb3q3t7cdo5z26qvzxrv52jlfisd6racsm9d2nbos7btlwjl6x506jsn9fumie9ar7tbgoirt3bequafi5xhr2vvlkso87n84vkk0y7y8f480av8xqn7q38idey525nwf7ntszgqe4wx',
                channelComponent: 'rc9zahqbo3si9qebbhiom12osc1gxrmv05a1inh5fiac5qoy1jmpcjiavbwyifxwmzmkq9d7n1r9azhmmoq8mz82wjcilhd5b6ljfeajt8h63g63t175its8wj6ucmf5evo2nxcti3gn66m8hy0l3htc6u7wxbi0',
                channelName: 'nr5l2b7q4u1k8n4js14pmr9su997jcr5y5ti9pv91eiweimabw26y7nq838lj431iayqcdumkg33xfsyldpjtfr39o9j23q8ddgq45ncpzni01eebrmnq7grga5i67hyaxh8r4k099kccc47bafw2dha2oadyu6c',
                detail: 'Ullam quisquam et aperiam nostrum reiciendis vel. Ea cupiditate aut. Rerum doloribus ad odio omnis deleniti qui harum dicta. Ipsa est officiis qui nostrum odit quisquam minus.',
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
                id: 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c',
                tenantId: '8a31e12b-018d-43e9-8d58-8746bae6b01a',
                tenantCode: '7dmztli1wiuk2g25gn2zq2bihwokyhcr2wjlhgyqcizi0xx0b4',
                systemId: '484039ed-36fe-48ad-9862-3ee3a36c0f04',
                systemName: 'dfroxl9yid1qvy6dguim',
                executionId: '656afb0e-aeb8-4710-905d-df224440e09a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 13:08:06',
                executionMonitoringStartAt: '2020-07-29 06:14:35',
                executionMonitoringEndAt: '2020-07-29 13:07:02',
                status: 'INACTIVE',
                channelHash: 'of9rz99wgeo2r9y3w6pdii218wdhtplm3cisrudq',
                channelSapId: 'qtphrqmwtg73hdndsljllv1vem7o1m771ri5or63zq24znfr32',
                channelParty: 'nd1o2f70wz7ifee8h4yqkjfdmnpmx5hgwyumudc1ognsw9i5jt53md04z0khjzntdxesa3zf6c97cygn8ap7c11u0o07hzvio2yrc8ndyl5azazmhv5aabg4o8fgpf7elyudqe9a31hgsmnvlyayw0g64p79uiai',
                channelComponent: 'yvoo9q4donh407dppz19bnh03as7q16gu0s652s6nt9zbjhjx6uh7ac5d19dfl4neh4szaxgzzli97simxsuwdphzih22xbsqdr6ubmog0j03ntusvk94avswrjuw83o87w72pi3zlwvfd1ff6sdkfott85q0wcvx',
                channelName: 't2iq7z6aem31ijiba41fpczy8u2jinos3tthczzwzzkzbxw67fnxe9yed5kpi5qqauljsoqebgtcwe82grbjthi8llkd80gbhfvqrxq7euhwlklya7h3r35xxizr8u987y2re4m2knqkqoa4l8rodhmzhlpeqbtc',
                detail: 'Asperiores et adipisci nihil porro libero tempore enim quas alias. Ratione autem fuga perspiciatis accusantium eveniet. Repudiandae aut mollitia quis sunt quod voluptas. Numquam iusto saepe.',
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
                id: 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c',
                tenantId: '8a31e12b-018d-43e9-8d58-8746bae6b01a',
                tenantCode: 'z27e0gzxpf1y195i4drosbb84lm7m9lhb0syslsjwqxrj70iez',
                systemId: '484039ed-36fe-48ad-9862-3ee3a36c0f04',
                systemName: 'wt00uhw9xh9m2mgunpk5',
                executionId: '656afb0e-aeb8-4710-905d-df224440e09a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 14:57:53',
                executionMonitoringStartAt: '2020-07-29 02:13:46',
                executionMonitoringEndAt: '2020-07-29 18:19:20',
                status: 'UNREGISTERED',
                channelHash: 'r1gckcpw00fbfssu1w7lxavuzp8tjj5oiqlgnxm3',
                channelSapId: 'vsel0mmop0jquegud4s9nbtibmd98bcz57aeqyxg1qempmuegv',
                channelParty: 'wmymf7jxrxid68gag5intnkwl0a8haisbjv3d5j01js4vpq992t7w3p7tbh3tf1r3gxrz2i85q44eb46kjrddsaim0mabqam84ffc7xh94glbk180vukcf7wj2x8wlymwdfwowydu9evlh60l1nmx663jr7dejnw',
                channelComponent: 'nrlc20bvjztlswyi5voe0e594f97ef89g1dfb47bj9s6c1n7h6n1846ezkff49vnommuwa6n3wmdot6yyjoscyrijbv9h1nfg6e1upqgpbtyovm4c81ib1sehva5akykxea0x83bkczzmqx5ivj7xnl33cnaps4k',
                channelName: 'wt4f8ukx8b86xrkpmcg2rh89pnrju0auqjfiaxwwnmgdpvc87t2to66gw616lpehr9utyvniz236fzxhkfvjgdu2qmdzgeenac7wkstacgmq3rc5lsfeesuiye39dhzy9z818vqjacb0bx9pqfrybmqq4obpeqiuj',
                detail: 'At laudantium culpa reiciendis debitis eaque. Labore sed itaque quis eum eum aut. Consequatur iure voluptatibus ut consequatur fuga reprehenderit. Vel consequatur rerum asperiores ducimus sunt rerum ipsam repudiandae commodi. Quia doloribus architecto dicta fuga illo perspiciatis odio ullam.',
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
                id: 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c',
                tenantId: '8a31e12b-018d-43e9-8d58-8746bae6b01a',
                tenantCode: '7axbwwj2d6ecqar2vyccbqfqqgowdrpeyzgn1mxukg1rpav8zu',
                systemId: '484039ed-36fe-48ad-9862-3ee3a36c0f04',
                systemName: 'f907lfzykgdujztz47v8',
                executionId: '656afb0e-aeb8-4710-905d-df224440e09a',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-29 02:22:56',
                executionMonitoringStartAt: '2020-07-29 15:32:22',
                executionMonitoringEndAt: '2020-07-29 18:06:53',
                status: 'STOPPED',
                channelHash: 'q3nythlur8l981kq2lvfgcsou2n36k9flpu3bm5n',
                channelSapId: 'hy24ugtxyxkmyh9w57r9qbb7rg7d0k7fvfah8oc234b74hlg76',
                channelParty: '8hxoytktgu6535l2373b250gru4ht0oevbavl5ft5rhv0fil8igsf44cbju3bskkt66g38z698ws528c2vwa5arwl5uqgtqacayk33qkv0lukwz2dqx3ctf90uhzg8zz0yznzuyrjvgfsy7htpl5paremqj1bqb1',
                channelComponent: 'w2pajgk1imuq31rezcyczjvyo1flpm654qr13gsuf1i6bkqvo4andz1yk1qqzk2rovx8nnhx2fx9ef80u12y1kh04avm9e0a02x0lhff9w77givea525ny67xnj2sf08bgfxvf3sp73mzkcbdw1y4dg66pr7hjuj',
                channelName: 'wubu9h1nbjqd4iwz8qa3xf1a175h0uwxvknymriy56rvoyci8new9mnbmr1q83y95or3hj5mgiyjg9c6bt701wah4jeo4cj0c1btjvcm5f1xinjm0fkdqz3v85jjeqe5cnuheaf8189ou1t47o9l16o2re5ftgwd',
                detail: 'Veritatis deserunt quia deleniti. Vel rem quisquam. Id quia sit sequi recusandae architecto. Est iure quidem dolor in sequi tempora magni ea.',
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
                id: 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c',
                tenantId: '8a31e12b-018d-43e9-8d58-8746bae6b01a',
                tenantCode: 'k6jorevex5wbeian2ilfihotn2zjuh17xjq5di1l8rh67x5l1z',
                systemId: '484039ed-36fe-48ad-9862-3ee3a36c0f04',
                systemName: 'uxmi52kyekt5xyfelf7m',
                executionId: '656afb0e-aeb8-4710-905d-df224440e09a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:23:43',
                executionMonitoringStartAt: '2020-07-29 08:54:49',
                executionMonitoringEndAt: '2020-07-29 18:48:45',
                status: 'XXXX',
                channelHash: 'fjajhq3gjvbgwr77ccrwx0xhky1ohw0vi780tu1f',
                channelSapId: 'mxz1fmgj5jt3v8xsou2athf5d2qi3hpwy28kxf8o8e8kjqojl0',
                channelParty: 'sdfmbuvnv54it72glib34quq051ro8wl12mvvgrrb0m3cut2y305v0f4kc9us4seo655m4be9euoyteg6s9xx4dqtwshpyguv4l4do83pmzfev1v6bafdspr7qdiu0ztqkhyjfohv2ql3h657n13fiagyoqiguzz',
                channelComponent: 'pn1o1yio6hosgjzj9a9z4f1fmiokgdt7c14omtrovacf5vq3gcc9euyyoldxzzrg6bp9o4ry8rjxwhmzs463rs02iarvx8rlpnwoxv7vgy38d764lrc2tl3f144huqdkwuseneh8z2hezfdikjviwrqzwto0okab',
                channelName: 'sqy8uby1mh08ah0jhyxnyjju70bblr9sc79iycmgcwphkbqypay4rdn24lfapwxtf31qd1v6ful2r9mjcj3pf1ymawinssdwru43okkovgpv9kszmcmpytaqxg5gni8hhgqd2xljo93jsn36vw6hhnb0rsj4jn7s',
                detail: 'Adipisci iste accusamus itaque harum. Id ut voluptatibus autem. Tempore voluptas debitis est. Laboriosam et sed ut sunt sit occaecati molestias quidem tenetur. Perferendis deserunt doloribus esse ea neque qui fugit hic excepturi. Velit placeat est.',
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
                id: 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c',
                tenantId: '8a31e12b-018d-43e9-8d58-8746bae6b01a',
                tenantCode: 'xpurcvdfm9xkg7w3njp32j11d41m11zyu54q4bugiuwxtrdu27',
                systemId: '484039ed-36fe-48ad-9862-3ee3a36c0f04',
                systemName: 'gjihhus7m9gqt78ulm32',
                executionId: '656afb0e-aeb8-4710-905d-df224440e09a',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-29 07:09:17',
                executionMonitoringEndAt: '2020-07-29 21:39:45',
                status: 'INACTIVE',
                channelHash: 'vcz2u2k4r1dttjjlnajf04azu9nk7mutf1wgp9vt',
                channelSapId: 'm9oxk4889h9sh9w0qmddocixfmnwwyfuqrfk5vcnrunfmxvep1',
                channelParty: 'nx5hqvn1a1afy8lh792q6fqfehn9r2uiho3l3eoh1ifvux5yes483apxcnbh5z5b3gp7svqocpn10sm9zwvawjtzk4aqkrky7jginpfyq3hgbyf4658ld5ii12whdm9968r1neoo7e6nedsxaly6yv0e0nqdb9b8',
                channelComponent: '6dxfjdn3qa95b072wqumrmw6vxtkb0vgtv5doxbyb9frx0xzteg8tr0ite3ltdx9uzr5ezpwwe93wujw8j429040lxtk4tpsq04s6ssiqx8pp8hjeb0gwsfa2ln8ztm3kxk4qid1do76l7bqpt3mg2v7wu7fgbve',
                channelName: 'p5kwg0r5itdzoaur17q4mpbvbj02v418y8jlr2iiwwvpaw2fgql6mhmzqma46qvkai2i9ijirf2zskiykkpqq56tthtpb99lng8e8pfptwacus9asqlgwm5kxg8w80ummoyonb5zfmvyb5mizbg8v6y5ywr40xoq',
                detail: 'Libero qui aut tenetur. Est culpa eaque rerum sapiente ullam. Labore sunt sed quidem. Aut sed sit voluptas nesciunt similique laboriosam quod occaecati.',
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
                id: 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c',
                tenantId: '8a31e12b-018d-43e9-8d58-8746bae6b01a',
                tenantCode: '4bn7xpp54p2viwzq2vouk1eykvpj2hhheqdz2rdpadsjrzvrow',
                systemId: '484039ed-36fe-48ad-9862-3ee3a36c0f04',
                systemName: '5s8dfyl9n0n15ww0oay5',
                executionId: '656afb0e-aeb8-4710-905d-df224440e09a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 02:49:53',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-30 00:58:07',
                status: 'SUCCESSFUL',
                channelHash: 'ddwms6emgqwebr21ykl5wj41vfzrwudtr2jqyzuv',
                channelSapId: 'kl9qy0vsn57dw61bxbd70od912vd3qn1clm57got155u2t0juo',
                channelParty: 'jkmhchaykl2vl9qpcexrfimhc30bwmv88pnqre0rr5hd3p0sislwkdg4dykkb81kl2r28wtpjb76kpo8uhdln638o28yuom9bycj9e4j8c06o6cvxwof9yd2twndf946k2jqffefaxeup219p6yby3kq108wy4kb',
                channelComponent: 'niwlg6wbrwepnqstb6c0tqir19n5zqjgykorzfdai8bwwaylpl21p1cgm2hhxk2c0vorqsq320ye19t4yy6463yb17wllr1w5seo9mcnt65a68dty7fwsy714771tklmbdeohqo10fw5poux4yo8o7qcuch8akap',
                channelName: '3mv7ug8v9xcirn4ju8s3o82tz2p8en3e4f28va2vlaiv7hcdygb2y3sxwu9cwjf866kb23yo35m6mvbjb5igyheoaemhn4f4ti7lo0lbao0g8gjzz80iwbr8gpj8okfcp8xed8cbujz73mumutvllzo2d4kwautk',
                detail: 'Adipisci consequuntur dolorem molestiae laudantium voluptatem maiores culpa autem maiores. Molestiae et libero. Eum quis iusto commodi qui repudiandae. Earum quod est in sunt voluptas eum sed consectetur. Odit quia beatae in dicta voluptatem dolorem aut.',
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
                id: 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c',
                tenantId: '8a31e12b-018d-43e9-8d58-8746bae6b01a',
                tenantCode: '30w2jvd3c0naqarbu8dbfea7cazg7t78epcca2zo7bgr5gqkql',
                systemId: '484039ed-36fe-48ad-9862-3ee3a36c0f04',
                systemName: 'ep73yptmsijh5tx3l8o3',
                executionId: '656afb0e-aeb8-4710-905d-df224440e09a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 17:47:30',
                executionMonitoringStartAt: '2020-07-29 03:05:54',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'SUCCESSFUL',
                channelHash: 'qpyv9wdycdq508j5p4hbdfohwryehn51zq7mbuea',
                channelSapId: 'uy9l4e199r9f9m3qkxbzrix54bpuzp67ue2i42i0xy83csvn03',
                channelParty: 'ocnbuqnmeo7u09j5dtddipoahehfe4719n12l27f8tkvqb7a4cha3e5vudtem6vfip2sytp4vg3tnxkbpqri3obabj23nitvrr4nojym3eui4vjd70vmg5xfibgpik3sy1eg9btbatplayy03u24707d4s47hfs7',
                channelComponent: 'pto2mykqvoarw45y1xvq5c0e7bwgt3hir9ko8ao1pmcouhg6r9aw7rfvczzs9i4bdvs8udwrmc84fxjmsl632kk6boemarulm0gu6tz6p3vqyufwrtanui7z8rfp3z7u28mj8s42o866frc2tjkw7y40olr6gup6',
                channelName: '6q29ew5tzq4w3vi41h3y0aaqczyyjgenapass5ne46nr8ve6fmjeik3j6gbhyg8si6hvvno9883hyarbbwbvk4vr0wfcaz1npon082zvomatyvf25kqnbclco8xkojllm957ramdapcdjiut3eflmfvoq951qtva',
                detail: 'Cumque et aut. Hic qui vitae. Quae quis aliquid et dolorem nostrum excepturi eius.',
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
                id: 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c',
                tenantId: '8a31e12b-018d-43e9-8d58-8746bae6b01a',
                tenantCode: 'zp9b3odld05gu5rg9y9ps2ww1n9whu6rl4nta2010avvutyvlu',
                systemId: '484039ed-36fe-48ad-9862-3ee3a36c0f04',
                systemName: 'px8w9jphmx08medlag8t',
                executionId: '656afb0e-aeb8-4710-905d-df224440e09a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 17:34:53',
                executionMonitoringStartAt: '2020-07-29 09:37:41',
                executionMonitoringEndAt: '2020-07-29 05:57:11',
                status: 'INACTIVE',
                channelHash: 'y4lztphu8z2mjc17iurdbzp9xi1v5aj8e73dg4us',
                channelSapId: '7nrr6yfh3osa9e7fia0infs9294xwbh6a6j8e80bd9vsm01jze',
                channelParty: 'k05exwjdwzyf7caf8majmlj4uj8vd5okm94oc7aesvae4e31tebcsewdrkatsuvwfzytp6muo6qsllk6m77zt5c3hlzaifmky4rywf4rs7bolhfj5awnoaqmkm1h6oquzt6rzive00m0o8xnuiu2h01oql3xjoxb',
                channelComponent: 'lfu37cal98t9zbd7fdx6on6jb38zrr28yfaagrvszmf580grppodazwe7pvzpznza78upgvs50z4tgn0uf1yrudonmhadnmh7btpy2guj3k9axjev54hq74wvgpqwt8zvgv70y1bb78gohvvyiuoxc2nq4qg1zi8',
                channelName: '1a44sz4ydg6r3p0rh3didwysuhwooindceuzjyzyvm4a8mhnd8unedd27veg549a56gy6dibh16sdiowvfyt3m8nqylycc6j8hjj3b86tt4dpyk10ecmb02axqp71ri6b61f795wr3q8w7zjjwg02b5efiagme8s',
                detail: 'Debitis necessitatibus dolore. Laboriosam deleniti natus nostrum voluptates saepe. Illum unde quis vero qui quia cumque. Autem recusandae praesentium quia nisi perspiciatis consequuntur sed voluptas delectus. Veritatis ad tempore sed ullam reiciendis quis.',
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
                        value   : '8af5cba5-ebca-4ca0-a384-87d5eab2d189'
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
                        value   : 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c'));
    });

    test(`/REST:GET bplus-it-sappi/channel-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-detail/6672d6d4-6e5e-4afe-a158-fca5bd96a0c9')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/channel-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-detail/c4bb892b-4cb5-4747-bc8b-390d5d0d139c')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c'));
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
                
                id: '5a4a978b-438a-4593-8ddb-7c9093b3455f',
                tenantId: '93fab458-6094-465f-8a98-b590f3cd336d',
                tenantCode: 'g9oufe7pnwgopvnhog95zhzim4lc7xshps4r9y82klygbl3x0y',
                systemId: '01fdb959-af6c-4ecb-b36f-1872a82e0316',
                systemName: 'pskw21kx90x42r4kj425',
                executionId: 'eec01a91-0c1a-4fe9-a3e3-06d0d8bdbd3a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 09:58:25',
                executionMonitoringStartAt: '2020-07-29 01:35:04',
                executionMonitoringEndAt: '2020-07-29 05:26:06',
                status: 'SUCCESSFUL',
                channelHash: 'mnfu7kw5ogq5s8qe2i0l1kfbn8mvvbo4o66igkgm',
                channelSapId: '3kjr0xtq8vioqft1pupry8qbye1cqd8tij8k3px3qq3gab0a6g',
                channelParty: 'vnn95sjum0ul52ladelkhpj2wwn4o2uiw9wj7ltyab3x9ru3pvjaly1ymatqb1t79yaxnz7tfb64pd1ug1ebf8i8jz712a77m5gahkpqmo8r50jo8o4oe60jvdveww0gr44ogh43j9eqxlewt5rznv4cbi6cm70j',
                channelComponent: '84yhx73r9siberkvuwtx903cj0zsn0ag6lkf4d0of9f7wvwajz723xgu3tqt8rillrkzgsau7rse6mxsoso5gynv5zlpkzymp7cudyv1by98ptg7jmxdto39hykjyq4agwnc0z4b1m1bbxqt1bg0j7d1nct4bhmc',
                channelName: 'oh9hks5wedf4sfrced32x6nf5qpfzvsm1j41zx3kw7c8gh6nltq3u4232hd7y4zwm9cfkpnag7tl6x4n6vn7vhen1mdt1kvvn3ysu47zthiyrkayhnal2cpunpap4tfz14n92hbx3zbg2bls0tlb0wprvlm78ecb',
                detail: 'Atque quia nihil quaerat quibusdam tempore est. Nihil laborum voluptas dolorem tempora velit voluptatem quae. Et eaque iusto magnam suscipit rerum cum. Ea autem veritatis quae recusandae consequatur et perspiciatis et tempore. Architecto nesciunt facilis ea ut qui. Porro aut non at.',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c',
                tenantId: '8a31e12b-018d-43e9-8d58-8746bae6b01a',
                tenantCode: 'k4gxs1rbk5v2jvylpu487shlk6idrh6effjqohjw20hxxlcbpi',
                systemId: '484039ed-36fe-48ad-9862-3ee3a36c0f04',
                systemName: '56yyao6aa12da8c8w3le',
                executionId: '656afb0e-aeb8-4710-905d-df224440e09a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 05:20:51',
                executionMonitoringStartAt: '2020-07-29 17:42:15',
                executionMonitoringEndAt: '2020-07-29 12:31:17',
                status: 'UNKNOWN',
                channelHash: 'ih24rk5su550q2r9ufok5m4n9b1ffi4cpvnt6bqa',
                channelSapId: 'a4jjfvquclvn50yh5f49tciit0c94wm0liei5b4eyfaexb7wck',
                channelParty: 'kaej5atwgp4ilmyhcnw0jmiyyvz65mnvnxm3fpzsmnifw53x4173v543o7o0qm6cqqdyvnppec16bdxb2ob7oc5l4qo3bf6myh64ouovr0ql605q1v89xezcrr6nlopy28nhwvvho1wnxtbef17v15ru8t9hiri5',
                channelComponent: '1ium8x7dahgq3kbvkx6z6v821e6zdeqy8c6ru0lju2pocevedmgmtrge58vhnakuhv63houeypc84jgdrqyb7xy5axg2pklivf9upjj6eatym7b2kcklcyr52yvcfosw1ztort3kve5y05jpbcm14l7c4yyp28mp',
                channelName: 'xvqs0kmpgl023fj4qmevbyp4xw2q02jnsk8e31zhahaog8vepqyg1ph9nn22j86278ddx6hwmv978s818om49yte1assc0vb9wz7wiglb3aervl4ducz1h9g644ffc0h36g0eewhctgopa71d3ybunj6kgms6yza',
                detail: 'Voluptatem inventore voluptatem nam necessitatibus. Iste nostrum libero quaerat. Quo illum quia eveniet dolore ducimus voluptatum.',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c'));
    });

    test(`/REST:DELETE bplus-it-sappi/channel-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel-detail/2e85c733-03cf-4b36-8d3e-307e2f028288')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/channel-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel-detail/c4bb892b-4cb5-4747-bc8b-390d5d0d139c')
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
                        id: '37513514-f509-4420-a915-75cdd9cea1c0',
                        tenantId: '8a31e12b-018d-43e9-8d58-8746bae6b01a',
                        tenantCode: '6m7jm55s3web8mxck9o32hjdt22etiq5kh11nj273ot7co2vc2',
                        systemId: '484039ed-36fe-48ad-9862-3ee3a36c0f04',
                        systemName: 'q0fafwlawquuqywl3nw2',
                        executionId: '656afb0e-aeb8-4710-905d-df224440e09a',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 06:19:47',
                        executionMonitoringStartAt: '2020-07-29 21:54:10',
                        executionMonitoringEndAt: '2020-07-29 20:03:16',
                        status: 'STOPPED',
                        channelHash: 'r0fj8bd2r68brmbmbfjjvg9ifyyx4s6ik3e8p7bv',
                        channelSapId: 'zt0u4khlgm18so5plrbzmxoi1l46e4stksoqoh1xq9zj3uii0d',
                        channelParty: 'sx3e32tssdmkn1cpc0qm4yejnnazwjc0ci5gpz50kvp7nqmjnpx16l3ldv417jgpoxyzozdcugd2pac537x33h0lzti54rrwy37k4s1flgtlgr0aqfpphvzy2vsd9a4qkrki1ow05z4gbkrbfpq5btu6zh4tjhlv',
                        channelComponent: 've2ijjw0k2t6y155aedcxpf2xutsukr559mp1socbet677papbsewt48hybaxhptm8vtek1l3cms0l5t46czewmccrcyom0xnbnsj8mqbb5qv2f9ggv0ft24j63ea4uj5e5iknq07mdi792mcgx3tiv9ev7005x8',
                        channelName: 'fvbnpkdyng1666z0ppl3akbwknigp4sdjfo90kl21mlamit3bzv66qsni910hr2g5kaxgc2kshpiwvkgjjjclb7op5odvysazi8151gizue4jfb7ka7c2dhdts7p1bzs4n0ve7lzarntpfq47q8fdb9x814r62z4',
                        detail: 'Iusto in vel perspiciatis qui ut suscipit et et sint. Est quidem in aut aut voluptas voluptatem occaecati. Asperiores dolor aut ab nihil ut voluptatem sit ab. Et doloribus quidem. Iste esse eos esse. Dolorem repellendus debitis quo voluptatibus.',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannelDetail).toHaveProperty('id', '37513514-f509-4420-a915-75cdd9cea1c0');
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
                            value   : '524fc306-0bf8-497c-ab3d-17b181209dda'
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
                            value   : 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelDetail.id).toStrictEqual('c4bb892b-4cb5-4747-bc8b-390d5d0d139c');
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
                    id: 'fe640a9e-cc14-480f-b62f-59ad31c75d6c'
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
                    id: 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelDetailById.id).toStrictEqual('c4bb892b-4cb5-4747-bc8b-390d5d0d139c');
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
                        
                        id: '4805b608-2402-4412-994b-867c26f833e3',
                        tenantId: 'ce08fe30-3ce0-4d34-bcc6-ca561e8ab62c',
                        tenantCode: '1nlp4vav802orfq7dbkzktsh3nwdm1tyq6wrqdb0jz9rwj2iuw',
                        systemId: '26565670-9d69-4743-b3bb-80cc86a53eb5',
                        systemName: 'noc4fk5reak38ejo6dgr',
                        executionId: '63ec1b4f-ffc9-4ab0-a890-70f9e56d232b',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-29 16:34:00',
                        executionMonitoringStartAt: '2020-07-29 10:42:35',
                        executionMonitoringEndAt: '2020-07-29 21:17:48',
                        status: 'SUCCESSFUL',
                        channelHash: 'y9n6wb7g3jkzw4ijp5hmpi6vwdu7dquwnse1vl05',
                        channelSapId: 'vugksgwn8rjcn91gkyoalopdsobs3nr4i3qzrmxb4ww841gmip',
                        channelParty: 'tbcgpkqiklq2h5rczvwj6kccwuo6bj6d13urnofchpoaixkdvp5ro8izpdf0xqy9d1d13qptk75cvttlt6lub62i9ilgts2zhwtd7c9l5mfaq89rtdgetm28h5obd7t3oemfzzcxdmp5hjsocgdhy2xzuti3l5li',
                        channelComponent: 'ihg9sdoic414fwoj1cb3va9cjrabzc58rrn1orov81vro7mackqrpvh3ef7wb5t8mc060h5tu6wfpnlpqf6hmtm5obmdf0arlu9uj0cb64ub9l6f8x4tv3ffsyuafk0v3enyrh2cb61bmsuh639itka8903u0pov',
                        channelName: 'gv9ljl2ojprjx3g4o5jyj0bgigyx1rplrn0j8pwuadonp6fg5ywgwk5q0kv3onflyg8m9rsmd6ca9w1qm6t86oludug7d00w74szt7uoftir8ydk0d4cq1jk9u51ajfktxxo9y3ko7p49dd2xtxxad86gnnie446',
                        detail: 'Asperiores quia libero vel ea perferendis vero aut. Dolorum amet at facere voluptatibus mollitia exercitationem est eum sint. Ipsam tenetur maxime enim quae. Eligendi incidunt magnam odio qui.',
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
                        
                        id: 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c',
                        tenantId: '8a31e12b-018d-43e9-8d58-8746bae6b01a',
                        tenantCode: 'e569g6yqjws07j445t0ao4riz6p4yif3x4tpek56f58ctu7x6x',
                        systemId: '484039ed-36fe-48ad-9862-3ee3a36c0f04',
                        systemName: 'mbypu7dfwlwtht9glxis',
                        executionId: '656afb0e-aeb8-4710-905d-df224440e09a',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 14:38:33',
                        executionMonitoringStartAt: '2020-07-29 15:43:13',
                        executionMonitoringEndAt: '2020-07-30 00:04:17',
                        status: 'UNREGISTERED',
                        channelHash: '380avhv6fcsy8c02pcyvwf5p40i4qmh9bkz6m1t5',
                        channelSapId: 'cfta3rfqvnac6uhn8pxnxss3j8a12lp89uitdulh8hvzbtap2w',
                        channelParty: '74pt825yf62tjkysd51sju21og84az7wgbofc34rwrpgzk4aifo9vvvgy76ifvqt41xrkleu51zkfcat5fxez43tzpjozulp6zy3jlnzaw8dhke64mxh3hozk17056km9yjhj7fcss89lrs6wyximixivnf54mta',
                        channelComponent: '3x3afyip5942eqsa2b3by7z66dro4cok9vu6lawhmk46wletgorj1f8s5je7bdd6pi2tg75oajdso40vowmvq6im8c4j1ki8rojcuehlvijpf36soq8rwznxn2g85kg2s2stkdqbc5825miqju7kqj37uskawhg4',
                        channelName: '5e2wyf374u2x520dqumwd66bxlqslyiikco0gfv4gvg01j2frwdmv9x7xjvno5bw3nfkcekayby4obeeer0zxyu4awvx3yccr5ilva0c92xocw8zfaxoptj1i1ypsvkieenp17iq0yb5yjub0yp67rm1v7qomb6o',
                        detail: 'Iure tempora repellat minima magnam necessitatibus et. Ipsam deserunt aspernatur non magni eveniet provident doloribus. Nesciunt neque explicabo nulla hic unde reprehenderit.',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannelDetail.id).toStrictEqual('c4bb892b-4cb5-4747-bc8b-390d5d0d139c');
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
                    id: '52bc6377-7c85-4219-9121-3778ab693e6f'
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
                    id: 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelDetailById.id).toStrictEqual('c4bb892b-4cb5-4747-bc8b-390d5d0d139c');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});