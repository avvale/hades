import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IMessageDetailRepository } from '@hades/bplus-it-sappi/message-detail/domain/message-detail.repository';
import { MockMessageDetailRepository } from '@hades/bplus-it-sappi/message-detail/infrastructure/mock/mock-message-detail.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('message-detail', () => 
{
    let app: INestApplication;
    let repository: MockMessageDetailRepository;
    
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
            .overrideProvider(IMessageDetailRepository)
            .useClass(MockMessageDetailRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockMessageDetailRepository>module.get<IMessageDetailRepository>(IMessageDetailRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: 'sdew4g3lbar7arjbuul7',
                scenario: 'htade17jipnrspz1a6yqfrracssuca09k2715mawmrvmi3487azuv11nb3y6',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 12:53:06',
                executionMonitoringStartAt: '2020-07-21 13:08:38',
                executionMonitoringEndAt: '2020-07-21 11:23:01',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: 'v9ez0p1x7zto1j2635e7yeolcrezbl1w8ve7yp983t7lv1q5mihhvb3lip3xuuy13m6ajwh3v0wia7q0scr8b4ckwnav6zna2vk792ozkvvijm0ntpb6rkapr6k8fdoab7kxbk4624zpe7fx2ge9393n2il61sfj',
                flowComponent: 'ofe50hxtzs4qivw4st1r3mu05e3fxf94ggznhj0adfl5t1kgwf0l4usqvf96an09x42upbsvmlo0i1pbuh0iln0xyj02j8mf4bjb8s2t56cbf7xprxe4k1kno435ivmm4z5ykymq1d0pbwde7e6u13zt6vqfnaqc',
                flowInterfaceName: '4zilyqth4lqfcaydazosqh9y0y265jacqnqacapdqg6dfermlfhpxiorl9h8qvv3kqtemtkjhy0qh76q2p9v10rho64icffyg3bdgchflrfp8jx0176uu3s0r9lnmlclhyshqu06qm74koddwygborif3tkleus7',
                flowInterfaceNamespace: 'nwx1dpky498xn9l44qa267gnt8h57p7su3puehaiivgeg8hdl17169yrsw0ta53nrzanzwwn53av25kkeyxraw9fd9axmzacr4tm2is327td7niqwmb324n05tj0nm6uq6mdh7e2qj45rz0wpkeesspzo2orv2sb',
                status: 'HOLDING',
                detail: 'Quaerat porro quaerat fugit at ut cupiditate harum at. Totam nesciunt dolores impedit ex tempore eius eos molestias est. Ad dolore debitis cumque. Eveniet quia excepturi labore id nemo culpa. Tempore et qui quos. Voluptatem nostrum fugiat distinctio ut amet.',
                example: '8nseccehbkbpp6ux3sk6ws1wx58cvpjpjj7ql7npqkdfzw4ite50eu3zrlhf8f19rhxu3b8j8zqmx2yui0kjg94tn7q5iktwofzoeqpvi7jq9080ri2vqa3e2ewei957xuaxz0ugst47qtt594usel3qnsocve0h',
                startTimeAt: '2020-07-21 16:50:37',
                direction: 'cuzoth0t49j33iz90l63',
                errorCategory: 'kgghig8uyxx7sskekapcg7jti3qi0f632d7cb8ukqv58tish0pnp7lwusb6igaze7ls0fv38rm9v30mqfj0mhqqms6szw32qe4hv5239zm9lc7dsxlv8dcjq7ct5nhmc1z8kdrfoc6q4zjaar4f17bsrsuc2uext',
                errorCode: 'vqvtgzgk5nxjxellirpd',
                errorLabel: 'aqiutsc637wrgodpuos1rr3kro2aga70pgp95ylug2ykh75zl9i1yyatizxrpvjvpi9r9g9pgi8pa3nudc5nepyumqnh9u9exs5sltyu3hizhm7waasx3gxy21c0vu8zqlm7ipgwdjkrl1gyq03nyleab4dv2owe',
                node: 5041779762,
                protocol: 'kuflmhn7mfgr8xhy0dll',
                qualityOfService: 'x7csmrqo16myfbxb5nnk',
                receiverParty: '7ccov83cm27vi3vneuqczk28ztuonogkz8x3rgsmarb5pmt7iqq106mwjy78pp4phizlli78djnbikutlus0weqm1hn881xm2bi9ii8v5gkvb7enyyeldnqa741a6iw17xyvnlueylpmeocjiw59o6b2c2e8ssac',
                receiverComponent: 't0ynuczggo22x0jtoejm341gub8f4nqq1tcxb9tncto9l6nl638fy6tkcar7cy9jt7qgmt67132ncczxccztffnzfdgviu3bfdxmvlbx90fx1jjp2munshrh7h49ecj5he7iayli5vq0cg9dkc8s41d6xqmz0iuv',
                receiverInterface: 'm6iv7lr8wko199rclb0wx6sr2qbt90lt0nyb28vbbqa1r8whqx80kfw14fwp1hsnxk9nenysmkrkh6dn2kscyqphopfr5jxohnxcjrvh4pc41n9vcwvfhr95infia4w1xyh4v9p6lp9wlobabmv39w5psouzljow',
                receiverInterfaceNamespace: '662o7qsh12dnvlp5n7mu44z4ica3m36zxc0agq0a5shsms6rlap4qr4qd0q0wmev66tkcja3oso7d1l4g2ci64c2g6zgvzs0gv84jai22fkygvvgp42co45ghmgtt7m1jxq1ynbupkoknmzafqqomguroc8nsbyc',
                retries: 2076542744,
                size: 4719738983,
                timesFailed: 8706544048,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: '1xk99whg9ka5zws08ppf',
                scenario: 'fo3wd48ejp3gyctulpcot2wet0j7pxkrv34t3ol8zyqx4y71s09af7dpdgo2',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 16:21:04',
                executionMonitoringStartAt: '2020-07-21 16:08:15',
                executionMonitoringEndAt: '2020-07-21 05:43:56',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: '3uraqn3i0gzgtt229w59q0n0sjo0fqq95uxzv3lrswfqvwy8i8h5h34t1gtm0chxn37v8socdajtufsl1gtc00v7sp0pwfystn0wr6ydkjookwvbmwbc9cj300nxkka903dw4kkfr2sc3lypxkzobtjhx461voqj',
                flowComponent: '3ylfi9qc8glfx2q6l3fmokmhl1tg0vcw9us6i2jqhbmpmxk9dt8ce2itywqjc6m15zw36vq16926y4x8jogtpjx9qdmhsv92s0t77eky0tvy7sw41tf0td76la1ksiywgr0tecrvbvdisb7axosuv634jsb8dhh5',
                flowInterfaceName: 'vv7vq47lymq4hch4gaqfpasi80jzn91ql2p1c142tvqovvms3q85vrdhn1xo8kiddqflk3vlfwdp9lt15bx2fk86br35g0tv1ou5y3iac48kxqqajn3d2b0zdde4rk6numvxz22ode7c8gcg0mg4ujv4f80zl77n',
                flowInterfaceNamespace: 'bdwyxbrt5ihsy7mqvq6i5vmpg8pxnhftnieqpib0bxi5n2f592avr1jd82lo9mqrb2ck5g1986u7ut6mgdntvuq7a9gi10i8lagrkam6zos72fc2ikfkhc2e7eu0lgs00elevxysuvubd1acxb0x3e446vgy3rdw',
                status: 'SUCCESS',
                detail: 'Occaecati quos rerum debitis maxime debitis in dolorem alias facere. Sequi enim eaque eaque qui nisi fuga et in. Sed eius rerum.',
                example: '9251ppb1hs88nr8rpfegyiiwinpr3pzcaeei656ujouq70msojn5y18s59ab42z8tg4j6mltjrpggl7djn6ag83ffpni5m4n3m4iijq5wheod64q3kn0ooyytt9a6wkicu62x2rq0vfqhavd6zvzc40s4mumd6t5',
                startTimeAt: '2020-07-21 07:35:35',
                direction: 'rd2xtrvemh4q1c2j3jso',
                errorCategory: 'm7d2pinlmsd1xtf8nv5lqvgcdzomywc7s7eb8dmcwjjo6t5hqp5lcw02kmy37ubdlexjvdjg14bvzy4pq07abew55qy5ofw6b0p8hr51kur5fz4869pyl2asdhpfdk7qwkmi7qc7y7ob7d0wv129cs0xot7oneom',
                errorCode: 'ecvo9g2g2utbd38z4nqx',
                errorLabel: 'y4l78vic8solwub8f2nfd67zxztvdgwtjqmudbrqjxi359c8xihqeq1m14pjrgtlft8wp5gs87zjwey5hjyzjebmb2wvss1vsg0o9yodutd2jvdijs2okj3zs2l0ga7oyg2x1w9gwjw8hugsqvbpwx0cjm82c2yk',
                node: 9935974366,
                protocol: '1teic2hz03sv4dj3o9c9',
                qualityOfService: '58ds8uv9yd0gm2edy8pj',
                receiverParty: 'efrl355wxtnfnn8nszv7jghdmdt6pkoj6gn44f2jwwk12a7mkuk8e7wb4hlomznemtaxo3rttxq9eyfg5b09z6vw8zi6mwsfq0lg4vknpvt83hqi8z75p1ef3p1bnigomaqeqxjj1gu8546kqk7ow5ia8esbgrfu',
                receiverComponent: '9pxzbgotcxxvfacm66xdzf24yv962x07asjj9ia6icjwqhts22on7636vx0r8vmoqdnag9laoie560gq1kj7ndpbho0tb5v9hlk4xsxx879go6yy3r5xelnevgzdcd8whm0sym25obu9zrsaz2oxgt07ya34mftl',
                receiverInterface: 'gvh260hc6pk90w3k9wosdvfpe8qqb30e9ymwlw193g8lsea8hvk284lsq53tncxzk65c3xwbz6g36j8vfamxc0vv7i1xncb2ch2qi0s73e5qt7y1cf895hjqur478aoroqs8mzl0hdr5bn2xyrel3uh8ad599h4f',
                receiverInterfaceNamespace: 'ucypdu6wksvowjte98bqh59qqme5dii6g8xqszy0dwygr1fr0f4v8im6o6jd3fz91ko94xg3daxw7g7udqzqemf6svr1vx1q76puuuhcprur0z6bkj5o05gt6m4hopu0ndz2bmvr7i4x1t4ajtncq3tnf1t7u0dd',
                retries: 7590179975,
                size: 6486625747,
                timesFailed: 8505439819,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: null,
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: 'b4o09s2xy5bxv4z0a9ce',
                scenario: 'm7jjiznvdvp6zvotslx0kfyulblhajm3n94bgjrx2n3sm4p3sq166lmy2sx6',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 06:35:53',
                executionMonitoringStartAt: '2020-07-21 06:42:37',
                executionMonitoringEndAt: '2020-07-22 00:04:34',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: '655bli91ojp48rms6fep0x0hor0lb0vkm8w132058eqeshhme73uxpptrtcdf8xjne8tpuxrt281mf62qfuvuhztpxnntjpktkn1ne6wj1bb27udsf11pc16fsmvalkrw8lz8a6bvq69kwtn66jxpsajzcuo02ob',
                flowComponent: 'zf87w3ub4stlhm9vamj8um854q5ymysjej11wf8traeneroszoadkv92e51qb8twlaqo60d2jcu00tovga5v7x2jyrmjefq0ekssez9yill50ebdvuppe1likchcycu2zhzim21umbwsrzxviq8o20cyp4fbdgq7',
                flowInterfaceName: 'zfmyyag4mrx41yg263nvtosbcr601xqqi3dsg5rata2fr93s2veq79g1kpudtjhat4aavmjof6ign9thgje6wx5grzmigglnll09ubjo6frlkk11so8bz78bjcmt2x491i0cm5x131gi2lm48hqrsm1brb7bpvxv',
                flowInterfaceNamespace: 'z4szwvv7nus424852o45zrcafc7i4kty3fugju5lgk9wepc0ewmrllsn2q3ip7g67re7gksx10eca92acvothzy2g6ys6dujwx7au252y74fke8ba3xr2aqde8v1yll5rmoss0c6ltuyoza5tpb5fdqo12itbjcd',
                status: 'WAITING',
                detail: 'Eos omnis facilis consequatur ut beatae earum. Et eius ut sint quaerat et tenetur. Aspernatur itaque ab quibusdam. Iste quaerat nemo quis corporis in vero. Quos laudantium odio voluptatem deleniti dignissimos qui error doloribus.',
                example: 'kiog2gkves0oqy8xr1pwq33di2rd5glyoi9l4la69g1ygdranbkapdv3bgw1fz1bwajo8wddgd9xfk5dspoqmqdy55f6sbwpjbr3anxuydxu7t7oi8lrn8d72158vkcc6sujmkm029dhkz1gue3doj1s30jbkb61',
                startTimeAt: '2020-07-21 07:59:20',
                direction: 'cop5d6918uzgz98snzip',
                errorCategory: 'vyqlns1rli9kl7i32cawhxcablji661cs5bl9cohpbfzed2kyc7fy8rltyx79oelrbkqpuocq5ndxmi9nrsn6mnvq3g0w33850yn1tw7wg2fjiphhxnqo0e7d7pspjcrhr7z7yy6jiyc44qf9x5vkp0ypidymbtj',
                errorCode: '442y41lhcjrmvbe8t6z3',
                errorLabel: 'riywn4bmy5ywvw7styhfdhxo9vocaujrqffdfdrnephfyz74vjhvymq0vj7b4gnmlqm4zuk2jnjix7inna859yywsv7umdmzqezplzqyb5k6cw3zyeoevro2te7118f1h5cad18xewt860zedqglby6tkkxtyk0m',
                node: 9603880925,
                protocol: 'ghd45r6bmz8dl03ozdf3',
                qualityOfService: 'g7mdwknat5cpe8bfdd1d',
                receiverParty: 'xzul9m97rx9e9jbcikrl4vkc2s2u1hw09jng6r5pceo4jh0op52mp54iuwo4l201w7zfeucorimo5qqglrhhy5ncq7wlm7g54y8nzyyfg9xdnowmrr0zoti7ppouohr33aq0a7s9qcxeqjd1wg767r9kfzoewxse',
                receiverComponent: 'igus24bslbmwiwro246mnu8go74o0bbrxrafdq5v500d55d0nfave5e24j1c0w4z1ryqe33vikaazqot13vqe5atpiz07myeikgx4t4okdyt6k9rd7eks8ycgh1ctev8zbbmicin1czy4qjz831pjztrv3tics25',
                receiverInterface: 'f235yyefq06fo49v5n3igsy7qp6m6on8rf94osrcsl74h78hntfyjcbvn7p1k2v0ci5cfsp3cbmwwx7u18sr4sgiv3nvf2axnvs4ume3nop65vetpnceoq9aumso1afpandxvsey547ns3scy66iuiiabhemuak0',
                receiverInterfaceNamespace: 'p7tpu9rqndb7ygt7vjd76v0904illzjn8hgfqxryknbzuzgqh3191nof589lyiyu8dy23qja9ujm9qji8wyol084o9ya5rneyuasa8s4e0ov4nw24rki9lwvgjdl9fa9x5lopp40hg7r6u0hgpt8xisuqwaxwfqn',
                retries: 6746566041,
                size: 4721934340,
                timesFailed: 3207700442,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: '9pdljopmkieg8z4op3oo',
                scenario: 'o8r4wdgo4ffm9bslqvqg97y52k18989alxcmamq4urikwxvwjyn19e9s9nrf',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 01:59:51',
                executionMonitoringStartAt: '2020-07-21 14:32:40',
                executionMonitoringEndAt: '2020-07-21 16:57:43',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: '8j2wemfwubn4fg44c6p2cjkeyzsyy2t813g9o58rpbvaoj2l1ckqjn97fmw4atwajirp5e62qv1lq8b24c27eehtfpx5f0v5tn4lk6w54mxz7dxoh3shr9lb2ie8sqr2fub25ph811wysta71wcn45z7d1wye9mg',
                flowComponent: 'l7mxzx0x67z0d5m2xjlkwh6cwnb8ew30hpavn0n6rprogyj5bx1ihmzem5onkmoqrwtxv1s1cp6b7dxi6gs0s6g6irk3irk3bsxiu7ep0v3aw2ck9mx8u1xvuy6ld3i2jydzns2tbj0o1yx09o41xsr58gv1p42b',
                flowInterfaceName: 'jghdyk2vbfdupfow8n2g9ye8mp70142ezs2agxu1jdeak671hqroha0x9lusixibws2k45buep14xifk2rmejncfzvnow04fxmhuqr2mwjvf3ew8aqqm5251bdtpvkn3cm3wg4h985qaseexynm5bso1c7fvimn9',
                flowInterfaceNamespace: 'wqoaecx7s8snv8snkksnvwek01kl5qhznx0zy24dv5tahet6mt5svzfnsuy9ev8b24gpyy49kccteqc63nttlvj9f3fhrxaiwd4wa6l4ulzeij4n2stb160m0nmwsosjghhmi1tzz10aa45sdegyr8fcopadlhfi',
                status: 'TO_BE_DELIVERED',
                detail: 'Dolor similique doloremque ex at molestias facere eaque molestias. Hic placeat repellendus neque reiciendis officia accusantium. Maiores quisquam facilis ab illo impedit nobis. In aliquid veritatis perferendis expedita est voluptatem id distinctio.',
                example: 'ghs91eop3vfq3bmwu4t5gzvuwsxgue43qvrnw77cyar6os4h5zq6gcrky16g4ro9kvpw3bcmczbkpzck3lx7qbswhid3iu0xrotkiyx7ecja89fcia1u7to3jrxk57u8bkx3dcy4omk5gpgp4u3zy393j577354s',
                startTimeAt: '2020-07-22 00:48:19',
                direction: 'je2yqbos7npxbfiiij6w',
                errorCategory: '551vo4vqc6xn3lf40dv4435qaztqbohcjdhaumjkc9vc5hvsef3q1mciozjqa8vepujow9crbnmk4e0am3i1mv5v4z20d917xg3pbi7tnqwdw3xz6vllauvkmvwdviyausk2p8vtqlih9x7w9xh7m3sicfprmlv8',
                errorCode: 'j5bp8qxute6w8o8konrh',
                errorLabel: 'oezwgvattgqato2rybx23mgyi52s38niimaufkv8sy4la1znqmuwki5axbne1ryxvuxrw465w7t6fbk3v4ryvsgesave99uzv4ebvqdar74qp4v9lf2k1chrivm4b42m6gq4hkzorirqhzderwczzsdw7lngmzgq',
                node: 4107738751,
                protocol: 'lnvol81r6ff7uysegrov',
                qualityOfService: 'odvjo70o2vzprleeb5m7',
                receiverParty: 'sk2qxnif466ai648mrn261ifuq9f7hi9zz87wkxazelt7tpvonakxek2ttgpmymb2z7nnn1hk2sx3vc6yhxd1jxt2juunxgevf4np8ioiaqav82wwb4qj4aazkzzyfigrdb2ilm7vaqb0jg628gv9jdinjfx67e5',
                receiverComponent: 'l70t3e9wfj06rzpqfqtscy3mh5yxjx6pvdk7y34ft4ynenyocvz2daptz026drjr7xbjwxyi3pf4qer0da0vbisoltw97txc9abrw50v5mzxusrm81uvhizqmctrrvb5cukk44xsjkx1ri8uohlmjic5pge4lz9q',
                receiverInterface: 'xsqtj1rwqtb1h5w84zv9by0tea9f03nj855gvfsvp1vta0fc4tcb0wlagkbe0mx3wxpe7t8owqjgdv7zp4dars1qdqb1ww535j9dzf3crqcifhxwcfm6asexf8i8kijf4dg807r2endxw5qnihbp4k3gx7k67o0j',
                receiverInterfaceNamespace: 'ah60d9vg866a735rvwky5b2l72f7phpoeumomhhbfwoam7t3qpy8xs44mjaaw0my458x6w9v8rwmusg6x2kfi9a0dnbl5ycl8pcucgsz4g1zfdxfclcgc8mdyef4uz9whb494g8ekt3fx745kprzqis9mmaccu28',
                retries: 6400680933,
                size: 2438732528,
                timesFailed: 4539588751,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: null,
                systemName: 'dalpd1t6eiw66o90iet5',
                scenario: 'hl1gldhaqmks72v1xz1u0v3y4ebe336fplr3n1jmaxtu0h0imfd2458ofwja',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 10:42:37',
                executionMonitoringStartAt: '2020-07-21 22:26:44',
                executionMonitoringEndAt: '2020-07-21 04:16:26',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: '5rk464ycch4pro72srl06n0g42i0df76d1ain49acndc2gjqyth21xk9o0z6blkce1mo77ynczyv9n600r12cmwr6ht8hss0mpoivz0uhbksvnnbw6dic0gdy4zybjjebnkpxkfrp3yhlvu79v9uv0dewlq5p42x',
                flowComponent: 'b1qmec5rogg5h7r07u9va02ns1z2yi3b63o0na0clm6p8jhua01lq30mt1bkes248k1q5w1jy88ast3nkxupwg9uumhkw1899st4f3qbjw1z0rke660y8s5p19kx905w3fnr0cp5w1h4j6hqwr6fsj9nehdrhzvy',
                flowInterfaceName: 'wk5xjz1j58ddfq7o48c2lza54fc1nuepdpcp8catkk1pa3ne8b5gn0qppjlz78jsw2h6lkr0syz3i8b8he3hnmbaf4k9zyzu3u2rpoexere2hdde2qjm24evb4wpjsjr9pzfmvuasqss4sf21r8ykxizsokmnbh1',
                flowInterfaceNamespace: 'g52vlk23o1l7alcf1vj0mjyweb8kx4u8yqy9ncrytapcvj1eqepo8ai407rha9087dq578htb7jj7x2jqmlakp2md3mgj5knp119qfuhm3txcs29dhvjzpjpu50txmlf54gmhiiuxyzs9u53rjaqbeet8rtuidgu',
                status: 'CANCELLED',
                detail: 'Accusamus alias ea aliquid praesentium blanditiis. Perferendis itaque ullam saepe dolorem. Praesentium iste animi sit. Sunt odit atque aut fugit est nesciunt corrupti eos quo. Consequuntur odio dolor dolores ipsa reiciendis eum dicta tempora.',
                example: '3mehm64v72zfxtv23rch2ig6tbkyrtp3nhs1xpc9fcf7b7kbopt52ks0m14b2abf93lwq2qgef4147tdfnkciuiny0gibcjfmaxn31p048bjc6lcytdxy5wcwj9rg82e56ugsbmh76602v3qp8osmm9b2q8gn42l',
                startTimeAt: '2020-07-21 10:03:18',
                direction: '1e38x09y1cy69sxx6dny',
                errorCategory: '8gpailjkb7m7oa70ngeorxxc96bwojgto5z33g3wrg3m60ilt47vibfdmfbb20fuyd3o4vz8egcxyd7r9q0w3ac8w8oomphba1y66z1hwid9sf7mvivvx2zow6r25356s59hhe7hzimbo3qdltlut0qk7ws8qqku',
                errorCode: '97p5fin8hd1jcdf95tph',
                errorLabel: '4kqoe01q06kj5cu6smrhvss2jc0lq6jatanna6t2yncro2tgv275nffbmwa2sbqqj1ttqirqghqy3sfcdj5sgfwzr3pvqk65aagz9079f7bfjyymdq5ue693iccv2beibmlf1qdeyabv9mn0hzr8xnoe8vc58vrh',
                node: 5505536793,
                protocol: 'a27i52inmleg0mo2w24k',
                qualityOfService: 'szw4jvla5d3xmwd61l3g',
                receiverParty: '1buh9xk33h8wcp2pnp8rdakjylu8ilc12av8lk2yu42eutqdl0mwukhi0vplnwul39sr477u0392fs1zrrvot38429lhyvq9tqodu1x2dfa12bjyitjorz0uevugdqjtej6iwm93rtskl8sdaqgziqpb2sm1va9n',
                receiverComponent: 'pzo85pxxwojrcihmz4hg7n71c1g33ip6fnaszkegxqnhmgcle1y8jfcwlwtgi7n2e2lkgmru1nbcngqwbxdocisclb35e3llp39u391tuaedyvrbszrm2afxhv2os9l9qcqwcskvxyyr9arp094i51ngs5y1zfy0',
                receiverInterface: '77ugie40vhmtlengr5frekgf5kj7d0wm12gifopkmknjzwhu21v549zzz70ub0csz4xcdxpxueey3t5qieohuwvk6m9fb7rh4084mimrjxvnin13pj42kxw6j205qfn02v4sganaibru8k29d3x7m8mkikditxdn',
                receiverInterfaceNamespace: 'u2j7yuyflwrn0499m26mqpfia48airl21xomri64awd6sij3m8htbw38fv0uavxmm41j9nf8jom8fsjht6if5dxp3xgyvw74d6bob124h9ovqi9qu7qvzpu0utlm30jcz70id1gekbsmn2v7s81onq6qtxnexyxq',
                retries: 3000151328,
                size: 1767744432,
                timesFailed: 2756411434,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                
                systemName: 'c7eakyeaia608l3h92jq',
                scenario: 'dxpltyho0vye1sulp94q5hu3pn04k8u3acs76vb80r8hetxywbtxof9aa885',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 15:40:59',
                executionMonitoringStartAt: '2020-07-21 23:25:39',
                executionMonitoringEndAt: '2020-07-21 22:54:50',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: 'vy5s6059cbhcm9heny7w1iirut2cmdavsomwuri5fc9ac0w4k5yx3iu4248u690k6cu9v85fw9uhnbfsxo3fjf8rd2kdrvqln62w1k9ze0uoc4zlpeh8dsd0lehum0w6tqslqj8i9m30s0swisjtb0poc5qvs8is',
                flowComponent: 'a9tuv10qbr0t8ka7kkhtanpfabm3usoy72zs6eeb4o9ajwm8bak37vj9n5vvlcpre65uficjeiomdbt61vnua0k618nrra9eja5tagvy4p84951jpt6mcfvcsrkinm72q2atqygxihcb6j35ouzg0ly6sua47jgu',
                flowInterfaceName: 'dsg9jhjk86810y3llz1ckfncmjowp8akp16mznfmuy3bik6suzg5po1q781kp2n2zvumqxhv2wxzqgvbgnlls0b52ml5dt9d327n4zoa8v2ik8vmbvbgf7n6w93atgqsogjddiahq058al0fdlmy90z1n7ym4q60',
                flowInterfaceNamespace: '8fe5aq90e19sp84jal5iur8pemgmyj882gg46hadx06rsp9zu01ds1304ax4nvgfhdgp2u5qjyimjql990noq260gitgn0i8sozrd6rptx1v1rte2mw7s2e3nzazccxpgwejicu496axed9cu0n6jjhlojfs6he9',
                status: 'TO_BE_DELIVERED',
                detail: 'Repudiandae facilis laudantium repellendus ex maiores voluptatem nisi. Sed reprehenderit aut suscipit est. Id eum qui. Commodi beatae animi blanditiis quia. Ipsum voluptatibus dolor quia aut deleniti iure.',
                example: '8vhjjsw43ttbndsndk2fpry4qtzo3jz085yxc1dxeabcvgap6terg9wpjt3rtpuq32jhphxkqbz9vwd1gw6d1ivr7om9evid9mkmirgpc3xghe8k9rhdzzyysx8fff67fg6n13snbcji7j83ofgcslbfoi58kzj8',
                startTimeAt: '2020-07-21 17:16:44',
                direction: 'fwvum5i2phalymfldspe',
                errorCategory: 'svq0j7mama825jl23mus1k704vhf5pl891ys1uymy2ql51pf4g3o0gyvcmegrwbo9yb9enl28ukuqhpemuj1eqc4r9ucwc8v4dkmqow64koessb6admc95lrubae9fr6g1tk4sidy4a3wynr3bl8tjl9fhpzexzm',
                errorCode: 'e2nugskk1q9qmkrk9q37',
                errorLabel: 'emjae9q5d3c65zjh2sqiuot5fkrxd1x1no8w3tc6bqc3yjo3s44mnyd0l08ih8irf0vhkjxdf27ib4vgcle8h9hdcz29nj6g299cuihevbgzdoaaij120d5wcq624aap1gyeaxvuadpdc36wfx5fug2r0t5kzb7d',
                node: 7392247203,
                protocol: 'ns6w05vdef1jr651lno4',
                qualityOfService: 'h6zt798c6l2f0qh4citf',
                receiverParty: '0hh9ky0oytpagv0koomgxdwvgl5l6e9imocuabwpha0tys0n6ql4hu9hx35d3gai57skg340va1qp044nrqziiq7i8cxe973aoulrp15obx01ib1krljuuzzeas5y9probprdmlp35uufvkt6p08jfwfx5y2k6kh',
                receiverComponent: 'x9iz8kldstydg3zsmwrzafvo6hhtm4uk80qz1hqnrushvo9vp1wyujgyhsdftic89xexl77n7xbdpkoz1z9vpci81i5i46s7f9gd7xz7nrchzcw3xk7y9fmy58bco1pdoqwpccmv7qqy896noo2sg2vcd1hdsnbl',
                receiverInterface: '4v66g18zbm2o4v59je7t8ioemxrw8ryemsj1g93d0strjklesxz3a1s2e4e09oxqbir7be90ggm4tmx5l5ldaza6wizbtixzft14enk9j2gha2vk2sdz9hi9g8ijxqrwb1mfdg01gzlctwbxyggu40keeyjel740',
                receiverInterfaceNamespace: '1a63c5poj69g2gzk7wdb1hw3impctn8tlgwlhq0ph6odibr7glafnqou2v3s098q64h10wpy8gdtosh4y4df6knip9ivzn96pfxtlvnin0e7jd8p4s506h23u7nwgmnenjh49amod57mylavg3b8lvxumfd6i2ks',
                retries: 8638855806,
                size: 4549332892,
                timesFailed: 1046359019,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: null,
                scenario: '9xi8krcgeja4xbcepuk7f92txotzulsp4crfqhao405bbtavvjobdnebrlgw',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 21:57:46',
                executionMonitoringStartAt: '2020-07-21 13:00:58',
                executionMonitoringEndAt: '2020-07-21 20:56:15',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: 's72gv06ypmssu6ehrimeaaonvkhsi2435z6lcmpf0qflu7zblz7ckxh7fqcijttyi8gxzsaew4a299aiartbsn2xk0z63uen2002kcdui4ij3fmfx68ytlsb14ofu6dphjm8ikgtoohs5nma18xg7brlu8jkby1u',
                flowComponent: 'ifg9nk04sh9osa8o629qthd5chs007xdug7gq24nf2pr8st9r99ion1wp96wlrn1lsar1mzrjpf5itw9vq4dk1t4uh9mcnwlh7m2ea1p1w6auv6ttzb0av64zrlxiru2xv9hx20m1710yojqwa5saa1jz4kr9ncc',
                flowInterfaceName: 'k6ycb105hyrl877tec8hiv0nnlc9khqydakwruvlxof8355jbryjfmaf95qzfjti5vcfwm14lj6u10x87bwjjp4wokpdaptlmdrgyvinesh0m0cjxm0ghqugyb53yvtzvqxb61crlugw8fzcwfhj87wflavwrot5',
                flowInterfaceNamespace: '9mnaubhueldavay9r0nyeoplnn15u432911y0fr6z6v6zhbjglfpj05w2fr7va0ikfr6ydblgwdgp5h29j09lcrxn5xuf2fke17p0p193xjgrjsmszqvx2pyxfy4kl8qfs5k4mp126tr41ejxssze2dh856bqsti',
                status: 'ERROR',
                detail: 'Inventore ratione possimus odio. Autem quisquam repudiandae fugit dolores placeat. Delectus eligendi maxime aut magnam aut perferendis pariatur. Voluptatum alias deserunt dolor voluptatem soluta corporis non. Voluptatem nisi facilis ducimus sequi repellat quidem expedita et.',
                example: 'la9l44uinecy3n91w096mpm4luoe29940y5hqxe16dnmfk2h9bastaz3in8124zifch8ynyz6fdptpznj2noitl5sp7psn6hsfgaxld3at96n8qjzbmgmyf4hgwrrdch0i4e8g4ac9e3fuv8nh0h227j8ahqg6f0',
                startTimeAt: '2020-07-21 17:42:25',
                direction: '4vm91bsjscpqih556nxu',
                errorCategory: 'pcrxnxsid4id6qmxr207wbkasgzyk0ihrqhq06ngkjpghhayy5r1449jxfo3lkredqdtfbtnfuru2eiwokt8nfl7lukxhwcwzsdfrsdltatqrlfxqh0nhoma359v2nrw3a0k1c9xyxt7045sokid4g01pfyyxcvn',
                errorCode: '2u9jhmclv7ezpg61qgzn',
                errorLabel: '3vphnskee7d48hlu51uuddbrc55t813cjvy6u0u2p7vr0yunex1vf6a7pjakcdl46ksigrouleap8n5xh7tyebck718ysdppf1i68yixx6rkktdyxtnq0e5nn8kv9ftjzl4c73cl9g6progie3iuhqafivj62r2i',
                node: 1104611368,
                protocol: 'e7n8l37awl1vo6cmdoui',
                qualityOfService: 'djrg8uzexzdgivyh55vn',
                receiverParty: '2oa9pza33vgfosxy8dw27hkjfob9j4ty6z6ec3hqn4ry29ntfsrnwwgmjyw5pr9z1288b0wgdbnfr85zkkyhknxmiviwpdjrv6od5hz9xglues3aw2ch3b4ywjlgitxivwteveq2eq3kxj86hveinzsq4qjxasyh',
                receiverComponent: 'wb6s2ysbluv6d5wk8df69jqix6b184wd28ukowavs4am022vo6jq7d1uchy0ns7qzxwudr9dw3c7d6fag1rhag6ehci0qiu3nrqb7a5eh9ejb5c6rxjfpk3pznsfx8u395m8v4k2zeq0e11t78arx6airt8xaddi',
                receiverInterface: 'vdcclvzo20kslaf5gslku8oxtz6g4ndns5d9dh9vkt5tzqducws9zrbvhafkwwny40nf7k8uvfmvyaa9idnrd54s3gb21i28irb7ur92mdsndsl6jx9jft6s0bqy4lplq35h5m3t0imlw51qxspqcn6yy39zry3j',
                receiverInterfaceNamespace: 'qmsqghe47no8phq9xeoeo3db470vzb4xqy0pr1lmiz6aagexods2xtetdfzq9y3zjsq79xrxokzmrbaz70v8r24mx01ovhn28ahn6t9fyt99setkqb1eccbkzdfv50wb9vvganj9aj57pcgrf5qacylg75mz6jj2',
                retries: 3936161611,
                size: 1092846625,
                timesFailed: 9005451593,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                
                scenario: 'b3r96b01skvdfy1hfahjevimluaa7o8mnd5xgwf0moyxl0w07umu8yakualv',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 09:12:19',
                executionMonitoringStartAt: '2020-07-21 09:24:12',
                executionMonitoringEndAt: '2020-07-21 16:55:32',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: 'pviocfyiq79xc4yjnqgeya6ivnkvb2ymg12eooew0wkn1xk4m63qvddvhaqw5wyti03q4ro70r0kpcxtc4nbjfjv9cc997m08h4k4ifr05nhzzihgyofy8x3ktqvtoauh5f53pni0pqxreji2njn1plx2ywo42hh',
                flowComponent: '3j828kz1s4cjd8t46zc9msq2c5gkg7qpe1tg2cyl9whpl07exfu6yjdqtnl1cp9xsn3lwa8j7o94b1s63yq94mgkdkny4rnqmylvhq1iqre9n5m19ifmgu7pq997em1nkmejyky1bbmnp7gikl201fu53yvufnfv',
                flowInterfaceName: 'ylszctmzzx42n2yew04ittm91qmxp8jjtnsu3gc1pp6hrlcgtc62lfxb8yl5tpk6zp8nhmy8gclie4wt0stayi0avqt88zprrz5rtrw32gmhd0lumxhdih85plp86z3vjzkzqpa2doddm73vesrytfitu9o64cia',
                flowInterfaceNamespace: 'p6xspmscbsk3wsasf5mut8vv6yp7dtqb0jwafijj4e5gl13sildqi59mo9bgnxm32h71wv07of9wonmz2jrvv1vg2tl2ypbpjm7lmydcrvujp1jpdwetv6o3f9ub1nq0qpyf1oclm40bya0nejnony13nxbckjpp',
                status: 'TO_BE_DELIVERED',
                detail: 'Rerum est eos explicabo ipsam nihil adipisci. Similique reiciendis est. Sit expedita nostrum praesentium aut est. Molestias facilis molestiae ut sed. Dolorem atque animi. Quaerat dolores nobis distinctio ut omnis expedita velit est iusto.',
                example: '0kihedmivxaqcoqpg5qvh8rpmckcifcs7njjrr5ori52wl9m3ml3gmoln0el71p530cg81arh0bmkuvdwzo62g54pohg53d6s9y1f0qq6d1cp7u6lih22gwfi8phgszo3yok0mbmpfjws8k2a5x8tw0l5c3vs8r2',
                startTimeAt: '2020-07-21 18:34:33',
                direction: '8hbxlyg0p8cbk9omyqc3',
                errorCategory: 'fqewbe8fui8v0kgbkjjy9pzqy0qb9jduov9ybndy9kx9oo7f68ie824o2w8bmai6no41ibtw0tj8deufk6h1ym1o85dwy0206l111a1mjqhupgtc2gw42um5txkd3mcqcqwkfq06tqrerr24r0r5pg9k9pv7o0mw',
                errorCode: 't4zhbandqjsq4ma4vv8n',
                errorLabel: 'wk546ger70it2xdb6bso1hbicmt31xakc4fmem4wbbh3s38rjr6l1tsczev8fxljyaicng0iwxg6uk2w6auqcxk2v3ozw5gf10q5zbz9lsa6edye5rijpbombkmx6jv5uxf4lhctovcb1f0z17muc6moo9xb6tp5',
                node: 4277719016,
                protocol: 'vpl5hzohqs1ykp2dh9lw',
                qualityOfService: 'v58pkot1f2rlha6262c9',
                receiverParty: 'k6nflv1jfysy1nj960ylqztq38430jusq7et1tzxxqhhboqj2zw4ylq9d3lrhpfh9htnn3fpoa091a8lprmfrmql21epkt8aqumve62ujoyakid8t3ocaqogjsdjumhoo1ssscppeyt1stmrreqv7181n1y2fycm',
                receiverComponent: 'i4xn3c19n1i0aak7m35fpcfolqml43kkwrotha2sb23exo3kmlmxvo1w20v78v1ulllwzz8anrtp6x5kvr55ukdk1wbm8tzyiq2uzt3sgrrnsf6zns8u0kshx28vpd1ggmfuzkpzcf87daenbfshrmvr8x7k1o8f',
                receiverInterface: 'iuk33ve9lpmaqxxkadexl2cz2l2rc0m6bcwua5o3fzebbc7mstrj6jloiypnq6p6uz1v85uu5eipgiubj73zhilgd8oxo08z6ceezqg1p5yspktcnkrmn8a7cvo47hyu16ibv8w5ues9ug788zdj0gs5mtzwsc5j',
                receiverInterfaceNamespace: 'xhreto4ar7ocaeodx6li7535dq2yla5kc73cewiiozyobf4kcbbrgegd99sfrma18625l5hm3251ei36yadllmzsz6qpipw4d8uxsexe888pfwcvqwt6tecxgxect7nidfhwynm00o88tnkl7u48yryrs026gccr',
                retries: 1276613310,
                size: 6416521285,
                timesFailed: 6616455563,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: 'exgnjr8qmey3qwizztmq',
                scenario: '14pffi1fj2gbaixtmdmrwtvy3h0chnm9jf0euv9eayuwl2pnf2uh2rvddwe6',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 14:52:39',
                executionMonitoringStartAt: '2020-07-21 10:30:01',
                executionMonitoringEndAt: '2020-07-21 10:16:42',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: '3gh96ftpp30c475r5dpfr4g48j8jc1ny91w5pokewa2jv4aqb1sd92kmweqj7zpqsc8esnz3iqktj2ddiy8k8ytoc2mkhkiwk7nf45lg7m702uv4c2j7hhw73r6nghwwgprop1k107nrnn1k08pe5viwrldh8wt1',
                flowComponent: 't5boisx41m4r052iptitsioyugjyln6w7bcli5ak96vpssoy95udgqd3drdaba9lh4588oa38ca1dvwgvuqzozd57q3ikhrowmhnr0og9xpclqbxxsz979ccpp65fwd8x5af62av9hg7tlg45lcm0lbsn9q6iqa6',
                flowInterfaceName: 'q4lzuu8q67yvlcjhg3ubxlb4o6607jx82lk6qgy6i7ja5qh7nmioduaja4nvdmv4xtwspbqjowvkvixoqfqqq0u0r23c2s49h55mirjdue66p1f2rgaz4e2uofefpp25p8ao8dbb2yhwdw7m52s5v974o5sb6xv8',
                flowInterfaceNamespace: 'tycvka3z1clhhiyt97z8v9dc86fxv08kmdw2co69s2jv7mmeezyfe2pem9nxx52y6hzsvsrj77ax377yyyuntgc3wobq65p1ir56xcloeal3d1dkfoe63cfonl5xf91culayfmstrsvgqkwaae9bbiran3aepqhx',
                status: 'TO_BE_DELIVERED',
                detail: 'Explicabo aut eum sed cumque. Dolorum quod iste dolorum similique. Odit nesciunt consequatur debitis ea. Est quo perferendis est delectus sit enim sint amet. Et est autem aut rerum tempora. Necessitatibus ut rem.',
                example: '6gf0vmo2901jbf80srhtni7l1k0o5lgac2b21sgs9yldzvzdaty9uzn2do4ddccqr9pq50zdesjnw9qbv1qtu2hgs4ve6ftolusg3beqj9t0p6wy1cko0uaqjzsna2yht1hj5hd2uzvfvfnspewar25zrb7szlji',
                startTimeAt: '2020-07-21 11:11:17',
                direction: 'ak0yav609x7q5lfvuy4t',
                errorCategory: 'adbuwiemiei9g0zmg6gttvkqhr3tdlqm1gtmjyauhe9zaj7l7jqgregfrnsoye11xk947w7y17gjsb575shtl93di638bqhl84i8f137y4iwxqyzn1q5bcxx42opkbgtxm5n31phwk5efvw0vr8pwxv8u44o3b6t',
                errorCode: '7gdudh6a59igplvs788p',
                errorLabel: 'swg0gxpzny6ar2y495qz43m2zkcg7co6va0uwd40b7nyqmknjl1pvochbxr7po6vn7ddydkmxr6xw9r20fg7n863276pceciibwxnwlnnrlbzrfs24dga11s09ysqfk7v0uns3lkd227gffc6csohtq7lalno0om',
                node: 2135484224,
                protocol: 'j02i0biany91ldzumhzc',
                qualityOfService: 'oklm49vd8ju7tle8j2di',
                receiverParty: 'pynj5jbbdo4z13pyeje63tgbc7vho0slm6sq5hm9hhbaot2sk20r7ng27edem0h8e4vgfn3mlv50dlhj8udhxesorj0y6r3ge52qlvp90k697lroeobt246ep0wpzhdi65zvezox2dw7es5gt2rehhomqinxha4s',
                receiverComponent: 'w864xuqlrca7v0onvisqefuwctsv1395gmfm1pfb99b54ps5gf86hykbp86oddvs17ffzwdli69y59wd6iij44v3thpgs4mt1erhyhne6vfukx1dk87nds8j0btsptvmah6f25dywlt76zv7g03tkir6s44hchyk',
                receiverInterface: 'e9g5k8ghjfo3usf993hojaefb95wquy7riaojy270koiog7fl4zfxdk3kc5ku811x3u37ks9d51vhzqxkn8gqo14rmvdfw8cm7u19z24duxifa9qfvyz4kwlrxzgkv3445bi4cs1y5jj8a6wgvvmjv3p53k3hf54',
                receiverInterfaceNamespace: 'oukg7ftntkrz3nm0y6ujymw4u8d9cwiskegxbvb7ruixz4itqtza072k5ehevl63eamk0xkleae2zdjd557z4e80n436yxj2uwmbwgm4f3f1l30nn1hbfht76ds2ux1fxtnvzoynvx13e4iemyyvhdyjqf6c973l',
                retries: 4172865851,
                size: 4056170294,
                timesFailed: 1408393174,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: 'ww05en0cju4kodg7f65q',
                scenario: 'ae0ikuymorp4wkpzs5e18b7v3qkfewzfj1b0j2gnf6ejle29xsqdi0ns31u0',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 12:40:11',
                executionMonitoringStartAt: '2020-07-21 03:48:48',
                executionMonitoringEndAt: '2020-07-21 12:46:33',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: '0xp7o11n53xsvuj9sjdchbwv1pqiyj03yuyl2hpbfzqmqrvmp4szt2iromqnl4h2tjib6htptayk7k4bjcc61f8tqxi9oicqs7f7wnxfh8gnyztk79si2hrh1k8gnv31hvrl57okitwhnyn62vbi8g9i16fwvcjd',
                flowComponent: 'e2rmqe3ao0yw5a0f4qu4penks420zg81ruc3yon89cq0kz2w30yinf86tdwr85f16w4o6y75jbuw07he1kr7oshsko0ys4hguzjxvmjyscz4l3ul94yvpjjmzlzzm2oub53vd8he5157j8a6kwpn7bmfbnox4xa4',
                flowInterfaceName: 'dx8efrxosn4pt3bcddbjvliworiybfepxr12hv9jxekfaw9gkxzvawtfwukhzseb2z13465z6ifnoltl4fqjjp4wuqcbjfalwn8tkjvxgpceh1rcj8c6fs7ljpprlo36eupt7m74uuoj29fe7dw01jzstbpfq3jd',
                flowInterfaceNamespace: 'b107bzg0dfrto6i17p44dp5ujzbprcsi2my4oj68ut6v6njwt0aqsg2yuhujl8b8uvv3d3evj78b1v48751gthrtxcp727lil0p9eg026y603qj78o6kqp3sot8cp4txa09nwxtv991rx8l4m8kgr88bi7apc5fj',
                status: 'CANCELLED',
                detail: 'Sunt consequatur est non quas voluptatum occaecati dolores dolore. Est debitis quibusdam veritatis rerum veritatis ab rerum. Adipisci ea laboriosam.',
                example: '7qa31zrilnkswpbkv69u7o3ozckpm09xhdb05xvemtlbqst9tbojgzv3vpep3vihv0pqm1t32wso1ugxg74hsj0lnpzez1rz1ttgn3wt1a454ljy2xxaneavmw81u2qh4insn8ifj84igvnaqbg3pi3sjf01l4yw',
                startTimeAt: '2020-07-21 20:16:31',
                direction: 'qvx2awsppg0mutrshzm6',
                errorCategory: 'ux6kov7tjzk2zjltvylwu0c64l9gws0mllursrajvaxg7358t9t7dkev0fbkacqkg33y9u6zpl6vh1y93iqgzlh7mlvxoovcmtcgpi183x9e5s88nwqutlcdd8yw0tiz1crsogl5kvssch6ffwemqnrulg5q5wuh',
                errorCode: 'eu8fddc7uk1zqno4vdkw',
                errorLabel: 'myu2zgq029etvm7yfr6nn1pf6lff73l01bte1aucfjlhgc7bdj2l2r2u0ujy5jch7xcex8bs7809zbzqqdfngymae0os9eb4rhlz7aennr57b9pkmakkd8caj0x6d238q7uiwwty5czr6hg3ks9fj5247c01wu1g',
                node: 2360316495,
                protocol: 'zdncef8r41trbb855ab1',
                qualityOfService: 'sv1ok68sng94ea293qi3',
                receiverParty: 'l7j0cfll1fau4qlv9yf1wz4yezl0m7hf28oq5w36ccxrf4fh2re1h2yym1f9itznaam9j2w6brzw9zyj1i45dlvhr9oaxkel28y209dyju64e754nkd40qn7ijhuxr8usu54cuzeglkfpw45qey821fmfuetqzki',
                receiverComponent: 'pbqcpwpdxt3pdwvupn47onfcprrixkfub3nldjzkfudwz12dgpz2d99io1y3v11bceq4jgie9yrqujjgp7rxfqhxf4hot0ng6m3xgm09lm58furow2zlt1x0na47vaqrjk4yj6rhdi9r813snbrcuavxkgwy2oii',
                receiverInterface: 'fviwdtgf27cwffax86cx8jbwpli6lasww5hbr0pbckszcrskyuy8hcmeyry8ba0jfpkr0y2uquto4xkhzcrcaa2nnakdpyfllr7lr6b8xm20bc3ddpj70mdkl7kh2svy24krqt7mh0t2afc4xje439pn31fybdsz',
                receiverInterfaceNamespace: '6s9tk0xiyzmvok48n58if7jgzk5yghitslvqcfr9dzhlm8wrla8uyv3kysch1yksz3sfyf8lerkinymw5keiscfvws4p0s1smapn5gyb6ps3fep4pnfmcyys9fjooa6yxjygrpt0nn2f73ux3h8vgz3h0bkffive',
                retries: 9435746438,
                size: 5746492117,
                timesFailed: 6096684184,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: 'zioqsbkc0o9xlfs65q9o',
                scenario: 'mev61117mb1nixv41k6dg3i32h672md77qx0709yy1yvxv302s64qo1cu19x',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: null,
                executionExecutedAt: '2020-07-21 07:10:06',
                executionMonitoringStartAt: '2020-07-21 22:24:56',
                executionMonitoringEndAt: '2020-07-21 14:55:53',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: 'ygq74yp7h0v2psxt1kd1ykp66qyagxqj3s43gv6mn4wohu8dmuuqahqlwoleidjf5f4uz0d7tk9mj36h2zbdxsf4l98ywv64cetmfcebfcegj2a7vhsgt3m3dsf7bdnoypablm1tttnpzo41ohgdike28ozg5cag',
                flowComponent: '63rt3hclfo7fy2zhxsl4m8vv9fb6sk23e22zt9yqtrdrzk3q9tvr3vv97jsu9u9w2d7j1vbx4ftnvob1284xgi6cfi7kuk1ciwcqqqz2jzmpos5sbh4zpmubv4q8vv4kai0lvxl1acwqm1hzlevz68ta2w66e188',
                flowInterfaceName: 'lfrgkzbbla6hu1kmhqjxx2xt0ec5heqgrd3xutgvkvy6yi6k0kn91wvdvodbv4l9vs1dl2y0rc3rmlleerz5whzt96fnke3fcxiewrf68uebewqwm1nd824ewkx2cpecgugeo5zrmp78m53x9gg7eosyt0s791qo',
                flowInterfaceNamespace: 'll5d9nq481gxdzdmm6rywlg9yv7hcbfrvm4fqq2c6tqgait06jbpje5i2gwzu44fxyx3wmayrx29ze0soq38fexssx650u4fur2ub6wzr4b1j8gi5d8kxag2qy6x0n20eqoh6mifbccnkrqwtq2rdyz7nrgnko6m',
                status: 'SUCCESS',
                detail: 'Similique sunt et numquam. Corporis consectetur quia voluptatem quidem harum occaecati incidunt. Et et doloribus quasi aut nobis alias cum.',
                example: 'y39bz40hdi40gyaov8n7st10g0mdlpegi3q100mtgyhdpxwun3e5w1bh8o5h7s178g5f1iu6mx7fvop2fb5tltrt5c8etvcpinmsuettn97af1sp1jg09teq61uwcvhcfultszjmf4zbu5laitn6if7o1ce6crb1',
                startTimeAt: '2020-07-21 21:42:05',
                direction: 'g45njcu4nlx2v42nyrqw',
                errorCategory: 'bh7con8sjt23qgu6kq51ma7sgb18goyrolbwh03pz7mwo66kn8zqnhnwv8961fc3w1krlabzyfs490fzl8ap2gdaw8j1v1r7uc7jzlg9m3miaje0c28wot4yz9ky7accij8jog6epexpz5b4em4kj5t5st8s6ofa',
                errorCode: '0pmfp10n85iilh4i7p01',
                errorLabel: 'l705yd6e390e73k64v1oruaz1qds2hzll66hkcoabery2fprj6dfyhiv3oy3e82ayacfw2v88w4gukwcfepc97hm31su7axgl3c2dgqpy4a42v6knytkh1ia130g94enqpgri9w8e06lz6refqjxkjm9aapgie6y',
                node: 9400800259,
                protocol: 'wc3zmkodw84t7muel9ra',
                qualityOfService: '7o0huc87hxkn0tec7zhq',
                receiverParty: 'bw82rk8zw8qj90etgik82rb3ye8qqhrhu523awbodic3lqsurjpwcgkcawt4bipy2dkizic3lsup4l0bl1udbgwu0ibiz9k8gcwf54gwrw6kg1qvmuceg7j9i9e2hayjalepe2qwtgjxhslc7dkxwogsim7zmoz6',
                receiverComponent: '82t5j4gj7sz99gmduzthhzlri2kpt5aq98d32tofmrdv58pk796xa3tfi6jmecsjh3qrlh28ffaqik218xi5ijs4hevl3mel8suwnrsyi90jsw6d7pf1x5sc4ptxh1cniejxj2eu8b5kjjl3ddrx5o210kra4wrh',
                receiverInterface: '87tq27bxoimrqh9sillrmy4mx19r75iyccmldqn239rrltq5y41vddbglcm41na1bxqd6s8cbpq489vmukc4b8yjtxompe5ybc7wzt4rwvwtlu0vnjh79lmik8adidvvtk5lbyqowhlmfn5ailixxcff625j5xcl',
                receiverInterfaceNamespace: 'ngm19ibuwmadiixcu6y5tkfo1n92f79ru16j0oo2fkx8uoj7k98a4z0zl2qqpyn3cwe8uyyvkalzgtpaec39psb317ay4hpu370do7czv6oo1tmubx5ok19qqmpj8eh1d0mbmxjn2y5mmof9z8f03kiinpz7qao1',
                retries: 1392806252,
                size: 9283709705,
                timesFailed: 8432053783,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: 'sx1pulwvd2pkdff9ly3f',
                scenario: 'n6bq1s3y5kbq5we5jekgrdbjbkx8jblkikom7h69e9o2k8ygoy67e2cmwrae',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                
                executionExecutedAt: '2020-07-21 03:35:57',
                executionMonitoringStartAt: '2020-07-21 12:23:02',
                executionMonitoringEndAt: '2020-07-21 06:51:33',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: 'eiz3amt6khdobp4j1j98tm5jj4pluiyaa7k71994m1q56ra114ctjddpcycuqu15e5q0at4pru7ied5iw9pxl297rcqilf51zilq541frbxqx3wksbs7t26ifyk6l416mzubtihgby2jts6kzb6acisxft80qmt3',
                flowComponent: 'rpqj37eshfuv00951r44gydoc2armv8d3e5zegn3s8wsknpm17v9vmaya4rtzf1h0kl5bw029879u33v0nrjxp12ljaatmi7135bn5i9xlirjcynyer2ze1va8macrgakw5lx9wlxeclk7fcdtamma3o3b6phw7r',
                flowInterfaceName: 'b9xz4196lw8c46xg0rxzk4ursu76ftik7ro3iojgdshr6g9qwu2mxw3yttoanbm6xnjestzpo4tzmfhv0nsh1dfozo0z5k9r2yqz1976f6m4k3xw2hz0rv4bngcrs11oht1su6z5rkm6z5yg1ojo6ahe0ipxk86i',
                flowInterfaceNamespace: 'bop16se06md21g6qi6egv9sn441qykwde5mhfhnb8so85gtjljvb3vl71zfo7yorpjx8to4iv3rpa7316ddrn6ofynhy6v8ev9mou4trp2w2z3e2kvp82fbz921qmh8k4bnqoelpig8ke6flrdl7w56izzhmkmsa',
                status: 'HOLDING',
                detail: 'Necessitatibus aut id aperiam in vitae illum unde dolores assumenda. Veritatis ut ut et quia debitis est unde. Nam repellat quia enim voluptate commodi excepturi dolore fugiat. Sed quia debitis facere deserunt laboriosam placeat unde assumenda.',
                example: '6maeid9t6pbnun61jb55escb0zo528orchej7xgwftep6uik6n8366kuazncz8egcdz6mi93gposfva5ac4u8v357jyv64ej6vtaphk7g48ccjkneiclw5hmgth5iagqlqrptborchxy8aklhdj6fenf48kbkugm',
                startTimeAt: '2020-07-21 07:49:43',
                direction: 'djphinkp7kpvb4cdj0rq',
                errorCategory: 'y88o9bikm0vplj06xj1zilrq1bbbrrc97l8f9caej4xrlkh1gltjqhbc8ojbugsnkget9wenpqf7j31w0rwhxfmfmus88dkgfra3ng08v62udju05ezm6bqxhbio63l6gphf7wy4143zqyeyig7d1vmm56dt5lpi',
                errorCode: '4a4p0z1x8xers8jpxcva',
                errorLabel: 'ymokhy3wbybhadkqcngqkzx9xzdsi12al3lxer1ctpazfhwcayo71t0smuuf4uerckfjohgom577zmvh9w43edau3l6fmx7evxn9l4fr3yxh76ct7uxg2qizqpiz4p33sjgcn40xfvfetkagywp7ocms7dpcwm7m',
                node: 4588612521,
                protocol: 'sxhs5pocaomerx3yx2eo',
                qualityOfService: 'j5s2qo788o4s5xzkys68',
                receiverParty: 'l95x1o79u2t21tdxc8i4tl7f4mzz5ys8ptqbwqu82b2qulmmft8ij5wkiqigl15zmzqgt0is0njtzqi3q3qgwdmn4f2xk4bjnyplo4xmlah224fnqb2l8lze6hulm53hmi1jz1e1vgtw6n2ufn44fwqub7ks76yd',
                receiverComponent: 'mb2fzssyb2acvc3aqmgsxxrdap4pq7f8pff34ij81qo4ae57rm26yy2nwtc4qlwnv1zl47doembl0b9mk86wqm0g2111o9ejonuk6ns0jstkm136qibjoudgrct83krbnq1wfitfdxq4lboon0rxfh25surc7rbb',
                receiverInterface: '0q2iz9zj3r1k02eksnhj293dyuyz47kb65b0v9t5dqeny9rke59d5wd64v2u7u1kz17y0y8emdum8jheucmh3vrittmtsofruzqsarzus1fqmnu5zwpct0hnutk97o8pz77z2pyi7qeam8xpz2d3oxlogsy01hhs',
                receiverInterfaceNamespace: 'iwar9lbo2bljzaafs1sd99zwdf3zdt0edx5yww0em2daanw8hxhvj0kerd0j80cycgyq3zz6utx10m0fso4fybbrt17xk2u5ysrxmeveijd5vsf48n7rvzbq42g6vg4pi6836x72hjjqwhlsrac7wgpehg1zsazm',
                retries: 1344347968,
                size: 7622011236,
                timesFailed: 7691670586,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: 'lt6eah1i14bev0m7465w',
                scenario: 'bb9vf8n9gh5xdk8udbcriu3k4vjcf060u2qaetsj80ojdmhgl7kuymnj4c27',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-21 01:52:46',
                executionMonitoringEndAt: '2020-07-21 06:37:10',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: '9nyb7tmoulw6q71g25c57fey3vglq9kkcgapzabhf779tykkmhaiz1h1l07pzsnp0fpm6vcw1whqni1j89b9am5fbrx7yd2awk0xzq4fvg0sbggsoxnjq7edvr3cpoj43jchxs7zj8wy0rcaggrr29debhogqt9b',
                flowComponent: 'kdnl2qv3u2df8d1u2k198ui69dbq8rk8q1ngyrvsvknapmqcp91o6rl627hltwav2jzoxryzsxiy48fx5oba6u1376j54pgoa2l5n36cv6m6xefep4f6yi0ddnazdw83rqtuol52zr0g10niyjlfoqgj5fsxcyzh',
                flowInterfaceName: '8inu87oq8325hnu8qfufd7nlx7w1on2n9l759jnivni8ifmsqnuodid1nj3xkglj0z3pldg5k9t8w7zsodwjw34cl2pnx1supyqvstf2nknvt4pxg5cfdp8shy8vnpirqqbaah7nuj09g7qq2yy2527qj4u6bvbu',
                flowInterfaceNamespace: 'fx3dhvufl82wow1w2zkmk12dawbbvwl9ogsshhtq44bv9wnou1cpk8onzqmxx2kvslmjt8cq6arnwskjicrok6rdle6qfx9e9m85kzp1dh2jkcnnfnptob3uxr1ln7zmtzox8gn0719rpqeeh2eujfbygn90hzee',
                status: 'DELIVERING',
                detail: 'Pariatur iure dolorem. Non assumenda vel et eum eaque numquam. Quis facilis et vel saepe atque ducimus consequatur. Quos ducimus nam ratione.',
                example: 'n8x9leclq5czpkkuwk1w1ztc5vq5efrkezpul92nmnrrgq8zekjmgs15ksm8om01d8jjkkndblagdnrxbglzcvt5mmssjc6qtaktdok84nawif8qvvsosxjrqx02r7xyqms34d87kkwbcvri3xc46oir0dp581k9',
                startTimeAt: '2020-07-21 15:43:33',
                direction: 'eydiguhiua7tohk8eio9',
                errorCategory: 'cvgesgkjswxhl5k3cjdmhkia65hkml55vdg9caug04kn1x06djdjh8a2pc3563jwml23q32pslwx247chkld7u7ntl5o0wtlbn6z2yy4j4idn9ucuh4zvsccriletxclgjfz19edx7nu8iw7z4tw7mclmc7ttf9f',
                errorCode: 'b4s9nnara62l184h7mco',
                errorLabel: 'lmob7rnbidq1mxj03pjezhahhv4888m8aa3q4mypd8aquwjrtraekwbr1uat2jvtnqb8tr17vywmb93npaaxgccdckwjudquvwa3fmtkfmhkn0cag8oraeqdmtfmkflvfurzp4cdafu8rmexrn9k45e0ykbp230b',
                node: 7602233969,
                protocol: '7v5tozh2f312ipl2exym',
                qualityOfService: '03cstnl0rkfx2la0bwct',
                receiverParty: 'h9zd0bmdwzz83lpsrs8p1zftgjpzf57z9oxvnsezrxtndqr53n0jexwo05n167qlxxrtpi5uolkr4u42i2533jt7pg9plnfml49jji9ddn43gu39wb09wqntys0r5u4gb3hzlk9rf0955dreymgbdgimns2icquu',
                receiverComponent: 'z3jiyu0vswemnfbpsis8a3pspj3iigql4k2fdtxnirun6np1h5845lpfwd4rvuqw1a4efr2byayklynr96f4p1tc4muz98t505nopprg6tk4diylkkj5z39nbxf10fi2soxj79x6ux80iowivjlrf11bmd3mx6if',
                receiverInterface: 'zri4dr1edd0cyzm9f3svez5z4j3mdlwoalvnn93hq2787tamzauas5vnnct4c42kvrvuwob0tm4bbnux3xrvjhlwclffj9jfsenjxp2gqio8cxfyjwusffyw6vqu3ix52me1r79elxg87tu18sgrwruot8knsi6b',
                receiverInterfaceNamespace: '4d474u4xo78a2vxjrvqkk7g7p8v7mikapv2kcdd5znmk9ifslfhla97bvu5bfpstmfx1cdnc3o1phsq3xnlx4f6t4nr91vrri3can35dhnjtfryks3l3qoigfmd8hcwpjpw5peqfgcub3uyw90mmqulk8spe65ce',
                retries: 3908957581,
                size: 3928238099,
                timesFailed: 8408551863,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: 'y4oq3f8jlqi0qmj7iijk',
                scenario: 'qejh7nojeobyigy6obqj3uevzc4w0t5qbcffuw06os3hiyescydwv2cyswjm',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-07-21 21:15:18',
                executionMonitoringEndAt: '2020-07-21 02:07:15',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: 'wty5subk1abjt89vw59yv0ivr64v2eol0qd4pa57jsu9ssuoxgcza3hj6pmt81haaxzgmtvxfm8cy292ibk0a6buxxkuzpvts43cf3opzk28cqhz5q4rqu0tiwl1vwwlvge4sgkqohacndt2arhckj6elwtk68y0',
                flowComponent: 'mh6y3g75r5beyh5kyjxtr7psdc2tgoq64z7fhqn20awv3gqwh7xlj8s1wg2yy5wj1bts9o8v9muba6dqxoxsf136fsaq1xudvx4y3rgumw12v8fd9gxgbpk2dq6sdsex1c3brqwt9aget2o7iylmm2zua2hymbvv',
                flowInterfaceName: '8u1fl1rxfjbzcadfuqnhfgj91g3cflj2dh6ubewniqv6f4948xdygm11rkx84ckatyg7gffou4dallbzmhp3g3qqcvy7piwe7mex1e8dsue8wm9649x2qc9a4jgkuqyqolye14e4t8lbwbps9hz7ah8fpd9264if',
                flowInterfaceNamespace: 'yyecl4kzg1pszu448ub39w0qx719ibxk09cs4knf9algg98gtdgb1wx7gvfelf5cqt5e41lsexbguut1dkstrdu900njm8chpfjn1v5wthb1m67d6k5eoc5n4a7dsa33fgcyirlacxijm8im4dijilm1ljm3r9r0',
                status: 'ERROR',
                detail: 'Eum quis alias in unde impedit magnam ipsum quis tempora. Odit nemo nesciunt esse ipsam aut. Aut quo aut ex. Et atque cumque deserunt nihil id.',
                example: 'sun97hjen42z6kish5wrqpbj1x656m9g7qduzphehgfe0gys7cwnp2z1gzkw4qxd8j8a0o8y77457c2awfybe2y2bu2m43i65u40suk6aokugzx75fbgo7t5rbqw7zcaamxlbk1lzifncrzwwqm3z8amh21yxn5n',
                startTimeAt: '2020-07-21 22:19:29',
                direction: 'tqlbj4jbgmqmgofdon5s',
                errorCategory: '6hyl2du5bumyus91zmx8p9jc7pcnhhohjz0olyka2vxpxik18pvrb7f13m3vmq56y8qexa7vg8cnf3wt8266n5kp3199plcseepw9c0z06d8g778bmmjmqmgmg19cruihexq51a5qted6cryt8nerdqd8l1cccl0',
                errorCode: 'poo5pzwwqjuilwcuewrw',
                errorLabel: 'vqq8bovkfjf46ltdao3dpwdmxgp5657ogqmybirvtnnkgdd30bw7966c61vcpa2elzxc87lqvb63p9jvebroy44s22jzv7bed5wekacqyoz45rmvvhq7ks99st162a6lfzwm6iaxxbo0ddj3nleqmibylvnp45u9',
                node: 3818259294,
                protocol: 'i5w6e5yntx65nk010er8',
                qualityOfService: '7san8tf27a4b7d5uazph',
                receiverParty: 'i7hhteohfd66o7bs8uu95kq4u9c2c1lrgqescd09eixrgjp4vgtf1b8e96h28rbxn3jnv0ems8gmlpm7tl3395i4pqmcw9kvvb8t1413j0476mhlpd3suvj7myzodc6f4bor9cchefhdxi0i57h9ah9wif4dtl4m',
                receiverComponent: 'uzsr2hceugl87j9eaa4bf53daay1phld5k8lyjiikkmi6o7nniffh4qxfcupty763fqn262ar16bcy3h9rt0id0orwbq1ggwo461vp0wihiscxx391a62vcrfyr7bhq4igo4q5hkpr52iihxduvj7hqzgffjq2ln',
                receiverInterface: 'yss74z7x42g73oovy3y0bmcfnmwydapgxmby8ls74sgtygc0kz1yunbl94c10qe2xx93v1gq4g1d3nsn6449pggse60jysbj5ztf60jd2f47a3ofh5sbsg9ihmyvi5hm8o5jfbi8m50vgwqcbwz3epx8gonb1dem',
                receiverInterfaceNamespace: '2yyimknb963iik0vqmx2zejyk4uqf8mdtttbl97tco8inpbi9ty6f1bfd14fdmatr0zzbaof08uh367j078pzoe3v3slcy41hco2zcdhttxgfwzxsda7j4f52fvigfr4vaghev2wov4ptnz6w4a8418i91arj1ya',
                retries: 6541733924,
                size: 7804501464,
                timesFailed: 8043545868,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: '5gh9evnqerujnnw40g6y',
                scenario: 'j6x69t1mgi03c6h2i1epaqikhypdba8tecubblad1sstgkhdqwcbdlt8ecjk',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 18:12:32',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-21 17:38:22',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: 'hb0tmp3jj49ubvguqepgpa6ww76avdfpibtj8nyivll9t8yu5xqtxzal8q9ndw63sxzme93skvopxg0aoafs8olzq030n8rgepcgpdwofckbg0sgtqfh8nnmkytq3dc60gaoga7hawu44acjv352kcdnbma3qeun',
                flowComponent: 'lqgxd4tbp3hnz4lbdcniet3vw9bh11llmhf19yuqogejk2t427gypzg5zxbjsaecbomjhvuv1esv7ux310gtqjqp00hggyz9nlbkx7qf9iaw234i8ntmrx88fox0gvslt4tqvrwaz8401xaq3zh6eralsqsiaiyr',
                flowInterfaceName: '1k07htahmwplony1t3ek162rhp01c3ju1x565nffade2181e1tf7r0k3fv4rf14l55br7ptizr6iz9gam2zznvu6mgc2v3xjnbh6wd56b8yshl5f0mh129i1yvy3ozudofmi37ppbzl0hypislf6m6zutx6n8gtr',
                flowInterfaceNamespace: '9plzm7vn15x58sls8d4uf9kwmp1mq6axw5gfhvcvqtk0z0962ocj98t4u80w423hbxay9fu92uwzvck6412qbestjlem26hn7cfv5qat4bcdjnc9k6d5lpcixlmgc5k0acb2bj2bbjj85rgjatfz0ztn6rxpgeed',
                status: 'HOLDING',
                detail: 'Sint delectus libero distinctio aut quibusdam et veritatis assumenda. Dolorem aut distinctio harum totam accusantium esse. Sit non in. Blanditiis saepe ut quis ut. Necessitatibus voluptatibus ea porro deserunt sed. Voluptate eius ipsum in beatae nihil aut.',
                example: '8p5aruk20qwo6sjwhm3gzda5jndojdkckjuu6vennmtztmfbhk371fulbe3nmkjf4g18lkfh2ne0jxbf9so96mqphmp297mgi3vvvk0cb71m300pdrj8x9j618e0tbf69f2bnmxgs5p9fdmpc0wy3h62ozcyp1he',
                startTimeAt: '2020-07-21 13:11:38',
                direction: '1d3o7sl9lsmrh18ak2yq',
                errorCategory: '49ow60thvm2w7pzg8du5825evubxp9lul8x0mpujji2l3agyicbdqaj68oxjgcbuc2arqqo23871yts1pexbpvre72hldee6h7og54v7bn01o8y8ye57moeqlggys1zl4g2vwb1ltmrgyigyxz3s97zl3ylncgui',
                errorCode: 'z2pyg63yjjwakpxvw0wb',
                errorLabel: 'v7lq6mvgy9opkhsnc8z4nqvqnqdt98ka1q8qdhhicb769g1ij0k3zmd9yob20u3htn2qtqn9dvgaoa63yodojs39qs5vu6d47aknr7u35zu4xagqyyqdae9n0v1j0pt8vvjm7gh8t3qyx18c9fjneqzna824l1t9',
                node: 3399391983,
                protocol: '9ljgiz442ltcnhr0w8at',
                qualityOfService: '5g5jhi53e2hyitsrg6dn',
                receiverParty: 'lkpjspdzvs79antu3vmwt9gor0bob2ywomkn1a4l3qssi7f4fmlivtl1pfp8syym1efd7fkwjntv514jh0ku1clr3p4uf62xkuk0zabccpae88pb4xjxgcytdkhazyzbux5w2s2iv9f6yutpi1n8qmem8hyhf7u9',
                receiverComponent: '0i4q1icvqcorcdd97h3lyb2xpchihxyppkt8ws1srcagy23jewikh7ecpd8z10lhs6rudiwk1hk58ty3zp48by0b94qe932uwj357aw17dkdih05cnwzr4z9cdou67rol91wumpgk82qgcv988r5dcgtvd8x9amz',
                receiverInterface: 's26lrdnaws1xtboa7gd4somh8di5k1kuhdam6x6l8w0rne0n9hpg87104iy29tksuuxkp8hq3k7rgq395msfahatdf3whaupzo2gwwandpfkb5d003cq2fxi0jxpwobobgez3e5mb77y0n0efkj1a7w5bs4hr3we',
                receiverInterfaceNamespace: '9ewd7p4r7sdxjzrheomoxoppjhoozcbjt5u023wabxs7na2nz96qdqkow5qv3vcvdflwlgq5xgs04l3xentu4ixvqj2f4q7gzlt5bt6844gbsy3uugq1oymdzidj5js9k98j49fpir9nhbalsck41p85t7mmt36m',
                retries: 7816688123,
                size: 7739460236,
                timesFailed: 9799803691,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: 'fsuk0rwa5pt5ctha19k1',
                scenario: 'ur8cz47z78sessv2vsehgeq1wldxb3d6ffxo1rasfa9utuykwvtxr5rtjp3w',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 20:16:56',
                
                executionMonitoringEndAt: '2020-07-21 08:24:15',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: '64tbx4rk8t3cj7553cal73s9hl7ysgk2t8r1rhnie52c49bu0nxfxwb3on7xgrs5sk5audf82js8u9v8nhhegr43nmwg7tasw5kyxnbr3uad01qzwf2b0cgifumyes023h2dg7kl95vi6krp8sekfb1bgpv8jw88',
                flowComponent: 'oxfmtujbtda67f0z646tidvtr8ykbtdcgkb7sagvc3htoxpe7xdpcdqeleu3bftmb5qlt3a3kueis7xpzy8djq31u7ezm20o91wiunk885bryupbdmqlta84t2f9k5sor3vwe3kfiy4cr1ksg45tedoi3aa27hl5',
                flowInterfaceName: '9txlkbexqfnax453sncmq85jrxert1sz1jysll1ik6z91ykwkkie9hdrgblnt1vkv7jl9yunbvvwub9kztx70xorom33q9mmsql1pqgjj8zxmku0o244t0xe2hxv1x0hsmicd1uuiv5c3z1vqgg8o1nrv4dbomk1',
                flowInterfaceNamespace: '4shyhbxcv7qx53ui1ohoknqzytueaixhxps9mkdvaesf95t5tdzwt6k1a8jcc39ll6seduzsvxgqlgtrq64zzj01ewf6rw3600irbkjhzo2gazhmmfa88oj2tmfpjg70qnyitzrw6uyhmqjekoxlt02gx7t9kzie',
                status: 'DELIVERING',
                detail: 'Provident dolor autem vel exercitationem occaecati enim neque. Voluptatem velit aut omnis debitis facere sed explicabo. Quos voluptatem commodi eius temporibus tenetur omnis quae. At et est.',
                example: 'rf3781rh7d2lj1hf6g0clpb2y6bmrrnsq4hcvh1ywpzp2grp47bmmgkyc6ynk9glgbxydadr7wyhu4o73q19strfi7cdj6py6qpeffe80hijpmms3yd9wrc5ix1ftjs1oi3s0p3b6i3ahkbfa43znt0cfb1qe6fu',
                startTimeAt: '2020-07-21 16:54:26',
                direction: 'ecpffxcli4b1rppm0k14',
                errorCategory: 'zq7wiis3i1p9id64ywcjdzlxsuykh370as33fyp6fdwkk9twiirzae33kdsrl7lvst65qehqgklyaopaiqoj4yztj7wkkjz8cdtcu1na0ejgl8lmvcvoxkawzqneob61kb8qg0rrv9fhow1bstzmofguvboyc6v6',
                errorCode: 'pbznahxtyllgpyea6iug',
                errorLabel: '21he828sva7ud66l31fvjlm70gv95vk9b0pv8yiy9z7wxegzh72kxqtujetpv7jdylkp8lv447p720h57cpk2ou62e7c4cd3wcll75pzfofwgmmxu0hjmyzwcebn0cj8h6wnysgm495gzabbm780lfjwho6z7e8x',
                node: 1292286755,
                protocol: '45qw0e0litep8s7bco5p',
                qualityOfService: 'n9eucwzn4mguuro6cylg',
                receiverParty: 'i9cdghvp3azhkmioe4x1nv0xdjruc8bikpqfs6nt1hthplur2qu0eb9qlfr6uxp52opjwpfrfmh88rzk38igg9bhrd9asnwbvs1rb9bxx4gxaall0gw6zlmnhsbii118oaq059jgkjzw6vmag50f1n8d1ktdlwf7',
                receiverComponent: '2yvbyaw2hvpr88k8h032k0o3pitjn8jikhxjccpybo1l0lehi187jw4orsvhk0fi6mvdypogkg3r5t2kb6h6n4dnjla46xhkrcsd8c08sfoi1fxkl0c3289lbsuj2s2vx93a19ei8mpm4wzzl1g0ae1d7di53kx4',
                receiverInterface: 'bw7sw7hm8pkn6guhururi9522x7ni4qkli61b5dffgzxdysldnly7ayyqg8xyts7x31xutq7mv8c81l0wmfqzobgaipqwsbbvgs1mr38f3dayrbddu4fyx42r2tksfpeq6o2b93hax8jqyw1v4vkt8d2qnd77ugj',
                receiverInterfaceNamespace: 'lo8zzzesrc2r2fm5p4fiuvq0pmv6o3y9i2cyqq3q8gtmq0punqrs2nr2j0aso03c22kzh29ur6j1x584ka7hn7a6ytwb5se6cwryjiakmx1ns8tfk6irhab3hjxwczxv78x57dyx4wx2v3juu62xjx3l0x1ok6a8',
                retries: 9504773302,
                size: 3985697399,
                timesFailed: 9160681332,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: 'nhzdenduin9m7qipzqjm',
                scenario: 'ld77zgngvtqh74n9vo4qr271sogfgnvfjrcu5jd5yoor7z03vz7b12nak5au',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 04:57:00',
                executionMonitoringStartAt: '2020-07-22 00:39:41',
                executionMonitoringEndAt: null,
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: 'v567h06lwkt1xx2mfcqgpshh1qjz53n53m7r3to9y8291flnv77hfqvz73we7e6etknz13f7e20sc7ieym3f3x9kn70eogbo4d7ry2kj56r2xoslz3jklupg0m37trhjvpcnmzfiee42q8dt3asiue4fl5r2bfbq',
                flowComponent: 'cymwy1yrycnjj4s3nrpna85cixemd3o22rkkanjixdrsd95392a4wlyrs7y6okoztseguy447t15t07wj2wbsa3e6ll0w38m67x659rr7bi5ym3o9roc5pt15xt9wm66x7yblmri0ov330hhmbn0clesi870x0kh',
                flowInterfaceName: 'mg0przxusds3abie8qs01783nyyc7gkd7sa6hr0c838c11ud6kvpmmzmucmiwyxg98zci2cngxhmhibb1z3q6mjcas6za2p9jm4o1rj40cxwr1n57k2rtuewaxebirgh1413ilnspbihewpffssw1r8pa8etl1lq',
                flowInterfaceNamespace: 'ivkhozlv3vetc6pa1maqpgvsghymqxfumqpo4xjalcp3jl8b3vqyka6074a506q3bse8opmuhvhcq6br13r0izece0uhx01ndhmey3mwmfscbcx922e8k8etmrv19cus98ls5m0ics3gihoq46fzpfe8ogjqvq95',
                status: 'TO_BE_DELIVERED',
                detail: 'Accusantium est omnis voluptate qui ipsa et dolorum. Dolore voluptates quidem est sequi molestiae voluptatem minima sed id. Quasi facilis et et est doloribus autem. Id non qui non in aut non asperiores.',
                example: '8ldpn3fgx8vbhwoqkuvue8ln5igk8z5q5qh8j57s6m4z6wd8dyanbpsuh03seoyxmuu2lte4mhucxagn6i5tiiygs75d8aaru3r6qbm4gz6qwgp5dsabpm6nv53yq0x2r4tk4e3gym5jo4ljgibzrqgap628ujoa',
                startTimeAt: '2020-07-21 19:05:24',
                direction: 'loske9lnj2j03oz0g8jp',
                errorCategory: 'o2t07q5o1j6pzz0u5tz70bzxosrix2fdwx92byj8hfocya6cpdaej8ije27b46jxqhjognle8dskcotdrtfulakqc1fmjq0ouwnv0tt0tzyf68rcdbcewh52omxlcc97jwna6dzbx8hte5dacxuejo3e1j2gk0h0',
                errorCode: 'isf8s9b0j0bfjxwx95uo',
                errorLabel: 'dlxaqk8inf9t810k27dbysj4zz3eled5gf9gl2m2h853nubb6rgcuvtrflicy8i6xbqg55csgn4o84zd4j2vk8d0jgssmqpts79crgnkc7wvsq08n0x67rsndk4ngbmjh9ixrmyywb6du5sv0km3uvnwik7rshc9',
                node: 6876147529,
                protocol: 'oum5d537jr8tux9p1nx8',
                qualityOfService: 'mmb0sea026dt0b7naawq',
                receiverParty: 'b37000w03lcs495vhpjycto2dq10wqc2k3pc9bhnc4qau4nbj0qlm9sienak7rk5bl7pbb8weg21slarumxxkbdlizr4z6hy5omsfhtpk74wtnqys4tfw9jnt1eo9gjgmnwdkbao3htdrguus2jugkl08rap5raq',
                receiverComponent: 'd8y3modmuye7y9ej7ks3htu733h1u95q8yz2mzlvlr3sz5q8kn2akraqghxbf83vwzcqdqjrjuzm7pabw7lo72d87n4hw5mh59cr341ge6a0h2lznxgy2kkho9wudqzow8e67d7i0b5ovqbbp50xvjc5ifc9po6t',
                receiverInterface: '559hffun71g9errs1py504rkrnffmq5ixe3q4i0yffpe01ncf6ifdetqtllrhsnugrwlwkrtha3ifxcrnnqwszldhjvwjntnx6w1yv2t75owz5klzrtxgw1wspykwutinyocat9opbye0wm8842bn0jjiga4fc7b',
                receiverInterfaceNamespace: '0uddhvbtgdl7dss4k3bh08y0v6iycgnd24xpdhoirjxh8z63vuuh3g5u5f80r78j53z0topc52vtwya38ssmtlm4rxkduw8zm47zbil5weliuvm6ieqj6qscvf9mza78uw1jjy0q90txstr2u293nbyh1zrg8j2d',
                retries: 4168162482,
                size: 6748398104,
                timesFailed: 2345157727,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: '6n8iizntq0n00zrs7css',
                scenario: 'umd7embl5bwbyx7lokfke3i3vdi1jlbswofkg2s2tq8oydbcn3thqzuf8xhv',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 17:28:29',
                executionMonitoringStartAt: '2020-07-21 16:03:03',
                
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: '5fdnxg43zy2p2egqbq2wsvfivtcorp788m0sseua3tmswdiudtad8w0c1r0kiflbzhi5nl04fab0vtl9zjkzvxa9efd3lt7kgdzpk8afwcuve4phqwpocazdfh5k0v5jw2tmgzk0ostaxwd7emy4giat6em8pq69',
                flowComponent: 'te66se8gfuwzcpppb0pg9ii7eyq4uhselpspfgcu5q8xladjzf89py7lx0n0nfffgoyz3yea1vejbzo4sjo0o0o8ixyb8968w27p132827vkb0smc7h6nwlulfar4lg4f2ijo5ii8au2av29v5c1h1bd56ydt0wf',
                flowInterfaceName: 'h0lesc5q9qcel42fxzuo04ae4ph2laygeeixguxp1wzpe33y82onrj08yk2celwg5cgzocupp26f8xddegvhe12s4n0eg8y67ufkl4fbg7mxclo65yuymlqylunnaemzglr87d5hefksix4x87elchvaq32jwyo6',
                flowInterfaceNamespace: 'nvneez2svgnyg8w50xhpye2ra1zzvn4k7jevmbartd4qwnpvzgipg8ohwntqpwmm0ygc3aarho4lsqtew1dz8pg4vkvexby4xp2ne37gnzdr3quab5og9lezek1glylqmx21gi1ksq5xc7phxg78gzu8wrezys14',
                status: 'WAITING',
                detail: 'Ut qui veniam veritatis sapiente omnis aut deleniti ex maxime. In eum perferendis quibusdam amet dolor quia et illum. Non hic harum tenetur.',
                example: 'ozlhw0g5wj13a76f5fa2vxvpjw565wnznuihpnwkdtq34izd7876op6nb78y7govelp9v4yoy4t5s5jhq5uhma6i07420w9uyo4kzpdg01dgjie08bzywdfz0fhhz4y96srbnv7zl2i4f5i5e7hsu87lbcogr40d',
                startTimeAt: '2020-07-21 14:45:48',
                direction: '3hvmjd2qsv7t28bhwzqu',
                errorCategory: 'am8sxwkwkwj3rft22y6ennxjr9m3oopdrrk2wktqm6dvxviyj6hr0dwaeuil7h6y3wf5lc2nrshffk8n5omvoi3k4h5c6k3iut5xda7mbkgnlgrtgyxmyjgjt2oo2al907or2hctzkwoundh2unirpwz3wqdloow',
                errorCode: '4a3tnj9b50vki6ezlzmy',
                errorLabel: 'xoxfp5hpgyzrjb2a41aaa25gvqp0vuy5i78ky1nbuwc4hxdpbytdw7qi9gvelowyfzuwosod9ra1slhfgrgyfign5nfq7to9car9r516nosrfvxtha4q9avi5oyt9s9hwss8xyqv73ihjz7niup42gjivty8bf81',
                node: 4927793737,
                protocol: '8smo4qo1d3f9bjilk7vj',
                qualityOfService: 'i3iqevkhcst2osn9n5od',
                receiverParty: 'dq8ctsm7d7si6ghchfcsggdobaplcxqymf5h0t6ue1fdlk8hqao3iz784fbyynrejkn1rgn4xvih63pv44366u7dqdf7v430vx8z1gr0onuld37ea5sz111hl53ukaeqwma3temq1g0fzekjp6if7kusfijo5his',
                receiverComponent: 'zn6byzvzvlvc686uxmnw8yo7dltpbsjo4llm5m8zzlvwfsv2hfxnhua1k252bi3p2ni00nvssi9cs0cqckkbu7zsrlyt74ipriv8u2l0xh5n4h5l5qsl3j6wnxfmm3g9qm62q9bkftitu38p1kr8iaroxo4ydn8k',
                receiverInterface: 'zyhjtmvzu1jn80uch0qi8fr1nt5lyyudwv5sedvy83gd50rfsxvarzxopledy7402qorv0hwe7to8x05pjuhqmk53yehc5sm2pw6uz51hk79h7zn62cyphz80a89q8h4m85q29ltzfy4fza6ahhp4j2wj8w1bsm3',
                receiverInterfaceNamespace: '3sucnxdvmcwhmf2yx1wev2swkvsoht68n48tnh3zahwax3vts9g5r9vpt1uxfx055xbq88wibemc0bhwjyuyxe9qex5le0k68uoxhyzstt3pndof32zb04a1v2tfmmqxxxums1lcigv99cbky6tllrbklsslb8pj',
                retries: 3570278472,
                size: 4211381486,
                timesFailed: 3727960392,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: 'c403b5txypmor0xa6khb',
                scenario: 'rwgzsowmlqxuro624vnea4anxk56vojn89985d3tpjjs89u5pqee6cgdddcc',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 08:56:48',
                executionMonitoringStartAt: '2020-07-21 19:05:04',
                executionMonitoringEndAt: '2020-07-21 17:29:44',
                flowId: null,
                flowParty: '63rygr2u3remq2c4644j1vb1z647qzsuv1jbalvndqds0n0xv78bpnm0vu0ijy0288pla45tklrlyoq3puvagko4al1rdl88gpeobmt3kauurpwhbvhil702mmneumdj78nfm5g6m4egz9f9weu7y38plx4vjr2l',
                flowComponent: '71uox0uarll2hni9bbonclo7h5v9qnnpsru7rp9fb4tc645iej2wb1biut13wdwuztnag3aqgkz9l8u8k5xjvp87bfi8e3mq55d5chl0jqiwd3i340kssgboce065kxov8k3ys91pntqqabsmn7v8ppp3ogzxw98',
                flowInterfaceName: 'dgt05wezyy6cld3a23ovvgbtahsc907pp3z01gjsdai8tounzahvibwwcprhhafff0mvw72tqzmweqqcbxwfcqqlf80qb5bqt38dnrtwm7kk1px7pzglce5659x0m5q1a3nkgfwrgor4w48scpkwmi37hlhi7i87',
                flowInterfaceNamespace: '1zp0kam6jyj64q0oku4nsdp5ing03xvw99fxnzr4nuolfcp2tp5g4jzoce2keidzgxxd6mi1mfsb662qlp5s8bwpfsdsnmasdm3hnh4f9049fe2i3el94d36mywys2eej5b4gzp86eb3nm6bchrht4un80oinyq6',
                status: 'SUCCESS',
                detail: 'Assumenda et placeat sequi consequatur. Recusandae deleniti sint recusandae dolores. Accusantium quaerat consectetur et est et nihil. Maiores quaerat et placeat. Consequatur optio et beatae dolores praesentium laboriosam ipsa culpa impedit. Voluptatem dolor libero accusantium architecto.',
                example: 'g4va209p6lt46efozl8fqj316461lmqeom0mtf8y4bqmzcszynjfx9ug7lorg3c0m5tak0ayh8yjk7zlivrnsnk54myaulfsgoq78hfc1j6svf9ml99xwrvd8rjgfyllevuktp72mfb823z0348r2v8qcuoy283w',
                startTimeAt: '2020-07-21 13:10:17',
                direction: 'tcg0ev22fyccvhti5f8x',
                errorCategory: 'spryzw6zgondb84kt5mdyeuefuvi54lbldvsbumhaanzwjpdt1wlqtmnv5let25i8bg5sqfm6f1t5937y0atz791nhfijfgz9mj7w3mximrvm1yiknimembijc60rilth57rabv82uu6s8g2c8eq1o0fw7e6vg5i',
                errorCode: '1u5s2mmyqsnavqgief1w',
                errorLabel: 'hdbbz06x2odq2bv1ijirr0z2c91i4skn6c9s3j3o6s3zjuyoiifycf0ew4gddy6bctvpsae6hiq21k3ukg69zdk786c660fovykmmyhhl7vk4cw9ptafczsvqgt78ory1kprhvv00ap8wo1tpyyo6pu2uihy5ts9',
                node: 3841151953,
                protocol: '0pv9uipofwx5982voigm',
                qualityOfService: '2s0aemw52pmwx3vrmb70',
                receiverParty: 'ebypf2d55jbsl207e6n79dk042qcrq99gqsesrb8164bua9sx1cs3zknk3z8kjic3k6pt9dpqdhp72jyvvwlss3tsb2ri97oqxpozzxmdpxn47kfcn81icujqtvee4vgdlppdipn6besh5j1ruzwit3sier9samr',
                receiverComponent: 'nidn1a144txrgc9zv39rd28y634i3w68udtm4ryaoel9xdjjs4i7nrirlik5svu63s2dhkysk96i5td262ir7gfkbk5iuwjd3qoztc05zy8o6wncug43jjlnz65wjnp3027ntvxtdus684799mawwswyhd2ej9ms',
                receiverInterface: 'nmc4h0vsy048h26wv3f0833r05q2461xkpytp6vkiqwybvmy9o03n3tdd3d9pz7nnxyi97y00si4ohkwmwen2w6gxgpijai5cegtaxkl1dgeqsbah330pkhisk7mkbkkqyq0wrsmcrixxzffi8nymazezjxyohb7',
                receiverInterfaceNamespace: '9f7n1frncqj0zclv3hp1nz2dw50rrbgxyt40juo8qrljtmz2ln9wxszjk99z5xvcanm53x9acudt4fnbm2l0qwstauptcqsv9ievbjqdjcz1ywat565s2p78y3ugxwv4y21nehf4g6rirnjeqpec6kwr8thjj8z4',
                retries: 6903610039,
                size: 9437211498,
                timesFailed: 5549561629,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: '8fojp2yq28k3j1ir46hf',
                scenario: '4qmrkhygha0ka11ugd5stcyf16km61iygx5m0g09h1mfwqvvzhdc4hydmci3',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 10:14:21',
                executionMonitoringStartAt: '2020-07-21 23:03:43',
                executionMonitoringEndAt: '2020-07-21 21:09:24',
                
                flowParty: 'g0m0okmi6nupnfggmsw1dxnu8ol5aw5twbcxuodw1y9ibf7rt52ujfdrhzewyog6vzj13pd4a182jsiiw72r8j3fcekn2docu17piyr5gods6gudrt7nyklodin3t4vsmskgxd24zczz1h203p9mgwjnkfaa7t4p',
                flowComponent: 'zdmcixaoys2a6teg3j2izgruhik07tc7vjawjtv91dhhhcckd5xuce7m0g2a7rbvlhfebf65ff3qc4ci8hxdtr8ieyq514qncom1p6zj1d46rk44kdisk867are3xldqua2dijsdzxqdi71b4dialolp9fj1e93p',
                flowInterfaceName: 'k2gz1wakte2ui5uifkucb99csbwfd45pjbd77lakx5jqxycymrhuvi2ge58pv8khs708d9oofj6u51vzel8bzzelo555xc44bwl2o24sbjpbcxwvqppywu5gx8k7123ysuyywy59uqkc2pun52e6k6g12byq5keg',
                flowInterfaceNamespace: '0awn1dpnvoobu1wpmmruprotmxnv3b7byj66nburyhm6iem852pmr4mp22he8scp7b5ud6bkhrs2bgnj2r4toyicaxf3y1uqlrzooss79n6enzh6bga9bzthj9ypfzcvlgroheqmnt8tsodn0efwxomfb3bm1hng',
                status: 'WAITING',
                detail: 'Fugiat qui illum voluptatibus. Qui doloribus aperiam officia. Suscipit cum consequatur iusto facere labore odio. Eum at reprehenderit earum natus est sunt ratione quae consequuntur.',
                example: 'nxlq563lzcypos1lv2zdfy4juh2kekfyf7ytfetwpr23xbutl6xkgqc7vhwrgjfwl1kdh5jmjxxen9nbajxsgwzqsxgslg306gf77l5fklj4l46fgpm1qccyviu6vll1erwg7n6f3cpqbkfhw4gx9kfr2xgdn9oo',
                startTimeAt: '2020-07-21 12:22:50',
                direction: 'o29wkzv3tvuo9awj9biy',
                errorCategory: '2hnnjrtao23nambw16eeo9onz4en2vcvce3fu6nlyko3n4vefp9ux6gyenhl9kfo8be6c8vyw6kzj1mpviz3rq192l74jghx7whdmm55xrst4p26ugbyjrh41me0c5yq2ln3jzea1z32au3dfc649jeyooedhye0',
                errorCode: 'ty7l1ewo23jf78guzu0s',
                errorLabel: 'i4ipibg3k9aaec4g1osrzazih3cmkkjtsn17bgskmqeobc9bh9knc3th5mrgdxote5x96fero7zuoc37caqbms3jj6a1p5gu9jvrhghlhitqfdlve1e1xmmlnf5x0pr9mt0sfwzruuciyfc8omwacfz44hjqcpby',
                node: 9449277963,
                protocol: '6d6y6ce82i4yrxg0h3xm',
                qualityOfService: '40i6rujd0emtsp501vn2',
                receiverParty: 'whv6az72kxswntfsfadi020d2yss3yocni098dndmx6z9dyu4dh9ut3g5whr345gaxz7lo2ltwhoqmjrvk0bb36wwtfy6s5jxl1mip456fagpwdwaynpabu7nros18je9sw7lgaapb15w9lo1mmmnse1894b196y',
                receiverComponent: '8zlhocb0nys76gybomofzw08sr02vm84ljilmp0bcen7wtjrl1pm9lvtwl3hb2zerttexmpgpqcsfg6jax07gy23wnfe480y3yf7p8v5qk5hwbcuzlg28d7jv7odcz344wohtw0wcs9gt5l6ihruxwdeiihjzx54',
                receiverInterface: '1mcqv7csvpi9je495xvria19yfi78e737um98im8bhhddyx5n2ez64exub1625el350r7jy85546vpizzp5a04qywg22gi7i7rx7j7a1l029bcdf27gxexnnu14pkr2amc0aek162390ty08gx8q4yeepycwzdyf',
                receiverInterfaceNamespace: 'xx13055z19h46ck631ys6x6wek0xu4n3jacsji5l81jz56h7bkogs98bqzyffhxmiso95mp0v5gpglqdt5r9za2983xpu42e3urmgxql05bml5fca0igqsprafsubmygvcu44ckh0cw04wok1yv9iz26inyjl815',
                retries: 4415676438,
                size: 7241795558,
                timesFailed: 6032768649,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: '3f4a017qtb5uogv4l3fz',
                scenario: 'wdq1h5kfh7fqgsvccztsd5lyiql0u33rdytppc48bpg3pplg3z6c93xvsfmm',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 08:35:04',
                executionMonitoringStartAt: '2020-07-21 15:52:55',
                executionMonitoringEndAt: '2020-07-21 04:34:36',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: '42v5gwrmv1m82bea42desxavv1pctsi02xn9nmzcoflh59p0lyz9nf22kg2dy9mty8g0mg6dv87mcp5w70e1zpevlvwzl38ivwg71jc9kvdvf6lpttvsi86fx1k7yyh0ytd18jldt6hyb1xr33axr8i8vish6m1g',
                flowComponent: null,
                flowInterfaceName: 'tcmuir4cvkfg8dzv7n626ka96r0pd9snyjsw9ugh6cux2utvw8dtdyrxx2jd8y8f3aszeo9muuhcy5t905j5lnanfc8uoj0tglbz1dptl6zkqpecqborn0z042matb62hsoeyntjb2ihktyu5jndc3bukppyx708',
                flowInterfaceNamespace: 'b7cm0z1zhuhsgvv4w4arhiwqjsu3ja2g57z87mixoslbwzy0p7pq6e8rfphtz1fke9x80sib90fgxihgdzo4ws4klmg3xpwklqzu0cdqydop8vpiey15h7iolj9j0kiy0tigddpfb5je17zcyvs421vea5hd4lgb',
                status: 'ERROR',
                detail: 'Est non consequatur. Architecto aspernatur excepturi et qui. Sunt ducimus sapiente eos.',
                example: '3qu5xtcnfyokn0sr2iavnunlyla44sxqqmtefstnuuq4mq3z75vb4vw8g97iwck4z892xxrztilgn7n1u92jgset0o4r3i3owotflygiilatbmszn8uz2trlrhg83qfjk9mxhbsp67tr54qefedpqgaus0ivv71p',
                startTimeAt: '2020-07-21 05:25:46',
                direction: 'pasdxdgc222lzz21zcgb',
                errorCategory: 'xdvvvmeqf3wdaotvv9jc6r25sne5ozn0w7si7r9do37dqkkfojwvppp5u2da3bgixgafk7k23bsjdkz3deshe7giycejw6w5ujjfzx38hm13mfid0kqbotinsinkg162hxvq6dq2zjkik53y2k1pxugm274yke1p',
                errorCode: '7zg3gplu0t3lbn2frpo4',
                errorLabel: '15214l4cmmh9l2kq55na5kunovcso3jw5c5xjx9e4ytowr71ley3mxamvkxdsvye4e8bpdrhcwmn7imr7km77dwdxug7dtfbnh4lcfwhqgnbyi6p2zvwkpgmsfmaycarvghbsat0heyt4gv7wazirpun8cbc66ew',
                node: 2804279833,
                protocol: 'ld0me4logiphe0zer2lf',
                qualityOfService: 'b3je88vwibwz7dj191qn',
                receiverParty: 'fqa400xa3272vtu7tc6jlg2nrehtb7bf250o2rd74rp8ajqlu73fn6ia6mjnd69q8fxywh250lhn7ngbdib5q2chaers1n0pq1yas9wigswb9nphgdhmqt3bg1866od4kx7hwqf8mx0hbgjb6ana7o2yye3spyx9',
                receiverComponent: 'z9fzwuas27pqaqzyqaui63fgtf4azz667dynle6cuzum7j71hrbuiwwhncml6lzt6gllkf7ons64sb4b8ilzu8ovpzl4lax39ww0adk5l1uwxmwc7ytzu753g0b5r4u3xbobbtxhxs1hgo4dq9miacwv3nh9026l',
                receiverInterface: '7vx08e7k9yvz3ofks703y7tdhjwkbfn2dxgehn1v09sbqmogljwf5f4qp700vd9k3u8o218nnkxiookm27jh9u3zkfyv1t9vudxaphf3ngyuy9nkq7gnppzp4b0qzkpv1417qkmuypc3rywnudfi2ydbzqj3njai',
                receiverInterfaceNamespace: '80yd7bq78tjo94ldsdmqzx3f2yt00i4v8z1s93qf8i2wbybojliocjg2z9m5lztgwoszgcjx74rmhdkr58hi5uwpx74z4vqffwtzwrpdmhsdipt207g6dsl6ew874ti1yaltvcou9sls5ryb5maqdr9z9navktxg',
                retries: 2619176434,
                size: 6349464737,
                timesFailed: 2798486075,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: 'xabvtm41nilbgabndzwm',
                scenario: 'beu6yp7fbbu5mpfm3gv8gwmoxufbp0hwgfcjrepskxc5tk685kkpoad5psvd',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 01:58:06',
                executionMonitoringStartAt: '2020-07-21 22:23:53',
                executionMonitoringEndAt: '2020-07-21 12:58:15',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: '1oibkea761owudhfk6z4taii75dyk2d299qm1aksl1kezwpm85x5nlxjk8yzv7vj204zcrtpjzdu83z1shfu8tl8332iivp53okrm05atdl5zt2677t8upes27phxo7g043u0lly5czzq0lhv52foe23hzub7mzn',
                
                flowInterfaceName: 'dro0getskoilvflrzxsbfmnh647pjv845fb0x7aq9ntgjwsnabqjjw2695v65jrwx6cxp5kru1gh9zqcjvhqv7vh5xnkp5jir2ha4gifu5g6rbatxxmtrvjwg8gehbjna071xtf2ul1hcy0pj3uo9mbelxyyb78v',
                flowInterfaceNamespace: 'c7qkxoc9ngq6045yolopsvzq345ttlqslm94hr9pq29w9yb9y9uuxh6s4mtkbcwsbq3lpdb6mynt08664l0lr7uo15hbgnhxcnc9toasii1hrcl98v1uf34v7bl1lblq2t6djnsq369gcghfqiizao4i8bcg5kbl',
                status: 'HOLDING',
                detail: 'Ex veniam dolorem ea. Explicabo ex non sequi sunt accusamus facilis quos provident. Totam accusamus officiis similique.',
                example: '15wm6wzdzumqh0fxds15qvrngnfx0cw3md1ancjh8pu5yc9337sr82ce9rnbe34k68p7408irn7iwm3one98lhz4i8oqlpbw3qv0d1qv1hb5q9o17bnvxud84rw3yf4ff04ndgg6myrdkxb32h0oyxca728feoab',
                startTimeAt: '2020-07-21 08:53:18',
                direction: 'jbvh9vydw8yca73nmpo6',
                errorCategory: 'cw11hioo9lx09bdg80zyeiefhg6gcjqppeo2nwfg0qw8wa137ax2geasfkzs65t9eeoeeqdoev0hasw43m60ybqvyfofk1tkuo6dbs4v6355klipgwgl7l75h9af6s6y2sq0xgk9tgkh2h3l43zcae5gbc7ylu54',
                errorCode: '0majmu68oymvcss1xcw8',
                errorLabel: 'mfos1ed2gthl8326qi9ukcvg1b9uuyv3ne5jxo31oxg9uxt3k7yujgt6fs90i22zvbv5x52v8xqxw20sxe3s2nx7vac444n7n71yq7e7w1ponnpx66uy0ohrhcp31089vhm79sv44xw11r7pq6076s1sry7rydld',
                node: 8800203141,
                protocol: 'a1iht4yi9t1aun4q4rec',
                qualityOfService: 'lyaty80whej47n9u1h9d',
                receiverParty: 'xnhmt12kp0v7mln1u8ck234z0kn0toj5u9opg98qy5bxdsqxw35alb7gbj4zbneo09n5nez6orrrzm7vultt3af0l0mwdqr9yp8krxse25erwrasv5m64cmlb0t3dm5zgytc8y39hsvb2znhpif8in0c6doh9h64',
                receiverComponent: 'z2gvkk28ft64aehhikmsmp8xoiegoru06p9yoez9pbt0dfuj1o1g3brd4epvvp0edcwi014lnmh6mx2uocj4rr5gwa0omqkbisboaqz9ttd3g2cgtjc6x7hmxrvvytemgi77ozrbpfud6rz8gfl2ov6eos60byb0',
                receiverInterface: 'e0ttttnylanc0izrlystyfamzpappw00oel9y4lv9e0jzftwdhzo8ab3xa01p7dou68dxnyzng1ixz3mn9hhg9d2yu7n27865l7jenu4dqpzldikr5gccfhxvljwoyv4fh8308q8np8mpqcvw0e1r9yrkmtf7p1x',
                receiverInterfaceNamespace: 'pu6k13tvzf90v77vamcif9hpqz9k2bht98aujq3qk21oe4kke814cjpl2p4m6lqeei8dat6xxduhkw6qozbr4j0g8ju501n30g6zps96e2eypgb4befrypta56qzk17668i5vcjuwb06y1mqep40o7pppb39xdy9',
                retries: 1328844144,
                size: 8421350511,
                timesFailed: 3668082966,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: '86ba1d600swghv5bjn5c',
                scenario: '2y11xkz4wrzpjcpi0cl9ph2ovj52lfxttdq1kg0mpqtltefol0e1xpreg28s',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 15:13:33',
                executionMonitoringStartAt: '2020-07-21 08:40:25',
                executionMonitoringEndAt: '2020-07-21 08:18:09',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: 'do8b6rjgh82dzn13bwopoqujxfp4i8hr1olxoitfiwh98yne3d0yb0tk1vpgvki7buq9snh2v67foll8lkwgqvfza5rqis1wh570xiqt9uziy0gmtuj69i7fz0b8s21nal0qq8y7wyjpulvpe3dktgscq84ke51d',
                flowComponent: 'ryfhikocxipoxcd0pqsnjptl4z2yxols4k77d7d3v7l5osveumod267sxyh6ymbyxfqi1zc076c6pzr7btfx2zw1e5acaa520zbptwrbwc6undpj2pzu1pmjvlpb9jdlyvscdt6cgmt46mmkgu847c1vstwj3j7l',
                flowInterfaceName: null,
                flowInterfaceNamespace: '6wp5q6xjbj93p2oalmkw0q86nkysoxae73hrbc0ou94n5oazlacctdhke2uwjjt7e3slpqazqvn21efkcsvkek29hgtqgeefc490pbsiwxhk5hul52blszzpsxb4hnk4wgxbo5spdtr9vpwtdm8svsys093viyjm',
                status: 'TO_BE_DELIVERED',
                detail: 'Veritatis totam occaecati aperiam necessitatibus quia deserunt. Totam et quo voluptate repudiandae enim repudiandae dolorem. Laborum qui cum voluptatem sapiente voluptas et aut. Aperiam porro aperiam et ut quisquam quia. Recusandae dolor et consequatur. Molestiae aliquam ea ab itaque odio quaerat nulla atque.',
                example: '3hvfvev1bl0qaolyd1fswjewdag8f28ty4mvz82vrlxvsrkjpl36r8m8glyik0i1atm5dlm17s19sud17d0t6zdi7jzcrortiyi66u7s1o4udto68qw2fpkxs4vp420294dsa4q1s59demj5i3z4h369t0d27wst',
                startTimeAt: '2020-07-21 01:16:06',
                direction: '7hnm1jhdqth3nvievdol',
                errorCategory: 'k429u8l4wp5w2httwtvr9sv6141ohgc7n19j2pgfbkgcx1qkf98st1t5usxnyee8kyrxw9qinbw3mx1ijs185f71o8ccjf0ir5o4foep395ym0kqo6x26nao2vp8wkd99ox6xciiehr6lm3b8u1nk860drxuxh7d',
                errorCode: 'sg1c6iaojo6be3dhsnnb',
                errorLabel: 'oyvn3yikbpq0ckmakd9320ecas9pipic6pqhn0yq3zkrbyq0dzqz5a34y266qnukxmdpsdlh5muy8vzh8ypp9txu0zoyrmprfyhxjz8kuaui3re99049hqxusi7plyt7e26mw24t6jxc5yfyhjxf34y1i52903fd',
                node: 4572289309,
                protocol: 'a2ettcg7xqep3mupn7rg',
                qualityOfService: 'jdmhvzngxofz0wzfn744',
                receiverParty: 'albku8d167la2eohbi1uokjr6iob9k37ox3x22nadm3ksyo8fbyvsika2hsbfw2x9qv6wz94zj5djxqhwq20y7vtl5cynrrlwjeg1jd6yelpnb36xxlqrfewbnvf1dnfp74w26d30ceh3v86cxz5szztlu7ue7f6',
                receiverComponent: '4mnumxn067ynrobfjbjrc5b6sc2godqu2q7qm58ru4jt7fvkf4zim3xwsfkil1f1lgsy936rtsdt78j3ec9jmihjp1p8pyexfab6ve04e23p9hyhw01quhrnjz3hxsgis548hwlrrckaoon6w7rpz0k2385u676w',
                receiverInterface: 'ubaqu4cruixir2jdm5fuekccafselow65p45qmwfix7w1tv4i7pgnmxj6rss93db5ur9fnv124iimico4dcipj3a349yss41d5yivw3935r4trg6c2v06geyki11cmjcnioxortzz2nn3o5d6l844v36l6phsv8k',
                receiverInterfaceNamespace: 'ajiql1wcicmqijwuo06eoambd7d30389hifujwesoimac1a7gfb0t0e3o09o2tza7yg0wt5ul3vzwnava8eq0p58fcl8zeyv3wbtczlztl5w8kwt857g5m6lf4pqqumflbbztoq1a1gy0oukwmap8p0li6np3pmt',
                retries: 2087789287,
                size: 6648640838,
                timesFailed: 8972445041,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: 'u0q69wqtvzdvuo9lh2gc',
                scenario: 'd0a7to05thmsg9pdnwbc19cjroeg6mf9b9zs7s9b55dwfdhgceytqyma7ven',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 05:13:12',
                executionMonitoringStartAt: '2020-07-21 19:52:29',
                executionMonitoringEndAt: '2020-07-22 00:22:48',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: '5e8b4bff0uxnga5e79abj9vk4er6i1853orm0w79po2bab6n6gymmfbx9oc7uc44nbtdydp5l5lvtq4jmjsdhimst5odbu6ecb0zi7xmsdj8lp994427fc8tjhe05g6y0pkxsoyzjzwc2tvqschu1nzx28ywp1pi',
                flowComponent: 'i0y4pphkuelsv9qydfs9rymvui5nz2tgvr7yb5e1hi5stjs55phbfrl3ccsde077dfa4ul2zmer2dz92itvcwp1maio782xuw4xrkl4lzlnc78rmokrl23bi70l9d6t93ihinnhtrdf8f6lt9l64ghppg61enhhk',
                
                flowInterfaceNamespace: 'wqj73pru5d32akcp3ywlylfldktm4lqjzbiv7wunsd0wjh9ihn73zbxod53ney0nhet5nrvc8k02anquyqbdqdwwez9iremlqaw0feyfncx70bpneyrwjp57thu62li72k4qi863pi4ymtj8dwg7ilfzswsmt3be',
                status: 'HOLDING',
                detail: 'Culpa dignissimos blanditiis nemo similique officiis est voluptatem fuga tenetur. Necessitatibus ut animi consequuntur quam. Provident corporis qui dolore.',
                example: 'qz8i6zmhnuqxgcxvachr2y0nom9toq6oj6ae1lb5foxr83vdsb72giqlrvbg8yg1tjvvan0vm1ut3fl3abp12lasjzkwierrg3m4sh61ylxppzmig744z18pfyxroc8ahnugw70fshinmi4mb1ple7v2twgo1ppe',
                startTimeAt: '2020-07-21 22:55:14',
                direction: '7qs274hf5xgtmlw20a1n',
                errorCategory: 'dxw80vn21994hyl5rsnglteirloxdwyfkvvw8bdc0ai2xo889iubzb4oachkzotv825ypejbtj7kkpxil7i47hkuy92vv2taqbgpwo2j12efq68s2a95z1ssqj0vjtvvknybsibjglmsupl362mrajah8umrxy7d',
                errorCode: 't0rtqqjdfx92twnocv7g',
                errorLabel: 'raub1vldir8abgfnr7mb5otkw3fid0xu1rijupa9g6gmi721m868qc5z2awrm5anr0zhv4ipr0j2kg7bu0fyo5z0g6s6s8giuyoh3f4htkzr78jpdc89pey968drm0qg0nc0zv8zkj0daelxv62tvqjoz34ng569',
                node: 7520338230,
                protocol: '1vd58bprv5ep4lzggrji',
                qualityOfService: '15hcikhrv62vmo4ubwq6',
                receiverParty: '9jp5ltroso90beh6rvu6r3wfuoeq5wgs6371hbp4p303j17gcogpj4wrlpnfxg9tubjkiqvqxwnvjicz4bw0aegv4p7jcqw0t1b2bgxxpvs9t9lif10qroz2r62t21xq2vv6b4qtfwkebbcfahomohnj9oij6cfw',
                receiverComponent: '0384fjcgylhi45kd0ihzv4pn646spjwbr9lbw5i1c0cqqg8tisfo8fh99zbepp9417oqsyv2h679lc44plw0np3e75eey9v0u6xofkl24l39mfwh9jg5fmz89xveji1zkkpw3u2yeeg4sm3vc8ohqmln3ew7ido9',
                receiverInterface: '0lunitkoo2vnaow6omspp6bghfqunngalwo79juhidcjilvhrz2kfuf3yiyce0fz0ob4i0cj4lw1puibxliqnqq3fqejaz28fc3aeln68dx5pg49y2lt33ua7t8zmhbpzygvcspw4g2euflqp4nsp4l95pcj334x',
                receiverInterfaceNamespace: 'yyohtc1tpy6rg9eilxe1hai396mev0earqs8pgegbmhka8qbluk4b5chcmoh5itg0n5mukie6xhk7l0ujl5ohfaic9pysjcxeoe5i8h412nnnori3k21wcjtgqz0c5gjrfjf3rsqvfnoqhscusnlw8xdidaigwh7',
                retries: 1872831139,
                size: 4445336923,
                timesFailed: 2092078993,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: '4no7bcluw4k7jjbnchm0',
                scenario: 'xoauca4wxboulmngbajhw8sbcrnx3kdb9a55uv0kkad78isglynzlft28yub',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 11:56:09',
                executionMonitoringStartAt: '2020-07-21 15:39:47',
                executionMonitoringEndAt: '2020-07-21 05:25:25',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: 'uiyjk8stbchy4xnqyo9b177qxlo0e9xyhy910h2ekxmu5mzgvuhyqxaj24hecmha67ftz8gdwtfr48h09f9k6e7jbmzbhlprxdis58wam755j0rbqicfjw7wekv8lgcr71hk7sgzzuks0wfdh7e7pu5b6szk4jny',
                flowComponent: 'qdgyjd3jpqsbu50om8q9s65h1suglsfxlodlcmr7c58vrgal5yqt7zhacklteod1pi776fl5r8r0y4iz94qs9pmc2oz4x9hgo1rrbkqd1kyupu4qc8nqiiv7c2m9vqn5q6qq7mxlh65elfitx6urs8f4yix6albd',
                flowInterfaceName: '4sgpxr74ihih7yliq6r1q8o2nbck6wzmu16zb3wf21tc9xse7zi0ahf9n9c1i7jz2kt0k0fk348gz3fnykftzs9qj8sb7kcv6ojgd8dqlrx6r55uuxr2c7byxgq19d27po9mpf07et7dipfrbn61fw39def9k7r9',
                flowInterfaceNamespace: null,
                status: 'DELIVERING',
                detail: 'Fuga eaque est enim itaque voluptatem ut similique. Ex rerum doloribus enim ratione voluptas. Occaecati officiis eligendi voluptatem soluta et eum et quia aut. Reprehenderit velit vel fugiat. Non aliquid et modi. Repudiandae cupiditate voluptatem omnis temporibus qui et consectetur.',
                example: 'oihu67fynkjlnmlhndd89ag142zm8ktr6h7sbhsxanx47kywm3n07k4rkzhbyrbwmyi4arg8c1x2rnxykyjvufken1rnu914oayumvb7hquesmns11xon8gtbm0t71uepdvvd2toynxomk72662ry8373i4rtep8',
                startTimeAt: '2020-07-21 21:38:07',
                direction: '077874r0bnpuie8nbl8y',
                errorCategory: 'hlidek0gghocsh4qk6b0q5v6b7ygwuwz88p531hlko3bsxaqs6f1nblhpjix6snr4l5jqcpkwz1023hsgi6dz415u9x75shx19cscj1tiyi0bp33egijdxcc23f2t57te8j627zr5cr1rwkd4cd5b3lmacqvwadn',
                errorCode: '1dl82an757ekis2ccma6',
                errorLabel: '4j3acxeykbegod63jzlm6ffk8ttaag35d9u6ku8mzth98laf7de8z8ix6053dtzcnadrgbcyje8f2vtv8ewfhuqy1ids7r55ue6x4yyvevlk955p0my28jjs7msf4ecuug57ajic5y1dul6l0vrvgnbg8zhejysg',
                node: 8273776545,
                protocol: '0m9to8te1h41g62two05',
                qualityOfService: 'd5gokeiug7um7g1nauzc',
                receiverParty: 'vz2tbr30n1as1dsdp7lfjku6cxyov85itg62q0b7fv9fz5uhjht46g08eqwa0sycvvfd3bissamur97zm7xw0gn4s4l7g4n237xeq1ohtiknyr69gf2cd56xyiubog0rsotb954hgqjzwcju7oae3sj1sjvn1ijf',
                receiverComponent: 'kcgu8k428xxaxhq5evopu5rfkvq94tglppdgzb1e07pbfwbtvlnjfv0m2r067asddaxrbf0ut3fcma3uc4l5piz6c2smbz4rj48i7uhryp912oqc76b3wcxankmxu5cbqgr5vl1mt1r6raf7k4jto5yr3nlortb4',
                receiverInterface: 't6kx40lkxlo5g41mop50y72fmeylcno5iukkl7jh5yb3s6pb0ck3wwm0436k273lsm7yk8ry6wafb63ys507631epmwuuvqh5ohsnu92kcslq5ti6eb4qbpys0c3ibpphqe6h4bsq8cdifpnyx9fh8pqwa3gqsu0',
                receiverInterfaceNamespace: 'ucnijfgzht8ze4s5enar6yjgyn6jxihuaq74tcl96313f6wtp3ae7nthkka90fdvk2xfb66yhfelbwmgj2ac60kc1wxd4pq2bahteaxbgck4rsg7k98uel6zuzt6ry8hgygobky4smyliya2v8vyvionxbycaqmy',
                retries: 7998392115,
                size: 5314398056,
                timesFailed: 3274890887,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: 'jh52owf0r9z9gsv5n1fm',
                scenario: 'h07i4pi75lhjqvqis3hcurm5oziui84jo2yhd55fvqq9k15dhml39e2hxu8f',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 15:20:04',
                executionMonitoringStartAt: '2020-07-21 11:39:41',
                executionMonitoringEndAt: '2020-07-21 22:50:26',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: 'a02dt495ksnv0isvrqi4dzwkm6m1wjxrezpobnsnps40qd8mjhs4irxr97oyrg0mjccezz6jq5v274o2s4824f5e0f9x0f0meylih2i6w8k0cu2h3kvmjwab3jnphpj2o7lmrwfa6cluq63jcx7e20nu4wa42qy6',
                flowComponent: 'al9ljj96qzq8evyzh50art9cuu7mr7u15iwa4o5piurwpvpmufyqxxr00lnlg3162lew99mjae63z4kh9hyvny6md8r2nhxw9i6ronxttuj2qovwjfbgqow70loze6j2mkgsibav1ldaehii9kcxqx1hvnve7rw3',
                flowInterfaceName: '3ixaav7l75jzewitmc51slrmjns8z9mb6naksad5bq0bylnmldcq4wqfdai08vd9qjdvvtw93o0papcowmkjnaujda617e7xo1364lka13rvmxx28w6e1vk6r8kq2qitpxxg8e1jgew1g4vhsrsxk8ysxyuc0bp2',
                
                status: 'ERROR',
                detail: 'Et id vero. Doloribus quisquam quia vero consequatur dolor totam quis impedit. Ut reprehenderit quia debitis delectus veniam molestiae occaecati impedit vel.',
                example: 'c00vtqp8pohcsxdag22cu8bb3mh5te01as56mriwyasi51p33kfoasfgor700kys0kh03hgfbji3lnooesvq122hwufqu5bikjtcjn3odn9mu01ul7itfzi81le8cftg7nao6tcqu72gk5rjza7003enn5yd0te2',
                startTimeAt: '2020-07-21 17:25:20',
                direction: '5e7k29ucra2bu387rtkv',
                errorCategory: 'r89osshhsaqzie2fhlkmsw49okficiu6eg96fik084qkkmlvcx7s7mii1495itysh1aotgd4iqj17aez71bw8c6anm3gbevye0h81u1vivhg5ivjuaw5zc695em1o4c3pd6xoodrg1i35ybvo9r01wuyjuyifrv2',
                errorCode: 'bsfskwljdweg7zj2zvrs',
                errorLabel: 'sweghqq7wg8o1e498ddbv8ess3nh85mmr0ro89bh7hct8ahhtk8zih4y13rwfn6w83hg1rtcxnv3htt1g6c13yvd6ayabarlwnex9o9b8z1r0jkibxa4ab9iye1jtd5565og5ujmrug3yv9ybo4h6jpmoi7gwuz0',
                node: 6003883463,
                protocol: '57h1ci4u4s3bv0j7tx8x',
                qualityOfService: 'tz0d885en3due4n7xaq8',
                receiverParty: '58ythevr84688gzubpiv7odtf4lj71twmddw5gk3t62nrqsgyuc4wuotbrp5f6htn4cp8apgl1tx81ij9faqinpemttyfpxnk6zacrb7ehy1uyev16qbqf1pmctogcn0ryfhxnd1ja842ftsqvz4zzc7w7fc0rgd',
                receiverComponent: 'wvhgu021oxmb1cwcm8c61zlxsu02kiey6n8krppg6kmdjbk3etq15xwurj2zamu3i1e7rrzoybrvxh2xxicnknc10c0ta8ufiyx1oxhkuuy85l1zuqka6xg7sbot8y8hkwnj2yoe6ajk8bwe6aebnlq1q8rh2rm1',
                receiverInterface: 'bwcfadz8bmzujr2vded90dga5zoa9c36r4rgn053bt2q0id93gjh4xhacunxiggwqwvcfwzxkb09duapn10bvn65uc9i8dwui9sa7ptm1swfakh6tuhvr5ci7kkpc8w0wwp3zjoi4n6zjiznufpjfbkwl01l3dpl',
                receiverInterfaceNamespace: 'nrz9xj94y4rmlkznbjk9sf0bvh6gzt4pksdgulhzg870tw022m5vhkqoh4sae877jxgnybylgsickuafah19crrpkvz1jasz1wmvarv5au6t26n8hkcnlg86dxtu79p8xay2vnidnfmoop10wiydstgj5ilf3ht3',
                retries: 6795952956,
                size: 2863073238,
                timesFailed: 3541390729,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailStatus property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: 'dsjw30cid3s4ppue2h7a',
                scenario: 'hwp3vqgryg7p40l5ve6rt00p5gzo98kfrsk0l9m7lknlb5m80fs8vt0tndph',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 12:20:42',
                executionMonitoringStartAt: '2020-07-21 22:18:47',
                executionMonitoringEndAt: '2020-07-21 08:21:49',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: 'wpa0ewd1jily4fl89ooqteynyci8jcft856whctm2x5vd8dicrdt1uo74y7c9ikwhg130i4quom3zhd6izwu9thjdcdo7bvwfb3k5h5jl7aczuypjpf83bse0kclv8tyjeb0bmii4s4gqv9ln1ek580gdtf3177t',
                flowComponent: 'w5g1sgku5jxlcvoxvubkiec8waimpme6ee93veufrqh9hky7k3xn8vcsoj4hhniodkeyzgmkttau4zt83gb3dzwau256oq5eh0p3arvz6b8b9gn06nptffat2qs5x5uxkiquzy9gs88dmupo3k8mlsbi0acs8vge',
                flowInterfaceName: '7c2og7bc3a0sez1p6670l5mmf2nqdean4w79kho6dy2rxy4zwnxxl50pigwe3m068siq7bb9eli9r8lf0f3n76a1i1272cf4wxysi5gzykmsqbts5s0ji540i0s3yj3zn39iqwtp26rbxxnwnjhlrdu2016j6048',
                flowInterfaceNamespace: 'jwr4b95vq0gatr3h72pv6dxneloduky0diclkfx1fb71nkr0sqzyetsz3k4rhpiy0zupvm7hi9ah80j4w7ffnb5hymj23x014qr9g4hnysrdwt2s7awylniyla5etfux325nd9f3ulyqvb4a3lsfh52nxic0w73p',
                status: null,
                detail: 'Aliquam et et architecto optio et dolor corrupti. Tempora quia velit nam molestias et non. Voluptas dolorum optio odio voluptas accusantium ullam.',
                example: 'gw1r71gw8hsy2l08b2jybk1kvjnfwl1hghy8kdbw6lr6hfjvkmbt36aog6m59teqh8fs9dp5hrlts0h62t578k4i3qs96rcpbokgrxgsxmeac8oimzpus7xokap1bvjf7n5lppz8zmszqdf23dx51j2cogxblodg',
                startTimeAt: '2020-07-21 21:42:36',
                direction: '2wxrxjd5bnnrtprlqecr',
                errorCategory: 'qn0sxu7shlu1e76ae11iz0cecizjzjro87gs6p0hoa5cpep22382bjgwime4htcupqrzsv55l2l4gzoy9i9zo8j79i1bonfib3lcjgrotno4rbcsjecc0mzx7dovn9ajwtv8zwdt3f4t2cinj8hi7mhu5lvl3jh9',
                errorCode: 'rastpcf2c3vilrnnw1g8',
                errorLabel: 'wz5dyyq2owsjxbxgr2co3weil0432rieuiq8b8z7b4kz0fjlp99vj701pubuplvrh8bn7vzxhas9k3qaiyxsu9oqz1l6xgj3icb1nhtw869okgylkwpemkloiyt6w78ee7smok2zl232nybd8p3lwysx8vv769s5',
                node: 9510089274,
                protocol: 'ernotxuvqbhugu9zp0ko',
                qualityOfService: 'jb65pravz9x9s5278qjs',
                receiverParty: 'o6t7bz9zypgfaz4upeghxgtb2hwoaa6f45253btffw4siqsy11ev48g534u1o8snrisc41qhm1y2r8igrkzcipjhal9gk0syfv5c0a1916h4z04plqtgl3slesvr0176puavahg994ew4zqh028uhcnt0x3aswtp',
                receiverComponent: 'wgb1p7gop5denlqxqwxf97icyvjagm2rpf0j4g4pq7wbdvkwm6x79u8gfj0hcrbgwf3cgajq9l1me1mhog4h89uzkagd7ei3gfaslmuwhb85d022mqt1am4mzdpaela139x3dacj9jxbz7jeaqbvtes4l7z3syxc',
                receiverInterface: 'ga4qi462stekjmwthupe4trx1481zzjroayizrn2qpddcyswo79xp4y8rwfai4yso5xs1edvmsuzmzrf3sx3ix1x1781q01k4ka8oiczr15dyhu5f4s8vae33rbtx0irz000hqflp6ihoavrhk4a3egyi7vtcl97',
                receiverInterfaceNamespace: 'rwvfx2ad95nnp9x9w8ureu9ka34c553q29dxv9sl1tfzi0aulucr0te5rq05gojmwdhl1j44rdsoprqx83sm23h4dt04xdwy4yi8tvuc1xfjr8bzdql2o4v9qe7iyoop3pccq0lfhgtemhnsvxgobm228slbiys1',
                retries: 5346990923,
                size: 1843355842,
                timesFailed: 8115583639,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailStatus property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: 'nwum812i976q5ap7zs4s',
                scenario: 'mk7w1r4dttfp110wdiclaa3orx1i10rdu7cydml7zlli8p0u7qcmowz5qp1g',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 18:12:57',
                executionMonitoringStartAt: '2020-07-21 03:33:37',
                executionMonitoringEndAt: '2020-07-21 09:25:18',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: 'sbdpk3wuxpjwdf5g5nuwdswv9qwp68gr5re6hen50d39p3a3zcyyo19ii7792h60qvjc15nzm2ni192sertrk30gc2c0usksdcy72ln0lobf6hr02du071mnn9al3r6x2r5uegy2c6stvjiibhpcupui55itt072',
                flowComponent: 'qrw7ipm4srd4z67yyxqmzj3jmdorwa27yuctuy84ormijkwlpw9njzejytk1ls87ky7ngydra1k1jiaxj5pkxqiec1u8ab9rbyyg68vmx5vgmu1o3lfx9bighrip5372z085lraxi43pts6e7vhuviysu9mnmzot',
                flowInterfaceName: '72798510yld78ijfdoy5wxhcl52qx5qzm02nbuon4gnwa2wr5vkdw4dyorcy25gkq72iowbz6asajwxw3e7tdwcn3egv2nltozxu58oswqk9lykvb4wqx8ftow5ywhjgi05fgkdq2d6lxw6qdgmv28xnii8eexno',
                flowInterfaceNamespace: 't0dqv5qxz74pc1aayagxjve5ls0dj6sss9hf2dkwp7obxmul2h2zvc9bqyhwk4r59fgy6y6orn4fytq227k0n28fo3nkejkcjjf797on5eawp1l5xupirn2dcng9i95pm9ovwcg6z7p5i1tkvk32obiufykfl7v2',
                
                detail: 'Ut illum quasi. Perspiciatis cumque recusandae. Aut error quia.',
                example: 'cfjna2bnh8v1ziqc5kd5tsahmbm4k27hk5tly90u8n2o9lnbi5itjwh370k7yrm946x6rrq66wq9hp31skkt438ueqc3ydlmot2p5p42829d1ulptpkss6t19mv993fjlwod2pluacyvrwa9bp1q9u1qkl20zhuw',
                startTimeAt: '2020-07-21 13:38:41',
                direction: 'f0avzizuleqh4j0rz8d0',
                errorCategory: 'ey5khjvxtq2utsml8bdkxsyuu9sd1szq777ba9etm4vwgrvrnv9crsbkyqwcx0zroxhaw5tmx8ifhndhnvzx8ps9jqcg9lxkja792ljdlff8o7vdngjgfyjxd3mxsmvi234pu71bjai9xnbo778sna410pmv3nxw',
                errorCode: 'ff6jkzb01jgnnk09dwyr',
                errorLabel: '54myyykbxghezb7jf47wk5mq7ks2mocw79spsh7tjtdtihd1qwzd4uh0eanhdora7erxcn481f2y2ypdymb026k4rt91d6f2pd3p4rjbupyc13s01tpfv36ubs414lprma2skagiavn1aexbb51bo1q7sk3qv62f',
                node: 8960913470,
                protocol: 'm8tij5b7y4jg50udeo9z',
                qualityOfService: 'ilr27qh4fed70gnnhd02',
                receiverParty: 'b394purlhnrwqvz2i4nzh7osaliebyf9ruqc4b2tkb73i3moh7149gbuhn8a4gbw8kxr33zp04ativefu7kk44oxhuxty4v5ykf1jxlx3f47vc39uz97ue5ny088qifk02eqx57s9iqefnu8s650cw62jnwygonc',
                receiverComponent: 'd8cty9dh2f7vzom2hqsi6luqr9c5giyzj2arzhivzkrefslf6rnhdtppj3lzzbeyanqbl1kocatl3ggm9cvd53qxo0g4zmb8tvav9qhnzqp46zdhei1sdg481ur2s17gzzg2jrh9h5phliusie2aoz0i9snukpi9',
                receiverInterface: 'mlus9m513ggn11zkvp6ykdro25zw4j0xfi3wti56rxo5xxacri1ts252wnit6dtbkxokigczhz7uaguf0oujsxhfb8sxhlg2fbnr8aiw4sxqkb5fm9nqmcsklz5doixjdv22bwgnfarph8ze2yf77whta4wrqfub',
                receiverInterfaceNamespace: 'zy9dn4fvakbtfdxhhr9sj18ftc854f6wdidy3uv4dp4ldmsnvtbsgeeq4cpi6k4w490ob6vyw5u6sihh4zhpcx4xdi3fgrtx4ki4gfy6op6bwwd6q2zku8kab67wtzsb3lzpj8y0ek1eywf13m0ctzj86uhx8j08',
                retries: 6993760543,
                size: 7494808132,
                timesFailed: 5625357402,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'no00sqiqshv2nsn9yr19rzjygwf32qvrx366b',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: 'svy6y3w7xfg2dbgymzgl',
                scenario: '9h40pikv6b73288042i3h4wa8gb27l9yfrvo3i7gsshp62zo8k5tte76rrxx',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 12:49:55',
                executionMonitoringStartAt: '2020-07-21 15:21:18',
                executionMonitoringEndAt: '2020-07-21 04:37:52',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: '5tyohccf48thvbu9qtbur2d13w3ndgp2yb1cfbnw1rpqrbw9osz0zk8nj9dgrlwgt582m2glwsu2n97be6itrifhebwzetgwhxgqdtn6vb6zwm0im4z6yaurispaexglqha7e2aot0uydx2tjeasoiea3mm4qrx4',
                flowComponent: '8b6j4pb9ojcq8p9ij2xudf2xm8hqjxp1c8lgsorjz68y0vm6u22x71p9mhx6o44dnj9r5papu3qacdgy2kdn61o9ryqo9cegm7bawctb6o8ztybql5hfh2kq4n7hb8uh5xm56aldo2kbijo8sb2ez54qlkn4gkym',
                flowInterfaceName: '3qotu3e9lblbjwf2iiyvisrzgesgfoceanqjv47hlpywfxwngeaequ3sb3wrj65o8wephbief4o94213e5ez5jdw97e5e0fa4vbba1emjj0597zl9m4cqdh3i9xoan2znc1gobrbfge43du1csg3vagv5ypi7zg3',
                flowInterfaceNamespace: 'h9fekhe460bjcehx14j4t66bydothf19xtgpsalbksn7umjxsggrbk9ihkiewp6jjyq2o6dgkndfm7egetfwq4tgo5gda054db5tqqwhc5vh69r97gcqp7juvs2577j5gs4spoiemqxn37dyst1t1p1mn85grnw7',
                status: 'DELIVERING',
                detail: 'Omnis vel voluptatem voluptate nostrum doloremque pariatur est. Illo eaque libero qui est voluptatibus amet sint nulla et. Animi et laudantium rerum enim itaque. Asperiores sed ut cum et et illum.',
                example: 'l17k1yke1keaw9xk42wofjp5h453grzvf5gqw8g75fophvs77uxahkrefjl2dr3qt0kw07v28natrmdc3pdtan1er4bgesr5tnx9j9w59mpzrk3yrtb4yy4n0ypalgk2xdvycvw086ns1pr34i1b5a033zvp4z13',
                startTimeAt: '2020-07-21 15:35:37',
                direction: '1ng0x6cx515y52i987ja',
                errorCategory: 'ot1ihsqp0k81ifo13ke07mha4wq8ho5jkoxrprvrb5o9fx54550d09pz9gq2y2e1mkw77hnlcquiox8upucng5q0pbj9fppibl6uaz4jgdw91qt20cxg56h1sf5zoszhwxzu947j8uxzdny2hul0pd030r6ybsht',
                errorCode: 'yvl0ybitf3n2nt6csjs1',
                errorLabel: 'su0r50bysfx8qch0kz5c0tvy4dmy7datbub91mdzkwutk08n1tp4jvhy4zx3hton3daa5awb1ldr9ffn1h9ut7zhlvpjz51s49sattw4h5xng7p14gbbmtun6ziq9kgjx9ffy7nfjx2gvfz3hktxhn0843kutlf6',
                node: 5345381535,
                protocol: '2ayfiowh0h60zikhi97g',
                qualityOfService: 'fhekmro1k8rjezjrntdo',
                receiverParty: 'ud6m8ncggfyfo4bll8zl5fej0royqefnyxiin69piru5as7qd7oggwlrtqedw6mbzlso5z6w3vc4kp8u68rbeh8opmio0uqkuo08hgyij4yp0mfsrr4av10dqv3zn6ay6znpsohg86ijkt9tppxl1o8yi45qbv7a',
                receiverComponent: 'qvu71k3dvh8sf2cehowd2u9ofv23rg2rkfbu8jvg9mkfsyqz7dlxlqfb0fg36xxbwikev2wy2h28xfr3y5wfl67du7t40xakpv1kewjbod9wnuvvg228aooqeqgqapy217hqla0lhhitq252yr2baf65k77z8xj2',
                receiverInterface: '1im2c25wf45pptxsfbfwesbj6v5i6gnc68gzs1fxikfzel1ph2b825e7aqvc5rmruvg5b4ul1dycolk0kgv02xik1okio8s9742x1aijqgh2uhve3sokdy3b7ugmztsijnygqojr9f3qk41kxiwmgyt2omabpdx1',
                receiverInterfaceNamespace: '38vylau8ertykhaa7zixi60vzp3wa1w206ljeguitmrpqh3xa4rtthl0wbp6q2ihlt6ij2i25q3jrrjsv6x1kds627jfla3rhqnlg2glmw7tnegv4o1eptlsfvupvvjtlf7n95twlpz0y5h4nfvsha0le4zi05q2',
                retries: 2804956867,
                size: 5952648269,
                timesFailed: 4120997922,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'dpy4g7p46m3g6sqdh3cno4zpqdb0rcq92o2b9',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: 'r33olxchy0hydy55p6rz',
                scenario: '7jccakdmlg2ozxx0bl6hg0olca0tr7xar9i5y4twjdjsezfyljf0szg6f1mb',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 23:58:52',
                executionMonitoringStartAt: '2020-07-21 23:12:55',
                executionMonitoringEndAt: '2020-07-21 10:49:02',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: 'te5ba8omgydp18o8jmyz6b2johrwfhxdvmjewf1fo10marpa4920rw0irywsa2bab03oq02xfq3yx9ivjlna94tz9et9m6sphjnvo9xbgmgsk76zv8lbonbyapv480uv2bcnofcuk15q1ixxt6d9q9ytkg3ipsum',
                flowComponent: 'vh6wp6as8yy1sjp31m9etakwo1cb8y7ehyv9hmpnue3l4dxq3omy0cdz57f0vtq8wiuz536s1nsufudkn7c6epo183a3ytrlahetzks7gp5sj48rkuep5ggs41voc8tx91bjest3ej1p1whn9c33hufwkrkji53d',
                flowInterfaceName: 't55iiinijxxzuzhebvi62jyxjio6x8oghiiur097otxtsidxlf91ocn701n3eby9bjbvesc69otm0sphlp1m9rk8m9j9paf5taf7yy5xdpzez1otre1tlvkjn0fr3qe3lv2241770yudfxe0ylw5zu16ejoqz0wm',
                flowInterfaceNamespace: 's04mszrvxgkvv6hb02mbgef560cfyqnh5219pc0xrgn0k7x6p56225f5macaowxowtmh2z82elsug2fs4xrjdjxgyfp17oi96gf63vjiuc8pocwrn7d2dyar9whp31k3a12h55rfiecon4h3zhqr1lfgg8aczswk',
                status: 'DELIVERING',
                detail: 'Aut numquam mollitia ut est. Culpa eos quasi totam. Voluptatibus in perspiciatis facere eos vitae. Eaque illo reprehenderit eum aliquam amet eaque. Enim laboriosam tempore rerum est maxime impedit dolores non.',
                example: '8lavmoti1m8jdjsrydub1ky4zr57vzf1e62ozww2w9mdum7g789s9k1lgdfeg16fxfqtkxj1teoaj4hizdnsv003k6ewyw3jby0zc3husqdd4j3pwky5evr7z768e283a06d19f6bdylhavs99s0qhmgpi7fhv3h',
                startTimeAt: '2020-07-21 02:12:44',
                direction: '7q1oj6m6pxfmt8ep4ati',
                errorCategory: 'wxbv2uy3yds7y1lpew5n2xq1itabwopz1is8sqywmb2buymg7ondhrakvizyehh4wy667aug2xv0tt43haxq87spkc5mipad73ueahplzt8h1kuguxi8x6wcmdbho0iag6bqjkqjr644zngkxklsicw9c8jq3v7x',
                errorCode: 'cxzl1dtn6s9dp4cv984z',
                errorLabel: '7u3n60cq40qd49uy4ja4fb6psh7oefa431dhe88u9ubxs7zbmkmiw1vqxtxxh15g44peq0zzvtw8k28da62b5nyocvc9j5ig4uf0t88t8wwfkq1yescoc9fhc9muecn5kshm7nuf5vb21ogl4h31im8s8dvbr8jq',
                node: 9327641347,
                protocol: 't3ng00hpldg5r5rnz2gt',
                qualityOfService: 'bq178zd7ixts22a4m9sx',
                receiverParty: 'vyhr0c48l36quxh7e116ejvyjxzdqrceo8uyjx9d2p5shi60gbyovj1og2j49iwupuisdlmtwuwgvscyurl84au4cvmee9b9g8o51qljl09bb0yvqe6cw0sroftekc2fpn8ouv4tak59h4x7hu1wzqwzvuhfgw47',
                receiverComponent: 'hb2f398sltk1xjb1nw4bxpdww16a8w8qve19ir54razk6voas0wikppij7ulhiwjzsuj3l8yatr7ux6cmrybk1chc230k22xvgvqr1jv3oulj5fhlxpa62r3fd7a8oslg9w55zzenr3363jiltqtrveokuc2kp3y',
                receiverInterface: '2l8s1qpza0dud7sizbhi6982v8u1am1p6oslz20bbslvq5ysvfrn3d6modt3owqs6ez6w8s0s6hmuyllz5jrcf3dm1qgjuxi5vqkp6jsidxlfhrn3um3ljosft37af4srjjffc3yk2yu0ngd5i7557l2rmebajj7',
                receiverInterfaceNamespace: 'feuc1ythifrvmervw16kc7q7dd6242cdx0bkdzv7vocmjaonn80ok7ivuk2rnxrepnojcnpnf7v4pykkjn1eozd0bakpsk9fnhox6repom3so7pvdmv28n43vjl2lpybrni7610in403zet0qoth2pnw496x8gol',
                retries: 3483489333,
                size: 1661208210,
                timesFailed: 6697416384,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'r6ok5n4czqvksuz4q0doru3jvxxa0r9v8p1yu',
                systemName: 'irzk0u039dhz9l7kcguu',
                scenario: 'aljonsbs2k2oolteyte66ma7r2li3vpdb6zgh3637lq9vynre2879q3nisn1',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 12:32:55',
                executionMonitoringStartAt: '2020-07-21 10:04:43',
                executionMonitoringEndAt: '2020-07-22 00:39:26',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: 'u934kdiqso08kdcenicv46bwv2161z25z3tq83ynpku9ga3iuyt1jefqastbf68ur86ohpddze1r1feg7mxzazvp6fsjgf4ugshsi4yf59q9v4aifnjlh3qeh3lz9nu3f2v3n2yhnn2flhxb9vj7vlecwpmieloe',
                flowComponent: 'r8ijfa4l87n55fhvu3t709br6ijo4hgqbn87aj9rc3i5ylcdhdjjg9pfwoo1xcb3perh1svhgi1s2vdmzwzneq7j1omszgopsugaamdnicfqzt5dgpjqjom85syrwq6cguxrp3hn9l5e1hp0qnre1rsdwx49dfoy',
                flowInterfaceName: 'm4q76iyryqadovpp8753fjmlpdfkq48ls6uqedwuyejqrqr9mfqbz7yz0rkjo06orbs01ncmbaggtt3u250xqdo8e8f3t5oqb4d6ekv4jdan2koi5lfawxm4ttmfzckjlk1ekafmg0rj0vabfxg9wsxm53buadu8',
                flowInterfaceNamespace: 'r0mfgv9n2fgocv4v3vfgs6lwfi9mm7ascmvkl2seirxu9pu6rhnptbnzh6rr479gftmmonrd87aur8ks96kzr313zs9rdd1azru966wxkihpi6pux5qy2ew7v8fzx8b98xbuy2cjhunny61cs534vdvmjgvbu1x7',
                status: 'DELIVERING',
                detail: 'Alias sunt repudiandae mollitia dolor fugit incidunt. Illum debitis assumenda illo adipisci et corrupti in a. Dolores rerum sequi ut ipsa ullam aspernatur sit. Facere explicabo quis.',
                example: 's0wrm0r0dyv3pmkq0n436z7nqqrx6ez7n6lfujud25v3fc0ocgajdwhghu8ttf5pboe71o3k0hbvgf84116bz9kbesbroo4xirg2232q06s9fmdrnyaz0fmvqlcwnpq97z6ehbupxx6ozkklc61jmd7kjgt8qsym',
                startTimeAt: '2020-07-21 23:15:33',
                direction: 'gkudc4mlir9a7yjb0e9g',
                errorCategory: '62dr5zq4mbgm2c53ghmlasry8dkli26j35p81mgehl0m05kr9w6a61a939oj4grw1u5zlcxb4annnptuwrmt18wjoj58gfsvcgtuf5jw0qmetb44jcopeh3f4we6fzo9sekvlbiioy3hp3so07uipflj6hvulf3h',
                errorCode: 'qh3ia7buu9ha47doqh99',
                errorLabel: '5w8p3vm9xvm4hwnq8h24ktj2upr89v1c2yp0okq78gqlfyp7wqzf6scvavr3eusc709jv7q7hn5hazqc5043jijbcrv7p1fni9pod1z56f6754dry41tv56pm3v1g0st4xr7n5jtq8nulzq761344x5q0blnit03',
                node: 5985313930,
                protocol: 'l1dztnttix7fxivga2on',
                qualityOfService: 'ev75r4rkofizn6ob7oky',
                receiverParty: 'pl65phy7u69f6d7i4jz3y3opgk5qf0fr74tv6w3kqdzjgc7jf8v2d37jcaj2id6ynxumjeesekju3osdeaeevj27feeld40skek9ctcydtlntaix6j9u13ic2fjg1lm0uqsvt6b8rg3vhfh4lh0r26foxlgjc464',
                receiverComponent: 'i4vpihhmlu5g8fzzznecnmhddzq5axsbez8qzi7uqt2z9ela9grw63sflintga9ymghrplmpwdycgitycn428lxj1wnf8sgbyzt53nmwkp38lmautqrk0sfld31afqef03s2a0iuj6c451ae9gvk1m78v884zm4l',
                receiverInterface: 'kcylc430avlqnzca15ilm7tpq1vma3eqe4fiijre4r45no1dxa6ha430njg6omb6sklr2ofimdc622sb0b7074mzhymfj2iyfbu3esjldbkegby0ed1whpo9v62twm46296ifb0jftt0qeer4cusvps92xb659ns',
                receiverInterfaceNamespace: 'asgtemyw1b44rkbs75x4xfldki71pq6zui5660u34wmodi51xakm6lscd7ugc8nyheke6yay6qaoeu3cjbuc03wrgh16d8will64ien29vdfvaxuyl8fa27qvakney270w3zkzyieebu9vdhu6qdrbeaj8dy1n2z',
                retries: 8751932093,
                size: 1424801146,
                timesFailed: 3957966405,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: 'm2cei9l2l6luiv4toicq',
                scenario: 'ctwhrykinrp01liu1g5aujcyw0t5gr4r6nkh9iv46qa9fv2sgqe9c5dlet6y',
                executionId: 'nz3cp832r81h1oab0k373wtlywhao2nxgdxm7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 11:05:28',
                executionMonitoringStartAt: '2020-07-21 21:32:12',
                executionMonitoringEndAt: '2020-07-21 21:45:45',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: '8e1z30jjvlf3efcpq3vtfv203oqafqzxcc9k17x6ervy9m1a28b9u7xiixnz3brjql28zc39fv0rnha7ot0kk332rhsrc75nfa3td3aswmwc4k9zjmivq58pvo5dj671gwhptt669thhd6ser0bsq0f7pch0lcc1',
                flowComponent: 'ppcbjv6chewscvt67e3ljk49knen9mjzshr20mxr5q6tnizcx12d60yf07b16xh6qe2nec62urbbzkgs9gef3vab2gqn61h32br4rk4uqdl4gtvwqpxjj7b470y8y2bbim7gr5mf8y88ex53xg4lpjj79i49hg4v',
                flowInterfaceName: 'ae3sts9a3kb04fjf8ryle6pc85vaqypcdlg257l0gle9nap2rac9jxw03ljzw40bvipl2uv2meq6jllubkm78g9eyz8w28dmkkk8612pod6wmpo3poz8ouwhjq6b7isf7lopf911uczi2sqmpgf662drjh8rz5ey',
                flowInterfaceNamespace: 'mjoe56buqkk8m15opvwu3diylq719hn5a0064x96tjmxxsiw3vc59smdcb1uv54n73x5rizxsbk8s2ey3bwd2javqb77lkzi15arghqlm5ce3cifvxc9e12lq7dv3sbrt5u2sw270ttlc9e37gzpv57kj405c7ev',
                status: 'ERROR',
                detail: 'Quia inventore ab molestiae nisi. Modi numquam quia quaerat molestias odit deleniti ducimus quod. Quia eos et voluptatum qui sunt aliquid temporibus. Quod sunt dolorum omnis. Labore cum earum fugiat modi.',
                example: '35g29t42tjoara3xdqnie120akzxz70q6bfbaxl82rp5k2yolgl5pfaqocisxib9rtgkg84ebtxwthp8lwpiba44xzoogevlo3ojtwsrv1m86n6uzb0bai2abt0f7an360b5dfod4q8vie047s0j42bapjiwmk7p',
                startTimeAt: '2020-07-21 03:40:21',
                direction: '00rikv0tmd3815i7dsva',
                errorCategory: 'lil7b2uvfhb029u7er5ljshq3xhjdfacdmke3c7xl4gqamrqfmvwsxgw5lyd5vjzq04qqs2epxja7heinbr9fgwhjg9o5vdhcdllpaedwj36wm9hwu9hepm8mwqih6bwc7fksr6bsblk3mqczf9fz4ljenla0bya',
                errorCode: 'gz1jguln730zl7uv7y1z',
                errorLabel: 'tnwyxy0s89tj1ve56k9mr28rwi5kekjojdgp3lvntou9xmsw39uiujm3u58etligc6ver4zk3bvw5tnepy01qmte7q4um1akandlifdcaa6046lidtqpyt2ptnh7zraq8r6jp5u0u87tvjbuw6y7crp3rlq5f7g3',
                node: 5040578236,
                protocol: 'gsavjpqos5ase0jvkpld',
                qualityOfService: 'kmh6vp1lnob3gwlzwfnk',
                receiverParty: 'chrjj9apisdsegy6xn6hi0g8rpdqb465zwazmkc5ad2hoa0qibrchfe1hwbaijyeqy0snve0kfir6mzi2lqljupd0i6np9pfxrcahy3cx7kv1zkirqzwjedxe909zcoe63rov7shn0xg6rb387ste3hwklwqjicr',
                receiverComponent: 'omr3xwa4jkcqdwbaqcgu8m475nbusglep2422gl1o03uebdzmx7a4hg9tx9ab0ebvk9ao9kozrt141qytbtrvvyjjppdlakn9n1nsd1ky0c0i6nosbkkerk2htexgj66591b2cx8ticlcc7ukjip7sugiyzygclc',
                receiverInterface: 'v4j7esedsvhhagpmv8kcps1663l2omj4edhg5uhz144nmfwkc1k8byv8cc8imfj4pg469e9ax55dofkcmgh09blsmqmu2jah9dhoji0clv8ue3n07pd61c1bvah6fh4axtz40duzoauo5fm0ac1o8c2h3cvtarrh',
                receiverInterfaceNamespace: 'aogapf5y186ez3dw3fun7xuamzwvjbn2c8zvzn7fa6je2o9kym96m5es4fwiisktu7ps89t2m3l5uo5k9lhhq5bfwsqcgu486dw4kxicc91vlfys37djvgp2102sq7tgzxibe0p07vek1j4181tbnpl62nxvuc2u',
                retries: 1521163011,
                size: 4075566950,
                timesFailed: 9351685086,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: 'nsbuslq2xhsjgkcel0y0',
                scenario: 'nyb5wjsmha8l36mtezlzczqa49nt69jvg16tt27vw0aclghnglh5y5dk8ki2',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 10:46:09',
                executionMonitoringStartAt: '2020-07-21 07:15:04',
                executionMonitoringEndAt: '2020-07-21 14:14:02',
                flowId: '35tvv54yigqpsnf1mlzbedm0femc0f2prurpz',
                flowParty: 'wqseoaxscgi6jkqx4jl64gfwpbefzezj1bnd8x3q64o9030tkut9jyn3hk1scnl2vx3f6pxrxi870juk2mh50co2k6i2adt4u8vkkfr2djmtywmeyguohdrobrmg8oztr53p6iu5imz6my78xmiduqyrlpvmxmqq',
                flowComponent: 'ltmjpf1irl7yw3ofx78fu5foclvm783oreqg9z5b2pfwtu9kq00zq7e9eqndaz7svjxf66lyhlriuf3s7mneyseqrnpx5rdkr6gywgn8docb8eks3a9zclq0w91vnc7p1lruw7e93fd6tlnbe676p8c7lypeke78',
                flowInterfaceName: 'hxdsgukyajnh9n1csb4npeugug8wxpuycgg8fkp3g3ls127366o1xvalvar2v5oyx0he8ftoo4lycs4a2dv6zg3infpezgsx7dcpaabq0ko9w5lpyw4g1y4qt0gtmqrrm7p23csukvqqk61ko1x0hkdm255d3bdp',
                flowInterfaceNamespace: 'pnn1qut3pezklybi0nmut92q9yd5bj6haet51mr91iu2ozcuqkp2qgiibndswzqdrnr0xt179k00d2334hv49pfw19mevve81utb10w4gznzrb1z1o4kitrn3dr6dztk6m3ibmkx3yopqn6pr2a0zjtoldtlvdic',
                status: 'SUCCESS',
                detail: 'Et at libero sint sunt eum voluptatibus ipsam illum. Debitis distinctio occaecati unde qui accusamus blanditiis est optio. Veniam quam voluptatibus iure saepe quasi. Dolor saepe voluptatem voluptatem.',
                example: '9cmd4emzgkaoas0ijiex3m319ffoa4xwmo57gj7jjwze4dvlv1ji0q9kpf4xb47buxik2m370jcmnhh1vlvayv0hedrblsdljtq7mm2ti1md3sgzynk33vtscsuvgczqhjsay5ii7lb4umj3le19z2bnvttcsr0r',
                startTimeAt: '2020-07-21 09:15:39',
                direction: 'tr7fkwtk5ecw1pmz8dvt',
                errorCategory: 'y298p0jeabcpcebwdqk4chwpzmdvm7ce89dgydgyon6x41aicksp3ir1w5g8e5y6hg2wcyteo69inbppw7f2ffmmozmhw6jskitiuuyqu3gd0svg5r2dunjbkc194o758ncv216fejqym87sjefywpeubzfgseia',
                errorCode: 'b6vkkcv0psuzcahr5nao',
                errorLabel: 'b5tbs9xa59ne2uofv4mujeh9y2trkd9eukgsns4yzpk85qwfoaq5hymjlgx1iyp1b75e5nb3jqc4iz708g0ebq7gtwcgi1f7x0d7qe1br1u7ntg9fkx1osh7xg8tbvnphsikfl8qsbxhrev7erkzjaojt6183h5k',
                node: 9404813322,
                protocol: 'oe4paa0kt815lxo851db',
                qualityOfService: 'usggzi2v8tocbdwcehsf',
                receiverParty: 'sqw28rsjaxso97suitujm1t2hgmfkxkub7r9hko89j2j72vp3mqpcd72yc4yeuixajedmhy2rkps879hpga0xtbwsezikfmxhpfl3rooa402cswik8oi1z88uxwnlzawcycsrq2567ub973dbqmqu9d8kc9t9hav',
                receiverComponent: 'iloxgu0k2wh3ihmutni17btzlul76l9h3y2mtt21zxvz7cxoopgrt0ex7t0w5z7dwr7g55x4g5cdjd108lpzmcv2qvtflsigtykke0gl3ltiwaobv0pzhocn18hzz9npsdvwurygw05ii1lwyz3vbtueisqc002q',
                receiverInterface: 'l5y4fpskwsx4vtflhi22p956h3bsy1411d035egc17gf3weoo6bogo9v18k6d3s27pl8vdqptqy8tvxqcag0wuu5kfddep6xkueramwxos0e9agrtbnwuz3zskoqw8lozb64eho1cm52cd32w9xbd04mqgitknsm',
                receiverInterfaceNamespace: '3nrwgu19q0a1z3rcyt8ncyugohi4v7g9x4cjry9refk9w3e1zxi1k9oilv6gqkydo6r7c3c54heh4749h6zk6dv5eaom3rojh7cxnpnixfvsr8cynq0m0n809arfmhtd68npxoxkvpl9tue1orbff6qzd804yl0x',
                retries: 3940453635,
                size: 9564986798,
                timesFailed: 3698681989,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: 'aodbbdircqck8kjhh2bks',
                scenario: '0f4m3thy1hmlttag3t7jpxpg2b8sneycysf6509atj0579t1x751qlr9f58g',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 06:33:20',
                executionMonitoringStartAt: '2020-07-21 17:15:39',
                executionMonitoringEndAt: '2020-07-21 11:10:22',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: 'l7dmyxgp0ie4t3oiog0q7dr5hmg77ok7rb0x6fc7fgrxopble82jvxdi932s41no3bieo9za8dp65e4jq1pxu3p99tykm70ui0q9q4mhusa8lt7t8brdpuekwb5mxb21ftgw3cete4h07hynh8tmp2gzip59yyho',
                flowComponent: 'zf8z6k1eu14zkz0hct7f5iqh1x7mbcgk95qaytgextynb9fpoixe5e0thblgytbnvnh0uf41agj6c3cl4hqe78otpd72dq9ig5fvd1le34blyjzeyul3751puu1ikdclchyrq11gpzqxo5l1br0st08k4s8yg6xj',
                flowInterfaceName: '3l9jfqq548se3mkannt7b6gmfjw27tsamyw0h404gp6w0upvudljo8hh3726866lf10v2wb4bjr6nejpbcx9bwmu1gvsv3k8r2qz7lwessnnbb57kpqx1oq34gackmq3gv2wmcap6cu05nrn3ehar2hbilcxi1iu',
                flowInterfaceNamespace: '1r2zlv0g5efd5hbp1xp0rx2vhzxcw2upbk8vx9ykas6xmt9fz3k44ghcd1j5aytocapfro9vyjcwkbr62n2lo5qxqbbcrt6i3wmsbkd08bjaf1wxnc0noyz78b38iyur1jjp8odnheeg4kwwyi0ib7b0esl5qu0h',
                status: 'SUCCESS',
                detail: 'In sint mollitia ea dolorem non non in. Cumque debitis enim ea. Maiores ex fugiat placeat deleniti sit nihil.',
                example: '233wdx55zbjaxmtl87bf5qsj79xuupkj8g9426fgu945713s4tg86qjj459wcikzm2d4o375wzmw1m2iiso4z61khbas93hy1qm9kupzytq4grzvpu7qzpzqqkj4ax8i1z03e7p48e223iqz325lnb6o7u8aakcl',
                startTimeAt: '2020-07-21 08:40:28',
                direction: 'mmzjabuulz1zxq18o9zc',
                errorCategory: 'bf1b2aaloltuz1na9joddt9gt5yzqzyxjtn4aai9oaeozwjz4wnakhnjxzeiyf7xygijtb3u5my64wzz5lu6lqn80cs6xdnrab1yby4zr3tdpdfe13jsw2rd066zzveqa9udio5yakfsck5xd3fggv5j58f29kv3',
                errorCode: 'wid6offmebui19zfmfcd',
                errorLabel: '6os4de79sy3gfmswx9vjgpocgh9h40stz9eumgf5qrd2khvsnxevcw2wt31ir2ctg803d4azbjoinwdi6l9sbufb2e7eospvlbr4clqd17qpxb47d3qh497swl13wk34popsu27rg7m73s0g0bge0qkcms1vs0mo',
                node: 9199514772,
                protocol: '5b8jy1u0e2rctmct2az9',
                qualityOfService: '9pr5vqfqdymdgvh2k4iq',
                receiverParty: 'ph2pf3pl093i0lcw688blu4jfrzarke9zgsyfzxoee1vtd2bmlo7tiuu6orzypvy79ybzm1cszt9axey72ojr0drvw8ly3oa0jxjzsx2mjz8t32b4qpfsdkigje4tia8cyvbt2ubt4z75l3f7i1vd481kon5ul8t',
                receiverComponent: 'qny80fy4srtjmnwt1j5huq7jksvobdvn0bhi3d8s2nbnae87k705n06tlwzajvgytt2us7bhjc392kvtncle0i05oe7ujybxlxq8q8jui3c5o4f0i592u65ove503hqzz3d9u8gmd2bkkjic679vnyv2jzas4qoy',
                receiverInterface: 'x01lz20pgwslggxubm1ey0r5sjyj0oludvdo8crkr80a3ukt0puiwxhq8sm96ntf04fjr56qwulfpmwq9hhopkgwf8drkygwmik60uxf8fe3fo1e7m9h7oa1wej8phrwiwvsi4z2cwdpocvhabfliq7mi2tuti5n',
                receiverInterfaceNamespace: 'lyfa2hxluztawszegds9v3ocr5s0n55jrux8ih3jfhpztt3qv5q2hgwckgw3pgipz9nx0g53tvjo5j26pzflvilcjsvoni9wzlbhmhqs7fjigw6la5crtupgsjtl108v2pvp5wwmmm95f6dmnkdc966jz8vg6qmz',
                retries: 2428169426,
                size: 5735798656,
                timesFailed: 7560054627,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailScenario is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: 'rsk4xjq120ykds1upugc',
                scenario: 'z4237rp8y8e53saf3m8xaxnktmq8cc5omxcnu23b0xy8xbe6xt8j383le32h5',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 18:47:18',
                executionMonitoringStartAt: '2020-07-21 21:02:17',
                executionMonitoringEndAt: '2020-07-21 05:44:17',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: '9zyrdotinp5aw6tdhidu8bhare2i8jshze89xahk3yaqi3758xb4cbkbs15qj5240amot08b3vdgugblyk3ntjoaevspsnw8gibhd4771uxnnz4zmjdqksqzwtz9gliljwh5zmewxij3s2kr6wid8q9au68okpco',
                flowComponent: 'x9xei3r51vefmedb5xgj2j2va7fuifgci86kpcte0uoksir2sbyxmuwfr6bxq32ml2w7r17aiy0af8zvtg3xa69dr13sl3vfgj7vcbqa6hu8ozs7nfdxvruvz6at17zeeq0i2moh6972bti5bwttj984c2gydgyu',
                flowInterfaceName: 'otux4k9jkvra81z6ababxw3lwcwhfuzus8bev24hz0wsdfnxle6ccmbqukp3lxy1o5ntno2r430h3owxic2bd853ydvvg7z89ylynvirgbapsqxq6zlpnceexhpsegrvxq8gxsnqgeionze4sxyxwudpv2ul2wuh',
                flowInterfaceNamespace: '29noywq7uphcusszvwpis1g8fl6w20y5fiaycz0809ve4gjwoami5jdsgbbijo6z7rs57p3nbduhnp15s9n28sdxwwtnlgckqonunuloh4r2wful908tchjqipq20khkat13prkrigphgjlz2te0atcrddji8txh',
                status: 'TO_BE_DELIVERED',
                detail: 'Dolores qui quia id fuga incidunt dignissimos voluptatem quisquam. Et sit sequi. Dolores quia sit cupiditate at repellat quibusdam.',
                example: '4xk48inlvnjcm5r8mnfzllxmzfg5mdwgjtv2xhi06aeru8orhlaw0ab1j2kyk4kkuxhuag3vu76boerkdhc8pvaz5cjimrin6msyy6bqvi19povzf5qg865dhj1oo6k66rfhhh50rhg0qtp0ll0ve0v79rxcay6l',
                startTimeAt: '2020-07-21 05:36:46',
                direction: 'jn8x6ai3a84eci0nrx2g',
                errorCategory: 'o7qxz8fquyclqpo83qwmkzicwsjp71c7pxlzmz60toxi8eclo0g244o58m0c651xeqestt8w6emssc731h3ww65qeiugfrh9eq71uhrk9mx08t9sr45fbc2nzifol5nb3stkpymd084pj2x543nd3pteux51up43',
                errorCode: 'lqeltqv7zxj2x6oh14x6',
                errorLabel: '0444uqzq3wn7ei0kb6xe6ekev5zw6azbhx8xdiiy4zu7npnwrxi11boah6d4o3f1jir1uf6x94mpsq41c3uz68u3ry52m79k4eddysziujf57zkpb83aun2c3115ie085950etm5smcirqf0pam3gwzq984mlb0w',
                node: 7184466600,
                protocol: 'b44j1imaqygtdwye5oa2',
                qualityOfService: 'k1o1nwpdvmpr4hctd1k6',
                receiverParty: 'j92j25vv3ez8t37rzicmo27fsuts5cyll49vgn23a77z5olapn36sbjtjxhf17n7rv1458d6fln4wpa052t26lwablixl7oyrk24qg0w61d2pm9gqgdg4urt49u0wgpdp6m7kj4dgcqwrz4jg4p5bo3aa79mbfpo',
                receiverComponent: 'e73m3bhwce9g7uy13h28uzxeykl646unnithxqk2cyyf3l5u3dtdlqag74oj4xt1mmdw5gkgrp1nb8fyk6h5fmc6ysdm7rnkoojdkhaqng6xbuvgba4ewsnef2uvpxztuqni4qh1lhkbb3jgd1zposfxa9nbjkw3',
                receiverInterface: 'qz36xwuzuo0n6xqtko8pubaax2gdp3doz7f1gkrv2up236jpg5txsjqtuhiq5dg7ww0ej60xn8o3n5mdk7bjufm0df59hptw011nwc02z8kfeyf9f0yc1ea8hfjbn5fg50j5efe150sf0wm75zk5p3czqagzx5vf',
                receiverInterfaceNamespace: '4668if5is42jc44gt0vwqti1etv1rrv2bzzbzczqtcgbxcnwcmmhg7914v48e6ori04pmrvas6jzfmqt4jqf6mu1zvytfbg4edmnaqeq2fs6x8qrcs3m4ztxajts3kmyp0nhmm97tvxpd1wznalzpedma54pd1hr',
                retries: 9587876829,
                size: 1621089411,
                timesFailed: 7717167997,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailScenario is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: 'berwfkeecqv3btkafxu3',
                scenario: '05y4lozzqck1ns2upm5kabvlk9tv4n3h5wafxtg37w93d6om54707i0g9lnb',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 15:49:48',
                executionMonitoringStartAt: '2020-07-21 05:18:15',
                executionMonitoringEndAt: '2020-07-21 23:08:35',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: 'gjehdp4n2zhr4s3t5kknpqopu6er0dokvrgpt62zeudn7a8tdat50ttubol9yffjhhcn1uvj7sdq79zr6rtcuz5vnsy1tkxwxarnv0ta2bcfaut80ebnavacfhon7djvt40h6pp2oc3v1yjfvdfq9afgr95bso82s',
                flowComponent: '8hg166oraf21izy82ou1wgh22ayy71aepf6o1k6w7oxwukq0xha0govdgu9yosuwue1lxxf25dg2ucoegx03oj5he500gkbq9z7lsw4iio04lcqzd6gvb6omi5ohun62b1lwzrpjw45q19f2mdwbwkytlai8aj6k',
                flowInterfaceName: '1aut50momzynkoo68vn2qbbf7rerg5pno01976t0zgkfn3iktpjml8sshcsg8ecoqusa3yb8gg5yga3emqqce8ho8yxegty0wej4szfvf9pw8yauht8uaqvjgz0hwv3xwwmykd7dw3kxavkyb30w41a1d5y53xk1',
                flowInterfaceNamespace: '4ydkooyvjaxufal2tbjbqfrbtm2xcdidvkot0fl4xu43d1w4kdc6xwzf5doaxuhqgx4ei6bk5xqxldt7awxdav9f94fia25yclsxx7iihal30n5j43u691fpgkyop3b2y7kp257eylukljpedi1whwqw9b7jvkmk',
                status: 'ERROR',
                detail: 'Ex voluptas numquam pariatur aut rem tenetur aperiam perspiciatis voluptatem. Sit dolores deleniti accusantium ut possimus sunt praesentium culpa porro. Et nemo delectus aut deleniti. Minus cumque dolor eaque non atque dicta aut iste ipsam.',
                example: 'nq2kypchd4bo0l6n0ct06yzvgrrc11jjcl0ap4pu34w873w4rbx3ux2gmf1rmxlcfovfayftuf25rvle0wr2p0dvnmdkdluisjk1x956amjl7uil85o4osewe7rf1nqofs1e22lgqin3qsa7r2e8vtvycmaldmks',
                startTimeAt: '2020-07-22 00:33:53',
                direction: '1kl2a23uh3776sadkxu2',
                errorCategory: '207glxyr51mkwt7zx52uodq29bl1754htrvxhwirbljux9ew75ixbimyiyezg2yncp12p2orzzzauk6sk5ha5cppogmccc42r31clinsvf472a6uhrfxukx5z494nbs09v6pzl5x143bqxa2snhdvjuthcpjv6k4',
                errorCode: '76igwd918dnwgjyek3gy',
                errorLabel: 'vd0dnj5os0sl87jpexee6bas0hnbdz0cclxkkmuakrglr4uapui34ztiv28c4dobgbuqmwfcq9lj4oe45z189eqy4e5fqm64rzpgpo794izgwhe8vjpdkywfuv9rolt1qbkkeqf9jcwhngglrn0hutqu5ajmu74z',
                node: 8001946521,
                protocol: 's0gpp0ucjedhiu2uqx94',
                qualityOfService: '5fcwh2d345w2e2g886d6',
                receiverParty: 'es5hs2do281h9cou032inraljbze5ajcm5s0e0trfe13tkexe06ynwepb74hiz1rh7t809bx4mzmg5qx0dmk2lpj8l9ry8z4eb4hid2fo4midnxb3wlkha04o1thozpxxgstyg2ru8j41tasz3knv9zklcv1rf9j',
                receiverComponent: 'vd7tr6x2eelhdpe5ilg450sghnv6zfg3g02zxtp2265hu9b8p6k8yqhw11fjt1m4q7aj08c46r5oct2w5nrairnnwzfkcczqdw92vqqwt5ouk8djs5vm7e26xd0iiq2a1v6lkfjqmt78neycgykbgexp91kf5uqd',
                receiverInterface: '4da80x6sc97s6wa7nru46qt9h362ubxr5s23mxxefi7nsgp89ma1ibhjlbs7etg6lec73g2qv9ev6l0aifc45fl8e7z8iqc8g7lqvwkkv08iwp1p5rnvhh0unp74i6aw23sxal3pt6usjxg6sw6xy2abdf4afrai',
                receiverInterfaceNamespace: '2uu3cnk2nsmiq4nd6pls2d8pxrmpmo16l50oj8k1jjan86tqkh8iot9y5rhog4cvn0ligaa1wdj540adqcmsiox40m7xpchq8058c0k6sn2hhmdsxjqexd5mo89pjrq6423ud79oizebl0vjttvj4vukfuhqxsp6',
                retries: 1992031250,
                size: 5340762214,
                timesFailed: 7229229633,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: 'ikg08pvffm5zmtksoi5q',
                scenario: 'hx0l09ovexlvrmdx1ivjb7c4ws1d6v61ho2way1dw6h7ejyw5rq0j4vh070d',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 12:05:02',
                executionMonitoringStartAt: '2020-07-21 20:40:55',
                executionMonitoringEndAt: '2020-07-21 04:37:49',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: '5afl6mcp7126zebd74a1fvolh219wap5i15x75uim61tspbl1rf9hoj4cex854xawtxh43sxz4zes08uw6ohun1nc0xbdw8flkylzd3w4u1kq119r2aa0zsuy1ao3p5wzsbb8vdthfnz8i4a8o17m6yp3us7den5',
                flowComponent: 'tkaxqa9bfw20j20ye0f1epd8gbbs2ebz541rv4a86hndtcjetja2bo6iyfelii0y3ksv5f2pwgtlrpvcjhe9dxmv9s4qzag3qo40e0m1w2ev2hnf4f5cu5gfgmm8qk7hlniplc87805uiis4uapyr6weoqhvc1su9',
                flowInterfaceName: 'flb9fgrsklorha77dz0r1nja4e2pj8yuu7ur3r7h88ow8wpwwlavhi8kybjsufbw8n9hcmpuhzqmepvavucyddk3t8v3jchebnp6bh0h4ptab6p3ez7pcxmrmnp6rw70se2ln1dqp54zjcaoa6ydqcf2v88wrsk3',
                flowInterfaceNamespace: 'ycmjm10vrazx89yj9dqhvnj0si38kaqxf14jojuqmqebxsccbv8diq2124dz985iog5mrvdjw3wqckplbxkbqxf97hvx9t2fcvbw8h0vrzh23x2l5ndmxcor8l6hyf50ky8uhxs8mlaecul0v719fupy3nke9z53',
                status: 'WAITING',
                detail: 'Animi cupiditate sed et perspiciatis cupiditate dolores error. Et corrupti hic reprehenderit voluptas reiciendis error eveniet voluptatibus consequuntur. Dolorem modi fugit nam. Inventore debitis natus dolorem cumque.',
                example: 'mygc93i7xli4e263vw411bb1rr5ln88sme2a5y5i5xu46qxo9rybutddgpps5nvxbx4k4965algpzxnrybfpjlq1fxbk4ten2251xzgp9bv54ddo6ts8uh9sh7jnbdx2o4vfphhwdupu9l3nyllw3js9vmrt58z5',
                startTimeAt: '2020-07-21 09:31:04',
                direction: 'rcy5q25a4pp1jxj3inv0',
                errorCategory: 'kridl2rupstzgf5o8cc9s9mclrmr367irtygx1p3y2m1jytz4badr72porj4sb51wa1o8wenm2t9ls2p0oaba4u3gm8f6uodyet3d24hn7tkrrhq05n7eakcl73roen2mhg8vov4qyb8fg8ffgg2tvos7xh89w6y',
                errorCode: 's3hjbiil7s8f7pm4n552',
                errorLabel: '7v496al9bjji6p6z5mtipatgnr1xptyi2x9utv0bgvyw2b1yef6elinl12mqae3kivueaqqyoo90wf9kj4en06hecpkb4yeyi6dyo9jnc7rz2jcxdmzylmerm2p52xea9myj3m68sf650whlyrbj3wqg3cgquo13',
                node: 5901066642,
                protocol: 'zqlc0nsru171wb2yucdd',
                qualityOfService: 'uizjdn2soa9xcr3t1trv',
                receiverParty: '0fqpypppwir4mrl5p590lb9v3b2pp7k1cks2euarwkz2hk2d21lnmlwzbkdmxsx9403oi9p93xkpizjjhanb0avki62sc1jk71wdpfuckwje74b4ycvcbg14ilsj45t5btxhg7g11m9bzbqjbm7yu40pjgh84l21',
                receiverComponent: 'tjb84mla3mkj0761gq75docn4ohec23u69jb91buyl3iufpl3ienx3c0epgpeqava7sx5gnt4sz793upnvitmtevtaxq69h82rstobfcu87m4ey5dwyyb9mcbghprm7wiebrmdjpuurmsmgqt0vmiz7jpzkr0rja',
                receiverInterface: 'n8jq5i29hfx4v8oxts65x7sezldbbp9uiurg6jsn19l7l2pf871l56hg5ek2pehlmkj31sma3nx3b3fzjbhaupjjzeqz6ejtaxhfy947snlrh9owrebkh31g4i388ka5j5eixegv2wfipt96n6icwyjokyutxfw5',
                receiverInterfaceNamespace: 'ciqbl4z4ud11z3qhngv6u8ry3m9pl128msgmjlk60fuoa8at3dh7tew67062ruxstiznyh1somwbewlaoaan3pkbpnr3gbpq1ld04b9m6ll1w69kylf308tw06c9849ntdiy75k608rl494y4z254snn4vzpt70k',
                retries: 9142950583,
                size: 3329185443,
                timesFailed: 7785354083,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: '7y4ah6w2c5phmgota3zh',
                scenario: 'jo6fdz230jfldtjbfwp5g3uuxxq6tdmlqy746jnl1lz31em2qudbcmhbyxae',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 13:43:47',
                executionMonitoringStartAt: '2020-07-21 08:36:47',
                executionMonitoringEndAt: '2020-07-21 23:15:38',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: 'm4yle398cx4boy6ywucyv6naecyp0vc8btg75693v0cteni30zqbz7oigr9u7fpa56kkmfbe84jpdh9hn8f3b10cp38ma003by6ne0ignp7uxfa4ot4ybatl2zbs137a77bfppwuk4tc8marqo6r0scoiziungdg',
                flowComponent: 'swchdgacqp7glruc08z7rh3he1lewcqwpmhb69uyz7z2r58e4e6de3ff6zs9nzrck8r9u5dxwr6fi5zdykoqio56i66htc55f5torszzk724hmodcii4oydn8i6ibfppm299ox6uuaalwjv0611n4e41ntqzcizs',
                flowInterfaceName: '0bltzt4yzauj4i3wtrnjzpb8y67w702wybdp8qavbh7m70aojdgxzbyj9j7z8cu2b5j838fpp938fanuhqwbxhzol9nkq46u8zhbevxrsx9c0smcpay6ndk8fyyy783xfqyihm1wt4ov17biboebx0uzaxyyjl3cw',
                flowInterfaceNamespace: 'mlblzqbptjmv0aj33lbzmpokfqescsijuqp4xvi3814ya2nfwvekgg4ufp7ku8zaqbdbbr78q8cpfd733t1194mipjcu527as4p5ga9icwe0110tdosbmpazoohmde4v4z3f7u4dkh1582bnmi2igo14mq03ijb4',
                status: 'CANCELLED',
                detail: 'Enim porro deleniti. Magnam ipsa ipsa tempore laborum nobis dolorem voluptatem. Necessitatibus deleniti porro animi ducimus. Et accusantium a velit eligendi.',
                example: 'ldnetfqipzmromy96yiwqv1a5yse9ed83fd2ecfvv4zinsxl2dsvtnokaefrw0rcws7ukkovlqt5pwn5xzb652odfbex8x4y21k0lv5ke6atbfzyx808qivrw7hfuv8abkgvt09aiwtdzzh4qr11cd22ps0s7cox',
                startTimeAt: '2020-07-21 23:46:59',
                direction: 'zicbsv9ibafe3og9bhu1',
                errorCategory: '3g1n5xieiq0w3xjc2ibtz47kx2wcadfgzgnkfbk1zvdyxmndj3imsl5bi1zg1pj22e9vk81u4xwfk2fi39yvbju2kh7i17ob83e88y83chkmbwf1itpns6zc1fdfu517p00guwbzb99iaxtb0cytilnhbfc4qu8b',
                errorCode: 'shmawj36l4mos48zs8c5',
                errorLabel: 's47fgvmndtajjet0vlk7eqd1t86giuktp03z68wszhakbfkjxcsymwc9s1k0dk9l152t4vgwjw7xg9env7kv8t2dhtq04070k8c8zdm1e58fu1z64fz6aworor39bnv0nacwx5sqcoljt2oclnzk4detclers6vl',
                node: 8072129143,
                protocol: 'wf5b65gsskw9xcttsd9z',
                qualityOfService: 'u55dhotofd6qwxd0knn2',
                receiverParty: 'x6r6qd0sa922wge28xrnh3g6h71cshih0yfcxwr74bms3nq9zhgbbzrkg7ou80wqlcy5xal7gs0kawz72qdvydxhoc4j98uspem50yfv7xgq060ubkx4vb4w4ebaeu2ldbux54u1i4s7p119fkmkiql1m9ganwmv',
                receiverComponent: 'fcovnoy3skyc618wvyf6t75t5igcl9puli1wz1umet96ri79i0o1we704vrt5rtslc16qc2v74x88gnblmgga5q7h84t3er51d1qi0lsv247vgctvmmimm57cczbb7i865s97si5mb4omi6r3c11t35si59iv67j',
                receiverInterface: '9yg81urm36vlocbn1dy8bst7ctbtl6uehajxmz8f1obq1hjfwz4fg68phdbunwxirquvwvvt65eic3wqala1zhy5lj9v9ufbwwkhdwfki4qvxt6f5jrf8s1zadbi40aetiojf4qpmg7kq8tjhr9u0gdwc86o48pa',
                receiverInterfaceNamespace: 's3vku5878n8y1lhwnpkzq9xp743462hztb0yehi7fbaofwgq1vt6m9atmufykxcal7mvocbe66f5hsg1t7k997ll3hjnn25ax4jfaoxjdi6e6nk77d62aa11g5no81ssxugsyb0u1nioiypt5lli45twtz7a5uvj',
                retries: 8579680931,
                size: 8535164959,
                timesFailed: 5674498639,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: 'g5j8mzu4bi3mr5gxrqir',
                scenario: '4dn6ub13pkppc63dwnnumi4k1qhfdmc7bkfj9645ffe5v7euna1s25758hs7',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 02:51:33',
                executionMonitoringStartAt: '2020-07-21 18:04:58',
                executionMonitoringEndAt: '2020-07-21 13:05:04',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: 'dplaxlukxyb6qefdjn5999tch7ln0lrcl78sv5t0pql3gu1d941gvzdwv9wsuth1vnkaj6lz16ui8kx98aeo282uknou7tnxrw6crzt9deeov2jl5lil6qpgfc3g2ax7f36927vx8kogagpw8hthbwmbbfex9ip4',
                flowComponent: 'mkgykqayol2axm9atn34y3klszzha7hwqgl606lz89mnmeiyif0s0v06alwwkgj4rg0u7gkevzfkbrrgo0jjxu5eu20y85dgoqxkgwpgrrjn9vqrn34fmz7h3mrbyru2qaux0f0orfe8e7wilhochiaxekhq20tj',
                flowInterfaceName: 'xbr5qyuu5i09y0tprhfgf41yiujzbizhg2l4xxygvpv48lfhyf5o7c0kcrm0sdi0oai1c2hs3q69oipg1judfxc8qtchjtlgd2kju7xcgy5vvp14tbjiwueeqnn44zqy3qfbg9i1ej8al2z89mhnxnmtgtl53uwq',
                flowInterfaceNamespace: 'ag9xdxysuoesvwefh8rouuttsv01i18m0bm0cvulnlj3mu9vjp1qmn2mmcwpq286218z4muzd4hk2yco4phiud0a6mj4pk29y764jd5hybd6bpwi277z2kdsbln2c85ypkac8vhobwefoad83l24nzq7kz3iod4co',
                status: 'SUCCESS',
                detail: 'Exercitationem odit perferendis rem sequi. Adipisci ad quis. Facere delectus officia eius debitis est reiciendis. Qui corporis vitae.',
                example: 'v6bcywiip7rxm4ng6uckzvvyzcupicwi0n2d9bk59beuwwjzsgahyugdweg7vsn5ohohmk7tfpkmgygz239j3nfxtvx08shnsrniuwwriciiinioiibt3zcqcdlwif425l96h7emuqxgt7svosw8zjphkcaf2kkt',
                startTimeAt: '2020-07-21 19:59:45',
                direction: 'olz67sj8yeng2xtmq7rc',
                errorCategory: 'im186nwakla1xhozgahw9usikzd2lm1yddffmfobe2je50k9mwl9mxf9m3acb6acl46j7dh0efyse8mxsjr1mb5nhqwtymfbh7rxjko6f3g55equyolymg8opqrcukaprk1154u1dmwpnoya1v27547lx1n3phbc',
                errorCode: 'i15ixv71hgpk23vzvlhs',
                errorLabel: 'l7xewrbgt3298ezw15c5a3ujivwzqosgd4957mm5q5r8hpcszint7pewmfocyqvay1u4pl0twpzjfhcwirv4kuugdpv8teu5hw1aen2o83sq0k4p88u8cx5vhvw297mf27ts8f8p11c9cemwxm8unn7w6q69g1lw',
                node: 1168061381,
                protocol: 'b8zrtqsx6pqe6m9eajsp',
                qualityOfService: 'x0ktgw4i722koes4cgt1',
                receiverParty: '1hxzm0grhzy3rhaj0wnj2p8vzxs4jyqsk0djklvhubir6gjk8g7on2o9xcwt1zf149x44gjes708pv1tf1lxyhl637eqvjtejbb4enad2fwvkkyu72e4xjwx322vgpyk7a4uhie94f2auby5w1635lowdnajhbal',
                receiverComponent: '3hnxqypsx321ncsvbnxm6lbqdd7ubutkz63ykhildpblewgrxe3gcc641lt1f1igiweqiqdpc0zq3zzjdxy7a5e572hcz9mt68k6jptsdcwtuiynxe2q1zim1cihxvxg5ic3rcxk14khrsffkw63nluekelgd8dw',
                receiverInterface: 'wi335nx6vh8ici0eyxmqn5p9ukyb4ekprtqor2enzjiqn44rk2mfueozg4ckzblwb43bdo2wbtlykfjfycrcakkmg9tpsj0w8y84ctfyas28iym55uggf6hqd8yjrtptf64xfs8dwqwmf400zcwrge758yswsopa',
                receiverInterfaceNamespace: 'y84ht66b9wcxqrb7naw1uyw5dsn2r0dgl9aqh4jqzhst6hd2sfdqdb1fl1rb2xbsvezeuffu9dl82wv7tu1o54bn54qe1idehmnzse5hkpk55jsdgmqsaly15hih38i5h2irgz3r0bnjc8fpyqtxylap90riez00',
                retries: 6164742528,
                size: 9215359983,
                timesFailed: 2796791737,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExample is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: 'ch96pwyhkhz1markuttu',
                scenario: 'pb77nc9cnd0d6x8iqe6se621w7jkd2bhj0ipf7ncxzph7vifmp9n8e8j3osz',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 09:36:28',
                executionMonitoringStartAt: '2020-07-21 12:54:29',
                executionMonitoringEndAt: '2020-07-21 14:48:20',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: '358aaqpwmiamcobrv2xgumoc9i40zwoa07sbpflzqkd1f01dn6ytvcpyt2snmqf4zqgryztt5823hqieyaxaiyxcglfdabs480fbs6njnvdc4nmdj08az5ymv4tctxunrmryans7cbkgffi83woxmhmkuwwp97gb',
                flowComponent: 'zo7hpxipm5lo4soednx8sasy7dib0weixcxdvcxm4wri8r7tchv95zr7186xwzh92qgcxyebjtdcy5lt41um7zto30nefzoi36m60zw2p7rkubhh0yzd8g965uachkanuee5ksmkmdxa1nnawbt75u3chgq0dzsm',
                flowInterfaceName: 'titkwe5wyg3otlygmsnrr2acw76ji2fmeoig20rqj574ewwmk2qrloogj0bc9nxosgnd8th7jwkb97205gzph98a4mh82l7ur5owl5nf4dbuqvman3kewggeegdaa34n408b5u8ayt6mwi9akgwgoeb9fsin8m1m',
                flowInterfaceNamespace: 'p8g0et53l55d35xwb02ed2eh5ylcw018nl5iqmoynaz342b1vlr6drthihy7oyhmucv6xr20w25vhwuj6ck7y7htws9v2u8u4poke5vit1hji8aycdz9g9pvzf3subxzh5zu7qtnsq032ztx4n76zccgayuf1uzk',
                status: 'SUCCESS',
                detail: 'Est nostrum autem temporibus et sed ut est reiciendis sit. Libero sint recusandae ratione labore repellendus et. Assumenda ex nisi odit necessitatibus vitae nulla non at. Dolorem tempora excepturi libero hic voluptate aliquid suscipit. Officiis id possimus.',
                example: 'g4cvqsumo61wfolb99uq6ls5egmockqqksa39zdf7xyprafsur7vhrvjj5peyq2x24e86vgp26wk2glsrxo1sioyr4m0u1818np99o3ow4iu06yoy105d7bh5kkmr0j8rdhlgc9mwa4vjwabmswka57w51yd8s4oh',
                startTimeAt: '2020-07-21 01:46:22',
                direction: 'toshaqw72kjwz073wp1s',
                errorCategory: 'fv312q079q53jiqoibsfl8hj92911ho60uz7r580dcwukmmon78z52o6mbbl8l84t9mxqvv5z0ecn0pvuglj0x8ytaecvf24nrpwhqorn0eox1k77cixx2tc7ykikqo7j0fukjkseaug46ewag4p6n064y2qoou6',
                errorCode: 'p1ce1oz7xocsyzras5nd',
                errorLabel: 'jyav5hvncy8i7krxikilxy37x0h9z69olwga7pzh7e2lsjuhxrqo29n8hj9dp63hqx8gemlvuke743co83m4g03ordsmjbgiqfy6v9r8j0qnip9ytokk9j2u4n1drt97hfk1kb85wg3er40ix738ovba3jppkn4e',
                node: 2242332192,
                protocol: '385hpzg78klhlsg2x48e',
                qualityOfService: 'mpl8wbvkifyd9466q1jc',
                receiverParty: '1cmf0605gi9ff2lwwyjjw35tl8jfboyp2ct20o785sgvk4vt0vgmkmi0kv7ml1u9ammukl5mtwqbzbzs0cig49k6t8trmjuk8ze4buikzd2fnsrw95d4jefxlrhvrgjrhre1w2we5q2jcw3p7uh5wnq32yrx1vnf',
                receiverComponent: '2lupotvwnu31ikkzpb9n9ccait68jou27opos87gtgena8j2pb5lethwbp928ssmpui9mdrsp0c2hexb96qcbk1c3uz9u496yrqfel4gkauawvhx1egqsfcrhdzxufae2sv815psm0m2unlbfzsp8pukhmt4qyec',
                receiverInterface: 'cms48szn7fn436dyo15pvrapc12oji01hranvx0arrogz4w0o1h3fsry81afuna797v9uo58v43kvyqr17pyitmvss1wkqq2ycy10y9piipv2s2vmbtswfcgwcqpzbwnx9bhkexxopowxtguhf30xe2eso47t4ip',
                receiverInterfaceNamespace: 'g2waz2t22q8cr24u9d3kp4rjkbwef7q694sc99phze8r62ux8hs9vwa7quu5f155f2b99tctax3xv46isfwpjq5p128bgw7i0wrrk4h9qxrqkvhl06kz9pbdd1ia4sszzzvcuohu1v776pmw4ckm7ihdr1gmp0gp',
                retries: 2037027790,
                size: 6927992617,
                timesFailed: 8073610113,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExample is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailDirection is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: 'ifke7gon9tshd75htolc',
                scenario: 'm7imlhpwxpjxx6uyff2otqa5mqrayu1qsazygqs8a65fdbl5ndyfaen0yy4r',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 05:50:30',
                executionMonitoringStartAt: '2020-07-21 22:49:08',
                executionMonitoringEndAt: '2020-07-21 07:25:30',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: 'avkfv25zh3vzxqfaku904em10x2htbnsbjlhutobnh4ilhfznp020kbjhur03f48thir47rywbpi1m77153cd9sp77g3nmlu61ffz7sebn8jvdgo722nyrq9bi6156ncz6rsn4s5mgvexchjydw51hq3iq02dcde',
                flowComponent: 'jhtqizwri3wmi1eoblbfw6e42fgdh7yb3gffcjh4gewajjm4g41cps263h2d502gc3j0wq5p5lnzsnc69kff2stjbh6gy15n77fnz9xuxv604dn1rbzkvklj6jw763kewvu0djia9c5yypeu0m7bis0f1i33xlze',
                flowInterfaceName: 'vzxihkojqmba30ysvr7mns0wt71r7ahquzm4l3ulw2bpvqhxdu9115ffgob2fvwbr6o9pmtjudyqfnt616o7cfk2yrnk3qdulch9cdlocj0dady9iii9rchppgjrclha2wu8dwmeinekxtjj77mogz4xd3kgxgpl',
                flowInterfaceNamespace: 'tf3ywqmxaknjhttlkv5994bc811hzh34jubosrtgpoe672cdjg2wqzyipyk905e23tuvhw3rldfhln5x4s0fkbbm2op8zhcwhua6sruz2bx4xnkl47og24xttcr0mvhqgd1xqr8d3irxr11s97wjevou6cheti4q',
                status: 'HOLDING',
                detail: 'Eaque asperiores porro molestias tempora et assumenda. Laborum labore sunt reiciendis. Quasi doloribus cumque magnam qui rem. Cupiditate molestiae consectetur non. Ut optio et ea modi iusto.',
                example: 'uub1l85smf644h3pbuq78urnoiku1v7ll6t98hoh1124k6x2b5dtq4tasnszuzbr0p3subt1nj4ez00awpmxg8flf0aileachy5py9auh04z5059vismj7brj748qyuo4jigqfuo8r2dzt501fj5ezc47ohqd62k',
                startTimeAt: '2020-07-21 09:53:41',
                direction: 'niva17pwe3jz9tx8jga7b',
                errorCategory: 'umflbc3r1ti0vinshahvxdx7xyievmylspod1sw5m3iuvuk26k9mx2nnp2pqdadbuayeem7bvp63c9y136q54928iweddsaa8h0g24ondrjqsqpcpc4g9jo955wicshyahdyccq6w83nk2lkmgcloxrdbact9ber',
                errorCode: '3yi501s460dbnpwlw2md',
                errorLabel: 'hijq6h9xck2d5341xpy4cq7ftx7qkh3smx5p3spsg9jl37cp3ynl4jnderulexpyaflmt0shpv8p6naafhbz7ukn3wlx9st3n9bai1rpu5dzgsjmq01e802igua93u6atw6w9t9icxl56xlioeqv72bh2fvcb23z',
                node: 3818891649,
                protocol: 'gj2fku3lkiwpl8f08zw6',
                qualityOfService: 'bmzcxbd5sb28sx6l18td',
                receiverParty: 'f4soiu4x0fsptffn8lsdgf428c655ch5a8a9frv6vee5185mwk62mscbnakwb1qqa3fgo6b1uwjsjw4rthznl2ddearkdjuryxc3ejpw3xypm5k4ussm2g284inszc50mg4remvf1k8wrgzemu3eid01hkbygo0p',
                receiverComponent: 'qgfqi6g6h28sgirmnh2fy95lix6zw3tl5b942h7o4tvm25scl7d3k22s2nbkmqcusqr9pbxpj1mihqcdh8s360yffco81shrc5k5btpshtrl5rvvsvfbu4h5iiu2ehqksutwuznq03ljchcp84w6mo7ki2oqv0ar',
                receiverInterface: 'a39qfa0qp7jab0gklsrrq24b0oj4qs1g0znbu0ijx02t4bkho3grm3jw1a6nazx6en6vzfe8hro67vl6o81sds8y8epo3598kyyify22ywpth3uyar1xtfj9nq4bea6t3lpqef3m9b1plq3tvn21skup34pkuqlg',
                receiverInterfaceNamespace: 'p1lnpdskzdchupsbh3v79wdy8hs4rtj16e40476s6z7b6kou2ph7vtnvtz4v7gpamu0b17eymeuye7ydykk7h7a85bic4ifcpc7dgzyona5o2viu3fzuy8blkvr8mhxo3xbn8iqusa0ma13cjttq4ptkkpeq2rqk',
                retries: 2567997710,
                size: 5238587635,
                timesFailed: 6653557968,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailDirection is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailErrorCategory is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: '13ksqemw9dsy8k4to4j4',
                scenario: '7cxl71iorlij3emzq85xnjvlwc0npsm3fr9vr97r5nbclp0t54f1q2dx0tea',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 02:06:10',
                executionMonitoringStartAt: '2020-07-21 18:21:56',
                executionMonitoringEndAt: '2020-07-21 19:48:47',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: '46iwg5gloq52i02bu92kvf0tcr3ckq09szsoppqzq1l3zkytap43sz2mjur7bjv202i6ezkfrs54x0p0v947jetqx5zwiyya2pfvqa3637sscc6iei0019a3o0iah3pxtnwc6b4blvoah4jo7d0sed75el3r64r6',
                flowComponent: '7wwpf3aicv2wd65gscwqpnv45yagcsoosm85nnog405inha9srelfzupkddlhw95cp7l3cnaqaejcwdw077ijs8pq2l6932gvhrh0fminizota6yefnn6rdvmk106k5taq31pmigdjr0phcr4oazz7r5azos2x30',
                flowInterfaceName: 'b7gsoy345z401o9hcle6e7o3oh8446yevp81yhvhf79pe4d10ek5l00x5a03uejo3r4uiuzb2mxkes0s9k552h2jghsb34citfvoir4eg7zdr0fk62r6ap4dq5kaawd9qm4qmtfytjcz8obn4vo630qfzybznrkr',
                flowInterfaceNamespace: 'whuwh5op0o952mqse35x9iz0h93myfpapbb3327jj5y8wxa2vglq09iaiwwthvrim76x1kk7bvcv138l5g9mdhq6ejhd0puhr1isoi51r1uslwpkrowoukz72cvens1u7v2n7cmsvkgn4gslcg75gw1ovx505w1i',
                status: 'WAITING',
                detail: 'Dicta et reiciendis quis in doloribus voluptatibus qui quisquam. Ratione nam iusto labore hic. Deleniti distinctio quia. Quae veniam molestiae maxime et sunt.',
                example: 'fqyzyd5mcotlq8stu5uvokffvn3vwmvevy6ykvt1st5i0rdbyqsp4444xpxy55s2quv2h4joe8suju8bqsg22npsn1va81zdjtowswcyg6ve5zygyrfl10une1n61xhp5mvjnz0wf5f1ovf3724lmzq66vaxfxsf',
                startTimeAt: '2020-07-21 03:45:48',
                direction: '1qx0nbqctmobqqtxf4nq',
                errorCategory: 'q3s124hbxijs7q4pmuwr7in1ozwf8vxnavbxcs65cta0g1bycvgy94tdegau5dvsxot9y316ih96mzs0mzpfbl73br1cvu3uibyxls8yzxsg8n18ujzwsojprzifybj0tc7842oekpstsshpd1q853tbtvt49c3hj',
                errorCode: 'rv2b7gpgnknrrrepse07',
                errorLabel: 'ajvqg4rlj1tl1mhhdl13jr5q4oxn0j00e6x835qj7y1fof7e64jlcphgs4l6a1ldt6qgqlv23e6yvm5sk1q462yki6tdpjlmkzhaiqe0ndphsj7k4n8y4umgfuxot0qq00aut1w6ofsm5rv2dlkck4s8iadiu68l',
                node: 2073883282,
                protocol: 'rsxhyolavq4nzusb384d',
                qualityOfService: '0l6m75aej88lis7io56u',
                receiverParty: 'x2m0hpm8lk7rrgv0n7cycrv4yqc4zrh4xezwp5xtgca5c8ncrgehh3l752fy9bz4jz06s8vm81beyff3h8bon8ffoiomv8n7j2uxn47zq640ni8nj7np14kltl2xad23uc3xsy60o2stjkmwgze0o0t3kwvcju4h',
                receiverComponent: 'jgegbdc5fa279sxh524a172jsa2tsfaitptdzsoxa557az9e8xhp9s3gtop2rdvxtc5ngffhdo85pxxlx0vq6l0fm4wb65nvie7vet5pzr6ze38my9bqcofzir0zk1rap6llu197vajm21e8rwi4wmfp1j9mg0yn',
                receiverInterface: 'w66myzswox1u65berh8puet8mt2f7mao03zw9i16ovvny20isq5hj9c13q8kixijxql7bv0gtk4z1q980ibe2lqd780lnnpw05sxzszwyd64n8qqzjwtxcns792o8kcmjf1hnx2nhnskhvxj6uegmn9kq6vonvl6',
                receiverInterfaceNamespace: '1z9r47kiehn5bmhcwmjl8mj3mrawha9y5vzbc1i7dqrrijtzp89jd0p7u2reggs2kj1851d8t1d68arcfo00bq5e95tee5o3vap6a4dsl2m1kak061w7pxuqd1ibwovhi878o0ipqoooxgn9qk4o85deb3bywyrh',
                retries: 5882027715,
                size: 3498202852,
                timesFailed: 1077950156,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorCategory is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailErrorCode is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: 'w8o25y2f71twbir1rr39',
                scenario: 'eykbp9e1qwhv926slhpxqpetb532z16ra1zkxvi6yyiw3voqor5m3mv1z6fc',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 11:14:35',
                executionMonitoringStartAt: '2020-07-21 13:05:19',
                executionMonitoringEndAt: '2020-07-21 02:56:56',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: '9pja048ko7wmh7p6nddqwejkblk9vtkcwla9zficvnkcq7v5ole9hjkk0x0yd5xwtvttfx0hv5os6zx500jpinq9dh49k14pepomu31t20zje8qrs7hsfl43g3o2dytukye0km41chk2eqbf6n44by7f49t5vr66',
                flowComponent: 'uwjp27dq4tkz8yvntcntjourqumn995r47i22bag7sdvrtezfy5cdhnqv6s18w5kj58iws5hlnhggmwfmyq763aqy71ianod71lsty8nct9d4wjleu5ssdkyte5wpjb34ri3lfegc0t2oiilxthihpqz0vy29c9y',
                flowInterfaceName: 'ydrkjlpfg8e0bvhpt2z2ldwktn92cgv43wsv9n646gss6m5ousmm6frltrkz98vquiofmssw516h56ax4qpp3x9o0p2exjcs88vbaegq7h4u94yg2e3t2ig7gz9pz2xw1ly099w0jrxq5uarifjypc7171p9aw4l',
                flowInterfaceNamespace: 'isebjcn6b5495uxjpsgmsmtlki2qy1k7z3mkdvja865br429uwfiiym07nsct3ywwa47zk420xs81wiwm0w5i12492tnrt3rppck9yhmtrcfpjvj3wwb0gngws6vpfi2ofokb1bxt3bn9hfdg99v30n95vf5fl1j',
                status: 'TO_BE_DELIVERED',
                detail: 'In odit repellat ab labore tempora eos officia sint. Voluptatem accusantium perferendis. Ea temporibus possimus repudiandae eius nisi et rerum quasi. Minima molestiae doloremque quam unde non ab quia quis.',
                example: 'w94c44qpkv9fqwb66azdyk2cpzxj4y8xaozxeqedz1whu1m53pj2ouptyoix8le6unpfw9o1c8nmmp8mlvi94cnwh4mrznldy3wcligbcoj768h6aqw6pi7r75jbxrcg4t42c0m2o6kd4mjp9yxkzheqxd353wqa',
                startTimeAt: '2020-07-21 09:03:10',
                direction: 'notketfd5qmenllwzqgb',
                errorCategory: 'en5r1yhgmqbsfdcm5tzyrv2lm257nvn0szm5i3ztn5mpb0qm6ejlgmalqu6wotn51h6xdy1t3osq6qswlydzn2u3sf6xbvrnlk2pztwfzzy0j2e1hw9ds6ss0inf90vej5z9q98bmfqamy1yp96tsuin5b28yajb',
                errorCode: 'pq3w36vf5pqjhb0loez5h',
                errorLabel: 'w7ia64kwbsq46vvtga4vr57p7wlwfpnd2wtsueix6cfpnj8mn0tefagzzdz79vqf7gwetwuy3s3hrvzmnhuaqd7msaw5uxcksn7ryck7bje5zw3jl8itsytc03wj7in8ennx6cvefvq8vbnpw108z8g3mztobedb',
                node: 9630769600,
                protocol: 'nztr8s5kdwtg4iu21oze',
                qualityOfService: 'rpid5sqa1s9pa37eh1sd',
                receiverParty: 'fimu9j7alsrdc79krb7lezsfqmwdlklrt0t8xlgcq4kvxwblmgqk1xjo83xowmt5wn8t3nkhg4du77cun2xfk6uaf3jml8mac80w4vqxpxo4v844le850zv73gch4ub6zoh8klvzfo1woyn5v336mnk5qbxju5vs',
                receiverComponent: 'gsc0qxsdnlfob987ikm2nexfcc2wihp1hy1syj9suw0q6h7bvsllvjbyyh75gof2552yzf9p3ha9z01vd78k1m332fdve1pgijiaz9zeokga0y3zhfs0zygvdgcegjj59z4e7djas7yjy9kamf50ypvng29rdy5b',
                receiverInterface: '4bih90ze8mz4zialj58kfmt3v4n3a0memtvi7uon5yiq8w3scsgbd6vjejqo7j0f15tc2cw51ke3jftknzpkdn78782icfpwmxykmtwuhonctjgg21c63miqmjip9hhiajxcrbrg093w4hcp7e5j56f68hb8zn1h',
                receiverInterfaceNamespace: '8hvka9fhi9cz84aflwoswm0n6xsz9au3xom38ym5l91v7n1ho17qgw5u4dmh0cxbqr6rsinaqlg6cyoaggvdzkdq42pm1nvjlk7d8izyffvsdq28cvmeuq7ll0mwdeq4bhkz1so1xt55yr6wa79g9nywrkh4mobo',
                retries: 8399061012,
                size: 1943968316,
                timesFailed: 1814641458,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorCode is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailErrorLabel is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: 'zl5lnelcsw5p5amny8r9',
                scenario: '8mfa5lmzsaucj53xfx5r4jc4usydoa2ly6elzjnr4cczautqxuu44hgd8799',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 13:37:48',
                executionMonitoringStartAt: '2020-07-21 04:45:15',
                executionMonitoringEndAt: '2020-07-22 00:43:41',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: 'f0846ogkomv2m7mqowvi0tnqf0oej64f5nx7lqsv6v7sujyoml8b8ay7sxseqn6u81y8rtw10zv4bif8hf1ovairrp6b07v8vi18lm4x77501582387cto9xj60u011tb4tyzyl0sah06jwdp0jpph232ipwf8pi',
                flowComponent: 'zp2qlq27qeyxu2ncxs9iyxx1bpu88b6hft99twj5it14sh88djb1djhp48cg9ifz6i49y8tcyja4zuabe9ibuambuvwbk2c2oe8hyrnkmcj9nvo8ufjbw9lbjvk8xmoi9vnnd7ahu31n773o41bjhgoalgetzayi',
                flowInterfaceName: '5auhftd5l1ssi21359qr7ph4pzz3540y3bk9di7d7z31ze8ocxkl5vrrhrnu5yyh5qinqnhq3clxs7vopuql0wcekbynj0pnm9ysj9655bsbsh53ga5s8g75dki6k5r1qyvekv4uj5mqdbswr0g0fesogrjl9qoo',
                flowInterfaceNamespace: 'nt1bzq0j7iy9o2i4h0b3r7cpuoxe74s0rumdt3thvhjb6wt91c040j1i47l3nravpeo2zwnz9aqm3syjstqt62xg5jn9jnpponqarbrh9l3f6ut0euz9o1h4xuqzimoez2lozbpo0ls4tr6bkyijtba7j9kre172',
                status: 'TO_BE_DELIVERED',
                detail: 'Et soluta nemo sapiente ut recusandae. Hic sint omnis sit animi omnis sequi fugiat aliquid. Quo quia voluptatum sint adipisci assumenda officia labore. Totam eos eum nobis. Ut quae in itaque ad qui.',
                example: 'k9tw3y1ub3bchp93lrogns93rwgfx8zzhglw394bjzdzfic72u039iot7g7q5tcyn3x3g8mp6yg1jjvvc0rmy0vakq3ic07izun48d70rxdwo98105mkx1o5qocs0a3yifm26xtum1qllwxnoj9gauck2y2rsawg',
                startTimeAt: '2020-07-21 23:43:10',
                direction: '0w97yajn5ft1bts70zm1',
                errorCategory: 't4wav14sg1s703rjw31opcve0rtyptx5euq7c3hi5po95lzz0i1icvi7gc5v89pnr98k7izh612f7ks32kn5sq5qz799iyly3p9vvehv7n3bxx9dcuuyirnlt73z886jvqnuqgux7nnnh75b4z1u5om6adkz7qtx',
                errorCode: 'icsco2fwjidlq2s3h38r',
                errorLabel: 'i44cen360rkx3w4f9on3omb90fpmvmdgk9uj0am3a1kuurp9qzoip2kwuqua1ib9lz69sg463t8f0dg1ndu6qxjctw74fvedcjbymrs8fnb3lf9urhb17abxba1gh1464nm4vgda20wrse6ct2gby4ijw0k4qaw7q',
                node: 7576009491,
                protocol: 'huv74o9ozqp4275i5n3h',
                qualityOfService: 'hen5cx6z6w0z5omvuxmy',
                receiverParty: '9nx8xzw0kizld8xnbxt5y19kernrmaqn7dqmrjo5336h64roqmppf81vkr2vvkpod8iyt2gs5t7m6xl7yizfzf0kzz5c5qhe4w8qhgcro31ikjyk35swbf8ts1a2e1era33rpejjouy2lp1uoislzsijc9ywlt4x',
                receiverComponent: 'so5z8wcrwe8qoyw2jvjrnnnamm79hv0sk1f65r8huhmx9ev8zki7w3tuf7joit4w12ktp5qi8g6tpl2uwxd6j9ezirykrhy1zljfarmz2p1qhrnw7l5v1n6czjq1rz0o6e6q9djvurre5u15285ejpad9xatyb42',
                receiverInterface: '3eruzxawaoqve3ra1yitgigtce3c2ol9a47v7z2jjtfhokqrw22m1gpw3uidhu9lamvntw0wywb0vmsfc6xyo24urd4bqlfrml68kgsqwc262z7dw50wq8pblpmrgb0zk3dwsu34l33d24xnz4wqrmdhds6gz9mc',
                receiverInterfaceNamespace: 'f2wxm11710pjqhworromy6h1grdo818gp3a0g1cgmw53gbiwd0hnargkovjbkl4yfx9pu2urx0t5fdvoo6beflcpx2t50nr5w64rjgtq38kcd8s8xjntua8tn3ja7xsgixtcsrfrc1oy3ydi58dkynbtq9exa3km',
                retries: 6667579404,
                size: 7760538778,
                timesFailed: 6314197380,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorLabel is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailNode is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: '7wrk48uau9pp1gejpgmz',
                scenario: 'qjigp9jja572yadxidqw6lst6wsll4ui3qrhyhr8z13q8iu3uwi5oot7bpan',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 04:52:15',
                executionMonitoringStartAt: '2020-07-21 10:18:36',
                executionMonitoringEndAt: '2020-07-21 02:32:28',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: 'run4oazvaox089oc9r8p1qcx3rbhifp0cg5x3lkm5wil3sczl0h9mv8omr9ediu3ak3ddqhijmwu8tqauphvmfqnzdsz8by3zmm25naaor1saoavtjsab6zrxnxla4dqmwl4oqluwe40jllpjq4j0etdw5q7lppk',
                flowComponent: 'sefbmtl497p06cl2mvsl0g7gjz3yvf7h5ezlzrc9qhc78knynelrayp0b851nvz4a3fpa23oxgiw5375bkl0c8zqdhor45tpgksj89nv0gife8rygu3qt2pkmlfg1p17gt6rfatg1jk3mpj4uhq5sx1i6sq9a5i9',
                flowInterfaceName: 'jojwisld88up25iyz8j0zoktr16yswx6f0yyaahi09qcoe2dxw55rcb113jphs8bqx5dv5g3tpzjhu85ccuqn86xwwnl7jfaa9igip19hn4ja9s8ydr8yeoxvdgnjq7vht6mpd29tz0uzujoqlpc8hy8m1i2akwr',
                flowInterfaceNamespace: '7cc1m7whj433zdu0z2h79x3vvofufe0bvd69gci6uq0kb92b5o55x8py3ww8nwpt3zwhdgvnpo6grvrufj0x4dq65sy6pv7hxm3hiyx5t38qs6cqtj3ot5q6kutsk6o2e1svot4mshg98fmfverrhcxjtr3a4hy6',
                status: 'SUCCESS',
                detail: 'Reprehenderit non aut autem quibusdam error sit voluptate modi enim. Sit eligendi voluptates omnis ducimus iure sunt sed qui. Eveniet ut perferendis autem est illum velit et ipsa.',
                example: 'u9zhhj5lws9p7ohco4eobn74n3qg6uc2i7x4oscioyb5qmnlnb6l2ss3h12jbhvivfwbg0tsdn5k1ccq0ebpv3akv9044agd6isy9scwsa0aolql9a3ykyxbm0clfh4nwllfwobs2ylt31cfm6r3z1zga9bx0ncs',
                startTimeAt: '2020-07-21 17:44:38',
                direction: 'e2ke4kfemyoyk7yd0xoo',
                errorCategory: '19kojjnrubi9smqaafvmudlr3p5ho1ffy2qvyj39dhowrtsid6nh0ryyz1qd1jwap3knteln4k86cepell7jh3pgi1tsyzbtkqw6i4eke9kikgozdlclxe7un71ivtc5zgwldvac9kjs9xn3s3v9fxg3i7hw57km',
                errorCode: 'aumbv66g20gcu3r02wz0',
                errorLabel: '2wvo7zsm06i70p5dl26tms64yx12ocbbralzda570ws1ch9350tu7yk0hkwa31czavhbrqacbkmnq8kpfsk9650l6xyki95snmo1kvlpbnnlm0irg34taxu5w0qug2bb91t69mek6kl8vkz4keljwdfxvnru7el0',
                node: 26226319263,
                protocol: '4c9wwib7qcyal175k4ve',
                qualityOfService: 'an97t6gwdamdg6akf31q',
                receiverParty: 'xa11qaa56pluvi1wujpx9eszpcp3c8ih86nkum3g8t2jix3pyyvvocro9qz2nbr9u7i41i6yamlseqe9c0lky8a34tqyfcuk41av6f6tap7wf0wmapdaq2546oazt9a5zhzukva1fy2qv9w6sqp9vja7hpt2gogc',
                receiverComponent: '92l03eth7uj4avkjjjto5pyke9fv6btgopy5gyy2ywd5oc49i7dd3ovnty969gr51lb58qq002ahclgcwqv3aql89s23gdjy2lylm6q9czcrcyex6pnirw0ujgxzw43aydejzzo8rsddxckbp6q5w13jtt3yqug9',
                receiverInterface: 'femyvp2od8g5a6g85rdvtwmcse5ghe32q6leosdgdbit2ro3trkylc6zn0mhk727cgeegkaksbg6rnsa081k86q2ye8gnwzg8vd6yhhhevofqdop3o2ad8w61pwnzd969z0cah0z870h9ls7szn059sf4y20e9cg',
                receiverInterfaceNamespace: 'ah5c8fao97o4kn6qnm0ow6rugns94e0s1nwvpt13jg5qdir7mwdu3fptj6ajjzx9epef18unc1z6ncneo5nftt4nadg8j2co4tw81p0x44dat1s9yv264npd94dui1i70l3mtajevf7u41zz1z35zbqladcqsqlx',
                retries: 5610900213,
                size: 4230646691,
                timesFailed: 1377242851,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailNode is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailProtocol is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: 'ipyz4zfpq2jxdpufmt6m',
                scenario: 'ml28k36nk8n564q25e79kytlu1umx3sse1qt3u2hay261oioiebmrf54ewxz',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 06:36:26',
                executionMonitoringStartAt: '2020-07-21 08:26:23',
                executionMonitoringEndAt: '2020-07-21 09:50:04',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: '0viwxbzntbcz5rg8tbckc1kejwrhtnnakffjsfwc35fblpabilisedecnkaheqnnr4w2xptuigpm9wbxkvfu9gzweruwaoigcb7ezj1wzu6s8odigzn3ot52us46kxtm65b3ihizanfmh89c6rtq9snu3xm29lma',
                flowComponent: 'xl0bls535q58ko9nustvap5csov4t0srred8ultu57y01wxh99igxoayou7l2ox1coj89e9n06aq3mw2w0qc7rmp4i5xcwpi4xcha6quxcp1zm3p685luqiv5hvzuuab7iu1cxe9w0z7qmf6x6nlb77qqc5lte5r',
                flowInterfaceName: '8byu50ojl3uugomd2mdhipy82ujdpu764ndtgyw8h38zwoqvxhls6wml3mlkxvi931w1h8ipv51by6nfqaoj48ys9j02fsdvl2ejwnyrd59m4ujfhe4zkbbpsjlnfmc6bal45hktb6yqblqszzfaybvglwx0p9dt',
                flowInterfaceNamespace: '76qic3z5v84lpjah3ri50lgy8bn67f22bxrjsyuag038gnn9zdks0va7v7m6in5o20byk6g0mi9uraikodwtu7dzbjh03dh95nffxggbvhfhi8b5h7fpf4zrsaa5e4yqnruumaj2nx8s8s2c4w9hljvw2pxc1oms',
                status: 'HOLDING',
                detail: 'Et dolores distinctio. Nostrum laborum distinctio ratione nostrum voluptatem. Quia iusto ut eos.',
                example: 'hafmm5w7r6xame3oc93yv286q6mnru5boibj5xk06pgw7dmsl8wmv14awqj7af1ncxpseu9ci7h9413l3sw0hj29k44aoyk3jmlslbthtjbfh75ob2s7kwzdph1eaxotcilg0bkbdrreyg930yj84mtjogbjakvq',
                startTimeAt: '2020-07-21 04:25:20',
                direction: 'q6zjvz52yrz4yk5aoovu',
                errorCategory: 'nca78mdtf6shyd592i5v9dyrni2kc05ypatl7raq7vd81ax02rwmi189v6xuk7awhsntbsw7qgg7j9th7s085gb50aockcn9l3e64n2zwq6nnm4p22bdqy4z513qylj16wxp464dcm55nq30ii7szj3tqkezjcjb',
                errorCode: '5lommxl3ftzz3zgdytqq',
                errorLabel: '3737y99fggfntp945yhci0g9oyskntw8ky9i7zvrb7szkhp1bq3ty9vluenne79rhksv1kfe594y8g474bzh7894wk8wr4v758ac866vb1sewf0r0agg52s144shqeoshuh6gvwxbu987kjio1nztvxlhh11tdmt',
                node: 8509628042,
                protocol: '0luoaapar61suedip0rwr',
                qualityOfService: '0rrnbgogr7kgy9yeodqj',
                receiverParty: 'l0kkuj6wwgek2jf6njzcy4caf17fomht9egapf8z8wux9nlxhy6ji9gf9vkiwo4vv2txwsbhhucuetqt5gs2mpyzfeqipdj8wrj8owrhtrfodq4chng1sibezq5ppggkiwhgztbg95q01z89m3jitd8fd59owp5j',
                receiverComponent: 'fjyxpr9w7yw4cnkpjl13j8uig742yca9ug175xdp11omyfi51jqvhg3rqf7ta04mkjqme2rle8dmit0r2qz2zimiljpnxsaro94zw1l8tw25tvhhnb4v1vizcbl58jiewwlyachvrwfef9zt8sronf91pdurpfqz',
                receiverInterface: 'd94i9q9rema7qgo0h2txlt1x31oz63ca73p67r77nqk2iqri0ozjwv0qydr3lh2g9tu0jk5em2o01ks91o8t2nt9a2fzfblq61xrpn1gqi3sp0165lm0ft53hx7njd684sl6925iciaplwjmizmj2u5k7v9wz09f',
                receiverInterfaceNamespace: 'ltxhvgbz9lnzat8kuy1384v2m909vl1c3pmamkx3ot4ey4xcygvokoc9eev9tzqywko4oayklaiigg2e76o4oceldro20eweoo0h8fyy05rz9kiuemlsmhkqe29ou07ap91231mtk7ll57w1b898z5m7uz6rd3qd',
                retries: 7440610374,
                size: 5261479851,
                timesFailed: 8078559906,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailProtocol is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailQualityOfService is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: '3wgmo649qxm1xpzrtqvw',
                scenario: 'xc7vfg9acy0ow8h70m1pvfgyp7sopvmugcc7q6e3xdf2czf5dikeua7vro4d',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 01:26:41',
                executionMonitoringStartAt: '2020-07-21 10:21:48',
                executionMonitoringEndAt: '2020-07-22 00:15:20',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: 'xdy2v5mj1i2cic9w90as3k31a8khgzim18tlvpdrppmuavtenknl7uqqh0rf8c0b8x64eg3wxxtkae681bq3yu1fz7vs0w2rl5p3yacrt2pmeuhe006h4txcf9kf8i3czbhpu8y3hz0i2qydoixjrmlvtf25tc1b',
                flowComponent: '322yhiyf72rbj0adhzhmyppuaoejxmg85nf3a3k4krqijzzbzwumgawqw7n6x6uv0rlnmm19y3oj7yy4vso09zvi6g07yvgidt1e1iwlz879ipdtrhnflpnsxywroino0fnzr3krkog0a97hdq3vw2iej13qee9u',
                flowInterfaceName: 'lrz385ur52ntue4c6npfonobwxgvdyz1a0jp6imywegib0zh5tkmqp1822kjm0gro4rx325zvboo200gy4dwbn8997n42zglc3io5nds0kbuuln730mok0q3bc75xmwgu7tt8656j95daeoj23v2d4577amlq2ws',
                flowInterfaceNamespace: 'h0zttvp54l21rbml5rl1g1tzfz0n60q3pxzc02jn68n6hapsh3s0auqx40leo3a2gh1ioltsrqfe1w66g1uiwd6tdubzap4vz4od7z62y2d6q520p79sx93417cy3wsyau1vq3fvesjjqntdkwrk9qgqqmbdsalk',
                status: 'ERROR',
                detail: 'Similique odio autem fugiat maxime aliquid iure. Dolorem deserunt est tenetur. Repellat magnam velit aliquid nam quas aut doloribus.',
                example: 'aijdm56tja4nma5iyk4sgivdb03v35jqzddyzsc0326iatr4g7xuau86s0sxidttx147ct5uqpoe7wx16ip3bc50iqnkuqwh74ztwv7ai91y61v1upu14iqm5nhn9d7nd57an2hdbez9at259hzbq8017c919c5b',
                startTimeAt: '2020-07-21 01:29:13',
                direction: 'q8m2asfh0emkx0qdphxi',
                errorCategory: '3eq1rwoqbhny24pg5d93go9d01yppwzeeqovx9stots9hjb1wex9l83d2983xrzakouj2zh5jtyx1lk52szlaj5g6yvadrwuk4ysd6jx89wlzs3vm7cpp80oox7r4hxnp7u7eddde2nnkq25d7uko7kja8k1u8yt',
                errorCode: 'ngvqhdxii0g19r7q1esw',
                errorLabel: '7btop7q1xcqnysou1sxfiwipx4ksp7u6o1zbligwo5xsshc6fmukf4rmxzset16vnlryj6f6iyqo9t762o5s8tkx2uhyhmo4bt6z1ookkya6iuryz89z6ol30n431fwqduxk864dtpbc7mh4bfgmy05dra79n7vc',
                node: 4483073706,
                protocol: 'h9o43xydwnzee6e552gx',
                qualityOfService: 'i1b74w8ydomx7ixng0woo',
                receiverParty: '46ck2q9zqyhpcoh4rk9waqhoxeo324c7pbzr4bf2wfy7vu6aguu9sbn5t5y17ompvrd56o3ibufc4bwmantj6uutc3d480nyl2rlkw8itevubiucr5n2jflis5cfvuiyey932tz96j4stycw1kc30n4jnqemomw8',
                receiverComponent: 'irpzn198lva4bukt0vgwegh4s3czd90sge7mm94vj4qbygrksn7ws51cimgg9eo9jbq0xb8s6a28h6afy31gpdvy1iwom09my8s30aez0sxink7liqmpvqycvmjlf0psxklwrkyovdhxd7rs53e35nnkv22axgx8',
                receiverInterface: 't96z8lkm8jc4mnw2qvnshxqfbwx0iarybr4k9d9zcjt9ygam4dchemhdob5ud7ef6ha1p87220puiv0k3ke32io3po3qhg8hn6i3d0o9c0oic80b8w0re0j6d4onw4fjr1llmdebd5np0vjrpru02v0k2alljojj',
                receiverInterfaceNamespace: 'ehwmk4s8uio7ya5e3rqi9hcwv803q3qrv99ntstoudfb6s5l98cg4gg70nf9yggj4ajjt6a6w02tu5bp0g5qqjc0ub2soojyitez55z1kl0kdjvspwxs5w4t621j4a0p3nu69ztvcbdb2pz769hk6ctm81oyqjl8',
                retries: 2967013166,
                size: 5276048611,
                timesFailed: 2351751167,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailQualityOfService is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailReceiverParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: 'wk4farjve92moohh01p8',
                scenario: 'z6679itlt68yefj8tv48973lctbahi6rrizftvim9dwaovn2hjeljywg0oi4',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 12:50:36',
                executionMonitoringStartAt: '2020-07-21 04:06:50',
                executionMonitoringEndAt: '2020-07-21 15:25:14',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: '13ibmz3wqkk4ndptk7xg3orz8sq72yxui6id2k2dfm7l5hlerityoum8fylc097nrpgrfi4boqs790oo2oykqcumzkib7xdko7yvlsp34fe94uuqw1qjhhmmfd9cnkkdwrrfeyyigb33wul3zohybrfji1l6dnvr',
                flowComponent: 'gee0m5ciw1dryb03u8td444g6uymehql0t6aifk540gecd9zta0oldutrap9gmy4i6z2c89uw6aw1b41qm7obsrup4s1v5owb6um0tjp4oy3gu6yzequaq5cf0yjfv3prq8ai9rwlx7xvsviu2117cdao5r3rlqa',
                flowInterfaceName: 'me9admk0chdztwhckqq8ywuef736dd5wmijh3k899efaxpfb4wmzaiagvjv4bb9fciuorybeye1derxi9r5x2cfple2ttd79snmdxvp0mlu81du405d2nsun9778pswzd2un6gukd3fxsnnye6nv7323hp2rlcsj',
                flowInterfaceNamespace: 'lt3thnum2jo3nssyjwthe7bpozc52miypnydgtwhxr4g2gfn5h5gwr9xvxzeio5f9uk243p07wfrvoh20az4ammpz7oldn3fsbmzhh4tw0mhed2aodlyv3dju0l19ppsti5nlz62m7b7ojzk1o5ddojqpujbd0ul',
                status: 'TO_BE_DELIVERED',
                detail: 'Illo dolor ullam eos quisquam dolorum repellat. Est quisquam est maxime. Rem vel sed ratione dignissimos aspernatur itaque quia nesciunt molestiae. Earum expedita veritatis et suscipit aperiam minima aut minima rerum. Quia cumque recusandae ipsa voluptatem dolor repudiandae officia ex rerum. Ratione labore aut incidunt.',
                example: 'i7obu6ar74xu3e9uqr157oofrggpawounpv6tk9xymtuouer6ornr55j1cx4tl7y7bmoabs83fnagfmixv2fl6f3kdpsf9lvdtbr9u176do7p3pvb6t4zhgo22yhw51enu4wq4koz00kkmn87usnukrsxprw7763',
                startTimeAt: '2020-07-21 06:10:21',
                direction: 'ub72ltojq5add1mf1gc6',
                errorCategory: 'mc8nha2f5602uekx371aj1hf24pvx9qxku4kdp9hvavatqr7cu8lbyvx1k20r0eglj9dukj3idfxfb7vhp27d2hsg1p8j1lk8mtqeqhp9txkiln2lixvxzr43umornpol03y1zblnxh52esplzl4i4e1o7m9d2e7',
                errorCode: '6knbr5yfzcpkz1avmzxl',
                errorLabel: '3j3157wzqyi4k8k3nu22qwixkmaqbnndvm3ypo98bepy3blnvp9scthces3dxn6tjo6uheqgmxp8u73ea86a414voubhv8e2kofsdrx09p0gf1oz43jhlwlyixllrelj6qdletouhouexfz869w19v3ojvnlq14v',
                node: 1772824189,
                protocol: 'k1sexp063zmh1xjo06bw',
                qualityOfService: '2j3iexoo58e7rlnl2fw0',
                receiverParty: 'focsa0cxytfw1ts0bi7ac2t3cfs4kj01xnaq207jc73xcbx6j0ycp6x3ebtmlk77bouq3rbqosfs0n79r7oetly76eu1lwp4ejize9oqfxly415vrhc5dv6wmzm9e34l2874qyl1bxsaaw5gls1irplpo2zbz5fqa',
                receiverComponent: 'dxvebfrxmm9pcxgnlixufc7a7lnmjpce5d1kxqgrf3l3f6zy2lykq2ntrpy8r7iraizt0j4dy33r0dx9g23hq364tnrzosrryu2cruiakwi9orfig5ktcknk1kudq7uuoheyp0609hj4t6n2kor3mny27w60gv1d',
                receiverInterface: '1wro0crjvljl9eqjbuwk1k8224cppeakes3qtkndxb0p3bfwqu4vrvex8050cszfvrozty2osji86jllcdo1kmdw175fdnmyez7q6t84lft1rx40mfvthmury6xej5zc0mnv5xk5htrwhbk8q5yx3uscahvvuov3',
                receiverInterfaceNamespace: 'fsqwds4yxdccrgszx36h1xq3bhprpwedi7aeaj2xr2zo0r10ydt6ej4fj2aq7k6xk5j5t8p75lxlne237y4org4252x3xi3i28moufbonkugzk0aa295n25ojcmtq6pv16pl0bo8ufiq41y1bzdoen9ma2go2le8',
                retries: 8256709698,
                size: 5874434573,
                timesFailed: 3337532657,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailReceiverComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: 'ojd1bzdtggc16xlw1bed',
                scenario: '72omjuvrp7g710rs2qldsipy2lk666z7hojfs0yfw4vz5z2aitj3feioft0s',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 01:09:39',
                executionMonitoringStartAt: '2020-07-21 17:41:21',
                executionMonitoringEndAt: '2020-07-21 23:28:53',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: 'foihyilz9s8n3wr9h9uro8g3gpuqkemfwm1w81sjmmlw7b5lqi0yf2tg50j36ytm0e3w8fsf6rhq0zdl4744gnxxkihgtw7q63tbwp26si9hu3wpk3dez5vv0f059qclniwtkvvloeuywm2pww5hoyt35i5ndgrg',
                flowComponent: 'lhljkw4tx3w3q6k8gn708xv9apo756zdijrw9tgfu8rvs56hfxioxi2fwg8b1jmh1qtti4nwrzgyy22h457anbewk288bx0mm8k6o43jui6psywwk2sv2t3txco72epql7cycgtuy9pjgu8a7s4v5s5jibbj5gtf',
                flowInterfaceName: 'hatc7sfvakkl08ytq5aoy1v7m1chlg5tges98vdxyn88xu9a4poqkkcy4wgxnqm7477epvgfl62kle9dtbnyxzeso2tffwfn3l8gmf761wzvdy0lx1ry2mj82kllggonpumswda5z60mqag826t0r2zvq9srxayu',
                flowInterfaceNamespace: 'cwwjbgl4oxmuj7a72aiiu3ydni5ww1z5o0g4nbyth071t9g731d8aar6q7md7mem131qzoahvojz2zo5vdxx83f3unbhw8ixtw079g95bchm67mn1t1g3r7e5l4psrvy1sbdqtleeqk259j1s1ora6w0j1gwoa7j',
                status: 'TO_BE_DELIVERED',
                detail: 'Adipisci voluptas tenetur debitis hic praesentium soluta. Quod voluptatem voluptas ut aliquam ut. Doloribus sit eum sit asperiores voluptatum et. Repellat blanditiis unde sed ipsa rerum voluptate ut tempora. Sit nemo rem debitis praesentium dolorem est aut iste hic. Delectus quia necessitatibus eos.',
                example: 'xx4l4kwwbx2ttt7omovya57m7ew4e65xb2s69vorszjknyzrho7dk79hy059k5hk3f7o2zwaloy0x6tuume7glmyy1ii4759ryb80srgxrvkwza63plnwqpflgpgzdncu9ye0vieq5wr8rdo956rlbvivuehhlts',
                startTimeAt: '2020-07-21 20:58:32',
                direction: '1vx04ic0a9klt4doycrr',
                errorCategory: 'xmbylf0ic5798pbai1dnmm0xag89c5kdyq5foixvgo83hfnu375omoj7kil3nwqm1bvt6iflsy8awll6erkqynryy46ekcagrkzxxa4kzb9jyb05e5nn2egw5ft7ghjl3h9x79tqlfdkkl5awvkrw3jm5ehmrudc',
                errorCode: '05rjyn5q4twbkbhntpxo',
                errorLabel: 'k9l1pd0kulm68raoloyrcyxb4ux3gifbnxg49hva0vd1polkb7qk7ufnispbipdli77chz2e4pfqaov9htfwrkidas9oo0wnankei5z9vy49pnv4umw9def3elwyqwp73599p69dm5b0qares471ptavhgdg47dz',
                node: 7105626102,
                protocol: 'ohs3dsoqv6esv2lclv1u',
                qualityOfService: 'l9gqkwclxp82gipe0vql',
                receiverParty: 'obq156xv11w156g0guvjjt349jjypma6fjczf1g3ivue983h31jgqzirak7tmqc226fo5opsaktgt7mdajhsrp1tsh5h4aoib75fnvx163eb7ypm1p9ual5d29t2zwd8pjmh6tlz8jt3us45j2ztfdw12zdusb5d',
                receiverComponent: 'kc1mvp3j1qdkkl26ga2yfekw3lkkj7257m7pbblrn552rxpsoi07lp38avj3u08wny07b98iwe2vlcpcllva0uqhq53mfcwqdqltua75ynr6cc4x4p4z7u6ybujzo1gllm3t7ws48pwggj0td1ipwvr9afnkcq5i0',
                receiverInterface: 'we4hzgrmots3vzdzqzqslihxdw1gy0itncs68b65g8h1g58h5cid5up789ot3mw4w6f5b69ycq0u5i5e97zon8hm370rvajbtcln5uj2wzjuf9ieavyeil027q1mmq0zvej1g660lbjcu96gnipzf9i7joh61lp2',
                receiverInterfaceNamespace: 'vlljk5qigwj0xmrykjcgolzecn7rbmjhli7rzqewqugftkjat3u2btxsyttmfn91x46ernfib76szir3h74nqtmxkxe22e2aihishlkc7tlkiqhcxwxklfbai5l8fw8sfw9hpxmtd3vtic1jkouy5dbchsootcih',
                retries: 9303959054,
                size: 3266274579,
                timesFailed: 2025303034,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailReceiverInterface is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: '648uwcfqjg6hiu2ggcpb',
                scenario: '0ox0f5eknalr5il610ya70378hx3ff3heh8j4rmelwx4fnq4vf8ggykveqtq',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 19:44:22',
                executionMonitoringStartAt: '2020-07-21 13:10:09',
                executionMonitoringEndAt: '2020-07-21 20:01:54',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: 'pw2dxvdx537kzsmcclpv1qo6i7maxi2f6seqkh25txzgbbkyi9lji7vl44iadn80l9q2pgitylz9mjfxe3d3eylzp2m4ja3z1cxc09f4sx00guu7pumsixls672db3mjqducinjffk07gfrykz0w271rjdhh0qck',
                flowComponent: 'bj40mxp468nr2ii1evw4ylvyvz731sa7ssub1db4tamtr7bqgfvsi670hm8ke27ritnznip0z5cv9bh1jeoz775a7tjcl6h5f3cfwy17mk4p2rkvi2h1ev14h64y0f8c14pc5utup9x5zn7vtnhia37h87f94cbc',
                flowInterfaceName: 'u3cjn0nmldqqxm1uoqoqhe28tlbgnuyta27q6r81hn1ak5sqansd3ds3ovz7oigogyyspf8o2z45abdp0ixkcif20x5t81ruhaxidmrift6jzwvtfz5ik4wy65bhbgfxhwxw5u1d7tjpl86u7iy9m2kvoc8tw9m9',
                flowInterfaceNamespace: 'vm987gdhpskqhp3ufb380ajbzmity2jfxqp537quz8ja76dqust57ttmnow75mkl9qrr8q4mycewr9si72ts9eg4rp0bvw4xtw1wxzu9hevl910ciqpc5ax9xlhr3jwcqf44op5nrx0lo0yiz4l5lqzp3nst2v0l',
                status: 'TO_BE_DELIVERED',
                detail: 'Corrupti esse quo voluptatum ex aut laborum dolor. Ut cum voluptatem. Esse qui est exercitationem eum quia et expedita.',
                example: 'wma6kokox3q71hwfdcewpvomic4ai9mc3lrekam5193lrg9b9va6ghj132kdwlgn7rg4q0yxi834t7h4t3utbo8lo585gx4rlm40y8i2rrgpnuelur6zmmflkdztnvlr6juqchpsg8rfaj299heyk9fimwcl71m1',
                startTimeAt: '2020-07-21 08:35:00',
                direction: 'aqwg6xdor5rg8zusfqso',
                errorCategory: 'hv5stxy4gygsh8na9vl6qemzz1xhma1a8q1facdvck40rsifklbaw413khbq0oc88dgrfj4rr2oy81dnreeo0vsr3gof08cob86qiih5314h7lvd9oop1pn0poi6i6haxr2rb5vfqrhbfqmgc616tlgyrepg9on7',
                errorCode: 'ov6and65j4a15b17uxn4',
                errorLabel: '03zmdkdauxl5v9mr2xjmk0pd4hvo867kdo6lz6qrzqusgovaukij087sy7uhjsd0w74adnsa32qc5e87a64ztxgnidvoh66cyg90122m03si8pw2hcgfwushy412ioaznx2cpzzez35wi4eg6wa2sujachkthqsz',
                node: 3043204582,
                protocol: 'ik4lwxhe68mdvheplwru',
                qualityOfService: 'aqp24xt2qnka53zqqwvk',
                receiverParty: 'j2pfnk725khfv57xwhs8u1mvudfw6a45xryyw7ttq0ft0cjbt9iq41tfmfdji6kb9u7a5y4vhf59ugf5tg097nufp5srytgq01trt6vhuz6fx42r3ksq6mymduhbpyviqkurxo8h2xoxy4si421an0yqqcyzanic',
                receiverComponent: '59samt39gmmwovx7q99inkrcoxh563j9hxgb9605poe441atw3vv6tu2ydatnkr3maekyikazyyxhigze1u8bx85bq03ne0b5o7mkem2uvls47sbtycfmva7wu6dsva8l3ag6qr8pq5qleeeosz2w6ymccvmj1jy',
                receiverInterface: 'jufhxb6kyaeqnl199uh3bivqjgo5kqpawpdy91zcn103flmivv0asleli7pghkg8mjsbvaoja8ebn0g8nikc0mgslcav0o0v6thfnxczk3v3advv2n4o6qkib9jrfo2829atjcdnjq71dpgwcbrulgxfkb004t5ao',
                receiverInterfaceNamespace: 'hzeqmgvee0r9dddcnx3bqvgqumaijrxr6zxwm4jdiq5jzo2vxtk740ubsx2ayvr2xuu67t99m2nr2eis2hy96n0w79b4e0q4ojo04om4zk5jlyn5qb4nh1df1w1nbto0irb3vs7eu1xty365ge1wakjp1a5xh0nl',
                retries: 4308195369,
                size: 4687430197,
                timesFailed: 5257714248,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverInterface is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailReceiverInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: 'nv02k6z4hv6j7e536tjy',
                scenario: 'rl5vum1j6bkqjg6awbey0v35tojjb4j38fwwwpkmhb99hfr2430p9nxy9suf',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 01:39:51',
                executionMonitoringStartAt: '2020-07-21 09:26:55',
                executionMonitoringEndAt: '2020-07-21 20:25:30',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: 'tscv9s60vw54bw8g693ph69gn5ro888kfo4pebslmfjtua6u6iggrxv73zmgubcnx0s7p3w2kouz0p4y8jy00hwtn923fmanobigu8z6hrw9012x2rkpcizih51ysnqnud7rwzfvzln7fn3zanzpqxlbapy85yw3',
                flowComponent: 'j35wm97ojv0e9rgagmangnrsxjv5uwx3cltrt1s9u6laqxvwushrx3hot3vec77x9y71j6tljd1l9bferds0qg04l2tz6mv84ryezkwsvi0w7wqggxtunjprmgazh2r5l9qxkp4ry6uw4czuzfg8n5iky756jni9',
                flowInterfaceName: 'myenmegvbq6k5hfj22sec8mdiwkfz11ugimrbl2xqx60as7xkauf40avm7bqsvg9iaigsa7uvouvczhocb9hd8q04zzxe1d48rykkzdrppzf0jd5333f13pu736wd3y5rji4re9qfiied9d6n3e3tmqzxstwkfa0',
                flowInterfaceNamespace: '9ootg2792tinda3i0v4weqp0i49wrfonggtcw4317vvidfv1mmiodyvbd6z1itoar4vsmwtndde41bzvr9veo5hveax0zjbewks2g3loazrvaydk4w10xi3q39tkqqw5c2ij4hiu6uv2id9r745cuxj7z89aow18',
                status: 'WAITING',
                detail: 'Rerum quasi quia. Expedita dolore modi optio veritatis hic et cum eum. Voluptatem exercitationem modi sunt sed qui et impedit ullam dolorem. Harum non consequatur repudiandae.',
                example: 'itej3eskva1wronemkpp4qrbm062f062inumhy9ul553a079i044815xkwsebn0uuuw2fie8u5zs87mfd8b4kvzgtuzdwdpukcuj7798cx3upag1mqxyy31i1dstmuwqtozm0lmx1dgubaftbj3b00088mwp7n8a',
                startTimeAt: '2020-07-21 16:40:36',
                direction: 'yuhu10evudn00gshw5c3',
                errorCategory: 'lvs7g2jngux3vryxwvbrke5pul4y1enggs9dqvbha3aj877qbfv313cuu8qev9scb2zn4xxx0gy6r92t7y0q6n1mswrs56j8gfsc9x9dbvie3ueobznxfdjodwgq1m8serk1qu1csmekasi3nllu0jt565wuuek3',
                errorCode: 'mohu1gsqkr3m6cht8n87',
                errorLabel: 'jd905bkqyp8aik78ryki56x951cvlqxpqpk6g0q0s5gn8c4ddcc7elzgmslufhzxro5mdpn7x7pq2zh7krfwruz4k43xwjd31g4ltiwak7bfmw67soalo09dy6gwlnkx21v7ofsd3xdvxhqnhv8aqs5am4xjrpmv',
                node: 2902467803,
                protocol: '0nq20219ljr1ek2pz1w6',
                qualityOfService: '8lwrd9814ccx5e0dq0lz',
                receiverParty: '0iebulab44u3qu458ki270m0tnn244uhpzcfwqojn7lp8aq43gzmctwdjgdw0o90ftltbz48mtzlu0bk91xiohhivw5ecbvrth2r2e59d0jqrexc0g132sfib1krdgy5427j8rd7xpnphlpe8bmvnk24vpu40afv',
                receiverComponent: 'tq0gackftho0dvzra0obkjyl0v6n6y5cohg1rgkkwkh9udh1fm6k6au3nxso18litaf03rpd3yfsf5xdtdgagaio5nyzueybkd08pegso3nr2pb8l4e9wtjgbflveiqopxm7gufjhjj2a80cksp0s4pklxyt8ffk',
                receiverInterface: 'vizt9theo0alahrgb0prtzrqihqqn6o17ofbqckzj7bvb8daibcz6bsuwqdcu64xqitckczc1soddnp9crv687mwv2laurl4s2sgf655rba2fojwjnwk6ah03hm5tqomenbwr7wf9wm5dzr636cojuqecdkhnk2l',
                receiverInterfaceNamespace: '1ym46pebv42ifixcd5wjmkqksaollb7cfv1j5w2apnn0u89ljxoyo3ezanwmhqea7frrs3c1y64rr2l9yyi88leenahx8sb9tm4sbdfyfg2yh2uj5ngqy6eyt33tq8c4odde6mipbt4f2n5vet7b2yxwmdyh52xtc',
                retries: 2158660692,
                size: 2456317452,
                timesFailed: 9918211887,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailRetries is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: '400nf8074291jkphm763',
                scenario: 'blf4voika7y0p4fyu16ag9ryt0jhb18q3woexucqqj0qwnv41epyu55gssm0',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 09:45:59',
                executionMonitoringStartAt: '2020-07-21 12:38:40',
                executionMonitoringEndAt: '2020-07-21 04:27:05',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: 'p7dfsjra0hhxz0qxcr0vmnvszag60ardu0jqkcmux9agsp7bzfuf5mxw4od3gs6tl1hr5fxm9qv6sszqdocrzx8slq6xqaw357s6uns1u1je3dp36aj2duyxbqvtpxlzudba89zy3xahad1mlymh9chwqlqncgeu',
                flowComponent: 'kytmne1ykau4wsbt4r97qe9r5ug5fg21y7g2utqy3nuf9lg5ubxnrqhiyuc8y2drmutp3bbpfstuc0pzynczgbt56vcdix3383jqkdpw98clzo9mh3p5asv45otyn9u0z8ku4ngi6q8rbhqnuuggdt8qlpo51boa',
                flowInterfaceName: 'yx9svcoisfol7gyhxpaywss4gi3ts37bf8y97w4pwa5u2m1b6c2rfztrzo77h18q69vsevtkbu1czfage8lgsvqvrb20yt3h9rf5w288d08u3jwu3v0k15ockpyjn7ey9p6nqal9nyqcayzggzpzy73tdunc38id',
                flowInterfaceNamespace: 'mjx6js75egdawezqrhvtcjelo5tmwqkk2dhlt0zcxhoasxfvc6ogzoxqf9zb12vk0scvp64xpjnv9hbacx4wtes2uahzjcvfscxy3th6vq5p6j3jvd695p9j20izthbi8dpsnxh3cw4u1re9qqjeilt2kh269b99',
                status: 'WAITING',
                detail: 'Id culpa ut tenetur eaque labore sit aut quos. Perspiciatis deleniti est molestias delectus et mollitia. Quod similique placeat et eius nisi ex omnis rem.',
                example: 'gmmxmmbi0hd4qe3unu0xqiawub46yya2ed1qhz5b40i2vyi7xgq1w2oxtpr2ekczpmu3bh8myn4r8f8c0au2zne2rnlkep7q5ht4telmpcmlgv4ebh1i61euilyisl2zo5yigq5f11yo2w9zn4gk6f7y8rxclzdz',
                startTimeAt: '2020-07-21 16:52:46',
                direction: '7xammeibixlvsioloz9z',
                errorCategory: 'shikj5tw7nymzohus5pllipxx8err0xkoapgupj6kkd02csmafcq7b5bk2xkv277tseanibk6gse0cyd0w6pmaooefm7wn5hwicslin2shpjyrxbf6mup4wa7c642mhifrrs9uzccbjvzb63hibcwsf0usbet1ri',
                errorCode: 'iui4te8le4ad2nehigzp',
                errorLabel: 'j2v6294zh12ufntqc85r9pb2jmtd8tp22u7wkceoz2ozzlb8ny38gbevy0xzrjwvyh95ictvuxz0rutaj4cnwyt2z5fgcuvdiprk1c9pbsh99jihiqds1sodpw73dex59132icxsb9jjre2dl0uf0pnkrjvyqdoh',
                node: 5081378015,
                protocol: 'ftflso9me95o3cocqwvw',
                qualityOfService: 'c3doy0ts5vlx1f7ofjaf',
                receiverParty: 'pv5uai8szst8qj5zndnfe1k62uap8azyei7uokay6zf2btzp32s1nckvhijipojcejeyffn8zef7zmz9v69x84bfcfuswsyix36645yfj33wi659s1wcqr57j9cmopwt5max582nf9pobeq4ffr9prex4xhnzlvt',
                receiverComponent: 'wdhjbj9z7lo119jm9zfp1h2zyuenqn3d2429n8skatybnmzgv66f758tgj2604j3e7ljwqpqowy6y3jbfbometrvxp09wtmv2dyc333tv8mkh53s1qpi52f626wj5fsmrxrv7b2lkz5ofdk6fuabbmf8i7mi2c1y',
                receiverInterface: '8dpnlc8fpbsvku5dioukqly3trgwuyvnptaxaczb996tuttjy40vrpbbtpdy0x910hom453ajckonpwby9rtedhmz931f8yx8e4f0kbexltempmjt501ak4jas16ggwz1y3kv7he3a115gfz5e28ju1slkr3exv8',
                receiverInterfaceNamespace: 'zpb78lxoa41nse73fo3r890m6xohgktmvw44r4m8ruup94eskgzxtegf5v8tz1290a33jbohbhumczzmkbklp05zfuu2ped77clp8hlbx25vfx36ot7x09sndx3nv1j68vu5mjmj9in1uho5w2wx73slucyyqp6d',
                retries: 43113396449,
                size: 8393862096,
                timesFailed: 4764470593,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailRetries is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSize is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: 'xoiik0kt2lneyban01ls',
                scenario: 'iyq4okbh31zmxrnukcbmxsfmjtbouezf5f7n5xzdrbi6clzqvqmdt3uy8gwp',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 20:14:12',
                executionMonitoringStartAt: '2020-07-21 11:23:35',
                executionMonitoringEndAt: '2020-07-21 02:08:43',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: '1hjjf0048ogxp5knn9zty4ez49sa49rkymyhz9w9lutsq8psj3ktsu48rw7e1uydizoysrshn5crkfpxtu6fgkcj5b1ol5ocidq575ngjmc9sijipqgiiqe1wn68fyz3akfivfqjy36c8yi04jaxs4c36j900fl3',
                flowComponent: 'ad2nkzmlmcun3lpgwvpyo6vr2udka34d5i5i97hmtw105fus4yl93zz5285nxnqxgsjkqw78mkjhwr0kxyvawafx8682maegntkzepjb10fr4q6gy99s6sw8zvmce8p0s5uz13xvd5ufdyl0odrlw7k8i09hscl0',
                flowInterfaceName: '0jem2knqk3xh48knxctl080s2lj6pg6n7go0pgdv54w0v9jmnusw5ygraf8ugzjev98pnodogp24z9emngt618f9wemzk9u713uizc8fbk15ugzq9ojxoll0j81yqt4ljy08xf8cum3u15rtl37mxe7ok1rsncp0',
                flowInterfaceNamespace: 'kwxdluavdx1lx4a7555ste4r74d6cw14nvrthaf0u7v0nsaxay62rt6ywql50rbfhb7laeud4k6ahuyzxaazlxbwrslfi17m0oxt5pyq4kfeu000q6d9cmx1s3rq1ttdso26pkjzuuevoq09npcxbjs4o18gmmk1',
                status: 'CANCELLED',
                detail: 'Dolore dolor perspiciatis. Sunt cupiditate sit quos totam ipsum dolor maxime. Eos optio numquam neque. Consectetur illum quia enim consequatur.',
                example: 'h4ql62ovz000fd4bp5sc5f81iiphnq39ntok8g54det61a2oerbo0e7oalblufx3zk5ahaquqzzk2o3wotx0dhbsrnktl2svmv1zao73q5ndu29j2ipp51tbenjnr38oe1s34ikrh09l2a4xd0jezem7yji6s510',
                startTimeAt: '2020-07-21 19:30:02',
                direction: 'eva3zho2c8uk7xdrpc7k',
                errorCategory: '2frgww2fb5m0u5m9ofducaxes0devgod1kzm7vkc1s9y1iw1x3utrflxytm66s6e90rgqjc9a9cjibgecs0bohzuyisz9b8ypln5qldng918k8ou1ytj20tt89xkvaa1vyfcst600xyeoe5a8skud8mvtunaigmv',
                errorCode: 'gl64ss363dkh3a1ed0jl',
                errorLabel: 'gc86qkbqlaqruycw2uv0bn0wakbnot3z06a6xonr918y595t8g0tk3waubdkm3dw4q05zzysg8tg9rxrpq4x4nzkz2clp9329cma4yp5w05bao3qzh7yro9tecq8e89rx1p0esidp1ovokkfjtfl8y2bvmfxqdji',
                node: 9458276711,
                protocol: 'em1hd5moes7kfyz0l1ve',
                qualityOfService: 'tzl7s03txfnz26278sud',
                receiverParty: 'm7rhxx1vzz06u9grvzlj2ud1ktnyd1fmvmvv5pytyw87opv1b3j2prhvxbntdf36y38u2txir4xvc6wdm0memc8pjy1ttwidrl327e5qxzky7ze68je0wi3y3uaingdpn742yrn15t7bnn893o13vi135jldme1v',
                receiverComponent: 'ixb0rx61wi1v7upkj98b670yuetogrg9cx6fp2y8vypgphn8aulqs8i41z1e8xhgw027n4hj9uf07kv3eltdwdmj8op2t5tctemvaeb7wf10jx5cm59ljit0wi01d5atjop2nck7cze1za7n88zy56av5xe26p5k',
                receiverInterface: '04rkfju2b0hqjf09ztvz3m9pqqrvipdesqe0t34hi5aiu9n1w1xcmlugmqwck4v1kqq5hyen7mydwgkiz8cyx7lcue78d7c80o566knh7c10va4fl7hkn0drsaxmzjwao2vkwakh4b227n55eoncv16dalffepo6',
                receiverInterfaceNamespace: 'y6hbikedbnosva8o1b47fds9kfmkhq4bcw099zsyedfkboaifeog0k3d2qk8sf1bjr615b2utmvp99k099hpyp0kfqa9w1acjteldqv174qeez90hzyu9ekxlnm7kfc7up64brrle5fudao44aqer0azmpw4hi68',
                retries: 8185408786,
                size: 60269007840,
                timesFailed: 5131014859,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSize is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTimesFailed is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: '8t3a2wpzygs5pwncyfva',
                scenario: 'xlgprt6i1r5s6ezvmj6iq89a230r1cqpj2n8fyrrd7a3zqujzw6tpy760m8e',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 21:45:21',
                executionMonitoringStartAt: '2020-07-21 20:42:15',
                executionMonitoringEndAt: '2020-07-21 16:47:13',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: 'z6txdfqrf4qjcuhulga0fb5ki1iybdtm8ikz7li2l7gt2al2u8yvy98fzdbsy3i9thh80ekj3lfwgrufruo18tc2hq69dgtu8gui10xpt8ehztr6krh93q6wyu81cw6ybsyhfsrhjrgx5x9embygl2u8nzjnrrzf',
                flowComponent: 'kd1dalkfqa7919uyktpx5hr1h4evag6v0sya3wtnpgakacs0v8ynguimzk4htcemzyczbaqks81y7j73dbih3mzygigyn4xnr647y0j2vzqwsnzsxlfkh54fc0c4bjmv91klzcnncs9byu3qxkf36piu7a48q6lg',
                flowInterfaceName: '3g6kogd7a76wfky7nn0ybge2jfgdvjoa9lrwtsj9v1qkxlo9q7c1vx8ns8udp8ul4yuqj7g120qw4ltzayaifyar8pid0jmfcpvhrsh276flos2mfep5z375lcjqqxnj693yef2f4y4p1b5u8lysoors0um6ifgx',
                flowInterfaceNamespace: 'pmnvkspf1ip1y7ws23sthmfyzoe68jg9pnqtzfzdob0kgglr73s5kp8nmpyn35k41lxg5swx690hc93weczywfjj29j5fyhl044d8k650vhf3mn1ytw3jhyaijzpg6615ni7gkfj5jpfbe164xgc1ob0se05k1st',
                status: 'SUCCESS',
                detail: 'Dolores fugiat deleniti in ut nihil quisquam. Vitae sed debitis corporis. Nisi minus sequi. Eius dicta non sint pariatur dolor ad modi. Saepe facilis unde autem unde quae adipisci excepturi.',
                example: 'kh0nnlgnlxgupm1ruu8dlbd0xnxyau5fr67uutjvirk26ptoohqcycooevy5b7cqhzu8kkb4xxkpcar48tukvayxllwubcmq5uzhf63gzpou75d3yeoa8cyphns67jrz79x77qpjwjucowlocwb1acei4554xx62',
                startTimeAt: '2020-07-21 12:16:21',
                direction: 'yibyj06glwuzvg3ciqua',
                errorCategory: 't5mpdl9kgrl272ratti6zu27dgg3pl0b1jh823x93kbzdc7fks5u3g4soym0aivumwq44ze9x36g09ogbylc897r1j1pka4xbyjuhmc2eivrl4i75mg1ocph3t4ms83kxst9l5ig88vo11akhhamybcb7fsg2qpt',
                errorCode: 'ob7p3x6jb5yemxkywr7m',
                errorLabel: 'g53idu93s1nqajgamre92znc9bgkmbdtjqn8ywp41c0vgg4g5g4lyilvhyqx4kkitl97teqywckwjn8g3cqpokak0dvqdw37gswucihcq0s7a8790v5e9tswc0sfirifdfppprq2fni1iznsyobbk5mq1kt4jlc6',
                node: 3067437504,
                protocol: 'jdut86toli5bh62y8opk',
                qualityOfService: 'q0a0g53litfypvhltsgi',
                receiverParty: 'nmv3m6cvpo0fzyy798yman5rz441m3dzu7f8qmn7ru0ri1jsgchyqyjc0v3zbbgwgl3mzgxtv8o0axmelkmhl4hlcvzr2q9lis65alj4jwechplqhyvmnvk787iajjcxlrw1gxlwm69bnjeyu0m8ym1ovs26japl',
                receiverComponent: 'b4s6aszsva1inoo08sgg8udsf5wan148zsc81qtrctog2r9485aevxrtn2aco8rlemjo62ebs0oinvmtyy46vmq3q4l0sm4dqxidnmxh1h85vq3ituut4kr03qduovbw4z53bl56clk6pk275igc7f55gt0c2k8h',
                receiverInterface: 'ym53igat182xgdu0ye22ojspmceonklhgr2xtaw7wyt6gtfltowjorlalbqsbosaddbtmqy17crt1pc9fsm8w73a7qqvs1bkdigpod9pr855plstdhmux6jxso8835g4r3n87n2tro9mkxzristcqfcg5piqopsl',
                receiverInterfaceNamespace: 'i9fc24w4gdmo7lic3g6qn9oknmsj5pmsae4r44vtkpk40aehe2y1vwcy02i6fqnez03uhjjmw045ypf0d1ridivz3kcrhdobj4uryx620nudwatz09nui876dgyuq7r9a5z7i1hhfopunsxtrp2micvh3wwj3ao6',
                retries: 1598987874,
                size: 7219428593,
                timesFailed: 29297684799,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTimesFailed is too large, has a maximum length of 10');
            });
    });
    

    

    
    
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailNode must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: 'egjxxp5yfbjtwih97d91',
                scenario: 'kxmuttovfuzavvjmzymuusdmzh888ccfgf7fg6mtfjlx46i88qzz0deoo005',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 10:40:23',
                executionMonitoringStartAt: '2020-07-21 15:04:48',
                executionMonitoringEndAt: '2020-07-21 05:09:38',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: 'e4bn3vmgwqc54kf1ii17l9ltt7lgdh1trt25luletd6mq7hh3kug2y34luswpzqrl5kzu0a3tkkmwh5ibmo62433nhtwn7uo8zjj5hql9zsj2af4a8smnj92qyfilxb67kyza806kmyekpr8xlwkscopi32yarnz',
                flowComponent: '9iyoxbqo4m6dhwp17u4bf9q8835jcjukourg15gcqjtygyr4lvqyct5fd93vbhjud8kbo3lf210sc5pd72byf9gj0rhwaouk04p2bbajk2ifn4so0y050zxc645c1uuzjov2k7y3w4lr66efguk2gv66bexk8f3y',
                flowInterfaceName: 'khczogezy866gcroe70dslnjxf6ax67i21r6cm79d4hljp72arqxb1m7yhnwaimji2jprs54g7iqqvwgdog30jythalg0yvnxcof7awy19q7jqxm1lhbv813klfg44qqwcykeuy4u7wn1o79z75s0zlw1u6c96o4',
                flowInterfaceNamespace: 'x4ndw9h98l6p30k25ve1kq2wwulk1y1rjg59hmgqp8gfu4mtz1rm4u7y0xtli8fypc19gqhuveisitroujw6v1pn3zy5kaqq8b7aji1olvwyefbxwb1t5qidv0kbqpdrkigi7dvkg5jo1qkaglpg0djxbpy0bplc',
                status: 'SUCCESS',
                detail: 'Optio dolore sequi debitis culpa magni. Aut id aliquam repellendus sunt. Atque et voluptas fugit dignissimos sunt facilis sed sint quo. Saepe dolore ab et rerum repellat dolorem.',
                example: '5u74dogooybxd89q4a2kgelp3vgcangogddzelcs5yglyqik9zvayno51vb1pjs3ex64mkr34rhhergss5dbhbkpnfrnpz3x9orqmrb8owmqb0viie0y731qcajg082t841bpaa18hob1juim48qw9txu42xibt3',
                startTimeAt: '2020-07-21 01:37:12',
                direction: 'hvtlici3lquuyn9x782g',
                errorCategory: 'pf8nm2olg8pi3xe5z7tyvyv8csjqa9tnfiegkv1mzjr43egrfji86ivv6yjoews7o1s3p0v85seczmn8casoognwwu2ax4ywz14do9b27hdst4em055217hlijy8k0h0c53sv9vxivewkgbigy7tw15psboyp0nv',
                errorCode: 'df7lj8klmmb8mb1pl316',
                errorLabel: '03gmf3hao02teibmihhrxvsqltkbccxevaz3yxyg002h43s8x3rs90o440co4kjh0owccxcn46kkvds2bohl7dxspysdqbh8jkkee1o6aj88964tgfvw2sgw4xe34qm4cwmfbumam8e5llbxrac5lfzh69f0uexy',
                node: -9,
                protocol: 'gz8sl2q2qtcl2q04lytl',
                qualityOfService: 'lebcewq9vzmy7dobcqef',
                receiverParty: '650sjho7ulr8ncyq9jv9qkh3pso1rl0x25ajzltexedqpahi8iqezbup1cl8x83ijrnk7ppf5outlqdhx5brxuz44g0x2bpqi2rqwe8yidh10g7x69az38jfji75zebjvx44iqdhzhe6wvgtwuf0qhbpj1d3zv9s',
                receiverComponent: 'vxuuzugxjjf270299jm1025t6bmc067n3dmvnaqxpa9zdp63ue338t6gkuqdnj4vo5pmx8j5h9fpapbgsuxuh0cgs9dwnjap8or9586enlq08wqvui6ildjvec3kztkercc1doe72ebz0v09zo3401mt3qw41yfw',
                receiverInterface: 'q6p4prkq5mnbpgl6rym4lea61hst48h086mqxvzqdyajoc3aid97k5lx7feserplmvpk9b2dedrccclc6ngs1cvze6d35sy1wgig2up74kb2xyd4xvp4a6agkot5h68r119kp6opb40t0j0elp6zk0tzo4uzi92k',
                receiverInterfaceNamespace: '6g04nl8s3u4cnva2f1wt0osoqz1o995otq4l6ixq3sms2hz01aafidb55y7f1ey3s7v3lkbx45gxzjsdqtv040hbpg842mrt0enn1h8fhg5b6dmkfqk76evi4hs5w9jefnd8jy1hy8yppgk9oom91qksb4k00wvh',
                retries: 1104128185,
                size: 6090936979,
                timesFailed: 1510193289,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailNode must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailRetries must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: '6ax1y4l73n970oz1kb90',
                scenario: 'ytvhx9dintf1lgu23pb5gcl0az7hlgk6y8xn0gw6btmmandl078u006t97tr',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 02:32:03',
                executionMonitoringStartAt: '2020-07-21 09:58:18',
                executionMonitoringEndAt: '2020-07-21 11:04:41',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: '5yxfh0fhhrrbau53n520k92itaku923rnaggee4vcf3lss9nm5ja6ujz614z21rallqd62pegfe95chxsszv2953n08nywbtkkkiklc0u07gfotfnpqb3c7poadcdzju4f3hwnqmcdc3g14ftfef2zkazzvgyksf',
                flowComponent: 'u06gkd9rf0jqgrhfntb15ztohzkpns41gjzqwniqd9lqk8nt8xx8gdjv45hipt9lo3cm70yhvnw9yrayq406rfkz5t68r2rronob5i59ricidoti9plqkwlpr6c22kc2cpyrcwzaxvd0zson8eo9sbin1q4hz6cs',
                flowInterfaceName: 'vm6vd9d01nkrv7trlsmcmb326idf63x8ie40m4o5werm6fsyij77tkifigfx8k1sgf3cxcy19mxhkx3i6sodws855dahkk0l2n97toxssjhvykip4gxejtldn0i5k1uolx3pnwh4jge9gtm9lsgu8gvom2fb2479',
                flowInterfaceNamespace: 'q941102znejc6o4wx01gv01icgrm46cb252ayzi54k85d1yf25o3ok6csgm1yta8xnur0axi4f1q37nee3qbfprhnchiax0vhcbaay10n4g2p3x2ngqk97fzq7p4wceb8tbxv8rnlqxa754dr4jo46x7sf0wcwvo',
                status: 'ERROR',
                detail: 'Ut quia sed sint pariatur aliquid. Placeat voluptate tempora facere rerum accusantium ex consequatur. Et a voluptas iusto earum itaque rerum aspernatur. Consequuntur quia animi est deleniti vitae adipisci ut. Deserunt saepe non. Dolor dolor totam quia ipsam ad aliquam sint.',
                example: '7g2lutl72xdgptisrucwjoslaf493adbu5nc5m35ujii1318py4rbaqrsem6zqw65aqbxomukugvfz6np4pi56qpn2u39d1vx1p7e1bnrrvj1wkgrrm9df8epbwhfvpg9pcjceufqxjd5k70baska8hgf8yllgne',
                startTimeAt: '2020-07-21 23:18:03',
                direction: 't4c2zunpp7ye9s5jf6k6',
                errorCategory: '0gz55r4ortzu3yjyzzdejdvfw8rci5hixcqdnle77cvqiu4x1ez9erlhdhy4i9ufhx2488ngy20p3n7484le6ofca2ec2dn5cy8zas8zavhd5oux3jxbqpkxc1pid7p8kivnk5anawnggrioricux42yy1t4saop',
                errorCode: 'iunha9une3u3a5gqexx1',
                errorLabel: 'nkyl3dlarfy1nive0bz14dzqoc06ewfu8io1rf2hoeljuhd6qoicfj3ozfixs88zcouxn9lo4hjk30g66s89tdgul2xjuewhrdzv5yxzg8nn8x2di7uwaudmmzdy1bqmvpsje9lq8elh5njc8907oi3fr8cqyjgf',
                node: 7423945737,
                protocol: 'muhl8gw4cwy80n792ooo',
                qualityOfService: '71hpqkprum6q8g32184t',
                receiverParty: 'o0he0waw7szfojrhw165y529j3axold3f3040ydx6dxeglc359b3k05p6dynblhoqtolj1osi4wg0sv8icewdqcugvtxgksthmovcdguvplfj89lrfl5w7d7yk7enlyupllybnkgvnwp636qiw270hjk19bmaffl',
                receiverComponent: 'qk19dfgp551l7rko5dy5qa5rn4i5x830atuacpwux0ul0a5dfck8x1ga1ep9v1xv62hok883mcqspyibekckf4xzfy2j715a0b39cxofy0a9dkomoylpuwj6i7n6c28dg7h7irhp8mtv4x6bm87k8hdea9mme6wh',
                receiverInterface: 'ly4xd5psz6ewjmnw9v1juz8rm9l3hwwnn87zx7ep9zky11ehwrmop531iohciho4jk4m0bffjk5eh3doyiaw1m54sis7owd2sdx6gfigozjjefln9ngj24k9qxxwfm00cveuqcf2ed28r0bhh1wdwxcedviwf5jr',
                receiverInterfaceNamespace: 'xj2air0vuq3squumed9hye8zvepqeje2ava1xq5ue1gia4facnpkaci6ke6kgx2h5dp43lh90nnqhncn1pzvg36y29g4z60g6on9vdy7iyv5pv8jre24minzld37li4zggg9ufk96nb1gcg5p1n0vsveq5wvstm0',
                retries: -9,
                size: 6536167730,
                timesFailed: 1409963982,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailRetries must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSize must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: 'soc1gieczesgzakndsdp',
                scenario: '4u0msl06ve8kf9zn1mg2u532pi72masy9jgqwr6wgnnpryjg9dn8szph2unf',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 12:11:28',
                executionMonitoringStartAt: '2020-07-21 22:05:58',
                executionMonitoringEndAt: '2020-07-21 04:14:43',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: 'ci4frxajd9g7jw0rp3phiykzjjh2kssr1tjy9sicz33dkvb5l11ik08b0m63dxuyuui55mbct5kex03fb0eyv2i2nsq9igxc6flj26knw1c66xzg696utshayyaaxplgo8cstrcsgoy5eurvmoy8gcswz6g46ael',
                flowComponent: 'bc8j36lielo5tw1kkvnydikm9zn42u4zis9nd7yvsgwrl7r83hbx380tapldolipxg5fwug4qndfdkh8nl3ta3o987u60kzq00ew8ab0gkjdz6f19kcwh5e03ze2fneagv6scp9t9bptpijmue8ro6no2qvycocz',
                flowInterfaceName: 'te6aqps41hgfqh25bsa68q4gtbtggjjyromp7tj1ml12ktrjpy7gm2x64m3cr041icc7xehs3yb2kn68886enr97tsl5xp1sr6plm55n03ws6kfs7eadmpw9jtfv15dfl9snn53cqwpk2mq55y4jdlqrbzd1j4ey',
                flowInterfaceNamespace: 'bh3c2wdmtm533lez6v7qy6igv2n405csq00nc0h7kpxb8hc7s9z9au9i1kygnknnbn3nqrtmlky21ap78b5hlr28pr8xjbvixr4wvv3966nm20nf8abatb0h7w42tq566rszy6r5s061itycdfk65u47d1olntps',
                status: 'DELIVERING',
                detail: 'Occaecati omnis qui quisquam dolores velit. Corporis recusandae possimus at et. Deleniti est vel.',
                example: '3n6cm3g7uw7np6upuv655imwm26lmomdupawi4ledmos5hsca812v0a335p38skz5ymxrzoqw0frp0wa2ckq4wf77gh0n3mg21yepipcjd5h2aktufzcu839z9b2rl5dn7qznqi04g9sovlpr3y2i6cxswgm36o3',
                startTimeAt: '2020-07-21 02:56:11',
                direction: 'i5p2073tpijsdvb06xal',
                errorCategory: 'trde5hkp4pp1u37wzf8okr1z544u697mygjxduh0jn3z2c1lm9b9tv6cs6y9mdcx7tr8hwqhjadawcksfnb4g17ecfvcgnv1u144lr2nbenr1ra7z2z37d9gqh7ktxioaml1f9oze23pwfpwxuaj1oqg3xg487je',
                errorCode: 'zfej5vgkda940gae0ubd',
                errorLabel: 'u1c52mzyqe7ox0sp0iwg23rdzb4cbh69d4bt18uneq33llm7zahn4170h243najjig4ex3fc5x5c13nf5d5m5g2wq94alnk4wukpcs8mlo70p3qpwnpvq24ojst84xxijopu2o7yzultirag7r2swacqon46f9qb',
                node: 9834550424,
                protocol: '91aad0mxy4ja68klmlcm',
                qualityOfService: '0h3ifypcvxpc7b67twim',
                receiverParty: 'irca5gxqjunts6b92rr3kjnejjmc2ei5tncxhnvwpql2hsze6hglcvilch0xqf9azemqwps4ppsf4n5q4bz5p7dqrorxtzetljwgd37ayo4ml88cu0nnijux6iwrceqsjaxfubctamtlyuewjmmxlkngkg48d9yn',
                receiverComponent: '8xt7itpbw78ff78584g9bq45e14g9xf5pv11orrj3xxb0gyosk6hdlks88xc78b3e7b0ce2qcfbqh924ewi2a5qdpehcpe5tp0e4q7vgsahv13h7by94iz9wprl4lqwcsv0ab2qkrcb3zb9dm0pcli5vymrpopck',
                receiverInterface: 'oi660gsic0rrly2so61l71jooh3nhqmzyti03748404x8bjdra4bdxuqboir4r34wc2mwaeewwb05djkxj7v8cf99ihlh0udeba9o38b4yzqax3781de7j3m2dufzk4hmwjdw8lxbtvacbhyfnedn20gbgta77co',
                receiverInterfaceNamespace: 'qbfrr51meotw46im8exo5whz8h37zzxwn7uop7z3iyjo57z7mg8n3sf1b4pzgvv6ok1averuphmlvlkxnkzd8iun7uqin8g3yena7wwzylsmnafzfpp3wj5835jeg8y9rurs2fv5oh3t6ngb5xhwe84tdflzk756',
                retries: 7395555135,
                size: -9,
                timesFailed: 9052528623,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailSize must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTimesFailed must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: '4ro7apkewqzmdj7uouri',
                scenario: 'nhu3x3g879jbfaepukbtbbk1mz2uaz3zqnjewxxnui9t8nxqhplkay8fva06',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 16:19:35',
                executionMonitoringStartAt: '2020-07-21 05:26:12',
                executionMonitoringEndAt: '2020-07-21 06:04:44',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: '03r1w8q1vb51vsf4hvvcr0buso0sul211yejeuvyxpm3lf79tqaoquu5yf2s749hwlof9vram0t18ud6wp88qnmlzjl5tsr3ru70cxnp6mcudx883lyx707ypgmfzbdcqlchdbjk9s8wr1qoiuvee1q9yrav5zgt',
                flowComponent: 't8he2xp8r9p9tsde0o6g0ba78s18vrynsudnf0nffqmv6xco8lq5hmffkv86qflerl8zxlsaup8hzyvjqir81qd9987ibjyqij6ymqo99ce9c1onss78dtz462xlzyd4rb248i1lok9q7zt0h3bt4qjwn599ys76',
                flowInterfaceName: 'pvjlr214et1cdm0j2k27hxs0grrt5mnxd6ek6utd8s8a4jth1jknl78u5m2wwu66nt58hptrv8vsmw9ru2ykdffmhhy98rnwr9wa4dh1l0j2vv1sydshoodpnntsrcfdpjunex9vyoashgx1emh2u1xbvzoxe9w0',
                flowInterfaceNamespace: 'yesdt4hw5zwzgezedh6axd933o007846p9clkvsjfcbg3qgcrp5xzqhhb27409pr59djnqjojcymc9q4vrrpg2cc64a8euz5bykpujbbqjuipa3p0scgdjme5esu7xr7gbzrhdcf5tqdrt2ysghen96txfg75qqc',
                status: 'CANCELLED',
                detail: 'Debitis ut quasi ratione perspiciatis non et. Et harum dolores amet facere. Quasi quis maiores voluptatem consequatur fugit consequatur quisquam necessitatibus. Quod et dignissimos sed rem ex fuga debitis. Delectus omnis eos ipsum enim eius quasi voluptas sunt. Eaque exercitationem quibusdam sint pariatur officiis voluptas voluptatibus hic beatae.',
                example: 'krh8sr4c1ml2d3ktmh5krx3tp9ypnncn82zjzv4xp8li5cwiwp8bxdd5tbwtm5vhij37i2pi6fbwzy2qjrm2ajeve7iito9hhnuql1bnoibq1a8cdncc5x6oaaub6ue05oyr5tlik7l2jmrwyd9c33p4rfvfptqe',
                startTimeAt: '2020-07-21 05:32:09',
                direction: 'pa5hdauf6vb25c48mkv0',
                errorCategory: 'h7ac0x7n69jtkvpu8nrpktjs1sq18jkg1kpe7jzdn8q86k4hl641o5moalokcjbplonebx4czjerj7atqr3oo2a9vrq8etbgya8jug7krq6xh7zizwoaw2hcjgkvxkwlo4glh9kj6fcjd7g3ibcl8fxm810ond0k',
                errorCode: 'x4639pkgdfrpf403v9mn',
                errorLabel: '0q7qhga6qe1azb4ugwdjr20tq4se6i7o4fh6jtve5gchibhr2gdxowjeaqtv870teujjsxhae0wjsdwc9tfq66x5xwn9s1h60uk1j2xuq8lw1knsk3hmyxt06ytsp947ngc5zdppop0wr3svfekyucswc2nbom6i',
                node: 7345819827,
                protocol: '6ijojtef5cj5rvrhh4cn',
                qualityOfService: 'vhpdqi62p8ju2lpnprpi',
                receiverParty: 'eu3a5fcljhv6twne5fhwqzmu0z88hhod95qef7wy9gavtavza6487p03rs2dll9fceuawauxnq97zxbtyy2fcpstc2a6uq7hgaqjks3kgxey3su5tnukqee6rjr2yl780jtpud32fel8275tbb8pvo3p93a018w0',
                receiverComponent: 'nqejq2rfgqgxz16c4kd3r8tnmqauk6g1c0a900zgbfyan56o1lu7y5r62h6t771wg8o9yn36orj72qyqfproe49ohh9r7nqi3m4qpcqyflkx9qmsh9d6lbm0xd6fqabeiw8trxk2xm5lr3xtrp8wrsgkv9yak6ff',
                receiverInterface: 'umnokd6nhahjp85sxq7klpastu4n737bsp0dkxmm5fhiszm7b2s6clt46ae877lc0j9hv12n2cxegqadbo2kee8xml4e2vzvhcs992651k4plwiuni5h7dzlejkqj726mplueig85ifjb3zg4p2roox5x6x3fbml',
                receiverInterfaceNamespace: '3sai2idrrhmc449w3gc5gvnexipe50p5338bybg0ehln77beb2196mrovwuvojgzh0xvcmm33iay3usxra4michpqzwsprgh82z728qeyj9ooq71ccvvzz92go5s9m9dzki22dlh7weyv1q7y77rkekr7sxr9m9o',
                retries: 5030540243,
                size: 6632732700,
                timesFailed: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailTimesFailed must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: 'p1ilh462u579xsowj54q',
                scenario: 'bsh2lknr1bx30fb1i3ncn85ut4gdm6lt5kaha98h0j0kaoxjp9ruj3cs96a9',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-22 00:14:05',
                executionMonitoringStartAt: '2020-07-21 19:17:56',
                executionMonitoringEndAt: '2020-07-21 12:32:17',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: '6fm7ga2g2906zspi88eynvfp33gqou1i61ukm7iv5sodr1pvwled95b1w2fazgd9kq6ggpbf0vmg6mo7l1dpvoxd8xkhtzxqewcd1cmhcxiur6pl8rgl2e4a7pbsmhauyai8vgvjhoxxlaeykjix2tt0trsypzzy',
                flowComponent: 'whsq3d6ll13ee32n2b5gb1xvp3ofis5qy17nwznbybs0ffq1unzgx2fja8bmsz0tdkoymcqaxblg8uiyxmirswbe5ekclei4c135jnrfnnj546ix8yoga6ie0rbwg2sebpsoxlul9wbx7dniiq1ct72mkcrqytif',
                flowInterfaceName: 'p9jw76z8a7y7c9epxmnotuvhh2ikjqs0zcft8j52sxgaozct7859elwlkqfnnouod88a3i0sqn2tgdj06e5ubsqe1qubflv3cyctnamit07mjlun7n20ww83z6qz7r6p757v6c888pbuxnxb7zcrefjzrotbts6p',
                flowInterfaceNamespace: 'qqevx7i8i8fb9axijlt6mwruwqzajml7kvf0v9ez08fa0qcbt5l5pqsmsha3k9ffo1wtrwhiq386lgpjogc6s5jy30yy1ap48bqo9qb5nhjma1b6k9btmgh6h54kyh5yepzer3opbcaskqqtsb6gqjjswhn6wbuh',
                status: 'TO_BE_DELIVERED',
                detail: 'Earum voluptatibus illum molestiae. Earum eius ea porro. Sint a laboriosam ea.',
                example: 'ky1c9pr9m1xr68bsoadxxdi8fmze8pwn7zfy3vhn171in736o08sbxnzmlni6zo314gd0bmq12ajtjpltj6lnfid0hovkhewy3x941i5h5q1rwuy14toe835s8nxqp05azi7ulnjv3n9y1d0of8rp5a3u8tu260o',
                startTimeAt: '2020-07-21 10:12:29',
                direction: 'ypofsobe5yic1s0yaxr2',
                errorCategory: 'jw018cmsln3366splezht8mot811wpvlik3sl8x4lib71qc2c3ju77tds0mfxfpnsw6klgvi4aih0m7qnhva0xf6uidjcuowkxn80errba034szf14ywv4tntcxjiv2ypermgil3tsyia4z5r8k4vb5i7pd3s98d',
                errorCode: 't8nyhn7ei3kyyl9ix00f',
                errorLabel: 'vx65746m5d4o2s0ka8mjfa0bd430yvlrsoqycdldmxp587qzvu0kvtbi42vmvoutr6kn5hfqe3dv7a8yh8mu84i6nsikn6teo5y5qfng7cn09uoi3pngh799d1jg82bvoxmw12idr6wvcie6czvux66otne2tvz5',
                node: 2330216134,
                protocol: '7tgx0z1cgndzlbiwsrgo',
                qualityOfService: 'fhhev7obx8e56q3j435u',
                receiverParty: 'p209e869xdlxedoo0k6h4d3fvdyjbfu2nof7mkzndhcumlpimmobjol9w4fp2bqbwtm1tq8h17f28x9rbytkzfp2mytjhl0zihcgxuyf8x7ehfu566zx8bxsvp18qazxwcuf4ssqzs6a7nc2vue88ncqgsmwylu7',
                receiverComponent: 'ucuim5g2ny1ytj7guc9op3jxicz9xal7gfdpobcvg5h9i6q58u9g50g03z1ng5c8h65zum5vmxq3pfh78hot8kw383wbt2vobrnm8d52fa90n1s1enm6ybxmwqmf42wlfgp12o6ilh5djjd0v7l7cj4bniti8qqa',
                receiverInterface: '7rr6tsra61vmit3clnfq6fday5ou5khxvxsy8f3xg01ufwwgux9i4g5e1onjhbimnnfhd8rsqsoyxhz5yhbddw0b5sbquwnralnjjlu7580hz7zfvvnmty6fm3uj2rcu4k91ydyzlz7c4wjcohsan6vz2rsb55o2',
                receiverInterfaceNamespace: 'wglukugd30b8b4r50zrrkiwzf2sv40cyy1ln7x7435ujz3cjrfaxri12ueag6ex4zppjt5eqeaxwfa27ljz0s8h8g32yfbwreh8jjj7x144um1jvaqg4q455vigxiu254m559gt5exxtstfs0ohrqocgmkpxl9sv',
                retries: 9929112843,
                size: 7070089470,
                timesFailed: 1463347703,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailStatus has to be a enum option of SUCCESS, CANCELLED, DELIVERING, ERROR, HOLDING, TO_BE_DELIVERED, WAITING`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: 'cxxian1ft8wvrtl7qkkf',
                scenario: 'vtstc25z15rg1blvwohwufpqyutm6j5t8lmn5t5q0rew4dgw9gyjnzcgum9k',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 07:28:11',
                executionMonitoringStartAt: '2020-07-21 08:52:57',
                executionMonitoringEndAt: '2020-07-21 15:23:53',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: 'pgv7tk4ui374pfpet2wvr5col1qqpuio8pji25q8izk0uo5u8tukrg5an76rqyawrrchyggh4yu4gigf787uwcmqzvvp4q3pvxmz66mbx6lrynjybopffv4oq45norxd228rqv6ytnm4y3bhwdwqjxf38gy2htvf',
                flowComponent: '3g5vejsfk08tg8fr6a6ujafv4zxn13fkpi2s4vjrw42v1w31d5ktk1g9deimxyxo3vbntrqkia6nelo0jqzdkgxed19vy5bwsco4nqfdzo8z607miz9m9bwj74q4rhi0atfeszi3lp9jfcrlmofbtl2oyoj1tlju',
                flowInterfaceName: 'omf2mz1a3u2agfrb8w0mwszhtx1rygec8l5rr5a6otszn7sg4mqz8ccs8ld0lq06kkl79jt4tnj4u9pm5pzypt2tjg3cvdl3lvh2dsenq4j79aulht4349ia88gsqho69c20shkf5tuob61xnzhryxlipiu1z1os',
                flowInterfaceNamespace: '3j3c4acyuchectv1394kzavr32ejaeahfoeu2w4dk2jax78kmwuyr0mg4f7lirgrj78mglev6kw1l720wcf54zxqfs0tzqoiypvu0c8e4ces3etcbfdm4jiktz00tc0itf7stloaq5bx2jhmvlcfm7uvfaoi39ll',
                status: 'XXXX',
                detail: 'Fugiat quis sit tenetur velit. Optio fuga cumque exercitationem. Asperiores facilis ratione sequi. Sit sint accusamus fugiat consequatur quo. Repudiandae est sint quo ab beatae nulla dicta qui libero.',
                example: 'etuzo850fh71hczycxxxbl7ao57hjbd4jy7g0ht9zurik78fmtixamps3ci8uk541sq0eqkfau95tz28klla6l3g2da20559wl734p0joo0id5p88hlwy7lwqxtwevdwvd7zwqwzxz91vlbqy7ujzmja8nxttc42',
                startTimeAt: '2020-07-21 10:56:46',
                direction: '2o0wnwkw3zq303boso0z',
                errorCategory: 'pazp2x63dc0iekv76tbqhga1cljf832fmtxjmtqobhzwg1qunkciyfp1murwmytd5f52u7fwufbdksykyu64ad6aqzkyheme9uvnu1214kffp9hdxvnffexohre4cblc9qtutbhci7369dyt3b7bfcuw733iyuid',
                errorCode: 'xpxfkcvoj3fasxil19x6',
                errorLabel: 'k548xcesqcl5fvxryixkddbq5ic9u7fzu4jbhug20crer19mwhlulp9atr9pfyj2us3zgyxxnm4a9fsfd36t7zu30o99kgbd0r894mqpmpmevcy634e9hnag852ktkfcvkcgi214ml260rgohl67t5ra5shd7bi2',
                node: 8426459159,
                protocol: 'mllglf4hqxgaap8mr3p2',
                qualityOfService: '0b71haxgt7228hagl8jh',
                receiverParty: 'ah6hhirknxkqhgfc92uho1wnwj1d3o15gxalcv499ha2hdzuj9zj32vcmylpvdizf3asjuhh65gz592gjrq0wwrswikh2pibzt7esukylhtpudabfoxjsazzc4ylo8kexhhji8num89th74d7ndcyreadrl40miv',
                receiverComponent: 'f1r1t3jqszzb1uq5ptj6oducf6dpi6m5jk9guvh2idfeddc3lk11blmt0re7ttlu6wr21ltdcrafxztfgyfsqsxz45yjot5j594cnmtok6i03vzkoncffh4zc4wn0ukfjro8bpks3eqf9kzqbrp7h5bpe8ktteja',
                receiverInterface: 'z3g3sbjck7xqcwpkg6dt22g9z5nffio44to4nz99hblolhi4i02nxonpi0itubw8obs5m4dhwmjosahnwdb03kn8r9m229h3lg1aqgjaj1cujm7hxh8jfjn42ovbsbo9t2fxhzx6c8vfsz698bqwm4yeqohf4k8t',
                receiverInterfaceNamespace: 'fx2ay62tzlif6w6iq75fvhxg94g4o96t2dhavqetgmvr48hrohcwpp0ekt9rzio90m8473wz5gz9947s8igvtvy2965cjas1rjkh3gcw6wn4sy98clca8zt15jmy51sp53hm0544teyt19vndwtken26r3f45pwk',
                retries: 6776318824,
                size: 9377950237,
                timesFailed: 7865491131,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus has to be any of this options: SUCCESS, CANCELLED, DELIVERING, ERROR, HOLDING, TO_BE_DELIVERED, WAITING');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: '3movhjn0fmkk56axbpi7',
                scenario: 'a2gz1teai6x7gtchejlvr3akp24ljf5azlg9xtzzekiel6oiu3h15lr310m2',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-21 21:22:26',
                executionMonitoringEndAt: '2020-07-21 08:04:03',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: 'rhrkqcegot8x47lvt94ho6a8ytjqhzkb2aut4g7sdo8w05vofg7k4kzgpry4i7c3dsf2hn1yhz4ubqqsyfy962a90z3mqvjbyv4wmfs91r42qv59j3ssrjw0sl70vd7j1i6se5tr7u6uth99u74qn6ws1y2ypz3x',
                flowComponent: 'y3o372eki0mfi1tfts6gb3k5ua5qoxwx11alfz99vv3pns7l370mn1il3bwa8pvhnvjj1kp3iaoc75jxrowcwzgp5lyqyx21h1n42ncwdiv86az5gtqu2c1tng9lna90atdtbxmyvliml0bgu2do9abxd52t3v91',
                flowInterfaceName: 'ianf9y5hg2rxbvnx89m1y4jyritiy74x0932lw8f0u7cspqm58n7nqvt3yzbzj7hrf6ss9037yb1rc2d4eos7v9t0dsgkomjj5jy3n9bnvv8kk0pechecc6xzxa9v3tdlsozcgu789po4gjn5jq0rvuwhld1pmk0',
                flowInterfaceNamespace: 'tixp4h4tsz6r3q7nz3n960rod99df0zggf3j61j90nfh9s1n92hnqnntae2r62rlfw78ivpmc85zch8pwqutuq0xr3yno74916hjan8yco3x0z310ynq46swpvpqsecl8wqot4n55yohq22vo4nm991ot1mbcjlf',
                status: 'DELIVERING',
                detail: 'Et eum deserunt molestias maxime voluptas quo quia totam et. Odio dolorum sint non placeat hic sed voluptates numquam. Possimus rerum debitis.',
                example: '6krrqibhs0cf87mnnwyiai4s970fyujxj5pvt4ljx6zoqmlr2ctcdhbw1n3imioxtz20fwbjulz1nfxvzk8hx52cj5ypraw7xzqimq8jm582sjes1xv4z5cw824anxntd7ujjzavrkkw560hi4wklxp5v34kdgqo',
                startTimeAt: '2020-07-21 18:02:55',
                direction: 'eirni0ble67ya7xlc5u5',
                errorCategory: '4gtb78t9lqm5hvxa4cauc1vwftyoco04vzhys2nvexfky06mffcoad65z6l9hgh6zeu28elyetno4az6p4lb1v9q86jjhjyl4xrh9tebcqdpf0uoz0u4729uwpm6auftsk620yroomq77k3zj5nidi0089gvgywy',
                errorCode: 'jmvz5skqv8y7rdm10mo8',
                errorLabel: 'xysw3vvl1fmxhhgjkrps50afep799hkleiglod6j3s53r432bgrol0wd71gsyq1pvuuyo6qkttne104jriegoregcz558c7m1i1x4hain2i8h9mwpz7arwl2jjjpkfzhnwbr9xdl57yolff4jm2zialhdinxrtdm',
                node: 6049508000,
                protocol: '3m4mkg6n9lvhmv8d8c3u',
                qualityOfService: 'ls5uggajcb3p7wtp4hll',
                receiverParty: '1ovllhsg1y7sea1o9pry1045utgc78m3va0wq3mykh033ho56d8qc00pjdjhd0ehg6kfhv3j2bc6eut8ov7naupnphadkhk8ltfs4pjfx0n17gc7an85t0szzvn7r1luw4podutggmcabaia6for4gtqt0ofgmtf',
                receiverComponent: 'gzafaat02a0xpjmp28y9tsn76au0d23exvetdnyb3gx2ups9pr19g65k8y71hnmr6fgzc2gpchithiw3y5l3ppmwbt30yl01sm3cel3kuwpn3u4i4aby5y3wh43k63ekkpvlfe2b8yk12dip210qqcgqh1tnbtxm',
                receiverInterface: 'tfnzm7ze40ufgvb5zdznuuvr8lz0h7nma5x0drkzpitustb00sst50wwwalovk4345jkmmz6weh9ymt5vhif9s6ntw44i8dcz8g7zdsgrtrdafsu101lomq6s4gxf1p7mucyxzk9xf96shox8v0eefbxltocwdkk',
                receiverInterfaceNamespace: '7ynkie5h06vhu2t64xmpr50414pptpvkng33x1vyqatipgap2bjpxj5ta6fuusjjot4k9llouj2lbzviiy1sguu49kp9maafau8lwfvxj80ctfjfxpprvlexmtwjf6bzcn3smt3ltwv4j6v65burhyyzjfflukxl',
                retries: 8367458423,
                size: 8290779007,
                timesFailed: 9414499461,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: '5kziwyn8j41fyluwak09',
                scenario: 'xfttr4ow7bska6vxamiygux70vilksay30iodx5y3zagagh2tobbm6netesn',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 18:33:28',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-21 14:09:45',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: 'x3gmsegc1gdjrz5qycrancx70h4xzdqvooh1t4f8pnqy9ocqfq0xxtvnyevl5xutvkvqjvvrbrapdygxhxlbauzmfn2rrfb69e19zseodsdid5cbrec1to4zne13iv7d7p742yyiuf6gtwrik3plxu3tbmo6063u',
                flowComponent: 'up8jvmpxfyng431k6jpil0012ocu5jre486jiafbck84b8lmcxjpt6e1g2w3ob8ypew32l7l789uyn8tuvauh3umjd7arr8bjcr7nxi3kqscjzit4g0t0bc1f10jrt5cszxmye25rw0o36lcpjmpjzrvz1pja69t',
                flowInterfaceName: 'tufacikz721jueihq1x460awgc48n1zsfomkhnlkhoxy2dpotdekxwbyyagxht1zouxaqpe40iutr6xp7ouxizisozvnpmvubftsv3pc6wbk862n2gru6a1vi07od6xmywzy3ph0tyrvalb1dgp4z7rvnmpfwk71',
                flowInterfaceNamespace: 't0311pfidyjqziipkenq5e7cyld422fjfp7f750g9tjf9w29g5hfwln3hw8cmeia6ud0jgakpc2vc3hfiwx00zi7bjv4fd3tgbt3r8dkzl6dt01gu07cyodayzxwhsmlf4gagfopihbcouhe6v06s5a7kvfgi472',
                status: 'TO_BE_DELIVERED',
                detail: 'Velit repudiandae vel accusamus expedita porro blanditiis. Id numquam laboriosam aut sapiente repudiandae beatae cupiditate optio nihil. Assumenda sint sit id enim amet veniam dolorem ut. Est facere officia consequatur neque ut.',
                example: '90zt875iquigd24zi40i0mf5hkwbqkcdwls7d3iq12xpewngsbis0nhkqniikj7tk27qrwpxlq0tvtdjeo1ou5nlqt4b5mufv45bpdffhnk7kmhh4h1432i12dsxh3qs4w4f0ex3ipwokv9vv1wy6w2fpwt3kkdi',
                startTimeAt: '2020-07-21 05:35:58',
                direction: '6ndqzv55zue2afxk82uc',
                errorCategory: '08v606dhh23hmom7ngf8prqeztsjz7t37jqyxkuko6c1kqyy1g11xkq6a1181wfoyikka82n2g54zfhjne3610062p70wh2i7rg8rplld2waj7nr59fj9vjkpcmk0wycp93ikmaiqxmr6wzs2i1c0s085gk7sry1',
                errorCode: '8mvj0fi6gjavrqfcm807',
                errorLabel: 't4ncro5uc2c0esx7f0hh7sgfl6h1vwgj56drcsyy8m0z6cz2aapsggq00nirgi7b5db22kkc2zd9odwbvwyqw6nuonl0tfzjmhpzn6pqw3ael9dupjijqbovtv8v405agjji8l027t8uyrs0xris13ypxpxfbke0',
                node: 8931410681,
                protocol: 'lb8pjwzd021lnr8l4jm8',
                qualityOfService: 'ffu6qryd7mf2lemw1a4h',
                receiverParty: 'qo43kwbkww866ht316fk7p1qbyx5nvcfkl1k122anx319vtigvb4orqwrt8pmr84qgy1u2c1bfuvoyljkzihymm6e4h9zx94z4mg9nfmt9nlx6k64we0ykz8ea2hcdsklpuxpdn1l3e8zs61npmbklgu3kn8xay4',
                receiverComponent: 'qh3u4pwyr5z0rb4xdpuo5arf5lgdixm5cnb5j6q1qid6pxjlmwbr5unwtlirv50rrxa573p4fazcxklo86oo8367kw7fzgjjt9l3b5vc27a3o6un8gtbpv5fezm2h1ycac5ug4wp42gcu6en7uiumg9cvgalpimn',
                receiverInterface: 'x8gia79qtrreaeq183fo9ss4ui61tgtxmhiahm41tv0nkp832wgvs610h4syh65x8f99b3cyrnx3rgot6wtz28bnc4sogmugckrun3x8eab38e5e3jfhxyx7ku9pslf3ggslg415fwcihkoaxg7nutzs1s2c4b9e',
                receiverInterfaceNamespace: '6rgofv9p4mrrvcp2gf104ae9mdkdim8ghckt0rbv2vf1ij9e9dolylkbvv5wv856uyw7srv9necqyekwb5adu4q2z7afg2hbqqxlzgr5xizd12tw08986tm98zbcp0pb21fzswx2ke5ket1bdrodl467e3qsg5c0',
                retries: 7457587396,
                size: 8574769084,
                timesFailed: 9597447182,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: 'myf0knfg8zh6cmr8cvvr',
                scenario: '3i8ui3fcmezyhm57ufnlua9d86tob33waovduz4a6jfrtjhnab2sbsfxmpbp',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 15:33:06',
                executionMonitoringStartAt: '2020-07-21 02:42:34',
                executionMonitoringEndAt: 'XXXXXXXX',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: 'rpqgb067zdvohy4rzgzh5ynh2407z3mla374be89b4p0rgonjawrwdmubm2y6he8xnk4y5kvxwqzj9s2ywaxz2q5uu0mhr9be8b0opjelbkyt0wlbbrh5debxnrjrx29de1zvu2bscqejn9knwaw9evz7cz4yjqc',
                flowComponent: 'b57hkwdbfpnyg1n3l5moe066x20c4dr9ti5tzp5i6zezcl7yc5e08olgdaxlk1ial8cgmh1qevzcw3a7tofi0y4ogqfk11jd0tlvk5acy4ec5gmp4ho3w18nt8d7tn7loqn2lmd828qfukwhpb0mynlwlaieihjq',
                flowInterfaceName: 'fqpz1ggyougpk7d9id2dq8leu1gu6gh1u3kf6dcdod5bibarxascaqkx1d0inawv306irk3gavt5sml8un6v13oxktzvxao4rcm5yg2892atbvo1py564z3puaqu5j38xf4in3x56w60jekq8a685jt65l05vpnr',
                flowInterfaceNamespace: 'ig1cce2sql2dozcldeseh6l7513ixh22uw2mm6c65in3bt4yezjq6xtk0lvs0gxyfpjrekaexm15i247llmfe4bbzt0rks18hkrih8u2g2zs82o9ky7oe9saly1gx77nfznvu4rfpmfkkcznsm4xn11bsk1y1vbr',
                status: 'SUCCESS',
                detail: 'Aliquid debitis porro aut fugit adipisci eligendi. Aperiam explicabo dolore recusandae. Temporibus placeat nesciunt perspiciatis occaecati libero enim placeat sed animi. Tempore in aut expedita sed.',
                example: 'xxkj5xdga2nk8rpg6xvlj5gwy8gir5gus0ucsuuxfl9izb4uxcqfy9y5bpjngxdm4f9xb995f5enffobawae4zkm7utyr98um2ga28mc74vj4ylkqhnw1cnqv54hblpa4ezxq811vmknjqphwvw6t3hkgnl2ivpn',
                startTimeAt: '2020-07-21 10:16:20',
                direction: 'ptimlcli7rkr1tc0r038',
                errorCategory: 'bek9hicmtcwtf044twg8w10bnnwsfjxn3509ncj07ja0rgpy5w4dk2u92aiptdjk5nkbz26ubcjogy9g6u18js559wuqt575fpz62yi7wutz8axq1f0erfhleh1f2w1956zkxaciqeoyi8mqr3xhaz475euaioz6',
                errorCode: '7zgbua0gh30ib4xm0bfj',
                errorLabel: '1q65rd9yzpl9achinsygp8kswxosw500ee5qyesw09vv3woo1ogu7b66ehf78q10sgilazlbf29rspvayv7puhlb0ttp12j3hkebcj4le2x5o1ascns5669s4maypf89cr39gjp3gl3pboee05m00fhazpy4dg54',
                node: 8159383632,
                protocol: 'hiw85igegbsoo8ccqi10',
                qualityOfService: '8o0bfedlo7iv2h4rz9al',
                receiverParty: 'qfh4nntpgpiyk10gxxeo01sn0df0t62ldq78vyyw4kxzeic3dljcqusdmx5gj3rhg357031d4o87hutux1uo20j2ce5jd3b50ic3w45lryusy0okey7es6j5jzbfpcz08ceraw93qc3lxpf06unj7a8re38soz1b',
                receiverComponent: 'qvenkvu07awxxmuqoks9l8xt7npv6svughvmr32oco7n7bprea1gcx069439vs8a7j1nrzybek6b0ee30ogynrd2tp4t0xn16673x5gx20fgxvri4wflizdcihw7v89yhftfne2bl7oxhksri3pmfsr4gvjrie13',
                receiverInterface: 'f5ur6bm9d312mc09tvj00u54f8phiasf17tzv688i45b3f338bmn1z3utzpkohxjjwmssr6jfo8ifohimt0m1pa5ixq89glxbm70f3ws8g2en48sygq91xy40je8u7rrxw0x0p194j6tx9j6brrw2j8jc50aiexr',
                receiverInterfaceNamespace: '3h68a9n9u67c38ohjqs9wt2hmo2x5q3zhsc7w07q41ky4y6zjcbdtizu9mo2grm8e5t17s53xqlpa2e99ohszqsfkjuptyy5m93pzk655do53agcow57wcxdp75ijbz9lsivrsak4xa8a2oiptks80y32yhegwvo',
                retries: 9441945949,
                size: 9977857580,
                timesFailed: 2223729086,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailStartTimeAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: 'zbq6l3p8c1rp3out1ppf',
                scenario: 'j72jxkcqyz68ic22hk8ela82w8y17036vnjed9spn7jdn1c0wpl2rykoz26l',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 04:54:04',
                executionMonitoringStartAt: '2020-07-21 01:34:15',
                executionMonitoringEndAt: '2020-07-21 22:04:50',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: 'dj0m58djie3p36qee4mwuqt3mmnhsmb0xww7wts2khnznkls8gsa1kwpfy5a48rsr8atqidg80rut19mn58k3b2ec3o0ehgnnvjx2cwrnzs106olx4xildfaztmna5dxca2jfj8y169ik3r2apb8umi5zeycjen5',
                flowComponent: '0wfiayugf1m17t9vw5f4sj1rjhewdhakyir3esjy06zuc5nfm3y1rapqkw0blex0mmi1zcr7744f6musxy07ndfxwwhta83h7skp3rhtgi30y8oyob0aczhg88j5d4374yo8mhdzwlbthbziwt7tykinyxuasx2m',
                flowInterfaceName: '9tdj9ydl7x0a4upkkimggzgtoig743zz89un9gg13j081rupm8u6y8x5g0ll5ul17iiiwjpmbdi6ar5r1flefxgo0kupnqc7ue125hnh19bvqxgdpfb1zxrdfn3amtedrtnslzxg4qutzflq0ji7t2gdb31guqtd',
                flowInterfaceNamespace: 'hj99q1p7l48op1nz0c7owhtkmif2prmv5shm7megmc71wdul14sruv7trpqe6qwuchs2y6fue3zi95lx76jmc58otkh2b116jbaknqzuobfjna48u3hu7pazkoybnho3m1b6fnt1lwiio9c59dinkxyk1xw03tnd',
                status: 'CANCELLED',
                detail: 'Doloribus dolore fuga quis aut. Totam voluptatem ut assumenda. Possimus ea in qui laboriosam modi et ea ipsum sapiente. Cupiditate iusto doloremque laborum voluptatem ut modi et quibusdam. Quia excepturi corporis esse.',
                example: 'a7bt3x6dad2f9zs1zhkqj6m8n527jxnp03xd8ev5if2jt0mn92i07amvzwek387rhuogi4jokhvrpyf42o6i0e5ywl8nsykukekvdvoxgnva3izpzx4jwhwyhj1gfzjl8yh86afyhef85nktqtv3dol5vw2s4spc',
                startTimeAt: 'XXXXXXXX',
                direction: '33ybfeft1oo539cj4bul',
                errorCategory: 'u8xz8fzj0qpmt9i0n3rzuzr43q7ht7gu213vcxurkwo85qwufl5x8w6zfiqbj4iu1jq905apdly2yuzn0kdaveoy5c917zqxagnbf9sq9u5evuw5gcrw5y09neb4zu74s5f2r2jq6vnp8dnjqngle41zo2m4df78',
                errorCode: 'flcnvx5v2qbxata8u03l',
                errorLabel: 'ajvmy7liss2sruv4a9qvz7vu6fs1hna56iq076dhklpawrnm2xc5liuslb3jvavdv4jvutp1qvfa11gshucaem3x2huwhpjw63jb0nidswwi8kmyhra4sucv0fx6r5ozu7ropayyiexdjirnebdjc1lf2h1308z9',
                node: 7177207204,
                protocol: 'bso4p4t3bnwqfw8zfdjx',
                qualityOfService: 'umbd7fam5auxbweiduev',
                receiverParty: 'wdu03opf1ynwywli2uw60aco7czgoq7icow5m59rnrwzd75l9hh9sioqbisnw43maytv5bhhmmqivxa004ugp9z54jicw2rqvdjpoaiy9rd6ems3uc5vd6av1cag4b18v2syo8wzhxk2v3jbexg4pnwicxdwadrh',
                receiverComponent: 'fjw7kv76rwefpc27vp5dpf8ivvt1972fm37wifgxmf843uonk0uqorbq22scw6or4wfstc839pkvtc4argd1iodqe1ntm6rygkqkjuti5elcgpdobpg01l3c9mkmp6bfxf0qnz940a9vo6wonsvi6a6iyzkvt010',
                receiverInterface: 'vw81sffkr7jcb0z1l0kvxyropon9gt7yfdoikexpo56c9an6ew70eiumn6mvbk3lrywuhr9xf31g6js5v10p1un0fx3crspgxbvd9vrn19m5szufoc1vyb01b4mlyz2ptfxk8hkp6i3qcmeivgxy1zdcg1glwttm',
                receiverInterfaceNamespace: '7da5wfg9d7geoce5kvcgd2ibxrkmvcyv2mjo25818zmisqxj0dwi9ytm584u01wkze8emm6ptadfzry7e9en5z0uxzj15nxxsx0dcblenrdxm4hr44lda4qmssrweyzxcfccd3acmzokhfksg3ge4dacwuzjg9p4',
                retries: 6054302244,
                size: 2638492885,
                timesFailed: 7464424228,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStartTimeAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: '72o45g5o03qbty5tp50q',
                scenario: '2m95q9xlvonnd7imf61o0zv6bw8aucqv1scsi7fb3m19qhl2yivy2en06s3o',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 05:03:22',
                executionMonitoringStartAt: '2020-07-22 00:30:49',
                executionMonitoringEndAt: '2020-07-21 05:52:53',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: 'ubo7q5i7eweqasyltr26lv8p09m0bqoog9a6708l0263izuaprsylouyxp9cmci2ll9lxtrsn1gc8o21a1djl6qwwl1ggtuf5rtei07nogpseoxlg469o95kgovh4e0capfopiwuap43ykeyce3u7vyedl0g9auy',
                flowComponent: 'sc8g76gvf6wsok4e3q9yv53i7g3jyxzqreh8rnaiaii0b22l7rykg5lga55rkrb0r72qhrpgixlukmwa2l3v3w8uat0h7ahfyxww5zkr1ks35aec1i4xbwy7eb9ip0trdkyce10kurh6vx5s1ajyltsxgishoqy7',
                flowInterfaceName: '29o6ekqvagfcodapnp99q039g70hmuq13u3qr3ie66jy0e2eiyfilydq56wpmtjw2rb4071mvdhxuxnwu26g0e7elmup1nn0qrcna20xn7r7caim9w426o9312mi0iuaswuvu2ppplp5sqifkqfdyvoka8b8k1w2',
                flowInterfaceNamespace: '3yt9cid45krnyzsj07otg7g5dlfjx7n09p09ewxwkqyo2rw7u2urno64oqc69c8mxie3vy3t4f6uokp8qb3mjmwda48k3zxoqbyn9v0aaoo3gdur4hfuonz9zldprk1mvuch11teqd7i2nwx3swacge5a7506tw7',
                status: 'CANCELLED',
                detail: 'Et et velit hic at illum maiores culpa voluptatem qui. Qui labore consequatur veritatis autem quibusdam impedit ut. Provident et odio asperiores quis doloremque. Ut odio at neque sint cumque.',
                example: 'u869j4esvtp7r2rmkk8ifvhp3iz4yq89t87b9m5zzafdn7ivxm1owuzt805nvy66jej9i73jg3cqnbb2twxq50akfuxp8vcvsblkkydgn0h3zk0o20vn5i3983rhu46brzaguax8m0y0nya89etpf9o78dabjc1s',
                startTimeAt: '2020-07-21 12:09:35',
                direction: 'ix2fq92i9tv4b5qglqwf',
                errorCategory: '26s0qdtmn3w3nsiyh46vy9uoke7cr17md9q9ieuob6p5kkg1fcc7kv452mlb8erd6ec5frxpp3j6rx1vbx5wipcph0lut6vjjzl0xszv5zomxu0qlwsxrolf5wp5ppveto8ux8rgh57n1njfid94sk6tkbjsr6yb',
                errorCode: 'q5q91ldm533sm72t44b6',
                errorLabel: 'ycp7o6a9seniv6e45w0hcg84blx5em57i67t5p5lu1xv52igi5ekkq7anpned4gtn79fic7kfjmd0fxdes3mtjvyzdyrufo8e9zxerbkaz3f4ud642lx0xe1zqvbg38iczmbm6tn72ygxe6m7bccgwxqcqoaacq1',
                node: 5217537415,
                protocol: 'r6lf22tgzqeyjw1xnk0c',
                qualityOfService: 'tleeoqcmgx3wfxun8g7k',
                receiverParty: 'zsgn32w286rq1vzrwlh8ix8v2fua7si1gxdt4dsgm1ntutamci7jx9ma8pko57yy4n69mtvh7aw15h1heptj20n6uudgwj9emo1gxsb170o624c9rf7b6gzoz9q8wyy9ir5ijm912z9y78rk5xpw6svpnw9a0ls5',
                receiverComponent: 'q01a0dznyxir25da41wug02nxgpb8h9k1h2yraa3m41sw04duh8at5uqmcqg9eh6kzk2lkxb66as15xq013ywc485vo76lp6drup0m61jx2rucqrh5z8m3z8qoj6woo5xpoij4irlk7ih8vt89mrb0642zxd605z',
                receiverInterface: 'ohvfv19c9010ox4i4jpcjlbdyi9l59t4szyw8bns6nswdfilu0vw22xssxtbujuoxp9joq05yy9ndxz357pbwv69e6nwwriv33y8ab4xtvdjq3nddhe7f1tc7z3y3awsqephp95nyc3j769q5d454o0kp07tvuth',
                receiverInterfaceNamespace: 'zppv5rb71afhia1pzzxhugs3japfzj4vaoy21oakb1li930sia2rr1re9l099uddf9lfhgzv9bnjnlvzfz5vjq9rk3jzgark2xw6pthz3cujv8agoingup629hdf8ocbi9g8sj2lmdx7zcsme9wna6nutt3hai32',
                retries: 4371908221,
                size: 4264289630,
                timesFailed: 4512525845,
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/messages-detail/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/messages-detail/paginate')
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

    test(`/REST:GET bplus-it-sappi/message-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail')
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

    test(`/REST:GET bplus-it-sappi/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '5492a0d1-93ac-481c-a5ea-33c942cdac16'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '5492a0d1-93ac-481c-a5ea-33c942cdac16'));
    });

    test(`/REST:GET bplus-it-sappi/message-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/message-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail/5492a0d1-93ac-481c-a5ea-33c942cdac16')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5492a0d1-93ac-481c-a5ea-33c942cdac16'));
    });

    test(`/REST:GET bplus-it-sappi/messages-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/messages-detail')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/message-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '465a8a14-8a9a-4aa5-bce5-314c50d19e47',
                tenantId: '78e2eeb6-263a-47d8-baee-b9890c35f915',
                systemId: 'dd10b820-c727-4988-b78e-cb6442cf88e1',
                systemName: '9oggwk5g3ao1jo2vzwfn',
                scenario: 'ipf2quo96frsq9qaci378b8axnbl56vdvovv4ayy59t0smqti30z165fccq8',
                executionId: '6412afca-e2d2-4ad2-9367-ffda406fb6b4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 07:25:26',
                executionMonitoringStartAt: '2020-07-21 23:31:43',
                executionMonitoringEndAt: '2020-07-21 11:17:27',
                flowId: '77c76179-d52d-4b94-9db8-8fdf83b441e5',
                flowParty: '488uvnz2yntgslibn4h3t0ylgcyzlaa0srkpodhiflrjomtm870jav3ptk2mvbny3j2qusgev8u885cvmag7o2i7vovv24mtonny4dv2eaepukswzztthdo7tsopz42uupxfr2desbiif4yirnlvq6qkat3wu0hv',
                flowComponent: 'f8wojjakshfwk8jsttsku5kqvodqejgg1idsbopf1dajok8kkxflwltu3wfrmip3pi35ebqlz19b3673kf4py58782gfsfft3ma4qkfkccrl52bja215fc2zmqqvfj7x9kz4qbxs2m99g9nwporvt582n3r38e98',
                flowInterfaceName: 'yy48kl2g3w10iovabg7vz6unq4iud1egpw6zc7u6o1o0tnsc02vhn5bbbhckjvz94ya2x27610c5snf6j2g3votg2kqbsv8s4kb46ak5ylw1y4on5holtx6t312ytr0rbr30wp075nuqe9hhwcmh4a6894swji84',
                flowInterfaceNamespace: 'e598sj47rpayrmpmi0hl821j7xh7tgwb2km4apukyh2g9ptecsz9gxnf8f4yd8dn4zm0bq31rocmy0gef5m1qkplyp3bsxx6aderh45q9z9gqzxrsqnjxiidy0kqln9k31rsgkov732q8q7ffdekig46sux7avhh',
                status: 'SUCCESS',
                detail: 'Tempora sunt eveniet dolor. Nesciunt nam quos voluptate voluptas soluta ea ut expedita autem. Consequatur a reprehenderit doloremque quia velit mollitia. Corporis corporis molestiae minus consequatur esse. Ipsam laudantium iusto unde iusto. Ducimus aspernatur corrupti ut dolor.',
                example: '1xgr2cqvlark0jfsoqk8u63j0c3i0xvcryxkuyc84uzricjiqaaicu33b47tamsulp22uxrcz7njysjv9ppj2c341whb12ul5873j9l8ar2ecgu2il3exne0nc89g8ul8vfn2j1b3o1utiiuzvweyrk345zh9jgz',
                startTimeAt: '2020-07-21 08:49:26',
                direction: 'vq9urb6zneo0b0lzjln8',
                errorCategory: 'j8oot772l3nm8noomdg2wv1ddkvm96rc7o16kgdfm7wqwmhp2ld5c1hku9q7mvh8c2jsvpvdlu6k012tck79jae585pihj7e8if4efhm8j97l6grjkw7k9cq0msttmpk7el85iovt8xfdmcguq6bbn3wu1vh7tvh',
                errorCode: 'wkf1mtbtftb67oyofjul',
                errorLabel: '0rxyatcuodi05wkgfu5apsi1pjzgil30o0elgyxc5cqso582er45l4anektdvqn3zgy7t4l0mqbolljp8vco5po9r67ixkcpg28mp570hd10cfqu7hwvhp9udyowvqq0sq1836wwyq7z5ohy9hxy0hai70jmovd2',
                node: 4913865822,
                protocol: 'yz05rjav1yr2gx7q3l5y',
                qualityOfService: '5ytd8wuvepv99lepufb6',
                receiverParty: 'gowm47fg3utvj78um8pbf2y7rhrjhsod2hntm8endwqhylxzwrgxlraw5dw0572790cu8qk1ozcawbx1fn376gzqgfuxi2xgg2wqj57pdwn9ngijifrxf4we4kngao3s237f5vblf1n66mljp6c0hpb79szk262b',
                receiverComponent: 'ij2d9r703rfiqba7v2rc4suj0rhr30vlitc7hjjtgdh4ngo7wtmkyd65a5moql2mzsv349dgx4hpgyu6g2vzbrcimxtuye6kt2iwc66e1bxlf5ipbvo5libstd3wix8umtcq4bvjtdzwahg7e7mtig5oai8j349h',
                receiverInterface: 'aad66mya9dzfmy90wpr5gyy7c2gq56sx93sex2qiblra18y5r8qwdqffd0vdmlmdg924i4pbtynanwnirc85dw93tq1and8sc7pae81ro6k0or9lbjvzlbiw9qooq8t65lbjgh2v7we87m1sszcecznozvw9qeur',
                receiverInterfaceNamespace: '8da6azevuy7d39dj1wrqyevb3f69gs2jaf1565q1y0cxsocktw18mzuglk77yzmlzgbyn47asjxkormgc6se0cisfz8mgbqx3zd8ujzsv07uhedl1ja0w3rhdnrwdr2qi1nuvsxrots67mjbbpphd98uwx10fcnb',
                retries: 6169296020,
                size: 3566629096,
                timesFailed: 3699817812,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                systemName: '3nsaoev8wbch1gnlswym',
                scenario: 'z0kpa40bjzg9kjzso5wnhd1tp8jynw9e7tile2j0anqapspjh816ykirgyao',
                executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 20:02:29',
                executionMonitoringStartAt: '2020-07-21 16:36:27',
                executionMonitoringEndAt: '2020-07-21 20:28:15',
                flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                flowParty: 'fkypwkgsm9lbwmsu8tsqsqm8cw7rqk2mfz0udmusav7zz9n40yzdd9pi9uekc61428khqhjirk33wyv2u9zu2ynb6llqzqqaht4xdrtk3ggbaklormd58b3dvn176a9plxpy6vnb6cj79zco8lv6024fk4j1a0iz',
                flowComponent: 'f7g63s5arc5zcadoj8eelo8wvtzc5nxy7qlu8jgh3h6wdvzzjz5qgsf8v95sz4cnbnci548n16ak6n0dubec5l3iw1x5okgkj5kdyfs4dym9hiumngwkiyreuzcqdlj0gmm88hr0c46dw678jm3u6cbivqjw2llk',
                flowInterfaceName: '6igcu9m25tnruj8v9npp6kd2dtq8pvdhut5keqp7r29dwoeu7mq1l8nu9qcldc5dk6e1dyr67ws9m1ces4r0shmwfkdwwnn3q3gk2c0v54xc2nryni39lfblz0tn50xpdvfk48vo03orso6l1mvliod3puj4gug7',
                flowInterfaceNamespace: 'kkeahieup65p10cvravtl78e2h2jwzcktnl9dq8qw5t11wjl91aw809b9ln9b7tuxqp71uc8p8ipds1yvhoad5a31iq8y9ad7xm9b91y0y7e6mnwc8uip2wpdqvm4r3va9e6fjh7zgr85c52i9udobvme9kls78f',
                status: 'SUCCESS',
                detail: 'Perferendis voluptatem soluta et voluptatem blanditiis dolores incidunt quae nihil. Rerum veritatis fuga nisi et error. Provident dolorum necessitatibus amet placeat et veniam illum ut nihil. Sed et architecto maiores. Rerum accusantium qui temporibus saepe velit in. Repellat at magni impedit tempore placeat excepturi.',
                example: 'qnge3gx2izcia1jrb4wgqquqwm2932gs70f1yalj8uusotid7vpy09jns19e9h61cb5i0i2vly92tgkjs6i1qyf4cyw9zwa7n9mf4xyzltyjvmbykcjh7fko2to1wwwfzfv8ixnpdrqhttht5pufivoom7mp75wa',
                startTimeAt: '2020-07-21 13:08:04',
                direction: 'y5h2okai810mkypc533b',
                errorCategory: 'kw4njd95l7iga23aua7tfsm973tnxf1a92nhsxn9hvutmxmhjbjj2zbp2pv80m4ofx9wb1oovjg3ejdnne0r5jzrqrwfu40hdfgaa86beosvkjboxh9tonem1n195zllq5mpod2z08wyi42of4e1c2v7d8dly18p',
                errorCode: 'anhcfwxgk7ajf1cmynw7',
                errorLabel: '4bapzuboqsbcqiggtn54efqlh34cfczzmd3czk0iur1nsycd25l5eyezuczlh8kd80lpqwkos198ddbenkijuv65sd58botp99xqnet1fud41wwx4rytegz4k2b622hwwochzk478zgvas6ogte0t3gzyjtu3qlf',
                node: 3833799756,
                protocol: '6ct5f28glwts2e8a1wuc',
                qualityOfService: '2wd626qfox13c2mtuyyz',
                receiverParty: 'hlc5w4kwn7cscac6zrt2scn5vg11nkkk22bg23d6o1uy91ui0mzt4xron7hoqk756khycpsxpl6hbsktbibt2bzfdq14cg988puoeiuym0k4h5lx3mhzsgn7v577lj5iwa99fs4rxomcy2g0fnfkykjt2x08ftf5',
                receiverComponent: 'pldjiov5h5cykpmfd6qhvewpw2hifrswjkokiuiwerw4b8rtiu1c4xjf74p2kiosodq4baksfs2rwvz1skfo8471ggvvr0u6gentrvysglfsin17ukn5rismf70koqkvqj29ouylsstgbgfi15kppawlgpl2c1nk',
                receiverInterface: '9dmj7h5gthhnrprskxun4ge8tse0vbl9f9wxrajyrzn9usvgkg84jargczf0oc28lkka0l0kcbwducqqizbndsswhi5zgpz7f198yeilpn3qt51kz5esgo0sn6gi4o1bchww9kwy0b1ubw1ubzf20wq8fl2l3zll',
                receiverInterfaceNamespace: 'uiqy5wk83avw5vdq9f2689p8rdssbqv36mb1qen0bvqxpbuweoen3dth7yd8x4x95tva1sj4kugwjt1i5nr9n95x561p1rctoc7ceea2mzsha760hvxeagrtu0vf1dze37xcthgi66tjb1pklu92k4hmqmm0x4zu',
                retries: 4113689015,
                size: 3721044473,
                timesFailed: 1867106732,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5492a0d1-93ac-481c-a5ea-33c942cdac16'));
    });

    test(`/REST:DELETE bplus-it-sappi/message-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-detail/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/message-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-detail/5492a0d1-93ac-481c-a5ea-33c942cdac16')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateMessageDetail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateMessageDetailInput!)
                    {
                        bplusItSappiCreateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
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

    test(`/GraphQL bplusItSappiCreateMessageDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateMessageDetailInput!)
                    {
                        bplusItSappiCreateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '63ec87f7-84b0-4f06-b7d8-2d6d949d1745',
                        tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                        systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                        systemName: 'bl0orv35sh276u1wb775',
                        scenario: 'gqcfjvzqbsqhzhdlpmx8yr3tdz3hipfc297pmfbthz92c1xt53yd5gw69drs',
                        executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-21 23:41:49',
                        executionMonitoringStartAt: '2020-07-21 08:28:05',
                        executionMonitoringEndAt: '2020-07-21 01:46:34',
                        flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                        flowParty: '80duaidvvz026wd38u4e4zb2i4ta5ympdwcz1nxncux0whk5k6neo9w0ic4qiklaedy8e0q634szyd8t680iyjag6lhq538m4vgawd0i4hlnezo5aq25jja9kp1n8jxc7jbct57y15g6p38jhkrn4yjjxvxkcdpb',
                        flowComponent: '3be4j9j8wcuj71u43133qd8nfkkxya3yr5v8cm6k8q94am1w77o991q4kdmx1yy9telqzvwtudf486i3geun8m5j9ic7em3djtbzboj03l2ukjyew1cke47p1atwpradyg7usfsh82hdj5beq65rqx7a2krsrsfo',
                        flowInterfaceName: 'e7v11w2jaeamg2a1253auj9cnzpzg130zmytj73o5ykm85zth1hh2q7k27odqihark46qdw0s06ild6b9nmgtgn1728yrftzmoihl0vropyzbwyjgqavd39oa46n276mesevu0hdlsg6clmr1lozz628mrov0nzx',
                        flowInterfaceNamespace: 'lkwwn2emtil6pqvwl9ndw5no65dwq2g3fr18j20yrb8oitn4gxfcipwxoekgcoyvhoiyltujmz9qws0fsozcdsa4fn6knmgmc4zv62iaatuotvl318ybjns2s6bkq47r4bbazy0ee03fybjqafu877yx4v3quu5y',
                        status: 'HOLDING',
                        detail: 'Quo esse provident laudantium excepturi. Eum doloribus minima et. Dolor aut culpa voluptas dolorem molestiae ipsa ut eius qui.',
                        example: '4xus9r4l3l804y5zuwfnodj62hwk3x0d78m1uvmez9wrb3qu9zgb4vopv4vbi4l48mlrelthc6lu3q1as35cs9cbqz07c2nsowwbp4q8ghseakkdq0k4ojzyubd1z1uwqdyjqbs0dyh4a6d8xyew4eziss593px8',
                        startTimeAt: '2020-07-22 00:14:33',
                        direction: '1s469tcp9b78tfmaivsl',
                        errorCategory: 'bhudf85ck0hh471dcwv2ousp06y3fofjp93472k0mhiqav8dauzye0cx20u5juc2gkjmig7ik6li457vau40y0rgxz0i7vj1uxzludsp93gepf4q8kkxdrl6sn5s2n6pvz63kxkwlt482xlsfe3vis8zkvoxfm6k',
                        errorCode: '02zonpj5b7qh376y9lka',
                        errorLabel: 'z4w8kki7y083s4tqce948y2j81w1k2zagkqd14iw0qf6z6qrrdgptb6m3q1nmjpkwr68lct0faean9anw49nn8p1jo9sy2dvktfecicandvzosgbd4590u9zdvuekv81id9itv3o5g74kmhvh088h7suv5erwa0t',
                        node: 8165548094,
                        protocol: 'sse42mo7s568ht0aq47g',
                        qualityOfService: '3olu609r3loqp93ilp7b',
                        receiverParty: '6bhvc3zr0njkwc902hpl7ym4ek6lamioodo3r9oproq7tk4r4busob29a5dorovvzrmhc6w1g9nrv2vsx2wexudcmfo8i7xjsevjeor6btnwbjf53oe7mx3mkyvzha151wysadkzx55kpmknulcwuh0n5z8dxqgn',
                        receiverComponent: 'xs3uyw2w7gwjjhym500c9oi97mytuz7jeyhi55re813442lg0zxr1ax76gnzecizhwsokf4rb3mnm00kldwqcr49ugme08ld31nw35vjhv1u0ay8acuvlfghykdtkwidc7v0lx0ajg7k13gh7wermnyc0uq7uuvu',
                        receiverInterface: 'tkspol110wivilb37gwghdjuxcb7v3hy62aca6p565eua7khcukv0046agt57mueoooierg4n17y817u3r01foj01uv32w23cxamn6a38kw078zk6nayx8u00swyzoemyooiv40yl1kvu2287qarii52l8syncs8',
                        receiverInterfaceNamespace: 'ghsrgk27rykvyvm53jixodk830q1178g9h21fcokw7if2wy6ua6jfcy4znipompeye3jc1luhrvlqhlrxt99gxpn5jet0eklqxvxncbhk4ekzl1qlqenyf951hrtes6fcs9ouf7dzi95qx9kin5afa5zr79ykwma',
                        retries: 8823419715,
                        size: 7535489448,
                        timesFailed: 2407311414,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateMessageDetail).toHaveProperty('id', '63ec87f7-84b0-4f06-b7d8-2d6d949d1745');
            });
    });

    test(`/GraphQL bplusItSappiPaginateMessagesDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateMessagesDetail (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateMessagesDetail.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateMessagesDetail.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateMessagesDetail.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindMessageDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindMessageDetail (query:$query)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
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

    test(`/GraphQL bplusItSappiFindMessageDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindMessageDetail (query:$query)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
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
                            value   : '5492a0d1-93ac-481c-a5ea-33c942cdac16'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageDetail.id).toStrictEqual('5492a0d1-93ac-481c-a5ea-33c942cdac16');
            });
    });

    test(`/GraphQL bplusItSappiFindMessageDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindMessageDetailById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
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

    test(`/GraphQL bplusItSappiFindMessageDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindMessageDetailById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5492a0d1-93ac-481c-a5ea-33c942cdac16'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageDetailById.id).toStrictEqual('5492a0d1-93ac-481c-a5ea-33c942cdac16');
            });
    });

    test(`/GraphQL bplusItSappiGetMessagesDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetMessagesDetail (query:$query)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetMessagesDetail.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateMessageDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateMessageDetailInput!)
                    {
                        bplusItSappiUpdateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '6a8ba739-f0cb-4166-bbaf-f81e33d3c1a1',
                        tenantId: '58f3e84c-f866-4e3e-9f07-188b23835be2',
                        systemId: '7e5ee003-d8a6-4764-b09e-d94396112510',
                        systemName: 'j8cxb4ovvxz8jhj5ey9d',
                        scenario: 'zxofh1qbmsk04hjzksunrsfeuppfe8r2r0dyhx6f8ntb7nypu57gx8c5l9qe',
                        executionId: '580ddb8c-a26e-46f5-b3e7-ae6fb7904a17',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-21 20:24:05',
                        executionMonitoringStartAt: '2020-07-21 15:25:43',
                        executionMonitoringEndAt: '2020-07-21 19:04:22',
                        flowId: '4276e722-ba2f-4730-bd5b-db1d3e951ad4',
                        flowParty: 'rpsqqo5d59oe3r6650r3tghudqqz5n30qyqwuepil9nxx31xlolchkpehw1islrtz0z6yov5e04dkzwly8aa0mrgfp0ax0fut5nt60asyf6w48v52r983mbibxokwbamkrwhp1ko6k453kt5mc7k8ebjyj9x2mk7',
                        flowComponent: '14g8kqkqhtaft288l1rl3gmtpx9nhfcblzoxf6i5202oq4tgdvknmf3sfcy0uf1c2ifaik5y6oss4iykunx9x1vrjls4r9gv915cijh0xiu6gif6dat3qcqkmw0jqnuzr66egllxijvreco7hsra4ue7v1q27si9',
                        flowInterfaceName: 'xmqe4vr5he772sp54kc9c0wl8iwvgwav3iofm2uncx2u0n8bwttrnouycfzfe8sa0dy6k5rhkc7bxf4bnyiybsa90t701016kmr46gu7ouy3vvljoii49wrmozdt6ddp4rf5gviaz2ehm1wp0pu8laz9vllq96kw',
                        flowInterfaceNamespace: '73uy03yt7zmy7v02fy2jbz05knxzcund5b5ji97084v39u6f7n2gbi1ilb0qpyq03syjo0pgexi83cbb6mvzvzbao9m10hy58ohtxdgzx2gxeo4vpcrxjv3yuqz7jdg96ru5zk3en5vjiyuwkxo7kwfclks7vv8a',
                        status: 'TO_BE_DELIVERED',
                        detail: 'Repudiandae maxime ipsam. Officia doloribus culpa laboriosam reprehenderit aut. Consequatur exercitationem provident. Occaecati dolores laborum et ut.',
                        example: '4eeeludnc90ti0xv0gkn1tooia5g95vulnw728wab7qolrz0kg1i8fp36jrrqxwtiuiqrag5q4i9ax8032djl4qytqy628zjg3x7q372dc1krczwviiznxqtpxg0gwlkdm5k612o4dmc4i214y050tm63899k2z9',
                        startTimeAt: '2020-07-21 12:17:54',
                        direction: '0n2fptrs2s19n7in1lpl',
                        errorCategory: 'hpn1b68kcpo43rhcf7m2t7sm1unih6c1omnsm2x0u91d1bdh6jet5uf0ne6nsyyqtfuubl8u0pqtr1ocx2hbkv2btd9o8g1ku3fel6trpez9uqke148p91dj6jkwrd4hvxujzes4ozet0euomuxr94c2jhho1bjl',
                        errorCode: '5hnp91wy534wteqxudhr',
                        errorLabel: 'zk5uq7f3ekvc7zu0k52a4ezuqxt0tesci7md4xcoj2cl4pp1zq7g2mom9r8wbiwcloy7dtkuighzsf2galnhvhaod0rpdal4lyi66zhh1k60xjas1h1sa2n4bijnrh64y6opmakgr4e2t2ub7ng7760wnvrdozpt',
                        node: 9600838861,
                        protocol: 'wbj6b4oa3wclcoqxfo53',
                        qualityOfService: 'yxhlszjachwwp3h2u1lb',
                        receiverParty: 'dl21ezlwkw3pugmhhawnwwalsnnc7d0urtys97wify497zyy78fsu9u8jalmywawdmi667vljg2rjqhnt4h7hva39xk56dkt5nhja0tdevu4kf47x8t284a0q6b7d6iajblfsl85a8bewjv8mphipvkzu59pxas4',
                        receiverComponent: '1pfrfk0ch3fzfe1pvjhhfdeyzzcs9gla5ekgj2xfuz84pbu5g4y9nx8q8g09w45iaedke2i7o8y105udhzyesltgw07avgq0u5d2aolcnif5imf02ne8wk62tvd16hhmlod6ctq6eo6h8a9kku1my0rfxy0zqulu',
                        receiverInterface: '8wo4ylmmq4hmsz08bhrtoap5re8a45ct3yn991kas9esi1fvxsaphid43lkxcba3jnfzmc0eldhokjadpad0b1tc9xgsdz8r2bszr9es9opabjwuluvlex2eikwhje2q3nlbt4jzha9m8x96nzl432vwfsg46fkm',
                        receiverInterfaceNamespace: 'lzf40mjd9kfho249ffen1tsrvix6531hdrk3qeiofbusk3llwfzs70ob3r39yhjcv82ss2vfm8rtq83hha4hummgi9lre8u79z0s9q1i06o1vin6gr6meteuprd5y8ut1abv8v2pwqviebsibelpsfnct8d40kdf',
                        retries: 7023097248,
                        size: 8502947076,
                        timesFailed: 7078951884,
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

    test(`/GraphQL bplusItSappiUpdateMessageDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateMessageDetailInput!)
                    {
                        bplusItSappiUpdateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '5492a0d1-93ac-481c-a5ea-33c942cdac16',
                        tenantId: 'b24766bd-c188-42ec-b6f5-747b702185f3',
                        systemId: 'bf59205d-9028-4ccd-a453-f436c46f860a',
                        systemName: 'f2heaoahe095v5o1sehg',
                        scenario: 'qop6lslxeqgp3fi0mo5wn6vhgf2rbwrjb4ho1yjbjqdljrwlngzyuw0en9vx',
                        executionId: '389d64a8-c605-4c09-b81b-8262809c4117',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-21 05:21:44',
                        executionMonitoringStartAt: '2020-07-21 01:09:11',
                        executionMonitoringEndAt: '2020-07-21 23:20:37',
                        flowId: 'b98f55d6-c843-423d-bffa-f329aad7550c',
                        flowParty: 'zs5n5416b3nx5ixaw3j6zz45m1u6d0jiy2hzrg9prw8drirlz8uno7icshmq0aesmuskzzpg6tik9m08e3c58d3qfoxbkacpr9db7c5ygwa54u4nia24lssfcdwvxo9j6k3g4rlrft31xtu6hlfb8929m2hm4erz',
                        flowComponent: 'qqr83uhlhycfzgsk26zj6tzkvwkji61kyvkbxviualj1wxwauf8fv2fo31yzt1nlj3vs7prxb7idiuh64vx5a4swevifp0eyoq0ldqcnzop9ro1ikbeamfhn1ly54kzmto9p33rtv1hfabg588pk7wzkhax3yf5k',
                        flowInterfaceName: '63jubhr12zz7felpgcov75gtcplduh2vxerj2zs21lszqj0cfbfhphieuj4bmc8bp5wbpj1wx9h6dyopm3qrrx7p1s36drkr33lx3j3st1ae9pd569h4jmn23y6ac0ynqwbcy4bde8rv6gmd0ux525q38z5myvgx',
                        flowInterfaceNamespace: '1ijiugkb9lzxqrjs8eenlmdjddzlun7ll29trp8t3keh1898hbn5ubpe9da8a4vq16vunlw74e7e430z9n25fz95nccs5sh6tvo5xanyvf1l1at7mrmctuxq4ivu3xp4h45oxctfw8ope2gdxwglsr9nd3jwabuu',
                        status: 'CANCELLED',
                        detail: 'Dolore rem cum sit voluptate. Possimus ullam quasi exercitationem fugiat. Perferendis voluptatem dignissimos est quidem cumque officia ipsa aut placeat.',
                        example: 'u0ta7tree4sjrvexarxdxh1ouufwr639z1uzak9prx5kkmzsfzu878b6oqji9awqgijcc5jmky2yb4rnf9iagwcre56m2berm7z1ojb6abgdwd38wwoaqqp8dbuls011qiyswlehyyxtu7x9nsx2b8gwa53m61o8',
                        startTimeAt: '2020-07-21 11:41:51',
                        direction: '3pnoytc0athwolxb5fku',
                        errorCategory: 'dkp6kwljsdnucsstwzl1ydpbp3248p6cjwirmiva0xrqyfwpdsjcki593d48xqgxt6speg7r6g9bkuvffm3649za4gggc1gusy1f9twqt54pfkh2sanv85ai8fl4e2oau3rxoqh2fccf8tq5dqtj3scyyyxl01cf',
                        errorCode: 'y9k36lsxzeusjg5ubtwk',
                        errorLabel: 'b94nebx5ibx7kmmg6wjmmim99xtxki8xygytrgl2ngi06du7zh6m2gb0p6dowasqdw2bgpxxxtf3chhjq3l762ceufziw7a4j0qwalssbtkgzupatn05ab1cnxgpgyyzoru28rybab15ahx9tw78dfdbrokl05f8',
                        node: 4263103963,
                        protocol: 'r343vfwllh3dmm4bloj7',
                        qualityOfService: '0iwu7zktuzb0pmgjw33b',
                        receiverParty: 'txxtymxsrxmsyqhh37gv8naemp56zb2jxkqbupqv12pfcugxqce26s1qjlcm8df7srk49mrxe364v6n2p9wf62ohvui2ewzb5c95dzeoezhc1liw70polaqssymlu3fftl4nxy9fg4jjybozaz0excw8q66rr9xk',
                        receiverComponent: 'x3rekpsdzh5eujyxxpqk8bqexwsssgi4j5tfstxzv5qs9fz4uqdbv3eyhk38ilok5sf5r3q3jpm1csvojrxx8hpevqjzhjmwl6umn30ktck7ywxpb95k4pfg05ldr97s8ebgjg3h6vcdfjkfsg8lt8wxhou4us10',
                        receiverInterface: 'v12z3ebft82bsvict3z7kh0qwe9xkuz5sad8w8chmwagjb7xxxjwp9fcc0wr8wl24yi91vtsllpg7dlllwzi2cevsjcd4erbvgit6ig9z6gs1dp3ava5aalds9my62e4qpzjrje0zo3vx9glodt7jsxjst6a9upc',
                        receiverInterfaceNamespace: 'puy7p4ka58xkqt7cwsl3td2i6avjyq2pcib4qhsrzoq64gvk4p63ukdya9mya7a9rpivxfeahukkg2cftfw69t7ke7za8djkxycub1142ars15ki4fpnlbp806juqtzxllwt769kj3dqexfk1c1ht2bq0xjaypwz',
                        retries: 3222259010,
                        size: 5239938493,
                        timesFailed: 7373266522,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateMessageDetail.id).toStrictEqual('5492a0d1-93ac-481c-a5ea-33c942cdac16');
            });
    });

    test(`/GraphQL bplusItSappiDeleteMessageDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteMessageDetailById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
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

    test(`/GraphQL bplusItSappiDeleteMessageDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteMessageDetailById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5492a0d1-93ac-481c-a5ea-33c942cdac16'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteMessageDetailById.id).toStrictEqual('5492a0d1-93ac-481c-a5ea-33c942cdac16');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});