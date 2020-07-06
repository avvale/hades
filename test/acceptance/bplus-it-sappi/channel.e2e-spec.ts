import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IChannelRepository } from '@hades/bplus-it-sappi/channel/domain/channel.repository';
import { MockChannelRepository } from '@hades/bplus-it-sappi/channel/infrastructure/mock/mock-channel.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';

describe('channel', () => 
{
    let app: INestApplication;
    let repository: MockChannelRepository;
    
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
            .overrideProvider(IChannelRepository)
            .useClass(MockChannelRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockChannelRepository>module.get<IChannelRepository>(IChannelRepository);

        await app.init();
    });

    it(`/REST:POST bplus-it-sappi/channel - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
                systemId: 'f25f22cd-3121-4c65-9930-f5dea13a6019',
                party: 'd9w3gzpkx7tilpuz1ma98zlzz0ygwq1wa17lxkbikghnlezz18u85t98nstkmma31abidz29hww3po7wdh2404jp69lr8sr3fdxiqp2d8t7vsgmvwbh7so6lz6rjvold27dgnpqqdtp8gjzjioyaz8fyz9gtal3w',
                component: 'cx1pxswf3j8npxzkynppemusne7kfcbpg1hoznjwqo83rb0yw1hnxht2cuoi3anrjbor9fxa4dww2adr659d5t9xv638yrjsuyo6q1yhp3oqnh8ikv6hoi7b858rq4i78ida6cr6l210j73tx0mx22b25stq22p3',
                name: 'jlyq4gkxh8fecxlat1ope64cmkullvprpzot08s1hwzrvyrb8o5svzfzd4dyxtz8668vu0ywydcy47u7e0mqd8ugg788dtwql5fpilctc0kgffca45dnjhsk14z1nkae3g7rnf4h8xc04texppcx1x8vqvjuv8va',
                flowParty: 'm57ylu6narsncdo6ou7akml10jzj2pjvytyf3uriaeqz7h2flfphzi8was79uqmnj3ji1k6qsg7ujx9x58k85k19y8qqqqqkj7kasaoarzdowsfqztraxadzcdzw4a9jt9cqqsuqe203enfnepy9a6y8fxvzx6z8',
                flowComponent: 'spibav4x0rlva309kfncvt86ercbytbvyd5e9cdzgydqfwmpq29xyaczl5hw4clkz0e467hlbdvg5o40t3pft0r9llp64z6t6noffy1955lat1weplr2rqyhfwr2c0ywwy126bpl1xjdmlwbtupzl9xoddjjuwu9',
                flowInterfaceName: 'iqz46up3d809mlzgf5up8k4v9bwaqul8ogdx8ubgy2px2mr7jlf27ke8bwfp879g4ywlnx21fp8t69o1o93xgfqmyu7qt2d6eam8q6o0j9yy8oqwe17efda9z9imub2ocj3ymkq0hr4xw3i5e8rk09wnbzthit3r',
                flowInterfaceNamespace: 'u1dh06hoficngozsrq6rqcon2v4b50b3ucqiplquwfj24hjwatgphmvxzg80wt3m8a4td4cwk20g8a9wigvi602q9ixpfwrmdh2qc1ufybwi5rx3egnm4qeqov7cghfmax32p3mhcqdv1a6pal9wqblvytk3z0g6',
                adapterType: '7gggb42gro6blwasgazh29i0jadf3tjt3bhyeixz1ulloib9cdui2ll53uqe',
                direction: 'osh7z8qe0o7zln5tqpphew5bwzqb7nvg8fefkl54r3dlqiertkuz3b2iaa18',
                transportProtocol: '9zl6tvwzh7hy5au2woyoujumhoaa6qtdevm7aego1vajwmt973j6762aahgg',
                messageProtocol: 't1fa8rueqshgi6zgfvtoiftrv6dsq94wsz7uu4pdrg6ztc6v0gosbdlkou7o',
                adapterEngineName: 'm64k4zohwtuuaf3f0aruc9eomra2kbrwknyfybhjeeny8kkk0xwjrjslzhq103e568cvf8vbndbotigsom88xv0y8l163390nxzyzztgddgsi1su9invynyc0rv77frzsaom5jws5ag7qhtiv08k3a44ljfth9cz',
                url: 'da0f0kj5vfsfgujiyek9zi0zepxx4jbciqznqasz0qezxx0mohyb8hxivkg48o6qky1t3n4j4ihovh0gju1kjq1j4fi1m49lygoz22dtkwvtw2lhsell4070qsqq16gofeh8taunzff3h963cadf6sjkwztj2ccyx5vg4wxxmfcuodf0nepbl15xl822knnz2px9gb3tzuyg03tmp7mhyezfuxc0ywfvoqpav6u1mfid4ab5q6duba0kpsqnklqfftv6kvm5p0tqkvxfral0iqmxa3t3qp8xyrnc5be1fhq6ihnxsntrvkx3hcgqpdrr',
                username: '3jnvhofx46bs6j3irl40bm67ryn7thw87td5g0fl8zs417hw5vm6055ikpa3',
                remoteHost: 'dk9s84rkwmaf5siq4wttm2dumjtft0y60vf1mzybccyojmosxtdk1hnan9t41cfrfkj0k4ccht8tdimki6qe3nysfd9k54fx85y0dcpyfrkmi0tdtwmqzyq38fohstq0rho7ocnw5493s7jpl6d5jjmiw5fxcnj5',
                remotePort: '4cke1x4p98rfzmh5uzxn',
                directory: 'i6505eojuu1m742ytusqc5wfiofiz0vauz7iumjfmtmq6a04olz2ty2593ju9ty2avdeeytsa2bwvazl890vfj8901h786dy18avpljicmrkkdvz0dsvrzf3qdyo0pzcb8lvm8q57clyakfgkq2wsg5tb2xbl3psbooh96k0os5c8vv1df09xkgx6mk6l5xwsrk5a3h5u0ebjy37sf7ihig4njh4bqkoywixaosq4rlq4zzab1ba63azgnh9a8kzwdrzcnwr0cq9x3ywe4lcyrx1dbxb6zr2x6vfylfkypo042drh5og48ybyt2xynqsycitegslpzzdbgzd2jpuw3abnd2slqlf025m0hqr4nefxt6cdiljs80ru27skkacdqlf4asyr3cglgs16rxgwq6tqhd6rmwgtjiuhey6mcor2g2xh76pzh2a0mydmki8w2nq8xfexwwrdj2lbt7p9bqdcr32ll1zovs4k9n2ilzet6cu1ubg2ufnk0nkppsfrw6a68r36m6tr0mbck4ag05tilqqupbz4punvv5kbmkekogdlys6rclmmrcmrv0eod5yq4vuh2bdm96jhnie5lnbks6bkx7sknbpep7glf62hx2dsozf9i6wr1c2x6bm5h506dkgb3kdpei8j75see5jb2pfefqr0kp0xh9rmbttk4e0ugs3qxn7oryxzgj2cz70h0gpisdqb92wi8y36iqie59yj4i1sbpxf8z7k3x0ddheja95yr0vff8y1fw0tycmlfzjmoxq2u7nob91nieacw50u52568u7svhmfb5vsixy47d46wnkwoowb7oygef3g2k3p9xl6geen40qea31cywmj4q7g8asa1pxnicf7z1ktd1kpual2h0jntixf03rvwjs5aut4k1n70k4bono9gd08iwian88rhdx5oagauxnknq0kxbj3c1ccvpxapc24defd00xsi5rz3k5nr3m91mjt5dw5wyute2ro1fqmq7mgtefxadx00x6oo7',
                fileSchema: 'hy85nmj91huurs4fkkt3o71jerdcgzc3fxevhr23qbnjyzwry4qxuq6wvpr9o36a54g5jaut4tqwh91p1rfxhy4hpplj1r40s4gmkb2o77k12xd52oi8oacblx1eusezat0r7sgrq37mwa9n9qgxf0wx3difhovp3f4prr4unpye3n33ahiv8kfq8hfi50624oxmq5gso3jampg63aj0jiupbh01nlvehbuq1ru6nueg5sb3s3xo9uy2mi8q4t0651uvrfk4j0lmd6c9j74udwqld2xmhed84v21eh9jvdlblf6w2gmsk3n2yv2ask764l8h7d5bwb7jod9m66tyabozq0rzk59o94skmwf0nu8p1mches1hez8d3e6wuz0j3j2043afj18rgwfi9dbhi2lt9lo5wa8rfy7t6td5ymc25momj1c84hw7sojheaib12tcslwqixsj5dldc6tqwdt14pko1zbheikgdkwhmnnszcqy81cci70ypf8iqruk7dvblpmospqegcn0qdeayuepi13z0wrc2wvxl2ipfhbl4vwehen8g479554p7ve7ydb7wf0snabzdi6u960hq591ql5fzft7j3yh0n6yul586ju8ay7aiwl1f2z9978odxrndkmwaj88ou0ca93b0llzuyb4lr8b4vs5b6xm2hu57ic0n3kkm9bbxjp26pxdtufzlr01ae2xktg8no3xyozvjrymzzhkfjl5wcgrqv2o4hpu2m4atjxogje78tbncynhwyo1ifdfnk4rb40sa2jmv5th1yy2vjfedxh8koqaj6wlzbw481nwfjrkl4wsvb4am7hfzvdiyqzrye1h3oxwyw914kaqom7g7odkq4yhyjb1w3avp0z4bqkz7n9j0h3owv5g71dn0vfczw2pu3i314ox776cb413mhrx10twta93w6980klk9scqfkv4ccor231a5hw5j4z6zcg28yraz6477gjofo1a5hlbrn6hw7f52wogdipatr9xzb3',
                proxyHost: 'tvsnuh2kf0slwtj0pyhfe282nbawczc43tahipxcr41gvv1ejnm2zp9zj7xm',
                proxyPort: 'fdya02lpsvzfow8potnh',
                destination: '2zegxibt5dvfmuxiobrmuwacz2js4q6pr0pxret0wae71noxhurnyazo7xzopogn75twtbia4plnou2z11chcokfnj9p3ixclnbjdn0peiggsujmtu8rtbys0cub7osyr5gzgce6tsc0k005bomzmtwirl39qy1s',
                adapterStatus: 'xby7r12l4ci1tu11cvoa',
                softwareComponentName: 'fe0dkrldjy7inleazwkelkvqiuugcs9ww9dyp3id29xr0w50x5chljxq75wqy31yp4yq26ir9eonb2ma7towmduviv04vx179snk4cz260to3te2yvp3sx6dm2oiu7obhkav3nvve9isd6egbe2r3b8ny77eshlc',
                responsibleUserAccountName: 'em4la2swch7luiabhvtd',
                lastChangeUserAccount: 'omm29verbr5gp8nrq7q1',
                lastChangedAt: '2020-07-06 06:58:04',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
                systemId: 'f25f22cd-3121-4c65-9930-f5dea13a6019',
                party: 'y03jqukqhc88k23ivqp680e2rvj3dcdpnrk5i8z0f4eswyy6laarcuxledm6nx60uafjjesskctbyfzvst8wuv0q5b6oyeye4a9vp3gnlt9e6c6nr153veqh7abfg6spee55hbgwsewzm1z2ytukidpicrxhhdbo',
                component: 'mzit9tfjbfmo50ypv867osy4rrk01wrcrj8rda4jkpgnv3p6slshb063u3uvrfxgzol0k6u12t2zc82zny1y4fumhychhxcj3dimbv21eneewr4lcqdvchbsj8hbq0ewcum3x6dlzo6utbpyw3ukhbmzygeu03nl',
                name: 'cw0gjhp1cw0jqwdl6wtdwhda09wzahdt9cy0wsdia9c1v9hmz8clasnw5j2qtatmv2z1okzs2e1hkgsjho0sj6bhx7hyc1ohecj3bstt53lblxumniqx63oddz9nn7f16uq7xev6umjvvb69u6313koeqdy2z2fo',
                flowParty: 'kex7adn8p2wxu7vu92vnhnotppdc004puorjmmlfz0ztp1u1v6cfqarpbuyjtvpu0smtyxga6d9g1vktfb6w97yx7uprk8yl7kp818jjlb9rtvhkn9x67p5c37f462ejsj5bnmz5jwp4ewusw7t073gvk4wurt96',
                flowComponent: '2q4b10x48s0kk7zklgf24c1ho5lnou3n3qbvmbskvu8v679632cptrm8fyzpyxwj3v8wtl8vdtdfbluluxk8lwuithyhyoikefpt9sf0d7bolxmr4h42zfygno0hw8ps8rt403eh77iivs7zetxr85klt56trwnm',
                flowInterfaceName: '0adn4jsjuezx2cwoggz614g3ci8qckwej99kokwszb84ow3bem52pmgshq2o71iwd0dm7f8j0zn1nbprfdd763ccqczpuexztuw6mv2jp8q6jzg8qt5ipvknrxvqh84tgv3r4axebst56gvbssuq677t6r4l84q6',
                flowInterfaceNamespace: 'xclgrmuqm7cy9xx6h2xfsahrki332u9r82nptx6oztcyg4366nd4yx6qc21ha99v7me8wl8qvluyokxpzxhz5c4hlw7fezhkm1qwqzcpbyjv03jm7dp0yd4shz3l0yrqys90gedmsiazuy9ny6gxhxxltry4cx8o',
                adapterType: 'ypgct5ns9z0qy8x97nkj84vyftos0hp94rrlh5px0iom6fc7qwtni992t7mn',
                direction: 'ajjzx1nbzvsr0savp82rrhp20e96gtzvuf3kdban660dljtzcpws1q2wg9j6',
                transportProtocol: '9alpc4zz18mz9f8yd8mkazsrlyy6g5vs3bhrqw4flrn4ku1z1m7xpaaqw8bt',
                messageProtocol: 'gb4avq29qr9p6fh9yx5jt9gaznwobk7fytdu1vfgmpb33g760bn2kpwazlhq',
                adapterEngineName: 'vv9059d3310pw21v6lguye7qs2ifjnrqm5r8j5u65bbozogs8hrtob90cxi07t91716qk8py2543wu75b8o4n5ov748z4pwf65xmh9srufj06a7b429xma5xwbv28s5l9zqu5t903lb5foujl28b3h996p5iaz4p',
                url: '7ttl7vyh29cvpna5f8lfkgdq3omw44v12jz6jlqhkgigax6mvd3471041oi7y5zmkcr75kh9jp2usrikxuvwxe7115rywq2m2sh5fssq29yuli472wwqe7tdoqfb90zhmidqhowv58qzvib1r1mr9si4ucic6sprgbpn87awsfq88fs5sl6r5b56yixnbbef93mq647movqx2eofcevf0e4yg2s52grlwkcxq395bkwvjnkxri4hamr4er4t893mzs5shja6gqjtal9dui4x3rxwau7tx9tqgddqtkezh5zbjj3ywwo3dnhz7t85tl7e',
                username: '76jvl7w6r86l9r1j2mmudcn3w31qbm5lp2nz69rgr8jhte1x3bxfokwsx3mo',
                remoteHost: 'fgbw7ur1615zmc9vtib9ig62m6nmmofayiffffqd5xeuw0waxlh8v65t9h05sb39eser5akhh1syue4jjmphcbtb45l44fpmceuahu0uzqxat7sxfx0829qi3zr5n3rt1vkuvmjli4dac83hd3ech4bk5ngwfthx',
                remotePort: 'rx9kfq6du6xf0rdxpwoe',
                directory: '3g4qnkgi5oyr8nkdtgo179buiugge0uuzlt6sxl7tz30cu271u0ptnztb2tj7a9the27sz6occvmww2eh1qe3ic30a9bpx8ck39a64vk50sqqgee6d6teedfmnha776p3ldz8la2kr5f16tw0lqsntgdq67rqwef7w12lqfc03vfegpyz7owve5cu42smnhuj69hb1utn9runeisj343iwg8hd9lug51jlkrodnsz5mob93yffe6bkvkfr0y1lusgfose6q5qaoo4o17y21525xygqw2tr0k28rc1atd4t0hl9xcg1xn1ac9rdidjaf4xa18y7974wmwp3zlgjdzsmw12skbdpmqbtdhcfk8atu1y6nnixy2sg14xbo3rfimbszjylzbd1ujjlu84y2gz828up00lrcx2fuep3ezsm4ofg1n055qll7ixo33oehr65hc6gfw4jbsowetbqtt2fzs5l3c9h0g8e0n71t9quusd7pdujiicio72dwe77ne70u9oypstgw8klldoatzzpgze9mm8xlnomfwuq12khzh95m76r7xgztlsgtlcoyjrnzatykic1rm4ekh1uzm18xig7xu1tebsxsflmc8x0658sflrvth7c15pki8oe0ob30kf0y2vdfi3gx7ef3x5jpoteyabgo6edxawymmhhs58abmeq1tvc1tz22stylnmuoy7xdqsm9ch4fc8mq06vdtmcnbnv6dw0iw3pf4bwnolx8qwlc9nks8icmro3z76mukgnlaokxahhl52vlzlqq6dwqh472rj9xna0m9x23wgkt0hzq7mh9tt06w0mle3zl0258e1ye6fq20ya0yjpnqieppehwlevmg6jirlxhxelenxwzqug8aqpvqrrg27s9tbjdrb75ovl0yg7vcx8q7pptb9z7g40va4ye62ckqzkpaumqwbnucn90sy0txo8ojbekwci7m3dsar9zalxcqlzubwanp29efusmwnbw0x28ulfh32ejznb71qt4',
                fileSchema: 'y11hsx81ies5bzf5lcmno65kllm8k9scgddxw4yecq9oki7o8sta5o8pdhbhru7gyrcg5gtmnv1iixcmadd4vcwrljfr21yp1k536rafhvkz0y98ha7zkxhr73ezh959rb43wz002w2ty4a8p98o38ah4pn7kqxcsdsiaqtc1ko9dlgq6isdhcq4i9q5ywia4al9p8phonnqnyml9fhw5ihguq3elvc1u4pcvssjxyqxi42o9byfapblyaie237ecalf1hrhlp3zmx73kd15q2x6h1raqmkczrpsj3kk7ine982rcixqxfzaf7ilujy631fdqo3n7llkelbk183b1vvudd3kszxqpu4etwfmtkap41v6gqawxoxvz84y6kp6353o328wajlamcnw4rt8nupa6zp99tiqj8t9acusn1sxpin5xq9ekgsq6ezuyibtb9itoisjeh0an7dwuu15e7j6rsyhv9jty33ucfgrtlpyph337mrslw3xv210q17eu90oktpfni8xc6jrzjblz0bf5r2jxaajfawcvd4zwarjwx0j8olh6gpbljmt5700q8fqwacflmy29dqluxep7lw4cyl5cus28jtg8hrzf5g9z40kg9r7mp27zv2pun8dapcvo16hazd9rkm0ldt7fp012v2oavji3rs5bh177h825a6zv9z106r76j176u0fariqaxtpu3jzk2dipgmowg9teal6xcta0dt8wfojrrcsu1d6cq1l22ftxi63zuhate4egbc5fy5gh5p7w7ump0ym9i3d08b67upmuu0rh3k3k4sofktq0ctsxbwvsb2acgrhd5sxnnc7qxke0dit22mmiyw6qv5jzy37uofzt5iv454zxpyqyjh7zzmgfd6frrf77fsus2n7i9xz2iz5ujraej01k6wemihcj5z1tg40lwkven826e4vm0w5m3jjuwmdp91nmsnhccej68wo0f8xhqeyzkplc22a3b2qagjcn4wnmbe34w0epb7y58k',
                proxyHost: 'gu3qpsmruiwzipudbner32h6zhhp0odiyq6oa5uvu72toyt2jvpmxx7tk7b0',
                proxyPort: 's066f20iu6m5ouqe4gwx',
                destination: 'dp2puwcmwkor5j3y7zugxz4izk3cx0j0q0l81gp19lqmbeysig916a2dhs8kaqwj5ft2dbguoqgxgjlmtruvje1k1p1x3rpmybiqq0nr6ays7k3syfcgkg5hu7vajprl1b9cwnaly5fcwv6t3ysmotkdo67jd5ur',
                adapterStatus: 'oqkdx5j127ay3mn16h4f',
                softwareComponentName: 'n0qqhd9q5e9k9asi1k6kw89hbigonwwmc3pomrhng844v551acaz40blbdnh7bhwkchheng3416wx0a9c6axahxh90cs6gy9qg2kriqmd3aj8k767q0m3oqse4yw0zhtar95f8f7jark38fxubghh24ege3ezdys',
                responsibleUserAccountName: 'bhchmvu1sgrjuufuxhre',
                lastChangeUserAccount: 'ns0i9vtib6os60afkfis',
                lastChangedAt: '2020-07-06 13:28:39',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c',
                tenantId: null,
                systemId: 'f25f22cd-3121-4c65-9930-f5dea13a6019',
                party: 'sg2s3jyts2mkfkf3bjfzpsk1jlp7et4xuyvfinw8fskd71ogq898ug3sw7u2mn3zih142acrfn1nevx5z7xnp4a66eh51nz5qrnce91703tpkejc9rigyg4m5ubf7ay1mc7u887syv7l9nnzg51wzc8uouqpva4c',
                component: '175e1yc48venc3bkm011q78uq6jcpwfh4q9k5cg47f7yymzho98v29i4hd9r8thf8utqq2j0vbahjnwjld1gt4v81o585kcicvc0ute5d8b8fovso2asdqsdj0eglnu9dsv3no03qs29y4ldp7xd7jsyrir6xouu',
                name: 'lpcl3vwwk4rvilcviws5g34xtl4uhvxpng9iflhao0duyjdaoucxdmdvoinn8mch5m6h4vjhj5qk4fy4ijl4cilcc9dm0tm6xrgmthvw5y0wv3ft8z4y9askrj5w9glhfw5xx33mg5wk5bc2a1wa1phyxlul0h56',
                flowParty: '03mv2v9vrcppwm3on63fukladsqjkl8k8kir7hlrzt89z7zmwhlmp3lm9m7ze0y3o0nrxh8t26bz4rxzgdzz74okcwqp2j1ed7km34qwuqg3f66yeqt4dfaw3v2iamjm6js7gfyjvbnhyty1hxwmlhe90mn1irca',
                flowComponent: 'k7994quxs8l4cl3hn4kt7c18y1svror8jm8u49qq7x5evuufrdvncvehutey3oeajfeqlk9n8ilqzkqt8cgi7jodjgcn3v6owftjy0t5v1y4x11lhpgfpxrntnoee66k2fh1pkaqhar9flvoxef08tbdrjcxve0m',
                flowInterfaceName: 'wm32cbbjaf1y5qzne6r8qhausgrw0hq1hjowjxgdw4p03706rm3ld1nquuv36jhpc054720v63bhgnku0zfeeirp26nsv5pe09qfro7toy5q56r3pc09bt221wujizubmd3mrrjz8tm8wb0gcin5u1qf3nsqxbx1',
                flowInterfaceNamespace: 'uq9r86l0qebwlrnvhcrdcojjyuj6dhs899lja6f59y82v9yvth9rtmk2wgcb53vv0ejc8bzzzcr0x4j8gehvgz65bjsb0ygojew0evh0jfms93wp5tu5iezf6tnw47afv10xmmt3rr5w4csduhza4ovlpvsbsz69',
                adapterType: 'wstz0jgz5d12hiigi667xet7nxbcgcm1rolx38kzsxye5eyst4zpj904qt4b',
                direction: '15udkdl4dstti5yshb54onk4s6p3tearn656uubm5ptaqy08znwb8ttq5gz4',
                transportProtocol: 'bq2gtzs9ltm2ixjhoz9a5lp09lwejabsbn6sbnlkh4zpuzcfxhypq4srj9b9',
                messageProtocol: 'jwdh8dqojtp20c9bzk09vi2n5bz7vftdvh42k117f3an735bczxei4i02c8c',
                adapterEngineName: 'zbmjd6zi7c17unzd7c2lyiolti7r7a3jwkit6tuk1hcox0ur90t6r02d49xr97qz2oojs4m6tptwk8q2m4httjln8fnwhfv8ou9yze6x1chyjb8d0059aglyu43jowsg7xq4qxzxbtomjgld1uuzvaygdx5q0vut',
                url: 'fpa24xe64cn2hhmd1wdihmiml7auo590909qqzxf97ui4e97ivyx9hqmu8nkrot5ek8nz11ct1nl56ldbjnvaq102cyp67ka484mkt487voxq733xp32n0jb48gl9hktyvhegf0pmpilsbnos3a0uim3tyn3bc8pro75v3ogcnlip4ucx8ozqyimfix67cjey0ccrcexkqml7r4venrultow68u3rsfhwpnx5ivszopt0usxl1g8udsxtgacpyx3st8yk6v3hf5iwzzwzxzbmh2kduinqnzt5y1nkdqwuvzrljh8gt0v6j29c3pu7e4c',
                username: 'y5da63fo8xjf5xxz45quxqxmbrh2fumobibqjtbldq842xk42yc2y2zatbe7',
                remoteHost: '7h99xhgcbm063kg856ep1py0a4sgg9wuf7bkqv19m5noibdjl0ehdj52enk8lns6k9fulfxcq0hyh43z7hi047ivmiw6n2fap35spa3qv0fcgi5jatiu77v1b926k1ki8fwja9x2zvh026zvndd2309a6zv7c8wv',
                remotePort: 'oiykj6aoa1nwsnym34pc',
                directory: 'yys6for4n73v5j47vyg6wzb4amhdqx70oahwaesose4l3l8th0nj96vshp76mzaplqd3n9tih8ovouvzfcv9wl72dxq9bfitj1jvijg4mfn5etm2n3yqrtfec1drvnp6b2cxjybfm7umjw64wzuae8w1q4dtkrt35yz2m6ch8p7ijgwrumc1j9qookfysqtjb8z29sncivludyuciigevaeyld5n0sox7q1xqi2yky82vo6imud7pfl9i4h920p4vikug4vmtfltxibw4s82rcmcfjy6218l56cammy4oxpxlukkqkknv21qjp1p8hpf6o06y05elwgwxjjb95ajg5fk71w1zkhutsv47el5ch7eg0ad2bewkqpp1zhrpi8562z2e719rxcin1r6z1jxo6tedaatfqh1letw1ntq4eal9hcv9hqfza7locta9t471ur6st7mh5kur7rad6nry0tauli5nywcu40xg2oir96dbrh82xzpl44nnd5y52vlkhcwg7dp9qkkm2yi8oc153m6tw7fai3cmrzp22j4tmob9v82i0km73vn0ao8jumbl9bsidwv4oqgu481n57lr5dht4o5ca2c5ab4s7blje0sgx25sjxy2efettdbujb5fg11rko8wkuh45suop77e1b8tele90jyueeukx6jwp93ybq8qlqoihecvdmnh50cejw8a97cjdpzvzjdbakpp3h71q24ii5q2l8u0tdm2klbybu68q0jtembke5fv4lxb54jnckxbva2a2fohyq3ra79ck1xc7h3qpxecbpsrken97evqzx4i73aod8e3a1eg24qqbz581rsw42bvd07ke7h363pawi4wqnpu1bksacr96bsz7vrg0npzm4nzuuxtoldfkdipg90behgb6f1o4mnbfsnq0nhvm0tbkti6rv89cb8wqyl2dg6t2ba8wy0i8s3533vrrz9u8lvvpulrw3odbztdhsqwdh18wu75xbblpah1ymmwnltoxnbr7l',
                fileSchema: '0j0wfjympmcp4diqr10ii82g4vk4cchrmjea8rr4ns89fp6v2ehyucf14yns43rgmsugnoc7mxipg1gw0xbbv2zgz1mid2v5wpwciziv25e6a2wj5470mzy5l3i1qkotemoa4ttz2a8jjbjujqk92yly4qwn3mqxglcuxx9gx03uftskuulzi9ic6vdnb1grud37slyucimjmo2spgbzhr4wg8aum6pqu1t2lqywefnj3ycyhoza595g4tf8y50x4ryz3ivsoeea6k51vl3aqu34tf0hlh3i3ehjo7jw9xilztrpw6kv2tdtexgilffpus4zobl3vbdkg4r8rmc26c97c0js4dr9ky7kj4xee8q1sh4h63fan66melv4tfciac18kr4id9w9w7iu2kqtk2j7uu1y8cuha2epkubit1icfpiwylbjm4jrrjb36580igglghpgcibgzp3jlmujriq6p105t1awkplzgmidh17wbjc0ueb5x14theexq7pua91i52nm5j7wtn528k2mf6dra8dz6b6oybjh1cknlzuwgzsc48l5pke8ke0yrmwx0cgrrms8sp150vy3bfwing96rhwtdriw6pmp20xu82x7adqa6i6rm0bvhvffx9dz90hrd0pkoojougbsw9pzdcuaspdz7kbdgjs112ms9jbksfqhglqn9w3rja099mk4lcdo6xml4csr3mys966sw0dfld8fsyubhrrww9czppc90nbzu9w1668my42yps4ikyt6i11uisi8lnixakgfbuddr15ib880prvkmwmmq2m2d1qttq46klakaxmlr4mo029l2kgexrg7mupuhnrmcqnwcnqonw7khoy84bb8c3xfhj1g6w0wztlb5urhrdrmz8a6bme274ju6afeq04ynp9iphm5y55jwgtzehhg9hdeikrlxbv597f8z1upzc31p1590v5uneq3729gl7zsn7odnqimbwofffoijrblynjlin9n5lrh6zyjc9sv4j7',
                proxyHost: '79mvtq3hkikezd5myc2j5nnig8rypu34woov39pd05qt89vvs5ihd9qhhguc',
                proxyPort: 'bu2zs68xjx7uge61torh',
                destination: 'b7q34p246oujyk3n7p2vo97nl92rznxwj8zc32k94xs450c5njyv4w7f9lla6jepkq72etpt7b1uyikzldu4n6f1kcdbmws2ath8twdw5475acyqmvgv1wl543lm4g25z9t9jlrv5uw516i4a1th5aus1pqlxnvx',
                adapterStatus: '3c7ycv6ff0u7jh4wrw8r',
                softwareComponentName: 'xfsyxmkui344gsojehjq2yljelc1upirajnp25cu4zw8sugmnqblljqzt83ybnyfpf627ueebcd4bv34ibaq72m5i73cwdrke85t4zfv0bo5ez2o06opnvojh7fz7gaz7umbaxg79it801zcnbtb3ma2mhoa73d0',
                responsibleUserAccountName: 'k90c2gr7sw9vhvanbqkw',
                lastChangeUserAccount: 'g7moyye946adfs994brf',
                lastChangedAt: '2020-07-06 12:48:52',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c',
                
                systemId: 'f25f22cd-3121-4c65-9930-f5dea13a6019',
                party: 'oc9unh4llpbicg9oakc4gye77kvmu5wqftjew39ofaq6q2illugdcws8udvtuah49kzpzedbcd2t73gpdvr98h1voyalb6ew3y4klxqlcy32a0gjy1kt6ed5fy00zfac517r7irjkpxyivbjo9d5jc73nbk37y4r',
                component: '68psc9a23hzs0c7qmwclgrg0jhy2m24h90nmact03lxn1vx0mr1wnr5haqbk17cedkyjmu12o7zk575cbziwcwarpzn0qw26412i5d8eiaxng2hugmrlfr8udp77pz164905qspp3oma7e2use7hvfh95fpzl287',
                name: '9ze3gl23chalzwxphlmi1q1gll2ubew0vfq6o2vasybtoxdf5dca4a2cnw3wk4xl9hha4uy6byh9iykhm7lirh66zgmtjg32ekgyfaqol1afga58r3uwdlkqd2ovgf7uxav9cxvs0bo67xnpizdhxirg8qutbm1m',
                flowParty: 'o5ku494fa6pr3jblfrfsit9ydz3gbfjl5n1w29dxcmlz85bxot1orbdyitwsc5x7wr3t3ane7tbly5kc2tlnicehx2jqfrv2c07rwdsc8q9p75i5v9g3h2lwpshapkax51pc6funjqs16319qpqfunybo4nbbc44',
                flowComponent: 's58gh1nfrl42z12msf0fosznz69qqe10ezo31efngfksxq8e5i74h0lwxp4e0301qjn7klra94a54caocy2o5i9lf7ligdwsjxpkuog82aunypf4pbw8929nx19nmzeikqudvld6jbmwyffhxossoe6f7f3hto8w',
                flowInterfaceName: 'x3vptm8v1l7loxgjv5wz4qxyeuaan8u3rz9fp0vujybwihalvry1f7ncajq3byq0bv4g1gxqr3i17qz0lvblyu80nqvq5syvca9cbj655m20lc00sc0swnti47j2rbkwqiwte0dhrdv50m3y6xog28p40rmw2e06',
                flowInterfaceNamespace: '6wdl7hv9ay8m9cnbwc9kd9460l561suqysfgz5umegotbzdsw3y6gxvjlheo6ue9v8o0tpjtu38wz16h9mqfmi3ague90rlz1cjqthcqlqhrxrrmo1ct0ww6evuyrzkysax22r0f8wzjp76ut1wyszxjcluctyd8',
                adapterType: '2tb5cvd25leuuc04lg5fg29myt9ccziqh9w8uoa1ew09289xbbj2r9cpp8pw',
                direction: 'b9nycckutyzt611cj3f53bkr4h62q82v2itgrxfx6xu50yplu37x00pe0tio',
                transportProtocol: '2gew0z38dpcvhtjlcov3n7tdjf7moqud0szo67fjjoxvepiu3a37lnd94nyy',
                messageProtocol: '9t6virbola1biqe41hnkfc1w38iboqysv1hrs5xlaxswy3ls6sxq5qedcflf',
                adapterEngineName: 'z5288pid0rartsjpd39gymq3bo13tn5qu6c2vkm2h11c1c5krcj4io46khl9m9g1dzizpqewmsgfj11xg63s66ikb31j20q7sgiychwawtz33b2ffxl0yjn4a6pi3krlrvywfoxdbeu9lewsigkur38lixk0hvv8',
                url: 'k8o6g9pmoojbolm6wf0uhylc9zldtlvnqzjq8353p24skc0uhwjz4e5mxfceqh6wolbpm18lelnir3wj8kfl3jvniq40ehuumuovb4iktds5twf17wdp1z9kesebx3fd28zoeamtvhy9hdp4g5ki84sgktav5zi5alllgkkufltfs69xu10d6m5o5ihksb3tw53innwhu41ii14xnonnn6zeuf5j1s23gw1895fm6edte0eob5wh3l6aj7vzeir25fpih9n2rs5g0n5xwbzjubr1q94ke1ln4w4e94vokzk8cnkfj660gn7vxob7f5gc',
                username: 'w3yf6z91cqabvue60xc0ujjhnif6rq4lb36ifcsnzf5485rmt5qqg7ftxtan',
                remoteHost: 'nst8wuxvqcbmtfugw9t8aza5haama24r0h5pdg4z1p3flctm0wky20k5vfcel0pp6ztjqzlmk2pydgt9ueybhermj5h7o9e0294g1imlum7lp0as6d2qsgcjg7kfcxhuuivcsfg9kk2nb9kzptip19vd7st9pl6n',
                remotePort: '1oegu6inlpjuhr9ft0xj',
                directory: '2m4ffvrqxwvrid7x830i7qanypb3xn5x4eqm1w2uer64umgw5xqpjc5yqp147456f1ng315296cyd5sa0oaddbq5e8bdr6j5c22s8xkt5hljda5poxwjsfqf8xik4ck2lk80m4s99ddd7qfg3qwu7hothhvzwp7wkdxzgb5boap1dhwdy2manakudrmkw7wm0k3rdztvr41uitcoh2dfcc4nwyri6f8c5jwbfo4sieevev36mcoyizcjngeh7805tnscpenuvati60mxww4eo1pfpk45c62n5b672h3qltt4ugh8qth4t9dyh7m38rs12nup3cicm9z2qik7ax62y7xr29mq655u04dts428g9zjmwl159cb5e07859snq5ubr9jcj10d68dx19vhuit9b5k32m40pmdvlhsbprkbsmv32wgzxd3fx3olvhd2j82hu5f8mh9a5kwe5qr3bjr2lbgdjvb2gujuklx20ulntoj8nlvv3fhf3krqpeog5vowfbjgrzumfuptvk3jg24pe017spuzqxuzwowy7ycj015i7tb4kn983d3zat8r7tcql595jxsfpvakguyxho4lzagsuprk8o871qg1xip1f7dh8evloxzrs8wbr58b4fvpqfibxh1vzl8904vf0b25yvx96mwzti41s8wj452xempzq6baqibg71hdh8mtki1hsmbbrtqqftu7prw81upqi6unnr2m147kcpyuqskpyntpgovu2hilu6ze80p4vfdrjg5ridpu276we6lycecjhiskjbb39naj4q6h2n9g5rxlh5m72adb5bd7oxy3yt550z26vaho559ro2xsoyedyhhxbbbebzy3v57ub5m7d1vw0dyjkjmo8dswwyofn2c3cfhy8hpcspcuqfpbjfp8lwiy9r9jxd55tq64knttyzbphr2j7asj9hgvfulmpr4uukrlfsttfrxnefvmpprkm5lomfal6vr2on2lxmtu6wynffm3drqi3rc6gtq1m9',
                fileSchema: 'lxzf3i80f5ovmvr7qpu8bmulji90dba2mdjwgaf0dcy7wly89x5jocao8zmu7snbn633o1l6df0su9ar8qqu4r2bviqxam7ejslgsqym1m1zwb48knekg31j6pfbp5qjeh7zkaec4k2cgatz8nudhl8qkrcpfz9xsklss8bizmta4blvi0jq9lkxpj8stqil5st5924fog08xqi27a6ww8ted59o1o9cu3h6yt319kubaawqvtcbezsw7hveyk6jme2vsu3b7qb8ldxyofqasrcglo5gorr9kqle92hacsi818mywyh0hdk3loyutd12b898yeys1bx78ryey7vxcm0jkzghshjk8ru4p5zojuun7v7067wwx2icbg5uoj6bgdf4z987k2v0o0ozhg5vlom72sew55mcvtkhy7dukeuq5alqyux2cyljbv70il3o1only83z4geoxatvoewbf8dtdrbz2mpptl20yigc02bg4ul0ja3df3j7uxoqpgtgljvxidvmlcj6btf93jwdfwewbe0fhlq3hsrwlj8z2o8xi59d0shh29z120973ysjmjfinpv364hq2ka5q4vg0lh9ncnml497ikpf4ab22t7o5dxltkdatmc065obgo3k9uyulcoqcdpp4byt32a2ytljm1l14lu1wjzckijco890gfahiim15q24e2zol4wgawwbdc4ys6dbhxoszjj32xcoikydckem3j2itwvg0d5v7j54d3eljlj60nn7y393wsd5v4rklho9c5rlxcysk4hly9v8wv04mh14mlhr64oshha5fprx89imgyhjfhfz598bfxmfvz3atjkb1yg6arel408v4tn8gaf2mjnfo4i48xbci64ziz8rqg8jhri700kmow8dzmbbkqzavi7q8apjmotuxt392d7oyu9fp5rnrzyygeraddehpkwel67esw4u778qs1anp5vm080ema4httxk85yiyu1j097rt2rrb0ibo01rd1yzukdjly6',
                proxyHost: '2shpcf89fehyxq9gt3o4vtxvzvz7uja99f5dyieue5boiko9mhef94sta3mw',
                proxyPort: '87yniaws3z5bhhbijgi7',
                destination: 'q90dhl8e5kjiodvzm4avd99k5d8yb6dvf6x7m37kn87m9z8eryjm7e70xekx9jrpgmu5p7xrsdpxx3pe3ts1cevsqjiio5c5y956sgns7h73kyc35e1b798sw22uh2faccuh1mef55lthumpcjcg34a9iin35sis',
                adapterStatus: 'wtmfkdfzwmkyo9yifz8y',
                softwareComponentName: 'b56abd8m41layinjnkx10nb3pvz0g61z9ze0bo2tex6bgst7zirknc0ahlrvs7fjhmmogrk0wo8mjb46twlu2lqfe6dygl6hran4hd471ehthyv24j632aw51g0jtk0jnbzqkebic1eokdnyjur885s6w6ee5n25',
                responsibleUserAccountName: 'i3b4pp59nl9ehupi8lgr',
                lastChangeUserAccount: 'wizdpl8osqn33sds4iy2',
                lastChangedAt: '2020-07-06 07:12:22',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c',
                tenantId: 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
                systemId: null,
                party: 'rezd1aeumqnxknll4d696325k2vr60g75k2ihw2fmletjn7eflpsb0miqpvu64h21rg24r6j86yrok412usy5bl08oczuc5yc8rioh13a47ewlsbmx23stpg8p19m4i0qlkw5a6k284csf2rz90elf9a7fcjak4z',
                component: 'l54or98r94e0rq3cmvpbn73d7yev8298uu3l8stzzxztf0ugva6mfbpbpr0qibkd9z6jg01eyqebw9zvpzsa58f7hzxghywkrdbivpp8hrkudaejs56j7wdqfm8rj65t69bwlxm9qu7anp07tjw9s2k93cwy9f3a',
                name: '83mh6a5fxzo71y8gl40hak7nx9156nm4bini852l6u1kwtx7f9kp03l73nwgr5q6tbzd5n0dg268lrbicai52qfjpzqneatj7n6u7yfg363iglxkhc7h1meg1orkfkx1oxvg5zkgxxmgdv4sq6zk84uw8ktre3lk',
                flowParty: 'jd03a5vwc99egaw2vziqo12sqxs4co8doq2knjtmbpg8nglzejnc7h3wumf9vjmpqjb75u5ut64w3u4egtycqi7uoplt7zsqokjaedpr7dk2os7kuroz3d6i75b736l0pxyfzamvpe6j556neu21smhf1ffw9xag',
                flowComponent: 'c8xvln7qb3yt7m1vok9swrii13cvj235wjmxavzju6nh7t48c9rsmbcdsf2isqlouaii25xn29agwprdwsqd43u5vmslzjmcz5beq9fjdyj8gygfzqfb601m39tpucndniai32ut6u4wa8a7sx2g5bsekvemnhnk',
                flowInterfaceName: 'iohbbtt06yznmk9rwjuf46wnft2wca3cv4kwhfpb2of93mg5o2ot5ueurzt8u8zg8r97n5zo2ufmxx5nost8j8inl3vsi6kzjjtkvv8ndmkamlah4nz53oxu5953trrss7wygpzpd4im8ru41g6hdyts2dppaoc5',
                flowInterfaceNamespace: 'hfcv8nvsn8mq7mn7jemeka34pyjyht4erfr18x0mrm4m2w3e98h4d8zhysln9x88ywhe4cm8jv8u8i8pgq6o2etgngp0nuiluruv7ssembn2aqy686w77gclevw4o6l736rney6bnmo1k9fbs03hoy0oquhk8u8t',
                adapterType: 'dxa8tsn072piz8hi0q7txea14ghikdumo4ciizpediqxz5scdptiezs9jhuk',
                direction: '23t4gdn1yzvut4dnibpwh02eqz3cpyctx9s3htvj8org75vz0qo4pzb61msd',
                transportProtocol: 'khdocun57ov2pzwwup8f5brvu12mgpohng170toetf0le9w53g6k94m0kwmo',
                messageProtocol: 'ny7pqq4vmbjws8otazw7dinqnks9ax0d3enmp0vsf6qnhlcufqimd3wnmhtv',
                adapterEngineName: 'nxl61qo7251t9c5sr4fakt3cojprmhl408y8zfwwzt3vieqbzndypqftqhys4997i36fdt5ovgwncy9ejh4gv991ixg9lc6ckvrunu1qm8qixhagq14459jzyc90i6rqbi7e3wc0akzhi3vkvp94tld52t3upvh0',
                url: 'i321vh67yqkaz1q74kesesb5rz9z29omtjfix2xt02yihm6lrgbm2bn96hj78httsnmbommr95ow87syw5yu45295qk58a3qccfj6u30c5as3udo5wxv1ptagwbzmzwo0b3h50d07ofz3jlel65ce2hgbt2krvomym8dpkdyw9icbop2ybq0rk6lg3f1ds45mrmq1tlxqx03er4hdaa1zwv70umqd0v2fe98f38dtzdvj3tugotakls0vrj3351jy8zq4w07o6lv6erj7teym1nwv7ui8y0mrnc2nlaj5qzbd0x2v14qmeguzmwqd0uh',
                username: 'tqpwhowdt162febptou39r6zgfld35d1v1t5raa81oi3vu6uvywki23420yo',
                remoteHost: 'wx5100i55x0x7w5gvn4yjn8n2mj5xx4kv57mv63gczxdavzh34hev2c4ws9ze3i8eb7h8p0bpwerjwc5jnctn5wjmewa5p9e35rgoq5zd8e3st1j4udtowog0qinwfbe6rufvwfe3f7dh85hyg7ot4cq0w2rmj5k',
                remotePort: 'ed6wxwrrw7jlbd14nz6v',
                directory: '4cjc56dojah6cjqcah2mx5ysm890xlm5qxjcps3xixhyhfk3gw3yx8dq4nfjrunxqpguk77zyoldg396k71i4funaxmi90kz2fnj3nnljcdb9ystf0jvollbd1vkkz8f564dxkoumg9hmh3d47wnj7h9axa52vu6pgfh1ya8wylj8woleupq9ztx531hay7u9h9doqu3c15b9esgwq34695ogwluuryu027q71j0gw0e7kh8xku0zh4aldppwkpsyuvklm4xmm4xv4y88hgqzkdifhtuv8zwarnwzcola444yjj6on6zvw60pxh3rtgqc1q6i4i6zgc67msy41fgcxqrv3cohpbkoym4nvdu2rkfnyer9kgqb3frxkkqzbh6jy80s82v6b67yyg5v3j4m0e0cpi1socjh7bwu6rtzwwu6xl2awqyyqqcqyzs30bj8vyuz04zi40m9or2gvggky881ud20o95on25h7jv6wi7zdda9a189c5iln9y4askdcphjkuzeqi3sytr35blwbbkxa1ex17p26jjvtoliwwznvy6f4g2cqns5enjy58xhim5cfa3tmj1uns81nlbk4c4ou94hl5ic9ujmufnkds4crqc7co1avotu1qvsid5rd27uu0sydmgrovzrxzf6z7qygc6fqanswm7qp0lb6kby7queeeisfpugtglfcchtnyoensk5cyqqp2pr2nklk8p8kq9p5fv8997zv2asccgyv9fnt3i1fhji4lx6gol4ysocx4wti7ve2edhe9rmgd8yeg6a3e6aosy1xuh3bp9wi6pzna3yoq8doj98g3qnqvcep984q9hlji7r73pzru3q455z22jvsqcp6q0xxoy6p7uossinoe2vux2jwcehcz14dgnxcd2s9ci509m5upnf1rxdvl7pcs24jwx0atb0lniioxg40d8fv47nss1gvcn4zz6emiyga469fhg1fznvno16o7ajkqsb9cuogh4p1vbjnq7a931h2hh2h1',
                fileSchema: 'ngp4fx03gaioxfy2j16thyc5657uv6sosty5fvc2mrnfuqxrvtsgqmcne93q2cwzkvdg307x779kbupemkper0gc1gz2318foj9goj6tyakgje2zpvatr4rytoqjmq3s0jdrxols42r5w84156m6xpxv2umr8mld212romwahg8vijcn2uycxedh9ada34yyhi6yi9951svm27u0r853jprf8e7tx90j8e72yrs5qylyo1v78r3pgq8cxw3gp7gkj1bz8hj6zv4phctfoj58wm3vxhamnjefgde5zitg8u75550l9t3fxok3vlr86fjspa3je5eoua9y93k72rlrsu8geojzo32z9ymuvpxi2p2fhs07cuzc9uxsl3881akzhnxtti4mx39gid172ft73b9arlpwcly8f5u3247zl60i8oa4gt2br5ginzvwmo4mtaq3roao1c3usump9mk9483vvbinsgylu06qso4w0pe1i9tf0q064oun185pmk1nrwnmvotvm2ytgo7ye9pb1aa1fjgd5r506q4ikb5kgbjv5rf6z7w5p8r79j41jsobtpki5x4jtzh1h7i3insbpy82u6jyahq86yzeoshh0t9p52hqi4h6j4fut5q1hcbvis186gjm516qf20viplamlsvvyz1i9nhno9vr4x09wy9h4zxh2a61wk05r7xbnkoeqbidbbr2tc4w8mfblbfbezza7l87ik59sellhczy5gqshq7cwxw2ewg26ctfxx9fq8nzupoeisuwyd6cqtinyj4oj6a28rw659wtz30glwdcnbavt2itnujrylyidqa9xigzc9fkegyz6puffyo5k6il7zdidkmcnafvjbwxxax8n19p03vy63mb2zgjcjhp84wnhd29hriy8w4rjx0eloragn6g2xgh40chn0f0zpmv13t37dw9lcuazkzfwnt2ky7ksjfrrozhzsizqtd2po56avsln276vgcgc9p8ef7lxmtl1cfbd8acvmnk2s',
                proxyHost: 'qldif1wusmveqmedpadf4c4f80lcnft8xruubz1730nr2l45cxbmaq8teobx',
                proxyPort: 'rm348tavdgbfiob04gxo',
                destination: 'f575gl12k8bbosi6scnx040306epifejci8ry6ietsu1uei66qxgrweu9kklx27023c2a20u3z8gmr0z5v0z9mcz5vw0lzs89ds4n8nbjvcidk14yoekodvqalasvc0umn78yayuvaj11plbyggp7aufxrvoqnzs',
                adapterStatus: 'xs0r1b4tgg6ldzt0qafy',
                softwareComponentName: '63v79nzh03gecwis6a5l0qkzt6co30ob4mh9hfyh3iqjilq6ap98op2zsfcghkpopcibn1j7krolshfzxpy2ptbyhg954zu28pb8sedasbds0t595s5oi46mvm7j7974wxh8wem9hra47tjoaddye6wc0utrme5i',
                responsibleUserAccountName: '6f1wqc0eiwuk371eboj7',
                lastChangeUserAccount: '14hos2nkj5jn6vssp82g',
                lastChangedAt: '2020-07-06 01:27:57',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c',
                tenantId: 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
                
                party: 'ae9ho8u6v2naqsgi00vixql2vja3kneemnrdwjnlh146hq9kejy3y41c6joh3qqr28f19m8eda9klft8i0h5i115pe5aw50d8911fqd3f4na9hyp38dbrpkic16stz6nkn38xqp7a7h8elhfhbhi91bb84q83xv6',
                component: '5q3f0t2byfkg5s5knusg3h9g351teu3ne0ltmagvmlip015a7zznwynmqmcvf4w32np0lcsq7143z0xc3598hjzjh557k1xayj9jl7iwa4m7er2ctes7bg846ykq4fk1vyi5p00mrwi0zqnyud6i6jrf4gxiimwa',
                name: 'c8i32mtopsnhs7tban47dv4018usgdpkwavquq7qi24wratmk9vhyeuel4tr93q5ns49yxkdililt42fti6k9ecaxlgg1z1sj9fgqg8ti7sbl4c50bpctxcb5y72dqo16yp8ckncbrtzqawzpan9rgo5rj99w5ee',
                flowParty: 'knar1ilu6dguvm2kyzr39yd7ii8riqdztgl3vlizbp949xo3u7or0avyanu7flbuwq8ka41vx13tkjih3sx1a86rnta3kru40n2irt0nn950vt5gf3xmhavvbvlbdwre3estg2k27n6wtjfm0y52bmxvnifmbkib',
                flowComponent: '9jsr6d7bh11yqg6xmpr0c9r3wbwmbv8ays5xjor52u2obpn2okbqbjt7dickby06ecfoapjkg2tmbuk7s3ip4a2azydymm79pw8ymc4wttiqoxvukxmnw6bugf4ib0tl1ec8zaphxvmq7j316lgoij28a2n7uhuo',
                flowInterfaceName: '2j85vwv6mshk6zm47njn9gqgnz6ufzm6sekalzunnr6v9r9qgxzrutgicbntyqsbw6b7e1qra1j7i29frhs4io717qfr74itf9f16mohzjd0a9g9drwcllc31sp3eivqcq46pq9nu7j31nbqywu1mww1pxvmlc4f',
                flowInterfaceNamespace: 'lteticyxsvjbjuvde2wzqzipc94ghe5hz7wrkige8e5hcg4hqkzl4fl1qc85dxaom7qpls174c32mbr2gb6el1mm3mnu7or53mch96gefh4rtohsc947puptj6p7q1p2hxj0yzdkk043ngex3iaoc9ymi43yohge',
                adapterType: '4c593lvwbh1r1l00p0cl1e5gjjgqg6eoao0ao7pjig1i3iun9z3gp5ahul57',
                direction: '5s8z1ybxnaaecjxkf6u97294w4oizw0kd9umov3q7asv6bhgglif0kcyudma',
                transportProtocol: 'ghkqevyj07gjtt3a40xhk3wmap3xkglpu481t0wdqatnse18eucj25291g19',
                messageProtocol: 'dg7q0a9hxgetko1uhw4ehc9qq95dz2nfpimv1arytcyf428p5gpk1xlv90a0',
                adapterEngineName: 'bh1p90snztj5edjiwmrag00q2whpoklyirvjfslxqllttteiurt9dunc200yf868ykqheayy70q6p3pqr8tddqwhj67tngjri2xwsdmys6h2tq3qp11glm4eiait42kgvphdoyfo1e9j9efq289h3g8p1bk1uxbz',
                url: 'dqm2bi197nz6odzka6nnpuar5m08xmeyit9gnc29di6qsfwpcvr9rdifxpjjn2rpyupbpqndwybzcfp3pugw1uyy8wltt7rmnsib8kcnts8zs1fiv3kzgodtudeizhh10th22xraf7xcsuyresqm7b4jk9cjcoi81cqniuex1spbarhcm3osssnne3m5jmlsleigce5w8a3da2ha1wiqpeboujtlehgiilfytrp9wmxgofwipos9skwnu14t9h9ow4qavyvr8lz44v5a5dcxkvsczc4orhehikifu81urlytqb077px0r8jru18nyt9m',
                username: 'x4dli5l3n5q5j9k1rwr2pzmhecv40jc7pudf6geujs447tybwza2lbjdvr45',
                remoteHost: 'vdxy5yl8o9asos73vm3o5g1kezrqglruc7fbnqfkprgyhhuqmap1dlqzsptcd9e3kmmzgj89mhf50uwa0c4ypukxk7tfhe89gnrcgx8g5buxrqch39z7iu3r38jwtddiwv3egjqkrlnc159o2qm6fzjgajb4360h',
                remotePort: 'dy5bkaxzinb49n2qggvd',
                directory: '63a06d6sz1hcjntfweftva8c4magk8b0x8hd7dp0lt5ao4fqu4t3k0pjjorocta1j9722z3m520pnbgag5dwe53ecz2ie2mfuafjddujkkz9kojcpf99dvyp925cq6klu4ayvqfsefjfhr4w8ce98c2femx3zs9g3rb37xg1xdjlne5rwh6dfyv91fpyj2pqxlv2krf7auvryxk3c3i6g3gwvpfskvyufpthxgjb9jz1tzos77j2miv7jbbq8czthztp8z1k04ruqmbr5qwe62q17trehjkik6m2ol7wd6sh6lt1v6q4n8gj6y9vvtmylxm99v82dsonbioua6t3p22hyutqpmarxkfse8hmloa6thjhe5hocx6ui7n3gqlbmmrngfkigg61a0enmzmduv0zuex7bd4uzqp1es0yat2zab68w0i1bh5lviua22w8wkktp6asrfwaxweujm6pbi1xmax97tet0u7vknovn7fj4smwkx5oqv6mi72jq8uszp8zruvarjdkiga5t2gemnkyrh71nzn6fv1sgaqn3ryy8wlitso7767fzvfab0wvfvpllw9a5lx3yyjvtcxfeto4vpz1q7gdqut69qdvvasg4diglctzzobrwvjhfh4w8rz9lvqws0lplgrngi9a7ic1b8rwkjk96r1w7pnhm9iw7uf85vsswcd7n5dsggt6ex6kt5947as24b12skrq74v6xulxyyh5kd53bcqz9gemlf3ocru6qbtp24rcnwbfd289oek2zjspcmcugjvj7vuycnnykgss1bkkaxvk2nyt0rxl2rk48fcc8a1cjgehkxcor8gt4bd9ecevnvgf5a0phln5o0l8ws6mivrzfe5oe9pwh9gv01548li9ttevjm1s36auy9kgc4ki3q7l1ntoptcaiwsc8fqhe4avr7lesjbrnmci5c2ucwgbmqx55qkc389e6gvfbhsmqaksdfevunso3y1fe0yfmzd2z6gzpcdl8nlgi9991wa452i',
                fileSchema: '84t1bf5xk3esbq2v2o7z2zzlre7dnwfim044rscb3e3ttzph0httw826b2c81znx2mari5ouxww75j32dgrjiqznkv4qmclcebwh9n29bi0dfow5mluo5j7xki71fgwvx7gnx7gpwpvxsipjr02d6j34dpnnnl7je219agt3uo8t2723k8ei7lvz77u7kyezmsii1gxmjy3nbm4h0blhzplomla29qv8zuav9opb8l2gngbjeqcdydlqutfnv3wlel4bjygknbxt5e4vllp9jb7uevve2et5fs4xpgaq2fqbc7lcg7rgawyj6k6jm30e8ny0juvn4df41gtb38yjio2qykas5ijon24zy9pzc09knnepf6zj3u9iv4ri8p5kcrn8u53zlq4f9uapyirfz7iwxo2pk66sr6zb62jj1k8oek9a6b95agmqihf58ox5jtcbtp8azgvdeflwvoe6l03zsaefyw7gplqyzd9z3nh5juqd09zvprkab2np8czlp2snisz65jztfalazfbewwws2fbay7h3hede019djhifvootpkjb80f7bf3txt5sj5xefygtsk38u6ki0u4xciu2etabuo95k9tigacmcc82rvfl1ki2lkz325zqfy6tivh0rccx9lhzo7mgqvpukmyv4u3ej5u19l4sl7z9m5yi83a0so9kt8b67kg0ujtjjxguox8sfhud2si9du33gjm6wdqs30awzjd2v42ehn057nem8y57r3eu2etvcce2ww7dmgpbz9bncfb4cf4joyggyqfk07leeum2gwpcs4o3rgkyx0vosc8j6vk3lwz9ikao227j8zn4rmw9kg4u8zw33ez21deumxd5oh1t5u8sfphvoly9wljk2oq0ndlxfpsf2gx62iuti4mz099213vh8uob1riaf91ayld9q2i3b7bw0s58tx6vjjk46bpku71k956dvcivf7vixtodght4okoov1ex0aqo7y3iwtp2q2fnxmsyitnyam1kp6o',
                proxyHost: 'zx97s4q8afmf6kjxwqzdvtwgvngdb402eorpbhkwzhd86f5u8xp1h8os7ywl',
                proxyPort: 'eapjal3t3lstqflgtvs1',
                destination: 'wru96frckb7wk0rv1hfpa4jnaxiiexwh3imrtz2xg4qawedsvbb8spg605ue66nn6fqswf51ihk0q5ilwe4aczt6x0omn0w6etdcnadui2p1pu87kn585w8d3o4v3lio4ync8tyrnld3jg56041i9a15njqkbl02',
                adapterStatus: 'duums9pkh24xb8dy1d2f',
                softwareComponentName: 'z2rcfrphjd6i8cd4j0h76oait0gt0teo631sdgxgdt1skkohecpc4kmvosp6a4cb29hvp3jo1ijfjoohoa35nl8sgw9myftzig7emkms6pzz6q8giij9uf1ro8tdzcx3ob1tr9ivwalz9ye447gjbfkaqtjm7zwm',
                responsibleUserAccountName: '7tiw4klvz75tudlb0tvu',
                lastChangeUserAccount: 't5et16bkezb6amgfjuu0',
                lastChangedAt: '2020-07-06 08:39:19',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c',
                tenantId: 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
                systemId: 'f25f22cd-3121-4c65-9930-f5dea13a6019',
                party: '920g9ih9d3yzp6by8dhthf9ll9shbiag91o789oi4fh455o222gyxh0pui2kaeprob1dgdxxsnbrirxv0vyv46alc3b3hr5pflws3d6l4mjm253twp0s1jl94n4ny7ddk5dl2g3mxn4ixm36kktys0hoaly9pxod',
                component: null,
                name: 'orwbhh846ikjq0pxx6r50kqb3ga1eua6cxd8wphb13rk1icei7exywzv1n1h7kim08hkcveljvv3p4l90o2c5ckmvjx4iij9007nn7ya4wh0t2833on89xuykwqs8rnrhz86gx74wbpy2jif28b32ys42e7u8058',
                flowParty: 'pqr9q3qvq7wtv3gxaomu0rwg7ks6u9cxwtempuslx28xyljg0b3t4cn8skkgcwt2v06p2y2cdpg7zlu4q2n3b25c31qsgdfe4cp2xpww4nqwxseywve8m7rdr5sgwi497xxi9d7qm7lbdc0gl5sv0m1gybch2wtg',
                flowComponent: 'y2h2obbrxyo895s3wkdr3h527lq3z3bbgbbuj9j67q89sdq0dcqz4nsdj5la3dbelhxs0anwuslrytw2c2nnk9ad7uslswicqgu1rd0klfylb9boxeq29nih6oaibjjdmsa8cmjmibh3rqfoi97kft38yhdna3jp',
                flowInterfaceName: 't9rdyl4e676dtf47o7ylylddp6e1ewzwoch8umhq6bb30x95llfumztx7z98dacd9gbyeb6ste2gzp2le5m2hvo1tvg5j2a3j9agw90mm9wheckdq4ddfademjzqe3m3ua69exaw1u3faq17y9ncl6x4x1ztei4m',
                flowInterfaceNamespace: '65ciadn1cnmwk4a2nefueujswai6kchaclh8uolcj43dklv1t1ywz57pyhvsh4y2hggz549vv5wes8b2vzqlu4ql8nwsv7omej1hg1a1dsx3wie6m37ud8z7rjuj0fudkw8sloogulrl0zqtqigm8e0gip18xqvy',
                adapterType: 't84tynuu4rx2jyza1pudmg6wadbktqicq28xdcl2wx42mjtoiqrg2od8d3lv',
                direction: 'wyxcfm59zjp2cjyucjbzd3kqjls2a615ef7lv0h7bf1uizhxfjkpznx4aioq',
                transportProtocol: 'jmwdbwx61tqgqf15l0wuj35kpclrefv73hcscjmkowtp5mr9ba1gamcnpuew',
                messageProtocol: 'nufayzh0a30dl9kq3sk4rvqv4hipachwnldxzqljj62mncadj75oba62cgjh',
                adapterEngineName: 'kr9697ueu4xi1vgt86ezhet5tj0rdt4c9z1drslh98yl6ul303q42pa83bxkyc7zsnshbv9to2ai7p2es01loisje50qwwol1ewdm5ylp0ed1bk0v28k8cq7mjy1yxcj6awx4opjyhx8zrfb0m290zuiqzvo1ty4',
                url: 'zzhmm9va6i8m42lx6k1wi5ifa2pf5s96srt5o8nj0yzac5nxkauzcwibo7c7kca8n0p7z36fevg45ye51035ft9v837gu4swhnkd41tpp1zwnyngzw39epaqe15p5omjezg2tqaugmdn9qq0z08t03s84p2tiiqgxjugztaytmjzl5veacr1w0r5zpw4at65tjbcopaeuob0zjhp2t97q8j8jn0hd9egr32nlclndljjat8346lfo421a1ox59ud2zvkv5qqjg1juiygul0crhl1m4n2sb97ki892520bjw4k6phtkdrq4804agg0c72',
                username: '5nsvxooyvvlgvwobm1ces6uei586xy4fszjaj7yyc94vgrtllh1w3pdn51o6',
                remoteHost: 'o7u3snlz1wl69xi8wmzvw4q0zruadw1j54u1azdqk1x7u5o9s77lp34eul4mitla64tludvunikg17blq6yiixwlmnvmz36121xgzrsklz8jgkykue4ssol78uizo9lxn5vlokuzht610ljipsz2cpeo4tal0qnp',
                remotePort: 'rz5zveyd7vkrcs9exhd4',
                directory: '2qy9spkno5uuk66x591jargeu2a4xkrxf8niqs9h0l994vjfsa1j5sjpbvz4581hgg82erciu371xdpubk3fmqire4xdcejqa9bwz2msm0k3tctvs3hf2n7eqftk8d63lb0l3fgje27oh32z9nyujsgw9c2wzx5n4cidayd1ifn8f056zh2ywvkn9xrej3zv64ahui387hblj38jo2pu53uogwnn6fsxf7uaaf2juc41h5xr7o2iy8a4j03yx1gqmgncuxm8ynqn99gp68wht0xx1h0hgnmfcxri34ptxqbw1s7idvx94u7kguy3sma7p4vu9n3toyu7odywvgtyl8y8di2wax2skutm2ux8ji3yjbakxhh5eb46ohw5ma8nwod4sch6esrbtbav319yv2mxjfssqtct2t0v87sedqv2y1cfuwd7msvjq9br0dmd1ktnbd393dijtu3v6chu56uhok91dquzaf0tr5xr5f9o6jf11cb48zic7aqe3opqppzkz4de445xazlod12b8ciik8i09baxeodl2fiprp2xokwsmzdgjnjp6qf87hoxmnyr064oy3yphkv40fzowd5nmkima8i9bnoskuhe8kggoj99j1nxeiy92akq1bocwiez70z4rwmrrwtiptsr76kj43uva932gxdbptv4urmprb8h8w345kom9td7f0a2i31vllpzimr2enw8vfxbdfjojro41wb8v9qi0v2c41ci80k6hoezu868s3xd03nwp4xvqxm851cxpzm9auda8ffs5zs7c7u1o1znc045mq949cefkyv8wm3x442vmchu8ctbl9r14rao0x4vp85nyfv82i4w9p5l1x33xypj7z8p5u7ibyxd2rcr28uzw38dm9kjjkhdcfsj6o28lgxiz51gdt2za5zo29mym575pply4wod88nbdu83oixs9d4qkafi7saw773kn4nvnr08ihs60tgfr6i201ltzcdxtvvq786irfkvf2dk53i49oe',
                fileSchema: 'baz9l45b1289mxxymxm7b9l03y8vbyb22y7o1mv92xy24yhs210ym7ko3vf2886acsyucv7kbl7m01iyfdagrihr8qc1q2kajjkmial70qr8dr1czr0hbtq27gon7ps8grqo5x3s86ay4csx5x9pvg3qs7fkz0hx3ogq8wmaj893k5zsqvgm99breyrilfgtogzwh0kje5gqddt5cobs1gtwcr8tiwy6zihwxsb7l5rsn8rt0cz27ec9a8a3txf32n4chen77wzdvbvyme47prfle7f0bsyz04c0a0ynjwoqxfc9j60jk93ldizn8800om1cdk1kr2a58nhryydpuhdv74dalx7u90js44mk1o0ghfnm6pmkpzjtau714qwfyrlmctff5a10xs6b8zuc6r7qobvqzva5i4ww0kih1gialg58octok9lsg96ubb0ko3u171f9ir1m067ntu5pehfm37on4rva32gj633lxgfm165hm74o4u2bvdvvq6g7u7tjy0bstqylr938d8nvuxatyl1k94j4pj9og8su0mxt6tmvnud88nvd9fsdctd3xaypi8cjaduropttro3ly5lxdbj7880kptyz4v558yha9z02pjqqmpby7njedhgas7kkl6lmhp3foxn6rj1zap4t5sr5lsp6o1shpgrq82jojg43s0va2jt4rroktyvsxvxxvdn6q2e0xmsb0s0runmpqwuero0lb9l3yq0xttkbg837pzby91ojahk9routkn1a8cf7f670n83et0slh77pxquf86j3i8i22qp5wf649cvfq6ik6ulrdd0pqk80oyfcwwhnh0080jsj4bk9mmgd1eslc01ygipztpbqcbjbf5cumd6iw5ww3o22byff466fyum4d41c315oux1l1zkudbih4i9cb10b5i86fr42fvoyunp7a71mdgh978qvzgy30e4t40c4ia213u3pzcmpkan0pdtcn2348hkumaxul3ak9zm7ne1msmtjb9t',
                proxyHost: 'rgrpyvp0lkm98uguwquylpbwpeu1se8bbgg4dz7e71rljstwbhqex689pcei',
                proxyPort: 'h6kq6en3utr2k49l1csv',
                destination: 'jf33slznzdche8w083zmzq4vbu53z3s5tqc2zcc555cidz3e0uagrv8uguib6hopf9ti0cm53gft0i38dezc0mzrq2d7mz8n0sonm1xuu8qc1w8ii4z0d5zi6xds94jjqjmkexjv43dw8uio9v3mmi1g1ibbiuki',
                adapterStatus: 'xw3d1mn6xvmlm9kokrkd',
                softwareComponentName: '9urrlsp4nv9jizv0wg75s7uag1lxs5sofbntk1kzzogkkgmzt9nc9bhyl5tr8za9d8uqxi4zude6m78cb1218rm4ab4jzb7ejt3ua4ga51uwo4zdz6rgkbtk9cv2uftg4x3dhuxusk8t0d4dof1xs2vbwqggwilg',
                responsibleUserAccountName: 'cylo3shubhqvee3acmzk',
                lastChangeUserAccount: 'vdxpxjek86zo64op1s8p',
                lastChangedAt: '2020-07-06 14:09:40',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c',
                tenantId: 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
                systemId: 'f25f22cd-3121-4c65-9930-f5dea13a6019',
                party: 'ggi5tbx8s6dq4tfeesgtk184d4osm3jp55093ke4ho2yatjb3b8uocmsyekfk5xpl8z5l39dyymft6goq5o1ovafwyca8th7brbhhxjpee5lrn34psyhhn3jh6i209bvh4aii4ztmdufxer5wo4x2va8y7t3dlxk',
                
                name: 'pmmrwstblgh1jvi9bo9n9436rf3uvxnl9tsu3ud8rrvcud3qxm38ylms8hteyezvrkm5pg071d57uv7di3fxruy9kw9d95vntruuacw8wx0d7csb9sajn61wbsgjcbeb3utotuga6spp55u7jy79pjwsyzibqr8c',
                flowParty: '69bzcytnvafphzqt41js8cqoj8q3qopra8sp49tf2edhtr8sy86r9pa0qty10azf65ifgfvo86serfa2yv9l9obwwivonpq402tyxigaeywmqwl8tbv1x48c9i5t20mgsl4ctdnd1cslkxsn3z9uhpsv9n5y5fws',
                flowComponent: 'zqtfdt7sbf650i1yhr5sltvloqiurm1a23tc0rm1hz5lhizfm9oik5no0b2x2szm5cbon1swfs6shc3lvwclz5pkxjiz2p719bkidebkqu8qg5q08dcoqsu3dh3buiiqfwrp2rcot0i42vkw304p55n810y511vh',
                flowInterfaceName: 'w1nounvb5y9t086eixbzjy1ednamg0dubs3j723kglvimx1ps77yl7ncxpegbmb4io5940j5e9wxiuxe1abpmkql2l6jjapwj0gh6joojkbc297fzphm42nwdi3hk1rfeyk6cjl2ydexes53p19osjrikopbolxc',
                flowInterfaceNamespace: 'h4uqkk6wh5p4kqx4f7zo6dbqv0ohomqujbbxl3bquumfyncidxlwhnnble4xw23zn1i7bk8oucpw17wlnksefcdewwz33zqrjcabrwjnpn7lmk5n4jjx3hqno2w69igw0v7jgb2vvkbcfhvzdj1ls24r25k3elr3',
                adapterType: 'lnv3k10080w97ny1ns4w0gxm4fb8xlputeljr72ll59wqx5ocovvxvla98mu',
                direction: '7jcpe7hztrfu7vl13q5vfd2eco3ysuf52y8szkmw1i33f436np2ho6929s64',
                transportProtocol: 'z254ghovprer34q0aw8t1d6hzv7kyxjbsv48adosjqvjc6e8tgv7hgshbn6f',
                messageProtocol: 'fotqjcif4266lds92w2j7xlv331jwv83tq1iltnir6x6s9s6s2qtwnzfcy07',
                adapterEngineName: 'wsldrpzwuxhm3y4ju3opozejzokdircb6ndmoyl9ya3ms6dopuavjfxne2050wt41777mf1jex8r8oka25610i6yloglr0yqbjfaq15r6ecd43b3mrngxjr720f0te12qnuf1wp0n2giovwknarc0zdctaoy574w',
                url: 'x7anp7wvhzgj229l6niav0h7oucx4sl31ot6ovsrdibxldy320bi1jjwkn5keolmwc9wa6juz87q520l0t4nk6skizw2bxvtzcti51eoi8kx4ufpstb85q0zudvgxdm9j96hc4uoi3z4qny8g575cell9bbc07jc4gxvqm34ai7havjt2oifkvcb528dhhdu4u9obrmwao80amwe8uf2gep9xlovqloyveng9a5e3lrbr1dqx3lnrtvly011bxfnqu5wkfskny9o4gfxmuqhdk9rvtxyjj0sai4gj8zhffbp6i3b3ioxfr6ov3vhs97b',
                username: 'qpzl2l0gpz0xbgsp9zf5m4kh8jav1kvxu6nr534tfnjpw63ggcagtuz3n954',
                remoteHost: '0oaxoxq6e7ft5p41p2ssedsxrd5bgg9rgw7ilkqr3dd4oat3pe8cl12gavkfi0uozuu2ovl7gcas34pb5s4anbha3v65xtxft35cg2s7ofhh1h0ev63v4vivqss9dduxqptif5rq9zkimsc14twatemg1w9ru6a0',
                remotePort: 'rqpcfsgnf61x83mf9zrc',
                directory: 'cfoup6nsmaicmhjog5uj58vvibqhuk359f7n1o4vvksn6pfxghjvpnn1eyzx8poc2jg0pah93vttgr3gkuyv7vfxa0lhk8ijs7ezdtuxqkvf720eb5ck6ywc8uhnfwp5fvynlgfbhk8dm4lpso8d0p728mifpuimalkhnd6er4fpzeott38ftaedi5imyy7wk4ep4qemrtusme42ah6hud5f8l8c210jm3bpli7t4qlm8vcci3h1ew8zbbaefwuwizloytgw0n0wn5s0lrr4i1p9syugt0g2yh855s0uzyk6u31popgemhrfxxak13gjz9k9yj4jgybw9hbkfqsbc0i7hgtunnscnfj6yuq80k5n722582kuk34o0w9m27z1y5ia900a3d7hkqtca6ysizqsxux8ww2ijr27c91cjjxzavci6azg5w04fuajaaecctjtm7pmepv3pmswi2gs5fhe05m1e08vwv8frfi1ncn08hyvrotnppvmg6qv0ohm7ww1dy19bdwxuxbo1dwzvrkl4gufxcom083df442v8bbvgjdcctz31co08w25yci5fz4eewatx00gl0qdjnuxka16retck8ang3moq9mug0xia5poqtz7ybmyaj1rivhy7t2o4ohum16yr5mfn8hrgn9vwwj4nin509ld4zbkwoptjtazicigcacp68tjvvulzm0dxy3jt11jd1kpb7c85ye9tyxx3cqhade551zvc1fkb0iurc3hrp8h8rfo2zvs0rxpfgeb7hppkud65o4uwl9pduw8g6xjfypn5zwrthakqpdu57wufobjhzna63lzh2icr33hqbatsuaaw418ruxxcuneuzryuxejnh7iu7j8qpamhuwicrsgh97i0qjhzz65dprio0csnhtpl4vszwax6cy49feypx82hmlwv6a668zrbok1y68s4lpkqwwqcj30knqtuz6x04vx6v1jxekt5s1gng4j76rvvu4kr966gf6zzl5fi74vdx9iqc',
                fileSchema: 'wthgjci5tqt92sa6vbg60l02tihnojd3v3z0uwmo83fhtm36mvwvocg2isygwi5f51jp43w23nnt88sktv01525y3hyf1ko8mczlk946btcd15q4i8qha2qg3tjevrgof43g7qoxdg7l3hi6nf0zlt13msuwto4bzb8j1qs29b9hcumqr0ea4wl73wemghlwsdoa42rk4bujkarp6q9119zsto510hetp8nbnw61xigggru1eh9be581ybkdrblcb2pihg1xushxebfuyaxk88is3fk0kz16d9r103rp5n996zjikkzrrq5r9xxalifo9mi4s3nk9alkze8l3nzcyl0itrswbghzbyod6e0vlulupsinb942glz0k76174ajfds81qc4y9wgfv6gkausbj81nazmqi2el481n2pslrgmgqvgtshs2xgx3m8yeozbdw8ne9zfxagqq233ts7j0fedkxalh6i8w9ejcvnscel3k39gkpctbxt5vk1ugegp8hlf4js5ds5jrksyf8zdh4eymzcg0xrwchwsgikmxj2amp0ac6dhczr7hr3j08a3x5aagl8kinyyk11jlc4q4ghmkin9yle731muka735a0ns02ag6odq6cg1w02704ygtd1v0k7ftzywgffef2qgsdhhy75s4yt6uz952ajl5yzw6o536g0qkcxfynxubtbkxp6mnwzieesxvjvgt6e8ockjxxrfp7mv829cm8ijqddnb02luolz9hxzpptbqf5cv3s96oub0v2irg0g58oe79dpvqrlymdjx10e6e029gm7vk990q28rx7piflgpji14ova6xwn4xjxziofp2rxyal65p4n1azueqmlkyn9acq91d748t5ginuad5ek4401jqhtq582kdbzd1vqlcowk9f7jbz0zlwdf4um0x7xjnea5g01waxgme99sornh1kcod9a8pu4cvfrvvtm9sj3ugry95sg6f2x0un44r7i8qfk1iy1t43bodhrhup7oh',
                proxyHost: 'ohg5b6y498rslulu163wx5uoih0fljz6ahipl7gsy4nwme8bobt5jqjk2vq1',
                proxyPort: 'dly3qfm1tukiay0w9x43',
                destination: '341c7capsv78e8qd63t88daq6oajb67lo2dydwqwa6qbm63o0epyobwxxxdhs31jmoqh4xqsdnxpkmhx2keyfn4w4radsvg5vbeiex6p9ah9punvd5cptv3l0jq05r8k4rqbllhqt5lnye83ol3gagnv5wv20rfd',
                adapterStatus: 'b5uwywixpz06qnxknzzq',
                softwareComponentName: '5f1sct6jjbi72goztnv0h4d9tbjtwnfbjjszgb0igrx6eeydzywegcycgccdza5q3ll1vth3oukldtph0cqwo4cdf9l7bnnn3g2kybdegbm8ww8gxnlbwprlmajdv3okdktjncvwx3v4b8kbcnts8ue8eh3r1r8a',
                responsibleUserAccountName: '40un7p9zd9s4qoin6t8m',
                lastChangeUserAccount: '10sshmbc1yep9rsci3uk',
                lastChangedAt: '2020-07-06 05:11:12',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c',
                tenantId: 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
                systemId: 'f25f22cd-3121-4c65-9930-f5dea13a6019',
                party: 'rpyozydvyi4r0blfnmf97hy6b3u6ind2ku3nfd5044iuhfia1fk0z6yvrqyv11ilmgk8djn5j6drhn087lpkk1bxgsf9qrlizzu0vx92gppc99xl7hjpxv1j79q1q761o7p7fpyv4d913ppxbhkulbqqutmgkfmp',
                component: 'e7y6twl8wwhtdjtvrdbxcf6ad3egmpthgkxhfz40m1kjaq2863nycdu1sj1xxlgho2xfgpn38f02igg4hetvsnwe420ox2t0ota9mw4x0pqaeru8lhh4eevnbajle6h18hgpowbgcy9p33fp5c4bo0f5igctbykw',
                name: null,
                flowParty: 'cz50ipl3d3idoykcbw24zomc64l9lg997zfzfrmokd2nnba906ctchnf7a498v1rbpyxxcahz9ldltv771sxwm4joee9wyc4iyr3ja5sah9u9ngg8s2q60v19ngpx6fw7orycutxfx7ygc5k6nvpu0unixuetc8b',
                flowComponent: '1laiun4lebh0ljrw70xfoixxiujn9jsx9d55709c2219j5501odqe5c4nxtp4mpr1zniwlq7qinxqa5swwa77c0woom66h2ou6aoltp5zqz0n13v2cs5lxgulatn0pbjf5rj6m9s0niawteqi8avb1pkj9oeaydz',
                flowInterfaceName: 'ovezr6xmv5b6wmqds462caeg5fxoqvvswl94pl4b7nogrz7v577w8ibuhr3iwf0kgiw8r2p6boreungv0udwl7vermgh63ohu1trqn0dbzty6wnl3yb02qa3vrckbwfnhwcg3tygc7eik1h0udlrxs59qp0gfj5w',
                flowInterfaceNamespace: 'gasblx2ryk7lmnppt47ugtif32n637hccc1mqztuunym5kmq66wyy4u1myi55yswx3cm8y66insztd4h36zrl6pnvr6854yxmj9n572b1we60qdkcuoy8sjpxkuvrpg1ocv8v2t8vc82nfy7brjf1kwlf3o8osv3',
                adapterType: 'i8z7y4wwrnj0ql0px4ykxox0ats4rpqzhcl99um2fg2erdzdiw23gzkqb32q',
                direction: 'yrrt3aqlmogioqg8e4rb4eiuor5k6way8waw77zhp0z4dy75v26efo75eigr',
                transportProtocol: 'usqomc9aclfmpkpw2ne4wj5jeh5n0sgp158whitz2qyeeb88mtn09frhua72',
                messageProtocol: 'lf508v7i84iodwghkp0wj3ewbt8rflsky3rb4ffus5ys565xxz00mqzx3yj2',
                adapterEngineName: 'w9l1u6wvdjniikcdwo6h3a96vslsc7tlqk2hi9ezsovvg7zqpir1r5f3lr596o0kc1r8a5evcehugjwtt4wpbxtv1hqokkhyot13x9w0azq68bm3d486763aemp3wgq2bpiua6hdz4qzqggpvfi01tlcul8e7zjm',
                url: 'y7267lilzo4rcery5y3392qvo4udqexj2vj6ei99wqzmkyzfeh1cw0e0bx11uitbg33n4opkm0gj5ziua74ubaxn2anxat54k9j1xkwbyruwuobsho3982ymh483kde1u8m8318p71ued7iodnq7r79sqh7041tve5madz3bl2b25pyv22xm4udt4hdig50pv9z665uoo9e2lyngy5l2rhfmdmiaj8eb93w1y1wr0lvhsx1y9smek2z9425bfjkr2ztqt5hcs7iztjdwekti3jjruipg2jysp294yn9nnd1cd8814y21mgm97uoiodwn',
                username: 'cbq3bocxe5o3ypho1uifpcnwxoio9wfsjpuefmarx2xnphli3gj9cv5b502v',
                remoteHost: 'c856y6sp0of79shpymgi54tsahh8y4kx1pfzfjhhs8hafpkninzvdkuqow80kgqz1zz07uj8z01w517k0xflwwr326tk68hkdt4hy7dha7n93lykmrj8inntsbluj40cwpaurcxbntol4of1kf8p7vxcxuc38frd',
                remotePort: 'i8iccm3pzo0e5jo32cji',
                directory: '28rqvjiompys8oeplalew2m5gjdr4x981gwii2nb13cnksq4hjwivtb5dccd0ss725irv2nsb0l9b6h7t0rmydmlg6gijmkgnx301pgxzrekgfh0bmk8me6gi2w0rstgbm7qacbsl9libj6029fdew10hvv3vveivatbsrl9h2snxr9v79dfgt2qiouxy7qvcfafg9sf744b92q4weux1zftse4slpjhzo99vfgcy7z4ug6yevhnxbadkf9eujjzwt78e9f6v229uku1prxqys8cajuyx5jw5aof2vqtcly1lto4g5v4fz3zl85123g5q07wu5zt8587ohxyqqyxhrmye30zhucu8uun3rn9bv8065gstxufk95uxi0rs5n6v6qlriw35hm7tap0ctpy2n00xjlufymuq0e43n6v8ujtokddy9t6pqicqbn06e4x9qv3oaic8x2jotcy4qd9t365hw0icrkiechi7h4zyq10u38j44n4gski8wc8ez24iqgc7rz45j77ndt4yn4z00beuun0oywhfcfi3xbsp8u5sh0t9hqxmceizznnfi6iedootxkl4a0i902tcex7x4z4k6jzt0uojanelwiyidw1iyq6jrovcjfolf0xkw3gz9clct5m0w2n310nnh2e2vioz1rux0d5fcninulbufhr1k8f6bnuunx0rfjvcuufbljlbctyyb411s642w2hd2an3ncf38nspa6cvj4m4udlkyfmue753g54hu5sht9rzhrse2niwj8arq3b73knkhwxpt8ve5miw66sdad8i071v59wazae4sx8kniyipde6qf5rmlve376gzi5gyar2fkc2c8byvv42tb3af1efqzovpzuutarbqj21grk6ghuttjzcbnhjvca353o3ly367qnlmqh66gnfq1zwcf7qx7kquwvrgafno4nx3jmndyjuvh5ph13fm6kflbapgovntsa6s9sj82s0zla1tg3rrpeh7loz0rp0hv885rutjy',
                fileSchema: 'trtclch399rjo6307loupyd9kpjuskho4j9awgzsvt6whaexte9by8wfj0ws4zmmtw2kkw28k4imfo55xk40hon7c01ktzcq1uzvpxcgix67a7rwtcsdkzrcr6lmdacogpuev7lzwh1folc9zdbd06q08y7f9f6tznnd3xt7yp8c42npyk01gdnz6rofo3oelsh55pp5l7jcxqpegxs4vloprea7was8upfq3mm4rnxczxhokd6lwdm1veweyp4gtgbpgjd2lxru2skna5uz5w87pf9fqjtcqljzv5qqrh6488gto349pg7fuha0wqcyum1xqnmcqm0qyqe708f1x2i7ujfu9q7k7qfrcf2cz0k302gls9vfkmb3ehz1lmwe0twid2ajv6tlt338iwtj3gyteupkfxnbqv0wlcwhq6yqrj474f7ud00ie43hy07whusy2ev007w5ztz8snk20hzkdh23x5ja6kyze6swa3bncqgbbxxh2f2grpre5vcknkjwbevaq5cccv28u67us5sqatp7rh02lh6xaz9siunmmz6jyx7jb0mozbmhucaeums2xj9ygbtk71gmu1crzxjfw5a3499laqm7fzcpeuwxlvjm0wnlyoz7ukmobvl0p1zbfegz0feccnfmy7d0nptnift5d7p0sd0g84cugs10r3s1kfk7he2re9wlyr3p9187hpir97khay7p4wasfpjzv42e9p44gt8dcpgr6a125uw021vau2dxr6rff4a9ty7c99cum8at6bfbah18o5n6j8qjf7ns78ojk7e97nqo2wax5rot2pdd9lmnq69rw0avu54lxtyzldd6r3yrc72mo6v01ri294q9vlxq2p22mwha7q19jbgo0kgiv1njz5gf9e54byfbjkboam2jd6j3sdlf9iqmpsho5sjf0j4p4x7xd2egoy9pyae0qylqf2yw53bili1yoaa9vr9tfibpno973hld5memq4cccl6adas5m63un29m8nt9mns',
                proxyHost: 'luvhhcasts82ag7l29owp01aimzv5y0x7xhd4gc23evgdd762e74xu5b47q0',
                proxyPort: 'rps9n5z193qox1j480wa',
                destination: '8pjvwlcarg63ddf5f0skxhn7fsbdacrsu8y98m36p8s1toow5mrku1czhmuru9ozzbaf4ekvyip9ev5i6qx8ymxa1bo85f4mcpqfw3edabe2nkzmb1fvgqtdt7z8lwvyzmbhjpe6rxmk3y80labrn8tadn80d7fw',
                adapterStatus: 'g1b3erzhromq57mhk0hq',
                softwareComponentName: 'vazhkcvkip1zu74a8nknzc08z05uwttqk3rymqcgi5rlp95ds9l7krtxro0dt7wdzsmnjmhj75oi4rn5h1ucx0az4ujsfytvlsne6u0oda5bshkizvy6o1awc6y3qe4tto4421teyo7eaailmw8643opq92ywlog',
                responsibleUserAccountName: 'lp95fec1x9yt8hbkxvhg',
                lastChangeUserAccount: 'jqa1e7t05j4i6hqourj3',
                lastChangedAt: '2020-07-06 07:30:54',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c',
                tenantId: 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
                systemId: 'f25f22cd-3121-4c65-9930-f5dea13a6019',
                party: 'cs8tbmi93y7fzt21vxj17vf6zscz13mtq1vhu6vthel4o5a78kifn4vrwd14q5s86hd2o5m9gxamrgalvo8cuyisoda89zhg0ujj9k2i74zftigxuegh8yu57gt3fdcs40k05bakwn3izuympj16osp6tfhbv3wk',
                component: 'frjju8osp6onkk9i32q0vu26vbpbj8j3sr7dxh1iqbhihikp1d9wwpgmgfxo1vfivxr3cttdtllp4qmbf08waxtun60f8i8u34xvdx7yo26i8x32y4kh1pvp1ib4apxjf383ysvhv4xtnjkx72c8m7g0mabi6vdi',
                
                flowParty: '0k4a591gz6ix28wqdf816ez74fbnrcfeee7rpwkrzi8q5u6509o3nwq8jxnu8a6xu6wtla0a1h6pvuc2q5f3zouz4nvh9o3usr8hyaarnd0tc337q94aruu777br5ur288w184ta11ojmn79glkunjwuidxvdtv1',
                flowComponent: '04w9dkwlblovl2ui44r8f7p1mqtatf5onzaje64zki51dox24wi4cuna2nhlhqmu3kqkaqy07vpz52glajatxohi606w1enr8hrnjwsvd6rdrnxvrbtp5rl59koa2ljevtvg7ycm3373nta88pll8uxpyn7dtpdx',
                flowInterfaceName: '6j0tpu853z3pp0x9ivvm0e6ygratzch6q9lts7izfxbokejsjeyy2ddqwxj9dq5yds1agofg4x9s0f34h2u2mi03jdnnmsj1pvgkqnxy3o1b5t76q8uh775t2eyuo2zaeyvu1phzwl465m1bznac50l3299k30xj',
                flowInterfaceNamespace: 'mm5fyhmzakp2rndiqbf2f3lxkx1z0qvxp6n4950zwycwhpa9hcfjgr377656e2mwp8bs4xzmrc88eayefv0kivr4sk86dpxsuycq8uazdbsl7qyumag8dkk6e45lky72czpaed42lstasz0ng31dsxjammhztcbe',
                adapterType: 'oiyquox9xiudwql5mpvu7f8zpsh072bhwm1ousxwljc7udivcjsxpi37a1og',
                direction: 'h9ikqdiu01l06za11uga39aretiyqavm3e6xvb09slu44goj15n1u5t4fki9',
                transportProtocol: 'qw4zf7jrj2swv85fsvxcpgcqsaqqz7w940g2agg8600besowdzuv14ndxkoc',
                messageProtocol: 'ttd1pog8szh9spip6finxs3bwinsjcszjo2p3er6tch1eietj21z0uv3q9fh',
                adapterEngineName: '8tobo9qx1om2wv8l6mcmh6qtzcuhvv4hgqs6gfh2dwecx1u5b9h721hg6z8oro8gh86u0he9ffhhtt0w84sbo5btyi9r980ype4q7pq4lacjawm9vq5fnuz564p88gpgsq00eyq7u6wid90r1canxiifkw1u8g3z',
                url: 'jaroqq11ck6zoykrxz7ii6iuvgyyauytm2nyu0sjmee3p3am4j75tl7mc8pvuosgqw3n9kiodeke4ao3cf29v5rw1pdb5boblrzdfjak3py8zo3cb0hoy7o2kd38vffjlra5jxjtr2tsqd3nj4dn2g8eo36pixt3m7ro4iyyvdmyvzqd0g6xgsknvbhuxa2des1zzuqy6vjkywc11z3ilqcoti2i25cy7qdrfw0syk7zu8h5lx05w7c5cxthyf38q8icug75lb4a7wk1vht6jc7qge2xeg254011x9b75zoc2dm1e45qdb00j8itvcl6',
                username: 'ax332dc0fgzqox3878196dvmkxp1gu4jlied33gx85z2xqv6o15o2md5h8rd',
                remoteHost: 'nw83x6qlhjda5sfahdiiei9jx2wo222p0wcyds3r2bbwe1nb4qge3iaw1dzu6wipv0jv9mc5hi6swv3llczjdz04fzplfrs4vifwpxraizxdjaikb03156dyqarmo5pr2zxws6tcd8m5loe9hibibgx8qs4msiu4',
                remotePort: 'hu3s0u25ioube3on24jr',
                directory: 'ueznzrtjsttbeqpxvq39kv6g3kc4ejf9bl8hj8nr0caczaw51odd0vkor8qdvkxmb2s2dk98ccdvfb092ffltw3qk5irytzo4rr2jrf0v282uvzxalm5ydby3gv1cvodnt14obk2n6n72conff7trd0nv5og4qrux2uin7zq61ceelrbywa4dvzqlpwgnlo20mpr5so7m5o7i1j0l9rd0v1be6t1s8jtibsnd5v9wy25n57n0rvxt5eswa4xdns2vod6d2lxgm651iwo4fma7crlcz6up53k5wfx3a5e5hcv5u3cl5zzxvc5gjvy3akf256zdm8l4lodackjy30hx1tjev9t60dnecgu14r5d0n6zqwxeaqff1yvqt0eqli1r3muyhdtxi3njw9gyhqw4cibq9rm2gs4abvom3xkd6psaju4zra3fwn68zgd8eetnux9jq1gwgumydydeoumqiak7t7oslxsf02cwiyjn0jkqf7psetp297s3hs8fpfym5y63xewessov3pb7gbuodakf76w9bjnss4vo5vtir99fc4kflcfv4ywqllwpp6i6hi5jnu8ul2xge9vkmhkqc7ozs6iv65941fggnin7n02pmx50hcj978tuf7bs3bllaxfvuxewvkxt67qigfj7he4m6mpugg340kne0fg6pp2ksnmrvpzad4opyqcc1bxisvj7x09n3hk745limkrf8q3to5wh8izcjl0spuwzjganzmlk4j7gdeyq9vdhfxe5klwgz98w5cqbteopxtrkkaa89wuv57xeewvo7hqjic61g603xcram7l25a7yct8d4l0ua7vfqngt73nemid2l71pvkmldciwlsf24110rhereejtxe0yi4jhl32pc5p528in37ord92sgtbp88stlh2t2cbonp5vjvyzm369pa3vgno7h8w9oruoxmi5yp0mlxasheuwlf72nebhad7fsiiw9i9p0e5saqno0ssfjsd4pikz3bhbsff7bgef1j',
                fileSchema: 'u8hptmde08y1cuavd8bj70zo7gfle8tiw5o7719oxowjo9muzmrzypmkk5s5rjn4jkjmx0pwgf6nlyj6ajb6jimy40lml1hoaridwkmlb17k2hhlmz84kyswxaav3ec7qzenryxx77sob7dnk9ns7rz6fxa2hd8g2x5tsqq7wy5zg4r081hdvq2yitkdf7urqmgavwf20ps3ek6hxorttskrhiscgb2nlch16dj3r2vk27ri46voyf6miki42rfvurliqbm19ac2rudjqhou9dfrwrfy9j5zmlu9ejd2j80ozrffkcfrmfjp4llye5qvld15j6tpod38qqn50q4x7ul8z35z9w0sif3svnf7kj6qpx73hwa4hndgv49vr63ivmvc7qgvbrd2ghtd2chn57fzh2dk4bs3xj4v5h5iwh9ix3kujfpjn0l43rrvlno3kjnh1jo568lm961lx2nkedrmwg64zk7gfh8kvci0u65y6vp9orcvvsnl9zfv4ffn7jqvu5yi7eqe35zpps279twrz4i2tvquane6e5784rffyxcyl216p9l212wk872b8x1g7bhn7bif2slb0g5rlmoosudf9h404hmmo72b7trehc53eqlke4gcce493tufw0348z8sb7570gtif6ltjbx9fsck3x409wgw27p951tlsd54b3zqkby35ngsjgp07z3jssex2xbamt49bm02pgfdc7yibvx0h58xrhl7ki58w6a432ym2vgzhd25bs2ikqoia5xfc889x4jsi1rm1uikvtuxprnm417we7hsh8zed89ok02ell5qcxknbg1qslz828zpkophnr3mj619vb7yak0s9n3y6c6aal2mtq40cs24t3re7szt0pxqneu3b5kkmwylvtdpcny8868l3hibewwe6j2gi4xwipofas0cnqugb8qpkgl5nobd0h1xw3lr6bwqvuf7fvweuux57plsk2aaz5o0v3sulbyqzke3qaitb81i3ykcddpph03',
                proxyHost: 's58ppw14m6mgqb4eqvv2ay0wddpyysnxbrhxzaewd23yt4k14ui6hn7wt45k',
                proxyPort: 'rw6z8epk6wuz0b6a5p3k',
                destination: '7oqucu44fli1004qn0p4sfa9ref3jrnt7z8x7wkcyljgdwo1dic3b3qe2wsircgh73uzq6e901dc50uccbgo5rw0v0zhe9so3u3w8786mmgykxrpgf2gkp0u2ac2woltjn6xphsg8hm07fd1gwjae8nocmxlpltg',
                adapterStatus: 'djl0ch27hqtxtfgtpw2r',
                softwareComponentName: 't68qm22uw31xe2h3f6o2inx7ovmicsmdinuklvcv6u6p7ctxs2p895zj1q6d0t4x43r9xlr0ti2ucf786hy0rbjaiiv5ojv81eonqs1dcjcg30855qnm9tt31w9wig26dyq1ztaq6einw9c4oh8zjo1oafw5vmo0',
                responsibleUserAccountName: 'axq2ksdy8lupm7j6ou4y',
                lastChangeUserAccount: 'e8v1epbgnvl0zkpvq7yl',
                lastChangedAt: '2020-07-06 08:50:29',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowParty property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c',
                tenantId: 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
                systemId: 'f25f22cd-3121-4c65-9930-f5dea13a6019',
                party: 'gdrg3fmr6z8uoi2z3zdclhgptdf8bolsnna5xk1p892lxjvxy0mgtqjqsvjmxig24th7jkb2ay80j101r95mudjbgzktxmddvblx5mvkc1izweiekk49tshcfzekebi8gawb6njbxy1ulvtocd3o3zhfqa4srpeu',
                component: 'j07kt1nb7ch2jiuchcco1cmzrlpunphioj14lmsfhkss0j2vfnqwc59e17ek7mmws623ryjojbwes2oa8wnbyoxg3hokiv3zdoroj92jvylhjpnxesa81wvaf45ftrwqxw4zro2h72q7ove31jjm0j7boip93xdp',
                name: 'a1ba18jh4rv3sne49d2hd5jelwnme632ict569dkd39n0c3z63tlqmtoq78trv00d6haxrheo65dfgxw48jx9xhmcz3c0jiwxa8q2mrqf0fx5l4mfy3txv24jz0ji7egizhyaedc9bsbje8b7wgzz759rxmrx6ql',
                flowParty: null,
                flowComponent: 'o5z3988sq092l2ifj5b7qprr9qckbgju966g8lfr2hgpbvipokb8lg0qwmu7i0bn965tyutg56slod4t08h9rvl3njjpc42szg6ztbn1fzsx7ktojljwi72vmdi3fbgaxe6vk2orwzi37j0o31uclez9yg0sc8se',
                flowInterfaceName: 'x1pxsxe5y9p2tvs459wexni5mdacwbkmcv8zi3wq9qxmgu4bg5nzi0kbdnnjj0aci5v1hrxj9gsrt5x4nv9hn2ru6nmmofa8ociobup1qy4y6w53vji2w0107l0kgdj1yxm0vyxa5plgl7pq6fxwqpq90r44b6kb',
                flowInterfaceNamespace: 'jcu34eky0sd5326q4wea92ez88vr87lfezpuk27guy7x5i3dp8vll4vsp9w4ea3kfo9wrdd251wenkdjr8s92yx7b13vmq4lvuil8p7ppg6ns638afukr1fkgkvw7r0if442flad9mzap8hsqbwm3bguwl5wrgz4',
                adapterType: '8gzxm1cz4due03h7uez48s49ah1na2k9p3v2qoalo7i6jgzkszxe5qnvdiw3',
                direction: 'ziyrabapkn6stibmkm37t20jx4arf89nhwwpdfgcoddjbbh02rmjyud7xgnu',
                transportProtocol: 'n9nfid515hglrassjqq1qi0qetl7iaria2dz378dntuiqdaz929pw71e5u6r',
                messageProtocol: '060hmc76qi3u6cs2w1m0i8fpxwvykqfjyhtzpo5zr4xbi4il60f1zqgpsfrv',
                adapterEngineName: 'h436wxe9fxv36bl10mp1whr8yixo1xjo74doj9sljbkqod4zkgtowedzk4gz2pxue3cxzvxitrbcj2r6aq5vn0mubcv74wxpyy48fs5j564z08l9xm52y4g8zl09cm9cwpe9spy3i3ho0vc4fz9zrbxwobu82lmq',
                url: '6gwxejf3qi6htxblpc3qz8pae3pkrhh39sxtp8zb533nt9kvtsyfsfjgoxsgswvwsiz978had5s0vx44up0vujf71tshyp0rlqlaj4zlkijdpfa05i037i37vddcanxjjudcn382iycinc82bd1dqim6bylxl0iviho3avj0y8is0z8ughip0ydfc136k0jp4v6lyu3quvyo0xfzmnyaiq1dkregwlc5ha4nj4cdw4qsn1hneswkvri43h3a4k7ilmad1wnur4w1ncrl2xgdt5zc6q1ur4wc128m3gwj9bfesyuala6cm4s2p5o4df7g',
                username: 'j4n6ol3exeud9ti6izgbna5cfgd9wxvmvae6mxisdmvsrld38mukyl6bd79v',
                remoteHost: 'jlj1zu591ovz3p478tteo0nu8efbzacj3sxs5f7t2rnprsn3v2kj3r43awp69m6kz1qch9xw8anpflsyp3zfop2veb5ujv8w3cff5woet3wjg8qwp81lqpejdjnww6zelexac03lqlr5gwgmdcb5okxppnm40nax',
                remotePort: '204rqb75out9tffyhyr8',
                directory: 'crg1rhfcd00o6fztzhwgy39abea8bok916x5e62mnsdtkmw6lj5y20xz22zgyw52mpf9kmhgachyjhmp6lgqzc1r3lamavq8o2lnf35yojesltlx8qjnnw9375b24j4o74t2vtcg9tvi4jvcw5jnouxx6baey9xildo3f34vulhq3kjg3t1lb6f6363ql8rb5g3bpxgbchude08gil6wdoi2bftbcihq4v9hhn2hrif04auz86mnldx48pgbm1hojyq4nzqwm23fdpovzdg580m1vlc10aruxbwdgnmp8ea903gk3bt7ani9efyvc3a35oh6vjzgj3eu95gh9i49e3x2uf4hrirm7bprf8kqummaxl13xwdc3cj6dihz91yzhyywlwcpy2118d7j1uyt264k68np62ryxx2n39lst4ubphybk4wh7vpy4uhcq1vcoyczqf3bqzg7xt69jb15urf9u9zp1ld8fijotzs9wx843abni6192ljiggrl15nlhnntu6y1x5b5lupkxa2r9j6jaj25si5h1wtt3idrduv51h9jx56ets30eg4gtevvmodzr18pycqb2g1tjsbkgmppwgnhvxf2utit61sv35dhm28cpq9latsf4yy18a9c29zek644ogques55pl3lzgv3g6q1bzztay06id4ex3bztwyfyf8a03ulxn13jh28z3oqd90ou37h95cmvl0u0lh929fhb345zwqwbxqa15psucwwq9jvm1mybz59s98o16q7zv7wfl6830quvt1s17fjpwxp5w6o1j26y3n4gqslcp4qkbu265e63ak4eow3dcinxort7ddaeoo7l38t98z6cbks14yvgv4jnlvhmqiovkrqpt72unp1d1zju8wi9f9qbemb33ar0y5zq8kyvtchg7gq1klhbz7yg4pejnktendcuoencc06i741gb73ya9aah4knqhfhvbsmy0m5ube3ydcgxfc11iopmx16wovm1ausolu2emkst6xj8a',
                fileSchema: 'rtakcridxd9vpwdlaz2ilx6mqxuxubec6j7mqie9r6dqf2nl5leew6098ke9vpr23z6606c9lomrg00o6lq9npj5hxou3vkdcsjz91qf9n9jbhf8g4tpv2qrgrduqns28u800qsqmq7nq8f4l3zwmld76sxyk1w010l6q99q7gep5d2adeh24inm25bl9iox9rl9jgq6y9filwxnx0yoa0ze7l3rj6nv7to00yfv4bqs3y9jp19fs4fmb1cak27iwexg9jjyvle5gk4kisys04v7g8reqwoj1nahi14tv09romi900zkww77v1mj3hwppjbncyu53sh9ao5jsa4x5m8iwmbxbnc6b0ovh74eryxg4el9inkuuq3vpkin2f9qzlizxegqs8rh8wwsrnx2z1fk9vvnp7xikpeo5glyq5oqxuxlalf0e8r568d0zrq6v29lcx28djvjwvhao8m1sanxcj5kjhkqpf2cvsflzcffq91nh3giuyuxk8xek58jstfz8g0zir4no55ski4jzctx79bys5ev50ylj77p9oi5zvxlrnziea7s1xn5lmr33tyrxzqkmn9b4byevlgfp25obyqy59dsjxp86tepeyjr3oxy4x1rnoqf6md4743qvbxyvhoiup88iyxvup74gccehaov6tdyvt6kzle8sd9otnersoyu2ujamnijkqry3zcoyxtsbxpe0uanoqr4xedx71h2d38u3ngck21ay4yez9g26beeotb2phxd7qpxj4ol7bz1nbh4ym45p4ruuwkgnrhb58tmzl0kaotuqn0pdnbvtvumgs46uo3ujokz12gn1qrw8y1rxofagjfqzh1wbm9vo02xidzt80ch7vmwo87ft7bjgdlrjiw4dibam911lp3do0kaeprlj36xthfxtjl7pr8hjtx75t61v3lptdpep6xir38io33i36u3q169x9wxu01utxdldl6cy09cqjojy5jqofwwh6ksprclce0ikb7ak1uuyaldz50',
                proxyHost: 'z1zodcnbkrn3z0n3ol062hah5k1dv4rzobsnuzp8dx3w5co5c8mf7mtol1z7',
                proxyPort: 'vhzp39yp8wp81zg30vrg',
                destination: 'b7l1mippfvucwrakimmy7epiejpzi9bbipvr8fvxbz7zp26nmqpyeyqp4g9a8gkqwr5wzixmc4whvajxqhvr0ao2n7c97gu1iglutzsqnzbuo8q6373gd3g3y33ihx4ghj8ozsn8tj386104y9tjidg7egls1b6n',
                adapterStatus: 'riq7svjp5t8ncb3suz2l',
                softwareComponentName: 'w3o8yca57c1zxwt4vx7s4u173tr3rlylwmh1lqmda8r50zwzx1mq3ds637i7fwywe869giekxqysws0ss4i4vcats9iiiwq4brpo849f0tbk26h1x3gn7cmsdylm5qeaietbx1fn63g8t23bljfjthw9r8gdhbb5',
                responsibleUserAccountName: 'ini7otorvdd3rn623wee',
                lastChangeUserAccount: 'sa3kwj7tpuveq533xcek',
                lastChangedAt: '2020-07-06 08:55:22',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowParty must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowParty property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c',
                tenantId: 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
                systemId: 'f25f22cd-3121-4c65-9930-f5dea13a6019',
                party: '86fx8alzlnyei7g3yc7336khbmd0vf90e6172ui82pbrqadn1vc2w112gnz4x8xwamcjbaoyuqyomsqg39rd0kd5qo0wche889ffkdo9uy91rf7o29sln68yceh4hh0r6fwaxeh9ugr19sj20vltzcojor6wblax',
                component: '5ilgjo0ud05xztcalbogtm05sjvb7srl41am7vqnkctdoiegyhlogrpijdwd4mh212ssvma2b1erjz273m9i9ba903jh0p4ellnkwj2umyw6tznw5kr8lpehvbpjp3bizbh720utn1qv14mhx8n8i5m7jwyr3507',
                name: '6fs531u7is31ohamb15qcb9xuw1w1zixpq8dqwixo8ssakqkj5b5n3wi6jm9pjx8ezrdzzyrc9tu3vyb6fph3gu20wzsl7g4p9t7grrappsff9ihswf3zrxuxrvaych78cgym4q6y452w1p0vvaaezwfdhy4si4k',
                
                flowComponent: 'vhsm6ch0d41bjadym3y3s4usigxg6vej9ts4ox5ey0qdwq4xentj2zfw54keazer7ul1rdpsk7w8wvi5ehx28tdmtc9kfpkfbge7vkvjmf16sz5srcu80tpzrvacq2zy2vqcoh1k2sdqbl5iw4x1wvavutvcym4f',
                flowInterfaceName: 'fcamp01bk2oxemk2hd21gksgxjj5vevvlw134ziw1pth6c6gpmyxqqjsvsqfvpxq5jcqr63sh5930r33y57jqnghzwt9u0y1707zvthqcrc9rdz8qts9b0pmkjkxmmr3wf7qg609o2uml7fm1ulvaq0w25wfsclb',
                flowInterfaceNamespace: 'pd56mnsgq51vbg6m94xdu30dwrnv02gjq2b6ba2y7qk6m68hif1wlgpbbpw6rr3q0jpyfjxfwnff1bcrmmw8r8fq9v8a7453yyu6plz8kafvchy17h7gszpah20vi1x02szyqu475smpi88ivplybzmbdev7uq39',
                adapterType: '7x8aw3c185b5x4a1pxwsdvoau2ixfskskkt5aicvttaux70y7hmiun6g40p3',
                direction: 't7noqx3hc1mlkranz8gu76k4bojrc6b0io5i06ly9pnx2m10410cj8jce0k1',
                transportProtocol: 'rud9krpuzhc7ouxac2tmbu93gpia3c2t4jgndov1nzez6nlch1qg4ng1iwba',
                messageProtocol: 's6egxijd6igd3ail9h1uob4ehy7b6ow8n8hczen3hdx33erjupeywauglqod',
                adapterEngineName: 'xg3jdmvz46kkxh3zvslymynrsvxz1nikkwppaex8cadvg0ru10p9v920gah85spytbpl8ipxck1d3n99a7kks85sxj00ddr3cd9fuopa22nvpzkyquqrkntukxnzgptajm4g1dzrjsvvg111pkl00gmx4jqog7hz',
                url: 'sy1zk7rqa8pf2a67c6fatqi9kmbng4keju4i7sie10mowovmnz68r0oz9xzyvbvqhbxzzo9oavyofqgt1yk88drmhe32mqs9pf5fob0g94pno1gizuc3y1l76megxvklijo312l63gsngi6xwufr9frlc2u79huqs8mhq7zqbz9rzv90c0dcxtpinl6cdwkysswftimqlryvl2n1ewu0omcxdc3slg4l9est1zggy1dmdyyn3mlhkvnr57r5xd6vbwqhcbwmhcc7jtr59wpc393nppnpffrfx03u4tky8fgs05e111m9xqn64o4eknnx',
                username: 'q23tgzcck985ehiwr1yi2js7rzw6cuwp3zhr1aew9xn2u2xgd16n43g0usrs',
                remoteHost: 'jlfavu2rrqroewm6qq6xi452mik76rk0tat72tdlzmm72t3wv7gn8frjrubqg3hiznlfk7evrbpbegh0qi7bllzizce9vhshiwlxm5jdhcp7lsrhofkaf5hsbcyqklx559m8dkdjh96ajtm3n6xrq03mx3tmj6a4',
                remotePort: 'iu3qeic7pkr4lgxo0g7h',
                directory: '784d4b6mgqgxt8116i3fevbpkr2ba2jfjlj6b9vfya6c460z9n6kt3csxuqxyc0z87yfo0cazb1aijb5z9l6tsovzacksj7zbc4qd8yqfyd3djnnuy3dw8tbbjbfjm6loghenm2gq34lqz1rcwo3f6mht28rg4ystg48uv5fshuxrrwxcoknlcg9c14n3iu95p14myxblbex87tq99he3ubo69hfgfq6i0l1i3obuyysua1dle7bwhkqm06hmevqxzei63gi4ksvxvdflo8o6cjq3etwdshiwgoy62bocruv3y4nv4488bchvuuel9dir4v3jbgc9z4nu8grmaw57k25hvr93s3xfri5xyn33bs46uxaijrhka4rfhwgbqegke40mvlsa2k5r9qj0zln0mqqhpuf1f14pez3pe84nw1mbji55zguqr9o5nh3sq0g05bglhlxhuxuoyjflp7id9ljia5ifl40l0589q6lqwljle94qpfza8b4l9nexx2l5tmfleiai76iz5tap190crueu1de33n12mwb1dd5gg6i9gttp2qsorwm6a6zri3azepbd043xgugls58nowlhvh41ci6ssruwg2vxn2jgyaozs9y5wwwvet11kkaps6se4c76lxhli3741qft3bv87apq6q5m9vidr1hu0sxwipqsopcrk2o8zwx8ofnzhlgno4olfttb37s5wlsuc0akvw2fxr705r9j5wxv3dwdvzgkl0bpmtjg52x8ec71t4qr6x7cjs5zc6gj3xziankv11t4qf51oh89dr8qg1zqqzam4v04oisdxo2dncs2nrd5hlgk3pgt62ihar3te3dy19ibok9pyciwyo161f0rq4a46n8rebywhqpmunlw1dqy4drrlkgdyzpbwpithtr9tsmh1bp0j9j8kjm1t47te6s3g85s3u9twd66ypek0n2nm50o4b6uti6z4nymavk7nn03yf1nd8f29nf04mrw4qopvv9a9a4jw2mg0dzlyd',
                fileSchema: 'urnvx37lhwp2t60oipivwfgkymtr670t6rju37dobl86h9mcsmgnv8d7mgg1jd5gk72lkgb8yw47jxwsq4c2ynot3udu4lxhpn0gbj9ahbvuajvxt0kezr0lxu160518hsypzb5lfzre58oe1jwov8mafj2lr8j31kbnbyi624aqq8l4sz7kpu80oqskmfbkpuer5v4bfothnt4s8dkgp3vi9rt5hepdq8ny2bmjf1isyhhopiz005b9zroeu31s9ieesk2cvrdq6esom0yojfazrgkyzfulvads8d7fc2ldmz9fcky3ggx4bi6kg28pb7rv7lq9kkuwkhq4nrshop9nj5vpi71ae0v1b1qb75a1xb0yzphb8jt8xygwbid8nzr3y597as49abzpoh7fo0c0x4iz4rgy41ea4qonvxqdcrrkr1d6zmafl0jdshtkoru5m4zv00vy3dquplkfh0zf6el2x0yopqwvn70jt4q3qq7z9dawv7wwxrjiinmo7ca79eo9h46cqmfir5ggim60gx2czobhbixc39rh7gd14aydpujzyx67ns2k5d2t7kkbjr4von59wu22lvhm924qpft4g37572natd4y1cz0qbwox1thfvr6tet9nto4csm94r0znnnd2dij1ad115f3muq9ka9tp8n5x6xj6kjtj5qef08015dz3noakf6gw9mddmosp7730vmeqj9s2mz2vldgi558g4kbcv2pgo73llvkme5xphaevo93liu5qjz4yt2b097o8bnxn0npzesieyol4adbg5tlt43cy6dsggj0uw2suj19kum42a40iyt23ajdw27on0no7pbmxgylt9zc1nq2j3k7z9bnmx8agkiucf3q43vpojw09txvg16b27bid5s7tlkjaduhuoccm4m6whp92npn9klkpw26uasbzkf4q28sg8jgng4od6fbbt45q17mjwzyv78gmcdaf4z1xudk4eh6siy39mw54vvhkbeptj5pdn5pdrs',
                proxyHost: 'cgcpjepmn7hbut1oqrmtxt5dtuf4qafvb55a70x14o0vdx0oao73icswjhpe',
                proxyPort: 'a0pvaol26vb9kwxflpo3',
                destination: 'u1xkc90npo6du5nr3wxle49upam0gui3ell20e1ok29ebskpmeunt65kwkiw99woxl42lxxe4hcryduihpz2f6km5lbaawuhyzkrut2p419od2f5ceiug5tm0rk2qbw91am6k9sukf2nxs0gcnkwvmj5iwqimjy4',
                adapterStatus: 'wzpksrag2fex6hkj21xk',
                softwareComponentName: 'zih2zutupuejx1aqwkh7a7io67hrmwm3cj450j4wcse6v6rn3sblgufwsyzk5r15ngcl0pcti9evpkxxu4efikb6jms3rq2dmtp5v6vkrybojold5cj9wz37ui9vvftop42kb9lknov33q9f28ki91w0aph7hfif',
                responsibleUserAccountName: 'cv92bje4ye5nhhvtugzl',
                lastChangeUserAccount: '5fugxro86cur57hiegun',
                lastChangedAt: '2020-07-06 09:53:35',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowParty must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c',
                tenantId: 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
                systemId: 'f25f22cd-3121-4c65-9930-f5dea13a6019',
                party: 'uxeetjsspyudj6hbui804tw2jmd73uc8lbgrgcxsst2nyema1wgijbl7u87alpjuowdk0y0g6cmo2exjfk3upj7hf0ahj1qslp0biismdfugjip0rlx6xwtdwdd2fv8zecc9kryjo8p6en682e7p8a32gsa0tqkh',
                component: 'nyzs7h9psb5c273m8advm2hb4t8l9bnaktq7b061wdjdsrmglkpalcu7n51klzm7ztq04wxzmgfnuxjs5adx6yk4gsupjr1apgwfbyvuj95i5k3zdni83u3s11d78c80djnskszkbkhobte3536xdmg9k0hjpllp',
                name: 'dgib51lg091eoskibho9dp2jq0dzzl8dryapry8okbnm7ksbaij6o60mmxfia431b2esqct0k99gay7oyuh7xwbywk5hu059zf951f5evjbzt30wim449u8ilzx2j9qsjdc05854gucf8hx6fmvpttkk1bgwcu3q',
                flowParty: 'vkr4awjyugwpsy9szhqb3x3v7yp9zqmnfeu5d5545tsdo5ortn1saed7hddhkxez7vg6jwaoucx6cjfufujqkkb2u9n16es09lg52lzg625q3rgwvbuh1eplduvs3iqcppmugpa9j22lt2pmby5pa8trulb98o1i',
                flowComponent: null,
                flowInterfaceName: 'lr1ym9kk99mfyj53lh9w362gg5xgxcftz03sxenm48j61vt0ldnsy2gupppy56zn189ulodegiv73xpalcnp18sn761tabvrtvkwvfq67m4nwanq8yt39yz7n4xi0jucwuf5ogdz0d9r4ee0u90lhkjy2lf8x6fn',
                flowInterfaceNamespace: 'ec2uf8sbl1wnbrs5xf44635779n4ecm0bmmy92osslpwouijorpztusfl3bce1gaqj2z5hmdjc7mkzur823y4ua82ljfz12bots08n02cqkeffnsibmjanlt7k5o7mvr8ocm8fddqvs15wbxab171xrt5ja3ny8e',
                adapterType: 'yy9iibwuwdmut64hn8pr9tbuhhwfjr0z9hdvr6to323il2tw3g1bgavl04vs',
                direction: 'mzhygx31bfw5nqlv73shge30ogukabfc9ogpe3qv88nh2uwmo28iyibjfmvh',
                transportProtocol: 'cf3xda3e177cl2gz5usg36o06iwppiivnb80a1off411wns096myve041b1z',
                messageProtocol: 'hrtwxil408pn7rno8i2iu2876sl2yr659e1dtxkitlsmxve6jvnnfc038nrp',
                adapterEngineName: 'cnxuved5y4qusgprzjtpsq3lyhmmxpv2pfo8f415kwimsrtfb33596zemxw2zv6xlvry0k22gjmosbj9l3kfuuhilhlhu6gyjs5tmnyn2gdiqouo80oz2wcx7lgvx6toh1wvcs2gjnrs2jly5ynsjgdhn7hw17sl',
                url: 'g49fq6g1j8rd31sqk4feunauqful158qkwce2e5kv7g62q47t45rdoi6al9xs2f3todpohvsbzmvm9rzuv6d8osyj02lxplv5b92bvkj9yvktqs8fgu5v9vlcgrr5danrnawp8w8eqz2jgm4e308rpdv70hdraxswgg378xgurj2fsu0mqa902f9voptepmxddjd5j35s2log6e5glggzrqr0pxv6a5aojczoixk6e97t1eksawhr2k4z16wkij6y3aanq9lgxxfhnjiw29agigjwoxqm8zoxh1rsknq68qfacaguiq4cq321j72cdcp',
                username: 'lnel58ynqunabqaabmo3y62zxg792b6u15mn8fj96g1jxrkdrf0dd2mqar3l',
                remoteHost: 'ftnbwcqe3vzuk3mgnmiflm5i1jkyy3fk25awf8azmh64r9eptpvbau3hqf9tiic1y024tawfsrijukrt20phnxk3tr8i03sc7lh1pz21its92mcznhwbn04yxhzk9ydi5enmktdso9t06z5ueadd72datsaif4f3',
                remotePort: 'pb65lzawvyomf42msgf7',
                directory: 'ktbwsi5v3m5yvbuoqtk01c5870e4hjcgan3qfrgs7gxqdi2pt0cab6d3odkr5n3bj3x80pkovegsfjwsb2hzfo10mqx2oiorp95cma3gvjqhmdz3uldniewx98n244xaah8lzhnbwsb06khh1a9sks8b8x05pywxfqwbzeqs7jko842qrjq2uzur4tw4ff31qoftrwo3wrv4bvdk02p6zlvl3q2622mvizxoppjndekik10o8pvulry8bbv07960hfhp80uysimvaf728kckeyh7gssqkcozu3tyqjvusd47d02eobbnm5wvnh297nhuszzu2aqsblpw6cpct6c4iymf9nybr78yt6an6fhm8l4od5qg01u8suzpjk4tjb6hpkoe9g9qz5duj23h3wpmcw72vulaxb5yg86s0j0pq5thxqyqha91jffvw75l9ymrff4rzu4ga5irohl6i3eh1fy3zhzgel7s9ao12q948plixui7yuqzkknrpck0016utsrgwu2p6b4pin2m3wodqxzdqw73sxc5p0boeyiy00ei8f7oetiprjbvwqa2yc0ih7jw63dw6oqpa644wfclhs5aoi7vr475tgyagjvh7txpyp0gzfxr1fz77fw0k6coa8h9sxqa718ouai8atll3hbd0q04n1usm80z25cvsvgqdt2gdr5r2b4ue9bw75n6ugoz0qegug6la18vej9vdexl8a0j2v1ymetc5rd391lxlqjw46d1l3hkrh16jl8e1m212ndz3d2ridvofq65mr99bvdempj9iaky7uu8oum86i2i4ofed4z1fe24fge23d2i8kp4vm4os7d2vpjwhd8175bp2tsltxq35vz6sxrxoxxzqrnieow8vjs9q9sc8fxxwez11wqjaa0i2ae56aytzbo06irhv0s6n6nxb1ayoo3xa735ey0f7w4olxiil3g1ll2y65kn6vkstl1fyj1pnuo07eelo4674xnnipzlkifxsuromtpccj4tcfq',
                fileSchema: 'v777jjm770xrcku3mwa4ljq0ocxlfdimu18qp4zsurhnihd4b5aqa0mifif80111kb94uih09llj4hp2i74r5dn1fao28onlghyia9nudoiqsehrozavfqv7v8vtzm3gxd6veknfgif8t2hok040x9x656hc7epzhddugt9v0gv1joh7gunywz7tukdozg8c1q1s0bxaqv0s5u94olr09yld7nrmhx52wwpvkozi6n7tmmg42wlrt0f3ok1woruumkhqqz70mgdz2bng5np8w6ak4s9e8rnvnw6af49ed3jnxrfh1ukx3iav1poqmk2u80bi0hoj8phve74p1lwmbwgbbm1zbksjm8cvgkzut490itrnvx8jk4325mhwxxjf37snzh0qq4oa2avmey4g8v6qe2mqu43zs7qsho49gygqric7xt84p3uao7dw5mxwgaptj5buskd3b2fq0zznuf6rhyh23mwluuvdu5c0qcjlmhjpo0fe18rx9c5t0kse9vb2fwahb62ygm4hyr3irymojhmbnij1jh6pf8moouz4ao8eixizzzlm2vdy3btiqhp08c5t3d9wmke7w2ez4o03oeefdhkx2xpucax3h1grpa1q0lvsmz3i1p7osm9jb37meg7hb899qlsrd3t3ceumuyi1bfy4qwgbl0gf8t3xtutmi9lk8yonsx0r4fw2mawh1tfk800kvsfbarb9wlu7soqftgz3sk9ihjc1onmsljxuaj4h95spqy2o9kqrtyjupidgnqks2jr8x8hnt5avifkmmt3ne0diwemt3pi5rmgrn3dls3d3t2k2c92dz3gvda6yro3i763qvxaqwusa4wg3rm68b6sa9xu84icv8x84v8x15xuz8myldtd3cpt3ay4th0hdubvhdlpb9dgcfvo0avtx9m17uwhgcs5xvt83ysg9xip8qky0t4wfbdxpt3xjxyneovfzdcaszg75lm0lby3lpn561rza17ao0zqt4b44cs52f0tplb1',
                proxyHost: 'p5igw8gq3grntwcpazn8m48z9f5o3coahs9y1hmcoxn5u32orx49w9fdpv1n',
                proxyPort: 'zkifocxh3fgojb7jvl6i',
                destination: '7kj5zewmkqy094ecmrq11tb6fy3r8higusbtlr31t2lyww0uno0kc1kbks9f1xv0xsvm8u67z76q4hqrp1iw4xb8okyt1kj8jemy8rlper9a36s9c4mn31j24act9e6n7unxu78merks486szl9w64rwta4pv0js',
                adapterStatus: 'b5aaiu9uq12yfyj4rkly',
                softwareComponentName: 'qmyadj5qrnbavpmj01l3lnc7zub6vynrplgwz6ed7nkxlx12yocahdh8i42be3bzgvprl1lj0xu9d5dxosnje11htgqcibwa2jvjj6dggsg1um6kfnz1nmgxpgvd63xlouf9tafp38rrcwefmqdzqgcb6y0mh1wg',
                responsibleUserAccountName: 'qgeck7b50g0jiag7zc14',
                lastChangeUserAccount: 'v3y4tv1u2z6fa1mnxpxh',
                lastChangedAt: '2020-07-06 16:36:39',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowComponent must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c',
                tenantId: 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
                systemId: 'f25f22cd-3121-4c65-9930-f5dea13a6019',
                party: '94b4dhnaocghj18jkovei7ua6ctrgqi3n512f5x3ouk0i0e8k31takpl987gbd0mrn5o3fbycfo44ait6pxdxy79xzcae0l4agyoc71ywlpj2supdynbmg485lxey6we2at29q908btqctj76d26acxlvfou8nz9',
                component: '50gvzn9zo97pfuonkhk7o8s50c2uxmj5ky8i2nptzc9tl9a4a0hudav81a7xeegea6qtrp7sg93zxwl91bwpwsz7mrwi8c4v2ibejn7u4wxkchs6o2d1wi64qp9qbj4y58qrc9r4ucexs4zsq60gqk5g7meehpc5',
                name: 'gdjas8j43mzydba4s1x8u91j15na707jbkjvbf2j3i7c7dki8r4cppvm09rvlkwjbtlupyeuuisr3xaucg7hpu9whq2p0ru1fqs26i6dcl7ny6iifi57hkua6boq4r6djl8ml6oy16lrttpc5khtsptbs61lgxfw',
                flowParty: 'bqmz7nb4mgruavewrvl1whmn0afhj19931dgxhwo9usjfe5edwsk1wlb983lmnlt4mi8mhhvyewaoz7nvtcskxxjhe0uoazeuck0yq1nn7uo4m13oqs2v0bowhgqr1jrrm6wtemcwij5q75h20v924314ufcyhz0',
                
                flowInterfaceName: 'vghz7y5v2u30y1ojnuqd9vn7dwa36jlv3uhfxszdfhcu9uzmzlshoktuodhiv5wov0yminbnp2rdyim0jfn07e3zy84b1h76c8lvm10p8xcrkkutzo5x29ntugc37apxazllaa1ia625s13rk1tl0c65v3237ssc',
                flowInterfaceNamespace: 'fywdt3483a4zltnfu0kdlhtfvuaapbe5n67cs6euv528iffcgj98cp7l7ptuxf5878bxzrpmr5uqfapw8b5f6zxt1ud9vsvw6ctp2xe1o3n1cqamdhl7cdvhj5q6v6ukk194sfbl1gstxubnh5sqxbbymw4erekd',
                adapterType: 'aeha3m5stb0ht2wzbu2wv17x3nxw9pqlocfzjb7zmzrtcdvhf17kpi1mmde8',
                direction: 'ne30eb66iygiox3gaef3yll2fybtja00g1tp6to0yfcg9hggq5bf8uu06c3l',
                transportProtocol: 'adiu8du7mfoiv2r74dt6fxxe2i9q4r2n0eapq8x83i5c9xfzm1fapnatx01n',
                messageProtocol: 'br7ibuqafr09geuhuy7f4dqo49xextnzuzmkv91bfsbfxc8ftkqt9tmcs0cq',
                adapterEngineName: '4szh8f95z02ola96iz78yakiudsmy86hwfctsp1vq7yjgjdkg0cgi6kal9uys0l5mziydbgiofpj1oj960ujgm2h0uwnuj3gkkwu2qha79ijhlvh39oczzzqyv454h4gids41bd1wwlvenb6et6uobuqcc215j9k',
                url: 'xu08bmcebxbqg71azqitmlody60nwj68m2fqevhhn2589eqm9bqwj3bpvdckip268jbmtillkrznythutcbcy50f1fg8hgm7d75pgjv30afbbojnovostjwzv4klx047ud0ch1bvscue9v6yfwmkgtduh1m6zq4km0qe0ic0u5jpxtzofjcjzsq9ml9c06q1i8cnl9mynad56cnt5l1p9fqox0067y0zzu58dqadk98l1q8lgetbc09rhkiq5a6zavu4u61fsgu6hm028d40xuy0msogkyirc456ejtqd6lgvzvqupkdagjjf3pj3a97',
                username: '9gny1k81aquzq0wq87fgrim7mi5ezmqu8w0omp1huz7m7wrizmqz017ylg1a',
                remoteHost: 'yk5yexgxyd4w2dpskcufccwoqtpllkzkqk8zvbqlq77zqnpk7v712jjcj9e4c8ywpsustp5mwjxhmqqwbyvh0eeljmoice2solns4jrdrbm8n9hqipete95r55ih98182wcktmeitwogehhvg90ae8kkov6j7vkd',
                remotePort: 'fl2ha5kxifwumzh3tjf1',
                directory: 'lnyqqz4qqi9q3say7p9yylokupguuoy8uxivkb0cqf0qotn1zzagpufxgch5f8dta34eie26pw3jrvkm1ntqn5jexi13sc7ynwgmj8wwlw1vcgo6li21ual7d9ua1n78lb2xxcs93p6fdq5h447475ponpg6qfqrp7yfgqidw841d354vyu8phhd9vaa3w052th38wemw7czhvtiqt3tqg344zobx7s9x9ljep7w0ytmqs9bib1lmq11brwmfpq47iymlt2akxuirrmedxw5f707qkitr9rl9bj62yt1ut812cbbxkwvm8e2ek8j6iggem3lzx6y0htbkuzkg3vy1qpmn3gl6ov20at432c16qi6g46ka9122wvw8aanlg6reyh3zkziruatyhudyas3pljxo2ccydmtmkrq5bfkrr66x0j2f65sqgaa22z978oib8spczonrcply2y93l5lzgmjr4y6kl3kigujy7f38g58a1yo8aj3dshtrikys83x7kw17bgnge2wkvyatgelsrixwgyli5b2b56j14op9odc2hfxfa59tdwewuwsnwxipcrm35360kupcggyscvp4olsbb6rsftget6ofhpmirz2n13x4sil7jl2jf502xsmdy96o7k6bljs891moy494l7ocf16dbh26qkn6e9k6pu194h1z6e7n8cn4ro9sbne299yea6alq1i1j7m70y35qblod7nlivqo24pwwfkeliw8fhhzgaityfv4pxwsryj3t52cjenzld8j80l72ke34sbax5oka0dpxql213dqcwbikn907tcfkgckrgnyvpm8ljya2ks7olgy0nxc3fhw36el76zskci8o6bqsz1qormu30sck2kpvw71yhmxd23d5i8nygpi6n9layllmwq972pssq6lldqxe3fza3k68aqy03goknv46np49h7hdovay5t28r9s3xy7qqc80x6om3bofqtkxkydglt945kpcxkg8qya9e1n0g01tj68i1',
                fileSchema: 'vim5v18wstd3fbbxy72lw7t2yeza40w0gqotg57cui6gb5h4zaaudd721n19mzkplspr1ir2tbnmutqzn1tzm9evj3k8dr18n340ac7pp7r6obkgbls21u85lywwblncur5bdtp24avbmya7wkqwcjlg5g6vizo13igh7qdyxh92lflgwcs08rttqv878fn2y7e6ghuzl8d5ny64cxdaqtrlv16scpvcnjo28twmgeb9evi1copxk3ogp4i8689s8zxpn6bc5bzr2kyue2eljh0ahc7iadu9juf6rvrnfmpt88nor1ge8fjvxrbapfo19qpkkuzd0pwtqlf9hgrnedckrlwe1fa6h1lkvzkkea5btm9vxsnrn20vb0en8zttrojjdmom1102ttv7wxii64dc3kc8rj70ae72o3v3mqucwwyzq2l01zqul5939qdu8u77k0gmz33nc0ggp02cffxjn64jzys8ycrensep9qfqigbje2q3f0zzb2ah2c6y3l0q841ltxi31o5gh9m0st1wiwjm52smvpz0yf7kn0tre3geih3akjjbl73elqswjr4eg0yuv1drpruvvwe7cyx3ldfyww4lap4gll5qlfai6523vi5xgaziu0jw1y2ybknvpju9f77ghz54svjqor64ck9un0yavfeozwmls4322y3miu2k7w37w08avkff8il20zq0bntes7nxovp55s7a37tiqt47x6nvpcgkz4pl6el5qi5skdgnp08bu8vdc1a927hngfhu9gykypvmc7m8d4y0l6ie7klzhsv4g9e14roogyyj2mc1xq0o777fg5wkmnbwmwxeh3s38kpj2dmpdd08i3alyrxwblppvj7ta8t1zpbjkoq23zojiw26tsvv560wvwdntntxzvjddputjita7oywpdt182zcdg1wqnlb6y5wi4sqozazcsefx86vuogapyqwfi2hvz3ig7z76qwmy5a6dk6yplz6nvtx4or3k4wnv74ntj794jm',
                proxyHost: 'io65khzyi0skratzygxne9q6aau0tli3ksfz6ib27thtqtebcdo40abs385p',
                proxyPort: 'ksq27ep3phuw79y3o35s',
                destination: '6pq4dtzjrhfu2p38bbg8px9x70whp291dz29ejyhqpgbzcb989hth32ke8fx5k0u0ywxnddk6210u8ukshvgrvqn7kyq2apez03y2bxzlgipbj2eewsbmtwi0x1e1t8b8f1iycwymustvgnvwliym3ce7yzvh19m',
                adapterStatus: '8jg4os0sr25cgalw78gk',
                softwareComponentName: '8se03hn11nfa84a9zqs6mp6e515aya1n9u6fpy8h9j9rzr269f1qaakno2hu9tjmehsb6kgz6ia2gjxv071uwydp048n5vg21qixm07lbnzugvycives1le72dvl3t90oa5hbxs5x4rii4pyfsxoc8geze637s41',
                responsibleUserAccountName: 'ng8d3hhhxmwuughme3lb',
                lastChangeUserAccount: 'cxp2xeo8dmhazl0vkqld',
                lastChangedAt: '2020-07-06 19:59:45',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowComponent must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c',
                tenantId: 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
                systemId: 'f25f22cd-3121-4c65-9930-f5dea13a6019',
                party: '1w9adqk4tdf277e8yd6ym53fmqe3gmpjxnk0aqhdt6am5y6amvaows6xqvql597lijpwbbvjw26nyd5ooukzbvxyzvmm6o7cvjomo54ldl41yd8zwziq7h7x7dk3nfxd48gl6ygnmr209ppua1wxhlm8wlfymq5s',
                component: '1n0f2v4971i0obd3dri1n7vzy7m9ba27puu0c8ap87cor8vjo67s88wx54mon6eetxv032cznnbyiue27y2g8yk3vannr3tkragwtenuktegbjbmvm4x45eld0amnf0kdaawwspxpqsdj40dnuheljkg8g9s1nu7',
                name: 'sbkbqhqf4icbstb45qq9fltbuuyi0rp4njc9ly1qz47biz2k32dd2xageyd6cg5sqfhecpfy0yffiyobxbp7j22iefgnl5maz2ky50qn9zcna06r6jkci6re8ahvlbs92yqspbee65hp79p1p5gkrc9x7549sdsr',
                flowParty: 'qnw2ldw3nxwr4jzrbm446caovtee8cvyoti1qdk93wq4g4lw9j5d9511npgnvaup1cbla6kq7gel3yycrjzjuvbts2c7wcuf1ibn3tu9vx5oj7b9g8nics4wcwfkwojm1c8odkjiqpjw1q5kb6mytl8zfwx7tuh8',
                flowComponent: '0evon5gzp5fxwn9ac2knqp814jzefzu7p1f4nfjv831atbuuhgu49vdbxvt1tdcn8x12h5u9vuqxckoqvmfswzr6ovdubx9n1k60h0tvdt4xo4c099o0nl1dcoc6yaxcg94hmjpx0ubgcsd8354qhzcwowkxi0cn',
                flowInterfaceName: null,
                flowInterfaceNamespace: '4aurlliccq36m25isvozbjvwmw9sxe8uyb4z8klhx519w7vilrewsg1ko8s3z60x6swea4o320kf7g5tf14bekmhbvwbgc4uu7p5lohh6l4nuuhsd3kps3rxixife1jw200y9inzavjx611156fcxuq5x0i07af5',
                adapterType: '29yc5mkw3smr9ixv8fm4y1bybj89m4qgtp6bbk17aqr9e6i8z4bil7oqhvf0',
                direction: 'rgtdjpza54jmq5pb64creu26cic08xvx4pr5pb1wwmq0b2qep7reky4sj3y4',
                transportProtocol: 'eoqgfzj61mbo1o7sa73o54y8vib5bmczfb4iizv7ehvsfeap14c284rfa303',
                messageProtocol: 'v1prqy8ek56ob3x2dzwjsv07gx38u06nr5o7wt4uty8g27a479jxncwmtgqd',
                adapterEngineName: 'it8dqleujmwt9ywd4me8wsvsr30l4ng6ljc3oojqrq4khamotowgl0bond7b7m5reyd3t7hkwhb44qkdwlstn5t0811899egsvm53m4mze8aj0u07pyr4r6rgwajuerxr45t4xv9666i8p85g15gyht914mo5lew',
                url: 'wfv2t5hq0oh7c181flly5fjzfjmteg8tigfjw7zpbe0fwivgo8ojddtbxswv14e90tfgqv1taenpuq8532ucrp2izvd6kcz5icdf639clqhhaeylycyi4it0qm7cdryssf9y1u9fp6nak49je6djyd87x64a1p47b9vyqsyp46xc8x7jt4l6n4i2vgqw6wu7uieorxe4wrv1oegafzegmckiov2l955bzawbbr20tvdihbz7i5soirrizzylsejrupqi2kg1e7rlt1ewghnm7oq86q8sp7kdzqrve9mwpdaarye72zrk5767j19ky8uf',
                username: 't4u334oljv1wcmr88hmr3iv6irqcj1aeszhjderhwy5falk9cpgfa2lsc5fo',
                remoteHost: 'whkuu8jghvhuyobfvkxwitngpctx70yuoq0ywscl77y4dfoco0hry0tx7baiemlr2ur8atj99rpo7hwt4cdabj2for4557eimxgw4pb4akw41i2jqggtawuut3w6w67zpfoa9iud1it5vdwecyryc2q9k8znil5z',
                remotePort: 'gnvwdy2b70jwwngpsxhw',
                directory: 'stqafiv5els2j0gs6nxku106mp2mz0jawq6emsqnvdg756dhdd883431cfrdfhcfrviko0twsssazcnk1genkblxjnaiefdcy7mxrv29748sptevy18i22i84sejsksignpnhzj08kuygvhl9pcsp5urrvqil0irtd1ys16h5iqrpw49kchp699nnxprcn8gi4xz48lrhe66lzrl73vkc93mmte74w69y8z5e36nfvyks6u2h2eziwnjktqvknw34w98p3su3nz0j0m3kmii4cmui21lw6fxa7moprg69hgi3qghv3mgtoej33cv0l44j0rrgskb6q0dmxcylxlnwnx1l0zi0ivvub33okj33vokowrselg95o70wojy6zjaobc36cq97bjsl1g0sit906bw2j5xyy1mixehlhrcz4kf9wxzicl0zkrmx4f5ulkfdojz463mpifmu31ae1k3iqj9osjs78e49655k6psfztkk7fh8gq14xfirfoqkf9phez4hq9slaogun4bez3ta0wdr9zhdmv0txfkodxsst9lowc237heq74mxffsjfwymkyd51tohe5rpck667ln5hwielz3a0wsrzuruqibarujl6ana19nlvyphg6vifwgp35pjdk7ama4dcqhem0q17v8rvbgiec3m90pjge9rnuh2d8srhrddrcptm5lttrr1vg05suayt6y2hieslimi4etvg76rt3iulq09zgl5wbxkiy4nqhg7lfyx0jaxxgvtdy8ner4yht9raqwlp3t4zbzo5h41dbnjdygff3vjju590uaapwbf84pes2a68k99airvls63l4fx6tiamfw63lr3f7yze1d2j4nw5zku9jr7of40joc4gkciexd4aqf1pl4j5vebf39defrjs1f7h010chfhdbtf7cez3m52ufu1p2guwzl9uj85yhxa3mvgboof5sxak3z4q9c62sbldxyfj6i8jk8u13tz2ah4e88jkk0sntmtx1tjh5gcp9',
                fileSchema: 'mdvzf9puupzc4n2t6c5rgzejbdq8295q6ipw6lwfz5la6mqa627yq11oz8thmtw2kul3pfs3zsmh3eaw743uu1rq4dgcageeupwz92x9enf94k3nablwl7agaebam7udiv6p8vxvdx9ioiss4at7tnuysid3s0cspca3u971d8ycmxq67c3xv7ud780jxt6s3bn3lvz28cftbd70u5alv6oh6okvc8z4nsuj816mkmysq3pvvbx4mreb3qdskr7b599aunkiu9etuuskmynkvygza5kx5s7skdsozcuvmupustbk41t7w7evj35ubj0nf1bvlsqqf06tcy2zoabb2bvgvw5myqp5w4dt4rxri17hegz7xb199l7apyfg1eznrq7dqy80w7xshy6vxfv0wjx7ofartj75geupiortgt2cuu6eoj7mizoyn9z0gupsoj4tuuenj6kt5u1q9gald8nz6nfv3r8se41lxrnjsq0d467dn0vife12zv1nh088l1oyshz26x72ldprs1x1uvegoeawv4mrc5zul8imlvytxsthydrbvzijn91vsu0020bc4soqm6j2swlnhw2jyoe8irt94jrd3g34ec9j2dil6m06yk81v7luw426wsx5nhyhs8ftmrh16v897kzj1dfcr672hbyalpjlotylusu1sljiup9ejqmzlp08srb5kxgn1oqk1c326bc9vpcn9tby424y4un2gxunejpyqqpzfwvg8neb47xwzg35pe3bvuxjpi0mcen9ajdzjdjk4d1m69jjn6ngbuydht6jy9n7n6fillcrz4bso1x1z8edvzhe56svz49d89tb6kg8r7vcf6s5dya8ufxbz2gx54jgjpvxl355f8b5ub4t172kcvtihzvdezjff6bg1d9qyn64z0sabenjflcyb24o4jyf6d1vkyvtfls9zmuwy8nq7wssjsdsdaelr4epayco0vsfmxs6js2zkmvgno3m2tpqr86d9ismk7xg4w8lpx1',
                proxyHost: 'vhutda0outpjxyvl38ntv8emqwoa9v24w4qt2rb56r1km0w03m659q8dvbhe',
                proxyPort: 'cwokxm5up78lliclifv6',
                destination: 'wtbgzyhl4e1bs0xsec8pk26cykxdntusqx1pyhklea1v2008xyfngtt12yf9j9f10ul7cgf4xsmcdzn3sdd2kln9pkiytcm88g6hdemzxenh9x2pfhljdpzi05tfasmthxs8gye2smdznvp5r7dgq74l8fko0sio',
                adapterStatus: 'mhand6527gtlftqxyr80',
                softwareComponentName: 'eqfhvdzoayqf85y4emr25ncy8c6qko91rc9s0vzowdj52zj2ihvw3qo2rh12u6n3owncpinfstp2vhbk31g1a39y6dk080wy6cmllkdc22efa6dp6hihfo8byf0cowgc3f9a4dac906h4yymxyoycyj4fnn4eodz',
                responsibleUserAccountName: 'zyrnr92sac7plop3jeyj',
                lastChangeUserAccount: 'io760a5wv9ysoz4d9m8y',
                lastChangedAt: '2020-07-05 21:06:18',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c',
                tenantId: 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
                systemId: 'f25f22cd-3121-4c65-9930-f5dea13a6019',
                party: 'aya6fmra7fop565bu63956szyb9dtu3r83acypj14o7acbj9v1s0ti2hyhhchao80yf729h9ylzg3mnbdwtgixyu3qaoxuo9cct5hy1zi9d6z0wkrz69mk7r9qq3393jomfiugfm5g4ksnj4s7x05f0xjgsmuyjb',
                component: 'sl5ovddqk4oxpr9rx9p1gz4s41otgv2sucjqj7i2u6t0j7rfh17qbw7zyn4acm3wrbffluxwsvbaziqu6ed7vgyxfn6m6333lhb1txoeumiwn3mv9psvx9wo7oj9a4c2cm8iji281qfsyr7fcqcejqa9dyoqmcfx',
                name: '5ss93b0mb4tzfo15tjf89zqqtwsm9hc7h54i42gn3m1lid2pkapzjl1kn5t4crrqyofbbzxi92upzo84zbykn9iz70sy4q0e2vsiby0xwqhdbkwg5c1yavdjhlvfmeitnx1pyryw6ktuj8aeqgl3vtw96rva7ok1',
                flowParty: 'a9popv73n5x29c8m8g58obuam6e9r0ey507edvjkwu9z24plltxmj3wchd0zs1pl2841cmiy4xrtfciob8dcv0ffsfg5vv78ozp2jf2wvnrsdb0uhsx6az8yf3tccorvawct5p9jz8ddhk42f4xqzo4y75ktdrlk',
                flowComponent: 'sjconf7zn5gh4p06tg019l8ijyufq6s3ixa6u2d2d3ba3ybd8hqz8lr9k8azrwggr1hvomzxblfqejot0drll4b9r0z8j7fno9ueveartzsxey2hqb2si9o33ybdqckrbb766a4lb1sl9mczfm8y6cgokbzxxxu8',
                
                flowInterfaceNamespace: '7hj0ntisq3v90jyrbfydgkzkr1f8e7mcyp31pg8zmaw4ngyyvjbn7rm9fiqx3dnjb0d66xklu1p1d1az4h67wm27gzfpqrkv3n5ecmdlwax1bhinhx882639dzc2vbcgl40vy9zr5c22epx7dg265kua63vjcrw8',
                adapterType: 'ej5of8a8w9spd3fiyahjthty28vdmn3ezy9qn1n6ld97wxdnteub9l78fk8u',
                direction: '7eenmw975jgsesy02utbhqh1vhgwcfohv0yw0qtoo1d969u7rwxrj32x4qvm',
                transportProtocol: 'lz0gvl9up8uk3galcm4inxnistx89rcilq0owqpqi3pmf1zndb5nnjp2bxsj',
                messageProtocol: 'r2w6wafdy4zfsslc1crn9ynk5j1kebrf7so78v7r529sj8xl5hyao7pgdz5m',
                adapterEngineName: '5rrcw5jh039rosy8yde46gwfd3p4ldwvrfx2tdp9as30hu8o7gf1t6rwoutd7ekrxxt6csfpptuqanx2n2rph8kuu5er23ruy54yhoy71aqbb6rfukai6i2uqg7vdj9tyam4bp6zai0ft49wrswer5s0c8dm44x7',
                url: 'o3kr31mxqh6z802sud4sbugf3y4muo15d7y7ohysf66rheohc0p5r8wpr9of7l52qtz2v4khil7g8wq04d3gp0ily1tvp7anaqlu6azapatlts9dtidwy9u7hdo1gllsm7fu2gaolu0p6zf4l68cus5omj7435jvdl43xnoumhuzmyu91ppql1lsrmobv12sphzatjz6fit6iaq4e62hfira2ag5upgbe431q8php3v4j3br5pek0lzs4gqncd8g3eaod80xsm7xuxnzpkt1dmvm1jdspb1ke4a4lperlynefhon6mkcyxc0iwdtfvwg',
                username: 'qu28n315a916c3co8r3icbhl5jb9xd1fto4fc538a58i7seaat5ua7qaxso8',
                remoteHost: 'zpsuankaqbsmzpzdz07qxs3akah6ihyhp61blnhiyijn167brt0ghfglm1s1jwq29bo2d5h1vr7gdtf7texzhctgwo3n7wn4cyvwvphoosjcwewfx5lia53v5by0or2wn5ysv1a58sj418q1vllfzumz16mbv99i',
                remotePort: 'ihmprmxofabucc9m6rn2',
                directory: 'ftwvuztzdfz5jg00wrx0f12b4mp02tmlod8zohf9pg7yr7hlrbwf4wux0pj5wu3e0fxoyubeog1qeg78bdnubeg8r75yx5xf3xk8uio9l94w7exag2vjhq0ll63cv9z9459ie36s1ln3tj9iyg7gn5phtoz4gdmk3crbefwlnnkso8u5d7gxnx5jzhm4nvzv4zykbuly95i6wt8r3azeplfqlfsprabmt92z1wygteifemkfdd1i6cplpuwpr139pzw8uux4p8jxunelku95twmzaxjhvssvxwbxhbss0szrzg1t0fa3cbrur9etskg762wt505bf6ymesq1bgznoz0aq43asep6x5huw65xzjrcen8shhkxp0f8rz8bvj8sj899ja1gmbr6bw2w4djmcp6moh91mt9pjhgva0zz6mxic8w3c6xq8xoeg7ej1b2x2d8pgtoqh1ognigvr6ssyspaclpfe74hvgaije0dey7apiskz9lskvwc5e8c5dunfeuut4mu4kvt6xfsoh4vndqm5nw19kurfg5qfxkpplm44wl3urqaepik01cku7qof1xa4vb7sjss1w8iqz2us8ntv6g7hdlcas73swx9vhyqrkkqy07kakm4n7rcy6lutvij637a4m316qrxgsnj6njgicw9rbdgajqcx2jckgftsa0xw79uq1zhdiqkuoyrtmlaaoc8mitv49lwih1ozt6kvrcu78vmlt0lcio9klg69z0cemulunamiod7z141x8g696xlnpc7hqvs6yin9dswdez2bj1heuvmecm4tb2b4sgwg1cu22lww7ttdt8vnug9j4rox0j8pxbqm7medcbj5c99ltwndlqldhdl8io2nllo9agymjwlx1yp11n3625plq4nj9jw1155p1mhzut8ixvf6t1utq7xvwrrmytczcv1e54t314scqi3xu0av7xvbzw5pjan9zdhpq9hnb38crblhzkbu4w74rwiy6rfwixkn808jpjvkrochxn',
                fileSchema: '50v0grtq8lrj0kcnqmo1faki5zzdc9xr8kymdlw4rjppa21zfbwfqrfr6u5vxqwrllfdhx8ttumbscjbeyyqeckg2vaxhmzz9tcnqdps7d2hi49sk85zvqsd6y4nabivraugdpb3k8n6wmeh2t5oua2h1leidsvkfk3p85b772tx2t0fee1nfdrig8q6w66bb465gd5pjz600uabuqp308vwkufnf8bkx3i9nbf2matd79lv5t6iamatlx5wb1tcquassrresrqzagu0cwe0mgm31n7an6ei6jd7meymtbgztrtoany9uz6li928a85z5hvv3ajf9bao5g8ef4d58glmrot4c1b0tuavyam1c1s708y3dxox31zn1nasny8okqahg0ut4yi60xw37ivy3cpju13escqu2497ceunua5vzvcya5rgwihoxi5llvm8cczbhou7htt22wz77pllycq8twjdu01q5jkox4qy6woc0229bem25b8wzrxw7eekeyp7e0hd9954dsrlgzb9lhgqi5me995gxdpudrvth3ovaqzigwkhwf30itzxgzgm47jcdiqt45vbc8xrt3z697qpcwqhljr1ut41qtniyhqedbnst9xsk2epvhnhrrdreq4g4ddh66sr8r6pbum8w7wpmw8bail45djlpuia4qbucyx3t4elvdkumr58btvbvymih42obdnt1wwsmz09uzss6jmkczifc6pung8u4wger3l97swwx2ucjgbz54v9gi7o1jar014ruq5ur2dwz94nxswnua24i5rpe4ra9grqfd6lb7mqb2cg5uedgv7r1zn81ydmxtr7gyl6ggjsiqrusyxw60xig98cyt0sjkzdjpecgr03hh26g86lqizkqx48iaily7n23v5g792h7z7tzbjyytx9rvk7d9vu827fjjljod1oy20a53zcf4hjb7vp2k5phcqkij5llyvnur5rx1irt3qxy9jx6iv6j393sgseve79nz5e15rb9ee',
                proxyHost: 'pqxenyd7gx7xfxcpsnx99cazcgjvef9i3lfzl2udidhd5gnvcr18myuk3pgj',
                proxyPort: 'h0irruzmly31bqjptoys',
                destination: 'i83g6i0kb9c5b72lghvhsebrjsdqe5r6jcw9odvboueu8qu3wnirdedoend2yp5rp7rd2y7w7aga3evnrmqy0t6kilkfznsh5d1pmwxmdx6hjmycixrwwi37lvi42fin2bsidfwxgkw78hcozqp6m2id99n3a7op',
                adapterStatus: 'zgnhryqwu0zeglltrawv',
                softwareComponentName: 'azi2lc6hbe9jby6iqohzsyt4vigag5ryqeuvygmk64cs22ixw4gozbhqibb05fo7tlagpapgjon82ffs1mg6i2bml1qs8ql36s62v27i5vgrjrg6jixu2cllqkx9a4841ydushg16v0dl00ovg8un06ica6i6lzo',
                responsibleUserAccountName: '6ugzjql65lu9vtexsle3',
                lastChangeUserAccount: 'y864nccjaihel8hhxrpo',
                lastChangedAt: '2020-07-06 18:54:09',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c',
                tenantId: 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
                systemId: 'f25f22cd-3121-4c65-9930-f5dea13a6019',
                party: '2qowrd1skoy2ap6g6zmp75zwzvktidohabd54s23go2dpdl7moqrevkqz7m6z06stvfrbji1x6tvqzhhcm56nbbdpbybcjjse27gwx4n2idd25bk7571gem3ma5av9shzyro8qq184lcpgdm59ran5xot12cj7xp',
                component: '926nvluzlx4osb9kkox69a0ubwkv94j81i643rutfbhtgdiagsc14bxw3nkwu29cn3o7mm96o73ynaj2tqiuj6cx3pwr5euypoe54oz64jg1axe79bks08isuabelgm2jb7oedqndcve55lm782t854mnf0s891j',
                name: 'gxcnjqkx9agmu9dd5x6t9lv4aveeardickgn3ihetut53htnguvd6j0gh5tqe56secrpohk7s8kf2hhpokhv457nj0cxx0yqkyh2zpib3dfz27817hzv0njky0zgdllwbv2vjakreir8oq02o0jftosfgo5rc4fy',
                flowParty: 'uy3xfkmnssnux1bemjvhbzyyncsazes075f96sgc7omg3fsh8kg64cpfgr78fw97kpvkp7omqhfdpnt2pz94vne61vf6w9ja36ceji1jmos13p2933m9w7nvqnvf69xrqz076womi14uwkq5ag2q0m24l6idv58f',
                flowComponent: 'kjfgoyarqslh0cax6eyxkaw7s47g8g5ydgi03lzgi6djqrg4t08qpxaxz38sgfhyuxbld7sh99lrbxk35ha3jx6mouf5j9bu6z11c8lgkcn6ceq5giv0783uhezog2qyjdxj07b78q2zcu9u9q2fr0o5iks04eha',
                flowInterfaceName: '52cxbuhmdq71m7uxwqbg2oigy1lctbkam7ugn6ia3dwtup6dl884nhbq7rm8bsyvelminzx4ysbgyvrawfbubpo2iii66djapu0vvvifzyhi2u1d79l3a72xg3majvx8mchfbuu7s381bfb9vk45hfdmm77oq5k5',
                flowInterfaceNamespace: null,
                adapterType: 'dhnjtuuywg2ccinao3ucrxf10cwzuhimg9fcozumowlohb8aov4c7tbdp5vs',
                direction: 'uov6fynujmpnk4qlu6g6nrcrmq0z337dtl7p8rt8knh251lbq65096lwu699',
                transportProtocol: 'zrf9bae7irdk1yr6wwiyxylqq3vsvqdxa23ifsikow9fycn3i1e8ao2ecpus',
                messageProtocol: '4qa86gbcska0f0ftu8x5uyq7e2928sjckofo27kxis5isqegjhk9dykql72f',
                adapterEngineName: '8hxsla40we5t2pbhxse4od5tais1dh4bxmmgjb8huxelvt65s948u2qb0b95a2iew8psotqdixkxkedp8ml9h0zz7cxhchoe9z369t35qqhg5a58zmgpq3go5s6lmxoeav87e5ufjwqtjnuzuo692ufqohtv6o2v',
                url: '4naud83wkhsph1hiuq1k3lw8mgm8d0orlu0n53icwchye7mz204il892u28a78ftxjg8kukyzcd71tpwx6757jq9vnim8tlib8tkz98z9oc4j9b6b5aqtrvfmgy0lotqruef80utat4y6sgst8vf113n4smc81jhxqj9nfe3d9cr7oxfaufsnje6umsksm8vooennp8fmzd21d9r53ntm2zqwchm4877mxuwp06t8gz6eu0530jx68nmxrgmmk23ka5843bfq9irat3h5rlfpagr415nb7l95rir6ii6u695clntq8jr17k5aai68nu2',
                username: 'pkdxuqcgu3uf2mksbk6bsdz2dah73o8rd4dtnnonnxpd5uw2cv9vffa7mv6k',
                remoteHost: 'wnv2ck7osvf713k6ry8g6611jfpqal9n8zyjepw3moasr3w0pvxjut7sciy8ljqw1l2eudwsi569bdt9v0kc77h1x4wr8rs6x37fqghre0057e23qqzbjx4zgrccjpfwbec2brxd16a31m6fsq4v2dx83ea97r22',
                remotePort: '681bp6kbypi714rjrx2f',
                directory: 'ig1az4di0881obcw5ys9jl0rbe6bs1sd44pew82m77tnruxcc050auhbthjotlgklcysk3l5prgdhmff94jvyufx7uecxrjcgznwxdy7vc44mysb50cbb3nih74y4tq2r489rvcmgjdda77jo81qnfm0ljq9vuij35wks76847qxufjm6s95ay52lba9kfhjhxu4xxdc02mbg7jkvs5g649zb7hcdvodqb05otxspii7lvd6ah8ykt1duw2krrixoh3zr771qve93fcuu3gk1cgey49iz8yjy25fvs5mn69s07xk2dqanrn5f1cygp3tdv41sv2goq402t64bn88887az8yqm6kpjc3ysu8yich9kwtj5ppscmqr2k7km212ih85ibgpb0k7mggw0pyunengo4diy28wuji50wv2u0ghj66k53yp5sa8x4rknifshrcikucy3zlvka6aep5oasgs12swdhfbu5332svy306rxus9jcz8yiwa1i96fepzy58e4aa01tlkke3jmdi586vhunlf3czknk9hii0ixjiv029sx571qwweyrts86z1dqbx7b8az5mq9ukrmirbwmwgkda7be3csbjbfunpoiewe57xaxurm4m280ed9iokku35hs4vgm6wyvk083wv30ggjkf34q4lloknr4nojrmg7sbi10wls0d7g32xdljk4c89sazdsa2lxrghh6071n0pkv0ylxjvcn4zdztnglxvxm0rvk7l3f4h3epm23ety16bwoh3agz2we1vvxn3va0lsi3995dwej2y52b2w493j6yj6aitkaxg8kwi7obkn7j9rtz3wmb51rcsjqzgfww5737huu0ujwdx5flrzc57cpvq5o7xdimzhsvorvxz40dgzh1ri62gciqnqwcv2wbw2hq7kdcrj12gcyufdaq49vtkbuqj8pw4roq0hcfv40rg5zik89glla9wfym0dfh1nnh2hw6fxwh1c33rcbkv460mezdzmoyo8g3b4wr',
                fileSchema: 'xuytkfxgoukezwwd43kqbspn74qs1m4y937yglfalwlzq56dlq2q7846pb1mcyj4k4qox2vbb38n7jz1j0cv4asw3wicsu840f7e6jfcwxm8qxpfe1vc55st86icc69bkt757i9n8428jybgw8v2jg1svchljg4gjc3bnt616wy7ltvtbux7olasgpku5o41r3frelskp0gnmft807uzdmaeq75aix7f28zigwk5lhwpn0ha1e9kyvzh7bidn0ge59r2o2nx2zza7u1u68qwxbg1vkmqys0elxe337uo9dypjpj3pqmjohwd9735gzdod3fdjik8u0ek9ii13ow4fy6d137y999pifz5c4t450gm8akgarytqiqt328ueg0yrp53qm82f0t2wcsflrsjb2puuu506o1pyfc1wcst14p7ua97sjtg9oik76ajbk8sxf9r533zgq9n67e4wtw8iwyxarjyuy1vcyqz0tkmpdqz36we6wmtf9ff2xza4d1s3qsx3wqc9z8q1gv6t5fojwrimjdimjzs8ac7pvo0k3o2az63sz73xk8xvznvtsjyzfiroxs1qh0fhbol2zs6ma84lfe0u4m0m0vmsfhe3azmac5kxy4mycv9sbh4396hjklqaampkqw8m12n50a3q1ipc4x3vv18tmr0p4dn5c3etalh5cdbuyjsammo08f73ky30utnpkxhuhjvps6sv1qjgp1xlw6ceqkujs1x8hf9jnr82qj1nmkb7vsq6dws769rx2p285khcybhnsnuec3tpmeea4xv580gpdxsbps3x8wvp16o54xaldta94h9umhd2til6h7iettuijj3mpgrtgbejy13bv33yckoscei4s987tnjdds41fujaca33hlc75gsyo66gkyu5xzts8bsiiew5nw4ynn6h4zi2hkqc0f1ewj23damvgnpop74lre8581pcrfvrty78t1bjn3fkfe9ifwluo7ey47iyv11sxia78oos9bdt804joa',
                proxyHost: '56om2zy8y90tsu7lehssqb8r5nw3g9cnslob4lijnlg6m6ooowqypt04cqfl',
                proxyPort: 'zf1a4rdlx6l2e01op4cx',
                destination: 'rpixka1jorrmbtew1yxsuukh29w7bwrkmdgxyymt70ivqdu4q4qggtz2sioz154q72eje5ywiuv0nl6ynvyatlbwkrtli6gv6dmhq5dbm2r1glo0y4z9tpw2t4ksamie6mrrxhsdb3us2h64nk8hno8brlcifk9q',
                adapterStatus: 'b2uuz6y2com1tt4p5x9b',
                softwareComponentName: 'h9yi60ie4h62s64mf945kn47nicmb4xp74kjj61rrbuobpwadfy1hge3obgkdwr3o1rdf9up54jgh1dj9qwqp6ax10gvebyrefxyf3hay70mc9mg79w1y1qykupb9ix7ddhvvatysog4qgn86gg978x8w56rp3yd',
                responsibleUserAccountName: '9y68uwayhdl49sxkookp',
                lastChangeUserAccount: 'umea4auimigm9c52vbwl',
                lastChangedAt: '2020-07-06 00:40:26',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceNamespace must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c',
                tenantId: 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
                systemId: 'f25f22cd-3121-4c65-9930-f5dea13a6019',
                party: 'v8dw1wwehqct793b7x81lvmgj3xth5qn6wskkobbxdhhfu7krg6kf098tnqiibc2mcxcvma952y23gkf6gbfbjsygp80dzvj5hk89pr8hc02wdwtkhpaqa2ngq7hcdnagynd1ordfsdm36s8jcmjpzmtkoydp57s',
                component: 'vcp25edlojl0ll4yebniawf3ppie4xsowtgpacn3fv1neat03w7tdp3z4y47z5gtyih0hh6rlj0q1b0hk8p7qg5j8x5iotkcjm40le72gf841utcqkk9p4drd3824xrw0d1blzfzysyx5s6uqpkbi095o8k91pyq',
                name: '74xd98z4jvifrham43xmagu5rwl8wunbildp3gaqq2e8q43ij83d6bukuk0wdeowksozq9wnk23d5hd04rzzrixfjegauz8zspfcuoi6xiv2q0sppmn7600ez22o863i2fdkp9l3yc50xuewhb6i36z9rkdky5kl',
                flowParty: 'dkk4w9179q8yqjy3gdpyy1er5dy4ypt0cjc6c4msaflvjepoz4t5iggtloxnk9jepw273mf4663iw83ul8iwyot8u7nx46brtfy7t6ajcupgze1eztuhg4mgtc16pmzomks3nak97fibbzd7fbasx6tl5ikpo047',
                flowComponent: 'b9v4fak75v79rn8m6sj5l60hz74cbqtfk44qfw36uyj0ged4it92gzh46x5v2jdqrkpduxpy889vbpk9x12kog1inqyzkt0qneq596vw407jincgjr1bd53mv3zzojj843z6fwddiekl64xa3ljm7rixcuqum00s',
                flowInterfaceName: 'fn11ixoowr2jdmydz9jvagx29wgy0kbjx7emo4zqnakapfsclh4m7djueg117olz2eubfgrcvnjlvukirxjenopmsk4gn3z5oeor8c403gta2xbqpb76l0671okssje7uxcxd9nev7krns3ajxh83pd6o7sgr69y',
                
                adapterType: 'ogy1h0f6oppodn2lr8z84g7fm3nb1e0kg0tnri5ivuah5iqfgpa36l33xwpx',
                direction: '5qxhjizgrax4lqx44bpc4wsel4zxy403kig125830ph6aknxlavljusq50m7',
                transportProtocol: '14pftfe9jrmszwde2h94qbpelx9zzk08s7mx10pbfjmdynicqbzovvf8y927',
                messageProtocol: 'n3zd585db7rje4z0k2e6wt15o0w4zkhti4ky1bkwv5vnuxi937qrq5gcmgme',
                adapterEngineName: 'iwwfz0f4ndebeb5nd5cq98a5ytrc613y4u21zan7fwlx27q0ryvq7avgpb76dmgsvr1295v23wfc6dbhrfugpgmxbedftcixl0e55lq23e7yw3jl1znmtot631y9tevdf8vwtk9wfpmsrgbwktt75nclhs3u6yd8',
                url: 'y77h8spul2bpauug7m5vgwusmbb04qx3g1wgvgargytf7ki6bzrep6heicfur2566xb2pw7vx30ma1xo47e5egadqw7az3vra3f1p5pnlow878hxogw6c5zdcsb07v39fwshnj0l0zdkyhnrykhrbs8veb8ts0impxu3u5bylqwq11jyijmsstdv7pn5cztaq3v1qd765rwhk1sbyod5x6fxehd2wvjiirffuscv7apnjag3i7yzyu61l4ln0s51aw3phkpub3asqdk8qujgz3msgvezik4xwe402omnytzy18s8dt9il8ej3lxr0id4',
                username: 'uaa3a9t2jsja4ovdc52t4yo2uc9kukf3p2lg4vfjlpe2zzssa4lzf24v5uj7',
                remoteHost: 'tlumah19uo9c2qdoiz23hmg05t5v4gjh7lvus5byodqmpidtegptsi0q6o7kd8y7mrpcsm6pzlbbnapw01eppr7zdbxvcyv4pzd1mjedholcxn3z7geoxvia4iyurktu5htw1brdcdzd9xfv2n5h6sztkf3ldeot',
                remotePort: 'cyyujyq8qfix4qzwgf3f',
                directory: 'sopdzkud2uqoprsqcyvaard9svk9c0ve7t4tway11f0ipxscbycdzbsff9i440wrwgx22ku0x2cut2302dmh4f3tktaeir95b57koc1nfxua2toe4dkdgp0ss3zmj7ldrzm7n4pit2pa29ltesq7ij1c007txh9w5sk50hd59eiba93v1hlqlvyozf2bfxqkk97bnaiasp7w44f3nytnwevblw2r1iqb5zr1v11xx2n9n7c24tgs48d7iwy12xiq8pvuj1743a2v6r9xug360k3p3od7rzrlaoch1n2nnwn4brhtkgm1mix94kib2glnj9vim6ocbi6ws9n1hyvy5t59a7m4rxghc6ksmc0kbi4e4uebj5xiymg0x0guqnj3g3os01nkwzvdrg9z3uqtcmpf049akq1swq15gh9n2wmlgmd2l32hu3n0cagnk6m4aeza5llw6dgplzb1jnvxrfv0ft0bj5vw1i8fd8utimx6nn01johwb9uwnftrbk86v0w0rq12260gzdsyj0gifrb6hppe64rrssobx1mf0558nfy36ca8zp8l2vmbfg5n09cdr1bz6quh3n4y0ef32weuae53jkn1riam7utgu5qfsjxym9aceg03sh7jmaq3p6o518fawrb4wemxep9guziterstn3z7ly3jqoyqqp3ex99rc04o3xmdxadle64ow1mpa0fzl93i6q1gy09gcrxlngreop515ke7jpqgiyni4gmkaiqg1ccsordbneajhfjwbz7p3svx9i078gif7l9fkvrt8gwetd114vttd1fvz9sik24tntgbqnebfdxqizv10028xtzewjlm4ophg67cnkcas5d5asbn4ahxjouo5vp0l9ymln9yhpb0ls21pzqf3s8sjhnui5x1i2lct3uv8g9i54uz6mg1xlki9w998e3f3yki3vcjgycf1x4swnk9pfrv7elsdqoitwsok2t3d6fcivtpt5u2v7q4bjlt1ttu59zd78mpghntei4',
                fileSchema: 'qkeoqwjrg9f58a2zpu6ia0ry3mhoizcm3wtbq4zwvlb5vl280ubg0l3ah3qa3wbgtaana3j08q1346u0ir4wq55a2l5nfzt8kzyxrfxc3zo7opwusjpgri3h4trobjktmy59yca7xohhu7mxqo6eb6m6c53ir4z821yguvh0rh12z244v85jsjj6yia7aooq4pkbe81pg78d2ty8lcibi1l8eaqgnj9z5haav7ic3m1q97i7fvcs2qem647rpfwmnelfbtci83541ybpwxfr7rnbxwprqoz9lkc5ko1bk1v5kj9n70pm77qwebq4ov960o7ko2xwpyuar5qj7f4w8jzy4x3jallpyjjw6dbejmz0g1uyf32e7lqjlm2023cgr699s2oemvyjuztx7836qwkesbg3n29yfwqt4tz0xdjfhk48w0p52f0kcq0axwgz9qfag56tiesz87jo9qi9boqmbnochkyur7jkjcm08k626uldlqejpze4bn57kv8j96fwdwy3gxgq12prpxn1f0twxgf5b9jqw3a22ldoq58kxjg4e42trpnt36pdmwpdi72xqsot7m1i0xe0an5rd3mabbjvnqis8nhcg28vjcagifbtjon592tr0ghp3z531s7w864e3jao7rhjypoz1lzi1rnkc8bgu8yvgs9uqsz25xqu5m7h077czv5lr6uuulnrs0b8fs8nc4x2syg4aifndt4lx5jcrdnewd1q0ncj2ifukzy3p0i04l45pavj1b24v4org8soovd567sxlf7yp6oeuj1zpdmueoz2jraplgmic6lgfl6oe2b1aykls2vnwrvdqahjgsdjiqnc37iuo61kttni4bifbnznqrdd9z8cmssvxj76a6k8qcp400au8ediu2a2wfrye1ec83r5r66l07t7n304w2ir73jj4so8re8pq86dnj906qep2wvw0ifu3b74wfoq1i9be04cjeqsg7df90ql6xnv4vipq6av7wvfm3o0noas7bl',
                proxyHost: 's6evwzmnxd0iqn7gasagnwgb24fwt5zxm3dyfj69vkxnn4m9u07iaqpvn4ei',
                proxyPort: 'tlz2aeqqterh8o33bk3w',
                destination: '0sc93oc2krv646dkznmlj28ttaditlc7gob5o4u6vk8rr6e99k12hbcqu5mugpcp3se48k7nx9o9oi424nnz85qxuo3q4g4awd68shp4uq68yc16nexwtdxq7y79lz1valwknbs73ennxm9rsspb8pqm66ogn7nc',
                adapterStatus: '673py5i36tovuu64lery',
                softwareComponentName: 'hpckb4fa3d2mscjum9hqic9jkmvt6oyjgaj60f069yofh56f0rnciwxqdug46v6mtgrp54qmia4ondfswe2wqfxkr2a46h9bxksc6mv1a1q6o02uojt68gb9ikz5apcghfas5k1efnld0d27btagbvcp8ifg4x2f',
                responsibleUserAccountName: 'tzxbn62sw21r5dikdfdi',
                lastChangeUserAccount: 'yoghpfc8ubq57c9wtf8p',
                lastChangedAt: '2020-07-06 04:10:56',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '9lsk24cjczjyb03cvkzmjk4y38sq8st5ursgk',
                tenantId: 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
                systemId: 'f25f22cd-3121-4c65-9930-f5dea13a6019',
                party: '4ltfxu7s6i0j8xgwqcnn397py65jixomc0hn268fgao003bbn5gnin8hey3k7gfb74e3j2ap4qdeu31j6etxv1shh73g1t7n6lpug5jb3eom8kqb2ae5fljv612isi00tb63fdux895dtkvj5fs55hysfkiq2ama',
                component: 'juloxnntbvjnd9xqec737ezbqwl6pbm23zjjswp3xxxhwy1g13l3816hob3ardwvv60t6s29182vj8699pwmn7631i2wbw1i0x0xcu2wqna4taof2tlfhco1gz76g0h9m1oc6j6vblraucxg2rzqnea9e6jjik22',
                name: '2rokxicbsf01coecnczszlcwarto2hjdghxh55zh56q8lcb4ci5dw4j8uevsr1k13atqgmeg567c1zgt35xwisktiovzahnj927ul61ec9sske48ttpgwqo4a9lm525zd94imsveycisvc1vnxkwytqdq2lb4txe',
                flowParty: 'jl5wkjzdvlqar5o5xvd3qlgh5rxq46csk3sszuabh7ktlgnonvb24zq5a81ohg0ypgm1qfsndf0g4dgvu8awrikqvgl0v4fgo3hresk08nnyis1un9vhz8zwldu003n1987ok7pkteg20p5a8nvajdqj3f4qraw0',
                flowComponent: 'hm1f5ysiit85smiqmkdu3lrgx1k89unpekysa5q3c4woxux5pw0goiqa66c2dcm0xe1yaynwts3jdbs6davpzqy6pnmimj82fw9vkp62l7awdhux9b3dhb5usqs5kcsjniwuzewjgglhwfr8ti5bmlydc0na8ohy',
                flowInterfaceName: 'd8j2dlsokxmvn4ukl3hwi6mz2d9933ajzgzlu829q7gg66gbi7t8qwe7ws2klflmk39ed3l50jr328tg4zy1m7i53gv7rfm4jr7sb20i3vx6vwq890ep7odegzgctnr0vef3az6ducrkxd0u3h14c59uoo2t4d8p',
                flowInterfaceNamespace: 'tljaqy7qf3pb08jbxc1s2seapuvuh08srb6xrrawqv9jio32sv1phwxq2jxx98ohkc5gdo1htjw9ahr5p995l80oyf0pohkkwqoivgl7vavmdpbyi01ryyvbpd1xhevxs0pc23i3ukfapbg1b9nlyyn88w2n074p',
                adapterType: 'hgnidht7v6k7gsy4v1c6fwam1xyhqmmgilw4hmf17f0a6okl6hspbjst0uk7',
                direction: 'gzajobml2in8y7sjxhor7ge1nq4kbj8a1qdo8wy36ai1m7izha9jalou8ht2',
                transportProtocol: 'scro6r6xqndy4kox0q49x3o6fsr3grwuu3aarnocp9pu8jrucfv2ztdmag7c',
                messageProtocol: 'x1hbgn94sxtatur160kamtnbis2yotfxkpc85lwrt85jgznpsp3teq4irdt8',
                adapterEngineName: 'g0jwjkfx4w64jczzk2l4exedt1ru2q8pch9whbd73fli1t7psqv8wm6crjwax5nb2rbdag3w14cwbqvk437ag4p50ff1igttqzxdnddgn8tr11td48umygvhnin01j40iwm5yx6xof4p6c9yk5xwy18ccpeu5k6h',
                url: 'kdq4p2wpifj0ioqm6d7lkqcinn3t6bm6pe8r1nxx8qthymgr03u3sjr3p9fumm4jwq1kngu2y6ht592c4kbbcklkjy7o58ma0kss6b98bs11d6z13yz869408xtr6a0ox9zuaqs0f6r66uudxttc36pzu6f2laf2ohzzeshpo6wm84bygaijmy8qo0vnjdefv1z9yk470v5ia24u9uy2j00tqg2va5d7mr09va88p0lh8nnk6dqqlvm0nr2txxiw6r6hrrewmdq01cfphh2cg4rm2m0ohj4znplujzmyucgllhrdwc6kckm13r40qag7',
                username: 'pvhmbq2k93j0ftjpemgyq4wy67vcfph2qia2gdguvkuu2h4zom4udlq6kaps',
                remoteHost: 'x021x0lp0m3o4f6hbck71v5vpjbr88uz8kxox8l5zy589yakilyqvjve1b6gjh5mqc2g4fldbk8v1h1zz9man6gf3ttz9i000sybkegbqjx02ehjgo2dk0j8fkke8712tv2wy7zj1kz0ys7reixnbl2cg3yawd7g',
                remotePort: 'u91df37x7ud2nq2swbdo',
                directory: 'b02p2zem3z3n4mhm6da1xug2lxkgl9hikwukvf0c2bsrmnzr1ovjgqkcalk22es3wjohhsd2betk2i9kddfl73ddvhog4dke2kg136b6rgp8jyjeud97wlqp7ynve30qlxsww6ptvngkyyr1yauoumngchk0tw9r6vtc4gqemjzv09uq8npswstgoqx9x1zfmv2np3sbwobeq68t0g1najabmzcjc37s25of9vmhaea2w94kikoitrh38qfmhdzbdtfh72bnm6co5elvco8mem2yvuquoh8ypmpm8agpox2jxruesl1a7qhjkzt4kxo5s5dn3467fymt47vzjdkhs75w2a8ipef52r8x3jp1fmad1y7fc7ydr0yqoyvekdq2u0xy6n5mpe5yrs26y1j6mcrkqgpirbn3fx1lihnukzzc30c5aespb3zcta7oagscj8med176k4n2naf8d9eq8kmjpe1okgixnl4wwyucats4yj29tinqa8rnm3m95b8vh23jcugg6c81o1caeekrvrwz2ag5r4d2azesrsnxh6swodmcgt9we8i6l7rq0jt2ms8cva9gymscpjowtddlkknq0gpdjre0xak70raxj5nk1dw4gd4c55xhbk8y0gx8thi3vn6dnxo4xopowovngt5ca3na4v7womt34ig01glyq6lbzetx8y039yx7vops355ba1bpdh2i346u6cif4b8nwtw1627y65pafwk201zl6a2z24zo2266g3alyafyt4o7ihus4697z9eg8hypxk0f8px5wm9lukzmyktsao6hn1z55vntrennw7lpgg6fq5jxtxmymzw391f9xn4wvbe64vgqy3w8xzkx0kfynkn6raxkbd2ruzjfvezqnaxhd084r0tdvgkaef4sv73f84i2bc9twioomcliffhj2jx6ay20t2x3eez6dd2c6ebsq839tncb7pjnizpm7yqibac04u0eopb50yaki10t9x1k84ektfh0yoslydgt7qi',
                fileSchema: 'fujpevm869c0nvn6ujl00oj8oqmsfexglw8tyglydrrgon4fh26ub69erjoq36ld83996ma5sfkohe1kyjdmoesyasm8tx5ni4r4f5tbgi0kwggxj6rv6nlo8c0rna6l3oelq39wqj0va6la68iqy5xivmmkf6x3t5vozikhxdff7t3s69jvzex6jwrcrnpxxsjtsswkchpl7hj4p4o3ucw94v5lhotx8qoufh546j3sbfsfd8i0siic95vlz1j3ejmzgiskh0o1rjm30zcrlxaskmysy1cwbuzf7ncwmzlw1hkpfq62iaz6ybzyhqqhl7keutld62d1og3bg5d310x3zedytgmr5985jhdlw4z5u0p58ysar7pagnayp3d719vh4dlq3a0uwdduwm16c6ch93pbjytgddzpzl11aio6hns2a4ahxt0dvr7ke1y8l2uk3v8l33ssyjp1knc2bijx74p3swcuotu0b2rv4dcqmae9l18tpfnwqip9brhywvgvuxyk0o0u43o5x8i28z9bvnuunjl9vqlktg915l0o1m57i1k2fj2kg6rzosctoos1hzip1pit4fgrugkg9b9l9hthuroxfwdj8vsvmdyqnh38wx09tjh3okb02c9l2c7lbmxt0fwxsclejd4gamntui7slc3pq9fzvflad839bxq6fcsx314hkofwjzpiu3y16tp595sdxms27t93u2avzum1ld9s7gjfg8jg1nqwtgb0ooqn6f3bxgkplfcay8gulwv2c7gvvoctm9fjth8g07qd8lwhrm2gmii6e6m32ypj4u70p4sdoomiyk2s6s8a5gzydfeg41he3gjj183nthjneixc72p4de6m3xr6of5xr0t84vyqsk8qabsjc2tobk8m4ao3imyk0rvsiza7ejeq1dpkk8326scaap4ra47m01m9kfi42h5q4r72hqc225np4wdkli2ubg9tx2lolbgja3y706io0d0kwk2iqg0romhvwldwrnfo7z7',
                proxyHost: 'mrxzuqcg2zgj5h194dukidwemk7ofgz743ooie6r2z7pjlbrdochhkpldnas',
                proxyPort: '07aeecrqs4gofrwjw9st',
                destination: 'a0xtghx2ni2wzovqps3l113z09vsoc3f8gyvsbfzs7fsplyhogn5pgjy6h5fzjtxha3vj11jph6nphe3eqhot0lrxfof53od2pal7imw52ucxzh827n2xqmtxt1ygvrolda3v2iq6967gbomc44zpbv1n713qqj4',
                adapterStatus: '5n1hcshx4mzqo9ppxcf3',
                softwareComponentName: '17an7zgcnvd8kse5eu24n1qlj4ssk7ssd53yuk55koe4f32b5nkqoz5i92w3m9don9378yyhpe4u49lw6973dk1ha91mj9i3ub8iikmnpnojhgpdnzjkhbb0tk6x0wxuhopou06529xagrtt7pvhteh502bkoy1x',
                responsibleUserAccountName: 'uz1egm86snkfmtoauema',
                lastChangeUserAccount: '5ggmyz7qfgm62m6ejig4',
                lastChangedAt: '2020-07-06 02:20:26',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c',
                tenantId: 'm3r8u021687bfxhjky1710keb3aur1m09ytum',
                systemId: 'f25f22cd-3121-4c65-9930-f5dea13a6019',
                party: 'h2wc2ah1char3ouz6o27fxyej5y6kbukxb0x76u7yn7v22mm7qlv1b6csfkakup71e5g9wuutoaeukzfs8isi0jh89umm3wfrifva3zdkp2dax4xma9jcf9y25oj3e2fdr6z3hmzppqnq9v0ba15qlz5aphfdxkx',
                component: 'kelzdhpfc0l2eajq30n1v80kdc0d30lfynajsoa2ihtsjbiceiscm2rby5jvnfpaaacf812p0wuzi3wy3y9gltj6vufvxtm9lmy2wmqz0egnfrsk65uesxegsdxmhryaz4l58hr82zbvtsqc0nlin0spk6ttf42v',
                name: 'onwnrca1fzn2n2whskimaf7hnaat0m0jl808igm1sxuojfu92jq2ugwdbu0mdmm6chy3rknkyxfifgchlfspd2cd1475v7x4gc3pejqy5p9gnnaqpe0lji3ha2sk1ltj36wtfim6k73ol7agv7n555mrv0i9gvsw',
                flowParty: 'kjk8lhj56m6ja6gyj8eg2nmo7txsqnu9tkduqx1pa72uetprzfverpnelkdu3bu2blig8v2m75c136lzgcgt7bh23f1pgnay0g203hwammv9i3ub8tizmlqds3vcte1mxoitlpmmtuxc4rjgrahsa04j6yjb38x2',
                flowComponent: '037z85aj5hy2r3z9vzu334woag8bsswgr7trlf0smkayyluqglj0vy83nmzapfq5mrnlr5w8ovkwksj4fes9ah8qd1brore4hoil4o7e5870ncvcibp3c84u4qg45ppihm4w9wk9hpmkqff1ykdagp26g1t7ghlq',
                flowInterfaceName: 'gcin48ueg0u145q7skm0mps4g06zcpnz1406cfoke9mnhaaz5ma48z3b224ozf4e1kssce4zzon9wcm4txn3xjj2sg3m8b31fj7fjrr2yc8gk0wrymbrhwi7fu0h6op1zebv4ihb5150b19t0uchf5ftp56l6gio',
                flowInterfaceNamespace: 'jxljylik1qa5fmgl38w5wk9tt4ameo0e673fiuyszzth8z6uiovvdp9ab3k0km3vdm0l0ypinsh9y840e8qijcnfkgacjvt12ja0p3izomkthnsavt5c06mpjvgleawd78pnb454kxmr7x5xv6g608s3m9mze06p',
                adapterType: '4knnw7ddbbobjcteck7t44u07oz54urx0lb442qkg4unl8uoyz1j8b4aekg3',
                direction: 'qpep7zdhfqk09q27toi6eterdqy0wfig3cnggnyqvf6bntnbd683hx9w0ghm',
                transportProtocol: 'ii7ixburnnq68vf9rs50eafuxohifoe76zueeppqkpeyluvxexh556l7pjti',
                messageProtocol: 'mk4a62jmysu011tt05abzvv5mamuhxhj73srbx2arhgubkrgx6t9kiiygk5k',
                adapterEngineName: '0n3122b4h25jaoy4l4i8kedfv4cqor4ifwj7y8bob5xthg0dvx351vx8wbw8berq27jgpe1x56s3vh7jvh3zngn7bd41cegco4z3fb7bk7enxdjbib6uyjxb3yir3dow4t8mkfyiztj2lkqd4525h0evulz2te2e',
                url: '4xxhhumt0wssasys63mjk4qr2i1v9942zbgxups6uwtpydu1i40n79d8olv7gzrtui438ebmo5j1dvgn6lxt4j2vt1g1z900r75gs0qsmsheox1pubwr3g66emgnwa3rxfcrkfdwwbecb5vrcnp45tw4nwfb7igfsio8cg2gza68s97a394mtw4aszp9lybx6wglp5tv6h27gct1ba17ha5bx7hg6nmfhll6jz2tupqhqtr06vay4j7dud9gpr95bxmy3naoqx1fc23lmwwp3exu845hlds9a8bff2z728psny68vrv7sfn23yzf2rw8',
                username: '1zxg9qq5v3lisnqwo55xof0i3f61bngw3lvsvizyua0h3va1ovb0xddvo51j',
                remoteHost: 'g1xgpf9lv0indhhh0gpodu0keesujhet4l8nlb2ptd0b3a1zpoxh674eejlb6ygsyffbwohmetcl9tbo7145hb7mo2phe291k9rvilyz0dtpj33na1k9dswx95wt6v3y8w1537z3nhrrk8ritez5ybqvlvxp8c19',
                remotePort: 'nkf0wcacjvlru6hrm0ii',
                directory: 'pl7alxreqooqregn15ip0pmnlwu9zsm83kb2xpniiqmfiu3ixz8exqchwgwhs2ozufslherql7d050r8r9mun9ydj7mjiqsix51z6l8qcska2yx0k26z3w5xqjpd08chstdb4x3sfs0r9ntvvtmpa3irvzmvc0f80a4499ygpy9gspz6ondafs1pk74nvoxhmpa5o7s0s6ppd84ghrz0wa3f56otybywj0ykfwzhzuqnj7j8t9ttw1st03d1ys1nlqoggqvy9c2wiw32hfpp1r9xk42fx68nog5k90gi4e9hx8ojdqgbgnq6zrldwyq4895xqf4xyv4ovcczq4kzczzvvqawzb376295um10eczl26kpdb93b98pitfgz7z7j5b52fs7l9u6la15bjo4t43vfvxsrs00b1o4jc5n83643rsmey4lo9houa2x1rkvd2eosglirv1iuru0vrtoga0qgw25m84is9qbtczqa659ffd4egka4zes5fdlbyksvk5ptprai6qnn3nt6ej0wefdsdwwuaukxcminxuwkjnt8bh74601p4mzqywfakk8cbe4x6y1uwzcjii7hcjgqadjixebwz8fgt0pp5d2j10puh4w98qc8h5iqw3y4qubxqhv2gg9mirkg7d8lj65r4f08zo332bdwqygryrvuw93ra57mclasjub2ur7rhzsiu5baa1wejueswgq8a7veu2dtbb2ddmh2l612xaqi1f7nng8gro9ahtg76alfxiilre2n72q592a4j715z4i49qm21h2y8031grnmsl106oe90bgggf9s0lr6e4k0a47ombaib4cki9txkwwfy08fna639u1vrz1z5vvt1gbeh8u6cf2lvkn8oe9enuikh6tz5dokb2idc0tr4q9hir5upir90zouasmuxyeekbob5g6xxxlfws9ie8mtcgg1zr9evcea7sr9cvfgzo7juexk3e6t47fhw7sh2ausv7a1nvvt09sbps8onol2t9918t',
                fileSchema: 'bc1fp6n60xy0vcdj6vrdvetuoy47bki25db3xghofq98hzobzzi64bajrsq3y3hgqx71gijhsayocoqcwqy2wrsl4lwb0eg86gkgv3y39tsty7l42te7fccm6ju5jjo3lhz7g6qr5e5xzdi1kov9k5xdzuats2ouk8n3x4bac0wpbw3szsjdvsbb3ymgx5t6rd4x2v5kjgu7ewncbitusohr4xwd0js6qcue2c5js58hpnx0ucf76qgpbpbcx6pyng2ap8snkf9fppykyhyszq46r5fjuft9o1anr1gzvomuw9f4tpdpm7t4a5jbw0buulb795qrae284g85xy7j4egxociq53xklkwfr9g1wkepbuxl15gt22jtuisivi6te25lluxrzd55yk7jk6h9m73cwsq0l767t9az9y3g2p289zzrpgp086hw2607bdm9p9lk8looeiyshwr3qhgmw0ilk01zrchtmhaydsn0jozeshxvw66ppg9vyy0nj4jhusyv4a2nyywi95mkf19q36xru5f86ddj1rcnhq3p1ogqr225cg5s3128uo9ytxljnowxz61bk3rw78f2wtcypzonbz4t4vkipzkx2zfkmd0bb0o0l6xvq1rkinezuy8t0k7czpaxtjdn81laonfi6vufy2fkywk5s5smdrg7nad45l5q95rpfy98q8ir3d6xtlhtla6k49upqezrbruq6ts265a3cu3k9q4l0gzawdhgyvb77hko9fz85uiculu2iyjpsu2uo4d16pgaylexo4iva6x4zohj3ncxq4hhkizwm0pxjw5s8i69vx4ifuuqd0mxsu0d4aghb0h2tzz2qnnb2zhw248k3o1vbwgtpyz77jmqi5q0wzgobvl48tdvtnf5h7thk45ygwvvt360uaib0hm8b32tvc3l904cz5uhatkzxp1j698rvf2agbanw7s83kxezzjccr9003m10uspd76w4lkwnruz2867pjjjawrw5x7gp8s9phrnge4',
                proxyHost: '2p0aoe8y2xw2pjgt4hj0atu0qrbd3zx77azfpkvs68kpri61st269usnc9np',
                proxyPort: '4pcjqmn79iifksj0hvzk',
                destination: 'z78yrv5up155ogap1q1yu2fer8sonbdg30ij7ib999rjhxm0iad6ry56yplzaeeck5oqwvn4nmw1nxwrdtfz04jgpu23aitk3p27p7zak1rz4vouqbgrsvhy4n22409azwxfv3nhntk1rnf4zhwi91c78hknc0eg',
                adapterStatus: '5rsg522jkimktqzs5oz1',
                softwareComponentName: '2r4mdhv0xw6oiwd9ptfydzzgslrtuak5knkzsfl43xfkiky9q5ahljjc86ucbwmdewvn4k8cgglplwjo3sn3gi929bqbo7h7tuu0hxb8ooggiz6a5x68cd7ixodjlc3r80hjczqhzzd0ue52jmk8rrpu33nzxffp',
                responsibleUserAccountName: 'v1tdvawetiusqcfcmuax',
                lastChangeUserAccount: '4lgb4sm03wegfo95xrsj',
                lastChangedAt: '2020-07-06 08:52:53',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c',
                tenantId: 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
                systemId: 'ppi976h3ca7gw4itqcsjbj6sk9bq38ptgo23i',
                party: 'hgtzn7xkrgsm87qncg8e16o2r96352c16j6rjf231s21v96y3638zgq0ggkwruamuyibfoim0dqhcx8s93x315jfnfjju48l0yt3272hsqtqbm5n92hb3yox50eyhpk8mmd3ft0o3ajx6tx7q6z3eo4dhys5h46w',
                component: '6jn2caljyfg7zmy6bw8x3zgjit6b4676i7rzw93q0fz8ocfcny244arplecvk3kdm1fbjf0zljye5osvt6cxwx5vib0me54alvbwn9162toia6m8i3mueziaxbp0obxsmnwombkzeuzokz7q1qwyooqoil6rv3pg',
                name: 'gsmdrqljb1qa44aytyjgzf0pm97c9mpemham0ozmberr35ns4zc52ownmk6nz9q7i5yhsfemtcwd4nr5ihlmc46h7zrniycpfdxli093bmyo6n2jliv935x2jqxkkxqz1vzq8bnoenz5cbxyfs793em878b5x1gd',
                flowParty: 'tqwqw544swdbx8lbwdosfic6upsjiguax48h183vl8fujpzlgt01w8w3y47gc83eu3xndofllt1walje3q3cugq5kl3zjubytlu3a60t32azexg4ffwuzp2rw8769l9t858rfh0z1olnq0199hxeubednd6hc49m',
                flowComponent: 'b6fk2yomo4eebb10eem55lx37v0m80ntc9jtzbl1h038hs96y3rwhxwgl9asge4ax8rodg25nw1r3klqr1oqfjckr9lnd6tqou0o126go1c28mwu5m5saxba5o75h0gnjlcgw3822o2fhyjc8n3d2gbe7pi1catx',
                flowInterfaceName: 'l236yy9fvpea7txcgz1mciq61zs8fvaqoyu7oh988tw438vjatlvutvd9cpo9gms4ak61wlrsnsp61v21v6v9nwvrgyzcwhxzj0n8ofmzmjsa2uttw91i09uxpvuqiy0lrkxisfh1rx7qmiudumo31ovdmmyutbf',
                flowInterfaceNamespace: 'c1towbmkg7oexd9buo0hfiu0xqs3bg89qp31iadgms6bhzazm2yjdsiajorubtmrfwsny1tythfsukdh7dvruvdx01hhq74szu0g8y2s35xm0s9dhe535ylf0pnwjehv45aqiujhxmluizmrp5txtf5rbevdjhc3',
                adapterType: 'pzxdq67re6dtwxa42xovn1f45diy6ytldhhn0a28g2jfg86gm3p7ac0ped5o',
                direction: 'dzntytfrqldkcio4m38u7p2xu3j0v9x3ljvhgkj2c8dh6w3sncgx3qqw679j',
                transportProtocol: 'me729brufiv8buumnh2ghdbfelnpnek9cvtofi99xeq8br8zcp8k39usjob9',
                messageProtocol: 'cff120gj7rep86gh846t6mfgeazw8pv85l1bmj3v1n0phowmlzlwl4tbxbh0',
                adapterEngineName: 'ia9pw2qf6866lyzxtp2j8q472guo20po2sz71w1fqmrsamlsuw6djs3s13by0uni39gr7wka0vt75qtonxm33zyqz5ka421cqt0so5mdfhikin37f3vuq15j6unxs8vkr552o2noq8o6h2a12sgtblmxvns5n6zm',
                url: 'h07oey69oubtx81hkpu82sh7kgf911jo5d1s13k6mda8klf4f0vay9wbqjhqlgvtzwxx30pjuobd2rig9exhfcrgjmhig3jigdwl4ag5obd5nuhbulue9j9m538icf74ufyeuvs2fzjx7t7ffywval5r5rhq5aaitf5tytf3qespkcinax7612sjs35oku8t9j73j284v6iwchac21k6zz5ktriu7bx2uqhuhnftcfw8lcnpr7pd60m32buydx057aazwnma5or8npf4q6bqg80k3xcdthkfe0wo6uvxf8vbtroclar20zhz9dq463ik',
                username: 'dlb584w75xow2hekh9u3q0e0x1yylbzn4fa260pcvl2uqozr0wk0jfywn2mp',
                remoteHost: '5nsyun9p9msc1w827d5ye1v57ju6oa0e6x5wyxke4k1s0i7w2owgbxn2ez6fdu76tuw7gubhsf1kwud62l86f6l53gxlmys4uv2lnsy5brmbvmew2emz04frsbm0hgcknpvfv8bfsovhnuatjxf8iz2m6n0sdm9d',
                remotePort: 'fg7sorivaffvcjkuavjg',
                directory: 'p4gvdy0t9eekgayv5f0h9bkwtv5kotn8mhp11mv2y5ca7gn3zn6yq7ekjdoq164z6010b72a34e4p9keuxkutt9qu8qo3x4ng5gaymq5lm2xi7q68oyfumsbf7fvivv7kjsywkbi3v9883w6mejdp1ay8lz68lhlj21hx7lloadouh8ngza20xrxoquge2pv6666kmyh2o2yip0r4mpzxdkqr8lb6fas8kfevrb9t3uj5ocyq1xylb5z4w1puyracbzjbtvys5zfrydsvw8e6lpzt202793utfz0u4iok0xnokw1bq7rppsd0k7y9cxtqcwx1tnmoue81kc81fmxmfqpaje58fmvz58ix9gc58nnify4myppxqy7q9n7eeescbx2rm8bo1bfnpzqsz1w92wa982ucxqvo49oorwd1dr9mmdbi5wl1n9s6w4ap1zfzvs1piszgnmfd0vo6w997mr5usp0zd8c6995b2a8dzsl9acag5maj8xzy1oruwthel1s2htpydrn9frwgyfsgzjfptgvfbznnfjgqaqs4jt2ozoz23uw7f5u0mj14b18yq5ee171ozglw7hyh2ejo8827kkngymss1mnc3jh43x6o8lpiqvy1m2kowurgz75rgyl94dmrg456kao68mw8ykpf34qnowb4ab3tudwvb382u6u7lq4rv1n4pvvy6vnj8wbdmelh9zd7abam3wsv2eiylsee8bav999z2n6y0equuvu9yk9vl0e1cb4rjit1u6sn0gse1uzanqed1k1z1mw671g5l5qd74y98urq2k0fd91sy0lsb0atsqe5ja4l355v0tlmq1f70rurscoum99mv7u45k4c15tlwv5tedpfgxghnfo3d2fsx3cryynmm0s8m3xcy5trwbu5sn1j284b7hxiqp4tbxgm1a44ejv2yszw8ytv2kdfuj4jzr62p1kn1uowcufzk8zaize6gfc4mb5bvit7xae9mlabj9otiybwbaotzrhr9gnmz4',
                fileSchema: 'ocaq1bkerrpijc401oj2oknf42snwkjwlo5okme8saorbczuvs8m2znmqy2baef79oxenc20zx9fgagse68k7ug2hcgcgqsey08lts4l9gnpli47paak41ls5l5wkq878xbl6hifjuw3dwo1b4ujbrm1v83sv8kpn1r8kzud4hehft9en1octofsr2cn4i38hzi660f0yyvphjisp57rkax63dzjhvl90iq1x7dya4l2tp1wkwretnv7hebj7rbvuam18gcnvcoiuae26oqwi9pql2glk66m4rnp2b1jleqtpyepn99u9djw4a2qv8r44iyc89awpliub5g9kr70djjmvvryl0ayt0vhcybb6ddjq4v88wwm0j775a0cddqrazwpjpd0qqb72s6f5dol09yklin9c8ebn0exlyiujtvuikslwyhdp2kszgvaetmvfam5b2ta1i2talby026ipzrrjmht18zz6nzoabv6agitgyc6z86n6brolb9afkjn19qts6sjrct5q34tcgata1dpyc7oc07eiw9n9aoo8f0p76ix756jla797p2wekwuh3zsweakpg1d6gghyg1fljk29nbfny0oog5vltcjwbjux1km56kg61o4nm6yv9jirlzhgy4gxhjc69awwwbnbw79b58tcnp5h187nsxw60ecga572saf1hrv67uj512oy1cl3swz22ldvulpevav3a7jg7x05et0dsqe5odol8ehwdr449jxox3met465rai99dh1r5nhhlg322mda4kr8ygob4e25gb6e0h8jfatalgm6p5nlhh6cnk4aym5t9hblgqm0d2ugo03ms2occqx2vbhngxknd17ibceo29iek7g6rz7439dhxwlkf2pi5o8a250gb1mq3k1lr3r01cpsdob5jerhdrqdlt07ckuujx2dm2s48wvi46bdw7vuunes1ra29w5pxb4gbxqvhdoqbdc2kav0lfzhhcy069qzf2ft7tes5jranrnrrcv7q',
                proxyHost: '3k4360myfwcsz46j5h65hcqwvnuxtylig6x0sulxuntbjsrjhdvd9p21gi5m',
                proxyPort: 'vzjti9ju6eslaab1bkh5',
                destination: 'a5bw5vdndv0abmyjtrefueczehtooxhmjsxy0d3d3x9j152b93t9k3odv355dahwbq2fcvpw7noz5ccesd804p59pes5t1elexede0eq74yhp6zvpafw341h1b7yorf3a1cwc2ku8cvd46xqh3pgwdu7hhvprhx6',
                adapterStatus: 'vqzmijqe7zo4hlsr06uq',
                softwareComponentName: 'amw1weznj5mlbyz8gepsqqtnwp8nmmun0xlr8hazum0fgpo47iz4npvmjp3ays8farj5ttpzjmd5pdkawqgmd2upmnf8yc91m3rltysgscrabfcnv3gb12cahr6i22owr0wtev95dazhy3pofqj04r2z70zeh03v',
                responsibleUserAccountName: 'wn5831cmh1uhlpdfl936',
                lastChangeUserAccount: '8j90e8ue4zaimq27igom',
                lastChangedAt: '2020-07-06 09:07:40',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c',
                tenantId: 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
                systemId: 'f25f22cd-3121-4c65-9930-f5dea13a6019',
                party: 'y35vh4cdbgu3n43kncp087hzkz3kiau3flksh26z1te854qudu03ftvi98yet852dfo2cuef7yk0iqapriy5nw0l53ha98s76x9wu5thj5cb6l3biuagjnt0pk9e1j5yau3gy85bxag45kzshtcel5eqsdjqaw73h',
                component: 'bmlirgm43hkwg37idm3exx2ecapzyf92fzdnua91gipwxogp9fl3iuai9g762hgh2pe1euv7mpze5ec7shyiaw18ure9ww0zlu3zlep9hlqz4xgu53ccow8xweyynqhl5sr2yfzphk1hzljrirp39z2rn083w1d2',
                name: 'ah63tobi3uk2qoq84jbxpss4cy3is97tf1ccqfgw1qz1amlvaj412b48ii30bp1nrq4sxyz4vs4hbf4mnvetwnji35ycr8jk33h6zt092y2erjb5pgwrc6ow8z3625p4soa849xsbaylusesal1hg69epa322qln',
                flowParty: 'y7pgp9ysklsvfffmf8g71jeyfr9abjkq2nlkwu46kdspzqlouunckml1nor3trreu3t1ajvnkn8cnipnrixup88dzonna7uustj10x6u4bgca3gzvdergdfmxfmzb6cxg959pik7nwit6omfambzu0s6vs66tr3n',
                flowComponent: 'ji4qp6jr9zzvo9yellhk0zrrd7060lqhtcy9qjhn7jqdxrfzs9cywwoweyo3ova4jvd19a57co1obncrzczqnzufalsjvq7pyi3x5pdff7mysbeagmjd271v3y719cpfx4ishhritcdalsh1aht0jr65ae2z9bgd',
                flowInterfaceName: 'lg8l6wjbozqyyk45vr3pmr9hpveh53e26p3nohikrfasi14d6o81fd5p41yry77d13c38y7eqpnuobg58b1ro1bcop08yrx973d6aob0v6dhqcdspuw0ayy1qy4z0dh6qzuhzsroakn6gfnk3k46eut83kjjmt9t',
                flowInterfaceNamespace: 'r9zjrsfxmx6y3xtf58f5jw9znu0rsp8s5xg2l21v901xw2v9t4h74uj9mpyo8xiz2mryo9a8d48ff4femtcbex8k1kthxjg6t1ujbag25vijclep5d7ek3gwpcbpr4jm6qnjzsmacd00ixuyi7bcn96gwja27ov9',
                adapterType: 'pqumrnf9d51adpudfga2pc9apt2t2a8llunt28iwgkvbh9zzbtse243xthy2',
                direction: 'v0cftxuo1btpze0z2krldgeonevce1hp7r6xwrszass0srmvjih53f9kjct2',
                transportProtocol: 'pwv51khstw9detxyia4kgsilwwqkqd5rmbkf77f4d20t6sevz2kmpsyf3lrt',
                messageProtocol: 'z0ey64icbjykyv4a5erksvrd9h81urd1mk4rigjw0uzx05i0vxf8i2bowlot',
                adapterEngineName: 'cbv2pakadhi5ed5pk4v1m5zcktl66sqgccpuskz1ob5isw012ro4uihecu7idcmgalqhbm8nes79zw45zhp56y1i03ttzm62hrk1ixfdivg02rl6anvnttsnn2b5te8snvfuc6dbd1qqd8o0a979dgu3f7h0xccx',
                url: 'utgr5ftoxq8r32ycboym9psovj821rb4sfr1b3hu494don9ctvvyyk6kpm1b0ey95hkg36bro09cn385gr68mlmuvxas4r2ezsd3etsgquzrxhwdz7ad0neaneu4m8ui6qcl4w2sgdlf41az8d420j1em3spzcltk5b3qnftega2x1m8qua8dn18gbg1xhaswjv5k0t40isr4qtp8uuzzn7fuai3dapqkdwfo6ryz6s1729xf06qtdgv9tvusdvtptlc8howmtd36rmm40pttmhf5kix5nlmt0fgq4ni4x5zkvjs5a96dvrd346960p4',
                username: 'k6amuv3q3faiium6084a9vlvrqrpylrg15m6vum5uus4wp7e2hxkpp182df3',
                remoteHost: '8rjclqkbfl4b026c459hoqyf403ouca53f3wz2a6iy8fr3l9ajlufy370pw87x07p6b0j3htz7yu12x3nkhva32xijvfvg4sq021k7otoev6uc7czv58r334v1w9gqnsrq1n4vdpqzjap1b96y3tcomvmkkob4vp',
                remotePort: 'sl1x95b6hahguc23ilj3',
                directory: '25pjbyobxu0rz8uirb124x3holare0ozvl9g47uk0mngwxqonaujduzhhrubc3q090akjzvykv5a9i5w5m2fmm5h6pcuj4mwkxmgb9dqvek72izdrh9ho9r4hq7gumuazyfylvs4j3m1r083y6tgan01swajyv2mlb657y4q0m134773ypwu7seewz4ixnuq988356nor82gvewyx0ln36oy11zrj5kss7bi7gqflz39u9vder49yx3gn539ie0zjh4rwkod7o05l5t338wo4in5s1tccuk134f0qw288w3m4pjkc42rg13g0545dzvdc6v3nphnrjq2jbv8jjgk8hx3urm8y0p00hg8oncvlb2bdpriskcc92rnm0pt6ypibalyw445mnk2wrv4f214u9w2lct6plfeki94zaosvuczniw9aim1j3uhdeh2isxhjvw44fvq1gv3hyb0xj9o5nar3k58nib6teh64l7crwkat01tnz6n2d8rd55cemiyeru27o2a2ww3zirowhiziwurajibxm3u2ohb205iiu4lphts7pep6gwz0uc60bhnh5peq4l9p7mq5qyvx81ogm7hj64vsyky4o7wg6auw5x1yu0fhb8a1p5pbvv1dwtq8vt79zpxl8hzk8u286o2qwbzv3qlsmrx9zby4q73dcko59d69rkd4l0tfbkl78u1026xlw5d03y96mk2w9oyj8u2cefiph4gc7600ip75a3q9l772z0gbyrqb7k6e0ahtdsnyon5jddldffk569n9ge19gz9vdgi3slcwbc8ldc6s6ydr6pf6t4bc51tkrc7qttpizkxvm2w1y5j8ke34z33k39fdjdljy8f3j7m94jihn1ypr8zoareqmklqj1etbe1h6pu4dc4d4c4p2p1eath7gsfam0w9mqhqibf1y0ue8yv9ax30gmvqfu7845ecip18ovjq8icqcekhb2yr073atlhevg2gfmcf6uw4uw99n8rr38gjri4vhhh0t8',
                fileSchema: 'l8w13kstwwzw9e45uccoac8uuxg18tltqav9v9e4sjulohs4klpqjsxntvgl5ld67en5etkpbvh9bx54wfjhugnq6y9buju88z225wg64nzc58nwk8i88hfo76ma2w75y0dxj8vmqxzve3bvg4v50o669ctx7cssinfzwl6oc2yidhow3mzxelpnnse6mxvpfsg6g3ior3yfc9oev5gf9mx69x66iyeh29ojxriliunkztphum68utfo3srey25zzwt9zmafn4pz4jxc97v28u6uiw8q1577vvyqlhr3lew354xv2bg9szg34obhc4tbbcbd7i55xzffchpp1vb202trzcvwlhcvbqmlysasi4nrkdubksehblv3vfftzvr4wdjsfy17v56rjtnsey0fi4wys2j8fh5ad49ezjk0lubx3tium57glj5xsaz1hz8uzph08t48i65rmucrkmp7hg159jt7jjqzngo2vozbt0vcoxx6f3h5xkfluo0ecybl463iuocyrbqn6eufgyvilaebjd5986dtx9ljvuj2kp4pasuiws4izdk2ats45y49o3guib1atratsesixljbdqbdqcf6zdmejwd5ryvasu0c858m5x8ekfpbmplvbs1c4xr2vfwongm18wfyzrxkjfwon2bjn59zauxo1h5wlgk9noajw5puh2ungkvn0wckmjeqmpn078r7f0rc7z2f8sblf5rhlpd3ppijvt4gkqbxsi8y7car8bbnebjraz8nmjwwqw0lbk073vpvwbgo2rqep8id9mzmkk75ut1p1ty5nn0wnrjddcbofcppm0b3dgtzvpg0yj22gg8qyeknx77mzkrnj05rxldjeyjnpcatith8o8d9xl9siud93me3eig0v789gr78cznczuh04j6rtp0fwr9s5yzxgm90xg53t4uxcuplexokrwmmqz5ik4bqndzp8odr4e5qhmqt53l1t0zxojqr3okx9p8zg00fh1n8buxj3jt0nf4oqh6',
                proxyHost: '8bcrjh6c2omggh0ukfpm8k5kqc0ltqbiyh7btvu4i9lb0twvas4wch7als1p',
                proxyPort: '8sqwfsn00h83biuwhfzi',
                destination: 'a46d0g8pd3i2djirp67j1lmkkdlz3oig6m8a5fp84byhw2l08nqcm64r3smw3ja6yp68w3o65elinfjysigc079w164x3jl06xl3imwjd468163jp5vqeblwdmkja3fr64qgh04bgidfq81f3zbbtgb7y1ds56p9',
                adapterStatus: '7jahh6q0lfkrou1n24f0',
                softwareComponentName: 'mzvs2y6itdw545sb76j39qew43eiqh6oib7iikyrmo7hl4obdtkr43mmqzehb9mwzt2h1ulsxlli44emfw2iumffd3r040wwcv0x1golcl4zqbfe3el7vume4kq8i8lxshzl07wagbxr4meswfd9hch6jm3mfifk',
                responsibleUserAccountName: 'a5b7xnle3wqsy3dlek48',
                lastChangeUserAccount: 'bktplwp3biffzjegdk3f',
                lastChangedAt: '2020-07-05 22:39:00',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelParty is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c',
                tenantId: 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
                systemId: 'f25f22cd-3121-4c65-9930-f5dea13a6019',
                party: '2zidmygozxtzjupzm8w73rez38giqsf06xc5u94gwcmsyv4exovbcro5uyzphb166mtzwb5iugqgrnk2ya2t86z3y6km3smz3xi6sslgumxsezlnt3teufehuhooe4s5c19mmd0pndbvmfpwvx6cutuq3tey5ltc',
                component: '3m2bvi9jewnbksh4svdwbzc1af6pqpwyfihsmscnsysd57u5ul34j89f2jux54d88nmj1gdwajn6ay2f0qew2abb8j4xxmip4gtkwgqc18nufxak6zgk2gl92syqix91zp1xm4i8jhfkov2hm58u39iaj9w157yun',
                name: 'zij8skdtjg52z6xb76koi4bh4jttxgtxaffuy4ca3smm4wh7b78ide9ecj4djbtg4m104n00brz7ndx27r86um5l56y7pgjn1iymvvpvs02zc1icdy2viqaak707jfzx68zztojcesfnrai4wdwd2k7snhkeryuw',
                flowParty: '8ptr4rq9lh9ukwmqcvv2368z5n0luuocqqajh2r02dll2f2jl5s9a7f4xxs3dfl6tvq92s25c8jj895n04auf5sz0kyi7maou89it614exgirpp7au9ie4wryupwhh4ie95pxt3dz2pxzo10yeq8gl2lsgtnjbp3',
                flowComponent: 'gzsz4kguyhjtiu0vffcy5ion5otojl8q5jyp9a9g2sc5ymgjihewlw8x9p4c3s494bclymtuqsks6xlpqoduyzis54wmozm4b0ihmhhiqpux853i0in1gqb2muwsf0tlchr92lno946nmytzryc4wpfsfjm7nd4w',
                flowInterfaceName: 'hum76ie9qavil5zqxrjyu3r4at2czglsrnvavi7ws0rdbvbmpdalzfprn290mongb062sm3lcd6ii412sqezxsutt0816o68t1qa77a3dn1y94ayy5dgwhe2gbhpwvq12kokb9hypquttr54d9yvhifgykpz0wtb',
                flowInterfaceNamespace: 'pos4s0mv1128q35vqj3l7m9inoqbm7ouub2wan1j013ixrgvtvkb9k3862d5asxqa62hkp33waeh8pfn2tfvti8n1fjfejvenayw0gq548iqqy6rxky5k6ku895c7s0l2na0np3rly7p2et3jz1v3ln183p9juum',
                adapterType: '0x4iynd9dpccki8yil1y2yvu1izk7vh4ybm89wqo5lzalhwfa5s7116y50wf',
                direction: 'js43a2msv2x6qon4nixho8pewewzgr4ze7ygggsglx2sv3n86306bstz5x70',
                transportProtocol: 'r241wuubzxicse8elpvtf5fke8f43rnpeomqf4tc2mfhac7dgx01olg0zdcn',
                messageProtocol: 'c2crjxsclyefr8xtd5zcahkiayk32suv81a97epan9hu7jvyo6o32ptxrriv',
                adapterEngineName: '89ss1a7443fdn53cw8nj1c91c46l8cm4v4mkoiwky3brl1dtwk3z26l4lefdi4bektidmh04qjs0hd76xauiry69ej4soxmfsgyteyaktis2a10jl65itqbcfcbpesat70r1hs4e7473uj8khwuocg8jeov0b5vp',
                url: '1pqqv3w5gc8v5ajj987o584cdls86fj13bc2fix2r8gisxxti7vlibgb08k70bv2yq38j3enwxf4nuancirr9p9la0fwv7si3gqhudrmeynssz3t7vgkyob5h73gquewerw120xov227x6p9czd9kzm2vi2c95gbqyc4p3bi9tsgewfz988d6h9987hw76pe15xmk9i7dd5fvj76r9nezmf92032ev9neghvsi69xdrm3yzadwxyn5p9s7zhcm1tm9089sn5tmdfp6ijwmpkuldolcfy2np6f48x0r3vckdixi7awt8xtpm0ienowupy',
                username: '17k1s59ofi326l24w9d13hme6bs373x8xsdzv5kmjdbllcvu9j1an6s9t81k',
                remoteHost: 'syqqvhih7l5mqok28jm6tuunnuzdlhms6qlraz7a57ssmlfaewwc9hlx9vqqm9l4rcefzrwwvxxdit4nc0f42p1g83wd6zg1uuvza9126wliksff0gkkawmggb80smdfot5oxdc9ez1xxqsz3ggils6arcvytxjc',
                remotePort: 'wz7ooqb1uo7anooy6y4a',
                directory: '3g0fp4341beb1f264h2bfojrt8l4o8wz4rw9xdfh5bzmyg3r9i7gc4swzl4g1ll33rni158g95sb8kiqiq3jrf24rd91aih3vjw1prtpg89ruwmo8dchsf0x0pnzwk8l9h8n007uurdqjf1mqhkuywmxoe3pa7lrzvmxlad9yr58iz5pqwpdrzydlitkcmsiktk77aepgobl2zp9m2a4ty0dsle9q3gtjxkzcm6nlsq3yqpzmyg2hgq9kq5bjo8suaap8w3tkaysj8hzjxyjgeqdjvbuvejtlnojoaceysyugu3ok1eqekum9ghxwk40retmc8dm8799dvpacj650unbpezkv981wndx3m9j20b6jlkas1fizc291w18urc046dgwyr5b2zd8hc5gnjtf3777a93e1j1uc5zzzn8eeosu6a4ts8rulqodqe7831rwcui9t153oqs2m3p5nso8coksmfpvfj7u0uhy4v1z332je5qq6cldnu7cjq59fk5gra3nip5uxr3mevbim7jg5qmwmaf42o46hu6mcpdb7h91zxia4bfsminatp89brqxrydzdmruaiuyu9190pr3hv96z43m6j30zaj648telij1qegj4dlxk67lz6zwm1xoa3sl1omub19zbwl5rzs7cll6a86zx8sd2um774iz9mkjae8xm02vrs3ktgepqks3lpppmhry309f0tanahmsisgz6yrhazvi2mby9s13ypddbgqlnuew122mtvossuojznydqviqai609enjin3be1y3796c9q34b1km459hcn8ieeandrpcd14n4zfci0ox6usoyh80tgqsxui9qc2hgl5r9x28nm91xqux256hg96q11i2hbza3z6dltmchu9uhh0w3pak1xwbkpbyvb8bqw03ithq0g1tbz3eb9s1tlxnrzn51zc946zs8aahrjcpbielir1vci3sgya51rbc1uysryjs80apbge1malugyy278wlv3g7l218mxe7q0',
                fileSchema: 'y52jfpxihe2kupp87e0asf21v98jzdqplwbbnm41f7it12hpkh7uqj2wsltju216dpr3obocy09yt40sub4t2uh3a4n84e868dyvodu4mndf4md37q9f6g5ds6dsqiz5j1phy2q20609jvo9520sf0j3cai7ikqudwb1nue3n3oav260jyprc046j2b0q3goru6aihmzp1nkd4hbj0vxw12b0tca4rm0ydu0i89665jvoo1aogvq0nclqgvw61ks79tqpvq8pusjioc6s8zoz8z9x44zmn6mxafkzn73d53wyykhtr187v6ks83aktjzku9de4srfm5ii27fsv3y9wa5pzo2ufncq9aa2kh6uiuaboo7nuvexazdjt5b7sl4yqv0wsxly7ojiy04mfdrrpbywftc9tc83l5tbn97vf296ry03cxiw64rdmyrsa7p82nwtegb0v4et3fkdqu052in8kv69etp5jy1jargyy7kcrs4nf8sfn8asxzzrike0dn69dcrav4mws7fo5iv3d04p0r7h33h30vo3ebk0htbm4hr15nmuhr5judjr49phwd6iqi0458o5oybzhn1qlrqy8o95h3s4yxkoftormvv44kiooe0qkj8pcwmq0l9iiaghlqukorgl63ttr8du1jb301sty70vobddx3qov97ibphhzlrzk7530i8kfi6wj5m2kcpmgzjno5fovxsxyfrejmtjqjr75lza6oi1zafiostn244hcnpyh94gmkw53rzqmsr28tj56zcg5s4tmkz58t8jh68zc8if2cxwwcd0s5jy2km20cdb4f3sruvwp4n70q4fiz7mm3v6s54j7b6j2iq1d459e8t3gy8yihw4zijxduabt7ksybxgps1kxj8yyajqm8q1pfso1r5pjuh6v0m92bemdyvxdjz8it4211wc4lk8ybq36whl766iy84fcpbbp3kkwjzbwtz2dpgy5hxvzda1nqyyb1p3pe48eiztokrtck8k5ujzpz',
                proxyHost: 't6gjn1ii13k35c9z02vp6hx7hyep5j5t0558kmndt0lw7s6fah0tpsqr68bi',
                proxyPort: '2mnter67qd0zps0unadx',
                destination: 'amyksli6g8zideqz2mvv2lcfss5n3b2mnlslkuk32wnvqht0wlk4o42gpnr3tn00cug2p668s56l4fvm2y7evgoukcngwtp6bapnju31d3ux5lc479j5jilk7lgf3gnr7fzk9vl653mqk6w8qikf3k0yttiu5wsl',
                adapterStatus: 'njo7a5qmftya16mufudy',
                softwareComponentName: '8jkt33j0eflx4qcxv9gjqhi2yrt2mo19bfslnin5xw2nnnmi4dkxqh89u3y73puefjcm231tzhm5no9qq0slznstd03ume6g90bhuifw8tm2msgxbb9t05ya5aof1liww7w95dul6by8sb32kinyv8kov961wbbm',
                responsibleUserAccountName: 'nouf03qdryteid9cwvm8',
                lastChangeUserAccount: 'sdn5ml03z2fjfv7w13x1',
                lastChangedAt: '2020-07-06 01:01:14',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c',
                tenantId: 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
                systemId: 'f25f22cd-3121-4c65-9930-f5dea13a6019',
                party: 'uxm3rsnq0pddcwgxkqx67ka8cdmddh0vhs9mbucvuzvti3v0arf44wszopznc6tvm8939b3ktea05g934mezcdz4rbyvjnhbjnkm9mahkkabu2pge93xccmyo6mjmo2qtqfg6lvnkg85dem9yfujlrl093gm7m88',
                component: '91zdoburxyurgnc2nxknf3ms25l41slx5lwp8bkcwmjcpjoiiewzutx002g7sjrjd7li7qihag93stsq23bjd3i3jz832oujwvqdxi56h6sqjqpy0jwoqoqm61lfueuwxh9cogmb43l36kzrgo10lbdsen64e4zg',
                name: 'rwjtwmbe483zuzjy97jk5ao1hcur8qnjkuaen37jy7kdlq5c2u32d2drdnndsov9lq0fiagr8pdcglkoy79xgyzv61g9ceivxfkasgl5w8nk3pocd9apswyjchcvesx7q0mjahzhyuws7tvdiq3jrs4wu383qmq8v',
                flowParty: 'j19z61bruh66mo390hb4frakusymnpy0gs47826o2ec1utib0y74ajsekdytvql42gx15pdui8q21x9dvgq7lkw7e9fyfmgy1hr9nh0rnmyjg7hh1zu2pxix4bfuotjr6eoebeftqmc5ocdx9is4nc66qpzy9s32',
                flowComponent: 'vu49514k27g1zn4svzqofrapfl95e8ylp92iul2lsw6s9s7gowwy4qx6czca9ov42eqfq9n3snmivvfowa44iqk0i1kjz11uzmtzqq2gvdcvep5mzwp5e2e2x8xyai18bkyeqr2r22l0pcr4r0sy4tdeavria2in',
                flowInterfaceName: 'tzxbd4lh347ef2lmuke2l4b6xoe4pa6p46kqn5artcsl5y68qsnjf745lzheazssigktvbmm5zvnrx0m3p2qbsftu1kww1nltyf8ocod6jcv934d42ep0gvt9sqsoza9ckj3fr2mjl1sc2cnt74l6ym0doi600rn',
                flowInterfaceNamespace: 't6li6ifahyhrys9af98p9ulq16oj2o8zy58ocegfyjfld3pxw5p8pig5u9xvgfy5u4p0airv6byrq93gwla1yjpi3ti36jdhd0jbyl3vu9kwpab53uhszg84p0afbmq5s75c8z66lwjj5xymrcquhghv2x3eq8he',
                adapterType: 'e2rcu8h0x8ejit9pyy52gf1e5mg8ehuo039af7o65lex5tpv4iqn8sx4vga9',
                direction: 's9yuw0ycskp9f5x5ktsf9mv6br6bue9f3buff54m52ky7n4crjzpqtzrvu5d',
                transportProtocol: 'bvth4w7wuvocc595uvdm74j7xys5acx71vjz1swrtojwx2o0vxo0ifdr98vp',
                messageProtocol: 'grs0fyexja6ucevzy2yjv7gg7lo6dgj6cfcrlkj98m2iipuz0dtc3352tdi3',
                adapterEngineName: 'vpumc25asgok44ni9uzyoh89npz2lo1w8mfo8lgrji9s6bz6r8mkk4bnejtuwg9soj1z9cds7oiuee05k1wpcmp41riydc8er3ws9dvcyxgbeq00rpswqoba6p85ntoq7kdwylunq5fn3ltszzvj8aotood35b3q',
                url: 'pdp8pkutm3uc0odp84wnyd0zs0nal2rwq0vqig7m6kvx84z18flr6b13xgjxler4o5fqy2pf5l5rvphwnk976m8pc35rojzsefautf181rv78mb2builwqjussat3kd0gu5y9m7l8xuh9hjcvyvijie0p3f21xphtxz83k1d76crmusgicjcscoku2tlvj5oa9u8e3udx3rw65ehcwpmk0kx3ss8cjtbb6at5f7pyzdfzt7llh41s6e0caurp2moi8gb8budfekw5la92jx3v7zinfuxgwzafku74naqsisf35l5uki1v4eoffojvq0a',
                username: '7tn99ek8lgnochhfbvk3jcqjqp4pabqg23779exmgu988ap9l4qc7bsrm9an',
                remoteHost: 'joolefdfdmiueljtl36p1adljr4vk6r2h1lqw9ke6jrh249jlof5lj4s6uaij1e8lu8i6khlh69agvdsvvplnlj4iz1d7eyuivmyjwhesj1b0fhdghutzrtfietaj2c6o78786mabsbrrgzszm67p5wl490j69zj',
                remotePort: 'eofqftv9xap9iic5hqz8',
                directory: 'j7vrwdax8ogjwynn7ggcutdd5690f4av4wbqzze5qpfw99ec5lcx8mu2tla3ekty0r5gaynpn0jnhyjc59xemy6mn2p29r2x9ttctops109nx25oy0bnza2lwavvwwxwnzt2kum63l4rwhj1txufwlf9n3w6mcxouc8vn3ionsae2cc7ysut89r1efc2z0huz9c5mc8tavn5iyql9jrr0ab0d1zvbs4kpqi5yvswzaojiekbc8xeqs1tjz4365wdcg5qwc5g4fxpcjirjkurq5weqsx8lhxl0at9f1cxbbx5ghtpn40w9lshq7mxxuknrmtvg6z5s90lhixalpugmrnjg1iyaq04sh933h0yrl8s6kkzu4i7r0yh9fa3kbigjl3kv0mugb3h01zlz3ad5tf4zl84bodzbkgs6757tt9xipu2h2h0psee9b0ykl4mxqh0hv1cnh059xl05zmzxn644on6zxfmv4q8z0rpmxaqrfu8zdjkuz7bteaemir6as0r0n7yom73mgo0yxrdeqq07aixhnr7w9dkeufogswhjtth9ukhc6y8j8ncbd7xeueyrkha67frcbeown4ffilu7nhk6obsp4ayulyvaey58009ks38lqrlz8nb3d8vd60pdspi3dpvw9lywkby8o7he7727c1whvc84dl351xrro7ii8lhwlnbotr3zjk4kmon6f5i9za2rfjenzzos0ood3wtmf982rmygt36z55d9wafgecay8q3jk3151nv5ypq65hhncd64pt05il1knjrsfoiqo2e2zni9fr65grnkapos3lfnof4t0ksbs6avnnt2u6yd5ir068ofq101y3o2k5vyna9a133xztw8ns8rpgt1scuigqojmlq5rps7qhcgcf0v8dohodk57sda8purk3wuw6p7oixed368s92j3h388j2ii187xd1x7zi7o9830oiqfxb4ffxw5ga6wcewhp33sjbu2pnh68phdjo9pc59antpg9jfwh8o4j',
                fileSchema: 'mfg01zo9h8i2julf7jbedencasl16wgyay6ly3sk75cbu25mou5bdimglq1sph8nnhd1v3s46dzavwshprmeezjlgohm360z8n46nrd7hzpoujpltkd7ksuvbzvkgj8lij43smer4f0b2g0dr0lsnevhuo1ui6af20skaxh4a20yejrtvp0ahpyoqhvt5q0012w3164uwzegrl6dl47mc4u1pdm7n40peqimy3u6a4u70kh6ljs1uwpv7nqugvbthg98199gwufy02ltuvwptqcglhw58wkirkr1ee5zpe0kzvbsksh8xygoxt52i9vbpmnp1108luoas0y2ai5womta7mf4hk2svp6nn4zufysfbfqs8t9q2wx4us2ui47qrnam4y55y5gd0xi1w46qka1mgfe4ivjqg8skoj308yktr6qh5lj8cltcbhelsyf02sudz1xpdcrnmn3s1ezdb8pi91oe8nxavx7svx8pbmpz7zr04nq4lwt0rh47hzfuj9rntq1p9vuq4ytecdnvtmksea3bf6obx2weof8e5t92pq0ekso0zdy5gsed8scluox2uckb3a7kzx4fitjibep5jgfhmfxwfjkif7to1vb99rd14hqubzs6z7dccdey2ik3xymmjobio7chqynv4oz53bjqgqpxcvsozhhqaygo8ypw03jutgym0ywdte2annl4vp10pbiwkcmi969c2edi3c6akvwe5frgprfgyh0gbmmqla3917icdhbka8f5c8q510jdw10w2swklz5n8n52qimwrk8mswkrmev7pgdzs25ijzj3d1y0e0ro75m8kkjfyi0s3s2oohi6i0mjajark0xf6g9fruon3hff7mn56ibrddwaqkk3doq8n9kabb3s6iau4ulzm5xiecrppbclxn4yc5i3jgd0hzjts5qij0ul67foewvblv5xt3vez6kk191aubjuz85zo4yrapzp0u6rph264u6363z4muyaig962zy84eb2k8cyjq1',
                proxyHost: 'xut862phx5nv1ibu5iouy5oe62izc9g8n61tmkic39qeiefj3ealgxwt1rdr',
                proxyPort: '883we3pztv5oukbm6znw',
                destination: '4m5u677dzhyhw013nqx1fle0urc6j3pggpcfapfbsei94t2j49r3ioe39gqmsf8kxs7pinnv6p9u2nk2p1q9bfpaqqr2vjaix6jbe09cfb8z099910w6cz8nrwka7d2bf53s5tmy6dr7m5gmip70qf9whgv49aqb',
                adapterStatus: '6328gep2sm0vq6f8huzv',
                softwareComponentName: 'i8xu3tmnduuk9pbwhzq17rtpqcfagjo6zoekfrbuihw2iiq39ig0sdudv57dmb1gtmb92vikc2hqvv1fq5m7yhj8uim0ya84k3svrkbmcnv9eja4u21vwglnw5mjwoplgsfact8e46532ql0ujhm214eet2q8gr1',
                responsibleUserAccountName: 'ec6up2l79b1mqylx9nga',
                lastChangeUserAccount: 'ysp267ztlcpr3pvvh0rk',
                lastChangedAt: '2020-07-06 05:07:40',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c',
                tenantId: 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
                systemId: 'f25f22cd-3121-4c65-9930-f5dea13a6019',
                party: 'sut5w1pcz75o0q8n7rinu387yyzamb0ewlxnnzp4pj24lnk2i0i74bnmb43ulp7ym0s9mcryh5rjvwwfw46d2w9zd097ganym1z9fku0p3rb723z84b4jkbj9p782na29kmxx80u3g287mg3wc7g8wfswilf1mu9',
                component: 'cymg5d45nqfqy1688yrbf1tvlz8qfmahlwstfk5lm4vmzpgv3te482gk357pb58cznq5roais0koreiz0c8nx44vu7x1b6gg69r486pfgp0sjw78amlijwyrp3h71mye7g19pn2mj4mg1hwuc8tr0p17w57g5jhb',
                name: 'ms8yef4vsfuaqu326q05ctgs0r238g0v0e9v11io1w5ua8l99s3icbhwwe974m0m0serd77fewhmltvkdq74is0zip8jzpa8y7avveng8g9s47d3uq2r94dpdhlfsj4v29g2t8aq8wxlzzm4n4u8jmiys9zgiinr',
                flowParty: 'wqyco1lnpnmj4z0h8guhjv624bw8t75rinr3p81gihrb3spwb7xbjjupvld9oyd2nuk0r7kvcyonxh2blkh8tomls8vt22go0sxgprfmodcju4cwovsdu7gs4a3g6czpxqqa1h6zglohgwfoatrwyb8ykzvqonjzu',
                flowComponent: 'rsbzr6dqgepoq2ltcapr903zkfh8wneus9z146zeo4gqr0vhgxrch5unmt5an7li4vlo68v8r12zjcxvqp5nddombb27cxq2kq852lyvlpvahkacl9u5dcoeg9iigwdgyr3pcwb2og4o5n8z37uqwurzi8j8fjc0',
                flowInterfaceName: 'de7s6yaf8yknpomksb7i8nojlcde0heu589spc7e9q7yrwtfrr7b5colbsjtrbr84ow8xwc1t4w895i94p0c8p9ep0o4azt1b963e99smtp1u4hqzympfdb36izc9x0z4b8lrlks79x3pgapr4uvzy6r9o9g5z3o',
                flowInterfaceNamespace: 'vt85yfl5xbnp8mgqfub91q80k0p1s3kz1wa1b4ns3ywcan759p0mbmdvkxdqq7lbiac8n3p65gs0n9d8srk5mz40wvfg39ztqmqg5diou4dsvqsks5ns14y13lsnm6a7hskph6d6orpseogyitrak0cve2wnj4bn',
                adapterType: 'qxbytq5mz3zr2wtzg4jaknce50navf7ogvtipcnp188ns6pde2qytn3ihmdp',
                direction: 'dxxmtom7uoavumcfunej77e2gcbxam9xrcnra91x2qjbprut52i00bf005zc',
                transportProtocol: 'sw7mhgxik39kzhypt8o1i7so1s0a7fgckpezexf5sd8ip5fvv0md1z3eycsa',
                messageProtocol: 'docxqbpqlmw5ysym772yrudegw3rwt1fhiogur1l295sfx5si6obdnzkba54',
                adapterEngineName: 't7n8fy88shu3zf4lawsk96as46gvelpqow8wev9ypkhi3a798j8npwe7pa3hlyuy84rfv3yx3gsofehu0instk7atz3lxlt78xjskz8m24nk5p3f1vi68mrdqxkjs577xzujdlmm64o9i352kiw0cjp9r1793s2a',
                url: '5j91n0wd0s7zlf1l4q1x5x88fzgbbf0tl7h1w0jhqi7otkzuewjtgshur44l2wn2x3v98w8vit7vb19uvsfqg4rmh70pn4uhd9o9unzkt4guhr2rb0dz23uvcr87gjtcmuyrx6tstkoed209iygejh18ba6jdrs019zy330lsqxal6aol0m9sszulg5l92r1i6ecrcsu4d5q2ycwqzu9eu34mur8wwpe2q6bwxn0ozl7b2hkcxvti9psjpg2155mlceph40woimqe8x1qy0uoz97nnl50uqhsadk6q2vdcevpmzkox21k8bccyed68dn',
                username: '2ic1a87rpj39v6tgtorbqh0xwdu6odlbn8jtv1zuqn54afflhk0u3urmhi5t',
                remoteHost: 'r57l3hjvnkxzobtmip7tepso5ayzi5umv6cxlikq9776itgeiptejpgnm28t0xvf0swzg1pad2d7rgwijbone7kh4r3dus0cd2aqcdsouau6i97xmjzfzmzuftwxhuoq8i1ih347a7zvm7a2q25chrkfcigrqhos',
                remotePort: '23ropqgona4fqdf9wm3v',
                directory: '5nwyisekxgm1ex65n7rzcftp7ny918brcrh1jxf7s4ulihtidgbkoq3vfptjzowg1oyk89j4m1130scxbp87f3yvntut74v9v8qwmkki85pz62ggecpltq3d30f6x0ecvhlgvjjqepoyolry95zbmeigixxennnyg4sq7xhfcin0fxedj45rvjk8ol7bfo3fb11ymvs3no3luna1edpxraxuvfuz597pmb3zyhj85rqn998sl7dpynblwugc8xohkds0tbti36oewc0z3x75d2lq7bm46zq8wyfhk0c4h36oyz5g4ga7xvg409q2iaml83fpkbdaor31h7a85p20wl5noa2ndrlcfdcdz11gdboykb6coiemf7qjf99hydr73wgjfcr4slpkq6p814c6r6ffhsgzjwnj4pokdru1lud78o6cbequxbqsqmrfas9rrlsslcvjxo7ri72zhi5p7vva6k9sjeqjv56z8xdui117f3pyhah2i4rnsepts8kueqx9cwjyb4r8wvuga6vw3ekdkp6ym716w4575w53euzd40vvb4g3qfq10pj3m794q6rqc9iss0hrqkd65gwloah5ursf7n4jt3wh3orr2zcz6v3bjqx6yy3hpqunw05hsig86f367txrwsctsc45ghwqy49in48s8mfjrmchpch6rigt72z5kodq9s7hwixf0lcaqk4pqurksv41vlz918rjzewt2s87x09tf301ey9xhu5by8dmzjucjgcac15uam4ymdloocg4s6b23hwxk206xhjzdjfpckdy812lqa437kjipn3a9h6idm4sbsdw3wajk0u3vjd1rlj4oldkccvy3x29bk324eib2betfnc48boy38bphk2s91jypmtf260brq2js2jhkwy9hsskhmxzzmfjajghohqdiilzmn708jl9n870kybobcw8vkkdeyak0t3hrcnqfqr3zpvza271ksk1qo1nz1wkyfbbdek4le3pg59xuerkuf8rue3',
                fileSchema: 'e5fzzr287xwo2oct7o0e44lg4abwbh9hbl0ghxs5iyrgzwdxjimvskz7j3aw1qoxp17vs2fw22w9v1cxxkxbcl8l55f78he5afd5qgkmvw2o980t68jjhn41nqkqyb3sheba5t7t49xcvemf25h1wh8729bl6yerze51ep5kwmriirjfy21lxr9v02kp8egjltbf9l6iuzsd6jonod5vjk68bdckusn5yrpl2tw9g4lnqe43nddmjyvjm423fm7gi1bqb1uv2rgv8iqqae3a2q2st20t99rgbirjf0i3d1cqh5fvgc1vawqa6vocb0hqajc593e6046pid4bwcx3iyklqo12lk2qes70ji9wq4nvnzf4ehh451b7zkd5v41h29you4zmyy0r7vhkm0yk3tm2tilzbydwq55wiixko6h7xm8mgglkh5q9s94meap7icf20edfhe0vq054fk03gnxvb0ibnr30ab96hl16lsz8quws23ga16j8e81d020748jdktk2c46nt54y57erqmrgiffjsjpmu2co6yu890xfx4qnbxmo57vxyiwt2bima3bku261culyppfbdnfu99vpg6rt4ujcvli6kqe58x42pfc7hex0vs5kjmqz4rua0vjdw64drd8lu5o2mm2204bdae7ac5s58m9stf8h44sg5u65nm1kdroc2uupfzq81rulog7p5rsuc2s17e1ic0dye7y3g3evo7kmg2te1bgb6lqaemg8ct9wbv9m10dvnz2b7u66urkyhjlqzgkorabhwxjpf48pdm2kdm7mfpoco3j5l2n46us5z5mw1xtrwncxfs9nu62zd4cgd6fkcomsyeyfzarx0jreno4m0inr2drvkvgvzxkqxjiabpgwcwzmt7ynkyrfm9flwred0ewlf57tlwongiwv9s3xsncp5b89amdrdsp0mzegy0t6t1k6reaamv3poag73dg15apdzrjz832uz6qvogwu741rz3p1grvmspeew9p1kad',
                proxyHost: '645h80az8k3bpqhyi5u7evjxkvc0iy0a1jo5nsg8dmkw8yocguy7i4q3mb9n',
                proxyPort: 'yswiu5pk5frpuzcwsc94',
                destination: '4nhehosfvr0jlh5x8ge125uqgpq0exffdlqr77p0bgma6yujewzxbfqe2y45s7v4vtm8afvy6odm1o5nkpgdobup4lkj73hk6vf0fwd0csynrzs9cnhisehv9cyo4cwzsy14b9ir158yl3bw8kd57h5cq1hq3ebj',
                adapterStatus: '2s9o0lebb6zitfnkkxel',
                softwareComponentName: '0rjlsls1lzzj4dkao7rqtfps54nudyunkcmkvpjdo3ad8a9ctek248e7lewpgsp150jjy5r6enxrtrrsa2p0xdi7yzjvd79kfhcea7j8qem8ve80oet9tgp4bck63vc1dj4eolakmybwf8q11a7t8o71dlg3wudz',
                responsibleUserAccountName: 'qof6981jc6aton7t7ymp',
                lastChangeUserAccount: 'gn3qloz5ra5wty2ny3lh',
                lastChangedAt: '2020-07-06 15:27:22',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowParty is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c',
                tenantId: 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
                systemId: 'f25f22cd-3121-4c65-9930-f5dea13a6019',
                party: 'brldhbsfma57dy0kd26mnnpxhxtdebf0dr5n0uvxgto84vi53urd86j7lfc6o28s3ezb6qj49jzvf8npqvph5m8f8hi5eive0y81m4dachqzaofgfbm0kie5wzhpdgp24hpxv26yk796taus8b11slhb5q5u2roc',
                component: '7xw4h7lswmt3kpw6a3fnzgt54790s05s77tufigskexss2gidx5dhqp5h8ncbgohunq6m5wlv63cooqqgsg9macna9vz1zuy0mq4irjw393ii9ffofyegefdwb88twrzxmmx4z21972xoeptdfjl14o19uj0ky9m',
                name: '3fgeqb78exj3i2zbn28gy8fdh05682m5l8xu3hl4ks2xcrrd5dlg4o7mef5wjsfofyaiaauymzdh34afxndojq58c7twjb3f7jjazv1hodwq2t3rwu6rd7lyw60x8yxt5odb7zemjbktyl14lmjmyhkvbmq1kxg7',
                flowParty: 'z9fx4i23eez1i3xlgkrdl0ukz3dl2ad6imyc7awh6udgsxbi5cq35mawj7badzzuas5q07auedqn3sov6oa0jnokvjrgjqdzejl09lsr06em50227jfo5mh7rfbppu5847ynaz4lvirwpfhsez24czf0uqij2ody',
                flowComponent: 'c226pxt9tmkjuop9j21oim4gg65tyffyp8po3kwdeaye9cfo1gued9pucsf3vr5k8pvn4t5i8el882mkmtbub3qsnmmot47rzo4dtqz6hvhjzcjqu15ra0f6846e68q6imz32934tlfgxhmqrnbghziycg6idvgdu',
                flowInterfaceName: 'p7ow4nyxfjaaqztvzze07609ik6hz6kmro5r5y4trqsoubvh5guniwagxq3ts1jpkfzeavv4y3ko9gldhsw4nkkx6er6at2l7qdfz3r6yf38vjxg1zuzw8nzdh0x5ou8ykzhydfbr1wu3tf9lw8efgibelqmc9c7',
                flowInterfaceNamespace: 'tuljwzr5rvhmtrxcsv4y8ussplpecuamasijz0gz6nfykiqv7c1pbmhgzkplevwedg3l8u10mrrjowgglkpu0m38cqrfja3d0yphki76j4fad6n47xxrh9j7s5je88ez40rnrg7poox495dp27w77lsne2wx0o50',
                adapterType: 'sfum3u9b6ljt25tljxummjiblfk6urnt9s0r19nv1atvk28bqqcx9a55pwf9',
                direction: 'bwcknbqwipisgrn4f1pa45z1urvk0aj6sz7qt1rv8f53gtaw3hpl9gfvgess',
                transportProtocol: 'jmabo6c8159ngpqc70jj9n8j2ptmqwo29mkw1ppb0lwyubknjq0a9ijit9vu',
                messageProtocol: 'm04x13n1vpdc284edodbc50557znd570nf93yzwcmdqayc3gzghnklfi2l3h',
                adapterEngineName: 't9rxduojnaj9gqj9egjeqvk2rbc97cqlrr7a58qz58kwzvbhl17cn6dkqdh8f68vxwbw1h0bhmtybk71sq5mlrxkz2z70s58siosdqdt1kcb4x8kwq232vth407zan7s55atuajr6dxrx1eqj826kou97hhmdl6t',
                url: 'bfl6m63x68a423n91tqnxdt8ze7drcduxzw0rnba4vu3ritgnowhgd9k8phb1hu548i8afgm8as5fpgmvc5pekf1bg0nps6w0fpmj4ewid3fnk7yp0020pxxzi6vc59uq1fxzuvo2woupo2pqjtftt7hrjx3dgvkwieg83cv7bibraebtvdl6rwzd3doc1o82jv0rm5yirmwdubldnobefkq4f1k06p0ntr7dfc9bfq12fo9czg006cgg1cxx7mx17z5vav44z8lkpnt901bgx13fm985rm23e5nrez4lfd87oeig95e5lqs1pdlweyb',
                username: 'vwk3dv7u4a2eacm6uxqan2dofz5ab9sj9lwk8otsexglm04871sv7w8grosx',
                remoteHost: 'zd8dtnwpxylohmjjq7qfii9yc0vl4c8hdgr8duqmpst16xb6mks9801w28hvtuf8d0ifh7p0kgg4b5bsqx7eq43b7ie1vy7cybepagoi3ko925oqtqj3tyh7obvhd2sk7dd4hihex58eejc10iik3vqo22g2uigl',
                remotePort: 'gwnqvvbnjbcp06vyhndq',
                directory: '4unr3tqt0swg7iodnkn7z762ycqs9q0qldj55eysz2r1jnh73ptozzq1e2vb8spmx93yfghf3oh88hitj0cgxlivmq39ubb01yyf60hoeqotptdj89fxhp6f3612amzx4ca9bajqikpy6irqey2iqpa7t8dc7qhb2howhj70ax845c4rqowfkgs0vcczhwa12l4xomx2jmo3usvmlr14pep9ydyhbn3cg0qscbnqbcq9982jrhiiiw83t1zdl4g1bsxc9c46entbfirtshpgstaqaskpkoehv6ob2e0oafbw1ybahk84edblnphdwtaitui4lczc7ol8y9iqk9ll67vmvrnc5un0n2tl7jhyrq9pvbmuf4w2um8ng1yes1ky5ez8aionzdszxlifwg4rhs6p3f7wuo5hhve0rdfxmnoexoewg40n3hw2y53zi7e0fgt29ljmg0n5679zzdn323cy2w8myi7okgcgww6rd7i0s8l2z07lu3yw3vfjg4ck3jzfjgs2kvyfz50jddcb3ros5l17j3o548gbhyibxyy8pskzl04ijg6ugdwtg08fg302l5jp0mk7z6tb5ogux70jtebglrqvq7lg2y5r1efc7hw1bowogrwl01otk7j63taex262o13twobr6k1jp1ekjz96evmx33oafzaf8e4y2nz012wojsdd3ln022anz9zkv79f1iae9ny5jrrsmw2ophqhitq455ualscpwcgikuykihkpgbc01plrmzabfbfjqhkmyfsegilicn0dnuxeq9nrdk4zbqm5uqysax69bmt7hm2grc16hiejaaorq20unlnmltsk0mvoixig03e295hfaj0bit4tzpu74rcmpy48mk5ger60y1lvml3ph1bbtlu4aa3nu42csecu66n7lv5flu1agx30sxpjkli4mk3aukl715ewo9yhvqog0l5mhmevsj6yj7gb4xaso454cxpadpbbvtstkgzmsg6erwpojf3vbgytnhgxx41',
                fileSchema: '2noek6mbaed41ln1kltpd6oaf45ukybjjcl2iz3jmj402ydw280q0tuof2mycduq1tt67jzwnfm3cgmr9ql86wbruldmr8ym75an46a43tpulrfuxjn2b4nn5s3z6xuvkcbi8yd9w7w207bpj6yyzds3jrk8zuxgyty2d6tl5p978cqqzy7tdohkwbj5msxryxy91uzv8ugbhri5k5y2wvyuut3h8ak4rua1vt07k8h9pxoyjox9wucvmicb952ohog2cpe15axy1j5swyxlouwomahbejkrqgshb3walriqjpzpmuu2oi290cdkzv13whxpfafpp5wqx4fliqwc4uo97llagm2w8ahi2jost6iinb13hw3gawapp3j41fca2de336mnjdc5povc494c8p7t03dt87j5mihr7eceb7e7utxbowsm19ajlo9t4f5m5egc0tn77xonsvcg46s3ktclnm21cq0cnxdd6c2rfnlvfohbeaub1e0ay3i3twjjl7awl0eyoa3uu39wyotxan31kj1dhphx9p0cj2xgcgelgi84t09xi6kauhskgh925zpgvbdj73o0m9ujmtu2fu9fm02xgk0ydfsulnyuu6cwl73d21rqq8zkkzxridh2wiwijbbyj7mpsqx3w9b69bcxd0vpzgy8mucdoqd2jj68s4g94gqxfihyq9sg6u99jksdeuv2v2no8jbc2fxorfx9e12byt3i3cpp6yl1cj6eu7bzzu6oqp1abrizmtu9vvnio3ypee9f86a6dw9pyqf6jrm0d303gacnbw52loik3qnbc49fi70dfnm4xob76nec089tv3qazx4mnd1id69aal7b1bjwqi1k8qxruw654gnpuv2g8ocj1dk2rzly8k8hhqp6yrplfa5ccsth4o90sml8tus4z03sjn82dhhicxz8pcr66d082ira35li9czq83afi4vxl16a7biyc6lvm6305uyjko2fvo4edjwq96hvhhpy3wfnsunmkkh',
                proxyHost: 'vvt5py50eti7bou35gb2ivf2ruvu2dud708o9baol4vlyxm538zl9oxihofa',
                proxyPort: 'hs7od8vq16buegspjg0g',
                destination: 'o5h7xtip2x2qitkwjfq9mbvm5ebmgk7z1g938avbvr65xo943pvsk3yt7mjv2j7ssvmwcc88kgxrh6fv738w895rfojodz52rbpqen05wjp3l59qt6emwr8tbhtvo88a4d05b6oa65m7snkftvccx4gperqb045n',
                adapterStatus: '1yei981b0lev6zpvcmk8',
                softwareComponentName: 'jv79yey9exo4xy5xqvxp9ftx0vpsks7htxejhap5shbfw7xrh1i03hmg7etmmjv6514ifiu7t25h21pscgzefdmphppapcmdt8b2sc7v65gyonetm4viwoliqdxdek9gh2er1iju8ktj85vdsknqln3ykm8z8yhy',
                responsibleUserAccountName: 'ymkrkh5tcuhoqu5vyjnt',
                lastChangeUserAccount: 'ebnj45s6lmeovsoaevhh',
                lastChangedAt: '2020-07-06 13:08:17',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowComponent is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c',
                tenantId: 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
                systemId: 'f25f22cd-3121-4c65-9930-f5dea13a6019',
                party: '9uuztb7y5b3ldw8eh5va9tf5h6z3vfc3nhodfpqiyi9wpr7j9e15k8h114bimfqgf9kx2hzb5hbdcy9kb0eekn77siqgfepl9l1fj2hoiqffctjgkn7789ixvhbk8cvyjnh0hndkrnen0gsadrbheqoj9mt73nmu',
                component: '5uz7oelfm9t2islctc6b6rcydeddgwuouhix3vmofgsw3f3n7a84lecmcwnnsmm3ue0xh4lphzvwty4hwfv3q9yhky7mh5hw7zxrlcrtdak2refir3v29oj9w4vrrn2aldivgy4xlhmet4vow5k19x77796tuk50',
                name: 'hxr4s60k6mje9hjxdzcdc7xqp4yepmpjjzykqx7a2fpz3yeuuy792461iwdy7404v0vi65p58ekcwqj1v334p4x7fxo33qr7rump3y40zhz07u9u2xn1k66c5t4kxk2efs5npfid5a8gfdlfg8lugyeqvedk0wdo',
                flowParty: 'nvh6b0zp1olpul9aqas0fo7diswnjwkgj0o64apwplyb0hnzy92tdkccner4zoptruolrks1yygntwuishc9ewfzrdsbfumygegh91nbs4zt4zk162lsnbtj01dii612ctry64ku7vqk1s8vr8fvyla6mrdsjnbm',
                flowComponent: 'hmyljto8o78a683zfhqjqpx38x5al6s4pge2ciw8e2dwji9cdnin1yvuyrpsx9tvfv33z04xi6b5b2z9pql8kwunragkakv909zbqdzykl15520bxazduximde25byz5n33o0tq8708krn6vpl9swa27zp4l568d',
                flowInterfaceName: 'bklqi7kyqqznkr7jclm6a4c234l5lt71v535nulyynv0td03h50c7n35mv539vokj426ct6gf0ri5zzlq4vs4omqimfxqfs9ab9cmfewo61q2x2zi06fue4bv3cndwvmf62rcfep8enkeputtetvd4cfaee3rk94l',
                flowInterfaceNamespace: 'mlb3ooavph1m9ofyvap0gl6oo4mfg4jm7pha5pviyg38w6h3hjgzxosumq0cbl7cxwdp06zj0v17pqwi12ixily1049hbb9b63s3nyfwa0o819b54coxkudy2dcq2830f3hf7sjdra132uzasu0boi5xsgz6jpw0',
                adapterType: 'fazrg3vj3jpu3tr63mk6agia8hm933de7gz12ap31z6ujja7ycdh8jx9gkxp',
                direction: 'xugkgy4fjmimrqyjlgj44j5ejis3kd2ovfoz51hv4kj4qrasseeiowgmxvuh',
                transportProtocol: 'ecajkjkujt9v25s427cin4483i8tsemsemubniyn0sj7blmo5k7qnjuqkucm',
                messageProtocol: 'voa2s01158q49ifzneruerwjrg4c4b1sd29oq0jk4zjj8do9fgdigu93rj37',
                adapterEngineName: '0dibz6wnfsuk9osiwl7zsdhqauav6svkhrcvwlr1xm2yax5n62uxyqy1opae2mouvej92xsd97m16ak3gk7v1psznsjpc8zznyev3p8o6dmuw6f089o0na4l1bdjqvtmw54vdlyokn3l1oqj6gj9uh26hjx4ambk',
                url: '2ihyxu1hib2yfgxum3xtdg8qn0i7bzhowe90kx5x2f431mo45kspw7507iis0s6y1n6m930hkcokjma7l6daionyurhpiaqxsppaleqi8fhrqy4j1om1mblzr9zzevhjwm332z10808moz5iz0p22ud2blw0w8o50mdlabb5xg7cxd3n4j6x6z9b8txm9ff6pppt58mwga7kt921iq0patx3nfga67rs5d6tlurym55t9n4c2szmf13oapnd7s039prtv9qlqzoil6ghob1gx0yvqebx2523bbnav0sb6yhuroyzvk6nnzx5hibbr4by',
                username: 'rod1ab3g01m6oabjafbr13memzz8fjq5mxmi3frk5exjrhb75t9hj9gtcm0v',
                remoteHost: 'i5an4ifsobtd4mron82o2qex4624cxd57daabk769yuow1ykj7twccuu5aerzlq4tan5r8htah1sejj54ewpbpv3fhgeda9u9o9jbzndhgltsgmrko3sochye5muu7wuejuiuy3sufnjzfo9d5l63yk34156ov9m',
                remotePort: 'i3v3skckgwj2g5x71jkn',
                directory: 'ordv282ljbxzj6s7lbs1xntjufr5n79ic7hggoktwhlnupocvr2hi1zm5s96uyjknyvhz0fnv1rn3wrkc4z2scx81303ayqbs9uyavfdmmcl7d2wsf3ynx9dihw4s50xxwlqf4q7d9f4xrobz57tg46c9hpedejwtwv7gn7z7lbr3rsjipflwlaenprvo5lw12qrn4i9jeewksm6v6fy4b8s7ebafk0rgti2jzrpfmcnhxka86hfnpvnmiyt2wklc2yj3hfskqrx4oksq54n027ddcpgl1r1nxcomdk1tlrtwtxepbbjedcw5f2nay2ew1fgawrlza4y2dd3yx126bgx7ladsz4lw7z5bw2k63m7r3lgjv94v4il712yum6u8ue1hibole7buylr0q1v161svegd9q7i7ceaztrc83zkkri9l5bcjmeqwrniftl21aq0j8pb201c8dj3ykouog179n38h0tbnkwny73ehcf8ofaodsfpsthidr7nx701mwy9mwnja3wulywfmp4a1nbw2ogufxbfgjevr8pg5trrpak1o7nrc8im58ti26909wbv3czafifwb0q1n43t159udfaxlszp7buohqo039x3i8ec57h1hr9hs6auqzzqcretz69s93du09uwxrpims5dqka28zm06ij8h2i4hz0pt9srnraalr3hraxh4ivwt4ec8omkt9xxe43kfev8votrn1biv80wu7whwyquutetts4pyyp4bkf1e8uzeqqnarb2ascmqc3ubf403uibrdm6vv5yystpf1biwr97jmn2vqfclifxjl345ykc72tbsaln10jnfof0a41q69dirsp56z2vtx1rpmdc2s3eo9s5hfgr4a5fg3fxflnvkhuu23rwom69wyyzdqdb41jgredlo9hepmb1ggbhgwevjv6fotp1y1wb3vvkjndaxcy9gjonfju6fbvb421b37680bnmlcp4pv7j6xax9m34jo6f4ea6syc2ka15qlsf6xp',
                fileSchema: 'gznhdd6c5sn66xh1i72grjfbbl93crv9j23nnyn7zhw9lxx7o2q2mwr6bgpj0rssob8a3c7epu1poz4p0h9xgi8d9gg8jmv18wd17kzhl4anq017wx4s4zpabpwzhdo2egj6zbqjo8zaj6wdyq7ef2jrzpbi12tnrfhme6fvh155rw3k1brejd2487ynovu8r6bq54tw5fl1r5cggnv8cvw9ldrpwpj12g9v799qyt7tnf2fm68fiofpw8m0h6tkssmd04h3ot5bvxqzwwd2cvsqrrdpg9vkarczuzvaom0xwioxbnq9jj9zripd5073v0syilvxafpyhfqic4jovauzf6mfg4vsjgk9pb5yalggwo7gltv817rz14dlk877ws3r75uj3t3u3ln95gmjz9isjuzzluxepl9evg08zoet4xrdt26183d4f8ndgcq0rd6rwrzazdi85i0snd7wy367b0queytevmlvl1hunmmzpprfybvoewbj2x8bvdine1zomtb7ad7ox21pkxm5csi3ghzziv2rwwrp86cxdmk93ids8id6xnd6e2wia28hms5r3zcqq07keh9m40jc6qx4fvg98n11x3ggkiy4mxhte16gv1t1i7unf36rkk1et8n0ruk4eaqartg4bhybw17x4t2nk7qxb8usn8ffbhrf1tuhbdm7p7n7lfmfkv25jpu7gerzc8af15zgkmlpi2kxcu6y2tdxvqucqu41hx5s3c30nke3wu7dm10k5i53z8vtbpsf15bctjobf8qjy1msuijk96kfv3elsnxju44cfdk1uqq5ewzxw93yrxb899bmjos7kzhir07tzc557udocehjq504ll3gg9l9kgm4zz5hmipw1vn4vc42pjsbo2etv4x2ua7tpcchyu5bbvff9r9f7hitntm7e7dvd4l9lvql4ebr3r1tuxne2sn6718zzctu6v80ao7fdez0877efbo4kxgd8310zs9b2sa48p5d19nnkoimidts9h4',
                proxyHost: 'bmnnv0ell5wlujo8g6xc09czdc2tb6bo0zhkjozb1uop6bu1zamh48b7c43n',
                proxyPort: '3dg6ujmc5nhllxx0aep9',
                destination: 'x9vib4j5vy88wbf9eqpkwd79slv9wle04c8rarp6xreog813x44hi12e7eaxepkw62v1la68tthkb8h32nth2m4kjrippy22o3mzwa7n2y3sku7ngvdsmooacaqvtsthpcewe2e4of6ex7zjrnwinf6l4jefi7d7',
                adapterStatus: 'nijsolf0d06a8ywacyyy',
                softwareComponentName: 'f21bj4ofumdhwk13qsp0u9tcw7u75wjmobzr0evukt836zoai9leg1ii58qsr41f73o29x1kg29we42hp8iol27kqpe6ymcwn5lzatodrb9893lo5rubdpww5oo88dot22x28k5cvgor61zqj8pjh42pevox0xdw',
                responsibleUserAccountName: 'stwri2uas6hgwv2jt9sb',
                lastChangeUserAccount: 's9bh01uj2rv2hfqjjd5z',
                lastChangedAt: '2020-07-06 12:06:35',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c',
                tenantId: 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
                systemId: 'f25f22cd-3121-4c65-9930-f5dea13a6019',
                party: 'x3pis7b9t0oziw2nt26z3lu82ftx3sscv76v0zf0hv5av7q6wgiq16hpqunqfsrdgmk445g4rd30nncbjeqgbx7q98qbq3gvk08cz89r9nk3n2rg9djhll2xctsdf76ddxdeea2v55yhgekutv9airo3xo6gfa41',
                component: '5jgpewsfwm08fl8lmu6unn5i65jyqu72n2itbg3gpwj2j7i1qhaka2dokfyx1sn1x6bw545hkxbip7nqdcmfzojlhciasw0xliee2rztml8569uhu0bzt566owu1p2olicnzvij2orikbwdipbpfx5ogxv3crtxp',
                name: '5rbvee02ecf3673i2hgoj4zspyvwwkwstiwodnbzh82z5bo677dftmfdm2mj49jjewbpjybvsqi1kn4c2avygfxkqpacaeswew5x3bqpnkcoyaaahpsqqf59vh6nrm56aijzjoscsc0m7wo8gl59zptv7opo78fi',
                flowParty: 'c1m83dakoqkif41upipk9aronwck1wkox2rs7c3q4f2766o2sck9886v14qcvweh0v3rx1z2otsdqxyrq3nw80c2pbbwyerl05bse0apd9haraiamzg8zl7b4ug33i3dn3v5ijp5exoehbt9iil5z5xx46h9lvub',
                flowComponent: 'kl1nfyu4sofe2sy56nt6zarc8cze8fk41oy0lp6shdw996c4kw2vlgnxi0fudymz5qewv2y6z8wg7709c1fvlaereu81vpgdns781nx3rp1xn7b1ba8ebh11pk629uug9cey71xl2gd30fwqsqij9r7as573qf4m',
                flowInterfaceName: 'h2ls0xqog8t09i390oxr9lih4ngvr450p4663kpwq4n3l4hy2gmha36flyklkcthn7usgtqpri6mz759a24vf3y9yiwmby2zcptzmfu75t6f1t4qdnc20nyeov7fgo0z84dtlbvqnzru5r1qj5uvruoz2cuik883',
                flowInterfaceNamespace: 'bw2iwlx25e1g5soe2p4bh08gyymp0xc59id7wlc8jzoqiesaf93jufcozd03jqx664c4f73vs5ut03sp0kbcobxhznpiq42xs4oytzt2r06hu5dl4m2obfqg562710ri3r4epjnftdqwrfk6eyjir5cyd1n6zpp4s',
                adapterType: 'bgn8qu65w9bi9i3f531b6pavuz3n1uu735r32tpy8msl70if6tpxsob81k8d',
                direction: 'fgn5cba3o12syu94nne6gkzurhfwwoq6rt4ealg0z56lcog5a4q5wnqt3vqp',
                transportProtocol: '2d1ohte14zi8jiv4f2w31f3s1ac02fgqoqchwdkzlgq7nijfug4iimvl9x3p',
                messageProtocol: 'be09rg7f4u2bhz7neitgt5z40xxk0t9fj4o6m11gz9eie57c82hclc7ieueu',
                adapterEngineName: '7a5tzsi6bxh6dvhq4leponpg0lhce5c0342h4zzzwt77u60o0afsuig38xy962s7m676jgb2le7pd1llsxtdagc8jxogujfnvd2mrxxj4mh0lp9onphpaze7v2ieii6mejzt6t7o8qesknd22mucznv06uzmn8pw',
                url: 'b3olc5ogb4u0lkj3bjbtbryzmvfpkhiq6fpzzhv2fn9vubwv3j78k0iscslwirohcwyvdogeedcoeye3tz0ir54z7tg974kih5aso9k6tfs6f7paxhmyw5dikgy1jczahsyeh66rmvw4x298xwozk99famlv9ejaawh30oqzro6qwhtburw7t6o38ayvgngfxe4tlvswqnndcoofcox37xb8ngzxx0wvquz2kz6msm241bflm2c6gtmk4ffgsts3nlhcwxx7rcfqu4ghfuiebh2p8hwkkzhjfz8dd8rocl5ltpdm5qj2069fx0vwann6',
                username: 'wah3absm3qsr44tdtmmca2vskdcxg9lofxm6276hbd3xyjj30lbmpkkoi0b9',
                remoteHost: 'g8yylj8aqa8zax9cfleilmyw1z11wvfcswdmxbif8bijtyx94fb0df95rkkh8n3mj8thimsfx3kuoned109aeact2bzkcpvrja5uanr52m50iywlwf7t4uujygi56b2wczqlxtpfrd3th3fkafk6dg6j4ek2cw5h',
                remotePort: '97qqemmxf12uf1g3nvk9',
                directory: 'ao7o2grj7vxevfp9f2tbk7cu5pc9h66xftvx943xdc2ogtl27uqoqzn9w5rlpdwk4fnmrzd0coadrtq3d9zjaz1g6ssmkjjiv75vtwjwex5nx8ysquf573o2dut716ify2ye6a4cu2pfn9alenhpmanp32ierwsfzxlcoxkiipz22nxaxs1poqrylltiytuwncm3dwbtccgovamjuz7vvncpqvf5sumd9otd5cp5p3f6qlydet1n8dg90zqmhakrs5hph2vfg16vmvrfu569yk6bda9et6lholsybzdu76dm1ydf62gm6429kopm83zju0shj2n4p99hggla123rwt5dafh786244esjx21enugwk9oclfh0er6dbrrk3t1896p7qhmoua18wnvstpjkqbijztatbvk5r30r9kktu8mxlb46ie3or3470lnsp3oewwb8zyt5jk2o6nb98337pd6vurou0erqw0ohsx2jz8cdjwe6mpvfqlolb8dtnt0pfg8dtedo993p14pz0z7ojky38rmjkl8qm3ae1lf9z6y6tou50k0y55wjz6ypgqoh80ca3q2zk2stx85v3tb5mxth99jpmhgv0wb0l6bp7pb700taajn3gu0q0jygk6hll9645cyuxo1ulkto2t4cf5job7ez4rgr5h875nm79oc7exe8p8udddntqejeo4md2wen1vkd6o9nv6hqq6oeo351wmkm5o235ku1cng1veyks9o9kgydmes346turu5q6xa22ca36wg12p4olak1empruvflb5vpy17eh7c9m7v30nrcml7zvjymj70ipnkvw0mkfdbd3ofufildmaej7numljwj3qu708cqjkwxzk2hk059dlj30r0pedrr06ibjefjkn1nti348jzp8sk6yxssoigk435qb5u15asael0o9quafcpg239yvt5v9loje1wnpoymfhj9c20e5txy4s4jb8y72j4zcar2yaem4utlkiyna9elb9xckrmzlgr',
                fileSchema: '2th8jhdrycr6cmluooaytm0g13ibceele4wsnbjzj9rc1v6rjrtenrjyjlsmkl3aa7rpqi1q4595qmswm6s7r5cfg1xsqhtsm4prmtsbvgg449537gexf8kozbf2jzwla9ku3c6ylczhdfty7gatf9hl1osrz5ijuoq8ticc9ml4unrq4a3u5qvvzwyjm3g9sla0mjafzdmrw7ct79i46mgk18irpg2z1qsv8un1sye2q7xsp7b1eda39chj8p9goz5g4r7u8eq6p4m86nya9zr5r8toj7bkbk1bqkluktpzvtn692x7wkfvbr4ojnkvq7ku8sg7ves62qusxk46qml5pi55sc03yzyp805202pmqhikjq8glc3bbgntslom1o7qpqwlv30msvtvan6njw2zfr5ulp4o1jc6ffb29jfmkq4ewjw2ih9mtvit2gv9nwgmkg1izfddrvrp2l43kst3lefymj9vjl10o6eqctkiurmw10lz5eurpdqm9engd0167io1pvmeppcwk2afmb7fb7alfl02gryelacv7e22gvxejhm7zallpd2apc5r8o5pv7bm1ot78s474uis728jh4v0aaj2wdhb6adoxa4si678bqxrc31mzydp01n12188qn20uib9yk318qygpfzqcwk0snxyqybt7wfr8m259ii9a2ni7dyxhoomqmy0axka288etq6cau7aeor6wxcdqdcjuy5f2ke72hmj8c24y3zy0ud5bm6oz7l9gybyp0v9fqri8rz93qvymsskbo6i4z5ijactjopwvuiailqggm3tdyo9ukw9zp8hol0s3l91reoc00v1fdfubj6rkhf0oq61matfdsl9gml0ou36xapvgt5eur38151vcofr7wf6tpi5o6hjp2f7jm1sqob6imib8u6x1ye6427ymnpif2vx6f9e0fp5dtq86w99mcotvvbhqa5n9w0lo5vec87vo5kpu23yx5dyf2crrjxmtben7pfg5bowqajsb8g',
                proxyHost: 'f4qp2fd6amw908fszzmvzmekdhdwpdnrqp119d8lnj63amvszpnsyim8cik6',
                proxyPort: '4zhulkcvftzlg7sdonmh',
                destination: 'q3fo5u3tki3cmflq94unvty68pa2k2p55uzxcky0xlix9bbv28r19c0ajdlk7z7pb4kbqq1onpv8wdp1f0jnt0xp4duazhrs87vhdnpvulpyatdya6tx8iadl5vlvu2h9ts1xe9f2rvy7hq5z05qsdz7u0g6usd3',
                adapterStatus: '79v4srzfeeqjycbpqne7',
                softwareComponentName: '8qtqbgz2tos3314mkrgmrrqkofr6riojw0mwz62jffhivaiy6r5swh64qkz5ox3beoiczfpvr6tmldyzobtawajs8f6wpclizizkf9f2jwus7kslrxpz7qfseoandll76o3ossik8bfqswzmwpr4p5gfyhgp44hp',
                responsibleUserAccountName: 'f7g3r47je7lwz3h429mj',
                lastChangeUserAccount: '2hlvwchk504w0v1s8dcy',
                lastChangedAt: '2020-07-06 02:28:12',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterType is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c',
                tenantId: 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
                systemId: 'f25f22cd-3121-4c65-9930-f5dea13a6019',
                party: 'w0lj5mvbflugbens7sit3l4iyjtxj4ofmf9kkku0udippfopfsin9gdq0ph9wq9dhg8djrud5yz8vb3zj6p7cfikiwnomn2fgazr49txihf7l4y640xnd1zkindxfewztyk14jlrgp037pja97m2m73ofrhnomv5',
                component: 'ecuwyn70kuoxp3ua4b2ahx97ts9gnanhe7can2fuh0ll370iz2u0c3kvs8um0spb9w58hjxnnnf4y2k4p03j79f1z9rla2kh5arqrdqiu5zhbmwzvae6iiwmds9teiwdn33jqc3mnflh4k8mzmgthw09bwqspm52',
                name: 'nubmvn6ffb4gbbmg56j9zswqg8di5iqwiy7o0trin7sb2wwnaxi5a7eu1ma1hrw54x0p59g3hntwtkkmuiyhmfzib511lvng411onwygwxs5igb3m44sf00chvqcirlsz00x91u0an5zxis2m50bkrq1r38i4iua',
                flowParty: 'yr21w45zdxm84561oro9oma065enqu1ppvmxh73lpewp6rg1qytgasrwy9ps1fi7ektnaqa7g0uv1d2lkayhpmtrj1sfxuy0cwtnf3rl17olzblm06bj446jj4fkwyo6fc81jiwwpfvfmsob589lk0yx83jgemxj',
                flowComponent: 'x7e9ftpd2306eyi2gtmo2at5me1na4yudwjz7t1881khlr2v7bg42eh07rg2xtousg7giz3v1ucjd36edazitbtum78dqjp3jghe2tut90zr0bo6nn7t6wp123fluqsk2nw6v63vbxex2kplq8os7i78839uzvn4',
                flowInterfaceName: 'd7tl5rgwavy05v19npo2t5sqdvbvvxabv8higobh512ahdl01oc9j08qrhah1qlemueol0q0vqk0dzlg2o3t5e0wnh1cfzeyyai5wmviqrgkx0q39n9teq93v1r0kq13axeu0bmx0cc4w23nyg2ptwawkhct0xqf',
                flowInterfaceNamespace: '4c6xhafyozexx3hwn1mbqdkwcpdfamv23ynzgct7txgfhuzabj0ki8iyxteqxpp4nk5a1yq5r3nmxcotlxt693ojsspb2aukvup5jd4n0u5bsol1s4cc93wpttpoaxeqvv5xhi07e8v3330kfbpyuyjufs3wpwnr',
                adapterType: 'tfbonriq4p6r3abw3pxqqihsw4a2uep7whyhc8z902eyhn57nle5p8qcnk33n',
                direction: 'h16o2n0kinahto78u98h1tcs4etx6el17kq8315z9411t4jbeicvpmwssv3n',
                transportProtocol: 'vylk2l1vt6bwqbrwlckoehohcv3hihhszgcz1ysux28lavclvt5hukchhl3w',
                messageProtocol: 'vacag5b3cnrc4foam647wcdb5n21e5e77b0qmjstcy796kp1xyry5d5k5chs',
                adapterEngineName: 'qleb5wv6lakocf18ehtzw9wc0fygova91mmliouc9js885iyytnt53zdtalhplc51yv1khg5djc0ncawxew7ze545jftje3ih38rka6ip91kngphnoc33xs6day161qnlrv4xsnb2hplo8hrwbsodvxi3hyhsj59',
                url: 'y29bsasu25o29yhnnh74cz96r5urtcrt8oi0s6u22ud0unuug9pvmsiv2zofr5xvlwr0hqicbg2cttu9y90bdnwjj10kvtg5nlyvaq9sq1wrsiico2w4u6lvle8d8ltjael6rknaztvjrnh3xeqrx1qba871j0smms1saibr5qhn4noputgmcu67by2jmi62dkmjfb3obvdzd4npi8sanly5dlyzngr9m3tz0j4xvwtzb5dsnulhs4oye347ac5b8pk7ices5d8uvricispoubtvd6k8twqft3fd4ot8rfya972v45etks12elksxzrd',
                username: '5nilnsp5ixfbna1hlkmn9k3eug3uq4w8ef8p1i86dmbkmpxothmd21uji1ay',
                remoteHost: 'hr3ey599kb2oyec4uvljty4rcgpo9fu94jci0wabb9l4c02nm3v0pntlf6a3hxw4kevqqjnml0clue0d4jghlagmis0whe92acxoi3i5d1t77pkuj5qrept8yekgeud3tq5z0x8gnj2pa70c3quwlrbjjnatoqdb',
                remotePort: '75yotabb1o90l79sanh0',
                directory: 'b00qyruk98xb5l2xoes86ddcetqf9yd3zngy137dmvdgpt5ftaa44yb9tqvu804er688md66i1levb55doe4skkh7u5zsak16pydiy4huc5y4084xofejgycv0z1d09r16bn4hjn66xfd6jomw5lf8irgzbvc6jqea6j66ghqkz3m713pu083z888yj1mxmisd69i72xlrl41194s8uimxw2zot2bjcakb80ol02bro1lxyf86fatdjcjgtd1gbe5ksacfwvec6al08mxtfy9o2cyinu1pzhh65q5i08hl5s8cpgptreg44sl1hvx196jzrrrs54f8lqpk8sn5ay0x02pqgs3lav07m5z1mawqqss7w73fti7gln1vl14ew33ajngq7v9z4utyfameic8dhllcfhf0db7g5v9psef2glv5mz4o1c90vcn1jw0foa3keq66smmn0dswh62ceiup5ckyu0trzt0a32pp88gzub8ki3duotk9iuc56886hw605g53t7ovzeirrgjsfg71h8l0j9zwbjyez32wtgk1qnyjb5m2ogh3r4mdglr6ck0ky0iu9riqb6fnxgtdwrszqx6p17suwy1lv8xcs7dx2brskf3qsk7ux55h7mgpb41j7vt07by9jt5n95ksr12zjavnjnzqh4yw4zicliu5li9yrfhy1zuov6tb8jhz8028m00dahxo23448jhn8w127t99cwm2p0khtacvl25ig0o8nxm5gyx7hew00bjezrzhcb0wwmzab3onoxejha86d1ft3vknwsucebwjagppc5ne7t07n1o8z9yz23jf7euaqfv63w49f28ax5lkixhqs77wjz62yh3804j51e2esw8lz5iddt40mc0ax0o0azpii8rddvsme536jj7s72ds3t21yp483fjjdwqmf640pjvcehfylhu7gfe9ny5vtpn1splh71oe1c1d1puokz16059csm8h4eja2j11qbyei25fipgynjm79w7982d9c',
                fileSchema: 'ggh05e8tj3yan3bw5fhl5ba91pwtsmtvuhshu1ihrtii7kod36l1i02v7ux3crjut3qv5suk8pjtrt62hdkrrcd7g8v2xn8hmrvuaq8c7vfqbt1xxz1hj1petla6en2l6cdrhpei5kzxs65cqga0jo08dvp0ubppyh23rgv8r6c1zi1z9xkmxdfyxpsfwvozc8dujlp1sysng7tby7wbc3jwnccwbwaqxidzdlaypcfaqc7hlkd7qt2gba94xw3xqu9v8pqwwsnoe5xq7w0dmh1ma3n5d99k8zj8gjdg77qecqjblsaxlyls5e77iak5dgdpab2w86nxgwh030pmxnifcpir0n3prlycdyzwp08xg6oc6nq8h0f0d7rpceipwtibaipboz6jy4agapbtstws460bw23vyvh4o8jao4qo1vhnuidguxw58q9nqwgmociiuy5caamaba1239awt0z719n7ho77w63q12g4k9f3wtbxc927njra1j09d69t4bld3yhq7q4qhaedgogjtsfduanddh8sia9bqha10reweh3ql02fmj6w2lrankpx0fcl8jdrpvbb5oboeg86842a3jmtih89e3zi0lwmpsiq426ldh53nbn6minz6vmwa2pnv3iu7vxid8bc6nf7mxfv4ooyle5reicns30yqt3po838wkhx5knjtt8hsqyj6yj8uvnfj5rmtqmrd08w81gow4rgnbixmceku21idgvk5anlb19vioqkhd16rki75hczb6ftdlte9mkp4gvh1yjo2illtzpvwhs3mo9lscuhz4ngi6kjb3fis7rp6gdqzdi4g7ls5qut1ysyihdzjpdhghgm61cmm4tmu93zn25jv4ibcgp16lgglt8w9eb3rwfbip63kis952q3z3mm43svdbk5g0s0tfhw5w1y81cehoj22bn9bhyz0if0aqokwxchoskscjazw184ysa9usrxxa672w2oclw55svl5a8ycccnbequ9nthai03pch',
                proxyHost: 'st9b35t5g4r526lj8i83i4trip335vy690107l6nvb1mm5h1hnq7dfc4gnt8',
                proxyPort: 'vquazpa8i5lzaox3c5oz',
                destination: 'q0syw5nu86nraknqirhmto940xgmgobsjzb3yr1zg78o768uqj3bkwhmfrkozrfkohse9z8z5lgv58sm9vefpg4fj7d91entv1pqmm66zs4on8viyjm5og2hjwmejbymhhlwhrqsil3moqn7z858t05hryxtp3bw',
                adapterStatus: 'g4wpgua2iprjbxeifxnd',
                softwareComponentName: 'dd0jcmsq4cpvjhzd0040kjhm2jkpog1hi5dy50i0buw59jopm9ww2noeiyxpa1rqzo9uebl245af31f7sqtweomu52hccqedf96pyfjdts95bd30o0fpwkjz0bu2esdo05ifd28x1fvl8fyz62sw29buv7sbdkm4',
                responsibleUserAccountName: 'u0xzg405b3db1txfpv8w',
                lastChangeUserAccount: 'd8gosxump5l54oaomkst',
                lastChangedAt: '2020-07-06 18:03:21',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterType is too large, has a maximum length of 60');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDirection is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c',
                tenantId: 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
                systemId: 'f25f22cd-3121-4c65-9930-f5dea13a6019',
                party: 'l5cplar2fmafda4ohlpydml02bm8t6xy1t24cvztq94x14e3kxpzdb0ps21h043kptfsk1tyf5es6im97cmeqmnq70s94oxbtwg0wy0dvd4xsjeh78v0v9l0yidnsw9iuthp9emz1mm4t3fsw09ldwci8jwrzsdv',
                component: '7bukrwk9kokpdqh74qcgtltnyyxyb5zzqc06i0fcsujfpar8am8icw5m2n38n7razkka7tv5egogd8edrdclbyvw8ylrcksnng1cot09fb3bvrtvm6e491qxue0p4nyu5i54b0po3y14yrxepqaq3qx46n9y7lmj',
                name: 'keh83bf3eklet3h8pxhi6chttr9f5cmqehggtnlssb21862pdbj6e4z2tbdd1bhtdgli5rrqo14xq4ttfzqfzi1os4hxtf8ofx3wi9gf007xqo289dvzazt9oy3psjs7m1m6fdog5xic8rix9pmtqjoucq6ajpfc',
                flowParty: '9keev3qxxv2zgbdvf3cxf0p1gaca1ux10gsa4mafz70hu8gomfxx35brrt361nirbt54j2g4m8lzvekw4ru55o10nq7nzjmrzn2kxafjhtttkrvsy8d3ktjj56zlpdzitnk3txe692x9iguqggdhc34sw3xf3yqt',
                flowComponent: 'xgmup7d0ae0in0wnwuy9c0sqcqdyoylr27oil6dly1sjtiders9rdlbeg874pd7ot7aaz2uplyi7d4i7gc9j6w0eci3qs67rlq2a80cyypdtgggrwmqebqua0oeq3smsdg3rj1w60qsdeuvuysafq7g1ae2j5fuw',
                flowInterfaceName: 'os5sij750r3uq0cf2ye6y142m8gwksb5fugyii7qgvbwdfl8lnzuf2bhdaehcc8whvqbtynm0ry9ujbhiqiincom7ueipk4qdd6mxi5kt67va05lrcjaomekattcfw3jgw10z56lve7i97eqiemqznigm17vyme1',
                flowInterfaceNamespace: 'oa07lj1d2augm7l1ekhatubyoooy0jd84fh7qzhzz39qv1vizjeg159gx2qruw75bu7kntig2wq3405wywvqc57i6yi8vwrb19wzouzpets8m9xiidoo604jf3epjvf3thk7tl4mjtmm0a7k6b2nz4r1ir3bds3t',
                adapterType: 'kauibkj6346s3mnw87uo0en56qmj6dobqgvjzb8d4rffifuen3jvqm62g2j0',
                direction: 's246x9jkd08cgj9ljwxtlmotcvhl0dytzxqjd51e6tk4v2i646e8lz589hkjr',
                transportProtocol: 'l95sjlqnmgghouaxjlbodirfrmz6736a4p3qdb48qex120hevfbw90qxec98',
                messageProtocol: 'lccqjyo5bhu5xln6bc3aljx0kowfbf7jcv7b10urqt0lbfsvvycpnv5ixnl9',
                adapterEngineName: 'zlckp3kbieoouaancep3iuj4y6l9hwc10u9d8d8yevfuidyxxrmdf44wa7f1s918ocbrh26ec0qxmgkuoj2n2bl7woaj0qw847m5wg0oncpbsgqi8gokpp4wbwvmofgjs8sul4xx547gzo6z33m1tn7t5514lcma',
                url: 'hmwqifuotu0pmirqbhevvw2g2nyyrfqeppbfczm1j6fn8urocgcqauazjk19dyasdt1nl88rapkhqjriwuxhp0lwt8kfu3sy3ixk72z7gukey9ayy0vkp0vdwxqdc04qv999fq6obev96y7xw2nj5dr916oa5v59cqh6feleck33mg1als9vpof8ee1cf7bxaxmd2unc1baginnmev97fip7htwh9n9ngmu6eas5x0r6m8l9qq8fwziifhf9js4617tz179hcnc69j45xr8nhfwm7aq5yak0okv3jdx0zdvsqupc81unri7tlr5nqbev',
                username: 'm52ht3oyv582qnsijce51xiw1a02e42418sk3vtudkou0z388oproh1wh242',
                remoteHost: 'jsczmidc4xhozi8l8cxq6kutvyovtv7eoerq4vwswhbzaw5aaz8tisvwmlgaslex8hzwek6uz8e1vquuiihmxwf2exih5sovdrega1z4lz98c87m0voqhp7siml0ntg98lp14guoi17gp97su64zg2tllovpitn7',
                remotePort: 'dfyutm9q4hxiwz25zqsx',
                directory: 'owr5rkk11sgn99ots6f8jxu4oq2jo0zhl40r6mfqsu0kon0pnsidcyl8tmtj50s684itfaae6h7zh84zhi1iqnsojdvvsmnp99riwd0f8gs3x5ff5y732ywn66ost6xfzndh9q2wdsigkl5scx7sveznrf5nj8evm1dusxy9yhd5c5qo5g0i5ccym44wejv28gjw8tyddbwboa2i98ye8hkay6q55f86nwqb9znesksmobt07u5lwb1ymm4hyoxyak6i9g9v56ofrfh4rhamh0ood7s53kyqhit40jbvy9o9pi0sotq6anubfgq645wagfmm3r0hd35njflzax30hffhyuvtyvl6jvy01zvv7xw6d4ube2jdmdfkbmazb55ocozacizplfqxm4tcdx5t3h63n27i4a4riq7w7ozlqrqtbr0mzsflteixocsqti181l7zzsi6w3nwolamxqnvbphsqx7p4t35pfth6yhw89s6xhkzvit9wdm92tkivoalvpbiz9xn30nkh1tf8vw8qwcqsl2risimtfgyqhryx4q47o3w64gktmoqidy7dyzy7rumwy8j0p4zimd9qnfa682gun0l98940hpzedw141dnl97g2l9mvfv3iw63ae23txmeawxs0kjx8ox75rimwzy4xkixq2qme0hcv7q7goc9y2h03lugqujl642ur4432qqfdlh962b9tcoa8zmg0dhraxqlq8jtwv9f60e0iy8xx1hnojvnb7elw51g0veawelyq0ct018igkfp81jgko0m9e8w35qkchyznybcfs4ae7hcbmzs4dldmqesrb2uv9h8lc1bhmpmp6eha985pwpam8po6pwr3j4g4hrag6a1l7k42mgwgnxlq2bcbumjr93m1sjj6u5xq7jf5rvtzq72q4t8slygr1r9xeyde2obpu6iedoeejyd0hik65hbaj3jwkd4cgy31mjr19970mzwe6q6ci2zwjx5t3dynxbomxdyqbsxiv9c4ynvh48',
                fileSchema: 'ioodr8mvl5zo7mypgy6irs2ogy6l3xcgprvebb7wojsxakv6zo9ws9d21ozg5gjuenz6yqsbygbm6gkk616gvtafcweudc2ko09vfpt067elxsxyxck7syk1ho1ebinx9wdzevy5kqeie3dmrygrooikm60cz7p8kc477q8dsa26t2q0rc3frv570ywe254v6h3ti8tbw0l70ccjqzk5313j6mbxnn3c9doylvqrhn6gh12w0t6kqf0rggg9doxwnsl0g31grll6c5h1jcxedt9rgxxpco6cpx117ixt1bkxz9wtvge0myydpeepc7rkfnz3f2i82hntzj4e5kg7jyns596fa982niyfskbqrl5l0tmpsy1rwdmzorknxyrhgpsd73j40go0rewcmbqw2y23taxxfcico7i5ti1swiix5j6lfjgbwohd9sqf7t0uyeujvlaxb68ibwoehdml04l153zrhi8s7d84d2pw8b3wjyts848lvl0wzn6l6yvhxj8rkpe6ckakkmbxryplmvqfh9bd13ljwimokwoljubk7v5kzjf742y09ektxpjpjt4aiom5o3g48vqg89x16kdfauy1900knc4pmeqa1awqdbt72t6zx1lmuxt4kr7s5kpzmush45r0i4ipf5bmes8jd9tsmywlhhou6hj8ty4mb1jwqsjenxnzds428rz9c14pzzi6trurppo28lljxchj6kib3ok25m8hit40kzirf4f4t7owlc8vtx58fzt9acctsh0wbt5p71s8bfoqcbv8j07szisv86bquqivefhhwr8d9xg2w4mwlttgdvis5cl8xwljuqxcgwxh1zadiy6qb1ydpj7k7hqtqujjp3zq9lwtxw553f9n13867ri54dba70k78rw3e64ijblhjlzu60iwotakky9equ22pkgca2m7b1xwxl07xsgpapduaib26qixuuj85w2n2q8idllc1ustyd2mmvu0m9htk2in7jcgynqjlmzu7bbbuiu',
                proxyHost: 'i2tp5bcdc7dd8e5q3k0m4o12yor7064090w0pu1w2km7e7y3po55bjx2hdxh',
                proxyPort: 'balfun3t3r07jo5vh18h',
                destination: '5yafa82ezhb0lwy4es76sionioapqlr3c3orz7gewf8y0f0z4la5kyyiqmp3zh0a83wbyzpe5k9vs4r06w8tyw7ynlc9ywftf4pkrv4rugdfhyvvjjxy6cht1m3tv79n2s9m49np77gvfd7do3d43k6ffepcfl8j',
                adapterStatus: 'xdddxbqc7vik4hynqfkg',
                softwareComponentName: 'p09vq69zmyer5w8yvm23f680md2pnxar6zur24t19vutvy3s03mznxe5hjpxhecmql11omrbms8a8clavwjxv6l37zd0ft41lkymxnz6qlt24alcl46rclqksmf3plkfa3wmuw08bqnlz5bhj4a1nrak4sq9e1ac',
                responsibleUserAccountName: 'jc8cvulnr4nqjc2711vj',
                lastChangeUserAccount: 'v1sqxix44t2xkwwkoqeq',
                lastChangedAt: '2020-07-06 05:06:19',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirection is too large, has a maximum length of 60');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTransportProtocol is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c',
                tenantId: 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
                systemId: 'f25f22cd-3121-4c65-9930-f5dea13a6019',
                party: 'im6yi9dcro6iprqrr9bfyzfxmr98yrfwqn1x75igujcazchag7f9rqame7kkur2j1y8p0on8lzjuujo5ddohoaz7yh9uhb723cri3xff1zz36hfshh8n25eizfkxceq6xkjf1flq2w3asuck50m4bsq1py7vqdhf',
                component: 'ij9y7oz9jtw7ltzng8g2g130mk8rdwy2tlh0i6ofl8exjwvrkl59j7xebz7a8h5fdbsusmiltzlvx4uyt5dmy5u5lwgq3vyjir1ijwunzxaptfby1bw5zc7tyiw2i1rbt4wl2sp3zoxih0z9v84sj1oxnjy54zzs',
                name: 'loa4fw0gz1op5eb5hgnja3c77sxwg42hyd0mvwvj96ms9nw0saaq0bly3oje9l45ptw7m1y395zq7xy34xa5ytb3hoilm2h5uuhidybz3yw5t7zvkq62kr5nnkyr9vmrr8xfqi30ynqbmm2o7gcv18vny4aiuzcp',
                flowParty: 'y02y845soid1a5ih92ierpwq1y1g79cwcxj2809edgc3rzlq4kx8s44tu8qxkflg642gw6dq6f1vg3t471xn8grxedi97ej21u9qxy2z3aov9lzlegdy1xaejf4mjhjsw69jvuxkjiafcuj15zqxhhb5m0dh3htf',
                flowComponent: 'bbcetdm7vbfag5u821pmordp26lc75iv9ra7iel3cjejunxzqdj7k04opqrlfdz5rbrmd2xajcusgr6n1cktk1toi7vn31v161kcyxdalz7e8rjze4ixmkuk7fd4xffjjuntspgtrfp8aor5cuyp69ygfwvkcec8',
                flowInterfaceName: 'fxy6vwv8glri5f3cxmgvn1io1uv9djid60zue29xml24154yd1e7ko2djm8zndk758yacmuuh45h43oxaf1ubvlwgikqr7bfsd34smdt6lluyka23rii95xgfj5ivjuxquor2ndhmp7rk9nlxctidkk7n7sagdmx',
                flowInterfaceNamespace: '4sex8w2r01b2ke2ufbkwjc5p3ce5l65n4t7ge30naguqzq88t87olxhnqsjkdwsyqmkqdp0j64uzkrrub1gnqozvojrgh1ckryk8uluyaodwonssn6zi0kg2qzo6drcarzfi22o0be0fl1oq0ec6wb78dtl7vjab',
                adapterType: 'yv5z8g3jwhio00vymp7mwh9x4vrkllf8in6ec3p17lw9ht5rmffpjt8rbowp',
                direction: '602p5k74cdnyadjqro740crwhn6cphk56g25h75myu1zl34ul4e11fzcvb5g',
                transportProtocol: 'k4sdfk4xwlctqlhc49y685hwekruubn555qvlsyjwfjmcbncqormv1bsfh3s7',
                messageProtocol: '3rgl3fhkq1uscayvwu5xd4rvhaxa7g6kuy6xpdezs367leg5m5kik6x3gdxe',
                adapterEngineName: '4zq7co4s8ywszl49aa85mmjthp37bbnqty1sq9dxw96by53rjvw1r7zu21rjyonxzs7d4j7u5tsj5hji3sx5lo3bcswhv1d239t3belgoa5uuptbw4k8k9ui0k5rubxlzy104q4cfkdfybi6yy4neoehvc9ve02f',
                url: 'l0ma8c4aacz2a7lwkovgltylf7vpjnrcsqptgdr7a7hrvdswruykquc3jbvbu2yto1jnoi64pmou1am3xi6o7ahwokostue2ie2xs0owx89id38sx4id8kd0irkca6bfgh7wnnmqj3o3kild9mq8x51ys8po23akn6wy3uvshe537va7ardaciucvcr5jiw5lq0qs1ya5z7eeu18v2n8nsn5vcf89y8nx9uz155if94ngjdiywb2g6h9303vu1f29qv96oye3po25wu9vp42dl1diey8b13sowl8m7h5z8e5wpvkgta4l0owdc0b8unj',
                username: '52rondmytuxptsbjzisr6zqe185e2bk10sf0i54cjqzkgsdni46wwf7gw41v',
                remoteHost: 'h8jt28d0wc0vxv1cw948qlcqfruqe10lu25a0l5tcu56t596vthov7m8irchqdw3ovdytbdxc44xe2abc2t52edblo70wycuz9ub00ha4rf3vrtr75i4hfgasvwv6kydcrsh6igi9f6pyz88jmagpdq82pyr30i8',
                remotePort: '6s9yjs9wl1kun775qjhi',
                directory: '3uy7l8w6000qud4sjrz04l0qbkvaeulciyzayvx7rompg5rot0xy9zz3e4uaj0cwnk4ord734w510oivv2hffl1y3zc2i12yxr3f1xxodai44ukzusiv0djh96pyis398jap5glnmm1oj2vzvflz5jlapwvfckhcoaqck1cgba88p2kapamoexhbtyngpnfjkz1snwxchswevbszql73w76ouegoz2zdziye6vgtdg4jc70an6kg7pi4w8nwd5308hz0d5dc2tad1og9bb5uog003cjskx7vwokame685fhhmlk07jxags7a3fp2ol0fstxuo32wxzn4buf5n9tqn06h1h6ei73ivphqyv2e2e95036srekh9c8ifc8xs4oq6fqy6lq40rb51nv21acedyiutq3i8hmrxuv4dr0wy9ewed0tyw13dr9z47nf4v4s5bv4gw008tuw31xgk8n08dqjf14xztpc0sx4y7uw9b87wtbxnkb1oub2wcsoil5glmhdlaqtzk7i7xw4qku4ul9kn0q138lcwajezusuaqbdy6pk2ktyl85z8d2zn559ke8cswkx32agsto30kaynqrn0ulscayapp2rqjrip9jjayf6fjo1i9i9ym6askjwnntlxs78km8i3xxhomhf4om64hyou9wzufvxgitj2a0loa6tndld6lh5ebkql0clrc0wxmtx1ctwao03g5lwmmj5fmim7y042qyg2hrsda03nndilvz6h3kf8yle5l0bxzs7ofw9i9fnsu5l8dwdrghyzu8wliul1w03xx0s9ys3823ebyzqi1u8tfreg11v0k2rsv6ex1do65rc8j8x7gox6jisup7eob1drik5mqodn96mcd6nryufbnyzvrs7vc1ic0gghly87gh7n00qjfat03z3nxm9vb2jfg6jlfwpa8s6eqk37fs9fmgpcwarnkp08zc8zf9yi9uwom3lk4v1ayb6py3d8p7k9xnk12hhe44oswxx4gg27f432u3',
                fileSchema: 'p16ddne2a91z9xhd27qms3brp95djih2qbgdz2ddwded3uwrxdg388tr6r0jiu8ei81yq50gtqt5zfria0dq4i4fqghmpb756667907w91chjuzuqep26dvo7q4srurn9q5mq9h32nhwfaabo76il70gt0f299u4t3jqfr213oemjthac6ufukayl1kv2r2hdnsorvpbmcqqq54l6wlm77ku3ra74ydj6p5f4ad407prn0x8aau69kfahqoad301f2zgx5o8d2hmzwpd3brlhhpvxawnqzowmnc90hk38r9tiokfjfsyaczummzp8v2s0v13xfsbosog6yhl05d856ocau1tsxhyopvbunaebgi2hv941gwx85mep7xgyxjqahqjm5h9wgd8witmfyrulfyv1mkfqw7o3chmj9i8z6pu5hxyg60dbp64rs7rgudf3xmxjj3t496il9sljnt0h8sc5l9s2154lrc4lg329r2wxg6cdfwchw666rw3t64vat0m5bckgpuxa4sjadcswmb08saa4wftqascsc6ejserkcwc4vjpx197k7vqs1r5ij6f3firsa3fh8c346iako3axpkhp55bba25l3y85fhjpifchpch7yyh3tjn89950aayk5yzgvld7ma4l8cffsydix3kuw09ktdbeiv6iy87sl55pf2xup1dvxnmv4la0sbzc2wdtt66kplu28ir0xfh6d00ob7yeb6ve51fl456bxv0xz0q6qnpk4f2ihbgu5e3jltquz4k3048ii5by27gklb09xqd41ruwx39pj8pkrfu9i1kk3d82rhe9s82jjjy97d4i308xa1kzwgruo5rypanccyvf5gobhw8q172mdal0r1v2qt6xsd2cu6jm4odcdpqv4876vfslsx3f48a62nqco25s40umgqpeucop9dgfzlrv5vbqrti7qudyx89mc86yx75rknhfr9zcd8cptru1ujejnbj1i7gi2uuu95m8fhdlose5o4c99m',
                proxyHost: 'ymzut81eocn6pgxivfyprx7rgul4g62bxxqhnfw8px3p17t144eaq8usk8fv',
                proxyPort: 'oywu85ctks49h1ditxaa',
                destination: '4auwmod19kfne4k3rr5upjoh63g4ykfju49z8u6haf6tj1fpdxhutqgg1hc9xh96bejjcnkmrl184l2rtpni78zvnxsl919yzensy7scpkgrrzora8y5e6mfu3pn82zk3wm2a120mws8rmhs94w66p1lr6s7m2f4',
                adapterStatus: 'jwcaukbyhe78kx9x0v0v',
                softwareComponentName: '373ngdx44o41w9h2vydpbtrios7f8i6jpn431iemd9ylaap0ew8tc0tb7pehyy8vlvoutw74gdgddtkh6o8p556kjz6y5dakysidtj4ewdk5iqhm0w592a4vwl4mo5dl2gcc7u8slz9nb1yuy1frbrjlik41718m',
                responsibleUserAccountName: 'cx3c5useyvhpvdatvj21',
                lastChangeUserAccount: '4s2nlycj7lym7teg1fcq',
                lastChangedAt: '2020-07-06 17:43:16',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTransportProtocol is too large, has a maximum length of 60');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelMessageProtocol is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c',
                tenantId: 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
                systemId: 'f25f22cd-3121-4c65-9930-f5dea13a6019',
                party: '3g66arlwmg0vwcys3win4667h1dgtw235allk9qlpto62iicn5h65e83kpa4xt3qgcwt9kf70q3vpktx9w0uvrhykej2vlor3608hgmpjqr52a3gkfd9yarhnao047ikqbc0pcmc64p66runfxnmg71mkljb0e24',
                component: 'az6zfh4a82ltrgffz0aa1ty5h3zgj8kvigf0bx8jn3wr0ohz8876pt4alg70juo3yn1lqzuzq4cdxpy8c5vis8vib8vib444k59q0n2te0p4b26p1hw8pu7itfm7q6cawu01lb68npcyff37vcpgbhwypgbakgin',
                name: 'xcmpcjum7dy7s523gh5fa26xmdaaw7xhhlmhfzmtmfr0k1tg1df06dy9arozqfhzz4hzdfk4ef9jspnz0sxh14dw0tdqx4fz8ix1qa5g46d9id68i7f6plilkl5yu6v21bralq3om7h17e0k5rbjsu8pa06kp6ca',
                flowParty: 'fem49zymb7te8q1yyy1dty1qw4guporba7xtc3ukz96hojpq4i4mbeq7y7lsl9dpgous39z6tob4uhzkib7yrdycvtyrmk9o25mse3zwimo2tb7jtjhl9g3c5y1xm3fqugt6o3p63oxc0hgs1069ctoihfr187fl',
                flowComponent: '8y0h2fj9c93kzc1k8yn8pbpwrqrbkkb1s8mlsyt26fgzge8f2aixk7zna1jfta83w7mgnumrbcpg52a5nx85w5lbt46o4az2xavtybixhr38xjn6j6qa594u02r47ksnmy4a4zg6kc6drkwl3l3r5kbuvuk7vk12',
                flowInterfaceName: 'bka9spw6a1jz3rchyienjgsiv32sx92b1spzl4iy1sr210hxwnqp0dzfln7kp3fql5u98jytreibd9764tfwi45klldgqgq8ptfe05ek1r68g0n86dvcnekpz419brymx20p9p60qbxwuq1u31zqkazy4k008j8g',
                flowInterfaceNamespace: '3txqvkrdo0izfydb6pbmj7wvdnfk43fgx8hu412v6wcztpr9axg14yce6bjd4um524ok5whjti3zg6pchhhsygl7dk49iyo76q9e1szkoi6qh2k4r4t1t6uaz1igs1bwqe24yvt054igcl7v0vqeuqicvlwuiozf',
                adapterType: 'klg43sgvhnd2m1mzx0juuox9kj7avakswd0uquer02bwyml2gqcawf49b3ut',
                direction: 'znkyvjsjmdf6c0oamyxyg4vzka0z4vp7kryn9j1xbrhqxk24xyjdk5rsusfo',
                transportProtocol: '8jx521pcwhk6hk3wnv368lyxazctiuqvdgwz2mul73t0o1cw73mn4za5l54l',
                messageProtocol: '04koq75nqkksktb8l0rt883dv40x1m2o3hdw8kg6c13f3n12akdfbjfkxi0hq',
                adapterEngineName: 'd27dyq048btbuadhv0t5vw1svm8sfa6lidu1lqs5g14hmqjed6q6km08a48ke2qwtdwips0cjpqlazjjyvpsc0w1yz50ahjr4mkry1epkcfxl17b8fimyvah6rbltn66bhilfgecsoeb0betr8hatjbfu5fp9e8u',
                url: 'nr3m1ti05d9x0rseoh0o3ymmq95toauntsk7cc7xdrtghjyxs41ficrnlzq4zn8daw7notzspsta4s4tqk41nce3p7f275axl87vufxsqwy3zn5yffmcu1v97lcrjbzoorspqie9sk8cggrpyxrspaht8nl4b5zvt08yiha1x71ojgwhhl4pts1caqu4navjwtmfvdjdm8h0bmd2qu5hcuelun0cga8m5pvhp9rde7em2equj36aec1k8jbfp9qkvuqhcukuklhil58ggz5b08bx85ksydbtkcbdbnenh28i7rv51kzmi0gcum4tw6mv',
                username: 'lmm43vhvh6a5g0rqpq7sgnx25taodsgceoe1usr0tzzqn5sgmxk1u3tsx41x',
                remoteHost: 'wp4o9g4af5k3wkja9po7ku4og5ebtd7019sq07d9ld5ler7hql42y76fc6j3cwkt5ho2xb9w34z83bhhzien2n3jvwlbc61z1atcven04dv5jslag702wymnbeuv4a7klj62n3gmm84ov80lq9ffw5gv94w7anif',
                remotePort: 'okbxcumt8vdugic15etz',
                directory: '3e4fckc2qa3523477bqgqbczffx233t9z4yt5xjpbo2z202myp67623kj5nhympdzh1j0van5cd1tbjunj75cymw4fzxaeq2kys2rccj1s2mhcwzk0n33kl3t1uo0jeno26756q6lhty8g5rna67pwx3uu8gg12futag1rryrwgyyujqhur1syez51w14yyi8qyiw7hbgvwjirdm73bqud55cmqu5867vw1w2gqzngkyodrws57z1g2nn3wwkl6fmig957x6xqem1104fp8lwe2a76p0yueswvfsj8z013x5knjsouazyhfw0k6njpvcpwbvzocci8zvc71h5cl0tey5ew8j4q1xvjgcislpvvmw1t3m6tdvemv2cv2t1k9mm8m3moftvfxz3krdaco1c0l91qz1dihyqgajviai1i728jkcmfwn6mg7rmm38d2dfnwof97bz1dnwmbytoh1a1dhsirmyx3mvhe00wnf72pgy2u75ii34m7gg4p8wv1tp79u8gea3vs2wuisyimu9wmox4dx3mgedw331rg24reu1rstytjul0lvw83swg5o6p7yord2h8047kuv9ts6k5kjmlu20b4483lzj7wybyt88uapqm3i3nz8z0vrmg86de5yqq0n3io3cpsm23q7hk33v3md9ntk3k9axwsjz2vd4l1jy95ptx519kh3j9dp2rvskcj4nakhlv86fi0oajs1c92r0q8ld4e0vuc54w7nf6famwpk0biamcclqvl9tzu5n546318b1h1iwlgqup2ow3qaojyacifwa9xgq7sph18xrcswfp03xt378p3s8xh1rphkbmafyds12uxtvmzkjroxc32duskpeb27wb01iudkqg9vo6znn5j953y4tsbm8eaceebn8xod3ymg2mozi0mpj55ywudikuu3hx54diy0ce79xrktrjll6dk6mut8cl9bzhekuc55kgh2c3yltiv6mdfx4k7rnkg6j5v65co163fw159vljm4f0m',
                fileSchema: '8w14bflb1jxo0te84scsuhvbhkfpkh8bgv4nmw6cj7spzql1nuak95iwz6jmcsx5y2hlcs53mjkzbz2508vkisjuv5beqtbhh9qdp45q6l3spnr7e5yctksr4cubq6ih3fkacc5i8dyd6il2tg9673gpoupqy2qbcfh8bafkqi5xrvbgz5hnajgu2m6b7uu60xh61qdftzyx17hxdcys3lvj7y0m1qdqo0zb2fuof6xpvf9ebtuj09a1sge067lqw1i3uv3al8rfl6l4ljcct58k8caoc0s5vfhcn23vhxuzq4cnqr0euxvc9eio9j5f5ybxt0ldu03opdlawdobt1ruarv7w4qoswihu0d1uqg5wf9a8mw89ev1te4wmjrtfxbx9hl47ruoy7dhtpzc12wljrc7c7uazf6yv9ga8pwegu3hqhj9i91gtnhen70cf4kbtgzq8hh5nzwhx3vvknw2z42ho9yjnso2rv84qbegblmvv5hkk2uzbt1hrb3lotckxc563ky2m77octwllzlj2bfac62pwprxhvj54crh6sq45vhb8sptn3rq2ikyogfr8lprbztxvgfeg0cxjnnt81rac6p68tfleerzaf6o558p88ms7y5vdrirbpv2r6lyuq5xnaczd5u6iy3mnxtf864ve3nm9u5vaqb075wzq92dc190uvgrhk7up2oyxv15ebcjbco3fdazqv01gbi5ivaftio8fgxok25zipgxtvw80wh6b0ifda0ddj9ktp8k4xpiyjbqfhu46pglqiheqs4dcfmsig25b7pacv4t7wtk47jydiq6fln5aunr49ckcttfpm2cem0zveuqq1nvpc6bi8a5m8f0snzn29cfqjnwflxylrrg8ixq32p8k5ozz0kfiz0p45isxe5qjvp9tv8a1furorkf2okwx1aolvs0qkywl3v2njt756hqwf1qtnz2b8rnfsonsxjpx6qxxel0k7gt79em99yf6t78o2i0czx0mtr049ah4lf',
                proxyHost: 'x3qh4vh7qrwzek4hnycrka9m6fu0mvxbl9sluo15vpqgk06t7cybrvi8ioab',
                proxyPort: 'h1q7utnqi3yvl37lsrrr',
                destination: 'xy5mcjeskgtnuebx0tra5x55f73dl9ltdhtcr58kdlvmc14c3qv3yt4ht9mdem1w90nqm6saownsyysuioy4f5yyn7dgmij3v40xo2p9wvc793lk4i5dtxyxtzxhjsg4ivi7djx6joqduunpjva5a6300u9bc1z0',
                adapterStatus: '20fclrt87ja2t81xzdxx',
                softwareComponentName: 'ehg8imgzp2qx0iun0gd7di9eh5y4xmbj3j36ns67w1we58kx4n9hpt1denoeaqqnny05fq58m6n3xgpy15783uh3za6pvppl3i8tpktvtab0410jw1680fpjt65bclbp39dn6q0njab8ygf64y6feu52nkzyp2va',
                responsibleUserAccountName: 'vl1941lzigznmrcwnky3',
                lastChangeUserAccount: 'rkd8vdxroblctimeczl8',
                lastChangedAt: '2020-07-06 03:36:52',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelMessageProtocol is too large, has a maximum length of 60');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterEngineName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c',
                tenantId: 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
                systemId: 'f25f22cd-3121-4c65-9930-f5dea13a6019',
                party: 'baklazudl2v4suy9mo5hwu4k5vzof64zkp478koesbpcr07j0b7a4zwyab991isypz7smowb1a5sqrco9q5fy131waooex0ng8aty0fk1oxxnhipd98fpm37aotk2fc37yyzl9lpaknhtuj15omo1qjmecd6675z',
                component: 'shyh4tc52ajq4rypglwd8l1w25fw5fl602hcasm3vid7afw2463my0hyins4wddwgh098whwfd4mgex2uwz7087g3avpnrmws89e5gwm4pjmbxmjaj3x19n9ndrcuryzyfa8fboiaarpyyjo1bnw2tpr89v2rnt0',
                name: '0t69il51lqtc4qoevs4fhp2gwrtym7g9f16obrilmpw3767yfsxvaf6l8n22cwgdirb9i1ba8cmupv3gqmigepa2k90qgnfbg4lyi6bjujcryopqsv4vdcnvy24jzw4pgqie5bfrhfbxdhnbgg99319ndx6afa0o',
                flowParty: '0rc4hzea3wmuwfbkiwsdgbbwjyv77664xmza1pqi04s6ismpi4uignnbnpkk7d7hsgl9ks3m1hfgsg6bicy4qskeo7yddn4jlokc8ghdqrx9kouk29pok69cuy16wyi48jxe0uascp0y23v0862e076n0o5wy4ii',
                flowComponent: 'u1qbb9k2s9jsa9nstfrb692wvmphla7wd8mq8q2u22qj3ps9pyesbx6loi5rqgtln6izkf7tfi97q3978xnj4r6ejcnq728cw6z3r1ylpfq57kdp9gi61qyi7kyl63tsqoxi3jaw2cip11vjhakocovuppdkim15',
                flowInterfaceName: 'ldq2lrc824mffhdj2l6w5qizwi8oshyl09dldp0ptdkp8otey2bfbhietl1tmbnse248sq8yxielqqfjdp6akcuzucv6a4awoo9959nzcydqxzyvf81zgjwa4c1pjd39qw3r31lyd4q41bxd4sehlyqj74shz07t',
                flowInterfaceNamespace: '3fnukqnttq9r5f6h077jtufgvs0hnrvz30hxvcbgixzy8w9td3ncubcaqy32x5gh49t0ejajbhpltpjopa8w80d1wn328bxdm8ga3q8huwj0jsdyuwoz6ggrkr0nibgrm4nmk7uavi6nt652de9xivahjvu9zlg1',
                adapterType: 'fn1aqq4y0cofydwyqmjsfrc2azbrgtrvhfz50asyu1pt6qauno2917k2na7s',
                direction: 't8ci3clzdgw6kh88m0hcy28504eoktkp03o8opivhsm6rnfg672p0v41bhob',
                transportProtocol: 'p6l631tflhggm3psy2ymz2lk7cc2f1jv2mp7a11wrqm5v1s6o9ool23kz17a',
                messageProtocol: 'ebw4liftjbe5fdz4ukiuiadpga6wrwte2cpy94h0cu4xyn737s5g5xyjk3ez',
                adapterEngineName: '19k1wqeecyn5dngnz0o3r2nrdt5fw9wdwecqgb1s6y7nnvm9q35f60ca9wgpgz56b7n803wm8extm3ry9n696oto80tzk4dfboab8j83jeuihcw1v1zixjmkz4kyowx9ua3u44o0jl6zx1sxsabhksnswi3kwx5k4',
                url: '0d9x28tse227rycwfbp577dvllobfwa6eet00muea8foebt13j1f6um2u2jwzp83d6n61xiilzmkhmmxlsy1hr1lcw332q4lb3y88rkckowj3a9ajznzet24unqcpk5eag06du4xji6gp5x7age3g8imbkctr4l4k8ma4m1xsbv2e22mvn6r16231ovhs9ev5wug5v9xlnlebw5afs6l6mgs8m9pgiappcvkyx7kqqvvdnf7ohtdg4he38syn534cor59yu4fgoup2i59s894rn56iie9p10f1g1nl92jypw134r4iwxn34k5bndys84',
                username: 'j7zuhkxfqqess6m8920ze4vyfehnwawi3eeqyoxjddnf8hwpyowmurs9htnj',
                remoteHost: 'qvmtauxvaxttowurd8k5pink0nkbcqz9uojsqwrraau7rq4sg2gqn9c3kylwn3wel7wld0f8e43vpv799xe3prxd73r3aygn81va92n3ij5la4ls21nduw3dzljpcxo9c7wk3b9hczxbcq6ecfc97rb30o44j1xo',
                remotePort: '2yjgc6xv4gtlpx18nylr',
                directory: 'i0nty83u518ljb7y1hj6j36goxekf64t6bwk7o8ef2i1hdo9kj74gcgyafm5d5l51cfwajhlpd3ak1kk6vhwjutkhpthdgalg812dxaw9nh07jb89qr4r6ldcidw07n7uhjly9d1t59u8i4xc4z5fmiyumqxi78fej85rdlgtysl9bvmdt0vdzmis82qn9gurq8bs6wdbkw3d0jztfcs53m4oieim2tdghsxfxe39s6anw3vwcwkc8lhmbylo2g43hs4osojplo5nap0z1desd0tamvv9drjon1ccqum4nngxgk1va7p66dwoobt87tthr5ghmld8s0whif4ch434c2cgfn6mvlmrggy0ye33jr4yshp9wgtlfi4jshchtuj45u3pmleyvlwf3d9zi3silwyw66mlzj0wyvniy8sj4188ul4xv5udv4rs2u06ogewy5kyqi8qjlna4qxwk06ydtrytyuyf8r2l8lkatgnerewinm5j75hlz9vzmrx8e2w46j7lxybfzu9272kqyly26zjl7ft7ap5cxhqugj4psppbtr3zp83ki1k2q39euwa5vjdt0fo7kaf78ow5tbn2fyaqoht81vpyil6dp9y4f0k1envd86ovmftbertfiinoy6v7e26o63czrnoy474rq5vt31bejw6wg0psdrq9m4p16hidbvsv596kp17rgfg7e424tx9en7il56ehs3z8bmkkzhdy3em31wm6ypxlqfqu85tu7oaigprwr3l7bjp7thvt4s51tc0lm1p10n8jg3eyrdxldenhuyt74p5tbtsdz89k4y4n7e438hy4ju4wvt6xysplwxsu8c1utafhw0ra1e8bc5ugi86hw9ebobxu2f8mktme5nexeo82g7dkzyx1txa6v5vult92ol2um18c4pz2o4yib3mw9vfawbul71g93lvx3ew3o2fmkyyaa4iw1ivsbjbegmooapyby51upcxnhwqeoxvsqp5dg6x8xxet4bwvn9bmm25pj',
                fileSchema: 't4uwf5n256jvc081lqkb5u5l4kbdfdjjsmbbqazl5jlyejbt4xga5yvlbzghi8hfzgw49dxsm15fpuu54oby94a0y0npi0cbvrceu5y9dh891oqy8234clgbsjbtibk0i2y82izwvsvrsd6a3rotb1mexua4mzlror0hpufvpjcqa2lfbgeirt0t5p8ke9my3cf1xrp6lzaz34obv6yo2aizufwq6ulhhofxh66ylwi3u7fwzjt8xsvh5swgbx21lp2xiwghvrimkdb3puwva5c5ezsuoxis2ou56718zqcyequf3iz29ar0th5c33j7py14ntl1yxl1bsgvwnry79lx7j8ujaf6f7h8lrw85gjaoaidcfdqrme1ub2ypf41rnkaxybtq6g4zvbop4zoxl91fs5falxpbxkvnbz2qneq0w69crcqfqu6gr58mc6qm2n6fmx157fpv9sze7d1wi7aj3zqycqwq872vrw6j18jc0sscoebjth5vlr8ysgfuctw08p5a6a1mhvawo14k88bddoo115acdhdb718pckbqk1guy1yd09r9djvq43lh0qycti3fys30mka3k8i8tx8w733hwbd0cdop3lv9i96hoacq0b9paf089rvpfvpujziereiw7mxjjzso0zd5rthd9rbgy53dj6wq8di4btl8lxwpi0lhtc5l3n6gs2hg9ib3vugfk4gu346hzshfmdjwobk9vm1i0i4nmhmt352q5h107fj3tsao3vizugg641hen6pgttdpcpy2284e7nwz87ayo8cajlhwadj7o7xi4eedqg8ibifql9eyfcrnyodmb8ysm4bsmjx1q1h52gnebduiop7vszn5t27pl1lniltef4mzq6ggvmxoh7jkrb7lxtbgjp9cwrtmbv8liv5synayv4ai3fk5gyg5pbep0pwyjppxa5m6rgquwe1r2ozkfvgegimaqfwvj9cyuqluca9yjpaq1h10n7z84071ucokx18janp79dkt5h',
                proxyHost: 'aewnxu8acxck15tkq6bencyeblh0b4jfle08cju7h5xps8nh621fcul040g8',
                proxyPort: 'ocgkl9t8kf1lr60wxnhq',
                destination: 'uprqjbzgfx8o1r88lqyrbxyahji5wxvwevporn6j0uguwk9w03zcgncam14wvm4eu3frygmpeb3litkt9qlb5xjaxoshuqz8c2rf6n2vbkqy1ijxsl61onw3ygut1k2f5xhmhkx0lyrtwhofe87zw405acjnpy5v',
                adapterStatus: 'v2e9fzwadvswhqznk2kv',
                softwareComponentName: '24w9kvcwyb9zy2su3ktq91h0oaaswgyc6vsafriuzddozt7hhqzu21kl2m0rzq7yrck0nh7hhutnhje8d43lfmxhf1v5i5g02irk4lt1jfor4u4v0xkv99wvvtk2b37kq6be8s73fxlutlq8qkpvwsd0cpoh9ld5',
                responsibleUserAccountName: 'l2zkqwub7g7ygh18eaxj',
                lastChangeUserAccount: 'pp8tja9fw718cgd6s9nj',
                lastChangedAt: '2020-07-06 19:15:17',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterEngineName is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelUrl is too large, has a maximum length of 320`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c',
                tenantId: 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
                systemId: 'f25f22cd-3121-4c65-9930-f5dea13a6019',
                party: '2j9iueh6jopjck13xujsbf5zl85gb5hybim4kq2td2gaqkthar15krriifhjhyflwwuzixg78jctovg3zfv6qstovcdky0yxlqtloqsr4m36gfk8r4equnh65e81b2pbtv2rxk4pwfcelydtlzosc3a3gfpwsm0m',
                component: 'vuftwhp21p7ri0lexuwnyk4b6d6sf24ihlvap3moakbg5p4ltv3crua4odvrb1hmdws5nrkp2e1zmq96bnsyfh3z4wmn8g2n9gl3i42mutugljcw3jnc33eqr0smxnjbm33ut1nudzvj01g33iqksn4ghyut6n7n',
                name: 'v2ri1knlfl5odmak6ows3kxfe76jb52md17gc9aw30cvmpqshgzgdgrb7jql50b3d3k2oknahp20ti8bscy3zebdnhpbz7wlqyuab561vztmk2rnkxzptnzwracrhqpjw7ehju307hkeu9cys3sqe07zzmkjqfaq',
                flowParty: 'gqdcydx3re3frptq7rrxxpw5hys8n53cshmob8excc07nvp6vzrzwoobmk5h18u1tslma17mjmcwolytzzshd4zh99otzgoi535sdm1y49d4cw4hrfv8ddissf2qozg6rft7l84wtpif9i5o96qubd2uu65cvtrs',
                flowComponent: '1n6fi4dyvwakqpitphhguz4ob34vejm5mk7o9jjlkcz3pxmnpytu0s39ciwke332hpbnursnktstzqiyiu14iazb9sr55xu9r0o4yr7yvbi715smlv8386e75yu3qfeepvc19brew45xp7mv5b1dvue8qv11lkcl',
                flowInterfaceName: '38o79x9fhy9co481ccpft9p5fnsq64hstit9hnpgdukcaa6g81xfgsee8yftx2v24d3rvc60530z4dsipvmrjy9rpa2jpgmhu34bjkjr412eu0ebroqwwzm9ei4of8uovz4djwn8v0q9sc419q1edlcljv7c024q',
                flowInterfaceNamespace: '5r0d502c1vqwacefydzktozygkhfll3tawaehla34vqbcaaado4wf8ypnbxxd499o052t9p2nmih2rh54db2yhwvicpuun1vy4fwxoglxip6fv5246jvvk7a7vc9hl67icyq6gtl3mb770aohxi3l45t6myjt0jd',
                adapterType: 'vtqvepayox1dm2o5myjezha31pcmjhyg54o9rvpm6sihr7ljb25zibjwd80x',
                direction: 'fc5dykpc4tncwfdjy36a41uv0ia8dli93zf5xh83sq4inzdbmu7mf234aovi',
                transportProtocol: 't3mculjai1xng8g4uk2xfnol4grbm1lbokcb18rt2j8gsm478qubv4prn5vs',
                messageProtocol: 'z7ed4edqlihf1kafsvl43d2mfa2j9qc5hucygjrgexusk9w7ugaf2q8lgzg8',
                adapterEngineName: 'jlxna5mt78hd2ytc3osqldic7lvy16f57f32giysofsg82a2kpslh41l68uzcvql9tjhmhp9wjh9ifajtyn103xzk6hqnrkxwve5zl58ewq1gf2c7n9qgwk13unlrxdrby01sbs5834yz68p0ca4oepuu7mekipq',
                url: 'th9qtwruojdymx6jfv2zv1p7ppui3zibl0zlk4dosisw5pejk712urhk7ri3wuc9n0nclkrw1v9c2j98se9sjmi7j1mchuu0jyb84tc13g2b32oxj5xual7smitptt3db4ppk2bino25lm9sz6tz4k6qr4hil7d1g3topz7yav9ofsxmiygbz53xfwjsl34ki5bbb9tzolp9a6c2po2vexas1o7q9s68jbgheom35yu776n52djxtunmn3l6incfsojco7jelki4a6lq8lt498cxo4vqvk3ztys060owb1wm314j3oytlf3f59pvo71pi',
                username: 'b7wgmvzkzui984x8f491hf8dt98vso61muwew4zviwbrzrp2neyto0u040ra',
                remoteHost: '1n985x4zmtxml90o6oy86ym8hjnuiel4coc97u5x3bfq19o46rni02dtv6bo029qalukhrf63fv18zihg1qyorgyu0ehebgao5dkujh19o45lewsok5tmpmxztbecocbnrxcwekmda0ngfdnvew7o7jztwkbo37v',
                remotePort: 'wng2a6tqdhy2qb7qyc3y',
                directory: 'miowhw56hf4dh9mzo5n6gxqmi3key0s6ulr97ti8328orkncyhn3v8wkm7b10qzjwlar3gwrc9p3552edwlejln1a76yny2i9tkhew8sxxpfqu7iii8dm9yf7v5321k3b73pi8atv4m38qkq3lhy7a706t5gdhovfnkib4czol370zj3f6gs3isme2lr7oioqzps0fx6o2b91n135vhb443210o39h0ug5ts7ppqkgp9spqmfrktj0fnqgcw92pgwoohe9uv3gkzf2u868n1a2zen4lhx6qcpoj80cff2vurl5he9iv6ou1admx1ijc2fg842fhvem77ircep4j0346sg1frrrex16u7wwylcmk6ix407d70656mibllhkgdy9pwqmv7zf4kntptg0k6wt2k8iyv2wlgvb8b5ouzpwpu8lylmwmectzcf7tnjha18s99wrqje48ox7cfq4ncbq9jr6lemk1r77u7kpa6e4jm24c2k24r5c258i8ufq7xjt4wemlp7482ip7ir2b0wvmxubrrzfswnqv5nfk17dsghbvljghye2kcpgke3bqw04lqm3bmegz4yuyvi9qjdhmjs2fhqzt8e721zjdqp7jdq3tpn838ou2czlvmlm8ndnzj7dbpecd0n2as0718qg9tn98gc9829ya4k9az783f1rqdeo89yqe4dzswlmwjbbqh9eszk1w85xk4z0100xaletrz1bwy66103vrrbmt9tu17yf1f5nc4542kvd7u3l9wgf0tb0xctuwqq0kb8pe0fnntymqt48zznqxpcikvu895zo7l1avybapta8qbezdlow8htfbynzcl6a37fmzlvgad70o6fv9tpuoch0sgf1h22yrk2u6wqdzq41tv0dyx0l33e5kwvszhf9wv7va5nglzilyusbwtw2sv4y3p947obg1dwwb1a921lkpkuh4agq4a35h01qaof7ad1znylhj0fzc9j45fdoqd7h9xb854zflxdz1d3f2insq',
                fileSchema: 'ax8q3vdawqac9yg9ze2tlnfl9ei6ojmpbjxej1ek28wdij7heusfj4h2f7orgwocqj6nwjbo15vmbh0iutwh1gyuw92zb7agqhxsk11egxyn1levq8lt061o4lcwt7daduazbcluz80d1vmu8cp9ou59bdzgsrl3ikc8a6lpqf2031cys9qm2vn9a1j9gmnsy1ifae0fx6z0asqciyo286askw9phtwbshyknr6n3s147ibksatd0cwvlpt2ub2yoivr9oovelp8di84i01oxskt0an4lkf9epjow7s2tcdm6ic9uljhscf5ci0ppheb0bjvkpdqcnxftxh9en57dz3s9g19jsvxttfjvo0u5aqjlqywduwi5fuzpugiykzhjfdzjphnlo62g3c6m9l979ukqtd75eibtpi2cxxb0gm3dyjugcul1lwk86ir4qkq2hudsaivp6y0ma63vokjhreu83qctgd3fgjw5qfm7tnd62c0rry7hym8c1ukczl2w3cag51r0xrp7iszf75de246lzt1qvsel1pst6hb4bm84pto34acjgkaeqexupq9l3j2o2nllf7m34iaolk5qhu02ve48u9u6he4mkrde4nb3zl81ektb107b73so8hazmu03ddz2fql14plx1qm7ygs6aq3dfq6il5ty0703dsw15y1ulygixue3lru3r5yins02tjsgrjd4o63yqb4fmmly6p97ez4l3kilj3rz2junyg8sxeeiqie93tjn695qupcyi73qdfukvboxlhv10faud0haz7bf0eflmkhrjptwlr9ls8bbo2586wvvhcevsq0nw2dt9dph3g2gf68xqnwezjlbkrgxt4nc7tuu1pidqgbhriwl3spxa9jj0egmuyaxc0h13dastmsmjk3qolp7i26pw98ttebm88ytw4s4hvdpzfg58p3pu4sxc4hdsirjzadzz8rgxuco4e72sd3iq2i0n9wygszij2q4dq2xbfwzzoqv1ktuqnv67r',
                proxyHost: 'kd8f4w9vg24mq83ki7mbnghepla0n64u48o1w6ynr02dbpw474uepgjk7bok',
                proxyPort: 'e4zgnaz9c8lt7l5qwmyr',
                destination: 'hqeddnbi73qqfbn08nuwp7nxcdxuonra7p4hmohw7xeu4xo35rzejrf1utnsvawwruc6rnwcpdlgxhem4eqn1pj2dxopimq71s8bed57gs6s5hkfmakgqumj10dm1l64yqhenefvo6gypjfuex6vgv8md86541bo',
                adapterStatus: '32ag1kfvt7s6k50poy5c',
                softwareComponentName: 'juar2424lwu7w6ln2wqvj2aq5gohshs2irf7k6hzaykeruc4an9z11n41vo30u6l26obbcnn5i8zlmqxm1dizn7vuz0z1dlqrjlu9irateva4m9l96w3imsdjtdhuad2n5hymf8y43te4y4a52j63h0ff2r6bo7m',
                responsibleUserAccountName: 'ojz866cuk3232b49tqjo',
                lastChangeUserAccount: 'antrql5d7biai54i0h2v',
                lastChangedAt: '2020-07-05 22:23:23',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelUrl is too large, has a maximum length of 320');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelUsername is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c',
                tenantId: 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
                systemId: 'f25f22cd-3121-4c65-9930-f5dea13a6019',
                party: '6kuong15dt2nfrjd6uk2tq7lh35y07b0k2ldtgri6b7wx3xeuh2uoxfw8xwjg90kkplqi7rylzkr4b7kbof0fiyjahvqj6a39uix7iix9dk1ddwxa53wk1fmr4kjuhyukth4ymkzw5t9mrirmm08xe3fkmbgjrl5',
                component: 'm7kl7jlrktp4jrk05duaf9h8q8su6fu3ockfi9fpmvk46m4xbf0xhc5lvbxuv5jk3zjlr37yxw0v9ilxlqpawx91nhv44rvshkr4q9hrwo3h9a07o36rtc17iytn0z7hetbneq5ej09cou25028iny4z89gzxxhd',
                name: '3eehynyth8ttslitscqtes3hs26nkf3boga6e3etgp15miuctg1hje55maa5zlpqwlntc30c49xwohgcafre3v2racf6dm1udvf21s3nvylf9eh0ln6j9auzzxwc26xjcpxwni79hv685woi6bez1ucwtothbzdd',
                flowParty: 'qsdrirmc1qbabnfrzhj0atzqmjw4c4cxs7anbtuj3cqmuzr27qb2n9bhyeeqpyap3nwzhkf3d4joqk2vswfd23szqd3b2a5g6x8cy1y60fsb83gl633srsf6snmg8sp9xmkpkcgx5hwn3l51z9qv8qk61x0na7lq',
                flowComponent: 'vp1m2fjwvmy5m2oyodkupxbf8bcnnnnsr10lrhskgitx6hwujwxpmn31frra48qbuaip30mdcf8gtx99y7tvp5hxn0domu9evnpjrf3av2b8lizp8hyiocizptdxec6u7ymkfmopmrazwwydj4eys1qdpw62bjmq',
                flowInterfaceName: 'o8xgvnar5es0y54lw2lrf9zgi3rkf1xmbti9hlil2j4etc01gkriwdp31gz8g8x329nt937d53whaiklw77nir1m3yg1ft0orbpqwdlbq574aqm34noh6a67ra1xmhsbj10gwp68somvia0mzwrwcy6i4727id26',
                flowInterfaceNamespace: '93dsmv92nldce3tzt5by0apyvd0xc87ys7xa7tyjzccawvylcfcmfgyw018xepok5z3kq8ubrqkq2wek48brdgc38v8fic07n9agt42cjkk29g93twpsa7qrnqthgthm4fw2r503kssqdxwql7kfjgy6ostofwmy',
                adapterType: 'iphv3nfgj0auffc6370b9mbzvzuoi9hc3arxnz4vn1xk2loym1xbc5vr0bxa',
                direction: '9cnqhpwi9r0ot96dshn7k51linwryebe4cz30fl7p8yodrbas5anuapwk418',
                transportProtocol: 'n9v7w50cxcp89zwnxswcuetqxxnrrxsz23rl6evwcx54mcfgv65y9czpm22i',
                messageProtocol: '7rtcl0zjn9cxv8sfbn2ksy2vqo6h5j3ng5o99h3uqt25ia5rq1walf8isuxw',
                adapterEngineName: 'nnm67kq3nnqvo3u35ccb5p4kchvgm1wt5s82uxu7pal35f7ws1tbq5jxi5nwu376mg7a16m32exsxc75un1w9e75ngkq60c62c8hr2w496b9k0zsahe3hq205zmr50f772rgl8xsyciesa7iwcjusor7vb20r5fe',
                url: '7iafb43wo4y1qw5wje9bw8jnw8xzyvb7pfmt22a5dnf5g5asbx46lx8s7jj4zua11tul0iq822n18mhhf79n60szsw95x1o41f2x2p6jlf00w6pam8pjqmvz4jbjd2zl3j12lv4x0x0fjbmcqo7gwf91cimlos197t8dto4u5ekbyksplila2mjkk1tpn90wmyxm8tlw9tk876ikw2jmjxrz933iakyd905xkvcbqkxx0z991cigy2zly212pjhxx3k6iwuwkwykbh7xukb58735s0t5y8egxbzkk2n3a57d2mn7qyuoansnj2d3ya30',
                username: '7vdgtzncpxn5o55kpqyexlosa943aaju7y1xiy6xpkl43uhld7fng3ymohbt8',
                remoteHost: 'si6w6nz53x26iqhtku8jan9diupfbythrq3jh0z2vdjm5qr8zvzft2w6eqb2oxmmovxtg4j7jxtw7hav6ul056t14ge8h9f3m7jygpzwbasz0n3ozdkd0asvthee9sq24ils9zmbcfushh83a6hsfxjof1192smf',
                remotePort: 'htc24sv7zwwe0v08ef75',
                directory: 'clacr5mrc0umzbwn0924ed8s58twmx44hhps8qiyaxcixmqf89nq0b8jnsy9ewfrcqckz2agc062uyg75pj7e5jny89w9aqjuy416cmlkn6nf8lzxkjjivv34h2t0974h2wjrnxhblt4fupgtgrg7kvl679k2jw1rwzwv9l5j3dusx58i41olr6dbk7kvgxzehu8jdfygszdy5dozu4t511rw7a1wi0kgh3u84zdlz7wcydbehb66n728yo8udryzjygam2eckcpbvuihj1nqb3uwvwkqxzix39sqdltbzn7wseskmfj9iihflucvyuzh3u4qqbmwz2tf83n38ruh05ue33n58nrdvnr5fwc9d7enpdl7fjw2bxdz55ankidb4udwrpfhzvr76b5m4u95xprje6o32bztjo37qj2cimh84ecz016yztr3p8o88al02kxqwwl90vhk4v35md7kyma8rhv8eqv6jfkg11d4rf0jqshziq28p9hs8yxq2ln8esicy3x8d7hejqt6i9756jngdwp20bluiboo5bwcwzd39cquk779bp5lrmtl9n8ad6hn5shldxpsv8p4vv8mh0f21elxcdk35be1h8rjqo7fam9odh5yponl14eej4jyjvs7cmbq8vrm6rjvul49n1f1eewgxdbqkhxdc6xh6u7ldm1ljalkz73j4486ol3dl2jgi2gn2x1kyq08f9b7l1slg9kbdmi3xmmam69uapxnzd4giuu51m9650l1o7s1vfysqm786es3di5hl9scrl00rciugn3gdflhbdc6qhr9ciodz59i04216akqo4jlm2uj2qlirlacffa3qw1vzmpbehy837rv5uf8kp2raomw6biyh2qyurpq47khb3ctrdz0uv89waz4cw1gmejwon73wuepz7j7a0a311hd6edqy227omeh5o1v5fumv2gydh03pxmvxwc8e8tzj8rydme4bzh2xplh77mqm4t4ecxoh8x96108l60g40pd90',
                fileSchema: 'q9j94tjfqcnorpoe1wp3kyu0tqtj23wq1a1y11zf0rq4jq987rv3f6d8z0nij4r3vuk2e25blsswn6i9mgs57g3zd1arxwiewjpiul2vryd3ulrbxqxkhluwom9dqzykqcufgkgnftgqytdz092xa8hnzqvtkwa8ngx1pmk081ychuzlc2qmv0du1w5d2d8f6jwjdualk7wth9ig8bx9qukwiw301xliw8axdurhc77ib5hmwux45ulr22p7zwvfxsdp40x3vo6mqccg195c106t3ormoqj2q0glozfwlzpttnawtpo6vfeorv8x5xzh1gx8wep6h5xp39mnuz9fnbt1uk8wg2mjoaa0y28t01ccggja60vo32xqcjd1nbmspous8aym78qoyst9bd7489d4lhiv16lh5zr8h0n0ck0035szqqz0v5yxpjz64hs6ktnrzyjn598hxepwltm92g6w7rvjdy2oarsw1r4kl4nsk8sxjuc3h0wcifiivfb836k307e2dbl7vt8t9itvpjo4lp24w9t1bnr8okk7u05sh0dpts3iol5wuw1s98wgxu0o9uj8ziy38rkv8gt6j0cstl2ibwfaq4w8nngl9l7rk2wjinpcdijq7hu3c94jtw7pb9iitimkawvtdmfqwm7la3txd4o1fgsaosyx3mpaor5vnou5xrrf0flo5cmz3tsbh24wvi9fnzai1t27faup6gogibnw26n10q2i1oj2ek0ho6dfwmxw6i90akns7a7r7g1me2zw86o8sioaowvmf0nm2x9j0hypw4dj8kil72kzdqwjq96va5k693ygbfvqvz7pzy23l5hnq5pifexlc5ylw5n1eixtoj2ptcp2jlm5ognqqpy1ff4p1sevk7wzu52maxiiy2l23qv91ny5xa06cyqkjftrilcv35973uzd0cmklrtcj1dyjby1dviadkr9cbvtj2sq213dnwr13v8tsaeevbwn56qo8x8vwlfupbs4einy7sh63fg',
                proxyHost: '69pb5dw1qhecsycvfabpea81s4ohd5o89d50o50heuax2rzkvbuswt1i3id9',
                proxyPort: 'izpci3889c9e2rhir5fk',
                destination: 'w8z0og6jaor3lg3q4fnn735yzuj9xe7uknwrzzdwper74qwsf1vxn1809si1g4wkgj2qzo1dub97hw5nvsrud42qx8awddcegycj5h0wd510gbvo521cslhe7kj4d8hbrwvqhschg88moop9q97rge02jvhvm8xm',
                adapterStatus: '9bjspy1aph770pyooukw',
                softwareComponentName: 'ww2owh9catuig2pb7mp6gnz5pg0dtru3hbubbaxcdksyxuui936xbp2p2oqfy1hken93qu8nn1md0molsoqq7vez2x38a7n6gfbzshx66z0pqzk20a3xdu57uh9g40d46too9wjy36xut21vmz88qr2zhtlq4p9x',
                responsibleUserAccountName: 'sdk9qz43cseii3l9aj86',
                lastChangeUserAccount: 'uh882dgu6epeqccl2c3c',
                lastChangedAt: '2020-07-06 14:48:43',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelUsername is too large, has a maximum length of 60');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelRemoteHost is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c',
                tenantId: 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
                systemId: 'f25f22cd-3121-4c65-9930-f5dea13a6019',
                party: 'db8z0571gnut0lf6a8y197qcyvmqsmmtcdy21x2fk74lgz1nuiz929jz5a46hb96ps5tw8c66wvzo5duboiakhgj9v23vtajrlsau7mi00ett2xezz7vmdsseb9mk29r8gsc6o4akdgux4h1ebgwr5txdv1o9qh8',
                component: '5h9y6tj8wo9vtapvkkm0p424nqgql8vgn26hbctjuou659k9njb9uyfkjnrm8czd7rrm3zx9ien77z47sshksgaenb0urgt1c1j9pf70aqdmjivu36inqfuy1xx6wxfajvfjh7x4k3kqgjgusjjmfp0496fre32t',
                name: 'udhezkbosf7yra1b9itgsitlk7o4o1dpzj3q2kuunlbzd05xxskysfakgg957hf9wvv5s897wfvtrxcot4ukkr88jmvewqboxtil01tvvddex4nbl7o3bddqcs4un0oeo8vlqc38vaj057pyx7v26zd5cuo3ruhn',
                flowParty: '34d22ws1jgpyg0fa5w3tk7llg1el744u6awu2ykcrnto13g8sc3z3f2cbdzuk4dptfcfwgsuyh5cqig8vty7naxs7f0vsfbs59nnf1kmmfrl90ioki0r9xaakj67x2ebb4fiozlpjx296ez0blriy0wavt0spim8',
                flowComponent: 'p0yyujw3496fsldikwveju8fle15tryfy8zqavfiukcwrzetshjwy17i29b1jz9zixnogt6qhf5apzs42r0rontl90ex550r9t57ye37r1ngpj6m0gcy926ugdtmn8qky86ycopibox1ym2noo1dukna52ibjhuw',
                flowInterfaceName: '2meerm5tfa72c80ezfgc1i8bjwhz0soag0koyqxowrzcryupu7hsuswy1mdj68kmzhhom4enbaddoxdy6uacuni9qs8yicjla6tibu7ctrs5qdi3qr7w5os9cnos3h0avlckn7gfn1kms21c8tr8u1x1y4exxow3',
                flowInterfaceNamespace: 'v98oqpw3evk6ctiz1fym3a7100zrpxfvco8w8mmfxni1hv91lz2z09mqsrdlqcbnajp9gbg73g1bohvutg6wncwq0uwlq2nti88butmxe3hv2az691jn5ri4l1lhrbhbwmcek1u63alv4479dpu5827q3f4p2f13',
                adapterType: 'opmpe4p5m4bn8svztwiqnhtzvwuwcbps3cw6ceubpdc341isr21klzpq2msp',
                direction: 'gfcjly9l26453mpdv7rv1k1kpcihpjp7dg8xa9s28ch9fbl8u49raemmnbeu',
                transportProtocol: 'uq94pdq0pe6mtym56uhnr18ozghk340s4379zyruvynit78gj0w7p5f90nz0',
                messageProtocol: 'e6to2x4p9gpjjn7xir5zc3fhk6qmnssmtv3ycfp8ky8aniuuqekcppe6pdyx',
                adapterEngineName: '58o2guqrx0sff5mygchzjdwexogyi2kdl9ay64rpusxz0j9lhzgsrf6hibgaa78yxodxjcv7vobuhwcd27r9i2fixl6w0lbq2qc4gwgto74py29488jy9iiftglz3z97znhqlfpc1qqc7vp9egrd2skz1z7dyww9',
                url: 'kttqseppuqsviuyyh3amp0pf6pt6i3we11bf5ersmjylc5tj30zkss7sgronlt8ub9al2a7ympo5avz4pytwib3r318ijlbuljzj6tvstfc50i7xhr46qpl6vycq0u6v2070vtcgkdmlm3mumu42h6lfrcx1qox1ri86xxbg1w4pi9la5lwh5dc66dgrtluerjt2bys34fudxgmrholuc61o1kwrlrw93o78w88ra8q1o8rq4b7rymz5q3fnjbobtfpiio7bybfrqn84n83uuggbgq5tvcu1a3oipyzqc7tiwvkomxx8vt7qzqsxc03c',
                username: 'eetbkkuxvevokv4a01zjua5j0by7yhijdizdtmtpmixj6lfttcs7l5yp37bp',
                remoteHost: '3qij16ihn6tj0romaowpk5w4b62ixmiqlwprbte7ciugpyemgext428ebl307jsvk7doo25zsfehlf16y7tdz8zin2ig1iolp50rz6tl3iw0xgbl2mozukwg4s2gahq1mv0hi25wt51bxlimtabyoqc4jeqbzznwp',
                remotePort: 'yqxz7q5jpw2f0sxp05wb',
                directory: '8j84iuoudqwrcx6u1pxrswz83pu2y1xcdrrk60ccf6korhklif3q238d5il5vjehuhvdru5q036anefrvcvatkeedkwihvews30er98cquyov2hddjygkccfrp4r0na7t3ypxb8id8vw45g3m9y21gjqaky7ahp5dy4k0g5uwdmpfxa7dr4orbgh82axth33p2oc1lmkx8ww7hbofy5l8o2oe80f08dw2dw6gbimod1vudbcc7wizql2mlrou0db35y2eac2bml3evrgag5u211zziy62li3cnofbsx71iyogudjvbkbe2iu7hjgdeql8vvo6k34kwgwjg1qqgqf1k6xl2xhbk5m2bjn5hrrq4fe3gjze3dq45s3yzf0hbh8fdhxmtzoxbr9sark6c7lejc1men4roc1cv0ltn9f79zuv3mid63y12i1vy38mq6nqik9u8h59zm9wg5v6xynhlrhfbtgb1hclyvzz4blof2qa1wf6zxout5y3np7h48urwey8zlsku8sc4wel0kelae3fkxpiqqlzl98ys8bglkzzf8j9ft5w7utbho1wqeucdrurkepo97oso5221qe79ieb9kumsuekth9s0dcz7k8809yfkglvd1vbe3dty9lkrk2y4hdysffp1qwp0dgcec0kpxbzlvpfpvfaaz02ndhwksnuppytuqs8t584l2kmam9cv8sm4spcip6ufk1p66cydtoqg7ecppw5pyefgtcwa0kkukahz4awldnzel3299xjflhuqxdwjxu3csf4o8zjt4kttkagckfqm27vxa21ja7g56xoycgk9fnn9h4bad07xwxoizg0h73pwjx65l3ai5x47gksaylbjbvjrpzx8fjzw837ovmdvjjkmd7stcm5ufu8g41zfv4i6s7hqzwibx847t0pklwx797nr7vwopwc876gdgqjwoy00oc4rxezadpxqlxg0pr60egwsl8frlzzjsne196bx6efpyqvh9nddwy046zx5z10gz',
                fileSchema: 'wco43p4b224lx50c1cwcri8ksiva73h7lmaientv56ktubehgudwptnjqr2qvsqlrbvmastjts7adlz7nei6e10jk53a8guszx8xa5r2fxjqwtnzu6pv7spghypaetdzstavdjwpe5hppqpr2wz99as1w8u9ba5b5vaarjuqyuilwps645xadqx99mgyzvlvpuwbjxicclxlxasqgy30ffttuzrifl5cu3lgav8a0wwwymxcs08bdpepuyo23umminbrldpwe078lo2421j309mbmr91ontkmgiyle7wc9bzfvn8d9dpl4jps17ynipfbdbrxpawknjp5finwzapzhyww65g46s7q9oa5nn6wntf7xk2nsftzklej4g73neqbkxxlqqkc3dpuhgmfr87qkd3on2q3rjwulrxo21gr8mxvdrlw9ui8af7ejyn49hlsyf1p7nx140qi8s4g0f1fkxv76v6b3t1hy36jmaqi0dfl1waqzmn2o2iiz72bqerlmk1nk7048774qjle8qdcabs892c7dyzzx0v7qw23e7piklx4pkbu59am962ipeolgpkpai16k4cry8ithfexpjf43pyxsr7aqecxpid2dh9djito4za0da9vf1p782s51vsohjgpube8g090b2yamk8u7jqccf0czfktwoe1t953d7v437fwljhdrap4lolp3q7b216t14xhokq14mnj5tp0a9k3n8y05roe6kdw9ulvs5ecjyygtul1paqvwptat7gzob3qzejbr896icby98jvy620ik0oaz08jbixn65eqmrauzoleihdxntdjeyrt5cmevaicztcorillwkkhcmk4sxgj35jnahi2jqhnigchz4olrhaxl6qpee1rx8xkszs5ds62xwe2wu3u4gkbdab5jg4zybj948exsyea7vanyabqtdw7ly6kvnv81orxi5i6o39ewotl1bhqwrdgns9sv25daj7qtyrexay60d4nfpge2q5drnyd95y07',
                proxyHost: '9tca4pj6qz7ux83l5novq2ez9e9mn537fvqg4yz1im4uecevezxvfpv8kbwb',
                proxyPort: '0foh2bpqhzkcjhnvfq7x',
                destination: 'exfl8axpawht194z923rxuevf8nvsd1cn6hmyngj6c462tskzwq8p1my7zf0u8m86vaa5jhwvcm9tl21974lgyqwxwksb1niojsr4fc5zibzik853yz2a5ldz15dgrduw7k373ba9906xx2bc4ighdqlknwo3gmc',
                adapterStatus: 'edwq60u2wwf0clz7zwf3',
                softwareComponentName: '9aavsp1ue3x4nnjl3htuf16n5694y4co5thva5lsjoc2541aj31ua5ta2dihncxy8pamf4h57ls3p5utvg4a42kqdj0uzjpts1m3sh87oxqvxhpnij3oe5ab43reca6gu3gwdk5f8lzes6tck5p42vcuenbkfwjd',
                responsibleUserAccountName: '36l1h9upw1bkl5leemxw',
                lastChangeUserAccount: 't9ydorlgpv95v4oy83kv',
                lastChangedAt: '2020-07-06 02:21:42',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelRemoteHost is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelRemotePort is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c',
                tenantId: 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
                systemId: 'f25f22cd-3121-4c65-9930-f5dea13a6019',
                party: 'dh92nuqpugjckvzzxrgdpmenmig3jcw2mt2n9ejhy5ily7mmxm6ef8rxkr3kwvcktq8lvd5rhvw5159ya3drl14hjywtizbt2x56hgrdq3sqpi5w9cfsq9adge1mshjxyznl2yyq4201e51uq7hni8st9uptezea',
                component: 'azurdmrkgb6sswymvqmb6ghng00nfyzcc8141f0ybzjfo4129hogeg37rv94hryoaa1p7vzgajfglyrls52dyzz8wn2tsr09jaddypefhjiumscgnjhmaiu7ggobg212vtujss7nf9ba42jgkxvrah2kkvyjnaw6',
                name: 'et3k1jl19nqiqeton6gsfgm76hvgg9z1zd2wpu56iq04hnnfoa7vg41jmw3j98x78c43mjgui8jtowozzbqm2jgpdrtgwl81eyc3q05b9xnx0xut5nwz4vcwsjdvy0txueaoe2e6vazeg9z9evjei0d8f8tahu3q',
                flowParty: 'vkdixp5gseugjtnrsmh8jahr3dmuckd33zp28f4p0pdftje0isg5njutmtdekyoylnl5w9pcac8nthmgolod0ya4olxjitdiy2h5sr27sv7r9p51ga3gwglbribg5m0jln1mcrxpcm8thfkpb05zlcbo2ts2xvft',
                flowComponent: 'fs7v7acai2wsji9dvgx2twu4ibl16qd880e2i1i3savar545cw82793ffp8eylcruucm6h4argef1zx96lnwkmzt4h72t507qwnuo755qyao4oc3kgahpps0x2jxabxnt3dxr5sw9jzil56g0eni9v2xj4rkrx7w',
                flowInterfaceName: 'alu2jvw7xgtfr3fgjkzac4ov78m3dyn9xzme4kwodc1775izwk8vc0c7cfahicghqf8a7gljcoywpi0sjgkwug3mh1qrr4dnkyp2zbg1s7hebt12ew6lrref6qnfzyp1cp9tfmqfmlwtlm8ih8qt0t92csw22paz',
                flowInterfaceNamespace: 'isw387a2bh8r3ptt05duqwn6r1wv0vlrwoiyppzfz1u8fg06c255nc8lfxipy1ujw1ril9pnrrhvnne823lvnc1lvsjqu7wr9un408d1frwgmbvingeiod4c8zzhyiiwufo2fq20lqhtcdwsvo7vcq0ga1f7jbnw',
                adapterType: 'qh3e2ipdgc36g8l67k2k8w65m234san61qbzzyyiacqy7a2sxxgpbst72jgt',
                direction: 'jrtw1t5p6zxpuz4ubq3fye4d9x71jaw78eadtsm7jnii1n3zbzhyv18e9sby',
                transportProtocol: 'swhtm4abzjfl9e2f5h48y8jr1wjc35aar0kverzv36vfrl9qibuzjd7ckpcs',
                messageProtocol: 'oi8u27v4rm3uubdf3fauzykf4b703p3mlv609fizrimpjl0xtp0y1luigux0',
                adapterEngineName: 'ln86yfl6o6r3hh0195puehyvks7utbkabfniyh2knqt0wfp5dlawxo53qkvvjfd6bu1l2y53yudswdbrj9ouu8ov71m2fb2i52kyoj6x4b0etfsfrdg1gaqyg8nm3rmurii1afa4znk7bzt2642cj9vfrrwkruc9',
                url: 'hnbf44qhxjto0pna1cob7cmgpf1iacwk6fjqru0ptvmwtrqadi7vs1zinsi5wjz5jonwpyrdkl7galqmrwvrf0gzz7ewrocqateqe1xdg8o3lm00s33zdapdm95szvvpz0geceqfh0k40k9kcy7fpk25s6mit060zeth99hysj6q8cnx1wp9t5gnyw27zil9fod8ccgz4jcqnzn2njz8nf1yp3d8cvnbq3tijbd6qacftepbvioz5rl5hzdoicgl6c3pzhc5wzmylx08gsi1xxtj8720ewu4se5ljvia2w6qcuor1sz0mwj8rjj8j6zc',
                username: '9573h9955zjm3mh5ws3k57ro3wo1dv2e9zmglrzpc02km4udj5v23ld6gpad',
                remoteHost: 'v136vuq5iglnt3j5a5r5nma5zsmz6knquah3ieji5sjm55yktu83ugtf1quq9p0g8fv769ppzccc3trvifkho7rqb1qbbcuzovz53vj8h0ulprw057uxtg3ohusd8udv8nmhqz072zrxufen5h78u2nqvou5dhrx',
                remotePort: 'hjund2la3c0guv870h4ek',
                directory: 'n64e3ot9v8pvh9cm5r2sb8oss4wue95oe2uy892q1zvy0rqyh99705ta30eowssdjv3aahtabgupn93ly4yy29d8saovle9ou0s5clxvb8jfc21n566iz3nxh5t4l68ttx7ewarw9xoyroxfpv7t4p7pn9aeg2h9tuohmzt8j6gclq8ahr7aq15cklrez74rvho9m8820rqj9dwmp6wgxvu43t8j0ibun0kj6j8zff93w5agk6oaskaayj4zr84accijsuqvy4w80scvlk5lr03129886fr9jtdfgpe4nuv45v1cz63ktgsva8e06fwdok8o3s6omshsbhxagi9xaikfnl295gjlwjjvdkn3ev1ohjwusmmcylicl2fazs6i55gxa0xfv1r64jm6x0oehzni351en5epqj9tg4z42gh8b5oxhdz1cunyj7gzzjh979xwylg4krsfvf1ssizmgqh94flykux4gqem0a65httntoem2k5x8es4t4lfz05toj4g8bj4e92nlh7k9ljs4b3y9oa5iem59825a4k9rytam5j21xemeepyrpi0rlil4qu77adltsbnvjqoo04jiohk484bj0ev7dpo1m2kcv2bxbcb7axdvmiubjr4cd5n6o7eijwr7vcejoqe62wbvor6ayjmim9v0wikumv2itjv10el5l2hh1eo2ay1qj6ogw26yfro6wmoq3fyzs9d3prd62f00a809uke4orwbg9t61u8666xcr8diyca9604fmdvmcc6y3gkmsgu80qs3r7sk1e6p800eankdw0v1tpul1yqpz0dcpyattvpy5yhv2g4a7dkvuugsm836gd78ch0092gnykjqlqjqd17is8jvyofvstbw0kgi8kyqkd4fp9w6jtd08qhs834afqkv8y1a5dx28xdbtjrdcatwcl13g49gwsfzvwwgkhdwzlmupa1fme301c6azz773d6k0g2pqz37jzqp2nxo1wzmrd5d469nbiie2wckxgahes',
                fileSchema: '2ohegsqdxxp7waq0gh9h7rp2l6dpkwts6e928ku1s6y3uwd15q6f3qcrg9irzvy6l67b1hphvo3t2mhtbvn8cdwlw019u1s90wjcc3skcfqwdwe35xrojylbte5bws3f6vdo57jor0cg7vp94xfxxa8l8jbmji0t2ht646zkvwirfjofx1d5tlbs172ii92ybhlqdivbp1p3h710al292i1899avpd8xom7cb30hgbv1578385duhx5ugpnn413tcg8n00mk2e93em5g00qozei80r7ky4t8qiicyjmzp91ad0jkknw09orxoq9mirmekqz84zh30by98i4o4ulch2z9h80qqd62i9ywqwlcfmnf9wrhv2cbmpv1wrtqm85u26bworpu0ne33oiob4eso0lmhruhm41skapglq90mtnevtdjxs3n4tjcsgfsn8p4aanszxyzzpvbeb4s7ddlrfwdvbhelvxzrjf29fjzpus5kq0qo1thsxlozo5z1v10fj1jrslyh9svgd533hwdcoi8l5ugibaat9hzi1ec6c3ms6fauiyj208h8bf9wexwmer5itatvroghan7xuo316vh86hs7im2tfuq3j5l2d6aybtsvnlo32co4gejvzvsqtx17tmagsxvbu7v0ubpzoj622tw1nvvhvoklt0ygj51t1zkjfb33jj6w2xuuwm4ac8xpu2c2ps2hwhm5idi5yc43m3u5rb1p18c7ipyfc52kw66p0l1lqbcb1pvubr1ifhjt7djqkpmmdfi9r3xo00w8d7a3mo8kwn7r2wqfukcvh74qg4c4gkntlywillxw6wexhrav7scxosqzzn7fuc8stxpkcyrniqn03pksnsd3prdz6mob89rhsgh1wjlivbdb2dwza7ylw8vnsmsl4xpbrkqck2c7r12gahhib0y2tfjqs5m1q0bjkwm19hb1d89e7s6epx5jaxjsp0i8oato8smxcowqe0o7owdiknnr55jineyxuuotc5m5rw',
                proxyHost: 'ipmar7i2lp12xljo8qse3yyarxuoi5jn2tq4m2umxwot1vjwuj2v3mzya9z7',
                proxyPort: 'i20xcxa21f6wt3pwnpdq',
                destination: 'mh24wo152ux1licy5txqbrgb4uo87w628n3mrnfihewd0un53qxflexxq1piuj1hniip7tlw3ueix8b3d6m43gdgjeh0qmxph9sszpvi3n5r8kfgpzyw8qfzelgabv8y0w4v2qiamur8smo9b9mcymu55f04iqy5',
                adapterStatus: 'af6dywztrhyyeg3w1z5k',
                softwareComponentName: 'qa0py65cuq9iiveyjpe1neyt87ltctrcws9l1w98qbveuxhzspi7f62d4q0ld5rhtc1kjapg37k0504fm4czfokqx1ygeo7axvft5abusw1tojq9z8h3lgowgr1w7cesr7xkt0qw98jvjxqnx7czzu7p1qs44834',
                responsibleUserAccountName: '9nd7nmlh40kumlqf4t4d',
                lastChangeUserAccount: 'av3zzis0cnr1fpfdcezm',
                lastChangedAt: '2020-07-06 20:14:45',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelRemotePort is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDirectory is too large, has a maximum length of 1023`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c',
                tenantId: 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
                systemId: 'f25f22cd-3121-4c65-9930-f5dea13a6019',
                party: '4lsj9r65kb9php9b33h0fey2rezcwz7pz91t3drqx7jklyb5p91pj217rbh26qt4wm3oxvbq4figx1ww1twnosldt3ydig4tacbdvuli4s65bphi7bs6hgagtxb1f2n63zr7fc6t03nyw6zp3jrln0r7jiymrbmj',
                component: '0xpdm8yk1z6rtze38saogio45ti835raj54mp6v8wqa00weh6lp8q9fwklqmcgkx1dji5uc60fhyr679ccgvcl6gfqr772c5xm5tlaeo4mqgpgad5jtjnlnzxd9dluaw8hzrxsu40r9ng51f2d7hfoa0j0htxuby',
                name: 'tt176akqujb8rrv50khnreldkqshxigcgouuj5wh7lhgb1hyr4oenek5zdvfiyu3fksn44n2vnitn4bbr0266vkrsezeu1hzmzfc3o08rzj173o46qfeqz3vns0x1afyr1al9imvm7eyfnjqve1fflkzly3c0pgr',
                flowParty: 'tr7wdb3iduvenwnpsln7qieopoky9toyoycr9sjqnwiahd74rqg2k1qxs3yuoz89irw87u58jfof4yf9vs5rlnbdpnlytxmg9ct3qhwn8lgk6rorp1gsouqer14hd8kco7o47n8j0tkezmv1vk4pro24qi70pyku',
                flowComponent: '56xruk9xt5wfgrk8ci58gj1om4sy04eiks5prmpgzvsw3k8ynw2er2gxbda03q11yzi6j5sre4mtfmuvdd6nf7lxh7eulxyx36jubsxihakhi4bz5guk9aq11l4a8a2c24hymh4r676c8yoyl2dx9z09kpxfehiy',
                flowInterfaceName: 'kookk3fsakkxee7c42d1vu5gy728gyol20vnobcno02q9hdchaqvid8ytr2ai27y15orsi4f2mhyl0sir5y4ript2agan9hbqscqyx97vbtipl60fzrtr9gr9aybryn9kokuafwbttktvs771kp3e0ctu7x9xnde',
                flowInterfaceNamespace: 'b392xjr6atw0uxrri4re8ermhg6mwf80ogzt2j0r84jzjmldn0ola5d4s02r84vxtm8rcv6nz5j4lkz9nmilvglh46qd73hfx6v82badg1x7gc8r901h5q341vqjheqdlocwqldpgrfz8enkelurrd791fevz7c5',
                adapterType: '0lyyxrn0a7o1enw9dr6ai9zzxyajgb5ehskzfdcvdq3p13mso6tjckhyfsfh',
                direction: 'sgs13wgvo3pl9q937fc7jbaanso44ltv55p9r1ho60ndki9ziw2cv7ed95kk',
                transportProtocol: '7neauu86al5wwwdz7toniv1vdf2o2dbsnyznspzo618o7jswxssbfvijc7vr',
                messageProtocol: 'cdl7iz4l2bssdywr4b2mv1tbtgvtiz1ppy2flotyt9oyypy4e09g3cdukos5',
                adapterEngineName: 'pwiz2xlu8jpchrh6u7ojnj4qt37n721czyk05qb299vhj4uef32wzqdhvanoim0tpzsezq2em5irwacn3nu79kkuy98k98yrom6c3guensrxs4xjk6lntu1h76i2r7iet59bz3c44366dsqedot5fejn4t92fvk9',
                url: '9y32wrkmsgkwn1rj8mlt5798cua5v3pkz57znv138rs96r6hgui0oly8faeudtt7vdek5ir6pvzxl5g6h0azhuteejqakkqwjnc1ywkdxpy9v6lim7i7t60xkfuhb39uyqh88yi082r2078wruvk99aoli8egsaxpyj18p59hgfa89id70c9uhy2x5an18mr2u48tadfsu96r55ya1db59oknjh6ipxznu0m1vfvc2lk8c3q6gezjxu7wc8wjb1uwj0uum10op4pzrj0uli1kh3vf504z3ofa6fe2f5rtp2gh01ayfhx4kbotqvy67mj',
                username: '380vndxk4obeyjil7gjyf0f0osryl1pojv3ffkasudkyijiz8o70qewe9nm5',
                remoteHost: 'kxr0ye7w37lawo3gfd12y6yrv96tpqsukqdx4qd8hng29a43q4yczt08rrd14hc41sxkiycjipqgrvfdsl8pdgihjnaofb17s5zi3ce0jgzuy3ugfehhu0opxwwikgkn2uhvl1980ghcta67no4pwq476e6agk5j',
                remotePort: 'lta572r2wsc0g0flhjz5',
                directory: 'y1kbkmumz1lkcojqvxgao86ogw1v4fdt5t14qj1c9p2ycq46p0yg35bpyislxr9ha0oz8lutwwhrr7zhpvomielzykpswgat25x8p8cp9kpf282mwrbcsqxd42brho0k2lobcq0g4l5zo0848w1lt5lsq5tszvofwyr39i97r1qc0whr3baupy1k1zvod7zzjgbrz76piej2g2edyw1uopzhuee6omcyusl3secyuhs76ozgmy4kxam8pzgemi7i4tcacsgfma68caw44epp7byykovxfytt24dfkxapbruizshj25ohycbg5wca04pbp28n6xlfolxi8yln7iuw0dl51bqb01lr57qvx2xxhvqmyo1fr7k0w9voa1qvrnvhpkp3xghgloo618x7tlfme582y78ixirxk2briibl9jvr19vioab7bp48lrich88qz4p3zx1paqrdjz4a79tlhpau2pq3d9lnebf9lve0ye896bf3tv98fjnbzvj6dqanb5bs5hv2x06mju5yakdpm0w3di53cp8pku7lv17djkxz3j71dwbh5i7dw83pvsgmpzw37hshsb5g92pm56z667b7nvclwe8s7bftr50ydwm5nalu00mrk36rnpwdn9322mgydoqjl5z7xu717uzbub0xxv90l9q39xxu3jusi7z463wxbkm4zb46jddys8nnfs3y5n5oddrp0l5w2o4smhztsxadq5b0v96wysctyeys10o0kb4oqddjc7kzsy1ocvzcp3uk9t2jzdahqgos75q0axuc2z09wfse8dct15akkg077lr5hib99burf3nepnpwahzsr3wqv8yrk0kfacxy0fshobn8go2n05c6w80pziqp542vviipf76z1tecc366unknhcqmr446307gr4t3ay9k46vvg4dakkcmf8hd4lzsgzpi0ci6dh1qkv4ipuxcru39a0frcw3255p11a47xltbdi37090lyvapxfdl8rvodvb06lnr7cjhhbsu',
                fileSchema: '9t3zhvbwdro1d00aa7w13licz5jpyfv1fpv68x1nyhcd6pqtcpbyj9ad2qmu5cyyibek2zdjvnveql9kx8o0lrr8vdblvey26cj9a416t8uti5awsebp1spwd240vpedtf63vysfq650u7mun1xkht7nb9poleyhz3sfc1jaa16othofa8a7gmbxzhmsoadgeizyyl3utqnlcowql84qnq3v1x1bvkc6x4wk0tinimuhdaqekgj9851qtpn47b9e66stwy7joz3ch9s3no5b5etnp4zg8pqwdc0da64fybv0cr22i0vay77cv04s158a0cswkyvqztf17wqqdxmv7iuw0s8vayxmugsgsdw03l5uqcxc25b8uobo2d0c4bbcpciu22rjsfemahiu35ymzxp1rzitza6olzhzvkg7vvhldxqdte8ba3ueik8zp6vlbz0842xhfqd2vzt03z7ilhlt0fxoqvz4v5bjjalkzg4p09diliw5bm83un9kdss2yqvwb8b2ul63fmw5b9ctpvcn0bfyl5rnfcnjmpfefofcct42o6xm7cpxn2clljxak9gs40k3neihawlyq8um3yhyc3mk0231ayuewoqu93x7aer213l6vxyg6bndym413gs0ivjahbpk36g630s7x1dyhmngtdicc0tmudoo29whke23tf6quo8qnt08uv0hqc4nza8csyypvfy23rgkmygen7yzi57c57rqfg1nbvg6thf47ase8rethrx5xwq61tpyff7okrvcumuoygksvx3yo5bv03b1bqrs8zzrgqq4hvn68yo329iq825n1cvk5htqbgta0v6xwq6mfwre225raxczu2hikmc1rt45fu22df64yzqogc8v08hbx57jagkxh0qr5l1wokhoy8bokoc0kr48cwrwvj3j5ah0trshn8kz3ajrk74thb6w23ozd0v7s43wg4bcc1sbqw692qr53w4i82uxr6hv2eb68clxw8o42sne4gat5ekpeic',
                proxyHost: 'u74himqiu12b0y9f926egnqtjnaydlofhatz4q7rpzer88cebbuwfz1jz29g',
                proxyPort: 'pz7nzlz3iqp93m42jmsd',
                destination: '8ss7q7cq1hk5c6hzhj4z2cewm0xt38kud7d6fglbf2uq5z1hl41qzty73pgrdcqewjhz5q7jhzv17xxn88m6cmyrmh95bze972rd4oie03f0xcotmbiohdi6l0qflsvx7z2i3k4uh3wapyldf8d7xsb8l6oe6o4b',
                adapterStatus: 'im8tgxa7mz81dgdpf7oq',
                softwareComponentName: 'zkmsxbv1zkg7rn4ps6fjnljnv0ff83bwhbvqkbe0hemv7cny4kimkagpe837qtqabpm18fhqtv8tzhdqbwvc6ad52msezkmd2wwbpbdka9j028hjz0cm77ynf3cendqfw0k4z0fn3pb178mv3ox1ueci4s4xmuel',
                responsibleUserAccountName: 'a7sjg6rj6qwu1au8efpq',
                lastChangeUserAccount: '3hlxt1gzpp6ilh20bgxj',
                lastChangedAt: '2020-07-06 17:02:29',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirectory is too large, has a maximum length of 1023');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFileSchema is too large, has a maximum length of 1023`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c',
                tenantId: 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
                systemId: 'f25f22cd-3121-4c65-9930-f5dea13a6019',
                party: 'b3jj9emqo078xpyb6lapd3ge64txphlnvvmjecsskisdoh1egdgml8l5ahdaky9n7ruzzk31p7p0vcf1zomw6ji0ti6gh2hmr7mra3va7q199ar49cfpaafyj7ob4k1xxhq5ny0jiufl19uy5t648yw3e3bla8y2',
                component: '69fek6ctf6ct8a756t5omwkvwm6484e1ogibuzjdyzz0w0ovph47dqryol7fpd3pq0pdky79nv237w6f4nydpm2f8d6gm57gqk62qt4nc67beowwphrrqh7iuzifnlvs2j0ucq6znhdrala63tpmeeymuz25h04z',
                name: '98pbcigex0osvkwyihqxgx7cc8qo354cx42d4lar2ui6130nxv09mtsz61vefcv5bvunpzvxwoxsifbaacjyd3dm97gjvo9p6cxvycyunsu19plojcyevbfxqin9cvyt8g0cnxnfb13uatcahbkc9cn68ofbpoqd',
                flowParty: '236bzijujwxkeuc2rjgiqvas2vr9f27mv2sef8375425ms4fx71qvl6nio1rvus25izajyq59zttrg4ao9wmcjnk41npfghuboohrp7awdaat3xpc6usce06dep02k5jfydwaqut7cqn4cq3abh6ff7wbjuibjyh',
                flowComponent: 'satcu0wz7dd4sdc92hzxhfbxed62tz2v8p4l9075lh5pb58gwtlhs6c2cm2v83fgfyyjtqt63qjjh6qenvl14vdkdpa9u71r7fnfexkd0wf6959mqo4qll0u1zg5jwluess279twn3t071my66z2eks834rnpuij',
                flowInterfaceName: 'wzs8l1xc4v36y0bhikwtaes4ixr4yfu59loujpe4bia28h2qn6wzfnxe5aoeon3muobet8b5o7odh33dmurlm4tgq33k4y8pjfs0d2a27xh9coxkbqigo6bwpivl0v01scakwu946oeawqwmmqekry3fudvfqu0d',
                flowInterfaceNamespace: 'a732pangue67cbnxe8f5uxvna9tgkkadf1l39q8uss22xfdze0b7om9w8xe34e15e15qlnrqz62r5tfh4esgy8pfq05nxi3azx7inf61azd14wyzjzq3tyf270gtygxhqp67ara2soiqrkysoko92jpze0u0b6yt',
                adapterType: '7evvcdb5n6wxiny57rogrfmsmr17ricc9uwzw782ziwajldvh166suqnawo5',
                direction: 'e2jv9ges5xs7snn4ryj3kyowjhndx3915vl14bo2703l0sy5cbcddg62yp4r',
                transportProtocol: 'ufhderj1c1z6frpu9732t5tm4ryuhwi8pt3j6nvqa9d6cfrvoa57yvblfrzc',
                messageProtocol: '2xnp8fysff2mk2wtxj1ro9bhz549bkag8ejrat7d2mve8sdsqlmq1wc8xkmo',
                adapterEngineName: '2np47w8o2boo692s6od7mwm9m1g7juud5iyge6uigxm6itubqnb1ik7rr9zx86zprgcdp3yv0x6227hatobwkzuh1w5ccwve83qpl108ps4le3z3zn8n9apaimrb0vn45xrcltinmfgma0negq67vlbg7knennjj',
                url: '3ia68cyig5gaw634xq3i9oi570kqgcmcgyyt3u4562dnttoxayun0klugdv41dl021xsosk1loptuypalke8w830x3tednwh42bxijbg80t2no5jvdypbdnmnlk0oy2f3um6rm253znyw75fhe7im6584i2te68s6t2lxqcfr1llnaxvqz50f5xdu2atq1iq5n6f36n1s05plax8j2z7kskfosmua65my83b0vb0jvfc1vrg8t53n4odedsogc5tkbhuv5xzbimbv7dejb6lxrz3fnkxlisjpcawl4uaraxnvrfpl1jgfn1se7zzh04k',
                username: 'utepxx0yviawdjomk98wlnvyw492f48n4jy2l3nr2ow1s1bsv68jca8ae7m9',
                remoteHost: '5ifo2ibxffiw7belbg1ruc1gz1holbhscbvot9p6qwt6vvz4ylhdm5do57wqih1kjn0l0dv8b8nsv5hefheqrggoonwlgonsyh1d2epzndg37csbda02igz0xz3pk4cbvmoybtf7i7v85357n38uprlv6hlh75h5',
                remotePort: 'u9t12614ezzv3vpkhgt9',
                directory: 'o4nqiyyi430nvjqqqr7a1tyeeoplxfaq0yzsjt08gwhqkrtdeg7iexn46rvzvrsnslv5sv30r686elhaqlc66zfrghztfldumhjf0abc9z5hrfjpqxo6q9eb3hyum36tdlkcwpdbszbkk0p179xzqyevf0p472f2gr1mjeeub7hz8yhrnm5lwy15nx0u7l2yy8ntwbihsagz3dedt6nnal8s1z8a0lnayx5af36ezime751vzmg1j5546ibxf013nrfaugavfs3qj76nm6c7alvy1evpryli7octkn4ihnuhq7qrgix53a3zt4jchkfquxo2zoqcxj9se09lachglmun864z08vhbtl8oyqyefb56thsod43t1nh1x08l7izp258ju442n83tifwfy4uxuv6qla42f9uumuhc76yj61ca8928qhb8tz0k8c1h6yglhyss13wngmr6krlfu2x3zzjuckmhpv6ugmqdnrfmpb21al1h0kgvzu6vmek1mqdmu0q944q3id00r31r8eoe8shdb2swzfu9169r76qq0yetuukt0pqjm3bw48deiwohrtx9ohfoz3ve69hkqp00ag4ad4j47ngm9knck7t6ocnf38pc4dkn8go3i37ynlrjv90sfsgq1kt9g4ix31t5sf9tr72bjeqpqkue6fel135p3v3fhpywcz0i9izjk1rv6p2mmpl02o5vycs3iakq751w178bibt4yu82z29rn6dg43x8ogbwzzh1np040p93u2blk4ix10u0h0qvvq9vakm8ywyxu0ycqj6qgzwr5qhl7vm9cgre0o1v39rutcdv7szwblgue55giq6fhr3emjg9i6kf9gtbmit1o6hs92g4odt8hchz6rxw0n48x4mij0x0g4jghm34gigbhb87j09t1pnxdppwrrib4dexvfnikt9lx5aqok3ndbfvw6ibdpas401za6fayuf9xwlss05d8rez6e1cae0d6opruf6g1ymlp9vwabb23xsbe8',
                fileSchema: 'itg2aywpoj6fsxcr7crza6tszugdkurxm06gj7h4o6jxfbstpxdpvma8egqj0jr6ao5gfpde73w22y1s7tasi6b1dhy6rnjvnyt85jjfiqhee2cw390mwl9pmovrwsngdlehog5vd9oe94x7bj6dp5spxkeuo24sc98lz735skodpgukthcvf9v1kegzwziywmsq7s4gbk4t2y40ykcx8m75ki1k596lzjfclwjopr7ebsamjow9j01l8qbgjmmnpx1v1jmicowozy0s425lolqkpogbsq7a0pl384p5wvt0wr7ia1pafv7d2wctkupl9s2w6b2orlzcfalbirlv4cfeehjep62p9jmtx3yzfs37b5zv4bdaf7j2jmmgnf681t2vr75ydy0zua2krgxd3ftc2r9rfi361keda2csp8zbchlzcsx7weas6kr5bji1xca7m6tymvk526iwe94mj3573te9lswk73qaczqtsbyuaalq9oooetnzzbxohno2ub8gjrzub3ts1nk0x8sv9qo97yx9ckfv87d83lg0ii9b2gbw553ht1v5vt0lbp5bk16ir02uyx844132nq63zjkxkqx2b71c9yc6w6pkvk3x3s1z7ob77x0kigg1yk9ek5ynbfn5p6qry00o8ihlsjt6gjscef426ypz2j8gnbtfnqos2ezjspp2l8990g2dmfvdskwl61qgwa6qeyou5muyz8o0eta986kovsi3n504tdbk766h58n8pskgwunvhrpu6s5a0amxs63pwe7elafs4z97zx5ho4a0qaiupj7a734h0g0lw14e43uqc8i6rhd0twjd8d9wrslv2p2pxnn8gk9g6n1h2fz6ksnltswgsyledps3x5y7igqi31oj138bs0thqwzjrudl1hlu40vx99mmfzc1bl7id7jhaghzsuzcia67b4ntql6l97rvrhzcu1tkfdpxzh9kcq1cwu3tp3tw49blvti4g2daipao6fhjlylub9mvb79dtryn',
                proxyHost: 'xs2zryz0c45zf4x6e0ohlbcrbj2haawlqsde9exzhos3riwaaxa9uvnsxxtm',
                proxyPort: 'jwm62yafn941bwskulrz',
                destination: 'e8bnwwvle0z8y5tpzwgox75l1kzw7d50onql77niuy6cikfjuycdmxr47ihh2m80ewzvof6g461mo62gwt4fqrrzbasx2wkyyh5kp7su8q4k6g0hmiyorvnc0wfl8dw96z900kdx2ekvoos2q4bcb241vo59bh29',
                adapterStatus: 'g9dcrl2lm62zvghjockb',
                softwareComponentName: '45rgc0mp9a73rxwyvby79mr4z0qebihrgstg73n2293ajgprrippsmh1ty0j5rchtbh9ei9f07i5etar1gy85kkg3j71lgtjjwf0y5k4wre10906cqgt1cojzfbcz0p0196b6pflixxxdawifpyr3ylq097zpt0m',
                responsibleUserAccountName: '5xhaaifcnyyef5vtpwen',
                lastChangeUserAccount: 'csu9o0llljkef6pdnca6',
                lastChangedAt: '2020-07-05 21:18:10',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFileSchema is too large, has a maximum length of 1023');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelProxyHost is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c',
                tenantId: 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
                systemId: 'f25f22cd-3121-4c65-9930-f5dea13a6019',
                party: '97g4su0fcgpx53bb0v5935u4ci6gif64u6xleqirzn2v6ebgdlprpygulbx9r695ndxci06tyqp5hip8ch4lvfqequahyr2e2h14wyo6gm5akczpz7tq9th34ssl2e8ob5629g6mficrckurz388marbq7hqw651',
                component: 'bdrfszoc6w55m5862n1zqos48q1u478kveev0qbpuqna3iq6d9a5g8h3zzt2ge06iit88bincuro4twupw9o8349k3cueukn4pp1pn1gimkbn3nwpn2wi7wxa8aq6qytgv7awezfhslrgfjltwfgdnaon0h28qwx',
                name: 'zy0boh6ohlgvi6u2hcr8xetu55bhgz7ytkk7ytteqljnv87fs2s7e3yduekwep2jsgxfcag4bv4x22fus7gnxwtuqpo3jmhe6x66e7aai5y7q5wlht4gw9q0uf6rqoyhfiklbizhy3m7q6zq658qglf8z7fixbhf',
                flowParty: 'lruzl9ef9mdgu5wr1en8f3i6r3n2fvrfdpqsqr3zw6coyeclmvxldim9zcgg2vpw4dfz7x4kw4csej3trzdej5w1bkvw7x7rize93vflk5d8mmic09z61ty5w6jfvj66e2bi38kxd7f1uszxrgml9p43ejzcnse5',
                flowComponent: 'u91dqdkphuewi3pfo21mtqrtfh9nk5cfcd22exhm3gu59wk5by81takmrni2iovvwugx3mllkt9yxm7dk9jthtdm8j4we7tuitiv623kma4104det93wwhjjblg6i8rhxssbrpduqghpe06f1e9xtjrkl13dbaft',
                flowInterfaceName: 'frxreud1eebcqbye7khmx7gvz6w6qrieiv7hdm5upwvsyb9pr3f3wtboebvcnofx2jr57cr52x6f2xkhggz5ia5d3ajze97w9vtvkgxroc911l6igsehv7nu26ccsp23fundqc4ffons7d1v2ozrz4mez9amo2q6',
                flowInterfaceNamespace: 'mvit3e9zftkms8y2q7791em3ixeft204xe5v2bdqndouq44fft4m15s1ixyz23htfv83o79n8x7uyiuv0ckkohz5z74lmfgd5k0br4vb496fzyh7trb9l8qr3qf3c9sn8tb8nmafig4wpwqpmiyhlexbt6tppftp',
                adapterType: 'x6hh6i51wfqp0bo043pwadhafbbwpr69oc3l5tbj4airg44ifa96267uygrh',
                direction: 'lqqi6yaj5civ5ekwf6lzsito1v47yu8bcc422f11zvzmlbghnhg4yye68hkz',
                transportProtocol: '6kvvv7br4ghyux0hrigwoptloro4zaqtthcmezxjut87tjrn34j1nt0gfvon',
                messageProtocol: 'h9wnhy9my52puhxk63kikn9mocoiusd5ouj9ct3ype9kp2bxtvl19hbntrez',
                adapterEngineName: '04wsnzbid0ofiaalppbpnzaysq0fktwit5s5bwsgmswos34jjky8a1umn2tdviilyufduvn1xw8muyhbouk4jkkn5v9dr8s0nh2b29l0expe812gvezjekozqm9ki3gqv6dti5olfdltioaf3ofqja7k571ay5ll',
                url: 'vozhd4puwnrp57ayyxu84q8mtxttjht1m7kd1d0cbub5l3k9scwww0gv7jysxwr5k2vu9i2en55x0757328u6mui3mpf962q4ahs9cpatccg7gcp377jgvft2jgzaddpfcojpw15549lap21q26cz5bxndwpfbxi64knt8s0z80iimst6anmym5ibk87g0o4v0iglcomlqi1g7j12o3sy5kqa705zov7e5iapvcxcns4e4a4gvmgr7m9pkiau5fzvu8p32klutkwi4zzrguzrfphlb9v262pf91zmzv08khl50jta9oc9dxj9rlexar0',
                username: 'pdknobhck36ng2nt48z92xks4yhtfj7nmjbylhruxto903eh54wzu7zivfti',
                remoteHost: 'uangeu7tpmw8f6i7qm6ge1xt74l8dlrx6jm9fsly68da562ga6p2x2zeihlie0m5teul9zowx6wwebgybewa638hm7bcls69bo567ydkrdvlvqm8co2gt720zlavg5ilfxqhp8ikmonlo0k6dsi22b1e4xoigsg5',
                remotePort: 'xfniurv6i7itj8zx1v3z',
                directory: 'qryzuw9fr1qynm7zllzj4hsqidezz9dxomw3pcp27vokfpp12b85inarbmhu39p1lbj40l4v0am1nnhu645w3emp87zb9eqn28oanhvbjdxeac534bwl6yx4i3d384ju1yk2m0p8qpx3b6bcxdxb269tghsemb8tzkndj57wq3pis2ceq0n2lo761rw1r1elpu7ho3hexrk79hskvxq9lhiwzx733z8y9oyze96cknd2p4cy7ozvnfj7j59b66ytrvp808vykye70xfz8dhwq8fv1la1l4rh7xreroy7b7cni7z071cn57eounyh76611y2hjlny460p7l3c12i1kpa71oqzlsmoldi9mpd1gh72jlerxnxs1wyv20zkrdilgeooj0tu457kcnomtzmxzop2vcfus9lt14z80ugj2d428194kyevfxl9df9q5gsooihjwyjtqu4m42rd95mg7wqqdgg4syc7nrye9mf368w07h6m7p9snt605lpentqdw50zexjk2y4ghr1q5h56r0y6t2zoy8x3pcs5qt671awdpcc5l82vtwdl3pp81e3ygwu8cq7tkx8oyvun3di9go534yki2vom857yndy5z3jdi0gb8ztpc7ls4rc2z4d7jl3bc7apkw3je4tobq4ufxnhcqfqvl3rt9bemo8gmnxg9ler7zd64r70al57ak3ysc7pmsvduspmcxb97x1fhvvpdmg6bbw50i2sw1jk696qlpof4z1deskyf24vd21y61r4yrdzjfx2vb5wbu0tb1pz7cz8gzfz3t3564e84jvqfn29qmb8dmeylbhfheqz985mnpsalg0whgv53wrathc5zj2er18jr3irabjgxofxoogh8tqcxvyrymeyc6apwmaykyd7ugyzh1cbe0xleoc5wvcb3opjt4uczi070rt60ddhda9va86vhudsw791gin8h9rhgq7uom030sf3e8hcmhslaf2a5yv1p2y0jm2x5gqf8kvj3dmbla8qj7t',
                fileSchema: 'jjj86r1bolblnxu51pgjpwdmmgny92irxc2ce6dvuulmey4yaj54hn34myoepbfw810s63xz0xgonaox1ggr61jkjdwh6dzg4s4iy2whiiapu2fqb9kb1i4uaxacamzts7foihultovdhhwzpx1ll3nmxkawc1fzf895iq1nx1b7y67k501x9ygjtq2o9g10lwdnflny7h8bri8s96u67oy3okdwxuztqhja5dwcp5e4nn6ozhans9z0s8khqceda3b2vbswu8nir5fnjzw2rjaol5xfbshndz7f8eebzh8jdg5huv7qvut50jaklze2x8of8pflk855iyrv9wb9jlzdoml8e68rsvxbba2j4hv2s10u6e5twuv2l5j5ne4gqvkv98bwfh3pqvdob1969lop4yy6paix6sv4hf2zfs5cz7fol9920trgqaegqw9bbhe33bu5f5jhde2v6e2k11l91lv4wmp1ec0e6f3hcxqqjaky6r8yap36fwsrxd3imalckxmirbxkbgr91q0a2pzx54w0vj3nbc1rrmoyeyljbpinzq9bho1i08xvqrq0jno3zto7hmox9ukeshy8su5z7h1f4llgfyd7nrcwplq1irk71x89pumnime2c1bx0124nye94h87w3umlhmlo466ol4rg69hnve97fsj6b6523vffcve1lh34p67dbxooeup6tx2sg58qb8x4z4lkrfhhbhl9a8pe9xgb8l4chgjz2f46y1r9fvkljiobg6liz08yd6c1put33otd6yjygxenrmy76jmhs36ijnhysyx3i3qaefdfvnb8fi44vs3f37bs5zcd6sk7zkr6q1wuivuyw4a0zr6h4myr15cd7onw6njdlwnve29sacc1zoqz1v9md86uongy2ogbxp97fmlivks37sccft03iw2f863qwgq4knhvwa433ghjqq2qg1l9fhop85jhx4sg8fnkdrw2nc2qkcldozh00qon7cx6dygyuyp898zlzq9jgo',
                proxyHost: '93m3zxca8c91vo2gdk04po000u0agyo4mzabrjtbcm8r69hxcvu5ovw0gs6nh',
                proxyPort: 'rocx50s28nsoaif98knb',
                destination: 'lgak7eggoeycrkek96jk6y00i30mlqp59pwx0mmfglrk42us1dj6k5xjt2efaj94vp2izfv0rewzbnvytlhmm60xq7xbutszeotwe9dj9q72dva9hmibjd5ccr195n5qe3cv54joasrehsomq82z42ixp5cjmsi7',
                adapterStatus: 'g6uuhdabiajftry67w59',
                softwareComponentName: 'hjacps2kkv0663aj6sl4ky7oirzah3qglviiou17twqec4sc4s6379r33mtw2cdbiup8w39hlgt04q3jlycl1q57jsln3emu62btxhs4jmjntsanxpu8mhew7g3d94f2u8edb41pcrfu1kwvkxoc2j5a1gxuv05x',
                responsibleUserAccountName: 'gq48jzp469c8gcjxv513',
                lastChangeUserAccount: 'k9al17im7s27x9b7dfni',
                lastChangedAt: '2020-07-06 08:16:02',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelProxyHost is too large, has a maximum length of 60');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelProxyPort is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c',
                tenantId: 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
                systemId: 'f25f22cd-3121-4c65-9930-f5dea13a6019',
                party: 'y566ddjk9f5l3zd3i3f9qys1go250rb1ugtaudnuuwtq244h28wcqxhy5aqglhht4y3s9ovkaq0xeuivyl3e9d9wrrracdq0jkhg4ik74gmakhk11ipckwfivmribm8qd0texabz59gej6izsvyb0ewthdixfvyl',
                component: '2jujc5voy0nii6yfyefbq5g931o0btz4lh6a2wzu5n7sibgk7vs9hyz2dq7ypas03esh0qo8d0adr9lhiqvkozfaybiir31kt3c5iofl05djm000nruz6rpjmuh37ruoxj042s9ezuhtux8qa3ne3qrvk5tr22s1',
                name: 'r89islbi97tqspyxuj5b4rvcrx278ckklw5g161vhhtlb18rj5vkwtgua4x5jbpmfg1mqkjkhpgqk72z3jgzhwf8rhwhlty0rqxqfqdexqz8wj5qoxarbkz0yzi91fyj3ygxo2i0yal72bd0nds7shrm7gtl3sof',
                flowParty: 'a99s4wf7omnuq571iylw8kawcv8orssfdx57kbh5zliv3u37rs3f8bhzpujlju9jq9569wzdqu9hlxhf26b01wsy92yqsyhcwstd8ohtbjrr49uhyuchao9fm2xcqrl0vjkq5ux2clhbd390q888etzhtrkne739',
                flowComponent: 'zkm4pdo3hju4xhi9yi29f2lp4jautzr8tz5njb1sibgxcpifvooje5cts7xczz0wljhium91scikzv9tqg9oftece6vhynj6ekcq1u7sd9l6jhbzm41v7usg8l0g05fbf7h1wsiwkbj9oyu4lz36lpt8dof1doko',
                flowInterfaceName: 'vcbiso1r73k8t1ezfd89c6oll19rrk64nbwom957b5qyopr3he462izx9c9gx38ikk5x9kvcmgwhpufaspgfadzv4vwt9eduyb4g3s8degwwjx8581itl75qri58beieyo9ox1chol526zcwm85duyyhs6se5rau',
                flowInterfaceNamespace: 'u0dcegk5ttje5jy2kxkg5cx65n6o6y7pg9njg1oolf1nocv4gcyxzbvd2762t6k9tkl9ro9kj5351m3dia1irlbo0aueijvmsgaj259h5zvolsorwghf7ckqphn8qk6j0idnth1yht8q0b2u343di49tyncqscfo',
                adapterType: 'x2iqbdw8z012fd0k3p6tkmnofiwwmywy8fufmfmnx019abgzctrp5f2muc34',
                direction: 'vf4diuvv18it149n7l61azjzg4b3ac6px75nfezzq22wpv7x5efwlkl00nfn',
                transportProtocol: 'bfklpeohv5i6ydfvsm0p7h43zwbr1iygmzuaspok2jx78prj3z3m8ik4vx5o',
                messageProtocol: 'dm9wupzxf8g3c5qpw094mphl961h5u04szix2veber8cukwnxwfagcdjppmy',
                adapterEngineName: 'seubrhyhksnwkl5tvarihrm2att3n4bzocdho3agxuc03fdlsl1xkez124hz91xku919h0j2q3yylbzgk3p7bz4dk67r0mjn703gqg4mi0vd1obf7wzy1dseci0bmbvnz3bg1j0j9cdfjh2k7bspttyinjxoje72',
                url: '0nz6uturlbmv0q3dk827qj05c8tpqoq25koizkoi2f12e8ddqmufixhn1pcgf4cnkw2ypntf5yahnnxug7ewr4qb1ztakyabs146zd5fjwsbm04t32eyughz34qskz0ubyhqu4ttkqlcli6h2sygmfn3f8xm4l9rqze93t7p10kaf52wucq6w0smwg6g201xag6g0d8lahw73ox18goht1dz3p6v809wxbdnkdyw2tbxkje0ihsofd7rhalaau3fmsha5pl5ae3l1hzrio5yn39hsz5ccpcwpbnh9jyzzgvkepp8ttecelyofecs4hgw',
                username: '8cy5rmqc7wsdlv6gpxownmif0507etg6afrqzp0dhoidfn150ba36gmkk07w',
                remoteHost: 'o3gcf5rtrr9skyqe8gkmxrlhr5moyqq10mnf5ojym8mcmvzub4xk7nsn4qwet5y60qokw7hswm56rwo37a7si450jhv0hwaa9px6ka9i28k6fjhr116djlcsqlapegubomdpml3w57yziilci44k965tx2g7aa3i',
                remotePort: '8rjopsc9b72cw4un9hyl',
                directory: 'weq3ucg408cx63nyusu0h98qyg4bgmkyc074vhbkyciiccmlytseojp7j1o31xz70kjya2u49bnsnl6428eqbwtqvmq2lwqvln1n8cteiyttdt2wles957c23dlqvob66scf4fhdo7lpvojnd41k2xde93kddoobkd7lexz1m2v4h9n6oqcysbg1eehsgoecrcwetbl39wccwjgdflhewbdikqs1mcfirn5jb4mxs4mcsq3fw4ub216zcmvb5ak77xi0fy7xkxiwgk94o4weiast5c6e7ep7ct8p97xx10nsgiy269xtmfxjtsl9ukq5jof6a7zv8kspd6fng8cxej21jny6baqzbqeda3cpwdyj1cbhez7rlrqzoe3ehxcq7j123hlejlpdwccvf1efmlgwkxaez8ope1j92k7m8961br0f8d1545mcawplof85s5bomfwwi3l1xsoxsch507x7e54ndu7cq1ig97ktip2vkty7rec26s755rl39dkfatp71hzbbh8g6fr6a12gwjrx55n2bo5scksq81o7o8d34glu00vdpc6n4oj1h4iv8oi7a6hgj5lkhgndc8vp93iph8m6dmvrkltjjdf3nsvlw45dfo3d8djqs7xxd5oyrpct5oegl8f5qktb3ub71fp4bon7tb6ds7moay7yvb8aqfrwa1yk0m3ivgrgk5ebxl9zwi2f8u9ndufz1qrhxcpbgvu44yemnwe2ng7bw97uix6wd1r02d6wluw28bmz8ujg5cbvw211d4g7is29i03pgry0e02kjcxacsviyoc46dzcq57cfmdu0925d8un6gnuwllcgdt0s25ilh3ppc9ietc82y2bic69rgi2c1qv547bh6ej27mkqcss282e1zfo84an9bumvfv0vfzewwkj5k1tfc70w8yqykqht2ncdz2vr7rbpd910c0eg0u7w864xrf38nxxik3ngjosunfv8a8keimw0nnkii1fu5zpf72qxvtr7te4u4vwrvp',
                fileSchema: '7t9vdac80qc752x03959sqap1wa7k1i0859dfnbwmyt3cgbxz2a0y6l3ujc4hywemw5tj7mzt49qodk4aw5fyfj5zldwd2ln02az9a5ihl5113m1t5ywvy4b4lqccvsl3wd59tqbt9iwq0h2uvxxo4ioa5fewplu43ruu4sx0834xgrt10xav7z5e0aaqoocrzfp1g945t4tczc3qa0ezx1dgw6zw89l14ek398uky68etcin7tmgssw5iqly71cez3e9za3rv140sribfsufmghm0u27iapl2fh5hlndty88e9r9zdwldslcsxbw3d56ad8uppdy98wzdn8gp2y9jeyyuow9lkwl0prcs6qjwvkar9lb4zgim9s3xe4ncgc1drvxjo3hh52xyas59qpq4cbrwhozplz6iaf2475sqx1lcoqpu4m1ozjekkqtattn0rdrayhcoi966sjopng8xyoc3z6z6bi0dmubuie02jsl94yipailyfsjgm061n0c7b5iri2r37b0p9qumuh2yvsr5vrgq3vl3lnmoljzho3n1a64oig0m82udi31dg0si0i8wgqcy9ih4gwl0xtpzdksig58jyfhikta94m34w3cyssmhmxvhc1qxqqc7b7hdkqovtv0tm6yki28mjhhbgkbok8rakl8628noonvl9lpnozl9ahp48y0uwuhhqgto1vprbiaawcwobl51xe5rq1y198foes14tzswywvbm0z4mwgp5v8ilql2r7uu298x9abhb94smha7cttpsmhm46nkjgqvip9pj0bl90hodk68qhz8pjvbnaiorab7r3tc9jr1vdlbtknbgusctxs36tg5lqngn63tb237l9wcspxk81xdyr2ymecood6p4a88au2uqmkrv2mzmtmphwqaf1q2n67mtuwgxen8b408jj9nugem8dtc3unut2y63dh9kmjzctkze4svptmub500pjj2uxz8bl4sj47ftry4d14phs5m2skcejxoa0m8o',
                proxyHost: 'oh37qsvv3mhhc037f4l3r3os1qwtmsfqfn5momzh72ylpi48tgt4isf6wxi1',
                proxyPort: 'mv8x1x1p76oeqnyfkel4y',
                destination: 'f8h4gfhwew8l2pr60fq4owjudzzxpeimjlpqbr163p33gtn74uyv0svl38yz9ej8qkwrky2pfgls74ldh4729otzrg2oni2ua4upwg7zd8fog869s8etvnw8qe82d3o40pevlsvhbfcghifgjxs2l20wkjvafrs6',
                adapterStatus: 'u0pvjxl7ulmjkn6q3du3',
                softwareComponentName: 'rtxqmu09w3odifmwm22h7poq8varsfh8rl39wflqfoctj2029q56kufhspmtgpnpc54b7airke0ppeaf7al1pfoubi698b8aafc97rzl57hkjfyvdrlik9lq7o7v0b64c74rkox62fqbydgbmazhwedcz3nqfn28',
                responsibleUserAccountName: 'r80yvs25gjosyl26x7qi',
                lastChangeUserAccount: 'xvi4bott8m7n8wbchf8f',
                lastChangedAt: '2020-07-06 04:12:24',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelProxyPort is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDestination is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c',
                tenantId: 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
                systemId: 'f25f22cd-3121-4c65-9930-f5dea13a6019',
                party: 'd6myddiwk1sdkkpdutyyj51rrt2d0mlbf4w7j79djeokmpztjb5ug8cs3pqguwf2pik8o8dm08d8v9cujcdv17rzn4gtmrkncbam87dc3zt1yvcgm4qv55p5b4brwm1kev39ojm4i8u471jmxh8knwhddgnd2k6e',
                component: 'nu92r8iwva398tnndqg2exordvxp0lvq8tkij2esr5a6ihc9g0aftojtevlshuycjj49sm4lwxfnrgskr0hxjfrti8oi2tvqhxpy82h23dhumt0i4bxz904udltf72mjwpy5eyw6x6x5nvkfl8t392kkedsgt4jh',
                name: 'es1gl7a0favmacfdutqksm3oa6sol87yukzcxly787uphzwnfvs4v0yqvwmbhhpq7ctffjhrdoc6ocgftcwgmhgif79t31sezc7wtxnlx5uoib566b1zy6hmupysfqj8yizmby8meqvnzasa51pmrrhdvtkd6lov',
                flowParty: 'gitxhu7eaaydl6bo4osdqzrlo9b8ysek8dialu85x2vfz96qgrqawo0c1p6i8iou2kfqfzx8aya2zwq7i2nc4c072j4rth4lofgq67z9i2c69p7jajpx4f2g5igmq7vkl6d6mqlzzoc80lqs8elhizbhdvz2zzxr',
                flowComponent: '098cwxclswkyms3wyq0xqqf6craz4bcbrxxly7cfhdl5imebsheosnhky6oc7pyylau8ti61vtz87dqou75crc6wfv3xiclf2r7pwc33oeu45eqzd4nsjs9lj9o8v2qvfwhatawoxyz33otbwwrv35r71lhdtpew',
                flowInterfaceName: 'b5sma19x2v5nujhhkg0unt2hwdveppkmgxs21x4yuxihie37z6b7uo1x5bj4zbgw9t2uv9qhma0ummnblte4u71o36xv9nlv072npcxe22h2ipl0utlzrijffiaoxqddt9esfksyrxg40zamoib1cksxmokjph4s',
                flowInterfaceNamespace: 'o29b6ql50miyla8hstc196vbwlvcfa6coa2az8geihq9lwrjcuf6htq9036sv9zko6piu83pmno3qyc0hzne2xearugsolig4o4lb8q6tgl31uid2ypkcesq2o456i483tba87t3je804oz7qsisd613qg04hpmm',
                adapterType: '2f85k5453osvjh25puv4hficu87wpv10b12a439m32ovhyto3knek4f89knm',
                direction: '5yl6iviwb3s13r530bwqm2mpppck2wq3l2knj5xpnayjohe83hekcvl18nno',
                transportProtocol: '75eo9rfddhbi4xdwk0dop6ca158nj3bvy023ru5gy32ywip8qh69rizydn87',
                messageProtocol: 'jy3lpy7adohrv1syadrk2jofyzxe0g43u5iylocq86cidw9ny9c9dslb78zv',
                adapterEngineName: '1p350ozpoigrwo64czzh0am7wsn7ewd4onypj8bln13bxoy4mb0nxc46ih8qcd9ztbktfw9630so2uc4e1hdfn3t61emn7ozyjgb1uge0agawtns9pke5gdzfbhyol96yo6bz0l459nbgc5u4950dkapzqm3z1ng',
                url: 'n4o57hdj9wrwjbggutt2xceh28de1c5c2y9ykc315gna968rbekknubaueha9z8nro32yw02vm2un020c9149xvs6106n2y1iqbq96s0gz14ezulx4k0zvwiuv97svmoel4lemdm7cc0voluotkjr8w4s55odw931u11jcxhaa4gt2grbxctlo7jp0a47ycb3od9s75cnp7om6cpohz7k0sx7s90zt1yebj49ne554zpof8is1hr43s0eflv69ai622drohcq48gtwkmxvurnvtpmq46xagicxyerx1e67ajfhlhe6jje2orxxr93ti1',
                username: '0cztdfueud1nqss9wi51v2bab7isywpdb4cqffy0365v67mmkroj51k1cz3t',
                remoteHost: 'v5qdjfqv8y2put819npeg86p2z3ologykj0oe0bf9pm8ac1d5gelkmjujrsdb189bn95fpy710zw9qo6mcu50ao6jk0rs42fyse5vretyk2w5q6j3ng2fc8otz4ubj2ixlsiv71ik2cuu9xfrmc4ps00hss3hitq',
                remotePort: 'zoolrpjfribagtocpuhv',
                directory: '92er0n92fl2iog6jwu0ctukbnpj6ldofebptb269zygconr9m5fnyrywlnxirk5nffx9n8191hkf09lehmfjn8lvd07ic9fl73zvk2y05jg9zf4722b5jvp270h38qvkkzjbe69igy1bmoglp5cbc4sub53w1ep6etv8fa5sfszn08b5o30ljb5jodhedvevgyvb6cttcjq47xto5auuel69208dwcl5p56zvenredar82gq1ti5plkeh079ojpfkfdehyz60cld80uefypmr939n3lhtoy56b79m1wpt0pvqw1s4k6wmvrol82zl8zmcjfnoqw9ow13e3vdqwv3wxz7v82dluenaf6rqkl244lvi1lw7su7etwyvt1lfbtbsam8m2etos1s3n2bse8e8rft82l8shoufm1ia3syw506cdshkatfunxn8r7q87glwwhf5py65pkd63wu7p799pao1a1c5nhu1ydcaeo3srcfgm3nk01fipwdrwhclvnwa0q22qlms660y7l1o4pu2j53ifune5hp8roujh6il6cqe2tqmpqmc1tlm9tcwuxr3qseh82xtg35993qvur86c1nw67s2eywny0crbu8vp8r16mb3qbn7rko6pdbret1nnu9dmo32j7gw3ctoibel92houh8hv0rbqpv92xyc1xlemlz6kt4xmidi95g4jqe3zbziqn4t06ga0terbewbbcqb7zsd3fuaezsxy246dhhouv347bzvet0qy3e89nv9s00e8jprwse182i8490thqmddjh4552u5jbgxkxfq5g3tei4fqmzw1lgk8tn1i4suy3aovcxpoxr0qo0glnfmz71dedinxwt9gsumwoojq3bwflccbq3kq413uhvgs4qj03vn0g6wmkwi8xdu9hhc9e9v24441w8ljc7z55y4vtdsxrwp3tx43s3qg4irzpaciw9feppl8nwr85mxsjn3ufq2bsfjmqm46geyd17mjkkonyg4iajy4a8xgu8bc',
                fileSchema: 'kfnfm6t2msz93qldif1ehrdf9a9jg059skgzf97a0qwz8jryjddbny5m9mtmp3kf7e7lhscl0siy1aumla587ajraixvx1uginzi0l6285eps0x70xkaqbb0sqoi9ojglrzvhw2rxaxrktnq9ox802b0oeqo9g9gwng6l1vunnb1hrclbwlf1w8dmlqfduh3tp0m19ael8do0si6osjy5kd384knh3p303cap3e0y3a0yidpo1ke4aujgf8l1mu5omnma8fftay0m0ndh9ojakcng5mkkogrrkngzzm9qni77i5tx3y62ebhb8s54uo51ydo95ko89hwp5db1s8rw7e7cpd05hsu18qz0qwfhw075rp75q7xi1q1zwvtb1p8khm2z8q8fdqz1hrgtngtq1p9qz8feps4uv0rvzh52lw3xrp3mza053wth9hint2doo2i3b35tb42ynab3zfulidml88f7ftjfik11xbwvnbgte34ptlvr4pxxxj1c3iwh9z3s9dk305w1v9qttkla77ngx3ishew1fk7qwwjo0co9f4clufrl4mxxi3za404edt012kwi9hyvh1u2vdfam1vs39uj6zbncdqq91p8w366j7sjkfwv8syld4x6gdjjs165qeidgpbtnoscbqis0ibgfj5lxvq0nbzlt55ehbzokez3zipq6xpgx33p9i1y4y1jzb4n49fimg59xl170cqrxazjqk59fhroetz74luia4ynt8fpg83a4lm4auca7ir2gq549s47mct2uyfgt8ccerjovu5gz8em4aljp63yyvw3211am6ody3rjkf4mlq98li1u7xlkub0v5a9vyxxxy6ovej9qvnym63c2kmbellzcd51bsc07pc8gt9qwlalgen680jaccx991kdrkj62ava02pl8pc8bo0ch3i3xt0ibt6d60ej0lr1rbiqcuj01e4nwu3pkcjo0k7ya118ez9tzt74j23tl8rk82lyjvk6ieteixuk8xnj3gc',
                proxyHost: 'duk3x0jcxbzf4e4pm7qxrb0phyohdhktthoabteah45w2nkushih1uezcw4u',
                proxyPort: 't3yj11vankh8cflh27jc',
                destination: 'gby7abyk58ccyr4tawe5dqhk495qdx3swa0jnm71b9ihlupqjakpx9pnvhydhvxjw6sveaf4x4k2z9sr8qn6hvu54ryqhafcpemshsr7mkcgpgx25kzvvps6ejqouj3o8c23ps9dictvc83pkpdzxjyfunuxr1ouz',
                adapterStatus: '644mridxyjvxbfl67ddh',
                softwareComponentName: 'u9at7ym3uzcpo6v05kbhia5jczznqb2m7xvaobran4pil0e0391ks0t8b4bp44g0mouxnx55akwugvaqxxxzqht0qyuzyfey1p1iltpw3j66bnndwlfqt2yfe5gvojy0l3v6z5qz5yjgkrihrpsrxics14qv75g9',
                responsibleUserAccountName: 'n8nblwhghdxism4fr0o8',
                lastChangeUserAccount: 'u16qcsz0lurm05mwwhbz',
                lastChangedAt: '2020-07-05 20:58:53',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDestination is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterStatus is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c',
                tenantId: 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
                systemId: 'f25f22cd-3121-4c65-9930-f5dea13a6019',
                party: '0mi8q7evlwlytxotd2eozkkf0jfp5ypyiuor32y9hce9njxfom8pszkrqtsn74r0lq1r9yqhrnwom81vetrkaykw3wzc0zga3aid23s1kteudkkfrakbog3lu2wxyf3q0o4g7uyy2g7r5mq9g1x4tmvh4zbspnsl',
                component: '2ir1hw7nr8bi0jezxoafz3nnubkxr9uaz0p2rzq83pzbe3jrcmd9bf4796146ibk3obto443muy45hnsdhl8x8q69msw3ouyowpipei684qodxfy8s0tffrj0qvu00xmw8eyt5anj1abdslqt74prozm871mi2xh',
                name: 'q4ui7nr68fkyfipfe5zf7ucqhmnk9dxa64qbpmj7wbv2m8iq9lyj0x4do4vdtnlim1u15xf08xikphijpm8fm79pwmo1mxcwugcm8h2byyivq5k6dpv1j1vpfda05k7kq0l2321kde4ai8avwz7fjqqm2fdespol',
                flowParty: 'ciaj76u5ttpqgtfeusd0zgcl07mbc2hupb3ys8gmo4q88t5n3520mqzse05p39epk3mls3f0nzpgpbbua2nr14vcdv37n2hascbaa24xm99knijio215pz9f8vshwmo226fncuj5nyq2dlddmz4ctgd7tdxyr8eb',
                flowComponent: 'gpkgnz9xk9f9wmhjcy609uqigpnvdo8mfm4lh6gw9du5hyn2jgo6vyc45n8rc0cfkltu59qbn3q696jga2smi4sqm52ejzv76pkvc280izwbscdcikr1g2t1k38l6vlvgsl0lnq85yf38yfbo08nd148s35gtj2u',
                flowInterfaceName: 'yt8epywj1iormfr3qzzfbj0hvabglvain8xjim5pio6snpfuyj0fgu5gi8cjj5hpzvhpmp506cqcucxeoczeoj8n5mj1ng7ei5ostk8xc3a8hq4db58t5fs0sel8waqlnnjiwwxxl7fz8meddndxw13icde0i61p',
                flowInterfaceNamespace: 'lx7czov99p1zs10xlq1lwfp11ts9bt1evoc0f03fcjf1n4vicwpno0gkvymxf58of11jlum5c0k7drnonvn96v49gnnm2o4k0gh6rjxmox2z889gcjpwj9q51g6qxyd81m06ppugpnx1kvy8f4gpe050c7wt4bnm',
                adapterType: 'zt0wcd9ry7yb29sbffflk9nryzimr6jba5oa5rhx49gpwh6hmga2m6ku0021',
                direction: 'xzquhv4zzf4eurwqzxd31tz3txlaxyd8r4mcp9gsqu3qx77w7aj8pplreqcx',
                transportProtocol: 'ubtuuzvpkxtck8fm8p7gsdf01twayfa8my25m9tfg78f3mfj4ss8flv8vov6',
                messageProtocol: '38wj8uy5gux0l341ed6b40xbx8srmzxsa96sz85mhwuwuo5emqqtq5dviruk',
                adapterEngineName: '98qaudlc61xx1hgx4ljbpbannro6zft3bl8uprs7idrhyp2hlcauzvpgdz5ku1u6deqjwuthg8duteerry5qv8pr5tr3go2jmyg1hp8x4h7e5mqq7d0wxoz32dt6y0o0x35uwavl72fal4oo572opklal9twoc8o',
                url: 'fomhv5pykxo2nkkjytt2tmllbkyfhizo0kg5ntxznwry1zqprjzdobpxq10kc18u8r29po78znc06nfxplmimt0j38r83luxe0pszuwve6hf6wbuyee8d0du2bbg0ac8qr8bd1di6g7bjioflbte8mp85oc1wn8cx5nu8u36a4khaewp6d1s5j9ptr8mkcy504ppgdkea3b9dslvh6fmblmnqaso9bn07w1ahspodzgi7umg7nsev5orol7kzu9xoyi70dso29tsitfu2bunib1kylwbyczqcwscndfgg8bp29snc6rvgsstfruqkb2g',
                username: 'kncivmoxlp2vlabefalk0atvlpsuv7xsubmvzbuizwhq0j1tq6d276nhdn4a',
                remoteHost: 'vql4zs0fr9v544k1pt5h1mukksxqwnhl3t3m0lrqbc9u9lbms6x4r2jzs8vy15n9bvio36hu071jmpia6gsnr00rfe9nj84p30f55dn055k789gi4m72ny51t7dmoqsn28wdgmxauts2g9knxm1inxjbi7ldnlyq',
                remotePort: 'si24wrv0tly40wajtwgs',
                directory: 'xyepqcx77igm22l4moebvn1dqvzgommwap0g33zbbq01w8zvrhpsmr0x1leeyewdtdhc0m9g6f46oxjltwugcoyuust4roz0qmll0p7etj5fjgh933323q0l65nuub1ucuy9hjwzhttcosxv6e9ekj7j3qt68srdkjprvhk78l2y9ott5quqcoy5qvbwvu5ykj5rngfe0z9eihk5p0nz4e00wj6c0jgwdzy7844fcq0qg1t0b7np5e82figriw3f0wub54xc6aqqku1jlvtp0bbctm0dm9jnjfyjmvck7qvx77639j8ydi0ump72lj1tlcnnleiuewavpsxjjm8ga3k63ril01v4lsuftdib9w4v8krh2lnvry4zhbqugrmp7qy2ofh1o2r3fbr0ohloy2153b230jnovpw00ik8wbvuihkagmwyg13u1tpkmv4mjtgpfgfyfs3ui2iy3l6twocdm8x7jrm3ygeto4p267icysfkuin6o55y65o7vbs41kmz9kq2137pbr9j3qiuzdk9tqw1ht3ag93x91jh16v9uy5hfj8jpwrydnl4iqoqnefvbqhtdjui54gim70ng5ph9n5q5x6jzf7bcgw9llafijuqvma37g733kgdao7jyv5pizvzo7uj82cgva9alez0c53jyau2hwdn48vfpdyy30hdwdvw8ri5undh0uz2qnp60qrgj9c539nm78b35r5wkmgxu3t8lcn8x70fdggpvyqqy4hitjtlxfi0hqpy67l0ayucahbfyg5lhdca9zbcgd1et46epauplyjydxy9tlfct4tomdaeslaislilqtp367pzpzw6v6alw1exdu7o9hjlhah88b419lrotxav971ezt7tpwyo1y96boxj0paz0c4rbrfcq3hwtb85053hzyebpk89b7n5qkcldmeukkbfh5uv1nygk51qjdhaljn0p5rx4muiiwvr1d2ng3fkq9k4qb9ne8w3v91aww9b490cemx9hfh1zvvq7o1',
                fileSchema: 'feawjn1p20odkiikyak0b6g068ewvdxqig1jdmlqgaxlk44znzeb1ac98olj15vh199aprke6oc1fwtkdrvmn321dum0ojacilw1ds8kjgyoghutc985q4qldna4kzkdo5ec2nbbt2rncgv6aku1o8kkzzxm3hl32ektew5zmr396on1vc14qnvmwffxpg868dlven09cuzvt84sy501fkttebu2uh0u2zhggoyh9kw22fm963nd1p7k6kpfwqzgck8rret9npld6ls59c7wyk90ovf03j8jzq947srpis79au1gstb6l6923e7u8geyz4zp98hwx93d0nudmqqoxilqm5pgcb8zxr7l3swepkucpap2o3oiaeq9x14zlcfnk9nrt59gkw8llcyk75mmwvh0uu0jr259iefuexvo6woq6ec96bj745h4ew8t8kfgsujaxj3jvnpnuoqw33qq8qqfjk4y53te6124miqwi4mr1bc5ebo9res2qqedvi1amawwua42l6iujch5hkv9ka35m0ly576d7g5xdzcfe7l5cs6hdkdti9c3o57aehun62ej24gv6u59vwd4myacykagdw1fcz7eyiou1j9ftlrd7amuupxtzz13kyl0yqsrzpjw2lj96yt2rgu9da9pnzwdshqcssxrkw4eey4y717xy3nkp0n1t14su7ck4y8he3hz7ow0n7qptyidr5bq3ym8ck7ddjf01o2gw54te278kt5tn6acow86ilqhnjvoy7x0z84o286xq6py2yy6wtvziufcla1h99c9wb034bh1mv50zsncg72vqvygsf0egfvjow92h1oi7drtg3l29fdjzwnwrzqx30urg6wzgijrdhke0uz70yxyc9t13ub1thwvbljyumooe1hufxmy4clddjfc624owc7g4xu854p3p91upqmoy7t5gq4iprzf40rsoodf29an7evsd8t7i9tsqk8cmodnmhodad9g6vy1lsc1pxv0hmtsu3exb3i',
                proxyHost: 'a47ojpyx541766dga0jcwoet8b55ne8vzgb0gjbrm0rodncmzqz70dagrk2l',
                proxyPort: 'c6f1ig4qka6h5aczehu4',
                destination: 'i9gxc42yko85pw8s6jfms0vqzsxn0m3joj77xi56qtnb78kgspwzfyka7w0q2vpy3g76tdvjt92tqi9jgo3vrktdko08schlqfa4kq7zkdbtz409f946px78fanbowcdvt3403aa4slpkvl6ia5tb4axbgca0ycz',
                adapterStatus: 'vdlpdk01s207u02kp7ygs',
                softwareComponentName: 'rmvded55vtxp3cggd9ehftfc9uioktbbrud60zo1lo8ccxddwj5ekjxs527u5mm71n80rhfm29fm1abkkyfctn1xwhrmbk0sh0nynffgul61m6stdzhfv7rc5mb6r9vaogkyafj0f794lzcnzyuek6ljk8mcnbu1',
                responsibleUserAccountName: '9qiqi3tzq3htur6s9z6u',
                lastChangeUserAccount: 'pjjyuadu8v9hzrxmlxuu',
                lastChangedAt: '2020-07-06 05:52:40',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterStatus is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSoftwareComponentName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c',
                tenantId: 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
                systemId: 'f25f22cd-3121-4c65-9930-f5dea13a6019',
                party: 'jdjqpaa8syd135iom4hb036ma1533fbc7n4fu6t488xejm0dqo70iu0gwclpcocxc9u9v4wk62tbsupdkeuvckai1f44rjuuxl9qny6zflci6g223y90h32cdgl2onjv926v34g1uvw9hhrzt9lul19vmznob7ob',
                component: 'bgi6vuy9y4aom44dgkoa15zs94df1visiw3zwniz0qp9sbd98y7xx3q0wd0pw6ul85eqkn8s5npmozvkdjhvh3pvv5yhem81cf1i1dx6stmdt7jdjku8ilc06yljljmjur6z4j3033ko2nozroejz9axyt22v00r',
                name: 'jbutv26dzpbcwy6danu8rr7nybv4wa0po1szg1iijrv3d04o5bj8os5b4a7960i1hc4j976lbfb0kevrslf9jwi16gba4pm8ovm7pz7yikdtng84rd2wohhqzud4ylin8n04zl4gpwo65a7kbad0y5uuzmkf2s8b',
                flowParty: 'hd2qh1bvo99mzsdyanpkcynkt5y48oiar2yxg25eda5swikvsumoaqaz4702lpfoccb01rubqq0gg1sab2aaqikznjx96oj0nnqwg0zlvnvvngfq2kyalre9bf3u5imn79qb4ubxs5am35dsam0rqdht161ew37d',
                flowComponent: '6em7ajzh0uk2j8mdg8av80db2x93ulyhj5myhbivh2t2qvafi6xylzw5ja0ea0x4kte5ga848uk5p3g87ccei7z8ctske05mmnmr08ez6iyjztox58zhqs55cnut2h5iyswz1nomvvuhudmerbm2wqfjq2uswlec',
                flowInterfaceName: '58r8tjp8mwptlcxgml629i5me4a3sdnozrqyq0idh6pmu4ua6uu40m2wgi4p9k23s3zt47a4d2lv32t3nz35d03temq8u39erei9t0lv3wnsdljqq6zb1b4az1ctep0ie8tj04rybvk5j10tz74543zgqin51989',
                flowInterfaceNamespace: '8esk9i9cbuuujuw2f5mcnki5jc5wuhabb0rvnjau9jmlo90o30bizxa9xtlwdj9eeruixwesjru2payouzfxutyph37eqhxdlznz4ftz3rlpbx6xxp4d4vimrwi6nu200xxh4nrxh9o6ww2ayljbxsxjjkp08mbr',
                adapterType: 'csxmcr4b7pfx6pc1ckea3u2qqo17k6jyu33e8apziecmqm9nozz9bjy6vi8b',
                direction: 'y6md790q96pcw6807niwjdm7lf7psede79ndwld96mrkechza2nhiqunzur0',
                transportProtocol: 'tqkx80o6s7uqj8wscs0t8gtcidpgek1xipiz4elcsu3lq4ub5opyq40gwnlx',
                messageProtocol: 'pnke71uf75dujalyff13n4ag9gvwpq6w0l5246rs1z8cach6k8us4z2ezft2',
                adapterEngineName: 'sqcpv3xw30wodmt92yb9cvmfv4alkhicce6edga90z5xkxrpn2emn38l2in0rm8oq3b2eu9e7f75wpk5qrepmpw6y3e9uh6xiue88pwkcyf706bc1y1ryi6mcowgxhi3vh9rucma5zfmwl6ddl37vibda2bb8b7o',
                url: 'ux95c0uu5v0t10367p29t6ql5kzcbhc5v5352b3f03l91gh0ii0g3e2zzqw5ly6lldzdkqpz4tslsq6ohxu5hfu2m3f3mqtln6qfa6opg6gdtz44kvnlc74yhmzzd7oafqjb4cwj8f31n9cd16bvlmylos2mq44arju6j1rocii63vmosniln49scp3mn9g27t704bnnnqcjsabaq4b1ew0cenzd6wfkxj2cjpm0u9rikbf82htrwi69iv2fa66vyx664tx2ch14c82xekjtge3od9z7bs2pwghrx0wxsa03c9xgbgnqmn31tpylp280',
                username: '7y6bk5nd1kh8qy2ca09kjwg6cuux3fliaqsmat0aa5kvlsvvv9hlq9uugza2',
                remoteHost: '3z5vc9xgul5p6y955bha1lxojnb0ttccnwr50hg3mnutfqgdyosnmlu31c02v3yv4ura7tcxto22ld22h4tevaw2k1vw99swhx5a5swname70izebr5kfhjplhb01qe0gur0cx93x3s1abw88k7i645ke53r82ly',
                remotePort: 'zkxtf8kq7mvqdn3hhntr',
                directory: 'jnn3ki8h50z12lkzzxzxzct89lycgrq05uibcwt4h7gg1wdfl79febomc3ajejc3a07pj3dijqm84wje5o5iauhepwumykcepptvy7qyoa0qmmko9bm6u2z3g1kjsc8cslhx1b9xdet4t807uifh0gzz6gf3f5p8rqbn4l6accior4q4xe2hlku4cg7bai8skp9k9pa7zvu3k3ml9axa2stg8zkmlbo6el4rvnjmu9yt6tulh7oftlwlgxcbcdto8481h36dytnb6q44p5ebahd732l8ueocg7eqhf6jusia3ip6j1b8b78dspystozdsoadkhitfy2jqqf8eqn6aisksy2mzibaf83i3zdogc5djq87vcbddx1bkd3dsrajtuendiybw2r801lm5tkucfvres61ccrv5zpgbd77e9rj77ni6lxo1pmm937nkr7cusyna0hwghgalnwt7m9fvu7aycrekqtu9mpiwmu0w9kpbr41rjxh4ah5h874l956uoxog4siwy9mso53xenvwtkjihxni5d9h6n1pvseobsi13xsgywkonxiheyiknvm62mboysvbqs6m8ftcvssd1bkby04iyb5vbe0p1dpb4uvlr65h6yirsyny9pmz5bqnsmkiv46ee8lucj4o6hu2zgummu1y4o87lteuqgp83p4zncz3ekx4wgqj8ux4ri574m8likunbqh5gl5m0xw01s7kbt99jbyvrth7j35ywnvyzbhzm76rluqn3vv7z9tdg2w37660pl7ml8ulat1y761kr8u66tlu81l1iu8hy4nilhp1k3nh0yof6wpvh2icjhl5xh5sweq6sua7mksqqioe5lqpjo7adfjz6r93i6m84gab62g6add4bsxq8dyf87rsmz9yxh060kztz6pmq3bc5uapqfoua7fwgc16x0pqjhjvxlb4i8lw3mr50mb897ulzkeyzed3zel8lh8r1fmzcd9779db7ddcfq5c860epy4rxaw7mutdc988h0',
                fileSchema: '91frzto7tku0ujidojuq28kkmb2kqyqkmjuiv83ekj72eefvq0hrqub1v4kema8d4apth4nracx07qlchvr5dtgddky8axu7h0ahk35pt6t4n7a7ag9n3rl0si8udpfm7qgtw9r1ah85040w6m19npyllc9fnmwmt1r6suidobkqscpi6cejyhi6shnu8kxubkt4b1bemosdlsmzuuohiga248dqp6atqpp8jdd8hzxch98ddy319pis6517bcjq52ggmesska6f9nugjxfuls9n5em5w1b80frftlr1wnm4qvmw0gk3c4o92ms7wczfh7lmgzunnodo0d9xmzml0s7yaqfsrnkm47bzb0zumb6ubw4trczk51snq2a8ecvteaiy6hennnco5jj08ijk6i36v5gwmhoh5arbb9v8w9p4ozbnurnysjqzsyknyik5qz3q1sw3wkyidmnpphv4maop7typk7t6polurpb9hxjii7xlwywidn7e2ekfzltqfsjgh0twmejxgb5r6z30x9tw9pjhilvqi2u3mf36fmkbsq66xopngqj3855l2iyssqyv5s7luheoirjut0sclmxjnn6hvm3j9j34167p5vc5y3jkitxfdcgj88sxtqos8o52r1zz1mcvrvnd9uvkvl1k371nzb6rxehk7tbjvihig61vv1lvaue1jzjvqx6yn7kw5qke70kn3zm0p7kiqtj4jso79xpix1qh6ru9fmw1vh8vt66ezky31297nhsrr9pl4bzwj1trtx85s24uve1dl61a7e98awhc4rbt9czrh4gdl3qjojutzuekngos1g3uvnxdjys4k3ej9tgxgyuz7r9c0xtxvuc1yh0skocb9y4qvf5weof1ss8jl2rf3q95zlf6aj26tgq5yasqux90mw5bajl2x50wcvjhl63z1ekep3ds3wk2ug2pub5d7xmglpvhvzupjzzbl08vquhi75x3w7zx5y4nipbgjdz1y4zdwyk24ooyzqo5173',
                proxyHost: 'p20639q6u8n6ykygqb6ie2zvx5w3n75kjioqwlezm9lavrmnr7w0oiircgi2',
                proxyPort: '0ddt2wv6gjedmydv592r',
                destination: 'z691hv2va9h39nrjixawj4v73dpy2ee7pfsj6jtd989subeh5dc95y4bxdswumql8gy5sec6oy01e6z5ns172p0da3aeik29is7baz393ycg7ra6v0eni3ynl9uzdlhthdbisc91jmdxmry1sxs707sq425rmipn',
                adapterStatus: 'cgd01c3ptwgbx8o6hqkk',
                softwareComponentName: '403ss95xlrb76i0rej836itm3semwqen3cbctgalxdaduczupyxok7foyaxdvdxuv1hui9hfesf6d5jvpm0sv95c8091k5i2jsycglv0os1hreow0vrueizzvi6f225n32g12nq8ejxyfypx5zg5q5wm3sgre1thj',
                responsibleUserAccountName: 'awxghy614syrrcsoede7',
                lastChangeUserAccount: 'nze1acvavnssdi8czg7c',
                lastChangedAt: '2020-07-06 19:36:00',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSoftwareComponentName is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelResponsibleUserAccountName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c',
                tenantId: 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
                systemId: 'f25f22cd-3121-4c65-9930-f5dea13a6019',
                party: 'augcq4ej00va75lcc6n13isus7n55lqt2bw112y3gshwamy8b56r1hiy62f3g0wv303pp779ip5a6d6twprhvi6bc4s5xlwcs3qv4xnbhcc446ca90sjobbe68ctorcoh97ixyoyhy94kdv7swizlnymwddpxj5e',
                component: '2vagoye3odpqjcznjlqp0n1uv5maeiqt8h6zkymes5defs1dii4kqlscir8j1st7llan35zmnonjp7t1nn0mx4lwkt7ec8812rmexwh05lssz8a700yg6k9nj3wwdb3ex6ml25vwcaz5rv6p6dynsih6ckgyot7z',
                name: 'dko1nbwpo10uu9maksqe5q96m9yhovrk09pui6zy7am9198ntt4k8o57txgk71nqldzz7vs4se4tfjz4bu9zs2v8oqryct7lptjhwgr2mtkaxk4pz9ehqw5uuxi9lvttr4wh3dtdcfnhas04gkplsnw7lpljk29p',
                flowParty: 'kq7zznlq0ukw6c3ikqorpthelch11jyoja7zl8137tgsatkdvpgn2cmqq4u0gngw17rztipfdora7kmn0suknypq8co62uvb8td12zjxp1zi2xnsafvctb8ulp3vd2uv7z3ongoaufkh8eq055jquqmz9el20ckj',
                flowComponent: 'j844pfehxx70c4ugkdvz33pgx1thfbyz0la3nf2m2zzz78bxajdayrigoyrinhbsfvbfsc9vq0hhlw6xt9kosbmm1i0q4yrmweuqjlh6czywpyf3jez8m9sz02wesdoqja1eh5crwg7umz6n3fab6x4v3mvzyjvo',
                flowInterfaceName: 'aw0yimm6pkto4wj955ausql4ssv2eqm30e6avujgwuy9da6xl97of595zccpesm0728dodddwfumtabdmg2pthknojyr5zkrvwuhcf0v8yeq67lm9nqf1rlfc0y0396v6w28w368x5wupdob3j6jpvus21higfns',
                flowInterfaceNamespace: 'ny26e9s6vf9kqm3hgcu4yga9d9relbqjjnk6a22i6j13cp58aa7mq27dpmn0bc8edgfyxz16rfih76rcl1ulnpj5mjdsg6e387zz3r2okihulzn4i6ai40ev1k4jcgp4ziy02zu6dfl4ox9l4dvjp3w9xb9s7ltu',
                adapterType: '5xqrz5m4vcrxtxymospk2hzikgjgs9an8p1c0jnkbsp75bubfnu35ymbf9zp',
                direction: 'zkk6vm8vdbcbzclnkynjbhj3nvcodlloawzuvup170jmmyahk1axx36bca1o',
                transportProtocol: 'hr3mvt7dxof9aujhm2quaw0ijlimcg6g27mxaffvzk4029k1axegj86ekzrj',
                messageProtocol: 'p0n3003g7rc6edtbrvbskkdepm1e4lvobrilruuoc4n7l3vd56842s6g43ih',
                adapterEngineName: 'tgzhix5tsuw6w73eaej76ijl8tr8zvgutgl7p2blaaikfzcrvfm2tin87hs3lm6csmvihfegamuwz41roj8k68v87dbcpvrj3p6le3mslvr11kiphmmd0n8t3bkmepnn00f98n0xq4kalbm6l66og9xi1ymgx1c3',
                url: 'p7ubpd1r0i84nrlb07kjxn90x2julqb2ds5gqkfwiqi3swxgmtweyuftu0o1yp44c7gtem73z2b9a0vz64t29caf1b1fumqnba0dvedtp2e5m1zbqbfyhzyk6fkl1fk1zp9as4f7qk0688otr2ln8z5zkm7roi1qs9a6j6vhleucnmn2uixe2raitl42ekdwt2uvbog3p4k7g82irjcnupbz7m3lth6g47ms10pmmyhdi7fsjpu956mebqwj72x8fz0w756cj09bsc0husgyd2okkwmazchlbntuphkp1oqsybzcmbvbk03yytrg6iqk',
                username: '5yd33hfyox5ibjaseo7trijwojins85oucmb7pca64j4j2h06y2hrus8rvuy',
                remoteHost: 'oaz7bobl3ydw8tb3yxdl90500n89cl8snd13pgwljfs8nj09ezlei23aqnz34j863ksdxc71dfmfkle3owpqiw9s1x0sdhbld7rkrichhq7lwtiqc7wdq3imqm9dk58skckcbaxg4r6f5p9ms7asay3v8aj949w9',
                remotePort: '4co56nszwyl0gllddyj4',
                directory: 'uievoq8wi8sv84tao41tfhhovovulg6a6ll1w6igf2g9zvlf7bi1oj1armkphu3j0mp8d0u3h61afyzuytf9rizw5ocjkfeuycbgl3o2ozu2umhqck1iktvxmguf7kgxv4i2utcz437on5levhh53nworppkdo1zrn7l81oeagao4f1dwhv3zb61zsg4iqhzh6zaasvtz3oebu5v7j530nconzslvsmsngfotqpqeahx4i4mhpkanrwhwufxukz1dlnl58n2pl5erbazx13tjdudnug1mobfnkl7m9m1r26dta2mlz9ocw4jt2qb4jyda6hdpll0o367plnia3j8wvg38f5k0ix8eq8g551pbf3xaqu3syqidnkg11y9bfgo7od94bm6hqc949iiaifysvzswg2yumsj5zn8nzriij8shoq4642r8qpm0pi0adtucd5kexzs0jbdw86u2nmk0m1tbwujs4b88kkp3polzcye25m6y4lip4v0q0wwfhn82hjelvxx8o0gcs1jf9w66usg87fz3brs38bd73s2pu0wkpq1634epazcqcxujvaaqgmggezlehk7crh7sf6355ovuhrobvkhlx62dwozh7r7t95jpj13k3h67kzf8i1uvtg90ga6qyzfj1fkkssidnohn08823ptgc5uhajk26nrviosahi7ehwc55zag37xi07b3m8sxi600jub6cbzsnuxf37wwwalz1k8pl2f0t8rw0w7gqitqzibq7mv52yx0vv53aff75z2rql6sq7h5qv97n7wae877yyrrsozfsuln3zeh2g9dci5gi70j65gmzjduhcb6cjayrckwx04t8ezd4tbofjjhpx01r0i4sezteppt69fkmnfi0bxdu96yf39ximfcugdky2bn67yzag8h9b5kg1i3m4li28ztr0o6jnp5h78vyp1w2tgb3kp2ycm2xm3l7zkifatspedhqh7ymihhit7450nz1oo7rakzf6kbh6tyujsld4oqjl',
                fileSchema: 'hia0u1hpr37fap0n4xxhtkpp9uw2aokboyueeps12rgczme32runnhr76eerenbhjivrlpqc0lmtk84ul7r4ne9joe9grezjgx1odwr3f0p48op3rvkicov6ek9819ojedxzgzyp4w6umncb5681z5czs3p6b299wutphwiv3iyn2x59alx6ki8cpmdzw04oizyxrwffnhkfjvtrypz22z18hym4r1562hswhaq20w4ysbbdr11hk2lu7de9c92yg0zjwkyy2eo0qn50y0hb663u2xqbig93ccqnx53u3ww3qoa0jf0zpdbei3u8jhihmoy369rk3pwrs9ek70k01dlsfq9y19zsul08m063zlsc4z1dwraf0cnr0jttmoqxfavruyxo74ukk3crh9swg5cfgadddx1mutze0fv9nzsn08fbu1wi6hzfjacc7jprpe72nnwy6ytpdk0fcvbue69fbqypykz2h2eahukij4tn1gyf38efntwlqdicvh6veiw6jso0xcemic2df3l0xx85v1ry2koz74whmds07fm0yj34b3hsni2wkg9n3x4pj8boownxkofpimmar6yi9t65zne8sfpqc6ixwxd0januzay3truaafph1f4ldubsj2nidop00ot3v1s6ytukoso3w309v1i4iv0nb057d9pecbcpofzhom840ykqfzt1dummjnlcoju4x7ocumvdne28ipj9re2m5fctaih871yrs5dw7k2pj6dtn41x1fbyq1rtz32nwchc6ns79djy4yi8l5u7bchi39xvtbr9s0d15pzhqj4jwqsbknki4whmc8j1t39oblkazqpglyt1cz57n8y5hqeax7ker1a6u08a4wsgsovuytloygkbb1onovtbk7f1ugozvwwb1svaq65hok3nwfpsbqin2x27eemr8vudo9adlo32gskzukjr652357kw9f7odvnht5mz9onegi62y8e1wxjx66e7w60rdc1iveu0jczwgxocnk4',
                proxyHost: '3rdofz9q1q13mh5z81y3mitdyrdghrhzbw0akm5cn7hxqza9hla4k9zshp8y',
                proxyPort: 'z66kea8yw2j8dtcy5ltn',
                destination: '089jvtz2z02gswugdod89xpn4c0j7odlxtkh350zy9wg3ezinkklwqzsfajqbfn1uvcl50klzwq6lm9ol4swev6x5zixc0rib1jgvutukmaptdz4z0i4auvdh411kfs0mhut18wvq6yu2lyh19hedkayehz51ad1',
                adapterStatus: 'qf6a95d8x3ew65q6qnvk',
                softwareComponentName: '4zeagxaqi51f0uyzytj8zaq92x8fjkfk5627blqilxiq0x41qoigj5b4a645n079mapx0u1ydj0zo7glk0qbgq9zqvavf15q0r695fydke27rs2yx3umczx1e1hqekloz3mezrsac5uezrnfe6k8celiye10ohj1',
                responsibleUserAccountName: 'kxwn92yqwn7ty3zzk3epw',
                lastChangeUserAccount: 'tiffrblquoct215u2ba3',
                lastChangedAt: '2020-07-06 16:46:18',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelResponsibleUserAccountName is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelLastChangeUserAccount is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c',
                tenantId: 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
                systemId: 'f25f22cd-3121-4c65-9930-f5dea13a6019',
                party: 'gbks524k93ihjxu3wj2wiqh5enez7xxy2351ljkpg6n7ve3c20n02stcd1xqspd3c43kiil426j36xbhov7gzvgwl0sw15ugc4mu4wxjohjc3he8m8dyohixnpiq114ydoh9gxe1y6qdrv3mj4uai9qzx5k1ud07',
                component: 'pta6xeor8xl4nycygivm04ioudkgl0vqg99elhcc18xr6ebrbxhb8g08lvf1ax9y165rw2b3jtwf68erh6tjrk4puytortcvwt6yt9vvlkezhydyqygdtwp7of4qvx3ysov6v776jk4fxgys8sty3kdulxgk5qnm',
                name: 'ttrnjx5dmvrk871x6i4c6p6510rzk01zw5da7m9u0fxy5o28iwy8o1c7sxud4i1r6dnuqdgkby01r6hl17qq3n0cpjdgeuswqpxtvsxhymhhv6q06dh0rqa60gmo8wh74sbt2rje43bf45vboy44b4d6osdmwdnv',
                flowParty: 'mbff9pk8p9jldhmlm79gnh8w8ap9w3khfvq6tnnctga7yqurpczu4dgk6mkwpdiopght8rf1qa78vudw2ode2c9whyth6p46n5w4sw9444y4u66xplge1h7ctp48zxfo729ud8bm88yk5wkbkn7p93zs2oai37qe',
                flowComponent: 'yu2ly28j5wzpphw960qqb416rpv0d1x6a6fmq7hi1ycqobkh5qksmjfotp293g8ojj78zlq8s6ggzqja46qukc16yohoyqd5rc670zkeul43mti5npo17aykq5xt4r2w9nkioul3zr9s9npu3tqn5epdlrhz1jy7',
                flowInterfaceName: 'fir9fo18ui4pnh0010bg79go0uwg5t2k9h2yl1lhyhkhn4cun37f03tttai94y89z3a33mdt6vfd3yh69l4pihtooeadlmtfpp8iqx0xemlkxpp9rw31fipb0z0nvck2omtxxsa6i4ple0gxedfpe1rigdyts8fy',
                flowInterfaceNamespace: 'wqnza1e8thij8287fliu0b6utm80l7rxuoy9ivgt0mhqbdq434y4lqqqy4yw2e3vdeeecfofdbe9qfz1guce7tfdvlvcbomvhd4n5cwh82jpixc56139gfdjuwnxb1trgacdzxkynx5udp50oqf9gmox68gw0zgb',
                adapterType: '670fl7dkfh2uz8luiubsc4m1kptyhdxqyvpl1m2sgyu5gr25pt5phbqcrx44',
                direction: 'qvrd31igsujip2avb8cx80zl4xbrdym9441s3aywutwxb8t5o23ad0tz7ldl',
                transportProtocol: 'hbh2j2ypxsszhst3w8ccsrnlhh7hysrzfvnkwm254mgcec6vm8osfmg3jthp',
                messageProtocol: 'tp3r8fpuo6j9dlokm1z3oh9uhjxrq2oq3gwdar3u4vzirznsft5nfiz89isq',
                adapterEngineName: 've9bicmt0rk7xbvjq701gl2qopcx1yi3b15bf3mttbybelufzkf1uct8oqaheueplrqgey7i6wg6b8ngtsuu0xf9uulz85luoxss385a4bikix4y00mn9qes49ou20psvzxqudov07a4v0fsibdl67wru0yp2j1h',
                url: '5oiwuqe5zzv6cspuu8lnt8x9umcijxv8lkqkermiyqwfm9plnrl9f2vghqjb13qsl3dbar7cyngvuo6vo5x583a9s7f370nzg0ds84x7nzg71qsc3ndprvr3cb7mx34d06lfdrsu44visozje3iwui2df87ge7yap8jvhbgustr8p58t21w4fn9eeqiggbc0yjrwx0fzcc7zb1mrbwma2rznccuizukj8c8x6l51f2juo8s3238o94t75gqhzg5aprzyq97th0p2sl1tsd5cq58fxiwf2bvq4wbhonrxfe0rhx67bv31bwkqh02bs0ku',
                username: '9cd1b129kb8iv044fwfqvhwgbw2onpbc4kv0766r9bcv49viwaf1oklhv0m8',
                remoteHost: 'lhsj2tpr4btyd3qqptkgmdijsfffhnc88f2qnt8x01tbwkqm60zo196jfa07y7ca7qmwc4odq6jyn6et8qhhqn9tsaw7tyf4yti1vk4k0k2hekkgokyt5kqg7iln18so048ru7yr7n7yyqmsrzu16p02g450dmim',
                remotePort: '7pb088z49iemv73h7ljg',
                directory: '09j93lzn0opcpdsti907ecz3godz1765zkndhgm4rau26c7prp38ta9a834htuoq5uupzamj6vlbenuwm9enkwzgl6a9lllmiib0eiybwanx8pqlhy8dhjfe9r1vzy35qgm2062ujn5dzy068lwe905ldxhv9nxuphfkivksbw3kl57rkansgfl9ote83px2br7qk6wfmgtlbk7ac4jc0dkculzzhvs2abp1r07kkf9io23vz2ddp7znivnniudaqcdgcre7rf147fpzm0vmd0u202yxin67m7ob56elhxe6qky4dhuuxluqubx7uqjzke8sfwmf9d35ke9u8q5f080cx6833mthvjngiwissiaf41f8ye5vxofu8z5jr3r32dx2v0ihpgfkzl4fe7jaa1xl0tftk3brd2i2vnh0nvsxcg7mrxch5iesi1qc10rnv4gn38fa1i906hzzngztfmanptxx6dfpt8q6u7i5el2smntz29ai2dyvgbfmh4fzij6kh4nli3dicmkdht80u7dscpo5eyge68kv0ppm6zrq9uu7psnrampi7fnql645els51l8pypunbqggsfb4wxnffaxmkqkwax09s5usqycmhs7he3jo8jawql7l050jrgeei67fax7grid4c8ckq95xwlyb3ecpyypc5q7hht7og1vcn9e9jpzu6qwgbateh6w27ylvycy9mbp54tbnkjyeegrb4kvbsh9l2vcdfqv09i2lfz8z8knx58zcub2sdpkdg8ic4535uhuiakpqxdf68t5jijtad1yubj2vymxlarp7jnhg98gz5n3adrt1q2so30g940vlw7morvr4jcl1skwmkht85i8iaqogp8xqr536v93saoenc7qw8p9dfjd04a399998goc84tkie3ydtiv7tmk9eiouieyy5dzkga083e34mlfn16q9wqu327v9u7z64gdwiqby45pj3oenrsn5cv9ytipxojdmiqgs1f6lipatd1ulm1hu2u5',
                fileSchema: '43i8q4qphqi2s0j15yj13ypl7brsd4ux755lx5ymelrljtuwlhiaizbezihbevt497kcjnfmmp53u59jkcajbdny4o83dvd8s1h41v6semtw2747100k71wzl67f4vwu7l64up2dnzhfvcr6a3h9uqgrd2ao2nwqu0jxrp60tocdjk3alv8e2bp47vwbkdcs5deylneb6etxklxoi9mixdt6gep8nsbqqahz0qnqoukgenf4kn0tehrmzr2836plg1gszwbvzsheq272rdiggpqjo6rumgia8xtmkehombawu9bfqgi72s554a11i98shlctt03ax3bdqpm5od8m8yuhtlc27ubigjfnqfyotkz5l7xdbgrfnk8gqig50muxde0269s9fd57jkjj3x92frlmikvsucl7ibm8hw66hvmlyiw1qex5vm1wrpshknbvy2t871iqeufp1jvt9u22kbi92iabgqpwkyoc3qvquv4ef5rnke71hxv2lmdreiratk1uazdxz70m0agcncw349t3kxz4miie35qbe7ppqucfb60h7e16yniwittzuj0pptrkpfhv796yqg11624psqazki5acapaalmqsn6auarnb00luf53tetyiw2zj54xmavr2n1y14b6b0lqnk1ik5r73yjwo001b39ek0fzw4g43f7neaam88qqzztftbe1lxn6s7xet4mqrcip8sxi6oqmpxcg04d6lcgp8nkvc3m6cdqe4q4egrcwx94i3nygjd979t7sk85ybl5tgr1d5f6eo6pj3ui5p29kjx7ujtsu3cgcrmoe7ayyon9u9osjzqlygiql8qeyg585herj3zd4zhw8cbdom2m5i3ql4xwtjo2n73h8hfwzej82u7zjbk4fwycv82x7mahgfijc27sy9i0ttfom8pgmz15fv33y6jmn0tjskyuyjr0bwjqhmfvho6rmvrxsf1p593u0ajk0sq5781gc9zoevhv3zzmwlayizs49g2vg375b4yi',
                proxyHost: 'ybbc80vlors58i8fvtemc5tc4gyh4yam8iljrdbfyzocup7qpmyr2glfpf0u',
                proxyPort: '5kg14rtj7g5ukqlmanj1',
                destination: 'obdv09qln573uu8fr52ekdeaxmoa5e6e1kzlrxghgot7rvm69yvydzlvim3g0vkowrzgcgh5d8d917y08kazekmj2rwoeyppjh3pv9bwd58qbij7m2d81weie1d5gyay51pk985roiihb1vgykekuvxy9vw86irj',
                adapterStatus: 'eth64evhkmojaqbo9nkz',
                softwareComponentName: '8oz87bgnss3nj6nknmpl525v0y3p4aiaqtvfq55nq90myfha02isnyrnlfrtev6w4buer6umh2suonjmtc46p2uarrs24utzo4b1b7avm52kf0b3h6wj391csmq9gsdw79nxxj3kspj6aq8ry6zjsm779rlgg7bn',
                responsibleUserAccountName: 'mckzd51h00gm1249ri9s',
                lastChangeUserAccount: 'f7n1c1paca3jalxkamnl3',
                lastChangedAt: '2020-07-06 19:39:01',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelLastChangeUserAccount is too large, has a maximum length of 20');
            });
    });
    

    

    

    

    

    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelLastChangedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c',
                tenantId: 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
                systemId: 'f25f22cd-3121-4c65-9930-f5dea13a6019',
                party: 'khnsppiuz0wflhz4qlmf6a6vpj4bq4cw2a090uk1tt9d42fantfp2144m0pxzucg249wkz0cktw0qas5jezy4p1h5z3glh375roqpan5uiq87kvd54rymi6c9g2dpe1t018ll9pw8a5jsgjnq6ezpxtmy0y9lzbk',
                component: 'e9o0bom8s6zmw2csugtnq3z7adoumnr39ueo1a1ba7a00uujtwirqcyw88t7vig6s12ma9ijuc0uqyij6qy6518umw7vpf3kyeqnupj747lxl7sdp1esdvxc4z0gdp02t8g9gmf7e1t5l4fzprtrmtlitdqts1jl',
                name: '69g6dbdqd9viobxwh0sk84vh8yc98kbn0vscaq851xu01vbku1ydp1x8k70qtbr0u3n6tfilkn7ixw9o1a59at4iwo1tb1313sf4eatilfeduopumcen29fjhsy78oxap4ximm341su7715x00k3ncacyekvybx2',
                flowParty: '1mg5a2cy713yzceehi9ln49crmfwpgcr8cr012xwqlh77dnoww9y4pfu2qfw7nv037gwa0upijciczwldjjkj5qag5e7xpofknj6xrzkbq266b6nuv5ka67u2n2zhrgwc8qmx473ph3xpc2yqls5qyziv3ynokup',
                flowComponent: '7h8t6vofv2gb8a0odsepikfvtpgb7zziy37g8n2aq7dh8ipkp33tp3rgevxc9n9rj4xuam8a4vazdv5kdszxufagrm0jezbt67eqppyk29udp31teyejuup09n1f0vlsy17ntk3j080vibntp37r1p84ogrj2ayd',
                flowInterfaceName: 'f03rg1zgv7uxr11jyx09x4etlfq1bdro2smg73kjx90iwjs4g9k5rgbemsoo9ol5jl86zzg2bxptg6yvn3bsfaivkjo6xizodsjb0ponwmlo2jo1mcrhjeeyhih7mwyhlym2t66a2gtqfsxjbeigc620ycoipkbw',
                flowInterfaceNamespace: '6zgq6bcw9m7r4kb2987tglxuanlnugf4m3hezywbu01qr8pfw2b0wzgkr5k2xwvtnitz9al7fn0yj2sk1ry6lwo04cprmdnbslynxn210uvpzhlkvhdhmytnv6fyqaahvi6ake1gao4084bpq2jjhvpedcqij4od',
                adapterType: 'bdpenk8zq40c9uq3fwzbwyor52qpgq4r7h55u1d4e17x70qnlh0rpd55htbh',
                direction: 'zyrcoiju8g3l1uopitwnd1vho8xhlbzo9ukhy947m0w9h6elrf4yq9rglyj4',
                transportProtocol: '8c35psxki5o4c5jnac1hi89spxfr7jt9b5hv4jk7fhqrxa2o9t1i29avzql5',
                messageProtocol: 'sakrvpbbacvx96g3a2hocrxsh1kaj4h9rbnlyt0pcdjp90efrkn80094fn9u',
                adapterEngineName: 'ws6xsb4v60exdkovbextht1y0ua163565gadbdocgjr74udoahylikjck9lx3unxxjykj557k9zmu167j9pbe3sluocqv1yxgh0bzlrlwq3n531x0cz56660xl5wkmb01o06dyjgbienngraqd1afi3wkqd4cobb',
                url: '5lm24t3mil54pac8gpdivhfpehq7mlznuo2p8zluhifn01ojkk0z60lmesr1ek94x1f5p2xtqrslt16y9362s5fc48ik8kil65x5vioggodas55zcfk8okvi9cwdam8ig5o8prm39hfygk15imlhzk4f8re9o0myr3e93oe7s12fxbqanrt09dsfc05jrvu797vtaau300veyuktmvxe16ke6vejhqnvge0us7zpgrsr7y94a24jqeqmf6chh48mshvats2rqcfd642lx3eo58qb1uc8uayl1k19sj3c8j5si167ot5vr0rfro3e9gwp',
                username: 'i8iwn4iwi8mijblsvy0mag1wz7u7nuh73zzrwi3fmg58my1z128s1wto685a',
                remoteHost: 'ewlw53rkgimikxm4yyjchplmtvgmd9sjxvv1z1a6st984ww669fzxwhz9u77junr6cutyb9oxasx6pq2d8l174e7xz5s92oimkrgondmz4v8ftjvjdsqfr5ay207hs610mri4v8uqpsp8xx3aq626p2biav9dydn',
                remotePort: '9dj83j83d6hqyssub4r6',
                directory: 'i2qmbvsxb8ovqngwrddlye6mdh248zpmw96grjuhkrx8h90xveaq7a9h9zznppic4fb86k87scbyc17wneppoaiqo24mxibb5kdw20xnpmenmnklw7ys03fpr9gdpcpv0l3ckxuts8z58q8qpcmdthxogk2znygekck8az5ncg13jl6kdfaje5iheg7ck5wzkrwsbagb8wqja31u8uc100jczwg6675yt59xyqobh6cjs2bh4mrlyfqfebqf3cinlkdv1jlct6c1nqbe2dx1o43rfm1vcl0ohd1ggvnkolrpcq1dvzh78nfzvfuv0c5vt1tcvx1i0r1gx09juqour0iqrb12wywaplztun9q56s3hcrsd8xqqvt2xfm3yvtm1x4l6346uazxhw1sn6d4butsbtngqllbn1nx85v3j3ra5ygkix9vg551uah16yhqvx2cw72x8cqtdiir3pcc1amqw6baweoi6qpdkh0es9spij97iedtctb2lbvbjczifajxd28ylf5to4dbjekv7q99ye8g97l7m7w0aigiuccnqm3zquv90rojjp4ngtweih4v3unm7gzm5caeoj6111mahxigmfurlnuammf3qjhuwcpf51gjlr355ovhz5zftio89zropriyx4aavlm1zt8r63ryg0mfx8ebqxz0h8d4lk4qenvp91kifwqckei7mx805d5so03u8rqvlz8jy868kjb3g5jnhaj47j72kuyomx1zt9g63iqssuh4h0790gg7jw6anpnhpbeo6hysm3fw5nkiwfhu5paip0iq6la92mfsdz9fp7umg3m9oao72aqzbqxvs2qd5vtsfulry19q1vsluw92ovvvss7s698t9eryiux8c6vswj3v4zarx017ygxjt6nsmuqnrs1iezoqm5esbejldf4oj4babix8v8xql82jpl2tm72tpgykkv3szq3rlagovqcs5zpl0wo6t8ryljh83kntu0agpv6qrb6u83qtr7q685u2mz8',
                fileSchema: 'f77dnznjmzsvay18j7xx6qvs9kvmf1suhhbfryebzww1d20auivge675cryuyxpvf829ednrwk2en6gqw8vi5s92kq9ohg4y9wpp7vrnwxgaob1iutqmq1gu6qjkft5pqyp8r90waqmz4lsa6n9tmxr6mm43j9kror4kxhcgwbcxn6b81tjqzsi6qaeqmxnorjmca9ews83rac10hkcdkyhu4klvsdbph2umwngoy6tb9z2ukp6n2a8clwseitzh6okunqlc81dxi0xvyr2fzif9pnomx7dknxuk6iyv7tcplnwu8bmoc7q0o59tgutopob68jfoo2p0v7t1o6lbv7sqghrthbphty9nlto9nt650uev22d7ylf7q5oxp7aqleggjswzpffwtkip0a1sunbpcrt9uy3ejta5ft9sfngy28fx4o6610nsmn3zm0ugpkcv059bgdqrnaewl3nfwzvtpe8ek21d1evahuahbhjj8dfj4259n4y5i53l70jq81z7u6gykiui7i1hwrwnv1pv1y2v3jk2lo4t6f7j45w2lxrx5dwydkymem7avn2yqkghr6tgv7pwc3m7sm8l7dmymwy4r2cqx0yffow9nnmk5lbmcuholvr6qbwl93zb27ry8tww70cstnpi0q5byv2x4ym1a317qt3rnc1z5unczq7fvfi9acx40k0su7wu2toimtzmj8wr0ys5q7x9xt46ac2jfjruv1a2t8qxhq9fqn2m3qn5bmww4dszudkownwr3bldniy8sw9zjt5rl7wd1w8vxtwa2oqyhcnz38irwpm7fe823rbztl4kr978e016gd0t868os8ed5bt05u0itdenkgcmptj43jxf54maeir69j3i8qb1opqegzjmk3w8bkc61dk8pvqa2t9bj702wblqnk20s8eurmo2tdad12smxnio91new1vjdy5mvvm6stkatkjppc9wzur1md0ox6cfhpuvrb1sfdfc1xbffx7iqt2kbqkaen4x4y0',
                proxyHost: '8se0jbmr74jehav9b2cwbpj0wrd77axpsttr4qtky4sbfg77zss8gq6grojq',
                proxyPort: 'q91y1v04ftud6ctss9to',
                destination: 'nbi8xjly3xphhzwjlfkvkwvcqygez47xcwcmzcvo8tth6kgkwwjxorx1roi75rmh25e3euj2qahg8db9u1qvmxpigl6mmdfikv1qz49po4llcnp5e06oblt5lccipqskvuf01iv0d8vq9myne9fp71nb2s9yvvnz',
                adapterStatus: '4ydbxjvi7urn8x7sfsyf',
                softwareComponentName: 'de22elqqh3c0vy7yc7psuu2iopjkq8trra3dfpdpl6188dcihihyyq7lfn3ly3100jjxwu7m2gtuofu35nio7b4ofacianxmgjwn3i9eb2gdwpuj9va7zbkniwhyo1380xiq9aq7y8r6nbgws3a9cw8l5rxbd9wh',
                responsibleUserAccountName: '1j9h6y0src29m8een9nw',
                lastChangeUserAccount: 'lcolvid596ujawezvz4t',
                lastChangedAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelLastChangedAt has to be a timestamp value');
            });
    });
    

    it(`/REST:POST bplus-it-sappi/channel`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c',
                tenantId: 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
                systemId: 'f25f22cd-3121-4c65-9930-f5dea13a6019',
                party: 'e38q6ui22851wmd3ftjdfsstqknna38p9dz7wm33upmsudn3tpo69azbkfqsrn42vm24jo7e4qivlf6p0y0xaozpi206lbefwfgkmteisekq003wgu6424q00xakvw1svkqv3daav67c3idf9zxbcv8c5k3dz4m3',
                component: '6hslcu9b7l3emn7n5zyb3sn7n0jmluedvlpwsw2n0bh8vbydhi8pr2cl2v75go0nmqz192kna2oc6cpouftvquiw08hxp6kis7alxvvkn7h3l7cpd4cupo1cozj51cmgj4pdkbuyc9o2g7umwrueikrhf6fh7oe2',
                name: 'jblg4oz4sofutcxliw3qkzeclemyk7r3vskvjzg2ksi8txdmdgm4tzefwf50xuiytp8nl5p6dgg6t6r0li8p5kiqilgqxh1p7h8abv1vr0at3meo15qag7srw00jyxb2s52quvsmx34g0gommo8i2be7fmaopvyh',
                flowParty: 'rdbmw3ik8slwff9mto7p5fe5qizbxefzlwy6v5j14txmzt6zh24pbz8ngo7bl4xjcsiu65hooifzzsx7x4b33ufb4bpno6up3u7xje1x851xstfpby198sq2xce5pwodlyyds08hwj7v3dghq6jx8bo55a5lmplw',
                flowComponent: 'kt68tlygaoa24c6xez6hq2h8nkxllj5y2c9yyzah745bpaee5y78yeedaqiodmxr5luko2i9a3cq2qodwsrj2pd0b0phio29j28jefjvw5ojx67qgbwj1krmvme2ht4v8hy8o7wk9mrm3dnmhi8qn6347ks9rs72',
                flowInterfaceName: 'c20z8rsk8ad0dhx252i8kt129kurvylt0uhw3c388lpyp6kxuvyiu4mwt2sm6s8wovomw8yixsxq63amwt5uth87m3geou3g03bf2el87c07gtg139qbus8o4a6u0uyj3xyku11dl1zv11b70njc5dhrqfn3taul',
                flowInterfaceNamespace: 'b50rgg1ftuxucgxvlofe6vxayba4373npjck1occ0qdtaxypc5ki19ldfq5k1knn7xpd7h1ufchiqm6gbul9wvocz4ab35wpm6n3p8ek4maq9ohtkb86pxonjwqtdq1e46ut3144yekfs7xi9icltsw7d3nvtkti',
                adapterType: '9pob7zz7xp59z45euowqwtnhbeuclckio172mpb7m03cagzwkkwtshwm092s',
                direction: 'rde1d19p6xfg1cyw1056chmbdke9p9eanq96o7oalxl6q4dx92jav6kl853o',
                transportProtocol: '6il5zk9j2tt71bjy6yt34duzto8wr9287cmqs1enrlmjzdeaazpwv49kwaw1',
                messageProtocol: 'ozdieonnxj2v3rp55rzxy1f8i9n2yevflxtem3qi9bhezyuwn0780oxczmmm',
                adapterEngineName: 'sxvtmy46z7un9qz9wjpvofvo2jxzdtlm2bkg6kbwgil2esbg68m2fijg3hvsm841cg1c1xsuxhnogqknas29xvbd9vqm0c8buarafwrj9kjnuoohu107nxpo6bj1dpwsrdtp8jm6u56rk4n19ulul82v8dn4bhv6',
                url: 'cb0ccfiyushrocgjpfqoxuf8i7kmneqprlqxlqs100u0vqco654116g9i3relogbgm5ryipx4jfwoumtwprmcbsqqxigib8ohg0sgw1aidj6i6fs20sxpkdupcbwcve8ulv4yvalc7llv2b40hlkdssb8zul1jm4m904dwgvnjulvv5fgbrrzb7udt4gz4q6267k5q5wom58cs9hnmofh1f7gk7lta3wjpx23sfu6gsxway864n59lyd5lptp9aoi5z5pe6vgkigznrz5jypsncsxl6274mlgdbcp9iplmytp6w64xl1cvx2jna4o1bk',
                username: 'fwxi8jox2l8qquutmrjoneyi10xxbmm80457l2w327fs6yjcpb2twsfv8u76',
                remoteHost: 'i8y6rrsug13qd54dtdv75g93rp0de2h7yzligbdo3wn0neby3u1ktago5rqvtmneovur3k7hl3va1r592qtkc1fqwk7rhxfui5lphn0lgdbuun1kd0a76h5kxq80c8tdajx1v3y8ug5cjoh8i1f5vj28hy6401nj',
                remotePort: 'wuqnydr246eubs5pyzjo',
                directory: 'dkm2jujtdxuzzadnvazf05ip15oq7uxofyjhc269gr9w6fvfse2bdm7ygqo9vhh7c9jckd104btckp7fcvngfmxgbf0fbuc2x3ijj519npdapp0v2y72f5hsofu1mkolhb6na0zru6eygmpjs7eajeeakpuolseqmg48r5ucfxvoqgs0flftcsfdyo3d86j2mb8hbkc3h0qg9t0rvsliytye6dzuj4a3h6s52vsu3188m4adar9yrf9ecnm5cz00tds099zyuocd3d68q16vf1jz196k00yiqwqb35c76zpxdl619q5o0jdlsznlcuihk2h9mitfo25cmqmioulp4nrg292vu0r2f1z52ee9ryw42we0s9fwtbcqfxxcav5xnrdflkww7hn0huz623ay0ihfe1x4mynj3cnh0xu3dqh0pha7jnf18lbvbblk4w9iujbs1jolfhujaxot2ofzwpsr1u9egf0pei4r3ex0hb8mdwv1aal074ubrr5xyzw17lulnnsjp0hunow7r2aalyvefiur709ow2yez4nqaanaxdta0ktt92hltlrinju7wsbjqw0kno8qgdjyyk1eearzuejb8rsglawcwbcr1r90t987oqmmpq0dx6m21d61zco7thl2k2jgixoicul85faoaupcaflu4wbpy2r7aibpfe43ltzo0akrwvvnreo6gofrzh6qclcgjl07essxbrxlx4wudwjsbgmjffcf5ytmo2ymuyoibmrdrbclu82wlvl8nx0wkqp7zj0z78s3koyd5yor3hueb0fm6wq6iz6bxb0p7wlhlb6wf0zgwxdvvpxfevf98kxzn1xmg6c07hvtlhxfxg3u28z3rz0cccf4pikqi7lngwd3ad6wln9lim74jaeavijlk42v7ysdkwo5vgebrc23ta8tzcywdtl9nue46v9pltw260mtyl9zc7sjoy75xx5ztgzimjzg18n73t7ejhlilxikmsrxrfk431al52o3qb91s9lps6o',
                fileSchema: '21ws57h3n15xh4zkrxuhno60dtihgvn5y4v2kp8lohokloy76u3hf5zv03bt6ivde9tmr7lvbeg8rk5vc3egvjvuimhvyo6ng50012qit9preennxwl7a9yemnim2inydk710v7xs0a8qwjdokqszp844y3sni6e6fy2a8jgt7yv1kvdrnggnc0yg6fbueguq2y7z7gb3qsagoxh9k9hw2l9bdua2gcwdsvzg3acxbg2ednt4cvvxunomzwhjkw49hgye9udmnybjfu7z70uoga1gk5clbxa4c1ov0k5euep30ptql1iwk4q0w49p3hb1fy2gtgk15ig7chnkv60ne9ksxc836tq7a3rco5tv3apb6tsbt4ylh46c4nrb9osrweh6bao20bgvvyp7d9twxlf3ng60tljidrxligkvir1ktelf2i7dxjp5enwmqobokdxdek30cvpk0loaar0a9goxl2cx8n2q3pgxyh5myqtulluw940ojiw3o0no9kxg21uj3b636abvds1ymwu4kiw80zlvkp7l29hcdquvc51jlf9kmic5g65s5kd26ebgj6dx43s3l0vrxs77c9els7749tb1wggtsed67ekaq705mtya34wntkhcupaqvfbg7e0ffbnwjrjfosx0jgf6sw7k7va4wea7mxgr1bhltq3bn32fx19yypuqxhnx5p9tt10xrygb8iesidjwmfl32j4e60b5gqnq8z7ga520qjblwv0zhvgufs1wrywb7owlz29hp9f7h3scg8ldti8tqccw7atmbyn3eiiz3pcml3jbx9c0oowqcwdrtktvkqpf2wfahev5pxhof5nq84m4wvb6h09p4k7017u1qa4xyc4bldndums3iqcngwf356t60c5l1gy5b6jn0wkc4hms1ejmjgic4735gpf8rdh0eb5pqxxwg2etm6tgjrub5ok3p533o3f1bo2q9epnxkrmqsovmmv3rqa83dthyeoadooizjm2glfrbwtnnq32iq',
                proxyHost: '2sslrb8ncwtpmdmgjb5ln0nq6rc1xluhnhx7xi62lal9e3xwp5fn6c1b11l4',
                proxyPort: 'u8negdyamr5hb9c2tqa9',
                destination: '8amn7zvcent0jyx6o3pr4dkgx3ig10j1i9qaeveiigls4kahwrgkthqujp1n2n5b1rqruv08ami1qbfdbpdljaibvcajf6yw338q8qo0ftw8qi6t8bww5gv9x9rkm7cqv09jr9w3ctg4qubbw0yvptndyb73v6ik',
                adapterStatus: 'z6vhi9z9sb6ory5v523q',
                softwareComponentName: 'qor91lq5yb4y2aps2upidxfhbq2hpsfiet11ldjmzcysfzyo42dkfxuma4adkwz2af2ztxlxi3ffsqnwkjallnj8gqv3y78tfnil4dech9yfjhe7b60mh7p3bagwr8v2i1107wksxlfkc8nw18wiujms4ja5nzja',
                responsibleUserAccountName: 'i255gbeg6fhjnygxhu1o',
                lastChangeUserAccount: '03udp9vzsidrnjnkmpqg',
                lastChangedAt: '2020-07-06 17:46:32',
            })
            .expect(201);
    });

    it(`/REST:GET bplus-it-sappi/channels/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channels/paginate')
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

    it(`/REST:GET bplus-it-sappi/channel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel')
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

    it(`/REST:GET bplus-it-sappi/channel`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '2f3308b9-8169-4361-a5b4-8d1a0d57e67c'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '2f3308b9-8169-4361-a5b4-8d1a0d57e67c'));
    });

    it(`/REST:GET bplus-it-sappi/channel/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET bplus-it-sappi/channel/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel/2f3308b9-8169-4361-a5b4-8d1a0d57e67c')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '2f3308b9-8169-4361-a5b4-8d1a0d57e67c'));
    });

    it(`/REST:GET bplus-it-sappi/channels`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channels')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT bplus-it-sappi/channel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: '5725d3fb-95b1-4c27-afe9-1a79b70591bc',
                tenantId: '0f23188c-46eb-4e15-a20f-2743eb8b7081',
                systemId: '23d928ae-b7cc-4d75-b190-2baec12356a6',
                party: '3mjjg72qnwhpzrjsugin3o5u6lb6cvfslvyuakycyjgv8jkutzer7ep46deosqlzsvi11ify13wpni38b17jle9dslcp8cbdaowiz1pu3ma88peajq2d81ro4vklcrd5s5mqx0y3t7jfp0b6op2mhkpy7qfiep2h',
                component: 's3zc7tsdle2q1lzc2bumw0rpa0dvg7pzdtzbuazq1dc7jliymb0kokzmmjfke9hmxpvvl73n0bbjrvzfzxd5gsljqjxwntzzf5x0rkbgx2ty4wkjbd2abbzcsi76vxo1eymieyre2m50ewxjykvpsghemwsq890t',
                name: 'n49fuvx1ewcld70w6hpyxedb78iqv5biumc3uqbb24umpu5sny0hcpgthlod82zlvq8xbbjd6p1k3ew2hliv2r9ao58yk27z2zuo6h5ihw69nq39och4c76l4vzn4y592zu7njlqzpksnrdkbcmcsrdlj0hrt96j',
                flowParty: '2ftt6p4m13cybhusoicjvxzmhjj0ijnpw934kxhmt5vzbzgvktxmux2e93ukdmwa5qmxy36jb1tpfz8gxy38bwqq2yh0skz0z8mp3b13hvpxlog4mg22t63o27yi0bzaq7em91q03uhfgaigsol56dhlud5gdyxl',
                flowComponent: '9zxdi8rrogekfsoeaosn0zr1p1kyt3cfyeql3q7jmzbnyp2vrlh6mvfgd5qa1oblleufrlex2b1aem9czqb6a9phukavq6rh8vnzhesqq8fy32gqeak7nss0o0tisycvrehwwj4serb9h7dolzg73x1eqw1ivjad',
                flowInterfaceName: 'inl023mlnueidgrhbhzunayokuue7e5a9djp65ofe1uq8lf8ko81ex4aplg86uf5o685si2661wltc3tj720g7umw5d6qcqddwd12lg6k1jecdapn8wkhfjmaso837pwcppwv4f7ycgwipyzijfng2wn7fyokkg6',
                flowInterfaceNamespace: '5rt3yx2j7jkmjx8zf3g85xqmtu43uk0512pt45b985gvoaozp8sm22khe63huikt0344inz5mppv1e0cb3tidktrs2i1x916ynhdckmmh8p7avbki4gnych879w9pz4fgod5t4mjvukn556neuvqwr1993jpxd15',
                adapterType: 'yaw07zgxhsw58aeadwb9fl0b9xrqma8vsfilse6a73bddxhnw5drvhebnu0u',
                direction: 'wlaeas7ro07ojlirv02ibt4wpwyypdbebtpliz96qqo392spivug33pchqyv',
                transportProtocol: 'ej39n4x4oo3pr4hm8yuiy5p2bywqekzxgp16tdlv6isar7e21nppw49165m4',
                messageProtocol: 'n3u1y14h516d7rvtar5xrp3ge54uhsfm4tgxtafu8hqrmap7ri9ims034vhf',
                adapterEngineName: 'vkxitkh5l5wrtoae8ecq9caog8wmvcpwio4y7dqttdps1fnkgv3728wujngmn7tbxo0bd8f9j4hwctj2evyez7eqbmu6axqmojcbdx3rrzoykds96rzyb55oo446haih4xuq2pr4gc4kv743waqw4ey4f3icqfd4',
                url: '3nf02azc7q2jl4edn0r79gg002929zjzz7ung0md6mv6hsipgphd9alhib35jciip8opkc4hf7f7pqyzcp8zl7xdw12168rwy3em8qpoycvzhljryw6tg3tmscjln5e1der4c9kjfgpsy0oawr000nmzrpvru7o5jb2sxcy63luijqh4e5lt0ck8krmvppd5gvnfe6k9aazxacv13lb42bpkx1g48q5sqqpnbyp8zz2cggude236ytwq2yxydxnxk26l2uy9ytxxs930asdpo2txwis48x556aje0damfqgl1nkxrtv9k7y00zsz25l8',
                username: 'fq3dthuk8tdpked908w2611eof2j4ljq75m76ohw7mttuik53i3lv9s1f36i',
                remoteHost: 'ic0x305hmvgljnt23by1vn8rzvuegnjfpgfhqk0kxbvo84dk0nr6ca7va8gilczzvujgmvcpeisyf2b788abm9zbt81d987f35rlcuuei9fxzmj9wyhc20kvfpsj8w5nrgvnm0atnei1jzasxfbesyqcjj3a5g0f',
                remotePort: 'h9emtpt5pjexrxq1t5aw',
                directory: 'ee9b2hv48w1ftipsn6pnsvzlrcpnfqw5idcioiip5tn60lpp32jfbzycce8vextnvp1tpgi23qintb1ilyho6tkyw4r6c6d19y8zujyw8y5umoj3vudzuhz7rrbm9l5tr9zh6zz04uerrcd3q7hdw1pem8bgyzw89xas9tst537pqpcgwxio2dqu4lhatbboaucfsxug1ati8yekyd19czb81oah3yk0hf37oavleodk8l65jnxjs897emc5n8maiusebieib5tv539r5bmqw7ycsb9chw0qp7p2eoaq7smalrwcdvfxonqvps3sykzmxt1ws2zgi3hdrw25kkdtgtd845pcc8miu3nr1bcp96nx1zphin94c4g53t0iijqwnegyfsxwy6xp12yx4nfk358zf7l1mj0r9bti5b45iehhmc81ahr7mwsr8sfyhpmktvz8frv0qym4ocxo4zb0c1paxzlrnd06nsqrfcem2ktckl5jp93fgmth3odpv8sv4ciukfipx9370jco40bchjfpdrkbdc8v7hhpue3ca238rtqs75skp184b1axozkrw4eku3e503ke2osg8r63r5fnjrrzffjb4oayk4290k82h1d0lt68slmvl1fthjhq3sxx7ulug3frznjbq66vwo9zwnb71uleuyx4wjhiptqugu6mw7e6yllvhw0fazynnz6b34wiwy1l63ldgly96j3q9alg3qoj2vwb5dlx8balb8ca10k7ifnuxsl3jff9e1u4xmmhed6vgyvzj2ucbkg9dxu421jvlcb0fljstu71mjvbyc1qimddaeq8kw0tjog5b53aqpsztu60xhoajsvjigxykidpfk1gm51voy336n74j03d3fq84fnmidwgf0tzbq3uzn5yp5cken2wd6qpxxy580l391ljt2xg7blcd3w6tcx0a9ku9i0ncuz0z9y9nlh5n61yqt2ytzg5pin20p7jon82jfn1q5go1cahe88ovaguzbuvbnkr4e1',
                fileSchema: '07qb1tmy3lir9kr479sdjbr84p4axkxfobiqld6b5ksh4qsbnk06ldx0js6n25gufk7lx477tav3er7inae4gh91fk1vxyzvm66705x1x9mwqa13brp19dchtbcho5szqynq1a7c9rdjaxqacxep5xf9dydit3muhgpzreee7lsrlrizr1srt1rm9v1ak30pc8nlr3bxvj6lhwm4z5mh81wh0y1qqqkn5v8kgg44c9l25w8ah53fioaj2mbqlegbsxdwriu0wwrdsz2po24ne2rm62pu9n2lr84gzoatxxrhgudwqxc3uwak2bw8fkj20nbyjz3e6rxvk3b3ox4x2xnw99x5os0mx46j12t3gg1whkghyrasqughctlbeu0s9kjjwa3yijqz8sgpt8zrby39ucaokc754ee7netai817ywpdd0k7s0ygpmvkqp1wu4j2n9qpcftoo01sztcp7xiowa65l3vuevur00b57i0ck5kfby2pqylv3pfs19ubfcyjyxsgqqqqh48hmxonotm934varnp0ej65rktguhx2iwa0uuqkfliajoiz9vm3ee5hczpjf13w87qugdm1s6pk2pnnjiha4xij9zdyysc54m0nlbm4qblwbmn6t8481ponfbkyt113mlzu7b7i7twx84cxhaq8oozd7gtlmhxiu5b53695thibmaafgx2t8ruuun7iidimcgrujs9q1xdtsxj979e8b2b7dgqzxxg5lowwiehz9vrw86kne5k27k2qj3xdyfbnw8crf4olsn5h3tn21iq37kx5o977vxvegcdh4y23rkdd57lqo8ntz3tlcfxjj6zlgaej8kpyk36tyjsj98h6350i2go0no9j4vsqbbt2xinb8aetmtu0m01rptcb14wfeapk37our264rv8xa5117k0z3l8a3it0trlhjekwnv2jrezd8prut7c0zlwzxpur3im5i3t6iciadkcz4l4dvz3ex56xb9wxqa9l8dx8e2w48m9m4e0',
                proxyHost: 'z5yral73ejvdr44f53xxeuwjbgc1qvotxa1flc1t03bkb86ggv5dmww6412s',
                proxyPort: '18rkcfvkv8wpc06xbmjs',
                destination: '5cn89i5knla7xbazjin9dcuu1oownel6ermpwmbvlexgnh30lxs23le1c1xo4xe1vxm5o2zymgrkbogz1oiaqfabx8kkczdwlib8qxkaeo0rdvjuve4sa68fnwbengk9s0lwtyfgxscw11zwrwgxugr9307zr8f2',
                adapterStatus: 'g8xjdm9vbt8c0f52grn2',
                softwareComponentName: 'lijfk1ijblskz98arw6xr1zn4wmk35n2mzyjiuizs39f00k9vgz2sgjht3ylmmcu75he1qsyz6pjhm2y8dh6lnov6tb6j8m3zjix7p3a7eymgpcrbjwnup8upwidqtrdkikxm61kzgge0g6y1j2js8lz9tjt6po3',
                responsibleUserAccountName: '59z6eydaj2jshno9wwbn',
                lastChangeUserAccount: 'apqi78otf3eww8mnapk1',
                lastChangedAt: '2020-07-06 06:59:53',
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/channel`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c',
                tenantId: 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
                systemId: 'f25f22cd-3121-4c65-9930-f5dea13a6019',
                party: '52bjbjzb7ojqffcd49zj8yolbzcevdlbigwu8pzz67v26ys208mn1tq7b41v6yva757eqkw1eja6t16cm2qm42h6yimvov7jzh694q9mprc1nbbvgq013ce3jbfuxfmro8fm839196g54rohawp99c7j5txc2vab',
                component: '8tm17mh10k4xm1ipmph15oa004b7drdovodxqapbknt15sdzmdn2mn2k6flel65fa1wny3lffiw8u4ruk48fzhdqfbwizb3962d6oql3o5a7wd448us89wwgaeihh71vzwt95vj5urf1f9773nl5u09gjdmcqcpq',
                name: '7l8i03sez9ign8anarr83pwxld13r7tbyfsor4yc7ecjmqsrdikd56yugy85cm9fu96k51dhx0jf17w6ho9z44q4vdt6sfi44a1ufzjj1jxlka4zkeokhhdh2n0lmrygva79qlxktzjzzoj8w88mz5t5bbfp1uih',
                flowParty: 'f71r3vsk3fqq4aqi1uw4se3lrhe5q8s3f55jc1vf26235z4qo5s4zomd71s9y4v9qwr16289k0n8vxe27ttifme3hqgnglo2gegzdjpjnwfh43nf7baikpxfl3m9zpxyazr8ak25klr0g0x13gmtmo1b7sjo7pa5',
                flowComponent: 'arig0j1bjpv2qu1s4sirow8dx3ur2m8kyguo1vdsrjn2azhytgrxouiu5qk01pn6obho020o78zytyvbfvl1seha9j55ah4fi7cvuf3wk8rev5fnfrgo4f829kkgdk4j99vd96so7k0dz2tv68okfgo4ef8v5bjr',
                flowInterfaceName: 'bibegq3lz3g51cs42097jmdzej54on52gcqx99yugdbmos104cxa2bro9jo2y1x2ijzm0yuxhn1hj8cv8wydevqy9yf6n1ijz2g7hh4xxkqzlyhxks1ztfk7q4m25mqc9mlm84sjnwvhu4ejh09mr5uf89i4k5x0',
                flowInterfaceNamespace: 'lymdblyl66sfi8nx55jud4pe0mqkekfx36hs0z30unwb242r0nhxry8wz4bza0frsr630blo01t0lmcg6i7dsoculyu8k9nmrtkl5ylmfhkldw15saqci1wo3saczeqzy18ig65o90romcz9g2t3gr8wzg0z8wrh',
                adapterType: 'xtsy07w8k4pm2pex5roo57e14sgw94eihi23ky96la2tfcjkh0i0p368ut4m',
                direction: 'epbferomxqrx9x8dv51t7h3ohscwmc1ltyn8m425pvsyf00dyez2hn727k46',
                transportProtocol: 'rsig6pludh4etorhv7sjwrggz7uvhmrgmnuiuqhzxs4ph9mmzsqq9bz9vc1x',
                messageProtocol: 'nl11swtpexopwz5vy48ghyclcyl4gao2mvcc32d6fsdv9n9rzg8rjfhxy7ml',
                adapterEngineName: '1sziqij8c4x7nbabbyhde9mtho9af4uxzpyfgbitwf2ucl0baiqamvovese78nj746u3x6dyt1lu0682mf1biceqxwxpkocjn5liicoe15yucpd357htncrkc71gs13z32b6ksaihg03og1coych0u7zc70lcn0h',
                url: 'rzf40eogdas7y05odqsb1o1b51kc6nfdyiyl6z4zh1ucotjhxxc3wr80qyhux6v16nmypk0yatfhzixpr46sfnw7if0gx6d2k2cwu4l90bvhw3533hwolt32zdidlyxh9o62xza4d30nupcus46baixbxnaosjeow2bkfugjnmts822l6p58ieruzrn1ov5tqqqp22syv508aoh4jdbrnunduriewlsmf8laoq6655atpiw6sq48hf6lcxk0fsf63voy0wtle6077k0dpzm80s3zfflikl9lfwq95eatbvatygx59vppw4snwo11y7lz',
                username: 'vxij7qpbaevr2uydy2m3e0nuyv34unrdsg1q96lgni023p2rpnaglaatlz3s',
                remoteHost: 'wyx8r6rp6yk3jljw5i6tdq8f92evi325wqmtv43qopx64ubxppmars4cqu38iqhfaehf0y2pcwjfhjvfuu7p7jtyojv6qfo4jbo72v05mueqcyqi6ajk5q9e80mqrnye3cozi4ixr6572kpj3lccbj0zq8bz0cbk',
                remotePort: '74jidrql8qu67qfldged',
                directory: 'lvclnccko75cejgx17po6j6cu7pu6ujx7nxzjhremc1njbzexgqoyxp3u87l8f9scsqgdt2gye7c6zzzkfp5jvog75p7alwuimsr15roi316r32iqqox3mjsq4v96vau969l488ab0tfa7lzp9ax1arujzz2497ifgz1wonzhmsv0pzoryoy16sixgukmceafc3avuk5miau6r49nocp8brg76dxkqdjlsyg8e9kvprl3kdw5mztiq434x7mj33mbal5g6kq1j9xwpdi3r4ppm7d9b4tdd9jolwemhsc6jn8bjg6ioe8ajvvu2bw4xdfna8v4szoll7ijyvp7mxuymxo2kt11c8rq1r25rqax2mfr9a9wn58z64gj0al8815y4w17yu7lb9qqpgzj9eyolh73xklgzswr96z7bsviwplcopj50h7ip74mc2oaq1ndg9d3jbm4fhcupqg32gij6snmt6u0czddstsy5tzmesek6t4atp3c57v4trgvpsqfy1vkjxeogymrvn0usiox9hyw3fm6rnoqzwc2b7b4l30bknbyq2xmucl1uq4vc4vvocas34g6djw50xxuvuypbyzss2zpmmx461na7l6x1wd57azs15298z585y1ygimxh3s8b2oa4c7d55u0usd73oagx371zo0i1vv4hikp9al9gd19ygly7qkrvhkl19ddekqd9r1ranpuw3lmkgpwgjkk3z3ec07pifir7k8lna5e4onh60u4qidp243hiq3a0bj89j2mu6tu4wuyuktoy8ms94v3pyizvm4hw48zsfmn2w92mnnejyrpjfe1rvo16xdc9ee8oxpplbfwcjj9m0gr97wunxm8swaloz7j9w4pmku0171fv58umesk3f7l0quc1a2qe2nc0na6oq7ewrkp22d0iuucrgljd4m4xr08spsit8whkx7804njo9zmscal0a91egza5ai8k63yf564c1q53eavhhhjqa1qhouoawaxu9nw729fg8f0an',
                fileSchema: '5qwvlxdnd159e9766wguwlqcxi2ofuqhb5l2qm3jlmb0hkb6c53zfrijfmxvhj5q7f1n0i2lkepfjc3n8mhdfvlkvsvqwvqx8xculiyaq99ndqrsigcoh8l2wk4bajvm4ib8dw9iki5wqdbpmrpnwdcpya9qayxn5lcdvkqan959an9o9orkuxvothzrj7c7naa9a5ynrhpeu9u3idgz8r9y8vf6htmazpd6tmjt3jjtncziedft8jgu0srotc3lkzoruxmkrg2tomki9a09pzbfqfiqu8fiymxzs4bvgyzypj1fimf09mng5pf74k3l58g8824et31umzgd4haznsysk66k1gin81poh6dygymonz122r2xp7n25snounqs1oyqwpgmfkw2xs4u8yddn87gd71wb3m37npbokixne5qcxim96y89fldzomcbf47290d1ozp5o01f8uww9n86mv9qpijubvd503uqacxpyexeaezujrnm3b04ju9wskwuoygi40fykz2i43rkwwbm0c0z8ys9svwtucm4rgqp0ymlvgdjkdhykdwkgf1ylnx9ml3ee2680kpi4bxa5x3c8td19ll3l6pume8qvxg2d9w4k2vyujq3fare232ca2uwqi6dykjabdgzfc1grx2yt65ekzb32t2mobfx69r2r4u2ehbxesv2o4m2gg1qtyvh9jd3dktb8i3qe14zyz1gryftay4wxi5mxo9ensscenzaxtiysc4tz9e103ycc8ees57u20q8d36bwpmpsciatq314c6wohn8nwadweh1zmosryg2r2hn18adz3oc4e3c121g4wnb11lqpf9l380w1y387392ez7z9choujrujr0czjcvx3jnwfacmcdnh84pjllwx21ndzxxmwlkd4xawngrd6kdhi50jzr82cniah7wu7glrdjc133c8vqtmw2hnmlr8osr91ucc0gpvnoo0or2ih06iuy8orsdfuj1p6d6yj7hkatp9tpvo8shc0',
                proxyHost: 't4nwg7ufb7i55i48fp62218xmxg5pwcysoe8d0q412wwg9f3ay0d8e9cbg7r',
                proxyPort: 'y7excdua4tpxt23q33q3',
                destination: 'vxcn0edwymvygfrgjw4j0d8myge5ev7cxb7h9skfosz5ga457jwla5yynu875oawt35uaasfjvx3lhj32en6jqigf643im40mq0vgxfh4niu7hkjbu7nqt50xgrczpljpuvltzwciuithy96n23qzypce8kw8bfz',
                adapterStatus: '03r3qfifsf9wcrsfje6j',
                softwareComponentName: 'kqwehl63xzykkeslr4l1loogsq8w41b5z99k2ers6ud6wp767ae3hs7nkf30gfaxgqhfab9fpubrepnj1s1u2v1ygrj861f468ahb7jrn05cuwqis2mitoj6lu58tx5u6jpp224wgka5pxa7rly5i7g5q6hfxgqh',
                responsibleUserAccountName: 'f3p2rl4bjna8kx6jmr50',
                lastChangeUserAccount: 'pu5o57v6i2pbk349gbcn',
                lastChangedAt: '2020-07-06 18:02:51',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '2f3308b9-8169-4361-a5b4-8d1a0d57e67c'));
    });

    it(`/REST:DELETE bplus-it-sappi/channel/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE bplus-it-sappi/channel/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel/2f3308b9-8169-4361-a5b4-8d1a0d57e67c')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL bplusItSappiCreateChannel - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateChannelInput!)
                    {
                        bplusItSappiCreateChannel (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            party
                            component
                            name
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
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

    it(`/GraphQL bplusItSappiCreateChannel`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateChannelInput!)
                    {
                        bplusItSappiCreateChannel (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            party
                            component
                            name
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'dd3dcfd4-0072-4e9f-a286-3e1a3219c54e',
                        tenantId: 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
                        systemId: 'f25f22cd-3121-4c65-9930-f5dea13a6019',
                        party: 'rmaz42wfwb4etjp75uks3iq4grnduo79y6zig5b364neiyweylczxj37tgg9rojnu2oh0oaxyi3n7g03qv7ruh8jpc8s4lmgt3de23111y4z1ws53elt0iozr0rxz4jnhesi71z7760jc3cd28m6pbu141id97q4',
                        component: 'l6y56hgs6wif4drg0g6zl4ytlocbexyap6djun7k01y934dcpku2g5xvntyf4j677p50yf27jk84qrirpbxtfksvabxbdausvm049bkkyv1pogx3u3ix0a087m79gktkdagi6qvbxaukwvaovcpy5fbkx161ba05',
                        name: '5fm30vyz8psz2nqzenahfyuudhtqb9at0zhrok7kvp7buzmktyn22ssprp2xkmttycevc64qjf3mmod6aq2dzgiexudksu80cyjmgc3d5n3kqzkjvg0n7y54u9qrkc26yepolk5j3it8b4279lwh3r16tir0chmi',
                        flowParty: 'b9gf0lj9okcyosm5ksymlhzqgpl0csnrysffyxw959l1r0hhwgopfgx96tnaai4aphyukquvpd9wqr0dvppp2a2sdpb11coohdesock968dqadfurm6emsiavb1sfpzh1o9feob03y4bxnrs6xld2wsntrqluh0e',
                        flowComponent: '6yavgb7cgwi3hzl04j0l6smw2gw42rbfn1a0uwmgrdkm85u0voipfr4gljsd4hafr6voc0qc6qgp1uya7e92el5tes15p589r2dibio7remjiwornpb0aobze5f2vv70z6ohjomyz2c0rxfw78912q0mhgyvk0ku',
                        flowInterfaceName: 'v34b8q46d5fmhobdpws0i4yvterqbl6vxszyiiojbhzollc7jnbhumce1pjl0hrqyxivg0lbphm3gwxn1v6y5egicp4c5ofoiqjtj1imm0pq7umakyfehikp1oggovwjr1yzy2ng334wfk6zlfataonjtiremn1i',
                        flowInterfaceNamespace: 'zslmkwxsd3as8lm8suh0mcpni0wuo31fsa58mik7dd4kvdk95vy7xdf5rub9c7a0mrgku6hbxssxo2i4fe4tx87vei90ko8c6l4rgbk37uxi4ob0jfo7usovaratmbdogjs3swa6c5yjjf2di3oo57zqdclig6wm',
                        adapterType: 'p7nuadbrn25hvv4mnrvf4q0kn8scpmpuj5rodagdzfe75opuzri9sbni0xc9',
                        direction: 'u37dmqsp3urn5pre0sx8t1w9cb3x7y0616o1pvd921fo122jw69zg5prmbbh',
                        transportProtocol: 'i0m8zxlfvlqyq9g2iibaiiyv3i8g0blt892jtnkn6r2xnpj3ioy0j5jrw7df',
                        messageProtocol: '84rgwd8dydl1nxxfp3at6x50q8qww3v1rfyx40wjbtp1g2bnewhhf6j9d2pm',
                        adapterEngineName: '5ju8c0o6v3c1t9x76jugua6dbb3g5qfh9k0fol5z3t8i713etxsakl87om9c0dtebiow3s4wrp0ou5y2s09x321clfdhalnvu5l3q2376lqvlsft6uusyegxnf3sssh7k3lqft5celdwgfynisxcgsz6h0jcf27a',
                        url: 'z0s4r7eklui7nc6dwayymd8vtcey2xjessq68acnlhtupn107p1duhl6l2c56x5cg04fg12dieric7gx5ylk40bjojiujsvyues36q552tg118p7i4g801cwc14zjqx1jxeo2vmd28urjaqai5xp0f9kfa6oof94qdw0tag1i0tdzs4edagjw8ct13fcpyrxgc0hnvzhs1w8grlcau2dy5lu4d6m4os6xxznuft1jcbbjnwi49xzjiuozl47d545mhdp1e8pws5djzn92mxk7sfywdh7izu8eui6ifs35ec72ndpml4mc0jntcj8fx7a',
                        username: '466bwdavyxu8lvytrdhth9f5pegpht4emmzj01yva60b52soxtl8cojwd8jf',
                        remoteHost: 'p41i8jezzw9y0oqso9pt1ysvum87ubjfz7b2zryu1nzafctnlk8c0q51ff1sf8dhlns56sq38zpta5m7ojosbn7xfhivv7eg13jskycc7xey4yhavuvimfii4o30zyqlnc9kdmtsi780s8sl0t4sfa5q9xopp8rh',
                        remotePort: 'dxj6ymik8xetznbnly64',
                        directory: 'djh5nuhhwy07m7rs6ulo9quo55mucc4mmervxxyi4jwj6syay7381jrrah5dmjifxz3cerb4bvo76z5a6y0507r27jvitav2he2i249y92q0qvii6t64gk79h903bsv4iokhkhfbk8qecitr08ku0c2zurry0hcabxctlm0n2mj5o7p7p7jo7j2qd2yyzj1uprdxhuhgwrtz8hb6yukzfx772hftdbek8wqkshf4gmp3t4prcccn659zufcosqdp849nqqx5t7a4i3vrzgso03lzn1i53jy69zeyhh016gcw3uerq8lb3bafj8vo8njiukudoetfkpoqsc7i1mk9i3is63qojqkzrmyjs7nwvdj1c13v9zkuast1bzto88u6f7jvxh1n7b8u5v2msepa6tr05qiqkzx89ygfvw9n77bw9r9ym87dxqtmtpego25o1qjvzrih6t4iinfs165lwfmacv4w0co66czbhi5ikdjr0o665c3ljhojh6h8049zeksqcczr11i6vhkktebsfqpkhp1mt4sxxc5zf7ja3bavsco7u6w2xhhslbs8jj2y5uh75n6m1mbm15hizsjn0gmurxt5uaajkrat332jgtl2umox9qoduzxy6uwaq0ygf3xrjr5yyfs1j9ee1l2qs4hzppoa02763bdd0krgd4uwvxo1pzlttiocxm5vvjpkllxps40jqlkl80t4ufkts95i7o5cq57jaglmpe0vhp8whqmjadw3fpug5sn91iawk6i5ppmmtecyidpbbb7i0c73nfwvjleea2klhf4rxr1itelex7gnfvkd632xwadkqibqi9l8kqn07vvb8cqijhzi1g0e5hz91zkn6qzvxxkxor7i2j9a2hc8rjd1je182ucskfmqzfvx21cqd1lqasmbws51gokltot2ic7pblskakqyzz9qi83b3v56m1vab4r593z5myi39fdzx1sysibzh1yxymtyxbxad5i3dh9hvdyopxu2pxslv4bomh3',
                        fileSchema: 'n2pq61jdu0fvt79ku396myztynypxgnlsdyq6x8gecdwiooiz0qx4zv5dm6ftoms8nqt0o9frqlepsq0lrf76fe73a92zfbjnquix2ufyxt8np6y2moda8tn0jalkb9e0y4zza6fxi8i0r2l8gkx0rokqxkuvsjrn6thm54qdpdgw7e2nyj3huy8gpswbj2h6tiqv2ok1yisw6xdzcxxjwwqgkzl1fvndbpjw4cynjfhup9aarik637a6mozo5zhitmi1s9lipk2pfj54r35rm4dvj146hldr3i415u6qp8ubfl2krsa7j0i0pt0qs7n0vuhjtc729x3oxb6rhqa04buli2ve99bbyt1cet419rdb1c8mqyr8ji23zc7uet6k6zvyc9mu7zniq4shxv1p1fqn6orazq1v10h5khfk6a1zeor117k77eyrzj6n6abjnz9bwvxv8cd47usv3xvyfzv8lntct0ovj2tom5r2i32glyyipzv2zf86gvrioksyltw3t77bbz3eysned914sz5qostd7yx4qqejx48et6vl15vc6dax0gj67ddca2kz7e7twxywaqn37tat83lxcds71x0ik4q2h61ad4c04jjnpkjwm7dg0kciqdkf6ecbp6o668n0w88x7eedbbx33ayv737sad7tln35lvcf50k8xk0wns649bkhmcp4s09bazjnn7z6ee6qh78gmjlzy5007q5j5g8z3r8hj99vphpfovc1y6gu4fw7ud6crjlzyiqui5pes0qwcntj9drnvpns6prguehkjd97o856yjet31wggigoin45j9rbyu91wg8x9eglr7ysnvhighsz12byg3g6gcf7xf8rw4g0rqunjbajg8ytk0d7ptngx6fmmlamtj3lsmvx3err669meea9ylck2zwgbh2j5kdhz8jgmmatfyd56zjaisbat6d9livbn0dj9dvwi0fak4i62udfs207su9i93fjkgw0ube93l6k7rb5my4c7m21hh',
                        proxyHost: 'oxhf3w4szxouvftrik53vgwdifcqfk2czikcc7b3jtxnj75rxfn6k5pbsy3a',
                        proxyPort: '7snvjsz2o3xr0qw6v8w2',
                        destination: 'f51do3ytoqqzobm0wzxgleq1152138e3weorclvwebxp651iz81t677a6f1cmrb11eecosj907edjg71q69y7xks0go8t9gissoihs6e6iv53n7taxfzeoj2sotsmvsf5mgyspcbycfs75xyculdus14hvxt6qnq',
                        adapterStatus: 'gg9kut4f1xwuljt1p59b',
                        softwareComponentName: 'fnr2zr8sujfodt6922p7ymzbnev0nfn98580pf823co27j994utpq16bo7ol75w8gqphahu38sq2v2kntltkhrn8gkqjk083abpkwv1pjhqgwkakn2f454z88z3wrpn2zm6ssdmgzevoor7ugzixf8oxs4eo9rfw',
                        responsibleUserAccountName: 'kzcec23i0xvpdgnjz7q2',
                        lastChangeUserAccount: 'vcf85da1dshl3ypv2kri',
                        lastChangedAt: '2020-07-06 17:38:35',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannel).toHaveProperty('id', 'dd3dcfd4-0072-4e9f-a286-3e1a3219c54e');
            });
    });

    it(`/GraphQL bplusItSappiPaginateChannels`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateChannels (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateChannels.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateChannels.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateChannels.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    it(`/GraphQL bplusItSappiFindChannel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindChannel (query:$query)
                        {   
                            id
                            tenantId
                            systemId
                            party
                            component
                            name
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
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

    it(`/GraphQL bplusItSappiFindChannel`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindChannel (query:$query)
                        {   
                            id
                            tenantId
                            systemId
                            party
                            component
                            name
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
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
                            value   : '2f3308b9-8169-4361-a5b4-8d1a0d57e67c'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannel.id).toStrictEqual('2f3308b9-8169-4361-a5b4-8d1a0d57e67c');
            });
    });

    it(`/GraphQL bplusItSappiFindChannelById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindChannelById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            party
                            component
                            name
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
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

    it(`/GraphQL bplusItSappiFindChannelById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindChannelById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            party
                            component
                            name
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelById.id).toStrictEqual('2f3308b9-8169-4361-a5b4-8d1a0d57e67c');
            });
    });

    it(`/GraphQL bplusItSappiGetChannels`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetChannels (query:$query)
                        {   
                            id
                            tenantId
                            systemId
                            party
                            component
                            name
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetChannels.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    it(`/GraphQL bplusItSappiUpdateChannel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateChannelInput!)
                    {
                        bplusItSappiUpdateChannel (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            party
                            component
                            name
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'bb866899-7cce-48dd-b059-6226df8af2ab',
                        tenantId: 'becadb08-1f11-4077-8b7c-5fbf67221857',
                        systemId: 'aafa74cd-1e22-48f4-b0dd-927835aa4c88',
                        party: 'h9y7y921ajel039bp4yjfuq5if3ebcgp9qfvdmsv6pc9xhbo95mi1b5jv1ax5k3c4dvyza1daxyoxx3fl2yypwutpzlfnl4h3jifaayn97navy2nvwihl2xgjry0gajja7ca4p0duxqglug9ozyln9u0mb38e2co',
                        component: 'p2sacu8mjz1j9if1vc3vmuad2gi20z9r6n4ro7vkswdl75lr1hgz3uca4m8xdeex49uyh8gybwd5lvptxnzw662hhi3vr06xgxm0iq1pz4uln7hded1nh2joi6fjqvhmenmh3mqs8qi10tpzggostgqtarwtrgr9',
                        name: '4oqk1zmdjir3j22i1112il0tlh6zuk5yu3ggk092wn8rst5xmvk36j9qjo6g95at0lrr9knco5es71fg6fb8xt943qmdpmj4ocpdls8tswgkg1y5zgjwxqdmup2w1sji650gqkj1wg3161pro2yd1hus3ntjjdji',
                        flowParty: '6tv0klnpmon2ynx0o13j5pey78j0r1ocsxp03dnxr5en511cbdcgxggaogyd7usgsx4a5idul4w1pqnmlle1wzn7yoiibljs5xlw0jzqcx9gc4slcfzxlu6j6lccfg70ck7e5yomtl6yxullm93tyb6rxgb4sgha',
                        flowComponent: 'td6lfinrdmxakym8xlew8docynmroaktspyrkvexveo32ebo6hcaerm6yx56x68rquv4sldo9i8c9intiyyghnzf3m6gh3jpzjzbmiunzgkunq3relhhf2uvlv19ngw8yct7jdwtr1ijbavg2hid7td5oep3sqp9',
                        flowInterfaceName: 'mtxzd52bgfpkyp8dxyeuuj4pqiowyip18lklu9768z6tpumcxufqwwndeg719ianqfpu0e0v8kmp1tcw3s7tokx8elll8ggo74omaiwjwfc3o6qbxxpjpuq0dctnpx601r0s0510346jthv4bofh8i974v0gbqny',
                        flowInterfaceNamespace: '37w4fxppkp9cv8dytufh8q5iey6uh2ek96niu9jwfpb31n05a0v3l2pop92u3y3u9118kjilclzq3tlbo647alaosdiqzwcjt0ppi0e3l623qwwzktbwceicttqkxiuc0d495j70r9pnfxdkgaju1htsmxtynudm',
                        adapterType: '1cjp4im5gkq6p8us9znud0nikw0ojei1qitadn1qqm9crrqqk5mpbtjt94ex',
                        direction: 'pajxqb228lm98k319jubv2a9ysi76r2x744qm6bewkr1v22sxsm5helyy3c3',
                        transportProtocol: 'dfv5gaft6dr1qnfqk6iydne1vkfhww53vrlgj5y1tvd9r68kp23g8zclnq7h',
                        messageProtocol: 'ipngw1oi4x9wk54l26bcvae1hhxot67btam4o5ppkxnmbvxqrioiirzrlyad',
                        adapterEngineName: 'sp69n3naj79ovh7x6u6132skxmuqt1ktmsdgdeywjow48coml8tcrhpfn8gpvgvmt874e54sngrq6k9spnvtlmnu1e15q76y9eugzqtq7gdnmqt91f1capa1xswh5hwbtidrv0r7s414x7s1q3scjmvdh4am1y86',
                        url: 'txuswk8i8uyo5zxus4kfcnjfmr0wl1iggfrna7isxwe47umozpgzqdyucoyiolr8f1s05b6p5jho42ke3hho6hu7i30bknymwo12rzjuxb5hud9sjmciq89cn5ukkzdfq4rtijrialzyzzwr781j9tec5cwszaaimvn2rhnqcy6btsw0g0v8stxl226gnjh14izhe6h43h6ifhkqv1k0togukzyklsdh4grwwjaho9k7j63y88sjvb0ytebxn70wnr7ll73gcvqgsl65kw0zkhb4didgyh1qj3xuwnwnvprdpn7cezzt0qbuli8kuorw',
                        username: 'e2u416r97jdtlsvqm8b6ipt1tl4ixtk1yj8j3q4p8yil5wauhqud8fxqnfrg',
                        remoteHost: 'dkx31165xbmkr3nhak54v8hn5xup29xp2ar6w9k5aphz6900dx0hc7ckb69vmvewwbmkv3po12xczwnpy7e71vg8mgmuzhzjjpha8cqv4qdoxkxha0rvb73cfb1aywoz17lfi1567x5pai5x8w9wra3evlhi12al',
                        remotePort: '7808s2874jwdlduua7t5',
                        directory: 'gf763ngvh1l3mtqt7eg3jp7l3hh3fsd835miizgebsaik1i91sfwufhdk5cgd93avzehut7daa5j2e9ik2k5fsjqgqhzo7btsd5sf8dbxypwthty00v278446uqkn9h0s9cdk8i2uboud11oie6srb0s6c787gxg1rzf2klzj2ryy0ln6y3d1ou8i0p8respanxho9liiwytu67h399b8gtpbx6ka9owhrzbo4pa9i56j99t2htf38hr19qu9ejtmp0s6ymd9z89bsg6pcz3cjkcv8lyuwz5jddfn24nxovxhqto9fsz5s069czmvl5r4w7avb6js9xp28xrludq3h48ff41vjzeda6m6y6ktnmh61hpefr32wvylazz831vox2974d86sopazyd6ltrs7a43e85r41w20yszyi0z5rdeidb705nibi3cu2jarfv8iwqsx9wvy4l5kpeksm4rx1vb6ajsizw9l14a3dty9l4e9xfrqfbjcdnruhiu2hujk35eupdglziw6jyfy4pjv3bs0h68h8vf2ivjdgsgqid9lbjowurk4tlldar8pwjafeeiusyjc0ve38ux147wirjlq9o2w62qi0lnpyvutp1vzlvds500yapesiw0ka1ekheebj83gb4lpd0p3c5u88ks1yw1li4mnkuzg917rdfq402lh5re8v074gfnyrky19r1zle3rop7l6ogno33bikhya9ltharwaldn5jsavl3nntp9ozac9j64naalo43uqrr019h9uyxhcqjxbf0p6qp7jnmhrw5vyxg7foizi0oeaa5slhknf94cicn7ztj9ky3dtwpqso0634n7ja5um2cyhcpb11qr3nplyhgc5fi2xyrd72rq3c2t08xjlo44tth2cum9aubwmdqmuhtthzl8za8elyib7lhimr5n0ns69sem3fh1xo2h9jb0ja52q0uxxmxjjjhbldr1eeqja3u7c27ph2l46gsck0ucyfrhd62cca5zhlbiy4ese',
                        fileSchema: 'smmrzrvfsbmx8w7md9i6olr16xcy39bfmkjzbvceyegephw0q51fbwwms8xajss9zjt0kohd0ahqqruefkiiid517ededc3a8jfy3s3uku0txcwni1mddpoqhlasdmgc11asbd8sc5o8b2hqe1recrpcil71xzc5wbwexuu0uqai6tmbke7z4fr714u6c43gsc7cvr4eusq1ks2vsaws95gvpa3jfzu5qqxbjkoiy2rcap9fsyedgp3047u1ok6sf9g1n9y56o1i8lsoial1sqb9jmvnaw621zi0gfbv3l1uwfbxf8fn8hra9o8cy3hkvbald10rywtfksusl6rpbm99q4sypo3ec782kprkoa0a7mnhfwsbldw3o0u8jol0jbsiac10w0m5e4e7q2wcjzys4are7t429dl5muzffyt8ka95k2yz6xf9kbndg2g7jycuky3zhsil5y5sbu6y1xvt9xlbxuk4wldl594la6o2hwdgydxw4lqrf85ynd3fb00meod1vjrlxqzna2gw262p4i5ib9jwczhdyuxlqw6wglccr2qcwfjzxecd41hpn90d4k700wgfitm1zvukmz4670vfydwm450u2uen4au9crqhpl06foiwswrq7fzlph1vmr20no8ogprqdpgfr0jgzinpc1kxrkv07jx3onkwiv7dvk0odg46ci8jv9s198sk9sjulyrnw0tt4mck22if9qrwjy7d37c89p1ek9zqltprxav4dphl927s57u87bic2hvpe1tsrvmunen5ukhtbt5lszr19vp4dopsng6f9sllzowuwehqdy2uu6f7teduezle4xqf0psbn7ul5vlpwjk5vc0ogqqm2wguc9996b6e1jx8d4iyakawfhztfi7yj6muw3j6gblnibhas0dtgipslqnslwefqm8yfj4dmef7rj8ltdcb6j2ozn71utcz68liuxziqb0qf3tvetgvdco1zn90q5f85tb6c802fx0pllu3papejr83ge2',
                        proxyHost: 'ge0efcsuc2rnwgw9fsifzxtgp375pe27bmtlp1vql56jzereln9pfm0rp7dl',
                        proxyPort: '1sosbfkd35lqdy53rdlc',
                        destination: 'qywub8h2yxsfo64fl70zq0axaq6uxqpw4dktyxley2dq27gh4teh8jhkqrmv4xufmyznuc027pvjefui206q86rnxsmufiybfqbfxt661uypvq9q2g1tvr1l1xvwyv70c7gnr0as8ge9icr2q08cdgiieyenmiuw',
                        adapterStatus: '175omq4d784c2jnljxor',
                        softwareComponentName: '151mxdz3s22agmgssy5tkkobk89gfv7mfkvcdtwm6u80s9iknwovnj3e79orhtlvq7gu3mbiin77vnm026d5exeziq4bca5rupo256f4cd6vzrmucz734n2j0qmkx0bk3q93ocojcyukftziy2p82qvt5ih0ixru',
                        responsibleUserAccountName: 'gs3ze8znozha3n8787hk',
                        lastChangeUserAccount: 'nfxombda02h81e5kncmc',
                        lastChangedAt: '2020-07-06 07:38:07',
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

    it(`/GraphQL bplusItSappiUpdateChannel`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateChannelInput!)
                    {
                        bplusItSappiUpdateChannel (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            party
                            component
                            name
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c',
                        tenantId: 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
                        systemId: 'f25f22cd-3121-4c65-9930-f5dea13a6019',
                        party: 'ews2i0wxieg79i5g2k92jos6a9izg3pegfaas6pnqtsdowrdijr3xe19lek0rkjev4rehw2pd5579ttz4elt08psppjc72udwu7twq2m7yxy5g56mb9f2ogmtxq7lzogn793k34iqm6bp5o2tr67ace6x0eo9fhm',
                        component: 'g4lgon8n88ijcyckirwfcpa6ggv8ay0fl2j5wu6xsje3bdii9bmtgv21mg4pfqm9f8w5e01amklbsernnjgb1zmj2q14w8v50w4kxt6v83qzzq3v1kxkiaypjig9040qldin168q7c5ghsc46y747uiafe94fzfa',
                        name: 'h28ms6cwwr7cixjnyjpo3ixdn638ct1jv2jtqo6t9hjd6ne6w4pfkbcwm67pl6v3qo4nuh2cqhyjjps9vcqxg9aslvpc7onxdfrthbwv902q8oc4m91on5999jbir2tz2lt2nzse7fcno6wwimxhwbeztlgy1eko',
                        flowParty: '4088lubiqp8y8pd5lj6fcz8afz6warcyzp8hbpmwdj9ruvlavu60s3luadq1o7s109a5v75t5iv7h0eilm35mowxe2qstxjarmk10u40a72o9w3eb17sh57xq1x5lddvmapbpi9pczdqevgmhlrg9choefc5nz46',
                        flowComponent: 'mvresjmd4bkpgr4ca5mvkg8qilcvhqu59j7nbv7l87o1k3te126vlf2lmvde23xz28bmg51llackvqv05shungvedni9k98an2kmqfl4z2y2mxjnse18cuxqdnksnia7zcgjmcm09b931r7x0b5ck0sigwqocxes',
                        flowInterfaceName: '9luq0et1qlavc6t6mu95r2g44s13jye2z32p2h1gt1s5aj2t7utk9d3dtyamauvznod6p5o00p3fbk2xl5z507tod7tc5ey0nv64rgg0zkqlwcnl8c1o1txmljzwq59rnp8u7jk43i6salqc9met65i2nj00q04l',
                        flowInterfaceNamespace: 'yvh36xryw2v724fc1u4ep715ion8jns1ztxrop3m1w7ckzwqxit2757yl2pseojtf1xv8f8qh7fsewz01c7dcrwrbxz99od3d45zn9qip9j806c9uk1ajdwuf7vfyov8owzjqj5naa54gohlyon2hks0evskxd6m',
                        adapterType: 'pqljmu7i7jizjafz90t6xkmkt23mgza2lvboeu2afkwrptbyeep00jtlh4fe',
                        direction: 'q3i674w3wecxvx1wdjmxs7mdxcbe98ipas5gka3mdrpbe0m8fxjjb75sf6um',
                        transportProtocol: 'emskn7r724x9s1w5145nkiyh1uh07jusqfpykgtwtm6c7he9r7cpjp767x12',
                        messageProtocol: 'y6j12brbdd4ead86rctrhjb5bt9fmrw38kupjvioif04f49hmgwbfe2ei5an',
                        adapterEngineName: 'smza7j9p5f74hl1qen6n5a5o5bl4kn9o7jgqr80ew2nwo1cj68l89jfalcetnjuqn40ax8047etbzvgxlyadaoo8mb0xt1z7bsu583d2vyjd6rz1tmvghwgvbagvak38drb0ag1y9i2ua0gctl93ap7pusxe4vb0',
                        url: 'sx9og8p7e7p8oiz11mykv7xlr0ewkte8d67wtoi9uecr2nv1sj6jjpajve5bz55tsv4f0137lbrigvwiygtg7n9fw26bgm9gnpzxfewmsuq6ocehdgmr56ol87wfoxpmflqrb8u1qkahbr8lm0gq4sdfmpxfevnbailwnucq4vq63utlb0sb1ya5hp6e16m7eelp5n1wkt569iypsn6lmp04aozthtiyog4kwnwgkvcatl3pbwb06ltken2ieclwowet55qmqmnptpd5z5rrb3tgztajscdz6goryf57vno7nx5jiqgebfu5lfj6mrtz',
                        username: 'kjsa7z84qajdtfvj54l1vtg7pcglfljou6o8lwzvdhkw4bd24rg1bwxov5f6',
                        remoteHost: 'rb5nc85vzloczhhp1s3w3j0tvjz2nkqy3fuwcmqzzg4hxqeom989xlsj339qgogknpvwjhfj54zlt1ulurs1uid5t8tct0pwnrxqyo36yoc2i7ipeu5iy9cu4s0idh8fr1hf9qxfnzw2iv1bjdpk1zwhlhqis1tj',
                        remotePort: '1dyqca6kht2lrvvo5bhl',
                        directory: '570gjlads138f8gxk4xju0qgparbfehz4ksvb8guw2341mw4yq0o2s3elw28w80or8er3d5mnt82a2t9c6x353uz5nqmzx25rbj8787qwjptvatviszlkxintomrevbanuepvnr9b4b4jlm48hbedll33q9lxk98ys47txfp7ha6m6o9wivuejnh0dllfuvbjcn8rwl4vfz6oflfd4229o73i8ftgkq85ndyjepyzadcpun3sby515n1e0i86dd6kzcu62df2o478wgt0kt74xn7ahfgsni6jtg6ssxiulfdfg7rn73irq5xmrnu99s5ed3qoeepidnd0i8hn3dbmiwvs4oc7s2cetslelpstk8400scadncxyl8qna634kl9j43fqk4zvd1rbinunzgsc2cwk0p9kxhjtmu2gytz6iivdirdwl94buer70hgl6vrltat5achua8w2zpk3ae0rpf6ge2bzslf91su41y2cxkc0fwhehdhmmqhflzsaweho5wltxke6omcqrtvjrx8jzbj8lx00fmfp8frhlyvh7sl74f21nqv3e2z88so0q3v614jvnvg15d4pj27hinu90l7efkdkbx6y21ccla9rye6tepfafa1eq1u8t5lsj6xkqck1an1t16mcxfwdau8djy2evw759044m4fmtulg8mkghztdob5rvatsrqxshpti3geco9m0bgj5kbkukiz597i6t1l9fl4n5s2zz0tpvlm6tt9d44ey5y8mvtc40vqw43aj6hi34uv2e52vg7a5m1usqsfi8ssrzj0cagcmoe8n21lx308nm8cf1mkq4o2md46to4pls1zfadalln2rcx75pho7088z0ijgid4fa7r5m0luvrl8zlu6cdwj9bo5gn76ut5l3hpx38xwxbw5chtby8t0noclpiggwve2ew3059hd2xaeokl901rowumleaafougpc293npe47sxnct7jvh7az131awc749dy9nlo88hpblittuich26tg',
                        fileSchema: 'xvzt0oxxoay00stjx3s98a26egw7511j6s6w7r878bpcz2z9q10kiq21ajr6ajkkchn0jn920jcjmoe840ql20q2enumbcy1ft4f2p1cwaz11prdh1szozndu8qk6kmualq2o4evduya7f90yko52qk6ytod4g00eatrd2ibnuipnxv30ziumszuag7jkwope3keq51rf9v14nzepd8i1zfvhcjkxi3xbs1miml0p328tezqq633jd2zn9b1t4y8jm6ufa0h3mw9th483wqs5qeot6p9dj03unio2d0abma4qmnwkka2cqoj2e8q8r15hha6cft5dswhktuip8crarnt7qiqn28liqr6wjq10bp7znqfssj6fvou56boitevswu1h4bgvy46kgx3fuza31mund8ed26oaby1d4ie8bf6n79zsgonor6p7zl4qrrf7wvy5rwrsbvk15d5jz4pmm6j1563ks1ac3iiiuvgjjc9gg5u2og7grtrr5c3od370jnr6qwdqsraahmys0ne1lo2qv48njvfjyeqf2vdwxrsisr3qcfkfrp3tw5xryxrn0ff73fq9995gpfjc334mcagwapjubp15fyn4i9b4lqzypu0jwx43jolcsj3kpifet6ajokm3725w9701qjr00bgy586tmssznygry6bqejbqjsl9vu0i8bt4s91gimx1b6k28eww14ta7ztfih15q2e74eag2q924fayo5vjcnxzr9eut19snop5a2up4y2fm7drwx45vrkgiblrxczf1r8plt1psrl2rz7is9j15tbqw6nc51cpf94ooup47i31gnup1xh0roe95j4mbcdqi5bqccrm0z74n6j06kxdu59mu1cjfmjmkt1a8kcmilr2o0624yxpyo2ut908ln65csmprp8xtl78i34aejtf3rnfdoqqqxy4xox4ln1cxfvkviejo1s9gy10rbnorejkotenxb2sm1oik2uumyys6ti1lvuvm67ors1o0ufrcl',
                        proxyHost: '8z4p1f580qo3wtvpv5rl3huo6t7kvkrgv5qg3j1xmn99hhu3xs9xgeovli1c',
                        proxyPort: 'nkb9rrqil62m3ylrzsy9',
                        destination: 'cm5ynlrn1jdfzuveauquys6d14xk19orlkgnrxwko9lpuqbgoj30duhed1bx0p70h82016bjfhh0csjdiu3bq4hamyaz9njuzjeeyj6gr78xl16js54ccip4r9dqlo18fcr70gyn4vliphlxgex9bf8vrwq7z673',
                        adapterStatus: '0ai30n0ks4fp3vgc6i2a',
                        softwareComponentName: 'phl34aw5xxloge1dlqxoni8swrw20x06rzvy925k0nimj4sktokpoffjn5kmabt7ugpzq8geswwklu3lbeycjc01sd6j6k2db3p6gxpwkor889zsf5h2ipv8k86wwdg2dq5gdo63xd58g0blhw7wg90o3vilsgwc',
                        responsibleUserAccountName: 'cx5d5h6wnbalbsh5v5km',
                        lastChangeUserAccount: '6dc044nyguy44mtjcbrx',
                        lastChangedAt: '2020-07-06 02:19:04',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannel.id).toStrictEqual('2f3308b9-8169-4361-a5b4-8d1a0d57e67c');
            });
    });

    it(`/GraphQL bplusItSappiDeleteChannelById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteChannelById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            party
                            component
                            name
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
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

    it(`/GraphQL bplusItSappiDeleteChannelById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteChannelById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            party
                            component
                            name
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '2f3308b9-8169-4361-a5b4-8d1a0d57e67c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelById.id).toStrictEqual('2f3308b9-8169-4361-a5b4-8d1a0d57e67c');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});