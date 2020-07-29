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
                tenantId: '8432aec6-22c2-49a2-a5ce-987bb6221ca4',
                tenantCode: '8zplz0b5egl5ih2yiq4ux7t4clcrq7cdu9ntb7oyhmfwa4r0wj',
                systemId: '51c31370-5ea2-4417-836c-5841d6811822',
                systemName: 'omknwd305c3rl2odrtx3',
                executionId: 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 12:13:42',
                executionMonitoringStartAt: '2020-07-29 12:38:39',
                executionMonitoringEndAt: '2020-07-28 17:45:12',
                status: 'SUCCESSFUL',
                channelHash: 'mcyck0rd5urpbbmshq0rocimeawt4nc7scdrwnvq',
                channelSapId: '3muear633c1qu2a633pwv4awb2xsxj94tod3sxzharlaky988y',
                channelParty: 'oq5khshr5iwawvgtlcy0ou3munumtn0flj45jl2i029y26icsbguz05c8pi6glq1velur8qzsd0fycfk3qjiyhu162u7mstexywwxf07azglyzsnnb8hyatqpcjl4rdxzeav0r4jesjq9fmxdei3xbfqgoxsxlpp',
                channelComponent: '1y3015vazlyswe91y4dddfzllva71cb42era9i19mpatzfjf60pfd87pj7os9yc93phxzgmo8yxoy9ao60aq3e3wua77o9w8yjgsalsk4dahbqyhso9nfo7hrypdik02nd9w7djomefv6co5paqo9lfexxgj9ojj',
                channelName: 'bbitojglqizc4vrjfa6ifq87se9ibof16qnbebaoc4abo8xj8b56fb5hgh11uejtaszgxhe57s7wzen72e75jwk1c2dttye0gpyw2kew39mhf93abgwtw2wby5wdk8wdy6qg5lz5m6ly3y1w089l87dpsqoktz3z',
                detail: 'Delectus id assumenda voluptates blanditiis voluptas sapiente odio. Fugiat sint sequi placeat aut sed non reprehenderit. Maiores minus eius laudantium quisquam qui quidem fugit odio ut.',
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
                
                tenantId: '8432aec6-22c2-49a2-a5ce-987bb6221ca4',
                tenantCode: 'if5c1nly688ve9w2suujsjh6mn8sh0d10kvch89qc3i0g0ioqv',
                systemId: '51c31370-5ea2-4417-836c-5841d6811822',
                systemName: 'h99ndd8xcfwl53mfepsc',
                executionId: 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 08:39:36',
                executionMonitoringStartAt: '2020-07-29 05:26:40',
                executionMonitoringEndAt: '2020-07-28 18:39:21',
                status: 'STOPPED',
                channelHash: '33717reba7bzg14lamcpbeakn8kkqh1dubvjl1ga',
                channelSapId: 'bfet2wd7jaa9xq2htp18m8c2i2otdv26i3c7rtxcjsn524d92l',
                channelParty: 'jg60z2vk4m8w85nx84n5qdal4ydmuuri38rbach72p2pjm3m1g0s27293mxnixietzcz7eiyaeoomxpav53l6shrgmd7sjd1zbbf8i2quc47sa0j4dbthcnp5bex5lhjd42t2hncrxeyrocrgn8uwm3g2c03t6q6',
                channelComponent: '1p8r343wx87ad8gb3btyykr7b5n1of46nfc5i80vxf448s6ndmxx0iwzvnowl74v6qa4zpn57jyk6lv0zqm01chnu9465w7mpf10ne40o8dwx66se8q558zarvuk6mjkgkjfqgf2kheaz9fyy2q1rk8ddvzfch3r',
                channelName: 'vtendi2slx7xrkrdbegzv17dy4ykpdvxa48oqzb19g3e94eirio8kpbo8f7ug4tg8zix6bdhl63h79fpjvaikwrtb8aam0vzr8pomi38gaim6gjaxu8ierbunhzi1xhk6pb95x4z73cgo1z6mbt6j98ref4v67u0',
                detail: 'Sed et explicabo aut eveniet voluptatem et repellendus ratione est. Id qui autem accusantium. Corporis explicabo quae aut reprehenderit enim ad consequatur.',
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
                id: 'd44fac03-2236-4492-9511-576fe4024c39',
                tenantId: null,
                tenantCode: '2q4supp4oh1xei84mt6zhndg2j3kd2inp73ylzlfznptraym29',
                systemId: '51c31370-5ea2-4417-836c-5841d6811822',
                systemName: 'ayf4wglj8eibrrgm5e76',
                executionId: 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 01:28:05',
                executionMonitoringStartAt: '2020-07-29 02:30:20',
                executionMonitoringEndAt: '2020-07-28 23:33:01',
                status: 'STOPPED',
                channelHash: 'jslfob7uajfqzo4ad5tywzfotf33f0uohkhjz7ym',
                channelSapId: '6yom2br1h2ns5xn2pixcq8qo3rmmc9u05x2hp2hz93epn1lyab',
                channelParty: 'hnoufhmxtwg56uasbixmimjic06ge4n52s30xjbgdl1rlan6igegnxkfpwz937hk53opxpzyyuhgqplsdi16ms28qo7zsy9sthuh7r6hxfa3mi0aj56z425sg4oxb122jlxno0nxua4xk2mc1gxqvjie8aqyqazv',
                channelComponent: 'olgdoez3mwcvledvnnnc13crq4bycj6gqpk62utryqyn2q7b61lmeylz7ywef5xljttukeoibabvfnrdv8j6izg5nbiznm2yja914ph7244gmmtsmdkkvokd0uocb8xu1vq4o0ekfpgvrdmgpsz8m0kcgo4sso9d',
                channelName: 'hsn0mhtdhbo07uqvt7hnxzhailu1gp2wvhp9eit6rlsf5avwfm350fwtiht9wo28dxggoyrd4u80k67gm55goud5eb2s7bnscoa7eizq3t92tdjg9g73byan96jv351nm3ai4zj2rrai44gu7mnq9vysvv0lu8u5',
                detail: 'Facere non possimus sed aperiam ex quo. Quod similique sequi ipsum. Consequuntur veritatis odit qui recusandae temporibus.',
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
                id: 'd44fac03-2236-4492-9511-576fe4024c39',
                
                tenantCode: 'hiunkmh5xxslw2ubrm0e8qirtxuxn07o0u09qmyxblqin7i1hw',
                systemId: '51c31370-5ea2-4417-836c-5841d6811822',
                systemName: 'f39r9qsoa49u2l5kc4c1',
                executionId: 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 15:22:49',
                executionMonitoringStartAt: '2020-07-29 05:12:45',
                executionMonitoringEndAt: '2020-07-28 17:28:42',
                status: 'INACTIVE',
                channelHash: 'ywbq89vadbjczypt3uhgvy7ubrf8qldudkae8xub',
                channelSapId: 'rlwewyr6o85hwz96dyqkrhee325vrfdtzuu46nqsparvj92g8n',
                channelParty: 'avr8g1ip9nhfj59owc081jj6idxalfo214e935cuxxvk5zv4q329hy0c8k96v1x5i8j9iqdpbt7yhdgl2yt7g1i1lah83hk2rvv3pk2fkegody3aqztiayrzzct69m2tw346ne67j0ewksx26sb3k0n19mxm4rce',
                channelComponent: 'c7yakesl21r36j8x0lr1t5ryo1mty3qaol1ihcand0zijvfdsuoiwno11j6j9oxsru83ss6xxt6enjlm59rpsn025p1fxvqwiyeuq2fpu1g2h6rzhdx5xcwtok1oteaz6cqktn8tc09lef97p8zsso41s8omspst',
                channelName: '6f6mq1184qeeisj7bueoprszvkt69zeump2r8omq7l4zv7tljwenqa1r0se9n4rt4f5c06gznx1exfvpyuoqwzm8baq23q3ykjue3c713iva6xb6ip732vxxg0bhmd3lcjunifpxzhkpfjmyegmlob54eg1mbyh0',
                detail: 'Voluptates sed id nostrum est tempore corrupti eos excepturi quos. Omnis qui consequatur alias porro voluptas. Veritatis reprehenderit sit exercitationem. Odit ut totam illo quo vel odit placeat autem. Earum cupiditate vitae qui repellat qui quam voluptates et et.',
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
                id: 'd44fac03-2236-4492-9511-576fe4024c39',
                tenantId: '8432aec6-22c2-49a2-a5ce-987bb6221ca4',
                tenantCode: null,
                systemId: '51c31370-5ea2-4417-836c-5841d6811822',
                systemName: 'huimnuul9hv7azsjqe47',
                executionId: 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 18:53:43',
                executionMonitoringStartAt: '2020-07-29 05:51:26',
                executionMonitoringEndAt: '2020-07-29 13:40:48',
                status: 'SUCCESSFUL',
                channelHash: '30of5xt1un7rv10p0gat27vxoc5cujmw4gtllfok',
                channelSapId: 'ysggu1phalsssyrc8s12myqw0ekxksh0lupdzo7949cf5314ya',
                channelParty: 'ne85zd3x4uz10uordrp9qrl54sk8u1mhu1rzw63i9t6rgqs8ei57w1i5sp89huzuw1alkr8qlj3wt8ff8teu7yxh4cdnuuihrslv9f9o1ayx2lex6rv0d9dudmak9gehne368jgtcqkhzckbf1b255ip8rezha7m',
                channelComponent: 'zbpx11m2ttnii1o8228slicwrhawfhko3sgqgamswf62qpi8k4f9zjto5rha6w1iif1e495mplkrw5btwcg4oxnpejmhkg1ahy8zbm19n0ylb2yd905rex92u8zxh4gvys3w7cku2hbjr8prkhnexh2wialfxj78',
                channelName: 'ynd2jx2zqkhkoqxu9333r244jbxgzamg2zembfwdcajn2jglw07i2lnrz1xqlsuny4m5o6i2u7kxtw0xzs5le9t4rpscutguzaxus03t6x9lhuafqxtfqmn3lhokle7gfasc2vd21eg4n4zyc8wapjxau2vhp0xh',
                detail: 'Aut cum numquam dignissimos officia nesciunt. Ut voluptatibus atque qui deleniti nemo quam facilis et earum. Vero iusto est. Enim minima cumque sit eum. Sequi minima possimus harum blanditiis architecto pariatur sunt.',
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
                id: 'd44fac03-2236-4492-9511-576fe4024c39',
                tenantId: '8432aec6-22c2-49a2-a5ce-987bb6221ca4',
                
                systemId: '51c31370-5ea2-4417-836c-5841d6811822',
                systemName: 'bxr8r4qkpkb51ciy3zcq',
                executionId: 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 13:52:35',
                executionMonitoringStartAt: '2020-07-28 18:53:57',
                executionMonitoringEndAt: '2020-07-29 00:22:51',
                status: 'UNREGISTERED',
                channelHash: '78vx7sp31wlduf9xk4d1t9d7hktwcyw0jmu8trwz',
                channelSapId: 'wk6qe2hkruexpke1dcxa1m033ja1lyf7nnm6cyls4pv7mk7bvg',
                channelParty: 'hsymorw3u56swb3koavgh8csm626y57cl9gzto6tzwul2bgg8lwu1usas0oykl37uc6o1stoabd770yyult7m8j8isvm4lt56vjaqkl6wvyq1jsf7t8z9ypxva2fy1ngd39ibh8fxr250ykaoaxpo80wfwg71zc6',
                channelComponent: 'hep4k3yd0lpfhgbl2f6bxofdtnc6b4ugqcusd2f23w09bfdja7lto4bsem0n820kuubtdqbdlfxfpp1zoigo78f0rzo6s0e0e0vak65aep24rve7kc9tzvu5dfeyzo5lgk6uthzqk69ee6a3akla088cmrgw0iab',
                channelName: 'exoi8mhmjw2bspa9firrspzkb34bonad2kgji3ggeqsh4d7ly4qmf2frmmczd0i4lhmjnuy5d6lif430hsp0l9a27m15owf53s51zedq2oy7fkrw578h4dxqni4u9rqiegb1xebupw1c13r8758rdieoaq6b4ld8',
                detail: 'Enim id autem. Dolor amet dolores. Sit hic qui repellendus id quia ipsum. Est enim inventore sed qui voluptatibus ab delectus nobis.',
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
                id: 'd44fac03-2236-4492-9511-576fe4024c39',
                tenantId: '8432aec6-22c2-49a2-a5ce-987bb6221ca4',
                tenantCode: 'wib68jagxmzxpgzpudg4njrc93285elg7r5qye2cymea7evugt',
                systemId: null,
                systemName: 'u2y2fin4rt2hyng7jf9c',
                executionId: 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 03:12:29',
                executionMonitoringStartAt: '2020-07-28 21:25:20',
                executionMonitoringEndAt: '2020-07-28 18:45:24',
                status: 'UNREGISTERED',
                channelHash: '0sybgl06mkwcnb4lgzx7xhr1qze7g3kvadbuee3p',
                channelSapId: 'ei9iuv6ngczkrn4jlvhkm75sfzc18ot307wnazrob26d50sav4',
                channelParty: '0b45e45q0yg2kp34you5aj3spq6rw6bl5fgfi05mpbys6c7hqjyfm9atjb2aym7rppfth2l3v4pj5hcqgbdkj1a2jrxsdybn9rwhvzet2hjtapjn4c1eed7lktyadrywrfthcvp8axae4avahqbtu6lzeakiol2c',
                channelComponent: 'sxkqnt3tnsciedi3fcwlgc0t8yllafjx0ooiz2e0sm40pz4w50y18ac2v9q7ap9uepf15tjsl7lwa6s7sgw008ia73meb2itooq8ni8rs9xb6z1fxdm91ag3y55a748vonbp8wcqmk9cu9i9l54smre9mu68rkl2',
                channelName: 'dgpa5hcwlvdsjwznmjkg1kehnylkejhmuvowznm3wfy8canqaplwyb0scs9xkhb08z5m8aqoxqjfr4511mbhin7yc6ooym35f6ax8zdfr2ip16ialwjzrumfnj0nhzu12yudmedw9rdhctyf1od5w8pkt38sramv',
                detail: 'Enim possimus molestiae eligendi quidem ea consequuntur sit aut. Rem repellendus autem. Et adipisci modi. Officia atque earum ipsa voluptatibus quaerat doloribus iure deserunt.',
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
                id: 'd44fac03-2236-4492-9511-576fe4024c39',
                tenantId: '8432aec6-22c2-49a2-a5ce-987bb6221ca4',
                tenantCode: 'ce59ol1fq03mikb9iybkzwmr5h46fbv522hs9ltdbyj5w0lfdb',
                
                systemName: 'n3s60nfvth98tbr62yyr',
                executionId: 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 09:26:09',
                executionMonitoringStartAt: '2020-07-29 02:52:22',
                executionMonitoringEndAt: '2020-07-28 21:14:17',
                status: 'INACTIVE',
                channelHash: 'bz6n7tjxbhm7pgt80jud5j56u80wwulnri5ft1ky',
                channelSapId: '036xtyiu8c3vzzh9sfggidbqszzsnqczb033kec59tax7fpsm4',
                channelParty: 'u2rrrf6l382ehns32q11hn36gsbsw3m0qvcil3psl5jg9g7knb9mrgpace60mujr6b7jyw7nozc7cc83ng8ldtukl0yeoxb07sknhp6xru19bq8rd4pzvm4gh6wszt4ds5votxbr988ppdbwrye05j1i78r4nz9r',
                channelComponent: '92lvd918yen6y2qfph576zaumwrhyhh4yjdyvuuqrojtuqwhufhjltgoqa276njv84lzflerb9waim2zu5cq3rw7xecfdim6sdn1n4h16sw0c35q56071wb01rjlhazljoioaefob5kfuqzptl40d2s79nzpxmv2',
                channelName: 'b03xjavoha1kvrx1s5qj2shsuzhscflu7x78i3ghpzanvl6guabltrx80jlqzojwaocgrjojmfb3qkyoy1ivexuh4n89jcxz3ghwkzhyy8frh8a6cq6vi3rpe8km4jfwlrv0mssqcp0gt1m3oez5i6wfodpxf6m2',
                detail: 'Quia corporis fuga. Delectus quos quasi in et. Sit aliquam id dolorum quia consectetur consequatur ea deleniti sint.',
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
                id: 'd44fac03-2236-4492-9511-576fe4024c39',
                tenantId: '8432aec6-22c2-49a2-a5ce-987bb6221ca4',
                tenantCode: 'zll6affesg0rgptvqnkv13wedk3081kq75u0cib5h6dk3t6i5e',
                systemId: '51c31370-5ea2-4417-836c-5841d6811822',
                systemName: null,
                executionId: 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 12:52:04',
                executionMonitoringStartAt: '2020-07-29 06:15:06',
                executionMonitoringEndAt: '2020-07-29 13:10:00',
                status: 'UNREGISTERED',
                channelHash: 'qop7den6zdml8nmmgntomyrirjjoqw2jbqbrn0ni',
                channelSapId: 'hn2j1d58o8p98zlki8zr6ryqb83s60aluj562rlu6atd0iuats',
                channelParty: 'kak9sqfrsdb0u9ol9zbmjm14gu2vimzdo7e944o4k8ds0ojjbgjln7pl94bsfi7hx3tgrqpv05j2racsjvb63q3ei9aa8wqo5fmrqyrcz3nvqyfywftmipimwtqdcv7ry9qspwrvavt4puiheuv28cbqcyo2icrb',
                channelComponent: 'pstx1tiyd1afotgds5xm5i6hn901y9jst67zfzdcor587vswoiqxrxyzfjwjrbh3zdfkhclp7pm33fecamsb1nhzq5f0asehjqgcna3u6y8vl3xzbr6pjiie043pmg9uyfspw03lrze66wzr2smly10j975p3qef',
                channelName: '91nx9i4qx6oluuusng3e7ows6zkz22cv7ql9up8kidfcutnz2949l5kvuc0jww00fcmbrx2yxaf4qqm4oxkpjindq6i9gxa1pow09nhovgowwi5s99ude56vhbqe70njjn1dn07xlswofxxla7oxg8bi9avstq82',
                detail: 'Explicabo fugit suscipit dolores repellat pariatur molestias molestias. Rem dolore illum omnis ut iure tenetur suscipit. Et sapiente qui officia et dolores.',
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
                id: 'd44fac03-2236-4492-9511-576fe4024c39',
                tenantId: '8432aec6-22c2-49a2-a5ce-987bb6221ca4',
                tenantCode: 'aeyo2uu8icynssyvtc71du4x04fppuhfx7lxi94dxs7g7ptesn',
                systemId: '51c31370-5ea2-4417-836c-5841d6811822',
                
                executionId: 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 07:08:48',
                executionMonitoringStartAt: '2020-07-29 00:03:09',
                executionMonitoringEndAt: '2020-07-29 00:35:51',
                status: 'STOPPED',
                channelHash: 'm5rgf1n9b2hmw3nrv72oi15wasvrbwfq5f3fo84m',
                channelSapId: 'jx0lvlrpks0kvo4t28j9gtknf48vi0d9egcajk8h532jfdsny3',
                channelParty: '055gx6i68ijjdfk8ynpow6wpxo9enlcaq50bqz6hpwna3mnl3yc0ueola2zg32hcutb72830no65v4l19qjcvsy4n5o3h0amji0d2p3v9dcp93bz2l3oaeuak8aiomkiaxv56gcjx3cc2sd36j03qaadohwpqicv',
                channelComponent: 'l4k4nx5tmhumy2p8qlo12r04h8oog1topt830pqetgfqrcoyo8aa0j7dwdmp0np9ntb5s6qzpqhngult81yhgqfyhp30qy8u2m5sldec8srasme0jf5ww13ceojr76pgzssezm7aovd2smy3lxqrh1fkivsgh7gm',
                channelName: '3c8di9zah7l28k17evi5l5o68clrem32hvhilhgrgr85tl994s6vqveub421bcgbn6nh3my7x81bl33nzw0tes5a9dmgwo32mdz4rhbvp5lba7x8xyk1kpinb6yzev90qxrfx8890dvo9y7ew0auwjl42z7unm50',
                detail: 'Quod enim et unde atque et earum molestiae minus. Minus soluta nemo. Atque ut voluptates magni. Vero provident dignissimos exercitationem et cum libero quidem dolorem. Aspernatur iure est eligendi eaque iure. Corporis est fuga officiis beatae ex.',
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
                id: 'd44fac03-2236-4492-9511-576fe4024c39',
                tenantId: '8432aec6-22c2-49a2-a5ce-987bb6221ca4',
                tenantCode: 'op59zqwm7pdt9kemhq0ctcc5ir3j1ymykqeyyv3fupmuao5h1j',
                systemId: '51c31370-5ea2-4417-836c-5841d6811822',
                systemName: '79cyxz50zu4kq7k655i4',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 17:20:54',
                executionMonitoringStartAt: '2020-07-29 09:20:31',
                executionMonitoringEndAt: '2020-07-29 13:34:44',
                status: 'SUCCESSFUL',
                channelHash: 'n9fm1uoc9aai0uvy0k5bjc0vks5nce6rgzllitht',
                channelSapId: 'nt28vec1s7qui1x3h3zwpjfmml9vk42j3a13qv168jubizfw3s',
                channelParty: 'uor3jubku88inxjtgbau27p9ebonh78pu00qfte9cnom7vwa1d51na0gre537ahx4vhge6l6rtsk8rkv43zcoo89pjw9vifamwn6khocgkp4b6ocllovi0c51aygnroty02a4azauhtjr6jk1o02qtjujw3rmdjo',
                channelComponent: 'ut3zpxayhb9dmw0ccw81asd5be8g8zqwrhqquu9ghb06mliob5pnh3iz6f688ed76efvhfjlmu0ld62czhytqei84w3djp46635knrz1i42rtv38pln8bhwgr3ryz8bd7shmzigmgoyjotr1a99xkohga2n9vy2p',
                channelName: 'gy7b7vcnyu0dc4ttm3mj531b77vso02h5yukp2ew4rm9buam5s0c2pcmlwz2iw8w1c8cnzcyta8mvasle2wx0tqlgu87248xghfgbvhlrsy6y2yow4hra7bnhllqrk87r6dvkebf59xa87s9zd9toc4o23lmqdgp',
                detail: 'Ipsa qui est id vero. Non aut aut. Cumque adipisci ad sunt voluptatem doloribus autem maxime non.',
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
                id: 'd44fac03-2236-4492-9511-576fe4024c39',
                tenantId: '8432aec6-22c2-49a2-a5ce-987bb6221ca4',
                tenantCode: 'pqd82clyj3gj7ok7sy6umpik54r7cjx2xx43f18zayi1lyby96',
                systemId: '51c31370-5ea2-4417-836c-5841d6811822',
                systemName: 'z3fz3fbfu7y9v3chazpo',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 06:09:17',
                executionMonitoringStartAt: '2020-07-29 03:00:03',
                executionMonitoringEndAt: '2020-07-29 15:27:57',
                status: 'ERROR',
                channelHash: '9iuzezzflcdhyjey373slvikregqi61dnunfsvzx',
                channelSapId: 'j7cd4luiwcaabjt4ny0re1ocivx9zq4xe45ew14vowfxkrv3p5',
                channelParty: 'md52mh6synhdof5hldxzcabucbkp2ho0x26cwoxy2ktsbb9ocf5jllx5dywvsqobm1lqkik44atbv2g4pupmlkgef9xigi8wdx6gcqvzlddakvt8332tzb55k0csp1xz1x0vxfzy5g6aanw3akwz5uug0qhtebd1',
                channelComponent: '080s4tkx74t67yzljyc61rnb0676xyts7onbozf252qn3e3bx5l1r46yfedwxczaey6ewix7cakr87cdg2tx2safm0hfsaxsqsp023phlapo4k4qfdt7juic6rnzgpdkvfov39xfn19yqiyk6otxq9i3rztopf8g',
                channelName: 's4kzri7flo40nk3ei5tivjhk51e9a1zkauap8otjqtyzaq2689m7eduzzbz6c2nd4f421bzp4q2v2q59ltj7i35m5v2egxojm41sgwlxogsszx2otto834przqr5qyfzsgx0hacha2x2xpk9oec1al2pgdr82v5l',
                detail: 'Voluptas placeat magnam vitae consequatur quia praesentium sed repellat non. Ut vero voluptatem nemo enim odio. Dolor reprehenderit cum tenetur iusto. Dolor quibusdam dolores nisi sit excepturi hic voluptatem eveniet quos. Nihil dolores suscipit ut quia dolorem et.',
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
                id: 'd44fac03-2236-4492-9511-576fe4024c39',
                tenantId: '8432aec6-22c2-49a2-a5ce-987bb6221ca4',
                tenantCode: '0fynzyp8uc44vy3diejtkponcrlymx793t95et5cvaxffpqhxe',
                systemId: '51c31370-5ea2-4417-836c-5841d6811822',
                systemName: 'pnoev4adrhcgtuxv78rp',
                executionId: 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c',
                executionType: null,
                executionExecutedAt: '2020-07-29 06:32:12',
                executionMonitoringStartAt: '2020-07-28 19:28:48',
                executionMonitoringEndAt: '2020-07-29 16:38:52',
                status: 'UNREGISTERED',
                channelHash: 'z9piwrszba1se8swjbli8nf5ggwkuhctxe3278ww',
                channelSapId: '855jkdj2qop60qfmyt159zr1kv9nesoquh6m6s9s87a3k87wkz',
                channelParty: 'xy65csgbth88wt99t4ab8a7vwiu8nmk21h9rfo0t5kicx49d3so3ii5f35cyta0qpt53nadytkgcyjd3n83szwzi2qtubpf58lxjv2ksk2uxnhhk7o6o9hx56uk9vt956d9tamowyqaoy1zfp54px0gz1sodklbq',
                channelComponent: 'apb57s5xv9k17k7ie2jelcotnstfvaubskatc5ydkjltfbbhdoeqc0rk294cl19aocmd7g3yyngv27rp4c753imksax906me1sba6plj2e9vz78uovh2ibsoah635dnsmj4jn9hqme81fxkk3ekjkol1mtpws5fh',
                channelName: 'iafmdss329ssp1rtp8vhf74qrxpwd0qvrt8tiebfdr21fmxlgphz317nzx17cy0shq80wg21vte64ekg06a8fulgjjn7hypqq551j2q83kmfxbq7bnaydhubgtzoykj7bqluhsav51buzz7mb2qr0x27n7thkui5',
                detail: 'Dolor perspiciatis quos fugit rerum. Vero deleniti culpa rem. Qui blanditiis recusandae accusantium aut deleniti. Velit iure porro. At corrupti quidem reprehenderit odit necessitatibus. Odit corporis velit delectus aut eius consectetur non.',
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
                id: 'd44fac03-2236-4492-9511-576fe4024c39',
                tenantId: '8432aec6-22c2-49a2-a5ce-987bb6221ca4',
                tenantCode: 'bkhpl51yjki8mx1dwgpx53iqly8dsdg051u4jmg3bo5tt98p39',
                systemId: '51c31370-5ea2-4417-836c-5841d6811822',
                systemName: '2lpx1axdzc2ecx92hb60',
                executionId: 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c',
                
                executionExecutedAt: '2020-07-29 06:23:44',
                executionMonitoringStartAt: '2020-07-29 07:56:09',
                executionMonitoringEndAt: '2020-07-29 10:03:23',
                status: 'SUCCESSFUL',
                channelHash: 'u6uvgy8jjzpitkxtvtzbcspv7j35t2vjbo6eippy',
                channelSapId: '3to68tba4ztdj411gzr7z55cog6jucdw29j9isyefr7ajbltmg',
                channelParty: 'yjb5i5ybyz5gkq7dk8cuz7mowm43c77fn9bb076s39gnsvsnkdkl780efdh90evz8rwu2dq82fo5nht5340cuekengtirxbb4yk3e7hjls5f8yatbpinl4jeknyumk5bhpap9cud0h5q56pucvphsnw2gisv8hoi',
                channelComponent: 'e1sq9uwtefypumxswr6vghvgrv6al9tcfh9pt81rrlctouvdbmjh192wqasouxld0bd31dtxva80a8mk6cimjs6h4yhaxhx7u9790wzo0ezxx3zbzkco1f6yad02cqucseavzprmuao4tovhvz7lgcphhhia62k5',
                channelName: 'lkvni8wj5mrqxz73dnktcrcammfo22p1tz7bpwioywk7i2j047tj1o9a9dvgas49rghk5vlk444udjk0k3k3pmlolyglqybyvrs9h0rx3740jiy0bz16y1pn0svoipraw668h8iebqak66ced6fzbhywj64o447r',
                detail: 'Consequatur aperiam commodi molestiae consequuntur maiores et. Tempora incidunt eos. Consequatur magni natus iste excepturi minus facilis odio.',
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
                id: 'd44fac03-2236-4492-9511-576fe4024c39',
                tenantId: '8432aec6-22c2-49a2-a5ce-987bb6221ca4',
                tenantCode: 'orukc2i28cu9vel1cy53k30rjw7ixgtmr4iuvxzoz8akpxsewc',
                systemId: '51c31370-5ea2-4417-836c-5841d6811822',
                systemName: 'helxvyf9yw4rfwug5os6',
                executionId: 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-29 03:53:52',
                executionMonitoringEndAt: '2020-07-29 12:35:15',
                status: 'ERROR',
                channelHash: '7orwi9gvrncnx2jq09nviwdnmoc4hx7ucuao99ug',
                channelSapId: 'ji7nxq458a0vf8timk8ccawegdhv2tdd4w47qot1ctkx1phdmr',
                channelParty: '380rx9u05d2w4jmug09fnjrjfacmf0a7esjftl1eeeeexmvvpfbpigjxtrb7zgd87emyba8lt9e3pqvt83t9nbhisa1axfj38uu3wdiapd0jf8dcl99j5c9q6txwrzi09fp2v5g073ov2fkrh9k0bn5dlv7ynca6',
                channelComponent: 'xsfjeyrqyob43uugzxl4dtx4ft7c645kea3nknddq428t1z2zp9u2xk3rr65o1evvzwstx0zjxzrij77prfgtl8ad69yy15xiacp6a98y6hlngzuax0ukzxm9c76e02nq5ltardwnivzz2m0vpbz1y5vsubqx7i8',
                channelName: 'i3si2888jpcjb0beqcbybtax5x2mc6cybqsru48ekkhjc03vx3g8g0nmfl85ee5bk5fuia7babwgqoxqk5z6x3fyx5wjtx107fddp0oyr07vitqwzd013kvlyza4nx7u01seb2gtdf1a3nbnr660ohdglupfux5y',
                detail: 'Dolorem aperiam sint nisi dicta autem dolore quo dolorum. Esse ab distinctio doloribus et aliquam optio rerum voluptatibus illum. Consectetur repellendus rerum commodi qui repellendus asperiores quia blanditiis.',
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
                id: 'd44fac03-2236-4492-9511-576fe4024c39',
                tenantId: '8432aec6-22c2-49a2-a5ce-987bb6221ca4',
                tenantCode: '0jrb4t5rr4qpp2emtcfx4969mzpahl2zxb5n26ub76iqhgxfsq',
                systemId: '51c31370-5ea2-4417-836c-5841d6811822',
                systemName: 'owste8tb7uctcd4u6rsl',
                executionId: 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-07-29 09:34:16',
                executionMonitoringEndAt: '2020-07-29 01:21:57',
                status: 'INACTIVE',
                channelHash: 'xh952m11f68f87p31ds9v3pql380ek5ssvjojbl6',
                channelSapId: 'n6h62ljk28xot04wpb40or69rkzbeez9go41eb3rxt15l7yzxs',
                channelParty: 'hmromtkcmxa1ckewo1nshszhcqvg5s056081gw996i6lle57kvw7a2nz8r7j0fmpe1pgr3j656a0fmksmpl2x4a7td6f5lxzmmtyp7q72he2n2opikgml8l525zfnkex1uh3alx14cxksnefqik931u7y4tyhl0l',
                channelComponent: 'xzjsx3a1puycn8i0n3t81lawcz31s2sjpw84qu5t4bofjem8fkzh3m77rqxmd8vmtuvspajpunp67h1ilf8e0ep43su61z9oiu26x5cd8veir93i435hj0tf5fdrzvo4mg0jwt2e9fqj6mxldcmlhn6ramwxcg9x',
                channelName: '4ybli68mbgvpfxg96815r810felk9liencnsfp9plfiizku75kzvlg589aqpz0og3cb9xuxkxvvv29xuanpg03z20lgyu9g011rxednxkuv27u6sxx48sdag9yq1tvkhl5ezivgr9lwl5j9bbu9uk44z7agfx5es',
                detail: 'Vitae fugit libero quia placeat repudiandae vitae. Aspernatur sed assumenda exercitationem libero voluptatem velit quasi. Culpa qui eos adipisci non soluta ipsa. Optio minus illum. Eius id aut earum.',
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
                id: 'd44fac03-2236-4492-9511-576fe4024c39',
                tenantId: '8432aec6-22c2-49a2-a5ce-987bb6221ca4',
                tenantCode: '7rbrh6tr2wn6973kndg426cld35e3qkdqcvd7yf9bodpq4dx7c',
                systemId: '51c31370-5ea2-4417-836c-5841d6811822',
                systemName: 'ahj9jyeysec11t9qpe8n',
                executionId: 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 06:23:17',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-29 14:33:46',
                status: 'UNKNOWN',
                channelHash: '7wvvvsf40kc2ltpgvhfj64u2m4rz06gort8yvozr',
                channelSapId: 'vp5mllbabez9zi26lnigwvq280xlgpbjs8bocx20m5bqkrvyek',
                channelParty: 'ya2ux66okftos9uvk8pysyp5exgy1rf47zffapovswt1jufqjuq2etkk7xxp84eiblpax4lpmdazv09qgbc4791oahfbrwzh1kdm7aqzu2n9z6275sql5z5zyejm8m0ymp3nlyyk7fh8qip35wf07wdnpn5oqjak',
                channelComponent: '6c10g6txbzz5fxfs27tenvl31d8gzskjx8y0ag420562ebsggy64cfa6u7glqani1ljz4sz07pym4v01jw1975wt95639wp9efemuz7i44zux0cc9ffjvfgykoinb9q2hpl39jwt97wquvjokufqslphwgm5fgpt',
                channelName: '9gnqkbys0dncbse036ex0ero0uta37mupbncyqmycoffwmgaey6hqzw4hzhs86ov22wgv9byyh9ema7joa4xwpqerrscpm5v5pdos4dc7kcf6n14i47az81gq94uq7umm7hzm3ep8naghvmf6esim2gt4poharp7',
                detail: 'Similique est blanditiis incidunt earum magni dolorem dolorem temporibus deserunt. Numquam et labore non ipsam. Et reiciendis nobis voluptatem esse.',
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
                id: 'd44fac03-2236-4492-9511-576fe4024c39',
                tenantId: '8432aec6-22c2-49a2-a5ce-987bb6221ca4',
                tenantCode: 'q960kpazixu9tqedm49dgfnu92i5lmsrdr3o09ck21q2o8rvnd',
                systemId: '51c31370-5ea2-4417-836c-5841d6811822',
                systemName: 'hw950b5e2naoryjnop06',
                executionId: 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 08:01:31',
                
                executionMonitoringEndAt: '2020-07-29 05:34:02',
                status: 'STOPPED',
                channelHash: 'xe3gyqldw6y4btn9sh2umowlrirq5no2ay8vw5bj',
                channelSapId: 'i6ab423u0n3lrrtr6acywix8hhiadec6t6mfris2rqf4nyh7ji',
                channelParty: '3fzspfd6plvjna5ix5wzr7mod0pdz8hxedac0vxt3xq1kpo5xgio0084fmeontnd4ciejhcnt2s1n1do2bflpdticpe548yscjj0m9t4vwsgm37ge3pqqw4s7h6uli9fe8as7l0x9rduwzk0fut7w719qt81ackg',
                channelComponent: 'uxcmwji61dgkkrlxh4k8vyvvs0125dhdtamdieib1dbiuv55e197bao47n34rz2fuyrgyu1lbrj8ljxakkesg019ehsq4po4ndfhqy5qjmf3j69a17zolr1afwdhni1mpo7m34b3fn8nthjw7204p48y8qooqkrp',
                channelName: 'rwncc3vgiv1b2ouk7a7kjpcl8yri6vjb6ao7mp1u5lueei2nnr648d4kxr533bzgbg24fvmyfii5evctvxdrtbewpf7f6p3fvovczajityftsza6i5d6q6046au0u4auiy03v17vrkt7ikp17ju0znix5ykzpal1',
                detail: 'Eligendi qui laboriosam ea. Sed enim accusantium. Qui est nisi quidem laborum molestiae sapiente minus. Vero a qui dicta. Omnis cum nam.',
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
                id: 'd44fac03-2236-4492-9511-576fe4024c39',
                tenantId: '8432aec6-22c2-49a2-a5ce-987bb6221ca4',
                tenantCode: 'kbxvuj69divansl45mda8sf09dgphbga2qwlrgthxl6xn9681n',
                systemId: '51c31370-5ea2-4417-836c-5841d6811822',
                systemName: 'cyfmoejtse5hyxy68vv2',
                executionId: 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 00:26:34',
                executionMonitoringStartAt: '2020-07-29 11:49:08',
                executionMonitoringEndAt: null,
                status: 'UNKNOWN',
                channelHash: '1e4htxcmoa0ee7qkqy3drmmpabr20qdvxl7e2wv9',
                channelSapId: 'ezf5i32q00h1f1lfmsj362cgxipxekk6rnz7d8iqxcc4lae1dl',
                channelParty: 'o0yer0nuy1l92ry7u661ojkm294x37yyz6576m8ntqwocwuwts2q8jy2jd45iu5wxfax09crrs9ibhfvnu21y45usk2b6xbo6snbqp3qwhx85erwp76h03y039jhm0cxotu9sywwo3h7mbdgs7o52p7g5mtvynzx',
                channelComponent: '6dxedyrdn9afipnytg0w9yqu426051fo83sx1qnmu2y1rbfvna8dq074kgg97h3tn4m08otjmfq1b09ad0g7kh1hzw5qkpq2j4hy58iee4pzghbaca98j66foas6m29c569rka1fnfo3riygl3hazwhz7z824h4v',
                channelName: 'hi0iase0c1jit0p7qi2exjfjakezlwrhjxewdxcm9jl6wpd526spzbfi39d5fvbupv7n2x01ltedc56y3gxeh58lz7n4a8uthzyt201pspuqmizcbyw7e3ysyknlewaliqxvrwfwaewmv59ro1hadxqzamh1syug',
                detail: 'Id deserunt doloribus eos ut quas. Dolor sed ut voluptatum optio pariatur atque odio est fugiat. Et repellendus et facere praesentium dolores. Pariatur at voluptas beatae aut sint.',
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
                id: 'd44fac03-2236-4492-9511-576fe4024c39',
                tenantId: '8432aec6-22c2-49a2-a5ce-987bb6221ca4',
                tenantCode: '0injm1wipdqv07deucclot5u54v5pk842kka5lrp8o25pckdbu',
                systemId: '51c31370-5ea2-4417-836c-5841d6811822',
                systemName: 'b1o0e9xi2zjv19l874i7',
                executionId: 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 07:38:13',
                executionMonitoringStartAt: '2020-07-29 02:45:33',
                
                status: 'INACTIVE',
                channelHash: 'elqlxxme5is9fzi2tg6zwquplb0et18yj3ik6o9q',
                channelSapId: 'nccqq4ffd8lxppz1b8slwalm6d0u8zhpcqa90eoyzbwjgbhdd2',
                channelParty: 'fpwyw2fvuafdbazcrpw2evmwsu0r1snffmoyh8wd404mfzbdoe5pvpfude2lbrzpt7exrg50e0vombcp7547mazac4wqpie2l31rfr2f8ryfbcug7fvpx41tnm7kb9zwazpo73c8jz4lhw4jwi0lzese135127sy',
                channelComponent: '4vwv7gyjjvhfe7hskkep1829zhh6q85e0byl4hiweqlsx3rsh61zqd5x2d15j7gwyv04zzym6v6n5gkaei8hu7eni9r864e4csbygyg3pplsc7n79twuhv8esjv8p9vrnf46g67gh143s5w4208do2tsevuwsrbm',
                channelName: 'hdsqs4oay6dj461xa2w31qwgt00g20lrdk1eto47ji9lhlrfj8r8k09kgdud68idnzeadbhi0gro8nwf2slkz2knn8og6zn7tt4plzfj7w2uns2dqtove9qhkl1zrqpb17u6znkwcfzi5v7renpi67ses42xv9b9',
                detail: 'Voluptas corrupti occaecati quaerat corporis molestiae dolorem. Laborum doloribus occaecati quia voluptas libero. Quod sunt et doloribus et. Neque modi nihil. Illum consequatur tempora at dolorum libero ex. Sed dolor minima quibusdam.',
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
                id: 'd44fac03-2236-4492-9511-576fe4024c39',
                tenantId: '8432aec6-22c2-49a2-a5ce-987bb6221ca4',
                tenantCode: '4ws7bdx89adps9avfuv7dicqdo5fglfyqr78qhulmpplgvf61l',
                systemId: '51c31370-5ea2-4417-836c-5841d6811822',
                systemName: 'k0h80a7xsshbfibvre32',
                executionId: 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 14:19:13',
                executionMonitoringStartAt: '2020-07-28 17:32:20',
                executionMonitoringEndAt: '2020-07-29 03:25:03',
                status: null,
                channelHash: '663r3bk6y4xwp9o0gx097o06zamhu1641gim2lfg',
                channelSapId: 'hrpp4hwq4l9vpnh7xsajus6ocz2jpbu0def8sxfhwh0vcy87y7',
                channelParty: 'elewqxvg38ijusayym9q7wt9yf87thq68molqjfpq9732qp1jtlyq4mky7d1jkf8bi5e8h15u2d82vs66nane9p3jggprinvogcr3ah6hn6mbh4krf87i3co8enzk9475jfcci04e3akxubxpa8gk2sz4z09n8m5',
                channelComponent: 'rjqmeke4dugfchn01jb4i7nyhk4yxacy2x3yya6rp6loei9ekkxvqg129u4y6jzxe6518o7ppbxnsskwabqirwzb2j71p1m2ghw1k5z5nv0s8xn98yt56f9uuagu7envem0z0oogsfp4bam3b0rizj7hgha0bp6d',
                channelName: 't7lygb7p5znr0h8a1k9fpehw040wm8amad9ezrnvjihaw0k7f26en7rzpmw8gyvsr9x23e37bc4n0hal0p2hdouq10qnpzw1drt1spbz181kqiw39ngy9thmw7uvqu052x3prnwtbo2icekghlh4qfprqhwfwetr',
                detail: 'Dicta sint magni et est maiores rem officia velit. Velit provident sed corrupti voluptatem. Cum est totam temporibus nam a. Ab sit sit ut sed non consectetur veritatis ratione repudiandae.',
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
                id: 'd44fac03-2236-4492-9511-576fe4024c39',
                tenantId: '8432aec6-22c2-49a2-a5ce-987bb6221ca4',
                tenantCode: 'rhwrmofjn86gsd3ymjgyefv60iijlil0n656l0ezaw5qsecxmu',
                systemId: '51c31370-5ea2-4417-836c-5841d6811822',
                systemName: 'cbin5m7hrsmyd9fqwzc2',
                executionId: 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 07:38:03',
                executionMonitoringStartAt: '2020-07-28 21:29:40',
                executionMonitoringEndAt: '2020-07-29 10:49:04',
                
                channelHash: 'wkuxnl62glpf3fs97xv7mgcss262wko338ydqlcr',
                channelSapId: 'k3tsd5adec9m12h842hozuby3g0o8qkd6j04fid89y46gj9fao',
                channelParty: 'mqss90sk14xcn18bnkwmwbjrrwp7zctnfzssiloxy0kvu6xorw24jcbvnk4ln3h9v59pez4r0hlwu93o13n7548r9ouvvmmtlefe68fna8pk0bu7znl5lz35e0eah8pnba9f0wqo7qt4yvovg6ydxvrrpceuwz83',
                channelComponent: 'eh8dnulz4padg8ev91s0ym47pmhmxglqqqkhxggfp99y562cojzadje90h0h8m5mm5abjgm6cb9nxa7m22i7k1fp2jpdcxcaq5c9k7r98x702pbgdy57pbhrb4jbly4k83tgwx2kg14xihtk8kxbxc2jfm52q7pk',
                channelName: '2h8opcybpncn73xw3kmicgvbygq270ztfalkj6oivk3459dn2o7e8qklkgf4i6tz4w9d19x6v0ud3n5g6zwzdt958a6n586gb6afwnh2fruhvjwx3atyn661eo1wzltlwp9kqjxjo422xt2136uc5qx4amr93q0j',
                detail: 'Porro et consequatur enim. Tempora repellendus id voluptatem. Velit veniam dignissimos ullam nemo debitis recusandae doloremque quod. Reprehenderit enim quasi adipisci occaecati maxime reiciendis quia reprehenderit.',
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
                id: 'd44fac03-2236-4492-9511-576fe4024c39',
                tenantId: '8432aec6-22c2-49a2-a5ce-987bb6221ca4',
                tenantCode: 'oqa2aaqe0tpocuufx8q0en1mwrowwfenim3j9583o9lxp5veqi',
                systemId: '51c31370-5ea2-4417-836c-5841d6811822',
                systemName: 'l2dqlihwawcz75m84xuh',
                executionId: 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 20:35:13',
                executionMonitoringStartAt: '2020-07-29 15:44:14',
                executionMonitoringEndAt: '2020-07-28 21:09:21',
                status: 'UNREGISTERED',
                channelHash: null,
                channelSapId: 'p4myym4g1as4d8aleiny7j5t2azo01dko7i2okuaew3n1maxw1',
                channelParty: 'rdqebb1eabh1y9n5shdz99c67xsr79da57jym5rqfm4x0gvva1g5tr9556imj07e9l7extkvy8v6gjjaow5s3jvq3f1pumg3lomyq1192r0z8xmmyg4njebdh4sn4le9ux0s8gstbgfpwcqlmazyypuan2ye46l1',
                channelComponent: '0918sph766bfrbp20w4wljmrgu7jl5pp3muns6s37b8dki102aj3otyamlsqvqzz9o8wc4asl0q8axedx13ni60tdow3epvdl5imik00t19w7phmg4ztxfoes8kpf82h03a8746qcrcm6q0e32ndmctbnjo57qjf',
                channelName: 'fr1fv0i6mxxsve3t5kw89krajl52s1r08he31y4bjvezv7muflvdtiyv0hmo65h5884r2ova3a948083ysdf211leeu881mu1ulqqij40hkwl8dtnfvvuagnpnbgufp290ppgtill4pdp1jqdlb8j489u0sd4m9t',
                detail: 'Enim adipisci velit quasi est. Ut soluta adipisci consectetur officiis id earum ut rerum. Eos id velit aspernatur ut praesentium. Autem omnis sint eveniet quod placeat porro architecto possimus. Magni soluta alias tempora voluptas rerum.',
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
                id: 'd44fac03-2236-4492-9511-576fe4024c39',
                tenantId: '8432aec6-22c2-49a2-a5ce-987bb6221ca4',
                tenantCode: 'f7wa8tg6bjkiw82wey7i87yqh8y01mw65irt98wmltvbzhtlnm',
                systemId: '51c31370-5ea2-4417-836c-5841d6811822',
                systemName: 'gm5w6ui08ehozcwdwuea',
                executionId: 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 02:50:39',
                executionMonitoringStartAt: '2020-07-29 16:24:40',
                executionMonitoringEndAt: '2020-07-29 00:19:27',
                status: 'ERROR',
                
                channelSapId: 'jfnmrjo2a2vnhtmm3c7x5c4nnpydr5y10f2a8p7w3muxl16f3j',
                channelParty: '2s1exdwr1ve5fr0duw5wrfdqgavw9zre6l2quocmragfyoiwo7filjmusvsrhtyqd255dedgx5jti7hz5cdlja60hvvfuthvjnm6mxshz8n491luvf7fb4yqvj8k6jtn76itwwzo0moyd9fydyod375ys0vn79ow',
                channelComponent: 'kyrn1gofgseamm6q2plx7f0g1yfq0m75auirdn9d4cs0en43xwe6sfqy208nrxu6xf789gpcmcypp6rpkctld526srqg9out3gxjp3wdx599h159q9mqtksk6ezexehtn06f84gnggyl4j4deg7djiegud0dm8ta',
                channelName: 'gly4vwgwmykvljj5xnx1frdswpzvx3tcj3a26xokqdhzgfx12oxb92oarrv4mm260xm3nynxjvb36a444b8s9fz8mfqyheyksajcstf0s4so4hbwx6jxr6bekgt4j0v1o7xf6uww4riazknzf69av2ko53suxpjc',
                detail: 'Expedita odit fugit libero et deleniti mollitia et. Veritatis ullam tempora maiores eius. Sapiente laudantium iste fuga sunt numquam.',
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
                id: 'd44fac03-2236-4492-9511-576fe4024c39',
                tenantId: '8432aec6-22c2-49a2-a5ce-987bb6221ca4',
                tenantCode: 'l9g9jxzy0pv9hhhucmiaejxnjzy9nay8pyksm3lurw5fuq4bif',
                systemId: '51c31370-5ea2-4417-836c-5841d6811822',
                systemName: 'pl419cugtudf7rp70sll',
                executionId: 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:48:15',
                executionMonitoringStartAt: '2020-07-28 19:23:43',
                executionMonitoringEndAt: '2020-07-29 09:02:12',
                status: 'UNREGISTERED',
                channelHash: 'yzxfx8ij6cf26o1585yx8gs8583bmwt379thm52f',
                channelSapId: null,
                channelParty: '4f85e1qq2bocrl0sxwdax28zm24bz2tmridun0y059z301ggeagy6vbyccumwwl8bvw5kgyrlwc1qr1w1249dgdsmxu7ytjc92vpqo7frsziq0submgsfk9jzgoel3zqupvqqxdpce3p9w20mslof169g3hy5c3q',
                channelComponent: 'hek5qsslccpa3kfy1z7720ndtfctzlxmuozwjq0849kg6anc5mgd44b8zaq7aaell0k1p8mkbyhi3vhbwziqz8u84scsefl2s60ez9mqrd7smf5biiwcmwac4dtqf3tbgfbh1eovyvhldvbwo5ug3miuor1fk7nq',
                channelName: 'apfjfdm1pfjq3box48nebfalzrviu1mfev8riwi435efl39baiwoga2o9jzwvyynubejj3vszb69pup03rg3x40wnk9pbx01d0g0373v66dlpypazn9rjltgw0uux8ugcq7ym3bgeqfp5wlf2ucux1nl93vlmull',
                detail: 'Quis voluptatem nobis harum dolorem vel aperiam qui quo. Aperiam et qui et pariatur quis eius aut nisi. Reiciendis et sunt et voluptas voluptatibus a consectetur. Quis voluptate adipisci consequuntur optio autem. Et magni maxime exercitationem nam animi eligendi sed nostrum.',
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
                id: 'd44fac03-2236-4492-9511-576fe4024c39',
                tenantId: '8432aec6-22c2-49a2-a5ce-987bb6221ca4',
                tenantCode: 'csvrm8zbhn3we6onwslzjijszs2krbzzzi0lgv4nhknbl6vccc',
                systemId: '51c31370-5ea2-4417-836c-5841d6811822',
                systemName: 'r9yrkel4mlhbnjlfcyyg',
                executionId: 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:27:09',
                executionMonitoringStartAt: '2020-07-28 22:52:08',
                executionMonitoringEndAt: '2020-07-28 19:10:51',
                status: 'UNREGISTERED',
                channelHash: 'd9l1e54bq28k44sy7oei0hd59w1bwp6fvpsa2v8j',
                
                channelParty: 'rubukotznnyulfjeu7vot05m33gyzcx3ec5jpnoxi48rc8verhlx22a5foa33dg6rwskypu5grnx9e98tk2xc650uts5rtsaul1c35bjw4cczaz6yln1vgy39ith4cd37nuxph8cy20hiyo2zi6dwj31tz6bhubm',
                channelComponent: 'patkja9s4ad0sc7w8paci4ok6l25oja8h8yo7q859yot8gio76rkvt0yairik18392w5y6sjkn37ibsl5chwhn5g2pgh5f7efutgd9cxrl13hifp6nvf7pehaa68g4pcdgg013o2xp7klndaeicy8quf57c0dqrx',
                channelName: '6zz2tfivlg81re7lu62ekfk4srpcvni37liw90305of2xjoiiz8dckz5ilu8gb5limh91c6mcgr46ff8e09pqxynan6ualq9pyq4qzhyl22nc09joz6oqo4qcofmav2wv2yf65k2dbrqplvs871r2ymxmjdvleaj',
                detail: 'Aperiam officiis veniam ipsum facilis et dolores sed. Possimus ea laboriosam. Quia quia consequatur.',
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
                id: 'd44fac03-2236-4492-9511-576fe4024c39',
                tenantId: '8432aec6-22c2-49a2-a5ce-987bb6221ca4',
                tenantCode: 'n1arjn8enp7vg1gxe55xm9apng0ttw4pmu8cpwhiiizkgkjbka',
                systemId: '51c31370-5ea2-4417-836c-5841d6811822',
                systemName: 'aukhc4smb2a9kuddxsuj',
                executionId: 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 08:54:27',
                executionMonitoringStartAt: '2020-07-29 16:17:49',
                executionMonitoringEndAt: '2020-07-29 01:12:55',
                status: 'SUCCESSFUL',
                channelHash: '588cf849b17ga84hlmx8wtt4lox3moheikhvtv0k',
                channelSapId: 'g11uuubpk7mpi9ecjthxlv102agrj5lsjpnuxyennkylpb14e4',
                channelParty: '896o4611sf5jg2slnb3off9uizmkeuhigor283tulou0he0i6e3k53wyn9p1dvh8iv21egwtcyp0ix4wt6wpzqsjhpr9ux1rdfi18t4xnl9al1w3lxoytr573m6krxwqqza0bpw6valhqt5n7144npfq3mvq8a25',
                channelComponent: null,
                channelName: 'tlp8ul90kidmw10rd0kwge8l55eqr3fciudwowgmzxms6u1gn7qhhwzz5mrrjwy6ue44j4d5nvrxif8h91rbubpc24rdbi927m9f09rhjmyo3xzquahil4ztsyfdjckwy4jy1yaiy02oh7llq5b89yq6x8kohnn7',
                detail: 'Sint laborum assumenda in. Et eius aut possimus vitae molestiae. Reprehenderit voluptas nihil autem laborum error aspernatur dolore dolore. Nisi a excepturi. Quod et eveniet soluta ratione omnis quis sint.',
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
                id: 'd44fac03-2236-4492-9511-576fe4024c39',
                tenantId: '8432aec6-22c2-49a2-a5ce-987bb6221ca4',
                tenantCode: 'v1gf8o6zy8lt13zrbql7iq7ewczogvkqm5nxk44946spgc8u6p',
                systemId: '51c31370-5ea2-4417-836c-5841d6811822',
                systemName: 'h6fg1mb9rc9rhhhxc8b3',
                executionId: 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 19:03:13',
                executionMonitoringStartAt: '2020-07-28 18:25:24',
                executionMonitoringEndAt: '2020-07-29 06:25:37',
                status: 'STOPPED',
                channelHash: '0jispe5nivvr09hhoz5r9o0zh2axrj1c7fsq7m7w',
                channelSapId: 'j83d09ri7pkpsuwmc8v2yd6j4zkq6wf1l6fvcze5a2h6mcn9sj',
                channelParty: '806wkd2j1wfrptvq8zmnnca0slr3cz7xu36agr1mgrwr1d3kh3bmbxnuq3kjguhc2evtv28b6x4at8q6r7oicagbfj8m3vd42xfqyk7odti2piam8y81ui50ri1fo565ernvf4qw9s5zrtm6zwp270fv5adaqt3m',
                
                channelName: '6f4iqb2js3105qqpvvu9hbuy5mdimyntmm3kjvae7op73ku2wuae43dpj7c9yjm1iok8db1xcm07fyj4dms3pljkpr0lv2pn59o0bz7cwc5yukjfuzur54jwfmao1obh62t9fma3s9jqx0ss6dymqu6vo9sb0c0z',
                detail: 'Quia et ab doloribus quia dicta excepturi. In dolorem labore eum quia fuga. Culpa nostrum culpa vel qui possimus odio tempore aliquid neque. Nihil suscipit est molestias architecto.',
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
                id: 'd44fac03-2236-4492-9511-576fe4024c39',
                tenantId: '8432aec6-22c2-49a2-a5ce-987bb6221ca4',
                tenantCode: 'w2kmcorxlm42phwpepfqpescrnksum67yr2pz21t8lyn25zjg6',
                systemId: '51c31370-5ea2-4417-836c-5841d6811822',
                systemName: '3jm5jemrm2ous8ss0t45',
                executionId: 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 16:29:19',
                executionMonitoringStartAt: '2020-07-28 18:55:09',
                executionMonitoringEndAt: '2020-07-29 07:56:53',
                status: 'UNREGISTERED',
                channelHash: 'l5a2go031c5ilfe56th7w33bhm4henhcz6g0ilqv',
                channelSapId: 'nue367jzgt9q0xdlgfpcqfq88x8jgxswu5srcgersbuqsir8p5',
                channelParty: 'hhnagcj7ucydl6lodjzewty5k5bs1g963p9tjb12k4frmnlyxtr1x746n2vmntwaxrywgq2jwwrtx3i1g0re87bxyn4s20jkeyu81vfdfetpc25v9dq9vpe6zkdhi1fhhxl2pgrmxfu8fmmcx9n1bkhsgz21revw',
                channelComponent: 'a2jy77iuph8czu3f067xlsmheikvtfj3tb3o35ads2b8toad2j16zmjn3cvj45yhrko4nlhczb5ix0a61ahb8gxup8s4og73brf1k0loorm2l6d4mzcm31j0pwx06yaciq0jto4rb3uaiq4et0hmky4617bo8x3e',
                channelName: null,
                detail: 'A consequuntur delectus pariatur optio. Asperiores at autem omnis ipsa mollitia quia similique. Excepturi eum aliquid inventore quod exercitationem aut et ipsa. Quis ut et sint aliquam ut corrupti.',
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
                id: 'd44fac03-2236-4492-9511-576fe4024c39',
                tenantId: '8432aec6-22c2-49a2-a5ce-987bb6221ca4',
                tenantCode: '9j1ik5fcro1uzkphdgnjsg7rx7up66etinuthhlw0tihuutd87',
                systemId: '51c31370-5ea2-4417-836c-5841d6811822',
                systemName: 'ztfgdp1rg7il27jkvkax',
                executionId: 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:28:51',
                executionMonitoringStartAt: '2020-07-29 11:49:42',
                executionMonitoringEndAt: '2020-07-28 17:05:01',
                status: 'ERROR',
                channelHash: '8u7y16snf77an3j326824w1cb0nbd6i814c0lyp4',
                channelSapId: '2z38efpuoas7op68apzs8aqb5jsygnff99bvhfwuzy5tc69t7q',
                channelParty: '9zbi4m9i3p3qp7dqlq2r4pnz6zkwq9ydlqzpssykwgsqyqqhc0lrhj680pa1cghoi7z7gax02zcakydormsym43r406boxl0k6m3lwmrplyhre8vq6f8u3k6gv9pyvv88vw0a6ebqc60snkkys731k3u3no054b6',
                channelComponent: 'k5j2xynews37l1j6vjm3ajb6zmfjn9e20kh81xbipjp92omezltw0m2a3weqwei0wy0qmt9nzc0jzcjszbmkf5jruu02uh3qyncoqbtm4udu9rl157421nl6r95tcprd8e4652jgo5nspqff9szaymorsk7t87nm',
                
                detail: 'Dolores officia qui soluta dicta suscipit et laborum at. Vero iure laborum facilis beatae quae. Suscipit doloribus ducimus et hic explicabo est. Officiis ex eos. Ut natus amet quia illum id ut perspiciatis consequuntur.',
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
                id: 'dv55yai6mrej6smh9xfbpuzijts80mg2k89la',
                tenantId: '8432aec6-22c2-49a2-a5ce-987bb6221ca4',
                tenantCode: 'd686j9ozlcup89hlroeln96voc9zm7163yl6vszexkqrlhy0dd',
                systemId: '51c31370-5ea2-4417-836c-5841d6811822',
                systemName: 'lv1qd4lk31zce3dg8nda',
                executionId: 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 04:57:33',
                executionMonitoringStartAt: '2020-07-29 03:33:04',
                executionMonitoringEndAt: '2020-07-29 10:44:26',
                status: 'ERROR',
                channelHash: 'q28dha2qtdz9nk5wo02ntludiy20va4mt603szbi',
                channelSapId: 'cs6ro79v2fv3q3ii399xezvrl4psr4quq5pcv9kgq4j5okxwgh',
                channelParty: 'w8spdvypglkk4e3yildl890cf3otuxtybmesah0x5ce7ga8buobja8ko7ncgzemd7w80vhi1jkocdwf48o1rhttlf1vchamw2v2misk55wr55clsa9b7ll8oer8uapnwukkqeqr1wgv9968jqun039h4goyj8w62',
                channelComponent: 'fkcxtvtowweike3waqyz175hc0ablnrvtz568orccoy8v0p5dliuhphv30v4b80xct6ekh09cvg105sfkfxkrsoqjbh3z5q7duvmt237tuo13f6nf6h63cx1gcqaa1psrv6dw50i560c4t3ufxyirr09k333nifn',
                channelName: 'c7592dqo3aeerl7dbpjew8swrmmow1abelfqpmaow82gi2btqpfx6c38wm2z7od1s8e6ez91ujdmb2cjv0bhbtlei0vbmcsjm3xu2qrlsv69abvl2uuw2g9sxbh2p3r39cde3i879m1tnq3480b4w4ua64x5ti6v',
                detail: 'Sit sed a esse culpa mollitia ducimus ea. Ut ut culpa et molestiae repudiandae vel molestias hic numquam. Eius laboriosam qui sunt sit amet voluptatem fugiat ipsam.',
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
                id: 'd44fac03-2236-4492-9511-576fe4024c39',
                tenantId: 'eex0hhqy8hxnhhmumllonsf82ugkxkbsfvgsc',
                tenantCode: '0xz12fnbbw3mt59mm7dsccvb7lu8tp88v07yf9l08bvqe5ikoi',
                systemId: '51c31370-5ea2-4417-836c-5841d6811822',
                systemName: '6az1uh4w8z928h6t1l36',
                executionId: 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 22:56:36',
                executionMonitoringStartAt: '2020-07-28 17:45:33',
                executionMonitoringEndAt: '2020-07-29 12:05:39',
                status: 'INACTIVE',
                channelHash: 'tgw16f32boza74k7yiezthujknb6xas3ev4uf7f8',
                channelSapId: 'k27v6vkwaq20xvu232dc3gfd0ensvf6tzr7ctjd7v449nndrj8',
                channelParty: '64kxmdd4ut6jokkhkkngretn1w72zyi7l8i8n0e3upexgya5l4d2tgljoizgbtjg7hqwcyi6alr0qjfmdgryc9x1viqtwsedocm5fswereonhbi974ojzclobvryivw8sm5kc2diq20wno0jpcc6ts0fshwx56vj',
                channelComponent: 'mq4pm0a33wbpje2e48kdkl3zy586slgpsnz7xhedto7ltn67nspblu75o98qgp4o5sleqlhhjdx8otraq6pjrlegd78tw68qaxn30l9smbu9u8sk7db45ulyrl92tusrmboqpcdg0g9m1esdqe24w6zn3nfpcjyt',
                channelName: 'puigzh49efq1vvqgd21lozjzjmzfzl514rtxvaa83ax6flrme3p91p5km8v53wbdm3ykf3t59cj3yszhkhwttqcti253kbvlo0hlwo5di9j2lrcgkb3aegob1ssn03y9yeca2tvtzwgmq9q2z6ewcsm5o5absesa',
                detail: 'Sapiente cumque non tempore qui. Excepturi iusto vero quas. Pariatur in sed sunt ut esse ab numquam sit. Laboriosam assumenda eum laborum quo vitae explicabo nihil praesentium ad. Nulla aut aliquid dolore fugiat atque voluptate quod atque rerum. Dolore consequatur nemo molestiae.',
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
                id: 'd44fac03-2236-4492-9511-576fe4024c39',
                tenantId: '8432aec6-22c2-49a2-a5ce-987bb6221ca4',
                tenantCode: 'ajhk7ypba3ilnuactcfy947yrmnw36uzbuefy8j1mzyvjp0asg',
                systemId: 'bdb0jtyjg3asz7uvps3eorgg5q94gukde2nfk',
                systemName: '8onsuxwcjf9vhdho5ijj',
                executionId: 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 08:51:22',
                executionMonitoringStartAt: '2020-07-29 08:08:40',
                executionMonitoringEndAt: '2020-07-29 03:13:07',
                status: 'ERROR',
                channelHash: 'isjm5lnu17vjv8ki7rm7mo58zywtex0b9o2jexhh',
                channelSapId: 'awy5jzmu35g5qmv3vjgywq5a6y68ru9kr242v1oufl5igvqaw5',
                channelParty: 'm11no63xu5ypeot1dz0btkg333942god0wjku5xw7u7hs3bnai8ceh05bbbg6o8o1vzhc2ke12ywkbfvgvclsb65uryvolzfib0qfffng45mlgpm7mokxu8cvpbz2iwvlfg01sir057iuxh0ul5orj103omlkcap',
                channelComponent: '73ces56ysdxd6fgcgdtqkc5n29xhmap35ls6fxvx3by01g0dlrsvgfrafghowqftq7cscsi3nv994mo82zdpqt9gm1xtszbuartw23s32uvx49mkwgx4p8yi46trqa0h2c3xlcuf5yzwxafv8s74o0boai8h6vkb',
                channelName: '7qv7j7mqls53c9gts79q9enl5oxe1j7qk73jvi1hph7aa6f8yfz1ltojpfthgdxvurnl7zcutn0hxhyckp6mc1bci5g0q7n2jh66v105lae5zowei2ax9gi6u54pb64j8wtjevgtg8lkxytykm88y0n0237fm4ml',
                detail: 'Voluptatum ipsum saepe non et possimus molestias. Nulla ullam ipsam aut. Libero possimus et dolores nihil.',
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
                id: 'd44fac03-2236-4492-9511-576fe4024c39',
                tenantId: '8432aec6-22c2-49a2-a5ce-987bb6221ca4',
                tenantCode: 's6uvnsvs6pe1bdsenmbbm873x97eurz8evzalxhap241bdv5si',
                systemId: '51c31370-5ea2-4417-836c-5841d6811822',
                systemName: 'wb4ibm0vneci0ee5n69q',
                executionId: 'nrw9dx3p4cq4580ik08uemut6el4dz9x0r1ft',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 09:34:28',
                executionMonitoringStartAt: '2020-07-28 22:21:27',
                executionMonitoringEndAt: '2020-07-29 11:30:41',
                status: 'UNREGISTERED',
                channelHash: 'e78q5vwd6ksbnpyvc0vcd77opz3q7sod7xm1j9x0',
                channelSapId: '9e7ej5byu9ja1u56mbd3mq6zqz6bopk5m190vvyvuk6voo2lr0',
                channelParty: '7u280ll558qo44c07byegkmf4sm1743rs6rvqu35pukli2vet3ni9afptr08f14yzauylmk0mfzuwn6jqqps1ry47g9n9am22vr1xgn4w9tghynh8ctfjeki8oua0d5acokrdel46n1le760f0oolhiykakctk5e',
                channelComponent: '3zs4jq8emog5tvu7c4wbr6pyvzkwpucfzvwojjp157ump26qjx8luy8lyan84xt6kw5jevf5jg2jf9lhp4s7vr5g2mvdt92wfno226a39xo2l7n8nvpe7u0slbnwxxwn75gpnmi5a4k0v43nvmuuj4of5aa8rk9p',
                channelName: 'ofy2it9ogisdoug4rkoo3dwo5qzbnlbjaf9h8t7n957ksc1tlje6nqfz6pa2myeuvsfobufic7ktt1w1nnyq3286yo2rhpe6eyu0kib03isw8nwb8s9j3jeegutfpxkia686io1uazgyvwpuc8zxleo276pqddgw',
                detail: 'Nam quibusdam et aut impedit. Nihil vitae cupiditate labore quos ipsa. Explicabo impedit ipsum asperiores ut et tempora. Et quaerat impedit commodi qui.',
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
                id: 'd44fac03-2236-4492-9511-576fe4024c39',
                tenantId: '8432aec6-22c2-49a2-a5ce-987bb6221ca4',
                tenantCode: 'muzavy3fowzpeisaead7xktn34skb0grl75isdfsg3ps8dg741',
                systemId: '51c31370-5ea2-4417-836c-5841d6811822',
                systemName: 'ergf7myva8yftkxmu5sb',
                executionId: 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 11:19:13',
                executionMonitoringStartAt: '2020-07-29 02:53:36',
                executionMonitoringEndAt: '2020-07-29 11:41:50',
                status: 'SUCCESSFUL',
                channelHash: 'imp5at0hy10kg5cy51wcpe60bqgnxj3tpid0zt73h',
                channelSapId: 'xdkfxi2r9io9t6l620tjk57a664i6m1ja36yz2ihscwstzxrh6',
                channelParty: 'flwgkok9qzf5uinv4jkmm7nkq62vlfglxlruee9cfy69503a75nz30q7x4ycwv2330pn2cw1d8saqra93h4lrjp01pqgrnl0peq8ckiy7fsfmwrb9fhiw555e7hd2mh9k625qi1jkc6d4dnquqq8q33pgb16xbfc',
                channelComponent: 'ljqry9l3o8hrbmsv9zk2hkmn3hard750bwwl4d9283k53vu6yrq98ozqd3b8y2ayrkgv9aiwgg6ll99bea0zjg8ps9wnbm5lppdrjw8jdoqsp25radvoo48l67trdlbjxnfimlx5j6ucxrbysu934k0fxwdoizqy',
                channelName: 'y41qogppu7glcxgw60sfefl8r99k0zb7gjj406lo0q62r8y8miy7qvhjlprouhg56nrlfu89cfognvju7lvqzbh1gtccw3aivb7u8b9szwco9m4pt0drkafrlmpdotz2pxpznmxqn3r335utoekda6kqjt16846a',
                detail: 'Exercitationem pariatur dolor expedita occaecati. Ea temporibus aperiam velit atque laudantium quisquam cumque. Qui ratione et. Soluta ut excepturi alias eum aliquam dignissimos repellat dolor et. Adipisci animi perferendis voluptatum impedit est quo. Itaque delectus ipsum aut numquam ut excepturi est sed.',
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
                id: 'd44fac03-2236-4492-9511-576fe4024c39',
                tenantId: '8432aec6-22c2-49a2-a5ce-987bb6221ca4',
                tenantCode: 'hskiqa0v8gho024z2xq55lqj8u7oiqio9wzqbm0m27e02ua6qpf',
                systemId: '51c31370-5ea2-4417-836c-5841d6811822',
                systemName: 'vd62h3issgwcb05jvs3m',
                executionId: 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 18:00:09',
                executionMonitoringStartAt: '2020-07-29 09:18:25',
                executionMonitoringEndAt: '2020-07-29 11:04:07',
                status: 'UNKNOWN',
                channelHash: '32bao3udnbze6jyn5b3h2j10h8htzarkvv0023yc',
                channelSapId: '18twratgx03e5xbde5gvler70bhb2tawrjf1uan2hfhgjvu9f1',
                channelParty: 'uot7mbgfn1nap3avvg49p3enn712467hz936fkirpt3nf0doyo2wh9ps05tdtr7bt03juvrr5qevao4ztcfhjxsu9bpo8i0spnn01g3bge0kjlhz6j4p3ewhv52p1iy1ib0y2117cm3f4e13z67n72yp5yaqqg1t',
                channelComponent: 'sm9h43jjcy8f5bhgf4qkmfzm27udeaxu3duxwv7w5i88wrjs4s7bk59j1dtl6lehbtpwpx1c53g93hkc138z03d0onllfj0o4aa9rs3sqstf2jta6z82viq73hyol7naxbfthlcomqmg8fjvgrftj2536vzut135',
                channelName: 'f6q0porgwpbce79soop00hqi176vr740n8k2xelh52heplbqb4f9iimun8ro8u66alc1339xr6lpwovf8i4sxxuyhfjc3p2rtuqs5vmxef9tivisrpcq6wwy9jpixz3sgqukllld7hj7tc7imv5g9dz79m82461v',
                detail: 'Tempora voluptatem officiis veniam architecto sit ut quo. Quis quia quo maiores autem occaecati quisquam quia. Voluptates qui ipsum qui hic animi. Eius accusamus atque itaque fugiat quod.',
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
                id: 'd44fac03-2236-4492-9511-576fe4024c39',
                tenantId: '8432aec6-22c2-49a2-a5ce-987bb6221ca4',
                tenantCode: 'dmhxp14lbgsemofi31m14nubv6fjr851yxzr5i173uz4icrklg',
                systemId: '51c31370-5ea2-4417-836c-5841d6811822',
                systemName: '8lb81b434w8cb2qgzou6l',
                executionId: 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 11:08:51',
                executionMonitoringStartAt: '2020-07-29 16:28:03',
                executionMonitoringEndAt: '2020-07-29 00:00:11',
                status: 'STOPPED',
                channelHash: 'ttlwi1716yk2l41y1o0dq1rnfvi6uog0sb7fmrhg',
                channelSapId: '5ha8pwg33lnqoa7pfxjbdrag11xns44k3hr16xgtfmjo82vjjg',
                channelParty: 'off14d3hn7vy6yd5v03dm3611ijauyg5ge3dt2nf7vhdkbp5wkdx1wgqq5kiw8zeiklvg3t3hakx4eomxds87qn8yzmn2zaak263gpfloi06flfhddgcsmobds1h0rkbzfbghl2koeko9iyha1xbe2r5vvdtiyxz',
                channelComponent: 'zmt0epc6uj83j3y8gtx76zn34sniv37rrrpmzqh665asepwer2wdrmht1u42gvlg2hprtp68s0n6ppgh97qgg2i2ajdr910kyzbakrhkh6omuzax0dkvw1johid0znq9urpn7397j4quwwsw71ivka06iila6yu1',
                channelName: 'kjon7n9yyrtiwxbjcm65fmowptwd9jsldg15mfkkk1dvp3hw9m1lb5uolh9t2zsejtygiyoic0ggbkza4yf0soqzgsj2d09acek5qd26437ihonixm07z7m3llmxmocwvee359ifin8j2ywk1i306i1epeja9gs7',
                detail: 'Et deserunt labore quod laborum sed officiis deleniti. Debitis accusamus quo. Sit voluptatibus molestiae nemo rem rerum ipsum unde ea voluptas. Nihil quo beatae aut qui doloribus ipsum ratione. Sit quia incidunt vel id exercitationem. Quis delectus assumenda itaque.',
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
                id: 'd44fac03-2236-4492-9511-576fe4024c39',
                tenantId: '8432aec6-22c2-49a2-a5ce-987bb6221ca4',
                tenantCode: 'prp33b4k24c3088hh31cc1ek9nczsza3975xws84i20kj5q6yl',
                systemId: '51c31370-5ea2-4417-836c-5841d6811822',
                systemName: '73z92xttzrq70g9x075r',
                executionId: 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 18:46:27',
                executionMonitoringStartAt: '2020-07-29 03:24:16',
                executionMonitoringEndAt: '2020-07-29 05:10:39',
                status: 'UNKNOWN',
                channelHash: '5jjedhhccme1g0ixzc1eqvvio2tnsn0o2pyaoq2q',
                channelSapId: '432nkc3tafdz7ces0x91j88lb5ru6eslvva25h9kuutxb0zakmo',
                channelParty: 'ltir2m1hdeldpgcqww0u6q30szcrrx776yr118g1pbendp0jq7dcexzvtnlbzv55q6j1k00byuoj2b2ww5555hsgd82g5m1vwxxq6ohajo1c66w1e3945r4pdf3s2d4fmmb41ofns10i1z2xdyztagb8exeyrnc1',
                channelComponent: 'wag5vgqrtfwocpjvjxv78clkb8oon9ezli80lxipd8nfqs85p9zczvk8gesh5yzw81p9ylzgwl3zlv7b5xp7chijnma1yj9x5xlv7e63g8g1jmwur5ue24wj9onmwojr6vpf4yv2emnco184s6jkudlposy719o4',
                channelName: 'ao8z1p7liwr5l3pwrqu0n6pvfp6w18mp2c2w0yufkpus1v4n9wj4bu5c4ae028ade4wgs661nst1ev0ce9tqcu0nky2yyj4nznydz54zbgoaw5qepqofkrxutn96bu5dm9tw1m9ipfhuqemx4ijm58o5gz80pfld',
                detail: 'Ipsam aliquid iste. Officia occaecati fuga quaerat soluta. Nostrum sit repudiandae libero. Quibusdam fuga et nostrum quas expedita. Explicabo sed exercitationem fugiat nemo.',
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
                id: 'd44fac03-2236-4492-9511-576fe4024c39',
                tenantId: '8432aec6-22c2-49a2-a5ce-987bb6221ca4',
                tenantCode: 'a0dpswo7nuyrdg7266ibeae6ekuen2mh6bkglgdtofjsfkoluq',
                systemId: '51c31370-5ea2-4417-836c-5841d6811822',
                systemName: 'mv7k4ca3dydp28uz7dpy',
                executionId: 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 14:06:46',
                executionMonitoringStartAt: '2020-07-29 15:53:14',
                executionMonitoringEndAt: '2020-07-29 09:55:59',
                status: 'INACTIVE',
                channelHash: '8r24zada1j5qwwrj8l98fr0l50inovrk69dyc044',
                channelSapId: 'py4zuin3t8gecbiyctbwc4grdrsys0gks3frqlxw1g6wa1zcw8',
                channelParty: '6qi2hnb6elllmu67xjidknvwi5evwupohmw2jab0vynp9vu0b2tpdntdthym26s54folu92gd2rbe49x7mvie3kedyjgyc1mvnqgks7jdjckszgnxaln17j8pvbxt1exnl3a2b5p407sttkziib9t3dh9c6bra4yp',
                channelComponent: '5kpgm4vg0hq1vs94khzxq2p1nfe6x9pzpm7v95oayggspavl4hr6e04ai9uwhzequ5zv5jav3gcd16286vi19isw0o8qi9b5bvl3fn9d4yikk0mgrnl4xxcvdjwggo249ucotxckan5ea9hnefnnq9ufbycsx0l3',
                channelName: 'krtga6xj94ftw9vrlgphowd6ay0b0sce9dv4ukalj88co4qjf6hdpv001nxvnouorbnlmxo8na930p7mfzm9wu5n4mb96g21m7dmg6rs6exbmdzrz2ay4p90kbsnvh57zqe9h4oqe2g3s6rl4ci7mzfvzvf7vrqy',
                detail: 'Qui veritatis dolores saepe. Assumenda ad eaque repudiandae quos sed nihil. Aliquid quia odit et et.',
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
                id: 'd44fac03-2236-4492-9511-576fe4024c39',
                tenantId: '8432aec6-22c2-49a2-a5ce-987bb6221ca4',
                tenantCode: 's8b0idwi8vgcze4dvqxbvqs6cq6plrjdgjp07uatlkb22pi518',
                systemId: '51c31370-5ea2-4417-836c-5841d6811822',
                systemName: 'y8353anex9j2ye779u3g',
                executionId: 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 14:19:59',
                executionMonitoringStartAt: '2020-07-29 07:47:17',
                executionMonitoringEndAt: '2020-07-29 09:26:09',
                status: 'SUCCESSFUL',
                channelHash: 'cl9cvnhe1huqzrnod8r0ibowqx7nrejzyclvvjo8',
                channelSapId: 'ypwmx4cg9pak8lngaovysbjq6twf7o10q1lddf7knhdpv0ne3m',
                channelParty: '8owti5zfy9jnwqzunh4qmqayoa3ktdmw4xkx08cz16fleuyk7h42r33erxjghlx43ry4w5nfipgoe9thfqwb1ue393u3frc7l19qfe78p9frggizrt57d04k6g8j57awnxbkoghrlfvlb4np87qil96dwpz6h2wc',
                channelComponent: 'qibpxe963ihioj6613oe65prf0eqj39lx036n5dyivj6h1jx6u4lparn5s74j8axm1dd4r9dnhyblvqpyp1tpmwf6l0n6usyy20dosgblu1e8lbib8a5zuwtq0j5mlvidznfwt9jw7k5hfqifyjx6iu7obn45p3c9',
                channelName: '3x4asijh08zo61iujvxsf7sja3tp3lr1nzx50fwkyqo60utai2ssm7w4ftndgudw47qxwt3j0dmecmdfps4swx8j838jk7k4zxzfy7ae83anvg3y9kawirgx7sqn4z6f79140az5ejkbh4j1ynhh6hj9txg54cij',
                detail: 'Dolor earum voluptatem sint aut ea accusantium aspernatur minus. Adipisci voluptas doloribus neque omnis qui voluptas nulla. Amet ut corporis aut velit tenetur incidunt consequatur eligendi.',
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
                id: 'd44fac03-2236-4492-9511-576fe4024c39',
                tenantId: '8432aec6-22c2-49a2-a5ce-987bb6221ca4',
                tenantCode: 'xokfn34dsq17owmvy9su7tzd5pjxm3l4avdyvqaw6fvdf3zs8k',
                systemId: '51c31370-5ea2-4417-836c-5841d6811822',
                systemName: '9k7hhpsiss7va60rrwod',
                executionId: 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 07:01:36',
                executionMonitoringStartAt: '2020-07-29 05:31:01',
                executionMonitoringEndAt: '2020-07-28 21:19:45',
                status: 'UNREGISTERED',
                channelHash: 'd7vay9n0dz2dsfs66t77r5q522so32hg11a1cufx',
                channelSapId: 'xvr31l8ktmr5bp6k2kv6aky7qyjcfixps5nkwgfoaozxv108la',
                channelParty: '0ijbin6bydebnz2u5auo9vyvyqx9nhkh48ndj662xdrdwp9gckqbz2b8ta964vsg8vkd4qy1j041f7ykchvuejzipho95q22rahqd4xno0btyrt3q375kbogiq62plpsse26v6ombw6b0qsk9226ya49y1ksgc35',
                channelComponent: 'y4xnnpvicipjh53yotj2bqg6xkob209fzaeogazlefvxdz2hc35rh0bhjpc3qtguo2yb4ekrp9ut495pzy59sbvjcotmaz34wb2lzlftaakdtzlorcb85ekgiv2rzg3qn3ixbnj6xa57ma49vhk2g7vmezlr1ffx',
                channelName: '5gtiba09cv7cn7lfvast9x7200oxhuq4mur84bgz15eb2k4yfcguwosqdkym7k52rsay9k4awn2su4oxrpa02mjf0rl4ryyn9wedgl9z1tgjlp6554lx7utzlmez59zdzb6ol15l65m168luf6rlynyw6p62s3s79',
                detail: 'Sunt consequatur quas vero sed officia. Cupiditate deleniti sit ut aspernatur qui itaque. Et saepe et odit et dignissimos eum. Repudiandae modi eaque eum minus repellendus ab fugiat. Non natus numquam officiis fuga dolor ipsum ad iusto veritatis. Esse necessitatibus qui quis quos harum a quibusdam veritatis.',
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
                id: 'd44fac03-2236-4492-9511-576fe4024c39',
                tenantId: '8432aec6-22c2-49a2-a5ce-987bb6221ca4',
                tenantCode: '90brh5pb8tit1cwko641vi958h8vbjk3248evupsi470wycyrb',
                systemId: '51c31370-5ea2-4417-836c-5841d6811822',
                systemName: 'd47nl56wjtne8mb1e04i',
                executionId: 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-28 20:38:09',
                executionMonitoringStartAt: '2020-07-29 08:24:27',
                executionMonitoringEndAt: '2020-07-29 07:10:13',
                status: 'INACTIVE',
                channelHash: 'g0aenzeratkjajnhypn1xhrpl64rk1sgahwtac3h',
                channelSapId: 'gcgowy5ah0grsav7d4ep107ne9e2hqziid0t256deevl4p00fs',
                channelParty: 'tzeoa6sqwrg40mwzj01dejlx3pu4gx9y0owba3wnyahtymum5a3wea09ig5050rpyamhezhbw3aipncmervug7ohybgztk9abzcledv3umncm41jbgt6xa3aiyahnz7y06ngudc131m5tebm87be7mqaim5imws6',
                channelComponent: 'tfhcdwqznjlabvlx75lzpeyg1aahq5nps3g5s6mmmwp9nhfckc25q3re6vrk5ilj1pgzq8egfg2v0uxais30xpl62ig59248bj7ptnwmrj59owbdr0d7ipfnq8myhue1jr5x4d4cy4py30fsgr9hnnyfekw298r2',
                channelName: 'staf0vip5axclvpv0swfb15a27zpja6z3dx3xp5eqioecjqs3879sea6bnjfbfm14smbu6mg00uvzokf2y9szla1slb7g5a61ptv0zfls0pj578xhn76iqy8jqlrn0ir6dv2v70gjch7z98cauvzkbxe1fpnx8ee',
                detail: 'Culpa aut voluptas quos rerum. Sapiente aspernatur cum sed amet vel ut consectetur cumque. Debitis est quod consequatur.',
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
                id: 'd44fac03-2236-4492-9511-576fe4024c39',
                tenantId: '8432aec6-22c2-49a2-a5ce-987bb6221ca4',
                tenantCode: 'xq3w5a1nylbm4jm1rnd9d4y8in29bm79gafjmcxebmn4sd7iwk',
                systemId: '51c31370-5ea2-4417-836c-5841d6811822',
                systemName: 'zf3bv1zbvucib4l9qwak',
                executionId: 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 21:03:38',
                executionMonitoringStartAt: '2020-07-28 23:58:22',
                executionMonitoringEndAt: '2020-07-28 23:58:52',
                status: 'XXXX',
                channelHash: 'uh49gf76u29kfz5q1iesj8b2pszxufe7imzsvj18',
                channelSapId: 'g61alabgwqyzcfjwf5l1wqno05cwrhgf3ix10ms8qpvw93wifo',
                channelParty: 'c9icw7i3aiqmtzrtm4taayrlypfl8ezw7wvec661ggdf4ogyljab06x8n44z7lzl79nc37fo9kl59befg4vxkmp3k44mcuzcyakmtmbvu1rx11wicusi9c0bojcjrwgji2vs9877y2dujry52h8qvnlvbdtzvqgb',
                channelComponent: '8huodsj19hu31cjxsk5dwzrxtknptrib0m7i2rn9l6amjsax97ca9bbhsmfnor2iphu2ao9hl67h6h779g59wtw2hclzy8hpb73yp5rzju7eb8zvcy13yus0lwo0zmr8hpfc4ygviu0jm4g8obc56zn85pv4wwta',
                channelName: '7gmc5ijp802h0nc3dwk88zvgmtr6lbkhs88azqhr1wgjpue41e6khuiib48fklet27v9s7opv7vllsefh7z5rt5dfsxurapnaaf9heaj2epj4n40jikpopnva2hpg7qgkudf8flwu5zpucfxbq9h8khppbx6zx05',
                detail: 'Et velit tempora ipsum et assumenda sed ipsam. Vel quia aut. Accusamus eius soluta non voluptas harum architecto alias aliquid aut. Nam voluptas sed voluptas. Corporis sint dolor similique maiores.',
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
                id: 'd44fac03-2236-4492-9511-576fe4024c39',
                tenantId: '8432aec6-22c2-49a2-a5ce-987bb6221ca4',
                tenantCode: 'ba740vw4stzxcox544bn9uu1my7vh79hwl43adh6v5lirr3zd4',
                systemId: '51c31370-5ea2-4417-836c-5841d6811822',
                systemName: 'oqxsyz6bcrst2kl6piph',
                executionId: 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-29 08:28:05',
                executionMonitoringEndAt: '2020-07-28 17:58:35',
                status: 'INACTIVE',
                channelHash: 'c12yljlalzlrpkkuz7i2nig8ep9ps2l5ovkgfqzq',
                channelSapId: 'qgdfcvx75gpj0ycpywfe1ww2xc5k5dp6j3arvfkwphay4nrdvl',
                channelParty: 'i7oycsovadevyqn3gj0yycb3t3iqocv7rnb1f8103nykob7v87yhp6i6w3s4l7szps30z35w84xzvayc558w90f3xvkdbi8khgt6k9737yngsekx7b270e5d4jo8vqfijcxz44uyioi2d0xs48gqegkfmq294z1y',
                channelComponent: 'u18mj38selwplpc3dwehi194ajyol38l99fy1hexcbamz8a4pmz0rgar1b4zxp8d2wi2dcv55nt9xc77e0yzoen8i5kr9lewix59ijw8xw55cptuiattltc40igb61siurv43uu8qu1vaxn48a58g0hotha475vk',
                channelName: 'xtl7h33yz9oyvhd4irz3iepa6b86jrllsc0m0a7odvob62au5ods85rvnjeq4yyguf748u6n9l2w4t5ygxkswolvo2z0bbg5vxps88nbfa8ub9v2rxyb0z323ovw811rh8fu51rq8qqu4zu1i34pib88gue52owk',
                detail: 'Minima eum qui. Tempora consequatur quis error tempore. Voluptas perferendis cupiditate consectetur. Hic velit eveniet harum. Aut deleniti possimus dolore mollitia. Sint eius illum facere nisi.',
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
                id: 'd44fac03-2236-4492-9511-576fe4024c39',
                tenantId: '8432aec6-22c2-49a2-a5ce-987bb6221ca4',
                tenantCode: 'v86vzurqgbt6l8e5gc727s5cuvmn0tpr09y9qopjhfffmif3gg',
                systemId: '51c31370-5ea2-4417-836c-5841d6811822',
                systemName: '4e6bhce1zupd2qrhxs8i',
                executionId: 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 19:04:17',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-29 01:27:43',
                status: 'ERROR',
                channelHash: 'xqs14r0b4v227cpn48zkhibt9jaxcjdyihv5mxec',
                channelSapId: 'xof2dobhoh7j5q5ddr84kcb24vir4q5hsl9s1edir1egy77hq5',
                channelParty: '0u4xgnuexu9mty7mvsvyvj3ete1wi8xqjninxlt59muvhi7j8v3r3fveqnxmocpe08vetjqljfu30dqn6enp7xu8gba35fwnsokfq7duje8alrcg9thb173gu2308uajwx0fc45zsk890mt5zwckpd357y3ln0sc',
                channelComponent: '5eg04gxkqxiy5jkzpvr4kyyl21nhrnzkwaqe1geh9sfyl57zhzhb024gokhc20vxu52g492mzhvf3ogwdsnfp92ah9ljzrmvzij31xbahldgu7srkkr2x7vkb7atcrakzwgzxdygzn83q8sx8jenediwfjlbwih7',
                channelName: '8ienaoka95vljiipmrbzbp89uwamdalldsocno1yy8egqenkk6xj5z6yu69n3p0zqoo6l89vbv2k6c4qijwadw9zhmqkbpvr345vypf4q058hqc36bl3rr8lqpmrasf4ley8wiabrqycuro0bgv195wsk5804i16',
                detail: 'Nostrum et tenetur corporis odio id. Laudantium nesciunt sit aliquid veritatis quia et sequi. Eveniet veniam velit inventore repudiandae et. Nisi necessitatibus voluptas excepturi porro in perspiciatis et. Voluptas qui quam facere voluptatem nulla minima aspernatur. Quibusdam ut necessitatibus minima voluptas eligendi aliquam.',
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
                id: 'd44fac03-2236-4492-9511-576fe4024c39',
                tenantId: '8432aec6-22c2-49a2-a5ce-987bb6221ca4',
                tenantCode: 'm64bshqm4lnrr3bz9xgv6vaumd2xtot5mmy0r4x1dusvaez2aa',
                systemId: '51c31370-5ea2-4417-836c-5841d6811822',
                systemName: 'f6aoifv8co0ovleba1d2',
                executionId: 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 16:30:08',
                executionMonitoringStartAt: '2020-07-29 04:00:20',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'SUCCESSFUL',
                channelHash: 'k2ptg89t3bjzfw9r9xl317z83aoru8njh58cdoj0',
                channelSapId: 'h74ygk4weynfdva8f6ugh9uw6moq3x0ko6t9fmz7sonvagy620',
                channelParty: '6t8cgtkzqej8ah0okgbrrnv7htogmp8km0jx6wen8lf3ia0ts7kzym9ow3sykdhruo7ktrn7yr1lpztuvbmo92qfs8jahc0ljpu01qisjwedwctpo0qwxj0zki40s0x8f9fkxtnh38t4i5skogcib7nfpw0x1s92',
                channelComponent: 'pm9tmh3d7qtpynqh25cm40w1zo01pfhe26czaq9h788bvpljlpukqjct5ina0yqzqt94kacf637qdrtlc7a7qha5vd3ouu0dchp17ztl20aci262z1bt3utdi4ibchfpcx5z3gz7zg903ll7fgx84bquuvpy4p8v',
                channelName: 'dqw7yh1eex58gfjs0ehb08bx32vbb8muehyusfhtj1hhm9m90dprjwcpufkqljxi0rqi71mxkvsli97pn0x2oekobscyqk8ofrwgkt3sklie0cfrjstztutfchaa18bi5m0b29e1wforfnldd6o5gl4cc7v79771',
                detail: 'Reiciendis sequi voluptatem atque minima reiciendis eligendi non. Rerum fugit cumque consectetur vero. Aperiam rerum inventore dolorem consequatur velit numquam. Ut quos et aliquid.',
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
                id: 'd44fac03-2236-4492-9511-576fe4024c39',
                tenantId: '8432aec6-22c2-49a2-a5ce-987bb6221ca4',
                tenantCode: 'aj84rvh9s90vp5huc39p7tcozfw3xlw95riqm5yn3m0579e0ia',
                systemId: '51c31370-5ea2-4417-836c-5841d6811822',
                systemName: '7izwnqhf3n0vn3u7c23r',
                executionId: 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 22:28:03',
                executionMonitoringStartAt: '2020-07-29 11:16:36',
                executionMonitoringEndAt: '2020-07-29 05:46:48',
                status: 'UNKNOWN',
                channelHash: 'r9w5giuiqgb5wb5h83ttlgjwpakb5pdgmf0aw83v',
                channelSapId: 'qjwuxgk61rjmlnqela0odo8fhfktnzcrtpxq58f5z4rxwj2zx3',
                channelParty: 'w59yy1dlj164ak24b7iiymv5qkmal5mdal56p3l3uha0y8yekusslaaei5evnt2llt2wqpvfc5t8wvra9f12ggyx0s29acxjtegufolgcgp0bhv87qd3xabri8i4eo6ko34bvomyxrkfumshqzkuw9t1am0qswmb',
                channelComponent: 'nakkccq9dw10iqagsjz8tf3h57mwnsaaebldbmu0nfo5mzbddpbusn1a3d06wg7alngdt3tg28j0twv10z6yd0fomqq8ommkvcpwgwitxuudiolixemj9f6jbm9c4btbt4bt7o8qy45wly95s6nvpggnow6wm496',
                channelName: '0a6kypruj9x3hnik7o6q89rswyrlx2kh4khfxzfttxomcea3buussdvqfe0nsta0wc0knsih5jemwjt0kmfczl5jr76avqofyxcytnei0il1mg24yml7e2p2yv5erq0du0lug8mqk3pdnm3g5a1ckuf353h5td7w',
                detail: 'Omnis impedit necessitatibus tenetur eos quod omnis est nihil dolorum. Dignissimos eum voluptas aut commodi aut autem eligendi. Qui architecto nisi accusamus.',
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
                        value   : 'd44fac03-2236-4492-9511-576fe4024c39'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'd44fac03-2236-4492-9511-576fe4024c39'));
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
            .get('/bplus-it-sappi/channel-detail/d44fac03-2236-4492-9511-576fe4024c39')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd44fac03-2236-4492-9511-576fe4024c39'));
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
                
                id: 'a6f2ba8f-c36e-4d49-9901-1965243e8652',
                tenantId: '8c73b65a-8fed-4606-85c7-ef30e5046b94',
                tenantCode: 'hmdkj258tl1i8ewo1qr9m20ryn4vcl592cau7hlrxel605xejh',
                systemId: '16ae732d-4edf-4085-a1b2-d09f81608ded',
                systemName: 'ebdxteogryvngsktvpjy',
                executionId: '29d0e436-727e-4f28-a860-2803c09e5679',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 03:02:30',
                executionMonitoringStartAt: '2020-07-28 17:37:19',
                executionMonitoringEndAt: '2020-07-28 21:54:12',
                status: 'UNREGISTERED',
                channelHash: 'z73far4nvwiougw7qvnwzr00fttpwc99xzki1s5m',
                channelSapId: 'gfpek7k5i1vtnt50oxi06d6syyllcrxdryqza7sk65fwe3ak4a',
                channelParty: '6p1wi7rnkxagdnalepie7rygr89u4c5qwsgwn8q8gm9lbfm7vnfv4yjpszzu6q5ygueg3gvrq8f42eirnylbng5ymu3lbnc00wt36j0r4n27mm1jk67jqob7f9azwohg367niudfrekkhvoyne0ym2q4yer5vb8c',
                channelComponent: 'y1c0empto16ugu2ipho58wyoa3xfndmz3s99snp32b39st0hbe26l4lz7km3lobf7lo8c9wdle7up2qho0hjyntqci5ldgm29fh1czcjcmvk47eiich6nalm0ggdcc73972fxp7m3uavqgcclq4q1ndohqktsc6k',
                channelName: '7cpmm0jvrh9wkkhxsn069amfmqjgkmwms65jfsmgx4dpqpugqs9d3tqnitwbuxzms6ti9g0tbb6ses69urrof87adxo2yeac9adqbuyvfdh5cfnk1lgd82gofbkj8sohwlx0lsw3v7x79r1pxeqbqc8x42zh64y1',
                detail: 'Consequatur aut quo et quisquam dolores fugiat sed voluptas officia. Quas voluptate possimus. Porro odit aut nesciunt. Sequi est dolores velit quis hic et voluptate voluptas corporis.',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: 'd44fac03-2236-4492-9511-576fe4024c39',
                tenantId: '8432aec6-22c2-49a2-a5ce-987bb6221ca4',
                tenantCode: 'e0utlbtu52lfy3t40i1zt17qnhdeqruad2bvdrlt48m5ceorcu',
                systemId: '51c31370-5ea2-4417-836c-5841d6811822',
                systemName: '2u7sqeb0n2afn985g45d',
                executionId: 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 16:53:48',
                executionMonitoringStartAt: '2020-07-29 13:23:28',
                executionMonitoringEndAt: '2020-07-29 08:35:28',
                status: 'UNREGISTERED',
                channelHash: 'oerw76hrs8226bn1osvxk135pljjfl0gihoj5230',
                channelSapId: '4ru7cxyenydsr4mn6xqy7e1jpffd6axll5h9uef1ykyr2cd4bq',
                channelParty: 'nf1cbtrijuaygjg1lkw9uxi2c2ojc7da959pwke04acs0eqdy0kqgjmgrzda2lec17upj6wmmcd9etjlf157cf69yt94sc0041j550qs7p2tfw19tbmhx8dl2t9vw2rn7r9pztd5gaw8rudigblp8ikb8u0n3k8b',
                channelComponent: 'wdylcx6giy25ta2fqbpce7vj12wgjgw61c05iyunj9vqm6033gty9wux7ww5lt618lfg64en8scgxk1a3v2cz5to9nfsbb4mtymrgnni6tpxd3efmy2om3kyqda4msksxtn83brro69rlswnrsjlqr4bvwb6ieeb',
                channelName: 'a9h1z5269e22ci226tsbv5q62sccob3dpes204osim69kwa62runwr3irbnkzqj07sweo0v61akw7dt55iw0qwz9z4y6dtir7wuad2z18zz5455q4hbqdm7n8npky0vlzn0kewlyb672x1buiffoou05mmwfjkq4',
                detail: 'Laboriosam laborum numquam doloremque. Non tempora quia. Quasi possimus iusto.',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd44fac03-2236-4492-9511-576fe4024c39'));
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
            .delete('/bplus-it-sappi/channel-detail/d44fac03-2236-4492-9511-576fe4024c39')
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
                        id: '76183703-85d6-48ef-acae-7aac9c6deacb',
                        tenantId: '8432aec6-22c2-49a2-a5ce-987bb6221ca4',
                        tenantCode: 'mimsga30prjgmd1voheqd447b5a92165zjorwa29u6jyxi671n',
                        systemId: '51c31370-5ea2-4417-836c-5841d6811822',
                        systemName: 'gt7u5ivy7sodr8d0o6tu',
                        executionId: 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-28 20:21:18',
                        executionMonitoringStartAt: '2020-07-28 17:59:59',
                        executionMonitoringEndAt: '2020-07-29 03:05:45',
                        status: 'UNREGISTERED',
                        channelHash: 'ue4ylhi6vmxz6wm0kije8j93jr0imjberaxe1a0n',
                        channelSapId: 'yn5gcgqd4rfbjw37t7i5ef5ujbyjc8fl8upk8ijct6bsbhchxj',
                        channelParty: 'qwkon828jfyjtltxxfmbjeh1bcvi1go5l7edou3kpjx8gaiymeygb2r3lkfx86jseuoduwnwob0e44ru110hs5d1s90zuwxvsih45hbvkdq6hktsk8n7uqm3z8w4lncj13xgtx72w8o5nczjaxuiq5ur99zjr5tn',
                        channelComponent: 'prjl355p5ue3b9avs8d9m4owukogltrex23z3qz37w6wgiuar0kl33db4cknx4fdno05jhodvllzoeg5099608wrbat2a94vcn4hhk5wgoc7zfmwwfkcw1tu68gmepzv2zg5vujo324joyubplkqu3ecy0fe6x29',
                        channelName: '36l3o12q3b4q71on33x392k7he2bl1kyi9e5jpkran99yp4fcj2qo2ofeeu6tcje6cjbu57ry5jjqzcd4mxk4uyeo79k55vuq2rv6cuo3gais8xwwcmc4rx7h8t0dmd9yzhb1ghzof44mxehmucq01dt9x913svk',
                        detail: 'Aut culpa nihil alias ex dolorem veritatis maiores. Et quis qui delectus ipsum recusandae. Temporibus dicta suscipit blanditiis. Beatae voluptatem consequatur voluptas. Dolore qui aspernatur et dolorum nemo aut. Et quia quaerat neque vero asperiores est doloremque autem consequatur.',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannelDetail).toHaveProperty('id', '76183703-85d6-48ef-acae-7aac9c6deacb');
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
                            value   : 'd44fac03-2236-4492-9511-576fe4024c39'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelDetail.id).toStrictEqual('d44fac03-2236-4492-9511-576fe4024c39');
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
                    id: 'd44fac03-2236-4492-9511-576fe4024c39'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelDetailById.id).toStrictEqual('d44fac03-2236-4492-9511-576fe4024c39');
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
                        
                        id: 'b2057ca2-e303-49d4-9f14-48e64788abad',
                        tenantId: '6b8f9e1e-b330-4c87-8f7a-925534ce5031',
                        tenantCode: 'wd54ol58o7m0oey0e69c6snhgxw8dssr4n2tzfm0400qpm1z18',
                        systemId: '6f5a6282-6f6c-4c7e-901d-2f1002ede360',
                        systemName: '20ppj5q7zsc2th95rt0t',
                        executionId: '04536983-fb71-4be6-bfab-c2869aef847a',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-29 11:12:44',
                        executionMonitoringStartAt: '2020-07-29 00:42:24',
                        executionMonitoringEndAt: '2020-07-29 14:18:08',
                        status: 'UNREGISTERED',
                        channelHash: '19ndkx7qxftme7ab39dugek7yg0ivbr5wkg53gg8',
                        channelSapId: 'n784adbrybknujanja21yfx01quad3useqjqr89gpdkvplq01t',
                        channelParty: '0aznhmlrzqd9z3tm1piwwu5fy9vgzy5ggxjsohbvxpqyuyxmy0s7e31f3gkrkptw4ibzg6th2kzwunorv6gnvzsckho9fe3vjjbb8fegx0iszfn5kll2aruzke6555okvmwmj8m1s5gob3ngfs7zbjavbueud20c',
                        channelComponent: 'w7mcf6uez36bkpg2k68kx6trcs33qai5237z54gtoo0hn9189vmho6gwittkkvo9lba6lrx0f1sqpakho88icsve0ne3ijt54nfu0wq1pju3is4ejesy934tknnx7nauj1hsqclx4qhwr81gpf4454qwoe58fkr0',
                        channelName: 'ljk0en73mcujl3r9wz24dkx311b9ixxpm6yi15tz9bwoscys3alnwtoyts4ldxegg2c086kzk8yik564fep0er267wyj6e8dilc6h7ydfd3vayteo41ueqcw2vll8z9kkdt2hz0p4pvhekj31m2l3ss2xgupwc61',
                        detail: 'Quo et autem quidem aut eaque. Nesciunt vel consectetur. Sed error fuga quia. Sunt qui quisquam repellat iste cupiditate accusamus.',
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
                        
                        id: 'd44fac03-2236-4492-9511-576fe4024c39',
                        tenantId: '8432aec6-22c2-49a2-a5ce-987bb6221ca4',
                        tenantCode: 'f49w4i0cx7i7sw4aftvw6uosovnt4vvle7lg5wtzkohu03g8er',
                        systemId: '51c31370-5ea2-4417-836c-5841d6811822',
                        systemName: '0vl98flggz9rp0a2is8l',
                        executionId: 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 07:04:46',
                        executionMonitoringStartAt: '2020-07-29 12:04:18',
                        executionMonitoringEndAt: '2020-07-28 22:57:37',
                        status: 'SUCCESSFUL',
                        channelHash: '8fgs2lszgtznjaf8q46b8ang8m00nyvtuu6ugnkh',
                        channelSapId: 'uu6xspewddvl5ouuetz0t78qe8xlhy9ciul85kv1j20zj0scf3',
                        channelParty: 'inbqap7r0gguut22pofdymlo2hk0kse7lph4d6nw02dfd8qe1f6j5tj4e7tt5e0s7zwnpu9un8z3bfgm9bktgk28m4o783wzokcan6dda7q2bhaxanu45vonqm3slhu5y35hq98k8qsz6wqhgn5dlua2tklj1bbu',
                        channelComponent: 'rinjv6h5x4k0806g7n9s8rjh8gzzw31pargzpdz02ryyef4g012z79r9qmk11ul6tm818paunvbgmrvbc58ozgng8htzrnl8yzjndb2gd0hjosrmmfv3tja8u5eaz9katskoelz7nqc9mvu75m2orgisdi4ug12t',
                        channelName: 'g0bsqdxkrlhgtkpr52tvxzmf39rsqa6inwhmy3difkpaq4rb4a4cyjxec3am3ggu85y93069406c1lhenvulwvkvbiven99zekcm6skxn0gq54mnsz883kyp8obo0sky90g779w1ao7ignqopt2u97hgognvzirn',
                        detail: 'Dolore suscipit vitae aspernatur aut distinctio. Blanditiis maxime quos dicta modi voluptas. Eum veritatis cupiditate impedit laboriosam velit id officiis consequuntur. Repellendus aliquid et similique eius voluptate nam sapiente rerum. Non et maxime qui cupiditate porro modi aut consequatur consequuntur.',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannelDetail.id).toStrictEqual('d44fac03-2236-4492-9511-576fe4024c39');
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
                    id: 'd44fac03-2236-4492-9511-576fe4024c39'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelDetailById.id).toStrictEqual('d44fac03-2236-4492-9511-576fe4024c39');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});