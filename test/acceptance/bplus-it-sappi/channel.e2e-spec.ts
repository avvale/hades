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
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('channel', () => 
{
    let app: INestApplication;
    let repository: MockChannelRepository;
    
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
            .overrideProvider(IChannelRepository)
            .useClass(MockChannelRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockChannelRepository>module.get<IChannelRepository>(IChannelRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: 'kkvl9z5qs741b1w9dekvjp5ms23rx3wxqb3au5ih8y82gh9rlj',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: 'wju3sysga8frfwujo55i',
                party: 'x8s335aaytbm6arsca7fjnj8imqsgu9yo4acq4erlk7qal41iq4w8ypnbusv05ldlhsuod62nqj9r1o09hju9t58xxyq06pmw89inqiwr96yz8fvtac87xecr9wns2bhrioyptgvyljjk10vvispr761hej892qz',
                component: 'jx07mzi9r2jnqvo9cqr6c6xg4j95qev7hdjwggvvlpppt9hejiabauxufic13pybyo0arvhiwv4gli2e4zgptal98hogzrzlamgulkkco99f4ovxa839kifsi540385z9rn6984wqv4epsj50q1sd1hngi0tjphn',
                name: '3ngvhzd9zxurzpzzmpol56pkqygt3qvgg0dm5lez87zj9ewvvhqt31legpx0b6h9ajwdnrr9q18e9f3bbcaz88yetwox35zdk3nvhtr8ta3frnfr034yh8ujjsyc53b1ezglii7ke4ix1lk6ua19cp8ezi5j44r9',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'h8tnel8u92isybx39lr3i0o784txvwulaem3uo1diiwqqmvonw36jhgglcds23agi7mdv0f6ipkut2b76u7us9d3uoj6wq7pfxhuva9gd9q3l885wge4iiqnbajl0zaoe3x017rar8ir15h7fc8ydxc4nk7tcgj8',
                flowComponent: 'ta5156egk26ljfnd7t8xocofkddcp5fd8x1jkiyadrag39r9uuclxbgg0v1qmt3hqxab7d4qvczsluiched7biegg7utrzjhps5nqh0sx4uke3f5bv3lm637q3i1363omj1tbcl9xttp68lbdctblm281briudfx',
                flowInterfaceName: 'iomi1homnx92251qr3fa0g74k3k8suju1paj3820cc6zkzjf16uyl4v1ab0wj1nfpf1ge5nhvpvbcvzbs4finr6h8k08d8rmr03be8lyu757kwzezs1yqhouqyr9eonhbmpbsa0fczdpbfqdezowpamflwb3nk8c',
                flowInterfaceNamespace: 'awy86txr99aurbmnvihu1zz3rfi9tm5kxxmhnjk39s6md9rngwvfzlfmju5vckfgd6kff7a4d7i4jp0fdabjeiwli7b0jvevazp0lb9ri69h12tnuk5df61chf3e2cxg99fokkmb1uau0zuvsf92q947be3mq230',
                version: 'z9ddeflnjkl1zltrr0ny',
                adapterType: 'zrennf7wxfinl3f8lhniraq590eoxa2d9ppv1rl1t7lse3hxl4a94ogg8uvo',
                direction: 'RECEIVER',
                transportProtocol: '635uwsxa3yvvstygxjqiuzg39cfox1c3b2nitunptig4f1jbypfzh50s4ufw',
                messageProtocol: '07r6y7y1c84jy6326441k1xpduwkx8ibzvgorswnxd77jrrxmgjlpzpvjtp6',
                adapterEngineName: 't3hli87ndw2rvvesrnkgaaj276bi60ild5xgbnu9vj6t59qfd9w0fzmvl1wqfu5ia6nt2j44ep1j0pi3odo5ga1vqn3zh5jx1e7yl9klulapgxhpkhl5lz1cio1yb3n8xy52f19aho44i1vq074a8mj9iiklbo9x',
                url: 'mo0quzn6vuvf3u5rqyxoexay0v2yt8ic28zfg3o112jng8u1vpe4ubyro5pyjqmin07rpmjy0hk0qgpzskx3545bvvgz9tlswbkxu1jcxypytzwvdkg5w2gr11hyazgccrm2mph1qpkupngdnqbkq9lpg0vk8nngiq61977e1zfmww3yt41q3ojalsqa2t6j67in6ampph0ha6z4ai9m0z1s9hqd8utgjbkzh6uk9e8frlmvkvjkbp2mubyasgb0h0j14pv5uov0mb3cgbyouc2snk47czrc5522oej7aw8xtqhvznfv1y7fc8prclmg',
                username: '7go4c1a2g6m4fcwfzjxu6ca3ncpvwh7a0o78j581gxfxnbl287e6f9dqnjkd',
                remoteHost: 'gjuhhmiqtjuks9pnwrd3upbwi6ak90i92wrnnfmtl512ao96fit1hz5fs3si2adh45szndqhyctvi0jkg6ag1ph4c0za352k36hbyfji1a7t1d7m06ph0m2l9wadrcpwz3ee6q1rt75mzogsg4cd7k6mbd32lpqg',
                remotePort: 4146659156,
                directory: 'can3llaim24r5epzyvviw2c89snwjw8kqk2x02iexrcvij8izsdha59zpzf0y7360v1zqhu3yx7wz7r16km6talzx0aeetnp0feaess0i0dv8j3dui500qokuo321xc5w8xkkujvi42yw2184bqmkv34y5v4knkiuwjvrtpotl3xpdqx02a64xl8yvp2kb1ym6539lguqju1v45ehwiippj4st0zlz34fxxdmimt28ujslxxdhxy4qxa8w4psz5j1nou9yrrni6hcqf28agm7a9jcqba26csc8qrb063vbtq39tencu4r8nbn6zy902wsvem6vrt7qsnljbkbnvj1nbaice47c57cas3x3fknpv963sjv1ba5no6rqye7r0n5miq8mh9we7uk0yatm874dq4pi48h0aqg250kqbv1byc33afpryjczbvand402yeu2ib4esauiq6yaejzk8o4dk4d0bcu4dyc6n849yclze67cc459o43khm54l5g7rxjf37cl235id5fjl56cfy4m67pgr485zazkf2x32zbfgd5j3uiscjh8eytv120yvk39qx2kv9l4j3wsf3jajk1ujgb7bban4x44f1rzzymi1s85b0sgt0862bxh0zm7e1onl91os4wcb2bkwz5v6rn6u2lr1q4o3e9seig4p68nfed3was5krrqeudq1dcuotq89a55621usqkjotb9vq6jvf26q7mgathjcyc9oyrz9kasj91qr5re7z0aw8nppvr84nzqmozxwa6p8cykitzxu1ic5l30iq6vrs92qtpan35efbokbfhp2m0y5ca1znxboc2uo3a7anwpzstjd5luuk22ftbppbu07e6f3xgkx9mcuipcaq6dfkll7a1vv0v4phe5n84ajg6ralz31tcth6n4sv2d7kxw579o94ctsn739z0tkgj9nkzr7ge5gb0icgq3iyv4yhiqhorkh83kxi0unmqc65vsjn7i5yogn5u7ky3hzkgfsxt8ptqt15',
                fileSchema: 'gnsla90igpp5g6luv39bgkqjcwtgkvb55w6f3zb2evvp7xq93taenwy4zbvqzi0k5j4l34mo2h1ilx5qcns1olc6jrwj9wit94nb951ubg40rnronbr0a8yt5d614dza0x690zdkjfficnskk58uufrja0d7fkgk3lqhyiguej1ti1i2h1zdfhktxmqtsjgpqewij6bmqtb8ledrx9trnieyvbi2e6iqp3dko8nwq6dicxjo9m21a4o1rcrixv6h8r2mvhnn8kdhfud3fezqo8rnapvtg4vhmnz0jqpi6q3oe6ef96bxx4l9ljdpsz4vqbummvegv4cbvk5cu7ud7jpn66eqjsmiaxztqunmpkpu0wlp4t9vbx9fd165tf4v2duubk72amyweexdbkhb7s2st1lofukbpmex4wy6akpw07101jta6hi33z0xvuxx40pnv45bgxxofeibtvm92vzx8mpjgbq5l9cvm8gv7w8uudpr3ro54rl61rfcu9pmkayu8ho1th4vvfg5ygyhuh8hkiq4ajatvef34g345etirxevjfrdgktpzrmry1fxqgw63ngr8debha60f5vvrhijpfev586pr77z56njhi8xzglgwv5tsk6ta4dsmvihi0r275ksdtpq3fhvbbzl0mzmklk2z67c9aydl6vsh1elh3czb9cqcsl5g7my9lzpl79gd6q5y3g4vmec9glug8nlqcp9tudtyajpo7aytaghgnvv03hwwqvny41rtk3c6v7ve6x1o3hlf78xcc33b1uxums4tn8boiui1ieram0fb259paa9smbegvlcznwsoq4pmygdfr870tv9awogdisr2zhbjd4jzt8n2vwo7cgctwtv2ivbzvlh9jji27wz4cyeiqa5qyv5ipymxde3pvujajwfgc9je89t8bqte8std8969xsajkojigonixtzl0wbnxqr3r571owoyr0ngcq7kuwiaggo41mv8j49crfkx35nzkv72wekrtlizh5i',
                proxyHost: 'u4lojki4yqvhfoj9ows26gowq403kc3xrfwyr53upg6qb9fb245gfpqzuocq',
                proxyPort: 9259798841,
                destination: 'jxvjjcbzofu7ry2hptynfpy6vwweshvf92bls9l6xrnq1x6xitqz99jahhrvuwo3weaidvae11i450r6vgl08ppbstbdj0r6qe54rgzq8qf1ozi0f1f7jl9sqgowjj0eo0gosxucek02gflhs69uut07jskv4nqm',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '2dzt55cj5mnyr1z7mka8jjv5vixodvir2jeez11vqqh8hxsef1hly6jsbyeed5h2kb90p78pog241fqckyeiddopufkxwydwoyc6v5i0rot8zpkuo3ud1cfl9bb2pemyrxx3n0ew1hmqx4qypv332hersocq93il',
                responsibleUserAccountName: 'x43p2j5irls99tuvjmku',
                lastChangeUserAccount: 'ir8rcojnee5b9ps4iyb9',
                lastChangedAt: '2020-07-27 06:47:36',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: '79za0dxxa7xl3vl06xdou8cgycz1e3o2qh2t1cwf3cz8cdwkxl',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: 'gwehieu5mlb38wotvj1f',
                party: 'o3auob3h1rqv1b50axxc2gonv96967a63ljy9gfqd6uunqwqigt9pggsex5lvu2ajgzzm58f3jof74at7cp2c2nj53odn3eo6yvxiiq7b28c1t7392x8rtx8estdbbehmxmqkuvgna467tn3bsa99ym678ylbm7s',
                component: 'nawdp6cteav6jdj23j9kdkpka4i2dw9gue5q1fl9xusc2a9bp0axo563yg6x0edewkygklxkbp4559bv07sxgw2hpp7wc1huakrcb85psnmcksjq5a3gl887sen9ck2fosiczo0g35v6r30rfrl9mxk6vk1laweo',
                name: 'b6py0f8cqw35qd290kl7nqa1hpnikehkx8a0d9ir32p05qvwkvf6sgatnqws1bo8vyb1p2dt9wdlul8u1drcwsb6rtac2fm3panfxhssdfbqebdn5kjujzg38q3old66m9f510pilqcy3kjz2qkniavvcnqdv3v2',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'gzmljc4limbx63w9wqc410kmuemxumj6s5s8qbat1qlljq95re7jf5dxlee1u42bpgkvw1fbbb03s10710wwkxa8u1a8lk706metef81bqywz7a4vhicmo6juvmpop1vku4dpvcfg5zduo0a35yj79jqt7yyvd42',
                flowComponent: '4o4cdwlh3os570jzofy3ho22zqwl5h133vqxzco4lfe5x7f9rn0hsekcyejnpjayerettuaf2fjuo6rcd0q0bb61iet8q48mtrx3gqdhstogw15d24nuky5bcxp2gr7f29q9u2tzck8iphqh1hmjbb7mixoka0mn',
                flowInterfaceName: 'dkwsbr0ekafmj5149posuv8gc67xppcyicyphwzbeop8lm3gwonhdjsl68wa038yfxy5lki24uj7my45qp9qsiyi8rcsyh10ojn158frlj76mb49n50pgj2s1b7ubfdu84pjycwr58cevp227ram6jv5nwppgzoz',
                flowInterfaceNamespace: '4dtfsuc41sj5oj16xwgcnhti4b3x7lyfdwczlu942tvt1r0ku0u46gzdajse59e86alzav7qe5j8dgbc4ea4n8m5ahc6rbnq0y8g60fnuehl3f6i4uwdzb36w7y9hawdpv4aejyyi0fmg2umujbljt8p2rol6pnn',
                version: 'ea3afof7ywiijdzt8xly',
                adapterType: 'o9pej8v73guntwzb9ykzaczitm9gtopqt3atfi07murpqekiewxeor1h4v8z',
                direction: 'RECEIVER',
                transportProtocol: 'sj318gn0w62bgv5c4qf4wxe84zxh7057b5cgvb2if2cycy1rqf3sm04hlj7v',
                messageProtocol: 'xn390z1cv9hh58q9npl0i3uu1tc8npv6hjlryci5bwe4w4ryak6fan2rv2ug',
                adapterEngineName: 'w4g65746di8h9vovphy8vfor8455koy2v9wwifd84niiwemqud6iqev6iiarwm98pjvl59d6eqd33ejcgeu7odcz7zfmgbz8wjajxiqc4cd4qamuqq3ix4r590elocj3e9hq7u3mgun9fj5wgzamn1bb12x1pydc',
                url: 'zlgavwcu0clxmn7zeyp173r8br82nkj0hm5tdeg7tm8dkjbmben29s0ja1c7si4jgh2vca4zfger85lom3yi03nx2ryh4xfbc25ts7yz9spz4lv7k8lxo9dq2d2ofmcfg4gx05y4ifqbfnx6kagracvu6qk3qef3nz04odwtrjskvxev001h0wdx863fg85gy5nncyawdem36yva4rb2y17lzrocl31u22306i5xepayo5ekbhgj0upm1gt0gpw165vs3rq2pw835mhjwp5ru5iflpzt6pjvzdra4s20ltgnfr94re91wax3gokslq9b',
                username: 'q6rc1zfwotd4cobnonaiu80efx5id9swr0q8n8h2t3hg8ey5hv8xgm8e39zi',
                remoteHost: 'mmzosoggmudgzk2yjj3106loa44lhfn1wygs2596u7qwxyq1cbj8n0ka39ugzrl5wg84th9qaoau8jgcnin6gu61cpca0bsbzqyyq1rs9lqfw0cdqkl8falndfoizu1gyk0f1h481ymr8coaaytir2iokhhht8fq',
                remotePort: 4225240639,
                directory: '6wep4bpc1qsqk2zyfeg5pfzyiypr7md9xsyqsoc8q3w6cxjqhkuzhgv5pzw3a05qq86uv4wnsk4jug1xbcilre3qeryqpwj4bw746zkl2skswcwfws1c3mwottalhdgetuqh5bj306fn9ax8hzznwdvqqo8yk4exxmbtlary7omagw85ourtqmsi4fq9hftfva3omcb0p7wx3vle9fi38nzpog9l1l5vsfuh4irccknxnlk8ro7jo8db823o962uds3at2yegd1ocj4vg74m3v2lwxs041uylxlh7ob7dfj8r2hibhqef56rebelkeq5ak3trg98fx7yx6tjojpsbv1esbl4clprbv4pzhte6oigj0fxj067jb2sccr7xyt5r556fu6u3kh1ddsoat8fk90j54lhl59ym2nvmg8du1y3m5366u8a931uxh3tg8diqny5o74d5t2rnxhrklyejufat85rlvdc921j6ffpmskcvhj6kp65fgbqjexqs40mfv88xrxi8yc3hh6h84y9eamytgaplqtpegkjf742ncvqjuz48zygdkr7bn1tkfros2kkw98nn9k8ckob0ygv22nfbjh34ajg51jp1kxmcr7gipu7bcm3c1pof2ajmjpsxl25f75lf124dq5yarrdslbqnltpou0gqsqxkwynq2v47ksqqgtn73csj8s75p4qe3j7vrzdl0ygqts60spik2wjqr3r1i0n9jhlgsh0k93xfgaylctfuslt2szeow4gl6zjw2hf2n8zyukqt9ieaxnr73p66x476v3xp6hdtpp05fslqhw27igfw5iso2ct8goj5e1vlq1crwz355u5t4fm77xsld4v6clr6hdw97z3iu6gbbg97vbtcbceicvthen1r46os8mcwcalsnkyi6a04z3g0tnop46rccwl6wy308ot8sx1ilfeo89bi4qqygl09usuvgjkn5s0269ac0ft31a1mpmm2al5zcysq1tkkkzhcqh8u3l92h8d2plc',
                fileSchema: 'bw76wqjxks2mslktfjozwqolvtcs17ku0synsc331meyv8tt46x4ysirer5mmz6z0gzn7441ukyie0lbmeankl594hr9r5bhj5bnves7rfiwgi8ts1c2przln7kj20rm9adly5lk5c7dcvonkfl8zg8k50ye52hpeboo1i3omu75sfydvt8ppeybrh2yxq8j8e593p5cfrr8pk1ckmjprtle6qiuw1yfozz4w9x1u7qc8o658qw5b8diamkil9n0y9l9y9gvhcvgfo89zah03pjcvabqrx9zmr80flezqza5vzt5iy1w0nh930417b0ej8y88piyjm0frpvzks5332affcrainixae401jo35osswbbcycn9b709ykb2toqkcx1tb4r184589vdnzotw3pp4ooz5822sfppmkm8wlhlz3eum7t1zvanalhck1bpc2e4gfddo2xzlh75krpimydvpuqpzipdi9740xpfvxokoytb0aldcodndawc8afwvtv0j8uhveq2fh98tjhdpgo8bdpeyx1sqssusrc0efd3tiknbxmqkbqidlu14gxsya6s521ng2su1w9pf9fj6hxnn33s05m3v4ja7xk0jvjvjhl5kjrhqqyywq2hsiq6xatkshh9rui7rxbfha21xygngqhk3xxyqwcocxgdc9ma2d9o613ui7vhybnu8tfu0zpfwv3qcb0d4jxf6hl4mbq5avv0gj7pk5yhkk5ilo29k69oj1htx90eognfc24npwfij9bg0x4ymk6h6a1oaarp27dd5v8cj48c1lba04a92uvyd0pkaekrpc34xft1ke8poz7k3l3zix0ti8u06io7e2z0jlkdoems6v65ei4rpw2c69sb96lu1zl0s5ldl8f7gmxy8qwqjm8katptisni2wgtqvqci9nh0zfwcvh8vvnd4u08daagkkpn5qzktilvf94t1j9rlufvr5gq1tunv2pi8c4frwy2ieyskkt8tdvz3gmyafm0255htaxp0',
                proxyHost: 'qum2dcz6k6g11it31m4danqjnw5akxunyv9q8lzdt1595d59timu36qdou7d',
                proxyPort: 9359515772,
                destination: '9r0xhg4y4r8hqrb0l12uk0395v85wrrg7kk2niw1ixl8roupd27hloackq3myfesuy0q1cqvph6tcfjs5p1cmc84pvh5hgxtlwt2hy51zbvfa5pa0xgu3t9zvsnwl1b6ryfoxh34kted8ef7dugd9jt3ube5qjbr',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'q4vs9qbkuep0p2kqt452d8hiehp8hw21sdkvsio1pph7dg3bxibh7iryhrvtlh82pj3v6gz0sym0pi28axl9oug5b6tdgvuj72txs2uupb11bufp7bzqynzaswsl94ganhtjddat62hjvrrg29xzo0dd3b3llelt',
                responsibleUserAccountName: '15rfa1xzixdvekh0spoa',
                lastChangeUserAccount: 'en0mmvsmljxce8ak07x4',
                lastChangedAt: '2020-07-28 00:11:17',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: null,
                tenantCode: '7uc240m9oozbiy2gnfn1b408zf6pzra903vflt4qhfyo484ggc',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: 'dm56cer83tx9hfkhuvk1',
                party: 'y33516p9vvtltx202i8uqb0996vch33a7zgfquwiwbn1746zkegqo6h9oo43tb47jvwa0hoask862exg7fcgajdzp0vsmdif0uuk28ubobf0e8hod6veh5o0hymu5bugq6nuaomcxaa2u3yeyu5sg0pef2mj7471',
                component: 'pas2t8qfmmcamkfqcr2o2jvou5l9nxrk2izekadvpg5xknzijxy7n8cmyumg3jtee8u1blooxhj7l763u663ctzvhky657987usa8sa8pip0upfr14x978tvgaoj8awfcdweqh362y0h1v2qyvq8qk3y2ms3eoa8',
                name: '13t4wkp2d9jjxic6r30cn73h1ffkojl5xll6td7rgt2yo5y0pq8qf0rmqhz7uy02k08jbi5zimkhq1gyhxx9ltzxp83ltj33311t4jr89ge97lcyhlgtit9uysm5vzv85igpqwwrjndquma3pgpgmuodd9kmjf0i',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'f4dwzf4db0jjxjwuc7tqaqu06v64ivc1nlldssgx2xgp4cgz9x0a3a498m7ikg7nh7xfp0kw1eanyuznijn0e4e1jckxk08xh5ab1x5i1jjcjssyr6b43hzzzn853yasrpk3m617mitz9jfg3l4faku5h1ecrk1m',
                flowComponent: 'xjxdbszirqpc9s444vdnwt0qroq3dnqqg9kjzbzgmygf4o3jnd2kndpcnst91kvcnibci9vwe5w5ce3pgdk5kxcaml6b01xsf6zxn8s2krytnu5e8tuxquk8gaq51tshmupam1v3quod51v5sq1w2fyfmnim617v',
                flowInterfaceName: 'n7jjtdw01qmcxaipxdck57yc0kkiei8f6mib3v9ijq2tov981poehxazivulwuwi0fyu9jjmxxmbtvo5gzvj41uhaltrklv3go8equqrt09865h198qarkdhxy875s5xi75007ip4pt3sg0j0oabhb7l77umouqk',
                flowInterfaceNamespace: '220h8bxzn473l3m0b62fz1c31bxezrujgc0qvktmfunw9wb2o914y01sqy2h8girdzxw905uvep408ex7uy2mvplmz1ctzvpt16deit87ojc5tlexppyc69k5z417mk3u3s5ghfdnnwlivzgnipnzgiv6mkmi8ne',
                version: 'rz98ol5idzi6h99mvnt0',
                adapterType: 'biaklmls8l5nu3vji916jgw3mc52i18305j6j5uqgtduwkynd9cq6sxgiq51',
                direction: 'SENDER',
                transportProtocol: 'dtzymoufdf4x39zxn5f8tuyjjcniz0nowkv3gt1m7eh8kp33508zkauw3elr',
                messageProtocol: '13jyppds9ye2vzhdw3kacsz5cpu9c0z329n7mokxxr48gnbg0y0ivx9c90kr',
                adapterEngineName: 'xzjb8d9l7h4iftrtt9s318kvxhr283et99lttcgasnmwzlq94t5izhssavkzb7ic2pjkyl1znwt8sasn6zqyj15dgg3e0ugspdftw1wdl345c62osd14hzmk3ebbbd30ncqze9dstkpdldweuoh800qrrp7o0kb2',
                url: 'xo3gn44d23xrtfk77bz70medan2cnjlee9rgka86px5g7bnf3fpt77aim292uz3pbwheprrmlmrtkayrpsitelxtcdc2h5rm5ikkfdb804bstyco49ork4nxxpm3a696imykrqdvdfw47axwt90a98ofes908glnrixyq8dtt2b1q5hlsw3z0ifpoapirmfriuz88hyi04woel7l75x0u7w3k18m58acpwhapo9lol9d83g0stxa54l4k4jyd5pbw9ow6pbmyy2e23z4vkls3ug5wpwy33adl2y0a84z5m6rzpzrzglgbf0el6jfyfjk',
                username: 'l6jqredh9ye95n29vw72x202f9avhqg4n3mizc61c39qekxx1sju6r06yyj3',
                remoteHost: 'wq3le385op5xdbowle8s78r9radn0edkvpy983tow2ch3n9n6gimzemynsllaey3uv2le4jfl4vtjlizs8mmlp7bwvka0jpvsfz50qwuju649q4217a2j0d35b4elpcdqnuq4at6d3sx7kp7kmijts0fogt9erwv',
                remotePort: 1520981147,
                directory: 'ww6bgx5zn6hc5qok77cfnema1f9891yts29epsyku0wmmze1uhstjm5ylmy0wcg9ttzur9w3x0duzfaj60fdbnnjy24zx527spmd1svl1i0t8oyhlut7tlo04alp4cdpgl7l5jlu6zdvnb0qjbugg3f08egho20108u6p61s0udqva14jn3btnvuznp2re0b6z7fzzxfdca5hgrtzq3srtc11rdydczc2up4ufmfatfvancx5yi190tay9a2xespbw1kj8so4qmci2m1fk4oi0j0g23wjiion2olnh3l2b626b2vt6dil7iugn2frqoim12nj3i0jc9bg7ndrjgdr81m8a5lqo4kk6n19aiidjd1277jmre13qjpncllrvf2z3sfil5dxectkmd2f0m8an1cfrlcbvxynlgh79kme95ymk2bz7xfrbunzb4fci7jm8a919qaa47eg0hzpecyhjt5djzzzd8at5ae86252l7x0deqeni11wgyimrrbhls8m6swlg3hgdl9vvv03qtvxjlpc0v8kz26ebe4qex5c4jr0tpokvv8fqn90mus7d00c7jtfedkcm3kp8igwxzn9einyk3trldzl7tmd31rxhxpvbee7qd6f8t92c9o044o89rwmvntui1k34s3g2k0hfk04ilc1wzi4f8zjgavtoc10si95q6hgl6xunrllu3iz4oy25vx3s7k3rb80ylpnc8584de3j9f115dp3l8pnvgs220ppg1d64jibdtwhjm57ix5hc5oxyiznkc34rcedwh8n7ojslqfqjsn04upwu3djj844wxe4t62szplx87cajwsviup9nadz5r19i4n0syhwoe55pd649ax5khsdi4fkwcrwlpm3nehov696y441tv8zx09rnt1z45mo3zsfyfkq2v88zmnf8mio3w5uvo3ou21miw78xlcgl5yyq7dzsg4g1npnt9et280xsy8g0py202xmb5ka11q5w5l1flu1f7xf8my3jfwaye4x4',
                fileSchema: '6x83r3xak8q79h7x23pov3ay2gx4bcra3ciewv4sekn2c1k1wyazyn9i192s4ddsjoarpwoasmfxy0j73ildswcgau1t97pgtq3n6szpeasbpyhjwqomc5u39ms10ople56z2s003lydxw2c9svz7w7ya2ie4jttc53r073617faiyog219emy4nwwoabetpfycriprhdgz654516wvlio141lbw4jv7hlbtejhhsvj8b4itnlqz9mb7e9beqo6ayj1cvl3i06ygi92rmxiced7t72f8rgzre21cox7keh6cv5hvvvqs639hoamrmq0bnakw773ri5fna3opp9ogrjfd15mr7aip724jevz8hv1o3vngcbmaa5ddb7puh1vo4ep5bzhfdquficae3m2wfjzpyn3np6p6hhamr0z8hsmk29cnx6xa9qg0oi6aocvmbjqb8qvlvmpphpdizlnc8caan7n6fxf0rjeqndkifmg6qjitkpe6scdu2r1w6n9oz5b2xexhqjc59tvi0wc3akwvdzrtgtlrzdmo2qzusw8atvf78j4o3b8pmpnx2vxs0musvxsklcgvqja0494oumdo20ufcktwog857p3fop89r11jitz0eihmwevm6zlqb5ty79ep4qzxmn55xdkhs6h0deu8xleupiknxqs7wo4bmprq8biuu1kymjrrq1tm8kzzopzjf3bn5iw6lz32j4sopfst1iivx9o2l475xsiskdosk3slj2wkdx2ww7y0cqcizun9z8ge6cd5uoutj3fm6fa2xevbud1ksucs4nn36q9rkwxohg2dq5ovjqpzyw86nesgs4uwvgn0tfyh0ai441rq8onmdvx6p0ezpxl4q48l0q5jntmo7rsc7ro55whx87vay5fdvnn2zjl2xwfntqff95j5dl764o56zzl0wfcy2tnygjfh8yzfi5d05bh1c7z8dx5nc2fu2rbxl0lo0gxv53vg8r22k5vv0o4uq73x15r3tt0z9abl3np6',
                proxyHost: 'kp5qje8x4ocpcxmrkjhip8kpvgwavsku225ryndux6if0j48kjsd1znwzux9',
                proxyPort: 7991782294,
                destination: 'zn8vy90a4ohclxbgg0jies7akbj943lfl3joq73ne1rsxs7jfqy1zcs9jcng5o02jdljhrhofclazrud7yd7xxrrrrt7uvwpcm1ryv4gmyn3ev6b10ae7bo7z6riw9awk7eqn3978onrzrra1ccjf4pzewuwduji',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '1u6rqrwy9wu2atgght0wfh2ki20awkmogpqd69i0tzwzjshh7ucptyrgvhl1kedcmycghbfso2x7jacefmeotr6lerkwzljyhl8wb3ra1ytypfprm18qhha09d8o4atcquyxsyg1g2yo6zz8mwumjsdb2j0nguw8',
                responsibleUserAccountName: 'c6tfj33qgpllrj5jvqhj',
                lastChangeUserAccount: 'h24l99y7bk8swgw464tl',
                lastChangedAt: '2020-07-27 05:48:06',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                
                tenantCode: 'jz452fmgvkkrtfus59gptce4dipjxo7j62n1y0s5nhxr41kk1e',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: 'kry8sccruq5mglb6vely',
                party: 'ysrt5eyv3bu309ahzpcr197l6ufjaiw90culivhdmpgsodxho06m77b2nxgpr7b3fz5yjtemu23uuwztntfm0oaghycloj8ijk1qgpf62m4f3na795tiw9o49x88jkofcj0jd119ys9rem8ps8fn2r0q3ajgj8ys',
                component: 'docnk73bittt1gsisj4xu0xrfrhfkxvgje6ndubyryuvcrc5zkn2g52injdjtrillmpzdl59irj05l6sj2wrx79c9cnypt13o3j5qonv5uusckmoyainpeo11ny0yyel30zvhr8gbrvpfyu0ocytbqqjriphbkqr',
                name: 'rqxlexr6zyupkngu039g8xt43we6scgp1kauntuk7lxymgjf5m1bz1bf4wtly48gcsxohwpox571x0thjh93dezw88u0tf7xgnjzj1wok9o7gaud2008qp4j2jlqjqyqb6rmcwqly525yamjf8jhgd0h7st2q5yq',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'bvbpofsbkponpf0x70mc8vtg49hhd71rdvr152yrfhabeh3b5sh5hbzrn11qikvbk0p1u2qk7skkqwxzuvqs49jmt7hkb9okvstdso28wqd3yhigsy9aop9dm2jxu5k5e9ynophdstq5hntcw2kvlz5c5aubuh14',
                flowComponent: '24g08g0z3cgjmu6a8ngj1t394j0yyy27n0s4oqx2qpia234cher4zg5kdr80yg6h9wzloajk3j77xvzg9la6jmrrfykunhll1a0peqyh8xfxamhjsgfs9txux4he7x6p0vy7l1vohphcv679coa0h6zclv3qk2ui',
                flowInterfaceName: 'gtjrzo4woursdhwchieuhjtueza4iw3wx9cz48spxuiinsz7szlw70tnhix9f28dxvexf5s25a0o8qdfiuv8udnsk5l7etdmk9t82ogyyvcu2m45qls56fsbqmv0zzux6qi7w0ivvri54a6yxzsxhjw1o66128u7',
                flowInterfaceNamespace: '1nd2rmci2s11f59bx1uxtagzgvqyg1fvjcdek68brattr2iuls6m18d5m5r7l56eztvqmukw9p9ncsff2lo8elsdddsxp11p1frkup3ehk88pdokry2m0ixtljeeoymuui95su63wxfjqx8s9sa680p61o1glz01',
                version: 'f4t0oogzemcp76nue7i1',
                adapterType: 'sb9uoysldsiwt4qqvksgqk6ovo8f72o9ij3e993mu4qhsbqn32k2zoozuv6u',
                direction: 'SENDER',
                transportProtocol: 'al16g38v1e1mf3haxrrpvgpdyfzrma4abh0lzd65rlls4ipc9uw09zpq4dlu',
                messageProtocol: 'gj5yvoorqgdrdkub9s7wiligtm4lr423gia9md84ypk91ikc2gpk084ba0rh',
                adapterEngineName: 'hpd50cize10cosa06vmz5t57kee02gisj6yep14umufk2b3mxmvo1binj7od4s5jy6wan9veuwwrbobzn22j1m7t91h67pla87j3o6irrx62gcheq7lp6zqh7hio490iahhlmh2x6rpi8vpqk3dv1ln14d7goig3',
                url: '22m1ddvbzisac1e2r1cjx662so4vt0t296279uc85cfyeydz82c3rll2m1zvje1z4g6zm89vu6eq9v67cdbivctviico4peqh51l8rm0blbelkpojhoavdxw0orxkl0t8xjhe6irbiup4ndi4oywhv0l8301fzfzedk06iuazhhrd6f3uruch1wrj8gomf3ze3t9vowchuaf8vdmc9lpxzn0r7g4kzjxtf9rhe9ok02abnjeiimqdv0p5l6bl33bt3jzynyhc9hnc5kfau420aqa1ice0jfgt7fny5sk3an642984uezknnma496wy0h',
                username: '0m3xk8raextjqccttja2vx1n7ubi90nq3n5cp1t7quzpmxz4hrvyildw02r4',
                remoteHost: '52nk28uvh3dv6fgi8qqaizkk0x3u068yabjxcue00f1glx9vn5j3k4d74few9mck7jutugauswoqrbeqbutob320rqpnz9oacwpcg9iitjvko1qxidocehhq9qx5hmpfbwk1pnqriq7w3cim9z5hn6c4twdw2kpc',
                remotePort: 7712729605,
                directory: 'kv1um0raq9ila1ybuzxfa0dlo042t3du9thrk2g6lpcj1o6u7y4xn8gd02dajidl0xkvirkloeynh9pl4rj2vjoa0u4b1apweu48xxvxphilq9n4itk10xwpmfg5u01lpooi3wnjv21qvi0qshcj3ei5i0n54qkl1ujv8u8l4o71vxfvpuzkgk7dju6oq7qcajcpejzwr4anowtcxrokifmr0s1h4fyrh2o49n2tsyscysxeh2j5km9rkdcbzb3v6e7r7p5xdrmh7v8q6prftzsq9gqjs3b2a8eq6srj6p3cigkq4bbfungeyia86ppyhy2a1vbc380tcdlot80v7jylxoxuojbayupq4ysovjxumnn09ysfyb72vjneo5l1yawpoq3couk4j0ewxuuyylr5nutsxeaztp1c1eqd8kuoq4hwx3038xwp858x1vvtfm0jo22j8gw33dw5ojmh8m8ulja7ulkofydmarujt361ym1ph0rp11rqvzgg5pu12w2tmzs25ojesl3hchpfhgjmfvl2g0m4ykrp97p6uu0iwb1udguk5ljxsjspv3cowxmvjoy1hk5g7o86fl1elh5gr101ckhla8qdd8fs6owkxt6u3gdggq38vi6xld7i5u6ce2nfemlh15asrtrcgeoxyfoh804iv0k0i2z8t2jdq5khxljtq6vw23sf7qk6miskkwk7fnzizyk1btv975mx7teraokh76uvfrg9z79rtxjbwcs1r4ti6kkynr0hr955m8v7861lx3innh471ttziw4qlq7wm5miwub5mne1o6e468r7sjuxg3bod5y4h8xnhcz79eb9fagj61pzc36dq5hvsi6fna94whuplis93reyslpb1x9z2styf6fy6pcn29ajyqnya78f6e25n8wimwikcncodvdacb7nw1takxz73h7d18gp97q85vonzo7iyx328h9wu5f842kvq3svmym4cs7mllz1riowmwn2oaikww8iutrs05uzhoa2',
                fileSchema: '53646uoa66u1knjac3o256w9fkbp0lg7z8au7n1pbp6lf1sbmw9jco2rl217u3g6a6gbzth2bgk6rcaioc8q7hw5bo2wsfunojpci4skxdl6uvv9yog4qvwdvzxotrr10en0764zz155pc2so0rspx0rm0ph57jexpwz6u3np4up1zj0pvhwiuz5hvhi3zwpyxo8val82cuk9y3p6a38kkm6g95fkm1z34xc8m4dxvjh1codjrchl5pr247k4bkeoqkn2yyytvyfe1vx4ear60jd571d5fqavekut7pqip4gyx91zmfp62j2yfmbxmiaf5mzzyoic55pyzcq0ztsucao06pnkkgbx4lv9mik19mn607mz3is9l6cki88pso47h6tk1f4wqmg8xqnilf8g8zh0ejiv24wussap22x4x2zqdh4dqy312k5nboegihxisrqwhay5gelfgzp67e32529sz7v9fx5rg0n1q2993xfufww0ovgedf4fhs8p7k8d5e5yfd8daktjb4l1mne6vwvwc5qnq5rgei05vh0wlxgojuhpxamtjdr3c0au9ao4qpfykmegjfsxdq27cdarh48jyv7zlp6dp1c5l023p82e39ouww87qdj01xe6vypmnlkukp2qxawd0hyan4ro2vbku0m7hz3r035cfzq0ks95jzitvgw1vv3czixdx9jn1ic8j7qu5380ov0zfbo4wu0b10uyere0x2wp6bcxqwhv0ywftfea5enerr6o7ij50c5ij3k6kw126bv0y1vzcavz0mcq6nl6bqomgawo9nlagqcdy01vqhx8fpmzgg4w579i6jaubvipsokybog9mwvjdx1lxz53nthavmzqpmyor9vqyin2i9fmq3d680x95pfeje9j23ahpqi8ir0tf0ik4dtv2af5ye2pqzh8w5791tmrkm5khcsc4qr1t72bc508gfq1sjj0telom3zzw4tsd9tfxpsvym575pv4v9zrobcpo8wcd19ryke1mqo',
                proxyHost: '8ip1ztsvmj4dr4b2711gjef3cmyf5dlk4j4d56pmt1ny1wwihw0l71slwwdd',
                proxyPort: 1267743732,
                destination: 'bpac6h8y7g6i73rvsfi6b6ykq1wkfx6nydt64p48lw5orh8eay0o5t02wj0ub42c1kldeg0eyzxbjlht4p9ayrb3wstzbdy4bdl1mmz42rh86l3ei6xsnkc3f2g2ryn1e4mnzhkw9dkql63mwxv5dv62xupbeijc',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'i4ez1o07h6fjtvw46ofaxxngp69isgwsbw2tu0woze79vgfo80sep5tavfvmja8lw3bzik8y53o68696qyeagmjy5b4x8yf581tgmi8lrf6yzubvh3qjid5pu652ee6lqm228hbpox8ewui1p1udf7uysqekbf7k',
                responsibleUserAccountName: 'fbceqs9awv4q75tqvcff',
                lastChangeUserAccount: 'dmghbngirdjqzmawzw7q',
                lastChangedAt: '2020-07-27 07:25:48',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: null,
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: '2sc0zbj9cefvu567cgvu',
                party: 'yaw7egphc58r80gajlpmwq2z5hhnk9fx6ykqe0z4um52uev0q6k3sqgd0x0c4tfw2venn5py92ozvqsjlccmxbj7i8j4m4zrftsstv7ow8sr6tpfe9ln8zfy6q746qzgvptbykljm2yklfv4pxzrs9jlt26un265',
                component: 'dy5lpfpu8fgqlo57fwjbwyu4ocn0jiboe7egn31x9w2jlw8mz1fc74kqee0k5449a4t9vp938jouwglh21ofh723k3k0kdyv5d8kvgqccmxngf91qtukb6p0jstcortnjjow9m73y76rwae8x39uajjtkrt05uo9',
                name: 'f6xaibnelj181s0btlja14gbonrhf4bsbtmcqvc7kiat0e7zh1986ojq9d2981yng4ez3db61fai0467i6bjmzpvoyk8l8mmf0643k8tvtdz78gfb8k1u9b3i9cgfc687egqp00bqa9qkazg0bcw4bm7hk34zanc',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'paroovhb0uqz6znvwqia03uxp08riyfumz2tsc2pn4pl7wrr79jj855m9lz2wkbnhd3t2yy3ck00kdct1t0nmyrnfwf4g0grishqtv0kwctxmrmbvx1i95n2k9q300c76j12iun2ka2l4pc6f0wn6jtpfjncddrz',
                flowComponent: '1s6wputdn6e83be269b763gthwyyyi9ovhjtiq2jjd838qc8hz4zrmd1cyluqsj8h4rxma1ym7drhmhyhsi22lo1c3vtivt5i344s2qwoeox93kgl5wjjlclznmvg5k1gnreeeoze11z77kj5w6ptta13pi30o2e',
                flowInterfaceName: 'chb9u6lsbevbomd1mnq1rljghd8sh66sr6f0zl5kee1oyhwc92ymv8jeurquaagh059m3bqdp0o72kaezyu1fpgmlz75ggkvjb2tu3v7gb8c5birme9h98brqijwg3taxmv683as6bzattzpuggq6bjjm3th7lfg',
                flowInterfaceNamespace: 'baqt8lbtfolw6te6i778m4szyw1xaf7snvm0cct15duya2nbzs7tzl9uthooepujsyg8t2aom58gywofs2r40gg301hwmfs79po8lyqe2alc7nmq9o1d15njj5p06z1e2qvya92d3vek4a5k1t92agikndi69zcq',
                version: 'rrj52mlvzep3kqvv4e5l',
                adapterType: 'hi6x2z3cy9a5ik83vbbpb5t1zkqt033b9j744548wtco0ruttjdbuhru6qoy',
                direction: 'SENDER',
                transportProtocol: 'ki8pnjwnjit47g0t643deb7p9mz7co0v7gzg5vk10sbnkn5869n2k1uqy7nq',
                messageProtocol: 'k7t9qwbits1nk41suvgi1pkds6cgqjvobtgne4i1mag3n1tbjs0vmbbrvigj',
                adapterEngineName: '4912y18um1zkln7ob3ys8u557vml18xlsmpfp237omie8pp0w679fcxjd4ax0y6crz2d4q7tyg220d9xnkwccn562gb5eu1u9kyhtbzuc7wj0tkxbi5w20mvbubuxnf0m30qk9hlrdhss5j022s1op4vywhcg6vj',
                url: 'wx27ewmyc8rivle6xcb0und9efvmcquiiaw11vhp6arl8okfjoe5t0md1efd39e3imhdw3j4m7w9bb9vs9516y3ynppxbmlcyujl5x2iovxld36j2q5c713rv8sp6rhgd98sxbl8y0oypglikckiugsmp8ccdaxgo5cx2pu9jsg2sv53q3kobvbtd5bg2oxyrj6cnb25ii8wcr459o4yk7m0llqy32he24hqg460tkxdfevq1hyyv523grmnbxzt4tj8pj8z0dv69pjarsj0wkahr2fwz96mkjy648fq27rku9sgmu1n0ldwrdru6d87',
                username: 'zrvfnkqa624aftgj2qw2il0jn1sjvxhcedb7xxbax3it27o9bekb6d6oufvp',
                remoteHost: 'uejqrft4m9omv4tdffbosu0yq83ype5d7ci1yfov0oxcxbkqcnxs9iyluo0d5fsr95now53fug2qjy1ydza4mfxohokfav16zveh9e6uezll43h8dvzhw7chluk63agp6plq1hfmdtmbi014cq5wl64sprzp1mtz',
                remotePort: 1261563625,
                directory: 'xcylllmnfyuf7f3t5l03kh2r2si3aqnh6rnrzfoc78vzligyfz8fl3h2dgp5lvk53u5m6az884hksx6g9mxejafgudt23dqqo9elvft04zfax29tui0ffvv3u7ux7szix0azupdqskwwsw7zgi1jcx94al1dpx2wyjqulqh4b7x7lpxiiyc0cv62bxignkyva620c7l9gjdfhhn7bnw26vwuu9zsa50jryr3f9fi1dhf3ypzztkafxjtvgub3or4k52mcwh64h35fhlj7txl2yp9pla0yhtm73zmx5q9zihggcbccvcp4qwrtdj6bs91ciy81wqsljubk0hqjedk1mcsrmviw3yvcuftu5df6s0dqz120oczisdhdd0h6pg18gjzkxtckdqunnfxk7gpw24rv9lpi8pw1x3a9txd80id2hlvy3pv52mi8w9at3lce8hhinxh3foecjckjaomzdwptizznv3g6s42924zh2pk6qh58a6cv798e2zwrnopjx15mt0ynyqy3qi8uv3ke1imo3gxkl3ovige7ahn4agc8li1v1v1nk36ft729htzuv70pwzli5xzbtjqh9ti9fgm8dh8ym2veoty894xajmp0xygwu5ncg4m7qzsocy0r6creo8cf4bx4t7k3yt520b726di2pd6i7smrqiznx07g1vtxaokzvsvhi6dr83p9yqxd9yhrd91szjaniysod2qjrvatmpor1iv1yo1k5skq6y41psj2vrliopucmvt4215bzw3djcmnoltxw6pvagmjgn7ia3vqlj7sqgg89paeia0ydmmw7e6ytll6ao1vdfnxabxbg6y01jfzp2bqo5ycbesj8iru1xqg6kepnkrqp1zea112a55r6fvmyvauuy0081ropzlvfv9mqdbu23yy8qr2kf190kz01yfgkx6kcgodyr1jj10tx6y4r9leezr879tkxkwr3h1izu1ca025tnsnz3rpad43tyhftokv6eg1umadmorj2h4uxbz',
                fileSchema: 'c8udhbziyce9k16d4uetgi5yksporgazimq8qijagxkjz7ytvbniw1ynirc0x9gyvdmu9lfbwfg18l0d7fjuc3b8qmdzajrzba2kop15or7hx8g4qf7sxwaj3u022b7edegec7fz1camnrl0ln5n9suvyze691p3nb57g1644k0tvo7xl8nw01p9328dk96058z5an6a6oh9uex984oh83v177pea4p2ctj7nbjvj07ilz147cyqvjecf6gt122296i9dl6c0l0lqljnke3c2cfwcnhy5dddalmenkcvly1rfsm40tdsc7ikr2kb01hzz5vho5x16ko3s7m5hog6xuahcavyrd0zpcdwf9rs2bsc7qo7xmiphn5khljzgih35srhy05arcf64mnnrqvi0ojlwz48fhdrckffh1zs0y3qf6vhxs7zya88l8bf35nhhd6cxupdazov01asjb731ka8mi5eg9ib0aw4yjirc92w4wsumnpjhhbh26rted3nyjp0lhivgxq8uga4xsyukcvn004girvzjg0colj0nz91w1n7vzf4d3pqp3my7zueg39q4jr1803mkopm2ca0wgxnilegmzcv98fdrvtrqzmuz74qg2qgv0jp1p46tzemdhc2f9up8lylnt32r3xahmnoclirp06xt4kgh7pquvxujggflor71fajwkbjiw6sdu91cyfl7e09vhi3s29r6f01xyvmtb8zpmk405cgw4pj7ctdj08oz7quff1iwag5dlzo5tajki8c5swshcz0twdkwfjsi6kffjsibu1ojisirpgog74ooy7u875x768gr8zmoar642hx52vgbxcooh3ttu138rx04wmrbykjjpitgbcewn56b6whymvrh9p6j63sg9em6hah71sevl66d37ce0tt0nqg8rr0lfz9d4qrr6ge1q36ryfednsn66qsase3tm86wd3abkeo7cztcmo173ldgszz93gzahy49b1xpi3vvwl94tkucqzxc67c',
                proxyHost: '6ddtwkaarohc1dmao612n9806apapjzu5ue9xbejfqfcbz48vr9saqswzopk',
                proxyPort: 9899567518,
                destination: 'w0ejobhhw1rviczwobt25q5in8mxisgwdal66tv6vry9gq9jjdbbbdhbhjcpm8fsol2snttbqcpn9ffm374tw0qshtok2gsqltp4e1613qwg0a16d8hx13k1fg5cezshi40yk3jzaxboegpyygzvahipjstuye9n',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'c2u53ci7f6o1mu3aaqpn096763agylxe9y9zxyw3gjrhhbth0jsnspr4f1ng9jkrdiqm7ch4xl98s1kww1nklonola5bo8rvkkqo3qrfpz5rzqxprugvxc9j8s4x0difawjxbbkferxfwl9xg48skpd19iux5bqq',
                responsibleUserAccountName: 'v2z06mzj7eszhpo2j3z3',
                lastChangeUserAccount: 'o39n1og6rml96j4eix16',
                lastChangedAt: '2020-07-27 07:53:11',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: '514xcu7wbxknh4n383sh',
                party: 'gypcje8zybvypztx2s2mraq3owzyc2s1cq5oqsqck1qgmpekoh9bm7byvifvskpyy3x787fp40welv2al851f00gdobxhykzz16etyn9irnqj91denyw9v0mw09yzazrc9b0bsjh6shx8zs3a1otjldhwxl2i7ev',
                component: '1pycdxhqwxgwoafthzw6rcmr8or0otudcvm9uck7ohk6l9qilvq7s2w3qxve1xtu9dzbw5pc5ro4o9bnaxbf291gz6e4k4ob8puf0g8d489qxvwsff927fsmqhntko5p5rdbze1imd7ynkoyecb8veatp7dprqd8',
                name: 'kplnz80tmb1h2e3aqhmdm0q6qr7pmq2ic2iv9zen7q0jh6dwhk26vcnahuvpteksxyeqnqzahzhl992bucmhxdoo0bw5dk94x0rs5lje2x2x4t02svjmt9m5gdcvqgr84t768nhll1fj9og9yrjkn40ve3m0bgxz',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'dcuxze03cjdpifxxa7844sxezjvn5kpwvy5c6acc1haylqpznlk32sfq9vem0nu0mkeo7g6yg2jiw2xnhl4whbflj4qc3op1fr92db5kdl3te6lncpmy0ccdqphume0hes9dzykv6ki12rc62gjyrob27knlb963',
                flowComponent: 'po873k1hhtwdvq8fzlpbxeh4ca6ufrz86bs7rvcpjezeo0t4maxj3pilr3djp14iy92s8ms6teqmyaccumr2hefh4ifpikcpa5fefxeemlct4pakijoyddrnouee172zkatugi33rji2afply22qfvtapn0yta3u',
                flowInterfaceName: 'odj5msw1lmg4rjwz8ac1lug7m731gywk14s0rcxp661ds14bhfs6lj4inr9rqis8v2foxvs2bqh3gkrzk2a6qw07lanmkdyxj8v907g0hfui1c9094npvpq8s6x2vvqje5rjhwz5n9qgwghwop34eak6gg26e1ye',
                flowInterfaceNamespace: 'qnqm2udo9ne6nuhfb6vmiborll9sxybts5jcwroxwdj28nqn3156h0lb69k09k1ai6t0p16nfjeesskv9gchauj9hp6f6thckkn4u3sfkkvuvhifhbxwwxdncutb06hqbak1spnivqrur43tvgteqp2jll7w08iz',
                version: 'rffexo4fcgvf89a7tom3',
                adapterType: 'jjr0v5wp3d6lhulndtcxcf0s89iwlecodjuq2wcv0vzz0lzlijf0n3o6scpw',
                direction: 'RECEIVER',
                transportProtocol: 'ogt8qq5ueh06mr07wjb78t19a03j0ggt59a55cktgkz7kv6jbvdks7tsddd0',
                messageProtocol: 'kp5i478m32fthqxwk40wi3kn9eh7m5fkaa2zyqyukid8uot0k92us7k08mr2',
                adapterEngineName: 'fi6toazbxxtfvn9dmuwi4oovn1c7dyimg7qsoeojlbija1c0d9a9ls6wfbdb3zpc17v9jgt1a7b2yg9d0e08xlazh89uou9kompfvby6ebde6kuo367kbs7mg4sjnrufi6pc3l6niucyqodrou4c6m1ceggafyms',
                url: 'dyvnlpel3q7sm8p5woq4rwcz516h7spf48nouswjoe1vn9z4pug28dh9qtt97qc0rzxj5iq9a3frtdxsehimmy70nssf99mfufqbe2ytqrtoh419yv31e0usyn0h6lsq0wfhgzrd890m35tz83pjdk21gyru4lwljm75bgvkwfyo8zro8et345is569ih85hdn6p215nxnes553r97ie1ybwl588xnbi40dntlr6q0jsoii3pgbbosdyfhth23pwfky77sg1i14noyx9u1v51iezsofgffn3y9yl8h5nr25l1e4doh09cby6hkl1t309',
                username: 'g8wultul9vwei8204ahonmpscfehwa5ysmf67l9g5ei5agwb0zf0pipfwf2r',
                remoteHost: 'gbxql17nwcs5wo7vst261q3hd8rjgxdvbg1vhe2km110xdp80th7x4pfvt4c53acgj94v0k5s4yaf4dlwsrq8t08z7pgn2769poa35ccghf6cb1xuosxlg4k2gkmy0bft2fn540msc4buk41i7srl9ud3dy307ci',
                remotePort: 3452274063,
                directory: 'hw59cqqynpszhbiqehcdfa9ef5bu0td7bvocauqswbppi5aq5th3cwoysto7vto73vlzp5h76cxul19qsmbww7t60qy9jal7yk4dkmpfx4t6mb0hikhmxx35cyy9v7fhc3tllvplpfjocjxler1c0yq8qh7rece1gvjkn86wo7ul6kk2152aecbf45xf58tmhrxwgu04j4kadpe03l45812fvre5yw56i46mgiyt4inc5sdqyh67sej6julug7t9ruf3qpodmoy6aybg5m195yfky6x0qz54idy1u4wo7fyof3ifualdkjdz6eavgtp8u6alnmv2eyi850ed8ip2fxy1uuwxqu5beg9qeic461adelvpeew0ed5kvb1ds15zyyo5basciyt5w7zegn338oh6k2h3oxvk08hyz9odca4vpjfn87ue9xavoxafnxgtclxhp9vl6tpwwgzpqz8xtelfqpu0vynib5snvbd7ysa2p7rjcs8fh8ojo9aj5obv8ne9qlrfs8pzry606nerwizmnki8o9lo1kegkdj03jx9nk5melr1fi9csrrdaqfkdmdl92kens3o5pzqxp8n670is1sxjsqwr77j9jkf02iyeatmevdhzua7ut7sda2jhkrwzktb4zeq55d457hcy385y2n17nrij0mx0z14ml6xst6zpsv7u7fno9yx4u4ddt4b3t25j4mytrxflu5a3khnw4hhp5ckrl4xnood87nawbgu3mofo7qnie0obyq6zy1hbk8q8g0mnxpqon4c0faa913zdf4q0ltsa5wmsoqkjl32lgx4owrfidfwlg2uu6f12k7f5s06iz27jce3lwpwsuugmb3d6z38tta1hvdefae80lxf8z7cfq8ryfrv9m088dnisdybagrcmhgl2dvcsuixl67cgyf7d0xt7xi89p5cqlrp0opbmayxvb5vbnuhvvymgcn38hjqvbudwtyxhrl8aev1ar8aedyid5hi78gzvf151idb6apf8g2d',
                fileSchema: 'j05x85dx1cnt7lvdkpgq22y80t2twywqxdxelejvvx4igpi1bkbhcs0t97rf3fj35orvzebl9to0vzubxui9fr6dujcujqiwjb5l0mnmzgdpxiroydvzdz233e9yexrnbw1esopta31fz4biilqblm2re4m0dd4iss7w2d3owzhiwdpr1xb06zvoidfndqjkyf6st4g4d1taxc2y5yko4q861na5ys199xg2g0d97uyu65h7omjl9urosj8pnf1rkfpq04vzb2ahclb1za01k0yd4vvdbzs1uyiglsr596agmmvjzgb16dci9f0texfeb6dlbllhxactu7jt8rau59zd5elfby6tpijh2f65d6hhb4thkm9a3yw4useu7zj5libucmjrxjp4zcdd0ud6ja821zdfz9xkk2i7zapehoibq8hnzcjik2wowxrkx5ousv2ie9fbmlrxkezuzed4akt3t89agflp9bdfvxfj4m5gn8czcxvon3ysced5a243rxiveh7mvla3d3rlll5paxrgvt0syz9tgu3bgh5f22ao89axhv5vq55kxpzep9aqn9plrwzsqb36mx6vqsgeakr0xmblrjvx3uwnwruw9emst95lzzr7z8axh9dsmq3u5adib40tc02ez1rlo29yp50rnu8j63qmzugd1y3qyrhuox1mow8j3z8hcsltmim2vmnoocqr6x5axylc1o7r47uy0fbmaudawtyrl050xz6a2w2scomr6g40iy0r2lbem0q6loabckr4sy981qwbditkn1b7fsvdvk0u4s138nbxf34mt2w9dpgm7bvauuss6u276n04soz77mnev5nu1yhoeodi6brhl3w81itwnoza4bmi671b67wd4nhqu1lqu5t92vnslasm5ownjx6yzjqj60m47r1ozkgb9t1r5lvy577dz3dv5dadg0om7o1airxjvolorfiddcguhhmqo2cq9x7jgrtvjvoaaoxyinzb1unkwmsfs1q42pia6185',
                proxyHost: 'vqq120szwtvq5r90qr1bm8iulpe3sxkef7qvob84vmb62yw6j4uzo8ljy0q6',
                proxyPort: 3063361081,
                destination: 'waz1zjvrsrmlxehpfyv6x78rb3ugbwmt4thapmhkxz9d6h8nb9a54121lt79ztlzj2iqqz83wyqlr24yxu3zwgwww6s6ji4kgc93ckedfbmb4r62rymr6f9hp7s9szbs9k3nxse5gnzhfg0b11hxzq4m8a8y5g1r',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'zkei8gmcz3j4pc2s17bqluksnzo5518ycg060ge1b6q6haovjj14daqnw6cd1ai0j3a31zrtv1gf7y0u0ch3x8pduk8rtl0il8y1c4e0ka2zel6q9mzj3jfvadj5tagran7fqxe532z8c0m7mda34fune7jbwlqv',
                responsibleUserAccountName: 'q83vx8wnaxyl63cb4dxq',
                lastChangeUserAccount: 'lbnic8cqlreznjb4crls',
                lastChangedAt: '2020-07-27 20:36:33',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: 'fi7hf0b0stfttnih9g7pbj2ym9pp0d9b4npi7wzhiimso9n0hw',
                systemId: null,
                systemName: '7u7evkrs34jgw5zdb172',
                party: 'hax6zeoge75iaxumbc9vv4nnmemwsefydqpsniyq0tagiiuv9eor0i7pg929qarthpjda4j76id969enfp7pmntvagzzo4sxu8bc0ru95y2oanm704gombcee5khhnav0ec093t37pc0bu6i91wuuzmid6wk4zie',
                component: 'm0k7pvquwnm4kooy8i4rcm16nfa0h30ndhbk82rj3okfliuuby8h62rvok7x48eeimtuerzpkzttg8vulaj8zb1pc8i83and6jyu89s6aq71ftlvbr049hhx6bv82un18etrhu97b8cc4uynaw9ijclkkmg6cuw7',
                name: '3svtb9fi3hgu4al9s91c62cgslhiqo7hn5l9a9uwai6w6m0mbl5bf3wm4t5hgnmwyka58bhed7rfsdth5qtrqjv4mw26tpf5etodkk2p2tt4fjfqem2aj07xg2tm70e9itdk5179djmh4w10ajpp9zf268v9tc64',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'vf2yqth2lzalb76d0617sv5logki7dolhqp1c240s9bjb403u7un2nru3gxijujxs0ulblh1fq9d8va02opbs933w106s2bta3rwkwwgfnl5wp8i7l0gxvo599im7xlzfkjhxeup9oxpol7fadh71poqu9g0omto',
                flowComponent: 'zoa0kkohu340vz8lc9adnt4vyamep00qgxsiuwb04vh2scwbf36gper47eg642q7s1ewo1ns4ld4d43nj15zuxgwxq9t7lm5gpiey6gqaulgeuo95asz6l6h242t1o8ddt0di1cpsunfbwxxdm2puumjj1ijqkpq',
                flowInterfaceName: '7t77h9uf1w8zegvgseqc03n4tjdzhhmvag5wi61j5zs6p3ec2vb7tmo2du5w6jvctyrycfjjibf9jwbz92zyg2v8z01k4jacg8uq2j3vuqmdgauc7s96vdwdoh5gualifwte62d5lm7piau73m54my5x7400uctz',
                flowInterfaceNamespace: 'vzzziwszqiz6hdmlkpyzm2hrnlp1selp05j19i82u5e4vk85c7vwk6wz3mgt2gn2fcwqo3z7do3y96rfp4t35wkirktohj2tamj4ffgczilpl61eak6iac4d321rabs0tzxeywii0junnhou528tkbnldk9p4e00',
                version: 'b5xhsz7ntqrsd34facc6',
                adapterType: 'xiejxm2u0pa75waciakdem7hcl2azw5xs8fkpdgnj7rmvfnc9nvmvaaehaow',
                direction: 'SENDER',
                transportProtocol: 'btpg9m2hky5svxms5p60zplcpwpkei87vwriiy9ajesxf0e2p1xrhrchjwai',
                messageProtocol: 'eqmoj0jawq8rhjjk6jsyxmrv6sbbh30i6fev3zjxt39vqbkyf1tdxsonf84x',
                adapterEngineName: 'bzlnneuqzeha1edya9vtz31q2f57te8akux0vz8m2lvty3zzl1ack16omy98bg2mmj25pu7zcq7g1pr7fix9ctyl9mxuw8a1whbmtwjjxjsf0ws116vu7blcc5wso2kkd06pjd33w0i1ufu5u6hk8a6bjvdlumtz',
                url: 'rftg81b0xrkq5cuv8absymeg9yqxa2bu0uqnr206q31wh3vus7fu3ugffmvzoscrdsmnv0gad7k63vih06g66tu3wodldhxks70k4nr0ye26zl4dg77e8t8apm0wipglwwc639riivs6di5750svbrtetm58m986a3adgxpcdf33qmzlrhqkrz3eaapzdyl1rh5fe41xy71xj5p6i31g5j63p3g3urvwuj42djcftc0nqjmd8tgo9q5udckox6ufzzwadq42n101mn3zswupn4keu5zcfqea7x4xb2a74muy9quxq3dyl4vy7sfdcxz5',
                username: 'i67lve46wo7n4cqj4lmuzhraxp6i8s4exgrzpu7bpc5kkzh1z1z0hp22o9hz',
                remoteHost: 'c6m1fhdl2cw3xp17ozlz9kfnlx7vj5q8yku52anm05dlykty0epvrcfe707ms97442swedtdb1r1h3uigxsjmkixy4gk9w5pua9yrvr47emy824n77hvetlztg1ozh23x8farmuf51choywrnnjfx6jl5y0s9jxt',
                remotePort: 5158164966,
                directory: '7oyiwlwwfii2o4l4kuk8dafhwt17nd9nc6h9phnbjsgw0hnala0cnaesgt9afshrrrkspg7sirfr8gdfg4ekzr1mmteb45izzrcakxjgi6j0fmchvhlhazawu0yfm82mdy4q46tezaln94xyhqnmesjvsger8ojxld9ew7ybohcaf1tmkohibtw6uaoro6c9ugy6ehknq0755kuj86ed176e1r3yuxah3bmlx8mpaiiq4w4tqvboypzrnhnplcd8rv9irp4720a5p6df6itgnf8llvy4872eir2xrae21t7pet3247h7q58zg2y7k3inaz9arvow1abx50vtzfx5skjim3fj6lq59p3cul3qso7psdu7xrr1zqq6lncqasp963onn7iy0fp3pam969id9my15hqd1dzp85eq6nu442aaj0dnr15me12dvcxd7q1c43g3vamx96r4nv1j9uu824z4rrzjoktuzc4qa6sq0fv0v8yd24drogsq19hdtb2agayphblbuksyqoizkss220kym8ik4ervvetkarl9ajxwli9fhnde4ztf903nyk86xnunr0025yjqobwhbc6gmxs54u0mv6xmww9ztdz435xc55bfsb9se1ykdq9yem0yq279avha7c75tbxzj96gqqea42vngg4ov916mimdn1lgzaiiz8vyrq5qwmic557kf2w3ruyxmlvejla3z1puzg9eov1ftspprdafd3ip94hfq4sf1oyk69coo0tbm6h8eknvour881jhhc290rt1pngr7wg1k0yrkzn670xa6zwlw41mrgky5112j402oji7on8rl0gerhycnwjeop9vw79j9tvswu6qef75039jfxazqadq7bmwnjn84a2pf7352gcnv0swjoilrw8c6oautb26aggqema1ofe22b5v4smjbjd4nkb4z9eqx9e9vfe8a82we255quh8n14haubma7mzpu1icwnpwe65bsdi0uj6v66fnqqhmh829en9ziyy',
                fileSchema: '8c9qr7cxpgpezgb45bbs6xwcqqyirawkxxisrv2w2xatspwloikurtew16j07h1q4kc5n68m4lmzohgamf3ukjwvtavhryyp8whme9ggl4axbc7chkpjhx5q5kyk3oeuehjabqpyw2v2fi4wi599puhzz7mquarpt7nks0o5n4prv5z9wwaudaj2j24xytavr29kadq4i2easrbqpp6c4k6yljhyw304wiyig0dzvqd9j7sg9noqwexy4l0p21q4vtf5p67uhp9ej8rys2hw4pb62wkkut8h9y98h1ro42yq4d6yjcn2y5zcwbzpo5qu3hjc65c2k757j1h60my1a9r9pco8vqd2ycjiuhavyvcxigzm7hw53l1k0ezqzw3rfcsjb3k5trx8njqg21csdrk1atqi944iiwaj6anpvrdkd8an7c2eqepp90r3gph7qf63tyfopjr1hs0bjxr0pujupdazhunm152wbxzyl83e6f5sv9d0zsxa7qxlozn2yrw7gl5sq80tqsg7xqaup3gnsi405skgdptliutla79nx7okirjb5atumrcjox9zwo5rfp5raimsfxgk4me0ukskiniobv10oe65b540a6e1qlwuvph2y4gx1za7yivskrlw6dcsz2nzsm6s0e27yw3b1g2zt07odj1q51pf3ci0qidtocy8h3dzjnippq9dlxy1nnqsza9rtwguc37dm3pim3r53vmonhbb6ad40876sik1kk2zsh018c0e99vie25wdh4f5b3yrgmaboa2o9d154d9a1ziok5mjkod6q7820oocrzfvhliq8m94f70ap1edu07h4oy6qhakzy8stvfz62r067vy9a4qunph2j6rhqb5go0fgevy4psr4s9tz29lxz12t9jcnprl7np87i7qewr1u8x1995vk5lm7aqd8y7b9n5d2icmovqrvjqr5jhwfrwq70v9j3votrtue61ysv9oe7aw4bybhzhkfcjwsy5pl9zw56p94w04c78',
                proxyHost: 'x5iu5nw0vbn8yn0b8n5iapd3tv83lop8qzkw4f5mvx7yk0z6icovk96atq65',
                proxyPort: 3103654175,
                destination: '0xtye9zmqrxg1mlbl2x98lryw5axs7nyr7zhz2z34d5f05z903949oyys4s5ctrp5yvatvvj5pez5b8fx7a8mega08ju3xwp9rxmkdfkwquzxkgodxgmw5zeqxlusmq773iauelaclwfa1zbj2jxslygkgkrjpln',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '2ml6wzqjm6jds7993n1siwlbzg00lu1akgvx8zoodybkevyfl9d8q3ssznzqw6whar14dumrmnmdiypkut7dxwlcnad1r7rb0xrvh95jyo3lox8aa3phkqmmfd97s2qtyusaca16a6iiriesalkejx0spgy7x4jn',
                responsibleUserAccountName: 'l6cid1n4oauqj7kuqv5a',
                lastChangeUserAccount: 'g7caiqgyhyxdshmfyvgi',
                lastChangedAt: '2020-07-27 09:36:29',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: '25ae2ehp5hadccgjbnjsjk3u06qdhvoy8ubjdyn6b3dfuifoan',
                
                systemName: '7258f4w4fap1i5pwrawt',
                party: 't5rkhwv8kioxke29fm42gvj3hvu4rfj09n81gls0rr6oxvubth9vrsw3kudufyjyyp9n5mryvk2cpnuw0ya83q00usy9fvlzfkb9m8jwhccdfakaa566snswqcth8huooakw00x5tvwin6bk2f8be9ppyjv7dis8',
                component: 'n2egpbl15tbh9ox6fb0qoa0j2nwbkqhrnh5fnmvfgk49oxup3cwqubs6wywuonrts32h7sykfv2dqmbmjpuk13973uk291ivo1oc6ui6ctz60ijsainf2m1le3wkwamvjl2aglwmtjupczj550dyyfphh1wj9m6h',
                name: 'vhsr9uhgp5g1x7p2zor0mim8emsuju95oa46wu7nap0d88heft2qwgwrwybheb7kaba8779nc39ujforg1e22kqsy1p2n2iimgi4uob3uhau8rov6r9v5jigqybgjsq1f8xzk1g42uez3t4z0xx551dgz4qxqkdc',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'a5b26sgb3yqnnv690mesc4mij1n0to27d9wnwkz8ozq62bwpcujwqpm4laomb2kdxqakxcp5l6o3niuxlgikoe7f1mqo92p9wed44q0kv6vc78xw32f3t94k2aopwro21wxn3087wq0jinf4pbmvxd7q7f0v3qqx',
                flowComponent: 'dnb2u8anfjokmmf4p6qn1mlte36cqnay0gfkwt8ymu8gmdynv6bvz05daavuj27rztolbjixtm6qwaz7abhx9ctv78114lvcbeubc221jqdyix2o2f9wu0lngtyuqk73ncbi6e9cxnvbm5uxe6v81a08jjnqyxpl',
                flowInterfaceName: 's6vvw4lm4l3wle1c46bah3kf7j58kweeq1c9124vl6h5qiyb7tshyvx9ensk8blzchsjv3tf6ryg4y2ofau95ik8xqrs1ztakw50lxj6d67jujfkigf62ti9dcvwx2ek3af9xed0ekbsvic6vfye4fpahshauizb',
                flowInterfaceNamespace: 'd19sg9jbrege5zjinzazg8up54n2xbdcxfxg0ndzo9riqa4pdrs97198ga2jyvds72zog3qsgpf2t3iw5oosv6yzyopgodlkd20k01c08ev7v0m8gi6vxstb4zof704ovrrktkr2k30me6ry669v4ckor9r1hq35',
                version: '1fe4vfndo77z8124b6br',
                adapterType: 's82x5slabeckvmc0h76wbnc5edkkedc5nmuf5dhxzo3qgc23b9azt7vyf5br',
                direction: 'RECEIVER',
                transportProtocol: 'ab2ny16zjnhqbuqu29pusy73fjtslu1lbf1yms928aubapvcagei659veep4',
                messageProtocol: 'yenpseraba7mjo87bzs0wr4f7pzii0xi6ixd92wt6e28ge3gvc8x0v8zq82m',
                adapterEngineName: '9bkfnd53wbkrkhd38m5uq9nb3cv11ec7igqhp5qekd3wlf9uksv4zphmsf4350avuhwbbg7g87tvb0fa5o2qbtsj7np7ogu6k823csna6w513l1l01elj0u8aqov36j4k2p15zumrixk9xx1b4hm0n2gl3r32qnb',
                url: 'm2jtn9k1a7zyx82oa5vc160w0qgl3r0xm6k1w2xyxl2spfe42l4283ihx07c7ojnpnfxl5dwrvrffno6dq39r5s05tqrlehbzldemsub5s0uhcy9afr9tn7uxe341zz8ohfpkhkx4cvixlypd7a0i4lzozv2ebpz15ea2x2klkbj6be9fglr2k7ekoutpvffavmln7b44vwu949s7xjkh1vb5ki195944f1i1cdrgt30jsqy64cy2cer0e2ssinkpsglhqxv2hoyhynnirl1f5y14zz832otnz4ecqcyhaui4b2gygydg5efhlp1bjn4',
                username: 'tingeem6w7vjm8s92oc7d6t0xw8jdcgxjatpj8j8t69vr7ubumenn7ku9rvk',
                remoteHost: '4njyba3wpan58otij6bwxnzhn9vwfx12lma25xtxni9oyw8x5exe6yjj88u0oe0qfvwwktpizqvk1qp7pa3yoz1mwrqrspquc08t9ci4bb1drwhfxcpa91tqmmykumouaeq1pcxae9jffmhva950i8wgfjuaenos',
                remotePort: 5144013112,
                directory: 'hpftdf6o9qrmn8i8wwvs8w0dipo9qn187hcqx47ds8ddcbdjkj9ng57f7fh9l3lspttc3a1ieaplmo0opcza9b8vu7f6ezobw7bqdwlpywuod0wrkeefovv1abgguy4t3dh16uz9gylyi6bcv6982jp67o7ekt4nvpqjbkie73uchk1tk9ow6vu5904rp075zhh4f0f5n1uivnlhdr5opm25uf5t5s1nd0mk8olw87o4fdt693vovk0231tmfeb882u073669laq9crmcstkgyq9hfy7p4c915e8eabi9bd4zr6bqvj394taw1gxx1xi2v9nkdjasikvzg75e4k429p5iq3ujj8sb36svez0c6zebd9jxshdph1am4ym6n531bmpprlatnahec9tzp6tu65ipmtjdk5jwxcrvya5vl39yxxw0o4x8y097r8bc1o3f3jblyqf1zboit1c4v79gn2x18fsevb76q0zbfxithahgwpedftj3yi18iujv8yaep3hv4asrgnk0lxccsu0ysyz6cr8yprfnw1qw2vdmdieeao340ak5kjw0yz7a308m0wuzq36jxrk93kvxo73pi84osn7xbczqg65lzal4p8v9qslpk5ujltnxcy9g9o6ht59d4gnocbi73mq3a14pqmyjpfj8kw7a19coonjklop44cotilzg5aq0ikmhb1h7w6umu4uuhlph9lcrnfwn208olajz77pngbbizl2glz24ah2eah0eun6teyru3lf2lelv8ksm9caj33t8unqvy3wbc6zuc9xp63uut1bu9pclvmtu0e9pai03449ljnc6qxmjh517wg2cinxozh1lxvg7h5l933a13qkx29b36v1589r5r23cv9u9loqoqcj4p2lxr8qyjao2bfr2bs2qycuze4p1gr8ep37fu794um0av3emoentn0w5rdzyxphzi99co4k0flugoomrwkwboo24uu8a3q83oz73afx0zy53itfyxgppnxa28epva23',
                fileSchema: 'q8u2pvu21uwj1l0375vrmmp48lf9qzqhut5uidzl8m5870nz9g4j99xl9cw5uwtuxudbcdg6qfhhakdv0u7xbv1zr9enntsry3wrczobrtapqnlsadobdnwc3qkacf08y2qippfk4tk750yg72oejvch2ttn531o0df7hlst08ts9tl6eyxo13xfaofh25ajode7wbvvwacgvks6hgsuyvyz5w1392g9620zyhhbfvai2h0c09btp5ji7bfwfpo647my1v99ksri80u1w905x20650pmd1qlxy8xnon0u6qyf1kulstoetdinlpgpveuylw81ol2yfdu86axjmf36ciccihryh18fb02joalp1t6pyk3dj467gxyoz5vpb4engfs2s2wkzt27mxjx5nwn1g1jthwaa52fnvlvcjbneublbovjwtwow9d418w2nbxkhs8iyquxvy4tuki4zssofyhwvuqce700u9ssig1jrgpr7rxnexdxzo3qdtyzvjmz5d782jemz1fvykr9hhjm2vqlomevmowmi5dbsd0mfyhyksv19bph5h1cdpb6qg579a4m5gczrsg3j35k2k90dm8wp4kdia6qmxfcit0jrb126u7ff2vfxhm3j9m36wgm0wqmjqj2sm07m68e6uivvfg5vjyl2y2l2hfti9chpfj7buv7661vuv5v0xgoezl2uuc9srp0zdkb9chhoackjx32po09gvtlfkp4nd3qntxn8rmzqseayy1zxrro92bnx3ofspm54j5y99qhhhxxqyizg54ks9tisicypl0ldpoeh2qhmgihmy31dbszdjmiekg1xdp8go8rul2w86shj9xkj67orn80o0u4df3jkmbgisa411m77pfe1pngmion89xs6fku968l98wfgyr9ctys31tfxjbolza1x2ao39w1t99iz4nsjh3jiszof6hb7i9lavdgp45l2er4l0g0b5ipzetrua4m9nqg68722hj9cc7qw5n6f6b97jogvz7',
                proxyHost: '93ctlwhtxbcpuhkum83i6j6coy3cem3mxv38guz5er9frfbfb72n9wjqdoqo',
                proxyPort: 5167469318,
                destination: 'kro49tkqihfywfpvomkcfv96eudu2b6f5gl1maer2gj5fxd3xqk3ai9wcvs640kmw187ghvh6y9zbhgi4klj2ps03a7ckojstc2r2dis1ijq6mml95lirssh03wma71v9ic8dhf5plwel1z1hs3smuf5rnk5aoyf',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'b65k6jr2ehjbb3h1hecfemr6jcmo2i7llr8kpwllwwfqqr88zyl9b02kwv9li0sos5v8s43khxg1aym68wcqx2mi2m52vqh56ou83q5n0z0i465zrbtrn9xwl2pff34tjjfagy6cxdli0ei04qialdqmu2wdrsif',
                responsibleUserAccountName: 'of3x67z299wa9ebe43oc',
                lastChangeUserAccount: 'rwnnpyhozfs6s8p3fvz5',
                lastChangedAt: '2020-07-27 14:36:40',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: '3bovrdildzrn33w0dtrq7e8az5t0nhkzcspoxrf8nhqv4kjexa',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: null,
                party: '82t9s8xsjbzfftf0gbhgfchbqrh49ofr93f30s63wk7j15ee7ey138sw2k2lpz5np4ub3igdnr81ijfqy7957dhgl8vt62gmiirc8ryoerk3vyor6xggfygsqw40g6j2bjsrh9ikd0cj4oextrksswp6rt7a1uq3',
                component: 'qzkbtys66uoaawdu461rnltfzr1aulk2vuytk8t2luyzrns9g57vf814drjfux35ulft5hf86shxlgidiivaez7fjhsfg0qboaf20l0aar30sgp2yvfw5c9nw6jdie27z2ssw4d39wsy29pdwjaxvqqolrxjm2tn',
                name: 'ryzne7d7sd4n6qt3d7qdycaiyo7hlc9dyd6qeyw4ccxax1pzuhjnfcunj18i65n36fo1m7hzx2qvg5h57rnlk0ljiyhfhlhk32tn7zqon1wavgslvpzkc6abw2hldg26psbhpket7ik4n0qbu9w0ov7x19wgejh1',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'zdybdgjjvuvfflhepva4hc1wf6yiu3xe6xsm539idytcgv1tm0gix6cstmxglonzg8a234czv3ibrndsspq7yx0iuwsramr2sitbeq26aixhrtfcst30ifzuraqh497p0qhpw70crkm9tjbvizvs5hrqxfgyr6s7',
                flowComponent: 'pzsdzoruaqxwgfj41gw76gfu12rfypg6qwwljeu1m5p8pmhcr98al46aszvrs9u8vz6zsloiwobfqdx6nvyyksrgb964y4noee2z7u3glv5wvv6f8jn41an7ut43tb9bcq8sq19ov7g3edrngf3dze3800nrtrfr',
                flowInterfaceName: 'dth2f4y61dtrq7q4cfu39aiz0azgoz51aruoswhk5fd1emav2uoafzt52baehxre8bsg4xnl18ncsh4uzcthtscxw1i80rpwgbezsey9vgl1i7nbi0g8voggy6bl1o3ktuq3jy6rkhmdfbl1wm1vemyr6b3c5cme',
                flowInterfaceNamespace: 'rxzcbf5ygwiyk0i1k8hwj1ysp85g4jv6t3atd4wnj471xzz16lqfi0q7t2k4hjt7990y0shnsaehva7tu2grv91gzjcuel6br565oqswomhq8euh83z1kkxfi7u21zfytx1ee9lvda2gqcgtks0gep9q3lq9udam',
                version: 'mec0tr9bgczydmskj8jk',
                adapterType: 'rgs0iu44le797zr7hkgujquroezcmuyebipc4hc91ijenyl2uu2g5v8af7zo',
                direction: 'RECEIVER',
                transportProtocol: '1v0sruznzzgv3yo5g1gfmmxpxi73jgk9pjtml0sjroulqb99kondajlv1vii',
                messageProtocol: 'yhe13qfubhc08zu9feerq2l2kd01nvla0fcy3lnol2130lvwhkwzgvwar2p0',
                adapterEngineName: 'ndvcdhr3ns8kmjlrj8xa6xkzqjvm0ypqjl9era7awllt5ybicm11t7qt3vqp2acszf7bpx6y3f9rp3rrxc09pqigea8xvnjk1nrapink5erk690239daxzu6mtqcz4bf9ytuwbuoyuovpetov1uewrwukv5bd2yt',
                url: 'kl26gojwioadobllp7mq7xp6w82xx4wc82hwyk671q9w8fj9155lepmnbq2gle1a7o2ayw8g9k4xwic0z2uo2ny3n63qoczvblecv2bt5tpumzcbeknvz1dwxtloqkbfguhttjhl2s6ivfxq8dsyil1hahc1kdar7mhrdw6fqzpxuz9z17hoc7otqv6v07wxekd7uohwzhyuu30nbl4afcmvzsywfdoqcxk63yv67cfsqnazn0dac3lzgj2h4b6r992qgas5m9j13naa4o89k0xvf6opmvys233cgd8cmh0gnr2iilf070t0zhq1wusu',
                username: '7onpvi3w6esyovbfq0zo7koaryapvv9g4feguo1aa1ca4cl47jkmczfh5wlz',
                remoteHost: 'n7r7gtf1uykxxjlq1zwnnjmcr7yjwlh19jy6xtagnfthotj97s67fyot0yd301l6lf0dci5x7gmadt7rhtlhnb6h3ub2i9b83ehv5pn0g65o6dko1ssjoym21g0dvxwkyfqxhneeoh8ao8ifuqp1shmmxwr00ndp',
                remotePort: 8683813883,
                directory: '26bccnbe6vsfcr0dx8zqi93qjg4i678nwawqmzrvrmepe46dj3pqdpz1ripptrqiys2ntbq7kdto9k248ufnarwf0b2bnxhu25jwdufdfj8y50rngm3e6unwqslmobidw284r82p8j0vduhv7mmea0ssw7r968ggmq0e70hlt1b9yxz51wkipss7be5913yw901vvz2vd4y8cmxe6yfyps4ifcks6zi2385cs6qrp5mo9j2lrteirep8qtu9a968aju17vuqjbcju2hfay95cn7aiu3ol6bnk25eqm03gktor72stgvcymiilc79xe1s9uvko2hgjhoifww1nsqo0s22ttislx2d8kye3qko0lp47bii903b2j2ljnmvnya3lxoqntg6t3jmlkchw4wzkt51yo8pnsjcsejo0r3r2iqztu8y21xludjvk99wjw4usbjdj2078l8j86du307agpi1qvk3zwc780comec19m5hbvgrrwgyicjkszuflfe60yytywammlvmyika433hz4aey5dylnxuum0c03c42slmwngl15tcb44cr234wiwzsbzlny1xow0csive4rbct9w2zprw8bqidthyn8ul3ffkano86m5mm7kc6i9n06z0t93btwkg7wqkassa8k67g2wvqvlpprof5hwzm3l5hyz9ou6d6nc3vz9aa6uzemk7qmetg8aoosw7ohx8twgq2ocegnjvd2wixsunuo09dqjr3248vgrgpy8zjls4vac9fjmc3zrb745skq8cu4bh032tx45kwv0cdx8u3s2qgc85ene35n9ekvsvylcnl9qgb188wh2vojggiil5smmg7wc06w7y6cblr18is9rhunlqv1ss2450oilsnnno66147v0h82rop15zcasfol0prgknj3t2owdtnabso7mzvkm5abxycoxigrxgot1rzkxcfljp0k37mcsrwvn2ugfa2me7fprjbosvzi0takk91nqh73ldzxhsg80c1f4bfsxm',
                fileSchema: 'xudcurog3qafbsg05sabbipqtabm011a4aduz7wszay72cucxmgzqetm5c6wbvlqhhl8cqa2l39hjcde4mqz4056o4tf0d0szgy9j86j76uopqmyj94eqh23cbmq4ny4dq1n668isfb2bntjyemk9iuj925etf06g3fr4c4rvjffdpe44f4lpi4tsx94e4r47c4p6bvvpj95mcu5235p4jw6ybmp0s9te30nnbnh6m50127yv1is1xvvkr7mqfklrf4n9j5p2zqbv6wdutu361ubpk2jh8eiz7l57pg3e02b0hkj2ogl3db5aa0kkodeobcsq1wf6ycxhjiu6nj1yzumeuef2x5my18gieje19ddqg3xkoiv18ttlpdjoujz18wpkn322i3ljubqa5e1m3yvw7v7h8uqj98bk63wenatvycp3tn9nfserqh2qvelbl5jd3gxom03xm1xpz0n97yz4nhmymeu5se1vgsrqmlrg3zwlnr0vilxo9dfr760vcvzhw6drl56xjslwccz698lohx172hwxv76kk0w2irwx8feokth0zcs2p5aect8tked4h0tfurrg66dwt71ncp69pumxs4ex0jrz7chqj4tsmtpzvleui800cgm19vu2gh4nducdu0zvttfihl7t8zrg717ucij3lrh8n4zmdku2unov6yos41sgfnqf08e1nmazv5lzcnhz9th9czg9g5ey9wv10nne0a4lr0fu7x73rouvv90ashc8raeyatdxy32508rfnmekfzmy9iadxs5gytdkp7kl8pqze23gaojdv4vqhwibr81b70uf83rnpw6rfmcvm6s25bnhjf7xl6tvgk4e6kau612ctgwscyf8lihe77rfqdfg111zfrcpbafaga63cd06fw3uk2ortaetbkti3yg749qjiwj567w3dbtmcajtz2zww17n2yartuxuokguj2oj27rozpzd3461nbf01lemfuqkrg7tcrrcx6or0rnvtmb8q9n4tri',
                proxyHost: 'rk3x53711m9zctbvu3x7negvr8jgqokbyf74in1vl3zf4n7xjka5ydzkf3oc',
                proxyPort: 7080761776,
                destination: 'eqlhj99pnzig45554ey1snf64jqzspsjy6277k33a60z8wcv2c6udjdyy0fw9h9kee679beg3qdpa9zllavp4x353csoywgbgro7et0laulmeydfj0r9pmjbuqpcu239z4onyvfno3a7cl0zxupz5eqkc3wadfrd',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'pr2h7jc58yj5q2fe7rw0iisk5c1izranijx74ae8epu9d3wq6obmq0rdo7c3gjvflnuwp8ruzgxtm5ozm3kz0ifm5q7g2rka4q02rfxlibnf3xuurfqnd06n4rbgpmyng4uik2x0rh3ic3wueqy0uju1ciim8bk1',
                responsibleUserAccountName: '057xnu4n8mt7xfdr50pe',
                lastChangeUserAccount: 'lzuxyuyd65m3rqtmtbje',
                lastChangedAt: '2020-07-28 00:42:05',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: 'ijsumjlatjoryswsuosvqw1ipjf72n9b2t64to8z1hmh3vybqr',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                
                party: 'djxjgtxy1ncgcoudq5z6eij3fu4tirk034d4o7fkkl2a2mn1orh2m4nqbk0rfhxaqajhistultce5ikeopi8lcz42agowisrw1xa8gwlukzvamndiir8brv0duf23jqkyhh8numsjvp0ixa5tgqhji6sv4o5yexb',
                component: 'dg5qn55m1g434zc4kzoz9deeld9u60eo0o9vvjs5x3x5zrll9zmiec1qmp59scolu4kgdak1oy5moq6tbxcb7td1fpp1ww1c34q90er31d774ocfy92jwyuorl465d8l9e19ffttcnph5sxqm2zb9ksk1f08u519',
                name: '91abr909twf2ak4ypmj5090n1pxrpneeo25m58cbx6ahnyfv5mgbd4303uia51phtgtyztvzb4hqtx50zvwxndtk98spzltm3ux37h7c6wzyxlbhj59kkk8vlxjt164gvfrce2h6s997luea68fq6vuvu57l71ex',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'wwa30rk3rlpsyl513syyyyx8fr06ag1kjh9zsrtrlv3enxs9s8hq8sesmojxwe9qy780hbco5vpyyubwpfc6lh5qalintrojapc6qrf5bqneczl7rfjctsqd8qdsh6vyzgy3n88fevuo26p8pvnko8z0bln0zsdd',
                flowComponent: 'h7ppkpl8loju9thuyatqmqhursiuyodhq9tpsdm3ftchsqr27c01797e4ymvurtic3nqyjl512h8jcrjsskzwt4bukloevy816mh2zisxje0jso1iu0kb6xrm6g5g7cpsupyr2q66knqqcqmn4k7tdh6w9eogfk4',
                flowInterfaceName: 'fmc7s0d8zk7wsbc2q39glokegggx4tn6cma77kuk9wgogtkftjfnipuuxrqirml2j7b82zoe2wuxmfxmhj7xe5ovuceepcb6u8lvqqiipomohvzzbhmt2lpp5cla2ejzalf8ix59k9jm60rcvmnvu1p9s0pycgt0',
                flowInterfaceNamespace: '8uclr7kcbrm7ta21u93iql97ui0h9iwxlyp9ygf2yt0tj8txf88t45levsu9tx5weii0za8w79fe93fxbkhlilo2ipvqu6x6dl8vmnsv5ksxndu35ytncz72yjt6erc0mntzpa0xvcfelbxn1ganz3tcis3wkfu5',
                version: 'rktkjrsn4id2g2w0l6ip',
                adapterType: 'nstbhkr88hbypprzol7xlwxal6yjrfv9focr2i6kx4s7glon9q664ww3lyzn',
                direction: 'RECEIVER',
                transportProtocol: 'cr0yvnadobc1spn1kcnisglawe4gunkaefekbaine23swgpokxd01hg07l1s',
                messageProtocol: '905ac5e82laclk87rbjy872mc1id3yk64i9n1cmd3c5u4a5nsm1fqfylmpn1',
                adapterEngineName: 'kf7ffa0ar6ctlm02w8yjujgnybk6k60a1z2hgdibe4o5bnc35csr9y2j8dw1n728wgeawligmgbymmrbtzxxb9x4ar501g8dzeeoxmewyzb80w6k4qfp9xg3y6c4gz32decu2q675dcvqfzivyjcswbtbf4oyy9u',
                url: 'wwpl2l3nqzhjv8via3dupfye2y8wvnygcg38n99k25wiayjslf6w5pap9paccp1sg086d9qqfax9fswdp6enpviiqhm1t9qdtv22hlb1cplstbq96v6vxl5ic5ait13o9edl2b5tbp3na2gzzmhoe4c9xpgqs9y3fddexr73u8p5bjvhqsrdu2dcve0yw0bphwaz7nzcazn6dwxo8j4t9rvr8c35rwhuyasjhj9jil08c9wn61e69y5kcpxk933xfdzrim6x5oexsmehua1qpdejbb6czyan7nc9oxx479upeo1tshnr0i9gzuku6c4r',
                username: 'c7ar6rsc55yfpsqkwkemhby7nvyd7vpi4rotoznohcl04ifirnrstfl38jvf',
                remoteHost: 'oiloz1q0glbqy7kzer19pn1b7ae8my02vz2vva3xm6xj4es6qgptjl6xufx4lg1k18ycjc76e8hxovqsbwxwcoqliesq89hhrzbr0kwdvgxwhfbk9p8sc9ogu5avyga6r63k2v0y9nbvat4j1xz9wu61cbojo84j',
                remotePort: 6798933544,
                directory: 'laejm730ur139sl1pxy013xubgo70d057ltsfm8y3yrfmvpu0bp8ln4tjpwuw212zss30tifq5supil7cwpit3oh3geiws2o0ismge5jfnm4hdm8nekc0jq6dzpmkt82kt5dzkoft7gn3stwo2nhd2tnwucylhjl1bxdyi0991m2b516z6flb3cinqg1pvepahbwa0psu0hf49va3lth5epgabvt2o8gibq4b854b0kb87ftjhjjxo97dvz2qcudn54ssxpg6tkatq3tbe79zjxp4c373vt8saauuelmnkxqyl8qzjy17zr3r0thknt6gfdofjloeay9izu3s8m6xh9l4ves636dirnfy1j0rlpbzzs2tkz9muixkszja3fb9nmt55i44nocmgqmfithoxs8mlhh7z79ge09zcic96zin2a124d8biy9jgejza27tk3v2kch3gxdt5dhj57rdpvgo4ahelqmj2wizizkmr7xz8rgz7drkfxddp43uq01vx0sujghretpsl017f5dm5cuykna9p1vh16ila1k1mem0tru4toax37cecrmuqjwj2cfuofqr3v2j7je7ltbuvgwahd5zjrdojx2jxwwulxb31u0zzznx4i5ho93cmcnrfiokozg00ya8xnzrp9dr3xjmriho9nc1xtmszdbepeqcvzq2iqch0wxli9l13bhfnta2riwtaxt35k8606ouek49795m7fkw26gc7fqllnx62an4bk5hbdw43u6jp84sc13y14a6q3roi15qq3rgd2y1s0hi748op2j5h0wk00ocfu0fdyow7hl8u21ynfvct849cxe6ykfd856oxvlyesf2wam1fn8peguhl66nnokxbteemmvfox7dv89a86qptk2fe70qag2wisc74shophzmt3wyoqqcwfchxeacnwzjor7fz1ji6whhlb47wax0fml95smfbg3alhnf26i6tet7dqtwurr4id2sks3j87lilir8mroz6yixsvwybd7',
                fileSchema: 'xyz7p4j1fe6xdxcixi70whfrnpiyaa45qh82kmfajuxor22cmrhhgtxcu2ljfe8d2ye5eb2q9takxautx789gi1zw6a8nau97lp6ddn3zxctpf3da993ad4hrsbvvmggu06y9bjdqk7addn5vbt5mw50iobvfcsh3vqmwg6eq7xkh51v3ivow4zm5diyyt1bwuu46iih34z5pvp2vokl8zeuo4zz20i7ug782lkq6bw6s8kz12of8qkm1jmu37297rtc8pxuj4xss1lyja8n4zplcv1jq3smozw7681fln367dxp7kxktngmbaretoetnhks8pj8uesq2kjrqqii2p4ba7o7z4qn3ag3nn0bhttqqp1w8fxoe910m2egl37up7mtveu7gukqt0ugm5rmn6ew4iymmh1xmz640x03e8iret176ilg9kwpa4pvvbj3pic14w9ymdpba4ceueiavg9joeoufdxvylo3irbv4mwygfj7e0kifx4el2tupcwdykby196aai89w0all9lhq5e525gci3fatsdez3990zt2mozeobfljw58ydvws5gpm1fats9wgt41hp5ixowhrcl7flh8fq39gcnvqx7le4wfh1jrtcyc60lys7bb8da5hvx9d9crekuu2b6jfb33y0rz4bb3lomcom9l0n5sf0llct5d5se4hi0kwvc425kankmpi6rhj1mdkpkge6sflz1nsrzx281chq97vi1rgugyrtvuazh03xu24t42fuxdpt1mxi9azru9b2h2ch9c7hanmzi6pqt6o0vxnw81dcbieul20fyjhwr3y62jrgn0fdbqqjy7hnoeq260qpefd5zkd1hyukeen9j4q8y99j2o4kw30bajiqt3519b0nabhsmte1v1u2h1z4ut17oj61u8ej0v5io5bi6a8tcunk43ir1eqgtfjtzwhqtxbvi1dt9t92z3vvnwdta12wcfo6v2xqw8gnn2ufr5zqq8mkzhzsgvlyzse4rdau0d640c',
                proxyHost: 'dnqltjroengforyy37y3wr7gj188sbmumzrzyscl4sjdxr6w862hjqiuulbp',
                proxyPort: 9237013054,
                destination: 'o3v9l8dv4yv26j6ac24mta31lah1rp5fovpdx38s9e3o6fdy3xl6hn4bnvbhzcmqbb5xjizz4tuvbpumwznj3prm1zao9f81045owfh60w3ikzudbdg38thit956yleh9u7y44w4fo05lv5wcbaibe5t9nihiyqj',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'yjzelwbhj6fgzq2pg8hfmjmvuwfdc8ycyhu6pfe0f2hem6a4mrm708mgod2ki2lefe1qt2hbvmwxpfkxebg56snz57r14zqwl0pu0bapuozomxs83vd4aewl1fg1u81qugufogb1mwq1ntnk6or8tqb4hnok9t23',
                responsibleUserAccountName: '62i0idjlm3esbrp3pe89',
                lastChangeUserAccount: 's332o4zc51qqzv7iqkfc',
                lastChangedAt: '2020-07-27 19:04:07',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: '2fx9hwzb3qvygt21agm8yd1ldwenzagwzq4mkfigcvrwhe5yzd',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: '8rc8wpimrhe0iudx0zsx',
                party: 'm5uosnqqkblgg3m61sh2mdg62a6n70gmj8miwk2vd06ljmypw071yrmpbfpkpwoem49jywjir0p8qeffa2dum71x78qdi33nwtrxxfrg9tayxfy4m8yf9vksz198377zf0gm6as62sl5f59esnz76uzam2kz6qxv',
                component: null,
                name: 'ie97rbq3bv2z9c4formkldzg4edj4gpf9gi4ifn020gepr1jbqd6ca076jg47st7l9oosnlll2k467mhqz9mbo7usoqv8ofl8v9xy0p1u5tshxf77xltwrcgmpivpv0eccvadfb7e5aqufytsa4jxqivlpxi8e4a',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'mrkzu35cxvx6t2xykppdpu9e2qdue5tozrj30js9omaodybhx2hh1ffpo2uh92ju4rrz362r56ms6h3hivu96sq5tq4mdmmqc6z0r152bdehyywlsylte356gf49zz0tpp80goo4riahhzqbldn4hv59uon25d5d',
                flowComponent: '3qzdw82lo84a9zeue50h9spfvl1r9ctjifwp5lsz7hxlnjweow2v3utr2wbhqn969z0wrtodik5clkl0oep0lm7jt3fvpjj2cc4xiwfjhryex1hokrkaj8zng37dk6411y37p716e632wr9de5wwoyf1zta2062p',
                flowInterfaceName: '4scm7ozmaq6vm8h1gbhnib3m15x2nvbz2cd638y3prjoahm1e5pyeee69a8dm767tvykn2kkb3r9jwoji67hbuagnlmsqcwb8fwuiqgpn2tpuowqhjic1v4ptuthbd4coqgounjrnwxtzem59y1f00om89x696l9',
                flowInterfaceNamespace: '8fgabyehnvsip6skzf8ng21t3d8d5b8mz6wl9awqt3kxufzkwngb5oh2b4fnx5wmpa6q424t5z9qgsdjltyqg5o5pdaxm4wbu6laensxl2k9u809vwipqge7pznv081cue3x69zqdpwnk2466lwx599s511b2mig',
                version: 'cpoaibrulkn6ww0aonbq',
                adapterType: 'a2x1hg06aw12qefs5h2woj8kjnrcj7zlmt3dh1euhhl6m36jxisnpbpk92rs',
                direction: 'RECEIVER',
                transportProtocol: 'q19a23y00t42ozfjshn7i6wevxba8hr7r8o4ffjivkc6apu7v5jorehz98gy',
                messageProtocol: '42jdyspmi54uov56du4xhostekmdmetzobqinxsg9s43alo8lx3vg0503gen',
                adapterEngineName: 'd9gc1snlitywfa2zonbcetf73te5d4e3ce9bj3uyyrmyfcvgyjay9fpiou429d5mbmk8x545zo36h2bqnsb9zl81rrikqliwz7ltgzjn3lzyatzrer6fh3kbwgjtm0p6tpxgo0vmhi3gqhbasdao22c0dqe01vy6',
                url: '744fc6jwfz69ry7nui85bvjneuwensbfki8nyltyyy6yvupxma2spx9umxictsx0vt4vq6zjgfuznarsc5amf4k3qheg19g9zipzf22o60pejfdqrqe93yy8sezxmju1qj8ydsz9fq1t8i71qd06ps0bpx413yah6q7ss8v8mv462nshppp6o24bvn9908p53n2218g1387d9wgciprs2oem1qdjiq6wg1cqnh3046283xhjk448c95o2g42750g5xub3t1xo5g3noqm684h8ei4zegqanp710or9f835wkdazwdbqwf64vt2yigv9gl',
                username: 'oqaxcywmqfsw6yyycnrtvod2r5gt6x7x2y2d7q3zuosfngq3gtyl087va1si',
                remoteHost: '9cq4fcncyksgaj0pijsgoipnjvktca2c4givjcbrhgfi9ojcdot8bd69l9vfqez3jnmt0t2m9asbkbi80hrjrs0hzvvdbojtbo7hll715wvmf81jecgdlpdh5t3e8c1nrriwzy6j51ss0u0til4katnn408zho64',
                remotePort: 9233926061,
                directory: '8yi5ld0m7zw7lwras2ap3cxbfwjovgo6pnzcich81p7zh19l7ujdyiaukby1iwlphgo7ql22miskwvkj3qtk1xc4ks7gcpwvqebeqoodo1svvft6f6xwbs4iu2c6cjczj7d152rapo0tsbiipvqowchpel6aay8tcqhamrgndq01slbzzxvkjp30p9xp3mdcl9kqh4khh8p0u67j6lvooriqy1ife3f2yicyf5i9mfjo236nqhumdcrqt8wxuj1n9xzu6tf848m3oajijz7upt57zpasprco2zajje1kkc54xsrugoxpr33jydux9vq2jy1mglqfaar2220lry67zc1flc86zugjpxo9cgqg80vw19lt5hpe173afbmj3ow1hlkl45mqbtzzgc5jwnmuxzal2vf4cni2vth2pykkmxuh1ipmzouu0y1ont8v8rxdk1zf85m8ooqx4tn0q8ob8q0fvkadkb2vavrxcbmc6g7j0r2dnig143ez8po5vxvryvpcrktc6djh3xm36ppaotob9vh3q44zdmwzv2ep0ji5tmb4tjqwbe5t7iu5yahjhs3au2428d5xjjzsgp3mmietyz6wdv27lcntvc7hgdn3zdtht8tmlo7rlfxik5fxfbrtqvp65cj40pn95wj13vbxebqjb2vflnnd9wxdbr94kery5knwfzfffeoxlo07c8buiob0yhl8r1kc41ttsp5h2x2bvc8zl7a2ibs63dhhf31id3867r92b7mig7of4nn0hcg3z135fihmav4xu4ach2z69zrybprewjw8o2uiav7gb83afk10djdnzg1zun3nfpnpvrckrm1kso62reop2xqc31xgs35r4urc8t9z25uagrtd9hf81mqxjr56tvokuuweholny7c815j1fdf73ilovg04yho75qa9q4zsdjcs76urx22drhf1njinb2q8xjba73ub63v4iotn4ewpqf6ntzt06fl04d6g881he25elwu9r7yneybak8m8',
                fileSchema: 'zu3itydegvyg3r2in90tyzf7r73mj7rrnv8g9pd4qw9irdvclll10h5owtpn5osqfnth2ntq9yngm7y9ge4nr9i6w6rcuvnkkuhrmwiegp90xweivbzezvnzuhic062adb5flwhz8uclvc6czur9nd7fmedz6fa20rkj1rbodh9kktjok167qpqzn6jwaj8aw6t7a5lt0zmiym8wf6ka1jv38ra95o40nvdkmbl90rye94myydjgiqhyb5lgepm1cask9rqeb6sr3twhnp2xuj2mmqy6f79e00wqam4wleb4nozczs094h305ogasid8npe4ulkdo8k2ozd93dzvwk7woet2265vil81r3fela7ixzntxxtda7nki4i2p1uiz2po4mg5994edb44d9ea8hjo70zrbjj88nyd0ihhz5ihs8ybkt345ysjskxjll50kw9ccvt63xsmrwisci0496odmoo6fzqpvmtg3octxn5fl250uq4x3510skav1fvslwr1e9q09hzhysx6wf66jidcvduxlht7447xu6aba8nv7zryfjkoa8cp6mghy09ll7dd9n1pe32ermjyfomsm63abcwb91cgvrvsjbgfv7nwp2uy0qygybotn7i9a9fz1ktl7y726t9c00ksnl3gw6jmlifslec1us00t15ufppi1si00wrodzgx9vljfx9ypwp5cbhwxr1e1tqsj8od3vd2tz6ibpsk6w3094o70w8hxgc4hrysker699t2u7mn3wpitqkdvi67laawpp3omuxhsvce35dxul1s3dz57s03z2rh1i0l1m6oesz36td6vhg0agyh2jhxtpt9z1xxop5v5r49gitw4lrir14epd4rwgi77n05wwkgwhdikbmxdi0245apkvi3y1dwat01x4fj2my7srr4u48ya0qiyhr97zb1s6rctvlyqpn6w92a3tinkay6fzvvp3ohfqxsb8q45apoq87vn0g5lhiso0gqh28uooizwc1al686akwu',
                proxyHost: 'dk9z6v77ckmnhesn5wwlcrekydpyx5d3bprq14hseqdvohnb6v6rxnrna0o7',
                proxyPort: 1590837409,
                destination: 'atjpvq72och7d7m2kvf5bnqi64xbg3isdmavhkkznpetqcab6v3er0xa2e74vsuzrvxn2os6abi2l2ekcd5650lz9g4p7lyfjl0e19sc8uytm2tay3htrzcf9p2tun5uq4785m234zvdrc5v8m7symu0wsptqnq2',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ne840p46zd92kq56c4zwpfxrncl1imzv444urx9ybj8yxuhg3pu0yhjgszzpqsyswmjno8g1uxxkqeujb438h7zz2ag53xrgnvmzunpg0q41hofdq15xck6q6anhlu1pxdvasmae42o23ehdvg532qp0kw3mfczp',
                responsibleUserAccountName: 'qqawyjatal493tresfwz',
                lastChangeUserAccount: 'k4yt4ilz8l7hgzahjokf',
                lastChangedAt: '2020-07-27 01:32:56',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: 'daezf4g6bp1ya1yejvk8hvb1e1aq0wilqkh3rj1kxo1vvhgnwt',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: 'wlqci1mtofmxr1x0npqa',
                party: 'upbu9vsbr8escglv1fj90a7mg31vr2cs833vddomkiddd07pkyve1orqmozmbeuzz3uxnfcgl1o78p00e4cg9ix8dj953mu4zyfpt8ht33jrhogmaskgv1io4uonov234y02j0b0vcil5ybcj5g9rdaugfgw6ddi',
                
                name: 'xxecs4uny5z6xoomajhe4ym4r95nnkddyww7e167mg1loz2wlp4ri4nrbhjnbvlpw901ell464ttn0cep1t5o1bmua2if9g4qtp2k26ae8d3k6q0q1gsvhix5y1u99fe6jqef80vwnt3atlvamw5kewgdmdrhwlc',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'qc6xs2i838g4ducov2b8jxiiwbhkw43hwma0suujhzxtcsjlcw72so9u6d64js05lqguxoagl52jfgh8sijtynmossdxvppf9s5jv8gj1emoup0n13w2kxywdyb9slwu489ixn0wxcigs87yr2c3pjqud1i5ddq9',
                flowComponent: 'nq7qxipm2ergqkx9m1vyb4h21atz5jv7fiy2k2s0e6wrvudxvf02o05mjs74kkils6522y070d0kf9n2d8pndvbh78dsc0ff9o8c2ku1d9kski3g8h2pkybvdad6uned0lmvdgv14tb07cfkleiund8pem1thwu0',
                flowInterfaceName: 'hr6udzu55u7o3ia2pyn9wii7yxh9ui5dpojiqypviudmp76ge51s32jganwlq9tks50uwnh99z6wf9mdko7tkwmr15u139rcv7sfcn12kj9m8n1kuc3ieuyse3tm2jdqybapu6b4hbpx37khorufjxa9okxl8xqq',
                flowInterfaceNamespace: '518j79o4hpt7qnreo42u3q31zpk88zgnyasn3qzjk4ug2cvr435iir7jeqt1ifd8ious3julj9gp1vmkqy0vw3wakgedtdv0lg43c6vk63hzwshq7pnstk44yd8c23si2m9w1e6nor25f7hbbymp38z0zddwxq2t',
                version: 'ncunmy5mrqa9o0777504',
                adapterType: '4xeu29grublf9gvshpnwoz60axls1i59rfkqn1i4xij2vhbk9v4yhtvldhza',
                direction: 'RECEIVER',
                transportProtocol: 'l1c2sehg257idxtzfpu6xnyeyd795jq1l37lljubqseqsn6azwf77hayp5ud',
                messageProtocol: 'hk2s2nbtul9zib1c7tew5l07z5jg9h8735k3wjeu1ied9u6i4r2634zeiuvp',
                adapterEngineName: '6ump2y85nal5heun68931oyushh5febyt7d0rwpt3i9oo9e1xrevs3jxt2fk0265vn8k92vkorjp2xna25v8xl478gn40qskgxyayw6s9vqytvpxabz904v731fwue9ske3ue9lwg25k5etngaeerc7lj1wh1mrs',
                url: 'nqhfy1t4i7fbo3ijmbk50hwfmph264m1fjynlda3uol0mc143c6wgzkurs6t0e7qg9ui9turka2esyu9d3i5ijo1hxeecq6k54n7uxkj2oppaalfrt78f44whb9s94d6tixn88ggy4ehwsjr3spw38x1wvgtgb2rtuijolgb9jqbhi2dtpx3s9y8yhgl9cyoj6b483u77oujz1sasika819ycze7nuh73qgd98l4hjxyp5g2yo5ulhl8taq96bm9eyp16kd147b1bg1e5mfhrhk7oapuidzn1ja0k6jn2j2h0ukzpxnbm4novog0qq6h',
                username: '84tu8i7jiyzlfpu8bamfyssrv3j3z5llhpexua9cfza8fmji9x6e747yxv6s',
                remoteHost: 'nmuadrjufyo7zumy1xxn5c1rnonqjneidxthsxqnyem5hf79be84rz75c32svrdwm9n1ul0ihk8hsmp0on8rd1qaz9rv6ph6w1fu5ray5c521yemfy4590fvutm8es6z1cna0xtvkl029gzbjy79iey3j0xxch9b',
                remotePort: 6241244142,
                directory: 'i4vo84gi96yd03uvfcgdflaexxcgqytfd5sctkad1mw6tgeu4buzlatw631gjs28kjq31ht6gmy0kda4a4szmkwv77glcgbr4sn7ac0fwn698vxbha0incruqj5h1ywb51vpbr9pvhh3e6u065un7vdckoj4clps7drwimz3umsmsdtbrc1hxk8336sme44l9kp7vrj28oill7r33whuld0x82v1j8hwgtwdbt7j5585ypum1r7gqo9lwittm5gco3rav1y5t9xzumgji8p6gw9obk5cnz8mcwncxhjbsuu7wc87q5jt3lmbwvp89kmei8d0jyhirgzolysxh7jllu1mx6if8z9xhicx3h8fxak2t2x1l4dp9fczd8b6s3tbm7u3cy1wwk8eeg1ac3olr9yi2a0f229aiz1xztgvrd6cx4t1fxkpnzaowxw1rzfad9tcohlcayg73nmjxmm9fxhe7s32teluhogztzzlsnwiofe7whhxut9zondytnzzxi4emb1tg2orj6e3uhck1q3fa3tx865dvbp1bocp0c2kqxsk9se19l5nu1d1agyc2r0jj8lhtrnn31uhdytsr3skfjqdn8rtvj2b2ivx2mqep2t2dobxgq9dh80qyndk7r2rzv6q7695r6igyb551msgozyki5o967zgazqt4bpxl6fo8m1x3b1i0296qh3dfe3fpph71f8ez253uzdefgnujxdr77e2dz6mgefzxj1puzo1z9y0u22sc35k7dgy7eyaqbp6est92zug9ec75dzkel7dkppnr9or5xwj27c9qq7ts799ay6esoc5yt6iagp0riqyrbgf2nlg7h13o44vlm69aqe58zxy5cilxouxumsccudzy4ocq7ssj17pk64ybay9rmnc1ul2hr3icye6s7u82rip697xvjjo06zxk4hsqnh9jdpe1s6no3ml55j8corms30s692avsnt0oeqo8qtcm334uxi66jgepkviwqilndixusbm7csfy70',
                fileSchema: 'tozdtda4ni3up4npme6sywjiganosejhrqry4yaztgod5y3mi36g3kef02nfhtvwsgjf7a97zpai5igv0j2qrow4rbcdwnj2pcsfmjwug0rq20yt6hphhf9lycj359a3ttbb8owxpe4z4upl6l5dkpuc0adc6b05393ux4pwnrlu8glp9z5byzbri2jqq737d5753ulnbm68riytj94jij2df4259k699z9o0aqggyny5ruh1h12vu0mqd6autlwszktciexw0pj2gggexvdbahtids2qkhovsggayc7mrqd70p90125j8c64s0woku1ofdsctdbj3balj9ln0k9nv4b58yzqcmc4uyvwtgjx7yicckggyz1k2e76qhm28ob5c3l776vh27mdfm6n2zwnspeqmkvg7u4xidlk1ykkjijq0j8k73uaayn9tfvpm20v3698swuwvwrb6bs7w4urfrzv3a14h62hzm2wadzxcrahbc50dpilfj5c7ezfgzme5j1zukplqifvkbht0qf3kcwc0m4zj3lnbk2kk6uua6nxoni4u6erib08utg2nyo9srz86xgmcbw3x3j4ukb1ayfqfeynf9zdhqxbho5tdfsgrwcaktjv9dz8vzesvs9xp5taw4hrrjlmiehijxsbcltwhquoel0rhf29ot8mke572lf56lyx09bmonchc65gnh4xruutedwq8xwdog1zcxdb2drnd4d6mtt35wpkt58biotobsg9v59n0qz0p681xdxccvqm3gnq7gmaosjrq7ujuch4veqvn6ucjn7lot5qhmd3t2dm53tut8nnoh2m9wnfgrqwqti81dzbmx37845ggj65v44dfktbomix4d341dy0z77r4832ozazfcy6feh037rpbsz5spucsmnx0nmik3j7ohqcwyyniqhvv5q2cr6t1kre1owyl0z6xygfwlac1q7fz1l7kn299fkdmoro3vt2houl36snvooiajgj240kbwzk42xg645h45x',
                proxyHost: 'zsl5dt7ehfr2g3ofv9t3pdqirsqob67mjxkg0zeute0wqk9xkqio4o9ovntg',
                proxyPort: 2787825806,
                destination: '87lnfd89em6vw12ecwbt1sbqvm9ffquidvvc5dov7i2m6hh9xnwpjhhoemul94pgpzs6pb2ahtwtrf23jaq2fvl6zttyiwyfjs5hyw1kn99pby0vz6i663if8yot9tcip8jjzc7agnn65825o30k4nw8ny9n2qza',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '11r3ofhi8kpazv3ftycx92vxjc181jaom8yubp1sgr1df10rstp9b1s34t7ajv15bxm27ov9orhp30bbaj3846ziifkyvfr201vmyvvmff8zr48y9mz3fyhrarklcgtlk2sgngfemr5bsdu7nhb1qjemu3p5ynux',
                responsibleUserAccountName: 'j1rdmeddrl7ufjb4vbj3',
                lastChangeUserAccount: 'i3blaabqu1b8yaba5823',
                lastChangedAt: '2020-07-27 11:52:40',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: 'z9hmcw5x1dtr7stoodwonnv90rxnixaomlx5mlxggf0w22ygbp',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: 'xx8dqyc1bt1bh8tdkvg5',
                party: 'dl3h6y1sproivis3emw06g4q3qizcalaapahuse030s4hok37carl126zelzspswgn9z6o0pqqalb1cajo8ulzrcl3bs3s4bply6tgqypgs26odirgk6pgzft9p5366ct65avjja2tl08f13byj4hxe7tzcxnep7',
                component: 'yvo7sv5p7hazf0vygamurj5fi8o36hutbaqhs6npgo5rbh18nb5x3kc043tbm2fafbinvc4uw5qoo43w2w6h3f6spxa0ay29ehcg3ppr7k0ev8ir0hia6sf2lk6i2ytw08fa05zepla70ltvg2lbyalv9bz3wljg',
                name: null,
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'i0fd6flhu7qfdreq0jt2sow6im887ufazpabxdiwze1znpxgec47udrfbc0mbslpld136zgudcz34chk74lmjdi3vlbn4698fonp1wzytir34ogvkghi0c2n0gxotoim096nq8mflkyzxpjspdrqqoo70qrrnmjz',
                flowComponent: 'mdn5lzthl5muq23mofe7ljcbs1wzvib7zmopat2hq2nqae7l02fzqhmg2jdin4fzkabbnkiwv518xbyfwxiw55l8s1jjud3o6uqh7qefxqa6befwnqe9mnc6gsg6xf687veqcmm3z2mvp3vize60vk5z5jlsbing',
                flowInterfaceName: 'b3epqz093h04tkrj71j9aays97h9h3r2q5qyap1ihq31ls0z4teqkhz28txrghu948paju2e5qphp3h0vonju01z6dl28eooftz5xz9oqr7y8q9u8hst1b8o0cbocqaifz992po0qom7sv3hapt8xo0suejfhnr5',
                flowInterfaceNamespace: 'yrjf3ame61tdmxxpb1kqau12rzqbsjuc4htp3u88jcrx8op8p5nxhme6hhw3c2oyjxj35vfud1xkhicl4z0v6d9n5j0fwux9f8em702vhpmkmapz7hyd005yh855n9inrvx4kpzv26nfu46qtolxjdcxb79ia3b3',
                version: 'nluqpn1nfhjablyaiqy2',
                adapterType: '01b6lf1t5psvesd5o9w1v8tdz19hnlx0fg9tx2ft8kmvuwdzaj94wxkc9tc8',
                direction: 'RECEIVER',
                transportProtocol: 'kpwtfsi5kjf0ggcvkc0gtxozh4269u5hiv9wpxynvq4z8kyql3jkvlwrsaab',
                messageProtocol: 'pjs7pcm5vbdd0ccxp5y711jvwaikloyz592891xyb3xarb423ji9p4gvk4g0',
                adapterEngineName: 'zoim9kelp5i91y87yreibficki5lcdu6hv8wfeq5blh9yajbyekyheiv35605hu1qv6wf4cs3sbkd0r9lbh3zas4zbvz5t92odzepeu2m3phmqe4e57uvhmfmrljqasc8lxk5i4c3miwudyg3t7z48m4tlhontl3',
                url: 'yn2jxdzo0cruphkhdegsmz4mest1db97kycr4n5uljj8loy6ina3z1nrqets9nuyl1d8piwfutycb5y4bsi0vdh2y2hny1b5esrhml4b12x93ay3pq7lb25bkz16lmp0hgq54x6x7l4jxohit1fwbgua9ey6dshvh0u55t3glxe2cpmeusyxxjasnw1a6qwt6d625cxv5ns6shti842olx082k3dxru4qukngmny0f7mfuqqe1kztumxh671sh1ww5lms34w7flctlpfafu7qoilkvjoy5mniu77ml0lw6sud14st518g5timj1zsyst',
                username: 'niigtcxh6w1artf8zcensptz05rssw9880yhpljy9ke5i6jugddx93z0qrre',
                remoteHost: '2l26esukjcyjj6fr03vp3dqqjn06tr5tq1kv43s2d1j795go8o4o2mksp1cqcq37yoajcc1v834o5gvbggnutv7rx9yysccv6ejyowo3ok9b2vctwewtqdz3ueqw447g2lq76c7yz0tqxlt45e03goq1o2q0scek',
                remotePort: 1175383418,
                directory: 'qogcez1dbmoimybbjfsyktib0dfq382m9qht5s4i63cljhdoy0x6qxs5fngluwmnyda3ggvy59jz4mvmi3riyxjjj3gq2dwd4r6wosbp7ung8lbpmltlf9kz24oy6n8w8mglpu6v3z71h6sm8nrxq9foy9kpat3qxalpbdc6t8okeraco2auvh5voct2b707av71y2it0ut7n6swp3t5h0yun4bgcny628pmi2fylprv770qa9wwzsqy7thr1u0wz4av8rm4d8mbyzou3iuk9l2tuvcs9hgfp3n5mr4etpaec79x39wgq6kofigj18vi19rn395zhhlejqor3uzehc3si1ohz8vcy1l1oepn07vddscfua68q9y7xp7vl6v1dyclgbxlynx40tu22v8dzreijwte8fm5elsutgamwwourmvf60vf81xwllah5hqvf3ia2jfyjq9zd716068qmc2iw6y048yjbswt10a75gsfhegfhwqskrx8rfka1e991v4qvjb2ga63i8k0ndt606k1uewfrekmvujq9loxmxa2474dbcd0fwstuo1e8dsprkmskf2dn9pq6f1e5zq01gpwp4zptqa47rl3tibznj2oe9t9ben2a6p0kwdp03557auoxxt53c89e7akj4oxpi1dxcs9spdjoztyege4d3jpi9o51nt9bedokq5sdj2cx5rcahhnivpde0he1gvesinjjv57bqj5rb9anrz8ixkmxqkkw5h2yv4pl6q23ut7wpomcjgbnawo9aq6lv8au7sjm9mkp6t02qyzqrx4iyjpbom1vd8uxcpipajwhgizook0zwzqpuz0p95d6llkp4h9i7jo9yx8ju5kxvudqbtgcpc2ige43pkmmevs2wnkjyxh7c0szb4qbqmn44p276avpv20onyqtymz4tia060tphagfq92ejgngex1c7l6qw59r2z2r3p37jjl0uhyue45shnt70dc4vju4xivx3al1oejp59yz5y4f0duygr9',
                fileSchema: 're3wm9hvvi95khtoyaw7gljyesu24euzn69o9kg9c2ox6034str8wetlbtwdxxfo4okh8nkzu1fu83a0dy14kpzylaf8dx05thav8jx2w7v9momqmh7ry0o0az6v9np8rnqlfl7r4a8255o1ats3xr5h7zbm9lgtye43kkmiark28zcw448hfc1pkt3z9sygt3xm9vkzt7lxr5f3jwnaisno9atjkfsxrkpo7y0wc46saqaidkqufwp32i6k9vx6aa0mwfo1xll5azmxm3fyqz44lcqn2f526tq1p12dhoue3bm89xsdrtlj0rsako1yqqt4mrcq7umlsc26oenmv3ake653jqiag6uioowf610jgyaw1aciv5iwocxdoyfwk2oh15ut5jpra6ss227eqe6ly225hxnhweicd1p496cmgp90bme0jekew47kbgsccdoh7dpqmfhz23wns75xki0xj4cb5t8wb7j3ntr7etpv6wvid0dvyg0ei02bli9gike6acusdscub1rmr274dvk40dvjihghjrrrrxcpqpzksv2mqn7upyovdigidujiigdjkxiivcckbhex271ju3walsfjuk7q77cihp2a4qacaxpka3s38hcds8flknkods6lylvgyoje789bxw2kuqmy39lpq4d1tg72d1dj2kt59vs1hoonlu0fsr4pfoqije91wvfteqjmkm34foke3h7y7ik9mp3yj9gvuh9re3xfnhnl89eiam07m3ju7oy5qilwdclk5owvrpsx71n4gqa78ounrt2hygkr5vyt9124egenvzh0mos2zd01apoux4jk752uawwaqgtm79rnj633rzktqsioualntq07o85am988e3azivu5t6kp7oc8zu3ze57pequ9gmujl2y1wqjlxcu9ql54qxwe1fg9w858cg0r3ig1u9qmaj6aknd1rufy0dr3wwn5s98dpnvjpiyqlic0hztmi9xzumh53chav6fqqspsyu7yj4onr26y',
                proxyHost: 'ibmeiqq54st5wue5s026vvt0s34kp5u9osinb5e4wcfz9jvh9xylcjrtu2vn',
                proxyPort: 1445963164,
                destination: 'yfx0xg61bwezbrjvz8vx9enk3ison1twp7ss7yg6s7dripuv8i62d1dq1qj7wrttl1nl3gb8e4h3kgiicfgwumf0ouatdrklk160d0df3p9l9ftcoiqgppi7of9cw25q5jfcqpnwjgsairwe8ucl7gobprlwtwni',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '9i9csacywvrruk8mzk4xcogu1aj7kb48j1gkiwdpldk38dyygsp5gzaounrwnueq7jni7qcep2lrc2deiau9f6n935xjltc4cc00nu85webep08lfwuyfzwzwe8hvr2fr71m47lbniipwjdduhlt63rscy7ygabf',
                responsibleUserAccountName: 'ie6nwkswc20irwp06u6l',
                lastChangeUserAccount: '8q7mtxpq903efrqde8vt',
                lastChangedAt: '2020-07-27 04:10:45',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: 'zbznczq6dsvalflce9o9u14gxe2xbbl0xu366nt9kktrk8waot',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: '8tzv75pxz1nntp0qhp5f',
                party: 'srnhst17t8j0h0cr7s8sylby1t29y2od8pto5skugdhvdhl1cibnt7fkwexrjqtqz782xd3eqe8mfshx0chgz3leiirqid9abkqm69w486o33fagxezjrjb22c1c0bni562hctafh3zb4pr5bkctxu6ts35vvtti',
                component: 'i0nj4sl455py2caibw34ll6c50bb0ps6859jxyd5fzws4wgf88p1xn21c1ss1c1ucl3td1yhzma0v7exh10z6zja3bk7mu9kd5ipd0s2onrqmeu6vng0ndcqj89s08xcwkt2x9qdxze113uhy7j293w5a2s4f1cn',
                
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'gbn1mdw4qxvgoih0hjpt5guix9zanl7t1ytv95sijxzykw3cz26wjfet57tih43cbeoket6wsbicrk5ll68zdkbjpm677lrnbs6prondq2klo234n406g2e1v106dbyq4vsu9dr4y515zoam159t9wxo9n51o13n',
                flowComponent: 'abu3h1fqlgjt3p4ak6qn27bkctcwhmd4q9ovra1d8no9grr9zxi2xdeseuhqfmdnk7a2s9d5qifgere5xspi1jahlkmoj2shaxl7mzjqngh23rxftz9eq6ofj84x8ayp04mnwcde1i2cpj8y53d3zh461j6b3nti',
                flowInterfaceName: 'ivlwcsh4fngmtmkwm3mbwb161q0ekts4w5rxixu3vzes9hp6t51kmfamdph0awu38g4xt9zs58dqolxpkyicb27baa71h3ihnphhw8qsd04grhfcp1je6l1epmal3wokuxw47b1cp8mbi0qgwdqurghniig4h70w',
                flowInterfaceNamespace: 'jmbugrlgaik8l6551k6n6289s3ovj7nq4hqfgdhslbiyb2t1r266dstr5ge6a90sbmmxv5ifpuu5vkrbg7zq8oie0oa0krnf06opwm1qzdccdumelke644n9hdahveo13pxohx4pugljhrdqdhrgdl5mkor05v1z',
                version: 'blj60168cinu57ii1uvt',
                adapterType: '7qtok7f5whkdypb99kuauueqkr8gryyb2u70tdizle5f3x8imxze23gph3qb',
                direction: 'RECEIVER',
                transportProtocol: '5z36jvjfcio9hjvn36jsq1ozp3i3xh20xhgccfr1g489x4ckv57dcnvmmfn8',
                messageProtocol: '9j23fsbn55mvvjz0huarojrg59bz8bchj3njs60hiy3peq9jv3my3cu1dvne',
                adapterEngineName: 'q9cg6hc2o455j1iy94v4kgv8vq8vpozbc5h0egz5dlftkmqfjhr6wieu908iuz3rxz1pz7s9yvu5ahorhkioseuvhylig7qzgfqjtysdgrjzah9trs04y5bkvol638z4yu9wrmpxeay52l2pb971agagpyzze830',
                url: 'f4fcja2c3if1ji2k7w89ot13zxinvj2798lqv127al5eokpsmazxdsgbs3ku2bb0tgkziw1o3wq6z3zcow4zvplbkpd6seiwvfr3uc4hv3ilag7b37f6i2vp9sv9o3921rit0x7tvkfxkx84951nbkzf4nw69twwbmosqcbuqceig8yrfv8h83w748aae5eftjxtoe0es7h0wso57io57qa3u1jpfe16okt449m4jd0jlr8iyn6vg42ug7fixmsyvkqe9hhay76x3fteu65wkpr09ly3hw9ndf1o5rn65pqat1lodqnrplv09tflenjn',
                username: 'wh2j136z5mtpzmzp8orxb6hf3ghiid7jnwa0tgzy9ua6wkpuytszn1hl90wh',
                remoteHost: 'dhnq9r5n9vxmnw2oiqcyp6opblmghse4tlvishaarn27ohaclsae081emv9wn1o7wz4sceab9qn7vdjivu2upbxpsjq3jrsh88dfk24t6m2vxz1s5vjxypn4p0e4pa5fi1fkgp59efj78w0p9gk69n5dhf7a60bw',
                remotePort: 8321400616,
                directory: 'y09803k5eqrt1ogarmn4ry461qhirpgyq5b2i1j83aejqhbgm009hb8l2st8fz5o5oorr9av7mqvfzh49e0o288k7qdi82qhj3eutahkfjlx76dydvuaop3w4628nowp09440vo193hpp89hxxkup7pspj01zrna3uq0khi2622uq77p4yu9c93nngwv66lcaumpni09byo3jdjthbw6fsdgypjubj1g2583cmubrxq39iapxj7yw1opiqv8zkj3ztbcem7h4nnn3cnlpdey2ot2mvag9vp4wps06jbger26gmin65e0secp4p9ogkbpaw8pcx6bpfxs8btu6ssdaoo3q3tgz6pc0wh69u9uxuearop30lmlyvre89lqw5nc22rec3y3tnp2h5oz0zmfp6mtfjgx4gofsv4qlygphc6qez8clrai71f9mk1rklqehp5gynt0eiisabu4tcsypm82orrsaekouah8m0zdz9vvbvkcqwbe8w7exxpit8ofisryofeefd89uyv34j9rvrsrm8ux45o7t7u51dicb5snyqiqz0rzw7bjgypg3j9xghnq86putafw4qlnomg2w0snbz3m9jqylvgjovqp9w4aunx9j3p3ywbtlz72yv78w2c7q33iv0fw2saqucd6b2rmngpt9k7s4s027s7ysd8wlwnx8qsgn1vi6wipgf0n4xfbwnn98r8bldh4ibhepd53ovodeaq7twleqx28hp9uydyu9qgvgfy3jpdo6kj9yb6c9g0opr8ewa5issiaeljkjehn2tu20iqwqzxw5ialkxtew2fnr0mygz7j8yxgb9d0a6ic5x3fsimfld7qg9w633c2qx1en8s8nhm6199b7e649hr00b2slkju9g3oagw80570vukcqtfk1a7443z15nomq5zce3gep0uin33w35b9g9l3vqr54k88jztbqm8euarq2ln6omzwkejj3y03zvh8q5cls2a5fnyf42qy4xzvbyf681qonc3ae7ya',
                fileSchema: 'wbw0xzvsizei0gw0rf4219s62whgmdcyd2nd2ui3x2l0kfi2yrazcu62swtsn4jzobst2bgj1h5idug10nijoqpfqrkwvymbhjm31n616ch7ctbu3rbv4fqfqxzgz6n4nepxwdppszscthth4wfn3ae841bs2xo6fhoqh4o93tansgmyp1ybraysyyhka72vh482pjbt2udukp8jnk2ld8deqr2v24ousx48z6olk8ykc6pz0yardw5iyhhq5e9n94vgi9o1fslkjhl0tfqacs0qizonu4qm6lui951ibcw3evkkglrmw7y1dss3ywkutf0c8gmexvz1xea68bsqudd11ncz9b2g1uyqjo4xitf7ew6uvm9o1ml4u376z9y2jrw91cysogzpobout7jnciskse13jlmesoei0pqslv9nutynm0z5mhs6ui2dub4f5yu07lobqktt672tfop219d862zyb03p7cllekaj49uu16l2foxzzr9ondq2jc5ms8z5l4w8tchvkkh6uucx3f1t48t1z9z6ajehbskx1z4hau34q0ab3fdynl8n6o4dqbxabyltdp541n6pmad4jtodmky4jcj1406930rp7c3mec7z7i9mn60dojyze85qbdryei2wysracfahy6dtic902jyzioyj376zm2nrzuwtpiagrnxi2kcdubqe8q5rw7z3vou2axkeekpigmc5grsw3n14s3joj7vd6uml97goavr9iwaqwzmrgmnj34qwfkbewx8hiynvlxyjq3dmeqkpvnd2fpuk1mrt94cbmiv5nxuu1wtcmsm9yo9ma7p0ctj5xl5h6w8c577qz0r1s0hxzjcgidq5w24wvnqjr29o6bpx2hvvecqoflxpzv5hvdgk1iptbzjstrn7a81oduqyhsy57zj2gbszv8whabai519iz1s92klxledjlu7t9c8j9q18l9zhxr6ju06ja9shp3p69roo8vcrhp3rtnnof4ed2anfu3h9ye5tej93',
                proxyHost: 'oxz0ej0so4nv0xi54lluf9n8rxr7ivup8zzdx5b25ktf8odtgzn4xjpmnd7c',
                proxyPort: 8519443703,
                destination: '328po0hhwfa5s3k074ne5ilardh3bgbpi35ifsmgqso02zigefuw0vxsr7x5cqb5z4gc2i4jnm80p5g85j2ringyvk546ojlv4a0rw8b53j8ad3opz2d3y891oocyftgpurjpk56aoe233avc9ahdpvl9tm5oynj',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'boadtcda61v9i2ade711zdfr32jpngm0vxsk2oy1m6tpnd9rhi67cy2sefyphbp2mrrvc7nd6n1nkx0xi9q5ls9oy9j0t0wwvp7tzvbd543b4dyi3ory4o7f4hbcnt3bihtxn706u5tnzq1mswvi2rwfo3pnvt07',
                responsibleUserAccountName: 'tslsdl5d7pbh3jx8b20m',
                lastChangeUserAccount: 'jguceyhqg06bgnljh8nb',
                lastChangedAt: '2020-07-27 17:11:59',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowParty property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: '9fety61z4cqmn4fi5sofpnbvnabudtyou9bm4yie20car12u1v',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: 'bxz6drdszd12dmhw14ht',
                party: '1sy5627fjxpei5npmd70odel2r2z2pg3qrr0pvkg0vqi5267wq9z5u3ufd624fm0v3rqgwueh7lzmymse7p6e88num3909aeayil17x6murr8s5ftmbsk93posjvwgs5vvvmhc2r12zbnkxsqrskxfja6ljzhx1w',
                component: 'un1dmb1zzotxht6982spmmqfc2h58pmmckkgvyx84w4o6awib8823dvh823h5t75v9c2gizgslysnueplyz4jx7nqw0twqdypn30r8irld3fagc8nnl0xc8sh4efubkjyjf1a4eehyov3qrd636cvp7w8yqff5xm',
                name: '04zxy0ozv0vlmr8nisanohed2ljkvz6sn6uf8bmr0i9rhdbehgft4uvaw9ksstxpco1sm17jr5unap4qz7u4n024bhzoq2pkf73am0v5uxy1uw71bkh82vhyhrlx8epzn4wi279sirzh59llkrpw9l3cb1xnbkh3',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: null,
                flowComponent: 'wxtj1k8idrnvpgabu2o08vlbot82zj0puvmab4776qa9c7feux4v11ro5oudlbf0gjhc72osu1vk2559c2vwl4ctjd6jyo6liaaorduuq09qv7pzbhggl5nrl46tsd2z3n2eumx3l4vw31wk1yykmwvkvuoszmmk',
                flowInterfaceName: 'rz68q3lutkcn6ho4ma1gkxfe4d4p78v5u2ovi1ysm4d3a1hu9pbx9e61fahta9u6fdfbo66hcbs9al6kzo68rhohn3rairyd4jt0k610l84olsm7unxfu6m30kfhag852zj1b0roz87tayaoo0jz5i6scmmppn1b',
                flowInterfaceNamespace: 'p1ew45d8p3koeje38kt9llkznjzu2peo3n1s31rxd8lh3pwbr3zmu4nklx4ns39e63asx5usi0hbvgwwlifiuogwjbdru1yg7h6g53nkkyeng7zhi7vsri1pgdgathofqxvc2x3dnhwfww0qsyimqpftj4qis97f',
                version: '37vauk1p0e9z36njhj8m',
                adapterType: 'p8m68u9tsbkrd34zmbnyivxez1l9o36pswpi3xxx7bmhzne1fuv8dbt67jgx',
                direction: 'RECEIVER',
                transportProtocol: 'nuy5xbhabi8c1oqnhpcjusekdf7reux07nmhwnhndm4c2wcz7vbmyzyky5sb',
                messageProtocol: 'kiyw2ugribp3ne7r6jrbqpar07gco9ralx5wotn0pak2i07iwo8yyc666x4j',
                adapterEngineName: '4rbiqvfnlsyguynkdhh3weae22jbdlve9v1ucvy0t3e9gwrd7j4v5isvl1x5eojvqq1b0300gxk3ginptb1m61o1ixaa3b49y4w0s9ah3lkhwpatxka4ipif519uga1zuh03nc70rsq7gcj53t4zzkq29ocdfz1x',
                url: '23hxrh9q89z9ochqxbxwj76xs5lyjthh6cpfgtfw6hvimgyixmpfv41d3dlmk5uqdpdmq292oa6pzmhug746mrdjactob1bls7yzwge82bcjia6z3btan33nfa40ktp4v974omkpha1570rxwwfhrsf6aw1cch5wo6ll7ivj420uqs6s8l9bpehp8ridyjd0nukj4q7omlqv782fpd5gmvleex1wki00fmt1oq627x2c09ohw4k0m0asezjcp9o5pxhhp48fov3ndls1dvw69sfe3rfodubfp3l1rsp9075zvo5i52ebal7fe90g7cqi',
                username: 'wip5wi7kcom0ykkwe0vsepppc9l2p0eiqv6qsfneblliyt4n1vivp982xu3m',
                remoteHost: 'p0vpomcj8hj4fr4dua1l2yea9qgy5m1k2eyud09yh6miis2dv4qogskkn547r875v4ys4x4g7nbylumvk59soetgo169xeea7eby5z0ccsk79eo75lgl3q5w3yewzfswty3rly9d44lz7n9lu4tmrncubup4hl0x',
                remotePort: 9778215356,
                directory: 'uzygztro4erv858haegbh20udcevovbi3jynbossse2uae9azi70csvug7oey3qbdj8eexytu6hwsuzdjy3l6wlhzn7d47i4k0cvefmzvtf4kmqxpmoxjed3w2ve8h7yrrztgmh1k6zeec328jonsmxx32d3pfl8k41kpkefdu5ms6of5hzo4y4td2e112j2uunem4tyw8cw386rq9xahn8faze3npttrkspg4gb2tzw96xxspccj7wi57d4665s523ppnjozntac7d2kd3gk7yk4d7omgdkkp1ojaf8kvhvodz0860ixiqcj2qdh70ek4qgn4xlfu6rgae0l1jtd5vvky6kt4pj92zuepd9geahkfbgik1aw04oggg0kz5u6tfmodg7fd6llzqal64dtgt5bj9ldrnok4levrs146r3hlrbyerq7uwh7y68dj5cta7dnru36574xn5ta43rl2yaezq8aevw1qjwsp9am1mmmvt8unwjem0cwqrl8vfpu82nffky07kzo4m117jjh73qw8hyjpkz79wm2559bfx0q3sjlbdd1r6eo0letettmzbwj3v27xlv9njfmhrtjvwn837cud3w9n0tc1lk3wqfmnqoiptj3tr2d5n95sgkwuomrk5fx3nunhn06txb6qdmj45qfck2jk4qxqe0d7ys2hovcw4mxi6b0fqahqv9k0s5fuozc7hmn9miikbxqr1vfbxmepft1bda7n4c058aaj76ft4k69qienoirxdx83ojz9hlsfwqcing5qlnhbqbdfhqzabgj3bfv319c1vwq3goiiq23ganxzbzgoxahwjtqjqpm2on3k7iefmkszz2jx9oytn6nht8siw27v2mhnhyoml25ggyyc8zc38hk36jzeaj8znjvz52wvln2lxb6u6w1t4ohggu7ppqp14020zagf8mt39elg35qloppd3qotwrwtumx72co2fnqdauwybimjp0arz6apzxpzrays42getv92cw7zb23yr6',
                fileSchema: 'w0jcyvi302mgihtzhq3cph9l0lk3t1kibp3x6a2ivzedm61cib9jt851074y0m4nhg351zlegl7vpvo3oy6uch4qg2ya3dhmjpdssf8dzmv4bexre9z3e6km7e8pzgmvtqos2htmic2gvodg9nafzdi2rnc4lop301t63ylqmmjt1v351mekx6bn5jjycrz1khthkqgdgy6nft2u4ixmsmmq5d0h4kaa2phwzg683bz87ucxtn4437rrgcsxukcc71cjxhy813he9hs6fulcir0gww75xzx1r4s2h1lrn0wpap2iaoxk3tqfvscv1lauwv05o1jcz6mp9jqmmqj28t0ggh2eoiazg2j419vexe4ayhg3d9utnjvllfjsf6bz579m9nlopb8c6x9z14adxunjijkaus0t4b2fel66nlt00pb7ii9enmabovzrazhvk4sjgh2yv0skaztpwu2vrcrorr2hvzsc4u12pnm4eunycnsqksykqvrin2iryyppnpgctvn71lk9pmqa09moslow1us6zowlweczngoau1j3qt0u46rv1ygx1zw81jljf4se1h3z0t112dvn94vdckut7zm6g2pcsbx3kbbvd7jsbyy6dhrl26vimixg0bnslp3fdlnzovybq1spcmc3j2lbgcycc3iufujv7bk027zv1tuqn3d4gyd6i2stwma06ffz2u6o10r1xtkumkbfdxfw9ktvm68rkmolacosxfcffapg9ndp2v156ed01bpuddnk2r26x17waghb6zzd97xycyiehajcyym2x63pgmkwdkcxvld5i0lf23ycxg0zpt31dbyc1vzgfl09k9m0ycv4wih6g2aeh6kromuavqtvxcz2c6gz7yzb8x6fb8d3lcrjpqsbvwolnnpxfbao56kfzwt1lpphf48me48my8tn2nc1jmgxwmjzawhymnq9s4etgvphi0igp75cp8pq6j93uzpsldxt4yh5y1nz7fsfgwccczdsyemf5rm5b81o',
                proxyHost: 'fhrxk2pam2ndikjgr2539ltapqaj8oxyfvjie2qjvta49pfpvyomxjk0cpof',
                proxyPort: 7736197283,
                destination: 'sj05xjk85455yyd0zo8k9y15o7pb3ie0t6br765a7458uf00jhnma35yjn24gbr394ms5d4s0164fdk57ppbialpbbpyil1g99ady6zf71uisvqjfdy0cotoe7tvu7dwwa814k0301ia6od4nk0bpcez7lt7gr7v',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '91vhfmk1j0wnl8ljq8owrr4ut4th6bjiocyql3yo0iwjaytendlmh3qs2ifqczgrqd0flgb32iwifn6teh8i59f0rbx2uo4kms5g2y6148fn9f0gc5dk60kjwf9osqd8gxwfq9304y9l8g7oaszztddua16opj2l',
                responsibleUserAccountName: 'ux2eycjohqowgqtaoiji',
                lastChangeUserAccount: 'fwsxk2v144yslkcs0ppq',
                lastChangedAt: '2020-07-27 02:54:42',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowParty must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowParty property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: 'hc70ypak75qta1kgs0cclll6bu53xqkv4a59dh648609uy91tq',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: 'bfh61e75yoou38hzggww',
                party: '464adg47vw3lnzdwdgq1eu3jx7vat5uik8p6dhhx8lkt8whx5awtlbrsmr5o32ccr4kwi4ig2zmu00ydk8za1nqa74ivf6yoaj4vtja1zxs8lkwuaknnh1u3cqvmkqhsf0pvm6wp34safa5db93gt2it1c2v3mwr',
                component: 'zb6re7ljfx9yov7z22ar7e7zko7qp2g8llgmegqepi8exafzzxgy3a5ba1xlyt0nzm6j8y7t0qo02zq6jrqn1isg0iywlcswu7uklkkvqi8fuiilkxwz67lg6kr14ofny567nuk600t1xk5aly87w8yqxfyfjujx',
                name: 'gc2anznqy8jgioncywmj950f81tqvuk0go395kwnho1fzdcrq20jxlz6mtrva72k38wxmq61roqzhp1da0pgzrnj42ri9r3hlegu9i2t7rdcnqacmvsa9cgwkld4uk0owh5jfcnli9ept8zrq68al3qzh0nzle17',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                
                flowComponent: '3stxk355y2anby4qeh0mqotmzlkmhctpsfc9s8ohy6ohlnuhdhfkgv21iis169uw84xshl4qv48zquogvqkd257h0ufman36o7f1kna4g81bne3j9hlii9b7ik5ykmxyrmjp4mfdyrgr54yq1m86wgyy7d4sg06s',
                flowInterfaceName: '918ar7ps30mmniurg7ja5ce8pjyqrjxdabs52qs1az7hyy3629zv3qku9hz0f2zaqxws4szilcycc0rvjs8kxd0j96ljj2u4y85ns93i7856i277rfhbt4cfxbx1wgp40eheqj5k6og6oyypmsv10mmshflz3ye9',
                flowInterfaceNamespace: '699wlqfo56al6gd60tij7qpzisxz23dvdkfpfe1gglemthy408iv07a6njq6uzb9dydd6ran7malkdi252unaev4oicbwuv75jcmhzp4ji8zjk4k4psdnu03depwxixb64y2djnvcjc47os9wlophhzhm8afky8w',
                version: 'zi2e6nx6qagi3edruxch',
                adapterType: 'av7r6mdy8csknsrusfegwqjbofaj9re785blm5x5pl9znc70h4n8qyznxvgq',
                direction: 'RECEIVER',
                transportProtocol: 'v0we4ijy9d8ec7lmcl9x1i7ulo1axu0yh24ojucz25ludud3r0387nv4r3l5',
                messageProtocol: 'aggx6ph6ir6mkmsxbnnevl0awph6ueegghgqj4ohnpsvxw7fg5bai4sp70z0',
                adapterEngineName: 'nyc7b2oxktx5orv6kza86s9liucuqv86vl70p1udayba4gqelypxufcgkb2puysy920ml1fxu83bus8f9p8jmpdqjj4l2mrjqnbrdw0ydopjflptld65b38glj4shtdicj3hw8gmreedp85uy0lf87hm534cvb6z',
                url: 'ecda7dix3sylzv3tr3ynaleztaqvnwdajivwju09mmckigusgjvohzgnt3nuualgm929kvevfxowurc6pqraj5w9ckt8awx42os17x2d984y8c9u62onqspvub2ovqi5ra1cd6ldoso09h04j84h55ij02h86unx56xhfikaq49050ay5pt8t1qjkw45jo014e476178108ke4gmds0d1qv3ft29yw14c78vhxb997zkr542c22rsejv2662lk34c41w7tzvd80grxutcb59tsi1v74w34izt4p9b2v2isbrxtt1aaepo3nai5af1yes',
                username: 'a064k1hc3z4umcm5hb2k89l25au812x5pcd9ogtlv9hv09man876ca7cdarm',
                remoteHost: 'dbjl9j3qezwrvx832u4cqp7nf2r84j6gxsterm3vdgjpbaa5ojh8tgti39w2wesk4yb7atz0vt6rj5qwds33jmbjsunqeh1ewzg9t86hcs3pv2qa6wvwftv60x5h8ifrxf6bfdbtf6is1g5wukac9yejdme2dhiz',
                remotePort: 2982189406,
                directory: '94xlsahb6y1g1uogt87atsjlgygdp8i0gm4o03rnpke4femjlwn7jdfqjvi5onkdo0wilkdkywnxwnpkatxthg1njtyftmznsmd374ygataklmvdeuebncamo6egmjcf7w99ak8sltiwp3iumffo8q5kq8nph0a7yes6lzky2bg6olxbvgtfyj2i5c7nehgigqbgmgfoli0tefh327na2249l526vlilc3qv7ymie80c9ootz93fuhz6al9qv2cbxn00zlu2ly3a6slgxf5976mbv6e1xd1uik61n2wrzalztt44v366faxvwbqesc7lsc997h2mc9jlxj9bhals1kz5a7gbk91luc4okbim15csq9hsdlttamg823ll0zd2ijblon5jjq52iuatwab8xmvrd3whvps1oq0cl4g6lxfdgrqot1p37lvce1mbmel151ekiwk27d1ia4wkjca1k811xw7d4odenpehnguhrdh2yb4h5f9f603cno0bq1vxcxchmn3c9lciuw9g2rfh3jscmbcnznsmd0vngvxejqa1qj2gg4sum1x9sa2e11vuaen06f4n2sbyvyugp49u4s6ib0n1ccfhonycq2ul08qr3hthhhpktcljr9fu42s6x2beikpwspz8mg3xj7s19xti3i38e1wawm7c875fnslte4y1em78mc8iijttoutyirpo3eal0l35ik1s9sra1zght9h7x43571a5uh1y5i30cuitgffwdd77y8epfnxd4uy6t66mf013kg7wsfv7wu5j4yycsd939eoiz5f5768jidgc58shzj9ss6h24etdssl3l9dmmrphsj1u6kb3isylgh0391pm7ld4vty7mk6l21ib7zq6z1nkehmcpry1vwtwrkxny3av7oqabetz0j00129bpc64bhxioj272xtbmklqaggxgbh2xz1ifdpgjkncs8i43un1me53sxhqxfxftofxgu2wuv6068nyc2d3v6nuib67yjxymvfgsjm6',
                fileSchema: 'q535q347em9ce1r3unfd9eo8behh7ed09xtb2bff8n83ieq6nlxehh742ii43qf178l726zl1mphdgwuhzk97c0xm3zcqwlvbyzifub1orpsa4k5r11d7f80eso18aczyorf3kg7pz3e68whlvxbz9cjyb8cqwoop1n5bsmlaxuwla0ut32zm6tfqvgeealimbnnw2feswh2gwyu05ixwkoe4i0dsouu14pgttfs6s1iqfy9jed2m8h3fql5f7lswb566b7i00ccqjijewiamj3mj2fkwyw4etrhbqjee0v10ydlx9n4xielx5npx65x8wvxmn8jsahd1iqt979eyaipu5sdkqyn2oq9uvl3cwzj2yq7p5x5kenlau6o94rroivnngdxorg1jhjlr3zikd3o8nx0bw6sx7abbryjhmn79fnpwep4tejh5dzc06lmgioqrsdcaapzrsvcepapaq6fpmsdfruiljlrp7xlgvbjeqzr1imcmd69t26eaa1w0pzmiohdc7ce2d0u469nm30ii69ike0q61ewbgtw2bsw33t1njdgvfgbwkp291me5sgr92prxnxf4a269n5en0lwy3a4pbox4h43c84xlrn80z24r1mgjqwyg50nu1kqikbnk8afqgqtyld2mzzl2an8s4s13fzzwx7m6i06ezk2dy3zw2pscpn9sh7bjibixgo5gyuc3ybxp6ue7ykwywzy7lp070s09p5hmshgvdld7mino76pw9e6y1i36hfakb4jclswy32dwdvt7jpzcgm7z86c3tvtow2wi39hy3dlg840rkf9msn4akjtnpx6pn54egbfje69o8bp8i20b337nxlicq4tnmvcm9rv9qy5oqkvosmdb74wxo4v946ilsi0tqmb9g9nmqirna2tdqh5xs08s7chtykttiwixjhjte5g1weqb6qmagv6ia047fezhn6yhxdpwree0zv61zz1g1g39orv317zg3y9hgzct9gdyihjafs6k73z8tht',
                proxyHost: '2wwmny0icqqautoakf4ek4hsverrrx6vxil674dajlmgczm8kzam474gdg3w',
                proxyPort: 6581932682,
                destination: '48csb7526b559fmsez1bljz1x2hwhws9vihyi2kl9grk8pr8qot99tjc66yg17b6rfzd2xm7wdgu7u4viwnl6sm8j2lltlb7vlyd980yoi975pxg11rvfpjt5cxa1v7ddcvi6o2rtpvh22ytlhv9o1ac8hl6h9h2',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '6de3knkzsx14a33hxu156cg13xdggnb2zirxvc75ng4j2scdadw3mgbq9vt795ppz4v6nby2hgk81im0wa2znyecem9ad6t9ccj2z9re96uwon63uzautr5ref46ujivscmv8z1krvzzb78z76monwhl5omqaj3o',
                responsibleUserAccountName: 'gloq007aj9un3uzsp1fr',
                lastChangeUserAccount: 'yr3yrc0ik84e4x3kajwf',
                lastChangedAt: '2020-07-27 02:07:04',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowParty must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: 'fgve1zbaumthv99yiytji5apxoxwfmzsm4786ppa0diaeedld5',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: 'vl5nml6rua84umtzrqsh',
                party: 'i6bcenlscbmu13orhnza9b04o93hmbmshm07jcb042tn4knjlez0758u8uuqwfypp9la3ircddqwlhgrbi8xwe0dgq1jfbyyp6pdvr7ulloupuuh7188569qx7kj2d4pilbcar17yqhmos7ocj8ibzceavhagxw8',
                component: '52r28wi14zareahut67ewg831f1pofkeltd1nj8yz6qeqo1zv1cekye9o5qaaqomhzautq5z9n3rr16q17mrv9prjj1s2lzpe5459zqht2jq7dzgx9w4xhbz48oef2jc8puoemp2xdnpkd9mltw6x48cuv8z6lhv',
                name: 'a5gdaw5ma76f5quaqaj2a64gbduom1wuk1q7jhb1tjem92zd9rqf323jyyhiuia5q71edutbz310oqhcfjtvqw32qlfyptifwixihazmf9xhxr0tsx6o97o6idcd7lhxun76rcpb7ezwjk4cxc7k8xu6wpo8adyi',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'ps2qk0h4gao9kr9w6s76u6k0ibsg2wrkh9sa2awbmz16bsipy6tyy8bedwuuzvl5huw90dti3ibjkwr0dih2tf0b5m1kcz51u2wag6py4nx8vlaqge91f51g30lgo13befl78ia8kr2kmc206png82ztbkwjrimt',
                flowComponent: null,
                flowInterfaceName: '4cv5zwc5rfj4gzdch5li19s1u5nysu8iqkyhksz0yxm34wshmj3ucornudnyw1d2j6f58wlmk63zenmytq8a1tp11mv1uffymcpch6ychb1wrr2youuqbheuvmrc6hasrck2m7197x9dbwp2gv1hitze05zotu39',
                flowInterfaceNamespace: 'isi0j9f1h0ulecpxufqthgtj55lzg7fljpntm19q3xdtawu7xm58devnorsysjilip4emz423bi2hxrzuvx4h0p09qaxkivyqztfhfvlr2idx502cd9xvessoaewi38nflwam77xozfy4nbtej08mibfstqfklu0',
                version: 'qcqmc2rjjayluf83tt2k',
                adapterType: 'lc8733p0yegwhcxvupqif9tr5fw3sm3dj61cr9eu3cn7dkd5q91ppj5sn81c',
                direction: 'RECEIVER',
                transportProtocol: 'btdejfbbwblw05ryqaiowwpsikgbnxc893adhowb7zaezpgsgk37m5luj19b',
                messageProtocol: 't9mcqkdg8g8qzkggx20ejvun0whhubhlqo6n6yv7rp8fasd9e464zz76eqhe',
                adapterEngineName: 'ghul329wkhn2q0pebpzt3jznukskd4ydgwbcx8oehuhpcutwovfmkf73ws1ngbqutfwc9n458sk5vh7v9iswsutfwjm9hgmbflyo38tqa3a9ojo3ewp81ow5qflflzlc9eyikrybypc3g7r3bhfed8n1cwi314u0',
                url: 'olzrae7v4h0u2p4cseiobgnzpr0r4mxi93yg902y39a4b2yaii2hcmhu8l8ak90sqy1tubbzpy4w2ee73fizg3j7qca7mw9wti9wjv9al8jpjt8m90dhblf6th2r3vu013i9s9yvv6mpsjjl50i23h97hftf6t6nrqcquh6fhwrfdr3xewnhzbzlrq6rkni37ccppkjojk776ce2xucft8kwrdvoqbstdrpafh0npa03p29g1pjnz4hykvll1z1ujqm4f8wlyne6ywd5n90onaw9ynq5ob08rzhtf7qlj34wfz1v3lhuqxivhpn86nzh',
                username: 'odkw7mfw05wf11p2nmrkifybnx3bxjo4s8dt0c4l02snku2m90q1aeqhmqbk',
                remoteHost: 'sfzfs91zeph3773378qbeq19vu8xtwgtz7ykodenjsxaeemj4zcuq1w1084avv1jjuhw2hjb4z7s1pi738yshg232utxu9vy9qb9bil9wu5eestg4s8ybdbl9ud4whmjcotqqfsx1l8scelamk585if3ntjzoycf',
                remotePort: 8197809904,
                directory: 'h00v9fgtub64r2jkmk7x6raqfgj2eymxjz7t06y0r7ps5f5umo9wpkrhctt09gh9m94487nvdmi86lcx5epoaqgn5qoksuctw204hw2jrnubi3htb6upyjbo826tszirw66q94ezolhataqbm3a6gwi1zlwcucz2zqi7p2i11i7czwnajjjuiymx5jo4kwz5fgvgevx8v3au9tblso0y4386r6uaextafz8jkgn4k8m2n93j69m7hv21wapucal958ys1z77xpyvdj3v6d1s2fs1sw8ito50evgqzr5kgisj7v7e0y7xj009p8qjhvws7bzwe2tnhriwhig7gfutvgh4twfqh8l2bo2hrub39p0bz1ggovrmkdzmk5814j3bd2cizunn5wyaoaduzopcpbvrhhroxxq079ht7w1ux991sal3zdmx3tpvqkvqf4rsftqdqovo8ajg22zoze70353o161mtm8iwcpmrg5l7wtrdmlypmrjr9o6a1bb4zscfbkhdi1grg2dgbudi0px6k8fhg2u6swqhyqz0pldnl2wcvcjc7zg8l44c7ho5xrm7qmkywaihnkhtpxffee0nez93ogzsfunq8q9tp7da9gwjz7quqt3mqp0ixliokaq6fg8b2u7rdry6sa7f5th040iost55h32lu6f8ekw4nt0r1k9jky6c8b9r5l02tzegfs18pn6zgi84vuut3jpfd5958sg7rrdsnhka9jy7wyc9yoam64p2v0v8ymjnjs1s1mikf5c736yfylvcndk9vx395dp907uelbxgdwg4caqwpvnnjsui55coy7by3cnbgus1eypt7gfhjjpla1t2s42n651fqxbixfy77d1zev3wv2jvlf4mkvbnazi8ebfnbdzhqsnakz4abk0glmpinn93t5ohqfczpw5s9lfir7oxcynx5zq9d61be1n8mkwtvqo9aup9nb5pf7gwopfnnivffv7qty6qmk0f8qragkq8xkzaez3rgi255x5hoxb',
                fileSchema: '63w6pp2vhsddzmp1uns9pj8d662d359sm2szdc39gg6ovwj5wup1sonmbbw55ciikiun9dgpe7lsuckc1q8ct2mm89h93pkb3eupalkpmddb96huga764yf5h5vjj9hwko2wpb7qn09elj5b23gf8onw4x3mbd93i30xqnt7ja1ophvm2ang4h6d57aqbp2uax02rf6etjsw0j2wy2cl03r7m2m2g2qai9z6cgi4o8z7nf6o9fiktqnz8myzje72fthjghpvhd48e4f0zhovs7mc829g7yue056cvc1jdkolw7yrm5brgzd58a5ogy47g5f2thmmumjnt7xhofux4ffpmpazno41clgh8kochfox4c6iop8w932p11lgxtrnc3hn8ywpbmpn7s6d5qm5w8txgg1myl7ioib7vhailkod84rkm33d0sjhwwrvc1wqwh39af3dn0hcrwz6un1krhj7n3o4pd7f16hzwm74ggygsvi9i1mknh68p7nplfb953sdjp0z42t7feptnh3n96otyeiuqzxt21j3fbni4nf7ipzm9euqp6uri07yv9c8aleer79bof6mzxcapv59tnldrnx73untmklt9z0kbxyizmcv8riluyvg3q9vu9rvatsorf49hodqnqi82cqc7yte30zm9tbc8vlzq72fm182brycpyh9aczvzd3531y7l1w5zuszdscnaabn80nf3uqbjzgil35xokpw07g9htjga1emrdptujfatb9d6nkx1wq5wak0effeqmrylb887v0514dyrj70dm7688asrwnf2od33gyyazhcl95x02ezo6zsy0gv0butv2nykqohel1vzmgnnyomi0wlamgtjrbh96fbyznk48iyf0umso0ra80zqng2k7aohr07a8pjj4twewgstp670smhbi1h8e3i85oj0dmfltc6r4itog3w48mdl6s8rz4aih34h4m6tkfg0gcihnt2xx8waum1sad5eprfy4jqm7eny165t5mn',
                proxyHost: 'xb1lfsvy6v9im0l4takdkezmmtwi39dlbygof694dybptn6x8bh1tlferxob',
                proxyPort: 4676766560,
                destination: '5o9c88nvc07xclnkb8grgkl78in6q6txdo3d5wcb21jofab78ddfwupee1vee8qmxnqabcv4rhtdeknutg09coeyq217fibz1o2svtyjhrsfwbkc724j158tf6lm29utts1iusa98bz8bnebx6sinbst2lxsn1pn',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ydlhkixori9nasv30h6ihrk7lkrxdpsxq94e4p3g19mkfz6xyjjas1i7zcmhhhyft1wveyz9symmmey05wvw9v92bdilld3pqbqnv7aew3c5c8z6k7t2mvkfeyh0w39mffej6w6h4yxcubk2303mwj9or3yzh6e5',
                responsibleUserAccountName: 'qwdy62bdbzq9hg31vm7b',
                lastChangeUserAccount: '3v9v5ugq8rj4pu92bswh',
                lastChangedAt: '2020-07-27 11:38:48',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: '7aemjvonsvcmnc5k3qgnf98cjolqeov1wevdkb7847k1pe5wzs',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: 'fa4t2qi4nsu73rz4vw4q',
                party: '2y9l44a1us0vgexdyxyzcyz7ii92z73t5vj69rdf7slrc49ulf5ii3sdl01p44x732z977zfwwvgaie5ca9384hwobapwyi3l60yd91h1iw5l8vhccityh207teiwm82witt7rkwl9j3j1mbhuh40vv5fxdtzcv8',
                component: '7hz41kvv5103pwr5g6wdna4wwpj6hssw30dgm9btk6rvx9evdlonooio6jgeebqcye7re8cke9lkzhh0if8g2rrt6rg2jegoj9qn0wqqeu4kqqwu3o9ipxjemcp146hr1weirw9zs7pjsvxfdcg55qf16423g2fe',
                name: 'gydza460sv00f2bujd81vpceza9tk4unfhptqabrmq8ilh0avpj15c5cgzy71gctyut1z9ybhb2ogwjx1h11az8gitz5xyzg1nru162i9hrj9n9gh6o40zkbpeg9v3tcqg4h2h1zub20abelip4ned0j6b1v1n4x',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: '4qvvufsrkdxev92vfjq96fyh6urz5jc65ksjtco7xwshr5d02gq4makx0oy0lwswr93gr2inf8w9vctwnlpn645anvhchoxcupsk69ogayy10orq6rwqebxrbbqcs75kwsd1jg0l3lij49fgwcbru4l9bcvlfugp',
                
                flowInterfaceName: 'cw64yc7hjocuzhri1awnzkepa0znhwsmha4hhkyvcams6526yfp3vjjaq5ma3o07obqr6yetw28wg0djkxtxmf53q3dg8ljg2jeagu0xzy6hodz5ftx7598i3h3mr1l08h4m48g27v6bcil24w1bjfhk0virv17a',
                flowInterfaceNamespace: 'hmsj6rkycm7gagmvm66nf9caz3htqjdk08rfvtps5tv7jbutwauxx9b9h7mssnf66vi94of74ef9r2pcak6c7o5vtv1sfgzpufudwcc3l5dl540ix7tqovxltjz1ouh6bw4gthibnm0s2p42o5tckxtxlog82526',
                version: 'p9xfj0747njnfl2scuih',
                adapterType: 'v180qsq2ekjaxgc4yhqm4u4re4sl0yof8k60kdpif8uhw84c3l44j4medj9b',
                direction: 'SENDER',
                transportProtocol: 'nh9xo8f06m9rsh2kvxpv2jvcnqjoslyl9gfyam4o2u4xnt0pbkn2h0qrbj92',
                messageProtocol: 'rc1rz6jhhzt46k4rz5rm2tfp9ne1nhenydmga7putfpts62drlk133yej31r',
                adapterEngineName: '2npfh30s8h4i21p2xdgu69gdv1n5psjdxxa5xu4675u7yjozxu0k8n64muh1w9n135e6j7fun14zpqm95g9my25z0jvv8qj6m5seuzw4bqhf4z7s5upezznzmhyewfootd3k648z3vg9quxk78ruspbhnwfiahna',
                url: 'zfh3nktei38h0ipv4t4jhtsfgbo833hdf2chphih81etdbs4aozrsiv7929p46g2z3kmq5ngv7f8k1ezbr7cztza9i0w9pzyvagumy9nm99131wqe7egphilfrem13shks1s63ceqrn4bh0mt6jjrfkyls12jcf3kascljxdtbdoio8w1bfmse65rhsr62e6mtq4lu4blr822mpfffzdw3c2lmlor3tdq59wgn8r7lxdi1adckrpnmo49ife4wtaijni5okbqnv5dhghu8v760ln29s96tabl21fbd987m6iwdr6tmizpickyo47nq4c',
                username: 'vcrrxs9nkxk1x8qpzrc0tvyxqi3xw09acy5awxbw2mr9h0iw13fbvk6wvrq9',
                remoteHost: 'c79fc02eh8vlf0rrdd6mvocaps84g41weqp7zy97roti2itd21nnm4s240m4qmcmo0slqsmh6vnjm5klf7u2vr4wkyg1331qlc46y44iol2y3w3vn1ig50jag2ep3y14om3wunyg5tfo7nd86jmp913bnpvkiqlq',
                remotePort: 3171271111,
                directory: 'f8ski057ezxis273juq5m5pdgh7rmymbvb9tpmtkcrp8uw507fi218c8ezrmfsah7jfou3ikow916v04gkugl7k8pef74bft2qltl9a1i7eu2gjznu6bnzrvvj2xxml283qugq4efurhjkucrzp842cb1k4tzwnzfpwab2drxgysk8gjcsm7mqw939n8s65sv4o7b8avzxqt9u1e03oryxtz163k4zrerv9vt9nk37vkfvmu24poytou8jux0ea0ko1mcojj14zhwewkih2uptymqurwtwdsncg513oow440kay308lzxhq0autfapasnhru0m97c5muqx6s3s36vygg3dzfks6b04lhunf9zqt3gxbiucan19p4357nmuw9ly3qd1p9omph9sa0rtyrnxerddv81st3s7vxieo9c8rmhhp798c2qgna0itsz5zzw0vo9cclhtayqrfjhiv578oudjytdc7eku3rnpy086sznx91137d32xj533ymzuha72l4mllos8a6nxzezru4pxi4f2ynb7vsbpmshzspj8ssxb7yvpd114wp4py7qlpe5034zbwpfro4n6rjbnu3pvcm7y88h0peqqr5u73nxn6z7big525ju56cg2hmprd1d67sreet5ba62klog3a2bfitsv8yocfu6aqx1jc2kp6377480u8uo1grujmm86gl4rmo3wpvq6ahtvid2cqanfqpnyyc8rkgznjfvuhmvycj6pcpxrbi4d7wle9m620yhwr4ryevcb2d8ceergdczk2t69fltndg1120byd9hhzsw937ao88ce3hlq8136oo51zkn7i75oojzmlp9ith2yylxilbcx4z028iaeihgvzs2syxo9b3g6clld5e4gc9hb7v1v40n9nw3yeyilswu18i0hpi9s0d3n38j9p2qctzddcupg9hoym28bn4hk3g3k13djxlzm3xpo6uihan1jy7thv7mfpgq612e1p82b03usl3h8vzny1zwxrcyz4',
                fileSchema: 'h56uqvsf5zyd4qk6gr33vxeh0pyt6job1y2kcxot169kyhk2hy8iqi7h54psq069qd5myf0iyt3c2f8bezy4zc50wzszxj85pk2vjj0su7vw55mk7yhybfr7240pl0zriher55ibw4tqcbfruzyrlw71w7d8p1h6kh36uufns0l3m0eb17p2z1i91m99uwl1yp7smjteviquewn8ethrldt55p9lln73su0jz7s0arxmvu4ny7drddpiam8z72qxqf22kz564lr7k1p616ngb5dmeqcnb2yzqnkycmi153748wz93rc11pqkruwtvr7ech4yu06cb7ao8tr5rjwi3r7k9f6jq6cp2nlgd367c4okkm1c3a3dw27yyw2ck40rofdpnhtv9ilug3cjabyi3cknxsl3lpq04hr64w7u6pg380zti993lsh6w20e2wt95kw42hi4nitatssdcb3optscm21wsb6hqm9vqhsxprtm1lat9qhodf2ve4pcudtda9niqsf6hrbe5zkszsf9oq6necb4bgftrgw96b7lvn4g270ztnc76lp60u06l08zggejbirpnr70oelxvn4d891wb1efda1k5finh3ipfjkeespsorwt7h8j0054ohyy7lynwdjhoaj8zvyndw85cbx6wizf5tbe2fx8hwmu6xqna15u7no1l7l9j8jtz3v068xbwlzlav7ti8hyt75cwiywcnd40klgsx2lejscjwl8n5wzfqecb386mq32izuyhfvxpxdecofbcrogck7ugi2at9bduqryis82e45fwyl6ba6ewfix7q9mqq9gsfzic89k80yf7kmzzpz4cb5ns9wslkjrlid9whtq0yika1zymnx2fw736lgnoboosb8b8gnc4icli47ypnef36u3n2b3k7hpkps60ayxextx1wl3o8n38oznraxp21kbno3zwj8eyhw54kporassa03vmgl7jlrw9hltnnsm7shk28bh66z1hsm9qk2hbj8nmohz',
                proxyHost: '6y9v0167ykeyuu2sbakoh3hcz7tp9o40i735op99qo1r1tux4sh9fmkt1534',
                proxyPort: 5732423957,
                destination: 'mmu0786d89saikgygeh5g9kz6o072ddcmpvsvxmnqhmrgwe06q9zv5sv9mr5zhoy51g9tbbx2kczxe8bhas0i5wv73xhytmsavh0mpxtquzgox6ijgb1ikjrxxzn675jwci2t1pdi560f2l8aq4b3ftvxdgs8r58',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '06gv4cgkobm4m9spljiz68se3f3lysg7mzj1lncecb8yecrdveufxa18qhhjgxp0wgi6xk705d9jjaztzgq2xx20o6w52bbhxxgu8oekvuhoi83xbmw0qh2thvqzz77p2pjqw8x9ss0uq44ut1cnpg96elbh42wd',
                responsibleUserAccountName: 'odwuprk40l8otkubimsu',
                lastChangeUserAccount: 'a2jwz5jsnvqc9s2vq0sq',
                lastChangedAt: '2020-07-27 02:18:20',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: '71d1ne5gze25srt109z64fgddmlsewlk7bw311po98bbt8bi4k',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: 'u4yuclnvitc2z8u3fsm2',
                party: 'n5b939tabxcu63od5ai5yew1nge1mhkri94j6j7b8nyb6jrzi1twicnegbl5mhbtbr4pi90npibi8cvdyoku4q22u2ncpw1rsfuz6rs87ahvi6fd18yxg8tn7zy2iptlkmqumnyb10xro8r3p0n5443fiplwb2op',
                component: '9cqawk8dozmtfvak8c9xykfmwgjtjqbjw2kqqf9awmwns7rkf4rwjffe0ezk9x5kajiunpvub2g3tjxm7uwrs0w93e1im1s3imywx0elu459vo4ou19zrtbprixjqbekd46dybzu2etlm9jq6gz2fnp943vs97r2',
                name: '8003zrrmo21ltn5pqr5rtfrice66buumwz545vd84g7z0gv2qyvvqlk3873j1x2uhli94c7bd5ttgvkkw5ph5eyw1phd7yrrixu0cnjqig73fr3eu1rhmnb5kjbrsowonbxm30j71apr3lo9z6mzv3j2gchp3gd8',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'fk7y4ggj919v094to492k165ca6kpc6qjcpji5zr5il170gowv5lxh2d8mjlh63h9oecnrjagul1e6jo40sfapj7zsrc9mypd6n7dvikc8l621snl5s2hqf2frhbh21mn13tb15bs46mmqgobqlee4e6pil8604d',
                flowComponent: 'n14loptc0dd3j7mh99twssfdgd3i4dpakv74d07jx1qcbt6evjpjg2kzzqhjwtnite95tdmuybwf8yaykrsfp2fgbnqo2g2lylkmsx94xkxh2e9hiikvfyingi1lxu6t1x4iyzm0ockir30g3mz658dv31f5jh2v',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'gv0a75qy7t59va5dcjumqt0pdntf7wclivy6w98akqbmqvxa4a3k13ls6t5w8o68xp1vakqv7fe97cojgbg8m4jiykq40byix0t4l8a3a53zf2ssqqykh0pe4twahfy0l7g0u74ue2ama76jw5sf2qurlc7cp7rx',
                version: '1txe59t6l13kgsfp725n',
                adapterType: 'v129elunys7t7kaa5hh74ai2shhxgui2evdv74rqeza7fpbzctqtepftgz49',
                direction: 'SENDER',
                transportProtocol: 'mspt5vwdige4rzy21z5l2ip81x5r7kzlng8hfelgswmh5vhlnu2acrunbb82',
                messageProtocol: 'httxro22vlsn5bhst1xars7fby0bf6pfic7ew11sj6t89izkavuvd5naxc4r',
                adapterEngineName: 'h74k1wijrdt694vjv4i5sjccevcm9wztamcoqhrjcopf4embdpkemj3k30o2elh3ihrmpae1mxa77e1y3oemtasawt73bnhsnkbnx39h4eq32bnfcrl6bqf34wpdhpdj6o0cpp5pcu93vt6jibek7sratmbgkbqf',
                url: 'vmyy0gc2bzwakh5zg99n6fck6xe1sqyadhho1bakm6a0na2ethy3y98wbi08p8gyhguwc9aiamuso05ogmic8q4yox42lmndjbuk52tqhit18647jzvynjagu0l51z6wjek6dt16kelwcgfpj5txtpmp1uzwqaq8alndraw3mpb6o87nwfntmce7im96wzy6y5o3qvcalm8qftzobw977i719dmae9siqrl63awb3r39ix0bpgnqjx6cvnvjbeglbfofpsrsn4h12qg6cr1ecilxplwf83l209spnrzvej7s2mg2gjj8my69f2718m7w',
                username: 'qcit4xh8pcfxj27twhwk61uwoouncqvkqmmp2a3pue76lcqsts6thux0h8l3',
                remoteHost: 'y3qvnf14o39m1rtr7wsrtxs95dqaitisz0ov8us9h0arx7wy33343kjuxok7rvykalujxlrbnklhd1r53pkzz29ndr3apwbd28e97za61inu0a0k6tv9z30qjn8v8nsf9d9fumvchbcdgckp4lbkwj4e49ldqkyk',
                remotePort: 5520727832,
                directory: 'yf1ax8nrsfibpv3r8dhvntnnevj4d2vzk2p76impiro4gwc6fta2tp9pjbz664ipui6zvygvek07he11o0t9g6o1qrf426yyg8fw23x6lrlcpo7zuhln8lzexd3q31v59ewj05xggzt9a0j8ptcdeqxti05dmfhqx68poi5cuntg4tuzudd2jja9r5zkjwqe6u7epkdh4h25pk13l2dn65tgo7mcgfv709cu146je1exd37n2v370y30hr0u2x9hz7fd34fq85w7mdqdnajjqtbhgqwrhem7ikscbinepvvm7eazng78jy0p12o1qssp2glfhu9mrxst42px0rw9fzf28tvf584oy7qhigahpk7q5s28x2ya91opc6ql6bhx04d3xuijb335uu8dpbo3b7ywk3w0jt0qvc9cnwc33gs52ou0upfq676rk6jcdtabwme5uht6cfd2fsnrq9yrm16lyewmnr6se95z0tyxy8l8yaasbeyuk1n2vt1x8s7ph182v7yua0wa3qjra82s9qcfmdrfm9nx4nvsk5p615are8otirsc01ve3d3qmk688dz3rfr8emrqg8vsnom39ukyrvcily8p5zktrh2x7747vpvbq1aga2t7ljyl72lyx23ac4ns8l09yqbtyuxep3fe0cjz5kcuuolddzhc1prxxnka9xgrynk1tps9lvcp9413tmydxb118o8swlybzpp1cuff7rgnlqftvm8awh2v3pq69rtuwta20h4m8e0ovfiz2pl9z2h0vg85if0cahz57wz7yzd90vb9f79nvz9sardve5qrmngnxfhzw8kb4t0wa04qbag1aclnvwvyy307s41mzjlxh7m2yxz2qn959zm88j5s4irmc7x5jiy4jqcw4tmflyhtv05aziu285f27hcuet0uocxeh7f8d7ej1ao4lazlt8dlzcecq5vdt4kckz3s57yf6o71mi4s2ii47ybz031fcqnh303dggc5fd2fkwra6miez4ji6vom',
                fileSchema: 'wcnlmy90whhyum7phiawqbyzn17uxhe93u7100m1uawayfblj14fq4ccguzaa396cimksi021wqn3ft86nil4mgr72q37cywe5f5tfyuppmxki0w3e89it1ttupchcmkgai3mi5f2hxxz6e6t199q8zgz44ceahsjrg6xyskqrff539dbayytmzvp0evbgw59s8ciyx4qpu0cd264331jbl86eemqi66fxbo9x03v8s58jpj5mdvrg81saf5n21ayi9hurx2r3eqbeadgt7y8d9d925ya4bwy4slfgvopleazmhjq9o3kt5bj03ao67h1adhqwialahvopd430xo5atkyp5xvz7jveb5juwiut99bou7h8s27j8ha0d3xlrvs22iw8jq3whkm4o71aj3yc21vo4qhdyft5ckpky95js08qg37808fxyultde5u9ugbh2agodku91wket4ph4prka6zujpoe1uh59eab16ykh66504u2l3s0jiw4k077cm6f3s4wv7cjj5uibhuon4axyrchcqzhspjj2lxxrs15aeq1jz645fhl2y4lclmu6zet4ziri59i91av7hmwxzgn1z2jccx6tlqbb6gazp2g6ofjyigpmx1b01imlui5i62hs5sdn1pxd6xtoifo4u0exk29j30b38fnjfhxr02mkbnxw6x37hdn3d8v2zj5i4ms42s210th4je3ab8zje5ka910tftm0ens7c3t7619huyu7mmg54hcm5nm5z18grrgsbdf5v8wypdzr16zg8tiwn486pruphcmyae6r6addh895clp1e8eo339n18g7t5lcvvobyg439oopywi63updqlzf5ygpn8qp28cg50u7g6dszhipdba8jd254kk9jr1xgs6iivtmu6n0hzhiuf65n9wt1eu0249znhn2ople2kj7fbw3dao0f2p9lmzkvhbbpoxdqzrvj8d514kzth7zkmriielxnbw5v670sel9drg47hj1nffu1nz7pac6',
                proxyHost: 'ux1j8s9nfs1ep312zp82p39n71quf7al2i62fuynj8b322cc8osajq98r619',
                proxyPort: 7476602606,
                destination: 'r15ym9ftjxoq6hm20s7yulcac4ovrmi6o13gt9yhbcfrthetv5oqa8xh0n7rkoshpyjyi2gkw7uiooafnsoece6gfvibxioi890ljbwdaonechyop3vto2ms0fpmmb6labu2nfylf9e86dvjckem8vwqbyjq1yrz',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'mlyyia3cnxo66ydd3wudirobfuuzj3qzlywt2tfpvq8cw2w2ecwlps3kjujd7odxs1qdh15tv7oek3kt0uvb7fjbfmkvsl8tbfycpcnqt7nh7chng53ophlf8wvtls3w9h9s55oy5xkjpj1vtrib2sgzov3ya0l1',
                responsibleUserAccountName: 'rm15wqz8wou2jv09y89i',
                lastChangeUserAccount: 'pn29zltr6a2zl1grgg42',
                lastChangedAt: '2020-07-27 23:09:42',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: 'dnc4eprxeqqc7km069palpb3l1dnwicl9nrz5pzqei58u9ie0k',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: 'v2v9009c4l6tcr4tefu6',
                party: 'niuqdbuinfbkcpdbdwa9aybo9nc95riui0xtwa5clumebfq45eqthys2fsjzxt19c4hjh5w3zzn9t3v69c4m5i9mz02pe5smrgqnv0nr9w1smn41m6b08oodmemo38lnvuybi5nbim7e587bhtaj8vnde65q0qqk',
                component: 'ah1i8kae155jkt1f1sbhy37jsu6mt71u5dq759q5u0p958p3zxn41f2wym44oz3zncmd6gsqjuxhy2rtakl5hz8kae2sgf9llify84ycroblkkcnoygpgjcdblf7i11qha9cm3n90atwh61ksazz4g518kom85ev',
                name: 'xwu825kkzpm19tkvhd2b6rblvq2mmfsqgw8ex55mwfntsogsw9frfswr069jvbud5t9bj8cos1cz7er7pqc3to1f8feh605pu626qe0cvdzsuci947u2lcxa97fhbpg6u14gymgtvmd5dz4agv4h3hkmvt1ptcv1',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'rjb4k1khk2780jclivtg4qmlbjb2ugba7r8mze1gg1t3tnexc699g0l8qyabjqe17d55lk3yndqc2kaz3owrjyjr6hqrgmsrevbsobg3vbph7qq375irqt8e2300rmie6dxp3gh0sneowdexzb4nukon5ehquzvz',
                flowComponent: 'h7dfvngsihs7x8mz3uf169w6cdwnzz2y2r02gwtp56wy9kxq1dzve1un5i8ustaabaza49j6geu3ws588f2h9g9bx70rpihqbj1i71im1ym2hnl65tounak302q6f792nwshqhlpp2s2kovstvav1bca5rfgab6m',
                
                flowInterfaceNamespace: 'j39nl5rgbpqtmo9i65h56a2i6pla9z61lwgzmydikrby4cisv7nvczpx9xmxynafb1wgtrdacq0p5sar6pmsl0zkkuxw32ef6uqqt1m5na6v5e3c8alzphnkkpawxpwxzoo2mve9h7iuoqlcn2ppdhwcns7gnygp',
                version: 'pq5pnpnic2afczijslvj',
                adapterType: 'rkc1avo49uqz9vw6a7mv2o64rzccxzme4v1ichwe17n2dbf4sn0jgq9ig57c',
                direction: 'SENDER',
                transportProtocol: 'j8wua3a4yr793jtkx8a4wfisne0zy0upa7slx8gutp1cy6xqjehuq7ykgg75',
                messageProtocol: 'wnh8wmeb1yg4mahc51skd4de980gupc1e2sb2w9q6l57n8akdkzg0ngihsvv',
                adapterEngineName: 'fipxz5wher4zd350cv9zvlyiwbywaxs6kxpi2830dwlpgttbfh07rnxws1t2nmk656uuym28secezzo4sbebxd4t6deyqks1z836avku7yrvaso2gjaqsz3dis2cvmtap0vfurp2yytdexp9wi7kpdtw3yqyyagl',
                url: 'c8073mrw182mrw21ld6oiw5bbnuuq8ib59vyaycd6utse6qfl1yj5ktk9xchovobf8la7b7vs59rlgegy77xiu9ieu6dxmnp76w3dyh07z46rj7xb14mvzmarqej8qeh8y3uxwne2pw57yeptlzqlkjzsv306ht7hqr7uhirx1cok2ftlvoreyegphrgv8y7el4p0pnldw65exgkd8igp35f3u4mdvig5blnyumhjf482c96a9wk2tihhkzdlzcidjsph6lk7mm8ar59szzndpizfa3m4v2w34fw0adwb80tndbg5702aawf4pbukcg0',
                username: 'da3up3d56em9ryng5k1j0czm0ohscuc1r50l025m80envkbzn834e4ydjl5v',
                remoteHost: 'x6gnc0svhgffkfw8zhkgj0hawq1y646mwues2geshr4olq7layub2qomg5ezy9eq8yvdch8m4rylab7t41mqqe7xlg7598k3nn6i4vkqv7b8wbtxjx1j3u43zsf86haquwoqr1by81g8a17xlhj25cab0hcmvbsk',
                remotePort: 2490754510,
                directory: '3ebko4tbj9apdehlgub0mi20dtc0jh7xgo8hggcgfp2acealtjv1x03sl8177abdv26g7d6d0p50h0i45wzabpjgzgz9paun5sh00x9wn91rfyfnn7evdikr8kp8rw7ytmqbcul9ovyqyrzt6l9x7zd3h9tsb84hamdwrtyonb1rp1u4vx1yd1vy1ajbrxn23ljvyab1vd1iaeg5o7lgj8o1wrsdcpaelr4apnt1xl0rzi3n4evj375zpgofowizdrheyqvuj17gpsqdh63art0sdm8c8absg01hemcotrcjdz9apfcwjsz6oxuo3oureiv49tmdqknly2d4zejo8mv3ntwcmf2rexf4ck1bu01shvrp5addgd6mkqnpj7l2d0xlh0lovpbo0twivuccm1e5nzqsywjip8t5tyskfmoqe4jb8w3ef7pl35u67obx7qhwhftgysiyuz46acm2fqdtq3r2zdz7asoq6fs1kr4f49w7htd93x031ii4utrhczql5qh60wzfht6n2hc8wvoheogtmxlaoxwnriw7ziti5ug0xpda3v24tfg99mgiqc9uscaf76lacvqiguhy1tbcjo0waweh1x3hqjbjjffpkhu2hvdlekrvncxtewknwg2uc89rdh15xjxxfwdm9rskbm2fxy0vutde2bcsbv9ya0chq8cv2dlq1iyksbkog0pilpg0g1u4ed88ml49a1oz6wyoo74k5lo310re48m2734abzv8ydku4nvxdqz787nby3wcgd5urte3mgtoeme1rfj3diqnzjw423oyh8ukzua55my4756y58fwvph188xdk7fn9rjuifage513p2dn6awusq6xdykvau280zzbtg06nnvbwbntcki1n7q5egfkj2r6c5veuqg7tq564x0z2uzfmu5jdx7ahyew2jkrj45maq03nq0ppkkl39v7tmihq5jfel77wp4fgrfkh9tdjo8u2x7anmuto3jyhuwya13oir61pp3tq3y7siem',
                fileSchema: 'famjzlvfqtkdgtuxzff1z8u9k4ozkjp3afs9tjyc5v3yf60n0u8tmn5l4077q65lbvpr154wiva2p4733neypvc19gm2gei7ex7q609z35uy3loyjgn8ou3k2ycbreqnf3uc1b7vpg96st4p61xufwt24rhx82aiz4ex0hznilroukq53xxya54dtucn2hcqruvwu1dwijpqll0rflf24q2a4xox9r3bln8i1sue9v16yd5cedhbuiozfak24fvpiicac1db0c0t4e7d8a8r9ib8w3mkdjfxznmygyyy7ab847vz3qsjdn7g9d3qn8v6a1fp9atqnx8szujskcyf3dtw0jp9xbbo7bpnwkrj347ges0y0yfyi0kr90oa8wpvznev77begxg5bxymmuhqyjrh30kz659gq4rkbeag4m0vf3np1izpwblp0ecdnd57tlshlad25f04nxlovevssbd90yh9wfnpj0hy9l94ajv19di6kr2tk2vr2cega7jk8uhse61t8mrug7yceecj24143v0np5jjvb67wy90s2ebz7v84dyxbeqzf1ju9epszh2o8kebsejm1n8tffbawn39m0tnuz5otnj4kjurx8yed87jf3r8n57j5j0wjqw6qdzj2bbiye8rcosl23y7culqiclzelhefykpjjzfvxkzo7p3txog4jncrltxig377um982q3jey4iunl0zttqa80h1ycayuvfot64lczzrfwbvi633up5ttcahykbtimcn5jhv75ag1qku1pbku5uzu5gpm70wzl9yux0dr5wr7wxwv377kjbfw545ctta4ar80ag1x3jtehfbe0cetg7ia7t2vn9pcf5bkfkd84f58uc2mnhzqqkumkrs3u153eg1xn0phep7k4arpy425kh2nt0qz0xvd7aevumcevioveqxlab91i76qjmmqfq3gk1k6gnsgsn87pvkebtdalw89so38qwimeuhf5x8iesh36s9d9i0zzcwxkktzyndkl',
                proxyHost: 'kzj8sx3m6ylhp8ts9ht6lxvj3pkmhioi1kwqzb3dhn1kw0uto8th033rnfgy',
                proxyPort: 8563716882,
                destination: '1dc2km7m85hjvr7jwxs0y7vwmawn8gi3y68388vmde9wym1c0zqheacljtjxaufi1zlzy0e3sjq10txmtirrdxxvcs0at7777ymjzmxt1guu2pm5wzn0r2b7dujj9wm5yzk52mwupxlzvrywsocbz81d4rcqpjzh',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'm0cn3ect2r183ofs262cvahlybls9om99jskqifhcw7uekltzrkmutgu2fnjsvnqk4pnvtcv5t1satn5g1fp70jzjdbmbmm1acp2ghojsxfnwfmwo7lsw0xl5nanstshb5bsdgsovcyl8u3hgbvzyqcxa2ligro3',
                responsibleUserAccountName: 'qp2g147wckruwscan2c4',
                lastChangeUserAccount: 'syd4p69f0ibm9xvldyzl',
                lastChangedAt: '2020-07-27 02:32:57',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: 'lrm4zwqm974sve9es544teew17148i603lhnmyf7iepjvd7vg1',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: 'bknofyoiox68lukzl5mo',
                party: 'r7cmasgb9shyv5ect41oe1x9el3x7an2r7qu9bkjjx9yetexyg2u4uff525n1l1nn5t1sgofgbuby23gv8zeq58eq0pxfqe3p3fqds3nigsz11iugwo7i1p0mvdbrcx5kmx4hc06o33znwi65omtvwgosjzyfb4h',
                component: '88ep04487j6ogds1yjncabp4uxj8utibbit21u8xh9ll1uufcmqcl5g15ahoxde5rhxicicw2heq6212jjdurgwd2kwopy4wk43o8xwrpcid1u8c74pm7og5fwhl14zp1ubxyatnthcpvsmibufwcd58l7zrb9sx',
                name: 't6jm0ud6dwetcg83htnjsnxmmt4qayim7cuyl2pvqhc2t3o1lusavqchn0fecpc66yehygfgzb8qk80drk76kjtdhj8b8im9s9irhsakvnb2s7i6k18qku7t8lkh7k0pr5v3miuzdufi6b0vhb91kpdtryxes3i7',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'l0znbxe8lqxtvwvy3zyiwdckkwe6j8bxiq6c86y0z0vba8u8absdl4voxm2613so3afqbeacc5dqfl8ubtc1y8a6c8k7ali18o3vu765l7j7ba20w5sup3vd1zc71u83yggkuygmpsmvxqys6wwy99ohuwz0vfl5',
                flowComponent: 'zffki7p9xza63r79d3t9znac0cer80ncett2m7080wi6e8xyltdgn5lglgp70iye89upoz5agb2zijcehtueaxtslglk6srdqx98jg5fcea0a7uj3l0nwo57j1bb21b5iy6b5r57spuwvqonwen9c3iqx462ju6o',
                flowInterfaceName: 'mm1q39tju858nct1z2coil02pe1m87b7fe4grjif9do1mkozhujdjt8leybwyhdzqspfurs10ju7y4h21esl4aefnmcobancatigxpa5xi91ozt5cpuvnhcgey808nl2ex7we5cj8a54t4v31337gj5um3sgvtsj',
                flowInterfaceNamespace: null,
                version: 'i4obpvfh5ol8795znjjd',
                adapterType: 'tt7nvcyfuuqfmha2tpex3kc4y3zh5ssxttm13wd40t7wmxyc6an9ecodw7jp',
                direction: 'SENDER',
                transportProtocol: '27kihpwtf91ymrst7qq9vaw1d04x8om6y9cn7ja28b2j63pe9br3j4rxpy3q',
                messageProtocol: '13wfi2r4r2zc77ov4z5in1ygck76vkaxylpnek4vdi9ht2ru2zk8t9z4gapo',
                adapterEngineName: '3fwizbae9t6m9e9wird05xoyy78kjsmoa0wogkm4iij2irms0ju7nqrrmekvdp4i5f74rfq3xjqjrifuphnw2kyjylhs3ohz5dxzvxs8fn93lbcb044rsvmmojjpreowzp2jywz48a6uih5tzpstf3x2qir0keq8',
                url: '7w36zf1m8d30ylf9wz0fxhesw6lnutjzlqp2nypubbi45ei22cpa94ava94j0uikv2anf21m2p7m97bnxsxz24ac2j6nv3zpyra2oawq434wml1usw5redkee6b5k3c9ezulcj1a8nb85y3p7mp8h6g52nrsfptz5s9ac7cdj0c2onu0ztxx5hxcaixl7ibufkymfi0wbj8bd2s18tahyn4ysn98vrc69ialugfxiymhamg5dpaua47fp9s5cvfujh1hqnvwdrpz4wjmz9ow4pslc6wxjzdfufhr01hj4m3w7afra08rn90fu0767e7s',
                username: 'twe4ov188utg5i6fds9mhwh605b3t1q4n2f1b4mghxixyjcf97mzorj3bazs',
                remoteHost: 'mmlvlxvyqp3f51ll3qpsfredalns8q2nzxnrwoichye9l9sk0rfiom6r99qwecm1b32f0hbji5yxf7d1lzrauewrsglff7cpw3f59pge4cddwfajwrnmcj1u0e6vpjrdh0xhzhkqidygcwks3lxtdtauhdqt4xxi',
                remotePort: 5067664625,
                directory: 'y7pq0l0wv8ft1w41sl5hgat9cs4a8ranv1bsse9dxfu7wdsgs5gj1f3pj5fcycf139f664su18ayv3d17ynayw4fofoqc0k40qim7t3jcb5n9rnlmro6r9vzd5pa5xggpcsgortqizukd3macf7jl6auqarae7j5f413jeh4z8lwydsujsdjjk4yav5cmar1v38ziiuko2pxllmhhhddyvnwpdaovv5fmygkk8gulpcov9g65pbrh00fm6dhxiuxhw3owby5qag815pjsa23s6u6wzfzwblhb9bh8aicadqjex8dauqapfm6mdpw6g7gpudv9n6gpu8sacybwqghhv5q3bwh6gghcznvvujne40oapz3lxtokjtfv6kqg9p5qjkiaif43sb3rwyqokrjplgw8eseo3ay3zuj3z40fc1qmcw93bwufdpokyw01nobdz9w8rb0oqzvf4s0mn8wl9k8rflwfe9nwv9v84a6065j16scgdiozzac0dvuulefz8s8wd6fbzer0w4iprvzl1ppxo3tf8265g8x01r6ung0u6ji0esdayzn7xpfb0piwex40eyv3kkyomo2l351eshaycqv6ink3vn9j18bqtbb5f3uxohdz0fyviup2ma9z6l6lqhn13mtob6lly5d0x1l0ioi0bua4o7yxjvq4m2gxg43iik1aj80l2ng4iycean1z2u7rnj09lpmg6fujy05nlle81shhfu96ki17chlsjbd5ixo6oisn1bnow27zkq9gip3q8bng84m4wkw6a6is1zrwcn2th5atwdv2i5n7hbbwd6m3gp1flnkwmowpeheucy1m4dz3zp2hwpn2ayvvkufk876ettlgq377tzvtir5am7pjebr1kcd44qte4kcaztfhiavgzlyikoncza4o2abn6jdjcvd7gfldqcqsfc4kdvpt4txpk0h02ec879wuxabsdwleb1lqa5gw1lf0pk1lpsouu2r55ji5g1l6ahbazyzrhylfgi14sp8',
                fileSchema: 'cbxb96k67noit9y3pdqr26w2eicjhyqntojwlp6kde4k8smwguxi5excscvzxsplibfb1qwvabl50plb1aqdfha1k6ufer1bp2h23gyrp1ydangpog86qbcfwjitrbg0a4ad8dpojdw045nbr7en64fgmk5ct0y07f6j3gui6kz8taqzebystp9noe8e85tkv7eaj8k9lo1ktfi5qwwk7mwsv8o9qkubidnlkr9ra622gbhyk4qay1z7s3ktrvidfp0vviwzuy2z6twbw6bfxhg1uk8nln6y81gvt0i60zrxz7is7bj9t3fwuy01r4v78cda4y65opesucfhleiasenvlfh3g4otab26q7v9bk8i5c1whv3rfg6pdu0iag2161fbze9wsh1zt6s3mcoglzu5u22nvda9k74sckjwmvxjr4vwliqtq651m1ww53na42qq4m9eaxxgxsoz18jhlkjeyvjtzrc4kmlet9hwqf14uopiu39a8xiggu7en1bxlxi0ihsmtm1y0dpqy4kq7luaxn0tu0orzh5k2euah2q6lj0oi5iwm6jjyg3sye3obg91jj226rhfb9jdf1zeojwo6pe2844149nqy06rh8csgkx11zhvdy2xb14alx46f1esmx6aju685av5s7ebz4wh43y67ryad44jb2wmgtwikmi5jqb5ujvkg55t89yx9lgpvlwu9pmj34tlitlmcpbp1dehzhzjpet99i22lk1sub9b82tgtnos4h5cv1aewptelcsnegz2k0h774kitw1douveaw152mfgy3nljxsjjauvgkaltbf23x6wcy1rl60n07qamp7e9jxu3wnmp9knviwix8l0r8et9h0kfcsjfjr69ys1sixcq7ii3vhwxd6ccfrqi25ui186zu63wl6g2mrvvhb03bxncnohfvk1yxe0atalr4nmxtphn08hdoh27daa9gncxgg41c9euplc3y9spom7btz9etlnut3vvbh5a6f5pc19lx71sqra',
                proxyHost: 'j1z3kigj6sx9ydq2p5mmlrkcfn0ach2vtcab362b8iunc10m6sk5qg9elyoq',
                proxyPort: 1828202017,
                destination: '33wupbia2vyp8xnujractvxe96hbnp6eefxkypa4wgpxu281cdnv6g128948w2pfgl4rvr28w5t19dtwtrcw59cc44tprcz6awt32k6ut3y8dgwjmio2xrskyrstgyztoisnrffog9i3z749khp7hlzkxhueehk3',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'xye01fj0be3z86ay01cg7fsfmfe2giwsc57ifhm8d5x8q3kto7yj3pe5x7r9i1y5qbu8m39e19d5ilhoz020gv4p2o8nqmb2x813kn9elbzp6lxhano64g16v6x5lejoitxg9ufmea6h6dmcro6xrrch85wuaarw',
                responsibleUserAccountName: 'iir3uk5odvkzlj0dqy6i',
                lastChangeUserAccount: 'bezap2j2qzl4i5ft8eq6',
                lastChangedAt: '2020-07-27 17:23:05',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceNamespace must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: 'q69l9srttwgg41h4dvur6ejamo4lb4payd43j5hn7a3dt0vx2t',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: 'a3qw27uz3geoi8vnsmh5',
                party: 'py40hesjha23kcxhqinu4rxf13nmfogopfbp78fk3twrgkmv2z9vmnc16wqlagl05fk57mrtryeitu9h3rl33ksmlwxh09v6r9uzizmha6g3jzwglkhv9xa8k0wx533oxay00k1f6uzqun5ws0e3746ryfqiqibn',
                component: 'qpftxucp6umbqflt046h6vcm4r8v3ks0dh33nztawhy9gpjz0iol6lasrs1hpa91o6qvuvmedf6kemx05l4j63neyug31qm54yuye7i87yqrzawcrhy0jqsgtbu6zb3b7s5anchn53llwtc5xgl8pac61h34v4pe',
                name: 'r3cxexqmicrauc8vh7izfcel6jpv7hbpure7yx5oz6qudw6f6kfoquf19hqe776z3wlxo7wsb7z8372kbd1zk13c8l3j0eil6g54xxlxnumkmsq75yoj1jp2p1h0qr8zgnsmwgrour06lrw2g4egpdj5ja0abel3',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'glyl5bgewmzwbqx8fa3w4z5qrvawwpt6720wflxj3rrq16l2yo2bzvc3nh5ykvvsas6wfvj13nhtnaz74q8raazednx2mgfofqz0cve2jyu38iazbbp7vsygowh8kha44f8r9avyh47t637sr97out5gljzslnv0',
                flowComponent: 'j2flc9r0mnm9tow5j7r7sev6s863a7g6aohol6cdjrygy84ilg8hpk89e1x58siw114mne3mb5feewv6eukpv456kheizk0eiq44wsfuf8d82sxbjarpjuv2qd7dyu6bktjc0ryq826q3xe9px5myk5t3agi5jzz',
                flowInterfaceName: 'oo86htp49jx4p9w3eyebo6b7cg3ihmfmkre50355e9clgiwsy1iuztx0tb1ga5u13vmbz0cjm8fzvnqa2f783or94qlx2u3szemf097tbvb3g3spv23impcy3oo89h7xkon1znjrc90hgr7eplz94c8gwqxyipzl',
                
                version: 'hm1le972qhn201qu9pwo',
                adapterType: '5gtd98fniy8yz8azk2zt0y1kv5klzfmaz98rspj57lsca4etsquommvd0wyk',
                direction: 'SENDER',
                transportProtocol: '6f5bzeb3stgrinqga8h4ji0vtt1rzjiaqtmfrgbanv93i66oz3pb6j8wybs4',
                messageProtocol: 'zgl39qyqiwaaayw7cjcbd39sv5grh9d2lz68390l9wlxcxzxrjzt0v3kyq9y',
                adapterEngineName: 'hbeuhvq8cw3b3bapj9owda1u1hylqlfrvbgkinbfp0t9q30aksz9y90itvcosic70hz37immdblknkhl7o1ylems0qnvlu1gklp8yviwq7oxx1i2vg64fwgrihr7zbugrb5bgz72pm1997u0drv2cuk1pq4lepio',
                url: 'nphe7tjeg80jennjljmwvyocrxbresbdxquzy8asz40kenzdn8bxkmz8v5rp632iv5y1msg3lczpug1b8xlumkmhct08ntss2g0pxztcu2zavxdpjny660asa1981thm9lbmh6q1v0og09e52f6aj7i6jb4aep90tq9s9yc1l7lz3y53q4nzuitnc2prek7euc5u5wmdafidafd5ygk8jv62npa5argbdkdu8oumxg88vj5xjj4wvbkj7kbq0p8en0fcatkxoexsk5wp5mprdcjib77ystlf43ao5mmze1hygzw65g0j9jljk095naai',
                username: 'qqbkn471bahkd0vgy4apx2yq4jr2epphlxktywcmjvlttp6g9cm8u51v1lxx',
                remoteHost: 'it1uvwt397dl0vp556yzsf4y3c1pycatfb7ey9jw7r44mnqdkba5sb0yh0imybkjhj550llapondv0byiueaner9942war6yxooskbpysov3ed5dn5wgyvv3c6xe2jgmw6d9nlir8k92s4c3wnuvfqbjda3ypzai',
                remotePort: 5686672935,
                directory: '8yqsw0enmnqutamunjxb1qdzjeqa4r5kwqeh41uf5ny4iy7wnuy6y4atpvm5jblz1v8e3gj2nnqtxx2ci1qgvacewiu2lro3zkfaxofzlrfae0t2n8gfqczuazqlaq1jkdr85q13uu4t7os518zff4lnqlpafpi6yqb4mhadow8a866m88k99fawxhcd2gujtiimmdcj21upmgqo3l0d2o7lkycch0porz9ndjr7umnlva2o9q9iuwmsq759ply7kb4ol3pzrjnthqo3cqxpg8g4by9uras77noo3sesf2mcx4adbe3q20fi10vpy3dukj8kw3q4nx20u4sifhvo3snlqre4ocgjuygaec1b6pinfg13bsdsrn5lmnl1797x5i5r08f8ltzphi3ummqimj021bhmhum97eto7jf9cdhxkxiclqe0t5b07nck7pfeq9y35sm4reyksiczqu84ci8124ccsfqx2oewx8fdi6dp4u89kk3c1qapghicof0m81f2qmlasdqfosrveqtqny1yt8doxuvt9igjfa60dyjuc18xjfl1zw7ag8hrwbvxfw7l42tspm94aywf4kp7dhz5bp18f5wsh1u4qvmvn9i8l20lqd7qezpgqahovg1chi8dqkzyabf35b4lw438dtd4bho2pyq211rknw7fipiv3ld68otz4wtbbwzjuwtc8lwnkhv6km9gz16adiw4btl3kt2kqc9mu3meoqy6wlf1bdrqntxxr5pjyqe16un6fj6qlc3y4drgevyzup041z8ecu3jjuct7a48szpzr6ax10qd2x39cl0kmbwrdj2a80pbexppql7vvm99r7dtgcdogi6flqpqie6hd6lxi61uui3tlzuda53s79nczfzfv59tn4xi37yz9nv8rs0tyqemi2q7vcu2dtm863niv6ok2eil98976v0yy5z0f8cso13et675yot5y78ttrkpc1ifr8fv955cqgqx52uo46d0rerhcbu847sb9rdc8gz6',
                fileSchema: 'r85r60xbika9r31gd46umw0frwugxziqd5cjty6sqq78uy710wbhzantd9ldn0gqcj3hrvan2jrp0svoql7cebb5hl3nvft0awz0qufyrp1dwppegztm8krsxdambkiamjr5glh2wd40vyv52fyaik9d9ylogypd257de13tu3kqack1arnstedm7t9bigcoc5n5va1805b2uti273uetd8v2sslwzrntbsrxtv5gfytvnx9hle41rjgwv8kktg3fpfazvr1hruj5e65259bgy9vq2ldt1cs6h85w8nt3awrsb72go6hmicjbvnocpuql7lahmsf0m92nzrbbgein0he29y9gdkrd8aecud9k8yqsozu4kfc89drpcg7mm5mlf2a8keemmb2p7tna6d1aaiq83jlnrpa0ce1u53y3ex8bxsw9auxn9qsh5arfowcwetkzkswxjjps4r6gxqiudbxson7xruvem2w0b36xhjvkkkgtkl7mnj23plepyneo562ofm665on2wwoi3f19zb306fzkdpa5fwthubp6g7yvyf2hp8dl6aadqqpq9fbfv8hvk47szzq9f3qpjbb2ga2c77wgodkrrtqmnuhs4a02mmmeavkllrcwha403dbzfjg5mg41hsg37p8poat35u36civ7i3fdlnse17wwrvn0n87t5hmrc1dgwavnb5elkpkjaw2h51h0tomsx9f7fsy99yweq0fw137yc149nuy5qwwf1wqbd532v65ojdefyr2k668ltp7fomj8couiepira5uvu1d9ekddkijphjqcsq34r6x3itwrljq9ma838iamgqfbmuyeeq5icivtdv8dl9g7gm3tc9o35jatm6tgq1u0np77nvaep8teubafjog22dqzn6zxqwl4lp0vua03umnudhazt67a4fiml0pvm6zy3dh0k0yhpz536l5rshhe3vpvehcz8io70snqaoxf0sc1p5l1qqdlekwdb839mck0ud0o3dafuir9avy',
                proxyHost: 'euux1qdnscjk3l1nnh4k99ddtna0tmxgmduzc0kssncjsempzbfs4l27mhl2',
                proxyPort: 4976514900,
                destination: 'gf7znta6e5nb4c3f8ttopkjnao69ots4eeyrom0ivdlgsdr8mt04gv42femelws5g8g55l8h1zlcrk5ht2sgoihzmm95jjfxnf1z31o4r17vrtk8bti5eod2bklb1sq1mcex2z5yuk7hlm80y65hodr80m2nfidx',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'yv1523hasj681ufredds12p31s9wyed1zlfemesh53z65656rtbe6l4xs3j62epkvuuvb5zvowrnvo62l516l71omf2yzntuka6nn0fnd1cd76ksnrv3v3yp86bm1jgke0x6xnmmnpuhwx61m893d1ckmvqz29zv',
                responsibleUserAccountName: '06h5b4p4xzo9oo6jybfj',
                lastChangeUserAccount: '0a7l301ps74hqg0ke4ob',
                lastChangedAt: '2020-07-27 06:15:54',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: '8mcbixc0f51oq8zp7i9s4qf7vzpqg2vz41pwd85668dnx5b1zw',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: 'ymt38yo1bs5gh7xw2kjj',
                party: '94f0belmfkzuz51ouopfabtyy6bl76hoiauo2pne8sqhi06wqtczlxk6ah4za9r12117yzwah7btq4v5nnv5ptygzumzw78bwuarc5wup6cicgvmysruzbu8pnsmcfc26r7zg2lyyofdvfkg8yv2oina038ju9tt',
                component: '5oo2mmale3yli2rtdu2t3hngv3pw9wuja2eyy8yn9jwryvq1c9831idnrhjgtbzt19t1w78cufld9tp90g0v9tiiltth8em7q715ifg0iyxwrzd1igahgoffnisfgg5cssee657oeozf8x967pwvab4jib7w1exz',
                name: 'z4bbudbkpd6plv18lfcurprig3lxvxx5rnslzm8rq7njqlcermvftjs89cc5o17mj5258gx82dtp0zdzhanxdaiqvy7lp5aautkfsnga5361ap387lkgblp1e9b1mnfvwqxml20pdviclkbynznwrevwf5699c3m',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'tyrjjvw36jfhr88051jo0awpuv3rwo51y736fxlxpd16iham2kxkc053hf25f6rrrree19ome12agtppu9cn8aa5unuza8oi08fhdby41b2l7reupvn12wdhs23fbandiuxd8myonxdlymue8oh47c4s1qfscgdp',
                flowComponent: '0baw2e5gywm9r7vzn45pdtj6i4uxpir81wnzodny2sovks0r9se2fo4fiy1w9iyjkzoeneh2t99cet2cs7v5muhleon8v176nph5h1bym5u8r16k5pb4o47jk9e69u3cafkzoy7i5d10zfqdmvzhfyxj8t4q0axo',
                flowInterfaceName: 'tsg257vrx6cyxure2h309zbdn0yjejz1bsskoghh1rlt0tp1oz055h9x5j3slrm3a78hxs8e9f4kjnzg8p3gd0v26u02jp5f7phuavzcwgk3e066dzypaaep007arzhxy20vjxml5pnqmjczrjdwoab8rcxac67g',
                flowInterfaceNamespace: 'tqucks8vboxaf7tzycivah596qn54ipaty1ohu5wcc0hg8bxo5w5nbg74m5y0gah5dr2564qloto48fg5lgpze65ar6tih34vt0rotn06h37parrvznpg4bc51iecw4r775s7jkpmlb7usb1jog7ealm2be6mff2',
                version: null,
                adapterType: '80mst3y2godfxbx4c10iyqesojccks3ruxkcdizlt7ler2wp6lxhubhvc79b',
                direction: 'RECEIVER',
                transportProtocol: 'ayaq1rwi795jru0c4eheue9ef4zpth1an1bi1pa51byfic4pspylor05rids',
                messageProtocol: 'bkjz4qku0xwvngnufugi61bjjo29a80htqf3ysdilfiqtzdrb9yt95clhpkm',
                adapterEngineName: 'h05fifqmktjv2xbuo9p6bxrogg7w68lexu10xsikbbyyy961y489ch1oyqj0nqakvk08l7vru6k0jale8tligkp1aq9xg09dys96i5q3ixnxdpw8o1ou1uyvhhuno1ik339iw39itj5yusqh0lsree9nowepts4j',
                url: 'p5v38kkikt7gm1v618z3bqb49dril7z03r3dmt63s3cogkwp4qmbf2bcpn0a81kv6cel23uhujznpk4752o4izz5sbrxampsrwe0ii1t5mqixoklfeouutmlsyvatxbl38g6o81b2nvba6ewsdgrxolx2uogk6rpwup3quzd1clrflhgkluuvhg4wuovdp3f0ozwhpo7h0zoiy8th9saxf07z2tb9tb66ixq6ok4luvweucl3i0ugsews513nd7hhy8f5sw7z5bwu3spqo2fq3rmc24x7co22ggydtojdbgra3p0tdfnv27xp8vtohq8',
                username: '04qwz3z5urc0wr0ssj9qniqaby30n9j5e6m9hum3gmn8t753g5wiwfxwnrsf',
                remoteHost: 'uq1q9l8q919o9tv19efr3u5xx28lcalsuyr8ga51mq480utvajdvg3ry21id0xo4iq5870t6t6q68jc7grwxvsdzr3n9yj3krf8ae8b0e4420ep70o4226xulng53t4qso8f48uwps9ttnd5w38k6e2hw10zg0e9',
                remotePort: 4508772166,
                directory: 'jrnyc0b468s20s0gumlukqfp1ih2shrcd00tvx3qef55gsivoiwvuytd29htn9ifvoz4na8rmhznhi6w6cdc9ukpr1i1xqeoqtsif7d8e8kpez69f7i8iwtvuhk7c1gpn0r5brs55jwbb8ho12vdbpa8bu0dbfqhctzkilwkn82n3ixsm627eiloh97ol6okuts64g3rx11y9gbtokk9ij3q721x58msve41fd1n77b5vnv0gukyubvfpoj0x4yvxk5m4r8e7du76a27zskn6tnj5lt4t1tshs0dwdahxzp46k08zlxj4a3mdtiz7cmrk36ngvb3k2czj1aazenfiq702zzr4gtka75u3bzo48wba0dbmg9rx757vzuftbucuwb1ofx764f40g0q7izq9t2hw0e6fv53hsab5guj3gixlmc19ul0s75lo0o66oqmifiwgq5bttmr12wiybucd2v47i0r19729u7sf3gx38tpedgkw6tspdsov3vpfht1run650fogvqvi7hqyvb1pjkxhh8zmpnupyu5hlaan0mhmwhbb2c7ebck5qp7ve2r2q63albcvwzrqoaznr83jmzj2njwovj38lg7pg3w6l5oxfdnhw758x10r78pdk3rwok9l6uwi3883zvokk5uw7i0bizjhbz8la71bd0w11glnbsu5blajq78wbghrt1qysu91uuotdsyfy3akwbtdy0lysfqte855o30y1kehpl8mi249p9hhu3fuy0l9hipeyu0dbubws3fw0niqmrbh3h2g5z8ytvkppoxz8hfxu3nrups9v54180uk8p9td4es6jy2bm8220oo6inpe22lx99vevqm8dh41tv72dkf39vbpbytslutldjflxspqyrk1s5i99xiqfhfgmx1v80gfz1037sbvse7aab1ifzi980kry3vn6mkwf7ujd0m29wu5gqkxam6wdy984a3hhrhzlymm9cr5vwrbtl7cfqee26ip0wgrroqtpggit2cwck',
                fileSchema: '9lnlxl4k9std941xr7an57t5sq3v6e7po4p7owa1dxa95hg2malbhzgh7c42r8y31ruvzgwwr0xkdsluvjab9w0anfjkz03yzhrojxlgob9ppqssytwhryq4vb6lbcaf83alljvqq1mgzncb6d3r2p6q7o9flc0oxp1vojnlczq2ol71nykfnd7p22jnm5drlip1bnqrck2o6muypu7g9m3xxq6q5gpsw4vdwa81b2lq1vecl057zzxrk8t79r5pdxoy16gj6pi8w5g8wy9r1uncsak4c9v2ejbbsz91g0y94jlrc2i6nn5t82xxiji0umrizbd0c86p1ueh1hf0onzemog31050yy6jejn3lv2e91nl04i5cqpx2tln4zmhmv0ieymv4xf3vqjrlbexsobegr59xi0bq9rnfncg2y32ufnwl5raox9624nzfmky8bu3ficlrp2wolaqo8v68qqgqg82gk1yqs72kvlx33i8j6yvo6awpbbi01foarjk81xvdhctwn8etjppenuiv2a5c3gwdywo956etshe0it0z9tvyebjxtu9lj11g53fvb6hhl69wxakydvh166x71qod7jkt1fwxzfc9q6p6l4ffzxeho4mcw5774o77a218vql7sjiu501w4nqnsm803pgkk74dpswmaddqakjlzrp1e31uap7t0lhyse24x03tcih3ubdmmmz5mi3cczxazq77j41ms7dxkym8hgnbkp16o7fv34yf756r8h43yyp89jj9bufml0idoa89zf9lyi5m526zvq3mp4l8xyq7x46ddx9ag1rb7ekgxi6k7s7xpo63lhxqnnvrd7is26pomo1rcspqyt6shlcbex8bb9h8s7x4bszvi1iwwwth5y6vamk1ao2vsozh6171ajrr1vr6belyqx9xjyjjld49zvemg55ucvetjf46npuhy6ma7nvgcugqkbil0ipthuhgrxnv4qgrp0lh0hzfcdjtoiz77t1g1p868yaqnq6vr8b',
                proxyHost: 'lshz6obqk85ge5a70g7aojxeb287kxfmxpzp4y7llmgxcscxj6gvu5ab5efv',
                proxyPort: 1252398360,
                destination: 'n0adrae1fxae2h8chvzh876wsh5u015au2sbwv6l97xxo41ixgvhoczdn7aczwd8hpf8f8u9lj0voa7y8shsmb6xenmj8c4nv5531znpsqhppxlogkt242rv9uvr5gdg1pjsgl6d8906qn099ssjj4tukax2j14s',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'hxxgsymbhddmvv840y8ov2xyvk25exgxi3pruwy72ep6jjp3qgjutxulno6sssvdxg8brlwfyzbp4qp7z1kr8fqyzruqlcd8nd4kg6n4g82csp8lpzjj0dd7xfwoid9vurst9sa8ug3z4pp6fsodkkustkwqhfb8',
                responsibleUserAccountName: 'yz052uluy57okqsxx4ty',
                lastChangeUserAccount: 'gsbmvvnaq8yjrxvmy1th',
                lastChangedAt: '2020-07-27 21:09:37',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelVersion must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelVersion property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: 'u0gws0n8xup1gck33rko0dtf0kmqffvhebrqiv34tubmfhdnvo',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: 'h8q4hgcaha823fze8guy',
                party: 'fkcgazb54yunjawjw360yff2fzs47snqijbjxxbyjf9sacazrtjfbl4eh4ki3tpkq20y1wu1jrlumkpj9w6ug40qj3onf2xi1f5r04ptg9s8scsd6te8wak62pxh090lsa9buzoqdfmiim35i9usn65deba46ys1',
                component: '7r3qlntxs8fd89ijph3ifeimlr75hogrylw9w5z7bcdb1p1db14rp9ikgq7ozoyblu4ntkfmo1xas7yla9trcs61vp11rnubf4h1re9p1n6h7qdhpkvl8ye4tg2rvz0zs8scpk88k27dby7svffn7m6xui2rc8nm',
                name: '7jt6kk82h0rp06onksjf014ghhx0abob66ka40fgz95x8xd71dy1vc5d5f6co5122wl7xfys2jcdlcogerii0enxka5exi75whpyk8u6zz9d091d2hn0cbthtnrk4ktjpop4vmmct62mnlusjumqlzfq3xyseo2u',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: '9qxfcxhy78p5j10mn6s491xypqesvkd6io7y9ebk287jjk5fqc7odfgmmf6rn00jtop4dkurkrd5361o89ph6za02bw20jdia8nvuy26adjw8qxlgdcbcsankifccgon8qg1kxdxn2ow9by3pm8cpleg8um9xmuu',
                flowComponent: 'zcxbg44fyvekbbabyopq3s03b7e5gs7r4dgztz3sgqx0ih7m17huniib0ejfd59bgpop9e10ky6jta6wbfshqsdz7xy677k1vmux3yrc28jvto37h7dnuawa985d7o2ho2hkyelsyxd107huciwxwc94qadfrmfd',
                flowInterfaceName: 'zgy9rhbd45s9d566f7a6cgmv0nxd0uac2vazvmww4x8dc0mer70e591mmuoxhn019px2js5s94yl3texo15ularzv5crj6hjdn8ldlqaphkoc1ndfc27rhekg49hvsu5ltktfl6d1km1v9rncfpqh37y30dhntk7',
                flowInterfaceNamespace: 'doniws7vg0llwnn9zd6zfvq1crhiqmqjhcza6epgwx1ikpbqfddcf4gafy2gv8ld40cm0aai7zrmwzg3480f86ae2ozoga0yb2e5n0k1176dyvfakk4k9scyzel40rzvsgccpdzskbwgxameipk9bhtkwci9wjmr',
                
                adapterType: 'oxgej1isxauzj78dkkni56g0lbbzcwy5j4esk9y6tm1nllabjk8afvhfyqm3',
                direction: 'RECEIVER',
                transportProtocol: 'sgefigd6ak43yl88tvbku3l7me95lmg9w9fv0fkdg3ysdzie45w2cj27mftw',
                messageProtocol: '5zrk6eebby3cw0eheua1b18j62bqsh83syav7a7wygkhvoqfhby50652qllu',
                adapterEngineName: 'xd9t2t2bpiqklxeftn101ufob39jqcodadmo5s3cmfu7gaf8btaal7gnbbuck8xykwmlm7btnptgg0n4lxh9qcjksb6bgsjirrmm5f42ps6vwt17gchndsnnj8qp9eiz4xec77qvvx1ihywmlyrftoywsdd2nbla',
                url: '618u0y3ljohzcbk9hjdoi5ea5lsontj1gx36nvuot5h1ji7j0ahfmc41qhwrhyavbug2u673jrnk457w8gu4qt72480p8w6xsh4lvh79hronbflx52ipo65vgouwweamqf0ao2zeua970gawkbi9smr9567xg7go2tkvbnhpxprdskpdsk69c4hmcy6qjuian434z2nek6yeqtpxp4sobo29stvp0830548lh7ass7czettibmrlome1c4d0yy30kf06r4emh413g58neariufz0a08fbwk3n0gq9tz7j9tlxakbo2z4fvcyld5kap9u',
                username: '9nr004q07gli3wvgdmfcdtdycmzrsbqg7gwo7iuaoq853u603atyd6ydf03b',
                remoteHost: '1qpq5e231w0gf85y1klo4dbqfhn9qaj9582arkpy9s5dw8u2hahjxajar1v5qtuzi4o82oy2n8agxar8t57cd1ds2io2egmkark29fu7tpp9vs318p9esmtylqeao3we6ek99vdpp50xhi170okps9bpr1bauu5w',
                remotePort: 9273088066,
                directory: '4qb8x8heir0xhk7mjqiwm4ufprkko404fmznywqr0ewagrzlfyi8ru52us940cov959h2nb3t4t28bynvw94jpwocz1t9f5x71p8whlx3ubz2blprdj1qsx2xkkk9yffw5rklk2l1fshz7xghrzf30553io72awe0rztaxh0xsjg13zi60pvq2dmtz6p6n9auaa6mxb0hltlr2j7vsnmfba8llbk6wr28j0tt0hvrkzce9ci9af9ui0c8ech2o5tx7cis7s0wmnx5f40dfzq0i72tyenn4aaq1zfhjdbfg1c8gz7il0jewp86v76zvei0kk2xu50ijyje6kkpnsny8t6bb24u471cojpvhc12vemy7rm74kj3zl4q68fsag7nshz44mc86tdu96r6oyjerp8htshrrm6zrxp8hw9kirpyxqncjwyzumcjc353cczfbuackgq4cfpuyi049y76ethgj5og44bbahe5dnasmr9vui19w80swsz3jwjpr0i1dj31prsvx589mr55s67mu78glll2ns765qkusojl033gyqsel2yq9qxskzdlfhu6r4zf2q7frozpe43hrrgzd06ug9is5kf641voaz3rc3eck4kxxm546sxy7clfc8hs3brxr9wy231zzjyul7qxn4fm743da4mmricjqto9zla1x7uk5zghjw9pzaxj9g8hhfa7s9jlxmktwjcw19508hymof57i6om77t7bxzled7rkqo0cyi8fulzt7tnj8g55x50cd8tumnl0dy39stv65bvslfm4nxwh22iqkph38mjnlv5lqd43tipyuompt9yp5j6li5imamk7lqpobcojua7lloynigj779pickom0fa1ugtilmnhz3pha70rq1xyalwinpvnlcr4ksn2ofu84wqw7qg2jd7g3mlyi5v7j7er8uz8nuwnmkj4jaq0sok6640mb89s77ujol6v72wunp1u942u1p1pndeksvxuf7iozi4dbcnfz2bs3n952k',
                fileSchema: 'owjpztq0y08gp5bwp2v5o4vygcsc44n9addz2fj1wdkw2h0hcut6ck2sgdalg362dm7asjmllcl6nndhknv6nj4lsc94nt6zwy4db7up3qadk17403sqzh009nxiyed5723mv413kxwse6g8xg1935nntqgltz4rx2nbbspznf3sbo95t9bz33c1xzoij9ten6pevw1x4mej72xnfd1n933mp3g5tztnl98fmzbwlmxmr1riqrpuwpvx41m8j52fx1ypy1k0h4cgpigyini0igzl52q8ro5ltjx7ze5yqao7j1he1odmmncqqbp6hfqcye058k56f9pytsxa2h62prj4t6hdueh70vu35qf58xsx9xrybvo3a3699qx6sje3q6bonnx44drcqvtjaxgcfy21c1ry1jfmw159tidi4f4x68fcx9frzv0bmj4wbai761ea0zhxuno9bjn0w5h1bg29u8i0koi88cqqrnw31z1ek8rdtxowfb5bh1m5v0omig75rkr5co6hfw7ysiwy3c3hh32klo0it88run4bj5msy80f98drplclipg53wfrkjoxk841t0js5ztnv4dtevrxgn39jq9nkb94qskwb97dkbl4nrrlh2g4ufnvnjb4tlagr155gje2r807b8c7n1l0oovgn47yxvt7i4qrlgpmly215v9mlixou3i99rn9vnc8gpoknwwsxvmp6myik0xcngyib6ek6b8gb1olxm5devzjm80p5mxmb68k4b19jbje7f5vx8727cxsvx4tj2ywcwqbhvee2rkefjxbqehphzely4hmg55y81r6lyj3x6epmafvjd1o46oivytbi8z06r8w25bl2qa8xv0j3u8rxwpplq4xr7274l6fqd3ord4qw9anr77mgurj771mrxhfe7obywf7b8rl2lqrxqrdg3ykxvirjnwo2mt3djvjs40trlavrnx07rx5md2vx1xybsw7nfj8uqb5z39vd33fznudpk9bv9rdz4wxpmyl',
                proxyHost: 'rdkkg008bstwja2lyeq7i3gpagpm57wr9qntljq6ug80fuavbx3r9ii9nm2f',
                proxyPort: 6216866029,
                destination: 'rohmqkejfqq40w6226j4qq2xhcnyf85io345aepbfwc38rhw5t2ywzib93tpsseck5aiizf5f660nluio8di2kr5fixaagjyjgs75mk6bdf5b9hlewp64dc3p9wx0zo7kia860o7116mxhr416apfjqyofpfs45y',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '4m847eio4wfiiszsabt31vlg2cso6tkl6ag7jkicigrk52fsl5zhani008tlhmm5w5z5lnj6ewayaqrouajk4usch6axsx2e84ps5gn0z9yjudw3ff6i4f8so0ktixuttv23f8iooeo4fmndlt94j1h8xo3qsvf2',
                responsibleUserAccountName: '92k4uxpyz0wl9ifaxewv',
                lastChangeUserAccount: 'di484s2bt5c0pplkb9to',
                lastChangedAt: '2020-07-27 16:42:16',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelVersion must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDirection property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: '3pbdtjbzsr16ghyfh4qagvsb85ipvrz9r67bxv4p3st685buqw',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: 'ypxjrutvtelnikcbspu1',
                party: 'iat75c5all739l16tuo8g3ud7diad6o00m9csivmqhxx2chb2lnxfx06bmwfvpyivfwd912t925eeokaywxj8s16jxkgdq05boopcx5els9cx8dqwb3bqxrt928lej7cfiuvki4vaymb4iztxvq2acvi2vo9p58j',
                component: 'e74x07p7ox4nzl6kbuw6iqlsxoqsbfut2jf4txs2dwnup00qcfiklmoi8vdc9jnndcvtx1yyi4r71dg7fxkqxkxyol1akqxgovv0enipveq9fvu6wui7vxlfpjos8cej92qbcxfo1pw6z0nkz0qxkmrvlek3hrzu',
                name: '536pc6veg9ombmuswfqonju9ei9tnilzhmtgo7ch680ng5mwc38xs6x92erlnt63wm1avo2gu3vxrjusuj1zvejwnitsh34culpzbumljxsqyp55i1riz5h81i1rcffqwudrvsldqzt6e0yet56suce6f4oervr6',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'xac2ckxicuvm6ibsfsi1u5xmoqalig7cm3vt7dvclcf199r42gzoy1sjnup09gqbosdt206yh1rgjhtptxbuojwx9uhosvizosmz008fnsf4ptmnh9b8h45o73ozlayfjwwpli6wo4l7x6yqwii1sxx0vhtosamg',
                flowComponent: 'evc29au9j1cl4bxinywou66pxg1dm1vhff85dgnexrqhz11sks6ma942dp7x8uy8v9wi9tagcbi0y5toyri2ic4l2q7g18sn4cl0kg1hjzxis2pnz5v8l3hukwn4hlnuh5amudcdmhw6qoep4ch4fb59d6qmwrle',
                flowInterfaceName: 'jq0cqw06ml906jmw086rh1pusqpua9htqod939py1eivdke6n6dci3k2tihq7n8mlrjq4pj9pc1wri7mcmmz1b3djn02isqmwuyp8vcjtuvce3q3si0sbvmz718z19ziyp5f1uy6cs8u8osx86qyaveqxgagvnrp',
                flowInterfaceNamespace: 'dj3d48ilnrrsfth04wttctt6y3wvmyy9h88jyhpk0wz5av6v0mmcz3v71qvnukf6b72nzpu0wiielv5lk9lp4ma04ad1wez8yh6xqqawg99iuabbfta7tqddgtktvj8yl6ydz1spmmxhgcg21islw4e272q4y0p8',
                version: '7x6m7fnfcb7c7l01e7jv',
                adapterType: 'ntkzbv6vt24bnbdkxd6yo9h3mf7470taoryw868a6ih2hhx9h3yu6qne7m1h',
                direction: null,
                transportProtocol: 'hny5e10v41tny75x4q3zx5n5sjyjhvme03wm6r3o8k069cidmrbzyr3veem1',
                messageProtocol: '25exrpwlrbdbmwn9dnksrwcp72jrutjoc4b3twci05dqvj8x7j8m770yhnqq',
                adapterEngineName: 'hkmwj934xf5hfmezw8aej03llptn0y2zo0iy9hknhk8qdxx1cv5sa3mabj6i5iustj7ykg2wqrdo7glagu1fvvx828b5n7bx3txda8chbneq192bcfcobmcjrr1tui3ztwuw7bxh2ur4vt0dbh9k1v5h8722t6vg',
                url: '4yclb86cvgxmnz52g066owj18uspcdcr1q3qmdzint1bo1bo4kzoa2amtseucc4yvft74i7cmhlzcp5tngaz79wdrtsuyfd8uqn5awa4j520a6e1iy6cpre0a8tc3teqcgnz2y9vdp5x0rxot771qai7p36i8o2mit0zsplvd2f09u18gn3k5v80trswrqvpnubc6io5yjh9hzs7va5qe9oad4m0axryzjwmyy6lywab5pn0n1449o3cvwmlvc5wmvxz7i1khbzfrs9qyrxh5wvpvj7jo7ylcn99g8jc7r4fwhx5hx8u4q6fd8323ka2',
                username: 'mka5genxyppc4pplvilp9xjld5ifdlumpo8a4fvudofbkxl0289yobkwmycr',
                remoteHost: 'b4399wjmcyb471848itgzy6db72t3suma760ekmai4aelyby8p487295g7sg5zozwcb16bn2yklze6lsne0ggsrs3me4yxxbi23wonsxzeuywne9u08wp5otphoeikflinzpmc535rffn7aur7ycawjqoqwepqd2',
                remotePort: 9226693113,
                directory: '8stwzxk10sh3sngxms7g32il0kl3i0zyrflluubh90lqy8nd803jpbkgnluyt8x3y0ixd9sd3j27u6i6hymbupuzijheldpl6g5xo7xqrji94kxznquqx2km5q7h9v2l675qjsuxn942kr6c2c9u6k17l1ixq22p4osyv49n1px2wsunld7p9hfhtej3ctjwknnugoyb643rqcbovsvpst6j5u0nvrgll03tm7nqgpcrf38vpa7pw53lju07lxyy04zbh5agle8rod47b6liqtm1pkalejadp5ztppc28y6qgrt1esxzzheleldbgeirsc783aef8e329h7xfveg7ur32r5okjt85sd9ujqg7z0fp24zoef3rx06w1j8pdpx0g88ffla2xg52nwh46q1x4oap453u95hb7ip6rkvr751x105zw8lk2ew5nw4ikqzn9y2za3u6pdjq2dwlihfh2slcul4jfsb1hox6iuelykwawhmjgs2pjvlnpw8eg8d3q9cqz9n4rbyrgc9r41vip1458qpvj3px63y9segy0iazguf0m6ehis1vm35pzmea1djk4uhocue9oh5a53c2qyp6pbo0x03hupgc6ww4qjqa6n6eyhakenygh6i8xr1qb32pje89sewsrw8zen4dfa7gyv7uzinkj4fqaaczzt69cciaja64iu4g5glb417v2ad00q4vyia9u4bfh6cvfz7qe071g0bfmkcprlgr01jjfieodjrga6ddratxj2r44vc5k7yilvcvma4wg9u43urx7r5i4020krybovsy9zbwwchhu7gifx3d8911788wbkdbsiiqkjyn1s20i1sj1loy0uwggebhdkg649vpdg47gl40yyje85736664ylfq4xst0x5xgr2mi0dyg9t6bo6n12r0wzmevg2410tleebby6hs9nzgybyiifw0eoykq41bysnk9k3ophwfnl2rsoi5pt92urn5qsxh6u23gbyclkjzxu7mc1w71l9ysm9',
                fileSchema: '1s0uv56aknj8mhxe5r80qctf7idaolrxhc441irp0292ne23rkr48oyiy2xitygi5dc0npzp946t0f8yyvd3vev13sgeauiz9ymm319ms79kusdhwkvcbh3yvmiaxofn0x7g75jgqyma5lyqc2rzd6txwsbi4sfycjpicliabtgzh8u0miwozyhedyv0t2a2mfwcgew8k7tat3um76wj8g52ww2w4momg9yqe8n4j8iyc2otoaw0wij4ytxy6dlot6kx2cnarqrt4kc379k4qg9nvfk9bq6kqm0ioinlzqri2f7ae2hwdsd1b37qhtcfdoizlkqe75nfdq1363sukjxrdxqrc2kgjpxzs1oc0jamhalvaehel2vhbzlao62be7hc7oyvryntefuqmod774vl7xpp3i980x6t1ndyhhlek6mt3ijoyl15zams5x0mko0cbrti746qkdy66kqtxfcc7mi3nwe9fakiekwqhgq8nxn2nd6icr2h8k9x0ikfp1037kzgd95ri3w4bhzdr4kl4oioe8qzygh103piu84zefxp35w0hkjucq99v0fogvcoo29bdrmojucdsp89g0u4r0d1hay5cpew20m9pcg94ztavqite3yhokc2gub9sdvjo8xs2yyh2hc5o52xclxigk7hjt50n125nigkyap68zfgfy1i8obtg5utuhuwge7022r0wg1bzpoce6q9zcu99jtjqrqkp69u1ms3grwp6pp9tredoacw6l3q7x9wg7w6srlkqmfciuhlfxbyd4xvxc9kl38si0e0lz1npii41er11m3kr7i6u6to1hdqtkbgcaw22qpvx6be710mconauc2j68355j3tcurbqab4ip4ug464uupt6vk21vaz3gv2qoz7snns7zcctg2hwnhbv08socpym6w3k2w1wqhvpaea2vo144s0f2hs7263fhtnknpxg9l6owmb6sisf6u5vskfb8wiufx2zxo25ff6jgvaitb3d2833y7eymql',
                proxyHost: '07l9u0pxwn0lhf9p26rltb33k9r5aq350hyqzuxwrisjxhtfnpesh68roqfh',
                proxyPort: 2775680228,
                destination: 'm8gxl48vuywvvxjfongachrogq0x8aziaah5gzxvyao2z0gyoynh08vbljndu3bbsqtbhbb65qfr86zmp19rl6o5hhyhdbjr9ngmi1cbjh52q7hc9jiz22nr4bsnrk7n7x59vqv5d3dyldf4070ig8v0r6rf1a3o',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '669u4dcvfehop2k3j7m5qe17yz2d9cxab5mq610e5ock8i3k8ckeuybrr1z7438q3o8g4rv7aq58u29lavvex9gq9m3xe9dvce8z9aez8bjfu11tkcn5gvidoioa6yjxvvb1839m9rzn1dux9xzhozlzd89mahsb',
                responsibleUserAccountName: 'b80u3epc41bd807zzrsc',
                lastChangeUserAccount: 'svm9nei5ya8q2xvmixy0',
                lastChangedAt: '2020-07-27 01:04:57',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirection must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDirection property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: 'egz8kjh3j7mwlhpdlpf9lh8y4iodsrvn4h92uuh3riy10rym9c',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: '5ubjrowixb7l23lsdx6z',
                party: 'c8wynhmcysi12jnegi6grg56rem8bsw47gu1ftwcwnh0j3yjyjn40io71pklmpsghc48nsfbrlov1whqeuzk45gsybumj3omw4z9l0p72h73kxb1tdfs5dtgovutz3nf4k2cnbu6zctisbl14p7irjorq7ux2z9s',
                component: 'l5sn3zhuun6qmympadx9bhzs53jygq8phil59nzhpvdta65f5v24lele7afn1ifeet7mwa7tbzzdbdq3ncj1izzel5s4onrow6hrdzxuxvgq33d7x77vsc1m316mor6a717ops9xrc2llvcdv4c0hlqkw04la9u4',
                name: 'nwww94svtmcte0jlbhx829k1faapr2wl0zcup35qcel0sie1k1b6qx383snrxf6i7iw26i945bno3b28ghuj2gta18spqvsa7tf97ikslyu4dudlngamwep44wjkmjzwz1u1bdtfr15vtcl09hsixspvsloz5d03',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'nfzowshwdud428lub2bq97yy8za2639dyj47ska36vk70q39mwa8h6c0m6ge9x3egeo56iub1rm4sgyqr91t4t061dhcmkwpyn6o765nlb2b4o8dzqk92epwuqregpohv1iikwkc84276wvj6vu82t1nazqxw0at',
                flowComponent: 'jplx8s4r8k2cxqjoum1mr5qts1840julgsmjzynomanp4yx1dg309kbyza9j8jjbe39ieawtnebyvov2ei93smnntxo4kjkqe4swvnczplwtbtfvpfjy8ceu2fk1gsprbuwhd18frysp12rilpnvj66fhgkez5gb',
                flowInterfaceName: 'dzuo0sinhfx5g56yer0pmhpy4ic1k6smee24gurzyjkp8pzzofx3fdaistpec250u5bu8xv9bfokx3immwyomqg00rahxd33gt02m6mr5qfu8zqxp1678culn0mjm4ybs78iryndin6zn7dev6z5asgxxr71upds',
                flowInterfaceNamespace: '01gihtt7hqn4p1sk006uiemp4m2n7rdt4drgk5zx3ij3ogm736l36vodr67qeufd2kzpucslgtksq3zcb4o1tscyp2i7f16hevjr3gy1ulvuqwxk01dq9qgxu0zm146hr0gajapoctk5eij2whfvergju07qj998',
                version: '9r45ejo0lbzsha1j0z5s',
                adapterType: 'a0swf43bx8rx25b616i279wz69lvvd7uypa4s861k0ao0fcw4o8ni8et3giw',
                
                transportProtocol: 'ocsx6agn16ysva46k1ubkpdrvmcrffi5lx21hgxvx88v4zrv1cnfp5j9xjn4',
                messageProtocol: 'vsn85tuod76hrzvw1kpwbom3s46ok4hgq0fgt1o5ms5w2hd2lu7d67gd64jh',
                adapterEngineName: 'irt25uns81n7lyhhp2hkiyv6g3v8v5hd60bzjzlmrzdgltl1np8yquw44nf5ec7uqn6mmewagi5ljujuvp19p1mpnbtiao7my0aux14iludgiu3bwtjy5ea0edm52t1gvlyb5yrxfn7jxc21i7poxdbm5w451ton',
                url: '8irxj5ydzpp5kvi62kc5o5g8lwn0ope54k9zc2i8nlxxuzx5kb48i9e3nv879lue5dsozy9p3rldoroijfd9l3t26i0fbjbvv9f9ars54efhoii1ack8nxoy6dmrky0p5jmrcjj0b3s6bb8bdtgo6zxi7dtn8l8rloqwjjlpec25r7wsq4wh6bbohq6h8hjb52ue2kwhhe726etbqh6xjk5920dpy3smwupiwyfgqtwaztlkkdn1w3vxogwcw5rh1qjz0nvm2f94ey3bhgq60j5d57a4w8gfc2hh9ys38zcpcl9doeu8112ebx5kgdd8',
                username: '8gre4a2mh1izzx2qq5qxw7776dm52o1m4oeyvpl1b4x9w2z61d7g76ajxjsu',
                remoteHost: 'z2oymhmkf4371jubww9u8p7gr5ymrmvjhl32lsduak7xpax65j1u07xfhuzwod7r47yer3ye8v7f9qstpmln61w9hrov7vymcgmn8ya0o0izblwy8it9daapq7w7dfwwc11m31bhj7un57xedj5e34f0g3g2r1od',
                remotePort: 2998780841,
                directory: 'cpfrd2uo6p2btqwb3uhiftdxgxix8n5i7yyp242hy1b8cwmfg71pws60037pgz6xs3feemltmtf88isnbni60r2ikfo84azh2n0jwtt98uvdzyaaj32g0zo3nsavwtgbu3vyx9kuy0apouabc831jwe7jqjxiok3g1yetqi5sqdb775x9hd355q972xj0d58ecpzeft63dkfnukupyl5u0qmj26rps6qsjm2ms6nt1c06hj8ti293ksyo2cv1ze11yk6ax5hesx3lvlfyc6bvawywxyofezae3578mvifwaswf92ghl65wqkyg6npfg28c9dtzcxmi4om8156dham2gay690sn5w5upj01zndbw0r0d9t9qywofdrpu787hv4zphcp17yyqqzlqkr2hl0j30efwb3ao9uh9xjrvx983cb2csnfcusj2lxfxafu0wv81p0pss62la0e36r1ggomtrrpmuglm2bve1i9m4y2c99ia7zuj5id8gw0xw26f9no0lu6zch2vrfdxaud53peqzfukko2fjnns3ppu9vxwvm3q961b0e2l8q1lbcxxz7thv7c71lmuf6n7sb9i1d08inexcmld7vj6fz6vudu4w1ybcxm5ms303axcc66vboghfpdzhtgrgjvubpzlx3dh04b7ntn53qy9kk74ibc3zdl3qgc54vob41tpxxuzkhlw9yvftuvalyhj5sb1cj6dnrpdf4psz8q76ugvxtdnkqn7zx280dmawqhv0l9l9qpojygsm7asisnepp3jb01iue2sz2tkn5mof4xc93i0xihllollms501xh3jlcrm6uhc5e68jht6s1ou9gj9ojfkqjx5wrdavesiflk2ci1udj0tyq7sb6nbg8yevfn09y0c2dxttvf5uvp04ukj8ewwsj7sxf0kau6bcjl39vwxoi88a0rzv0fxf9pp2yyoyhq67dtrvlip5rc83h53q6uuknlfk91lzhy7mjtnz4piux7xinln1uimrdjv86ce',
                fileSchema: 'rmn8si70wn74t1zb4txe7rnq7dwys7umh7h84nkbctyzzeaisa6ws1pya04ci1zws7ne5spgwya27ok6mruzpfetpx528uzhvk4zhyllk2jti4soa0dadllsyiqr4y7ormwvvndkzp3yjtudd4tih5w5wwv1aohgp8k1xg8obmrl1eygyp07b6m931wa2zgyty51xz1q62jfraqatgw2opv74lz3oxl84i14ijnzwiswzby4ku22jt5mautwes92nsrj9pf141w97jj4vi10sg503xxfl2l05n9dgvkgwczhn6gpw4xrrfyywzxg1uebs24yabkcqclmebbq8321q6yfb989msfs4lqzhodwgwkgr2cfzrn1ftkgaqdxg8rsvwf3rgeitpyjpe77jxmwb9lnhaz0fy75bz3qrkf9m20jo0maib1f58h8edhmntn5q1gsunf6vz3jx13rmn2nrmacuera58b9bl2x1x020fo067sedmcajmgpl5s1uwofpvzay45x4vq5w5jr447xwjskh2dajd0puomclzpkd74y5yf5t5f5otmud1t33asmkam6j9uwxte1kf24p36b2hqyquqvaokkrzusz2uvpu1ggzza37os1tn4wqphlqf4wdb2la3uz8m53ldyl8sjio3liacwy3k18k769x50aanicjup0xtex1wpvoww4kdm8jt1zdff4ccuumrn7kb1g8im4d1kwe9spxb67zmw3jvlpzfjlrs7qkl3b94aes4mvmnmopfvml59lh8t4tzmbxozla1l9iymg685fepxdidi6kv4sebnmmgg38lwle9dsk5ej4sej6o3o933bnffujn9k991marg461rbtaukkb8gh9wjsgis169uc6zhx9tl4ayi3ecj8dm8uosoz9phziic5dcyjqm6v8fs9adnfgtjwbbhkwbe5fzin109x6veru8i5sbxf572lzecy5jonvqb52nz234nxzp3pq515yr2trwp6ntkoyfy2obn16z',
                proxyHost: 'tw7rzdwx8wmw76f4wp30sd7ggp7pmomc9evlk2ocv18gj2y9ovztgknsp6r2',
                proxyPort: 7824653791,
                destination: 'oywyesvep3cftwduexrwsmy4vbjk1fgil2z08dfcb20szjs1r8lv1anvb6rob08817vtcnccqs4jk013bmlykmfri3hqvdab8w0bit4rg4pnhvh7jmvx9h24g2p6d3pg4pogfo9vafggfrcxeuphw8xp5lv117d5',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '5sw65x4d92unq8ujkor6fb9zw8xigm7oiqih9l88w2yirqzjiq565kq3goub176v36s3ejvevprhjwaiz950i4lwwkcj5s0jr35wenf4okjfnwg8o0ad8gp5y7tixwfhruobnzij13taszw9oez2n9lj7seeye1x',
                responsibleUserAccountName: 'o9rr5vuisnjeft5fayth',
                lastChangeUserAccount: 'ps2sw17jlflnwcuv3en5',
                lastChangedAt: '2020-07-27 04:41:01',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirection must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterStatus property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: 'eredrtongzgn7cw1vyjf8lq6m7pjxyw4y0g7vxwspe3pchvxks',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: 'u9bgp46rxssjsouby8fv',
                party: 'e0slgmck2mkrl9tojegd7mo3ssluydcwerzxbccolsv1cdd4c6v2cy5u7n0wjyjdorhly9z1p937y4mz95a220b22e34hx3674fdxj3sgoodvnr4zjbyhg8bt4msufbmwr7o5it4lxyc616i4bech6xlrvac31nu',
                component: 'wwlyuunx58cn7ba6x6yolkxe58zn8wmvnfnrpkjcs0mmyzst0868e7dob5pdkjik3y4koe4ny9qk6s6tjykksfk2t2frbis3g3b9yrtkrqt4pdhcn5z4fr5gf9zdgwcai8h0n9yi1jvzqz7j4b62vxciwl6zhofc',
                name: 'yfe5l45vunlfromsrwwjmfo57lie45wok2i5jpqr5wrmfqaamugc6phjecxbfs6a9r0tg2wq29v5qdcn4se72ks9ntrvwfk6ys6u3y2z0k1hizxp27kdvj3muruw5q9zzg7qqzhlmk8yq7agc6xfw9owica18g38',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'fhd1mg90burfwl0gi6g9xfs2h3p8x7pvtwkd12vnivy89jvqml76rfllqjoflxj045rk2a3no5o5pvkzbp98xsqpznl3nswnonayzvdzh293h1n5zpve4wlhqolkp1p30lzk5y61t6n25871ldz7qt6uenggwggr',
                flowComponent: 'iwmxrbluryjiyhq6l0q85d201fpuebmzp1frmh1pv4zv1f9e2fahl2llukggv0ncxj7v0l24qmembrrh5r1h7upypa8lp4yd7921z495zd8a1n2rvky2hitjroo6mufmg22m5snox9ozbf0s8jbkerzs8flu1y2p',
                flowInterfaceName: '0jg9jli9ad8fzidd5v07j1lafzfilqhqoycrpvyi8kxbqwi18m00cj1f656a75stn9dp5nvm2iguy8lvu1ztswe8se3efymgxkvmu0u5b1j3dho8timlpewspp835l3tkdkshicjgyufgji2n4zxvcs65k2bibpo',
                flowInterfaceNamespace: 'r0mjjw3w2ga14d34bja6qwr25r57sc6smewu4wserxgo2p41x5ytcabwifnzy7y4q68217jf8nhtrrtz693ou6a674wg2nyh399k7djubd0kjz2x9t1ootrm0fkcy6hgggjuti25tg1v10p506vw93z8qyhlzjsb',
                version: '8kbp337ileg38jgyheoy',
                adapterType: 'hddr516p7h3w3lxz1m0m3fgsr5ifeoc3yjc73c2psf4vevohzjnks7he2eb8',
                direction: 'SENDER',
                transportProtocol: 'qahz0zgzu2h4i7ni6ejqphziuaws58ou0cg9hx6eoquhziqi728k87u6g03z',
                messageProtocol: '3t6oy0j0tmowbqij09sx46x432893yfxzy45efjfgcxcdkzaja5caj6q7ihh',
                adapterEngineName: 'bbbjju4llo9ty5bmb001j58yqre6so3rrsc8vonct6o58a3gxod7cl2d6afjbaujvqp0zk8fw2ivi5emgfa1w2fo5hebm8t7ocohmxgkinurqmcij4kgg06t7ooirkqlas655bn537p8is632fp3l94jzw7o6bg0',
                url: 'oucj7t4eh8ahe3w84fb9gotdcpaoz06e8k7wlrd95k9q5fof8jem80yxkrtu46veoye3j4cjf0fl36l84ha1zi59rpg8kxa0arr84x9273u13nzzp9j8jc3o9gkjqaeaj30nbvvm4j2ms9ocgtpxlqrd9qxdatxehlciiq9yktu8lih19jnam4292r13cruejxsygz2t8rumr3nbc5cy81lo2m7n91o0zmgdbnb1gftb9gv1n7wb7qj632pok0j08p7i0hdeo5s09wcc1jf8laafqzr3f3q7lddl26lkdxb05kudr01ig8ld0iwce9ql',
                username: 'abdtomszyov66emo0r7541x8axbfne79v4f7uwmiiij7uwpibmvozojt0fcg',
                remoteHost: '2rbj5st8yl3g0uxbqprcmoiq7x16c6v2lkf7u56r16paqnhj50pfht3m0wi8legz95v1wmci7xzvfvc1imvb4hjhhytbpfs1ba2c7rwj7wpyw1vnzz4tls68abjuju8jkvc9t2nl3s2kwxocpij110o6516mkgx9',
                remotePort: 9945265971,
                directory: 'blve0d29trd5smgqwpfoj4djnrq7rggirn9y30pzppclgksm6s6cowt6v0161zugtzgwgwjz1avf3mwnmomh2ql5dqhpd1n2sblwg6x0en3ukt6rwfgdnl8173d6oi31vucmc8bz518ejl7fpte58wfa64zslbm5yzu523vnv6ps22ch0xccoicmz53xcvtcq3496dsis7yruj11csrdxvmvws3wssy7wmu89m6l5e0ucqns9plv628pasf9zsrddjfrt2gmsslsd7xplcxfhbod6a4rm6o81h5bqkl9bv02g6m2d3cm1yuoa14ip9go4qnryy4pu02u91rwyjfm6q1isg5l9pt6azfwcb2gooqmqodnm0ef5ew7ycoltvrviqeleg0je57d1ji1sw8det3hfiaff4pl53le4gxpqvtnbldphdtmah6zv69gqead16cj22fmt35nff5akk44ia5p7c55g5wopf78kjpwsq106b8xiflwl3t1os2u2n1oc7brb1i9udxnfq23fdjlhxhmtzj0jrab10378ytnisismfua1hwzhesmysrqhh8l20958p97rjflzchx54n8i56cls4sydiw8hod4bgmy4gycm3zrojevbz1n1up6pc71uxbg7e14dp0n1vuf1uetpoidxcog422pvpg4tc53rj5ddliwlraqgw9hqd27j8i3kvcx5qjbtnuz934pe8q2dke9hsxccn702k481ig5go2fs12tel5sklx4fb4m4mdpwdf612sgbfapb81mluljrfmlyjbyrl3weglnxgn8rzrw8y9m66tcz5m8bawklt0r0exu7prf7ub2q56uajm2sw9l2rtsos5apf3nlsm4oln1ccr29qo9hz33g37hq0tusi5w2jx3joiig3vtjf70vyf84lk70ry13hws8bvsc6x9n07drryinvjuekigoi11ve2xz11is760zeoq5qpnqwhazlwc2di453mr33i7dmhugd7fj0zmmcddbwxd0vj',
                fileSchema: '6y5zu106cv6hytjkyh1aqyd4yu5v72i0x1mepm9vim0rkoeh6g4ng0oujq082wt9o22w7chwtxqewltwegj580p40skuedmqlno6ms1cgs955ef87ovkn6rj74dynjxxac9zkqjgf375azecxusy0gfpk2s8u8m9pe0eoev72lrnot7j5v2agvuydr2n0dd2xz39ghsw57f14nro4xhnodjftt9cuot2jrmls2gitvkekcrw7pe3616gcbu8ghpve6de2d68gscz2knnwaizharodfdkxym5ai6py1b9ym7wvmc61pi1awgmi2sfgjoad4lj2o05kdst02qrxih4tgt9wkp300h3lmat3f3u3u7w01q03pn44eheuolxq0b9u5sbv8hxv45uwzlyay69hnzbnkgbun5cnsd4sfdrfryi296gk154cqit5i7eta477wt0buoa92afn7jpckyh8k6anoriqf33765vnkruwrh8okhmpx46gzcu4fqwbgusn9e0ahlmnyg5j6ufwnfx1100b3d3mgiz4it747cl3830z3fa8en9lu0p5a3xwwnisdydig7jbboovfnem64yny739vb430j4firfmvo4rnq2phhtgykxcbddnse0noyjbvqay8emei3omjiyvg7v1kqycr1iv2a7rtca7ndy36bkfnyaya5w6fuk9euy77m4bcdpun96jm2rj8dmffp5eqxp90x02zmaqv9o7wy3r37qcl5lr6yfjogb5e4h700w87k920ulq8bfzet3izjtarr57145yokqiwbt7c32mnadurndynyd3u1i4zc000hvfiyn8du8cduiw1no9vokkso8t8jv8rrub12y2b0m5vg9hag31i5nenx2tdzlwlg63lv32d4sx1j9yf8j99j3zvap3ci0aik6e2broi7jlu1n9c5mk7l9clrmgs46051tucrhuof1e827weial6mfjmjvc2hu23ufbk0hl6hez8dslmcl76hp4ljr793k4q5y',
                proxyHost: 'wvhnwbw2ows4ru0qldjvjiqs2xy4baksjmb01l7vlhi9xwb7evxpapr7ufqp',
                proxyPort: 3041763380,
                destination: 'h9vp7rzq1s0mxzmlpc0o217hxm6t2kgu4q0d3f5go3urs013gzw4m1gdnpanvt2nz2hcc5nmbd6v4bhq1f28jlrya3g5d0xtf8dcuzpbdsjxk4yueq3n2fov3bo577y4acotl2h10fs2y0gg7ag8sd1028j9wcl9',
                adapterStatus: null,
                softwareComponentName: 'jwc8uw0ikfhjbubl3dx8zas19a9lisetrlpuczxje294c1uhljk8tvlgie4m5ac96nrs2k4tfy7vig944b065wgrx2cgxhxqbnboiep42ewk9mh3ybkunis4zrtlfycug7ctgzr3tx7ljf8h19cym7ws0sdkqhrv',
                responsibleUserAccountName: 'm5sjre0hqeccwujywqkg',
                lastChangeUserAccount: 'eugd6252leyidzdpau3p',
                lastChangedAt: '2020-07-27 10:19:15',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterStatus must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterStatus property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: '5cuysvhmlfhhvfo9bu6lvpwcmv2ekt11sjx4uclvkg49aveyea',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: 'qz1eku51ffjlzjdt9xko',
                party: 'q57qgirhw81cfknfpyv4pc9gbf8kxkxkhgkjh22ky9s99lk18610huiknwkxm1i8xc9z5wea362uniy835zq0ia2epvkr4p28jb6t0g3hcbzmp9ua5r34ma0koiv0ywdvsa031ggm2jxdbpeockslrimlu6ufx6n',
                component: 'frw5blsmk2m6xyfmo017fu74gtm1uk6wmdp9p2c3u5yshy02ti1ldf508p4zm907dij50rz7khwm5xr3q7vvlh4no58ec1k9dy8ixa4nkv77drjibqs3nddy627dknpw0n6ytls4h4t0x5ojq8rnae8icbw6pxcc',
                name: 'ewp34x4pbvmpzh8kegyd5qzvbgnwb58neter57sikyuy24kn74w199vd5j2uyzgltcraraq0en5z6af7d9eyzrb0pcvdqkboyj6wzjqw2dym6elanfs49hnxtbsg5rx9t3alsx7s221p13x1skezr10j3f05a2lr',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'srqlv9juyzorugo8mli94wkabb2o88v3vxfawimwxfw95nz95ohe7iigpain0kmr0tbhgsue36hw64nn7lohu12vhhcurq3saenujigffht1l18eltkittdb1lrttyb39hekt0gaa47f06bhji6ehis56pwoeuvc',
                flowComponent: 'oa36simsnpk2o9ytmjpqzshfy4wyqbx16rcukizgd5jocdxkoukbpvmpuhfr9q2ainfikgt105w3rxqqq0bds2kh6gtqilhoxzz03sa0y50ppjfij4nlu5paq2zwp1tbo3g1wk4w02kkv5kgrym4y191w7i9jssv',
                flowInterfaceName: 'jrmfdfguqvhgxlr7vqdrnqs54t3vh542mwnamil6iinm6qmzj7cp7nu23g7c68omtfra8isujplihylir694f0ui231uqameno2okfoytngzhjgqx4t1q6xqwsx3gnzpiq5hvc9pxli1mwzdqg9tqz2h1xwfbv64',
                flowInterfaceNamespace: '0r8bhzrqva5ztoynt15ya8ljwgc23e8g89b10fnoemy8iq21zbr0mszbrpo74yxhe1eudr93y7kct6v7fj7d4ogbpbwlzak1pcx5ir14c2vvprqv39wusc0m8wqmr49vtzdmydkdnv77wntiow07kz1l2poawt08',
                version: 'fgib5t8q423kyd2iqqjv',
                adapterType: '0xr60teab9ojg48nabrjaji2622i0g8um5p3t84koybeb987mi9mrtagqs2a',
                direction: 'RECEIVER',
                transportProtocol: '3o0oc3og8mvwvnavrtot3c5owvj530ipmhvaokz40x3qrs5tetc6vpa2gln5',
                messageProtocol: 'stikxwmmv61x4wufjdfsdi1m6hazw4gcqvrkxr3j8gfwv8eh3sseaaf6rwuq',
                adapterEngineName: 'zk7sgc2atycmelri1imjrezyeanxqvce8jh837onyxilogmq41f1am6z0ysruskliilviuvz2r8lfgt53er5kzw3veigjdbb3vb2egydqfbztyjb5u1272kld1uihqgvmfyrlewevpc24wj37mjmzqydh3ppbnjx',
                url: 'mq0rmde7afl68dms53kt3bwmkzve6r0gchcysg28thon4gkiktnlac9cm4rttx959mtp2eqdiigtlppobejlshkuaupnvd4q3wh0bycnc5yahtvbp9sizxh4x7oglwmc19wsphccmh7dps3brrm0nzv7tltj0j90d4eui5hqlm2xl3vwxfo47b1jkj55pubz2eb4jm229kh7ds5vcax2emx8z4dnlm6xptbtyiblt7t3loiz9ol5laf2v4nu548l3n7fb9ltodhal9zsak6k15o3c9gehmkxsq4x8c917u2wbp2o1iah5gub24v8tufr',
                username: 'jtudhozjx4r9v3tz1zkh2mtppzun9e20a0emg3hhtf2huj8cerqeo4qo1oar',
                remoteHost: 'zqk68q5jufjpqa6rds11xyzmbbr2s9a3utsc1flsdr8fzfdkeilfhdhqb9pai37zho2vlvi2ltfu1qbzwyht7bctiic9dgmyplhtna8f64c27drsxhcsdyrxleib8hrztbfaju71yxrby7m73ph1qlq0l6h50fi1',
                remotePort: 9405762067,
                directory: '3ilw7akht1qrv8a71qhuza77u6zqizpshg15h7wadgpaasz42k4vl8be0hz4zr9hmbzn6o57ydmwzirw7b1b2ttee15p7eyixyds0uk4r1kfgxcmb24yssq5zogyfwzfyl4w2rfggz05elnst6ero2eee6y6yuciuygkxolahdlnhdbwxgk4f5ijp5npm5uk8aakniqathnbo9ctgxwagoilphjce6fc69z72q23y0hd91gqsh1717vtotgkzh54kdtofbgd52zviu4ct1t4q0mdputkcvl79xj08nj6fwaxy44wo5odnk35f6539ov38yrcdm449nzhe3fmt4tojr6zcqage2sg3zgzt2my1zz00plblhqut6xuzmchz31t5mfqps4o4ylpnl1usxrpgx0i8dmhqhofzy6ilfnp8p2hn27zanbbds8bkrbrch7hy3bolhdsz384prrmeje5nd2tu4lnf173luvb7aqnyoe0nph1rnyblzowjxafjrql77ra34zzkbov5o5qmxwldxgtu7f14ttdm13sm84p8mna4dfpuvvogqwwj6axamztingkc7v9de4a41nvfet8rvmepvwu6rc6hk508kcv28brndoa7f8rytryorpxpfyylferhg2ahwh2vrz77dsiqhw78hunbc3e5yloj0u03sxiq02p8b8svu27ukzg7pc26tbqax7ivbv3blhjqbxcdt2oaoyr83vfhvr6xr87or4qb1jfe27bci92x3ig66p1pe9gp25guq74p8h7e5nkwn69vxiva5wzpnw10d3kx1gdm1bijvfw8rksl6p9ja3w2g32spgay0dw260pfac6yf994lwtnpsbplofd6nuofb1x87ioz2k74ub8n8hmqbvnsgbnnh6plk1tcmzzoedppypgxf9obb9j5erzhmut5cv3u5vhs3d5p66fq5yy1pwnf9zxr4z50501q4rg9brtg0ttehigsjtmf50n07yiioxo4fgintps415e4k1ki3p',
                fileSchema: '6m0rknfv2by95315mo1hhcna7iy1zi3x4s22rzz8cp5836i2tmmnilmbvc835rnfrs83vz40vyaauvm55rtovan81k6uvudd2wal8isziwnopuydofglxr6uhrehqkwhl2b6gvgfybv5zjm8qcd5hnwto8ps5eu6bgqyv2llkiaels1y9qf7191024pc38rqjssh0gi8wl841u9rsarmuel0pyijuxf72kzxhxyws1vh9uobu8lc10mb6twgx5yhqn5t6x6paq0y35q2pju4xj5fodr712h6nke9fxlgejvj23kv7a2m3bznt718uroc5yy4a5mcbb3hdadkszd8eojucx24lq7ieyvayf3b5g6abobfhj1bddf0sizzmkfkcghfrw403osqbxk625olminn39yglzs0ibukbgqwiu53do1efcfzc6zi5hi6mosw96e5wjfj1gdsc8pquop39tlvyo6m4vu0boaejx8ccsje2qg6r2ppw67600ticeu521jviqls489v1bviwat8s0dpmz8iozhxpeb3y8j5cuv3h5672mh9xt689zmw5x3jozg44add0ch3o281zg56u0omxhrn5iquu77rat97n9e3w4k3w3i0ew2ggxqxup8l2g54qvfhsqrsq66tsnqifh8n98t7859pqrb6ugax9z7nayvygcyln0urd2qxdponmuo7xeimdco68kfy6bdzhcqnr8nf4v96bayqlf2s3htksdmhtvu20whp0xsotzslkrkxsmsobig2a3v44al0kzch1ar6brmsav5km1igh6trwb2wehkiadyxbyeie0bdsx3zgn1w9luczrnp509octf2wquxi443e7zaw7nbb212vdjyceccx1yl33wn4ldru5seu0yizswvcrwoff6qoqgofk8qi9fvi20cwldd9mrdib6prm7ps6a2b4ybmddtlfz38hekvxd9hdxjmpxwxtxq7c9vjbpy3chsuk4lm22ohxvrr8rn57n2hunagst2',
                proxyHost: 'wc6ipn4zlxno6ljahsovof2twbma54mkat977l8l7vuwpbi81pxc0c88tt9i',
                proxyPort: 5005298222,
                destination: '7xyd4qdnqxndwl1r43lgltscxj751me8yv1umrsl8doybwpwegczduv1w5fldhvln18ohq25ffa9ct1pyn3n361amc8cdwlr1dnelbax4b9svkzfocw90ybay5nvfbcho4w6ybj2kfgnhc1fshq0gezqs0tql4mr',
                
                softwareComponentName: 'sbraqm1bm3pqqkx7bst469qy42bn9axp7yey5qf97ibw082h1t7zq1tqftr40ii606mycf2y9xxxjudekpeei31tew4j1ffw4m3g2qp7nze2264m7sf3g568x1c177o54km2lzdsgnbw4aj1j1hbig3rby8o5q8i',
                responsibleUserAccountName: 'cb5b04ya1i43ssq9763e',
                lastChangeUserAccount: 'k56r0xy9zuetvziny2ja',
                lastChangedAt: '2020-07-27 04:45:14',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterStatus must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'wqldvx394n9ak7qsgg2orbz5gv49cb582ux9m',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: 'tbnfmdjsfbovyn0cmwfx6hqstlbk0f8fs1i3arkzg41gnmt34m',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: '489nuog812z1a1nceh9o',
                party: 'wsd2wf1nwbsspahb4701ywgoiif0dl5n84dvucrur1sku4gs2zqw05j7gsaukx9xsddeadtjym8uvp527ffanr14vl3c1z3nvvyk0uuj7ckuxkz2xxvmrkg0ua9wlplp3661yp7i2oyhwbt33x9f4ejlqlmohjlt',
                component: 'mafhmbpgfadi4rrew377f1f5hjz65fx7kfn34nzoa77t8dpqd9yi89f0bnt6pzvz5trbk2q9fnigsv9rfpsu8k9z6m8ql1vg463xadfw9mmehilupvo7jm2fom49l11vt1bopr5szyoa1jsiws8h9zaem4swpqoy',
                name: 'rr9n475l54n09exqfkmo6rdihqlu61nl6379qiu44kmyts66yx01c118d82f3306vgbv8abhcnihbks7s3reb2p4uhypsw0gwuycudn1kzgc2gq40zdiaflzfgqrqh9c9c8uwv3p1xdff2bc2kfbwt4p7eiek9oq',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: '2pyb3yqiv2ybhn5j0bge2y3u1o6w899hgdqivr6tgfkgkrq691phsni5gl5o98gxrwo1snzpraqwfst36jtof6wnaevljq2wbuyh5v67yjg8lzg484e6a8oz4ynuz9819i0jq9cuzjl0lpnapf7anoi38cvswflc',
                flowComponent: 'pa09nklgko5z7vvm5loyl5zi05isur1lin8xvfz5sxz4mljqg32f9y0umf5aujmfqt2ap7xkm5j7iwa9hcr4lfylopjvg0hfx95j4smg5t0oul844eozxscpnsl03ntknrsekoyvk2hpfyfbhwhsj6mknqxoxckf',
                flowInterfaceName: 'thwyhbwwn2k0k51md382d3ng1oqnzp76lejgzcv911nnc17jff8hul7lp6jgcmc4btzcyi2uysk33iks53kh8dgsu9ao8lrm0altaked6ypxhesdkba2x7hkq59m39my1vpijveaydammt38fiukxe8knmnt7ht3',
                flowInterfaceNamespace: 'xau11rb2ch5s7j7tyxjusb17jorx59mxnaxm3nhpphv2biougmjle602oavab6g3c08t0b82voq701l52ljn6d2igg846ap4w0lp38zrap3q2rxfxvvltu0og9dpea4hbff0x5eno2vcxpvu3a42zgp8u38wwlkp',
                version: 'ar5gx5jn9ezykqok93v7',
                adapterType: '95wl36u605mrjpzqwk6dxv786lcn5p9pv09nb5z87roilb2rllk30aleexqf',
                direction: 'SENDER',
                transportProtocol: 'sf3krkaf3apuuvsfxjg2qmoqmwli5un2y1lunhbfi7v6icsdqepfzy9yqlnj',
                messageProtocol: 'tbu9gb00p7dnrxojiu0w4yhhrhfyarygah88kpa72dqltcuigv1jvap2u6so',
                adapterEngineName: 'jogq16ggcykbrd5kbzey3nkhme5quv47gvaom8m946e6deyythqwq0u3gdv818iesvdkac58s4jdoflm5426tnl9l8voninj6nl3300tamq5p1v7cvpgmy7s5wbca6k1qlucv10kdu46o2exphgmedyeknkvaxrw',
                url: 'yzb78jbc1g9eabu4ax2u525g85wbyiuntv8cqyrvcnclqd696zndw0y3dy6azyx0jsmwk68kymekk8kf4jq381uf6s25rzlkgeu2q0cxjgthvigg2l2tcshrarsi398a49w8qa3raj9ocjvovrzv13otc4n4cyux7qtn3c2iwem2sz63uhysgbftn0neof7iihbqofswcdyzd7pvoncoojqbwi4ekohslugz5gi27baj9z02vzgtdcxi4oxh45qz3fph2kq5y8hsb8dfg250b4npzd4d3zmmygu1w5uc4v7b3t22wr4wcr2zkbiv2te7',
                username: '3ap9g86n27n7lhhczr0ac0zpnvu2fecf7a4vbhoj84k7lt5bsh51nsa4gytm',
                remoteHost: '6q2qhn36bt8q7d603yoqo1vgw0l215mkfmtjzq1mweq0bwzm1t3ghjac7gviusxjbtpsnkbzvb4wnkwc3a0bniab4homr7zh6kdmm9fiy6t9wh5slq3t8klzbxdfrhzwu62c17iemmi7p17uqcgqpsqpbnxk8sf5',
                remotePort: 9900753807,
                directory: 'q5ybgu18im79jyjfqm5b1bv0un8tcqq2n9gvphpvlco8kd1pffjqyjtquirp1p2w9fjybge1i91w4f70hguyu10s5gk2fbz4opvgcymkzyh9euqfij5pmm174c35zx0m7kq983y8fiev3o4cwgo60fn3v9u9vdezf9snxcjl53d0wzvrpq10s9cewx7mhgi14bkap53jc7ierbsq5r77n2eixa4hi5ol1gu98tbij7i9bsif5dyoa1fhvuo04ujfuu9n0q301irs6q7987vt5vzpzji21eea6rzcf95yumgxezix5bxt64z87iefah8m626v61r97gaammvabzta9aawzmabx8hwurrzsr1nwe2gj5oshzx2ypyx1bgebq4yjy8zmlk16r3mdrjoyw1hqc4xxb3gwqlc3hecgylr6569i095t9j8496rwnmpvuj252rde02zrcxsamkjstuf5apmbx6p43bhxqhppuzerajk58uu54mhg1asz42mh4jiyj8n18nlghc0vgu68ooz9mjhatjhegcv6w5givai2kb994l0sdieyq9f3b1uhcwj9ipyvi1klb5toynni4axdquivg54dqvja49jes18gmtz4kuiyjz0l27vsx49jof9akasf6dgzig700tunx7n0ie62gngasd7ay0ulnv3hi8y3hfb8gse1o5ol2cnawbgnpq8ri4f745lmetmx9l9vnkdmf1pxdyhcl8k9bnv2w9spsqikyo06i20dovgvh4nq24h76n7xqvjxj21tradtkfmm4ztlvnl9xlii1z9h916ip4p6k0qzpcdml56sm5z4lc5i4p2bk2dhtyeuthhgdscm2yogzvss7t8vd1uguvtvghuovmtwsc36hcjt45vj3y16r038fh7fkfy0ae03qckev9wu1wuftyojjqav95zvgcbvtmvtjd9y6av5fxz4q4ra6eaz794tetwymfwyh2nejj8vx6bunbrrnw21viwt5pwoux2gsgukmruf4u8',
                fileSchema: '5kx979jn3xx4vm6tcv7bmkksk1nsj30uex3qxmeixfqsyukwglqynybz7sbep1ry54ly004zgglmo3yl7jmx6w221smr1oula8eymn31ws7u5rz0wvrpkp14am1wqf38s4pn8hcrktdajq1z4lbvm498b779g9977ginybx1b4k0vhm5vqn0danxuudgkrvpudato5h57sb5di7w329q81fq0aqsy3wlsei93au0oh44lpdhtsuw6g4u1fc3ruigbxxfoju00xm40yj85garbhff1eceoqke13yx82hbea1lz94j2uggwditzm3kfew75mms58lu7rio7102c97zt60gt7mrlu9wdznlnqyvuui26wl0qy3ixpkuduxjqgczbelfqrckpebho5rayqec79mani21n4f38n0h9zeg7ya7cslr1yjjv95lett0vcukj5gkozj3163kpzsjoj2pzc0idsrajbsgra2hekb4eba75e7cdn0mea06i7po23jt81te5g48fpsy8aruor57hh1tnlo0fqy939udykj75sgitig8cxz3lzi25au9amg6e9kcwpy2g7oxll5rsxl6i3v5xbrez2gntemdkhvf1ed8377ixh6yjqblsjdrblmgtx4jsd20so9a6vv75of36zfm4nafftjrrgzkqmfpoqgx78ga5s6kfbfjlm3bb0fj2czag2mdebgoe6zfzkjvkijz0jgy5xoz5vae1wue2pukm6ds5wj27kqnue4h68om3diulrhgsguk6l73q8gfyv5bvfwpt4etpq5sw1e4uudiwn6p9idc73jqdeu84t51e4l0r51hr1fiiumc8lk1g4b3jzhl0i8fcgro6ddqg9k2gi5huuk7hstp0akt9bmodftlu52zotetekynky6pqsv8qwje8o9mo3cq965bfxensa7c6w2ja196cbqj30n2dgp9sp0gtbme9w6skdbypay3233fpjbega31gv5d214pkmy3kx29rnr6njbqw1do',
                proxyHost: 's34jaqq0izilew1facmh97zionv74590o05aqbi4s8dxobvhbabb4urj1hhs',
                proxyPort: 7747800704,
                destination: '3wjbvobrj2ceccoylklzpr3omokvegb094gu2bngr7m1us0wku57rhx8pe6c4ehrcd0l84ebzy82gtw1ozd1na6aqb27n09r2dlj4xewekg29iwpq5mgw8ip38sy1ei26m0bd5frdngz2mt6e8qaswf48vwjj3pu',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'w9pco9s5ud3m925thcneyrmwrfksgkk3btykhzem5tlj9y143rio5gj4zjskeqdbga7dq8xqs2xou01rs0570crkpvj516nv5af6dzivb9ae810jxava0lvwvivonym9tuq8cqx2je0ei7ao56vymzv2v7v3d593',
                responsibleUserAccountName: 'guwhxy66thfs8fbonztn',
                lastChangeUserAccount: 'qymgqi0jiz7fmj3kazjw',
                lastChangedAt: '2020-07-27 22:52:41',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: 'docrn083tl1qufiew3c7zwtdx42nu780hcmjz',
                tenantCode: 'jhw333m9jiz24brbh32c4wweripwbsig4xybtbni3dhjn9u0sy',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: '3n4nbd8zmevnr7qgyigg',
                party: 'zod087zdi0wd1tixqg7d2zv8gsjhp86mbj4cyqfpwq8lg58anb6558aeh5s6ug7m8903x66e4k3bkqd0sdlmbhgpshh91d401d2a2l6zomdozimf3puimckp0qjgpfr63tfdkt3750jrb39q263niypi4ejm89kd',
                component: 'wijxf8tyo9l9gh2hyjui90clilqau6563wxgi49nxabs8x2fktejgc7djebkln1n2hv6jc7ggg2q4ecjep2upr18xk29l26efz8jdggkml1dmtoc86plzeu6c7rw4ybgs2y4ztknbulrll7hlwmb3kapd42qd6cl',
                name: 'iq4lnfidouvf5irrv0pxpfomfk59pinbmqpju97egcawznl2phwosqhbt6fcnazw3y9hlk5jmzcascxjx390i54jjhjh9amwbz7tp3i04tsuoqcv1i0c4ylcrkwxt7rl9vkzmbrvy1o6ifjfggjjg6lagwcb8xcf',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'zedfpyk5gvegbvujvk7yddlsjs4hav6p0eq0eecuxu28j59ji1w48vn2o2oq3ks1sgrmtfazoh516ac7gj4nxpxzdsnv77s0gb97413r53jndrrnlnakjyaoorh5ci8zova1jvdfzyborbmgi9prpurl6ra9lyfb',
                flowComponent: 'omt2clzudgf3vqfhnmoazixzzmwa68bow1yw2ry0ldgmg4xu2ega6ht9p6z1jtcjhycs3dfokpfl6ftby0folsr44j2gckq2f4amu8gkk9xzn3vjtiz3ur4gesd8sg08yt9oombf3uq7tiwjjdymv8qlxp3n5t26',
                flowInterfaceName: 'kzldkyi46skji4d9ptlpq34j4miaun4tbagt5yrsiebxrj3lg7dzyeep5qoa1l7610tu0yeuivnlgovsy65qveja45v925ekerk2bnvwxe286vzrdf6ej1fc8mf1qybazwgqcdwd6d29ljy51kq1maq249px24u3',
                flowInterfaceNamespace: 'xqzrfmeue8rm0h8204mtmwpl1nsv6j7uf0ec883y3tc1rw8hqxk4uy5n2k740tef3pgohkvur96zlklagid3pnr2x8g88jjgknx9so4k45y20akqeo2bg4qtm8mwd1kzfpit5r9ktzrsubtij0396bd8bx7sdgy8',
                version: '80ecpzll3tywei00v09c',
                adapterType: 'ecl7aonsbjdqs3b1d7hi6sw2rckx0rj1yvpuaunzptyjcryrqdeelw9197bu',
                direction: 'RECEIVER',
                transportProtocol: 'z7se5c2zl1y0yyzlp9iz7o6bo46hfewu3devc8dl4ispynelladialox5xt5',
                messageProtocol: '5burc59m6nctgq14j5huz5ebqfx4uqc5drfk3nk9tyl7zjcxcudtmru38jd6',
                adapterEngineName: 'did1rh93r9jlryj2pcd1i51kv8eybagigxj4zpyu1206qdcut1pqcoiv0mq8n9envb32dz51ttzhf6evagrxezh2w06x2wbfvj31tkkesq20bzl13pqfkkv92cx4ucjkxjxrp80e7x00mzvbct3tz1vy2b79z4gv',
                url: 'zsvral7e81j3a7d9o4sqd0zcooymvbgny1wt8auc51ycsdcxr5cck59ichhiywpp9hlme4efpz0267boaisaznx0d8vchedew7dkg9o52luytowjknlbamjqbn7943k9tkgkryx4kmi0ahs6gscbz33ko38po5x3g1kufodm57i2ql54waovncs2m0daecugforj77dq4cfiu9tcyq2854wasey63p8k4w4x729ijxojsi5ceaafodomg8jpl4a9d8xd111fw97uhallcuh2lsh9i1boj3w5pdk0ftisajnhtybks4eq5y02qu3xia7q',
                username: 'k5arhucwj5pynyw9tuhp0nffprlaq0aqgo3yrbp9n001shwr2s4eefgspgzy',
                remoteHost: 'i81pqdztt7agjpd6mddos4dw9f7cbbr6e9m5uzcll6hkzmgqt1w0wci9okti0fqw2wcsvo45fpvryvqg4ha0d436m2yqziek3cgq36wfpt392tjjycd32u43nijguei4stqh7r71f28lfcxvxj89sx84dfhscwfu',
                remotePort: 6329018080,
                directory: 'qvcivp8tdoq2f7psw0u5akypopnudwuvxdj9wrzbffjjnwo3r14z4w0cgb2eqqoe3j7gblo76x24gyyo31q8mxdvu0vizz4k959nlug7t6bdazqzos71ymxl3xz6cx7eu65h0p0gxlvpljeoygag3hjupdxnfot5spj55pluxebz6mu2ep1595i9jv9jiy916bnbtfrgtc2webm5802g1gxnkte94j4520ih86750vwz7vdzri4l96og51qu6nl7u63nbhfzymj8xt81kl6lqaywjgyxxj50aprpf7p45twif5kbqsbpn8yuokdh16hjp2p9y7bmqrxoyqivpmdyn4wx5jekv8j6ail6ws8urvbh0xeq4frqgocjtcy5zv3mjxh7ujwhdgq2yuca0s61j7izgc3pz6f9ai1egcxmjs6zn84eooyqv0l22e38ufvaldgwmj90txlnzywyxugwcjr1zgu9girmnn9jfbugy46jhde493sadn5kwhn8hm46x69g9tq84stsb7klphra6m216ev7xhdgart7qm2oom9bpaqwfqbml8b5smpv7q7mt1z9xq01zvvgzl4n3132xb7pze91qdaqvnpthbfhrx069y7uxd487v1r09bxfjinmu0v3812ydpyg1b7a2kg17g9ma89qupvlvcc8vans2vbbpglpk8s8j2lrx1ge2sisgf9ju27m0a70wzvoktx697bfgt7o0b42p0w4quv04f67fsc03l7bs33h85rp00a31x2j1dcm95rghnhsw40hzd1poecfqlvod6aftu03sknwr4gefccw97c4djrqw1zijc1n5o1tnwq409h1kteqcz9ttdtaldlmuc2dj3qqialqulc0i4ffizlmyo8hzo92ptnyof4gh6tvfst5dxrc3lcdvqlx4j190xgjk0o6tjcdirdagbqs58yx20mcqhlmm851jmt533zy425jcedcfrqp1am7trwrgt21cdjixvkxv2htsu2ct9etjp133b9',
                fileSchema: '3x48q08su0nv365ekg0du2pi9x8am0rhg9bbv0j0q3mf0tlqacfea7l0bem2qbsucwc99hkqvxyf7p9xt6ierkn5ogri02djfjxtw53k014ac8qgg3qzm7tpztuu1dsm9s2j3ckzttg06rt3fixps7dc20vh3udpzjnv3aalbm9bz4l2zciuf0pxsf3mngrmfdkjxk1k3qz5cqoym9a8jdk5hpnwvjg0zvmjb4ggdyjsd586b1vw7mcom3c5mpju5wgnoor2fdavf97ax2n7m8bmvg507eydkrq4cgcq49qpl0trosjgv9j8nawxb8b1h35pn6sjeapramhyfcppnlgx4tqrmbmxpmqu9jip3pw67pfatyhtrb3d5kff98xpge7460ahe6kctvrkx0v6wfq4fhbusudcvz9gcfq7h4gj05ijhw8pupnd6p90g4747l7dx6xi4ac2zw8lspiktkjhzyxa7ilu70okaztebjgtr0xa1kieqeij4cg7thmqmogmk4xaa2hazoldxsua2j0wi6pfwar95tvokbvlufcu2wswa376w196v9bnqovqqnofm8nhpiwajtsne0pkanl0pvzi1agp8ya4lf4q1w7hcx1ow0x1cfl12b2t4vshgb16cfocdhftsdpkc3tzrmcxa04vwp1gvyl29jtl9vz39wpbu6lo8ukbj2v89muok0tx3w76jgvkwmgnpzk2jaygtbj8cgn4zaoogo2w905ljrgx5pvhx28edpkd45lqzjth1x69fsq2xvk4z8wc0hxbyyak3aibc2p984fps1gokoxb5g4jdrobb0h80wnei568hu2v1n2gj4pqyt0wju70e8dz9eg8wmtpqmv1f0rfckdj55sdujns2nb3whwjujgiuepqf8mhr2l066qe3yy81lthmjrwqgjvq1hr7tnkdvzybrs9igixuwnatd787gf8bzp0fg4d59df0zjuijrwaot89vkklc58qc89it4vlq23zshmtc12zxz1kfql',
                proxyHost: 'arpjiox171trggzxjsjwo4799yq7b27gg7fmo354xvipjy4456xw0amcpnlg',
                proxyPort: 8219232891,
                destination: 'iatbpzdhkine0o7qme7ptnvh8uuh8qnjicoiez4m7xtuhmzm90lz3h2csl87swm3xg1qxkqmj59tc1628bvhx6yybsfckbr0otzve5zrwp5o6k774gvl34eqcav5x2hnl5aag3nh3g1nw418qwgr5orp6n6nb23k',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '0eg0kmqxxh67yghcan1lrhxche3n1cgxhux35a47a9e6zsm641zwtmbtvh6pig77ckza00dqmm3p8v8sm0e881k8ob7r9gjaknx01q9mleh50lcl9pmxrmxpo1e0n575b4qzig1z0vmxvpjvjdg2joab2uuok8zq',
                responsibleUserAccountName: '5orrp8c88nikmatv0sa5',
                lastChangeUserAccount: 'kmor0g1w8p6p4s2v91f5',
                lastChangedAt: '2020-07-27 02:47:47',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: 'g3tt8ysff0vxm2p6076rhim83lfyog0rdpjkc6tccidgeof46f',
                systemId: '8pljnhmdv4xbal04vfh8y3uzdo4t6d83gtj1l',
                systemName: 'jzmt5ut6e7rbbw7o21la',
                party: 'a7mc01uyjvn5vssej2nlt05fu5reuk3kl3jkc6v4mz6kfje4mbpr10v0wvyhv1fxd2bft0ebgq0pj8wtnq5pnhmhw9bsn6wmiv94s2tgfcsrh41nb3aqcbv28mpi0e3ylt3l3042fthuylcwr17j71racnlwg820',
                component: '0ig8wqldaobupdksf7815co7s37oqjm2ctipomut2s836tlj0tal2regie6xo7hwrdggh36c76xzqwhdosp6w1alzv66xiflzmnjamf3lbwcp9zws5fa0dch0rhfvq7ojlpb6z4thlmff4zsfdhgdikocxjle9pd',
                name: '1lrl9ael8pvbqyi8cm0o848k2dnluwydbihpjotqkniq0e1zxrmys4wzwjbxvlhfq1cq1n58earnf74fh70yt65vvj6sw214ddorkht3im5fyrqojuq12lflqdzhqe92xbbh2okonl5r3euxcqzqnbu83ghrkrrx',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: '25bymygzxulmsmk538d9pi3n9470i5i972xouo2uc5bxfx2nogwhy4y2mjjg7x1lt5kruqyn5dnq0ngkeposdkf5psn3dl3ac3a4mj391aze6n2xj55uminl58olngz4u8aqw4uc147r012gwbbaghmy33tz2jet',
                flowComponent: 'unaeuwse9aa56tt73wor48j81zw1oyjiioznv75mrbi719u76u136zxzc2dgqfhhjx9rn90mum6ahnx8hvwihl7fh6smjs99rpiw3xbgtgc21h35gk8srpc48lrs2n2hwxror1gkfc0s2c26xx69qc3o759c4zx7',
                flowInterfaceName: '1d0ukhgjieitc6dswz8e3jnk0o5wfcn6pgvyf30035nvun71osvngx1xml0juirxi1bd2o6uf0viw6e67qy9qxxxlv58wel6jj6dyvimgeabmml4g2ebjfhzte9xm4zfvuhgdlfvyfy1fc0qmqotw2f8q65436sc',
                flowInterfaceNamespace: '02s7mzchttiwl3ws0y78szb4agq4haubbk912fvfjgw98py27iqjcyyp7k6ez4mm7vy5kucceuqquk0h0887dw6cf0jebmygd6k4dm6zkrbdwuau5kxzi4zssisgjcdxam53j6080wkjspk0i7iz2z41qwuzk50h',
                version: 'w8d2qf3tw0t7m4bu9g8g',
                adapterType: 'pnsxwv5j5c0fx16pri6jnfjhta012rvxlw0kpvvcsh2qp4ehrwgqd12eyuk5',
                direction: 'SENDER',
                transportProtocol: '1or9fv8k98u3sxswh6rk81kpdlq3hwgv6e1ivhe0tgs1yxvwp987suf3b4qh',
                messageProtocol: 'pjhty57jdcca7z5s776wvnh3gn7wlohw7abwbxqmwn3rqnwk1iqgg7cvzq9j',
                adapterEngineName: 'bafyqyelbklmk602d0kd56rtlak3j7ua9psf294s7og8tlm4ttdyq8ybk074yajqfty1pr7vwbjpnvqctl5xuwltbeyyos7ougdyzcnun9jy85cmbe2mkf9c1d3y4rp4cdlwhe23e20twmxtx76xjyag7ljjduri',
                url: '0y3c9q7erupka7x55l9rks4vzli8hruemvz4aa14crxucru77v3a0tidvo7uo3ungeh44h3v468z6wgj8jbnwn2et3og4sm7swu825xxjco7q90j7u380maqszecxweazj1ct2vjtoy0h9pecbb0j9uvuf2qy36ge29h0i9y19uivezyqrv42yukuf1881z5ulyjf2r7fjtwibzp18u50ufy6bkzfx62xnwco2ycoxj9jul7uevp0i3wvxkasyu0v6nuzbe2ivhabf4l63x2c4ilgk6kxiaty7r30lj2cg2t8aqwpzl5mdf7u9qfjd0b',
                username: 'hreplbruvdgvpon9np8cxnqubelg5fn5ou17jnmaiyb4ccd2o0qqydhzp6en',
                remoteHost: '7rdy0d3gsabsjdg63kvj7a11jnuzq77zsfw0b8fudybe27yqtutuo2lo8r81er785i6qa667dcvoeq8y18kj3bh8xdj5v1wn4rvjoy7u4vsxnj38ybqaehntv3f9hhr7lvmjl2b4s4jkes663xxjl6twtz4nkqxd',
                remotePort: 8295284461,
                directory: 'i17wt60hamr00o8e5fiqo41hetdzr523htsiurdrb1tteddwumlmg3g06vopfehe85mezu8wg9q1edc76v6xh5dybvl2yqzxzyp63jxpgvcb0joey3z04pfbm8v0aevzfzny7tq1ad663ux62vjcco6qc097uss1ewfdvxo68aoy4gg5e2i28v5byuaw53w6m89g6axzez3tevw79f4ejgef8cmusxey27ahm421h39kj7meod9usmblfv4s3nn3ayzbbbg40jyf3kxsl3bfq6ttyg47cjdayjm2u6az5wpzjwogk3mm3wbn5ql75n71d50z2tdrp72k1v7gvrmin3knkqg3e73km3asepme4lv0enr3xxekiv8ulz6vakgqay8m43igmjkq91n549iojf0nbzof1ctb5foqlghlru1zo6n50wthf726xozwoekxzhtw65h76pj02e3cn6cftscldn40ps9if612etxg9090w34wj48zlse1ie72md4zjamc5swkamdkw437rpptyww3los0zf37cmoka5njxc9bi4b2cu2ccjx4t14e05z2lewo7ycqcjzqbty0tz4qs0wdizxa5f78b5ym01lutrwjo5wgnd4xh22bwmw8tap2in6cymvozvfcibvw36ll4h1iekec7chw95mznlttdm8z5np4wuir2ek1tucc5fvfiz35pxh680v1c37myyh7h3vov6hl2bmhprsj9m1tq4vzjol9zg3c0ckh0ahdshhp6mgwfcgxsyn1gyo8xbbebo3unc20a36ce1o8y547ne5grvsbod252hopli5eil7jdij045e52hwa3h1bpvzir1or61dtf1y7wublfb1ykkv6s56cenhxbtgi00nh0jdz6ykghp9483w508u2vqv46nazxis41ijig93c5y9b7p7kaamfu45o46fc7y4vu9ej9ci4ikwv8lulx3rvy641rixdl5i56rdlljnbmuec7b0x5au6wze2dz6sjizjqvci',
                fileSchema: 'qvq2ewrr8sxsiucb33xfnb8l8cqk8f6fat0gylpochk0imd0skjsu37myktasaqmgbpl2uvy4hbjzhy0clbii0pl0oj4rz4ap5ng3tujfx1x1u9tv7x787jndb46ver6h9jvv85pnm065uk6rll5cn2pvl9n92i0lfew3m7kfh5to6qvsgy2ck0g21dimptrdn75pbnuotcq7vbjp1tfa0y6e2nqd48bnjogqtshhhmjnukn8c813roudd6lrdjhfll8m67cx6ybvutb111pjtan3rc7nycxjgq74p5as88xncjs0t3nlrfbeq92dj6qcukt4o6avgepdfeyaeuqa81403pyrtqqkoitj4a0ge43ogllcrqanhcdvsw5v9e3kt05f9vkk00epnwfgmak2reyydiw2qtzl6afbbppwb78e8y91hmfj56d69qpabmo5s9kejhbbtddwfej10gyft0k34rw0809i6tl3d3l9c9k7t38modzo71e95entz7kgx2brta4t0uc6ddjw6csbkglbdcvibvghxbm222dknc28hhpkx0nvbxxkdx997koy4s8hfi7gx672x5qcvxxdskau05kpg9qkr8zqhxqvqkszeej4fg1xzvrndq3erl5gthmyuerse84u6trpu1io53b8zm3n0e6x3eve3na96mtz1nin0rc5gmsevu8047btgj7lbo6qbn2iplut3lp1rj9yparbfckr8p0lluqfvcdp4ljmnqrzmroqq3swr9yvjc44432ztgthu6phfrsnk49fo9ghq7t5rl8ehvfc9jny96qdst8gpxgby4f9m9gu26ak89tzl0alr5v3kd3zya5qx5ncam32ox8731pojgosg2612bn534ll9roxrqbaghyct8xtj7ek0tmfpen7bl3uqgoqihsweu3v1mw78q71d824i2mwnz2uv496j8p9wuw6l397d0ohwd7pudhua0dm1r88owlqs2itxpj8x49hrmta2m4p27800hv7v97',
                proxyHost: '6fmvxnjhfpbq7fg4yovt3ke4965i26m63i3mmlvgwdhqfaeguxg7l7y0qc7y',
                proxyPort: 7205505590,
                destination: 'exwwbgmju3l3z3bxasm9rt45bzql2bzyes7i8diekx7esbbxevm1jqltrrzkbakvpm7gsp0b8hu9w770x1txoxdoeypaixsutyfkeo9gu3ip23sw36g6b69vfzajbu6pdbpr1bj9ee1ut4ei7kww1jftx7fu9kdo',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '9lrtpajg1lp64kmxoschys7ykvczh8eogwj3srkpxjb251zl8ea14b4oe8vfhkwybnxv1ltfssyw07qe4gjthd2vbxvzwfc6y9c71dlhd2qf12rprntuz4i7bq4t2z8vtrow9cg5kwmqcldmmyor59wvu4aa0lbc',
                responsibleUserAccountName: 'mglj40kpqe3t305xlr97',
                lastChangeUserAccount: '7adn3airwbaxnbda5226',
                lastChangedAt: '2020-07-27 17:51:10',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: 'lffolnv6s36azaw084pjgqxx7526lcghwwv19c3oqwc5tvf01p',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: 'ym650s2ys44slv7x2rqy',
                party: 'j00i03m5ygxtuocy1tjaceupknzg1drtmdiacrsp5p73t8jh3hfdfq7hlj1scrbowb34eoey487h6px6tw2h2b84s6w0umaskiuzj05vo9r6ewo7a6ju8v77vhv8cvlsb94timkrffgujppsyjj2jz6v1soclh7v',
                component: 'n98nc3tlnhe80n6svrjldpdtj12ackdczq9317wnmc4q8zaygr25czbmlr75357v4oey3dddoct6afwmgowg80aoamq0wd61zrbwq5ownsk7r2nth23rvi3obwle4gsix6tl1j3tw3xr4ihrea57445a36c5lnn8',
                name: 'qbxvlh2lojxwdpm4aztmoajzaezk0q6nzlv37nqehacrws2xszd5rx6w61hr48uxwtexl97v5gfvahmzog4grsrv3opwrnghr0t7pjuayz10dwia272qp944yp3dtgzas5cz13esbhgz1ovuxe2su1jiemhn01s5',
                flowId: 'whnajwsp28bzwur31oor3gf403wyk0dyorw2w',
                flowParty: 'v8w7q1i2s7yy37i7g9suvpfifu5b2gldqk9py67y3hnz3lvlls1fpu2d74fvdtlmr202tlavi8ncqjd04gowykuf1eitr930hsx5cyal99o4tx61zoqjsivgaek91cat1w7w4myikf5xsz9luykfu729sjd0skgu',
                flowComponent: '4yp79xia2xezy01a38vl4t8tkgq1uwm21ikg1icxaol64xb51opmoe326y0881d48wiqlwp89h1du0m2b267q7iqs2um263nxzvae8j1bx8vmdzkegbh4atzjh5il90rwfsz2yy1ejrxu8b7qj5s3fqxcg8i1oj6',
                flowInterfaceName: 'erj4g63ifqzmi76fgm3k7o78l2x8gjnwy7s55wek2jh1wqrd5n47oi25gmgflfuz1gk6v75rlva1tfh0q8fe4ho2ougbriv26vaodf1dia0it6ktsx8fyik30oltx22ka92btilxutzlwesh5njs9z12u3nq0xzw',
                flowInterfaceNamespace: 'ki6zz1ibw10ivh3p8w6desntnhiumaixzx9yf9ozoc6vlso2506m6fg0o5jxko4zvho455pzj29dah8dwxjioyfpgoe21aqicxxq8cma7eysnk29tvi2mx4ogse2lh4z9aapm8t1cd0f5xk7wr8zwbe2r2qlwkpi',
                version: 'qxfpkjuya8b9wd1wpaqs',
                adapterType: 'ezdfji3102s2brb7tctss24nhbl66u1mv1y5rnidiiea80r3nwqlmfry9b1z',
                direction: 'SENDER',
                transportProtocol: 'p6qf4poc7c02s1kzzaydiido1gazhq1h6rz50il0xi8w20yluy5fydco9xg3',
                messageProtocol: 'usp5w6cr4170aiv5xropokaw8ixd7t49u9sj62vubhzco8ig9h8agbcwkklj',
                adapterEngineName: 'c4kcf5roeu6cuoh3b6olrhcl6on3llv7o7uarjic4r4q0thacix7gwr8lnccwmhg6zg9ro4roshc9nj4b95zrq65lpb6tzp1nqdxqov8yj7dyh05iuze5jqjnc44e0eyqa3jggk3rx0l5nrxvx15sb5wk98w2py3',
                url: 'cq9ff5qnw35w3zp83i8izn3mf1ygglb5zhag66anjroaxl7utxxuaqg912jjfjbmmsjxgk3qsto01millxhwvh0ryzg8f4lup8x7wc1z9jbyg772xzwh0ez6z4yvyoy3za5dv7hhnwzdnsp5ghgjuglkq5lnu437cuoqfrkpfd57zroigpg5ppae15xdthozo93mdbtzeu9h1ri5o3m7p51o5u8r0es7mbhqkq4q741665t0qdafvie6hevbyw3hkq5vhc5ifpgraf59us3l5wckfzrwgqkujm0dswowmuuwij69kfunar4elm09fs9u',
                username: '4l36wlxogx07rfzr1gx61cg7fsql9lt37all55dgz4iu2vlw892ao3tlqmd5',
                remoteHost: 'd7bgy2hyiftzc1nwck9pdn191t7oihptlig97877wk2ep56gq7k1p0psl9yprkldgkraryup8g2a1u8ioitucjuilxf0ofzafjxx4a8is6rtbnqkef8zb5casuqbdqr17uzbigapo17gq5fclgn4gr6kx54vlmn9',
                remotePort: 8008519344,
                directory: 'tzxxikl3xdwldozf3nf7ib0w5xkb3gyq3lhv3l0xy43lze08brnioqq4h1dkoytf6apgbyta1eq0ofwd7g9dk4trzgkjt5svh22zk7uj1z5l2o3s820x1tol8phmb7lpfyd1kl30a01kyw1uvtke3nv97554mvcsjhxipvy1pivw4em1a42l3dfxsm5ibuf29arjnnabiyoybsuiuqy15ll0cwx9zw9nlwi8r1c8tbrf25a3gtp4u3rte237f9z7r2xlj2kpvwjnwm28jq7mkmmrvmfrtnij58wlt3bksn2bndbst28dcnk9slhqng9pde09cgdtpw22fl3i6daj7eulvje0l5qw9fndfono9g0vg0ay7lwclusnuxy9aws6q5b7azpd3lrcaf1by1e4zlwir8h3tu9lzjy6iouib7ibyu9drpt2abbjs7kegm5dtlf1nd8q8mlot22fsptm24jbp4k9dhx1rmmedov0ktcpnmtrxol21r7l34wmqvz544vn7uvjqpsumueb09n9w739cws5am14fljmhiwwav6lww2o44r1p0ru36zoa5vp3nskclislq74qmc2p1jsnfpezj87biihfur2u17wf9tl69tg2u4h135t5ruyapkpm8z3xfm89snjxgduzpnzuyamkvomfzkrhbsux0kg4c8lkk6k1zw7z2jo751kmvhmnnxgva1k80l9vbsbu163ij2cve8t51oskm2lgh1z49g4mad5mqj3g4kmxkkp0v82sqh3ap8xwr4obcy5ikiixzab9z29c7z4kydl60x4dw60csd3fmqe7syyjdxd6myuwhqmkyfsszup8vjcmg55m5amqr2ely2q3g4szhhb72e564o09ctfp5wsbqhfakdhbdif5jro38t6ptwid01lz3nqrrneqzd2rp9ztregusbjj7rodpgu066djy73z8qgb1gmmexj1ojuuftp4ip4egg938c0hxfx05971tqq7d4vy7gwaemafh51kdtsl8gp',
                fileSchema: 'v7b875tqa71pi636lx014wdyiyu6p71seb4qbav24b1h63u9tkj7rdmzbkjns6aoewqqic8uiivt7syebs14loyutr1m1nrsmklg7nu8h87tp9kvz60whn6gv5aon90u1e38sfq9s7fjbwqh4b2p7swstjjx4hvh7juqkhy3gvzwq14h2oqwisde5whl2kt1wtsnpxcnplouf18hxqu2jdqzqah3ln5tankkopr69kjwpldt2j6kf1iulxpikalj7mjs26afv56tqug3dlg3lirxhvxa2z81lvzhyjhbzkh3jrwe6oop0ykeyxt50mm3ghgz7cyuzwoakvpz408pzwlpga2fgh5ywfu4jayg5n81lr3o6d2c40qxs6ri479jllym485e828puvgdjq5a6g95ojl968k2ywe3vfngq3qvn5ava06lkapjk5zjdtc0gtoywll8fodz4y7kf0m6ej9urvnesqvf30l0g8pegpgre7b8szl29u4ejnpxr81uvrs43g53dwzrjqnu3fu8es3mji3oxfsems5q35ppohwrdi2toe1upbx4j0iapz15xqa7qglr5dwlzowq7t6tm8p0fqq0aceno64ji7mb838pgnr6he9e693t47ndv0lx17fjk2bgq9ay2y6m9xd7mziqh3xi0be9bfaclqmjm393p7y7gx10ofsc3q66wo02vx7ysot6p01etpaqbrsxktlc6b6kibtmu8dll3zv5su1ijc4hnhfwpxv0656gibbh6ee34ph6i7tiqzk15rmonh3eq41935xivr7osqdeng4aiho0ouwoehc346okvu3gou7p66c7flqkdlxevhyd0vpzqnmnu6vrrrb3r3if2bnhjcbc3uvm2wt5lew6cvyxz9tnmw5wef7beahx40uxv3pg3nwfh185v39wgiz53xlufp088cejdk65lihgb7w1atbckoxza7yzcbjko6tibssae1pagaq8r29s3qydclozmkbbsd7v83gx0jc9zlc',
                proxyHost: 'xyhr5cp8yrxxvpcyqv4szo09rw645iyymtbkrc416z6w1ta8m9gjhat72pd9',
                proxyPort: 7843063551,
                destination: '4c2ott2b2wo9jclvv48nrv77hnmyhrbswdeal8dz5xapqngpif68x35nzz72yyoqbkii7jdxkridfkx3lwl6u44errrt5pfltdp6f3xfykqu92ucznwep9o6jwmk6m7nymkvk5z1usthvs3vrxwye1zho2ygbsal',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'au775k7rguf2qi5xj9p1djxrm2manubc4sd2n11e9j7n56biopam5hnztgn43e7j1tgy2qwk7qcra8h0w6wo76k9mtpgjnk47ii6tdyvu2tit81u43oj0pe8aku57v0icpcvcfserlx9d34vbs73lf0o4ba5xavu',
                responsibleUserAccountName: '589nlssxpz7e8a0axx99',
                lastChangeUserAccount: 'aiqxgw7gi9dxthpobc6p',
                lastChangedAt: '2020-07-27 19:19:57',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: 'wzyt4mazq9c0xb85kzo4nec1ez72x2vqewivtfeae9ogkj1eeg7',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: 'wywu6692zbybh6h44pia',
                party: 'txdx8v3zkckfros5ok4x3rwdru8e23u9r3pluiw40jtxkmstkstn2n005eeupuzavng4dyc1w2ea5phscbondl4b2ok81cc4aq6b5vr220seoqhaxv18rylgml1h8yxvj2p59ip8mrpgp3xma0kc57m8bgubsj9p',
                component: 'dc540hinxldu3st1lrx7s7jmkh72dk2jqoq7nwuh5h1ge73q73rc5n0ud8ub9ma67q0fgcefzp0ixxq4n47og4r7ho7j3nvlkwmldt7wel6sghh5o5ovikl8pa9lsqs77dkdn9braq654fm9rkac1m64sa7i24jb',
                name: 'i1b0bioj1a60d3btq08tgxdv47i4y7cphviz548maln55232a7t6jjrgqpyrvxd75cy3g6uyhp929xp7nh8tlpmvw0z3x76j7bfyt9e6sziesrzu9pn6495ow29dvg4gl6hfybfdczbo59ii4puoz8vjraxhqbmk',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: '7k87w3jicx6vqgwt65c72j8jf27ki0sotxjmoyrww9j07o7kglddpgb0mgng10c3u1h1zlxrrzkxhftlzkl07jpljej55kfopfgc04n6fat2h2y0m3z2aqzxwhhwb00uaa0okgruhre237c1y9w7s3335np9j2sb',
                flowComponent: 'nj0963osiglim20343w2fc1gspk5h7t4gkun0s7jr7jsu2mesp8r8a89ko2p6mrzthm527cufgtgvyu10o231y8j95zqeu18dqw6l46912ite4uuhopmju9evth7pexunrbwegb112we7s9g688le6lx3w34xisr',
                flowInterfaceName: 'ug7b9lu3e29xibkujw9q40w74mbts9c64htvs09um9616ubnh4anm7lkdx6t83lgv0zsc7a7j0i2esw0rsjos3sr4h2j8fniu0yto1axw774u25da5d9wk97gluno0jk04dcjfcxtncf2uzd22tol9zaqaenyjr9',
                flowInterfaceNamespace: 'nbot8woc5ixkrxzf2en9agowzbux3tbxjqk4yxw4w2ruf6b0fgtye3r014k4igybpuf9loqtb2udcs4rayk1bxl5w1kdx6bkj9wbxs550ndp5lq1ogo7twjv6eevvue6n7hjcud5xdif4aqwb3ybeudvd2g7pt9r',
                version: 'sinnarfv9stblw29va9o',
                adapterType: 'u0y47spuuzw270irziq5pjjvd6bm5uhbgr7lsasputjm9cle1vebwuo8oku9',
                direction: 'SENDER',
                transportProtocol: '6yjeei5lg7l2gblfmlokb58sq05bwo1zjy4kljh9dus6a9dl5whvwapw6gmv',
                messageProtocol: 'amfah8ss74lyh1m26dez3bwaw1tgtqj5248rxop8wx6bzcwb98gbemrumlbo',
                adapterEngineName: 'iyt7kld0yffrihhx9xkj99sai95skg1kwslnjvl4js2ghre06jr5x9d5xpn3arxaevy9tfnmrcj2q3ppes30y9al7o1x390todv707e7o8ml9c10kzc8hrwbkshcs372z7tlbuwsyrgyuhpm1x6amms2z2l8exvq',
                url: 'ytbnetjhx6xx07o7fqf2wwn810fmswk74huo295fs4383tk0g9regifb280p6siytm43j1yjn40nv6fcbs7k9icm85r4sl1ibelq8qnvaq83at4g99ifug6ilr3skmcxpb9pwg8c2x9mblcxv9808s8qjbb865sr540iizinwh86wcj1eb4v6oi5l69ugylbkvkr66x5ol8w1v1dzfuth6emqoilg1jzsnvkurd1j1r1auzlns11jhp4p4dpoimuyuc6mzbcknqw9du1zmnxj4rvbjx403mfv3nap7bxthwyo1sgh5mleljtlqylxa4u',
                username: 'hu1e6t82pll57ns5cos4w0mnx8ty6bgz6nmez3lqotj0jmnpfrmymxq17k8y',
                remoteHost: 'f5gedhe1qgrx5ly02xy9r9v8typ5kwbiykcxy70ot4j1x7pgvounrtqkkg3jb7ilbwaweinqz36tm3tiv7zn968ztqjqvmsiuvxvqd4rk01v3o2a511cnqeelqeny2c2koz45b0vfdyp2sy18w2tv75cf8f124j0',
                remotePort: 9638434721,
                directory: '83l2whbsanen2yf6xstggvoefo9fk344gixcyxr6ul9a6in8qm5jnathj79s6ptjcrj0j1wdldojmx3v22orhb44ji309otesar0l0rzaq8t4nzfzpcy2975e5yy66ycfgm3tonnihn24wk4iudwwme02lij7f42sagpvtym4hfqrezlsgsplcrnav0hczob9a0jgosj6bmjtib99d58jhmxbn7rll3t80h1ptuu1nenh5x21fjpqjoxsur59pbxi9re4o9473kao41yvf50iyh5c1v4gql923ebtvyeamvel2ykblaefmk7difk667o5m9jcvmypmd6lloafs0m2ug3oca6gona1mm5tt4ispwo13z4xjx8ae0poz7201e2l1h453rgqst8caxjvh09snvfk26h0d8khneke2530wuidzzl9x6plq5goacrpe60dm6yudl98ilalocdigedf6mqvd1zvxgvt7i29ssa952cqzse90istav0cdmeyz8adwkobr75cimxu4ysl4m3o3gnb1oprvz9hdle5664esdb6t63jsjs0vde648qt2dxb5si8f96600siotfg5pqtl35fqouxyk6jeltr5qzdaynvqvz5v96vkv3g3n31zzf4omruns7el4wm0m6m7kbmffii9jk9un2fdzwp9qo5pme3k1q9hfbfit8hxycghn8kfpa6ba9gildgemy8ns7r6ia0su0qrqyjb0n8mrqbl5wmjdjpfnqikruf1v755zrgotw2pd3opvo8u3grvis0v4p9bhuxwgun6nokvmn3ybvj90qhl72m15u0nylgxqcx9d1ow56cwav8sk6chpubzd1f0mhy4b369wkot7zdzts5pw65t4lsum25mdid4i1ktt2hdy8xqt0e2z218y9458tw393xcvl2u17qg00hsbh2x89vqildi7defszdtx967dcy909pr3x60cw1l5f6ytuj6cq4vm3xivp44m8grfj4juqwmk4yg145w0pli4w',
                fileSchema: '4ri95anqlm429eevpuh2h1h35trtoes0wwdxyt79m6jjh99hvhucen663usipwtf7tygg2gpmu9hkusqjy2fna9hhwahv868qqksqwctn9c9fsj7czoqe8ooeh03douair5tsdwryovm1by2rz79eebd9ebnncyj6bc3drpk37v3g5kkahshv4swuu6c4n0ftlqojf1ka54xljk2auolfocz253zoxloe0hzghyxsb2ldebict2xw6yowjcz41h2ixxxvyxr1dju21mlj1wi5gu43c89ghllbdh5jbe7t1ub1mcx1tmkthb2u1ucssr88r9ki5m69m024njvayxjcqxuexdbovisl64gi71612wlwe3ihb35t4a1q7ri2lnf09v1iprs0ovitkxr9gyggg8skzmw6kpfeozqfto9b36wop5kzkum73m1xrikfzimsmwak9vqe9ffwgwexsgsbx0gjt15fyfb0acmcsew6yot879rnm6130u5zfg1k2022s3dr5j9rinnlm9esxk5i75zwwm1w6vf6nrxvnlxjvtn7gcpp4dz8smqc6hvv5cd0hmpekr7gr0s2s7xrx703kq0i7qvfyva1ndpgbdrjuralu3fbsxcyf6wp4uk9byq3359u6z8iiwer89ydq2oljwg5vf7x9zkvbs5ysol5ezi69nib13cu4alxut52403cfmmrc27vanreruqxnak3v5ajuxfyh9neiukln3h0w6ek4stcojlhl3t50qyj937zntg2eljkyi544dhjtoa8x0dqu7m40wrhlotvflqzlnhnwpuhmm5nfcurq1ody5hlbr3e0l00m63eldg7zzefpbd7czx8yv22ttar1jvew047v534i2iq4asjuntpw149iv0trextvsv6jxxo44ljl16h9sq6yvaxvxvbltz0im93pfj4pzs8xye8ghksgw8174muduv3mdbnoolxetyjwz2d12en6vkieaoafl6dh9kcsiccqjwsxfwnb13sxvd',
                proxyHost: 'xhqhoolrfkage68jkhi1onux3wdwfep44jbtemms8j782sow7tl9binoi3oi',
                proxyPort: 3742134909,
                destination: 'pty1ooc2fnfilpgwi4h5m5ifpocvzxpmrvb3qxaqqtxj97jmzb1u6cw9t4r3ii3m4ipc73bwprbij2lnt8h8m0sskwqnecmr2szr8b8oaz7142z3gc5umfya5nl6va0cy1xkuzqrt6feoyrm36fe6mdn76vleiuq',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '0z8u2bu5amiusyutfxit22s59otl991zfmppjx2ej74cxaxfhvzppmu8xhbgost4lrhad977acnvh3x4o487pbaapf2y3o6ty6kxdkmecd6by2kr17sul7zwoi3juohrivfz5yey42wulwjmcafgbhqm5dlp5vdg',
                responsibleUserAccountName: 'cvugg724thz6wy1fuivc',
                lastChangeUserAccount: '3kceqben5evrkb6dtiep',
                lastChangedAt: '2020-07-27 04:01:35',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: 'vm02m16yfpg4f48uc798i7pojjv7o64zcc2jrl1xa2tr3kdh7p',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: '52yoaqdu9g4tmkkb06ldt',
                party: 'mt0wl6kxqghssfcvk682xd7xjmwddu3zc9gqj0wxmauddsrygwidus1q8y27zo8snb8bl65lyvztrajtgsy4cekwz6u3iqybt7b47v4ngpun845zd6izesncgexjt065brdi7zk9xbisnpfebmp9xvqi700ews1d',
                component: 'tieyxv1cdickusl79ueysd3u92eippr3qve7x2bdct4v9ju2t1drs99eapdw0se076vmy1hhyf62d20putqnppolmjpd0isv8rkdtuvif0hvbz4n717gr297e5got1lyv08mt1nsydnjh6hn4vjzm8wwh9wjqgx2',
                name: 'dqwahhqov47918u9qoxcysf35irq2t3p5t9nia3m7xae7bibopo2jlxbsf34lfgj4e871yksfqhq0p4prkli3kv9aaisqkda80k8x2l2mxt1a6hpb004xfrvl158ojdtmoy5i4rnoh9pi162x23wdbjvjd4twa9x',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: '0oxpgadfwjdn67f5r3skhmmfqbqmpi0fhdzyni312xrn2b4x6f6wa98nrskjlyheskx2l0qyp9offmpp4w8ohi667ziqdp5j7i0n35y4g5cgpp31zu01dbyf75v5iky1nrbpk6lspzb90dzl6twzu566a3ay2la5',
                flowComponent: 'tug2q1ycibb7nh7d3s13mjlner17atlfqo8hnqcgyc7aioznl7ngg090ti00x4snh8hchqcuky67q9aq47g0f8r26fc24eojn4h1bywyrw6v6uyb71d197g19u5ukh8ei7uougmm0bdob3xelersjg4l3ar6g360',
                flowInterfaceName: 'irmpz9g7kwlcb1fjfmwv93iiatt28cldwdmeq03ov6wfz8tij5rqeq7xxxjxqa3yqz5xlg6azn43mr0xotw9g09o16p2zzoenk8a400wbgpn2349gxg820jqwvdql887czdh8qzjveuqsypc0okntihb7n27yq1j',
                flowInterfaceNamespace: 'tnnnxsr94yrisg3f599xcebgxflq5kih9rj9vuqxmgho4nfbjwdrvwx0cvwmotwxej46zt2u530jmecyohqnf7mk3qhd7frmr4k0s3md6anjjevhoxvz7u9mtfmcugm5iv2bbgonfagtmiqmcjxhczom4ah2yt7u',
                version: 'o1zb6xwzk33t1bek1w3q',
                adapterType: 'jlake237ohcdfw4gr9pn1e36v9hjw97o78ac1092e6ka2l5s29f37fa4x219',
                direction: 'RECEIVER',
                transportProtocol: 'mkvwucuzk4011dltwqbouh0zjee9ycm6p69jmk3vnjpkw9z8k4u609glxecd',
                messageProtocol: 'ju9pggg0c07qg0dtw2fkgtw9o6qbq3fkke2hqxisdebcaom00sh0rga1jw7n',
                adapterEngineName: '1uilc6b9eqxabvl5ntgl4wuc1w2u7zx1z7n6ur7u0y1yvmgh9n8mzskij0jh0xiyvtkcqj0tlps0jx919zjjp7mwidyh4ryslim031oc8o3r3kpc6ymthwrdthhyscwwes0gj6heml7no3x7jki6d5ts738ovos9',
                url: 'nh9l4690crdjgwx0y7e1nnhpxj7qu0tuffikryjeq8ty8lub2nem6w1izh6ddnegqkmca1zy7rrg73vhqcex6zi543rrezv4n3d4ytg2xemuki172lofggue77u7gcyvv5f9jl8hb8wyl0r2heg1heiyvslwl5lc6s0rxkm9pq61skf2u6olxfy3p56yeljq6nfnmaog1aqfuc1axmaezglsrk7e9vh0i1bx5wkidnm8xy8qpdniyijsl4qx3ob0u3idz3crmsrezjh63ohslb53y0npn3jhv8y53jjvvzjvao6mgt0kbssdem34m9uo',
                username: 'ld023r944kot1vkgantvkp4msmenme1mja6d0h4l8pzmuw3qmooe5p1fmd60',
                remoteHost: 'h7qrd4zceqa1cre8gsr4tnhwkffqc93gvv408ei6ern5b1uia4s4ckf4cjr5rfr9jd0hx1ptbpc1ixssov9bkne028ycitt16aq3hx77r3boene9cw4of94cnu04brsdc8hgejb4iwk23uvt60js4a2m5bknxt13',
                remotePort: 3738693138,
                directory: '5n93cnceivc9i85n822h1ig44rllhhblq04dx5qk3qpz7cbczpbtth369og9snu9m7vm7d3brmb83iceudrjt7z0qevnm4jd35t1zkr5tmo24ob19087hsb79f6792j9ese9tmr2fyocatyn2psmempa6d8giw1onsc95ls2o4rlouopr6qm5hk0xzrtpb9nq7dipq4ccgekj3q2fyyrimkk9gwq3derlgmv34w2pn9f5c3vxtmofuqubx2vn8gdxkq7vrtlzbpvovkbtvulrv9ou8m42kco5y4udz4nf737y6u78ehwgrq7r1evtgff1gyuxdsrxrgunobxytx9ybt7lepsbj3yq11kal5ucn0ar271gpx8nma7x5bwibfpx2yhyelmfz2zspxva559ubszcj61rlsbbnwfsai706kwpfi8az5u1ou9nk05u6pwmj2qa2lf2jjvdd9py5tl8des38361dqoxegfo3ply5y61awteno2pxknui9c82wyy3gubm7siflij11pho7re7ii6vkbz1tl2kju61xdhzvd5eaw3oap6ny037hkfrh7exzhmvany1uyckbsllua1iwc5zs9jxvoellwdued94q1wlncdw8yday7hlnl8xu8lk7o3sct0kd3rjadwlvh2u7iqvr8t0tuih9kxbttbjvysf9kmpt5hee4r4ggww56jocwxumfyvhg053ilnmd1a5vn6xxnoqsojnvydr2k1n8hmdgkojsdsppi2nc3payokvn7uh5r7cm0jyk7t0m646rr0vhoz665naioq55i4taa6f1v2322loydgdi34xht6kgw0tpxvmf3pye94bazpvaxlryplyxjkyv7fcg87cwbhziv6pfllkayb53filt3grzkckwmqvtcs48ep7ylyrlputokb8icp904uyt9y89e8ivyadtw8r7obe15wsi4jkyexdy5ylu7wqoe2apwv2xw8ff4thsvjs5nxv0jeu6u5763u76vh4gdbedrlnt',
                fileSchema: '4kjnnv7oypjop1hjnmkry923jz0z89glmsl8papryqiaapjqe29gx5psorcjdknvllgkgw7qjscg3j7xflsfdbow86hk7tqvm2sjd7vou07jkgxh4vpktm19uoksk46fta71z7g7mxutf6f51x8oij9odix1ogbqztpgky5snhqw891kancgmqnif9n3sc9r4hk5ndibeyct8c9clasqvw9cf4wtvs9thivrdv56765nqy2jmbtrbh8ogn61xbvn4b0otkhgmm8knxf83g8ufrhwvk6txn3xz18wstuyrufxyt27sxja769gdz5vmvtufkykwuw62sfpfcqsv7urqeym1pihs6pp4q3zddxu1x05myp3snevptrstzmjshm69cm4umsn0cpv55j9682oi6dybsnwblma2y5pijl0hgjdu1gik2gkcp5eqqhbuzaoupb7vt59tcdojl7en68biigu2h5moc546efj1bg7ig6oeyhj9lop3eqsad6va95doyyw5cv1nv1c0dp8egd53sjznv5m8g3ei6r9elr052p27ut46is9ag0r6qkem02mcvok880es37ctokpylg2nfiljyzj0qhojeydr43rtvcr2q1knpywxttq0iq6meyqqmco24z4kzjd7n54ainnfreqfpfweaw5albcjefjz5g86o7yqj9v8qj75ec91pz1du9fql23ynlfji115ima76qd12tga14qogaqnrywpmojy6tqp9nw80s7u5e9lpucz1oiyqtomhkvqx6dra0wik3mglanqvtdvd8od2o8fczojj4b3n7kfk437mcu27axeuhz00ntxgofxdi5xc8h2aaj7whmh935knw92yv04tolnes21w307efryla211f073np2pifk4m4kx8d3sqv3vyoqblf731c2qcypf7syzcae1th0q0e4h9ifa5nljtslm1mp5ddojd3ouf1ldp5fjvhq25ou6epdo9ue178h5dmkvroeywimfjohgu5cocw',
                proxyHost: 'rtxep30fvn8u5eathh99wwyhobqumsiwurkt5gbbfiukd9bgpm0m8new6xon',
                proxyPort: 7012905499,
                destination: 'cvyx3tm1bgt4niheudui26523wm6zi1gpwa8nlx4483b2ynuov7zbujeorsqn8e3mlj3z38cr5hfgud7mjezr9w7h2lgdfygfeyg58yf9c6wswoydop58og1y5r6gyq0m1m0ahlal1rhp9puy7z608w9b2ublqgp',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'znv7hek7hxmj7hxfh5o8p62rm3a1fzwefj9tkxeheb1l77md39b28mcaho7lqrlft1l5oqfp3ewphicbleurbrktj7c2nnggcx4wl8zdm8jexmqjp877ktbs1mlngpaobn55v545z2677jg1r8mtjcew03pzvq8e',
                responsibleUserAccountName: '7hm6mm0a6xe8m2ikkz2d',
                lastChangeUserAccount: 'e6ygbawvfzk5rvzmaiup',
                lastChangedAt: '2020-07-27 10:33:43',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: 'f92zhggalzrin15j3cvji4ysidxsekmcw10wym6gzair23rcuz',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: 'sa2ocl43pbei0ycqhx0r',
                party: 'wgiq9f9utjwn9i1l7aqara68iqhtqnqx7s1zyj2ensslqb63djbyvi1b3iu1efcyffz2g18yk99alrxx59msinib0nfigvkwdedh5a5nn9q5mh78x950l5va7y34ssj0lzo5zuqn4cq3ec33utxp34213gtw6y2n7',
                component: '4223c9w9oyyv8dmazvbbp40vv0sogns7j3vhspnbmove80c5q27a5wx4j3aodb3srn4c83oqt5nhv61p4l8lt6p4157gumjjv04vfem0j97o97p8soafyvhfqpb6rnua1aym7hvyffh8rhkc4j0wrv1ebogjwvv9',
                name: 'xlbi8nxdyw8oyarvf4vqrdubzexecawougb86expdk0kwap0fgzcqp7f76t4nklhibqgtaj3p3k7a8konsphy4zrc6spoh8zhg37iv2cnhutgnpejgvvbyhwojnddeuf69130d0f2ao7nhv9v5goa4rlpcausiy1',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'ga48w3pm441vunxlwgj76dnpn4bsb602rcmye0ii406vxu79cmyi33tm7y04v02efn4bfls1taq04fma0ml1sll0kez7sgeicqrzfspf58bxyjv276h351hglingrqv9w3k1jwmh7iyi1n96x3n4y1qiz4ph558r',
                flowComponent: 'j4b9hg92x6mgdsit40dopqy2lpgy48yv306vok6to2bzjafeg8hjejmo7rmklfuvzdn2soyjx68hz5zqbt3gqc0wj0uqacvy6mou4f2jvkbaxgxxanc7xok7ndp7jy4l1ydn7hu3l5o0mlee6xu7zlkacq71e7ey',
                flowInterfaceName: '51xmoceiuuwu92p2m9fuvpiao0kx3bm1tpwgnh99yb04o9vkb6qac1jla00o8hzg6gc7cv2hgdn4b2x1bsiqqyem9dqt29ye9ypiw90skmn626twaxsgumbmqvl1acpguu7ln3o7gvqdg6d6ljj7x3q33nlhya26',
                flowInterfaceNamespace: '96ddoyez1z02by7f3ykr6vxnmo45xlnbqn9z6romxwkgh9lwd5wipcboes4u3tnxhkwnau510pm3va60lgphycp14vy59itsy9ofq98ojmeuoddcfi1wkbmdl10cem0gkwppspbjeo3nrgnmm794i3efmqp07kb2',
                version: 'uabdits5ztsezgum9u8y',
                adapterType: 'q0jawct4eud4dvuof8irl4qwb8oafeiza4s0xrfv2lwg8ng0ztd1s5yus5ij',
                direction: 'SENDER',
                transportProtocol: 'bjh9es7so2a4fifbo1u461mek3u961mrplbjh7pyi4at4frv7l8j3xytblx9',
                messageProtocol: '7yairfgzjtvfydrvxb7zkba8d8gm1l3o2dqi1b9yhvjn111gqoh1k6kjxqh7',
                adapterEngineName: 'uibw2tcy7m3y5od6ufsff8hjnvq1egi7xoo8bquo93w7r5m9hi9eqjj8h5xtcjnjfihahsy1lcoplj1ygqer9bg8o2541784pqulh5frnnijm6rj1lh2yly10ax71hkv0edfr1s3xmdv62a2qruihdo8yoybwoob',
                url: 'gcey2paspc2ke1dva23m3z1knrbln7k66kcukkb9dsd33zx56044v10krmaijztzo1rnsagkunbh4ndblg6qjmzq9rwdmnrmu6krcmakrm6f8s2vmqzt1gtvb613g35isd0xmnjlyeja1kheyzs468rbwc8jnrnth7mfhyeyiwqfjgs5n2mvh5f40ozr2nx6y7ztol8vuk8irz9llaehsjfw1aswq8kq2nrf04t6j770eg4hnrwr4ny4et0ofzazdd0gzsa8rgskw01z0qb0ehm7lhtmpj2vi9auzmn671hz0c2b3ymz4k2gzoevuohw',
                username: 'dzh4jcq890en7rs5asj50c9w6sbfusxep7jd1oxr08n5g9smdwk0ee73lnon',
                remoteHost: '449ces8j05a5hgqmdmlvuz7kiq9h279xqyuekj2155omkak4o2zx61nx3472vx9hwulp2sw6ihaoacgt0tem4ltsazbfnoq43ya6251jkiznb9oabnvyl7eumsfgs2mxn98btlcrdwd049r44dwirb19gkmt0qs2',
                remotePort: 8630486009,
                directory: 'tru3vgsyhrjjjy8fe7y8t61smdz49himvwas1t9ctwc09tt7g0qg8lqhf4hqy74dqjouqtdir0g5xm5of2qzr74uhv0gvfovfcrllgdogrlg59ehfczv2ihcfo3ttxi8mw7pisrn1amv13xzdjvevu89h6pfvjt61enqusaglm6tbvr70lk8blyl0hvtvougkondrkqveyxi8ig13sibck8iptjdu989cb7bmlxbpdq8f5qdkenr6q0bgr56g98v6ch5c8cxlywrtpwjr6yksy2vqusvyap3qmp3hklhrnwwfbmjvwa1i02zpigq47l8yxccgo3hhmjiw1e9g8gb5umvo7ny1bhbp6zwfdvesv9ty4ej9xiqfwom5dfpk001mvv2peaabaisglhibuz9iwp1q01pzndl2rwsaq4jt8bpr0l3s2f9pq521ll54o635rir8x9e9pv3g5liomm3wp2pog40apuzaq3aor0x40w6s15rv8i8p48y9tve8lc15ineuealv5l71r88aw5r28z2d64iegm97rzv0ky7buh3jty09q7okc5fq8znt82t89rjzkm2z5jt1wznxg7dj8l4gzoxrunlvo08pnmm7dteok4mvbx8zagv1u2dioqycg5wb2fk8zwkf7w3j71cnvfskqckklytbgwvwrv9va2atuds27xk996bc76nzw7c84vvoxxls0ohomf8a5efpsl3p33vjfx6bjke7l26d0nje142ywu5wf69nkgjp51r2giok4zer9v314f8csbvzbiasundswvxfy6yeaimqrat8sxihzsejaxlrzz06c45dwyn5rdef6t7b0e4s9a7bzb8uuvmc87oozgi8c1c7hv4jab6jkhgckp54n1iq9r5fn3jjobspa44jlly9594espg26yznilbd83djkgt01tgwrz52j8queih3amyi90kddwdgehpnd1k96oujv6wf3g7dwr0jyc68tca1qp9vc3fvydv5vvnji5nmyvq00n6',
                fileSchema: '00yu6snma2fl5mu4xik8jrw1wx7o6oax4vd4n1ykm31s1d7ytps23i728bhcx2hux0awvtgjxc22vl6whk2r9trlv4pwxh5x9f4ptcngxxmqda72gxlwzdax3qlcdycqzcs3rlklse8hhk8mpu6q3q49tflhrpts0atsnlwe96wbbrnr31xsnpthltft4qmkonb9yzwwlhyev4vcqy8kj5iquitkdk4x95zkjas68zn7h8m28wd6p6frg501ml97coy88d4m2fk0ejtmyw8z0qwp7jtclrzmov82r95szlso63zmbdg838v32oug4kbybtgr52mt8n0aeqci0r2dudetr7as6dffihqjug42iagypwpksfwi3e3q5no3rtdk3sw64uvewf78i0m81o86b8o2hhx0d5u0ghqpsczyj01w8yoa9w0tq6tlor4oeth63sr3ho847qa3h5r8wei3kli46d79300ltgfcjj3m8l7t8dnakvleoe3irf1q2l8zfl9lp113zvcmdxxpj6bjftjtfawmjc5qdm2yijn23zj74cmeii3gbim1awwujhd1o1u19exzb8fpaq9hfdwdnufnad8t4n09cy6sqn7skvge0ml3cf43dem730odx0n30d97mzjet2c35v8jpr4n9v6qrlww9fkecjyiwf8fgw4l4qu9npjxqtj9qx5198apfq1mgl11mb3ijht04hfos1pkag8r5ojyt2sfnmghacobon1uu9zhopnozlso8z7up7rabd32i00wyqq1c4ps6ldc96gvqh2mstvdqhiws8467ye1uq855x48hcsq9y7qazip2d890yhm31qx8vdlbqpx4gtb5u0nvoz7nlmp4cpfuqzxsmabxlvhl8ryl0v4qn2ue8n7wrfq5qd9fprcvpl8dde57a343z32mrqim4dufgqhgkiow6eimcw5j3i5dm7o1rvswnta3o8i413329mbjvkz7ce3yaqb6h32cb8bym4uyol9zycvbfqxua0m',
                proxyHost: 'hdatlxzospuf2fvp6umveldqbw4fir1244mqitm2q8tspvvgi2l243d5vyq3',
                proxyPort: 7967879929,
                destination: 'gyc5l5ubh1l2e7fzb5hhesyjsp79td6dlazs82uhd4sn0ir0azugp1rjwce1m2852ddghsowrxtxk6j1atngi7wvz2waz86vrp5py5pfq2jzybt6ikadzbk5y1qa2yahjbkmtd73zkxj3mgs0f38jhx9ipvbzq0r',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'xnxfov8g1qx5yg4h9n6fullx6xdpitcmb94p6li11s1f9tccce8qr1sl9ydtf6tpeauim0dcv47kte5k0d1n21et1ptnxhimpbv8pkzzmvl2t6qsmagohchpa3ety1r54a8unzdtyxd5ui5tm24dpmb4hty6fzud',
                responsibleUserAccountName: 'gckjeisnxugnio4ilarc',
                lastChangeUserAccount: 'ts66e2s80xg9bq687xwn',
                lastChangedAt: '2020-07-27 08:10:15',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: 'w3joj5s6j0vn0xipy5pxe3il4vbx873hwukxbvw2f18tpuas6b',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: 'u06ztjgvtlxfyqiuc2df',
                party: 'j6jh8jhzxc18c27wlebktg44li5ne95s5e1gr832ouqxswlmivsxbz5bydqfk8u40omvee1ysk6mddhbuwearh4updfj8bnk95ftkp1afu3vo2bfl526v3a1xjs6qywz6f2c83vga013dq3ibyncnb0ptxoyfxu8',
                component: 'aec283z3g7jkb1u7p61qk7pw3dr375tzswilrujmdjyhrmc2qf4aoypfnwuaez20up5mdmszcb1dpstshh5lt4usfj8ik1tfnr6l5tknv6mreuvzgaiz896zqhdk6izo1hlz62pjv8ifrb3o9qjo697d9uq4rkk7s',
                name: 'oszflty2l54oz5tle6j22euwvcl0c744lu5cpq377j9auf1zsl1lyr36p3m78sgnmpi702qhihqvxcxpp0f7i94ckuosx7jonj973ljh18a51og7sy0au5a76hqc90z8zrdb92uzfb27myz5ja3ho94bjytllm79',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'mwlnj1tq07m69agdnowexf2a0jxkle83l91vxxho1quaab1hqv7um8sclgd6i5my274w07odsockm6u25ekzkvojjimkcehdtfy6ydu733d0w1rdk9x81sygwko4j3tug7ijb4xlfc17hhi9p0iips0f4c3qu3v8',
                flowComponent: 'wt6uknhjok9xzwr84mk3cyastjnfclnfsdu8an9lxzh3dbmvw9huqtgix5cqfypbtpmpidp82e5g6uz54poukvikho4bhnsnf0k9hf3349rv2u0ys0qxy4zrlnkdrcq7525tuin9l9o954o3vjnl04kmzg7wt4oq',
                flowInterfaceName: 'qufv0d2tyc2cl0n06phoxp1b31hhdkhvyorcqwjq68g282usxjn32353hrb3l1kveh6fp1lyugp9fstqkkxmg18zj5lir66o1ib27v7dks5ydo1yrmnqxf8pgl7rf83018zpnh5x26iwikm861kekp3i4aau2gb7',
                flowInterfaceNamespace: 'lyys5z3lswf7oknm8ug7mytg9wqi08pfq2wvgdmtiuavpr7xyusml5hh892asd4jti3rfb7cvwz5en4x355swx9btiv12osf456e527b4vgeuqzvcuiud94hhpkgkhn5c7m5o9xrjumnzm62dtjytbwl6egwn2gh',
                version: 'te1x6h97a94msb1l626n',
                adapterType: 'ujodmt2jtyo7mjt5o9lwak1kgekj4qu4ugx5tuuw9u4kmolhqic7cslich1e',
                direction: 'SENDER',
                transportProtocol: 'xvhl4rru79rd5rul8mggelkkg7lr7gng7kk19i5wh4n0pwiyqrp1276nej20',
                messageProtocol: 'lc56xkz05vkuh1dm507w69v77w20svzl55hukndrrqoorh9a1xajmus7r9bz',
                adapterEngineName: 'kqf1fwi32eofp42isilh6h9kwqcvt5vd75klbinzeb82fdr44g96d2qb3z498t8cw19ucoas69grg4xyztlcjp0ko7mgzv5ksl055d8m9gcd115lb5q29curzqh1id89fg2lxg2nw4flwd6k75ycaouw91xhelr5',
                url: 'y8wtiuwksxeyqs87w4t1h8trxhxk918vrmbcllhm0my9ljohxazyps5yrk7tyc5o3ttiw37npjmgx76ohpxy1ijf04zr53gw7klnttmzg31ro1b2fgymurcn4lle5ldzt9saypdczz83pfrhmhj6lwxsefjwgmj15vter1eslwq9xeiu79kcc9ukilg8q857mfthacj3mzwzab7sd83llvnejvjkzt07j24e0swroqurfhsacf7ffumszg5c4essafi4kkn3znm24swpixrxar5ywgnsohmqmvut2ankfa0rnpcsuvsszf8wvzy00hyi',
                username: 'fz70azox7gn15pehu2t9s1za9k2deuxdnvrw2jppavllfus69bw8h75zz9o5',
                remoteHost: 'xkvtidb5pyp6cq82mvwhsfk6fwy64kljrxug77vfh5s0mwcz5tov7ws60cx6km1orl2y9n34nk8hxemgiep3ln4utqkuquqempw5q9v7yroveku2e2vyiqw2scryphybymliumo2typfidta5u0iyxvt9mx8ckpk',
                remotePort: 9199461496,
                directory: 'h5ete3uprqw1450509owy2jsf2qyfzwhlcngpgrfi0ohc9h77wyu6b27f0ks77t8irhvmzkvgsvk6gc8wme8nwnqw5qd6s22qtg547m5hat8iujuri01bj9unzeyhvvwi4s7ggw5ebv20kxeqbkwf05j7u5o6lhtkzksupity0u9k7o6njyhf9cw6jirqarqjejttbm4j1v3c5afxq9oq3l8s19pnn786vhqqojhygnv9ov29cprg8ybbxkxllz7p9ed2uavo9p5gmmmfwvw7bo2sxsf6ldvi574mvv4505ecsni8fq2o6axw1qjgu5tm5xn6x5qo23ydpixgzrkza76cws9usnw5hfcgca5vu0uzlyaj9aekqgvww1qxj4guhicf18y8a4ankzrccqglixwjya8doavzda3f9cyx3cb6in5x7rt30y3y4apyey651plmr5fc3x55rdr12mjivdw104xh7r55c7ebwxmvxy4ir3sqri3obly9fonwft13pu7qz8rrts9dxtwy458shkas9wwmpd7piov8lr6i908z1xug94weofoxwjaqx7zop2npt1jhngt15chp2y8vvefpl1sfzlpjcacp3vgx8tqgh2bdiiricc83v9hssn4p4otlee64ani9mos5sf0bolrrhnrnjuqmx8saxknhnjk4wgr65bk9ypeg5d088e5w0oj2hl6hu7eek9dim69h1pi1vm7oit61q69i429g6ylekw373ns97x5okd2ii47zlw09psi8fb60uk50ggpj8lnbisaed90wl6g7peneskxbr8zp7eymsx5g64cppmgxmubp6prvb49ab5encnvpgt2fynv5qiexanatkylfdobbird976jd6vrvl4j9i9bh7dre4c8t3g9npgx8d81r8c0qek3xrflaojpqh4o9aw3cd56d2quuz6qg1x8o11rr3xyq9vom3ua42z8nt0xdokf7miuyb6p7lgghkmi6v2m9m085r1yszpeupj3faa6',
                fileSchema: 'mgwd9jn7xsi9iyjjwf83mhwgqwrhzy6b0uh6ntzibxefbioqbgn4l8qc7hzljvnvaqpfzzu08ms3s5znigxlc3uq5buvgmft1yluqfqr6rf6a4vtuni6s023ubmft6xnybp4sjql9d01vts1q291sgwhp4snohkxw572gt2hz2vavpr8y7172tj2ij9v2ouyx3i460yu1mnze2xvha5p2v51p2mbs3qgbzv6kr53ybd7adoan1pmxhf3b3pwg90wjzzllh5skmnvgzp6smojqu7zsrkcjc5u5sslqt2wexj4ee7uvkg00hieu5u2dn0vug5qtp2g26miqd72ht377g7c13opho4p085h0spjsk3pbvdfqf7fpdyew073ft5xptu1hoi48sgg9lywgh6jlrggn4q3p93nidz8qtmx6hsdv9v6b88vtk6has2plzays6f7wrtd131hbxj58ttw5h6kazqijn8oc3fu3jftzk9pyi3hrhqn6lacjmvyf7kkgck5nda275q4zi5bbyeta103qfwt8dchznu3tmtyg8w84sfjm3j6cq8hrmgw4yi7s86c5u1ovus8xhthw5143sfllpjxtxmuvvk5kxtxdb5z6om0oodbx7errzffrky22wsdafw22ee3ovkyznoj0cfjxyehn61ngm1lodwrbee6hgz7d05rwjowmjft9yvutr6l8wrc7ti9fztcctiu9s9hdoahz3l9yobwhfjvu2d9sm348hltxqlsl8q8rqrze94k07g09jm9m5zpwivo4ojew5zp5m5k0kse49vulng1gyzhpv3b8fz797mp2ogj8h0mwbowx5vomr8kkwhimisnaq28zx7j2tb4lslp3qa54fp73zqg0u82a28xh3cwhrnr4nso31m7oz4qycche1fre7qmrkda4xidlx00sx3bko3wofrps3yvmp7mbhlmwhlrq41epgjynmnjcalo9gfjsmqhq722qs5ryvdjm2ep88wvi0746e9gukyxsrq4',
                proxyHost: 'n262htxv5x2cw8rxzgx2lxdzkcl03fcfey8ightf5bpfm7wlrcxh6aenyihk',
                proxyPort: 4481668285,
                destination: 'wiurrvtw32whmmt14o3xt4v022vfdx4ysan5vv028qzwsdm2ip7bc5mfjxl6y7c2d9aze74m82xgw202fdl9hwy88o016yk8cbb40rl6d1lu24r6vjyea0qehr98rp28dul38cr72xqbgrqbho13q9z3vtvvmz9n',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '8zrh8zlg5trz17720d9g0neiyxtz5owp0frqdjtad05lm5s3d6xr5o1650alcumxernrilwjjkcer9n1gdfdtzyz2v2gv467gii3skthkef5c739fyjpnt88beqbqw4xgd2ywmlf21o6xroci1n1io6xmogjd0hv',
                responsibleUserAccountName: '77gegegjxnre9nlwona7',
                lastChangeUserAccount: 'v8cjakvstm0c8m1eu506',
                lastChangedAt: '2020-07-27 20:04:00',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: 'bvrvkz06ztvkqwguizv7fvlh7dnqwgyese7om433t8w6663pv0',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: '9ijiltl4v69vz6aq1nel',
                party: 'smf7cdxcxg6kyf3ffsjxmcn73acccvld9nam4lvvz2eforfur6f1h6t90olrxwm5qp10hxwq04rz49285paqjk5iadzr6wjn5wh1z8vasu71i6r9onxrvrexhm83kwoybaod9nf387ektlz7rjinczy82jv4ffwz',
                component: 'gserih7f47blcz61wkqfdoy3filk6s64e8eouxouvl3pnvw46i09i16ppfp8ajzcfzjmy89f6hbbbh573krrdv35rvw1wfje710e93t7dh96hilx2tlc39et2241jl5i9q17tydu5owtsq3e9nk3m9xjxtbxfvei',
                name: 'hellkkuizjre6eriojkfg1z4ho9xf9ymjg5x7wb22o8cw4urmhugxze6bs7yinpry6wit1grp5e15jf6eb252qo5eaztpkik3ct1bb564h9mk2mq234jb37b92y9x5350bsofw8ggfuvm5unsweep6h0nyysfhr4t',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: '19vysn2ijyj5lt5gov0i4ksu1lkezllw2u62sxp98wmkoxofc3a2vvlnlay3bqq3j90qmivg3zucdwik32iesw4m3xbaxwwkmcjqfc6al7l973q7ws6ymx0s4gyrm4b5yg41fwjwzsfml7r46fsc32cfvm34hz55',
                flowComponent: '5ep63vjjrr90lsfrxeo9oaa02962r5cvao8o0j03n6psdvdftuiyk0597443s1laj53bpgy4j4dmd3onfzv1413f8hlzim1t3ebloje951pzqcisweg0bzs5h3yd24p83xz2qsmwk0q82442j5epd5ytdq4xfpxs',
                flowInterfaceName: 'stgkip8geapqvqi8fu3gln3pg3xjl1sdwuk89l0su3xl3fkhto6s099vyy498smnsky0tyf0aosdlk98oz5pwf6mkhmer6csxrxzs3ov33mvnaqqq6wwgjyuhutixotv41ybui2jxzg6usghucgyjm3to013rmpo',
                flowInterfaceNamespace: '9sholr81vnoyppp34zxv25cxgz3ehhk33w574lzcaqu91hv21srhi78qb13jisf94wqnefeq8s9orb6lzaic8sx8jdwdtdjzfwhw6l9d0xpk3p91fw99teyuxjnoexil12xjd8ysa8xsp6tg9naeju9fz6ss087f',
                version: 'orgg0azk3knjld1x70yu',
                adapterType: 'ruopf9lblgah9bj3x0q9fc3zhi2fovwdnnkun2gqouy770vgqgrhocgxzqla',
                direction: 'RECEIVER',
                transportProtocol: 'phnao0c7vdnsotw0r3oys5mkrql46yveoaks8hycdzv4murwbnckpfznkh97',
                messageProtocol: 'kiov74vbb3i1vydvukuax66t0ehyn11m155vaa92txu9d40wj3lff2boflva',
                adapterEngineName: 'k3uyrsnx9xl2ddyonaw50lisc078atpxjlgvjr69qovhxg6gka7tr75zqyruy536jccp7tcvn5x352oiwcpq2km5qjz5b4q6heuvqu5m689zcfket902qhwyi2w2fuo1l26sqfmazjpn0pakp0zq87ctmc1i5ccj',
                url: 'lfo5lk2kvct4cxwgfvwkyib58mtwsv30k01neetv5cxu3ys6n0n4o2t9kls3fxwd123osix298rnqf8ks25wnk7f7z7n1hc7uzfgexfmifh3wlzg1pzbflq28htmtxhqzio0f7xia6r33grmb78pinaqxr56tht1gd8dbs2d2hjo9frvj7lwh2z9p4t2v7znfslh3oym2xm7tspy1uh042l0muqfw10z5ylqmwbqpmuxw0f2d96bllfetzjvh4akl66po9vr4uapz9wyqb0aspbmuhsgrt6e9k63yua3fvrejhusc673pt4vuie324r1',
                username: 'c4cj84or63l21aldpu7xlu9pk2hocbov1s4pjd42jeunb900l5xwtg4c4043',
                remoteHost: '8qnzsu7zarf3gazbi5cfagqhphxzdcjs7fiyhlcces9ntyw8z29535mg5fe76vnwlfc0ukefu1roh4nn5ijaiuumkv6ra3vswlmn00cq2n09gd7jiy7usignhhhqsg6phnmvbaf9y5x6gerllknw5xbksu8lyrvg',
                remotePort: 9508148729,
                directory: '19jferwml9iqdmhrpehxg53akejn7tmywchnlewmyv745ayqrvgum1u2lz0ypx6gpnvzs28dnyje5yt92v9rdi26xso7uwdbpq8gvkr53hkg7fwq3454a4a4e2owyudsj369dw4nydj1z1z7ovkch895amy0nyeuwpa7lt231joxb407ylcgox108o6ctmphm1v3cv6mcz6b76p7mxqrb9iebdgnsw23tv73ddi3eqrtizemrnuzaxfflj47o6sc6iy53lm9z1d5qxlds68voyzq6m2dklcmc8gm984rkpgkg03vibe8209rrq2rn8n4omoictpumb9vfjzq7bifsqjzdn34efsv5saoo26mo3xu6k1qe7my7bdm8e5ebqbqe8rpgm4z4qs01oekk8dicu5t88408jb7ds2vhbyedzwirnhpdymuauk7etnz7ncr4nhnxg5s1lz0326sst8wbyau9i2xkstjiadh4d2elervzowcx406spns0qwx14ipi41myrzggei7xeopc69x1n9651m6guz3me2at6dn7bidbppxwaiqqg2n6qewlx2pkhhg10qtzkb4car901emz23c7h3w18ur88tpz38u53hq12c2vx46xv529zsmcz5myiyhmz1wmbzubfoe53drpbwfbke6rb3q01ub1zq2z2g75xrfvfr9t7avg4hoydq1qeui2vu6qg59yfubxvhqzkl77r3pj24lyhd2flstbj8ttjkmdao4wue5cck44gi2pfrh2fooagozalk56ezop3mw34qyq42hc37ff91lu0niczh407wle0mhm4upwxknclcxvq2nhonmy2ij9fqd6uhehoffselypu7laco7vk8yzltlswae6zshft4mmokwovpp9aq5sf875ww2cpd7jwiekdhb0gqgrx7yazywm3971gxmcdb1w39syexnajmn0xk473y3i5malp74hjd6p7qp01ji7o7bh32juh5rfomxjenuown04q4ywjcze7kg',
                fileSchema: '3lqh09js4jksrdizaeu3eayotfqctsn9m4380zf9kko2pf3lzqohfvsd7l6izu8a3k1l78rp27p8irrwrkk3ikozv4izvenvk2kej5xcvf4wxshojz2ftqd5rny48fzutls1iwqvkqwjedh8tawthe98lgwxovrad4aw24vpqazrsw2gtwx5f0io422dezu5177tmweevacu951eib3yx0wzldjrwsq1rvjsc3jddzhhvpgzn1w7uqzdetmg7jtta6k255vktx1j9zybsmt9n1x5r7k8neygjhq3hvhj44pudb388x0zj1jm5g6owcdzaui8rfbnm9nxg9wn508o7utbikrtbaekjh01wmkjwtkarkuuu1m0k0qak2oxelujyfv3o8mq6p65xt6wjvo02ayvapsnilo2rynit27otwkl4bqw14wwzrkp5tcz55745cht00mgl6h2qrvxhs2rcmngnjc19455h98vc8vpgpkktciidildjpi6kayiu3zkfd64p0dun9g690o3bysjno846i21431aep7vx0mw0ix5g1rl0q49p3paoxvd5j3wis1c921gef0n1mwdvwsbr9nzo02kge32nrej2agm06hliliurfxr34ax80air38eaitztq9f6983bbo90vv9uhxvuo1yhgwywnirlbu1comqhxzbvr2dnf144k7leptbm1jf955c0q6hzsg9jpli214dud6py9qv5smy7ol4ifm0169qbkosk1m6495f3kts7feedz9o3qh6kf3r3svwctg38gtf92w2yujw13p8h2z0pa4jc1h3qh8cdlhz94iwif2dm3bzljp9u1m8p5nbr8xg8oynqtbh5wxpngrdn7iv8fmjlsx7pbqiqyp4qxpb0gm3f7xitpqhvx3u4e9ks7c5yqpayp07zpq2086twwi5t0umbataonochyiz0l7fvaxj5zr0n0vwqnf9l1vwe7egjpwwnug44o0fw3rzub0t8lu54hkmpd4vq71s6gdg',
                proxyHost: '06m1t57n84h4c5rzavl0w863ru6210x0y7ji1lmfu3lczpewvgatsqe4qsjs',
                proxyPort: 4717870580,
                destination: 'eyqp9x00qky6whpmiofnaealzmghhu0gs24499htmsgvmlkjiymbgx6pyff6fpsw6u80w8623x1xqaj53oedb322206i3mh5bqcaieb0uu0tyiaslp4gxaivs2bimmvpzdznu4k5swqmcihnji91gkjep88jhvzb',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '5j9o60nkdcivpl7ninoilrtzgbo3sxdpji4j9hb7wt93v7hcdd8vxtn5ysveojfbslri51fa56n7936xw13zaqz9x9x095edy324f289aamrmiu7qrodiunj68e3a5ywdyetokl3ep6tpu7lm74pr8y5cbpzt3ru',
                responsibleUserAccountName: 'igchq8w7dgxrimt364ua',
                lastChangeUserAccount: 'wyou59wshj8nrfkg3jje',
                lastChangedAt: '2020-07-27 10:21:16',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: 'ctzhpi0yqcacvjtcp08oh52dau41yqn9yw3r91q23ab8d6bwsw',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: 'zgn66b89t9o3uyfdq3p6',
                party: '2pmh9nt7eju87e46nhtwcu30p928tlrhqxq38ophs4zlo95vmlxeszddnr27oiyx2qqtpltig1jxgzeqfofzhcc841r2qic5873k25fn5a9qmns9vqln9nm7u5s0tsuarhg1n3k1dnteniy5r9pb6hc7u9sxwycj',
                component: 'axgoq2k6mxl74e6dmjjl4xaxpyiaa53wejlcl23wu487mjyh4o49q5d08ius7yu6tfl137c863kgtav7sqsgjg537pahgf9prxf6m1fty823g8u0nuxp0mfd796hu9lyybc003g8ydypqgc4kkgj3njalvr45vs9',
                name: '2rd07dwvurg8a2vk5kef3rutbzli53vwih6lit7tplfjhqwucabikn3s5yrhopodjcy7rfe99ozul1e5aeypogztfp4mujjp5egzt3w410pbvy3q9azhxs0s5jbho02q7y3gfy69mp36t6cfkhoor2pk9y8ygehc',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'dv7ba1mp4m2psa1gt68bej7u9yemszi0uvki3phl1vfkv03bkkncqu5xz15gr7fylge6cdfwua4kct3j2scdkgec27p88tcin98kqitwpf2kqan48xf1p3kttevrlpcayw3a7p7g1jlw1k4p8ft2tgh1hbla26vph',
                flowComponent: '72qix6tl699szm4jodj4fhixu8133gkb6rixfooacekojiyy085ewpn04u2996z3hgq9qazgf2v5b4qv3vkiutw6ha45zw1x96nsmg5dspttlgnlkprszl7uhlgnqcq9sx584r9c0hv5ayngpjkclmjlvgtsj8ko',
                flowInterfaceName: 'g1tbszyva77pcup8q5f7567otdll0qcs9ic0eevdpsma1ol8gzzdzjgpz1xa2jw10x6kurtl53ru2wprdyk5eyo0uahuribcrixkjjvi4uwmvq2j7ene8agzy83q8it6m856j47750up6djotywsecc2flnbu7mo',
                flowInterfaceNamespace: 'kwtf2ssg2t28edv47x4hsdnxjniwytvgau7la5dpgmzzctpaez6yx858uk0676w00m0cuee2ar6e7ouvovecws7jsw41juc5lzx3y7gqgk3aj8ussed9k4xe8p2dyf2gutfz42nro30572glmy05gpoq9jjj1zog',
                version: 'etbkrz6ytvmo6i7tlhj2',
                adapterType: 'owx6drbplm9xfdn24pth0pyeu2uetejjz8ieh4v2tsbaqg039xj81hx93zas',
                direction: 'RECEIVER',
                transportProtocol: 'k6qy35i4xg05fzgsyy42a9zsyh3jmh6h4a2w6h3ysdgrbqkvnuy2o3xhn8d9',
                messageProtocol: 'w2cjhi05jkkouyxq263vh6393xdl9wkapm9oqqn857dt2wr0l9u98wnwch0z',
                adapterEngineName: '35mlj6jbevqwm98u0fetqz7c9dz4wn4v4759mlpfjizbxj7hyx36ffgvqmb7mjccyrpoytv47b2km5fx22zq75puljqmskl9i15mf99ad7mq9c6y4gtrugj1dm4yui91epwpk0y0y5h1kd56jm8zf850fi5x05yn',
                url: 'uejllqcttmz63f2i0gkqmuc3wqvn43d2ckgkexa1222t5a94agbwlvpxx7k56o24t5lqahhm3qjk8bx5frcr1vt31rpwztuig9yzbsynnuf6tyk7t63uysz16iminvkllo3vdtn3xecx2lfqidr65r9d2tt96a5d16uez98u7cd2hm4jwfkhav2pinrsnj78we4qkjjr0rssoem533ts0itwmt2715orbme7h4s9yysg2tktgdrpbf6efoguchb1lxtrvs3mvhwdpd4i5phzy0aqur5ek9g2clpntx1wxsczlpnxmkpu171sd5pw092x',
                username: 'qf8ehuiyxyk54m3y1y8o3kb2xs1tmek2zgokj9c3stgnjib68cu1lk48c5oj',
                remoteHost: 'q771ldw6o1w26cnvcb2aifr8wv7d5mg0v0c9rq55mxryjhjm9aqe7ghz1tx4roovsyc4ou3t8x0fbyk41nejlksxdsl305eaxm45mzbod5wcf84v94xp6obi623wgh2du27ngdtpccdb8g76ygfdwb69h22sk680',
                remotePort: 3303610901,
                directory: '31fonvczp83ogcqy1ajvevzc0fltx568piocfmdszyvxltzjnriwr5hgvya4gphzjhec2pfis5krg0ynz4fenl528ec8b28yx4ywavzxtnmshzj0fp2bry74oauc0otxoph3cab7716vqsknbsima5k73zrehhy5uq129qcbbn1xxzpsrwfui5x9let4jnevs1n1ovle5vdoq6jd5ekfilfogoejqritiwv8lq79spr1w5gwnmsdifems7wa03aw0vkgvkup0apbce23nxv93kjqxg76i3mm9azrvtbx595phjayobdcjeaqoygzixxf0amzyq6djxdp9dcu17wifoj03ifvsk8pu1z66d9rmt2py888169yzkjk5c439kdzo5cwvbf8s92mwnfigesdsnxc1hjh7j1gqphyr3r8qokr5qhfllugnc398dcl7vkqoaci6dzblqbbijb2bqgg0lrzj3m145z981gs157pwgfoqqekmh59zd62fwlr1nawma1vndsyowwu6kdk00j9eh1g6d4kv6tabh6yjr5h2pru7cifi7nngtfmdaxdgeffdouu0e5pn2bdoh5e2fbgyw2g1zzk9c7orr2ybkx69a0qq87ewvi9q8dx6sxqij8mvvjjzndgum976d7xolj8xzjpcfcidrrmcm58rn44kyvlufe98aajlyscelhncp00v3a8pm0o0ho52wlorq2x06tmrqe7yllv6056acninr0qfr7cgug4xy48r2v5x6zoqeqjo2ddbsk0eq623p5hk3x123hwt463tizh6y5sy6xlhnkdmpvf1jqe07hc8h8f4lao07shbg9psjpu2e8s9vp9wwinh3hqbazpksopfz3bc19koztutw3lfhyfohquvongs52no11tsif3kfn3irwtxkasaczuqljl41kkjbq0bcmeft41kmao5k1emoix7c92wiwc6v0uejrgdmtt2en9ejtvjxwb4q23f68src4imkvyb0zh6enmmlcu24qm',
                fileSchema: 'dggyco927ew4d5wb2f0bfkij0qefjjfo84hxqm1ey9u86xno2of6240vu8eh44nszg7e68h2p2ve1l68rlqpi6r7g60bscqz2n9x0lnb1qo4f7sk5mlii36p4fmwcop5wo70cvkovc6t9hx7silcupx4z1w7qejd1ds0n9ilt981fa0iqcv8d87sasum14lz0ljnvokzonyqk8ovfzpdy8aophhf28dpwthqm5da0mmvfwcjmtajsmtpcf0k3jp10hkbncosbwnfuichtpmio7lb9o9qv6zhv2vlncbd3gequjuwk33kwxdtvmxo9sxsq9gwz8c3vyzqicevsp0qqzwegillt12yeoeopym5ypcquv5qdfc88uvu0r4as7fhmvfif0mrf360wg7b1phhvpw50zd2dbzmv9cuc4kng9tksp6gej4fotmqo85z1tzolgdijnr101i1k0oojpzcgpket0se6bzgnmpu0vknt7ii1398n18decdnxtgydqqrwkqua2t4hic4wfr40cs3l04sl5012is1me7hthzxf4u9b34b53eneotgc6y15yqshhkjw2zcppodqt91gbavf3gykg4scm9sixws1imdbi221ocg43g4h4v7ejmihtehftcximguho4k9ecksj4khnl62hzxhbpabil0oct6v7v3q3jz10151y1ks7g40zerak8d9ovwyluajvyopsygw1pxu0fzw5lxlh8t1kh492p1a0plq5ffjud0trxvn7xdy8cp0couonja8qq3wq88tzr5jt0syyekxs3z9lqo6n3dw2zohnjtf5o63u2mumyh4lmpbwp9kbhslqbaxl6325zhjdlrzkrgz8728bcopgxb6tw6ronx86qs961mj4v8phfl6m8qbap8c42j0x89mohl9m1p7teuhed6kxksjbc4lf6di5hwymjpa0i20hnxrehoubpp65yje8tcc01dnfwz88ntoegiv3bh09v70ysy44tibgonvkjjl7oxi7p1',
                proxyHost: 'xoeqb1oke79o9y3oswmry1s557cvl894vb8ue3n3bv1azf4ho7gocpmd7w7z',
                proxyPort: 5904226698,
                destination: '7folttgoeg4f56n4nozo79a2ojhyj3n4teaf1ojg1qto6aoc42md0gtgb5vmnt02epm1fh7hl6yukfwsr4jvmdcqg53anw1o097xlqiohjhux8dy4ema22xn4uznj27ytm3ifbaumzshhp24tjow7dmyvz0rovs0',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'upll342sk4l9eacll4upi97he9h2pjyzhbhbhu2pptgnkhi4jqfy2qfi3fqu11dvqnc4wjx323ddrqkdmot9t0fnu314uwu26ri6pey6csu5ko99e9ejnqrdvksv945tw90462l46g2z3b7wgvt74reql8rx5dp1',
                responsibleUserAccountName: '1hxw2buwf48ca4pcl5gt',
                lastChangeUserAccount: 'r8re36d5ykugdrplki5i',
                lastChangedAt: '2020-07-27 09:05:52',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: '8vxz9hadve7rpih9w2bci67j6r0fuhera98dqqwa9uw2bljo7m',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: 'myda36tgyfny16klxzlk',
                party: 'nyr8yvvl821q5wlkytuyopql58yszd5srjhdd8u9lt24j92zboa9wzwvt9q0mnc8e9qw7yjh3j6ipeb0sciacjoooelg8ciou550vtaxkz675u8x7iw3cpfs7ko0c8vgxvy90fgalv5y4ezp0y95m7gul1nw2250',
                component: 'k08eyfwmsisxyv5wix06oogkldspxaej3rvk1n29gbs5u3nd9ajnevuye9zae7cvtabfse2we9bvqg8prhdep35trfuo7rh8o9gx4qmphfiiaji5c4m0q4h9jzqhdsfx5tuw2k92i9aj9g49n3v8ywopvit8cmov',
                name: 'vjt10i93el2r4mfxv11zf79ja3zm31ts0afbhbr43vmdkiuw96vl4im7xrdfvo6jko1mlfv2wnlcchm43rhh8rddit033o9d2u9p7zeilniu3ryl9dd0qvwkhfmfemyx7xj5ouhrv9oukb0mqobsc1ilai27k7oa',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'on0uix9d18vxwd4p2zhrra4tp5fyj12dx2e6rd1atb0ub7b1zdycq8xxtlkcllp9dder7uvjy5n3oiuwybe6oyo6e5k4qks5dxrppt01icoloxfoqzq8480g53w6pec9subh8w2wsc1xhbhkhk174loyn545g96z',
                flowComponent: 'stiwh0i40q3ld73fvgzwp1opc65xt2kcoicoav3uq80k74fxkjycvz5q0q4j1c5g6t9ec7iif2ks0daglmki9xjkbibcgmn1i2qsahh330v3pl1nfdlkz10oaje2grqo5ssi1zoev4pd1lghjvhsjzd2hcosbq9bz',
                flowInterfaceName: '5f4d4gmq16zf3n9krajn0w2qx0q7mfvbwkerebmzj079rbnveqfyc2r5yn2cdrkkdglddnt259wxen7omgyntag9d5mndkslem34l6hx1ac9dn3exk41nf0ggmbuhl59v6l2anqak91t91enq1fjkg0kg82rbt0r',
                flowInterfaceNamespace: '0rgpzifs4p0vh3np56u0jej144fuhn5zuoecn9jehfpllc3mx1vn0zyt6lgghdhihi9tpqgtma36gknu2lc3makfpnbx67p64h48m0g01oc5ctmf8rwl8k6w5zsp9wcffxud6uaqikg1e85ie9mk00tiqpuerldf',
                version: '99vk2e1hy3afwcd2a2ez',
                adapterType: 'bl4i3gxhyh1jr9vl4wrql25eptwpxbwcev0joausdqq2iffy5m2fps02cvjd',
                direction: 'SENDER',
                transportProtocol: 'y0r4f5yil7o0v7qy0xt1a24ozjdemy0r1emy6opjjxerdnvhzslla6i7kryy',
                messageProtocol: '854b8i0fudi0dd376rm8eltrza61cobbevuvmbhwpzsq4t0c6oqrn2bepqa3',
                adapterEngineName: 'ewbehajqwmzob6mv5y2gew767s3gr2i0jlw6qriwu1zb9mhcrpvwp2h1lwbya0s441n2w9fmrl7fxd9sbf5qm5chm14sm0mfd6kuykrs98y9ff4cohnjdf39a4nbvrs7bwta16vbvyi0c77dst99uj4e72ytp7d5',
                url: '6qjfpu7jfwi5ezwv8wzbh531ub2u2rtouvahqyk4ojj6690qeyh4sqnngi0bxwkj0gnr4ar3ogc3losaw9xxzb0r10dd28izpae12j5ot4ivhvmnfdf8gfj6cwxy3hyz9l733pb28cezx1xx9mdmlv4g8wbmf6ofgmgvv0ly4e6bk9b3fafqf32if2mwkjv9dxheubwrrcpurpqhydpzzvq656eq8mv94khqddnoyj61ff9rt9n2g5lyed69j14s7v8t236q9lezunatuw3xk9gp2e4u9lz10apsgx7fqymp0vln6wpb2327c0jqpser',
                username: 'iubmlvveys64zat05kp4k13asjez1okfv9q7a74hpg9zzfzdqqol4sdtxhta',
                remoteHost: '7rhz3g9eg0jggtg4gzsxoeqrfq5v5p1hu9ppn3kpaxpoyfbayks3ooaji3wbzsbscnvq0pk5wru90b2yek3p04ifzisus55qwxn5o7i8mkz61awjf00w2d2fw9jls0773bldcsmx4pczzly3mc5whvivukbudd52',
                remotePort: 8628555985,
                directory: 'h7avwj88ntfj1cmp8af16yfnd0btrgdolh5wud1fbawugsnafv5u60sgmrs3ws8avcl7qkyagusnlxnfa7hcqgyvn1cedm0qpdzwd7prpeu08fgcdvbtubsf37mrvh2hk30u4ve5e6qg8g3qx10whhyieuexd1r882j50koi9rwlpiy2fuunl3pmtmh1i5e2c3x06rwzq4onhrrovtdmvi6g70bmyy9vqwtcolmp3mjx5biik4uzx692bvy2pelsgkjv4dzy96lwqoyepzdwfq5qnmmruhi7h85fqxgvg1mtpjkshl9g1j27zsctcg817rslpzgafafkay1pbi3tvmutnenfaonns89q1uowwrovni2ua8zrrargdxjgtl5jhla7gueuwgtp2ojbry9ia1h5ols3fhgshdvg6vz934e8j1pjitresqyghim4j3wcxd8fcq4b95z1n18ahlhrlach9zg7yfi59ru3xxpqgqqcnjzfgxb77bzv0wmpssiqiatgtnwgwpr6rx7xh77e87hzls6cb6ol6uwl64qv0bw5ayop22bkapajrvjko759f3a0t7i5efh0v5cauaw4c5jwg1j7lbk56dpb9b4sfi8bpme6h6k37yr1m05iymnohag1pt0usr3ssfezf7iilpvxzf85z8pq3ntjsvffotjr5a3wdhnbs6pzeqfincpyfh6i6fyeow21aporllifskfa6j3va9q987o848np7rzs0a6wbvxjc368rvux3zh9kgyzk5y5odr2aava1lqz72rfec6fefeml831p4vyylboi65tr9vgu80385pibmjxbbnu13vewm7gegfjnieixwxmbuoz1knu1ckvg77vbm1kszxxw711phxz0c7loyz0gayfz99dcaatac5kwc1rupgg6mqv74n82iemrq9dg9resrha47i2xpxgr2im2vuubvivhoys3ti8jh7ypsmbla56xk52rkwhh55dx2yorrlockcvckavhv9a7545b7ds',
                fileSchema: '0w1xjicpkzpxpjecukano18z0wzh8t8ufj0620e0isjxtrlwk1wqphvrreuo7ie6a1oghk7libkjjkilny2w1q6qy9os7wxaro3w0ndgbjk35t7xrtc77ac3ld8q71ovbio95bng4g4a6oet02chwomeji067xsa4fldrz0hfrqkm5jbqyiu51q6n77toxxiass91ikjsgdgtdyyhbgnhu8itwpfd0sawivo0vwv5jm4x34bytz7hy98u7ybdf39g8lvkf5chy88kftujobio3oqlqg4n5z6cm20r2ya2ms1nt6cbuhbcig52w4o3n7z1xvm6apt940syaphn2mvasa5cbjufbbdyhwpipkvsajt4yhfv88yoyul37bgvupgxo79r8w4ahyq46rkp64xdht53gl8c10as7zc1h048pl01vvsq8hr2ab3b6u9fkqpfnv79r9829jb7egxejkgjiu44hyl3hmm31msb03rcru0v3v7fkg631oi4n2ysetu4muvyxi71vu30obs8i2fft4f3abpv0zmk919jh40itjg2eg2m6bxb7j32ltutxiiq0yu5xhp474f74gl9lxo4b10bspnvfwr6dvwb4wlw3xygda6w2cfxdhbzh7ten4f1vmypmrt2jzjk90tamxrzsmi35dp71ee580240k3ti7743tladk5f8fqiu5y1xy2bxw41gojkmx96b951et9ew2xqfl12uzsmq6cj9n9plitogv8a85pdb120c8eajzzcik7pka35lihvxwpuh8k8p9iagj6itqd4dur4eh9meczm6aesth9iwq74ecjxa1ftq0gkwf4pgfr0y346ozcn3ln4i94dbp9zi23qg2v9jn9qd3rda95y1vdu2uizfe6vxt69quk9kp1rx3jlv9hcxxg2hehj3ebq7to2z3qo3tiztf8g80gn978auu0ky0fi95s1weph70npvdgrikj334dkahhbgvzrgpgj15p8qwfgot1jgqs05kuaabnq2b1',
                proxyHost: 'qnlksegcx6xorce92x4flbc9kpqjmww7jwivtf1phdcahzx32exk40wbduuj',
                proxyPort: 6261331442,
                destination: 'gedef4fk067ksgdls4z7txsipau4rx2eeqov3vbzmdvalqlyexskrczh43l1q85lq2dp41ffvxx81f8k8npgy44lsraaodt0v303a00pdap7lp7s8fkbdqx7l4816xsholt95a6ff6zik2wxsyndt6omim3h4t36',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '48b23mcseak4rabkvyrg243ppduo1dazlq6hmp7niz4rzxksn2n4cgjncz22dhshmclpsch9pwv2e4h4nxoz73i3px4su99jhk858b9b54cvfbkfrdmoe2glrgif6yw63my2fdqcb1qfd2jn5tfbs34mm15npeum',
                responsibleUserAccountName: '9qy0guyzgbthmcy6q229',
                lastChangeUserAccount: '907pphntt2e4hga0etya',
                lastChangedAt: '2020-07-27 21:58:46',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: '4yjqj0jxxnuufydun6h3tsupbc364d3v1bgmrt84c7baiahwi8',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: 'bic80jqbsgjtqyhxpb52',
                party: 'dyd6kjwiz1ej3o1gqejult7cw06fpd22hwc7jgabuh8rjsxu9zzc2q9b5v12em393acsnar621qg1kc0fmffh8neyd6dnpc3ez9njl16r4luya938glgeg8ikuu4gn164wdfgr4do6pgnnsexyz3fvpc4avv27e1',
                component: 'cxuuthxxu7pdaizsg27gir94bm6imx1ayj3zvthiy3jhhim2v9u1ls79iow4pnt3s7unissif1es7b6mfu1kr6twocx5s1g4tn1l9f5b7ooj4h4joifji1sb3ylu0hicbvfa81486jznbz4zkgttod4p8clw1la4',
                name: 'thc8yzpjcasacprmltufjr2zykww8pe3w91ge8ol970npt7u7etoys6l0lakuqqq0xms0fpm2yee0wwrf7tqoyr6xsn9nvn0472gf7y2574zra45nhq5erg6umanujxi21mngm1wh7ghkn7z3n3uuo6kqqfl17kq',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'h8pee9qowflb068ga74rkbr002a1fhtq11p4jpfchcrmqqmt888s88hmkdhx8q1dxpstydx1llxwv4ijf25jeke6z390mu2j915qlvruyd415hohjj2naks1vgtbe9nmxf1qhxv24gr9ib63sn4738d7ez1drn65',
                flowComponent: 'ci4g9y3k6549k75rgaikvvmhqaectlleu6n7pk1hny33zgo7dp8v9zydeqp8spi2tzu9wa9hb8ams64nqaadvi16d4ju8rpu0bk3zo3iri27fjdz0uefvf0mvj9sceirnxmi55tot0xwruyrvk8g4cyy7hzfzwee',
                flowInterfaceName: 'bsfne8zrbe5vpfqd7elsn6hgb9zer4rdv2yy7573u7ertn5w1k91u8013zlyxw0ifs7w1jngcv8bwgivr720i4w384btgmo1fbuoyivhseb61ksnzw8zo31deviuagms87eujv1gfngghhz0yuui82tyc9hw40p4s',
                flowInterfaceNamespace: 'my6xusp77ac3w0jms15lozsnlmt6swqq65dfjwevq7935fc05lolpa3z7lbgo6mcdb4upufkiiywqv5zlj7ael5t16e4sdidlvbwb1fm1xilb21yhp5pt8gqyjkekrm5rtsrye0xkq1yh8s0lotl581hwx00wa5m',
                version: 'wa9c29gg3vwjp6ux8ixm',
                adapterType: 'm21yhodqsr78zodh0st1j7d8tvm7cg6wo0xj8j1izlmdyljbx0srpbrf6719',
                direction: 'RECEIVER',
                transportProtocol: 'ceuf9m5ev7hhrsyeq6zqs5yfsq64pohd57fwkh68zfj2wkl82vtdrqidpgp0',
                messageProtocol: 'uxywkxxb9f4m6az8jp0mr2jxxwkz010urch2ndy7lac1yhitpw074v074nvu',
                adapterEngineName: 'f55j0efhcgiy84grscbfo4mp8prous2fq7hlfspx5tc88d2wrwkyy62dm06pca5b0zamh9jhb9j5y706gmvl6v4c6xyb8w1vrr2woda6axdc2ggyx83xr3l33jyl2wljgc8kl1d7hjk36wq0ptf5qwdui15vux7u',
                url: '4abg6irxc5gtmplwdf5wrjo5ccbjdtcrw5e2ags70q5olian3p5m7sr1kif0auu38ozq7liwrxg0g3y8kny5ema8ivgzmej5ds6y48wibcnl0f656lvahfxln2n0bpgrvam3hn3uvtsur54vkkpmh38o8gag8tj6j6mgwhj9hfzps1hlhfgka6oirgfg2usm2v64n2pi9r5fxrm1d30ad07oyn9p9d4cp4pibtilqo52sm1axkdlxhe6pl54wjv53dkl35r9s7g7yiy16z1hz0t1hn4nops3tpkpncird5pv5bmhrtpcss3j36bi11h3',
                username: 'hxlddi5qs9xon25u0jiqjxto0q4q8fi1n59gw1dhkmtkrnciac1jl2zd5nmb',
                remoteHost: 'h40pbqbwcqn3mw8jamob92l7ak031x470p4zml7cqjek06zvsc2oe4nxrnlizljfc8tz1thviywga70d7pw3hh38nx4p116w1543yfj73vjl4x5ky4itned5mpnmfgtc4db2ujohuo4h5235u3uwzwwfrxfn9554',
                remotePort: 5155008836,
                directory: 'bqf6l80giekcdpda885npt36gk847o1htfyjl8rjcemv0egexg2ebv2cwvkm3kivnschcon4t4h3567nyg1mqfenoxq20u48hcg9k3nx3a91z15bxmmk9bqg1egqmayexlmtxcjccpiwdr8sxtazpco884etpk83x8pqgg4w1cipz1goj53saofu52tvpcprvutnv0fua94qg26t4wf3xd9z50lggzanb4dt6glkynew0pk5bvwosxwglz8n5fyi01pibrk7u2qwonxg7qu9v9y5fuvzd1xoyckgzfnoxs0lv2u2uwl632urnalygi4yuakh51lyw8eqqmommy21yif7dxx50jdpf1wc1oj28gsiorpecmzsncabwyux1hjxrda3abktuh3u3kkiar9sg6969d0v17bvbhrf6i4k0i0x1nk665u9o2pl4gvq9ltxpidldjp0aa521sfmv7jn7d7vfj0n0y04uo34df6tx1nnan8naypktxh7vbakus7cdnsm8uda76qu4tx3gzhf6f06yjctyg6t7jvnhyydtmjvfkny3cfqtklwe0wbkel6txgo8lbvushs9yings2jrzq8340omsdae0pdiouf85hd8w2aydngnybu86saerlkuxw2l9tupurz7i43975de3rq7ws24eacnukf8ihwmfg585jc711yudvri8pgogsfuir1w85mlyd1r1h33rm7sl6hbw1j2ydwz2f24vxff9ykd1nli8r99hx54fjoqyl6xmu5e1cldcbdfp3hy2xlhzwyeczi6u0dhs1l56l3wrr36wz9oxx8xwu91yp4dc8thq7yfm6qyudq9poftu2kigp5rrwsdd0r4s5te15zzdhqv3j7a9s59ulffe1d1vjlbe32tpcfhkik3wadezwklcrmqkshu2clyg0wzc6wnj60crl6p2dbh0ilxk37fs2iy8oy6nvsr9jb7c078s30j8h3vxnm0uevyhb8lvajl3bo90eo06pvpu91day1yqeh',
                fileSchema: 'byqclmew487gkrdegeyy3aa5bl4uyk7vav0bx5xztfc58rh6v8ygvbhw2137il11d412j34e4tbgh0808hpfsnmcaymtj10ijje8fabg2iy4xkvt9idzc4o7emjxc6u4sztdma6actk26c0mixq1fm61fhcpjzjy5yy4sk936r9yf4gxm2bs2b2ei5iwjwoxc2hjn7avb90nx3fnedigb02v3x2wp42buw32utal7dmuqxmv6dusxg8w9hgcyugt35d1ugzflleektm0wcrxixzjd38ha4eywllat3o2l62syc3svp2n9hv1e6voxcz77ni4nqrlv875vedc8n8m18n8nukxjbyeqq6qsudbxlkn6qcj57eirket9m6vzemye61s8h7ekgj06hm5skdsgvn5rrwa4zhrzr35jz4e95avyfrty8n4zcewrx4seunqyo3b5gldb1pxjdm7h8zdcfpxso1h5z0f8v4kckqn9gy1me8goz8v1qjdljw0ph28sr7w4yfahye3qoc8g8oxfkgu40arytxwh4s8wpivce2hfdxr8lzwn6h5ifeydsko8jtuxrvigrd6vvf3hbnrjmmwwiowggw7pyu17i8cwste32pycr2gahnqvg510evu253d5b49yrnntm6khbhhxka34ghxtdrxhkp01upy66p7gfrajwadlbkb2owayk7jrwtsh4eefq59ocybt8b7o4bhbjzpebcyvl14s7r94t8w64sd5facar7jza1w688wdudsb33ejipkwna063ptpguofb00ny5jh7g8tqy0ogxb2tgaa5etlvong23rm5c60fue173cqecxzi32xpipj23kffgouo72l0yzbw9c8wk6oqaefk0vwzo9lsmw1rorncgd3k6r2idboxzcxfptcuy5ca6vye26wta03oy5xg00l1bxzb7exotetxox3y15yclkmv1mrislyvhejpxof4ljqrh2fngad2804ok2kejo9tmv04tfhpvatx6ozz9w',
                proxyHost: 'ciw7tg6xdhga9yl0jva2svie0pjxli51izx19yxb9ru4plwjt6xn96tm4zzf',
                proxyPort: 1896059839,
                destination: '9liyj0eft64xknwih8r32ybesfgti4vl7vv4xdgq0nd40l23g6bi63hmky33y7j4ut7yms4thbc9x4d1nq9mu1v08czbn7s30kntjcuk0lyhpzsf2an7wbzyezocql89oi4nvnernif8751vq8u6wregyj080xvv',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '97tq15hqp2nxtyi21p0gldo9a6qnstwtsdyjysnbvex4w7r9pvavxmwe39uhb8of2wep5my9oyosq9lyxny916mmvqqd9vy4b5gk30fagpqfgmpqyzf2pythnzu63loc4px600i3xwko4o7s2jwtzoz3noe3s6b8',
                responsibleUserAccountName: '78q0rl2fel1etd622fyr',
                lastChangeUserAccount: '2tupuzitl7mv5xdoj41f',
                lastChangedAt: '2020-07-27 06:14:14',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: 'xcxmdhujex6ztjvwqfimuymk1qqn3gt9hjiiemqn4yloowtpms',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: 'k5bbde7ytlvgjbuikq5g',
                party: 'xnsun7pqkkyty5fb4njw09m5ojypq1bb6lngrc8g2aeiiz03lri9e3kndc4hm35y7yy169ggftgznxtfvco9ofkzjc872eqv2qxrdx3rlyhzdlu1mvl1864dpv66t0bd4eaj7um5lbj9wmyxwfrn4m50eqslyju8',
                component: 'nn58u7ks5r5977ico9fu3oesjkpc88npzxpf5mpka7x9e6sfwkvdmw09yrjhey4x0q4q6h9b0qg9ps699u00aq870wj9r1unxqr46tp9gdo8h4epl6fv4a9qb2vf39pnf2souwdhc4e6ixuvan8fapizjl7ko25w',
                name: 'dmxpuull2esgs2ip2ezfzl0nucs2g2fclrbdn8vjtjtbec5xroe2s9ek17qzkcznvrsgj9jrfrsus8fsqkmcco0godyhh0gc1aywf8ba6joumuax2zybba9ly2s3olaub8timn002h2wty17l20brujux47r8snt',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'xwi9t7xrjhuioc6a4u4vdyb0f2yp6e5hmjw84o8xpq4vuyxfmx3cltktnakpywtzipupcept1d7asmnez0y0y5n9owhl78fsusuw4hkq84222dk1ut0amds59gq4bmx2tsic4w7ez47chvxfxqiebfg9ogt4yoce',
                flowComponent: 'kvk8as9aoawg3fo2xvlnl7acgqdwm2uygpw8te1e3ampc7ztbar2ruq3z1uyufbr1rdg6hmq6pw370175nk5zl0amd4strpbf7z9utkt3kk40zooh4cj4ywxxqn8gzdwfuvwkpjkefozqfzs02mj5yzrbgowi17c',
                flowInterfaceName: 'zfznzntlzp21merfnwqwq8o6u8xskvlirsz3z2nztjq89fbaz6x98bslvxksyn7vmea87xqbdylt6l50xe5kocfzdqtiu7zn8febahiqvzs78na6pamwt4odng84jak8gtj6n12cuvu4v85hdfbb1w3aeh5sbgni',
                flowInterfaceNamespace: 'm4b5coowlwe79nvwtanmio3bbd8hhg8uvfgcgt2n7oejkfl5mntvo05hqb8pi1p2p9kd122hdhbd69so38c3f625oihsqxz9o4eqyrizcfnnyyxs9h7f3vy3svjr72uw921iznixjcg10jhsizzry11h24t739i5j',
                version: '0byu0j2d7nzybzexazju',
                adapterType: '43iqoq8498zd2r4sp901v1gsuqqqsujwn24qgft3aqjgct4s32flvsznhucr',
                direction: 'RECEIVER',
                transportProtocol: 'vqi28vcnso4c5djwb21xomrnpdept1npavmlf36pyge0yglg7nvy843pdlza',
                messageProtocol: 'mhliswvtrl7wciswy0oevdmeqzmjdr2sygbxhkqgnb1hj9jo3yt98fnsnhd0',
                adapterEngineName: 'tuqyk6ixk5ms0owu1bvfju9fczut7ntp9l7v6pay45ta0wen4qv0ce9hfjalzpjmrnmec6k9niivbmdote0yugvqoct5gzjczv1tqoar0o0f0yrhndvt1inypumdkpvb0wi64n8v74jpb448b68iq2u3pv22uv6k',
                url: 'odtpt1crokbkxnpttpxcvsvwvjd2g0d28jd5km2xp7pwqwdsgew45gicwg1fccg6qkhmtmwudp11ne3v9j2a424jape4z08tmv98e7z3sg4qqssgdps4hkd25ke1t3avel9fpbyk313mzof063x2elmzx9krbwvowxxrvlpynwz72yhzmq02f3fas92g9r28tl2cfmseb1dwzke1jaghrgtivpjo0mywrqr53i2b8xerauinv0dzbyybteniwdvv0n7duc34887bvcmkj6b32yvsmeq66fcvxfpoy8aujzmw8z8gnhp7idiax8dlfnlx',
                username: 'e0e2p73vplhhhtauh4f6n6nnvkned8lp13qy8536x2tigkc9pfupksw1sphy',
                remoteHost: 'gef11gsvn1fdmkhlwskar3chhdisbcjboiftnh0lku9e5thzr9w1hjis2wof9l7jqorpdn4rk7jwrp31x5dgipy1m4wsqolazsc6997q4zqdcbhtf9e7biutvlw1dplblzfx97lj5xse6qrxxunxhcdb2yssruxn',
                remotePort: 3590567026,
                directory: 'vjrl0rfbev22cnn37vc832k7qo0u2h8ygh5d097kp3zmdtxl7xjwmmqmbh57c4qkg8k60iiwgl6r8fazymdnrlme3mm62p4aekkua5vael807daechkoslfyw735w6h5qvzw8x584u9hn0gu8uwon0nouyz0hqjfwuacse7xkpz52p85u2vijz39rtcwlyvfb9s8rw3a9p0pqky8egi3ma9psg236qtxra6xxnb38i761uuvzjcoxmpxz07p7v7zcltbybm8v6gmua0v6yvdu55qqjdq3woxbmvlwj5sz98ummc8xqb1jzbqfedyuo3xp6yre152nssbz9gvdihdjrefbcm7x0fw57fimh8q0gqolsbykebsthsj1cszh58v63lkw501wpldmyeixm4l1i95bjfj2ir49nr12eud0f5zx1zqq1kg4tkuid0o5pmxwk3a6t882ukqxugoc245pcj6od0hsnrjwc0m9sx89i28zy1g6xnot6uwjhm2q31qxwip6x59idjoaiqq5r3jo6pizfmvo3de7zjklnm2uqrqgkystq4xyb37774xqnzucj56lpugst7bixzvjvv6g40ydwugt37krbxwrj4qbjjramonvbbj5khya350rdzv11yqcobphhz53lozfj95z5yjo99o24wul57x1wnkuocjrkehk335dkq104i2ysa46pf50bsmy2rpgqtbaeqm2fo0w70yoawlw6oj3vp7ludpkdau411ss439n2p8c0jeg63zl2d2jtmtt001qwxnlkhi2ot9t2talvtv99hv18r1rxh8isw6vczti51qekln8z2s40r5lqg4cs77lyv0qwpxpjvy3yh2aomyjhh3evwnszu3fhum3a19txm7j8vvrahmammimljm7dus6erma502gi7pfoc48q4j6i378quvzhd1kbqzyhwki9sgcur8fnric6vboqc2kd9lkjck9t7lcn82g79va0w39o923u28zs0egte15901eaoho8u8',
                fileSchema: 'covugnqypok4j3lr1owy5vzi4aecyltt8smb2dugb58r1flt9obe10vxmug8myx9cs9z6m3f8pqow5keqkq3gn8ia38j73ewb9arxtl600leuzevsgadq0zqzvnszz16jkgo3bi5grqdnsy710j8h2mllwkk1xyykqscrwiw3cma59aipxw654ngh11gefyc8mvrsp42d9f9r0q8rlt3ngbzj0enmsw1kceqz9ovgxtzodpwwt4bj0a7x0su9hm3gq20z38gr9zwhfgzeyarkko1fana5w53ge511525guc9rnvye0plbuatul8xvynm4e23dkdydjye28geqv56gr57ys0fo72n20d02ofchdahe35qc6bk7yhee3bq394jdzrcsch8eanuulaz9bzdavdvh4dn1jllgyotna4dbpn5ak46zevw8j3tdlkwgztp46i0y0dhvekbd77pxzplzidqoue62uaw3983mwmhlc5g3fr5m38tlnr0vczrsb85e6ueavmlf53mpbqiqc27j0jwj7segpd2pbbddqvps9bappm3r90aht14p1eemjnd69cz7x9awxzgt3y5bur2nw0gbmeuhbcijud2pseh6gcn3dluiqnuwftgp180pp0gj2tqajr3tvlnbke53sx8m1fjfy97m04hmndq0k6ir6vxisnv56kuet5m85e0v466yz8rvkz07a8tzxgaxkjxoqwai9m7ezci10li13n9i0suael4dpnseyjzfxsxc8n10mnq3pdl6b4kmca3njwapksrxvu6e472zjh56f47xlzdj3qylnuz82d7bz5jw18sra8d4a31baujdcizass4xs191lp1qe83j7d7nwzif5p2sxpzl7fx8os6l43kp20hxd99c0tgzck7yy3ntdfijk2rufwsuw895h44z7mmc0lkltgsnjzan87c5x5su1ufzofkyygz2x31p04s7awyl1se5eq5j80x6wdorni12teb7hkwmlqxew1ghx8x8hyl',
                proxyHost: '5ckp22krx6rolm3hbtlg7aygjmxbhifszx2zcgorxv4aki8kb49nab6gr42q',
                proxyPort: 3366190072,
                destination: 'fptvzoepki85p1osbs2xob5swq6ycviuh19k1hzlzmqaf4rg1ytk1xuorlf374nya3ubbru2wzway4syx1d6z6ojla5bvvvovcb1kws2a43lkw6yxsqosxzxexij8n0j383rdklq14jxu98nswplyl1j0g6u2dwq',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'jh0nuhmtsbol2w7otdfnftx3tkv797xnh71vijjei3jm0q284n9t4q6vn81ozi5ekd3mjs5n3nhp5jamh8di5e7872wnccxf9c8efglpciiz3q3zaoof4ozlc6bhitodgo39s0356gl9902ftzes047mnfocf9r8',
                responsibleUserAccountName: 'r81p3tw33n0uu6ywk3ss',
                lastChangeUserAccount: '5hcjdbb79sw3gar3tu43',
                lastChangedAt: '2020-07-27 22:03:53',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelVersion is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: '5u6u380kmrwt1sibgrdzt41iunjhoewskpqai7bat9159r0sdo',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: 'rqjdf1uqlrx0j6gl6lgo',
                party: 'sk6c90uqnp335skziqsmzzxr3c4thrz3praftz3puoka88r3uipe0c2zj6aecj7xztheyreoinw8bmx4jsnv5a2hjncon54r4bhqko2tj1wk96ys5vihqjsk7k7o4f1o82alw93yk260tpjq9e6b3s844dlyvcuw',
                component: 'wo3q97qraxvjkou0tn2s66dmrxmcvy0cd3pkgifqqczv4ljiszvlx9wwhrpbi77qph8imkvvnfyqw1qv20ih93e47teeu0zrfq4owx3j4l22qf0tt42ex15tqxrh1rxitbeungsr6uz8o8c87jy9zmy2sjccfn96',
                name: 'v3zx1q4ldesqi9s2weibayuthn04i8jowyo958l8tl86oxtq5ej4zdlw22xg1phj97fjozsm8uotscbvf7s5qna3bpjuckwoz47enars8999vihjcc25fd0ouuq0v8de5mvxfzoeebq6c409ikuchung2g3mpbds',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'tzr4kkfo4b1z1h8i0kow3xm9gaxaehtzck4ucif3fevs3hjel6j8xb211vty77tdvwt09luzwswcwydvu0oept3gpqsre963gtkmderwlmzd6zb6x8qspscfjfk95w77ea4bhcuqjd9odi42hg3zbz7sgw9824uj',
                flowComponent: 'usv87rx0k0gmecrdl82bxrn7q4repeztrzuzmg9rk0ao2xwjc7tgpjvypv4e7fdrxvod97q8042cose8ytzyux85pyguef7xb00qkulfwygpcrfhq4g23jzpvoeuaajtk04qow5v6vfdj4u5tbz5nto868pzt9iz',
                flowInterfaceName: 'pbeb2awks5ibyswfka7rvi68mnbrr9xqdmyurj27h94t2o00bmjfqrychex2tmtgiwp4dabjn54hu52ahh3vw6fah4xa9rrhi22hfif045gu2qbv6pxytb1p7d2omx6nvxj2da6yzp2ix2vcnqn6t3izranupabd',
                flowInterfaceNamespace: 'etktgxg4l11os7aviykxprzcep7tiioy1o1bmhsdytt0o7q03pibw6txuf2ng5tu13rkk47e48dxq7up8eo5hlvn4g906w92vmqzh0vk8lk154f14jr2nkshfaumbtkko5spaju5qe9he1grn8vphpztxja5id7p',
                version: '112vazgmep1bin8m5665i',
                adapterType: 'q7t3vk1tfhad2as5vgjr8rtpmgu13tqwwrm35vdjtn0uj5csi0rqrfp7yrl7',
                direction: 'SENDER',
                transportProtocol: '16daqkdhaqasu6zfqc8ru21ho75ki3zcsbmone3hak986ide0ukpzosl2n15',
                messageProtocol: '7m4izrxjua4x5rook1kvu947oa1pwnp3v5dbfaajg5xu6zsx29dx2grw1yyx',
                adapterEngineName: 'ky6m0y98xxke4kzqkdbdwgqeb9llnx3fu93cewpc8isqje4uwph299vbplhqho6nsznuon40nvtntvvknfsdohhhubdmck2smx8teyngalnb4pwofik53u20pyd04l1h4weoxvi5hxal1hy3dxuws0zonz7r5afh',
                url: 'trw823r2si8ly7oyn4l6dfgvy4s4sq1yi6dw3s3ew8fzxmymqtzon7csxfipw98b9jnbosxnyu5z4hbi2ft33y26m6rk8rlkecov1ly8daw5dp3zx3063jqnwudc1xdytflt4i74caaecaf3txdytpsn4rhp8p5whevwkpvaghi9cf79r0cx53q6h62hwnn3pscjj8ulu14jex52ndb9nqapycnvy0t7ak9tzcx8u4stxwsr746qx1c0dkmrgx654ugkh2ehc4oj4huwqpnljmhw71ibajm79w9mi1ykdfyvgrbqkhfeg46wr7e0i7rd',
                username: '6qk8j1fj81gtmujdjgm1pvrfjyok4oqjztbdn5117yvdckph4srnendruv17',
                remoteHost: '1x5as67oobdvzbpbhxul8nhw81bvjuiyhv9etgfxz6xpljr2hkkpwa1q511ze0g76muituf6c7tuu20o3217b2s9rvzmvc77jgyh82x0e6el04nvblii4fm6ma75y7nko7w26e22ix2yr4ocxfdjdllez9ioxgjw',
                remotePort: 9466254095,
                directory: 'trhefld48kolyrjsr01zz5w47eu97vmli9a0umf3px3d28rrfikygy8v19lxuu0ko3xpbb44w5bij5w5tnw2q1onhtltajvc7d4iqhujmn2d380oe5j8a9mrbtrtq4w5379fe269w9dar451l2myg1u7bbdrgxtpw8ovl5rnz5qyxf1gfpszemqmeyqr84fmyja32wn3w8vkgsppg2dcc07kos3jqmknatjpfmbji76hefw67u6q362nlat8n8tsrwddrmmi8m28g9dmskrwqz50n59huwpo4p2m4s6n12p3x9uqejjdq5whu9hy5g3g5crv5rvzi4xuevtvbz4h5a2bwd0btl32ni5hfclumelzd4a4o4baqxjx3w4qvm2mpseymqlppq4hhwur90pc6neh6e3514o0nksd7h52do0vtne9u19iqem7yi7q9dguk0zl25vqwowv8teo6itt5u0uah2v0v7pyn5smxxtyindku2qbm5mnvd2o67jh3rxfhx56jcjdxq9oh8junuft8oazzqekrc0qe4j9wiz0r41vgk4aaiumlx4k4n1q6ycxcjztrurngjj3n9vvgrmlb7839rltfjt2vh52wnsq3i5k9semvl7tasj14nu075tcbseomqjg6jp9rex82rabi23ra7pmg5vcc13umybg7fmsydvge98oibdt5y69n8qstpdt8k2cthrc5iap7xepae5qtwu9qvb3h0o68zlustfoforjpiwmbtehh5itosu6w5xw8vk2o2by9ccz51ua6qlfjsb1zef0tg5y31ys5ljaq87xft0er578yx63p67m5ifxnmst1jpq805ivxherwl1fqpz5o6b56h234sicsx5rmgtu3cgqcop9e57kf90ptnp5wt0wgsekixwhaqfr3x3gdrw1gwzae659f7krwgqdww7mx7588lbgehnx710c8zlyk19wfp0jupfz0ekofruk7hmceh2x5q1h41fc62x30x7ltyooqdk7cr9to1',
                fileSchema: 'ux1w5jml53heygv0xwjmowrzmh06fi65t6q6jff0tu1zgb3ocpif8r2mub5ua447qxmwr98u95wnrvxe94f4ufrbljh52hrjkaq63o1h8tqyzc15gwdudko8t0gfe9lu91ch652oaoqh3kgmpci4iuz1mpfaosmxjfl90nfdsbf1gz531bexbqvcbdz1tkmqngt3swtlub5xd4amcdl9816w79uu53wn21y8sb2ar4y4kdmuxgzpd1dx64pg44u6tz9cer7uxl5ntfqmrtjxfe7sg6851a3ferwmvaod5pp7ysi3ylr59nqusvb5113p9ux8362kxxomo85k6u05xxxzn6am53w2wltjsget1htpspl2jomj225jhum4fsx3kiff6ewezzwc0bjtet43pxt51xewwb7g9seb3gnxr5p0q4w1jsopgec2r5yevrlty9lucefknfhlbkz57wvvnl7l254ll07m9ynrpxofucvdj3yimixh4xb5iguqx5f5fggpoutpsgysct7jmd2rpo5quudt5okmiz3sctopj5qvhm2kyohw0zd5m0ouv4dkz9ip31a5sw928c7e66wuns6owq658b1sifc10wy2j1j9bk9h0hm4hmqdltyhx5y4815an598l4fro9tf7o53ky3uf7rv1edawnxlx76h175g27h6mpbva2n9h2k64epbzo81iisyslt3ruq84wkcz0bsiqwf9hs48vfffx7s4ugjggtnbwhfu466yzg8ymrz0w5h1j37ql0wdb65lbe4bidkqbdtzxbjyxh4s7xh0s1wok8paqr2u0awezu5r2joo7b52hci8wdwpxfwnevu0ypbtc6zod3nzbacwxan99ogqz6xkcqutycwkpvc5m6nnkx1dmesaju3cu63uwahkis2174wtuh64rjpjkxhips8puk4cu7ecjqpoz3dvtbfeg7t4yeota7lf45mrekm8v97t6ut49erquh3a3l90f0ud1olm1zgwmv3n9lnqhjv',
                proxyHost: 'tu6fqe121l07meobomh1dlg4rb74kyk0jrdxnxaioxo23h51jm0brfkd948e',
                proxyPort: 2484991845,
                destination: 'p8cm6qidc03fxb52yzkoqh7d4cgw51sr99m6tij12x5j4asyz55qpwx710rema4uu2vb6fbt9aod563u810ges5s3ehoaqhqtnzbqce1jw1s713izp6ez2uv55p9ss5uq6b3769ivzb2vnp754gf4gmcvok4m92s',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'tph10mw2nmkadstuzcmktypjvrmlr1zbls3kba5681g85budku5yc5ibr4zae6qfw9p1aq87e7mwan9xy3jwijhvy28yw5oak7t2q1thirp6y18teh6ii9mme3r2k4jll6xoxjk1dx4h2rvd3mtji4lt4nr67iuc',
                responsibleUserAccountName: 'n3gz7is1wakm3vsepao8',
                lastChangeUserAccount: '50dvbjtkyn9nruox2fhs',
                lastChangedAt: '2020-07-27 07:13:29',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelVersion is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterType is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: '8jkv24kyht6l21vf0c0isw8mdcztkik27ce2eam2n5g4kk6099',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: '517ji377c40f7fujrijx',
                party: 'afjgx9a7suuarwun696i3pkrln9dct3tqwrgoqtze7mq3qlbm3l6hndh4199rer7hbh0niimcujq5irecw3f92wiqrlkf2mi3wgl1y1zobxxaflrl6fxs2fc0frwor3id261a4fmoh2yft9oke5wy30uyeoxqyod',
                component: '0ry6e1cf1vb0ehkx13ddw3govveaav5kzbnqbmjchht480h2ysiervg37y5nntpt3ki747i49ovyrepm0zn2arp5mmudocp89fj21jvmzmwkncvpsfmxsbdf9licf2mzr8480bjzthuh9697aq9qgdaicsent7sm',
                name: 'c6dljd2wpkq62u4ie3moxmwwfrjqsjuwehgbtf634fc0lc2ivq4ezfl7g1iwowzvcycwx0mcokx1bll7efz6ws086tpnrp0fr17giqs8xt504urcnl04rvkitwsqvzxtlhgc6n0wjz2j3e8gsp5ju3cb1k2dwb8z',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: '6sspyay1qpr67xzgqycf8ovbqya3u2yo0gcpagp88lrfu5bn2gyxmb0m6wdw5k750z1qyqagihbonv0jnaxqy62rnc3l17jbqshzu2zkpiq7zjqp9alez6cqjrjh7n1zxq5kykh0fv1dkkta0ubidnphvbe0m0ec',
                flowComponent: 'j0yqcygb81a3b8ncv4tlzogqi082yl8qyp8t9qc31iltgik5gzzyq1ibmcbbbnuruv6h3el91izwt7sjikha9adv6z9h9vv7cdcg0f2ob3moqkqlme468bse3ovdlk8isxthwavq4p34f1yql7m38zy59jbadx2k',
                flowInterfaceName: 'ykkn2lwxnb20ilxsmdvocxziizwrxekbg6n5nt0sbc4eceoidpvgjjvowtem4zq0cu4y3y38134y2vpuoxcu2i6lz5b3tgy00hbnndl0fp31bhc4d5yfq10z9bour9cylp1z01v7ravoz36c4nic3nepd8ru7mwl',
                flowInterfaceNamespace: 'keagd3cj1u6xbxlix72qq1siwq2q9a00wm11kzkxa5e52rbtefrhdaxck5wnrloqhhpt3uf4u1i3g3v9zy7lahu02mg6xc0skkikp42qx4oucafp21s550ozsv3v8xebw8wt6c8ayq748t1h6worszd219fg4ez6',
                version: 'mbwzx2ntg02i1gb9pu8j',
                adapterType: '31nhn96bujdf9odvn0wi31l56gv84vi9smi27mvcnwbl0p0qjf5ctxhuhmyy3',
                direction: 'SENDER',
                transportProtocol: 'dbqg6ftc40lls7ia7o3zgkeyzkb5qy5h5juzvx5h4c8dkc4hs4a43o1fpfc8',
                messageProtocol: '78jsn92cpv2q6ggv7t224kaeib9iwwtauddejg7290l1ifkjmald6r30pqqo',
                adapterEngineName: 'hummnhq8ai0nx2j77e286d7pie4xiwiwme4dvq4fgrosfi01rzqpz1gcrr2wxlx923uisctcecjrnkzuxwmp2lrqdvb8m6zh4ltv25dz9iu4eu6gq62y2jj1s37qqrlw09avl6jqqv2w2bfpq108gnh4aexb6e1t',
                url: 'ga2vzll80qb87d58d4r03x7rf3d4nq61y1mdh22x1p88amoiy1lsdvnciihtzmvkzzchjhllp21284ytnlb6i27pugwr8nt9pkfnw1e10r1b2ur3vxzvwiaxxaniin8dn8xldiav7d455785ecq8p9no81wzuxvzl5ef378c4q1vz9ssxi2kh372m2ni69fj0iagbbezswb1tflrd9wx9dr3azifr12jhx5xbld2h8ysb3znm2u3yqn83m4n5alcwpglqdejqtcd2r6dr06ze5cxv1sevs7kd5w7imloxwkqal6b563ig2ew3nb6ceu7',
                username: 'b8qxkb69zqpadv31bylfxh81jwep4lcz9zu1pgax3wts1uci1pmw6smw3zsi',
                remoteHost: 'l1d91kt5aefgokkqjsaqr3lkcwcj15pd27i1f2c7q84j3sy022sa0jk6zogzttoteb2sqclz22kvd8pb7inavt7aazx9hmsyt6prur894sdy5418bc8xdej8a663966re8i088waz5kx8qfn1w4mi06fzo2mgizz',
                remotePort: 4016699645,
                directory: 'hp40ir291wrv5b5xk8czlnbtqjmu697obi8gnyie71dzmch2p260g2jqbd3r87rp3u6pzgegrqcb6tdqfazvfwqckrzldk9k5bo3b01kjp16vizk2gfeq0wkhqfzr5p84ixr4jjb2665jv7d7bv3ua6cqduutp3sqbn9bhf9ymx7f23a3mvegvx1v2x185czx5xum0xdm3fmocwxnb9lslz64w9sx9njrwkds9kdi6k3knrus2bq0ahj8x443xv8wi8j8gqb42voyrr9tpjdoy39frueg8zdecdoqknnzii5qsvwrbshu0dhnyeac7bhkcg5i2d56wl7so1fw93ghi98v1gxvojkh06ned3rxs9hgu5exxobig5742i5kmczcu8s38w722y1aern24xrtf8bvii5irm05hnr05krp7foiknwzhxa4b83l3ps0eaoz4uxvsqpu1sdr27g96t809ztvc7q9eh70c11t93wiovx0lky13tpwweammeumnk4v60zjypg1rs0u5pvif7e41i6tpkee3pol4rui6dao4dlfpsrow0qzcuj9l8vf7ak5lgu3ub4q0vssdgvhhq4sy6dkv8oc956ag08hkqqmxlfwa6kwb0sersxurb3sml1hserugrnmpj9hmwxpo7qec19hi72e9kucjafdaz3c1i6ew95oa0sm85v4drel81jzlepgq0yopzllgexkyojwfltbnwhhlyebcz9bipe0bjs8e2wa3mbyu5fn8xwyn3l9zpu6q7xqknoxmyhalovkqcvgbizh29nwm3rn4lsl1a6rqix9pku64b03gu29nkhb268a5lhalmcdyw0rwq17ohd6l6cy3azt3xrz1ar7eotugj1aipfynhbsx7pixg9uhoeuue0g4se3r6vqcgosxmtb3jo9p38ylh3klakyp272p4dfuvty7rrqur97koinar6skr08v684f41v4icto83aqqdg0qq1uwpxc2ef9ykdqqrb0uy85ebnngkh91w',
                fileSchema: '4tboexne6634cm691u1n39w5s43adyafgbrk0x2am1hhxcwiyb0qiv43xgvll32wy9ne1sjbgvrrp9ugg61xz9adl4gk9db6ba5riaekode2iud3o1y74z7nkkdqxntqgptodv95crvzk9to2j1z936nlm3s4l77yx42dacazldikoq41nptueauvc8wstoge7bvv2jy1cevq1ceqsdzvwa0vh3kz5j6xnne8uhonwm61t87ws521iy20qsx6ilx4rc0zib0w7wialyojeu3jmco7qacvuo1s1996f11pil5y682ldnvp9lhw0tr4hpmvciqztm0ki6cbgzijhyf74pvmar1xul5gmgkbtnf195jl1cx2gxd9zluadclgj8mc9ub62bvedsomzft27tlu6qk9awn8vubxg7xju298tv4fbw23tsnrs7vkdrbf2vr2b6pbsfhtvdqqqybdt47ll9ls2mju845ftwev67z5aw4hvnnueivkyrdxs3dq223a116xshy22ameiavv6yreot6mev2fffjkaqnzsach20shcy85lapfcioxyy2zlterm9noncyd7f02siqi085zimgtlo7khhelxz7j3djtzkt836torykl31c0vgm580hqejyyhs9fh6i3ac3rb0ethbv2xwu6nj4sd64jcpbstbkfm1rab2v22i3yp81xq3uub9jsmx06eruf19zf37l18uzyemrck2boed1nzhq7zm7206kjmz9f7efa8is2i7io5aq004he3exidyr393aubpcs8ziehw7zztb0ihgu9wft4w4gwuopoul3rzaasy0ii1umqemz1mptdyfdfpjfok7aueu8rwwuiqi8qkwc8fq0usa7hmgyri1c4d5ws8nhfn6zwhppc8wyehgqpoxezfful0991rbqg5lh26jxcdwuaq8hwmgxv2m6mfumjfnw46bky5u4xlzhmjg9rlrwl8oi524l3tzy47nrwjl0ehwq94rr6uld5rp95xzjo21',
                proxyHost: 'hlyis01q7tziumhzx49mlz2cts0g4l705vexd9627zh2agzx3i3qh8kcxqf8',
                proxyPort: 7130382317,
                destination: 'mr8iqmlljxk51vu16912j6rpejoez32ft0vee0421tsh7jjwt0ug0xmn35bvdc7r2zu36qv9pefjh1teft5mwppy943hn6uqzk458vzycilits9g5atqztdoi92gad9vxffduz57djad0hnnpmyqsvbf1ecdh9na',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '9b489cow3dc8m8jn2mqkpr3oajvip7z1z5xyhm2bcjtzgfjt6dy50sgagz61ev1oc4fhdl9umg4odqhhf32nlg9zdki1sih9j990ocbuvmsedgr5xsqfkvni22l57ejojba4sicj4ve5l421ngvyjod6j1ol59w1',
                responsibleUserAccountName: 'k1vbkqtp4i46a9tdwcwp',
                lastChangeUserAccount: 'n2nrpkdzvqoee094i7q8',
                lastChangedAt: '2020-07-27 08:11:21',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterType is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTransportProtocol is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: 'jy4dgo15gkyc2cu25ho2abgk529045w7q4vx6fpml6a768wuym',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: 'smuqfkch39awnb8wgedj',
                party: 'gudz21uepyhp6j74v2knn7nry33ada1dfoaw6isli453s1wi3fzr4pfohjy5tqyk46a6pleu6vt2q29hrwyyepq24xoy41i8m8fc9jap0k5tepdsg8pt6fszvztpxjhywk2a7o3sf8pq51vuimzielx1wvz763tf',
                component: 'vfuxn1a87pfrs4tjqtavpe6ul4i4rxdwi06rpc6khavuhx1ppipmc7uf75aohcxu65j7cu1dvo5tvi03zv5tt1cwi5lf1wx9mvbtjh2qr1r8moiqz8c1pq9i8i78w8kbfoeu27hxrbzrrozjs4k4wscazz0x4jxa',
                name: '3sl52g1itvpowwuslh7v6lt3jsdi3fw1ai7j3n6p1k0lozzuwdmd0ogy350ii7mdpt7wpprglrxuc8bcqhl0r5bpe92uislbzvdz4ersvr3j07swcfoyixxa7u7bnl0zrqtd23h1344j00kqkhee2vtqayp5c74u',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'sq698z1kvn0r28cvhqhjzpctjj5r21dbqwcfg521suiqxaitfj0olov829bwcnmn17vxw74mj9t3l0udkhzg9z9xe5u4znr1x3jut7jodsgk97yeso822s350l85mwz5z7828jvrol5a90mld67lsywrbrbiqw1t',
                flowComponent: 'e3tmkcc7y0s0bnjsd0ooauu18q643l5fre5pem9b7z0f33yp27638ms4fgntr9m0ox4l8m4mxcbi2o9l41nqfkqghrcntqrqhdo2lgrlgq8wdx826jkr8moweswrrkzhord8maq20f22pl71fbfg0vkmv9jzohin',
                flowInterfaceName: 'n6ret573mem9fzd0f4ob4o7839tw59qii3gjlnjuiz7mv5ttsuwwuv7dkhi4ayrx6bqiki0t0gogp4q9k7vggdkb0kaund9r2d7s8dbdyil353wzv92a9g5g73v88xj5ftruvrxa5bcan5qz525ccheh3qixeht3',
                flowInterfaceNamespace: 'f0hg2asp8bpy1wqj5m6s09jbn1gz1i6prwusczsp25nxid2nznmnaq7p2peo9e7893tei4q23lyevr7qppki19j3so21u8pwnxsd7jkwhr1gc1m0k3jdjg3cfg4obhl5y5mp664v6obzvjzun4qybzfve2hvvshj',
                version: 'q1p45azavez217q904hj',
                adapterType: '2zfwuylgeiph20w0eqvaf0ba0omgounsdckifghjurlgcsuy89qc6pv4g8gf',
                direction: 'SENDER',
                transportProtocol: 'k0nyiirfx7kgixly28xdkc6r9mxozxeayxp8qy09ee603dvg66kuko96kyygl',
                messageProtocol: '6dpigfa6gmlibx4od43myl3qr5cnbrp8fxid9lzxarbku3l9hxjus8ajmpun',
                adapterEngineName: 'p0m8a4vp82yb4w5p33e5sha262c0r1v1i545w8kslydskknws27fmuv0qfjgt1q4051vray2zhhn75ps9l282plshri8irpsycu98ai7qw7pqp62yklawxrfn5a4451pdee9jyvyclh9jz0dc24k0u99rr6f1p5s',
                url: 'ipyq1c536iw3lndqy51z1j6ozw2wiazi30tz9omvw0rttf6g8xbcdh7i1rzdt495zouzfzbosfd84xqg2snvvy1jnyoh3ss8lefrjnt56zfaqdrz2w997jrjyo7tnhfe5ovh8dll4bm5lzn5bb7dpcu5ls2zhf0qkr8kfi4no3xuxxv5xh5h2uu86j2erjaca5mqat7sal293amthu2xfxmlj5dkqriit9jbb7fmbg5qmdsx02ays5z4rifqujdwoyos5go1vdllxs6q7puu1jcl7mx7f8s7c59nnxqnvn8r5o49rlp7ts4n2jekd8hv',
                username: 'ehpihq5nq8hdnxh50wwfr1i5h81ghzxce12b9pzkasishfshmiighxm7bbv1',
                remoteHost: 'y3qvzcpte5h49gp0cbmiekqmxrlbzh6qwo2zwypxthffe6rif73runrue4onvckjmoe59pttygc62xzec5ugk0i259kam0pjrmhnm1wepi28r693gb80dobdx4jp58h7lak5okduhyjubo00ep69mhcg72ko9gwc',
                remotePort: 1154087265,
                directory: 'xc30o6rbb6d6duqce9sybkr2u41u7f69nopi5ku6cz7y5oha9x25pq3qc2fw17t5gp5o7dlr8m9ormrukb7ytugb7xlz2wvogmgfuaeji5454jz1n4e2wzudqzrnh72oodvxtlbg696m3vq2v2pszw214ct7txwdmes4lj3hj2s1bnnaypb48oin3cyvgnlwg6cvl7b5vt3iwuu05oboj4kvgydbzha5r2dido9hzf361hag0gj5xv4ibts9vyurbo0ow8xquwmmkladd5kwg4hs7j65h94yxroue56sa9n1pe2mci9z59dxgy6ri6s7id3k0dl03ely4u4pb1uo5d7u6k9pa6b99ut9f1jjfgtxg6x028e94q5prdqxhqf0gwvze3bpy4m25xf7nxv10mumtksh1q7c3inhtko1vp6wvora9ev95wubpa9gwt66n8eeog7s8jgg5cr4g9zhid3nxi2trvxybiawix0s3fjj2n7syf35md5rzggyss28b3u5cavo2yathys0x4uzwttd7sqpl9pbikuzxys5va4rifa3zoqlxwqdu8sx7e1042d863j2d4g7w6jeq3j1kw9677kfeax1iecy3nnmhwi8dmes5pv01l7antati3yvkp6mlggtwlefpyy2yrmazhaftp9wy5lxwc44nfmmuzo4brxi8jvjvg0txmi1f6ynxafb099pkch451bkqp3d1si2422jq3coouitc7ngyvznzno3cebbgb89cvfe1p4aaomdsfk0e8qg3bt90sp79u0onr354m11zhx30ijk08nnfd5gef3xu282uxbif1fqdo0ia4mcvhfolrtlcscmnuo144661gh1y1fjedceg65nxtobfgu2qyqpsei5xbu9zq657b5dzdehk8gy8pagowzau667vs30dbyopcq8eu5uw9os3s6jfrfi7l7w2wxi9p5aefwskt01cd9ksz3bxj2tcu9jfd6xzhgh1avcp9aot89l3nka2ybuaq1rmr2p',
                fileSchema: 'b72ou7oieb8r9phro00ihh302vaqtb9wqj2z69oguxqae3gvrpbvlaq6ndm9bd609ub3fysl37clp9zge8rrjibfy9ufy79j3zka61i3grrr71jdsc710yj17xmus5rzzgk4g0j31upcw5lpx9h1agsod2tyccjmb1qfqctv906epo9hydh9uz16kxr7mmwqpru5hys8bhex55uqph73a9qtz7ouuqztss1abk0z95ba23l90eswvsi6m5614hp3csogzoztyhmnlm9pwfuk142symt1sf0a86swy8y83x6g67vh1qhxamc23sdbvb0skdstfoqdf4apr02xf0na1256erwt3znlu26fod5k0bfg9ap6gy3itmwv908obztno3do9pxi7qhzcw96q0cz6bugceac8heympcx9rlwjlopgn2tw0shjgo6pkt9wtainbn5q828coosb1epcf1lehbrpisck6cokbve7naxxi5qb52aw2hh8dn36671p1p7z38x07phzkbvtisyfaaaz47fig668iok9mwuahlaiczmpamggeds9krdammtbjwro42iaod9ymcx2k1fniyfo332gp7yaox407n2yejtqih2quq6a6d6h7rlowceicc96h36dosdgl5vgowrfzbqctqhf8lmp8voobkxyp2jxkycljv51a27gbe09n5j174qw2jww4gl1f4dumcspjcywchndl7rc77dke3s996ck9dwijsxuxualu8m0bjwdcg40ge6ltjqfax16fj2qayod3a78juaqkwoi349hg857jdkffws1m1eqh04ih8tbkaxooll8ry77m96c95ut4dp0yfrel8jrgv5sljinc5f6ti056jdw45sejzqtqj02cvua2zwvmnhha0n7buagff5awc5ztclmbqdqu8o3sffnbib7cqr04tsr3azanf0noyto5p3qk8ksoktoni4x3polztcrsw8std9k0kzdka8zzc2phu3dwwfo2j8gk4v7cqr',
                proxyHost: 'ybua9ajaona5p9vqjo28uiybachden5p027yoami7v8msgvaxv23y2xq6vev',
                proxyPort: 1982782465,
                destination: 'ziwfg6f4mivee3j6romundkfigobh093sgyllm7f2p8fma2wqkhhijaih0z7ydbcpurbpbsoep6pu9fzfyfq3fd1p37qfrhex4rzbm3o6n96qhzh5uk3hrnn91gxyi5a681bf6n1jhoyn6ftjlpa0rwt64f9y9uq',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'mpgipwh0gzcq0mo6nxqlcll1bhirgf9kmulvt1f36saic5wnd2old62u6se9p3e5hlvomyqsqd2912imtrn0s0keny03zd6ee2k9yjfxcd6xpjqjgo6tm6itkxkzt8zjupk2zqdu73a2s1eqvb8lrpy2tx7esw5k',
                responsibleUserAccountName: 'ry9x7jjhw8rstdoe8jg7',
                lastChangeUserAccount: 'zd53o15abn4we0x68yk7',
                lastChangedAt: '2020-07-27 13:42:28',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTransportProtocol is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelMessageProtocol is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: 'ml9ki7nohml7ravku7yirikh51grgt28zai1hdd4mtn7sm3t5a',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: 'fm9boi18hbynz8d9j1x3',
                party: '3trv4egetgki97dqfetkcwk1wxjyw0uhjst5i6y459vdr1hhxkm6hd612ff1csdix4ydvh1riv3f8xr0jm9yap0eecy0u37ifuc93kae0fy4xwqk81kmxmd10bo5wi26lnxtsu18ezqwpm2808w7u2u28gwuc6uu',
                component: 'frylt4qc3frlxsp7hpn46fpl3l97xmcbgqv0ukc8sg9t8ge8wbttned0dmtg5eqxcm63d9s8atyqia9axjc0nkcvm20awu2l2r9uvhegzebv7pwoeg18q8fax6mp04rio1exc9nvuokv2ffdothp146vkmylgmjv',
                name: '8hpd7bkqoowzuqe12miacsy1c3e234s71vcnaq0mn08nzzgqll9fj8w8c7nd1x4i9gnoyvnjuuu74xspxcjkhzhqmh3pqe0tz258dqa1hfxrd2jdd2xad9bdelp0dfp0xroz4dg6v81je2mmpuu0anenk8wpjfxg',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'wjcdqkwbtawi1y99w3jeu5t729rdtcjcdyxbr9ebw8v118r2mmzw4x6an8sldj3w6kztfw8owlro2ugklsin1olbvyc7erz7ja6xv8bb7r2y1eegde0y3e0gg89eqsnaw38yjelwdy2zthv1e9j02bbbf7aw3chz',
                flowComponent: 'yvro01rrrirhs6ej551alif1siquixn5hbc1zbgmnllohktut4wgp6j0t6o14ryheb8mw5tvqp1lblap6lrb1jc94i2hsvlymqeqdzjgld77v66qymblf184n76dctc6a90uy1vy2t3d6nzs88tou083og1jpfpr',
                flowInterfaceName: 'gvsrwj3dy5scmjpyg9t7p3xccz2pe8dkudpl0b3gs0o8a0c01vyy93nyu2jqo46yny94hfzplfv9bec630unw21sfbjfzmk9xiug79c46kuzklgo5iz18cqz9hgsm0vt8jb8rggrbnd751vp5x0ng2lkwb4l3pge',
                flowInterfaceNamespace: 'zz6b8gl7cn3bn0mf3u2adyavxkl92ylwoek4o2p9d3whonim2pae4iw5nuneqljrsyl0dlhc79azj9xtfm0e7kw4j3bi0ks8kyt3v3qm754i5ac57we1ruejpj60bbls9qzqgqwzrk0iyc5pdn4kifdfp55o16qj',
                version: 'h7fq63w4g362vm3wgpvw',
                adapterType: 'i0mv81x6a2dv3sux8ys8ig2kz1di93rysb71qi08zyruqujyomneyukuihpt',
                direction: 'RECEIVER',
                transportProtocol: 'tht8mq88hb7so0y1psinexepiqggrhyrl11pgftdpjodfukfelu54ow2cdqd',
                messageProtocol: 'k8295stwg1w7aqzm0x8yoo2wko70xaf9izgivyb9fqn64qbr25cx6fbfiiy1e',
                adapterEngineName: '4kjp53kcjsckt4ofu615mknv786hcnkq70knrgkgut48atnxq561ssaaax7xddlskvrj85emqft9wdtilt7fu2ssuhr054fcgop1ph1iv2zrt2p0telqtm9i74j1ndb3q65luvj3eweuiu22orhy3x7pbw7c75oz',
                url: 'xllg2qcuz9mi83jbjr9nz42smwsmc6cz5jafcdit07noqck4b4h00pfy2a69m3mg7dtjthybus1hldegsc4qirq32go8o2k6shcp1bdwsunk4bl49veuh3u6boe75s4h33e169n4qpkycnlolax4qd30z3agv7vd7olbt28gnvw0hxz8sqk9g5ovenrwmdhuqkqpffc2ss79scen9irgo6whaznd8rqgm54u1m17tktli2pipl17fvirwfo6e1e1lm9iigzfbjodxmjy0hse8kcjja9nwmtaatmt2vhkvtn8jxivv4h761ho9rvcwtbk',
                username: 'uh4ddnrc7mfzf9l9wbqzbkl3w85y5wtzyawre8qn3xvp6jnmjjnb1rmmbc4r',
                remoteHost: '2fjelb3p4fh2nqx5csskdaixl7bgnasml3mf2zv4hjb0oqz9rhlq2ocukxu2ye1mmluj51eva7x3sqnrq2w5ithtmwypvfz0hq10y9jjb0kmk3kiialai1yeejek6q5vvnhoxj168t8zumfgtepsgt95znpwd5h3',
                remotePort: 7274791749,
                directory: 'd349n7051yw70zhlgw6boyxiig230yyrhe9rp4jprfhvyji93ee6vije02mk9rcjys8ojqyx3n7uzjldr42b12lc1pyz3x5qmdlq79h81jupk7dh55n9u0bqzzdp2r2hra8pch8zymmv1a6b37g7ob74d8gh1nfo7c40mfezrt9ge2c89in696witiztmosj11999kbv5xpk4u0jh82tz0hfpyqtm0y3qwjre57yjiqv0d82idnx176nreshx0feqmy37nphpiis2hr8zvlx1q0m7t6k1jtgyej1knycat5ywxag5x7r024r5hp7cuu2dwuniubd9rh60ijqws8bs0j0fvqr24aejihnmcyqgj7szabhmoslh4179dpzklgf6kg4vvri3yt1irzd7ktaktqhpeacnbhpkp1l6m7x4fepp0m4tvwe3zvn5g9h6x72zy3l8lnkci4msxozn1uz3tj56s94ociuwfw8h7tzripkpjzptua01t8hs498l988a4n2t61z6c597gn2it9zcf5lmwbpq3umk7qf45y53q3oklpnshb9xjrvs4zgsjtqgqseiiuioy793pcotj01mq0k38gn0hu2re3kosn2mvjyy4txixjj9ivpdt5jv0wqo9ejb4tcpaggatoahdjquu5iawo86tqspco8qk9i2depegjfj62iroh1ibq217w7ecxeflglko8ncm7bqt7aii02c745kuxui9zhyl2r5gd9676bdtan8dwx5id0uf9efdxy93ekwewdk437fujldko2sgqjg9vtc5nkqajl00w57a1tcf6fugthfsu7bk0did3749nex1y09i3suk4mlvb7lfmf53ff1jtc50vk20zp9yj9aa3ofehzzqwhsp1xg17hssjbpgjddf2b30x4d8j29x7rdetl7mj4hc4ugxavdzrh2ghb0mfjrrkb7m5z7d0xsrz34iyhbjuz3ho12hxuet3vh8ts7ezfaoe3f7obkktzno3f95je36oz6o8h',
                fileSchema: 'ofh49bc3bthltqks2ia10k2bd6jb0yksoir5n3fiokbo7kq9km29s09x2gc6ec9wb9iotoqchek085nb7w5w3oer324jnbvqk0mgu8lj7peogaci5amrfe6v85ur9mm7i6shzfot47gfopslqldkv7k58vnehrky54xqze84lm7siqgaciwi97hmzce384kiaehpgquwht1n0urfkpwecy0rmqw05kmxntftpmbz34xa40t3s5bk4e0rh7lg1rq40l47igb3ytymr172n5ovi5wf19y9cbw8eiyxzyymkzgrrf3ujd9x3mn8o6ba5skotvho4hmvqj86pst7v9xerooo4nd9v5y420v93icu0sx64rarer4a07c0y4nr7tvgn3672n321dhtqmjyv84orv7evmow12rxmwyojqym6rbphs12r3ggt2eydp9lz1dto57yy6yozyhfb2z9a1gg0dd7jzzayluwlx9ilh3eqezo9f8zryldtjwgagqh7br2ys20pwx111iqin41uhcy29s36s0p0rt33hhw55qfu289phprfnel6m7dufrele4wg51l8dz2oms15cfto182msynqfm8461rwfed6c6j8fg9db4nul168drjhwuuct83gz4aefr7n5n4gbo5co7zauyuvelzciqtgfj9fg6nvv8byo2wyncwr35cr43wlam7nvhk1kv22uj9b4no0bdgaa0myxg00dy1f9zblicng5g1ihwoqw30sr0o5n91ynco8feylyxbtre5kv67er00dbvsabryl1i6my0kxxbhnd02j06w7679b5pohhbgff85tgkdcudy7p0dcwvz52vcecela5qw1kx8tmn9snsaf9bpvmvja9qh49g8w75hp9cc5f77lqi8uz8b8zmre4ozvdp3mhz8xtbys2jullx2bo6zltaloa9rrnnpqvmr89743xy4b06l3mayv6u0ganhr9wpztgvsgvikunw7yxbzcw8n9ja1kl2aegoos0gehgv',
                proxyHost: 'nfirquply332xd369gbzy8wzkg58wcjgfmnqxowbihpi54tg8k9bzqtv37sf',
                proxyPort: 8855220139,
                destination: 'cx0jil6oayts4x01j8183eyytpklrp1ja5xputp01e1b63irghykxxl7f9bvcpxq0p4vc6ci8flp0f61swj498dmebfzkna5237u4xz2mcpaeovxct9s7yn5mxfl9ggl2deuy3lv0qa3xgyuxjynygp2xfj8zo2k',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'dyh8jx4cex1eghfygal2s3ty2rmu9dc3yzc7hnwyqhhvmqw3jq8xp0dwxt748m9zz1914a75nv0npr0u3nhxoa9bzdjfaybcuoy8jh8z5vrzcn114bndsk25reyl08ay6z8ymcxkr7389hi8i7d4nko72j1d93ul',
                responsibleUserAccountName: 'g07v09c24dxps6fh1dun',
                lastChangeUserAccount: 'pm1rjuhws7i4vx39kpor',
                lastChangedAt: '2020-07-27 05:08:01',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelMessageProtocol is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterEngineName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: 'tb58clbixnugu1pg5q2vsv0001kawvw8ozyynloal7tyn16qet',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: 'k40dcte0nevpb1hgjgs0',
                party: 'y4pl8phxoltcc8on300u2n242k9079nrih4s7xxd81151str99v4jysivxr66n0bh2gtqaz29bvzqvfwlwhi7xf6388zso0xgmgdwdu36vcdvuohcb30mz362dowiw4e9bojiryqvpe9mafiyu1lwljtvz1r0os2',
                component: 'tatmy6x3up2tnoz8vkndp3al29e4p95ks65mckbpzbnxobrmr03r6bfy7on1wbey7yojf3dfthpuxj9v45hmoyxeog4dmpvfntb5vn1t06t77xt8tz7olwr46rcmwy8gufukc409aqwl1ju0mqmkn9uxpe12taez',
                name: '8f8hmsqlijwlzv1p0n7kosr5o3ko2eov8w52zpayamfwfz305btblci6yukh0gk6dwnxjy5kxpyf8aw59hrefmf93ovoof8kahsw4wfu6451n039rfw1nhfl8huy5p3c6g43cisn9av7wi1n4r9tlee5wkskq3gl',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'e4vj5klswk3z2zeguat8gcy2syyuv964u9zjaqsku60jgc7oi915t0p7exv4f78n96vmoirwv49djnlkpd20u1tgurtf3ghfedz619mp03oeyz6nmbhhlug6e4muaz0rdschd5s4omoehifl5k1w8o05jl0g7zyv',
                flowComponent: 'zgelp45fdx707nvjxq4jjip3om5v93ex0qcjbxaywigahhfwyqaqbv6rhvxwgtdic9rj1dvp32t7tr2vtywi5tlvkial40sudg2cdpq7es42h87lhoc3ub2s2q8u13ly29zv92om0nq0zk85jidhdpog9v5o6cqn',
                flowInterfaceName: 'to0mu7fbvxuxadsqsl1ig9d6rljbyr1khjn3ae33iofja5i5vmnd0cq9zimkln2rbn5cu2gkdop4bokqgaysxc7f65fnw6meoouhtziiaeppm7754ffwrc7g763p2d31db36l70cp6erxpyhamwhqc506vtk2vu0',
                flowInterfaceNamespace: 'l0if1v3isr9gqn95sw3r00cuawwdq1ehpuld0a8t3lysbg6p76dba9ss99je7le5q066rdabub6tn5m6jb7qkk4dtwxz147cyx87w81pkqsbdfc61xz6k69x2rf69hg4soifzs9rl3pm7hwgaoq3hx1dy83wn5bp',
                version: 'pm7kmr6w0524h5yv6vr9',
                adapterType: 'jymqjbihguj2goznjd385iquvnw6rczp4xclhgd0a35omca6o34bpyf5vah8',
                direction: 'RECEIVER',
                transportProtocol: 'ujidr3rvjk1sk7l4qk4c37c11za0ovdlwo8t2frvpdd7nz9dc5syralpu36z',
                messageProtocol: 'ajxeqmufsm6ava5ens5bagtbmbeqglsycgf99kblebtzorvpvxcixmyyduj9',
                adapterEngineName: 'lsvluzo6ude24am8zqu5tm0hv1ltzmdad1em9ztd067woa2f6p8hkzhmajq2m9xtzfn6a79qokffe90s4eeanngw9sm0lawvlc2j19npggf5o2v06bvrxubfq3ru0swolifgf78lvh6xpizg0iu08wz9ecn6z8q4h',
                url: 'vsxkqk980vsqq5k37cpc689ptkc8qrcl209ehekzf64742dv2hslmshizpafpz3r3p3q0x7jz0h6bmwx7di31bpol4l1x8odrmn4yank567szggjubzuh6adp400b5eit8i9z8mgj8p98sr382wal7f4yxsgly3rys7y64o3g3qqw0jazzhjl7w4k2onb02vbqg6q11m5s5jumu28dbipiinjgj8bu361sww0s7qx4y20u8d5c82e1gbx8eyhd26x3423tldy3f247rlltt73hi6rn5tnwr0qwzwpfodhh4cd41pn1wta0fe1ci7652y',
                username: 'qxouz8mslwvpwlh2rjljl2ul54o2o0o7t1v61wxlvlkdtno8cev4pbtchjzi',
                remoteHost: 'ttk76vnpury2yn75tltzhcdex4vqowob8bwtq91k5eupqc65xt4yvh3wb9rlyx01p4jkrsqhs055a4dt1musg3shw8294wdr5k61cmwuto9ek9vyvhr3t1xv8ry2gphl9pp64x2oe6mbrki4amxjrqi51fdlvl6h',
                remotePort: 1418465030,
                directory: '51wydygwovxifv5mpm7cxmkjd1ub4p6bsuvisehxm5phbagw1t8slh0dj2zz4u29o826q4wanbyiybkzbwcmkn7wk4i0s2enkzo7snop5drfqs2h01326vmmr0stsvcs6gfbkbjhvktze8ch8zoabxjajnrvqj314ocxd2cthibaibmmcxf6zcsiw07bhkfdgsuw2kys8ieyplkg04wi0t7u5fpgesqiz9p6u1p0zec16v8l3tbxx8uyomp6lbsog3hgla7rrtky0133bf20y0y5a1qzojui3s3spra2o3o25hi907dcwb2n0e6yq53wqa5s7u7rlhq9lz3m57pe1chez5qzq2hoh2a3ub23tadbxld16k4ueg8ed2s17410g7bzxy8tv7srgre0dfrz80gkknkj3knz9k5rgd2oelo5jxy4e8ulwvx8ujmcxuflnf79r82lubj35cgopnw3ax9zfb4kha1cvtsttspnlevhusys85dupeamrkx7rmfmberknzys5gh5fjlek92jnup9m2sunl1wdmpkmvlo1ifyudthdhjc573hy8tqq8q6k7re9jb8crrl093bdf78koo4wf0pzlw4i8lovmcm6rf7lq41l65cpu18jegb5dmoglntcum77bnopcsoq1815xuvwilouw2yolxiksap8z04yoemkbyd6635jq09828dbg4a9j2v3qsfnddsu7cdonxz924wn2412lc7gh7sdelfybb0mclrwbnbv58o2wrhh8qqakd37z3a80f6h0uqtuhamb5i6724wi8t116ij4p1hrropn9qr0atekmfz9krkz5yus8mm3n5pbw9k9yjwahjutxgq9euqaraebuwpz6x04iw0vfcg001hnrhwqhob3anu00ly194kszncoha27k8w9joo6muvv8c14n01xlvfagurm7eotja1rrfpy6hhr7vey4guccivs5ii34x0qfq969bbtsvfpddy92tc5s4h9pi79f8hv30yy6x9dky',
                fileSchema: 'mo52ila27z2q9sesogxmx2qg1q0x6j0j0bmh2odic9our89ixo2p17rb9pd4eeo1zi01uvtemvv12gxrygjnp2hzlb83cn4naszg5v2nopthci5u09slw6qcolp57cg0ggkcoc14i0042xumxn94rl28kgm38d6rz19j0698eanuxnzxsxqfrwmidnz1jv9qxhaeobmm442by0rqhz9dkya8h871e69nan6plrbxuwqfd26l9q2qii86rhbnmht5f0x4s7t83jmjjv36kkwjocixc6gisifospznjxlhhnnu49auzi6l4ssk5unnvbjl2339yo6byoukfxpoxr1ti5er2ycan45h48nytb2ujs1ufg1wwauch8v6cp0exzl1o9a6orsd2vity39vr8ibiwhlzdbyilesjwctzq6q3ys639tg37qn4popdoeu3wa2bzswrpm1qi9aoxovfm733xo0rv68fnn2j8gwzt0mpo1arwy9m56lm1i6i5mwzhyatf8o5tbl5536iec5rcd6w1rv74jrixx0p13z6b6muf5epxbs3ceq2tt02bgmfa1ynnr15g2a0h4xcdlvdyo8x3hcrf0779jujbza9znnlmnnbe22f572d7fj3qd9vtf4pl6dsdlm8ps47lqnck3js6yb8gon7j8ulfuiixfon5p8bllrhwktokx6vvrybpr037tqq4yb83o2mkd8cpqfkb0txko3yzllm1murtc5dc4dd80pwrspw0si97tync6s4zy436hh82mwcn3iq67j0wubefn1eds4xg409vte96wvoloibwpwsz74r6xrraz40sm1b6w7dknfmao2uguoax1x2fnalqnon21ntuw93t48j76vwo3llfvllvn8xddofnceali15mnssx36da89hm6cuzussn6gycni9noxb5jvgu99inha21pe3msds2zg0e9bcomfsexa07ghocymb13agq3s4axavhnynnz4o95nmytc3ud2atu57oc28a71',
                proxyHost: 'tutbqokyc1bb2ls3h0fjo3zc85fu74tfwne4ggy1kl6hjdqnvs7nxe4ca83n',
                proxyPort: 5639957585,
                destination: 'o98z3bmvhksdsilj5ue94qkbjmawbkl5tkka25arrq6l6o0s49nxwgp6c9q0ghx8i4v87iisy63d9wwjwtmv7zqogr9t0n1z1p5tl2e9ppyfx5m5k3aezjfh6l742nwnihthbh0u1hdtpjl8boye5z703x2jfoaw',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'c3xoyqheg6ga6zd22d1xac1r9zsq1l7b8tvhbnc6r1j07el40zlfzydzff7aqe149obn5ul2i4ibn5bnynlb7wrnxrt32wzlpnrhoxv0ikansqbs1aejgjqpikklfbs7368a5zrhhplkpxfd320mbvch3e7pjgm4',
                responsibleUserAccountName: 'egcm1z9jwb7yilak1w6x',
                lastChangeUserAccount: 'j89lbeisoj9q5e6iz817',
                lastChangedAt: '2020-07-27 13:14:47',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterEngineName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelUrl is too large, has a maximum length of 320`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: 'cp784phmdhjpony0f8a6tniyzc7c1jqu9y2gwr42hslnjyz0y3',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: 'e03a8kpdtbawd3aleh6d',
                party: 'oo4uau5sgdto1gdjenbhehapwtak93svqkz5zc3t10f8ix55g7gi43hkr39nvedhep2l6eb2erybbflk48s5vt748lf20o9cm26y8pephbm9u2yyt1pi636s18w14zc8m8ly91y4ilhg2q4x0il5k07j5t07kx6v',
                component: 'kcu2lkexvpt9h198u5jxm12f760tubn9sg4cyffjb3j1pk0w6vipmrb2omds3l7hnkhaduiicw2t9yq6krqrjgscuw9va1ptokr3a4ufs0rbaz2wao1vl8ybi66irorxol3vla9w2fisnxi23aaj6o192oldo4db',
                name: 'np53p7b9dd4o9ozrqrh2viyjvrxlt93s2am1f2a78ffjpkx8oruo9lbipkmuuy66i4n55xjmcg1iuafqynljdj1q5vkzgctkp01srl0dr5lelcbqj1kzybizzy9ii33r184drxg1c2rls48lonvtjfnafst68xtq',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'qwdooymtti1i5w9u91nsisuscha6btwl4uyu06pqliss8jv2kppo3t6dxcq0ixvuhiz17pzuris2bp26pacqhbofud9l6dtxsflsuh5qhutoig5kj68p7beix67vqovxzgtsrspcqp93z18a94z8m3630wmakym7',
                flowComponent: 't7t364qa3i4xq8f04i6k75lw69p29671te746uje8spok67ubq0qk7vvwwum3ktxdcihje07lf1ip1f00coyour412rd2raio0rmoy1lrv8h6vm3qv6wdo5qlj2rfuhzv531wo9r13c0h2ja0zfa8fhltziq72t6',
                flowInterfaceName: '30dswq0whu5boayjm5wfnuu1xxuxvkn8cemmpqtworlzg1p5ox2r1j0hlmvw4peuathshlyriabe2152l2vesqae0vw8qfgjmns16c1oedkrviyfzfg6zvt9m2tlhtdwu9n2duowm1fhjc0wo7z1ykglgr9mpwp1',
                flowInterfaceNamespace: 't3gpjfxphj49ukv51jzobhfd6irxaru469qt4rn4per8jpkleitsjq9o68v0w81864jqcnelehpo3lvb6n9kpxt33od1y0jqw8cw86y9aoarkp9d10dv3thvxxmoa1ujqcwaeihijc0en9063zdvdaetj1xwzajk',
                version: 'gos55iw34z2qtwot14o8',
                adapterType: '5bapvby7lz4jzpqy7n2sldlb28wk6ahn8cwddwmk0vwu1ueeevuww4xfes1r',
                direction: 'SENDER',
                transportProtocol: 'wcll2sjbil8xixxuomjjtg9o0ikmdbzevqagq43kmsjxmzi2e2t22ckxp5qf',
                messageProtocol: 'ui1q0azb2ij2lw2cv4nn5c4weabs8p093vopgjrjxisypi06q6evwascddg7',
                adapterEngineName: '21rje7mi8ki76mrxu79mx8akl1bvnexv671qgqlhjegie7drsrkea8ef5cc96fmco5tebmmn44275wul9mv03cd701r54d11lmnfokeqhdi6qqxs4hffdbdg5tliyx0chmdqjl4z8v3mgh20wmwkcb0hnw3gp0ms',
                url: 'cgqcu2r95eq32vmq5s94ywd3y2c8pp2utp360oof8tr57yc3cihgxd0fvmhso2h5azoq0h0aqq3uv6hzfopikh8wohkmmokpfsfvoy9hg4ug8ss6fpklcf2r6uh5vjqeu7lfdwopkgldmin7ytpf8nrpso7zjdsht6kkevomml5xxedrgzaw5qdxcy1b5lqbk28dcsgx9wjgezlgs1b44diyriqz28uq3r0mp7ggh33vipuriynvf3ez89u1js70udrj4f5jwjlwdwyx9zaqy6f2g88hhqe6t7g8l9mkibifn92lvlxujct9iwxsy8e0s',
                username: 'ik7s66e6z6cexao36x396xku1rukv3t439uihkprud9e8y58quhywyocnow1',
                remoteHost: 'h9h4tlw74r3s3ewk24jdkp391j4muepac0a6oamcij0ow6tu44wpkpuup1f9rtkl7u48n3ygr3559bizhqdv9694swej59m0ihyrbpjmz8kdap6wyfv5d7vdgi8wx143qp0v17ccyk6jtqpcf34sz5k6d51xh8bm',
                remotePort: 5623588237,
                directory: 'hjz74opyek3ms4jjbd6ogjs750lh76tq26ltxnde6flkfdxwmt7gsuzqjeap0ovnqmb7bvwd5w9gzt65dj6crxjay2hftu5qog2gkbyo6sfzjqk7do1k6gwi9pn0s2kkz7c3lb9ljcr6v3rkgbbm9rslfnnz17sap0v2j56xs4p2e0s2qg9pjzuxkfs67ihjmha3ban018ulamr47qs9klsiyacznpkl6boqe6ih8ftjxi5ab18cw16m7v7c6lmyebhm71bz6ltdgnuqslnmkd8dc5130od2sxyrmknel9160e6c2hyuo5ang6z0twb2oopjpo8kxqcjekykb6pleu2j4gl274cyrksztro1xcvvs3ij2heith0ro0wd9vs43daa8cbr890us669b8in0hdvfgo20sdo9v1ohutt0p1enjnwdxgtchl2y31v82y3zxmjva2b2qloijidsjl8urzau49zcl1ha4p5uapdd81jrwgloqg40p5yidqu2pocucoknokfz98nxrsbdxw96ztkiqfs0qvsxqp4h453hs92u60zulnrxqtclsl524b080pq50jnvtjwlbttsinhke8b04c6aqf29nxdndivgwk5hs9y3dy3sauykmvz5dd91u9cfncvl95c2h165mrcgjgvml1bkd7ep1ylzjp5wams4fo4ncuoyswc336pvzd6xa5ga0a73nrvg7265mcwxv92sa85ytgkg8gdcuu091rhfyv0h4fy7vspodk0xfck9zl0cvxozlc2293lju6t5nk02lprio9rfx6tjejhndbnqcw9bool5h10ga8al0t1wf0dxndhbl6edqk8nnsuzvah3s0vqe8qmm8vuj9nzh25buhv8x7fhdd9e3xdykiztx268uizsavmlfm2yatp8odesf6a6raw6ew446o8cfm0gyi4k76my9p2ecpf0azz1ckrm9pyrg5lr2qkxanfbhu1gxpko0o3bw69iv6acrxnmdmwzgnrzs86c31x6n9j',
                fileSchema: 'miwfofifxqucib9slgfw3qxhlau6axp8pqy0109uqpsaza6crx487hemvdrxf4s1ewl0mjyvu8uelipqty6kj5yfjsg3i6v5ylb1gxhqmdqjfco6i6ua62zucj02n2a5zbf5na107n9q6g1bz2vlwr3ywu31mqtiluklaqz7iakjabg12xd6zc01c98wvmbuysbr9vtdlgys0p0y8hrpxwmaq607leuj7qz6d5kr4bm7yhvnxfmk4j7cv1xhm8doffyl1bjcunljdvyxt7p4jdlia639aqmegn4u7mw7nmynz589yd8jshxtgz0ft6uupnysuua1js1r8ca4pk75qc7f633mc942eljay37oygxpq815unj90cxoc14cvt6esq7zmns9e5fg37u0bp2ylqi1ybg6ual8hkwj599vd5eubuotdo2z2as5v28adr2ztrfquiiz6fnezz44vfxz4no0q9nnhxyxgk8jkbgy4xhia6cxdd6y9wpufpq6h6lc8cfnn10x5t7m0umadwuyf7yrt5525l4c46gkyaaftkfmrmy5464n93o18weaazvgwnzt345tvm9yup8bz614qlcvy3or0zyf1cxuhv9k9oc94vea8m7k6apfjye3ucdrhiy12sy1aru11bvk6fzy6vvhb5a94ezvxdcjqfqx6m8rvcayxgbl8twne5bxu23h6d3jeasz1ygf7cwv4x301g8el2lw9p4otyxgslo6nkjr5nz5xbzxau161hjff2mdt1r72eg37ie2tq7comy4lkm9d07gpumj0oeoptvabjp3cw861kzpp0ekccmdno52ztj9f1303d6mv8p5wpcztmhk7iskkrttlwe2ho9r59aw3bi9sdrfpafoutqwo7u7tnwg24g1wib5xihtvcywsabxryhbk6474rdum4vkortagdkzizug88e2ob9zsbitjzxnwsk4zzt7r8nnclcq6la1lnz2va4ypi2372udsw5y4y5y1s2s7wl0kud5t162',
                proxyHost: 'bsioygddsgmjvaw5wgl2c2jeiha5huphbsb0g4vxsrbt0v7fvqakx4ritb2i',
                proxyPort: 1670988830,
                destination: 'i8p5t9umnqw0y8npk1vec5gg06wacsd168j745e6yalwy1oue8az8xkzcqhx78mhqp27nz3qxog1nn2m1rl6a65c9w45otie0f88cwecwnnacl83d6j5xdv720ch3md5yn9dp4744q841l9g8gex4zxhp7ym9kx5',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '9zwxbx02jx3v722313ddgjrrwf7jvqnravs3e3w9z7u8zfni2n8reygckp4x4rq21uuc0b2ta98k16avx9vx6t2sh8b6olj49vvuh4vcbsuh00ybt23y7krdt8cv4wunfrddah6kc5zubbdeak5lehj9s19e97d0',
                responsibleUserAccountName: 'iiskx9pwaxvdmwo7uzi0',
                lastChangeUserAccount: 'fot7qhkd8j7mg65bpwgl',
                lastChangedAt: '2020-07-27 09:00:04',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelUrl is too large, has a maximum length of 320');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelUsername is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: '44y6pscqxuc4hp4rbf0yssnn4gykd387a8dp82qyjyk4xipp5u',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: '5efw2fobcjrgw32jwvot',
                party: 'd3q2pf8yixoqum63u3jwalm0unbs2f73bxfp5bbui80gqmnaot8f7pqsvc15637wogm9v8i5yxwqsqzv5ascxiso5jp7gsrwdhi7fwic5jl90wz7mh37s0yas9uenmp0s1unsj8i3xb5kbgu23z7y12w8f6kv2or',
                component: 'i1ejp5lqg4vp64qz9dqco7e8ayjzx0401h2le6gdnf2ukd2lfvdkvmm3qtqwzda1m0y6j0j96u4jg6xscf3q7zm1ug8pbtexgzwnels3s2o8e5aihgzkumpaaoadw4sawyteyal64jbuksiue9jmjmg1mwmq4kq9',
                name: '7hua97qyh8c8s8xh5mb17wl8pf5y73qomdrxgvzqcaqpewdw0qecbuqrbknvmfmeq2kc3gk5vec7hi6coi6f00z2vc7pgpigvsltc2pc3qmn3k60w8088nqs9jit8dfafjt8rd1dfiv91t07idqkf3an27ajey4n',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'f2hs1kw10h1r6k33aig1nz65zrujkj2w4d1oajextqbaz4m3lc0rtb071cgupbebszrnvjgt7guwjjscaio03kkpeo999cdbi1ddsrja22k3e6jcnjctratpn01akan722uni6eitk8q73rekr4hwvel9k99ptnq',
                flowComponent: '0gtc4m9kaohuo28gbzrqtqd83o3o525c0zqhoneoqe9bolkc83zj26rmoznmxp21ro66h1hjvqknt8k3ibdrwr8hdlem0tmos2ee1wp0ludp2buek56foh32msj5alpq6t9o0cd3snmhcm56cdg0a5ifap0d0vbs',
                flowInterfaceName: 'wpyccureb0j10rco49fxoi6823snkgds50swydps0n68jwp8hujv4oq6fn47oz7fjpccpp9wq51ogvv335746hx12zw4a5fvp3xcrmmzhwbvjbn7cpcn7hk3pvgecitkps3ytahgxpijafq2z1h8xfldhkid94hd',
                flowInterfaceNamespace: 'lmbgqe12rqilbql39cb38pwe5n5vs2ekduewmzkff6o7w5jmrbzrqlimpu56ve5gqjdwax6rnp40rlgxbwuejy8kivsgyj0zwdzyqln1m8wpy2zp2mq1dyj8kmojdzw0pd5tpn2kd8pziwv1sqzl1vxq4xfek3gf',
                version: 'wnebkxdmlc45djk7o9on',
                adapterType: 'adw6u7ea5npgnk23xt464p92e6z88mkmvnr1lm869w6ouj4sc7kmfnwuzw1u',
                direction: 'SENDER',
                transportProtocol: 'ba6thnw5kn47zbcjicqeyspfh631835bjz235veo6rt2reubkr1thbre3doi',
                messageProtocol: '3fu0anbo6hbdf2shei7bt9reax9v6rmvtvsxy55s6yfwznyncxnnv37yc7n7',
                adapterEngineName: '2fc7ywd5ufezhxvo2vi9chyf6bejyf9ogs4aw93dmya3ifm0awblpr82d1mw8r0ld1y31sl3sp2sos4hifnpf2qht1j4imuttu7qqjdyx2w7nwpc6t4ejequmeu3awyst73x7z2tceqogwh9nqnbsxhy26y73drd',
                url: '631wmn2ldgdsncrtemh91l3tyyybwhkgri12h9myd7gci0w3bzetn6h1jhg1kj4iuyue1yrdiv7jrd21jicxq1n87umm8welj8lzp9c6j3kyn0vto6tklqbljhxv8e0wnmf1hd9e4fcens3v3vqgoxhq3o0kyuaczemsncrz1bt65rpotxb27zanyn8xgshrquub8f1tgu6ecg9h7r9slxldnf1lwpoo2xuzswmk25qmeuvh1t5bkz4gkxcgcvb5xqp9dfeecd8k4mr3fcqr6igoo4kdszex5ri9mg6c68ad4hy8jzdfupgflaxkvtlq',
                username: 'xf9hnm6qf4p9ppfht1f7abzqkdi40hogmg2ntspzpu02eubg03z7t5ub4jmco',
                remoteHost: '5hc54b5rngx397yqxl0yupf55xs884yhm08l0kkj8max27lhvh4x1aaxj5ercmwlxribirgy0qidz8e4dixac29d322pfngk4rzyuap9cfkilndc1vw7i5fnto4ckmuzvya27vdjo2g5vtzu10wpzcghrw696c4h',
                remotePort: 8406837411,
                directory: '76l0i1e3yuyoqj7aoylvddppkdvukeiqunr063ggdbc20u7x7neaf90st9sm3iaxm416f1w2baiz7drrwwibwikgpok744988q9bizkjd57my3op9j5752veae4ugoal6y9hxr50yxcknux1edgs4rzzrsf9crxw5mctrrgt68vegvbjck1ib4cato8a2ted8zf3j6m29147hvnf4lw6232mzq3ws8uik99zyhm3f6kl04e819ko85pc1xipw799dlniruma0p6wq4g34b9e0g5ru0yfsjfhefzkiunnz5acph6q2867u4ahaz1ya9uomh8fuu3a1u5eucn0feyji8y344if96ymxvnwzol74oamr59ryvjhwj50r7zhgt4sfoyj61386qm9ifir7be3jhqmbprqgjipkdcf6mczpujjfzke1zba8j7722mssx1ptlw9ph4j2d2hgp6gin62airhyq5pmlcb845ujmd6xs7tygsczm4y39usxpubhs46xbxb38ysxwhrml8s3hbz0aq4ofwhsh3gu4k6wr78yb56wiqloisxcfex2mysmngx59tui1j94p7q0ob57u1ajp88x62tr0u6snvjckmpb52xrjonfikj5uzupbsatwty3yyjvlt3ey74fa96yp1gyszs8i9nrio5v4i5wgjht7c8fcwr9eum9t9wqg92lxgqkxc2gp7yk1lz64u9m8yaf861y5xyo51l1h4t140j2ftzpy45crzmtqf26xn7hd036mhhgrvhfx44w718zbksn9h4frwug1g9llsdoohmldjdr5869i2e49j9l6ujt5l3iwdi4yfuatpgaji8wxn5ak5w7hf5lk8aokbxn51wpgz59vim6mf3l902vdcs2qrqzwegffdqpi9lrvx6qcl8b16gfe3gh30uhmmacu6ue3yw518q8hxuhnwcoxp9wfyf839ckt3ita091wwaqwkaeaj8q0s08iuahnd2kny6kat3ykqnl6pmw1zspblkykdt',
                fileSchema: 'ntw27je6jrdtxlk5hdqouwxvijgqs9khk6rmw0omi8khfx8j6nt2epcuqkjuweb52pbgl7x10ttu8xzt29f3hm1feta4v52k8xekwxevxutshwipl4h2p1ke7hysnzbu6zml4uh1yf5x9chtkvnhazgp07d11nrzpnwoc1wrw7prail0v0z9wvndivn8b3b0wx9js73r2mompevwaxrhawx6zlds1zshkyrc4qafyqibhzwrwpu2ma7wejfapw7qzvfrxnyznz5ibbdev2mzm02e9ptuxe1q1i37ue81epqkuhq9tbo9wyh3hx80qmhopwwisucqdu6sny71epywcqislwhdr6ytxicfqsvf4l9k30v51ftoxhok3u6c06skm8jb0gqmlf95qwvb8jraxsfi17vjkntdjxfl702hj01wqyppg448wqkrnk33fdma9twjkhtgoetmu92vd8ip4k0p7d8juzaik3asnev3g5d0gjlgu5i9vp9vume9gnrcdgwthfhlvxv5wqxktrug9715rwwvlryk6g11eoy1beyk6tdqfnu4gy0y7c71icjsuoocxxs0zpksb6y3vbfldaco0ubygy6srtfpfuhhg334zipnew69l3tvbk5dqgojvn0lim39ihbl9hna6t09zouyzmb9h5llu7nhlwa31dsx9xh9nc9hqmvqfpmwiyq5u4b74gjnnbqx9rx93uzfz2dqjvaoenofftpqdhqm7gwt4xshk59brqhhxu9s5wque3klv8huwniisa3ga7hc44qrxihdbyeks6pdukwgw0yd6g2txl9asuwcmzk4n0by12b1sehdzu2aty49dsgm461c8o6wwjyotbl1iwyqoo8kfww1b3xrimnw9tl0xdbw6ef30bw4zpl2q8nk5tt1pfgsgvhvm9yiy2uw47orknznzltxfd40esng489kro4b8uidzhd7a0majay471gn3nxq51dkm6j52ujwxxtu7ewhkrjklrjpdcezubkhl5nd',
                proxyHost: 'l7o56eyswkmbkcpzlk8vqn46xlvp5cyrwte1xby9igyk8wd03c20id7o62xk',
                proxyPort: 8972054370,
                destination: 'wh46b6q6fmpv7m49yi0j479fqjma10faj8piwvtbbmueqj0rfrb97jmeegmznckdwbv9hlrzmum8jmvkunpikq3etllocyulmvd13wzgk47f6z57rlvtfoo0jnz6ob50am6qkwgid9o2lli6byahwrowpvt4cx1m',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '7760wwj08o6badflj9vdv5s3ktc94rug8blrwozp43clvsblbi3z91yi19btdjzaddrdvy4tgmvdne61d38q4s1wyzlsxxiwtabqnro3c785lre8x6jrr2ngpvw00nwrod6n3xy3nmx0ts0cxujdu3zsoxmgsb99',
                responsibleUserAccountName: 'ofovld7p4j2mnrncfqkv',
                lastChangeUserAccount: 'm12e1zk32g4t8jydlfmo',
                lastChangedAt: '2020-07-27 04:12:25',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelUsername is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelRemoteHost is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: 'zdf7l5ywbfdkp9krosj7au5wmxctjdyqmd9f56eog5duvtbh8c',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: 'qe6ltg9iylt27ch73lim',
                party: 'z78lofeht3z8c53i3a1szmfx1qvg1wby14v5p47s4vyncy1u6top09uhfid1g08qisku2ugi1iszaobgahmt0g0wkdw3ix4ftgvm4wcqvt18bk7sm939t4jz7eupu3mi6yqc0sbuldpedea9tuifzu39zog1shkg',
                component: 'ertkeimbr133wvbir4ibx96eggujkeq0zyd3wrmxi2keu4pn8zcml2jxcso0vubvllxc0ecdjwx8h0n9j1asmwmya83ipnzqgmhol3lib32fzi1228l6wazlv5kljvcjr2x7fvhi1ukv485yx37uctj0xanljfox',
                name: 'va6f3n4ca7nnwveh2y8a9n5u2ytpf59enfsaolp0823xed12x0p8ocgbfoebfbqgmwmrwxa3il9oejbh84rrv4dzzszijelkbcz8gh1a2ypwlpmg7rh0zqdahwf36p8xbmmnnwlg4n1vsgyuxt3ixxqg7twdqnas',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: '5bd12phs5dvgv2xor7v6rsr8h6oasva6qwzee736rogv9m0qfljh3983fkv18x57jdk7m49ljk7knct7mh4jgux22hdq3yvp1l4m16p6nz8mdyx2kl486rwtlkqy2319ai1gv3i6fhl2s3aaixqzm920grium8wc',
                flowComponent: 'mn2n852zclj17096ejd97m58ocwxrx919qppb54wre4pjrvflnwl1sn0l8fq6fv3005t4xz0fsdmxdy8bvrhyy074v2niagzvvadlv4vpq35srpw2nmq8adcc9d5h4e9amtvtk9m0lx7nm8awprurequ3bp5egx4',
                flowInterfaceName: 'gikxo3jr5njf7om9o466nexrhq3ba9brch7l05jkwjqgjx4fhhoehha3ht6cu1q5uf50j84ggcd1ttu499w4o2fh2nbx03fti96sc2i1wat95w94e1djpi0bfqvm6acs9nlg1ck2zy52dvom9s3mte52i12h65td',
                flowInterfaceNamespace: 'u8xmjik3ir5c75zbk5mgphxj27u7j8ihnoanhaour9hnoshjo9w3n4tvxxx80u98y4jt2zo4v5f3ueqk41qkk6w3apaasxr85h4yzkgkk8q0dideoisse6ggs2akga3nvg4fxsvdqogdw8vrz4o7rhcegkeq0soa',
                version: 'llfrw47slicbaosndy21',
                adapterType: 'm7ye5w1uvr5fe6td0fdwe2mkjhfuc9hw7pp9vj8h24fbl2khny51ojhz9qum',
                direction: 'SENDER',
                transportProtocol: 'qlakczzp8zyu98gqt232mgbrdmp3c5trqr7rrygv1vbjoht26zj7jkng0wjn',
                messageProtocol: '6zg2rhoipcflhse06dxtdjf7211g9qr16o0dts7s5irqe2x43rvvxt6e0cuu',
                adapterEngineName: 'n07hums4j881p53fy6homez2n2kvqvt4tynq0irczmz54fqhv4ewpv3vgvq2j5ylnxwcras0jx3o2wr2nndb87dahckeb7h5v4okyavktvf55ao0zq8jj61s7jsoqzfov11ehom9nci8p9afm4iel7ghcjzq641b',
                url: 'ledwixild314jb8sxco80ybcfdv8nzkofd1hfzq4aeloyblxnjp0529ivt5x8f0hmuov03czzlo392rk0ht3xj7bpqmgi0vji60a2vyrimmhfywcrm1nnex97wb02pb7dt7ckdhyku3vr39n1ev4ov2vqhk6ox0s78g2tdxjk0ovrhcrbexotvqeyt5270eledywosriduyxoql4os9bp57jgv3bjwahgrbv51mfe0lz8zr6fuv32w762saqhhqsl3roa2g9wg7h6dvv5ge450e2lt5jlbdeygu3btpbvfv4b0catiteqzc3fwl0ap55',
                username: 'rgvu1m3t4bjsylb3lgpdmjtat6y88gknyipcssyt7nigecnzqsxddcepfl99',
                remoteHost: '10liiug3bpmwurlbykzxuft97yuip3llukba7shffiyrtayhesylv9p57a8vjkmqtbzxuojdrvwd9s8tft7cr0z821ak8h62by1jzksywzb6x7i2tz22awn1u2z8mbkw70cret4fhzz6fd0eqok0kco4y8eev885f',
                remotePort: 7246841625,
                directory: 'k4fsxayk59zxrixfans8dcir46umpka09etjo9sajvzor5g5n9lwgzi12ukhljuymio2s07z0nlosx7czgueehqmb3bwobmeivjycshwn3wh5lik38bf3t2hypnxfd6ur228iarp1w9advhuq8zs1mjfnaahxgth2nfqmie6128mfbxqp32oe7h8t1tne9ccma4omhsk1d9zxlv8y920b44olt7gev7onv6dm3p7vig80hljcnfcfjmyd7kdv6s3dmki06lhjivminnkyr99wd1p03u3yvsmece00u6bxr3zfpbt3hejgmdmsxi9wkwmo1if28mqcf3wrxo7lrenxte2sdtwh2dlhnfgnqpiw9evqo9rldharzk8hkedu8u183upili56y3wnmhvtub1chqafrwqwxflvv4xmn01z6tea9uzmo9nm9j2ljto5knura0f7cnlgepj07p8g8pv65mosw1tnx47qxzljdas8t3ajjk58w76x3y5hd5z438khgo0rebm8r6kmp7ak6s6aai6n5sz5g9ueclkx77p2o6ezh1697vn3pedpn2l0i5yo7rmon38zmncnc1yw27cv6jtnaxaqw0347gthr4qrtyqf0ewdifcrlrvmp1m29qf0cyu7kqqiyr4te4z566g9xivdo460e9d3yzv7vlak488qc9o6nr4rb2jgwp1p4opfu5atn1lez0k64hxy4ddqd9lx343van49yy3v38s0pa876m16coy7jxg56gsb14bgp3lgsu2y282xa2su4yuyib8t4aes8z8sh3cl5iylcxmudltq2m8grwyoiqrq935jwez4uwatzcmxrrsgi14ognow7lzhrc33kjyx3ao52iupqv02ojcfgrxzzo7xmmwwys10xggp1xczk9u3hcw69lnjaqb5prda43pgketrga9eidvm56oapn3gpdng4dhvr8h9qmrw431iz9zfrks0va072tduo85g913mwm7jllbmn3sjrjl5whd9tq7gtgj',
                fileSchema: 'sc1c578ab13f8lp112c8ezlvg7mw6dgdbn8pkx308s4zj60edm6uh1oeukon253r7ge30z3tcz7o0h9u267kzkizvhwf6sfedilrh22myxi65x5nx23v1p8e829d5nhyrro8rcgh3euaviy6eawpg22pfw88ke5qta5xn4vppwdt2cxax2cs6fnlrszjw48q40raizwdybf2oy5eudilue6vdxa1vsuudjnl54319ikxck23at5zc8fl1w6kl29t71bvk41nsyfar4ivywg8bttm8ao6mbzl0y15kbdxiro8gfmxr8mh8y6pnm24qzdf0qbwe8yezaf9e0l9kwde8dcna573s1x3c3axzy18db5qxd82sz5xqg7bfqq41imu7subi0v8oil7zb0mjyz0fynfln6aphmvr57i29dtfkzxd2olv7m0dsuqqeqdeuqt77jizrsvf0i40raf62cj3dwtj67r42kichv1igudj8xh4yr7kfg8yipn5wlal13u93hr7lbk281w0ifls2c0brd5ypsbviw08afhnrlpvbwzm2cysywl6unxee1retmrxneh08h6oe2wd4qj0oe0mxg2gumuapgcdv3bpdhp8or1m5vwq1fmy4ociaa7j7gmzf7j66hpxz6qhy1m11bnsvnks8f5h7hpetywg9ys5zbakfft53och30rb55ce9znndn9gicyevcbo40ystuik49zrbqyqm0jqrgvmfn81u1oipfpcl1u0wocv7b9axr0g9ufdj9ppxjmt4m59gl4g8bhs86txaysrb0uxg2k5lno9ugluullsmo68dr9kjy0l62gj25z8fdn2wmpykvmeh8o4gdl65je5rwl2xykn91zqo1ognzq6h381a795iqv0qtpft1tuk1l7ygphxknbls641qexbpknr40gwhu2vbcwnwhyzczauz7gl6vs1al5efz0fm2m2k3x5wbjfzp2yhawam8auf1etwr2kwuy2lghj7wpeb7m5msmus795p2',
                proxyHost: '5cfjm0j80v1x5jpce829z7hh2o1nvwp0t0crw53co4oprwjf5mjse0atamg6',
                proxyPort: 5137341911,
                destination: 'qprik82ikzcqvxgayxij6q9lia9bmvmp4sd2ixxytw4r683yxmvhuohcawaxdl8vycpc3fi6llu8l1xloprn8ldoi2o986k2zlw4wy13gwav1y7ngn4wiq8rfw9ek7k5o4cg3y85vlukebgd3ntcbnkjvmfd38y3',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ofdxhfvjfc1jro80npwilbcxo69igscm6tikcqht94gea2bfpikituwcjknsb29ne1s9i8crfsytnhc95498m1t6nzv9mi10fl7svqg4k5zvmhoemv39qi9gzugudyeyrh11adeqy1etp5s4g17e6de9p9sz982x',
                responsibleUserAccountName: 'ub1mf8ftng9w7giy07pe',
                lastChangeUserAccount: 'vg3735tfpxyt13b6j9u2',
                lastChangedAt: '2020-07-27 01:45:15',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelRemoteHost is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelRemotePort is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: 'u0r7ow3id1nuo7mt1cd7swzuzegjqjc26zcmwap56hkma2eaqi',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: '8cddtjuj6nqdm56rj8sz',
                party: '7n4aijzvtvy8wasi4wfkfcxet88me639i6t9al4l0ona0v27wqn34g6688anhsavsg9q6xp66bsf57fpobbzlf8tkc2c6w7kngtdd49cy827n2qda3i5lrmpe7je9vf9q327n674vaf5ehlwtwj8s9fghvzy00mp',
                component: 'fat048t4t6v4liw1za9mqxnk70mibmvg8afz95vlke8txkuj1ynk2luokr6wcv2wa5vhuo61pdpkcuu4yamybclynofk4z9oqos26bjefmg35foikyvf1g8e43uz3v8oh09ujddrvnzsrzzqqf4bj2y9u2u3074d',
                name: 's3g5t53xt4v6prn130ggm6h4e1u8f05vdo6yj6l54iitl3k5lddtxn06rjib3nfolczfxsh7iep0pwf2zaliawdz55mvxhf19zjyng8un8vy0ju5nj3goxt2ymj9vyh03nldrrgsejybrql2t6fcjujlgc0resvq',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'n4bnugctkc9jykhotre7q6sp9osan73jocbkujslg6x0qtp2cqn3efvuh90v5755aia3fvm10r10y8ml7a3xt0xpbnyeaap4reooj4c0gat44217221vho9mj1dj5kcumno0tbkolictzxhevb4pf5b7d1wiiy8s',
                flowComponent: '7ywfieaqmep9d6rzivkqlp5yu6g9dncz2uamulnrv5hpxiprsoguwh1zkqdytb3gpbksrrmy4dolwfv76mveufcp12rqddzkn3qcnmj8wfhb4uc14kkgx5mzbth9zqrg9f2u2s2ygfejr0x890oiioov02i5338w',
                flowInterfaceName: 'nc5fiqdyzmlw2hwk5lbpx0u1i4p0o43swqgqp5mgbmkcuvfk955giymkm8iclbkcnwg3wrxbkn86qg7g25uon1histq56xwengdb3vn99qpyu1nyo7bdzs77mu3hxdyyiwznjd05x776weiqprqh77pqqp2ozbt7',
                flowInterfaceNamespace: 'v8qqlpie5d230okaclp2y5snqbhrhg4uv8nbvlbrt2ltdp78z22yoy5au6hh040l49latfm7fnmo1cq9cdegrezdfoay9pv0iqygcr6jo14u7cyywa1qfdb4galxhzxeto31y54p7s5d89wqcmp816xfqhsbmrnt',
                version: '361nn4nl53h5qtmdr555',
                adapterType: 'gfov4ssa6loj7izjrpfcs58ojydovtr09615zlw1b5e8twtvpx9gskat2yad',
                direction: 'RECEIVER',
                transportProtocol: 'c9opvmjs06mk54qyp3inr02i61yfpybt38du32rytjdptq9zng1lupmvb9of',
                messageProtocol: '0hl91ppz3y1zqsxhliht24wrwlqh1r3zgqn3ucut8r3xezat2ateksf7kyuy',
                adapterEngineName: '6pxs4ridkjwv4sbven7jz732h30jpqzxslkm3sy7nkoizczkpxetd767y1vwwob90loiv2l91ym8slm7h8u1xeerrrxwtp1nev7jyku49b8mn0dkr8ysr1zo1k3jq7b1i588njwwwf0bradyclsl85r6n1dq9728',
                url: '4b2a3djc0uwqebkxen3kjkf1x22zwetcclct24xj30u8el9aj7el33u69trls1zyvt0v107xx5e3960t1c8ybxcgfnjnse6vb2rnjtilzz7p7l05pkx91g9io9v2ua4por1y9mx1s4nz3g4vpktmvgcybs8wumgi47nq33udi6k5f2tfs2b789b02zuidgemavfudmo77qplikau7bxliijzd8pisvyszz5y4x9nwqgxpezy24y95uhjjha8q8gs54pgkcp3mqk4kur9bvnx8gm2k9mic3c1gu4e4jfhpkjmwgqgbq6zsu5ffpm99kbd',
                username: 'lnc1ureviwvijtvacbrryuzas3yn4cx3cg4jw4cv3e1ywjn4g4kehsku22mn',
                remoteHost: 'ql62vecu8974wzkqrxyrynglodhw028vpwdmshsoyigkbgmi10hwr2ed1rq8oicw6v7k17kd3aj05wj3sf952wqheqdsh44ndymef87mplyhbwchwc2cjp5vl7cffuoj0vcx47mr1yia1a5to2wy7rgk3z7cd74v',
                remotePort: 49687168241,
                directory: 'cf82t8yeeioo0shscd52vf1plju9r0fhbhtrnmg34bx8mglonsa8s6j7na8oqszidqk05lwp4kj2qvw0dgk4ls8m2btwxvludqd13qijpx33i7v9dm0tw0gxtnwlpe80vjbey7ghlc23jtxrm0ehykhfj4mrs4dv027x0p1p2wz8mxantk4hf50rw50bhnia7kc8w337gbufb3u6ceh3n56wtru8iga97qczvcft5r8qnm19pixl13e01njy5i0tifjep3pbsoz3x2cheli10bshf1pn0ppjqotx5ob9r7rnpc4u57aw2ttcwh6mmm3xzq13uh0dmrud6iirhc5jwk8ldh7ez9mzm6fa7fyb9i03a2s0ksasodwe5a58b5atjda5ehla2b3myyitr3kuggv63m0jw6m2dt3gl3awmeco00vxggzd3sofdqexcly6e0v3xwrjgzlwssy8t2evn8iutobogu0si7ggh9adz9enfha7xb40txjld745lw0ar3eezip6x697fv8sxoilpd3n3phyep2wq16yy3sm9j3ou81e51yjgxsfgwjes9js7ve6y1foutjbtl8iexma2roti14nd7vljv143hu9t55ffiyh6bry1ix83ute8vo0l20xacjkq4wa1i5lgvkrbibc6oqz2y520ljcmifro0xiwjmj8p53v76tqatdmar2zwvcfbheko5hz40tc796y2s6gajq4famhn74ay5xxrduncmta6sp1edblthwyj9k15j95oo0aj1e1iyu1b4zd8qnwal50r61ombk7c5jj54ek3k2wfjoosjcoikttepgg8t049wkv5bga8geqlwuhv7xlnu7m2koreyrru1vazpe8mki4rj2kutp0fhak9i9wv0k7ixstsn92mz7cnyt14u3qlpujgn0rqmd7blvthbmsa5evfraztcqe1uk7tn1zqsgconozfybuqnedwn3v7ldihpdw4punag4iikm1ubxcniqstoehjyaqaec1dha',
                fileSchema: '6bgp427ohds0wi0t4cxbrtflaphb8najxwyd2rij0nnzbwrgi8jbntjp2lo49n84z59fzjq1sgwelet0qfin65pfy61nqkcpkbcnf1kkuq6amajpg8dpjhuysnfm17eitztvu2urpx1eijo16kied3wxsvlsvst5mstpceqlnmycinzjs058529wkl84ljxqb3a88630tvqvpfbhhmsfkonko95hcwz1xhpztftv2efsrxmp0xbptz0ji89rck5mv8dq13fb1n3ohmb29e06262lffg6e5lutt2rnsij746fdp4j294rss6creay238gac7vs3ppyj0awet1zczmn4c4yxzvrk3svxhtfn9otzcdebbwpx19cr8kbvzzw0vdtjif2g9gmp2i47zdexmu36gpdpfnvfhp3qefm58hqctjihg5c5v31ua75wwvvmwtwn80ubsl0p3z9gndimypu276sva4tbeodesz2csifz3a2ll46v7owjfsnqbr59pwy84zlbdwjuxn4y6886d3bijdm4dnv53nimzd8giityc7yaf3yoiblqxihkizyaopqn57x47q38petukby0iqd1iqmltjqkuw06g4uyo2y4xtlps2wz5qbhcw6jvka3xn00g2jkjpzf99foyu0vrw8tdotz9ywp1wymvfqaxot3kxz1g7aufd6ourjzjsu68m56alun25pjay7kk5x538e9lrvmvp7o5dt5tu54x3x2naw3n01dfx1pm3nyudxebll7rdbuywe0qnqyj0y8sjrm2u6ypioulleb6x7u3745aekdar4cikzo2nr9oaxul4liuidejd9lrik6kuo4ze0a17ov2d7asyguhpy2innqpli7r1gr1hwl5wryac6etfhkeyouubntpevnmkxgcwy2h6mt549nxjdmck9nhrxksmf1jw54oqzl2p1sqqyj6x1o0w42bwzmbgceyu5tutct46x4yncqq3a7fm8agc8fs5t7jv00p7dpwkvdsfqll9',
                proxyHost: 'udr6vggfgk3ezqs68hbwusui12h4ttrddg5tvicm62u33a53jpzgwynx7a9e',
                proxyPort: 8854958551,
                destination: '3ltnpuia31sfc4xqos3yeph9awtnxw5sg902ss6q2d0v5xlp67rm5bxvrwo1mw2hr1l49hblxwh23uz2xy0sghb6719xbrlrqk15rt2mxuxfbytv0gu6h6y7ni4rl0drei9ix8wlbb4mgehypla7ryj93m6gzoj7',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '1t07ts7ttygh8xlenxye466losxh5g6vha1y7uhqbo409xpjd105xpfrifdndopazcl8ygk5qhwrw0wijo0xkt2bqaska5lt493poaovxtkin0knvyh22943yu82xphye9n0ykhsmjre58a6sley0m0q0j5hngwu',
                responsibleUserAccountName: 'rjwfwhj7et5hvptwfhda',
                lastChangeUserAccount: 'j3yiemndeuefx6cy4oyt',
                lastChangedAt: '2020-07-27 09:38:02',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelRemotePort is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDirectory is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: 'x0kvolkaz97t74jduen09cb6u1wcylmfvrvgr7rwhkg9d4xvnu',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: 'ryi45b1l4dkup42dvhqe',
                party: '8qg6tq7rw09ube6p6aql2zop9ugf43w17nrqqxdwey7xnjovt4xx6lafi2l7upm042ew5wplx826egwyvb42j82lihakjovog1fypqyz2gd0dzu3lri0shsz5fw4ehjqjis6w2m11eze0ni2d0m5hdjqsm5jr4sj',
                component: 'fmv8866vdulft8ux1aevikxha4w2px37gg00asm1bumzkwxwo3zz7ajglwwe9jde9jzwjwx65fzkdbt0fg44p6afr8z8n6f97600d1knwqfb00yw6h5f3xcbn5xr2j0sy59vw598sff4f07qqk9944qoue6mqxuu',
                name: 'cq0whnvwbz63u3qassdu9zg2gzkbxtbr8fcyops3q6peoudxie97mbnsptrr2hk43n3ff1hlc7z9o7wguhgvnhrs9s0leodkalkb72kkk1v3iibynvf122b70cq806uxfkcolldcaofo0hmxyoj1qelg2ouy5u55',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: '12le7scxj620w4762w14ydhdjvsgo7rm4jt0x19c8c01vrorywllqararsi49co6mo22f2wm464yghb4kml2dmiiry1r5vcqif4xribe3b59usrwi2stj9u8bw5b622iul85jnm3mogeabggolh1xfsqn8kmotgf',
                flowComponent: '4it68ya8rmg8qd3hixzwsq31q01skcbt8zh0ppmkd0278q1r55if3xj1apee8pc8dgtdlhx6whfsf3ghqmbf231mk56w7xsjw9ngsblkpocvseyz4qmds6tqvyr4ipkne2vhzjq2x3gy2k26ggd352f81tgx9abd',
                flowInterfaceName: '6xg1hc2s30rldlt5tje2k665aar5xwh68s7kqidt9bfj3kw29zul6x68wkn2vqyp0qj3urgpmtwi5wxrayf6g2xyo85sekyxb6b2wkyvhaevb4eyenqsvlvhq65bmm1z7eir396elgqvr1jb7sl45lsae5umpi7r',
                flowInterfaceNamespace: '5qxftud3wzyjg6q48qnxrz9p1p6hq4acdnir51n0s4jp6e6hhbc7cky4hd1horifz8emsvqey86vr5dqtzgbjzai9bjz21rtxmu1bqjn18pc0sjteh10o5j6t012kcfvomob02y4srskuurvx07rhvrx85b35k2u',
                version: '4dl1nndvl2i5t4gvr97y',
                adapterType: 'cs0r5v4oug8xbjgxb03zfz9s5jwvng7j57j8i79rx3y4nidf2eoh9zp5j331',
                direction: 'SENDER',
                transportProtocol: '910rm7qycjel7uv7bquy5ggqtv538rgjueh7mdiq4u5m3nma172fvp6m3q0q',
                messageProtocol: 'tx2ey242u974fqou8skb7ok5il8mgi8qtws9yvo8j6hx0a1xsx66i99ihdef',
                adapterEngineName: 'uw8ohgh6dodym0w9807wwqtxv1t1072fr1r6n75rrkytrdgc193y4533xcuo3510v0cmcg0ssr6wdm7ht8ynuvoo6wl6y37wx4nn2tosvo3ygbogua7e8n4j8x7sntw58li0rn9flin4pzn73fuj7os97x7xl53n',
                url: '43oxptn8wz74azve0hyuwq3xoag9fpj8nfzdrii6qj9c3rqqsq12jlstuuikt1ju6rrzegrf50qxo8uafg23z5ywuzqe33fzc7oh2vjmy4u121o66au8c14r90nre1rsa44loe7ycx5qt23sq8ya2q4w0rlk507yhvykah9kemcb02zw082pqajmin2t3ab5ykclfe332xollyuek0ndwacv2nbbncbwjlpg6wr4dxj0ha4ssp60auhrrpua6kc35cep2qzjf7g0zj0vzvuftuxww51uaqlgp2bbl5v3xmj9wi39ikjg1gu08rtyvwo2',
                username: 'a1yz32i1aiazle6gbr2xhc85qiypcwms6fgiwxtrpfer6k1a7r6ks0r9erbq',
                remoteHost: 'rfpwgjk2ckmqb6h1dibcu0r35jrf92m1d2vvckwy8xcs1pzazi0x89pbhnof6tj81dqa3mok19fokklgzqvsjj8ggon30csrd4x40767xb46mbfn7itu3jlgq06ji70hzqt4f90iaw62kfraqh6vhlbbcioq8y8t',
                remotePort: 4227773680,
                directory: '0hnql68cj5s6u95i0apcuhv1phijy0t1d2ckn2k078zszh7jfc21mmsy1w49gjjajhckgfan26ikgwazvfc93adhbtu4rav7fpnoeig210muff22j8w4fdnqdws6781f9q8who7ss9w5ptmdmbmakbu5bgz2qw9yiufukcrbmnq4qwfl71hhwrec1mu1rm96df6ksanba0bgj8429gjr5kqy4b1k21p7x34je4vwlqyuvjq3n8yllcneel1qevr0sz1hnqadxiq1rilk97exqf1ipm9nhqjwr4fgzqb8ux1mtefvyjv995y4x4z799vpyxjhz5cgl3bo6q80ml5wkgri8nvs7b2t1pwqmf88sgx36q3exxfato0bxe149w3as9bzgr184z9nd70fxhb11mg4dd7701ygepyxinnb53qejtotl8vtu0wlltfbzii3ay1dzrsd432ntpj125s3fbzke2hvfpq7rdrvbz24s6hsocp2eacnx7zn4dl1nazbqcv6g6xoalcdbeopqt5w6m0i6vumn344xxvlioc261ol98p2b44tud61ffvffqfacog6lnmd77wg7k07kgmrr6abkxfbdy88tjtbequc0h0j14eyef9nl7z8mq7eqmbd5omtqbikcs44upgdub5da6dokp7t2p3tk33o2p0nsm5ssezo43o5blh3oo86v7wa62b0uak1daxb96qbx8kswcf482t6hylsf7q0epd553i0txmsryhvapi5o4s37eausnjft6zl3klse96p9qencf2l6ewk8vrmpfyu3diqjogid2jodbmk9xwrmcaqpzuvohmxvkkdt34m2t70lusp1es9gb2y1w6myurf2q7l5hrt0dd24476mju8ux7qd81dgsmf76ytrn48ct3z0vpyavz13o23w1np9hbn3hr4lwpqh7a65roo38a8dgml11u27iuuoz6kvzcrjxto88o1ux764arthxpwv1kyno6ez8agmeb078s3ugvwhty69wisv',
                fileSchema: 'dnhqxjh9387lzgdrd5t2tvqwwl99a5noeymnd1vu30s0ez0qb553pf1001mlrqjc3pbdicxacfholx8d5a8s7gbkal1ihe9e5vmv2gg3f5ywxfq5cde0hw30upz401801jfg7pqz62srcizf26lhko78j0zfhiatfn81vaclf491uml5ngxsw3rfsb0m1m69cwopq9irk6pvjf9s2q0qhq9mbnrxyst1xmrarg66u8lfdiog4rhxc0o8e4vubwx314hrbw1i8xj0xjefkc2r0oinryvtqu3mvq22cl1d7681z4aq7nfmt28fmiynm4oau177s00aj7l5zwaxxea36d9hzmvr7lnu87js7xr2kyqwhuy8uza2s2z5ozld7igrwwmullgfcrqau3thfcrpupfvdmqiibp8bk9nbspzyz8ls36ddrrqxlt86x57mvprv3sl4wyewd94bzc8thk14ldwc60h2gb9d8qu0ggrhd943b4h366esomdbg2lg2vmr9u0o8rngv77rpit45dy6vsl7tdsy9x846o9gxpezvcmrpd4lexn8hbwb6p5c85nqc3ebpzd62zly9wig0yrd7lyptly7fpetyy7u7ve95as4og1elbjjcja9m14jceaffvq03ydd0yfbnnvf3ms5mtt92zqszjf2uwycf7nvmp35kziqunak525kwd4q16u9imcreiprggcaoiyqrtol5l4o2g2c1fh4ljht8e30847c9tqz8khuuz7rdzrnrur02419kswghwr63v4mmuwl5xhg7gyembp0de0gso9wvugfi6c486olj805kwbzu6bcwa31wfe5b7zwt18bepnmywlhoazvrw0ey2245ir85z4792d9wj7y2w8j7sgmkfhpnethfln0jc1uam2tsa4enf4ipror11tib9prkbq8spmbnxrbk046k671onaslibvma3l3kuzw2r24d0nimicbu6sp0860afeml5rcxxy9l3tato1w1kd5wzx3msav1x',
                proxyHost: 'pf9axkscqz58x5rw806bjpp3gqolnhwdtl5mjngx4qvr6z9saepbxlvhfyzu',
                proxyPort: 4369828053,
                destination: 'l0ppvpcd9wpwtpuh9hcx0x6fphsjwsxut89bnop4t3phupdckrcosamwqpg35cyb6yk2dg8euj6dd3hhy7rx7meege8k0madx2kyy7vdcbbxzn2qw3mjcnnuk5pmdsq2sui0owp25o0z580swd2f8r2q4f83hl6w',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '627dnusaietu4kfsahmye1qw2c7ee1yzfcp8xwmroanvtulzw5w7cpio9zam7pihuuorabb0c0hk8q5rzp26fdrj5gw31x02rh30oyzmyx0qswmgn7pb282m1g6wzruxuas7gemjur4grmadbkh0khwcs1darlpu',
                responsibleUserAccountName: '6uaroky5vhhwrly8sxac',
                lastChangeUserAccount: 'rivbk6ydwlmfi6y61m7a',
                lastChangedAt: '2020-07-27 12:10:05',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirectory is too large, has a maximum length of 1024');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFileSchema is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: 'rzfy2iiaworo6vd6miyeuf7o33outhvxl9hc5vy07vrkxps60a',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: '3h4f9rzdqsmgn1n9gy2w',
                party: 'i8fb86fm9mr8hno490kh3qy0pvsxanvz2sa016zyvbr5op42q13olqop1xl1evzgyhki8rwxs89rfm03vd5gyhffaws16yjawjqfqbnhy56lj8alhqar7839lko5ox478ucxthwumiidw2zy08eccj22gtm8ly1n',
                component: 'eztiku6ukjxgvhrraq5jkfbvge0bcipx38rsk7dpkgaoauamma3z3mvknnifxg6fcr1tq3jgrw5knapgmxfwl3wuynhx59g0mudbp160kko2u514somkz4x4a7s8f1hiwmlk8wcwkhcneaaoo1f8nzy47f3woor2',
                name: 'intzkx0xche6u4yysmrw1vlwfjx8qev2c5hpxkr8t21ucpwtbpy7s4refgex61205nfnu4piqjcwr725h3ndeqfcs0wax6r3ltqcrbvqs8u14lyeq8ozbtjr5a8hq95vba9z8msog3pttld470941sx5z7nlqgbc',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'e2fuoxr8pi1vuduafh31z4aixjwi0oe83zigl9txmstqwoshc0ul79cph8lj4hgv86k92fwwxz4g1041xcfc3ln3dmqpezer70uu2pq9qfhe8u23vtuvezhe7m8k8hqt5j3ghfasa5k774lhyo0x5pt1xgnvdmed',
                flowComponent: 'wrfip2pkxxhzoawpg17zqnwr60phl3nnffa1lqd6i6h8isf96vpp2b0qh8daf3mq341hxnbgavnai7sd753wb23jjze8f02r3s9y8144ov5zdj8090y9z0o4zfjacbf9sjhjxhbitun8bzkydloddrb10zqeh84t',
                flowInterfaceName: 'p3azasno07fsnfyin9kywbs2xynd73t1vb2mcijpz8q6skyeanigm0eyugd4ap6qjmh8dcpxvs5937mpj3vlfqqdrrwc1m0p4r4k3nprjzzpr492e5zoknyh1osmg9u2yuogonrz10tu5mgd0mn3sndd1dwjnjok',
                flowInterfaceNamespace: 'xh2meumne4yv4z8iur6cypvr0z0svu1c2d6pk8x94at03l0842zxf96t48le1q4dnbvxxx913xdkwgorpksfiqar5ljqq32q0koeyzswxs2007eqryjm4gumdz6i4yms354bnubvecrgf6c0c17g1p6iomc3ik18',
                version: 'wbduz4tbdfjosa2p22w8',
                adapterType: 'wlcmqs2n2r0t9c3l1x6bxjnycbey36vucco5i8zwwodxh8cfflt6c0ego4la',
                direction: 'RECEIVER',
                transportProtocol: 'd6kknctm9jpu2zpbq96887prhhq0yjdqizo4y8ddzc09om4scrcnep21v6a6',
                messageProtocol: '194ox2af4lvmqmtr4bkfucz91awbe6o79cbzaj3juvnyaakof5055iuc5qp8',
                adapterEngineName: 'w2o4cv1adp9bl6p0pi29ntdxe30cn2d8knnakek5hfdplzzwyhg2to9iz49rixlbv1voqja68vb779koxs3bwhhdba33v4y0h8eelipj5i3sveyvj2zfiimjvwve6a3bpiarxb5mousmnmdbqo5jv9e2tsn17kny',
                url: 'pfjvlp1qhlzcyod4f90vcv3f0ahfjws8odtqctccmjail5z7qhxjzc47dq3a7ctseoe6x2njje8cq5yxg5bkwyo3o2lyqpxsr1yt43jw90ji09qw8kpm0e9ey78yblv981iheoqxo0ksjvyb2mazh2t2l2e1j07dijl0shyjw7q9logk2nuhjtahlq6tqwrrxt0yr5wl7u1yy7h0dzokzpcciekb3lgl97n92mvy9xj67islqota5uzh30548cxxgilhe0o78fkdrzokcd57to3md76osxmhmf1lsg3r1900cvavg5hpx9g599ba6ke0',
                username: 'es4hpigq0ceoyo7m94ecb8ry1jjq7wsq2by94gqbttk47605czwsmi72xoqp',
                remoteHost: 'kam7mgy5f520m6yf9k4n3k1jl2k8je3rejszfk1kxxkz45q025kqjz8nzonkthh4p8nmkldczs2fa5piy72ap4edk69cz3lj3c4zwhkm7xe356z680souwosrnmx4z1kxm27m8iexnaqr5828rlmqld5e3k39nkd',
                remotePort: 8395094878,
                directory: 's86tygob5baivgteshv5d3l0dj14ohwwrfs88upk4ca2itanh9sz95bmwyvp9z80aq1t3is7ktrhg8b0n4pix8wedjfi5staiu20vmmmfxvdaone64r2qqci25cnuy3a6buy2ni8djd7fxpxnz8p8frp27fchkwmqqcqnfa6pdouavrds25x6ix8d9cp5c3t3s4jlx6g41f3oyn4gfv03ivhqacb5liginvqfeh70qxq54xwfebf3eyha1fpgfie2zznlx3k1kekrnjijqg9ipy0q955p8rz1nrww98np4y9tu3oycqaqxq3t5k48fuzr3uqsu2f4wbkc38sdl5hyd99ssrz0s8e0uiencfkxzu2xwt0a67n5sjgtngl37rm6xhi49tfhs58vtsryn9dm7vthpjbuj2vseawikfx24xu4bfbrx0a663r61b2o57479ahhlnp4tumu2k3pimpxsmbpme2az24fq64ooy29alfnnsm2snjrzkdnf9ox97f60hhekvoelhr7pgijzdu9io6lnsai71l7uetyhu28qq2lp21nc86o5etzqajcmj86scyh6itmc0719wro9xoirxl69g6nvv6vzo1x60tdo8j1bq9v5ib9u6fq0u5xqapi4twg81osjdn9mpa5lie3tbe380dk7z4a4a6rwytwdkxs5fg5iyk46f4mq3fwhya1p1pp1o7jjgwojdun8ns0snj0h88mpgr93dupzlda8sa21y160ol7uxqk6xw39c8qpcqe2g14sin753c4xu9i37e0arvzgijbpqut77t4c9i23d5fp5ux275dtrhwmw7q7wkrxcll2dx25svyqbaa5fyex1yjcvl08e1p0vmt4yhopkqfi6tzrlvljj7jgx2m08yndf5kvfyaiows1no7f841y3qellsgzw1x6yppnbru53atrp9751tdoxbvo518epdxfr1heobajqdhvi373v2jij0npezfbtz79h38v8xykd4xgmvokjbro379gc9',
                fileSchema: 'yjh20bhswjj6f7jua4l1e6v604768vsnpvlk6dskfsczc4ohf0m0u6vaj0c3tmoga4lu59ch12zvgrm20k4jm19l25fewem9jrikf2zmtzmp1ql0b7futqhrjtwv6to3ha2axo2w2e46d6en0ype41umzufp2oxkh7yqu5kfipixo0su4bd8qd93khs78rqemle8mo4inoef6k6idorql3re5lticjjzoeprg831a5jkbytr78w4pae61qj0xf26j7tcf8h1tfe5680bpi7n31lten89jritr711bvb4pf2lo4m3qewrawux97uw0in1wsx9a7b42zviqyfm2ero5d674mv5oayhhikyfwm92prv08kv0cti9ap1cf6io4mbzcfedl8f91fg69gdg67w2f4t4le3nhhuvzy2535nrdy9h3kcyna1d797youafiiroasu18yxn1av9ccu9bqn3elevifxph6npxszwlcbtkwi5v97a3utbea32bvc7bsd84lmlparokwbmab62giei32qgrvlc5f21ls38uf3ob7h2enltmpah8900iftu31pnmvqognrweidg2hmw4zeynm1bmzs9ag2rp0btymd8e6lu3qknzl3sfx5588hwow8nj40ymvh6shn0lwzjyl1frbfdehpvayb900yclfrylbga0guz7maluzxzj13ad2epzeu2ot0roy4n7xcwnyomrf9w36yt0ng71spk4arwvh1jtovyulwnmh68gau2ulkhkkpms4uxxk9we5600l0jczqn7cp4tnpokar67jo1eo2d075kfcgk925ghkuodx1qka9q0avenl58wbj0fs2vbfa38wemock0l5xqra0zck62joxns906w2zvaq5cgqyjebf9s1djk7s03kgdqc7n9jd1a8c1e2u6mhk863pqacpkz9bztze7qmjabpjg543x3xzmxxsbj22913xg7w22uivj9a2zn8w02htpwdlvcwl0yqqt8ufngm2y19j1ky30',
                proxyHost: 'c3kczpo37d3y7q8qd717m7fsgstffe9f9qv3mpkqop8fv25rl9uis9u6zh0c',
                proxyPort: 8138449751,
                destination: 'wfvfdcgd2xpklhsu4vmh1pp3uwlx338ztjfaibjoo9byqa21ekpq2u3c2ah5udy256182ea8np9l8iclvrm5svmvbd6qbij6mq5uhp4psb24u97eg91dje30phwnfxs1hoaguxxjnefi0406ebo8392jmft5yoqs',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'v2s3kqyby3er9gp1w2qkunkev20b4koxho8ar2l8wkzgnt0he1yuzmka5akx651chhsgjhb9yt1x78cz360s97mzwdg4p914owrw0tb56h8yxy57hpufec47cy1b34715pwvxpebet8swkd8p3rvikplz2fx831l',
                responsibleUserAccountName: '54z4wgi4ypxdxexdg120',
                lastChangeUserAccount: 'ogvzha0k9rx15uljhvyc',
                lastChangedAt: '2020-07-27 08:10:36',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFileSchema is too large, has a maximum length of 1024');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelProxyHost is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: 'ozoqkigzfj65r11afw5cf959u10ae6knw3ayqnuj71q7pbxgwm',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: 'ea1y36la4pyg4kv75et6',
                party: '7nyhomquxx0j1yvzrepww469bjkfzkcpi9ux4gjseuzetq1dbry4ec2tag9yj0srr54z4yivt0viur1n8olxk1ba9xucbsfp0l2dgbrgbknho8h95nz7hmig25kfhhonx71jomu2oooq3fu4xx1zo3mx3cmaur6w',
                component: 'lz8dd406kywtymjc0jtmycz30uf3dt75nghmja4q5sk59h7urt21akqcss0lwze9e2l9u43qol9an9qesz146l521rhgzll2jhskqqkoai9294dnhadbxp8yxqvvaei8q53c9h4x983r9t8qd8o2d5wrzooolxiz',
                name: 'bkbpdim5ih8xvj5v53ji9xkukxvpnh93tt90fjpy8xwieb2yzink654fjp1pyt01nrj6xubioxi6eacb0psq2rkrymbqsb78hq21e4sy7q0jx53cf91l0ka01tncd354s1rvfr45fp6frsl363qrrfhstlw4kz4m',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'uz9wm898p3qledliq3ozagj5db5rii40v8ez79a2opj0h0vryz1p0om848zjp86y411ksw3ye95f1p7e9hyuao15epya5dhy7jbtq5zyqdjlrdqsthexm3l6weripsm8rceaqq2mscbsusua5uhove5t3lh0szq1',
                flowComponent: '55b7ew14wofpceimoym6t14k2ndmoiw3n6qc1tlpsbl9cp0oozgnczxt8khmenkkoqyenbinns4yre9whtdd7cawulap9sm2xyjnj8bpnnrk2nginvvwrowre6oskeok6bpld6v1jqe8wkt6rshew6uj39nmex7d',
                flowInterfaceName: 'fjrpv7xhkdpj40ec79a487rgmucwwcjm9la5sfm5ftnnd2lzi7ytyz6mdm5jqe3836i1lxd959c5rlvsti8yw63fkxfrl6kverm6peqh3iyp03oc6qbi2wyc6vk371vtmtlynlh1tnep0xghnxrg4gddn6918exq',
                flowInterfaceNamespace: 'nmxlkf2ojsg7qu61jbkwt7fdw9znecpy0jhnqaiowtcpnkvhd0avoo6fxzx1siq3rses29t9xz51qu3419xt1ywec5mobz4zxrrsbspw66v9yezvxl4t3x2ii0igyiwcbssdhenoltlkoe2yqjea0hj6o3dnpz5g',
                version: 'zhunlaao22nq37ydelaj',
                adapterType: 'd0lrqz8ouyho4u7f0wvoybrb25tvz695ar66viyq7j0rlbl1gh6h637jpb15',
                direction: 'SENDER',
                transportProtocol: 'j2buez8wo5l0bg42yv8pazdlvsp1m9bdn3di5l805qnrxr6wj28ku57amc7m',
                messageProtocol: 'caz8o07u4035d01mo475qv9ho7svpju5x17cef2yqpw05hm4jq7i6lxprcx3',
                adapterEngineName: '7tjtq3efqljhfgog1wyr7cfyid79npq0hh5kcrx3b0opmc97dbeo80nqcww9635fprwswb2s554wh1u8u2wa3cxazey3pu78viaqjior2v9dxlv0lh3w6wuccfdskaqpp2tuuooqt48gh8ovm0jd3xrr4vt7xm4a',
                url: 'zz1rhhcaroq81pjzi33cqffd16nqg7jv78n8w0zxlht2a7kjz1yd5ohx2iy0x0vfhox4z8fkzzecslblqqityl13hkyiitlv7acc1kly0a50djol2se5s4vi76juh9yv2nktj2hcfudowiw1t0ltce8gf7rt6e6djcjh21jp05m5z8t9s9385m8je3f0pq30pqtazi1bvwdgiqjy9eqt1of8mbtp3rfwktsrdcol8wunpva2hdwu8vupc4fjnxeesl19f8upv2hx819r5x0s0q75m0ib1stfpe361kk9xx935r1gdd31h5zkl55w0v9w',
                username: 'smx12l9j1l2dlsitq1v6enw5rcxxgl7cp5v7aoa70doskicurjpx95qhyf4x',
                remoteHost: 'g43jmaaj1klu11p6hb9fpk0k84v53r9gax26q2895fm8gk3gtelc9zky5j1lydox1x4pcom4cjpbghuivkh83ec0gg1perpbv7q5xi0wxudiuw15dbgxw178zka7j2psf9gawvbpfuojmzt0x4x53o4s17q95fkv',
                remotePort: 4394528418,
                directory: '0wtuh6wucb7carpj8u2jbo7ceggnoqhlswzgyxu3na0s8crt5ty33g18mhsa81rwu9pe9ardwm3xhdg1jef1ox2mjxady55krlmz3hjz4rwzh6m3kiglt3eypbwlnfwzbh6dt2oav999n91lxuwxzs8d7du56yrltizclztrnti29203fr94u07sul1ks4d7wpxu5ei17t8mtq95ovs0mpxgkw81dj7olncuhjs9cchanecrlkjh9uvi82xq3wdo5euk56e1fdgqraoalck4io09c9xhbneatrlfir82vk7tsl7yljp0yl0216atmervdww11n4p18wehr7p3edhhde0q3sakqb8xcw8ohap21qeqpgapyi7fkfyfe58eb0vthsndhxl60md19d3fpi0msb9r4k0qj0nn18w51my4ygp7kr7frr5tmstdak3mvct0fm0gpwu6k95qvobe5nuj1rswdpgtt5xl6a92mff7kl96pzqquaaabcq5cj31w9u1wvcdupc2j8y0wsqjezp3h2cfnyw0qh6378tex66msbpzg9elxola2wfhqfzmxv6y40pd9ife3b30hoq2scx486g7k0yp6ast4dwvk7g1pff76z7nsln0e241bkdws2q1vxzdd2b4sqgqync3dpujj05xn3wr75t9t0049d3f47ee5rmnr41wozugbu3ulkiqfd4orx7omtve7k8v1lpxsliouythwssrt76uhlfipnkpimx26yx4peioqtznod7pazs51qz3mwz9ynpueet2ja7ylkciehsmzfnp9wxzwq4qadiqhmyel2s1gqngdcfjjc87eelsp5fc7qbdeyjwtsgu6dxwhc0a6zwze0jsofq97b4lw7bg3bsmsruw6mgg4a8cb3gxrejpjmdqsgxfyj8kxziurwaviedr50y33r0fzyf2vygc0o39dq2iejub1dki5601z8bz3eyroetaullb1a6vawltveusqcmo19e8js8wzpuuzgdpggqe1k9',
                fileSchema: 'gscjgfqbir93gnip6ay7wszzfcijt91ukf5xmnwqv2owmhzrr397686xj7nsywxliu2hrbjyvec36ec1t58rsy6kdrbgsvglqd1toa8j5nsp18ka0yy5lea19i47q8lb3d632x0njotanh9088baig9dcib5o5v1yhyjwyshuuwzdcedcmful8u3c5vcmnsep4iy6y2p83m0n3xg933zg5k64yhdpw244p4xuspzdg68g1ubb6icbvksg9vdmn9ryoirqn41v89mhpig107r6i7llr0myocta1be5t8ufvpwq6177hloxe7nonjr3cqnsk4nx2z4dcrohxrqodfg74skyguvxj7b2haiyt8us4q4fme20y89004ty81rfbpr2s6xlrjzt2xirfax35b2ozt9h6543x9cbmvzunbfu2wyrz9cp12dkb03zr3bgq472wtgf3u42vx41ioyx3uxo37thqopcx8bl9vpmsm6d1el0ri3ie6h9e2azymrrwwtuqmh9c1e4aikwwj752jyfptnpd7wasne1mvsec6gf39sycfbk088kht5pcrbhogde51kljmznr0ynac2c0kx3gofn8ffyg9ah2cp732rgtdmmdnsgn6bezkrbsxqnzl1bh2ysl98jbbxzjoa7nuoun8xrme49yc1rsf7vb9ycbqap3fez3x44xrg8muzbw6mwlhlsq2mayo8app8kzgsnvjeq3h4ztsc8d7e3dwdp4f6ug18hi31yow7opuzp8qnqtpm2t8i70kkekobxrasn6g9gli6mv6or30fb1t8604f6jouj66pgihoxwe0nj9lx569dru740ygu04vrdhitffkfdcv7zg5lrsadkmy2a5981uhkkw7y008nfegcjspz0rq6sds36djv20ecratops9jjlna5jusatg29dqk2rs8bmg1l365vfin3ofqlocg6axtxmg06k842ilo67pr5u109h0tgj1vbtgfsop0e1e8c6r06mneqbjkhwem2hw',
                proxyHost: 'n0kup1cbrq1awyzua3czx8d7fppy2a9xgtfeqc6quic2ov6y5y0jtqjtgx14w',
                proxyPort: 3797705755,
                destination: 'qyap0iadricpkqnviqbm2beyxlx0k95tvn7j6aitu5o8938la8lohncab5fsfciezmd91ov5rx0pptkff9ujb8nz5nh1aoloc6o243p8qigx8fm2vpzin43cfnduul8cku9lv2kslehxiimyslik3p73brf7kzgo',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'x9qy801o10fzc7y743r9zj10q4v6b77d8z7h4o848a2vyi6evq7a99u49ff8llwvicttqnh85j2riwxg940ov8ty8luw8boq3f56uctclbowex1g9sp51znczz95pc237aagoipqf9fxi37kj362coanmzzepwnq',
                responsibleUserAccountName: '2pa0f6esnq2ww0fawi0k',
                lastChangeUserAccount: 'iz0wlg8ddw0jjjel7x1i',
                lastChangedAt: '2020-07-27 13:01:29',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelProxyHost is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelProxyPort is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: '8i1wggj50bba83feqyd1xi5krn4wfys9jnlpmxn03akqiroabq',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: 'zflbkt37oxqgcjjjiz2x',
                party: 'ua9cbhvd6cfyhsybgm959bj97kepujijddy9wwz9qw2lvifjtp5zwbfi4q3uuakn6jr3vgxskmjg8s6nb268kt14dxad83u8bvygwoiswh4exlhcnnay192izod7rdu3wi7c1ssliuypw204s9vf3c0h3oe976ms',
                component: 'vt9fq34i0to37ubv5saiaxt7r43z4u43f83duma3a3dx45lcp76m249enzwljxn1xizbddu8rogtip10orda1r6pl6oi32unpzwfd77i0cr55ok842hdh6t1swmj2qzppoyvt1d8sqtnh2y3jtq440kcafyjcz5h',
                name: 'fo69h79blbeiv27v6xdapha8tce44mwchqcw1dxi88kzrbo41ejnawkikewgn2izj09jxsm1nh3renqz88vn0ow7xk7fhmhuzifb2dr6x43yjndq7giswn4qly0czc9ghvcgb75fdj6qathxtpz6p00unz50tttc',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: '1m09matl2hlkp5xwjoboezo9ghk6sjqzwdcbcs2alqrbx1vnrm3x3ozb0x8gopgo8s6cae7b4adb06o3ms9ctm03a5761u2mwfi2gu1m1zgxjsicb2jxl722e2agetbjxs7h3uumnehpvs7zgbem4vru3i87xxm7',
                flowComponent: 'k9a043aed6b93js1kfx5eo77lwtn5iu5fr9epr64l8dop49jyp5c4fu3c9nqznfunc3zyuz2wulklpqi3qst21gye5pqsz06nme1x42i3g4yuf8cqh9fgnl1nyrkgwlzzyp5s3czssjqsq8k99rm8al2mseu8nvg',
                flowInterfaceName: 'p2sdehjfiu16g6sec5vurzbofb2ytxnpo7ft2metj7raout49l5yk44gvjnehf4ust2zbtwxq07084i8n8k1ygao1cmizm6t5gok3jij0i7m60crolr9w0nnhjbeajent1iy0w59c3cykd7amnfu13hfgxdylstq',
                flowInterfaceNamespace: 'cxioozvsi5cvjkrp3dg4ewgen4qcs6uv58th3a6enpogr6iv0gouxgbf629yf8asokuzuu2h5ma2lhka90j1mqyukvrhf70d8zinwv3srktmmme3yhr0saqfi8vxkrzdm94mkt2co5oruwsm7rei8kprjqcxmu75',
                version: 'v0ypyzduffwhvxsb3kid',
                adapterType: '2m8comg4dlyqjr9xhf12oyfwul8soop02rb0k6b8h6ivwecjg8a6k3gawb4x',
                direction: 'RECEIVER',
                transportProtocol: '5wxi1ova7r3xho9x0izggn7ijyx50dzi22cz1ct5ypx0uvx5li6z6tasmm4j',
                messageProtocol: 'otx6v5i9wz51iisj6abfdsu0y47xco05hqz9vo2vb3awnm9w1y8x3r4bt22q',
                adapterEngineName: 'lf1lhgslsmunxhn6tfald76matloehvd9n8rqx1b9qmv5a3ljve6bgxgnygu5ls4i5yig94s5mj5ijgo6ipkyian0pje62aknszzwbnsezs25bmpdkas17yi3x34exf45q4oydvufs93317h4yrkrwq9zqjdfsb3',
                url: '2tana05egsrxn1wdtl3ulev4ktgd8c6ld0nvfmxy2ihc58dobeinlllei4intv93rxti1szk8p349wtkftkj4z1kg0s4thapjc5j8i1h0ij9yh73mftnwi0sr33eivu73ovrnwu53c63t7ysp9n6rtc5z52z5h2nejih0jzxodngbyhetxyxah6ddc50armje26l5yg9eo0a2qbhht6cjv96cpo7r7w9c441zbescqwc9xlwq4caya0rgy971qx3y4qi8dmfjcoaw5epof9ozial8qcmidxy6kei2g6krrtn80qyf50c1d8jjugc65iv',
                username: 'livk1w27vv6jk7r9e2oc0aycmmdnfmg8bi9oxv4m42xvc7kqvzwxzjd85pp4',
                remoteHost: 'ypxdixt7a2s1o4xn9dc40vvvahlb66zx0ba886l8ms9gsyar0txgrfmk7397rym00v6joqrqquwginjo7dccbb4hrs03ie3cvilnsit1882k4en8dz70edaumkx058c70p6qpkql9ofvoorm38ipilzzv26dssbd',
                remotePort: 5372099262,
                directory: 'x32vwj3mr32jtlvxie3q1cpnqt184iddym0ravj03cls8rmgg5rj7tasa32q73y3qmgg4mxvuynz8abuv5pqqrdsav41yk8pjx85pzym2d63unris431pc1jo1xocvxntk7fnzat3udnlehvq9t1z3ljsxxuwru9f2gwz29k0xv3850apol5qo334j8gk038jcyurp1eo41l5fdxvry9t9o4zyql9irq96fdkyknnn4r7zw0ocbr3oaay5otclvp66awu582eeeq18a89ngspkpb2u9fq7lcn9fgqjkmivt3u11xkl5yavjcabx4bqvr9dy7vx1l7o3whrg7u2b7bw7encdkpfy1wy3wyn4z2gd91tx58hwwz0pjojbrutktpj7s3lta666f047e4nyrupsn2gttzedb51n7v8rheppkktq1e2wcu8jiztomsywrhe1ne25mbifdp1d4gq1ck6y09lto2zz0wxrs3azbidpawizub5tfcodv7fyfeifb6nl9o7fx33ltle7wdrn2bn4za3yx2jpz6fixdg4vrx1nr4pqh0scxz9xl3fsw0oenokvnlfxk1cdb8ot5e8x0hoyaqox5z8sqpiti8glk71t5gcr5n6ftxxf8n7zpx6jmakudwzh30svnoju7yp0rre416yaf2629x88g85udn5uo117ohxfdp0a32s56cvz9xmzojys72gho4n26r7a5c24xsrnnhvpbni522p985y9rlm4afxb7cigjcudpim7x124t8rrhh9fu2rejkndmqshdzp9ux3iuv9fhrya09r7g68vypvf24pc0hdhovqtebr3pj1todygstpkfptdu0rufboqbor8atmxs15lh2sivo5axfnzd3gbowfznunvpt44qvuv19dftthralg2e6orm3oc9h5q1k42ye75vk55zky6szxrxplmh1no5usutnqyv3ey0mk3iu4iujb72er2u2lro5uw86kp09kmvq5vzvwk4t94jmyxegz3c820',
                fileSchema: 'bifnxbghxgm8m2ytp2lpnhkjlu36lplmlvnaaivby6zf1k7rqwyuk3ygl584z2bn3njzli3wl9sksz6jfs644h45omwct8rnzpwxyvb9gwu2gzymu62ljnqink7ai03f7klt5fyo95t776z2qxfnwmukr9umy7ddd85c4df109jilxbgxycqxglxwz7nlfoax87noctogchofd5mu2niuc2qa9nllp77vndslog6vtl1pi2ynmvjxffpis4ea65x3gt50cc7z8jcckf7kcuhjuv8w74b4prxsjelzj8s2n0x43ny9zy2gz1q57tzyfdbe76l53jsns2i11qrr1yw5u9wsxcxj7hggkcr9qmuzf4gfutygb1zf8dpvjz4w598iphy9sqkbzadcamka5mlpu10kwiqn1lhil62d3lnpt272txmgxbislf8pvdpmfqaih0uh8plgak5xf75v1emijsqq5wau7vubkgdobw786vu6b2sb84n30ucqs5qr3osbzszk2t0v1ffnz4bsixqxi3nh9bmplnabme198p533f4kym4ccf361yqiaoovpe09ax58ffaeoe5xmvhpnngcxedugyhtv93ohvumjk047c7q9zjos448p1wgymfsk1p4piuw5501b7aa1rwkincbl2i77l7tx6gg6kuaxbkdyiixg6eeuwj3ztym83yt4eg6pedb22et4dg35jlbbli11a3xt911ukm1haf0wybt4rr69d4x72hqm5rcr579r26m71shxgliiqbfmabgecw7g77pjtwz3ml05lyxt4nuve89yftvz6a4r3vabgs4q0b487dfkcglnioejexa09wxd9eprh85d7bac4zkh370vx8oteepmfumbswmu8pzadpx7ua8c6mpzph4n7bmqaeqbp3foic1ioxxh65kgl7ggfth67ite72wiejmvuq8wh5k02u7us37ud0dauyfuz6xp36ugw5dauqa4wwm6dq57uu0fu3hvzotrrm2uw8osjc',
                proxyHost: 'ut40onon638ax9r46wlq6v1a4lcx7z3zf8jl2pkqdkq1sc6q9r47gozpsked',
                proxyPort: 56007424920,
                destination: 'isvlvfbgup9is5lbm7zqvwv8zsi6o18isao40f41ghpb0ymldaxr2tezv6wzur5vnhivayg2ii8r5rigc0l6yeafjysoguzn8n2s5tw4nvn87vake3soge2rsh88bweeqkq5e8fl0nb93dgt0lqpjv1h2s4z4h3x',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'z6v0o9hxbdhhotaf9uanv4ok7xtqbkv6d1urefnom96jjteay8ocd8qed1n7ojwefe4hjobki4l8936788xu0nnaoxibs16luroo88vsuspbont0mfoladf2q0sw9319z5grfyaldih3aupoo3pv6mhga56o6fs2',
                responsibleUserAccountName: 'ftg8nnvu387wm1uix9jw',
                lastChangeUserAccount: 'e4cadd09gh0kfr1f4gof',
                lastChangedAt: '2020-07-27 17:20:11',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelProxyPort is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDestination is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: 'ae6ej50s04bww0icj7emstkx49qdgeg7dmdq6npptgdy8fcukm',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: 'feooxskfvcb1xmzi2myj',
                party: 'aoknityq6jpozzqn0j6dr9kywphn201nnwy2485hefsqufooixd7zubrpd775xhe203up0hgthgdk8hymw7hgi0gx4ghfzt91xsyod7lpk9yevfyzxv9x9x91p23e5tcj0rs9zkczhg38x4nqyr4jmts7ksgx6qw',
                component: 'j613rakwo729bquv6cszz3d5px5wwlwm02zl6fro5oh70h2po7i7iyy72c8zmdeymacoh57d7wt2e73j0zfo1bo3qn1lsa57kg1j6twfrs6yksdpets9q85pgyhg56z0hbske13w04sfvcdwkgefuxar1btp2f8j',
                name: 'mmpglga76wlray1jblpobiy63boe1ye9b5huv701alago8qlu44ets7l5kdc30mqjx8tj7pccqdbyqhnckxww9vm72m5ohbs8357hwmqdzhk6qajqw45xkpr8edxjh3h5hyi2tvo1gipiprx22a69k9k24nbkax1',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'e2z8ncbo877tx1ldls0ag1w57rqzjwns04sr1db2ujw795orgcux2ewp0z6j7voafpxqont6jmg3ow2fg2iuv7sw37znplg40xb1lhhiloadma9cyacj6ogte9o17p8tfwcqjbogsvu0x2220ll1ohs6is8i9tl6',
                flowComponent: '5gixi345wfp653psq8o8m8gsrtn20gngsoz8n36z07bs6wic0wxpzfwy0kmlfg0lx1z4p1umvg2jdab1co4ia9fss9vftrv417z5nw22owuf1qsd6ceysfh5j2roazmkb7k85ppswx07jvc88xbu4f6stn2elqbd',
                flowInterfaceName: 'umzarat92mv9tgqie2z1fgbdwteegk37xdgiihn6szzcy9i53io07dgy2tuacwa2n397ll3mb6jg2v4kvsnntqezdozerss9cjeif41dmbcl8h23nxgc1gsnndaq7aw1antj2r19zvyak2rrpypoua6qxpvkyuez',
                flowInterfaceNamespace: 'u4ut3b4kfxpffoft7wetedmuzzx1igue4kpfaem3ajx3abymhy57ir7uzyf8kekqvld36l2fh8i1jebhnyu8vxj9mrfgg2d4r53ylhxbw9bv2gxe5qbh5bt1m4cy8pxiu7rnfr9f5ino7788spzwdqnq849c828d',
                version: 'kfpwpe3enbnd3ml4pwqw',
                adapterType: 'v3eucimi2txz8snz23j9bioty4lxojpztuz4gsxk13u6p0xq3g9yhh8qhiun',
                direction: 'SENDER',
                transportProtocol: '7ev3f5vs4cc5c21tch1qeo4trj8s6rf40k1uvv1ur21y57od88g9q6q2dq6l',
                messageProtocol: 'ybn5pixxgnamj5yajzmnuses3k22gq0oc1521lvxg1kfrlhjamfytimm9ivt',
                adapterEngineName: 'jzpcwxnlqdd6lzrwem3p15no3au81sr1s6qvru98saf3quvz5eoq01icvtp6lwt4xtq5hcvvln61yx68wek9pvp7cr8qzkytxa102kkck1uaibfa5df1zoq3n3pflgo9lujeoxfew1pap0d8d2y6cqt6uejw2r05',
                url: '27gylwcwwl7xpmwmw02u7i8nmufrda50st34b6oil18zjay2qctcp85eo9l0fkvxzvgthv3unxinjvkb4w1h5fl86qg80xzlqinjrjwtsf7yglic1z2z7i9wmzgu6usds3yntc55n3l5b8eo3n3zlwdtx1xezgz9kejrj2awdq8xan6mecnied4mblmlok70ws08rql096t9dqeltm2vfc5dmvarazho6yc1ufn811wgx9609vzvh1o04afgo9z7a90vgpgku0ozs6bwty8m0c1s3o5wpjvne49xur7vtf8bnli5ae1gudr3eumw19j2',
                username: 'flvjlv371ld0xy3w2ajzpbcxtf942qbzpkfgdrsjs0sdeli4ue7hhih9kn3j',
                remoteHost: 'k2kcuohq5ju9msrznsaggukabwmo230b4hrv53xifkfwis0ambs7lytc7osm05593zkbjxc1cttrjf6w5vk7lnf4ous9apt81ew0y373uzzcwxu7s2kq4c24dl4eodqo1rnswn3x4fxspxpmin8pfmia6cpioezq',
                remotePort: 8421983631,
                directory: 'uk2i3s6uisa99jjmchfciemf9075lxzfwziqw2dncswq462uh2uylyfxd9hv96511gjsx4thqysa9o7h9k4a9njmy0grr5sesxadbjspy09njajdqqn7ifieupw4iudwgjhk39b10ljam7fktktoz5kwln4zss00i4spnm471a0bg8o2c7ebtapgdboga5vetp6uciv9b8scwk87kbnfgam2b8jp1ojt8gsgiimxtcfgsiqmbgoukax0gcezpz956ic4nydf8pqgf2ipzpeo18pdibgs5jlwvnkq4ztd6bsvlg7poijfbm1v33398o7sryg4usimx4w0a42iumgc0pyxjjb0z9f120f9by4jjfl08tx8drojqah6h39ih8hcqs48w1nvy6tmyl006v9v9wj1h5pb2dv1umb7y3sjrx8u23b8er9qt3drzcwqe9tfnv2uye9ymoawge3akfppm99rew7tdrd5oed0ywpzul2c07xunoaiwg45f1ta02qcrx0zmg4vv35xzrlq5d7spfwm9u56aeaymniuk1n98h650n774ovg758y2c6yzv9bf3a0011tgvcbi7p46jl4btjfoyfl248341fe7i6hqf7ll8co0ot2leze70p1ymosg5l9xk5fj8nudlugmqaqceq0lyvtxom8jtg46jecs1x7ly4z2kvh966dqml46421qdasutivd2wwm8gxo8lw44mfds8i9syvuyd7k1dhya6hw5lpk11sisx921r3no8gkoc9fqpl0i5e63a174ho7xishouwm71v5wk6hwng7wcz6hkfespgcjcomc12g7g4ngei2oaalwejerb73aqfi2lwihx7w6t60neahjd6bfu7brlinx3l5d1px482ng2iw7696dmkjgc8lns8u239nelc1niilwng3lt22w4a8wljl1lmm5s5dv7gl0xkeqd16nc4iulqu9i3aet0uy7p7o42o0oo0xpjf3z58mjc0e1d9ylvouzktq6bmjl5f6ye',
                fileSchema: '0qiq4rj1fuwd2h7d8h3g5mbzl6nrhkqd1p2tmay7kfp71xv9c5p2vohgtsog7xsdqvfxj4p4x5utfac7zlmw0y8ujm9dcj44k5p20rbay2f258yvwto1w3c0mnc6eibte21m0u24xrw4av0r0d0qjx2gif965g1apdtu7kh8aaos0u8mkguazwyzbwmv4hkfq5g6ftnfggeipf14nbnuo63ggh7eb2936rh3j5geluc16e03v90dlxkmr278u5syeb6fo5fv45z6yzddvt7z7f3nbbwd9dsmhnin0mczwv23mm4mfi04e487hzh3jklmxk8ayadjnohqznwn65ru0r7bbjqmsy7srneqj8oj42w5ep4znzf3srhw5sgo9n69n2qo3y62oe7qwmd3qad3xcpkxemqymbxzdd5srotvdw31kdzttvi7hl967mpnmu5dk2earzul05ml4kp2e85z0cwwld69p5lx0zl5rkjsl4zy6wotkuwdvnhbqi1f32y3kz8amq7fb3svsu9cjbcsc89egyfbbc2bmp1keqm6469dqeaf5kvmc2ow362w3dpqpiumod2qbagyt9dzw906ses7vl2g7147nj85mjjid1zufggpsyh8lrqsr97gxmak9l8fmmt6mitar7yl9m72rn4ax6rzui8kl16km29vyv80jpdarndudprtdrgwae1qd41sfmo4e4dq4vx8b0vmldm29hfqf31e55h2yio64uzovj7ousq4bk4ieknnzmrnmybhyd0mqcv30sd4iy9a00byo6dmb8b2oiprjl3kg53sudfnbzljt43lnkhbm0oo3gktatr46e9tsavylceh8mdjj7djpjjyj0gg5xbyq8w52sxguoe1zuk285z8jdlpcguup6cybc5p74n4tohmujdage1fsxgjnxr3igmanlm67jpjh7koal2afzbn4oeifw8k53z6gkck7v7rx1gzmbedb93glkgxfe4m6yt3ux2htd50bebilpzx1c8yws5',
                proxyHost: 'c5nul8ah76yk9grjv99kr4e5q6sjj3jhdc11kjg3zh3opbzat8hbvk1ac2wr',
                proxyPort: 7327594394,
                destination: 'lo16rc383xc2wai7k8b0b26yahnjrrz5efuy6pceibyozjr0jhp865o65ke5nzpqe606g99tenfejsgkve35xp34gx9h7gpphi4v2x35d6cgir50gk9rf5a6qg1yijxzxy5c6dzxarge5cd46y6d7oabpojtuejwh',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'd7otadldae1e8zo88hvxt0wz8dw5t186fld5xx8pwo790fwug5uij9gzohenjncwlzp5zdtfkyz9zimaha66qmdilnsmrucwn5p9usidagb08k2t8d1aw7ct5ajywte9dvjrfmkkayrj1iccdtenk63yk5f9brhk',
                responsibleUserAccountName: 'upg50j2wvxvx7pr428oq',
                lastChangeUserAccount: 'jud90m61de80v2f4pz6q',
                lastChangedAt: '2020-07-27 14:23:54',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDestination is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSoftwareComponentName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: 'zqpy66a4ndozpm1vi5ef874k2s0jsdnj34thr7y0qm9wm63dkh',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: 'gn1zqi1dwkjzd3ui60q8',
                party: 'lgwy7xenns6rp9vi9rnxgebuqmrz8jdah05rimhouyimdbra3h2mqy5r9znht8kv538nslih3rpqmxcnzezmtzt5jrc2qjtnf5kmg4a79tbf7lxus6epb6bsu696ztic22nq1u1kl28tk873jn2r6jn7e3ktmrku',
                component: 'bk46637677t2efj3njv9vw82z1b67eo329w4tgmc2cfjyxwclv3kx77s4ntqgdaqpfcfcvoxqwypp5f3pqfsl8lr19combv3r0wk9co8g01iyu8sbtwa6adzw8xs1gjz2adb05bua3ahvjfmg0e1k50ysubtj660',
                name: 'hvylr36ak70r2t30lyry7759d0z6971vq5rag35c613mzdmbyohnwvy76dqrk25lc8ns3ymzafn6s5kyf1o5r1l7wjp0ekk845iqp9mdryl9vvf1l5y81v5paxvlmuc08auaukp1erz8trp8m146phhmc86s11w7',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'z7gk2yx0wm4z2xjtvakpvin2xxh7x649ua1ip91e9ww79wyewrn2m3jmc8c054l0r54i27o84gu2s3d3nns14u20g10e96bdglewuykouwhrdql141lepr7klq2rntz4g2cpe88b60qlxtelh01nty8vxz64buzy',
                flowComponent: 'xmgdgh8llltcu4x2gbuek09dhuzuca5j3wzmksp9spyr6zk6m9za6m2xvs9oxf7hd1d5fpb8ysj0f2toe79nqi3gssmkr2ihxna69wexomg1jsi422ijum2erj3q10j9q2pgcqrgtokl355xg3xjrh9tb5itko84',
                flowInterfaceName: '0qe2x8wwas6vbyh2ezhczoq9uzbe3armcjy2aqy79js6nvuzkmwacymu3li207q076kqx1khsityct78zuocych0hrrqp2tqsxbwkgi5wztf2k88wagdr51ljgf5pv2l8lr6yqcoij8tk17woudpta2gtz1vganb',
                flowInterfaceNamespace: 'gamtrsf23iwaz428c33266ss1qodfda83o73wb6z3vbmpy53v57oamcnow98dv9vkt9f5ciew34bpe9m21ydplxpoqde9qwvp54y76g8ocqg8j1bhe1ws2k38ka11squqx3f4by47mvoaigayd0mq6wlhr0y9skl',
                version: 'tu0xjym3839ilo3adaun',
                adapterType: '2vlbx8j31imvq5ikkqtbtxorfh4qux9zhtmchybhblehg2o9sdehpgz74txv',
                direction: 'SENDER',
                transportProtocol: 'bnatbxxrddki25ip2efx355qaypy0ixix7cp4e6bvg2vucc0tqia2yt17u6r',
                messageProtocol: 'qauc710rlaos4ls185iou1fx9crfnh9j420rd7fkun3m0qnurf709lzl11ju',
                adapterEngineName: '0j8bh5jcfmyh6r9602jw6qhpcls1cpe7xkt4c2chjro9nb6vb4fp7mn4orf0gw5gm932d8e9cmhkifp29gha9govwdnf10t4ghjpz8g4oacvp9e5ji5ft1z3ae9j3mojjdmnfg4t2ewkba1hmbaoo5o4dpyy65xl',
                url: 'udii2e5vadynto741hl9j3ctdrn28ieks1x2h4olq1bgrkhk2xa3b5h1w64p2p5d5knibk0g8agmryo2zviw36bmu5hvzw32i0648ze6t64i80x97o08lo7qqsq0q0rbcam7gmmlpa37pb5avnyhjyf430s5sua43tutx9zcqei6bhm6cxixrld5a9b3f48wze0a3y9ne7z349wwh4xrjyaxqwov73jtk3gs6y9knyem65sahf7ccc8bvlc1ury2l7uq6zoz674fmu5w22bxumcahypesvkab8nsd69yw81rdgswp7azkd0mn7iy7pgo',
                username: 'vet0r1bv09kci97adil648gyoav72tcrob04eppp0tmiskn0houov1o0bga2',
                remoteHost: 'rh0wesh01lg41wafzdtosehv539zk131oxxipcr4xp5u75y2k7b7exhn6a65t0gyid9foccm3r132x7a4ytisomnayvcd2twooctfq4ai35grly5cgqunv7b79sfix17c8zobn75fc0prvt880z5mgdvj0xq3eak',
                remotePort: 3532898397,
                directory: 'rj1lg8i65ksq809xe803ysonaqj2jnoimr62e6txt304t919usg10oxg3yia1tahnsvyc8y0ze3hndn85c5a8wmxmdwuk4s08wn06y2dil0i7bzs3ukm1jofggsktgwznqgbly8mrzc1gh60c0mbvh8bnpgq343wlflc3eit1bw6dfxdjqm2syhgewlslsxoz71ilefwwl120u6pd5mjbvplceckcr9nm6w535r5cw0fza7b0trw1abf6pjzdx81ko5masjh0wfb09zrl4u0pykursg1uf4bfnfw7n83a3orunvz0nsbstjfraukukmj9zpf93rcfzc1moe1sg6vgmw6juxp3ji04rpdf2779xgblv1olfxbunud1ei1weavcdnilo9u0f1hxoipvgbbxz8e1elp8emiycuk0yvqbd2bbfkw2cbi8hvpx1dhc5fie1oqoxl2zjgyzmxzx5oiez3q0d9nxo5a408ap895lsarvta6s261vcz1s83a0bagak4ljc82j19voanv0pvabpsxncqrb6im78xm6z2cllhhjjd9d4ycp0v3qp68uxp1amcrmu9nsu32q0fsyglf29l10bpb2h6p4vvgix4ba8sbotlrvjk04od7vt006ivrttjpty1yztpocvryp7ml7v4ijgdufsqfgcia19fct23joj3itxqzvclcwb0zb8z8znddp8drh9knadmvi5ews9ridqrnrazynx62vhhtpky3m6xx80k2n7f8g76kr7qgz8d6iz4tifvvrbib2xx4u4l6xu75kz3pz9iqg46mcu5h8fq86xbxri5d6rx2sff7osaqeulln3iwvi79qcusovvxtnh2ya8dyu812tm4lb18p46tuqzj1bi1a1aj869e1wcpw9rcdui0gdou4apyoqd27akuvoietodnkhufb3gs6tvzvfcz6kveg2w1ot5ali9bg4q6hpi6xyicagcnfqox33ecn0147zqicn09dib61o9laq73pidfkbxjkv7m',
                fileSchema: '8iq6sgyvih24jnwlhbe7muax4c5v6hxp1abnai96j4o3mivqbu3rxo5z4pwji5sut02lcgjqivmdiysgkffcvrt1szqj6ezujdw36ivmm800zlxnsvsp0z7omq7jzke1yfxklih06mxq0bnb3w3dlqxfhhauce3l9pl6phc000xfjwuluimylpkyjeesdv81k3wa15musz1njbqyblsltmkitqgqc4mq5x9pv963mnzpdeibwte1bjatk1bsqr8rj0tlrqg763r1hhcx0xba2cd4tztdusin6slalg4rt7lcm0asaor94dsw5rnig2lziehm8q1dv0jxy0vgargv5wtfjuugvdj7d6oao8wpwl09dlbv9lvp2o2zqnbtt3xwx5d8905lhgf65oy0nilwa5p45omgtqva5o88d8h2nu9jimnba8y4t13urz8mol3oq67vjead12pswxtkiuyqywkespz4xachwdp3uvrg1dj86xmroi2528b5v23qmt9wxl9aslc14gg0wui391fgevk69qddx9w7yumr1kfg1d5j7ch58d1n9edeckf3471emf1zzzs5zghf4rgb46t2soz5bve5qxj1u4eo2infsvvr0ha0joltnr1mpgl8m3hs1o1r65gblz0qk98dyzdgk5689x845jm7niui7b5my9iw1s29chb95wvtjhw2bhnw11zo2wwqzkz1cyda8ydsxtqirxmteu7p2rgalcbvyfltpz1hu2nk1zfxivr4q4zri3fsw2m91mccdoz79cxcuu1y1zync83z32kbn9xsft6utitgieqce61x2ui14si2nuxw2wava4sxzrk8q73hbzo9lz4wurq7jtihufaa8ht2imrs3lv2jum2az9pujcqzqsy29xi58mlwhzepv99ftm9lgkq3gnqg5tuabyimeba67ep6nxayk2qtftv7ie2cglau7xu9750ieewdwsw94aytefq13txjtt0aljl8uhbmhxrotx0vcjsd2jb0yo2',
                proxyHost: 'v8chvkxj1fcfq4aaux1az3d9yf6dgo2h37s63vfywzbg2zxufo3aa4fld9lf',
                proxyPort: 9789970999,
                destination: 'dv3c8xw6ti3iugj494kkygnt5hukhj4l3kfmwt5y6j2ykmr15a9c8owwpe2px3xm3p4wawhh2698ssqqyno7e7ws948g4aldteb4kfmxlioahlwm4i0qxh2ijugke06iqalc13skj5tk04i0gy6ma3ckilaf7v2d',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '088xvwu2kzr6b8mc61b6d5w1b0duxhimfk1trkrxr51aat98yfkg8q7ehqmz7fixaqgd8p9cexmwlpqxttj1sio8ja6kk15tmzqsi6mskpx1j8g6my2ntovl7y805rbsxky8q1elpb5ns8s2z0wtcwoza2rh6ezo4',
                responsibleUserAccountName: '8vmojth3lmhmi3e9kje6',
                lastChangeUserAccount: 'mgq36vp2ptl0vo6bwhqq',
                lastChangedAt: '2020-07-27 16:11:25',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSoftwareComponentName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelResponsibleUserAccountName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: '5wih4jqzspqt52608l8rqdqgbwodsac1brmyfuwpx5f6bb0noq',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: 'bv1vghvsyqr6qgpiz5dh',
                party: 'cm9dwuhoogkirz375jwspa913vf6dywugsklajlvf2d1q08zobk5ydazkgmzh9bcg0adbmn5xhirxzf0u9a5v3v9hqarn8wovkx775djj8rzmcwz3xf5oyytgwphtm5aqy054muv1i1dpkphrfh78xuarj3z98d5',
                component: 'g4e8qchwleu94jvudmmbjyppsqnkjgxkbro5svrgiy42belyqxs3lvct7iyipj3qu3ggepikmy9ig7iyx6fkfj3p5rwfoeiy1ilgbaqysxg5hmvjtunokjyr0idpfd8i2qhqwot6kbh9vkh06kcmdg9wqryk274t',
                name: '3hk9m6q1cgebee2r7ptqm1k8n9xgame23etnv0uigjtos362prum2k35kzk7neyee72dgngu3sbpo6lpe58ol7fbjv7bos2scw8g7hzcoefdk3002ow81n1dqoonfi58fhpgvvu6k8h7ub05vjw7m4qdtt3b0bd5',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: '4hsi2tvq5h79f917julezarbafxh3iq0cr79jrxc5iua4hkuk1jjv3kyxa9j0p4075j6qy1sxh39eaeoxew1usuul847bc571wqcc37f793n60398es9o9auljoij4gpzfollw2mvhph1maobf0zadurzq28wkyx',
                flowComponent: 'ijhq4voyew7zcfxiyjn2le8uy1rdgfemomu7f0p9wej4z3jvf36ayjxezpin7i9xb319fdvtjpgficxcqtczahr6y0ym4a2uygd4orzowdf96iq380tfak9emmku4pzh6v1cxd4dw6kajq8qs46nxyqyqvm2gqeg',
                flowInterfaceName: 'bkywu5siga2gcqcqdpszz8ouq4oru5q3t4zypte3jnco7zbbpin74py46g1fnq91hsrm4ks65nznkn0rso54f7new0hvdf9wn66rmj28x01o88dlxfr39bruptmzbxksqkqosbuvjk7odm13znq0gh5l72cuv1cv',
                flowInterfaceNamespace: 'tuzq4815z33tmalel0833l5i9yayu5i0scolre5vez1gm510eeig2kdorxaaw4iwmff6t8v7yckv7sgzv1bl7qo53l07g6pm379hq6qmm2f1evmj2o9n3072sfjtxe6bmam3uzy1zq6xubvgdxiafd2cv8ffelft',
                version: 'p2aggtwg6mmlsrdo0l2x',
                adapterType: 'yppwb1sr88m31e3h6e83mbrcfs48m3zisrq9jssw09tksj8zps2kwyj4tjsg',
                direction: 'RECEIVER',
                transportProtocol: 'o7vah6951z6mb2pad0b4iqrt0lb0m1cy0c703y4ghwp3m38uz7x7isqicgxn',
                messageProtocol: 'ie7nd8k9z7i7f08zv27u4qck6ozh26jvtufia9u84eyv3ul25khednax7ei6',
                adapterEngineName: '2ncxaiimfnpfzoq1mfhmob5auxfxrwj7v0hf6kqws8pvpqhgemytfivs7h61ll73n631uwu8zf76qxlg3rqdi6aptw4v2y0kjfeq84ydz5gtbw662ei389yd3djg4qq0h8mj67ln516gd3tm4dgp23d3uvmok9ut',
                url: 'mgf8npnrngt58veiqhfovmug3dfh9atdwn1hx6aphik91x9ggpwukw876fz0lzw8egs35a99u7egqnoahsacvsvp6r35i6e6bk4zvftczwcgsseyzpfojqo1rf5pmevwtlruu0fy8ha1834egbc9xnz5zoqp3fyhxe98622cip9ohz7cizcmbnyx2mlljancynj4232m7rpkfyhzri23n236xxyipi4krqwoc5loxsst355n3lhx04nc8wcijnfmd5hsaxpyuzvoei4adn3kkluo6fos9rjrprz4oh2dbbqg67vl6ttct51yuqfqbsjf',
                username: 'atsv2z80pppgap1fv17xwhb6ljkfygdpu9907uq0gxmuuy3nv09k92d92hya',
                remoteHost: 'w64vwo96irzl5mjjhwg4v5llhqfoiq8yl6h32evueucwbn6m2pzddghrciw0d28slve6u8vsiolp8rof65dvh2cuu9vl9ko7y754e3yj02b74vw1ivtw6hih5gvoe5sbnxzl5axtwpie5wl8wiwni6q1oeolfuzz',
                remotePort: 2269046601,
                directory: '2878b7sd5no2wefij6qhu1ca13brblefjs0is0wugv99ipkmaydnrzkjoh73nbsktt9veczcge9we9yhn8ttyzi3qxjvdzu1l8qqvxxtyynr1s3z1aar54ae8uetfvvubabry5phs0owyqc0rtokighjxc712rgqs4q0ooumu2ohqj7gwvn8xbv9qmyiktfl0s2vo9lklgn6olmtxlva11lmhewlgm0xct15n5ecemnno9nho975xsjrrxqyua747kzadepuziapl8tliuxcah8y43chhbu05tp38fq3d2zda8xotq2n57iuyhtn615hgqz289kvr4ptevvvzokf6wn0kwfibwnr87so5cu5rlq2fsgznfrkc97f0ljnakrzc96bin1gu9hkqim18kd6l8nyrermsr2zd0fv8cpd8kvyb0t72u3oark08vjs7vovvolr364ou2bxlkmqght3lzob50iojpycyjrpc0b94pdo81rueutp7vej7iu4ly1jvggbn4cztegh9hfon98bfob71detuq93zt3d49ht3e1i90r2s1mhl1jkpypktut6d8wv6ffdd4whms9surrs49azooxsvy2w7002horjfqyd2njnr3pr7ra2vt51cc7o1ikvq6m4c8zwgh3psc8njhu40bhrw6vt3dbedy8xskvxrujquyrydjbza2a8gesj3si3w8eq645veuh3pvbjhpflntws3im6jsmrakzvj7z5azt4q0wrndie0s3o3lgt7f0odn9hys7zx1uqzglx3jn84gn9fq63ter6wz37h4m522jyzx3oikhfb64as22ftp8vqmuet867vajuxhfdr5u5mh52sffm684k4espkhb7k2jit0143n7ml4kaehm7wqva8k9m623an3af71ljdko2ft7gnu7jnqjnwwcohsfld8d1hrckaram1ibco3zxiiek1kekhspwwwedb3sh1884lxdojev1qrznn9tufdj5xdaguv81sx9667st8ypn',
                fileSchema: 'djjz091ixtpsjdu7vmwismomnh8iala4gw4n2v54ow7jgf2h4be8u3xgnzt5pmsbh78lkmnd3emq77bu05zf45fgwbzutl47at36l2361273ngnnzptn7okra5mjm6fyhb0sgead1rlf7b32lpfguae3nbohyxqealt2cu5pite5n6nhxzttl200qg79mz0s9n46lajyqhriv3eh1cnm1ynpaxbo41hgq0yg048sqk3w26qctk81cg6n1ldg5yb0i7cmj68wo2lopwp4zkdnze3wu6740i5bcrrqfzldynulfh57gu1ywqwz0gsbpuz2cdbcpgap2xwilzdfqdwqfwk32tq1fkte13sx9gpz00asgqxhshv4n2zq8c4r8wu0jid9i4xhgznrakc8zjtgclwnkgl2vj5z7c4zdngrx1t0ggy2cn169tv0a7ncla8i09nxhqdtwjmwcw9coww8yesf7e9ozk64ttz7qpbo8p61f6od9a1fre649o1vb8jedxmymqqewrxxptn4cdba5yucnasqv1t1udr340eomtmyz42bi5fk1453u9zt2rnk864hwlh17otwarxff0btckdqg91dmj7qx9eprs8edfvc1qmsfnbm4gerca32d6ij8kr90gy5lbo4081mb0o2562u6a0kc95l6gozzpv9j65avxq56xbzhc004pes4gac8bdfb3aufauy4wy1j0pxmxp22i8n89c2c7or7cqilj1zrjwco63cs8h66nzpufyt9pxs1g3bwqahbn74vpyynipvxrbifu2hzlmes3uh2whnxp7attzb9jbutqp7aioyr8m5id1brcwge7by0ux2dqcdky037u9maf23mccowj0yrbjgo2xfl27ii0qvjo6usxk79cjlz6phpgn01qs6osuvet8pwj94o5m1ca038in0xljiv1btdq4m65xhr2j2kxez9jy074fhde4lfpfd2ggio3kfhe2lugr49sb0gdfvas7d6imzwlwtm03ddmea',
                proxyHost: 'x7h7kwzy76qqeqxix3bsuv029fsaq9ljxspeojpfat9yur4lx4znnzevl5vh',
                proxyPort: 7679189016,
                destination: 'kdpwhe20vajkx16d1jjc8edmttwcixul1nfjeqn5w5f5pfbki0i1m3zt82bmpsuzfv95z29p3fbrodqkf2yiw20iqi7zwtw7f6si2hn2aslwrw5iuxy6dotyylurxx16f2ncybckdgmuw0ffk4o68jbvuq2mdvrg',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ej954oue7uyvueop0sryuboj9ik8x1ssu9n4tdqik3abj4pzg1rdqyscuei3jriw02j2i2qmeu96bemcgf76gp82yzye5wooq5m8iidb5yxrugaaph2ml1dysf5a071wd7cygff05ok7z53nx8zsj46igbgwthky',
                responsibleUserAccountName: 'hnlim7saae0wrs7exh080',
                lastChangeUserAccount: '2ds3565wvt6zbj84rjom',
                lastChangedAt: '2020-07-27 05:22:01',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelResponsibleUserAccountName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelLastChangeUserAccount is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: '82177m00kd90xflbtdttiqgns4jtzr7z8cf4doseypeb6ms38t',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: '0myrmygbs78pdxae3grx',
                party: 'kdtpz7v5pcbwsxsm29sz5zfmuq4cwm60o8we31wieqaqq84x98v7yq7hi83ga73nhv9n0hvtdrdml5m6ooowdao8iblufm421etf7lag5gt8lg1wk12oxqd06op58hbyifetb2sso3meju3zpwuf7fpg35nt33yg',
                component: 'w5vp0mvo13vzv0gr3ui0wor2pllsjj5lvbvq1hflvqxxxfeoy84coqo0o9db941lgfquf8j82d5sra2o8l7p69vno6n374f960zgayi98fz0m9h61ixfsuuv94yvkty1gy9fxy9jkt9cldezqfyd0rl7r98dog78',
                name: 'oi6roowbxwlbhtbx7e3q3m7axra0ur9xj242qwn1um8hpz02a2chzqyd0jyhd2oc30pndkmds4wrh54ek697l0zacv5scrs33o0zwsg80zty8wvr7p2se8ppua7hghcflalwwtbe8ulykec4ki2u3kcr7tgu7ysj',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'ga002alh8xd5ltdk5or3c6913eql43qdeh4awfywvrh4zulwa594jp5vsg5uo5gllnmxfh2et7t7pmyzspnan193wxh3pb10hqk8lnxubg7fvbdb0unjjnwlwk7j7kplcum2oktgr4swe77k1jyv3hj1zaxs3wad',
                flowComponent: 's0ggj1subwrx1gi101828quozlcphxk7lehjdrn4gzqdvcueagrk57s5cbmcz7ifufhum1qcv3vr0d2byjvud7isfs3rljyhvuw4hz9etupadkb761r0taedxhaul0tho50c7f1q01fmcvyzlcwkaloqwapcn9u4',
                flowInterfaceName: '7kv8fo1r9ghcx7hxnz58frygop2705r3s4bfvp4adil83v4lk29yelw7grow9y411nw8d3ywqtdbgyy40lfxqcee1kciwmka64iujy08kvlb0yk9yoejj6hxdrhblsh36is61sv1gj1b7msic2z920331n9yq108',
                flowInterfaceNamespace: 'agqsa4gtxg3i85ubnmcyiw1flkf1juiczwwvrqipl7v1l2eip9iq7kq7jwl70opxm23rblvsibldzl0reutfbt5wxmcy2da88bafipj7b3a8m74cgo8aur383hyxhwhgtieh12a13ds7r4hjyhwmdm8iq8ez83np',
                version: 'r0f6i8rd7pp0wwg7ovw7',
                adapterType: 'lxkwl1l36knwztvi3q89kq7933ttv7m8j23vm236r9kw210hhf6pw7v73xgy',
                direction: 'SENDER',
                transportProtocol: '2tqttt8c3cyb9jctfjymf5ryb57z9ue2bn5l9uqrz8j5av90aq87zdsifvpf',
                messageProtocol: 'c53ajhc9pio5eeznj8xrvexob0seiap8mwfdk6ye3wlljgic7df8ubcuyyoj',
                adapterEngineName: 'n861l6jy0t17kkqiepvmgni4f86z0sufcw8pn84dd17h46th2ubx55hwma9el196zcnjlxjwgnzrzzblt5e1n44ape8lmh53x76q9va1mi9rhwp3er884phzal4jkw7r0ndzippbfyed06n0l1rq222ppxgttk3l',
                url: 'quuoficc6owhc7mc4ma7ip6l7ztm9pj67rhxt2246kj8gd7z2sszv9woi1divssb63uu8nkx6eppipyjwzi6gt5vgvsv4zgiiby19vf2yfwk48k7fz6j2qap9605zncma578yqd1iyh3d8vhy4571yc69vilduwy0oz0pm9c4a5nomd08r977n9nm76p980o1vzi0uan9elaat53wymua2e0n1lgtgo248j7btkhgc0mm56q05przpz7udjdqv9gbdvb1dbckg26imquo921sevawy2timryms17kzpmjix33o6bu714d69vvt30z9uh',
                username: 'u0ge9jz86pkw94t87pwm33h62vpd665f7av3crjsw28k7v2bzvr9eq282x1q',
                remoteHost: 'nrvjogctf94p9552stf5ozdi3hun998g29t6dafeogpy4u2map97rdlj252qs2cgq5yrt932ykq5e8sbldfj33gzk9teg3o610lfs3v3h6uiy7h7k0i7hf180yrzladbiq3w1mynl2d6kip98rdq4zmtb187mo2y',
                remotePort: 1892896159,
                directory: 'l05pjk13glfr9g8jlpaa37ab8ubbum7nkupdcrpucd183akg6lzc1r0hx290j7cbgymb91ghkgf4m92vhkruzx09fkgb2f4cbh98s329hdlhzkr28h9ohu7cq5oq7qcc0callhx0n4q9ba7non8ifj6wvnyj0rh84nka5a70i0qc6vt9hi6o3hyybxa49uans70pupydmxlxyamd59kxjvd6rlc7wrgdq4t82z1f038gvqblcswjbaui4ctzvj51vie7eknt7mqjtx5oh86i0uzupxzdg1qmbqiaiwz14iznoqsdudo8mtw8ql3j1v0wmt6yyg22erfzuhkfpdt3su8nkrwlkrvq3o8xf6nknhm7g8os8wvgevaghxteyi8jf1emlqua0ns9yrnee1nrrcab4vh0702u0ybkpixulwr8l2ufg7u5llykatm8deal97su8dz5hk2udsx8u5satlrytasdvipo11x3uobdkzxoai0q85119lseqzxekrbduak4mg9ocdxap8clytjy24jr87q0zwjdjhgspttd90ato0l9ugufrl7w2rdkjvyvswz8e3zhzyqi3tc85py5kirthiv4bvr7m8454emem1tocoao5m7myvrdq1sav758itkgcmbsv4ty8yxjlg520tnwdxc179c6ouketrazjwr4tkwcyw6gsgipn7y6l3fbgn7i6wzol3cjes9zfsljw22cxz3jsa05l48twg7zh7l421wa7cv823c3ngjvfnnhbkh6vrsj8kyjxqt31nvznh7hdrbfmcgoi9181dlpwmbxwm46miwqjpcqz97z7cwyclj9950ctu2mbtmyh8g7tmhq8hbwp69y7u9cwh39tyj073jqvp7dbe5y3ga3vj343zwgs94i1g9vzb9sd26ooj0ovgncecya0lr4bdr0ypsp9t9dag5uijs4rky7ovurdmpwux66trkwjwehwatg6pcu5k6inpc9g3h65833z1hit2h9nsr3fe25ao413gf7',
                fileSchema: '81o2bpe7x9crkvxrbyjumocjv506eibp1d3i92954nyzhjhx95409o9t4vqreo02g6sfbw1ewjgltta34un1erb3py163gzerxrt4aw0irkt71xq1ilbvxn5ck7bfs6o3ydd24kbqdvrhkpmcnzj20uem878jzfocspwzya2t7qklqf2h31b22gku19atybz2a8dd7gxzdvmw5vfbhpartkv611tut7bv9jwamofrxv3cg5esqr9l713tuy10jztybmdx0huieuvb0ugc5n7sfikg6wexdhqq3j0ipmwmm3rl099ldcoyiwjhv6sl4zifnt3wu82o0yg1mtficzvuquie4xujdgpcoubisf1wpmqrk68s995r9ghqxoyld75611sut9o0id9rpmbazokdccuc1rnmzx9pxne3ifc2afetf628h2n5ywfrl4t1y1jdcr4ofawvchw8g3ev5ognzoc8y1lxiw2rfez39givgp6a45xl354n0xdomz9ijn0pdw2nwpdt302vcp7xdvz4sqnjujlakryeqo3itjm5gk6qk6ld14667gnitigaagf6245fc2xhf3sn48oov5d0ewe1cc039syzc4vzy43j0rwt5g09fqvfwh5qtt3n3bvn4zw5o0dr5qcz89g3ytkowhekfb153ich15zxg6u9kb7tu969qra1sy76omuzdamsj1piv1ae0kk5gwvxlt42xxy68t2xg2gazv1hpp8qpdsqp8e0sj8sp87jzcffjbnsa6mh5di9hhaiat6arzg3aygbjlk5ef93ahhr9frgu522ku74wxzbt1kgx9xz4qtq98tqrwx9jbzftynss5nx0vkzlho8talzfl212aly71vnnz5br196ks5j17c8y6f649gxz5uqhpjv7tg1kiqryzp6ceiopty8g93ml9ltuqyz0spxpohbckfnf5mteeh0dhvw2uwtl6lf5gumztsdnwlf5ha1x6cssw6mwh703n6oddwsw605xj4zpeac8q7',
                proxyHost: '5dqkk3ke95ru0rb2h0vqwj03tltebghxh3gqegm9ud8gkvk3a8jpzdoi9s77',
                proxyPort: 5881968407,
                destination: 'jo0xxze7f9vvw6xt3mmp0vsauyvr2w2cbf60scqob3iycn73syx9nzsx2kv08iuox9mgsvuv0c2siouwrltmwpqi9ofmld5feqn86c4z1lzxwjzyf4fhzg82cwqnd71gkedqj398h9sksc128qg6yv9xxzyiwk8o',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'wqljllsmhdgybzm3ya0vyg3p210a52klag1kfa0djmdk7hezdk9q5jnktpj856nc5y57pfeh4tggv3u0uitln7q45zzi31fj4v0i52vvuu4g6lcq5b3sgxvi9apo7qzbey5tmawn0oyq1tk3dafy3p742y0lj7kk',
                responsibleUserAccountName: '2j6fvihp5r1ppj4w9qwq',
                lastChangeUserAccount: 'dhv12x6ysoog7xc4dfp38',
                lastChangedAt: '2020-07-28 00:36:58',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelLastChangeUserAccount is too large, has a maximum length of 20');
            });
    });
    

    

    
    
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelRemotePort must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: 'pistovbcjlsy94bejg0cubn26k1b61i8mgko5b321x38w4hqs5',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: 'bm29ib1lwvz6kkge3zgp',
                party: 'pb9oasclj5dhu85ih5ogzxmpaatd7wwfdmv5s0sad8tqbguf9n89pu02m0hs6g79522oulxn4gw9r44xva994vdzjibsry1jkm2xvtrcxd79u2cos72mhg0smi25ysuzhg8qdstetp0ivwnk06aboiax2s0g09x0',
                component: '0ugp26jj55r31x2ewgis13c18xb4qaxtzm4nzu6khmd9nw8gv1g9hw0ijheoiwtlryr2zedjx9qgi8e49barcyk3co536ftfjodkkg88ono4vkf5l5ha5yc6s803z0wd45p4umnyxt1y50mji53rmuyvqrsglbj6',
                name: 'tg5mdd5dzcpvzyqs2sz3zip9p18t49e1rnygyarp5e23cyldvb9q4qdz1nbh0ah7rbmyx0gnxm8o16gqxpqtqf36ak4r7ac4i2fwcm0e1ucn4k21ayx9hw8n9niqm3q67psertbfyartl0qec1ks1hagtunruxhe',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'zepvftrgy8tfgx10eqhmyw1s3f0rlgd0rv4nlzn586m0msywciqvx0go9rhtd5utcijikg4f36x1c9a5yhnxin1f4vielyx6qh3uht0fldzxzvfggjwulj3wq4xlnxxad3qcy1y35qvcin9nxzual7z8eqy3voov',
                flowComponent: 'j46hw8fa7ab2j608lp1aioh01l1qzixfrlowzrhhxwcw4pzzyzgzw3ddj1w29xtvxl9dbaxc5gfg0miabn1byq48tnnalhjjd95kz7hzisk52zo72gx3ifdbuo93zf3u18usbmd52dk49bwj6kl6jj2epgaq5r77',
                flowInterfaceName: 'ye3mo6tdq0m2fjrd1zvmrbkdf797rrq3kqwzy714y1gl0oq9y8l6muw5g9sn1ylskwgbg1rdfovphq57gb8gtqbamcvhhs6ym6n4n630zhhjpxwgw441euvk36gir7wy31pzgkidz9y3kdnlvvdf6bslahs61m50',
                flowInterfaceNamespace: 'mwtd40xp9jsd5ln2doyeifrdh802opt6yuebxm2rgfghe2vatkixcsg6jy7zuj4kq0kj6ei6xz2do1md7s2fvdfrnej9lo5qba6uym93y0kx8a3hribuzo511cg6f3qa6jqr1b1ujw625vmexpkjkdmstl83bkph',
                version: 'j9m4w3nlbaj73e3xhhk4',
                adapterType: '6tghgc4woxylgeckmija3alruqodj16hzpkavjisyxcq1lwkbrdvd1lmj34w',
                direction: 'SENDER',
                transportProtocol: 'htqhkhhibdt3mcp0wgfjvvbk54jq1u4m05viqx5lcc1d0n2xi3p2hmlkp0sl',
                messageProtocol: 'w6mt2jn8qgerioe2hxq2h7k8w3hme51el5b23vdzjc8e71ktnqf8i6cz689h',
                adapterEngineName: '4ws6mtnfwavgzrgmr4s1h7ezf7wfb26e2fcfhwqkbba2adt4lajdbuc82itki3yisxoakvgcptrsaqr5udtsgoppqfj1mrep2mtjhxek3h85bgiqpb5zls8gnqvf8rgrfa0b1cdkdw4piye01k6b4bafgmp2p7ig',
                url: 'wjgtv9qbpj1k5u5hjgo2d5ya3cisrbxj50z0xlxk4l4otwfzzg1esq158zczwp3ebrhqkibdqrs2qow3oinln657mrpbc0hlaeyh0zdq4hrewahy8gavix4i8ugo4kzht0h9nz6g3k2umlfmvcutox7zoqr5krgbg4ptobnuyyyx1kdcm7r5qki1p7q83b8svmid72yge2356bt57o1xtz6nivbw4zuujiz73g8jqvslm19s1g9nov6pxg71wxdc7sn5fzg3gtmuuesjugor57hr3sviqxre55xfvh6p7x1ps9ncxfk2devh1qxmioa7',
                username: 'jhb1ucainu0lpclfrrab50kniaytw8htxtagoj2pg2utryf28f36xblyo27o',
                remoteHost: 'oz1ky5rctsut6fm9rhzew9wsyyx7ueo7gklkdbs96z2sr5125yx6ri7o4x43orzc696045djv440vnaq1kms6rvr5u8cju5jb130tj7w7wei4dz9sk7y5lhgh9lzk5woaoclurar7u3nu2rqqbm8lwhaq4ia1uny',
                remotePort: -9,
                directory: '6hbet1y2s6i05vnd6495bml4yw5vq9su7x0yzurgm9zw5sz2frrzqg7m7l4vfz8pcbkytw8gx863j8zcrg9z88fzppbxhmo152jdoq43l7m20gx2l2qn9atcvrqaz2dhgyd5b8upymt8alyqidl32m9p63v8p8vgl9krlrez2grnpmwhigv2g4uyll91wizyrfoigamq1rc4dsd3agb4xdhzileb6ce0ujmeqwarn5g7l6wrtegi0vuqmpsiihzl8lhmpwqlkud9zy9rutafoh2y9pyxjac84q5rrmd63gyo4cbg4ptqnjdtmrq80qyjliqswysi0fkxxk0shgrk70ygyhi60t2pbdimm09hiae2bol0nkce4u6oj36twy5v7h476a0grv8di0io14jhg3qqimj62defjw7ld1ikbrwr5wsjo3cjnkuomoa6em8zdvq2zr1yqnlsq8ehem2mft883czelf7ffh4y7zpcbumqxvjag2aft46xi97q6nx5x0wxu3ocor6viunzgq4mi2qhs5vlrp339tm1tlrg9ghomkzn7fu5pa3tbdkd24bpdjacrbcw2jdunln6c78z4463qjifu61s8ldjm7kot9mupxzz59j979r58s5rjugjn9tcekbmo6vlwj0oofi71g8dppavx7w72qn1wdetm1sd6wgz2cehw84f9wntxknwlvhkrtmsl345fkoo7jwuulh1yahjscd0whoj01gbgwx9s450d0bb9fuz94m1mwp2vi1e1w9oggdcl36x9z6sp5gjza7k9t73gbtm7wbf9d1zw69oo40fwgu9fjw0gxuavlzgbrcd4dwlqweqrw3l3xiqafgvsljqpprrfhn72sa8zaop09y6rq8uz9kdz9qp144gihja17ojcl6sttly3yczcb564lnsuryarudjarykquskjj8uak83jzvo2iydj0tfbh4hwlo3320alzta41pvur2w18vpiaef4b4evdvk1nd6ujfq1qlds12o076h',
                fileSchema: 'a3mj8c2wu41fvvja44u3qvjelrh8qd3dpn2z9kjr8rhxqeth34vhj8974m6uxanqgmfyhlrfz96c35vdn99rhlgdr4f4yoredyeb3glpvdvz31j2ivzy8b8sgxq7ba8azviz5o7ploc9xparlcg4lbaptlsptctqrlgaqjtcv6rockzdz0ismp71edmans6wwq3j85dg4f4p8zgat3gfv0121y9inrcgmff182nnprjjpku3u9rbxx0nvvlr9113myezofc8x8gr6d3ioljpb56d09m6hfkizakbamrrrcj94rvsvyv3iv7r71v17rs9jpwkng3cl83w420kf4cynzlvhkof2xcgipvo3qxhufrvui13cv9w9gwwl3nj8aemucxoyxuv2aaexuhz8eldk6t07ahz0nazumfafstap1887sz1j6s5ier8sb0zm3z2jkzzi5cf2h3kemspxskzq6d88gkl12q1dic0v96uuzyz3pe9dyqtlwk5kwq1fylu2pcfq7rijsxmfjn99zsm05b75mczj2234v12rp4881hi2t9cynxnenkx6anomee63uzp5255lnh76qmx5i4gqiv0h50jyuyf1qlzwu8onyz6tjnc3mqyhwwmk4hifbzoclsn664t5tx6kg023xsmjobjhgvshqu1gsqgo4xtdt42bx708dj776uuth8h4i5kef76bgxf5vfljool5zl0vc3gsz35367fazudf35zrfhac3bri3z81292fadhniatq39sdcla5kj81hrvw7qflgoc4139n49n7obtnwp9hgws0k8q5r6nwbre0yymbho7fegqgugl6l0wioxmyaxzu5pgh339x0t3jw33rp8r2da8re2hnupk1ku9qrmkq32v4wwn2q9du20adxkmry276xfiwvdr9ftnbz4ablfhuzcej15qjcbqg5baslw5koz5xws6qnddf5cg23z12c7wu00q4xnzl4nel7g5hkze59x37mb0a01m2fyhdrmtt7j4',
                proxyHost: 'u6qohf7twwfan9pnlh5bcasas83xrmdjod7jydxwpluaifawzdmfqv4dhwgv',
                proxyPort: 9413771141,
                destination: '43ghzbkfxcr4gwvcg6g2ylnbawdtlvbsic8ajl611yn5gcu81py0jaucr06kxj6csx5ac0ddmpopctslyzfnac0ibnv8ww5f24fpsm0x6nz132v9nonlwveljceuj0n06046wz16x7syhuahx0ffpvry8izk32j9',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '2lqo1j0dcy9mu0yvqvxga3dni6dycjj14z266luakxspxvk61qb0kassjjtjrbjuki5cksap6ktlv5k5vs52vkdejvmh6rc3gs1sr5mn0nkwyus4nirpdtb7oai3rtu5cgrbppuss51pslrmc7qrornv1kqpwiuh',
                responsibleUserAccountName: 'l4mp5zgblhj6701twv84',
                lastChangeUserAccount: 'gkwwcwr7q89mbq2b4mbm',
                lastChangedAt: '2020-07-27 19:44:27',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelRemotePort must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelProxyPort must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: 'gdsi5ps9tlhi4j82md7tj6fihp0p0s9fiz1wd2bsrvjqnqab3r',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: 'qowlmwvr81y3g7wui3k5',
                party: 'n5wxrw4g1vif053c0fvwvoxll9ombs3qfwu9huqs6kwuw5s5dse7uq5jq6cw0dj5eeelwdi3r0ca89qy3hhpw1lmzsfg75l2a5gqqshu5fvjn7ipbtm33qnpo7cv22ruruu2bg3o7n4aw3w9q4jg885xv1obdhmz',
                component: 'rx4aisibfbmx3kekhqjemq5sferj48nm7sf4nzijculhhh8y21tfd6ektdv2sb9l8q1c1zb81ps6gxusnnkh1f5gyl2lifjnqqid82bbfmubkrtbxyn7autjl36pczmczxpu0orn01cjww45bmwlrjklsefsgkmv',
                name: 'cszj88o2fvn08y0ukdd0nx4iostusvud8jkfy2t9tysq5qv4e5bna27vm3zz68tc97jn5dvmbiwl91jmpf9dpdylnuiyl4ne5vljeop106ccq4pmu2txtsi7gwpmc4xtscihqsd8pmd0bhdo455qqwpjt54924w3',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'jflb1166wcjrcd780r5pbhzles038tbbtyvffckxp2o413rmzu0sbum6eixvc6kpyf7ts8fbc5s1creg50h23ettnwnj4phy7165i2e9w2e1x2j8dvkk1id2tf8ys2f0sxq8esscvwrolf2ihg59sew8otmf38vi',
                flowComponent: '7bvh4h2f8i0eum82bdk2s101q77338tgoata8eibkwyri6p1cjqw01kgg2hlt6kmmmv2bpuj1fsscibk0175cavbaf4q4rbererdwha7ckdy0q1zh2zmzdsad8ymo6e609l5d1iius9h1436yya1m5e7htv82je5',
                flowInterfaceName: 'eei563u33a62lqw7tei3ldfvuxlrjcloilay49ewisx3v0eozdvk3wxmvs9kuvih0ung2ewd9rw2z5q5xovcsn33p157vge0bnjiadmmlk63syjfwbs7xj5vb54l8st2h3p8dyrb7nuh0dy44sr0lmzycaob50z4',
                flowInterfaceNamespace: 'yjjjx96ruh52bb5widkn11bw0hqxr5vdqgsve2jwf6xzc4v1bp3ilh9sywmv1cjhp6ipxlbx2sn6vh6ta5fhpp715dhndib3h0vb08k32tb1v8isdcxgjj3xy2c2hhcdxplplieaqhibf8xb92wdogxw3ksotwgk',
                version: 'hkm9xzaftntqyy4tzd20',
                adapterType: 'f7a73k96mwunbg1yshoqyryamhpbrfq7sn33dt40gn21uy4vj7o9bgz1l4u3',
                direction: 'RECEIVER',
                transportProtocol: 'ra6i97gw6bzy5dxkks41b34wznqsxsy6dp68go1v1emuysmfwdyugv0v2zzj',
                messageProtocol: '764tc6heszvx9mvpmbsf3t872jp3dy5rp7v0gs6e103dcuns9ikunxicc2o7',
                adapterEngineName: 'xr40pcapd4hrp3m1q1dwil85jo3tm7kk6osevnrpweijdv9ylpq9fnqqzwueweystu1cxg1esqyfacf6uvg455w5yxvyybsp1xofqp3gf0932xu2mho7iupzikt66o9kj0lehvqlsj1il2ny6ny2gzhm9fb5pq8z',
                url: 'xhv2a86mlw3utndmlc8xf7vozhdrdo6ef9w6genuhqdpp0b1lrpvc5l8cv1rrn4u1ehna8rgazlrpuct8x5c4hxd7sb30mxxm538934tmt6vnezkaxx0g20ili7g56yxf82f4slgoovjox0feh4rhhatqmsifxk6e9lg96g7sy88942km972iwicc5tocii3co8ym4w4uzrw8cn14u4xdru05robg3oc55d9qz6egektgdtmle82nf7ve07qjarkq1hv5hfrqlv4gjivlgcu0ww3y3qhvnyepe4oks7fm77b136vngx0y0rsd5xlv29l',
                username: '1p2anl7hlhggacyl3fpxru85fq2sghetguh8j4dkej4h23ntqatqnyv29yxs',
                remoteHost: 'qokeychr165d8eexn7sb9czv7o835xq8fg4z4jhh8he8bffi8mwg7bncatrq648b5bup4xpispuvz9gdp5nkbsrecr7b0vfwz1t0q1jlrutqf2u53izglq00y8c60kpec4idgq6hq1kk976zua3bmm23ei6t12m8',
                remotePort: 8355061874,
                directory: 'crjboj14m9bg6qf070cm55eu9u4yb7hiiuyfooonae2ltze6ag7sa633gixeg9nxdjyjvo8tudej8xl2t4u9lqh44kj5td8jqo8zs5yzehszym83pu84xlih2m7gcfc4c9fg2hid9mjrt9hejf4csyi7dkzobz9cjc0gehakuy8m5fn8rstv8y8jxpawbyyfdhrwgn3h6hbw9jwfw5b4matjwjpo219wdy7v2mkvuw1pgasm2a2smhzsgglc5flgxbbeoqancisy6hy4nti487iu0554ms323r8dtmmz84490g8g7nw1k9fqyh63txcru2ii8wgunod7cbjfazfpe9mzhnw764g17d1740aeztlqq3txailu28tzw5wnun1mfozptsh9btmmq6dzkykxrsqj17sksrb4pxfl3wrmqcndci98zhg1ol3tigt14rb8njvyshvmsm3kaeqktug2o1qx3iwyhyz5ssfdyrbfnddsck4fc72tjuufj2p53klfc6vs86b40wqljpzwqzeiv9t3846kp22orn6hzcocs8jq7epxjchl2gbsymhcwqtv9gcnf0ervnovus6pgzjswqc2xn6wdfd5bfdmekwbkzyn3nv49zzr45a06f64avh6d52fwbbmf112lz68qqcqczkdlu7z8lstkczo1mzl4eqt9qw1wnwv5dpek5sduo01fbyzct56s5o82wilwrtynfmwflljhekiez53vqk8zu9czh9lvvfszau6dlfzdy9xw8cimezq2aeyo0uuaad90buq0zhnpf75fdk96x6brjnuwl5khewd6m8vphr28vximuoi83y3wya3ancx9jtn2g6fg3du6uwibyypna5dqh46bjt94pl7l43vuy15w5pp42nf5uzo8m1y5ml7h3rmpohy4412a557x4hsgp96qk8an084m8h37hvg29pybf9fnss6p24zirnxwq0gma5djod3nngbo0ka3w8mdtzyr8r7mj4yqpveo6vxmvre84nm',
                fileSchema: 'tr42okx93gs71fcykx85hyoliucf5k1m3fkbya2193o7xoapdnv8b0fqdsiaxrx300t1hul5dilfr4q6ryql3xbqklu5kbt3hc1dmel2qitj9wi9n8lxdj31jgoaku1x7ba1cge1thwuzlab605tm4av4lk0qjns0zuxjjdn1t1sfam0qbd66kbk2u6ekkn5r2aglvne3qnt1w0dk92fsgnc1frs9nlsx4c3gn71po4y8k3ut5tv4iz76ey40wv9t85c7hzxbi58uw4eicrrr3tzilr7k2owzxbmry7tcazjlksug8qm3ksbwuxl58g9i7itxwh2z5rk37in1pycij4awvmm7pp74pp6tiu6yt0u8mgmzgjb10vsfa5qw54jkflu8ipapm6w2a3fa74v66p5hv13jow5e6knj77nbb8px12t0il06vlrw308ia1hvp0s3pzkalsrc2xqzqs310ntstd9ynpbmdcmkrt0n51nc9baehcpl1rhn3k3jdw5eahoi8ilqc7vbokfok85ek724gl7hrve9x7xfxtjv3r4547advxigh74i7yrvnxl0lwpysy5kx5yb4x4f7r44c6of4dybou52tk2ezfjs2px85xc5dgsammkndwmdty43vs8tg4q89584d32n9a40n38gz07dxw5cvtuszyxg8fd9xmaftkbtb1w5xangtoukdh6dppgci1nee94t5ghn1yn40v7ue6a0yg1tanjjtst1y69k4i1na9nuh09ajyxkfav70u0ad85kt5f6sil7ztv91jaulltg5oask0ld6sg3dxlicsclfxwfic6h5mblv5ouc8v9mgoy0vl32bdptck512fz2ql46hkd283boyj4yjoct5nwitmd4mpelfvxb3sdhqwol4184jj3owkipeenuiiut72h3iay91s87u7rkob9o0uybpwj9f7qkakj2nv9ikixezoem7lfx4bfwoxomcrjms5aak1shguyzy5c33s2ecgyynf3i6x9o8u',
                proxyHost: 'ox3ui5hxe57ihpd4d7qq38jysiqlkjg2g2hl79dovop5yyvgvpn5jprboy8p',
                proxyPort: -9,
                destination: '31uzdb4gh4kqwxt5zdqplizk3g22o84puwl902h3wit6nf132337dmhn9rywvzn3nyxjn4ztk5yk3mygfvh0dq1r6xewe0mroem76atqh1fw6dswuzdapjqzi8tfn87ipjskvu6xvvj93g8jgojib24pypr3k74s',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'c5e9htri2r15wpvp8tdkgrsa06sqp7soez5pifpnb6e9geifyjvfi5o1902m9w7fuv0j6ampmitj3rp4gxw4hgp6tm1pxsr8oslz9j3fxwnv21m1k2nau9babrr30fheibgs7vkisnstkgvwguq5yfg5neokhawg',
                responsibleUserAccountName: '2ejr7flscx2u8f234w0c',
                lastChangeUserAccount: 'fg13066yal8d2hsgwmuv',
                lastChangedAt: '2020-07-27 05:36:15',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelProxyPort must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDirection has to be a enum option of SENDER, RECEIVER`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: 'vsostxj5ewp7alokzqc9jg019bs9h5gdpk7gzabsysvzslk8vs',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: 'v5n9yi45ld48up6qxoqz',
                party: '5e91fglelfbkfvz8dytpy6lsp53wj0lwagp4q5o21nqy1qqbl2vu1v29dh1oltddiy7ai3wsavozwwpa5hv4wdzs0ozugxoa91jymqt53zlguz0huo9pzrih0lgvmxdiyvzift8nyq416v4zf99ppzx5jmeht6wz',
                component: 'g5ldmn4rzjezlta9ibitdp5cp6d6iujd7shh1c5vh5nzppu2yg9c0qyv8za2h3vwbr4v18jq2ii94zh34cso8nq42ylherf87zharqnuq7vybtig1m26dk2bkm22b2fqq2refp9c6zhiivptxmra4cc5fdnpp4hb',
                name: 'uvqchjl1oca4o6iiwznxygui7n3c4hvuy54smsused5jidjljijq27s3aswrpwiog467c5jc88rwskfb2rf0j5njdgnein34nyliyusk5xoqpg2s1ei7ap228no7yu1taaye1eittcmdldk2xbtwttdlfjbgi9nv',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: '82rx71snhjsx23dcps2htiodrhb6f0dculcdctj1rekpk7i5oauy7e125ebpmclkyro3iz0btm6byynhch56od18st82xnsg64f9ufcmtwkm8hb8nssjudkhqxarfnj6a0fkwatpr91fbko03v2kx27cby2r8btx',
                flowComponent: '2hq7o0waw0ppcxkpakjdblg2p2az8cmbgv4fu8uxghnf9x78jzhjiu71nsu3a564tfh9jodqlwmor1gory5zu6jm5rr4f6ptuwe8wdrkgvmqjjb2v6v0c4957yzcxvboplzj5dv8a43a8qufpr0nlxr8l1y31tsa',
                flowInterfaceName: 'goc69gg6dk144dyu8anfaa091i56c9tb9dw8q8dvsq15cmf84iytxvv22w8opstwmd64rwydnvczl514lu0elfbemikz186wjubaho0t024ubromhygc2l0avk6hyehn1ujetk190uh05cy752xscf5s49jfok6a',
                flowInterfaceNamespace: 'g711etzjq02hrjux9slbubot6dcrgcfc4ejaizb7xf3u7zy35gsp8b3idw1f7gvoj6oddw6529qwromsqhwjx8rtqa5l1xsciappu5jqxv0yb1jpshcpua7sau64p9cjq26wnnx7k97rsuo9o3kfi3qq4xrdmkn9',
                version: 'wr50qffpf5nb4tlbyewl',
                adapterType: 'ezaotpilnz2ox47zynpi2dcmnzmylanh4nffz7vtdoljx53jhydaihusstaa',
                direction: 'XXXX',
                transportProtocol: 'ylyqkg5meee7vvtupiesnd0h0l030nifjb5r0uceq3ty7if6qhz3ha93le9b',
                messageProtocol: 's1ichbaa1inqbctfdiaxcysyimgzey592z0g4yq9p64csvnro3dpli0dzibd',
                adapterEngineName: 'w9zaivnag987qzyxephw2ra6mpn2zl621nmce7utfx4ir398ubzsskq2o5p6duittmdb4mbcv9k8m3cqdj8k35vyo6az0sap7hxexfiylzoc3vnx54jjw21acm1f6wfpvqdd26dgkc8azwxeo1oewhuf4kfxbdyv',
                url: 'zwvaf1ru7byuoj62425m1s9762xvgbp84kwmyzx4u5bq4358p8dvzaiz9ywnl78t6vam8xnj9fz9xyxhcv2kuk3z41ye0r65qocy1dvfjvs7d85qvf7r67t79mkzjzm18rvn1yy1lyvxwdld8shap9mqezpto40fiinkvyfg3jd3cwmg57cdviisqwatzebbg2i8mv7qdqah44o6vrwpfmuex12jm6qjs5d5kdo58o6ggyi9nktp4dh85nr9p53balvjzw2v45dk25uzvwkdkw4pbj6ahs24809geln20zbsbl2uj1axt3x8o7qw5oz3',
                username: 'tvf2w05s9csqh51jhmyp5hxyis88d7jftw72dftmdyp2hfmt1hf41rqtg4zf',
                remoteHost: 'e0zer7iblxgh7hofmlnahny00yhozoj7bcymz5depuaytvkdyue6bnkki5to5ml79waosu5x0ynnvcp55to31y65tr6t41vin9yr8t40hqymyuqh15w0zk05ibg9v5jjwzjq0y2j9gpgcghsl4dhu62x66ytzslc',
                remotePort: 1390616621,
                directory: 'nv8e1vzdp9pwq283pm7k76faoapmhqnw8s6or2iwpxkecw9t5rs2mofocmtxy03kgkqe5rjhl7p6fe7yfdtaoi7cu1aqv4rv216zn9nf74s5bc39cpjoy7t2h3ud34y7dfutz4hzupt88y21xvttxb0mwhpvs0g15bwcl109iurjk4b8c7re2lzilbqd1cuc7p4mhsn76oq449e65prv9kweijh4pqemtvjxh0tau4aacctc7obqqiz1kcdil0iog4d9rmhhuamnmbyud7q4px15k0sv7ysdia1obolzf76v8jc80b5x7b0fsxcki9su6451tfe9ffgamqq7k02604dxjn5c60lkwmccayl10d3gyjq3tzxpq92cpi749mprihpy8qecl1z05s4ptm9lwgvtxaj35d8brkdxlkepryl35y1txfzbtvg75wew4q8lgho844km3sj19do6sd354vp5lbv3l8vl8pqbiytoqu618ldeamspem1wfeqhu2cxsez7mgnilgg61ut8fk6mbkzk8fvdjk1m6zl1g3vmem4jc049qxewxhcgvh04m388zvhh6d8lk89ea3q8q27ymzo0p59wahk4lttpdus9l1task8nzpt3gaaw2tkb6vj6chm6hpr4p9ulqw17jewqhx0773vlg3ed887gwsrlosopuwvejjpfeubdgna7haadeimonda5dpoohjw742j66ekjwdpwyldcwpyiw62hxj7yh5kkp6d3j5f9hd0vkjna9z7o5l3ufuwr0k1xka3yiwz6qfwuk32kcntpp693f914fmvxoa5i1k27bpiwf37h5bw77jetd4azw5t3rcu1n89cx0xlzmsofbfs8b0gijxkbzkyb5trwz45x95abnfo5s4448xv1ct86y7s98rwc011lty2cfcezewvlidawtbl1ku9wpjhxnbha73m4min4sxh5ivx9ywfwkhlo50at2iu2vg6yurxk5nglgovjo7zdtjjxwngl792j6g5lbrp',
                fileSchema: 'pn2apabd8l6n6h3rl2n1lrw8n50ic2tt8k84unh0vtg6o14kg3nzut5wxiys89a5vrk7k31qt7z9yfvloz1ur6yfnldtuc188i5fre3arz848dnlz276rhe79dssl79fvsm0elsicarwke968s3x8pw79z43fiitlugll8oxu79d0o8iz1lw91pjswanw7mrqqamersc7rbyb6i5q2zuo7ojczm8n58dvdb20wuwnqv7c16kkkoc7vmg09e7stazz47pgyw87jb4k9aq9tilwz0hg8q8kui3wos25x8gieq3frhitq746ezpqwmbzsj1hve2b1i4sfgxsoqqshitaz5ihk0ksvw1eiy8w4z6krjnwqr7s62edw2dsi1pz5r4omeuts7lyo7agvo0qtt6p3xov4mbgafsw9rbx7khswlp0c2xue9vgd6fnw9uttoir3sj009ndnjxkntqxr1acwklbpze76unhi2z35blks0i73jp5gc82xsilmzxxextmpb3ynwyxn9hwunldqagjjpxd7hd1gqas50kvflxcbqcp7f2wevhl1e1mrrb139s6614kpxe9cw0q2wu9ihdqzcicep5rc7q5l8eiamcbipp08eozjkkot1ea5newerkfgq15jp3jldjw5bmqiyabq5jmbyklqbog5cf06nky7ruu4zjfwkyavqoswr4sfyzztwv3fqigv833d02savyphvea00zow6sqpewhgx1rv6b0kuziilr6i45w613jjkubw58qjsg54v05uru1fmyrt96r7vna9b289babd729ilaudw7thf3vo7qmqylg2v5d3hyzk7e7ckzensvvklpt9r4jb8wakdtqxybycoa3flo1cmao08gu8428r0t1gfyld0ww3kdbvijzxf6ss2qvf54cxfdbeugpuwf3fzw63z5h66qreimr3unucqc4zvopmhrzsdiqd8edt3bwgrsvumf99fgpd7fkzv2oehccxayt31pvfexrrmt9t7bas4k',
                proxyHost: 'squ14j664gqu0ouv4fr86xjrye4eulf6vyx5kuvskx9b3c9fvdetam066a73',
                proxyPort: 9491971286,
                destination: '2l4d3o10szmkl5fxleylio7c9tv7asbvjgpko5dj1gt41qfs8g1d951weq8fcb3qbklnr1fn46ygucifqj31fqntprisa6scfut6p1eszgxubmq1i1wl5tz73lkattku0wkusqdgmbyk3lks8t3n1no8aue9twzh',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'tiuhfp9hud2ld9re3duieiicyh7jj0jc4ilaqs0m31b66qofrbqk2dpl2ernfq2tue551nmyo3hlyspuhd3fjh12cqvxrly5950hkvcl9clzuzriu7wdba8xxur2jtzzvkxs4h3w2iy70xvmd2li98mwbgxarry9',
                responsibleUserAccountName: 'x8ts1c6gri2curidf6ut',
                lastChangeUserAccount: '12f4lqvdkcnp5478lvbq',
                lastChangedAt: '2020-07-27 04:23:13',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirection has to be any of this options: SENDER, RECEIVER');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterStatus has to be a enum option of ACTIVE, INACTIVE`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: '0bx4dl6g80o0c7judni2gc4ol84r3qqozfn20q23xskobe9e4n',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: 'oyuw2155uxn1njjq15xg',
                party: 'thcqk5bjcetz4ghfsls55wupul4i40s06kk79igxignwbigbcbm3a17h3jnp0s6cj4ofvrtb7trt9k0uhxk5ex5nwcn3rhzzlueiwdcjaethnz937tdn12dsyggvqtsl29tn6u42hkz1jbx40ws796uxdco7yfyt',
                component: 'ietghvwqgt6w0f48wlf1gn5ltuk51i3h8463s7pzcji4kbwgsxhguutl05y75gt3r4v43y5dw8v26etvoi9bc3foqlftnpdu53ra7b40bkcdsuc716r5w0cqw19lao1cup6ydiw0ltv2fn6t9sxvjdehpk0ud8q6',
                name: '1c1p8wglq57n7vhsk745ep86vkwhv8jpvk052pfib6j3bfexzpsnnm97jm80jbnm26czsk4kh1kczx0cqpaji2k6kk238zyhzbc6dwbpizih6rwbqxi2m7nq3qmii9yef4bzwglvyoa98gnmjm5apccilcb39xad',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'gcs37ms2yi2pux2gd4q5j288lqqe6nasbgis3uhxoni6p86hpsydpyv365j051lybjp3lqzl61thmtoi8ntg4m691r2q8az1l2eun1dbg4x6ar5vu2l166xct63dd9fr9vtzms21d5j9vyb8vrvjba5mgyev3rsg',
                flowComponent: 'gkfysyke06tveqbu81b23j1ccpthc718at285acbsa3pfmtopj9o6dwnutvyrlw5w51vnme4ygsughw5v6oasqj4q575knpmobv4lqxe23i80svshmy7a7z8twcvh8bpnostfqs2dovaoa14ssfc7b85fl3xmx9z',
                flowInterfaceName: '0vb3oixz9mm518ykttb8u2pduw4fb2fr0ewa64lo5g205rwnf76jovjkos7h3b3hctepxcpgmfb5jg4w4zolvb8nro5u764mb0kndyji3di7nu31bstwvxeh7mfbkozd693s7ejeaafkkpf6fdzl34h41bnjagvf',
                flowInterfaceNamespace: '325y4fb9ybmqvs4cbmvsm1f5k7hacm138j2uoqow4lrqnhaqf1d3zpwoabb21yedhs7evw5ybga4pm7n5ay0oku3osma6i2roz7l92mzhwp4ieu4j8rmbu222z1xqcrc9bpu9zo7qzltzy02lionat1nbg5k7j4e',
                version: 'llzkdhb5wai64xjedk21',
                adapterType: 'n9b30kgnek1gjrhcuzkwluu0jz1cuk03ktffl4viz671fx3o6y4iar27ciig',
                direction: 'RECEIVER',
                transportProtocol: 'pqxsa8v55aqyi7i50n3ultkl0lmrqavs5bidzqzg5ov1ot08w3diqyb6l2mz',
                messageProtocol: '8m19qbnuie6a6kord7qh318efwxnihbwes2f1lihi5agxxv2ulksmzuzdhao',
                adapterEngineName: '505u9a49sy0hgltwf1c55yh1iroolm2mvzbabkwzsx29nxlxxts7rdq4lzeo27ppk77xq5fu46qn0wxv2yxlbn1j67ifj2ymhkdp9bddzgzae2gs0kh81b035048vlk3mahluccnobdflyikabjp9z0dulwhztcz',
                url: 'bjofecij1k0ctktoh0t9gb1hbzzmfnoittbggp76onhylnumto9331j4nyxr4bv5w7q6qw3bdstmoo25f46krup7o0lnhblmlzymunwogb67u18myh1ixp5z0bccngppslggwrkqnod09fgl1bbaai1x75nw3zdplrhcmf0jqxc0cn2cdfg6m9d2p8wcp2phy48y4qplejfrsv3iwcngphtx68osucfvigwfh7m15g2ng0zi477735gj0wfgi72r0b7vd1b8skagyutwy69fipqs6u2j28p8qez837bgzvgxumwhhoj5q80cc7u2locx',
                username: 'e7d7xdjpoxss91sm5gchexew3dmieedn8r502gvz6dt8dom8klmerkrgph1o',
                remoteHost: 'ixwtmqwdn8nggw4pbzdejkzwy83yz1dr2g2iljwttnnluzvpb0ss9th2wv2zafhoys3r9gqmzslulqbtw9f2e3sy6urz0ombgtmfzhuwafir1jf390ker6m8pmspfsymue4h84llu3vqw4trqee1v2v9ucke38dz',
                remotePort: 1036389341,
                directory: 'ajjvwf6oon96wk4jlm1jc12i7zebk7cliormkpxqfx6dg0phprgyx88zyay96rgx9ej8wevwpqqxaly2pisg15jozlav9wk6iudfo9cpg27iex634dtg8wujrk8dq1jf9xl7dr854plaw89ohjpxsr64b0kqamh1mbyjdhxjjxsyfvgb7wnulqsfeobh6mro2g02gi63qjkn07b5crsvvldyv9menmzl4n1am3nm6mi052k68gk3gjfqkxbx2hcltmzimj7jazg6komsjy021lwgf086cr7g8jft3ramk6ix9xpkygyj2tsoc2v7bve3u6hfqjxcu966oyo8c9mifz9t80hcntbrf04c7yfco6kaanrfi621vgwfd1cl7fqec74d14q2seuu0oomxocxnzoor6a6a71te8bpublvwyx1y6yu76mqphsh9e20s5wb4yjpyyellyx8qct344svnd15d0amn5400wfyzll9d3f9daf36cs5m18hqp5cpm2z6qggtzhaa3zv8xhd66znjrsa47h8z5lnploxahbd8ohu34j9ckkfosurx5ynuaergaj6wxiwb6h14ijosy984982ywey9t9nks9d3a9heturre77aoqaki5wi7c5g1oqbunea48hvtf2tlgtvwf66vxyh1kybnlopx9k1bzpev528gllkekz1ek7j7skwio1qrpbstt63tg5fxdl2np8jsrb6xm5rhhdgeqoqkbf769r249rxow6gijr39w5kzffl6ophd5tlpc4co3cvsxsws1kropcke11qz69bxnj4pgj5yjltqq6ln0tg93g2n7na1xg9a53g0v7qsjwt8hvqz0t62dy18j5iedeeafjpq9p3cdse2k91irgwrby8ja23v66iyprhodao70hm3lbre9i312a0fdkyp97gf7jnq12k64hkoh37hvo1yg7zdg7o7scaysadeilllqw55f75f9q7639df5h0coogz74r5tgqpwuab3x7ncmavn9rxq5',
                fileSchema: 'v3g3x1ornjvh8zgzk0e1pz6l5rz2qww5968yeqaxr5v8ubkmb5bew7eptb7a43gau6cv7mz7gopokd0m64umqv8n59gc8ckt2uyruv8adbk8ya7nocmi088mw7m8alw6x09h1gjv5zvsgfjobjmqab2dxrll7e8s23zingprws6oa15r5jibc6553xlrxh42bcv29zqki94x2z54vb6uyctpk2mexrwk5iznp56fhcudp1whskzzcgugehaes4tqmdrnqgxnk1ogghxdp9cx1x4z57esf0sr3q9ysmp9i3wbxzo99e9v60mr8cks2l014xqqqlofo23o2gdt7i3uujmnrb2yy6gpccnb6xxd0u9ufv20aift67abipjvxsgb5h3z7jtvdsaxe3jwi5ymyel9t8mfgwwr9160elt3v854mqvjnyk79npr5o4kbbi5cbciwfywm8q2umu6vhskkjwsbcr42k5ly8a87w0pc64biqqsn4t9iv634ggqk50jqqouifqyxcjcril5wanv66n4uvrcfaox1hifuzzx14qbabajntijrognng0oaaaukrxb8zk7gzvbyalai3dtvlyp58i2v33tt6ojckyu9tl5yv3hu8w1dcel8lri6uwdubaexhejhk5nd3pes68yimgmty22k0zoroixig8861s6tjjic84jrbfpzj8o40ch6i5spnjm63d837el6gdjqmvi24qfwpjohg5zgh12cnad1fwuozfo51e5ak5ise89mlbhzkz4p1zgeg6tuscthljq77e6h8lvakhxlt83s74x9dartd4ne0gaqvx50axv8dyqwlh3v5bhyzct413n38n29dctd8l8v9vlzef0949usva4khwar9vy76h3fgamvmakd021u11tmp4899jmpfzcjvpzdxr8cncq2u212sdmodbphbiwyf9iz8zmgpmt20dz9p6s7k89a0if6onz8ckkmizvldmhmz3h548nhxre3c2drqtcpjcm1xr7qf53',
                proxyHost: 'kb3jv7frd4t1n3asps73a96sli3ja0cota9bng9xfvuk6lwtzx9sqpmqp99j',
                proxyPort: 1622756196,
                destination: 'fk0t38aikkp360rbtlh0se2iee085pciakipegvsvd8gefodriekx4bd5die8s5sdlto8upx0xoz1cepobseo95gmgy08o3rmy7mzytvpoetmnmuyl9uxv9kvke5c2b6yojo4jyciiumxejxnoijwfnv7l99h7ew',
                adapterStatus: 'XXXX',
                softwareComponentName: 'vzp6onbnuqtln9w794nhm0va7wddhsb5fcmhlz69wry5wa7wppj6m75e7d7is40v1kwh0cvkwnnraxk23sinq7ekpbyyye8heem80w7aa67wi4hamglp5mkqncs8uzmw7512d3p7mc17hn3jk8754q6ocjrqoekx',
                responsibleUserAccountName: 'y8nbpjqa7z6pedyi99qf',
                lastChangeUserAccount: 'e59j7qpw6mp4ymmkblvj',
                lastChangedAt: '2020-07-27 13:01:38',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterStatus has to be any of this options: ACTIVE, INACTIVE');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelLastChangedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: '076e6fwp2gregul4e2twd53yxuoutlqvhl6ba26rhnmf9j1tg6',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: 'kb2rpp9lcd3obpzghz51',
                party: 'bmg99kcbl11akgv0df4hlsgqt5rad7yvfcnm00atmp9wwovo9uvx7pzki1gpjtic01v8bu2t9pwdoq7jgbypbsindld89fex05li1ao9lfj1785hve4tqo6dau8ysykdhpd86f5gd4ngwj6jb918s6p85eijktuo',
                component: 'aaqouok7n53r4cwnbe60wje7suj0g213cvaw6p52ia9p4aix1dmlekukfwqmauoduax2djq65scojr37i4y2s6mlqrs3nb8wevzzm7segm1r579mzwe8biltvymkbudms9swzecoof8ra83fk3yu4bx5wx0qupir',
                name: '67pf6t4gm37phbjkpi0btxt7uzcykhf0e3hiz9x3mly1xbz35guumuth0gd5i1j7o9rnzohn9bcmhvbm4r38e21fxu6fx2paml9wvb3yx7nz5v6jcc2qz6elk0xbb395qx1bftz51vjww1tr6u4hpdcju6sm9v2z',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'u6mapfcgmqkso5l9smjnxq9011aq19kopbl72dzvbj7uj37g8zp45dcijjgtifcfs5qocgnpuis7skky31oihybzpjj058hdlph9ried8ce9obwji7j63yfzcq8n47icqosup7f111ymto4em6l78q4x1x3f9voz',
                flowComponent: 'a35vmv01q716u1r8rmz6cx9vyzq7vs3t9xwyiseuzjheectvrzxy5uiirhferqv0zstwletp6gvdm4mvxtpr3b9zu2wnr6j02sla5dqml5ueemqkbk42x1hxzwk1s6oyygpwlepgnjtmxkr4an8vqyrlzgt8n7xe',
                flowInterfaceName: '4ff9zo6wshq8vc3fqtv1edvqldd8npnc6446z4cf4wos7apg7quxlkhw7n4v4v2i51rm91jvzieoliye4ulq6nlgna4seuwk40puqzwezenlnl6s5ymj9ccyfg77figafq3dfzly4nmrklmx4eua9lr0gnvyuz21',
                flowInterfaceNamespace: 'kdu761xd76bvfdl6galx7g5k5fe5newml8w55j17hc88apc2015q92unovak9yx0rddhsof7k1f2n0tizvwuiinsesi4snml3fkle4lz6x8e2b9y1ybnuyyb84lud4yzfsgqtzeftg13a8qym73zpcsotr2tb3wm',
                version: 'qri0z92j6mg90l7ko5ao',
                adapterType: 'gxhynhdomryfe06wb1noljtgpftbce12ir7pzjh16ahqm09m4qhyqbphvxvn',
                direction: 'SENDER',
                transportProtocol: 'jpdqhw16618982vvpvh3qw82p29vswrq9eibyhl4u5z5ty62znouqnbjr88v',
                messageProtocol: 'ncpbmfgrgx8ig6ugm5np1r4xa56ryu0qlhvo8b7svutloyaj89cqd8ei6r2r',
                adapterEngineName: 'bimraug08kbt42c8pe8b1vxi0h6ombpj6sjs3ath0c8h3clsdgei7z61ung1p8nws7zfoztee9n1kftzcbewzo8g65gdy3f9w87gfaacnydtzo03xmucp3lwyjzaboxgl7ht44qzhwvsiacswx3uauk2nkwe391u',
                url: '2taoha5t5lysavxwbr861y8yylkoiyh7fnuh29t2ob30ztdoynqo5b9spb27irnwp73cwlk3lfrblkx6nt8dd8o9wnbp11udlhngpv0uegnp56s34fdujeyst557aj2znsvxrk4w8wimwspso95z8gtr2dkpo9v7ubt0euimzw7hagj2qolcv6m3sy2etklkvgh5saztu97xbajeijt43jgewq63hiemuylpqytjhipxdvfpb77gl8h9mvo9u1nkqzmpxet4oxv4hpdkygq81esh4me5v5nnsot4yfatafaeu7zy9830i5bb4i6cxdib',
                username: '2s2r3mtnwewmvf2hsn9dq39c32vp1rik5xvbovv89a2ag83eutr0ezvedcna',
                remoteHost: 'i30coam0ub4ugmc6ej9d8wfpq5vt2hleub1lqqsbc4xc5bfaqi4yqchtjtnxymee91fa7kmc5j8nl7tjmvda8xanvmrwy56vr9mrwnx9qgb0kz39d9mysvp8uj0jd3xjbw37pona2d1fayf17jkvvjqtx3g8mf47',
                remotePort: 9036387131,
                directory: '42yfmhkg69zk7bsc9s0fhcxkf4ven2d4i9c481j6svbs457ji1qdnlmtu8p48ijw3a9ltz2rn3tnldv45tnbhtgbgqiif4vvpfqqbgzl150qwle78iobfbbt9g86znq3t98ebdodde0mxujmshwpgby824mgvb1o5mh5dqj9k7vrhvh3noa36i9g0j109tkjv0c6wmuvi7uppiov05tt575afvw7bvj936y1i33c46qszvip85x13mrkq3759ugg664ua7bpetti0a69vt8w7daovn2axmirxoe4efhtpuu2axrr6ls0hagrclwiqeaoranzjjac355qo0kkjonu5t22nfj7zyhyed3imb3o0icvas122hky66xw24b66tt4nnew891avpqgnexa1ibhy22f4ks8jgyfxdzmuz1qjbra2b8ixebj4tgo7gn1rmovdx2240j7qoekhwfwb8gndv67p0mif2ellp3g5a8jud9rkpmn4f2bbwka8z7fc6h72mjfi8st7im9s16xzao16bue134a0aw7leqhdpv6m4m0tlkpln8p5qx0c34tfv9twg9bqv1p4rq179uehj1nrobz2z78t3jgr7rps3ezh67c62ktxwzy6zdjuoepf5s2yup83c1mvjx0pu6agqms0piyrsngd0g1ssxvrc9eofzjc367d3vxt18c1e4hxyytxsy5rff4yo6feg53u4h2rbbxcpqehkcwjnsz5w445kcfpk73ae9cxl73yo3ca9tymoc534y9pqiiz5jszm4n4o99mir99bpfdcnmklr0rinu8wnja1mquqhr3q5pmljdqsqk5g17wiseij0cfrmb3rb8kgd5342tj4oyrp0hjz2y80s0oj9hrvciuhz348pyrhje4xshajq53vd1efx6q6x6n30nv1nraeqnnay3nkbmp0zy3hz0mmmo6x9z7ein9kak4znyodvz4uh0mueudg7raprb3e0ydndiz40v0e44gath8l8a4ro0zuftluku',
                fileSchema: '7zh6lthx8nga6nwd1dpeuf1cw933rxpzs0mtwy34ps6umbv31dt19eztptiofhs1nc6acqlnr1m8slfwd22h3sflsc8ywmvp06fvwn3sj1j1haymier4ewp77to9aa83wmkyu6u3zvqafape26r4p2wstnxw61y98ru8fuki9cd4snaf86i5ci0ba321oqa6zo71hb8j4l6wu6o9v8h4yyscw8u6re4a3i2piwjvmeqs6feah5yzvvg8bct9uplyiswlfhs4hvr19nmukqwdry42vqkccmul1yvj7er59v0wnlfy9oju4nm7dsxvxo70jg9319o97nywm9qlp37jjlvbhk7vj2htnua1uuhyws17aj1eivoc0zpmur93iu1hqiu9o9sa0rwuxxh308jmj3ml8g9ahmscxfgiz10lfdtbnj9uzamas7tfs2edrt6kdpnw7ahz19a13fob0ko4l4u7c4rc5v10erqb7mrk61fweg5i1sof22g0b3unpgnxmgamgx4d69mzutaojufixbj9c6ehebbh9u223n13pn77lhq033kprsjqjw0ouy75ekwjqx64kwfksm2s8bux4tjtivqvf3ip8a889kre3pj0tatwbnt183y0k06db575wgdbnhdjh8gnjxj8yt0hrs73z6lnzr8mb75y68n2khjztn45pvkdihoclplgbkhdqpqeeys630w6oqgebuaqrfpcu47aeb5s1k1tcnm9ekcbx9ns41qdbde52enrkmffiy8ak3oo9n1wmcc72mj08tjcddzlj727uvxtqh3c7y7tf6iz1az22v1gpkwrbvo7982vhw3fxaz488ads63mj7rm9ctp9ffi8akwq6f5tomw55y920vd6v4umx3ngd5hxqaxkmiwuiotj6o15ti6135ztkqwggrqks563bwdjwa3cvnyo0pks4tigjvjkzqrovmde0vi5kkp3ibb5l7j7o3a3y13qbj3s898w4asd77lds6kw7jelu87v8ea1ai7',
                proxyHost: 'dhe9b321pjc41w9as62tmoswdozsurllnst932vo9x9f0b8n4ud9sije92ip',
                proxyPort: 4558187996,
                destination: 'oo6g28sol6z8xenlwauslvl3fxg6ee503z337gbfjsjt0cqz0e4uay9f1ead285kco7nw7zl6b4huqq6txhtsfq0ks6h78htl56nahm0h81w038g0vpqwogflffb3yzi30nhmwgg4rbrabl2db748wk95d3n4mvv',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '802xfnz1pxpvbhxmrbpdjdgv25gqemocserko5eqgu18nhfbvzp1die90gewyyhwhqllyb8k7tg0vahgpmh537ke032o89q7c487wpfmyi9i3e47poacjj8ud5coe1xbhw13h01xxxrnwiramgcl7z2ue45z9k55',
                responsibleUserAccountName: 'p992rmi06zk89u6pvpmc',
                lastChangeUserAccount: 'u81ttrrpggpyopkiwg5d',
                lastChangedAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelLastChangedAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/channel`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: '4lmg252gd2qu8jhjlfgxcuj8qv9qaestr0kmovbosqeb9xyca5',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: 'gnsox141qyz28ts86w6k',
                party: '5e5ecdyt6sok2qd4q74wmefq35tbq20pqii6hprmapkv9527sclx58xthv89czggpdqmaop4tshpmlir9tyjkjeiho1q96r60ibq48fcfki5rfjzv8kgv554qmkhphwbwepwv77oqvwna25lxwakuzh2f9wi8c5k',
                component: 'dnpdkvltg4mgejwt9448bhdjlb9jyazi0girfy8x4bl52kf0x7hdqzik3du374gpox3tmlh7xyuo9auay0k2w52zn7z07q6k85pi7r0c5ca2lmjjf6wslrpk1wp6g48tpni4bohcu9vplho8yosoxawbdfgqofs0',
                name: 'ug6b34nkxzerm4hqjwi9yw9n4vmpf1yd1cz1as3p4eg5umo7iswrti7h38embkcyacxqrrs5x2ngtvqm8magkzg8idzpo1jo1i14s8mfw5thebhej2nt0pbmmcc4fq944g7r93d72etda7gay31sjw3n9ww6hfaj',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'g02hh4t4wyze5mr3t9elyk9cx571nq9mpx3bn6qyc2g6dh6b0yqtmeakp9onfy2jj4o8h1comdjlibsm7si3waovbja6wkwn0enf2nqcrhjcmnmj1m5d86rghscfaovx0z64wnlgmr3nl303wugaotsj8whlaoek',
                flowComponent: '0385nhetxachknwctxw8lhpul09c4ssb9aetwmq63ldzxrm862m14ljt7tboqjutdttj7s0s68loc4sg3coxklic4j2prv8hj63ozhprjb5judb8qkqn0q5zn47fqyrwjray2j21ysmuz11md3d5tl7xtbdffj3w',
                flowInterfaceName: 'x9p2s2xblav0jz47a16s0792nkjyi3mfp6cmj8dzcqgjqkf1vmtjypvvfd6bdolhvgyu68gh1kd4s6l45gxls4krayk7ywtqy6sipru7yq70x0t0077ww6uhddba7wmt6nnptk2pz7z1htu99par7vmq7eza63so',
                flowInterfaceNamespace: 'o0cs7nponeee0s8k0mb0cbkx9gayc2oyghk2q82y9ockt238tept0sek4pwac8hz84e950k92drjdq15w4dlolu9p59my3hfvakvok32updi6asjvn59wdjo7gglxvsly956kmdsi3r2uiob2k6ouivhj6mz3wvm',
                version: 'l5vy34y4x3ykrht9xlvi',
                adapterType: 'yxb40is4876yqwbbr54mci96vygsjbusoeo8tuayx4mlxxavcksam7cxk9oi',
                direction: 'RECEIVER',
                transportProtocol: '5sf7kk66zc3251s68oq4u1p9r9vmj3ubrxdtnpb1kz7s7ed0lbexnqu3zfel',
                messageProtocol: 'yb5p2j52ku299g96daldnozodrdkwz77eee9tn1nxytbsang16ksmh791t5z',
                adapterEngineName: 'xs2w72jlpf1d7eyswd48ub66i9pgmb0mpd2puak1bq1usvm8xqr5518nisu6f2ytd117urijdk63gma77uk7w0qn9x9cohx3oy38vo5cj1brf0q1yidzemwtb91fkhmy6y614g3oys864c80utjl9c731kk08ky1',
                url: '4qvvcke3evp5a0ag4feyzwoy5e5fftd2po7bxff8qh783chjuu2d7ngxk000m3ma1apu3sdylfqlsolp0gx3maxkilu8n7xzcx9q7fajmydsbe9mpa28ncllcau5wzg6nqnh222xznhmrq7vrv9vd18zs6wkj4kkofgriuguuggi8hw8bemimw5nz8fhx6m2aei30voy7xcnzucnt3c1pe92l3q55exns9qr9dwjvpjwe4wttynwp2b58rtbati0rx3686rh8ecuoqed5lujh5yhp6nrj7hm9rbrznxqsxo62voykdg83o9tt2upizll',
                username: 'aul1m0c5b2gbmo60nyfn9oci7qn5br7c1yow1c3k8fawliy5m7ft2sox8370',
                remoteHost: 'lw64oioqyw35d0n6q8uyu807ohyibb3aazmzsxyjjbt2puovng6m5l9c9tqehw6atynqobdmpnflps2r4znv49a0e1yz6nucxebck956m64v6hj5oh9bt3fqb3u3odmffffmiq479wwveptulr72qfcufnd4ivuv',
                remotePort: 4911309672,
                directory: 'f7pr5pmvql4ql0xb03db9uydvg2sfdoq3r7qce51zx5ekusivrouev9frw8yxqfqqcwbnzy757n6lh4mnribftkyv9ifpr9i1kg6ebjrary89a07lxjt7b9s5epgva9utpvtlfwr6s83v92ozz1phnnuc2y0rpa3mx8yxkkr54saqwz3h2dke89ns3xl489uh68jcrrr353r4brazyq77h04yfm9r024u482km9xkhfygq24f806p7drqc1ht4ock2e3te8y1ff7tp8xo3fhw28rmgqc5vinvc61t8kcviu493sysfcnq0lnibbo9j6w62fib3xi91e14pj9gy2a8tlo6znsklmf45xrn6py0rq3vuny7utolfl08065x8lxpz9izz8rxrhxonfdkox8pt1pyropaz9lsp2bklpmxv5ww6mmufh610busqhnxwxy1rvv3hzv9tjqw50lm2rmz91hvb2b6dmyzhctt4kyk6oypu3j5rwslymuedgldzm0ri5r92cgwaknhdym8gr1ql16ob1ndb71hvor8gg0a9dolqbrib4w2pni3aeqb5iuqmrf86mz04q94um5wgnvepjh9lxndx4n9dl55gbft6zo2f28er8yobdgvhc5kqz4c9x115v6bp41bte002z6ek0vlt34w7zj1kujhhqw4yi5lqnkqd72zd0t5tgfy4iqlyf562lqjqtt4cys7f2f6monspkcywpj7evloxtjvkkthg8t8jmekis3s2u4u1q6qd6meenmn9tieq27apm9o5737m28unz4pc5fb8hdv0555gbv5b44ikhmymiyr6t7vts616x5e0ar34lu1jvqn29z2quwo8uxe41tst3z2nez4lwnsimtz558otj8w17n75gz4effc2wdybs0mee0ysn87yetlq6r429iqgux9w55bfpidy0zd12awqkemcd76ogzyyhdhu1c8f9399cknsqfh3jwxmv8dgcjatjiuo1ivesiebzekq4ribnxq33x',
                fileSchema: 'v4maua7mxx6b7seyfwxre46qrc40dophcmpqxkk2nj6dxwdpyti6atb2vfh3rxe4pglgxg03a5k6r34jdg4hpubwt0i3pvlh83lde7itey1o7dtn0a5ctiafqryf820m8v6m5b8kvea22d7igg5w7v03h23xc9xu11ksn1dlv4ovhglbtm7i2hyml1q198of4nxacpl6oxr1x8io9xbw7knb1v0dgdcsdama52gbvib3yioqtle84p4hjuk2s4cffq5rywypuufke4shrcsk4nqnmvtwv3ck6gldt6pfxud44qbof3gjsztaw3kpe2i369b2xcrnnu46uvt5f08p0d5259169oor8g0ln15zimwi4a0p41u8ob50q1nysezp5kyuyo3shlthvsybt55p6swmbt4w96hkt7c7ait9mzo85u7q3x5ql4mk1xfadkz592njn3e3b07mxg54heymfhztn4ciaxk5mvh35ja1gpt9vjy3bkep9i93codh54wz8h8sxnd11evycr5hs9m7l0i1g9rox7x3vamq8oo1s0reopon50523akt1i8soazpr20gfjmfyxqf0wm1202vbwjhws0181j3drz5iu7empjmlya5jvr0mdix4pgjp7ucujdgqa0x21g6nhn64hymootmafifjgn29zyjr2bmxlnelamz1505x7alnncwxwlkywsde733tex3slajh6rnwt6qnfp8bakxnc5xb6ga11gfdjkuynyjbb56fbp49vmti7ezfva1nxd2rp5ngqkio3kxjxsuky2y101lc8c018gusawkqay2i9gyglnf0kacnwata66d5mtl82rlmz5lejcqsow7seufgmt0p40095fxrmg9fgboz2sv8mexvc2kwwfjuioxqgkgw9sy93mim0bykqkx0c3uuxr76p834ps23sncwzg7vghwovqtd6kfxyjfcsv1fbrcq1bxqqwe6txhl4nfay16ykq3v0aje296uczvbw8yktffl9jp3tvt',
                proxyHost: 'uwcn5zok0wkc00tc5y1ww0twtc6ztl25h2io31epui6z5saukvisbi1ql6qg',
                proxyPort: 2997866368,
                destination: 'sovws9fyche15vifkyq98ldl5ries56v3t0hh1g0ulvy4h465zbl4sbfacev4npwjjplcrgg2qt4measio80cf9x3wcs5soczljaggts753am5brpwpsw2r69dd0p9u8kqswnfct2vbm1kofpy237cxzv1xrn47q',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'yc2cn2r0vmn2zy3nl2haxqdp07kwhzp8fd9fb4oa5osymqhmdgp6uess5osoihdq1q8fklogatp4hpjfwb5nn70rtibgbmper6u066m7qppcabl1fihsaoh8ar42d5glf3flmycpe8rw330g73ki7uw3jx6xuqeh',
                responsibleUserAccountName: 'chy7c9dy57kfwti5fzic',
                lastChangeUserAccount: 'bu9cy8wj5fkmw3p2ukt0',
                lastChangedAt: '2020-07-27 04:12:55',
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/channels/paginate`, () => 
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

    test(`/REST:GET bplus-it-sappi/channel - Got 404 Not Found`, () => 
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

    test(`/REST:GET bplus-it-sappi/channel`, () => 
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
                        value   : '5b0f85d4-de3b-483e-8d47-5943196ac792'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '5b0f85d4-de3b-483e-8d47-5943196ac792'));
    });

    test(`/REST:GET bplus-it-sappi/channel/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/channel/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel/5b0f85d4-de3b-483e-8d47-5943196ac792')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5b0f85d4-de3b-483e-8d47-5943196ac792'));
    });

    test(`/REST:GET bplus-it-sappi/channels`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channels')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/channel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: '83d25ab5-0ec0-4f49-b2f7-6f9fdc24dbfc',
                tenantId: '47560729-93da-4749-8438-263899cf4859',
                tenantCode: 'xpjloknighju9j39qc5p0kp8eaus0zntqrt9s6kmg3tenlhhhq',
                systemId: '74c935b2-3e9e-4918-ab44-68c7b2082fe0',
                systemName: 'mx7q7tqp8cuwsxjpqdk9',
                party: 'slq5cd8xvaekuj65boju4ddmmbniahu3ka68j860qym960ntry8510od3292v8sp3abidd8ih4trc3r3u99gr6qn0m9p1assshhh5srk2x9yfbxt9kwn2cid03aul7y28mrfkqi32ai5dlhevyp0erom66rxeigg',
                component: '2idru4h2840mwvewsk9l71gdwj5kjc5ktzhx3h49bnkra6ts6tf6saz44nr9spy2b6y1i7xsq3l5bhryfhmnyxk67omosd7wtp29knf6quylf48k9pk24hjq8z5axcbt5gk5coyt3fqfkz59yprgtdsecnv316ea',
                name: '2ysrmnm4ge5kk3hkq3zxxznr2iv01twf7uuh6onlijx7fvngbxqlttsixgaft62muhgplf876sar96j7zkxndd7ybqf1lt0bpevcq52if875pm5o5nc3cepc4afp9s9y9w3crh14nno7x5bnba5eqmcst85612qp',
                flowId: '43306520-1614-4f43-afa0-e627676a8fd1',
                flowParty: '0tog0hckxv2ucgbuu2v9guxvcy6l8pe1zld0wl85chyi0e9mdwzp0xmiflwb8ts4tyxjbkjpwtdmjb9wqsu741pk09mvgomdqst5oec8864gqa65tcwexjk0b4x6r82ftwxkvpccdncr4bkm6wdegcebkv3z2x79',
                flowComponent: 'j8ycq6axd7le0i1vsnfru87cvm7y0iiimywzsv0mqku5gugecybfkwartr74n4qflb5a6j30pcphs2r8sotvyjrw6xbkcxi9t252183sykeukzg4u4zuq2j4y01thvj42t716uwsqnoq7dauersn7mltjssref2s',
                flowInterfaceName: '81qgbij1r08p4305oec3t91a6j9mt05hntjajrtx8hzc9darh0npy67o22af8t9m5n6a6zplv5l2377kawbopp8hs50ny7ho3ke3rbz7xcqbl7ldpwrr2e7z2jrtrp9aush91crv71s5ok04238pfrdg4qnat39o',
                flowInterfaceNamespace: 'ee00d7nb16pw2lmbs6xxe4yuii90n7ttgtyepp6rso1m0u1yxu3gwmg8r3rmr38u9vaistfur4gjbp9nn7hadx9riyk4arm9sk37jxznfulsr2sa7m5ibbdp97xdllr39rioza8w5h6bbcfetwzzdpl0huv3e5l3',
                version: '96g4wus0trcdvdkrst2r',
                adapterType: 'g2s1ixpgczkfqrz8p83whln89bek6xwvdfdqhbcwpfmo9scupirwr3fyraeo',
                direction: 'RECEIVER',
                transportProtocol: 'zf9oi108p7rp68edkj50tre6llbhi6uz31mcjsvjxcs00oowdmrhn0tj3nrw',
                messageProtocol: '4j3dafc3m0ptuuaitulg6t1ebgp75vmjj0v9qcx59ajwfjdvbl3nnffrkmgh',
                adapterEngineName: 'om1gcvjie8mwis5qnraxiu40u4bva74gddr612a0petod8sc4p0vsxad2mmygb6ld3ut3dk091r8op66e4lry2yknp3ze8t1jt3ogjgo2znidybz0hkhmupojkxlh6iskdtxm57ztmcb7ul2jefgosx0ooz3ipjx',
                url: 'lyiy212ncu80kd8wkn6jptu1hvwhy0pwidsrsfe4df5ucoqu5vwwho3styk7f7ztrd3msw8rgoynvvwnbez8eonktds65u5q4cngcj7kt920jbeb8yjuong3bso9i73lo1r1hsc78ht79apj745pbjiutpzgmjszgd879m812vv45eg7fp7m0qnno592m5jjdxd69idove7afliiwpn7o75bzsnu4xw35zlmn5niuw5smtwzom6cbsaxn7stxaffy4de504mjaeluqhj5ce35icelus63iu13omrz5j1elz0opstd47k2ygjthvamxjv',
                username: '6sldl79ectgz0v7znt6dla988fw76knymrzbaetduf48iheyxo0d3ndxsid1',
                remoteHost: 'mvmxvr1f0nt6verlr8y2rg457gffldmf9spfggf6xgqw58irf9mqdjj83z34wgnc8zzjvabscxy15j9r324nijjc4d2qvp6y2ohp3ehu341al65w7hr99n9imo3rg4lcwg5gpgjwckqviafgqm5ufbyiaiplpgk9',
                remotePort: 5372956852,
                directory: 'srfq5wkkxd6o2za31on9wqhxqwaxolg4qpi64jnnufr8tkacwigr408ggmurarcip4dygqpf0m9l0b12tizpapj6gy1e5lui8roeev873dc0yyu7ivcmrc2z7h3o8v3uzzgrdw67jmudxjsjw7eoev6klgrv6mtix7pbitc729khg21evg2lrx8okuo94bi84kbrw0xy035dkcupqwqmqdw8o6ngfy22wnztwsd64d15ohchyy22hqxqcynuci9oziqenzgts4q61wqwxmzwgwzd5x75nfcxpl9u9ekgdkx1yge5xiojzixqdrywd0gex0uw3iu0mwfcva9olglp0i37y1phjmxn9ckzomq1myewpc2g6f6uce6xi8rtsn3w7wwyjn154a74ars6b3iepb6cq6fq3jjer7q8svx1lzot2yl6c5cp571bfd5zo2ye6c8ii8tpq27jlvzk4e2aqryccanylr2evj22j74pjm524ycrq8ivoubfavqvrrt2pwbq4dydp7zua2pzidi3pb3ihkedqlupwpusrn2ien741xlz69ciyvnsfufp04vr8epny1zx7rveukz14akb230i7v0rphnlwcs2cu9laiuu1nk54u2ciicoczb6mwho3cxdigazoxhfdtz1y6xfbgfkfpdr6zo2o3gzn16w5cp470zgbonvdi3e8b7yk7t77tmra9bwfqs5kz36f0bru7dyna4diees1rjmw9iyqf53wo3mo7in6x4hy7oi46639hlr0ne5lzffr9ac0t9gs3j7ku1e7hsdmhuxvuzv67xip6blj146533h0mhlsbcp2hnn8a0zev57gvkyyagoqlmwng128flip81jagupkpawggp9es9qfiwxupqw49s7zbk31475eva8tur6qc1ce2f2t198ngytkmwdezqvxqtv5rvfdfjuii6way97qs5sreqpn8eol3bkqm70crg8zmjl1mffkl5yz9ldnwe8wh6i4w22iv8paijm2zdtz9zk',
                fileSchema: 'cz5wtqk2m7dyv0cf0ffdtkkrl1480r9sayzjw1lgk93p5hom8e4n2n7ffamcj6gjze6er92v4nybw0eyzu776p96loi06e7gxyrulid25d9fc03qan2qsok8xxmhhoakgskbglgdzze4f80tf01wkxazcj41iqd82rync2zaczfgmff1rnsbzd06n3hh7s0c2hhf6lxjwfz05nte12ocvabkxhgj7nm42ts0mh42rtr4mtee41tz2gacv3t1qbnvi9dvum0286b184ys2vt5ocfdy8dlxwalstzbbrvxrf07v2tev4vr2w8zv4b4h2xywoveab2rjgb5b3z3fa9wldo55tehg7aye66cjv8qjey5xxsvzneajr707qgg6u0s1xisn123tew8ass4sdym8awnbqll4hwlb2t948tfkhd1156me1s97zyhk45iykqlwuvbz9j2frd5c83vkl49luv8zsct1xibt4vp1txcx7e85zmzsv2oo33yyncrxaesvzinvwajppzpi3k2i40ueh1jyllnw93sijklhdy07eapiihq13ervh8l2xtzqsokq7n00frkinp1e8c3f7k8nu8mbdzt8fpfuz7hzssttywva0cwaz3b9oeyakca4a0077997zgskwtkjbx5giiytbs5mae3c5ym7baa5togptcaudky56qrhno490x4msphsi8i2kj8vzwiokz4sqomt1190uip1hdpwjkavljl1mnsbelr5aneok7nn2e0byaxp5zfn9dqdnadlkv78r0ohjrnlseb7zcvja0g9w6fvyi1pdibvm6ga3ldd2lj8k5hhunhlxk5pw269tpa7oirn9z638k6umtj6ou2g0j40tjjcsfrr51vfy33lgr33hcwds3chk6tgr3qxe7au7iag9you1o107psnu6pqo02me37b4lizj25dnzq2kzcbdnn94855a2g5zuw0pll2spowodu8ltw0s0gecpq4pnjxyru3t7jp4xlj8ie16zzl5fd',
                proxyHost: '2t7k0sxzkzbe9xggteqjh8dmrzzd3fsi6re0f3n5x61cu9uomn7lh3d4w1of',
                proxyPort: 6819072068,
                destination: '5qmvj4jamy3s6fmouehvouenz4d4i4z62ujxxjb4bbe3cui7rvvzi99bcpbgvak4wtfy95v6ptqscxqzp7n1jub33gve5gyw459ar4nxhm63e10c7olmrgxxvno3vrp3tth3ygphbt1wz3myynkujsdqb3l3vomp',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'xmkv207wn6f2dkha08g46rw289oemhlm4dhxfk46v4oy7pf41eepji65ugp49tj0rfgcmxda5a4e0lzdgcxyphmpl3rmfgd893ja3611p7c8n6ukol91xq8dayezkkfxx4z395851zifvxguy973pmdsmq7bh040',
                responsibleUserAccountName: '0r0if7islnnd9ab24xxp',
                lastChangeUserAccount: 'i0e6v37klkxcw6nm52qb',
                lastChangedAt: '2020-07-27 11:53:23',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                tenantCode: 'qx4cyvyt6bqdf8n454ypn3l556dlhnf06h0oh4gklw7l5s7b6l',
                systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                systemName: '6w2r9uu5z2omr3onkvuy',
                party: 'yatdtzcwpxz82wyhe3r2m0iaw7822y2ygevsfv8hqh7udc5mf2xli9gnvmyqig14e87pl8m3jj68vusp9xuenl762xudj3xubi7qyl8kutr5trsofrdb8gkrx9kaxh1zb1r437wx0uch0d43dsn55a0k0j6pwtz5',
                component: 'iewgiou128w3q7w8symyirg8esrduk81fqw29bvklvnxg71vflf2b6dpo6ry7wxuphn7fjs1r6jd9tmkkvifim6h3gvkvh1oazo1ipj7jey3d58kgfq47ba478qa3kmrr0ansi56b25gjew6b412nltbxmpq3847',
                name: 'uj5bd8utqcme35vctmmeiqnu3g6n7tumfj7dgk92xpfwf8bt6w33ca6pw8bm1pdd7p0plkbdp860qj0ygy0jmmoo8bdndttm0ghy9apx3qmt7hbtjdynckzhulv17fdbrig6hx7cv3sov74ceqlag3f4hgyty6c6',
                flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                flowParty: 'kmjppak50hfvnpgosksidg98t3e9mjypatt4d3o172soxy6w4eynrw1shh03ou5z6erq3xemaaywul7m7ibdoupawpvny2b14f5f007v9bt20w5reaa96zg6wxz02wjgh2tqdist94605x42598w9z6iorr98wx2',
                flowComponent: 'zohg0rj7n7uh64upx6381zou8ql3sknuc4fz9w08ool2cmgxx3o9u6mqhyu0qmwt5alvdyljn8wmz3caan2y8lat6m2qff6hgmuyfnopixjmt7acwcoo1as45a75t0pi2bfyq4e9790d82vlqwkqhk35jv0elxoz',
                flowInterfaceName: 'uaewl87gf30wzo1g674svm0vcraso7q3dp681qi5uzymj4foolfbj5pbbrtdvrudiuh4rq416ft7ze2usojgbbwyy75lxz3pas6iupozwxj9ap5sp9tavmh6hf3p4xxq2y79folj65ul715d6e6ysxn0dsfdsva8',
                flowInterfaceNamespace: '9wvk769nqqkudyxq2z33sjstm6zzg81r76hlnstv7w7gi9wzkmqev0i0z5mmws0ebv8gyf79edyfgx9opiqoxlh4mdfl9sq7xhg50atdzjvbe5cf5ra3ptziykwkk6f8nzvf315sy5fobepcgt5e4wyeaz25q89n',
                version: '8l086t6f1suvkwg4egro',
                adapterType: 'rv9vdcqn3hc5t7ztnibrznjfqk7yt20cerr2soxg4juyan7otxaixezgkp7b',
                direction: 'RECEIVER',
                transportProtocol: 'c0lowu25ej103zkhqgm8cj4xyaurq74dh1f1l9iyzv4zzugh7fx9lxnq6e9g',
                messageProtocol: 'p1hz7lhcix3gqqwgo53rfqygy7afk48kvuu6adzlwx1fs2rms7espa2ub8qy',
                adapterEngineName: 'hi0tplan8nn0xbt6enq9tzd0hka945e2yd7jfvq9upz12gcgkk1n0xwh44jkjdqi7hona4rizx8rm5ur1jy6kf4j2uy3j6vwlhcu9sleqvz620f91i6s3zkplhzs6m08x4kmc9pozdqs0mevxmn0d51ec87dsqso',
                url: 'pj58440zdw9w8g4k1jkiuc7kbufp6g3n4lvfkx4nqx766xziybf8xy0udv36es7bmz534spholuzlqma0oov2bdvk6bm2maqr5jjoozq8iumi1aqmlpv7pt0cexqiuwfl5a1xnk2pzyxxadkcc8xulysm3m1fj26mbxt1fqx878zeg6fvecukol7rrvzislfk15sllmo8ppyugl0cib0yo1xhh8gluwmhf70t51zrl7utodjq9es7phcms6bibb07fl69topok84t76ydi2bfk7hme7hqvbwrx9qmdzxkr20ltlh9b0qpgwgyju91c24',
                username: 'qb1bqs6rob70x1ykywj08s6c7z8daftzecwn63riiaudo6657q9ovugza0cc',
                remoteHost: '2063e2w9uttezs97gv5himtyws0linmyfns2x0h8fez75p1rwallk6i6nvtrxk8kfysh8636g3ps8gdiblebkxs9kudcv5plkwptaxbwc02t3zqgu3ftmzl028htne0kp5efyuknaxac82sry4ciavfnc815v9tu',
                remotePort: 1779159211,
                directory: 'zwdv22aox2itwfvwvma2mao6p2j1ls3okfdhxc0l6xwkti3rkk2zp9c5t03fflgi77fw9szp7xyhyc6qnzw90bvj2hfmqcyiraiklcjfboll96afvl0gu0pirq81d757v2jnaii2wo3h51vo07bdybruh9bmuactyi0r8mqcaqv3qcm6l2e8msnn165kevz673ryr8vvff62znuhdn892423jbt1saexiaydg6lems9qilupj7fbi0vc7berzyk0ku5wzgcotpuj7nwyi3vru0u9o0tatykr6i59ushzwqyahmxntvt4h60sphu4sb70ejclmk4vjdhclez2xf5vk9m8vgv9ty2gm2sh3dwfu689indgt4prhm24b8j67lbnjggfwjh3stm6rkrbg4s1ljwz7netlu49jivm1asgj04cuih0233fziz2a5at5a06p0vjl7yp70e3x1hhqelk96dum09lw3huf8byo941bvcjfsp3fn4gblbkqxamg4518vjxtnk2szap6p63yz3cc76x6ihv4exbq7cqyjr3svggs2vnvjndr48kdditsav2hbkfyvm3lewhftx2jsss5lpnpta42m2c2krrpowicqiluwevivpy3lhzzc3czr35n2wdb4jjcl5fqmf9gm1jsfoq3blvbjthvbuwiw28hbvh33fsp25ehe8cvdpz10zulziktrhtli9mfryl36k5h0covswcl2q312l316u6urhpple07soou0ah023c93bgcziyt17o0bh3isa0zkr6746x6ljqm717g9h0zna1l5b8a7um96kth0bl2lzbcixm6sdvpeak0gvgawkbgml8z0w7i1prmg3ffmo8mp08172nmavycjsjqx0fqz01dh38k5533kktouh6vgcppqlu1l3u6cvzjouxyktnpx879ns1kbi3hdwzeyxe8snqielrkufhjarenwwk0ia5xwe78jypwbhh2bs8l9z6exudnm5mggum8gvtofjhhjh4eduv',
                fileSchema: 'a2jvdzmlvlwweojxwhjp1o7ijo1m2i5moysvt9ok2sdpvfzerljv5f3wzfajbv2dg2z9ep1zd1uf7bfck0moz6u944t1ajkmsfygysfreau2fdggqdo9p1ae681qmyr25jghi766n6qas1ledykvdwx8loaqe5anzertqorhv3seuif96ilugkppjq6qax8acpl24hbic1broeywwxhcl16to7q3caaw4oy3mfzbix9dti7y5cyxl4la0jiyvb6pupoanc96kxu2ul6gdweqj3p5o6k7qtfafobu8v7dkrxolrhbtlzxfdjorral6pk5x9ki7myapl2vbat7k0e0hcrgl3xb4vv83qa0usl3g45vg38ulmd5spjum4kp5or1pnv8hsiwiqpp5kk3lhmsngzpyghe6s5hkqjbajoc105idppzn0zbqk15kf1izspfqg8oq2rsdrdrthvn9tufxu51zxqmiyapxuvt780vxr8vwp5r1s3igeu5ncwy7l9carrcgsk8hj7y59t61k22doovon93e5ian7hyu2yhdu28syy28kia81p4dl1jgeu6zq2p59u040srjjfu824idsgxqvhv6ksuognt63nd8k53j8yklomewpp69i2v46939qtozbegqcy57ovomtcig741otol4ejs7mvrrabwfjwk12fruhb0hxdpe08eccongzh2c840pa00h61hinu43z77ns03lph2fap5i1ryla7lk735otj3e8egke9oogiqmkuuwykiyj8udzsez59hp8wz3q1cplxh4kpstijr1fx8r9tisu89g68rzrha63ux8dn1lo1rbdxcfdgif2q5mfc1kuwj8joc15m52jw5bc1cm847fjfxs90yntkhgrj8b7jv57af5jmpcxikcr7gd8rc8lk5ucsmckh4564ov7il1ajtttbk7jy45mdeeiaep5ek3e6oih9gbpet5t4eew4pobcekj24wizypxdmcv000dbu36ay49mfwgsmjox0',
                proxyHost: 'ffhup15h7tmoulr4zoynejmuw9xyefte0tahwbs7rdcmntgfxk0w65s8ddgt',
                proxyPort: 2499426674,
                destination: 'zvubayj0a5v5mzycbpj6g6ihl73fcfkttn2jrsiem8u7k4vy6eislhlxz57crp95p5t8tu641ug2ezi2wrgp5i9j8hgl69uc0q8xfbztcwq9ir5ajrvzsi8syzhneo4qvdge0toha1niaj5flszub6f5n6pkpk0q',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '0kv1ezzww15akye9ti0zh4ih1flmohaghdub39k5obfik81qvqm5jbdyooqs86l3ldxecwvysjuu17pjoe3ydgcj79jwvsdfgokehno3wntei0fi0w4dh0n2t0i2dy7ykwp05uoq8p07iuwfw27wvn1gy550lqgx',
                responsibleUserAccountName: 'ft65foo09gh1g03at0mz',
                lastChangeUserAccount: 'inqxvlfggqegtmqnyeo5',
                lastChangedAt: '2020-07-27 09:52:51',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5b0f85d4-de3b-483e-8d47-5943196ac792'));
    });

    test(`/REST:DELETE bplus-it-sappi/channel/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/channel/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel/5b0f85d4-de3b-483e-8d47-5943196ac792')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateChannel - Got 409 Conflict, item already exist in database`, () => 
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
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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

    test(`/GraphQL bplusItSappiCreateChannel`, () => 
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
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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
                        id: '25348851-b67b-47df-a2e8-3d5f7e3f0f7c',
                        tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                        tenantCode: '07b5nwnuubdd7gjfv5hz3jj6spqw7qhay1tghizcx8mmmdeo94',
                        systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                        systemName: 'e7x78tbzla3koa1qrz4t',
                        party: 'sba77mmrrfpctl91cqfqpznoy09ugom4upcx03xid297wu5qyhcv4yo22kdd9ux03joj6bswebvufcbc509en0ya5s0ywy87hyetfpqsy88vu1rv1u7egn4twafkrgqcgs5q9atil8i8bjpqfkxwm3p4txy9kuyo',
                        component: 'ywiif6zlla6oaypwocb9lxbicjepmhs5pdkert0ehi9yavf0kbofouhl21vwx9b04cwig8cfoknzitmh5740jq5tkts7b5gvkcwvljhkrtovhzu6hc98w7y8g8n862yerva4t9u2twj16nrbhv0gty0ll7nhsjli',
                        name: 'oc69ulmhml55n514o942niyc0quz7nc6h5ukkw0hygst060lg71cfqvdowd8b784l7twmbii9h1jv2x5lvxpggeod7ni0my84aw43og4rkgnzrlyuk1s7vya097i3xrp9icspqunc0uzq4cop0k8drfw5s05ivgu',
                        flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                        flowParty: 'rj051hta02hplxlpuekxtdse5oa1dv10n699emo5g39hle0f7zrsimsyszta5hdqsyt2jk1qvd6fyn81d7n7fbhyjpw4fthh6tlnaq0cba1ggkpxnzgq22huh9u7x2tn8l296sb2214p0b923fi80xqxlmu8de75',
                        flowComponent: 'l4gbhrefjrefnnqsxlsx5occvgwjric6ypwxyu1qzwcqvhe90n3w8g16mlyonbon8wxdyr6wbz3tmhjml8cqza6akass2i2usos2bpq5n0ir422kylw6icr1dj3rolopj9nq4i908ie97o4p9w46uxtvn7e7p5z7',
                        flowInterfaceName: 'kcecsdamlfuawlbx48e9c3w71ulbuceg2nq9os4vcor9oniw9rg7b605999b4sukpmso1eq6khppn2x0jtvjzuijaaeh38qg295giewsqe2gq9hb16nwyew0s2oeyor3vw0qpbshf885gg1nh57rfoyytrexdbhz',
                        flowInterfaceNamespace: 'efuhf5uabzyruuhgv9zyt85cdkyd2177a5a04k89hbe9vvm0treiws0sv5dzlkrly2p0iqutl54kxjbqvr6f6sjjlm49xbsiecbjztcmii6jv29v4ii6g0pjhj4iqh2yirf5oeqzrqsmk29yl3zyapiohlm1iw4b',
                        version: '8umpra1gqkxp3eb1goou',
                        adapterType: '2uqurujl6a0226ev2ptfatatxwzl44wgv4jw7ssb5utw9w82nl9our7bbfen',
                        direction: 'RECEIVER',
                        transportProtocol: '0b43rx0qkren7cxr2pggfs7lljwrmurf5rferrc3k7i3iyn9r25eer6pg62i',
                        messageProtocol: 'm8rk13xlapgzkoxiyb9vocrxhwasmjvair5pj7mld63n2jory9ut62x0bhq8',
                        adapterEngineName: 'filrrxrx254kqtvxtjvkb4ah2moaeeqwaufyu7czcuz6dlcgi4wwswhnp57mwvcedq6qjafia3ot1o6vdo1w0k0982fo3f27nwdej735puqgnqqe9vj37qkid3x6ejl93fejohi94cp67vm7wjy28wokw731nxkp',
                        url: 'j3mdumk1gdo094s6z6pcv6bzxvjy2rtu9mt2unntntnfiwapg64h8u10wb18a7n59a1cndkwdg8dwux2mivoo3pkkp8nokebp72inpgkzhsrn8qa9e62puszsmk887x6dzlinv04kaqug9ch28gz3i0m3chrpciaraullpvxnxhy29l03q7cgnk04xrpjq51u9wn17kuthaxlb3d96fgwjaznsvb9g4obcu6z9c28hh1g2u90tguew8t55o8wmpzx81kd3qbsejmpbv5hxmeou9xjlio0ua34i5yi22wvme8ir9tdr8u5kbcchmx1w3d',
                        username: 'zo8cjiyapmjhuygt8c4q2lndlfxw3ji3fjv8vj7vk7qm5fge477wo0b2byjt',
                        remoteHost: 'tusubenqk80l5e3ezg5ufdcjncmnecv9o1lsldfknwbfulxyve4wnhesu4vfrk3m467dtyuilo7ffj5no133w7f74ljm7tbvmp2w16lp58e80ieo13e2t3x2uqk52gf8ktoeb2xbng4sz9jv5o8yzoi45tmrb2fj',
                        remotePort: 9106482442,
                        directory: '19lefepezggsbg1ptq1xf63h3c129om5u64j114teol3bknzrietdscpey0qh11tec6tavu0u4r912c2tpwvffywxv17t6397r7gllm23j3fznzpmfqgxq3bn5muro78yzg05a2s35hh7iz5v3p61v5ggc7550elng9hcln82fzf7k6r0809bwrff42kxr722uj2ga8b2kexeodkvnurblwc51pj26gv3ylvae8a3uw7tz5mh1yvto87uo6y7j0o75k9ey0zyef5lumvtlpzpgc07t7pojbithoyfsvh4lp8tfdw7rual2blkv80ztmk2pfapnhm33wl3hd4dpmuqvjamp2s9eg2tmszj6ritf0g33z5u38l2wbnf057uewuwfhq40gp6ib09qeg0oow9jst3snto5m29iyxvf5baz1cbx07bh25f3adx6go5v5oyonts7a3xfqmgd598s0z5li1cawzrb313jg6g4jibbxujqvd66coxg2dxm1ds02kcl1g7p3lasbpbwolbwd2ny9gkva66xz1d6ibfau7quhx6gtuu8mlcuoiog0so11o9pl6ay8qwx38ran4mplrvvj2gr5ohczn06yduawizpbn7rawmcbc0olf3c1qgxf8p6tnj5ssgkqcy7b5fmgvhkzbs1ntks3fsovsoblzjl769ehh95jx3mnsgb7dpihwoqimqb8ecsg4v5h5fnr5u9daol2he800loyc2g77dyxa7keuehcr8kxsuo39y9xbal5jphylgqfhq2xh9nt3h50f24h2r9aqg46nxgyhvlyq8jgws2r7yq617ibmy483t3zk07mgud5cerzdfz0e4cexh306vwc26mlspjokrdx728rsr51n1ociimgcguwzv9j305qosa0zysuxlxkd48bgvufbpw0zsy0bevhnvvdfzbfgeffq7x3ms9td9kkmxm41l1rs0pbsafd312995au088zukm9dtqv5iflbcfkk8v5nrj9vxyrbcowo8wbq',
                        fileSchema: 'rc2g2pa728cbsoqk1s6aj3l58jtlb4cipp8mvtro8je1qbr9bxyaorfd0uw08snjmr1ksor8po6kvgmrej08rcsdaiceoc4l20dpy9r1scien5mjs8rtnxxo65jwdhh13ud8vzhrp4338mr34w8iehk572w6j13bocc38qqillq91aqv2jbvu5gyeq0bovhk3d2c5d48roxfzhsu7c3bb7nmeo2odkpi0ypiix5eu3u839w7gg4hl6651lt2r2p1dktbrnigq2z16jmrgmfytb5f9fmxoy4gim8vltel03e7z4vflqc3peelmaa174aspq5qp9httdsx7faidgrfzxkqq6o0zgwv95khfj8du1a87kc60dcu2yhnyi0qwnpry3zuttulunc6bzaqr31r8t1qpn7djrzhnc6fcfgsg359kk863s3i8tmregumdzwd9n12u81aftzmb58ds59j01gcg3474msdwdazuz89x2we6rqmbl0gs3wn16usy66hdtq4ukfdg8ux4fa9f2ks739f9pcqz7o1r4u2ma9qwhcd412wk8ae56mwxd6zpboz0wecahgamygwz175kuoxf0cr8q29gqyv3fdehppyi047i3klt9t5mmru60svpznsqwxs9aixj6f8gdmiwjvbnnv21b58hgte9vxmwd8i1x2x5dgufseydpkoogk9k4m36zcqnwm6damxhjdd54t5kfeox4qi8bhekm44nyid9tb8oqot6svu266r5cq1380k0dsd0yqomd1ol1wvlg3vxjpsotgrp4drx7tha5a8figbp4l5xeqlhfsml71h0lzq0e7g80hqfzaq7uu3lcr7fvi73yk7x28rc9kj27j1mc5mv8jlxn1vrht3fbfxb1zfwg9urahtcmmmh6nghrjdxcjgcihuo9vhh6nudium9m9kn00gpfqu1pqxd6c088vvh6jna748prt5arkqj9w43iipqmrujqm7a8cyn7ild970c3whigc94dubavpu2f55',
                        proxyHost: 'tf7ak7z6qmg85225828d1y2ajq2sfs80txg0x04wv7yzr27q7jwdgji2ciks',
                        proxyPort: 1703449975,
                        destination: '6rv1b0v0aedgt9dtdkijstiumacjxig2xax73umcohsxnbnjkr86iyumtsoqlkmovssp4gcrajlsq6pnuh7tmzhil74w5fbmf4rc1lvjaqy6upqf2kpv8hejgujcxf19shysw99yh10vuw179tiahisomfao2ftg',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: '9m6zvvgep3rytb1vv60n4pu2ooir7vzu0utowv2ojas30nc72pwy98k0116nttwelkszp2kj6de5yoxr52dvsbkocaq4ugmri5tck0idoaxh6e9c4eq9dmbleg5smmiu5jqcqkkckl0xb0bicatac7qec5c1r9p2',
                        responsibleUserAccountName: 'beiw96jgk9ilqi7km7bs',
                        lastChangeUserAccount: 'qw5pa0cp582qfaqjjf69',
                        lastChangedAt: '2020-07-27 19:53:46',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannel).toHaveProperty('id', '25348851-b67b-47df-a2e8-3d5f7e3f0f7c');
            });
    });

    test(`/GraphQL bplusItSappiPaginateChannels`, () => 
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

    test(`/GraphQL bplusItSappiFindChannel - Got 404 Not Found`, () => 
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
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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

    test(`/GraphQL bplusItSappiFindChannel`, () => 
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
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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
                            value   : '5b0f85d4-de3b-483e-8d47-5943196ac792'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannel.id).toStrictEqual('5b0f85d4-de3b-483e-8d47-5943196ac792');
            });
    });

    test(`/GraphQL bplusItSappiFindChannelById - Got 404 Not Found`, () => 
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
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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

    test(`/GraphQL bplusItSappiFindChannelById`, () => 
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
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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
                    id: '5b0f85d4-de3b-483e-8d47-5943196ac792'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelById.id).toStrictEqual('5b0f85d4-de3b-483e-8d47-5943196ac792');
            });
    });

    test(`/GraphQL bplusItSappiGetChannels`, () => 
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
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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

    test(`/GraphQL bplusItSappiUpdateChannel - Got 404 Not Found`, () => 
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
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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
                        
                        id: 'e7019781-7446-42cd-8691-cfd5fa317d0c',
                        tenantId: '97e90d16-98af-44fb-9450-6f19c6f1b436',
                        tenantCode: 'j7so47kna2lm4ejxw91jgiodu6ngka99jq35eowan0007yzx68',
                        systemId: '2d91f922-b255-468e-86da-9a38d8dae777',
                        systemName: 'fr0srbav2sb570bn7z8o',
                        party: 'mpga7og0zxs820tdsqrojjrpdjtg9ozmg1yqo2ex9rmn0jcdql8m74hfgcmz8kugt66c2o40iltgsm428ae9r2cbtdg4xeczvxo00ejxvds3vk056d8436buy4sb6d96t0uulmbzdqjbgk3qwis3w8r4wl7kg1o9',
                        component: 'ft93i8b8hzr8s8xkfvt9rc40c3kmgzdxifw9mfmciw32ohor5nc1p2rmrxqp8qyt7gzr1bejzkqytmpmf94ijalix3s54twa2hqsrxqe5jevevpv1y3ho2glvhcen1y4koes73n52pmdrtxcvuvaydnl7h38lzsv',
                        name: 'jfoc15jk2njlnv4l12147h0hy6akvyea9rewo9vsm0hgshp7pnybbcbicw5qba0mmo8a0k6q86hcjq6mozq86sho9p0mfd5lb3t7oi67kwe72kx2567dyo5mn7g9m1q99kxwlz3sctrewtps3x9abqracem07ef2',
                        flowId: '5f565ef7-bad4-4b98-a376-8cc8aa563761',
                        flowParty: 'mzo9w2s2m1tmlgbns31jatmlgpxe7ru8y9zu6n6b1nuow9oxkbgqq3d2tsiarb67i7txzxwi42x61o3lb6ubdh7m0frhk9hmmwbwqubqcavsiyyxpx77y922kjd4tsmayxzmwg105bth854wfxh8eugr7kx9ntii',
                        flowComponent: 'lcii8qzxjdducocvt2qw952z661un7l9qqa2mwyapz6f24l8mxjwbw2tlhafe5pqohm6p44nqgrsxbcfloe9nt2xeltj0lv8v9d6gnbalkj2sg54v0e9fy835isdcvg1tuf1xbv86x6kmmlxyrk2zjnijnci8j2b',
                        flowInterfaceName: 'i3yine79iv7l01wyf3zo1x304qadayulwyfkxx2d7gukzngj91hjlw4871x70g1fs3y6xihf9grs3hnlmktcrwhkl116bvwtg6azln2kr8czor2417m2vxzwzsx99sywv25oqk5q8dx18ntj88u2gjupumhkq3oh',
                        flowInterfaceNamespace: '5urk3ja3lr6zxjog7lr6ovcilsrort5oyb8oo9ewr8i2oku60f15as4x0avqgwmero82cb3e6fe7geu70te0babcb8am50fwfr7ujuh3cp6na9ai56cadc7l62ou21ccxr810d2wgyhjdivqxsz19dbnogofyg6x',
                        version: '3ehapojw53rhpraz0q5v',
                        adapterType: 'mr3yp7wawynbke263k127l172f3keo7e14b0k9xhwoqzmlppd87n2oa4ddhm',
                        direction: 'SENDER',
                        transportProtocol: '3lihpzb931phz7i8eby1j2h3i1wdi5safcee5pv9rzetesjhsjk7ggfw0s4q',
                        messageProtocol: 'eup0rgyf75osmj35u8oh5ogis0uxf9owv453gf3ld0bvd45nr54xjv4oppkp',
                        adapterEngineName: 'cx1z8djfyjett8va9t4boobw5qnr02mpbi64b62olslsl09jbqrqni2vlkjwaompajyudxzej28lre7b021sczxan6h3tiuo1q4gyke3c37wtp2ben1a65xyowe0q6h7rttutqketsf36lxda2kirw6siwy1hrdb',
                        url: 'zpk0bti66gj9qezfev7c20s4eic5ljehx1bui20azqo52dob2kyh7cq70pc0gv7vlsk7kc8wh7c32z9ijsvp3rusmp1rmfine17smbv4kwfqcibc2a90yw3m5mkpp55sj9h979gk2a5lem756zy7e043cal1wy75hxtshaqzr1muojymn2krkr1y36uvmjmlle0sm7m7rfmsjnq7lxj8047ndpl4mu30j2oxsdklexj9ebi88m765n21wpgt0bm8dv8a6w545qqkz6y0zds4uhhoyq70v03vhwjxwpe0p3htiy7cuh11ouzlwaxan29k',
                        username: 'oo377ucti8qvdqos81rijo6jfz4tnbexywuk1e37a2y8mx8iylboitnhzo5a',
                        remoteHost: '8chzwynnz5xhcfydtsp3fnje5mkkx7948gix7m13i1u8bon3gx2hqr9tgymy7mjb2urp63wuhesndg797vnf8e3tetuzil6gn5iuwnry3f64tu0t16cyj1c9llr0f85tuc9gbsd081moe2m088l5hjuqw7xv7f86',
                        remotePort: 2779852973,
                        directory: 'uja8gfl28nuvm73k9w4jske5qfihvt12b3dpuxoz53mgfiyxu2qbs8dmj4c64q3r5fri6mt4y0a8n8rkrc3xt0dougumfv1rqruyc3hky8gzddoz8k6q16uzbeyd2taij32hq1mqruuujv2wdd1edc0pppscwthz0hfysxdfwpf8dmcdqq1osqxsc9vpub1ixpmjhirmafc2myy4xo579onqub92brzefwgighgfdtrpehpm16e4gr7435deioezfr40b77853vpq3o9n2tejcusz89zz3mkgeo75sz1qce0px2lidibwmlrn59zcf41iu9ejohfnzhuevafo5pls0tejrplvpx1gz8ynori6xpw3gs8d0r2eqztgcvkls4k06ho83nwmusz7w410wua5i2e6lkrnwixrw3eodujlur1hmbn8hicfabm66ofn2ioe683gt4q18fe27aun2q7z5nws2brj30qxvgyo177lqfytv1t9jr3q79m6do5itkues84q4lcaesjsxb79ojfh5s1xbvunza7f06ed7vp3uyk9d92mrzk2qcobc4jtowdpbcwcdzxpuq6bv2ke6jewvpcqlffpdv9v7ixmfm4foqhhustij1ubqbeodg475ai9xmoq5p0jdmig3devv5jd84xnen4cvg4z469w24sspk3gd3zn5r7qg9lm9k4gr60gscdm4iye17766qp651ghpq2hm2x8coeuax4m1z5ogcjf639451tpzbkz16vpok6kweca74k9qhe0grt1yepwvgxgtduis35mco52fmkpjnjgd3x0is2t4cw1ocjgsdoc5uie7409mhjrqt7yy9qk0m4rmt5dukvo7h7nxyofofbcrgwbzmpjlmtqgo2xdpr7b0iwlrqbz4bt6i715r1cvc8hupxc5zwp6vzzjt0nm14ruah9ham0worv0rwplgs1f1j5izqoiobdzuvkbjwp4dx6qf6hpwro2vrksvqc5nzh8sskbcmr14v6g5fqab8',
                        fileSchema: 'xey1427j86pnm7usthr1kyne4oruouoxzkcf5mvh9x7s4psx5hlbqakt363asokmnz9h9mq2pesgbfodzge7y3y7b7i7c5ff11irr3v2fzl9tpxif5uo3xxfhmjdi9cid23a9vlzda992eornq09fnaysc0q19hb5rnl9462op88khxp8arpb8jmodnojxz3tzoi35wa0rym6stg58tk7e0bmsy8sblelldrc09jxkh0mfpccd4z2p26zzczvedsznscxrybof89nsr39rn51waskfmglg6n9w720qkdwtr3aghpxsy9vof5h9ytt832ulohqvrbv4mw3nwuok7io7yfke1m8pwzf0g5hz53xhy7q9mh2lfrzby2wmecjk1hxdytfx8b204nhw0mu2moim8nabo4f9o09ddy7f8s4ggazs7t0cwtoakpvk5bsjfeaydq4tz38rmi02wgb862w9j82s3vyvn5ne2dcc8bqs2f0d65r8yyvr2n6nfvhugkeb9x0bk5xxd2qhgykyxl5eoi7hu9voyevy19nfauln0xm1vaubtkk8c1umzeziwqc15s1b1ijbf3240i1ub23sd76puypxshm9u31hc49no4ew8bwqgc26qim19nm15kkw87ywa9t6x929hauw842mzt8yrhfky4hatxaouni0o1anuj649tag7p5nbfv6j8y6jv2cn4oginyu0v32eil2prz28j8bk9mci5vjx34xumfnv49azvjkcaxoyf3ipjdpehzwzl8tymi6hscc33at6dvnni7zyr7tk8so3imq8l0c7tlst3b3y1vcf1svv27wrv4jhn3ssdqev9f3qlsvgnmo3ts52imznu6cr3xg49khwseei4isb90sns41w5ginvzdp65vmoe4fokqtgbekjrrkq5lemkj3qoc9i77ux2wo3le3m0b4rdtpxrrrb51dwrsc6qbbl0np7arkj6lvt9afu9pp5z9lc5yhcoinykxtiyrzrdgci6aon03dz',
                        proxyHost: 'fwtd4jcf5loi4dovck3hsa8xcpu7t4zw96xd0zvlhjw4fttfhog2fxx6wgt7',
                        proxyPort: 3901735043,
                        destination: 'q2j9vtwp1ibtbnvnzb83wefqwor7turmq326ylr9qiiu8r57al3qe7hmj4l0s5psuodugpodje2ac9a0rc54wr2o0zv9y7tg2njwxiqakikjrrfil9kaiha2b1298xb1es7l080lyilyenmcydpts3gcdlsan05d',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: 'pcm8htobey5u5ud2wkmiqxyvfkzawj2c8ptbnzfxcjrduzcgpffl5z1b55u8uhuerrqu8831ugbb8ctp9hf1bimwxniil3b4bjhmvypz2jdr8icbrubmlx74auztl74j6slgrqjvy17l8f0m9sukppotgd8m8ath',
                        responsibleUserAccountName: '9azewvlxqlmhxsaz6oib',
                        lastChangeUserAccount: 'resd6q1an4tz9kmussiu',
                        lastChangedAt: '2020-07-27 12:46:53',
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

    test(`/GraphQL bplusItSappiUpdateChannel`, () => 
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
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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
                        
                        id: '5b0f85d4-de3b-483e-8d47-5943196ac792',
                        tenantId: '0ba7dc83-44bc-4eaa-8df7-16acda49c833',
                        tenantCode: '4ietjyc3hme1ke8952wy5ow8g1md2g8cixukh3tzcozwhp349d',
                        systemId: 'd84fcfdd-607d-4396-81a1-7d832b23a85c',
                        systemName: '6m02y3qah4lgs2rg9hal',
                        party: 'wyjk5deflxlgjds3cmps3yzhsils66683vbckf7vgpx7wp9a0y2ofwbdqu6uf7iuqtufg2pb7l28zbatejjp8s1hen3nhoztnwdxq7tk2i2kid8i4tdqzfzng51dssxiddp8b4vt5yo4amc8qagqf9skgn9zrcvt',
                        component: '8ul17dk4oz92wozap53ka9iknpjjtlsetkotgkdqi3j08ewy5p3cbf6ocgzc3xye55yzozddn5wen94zszp4ntz06iawk1otp6gjkocomqtav9lfavljkw6tys7iuurv5xvkp93txet14iry0m4co96s934wwox1',
                        name: 'mlbky6o1zcwkjb3f7nw2vlu5flr8qthbendb9uv1nepao6gpunycb72qj03rps87t4n5k6hbdb3qya2iutmeht0tzgw4xsxj5pe7mrcjmk93hmc5ou03f6ap9ne704ofjx97pdolm1y23i4d8xgye4tet3yuzgc5',
                        flowId: '9fc4c1ef-349c-4ff4-a507-4caff97516ae',
                        flowParty: 'n5trwx8p6h5fg2e1op0knmln3j0varnkn50wvgxx2yolaz696z3yapltd9htx6l0quglauydbku9szkeza2eq9eun28uopnmectqkgz9mv0t72a5bncnv9lhbhhxf4d5p6ofufzhjedgdrp3nnk8njw3qsjghy0y',
                        flowComponent: 'oup33qbz9pmcemxwy4e9emqtl8i8h68lck3csr81um8r7rn0u4qns95norq7nplys7uk3ofe9vmnjd2k86tzga2kn6s9jxygnfhfguu370rgo3yvjpejy2tfpvx8ua57zh05x19fsz33fhjuugecvjtutys5kesm',
                        flowInterfaceName: 'sdkzza31sswob6p7joh7yq1xue7o9ad9csotgsbx65gzis10zc7tkswval8e9bl2sxcuinadpaqd37f1307gqjo4zsl4coqnqhtksorefsnked3ud492ooi5o7pk9vyqn39x7vz1l1opkt7i7yiyjhv3l4zl4ffl',
                        flowInterfaceNamespace: 'sbuoy2azijtmbbmr7jb431iyvxl4epmr94ycg08gwtv2xngiy4yev7x77un1mr1ev0mfyt02ke1xpytx0yeksa5rewo62txct93z5l3armf1j4o99o22cktnifafmdz3ft5htwwk9nya1jf95i7xyy7bg0pck8yb',
                        version: 'pzcadr5xg2fek0kr6xiv',
                        adapterType: 'pmnlgcymjevps9d05t3n78clgndnd4qvwfwe2kwvwb25nwartwnsskdn6lh8',
                        direction: 'SENDER',
                        transportProtocol: 'ki3aq8cnf5ppac2d37hvwb17cm7cqnmldk52g2dn9l2plu4uv83x219f8rb6',
                        messageProtocol: 'er5rh8du6p5hyzk8qyniobnt9xc8tidm2dv6z2vk5i6m31ug902elw7ec3tb',
                        adapterEngineName: 'zqvp9z4412zpztbo9iyzn78qkeb2othjrav5rn2t463ahtp10q95s3ng0vel38vhbuc2vi6fwh1sb8i84rxbpfejszadnqwme19twezcvzdy639mxc7wuhd880t2b7zw8atxojsqdi6ajbbjfu6gq95rkce81vi7',
                        url: 'b2s40371d9fxdpozrjhl3tdk88yqwwvtkun2zivyhmp6hevm2y01tyd65s8qcddgdhn6hqx51vnxlw9krtymol926dioctfr44p1zgh4ze7rzupwb9biju2byfkylg619xe7c94ak0vowdd2nrykgal49ye3zy8p4zisrzrddrvu16br34vr8ggimtposs1xd5ahkz2ijbfeyw4k79pg531agbzl8ui0g97mf194ggbu3664yweid2qv6fbqk4g2hd3bs6g4a5hn3b9mit7cys98jnyckz6grxbwhk5gv5md608b627mrt9igl6pszsv',
                        username: 'dgr98ksrgcuz63s1yfmhnevf9vauqc2q5nhngeh52k6i3a3enfebxqd4arcn',
                        remoteHost: 'od0jbos35yw5slrenx482vkuxwnwvwdtdg2w5hxu9g6wpo89ry82z4ttw0e01yx0a30jv0w4aen7g6efji1nwhe6mboz8pqtqt2ab81kpqqineoofja73gp6ha6s1cmpodr23u87nn3vofegp251uq7ah5ljodmj',
                        remotePort: 3142972986,
                        directory: 'qt7vp91z2hzcefz59qk1b5m2mq0wqntiv3u6copplksw35t3dm5ynxofxi75tynyatn64focfrwwuf3g96exugb4zo63tb4w1n7w1ts9ejaotwcm6mvbjnbyc9jcpyam4bhkac2iejgvmkg40ahhdlnchxgzek7whsxmvb6h486fjrc16ocal1yg74e52j3hgcahem2z5oe4u2fk6fifafza3uzun70wojuv9rmzl24gw63qrp5tj5jhss1mxfxd8f344olw4ofpnhbg2k1epfgb806e4fpnn9ipvqvhw4u33p9tn9ad2r8amplsbjgphbh163lvkm4rsaey2eeonj3ksni62u51v68xw9t7l3dititdqifq15tmtvv763bwicpb48q4qxmjypsfpktbz44orgzfse4t2u9gykyzn7o8mm9ej3glh2km78h53n3xqhkxy3qc7943w5bcirw0y0h4ysc9sgw0051q297k8q9oc1dcnmldvwon0srydawt81qnek75d7svz48e95ekq8il8txdrkos0a4clolb3wxu92inzpvx84f6qd72fjgi5n5iivll3hxa4wy4cf8p7g4k6tqo9itsj5cdav48t9gk3a37lw1465ywpmkjuj1tflck5sxzpebnm40nrn968tevfhbrn1trusge7957r0ubpvh6iev2phuvg5g4meonz3dr6unc1qici7nxaiusqygmp1dbu3g41kqhlficbro7i2hgrbkr2id20qzovpql63w1gmhv0diyd2v081jza2h7qpf5fnrxkh8o69lxelsvp80puvoh8dyhs8bmzczmkp1l4uowwk2kwrffr6cipf3pmut9ok0zq0n0ijswjhaows0othp5sko4rsgx9utfr0glca0x2bygzxv9he6pu684md198wxum6yrh4adk4fhmlwascauynoxbw27fizakgiz8mn5r1dwk4bskmevqva407r2v7n10eprshg8wjkb3og6rdxlxs7k3foqji8m',
                        fileSchema: 'j6le60vrf3jw926okhtvmrp1uqlciccsi5wxya2i049is908n9zi7rmjh2afv82l6upo8xq0rpq5vene4h1aru4f0u1a19mbmpphxucm5tdfms3fqzk14t0ez5f6oji5tme5f8ae9dc7z968cxaq8xr5knowq4udm6crmux1x9molw6grj4li4h307eta66dtus6vbdysghvvzv4jiyc6zsp3n0kikq7qf9hbkvvcc64xtzedyqpu14ulzbnvqnplbybayemqf66ukya9nzhj8x0v58pmyczr1bkcpd0lsfx8lmvqtq685fkwx12m87m17u38hmswt0obq1v5rzp88iw4djo6q93zg9lcjlsflikzbuqn04z4lz73i5dk6p8zga9xfy15r4kdg30nn8u8mpc7ldkqtbzl9soysax2c7zms2xtnrnc8ybrbs8e0g44t1ytkibe5seom65wutocc8r84nbthhry9vulgcw6b9z8skdzdd6tx0dzju8dahu1n58qsxikmufvszcrf031tnll7jdrho9b16undqqilirziw1aa97e3ra8lhh0kuqcflwf6yn3npkpwh194yhyv73usnr4nnoxhat5wjrfsg063g7mfeug876k1927k3x00kxvp2t1z3liqnxrlgd9ukr0otwoj88bez3a76aqisx84vqx22wkyvl4bn1yl8i8u1qg9nobvbxbadn7d4zqizdqaualx6etc0o48ip33qzl3kfdn9hj2u65kswog8qdapdsclfjqzb1uvwh59jg44t01y9r5i7aph4yz5403zpzwpo8uwb0twrhuhd5qq3a41coahs1l4cozb3o5em5fh0j9u5w6h3z4qtu6rcbk94u9tbenzs5nh8g0ipa9uyx8wvntqpozm8gx145pq1l48l4yyz0eyoqx5o98zgl202jo2icgf2gwjzgaq7ogzh20npx8bo7zkzjalyytjzebkzlw66zh1hulmwir6x098ww7e5wuu4u51i9deoubzj',
                        proxyHost: 'luo3jxqzawl47tilztdqbxie5ubriqsq2l9vyzfuhty5p0ituxajdeoqrb1m',
                        proxyPort: 3741770884,
                        destination: 'nzg1ceeu1rquuhbdzoidmbxl5mta27y8jlg0jp4cmxfmpoof9736fa7dzd3cvx9v4pphk7iad3sqydd3pnodwtq9yi2xtt0jofnd5kvtqeb9yyxcch2ryvr1tembh6ki4qdrintt05o5ate4ep8t4hp73m6y8u4a',
                        adapterStatus: 'ACTIVE',
                        softwareComponentName: '7smfbctb7xk2w73e20gq174aerdpekn47qk5w71ssdv53kr4nkqtrx3fazne7qf9lydnfpkhqld8i4g5857qa6usimuh7oktdjvsoooffj0nc7yqm6dylaq1fxt61v7vt3nstluh6sxa1d6yy949latvgh2xz3ic',
                        responsibleUserAccountName: 'at8xohs2irur6dhae1qg',
                        lastChangeUserAccount: 'e2hiyhje8w20mw9sb065',
                        lastChangedAt: '2020-07-27 15:58:11',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannel.id).toStrictEqual('5b0f85d4-de3b-483e-8d47-5943196ac792');
            });
    });

    test(`/GraphQL bplusItSappiDeleteChannelById - Got 404 Not Found`, () => 
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
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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

    test(`/GraphQL bplusItSappiDeleteChannelById`, () => 
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
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
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
                    id: '5b0f85d4-de3b-483e-8d47-5943196ac792'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelById.id).toStrictEqual('5b0f85d4-de3b-483e-8d47-5943196ac792');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});