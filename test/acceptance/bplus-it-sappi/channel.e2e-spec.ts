import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IChannelRepository } from '@hades/bplus-it-sappi/channel/domain/channel.repository';
import { MockChannelRepository } from '@hades/bplus-it-sappi/channel/infrastructure/mock/mock-channel.repository';
import { AdminModule } from './../../../src/apps/admin/admin.module';
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
                    AdminModule,
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
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: 'sg4kcvpb9j4r3w2z8xetauvq1go4ea2ad1cgzhv8iuu8tytt1zea66qiou23wl4vnjbk27v7jfi54dfj4tvsyrirs9kaivz75qrszqkf4kgio0p2cv1nur5njqej9nzq80yr4b1875di92iu0o4z9i16x76sxbm8',
                component: 'r98nhquwik903e7hnafnbrw5npxxvbsmtljvln25nfg6m2lu591vn5qomxi962f5l5dy6ldgk5tqjr64ruytyvl4kevxanllrixyant4pngoyw1qhwm8df6kgq6dphhq60qdqkx2fszkjh8h0vjxhc3ftxnbvh4s',
                name: 'z587nltosgw3eblf7fnvvn4ojhxp6f1pkxpg9pe9e0jnxr1qyqabpimvnelgulmpjdjwn8morcvy8b4budlqf49ealg9mhnlwhjbf6nextm2qeks0y7c15ageo9g8h2ivoidn24zgmfbf3tlzmpnnbe3mmex5cp6',
                flowParty: 'ajgd8hnkpeztnbkpx6d8rjxu8entyagogjap0bwt3f30bblj9ixc32q15wgi8vt57fb46pptyn4ahjooea89jyd3lhwulq7b19007w3qiu79iaj49lcnbesvcqxp5o4icmluw5e8o2v1yuel1fc9s4gztgbtsvq6',
                flowComponent: 'phpydsdpjq569ipohdnskogjsflcjnleb72ub83dtxx35natt3qx2gl2tq0cs0vq1ed1ha6dze1g1vsxxo75f9rvycl3m7dgu47k1l81li8cizdulgrvixr4xit56uyydpizp7ueipvhgpnphwos8nb7x4cwz3mb',
                flowInterfaceName: 'jt68nnr2tn52tt75sc2lmfqsg4nrryst6u6f9ejug0ousimvh98cpg6sj92llwigz525mw8cc4fk8j9ljc5rfp737oj971k1mgsyy17ds0dzt1joq7k1g014aqeklhhootxnq6vveadxiu0ne16noqemxqr0hxzr',
                flowInterfaceNamespace: '2umpzdlmhpxgnnebu1u1szxx4sypr4bve7aq1tugh70nxxrhayny8zsknujh0bkq0ndyo4grtf31owpb71tfwfd97y0li59zrt1emx8ofebtgxn5ovff0tbka1hxx3c7630wdbv9b0hy7pry3uwvr7h09pi7tu0x',
                adapterType: '1lmwbeeitmj2sthc15pzyn2knibbdfudrpap4xv5lajntba3wqpaic3lnx87',
                direction: 'RECEIVER',
                transportProtocol: 'c50kfyq5wocnxsdw1k2byxkrtg4ts4wrresui6f0u9bgjw95gz1adw5ich1z',
                messageProtocol: 'r9qi69xl0jeqw8s7uvyll1wcptqpgnd79bbeync969euypas8lyn62ljtx60',
                adapterEngineName: 'r9xs1zv1dow3ufg27h8kjbybk0ku83hmzh6t80km2r6xxhfegse10ehmtr9qsu66ow3kpskcwe2c8cseps7vbfybek3nlr42fsg7js4bvx0654itghtc0an2t5fz97gx7wkyo22xjyk8ldibvsphldr762ss7992',
                url: 'ix9r55buvzlib260igs5pkw820miry8m3tz9pc2geuksqhe27kunyjessdfxjeow0dl6yii6zih6p5h9phnb0zpvjqkypcobt3no1ohjat0jq7lhhotzbvowaqdjrl6ks726q2r6j8tu6ee9gdvbi033xbqxmaqp6xoxi0bphxga9nuob3vwu26ebkttejw8ch2gofl0553dimbiibv7svvan6sgghvbl9nldvlgci8jo6gd4lh9jmuqcy4kir9p4o3nenhca7u9raicv2kjewugr5mimn1lnadh6emg1haef63avhn4qulmi8mgdggy',
                username: 'j8ezdrjdv7vk3i3nzfapvrriddjkgtte4luixizccx2bb6qnff6gmk79sabq',
                remoteHost: 'mh8s9awq7idk2hpiznsqpaocpx7x4j0t3zmlwku02i9a8r97qt14ao7vwscso7xk3i8zl7wjlw3u3fuhmwh0hcd75ded3lcxd6qt9kwkc58jajia25vu8booc5jq68ua4mvjuzokyvlqfp8892lbz9106l7eojmw',
                remotePort: 7204679436,
                directory: 'ahs4i9iwy0uyk79vwtx9hg7pladyd21omc7rs4cpua0g5jh259u9zwcrupb2h2lje7hee5cw5aywb2ls5i8s9vzxe7o4hsqr3uzp8e44s9727kk7eroqzd6ebj52ygz3727wgvf4p3e4uhl3q2p5fsxav8n0vjvy35400bseyrd7t229t1awekli6xen8sxoocrdwoncwhns6dfv2e4cjidz2jnxpjvrfxu5fojeh14agddz7lwxargx2gx7gpthw4fcv8lq4qmc7qknc3k58q3pci83uupnbqpi0ki1wij04vbw0tl0r75hds12znh9wbyz1rw9fjhohm9z2f7td9etllliyoxpob8ewpft6apts3ekt04amlqi5yffjx12q2ijy9gtn49enogu8svj4duqgr7kbol37me8v9awbtp67q6jvn7mia2wsufsunbi9gmoawzgp2jfktab29dkn3jt1462rzjtlntxu91l572wzy3qibxtof4cif256ckjqdiwxh82o7kkhefrdfqsu3goe9sh2m78pz8mxg2jjcbfkk2jsjbkpnkqmvrdok883ezxr269fcnqq8pdfiapt8ze62ke8crugsnjn3hm98gwqmsbgfhizfkm6w5xegv4ylggh136md08kajyq1oot6woq5zmx1280k1yjf1pfr4fbnko52y4fxep3l7mrel6vdjya7zv3avthn7voquw0tnt3ymd44ao2qujf0s33tfurpyjz20qfdfg4n95kzwmsievtodkq2vwwauih8xefkfb1usgn7q6fyte1a9l6vb0b1r3mk0quukyl5xl9y5dhxws1sfk2h13q05zx37ptc52x0pm97320xtzt3fmbz5ieaogzjyfhdkl9vyo8jzaw9q4uhded17l916s9p028etcei6jhf80c3jhpdpj233fa5024l65l6dfwx55041hiv62xje5n3fonzyiaiileqjkdfak8zww8030lif5utbmf8dqq1lk8blpvx9zht83',
                fileSchema: 'xgsipfcbkb31kv8o7g3c1xsql1z5n8i53lb6057f1gsuiu2zj79mr3fl4s914mc4ht0ngvmwbbu5qcm2zsj53xi2kfd714lckl18dt3quusmuo96v2qz0xsp5debhk94g39rsq6aajpgdyfzymk3ak61gp0g58ir8jcv57gziaokznuyycl1c3lshbfkh5j5jwqij022oa3auryd8j6cld0eyv05010h8cai58u7cg841dci3e8n3kpbz0yivqee7icfkjm79bizcq24fvmqum2gidf5amq0ah3nadovzc2sc0va6zxl0oa1epe14m2t674ci9y308tik28qpyt3nbnxwomm9z0nfgfbgfjji9e2aze8yg9va79v2o2e7a3ki1e5stn68tojpzqya7ny0psgv94f8arbg2hiia4lii33xj0f6l0s1u2xre7wadcphvz7i6chei0pw9kkby7s3n5ljp9o25gcys48hghl1b8h15dpmhqokhedhmkolyxjfimgkqz6okjgafvpmuj9eivuskty9awv66l890mypag9td7n1g7xo9wz0v95ea5u0le0zc4rczgjlalrcm3n31mk3snxzxhulrxqi6m3ls0kyiliu60a1vi2uwqsre9bhf8ldbzd5tm0qkyq2tz11a7xfp86flizlh4gfr0r0pw2yskndps4sa5k4z2hu83pgjduxahzcg1t9ho1l0ycabyn297ntkh62tr39wcipq7bmkgkd5mg3vc3684epsribv0mnp6jps05h1s5rem8122wsw9dvcqam4vzqvit4lafbh8e2tkqmiryckqgkklr2zwf3nqf0tlcmanvc56npnx1a4xokle49m3nhnshq76v9prr3w8z5wve8n6tyieed6ax3mdmablonuc7gyc6uucbw5w7wl496uqfczyrxc8527ku82nql04ew4glnnx3thu55bxdz3exk4b7g90a8g6inyv6wtzg3arsh3z4urtydng464kowk6q6yhrk6v7',
                proxyHost: 'a1qev9hrv30kpuhpjhg7qjgepqhuqv4cpbsern6zdytii2ddufo0q577mtkg',
                proxyPort: 8198008307,
                destination: 'txyyfmqejsthzl1irad2lhh6eu4ez9i8gtlxwzb9ym9zvuio52gy9eyaqzhfolszbhsivk0djb5h93ts28gw8vduo1aeq1gubz01kxpr3pp7pcimz4nle08sqijqyas8nkjd0g0fnmvhts3jgasfblldh7gqrpfl',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'vn3e56za6dgvqdhltvn41mnzjf6n9ly3v9p0hcug1t7nbd9r5xryqvwn1p5ik3mbh3kau9nvpc2b3j7q24xwt438n4cuq1pjvllkbnqsz91l6zltstu0j7ngpezde05cju3prypdjw2mzdp26gnh49936c8dxegw',
                responsibleUserAccountName: '1kmj4uf3pc39eryne3q4',
                lastChangeUserAccount: 'nqqevzz1il49a8khvjto',
                lastChangedAt: '2020-07-07 12:49:41',
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
                
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: 'yu39ix1666391bv8gvualteoxcq6i8rhgn56jc1tsnf6o7yfx4v8y2c3f7tf00p8aime2bg54y2mrt7bz9pgj9viocwdt9ksb6g22hk14eiual3e046n790iqflrdiczsoc80vlhl6f1w2itii2kjvdi43vq4dvx',
                component: '8k6rdb9qlq6837z1ut8h0mpjr83l0tbfsy4vv6i7popd9gccps4znhl5yt3pgxjleu3iifhjbughb84r6mdh6ywb50dw0k5qfd1xtudtr3omzsfz0tocdjt82g9cg1uhu9upk20rpbds71ryq7gcvpc5g7y216ue',
                name: '73w30tpr59zfenh23xps775ofewh9nzus2dqrhui1pxjt6ljc80f9zf0perl4d0721e038u0m34owfs1o914l3odwpnml75067706wwid6i00xfuled00vp1exs96kbumvrdd4pis2wg3511gmre0bend1dzqh7f',
                flowParty: '1cm9f9vqizd03zinb9ae77wjpdh93f4925a769nexlko2i4n7jwotkrmkmunuay4vcx94qq0hvl1mls84zvpcqda0wsvo9mm4701n7p0pxpflihn2ytojxuc7nduw2z593juapmdvx7kimg6ruzd7hktzhqnetbh',
                flowComponent: 'tzou0t898zhi349e3yuezlc0ybbq2ebuptthk19hlvg0fshzfxasfu56kj8v1e0s46kayhizfn25nmw91drrj2109irdfnwmy7kruiwrvllem35e5v9tof7lhiot5drko69rx4hogwp17ui1lgdr9nekru9l6hvt',
                flowInterfaceName: 'agpg1py985ez66k14udwqskk0rzywf2nz0cz8pqovhd6k3gzjs3qdo7kgqjlupvgnaagcnk2uvexmt2g3b0hav4fd84ecdxpxu0xpbgv10ambhsd4m4yfhp5dl90alfxkmr7x2m5qjnnqb0y0rs8655auw6wbewe',
                flowInterfaceNamespace: 'rfj6h4q2yukbzc0l2ad7jku6rmkaxasdpzo7abro2o9bwr8538ivb7pkqaq7e3egqmn3nm3l3skpk5vpn54zujhff6d2mtnvvgtr0nnsmjxds6pfysy0y1g564ix307b5fbk9me8zihmrwa26tn88cit2zsjtz1l',
                adapterType: '6u840lrzddpvilb7vuy7wig081py2jtwewhqasbzcqgpqw6tr9r3my01dlxz',
                direction: 'SENDER',
                transportProtocol: 'lnb1kl0x0v6y2hf8k207jeho2smoz694pefs6eqk5oiyc5h5dulwpufl52nc',
                messageProtocol: 'qhppk10ajtdfgnvewsqpwlp2462bikf95a9xq9gvrqi9lbm1il7os19o03yy',
                adapterEngineName: '2zqa9tk58p67djy5lft8mmanddwpsfbclxi1zghpl1x02eh5l2rqmssgusitq83z1zqkyje1cu8oucko06lz27p262ivopyxkqcgl0t8jv8ky2fvvfrxbs54btl1felurkhb77gq76l7skqdk1lfcz75vlep0vbo',
                url: 'd5lcibeeglswdgiwu9llc6m9h4ykbu0qkwvfjne6to30eft6xzhrdui7nb9h5rtjw8zfqhjmay043mdls81hfnycmf71olaff7qev86u5nbijnmu0laxyg0turqxfmfdkq0hfo8p0r8r2hheizib20cylp4w5keegnojm6vz1tg4bhyso01yk40uwaw74m79xzj7kb8uxkcz0d861kppo3rnhgte6kfrpaxa4amh58n8rmhcvzowf6e479ycdey64i1nurpuvgkz48jy04ws3s2q9l8wpchqqfmwr4hnykacat7uxbstb0r1vhg7j9ye',
                username: 'fnpoclkxee0f3jxrzf11mhfbfmr1gemo5o6donbp56k9657jewv7epbwte4e',
                remoteHost: '9153rxnity5jqd5r6x2bhcuonucasos33hu8hlq2vkr96y8d70n1jcjgngse2bz2178vpps23u3epjccp7qxfcl3ofn7zjj85cdokascqejzfmi2rhqrv4vyry64l8znubrokriutx1p4y1sk7gxeaegkmll9jf3',
                remotePort: 3130815786,
                directory: 'f831672p9byn3q4fhtq2w5nkkyfrah97k1guoyb7qz0l8ttmv9vlx3y2ktqk3uvr37j0xbtu56rbsdvdgh8micdib5ljxmbvcf8lp5tos9i8e0sp1856mlrwsaq1we3grug1qx37rm4xw79eov4xilldrh4pqi6bacs04w3ml5p5a47hixg58r5rb7t7z3tktlznwh81io9sfujtbma2r2dgel409fo3eiptvoibvng7foh6veiftac3dxhyh0277gj247u1um9ozanzwfzrks5k3i5uk8uh925ggixswknusjzvl5xy08ygj8eenzlfgt424h1r0bai7g0tque5f7km7qc5o32gnzebxc726olprx1n63rv4khcewxshe24yw18gcqi9kiqyq3t3jp32z9bjmw90oz4smhm9ltznqfn6eg2sjq1fjgvvdukaiwqrqaqdpmjc9sks22r172wv1krj4qbmgjkrwp4ruos6jqrqnet6n0rvgvldz1f0uvdg6nnwfeiu3gb3jzpd74cg98ozaqzziefjqxcpreap6n1u64fpigal84hgzqzoi3kqnuz8pnrv46gng5emtiowj2o8yzpjy15uyi7i4in2osd4kntrgo69e1j47jubssshfj5kxbruu2y0mwj3f4wmxhp6g96kwrxdeij4jaaws76wse2u13fy2ul58rkes1bzzxdosz0yigvy4mctk6mm17c50tximm4dtjw3zgyikfklk3svxok9el6vbslj9c1ito7gybrk6ce2qa296z19kn255x2zyosm4s2dtwshf2ucm3xjap078lts3iuymrud0tnzl7u8q7dhqrk00dso4zkg4bsb62i863k86o94qru33h6bii00qfw852u5jhjlelfbox93g136196xol3e7omyusw4lg2jloxfc1gn0az2wfzqf26jo23s4l4rt4m6nllqd6ecfby9aj7fndtmgbgownlggalcfxle1cj6we53pqntq6n476cb3n098pb',
                fileSchema: 'hbegp3qogep3bxksqcj42ef6ja418962vsg8oj588wcfvy2v0biltz7hgnhyjmxuux06zuey2i1n9niq3t30trfd31bvnlap68hkfu7t1xvegzwbyqhn5lce6d6m1zytzc5pw2hi53xpvx7iqp04ly3dfzpand33iq98ux11sbnn13qi0pkxpowc0s2h38gh5j2h2d7sccbyjejymj2jczjysklhvthgo1n9706l9vcbysezuce9y8itpsesklzok7sdy5r00d8yh2nkm5wfq9ne39768di7uklnixohm6gj8j2d52r6kb9pci1qeavqz6t0yxtakc6m4kylp76c0wd2hgtt647my7e66fjo8zr3r6foxev6jeh1ku64sjrv8vy830m1rxopp1e1ap6qhm22pksj1hq7cfxxzksp9jm4vmtfmy3c5i0iwzi71uhgf249qal6lvecmv7zzc7jwcuosmmhmdmct9gmwz9mltr93b4fl3agwoiktdkw7iaqlrja64wzrw2uavwizqv3hbb52ar2o58qd0c8kxea1gqya4yxot9h5plrp5eh1djlazav5k9rskdgezjjsk5zr6xqaxrre1xcixtloaxbb3rbwwh8h3tqxwiucysiaf652h80txkb66i1foaflqvo0jg8at8lzjiipi9m4569fbhwrdjm4mrq007exkyhtcfxueevlttdrtnms4gu0z3o5d5ewubzqr8mwllb095bzomq9qlxqx00qhujjw3tat6bmjnbwv523rsh64a1h27vm0c6w53iwff2vsxn3gvf16ks7h3ti2bhjxkj3fzrf4oz6qxjtww5zweyqj39qrw0ocaa11v0yz4ddya1lmw6f8f833zzji0lq99qioaa5bijri9ut3d1izgonuhjrz4372mkcdp28cbzevvr0otg7437jgw43bl66vcec8itkns1koudepj2dgqsu6ordkj61d8v06o29qs9obmw0p41995ze5cdhohzwf9swqzbt3zh',
                proxyHost: 'u8p0lq98e1nrmang8yjw8tvvp1r3k8b1jmecxj7fen4g78rtbue7qsieor2n',
                proxyPort: 5035244355,
                destination: 'wnmdu0hiwprigp6tsohwtoulwr55uuf7rh9b2slsl0elj8xm9we6ii16m7e1sesi9yny32qyxs2mnsmzdg7r4ihgrc1yswjf9jcv89dnzch2mki1x94mr4jt7pa1ky0ryxeprclb0bk8l43guy5q772nskc6t3lk',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '6vzgfk4hm4sdoqlh0kizam6lznmtzomo63iqiomumr40q920cldyuc348b13ilrw3thqs02xvo4t4i4b3glzvuornt17hq5hgqtrtq0xeuu0iw7izmwmpnjwkfrx54p1vzqihuzlp8wxdkprwwlvrzxzu7v6z8qz',
                responsibleUserAccountName: '57p3wi0grri6g27s2sib',
                lastChangeUserAccount: '1rvt1gunz4o151vri5s0',
                lastChangedAt: '2020-07-06 20:03:50',
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
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: null,
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: 'huryfoxmqte70y5tq8aqkrbnolr407nw8264zqxx6478sk06jczpkf43ym4j8phgjuax2emtyn9tsnad6m7p52h86gd18cwzz1c6pusxeqwvc7yj6qmfq39a34jszzsgjl2l5shhm9vhztyxnzybc91zeso6cb0s',
                component: 'okguobe5w8guahifkyylngoyu8crlt9np4nnc28bjarlnnhxdas0ajc4jwfzqe13zxflmi5sj11zt1yvo1s0fhfrm0nvnw4doji9dyfw64ms29inxgn3ybcfugtak4rij16f0x9hha4mp63y6p728yzq036wi7q6',
                name: 'ltho5ag0fsdgmn4y9vn6gzlfedtdp546zshuux5ooxe0fl8fyi9xu9ur0rq3onn7p0awpk7mimhsb2g8zuyqkjcl44twt6er1pks5232dwdivwrqw8vmj6e0r8oxdccdxmh04roh8m4qzp908ldzaaoxhs8c6l9f',
                flowParty: '6skh8n405w0dageulvxeqxxlos8yr7utbq0wodgj48rtl3z4nlso93kanru6wvvct4w6k31blpferx1cstv461hciyd61603kvvpnqps288yxug7ognvphirbx6rwreyx77knpxu7wsnce8fjjijcy8pkuo2clmj',
                flowComponent: 'dxwx1hurtffivdnw7gbg6n2olefr39ecitxvgxwg7i7cx2umtqinnclpfrdnitoxu7ltyy9e0v2vuqzoegkbex851lmekb6wi8ei2ld85xprrqgucs4j117bob7rnakg3pzcbvjuq66o71e27hzko7og5kpt1g7h',
                flowInterfaceName: 'dns8hcexfeoc6jaenc6m54p3zcnjhqb7fd93yyz9xslmkm03m8llk3po3yhgwqsaw6xgjm5nx6uopnmmwvdeiawbricz6f1sa4qofuip9f91b3rugqljrh5qp7ktk8g43sz0xgqgepg4znol6lxmtkv9s573s5ur',
                flowInterfaceNamespace: 'g1n29g5zs1kya552gemanv1vtgxerqsuuy8sbr333ou8lyr9lokzezc46gqam1ru6ozio4gsm02uw2jcfw6uq1a3604fkk771pngepvj8z8j0rs7boi4z5coccw8baghid86a34w1o6yct1pr78pia7z2zs84err',
                adapterType: '3y7wroj28c9j74rvbpgsgyqh2gl6bxlea2mc8nja23emj5zphwluithdo4bq',
                direction: 'RECEIVER',
                transportProtocol: 'njed1khgzulr6z5k6dp55qsmkjruexlec2iutqhoj5919sqrt94mudibnizx',
                messageProtocol: '0bmgpzeq85fpwddoxpznp6x9gjwualvnny7ehsoxykk6tzmt2bf4j9fvrdic',
                adapterEngineName: 'yf7l684mjm0gti964hly1dog3vf2ouo4yk6kw2t6n2wppbf44btkd9nqgewn4cungddy95kh6sxwurb85a8ekloonraxv5olu9sfnftjwqxqh7flzl0z9dquwx9l3jixzsh6rdt478t5oumxu9ykucxhcim7ndiz',
                url: 'jpanzn780z9gbwh9z1modtv300ysbrg5gg9ath7glcotz96qrqzgrt4dn0dubzfev9hs8noaqt99dxzpg9wciio3ybadu6mtfr94bmwpvu45zh4nb7vcu9k2tm7ef8owzonfa2npfwhjsv1d85bi7ei4dii7bl8zxrxrojaailz55zjatkn0vysemxhckn1qjw6gigyjapktjlsaazpu10vzf6275qwm5ebhdgh2xw9xzffj4ko7txbpxas1br466xxzz0dw81mdphzwhibihn4njq0gg3jum300uy26240qjkgh8cw2m6gigiv7ozxs',
                username: '4ugtveohgfosyen8w33tfqbj7wlmr33v9uwovcl2ert6sup44k8jk3avqelj',
                remoteHost: '7qgfu8l7o75ngqlbn60ujn5zlyeuoyjndfuulq7c223ne5oft0a38dq9s3ajrfgirjvemw6m1m3pcalvjfhc7fagvnyzgiowvls9ubon7okrm4qer5oj60okt6l7h9t566a34atbpy21hgaybr6acqhh5ysx0yot',
                remotePort: 3789665654,
                directory: '2hw2kiwjmembx0cjyi0b3g4km4i84yjzil1sjtu9e7fy7lo75f272ww815nxqz23tcrz5gzj76zgitww4qfgkfc6pasque9akyekhhiv20zu0ioxd5dzknc9vzp75odbp8w17fpdc0m000im2lrow11uriye1ddy6hweb582wq72kwhc5kkm3p8jaxgojl6dax67yeux68tp7b3yocd5vrw661ssbav7hkix5oh4dhnfjf9xtv033wbm7gwskg01h7cmnuxt3sfwxc0iir4xqvnh3nkzu5pp02iluuzauiq2uss3shjktocfmymvn4r4za5ts4ydlbickxqpml7qcfr6l7whdg26jn8vtnso3okbjavaofdsqid5fxbkci7p5mh82rwtd00h3a1hfb69z0klvpkztsd1g48lzjyaibiq1fs3nc38186z79bx0hlpx54wgd8i8ixn91ftrhz75tpm02hey8k3zo7sknilbs505yy6ppajcfthoh1oy68toy5wi8lzxodrs7zfepx8w9wgykpzf9aavjmu9raf38vw21p14oqm7p4enj82h54fox9hu7n8puga8kfm2ln4ff3l9pq18e9c4hncozac7jby50blt2c68bmh3fns5kdnvyjdd9m9x0p8d2uwd10p5w46ljraazwmny4totzr3cfg88dvk5byuozkf5bkd4ew9hpabz70dmwzcorddr12n3laqk9nn5p9sg97hdkn2hiajvsejpl70mnqn7q3zbc3tk5c5xple41935sbu0jreu6trsfmhlddkh915ow2e8ctbemu5ti1qambv02ic2hc9a6091x4vo6rvjvdjgcq9ax3x2p1z5eob2euzyeclbp66p4xdfglrnqwz1efc1vx2d61avr1jzp826l7q2os383cs3zpc0uj1c0u3pasgevkv0s2i93k07l7f5zvyju2j4m0373usqeqfmom4qj032mn7vsonoprkigh7kgqs93k6mhjhjzj8sc8aqikg114',
                fileSchema: '4n2pnh027gi38ww8xmfq2trf2atfubka9od5d7tgaljomknxz1b8h0rtwex85gttb8dpl6y1hib6912ln5e1ircwo8h5bsu060clpatr9a483eddvblt6zbdyheneden6i4q87g062g5u9b1yg1epwc9aot423s23d5e27pt88iwfsy1hjwez1cl5qmn8x5pxxphaum6hrijds1u47sxqm9qxos5gzbd7vpvnh6h38ew90gobuj8679d4hzszz6815r5cwc1xbpc8snlpqm4u2x5ruytpu3hzosdkxgke4srri7brfuco7gzv4f5l3zyxtnecpndr1odsyjn80j5zxin309hp41iid0nb5gqcumnhlv5nhfhp5dyyaedq53grl5vko0onqx1ydqoxq33jfgb7k5ucww06jmng52fgixvctokdhnfxklv57pl9s5uk5bjgn3ur2vu8kc5vxpm9lwoc382u2ry7exlffqp3zie9xr99ufn54q57eabjjn071s0jyidgbbbh5ld5jipjrgtg5ajbadbqwjmyqqbf1t9ch76ns8hkv2p9t82o1sh5bqte9q2rmx5ymulmrne5cndtztsn1gcrv21s0c9kldx8ca7f9uc0ilq0cdyt5d1lkjx6gsyvxa4uwf0c32ycl1z1iu06s1vdm8y4qp69f6yaydxamg5wmif4tolsg8k2i0c0loq25ora0qzbfapf4o96knsyrxbsag712v0nru07kcr4nyzm7eqqimmguljliqjc4lggg7r6y51kzhwzbdtb2vd29tm5rvr6nstnyo16kobw3t2aw23l6s88svc6bovr8aiyosk53jajxx8dp50j1hh3n3iae7jqxcj57l9tyjwia9l0tfu5o6fv5x0448jr8oxg4nd6bm1a32772yzihka1fdmwrlcwxv4c9hhxp87db5pwi4gatyt14qiqm039m5joevu80zz0e18exzr4qtuthzccnxn5nxl45ni438p7a59a02o5glrqrz4',
                proxyHost: '210fi2ifs311gscgot0uie2w808l0zftxox9w3sgt7ajdg9mnaixp3ex1u4u',
                proxyPort: 3864553764,
                destination: '4ajznrpy5uzstfoz3dxjkxcrcpueklc034z7gojvtzndjjgbiof2fgcbwbdc181qwce36kcl2t8okutw8fzo01ctrt3qffzqfua2b7t12h2ynrsahi0glf2ogpzydf2eeainv6fldkqzwgpvm6x6v8lmwtg6r4q0',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'tgquhd36jqifm38383e2vjikl11eh6h8bzoikircggv3msmm1jsm4hh4f8af0vww065a596wssm0x9gooo0tt91y5yn2y0jfj1maihsksmkwrrs8edndz7785lc0z7idwlk6fewg8s2w1uc3d737wymok1iqb22s',
                responsibleUserAccountName: 'da75ybjecao7wmg5wk2v',
                lastChangeUserAccount: 'gurz279bs1kraqulhmav',
                lastChangedAt: '2020-07-06 21:39:55',
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
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: 'ph2njrzu64sbd92p5jznurq38c8yfqady84cwn2wuydy0u4p2ywsa4tqfucdj1f1ydlu2dy7nu0gv50fczcrnziljlvm2xomyf5umv7j8b5uhqwkgbdhj4q4dv48klm6t5mgzqgm6pzdni2os993uxuapvvr0ut8',
                component: '67kd29onru47q7ho26eup6jqfg4hj4z7fuv48p3qbfotglbko087x4idjrr64gj8iq9k997tffheyfbbkybybdudz4llbmj9crtn8c2an1litrxxjgqdqe12ngaeyyo355bv59jvbltaxeyaa20t28bjibsx14vt',
                name: 'abgpm9ru5083hb55pzc4u3lfcc33o1ysp3u24j92nfdvc6gkpfba7fgeji3wqgqed1z34l7ziqw558g2yuyguzc4k2x4p5g8m7hmeylf9w4o3augdz6d6mhfpgs1r72mmggqshh9nysbqu863a3ch3s0ez43wkn8',
                flowParty: 'rt1frr747xmrstkaxhxu6mbudbmskw7f8mbsx2ce146806uzgktfoxczox1mw9v8cq3k1sdexnbzrazrpfika2m2m4m3j2w3i1rqxnwow8h8lmodsfzv366u5ckjjp376mcjj5dbhjieu6nfbgdrp4lxvxrsw2pk',
                flowComponent: '84lt2htlg7hwu4p9ozmvlascq5dkfvl0udq9rl4brayf4hp5whikoa69vh9upurh0vtustw19j7k66dritvmt2npcl7xzjgib7drh634gou861e219gm586usk4szuip9ifb7saaeqvbo0by2bjzn82sde414ipm',
                flowInterfaceName: 'jle39bq99os1qa09kppcvqbs9szbi39xcnbonqzqfcchmmvb4eojml6xkwztsa5r4w91r4yq4f8yro6ew5phoylxrrj8r707fqs57ny95y2zqzwemks6chfwygr8vfgbnoca2y474px7bzruaa09buv9by617aoh',
                flowInterfaceNamespace: '9400a57gxdmm83x6jbeokbnj23xrp6fnlqh539mm85qwgz0r0nomvqasma4vvf0ur3ioshtqoc676976udkq945vwmu1qtlis300xas0i31z59runlhxxcbu53slre2ex3nsg64758owy1tu0hejofm8ai8uqivv',
                adapterType: 'uxboo6vbw8f9k6qny3z74ptxw26i16dmfmn8hxxjk33ygzqokgvoudzllg3h',
                direction: 'RECEIVER',
                transportProtocol: 'i996f5tdxbnft0uslo5fir8jmhlgsujzte1g8jy399txk2m438zkdzc5kcyc',
                messageProtocol: '3q3l0ucwcvr4er9u7jx6on27s7c2w5rzbdhwqeg50rk5gma70km4f9gx9w8g',
                adapterEngineName: 'ktv7cv4ul1bz3zay56ktjsvlh77enk79rvsawpym6z171cs6q72k17r1k159fca6gk8f70hf11q6a3l2qz6d2hc6f1el5bj21murca1wz8szrcl7h7g9bsuthis3qpguga7bw95lg1zs45m5gkqhdnd35oirfp79',
                url: 'c2t8c3jkyizwhye5qw75iqs1ezpymoyw5goqfatmcn670833ql9pofaqyyvd761g3io2h8vmq8h6vu076i79km7rdv3ptf08u46t0griqgxupbtcgi4n36yueim7szp31k6r8yly8w0agx1kjri33x7m4umg1e2hx2zx4hh1soteqqftydznnklij30vukpv7k49kt52uv6ch3ttaw7pxup9jrhalsy5hvj9s8ar3z6aecb93l8frxxdc6ecui5iaaus20z2an125i3dly512e9ncyicfy9du0d2gqaemiug2m8ivq64j8zffuiz8ta6',
                username: 'ra3t419r5lsp92u1fxa8baojaydxvf1wga4uqax0oqhpwwbz6y7h1dyxdz4q',
                remoteHost: 'dr0y7q2ktnebp4417l1xozmff6btpcu7q5sbj0ou4wznxzpa1onna8igy98f4fc1k22kv1vi6bb6sskpi9u4e3sdwatm0r88qxbcpy70oigtsp7y5ynvoco2oh3hiha0804q352slwwlq34f0m2ktn1x8ml9n0zy',
                remotePort: 2556645863,
                directory: 'yfyk9gl2cutz3mchazqkes6j035j9eeg3lu49kyehfsoug5v6qr2e1vkc22mg3y22zvyerxqsz7i81vghwvq5hib4vi7tn0no5bj1sljk9w2mecl2xteewi4lg3vjy7k85r1jc7c77tkfa5t9a93bxxfan4fautztr3bh9u6lab4e1vwvvtws5u0kncmdf5r5kbevau8e23cazi9fbiglp1migag8rxzylkv9mshgv9y856bsd4oicjayxobysxhwozqacnbbg29lmvf4vf1gw14ee0x0rg56ym9if8yz5e76q4qxzn7pn16lat0kji9r9tf3gp9569l92whnl2tdkvc3dtewz7oq3ke1sdaqsu3sy4qq4l13mo2eaxm5rozkvdtzk0kr1me2pofyewgnbx8v5sk67lwonpmsh83cpvb6lhgu4elrbd8en88j9tfqh6qb6do3k3yqv1qkg508qj7d4nxhac2j6fl3jlauqfn075dunu3h672ba728thk1kyi98fvhcw3ykvjtjqmj77nd4nd5d6oqvlzhxbowncezfc1i4brq5dou9tx1nk2vtmijqflswvmtbep7iojcae5g1spz8gr3r1d1uibzlhppjtmjnqdnct9pj5fbsxbqb42cldburf574nqdqxwlqyl0b6x45p8xp7599v178ys6e3v7misrvmmbt55b0rgzj6x08e1vd1qpesh46v2gy5f5g8gesqbriee7w3crhgcwbzfjna02gyz8xmlqby6ko6tws0yv6ia1nnm6x6ojdgicuwko3tzbe6dp2lyg64olhyqn83bnrpvndbre1smirqruou08hn4hipyibjrl5ejrf914k6ulsnualqznfogvnvlscht2083n8znohl5u66kl3kh6e3zvu0hgv9p52i0jzkkvccnv4ryd48vy52jz09nn5l15prkvyv688yjlwi2sqtkb87cersxmbcsaixoq98rq2latkao5e433ddw0tci30tto4ffhgmz9fjb',
                fileSchema: '0mejxa74iioxe125s8dwttvr0ko4r7yf7uomcxvzf4ecx91jrwcxgw296rem8kt8ial5ffv41ko5p8sd4nc9op4mbhhenbi3kw0sol4uecpzrc6hhs686mu49px2ujzruiv48hv36tc7bxw2hxr727xzt5jllirpapelqbouw9s44mcs0v0onrgsz0cfjqm6t24ul8km738x0u58c7ywql1mfa7d9fijfud4lronb0ss5bupkohy37m6adzlt1rrww2qjrfpnjcoato02qtksjikzqjhzf41irju5tvhqonqk4wjypsmsoroil7br5cve2htdw8yvrpwppdgbyg3w0dzrwamwqclqk13d0ptimndrbrgfa8bhqi6bkf7o2ye1bllg8m290tqctzbdar0yq37vzs72ofv2tjyb0oulvdz71mlopf0n3qdonnooy9nkuu7zwezucafm65udste4v2bpafi2xzvme9znmclager93n5idq464qhnfwt9m482fb8o4hb7rsj3gu6azvdenkycemuw0yfslkth2e62oik5j9bs4989x1rn7qd0xbci0d5c6t9uva7r5hxhkijn9j3y6esbzbvisqadenm58ngiaps7y6gjacduv1o6mh475p6xkkss1ta7p9u50o7ixyorau0r56gl3mte10ik5ryspwwi322rodoohog2a661072ypsx9lkhji6103ba17tlep3x467hmkgd2ua38xt9fsyy0ojxvk6v104r6nsn6fk5m0vxnp9bzrxfr7mc77ltmfie6w8rudtuwqbyz0jdwbz840jii2ynony4k58pdara2mdbnu8r1d56dwmpjsnx33xzukhk9r9epn310phm2aljdfab76sce6mpvzh73px1mbjf171vtaypqzlnh8kwkclxe9qinwjdpxtzak2oalv76j5zj1f2eg6njfk69wfvp8xmt9uwpzudwy6108mwpy5sdsgmjn9z4a7gpdabf9elrsi3nco5b8mcsxld',
                proxyHost: 'buromlwfgzcg5dmg74qube2yiodqddnyyn35fx8kyca33pzriirm4e4s7vrz',
                proxyPort: 4881217590,
                destination: 'hng3bvoqd39m2lha18iwilvx1pdrzl4ll7s3waw8co80op0l6ltwtrocbyeaektekmsrb61xzayfdaj2p8skreyjdl8r2oe5bse8b7y0f4stgo5imkah7mihumrmsv9n53iz3xbpw4bl5ytanxcq2h5mt8y41sru',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '47l7csq40rvxk9nwuwa8c3o3d7s315m1lpn1j849s4xonyl7gq361sszln9yl6mkmphlpsn93ywzk0krnuvua057rgx47sp8r5zojue77dns5q9wr9tiq39wzyootna031ji312ppbneupyjy886y5pt96o126xx',
                responsibleUserAccountName: '98on96chypsc5hi3t9h6',
                lastChangeUserAccount: '1ah2x5dsb5am3uwdumbb',
                lastChangedAt: '2020-07-06 21:38:31',
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
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: null,
                party: 'w5lm591kad2jpuqk8tmlodc5kf2irhy0dfzslbtkc607okvr3j6l69sanzvz56k98t1ixb22c5l7o5chb5oomdkjcg0f32s01q7i9o3v99qwl8xl1ul6hw5s6y0nopvcoltmvpa6lxz6xfwsz1otv71qqrum2cod',
                component: 'uc8bpa1l114rnpb80549ufn707wbfozrbj3wl6m05nlnin4yiaexxchrvfz8sgo2afz1vt7gzh09xi82qblurxet525mshvymzf2yfc6ool43qz6m2bmr71pls6sged9ovzpir0nnkbd1lohb6b6qk0q3ncumys3',
                name: 'ombpk6wy40r4hdzf14ffhbrugmy5l5a59ehqp17ji5y52s26nw60jjmstww2rx17se3qfn5oxzhvqqaoc2d1xs1yo74pot9djz959k1xxleof6s12u01qkn47bb1uxtqvq40pqdw88r1juna82c0nhi49iizdfnc',
                flowParty: '7goshketpras02ojxwc37178px03ipeje7tjehhlpw3jhjfuvlsw9yg3t4flmy8guzk3pwehtx72eh1aifdm10c8h7fp1u0aqtow8ua4xeyqh7ec5xvz9pij2dlhhsa169ufvxd2gzh9c0ec45daw9cpd16fvidq',
                flowComponent: 'iiok3q8bd53s707g3uesp6gu6h6bs43ao499hx5qx22ay1vj53agh04fp7i5yyear6d99rk6k2zql3nwuehhbxlog9e0px7qq5smh6dfslvrp8z70k68axfrriwtju516b9wlcemt7epct5hm1djgq2dgwyxcusj',
                flowInterfaceName: 'tjs0hs44bap26i14orkn4fu9vpgb58aw2h6mphynfqgnmldo4ujkb9rnq87xfq4rnzbg3mzl1ytojlzq3hcj88gwkxafduiqt6xv9exqq04aou0np2kr3xxfsa513fizu2kjd8ezrfdbjtw67fdlxb90dwtnuezk',
                flowInterfaceNamespace: 's03plgmmou0te9oajhwawvqgl5raant4hyyxzc7gx6fv4xw99ih8sfjsyadw6w8ewpi7sw3mv2ri1b5zn112txqfnb4ljltr0luaiq0syzisakbzmvhnihsinmf939kyq0gbdn2geo35ubbosk9s06i58ii2afpf',
                adapterType: 'clt2nkc6nsdmj48ffo6r125e20j28jttaxmuuj9rek05tk3whg5qmhdjvcey',
                direction: 'RECEIVER',
                transportProtocol: '0xr19ga4x66bjvqiuh86jckqxptm84g9auf22d2h0bk5nmgpzi7ijphm4gl2',
                messageProtocol: 'zdxy0iae3rqbrrabaw75n0dlrydf8w33n8r0u3r50dob6cac8ta2h0icp6jj',
                adapterEngineName: 'sekp5a15tb9kgxkpbuq121ibfa64zts9n00m37xdi98vzzjlgzinpwdaeab57pr1it2x58pws9zlxo5l8k9o7uywrz2p4nrcx3jme71pzyqcfdp6tlpeol4ov2kq05tqvaxk7qttdve07hwc7h79kwbfuf6eudyo',
                url: 'sc1f9ofvvtsldjh5x7m6fqujwm96le6wo1kn0dc4tz807oqvor4601ljua5smtuke2ny1a0n5j4chb4tqct6nvgh1lh832yhtmi8ooi6cylzou6mo71qvzx790p2brx92djrygqjgjb7ebox35pvl8oi6l93s0ft3aw645tc76jyqvjb2jgwd61zl6h6q057q7ng90bwcuon13895tpojzy2532sjz2hmd8vptbdjv8xsqn6sw8633tm8noesk4rpqr6ckpq30h9ct0u3o0zgg50cvj4onepyksj00mkpvis7cddjkc50pjkkum7gf36',
                username: '0oyqfj4ra0j7gnrl3lvb702swnddvv99b2ts14lf7k7uxx7kmpp4afdqdt6h',
                remoteHost: 'x4apfwiymaeo7c7wzab80h0lbqch92cvz57nhsf4iorkz5z9pcvwc9k85l77v05chmszfq29ofq45tsbkjfcx12tl2wf8pbtejlsnpltl3b5ka9oetwtkzl9nrnzh9m6mw2lib1b7uchlkuqmwg9nm8ovf0t1uk2',
                remotePort: 1426116313,
                directory: 'go8syzdrhp9muuiud6yq1cak32tmsaguxp1aaki12g9q679bebateg0j3bqmvv5dxwivi7ycri76agiaksu62ex0jlgvsnrjkza2ba2f0ndk1l6d7izhbsiszczgeaee8l46nqa6e07wqam716whl60si2qvwnz0w01wtr0iqug1u7bu4w3u08arlybekuoudxyu2m1dc6tgp3gy67u477nnijjis8oqnfgb5soa67czact4wynepb52wkba25yxj7h3t23rkx3meliskb7yb3059aheny8yf0gp7rod1ijcefegg470f2k69lhplpe6v863b3qbu7vs8wrq66wo2duv3fpupdkgdkijdfid0xtf1bnsxongyqf24jyjxdyuiv4z32yots3oohaz8vlq8bibo2enae6k0iv5azch4m5wyugm36xc7k0hrr49ua2c5l8vtelrgkusn6n9zsrk79dictaq54mt3gpjjs0eyuaes3xx5n7cj8k1verm00tw2y6fz9x3lph0b08dtnuyfcx54aq95l7ypzraj16w3966pkxkiua7o4bzjjilnvqelodhbezwaa2n02dnforlos80vjzqievb1cg4l2i2ie79jssi2r31u7jpvj62cp7ttyi3pg88w0tx3rcgvn3f8oy89gjnnx84jleavq9w7gm87r036j6fcm23cy3zyjqlgz2tirlhsh2tdk4mbe1yinj8dcs5raymsry1pwvwtlyjxe5ozc6jsrmal7kpq01tbi2dmeq7fo4q8j98p2ggj5h1jfr64z5n2ef9d0nbfkd6nyll8hhakwddsiuo5aq0stn6lykbljkqyeui2n8yovtzl7nn6tfi9wp2sjj03yff8d5idnugq01wba31nzkip146b83x3nsqdfjakgiojoj7bavt860r8sk3yc0j2cs2nqnm9f2h0ky4waykpsoupn0v572kbveeug58bl59sb0xgqv5ig03szl4jmkenwro5j809b8sbw7k0m1olq6y',
                fileSchema: 'mdgulez5jwiggr96yivgoihta7kr4jot0ggso2tz0s40xs16ytcezla8ae5zwgh277c50uzpr9bajdbf8ow9egbjxsabvntk90ad5zshycwnjh7axqaflzjtqgtpvzuwmdamyl00cfyseciq8k4ufn14icmft6dwfhhxjgl41f1px3bmgc38hdmh7at2diq3mjw2jfal8g0t4mc56kvku7bjvv79pq5bwvo6zqjfm8tuagmwyzgmzwnx6b0uqx6kqh0uf65sonvimp32y3y8ag6rml2fy2082bhkj2wh7opyk866cyivrp12fe742anve6zsfh1m2pdjoxkoywml69zm4plpatw0vuf71jxes878nk4wbrqv76om8fwxz1qdds3j4bic7zlg5ab53lpy7hytmf5351v7fjdpvwvue342odmmwyrvy2n3h987x5b9evcritad8dv799oh3yjkjo0z12jifyp3o0jtrfl23bxldpznhm7b5l1gdrzd22ckqdwgtahp1x387xx9x72fjlk0lan06rg325h9bvexz67b0srp9pkqsbbomodyjwnm39l9chswfjpip7nik3ozcjls875a4aqy0vee6t9bp6win8lqsvxwhkx9yc6bul3vkpafdsfwpyf6zk8mniavfnxdntf2icsm53mdebf5bxes53l6dqishqf9h0olhoxk0cweftiscqhplyisk0i3jmp1c5pain93i9maedfu5wkgz5boej7y4ymtksdzg8ne9pvmu86y7zc04een7e1cnwmrib0c00j51wkij6n4cr4v1o5yuv1be02ca968d81osci7qhcdny3s2n4a7sjcfnxg8wb1p6u4esh6w2tn7yjr6d5lg9hvgcoh10j5f3423kdyrqmep4hcvwh3qu50xkc40ky692t3aotdlyhot7tgj084gcq8ipo9r59c06yvdy8wecb4jfheivu2m6iy6lgm9n6q366taxqwxawrp3lyqceazb0ik916e6ca9oep',
                proxyHost: 'qcomv4d2lhbhdweaassjg63z8gmy2t5znyttkbooxifm0wmwoz8zamw2ng68',
                proxyPort: 2889892603,
                destination: 'rhh2wjyv8k1e5a5xpmakz04e3fpry0bwaz2josa0nmpplaatmxs1p2w2s6trj2cp1hhzwp6nn80grzse34jbdcu74bprl3mzg82wlsvk373mjr26532m92atzlea72lyh80z682ydyqqz3emblakuchfgqv15zjv',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '3b6p0lol9radye7ammvvg708ansik0v5pge1liybtg508hz51ilszdb4dikdovl474ow4phb4hezfw5vz6izppintq5d1wdof2ibhsjz59i3bivozsf2kvrbtmxkrzm9tmxggz655lnitgnf3jyo2gwt70omr30c',
                responsibleUserAccountName: 'y7rranz0momlpk9zr0if',
                lastChangeUserAccount: 'ngx7pfwhf8vawsl4onwh',
                lastChangedAt: '2020-07-06 17:25:51',
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
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                
                party: '4db2w4l4zpgemnpt87aiqrwozwxzrc64ukes5tmhtapyva1zqfgrktlm6f1uefydvi4b8dsmxn88of5wou5hikr3pvg8e3d58a2jdc8uj8vi77141yco49kgbmu6xgzjp3j3sb6c7lwxicrvhdp3w00fmprqw33e',
                component: 'uvs6asyeuwwkn8q7rteiwwmexcjarl2moigjoc27vejvz6vs8qo52hvhezbzzv4bcnohaqrd27o3dldcd8eauk796nbe3hzlvjjqynrqkyhjve9cv5q9m1tipkncvewlxft56v94sdru1eh080qfr82s0np8x2yw',
                name: 'g1sbjv0tiq58f7oimtaxsf9455whbat8apir7macjt5lc1qkz41tnld1qgptf761t4xilm4wabf2upfxqe7q0e16gds3vrn1x9v8an0k4z9bc0w36li9fwat8ob20ljfpark5w9ywf1vilu3upv92to0pe0j4l19',
                flowParty: 'bfc5cvx2tkkyj2nlec61vxnt2p6budkjyigb0bi5b631nspjypjfp49cmq707m72t17vg5ux2cjw97tanfo0707dub0dl4nm81ziwozgo4j1q46n9vf92d72d22m84vptfdgd0dbja7b2cyxbbkes3x0hpx05ioy',
                flowComponent: 'bvh7aon45cgtxdy3uno6l4limt6gk0fdc5vj9ukp9fzpx5fibkuslaeuzahwedh1dfvutj1n5g72iknmyho84meihqm0jw9i3qnym8jngqnx5hpxii06yffkngj890o6lumloe5gbgp0xljcsjxbsr3qo7fxy5az',
                flowInterfaceName: 'g60lanwrc2s34uh7bdpry6pfdb5nhw7hj108otrh8jnhw053es7iang8seuj1rckd4dlbbktv3zye23ajtnqy8fmr3xvf9c6hcw752y7yxhayqofkd30qz5osjlbowlxggdfzfjg2fv108el5ft5ly8t76luvm0r',
                flowInterfaceNamespace: 'qg1q0hi8ablfa5vc9kyhhspotpnxdjtn945j3lh5as35wtpgnr5x6u5rl1ja2h8gdr2dgb00f6yhq9t71yhtui1z3gc7nx3ev57btk9kzegrbclq3i2a29m0at1369qzrjqs63wxna7qop7p7a2l3a4cl5zgg6kd',
                adapterType: 'n4z68z9oob1nljwxcdxjxenbw3a2mpl77jd3sjrefz9l687fpby5rxc22ji2',
                direction: 'RECEIVER',
                transportProtocol: 'kzmhwdzc4dath9roqfnwqfbiws8ecgz22thpuw3jtv50ofwmh67lnww22ql7',
                messageProtocol: 'ttcgjy914xdp7kjwj7fleigfwhs40pagffpbfyhq7cqq361bdjhtaic5axtd',
                adapterEngineName: 's13mfmxyt9mnudcqgxz7diqni80kck3woiqprpul70lc6kfbrwvc4wlnyaphktcs18f6u643ke4idqfuc8vjjbmmfrjvt19x8k84ihaxak8ii1opw4zgedcvry4wyrdbb5fql68nt1qii5yuwxi9g92lipmgi9xl',
                url: 'nv7l4y1djy7j9rlm11owhte12um3c2hthzlj8vvxh2d6ojmft7zl9867gckfukjshiipjyojrcnb46ycttapw30b4hhgjuqo1ald966pddh9hax373dcof9sd0y8b70ifkazi7tin35zzruhgjk8dhyrruo74ngliq3n4lkjp6f4lak3ddp0tced0a07g64e97bfjpgesa79cfdmv8iua6ml95kdby9pldwozsn2vtbtncd5648zegzedpyg9j6hc8ljvppfbjxzfkw7cddq58imluzruf51yyd9tvx3po1hx2qon9eujzjbi1h85a3j',
                username: '89z2lmvjy0i4qsbsi12da8wy01o0yomsv3456454kf3bebrkerhow377ep6x',
                remoteHost: 'cvhhv2i7wy97phak6rfaujn0677qelzdsbg7apqpsp9sdthp7bskfucvdkr9zkmt69b5grtz6h2hoda8coh4akmc8xyo1ai7q0mzsk4g61vguomlqv0n4vo860rkc3sb7k8sg8m1z1ntc6lzu0pmmjlrxdde2pt3',
                remotePort: 4550233697,
                directory: '2um3cqcgwbx2zmttp8ck0ii92yrvp3cwp9d4phaxfek1ei6bbmo6skk9yrvwpwcmje9yl0usnkv6b2inkryotm57arnxjmqam8yx22o2xlyami2lb5bnzio41k24r9s592a09ru937hd66l0zs6db9jrkhw38i0ksergra43alsz1qkiovezn5a5ltrph3alsui5dwu83i7jclgd113t23twyd6nxkpvw7peze8blqnx8xmghrfdknaldg0swc0oz8wi9b99p8y795qin39kg74sicfcbpw5o3e303c88cg4e4wv8rlfpvbqpjltn5leulukou57op1fxugmupnvfl118kq5tff9oavda3y6fs9xkifoave01ahxejpm657ktwp3oq5q812bc4jpmupy3b0lg447gnln28cl9b3gep45ngw475iniagmrduehzbdtp15olg93j3kz49smikcuxtk4xajggu928v4b4pkaep5y0o30bh8rm6fu1o4005u7nz30l72abvyeyxbqaiyx1my5yz9ju8g3ykvv8pm1z717e7e22jqb5ikczg6z1dc74ibvh7ndi288z9x9iikqsox3szm5slglp8vjpg99qgz1z9ahq1iv8ybakzmxjmosx22tshz9x8gm47zb32ft21pnkap18zzlq6xzeouv40pd8xk82thwxgv1q05q87q0p12gba28yfidfifbp0odf16kq20twbb8hkav4e1a9qn390moof160w2dx5wk5n7b13trwi2uqs87c8u3te4g4z3tghkan9mueekf1ib7hbwc0i1u5sqw0fyi8fdmty23m7n4dgf3m1597ckacyeokk6kp73kpy4hx5r0prvy74c6zelx8hyqethzbjvtyhx5mss1ikethq2exfrx7mjmt1q1y5pkg8gv0hrlg82qukexzuaful3gpsybm3vzdcwcn91nh99n15rpjn18o0o22l3u465wpwm4ilcrm65mrtpkr6ovpbz5xx7ey60t5zk',
                fileSchema: 'c95brxbj9a4ktq6h1yimjadz829cdck9d73p12mf7tws1945n0rojynmwql6h7mpfrwwbbg6op5mqb1srs02pszyfupzpk6mqmq9vn7akddvdr9zjmd5jkgg0ieapm1hx89euoo6oj8g9phgv7afvpwysi3f3wkojd9nkx7fboy7nl6el2znu2qdhct13irqcul2tkcccv1v3z7j3utld8n4uf1fz8wdf6wbizndd8y8otk57leac1m504317iouz040bmcbivc72bowx29sjdv7fw6t76jmcyl8arkmob3vb6yfngr119zaejw8c5ldvtfq16m9vndypip2qtusfv7c4oxhqpm4gln361yna2z1vam2353eglr0t1q2efds9kihvodgojl3az695q9wd40x24s8zdv8eivmtdcpkk7qjm74app0u4kri7fbp8eiql9f11jymezwafa8afsrgjxupoh1sttcaprkjblyo1z19wyb17h94zn4ykxy6oupdb1y0vijb5wbdun86os886t60wpkgw53altk154z6rlqxd3veehffvm9n4x7xnm502iaoumzudrjdzsf7tjsw3p4u9zrbix3nfo3lzvan02ztw7yp4tpwg34fwqiwvottv650kfhyf0o9dik1fuopxkedu3dyygea1j4yeknnrrarjnsbb2zcc44vpwpqzgshbm3t2dlvcjcrcztp6xz6d6rlnhieuci2y83g6u5bw7e40r34a1g791oorg9k4g9bngpqwab7h1wehfnrg47rgc5lebrth802w0imzxayexgpnjaci89v88reiswjv8zjs52drile3z3dj2wxr2bkjcab51iyp80l5cvakodsagk5tanqrhldwj3nxldprgqll4x9p6071bim94wzb6lhymj6fvtvhgg8zpoksufqow0mv17jal71iuzfdy2u8zqd2k4c7v2w6d0hcwq41iyksrws8hpsq6e11qvchw59cm7sj3sf2wp9zq0wfo939jm',
                proxyHost: 'rnuknho95aqord1u5xpv36g1iti5s2vorsre7briksbudmo4qeop88x45rbo',
                proxyPort: 3964894541,
                destination: 'we7heugksc185im69s0wp9ijhbmfs77ra2e4rvnyy77rz58cjxkdd795cnjjpf2lhs06kjstt3ku1cu702do3piw715hfyv34eok8ple4foarfecln7byd0qtglytby43486f78w3b26apiazutwf9l1fzbvw2jq',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '8vlh0av3c4xymxnllbavqlwdufh3d85nzr1ampvg6vqbgfwfidq9hnjp37q9g8du7f1mjcwqr6khc63ec8zv9obkaotliu4ai8hqzo4tp3vxr4f297j8gj9hx7yir9fp3i3vplhw26jznhrr2x2abvzk0ioy2fff',
                responsibleUserAccountName: 'nx4wmq07kyb24h5tkayi',
                lastChangeUserAccount: 'suy1s4bkg36p8fu1to1o',
                lastChangedAt: '2020-07-06 18:36:56',
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
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: 'fumaaguuqabgt0ikrjhtxlm4eh91wy4cbmy1tnvtmrhq8c01d0c28a9rk7nxda8s3do8i0jd23uzod2mhnnoonq7e89hk0q5v41zf6n5pyhlw7k0r97zlxdjjgigi8sykqqpetilb9s9bt8ba7yii4ux171ejq00',
                component: null,
                name: 'hv8x00xatjly6n45s9hk843id4sf1gtowedo0s7c4yul3bn4h6ivg0tcfsxxqz9fazgfkwbewbpoph5p3muwau1q8e3vl24z9u2ewv6umq3kb6d3we2d63ux5h21zt6r8qakwb321hke52v11gsrbeenp3jgmeq3',
                flowParty: '1urzl02ebfxhau950bfpq907cx7xhlwdz9l7cq573klsqbh4modpxlh74zy03y2d5qkrfsuc7hnou6en3ky0hav0gfafrtwnwdnx7snumqghf07my7g6d2nucpnd1cgxv7g406wmcgm0ezi3fairwqr5mm7qmrf7',
                flowComponent: '0zlpd79gyd19wlswxyr9txvsack3l8urhsb9gvh37xcrhpjn6jquyrht4r2ex5qtjl6dmb3aapzu7zr8s3jeclidatnw98ig75bmnwwwu8q610gi154y3950gfgmg9931iaqio7enbkpoxv8x7yu8uz52r0gzra4',
                flowInterfaceName: 'q4ugkvirynvv0zyu4kx1rir96qajx5lildt48s6nxvax0o8hknppf1ril4cd4z9lxznp29tok4vqf84amhnffezs4pznoqm6v9f2psclben2xt79g2ggc8y0vd64109y7g0o08sx6l6xro37eb01cjnsuodamlb9',
                flowInterfaceNamespace: 'pwxr77ntw4mmb76et4cqmk50rkxr28h8jny9p3ucto21pobdt22foy78w30x18ipqg23ypp337mb6imywxflrf0m8bl27h14wl3fnvmkx5oouawpsn624vdqm59901v9839dz6uctux6s7oc5v14wfgovp9xyx6d',
                adapterType: 'dv1ramx9csnotztxzis86n3bmz5m7gh5x0xnjpmvin652ndrhoand0w74z89',
                direction: 'RECEIVER',
                transportProtocol: 'jd5m2sihlh55ehrrhown4x4tg91gqbqhza0sm3ffvvxv9ewd3knrsq3tad5s',
                messageProtocol: 'yv5p4d3taj0h88bg8vd0tp351rkiuirgf4ydiufy0py293ufjoi44co1vtyv',
                adapterEngineName: 'ux31edb8zk0hi26q5alsbdc0are0vj38s52agsjw7a7hw9tuwfh9fvkzocxv593puwbueje8cg5uprwqs3bdfwuq20g9jix3hh94spsmn3p5kosa4jangtad8qxa72t7ngqan2n697x5qx2bdglt9lhenp056nt3',
                url: 'ofuyet8lvxtkj87r6yajma8xowv0gwpes50baur3dd9k4wfjojb22az7n1shz7cxv1rfzm8rwlptu3s33ik8fr8jg811is1gq7gtpm7s12ycya2anjybft77q480o6mtvxzzzi0vb9q96z90z22aqtibx4fl0959sfci3p683t69mu84ihwotgxd7ioic7n0jgmnanmg02a5afjxqtu8msmqj4nl330kg234k0kji5dmed8ulvd3527j8jr0r4gnfyjiat5ijfkjel9ckyosufloeus20w5wahhut5mj76pf5vk5mf22z5t2yztji1kn',
                username: 'ac3wt61tfp67d5col3188tylaw0pxynk5qf4k09m4x5ayeyhrm6oz1u3d69n',
                remoteHost: 'rb3kbdcqcujdu7ajwesd5j8y1ug0pezqaeyibaysqkfwzslfvmto5ycoqphqvagrekx9nfnb8yl4bzo2ihefi5dw42x5p8ck07usyc2g0v3r77nstn75sri3jwx0ap2cnmz60keyb70ivyub7zwd24o5y08tf0l1',
                remotePort: 3614868531,
                directory: 'snn0jew1q6rhm7lu30ofainak3nrkie1lpp9g83kr1f41rx4nkbopalo1gr116xrys29ts6g80f1gic4jd42nwpuwrmerq2ok5u470xjqi5xli5uvki5l6nkmsmr0cvkrqgsbugu1sn4ex2xvddrqz9v9i2ff9vkta1m9ht6nbf762reih5nh06h23czg556wchvojhpkkt0jjagwyp3re0vk7s76ixd1ym0kr8bo582ilrys54nud0fzmx2p73rwxqef9bjr5cax99l4jr36yp2krsxp66daa48sgq0nte8bm2c0n0dg3e5ic2mh25vus4v207zp00bf4lc7q6goshnxc1c6f2f1hy7obm1bxfobe70tw2e3j0p0feamqdrux38goided7z6d1jxenpuyawh70619dixicyw10i6pmm6lfw3fi3hnsveimmu75njy4qcwfio2iqyofgs25sy1nkuctcjs7efcbsa0d5l2292emoemw56omy2q80gnuvcsybne082wddcvpsp6er6gry2uxpko6q2eixw7psj795x8x92jixy90hkyfqyll6gk4ajr1d4cvybx6ifxv3gjxs7adwbbtvfy204wnw8cv10w516kcqrx19nsv1xbmp17cyyr9uxf8z5bowi8b9bvuqx96omj3lw6f683dbf7t9qlqo5h3hoa49d6d217jblbu94jbnznph4vhi9v3kx5ibc3o7dvmlpwvgm9c869xfrexqfyjokms8bjs6pd7i6by38fmp0xnfhpm0g5z7eqqpbm3cmqryjxqhfrpj6xlzcpvhzmya093a7ulr2cpzozrohsnq3gnpd51hrs0m5x6pqqro98a7fy4bpz7civ5ynmy5ok1k8aa4vfypl4rsu8ylymo7nyjx5dvycxdtdmvjjr0q9b35ue2rnupwjh0ca1xl15t0d61wnzrz3l4ixs6h3fv7c41ntj351lpl7vzkqveq1m2vpxyi87iy10jpahazyxmdq3q8hthp32nv',
                fileSchema: 't96nmmckvdj31voc2xbmp4kweb5rfqed8xo3lrjzi6b9idg6kv66opdr00snhrio0944gd349hncsjcj2dykr8s982n7wcq93xzpi5npfq15wtvpsdcxycp3ov2843e6nc17r076x77jjqr223kvow7orxn8vrzflo8qtisx1nahiz8zxpkjorkv43njgh0ua5wjukwd34e5hl20jbza4jnz3fe42x7uatz6ra7ilmvqdjwxs68ssifcwvc1jqz14bbm4cohwsxhp907b4ipbmbtyoqh9k0pwo7yj85n5uawrpe3b76dce62l3g8bugvaqnff3du9agn5t7j6hz9dm0rsq7ooslz2dza2o7nsli9fnvmnznted1b55pn3xxwlje3c492ag37lrqznelwl56rl48240h7r9jucvbtp6nvgdc5dp093god2muc07co12y9fqr6jpsru3ssv0oxsaop4w1fkmzf5gtcyakfbrc4sqo10jhgjatd26a7qpdd6qmmq6mtqgx7s9ds289mle8fythyrudoeflph53esp14gbqy760lz7esknw9mpcszvq1ai55e9a3cc6x0p50cq6qjxnfeu1u28jmf0zjt0j9621z322nbc9actpxq42ka5bj0hinhbimqfxtyrilfmfmt2bb18jbpotnzicmooyml7viy596yuxd77wbfzecsz3aroc9gp9kzcuv1s9p3m28flozj59ddcjfchjenc83h3ebia5nvqpttvvdnrforp8chvvtkzjy02nngyzmx67vvtgwlknul48hszp6bm4y5pvsg2x0me0hp1nicnj1j2s8c1doywsq23wg18frjgxala72x73owoahmd16mps5184f5jv5c82adr22vk3rfna7fhgup4fxuj9azacaj3oaspx7e98cytrmgodwpkviofmts14rgc52fgub1903dzaqjek0uwmtnour3qblf42esq8chpi99s4fcyofbprajluq89cc3dhhyob37n4h',
                proxyHost: 't601r3dvzv07lz2xmoflo1k194awszapoi9btd4n90r161f8jjplp77oqfzr',
                proxyPort: 7018224235,
                destination: 'p1ov6c4m1nzdrpthdn9uxe7bkry07wa9b0zedz4mdz3bufkyfsvq2pppxpadl76x26lpj8oha68zuco6sa0fo80uca5xzxizmuktpu8sa8hth3zuhgqt56gvg7rrw9hg0umrbjrm0xxebehl84zt9w4ycyngs0sd',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'b31aqgiqrmjj7d2fb17ryp2zpaqvkrhygmjs3uwfqy1n9yitwjomlxpr7eaqq4y1bfbf2rdm5ndaqg2m5wzaudwhg68xeagngcr8968hx9if15vhzogg9diar81kvj1weyedlbctd1wg95b5gupfj5ofv9nz4k3y',
                responsibleUserAccountName: 'vvcsbdopmwmmkc605wku',
                lastChangeUserAccount: 'pc1srqs1d6iickshylhy',
                lastChangedAt: '2020-07-07 06:49:35',
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
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: '7u9bnffhpjh0i8gk8zfbo1yvu1yk9n6fbgrjqvs3rtkg2tfgozj8r2awq140mh8alzl08gaj2hxwv8nuahzev7keade01njlxar3j237e5hdnm4z8s8wltvq7skj6ao2k59grqetuwkazn77on5njsj5qmwsvyyq',
                
                name: 'y41a6qccdamc6j35zpxhnke601dha063vlmrnq6j7bxtevlt07eoz38pl69rv3aizqdp9fcic4ajoak56janjjkv38p6s56xirk9onxoxez5utpm7qakpbziylknfhn6oaz8ezkgbbde5c87zbkwjc5u2bgvri1p',
                flowParty: 'ys2s8d92k4mxwq0s0silmhef38qpqsnoh21l6js5b8thfkmtw4sb80jt0ur8mukquyonpnjtjtqxiqjiaqvspprbcsmlgz8biqwt0amzz102g5o1mgsx2ut7ewlbkiirnn0mvl9ccyl3ldchcdulxx25strx1236',
                flowComponent: '9q5jzeipon0v24mfs6c8yp11nycejqw2gv1eez0u6k6ztapyzsydtjtyz3jor2gu77yi7hv83brrg7yga9y8ym7dnlraxi5n8qlhzny02uvtptz8wu9cg44flcbbsmkcppz3sihvvga7llsndtgjammxqepo4di1',
                flowInterfaceName: 'xypyzu968ersv0zqeqapsbz06nj8gunjoil378njuvmh1gf560vl5rsg9fonf9p6qdhmttlzow2wv1hhcfqr4v5h8h36kuvhrvdawygtb9cv30c8nmfr0ex7zal3ru12uz260208lrslio2lwm04b9dtnnrdddin',
                flowInterfaceNamespace: 'i7lzv1bpogtfq3fwgchvpd1ey1wrz2h4muj6nzfe93p1z2zur0ajw6p7dksp3fer2xrvmu9nbevtdl2tz0btrk6qaclg3fuozn5ualgsck8o5e781h7sqnvtaqyray18j1xj7l9a891kiintul3mt2n4ykvxq7iv',
                adapterType: 'z16b5klj32ecxczcj5bwkgae8aog91mwkh8idhncknk6oqhyrvwq6f78yhv1',
                direction: 'RECEIVER',
                transportProtocol: 'l1fra15oz6gkijgu70cscv1uuf885c6aaf9ah3vfk8iwpodm8r3z7edqnfoo',
                messageProtocol: 'y97cc3jv6v42vxbbedvno5fopysqltjavx518mk0x23wheinwfa8j3bcomvy',
                adapterEngineName: 'socdcu30mkgok8kofy1uw2jw8d1rqlceuzso49qx9mb4w1p1n02v43ejbvxxk3ypawt3s2s2zhmm99pwvtw6tdralfdap8btm4juef0n115nqisc5bhyvibknykxb653igc26gjaelbmppb9lws4q9wd6r905cf2',
                url: 'nq1ro8ixhh6zysk81mjid0ekdikctux8fd9dgzr67w0w0g7ymsxq4r7chn6htd5n2moz9rxsa961iygit4tztwl3kpmrywo2bczozbie173dyfsneirf6s4lf45lgnsizzxg8a6634v41hs3rpie4ns1lqr5ve00v49fu41begwwt5gfv0wovmyj0p2qoinou5isdkxbdix3zlinchzr1edn1dxpq30uvm2xu0qie870su03q00pey5csq8lhbgesuyn3iho2xuiyykjewzx6utcf5bzo7dl9sj3ywpzadyup3e2p3doeeehqjsbipic',
                username: 'b2vkxb3oei3pur1psdfuaofecpolut08impytsks7bk1ud7rg9eqvxrv18aq',
                remoteHost: '8qea5eq85m7emzab9jq8o8zh0xvk90yi0jp8s46hiksh497zsb0h84a1ierl1kxrvhs4hqhfalc2gxnc07tdr6k0p0gf32s1legheqzd83b2x7a6xzswl9n5bg6nhtxj3ciiy4a4mrs943s04j9mo5v7n6v17rat',
                remotePort: 1759146078,
                directory: '8sncn2h92r4tmrpw0cxtu50dhwkhhi612oanpz8fye4l3r7gifx5nboug98mt8dtep1bllbczkybvbeg5w43ceolrl5aeurn6tc3bc3i43yc63ay72ncbeniu3ugln0q0whaah7odnf5qshh1yhmy1erjiz1rpxfgnit31pnftky8r1t92ubb8rtaelm30glodw1vy7ndai37mwahgtketveywdfkhzfosm330ikzz8gwzpxuaw2cg3cs82i8zuctj63ttz6kkc8ug9yj73fwn4k4dvuu8brdpaa0nhb82d3njaitzqmwz1gsjkdna4mknljbs9fpqr92urln0z0ue3w6ue94wkpv4v7tocqoxeu5x2lqwyluljvjzdv08an01k10dwfdlphw2urx531t3ack7gaef53921ngfj5glpqjga68bzwwv93x7on92t15yvzpyplbt0vyjbbqjtx72xfl66xqwcy54sm8xmkft9gbft3jn8md6b39c43d80ea8chwl03bhvmb17gpt6va1oyc4h2f3svq5us07gmlk90b6c07b4jiuu73fgiskxvz9wsyyfpilnvbad524hzojzezlisbi3eprgn97cgk2gxzquj8ovfasgcw5be8psidt06h5l99ighxo1kznei7tfx8g8tpbp71cag7it4flm1lz39dbh9kawo4fzsslhaaik0xxyj3oo751l9iirk9ukarmpn8y6ow2u47tzt3m6u1mrkect6ej4jtpfp0jxuisosh1q1jvobskpxtk1la24rn91vu4ukk10lqxlzrw7j063hg0yltlw53fzkr9sf0l13wanjkl21qu3eq30e3cknggnb6wfjutpqc2o6i57ra16rq84tf4yuechnmq9jm4z386kr684a13ppeh321b8vrwhag85gcl3ane4aliat3n9okszw3p3b0g1viyhkinogkhcydg83jo0x8d48trrtbejrbiro7pbc7pulsqsbhfuionkr84ue96aejnyq',
                fileSchema: 'y1a166fglaopz3ujt8j32kashhxyhtw77ywolhfw87b44aqjnpjv9fyzlccccwq75vaadazaxab6kpg27gmeb5p0di3bcwiey5ie8y8uvtcn89vnb5amz8ol1ha5f098yjqh5jwxplmjq1zcuxtg4ngy4skq4nuzwtd6t27yqvivwh6dp3nz0rf9fh78cl9sszezrlykb5cf1tac997ec6nnudmt2h8sggg21a1g29569abxcacg5ds9zpnw1aqkrvvfwjv300xb96ax7vhiw18iciupehxqdnqtd4i6q1tl3egsfj0v2b0d195o4buzay2l676oiashjwkxnc2zubijcd6wxezndcmm4dibrnj386uab3bwb1vm8n629j8rnuv0vn5kecq7hpwedkhbbttk9kbh8ijkuwslb4wpb4pcw3thognsh19d7xe8av3g83niwraht8av0rpqyg6sf2q8lpx7vs78qu56xod9r1t5h1p28m353eoxx8gym96s2x737l9fy516t2i3z189ztaj5a0c2sogms83iq368ftk8zhepudcsvyt61flkj3cufpmfnh05ygyw8srj7fybuyx0g3tkfkbb2b101l85fovrdw45blptl0hzcktis367x4csmi0cw0qfrl7u87j7ri0yyal0ani47hlbwuaczo9r1wi981kn76qvqvxzcydr18lazggzpu24ibp39wne3bs0z25g3t3dal4sp23ttme2kof0zexof03x0srqu9etswiob8u8j36kscc9t7l4qyzjbqz1p8uowxbw00n8fnnxegz3uxeb5ixdsr50ngrrajec0jo47cuytt1wfk896di3egsoo15z0jfuv86mjbz2v00dop03ohw38suyqraizmgubgyhver7q4gbkobz1bel5hwoan9q7ey9a4nkosdq7iof16jace0c8vt78io8j13x9ru5si4ycrf6941p6pmv6hyg70w8ytnbivhhwu31ty64fz3c4afqpgy4qwv',
                proxyHost: 'n05smibjgicx93od55vwhrr3akkcr6q9u9wpjbqi92m0te186wpjjp4nxttd',
                proxyPort: 1359689078,
                destination: 'v8wcge2ruf4184hno9q4c70bvdb61og2n3hldwmwsnkmvieiyfvqbgnox0s2qi8nzwf1d3hcvipvubwikm3g18kgbyi5fhlvn4mb762y46z9196pbv3ppaz0qg72ldbra8ck8ic707a29ugizm5rq8kup307t3xm',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '2yv3tsg0xtq88cbo9j2umgwd7gsrehs3jpndf6m7un2mcbqwsrm2vq4uy110xahb023xftryyupc6sxtk8dfk84ba2c68t0n4evaftq1l76vcup89si3kokwck9dke7y2veq32zqmzjqkmgp8adgvcxupdmjt7aj',
                responsibleUserAccountName: 'd0g5vse5utnt9tfgecz4',
                lastChangeUserAccount: 'xadtlfmie9bgtudbmwhx',
                lastChangedAt: '2020-07-06 18:17:54',
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
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: '3mt4ws67hhjgfjl62hq3m5taf95v447ebpfijxmj145gecki7435cvqlkxjjskc7mlqzpqoeirawn2htk7068bjj8kovpbxxzcfpqiwm1al36ibfz0k8bot4rl4bh2ld8d7lmkq74vszgogvc8ztlee07zz91l60',
                component: 'zum7z1vgum794it7z57ox3ckrumisdn6i35xq8l2p6a5t0g8vhg9lhgmgtk7wanp504qvp1ea6qu6zsvylgmzyknwzwzrt6i7l6y8fq9me1fti55pqz5pwevgpp6gvwpl77cnarpawwpb4xcn1n4jf45t5q0o7k3',
                name: null,
                flowParty: 'efs3du7tc348r97au9rcr7tdbxei5m8ye7j64yubwd6kwcjbrwa3pq7321kwt1hp42v61jo0tiimcvffozbc79uxgx1qrsz426ohkfsijic8y8o257h5hbmya5oe6plaw75wa1ls4ehvg170156x85jvcc679eql',
                flowComponent: '1165rstmp3vvm99hgrsxzkp0huho3binm7p5qm1c436ruquqmiml7odmq63posrx93lu5v0qcnpqtea61aqx6f38dpiagn6yiowajx4ezof1itkqyfl8qlea5dtjimbdb81zbt38oncblsemajcmtdgthlpzxuzo',
                flowInterfaceName: 'sli5s127uwqcptwkt75bfud91hrv3a89zuokyqagu5dx8vfl1h3g7wd42mrgxddc8twf2v4rm3z80famsx7jzv3wsx2yfrai1o8x0iaxq00415oe7ex22gew2wt61linyf7zgvc4sgsmynpq62bi8vcmdjok0a5g',
                flowInterfaceNamespace: 'mdiqshku8p2ymj86iowqji5kq5iefdhxa34pc3fh9uts1y8nxby4d7j7d2nirakvcroz5h5lcxqar1gbappj1trmndw40acspq2gfxvseqwacq362jvde4wmzve4f3pgn1dduoyw5ipq9765y2qis5735ok30tqy',
                adapterType: 'tthmis8alag3435pvycn4gzki2cr7v5ec2p14k67zdii4cqc15y8mvrlw6fc',
                direction: 'RECEIVER',
                transportProtocol: 'edtvvfu6fhkqkhjm2e03qlxlni1l7iob90obe7m5hbmb2fzcml68gje1sg5v',
                messageProtocol: 'gkxho67rc0tujvwi6sogu8rho6v56tctnlqikpq8n5uwm1h18ctg6h51hi76',
                adapterEngineName: '18wm7agft3ncimcuj7qozi1uwkqt7rhpifydhlw200p641z55ja8h6uugdvd8tme3rmsmlkdpgq7i3gp5obq89h2go7cx5ltws2j91qlz4z0ruqysu5jo7w7b3md5xzv8410smgiu757fdmuwc3d0zlza7itprsp',
                url: 'icfn69w7jaj2eohpwzjpgxqcznmxgci7a5wnxwli57l1emczdtqyqkszllfjxrywhb7guedndn5ox6dvabdj3extmosjmngypeyjqhqq4gwm1cjocfk3lr9u87y3133z9jjhpv6e892tj0x0saotlc537eg1obo3sc9qlxhiiqlw7b5nxxstofbwd0kqyljvuk6m9mgjgrf20vz4t9m8mzva6jn0m75fsj8w2mgmozqz5sc02iv7hvlhh8t96r9eztpg9sngy32o50gtpaimnlznnwcoaci7j3c23wsk1z6jbfnvum083y635c438ovo',
                username: 'k51gtrqkhspfwj6gbghpcoq6dmiqrslp9tp4zxjo68nav201p15747txxhlm',
                remoteHost: 'ticqqt22vvypr8vsg9i14x1y20zah9xo5wqnl1hc08kopy2byqi999tr8jwbnxpfpjuvcuxxef9z3ohyk334hali7o9udqayasqgkhnfjj3u1c6vuiur6flspvaqahlulka2jog8nyf6rs9j2oln16lsdaro4oed',
                remotePort: 3805095336,
                directory: 'm2s8faolqjcfvovw6wjunbftnt7gw66wp6xrved9ojwmu2ap2njgd5hnxekj1gcmsjbbcg7p4792fa8wrf6o8lqebhebosdri7160ay1a9jt1yxq6lly60lo84kekd7yvc30tm1blqkw8e54kkaeierkpk4e6iqeekus83o14uw0ea1odbwa1qzd9lrcnp5ztvha3zh67lc9iyci9rxkeiogplgz7w4rmfuf5rird45m85u22e8ky5djgwm6qlbt3s5ln6t233yrn0ecdxmqf5uotx773a03ta1mrjnvmk45oc0fcimc4f7xbxpzm3hbjyr3spinmm7eibtos395l54qtlif7o36x2evcxlcadsptsh19jb4q8s5zz5jw84u9o7xcltxx1djwqtbyhw79q0qb2f8mhtkg2ul9u3v1b3qbl7k42po98z5bl4a4st48248dfwt5ecbj2fckthkshtcx31w9w9pv0ekqhm5ras5x64qzq3yywdtvray3jabyp7cb20pjsoghpjtmgfuz50ystbnl3jw6g9svykw2nns3oqyyd3z5ajdm3m6n5m6uk04rv9zysm3yxs8wty5sp0c91bxzoc48o6togm8lm79s9ez0lg1m9eusip2w6nrbuw0n7g183811qn6m909b55b3oatfeifjeypvj2nb736b9693ik1o2q8pde6u91lr47uihd11xm6jn2qt2w6hhw0l4e601s4uauhfmtzw5siuyukbbzgeg0x5d4ik4ynbmyr8g2j1xqo18ki6sssriojta66kjver3qer7fiqwl6v390q5t0c257lh5dk23c5ifamwerhspazy1o58t11q48lbc7cx3y52hc0gfilzn3ctzswrjjmlcxzhb5y3vg0r4t90cfjuy7m8qd39xhro1wji4redr7qitn1glqio6muc71spnrt5w4phr97v97i99fpp131tfpupsq7b28f24c1cjsl7fzeyfvvv82xkq5qeec93a76juljhsa65j7',
                fileSchema: '398my6p5pjsf4jcqm596jlx2lrf668qbhhnxl9x4thpp6hnegwapaboheudhx46lt3nofn5irf8cpmpijrmbzgspytvazjcybc414lcbzvtppxtbcput5xw8qpozy34wugaxz2hufm7ejlb4ajdx9029kg3xolj04lhh3bhx1f6dkus85ya13v0qoab9m4ngwv5szbrq7q36ifcd4tjeqjkydmedueutvklq3j7tj93q8y966wzxkj0xtjaimpw0pn1pwutgzn2qbnh27doqnpz17kl7yxt85tl0gq9x5msslhs321yqxg9r34dkuauo8g96c3knki19z6vd7u20p54l562cxsgfw72s9ph48cteswqaiu1w36mbp918r46qgs4akz2mt72wvuhx2v0zaes8i1hvo0qth7x5pv163gzjrmnm34ulvbt43h8oivnwk5tq8kf5trhn39w8z5lrp3vvugjyev04z5gzc89miq4qs3w80fetc6y3gpj9lkwgdqyeq78mj5ur2vxgfnw8nd0j0r83weq4vjsv5csvathb74gu6kuzmyc0fapui7e7m2jc4g3x4hr0yheeuqw817mwxh240x31f8nnw11reegz2imrfbdv68p0m1iu126bq9kdv039u5yfnvnj9czm0r3aj1e9wj2fbnutf2513uhn0jq302ho2jdy2gacimrcdro0zhyasrsgupa4cjl9ee09nls0vc9zuaypvrpiqi4el9xoytxeg0kmmzq2bjr2xswrloqv2ndyeqhy36hq4xej4qtjhy4w3e78bh9v52lssmklgpp0cyrzqpiu4wqjj024wxnl2j7991ch962v3674bcgc1ryurwhm94ubmds6veta60cn20vq2av2p8e2bs7jwvj0onaf07abdtzeesr3wjsmtkvhtdjhs5cwamaxag68ie6qbxd8bw6o7gt7ve6rpi6pjnnr92ukf6ndngn1h9hcxfsp1b0vetzj64060sz09efhc5i4ihxbpwsj',
                proxyHost: 'k9odxboqltajmbg0wjqyogw2akpg5uzyxovb6xt409tp5fswhkftj2rd1std',
                proxyPort: 9125315918,
                destination: 't45i876ghok4fb7rkdm1rpdjpbza4bg9uzywtoygf9p8s471kg8cvs7fjf663mn6dc53rhd80e7oar6lrf5w5fazo5p96mgtkf2ifwzullx5srsk85goc99vek628s7mqv3z2phztmz2w7u1qg88kczdm3lem46r',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '5p9q4ujgumb9977hvnbe3holz1a9jr98rqm3kyhj33w46ehhb91fry9g39pboapcx4o3w6g4ylfg2wzt9ztg3t0rdpfunof17lg6uillh63386z8v56f1sep2gqx2vasq0k8ojmgycie5gs8d87cj4n5r0h7oh2y',
                responsibleUserAccountName: 'sb5u4lvsiona7zr69ixu',
                lastChangeUserAccount: '9caujv8lmgmto9ga0s55',
                lastChangedAt: '2020-07-07 12:42:58',
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
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: '1tfuhjtcb8lcehjucvf4l0u333rnnjmgpca9xtz3s5y5wzwv1m2ifbxb9qyznsq7qxvvq4or14uoql18cufmceruk5weun4swsz0y9fmwnaig1raw4nn1wn1jyt6f7ejsh3dzyd5njs1nbhn2xneh6io0ezadpiy',
                component: 'w0ax1s8eqcz7ljk59ucpxa9f9bimm7nq101ozbktoqn65pw312y6oog7jk2tkswhglo7hikad53hufm55e1jhob50p5wz7fzpjspw7bfw8e52oi764ilaq10ufn7738a9v657wumw8v6i5i8am7i9bk395zi2cwz',
                
                flowParty: 'eygvlcv0t4vqmfy98sqpm8gcfz6kdnsatm6tq3il6ik2ycnhkyehdah1dafe9vssidqmaode7bozerw8mj1wuwtw6gspnqk0ho7xbb6i9qifuqxppzwk023b12zdr185gxuoi4rcorkr3c1zxktx4mfmxqwxi5u1',
                flowComponent: 'hq7ecukp8w1tdohpa5wtpkpa0z1eh13z86olplv5g2xe28spptuf3ytwun6gxmqibh46wdthl05zfl2h1l36w6lhvfgoc9r2qopmmj7tuxrtc52kpetewmfy9bz632ponyb8rcznbsuams62fd2adxru5gdc2sit',
                flowInterfaceName: 'f2e0l3huqhesgws74ywxnzl9et187pv5m3s0y0hs29ocjoczkget7ef8rv3om3jnkmw2cm33out5jwjq037yq9eq1qrahlibdj1hst1nit7s5p5hjnf69xn7uoqouaxzq0u3sh97c2xfjuehpe6l0dsfrq87j0ew',
                flowInterfaceNamespace: 'ptzbxgo7jotgug7c4emiayjy4d8ozqxrd5apjaosplgbutz095j3b46dinyub8w1xxh6e92qv9wlxp7wgyt2n7nxb0y1yjwvpsea4k0xcunpfwht13zt2gqwq4ieftf77y1s9ug387glxb2psp5ypqamw7qturw6',
                adapterType: '2gtgqzyni5hwl5m9qfsi8uph7onjxv1hkuun0blh5r30uc4zpvzyppmnr9o9',
                direction: 'RECEIVER',
                transportProtocol: '80ohowzm1trf8o6rccz9xo5t3odn7qviykpza5wiex7c11crtvvj1hs7lrjb',
                messageProtocol: 'vht1pg9ayhfd86lne2cwewbh04a3gy22wmxx2jhpde0v4no1uv567bhzf7hb',
                adapterEngineName: 'ttjh5dkj2i2subkbpxyl8k8150j3b69bsrd3o3wrqjjf2vprryv5h1us912l4blfj3lypcmeg85mhp8gjv2h0ttu9glnj8lyelmwzgijr220db0azzarmpiq8imnyuf7ozyne3kvcinmkxr8xnqtxk0f6xeeukhs',
                url: 'hjkhrn0t44phn5avt258vsilneax7l8a2t943px0y15n3jnm5hol91ufxxki3zbxjc3dzbdyyh8wbgbzdbefsexyelv2zirb1mp345kowk89awa7fafumc75nm1kn9g6epmkeguwk6yp7di2rivxzycq1m4s8sgm75lae6ifffoaxlubsd764iyt0giqwmiwghq4wsck65i6yxlge2rxxpdaonyvhlk6c29w6otw1snxzl3483pcoldm7hon22ayc4t9oohcgttl05d6e1fkl0eolqzh0dhyq3uiod1klln7zd92ucu94urogmec7qlt',
                username: 'yq6d8rek5l3nsdm6pheyosakar93y0pcg1g59cbxzraya24d6r4ric397yi9',
                remoteHost: 'mozmzrmc1lbuk6y6bseomh4sjksbt4scqys18j77rh6b3jge7pxlxw2yrk5zd3nvyjoa2pg2shyo6knoq4b0c19hkxlv59say96bn81bhjquek6npcga5x242wzcguvw8zpg3uvo4702g53ld3obu03pbu5b8scv',
                remotePort: 5647284670,
                directory: '5mevhij22wl15q25djaymzn32ej3e5edp48tgm8t91u9r7fs1japvei0pzabuoartm4gnbg6kn323rsuvd5snq6iz0n0w4hr20o63rnp3z2vgcna6leocndku5bbjse5zmk31moa755t0hgwmgull1w1kg1ppsq76j9fsanfdj0rvzfsvxfq30s291s29p2aueltrsmunshgnugb2rpbylu8p8fa8wsr20mypdlz1i93ncqkx0uxr6lnx1bn9lk3l3xn9wdmxtzcfv7qdnx6mf1hmn55z7yr7ic29uahomuzpzz6nq14ke1rgxt14keq12uwxeafkae56aipm9yv11z5lytxp3wumpqds3r98g85rn6itysmiv5sapo9ij8k7u2vvdsebx1ssz69bn5za4n8tk6xmpl6cf0u4v1n9glouro5dqvt1hi5ugomxyan4d9a80b5ag7gych1bp5sdkdxiw0d82m1rwli1j83ougf0qvej3msup9zpt74qit8bmfh6x6yuusbdn8iqjxsrefufahhbqnc0s9vwygr3rn6nh8mtyu2s0rdgpf9kv5vndvcuo9bcmgw6rnv8dp5x0afqqktmse2pcjmycozr5veyg8xipxzgebovrlxl3i9xxjmxlte4hweigkqfbb02e8tiwn8xmukz5op4lj8jpcbf0kr17wem78t8dbrnhpucwd4ai5dd3sbjddzft67gzvi0uae1wvapt3xqsp68zhwh4h5e1skzrypqco7ktiyalxw4naeimxi3ecttaiohcio0zlb1wzm4kmac8kwbklasku98qjaw7ynbydwmu88c5yjjifrc4ssuag1joxj6wgtbn4gnzins5pbh7h8vi3cwiwt87glfj0w2d834y2x1ypsrfqr6m12lbejhmywyyquzf0olcxodelq13ii3znj7aob10vepwj83e0obzb3fqpexievjcpjo1mspq74667pia2epzaanu6bcp0ih4ozh3dcvf8r72m16j7b6est',
                fileSchema: 'bnxtdwry4zt5k72fccbp1g9bn4d913wl8tmm66ctvjobb9vlkoqs7wd3l7zyih7ekxnsetf9ujofc3y7uecmq2oq8d2yc2pyi9zt37lpeyilzp3b6cd2moe1e9cn67l9mnnxht70v8agiwycgj8914m66cmv17lbnbof75xlqny1hzewk07ofmq2rqlwu4mewducxnyg41mehzs9lfwfa9nlicntdfys4b2rm5f2whgrznvgakilrpl3hgaakbsn2epocar20i63awwqc5bqefdpx2jvqyis1w964a6owtz1oeah019sklyq5z4dhm8j73mbuzzsd4k9khh0cp9g6vq38h67252yh0rp1prkvdos4aow5i64s96oagwhxc4nql77amz1bpm2n72b8su1ax881i4yo3o9sv7zkyu74zq8vnv2rv0lf10zgh7xh0yj1fjwjkorpuxdfca8rfkspn0ic0suykr6b5kdvv5q58de3xwe0nauzzghl22mq9ncaem9kj97yxez2a6hjji0lm4dtrtb3big1d4ya7rm9m68siac2x4do0l1vyeryq21bha8mymbz6w6ckk130vad1cnjdbhizghsgjw1878ofoi1miwh4plg6qdfka5msra847qo9jt9r4ssfcc90og986qujbcwfv0pv8g5a6se047876sjowy1br83djzfcref1sicyq2yp9s1493gsmonxs1od3k5ouoevgg1e5vtoms5yz4czpfttlb7lphvjq7iau8zq8fkla0lrqzi8wjvnv9p8g11dv45yiz7haxxqpfzcelbmqwsx9f5m4n0vo5oghsmexsi9vbjot9xbdkmky3a9xrys2z4ap688rdkzqzivzn0qn9qtlojdnftwkm4cssfxorfw78r433f1h92nckwftxo6xzc0p39neb4ekxnmt8gydvm7zhpm0cl378lzd1s04jnfxgzp6wk40chtl3jjemkhqxympy2e4ma07za7t6qvyzi25hvppddeuw',
                proxyHost: 'lrxvoaqjpi2sofrk981lr82vfmnil99m6gr09edy3kqo7rukivc3unx2yfd0',
                proxyPort: 2649475650,
                destination: 'vsspqqx61ojfcva4h34ay852xohak1kb8hzwx7i1qkpu6agonvmclslz1878xq0bekngonce3xr1emure42agg03n13pzwc5xk46zlqispt6tumxqjgdt61shhg04iufmwzw0w8zq9dfpuopg9fsdeurk8axwlq4',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ps0aqr1xp8suq5oartfrfpcv37wbi4w54o0kfrlwrjkp84g7gw6zcziichp257uhw4vhfv9bb8up6f3h1geulbkvsypa49ftthl7zc4lyibrag123szhcd0l6y3sasadkzcq7lmyzx5c4h1gl0qb3wknsft0ha05',
                responsibleUserAccountName: '9jv0hwp2e4z3s75ap6qd',
                lastChangeUserAccount: 'ppz8o3hh22oz275yjbgd',
                lastChangedAt: '2020-07-07 11:28:29',
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
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: 'quq3tbl9c4tqy1qcy7h8s4hytnlyqobq2bzet0lv7qntqcvzisw1jttk34rqp1sfh7xr7gcmvhhxjkifoyd8mftzt16suozn0njrsgc9po0j6q0fqxpjc1mmkdg209z4a9xdmqgusmnykwa5gyayrfmwxu3iyx4n',
                component: '5913ytft5sbnrtauqxvx0brztkg31o8kjd3v8zlbxasga4je3dona2ifd0jkgg6126d3cyts02fca2mx6oeczz9x3p2os15g6o2u7afnageawjqphox8yb9d3kye6wwiy4ts25dp7fd8gout0mp8ddu58aper19f',
                name: 'xsqtztuxiv4itbawosvnuatfczi2c9kttm6ogfc2zi82ecr2n5zm0nbs81omsx9oxdi3qo5jhojt4xkknhsukee7lwihom3w6g279ep2arudc473gk9gy2bg487mzfwmqz0ji74xmc9qq5dd246vj5sud35lfola',
                flowParty: null,
                flowComponent: 'k8j9ps06i7bhnv7c87uk8wxv4kx93t7d7jv3wxduemj1cbp4vlvxgttcc3ln82glx1a6qpw3oc5wya46vd1hjoe2tsv7knpv8aym82ng6aftb3h8evkcfdvau8zrufnh16iso34cgue8kgvvqvblqyqi3tk6tsrq',
                flowInterfaceName: '6azdaowq81h7pfdo2pt0lhx3ld0qtkdolve0kgspbj6nl5m3bnxlbj04wloqbl13hfcfh5t8oec5h72u51m1vsxwbrd9xmns9yzlivu0jhrfb5qgpj97hwvuiflxkm62qj4xk4bncz4ta7h7pkkp0506xacavjld',
                flowInterfaceNamespace: 'fc3wwnfzlsiqi1qgwypwipbtgrgq801mwljhae4kalpsujkfc4j3nfm3d0tad1vgv923lu5nfgy290taqc7khubzeq19gc4vn2vv7gua43m1w42nww88re6repseweiq981qywh0640lwpriz3ezo2mn1o6ftm2x',
                adapterType: '2mtcmrktnu6cwbvzf0u371q6a130nvle1l0fgm8i4vrff2ima0q0ah9s9mya',
                direction: 'RECEIVER',
                transportProtocol: 'p0h3xcyscjf3mupu587zxz4yhethkk3zgvi12uc1tus440js55r6cwgpccvp',
                messageProtocol: 'wtpkhcrtso4v98mku3uxr8spepjp3315rjs4ypk2g1j3fhhmfi7xdy0fq3ln',
                adapterEngineName: 'dkjr04gfnvis3fiwsilc5hs6yhh101ibj5ch2vfbv5w4te01dcsw4zq9kioeno9mecnxe1kgg9ab47q621mlhmg6qu3tzpteh8lgxz3esajjo69y6r5al0txneogu1q0c95c1wm19tzp1igx5gi0w8l2e4zxgxwc',
                url: 'x8gws3c0zvj2swfpnx3oghdk6v7jcexn1nb6hqghxfza4d1jujly2rsjsei7ilqlz7b49x0ilqdd5eexq1yfubledzffef50sovqd5qn91ktphe7p95zjafmd2cgqk2yteuzx5egrtxgg16k6rzg78m547ujokc0d90rjq3p53mimlcikvqhn2xmp8tvb76inrhjy8sf34aol56qehhyeztkvs2kc286gofwl4pmrxk4x15ucm8p122w6iaem0cg3ezsfspf8e4tt1sswvpxzkyeqk9jfwbwrwo8c0vg4d2d09wpnimkj45hgr47qxx6',
                username: 'i5jdjwrw6v3bscu9u0bhlmcqbwzwopp37cnlv84eim58iwgvbkrvtc7bfztn',
                remoteHost: 'wks0ylfhmpklr51x0zmo7gad1rejrrfx7q4zrp54wtl23k3uqgerr6mdoet32gqka3gjz4jwjycdfa7hftlx7hpaw8r7wkcgcgjoplnr5v4h9ndn12p46lgx9xkyrju2lzqyommin0302u140hfkgjz0u11109cv',
                remotePort: 1634452831,
                directory: '3tb9srzzxb966szfc6ztrw0r7io877v4873hy1wc85bmitejni5vwa30j7gz6u62auf8tfhtkeraugy1zjbsjf3lccwbmxk53u34zdqylwb9lvxrqqn176ryud7jko4lq8d6a139lvybzni7s1z835u8nqbyttt4svo2g3mesbasenqwb00y9j7toiv8h2gnzyqi27ag2nvlfion93on2vhzzqwjl9tb7vtsymx0j7c1kbkawo3ezfihoaldmus16o3co8hy6g360c7io2dvy4zbon73k7fooahdhc2att4a5pfz0m3gjhjb9h7gxubsnzmkh75ikc5uuxe27sx10itnfji3vvcbdu9znjx3vc53sp8a4jh37in4cbytjuk39j08r39vvd7il8syu09tc4aqg46mfsv15kzua8328g74s8mng7w4q0qcz728ysjti9gucs95zems30i610bmubnu1l4rmubjarakauvzfmljdu4hffq0kj280jzz3via0b5o388sge3jvcvlufe5g1jki73h3a71a2j2puxzhznhaqv16qz29osbpknlfujhqfzugdicpsll0t59hhmix3jxgpxo3a5x4z5ctnln9w93atsjkvdh29kjgui3mse06s3yoy0kc90mh1k140ihha0w35fi6g1so31vymyqm5zm5mzt9mzjd5lu7m59i8khhg76gdgxqbpapsy4i5hqgivqn94z3ou019jgm0ff6naz6ggkkedg1x6i7k0k8u7j6wqv4ocwhjftw6sazt0orhzcvty7o124szdxuztp4motb2h83uk3h3pdzdfn6so4rubdoa3sxox7s914ftp1fy4vjay67psgl2dfsq4lfsih6gw7b16wl1mnuw8zyna1afwa38o5o88egs7526nz0xdiv59wtxvcpgzt5w2hsr9v2xmeifjhvb812xytf3cq1t7hui9cc2w2qzqyfarinn7jamlkw6nois2r8vzxwk66ccywad69d6jkqpa8p64n',
                fileSchema: 'ok3043l9j6jt7nvrko89bt0wpgly10fzw83xg0rnf44dd6pcsv7h90iiz4pflxwoka65eb3htn9c5iwc6e7obxfv3i8jg0jygdelxra43u665v9u1ob22z1657ovof6yt2xsznqo38i7voh3oqvdqha09do3lkub1r5nyca0l5f7ylsrk26tc5df4wixawj32z6rxyqj23pdg8j23hrduu46b3kmif2v627zyb7xx8tf9av4t8driatlra1089hzhb5lms4npg022bqtcu6svzuywmc21chcpndvlu669myyb5hao7e6hqxmame0d6875sgpepnk3ftft2sqyx8gysucpzdxeftsfruaem7kug12gginflcnhxsa3opa73pgzh58fsrjo0pluw3p3nqccnin0314x60lqb3rn0taqqqt6i5169zjn3oca08k9gkd1dt34wrjd8wa67zs0sctno0k70u4kkgmosw349k5omwgehq3s169msku2vvznb6efjeub01xnxffz5pvwp4idobkn679oikh9utmrbyl10m23j0y3sq1dwgcmqma7s0at5yh6943panpcfzi1uzzqcbga1iy2qc3gk0n4zy2wlxuicq61pb748ym0ziyhkhzdoew5g2hwunjvxae1wi1eic5jm018717d1xv49c4j6xc8n12wvoludushnm8ula26x0ehwtmmop0ks8ej7d34kfjtadjde4crjfvfhmx3na89ankom5aydp5vvc7acxfere8yd9tu7uz4rxfexgxh6rg5m942ltwctllal5hihbtz4fgkhsch7fbfg7l6mrl28vfnw2a82x4lcp6z7slulytfnp88ti0l8nkizl9ph211h9q11gtyt6zyz6v3ba651whfmwx3550jzg30vyy6srrtcbqdn6bjwg8ogzuohhitv4oa4bq3q91civw7kg7bczwr4l7uo8m84ccawdu0y4aqovswwzdlpqjp4eqildmlmtro4tq48bjkssaboua',
                proxyHost: '79oy6nng6cpkkjlrjoessjityiiltheeealq1jw7aoe0t1b1o42n49k3vqvi',
                proxyPort: 9311306927,
                destination: '7scd0encax6qdxeq7oo6o8w84kafcpiz5dgim3perxjovzbez3pc6khy8uzoxppqxtvbd3kllu0a53vqc7pf11fxnw4kj7td09abscw831oml4pc8rvsgadj4by43eipdffm4lwuhf54yu7olqvjypn9aty08mvj',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ssjfhlwglsi8u8j7haswocu3a26hy0rrrvz0k2yezq3es5htd5y7x7kunrndshwl1du3pj14unhvdm6mflv58oty74i5dum7k2lt16qj1rs5a36obra80vnznvh4enhpi67yg9jb1tal8x9c8mclr3kqlzrzp7tx',
                responsibleUserAccountName: 'pucnkpm44v8fvcmn5006',
                lastChangeUserAccount: '87vh0ph68r2ngzl67ic5',
                lastChangedAt: '2020-07-07 06:54:48',
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
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: 'nu2fblvbt44ql0v4qdvw5gncbq1f2ql6m5uofd6kr4a3q0rge93xydndcwgtvhuk551p6e3ykdvvm8kig5f8qis6azofwp8in5p3xfwpfrxht3dqwtac6g4g3acdt3uh8s6fd9i1t8snnex1awjd8ajguz8x32yk',
                component: 'slglh6jzj68ns5ha2jzhtfhzdq5bgebnpu6npvovih5gketpqxy0bih83n9ar0xv3lkx7s4x6hh791irr7582hfl4mdknphqrz6xs6hm63c3mmu3ucpo55co3f5t4luyf0b2b79x4abme78ch1r2km8jwtjwv78t',
                name: 'tp07slte1c5n2scldkl16s29kk3qx3kqyxr426fq43rcogbtfdege6j8qnk0qzrpgypi4wzxv9moabxhicpy7zzn74v534maakrcmnwprmq8w9bjmbe1amxixq8ivvlccvj5rqew29zdlrzsj7fgukyd6nujtrxv',
                
                flowComponent: 's30hl42l5t4j4q9xfp9612xkzd3m5ijmeahjuyrutupbhw3oa62g5rpvl6wb9h84lcslf7kcp68nrf7abl3sh16ttdnsnahtk55d2t2hv2i1vlou9asfww6fl67azuhkhwhnmtp2ej83poriawldpzbckinxhe32',
                flowInterfaceName: '4pgxu4zy0fc64ggl256b64rkgumr4kj8ln7x0ejqb8sddkn11clqf6rcw040rgqhvrk7t0h1idngxmt6bdag0ftjpc6zbw87oc8ddixqt16jnz0mrjbty4umdusfpwuw4zb70gkmwy4o62e2ejnsju4iuohkxq2u',
                flowInterfaceNamespace: 'p9dljf0o6hlviu6f19glh0nwplv2iybtdxtct165cusr1s7o7ov7b9u423tev9yvui0zvpldpswg2e3o63osyu1loyckv067qty0tvqu31b5sy29q7jw2k58cyf1h0n9lkcv2myg61qc7n330adq6owuseaig0ug',
                adapterType: 'xn1ndlcrdudyu5gtbhxvdp1hgln9tvbdu9c0bsox89amm6kgbg1yptusy96z',
                direction: 'SENDER',
                transportProtocol: 'uj3vlwy0bkx73uboe50xpb7kqe618hx01f2vtkhwr3897pwst5idzwsayagp',
                messageProtocol: 'rz39td85n4zse9aujf870pt5l4b8bah5adxjmozjexnzjx7jbeo0f9xu30h0',
                adapterEngineName: 'jsnxexp8gpbocc1x34doi7j6rzuhmm5c5tut4y82445g4r8tm0j74svrs8864ly9vri6440nsfeix10itcnrsombhw6lec6b9uoceqjvtfisj3wvpyhk5oktf54owz51rypgwed5yqea3xj2p79c8xbt3zmjccej',
                url: '4rrf3wpkyw54mpnr9k8t0pvvzhsxmvqg5hbmm0zu0eibdcovzujt32185edwvzfbvag150k3wdjkpga4uo5joxnap18xhxzil49n3rqt4ecoqo73jeslme0a69cki19sp216fkmznyq0whk54ku7d2skafbk6g611eqr83br7hx310yl3lalksynohjqiiu88y1s50y09fr8iitvus8r3ac4lilsy1bhs8zi8l63esv4fih6e4yqmwv0cdc05ilsj1fm0a6sfo9hb6zfsv2qjenqa97r2ci51ul0waq7aisv3oxjxykihay1kozfsb3k',
                username: 'ogooej6a227k5p23i5pt8xi323xb3azn4ucvea8u5y0rpqjcr2ytd0r9c1us',
                remoteHost: 'ey4ua1ckwop2ey274vt0er9qtabfmvp6u7dppvt4eyie7rbodv5pijn4jv7ipgd9nqn95qci0obppdu9r4t8tw8bevw1xdlwxxei07qrmggbu9s8kofioso8qsjx5wpdtsddf0i7didvk8d2fnmmh6mb84eowipw',
                remotePort: 8011832715,
                directory: 'zduiyyjb669j0f16ld3ut31s4r39mmkmjep84jhbbelsn7ck2liire6p0cwt37tsw9fhx0f3527qp401zjx7gx693d4cl1bmruwqtjpl5r8akbqjl5sq3rx31nghx0z5hw6tywrryu79pgsz3vr3ovwvhubvfea7jjec410yztg9azzt1dhjqk0mp57ycca6suq8n4no2e1lowzi0bxhmibgtkofuegtrddh9q2v7o7xfk50qispj4w8qhzdi0904lrcqdtcho7sz2bqx9bxqg8ipxc0ifforhigbgwsfhyolsbdvx753s1vqo5tvxk29d5pkyg899q8sqef7yf3zlkhojjnmd02a92xdgftk9hxnls5w0a7t3xnnsjlq5bnq2kzdtdtotdsgl63veqp99ijb5e2olr5d0he3m0icpg539ugklgp6g7p5qx6hgb8yjbt09c7ef2pwzby9n59sdiibp1h0u6wlpmgg1d8jinimqzkrbs2nb388wfy0293qfel5y93q7x7nqxyai3aep5j0ekd855wy342ht4xs2f0oy0oyza6e42y3j4vexwyiuq404vywdik03au9o7jjggi7weniwpx7ik4watfr71o7ozs3wfn7cuy0ef8wltdiiddm6jb7ntn24wtzd8xg2ea4rzquumfmma4tgdn5j7w9bsu7xgqo71ucblacgfmxv51pthd7khqywl7p07r2hn3stz7f7p66v0nzqjif4p3yq309x6ntozkq304c8zwqar1gnm36ieh6b7tppss79bodvknqy8j41uo0kgtuzfto13lis4u6pz08d16sbvwfkdpayad1geq3cvqrd6axkzneo80kfa9eugplh402kc3p2oqu47uryi4fevd9qpwrlqysu5apeawlmyf057sbq2yjsm8rlbjzlkrn342jcb1n4ecrdrr7laogrbqmtj2wemj3rn1wxlce0gpe86twh6wsxsdrvh8rwa8pnxvze6i8xii5dy9w1zgjbbwhw5d',
                fileSchema: 'lj6suv3s7mxnhbzdc2kbrq4y1tmlhelx321gxpe73zu7x4mt03xcx2keu9ckwbvkw86x0iir4zhn6ovtfee005sdwsenn7m29jh5a6yv0ly7eny06j24972cfy7ul6qeyme7pjk4c3soocuv7w7b2vm8ayxmlliz6nw3368rymcg2k427m6l5h1nj3jsjua6baky7tqtqf26ctac2miqlc29bdq15ukwwm5ajvatvi2f4fbu8xg2di39h2nqpmw84lpe5tzea1nfwq2zryopvmmkdxzymulhkm25mloswno9aqgespipcx5uxgcnqr4vdswlxlnqield7armok95de33k84nr14pa2617ezb3ke6e144d7orhue7qv2p00amskw6to7n3hk6l6p63wnp92tgs6c6wnnvhi0aa6d2nsytt6mvtbfc9vyg942544pxpbfla7qdcsy6fdg8rkgkc89lwdlz1d7n0ky5h8zbiozoqzzdglz9fbsiq2tbq8ndb1x18izqb9kiuk201763dpa72tzpdgmnqwjqeta85w6193o9hssacmor0phdibxifomule5bjm9fjay4a8efmrzms1lavi5omo520g3mkoeh69cj5906im56x6qx1kuautv42c0cr8d0pqvosz5fu7yivmne3g9kcco7eb8kyxjhooulcr6vus1hcmhbgkt57kjtcdd17iqxoz9bz8j7a5ety9uxcnpv0c6qzjrvulsab26cps9lwl8f6j96btu1o4xf2pplasm5wc1ahwmpfodhz2fz90nzir2d673v53j6qcgjgmdt6vyq5vw4qy9e9la6xgyno3aahhqb1se5tuk6vfy89vz9umzqtvom8suhjn5r4r3wi3j339q4oqj18edfp7uhs71ysl75mt726z2q3y2kwdhkynsyfxm5c4a0sx14yiepee0i87c0tgmr74lzzupzetumafztogdrueg5dsbwwps0uiporudus15fgci3vxfc430qsovrz2la',
                proxyHost: 'a8f7kghi2k1il1yli7fs27cwjggyyl2mejl4nwynnyoluv511ks18ukscvzx',
                proxyPort: 2565299320,
                destination: '073ovl0jmbzsfmn7dw2n67077mnemnzwx3za1tvpilflys3pifyku0ib2hd0qk12z1y8xegm1vnlt6o8kr6trz2nm1aqchwd8c5cdjf83lp1qi9eadlm51ltbf3fn9ckvw652k1pwai3k5kekkcd3o2ralyptk73',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'gspaje57ad3rlj57ldvkcnw650x4ha0d39x2zxiaia7kwnro0orvj2src3uek9pvkb2o3rxrshf8aid28ov3dgg36wffuw3g687alefntqiuiv70friy4jhjshs4lglzh2rm7nc86c0q8l5b1iimro03t0dj2xzq',
                responsibleUserAccountName: 'z6zmr89xtry5voy5jut5',
                lastChangeUserAccount: 'ujx44gy6chao9ky0oy08',
                lastChangedAt: '2020-07-07 14:08:08',
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
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: 'ct5t1dx2xzbqcsi2ooqjbf2fjwtj3teniooqcd6ff79zmshsg51k3pizb3725jod97oo4ewgqn96yfrsput0hbeh0l2yeu5vox1q4k0ardq1j0j8cd61c0bwg0lh8yp8mjbmg6mq5al11xqdbxrsakv4yg50dyzl',
                component: 'ta7moevy3jisf7u3m6qkovnkn02a5zwdjzvrfesx59k8y31rpb1qalptknnlmeqtexdoj66b17r3kvg1o88uci5y6p66s0j5tdpbqg3qfp9o8e5ckeo1b643syrnulkoic7fppvcucvdqjt7y7us87ulcf2tnhzm',
                name: 'ardv46qeq69him2xp63aiaa9crouw4vwreyjjj15c8mcc6w7abmbv6a9vkiianjs8a6oh22a5t4sqmsgi3uy9iu16zd9pqw7enci06isiiexic7nc4rf13l7h8qmlleojn4exh4xe7tf35mq8astibwqj0pdor0m',
                flowParty: 'b3d34joazd2b44upkr1svfzn7gbz9vpswoch2f1lsdr8jt1o2hsz3luykxbbfhu8murfa2ypqxifecpcb1otnkqhvrho18i50do91owyyqzuzxjzws14gh0vlx1duoyt9u5cn565oh2uzdkh1pwtua4nug59tq3v',
                flowComponent: null,
                flowInterfaceName: '854xcj19k4b218r8z8r8m2tehensegjpoo6aizfn5ysbwtugbledkn6h9kc73y5bbtcoeaw6m8h9hbki86lkcj35z9iyoqdeoaoe01feomfeaegj5c9zgpqvuhfamjkvo5x665adtr4ue3w9ky3tqfupsqwx1gva',
                flowInterfaceNamespace: '8lcngzpxsy1486o4ny9x4s2lpqr0a6rmvwhjcv5je78n36q7qptybiqz5exn497ssispa3m44jjgp9rp70v57pga9la7vtnirm45p4azhmgfuyaffcc2x1sbmqhxaqq7r69lnbrsod4fp9bnfmzszneblz50lirp',
                adapterType: 'qmfhluggtso5dq9f17x2n22lilwedn8bcsene7gp1mt4c8mei61sk5cowsg6',
                direction: 'RECEIVER',
                transportProtocol: '8qr2849cyyduem25h4obo4n9d7o6p0oz6cs5ct5gowca9vbs4jwkce2cfjx0',
                messageProtocol: 'qan4hluw227ibvqqcfvzxc8i5gfwxqj7l5zp3vgzph1u4y9e3qht0nb7r4l2',
                adapterEngineName: '4hjdew9v0hshsev4d21cseokeaz7nxuv1sk73i1w8vf1so9v71jy0uoghr9y45buofp8a5rtpg5zkr4omykmg52tufplwkxldyrzzh658o2wt1207wijjgl5zguv0q7n5q63mxueiauzcy44nr7of29eozrf3xl9',
                url: '07mnm8ogkzxonq610yotdafzg5ghl5jt90jwlky715xdp60koappf13xscff2q34pq59pgw9d0kygj8mnerogabo5oivmfbkhn555njby4uokb0qzjf02rb8w6otxwzyc9x7vc8jarb1izuop1uqiidufc7qpc84qfjcgh8xtu6vwkw64othwf8vi1rn10y0bktq0e4mxe11rql062hkcbfnj6nozo8hvxyy2aaikbeuie88ukorfevi384pn10xzuqymu33k9vc8s1y0xn6nfdsz0blxrw8imn3wpexyh566ide642bkmw620n0bsat',
                username: 'u8xj4oe5ef3fcwl8s370rw0yp1nl0345krx9y24jt5veo854gzetu8bd3bpw',
                remoteHost: '7nairqcqnimix3diskovjvsnovvszlntjvazmm2rpiw50ujunb0m8ye1gy28teger0sosfz94abs2h8bqoyo7jamspautsqqcdt4zzpokj1cht50h3bv38spqiwyvu8nxbprxvmb74b6dyl3q36qujgedit88oz3',
                remotePort: 5183319744,
                directory: 'v9glr6tkz2dn47vwlmhg55g9qjgw0wqnz9y998km9mcotxtb3wawdxtu5ja3dp30u69i9z6bodzpkx2tcc4q3fo42ptjisvw250lcrekxx3yaohqbfeer1zbfbfkbcwjw00nsfxvuj1u180f3h5upkmemvbxqttwixj2xg1kvsdi6dzq1drejh5zslugbsqgsy0n1w68lqyp448aq5c1uqfj3nvyx0i44sbufoseo55pn4ctenill8iiaobl6tq0kw7gijzia97s3fu9hoyos2zlvvw3ug8zef1otdjawbcusci6cpr9d5qly6zwzt0p2yvzr5baetj5g2edpauvulptjnmcql5n106ss5m70kpkovs6ir3uiyekhb669i2q91loua6t2vq5t233u9suikvldb46m4j6zlyvzjg42ctftj271deh2ta0xsppr73o16sfhd7lo9umcutkcy0jdtyy2s8796be5rbrfmp4h9qw29kh43bu7tojomagnkcjy5lqxp6rc8on972vlk1djewz6hr5yvnwopos96zxjmt27n256ouhuq1y8iu5vszdax6lujwt91pghabxjrr5iw95ne18co85wsuyt251deenhjdata1kej0nelqaea4z405e2oop65fx3v901xr960a31txx0c3htk6n68b0xrbmwcuadr63onjk5viue71rm9k8zsqn5ubg1e9fjlenxsekd5bw2hweldmzjzgqhc4xpavmbuew0kp00c7dqx6c9h005c2u2v59uihq7iecznpgl8dqq9qdp242u4cbg93wbo96xmmxxmgfkux0bd3uhxny9l6g06bbt77adkd5z4zx3dqwtzkgel704xsv68runzln8a39iicj822ipc9k61f5sniyulj4z5ahxomdsvjfa6zjm4rjr2j3t7bkm40t5mmkqo41inntz141igqkwhjd3l71pxtuumd4mxr6v2301ls4vu021vahbtlzu679pmq71wwo4p7hk3rpklan',
                fileSchema: 'n5b8eo1hk9p3iamzzxxq07jpdiif009f5rw3e2i0ot6ve9sx791yzlqie63bgv85ea6p40svuuwr6l0yphrxij1vahfz64iah4oyxhcnfat8c3oq00q2rkm2dc70ncmd5211zi5cve85c53h0fbhgwyngx9844egmocpvmnc44kl4zf7oaqq757r5ofxxinotovu76ow18ag8xch2iejipmwsqaamp5stxi4hfeg8kwkwhvzuewz0heyrmi35hsuxrmugcccd2tf4ebcalzptaiob8f3eug3mxh0tbs0lcl4yxdkvwn0frs5kdjlz4jcu6snvjsy5k7h46akreaeqg4patzmii7zflznlpnjal7q0ttpdn32f0ovi91ladmgdzv5c8dwthhkuh9kqbcfpma92bcfpk172f1lfh4pbt1jwze1bi2l2llqi8e5s06ltb2o428iss9ts9cjnnfyccyrvt7bkhkigirh68eckwmfya1samm5sehvaegkh9g1vpxzefze3a2ydrpdicg4m3lrz7w2jimt0yvejmvi8i4jxr9w6lqcxbj6yohen7chk791wry0oyoy4j46alesl50sc274fuzty90phgotzcyt80wxtdwlysg60s90eb2jd7nctshteffbzoq6iryi0cmgi0w9iak4bhq878dubxobn249serw9hilhnkhk4ogp914wv2k8eiv4zog8n8oiezhtj1d8txpfm5x6zq85rmtkw7dbqpq84i4dsrzrhddg7kltt856vl2crfk5arn766z9209k7tc3vc199xpazt2s2yab95o87lbq0w3n0knvo6y2pnld2uphtb3s798nwr5di4e9okmoduszu55b8lvf8oq7xypq65nisw0r3i5rtt7go3qijc15ze6cetl104b083dodcpm6lb1wcq8yokn61as1wxb8p513vdyrnb3pxrxz99yamws81gs7l6scx715lxb065ejclwjvw0cameohir4jchzt5zorvljmj',
                proxyHost: 'rbp2wokdz3d7lg06khgn7l54ie64gbgrwlu83nrhp14uuzbx30enzpbzw82y',
                proxyPort: 1331658854,
                destination: 'vf793jfsjxo40eyv1196jxnu4epy95pgn6zqs2v095uihkvh00j3jak8aa4qnx428sggatyhtud4olxlv80iw58nhh0ruvrq2zmfwn63ig6uvyo64ng6yc67u1xrh6eyt4coi6n9p8hrfrno0bgdfhha7fotjhj7',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'psddi00szj961y79fy2rjv7kysd1iiy7zk4hs7w03p7zxklwlb08dngr96yqu71aqawy2edv2hnudfijki0bk8o1kja6z808tto9hmk73ose7i51135i6i3jrm1gnb6qzx9ncwjt96gtj7asbv3xqqjycumwynm7',
                responsibleUserAccountName: 'diifl9q6t5h2cmqok5qh',
                lastChangeUserAccount: '9mhh8y82et9btp2y5w3c',
                lastChangedAt: '2020-07-07 05:35:03',
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
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: 'ltu8rpgn0s99d8dza2ib6ic7zq25v2mm5vvrewsuwvqa3bkzvmxwqzmg6unup14zo6c4xfj5pcz1oayynj4tlgg7tnoh2ihmzc3gmgwd6zjwanuognyim1xsvnxx8e51ot1pak6vhdirxbbo6nn1m69w99wm4azb',
                component: '43lb8hkga94ujo38yt7q9hs9x8u65uzflxsn6x9m9eeblwsvpadzl6nrbyslotg90o73zwysoxo495w2t4tbjat92elbn7nu4j0f7yu8nbdpcpr3terunf5z5h13hky8eh7wj2dn56do4rond1qu0zt4hli669f2',
                name: 'txkr5v00a6fw2fqnihk8q3dkb3bgfoujihibvmdq4seuaxqr8ac6qnq0dt3dtfscjgcem3r6kkzkr40q0ostl0p0xlbv0papj7zzgbblyqerk1kg16h8uio7a7ygce8i4nqpdr857kazmmouic7uiobpf2b7073m',
                flowParty: 'rivkhevd2w3fxrqme8qchsg5dlcd9up5am6utzgss2wzxfz44uko35lo6diz1rq8v1hugefihpeic1q9ucde1z6mbynuw8dithyzdacpfrdg08ul73n5wti02uqft12unvrtbl0y0g7rtyh4mv51dqvruq4heetr',
                
                flowInterfaceName: '4rv1743b856adtjv0k7ezki902urc26uwj80ftlq8qgmbihpmh7jlx53a6lv76iszwuujdrk5xlmzm3yx16smqpbdfjqwftabhotuli180pnwx6xnggp29ctmkkn8m0xpa2q8h1zo21ckefi8f3ju4ty4dp2k5jq',
                flowInterfaceNamespace: 'xknvzid76sqweq8eu8pdrf3bidhj646ewcaz9qyfyltqqkszbmz6rn18to7lauumog1ugm1eyuotheifwktmqy5kcu06lg6njbfg0ymn6bhhusz4qyydvl8g1h00tp170w5okz8hhudo0mixjypf9we6a7fvut10',
                adapterType: 'q95b9cbc9qmpajnui46s99h3hg3uzwzjz8j8lgxt7ra76n2dzcm5dy2gfljy',
                direction: 'SENDER',
                transportProtocol: '2x1oaldflwxnv5olnv63habbhvx6rjlx4bg54661uwy4wretcxm42kgixuqz',
                messageProtocol: 'qbwlklzcbnuia726nb47qsrmzxrerudztx26u8xlketps6dqonfzkxmd9xsz',
                adapterEngineName: 'ffawtio08uimsyp8xjxk2yfi3noq4bm8my1aajd481gart2tuwqq38mkn645k126xgkgyvweo3fog9urvg781wqjevd2s5rcpunq4tlmyxu6rz8l82ji42z6iz35pvam6ekasem362tsxvk3a7kxfyemjkxhkqj0',
                url: '0t74thje2cwflpxlg2ec3e0hae50i4iqu1u3bsqjpngnxznek0ckxklkf7okg85gm95hgr0guh4pxwvbgzy0wfel7y1fpwde0vq6408c6g19qf0tx3773go00oj2w5e3vgw43l2iovdad412i3ho0zxi296mzesm5q44av6sroy1s8noy3nxsqdwq67b1kjkewtnopdz83siu1w0e7rlcbd6gz9jzrz7xjr7o1m2wq8s96ok4pawl6xowlqb7n7s44iuntnd75nq8hfb11qihlkir9zhb4d5yqzh952n9g805g9xm32nil9m1q2pczap',
                username: 'iz2vayag9w8chrfemqxzilzdbxi9o0mksqwg8yi6bbfiq5k3kbs207cs8g8b',
                remoteHost: 'qhevud06wcs22m7ec3ij217ju5w4pu3lwnrzd40uobr7h5l9f1wf8pkcaqthsayeapyreynbpefhcx9ajn8b53sfq3gjgccwyy6bhvq4zooguxpihrx51xfzs9qin31ek19ph2yyyfd76buc10mzh5x2e4ngp2f5',
                remotePort: 1075366602,
                directory: 'kaaj0tw2h8u8klvwynh205qi7mb767axvobno2eszucbtomwzscntwod40yoa0lkuo4ntry3okn7gsmmnxkbg0exn5l648g0e8utl5m7xao2s1nx5n4pxlthy2d570oydruygw8xnxt2xefbls34kho6753n1oe4qd5f5xy4r6agdz8rvqao7qupx6jt0dbmmvy1uopm525yj8k8mf1r0b8el45e9y79rtau7x5oi771hdq5f2oifhtoc9agx75jwtulm0kq34hukfqpz73hqjxfx1xwwm7e3cc6yr22krxtxuuc6t3kwci4bdj2th6adwwvequl3cgzn6vee75nk6r7imcj3h85vgehz2m8e2sl4gvuoccg8c6r0ecsjucjo98lmey7xla0oxoilu91q26bbq7l1pfjq1bdsjxp2xymd96iuiszm3m4m95lw4aticdnjhmcvx7fx4q1luob6a2qs7o1i7b7emq7ezp8x0t315ulh4000d655ricjtygpajp12c4jgjqeg0qu8lnh7niz0j7lzlbca2yamakdk2bccuwyidz45000jr456b4cskzystluapo0b0196dsh2tmimw0oom2ar07eat177iv9za2iu34btrtlw1mlzeqfjij1oywo6s33bz4eqm2nt7z8oyoc9wvefc8at4ttediah9u4ilql280gbpvaw2lj0rcxnzdriucy8xw0ubmx9w8xm83gxh3bbka5g9nd679a6xfl6vu3zmscf3rsvrgicn4imrjghkwed0vapv1pjnq2z4nyjciuszjhsjws5b2xr20ek3e9qbztk6ik9bx6jc0jhhtypnf4nsb31ccs2ox0tkl6sthtgntuipwqdzkkmezm9v05m8cowotbgkpeb2llvc18jwoa0nlo2g6pux9zso2xyfqmnwa8vyfex4qhd9ijvlv530ykte6cv68ez621hdhr2vqpkak0a16feinzwaz1ono1bxjppdywenof7p94loee7jiugesrlko',
                fileSchema: 'j469w2dzbo5zscvmrjs1o8ukeu6zns7mkuw0hrhpavfxfebvxyh7trlw92za7ysa45k7c9og2rcnou5fdml0x2o1cullsuh2ixawal4ugrglozhc6akkvbmeudojib5i1ipylh617euryj4psbz4qotvelzqwjcbz6k78ove21b73sx94is8ci72wf423qnl0bj8biwiid8m2l78e80hm4vkain5m9u6pwuej5dk0dty84b0993adhphw0ub9r0azo19bq8p692pnipvnznekqx80z3hveg1gmagyrvzrto7j9065f0lwtxi6wdaiveq28lka6iciz4sz43qhnln49170gyl5pbnn6xy94z83j3n6klsy85v7cws6qyjpb5wlrnip5ti6nkv3tnld3jx2pjicxt8y2912eoziy4q0kbmpb57lphf7u5it7idrv2vuoqlt5hgoboepeg2pesza6a0g79zemzmrdzum0beghkerqxjpnzv0v36nzgckic7ftsnbscksy31wawxifigp2l759co9q5988c6ouyjrxogwrtsgktuosh6l9glnj9tlddhnrx3yj4pi9eoj9fu7n3o7un1uwbcd9wtx1uzvo7zdb8vdh0vchwl39zhv1amu1abdku02gr0bglez1kyqpqk0zwk7tekecsg60tai93pdqfhzc9iifthivttgcx7bm7ayzstwm0yynz3gxwq6thukp6cz4wlrwuebil4wksuwoe73xj6tolooqw1o678fry9dvdfdvx1yatwdjgdtd5h11ldo7radf8km3f5ucrxl168wcq1xwnp6ihcn7sou8ewikfz7df5fk1j00ym3ptwfnnxoaqj2t55xm64fr2tnlshi75ef2o3wol98lsv4gqo1ykdb42icm1z7558g657xgy4b5u0c581pk47qzskh2pz3ujmafahzwiq98te2hves7k1f6pdxepi9jvz6axpr8566cb9399i72mb2100h8mzrg30ayysi8moymqx',
                proxyHost: 'slchlcsbg8t3q6mbcd5blpulxhxl3545w1zl6iq8memu74p5hwda17oaasvu',
                proxyPort: 6579474692,
                destination: 'ietgkgqytr3fl485checedx7e2wsovjzo0gtanjhwiv6bg7qbhyhk1wtm68xsdj03o4oath1mvcs7q34zxjkaua6jm9mrvbaaik8gvyaaceqpe6th7n6jsjsn96v2su3ybtep2njtp2jpvjulbl8yfyous5mppem',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'rm0s21weufxi1hrqt9oky13b8objlq11v25arj66l9zdt84ha89kocouy6yf9cs6427ut005gf2b8kvh8ww539z4992rq4agwc17dpa7wfautaujdwjqjvy91wabg6mawnz8yz2jv61j5fyiwignl5b7lchjpmlg',
                responsibleUserAccountName: '50jvf78rnrj1ia1cenhz',
                lastChangeUserAccount: 'xg6nsgb4hxt4q427nno2',
                lastChangedAt: '2020-07-06 19:35:35',
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
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: 'kl2xeqsga6egbe2g6w5vnfmvoy919rhxa59c6bk3ry4ii6ybk7c66fdy0v3m4kt4elzn28etj9te7424bepknfxzarqtgl8j88cojgtdwypb688axo1bvxfusgg8f7bp02hyvhgpy4aadrzpt0hg2rndka1mtfq0',
                component: '2r3c5drlu3noigh5a9ws3z14wx4lycfgdzqyxavmxbim297qawlym4evsu5tmiaxwkw5ukfx0psu0dq19mrdu6qj4exkk8wepvh82aa724qdk24fa02p8ff6e6xgtxygnoxnvabz40sou38qupdm58k9atifcbxt',
                name: 'fj2c9k6jjrx05dyeslslqmnel98p3f3ct3v8p26wu2rck09sgzyjn8zxpo07du09ako9hmktn0063cwe9i6nnzwoi6r6cle6a2ayfju4nl3i4tc4ckdl20ymu0z1nt0bq0ozamiwabd0s4a7sqokbqcnc6xlykde',
                flowParty: '32asrt45y35bks6jxwu16zmepi4m54c8xeufc71jzp4nvqqvboswgazaadk3j3wxhojbx7ke607vuk114v2i6bubaojlfechfowiil2v04z4i9d79xl6qtx9et4vhy3axj5c5yd8qly80900i9rurkhwhcjsjj8s',
                flowComponent: 'pgfnssiy5470z4fqijerhqei7qa5n7ioghpys1zdik5dh2375632s3aeoqabbeea77oex8nosg641324pkdpajb68pjabjdz501h6rq7qd0zog6awv10fhpkzlbf900z68ypo46gplp1x4t9gnltp6auk2g032xz',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'ddcw7s1xmhftj1fe9ud4z75vrj14z91us5uek4grrbrxqpjp1udn7aa2w91d3c5lro9ea1otoj56o0fpror1i07nngw1sdmqpxkanl60pfvub4a035umrc4xsvf1mr4luk6ikdzmk7oj4s4wqhrrh8vvsil99hip',
                adapterType: 'riye9ssylfxphtlmlr9ibs157k5b7v3ck1i3mm8w52w6ikw6eyimjz6enmdu',
                direction: 'SENDER',
                transportProtocol: 'kfhw244bb6jnpyr7glyo0fe5v4fdfsesfhmavh6wyfajlk4e8xxbw5ljytaw',
                messageProtocol: 's532w61ko3ulf1r4wukdl2lck06syyh972i0gjj3milfufh16jnbqjgzye3z',
                adapterEngineName: 'vqp6ftqwngtj227isaue838o225lhbq48fvxiayttl0eamnrb8h5nuodr2t7ukpv7jefjmqvoykbixbhvcc5kpdc5iinykac1chqgijd98qgkno0azwwntvie7ui85b1oyufiygsvgztvlkxaz0epal9ircafmil',
                url: 'r0zspkt2gi8n2woj2cyrzldwjqdpohj96wy0nvb3jjefopv45t7pwqejk381cr8ji8pczv05ng8tqebcap1bx59fgbsoggym9xr1itocbro70w39idvz9wecb8qjq9650mabifjuwmese4q5nsevt6q9q6kkasond8lawvfc65tuarpvxmanaxqnp1bgqw4hxwzuqv5omq26yszhojfd20e5oo8lyx7fowm48rgvq2glk6hoezhbqowawn3pjjfxi6ycynduc3dgd2wpp7zv4cqicv1o44h40je9e7qbr1ypm3xzr22qpcjwacuffdm9',
                username: 'a067ws9o97fvsd90zby2g5v4ph30ocxcy7ox0wh2mpz9lhub6wln6j9mlg3q',
                remoteHost: 'zwabgepu0npwwlrrfk1cwzjhv4seofoj0mfsdhy10eje58r18b787d8jrtlz5xvocmycozksdt1mbxmhpnxuzkav95cgx1hf98padv24hmj5kf37y6d0fj8aorn1hj6rgx3py0423osdbjgkqntobhptvrnr8rq7',
                remotePort: 2418313331,
                directory: 'm7qgqqtz5t4r86ay5wt5ak1en2s8uwob8x6ea4k1stax54g7jfq867q7qc366notzek9x1sao3ea2i0nwuec0pc8mczv4zsj0wuic33yw8sgxawq45iv7i8ne1s1c1pb46sfb5ch1mdrcu6va5u1jc7vog3wx8bwjsvxdl1pxe93wmm9ugh6e9djvlr8sdw86n7v9tg0zylmqqdxmnjumr1wxc0ceytjuqc2ts5drg3xg1p0tv24p387pa4hvc4v7q3wz7tz6hssffp42yodflczhrrcizh2msgx80j1yhqd7x2xnkn679w9jvotqayf0cqd0psz1o5el5fztrhqvi5g5wb9p6i2dmajhad8rr22quvs5r5v5bxsb1hl5vb60i4lcquyg2kquba9tfsyhj2qsfxj47y0flw80hdt78yqgsqh058nkr8y99i6ulx7jw3wqzd4mj8ji0jjyz5czwgvgt623ptw06lyp0vnju9r15fxv8kvawx4l22i27qp4etamm24abh6j8dghpzmxkoh0mk8svais370yo5jf84qpu7dfw7fnpkeq9xupdvd5ez5x1l25va8ufydqqrnjhwodfjwe4909wgcifr51ad7eaxefcrgbgd7sym8i9wkc9tgvnd9p2eg2yl1vowjt9ho5klltrjujhq1zq7othiwhyf8dxj11k8n4oyqrwxxqeuvywilo6dmzfhh2ds7dtw4i3pimou6majyrd0jvyards5l419vlaku20o68lm19s6byk1sui537dapq8jjg3ak4hkto8f6lt038qsbqrn0y2lhhlsxum2nxz46zbxlrleq7zoq4jlajclaknufgw9e6ok7lnofu6z6t07np6k4qey4cv6zsi9hrjqe1fmq6edm6o0wuk37pwvj45qmsk43rs3aj209nofax1u56ccic1aqyx0sjliune3ue6j13pp86piwk6yew7ltu41gwj01i9d03ceb4rrygmo3rtu82g8rsv2867le2wlpztty',
                fileSchema: '4194ybwl5sjn5h5p4nvzxrvizfbwe9gp58z1g88yzqsjh3jd2r0zxuzyn13q3ijyicuypeq6rre1xtzdz7an9lwt7jw9kw4p5ekwd37lqj01p3c3csq8n8yrxnt44y44hrpd7bx2auey7ubrt9i4xmh42uuff55jckdvwdryhsbu6zs31x7v7woj2x29iq881lcvwlhujzpqrmcj4ptehknrpxo18dr8gqg3ya37vb522hi2c0yrbw8mrvfsevkwir2p36n7wkdoxpny68jkodyzpgddm167jbeifqkn3osbnv31u1hqplmm90m28pyuovjin9lahnxnnntcltlkbp2b6hn7kb58fox4ldy9mlukw8zt0jw2ychsom7jedrclgxzbqvplq4b0rv30y6qtv36p9k45s98eufrxzwyofv2ds2u87q7h084j1t9ud70fiz2fzuj9dx8m08p7xztjdpw1v733pos9jjz1khdukgkkasik616w5zfu4j5zyoqptbm322x4tbyyh5o3n35s80caw3pddz96hlpgi5yonqu2wacsbmoa5r59dn3eck972rbk8r6p960yyn8nvbb70k3snecci9rslpa9lbizufnueox7v52aeuhfcpseod3pg2vdh8tod58ya7d1s4delyyb9twwl21fuedscepqpe4jkq6hghkcddl3x6k1j8t6z34ais3g75r4m2w77e6svc6prw72ncqw5n6las2m2rbhil1bk2lyao20ncngnrktjqm8kjdz3m3l4bkshrj2oheazejlzq9c8mlv0w9qjxa43a7lms6iax6eubqnp6i0o19v7228f5mzb1lcguu74r9ikbb07im23p4b1duc4obhykbuhi60l83c2v0m28urjfhydlqs2dk509fddew4zm0siu19pkhsghqyg5igozmmqdy4c0nqrw21e4kkpqsbii68r3ygu1gocrdoif770bxenegjohtojt1wvey09raqfuhgqy94qewtmz4xdtf',
                proxyHost: 'us3sazluda3uoz6926tchegup58b4rxqlpktq0kdgw9uidnt6652iiv27ryp',
                proxyPort: 2722102712,
                destination: 'kz5afss4nnl3rriy9czyo0f5bpo54vqhuuq3at6wvdobbrhwnbnudnf8ropdqt3tgm5tqtafspwpxsfx39jtiltdjpguhk3gzkgbx9tiq9bhiud3at6ifolyduebij5vcaksinxm7dbjqyxwly0xyx1z9jvjdivt',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '0h75hww3kvae6wvq5u82dzbmybbt26qdhhbzuitgdpqtdd7xekgloj2f0b1d9g8yjtfje8oj6ljpst3lo8sa3kpd4uxwmsnjoi2cmd5o2owhi4vid5pd75pg5qxta14esiognruu2a1m2qzmad6zmr1ah9o2lrog',
                responsibleUserAccountName: 'r9xnvvwii17fvk19qwo7',
                lastChangeUserAccount: 'q9ste2pxpqhp3imfyt1v',
                lastChangedAt: '2020-07-07 13:28:12',
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
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: 'bxd2jzropqmgq8v1j2b9tofv9m02g7iu34mdqcnxsbn0w8zpykdob8adr52fbpz0t7pdrjsi3w5x1isjsgpv78vvpqws5eesqmjbk4fcsp85bzleda7hjk288m5elnf8ikzegf4mxn8a92bwcy5rk3ddg0bitlj1',
                component: 'kjzglpvhc837q1posp5cj6doln59sxee4rwko7jfwlfnluw795yy2cvyf5jfr3duq2922wy4yaop42m7l6agh2aicwfo1ga5150d36ofp362jnyyd629kwufuhp702zknhq3qnyuo54tug6b0352bpzgcp4euxko',
                name: '4peq6pisf6xnauppo6k7uedi3rj0sdbgdvylfn4borbhxqq88o49vty60gmf22vqznfskani534kqtkyis3n02gew3um1o1ys0n7ufffec5mh5nzt40mmsco4qifcr5b272oj7z3oau81ygdpjvsgkg6lpbz36he',
                flowParty: 'nuymeqf1gdpcrxvwwrp1k9nnxxtaxmgl07aawvng0xi6iq8ulrer42ngpaae8yfgwgmqm785nrjrwpdh8b957nuxo922d0c5k9tne1dc9vomaf99ahihbq97zurhvbbh4k7fuidb2q5lwyyknuehyfllaqh94f1w',
                flowComponent: 'vnvv6p6icrxqgjrflh8c3qzomtbpcsp3v7o4ney7oqma0cr4pyq5h86jvx4ilnv0y7l4wcfa3ysxifr00cxburk2hefzp0bku7bstrecub95vrcth28yqkpbtlfdpyuzpy4wrdx5t9g1tl57x4f3z1t3qfh075jy',
                
                flowInterfaceNamespace: 'et0hmjkwvvqpzjbvgzn3qvn817yd3vcsdd2rdh7r61gyyigwfecbxaunajz0uzastloa54ugipplzzim2nmkyz6nflxjc9b4pjl5n7izd66gayxn6bs1wz467pp1zvopbh4g15hsmkuq3q6li5alm5oc7lmnxy67',
                adapterType: '0cnl9qhi9rtzyx1z2dicc7gw2dtl9bts9ze0f4v3hc0loclg3p6lv8n2x1am',
                direction: 'RECEIVER',
                transportProtocol: '4blry96bhoabdedtb3abtrnkn4cwmz6wug0zgwb6y3uvso4mksv3vco3vdld',
                messageProtocol: 'lnebf9y82iyl091sb41p48f63wbaz2aonlrgm570yqmbtkw11abgtknketm8',
                adapterEngineName: 'cfp3ijs6s4l5y8h29xwhnurl86cdjkckbjcaygi621ccln5s4inuuzbcb1buaf4r1w5cmaw0j68wzx1h3ikhyx1j4e7nmxe4u007sae9lakoi5hxpui7cqogqg6bn17sm2i8vxyu7ro0fsbmytkxpsfprvnjwc4h',
                url: 'txsqvfiossze2kl9wzqhyd004t3nobcrg7bslqihy2hm0x840j45clcm3u9lwqjokelju571jb3mcmbgdc03bnhlm183mdd0bddoc9rnrywknrbmp2xkctnr6chedxaizo6c9o064vqn9dwy7q9cgirb3x44gn3gp3npaifnavpz7wihrpmpfapnw0rja92jz2iqk7maixsgeifg4ttoo131uxik92qq3oj27ecvc8tbvm9s55dvn89smx40ku4ikyhg74xs6bo5qygkspn0i9pq7a9it1wiak79mbbd1m2mguu75q1n0bk3vh6v17vv',
                username: 'pmsoiuvwarmvb5iz7m1jtqf6sopxpe13sxd5eiodoma3huh4cttl14nc9wtu',
                remoteHost: '0ghwvj9atpkwg7kmi5cjme8zurosp5wv1ejnvs79uwq5lz3fnlbnfm2s99du5daamb8m68uptxowk9c4gfz94nog0xrsth5pb18rwgn8efr792jsnkm1ve2z5nv0nyad2ep9fzot8nutu2vm8cu513mqfpy2srd2',
                remotePort: 3899359010,
                directory: '72xr0xjlmeajqovo3dzr5gpvm101bfnjm5wutuwq53e7don04139jjxh1xmk4lcum55zq3l95r0s528b8zrs09200qk6ch8r9lyfmpo71vxcl1fbpjjjrlla554f1k3h0oy5xwg8szrlqxnlp83nf4n65jks01t1bg61t8rfoyetde5de5pa69c8bm4mtc90y5cuy7vyd0eerugvbupl40161e7j0ke6nipjgsntkyula77b6sh2xvyr4zujwnfz44bz55ec5e77e8kzgtk85imnq0abc5p2594ayyzsb4g89mf98m0y2rrrkx7bly4bdpuq3h6hx1xe8822d21xbaxr2chcpm0ldvthgpabcn8rbjc3wi5iv0vvbujq2xmp4ewb8dll325ic3l2lkp0x9ytj5w9040bgl6gd5xug3p0ykctyx9vhr8mdl5d960sei8br07opsxcki8ia6l2ic3ik1mu4bidwj2r7l5wxse8ylre809v3vl8iwvgin40tnrbht7gslyfdc4aa7gln6fdcuqo2of1wcof93gg76lp0ufkqzi3y2p28qdvo6y8hvyiaphdq04kv60og30lxmrlfzu0g66xal5x7teggrpbyk9fzxx71vhbhctmm763cnrgbpcmfs0arko89h0pxgtazzko1h74gk55m6v0jhvcbid94olt3ttty5mji30bkavpxiswlmx1d2aqm1fbacw8dbfam6unge1evard4celrf5pva5sh899a3qaxecmtq5okrceqkpyc2wupswhugp1dctq1ockaqj2v3jje8uun3abz24c5wcqzu9sw8crpz35jariyws5lb5gvas2x2p99bg37xxau8h2q4esktlt1u0dm2kp1ueu8tznnimsvsqmymyawknl203h31q8hndbjc6d2zen2ed19us2p016pa3rnuapulja8vwnk4bfomj60zz4gr0zwes7b8nbrhw4b0lqhh07u1xjs74wqx327e43cggmubkd0ye622lx',
                fileSchema: 'q8f830hiw8hmrz7gt5rihl4tlx9g4ib9m0z9733kb3if4ezpum8f8138s0q0l75tkujhp329lo1o5tdzrbsrjtmbwfqz3az0ydfdiixd3hrgej3z9wlclschopuwbsf553xqzigd828buoym4vmnb7yxsb021ssxc3hp2cvnsw2uur4araw49gqjh43n31bxd6zj8y8f1t7bovksdnj72vwzjj8h5oaz8g5ikqsb8pb78f42nernrsnk2iesuxeap51ro4g7inwgh2y37lhof7818t5lj2hqa8xsgp2yigkiyip5u794tvwldukx480r1vm4ldtpiltcdjxingsuius4v03xz6mg1t05jret9pu7n0ily2yr9ix5gc87gvtjl6lja2hw2zydm9qxzm19slr8z0caxqde88i45yjc21e9bvqp9wax8x9di8vc45wqwh0evlx6xt5u2fy98jhku01kdke6bxpi2kjd4f8h7zfurrxia9h7wbs61ec5s1me4gttooy4g24dmv8mxah254wabdbpnhh4tekfj346mas320mbt5ha2dp8clhqbdc0jc4iaphlmb8wf7w31tju01o49qejdhtlo2jqxxjvm9ubuq96pjdebythmocl8sonblyr9e42i5wuq0pq0ux5v0s5adbrrjiwinnn5ouf0b5t9f34gqfsvdxp2qmqtpr1fj8l1s2xos71i5u1n5u477kk6jcd62z818onlixfadvlpzgit18g1iiipzr6e1ym15pddfky6d71ct6m9y2i00d8s76niorvg56n9ac48ye3vmz6lg04aqjdz8ax67w97yt1d5v6ytxdy2afdkva0iacglprdl1vpqg7203q09df2skzg6pbe3gtqkej3vpld9bfa5i69557rdgzl1ur6ubr0jsps0ejz1sgri3zp5d5yirmz69wgxzmrwsov7fr0k0450m6138w6p9nr8uo97qbd78ekckqra0yswrr10wrhpy0ike7nkkhi57v5xcx',
                proxyHost: '8loj2wxjkv8j38bxor7fgxj4fogte0ovqawomjpn8eh0ol4k93bj2nyopfsu',
                proxyPort: 1633310011,
                destination: 'd1vd0gc4mtoi8kqg8io35q6qq0xxeofs2ymv0lv1ox4v1wapzi2mj0gp4iy1nbjxz96r9srfm4frfae43n1zw27nwk5am9wepc5566499om8ys6q564ropf5zo306840o32jukry3ycisq5ccepntm2awh46mqnb',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '4qos3op9notl1g73sq6rfs0ujpsozelnxovi467jpo6o6bd76ozeav1l4i297r87v75c6n0ucus0u7wdiqo2jt2k4grq58i4imqa2j66r2icvzh75ac5vev6i580zot2b2qa546iev17ik038slrlljeys4f9aia',
                responsibleUserAccountName: 'lpvgw051lljq327a1918',
                lastChangeUserAccount: 'cwf8yvfe06vf0322eu20',
                lastChangedAt: '2020-07-07 04:37:53',
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
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: '6k65lcpjqqnwhgs0228llbjm0q0ni5292ezmf9tyr9tln4yhae9tn71c2dklcsslaktu16uh00m2ixrceqvyaag4xtyofkgyksr3irx4y2gy946r8x8le0txulwtpyuclp7o6h0fslyppiiqrhdqk8gmgsuddenv',
                component: 'k3gixvz8w374zmvabpv7gtk65m1crja11zb478sbm25rdlmlxplytskcacacslpc1s0q4ns417qh4uq0ms0aftk95kqu2q7k1ct14z9hlujl56jhvz1oksw83f7wjb91uhohy0dgaxl0g9d4zv36dpn11xgjjnfp',
                name: 'a0a3z3ynnpbax0tpsoosqu5jdya7phwo7trtygeqb3a02ql3joo2xo3sniy6lzkt95cmuh1t77ap9bny9jzoz4996t5x5nz5jlhhv14zi0pur2yb76pcqrh3dpwzxkcldjiao1ly6rk2j5d9ce3tv5fp6b620g45',
                flowParty: '82iv3mr831z0u77zkccm9doykkydvkdwpgpkiv8vdotrcofaulc89ucco0i7ti9wfreoxy6bq8nk9y2mjoogntfu7q0xlg79hmatyjw62kouu7oib6drwsn7em7mozn28lttje6e8begds0o8on2137ia2vzloub',
                flowComponent: 'qo80hjk7eaponn568n9isjhjsjdmb1thfddrgjw1hkndhfwcm6wltdut2sjb2f2lbhlr1u4909apl4zj7aia672xpoh4wcddm27lcy2nffisy63be7v3prylwrdnsx6vsd6nmapypn31pvn06qvu36azynmybsa3',
                flowInterfaceName: 'bqfwcpdhv4g3igsmi0d5ubk97u2l7trrzrt7zqm6qls1mira8nvud8jo8xjztljx77d83f61riswqdjc5hsuu0kwjs0mlu5yhxdhn18nja194nckqnr2gy1qjythymr0t1bhedhx8hkxr3xczfm7l9mewer73fup',
                flowInterfaceNamespace: null,
                adapterType: 'fo0s7wv7zwhqb8il46avp8p1dprqqb5c47dh26pcf9stl1gqslixzkrymsrz',
                direction: 'RECEIVER',
                transportProtocol: '0uwgnq0kxnsfh0dff7qnm51tx9c4930frbexzv21bsm9x9zrd21wu3kk6vxk',
                messageProtocol: '85bq5y6qlwnitxsd1qcrpvy4p1ouz48d45v718ve8j5yexcl98gx5473s7pt',
                adapterEngineName: '4q7lnxffo654jnimt7fx5dx811yqh7r0x5vk3xaa83nob6ke1dmgvtf2wlzuh53jqlvfkgfizbuahpnzl4gc3agb3zwp0xckuieuhf1bymwfmx13suiho6fswksbhv8z6r7tjxkv0chq34bkqosfymkek3pp73o2',
                url: 'b6r8qu7ujccmo6rrgghtm9jisnm7fr17kqhtu8prsyj52li8ay6r48av5rqekk9inl8mnvgm8nxodmi7q7qifntdlejx9ky332p56ke4jnz8cb4a2d9ewpvqrwlp6jipoo9tppqwan89ate5f72yxk7adwhm4a357gq00txhhibt0i5dl0fxtazu06hn14yfr6y3a0u7d7kfqbs4rzjvl3mhcadm82y02rpjyzcbjs3hfrnq64f1rq6gzdy2q501in37gol4zbauz4q2fzfyq5ig6pcm8vpbp163cxlzzgek5z792lgaelwz0mnrnf6h',
                username: '3xseetz7w228mfpxmh8snuhyrv99xv3vcj38u1lve24v18c532wyb0qym6ha',
                remoteHost: 'fcdju139arieqq1cyj3n0evui9b6g0g5q4ttdttmmy13my925aqy2lhmx21ri1fi3iago1vphcz2le0tovploilkjdmlgnh4dwjf5w8s4q8681usuhsvhixnzxfkobor2sjidcjw9fwa1dlw17277qi9orahymt3',
                remotePort: 1192292941,
                directory: 'n6hunsqlv1cj9aje74nrro47vcsat07uri8befnl4z45yp7opyfsbtgnnlo54nchahw5ab1fzbb90g5abj2k50z6da3hvnhvesduxc4xq5ren1mlhxgncm60actfj361ti5h0j1myekax4mpxnfp1agzjangragkatf1nhgphm36j80snm9uir79re4l9e5v5w467npmoi4d0kee70vo9pievpqgc6zoftcz7kyty3za0f9uvfbki40q6fm88888krkrx4q21yl0hvi9amuaroplrb8ofmtbie138p164ntfk5v9u0luvwqqd8cjlsbgqe34hudcaubqz3efk21uxzqjpvt75d7ikkcg8a84qhabufte4ktuna85aodwy7mkjfvwavgwl21fvktd1mvqrhb59kxtn4td8z6wijwjx7mouisd3c6gcu740xpmmjfptavko0998okt4y0zmdidao7oskdtm03m55w1939gonw88s2u6c3zanitncd5le0ghggxhyzb59qmo434ijy28shkdtxpcl5xahw13kaiwe2on1nb6g23z1mux1ixtxl8mk1dayeg6jwc52oku8f1priuxqylws7bk1wqgwxbz20vodmrzpzw01wc2bzsdagtp6wz3f1r1rv3jboactae289t0ux2ncamrhlm02d4k685mg107sitx30cqfcuqk3af6xapxhkcvopynxyh6hdvbxiikn1z98jl63u3h465uu6v4bxpkjxkvdd771sxfh6yf45lcqah4n5tea2hmrd92vcvk7gdv7s568ga0acya84wj8eyh03130tbem9jbnz3a1tgpr76gwmedz4zc9l9a0qsn23qigdk8syc99ezwrl9p8jv9mo5r8szfov8xvq1bs7fcr86o9b7icls0ww36lzoq2bno9wiqzgv1d82j6vuj5gbjottxh0gg4bppknsb92qoklxjrwic7ylzl38xny00oqr9zgeskhzzfd3i1ycpbk5dazig8wm91ms2tc',
                fileSchema: 'pu0and7mmw54g0b3zyfb9vj1vplmrmqhzzkywnp3tjlarbnfievrqaieerntjjxj60wgl122b811o6y4u3ainev2a9emhf7xso6y7fzhxhc64cya0o9v9osy1lnf5wrwitsk2z3km8itm0pi6v33rzw0axtzxy2lvzdt0q0mtf2q6x6w9pp3qh5zxq7of7ko419td0mplmh12lgtq2u9lp8c4t79ogcc5hcpy228xb9xhtoi1onw17he7kxf9t5d1wca3dypvsvtn5mgh62jdo1lh0vsw3jnnbyrzmgq589357lnxsly2iy8rqzw9rvn7i0r4yytd4h4xeoi4qhdzs24xldyle5hu55z8kawudrcw67uhi7x2r93tllozhffkb6c40xfdgjqu3tjgviuxncplnscektdh22iycvdp6aidqhm8zvpxichjzan7utzhey2birpkk44sknu7pxelsmoay0dsxc57pc93yffc450xzd6yk1cww60906e3ne4dgyrv93t2s89y8b9n54s95wij85ed1luw71tao0j7vf50gghdvpxiqn5g8lhatikyc74dxnrivdtwvucns6il1pq7qilcvco2dwacgnj6epinm2q8voanwxqvjhsrfx7mf40j4hfzse7eu6dk0ldyrj7szf6hrmsqnrwozpm5vdbgghrsqn6z29fdjriragmtegxfre2rtercu4aksxzgalyfz3mk6ges0uqz7v6dmqxjaaly3bpgtb1o9b1e5gf2qxkfoa7hdszf0cqdncoguzapbrg6ysg10k2nv1b3ov1xo9kicjt18bc0ru8crl1nt4l5n7erojfz6e1es6o4p7wbntw6vmfre17t031uansifa9asim4nn3lfnfcpi9fukw13e0tomn29effz954e8r4chswtdilsy5wrvompd7y32j36rofeay1dmk0pat8parzhl5vsc8iv69m60vubx1wkmsxhiyq8sgo8hd4xb8kuo6a0ptzl1ncg8cwar9',
                proxyHost: 'i7v90z09vojx32g4gksfxne7scop2lxkecma4r6dsb4t0jbntf3zy67jyxsj',
                proxyPort: 4369871614,
                destination: 'dffp7hn4uzy7n819qhk9sfog17lrn3c710m7xrcmmnr7jg5514cvvt8f3hghwbj4rvxaswcbp6wtvwk7hsxstc3hgkeiqm5n3w0b6tfh5wsicqo49i37ryaczx7ovnyihoxvtiy71q9d64b4amcyr504g8840jlu',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '62bieuhguoj9qnhlxpsum07xep48vp24k1qujsran4ywhza749jjawxw832c0gy3hp7zec23mcqpo0v7tllwj6a1ccchf65qunho1s4x9r9ylem3iv4zzmim56ye2idicua9zunez56hsfyxssx5q6p6gyx2gz7j',
                responsibleUserAccountName: '58qqziblf8943t1xhwqu',
                lastChangeUserAccount: '4ft74kxobx0ja6zrroiv',
                lastChangedAt: '2020-07-06 20:54:17',
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
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: 'ts1r09euwd3emr5grny1way5owggwzlzvk7s6x87vznm5u2nwc7owh6x4tn32uszsmmfuurkmq40apqghn5h2ijkql0w9jyc97vdq56hm5fe2cd8h3umfp21rajnrqk9gp8f7h3w4ca63u37ynza1y59padnnfrk',
                component: 'cxhnqmt2n47ubuc9g79saghysutrnzhhtk2iio7mooeg3k9y49j6h6ui7zejokq5dfh3tccxmdnkeqq1rtztxbv2rrssb5f77c6ka0paya0wtrkr4thtn2h8bawnz1b6c1xomcigkyixn2df5wx2syc37j7iog4k',
                name: 'qwbnj1erqm4ayayxou02v9o883y24rgsz51kjiwgliy5ig9taruuhlxdl0xn8zeaebjqxprkbamc7h3ufsihfsjnre72e9umcuboa9wp90ohfc2gno1uhzjhcsqfvrulje2fzhf6ojj9y09n9msl75wrslv6a2zi',
                flowParty: 'fzxjhukame6496il8jd8vths0yk6vl2lug64kfroy7s49sq7i3e307vxdrxwxz191mqqatevtfk6mye327bou21raa0pu7xjkjmn3on6rx69sqb6vsueekbpr61jcb7nkinmmdmw0irb4y78hl221l68vpkhhb2a',
                flowComponent: '63ws4rnshaz1i45ivntmumapsn0ms0syg8t4rqtgi8wnij0efscjr0kch3lnvnhk0tonimovuhmp7r3k215b0h20ecog9u9nyh2kpnalogy0r91epxe3a17wn9b4kzldyk81prmu6qyhohr45vrgq8ewfn43qtsj',
                flowInterfaceName: 'xpn2covzxci5rsbbw9gh2fdt5o19qv2pzzbmri2t0vk6h9og8agn9itk04ci7xtixapor6uhru5ro36bzx9f9qtrmjmbfioslbzff4nxt9zwdp7gu4e0otsrmjs7pb56k1l0phkrj9zjya39wcbja0315wm8grvh',
                
                adapterType: 'q9bwunlaz6cw3obfz6v9ab347rjzpeioncnsnpuczoz1kxviwxy8wf8ndz8c',
                direction: 'SENDER',
                transportProtocol: 'fdh878chj9zvfqty508133o05se6qff5axdqo05ya9cnueon6hdwpmsuc9y0',
                messageProtocol: 'yn4np8idm9rm2qf859fg6xgi1xilv4437bj3y21vhjy6ay7r0zkew0iovnmw',
                adapterEngineName: 'sqqu1qejh51zxpvbpv6pmpedqusm11kiorn5m6u5mhhmc32u30u2z9tallksg3tw3qphj3y6tbrfhu34v1xvpytqlvzfpeazoftpgllsw74ipusrs456nuuaclubmbl8qfuihgk5qbxzs3ed83ly68tmvq1u1bum',
                url: '89y6j2t5n0ce4yifut16y1l5t2c3eijt5uj9plf11omdw2r12iw1a4jim5e7123mb2k262ob2affo5wnugwdbieru8tobv23gt4bu2bet94ioqcawe7uogd0gj5m7yy6haw08d3a5gq8h73x9euwhvqbkh53jqp7zftgbonwdj4lef2jzb6f5lcy6lbemy14olaa8qoh3h9i7agvtixz061uxmvauvyx57wgpkffg06vbgpx45my6vob2y6dp1g5txhdzrgrl524u581u20artgnzuo2fsl10khy5xnqto5u8c2l17g5sfizewxnzjpz',
                username: 'dgn13czhfkutw9iqmq8gdb74mjj8jw1bzlz95pcy2z32vy7noj4kckvldf21',
                remoteHost: '9oz4w0dh1thfqlzg01muih5s5ft5ie0uei9bjpytvc184ofhieyqogjw3eux3q86nxebnc45dzmb4xsxcewvifsxkx8dnu3nk4izqjxdognw1xczysh10afh7ia4evtahiji6io0qgsz5gg2kaw81l57vr1p1d1m',
                remotePort: 6561653185,
                directory: 'mxf7wmrx9rdck39o0d92b8zwtxlx4rpclvkqop0lnl2lcfz6gv8sd8xvswlha9bxbcx6rzzmlaoxz214cg3obpvdx26o85g1cjwzyx5lxokgaypxbxeq84qnakhevxorhtplxmf6xahxlpqc5xovl5yro4tp1fb3l9v9fkmr8nfuxjmnz9dl18r3mpkf8bthvczi46zi00tmxdrfcfjgh3qmkpqwudk39117o0vhur73ulncdnb6h4dugkj68fjs2slej9ljd4svztzfl3zfmm7bl52xgxyr9pkdihzo2dchy30sp06qvk45gbtveyvptpcsrynsc3nkq7pqgte5drzwj2h3546o1pffgvo743z5ronip43y4ktxsoyjc0esi34phh9c8v9sgnyzd55asynuynbsdq46n55std9guijfi6fhuebuzuloyr6qlf0i3jn6bedpwao6ncxhevrs8zw2r3wuyq8rgniqbv8ldrp4rs2iwevnyyt3j2yz4akh7rohkelheevkju9r2cjn3cfu5vmpgloiyprcfv511hw211v7aa6ocqh9c4g6hhduc69lhw78p4cd68ushh6fyhpbcrrrrhgd1jbfghebtwlbxxdw0ls31vk6j2djcp6pa2zopgop6afb4nioivm2uraudmuhah6maaj4eqzy2yep91ea1hsdixkv996v4a6z74w20n0leghvhmj9jztyzccycn6ao528oloyd9kxy1dc3u0owwa0p1befbklg29u7jk9hdu7umw3071rcjcyejm4xejjb6n8xnarln4suk93evxrnei6j4vyznytolzh477jag9ylx1f3bjte3ij34rphdwp60lm5bou6q9ny85q9e0q0zzaeglexyg62lipbmz9baa3z66k7m81cvtk4fg5dri4j61xt270tuxjf4j09mnjtga2eo9shpmzf67469lvz16b33199a5wm6f9r3tj1oau4ulb74spbo0l6rwz9nh8nxokc1kq8o1ddus5',
                fileSchema: '153l2oq3z6jpri3fjlgodo6nbyrk4nyx1t3yzafuflpokzdro4hxh41cad5zyl96951y2wo4hk2n5w0s46bczckb67vrkrqpjhyt0ilwtnwp2jeq9cxhgh7du19al3azd1sbbwsot1ywz7sz8l0bzvhs6ugsoj8m7ejyhwi2qve6kfh7s6pmhehbbcnd8snqsdljj2w1ndhvu42f3ghazli3ts8uno5j4r5tsofudlizsm88p9h6zjktl25duo0xfjkjub9eff1lpbw2484hrlb08la1f3tv17wu5p0q0tifg61c70sj2idigvvqkcsj0ienxbs6gqe9l910346bfmyowxacopqd3ynxskw7p2i1xrwbx1lkoi44ps0l5uall7y1sl9l2epxxmdnwd8cjt4jc1qhpbd9skl3av1ntpm5vfcxb71evitpfq4cz5xab9ufvhex60gu2eeeeg73xc4qye4c3irzawhjtzti8xqc95zwb0eltwy012yad2qa6tno1uhfyxrgoljppzfxv10o4n0j5zy3q9l5gt3zz3jlh1xc3nq1p9lgpeub8pj9wwvlthhth0xhsl7fj43adhfsogg5z7ge4222mxte32swd064243g40owpe0oa1pdmim0dtdqhoumxx89cl0cb1mnay3kl0157rpo6mk4x4tavoeebsk25p4qzx66ybsjqinw64ho9kb22ewnaaakgrbx93668ggxwmo998pn3qy62aferl0k79db6bf9stvdd5o6umuwk405qx1buo0w5wairr8agxdl5djw0272fphegq6o33a9lf1qoe33o7lak3lz165t0lf5r7ygl1ukputsxhc4x99wiwndluiqvala3z70bl17jhpc5ox9ou7ych9lxj0nf3scokx5vcyd4kqrgqqdnjac1qxdbrd8bvkl9kno9kg2ppg6f6el4j2wo3bhbazhcpblgocu0az65csj4y9ofe62dxekt7j1lxitng3mb1rtwtuzj4h93h6l',
                proxyHost: '1utgdy0yhunxmen7eolzbo0ll9q74djm90tgoib67yzhig6k3t5aaqglap9f',
                proxyPort: 5794225973,
                destination: '53ly7p1ssfbake57i7osikuqhrgnzzqrj5e3hjqi6v9e4829o82uav9au1gedamexoegwge1bupamv2t76bupu5mnclvb0c2y0wqgoy3vhrmhl1u6ii7ewb62cbyzqnj8u0yzo5q86ff7b3dzl19jhn9gxglzh3q',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'w8d2r4c17g8vet6ucw7e51g5b6qop9gbin6xkn6fo4h6n5p56veq4mrcwirghkqlrdey8ro4b8snbihiahbyruv6v4s9rqq8lxpvflkyzjx0n0v30jttfjcl7m2h01fdn406ni6l3b6dxa7ry2v2on1vpl6zhkad',
                responsibleUserAccountName: 'njqa8hy30m4c30603k0p',
                lastChangeUserAccount: '2v6atnluiga05d6yervr',
                lastChangedAt: '2020-07-06 18:24:58',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDirection property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: 'd0o7gbtdm34wfezs2lb3ooanr9bxby5wtgutp6o335aov0fcvtpzq7git1hw8d65apzzfv7o4mg79jm8aapb8x6w82o9rew5tiyo1spd6474r4f65ivjxivvygy971q9qg28yqtj26vvsfx5x0nu3ux5ricizi3y',
                component: '8nwvuvq6058fhpa7sfmcxbdgi70kwp162vrx2yomw64mepgoutav3973r7q23h6erciuaz9qbcuxb6nnenfrvcxfcrw0y0zs9jlolfvu3xxk4v50xoirntuybhiqp7gzihvk5gj6so1znxredrvgmx06hzz5404t',
                name: '2lr26qoqt3lqbj1bcmjxj74tefazael6qrxbyrjnguhixl1of28c1ewdr4czvjvovb4h2posj3zjj6ih1citm8sr3tv424ogk0duole0wgphxof1if1cxgmkraikznumx5xkzll941v89wtpmjqc8udsfmtffvi4',
                flowParty: '1iqhbz1h63zkx9p0i9ihje1jb6r4dt8vzt2snh5w1kz00r9nkxb74p80g4gt3zeambv78x0uw5yns0ps5zvpwqvlrendh845ydzxnil8wtcm64fmo9ul4cb4g33vighnfy66mxlejgz3ovw5ze0zh50tv362kx4b',
                flowComponent: 'izrftnwsbgggdys2kh96l0r8cmr8umxly807fm71sqvzduf8la4iz3j4390vvdvvqho0dpn0daohdlqu7y4o5kq5m7yd3iq4hu0w0nugo56veravqjjceyba54apw0md88fbontok92m0onbcbwaea3zh731wy86',
                flowInterfaceName: 'ozz477k319nur7pni2eav6gg56nfy79rj9ojhtq4ye44oip5jym3at8uj2vnsg1qg69cbddn30zsmn060d6iju42689uxnkwoswhmfht6mj6qn49kx7sov01j0lcn46vin5vcbooij65g25x25023p388838xdyl',
                flowInterfaceNamespace: '012zps4n48ouflky2u4b1wsryydh764qzdnzmk0s2wua2mvh5qs1gcfvkicpvptrktn0tnn73vsicckm8dz17mqgmw6cp877h3ebv3o1ypne6t4zzak60wirxbjszq7kq7r6urttajqiz4oot6ycccbaevmhlyqy',
                adapterType: 'y79tnyvax6iae7r1moin154jjnxkzcp7p6lss2bgka7fn5k86yxzuw5c1thq',
                direction: null,
                transportProtocol: 'v8myq89u4mjshzz67ryvldmek9kq74vt97g9d6jibxqbm2ekeht16sx5r218',
                messageProtocol: 'ntxnau0izcziwu1emwir60o99dpbcxb7qc9ggzxj13z4dpknf5bwwkrppcvm',
                adapterEngineName: 'nitb8pi6quhylk819vdwxjts6oqw72lmq0am99v1xu5tayghiq91ti88kemorntryty2ejx4hb0d68truww8azr17wuqss4qy69y61e1enhbu8l46vfwjxphtho3pxgfq8hos19ah88q2651v45lkuxdbrk66j2s',
                url: 'nv1wx0w7nhgvm9j225ul5xzrn1dg0gxwv420kiop0ifwmnk7vj7tjpx2lfng18ozb5gi7l7r1hey0qblbd0ovxdnd2xm1w4jdoqeitte5u9ljvmzkx4mp5edpvbsndsfwmkkxscznf81h2z3cm33ohw8qq7h1np682my1s1ujw3nezpl3gnf5d3wt9uwctj5gthqhd939be344nly9ic85q7h7538ijxp9f4iamo2yb5m9nvog4q6lgbpk5fn8raffseoennfxt4b650ew4wonuceqdig5k912a9hh1wg6yqk6mee92rgq26rz4zl5pz',
                username: '7mk4viyomr0qp51dg2ijn3f0mnr276hoq7nkxd6mtsz3yh835osymfo3tjlx',
                remoteHost: '92xa0n16m3711xkrmzk95kf9scdsfgc165d65ooqret8lh1xke8cvcdrj4h9nzgei3z0ggg82efb0ri8gjcruwre2vub9d3u3deeuav744n2huf32e2o50u9xo1ul5oqhlx9i67egl1iduap5hw9wq60d5dh4aav',
                remotePort: 9668819434,
                directory: '6n84x27kqtbwboe2fxgx0aasnatknsgf708k0v865jnmiouxx05ayz5li9ncdiu22pit5lkusossd0sjlo5eox7nf46rfbmjpiv5ieb5d75rneyjva4grlrkkn16e3ux98h5ibl35xm8jdhiti7me03rwsi7te6xk7u80nn57shc6gz4dgtwktnecooaixmr4bgoqifo08kkein1cj3u2tbln49zlj428a75a5lx1pytf5pe6uekv50v35rk1327g1e9as1fvayfley4y265gbajw7q6twimljqc2yxsqh5lg0lxw0lywm06qn0dhhsg3fcjaxge8mdgwvdbhz54cm8u7jcs3y49v7yfgrou93x63fry5qvkoyt5xpgy3brih1064eo9f6dgiwavocez3e4qxyxnrlwg9zjrv1i8ud92foz3ysmrc27sn4f5qdlq39ouubc3d6h0z49yhkve24ie4lc2pad7w8w5s9eerzonjjzmin84t34x99nw31a0w40gybm1leonx17z2q34jqaoyvkvvies6nfqeg9812zbefcplj5idgbwfy7ckdrgjx1payd8n3nwmysfgpgzvut5cmg8e3m7wwokp0gdiyy8d94fj0kk9tbi0inpfs62lohvkz8lucfc802mpq49fo377rhu1y942gwdp0g2nidlmez9v2fxx8ndb00fx1nuiuvkgi8dohpd6nc6en03sahn4zbupe7js1h81bgqq7aobizn75deg38cfjk31ulvvidg1en7idaci2j90yglekyc7cibq0nseo02ftim5qo5g9drwqja2jex4nmannrxdtuc3v1rv0ozv4mxrf65mszf91aa9cb81l3dxklfn2xdij72q2xaqwaor00k9u0d5imcdgbonulsgfws31t6xzkrn8t48tm964e68tbbegynmpdrcvlz5sljcphrm514a4q0b0jfw2ea27qfkh3i23scdepr9y7h35bro83r2gyycj3faei43km2886bfjwt',
                fileSchema: '1v30j0o3k5flfbb262uowsx3zpr24xfsxmw5tvmcz5h1z8avn0zfs9vb7517ik537wna0ot9lejnxk2gr70ny8fvl8yz6e1cugra7ernzo7lu5kzqczu1xwedpdrn4cryrn6okfwvofgv8vk6ds4ri8ggw8yhc9m2vwaoadrfvyd9j3928lcni76w5q49q0ttnvnu7ykvghh50kab08iuqegv10y6xf8kj873n0tug8wwifa5tgmietbpch2w18o4yfq4z8caqeohofjd5ksx0yew8u0uwat0831fgtkd5y5oi8qv1qjmmzf31zwj2kctwn55ii0svza0bnpd7pzawjzhsyk02e7khhm4n7h6uxan06i6cz9cwvjkar0n9mobyehihf2fgugrjfvbndxz8kyyoalc43n9fzlq8mhpez0wy9ct3vg54ttluun0wk0bkwv5wk2bsj3gbed89idtz8gt15ozy6zkovp1haha58y483hjefinunc5wptl0sxxgu3szzevwsffmc3glaujxlfr0q0hk283vbsqwmvyzdm9dbs0h2xkwbejb9jlk7eblblt50peuulmaae3wujvc2en5dtftd1sne70lw8ef5f4rmumes8ga88gq29pcj5fg0ygd93z2fsvj4ben59o9csvm1u2dwgvum6i8o17ddt5443uspum6qio1ek4cembuc0m5k9b1jt14v0tbted3ldxujtpou8wfqcp44jzeqgjzip0gkiwho14atv6ianixu1jzm6l0bzbvlom9ixwr0uxk6d6nmvmcpha0z3s7gepm4o2yslcde0pg8bca51443jwe3odnynzl0s3rqmsre0y3jtym2z0fonhg5txnix7aihwzs2mx2106l8c74zlgy2cxbxi98tsm9qdbf6ybg1ujsei1jqwizl3nlstybl5i7lh3arwxikgdeoft08ykxx17n34nbncgdf788syju4pdpxeb1l96z73lxhl4y7ey6t152gfqylgcgl7l0y',
                proxyHost: 'mu2w904p1lap23zn1yuex4e27xfez7s1qiuqtcarljvf2zpbujs4vwgoeu1e',
                proxyPort: 9676691909,
                destination: '0wyimixkffywj2g75k2vff2ft4boriivtgku00webjur0ogibkzxz6kj4qp5zzel2el0vg93exihkbfl9omts76c32eknzg0khtzan0axhb6jd20auqllrbkumm39unnequx4ugw67ep71voh8fe9h329ssb0mfl',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ofyok7h6pm1gxleu0jv82xjxk7hgqvrn6wbf5j9zmqyzi4rgfk3cqzmziogox5sptnk2bep35foxgzq9k5aqax06golv55kgi6i2ccxk8055tqmttqvnx53fadm5gi47cl1nfaf01bpapgpcmcxu2pm56al4g51g',
                responsibleUserAccountName: 'vhxmfj92i0cw35ccz8ki',
                lastChangeUserAccount: '1k9o0nxg425zq913elex',
                lastChangedAt: '2020-07-07 13:36:48',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirection must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDirection property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: '0l0b1h8xj6jh5v6pehgaduqy6d7xno8emonhlc2k63oo6ffejqc0l9tt4wu2eiaat7t80vqd7tyxu7tasnpzyict3wmgoun040pygyxcx4hlsikt8esvi30mp8m56rbf3qgjmnx3o3ktcgr7kmclyjz3cga34wbs',
                component: '65sjp32ws9g9jb2xaowtpdlynuex2irrxd9pofd1g740jefesmxm35qtyxsgc4e36fdl5smhcbv7ow4fbo15a2dnlwffpiz0i7rhvyfql5vu8z458vicld5lzee927oq93b9yedr2v7av4xphbycwwtrey6la1qe',
                name: 'otklvjx94zlreb5xd6n493uzk8i8gpmihhhfcyjhb74l8t9e6k0fb3wjcn8u4ql0imko4tvu4cksqaor5al0qaht6x2rl9ebh13yfkfn2ng643hvc66eg0y9xrt4ydjqbnarxg4gsuri60hh9ks8u7a1136ezgpj',
                flowParty: 'bt06r8b94mch1gg9tqfjutoufezkolals7peq37i42mxk52bbps1yji6mgsh0dk7va5cowesqihg2lffupsjpv1b0ujxhg1g0dv4xlme9di986yrh2htmpjsfrqagogncnmd9vy8s98orftkkxwxkj7ypnbhxdnh',
                flowComponent: 'wfgfevdeodxsomoaiqsj6ouq57joomiww8il5lnf1ixt4b0ptp3ayxo2jbfx2uro8mz8qtjis7m7ulpulyaap6evoheda3dy08o1q5ugrvt71b2eyrveonahlvahfu4wah51nawz99bmwzadv60nhh885070468k',
                flowInterfaceName: 'ec5o9wfcnrnr6oks4mc30pmmiuq0ik15rbp5rqep9ztmjhjosdrg0wuuz7swi0xu8ovsanewhh238o1icr7hmm85d31809ob1gbd7cerij4rjq31ht92eyqo6ajg8qsa2ih8bj27qjt72g8bnfckaps14luow54a',
                flowInterfaceNamespace: 'hk5laci9b4yzxvvmvbfrz74md9kvuyjm5j1tpuceptvkue2pq47ogmhs9vw95obbq1krfz1kst7zrng9zo9zfhasw52l7u15pq1jrsmibshg122nwtza9681xab06cv60pmk28w0jwzqu6e7n8d8nkvj9kyz7hji',
                adapterType: 'rfl04a47yiibm7va3nql2sdguswn5asyfmb6g4l4wfr8336sodo7e07oyg5v',
                
                transportProtocol: 'hykbe92jp809orlm6b4r61pebn5jdi50kp8sop2lhx6pp0m5mffj8vd7jo1l',
                messageProtocol: 'ksir8llvnph3tgmynfzme9odkxihdbqi7f5e66l448i9zacgh7v7dumrrxxg',
                adapterEngineName: 'o8d7y3zw4lc3ftgor7mk0j4jfg2e1n40mff5jw5rb0lthjl660a1h34b8napwg4xc8aonmh4w3and10ztj0sh4s30v4wqeb2qp7dj97qvd8p6mw98upi4xy9gm64it9febfy4c5g8sa8vqnjhe2fig8e1tyonfmb',
                url: 'dgz7z0tk9jub60192szh35bj56eftcfqag52ov120m2kof7e2166l0rwzmrif9ugkjsfqkgnlopl9ihgbruyogvbmz8vhqprad96cxvty20w5smapin4loie3ausjka3od8zcnqorccoab9vsqhuezybccxzngw6je8e3vdvu9j23oj3t0jngey546jp5e385hnz85ylt1pdy89al8yiv9yo6qmtfl7iubvpyjv7h3d7mijjerttwgx5roc3u6dwpa0sca9ydmxb43jtqp6tnd47xyfhqmbstqr88gdo7hshmz0ttr2lofghic2qlbii',
                username: 'kntislnehb2x89palx41ry2f75x7bkux5rmvefixs3jaignomk45j2eipfpg',
                remoteHost: 'by9wry8w21ekz204ta1tr0diiy3cw7ba6rw0vjktbnjtro40rqchn4kwcz43hty0sy7h6fxrcpnur22ikt6le181652hp2nbc0jysmxari3i1csga0l7sfjw2eqq1onghw00wdjikzga0jj2ulzti7qn9znhzhuf',
                remotePort: 4123009938,
                directory: '9motrmi8aqd1dlowcr4aecpqxd1p8633tlnjlle5gstyl832zk838ctoeq17fd9ynyowymtpk62gr671kewqc6aexqxah6y9kf85sg0m4z0jklq0lnne3tl2797u4cyjm1hvroq188odowx9qri252adhp3tixf98cq7aeq5ekvb67g4ng6n3bkbq52kdbxymtwdytg2393fq2x2iar9spet9p92sh6sd3f2fiafqp5ofc731rbsdw1m72cix1r4cco2u3vbwpqm3w8c0sms7cajdn83qo2qissscfcpt41wbv1bhj07fffdif7fbnr94e7gdzqkr2x91mgxc5z9u15ie76rzijsxsvqz7kcpdy4s2ruc32r1pckden5emllk68rmtzopwvv2smquzedetryol5jke3gmiu80644cx0wx2ug2v4q40s6cc9pus4kekui4pq4udwoizihp3od7b5vhrfvki9vea7fen6nk91wsyzx8o3ldy3y4ich0itsx8i02wzjm9ji2myw03puj8ew8z584g0da5fmfntg9c350zd7chlbooz8fez4cxlkczjysr7uexb1gnp0oh6qn2wts6mon6uvlyu51xmec56pn869iijdd6cjdlhylwmh01j0eey7e3y4s2ol99mxhkcyqf5qyf41cq3jltzvgx47d255j3bov5jxql3t8jdymgdh250vmczn36lxh2idmtfvs7y3902dhrqcr0ttkhqm3xm6cv0thrbo1ps0f7mstsogk6q4qdeo6p3p4j4eatj9t38ygwq7qx291kuidanp57z0ejah8gge2obunx0nmsug4uud9igefulgg6s8cd0nqxc56rk9kvujvdihwi0b3phg8o4qkm3wki2y8rlpuimzpd3i47oioalc11rwxszi1fo1wqxp5r8diq2cxgo4eiv9i816bz9gsbztm4rzt34vk6doaqqdu9o15tbb121qarsf684q2qiw2gx4p53y1d1ds9nj6m4umjzat2jg',
                fileSchema: 'igsavjkqypmktkq0k9ctz0467a9su6jkvb13r7uyt9yxdac6bji5uk017npa63wqpq8k33j44e2cmwplfzb5zp1axjw9jf44rgd1quisbcrvwhohdiykvlvuoywpaqsgtkjtmwhtqz97br915gzgui6z5rzinh7voko82cewxwvx7zcrfvr8h9lauhfto3hm5hbgr5zts2zvx1klcta68xpwxxkpyqtu9rie3t88gh5b6ikjrriemy86hj8mvysov9jvle3s08b17nzycf268ic9co8c2qtt03lsw6dkvrfjcbznfulc6fuxivta9uala1ixwcihzxxjxyka0aq4tdxvhlymfb39timpxjno0lcvtlw22hfqbr5px9t5ri2s7hjs33auntd5s6v1cx43ctv4t57u696mpakj9vk0v7y2uu1u9zk7ve4fxfew7qbdf0cl54p6k30tlf4zcw3v9z0weqro26pvuy7gngxnrnnjykrfvn9jou2gvk6qxzqxo3wbvhv37teo0hzqd6k7wy5tkye04g5cn1q61wkbpb94ce3al07skfgiwu1zpua55povytsyy9y5rkbh78nnikt3olxu82c90nlwi2p33xf7yi7044wj1y345ftr6k5zfzktefpc6y8netijs5yvpgjd9ts418yfj84z4tubw1x8fv9gl54it61nf8q6lb65h75ucxip0m1rz1bb9c19ooqtvyaybvyh544ts094999ugjo9jxynuw41gjpe3tdyf9k5592junh6gba0fs2gw9uu767qws0i7vnpu3wuvb0zuz0u5vxyjhk10zo5p0c476sngl6m0uyfnaw83eybgm50lem5ksuu5w0n42g6wfjpmv7m2rr1a8u2toixfxfbw6jiu70ay71c43q11s9z8ss32b1zgnb27akvzbvgqnpe7ye37poaxcj55gq3h9i4d71wgn8debrczxskl9abdieryv0jon1oc18iqshtwgsrxavu4n7rpw7qbucjij3l',
                proxyHost: '6nez79cuay9m8r6cgv0yrsu86dcz1xogmmfzu5420e51ty4qxnk0p93nfsfp',
                proxyPort: 8826524391,
                destination: 'ap4h7itu8gfa5lt6u3hfp14ns8bkkzv6y8jvnxltl7zh87xsqfr2lfm058pttiq88gsluarxt9c56wptihf59xiewl2bqx4e81cqwhvpm7agfh4mumd3scpkxa6isn6el12oy58oz5ruz3i4uacmb0wmepnr9ueh',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'm4cgp4gpser4334tun3r0k7bw8oggctega4vzf413jsjk8tjdnf9cnnhgpi7hj2pncrj15m9x71l8z3gntl4u63o6jkd3nf3029wj0jo50j5gba8r3qhvqqr86i6h9922qdkwjwx926yaqvu1cu73mvvvmfttdlk',
                responsibleUserAccountName: 'npmey4xjd3ml8ryyycd7',
                lastChangeUserAccount: 'x7i12a05hf58dgacagtt',
                lastChangedAt: '2020-07-07 13:16:16',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirection must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterStatus property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: 'byky6siv1gs9heq51mv9qm2ox0bdkbtmv00remqpxn8vytaeyn1bdxr97gicq9trj7np6furp34f2b75v5gk3jnx9jwjj9ptzv3ilingflfqkj8swcnyx7eo232opdkpkheh8ml5izoq980q1rodtvpe9ywvpnns',
                component: '3l9qcs07td7ole1ou68typn4up0yj11247xu6xfllzwz5ejsa5r6i0kwxtc3hk9ol2aff9io7s69jh99n8fov58ua7fqsc358s7ii0y22m7uufsc06wyi9mc43lwsms2vpnv8rtm0wxlx8kpyi8sxilstbdx3i3x',
                name: '86brn9qupf0fyqok906e8s9xrnl87qk7r02xdta6k7j0kvok0g6vvmtugsyw85xt5zhhdgro9ac30hr31rblxd4pdrof4kru63bgm7qyrydvgx7yf1uz42ymolq6oi78qlwf41sn2jwxgtlpn55g6mgepbxdgfgo',
                flowParty: 'zjqk84zx84y2rfhqg8hg29vpdnghcddggh09qe3dmf1zfx1a1o6yuebsags6yycqniqa7xfjah3mxyryp1izf3rl2piduo1466tibxgqghn24d530uf2gthu9y2yfch5dmt717x6imehwfl6b41554e0noyu06wa',
                flowComponent: 'oiusw7p7pfu72v041gkmf41nwf3o58cj899n28vzi6m1lojcr1bnl2vifxht50zlmcua59urt397xvckwai1b3au7jantjnt4j80udr2fiuvj4nsbtxi6ctt61wjlbwfj7ar8p5j51nu9rpt38onovpk18gtqdw4',
                flowInterfaceName: 'b0drxaa31bufp13d6d5qc6tx6jmvx2hcnacqge4en1dgidopsbq9n4tq092thbtega7z6tjo89o53ifazrqarw1odlbdw5rh4o6sl5zkpeiek3c0rz5wpah912dx77fbdgkf0el00fy5vmo78u0w0jfdk1mpowpw',
                flowInterfaceNamespace: 'cmsogthwfojcmie4hx5bcb6mu2o7v0ztovtvsqfylylbi6f6yglas3q02u4sybaglqtf5znqj22oe8lk7p3zdcczdwc9awr91pq2eeapstb01ltj8lzcdjjuf5u3hl2n5ov7lt0gsl1ti84oaarmrivgm9ks0xe1',
                adapterType: 'ifdgjqcmvibii0gm3fp1ko17xo4kegtf16t99em0vchkhc59lxzelb0hp61x',
                direction: 'SENDER',
                transportProtocol: 'xxiw3fzx6gswikry59dd1ju67nimbyik18mqzs7vh94hdf1tk1wbkg35cvbs',
                messageProtocol: 'r6ljljlejdlemgji0g5gi706f99q099x5140to24smbempq3ta20swu0e5yi',
                adapterEngineName: 'v7ufymmhbk7q2486xy0t9n29n4d1llfn6vx9otthd6145nr4geqeqb0axdhjga3s726shrnq8up2nn2isldmvdvvpc55uea9jezkixltlf5n7z29nu5eadsjrxlvtq93y87wavajsjwslckx3l4f8wyvipvoqmvj',
                url: 'wxwmp3huqzedsski1yalez5218b82v81sd1xw5uwv4ebo8yvw82wekxjpzwch1pndl3rigud58n2mbna0r5699x6g8ktllkn6k77b3ogulq6woj95ba2k6vg9u45b5c2j4u3rr8f2i688ac8ia9mhtofpr4nj3fq5zej51m7052k03dgypfc7y6bf0dhhmhpu6yinpbi32crcmulsp29ftjxlwkqtqhs19rkqkaldeftsvuirn74d7r45lor0irs12rmty1w7yrkttcx0x7kt5oq52pjwn4pr19x7q1re3hvf0jq9bpkr4z1hbi3qj12',
                username: 'xt0nhw8kkrfgndza5dyeprdkj2yjw09webvp224bdtm0ttlootuxy1hz4a60',
                remoteHost: 'q1p4kw0p182a0uybuyvyky0dt4y9f6467gecmbzf0zedni2ubykypup2ll23aust5w67mo73mju1i0pq4a4p57krft6sd973a5vtcoy0flvay1hrt29jrfbxddns0yhw56wnow9xg9s2nb1ncimjvnk3zzus1iz7',
                remotePort: 6791641339,
                directory: 'nzy2lq070645wxlyyarymyh39yisz45m3tcalbfiw1h359cigd95f5en5qj006qinfbta9cognu9ozn9yrltzqh5jasdjxy84n6jutassga782cjaolpxda5b6vgoug48xlvmqi4ryi8thahh4dfy1jm8mu9dam7aplabtob4ggzz04afgefq74xyur9m0soxf12q8pzz364tscmril6gwnmlwml24jgqu9pceitnqoxlyarbh72j9n3xhblx8i5aolnffovz9ou7nkcthpk8qpx82u8xt8hqzvhys5cm3ohllc2lwmxr9e9cwxnf4y2j5od7dp5lil1ffwtzaa3l2z8pv4u47dqjnji8lq3qvfj3ylf26yk75egv2z14qf0xi996t7yxvw8bkd9w0yl5zdnnlgkc6nzt4mmgiav19960l19yjdppghi175jcz4r9mmz0i6sci6ux6xktm1p3e41f6a5vu2bo1v40iuuz0y4gx4xe1zjri9mr6opcca7qakl8pj2lr11b9nznma4n87q20mgn58sg4fb1bjbwpov9lquoalmu760jz29k103tuc29rkicc9lrl2db0joqig03bvt3kysu5s01s81cyf367tygw8o9tmbwsq5chd5gxlxggvemarr0aeo2nwg9l1ubvnil5bw2whu8je0s1cuyhbx6eod1p8s7x0ejib0fleg805n80jlkl06catqfj3f0h1tcgtb5qrkbsc6ah5ecm4jzfp9oagdhr94q4ryng69ajnjyfljcaanyug0au20t5k2dk3jzpteclrpuav7wi1a64uj1usve1un1tpxz9qsuskqmu28euyw3bgauqmjvrwyqoxooqc0kegpo8aakbec85o6jx6urz8l98s644p58211tki44hcoysjy7kifhvvp6egl7l3lp8o2eqv81xwoa8ls926jevqdlx1jy54x9yd47gn6lg533n3ol0pga1ktzkisnle0muw2aiotb0j81cy5uu2rvhjj14e5',
                fileSchema: 'i7ea4r5gghq9y7l5ed0umxeknaxq1n8v56quy8gtgv9l705nxig4e6x128qeh6w3zyygnwqi5dd41bk3fnx8k6ho6aci8hhsrr7szf12prd1d0ownv6evgdlz119hzvuz1honnv0oqf0u7a5iqcv6fm7a66kldkrp7of3t340mvaocugz8dbbhvauptt10r3vc8ogqgsb0evj27cgcngno17rdg04r6csjfgnhushhoma595c6o4dnqu8l3qtjsccv416wv5o8v5ozymzf8rhsmr58fqqm95vbut3keqzm2u2nct4hl5d56o30qvv4s06qxsx486a1xxhuvfo0sosi5qheqcdm0176z249jfgsq23w1iocs1bt13ehv9ra0dyxil7n0v1wp1tqjyac8su37xbxicxdmkyme8ggd1cvau690vbf9qj1xcb9zp3ifbcukxrpg582wbqpelbh7xmpwe7tr2epaf4hycti634ovmzcop2luxmdf9kffjyetu5d2jm99o4licexhp0nsmsjf6kkw9i3xnmc24rr7bubltyoy0jlzs3fecktxn9ydc7bu6xmvk9scivdj3xxdwfwct2zuljngcgw19ow9mvlmroqj6lf2uuztd8nw6iiiiqngal4ecgh36yvlvicenfhm9jy4gmfzyohkaf2e6vxzfeq6poxo9beuk44n1bwvdxlbgir7w19jchrfr5s3f82ks6nogm2aaxd32kl3ar5ed0x5p7qxy921lmn2opgie99x019cszdzzizh8w4356qphdsmq7z8gaaokzm7aot1fwbawy1jlot4yufmei31pep9te9v0peal7s5p6no1es23ze7gg7oxpz3xefcd0h2wz1dxgjbch0qkr7uticu5bnwn7f16lg4u20rx17wn5l6zbs26yesore6tqj7wcjoot07elnnvxtc20kmhzzfnw2r4qazh04rjwe6h4p0dycduqoeb6by4sn9rzf0xh066rxmg9rlzdqmp82elb9y6',
                proxyHost: 'vzlty0dyytzrfdrrlrizy50exh4729p1lai8crrv5q6lh9xyrnidyvn3u0cf',
                proxyPort: 8457037913,
                destination: 'qsu42ygpnagaeepsdh1idt7sa4ay6ofsc1da298ek17x77e2m0iy10mw22my5qa13jb5aoom4ya40i008w4x1ohp1oxub0bowj6ojatm77tuctqai8n6qv36vh2ksx2xkdf85sh92vgvbpfzfz192wt3lm41h34b',
                adapterStatus: null,
                softwareComponentName: 'vzpzx9bkj5reik9st8x3nlvw9utu794cp39yx18lj1hb04fdgnd50mw1r107wbffx8c6bfj7y05vyybvrq6xb9vnh2xzc28ydi2pyx0068ggqjcaqte11rdzfbpxfzoe97ltnwwtwsqoic2e5ujf4txxo7txrrhk',
                responsibleUserAccountName: 'wqtwn4p7wlc7gf1eoglw',
                lastChangeUserAccount: 'ki29uq07flilt2hx69f2',
                lastChangedAt: '2020-07-06 19:08:08',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterStatus must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterStatus property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: '8u2wmkka0uplljyrwu08gjobukwu79la30yfaocxvzz1kh8p8wfldh6u5fn847v4idymuxabimx5b9sf1dtu73fezr1m7760qe5zjrdjb1ulblez3ya45vq6ys010isago6zljasvmtgdl0wu53ckxw71fh11ktf',
                component: '6yrl7ad4ndvgo9aq5b8xd92n2dbojqz1qfxwsb4xyym4fpxurcp1hu90ew4qqk4yqest556ydpdp38nb8fubwkeni2iebgkx8uviuhsispcj6z88137cgx7d26wcm24s9bp29hmu8ie2xd7irt03ly67svp5tyt2',
                name: 'kospt5hbsnai621dd014ebbsvtc3cayla8fjpb3kaoskbta82v40ht6zy4jiiih6bp8oc4yy3hhcd8lfm0gxkzzn7z3quyvtftw95maef19twfcftpfxfnzd6bwerml13ypvx6etcvz3br64gzusl81dmhoaptbv',
                flowParty: 's2evsk3od5nlvfvnnh2tqs4e9p75bdx2blkrn8jbmh9eh54nhe8dnrf2xojx0jh0mtryzxiwaoeinzdilmlui9rofqsupm4n3uv2ac95pu6we6lqiaf10r3d7ul9x3ar6np6jmoehtqceptggofjbcwjlokdrkqp',
                flowComponent: 'ixwcqgpz0131khs1146c983jud1scy4pgdui8qqarzhg5t2v0r3vmnr102a33ktvfb5jlnvqix5ib4acughoqpkp437rcu8uqj0y98u20ivkuyfpa9f5so46l9mwigmm9ugw44dak8iqwyw5pjt722rdjxvprpfz',
                flowInterfaceName: '9iuqftcnw895vdtv943bgj792y2ic5tl746alnupw27vswb8gjjek752tyoamzlxlz91elyyekeo1iak4pqrckqvt68qxrdmsbswaiu9hfhs6e1x4qzyqp9lkx47cysff60pd4qan6gb6q0crhdlbry9z338a7g9',
                flowInterfaceNamespace: 'rr5l0ajv4s234kw8ag5q79pnztypm928xg8za6ivwl84qo5bcou2i5y1eeizl44crnkneja0bt7yylgyhsuqxe77u7zip9kuteeq1dmsi8grdafg2j32lhxuxdlug6bxy39lt9y9t5cqbuf1a5claazxh6v6vy0x',
                adapterType: 'upoqwm66c3mlmabebbtkddmm8me9hvv5r4nmep0w241u378t0tkx6g4xz40j',
                direction: 'SENDER',
                transportProtocol: 'gycrpmxcuz3vphrynfswa8et5sr44wy3qawvadfx40wutl1p3rvjc2fpm3fu',
                messageProtocol: 'my58aoyzh7n692fvt6qetg88ydah3unxnyurfhxzmjfp0ayqvkjkkopk4q00',
                adapterEngineName: 'gakzgbxlg5mykt0jtrpzjs09ga2ytqxm0sxiuqw8xih6xlilqrqv72hmiqyo23vnkzkkkps87cee0l3oxkvhura274lqjfwroudfhkpisj8eqyalhf236s4oza52zpvhy4udnbuehq6mr31hj5ea8imrizln3yf1',
                url: 'dykgkidcjhns68vstoq1hulurbch32e32gx3ebanap88lzf8hmdutv24f2htvlef7mwlj8x8a423lv7o4ran2sjxh7g80p8qja6i9p3ckgagd4fdm4me220lr450qf3gu1nng67lapz5m99ubt0u72qqksfypx9gn4quco0416eaodut6wusu9nciflazr34wtk06uqmbkhs20bi6meit1v43138l32pkguyj1mikooo1b889wqqwefgtdpb10v2exhw62g0thbf8a9pfglqixitzkitzbeexbm7sh78em5t0i107twv024thcfj2xbr',
                username: '32s71savrruahaqndbxx5lpoj9kfd4isb9mnsq7x0oizf22jjziycf8bcqvd',
                remoteHost: 'sbo4ksagf3fve2e9u4wr8m2bizbyzfckmubu7vgthdz26yook7g8ma11xzf84wkw4ajke1wh91dp4hk39ojvqxhk64s8qbpwicguoa329s9f1vm8rk9p9x906w5drdwg74grbuaz7c0n19h7ynzfyfksl7jeo3dc',
                remotePort: 3340081006,
                directory: 'dt549xay6h7ko3xn4pi9y5puude5er87y2jfdibbq1147egm6u0ul300s8h8pumzn1e4gzxemfxsvoyv39w2hxt8g0jsrziarmtpipnrrmv2rxn7rd1gqithdfol9ljxw2absaggeberqlzbt3ynh6a5ligsf37qo95ivmq6enqved4quv5l489cm81k7cn4wu2bah3y0rkdxl8tx4rez1fi0nbtfwz3knzejzi3fid5hqtniam5c7cio23heteda5ojljtvlvfrz7yth7q3mghlztydw3u9ider91adx81rk5r7immkalpa3m82sgvdggq7zam87ae9l0u5lpvst2kt25c40yzicirt4pcotrk1ebug0f7eb799diw4kcduivcqw359aq697k0cti9sjjtej6aiz8q3r1gi4wez6b4eerwtqv2ej5j549wqg48h791qwthhraljoho9v3xm99ngjxm1y2n6c7rvoggxktiodytrsxrfxv6kgfd280qs9tlwzlx5fejdzh834jo4u5ajbywgjp0uwhvd79cp05cmejqt7d6spefvwwf5aezkjn67xex8autlpl02axs2l7bio5euouectnnpsxphfmub9njefgvsyq122ahors6cvnu9qau0a3f6y7nemvhhymgyv9akrnom3y0ckrfrszxmeauhd8aosr0fik0l746avgyv0nm2094ky54oeon2p64wbg4smk3sgzw8mnfl25d1j3yvo57rjtfmeorwyl66gti56lbmxnsyv5rz4t4iftoykp42jpld91jvt9qc406elsl3vmbsgjvpcor5zdva8m28h108o0y9qnfc18p74smxadcpv1uhncxapueq8sohseaqkihghvh3s6ojb4r2z7i20toxv0aglw7nwscdc69eikfpmcwvgrcep5wwyea0i8chimygohe4eza7pmgekm18p8878fp8kr40v1ymxlalvg11xx96vq5titv3537h6u6taot218unhm2p8hoy',
                fileSchema: '73k02bdchr8jg2cxpshssawc41i01w9ucd28jzc6hwoclavn7amc3suvbzctmam48cpvmqudo6hvz3xgn477acsdvi1nagyx7k4lbuvodo7r76gjvw4tknpqn3s2zg1nod6temdzlryhdyuwzvoqskp5xri66p3b40rxocxyi6jkuxlvrz7xgke8v2ecqzskzx243tpjp8kamoshjpjefm2k47fq844wn9ws6w1o9dir6148yjljoc6knchn5i2iurdt7qpdhsqi6j6vwrbce5c940p7auv5f07ohlfoqb94pe9y65792z2xhcou3s4rji37vbkx9ypm8gha9se0n1yre0g55rh2r0xo7x69xjx0wd9fkzi91r8mzi8nkm5dily0ovgkqyoe87o8icjwn7jo6234fbuultnbqpx511ter1l9og3gl265sx0b99y24ruej7n0rguhdoumq8vq7045oy5uj19c0wp7g0is12clsaw9ojuipgoe6rz9zsaqt3c6ghuriu7yi90r2d3c2ufvq0fyvc0386j12imzfahi22xteynis3p2onpn55ejlsf650442z60bl51ldudg96yqhtnupwwulge6oqfokak51ib3ehonpf33yps6o5vrqrdyca5yq89lyzfbi8nbsvt6eoj83owk2trll87zv438o5ghib9l0kg4d2wagg2zal7d6txoejp38e0fxd0ghlgraxz67l6p8mg13mqemkthakusoji0t00x436dzzk2l8to65q3lq3qtdony0x04d0natri80nzggxl1171bwdmr96c83151qqwfc157yhvi6aujtejzmzkobvistssbd469lyczzpjtmt9910qjo5t21k38bo1jdv9tx0x3n56ldk5vz6yye9yjwk3tht0jxvnhlwdmd80vl398lckgayk5w9n3e439akjvsx78ofxbviwnjudbm9klwdfzfoppqpzile626z7ajdsy753cdkf6mmw0b54orftwfylq2e',
                proxyHost: 'ns0m9i5c1giveo5740in3p933uur9pbsmcumhxx03tktzzk7sy57r1ri09cd',
                proxyPort: 2474048123,
                destination: 'qwuqgoqkhixx4d97cda3lrhnau0ytx47h3ph8835el4bm0xdsg878h2df88nbde3tvxevm7av21ityoxjtrxswre254bfa7n8idwth456heacx3xjqhf794ynzjmn8asfjlqs5ehm3lwlptnz01w79ogk9g1ssgq',
                
                softwareComponentName: 'xqzr0hce3kmnvopwjidce0n74pgyx8tvd7i62wplm5ixp0anebzwbweassbo0cjkc5ybawkejba8s22qhagcgombjp13avwfx6sys5jvtlw29c2gmbobivifazd5xwthxn0hxl8je15c2yypsey0vinav8tfmfhu',
                responsibleUserAccountName: 'b6zcsd2efxchr413zhtt',
                lastChangeUserAccount: 'uolcxc0h2mxcb51n6lrk',
                lastChangedAt: '2020-07-07 05:07:52',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterStatus must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'xy6rek8ha9vlezjabmymo3atix4t1q36ygi94',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: 'qyd8mnwh5m7hybkzsrfe55bqb9ckix3rde4r3mks4qdhl71kxd7fwakqphnfa51geatv1mnii0jboo24ymhk4ur960ibynyji3e33rlgklpi791zq7prra7kfwkp5w0wgrwgxbzyrx5ulavewlert389u7sjbcwz',
                component: 'v9hcdma3s3qj60haikr2zpvn6jp06arp9b2lugxm4dozjmwv9l048ja8h7gimttlqcimc25zkq72vgo2f0epqnwkmqine8e5vxgvnzvoohy4cm81v4gpzhn2l023dtctb9nsgbxbpknas69lrfinr4dgzuxeur83',
                name: 'xac1j7b9yh6cpcuyhi958fgsdl2z4gltt2kn0uzeb66f1xwrh429mxy5lufkgvedrobkdv8816x6vs1u77ysxjwdv5lbhxqje5ua522ckwccgf0rsx15jab9sih302hf5gw8fykit68ik3jseu45q46wz9ff5xu8',
                flowParty: 'qbtg8plsag3tuz6dnxjx8qkbs4u5xa5ikmft4y1biwbfid0g5vvnftfjzouhdrmdgy137ud3j06npu1dnlnpmlxadclegbbh78d5ligwa4effj67h8jueuzz9yzkhvrm2f34o5sxch6wbdsqkux09gel3hplzw04',
                flowComponent: 'exokha49svvo9t4nznssngxdr1tosq1afyoqngekpk2r8d2gx1w6lxuc4kvprlzki9zfduahm3dnye994s6rkmkbmrfkpos1d19tsbc6c6rd3weppyqpveaw4kdm9dzw1pb1qwltty21n2rwp1gbeziu05k1ftzh',
                flowInterfaceName: 'j8t6a2td30pi2g3blvqj6m6spjsg9m40auuhnk9unby674jqsavjjccab23eyga1zgd49qoys4cknovzql9bin1v16hid7fzxg9dgyjjzuwfuviwmsd49p26hht3xh68ujkkkuhx69sog06oj9e5xgeaatg3upx5',
                flowInterfaceNamespace: 'p50pn9sxqsdi5mcfwzviy5ysr2jlr01jmdkvyf33v71duwurafao52ywbc37e4mfqsijuhidgao2qxwn6e29aetut37z9exm67qxrjagmhaft85ip68x523xa5ukdsekd1bulpoghv663kzgxt8ve8hto2ltm4kp',
                adapterType: '7hyb1gmahqp45m0l88u77n1mm1fp9llv8bgrsyxnhgz4n6sayd17r2ntq142',
                direction: 'RECEIVER',
                transportProtocol: '2gqasnhplys07lxl1lsb6x01ztzkinbaap85b7659i8b1nceqpa9od2lsaas',
                messageProtocol: 'xhantsl9qrfzm0zht8oe032paihn7xvaqj0qp853rsx07tvojl7objkv3yiq',
                adapterEngineName: 'l87wdc2ha2mqcvm69lbi1uv58rbe8serum67frz4o3n9dt00j7qazazu9jkjapemjnsoa9x5v5x79o6iqq1a0z44nyaaobcoiqd6njz29c9yc8xgiwzhyhyzf4dnbahw60exz4zx1j19smbrvnwd75dui9ng9n1t',
                url: 'pphxadj90cwrmf6v77pqfes8atugqs6k387xea0sialuq2m3bg4bk6vnssg3hgfsl2l027dzlc59wucdcw0907h294upn65ux4l2zqmsfpj9tleqfjncj7tjgui33oehvax35dyr4j7obg8l18c9ea8w2gs54otdzpb9qpt3dwa580r8f5q3clfx9vmrpi265pil67pt9pdvy5jliuc3swzk66xby9b0m5xvxfbt3ku3zt4ouggl1dvxvv1v0nfi52z3mbldrpnm6jfauixn2eadqnlkh0mnrekxqd69qgz0y8ych9if7tbtgncj63nq',
                username: '1xphv1ln1ml3yi2wyswuyd8o7djfkij333dy41bmha6qaw31jum5gl8amnis',
                remoteHost: 'eav24knhpaeqnzb2p8tq7lmiquppck49gvlxgplnuogfigkfa78anyrxdjnnpj1no9cfls8iryt3ynqphaodiawevus7b0lo3u4ryagq2yisubiga3hjp9a01bulkl366vtd328mxianqn9fcd33utcsdfxq0sdg',
                remotePort: 8946474773,
                directory: 'ngi6gr1bdce42zfjlxddlh68m31nf0kl42awlly5zexbujl8ioioywdi0eoyfw9mhzzjyf42dri8g5glr1dr3mgikn4q0g4s4pi857628oh0du1w8qple2jpe430t73uz4oao6mc0tuyy70sc4ljhhfijnipba3q7y566oi4uqgibh1h8ep4pcnjz9o1lrcwnh1r73m6uygsc26keh4pc2zwc8s0ekf8p8fb15tzml6pml38xomvl578l97fkgmrzowu7y8u4ohnzklmn6pwe4alplh2eg8rusx25in0wvj44oyxawwca5ai5rh942thqd3mzb0l9kylj3e3xq8uu26b3j90vp1yy30rk7ep3n2q4s452d1i569ibmtdnnxgrsa7j3qph0wupajkr8k6zdq6b6ohpwm3lzixpudxtdk8na87h7qvjioih0hjyc7k7xr3yeyi9mhjnfczcrg8vyem1jqzyssikpycwtn9begwpi6152lq37zxqyn4tdxcuhp6lku30bnojhz0et5v7wywp9shn1vs3e1rj1yar7156uni2frctdrfy93y4mqml91a9fnzxkdenzwrn5i463zsvm0bewp3sz620rzbybcdmkccnoiq587x4fzv5sf5nztat24r6i4kbx4mapqissjqbfmw793qeugjls0g4fy1478ug7n1wp44ievqlh3tjhb0hludtytf4fpp9t422t6fvt9h8iipy1ikxv16e3vjjuzpwydf9pm0mi8lmmlypsa3t3nt32t9qp9um8gtdvh8cgjesihndto6wxrqwa21d1le4m1unna8k4axhywgqfnujvinq2q4izvrd6wpkz8h7kfmmhk1rljwiudpwrsgjf3rzeyfxvx20yqpjjzgg8y9mu8i2cq9p646jybqk53e8gxndxxptlpdvwk2wy8yi9v5wwbm5br0qc2xi8ujrgeh54mz1j29wp76au4ho2ydc9vi9uwavo3mnjxh1bleylgbx21xl6nkrwsrtl4j',
                fileSchema: 'ugj1is7c17jyhr51i8egeq7dt17iz456h68wn8nvgqvvxsfcueuneicbkb2j3cf5540mr51fzslak43bw09o8t52pnmhbcno3hamln08qeupxmvwprlvglchu8aqcsv4n9kib4jdi558svymo92ecykmcdkajp5hjgikp94ljxtr5do4qrn453tfmnsvi3vg298nolpkmjfhk10ahee08xvueo993ijt8ml2i9diglam98ro2rmm43momtdiox82br6q02b893dhfyyv6bu7w8owt4n86svyfbk1gkioy2gfxv9wm2jaf36m35me6f2jdan6m95d5o0nf5dfs98g4quo9xs6cm9i8jp4kyipu5bsen1jbva81pc4cyylgxbjbs867tjsou6r6y6wnng4z419luivadygsx9jlbhowkzjp5x81j6fnutaz2te8utybnsshwoashzbaz6bvpb5u2z9s2pjaw7jcvpd6roll8oadci4em71phjoehb2arlbnlvcw4jhlowfeppldjz3rg79l65573co5zpfwi7dpryn565po6k3y1chwq69dq25efjdp9onlxxlrsxlgtt301cb6pbi4s7i8wi4hstiytw52p1j0s7pfmeg2strrcwy2zrmm88u93xaaphoub1klv3nhpw37knvalg4o5pgwlnl2mazkl9hvujm1b9dunzvnh9gjgq5p69lj3nra7wzr2b36y2ogchv1ndme1rr7qlftqua3pbhyt9gf6isees2yjeep2qm0dwxcxjx1n2zzpo5vxttorgi35jaiwo6lhj1251oftgbnbjl0j9aqunyqt1zdo5e4eq8d93ojbh78wxeayg0dmybvw0weo9an12aa63e16c0hij43b4zx23vi43f5600skzvz9meqf44o40yu4p87x2tbb0p8ctbmqc813fi8cu1hguy1jbn2yecab5t9q8eqaxwr8knipowh12083tyrtyfl8e1i7b068n013i0rfpi4irakd0gnh78',
                proxyHost: '2jbtd7w544r48rvl7zdv4syppfg5h836fccvcm7vhbnwecncbbaws1g9jrcs',
                proxyPort: 3162186468,
                destination: 'fqm5fhgq4k4wgxu72u9upgku80s9pd1di6iiyn8l11fatezo176ptj4ux0xm1ctpy3k9cox5cesak34zpndfeacwvstz5qngosgryn7xsihk01t101gcezhnzmu97ew7mt5djqty3016xo0pwj1xcyjp5lij7uwf',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'pn0fz08yj5ougadplsydvtca87fa74hsru4zdk0f8ahzut3v6tugph3fckt4zxcragevq255amrq3u0719hopokhd26cahsr2z95ag2si7va0gc30i8oznq2d31mbr47xrpxwnzwrv6fdzikzeb49d5mr8jgudag',
                responsibleUserAccountName: '0wchcloftrikwyxukup4',
                lastChangeUserAccount: 'h703xt8t259kiesusdtv',
                lastChangedAt: '2020-07-07 10:41:29',
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
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: 'jcd9mc39ajgjqhu2yf6secasd9aq0j2xnfzpa',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: '01263mjfaxptm07rztwzhylhj727bb97xgbfyc3667l8ne09re3hslp6cuyqwj4m379osqq3zlex272qy76je9ll6cgcdgs6jbo3ppdlbpkauwj29q40oz2ps5lz8k1161pzx0vo09mlic43nfecmz7a489gog19',
                component: '56gxup4lpnj4gmg0bg86we97nzrpafjf32i6ymmalvjrk028lfsizs5grcy0hdx8qyliq1kc5p7rfloqnhdbm0rpx54v10zsurlwvatb6kqprlhqjm905u4cj2x0et19b4dpcrds1k2hfey2co580bovet45983z',
                name: 'ffh1xc7c92wxt62j5cg28wsemv9a6hkxu9yvcn878z636lig6qt9witzifpt66bmdg4bghb6r8idq40o36ooarhvxm5u7h4j52ngd3csxfi220y5cfhattjm8qwrgvzy9m2dari7183umvsu44lkfp5teql428zf',
                flowParty: 'jyhnty6d8hxq8nfh70rd1xqesrs371i7lf1zj26kcqg3vz13yyj1p2wlecnd756zij5qtr4w9q456actvqsoukmnusva9avqy55fohim0gfprvcjhfbgtawqryxwmn5gj0t4gt0dzj21g1t0som5nwgrxucm03g3',
                flowComponent: 'cd9f3ot7rhlvxeq5xdps6vh7rd6jbl55o0r82jdn1obt9ktt2tnsmbuz0mrexsvl8jvrnf1yufq106mhmsw88js9onf4lva71iem52ba52lzh9qou4iz0pgsg23rdxwwulitb5eq52r8rowonqmbumffk6g0jpdf',
                flowInterfaceName: 'oxxvjh3jdja6qn3qirqvh25e99iqnppau8cpx6s70tt3lqytob4w8qsy9uyrw280ydfm5mwfqes4h5man4oko0eboqpdl5riakoy8bbvx33mvll5g8rcac2heeu65c5oh8d7za46emeibnunc3fnihd7ufha1i6o',
                flowInterfaceNamespace: 'anbc1bbcp6mmjvfs0tuo6e53rqha6u9m04w9dek25o9onue5ecvfe6ayd51ht4sdb6iifahv3h6mqpg7ko12l2qumn9jcwyih9xwxlif84ki3yt93lo7uhogak1i9jv64yq23ck81vjga0eq1wl5kgbvhygj1cnf',
                adapterType: 'q4myt2g2p41ysftmzuilvdgj39w27g4a1jm7x0iljcqumqeugk5cifeznsik',
                direction: 'SENDER',
                transportProtocol: 'v9c27uwrhkh7gphh3sgan2zdhkku1ynui36s38lyqnc8oo8444a33d1bzomi',
                messageProtocol: 'jonpl6mp7rc746ugimcrms344mhgarlhql3cgyj73mqqiy2ozkuyzimapm0x',
                adapterEngineName: 'yyyz9djic2t805phy84oy5wzygfvdc9fleaeqalmorqldupw8o0es6awskfbpdqayyd0ufzo1zj89g8x70vfiz56m2oajksja49jz070cuz0pymu5gmi7gef8nptlp94zhn7573bvi0m5oteyikir7yxglk7nmap',
                url: 'o1ubkkx4fcihcwgdbfe4bfv6ulwc6fvbu45h9z2fexk48d4nt2xugsrv407u52q45it3kefagu9uw34urroye61kvqyhmdhs68gw3ihwofu1dzxijkue3m0az3q6mdnqzj0gw8lxzlz1j7ktz4q3x0me4xte8abtmojnmp8rsibyyqqbjr00p9gri8osjhsbe6x6tyi5fo02d5ccvtq3xgh9iyd1v9rxvooe7qwi34dgf9soqawhv8724wply4f8pb3ubevk0gei2ihoq5jx1w3ri7i083os01nt14zbbzjxkjn7zt92b48oqvvry3je',
                username: 'qxl3jtesns260xbiupf0htffhs9bax82af937c9tg3smx3nfjgw0y47rojso',
                remoteHost: 'adpce81n7y20tecfe1jnm90jof11xbvuwinvni7djkq8zpfzbjl0pzw2gauikki79xl98vm08jr46qw2cjwacvsi0t2i8r39fkfd0sc5x0gas43bvu6nh89hlsexk4ear797hhgwuac9bm0bc2irupekpnuirhsa',
                remotePort: 9091323849,
                directory: '81vfjtkmioq2boe0x1lwjq4vd991ltyx0r4348h1sgmcqa6v8wcm1in11hf18f451ft9s55hxogtych19sd5m13syslplpjsrk7ld501htoj6f5i3guom9e774i7njl9kczp9khuuoq92g9oq7tgfyws1yse72eiwnw0qarjjmnqwdviojdvt7hlzflr7lsxr13uaskdf35md3raq3578nd5skfn5gc8d9jbogc0y7z4lnmp8rb62vf48c52gn9kt3h7g8l8avgrq2eybgi7vgdxohjdo5r9oh4eof2dz5ei3mp5gqidngtkm2un89k5jf5sgdp1rklzvu883b4wqbtihrmxso18wvzcrx265c1vvowlfe0hi2q5g8m3tjt1zazfgotdcaf6bxld5k26qlxrt7clbpzofb7t4h17dqvsdz4fle2sb162qypkwlklo48vwsiwzmdv6uo78rye5pa6w93edrbv5tg536kqo3kvc4x6k1hxjum824nc3jj3e30e48ukdsxicgfo5m6optoaif831g5vku8lfeoeemvwwxbkhlbaohl0vtnaxjuv6bvc1pqu8whqb060qb286xrcs2fixomzbfvkliyut8fpx2d4ip0v3q0fxz1s4so5fca6hmj2a1gb7bejxfku1mnd7ihabio90fut5r22o7whb8l8yakgew5wvqm7hr8w2jiiwxmw0h1m7u6oratw0l1ak7auvhur6z66cmurgnun5unqgciyhunaz697urs7df661cx8vpidyerz02fjrbcg9ebaj4txdwu2h4spcya82xivb9gzrq61pouza55v47ih4l5uaojpe5b4finhbonq7ecaklaegyka9v4xkdinl7n03q29mgstfjlak5rxqoeq3x2li4tgyjt4t3y4z1u4v1s8h3ybl66uge1ca9nqwzdvx2i9bcoibov9gb3vh0nku8t1kyus4wq1du3geohx131xe39w89r74j7qajqsoyf3by7sqnfgbusfj0ot',
                fileSchema: 'fip5olts2pb113efjp0pq4ktocvcpegqqv8bnvbmaiesvtbktvev736heisr0gvjte1294gt3z85law90fs1d1hv89me3ge1641o2eliq10rrip7ub1fnj36wiw7v7uyay5dga4vi2gpq5kp6somyygdolp5jq3kbh7sazq07p71uhmrc46r82l5h3i8j59ykc0f6sp30x9wokqyrz33cds9i64s9tq4m9jufhlzfxp9noq7uc0rgttvd6jd4p2a76apkz4mpq15uaurapmaskt7wh3xfbb9bwahl6uph114ot27d6uj8ylwp7wz0l4agqpgqlfz5djhdgdep8bdhvmyvp0wjueplm0no89ntommgtz8amez6onczhojuvhdgsqvbmzxmz24fzmqp41smerx8oddcs4pp650p5e7pol1125r067d3rw47yllpm9ev8tdqxd1a1n9ywoe262y3iwis18kh28pxbcbtbnw5e2w2pc8brc1sp4heo6o9uhl7z66573hymyfqvi7gd019etrvagoomc8vcprssb9gaf6q08lzdexsdghuzsvy8mck995cr8sv68bo4mpw43wfhduxla0aa2rtlfmosfudun0c5dfsi5rstrnay3z4zjgo6kd846h9r4nbb8w7bfv59htw083s0cx0ccfuqny7ctl12cc1m14i1auiq9vqu56aavujbmniqsnz6neh8ekn57eftq1tfsvzoq980x20n79vy6fq6i3mbut28bgx5zdccizz4iwn27yy2jwykc19k9gezdomr3plqqknzzxcgyi9wrf2x9tp2jyr380m7mukwstvdublz3s6u0jo4wxz9kc0y3eugj6y430vwjfkvksevz5okaritoatblqxrk1gt5c39qdb3bdk5r5jsl92unawfhkffgechyvb2ii9fwx81x6m514uhx17hd7u9fheb6h9zukl3apu2b2c13vqp14j2vlhytv5jgnlkekdl6cm62ctye78szel149d7x1',
                proxyHost: 'evobl9slqz3hkdvayeu1mvubgpsqxauwi3g36hasbzh4yf1ki12zwlvxc3q3',
                proxyPort: 6045953087,
                destination: 'cuz5p9anqnwktwgtrysn5cdflsa3l7gfaxu0sbdaqkndobarpyb7n7pwnouh1i4wvy71zglftmt4jnr9izp2hslcw78naelui5shxqwp395gom7k74ik9dhqie70on0gzuxmyqmwg3npu1ye1aem4mf9ax6kuakx',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'id2mdiplcf6sulxmwujpxinog3cebx2gxknt3x8sjakv0wt53ueqvvgt6mal1tg4hojfxsbr99i6bkifq79z4k1i8jnn0vrssvptsst0vy07zhylpw1vred9uzf5al20om18d3s7wm2483yauztwfrcraexxjduk',
                responsibleUserAccountName: 'cjlc47pd97cwxitz5q9u',
                lastChangeUserAccount: 'yip6hex8kah4uzd50g0z',
                lastChangedAt: '2020-07-07 06:51:45',
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
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'ci5gdryteyx4tnd9kiof6jssgf77zylj71qtr',
                party: '0cjlxr54b2c53ewl4uq6zq1yfvb1nj1wdnpenhlzxupvux23z2oq0i4djwapo6zwil5u5e48258yptzcuozp2ua2s9gzxtf2qowpop0857ttw87r75axfh8yceflak8cr7clwu06pj8y0yhh8ni51t37dvzzbkby',
                component: '4ym7nbmtgdhuhcmsvevqo1wuot4vfq4ooo6fkucdbqlsmq49s1mfzecbm451i7htrib8rcld69laphu2gy6al3pmf93xos9t2npaooj3p17kv852tfrccgqubv4yosgc0u6lb3cy37ltkjdsg2xa7xgkd5nbuqtt',
                name: 'l5jt5q0wyfrl144yi1dvshgtx64admv1h241poenud6goin5jmvufrjxtimvoj366z9aeaqky9est698seygaz81zv49dzk4riakcmj1nwsv0z7l1znva1mgkkhcavo8142ggucqyifnpo91u4mb2q0zxezb6680',
                flowParty: 'hiocvbjyskvdn5fr04ncep9zkb39lpyc3e61a92g8d2148px7zwflm93qglnmny2c727lcfrmhco7vgtaxicila4n5sgtukcvu25smoxhr47ifgnqq84leq0wpx8ocavalblovqnq6lwbdm6hv4e0kzglayhviy6',
                flowComponent: 'gfvlxbgrp9x0cu4lo60ltsspfrjekvnr5ytmnqur9l5o36qr03s9acme20b2dljd7fyr3eir3kbsveei02ajwf11p08q0irdyaro5sply91grlliisjuu8bizbjmu67qpryq4sku615lj0xofslysptzdi21k3kc',
                flowInterfaceName: 'vrnpr611wiqpp3vm8pyvh1zhmalju37qjxsi6zlmoom0c5ghk3xy51c76v3f6f7907a6xrs97jv1pw2uzi1fkt2ybb3sa0ckquesp5l7y2qwgaj6jz3y5of4l2m00h07re2e6lu0uhrz6nz6stnsu7x3xqp8v312',
                flowInterfaceNamespace: '075oyijxipp4dvsy12m6vgom4czwcv0cpu8b4l33ml5v1bt5owl6y7k7gcg7d9p9aulo4yjjaw9qrym81ym5qvif5m5fx5p1vnq9slqcho5qjewe6kgee1cs21uh58q5qfd8tb8rbsgzgnqnw65no204gi5zwl2h',
                adapterType: 'tjw7y0c4oqfc2nt83auj8977i7gu818trcj3c3311tssqot5q3ljwzs0annp',
                direction: 'RECEIVER',
                transportProtocol: 'uwlar2twdyw9fmxl5k18p78p3lsahsrmygl2wejw9dh397biyy4x3le96mj4',
                messageProtocol: '5u06kmljcoivn5dgrbygvpwsfjk2cxxulakqrfdbhwnfnhpzdsqwdrdrwev9',
                adapterEngineName: 'uwyyhzyyhnmj3ussbqe5osf53744ov02yezniet9t92ytcywt8u8eq9nplu8jzzpfo1ei20rao7mej7j8hfl7qctbfh9vft6rity7jpxrqn6l0pqbfv81s4ywwhs91izk11kisnuazf564qy90uyxixi651whuwf',
                url: 'elfo80sxqf9zau71yt6jdrp277jwgjzjg7q3rmex8pgq55m9pngu1asyg0yjre6g1fmcm1ioljh7e8qxju0pdzk3miv5nnaws5tdx4han7333hh3dn3zqmetyfsvapx8pflogy5jtydi34fwao9ngeidqpk8a8mlem2kixpw0vvi405l4la4bulejbp63p7tcugioeil1zfdjd16eeoujae703ugbs8cgl9tcg5r2h7r9uf2d4cf9yjz2ot7kett39pwao5ai3str1dc04q2vw08lxj4uwpl0i382i4k8ulx3h8nrzbp1o5sp8w01w7a',
                username: '55kruyi2j36i0k9n7ujl06d4pme67k2aada18jideftan4q6o1loar0u6b27',
                remoteHost: 'bete171rl39yfhbg27oiuuhuhb1szfhvsgd16y8sfdk4okki9fbhhnxrzm86j8n9pvvo728q2tyuydczmjk20hajckuspzv0xazg1dhwt6i685c56ir897n095tkns0yvkhgdobhfuyrbbzsvut8zxymdgwdxp1k',
                remotePort: 1525997389,
                directory: 'zhklgco7fy284kbr1cclqk3xbgjhcdsrm0g8xwn5w2r5em635x0kpjghews6naapvjldbbpb7zs49wa8g1cwu5rcwspaiaaeob1pujyskoqxsvz66ldekkr0yzw01bgvboj56rnboj0qdhpptohut3fadvlmx2pc3v4gllh5hq08pywtifdk9h7bjwronf17h2hbjh60ut7brifrrvq1b7mnn2i1q4urpw3m5hf0iy9i3a5ohaqjiv17u0p0ytvcv6ai4zj044uyq9t1qyrrkzron59drpjn9elo6fz445l96a91zsv43j4cyur1awkr7dth1mnw7kl27d4w9vyyckz6qx5cm0vn0d6k0zhkjlporofrq0l4asjd92qnldy2dr7z0j5qi0urpr0onpc7dvlref9i5kgdh5frjz12muyfdrow30c72e05l34gc40k0usi9cje3f6824tb7q1jueh6xpleoguwwk33hrdss9vaki32zwesyi5azn68vg9qbs186ihvg9xktmdw4m2o0cnzl3y3jv0h2sim3m1n4snb160511haxi628e6tgc5lk0s7xqmhoe79zzaxsny7jqm0rb614k4seq6kvlt4yb1f32q44jyxft369j8ic2keotlw8qmrzr1fzhlr8r7fqro97yds6uwmr5nvwy2u1aeo87baelu21uoddk2clopb95jzo3zyz55lmgwjtm2j3vdtbrt41lav7a9hlh1zlrmdu8c13ncd2bn3ddzcxmo5qcmtcvodlbs6a2vl4w01q909g8hhhl7qa1p8n0kr82s9n65v7xgsu8ym47zo6fk2nryw01u1mgwmkbrjsdivuz028rl9kk45exlvmufyco88upk7f66unitto5mrlcfpyzvdvdj684edyz3mzo71qafq2fgbshyrw4t2z41tnemu0qj25q73xdfxxuqbrz9rpp5s78s2j793l635l4y7rgjm50b31lxh9903n5ocyl02767rorm5i0ektwbrq6la',
                fileSchema: '6jlyembk25qwipqid1678py5rgu4a56kbrsm20fssevns7v7ocba89kpcm23x7bhzjimpb9hvxm3iyydh425phvjsbspjbexx5f27bknib04118bjbmc4oejowa5rysz41mzxm7nhxabxhhbstnze9js3kuv4ymvd6hlnirgf6wzfaih4q9x1t1ybel97wbnys6i0vrhj4tr2j7j2uh61pete5dy2e0nqlqol6ybg1minpu4s76gj1j3xqeoreq19xn8elxo2npcbpni7pw7w489s7frt1lfqdnbnmg50qoz2rcc4o8xu6amxjkyd1wslzivsbd74xh49wyq844cdei5lqkjsrddah5vn08gk77gk4uk7i2d7583ds60ctvgx7cbssquivl4smvxk3vznkamyn39rejm1ne9ch0vsxjshjgwkhk8uid3i97gpwrkto1y0j311cnre3ds6uvkmplfkx32tqkqmxel05lhpf9g24n1cpidawh8f796jpje8ghndpk85racojiz062yqhynn0ema86zmo0oqm6e94qacxlrtvvn0m2bng13xqm9kh9a227lhsfhxs84w3esvgk0n3pwm5v958qh6f5f1v68myjws8femffrsj5m9uu1q80msn0eawb1cd0wlvpolzda7gj456tziurysomx8k1yewkn1rs53xg02mtzkwenwjxd9wbavi7sf4dvjarl98pdiwcsc0o0p8ovlfixzjjo7xl34t95ymbjvlk5lljd7ows4kk94rv61rkj3pnqumqoewp5488diyb4wxr6xuccg5qb69dii0g4qqf6tjeoze7yxl02m9w6g48gc71uol5fjek2w2mziah8ll8hk6wmusktf7i6qgiymz22o3ohllsiwrmjjcxv3z25vqx53kcpbf4ypag5fkdau4dn6eb9t4omt67rsnkpmjmhr23ndw2t4xqqsu8tm5qm13n78923wtj9oowqzonr8bkjkbfi8xln8bkxbnqqd446bhnj',
                proxyHost: '2st6vaced2wiydv6jw39k1vez4pnupgrsnqxouy2vbvhux4ake7u50exvgdv',
                proxyPort: 3585565108,
                destination: 'gltug840p2my559y6tneo49p5hqfn40dk58wr8kxlioshqgmv13hdly36hrgeva0lqsnaxfba6w33sjqbpp37isvirawj5yi1gxl2lg70xqy5zv5r6lqycsgjrk1r07p83msy1sf0iprxzljrfhd5g93rgwuo420',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'tasn5bzveqmpssfls2pp44knm51exr96jz5eb92v7gdrg5hr846yh8e75sq84hxtauoble1xm9wme0fzzbadyndd2dq40fgnvwe2mkae3ue4dk9v8kknwdgie3zogu587e3magxut61mr2hc4jjjwq8hhvt3qofr',
                responsibleUserAccountName: 'q360qb3yjjd62jg2nwqc',
                lastChangeUserAccount: 's1j15hzqlo9e3w23qi5t',
                lastChangedAt: '2020-07-06 22:58:13',
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
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: 'y0yw9jwuzf4hdwkwve16q9bsskhh0r6tgcztuqutp748z3q02d10z8l5xs8oaiv8yo6tueufmwynnbx1z9hsnx06y9h2gnbqkyc0cusizcc87jtzxx00kil97ypl1tdvp9sefglp22gsqxu8wa7gdgbpea9arphhd',
                component: '4aubnhy0gq8jc9ddquso0wquyxjkhffn7gtsenaxni5poroambuis6v9w8yoj70gi4t7ivcwqfzlda6kfhbc30d4vd935lcexrlzpbz4l8fkms82ox1564nuqurjcowias1g8d61dul4d1b8sr27tt88hsjwgcu5',
                name: 'd5nyvg11p9wewff1k9jev7fqtdq6tpnolcpcp7kvz2fuuad5047sx1qyxdq5iuwnm8h4cjy9u78v4u5zvpqh0lknh8art2xob4vx010uh2eplp01voz6y3o7i0tlhp69ic7jhq774eomlv6taw7tfzwmkuszr98o',
                flowParty: '4lbourqjau76joobec14mozzn3eehl7hlv29orjm3upj4wdsq9eeizrwmtfajsaqwxbu3rqx9wyx16seakgeeq4geut30mesenrbj0masp7b5xll3nn6i5w64p3qfalzyji5jp79eaey342oom7cnmsj63nsp5eh',
                flowComponent: '88qs66qh7tl891zkffwqyru1q1euxmb7ss8mr1nxd6h76bh8le509zofelsf7nux1q3szwbcvds5v75mm9ibcwlvu700grxqugu94j3oxevn2zfwzkq8t2531aso0lg6rpp6u0mmz796xhlap07fmat7rjzghx0p',
                flowInterfaceName: 'zinu6asuaytfhlxlt7scybv06pym01f0j0w89ecq049pndv5vqpwjph3fb0jh0hq7hog6z7vghhj67tpksgcrkq270z7b5lzy9bxguic6z56cnkx89tt2pwf86c5ne75cgfm743yxhcih18s9xkpk77hks1ua59j',
                flowInterfaceNamespace: 'y1v8r4o0ct5a4mxkiz5hc5ywhrk1optv5kul1fg5mldvqu0784p98kwqjhqk89seyk1dmuxc3miqs7q2r92xpsvecdnicce33nf20cduv1lr2ddc47wpy6h63zlvxpekypcoltze12mjge8kf8ep4gekibxqq4pb',
                adapterType: '3jrlpm7zqoe0dnolbegb6dv50mcv1ou09vjlg2edh4v3ix9kcp6ep5w75ywf',
                direction: 'RECEIVER',
                transportProtocol: 'xsa037fwhhhf2s98uj2wq0xx09vw83kibvczsm2pz9w1b67hmb2ga49zycer',
                messageProtocol: 'xk9ia9ko05xre20b8wm2bxnduunkve153i0udcbar9wqnxy216axtikqqjhn',
                adapterEngineName: '6krqfxj9oday2ivwj79fo74zy08q0blfstp03uv7extt3mlrzp3qqzjvg279wnl755adlt6thnzqmqr3t4tyj7vp46qo2tg3cezp9ru47xy67t41wm0gczc54cbqeqmwthjxez46wnscnh32ynt8ycandgxwgbkx',
                url: 'rvyilgxne6cm6uwwykrjs6bq7a536q4l4f81szxwy534tgl20nqdgcjyw849z65j0f4do8a484krgk5wd7dpn7gacdreu0j0fufudumpt3s93omhqvj9z2tyxu7d7r7lbp5pce4zkwm6q02ipjynao51ohfpn48i5mdjzbgpvva5qttwgsb5y7c8h90i064lj4wp8eb6gdlge803drl1dytpvmwopide85fsmlz6fot75165r7511ox2pn1otzhsalzod0e1i2zi7hpk9s6qo1lxx10wfj88wolchoh1mdimxye4smkq3sbmtsouyh4h',
                username: 'oyrf5sem5n4so4yenfjsmf75gse4azc1aky0ohl0neemh5gg2vzq9qtpu126',
                remoteHost: 'll7xkf6bqywho655pdfhjjuchs48amid5fb372t5s9cba1lep9e53ftugnl7rmk4bfpblettejur5rn1msb6338r99lmlpdkq9igl5v2nphos0rcaqlft5bflnf5jha89v78asd71tilfp8l35nmu2qcfrtmokll',
                remotePort: 7047893883,
                directory: '4cyvbvkbh5u9h2mi32m2nbzmb7lb5y1k93wo99i4dy6cbzg78afg3p295blg3w20hd27eygi081gnb9swrwu98uzsgisk14b1l3qjoya03bj8kxwls0xzk7oyjs40bc4rq61bej0b6rpt5578ta3fwg6h0x86qauz0rn4jrggp4zp5j9d3z0lwuendkumuvd7xamso6cv5ns2wchbv1p6sj4br67imaecmorsx0dw956y4gq0mrzfipwp8c1aq9fob3wpksz5b4ulc6stpq3x6j6lxsm3eygjuwi4xnp20g0p5fzej4pb585qtlwzfgxrteklpdayfjy28ds5i29ewiw3xy3dni3sgfu3mssql6z4simkhjt6s6fdrn3l0yqwxtaveggxl1b0pbctrfkjrlubftmomzulyja9vco7g8b3aosff4nnlaahlb7zjfuav9bptfiak5g86gblldz44bont4xguo2owws1ok0ir2lmdh0jufqoes7zc3jsjzloxyv0n2k6gov1mosrl6qeq03mp1544uoy084wyt5p8aihycbxv3hiddypy09z9ozwh6rcfpfq7a9siasrj4odjweqn6v2ttooeq24ljmq04v8zeoypyh0pxthxtyfai250yn3vrhfmc2n74xokvbvbgrgpae3bwn3gtyllthk07z3rsxyszuuwbfe5zt5wi9t2cfz9uki5nprj26mei468i9mta3fe7hclv9s63tbghvjuslr7bsm7xfdy8jn508s7e1ijxb034zmex7u464rgiic07glynkde5d3yo6ybgwmycyab3c4snoiyip5uuho11a19m3acggp1bpvoxhu5r83v2foecxznm8yiz9xxjbn954wojggcuhedvhcrh3clx20rhu27qj2njavgqjvyjnd0vs6zrpqrzchxnkjsncum87rnd053nyx3n4irstl5bduap0cql9b3mejpiwjzfed21erfuqyv6iia3fb1trjifm4ts4w463940xld4m',
                fileSchema: 'nk9jfxywnydn77y2e8raqwkslqoo998k2usllb02yoqd4efawibvv1pi6zrvmjjyazrjubf2wbk8phx69gpihk1xgrsb7ygeui4hhdoo5rn1fw6iakozv1y0fnz7rmtxmkm26vu73a8qufs0hv62qfh5je9693f2tzjmspj42wpx9xu7wh0t7lk5gpbdsdl2f27bilv0eker99i88obhzsy9y7vael3hlvw6rsnp67iekz9sgfrl2sprkm6n6nzqmufogt367kpum9592krvlzi0bauqscd6m1brly4c98lh6ycdcfn3aiq8tz0dfqtnu5tf3c1fmn1m5fhct6jsj87tgqj6sooil6c9bfkmj2gq65rg6gwf7126cqhk5heacrf3oy6s0ukmd8ziw4okhrioga5o5zmequbyr897ye1hzdhwj3c2q3bkrztv3jh8havpwh17essuzcrnr0m30s3qdc3vr0wvyni06aicqr8kbjnbms1h4s2qmn8qdxm7clj2d78dt20fm6xmmfreg9fu3eppf2xysvgj37f8dbgdskx1x8cu3wsq4d5lc6k80w1vwkyazzwkv81gflte98z5rijuemp54xqb8tczlh219xr1tvk5ctg5zlfwps3dnj4z4sl5nwc4ngw4w8hct1s6x91zwawlevets0n97vljnuinqzm7iuqvbpjt06ooa3mn9ehn35a2a893wzvca2s8j8he29lmwi4s4k2x6t7jzw9dxhibtnea2ecfwgeyzi3shbgze61lfamhi4emamaei3oux1c8bu2l86paeafa3ux9v80pzwjv1w0gfbqa61ts64ss2utpcljcfaxy2r68pno9fgfx0r7w6c58daiw3nbitz8og72imrgv6yguqat8c0vvf90buos6g7g6ihwiv4obnxcx2seq3pd30jkjklo9wj4ajirnnb7dqb1aiakzt59of0qyzm5p375yezzcndju3i3vkn42wi3wads7c20qoarbwj7xt0ad0oxa',
                proxyHost: 'lvpwc8f9yxbtexwid49yu76n140k48dbg696e42r0dis54apsof40v9hp3x3',
                proxyPort: 6692890594,
                destination: '6xgsa1g9thb0cyie4epkmoewzgrmi550pcnf70tsm9ea9ie8j0ug51gl2a0gnkq9dfdo4814ev2z84b0bjaxhg0cc487kr6j908r4faslxlhvc4f3ea2nmi4usyk2bqexsuuctfzghgs890fwzqxqa6b1jcblyii',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '681plf9xrlya6e6yym0ojw8s6vv8yinn5yw8g3psz7syzlasdmqtiq2noi6kanhts93bu4273snsgv21q856trudwc5henihklxgijd6gd1p7aod9n0p5fsakr418gk5k35nchmal0r2nd46zu1hjxv1mvhotwch',
                responsibleUserAccountName: 'rzpw6abw7mfgpoplj36e',
                lastChangeUserAccount: 'm2sqz9mucjlshrqacial',
                lastChangedAt: '2020-07-07 02:15:42',
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
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: 'vxxikjlg5dtf8cnf1ekgb7xqcyc7487gsa3nfm70rafnrj555cakczu4c7of5povhv9imitxn4y6a8672jsdvxe7r4h562121qamdc90gfy5ckhit0a798cuexmesygycpwxansh8ujzdgzf2yvl4p0z8kak2x35',
                component: 'qyp2wld1117lq2bjl2f1rsjekcqoh8cvg0ge8e0fdyt77agixqlxr023zzz1ad5vldvh74y29a3so9gu9xpdoalkiprxmrjsavry2bsznpqajow6cffnnig7fp6zt97zwgsi5fh7fht789jw04u49z50ypz9fgsma',
                name: 'ya5gn71sdv40bxjsg66bj3ilzeush3369dd81d2y5d4wieoxedx0eo5t7aghwg8swlcewczn1tgj44eoruxtna1rjki9xjh9afsvgf16igh3m6w4qxcz2s7fpf2rj00z0ds5zmevj4mik5sdqdiqoqrcfnw7uky3',
                flowParty: 'kt89ualm7kh655fsnmkqnkxm8rps5c9xgxwq2dvs97uw8w0xmqa5m4d56hw7jx8noqf7h0hff1twlpa904gk0lc92jxrbusvk6z8bweneto1ela398wsduwpofnadsf5r5wp83yz0r6b5mdap53hq3cydqig0cz5',
                flowComponent: '7db7faxvt9171geeejq0hs7wn3jkezqtup5iuexfqm5viz5p4muncldcjflosf3il5mklf0vxl5krzoxztgizww6samicwd3tty4oj7wijxhmh8m1kt183knga37knwydjpswmm9j3aitgp48054049z6wumq4ri',
                flowInterfaceName: 's8rq8sf20quxn5ieny81liaocbubgpg1jf1fqsnbsxq3kv8nvyc07c4m1byx2fdr41v0saf5pey73muj3cb3e5k9p1c7l37ys99uak3epjeopuvntj92yx88uoe0ykxtgtztld6pj0abs3boe41k6d9hve5j6yhh',
                flowInterfaceNamespace: 'x8xuaou76trokhndmwk48x77faarwo0uebg5harg247vyk9s0navu0c91oofy8mopghgdchifqkbhwjk1m4i7k2bx5jc155xxpc9ou6f7hm5pj4hy2i98b99bkhfkeqxtuhesxkppjo1viuovrc8mg3tuerimutm',
                adapterType: 'bcor8q9uw8inp768c69mn4ok67a39ahkqy9fc6q0k8jdplttbl637oe86sly',
                direction: 'SENDER',
                transportProtocol: '0vn0sap424ydhecbravrowumx9ltk6pdygj8gu0dszd5w2lc5pqa16mjg9uk',
                messageProtocol: 'fzjzttqhb7pwrsfy0agkfidttdhpfexmseyhcpj3p0z3jpvvpfc51jui81l9',
                adapterEngineName: 'zwjywrnpxr8z7puu9ya5oh2pv29nyf5cke8emqv3bhl5calv5mwrjlfoykavoodqixo8sjke3krx9nxgcjumctb76a1ykpj8fq9wyq3s0ym27hcer0ifqtwg0ol4qq1gfbztzctuaa743vwxyv4izxih3khr5ydg',
                url: '0vbh7solfixij8seuc3legijmfhqk773j3syyywp4jmdwtevtj1jg9yoer6dpl3k7wv3u5etbqy4bnpxarpdldywoh98e3gwd9btb8567i88p5aairbsc7pnc9mjq46o43mhyhkf4tu1fr8vp429tc90x2rrasy3l670w36godxxebtfenxg8hf1521soyzrilsvo9qcp6qq4zlek30ihuzxpqfe4lo9n3s48jqb65drpfcnujjasse9w41mbjzmdtbmtiw2goviakbeee7g9dgr0it6x5635ul32up03q8dr8h1rdf0bobcijr9r2lw',
                username: 'is4mnl718b3ioyqnn1nnrufz6256svk1xp0kkycmu2x8fzxsif4as76t5cz6',
                remoteHost: 'cowdbbhje2nsgxuprv251gju7ytcn89calr473lr342h7ldtaz0zxl9ckrjjw5deffybs55s620t93ggiq4irvy1v7shbxkroxy25mmnl4pxewely7x6wt8agsbi7525cu7g88jqj17jz8tewzzx5lcfb0ynnma4',
                remotePort: 4683758591,
                directory: 'ih65oslvul16fn3jeu24oy0w5szwwx0e99d4urkabkdwo9hoko9zyc9otxsvw5073clfhe4c7ruwr1h5d95mittzhe8wuu43wczjrxwqlr57b6yg1rzjgu7r41gjrjan81elugc3ikxmw79ed0myvhba2k2lsg3wz94kvz06aclao43nadtwp9xnykwz06nx0n9zroyvwz271fkdsvfo027c8pbumr4ti9dtcjkh57k5au47dzf33y1dwwwtdkr6e1fh1cy6335620xculu0p4x9ngebnai764xujzufm38c23emu8m0puzxfytitfg4i81uieu8a4q7wg67b7qghapsr0zne75wq44hmyio8cza96zs6g6vw6pbrri1u7skwby2itzb71ad0ku3x6izcsj7yei477q4glk6zzj6c6t51r0az54f33xcv60twjgrxymtqj5elqhgghx38mcgthelbowcsc3x99dwadrisfshltzn57y846pi3lsfpnl8qkpgrfvamqnbg4eix39cuhgocf28zr31r9t59j8rfd6iagwm2zp7hiahbjffzi79k4i05riee358m5rsbfg0jbhuzwujmo9omthrpays9gimpgy30wbx8aae7hk5r25glbwg30ie4d3xjbt878mgh3i8s69e8qpo1mrn9mv4n3hbzjqg7awbj04c16oc25gw0q3dcruh2tsvmzlvrhh45wrhil360y863q3ienqx4fx77sv8b1abzznxluznkwjj21xuk0i05m04nb7yeyzmnnfqqdfhr9moxalt886d5usdqtvrjg7yyk29spqto64u04dcke2u4xf0alxgc9yz2ii1r6iba6ifwu0070srcvxog5l9rf8kpkts6j7c4ktofsu2h277otoew8p2rhzce7ij6pvbhh3si2o5etnigejpu1irvw9fkd96r3zmbos6v3cmybri6ncrm6w8pbw6smdtzfq94vfhbya4e36fgitzr7bmkornwg308s343bjx',
                fileSchema: 'wam5rlv8e2330w1eevhh7al25p9d96n1u94fsyzbz2gv1cfxo8i8008bifmvyql726zki9koso2vkgajk4qfudxklqsz59j8edmgvlfm079632y5p7mm142zzjnmgixqjt341en34mvyomoaaigokisjqguwrlpbe1w6e56eroqmybpuaouf8bry75spoo7ap6uto5fz4zl5ryci73oeul7tse20q608mycfseax7284reb6daz2eytj23gn5f5eg4yu9nfccfx6o1ape1p3l47axhb1tzsvff734vv42j7v8i9jnb57lmqb0ffzwbp0zdbciksb8b8f475kktyy2v3k1ndcpbyvv8lau7jkbv3dawfssuprrj67o40pl0i8v04qk1jzkrco1vg6tud1z1dr0suwbgo2nk4zuejei56zrjh79vzs3ntfe9lt8syc16iihlonf568bqjdk23uiimkl80dtksitec9m0fnrlm5s8mebdqh8n6j276foo9qvsxelxevwx7rruzm3rcoqe128trlaxbwiwm1nt7jnb9isfgg1r202qcdqljpp2ait203bw34cvnnggmotivyc84uoo5vcn2usp07ver3jo8jppwthb3j2hijvkptqovxefed28qhm91vbjfqwoo4769yuhu2qfnt1p3fpe8y2optcuce8irc4z34bzx26805p866tbhvakhtmfp7c50gv4xiu2kmaxzip14248wt71nik485dfpzg6j1qtfqg1s3m68r0ojivextmlyz5129zrbeco2w5d2hg5os480g7akh0c2bjoecwcdijspdy9uqsj1kfcxjg1435l507wrh1luz5abn8yc7reh05aqtvjdssm71681a61l0r8lfjj2zg1qbn56org0bslhq0ct0re8i4pvkdlqia5vf6y11pu6ny9u7t0brim1ro1s0i7ljb559njcb4cig0u2lkt0qz8cku5b7zg0yrloge41jpk5snhdi4hl14fti0ubyv7bd',
                proxyHost: 't9d76zuzssjivsj1xyliq614vqz3bp01pokaz6bb8hs3nhwvx39q1iakrkx2',
                proxyPort: 9562811121,
                destination: 'ez0d2m1aq4s4s24f3mkt2zd6t7wv3dllii471s4far8oswfs6b869pm34qsyw6mw6tlck7o4hjtmd960rscs0lv9wdt3p0l5sfearwbyurbnh7zzlj95k3h8jo6hrpdsq8od32tnxuoll1dlkhfwqebsneuiguko',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'duq9gq14epnjjjfhxltaxy0o56rkofll5geosci7bka21ociqvd9f20nhtesyf12nx60p9t6p0lrm8zjg2dd1ekv4kc1cqsdsom4ly8uuqc0kyvnferbqkq14ukvy2lhhicn3fcwpduvjq6l2861w6s8iuc95imp',
                responsibleUserAccountName: 'f0ebch6cqg8kwb7i26ii',
                lastChangeUserAccount: 'ie6vu3t6chy4lkau4nst',
                lastChangedAt: '2020-07-06 17:15:58',
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
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: 'sr7oe8l35cczabv48sliga1bmatzl1pepm5vr1r2hg7omfgbij345q7xlp7c7dobuscnzgygmrcljpu0zrqijs7a3rjn0trxqizwh22dgagv841zvr7io43u8b8wpk7h8gnos36k2v6nf3co39n193iu9vysnt2g',
                component: 'kdco41dab08dwgjh5licugn2r2c24guu1zv0e3tks9ty42n60tpqlkr7e3epu0niz58m1rkduik8h8vhqaft7q8ps1xfcpulirvedr2fl292ap6102ysjinqimgc8dt8bfbsyklnducx0d5jq476lf6boa7djpn4',
                name: 'e0u4g6y9dnb89qh2lcl3h4rfym462s7zq8k4nytj1s4mhyv80y9jkhhwiu4kry7ev7gvecozg9waotxoff91unv47ap3ompzexu99hqx7ncvpp3sigt2liu65dtwodcc23xrpb2oms5m9ee7zpfsk95pvc8louru9',
                flowParty: 'sturb2ju4ufys49b7hlt9ucj0rgtzheg4ckeqlfowpfj6lbmmx9cp6z9rxo45npt1n4w5149eikn0pv9m8bazat4u9885gyxlsjlufjk9yj84qg6u9pr7kpwn5xjimupn3i33pi1b8g1zove8yryq65zh5zcz3jq',
                flowComponent: 'fj19isiwe2k9v260ypytoldfg1xbxhjitjo8xfyaezndt38ciuwy0cgh6okyle5d8t1nvkk6fdk15u7gg5g60ayuq44u1vfi6slgxi39d251k21hy06on0o09y1spj716psz7nazkc0jmcungytafbfzizhlntyj',
                flowInterfaceName: 'aqkyrspg055l8pirs7n93fdzjlc0gkqs4qf02g2943ap1395xl6ve3lihwzhvc1azj996vmhr6ui5izxd7bu2vsz9zqe36f3el6vboml5z7293uebklwwp7sruddp6740e54u4lum2vhm5r23juxqq41zqnumvcf',
                flowInterfaceNamespace: '8gbd78rwkmg2e3o0txs75xjeibgo0owszlebzzu7p1iakwi559obajby7s7xzcyal1loilu0kkzntg3reo6dgkwrqmcmf5tkrp3g1oygedmzshwybp2py1vbqdiwg84k9x2yhlw1fcypafj632dy1xs0vyu078pz',
                adapterType: '40vmrwi76tn24i36qpxctgrtrgsyufdaqw0q7bjt1im5ia9ggok5zv5622o2',
                direction: 'SENDER',
                transportProtocol: 'v6207bap3wybx1nvznrogsyn1zx5fcr8pby8i2k4jgmaeem7ms1x21oxd6tc',
                messageProtocol: 'k2yoe1dmupdd3zoms8hthkxld2tg58jpye11kwxgyxdotwdxm7jfwg9tvhyu',
                adapterEngineName: '6sa3tusyj0jsd5vnue0y5hx4y56ckt1xf0fyif19j2mcdqlnkxw1n15aijncojo7z8aozhb88gbieph2g8066yzxdrrgcoqhq6ppmrb98yxseufhx25sjds4whzf2254jeeb04bha5yml83pjtguyvtvrwaafdfn',
                url: 'tgyjy77mjqk459glwyzduohxrnanmsn6vsn4vqhkhlod9bew2l9x3fprewmnq329xv5qrov07dnwecmvfbq9cd2x7macbhu90akjmek8luzw3xy9cyn2bmlmeu5dl505fabzz4cpkmq878zzg9gkyokbhxtm74nsh1vjq98c7iv86qoc869u3kt6cg6f6neys1bi3kahxiwqiyxxbnyhrpaeloj5v44th6up0k63n6ly32n9hizpoe1m6b0mtiq9epc3h3agc8n73qddl4cp6s0ohwgkitdsxcixn3e4vn4klyr6050k7ukkr6lfovq5',
                username: 't8aj020o1scp012i2pigwbanzsghv6ixpql6u8acii3kc36nwoxobzaitt73',
                remoteHost: 'y3hi1e45rvvwhi3h2lp4x0fn5bmbkttdc2yxamwt0jqh7vf2zgd59fopsxt8odmfm46luqnbmuf1s693umvvbm1ml76jtveu1zvk98u41zojpjqzs41syu3nisk10e7albve3dxajl9cbw06kun9kwe4fxv7chvj',
                remotePort: 9320365568,
                directory: 'hm84y3tgdvloq5qd0vbv5i5qf9kzgg40rwdn4uphgcqfs7rwp97ehvfiov5on0a6xadfsrj0qzk3mskg4ewessfo4r0qncozp2e2hl6njl7cmcluxl41215lgjnygwvp169o35jdytttdl469aiatyolszp8z2eyxu4nunxpqkslsdopjee3kbi0pn2vthdwcxo2dz17pywbd5nunjo0crxnsudbrzvytq57c4y4vcn0tllkwdzht7gfi809148e2tr2gwszn62w3rgznrg8q0mlzkusfhfnzfvk3so67gkk8w20lnrwstbk8k5orpty974s82va07fekrmqjtceosnswhnitr9rdqbhl7lf724oajxjascq4ndh859j43tmjc5g356hdmb4456kw3ubh7is64noblzdrjfu6ry0fwwrmpyut6o536niffo7bf2zpwyiaftmbhcv7vf7cdjeoethqnhj8gyq8vjte3oult8numm2jp4rr4pty32tmq3q4yc80wict7b9bl2jsh4gjlr1n2atr1p6e30ur3ynl44hrdgbroj0k7rodf2up9tnqkpqhxudzotblck95ait90tudxi7l9mb5vw3buaqh43u3q2h8cnusnl9le8ey0v85kqpjtg1vlivke09crgouwiscdcvzsbyei0a89lgaujkg2z1rwmm26yrye4kb16vgyyaquiw98g0y7oewci6m91cbzh98swel965462xztx2vd8jba1qxgnbyx9ikrr2tfgfhmgcdvnelkgt0btmm5574lw3hxtnwms3ruis2fak5uexj8ockeos0n8fnedxlxv2r5ybe7avkeldt6ltqjh5jorzwq8q88p9saxiwlx9omc0sfjojnwtqej51fzqznjatnyi7d76wt2205pej5m0r7nh20ywzcym1w6gizm42lopt0h78a8m3ark37va8xh7ybnhnvnineqjt2qbmbmpmbkek3e373gp00ifhyk973jmwvh8yziyyz2efm9u',
                fileSchema: '7h2qxc4be1tcigllsudptp7j5jhq3wforxwyatdp5ru2p44fvj9gq7bet6ex8ix5jmmsjm9ruwq37b4mrx2jnpohbvb5swnbfpnbnn8vt9flywa0nvoyygrluq8jivjdd85qmplqo7oldsozop5speuqsywk15rwopyitvwwp2giqdfts6onufrveri1eqg4u5tg7tp5h605ds9b2lghi7y4et8i34l6h5h4dy8lwkyzkbc6ww0fcjrktsozqgpm5pu9sevirexga3vp5srcod27u2wnm5fumnqktq73etkoic8kstaokp4kdoznhvj15mold9a5h0furz30svluqmjlxaupmrd6r5y605f7rg3lfwjj81s2i1ev4ag37693baxb2hfg96a0nca5e4t7d8p0fmydp7p6gi4lwtjii1n9r7z8c05bwhqe1oafr0mfw31fv8k7p796nburwhsnjg35wkjprywlnpukyaf6so38sa7qvoosb0xou6u2vq59atm3adipcre6eowkvuo8eg0wg4qp3n4gmeada4ipovc9fchei53gbywajaz3g9yxplr0chkzyp4860yjwnzd6dogagvchtuw083qp5jjnfx5nb878iju6jr1qsdbiy98tj3xtcqmw9uqvndw5l1oxa7ewaykqa53nl9gdtz5gllcyvd1xbjhr7n8nrstjyx61nuyzl5jwzxrseb6aa1bneu8zt56df8o6esiwjh22hj4h4xwy5hoa2z50qizea0aadfz1c0a6picfbe2ahol8h0qgrxladcks0bh2h1wlezdxnld9da6f2gbkiyrchjii8mkaeh56bonyz51dajlhk17o7s2enx6dg401bzz7v6upx63b6dwvv3fe91oovmd8hgle8ughgsnqhplmv1w5b8xb6rulwrl9sqf9u1xdb0kgmbvlhtnnanwowhzf7y5d3srqjz51mjekhukrmm8njbmg7846uk07iybbsrzxtuntpelffg2dyu4s6b39y9z',
                proxyHost: 'i1me8x1rk14wcvwjn0l8xhlw67dna2ztznrs3rthxzcj0tq0z7lbp4k80fmp',
                proxyPort: 9333436975,
                destination: 'b2talnjel6agyjwwz99k123vufe39z4xxvp6aexv3sm86pu9xwbavt9xtih9u8utwm7t64i7659a2jljzn77b8m5nm8tp5sf7q3wjdb4a0hawttp43wcra0zgzricqc9eczv7zkl2nca1d8dy4zfp93e2jwpkuyt',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '5tg22km7acrahlclcivaqyuksfr0kjsg14sjwdxjd3t8wlh3k2j7i17w8bjdao91r1ualosxr9vnr5jh3d392xv9dsiktbj1zmwb7wsclc81flcsr6dlhjnsh3gcwnse8s20wkf5u89ush3vn9gcz9o7mh4m6yt0',
                responsibleUserAccountName: 'txukm5oaqy3ab6tollhh',
                lastChangeUserAccount: '3g94fh0z8e5vmzzt7ieq',
                lastChangedAt: '2020-07-07 04:32:06',
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
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: 'rirbsuij9c683o5djyzlynffvf1wc4svc6ksgq5b9a6pvorrp7zdnj8t00wlz9zyzuu02x4r22qy8rihs5h5sh9gl5tiy9j8po1n0wafy7nu98kjg9n6i7cotzxb1cxm8gz36wzre6n2zrnmw8knk9q10zf7vcmm',
                component: '4sgkhgo3bme2p9b56e79m729414xkhi1i3x145x8iwfv1vdmwn7ybky162slh472f2q2ljukesi3xudne3r4h8ax1nvj3wqucxfox53loju9c22mdpei53rp531m0kis5uoaju0rlk1be13lcws91gtc5yz2bpg9',
                name: 'jid0swyftg2fpvqm3yr6vsqcfnvuo0dipzo8sosccorq5uawfzm2egtp8r7fl4fisejv2jkdwvab2pl9srzh7w3cwuurf2qi5yb3jpb0ftlv5iffrwug1uu27hg6jlaigqygdd59ijqx07skflgl46g1j8dgof4l',
                flowParty: 'zi2y8dtcwgirvjuu7t9qb5kfsc7bmr8x9q3pxd4buneg533hyrhfvd8ri2b9thl6cw3bkd9p2dpkkbbt6dqfkuyoyyn1g1e261xqvisjlgw2todia4ta10i5tpg9xrz06b4dbp2as587tdtgatc4ggahj3oabjynf',
                flowComponent: 'nfost1rxpervxn5g6ce5dlsp7eejxsmlk4njrk7wecr0llk17zvilltbuqxj8237ifyk17gom0rghk2uqkxq4y7dqx9zouqrca7ndfqo6zb4dk29ap0tipdkr2jzwctzexouquhoikomgdwoo536kqunxl6cq0yp',
                flowInterfaceName: 'dwdwov6z1xm9xhi7s9coekoc0deoofymuo9vjdhvyd5z2lq3dndq7x8o65tn3jzhov8h1eul22aah0z5lgxjezzb6o090nkx01jhbc8zganqnoqx7eogk7c600wt6sgyx5ljc57ogw1exqeippog4fnu3mcbou48',
                flowInterfaceNamespace: 'jqsf2u2rx23kdp5kb1xxh5w6bv06tyh6cqfjkj8b8ctv2pzmyhxehdt6rddwyqada9e5zage5igqwx14q5ce0dhfcfji03nrzem7jc4m2nqbtwc82zq6mup8zn5q5rtx0na63xzrtgf6nrjh7qm5jthxfwsar4pt',
                adapterType: 'evw6q8wu6kzxfnnqt0u2y984jsff2yp4r8rn1h7rc4nmq2oxiiuvw1h3dab5',
                direction: 'SENDER',
                transportProtocol: 'ne7lrf1q7f47x5redvgjmpzt52qzv1qn8y2dcwez9gdl4rqzaw3xel8pvqh8',
                messageProtocol: '9g10rp4gxhv75uvykrydz4m7nysbzrzf988mocg3mlijyx6dg4hsgsjneisz',
                adapterEngineName: 'kdnwb6gct8t25iksotqtmws50fj54akd2rq2qt3ceptut6lu1j2h2cpo2yaooseps5i8z12pqmo8g4ci7dp5wdvrgdpm4q3242q6axpy2rg7mw8zqk46zb4y9jstf95cstxbvm1ijn69wu2drugmmopty4ktatpy',
                url: 'jdnddib4wy0omjmrnscybo2qtde250sf1wm0fh9p5xon8p68jpux406of7z74py3zzbu52jj1c3b0zvprgts1209dwos6ti6grho4dgz3z7z1i9g87y5gcaoz4n26fw41fvbrs3bjkl7bwebybl4qid2y5yao4rrshh31wdjh54fliiwblkpr5fpwkmqpf7guxrhdi5g8p3ainnw59fojdsg3iyzwowhdine20vzcrtg6b5gs1ga35apqigoly1csi5oggfzcsjaj11wxxgp5761qo89bsu7jpgvgnfb1y32lnz5d8bzocjw50iaynze',
                username: 'n1fqludop3xt6qv9nqajic3ms185xh8b51beju5p4kdzqu8itdg7xof5ajsx',
                remoteHost: '74xlh063qw5i5bs6azd00tbb086dzn528n02x1pjzmsfvzd4k0akjtw9mnbvfbpsu6p2ju5vrigp8s6t4ml1cnvver7yvrrfhow8rfyev5t6vhn0egojbwm227o28e9ok8stoiaxagrusswye2tfc8lfws5lcin3',
                remotePort: 2714318105,
                directory: 'arrv17y8351nf5dgggogi5bl83wq1ldk1xr83robw0h13gt5gl5qtsca5xd2dwqe6kom9curz0ynejwtm3afkb5o9kqsb8mmchcsx50p0c6xe8p7lxbd4vk20u6pnk0kfe1zyqijy0ylglb7xy9ogk61gilida36gtb4mo5mrvhmzzr6p0bamej2lat5v4ychev3hhby9bzsyaaov50kiiyw1ceo7n6k0gyoul2pqj07z1t1tg1joql6gb8151pnaup3s3o6zw9hm29767u8d937e0xm971s7931a4mff77s4q36498xhuxw2d7bbfaphoaorv04t4sxhnhecg5lekvqt8d1kn9nb45gf4op52lnxn75rodzkcekxz5m89zn7m2y0zb1jl68fy444rfg8uti5r0vxtvsh6okt6uwa5f0ftybuw7364g34srtjcckqtxgzuq03cc3bpd2fh92pkf517ttmokncpvwo6law9iuqm2b1joxb7xer6axapbrxkb1i3lsnrjheiwz2q95octed74t39vuv4jmah0w5jadzlqrj2bqgd33y4534n2sz1z5iuor42i1u3w37o9a4vo4it3hrr4n2x6ahevk8pbna159244so6y1xozb8hfm1e94s3hd38szfnkwzjw1zce11xlfblyyevh44gsxhwum1bm4dzwze7cd5f28c1hmzarhvlejx0u0ij6rlssaanhe6esnkoz7mxi9p8xd4lpuftk5bq2g5rkkuu5hrbkalteopq0ckopj500eadnvfxjn3k0n3hpa0brodzftrtsnztphmgnaj7cdxtnrqhxdxwtphseohh6dnisklyp59fo6pdj11ojdsekixprtreiltjfqthfdfqrj90lki654ftav9vlnj8sl704gogcfm3xmfgdge8kqzyqfhdq5smd97qdkjik21ddc8swaeecnw5wffalw8o47bouulb035dl1fsdlsgb4mtv131c3xiwe943jf19089641xhluzvo',
                fileSchema: 'hwkahn7gia59v75g6qf5o8ohcrxkw00woca8z57q6dcvyf0ucclxiri2qrdmrj1v71mh7wui6hxgyw24un5myocqe733g0w62hilvk374jz1ze1vphof3ncryz1b20gfn0nppdhobanvdi7ikxc0a4c57z8jnrtkd551375jx8a1c0gtpu3sshazb3y7sirxjc1ulxd96e4tdllwzdkn9ta1tmq6own4ledfeouiaqspni0yw8lqfkdnktcttc1erc0yc7kz3rnw0yzsv56e5qg16wn71inssm2ncceal8gej9rd9ob15tnv1abnh1iupv2an50s4w9r4bzdx8cowd0lozira7kftc8vd2aoxiomqp5sp0n3640k91cl3a79ku6j0z5ww4hw663mglq5n9e6gqhhlp94wq4r97035gvkv70hrm5xunmckxo5jyqybs7lkt7qxekpn74ks95n6q1rom9fi62fbhy14o9o4wmv60yeeyxck1493vo2f66xjvq2d2dkze13ei77ta14qsisxgx3oe9e2sheqgb6sbaa3u53x8l61j43bhdepcfxntgj0e4lkt7u2hq2237dkuo7ftunz0mzavohomtzmkrlkrluhigj5w7wj0zh38pi61z0p0ktnh7pe8j92z4nhov3cvm2nok6peyx2t69sjeehadpz2zyxvj4oachjawyx91xz1sicfwofnhi568akhusk1gxjld09ridnc7hc9ew628r6c10pn8p403ggo5t1uqjoy4pjuh1uwwysbv9ruvpr5tyglu3rp6ks8suj2qexoertom6d2yeaj7kaz4bghbsw4yt3bplsdeubqf75gu05h2ewh8m1gmv6ljhiru6y9siax391o7lbtsv6wvwijwijzuzhwmkukmzhq92bkmbv998xtwm3k7ayheli9qhpnwxrvvscsedoojkuzzhdiyftfdsm6453rwnl5btkao1qdtia7luopjy3yv5d04zuux2y9zz5ncp3opey1rm',
                proxyHost: 'b5w1j2ep7ctgdjlwdqbqaksk3xgi98qbfjrsk88dtrtf9x78zvf0fxxfu6yu',
                proxyPort: 6649738212,
                destination: 'bxjlhfutcsbz4am1e4162snw7655oh4sgy5ezsdq2k56lql2hrm4jmhqw5x0kbhu5ssf1h2gne4ns32bxnewi8ge81yomom6sj8hv3jjn0bvzb4cr3gklw02qyk316u5cmq107ppqauwek0r342f9rsmlyznnpqa',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'vk511wj9ouch93t90k412zkqmy98newxg4qi3i533zusxvgqccaxrvaxzdph9vj081zv0tbrywp89mycdbpsg20vz5q1fuvt5aa87qgj2nmmjrfi0mu6dzf18wdfl12655yj7tk0c1tfbvj515zgxvbyeujjtyd1',
                responsibleUserAccountName: 'oppdpo6cphkca7vappmt',
                lastChangeUserAccount: 'ihhgymrh09cdbk8u800f',
                lastChangedAt: '2020-07-07 05:48:59',
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
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: 'gq4qr67a50p03nudzbxax2iik2xytp8q3halc0p25ygncibbszvgd07liebfn8bc5b6xt6gkukng2geo8kq1b58arhjql4bux9xgibt8cg08bzk72bujp7cem17kdpjmlebg5yilxp98bwn3s7gwxw92loc1elbo',
                component: 'z9s78rrkww7pmzqjj8s4z6zfoow2cl4g4a3grz8eabuj1tf5nr2ctu1430j6jb718yyouoqnkfirh1klgxkrebdees9uha2nrydsuve9yeb80wa3iqzg0qwx3vpwndxyf13x622z455npaj5kxwf0kc6i6ds1tji',
                name: '039j3p6k8u86r446iuovyil8h3uzah8iq903gs2ywk1ygtm2y5sb5d6ym0vo2cocu50o914c26e7ax5kr2ekrlwid7vh50au6frjhnij5idt0wn1fesdfg1dytujbs4rm2yxgik9rfq3neqrd9dg8lqwz1rga0m7',
                flowParty: 'wnefs2d4rlwqux5ssx1mftcjxzqscan2x3hfjxyji1o8e8ed3uvm3o2vt4y0l255qb6s4fodhek2c2ua6c49plm0ncu5f3ynazuhe333jmlwk7hu5ufattafmp714k3gn5w7twpswmz765mwz8wktrm2x40y94aq',
                flowComponent: 'rx4cmh2xp4a04ggj2crv71tubolxl8cso9zcnffo58j2fth3byqz8jgtxj70cnjl92nz4sv340352j4x5rpo4eplo1aiukfojpygemlmbaao4alkg0ronrt0of2uvhactq4ftv4fbfxu8b6t1hmyzvm0um143kmp0',
                flowInterfaceName: 'p0m6jzoeg3adiwdgi29yqqcl1lgyj255aw7dh3tenfd19il0ths28y43xqgb53meveuii8f5t3wiqr01kvfp3lpdymffh27bcra7dfghq4oz15vmvbqranaytgvesr2b5vc3aj1h8f1i7idv1v4vj23kw5bchw8y',
                flowInterfaceNamespace: 'k4e944w77ereutlyin1v03wo21dag32h4gqquc6z6j4n8kflowp0e18f2mb3wf8owyfj0kkurxwxz2i83q3q8ljz5eerhm248rr6ek5ra90dks94ce4ve8u0lxcejlldaow7tbgk16lrjv1d4cl8qe4yr0j8kxhn',
                adapterType: 'v0sozmgbm2p2k85bmd2y2czzytnvhxdv5bki5uz93xvzm245el4lstouvy72',
                direction: 'SENDER',
                transportProtocol: 'hfxtwdo8n7u0qb8dnckokt2et3bux0b17f86hkda0fkdngapphd667xz4udx',
                messageProtocol: '2fammfzf1ztauiljgfkpf9hgiy89g2be23ruktsy1pu0aaxcb61yzqlmanow',
                adapterEngineName: '69lx5pwzd7dvsz2qwidxhdq8yjgk24wi2ztrtl6z5ntz6ekrjl20it03xy3hycke9tlfwa1x4pha7w0lhnlyyt7u6tnl2tyq6i5mj7qfgpeeria382fbl9fvgoip4pnfgv7km1ct00kr759xtf7d0lbjcbkjsh4r',
                url: 'ubthctyslg1q9pe3ql0t2rmexad8czk9ot4om9e0yli8bex4z1mcmsw313v3p20j6wan7wh1k3t90ij9aktpr4qd9td9g2zw5phppbhww9kwa82b5b077ebkmwelinkiaw8ffit5zbupldnulc08g86qb4gbgdfyz2a2tqn46d573svml0tm5w338ok89fh64m5m09jv7r9f4oapynnvhgiuk0x2uhddyen41cjj3c9dvm7lneaksw4kr8feg3lfvgw1ilnyt761tzehn1v49r8rz2qguz5i702kw7c18uqadm4ydf4gf42mr2rz2xbj',
                username: '3791jeoifhibh9bcjy17d15jem1yutbnouqvesgq41uk2os8ywys3mbsuwnz',
                remoteHost: 'pdxbuipec7zg6l4wpbw6706pl0yn8epbbn8hm5lpm12wygg3cnj0x86vgmywfmfcmlmx7uizc9ja2vgzdshyzp47em5qcvej0wi6w0rff65f758wisynky2p0snql2vk5x2sva1pq2jejw0vdjqnutxf9hyqs1jv',
                remotePort: 1966068318,
                directory: 'wipx4kb00r27524uiyk75a33zqk5ximd21o3j7yj0xwqan308glua7tm0rscv16fxpo3gzn5eqvwmgdy4oea3zua4eb6xproh70egffar8lx1mx10fj6xrpyuby7nt85u4ds2cr7gxquqqk8ni0b6messhxu0pl6msthzdf8vz4cjrtndyfbxuvths7z2ajfqsi5zokurad6zverxijb4jeoqdcnodedvtzjbzzbt3w112om41keb3br7cfjxt47xizm951fnth5fg6s74y47vi37866u8xp98ids7rdkx1pjqiz72i0la4mkhfjwamrx2p9xpp4hmel0ppevzc9sqwqapl9nuaccpc1odgrnjojgmc9lekuvap57so0zqhygx8m33wkbsx0jzo9tr1iwx9jom5ullf2xtbgdiybdu1krmxtv14855yvsvqz62jqcp072vb96arvs3wj7h8t85usm9dyy212k04md4rhjqjy9ctljmmqbwtqs39r5mhziz2r5uf4lh7kcd5bdren0uznt1s8175o3i1o3jcznmd36ae2dnaz4d6dse82wjh1w4rr6jx1uycutfi5tzgxbpz7n6zkhexge7bftlzfxa8mkdanavupxrqv8fji7cy1lcftusgl2agzbfo7ejfwa7wzcs2edd18htxm26hs6u0dr30txbcbc1ge2fwxtq3jhvd2arsrncda0h3s9eygu4r0ydr28ks0you20l20k1ihzgfy3ugm2jfdc1wdgemffbsb970p5rsfpq4t9bl4r3dk4ev1z2p14eqwqx2d1p7khj1pdskr9zce3vxk9mq512d7r1cczozxfw513fzdmr216dwao1ygjv8ihx6k560gn4tmb1jp2govxi3db25nmugd0vczk56dmxamkit36xs9nb7ma2wwc8tnh0x81iaza3sfv1a96dfxn6l3whucaehyazrf1yau1f8m5pzo1e39r9pqcw458kityninnu3owobqufuv74o8js7hw7j8',
                fileSchema: 'ggqgsiodhdfwua7rhaojmzvspjmxcztfszjrjexpgaa1t41trkajor90rgmk9x98dugb4w85zpe9xkjuegfc6t1zmrpaik335tsbv7x3v03zc4g14yuvg8s4mmonwx2tdj0r0073108k9cnpo9nnkiklzq0gaeff2vg37c16mz2xptwa9w3udt5507p57evvpwxd8qxorlvwkr5u4g7rhmvvxi2ro3e81ips0itj9xjfmgbyozwvr3dt6tvugyx33tr0zye34nap28vxzz6u4na6xil3av2a8y1rlxo4ah00mfb2ic2m22prwenovhzrrdeeg78gxtiflqn734ybwz0gat00i7blouzr5u14mcfbxx8a361o8ep8w4sksbxme3r92dw5hbhkkue5gwdz303dxv29qwzx7zlfxfapq9pyzyix6ciqyjqui7egj3zyzaneuccro0n22httjl0ovobofkta70zd63v155bbt03d1m5hb1ddifqhwrcfrskhxiytc3rgekkjxzr9zpfry7fjypk41zh0vhp4rssiiwr0mgyknw426iie6hytc3lu1af2fgnfjxxfjkh2u3j7oo4aqgzt5g7b0nqryu9il5qzlmlmpngmdm6gfkiqo6u0w3gbnkt6i9pe4lfd1rpa7se9gt5g0shdq92hdxjhe47pafvelxoq5hrbwh2oxvsd5nb8vnhwuxlfdxjirjl1heu238ocku2adhc8vfpdwbu01u0nun68htaf7hd8bqk466jcmweign1tzb6sq0gynidr3si08nppe4zfrhijbu82wlw8vl9txsvte3c91qi8jzzm7p0s5m9qj90kd4tc9351ixv5viao3078d40a3mog65yxbz4kcef229ims1ay1sallp3xdztpwbufkwcixotqsp8ynibod3ukhx8r3nyw5oxte1j5lr0w81czj50vg2qfglcqyqdyqxxaf7bso7y5l4q9cdrknznfdkrg83donyfg8sqwe470paiw74yl',
                proxyHost: 'w9ccn0gwz1ynyojhu5q1a3fk8l1eyzy7mty2n882mkaob65p9hor0xu55z51',
                proxyPort: 1830871882,
                destination: 'hpofbexy3fv83whravwi58l8n4qbt133myawoitk305m75p9wf6g2jt98juw7t2tqavbazqmp4fbylqcr3sli8fz9kb07cgeevqleoteyakbka7u01053cet5yo9zoqrohola2yghxe7x3qde60zwujhq74qsw2x',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'c28yv9rihkfylkm2ezpzfwb974lgpo10u7ae9ngr62bbhsyt392zlzin4q6uu1zu06en2yb0z1zw0vmc0cuitear6q5i808ag8nzdmyjel05xdbon3t2xse4grri26vm3dktorwv2djce2d15oo1x77yphoduyzm',
                responsibleUserAccountName: 'pz3j8t0s8ztkbnavemkf',
                lastChangeUserAccount: 'vk4x5sfohv7i0zucuql4',
                lastChangedAt: '2020-07-07 12:07:02',
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
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: '54ef9vvocssdsyq3pq2fzfukgkz9wowyskb8631qv0ldgty8o4l1fdzangq56mfr4s9gxp4a0g0s6pzaima20v603m7jx2pmoop70hofkjxun2bqju8yqcls811qdpmmqe3at55dj4h4t8f95tbasam0lfgp0vu9',
                component: 'ebc9h22s3jzx3bpfyigezvy2ssolj6fs4nwfrdjpj0qinljf50bhk4y8mh4edbpflweoy14mp7p4b6y4ij11nqky8p7nayc5h6lxjkyrr0hl9v0bg35r1jhhlxin3kss3x63disl3swapn3ziberwjwzs7f8uexo',
                name: '25phfi1ex942qmqck25b4x6iarp6l5i93lzkbwo4z4gd46pmd7yvu8h1eyb4knz14l8h35wmlzc0n15b12bylww9z0ncqpnu8598awoohvwq9ipkf0bv1pn18w0fgtyc3lruywkbxsew0gchi8cryaj9cqehkpo9',
                flowParty: '6j3ydv1848dqhtodmsq2iikg8lr99ifntjnjb6ddvblfloridmc1k2557wic8qag7bcn09qod4avlwc89m9vndwvhi0774un0qffuoilpw7y06stawrpvtqd8w72f247uz256ta74v90knzakn24f60lt3wkgq4f',
                flowComponent: '8huy4n4gxbz3cuk3wf5236r1wbdd3ebepz9qaltfba1e4c5evhxciyt643s6y845hpgd3epf7czr1gcg9k6dhyj5nafu88r3geobgfucpc2gscjql3ikjyhtx7u34emftxye3la8uw6w4yl3qwwqgee1im67kkl1',
                flowInterfaceName: 'qfjbgpmaxov4c87hqtvuqm5eow2wooxaegt8wo0rdrlj0giugh0e8n0rp84ch86rd2fdiutqfcc7w6vp1mwc0f9ue8o6uhj2ry8quv1mwbp7lx80ui60pdbckw1tpmdlmmweskoojteyzdueck5d4ojszrf6bb8bc',
                flowInterfaceNamespace: '0gyc1qzko0znm6uro016qc4uk0sv48crlngx45pksvcn71u41j69esn5lj4npgydy9d9a3j5vheyy1zvo3jkqwwd5g64pcb13yszq9r4bkzilectkvsilf6c32bwlo8ue91zhdfnle1c5pqvybuagct3596a6e05',
                adapterType: 'jyn6kzaoc3063c2pvvcyt3e9o45chwfj01fwxniwy76dhq2mj03kis9kbvne',
                direction: 'SENDER',
                transportProtocol: 'kggd896ah6ext9q38jo1u477ulkalwsszf9nvkzx8oxwazdkwmsxw3v63eha',
                messageProtocol: '68ddzyzfl0vqaimwb14v4h8bx6orybrw2npyir0unz93umma1rwessq45u08',
                adapterEngineName: 'r81b6dfg4h7sc7a5fkm64bm2sa30v7nzuwwdmep9juye46lfwjwtk9qthh2mqrltn0b2lmgd8lw1pahuz4g6ws391n5w6jmr3i4gmpl2y88zwtp30jy4u2t24zzlqbwhoc8vhddduohqnlinzjkofp5ng3ddgc03',
                url: 'vj6muzw4c17s2cagbpipljrm2rrxbm45wyq19iv1hzhjlc44eefm98hisx5rgvi3c61ouuafgzkzgfuz0qsp2zj8zy0kwjloeu3d0khxqwq4k3fnplxuqanuyajkwrnnil5dfel7cynt9qopfy7n467qqfy44uqhacu81macu540ss3u64snhw51564jw2qc04tkiqlahtebq7twmpctjflvfe1p7mjgok5qupwwl9w0gr4poze8o1g37ei119cazegnozz8m2wg88lb1u8lllmetcten65bhi1eny91209u46k149ra3rwxje25afp1',
                username: '0soag60ca224jerepyra88joi7d9vphz8tx5md21jxwvew6yge8lfqclro6q',
                remoteHost: 'px6t148st1f64a4l0jr0xntqub4vpaqjyoqgfhh17kqq8cbmd67f3cj0a8ihalz9p8l1jqo628vomausgfcqlvv7ue2jbp9q0xi8i5wks3nngzf40kcmci3p71vsq76hzqb073aq8pclm2b2q1bq1lan2ricaew7',
                remotePort: 6298493351,
                directory: 'd39qaus47ersumfypwompnnhc79lbdwmjo9pubv8l69mo7fju41l5q8nx7wmc13pbu6gx48dtmd4meshui45ed1nxf7u10ionsylt0khhj1ujvlgtqxdrcyb1pi69ja3emb1fqdf4011na9y77cwm3f9v4zec7mqvm86jsqaxb90a8drwzq0frswki6xk71bc0vynrpwyqog7fp3895i3ugxrrkur2euhyje5vm5gwepyid5w2ppi5jwyj9a1twlr6afwomtebrp2g3b6ylhaiw9y60m1uc6lgcwxig8ogg6848hud8hi7cgmcso5p5wrif6y13lh9rxip4uld40rqolj17lit8hhv8ol8wfs9ynuhgxzy1yel8x7g2c1f8zfu8vyjl19od3uu9eit49lk64ilr8pyluo91fkvw83vico8vl61j69nsd869awm9gv2fju0hx1su2b6vc5s77rpi15c20d0ah23o1anjg59mgjlw3f3oibcruove6ca2sbs1ni0t6zb98dv6m7kbssjrvg6nydefby9a5kd52huzv355ncn2c1367m6xuig27cri0dtpgf38gqo7odjmqyj10xqs419a2p8rkzca4ekuri6qyeqa79c1qk584t9d00bjv6lpql5kcei87wly45azowf2tmpnv3xm6vbl3vtaiexm1hycl8h52vvq25zfknagbs9pdatcktzh3r2a9k34h9mh19wsdx166vhall85wepeno5cfpr8xhixzjqdqswu0n9f3x7xxnq2iovru4s6594p8fdotr8rlfi9e3rsz1m130t1aowjiaaez5klw2ritlsz4zyxn25bmulunurq18x4qm03z9di17ljvkqfl6vlq0zhxump7yp354efwlzth28nbv9wtsakutm9df77y3r94ahbxk17ql0s87lwreulzt9taqje3owsdwf8xg7daftnkqb3fs4gj9uz95akhnyn8la0egafn7m7y0e9gamn9xg7ghvnr6e1q3h6k',
                fileSchema: '3fxewqxzs1wruvss9x42gujqhk44ps0mhm9b8nclj6w1arghlw43qg63emdnw1gq7p9spvjqdjjyg4nhkym73k8ipi50c0rm57yird0ruog4arxwvyksnrv6k8qbrx8yh1f1t09ep14wtdpv19m798uj3zp0qpf23hygx5dv3fzi7nxs3qgn0jfec9i4i56l4c8qqq9h4d2ea4q7h6170oijut3daa8naqmvlu90gj5y9gfpew1e93gvpur6p5qy5bbcghi1vx9ucdwgharldk18xwii25z6yc85ikx80yilpogcugxm8n2r24l0nz4h69h43mprc9ooo8sz2i0r5q4tm393ksvhkus8iei6puf2qdfin1bf43a8i595gktxqv2e1085lxlktthguv703aak70xmid762q8f1hebq4mtqa0tiym38zy1tr4epeujr7os1hnooujpa78qcnrlc95jgjbbzmla6cbp4xdbv74kie3xo0k7sse5pmwb4qoy8vw494xanlm1lc01zttzoqrwdfssn8nxiym1en34hhf576e5gnuyr1e9fuyen43b3dnr6vx8buorg05qik55hue6eny8yeb8ryzi0rqzquebf7cdie0r2q1p0kwk8rxkwxd87ruqq68r2ymshi15vdx4jviob7frmf68bc0wxt02ndr7xd4k2grglwmdbl44djbpvbxhmdjie73ofzs8u5t2hysu5fo75g57mf2fyf7ew5xuno29ppdmlemez2mw0zzkczpielcajrwbx8r30j8e84krw1e1q9vl4y6dnyalbp35p0fiawbrduqm5s854i3jx884yogrgdw3xjp8dxi7u9pc2cs4efe9hq2jwnptxna8cpsvrsz11or1ty14e86qdn6o96doycfpbghdhyuhe2w6bid1wz6rxubnpyrewwhy0dk9t4sx6g8fc6hyxwxwgdirt9rct922vkq4liaixyg34gcrx3s7ttnei4bd2akqvu816wv4izlqjgwy',
                proxyHost: 'k54fo9twe1dxu6ddx7wkdr5013vwmikx8eemxjcr0qam0m85ci0zxmjphqda',
                proxyPort: 2470252786,
                destination: '9ekyahelpkuy651594j3vcxrjn6cx2jspjtlpg04dnqve4ircz5vsotx00sz5jitiwbwf4dllbb1w7rc1aaa4th6al1vmkr70kc8me0sf5z2v8yytfooune6z09rg8c7ty2n6o85nocf07hg96z33t5yk3aqol46',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 's9x7gajo3ysjozvhotqsppmq23d51dospbo5ddnrcz6xy19y63h4jx41jdjxa4opdgkd9waantdjksjvat3owku7z3g51unwhx2fiqc457xpzgcbn59el2w45cexxtpdx345p0ty6i8uubhy91hieidha6noboo8',
                responsibleUserAccountName: '1s1f3b0hxcfpzwhco5ir',
                lastChangeUserAccount: 'o1migz5gik1pz5847a5l',
                lastChangedAt: '2020-07-06 20:16:35',
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
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: 'bjlt6n928i8myvwvcstdntm0k07hi818fn20oldk9vo1ysoe8r1111f8c654cecxbap55uq3gqiy4esxhnb2gfa96fphxvupo2xdzbdkktx9b1od7ewiq3rvngasdpkmgdrbhko435gyefb5ey6v8o4qumbzpa8g',
                component: 'ycreql334fq8x3vdg3o6povbhlcaekcybmsv5y99immk14hydqtmf6a8rtv6w532jeyc2jo57mj0le6a2hpvoq0v1td2b9vlwosu890dxsvbjr16x9aqwmw93ydfzl8rrry0crcisminm3njpz7zgzuh2r0hx9j9',
                name: 'gaonumbub62n891gy6traqrsehftjj37ss9sieoglp416shblpusb2xmxcabglr1gzb5s1twmag9xa8z9x6g5vicrwcargu7m8gexqhiy386b6cg3642mxvomi2oeau0s2krnh9tsi271ufkt27dwbo4yn9em7aw',
                flowParty: 'js2vhc6rvninynd54ygez5qs2lu3n0cauaclf02dinh5nb5koha7vc3wz56j3l2lm0ba3n694j9d9wnqb2b45bcw24x47wtve460rqzi8jbxczxnm02t2ebi7414oegwbzbjnufal6lucyz0ju8fmyntoi7twr87',
                flowComponent: '5vaz0hqls5kbr92t7t1wzgtbrtfll3112jy1mp55uj5wupz36g27u11g4t8d87p3xpzuz7gofx0tlqvg7002l6dcuadcjfti3lu3f4i9ccmu8avx08hmjgmdxzepwwwfx6ci8mb4tvwqwniygxkxcn5b4jdwt8os',
                flowInterfaceName: '82o8lcwhq1u9glrymyf79zyd485qcgb7h2pjr689f12jrrw8vu1be8au41ibelz68zv6byfiztlbijy3npcj9p6qh6dpdry6hvghqvc3dapzughm13uehaj9rtwsz03bi2vjh19pmo9o3z3oqfpkotk2hisk02fp',
                flowInterfaceNamespace: '4h482kg6vtsc2u704znx7q5wyb9qyp49rann61p4qd1qdf5lhbjjuiax3gsxzbnilb1hperj74uva0k8mhu8lxs56yz3nlez677m49ato97q5llqkyur9eaj39al36te6m5nu3iitin066tva4ppniztp17pb5ttx',
                adapterType: '8t9eqiiq95o0h7wgx2xdjmrc000htz6zfgfzmbvdhyf530mqg8wlq9sxkx2x',
                direction: 'SENDER',
                transportProtocol: 'p619bxd8f52nuo1qt8imn2dcmml8259894dmbva8523vcjd4fkwicdcj6brk',
                messageProtocol: 'rw7bq9mfmufahvfyf9o43yp55zc62m058965csq8fc83m1uqngouyj6qr81t',
                adapterEngineName: 'dasv1a7xmta67pbpvfsxcrmabfzeb3nem3lnkjoc7cfhfudwxjk8j00qle9wf6lr5efhm9n6m4bs2u3dwvvxqzpyf4jo5uomx6esc6ovn25v9dezrmwfd7h6ftmfpfgvgh3tv0n59xmnf4g0dkh4tcqdk8zwtqt0',
                url: 'd0mgy1w55b2ezp2neqww08bkd0ej8h4ssmflysa7qv0vewp1puhpdbw1v75ehwh5lzcs9xqc3t27nhktcfqpuks7bjoq6p8t3287fyq6xinx758d466ikku4zukopfczgj7ha562xqplbpn09crnufd6jf1jwox5uolioon9ir7sn0qqdpsee35zqtbh0er4meayf76ckmdfyvbwrwhtochl19xtxhgb44lpsitja62rutw7rxvzoefpg5twrg5wqri4955vrzw0ubol9viiri30917opnumdlio7zga2t4n0eyy2zqnmlapknfn372o',
                username: 'uo5cqxxxhdwclh6lbfepj5q3cv40dcdgvaop694gl5tpn0svkiqcvy7nwi0t',
                remoteHost: '4ir2d8mdyk7lh2lw9pzsh4w6js9i328ydurjm980yzhxqlc8sdtwj6l385dfx472x4v7xb25owjjpk8mfsj8mfznjj4xn5orh7k0ba99fzo1zc5f84sgaju12sdw40mhi975kv5x4yokagvq44na4g4kirooa1ti',
                remotePort: 2606678196,
                directory: 'czdzzw99v3dmpbey49aw2387vt1xm0etjpyh1bylr7ldouram9komv9u5hgjsjumdympeq8mn0o1906boob5rw9unxbxq3cg490mb7ci84tlz32kg406updv7gbehdv5bwrcm6hwvvkmg7fvsgdnb199gp7v9nxq7ffn0dkopzmitxjhtn8v9kno9fnyh5yqwzvs54vqr6y8vrvz0de4ff4mx01mg3bishm3i50gpjt008wwp3t218guzzjfmosamooe85bjxs2t1snlp1her9o7cxgwmbecv8qbyidwo03tv183rklt20bsnp1b5wfc978oz0jrh846wsylw5yx707sz9enoo76ciugdpxrqznxry3d5filnxlnbfhr0suib8aa44zjkvqosi7wlmati2wzvi6ob98clzoqse652n6e1gkl2yxu6vzhv1cscn81iwb58t0la9g0x4e6keodw9e2jnjss1sm0u5u9jl4vyrvzcj8dacmhlshv56mrn5opkybnf15414k8xcotggya1f938uc1rlycbwnspg9vpwfnuh9geu9nddghexfbvfqdfaibvjpztlirjqotvv56o9zycmvmxp8yiybqyklvg5lg4rucx5ocxtv1svvm7eswdmldp0g62e9sxo21fxhsfs1tg3uai7z6je2eiebipqeb1p6tztaura88tcx2xw03zovswo8f89eb6g3n6kmh42ezmhu7p3u8m6ochfvniuqdkg59m94d12oiychwh3xos5amkbg012mjeicdffvs6ns43r0r7t1x7k59lii7rtdfwtdvi908i1jyah73h4vfqxlkhe29rwqut6oh6nnnvlllw48gtxxwa79eb8hkeor02esu3u8ldkmmjw3kz7g198dju3alkvwq0qaamimxkq8kit6dbciyun6825t7gt73gp69gqbl4fz81x6lofyr7l3lx2e9btj4bjnrunku4letdk4t5glptw5s7w6wl4v0tsc196bfdp7l6meckgp',
                fileSchema: 'vjsdo0l0aezxjoy65clhfulg31dpdoxnd0lryhrlk54x50jo6p9lg6dyd36g4ak25oxxw60in35e2h96tqeak438o9k5zztdylt9xhlwwia6ayve9hdf41axanbixe18eambbah3c3xr8gwnc9jrhxr4ddoxmu7ww1xdyimykchprzyal99jpk179sdy6qe24gmrgkn2eoihfvdw6eo2ij4jrdl777xn615o21dg6mtpo7cjqykpr0251hj6mhupilp9g3qbi03yrpzvlfx5jlen3odfmccnbbp8r6nrplmxo0uklrcdrh26n17pt9mqx9jjr9pndkbzuicc7mi1a935v2jzo0jjn317ggvm4tht83hzam9jlrchnhpk7oxnu9g11dhk6906m8o411ykb8xes52ddq3jlbblooekab0kb0k5kcb9a0qspda3bg0nnw5jb8l0q9n1xeeqe0p9bnd7qkwl1dp25dr2ts6h2r78pjkbh2wjt0d6yxl2x6qn9dgsi4ifcix6bn031vc75ubzdffevg0wa0ehuz283evqatvwq0hqlg28m6r1umofk7li7sfl9verqxph1cb2u17wuifyh2ztt14ccwjg47r52xpvzv443dcf14ngmexq1r0it5dl04q6rxx1axpxosd66gn9ygg0d59v4caizyltorl2ycc1mb99ypsd9z2gwib1s4ids2093ejym9ph1mps1ty03qt88fa7yp6brspaabnnkaojmypextkcd42aj6bmqdz1tbi3bpv4jnbwonpf0lm9l1p64brypsyc6tw7o959z1yrrjfr311gm4bnoz344auz6jiub6wkxwwqqmcg1itl0z22glm4dop58jt1mbfm0ah4u6cus7lfdfdb4xi47knloatj9t16bkadvt44cn4207oxgpdq6le9ov5m47bkqbducyma3rlclls7ihgh3ngwo8bs8ogbw8k103p7wh0fea4y2rtizjp4gplf4314eqlhov4wb51z7xhe',
                proxyHost: '6akjur0s4sncfnn090zd8hkt2ge632bc1elpwcaoiq16yfy9xpz3kuam0pfi',
                proxyPort: 4108429868,
                destination: '4moop0afmj6t2zeqdj6ud1t6h3aptzgfsdobenxpvd29x2s9ubsnnpkggrxp101l4foer4nyr0bbsrkdr4j6wjenlg8ul23bd74vg0lu4ojlddxjyg27v7br2pcshrbo29qdickc9dstannsdpe8vlrxfdd746d6',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'rds2hyvjdq9g5innqoorzkck96udm60qspvnyc38v11of7j0q3bv6pn7jpi323khbjp1dqolxv8wq78tzout4o0cqqlhvn9svli554gr0siu3d1bezmef6jmq9kjn7pejrtndi5soz32go5irdwfbgwv9cwk82r5',
                responsibleUserAccountName: 't3fc8epvv5s8l6usxio4',
                lastChangeUserAccount: 'ehaufs85peseixlcdoia',
                lastChangedAt: '2020-07-07 02:17:12',
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
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: 'ntfjiz81fl1rztp24a1kopqyzugwdvh7l1adllu07fiaaggifnd4fe9xarm0nz483gyoctooghhawq4hwsmjz4rdsgkr2f6779j1s2x8dvnblvqmolscn4lc539pbri5pvcw8m963j4hewuwqagoczampy4427wh',
                component: 'n99185f3ajapby4u4rb2ydi8eqql4udx2svunrn4qr4ytp9plyhyc3mh3dbj9tfseaav41jb2p2009mrezv6euufiscu0g1fzqqu7ko38pqzu4qc8hxw3c4tnfamegs7uzj3cu2jlcs4pxlgbbb3v5n0tignocbc',
                name: '6wch6tgve69b94gnl2a3fkfz517tsl3euig6kzhdbvjmflnazamqj8475xpd8bhawabbpfjndm1s8augxap97ajqc8rc9bnzxy4uuqhr763sq118cb7s1g4oso1kzp94ccwnovvuob065snpx6nkkgxwels64cls',
                flowParty: 'g6cbyfx8u63geccun9ligdxqvdujnvsaj04idqid5j8unethilccx9t8w646qjq2qyuxarf8i36a4j6q7xkcpov84lq0mvupjzcewgjfviie0nonzvhapr90itzieijd53ehzw4be4h05ecx1xmue1ce69iuxd6g',
                flowComponent: 'jq4b3p7lg6zsmvwo0pycqjuz2qg4y8xm7titmna76qevns7rnr2ph1zo4eiuvp2e4rv8n66h8figzwv0aa7z6dp98dfsso8b0yn2eiwoqpl9f7vfyo0xm6o6mtaxiaw8vaa2n9fatdyhmmrzm1njlotzcye9fkj5',
                flowInterfaceName: '2lyslqhqkzv7w589kd7s4whm4uwf05z9vsmm2x1l84vudn256fzlcvy0ut672g6bcvh53e9vaclamu2anrvaqlm45g6ftr9vqlncxzlwzp9h8hfkn3z3ze4h7a4sum0thnike6tvtavnj6cvthosb2sdtwhwgrva',
                flowInterfaceNamespace: '719rdc3awsi72vrlkkozttpz148bkgqstefujifinompj12oeghlj3l65hj3p36pckhrfh8je9ns5arpr943cz3osf9gdqs7kf0u0rv2di8fae55zz3bh8wxl31d1sgrlhx84zrfhqajbtw5t9hy2pvdwsb1y89k',
                adapterType: '47ak3qh0ao2ys0xd0zhu0wiit0xbnay3v28fb0pptr05jj05suuaftrf2p1bf',
                direction: 'RECEIVER',
                transportProtocol: 'z0664bwexsebercrdkz98tu0c5wttbf2u2nmyraez0o93iajj8qjulfc3skq',
                messageProtocol: 'p7phe0tvh5gf93dwcwsy0xkhruu111aig7ntybize7430jo9eqj2koow8luo',
                adapterEngineName: 'vyrze7rhncwix1tkiqjmpbnidw9jj86kt1v4gxfor4lsi6as0527oay2506zngmlvptfj6t6jo8sym6kjds3mhz1jtaqlfxb9ssuwno3r9f0egbqdk70e3yt8irftkw6sfjf42v8fbpz9jxkppg3902pr4rx7cyz',
                url: 'ybfmpkm990h41aryrfc7cc5cqysnrbojkj0x5cxqoax7k95si3rv3uym7k6ljt6b6kwyfatm6daoyyn9n47mxfzkx0x9vznw00xqqcgknbratv4osvmnbv885f9sq8np9l0m2p3n0l702ir9kjb1esox3jhj3vl8lprjmfybv1wt9lsk9yr8pv7qz69tzzzc8d2sopy0od3dpkup62o93tpe0w47p7luyyadbmlo9t8l0t2hmo3jj1xhea1jjw5gh69r6r3uykohtco0sihsvglt5sqselb1q0leldc1f16nnt2svo7lt0dmudiadfgb',
                username: 'd7zcpjcsw4bq37ojy3boibzsoiwfe8gmkev8mw1dfirfzenyxu7i781mj3x3',
                remoteHost: '2w0yyukp9934y2s6zihj9gqmyemwww3wa77dyhal2sv39b7u9d2nux0jb1z4mtxymd1rbm1mkqwpx352il877aj0apnoky5ocj8bo78oqdkqdd23x4z5ha1kuyxdfvnsbh7amsa4phfl453p1n43dan96j34qyun',
                remotePort: 2445348666,
                directory: 'vv49cpy50hpgmet4u2clv3jmxk97d1cyz2l9lvfig6cj26miibg4ejupqcl8kzm9mwf09pek0q80qq3y6cqj5ywm6icv5jnel1ka4u9annu9bws9xqmrqabo1k5kpegrjfikxibrj8oy3d26vrv8c5d3m8nn9wh4iu2ktew6uk4dc57nspzqpr1djdbnw07k4g3c6g80tofl3a45qyo7pfdhvr8ysvhi3xxlfiamgloq7xroel6zyfeb4u1za8jkydunoc6tm48wxjnw9khz373xo1s1zros8z4nwykl56inf0rb62d29wxs88jlyl9or4pgsnwy4odhv155mi2t21fh35yn4lonvvb62zf7iwkqcz5w7pq1i4zdzo15ce2t2uyf40jr1k9k1dyrzbld7wlw8dx5xy2hw4qoo6g4o4d01uzykudyu8upnc8nv9w7teeqw6uo38ouc4mmte0x6e1pozgy18pglnmc50gfec4ak5bhj13pgafqyddkfm7uy50xitd1uuvz727lmxdipcl3ldphltu0t43mrrwszk5gfmdnt4tjj1a0kft8ka1tbb46au3fttrz2mc083cy2okqmovwew14b3izkfh3vyd0ye9eyqbzhoftkbgyckwo22hxyas4lifu5tbuecyxb1itcgxlmrn7qbao7p434rp6en6ug6qygqvml9yslyzvpzngar07wxjb7u3sd20zz1ti7rw63gcupmbfip77yvegoaufjbes2byy1dzfdcc9tt03obt1g7a0jcfad4fk6ejgm06vgpq596wa0agowtd1nj0w5hr0lyztfiw6hz5btwz6sqe8bsch8ssbqol7lys1oyn7cu601yuvcpeypiy8rf86209rpyn4rww5w9x1qw3sm8a5r1mw8w32z6z5dn2zlyd39wfe848fqn7jpgy9mm8coe8erzu0ea9u7mw37wrlewcx3ixn4ja8cvuueffc0t9ldv1vl8wxysjtyhx7itg9m4ckl3sn6s9d5xit',
                fileSchema: 'z5sj4b0mkllpimyzgoxt6jt54fne8isclngucyysw4v4qzgfl04r5dt9jw6suoru34et7q04th8boxgkyog3n0b4p8d8mmmnmawa88cnnonrje3rg9tcv4xl5uusnu8n1qeo53gn1jracca4c2u9sl8i8725od6qjg78p1azvgrdrxqcda4iulmcn54le1321vu5l9g0rob7rh217ltm3b0mn60pas1l0op2c8rvdm2tkwwgx92rma1maghdb1zgh0mv1siw7ol3j95rfo7szwh71uiexoq1uwlwbr20y64z2zp52gdxgi8d53cqqp5yf20qd7xrjy8fp0ua85sohuki3thgbo7uioddxammnbylvn3arwm4e2le4un5vp1bm5lw9poaonp77zofg08svmfbszoaiepyhvdndtu76kn0vzuh9vmrl9afobjw0luk7g4nchy92x7t5s6cxrgi2eqsphac5u0o4wtik34yqfgh7cmbc7zs9rjotvvorbhgye99llin8o1uufa1p2209fgi0seir5y610wbqlpq56d8ccch1llygjahtxtlkxfs47cdbn3ao25rbzgrwf7mffhbdktl4wzffn4u83rugrydqt1wuomtmpbhdteisypemky9fse4gdqezkhlfgw3qef965c14u2qf3gp7a76rv8w7qxvnmjxv0h7tay0kfp7dr5unccsdjn8ujfuxcmmmgykrpr1y8sruqpaq2y6zowxkma71x996vwon91urttl1h2xp9xtmkev58n3zl0yapsovz2zu5omh1uc3zasorkn30pv5merskb0izarxkelpsx4ixgkzgow3l9ux6g66dnm9qeeut0ruwg7aq9u8la5x8k8kpic8zik8zsn30uh74crnw6vg4db85ythttf4230sum8sovcncccs73svnse29buoq2b7jis59z4tbrgiue6nxt9z2xktlrgxfzx9d73lx2sq8e1pra88ouoqas6cm8rh1a67h922u0srubi',
                proxyHost: 'evsuadq7lrqdlwdygy3933f9qg4rqkr7vz9sobwpko9e2dd8eii41iw7qbrp',
                proxyPort: 4065434922,
                destination: 'jh9t1c03zd8ssxpworgq9s76hclcadjta8k4y882qfftvhem91wa771cucbgqzig0dwham04yxa5ybefbl95jlvh8rozrhdpxw1meynv6mgwy0bn47n3yumaqap9lymsryt3t9zgnoaonmcetbpn1xq50r2svndx',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'run6l4qhfmkbqye294cbf3edvzfi1faejsiwof8ipxnm5h5kzubq9nkou6yxbs7qol5x3s3flhe1sr2q512cat172ttfoesev34svibwu7yo5uj0qq0dgvb6vecij0tkttes8ec13xy3ikrun8locgrolnzcs91r',
                responsibleUserAccountName: 'zelfyt3yiisuyy843hdl',
                lastChangeUserAccount: '1tsrykp7izubp5uqhd4c',
                lastChangedAt: '2020-07-07 02:04:30',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterType is too large, has a maximum length of 60');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTransportProtocol is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: '4g4e4av0008dtkfrlfk3hs7czyjx86errigtsdq7z8vxwak0n1ibm7b9immshbh7wdw6mvu0eewxpnec8dqrvglfd5oi2u891dzm9nf8k71ly53qgo3gqcunc1l3q3da9qm64os1vbfmwliiy4sz6pkzerdger00',
                component: 'ug0w909opwy4jje2wr7prjw97n09puulzvw1g0rtz6qcn3757ww6arr174mftipbtxp6jva0vodpxjl40qeklkmt74zpmmjdz8rpyhhblq545j6l7f2lkmhmzsrgi0lxrfo3sdq16zxwlskm1d3q785a8n0hvdky',
                name: 'gurkcitwwipnyu7sbsf88uc4gn8rkuh43a75rvancd84rj87ptytmb9zmodo34b5xvbt6m4fe4h3ik7ms46w3dcmqxjz0djyekppa2zsp2t5rxansd4b7za4aajm17m74idszw8hklk0hn54qbpuz4bx2mf4gqjr',
                flowParty: '9ss9ulife60soheewhl7sh1h6y7ff66hz0c336xyw7x633c0ciue15c88ajg980jqxvixu9721sf8fz1idjnazn83saspgobykh8dw5he6g18d8is07yjauxd5cfc1rvj8sqs3roujqd390wqxas0wr15os8ne5b',
                flowComponent: 'mlzyswpgptrmitq30ls9yidqug9kcuq4qw7falaozs3vtggntamxbec46n3wciitb4ffw8fkorrnanokw80rpfbgf7q7oxugg0ppnxxc4qn0zmjk3hze493u3npave6qvkt4vq4h23yk7sms07bvl6fwv3j8hnk8',
                flowInterfaceName: 'wq58dyh65oa485y7jt2u027efgj0ghf1waixepy0d1cf3fhb89g2ngfj01qrhzyy8edatsziaq73318s0406dvkl7bja980xclqvc1cd0c18brbeno4aslma2zet83aa8q2pf9psa7uapd4ubdywbbzia7ntvijh',
                flowInterfaceNamespace: '149qj3lm8nu9rjevl4qppzsqxfmei9r5rsiqh70ozeyvzygzvc6q9std8nly3feqtkgd8qc3yl2hyt8bwhvkqmfajw2qklzt3kokmqo77jkkcum2596fi6fheucgdvnlruydlnr0se77t1lliq5xkacsvjw8grzi',
                adapterType: 'jo6bqtdvlw7rhmy5b44smq53y5ccxijxyod2hyxnnivgke2zrc3fhpk6npb8',
                direction: 'RECEIVER',
                transportProtocol: 'vsu0eulg03w89mtzt8zochxk2t68eiyg1euu73loxwpz8m74nk57ucv3a48ve',
                messageProtocol: '3t3fre6sc051ysmjrr6d5dqn4kcevz0aeq34yp7qj3du12e9du7ldo51ruy9',
                adapterEngineName: 's7jgx8jx8pqaxrueqs335qxhm6eodrf1h8huljrr56fmlmdzgf5llmohreeoedc3o24brwcyd0t7kail9kyuk4a1gna07mjg2wluefjqv96hmrbzcgfhq996z4yge2jsyuyt3lfkmgxyvzczdpclza0jr2bifclc',
                url: 'cvqotz2mljbxvo58t3cnnoftxstfp999sey0huzdoeiiib4oo98tfd2ffuycbph86v4p4szzbsqhzl7odmbvlo0aym8ucjp1vscwi1yoqemdv6zbc8a4kstjv82gsewiha9uc012a64voxcd7fzk8tbcrcdi2vzoxvt6wexjro7o8nag6xbbdh9vk5jww9j2zbjzjsui8a5ai5uwv51yunzz4j303gjw96ek73oo46vhystto6puev0vjebdwhdd8677ekla8f5sshzlh2fguy9u15zx3xxe7prfxjpwa25xtb795kueott3rcdqoj2j',
                username: '4cm7fw3e2qnfaolwqvy010hzpmmgkn4spg2513l9mit7b56rc7f4f1k6rnd2',
                remoteHost: 'uyb4fyh4exfa3t145zihhxz5x4tnsxiynziroaolm22a1gp4ers8l4s4j2n8l4hhgm91vs3nhbnlff3oqaw341rdeax0dfql4vawc17njlur9zxvywrfjbe647kk8qg018vgh81fum68k5ovez016uc0n59aau6n',
                remotePort: 5140666134,
                directory: '4ffmjlasz2wj4220rwyozgffa3f593hkrtyvmejykhe55ihzjijflnfz09fxc7jqclqjjswyzrna4bre9i36ovqoqmpf35jfdcsohjnxsvzrt7v3kks61mu2qqrxkeaowcbtrxinuvopqjwad6un2wh9mp5ce4z9dry5kizmbc5gxi3txm24nzdad763rywi0fy64fbz7m4u145f9omv0pun196dtx25g18dl43otmrabfurzixnjc8de2q1mb4657fkmzim0pn7ubhmp0kpuluh9ptk2ihrseijke4r2i58df96dat8kfxbhzhyfeq1wcpof5fzu27gjiqpfsnp9vjlvih8ch657p1e235wdku4t681uh562igharzlh44tilqhcw9k8abqfejrthhpkngh4jyfkngzx8x4m2bej4te4848cg1r2d2bkzx4rx52sjvegyce46bzkqgtk19mnllke8fypz69fkpuv5rpfa1e02sop6702xeqghcvw95nyrthm0kp98awijvzo788uzxvmyqqogfb3sygrnh8fsiazf0czdgnc7jjjmyjjiz8qwdtbc5ij3wuwnncfoqew0sc81gg88d599tr00ucd9pzay6pftnieykj3dn5mt90p1iteqt3aj21gcpg8cybry3ky6oipsdfa6ru6287er2l75ioy3ri42m1ix70d3u69m7dq41fh827tkf241pgg9iilurj8xrasrhn0ly0mn5aywp33q40dethwb0oseu71vvn3abqu5c1jjg4vtcsddikwd5wkvc7latwrx9hqyvo9vyewtqxut3g5cu4eeluwtgnsgw7yvr5ynhtxlny6eoewwjgyecew5n0kf5h1vj732q6b8pvv40ypi5b8rjs0unavlhngjav13z82nbntty4tv58uq2q7votgmcdk5jpxp8t48m2wq2mmsbwel36pmzylds27czqrwzqdk8g4b6xz5rvqxl1ct3ykywtwt5mtak959j8u5cvnqtwxd3f',
                fileSchema: 'f5ha19p23sp7ohsqy4kz45ge77q92rf7w99a8w4a66wd6zcfty3xzl42im8jvf3aa2ulsb54kf2xfbr74vmw9wrmhzstp2uqdmjrguecl41hq6uyqecyhrwl16fen88b2peba2x5l53wi8wzkl35jn7jywzxl4yushaoa4ib827bo3q9afctvz2mr4yx0s2684aej4khr539tuakbi48yaabuxcnfooydxusd2siciliev8ipz8cxr9ir4kiq78i11nu1r8kx7j8dwj3d8ly0e5euorrbk3b04olhycf597b0kn4qj401vnahf9mrls9cz7vhz4tgf3z6253co8t0f2adpfr6kp3kh1nei6xm2wc0oilshmt0ets1x3bpa1qn2pzdo0cnt8ra1ih21u44ehijlh4nfpwjtry0vf6v64otzd0tnjot6plbamfd4eqevzb3jaz01vqih8k7y4keupmid27hyi8skc4tp3tcuocfdt0ltol2dwtzhw0pegibtx4ibymd6q4k791gupscznhg5i8avua0v90icm49ztmppf3d211ix8icaj1x1gm9o7f6ckkg7rfjl6n87g9qna97c44iuyzgvifklxfsm41y5pycdzj3xg37m7vs6zr7d0hw0m501lo0uzewvyb53xioq8vt88bhn2z0kfxrckxrlggduplq3hbw7hshtd25t431drtf8aswhwcqbgzcdchys7zslv3ee9pcmxqvc20wxfe5md06cq741toh3q9c7o4hl5ofb4h21g5vqp1d0hzyllalv6mjo538o217lg0ub9g58ukzn0xhubdobnxkqwsonltvr8dmm86ell5muvt0d0bxjz0dxxcoeqwjk0rgno9llj8ns5rceol9tqk5x06w6fp7k5621pfpemvhzy9c99iuji79ordmh5gr476rnbbkei9b8a4dlxur9pajw8787t7yheuivrpsclh594ofva2379tayakzttfog20qo4zv7k6wayf1kb9pqte',
                proxyHost: 'dvfruqcw3m2pmpr4x9na44g4wxmxm9tcg85nid1br45ta32qhnpan3med0pz',
                proxyPort: 2754047608,
                destination: 'vk2th4m2pzrbge84h74fbvrx0qkiq2j58ibqc05onq2hx7kx5lj46jccdh76k3oto736rmtjcoch6x3yt1ew5ala72ap9x135mihzm1xoe8b3gvvv0awyyuchh4kky5m273ngewi6rfri7430oe7twz5jnlby4be',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'kl125zu1jogoz5rmejksetduz9qvqs9t7rp74en4gzadmzbraggcifqdryoogqws4jwahjcplhuwvknr0znbwnhze8zky0epanm2axqakr3mzki1nb75jeh6r7frahdnemlg4vfx0cewb0nxqrn6b3n7sojolq52',
                responsibleUserAccountName: '3dscupwqdkurk04vl91u',
                lastChangeUserAccount: 'i819tncc2890k3oys885',
                lastChangedAt: '2020-07-06 16:23:55',
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
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: '8l8mbl5a7uk711bovkshioz04g1zj0pze0q5n4k5lmp3lamllhrhu6mwxx37uf0jcjrer1xv287fdf7qnwwv2wt86hgr7oncqeswya5qe2rymdix6hm4izo1cgux83k5s0nvulhh5f7y8lrhcef0snz2ungibmx6',
                component: 'tvis7bch7s47nzzb9vcl4hl4fwn7o2negq0amt3dh1s1zal6dcn6hqsnqi2l4f5r7pdk0o7fjbkk5f7ogmua1wb4vg0mrbcrmgs6s5nfm4varuurzvg88r65qwl2jxnybohw34aj0n4wn04bymticsncxy8zl0v5',
                name: '25762rpj8hxx3ul7oqpgbzi86htbwu4eikg4xl96dxx3tj8voizv1kpa4fjou6ba1l6o8elygfx8phl1w5kpwuwlf7e7jcrl11nr7tthtpc74isd7c3g2o93z3k91uajagzlt4zvv1c5ua8ytztjoni7nd1f2amp',
                flowParty: 'a5vhlahcw5990h4oi0zi61uy7soius0812d6is895rt60fpdxzu56faaez7lvvqi3t0veo83cp0pm1nnmvxeycgdabsx1putvsdxfpj3z4a2slz4b1enffkuahz1117pckhjdyfvxkyulxkmbczp887fiijcpq00',
                flowComponent: 'uhwqi1yhuuo9gimxgov9qp88az7erqyti2gmxqwxiiw7n73a7m2kzgohvczmf5ygutfk1uvihy1hbrj7ku1cug2suocgnhxsro3h1iqzxk4ohboxtrcdvd26qxl2aewykwtkcygokuuv8x2mmukalidyinf72nto',
                flowInterfaceName: 'cabc2dd6zlaazzo49l0ttrsl2nzo5pxko6fhpik1ley04qyd3mnoxix4btzworwk35lqzd9z148ndmcqot1be4pyhps41h9tfjoszr8risbo2nj0btzqk2mesfv15itbnryyh87iw500cbl32qcgsinmbl12j5ml',
                flowInterfaceNamespace: 'rubdw8hsgu0ql6q2e2fct2istv0rmy7jxuk821v8zcngs960850xjq1u9o67j0pz02ahoebt5qw9u9702jj2ipfes2ey1u57345d0ym9pch4r50iy0xmbh5bqjhwxagq5vwswdc39ndw7ta8ixrrq7jp5n3fbwlc',
                adapterType: 'x7kc6drmcoeyag4nvz3dxt6hsc1ac22bsjf9q33r0keooor3v9rk1ukzbppt',
                direction: 'RECEIVER',
                transportProtocol: 'ut0a30d9uwfctog1cc4ggbm4rozax86sb3jhmab43s6c6ohlz0z4jvs4d3zq',
                messageProtocol: '4vcnyc7yu4fs1x2indytveem94dhkxc6qd3cxnozz7nkzzp500thn8pt19hy9',
                adapterEngineName: '7gmbcfpm6lfgcd84m8czi0pm2r8siu0p5ivnrhcr6kdq6ol93m32qi7kb3jscyit3i87x7j00hxrcw7h07ixstys4kq9b2jq6h5usmmkxmw7td5heawnglqjjaa0ik2ybox3q3oj3zsmkyk48ucto2pfsouq4s2v',
                url: '26d598llwkasflbg4ygbf7iazd3agm8l489jm06o1h2svqi6hef27zhln6ho6yx0k7h107xzdrwdw3oog8mpx41wkzqgl4i4w8mdwm3avphun7p89fo7u7ysz66kzxtpnyur3khmae3jvcmb0b0y2s1tkhtbcmrm9qknjffeqspqqxu7pvyxno9rlf264l7p2mapvbgnl2kns0g3v03g31emen5gk0806h9zc0dthpnnfoulzefcculh1hjywmh6jia0q7ydn7w52i7oahh95hagpq0q1sklhwknk25k58l9aqgt6eoqa3nv45gzgihd',
                username: '9kiao1q2aindwsx3tcl6i8xg09g9tlsmfb72r603rz8ajb4n7urxbfbha0gp',
                remoteHost: 'pb270n026qi22tpjcgqrpem8kp1kbzxdinkdngolyut5m0rb1y7g28jtaifw40x7ha5w7r1e13wyptc83lab31vhcakefrofnf5nmbmls0h6a5njkwfo3oy4bg3sw5yr0cj5om1rl0p5cm8krruzkveolspby01a',
                remotePort: 7317458949,
                directory: 'vvmsg8twqqp0utq3h7jkjfg39b8r4ttwfacujqji9d7eijp8f0szc4ju6a8tes5lblc63sw9u4dih1dsujhwo9tx4qprd7nxe1cjsma8witv6z4484ygc5av5fxpg8ahco2is7lers4eduvn2nctm8t73ujl3gt5ib44qw4nnr85xaiduf505ye7qyrx4ui2ipgn1jxm4yxufm4vjalp2vvvqlpk2zgqeo0nhoysexr7klc3ktl54dmzc351pja0arf3jp4fwz6s0pv87l2qc7u5b25fu7kw4j6ogd56z6n6asffa4dkwmvizj6412rgf1zmghcuv9xit18dpsqhgkym2m3bsr2phbjrgypjlxm8y74n3gvanmjfduy2e6ew0jfmaa7l7hua31vk4d3oktiw6rvkeq0ic6frxj4jivzns6xbodub5ogi4l9von5b72n7i4gkl9go7ykehhfoy5ahpsfykwqq4kkoc89obdelbwdil0hpi9qg18brqqdquh2yu0c4rxemt7l2z8xp9za0ve3p67z2vqhb6sa5qx2iu64uk09uo9dxfys53fe31g110uay172sbs52bzt1zvekjbsd4p5j6v3eog9w2bzw6orducv7ir6olwlzs3bm52xvypiea32yjz40ot2wweuhylhwl0l4lga3b0lb4elvofxrotip4r2ct7gpw87lwc21yr932nfng1k64d1brrz09hong2mje7qv2nt82dxacnvuibnrrzgnz1iqfw0dcwy919pgd3cn7dm1kel0sdp5tbzud3rl0kxpk7wiky6xlpjajo3ish0c2db6h35l3urujn13a7bqcrkmp1aamvcr463uu70ib7eaqlud8rzxcqolf4mcanq2ly89jiivztzij24353xy7d14kgc4rl6d432hk9ha9ua8irs2siloqs2wk9dpguhv4s8ghi7sr3bo9qt0d12dovv8gfhkiwepotot8sv4s4wz62379sfxvy9rfg6jtt22ww43n3ld',
                fileSchema: '5ejh8o205emej08y8qusw7spu4bv54zw3480xse15n7ou852zmb4nvcncek06i4cdyjm46b7ppyj8dz7f3aup14o1np9ea4ujoq3yl5tapxu1hxmvsvdtijpa1wq6mahim54m920vhg4n64mi4np9es1yretsae8p6q0ui7lkvqppzve78ih62i8wblk0dpo8tit3wnglohpcwcwe64bfqhcbwyrvatm2cs39w9xsokatr8ryb9sutobuzwxwatda259ine7d44lj56h3jm35tal2klzikuk13smrkkdaww7pqnion44x8xlp2h2ynv1ozs5pyidb3rvb55xl6woo5051atiau4yiyrvgunesf2in3l0nnq08w3zeqhkwh2oisza4tk9bailw8vmgllz1g5ltggygfbt0k71eufp3xtfuha4pt7h2cfx6zgrudkkpncsrfo7gt38kuaddd44kjen92wpotkxkcxh1d7nvhm0bbu8d162aq6lk5kupmyvev10qm4lu5qnb3pc60hvagd1w8bny3df8ktz57498cjbqs97futtfu1jhuohbth8mbtpqmxq8qd0gcd4q5ehmspgwxvysxanltub0wmfdo8sgay8m8by2k8zq8i8jh4skan08ful8625e4bzcwwboee28oebss2chtle4sugyyshyo6xa3bt5rofbrimuo6otzlaq505fnoptj7wm1fqgx3qw5a6dgkwl83fyt3xikpbeq4bjp0f0emtugp67rmmgq5lx0673hjajrueg16vnim6qg8kan7k8vqnmxtluahtksk5rbvibjij1ai270dyw7zcvxg80uplldkm2fel3edq7ngndip9w7x8uwx3eakd5x8eb7o2fga4y5hqxdje688cq4y7qz0bd7632ds804ntr5ras6h8onsdznfo8cd1h2l8gapowctghc396qefocnk9fqs0vb3bocdg6nge45tlprh2vmwlt81kfkyp0xsindfae1boxhpproevhkm',
                proxyHost: 'rbbp5u6kmf4l0283q48g8ab7tr2kckoolp4xu2cne24sx1sy6hxy0nv3l4zs',
                proxyPort: 8962296130,
                destination: 'lp1bh6dv39oypz7oljyz09j6txibjovjqcwggxpnhsftznrzawkndnfk5ocjn9pkg7fvgu2wlzjqh5fehtaas2ri1jlpiiv6vwc6747xi9so8xdqiy6hgtj7905sqm69aeghje5bo1zr4560q0ct0t6ip2cw8bi8',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'rhxiotd6tbszzfoa2854gu95g1jz6fkmy4wsplapbb02n62orkv7z45g7dt0ffldopmtmd1t16e6of1v96wb7q1j8u17ahfdozxm68akdrxg5dcbjiv3py7xwau3i5o8u66sjlya63i6i7i1r35phtw03n4hksto',
                responsibleUserAccountName: '7ofyo6jc6yy0c85oe5ph',
                lastChangeUserAccount: '7d9dapmzpsci6eqhuyz2',
                lastChangedAt: '2020-07-07 13:06:35',
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
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: 'p4sa4h2sou9acvojg7dffxt254hbt41fuksruk5cvc7xax7o0iyrzwbvk8dnsrs4ncq1wc52wkfbppvqsielrjzd1hhmie8jizxwgtgyx71b605ykormni7lg1i99bsitwjd9eqnh20elps1y0rtmzxtmfil1yef',
                component: 'qhzr95v5rj5zxd8gqddzvyh6pbf0sel6nd9d5zp4k7le13ehoo0sma37o2zsl4z79fanpj8xkm7mqlzu32rssmt0me1ct851jyx36zbrvalb24v7gsvsr673h8nnktu2iy0fne2jgxg1txe4xc265rb0shwo0h63',
                name: 'dnpotm1arka6y5qzhovpmkrzwg7oooxva7dhl1in7pl5n6up2xv6qdpa6iukzm6zdttye7dj4q0d55mj8xvsitlcj4lpv3dvum3xxi75ojgd6v85dlbl31xdx0eoct2khbx0l4nmapsocztylrp2p4xxburrxu9f',
                flowParty: 'cll8mu6pcou477uj0muspglhe8p78heqk01vs5d1k4cn8wrx5szv6nz2c26iga7sknwl3yb5tl5n8ktsb35ofw58em0fl89f06t0a2m0n6wkhb4opd1ttww9ip55y1ljwu16av09ejz03bleqjoaqw1d9y0ckqs2',
                flowComponent: 'nlgqs6slhok8jvqwhv3r57rpg0kkds6m5zf86uapgmeeeg8y4ldthym91raa6zgo7wubd37x0qvmybfsi0jssco0wjkf09ktz7y561kj10an5mgrrs2mff6raj7pxrxn8mtwar1jc3h8yu99pmot00s79d3oq50i',
                flowInterfaceName: 'd6humppy2icubv0bg7oymrglrluekmbmjn7zdnwycqd5k1aflikbamcgc1qw6ss612ex36diny8ja2norlooyjvpscq3tvd8h097qjkbrq9ris9i0ll2bhxp25zh7nlul1e1ikooubkaqancgwkakk7t1t6d6ycv',
                flowInterfaceNamespace: '13ivz36p7etyk0wsjrqjp7mnatlhbw8k8dfbtq6w1fyfb1fi12lnkri25rygig6of89uuiglemnys0y6y9ky6iib729hfpun3whkqhitb8qqvvafgjrwx8qk86nflhlb2wcuey9gi8lf9btub6xlzrjyppxwkf74',
                adapterType: 'u1kte0id9oxmip0j69p1vfjgo1do51m1mpgxch6wpo8t5k97wgawfhsv849k',
                direction: 'RECEIVER',
                transportProtocol: 'zgyvqav1hjbeb6d3apcq91jxhw38mx3ajpjddr5sjc7g401pss26vc0lix20',
                messageProtocol: 'sje26unj1irp32dq53cu1fjntp128uvnw0qarvwyqzslwqcxz6v14hh2nm0l',
                adapterEngineName: '7qqsdeygtcowstu6p8ye4eueglv2mtmff731nt1j19mfh8343nqvbbm2deu8unymoxk524p5l3xteep5o0nt0ps28tibpjufsg18amzr4vmr44u3d6de7srndwvbrrctpvaezk9t1w8amfhdwg2x3irft3p0r8ndf',
                url: 'qm8bv2ngzbnvazfwiyo0k0rt51ary1yi9bg0hi6ay6zg8fuaarmste11hxh9qh3p7rlqydn14amcp14vx38agmlqc5oupq06rs6ybvtxpsix05flijagy5ecx3ckwnlusvtqae8kzjkiy26gnu1h05hf2neqewn5wkapaq4wii8m778psk8rqsug44yk0iiupmo9fywmmwheamdbbx02oa2ewn8ngxtgmr648jda876r00er4k3siqtodu3az2gwzzgcfqneprbccjmg7dxgo3uz6yhvivd0swzquuwhwh05o6ethq6tqxltpvlo8v6k',
                username: 'gdm5j3lxbvvs5b1meaqe9m262e7kgykyy83qija13errlj9zvqxw944xkulu',
                remoteHost: 'hnap3hjti44yxapc1pdmp01rx6ix47ijxwusk4159pvq1kmu61q8dwy8vtbozq0yvrncr3jarv41r6i11paeannkzxqdp8ublr1chv3us8z6m4dbwes1kcpa4s8gk3xuyjmjssfahjkt2s4grnz3de8hv08bazve',
                remotePort: 5554596488,
                directory: 'w0x8cmptv8jh6ua1eps7ftnz9o1urex3oim9og4gpgqtaws9sa62f87q946b1kpb6l5engp70qo2a86re14knxxzkk4h8oahkhoqj3od23o1ye48dniyhrh50jnml7wm26wdq176yn1379qruaqe82repbeuq0n2tajngvza0hra8yv9f1cbbvo1u9h5fr64cm3vq9d4kjligyr9hj50dbp2cop7i20v4166wy1ckvrurzn0agvrpuzt9bs72x4rt06rmfn4uvelmqc5p3l1va5066rmylo7y126jclq4zopbz33uobuj4kj9amv6ifer1rhk6z6f9xp2q991rm9v0it2q4pnn5m2h1l38jigw246vryascotzq98qjtn07kg2xdophjbaq7w5lvxdllfcjvreq80g663n6hisz33ves510lovjqta17d5hgpqt8cul51acguxn92ytf69zu2fq4z8rwjsccafx35zi2cvu3g13told2zhkh080tlpbvnhgprmtkc8n1jxe4g26oww68argioi28ci8ylelghdq6yppp7fe9ycmgxz546q845n27ld99nfjp24g4qakgmp599i4a5ze2ky0hrfyl50kl80ak6ebh2g5efer2stmvhnf7io9z0eocydjrawi8omq7t73obmp8g0gw4ztt8tlbme439yyv767lsh7vsurfi9eodqnbu8qmqxk2868vtjwu24rnc3ijs4gx01p4irv0ncnhy2frvz7e2p83okim3ucyzrqcolx8xn50zhre50e2ujpmxj13voa716u96vhivq0qqr22m039ptduotplckzbs9st40o1cj76s2fixje7n43igh1khpi32ddrw904u3opd0u9lqg7i7ar5b7mzpgi5uvoymowuuh9ix6ul6x708chb7898c1vxm8p4cu4sc4fit6zb4845gwkjuhpso2dmp557g8uoe250rsthv57494z1l2eol15bkqim89kvtyk79huk043o0xefd6x',
                fileSchema: 'tzfc9brdeh39glkg33zfy25ifv040590cw9g81bik1qe9878xxcsu056dy8cc7xiuvpyky1b6uyuuyy1hguzyqvyqwmzhu49iguzook536iz1levqs8cqdzhj9cgoaxmwruyodsrjiel1w00swuqm88h019zm6h4gypi7pdszbze42s9ro4z6clulm3crs6ry9gkrdihjfizkfnhh7hcldu2qxot9wpit4kugwhtxqkp64a4wf6msolzrei0y24t8myj3pzm9a4cudltat0qnlb5219a5rbgiwjk3zt0ysmyc38iy8coowq3cy76qxjm0py3b7x1gad0k1upotgg1cjjgnopnjby86kqbquik3vpxt5unplyh5oz3jga4urdm6hypt7zl9grkvqkz0oqh91tlmkfek8q0pujnw1nodr1vta8h7nvfmhb9ux60n21uvbyhs4wjcx8ctur2eurozr9les0e6z6wx7r89goqyf3nekwgcufifqmsip6ykjp80pqzz404unaa90qd6qrwcx14a5azs17o9o8g9n8g1mfht6kwo8gg75qrxhjjwmf4shti8ap8x59l9gpfwon8yd480m3u89mibzx2c1645vay3cnbik6ok8gm7wwbqtcu1s4h0o1ta9j18k5lvjpmzkyvkoj1uv0y3kyf3zosypkdacqiy1s909taw7kfbbguuf3vi8dw1pnk5t6926bcw4rj3aezu1kccn5dr5c9euzlwtagdo0cgj1okwnyleazo9dcqagenpakmusb5bew71r1u6om589b8e0djz70zvycwmi6pil1wk6kxqmy5t1w53kp46baucmd967bjotwxuw4f0dboui8202whzxfnvkppma986um1br6finyjc4ttkimjeqsqxfl5s993nb8hwvsccs897vhcb2yunrgoqb0817jn0wz7ozhs2v8jx3idcyz02r4h4p20b4ty05xatbu0zk6gxuejcfrub7egedvxisqtjpdn8sz6era0k0',
                proxyHost: '08lkvd7u4iondqsgs5ny5qnsssldgd1thqpuihzmorrhznbi0mp3vxoklhkd',
                proxyPort: 2357531812,
                destination: 'svrwz5pg3jidx41nb50ki0k70nck552n01tunxh6q8lv59lnmkszvlye9vpk6tdu0h44xjlxu3j29wx8s3699hpvv40q3q7yzvhbjl6ttr4536mypnx9zq363uaq4mzpxpxh2x8ds0s87fh28drbf6vwcs0wxw9y',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'kpa4pb9om908oezve46gi0q60490aw7c104vnwfwbsj585gdx8okw4tjvpxrl08kxlp7mzt79uokpxc8ejn0dfzh7aitjlkltawp9nmx9vd2ugpfepbibzxnjis3udxzhjin1f1s32gomp3rkmea5japvk36baws',
                responsibleUserAccountName: 'gtpexomyzm4wdev02ylc',
                lastChangeUserAccount: '7cs1g0nw5hug4chy5gl8',
                lastChangedAt: '2020-07-06 16:52:31',
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
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: 'wyxppns9dstnqg6ehn6tkltod3ju9bf5nor4s7u51lyka9vxkoy2jajxft5pq8t6fmokyt6zbflgw0jazny2krx3pviuk08pnzy042zjm95t1s2f6z7k4f3c8c0ku7vmsfvpwb5b7rrmzaqthenlwe8gmv014o75',
                component: 's2d9v2ragbb7allmuwsw5fy5i2mjn1aqfait622fs7gfqrj32zo1k8jc20lcjj573d6o1bbrzp0c0ylmdzb07cwyi1l5eyicvosp5bql0vqrm5qa01l6i38edmeolysacw8iqa4hv813xtno8kl2z9y4gna70xct',
                name: '4qju66ph4w1mu5kw8j946o269utdz57qkl4oltxnghlhe1xayhe5zkqmwgia7ju7sn7sdqv0m3mc2gp0kb9bw8v66n1sr3kip4l5dqx8ijhof3ks2bpsmhrpwy0zx941295a8ms2qiilfrleqvukwuqkba9a4952',
                flowParty: 'edk1slgcmlow56d012mq2fn2luijaf9fhnkx52sbr86678t09h42ij5jgl1dy5clix5v5pjwbhwusc5ymr82qylg8xjs3lvw0i9tyll3siqo8o5nmn50h514lwydo5fcyejcxrw65052d98d47p2hbgmzxj1l0ca',
                flowComponent: 'm6uqe99ee2s9hb9avjnd860bw3gzbnro09x8294ewyry6o5s3rpb9tarygp6mk2dq98090wh5sdie0dkyuys1ym8qcllwl5u1xq4lmuzhxtvh8rdwakgg2tawrpgdgoapremxrtx3h1cne7z4u2xi2eykyl90wpi',
                flowInterfaceName: '9bqas3xafm1xhlq0yd68spdw4k952ju00srqytczegfgp7yy4xz38yu7gnpyaoanfuiqvrymf0db1pnwlasx0ijdmekmipzavm1s387ugm8k7mqlt0ujzglyw8q4mgps63zqwefo9vvj9f3u9r3wp4stgh1hlbbj',
                flowInterfaceNamespace: '1f9nny2wrywqr5owdpslopc3elct75nblrdikzvr0drva86g2mlcu2xg7l4yktjgkqdzd2pu9w2m7iv53jpzt8hr80a80mo0q8v0lsc9n53q7ri4ipoqk9oooywlmqcow4qdaagpvtf2hkhqqdymiu6nhnqafqh0',
                adapterType: 'mhjyj9n9pw2wyrjsfrudapfphkpl7qrzbrv0gxjbjmyvoc21tqr7emyqwny6',
                direction: 'SENDER',
                transportProtocol: 'zzzl7do132iyugbuxb0b87qsubk5qw5i4or1srewst3eq8dhiww8mo5vksoz',
                messageProtocol: 'n0utobsdbkvxaak1l20t4psoqj4xkcd3n2kbx8kl2rx6q8gal9tmz0a574wx',
                adapterEngineName: 'ebikvch6iiig9vkfz2rck2e11d6m1gkz9fgwsfx0nby89aqixoaxepjataynq0ssl65kv8t21uklnqd95kpx5kbugq60p8pa6e4b2bnhiy22mmla5yv7ojhf82lngictbzj1kq5k72tn2zuv15r9ju79fiuqa40n',
                url: 'vb9qn714bwvggwu1cupgke1xydty4l9zo5iuvh6a908sysa2zc65wa3r5b2btywqlry0oy5a7a3p4nxvqqifk0abs8m4j9e6nk45pw0hbihtnf2cafh4kcufnf21inwskehnt7l25jips47aj3k4j0hz43cz3d9g54ew09hh0v18v2lhck9f4fuo0ma8vs96bai6c6c19y125g7xkrr3g1rssprwt0inj9gw5w76nq7b2ghs65kp1f80r3ayfricugk3bo4mppvuy6g9f3qr64upcbrvz21g56as8anmj06wmuyk8yznev172401y9kew',
                username: '29lw4nyylf9j6pynunf676vamvzg62gzj7vve66xmfrk69ki5w28yacis0lv',
                remoteHost: '5y29n5h6ltogwj0f95mui509h2uusvavfiujqkat1qmvgyezp881cwuauxjjcus26giit0pfepqd7ybjuz79zua8uzfy8dsl58kn4niseeg5hmt1nqhy51dlkwhpo4be8gjvs57hbltpwdr5im4t6gou2qqthb6e',
                remotePort: 2902913289,
                directory: 'mnoc5ic9czk68bqpzws5z9xiyy4l4cnaacs1ikttbglkyh8n4gjc12k3958wk3n0rzge7eyd85mayvhx3ryrssyzblpyfu7h06etbre8lm01l9g40fw24cqrwhm46cxjny38v7n6gvgh6m3uvv02k8u5tdf68gljm5x2semx1m7sril5adyd0y5o2gyawvqeby3be9pk1c6rfo2dogkl88eear6mstr64ahywvo9zkiprn4bv9wd1rysn5azymtk3jrthjj9eqh9fvyttjs3bszymjc8d08r8vu192lu77j2b85g7jyo59o4jwfpzh3we4y63rl9x1ba2uno918wlx4g5h0ladqrgioexi7wf60v3q9ql0vylpmmeyhuzqxl9pev4o4vyo77kf9u27lrh06p09ucipg13g1683bqjhsaeomwuzvnm068pj8m12cmmq95kqaskqsvq8whwuiau0oc8pypyznvrp4xngsasa3x9381hoov3s575tkqmjelc4661ik7cb95th6y2je3supo2fkn8cm6dtn0wxufe8zt09tia4uw8qn2rko41bhdzceezlz70qrycjblp1ay2vacmx7gmvojujkaeayc0pvmc649wcwthx73w6vvzt0axmo67nxrcdhsx2h8tgrug70c7jqeyh51hgnpexdz49miaqtkqog911zp77kehbaei8ftw6zicw69hn1z2et4dcnndupjg8googktgifdeeqy05t7fnvj26my390st5o9ckh6k3lk8ta0278k0jfc770t8th06uer6lmp0z8zh3y6efrselg7acte5w832u27ihraktsj4q0tkmczksqw8ip2rnpbsc15ahp212vuy5pgirlmsxxpqrt6f773s3l02i5iq9g7nf1igg6l6un2dpkimadc165l7g7xz2073w9qme001d2dbr7zadde6jz0sh8gnrwgm1rqv5rofourgiyum8h68rytwwne2qu4r0frxpj6cjgu5qlbi1a2bhmg',
                fileSchema: 'jr0hqnfqernd5j7hu16b33kks6z2d91n14xxy3rvj7ay4jl3klbcambxus31c1k389fcwvnszs6et48vqvocftmn2ghe7nhdhe6hts2tau9rujcbuhe30owtazcl1aghpgj1oirht7symsekeqa70gopkkmmjtumvpqf27kub6a354lydbl0qmhurgg1ubome1oeqodhjqwx88fpu7ec6ly1ks3gj2747p7mio1ki090jdgj24y41sj4ty6rm9497pcado74d9nlsh7u403aifkoz90y6fmu2b5pv8xyppzc4uoxie7hzl9diw57skxnlwn96z17s0iond3gwecgqqyncs5j5npvrgg2pieb1o9i7owbqheg0w36y1emfl2wci25c1w8llcuptxf8kpfyp8gvhkdgy4zaveovj2f4icsoci0sjpj11an9si6ej7m7u59j85253m44l7go4imlhyfzd7f564fpbmn31zs267ul4vcsjh18n56u4mhkqbqcuz228epou11dn8e0devvy4soekbmjk2c7xq9kk4pryy1ip0xa081ye1f7gb622au2lze26co4tqkllw9oxkw5qyurs0lwiya4dgk54652bc7wkr51hoy17k5vzddgjl2m7hwbz867m61cqygpy34x3lsqumlv0bvkqcv2bi5ae1qwa9v5t59pammtqs05zzu6jv86jew3hpk12o567jr3bu526p1329ps3r958ir51v6hw2oq0q85isxa707yc71ad13o5cp4tf6xc5p8nyxtb0uxi7f72m9m6pkmow0iyrizesk2bquqxvv23wux24uwp7wkuh3jeghi8wqgz8ncrtslgq88qa3d4phpils5a9hctxwe1mz4hve6zfg39ktocq73xsaxkm203wtmevwsxxahldlha06asab8913lqrptkrfk9p581svmkqvtvkfk67pwk77tx2fvjsjytr52bnk7siwlfjtmieg41qhst0wtvkz1govvffcw41wx48',
                proxyHost: 'erj2g6ykl8mm5nfow6ywozdt0ad8rx1xyv55pq0ou3prsc692orrv93y9sfs',
                proxyPort: 4568687604,
                destination: '40ctcsaotbbghp7roa60wsods3ll1siwyhm0q1pes79gd5c1mpefy7xnoo3frnlo7m4ecnre56jzk9od39iul09zhi1fdn8y5v0tdg0w95i67jp1135nfotbocu3d6vxs8bz6kktl29o6nzfhunp3245x51vwt9i',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '7li40rluhvt9mn60t6inz0bqvl1sgf6lpw6nvfmlxd5f87d4v5j3ogtba63bealny6lgs64gt9d38snizqnatxjav068xg9sl53g93mrl1byjfv0pvmmuulpyg9gxpctd9j9021ba18lt4gowmpghmxjk34udgtz',
                responsibleUserAccountName: 'h4b3avavnepykai8v5h6',
                lastChangeUserAccount: 'sc2s3cgcud4vwpbc778y',
                lastChangedAt: '2020-07-06 14:44:14',
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
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: 'cjrcy7hvjkezyzsxxafm844it517gft65nr0nyyk2mx7wlp8h1p21pjyiudiantsvka7hc4lqzjaqjy2hi2v4aip9a7vjdf7yemih1u4rpd16i53cmsdla6smsoxockksqryhbkq60cx0xer9n7a7c1r65xsg00d',
                component: '7yw8gihoiv19s3zxf2woss288715d8qlqub21y7iu15pfvoe8ikk6hsyyh2e291oe221g8tkggozuwrxjiq5kffiprap131qa1txnxtmobsqz09c9rf5ums3v8nbwiqyqiw8cd5mju32mkkijodbb50mp7qcnpvb',
                name: 'ywi8iahen2ebghu2f4wbh4pzbw6b924c3bbrhosqmy8xqzkcm3mj5tb1p8pwvkyhjkgzwy971h4j7xohtfvmwxapxl75hjaymfsyrwfshingdq2u5bgza9fz0vva11vd8n4wl9g4e1yhua8r8yap7jdvqm8x2ckr',
                flowParty: 'zqvg98mf1i0pyxfjpo1rb47ao56ok0a03z21vyk7sqopovwz5pfplu34pugbr4m1s5pf417kfcjs7bs8d3xy26tvwmb3z1hquxlaqy443jk7b4muhigizozs6ptw32ezqqufwkgyf55c5x451f7i41tdohqxuxzr',
                flowComponent: '1lfpefj5ojjo0anbgxo7ua5gaethtb7dd7j7opq2iq5qs57zwld353h2porvo5l9ba47pryu2eubf4h6wjk1p2qxrffpedoka94pnbu5vbwfp3zyfr50avf9wkmca3d8gm6s30z3fl1o3mkbeclkztwvvhubkq78',
                flowInterfaceName: 'zyqz7djawzzyb9gmy7g6wjgd9v7cap7o15gh9a489n2q4o1nr12lwo3jubs51yrffwca6r15bqebti9iqiyaufslghs3jkf8rdrwpet42ipjl2j19rm3quosfo4fecnldyiu45lebt6nh8865cizihdyik7evarm',
                flowInterfaceNamespace: 'eq27kg9a59r2ndjlxo8qxmkrpxe9c1dinihyh40t0jmf1s4lbqepptbn4hsrt42qa99m0fkycwzmyeekz8i0wieckgqum13yyytyklwfiasbnduisca8e7bxrxeio8rxjph0py0jxkagg2zcknsnkorfer0jy876',
                adapterType: 'hyyvwiixd8xpxrfjqz8m9ylpzkxkefsro39v8hdn7etug67wiit8lsq020vi',
                direction: 'RECEIVER',
                transportProtocol: 'n5a57qsaahk6qo7rnopdk5v27w9e4ui3mu7rks3kfbzt4llwg2q0zeprokop',
                messageProtocol: 'jjcer7z32pyh7z12l0xvggc4pbj82p5qua92mr19hb2jgzg6ovqfk3vpo8df',
                adapterEngineName: 'kgc2ccqmho91lof8gfm03672lkjikz2ju4us6rk2y8ps022cugx334ppok4puplur6j5erwpw6zjzpk5080wzksq8zfh9tf1xlrg8hzbn4gtdn1otw1tx144lp6bf26sfidw6pqagroifw3iut27va65htaqwz0z',
                url: 'jstn307f3fcsgu2ol8isfdicj4wwao6x4pak9i6nr3zgcomemsta55urze8kmypdwk619nmd9ppiovs8co0wu14b7fkswf4pjvk3nykzbg53xi8djoic94eahls4qfa3p0wzkpr2c5gbytf9130wioip80i1l5ga8pfi6wpju5zo5gwztt14m13y18wd12mcqe5tmo50qjpj9yhfmdsmtojupnx31w2k31cj0v1ytz22tdn8vzox72xntop0d1o78peeakfqyfc6x7uyncspyu5qbaq3w7dwwojozm04l66e4cr2dfxmk1imsi7t7jex',
                username: '9hqgtoz23n0wlfl55tjjl6kx1tfbufzkfbve85go6n5mi4vozqfske2o8qiic',
                remoteHost: '5603i0guo84dprcu8l0v3z7f5azigguc3dzdpbalu5yc76ass4aebre4lv6idbbnx76ls3bcedexz7mv86e5qm9lgck4xmgnrly5gx6r0xq87m5etxyu127mp40zwasjl1fs76e7bcea4qz5o4qgru2clasto7va',
                remotePort: 5257570043,
                directory: 'jqybikc585rvp2zkde75xumz5vjspocn0wr67ze7qbfaetc1zrlnf5y2iu6skat46vv9zywsg15i3p2jwcfrrlgbonxcxa1x67mir37mhht65kcqyzab92nhmctqr66gy8mhmih3ln62ns22kkwrmxhhcmz6e1a2cltfr856tyucm8651mbqs96w0lqz3ojbbhz2e1mezxmghumgdw5ga36su76sferpgwme24pzepklbwxnyvrq2us8biyd58v29qv4adzm69p2mizdxp1d602hsggxeu9mr0fdcc4c0wz8n3c785idmjpg3lzo5nk91z8g7ajywbagsqm4kv82485ubfl1pjbx6x8j5yw7u5e2dl66awj3jatxjwlzr3cwbo5dsza8okqx1g8iai8o41aggagvxhm4dy37n6fx4u8kv2tkqatstcr3lkjne7ol3jv5i1x51ornsj3cktr5navnk09vgyllsjiay9lqjp1zn4d3x47n3l979ozpswg3vapmcsz8yc8pyrdofj1mt184z6tiz5v8b6830xrxom5ygwhwkdaylryryxbl40e5t7uuthr4falveequt6w1oe6t9zv78dwiditwvlht0pvml1wy5zctp0ajyzgighr814eldv0kstk6k61euk6blndilces3j26giq52dy91g0wruzppym963ctjreytta7c4qzkm87856mjh71oqpw1m7qooo5cicnccquqdgy4rs2hwiqwrczmsdkzmnlzd6ltxxsuxq0i9yavlkm17l5fdp5yjkx7i19haofzn9k531hxb4ypbrudxhqgaj8db7ca9s4yjoe1knr2coc9bv9m99ssv93n069zdk18jlna63lqw52se2v9tmb08taz57gox423ldnlxd4rshzbha4ae6d3s40c3lusmkxobou7wriwabziy2388vwjhnuvejjfi53tzunzmmumkpfxfjjbntirlnga9i9ipqjx9f91fxyqlpjqxkbsqyx1olen5wa',
                fileSchema: '3si8lkmhck901cabkhyq3i00cxoiu5aw7phmxeli40l4jgv79ovnbazixnz1lv5cosy1oxjc2pei4dmqkrwyml2gu64gweyj5n863yd4qpq9csm1ug3vt0isxzjxbgzueu8z8ckiggompgnl08wwxeuv64pni5989okohd1c6wt0xomuts1rqui7cb579wddj7bfeb4dgrxpp05ymop1rt3chpdc78tyyjpg4eg8vio1wecs6xnmlloeiq0qoe2c25oqj4yynsb7dfhi1hmluud4rmbzzsgrf3w8ab0n01h4ydv77wyfxlhmnhtagf7bec6s3er2ye6tpqbjagrd3gpumys0fwngkgjya0lc59slmstqguxlyqb8kmlcry0g0vor4ph1fcjw0h8fcds41nuwul3mz00phrpxvfw7duqjgmy59zjl1av4scf3rn1c1hs5rrfn12u26ucdhh5b24bpbo83ob4er61xbtrp1vmojrurtyr1co4z73dwx7c4dut4wrtwy1hxvg4r5q4o7arddkmpje0hcfwe0kitefqqfo9ufy0pua7h4dhbfj0ukyn5n1l1tes6z92rdpeid51if99sqruj23g4gj76ilhxtytyeyhmt44ivo8ejeggflsp8kkmk8te6z1em4e7f60pz4y42d62j0jho9npe3zgei3b2s4x36gmz4ea83exnhe0qnbj9j6yenyypz30pp8e9pe2ein1rtkr03fyoratoa4qkvmpgcrxgp3n9bjy8fne5l6bvmbu8lxxszrfjape8ut472s1emq9qel3g4y9kip7ocv6cw6ndmzwlrwbvjxbg61ihk47y3curhporr09uocrr7rg0flbktne1c0n930jwflsml2e45wcnhpf9pg22yced95gsrfztfnqvvx8cu8mka0vrts04s5s2bes1wrlajx1xbdy0u1q0oshbx5rtktostiu1yy6hyubhypmo361r0w06gb8khn2gnxm07i5le5tfe3skc4h0b7w',
                proxyHost: 'ylvm8tko48ya6cgzyhj0k0xsqll7d5nyk69up4qyxifdji93choxrdi7l90h',
                proxyPort: 7032469689,
                destination: '92mh9ouuvnjkg2zld4hyussq5xv8nk8yeuw0kdz3k9a0dtlbeq31yby2s30tz1p14d85sax6pxm0pz82bxkbsqtdks0uwbc0nx04ai6kb3tczl34j7f7tuul5kr8hnmdm2wnkv181cg0l8xyti946nutvifhe4t4',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'z3xkzuuzimszc1hh9orukvv4pjpgxguzo0n1ngfm8cw3tarbfq2fo1jymjgit8ftf93vfvgyufhq13rv9prl3dycof9b314nurolwuanda5f27d746wfh79r8tss1k9zk6t4vgis9hcdb7wynvhwi2vgh2i0e0tm',
                responsibleUserAccountName: 'ue8nz6lltvd3msd0c4nr',
                lastChangeUserAccount: '8xhuxnmz6dls3eu7qqkg',
                lastChangedAt: '2020-07-07 03:20:34',
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
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: 'grtcp6r2ug42c4ag1a1q42p8op7p1c1zk9bjzhv6eo7fdyixhyqd3piinea8jnbuore7ow59rxt4t0qp813pmmfvbmmgcr8qydhkye5a9erh8momfo09k3uyjikd6szhtmhi35dt23h4w6adahbnm19b16r4ne9l',
                component: 'g1hb5aoyr5svct2pu1eympkvi29h0729j4g8vx4nvox0szz3tbbx01giklfkd2j5r3lcs30n4rp7ldan967h5njb2xmori6pc8txg3dtpq2vfnn8xhjmttlbwga5glrbx8c0n9nv0svfxw2p43av6z4xi9opdcl7',
                name: 'fwo8d6cgasesiz644caiyk064xhmva37cuo18oomk2v4lip9xa0hus9ae598g4wd5gx3ovkp0axdnpegwgc395o8kj1if9d9bk0hzapox1i2cdf9b0rtzjc3zmkjh7t1dh9086r5x4lodr6m3vim6zloma1s78w0',
                flowParty: '5i6w0ash2f3tc4rg5uf7swiu0gt33xpeuoattwguu0wm9g7sxk3ozfubh44mmuwrwap1y4ehng959xv4v2gyjh1e2qffijl0bijsqh7i3ki3m586q3izoz0qngbd307j8ag9shgivh3awi6fn7kvmsj04pfqtxqw',
                flowComponent: 'eehd404dr6pjk85o0u9oi33xdzc5oyp0evcfrz4latbwa8q9zet67fmkmvo6g22nadfz7caeohgvdusfkm3wwhiizbe41mmsgs8264h2rjynwov5pj13bkt1a0u6luc6kr2nk0eox36feikxgkpnnalbrqv4woln',
                flowInterfaceName: 'ezejamp5rq2r7urtm53v3s6683fjdeu8q3t1opqn9qk4pd0bp5kwm7w91di1cc4gd7vwat3zcnk1jtxgqb1jelz38x578o8xa1ppv7lftehi0pdw1ypk6r93zs8j5cnvok78hjw8jduzznj3y9ijl3jktw4h02bj',
                flowInterfaceNamespace: '49uxynjt7rx9ew6pwlqnl2pjfyitl4pjw7xwildr2yz1q39w7vitmygkj9rjwh7x0ltlw1flqe28tt1jadoz9ywoxr3aazl6rn7p37vfjrw045q2g8ntxpl6z4s42sk6g3kdecgpa4ay4w7d98uizs5fttzhswxt',
                adapterType: '1it2fg54n44wckjnx0alxw8dpl3kxxnmhcbb2ff7q51ns1mqfa96rv811fto',
                direction: 'SENDER',
                transportProtocol: 'yyvutiuf61csvvhm3ui1sbrwpwp47wqimf9em4iybqbd4qsiilshdanu5ben',
                messageProtocol: 'ixld651mjl8qoymtxhj7ry35c2bxce0jexqdb50408o4jduo0rk6i40rqfq5',
                adapterEngineName: '7r8nqtwzm73b8m9xvu2ugq0u31hvxht6d1gwsxf22j70ovgnb599nsqzwajia7iistlgh31zkxu89f27sbfjk4w9lwbqx4ydp8crgrcpfyncre3nzi7fg93r40vrlvz47izsmpqp8kja1iy0t3mn0q5mk0vgbfq0',
                url: 'aopckvc3jpdvt0gt9vyz8r1xz5vegqslr1nbh935lltdypsjd0mjm8yblcwv84v82odye6ab8nt3m4tbq4ukqqtb9awrta47459g9alffxk6d3lrb8iy1esllz1mc6dkmp5lrgxmd91fs21r0d4ejit37f67dj6j0ldk0v26umt2ozog1fkvisugg3aygle022at5hk7ebb1s1n7yn00655p0xp8atz87b2dkbky0mrz187aq4lsd79ejryc7u0v8llht98x5idrvmn2kwummlgwjcv5l100smvlxo97sakiq4zek2cvjih74b5b1qeo',
                username: 'q0l8r3gzyuit8wc8qzzez32mt5qbdpztcby08cm8x0jx4jvc4z1a9ydyxn91',
                remoteHost: 'qqtqrtx041w99xgjuocxzg8kbj4q9c8wcww8y0pjoec5s99soep80hz1x0yd8u88o4d2ixs666wbywqw2xgxnmyib9a838qhas0758h1in6v8miefzlj1v4xy64uo4p3323vfbkzqstviipj32uqljvk3k2pkana9',
                remotePort: 5657236360,
                directory: 'sd8jhfajh10l68ceg1q2hz4iz40f7cg7621k9vumylx45vs6whi1p0sqoibtm6ri3zlt5nep1julc816w0yu16hwsaw7mf5go1ce5b48disboastkoh0wfcvnpfh4i0gqrudm9l1u2srqsjekz0f8e38236v2g3sbx9g9v53goohbwd00n2t0xs0cxb8zxlzs9w0tzsc9r73aqlfv3cy1gylp1aik4uvjisodacfeqxmbzdt81foxh9zwk5z7yzknqvgzhfhlj9ufiqdyplcxzqzqlzlj7bi2b2whbzq1zwdtnycbnz85u3vmno5l41tpi9pgjb1uvm88fjhn4j0ies9argrm0vzux3raiq6xhs83c8q41wfh02xjdf9rjqxftpdx5mej21glepe7r5littiyhz9wrvcsuwl88orfhuvhvuj221x747wfladf80p990py3anqmhhxt6n4bo1hn0jc6a3gwauy90v8k0hrj8immcvdh0grjnoxyq0i86bew4zbtmbiuuil2nen8bzjqom03c8luo42xpni2ch7tg5o7kpycb7dv09vwj0c679x2zzn33hfhi5i1d2zmt1viowny7js4fz69dlh7p7b7f9rlkueeg1t08745tahw1qtcjo2fs5rouxqrj8yl2v6g1bcy6xcgwfni80rlmbm1zt8mgpmrrf2lbewn1q26kyqeqm9qd2kd49uxdj4q9zezea3i6j9dbj84n05w24ulthx3ibwrej71m2qwalemosrm37dv70shhlsg0h84tcg7xlrx42vsc81ysypjl87kylvf4uvx7u1hkzqf5eg8xr6xji9uai6yj5uytul68nqqom0g2yw3kshxg6tai09jf8nk6retpxljmkcdaty78fef10y6ux3pv5ipx19jp0ia6eyk57iydr5ve2qsse2vvr0n2k969tekkreuu5npxg9hjkl3t99y8r8dqein03rzmch491o7dd47dtcrgtda5qpztubb5hijhxp4u1c9j1',
                fileSchema: 'nvb81sv9y5c5e1bqabblaez60uzar6595fju36ep5tcbtw8sqa4a671s6v07g4796i9y0aeq19mzrvkklq6m2wqxhir36adpknlet7cu531afeblt8v3ph9s6wc8d645qdu3hv1ovo98qjrx65jar764wck4eyv7stcl75f1r9o40upiclc8fa9d0ze5acdrvhp3doca8zdncm38y9eeexbo421u9wrw2c10ze8m7ddtoc8dg1u7rkb19y6a3hb0kuroc0o2crsdnimr8elymrmg3ymg2qw3965doa2355p7hfhyhvdye0s87e0o1hotcygusivqmegevg72znfdhte6uwbtaejqsyoz3fias873zrpzzj9k1yhdmgl43m14090dcqfwd5wkhk5bxvr5ictsuj4qmf8wfildx6tw4y3b2kwfia4f5zuh499ooown8onrrgx9tnhv2u27lp5e3zsxaix4k75cbz6m3gyuesz9floqe3w35e3ko40nyt2j8md5f14hux5rxczqgyxsq3goxh6r3t04ccs02kgeipf8zu2hzpn46eq2j1xtvzhd531g9poyxgjevem4uqxqots54v3jog8546q19gzfq1bmvsz65h6xt9tg4metvcu4amuberdtr3l2zmvi3kw74efnr2rthdnz50j8spuprl7o0ly1e66y4ex0fhxcl8wzx5p1k81h8vbpe4zvwionbno9v47e2prko1agqvj7ykwe9jyiip4bngta40gpy5ftmi7al6gf477amed4p8vgdyi2tj23qe7fil8lbwiezooxlkqvcgrq7h0vkoduidyrj40lslswtwa906mhfkrjxgqtdocjjvt8ydi4rj6lcdbc1rw9bsxga6rebm14avxmd1evfnpmgukj11n5qx88r68lb64i6korelwy7751s2dfqe67un0uv1t9f28ehszo355fa7mxyggwmhht6721yfmyl64auo0r50eavja8ly1qlno6gt79w4vr3nocyimh',
                proxyHost: 'tglj7irc3wuo4ho255t4l0rks3hqlroaaedku1cljovbl3m90zo2zdk8cb6n',
                proxyPort: 2386707123,
                destination: 'chojy2ncg2hqn1wy5oyo8m989cp6ty53kdclmveu6wn452jngy2m7fmjh771lc58dp8dagns1otzelm4w63h1bhm3mi7oi7ud8zqc6vdgsw9gy0hu0ge3jxfp7ziq1mc8c4bnnu8malm2j528y07nkjz01h045my',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'evr8ouv9hdz3f36z3kzhiloz70aftlexna2k0s132wkbyg2c2ea8bkssl1v8vsj4nkee0cbn8ptt1ahvh70j6trjki40c6shuvzr4m2mgfxykq9di17h32aal49jk3yz4btkaizcnx2at59zekzel7m7yb9w86gl',
                responsibleUserAccountName: '65yn9ks5o5y1jr9wjisc',
                lastChangeUserAccount: 'hxsspg3vth2j9na97035',
                lastChangedAt: '2020-07-07 12:28:35',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelRemoteHost is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelRemotePort is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: 'e8v25qen1t9d3sw102qrgiakke6k53qcmz8i52jmi81tzal3annfo84qkd73xirj642lyyk9qmnmcsqre5y7nymw6q53418yqr6fpz6hczbifrli2vdwp97dv28uk58yxz9ihwjab0hewvaj8pn2grx66l9mguwb',
                component: '1hb1vk390tdqfqj77ehtsz8ujqu706pejntjip409gwiptjlcbvwd8r7554drnthctshqhcp0jkg83noljhkmi4eyvtjbsfc22pkirzjwd9i4dne47nn0trpwf54luee8beyphumpl5mnmi9sjc9wnavtq9kv23p',
                name: '7yrgpb7gg9ddd41gktw0qvew9hvz1z5qjiftvryza4quwzh4uwdmnpus0hkop51u4g6qk18iosepbdagvzahnzdmsbve5gnja49ffrz83x2ety7iussf0jbpecj5g9qhvt6o1yi1gqzducd10469i175q01ri0gq',
                flowParty: 't6i47691jpsg1lmxjemlfd65mve3qy8ltn78mzb3lzjbwx2qa1zo4rud1aq4tpacynsx18gsk7b5u5zpm9u5c3oz7ih1kqo3m45vprouleq5f9w7bep324ggqlckocrev53ve9fbdij8pur072c6j7d4e5g26lgu',
                flowComponent: 'xzysg3ty3oulhstmluc7t3kdt01x1lxdd2tep9md91k2jys05uksfxymwok8w3pmlluaa8mgnspsklubusvrrfvgpikcd42g7puq6ggy35y8l0r41bwjoevx97n3n3sw3io0lzcnthnkt17l1n796zes379svu4v',
                flowInterfaceName: 'usk056tyoi7u5vi2bjh7xaik84wmas2x1l77wymigtc2djkyuwndkiqbblerc9ceq2mtt9dp249t27bom9dwfofnvumv23eb2ucgqj3lxhpbs5g0igc6lut3r9mjhu7zt6ync5nd9td0qe6r7e0rafou2ym5gt5e',
                flowInterfaceNamespace: 'tbjaz9f3w1jmclmbukxfh2whmfiv246d7l4yhlpnrtumexvdowp1itfxqvwyv31tsxcsd0obelonc7807p90k8cd0y2cdkft7tkqejwnnpaz3dmfk6e3unbu17fk61u5h0hobsvbh1kbc0uyecg93xv83mqdu07v',
                adapterType: '5yyzmel376s9apzh2v2zeuy5vb8e19hkh2cztnguqzusz5dhdcoj3zg8y213',
                direction: 'SENDER',
                transportProtocol: '2olevn1ap9x7a9ndjn15cmy73suqm7es11h5xwayud8jrut7018zyb803mzv',
                messageProtocol: 'plg6kquininq8b2twfdxxk0r1b7wpq7985t9osaw3chg6bodtbim53u42onr',
                adapterEngineName: 'zyzc7j1kdty8a5jttbl0ap0v5ine1a364ulwav1mv2r04rfj4hjk40qqaxr9260dlhc4dd1ie30bg9gio4ra48z2pm71shp1hyye0ej8lwbks6bz089k6zqxia62aqgpk3pw78gcuk3ui6ainsufkifh6g55o3ti',
                url: 'fil29o8419y9vnpypsacdjmayd6b5pflec2ip467aaxj0ecg4psp4zi7k3ftj1lil4koyubogs3bfl3mbfukv6rin3117soj7huto9ogvi4f3tnw10d3qvdh369y4tmvfydkda2fc853b54tupwk0ga953ataqslgkmb5opqn66w1q6hnresjol0tbj6kwrauuqnwapn9101uzqe35gkz5560sjiz8w1r13j1hjlgoskeqbz0illuzp0tyz4si5mrj7tff9bt4j71op3i8kmzj7j6y3il40iwzj8pg02tqdkq5ljr50xgigppszw7gt1',
                username: 'etpzm2fmzhv5c45oihmietecg9kzlmxcukrremarkhaif50fnn7u0qj07jrw',
                remoteHost: 't0hqpj3nuxjwgvpz9kollb3erzbhd7llv4kdht7pnabepygwxqd6uhz7yhfsmz75br2psi3euc8e6mbtcvyo0kl2z5bmtut68kij846b2bcg4xcmen15wyg3zytonvuqltxgf3avqa16dmgw1ca6vbkx9zquaobc',
                remotePort: 37360332925,
                directory: '1j7nubz854mp7i37o1zadyh2gy053756v9rk8mo61j0lfm1cvzdryr406fwvb4esoy4gjj6srwtgqecw144a3vhxffou8yffm59vol36otwe1n4hvwajpgn0ztdamg6dwvy62t0ombq0xi8bo4nao01xlop37kdxw5dik9utnayfqhqp0hb37zl6shjav4x0g3v5zs5ylvts6hfvaaug0dwa57ax4v4otlvlh7kb5go8hqojhcbjx3ij7rwkjcf4b4xa276q3katyvdqfmmefa45ro1af11huz0v75owbhfsy02sienw1c312wsi107gasotdeaz40px0x74lvubhov2r03gl4guopygfh45hhlyfwsmf9op2r7hm09l9xa4fxbalmfpz0lgd1ql5pjjps5mts5tqd0x14smf33dr9ci7c7mqm9nuj1sx8xsofqwp1twyuzrsrelc4vsotvrzmd0yjmc9dux12x0jxotit7yc87t3npm07zkmpkcpktq6fhrmej2htjup4onjrxvzdhl6ssir82f24l86gimq04o2ju1fef4chdlbi7jnuugveuidaan8j3l09p68h2r7l82pdfdp05bl6t45jn5r4i1kf5nb6ha33s8o0f9ylj0han9p52cdzfxn5rmrjxbziuhf6of1yps438lzd4gijlw6t9nxzuovhlc8vmbjhhsnnfb95xht9aectj6y0yisu583ux41n848hewo2299rwhhtsdyrzzmzlabdrig7t6kap0tkmgid6f3vn39kz8ysu7e9x9io3kvw52e5dafu4dx0ha5lw8vj6bbathm1lv11ebmwc48g54341r9iake3o44ff7542vlv8q5yzymy8s05jn5n8o3zlunxnqb052wlf71apc41bahidliz97vnqc53ksxetksyk8o2n9ru8lutbddiylq314k57npo6480cg84g4msks424po1tysti8el4w7sx7d2s11ggapxjdfqeynik5o46454ype23r',
                fileSchema: '7ezhkp5imkj1mz1c6k0euluwu07ppo1jsxqeeyv6za84bk7axvkxy1vrw6dat59s0hurbwrr7scyfpqw8x94k13kuqm670cayikwltww2v83bvl7zw2ydh9p6rs53vux0qvj3xmoh2dg6lvsy3ng6lbb6wnd7ap8rqvnrskwrhju4o5kduhovn4kigzrzcwdxhhd0td9sn6f9ewx0iaisc9op3ybxwotpsffclxsaby7232etb0l7q1bnauujjpx36qh23gne2lopj4x6nz0uyxawmip5yc80l0u52fts9ml94x7q9jh6c0sog1ekqq2e9zw2rchzpdht6nvszz1wli1fhknp17u2n45tv0a34s5uxefyn9r1o9sonhsf8lqpo9fmifpmqtxm9fek8injz2cvm5l3r62p8m424c61wox92uka9y3nh1xmhbipnpv8rr8upbp13xv9d52jopks6ofy8ea0mywsdodi7tr6es8dbfxr6vstpa9kp9607cualxwlq50fpb29yc9va6vy79b5p2tlnr8zqt3simdr6scn7eo8uaenbpaocxc50t9k9gehdbhgtpqdgblv1b8r07gd3vpm6z7h02jnqlnx06agymu3hj5vvzrsdz9xn4od2fwz95te3w6rzgf4ny8vs9k20b25tzv1takefd86vv5p0x4m2efd9gxybktwv2bpebw77o7b7sxa871bpjx0g1flx6xg4jmott5s82kacjrm30dh3eaj7csmzdwvtimmxd3xjg35zcu3cafksd5hs8pr3f761poyi58yz08re2h06nasv8gjpgpl8i942nuchu20z6smvx4tcttziib52g91nkz0tn1b2znnvowp08ypq4cok5t0654kqvr3oae8yps8fpt0kt441k38f3bz0zolasoot35b4e47z455eh3oyqd2xw1miocsor4hdcqsf7loecmykh8vlhaxurtv5ku3iotmb04u66bsjvcz8y5djko8x94anuzv8jhgtmz',
                proxyHost: 'hku5yircp5xvyo0scvv0tumq7m4jgk6h2f8yn9bj0wn7ig08yg7dhaf3uqip',
                proxyPort: 2341390775,
                destination: 'k1mprs6hgkfs0572s7uw9a1v15vtyp2u1fb6r18g0maqe44tmnlys5r0b8mjmj7d5tocjbuncbxjze0lnmcky2sna1orn2tfxd9ey1m17ls0ksq1zc9jpkmh2nt51uy2h0wzxn4ibw1hq3abmjn349xddyvnacs5',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'pg4kq99pyms129yjugy0gf13na62jviwcbdsls00934n8fzdxvbhbtdwkx0cc1bsbi3yozdks2sq893iyw1eu4ov4d1njk3ub4wozae9tpfnd18a68j5hig2p30p1d61wx37dhnkgoiekcwa0b0qnl0ljk23nqyn',
                responsibleUserAccountName: 'mpni0m5zj1jte6y7mlgs',
                lastChangeUserAccount: 'j0lsow32i0ycklshs8c3',
                lastChangedAt: '2020-07-07 08:53:53',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelRemotePort is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDirectory is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: 'u42jekd7r5g31nx6mffk5pkn4i4nvk3w66xi2rfdgtaavuphk99icqwvbhsudriztqgz2p7vold3o32f515jfpr2fne131lskv8sqe1uwmnximslqb8i3jyl0q48ypx8hox5ivfrvlloprt049u2s4xyfv81gddg',
                component: 'rrj27mmaxppks9r1lm9igt5w8o7sqq6k3mmedf9kzz9sin1pybhe1ta7i4y2qdc60ug98usd7tko7s6gsepqn6njtn3je5mhtb6v0glp47te9odioc4wodn6zweu4954jfmxoueoqiwbkb6n2uywwa7he17u8b7q',
                name: 'm7bng9ykvqyx22sqs2ieahqcfqyv29x2t3h7sgm3zf1l3b5k7x0whmjsx3czjz4lm06achgkr6kldgdl2gq70wr7xjy89lz7q7pxunqwy9pf36f6iz9skfzm9fgeaghi71xxak1lcgeywbp7crfrbgz6slgqolhy',
                flowParty: 'n0t65r1eenqf0h4amoeysj0vfo5gro1qkf7sfsm7ex6viz6ooeewxhxbw0ovq54akkki0sx6gzjlzi81tb202ghywdot5t8neu6oxt1wyzpwvmmcv0jtuk4bw2swhhjy0u0gjmsnr8tenm3zqc9cbt8zwta8830q',
                flowComponent: 'af4qentdozx5rccohxpj0xoz790m780ms0uwit4oqczqti3oxzuy7c28gh3k5nexjgrpjs26sgv4lljpmhce329b6vi0y40vhu8n4nfat1bs1hwu76oh0d6qu2f7pkbtsbci629wed582vj8snr5kwoxyrhs565s',
                flowInterfaceName: 'snjbp2mlw42f6ud9f6o9bkjqfvbrlhxm0klwawwjkqffd8lfqraonb8p4ej2gfevtkjdf1auxs2hnir2bmmiv496cggno6uooa7upyrytpr26o2o2vpodpdjdj1nv6escl8muzczcecgulzrfqqlreygu24iqvf9',
                flowInterfaceNamespace: 'hgk0qjunu829mh064ddt7wmcuky3ffn9xmdllrmsn4u55nmbq7qqd0bybc3uvtr78t5m3aff38ctz69mzjmo0fyahj9we0paqdkxeu23r2q8x8fcnnxo6hcqzjk11ulb9ksjz2yl131tdkzvzbrqcstoanrrs87b',
                adapterType: 'p7ez3n0tn7jr6v01zywmdjt0yu3fftg760nx1j7nu382rgufcgxbmkyiw60m',
                direction: 'SENDER',
                transportProtocol: '4m4y0rhsclspto5lov2mci77ifz2b1icj3gkc7pm4p3iipt2bmm8tpdvexr3',
                messageProtocol: 'tq41vjjurc688romeclhc3vrfijhaih36uafrijy4ss6zfbcdgsmb7tnp74k',
                adapterEngineName: 'ipjrxgahki7mmg70idp3cee8umem3bmlbgld42zgv2plez2zw51iqp0f5y1kjt66bp2zpn0u6vtvzriwqbelxw4dyjdnjyi2qtqjg6ej8h69codlaqm3djuujjta5gi2exdmhs2odxyevrx0og9222ex88cuu666',
                url: '28bo2excofylpm2053dhiqjpti84avcnpec1s2fvjmq55k2li0e3utj1e5hwcdh3noht2ghg5k0q78fvy326qbidd9nnqt1xrj48ruq29oh5qqooh9ffh4cx4jpani9m67nzn5fngl95ke8zhg3wjdc4snhbi9498fupzzn5m6d8tp2vnvbwtnq3f6zrb7ridd8fk80eakrk1070l78h3bpkjbxj4ggt825ix468jn7jb8ihc2a0a1572heszk51ejprjawt60gnsbswj7qbhkqaqndh7xzhbrp9hyg0taznbz5md729ykx1j1yow0xt',
                username: 'd9t4ys7v2czht2fov535qnvmck79rgzsuvs04w773f09vial0e5pwff9txtj',
                remoteHost: 'df0qm74anbon4oamlke8t88deu8tgncxpi2pzmakuof2q1dr09lra157zb4ymm143q5et61nmf5sffh5i8loqvifd1szerenc3e2wpy7xdnx6z250bzqgox78np2tn28c1ffn7iu062z2x38zi6p7k6wq0m5xgav',
                remotePort: 3753591498,
                directory: 'gl4q0iauao0wk0fa1zi5iiibwbedcmwk4xzktd1xk49ppwr1x1b9knpzarhtwrbxvi9m3sxkffr180l5rz7l0nb90qnybdlnom7gacsq14ge3qqxw76vko8nhjp1jip9c46mql8bmbk87v9oaxadrxi1ccnlq3gx5qw5o5we5o0s7dt3y52715teebc5fumg7215oj2aw79r0fv77l4siil4z9x087i16lv3nyw1o5d8hkgajhd14bamjxs3tpgz0g4e45byz8r0qciz4dtq3zbhq2g93jaot5j2ftf7o2lucdb0mn9me9rk02x0gw8fcyrz5o357b1kzk3aggqxvlnbxojviqwto3o5s4z9sim969lo7n6lbt173c80qw34q4bgx3u8kmifj8zqda1d0rmak9py9v9mlns0axjqx17qsgdtotmzysohun28ygg99i0wpdy3je94v2xrdokyd8fr9c6qqfhr3cdd6kk2oi54apcrcn98ct8i11qwth2153dpmbjcqck2507lwyzdhhyagwqzwt4slnc33d3kdwrdm70thmomoq6wfyetf6sckp3lqcshiyc80r79uwdm2l6e1e20abzdsgpeb8cvt87nudqjy8xeh6tdqh1v5jaka5nv4vxgt08b5n2nksl6uohw1fb28vg14cnwpo9295hax5ot8bupbb6me88laznjld8mxqtygx1gh4o7vo5e2lp0821rkx86dt6dglzzm85vsu6sqi3l30oi2hotblgy801henib2jia2cxk1pw84zeq9cod38zq3klonr9dlp2xt9gckzusk7c4583my7rowxn4tyuka6x0lqn6woms0r5ex986brn819t9byaahll19irobawqi9k89cginw8egxgqvfbznpo96t6mdh31b2oje2pu23uhp3g1d28voxzpwry4m26y1ad5vcmy7xfhsgv65mo8uykvqj71gschpgbwfw2lhliq67dkcebv8m4m27arcez6vi4qdbx9kroyh',
                fileSchema: 'exgb8nfhlr4yepq79zriej7z2s7uopqw5zm2wjxxeufo6fw4ihlxulb8zojiia7olxzhfiqgqg8ilutzjxy7yfuyel0qs3t79jtlenl9p1peu5f52itovaeqoi7cz3dobnzilf09ecu1bri7ly39iyb3t29r6rb0cbulop3x56fpe9h47e4ot6coaj5v5tk7hq8z7p1jqy3hecmhaw0408cx5pj2cflqbiteadsbk60g8askrulvz6f8pvfxlguzq5pl9f4twno7hpz3uguxq9ofkqyp1xhoaoezu82s07kmdiku4b7cchau1aodzw9qc7tby67eyaseo0vyfdoo92szsgcbximau7xsv1sbc2vsiv04pd5xh6d1janml1juae7w02tcw9quz8exn4yt3y8m3k0ivxkijpy50ykz85ng666eflldrv8zt9p7oglv5yp6yuubkjw20l2ydonujtzgkkrvc3ckf464zn7f4au9xeaa5pgnkn2de3vvwvih3nnvthaensalx7gdp021bw9zw5ozru5ywf5g952r2a8e0s3idci1pkamseiijpb32wjsdxh7sw1ndfur4uc70ahjrxx8cok1o9yoxqsler73ocebgxdmy5wj7a25m1raw7xlusrz1fj03d1efzenmvdqfnfxujmr8gow5pl0gxq17n8zh36njg0iw6iu5lgao3miakn7we7n7ijnd1bduw60mspqnuhw8pnumniysjsjkf6gkub6mrt3u7ztwofn3wsfcogk53fu18br1xut53j1wkmq6eoh8wgjtavfd04vwg6ae0xufsw1sdfrr74lk5zapzbrk39lxim1w75lqysbv4oh0cayl6bso37wunxip74742b9u2qrkrsuswl2d6x1ve7pq05a2c15ehezt29ds99kym7bnqexf8yxsnjnlmx1vzl3o4szh971g7vlix6lasnti3qzlgdqjsz0j4vqezn5ww0knbk150q4bai2ovi0vwb4kb66yc9aa3cx',
                proxyHost: 'sr5yse8z1we20g7df93ez9tyfe3of2a6khfwho5m5d80qco0fe2eft11syyd',
                proxyPort: 5569949217,
                destination: '0xgnw8kj546plkc6zu6zeyn7pev0myjkb496ohigc69hqhtaugw1uggf74wdrdkn1o6m0y6huou51xxlfoqd1sq1no9ajr54e47b1q7pkqj1q578aiv3gzbbtmd3k9x7iaz7dvnm7dq5hg867f6g07987ixngmd5',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'zn7p7cfs0kwtm8np9wf8svw706c45cmzlmguh9ptvlq90g1z2i88fy56j7b65eu2gvtzc33uzegxiihkpssp3e5avju7x2l904ifjhfnw4lsfwdajkqtsp7cya1bxm897ncue1fkq55x3m13eu58zi2az7daccdf',
                responsibleUserAccountName: 'cgoudyogfh0mxxiechxs',
                lastChangeUserAccount: 'kxz4qilet2f3yfbm6tj2',
                lastChangedAt: '2020-07-07 11:05:55',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirectory is too large, has a maximum length of 1024');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFileSchema is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: 'va4n3yrfsqa6zsjg02otbec4b679iox8qkt6eu1wbv2a8fpc17tluc5pfp68f8yox5iy3000dbwvvzrmhtsbpoxc0zjzpzdv60bcs628nu284hni63nuvq5793yexgvtw9lku2nvgadavzxhd0zm80vy5c3bb9kn',
                component: 'i02gy41vwpqma5nwg2gwi2o9l4fsb0yyagqwz0g7b1r6iwrw2fp0fvbuaisax4yfq318v223wwvitpbzjjtfdf8j819dmoei7yfqwnltkfq0ydv49zl1z6mm51xr4vi8esf96dzia24ww1n6d8yn5muc2sqp4vay',
                name: '1cxp4h89qsaz4r6x7pvzdmout6em9km7tkao8bqbsnrvfsqcjvpi3h197wsjqlo4l1kbzqahhypen98ssj2zzwxa3es9iz5vk94eyxtv5oo00ii7vde01yc76ic1wtdf3y5o4mor1syp1eio0h4h7bblnddkrs5t',
                flowParty: '9n650kw9g6gin6g6a526rweacluo6pp3hdj3y7buvv50niokeqtr0gxru82i9yl12funm5jll5g8ff29jcj7qmw5qiih2d9x2kh2cg1w32ta2c6h38wvyrcsv9uzxr61z4x11z5g0vdkvb3nle0imewc5udve2wf',
                flowComponent: 'y7gzp7sfrfnbowtkh8m721gcll2724dxqp2hqrfelk916n22owwfunjpj0h7ckalw3di1rltl404t8d4ukrflkwxwv5jtm1yrwl944h1r8gxvahpfwfr3fupbp1kqzcpzdfgq85a3rygka0k6tr40c3i5xhrt5vc',
                flowInterfaceName: 'z7432h7g98zpj6rce2r33qx85d9o4fvusogs1oom9q1ruo8802ke26a0eufioqzu1o8tcey7og8ci6cqx09bfpvrnwifx847l8g47airkvlj6gl5dmxpmhwn1ijb7mjw33ezjvigr27xozn2twe27bldag3bb1qe',
                flowInterfaceNamespace: '0mfmqzvpuj5gtkync3kjdg6rdsr361zqofopz6lx4aexob9cseu46s2c0f3i6pp685x91tk05cx4i4bmnrwq8lhn5j5s8ntuo0yiuin42yk8u1r9h8czggpjmt8cynem2p6ck1grilm46ejh8a5h2zixd76u6fbp',
                adapterType: 'g24zeatlh2mp8izljox832ozi4lhd2hsfyx38bfw6du4jn1wtokwve57mc50',
                direction: 'RECEIVER',
                transportProtocol: 'eos3bccr90br98pd36suh5i6n689p0sprx6gt2kk97eaopsu01zc96f965oa',
                messageProtocol: 'c4o8f2xuo73hyzen4ednazhxhkd2283kyy4vn89n4vwk1yrma2h2qz1kpodp',
                adapterEngineName: 'iul3xo5p5ge9tkohbhcm582tekpqw5jwmjqc4fzc3f15xva8g3tk65sh4a2690kdryfsm5j8c0yj25tuksjya4ld45hnzldcat62wm63tl2uotbe9ufg17frq797nv1dzt9m9hp0ebmk8394ohv8061fel6zdslw',
                url: 'xkmj50fqc08qmfmxaklp6e7b56aor4gbng5193z2ljwj78mq7uyuk3wj7o12b6bzed7pre9vg0wc493pxmybpooz18ax6tc9jnmfc2zwte3cxw9r2gke51el1tewu6wf8hrfdiro3z68mk01zjmgxrloqvoqu07cwlcovs2jzrdyanj90cx2b17nfsl6w063ueacgvu1h3mrzagxqlxjl7myw2qhe76alpjz2kygy612djgzswrsgueog5tug3sa0mowtfvklkh5izbjehilorp6hfbestvjf9q5q305avspnbjsxcv7qyz2d0p82znb',
                username: 'ob08p1v4sdjtsjc1ws7vlewk4xecsl3clk5mpahttflqvcx9l99m0ojviv8v',
                remoteHost: '4k4m8e4hjpd6nte480yizr0dzawjthb9bgt4jmlrusfuwa6q9upk1jnzot4gq2n4ind75jl3dts5avanxd0130nx2z9vkdehtcbxxmp3ege5pt7wz5upa7rhljgvftu49p6mf8lethdeu3u8132dspux982bcsff',
                remotePort: 8678627983,
                directory: '4hkqx2gs5swncqsdv4acglfzkbvp561t99wcae49o0vyac29dotkjg1sviz7xerdpq8x8wkc5s8y9m1lgaxvh24u2cbh97ompbj74wt4u4kbvrvmkbiuarow9a1hr3txtzsdwciymuugsdae4v46v9808bxyt4z9xncx65n73wue8ab8bi4jcv3y7k8ltc2uxoeotwitkcgbj4oyopi95gy116phlvtxzi1u6p2dg1y7tzjojvfilbocxva8brz87p1mdzrti1une1o093loyl4ntm2c9uw6o3ws5ylgdy4g159e4g3dm8ikvs416fmgi5l6anvzpc2o97w1t129drgpr7q0zpbn4nn36zdz6t7oyxwpgezp068gnlklrwsq3zfj97ow1fc8eejx99bpnyhvfs6v6pn94d4i0j0il44ssmifavodl05vgqvvv0bhu0opss5uqrfukyf7g4hbgvezqf63tsns5xwatpurftx8ajcjivjnmza7ros5wayvz7rm9420ggaba6fipxvxrgmozq8seqfnzn33ridfoc6hrh2b2z9mwhsrd9qlnqebca9q24c2kcnilmz2eoomesabcdkst9a85z41rxtqxn5kws8367hcxd7juyxgdaa1mpmx1evg4amjz389bj073shc3vq7ftjspq1j5tpbeip357r2jpq9r8le5us6uvi8c75rx2fp4dve2ajhunblt1j4pb7zr4i0g610qnbqq2z6151hclkm8hag8fua2z7t2rql5xe1dedpnthmmzrzyq3opdi3w01nl0ww5wnsxd489t5yyphzt78dzzs5ygdylc488oyi8wbaaky9lu3z2owfa77chvx0590n16k3wg4jqcsay3ogbwddw1qcesyf567713xzg21k6hnqbag7fohhjs43oi493wkpcpmjsp7016h6lc3bhs7agps6k02xbduyeneb62npfyngmgk1b8ekyypshmf7s0rr0wp93xwj8nudg8vdm2fwbpiq9udd',
                fileSchema: '7rzwoywljpwdi03blwu044wb1ooseo12dq8po578f8gl3plgvzjf94bd3jci23v7m0izm2evxlrom7qooxq57l76dol4o4eyd43w0zgjk2tystyezeiock21ab6rk03oedq2wtnnc1wlzn4vs5i6wgiih1asdpfcr4ra9xos92kzuu4aq3a5oi5dv7nmv4xelsv4hkjx6v0nliai3v3vgg8njhz4inkigdsra2cga4od04crftgmomadavygugad4a2r7eb0qvh0b4yeflfhqw98ohet8xvrg3u04khu9xwpnfdwwvvfuhgly54chzmeelltv76zn3kz57062gfjw63ij37mms7vij1iob1k8e6zwknym3wy37ilvf1ojtv485emocfqgjh24obofmvvhskufo6t1ae61cnz19m8qbd34og91k1vwi7tlwa7lfo0kl66khntpmet5tjli744470su69puthhzibh59tn7habh26yaoy4b585qelbtz8ctujbpb2xw457au7ibygb73rt4q8oo69dtwih9lssc0cknemnr11417ttr93wdh3zwp3p9lz6ck9trmku9bjzw2pclcve6oh4gywkk47zkjzhjtoflm4rmrjyw0ax06xipis2g9jvaid99emcedspobm6pac24my2cfmfufhyp33w2lyeu8oa27mwo18re28lmfrjdga2hc4ph978ww5eiahglxrpslr7hm24nkj8ex1pbjg7qjukoa1u3vneph2yc0xfq9w03d2gd0z02g6yvcsvbqeruycnm2vgo8cgz8v4wj0la5voaygtkommb0daz8tm79zjc3ej6cdo2gna2lslmt1oqdhurpmagf2vn3x4ogyt8puk9pggqfsz3xulchzfqz223i5mfm8ywjeqdltme0lvgrxtukge342dyeizc3lbv6vfp4gspinxiecn6snvrrpgumc1r5x45kh53j676phocxeh77ldhbbciivpx90c582j1gjjqexcp53uy',
                proxyHost: 'ftvlszqkvsy40jak0fd70gfjzo07n1qxjtfpy7r7bl15dq3snnb9bmatwn16',
                proxyPort: 8646192699,
                destination: 'jmkzh910cgblp2n5l0uiag733oaoc9672mi2vvrgbpv8gpxphmrpjmvw0ywjfqyrhnnrkprivv1hudynms7f589cqoctbdcnsjmtq66ejeacoeg1heh7ayc1skocnri3v72i2n4hvacp0ftp4f5ontbtwrtww5o5',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'o6lzkxdlgul9nmrsksl0sx4tlysjlsscp8kxmib2m44gyw7qfpz1nh5zltq5q7qr8v22axkctg1cddhj0u8gajmxdofu0iwoi9klxzdlkg7l5vibbnw0j61jzvmy7vcyot4qpx2kihlckx0zffa3if7fxvch1vg5',
                responsibleUserAccountName: 'lk9lfts2zbshe7v9r1s0',
                lastChangeUserAccount: '3hw221gnj9e5emimsplx',
                lastChangedAt: '2020-07-07 08:51:25',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFileSchema is too large, has a maximum length of 1024');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelProxyHost is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: 'irtlyd4w9t3bf29qvpuyx85u81rqxw5tieh77mmsssthteyakpthcl4zmq8q0ysef9ijrqm1khnfvd78zmtod93j8cle6z7qr97a6f68z77uc2jm9h2lrkgag1vmuo9yvdoo0thi106304z3cyvuuo2l0cjlqc18',
                component: 'hjaikangnxpcybh15awzhsa7061v4ifaddktlsc0zhni72hj5xc2p5gzsw3n6oxwvo6ds4wfduqpo58j3ag9sgbe72qjtzqm5e5yzz1ll6g5m17aba6x09ebg4ehg8p4txly2xc098cyoyfzs3gul8vbbhx1jvqe',
                name: 'tadujukco36kt5ni8q0zc3ia3jrcfbvxab59xtzhf90h7w3gknu9cptux4eqt2xwll3v5jwflix5udlir94yc1sd1kehxrn4qabqdgzldimxndt5589yzpziba8q5mcxaijm06uqfo4yfq431p8s3rfbc35947ib',
                flowParty: '8gelyisnv18ycyy9i9037z9j814ayeu3kiezmckfu5ovin8urb0xgsc08jnxm36wosvbcyjcwzpdebcg969ibva102vm1sl08xrsq5ixfgiqdqz3dhnrjox5cl7cltiqujfznf9svw4wbh4xf8zr06wawznxgbz6',
                flowComponent: 'xjct5pv7xpwkqsfd2tsjpn9lwirijq8j48jyzl4p8mwjcfgh6wmptr3i51lkjnlbh0a3wk66sno8hz49j0yytzxgkcdp964lthcmdyjq1vnioffuvrrihgvh8iyvs4lnmasqjxf02lbfrvi9madx4p060yjkb16z',
                flowInterfaceName: 'c8d4m9jx2tjp2keio3k3inibtm30j9ac7zcgq4mymd5gqsnhkqefaym829gsowm3qbt2tlpjs34wxf743kdprfm1mb1go1cqlsc9qeqff2u16h1tywdhmdgimz383gp21slm49h775p175v64tzqwi7536uoim7i',
                flowInterfaceNamespace: 'qsi6vo3qke0h1d40zy0y01cyyrkyg4smfh148x0u2aed0n8t2924vb35x68nome4wo7vk6ut52c7u9t0rlcv4oagqrgj7v50rw4tb016ng3r6mmv9vlrk7cnqyq7w0cvo8pbhy4rsliw64ntp59ts4y33dznokyj',
                adapterType: 'q8pe76kkztydshotc6g8mdik9iugiv1tit5ipggg8n3tuwhm7n9mgn2x7eyx',
                direction: 'SENDER',
                transportProtocol: 'y5hbsb7k1g0zuwz5loxv8z5e8z25ivtr6l7k341f64yddpwmkgling24eq69',
                messageProtocol: 'o4gx30wrf4its5uw856u3o5l43yi3ttgigvwexpz2hxf6j60dot9wsw1czlw',
                adapterEngineName: 'mhuta9tc1htsrbuy61ah3kmb6oxzmjazj0llwvggq2vchwo9gsyvs1a3vkzxebwlve6rpxq868v25w0fnau83o5l2kpkzl7wtd7quj4gk32mv46ttnnnlwofwfn7kkyk635orah5wqmcmn6zeriybc9v7z74rzdm',
                url: '6sax4n749wsk41a9dqnejsyhc7qi489q5xn8ovtzrcesnk6xwjm8g59lbucqnazdc1r5bmpl6r0iwn01zwr20nr5k3fqt80601hrmq7newcr7ipbf7hj4q2wbw501vn4vudxx9lzr2bisq54h0g4isqd4f0o5d5k5a3ko6c3twp6zj7l8vs46bejb3us7ond2z1p6ipd8eyrsqabyoui2q5hquwh7pdfd3c0bvj861yvqpepi3up7a6xk901c4epmtgx5ad9iuelssjhqox9eqvsdsri1i96ah0rh17bxcj1mofv737p6lqzjds2tiub',
                username: '19r9jcy3qg7h7avzlahl4u83x4x2ijvs41jyvuq8bd4z6dxhpxenxsu7uxhg',
                remoteHost: 'ish5a8l6uue7aev57fdldrluo02dentqm6w9v91wjnscc8hnlvei4tc853h1og52l6t0ssx8ne2nl962a82gvmhqg29u9kok3c3prhsvbfgtmjfzq3znprxl6emk4plartt5lldtzbw77mdemj3yisxjlvtoh0rk',
                remotePort: 3474435298,
                directory: '436lazh8lqcwi7hurx1x61ona43lm4hmqnnr8tn9typji30e8s4zggdxdw9wmv1a990ky6hwfpge0b5qb8dslxs6ebwgo7g57fht4sfhfzi4ht7gy6r1u8wem0ry7m3cdgsze4irydh0jm0jhyz5lp2ygzfzuhiqdyx1x9659u31ahd9vqk3cewyg9y08tsvvl114mdys5z8hrimb9ypqvllwrry38agey2h5mqxz226542b7ke9rvziit3yqz85krgon630ynl1ghwgv19easkj08fx9t8k3wrppvt1ifrtj9dui7b6qpv3001fxx81ef9r41zvwbjy9f9b3xwqs8knpl2pz4nj7q32hsexmz7hnt1kto39mt7yatfn9n6smnpu1c3zb1ods4bc2ztznjpdl4mlzs51d669afmmz40qr7f88red5phv64zwvi7rzq7l832cevt4e0bx24z9aeb0b2eq9npi2x9edq4e8ecy8aq3p3l72xk13bzrzeqylygmrff8ie9sdybb3ze70ydd4i0jm7czps7hf6b85vzujpkg8sjy6lso0tj3zmgqax84lx9n3n6th5qbulbgeszkc266bmdfqu4t6olvkjj30yrd1hkr23ahk617atuyfsydjvln5t7p6i2tvm0l2bji86tb49tw1gxj3ajgu00suj31frcqwqrof5bpk4ke1dghi7awmsfndlcjy2txnz2kww2rr3v2mmf4xj3bz61uwfwqylrbd3akjel4umsjmkb9fzm3ox9teivqboubwz7zlbjwrq8ovuqk2b3l2v05p9ox58i6gl7r95t3ulvkorybattzbf5ism9ye4uz8e7hkz2c8gfxievsaxwrn9jcr1kvfwq493febpbl5zabd9qqe3pv37921f3ml5xac7nos8nr08bcy21fsefb2t2v215vz3z7qknwau12i6uzbsx3or0wlv55k9imxfl99pkukath97typazl1ylxnu7wa5eyuqsbu41mkqdsollg',
                fileSchema: 'xmi2p4pdyj2y8q3ewzwc1ni6ixtkri7ghfpt7fclt2uktnv5rj414vo61rzyxxscr1zpgze6vqqinfabo565sx3q46r0esj44ue0dvitjh6rzatzoxvrt04eowd8d3bp1do1mixl7waipbfsiq3an2471xqknieoxj8283m3fs3v9civuodsg01scztt4uzfc5ym53pifyiabwoj1tc6vlq10529vha8vo0bg8nudr9mxc08ejgyoilivnb78f4oto2vs59fjm8ddyhx74ch3jh21x3fa32tqkr94dzp41am1nsohbf9tukv00lckrxvt69cp5i7ah9zbgyt7wq2m0i977452co084stpu96xos4dp1qrpniw63bkd1xq2ev4rv13k8g90tnm3cew34yd8tkkcw6tvizokmjkxhl21jkaoglortjo9klablrcmwk7c6t435nxa38wc6bid3ehf9efqbjc7wi99tj2fjcyg4ib7u5g0pjggsfxm42vgcn4vmu3sb8z9eroykm6fr9s4kis3eqjvnd9izjamy0aujzifig3ljkfnriz82snvc1af3e6wzze6y1vvnbk9pi6399cpf47gq4w7v1gkhj2jgnnco0i4m5q5hhpelkxeo322ll1vbraqvsz1lgkhm8meom1xao3g7k7l9eif4c2feuwgxt3mv5jp1msb3tk4bonri0ucbtolxh586plsdbljid3x4vi5cjkot0y8omt4rbon5nvz1jizyenbtfjo826wmd2bipp9xcj15ri8bw6kc2hrjtbcdyq1bsvwvoslfofr9afu0klbjbrwa52tk7fx2z8y2vmbs86lty7jv7k2iaqc3rm5afj0kfb3740ybkx56e3nodep13zuvgy31naej7y817kjlgdtd7hzl3pqbj4k72r7i6saq5ixopxkwva71hs3diqi8t0cq3lzkwb9b87h8dbcfgt8qz3iplwqif4oi9yq7oi6qvpt9l1sa37ve3z58j5ot3tzsk4m2g',
                proxyHost: 'pohw5okub9fjksva822t9i8k9xlso3jxvf4h4ktcn69zas1yo99pshidzoffr',
                proxyPort: 8311155593,
                destination: 'ne21os7lc3scq6cyqnm716lsah26ra540xeo23ow23s3v5dlv3zfvny8cbeem53g8gcuxbab18hc9i7nndjwkpcnm5vo9wfufovrd0fws1glgem9gopw3c0nib7qn6xi214ueyipjwed7powohv0yu6acru27qyn',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'cm67s56fbxmq5bp574pf8wymx4wqoxpwsxyikl71kpnkkjljc6h9lag50ri7bo8nyfss9y53myivudf7sjcudehah5rcodaex9a7w1o7lopbwrjmh0lynhfqujbs7wza2b4hzdc2apqwf1bduw4tt05b7gt3zlfe',
                responsibleUserAccountName: 'r8enszmblmk5c39m8s49',
                lastChangeUserAccount: 'ltqd5060lmuzcwytqzkh',
                lastChangedAt: '2020-07-07 11:03:59',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelProxyHost is too large, has a maximum length of 60');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelProxyPort is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: 'f2wa69pft7w9duawtlpn6gk0a3tednc5c22u2dtkpyqhaap9nu9nbsywte1t605zqk082iswgrl9b817l51ius8itu19qcy28jrdf4pwbgel367bw509s4gddzqj0ut6eqjjdpxsb6avkwo6wnemgs1103udffa4',
                component: '9ocowbhk3s5p3jkvza1tb2xgv6wu2t3l6w9a32p625u7aoj1f64gjaipnvk2087pvwxcna0w755qg98efof8xqpto9erq927022e6s4tcb4rycdrfacbmbkw5zk0lf6p9fg1jltmew1cl9qvtjropfznhdkse53x',
                name: 'p7bgafdysrc7w5yt2b56trts1slqdld5mw7jsp55yh1kddy2lquqblquilgs4eyw5vuk9lxb3xxz58wrqnkfjdrwssq3yfdqd49uuzmp8csste0jj9akykc6749i90udnc3kzae5bjgczjybthnpl1mon7dtj4gp',
                flowParty: 'f566q35hf4z4h74bon15jzw0mxra6dtcez6vl8guwtpnnh5mnwj1x6yrccdaqndpid8kijn3i2nekexesxyix37d79e241qhbptin3uft2n98carqwncr20nkacxmgthhrppoof606tbmjpfxfphytdnubhlofh2',
                flowComponent: 'gyzfezmsvt20ehq1p4vf38jalzfvph4afxrskzv6q8209xuu2av7xsz97ynq6ux7vsmup0bs9vltzfgb5mz744i8nx676xnnlr9wbvub3z9lvzz17q7fgx1k7m3uiserldu3n689z1i13ki8fduchmj96xggl03j',
                flowInterfaceName: 'wc25imxid1i9iwxo229d5lwy3ehvxq6n5trnltejrz58nexjbb772omlk1ocatn3lgi3z7x9cv1a78e8qn10m5cgprprbbjyabcbwkllxhjss45tc1d77jfywbvkwc4opoqzndn677onboxmprw6wremp2fgkcok',
                flowInterfaceNamespace: '2m6ia67i4aekreim8bmv4bpfogndtwu75pxby4dfbpzr07hxc1k1sr55y53p215og7ygfsy8taie3eleac0jxwpbnk04g9z3tlidqwmrht9hppitpee8xbvtoiyrefcvss1ag7r4oeoluqmig1n3hho6psr7i4ig',
                adapterType: '5blrrkfd4fl06v9p5ejak8i3pq70ysqa5swuszcivbx6q6efiuln1wbkds3o',
                direction: 'RECEIVER',
                transportProtocol: 'dyim51swgz5loi11ev8tny7u5wd9h7o6b399l4e93djgdq700una6fr1mqju',
                messageProtocol: 'rxj06tprd4u2fyggcvumm3yetvb644xgtrov145vo1t1oz3haqj0sphhw2eb',
                adapterEngineName: '8nk4mimhq0h2qvslgn6fpgyeptk6rrgt43vobcuwlefsdo2rcdu1sz5zcfahbhsf9uuxvr6y3pf9gid0r6afzykpy1lnq92dxf5uosvskp00r0vtk48rvovoxu7xpsqxvsbkmv9bl44kkv0xvz9z9l1bjh69aq9c',
                url: 'vm3kawgg4pcnc74nbi75cf9kx06ka28pmrb790e1dqnf2vd6n95cqtx5b4xdb7zi3auweebrq9nd907sq37mri7ffstjgwxs1ffch0munfdwvemocv0lq76gbmiq4znf21lixwdwqff65go3srpsdjoc0yjeulzvcgdd8atnizwcvnvajn5cj0q42aebm8c2zyazk0f4cdc53edbnhnmmpvfjjeswqh7e4fqad0rv1b82vo315rdblao8dwn0smnjm1ra35roxvekza2ydvpwimoc7o7y9jjptuir1lbhj9kcvnp1h3xrld775ksnedb',
                username: 'g43jf37ib7mxn9in7thytehlpda9lje8pe2qknlsqf31ip3etyclj9yjy9qk',
                remoteHost: '43uh6ryrvmiv68nvk8schgzgi9sqoa105nuzzumd68pw2hewfeg0shkeg3b87s62llxe797adgf7i072cchkitlrwpx4n0hrjs7nuhoj75i8fcina77g12gu7tv95vwl4kbxjsuipdql3foacnu9lgtlr7jfgmv3',
                remotePort: 2134784349,
                directory: '16hzsf7f2vpeefhl195vtzia57wruk9kas4os9ihqtv33q5xjszcf05y24fj59drh55d8v6t4whlj9demklp06r67e3sih71nov4eu158qj508dfbsn8fpdmz6vvcllhgbleqrb4u18he8tqqhad7r751d781t6mdsnzkyb2bi3p5no8i28ynml51eqp6i2knwu9ab1jd28eh59orq3bcv697c7qk9o7mbttx4mm81alt2pw7cq06mncmnr2w133tm7k5qanj127c1q5vsd4d6fqjyqqonrmay4nvorrj3iqyznka5ggakvfenpcm5omju5b63snkt15wu3h4mjcbskgx4mwmx6ghwhbr4dyoaqnfv9lzyh15re4yqv3q6r1nxzq1d4187r1sl4rk6qh83l7s4t1sgy64g281w4fd0ihq3toqvriz5su46kdz40re47amfwgdqvwixj1qbv74qy8uzitmw19yz3el6pmb8mk8fagnox1jj49gqeof8ovdgs7m4382dtorlcmbtj55tz7yzpuxoac57jdwpyp38yq1l4bydw8z884xhsuwyx0t5eu29xzcy1ewrd5jmo3yuigl7d4l4lxmlpbcfmmgxhgz2do41mcap9ajj5afu3vthel6bn2w60zmy4nvu2qq4by6nq9ss86yjimprl0nrfei7vz25nkc420zz9xl7iecdch8mpn8k8hwt44is89mafru9md4pq3o6helxpmav97bpvsn1fltaw25oac3ln1zoj9ako89gyonx4jqku6y0ytogp0xs9jufzm4rbm47wnm6rhjk2lqqc19fvfw25m61tgxj2q40ivdfpnrg9g7681ibodg0bd6ytpyztfm6dcwq6jsv7ntcg5aovx9z1ue988z5pa9chy7gouk4mmmp368nq128mfkagjmmetlu91frzb8zt1m4rs4228wlvkab1i747m37g9hczdk8sp1nis4oyyun8pas76esi1hbhz1nosic0stjwea2stvci7',
                fileSchema: 'lnq35qmifvmwkss8t6k1p00f3e1kcwl3o0o7kpz3p4z5317m48cmks3rqwiejom1jbxogh2tlpuernbjdohhansiy9gyt8e3vv8unzcrk0bqvg2fkq73uw22utrd776hjf70tpget90r6vl5qen6s8dq55yaeq7djdqi02ju6g6mk9p5t8acyuo8hp7nlmq508do3bxl81vrqwgw6je3s6r93lmyog7ksbofy3sjy15gucajm7t4xt7ur4skmq2u382sr57fk88tk24bnx0aimxf5mbf6rvjurnx76oqzosy6zas79n0vefo027ohsy334zcmnrepy6v57na5l9cihzbnycms67an39unq9smkx5v4t4wk0wtm14md3pu2nd2anp00rkgnqj9nw1mc0p1c6uzwhflm7f4xnyhbu5s3j9hhi5qf95j089dh7bf8hs7t5b0q9b6pd4okf71od0gbslzhng89fm26o1vxftpcto1o49k6xjbfos1tw1f3v7wqdm6zbkn5nlt6hncqtt8gkahhj0jlj9iekgf26o1f1e99kr84401hdrr49mk1j5psessasyxuu0ml6uqel3p24lcp6ytgog8er5ub4n9zs9afwk0rq513qvhrcbx2m7sp08btq13ybjwt9mfwlvbc43db7yj8bj8u0177r8vpagccrvzdhy2geu9ahcd1dnwp7nbo91lmichm3uvzyz39gldvx007r50z0p8z1vbepepma2x3nw9yn7wkppvlbet47z4gb9sh7ypewrh8139r3uca67v20eoperu1uh3gldgpbcj82eb66fv7cysulw3etn4yim3yvzlwe9cn06r9398r2t9imne1oktjiqx484pky4ebn2epdz71yvo6q19xjfbempnmp2g4xk0mpoo6lvy711ahigy2ewmb4ognm3taz6v9z3yzlkvzsnf9xk6ottun7clvf5ik4d7d8a51omwgrq9fsaa269ju67wpf9x385uhseat0ukbulf3rx',
                proxyHost: 'xemcq2lhajc1h9q2y9crqhd5ud507r3inauar23nusqj49su7mvot5g7wvyt',
                proxyPort: 30786802337,
                destination: 'y6lkx7ufi9iugkl7hyf2s4rtw4ys91ldkck2swtblohg3unjde8r5omasfsg42ww29t2rog9burncu83ni1f5empzgwgsm2xl4ba5kg6n0nfbhpirhqu1bs7mtbuktf2n1u70h0resckl4c0pd62b1jhuw513re6',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '5a8ga9ku5wfpe6be5a002tn0ghy3ip71kjwimtathqfbm6gi13s1sj064nxyyt7qfqvfg8lawhyiovw0ol8854log65js5mh0nlo114svg5m6zahk8li7n6pkwlxo44hai1ofngpctu9ovffgrkfd7annt58utzm',
                responsibleUserAccountName: 'k66mjbxhsst3rlc278ek',
                lastChangeUserAccount: 'kep6uazw89gdounjgp9v',
                lastChangedAt: '2020-07-07 10:53:23',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelProxyPort is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDestination is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: '6hslmzsq28xfsoan7fryapwvooijl4q5y2i6qj2ey5xri2ehjgwlqplx0ayk5iheo75o6r5vtrt0nwrgn6w4ao375ldlv8ulzh2wbptd1wnwmwf6w920keolqnruo8o75e55srm3zhah6zc48jm7bqf6ox74e5s5',
                component: 's62jpjs7jz3jnfxj5j393i1qm04tpdgx0202pwxoaqxc08oy3yhrpbnqyiu4euh75frgn90eeo8afao9nhet2pgm0j0fcl08m2wy3qxjnej3ktofj16061kzfv94r6hun7divcccebtyrzovg29rkmnfhpvmnks8',
                name: '9igjii8lsymszyz0nqiqe7w9vl9jkrxq55kn4qwr2ss154rmmxa2d9die3i9l2cn3984vf6alambrqzchy5ccriwy7htoupe7owpyhb2c3q86cvkhmd9h75mzmtme78vv1tpyh1jkn4v7r2najpveizghahehfyf',
                flowParty: '9mb1u6snym2d8lwgm7usso1v0y7lin0nn6soyy54613nk3nh9e92e3yv2zkemyqeyg50z34d3ngk87gukr6w5adke298lr2mxafrn5bi7cae92287hx41zyq33az98dnjjt5li8p8ag7ies809x3y94mnqfw4kgf',
                flowComponent: 'knvnm36h6omfkihx24wa7cbl43d9u4ee3792c4e5mfq0rjblyvnwb050mhnq213c6jic1v6o3be1rsas9yh22rovbf1y3bl6g3rri9mfb210plxu2q9wg2axi35xfmrz7z33okia0ngmhxsuvjqgpch7eoj65mbq',
                flowInterfaceName: 'cvvx2hohcfktksjcqjhgrkfuy1asucrer8kq6wk0ayyuwtidt3yvufjh3rgiulcdse41xjgvxpiign0f4b1x8uu1l8lvgf5jrusm081xthmxukguh2p67onjd37zqsvosqei9ecqt95glpuw7t37abj2vx7v2jge',
                flowInterfaceNamespace: 'lbwziwzucbqyiqg0x4t9410dngtj4cynoachui7u3k33di6gq3vyfdxx6nu7y87s8bpwk0ieoj2pv9u5f4iae7gr2u95cagu9sofnwfalwve8u1vta3nkcxmaa7q601f3m0lyt3cvob9h4f6fn9zy0k51pmsnem3',
                adapterType: 'u33o8wfghzm8irphwa4ej6gfgtlvc23826d8tgd9d1w2ixibxkr21autu0a8',
                direction: 'SENDER',
                transportProtocol: 'u4tqsatkx4zxy0mmcmyfz2kh8c0h4l57krqeyxzp1pwsj1xsngegniffzpwo',
                messageProtocol: '5vzhonvwdbi9o6yxw15capb7h50w3oj9dlnso2i9o5pq3reghp62w6y8my83',
                adapterEngineName: 'ewyoduat418k5u8m696yw0gle8g0jgsn3fabbquguo1g8z5hmzz8edwadt0upl521fqpxhg2jfu1pogzrcli0h2y0ugpt70e9q7d6arl06gerax5d2337koxe7583e6u1lqseh2gf0mj91nd3u9ah6aqkplamw24',
                url: 'd2nmwgv8bs0sdov4zp7f0253rxjo4f3n3r32k01gb3k1dh37rsf5mvkl92sa4pdy9lq42gy976la3081ca6vwuzurcy436eogg09ppp0g4430lbsq3qp7fqopfti7l3wq11kx0tsi1p5cza3l79x5cdkvuj0wraxr7gcs9duik1a65k9q41crmhu14q0krx19vwporonqg67b7fdhv3ggq29vryr1ibl62f5qmxhqa6pvr5piuu6zqj6h2965kovzn8aghkulos5rcxjyat42dshhth2j28t33tkbmv9m0v0lwi7nn0m69z53jb27wxd',
                username: '9i8uywuyn6kph7o5avzhwto7vagrvu7co5qsb5n89uoeoib657yz0ge7swf4',
                remoteHost: 'bykl4o7nyo4yr2pyhqgki6bm0rt3r96wvbsgeh0lcxi2dhzkkfr12ztfmobge33itz6hqsthl62ttxt0hopggsxofemcv5woijyv35twskf9t32iqouyzo5adzis2fg87skl9tn8abma2cz6ev25gcb6eol8bwss',
                remotePort: 6400794226,
                directory: 'e1dtjiyqh5jeczutfdefpqr0dirzu01v463b83rwyg7ka0gro1ps8fp34dusnpy2ndvclon8xcy0r3jgmsl1tzssnyft8zijeu9ak8e9fxjjyyzfqziy0uk0iq1vkr30jklwsf5uv5hxqmdhvoy3k9bah77l8k2fv2wbzpb3tf1t86flkx7ntqygpbow1m550bnkwfxd753aghkjl2eha5zclu6bcsnae218fv4yokv8d5liyh39e9d4xqt9w9my7xkigxi077r4xkctsan5u7amzug9xxj8yxeiu9vfc21xlfrk9bwep5dks160ulnlosm3wmd5evjw0xjn7eqcnqiergcrlzibv157qsoae8i0np11tm1ymyfnvtpye1gjy9ksuacwxxex8my4vcwkih8445eremnfqtk1garjgl9wzujrivv9f575g7rzren2hw8n26sp7uqx8pgxbh4wmlwxlubox7a9zow1au1eqkemfzo0njsqkyf506sz4amx0epz5vizjhp8c2w1zbcunkufokpjbl0oxnxn2whhcp1zb5njgm09ws97dwy9gwdbfhierxzhuxmwnupmwe0i0uocvo45oti2xvlc0zro5ou735ngqe9pu8iny15ete95bjtp7k0kl8jjexatc8xmssucj1790tbyha0on7o0jlltqu1t7n0ynzfcnvt4etkaupuqqxl4fh260dtn8zqk0o68qh2ow8uqcrj1fxzl9x6ljruokr2vkgx0mt3t6dgvsfokv37496qer80h5zpte3iexurfvyz1i6j0l6birbe0jb760vmutysuup1du3gmp67dzynbuo6fwqrlcu45k6tzl1gg2god9bq9n2qilsoao9augttvcnodkv633qor8651cwpkjj7crrqac14pgki8d8clwpk8fqpetv743f0yfgottbzkntvoz91v5n3p0vjljue5a2w6tft1vdk32eq1bwx2ayca3roo4ebzjk4q66c783ls54kiibezlcw2',
                fileSchema: '3ovc0ebcgqxcnzjk8eakei37bhbtyko6v8iiqtsm8ztgtfq669opidrk6i09vb4ldfd6uoryn0xzrnkyg820p8f0qu1iv4969g8zztexll3u4i0hxyyusj6x7hkk33gkmx2ojfq3jyscsngqdfql1bm7rertoxraeszxy85bx9f02ulr3bo1rcyxc4bsh7o7aplskqpzvrtjqe632nlwj15qjtxzouq3f0ydwiikq80k4jqs31fv493t61srlqzvz83ccd6l4dgnyg9nvg0e4woatwi1j4d2khksa609k7vprm3wnj15qb5qfnhairkjppfp8e1y9wwybjbfs1oxh0ggt1aqzns21tjkb9hernlyulgvvn05emt7fe3rr8tynkrrloouewic6cnhpm2kdyo83k51t1ad0knhlarhezu5dkuie6yqkgjdh1ortia76jnuj6wipelklttd1u086puy7l8mizf81pgj6j9u9kd5abhzar9cek5xutythvfnsxdoyxta0f21r21gby9wkmda3wxoq0sj3ramzpgo3dnyz8ii8jrz7r45azcrjfwpk6qb6afq2r1d043hailsp5oa0nicr5dmbyycvr36e4mhia11tdx2krijfjt36yxp8gfne5okovqi16belvay86omc37v6lxv3kqnp8hf5345g1q7ayootcu0pos08devez525q4tvd9119eegz0dcu87f4rdwaecs0dqrdi7i3mywlry20i0dustripvsn8l7gbmzvqjelj9vk1bkiuvac4hvxi6waul32eywrjyu0tjlsfdxje5mnjdgzaklm3lw8kfm3gtz1lsxo0trycn079gar9k39d34h3jyxcf1z8pw27hqotwphe8pu4zhnbjaonbjeazaocyfnj4e1wdvryuanu1ss5fkrnrfewt68s1vpzzyisb08vku79g3s5m2t70le5m1vno4jc3fjubmq6bma04j13jt7aaih887uvqee4rkjocege4eh0ovn4x',
                proxyHost: 'pp8vz4nqlyus4yyfix4r8d7g0s2gu4qv7zyczekj8p3nu2doyglqtfnjy1oj',
                proxyPort: 9201340499,
                destination: 'bzgcmzzv8rfmlnxzu9u2chf94bh3uiz6k70q7aq467estt0l09rrui12jitqe88loe3rxbta6nqtss7mwi12hfsjcvvn5rgo3tdj22jbr79f8y1oovowv6aad1m65mncgr4khjt12i5ycg5gxudn7e04n11d1ugfk',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'llvq2yjn9ht8zckuln9bu60edlkzsxkgmc2ymuyc72w24exmkrib2vza9nzcimytxs7g3owjl61zwjxa2b13t19esa30qhifygjr37z0wnq5c5e72uxqil588un6dbq997o3ziikep01eypd2ztia4ax3viy36ov',
                responsibleUserAccountName: 'b5kc66udlxdix28dhwc2',
                lastChangeUserAccount: 'xihkikw9aahpm7jvgbux',
                lastChangedAt: '2020-07-06 21:46:13',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDestination is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSoftwareComponentName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: 'jsfd78qw1edz3ln27zh5ivm8hwiy9omqp40519t1xy35brasrotclmaxzgfhicy02zevrm45glmzj6f47z1mebaoj8przp8wfod0sw4cvhvcd9spk0s1lvcd2tifou7vobx6xtmd5v1l0no512uwwwgz9pjcscuz',
                component: 'vjdb5ai70sgrintnlb09g2o9hd4hnlswvxcbxd2z6waqhi9kpy8i92rszs87b4m0so6k2csnqsjek3w03kxhus7f57n504wn5sebnf5l5ixw7nux04444li1aphaici63u3xyti2grdr72qrk4f1dnugre9wbip5',
                name: 'dp8ls7wka5hxmtrfuwd7g54pz97h82id7n8yldt94tobinsejf8j2kyhtcu2hhgyfxfxi5tnau5ty9bpvjfk9h83d3sr5t92tw0ff6bpv8avq300xrybx77bniiq85gwisdg1q4v23nvov06wvkjz1tntfryh9aw',
                flowParty: 'iy8meldw9cz6c2jtvogoshg8zvgwsofc7u26sett7uslbjfj2hjn136vl205avhftxkxa4m9pm6214uifrzp74o4kcux9m6zn82spq7qpatihun24nny3m3w0e6hwhdb1a3xasa6eyu0c7vjj4rfh086ozzcf0op',
                flowComponent: 'sjtoj7l3co0o61xwxsg8vn3mipfp3zu4hgf7xge0lxz63b5ft0awhowd4z4uk3tnb3dj1d251zdv5xgjrrqmfv49c4tgyhk1hjku1fctgd2hqrm6lleglu3fv5a4hl8b8gdggfhd3srxi9gcezk4gwpa8mmq3ss8',
                flowInterfaceName: 'd618lkknd52ki2rufjkrfcg55w0qebt4xceh13mirq4642le1sez3zdi004ct8k6blkpsk1q1dowgg9ratbpebj77m4dusj1nryhrnhir2mur8rg3aew4ci0upuck58pijg1vlvzt1741ut5pfqsmj0chnlrio78',
                flowInterfaceNamespace: '7kyythcf1l0l3daplj92wr1peoig0qn55y39mshm0a99rfnie9gherh41wrlhgsar1ngyo44prj62uazk0g814psqfbpl6lmupme4889z1014p31qhplu90nz4via5qznzvwy1dbiazd2iqixgl380gx1pzasyb4',
                adapterType: '90lkciwdvw46rnldpc8cvz1wg6uzo1eecgqauj8zjr9ij7d5ugsmm3jv852y',
                direction: 'SENDER',
                transportProtocol: 'fxar8qbc4whd3y2kxnrkgqx6cqbvlveqcfianadil9qpe0qgf7h9se727i3p',
                messageProtocol: 'cbsr8b92k28fs6b50casssv71ezpm1smc91mqep2cjred44ysi5mgnz93v6f',
                adapterEngineName: 'w0fsqo79bizdpjzlk4t33ep7uq7vg1mf2vfg0trp83ze23pea87jmd3r3u0o4ovp2uu58pbaqozyo36rf6un60umhylbsnonvdefu4xq9hvvogwopmtwq83oplrgl4zhlcnp4jlrw7qy633kxzen6ss6g408avuo',
                url: '0wffp4rycshashunj5t8tpxkcypxck9rn0c7p6ta1tdbnxxdb84hb27eq1iuxeh35h8v80z5hlxyjykr8xhgdaobbfcvrl9jrfyvi2o1y3rspew3n3h0sbqqdh5zj6e4gbxaifi0vxrf1uszzcbzea1wgzeuyfud7hmutzczd3s80s7ut9mbl76qekq311dcfjpma553gp3o5r8j7uccqy3e642ga72ud20xyfqz3dg4wytcvcyjdy5v87vj2uo3kvdk923g7wv7i1l9twy6w9mw2l2st997xs80nr1b42ymsloukllqk86azvr4etyt',
                username: '0qw16m3cvof2qzu1cwc5650663aorl5kb4mder1cat3q91toelssf2e26ndy',
                remoteHost: '6d60trh2d174e4l9jgd219ppxodm6q8p0o3pl4034fy7xrxx6vrnz9yfnh2o93ua03r153hwnym3qxaiq8jn38p7y2nilqupdaswzsj0ilb5dqzoke59fi9b19azomq2oax4qxfw6no64aeja23cxw8z0qq79t39',
                remotePort: 3596177839,
                directory: 'hnia6ppa31t4ym1jke4ybdbly92991oxoicvbdcnpm8nlrrmpynmpxa4yh5xukgotwdtotko0res64exa9ps7fv11ve9jkejzu7xdqyyp5bmv4kc0c49nbexjfnxxnq2h68akh80hxvsbhkwu4uetg46w4d8fj1m9aywevczp7d19x6np6d2wk8e8i3vkogjp3wo2ab0wtkp5kf3atvmkcb1clla9a4op1cni3v849ccegivitz7ljevoqarayy7o2ou4k9ufesqfihdrs1l6bjx3as0y58q3k8t2y93hc7qm58ix1vmkxum7rphktffsbbmk4xj16b5j3gx9reqlv0c9fr99e5f7exhqmchnxoxj9yf8vg09x3mu97t4npzey65d9k05z6tkdpfoj624noq25rou0qyf9cqf2lpsod6vfu4z2zfgw00y25hefarqhgwzw9d9apk0jjd15x84e8rbjtwdrajpfszu9pr3ps0g38yt82eektqnlqx4pfd97k7x8oobbhakud2krxiedo7b7cnyh5gqvamxom72kxnfdxpj5ibzge5en1takmb13e110v3srzw3okya4oq3pzrokyzwzga52l43ufplo7lxdbnhc0a4ko2d26xh3ulc6koxirtd97k7jbg3d1i77oyv9oib0y0e17hrkns0he4lbug3n2qzy7n5tn5ad65zdlvo64mpvt1td4o17xcxnkbvx296t0zkpwzp3o2kbb300nv22ur3ngfvdt4i04qaccpvd2cxurdry9gld2ka9strcr2o4ye58ls1jnxf2c6rirswhv4uqk0y4b4mhbmo0b12p18vj63vmtto2chi3os2lfa6yf3ou5bpxaalj2dovyjbwi6xfg97jnw5ypgj9rf10jlvlq7u0qf9hptgnj5wztghqojlo86df536o8t30kgs0k1b12jw9slp6g7q5hkd3v16wq00ddfni4ek2dt068192gjqtz56a1hfjoq1qvdt6hzqmy0u8dfzxzx',
                fileSchema: 'gocv32m5zwo8ayd9aqneh1jpelkmfrf24to8wl4llra3f2hko5fmyowucxn30kdh36998av962lh30w5ncvtxiqx7ze8r43qsqczezla84et8ban3zx9eyer5lm31fxwlo3f531j3t8f4qgh0ibcxea0pxwro2bqgkgdyd2qpv5dqpyed12db1n52syuqjqs0p275ywr1y2u4zc4bvo2rws6ted6rjfbiujuc5qzpoq6qd0ap24sqpu9jbqhlsen76ykfvxkyh3u70am1w9qv4ek9hljtmkz09qcyiy8f2bdvi15us66g1mimw02ku4qrkogc84s759ah6qgat70y3gvqugp14l8xz3qefrnflv7jcesqeqbjp3re2ho0p39f1gb2mydl6mw2t373jqy0n2mm5s8ih3xvttah4fobeiul9h5cm7s25wc5024vbxs6ehqmwl22qyp0a0idd4a4l9hg8hzx18ri53b0fuuqsk1nnbe8j5d9fx6frm7tiyejdsvnfl0gekusq8pdgop5p1mtq1z5e754i8haqxzs3yniqzyuw36zgb8mev8zcyn51zsu9ojo2aed4whlr1i9vq8on01eak0iyfrrujmmxzig5vihw935vz3e5zjoodl5ea9mzu6g6u615ieqczpwqbct903ertoefw3z0frp67guhv2zvfneujtzv843r1u7ynrzpnzrmhfsu2f9k4dvd3wbr8unbzdcjp4pu2qhbzi7gipzc7z05kc648ppm0iyt76w37a657ftq9n6blszql53gurbuvf5a6g7c5u0h5h3wbn8d4fhd8vqshe16j1b4qdr21ta6rx176plzbgffdcjd5ijb4l785bk68f2twna9jpheo4d257w77y05ld539j5172xt842pjx2ch8pcob2cwxhiunf28jn7ee3zv1fjkq9fqqseju26w9ynm9k4gurarn3y63das68lq7kgdgtd752bswrpsdx6rw1suv3qzjpgjfcd4oezytjz5h',
                proxyHost: 'vszzfriwii5ellk849rd7tx8jh77w44k3z24uhszzc7dzdj5nbuu7ys6r6ne',
                proxyPort: 6813094174,
                destination: 'fob429jjuekajieu8hp251pinejuj6worgy3ebkp2b1dx3bpktm471ycp2v3jn804z0azn3qnh1amq933rvqz9ekhdkosrtx9p7to6bmzna7yejsf0sbi5ar3vqxmx68hklvxtzd8kf14ysw6vgjfeqp0rgcmrea',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'rgssdwm3x46hz9xvz66f5dowqsjqjozw3im3cqx5z3wpgn80hkn5wkkqbeityql67p8frhgh9iednjxw8bxxmxbb3ciq5ys5qy6ae57hsmj3yamits2jt8xp0hjiqfw91zwvik5ofaenaqlqkun6kb520y7zaguxz',
                responsibleUserAccountName: 'sg0z53qc19zd60z4isoe',
                lastChangeUserAccount: 'khtrrevtfp0hqo6h8imy',
                lastChangedAt: '2020-07-07 03:05:50',
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
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: '4t5ezom0zji32txk408hxnqwclr558vqg8m96fi47282fdhad3pvphchonyyergjqkut4jy574q179t8e1mrtiaype7barbummr46l6rnzpgxskehi2nvucd7ooiiepo8uqx4612t47hijpa5vnhuxrt50hplomh',
                component: 'm6oycvy5ynjzo4o63i4yjrjv9onk6e1uevfuzh06qb7ej2oans2nidk5tnk71vdjdvd88t85x5i3i8n89smw7sugewsmyue0fx9bf745cn89oejrdr5ypeo116w2c7us6vrs5np7llpblc5cizv3k5pxeb25hsev',
                name: 'n35rloqflgsi3rqw9uwu72wouolggrp9efu80hksmhk4jkttdkcz7kcyc7pj0v8tvyu7l9vlw0n2n2p54k1c96v2kpl7ph14ofrv9sgr7xvkzknzyjou45zv15ljjlch7hswxrznst1pdxw3hwdsc06235l6by84',
                flowParty: '2kjp6btp8qdpqxjhso1jl6qtehx78s7eof9g3j7kmhhicxv34otl260kjuzbr59ia24yr839qf8yhnk34zttyqdl1avi044ut7wrpjxniju4fjj7q89r7yuyi3qzzpqhvp8njf89ojyc0uh5e6b5iizfo3bcn8ut',
                flowComponent: '1b4qxq7i1hqnyrf7f9b8glkt09x4zt0yrfi84ipc8sp1o6dmlrsp297gxzmzlca4nt1lejpoi3dz2mx944yks8ml1yw05347tbbsfahuae1merdige5aqr8b8hx8qo76fcp4er6hylcmh3f7h36nmirb6mrvcq2f',
                flowInterfaceName: 'i3c0u8jglc4qkvsvzqaujhk36i637k95g072hvxqydnr3l2b8921sgnfwxsnug2xmo93lrrg860ftsfd7b1o6ty8ky2km7kjuylhdrabfgmtf5ddfj11t6buzo3siowbke77xfwsvmh4rjmuiyc94gifp6kqu4l6',
                flowInterfaceNamespace: '4i3grzye4riz0f4l7jni9uq3fyb31mgjg9llopuet29qd7fyo0suqbp6jbbsltdhhuonydhmjjlua8wczmjvw077z5ncpm39cp3g0qkh3dd1afnnhntz98tqmno452qemzehpv5ht3dztf0bkv5zm5d4r2c1l5md',
                adapterType: 'iov138pn472fzuwuwtifdjnqhw843l33ou9yg3bnuok71pma7dqzt6qt506f',
                direction: 'RECEIVER',
                transportProtocol: 'i74xtz4qsfcchrml1x2ihvvdsm8aggbrzibitggvbwuzvr89nv0c68auibze',
                messageProtocol: '4i4qaanp0ss3wt6y0wifk8xdwm165ladnlupqn0wnf07660af7q9rls7wg2f',
                adapterEngineName: 'a505a7cnrkmjy1g29kx0ijcbfn25idlvfjghv4z2cefv1tkna41suqk4lem0oageaohxyx9vfa5bmpxukffsaipexo2h5o2dn2w8set5j1huvseur2otmseya2dptsz3uygaeul1ke9ksstj1mg4sj2ws1k4c4th',
                url: '5e05ejldiv73t69vkund43sbg8nfdf1qgsaynje88sz4fsjadz6cl03q700dr6kvfwl0dudgrbbgxwcpj31fip3d8wrw2dp7ene0sel570xzb2pqzeg8mcak45c8yu4lz95wwfumx5mge69f0cms3gco2xmo4xwmjb8x6bdc60z45ititzv54gav8pbpxmhu206inr81yfmxmdcwj060dv8m944q7ncqvlf4zphpqftmzt37f0k1b96xg25yiaens8zin7utli1lu86o6lummdoca70cclgf97i8ohcia4jqd1qds88ktnz6yfeuuyeb',
                username: 'o0nf6dvxrzh8t1ug71asx8u7mu87a1airwxz3c6b7imt98m0n8w7ddtf0clc',
                remoteHost: 'gi131zgj4fxk67l6k8pxqdr28fndmep089yq71zwjx2tbkzxf9nn6g7e37ilccib0snl2s9fpvg4bk1lopjh79ea95v9m4vfq62opgzp24wuaxgfmtt8jt22u9h7vma2zhwsh9jrszu7y7uh9z89fqpk5rhk9poq',
                remotePort: 2244609948,
                directory: 'lmx7sx1jcts8dlhxtiyjdworzftqswdar2y7enchehdjalovkmzjym6xymdmwz1l7nmuba2orjr6mad4r4n4cggr6psq6xt1hglmgqy0srrnnc18gdxp317fh5rj5hy48pmguhu3q91rkpn6cerdxuq86dkl2mgeyt8iqojqlg1lo6n9k2mj6ml8b5i637a7dacec2k1gemlzkjkt3kqitvvby2g5narv71bpptkl281cfwxm7sntjlmr1fvf2728npyep1p8du48vnm1q212ep713oa4himaxua7o20y09kxhwia4gqo105i4g6i3a2ixxfqifadcalt41wdvd32ds8v5toee5t92tio0y5zgelf21gdgoukidm8h43vll6ye02sc2v8i01rsy5ishg8jk64n7g96q1r0z2658fty229b2tazcasr9inn1s5tuxpszlkq3mcy7ni23tpy77mxttywlibce1pq2k2dgskf481cuz30ytxmhzuxjp43o2brqb1c5mqj3ej8e9nyqdjn2deb4m6dtktxx96jkofjcum8apqdo5hj9yoy3aqdomkycj6bx0j2g0xvglxwg5hg2qr30xdnyfpvewac07kz6ocynh899u1vsfgups3iwho4k1vli57zwig27rvg4itijbkdqnz1vvmgnlrwrurp6kgfwvbzk2bu5kf31fsml583li5hbsk3atmhcdrwdnzqesifgox301z66ilvuym5dkx8mary20nokjpuhv275ak0olfotw1noboi92uknm5lpewk8xy8r9p1rvh5oqd7tvfc3mczma1f98hv2kz7zyuji6aflecwk9xciavikpqmrt7t0bmtn718u3lyesgk3wnq046yw58ggi18dv3ryy3e6ayphrfw4r1m9jdpmzmdps00i5oqppsmt43dtkifm9vq4w60hg0rkumqi23ry0ngea10j77h7rpw9l9on53ur8wm06o5f3m8rwbvkquuqx0kxvr1q3s23lmurvame5',
                fileSchema: '5pzkmhow7iihlcklghzajt36opzegagc0haq36kbkdyke62vgb74ercb19z6h3itnq1keyvipxylxkh7s4n5ojhc6qusonb3f8uu7dil9z1tv9jgntsp97tkgifl8d2g0rds7kys5aj9pwx7y8za8nebmbhc4otsp80254n2doeg60ijpcska6cafulwjag4tbdn7lqz019xr6siqcn9wzvybmyv4anb1qyqdxriteztp2x2n8t5od4djnzmvfce4s4l2kfx6ew6426avhla74ip48tv8ie6s9jyowssfdebxjfyt6tg08mtzzuinceybyqzyezbwtxtm8un4vygfeuqemgc6dpv4nd74fyqlhbr5ep14pwikg25a32dacekclor7bxu3fhd4gxp66mxze3xjynsz69onhkq7ieet83rb2cgvmsm8qj8185jj778cdidpv0ovo34k32rlhijrvkuifgfc8gswqqvasxosfrbi4oxjv007ey5wbquqqbcoav12ic8sa62tqvrc13ukpelkc8qrp9zfuqpp5h5n0bod19axrcxt83vogv2msp33svqnfmugadrd90itpzwiinho4bqfdjdxos6n2uy5anrb5gmi3ptzf4istwf6ng9xbj88jp8ytnvemftol4e733n6pkqhsxhf3ms2kfs00ykfstjajvpj3c4wbi8aeoeg6f5zfd8qq7z7ubqbejjfii6mtjgd2qb1xmhm9rpsajbmus518e9o6w2kc16yh7tmo4i6kv3djqgwu7sh35u219rbccv7ejtrgpbtwwv78omz7s0w8r68vvx1a5da5dj2jq5z2shdeodfsl1n4lzynnxu4d25fbtmqte74zod30rz2seti0urg6frb7y24g34pfowlqmxpv3o8kep7lz0061lbov0ti36oxb4fjj0j2hnxp4y0j2dsfbekchmf927x276rzvm8sgfv0alg71ui6nhlqh24flhplrqi4r9ikt1eevwv4ftjc3p9rbsec1',
                proxyHost: 'ack77a6zh06je5tksivumw7j3jhon3yc3qvwsamlhviwu9w76flyujzybv3o',
                proxyPort: 8821298099,
                destination: 'vzqwzig6rpg5fydobrdhfbd1om3kp6jisl14ryf0t9f7fs5mswf79htcy346lai5g24h58gt0pg2wi3it0ufbt3j873p5oel97qnr4nfj80d06a44z7udqtg4zzknoph0fq8irg8ppr5p9ur3n8v9ogbho8ps1lj',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 't81l50dr1h32tkljucx4dbejskzehvcow0hbh90l7r4v3q7jivsd5fkt2f3wj6ymb4cj4uqt94pcuym1eas1c62zrjp6qnzxnsd5quyhkw6rk1q76o13l4fibo4xrc7v60opm3ibhausy3in1qmm7zufaxs77t8s',
                responsibleUserAccountName: 'zyhu5p4gltqe2ep16v82u',
                lastChangeUserAccount: 'rm1ie48farbqegx63pxy',
                lastChangedAt: '2020-07-06 14:28:06',
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
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: '6i8jcoa3dt9pqkiy5jh4dbisks46scup76rbbqpokimdn8h1z6o7tlek56sv6o1rrnsmyj5whu368pget66m4p9qoxz66o53hjjyxhujiz3shidsyuuf0fgakcl4wvaxz2nhhnnulwpurd657xznid3015h0taku',
                component: 'zwn9h2xu79xrzaio22tlferl27m908swf7ioo6s520qz0itbdrugh1ijl584fmuvehcrquduru6asyaloy71f9r8dz9sowubebvjlmfsx64hbxthqj6ktyq21mkok34v38icpf1wbrgjo0lpu7ghhr5k6e6pmj63',
                name: 'o6l6b6rzgpgjy4irp9ngq4d6eaktgshwidxvzkcva0rmefhn04rjerzpt2wukj3pcmy7t05d84cw8an8tk1hava6ryg9mzabfv15qnkku7x7w93lm9sc5fjrmxltvtwfbbiwxlmi19gnl6c9b1i4a1xyovi76zkv',
                flowParty: 'b07n4gvvtn4bla5347a9tlbxs4rurh37rjwc5t6kqta8j04zwc7c81fvd7ylbcmjocfa3q4ppum3p5smoz3i500e1iw2zx8j01wzaggiqtnd42oqaeszaw5xaw1a089gj8j5kayb4zzn74wulrgcee5bw8ayuldh',
                flowComponent: 'am0wqcxollbhdnge4i8sr4b1h448nb9cg0i2yaekabeyl6y76mc2bva9y46313q5wwwrscldlpvx0zmzn6hk8hvzn5dag04whq7vgxd3bimivsguediv1euzzw3ob9x41voxxsaihc8hhoxlydd4gi383qs8qc3r',
                flowInterfaceName: 'y1ks5pwam0k54hxvey6cnrr8jmtk0v270x7wexqugielw0wtrqeecnxmmn3iui8btsj0e05bw5695e3cixyit3gnabyw0v8wq7hnldai60t90ktd8jawu613c3art4zn5r4tl05dm935lonmrqlp7rvw72tokiji',
                flowInterfaceNamespace: '8dtgldpzkxk1z0d5bveomyqky8w9ag5dw50dwh57e371x2rwuatboof33bkbz9jwu6h5phqe70wpk4j1o57nj73rv1w5sgs5q5vq3bxyz3b62aqjzo0uver1ubipfkawxnbqagkgvwo0hsnp7ba7ajyjy78xxw40',
                adapterType: 'loj4cdc7fbhog14hicxnpzt5momq02r7y26kmslnkrhz1se5hl7o90r41qx4',
                direction: 'RECEIVER',
                transportProtocol: 'vpogtetj9utlthbvzboj6xz8elodek7kego84w2p05mu39dizz0fwkpgepba',
                messageProtocol: 'j7lk9rv8796rp4ep5i2u3krvwfonkcp8dbg6slimsxtwsmzpdfj0ws0kalhj',
                adapterEngineName: 'h7ka3imdkcjooe3co36cnugcggf1l4qj9auenp3elqaw1f2q29s4x98orhqtzevfyvqh6hf7mppsu4aewp71kro0hpxoy9i4ub65ys5he30d7yczsl6nfkxh5zggjs50i4cc36i4niw7g9g7051vuaczw5t1hgct',
                url: 'ws3qxvbg1ae886tvfrx1e8hp1j620d7c1n1d4ug00mbhor2sz2fa4qubv6ezmzfz5kr8167pqdmghemyrb66c9101piqqv6qx7z0i6tzom8w6hjbnjkasgasriftjc13vmma61dnxweq5140itjtkaup1f21u2odusssco766lpu2w3man4k500bcgbq06kzktt8qr8o41eqosr23eg3i4d063xx9j8x47flhmuh6r1cm0we8gcceoedqbdp9ssjnxz40yrqi3tow03rqh5g8y7wmrp5ulpco8bs7fis8utg2ellw7ace9oexv1u7wzt',
                username: '51ds2vwe3j8t4ctpcfsgsukdvlv6rjvwltpl3fll5181d6fj75hqaiajye0q',
                remoteHost: 'w6t9v1loduz4az5m81vpfcwk0i4jwgj7djggtnvfgfa1i3lxq10gw47flzra3t8b0xh9r5wlcko2bufclbtl0ypa32dwqwltjby7ledmr75ip8dcd3mjhqhfj2dmulvrgekezv76tbtg5m02k537siccwmfsnrgy',
                remotePort: 6156794295,
                directory: 'nlss5j8ebot8lqmpinwylme8401fftf3t5kknkoccffiikecwfi5cyecc4787c4xx26srh8qsbjbth5bucyb9x4at2d9jdvy1tbvt6pxz4225d4ivz1kh2p7pied4217vk2jl7vpfw35o4xcohg1nrk1sahw2igryjqwn0dgmum7duqt07ys13ceo7uskik7aw9mk96nzlc1t3sf5zbsrsuqc7dcpzy5c683vpuaa00moe74x4fh8pzdren549k0r18h6woehbj8vq0osairrdmcbpo9l9jp2bbegokfs8ryoug49p2n6en1j6rt34c5lu9ebw9sw0u3ptfrrabkjj8grqzhp8um8s6n15fhqxgh1mytrbiczjgn3jkr70nkp61jspftb7m4zhsbjam7awvk5y2qq4hub7tyeft9ysyaokzaped034vrzsa25cudi846qo7q06gxja1jtyprpppq4gamo2c97zi5v38vpzdcjyk444ath14m29l7rfwxbtgvahpcb0hwafghpo9h532xctlzc0mwui5przk2iss7lr6784axhzfyc7yf95zixzqwxp9wp0iu2dgwor4dty5zmv5ycxnw1ofd14vasg0p2zaxkoqmt6widtg7fvmnpkxbagwguksf6waw7i6wloyfeq902m65g8bbmn3axvin1wnv7m4hzdzdeynzihczjfx1v5jj7tptl3aycl1vpxe513aufjuud5pt9a3ssxkmfch7jh4d1i5ey96cuc5efyo91ukir37ijm5ju4qc41yfcfss8nkofqd9p2kcjoc0e1jh5d3qesnb5rqxl6zdlm9lhz38buaz9j0zw7c79b6szid2gwp57z0ceyjwdtwug015vftfh2ok54963a20w4cnj03gxuseqx8u51kvg0rxt14szuekgyo54upvo04he1gee38r1i2t5onnj8xfg5u63o3ys6kfby9la670i8itf4mxpnbcc03j2yeq8vmnrqu66qkym8ojs4py8scq',
                fileSchema: 'bz107f4fkrwtg1d6l211p4xe1j7fieghf11r4hz02izqnyx5jv3rk5vqf3ces2hy3ndahck5hzo6ku9rbwfcg3ia4dzw2jbkqpi5508sxjsq0zl342nrd1vb0f651wlq1z597m20fooizfvd6qwdg3hu2oy6eswh5a8osagkrok5dcbjm6u859ohok0nsk9gsmm7r4xadhgdblctobonx6mkaiqcgiwu2fmc84pgv7ja9059r3xtkk5z2dk6edqj6wh5ztovolpehaxoyf500khar5xs1am1807nw3x02bxiupvfbkhtk719t4j6wijhxrh2usx2xc6o9didfo4u5g02jd9vy9hczui2o9a5m4czcsop2rcpjchzgjzs8hfqy1fps2gsy9qhaw57lx1qasp7gu9bp8h6dl9q50jedeufv5nlorrmi3ewlvligqljnzjdvrdcsigfsczm1xa3k274m0fththcxm4e10ijiahho39b8gziy7meltu0kav7ctcw5ofa6gisxg4sljttea6sal8gc01xo9xhgu14m8z5n8rtg5vzzd930nw9zozna2lsxfytok26l8k1ck1zw21semq0uywys7wtbztkq0odfo2yyui3way7yagby0x0lxekdi54iebkz2nkce6o1u76uvtg4f0vn8adalgc9w6jp00dpmc19mft5t92cb71dgsfsgyhvvtcqv40jzszx6wv1ug04lg0440pzk5vuaj3uwmc10eytoz403d8zdu0q556l6hvkxfaikeh1f021zrclu79gb0axmnvhos2s2oq4oarfdnjzysvar7jvdx43sl2igu4jqu78vhyqfekx1j8c5z8kr877hxje86q1hba4ehkeztldajvwnbvnnjdx0jjhnblsawz96a68sznf70rt58ilgnc9rrqgr1rhp4d7sdaoagzx04py64e4h8fdzlslykw4ehevto5one7kkgs6dmfgnernuvru4xaqtuhu5cbq0suy68sfp8xnx7l',
                proxyHost: 'vmlq43xh54fsh9hdyg5e8mwcuowcl1a5q3hvsbsmq1bka83nxd6u6tmuxwon',
                proxyPort: 3718562449,
                destination: 'gnjgb0dpqn4xsisha8x4mlabko5vwukoe1e3vmlnhigq7lz18jrg5ys9nz3o0m3n0u5n9v7mdyatipp45u7k9aq028or1puxlk2btombpz4ec8xnrxnntaex9ivj54brsdgetl5qxsgipu5hxdhl29bh5w101knh',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ai7xyf7w4o2ho1g5sexhobgsk0ui6etvv5k799iiejdbngtcxjz4wipi1zmmwd5vex6clfgnif1mmu8p4tw9wu8cxzgjkia4my59cd7p1ranxqvi875jbesqg0pmxwsfxa65y7a3btu665vw46bhw9bw1bupwd2m',
                responsibleUserAccountName: 'b3q1b4usyzqb1k0hyxix',
                lastChangeUserAccount: 'dftqrl5y1l9wsimbejl4g',
                lastChangedAt: '2020-07-06 21:43:57',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelLastChangeUserAccount is too large, has a maximum length of 20');
            });
    });
    

    

    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelRemotePort has to be a integer value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: 'qdwoua273c21af77h8zt3u7uregl2m95oq8ga7l9ud8owp0jyyxcyw0su62tj6hhrue1iz4ojdczo62w0hyqaoquzx1z7kz9na40gec97lc323b8dagkkrboaxnb679ddvi2tpnhwlvyz2xa20saevg2auqbz88p',
                component: '7zn0dcn41fuj4xr95s5xwl2oe7cqyxmvmpbxk14ic1wh5bzm4jxl3zz1v7kui7d0hhjmyk61qcivkzw1blu6biuzhfecb4g8czeecc5hp92i9pfmckgut2g7jskk83bbmgl4tx9ckyzkx5kk5iewgjsenv3zggfc',
                name: 's397app23q7ftoh3rfdqltzj5xwvhkbvmp23q6etukjtpfzq8v21j9jdw8k7b1bw0ghrq1b2ra39bvte18g467wyoergpwkjpp12yd3zh8mfcfol7e00pzty48i94qzxyc4xlcuqsbtl6owyk4t5yp6300pshjq1',
                flowParty: 'mtk3hyrn4fjjwyrzlpchzidd6mz9yorlw6wtbl8u9156itzapi1segp4kpi56mlcxso32c13j88o6z9hrr0l0mzh4chcznqxlt3rnrsbcgut9rtfmbnqmvuhnvzztnni6kqsrqx3i0xsnc0va3z4v0r0iiogldkk',
                flowComponent: '8pjfm6o19n6t4ghnb08ilx48dyae2xa3ypy0z0f9tu2fm76r1lsjmbyf6ixmgx71fx76hcohijggl0ur59r9tsvs2l236n3mcblp89jj4b1jyej1szza9hep0yo60z9p93qhpf2pxru2dd47le6zqcp8syflqocp',
                flowInterfaceName: 'dpnvkbu2zesett3tdzvexcjw3vs6j9m6a95ohodywvrfgx8x1ym7daquc3ifi3l8e6i4u3h2obcsc2tklgujtvazv8ylcdw51qrskn2861bq1nxnpl4ggwyle60srtjhxv7e4x7fkwgrwgs4z6f4fevitl4hzfrx',
                flowInterfaceNamespace: '0lmy1dkqqlze8ybvtjif71h5180r7ne3dig00a8z1xmd5rl6mnphihowzhgg106lymozcjy13ds5qjtu7ca823m5m37ygwv2z3vrsbunl0nk62y2ksalo05jfr6kh9dn8kqxab7zdxxv24q6l5ef72bifor6chqn',
                adapterType: 'f3y8tjqtes8nlqlinmla46ilomcqk0ruk1ymll0f6wvwgkcydqkvme6tje0k',
                direction: 'SENDER',
                transportProtocol: 'arse9bfht1poze0ua5jd93hsqxucrq431e1ug79naigp8ag8seehm938t744',
                messageProtocol: 's9tsghgmk1vyhrtzyi9l3mloj44fbe0cb91tt82wuliw7uvngi48561t5i0z',
                adapterEngineName: '7wo63xt9w6dynygu4za0vasma0rpzy3x96xu9d75qm7grolujgvwuwwdq12wv1kz9gi8m67kd0cdai61lke45glavfa0x4dqc9kprcg0qvtl6wftb0a816k6ysxv3lto9j8sch78t2jlzw7adguo1z76k4p50smp',
                url: 'px0tqufaq01sc9oa9v2zdwya0tl5s474q1smf6zemc224lcbzy2bhdmqzfqplmorcqnfef9us07e2xm6pjbycyun9eft645zd81hsee2va16zlwig1dyfshc0cxfc002hpzf3mhw21wynqy5bvatw1yklmp2wzv5xx448uevwieavy7qkich8woph1r2hqyc45uzh3tdpn9ik26njjc2ard2bjxo1xxthl9ctnaub554aknwx3tg5bycpx1cr3s3vx9910yflv0k4jn58oei1sg1yquvznypnkjciqggb94eiqlxhte8ri37tdobr3a2',
                username: '424dqbpt2iac1m2evsvzz0nzfk6x1dtiq6l65q2w79v4siixr33j4b9lmxo5',
                remoteHost: 'l7uqikdur4f9c1sno20skz56cruxnb5vg4jg8nq5py19wabx5j44lot8cmks23u9q4zjanwa9m26lq3x91wy5gnyip6der3cizcwt2k76k37s1o4br5ludqhtq1bc1w8a724shytl4weonxjeigcgxt51tjxa0bz',
                remotePort: 100.10,
                directory: 'oyh4jutduyymmll7umcr8asy1fdyvv9teyrq56k3vjbtlq5xci8l08oe1qa8tyk8y39etx3wu0t8hmrmaz6hqkxjzddcfz4cv1gg2t2gty6fr0ng1u07hbj0fxm3d6hfsx3kdyfmtuyhk5daqzlrspkvz3eakm2p7hh421c3nnmepl4v1wnuy3i9n9c7ygf47rsljcyoxlihgo15dzgd339dsvr67j81mfkr5nwlvl25re2rw8cy8i1ak3breymzxl8b9den236g066vb1arhf7i059s6ggrc2d0uzpyp7oztl6j9scnunnwct465ep71xi953qr4yjh0ju4qr63kl1ug2jdy2nux666j4s8lwxkcsuyxr27sow50m7aja8b6636eh35wviz0s43gdrspdx08hv1594jhea2ghur0enor4jyc6mha56wot6sefvucecyszdkgllkjjnggcx0q4biivelihuguw6spfywh1rsr0mi7dq8j21rg3cbb8ij8y521eto4zl524oh6fzl40ea8o4vcv091hsfh2kdv579n8h7doh6uxhedj949ghjxkajlechvlza8geatvfq8tm0p4kqaz6fcyvfdoxg9cys9cug8grip81jd0csif6pp0c0y58guy5l2r49dgxqr3gtxwdkymgli37iwrrrmzb2r1jo1ofcamb2bkl4bs986d5arxg4hifohjwb6y880c801b8lzn6jdv8764prei1zfa1dy1xete8zwwf46cskir24ueqpsbffe67brnsho2q98gp0wvyrj4ivns2ico5soew8e3ff2lqmx3lvbqul6zrt76nzscmf920wyyh2pvu645v55wpgbtd6kq6002ht54djevzl1izs0x2kp5pmmvtmy3fm3jllvj1lhk2r8lg98bofgrl2zy3gwuork51b3avw6r0uvomogqwjqr8a69d831nsrbf0k7vc5hw06x4vje38gmfrg6qszhmvbatachz0i478en4gazlr90pc',
                fileSchema: 'yw4jnfgrrta3iwxi28yf9hypm5s1nxwzm58593hldwaqbvdmd4l4ykv4lqb8pcl7u497mfxwlrrh3xe8gemfj4mx10vh352lla8afxj9mciuvfw03v34mozu07ln96qwfkrg0vbfskrd0vf16ogwbgge7ye47h9lcbu12dn3hnrowlfcxxo9r6rgfwoguc11j27gjle91h7e1zyranyavok4yvh2ylahcl8wozflml6tuw0kbt3yct26q4qi85yh2s7so694f5ja6on8fsjnvc2i6y54vwts00y2yfp1jlxz1svsuzufv6nj2dbo5i7fpx1w6jxsezcswlo626qycgf7okvqbipcg669qpnvqvy3xffulwdlq5xek7ct9b6ml1ytwz201owhmu0qe9kt7fv4z72547z66ciilq163qfoer5o01gq1veicz5gosoynnpg1097hdylto5el06k544l6pjfh0z67nr500x5s66pamdv1jat0ymssagvcns393fuygtxxtpcbk00qe4n71v5uxvun626sa51ifvr8mc56oq5lckgftj94itx5oul66mu0atscantw7ep1p1b5yidmnb4do22cjtk37r24ln4ind1jy64pftfbzxm72hdh6i1kopf13n095m4e1389fbbcs5z2dqgqdwmb58jv50pkbkyrvjj2yasr1le3u9ytpkg8nctb61vnoyopxpygeohl6bu6qsbbhy2340y4mzhy1kzdgne0rtqt7t1afyjdblxarcmj5elo7neiigjr4sntk3j5mv7e01nvja9ll901sf7cqmn239umdipb5jal8jb7youipprjkit2qd1b678a29eywstxxv27x5lp50oyw05bbjp55944mmc9lbnhvs37f5sbixbgcsy5kssbpeam0trhhpf7w5ogau2t81i3zgp57iu4dg96ywrc3prh2izggrux6p8p3veu1jm1hee15jutaik31fiwb1g903liia4cvzdykmrmb5p1dkm',
                proxyHost: 'ighqgjf3ho9jmrvr8fi6vslitjrfxc6p0iwdban3zk0u8wz14wrau3k3a83p',
                proxyPort: 5059478375,
                destination: '47sdwa5cuf28vp4u3xtdrcoum02d82oleuejz409mble72xhgnaq1ly86u8jh575mw01hlh77kwzk1v1pgs13c2eqhdx5dv8d5qhx2197bfx16mehj9ht74oxv3xdl6top2s68r41wyuubj3976zu0ysvk3db3v9',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'wilbxvvxel8w4mskcep4b6evcihi8l9rbnuqwlphfeu1x79y46xopm42cw9acbkdulf7arp7kwtzk8b03tv6bghylikbep0x30jziodss0mdeyc4w84mbcjobn4lzkmmxd4akzddwejdgef422sz6q2wqt3c5802',
                responsibleUserAccountName: '4acbbpyzmlrocexn5z7x',
                lastChangeUserAccount: 'bb6opaqbvxeu963j27mg',
                lastChangedAt: '2020-07-06 21:49:56',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelRemotePort has to be a integer value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelProxyPort has to be a integer value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: 'xh55w12d8wsr69dvwwho5xv2amupgd59k8ml7yrmrycg4q45wypa3myt4xrgkrziw6ncfhk6eena3v0pge6ltvmj20ugxptodrt7a9zpekgps6wusnk2num6kj6nsgf2oii2ofhai8mye7j79o7z6vh2qoxh03qa',
                component: 'hh0hwk1t7lh45qkbh76leex59impsd2aj2sj9aveve7y7wu2scok7c4ci1de09szzqpjirhsb56l3zorxl1zg1cb0x8fer6377p1v6jrjfgi1hmennniktiw71p9x9l2c7qyu4x4pwu8rfmf7ye6gn4anrg9n94t',
                name: 'aguyqueukcygp5r6oojxbi7ptp262w5q462l6qiqmpc4okto9boqupfip5ubz1x7613bophnzbb8nw2aum7p044xkegeap6c7b9mar90jq6mjnfom78doan4i21iy3te26zps44otuuwz5neztew324oii3homvg',
                flowParty: 'hiqgcjl8nxsovkkl79yidiw73vhtz9176hamhnw81utgyifo8sb4db6eiac9g76l13c7rp9l84wbtfeiah62trhoruls55dwfrvkdmmyrd48h4wxgviurjz8air747f3ggk45wiy4p1qcwmw5nhxa1o8c1ca9irm',
                flowComponent: '63mceuvgnntartwoe6lt0ejumcqu220h0flkdlh2md9ykqbyqwccwquew0isl7iak8131rg11lz7jw1gpbs894nqyeaujyuqztg869vhihavxgya7x1wormrs25m95s2gr6tgtu3rmxd9xz7bc8qle852z0tk0p9',
                flowInterfaceName: '9mg1jiwdtxb7ephtph8d1qxgjgcudo5qkb875v3qtsawz74k4e7chtb2fho10prw5lgwwas6r9ekud092iahk2lqutb2a4e16es2ezx7778ouwnomhw1fgg6ejp7q0q3wvpmw18msb7yp6q96ic45bf5ezzsuv6i',
                flowInterfaceNamespace: 'w9hja01f7kpkey6e28usax5aq5ramxbsmcb6c8n7n18w4ujvvj14kumbbemi0ghov3rkwrmtojua1rzcd5um3oyylsf0c52kh8k1rcf04ri1vhp1k3bynnrh7pvajwvqn4c7n4ws23vk13wrxupx3k6aajyaq7p7',
                adapterType: 'alhq40g551hu6o0lxvk0bocec550r3zdxtl1oz5hkflchj6uvlrj0pth9wa9',
                direction: 'RECEIVER',
                transportProtocol: 'ufnxdj265f4o1jpl0mnqib1jbbechi8a1ql2uw0xohaqbwipx7natdstlic7',
                messageProtocol: '5zggk53b4r2ch49ua564f98lh5cxynuv9pk3o6dg1uwe79si73498spfsm63',
                adapterEngineName: 'hqgjh33tgzube91u7ul547z0ms9m106ciwtuae8xrt3lmowxnu1gsaq88xidw9fvwtormrw1hj9sdbi7lu4luim1x4omzewa87y7su9w2iwqfdat8wy0nc71nu4q0po2vo9qduc9ffmmynigorlzmw3vwiy1ybds',
                url: 'mo1yn7adbdfj4xy23ir2bkwqxp0dmparwadx66vbxxvzfnw2maab691v6ghb5mk6r83a75rdnvv2jy5vde9f6nect5mk0z03stctljhl8or2dncripc1objaedb4464tfehusrdchokdbgc46tcau4mapk85gtq0pyic4ie4y4aglnfu4o1v9xsh04delt34zhqgjk3j8zljnm9hwgec9repcuhqonfr42em5bdnzfhpex5f2lktuecmmxta2128yuytalc2lhx7zajbkbg7vw7flvc4r6paheumwat42m81f8u1rfc77p5y4a8fbmo6',
                username: 'quqpoj126qiqsjoau1zbsbp81ftbpl2l42q0lda2umnqu0ebqu78ab3i97g0',
                remoteHost: 'kjparqtuoy18uv2oyfriotmfxkoloq4sbo8qc9bvq7twhbnn7bxakbikmo360mp9k22mdltxe7dziy0wnrpod2xoyer45ocfeqv795hl5hmbom3qhmz53arnjslx9ddcqagd55cbqh9lwg23xendqvd0s4kbfxdb',
                remotePort: 8550247995,
                directory: '3sbbduatwlrhqjdcnr3lvg8tzrevpyouxk6tpz2oxhiq75pr939ztplsgvlw42hzatwqrc76apshm3thw0cqnr5u7yx6lpft1lb12ursmgqrlnfezf8609gs3cnvt5ybt7p9qxxb055m74qomkb6x2khbzl2insqlrc1i0fc5wfrnyipmlrcog5h0hzzwg31zw7edvzcg52vlq0b45iue4gntf2kwfw2qir3r3o3uv94duwear4wm4f22j0a1rifsz1qsgd2xr01r6iliwl2rr254ij43fqmgvlen89l8nw6mtdqihj2pcwa17l2ijfblv6q8n7lrge0bcudgdepgoxhs1jelagr76podr49zg4kc8ypj64197pqpkh87lhll2d5snew3wqueq5c4x6dix9cub4npcbcic1m791jszu07pieb9zv48ocenrffsd9nq9mvxfk5s24su04929c4vq87oas2c9xnrfzhsh8z1u47cjw31vg6i46pm0z9lwpjimc3jwgit0mhseektcbizee4m4w8s9ug671w2zh3wcpbc12u0x81o2sgzq7tg9eog05k2m7xd6a5kwbg07i19kvg78ky5mz5woufq4h7qpenvespms7cz1ega32k3p8fs8g63kdcams72zjx3l476sjgij3rergra2tipgej0pwzjwajf3r173oqm3vm0crfbeqgz15to6lnoazx7o41nzd4sqdk8h1w4hjxnxf42mx1i0hg8yutcyg8e6t62srekn92tw3pru3e5yd10gl1hu9k5dwuzdp0n85c0xxapa8m7gxg4mlirgk7n9ageh8i9vn7gjvtkmuyb4x2g7rch4iwpjqg3ixopeh9iz23frgsyutzv8p0qa4tu1f0tmk8tozxlpoousm2mku6830tsypy7tyb4bspvf74zjhyss95qif6ks6hb9k5qaqgurprtopuwz2tkaeljtq97usdn1fxm2jx9rzu3omp05bb4yuur7mgyvoadg81m7koztk',
                fileSchema: '8aq8bt9xlfzrev7hot943dpqhx70ahj811jsftqzxplssyeekh3ko5kmkpafh479s20gd0jauwg9c0vka08cujca9zqvzaqib6k5a3w9ghptqo4qi3cuykj4zuq8u17f1sbiqbqjms8mvrc8wwim1m6drx7wgqtfl7w8nr3z3g638hdp62ithgud5n5pe3qkvqqqesibh1u3ln2zi0t0a1o1q5wt3xyrnqocq60jsxjhq2lhimavsjvtjfx85f1j8hbyzy6nx8i62vssa55mio5xs3er255uak0kybb8mqmwn4almert7tpukt250pjbwotillm8hzevb4d1xo5j3lq83ut1h9ts8dc0hgxphoqyy1offosg9xg8fx9y7eg8aa8z9thi34j1mskma619yy7js11688vf4x5dhb18v6tmly5jwrdjhdntssvxxpy2qg34xi0glv2wmxc4zrclddi0jwv175umoonh3n2qknlkv9wyjeiuthakss0ioewcu4x67obmnrtf6s5uf2xzrp3oxyyhsd2tls4dybtjkbrrezr56jkzwswo2smlc68v3q3hyw4z56xzv50gu2lovjpuc96m4x03u79o9t4zd929krblibitd0duscp25x5d6rmnfmv69smk25js8mjej2df31qshcja8eiv4wgjpbf7gwb4d8l5tuo3rr9gydlb53hg65kfqdl3ft0fwijfwn6fv8dgjk0r75qhedrkbdg2ma22z0aw1gb1yd3xzfurn86nwxx21pp3ku4edr9xp3ssg6jdpygynoghvcoo5jcv5gaxvb9ytnx6wllbfzd2ujvam7aqth7uz07sc6doi995h8p6v9ec8n6enst6hg52ej5ivn1uc2jsa0kz7akyk72iv19h1izj18bo78iarfn6k79vmxh79rt513am8z8a4ibp0gm1zylh3so5bvjb203qvorxk8e82lzs0bxi8g9u7jtft6p7i5q9g1pi6lvri9dn1l8mji2ryzt18att',
                proxyHost: 'n8usfxgkeresowdpglgueisjwno955fx7j8ndfwgo5f2btj8uu01g35l714f',
                proxyPort: 100.10,
                destination: 'pxltsry9azerqhweo1mpwgczzsw9p2tvmbil2a8uw3zb1m6j6kc56n27dl9wug19jopvihbws1pyzdm2d9dng80z862rnrf0kkcoiswhuv76vtbh7g54ph5vqr9qq4jr648kxv33stca9s7b63lryrecdij474b9',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'eoz2iyxzedevvmac1wl3sh6odana3ehybqgnndzr03u7772qeytyilf79m6uq4503r8977tadh7933zebb8l8autw8qmck393w7g0nm3965kli5whqx0i5wpyo29cwhxclw8f5eg5lyh976uu0uuurukpfrzy0pw',
                responsibleUserAccountName: 'hn20wk711oxs5ul07j3o',
                lastChangeUserAccount: '4k3w0yw0mg2f9ru22p3j',
                lastChangedAt: '2020-07-07 02:07:45',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelProxyPort has to be a integer value');
            });
    });
    

    

    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDirection has to be a enum option of SENDER, RECEIVER`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: 'e2kvsz443b11y0gfsy0e3f8c4vwqkz22dwdvtsitnp6p9pkqw20dofx9gwo2h38fdt0bpca41m5gaeam3sy4khgqepbfrjqll3h82718v6x0rwj7q57flnffr6yjh5omxdpt0x6pbfydfmr7jmi3geuptc9zg341',
                component: 'kgidetopv78frvt91j1xqj97wij0j8kg5njuarvbppszvpontsw8hf23m6hzg40cneo19wmuzmf9ueceo7zjzfclppz3ptm7r03ej9q0wj544j8sc6fu0egm7wvewbt9xct0lw9ednyvxiyjl90z7sof710lgxmr',
                name: 'gjrzt6hszmdcjenugft0f6sad7r2riwp3cz3vrzkiq8gcqiaa7lnfjqqk1nxvcahbzuoqcn93ge2j4s503jxxbwhn089tt2n00e3dic7qryuuurp9ctjcjvm3z9w3ylhnpb7b6b6vzdg4un82vnk17swjdixh27u',
                flowParty: '07jg3zeyuxegcrkh75v65126bo3nja56lu7s2w3l45fcd4e5axz1j0vbli7viyeqrc2u0yx0bxtio1hnxlv7vkz2okeolwoa05rqozk1npceihi533n3k3pcztsi0bgy7q8g72fgv2tcjg1hlaivdrffoez6tnqp',
                flowComponent: '14gz8ss7ll0dv5u8r0c3w826ubj3xwtsit7rp18pwjp5ygbbao1c1u0edulffpj4yox6ew8awpob1ahsukni06z61suz47gxbp63pmocfxv39612edhc81rb19vvxggsbhpx4kon9bgjymmyt81x49hx5oiwwwoy',
                flowInterfaceName: 'py20vevon68im2e8itcxyjywr0bjbhax87b8120yxbjlq3cdqoz4es7kg539gt12k50w7xxx3dorlxfcybof2f8sixrfcg5aro99tq9sf4vwov3hudknpxgkdcaw2zweoloy6a8zl86zyry7ex1ny9zcy2utz183',
                flowInterfaceNamespace: 'w6zersff5u4qzl5y1qkcucsrqdv616lwwrs7ynomj00cestcyyonpz1353tg4ed911bc22hj8yilqj966talprtbsaohzs1y6jxhtn3i3ibw0juxmi7uu0nvvm9g0oucr5w832lt54bbxkj020k1e81s2txhxig3',
                adapterType: 'j3jyqibq6o63ltofbbr9poijpi19dkhqode6x8wdrkiofypu9mbdmfrgypbk',
                direction: 'XXXX',
                transportProtocol: 'ifwd17xcpoh5vnkhtxze0f131p660qfjgsrwjs40w2emcmvt948ft5wdmn2u',
                messageProtocol: 'b6u781a6t3kxfxsdk8piqaory7poe9dixlfmooaqtuy74qimavmy4s33xi0n',
                adapterEngineName: '7c48e33iseqwmrkib5vgslzswc76q48f8fmaaen4zuua5pbim1h8zn3sso9sca3p0ppzdxiztiq05ll6nf6qjfx9hsgqxyzk5q1fznxq2hxqu59rpzvv84lnm2c0ppf7a47q38z1lhpom8zqbymd36imhc5ffxg0',
                url: 'o5gybmlwyux959j4987o8e8y1qns3agt2l3duyymmpngcz9f1i3px3rbpfznkvg1wvvm96j957pgt2lmrvgmwayt1qs4advgz1711zhhw0mf96l35hanb9ge441qsv0ovho2r58cyiu7timgeq88cfj68fy0z1unvbjxgfzbztrqsneuuejctjhvthsa70qdnf3s0iev065jb4899vugckvd214ljntov1dbjv2g8epy8bzwl8m8xxhpbqtz2qujt9qis2gv21xqcdoh88exo7wgc1gw9vkgobyifq1zgqvzi23f1bpt55k4fco2wiuz',
                username: 'mpsiemn17pva69cyc0dc78y1pqvwri48k9g3zgq1gji2htzn8l7389l4b8eg',
                remoteHost: 'iv89kopeyd5rp1k7odb132ql7cev41nl0m7zm2lu5y4ic8eoybxgknck1n23k086y0cjekavv09qhxufm4b42avauf7ebdvo4k4j84tni409vubdu8t8kz51nbdhsu8zgit9jmn4j70w7cr0hitixo6mrg3p2kz5',
                remotePort: 7306221836,
                directory: 'h29wxtk6sb6oe4z3mzyoxxucjvhl5omprd8y54mff6ki86dhbpv5321lm8ullvu5sf5ndcnbnt8sqh0d3we35ff9x5ebfp2ocbo5l7acqaac8lrxhvtlop0uac6l28omspfgewx38l2a2arpw2domtqs02mjvcnur01lbeo7z5bm3s1ml338xm0lqmrasrsmhzupq5999masca3j1fh3hysqd555ef74jkxio139shfrx11cyxb7ckwz0bhfed9hc47rhfohuizk5ecsogjr08giyhke0nl0gc7rdg0znpc9v1rsf26cegdwfsj39m0vrq73qfw41xrhdomh9449k3ucqn3nb30luse307i23stmibykgpkwjei1ubxe5unh3xxi2jppykkgstzmat51zsm8krgv8o368n5k0vgp1yi2obt96hmalew1fmzyxzq4670l61c6kepbc5ej8mjz7dtl1fvxvvzmut81u5nbeugp4rkw8omgvvw4hu9y3gammja006bv6uevn6wvqpqfwecpt5s86uv2j9k5s463dwley4ceioal85g09whvbc5x5658r7whlciuv9zeqvo18qojeucohnrcz8aczmdqmfohnik8s6w5xe78u355iewyyw2nephjiq4y8g4xcbhqbay4sulwv11z1a9pecwywboi84uhk9yonng0aqjv1tn3xesud5g14ea28r5r74e9azx65zm7oi5ilgoqsvks2cffgd9p6g85td7vv4sn6ge1ks6dngfualukv00aedgfsp1l32dgfl5xlp2t397jcnf3seky68jq0e34agcduap2ejss60nb3wj934mnecv5iczacxuyjgeyekb28uvkwgfwjlpac8obdc4l8717gtkcpwofcp7mhxrjeh9oh2y9r7ifggz9fyeun03wb3n8o118at9rxg0j1g6wiynj1y62az8dq4dhtexnifd6ulcmseethcf2rqa0atjbxm2xumubjxj06g9hqb9r5a69zwbq',
                fileSchema: 'x4jbkbtadfsvnbqjmauo411h11d1yg8plhge4nqnq6oikiv22dekshd2py409871z09ynmwpq4hhjyu1v6q678llfv8m68i2iinrw22piq19suvcwg92zelik2nwofqaakinvipk5paxozj9zmgwexgndn6fan9bo8syradg1hv4s4y6l6d1ye3adeai2y29ys31g86sbb02dt7s5oldj9vxh2m4gzlw4rlav38cgmkc8nl7srf6m14o5trvbpw5ojkg0bhwj2cibj83oq8mfphmq80qax962l6vx592oblq8eyd788dyxg7n874a7szj451dey5w3paxt4dg2dhapzf4mmpfw1k69jzaq9jjmrn31smo7j8n93qgyxi2ptahzicfyai1aajwmhtkvogqso61iqla431drietsu6487311nx6my759b1hub0xy24aggzk146sfdblto6azggget9959uro7l2htaef4m4lkxz4coimsr6ews4y1n5ow8fnc2b427tefgeijmfbvwmfyvyr58bykvat7khkbug75bltiaeh70737u3fj1torvcbotzgco7fqvnp900inpzptesd0tygqs4s4wsv63ndk7ximpxrg8byty11nb1oo144wqk6tel8l6a4cl1vm65xmz53qhk96yv2wfehfmn42kuk5mmam8rqcoaep3czzxt4thsdwyof4safqhn31g30nqy9g7lq40l4ew0sw4r006jks0fourun43r5i90tu1uaktxqc3wkf6ibtyna4sf7j5hh6b714qhm73nhu66y4p7zypc8rick05h54mm15uclu7ttc6nr8ohph6lsmjezskri3k5lpw3lb8gro2s8rdwajsikmzdzwfp01cr9xujfjx9pz032yotbejmmusuqu9yxgz7fw0fgoflne5rkja2518i6ilk0bpye7bd1bj90sbl89thwotqd0nvb13cu9v7csvyxwv2a1jd9k2xo6gfyr6t2un84h2wn0xf97b',
                proxyHost: 'q6vn2okz5u4lk6yzw1em6b1mae2nndifdpjb0n0hyuvjba3sdjh23l9vwshu',
                proxyPort: 4436844048,
                destination: 'dsxmsh4n2x6ixn0p59cj0s8eilmi7l4zu9tld5hepg6vbquran24zyulwev3iokei8fv7nn0vg3e5bvds650d8xym39mnc0ijyv7j3pe3oek72ggtvhg5lvmmfewgtqnk9fkcc6dkf18rwj9io2xe6evt8v3kizs',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'wxem5dt0s7b9koyifgbokv6v6t2dh8b5p1j27zq9keuxi734uc5u85tds4vb9o82atsj6lkw7tvv1cfp4qwj5eticxcrlnz6s4ewwaynr6ascnfej7xs803k9ca3u1bq7nao1xm6t2mfa2gd812tgixtcv0netrf',
                responsibleUserAccountName: 'wdxx0as3utpy5es5aqzl',
                lastChangeUserAccount: 'ly5dpjv3pfr6jz9se004',
                lastChangedAt: '2020-07-07 11:32:04',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirection has to be any of this options: SENDER, RECEIVER');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterStatus has to be a enum option of ACTIVE, INACTIVE`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: 'p5dwhtt59f95syocjyhhvaf6dvg8nyx5klfnuioa1s38fnmddc0iu6o4xxsyg88zg7rnpjck9139wzs9bz9ri3fn1lgzqlzso2g0g5xn96p6ws06yum7blqmmg607uzoapwlxmjsbzf8jwgncwx8fl2s1eufaklc',
                component: 'tqr30hfmqunasye8pdr7rkmxt571qguzs34zu9frqn03hn1dw471j0oe4rexbmxd4pf65fsxah5e2pur1pxy86kpp49b0n4ogk3jcwvm4vje7e2zt62z7yqhvcr1tl19a2xp3bpcv0annxyxisoll1ywco7ae4z6',
                name: 'pumbwq59m6sqrr39td01vzci6whyogwwddywepkw19he3vf6mw95c6ykfzuh4vrhbtmn23an7z08ufaxols0y98n9mrvxdiuqqsb4ff96hej0csteupor5at892kk01z9wqsm7zzsvgok1iuizs9cyw11spz1n5y',
                flowParty: 'ekjlmojjm1kvkz6hb219tmkh87ybqpq9m3i5snglenmszs3amulercxprc3n9rqmnn0z0pa2pwu03lasqntkb708dn1dga7doxosiafq4czyg1tnbk9ryu4z5eqdzyizokexlcnr6m8fvo9usyaths1v6ydorwa7',
                flowComponent: 'uuii1zhjgecud5zgbfcsn7uv8tdk6ss76dhvjzz6ua877q580ycyixqzb0kgj9ng76cn9t31rzj41e2e07ilu3xalfnuf8iufi4hf4pi7hrqz5ztyvgulutoh55hft38sf66rw5kkp08om9fqjkufxclde17u5ff',
                flowInterfaceName: '5srtl3l228u0ug13a4pfitmt3hl1gwj1etwteb92c4ccld7rak2lpeddnun0bbqgp7p9h6txwptkr23g035vd5n20s0yphm76q9kne7ogldqublmwh7ad0zylqbgqy92ld91ddqvudh0dgvvvyc1tvsc43svm2be',
                flowInterfaceNamespace: '3h9ub47mnzzof02h15ilopqavatl7og81rf4oorwnt1ev0me9xs7dhuk11n3iuqsee9kkzubgncjfxu42hugtz95djyhnli518xc3g2ldfmlujh99ocbg9rkn95zlzyfjqopdz8de49yr6azy0rgxyv37j0xbop8',
                adapterType: 'b55qm327eiarnhfprylw1cw0f652jgricd2yn5fp0t2bp0q253l3x6arlq4j',
                direction: 'RECEIVER',
                transportProtocol: 'xjrvljh4zd3f5th0d79kv414lnj0mdzgkskk4ancg15x9xf4jt006keorxbm',
                messageProtocol: 'm4ne8eu00mffuldweok8ac343dl6f4fwg8lfmxv0lqo5et3g32km2inham4v',
                adapterEngineName: '7u9bwipwdfawbn5rcgu7qvpd0ykkctu9nydxa3agpc0ewkx6kvzluk9eyy9hr1mhl2bbboh19b1lqzy29qso1ojcnnm0a77up042dj5jo671avn7i7i9ytrfk6f5o7y1cbpshg892dk9uq9f85n357y0kpf5xcvr',
                url: 'osvh3qeeir8zmyhknl3motr9ixsnu4ukzmq7urmwlvlmnxw13s2falfsqb9g9y24vordp2f75u4nzp0env4jgavphn6tmso5cr0d7qun7jz3kjv53rrq0q7phzzwyg1loofdd92zizmrdygt2blrsx8kkip6cb5vymvk45b293gfagfrzztn87k83vcu5t0if7u4v2cx8fus5uayfypc67r9ob49rxwvg7spw43qwehgur9lsve7pfcg4y1yg6s1rzmbyegtpmnykn07h2f36u3ojjorpt4q7serjiknpuznvcs5dwjm5zydetuteie5',
                username: 'wlsjb2u633b2yy24fdx3ppujtk1vcquhrtquvljyb3ud2ej2am4m86n4jakt',
                remoteHost: 'vkezx0zddn2p26hi6ycw16v0z77y80x17zshv21pb06bj2oyax0newo9w5yd7ex3g0b91uyipzowm8vppxiv4xwete3ll8q6a8852r8nagw00epensrkum3hlusowlyeaap2xqmccc0gdv9yxi4zpnffr5gtyu3a',
                remotePort: 9386610989,
                directory: 'hujh8t99vljp26lpjfwu2fhrrtdkpwwhhuzy670131tebjom29ugp2ff6cqdxsg8jiqit3f22gcaaei8j9cwdncjk4574rbpgktsr5nx18v1vlpsabiz0rci3ji9s1dcc5dbw7zcwdoajeioaef9vqquy6qawfeaq9tnqizylotxgkkuq8u8a7hk35khc22rvozpfmxg3qx3r1uy260s0qbc01u7yl5fiz45dazriydd6k5m4yuw7eodyteuuab6czv7rxz0oetxu8vm1a6jrrr958uqlbdbb5qsmh2nx83nkhwq6yxnovdjrgwxh2tjx6ovt5xxmw5zsx0r1w7wydslsqbwuzmnd9xtfc51k1tbx76ecstdd266aw27afq0ww649aiobiziwgw7ss1hilycb44sbln9x2mev77rf96uix6pwnozv2lkbqttbo9wk9qfm2zdxp4jilg2jhcvyih2pk0c9lqrldmchq5ldqd9olfdwbkqh1dd30cora5k68e90vfc837msee77wc3ls8xzhnhupdesutvxare9qlgl8oifgwi4pz1y881lelrjj6npxs7ykiwhsz3szzkkbftc0c6hs1a3y01rsuj4biwpg7l0hlrk4b1pgf4dbu5sxwjukbgmrdf9ulz148hxhh7ppwc3zlxvcyw2vtrnlwuwcyf9jdt3mxsdwzzeyzl4tdm4cpr2p7dztnze7aoldc8vtjf69yxac8e4u82kb1g5bpprk07o29tudhh59fx3gntrqxg20ybhtgtvxrqfym428exkz0tku072eavm8l28byha7wga5nfvi0003aysbfnievc6ok6edr15qdbdnvrbfva60ewq7yf0to1y7xklvcyhuccdyetnduu683rb6w8p2eccycadyaih326p5ncyo0e06gf2hy4rs2r78fn8145tmn39fm8mylzcm68h56k3qm4a07y83hbkcjb8tsj3kklcc71evmwrvrhynhyx52aujuvdpwtccyvtwki',
                fileSchema: 'h0qg2hts4siiaol80zq86frosa8g2566e512z2nfrthb4c8avtt24xcv1da5ne6ycifzamq39qhbht4lq2p7isbqsg13619r3m4bbm7isz8y5j45mi1u785y9utz58u4rbu26wgc33ow81zztrnf9vnnry2ukycx97hnduf2gq968wxpctdwvzvlkco4n4pspuls0kxrjk4f3slsqho25nptipysxvay6ae424kl9b3gsfkz7zku9yg8itevz6aqszobvxrpynzddudtskfdzrk7nn6eguakjd1fmfpwavcy9ck0q6a9ggnc25ey2gucledkmuvwaok41ot4fo5zthhasmeh9c1msdazmkvpgu06fa0fft37rhqvfohr2os1rj1iukqjgtnfvodf0xxngyzp2q3mqbakrnrk7n3tvnjl5xwlesx4z3lqdvgbtkybk0hz7qigswymm3dqasyx6prw838oi2838m1jibayt1vumgfkpibqpwh3993asn3up6mjiqm0j746tmi4d5et5jonr4ax4vicm4v3e4tn46c5zqyz6bto4zn16k5xvqykibiqs3989b0qoy401wwkj2bwzhr1ta9yvd7f7lefgy7b50g9kxo1bwmghj98kyudjnddhkmh5nvqlh7hfdu0jyjp0noatufs3q1hipmtviemt4jeo4iagiju1pdk16juvf0uri2mae45ftwawe6o1tla6idoiv0000l2qgp2oa4au5ud8h3kzahc6l27hd4ywaecjlgv20712mpi67mn2a38k8vttvm8uepup13vwhhz1xxj7kqy2q4km9d8n1b045v9v5rvvm2xhz21044pgz94v3ba5fanyf107ikqpg2vu2nrptgdh665c2jg5esm3h4kw6mw2ebjscy7jcbdu0r2ltbfwdrj795pc9o2bxfwe57hyuazycmcjvsilbp5k58gst9ckztkwbdfghauwzlnn0h23ndzthivpndy90dr7eu53syhkpa1cr9bpum1',
                proxyHost: '04afdhwh2not9wm4ay40d1eoht5jcpfrhnzlpvo7ri8jc8bq3cumzr4uac9b',
                proxyPort: 3621193180,
                destination: '55shha0qvfr202tzcohynr27qk8izibnoqm1np9cgjzpklihstyytlccrvu71nxaj3n244a4ndhol788s9qt6nk6sdw8cfjl92fyv3giewh8akb4v3p773emdz0asssjau6rw2tii6jxui9ndn0xdealjxgrt8fh',
                adapterStatus: 'XXXX',
                softwareComponentName: '03889ntu3hi6ak3xct5j2tioxb1goi9lj8ixxlp5q61wmrna6ldtribifxde8o5z3la4dzi9knqiugsnn0lrhoykad7h3fy1k1gcknxdjuhl2dx15dn5lbo8vozcgnd2sc90zmm9x1pknhh51e6h3njetxf9fzyz',
                responsibleUserAccountName: 'k1bip2xhixvv4zja53af',
                lastChangeUserAccount: 'qizd7yrww0rnvtdjh19j',
                lastChangedAt: '2020-07-07 04:27:04',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterStatus has to be any of this options: ACTIVE, INACTIVE');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelLastChangedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: '51pj6qpgmfc50hqvavo9djeciw7q3ds9wbskhe81p0yx7vgpavzsnkzh9gmv1n3l75teu3ok62sol1ty2srzu5hm79icuyjo6tom076iok8yihpsnjk7o29cq31gmo9e15iotiwzz99qxarb2zyzqn60gm0msoui',
                component: 'xrzl2q8nqchi2itu1dkxuxslnbph0bbzpyp2n0kptcrvgy36s7335io38j6xpzpu2z6n49of0nt5fnf9lrrh2igpp0ihmkzgvqsz5bt4uhnpspj6w0qz9z825bh2b9kwlrnu2psxsk3k2ysavqi41nlvko7d9h34',
                name: 'vos432zopq4g4yjc8urf4ncfa9pfdjsh1niy4azu7vatps0xo13v3723y4zcnbz1qy2ldyx8djha3zwumay1fjugt2cvbjompu4wx7ta3z1fznirkjnenmeu6d8acaq41ptfwccvsa2lmwr0o3jc8khjwuozritd',
                flowParty: 'iq7lkf2peidy1tlgxxiy8arb1dbhanakwhb7uqbze3lsluvoa0i56birk1ayvf2gfchzk6ednqpdaiomouwoq2myrijc74ljnooe3ykjpph3ibs89meuq4nsxnx5s2vhf63avul05v9ghvwgg3fswm0n1iz1rnm7',
                flowComponent: 'ue1gurnkt3hbr0slkin4iecz9d7nyqgzzn2iswr5oyzw0onxilivr5byn23pm7twjbf7sutm0xo0itzjtux0umtednqn70wctwqbbsg99eotwha5y3uh8w59sw44h9g4e21cptn94dvfou1lwh98jsab5nyfgqcf',
                flowInterfaceName: '1q38toc6kyf3ukduhr0siimn3ndalilamak5of3ytsj2xkf3nwui2mviqf63l189xzf7mgyv3wjubw8wf0hskitqq48crig750bz0tcbu7dmpvrhnzo2rcuhbu3sq842ek1hke77etrd3ndgs0rsbbkon25o3d30',
                flowInterfaceNamespace: 'uh8ju8zapzi8uepjx6fq9ox7367eztsotxup0p5fx89jxewpdx17ggswsuq8yhmivdhq76mqhaz7avlajpb2tsqbl3gnybfnf70i8rm4xl4hsoosepzztfxqoxqg9hrne5ocibo4x0vctlytpiuqeu6bcllpcodd',
                adapterType: 'xusrp3q2dqwt5y6l1d6i9ko883r3q4j2s6dapqmtdtmnm7anmz9zp88duwjo',
                direction: 'SENDER',
                transportProtocol: '8gf9tmxavl51bchxj9gcatsnv0goombo2t49jgs1ko4oig5946qem3cu6c66',
                messageProtocol: 'trx7mo82dqvb6fcn1ywg8th1cl8na0q8l8g900ssh07vvz9agl0h2vdlmq9c',
                adapterEngineName: 'a67en37b0di2t8n76ot1f5i2hhw835ray3wyxq17dxpgit2rc7injsisq99t71dlk5beqlgq432rhrwckhb5rsd7gfsxptp2nuh7c2krm7q7ayj7bxajk661l06vkeg4fvcfru1613r5xtmoejag29hgy6icb978',
                url: '86x3amukdykyurkvmnthohtzqjkfnmlr6l2vb0qsbxzxs8j6prg89hiufkjrpk90pwunoevwuteyxfd2plas070zksly1xpnb7c2nvkn7smfi647qbqjg4gvc0ryks6ihhaa3v578k19vel6vver2sc125f6pymcymoymnz39cyomjpt95uhpsupkb9ya1ligj9rnrcgaovlessge120lkr7enxamt2nrymhymrvcijhmd6i6sbahqjbftbbmdw32eocrs9f719zfewc5r2m81k844mifg2k39wxf0p9tki9pw5kfdtrs5a5j75iyime',
                username: 'aqb99ofj9op868e6d7u93ey3susfel47e5nwfc8w4cgono861qbztgac9syc',
                remoteHost: '0ypq0xi9sq82hydoeujthvaf5wdcyhaigney4c8kvqccs81sc2tnqi5f9jpyb4u8uqc28j7acz9t6a9ymoxk2ise1b1pilx7etc5kp0hu5e6glya17nfi9ffafawzanzv1y7ar9vrsg92o563mmgm43j3xzisqvu',
                remotePort: 5072642779,
                directory: '796rof7beqglad2zxja8ga613lyqf5xeq182labzyu1nfum51xhb49pwkgtx3obxtacefi0bfxl05nwsqr03zaqslqdnbiwntq6mwh4zeobpzx6pr51ur56j8xki9joeyhy9genk9lfe2hyrhg89p0frp1oiu7gs0zihn8g3ttv84ewcn23ybypgbiizkn5hr1rqqw6rpom5wdblzqvcy3jwl4teb2xtwpxhzckgwtutd3lokjxoh57u1wrva60gjf20x6c0p3wkmx39plwfwft1lmt0ee872it504l10wou3ei5r4phyvds6kraii6v4twl1grt38ayitcuamb62k2d7x4voxjxe6ek6rs69om0jlpkgf8burj4rulyrn29ycnfmufhjewduta14vgq4ffwsp0mq6a0ro2axfyf4udue5ngz4yx7cfwnw0p9oc1yodt61w1rfp2krpc62ckxtgmxtvi5xgesdkkaz999as4f6rc0b17pi4yqqaaolqgqq0n2629ry8vlqgmg1swhhr9whfu5ep316la7jkbgabkmvqyb97vt3xcmy5sdi6m6vmm6m9a8a1pestar07de3jth0zwskraveb9kqc7zsv90k0kva2a8aekk29wf7fte48jes7ijwb57atev7mf514sx2dzld7y8yyu1gj4ncgilx1z45h8bj3badjws783m5197ljscabkc1qpy3e4txnp3bgunhzgrbqrqhzj719sh65cuolr200ar7x3objddhiidg3xowiizv0tcqtlu5rgfcnirs3kt7efx2lyk337tnq5s9568evi77r2q2dogxnvvgix1ra2f11d52gg29dygcnln2w8i5u1qd7hu7ecwbmhw37x9x0h2zgcyvd65pgmifqngg310uceh9dug5nuzpqrv4l37nzjgfil1ai159lqea6vtru8uh6f013kle72d5qb4iow1ze2jgaqs3xxzauw3moyysiy6xa5r6ayk0y4x5sz9nbbanucgz8l',
                fileSchema: '92ja18clnhf2ibrhc8e1hw8vm4lfb10jel0ttzfaykzv8cczw67qyoupt01vuil5rd8cp3u5qxgn8lf0q77x1scj6m5q1lnvx798djslki8q9xq6o8zwslruyt7ilcrgg7lmn7ucvhbmkd2cvnqp4syi2yktrayhb6afho33layxq7m9gtypw0zxithuc5h0ueyqys6efmdjzmtidc9jkfooqmgs6hw1lpdp5gn8q2kivswqpb1xv4kfn9oi1qndw3h51hcp63es4yor0tckkdyfztit0d5tnckdwhy24sndbqitlkrjj8pizd866ujxrmupj7dv9vqjkb26fkdacnf10dddlaa7ec59irvvignbr2xb4hn5rsi7nx1dd7ghlx6ypyylelbc7nsdwc034k52zxfga4e2mwgyqnioap54b7eg82bikeun1eb46cdfj9cx6p3hwrd60saumz3ab44lr10pt7sx2f7v9n8s1m76kfman8a6slqhk92hviz116c8ci85uro2jqm0c3ulhanje1yp3eu4l51jht406spo3seutlwgvpbvfeuex1s20w64ybjumc22yrm7uosmwflz4y41sylda8ajkprspx3arzi6irzk108kyvyrplp85o961foih6z5ety7y0k8d28cstzcjhagcte2lazgjw2y7twg4qodpp9jwna3vas2jhdekm7ztwxzamuslgpxwhpqqqbngfxjesc9eggxcntahgqle6g1ztni1aaafxf4iaxav3uy3ms8plvpc5zjvvkd3sb2qk449bjgdt4sm6fu8s2mhgcrbpsuubwsaknz4u6gisexl30nf9jsn4sdyuuott7h1pas2fwf0qr5sfzn6x5fqtvvxlucfx3jj7hwy1v1nhdthzgqhom9144jnrioqzswy0r2q03zsshy3yqiow8c64afgvis6havghxab5367q7yap61my1z0gw8sde45lkmonyq2ar0zq6vz3dmz2gm0wi84qybym98e1j5',
                proxyHost: '9jmd6qknoab4gpaas6vdf3f3vg6y614v8z8mtrh2ppq79dc9k0jb0jevms6t',
                proxyPort: 2216633494,
                destination: 'tzmy4bnb203uoqach9t3mjwdq5djdndetl7djh4wykfqr0e457ccwg84plj3fvsswwop8mexhnvlqawuvriqnkr4h78la3jxha7hjx5jay7xbxvr49iuilxnitfkh415zpclxpmzewwkzgie3b1kxbnv04ywkywx',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 's4tn1otfc6z4s3hmdttawgcqmakspqqumj8zb7z5lhgjtj0ndp6dzafilx7zx8xzt06nednj471x8o4503z0p0f2row8n46i7srfyjbkex767iitbviytrv21sgkow4fccecn1dw9fcm8f7e3nbby0tdku7pixls',
                responsibleUserAccountName: '1qgwah4juvjcdjf46sxc',
                lastChangeUserAccount: 'etrccs7yozq4lo0o20d0',
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
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: '76x2j2r9w614ry63xfenfrlnbyyjb5d43sgh9922x90uqjxtnjiyhwb9bthiplx9he3vmrgqavh1m043jwtym1q3np1xcsevin65jijwvy31bh9bx05rmtern10dctf520gekq4uu2tzlaoveho8k17yxfquhcar',
                component: 'taie5xe3tjut26mk7w84f6r6512v8bat8n6vhx1r69sm7hj4rqy8knh64u350gr7fl7b9xhl8t8ostmjfz6rayr24g1h35nm4i0hyr8uvqb6xlls7f472ux1l1ppbmjfgbiyoc0eztu7z5orfqv9v2hcjuve9dt3',
                name: 'boqdsgze3ozahrbbver5y6qshfuly73bsiphmnzhilflwweqhtkn6d3nyh75ohknimq6px23ct9fg1jo6bbzaz65ntrt646yrww924m7hynyue2l9xw9bpg474x5my8q7dqbzhbt0e1mo0slvpv0zali106wqt3w',
                flowParty: 'y9m9np1k9a6h3jo7pvetp9ckuy4a6j31lkm396v5qj6bzztr1z2fldo7m2sosyis27gorbnoc2yfz9x4ojapud82i3om01d8aoalv6pm64xgjig3sw5tn476lhpsv2uooiniaowvie29klwv8wb8q0vqu6oij2q8',
                flowComponent: '8mgoy6zc0vyr0yvnnu7680ofsvml1j49p2203cv58xfkcqzyz2wbb5159m6tv3bunhwvg78mjz2as3pz8ept5w4sjiy05fjvcultkmbytp3c9zi90vltvskb4u1ol0p928x791pg56v8feg452m1q1kdci1arx7v',
                flowInterfaceName: '4uf74bmc28lc573cj7oi9eyopy2gntxjtlktxk5ob3j6s3ztmkxc6ptp5sskaadihgux6vncx6orw8tzg10t23cumoo7xe9xri5thc33jfd2w6rkix0dfoysdorccxt4v9vioiqta6bdm8ymz814yliz15wkhuz4',
                flowInterfaceNamespace: 'ngq4kdydhg9dqxkfa9rtelenloqfj97y7e75aut2botwc8y7sj1lnp185koji87sx71xfelwbn9ezr5v92f6wk2t1obg21biua5xv5lywcvmfusvki0qw9anwbqzg6fpiq7z7zqhfvt4imr6cvd1b0ss0pfyexa3',
                adapterType: 'o3cecl5jr21irff0qlk4pjckp129rpedpzvuuc20255qay5lbimh5b86v3e0',
                direction: 'RECEIVER',
                transportProtocol: 'ihh25rss5gww0zevdkengupusxn3kqd59lytbsa49g56b8dza2l7t4wpcma2',
                messageProtocol: '976m95lb8r7rsw0wwm089czkuk50qmbeli3b317r9uwyad4wr4jn4bxmn5hv',
                adapterEngineName: 'b4e7qdh8lwr9g5scilvvk4ignkepxxodh3dtv8lmv0xcfag6dyzpe0hg86kty1o4rfcg9vjgti6332dz06qk7y2yeomvhw53k0k3olk1obzc0sxpo88fdcfpieftevr2hwftu45fqo9ksnohqw9bdlzx0nh9o18a',
                url: 'jhsfw9nehxk8er9b8j2cpzewi3npebj02tbvw1lpv35tfdiehyxpxd1qbjyj6uc9ezcgps495pp6be9fb7xn246ybnoprnsvtisve9hrdueu6bsrtxdki5d53pe1n32uyg8zdobu0thc9gzscvmmmxi2hkpb1ficmtx3olzokjupkpoe8wxyvdlh3x2p8wyvinbvhdggmivex7471ymf92at66eal49hz7pa39cb4hmxuclze4ifoazgteiv8sv7zkdywru9erbqdliij0n9ok8idg3056q3mtv4n06j3euwgoluw5k0lltz1nmku1s5',
                username: 'czgdnv7dqft87mgtz2tolzfesh9m0wyk038h52gixqtl22334g1ofkxt0xbz',
                remoteHost: 'i63d8oot0jm1enbjep2gzigdpwgewjnqe7x83bkhytiens1rtembie7anro35cqqsnpgez18hoymhds1i1yfwtb05a191rom7c8ry8tl7f85akwnyia1yjddi3234rhu81irooq9ez1rhx1kearxh9773wd4yk0s',
                remotePort: 2857847471,
                directory: 'o5na1toyrcunxqmt4jydd7kl6lqpummj1n0a5glt3otdvjjacahy5ysvlrmmwk44p1m06q85jv2h4hr3iyyepfeqzaafvtf995vhrgrlf7uxbbla3rlxwkj7ekrdve5jn04y8vb7uvnypwqtpypkabb06o1dqpggvjhqw5gd3ztv8pwtpiqpqvjpzcwiq751ort1yic8i4kupnh26l0iwt3xogxfkum2wghy04mxq7mr5pje3qc2v1fbdt64c7gb56jp1po6i2kpeysmk2osdn7y9v1p1kezly8gwgkg5pp7mba3gmh310szj0cz22arfbn1hk93jb2pcjxt35am4cbmh3xif8elqytm8yytk9wteey26ledxtj65shuih27ekkigwwwwvfq1nhq66ew2o2x34wdd8gbew207ohwwucgkj3leewqj0rlw8he0d8517m0ahhrm0olmjx81ti147tdmhjh555x1sxd9s9eh0l1dtn0bg0ri0yrk1wa787avq0ne7d2p0uk0f9e5af7hkqm67o41dpowno3uugw0aj280onzrapq05lhebm6vwda4jk59hmuxzx6gsqxoyo72tjfijybcvto3lgws77hwdt64htm6t8202msaz42icabf4lze2syiyo4e9objgiq477q0t67uu8qcdqvqtll7d5iqk6f6v0cf11x5t4gwfbwv7lga41fpwlrgtyutful0jr9due6kmns0l998egvspe1xx78sg30gpk5us8xqy5ak9b95ira3gex1rtfzbbpu172o8k2sq3ko5mspiw0rm8j8urdn3pv1tj83qk1j6pemm8e2kpb9l3dtgea7e91xe6s344finrr2hpj356hyaqvvmtspwkk4170vfqsclff8jsf1r4bqnfukdu4qw5p67zmt93gprzbh504advzyjwojra3rjrqm8fn0xlqz7e9uyhlhrljrrvnbjzbr813d9c7l2b51l4ska2o1xtplmzhh1nfmrq953u4oob99od',
                fileSchema: 'hzbi4ujw23w1r5sk35c5jf4ke84shk583lmzynbcjd34cer9uls7ij3dspi0c30gusfb3mx97tzop69bv6xym2t148v7ouua30nftzw4o21rqz7tgx84zc7k9dmxeypbqnrm9tolb4dpu3zpz8uewdobnu4jiszpqv1ym9crgzf5kpwl8m9007ol096g7t4uwfl9dsxgvsj0camvxd9m54c2gkr9kk14p965k4akr5sx65mc9f26w1lnkcmq5r3f9ojcux7tx3sj9js8tocbdph3knpvi7f0l6nxvp7fq7hwb9rwhti5vcflxpnqjsxjya3wut92e8ot3vzn3n7058k2lvche7rigv8h6ttpome9nqwikz48toagsaijg414gbpcdll2a1dher5hdwd2k2wbpqkkt4hr0z2olfh4nhnrvfyftn473ubw0wajtpc2anv1xl7tak8i3s63we2w6xg8ycgxf7kcoiid0wcnw0iudeq8wvqwmtb7uzazosxie56nbrdq2qh01r5qw82q2ula3j1mhyzyg1cvf603i8vzaht71jpep14o2017mwtahouidnr9m7cagn0iqaivy1mc3dryt9kndqwu3xg049xf2xzwgzfyu55t076cubla4n2dzfsvakn5ir7aoy0wezizdyja0i93jmz9utbpawk8qhgkahhfjyb2otfhhhrbml2uq223qxg4s7cu2nw2io7xw3mk8ubzlwqqi9bjgch7h4y5h7ikzw5jemzlb45st7wdm83r4v06jpxjeob77ah61tgbhcm4blxwy0e16n6zsvjnhmw7ikhe33qphs2jpo86qfv9ma4x6vhp0rwsoyef4alkld4xrla3b9dx0ut8whcjvngdio3jpqag550u4ur70d7ha5irn7vs9werm37d3znds397pk7frjcsm307e4ntqsf0cth97rgw1ek3onlnqs5owi8gw6zni2je6zxk1uv6rx1fpk7pvr3a6s0klric7sd4h7whsm5auvjh',
                proxyHost: 'wu277t5eg4opl5zkuwsalksfq1b8eir32h7ul41pe4rlr3khxtsjzzhamzvc',
                proxyPort: 5255689215,
                destination: '0ir9ox5v0ha4cra0l64whdh8cmibo9drupisks8og8n0g9xi2fgticczbo8f0jktd9gcnosg5r1wd74555h9466ln0to565xj9crjzhmranxn8sc241d5qlb1764ho7g7s3r2qtkmzjpmvl9q4l7r0n4xdfzxp59',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'zorrcvlfeh8l9t6ih6vwyja88rkkwu8o3wkcqvrzkus5qeunu467mnyz917564gnfnysmj43hqb0mysj6enm74flxkut229v28n5s227gooopcf9535ahtmt8rnnybwqjezo6x5e4o12rrr04jv5fw8ngb9p2bcf',
                responsibleUserAccountName: '3arnlw3dlilumyziqxub',
                lastChangeUserAccount: '05bs8iqaihqd0z4vsjay',
                lastChangedAt: '2020-07-06 14:32:24',
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
                        value   : '5385dd31-7545-48b2-8578-50479909afa4'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '5385dd31-7545-48b2-8578-50479909afa4'));
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
            .get('/bplus-it-sappi/channel/5385dd31-7545-48b2-8578-50479909afa4')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5385dd31-7545-48b2-8578-50479909afa4'));
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
                
                id: '75cd36f5-2ec3-450a-bb57-5acf65acc03c',
                tenantId: 'f5167418-d0fb-4199-97d9-ca8f3375cf2a',
                systemId: '7da6530c-cf27-4c5a-9a6d-a0e22844ed28',
                party: 'tgwkla9tg2nxkqz1fpiz2g91fbhnh6ozrarydtqyix68ap7d89grtecn1nn1dj7pogn1zz076vr89w2w34vs9bv8278nqthpa0dxwsixuj55pjtub9x9zd99mzqlqhadd82ulsw1o2up3gqltpf4qtlbydta2y3m',
                component: 'l1beyzp00vfrpuugqm3vd99j8n7asa66o3y4ifcbv7hmd7ptuhf6n4m2ltrilmwhnq345d70idwb05z66jewfrtwzx72tgi8s2zp2tdpejyti4oaj37006tlhhll4iocvjbb6nlas2pjygwfj6rybpyynfybkhoe',
                name: 'm2opivipot63ao0k9uh6bg4pvifwkdifkngyyguttvpz31nru16twiotf26d6c2jb70fi6elq90i2w8cl85m4sqq512a4h8lzck4l0b9wqwex42icixpg6tiqp6n62xrj8scevg28c09cmd0dn9iibqw0v1d4nw0',
                flowParty: '4votm3s4segu5k3ksbn75hywlhuyfjvdtmftqrn9ljeyjkugh3ghe4kmngyn67vgsvvr7osxyj6exue4s1z91bs642z6losk5bvrkpuw8am9ez2i0w3yza0vrdxmkn0g7ac18jknh0k8zwnn3r8khtz7908kcy05',
                flowComponent: 'ch4x0fhccdphoq2813mr78ew4gliuz5qhzkn2wh3tpsy1xhei04i1234vl4xytrrr9cz9735nq5b10omdxrfe3xvmh3wgqjg8kmapb1fgdxitfxxb6nl1f6bvk6ytrmkfywfnaasfhog9m1k1w7yuqutef5p0oq5',
                flowInterfaceName: 'py8s83h4bhhwbl2owx4nldp9q0gf7f64x1dveez14lwuv5t32gtby89891fjmp0iu7pkeu1o3gp4v2wtuds0w6cxtengch9n7udyxt6vsvjzg2olfjqk7bttiounj9kpog7d3pp0p7io7yz44te2ygwp8edazph4',
                flowInterfaceNamespace: 'b5esav569mq8pyqyxepsw9f1ybraoiwvw02smk1ybeay4mnylj7ljlakhbgw4vu6qcbh3yezp195fiwh058z2yguchr8kuye870wrw5dykjq21lzjwe79te74oav11dmmzh596nkv71po8klza0wfexi83ltsxjc',
                adapterType: '4jw0y069fkddorrv0a1u7odk46557zkn09uvgbq51mvcnstu4klrpqpyou3n',
                direction: 'RECEIVER',
                transportProtocol: 'wn2rdfs58skof9nux8jnhq3zokljk065ct6okfn3w2tmyhqexenq8h4u2uli',
                messageProtocol: 'j9bd0xyggyygivtmtvqdekn8rdt1i9avdj0fa5x7p28bmphb0zwi7744vfw1',
                adapterEngineName: 'wjbcezp2jia9743mmumzk1j5byr84wxa7wtlbq9w7ua02aa90jct21e689cn2y9cmqazhlxww17olv385wumb2xhze38qi4c4umnmwlxy5tbluncy8onxfd6k7nshxxqmfgcgilkw0do2u3i6nrdtbjex5rzkmiv',
                url: 'sw51kh4b73f6eyrfdoapd9gxra1fee7ulknyqpkenpgtdeu7x3gv6tg8boygrfiiazyvvozyc3mgzftz9mj3g4lg7lyr4x2emchz3eifllq4ypjnqjtf73hdba1mwz92fikw07084211uc3rfba5ngxxd6zzcfheu41vq097vdznabh0vflq2640tujk5avi82gdkz0k163gkxtrjeog56dbez9y6b3c7fx5zjgt0t20r6w6r053l7qwdc8n2m7xytyofhxmln8sxse6oj2ltmr9kerwgcke43ly1613frx2wdwylrodokv0fc2u9m7r',
                username: '0wzgqx24vwgg56atd9ggr19oqx2dfr70aqxuo3h4kswk08gxmv5vch6v96o6',
                remoteHost: 'yf82ied7lxkxvd38ovwhdjoqgcx3i0ejxu4ooc4a0w9qjh4gswe7l9bzqqrh7yr5ms1zbtz8v5bs26d85ygzo2e7evn46vd3ds96wwhxntm6g8afq2z796qu51z1we7kg0lv76yff4mf0bmkd8xrj63vzdpr9312',
                remotePort: 3258620749,
                directory: '8zqtsiyjew5t24rpmrsgp03ctsqs9jkj5ftqwrsfectqd3u7y2oz81sqjm1hi8az5gl358n8z89yh1y89k1zwpd1lgd75ujnm3v5kwc6hvnm4gavy1jlhjt307hz0995i5l46n7dr7ux5tx5a1zc40fo0nvd1nyo0iga1mzdqp3wccb70vnz5yfun00xdzt9bygvu4dbg13cqjzi3w0j982agmub356awh2ups2d8mwgl9mp7zkslq47jwgyjoizajfsjhv2i3v9pxnamusujjx96tpb21it7qarc2eta1xkp4ljkziosbawnqeuv02bymzpu62ma714worcg3ctvubw3olkrn6oryogzg8e52ips18nvtgwlyxe25razdx1lslp2de27npv95xur77d03k51eepgzu5nr3uaq5sfc2ba9cao7atmkanxrgi2es4hjk52qccur2vlhrqqu5lls3zlqqos6qz0ifzzeqsbn8oixmrl9ptspdceqzf6pfsawmyjpwfxrrapo019wijrv33gjd7kot8w7m2a0aqtv2gv1esvk2rx9ansyww7znqzobokstfmrzh4p89r5k48b2fp32ksq9fxp12flls3kqrddf5frjzsix0kirvqy88uudfj39jb3hdjfetfuffwjj9dpavgzthmfzqldjoe6umyxxbro2hvzjhm20ujd5nfqr9011csp4a5w2ssn5xg8dhl6el5w0dibspsbw5wc6an3dlntx5pam1482rnkflv8kcet8iaucvuxlbamshm6mvr0klw3nxq81c1hv6bqyst1djnjfnbqzefdltzygwfgxxcjzekqbmmbnw3u3twr3mk29orn7t793rk00k782owha8dn5n7ja81zrklqmn7i8cvjqsn8o4q0qrp70iewp5e6np0tldwsvzk489ib1gf8mqbxnss96ex53x8zg3g1vzlfa0ww182kp3ai16s2ynco92uik59ktiu6aiwrsm7630s8piil1qj4m6wo23',
                fileSchema: '8m235pv61rxp2yus4turn9fx3zqzr57e5dduj01l4czcozuf3yqwx3i9lpy25vycs70guodexaifdr0nky9ptv0ecivoz2bahevmu2lcpgosujx4xcr1coe1cxx8jesy8jh539twdllr5rb8zq4tjrvyjcy4zlhxzjl2u2kdilssvlx2mdub9ldxalm4jb33sptwxaegae9lof4quj7u8d0n5hrwgf32adv1z4wh1wf1yra8gpkplu4i2b8imckk261gtae4sajez318gtm9sy4vcpbxxo09qbotddq4nf54q05dsm8aa3x5xa7h5zwau4w4f0ecx05mrqg8u36w89xma5w8pf751wdjb49leu00muodxcqp8kznjjrbrla657t3axgixqntagsw8gh0k958iw9ji2rv9puqpnmfocnh6ppbxkntarpfrhw9kand63mcwisb2tzqtqwjcnpp6sufilamfc1cjjy79anexo6wicgmo4tw6froskkp4od50a3mr2jm8o6b4oc5l5wtb7sb7ijsqsokylwndnuh4c3y8ojgqdydn3otot8c9ykir2c880lh1r0kdbak7707fanool9aupjq8fu931ckmm7jf7ty3fwzd7hywuxywivgpp46r07inviwf2ils8xz6830y6mvmts0y3mpnfic2jb0mbmhc9neavvt4kzsp1e892enfp0cwvayjebndb96m6yoom4lgocg7ykxl2cy61icly6pd54xg01nx27oh82h46t1eyhz1n2x9z4khh6f66b8jm7ousoc5enie00aefmm6idtrsrhmgpf7or7ul7qgyst26o0pws7pt5bf6nwigfbsvu7bu35r4ume43vtmii0fftmy77qkkmowa8mwy9j2ihmup9l9n203vksn4azkggag57i26guu5ec2w2ntuym1zyiw4cjjkcjbssdxptxwvt4tb7808481omhuytz7k9hxv7cs6iyc85otefell2nbg7gvepuvoz142twdf8',
                proxyHost: 'i0nzqsuvwjpdfx5iflza3boyu2smfmyxpmefz2371w8vei8lwm71du9p8b47',
                proxyPort: 2673858360,
                destination: 'f1rlhc8t79mi4rrt88pg2vgcphsbkpdgnn7wxzy36dq0fbcw1pc1zm1yz67ri14i1dbeo4o6xr92i3lclu0rep61yb6jbslltbryk8lb8ym70yt9d9bqdtg1lax2673b0d22xp7s1t1vljzcu3i6gj5v0nk6oszs',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'uxi562cqcpql3r9bh00d3wxv5ullm1vx064v0ymbwjur1ksguyqgost626mgg2gozrl1892p04j38qfq4mzoufce74eslqwxzdi4g4djedesuq9bhvl80h8xi027qziu4grotd2dcjh9tup77q8gtdrff3m3z7zk',
                responsibleUserAccountName: 'rmq1x14vhoektd93k5x8',
                lastChangeUserAccount: 'nq3ry7ynr5mem2k1v7c0',
                lastChangedAt: '2020-07-07 06:19:10',
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/channel`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: '5385dd31-7545-48b2-8578-50479909afa4',
                tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                party: 'gubqsltz87xc8ij2spy9elsisprezjeret9885do4v0kojj5uqoejdvhwmgu0enp1v1ozkdswz0k4nw43mtsm8k90euhzg3g7wkosjjm8i4ccx91v8i24o7b4md8tp8jez1gmb1sg28f7ckrtl14ktz54ve7luex',
                component: '31zjajbd34dw05u9ixc2jm9npsuvmo1d6yydlh0n9su3qzo548vz2owbzm9szzld5jeeapg2j15y7ac6f0v3ui1eqo3yywjfnwqtnk9p1w0cs1u7d5eewk1ulpc2se6hhskspc12zldsnepdf78rpqopxl8h1ydd',
                name: 'cbipkdrvz6khyobbs33hthf5xso1ueopt6b1wqaf31jp7t89lt8o3dhozquirpmygve1bhuwy93562vwnnqjl7qw2hoz8960v6p0720rkr4rvh5l0opzp4biktelttr5kwymqb2izxn0ji7s8jb9ucov8f579rvz',
                flowParty: 'n3rjyr1ah7pmtvnmcba1y7p4bhprwyh7f7ire5o2mdiq8e71u4c6hcq4xvdebuiqgylfinri6sb8511rl64dm8ykhf82bcx79ouhojoxlimfgl414olxx0wvedpbwqp3l71b5jo5hycz3gg5xhg2z5ymqaqqgsvu',
                flowComponent: 'zfx879jt5yf05kcoxpzntqiwrwwnah9ox0y9swbxelnwxmeh9koff4m9cf4ehnjfgz3mr4t4o83zpyffd1xqlk90yrlis6ic3dw6qbs7f48k887c29oip3d3urgzfyfys6spbe1ngull6x3m63ctogjbwtnchjdk',
                flowInterfaceName: 'in0j97demmgx7fg59kx0onujb8b9y1pswpdixto5k53547bu5nk6rhjzoh7j1b9pszfe62cu0vxvh7xqu78cjqx3ngen2iz0qwb2xs3qk46zzc803eqgxwestlmgtg51xv6emk5aq5befy0vrrnwamzt1jr719hg',
                flowInterfaceNamespace: '8lta7me9t5t5k99w5q9i970dvi1vob8wkdhhf9ocio8mipsdo1u1sdk66kaeoe2iy6qpn3o8dibvpwjxvfpzh3rz345o962vmystphqmtv9gr6hd3ozjhytqc3u9ksllxx6eslz96bhh2fuw6169gv96g17sca52',
                adapterType: 'rnlyv7271heoiyd4nat2auyomz2swozrgidjoyc4kzdacx13t3jm4dg5sfk2',
                direction: 'RECEIVER',
                transportProtocol: 'svuo19wsk78uif6w1vypcl2lwzz9b5bz0v1nfgbvw7d35phytx3esue5nf1s',
                messageProtocol: 'l6i0ow0c76ennhw041nh1jg4lnr1jm7xu8y0a8x51e1cjz73ikugl95i2c3h',
                adapterEngineName: 'cckphu8w480h2top7apwlc2z4d2m6hkg8stwgfd833ohnfprc6juvim5ddwom4jiyco1kf2dtizzb31vhfpykmblaun4tljcmdv0rojoxmqmrupd9d9csfr1o3av0exefsefjthb82d3kuas816hn41pbcddn5hp',
                url: 'gebvqbyoqkck7iu66dyzfy4vw40xw0l5uk262ywooixyoxett0x8x8n10tykqxvfzkb23tjkjxzx6z6t8q1bp95jr83inegxkg2y2ev2n2l3jbiycts0tytvmzqhvo1pyrab6yuwmgtnxh6fbvrw7f8ub386p835kwwy3q5in4vl73r8rql3dp3zhmmcmtbiq5og5ohmugd0bo872xc2a13w8yyridrpac11v97s1xl7bueuzr59ln26hs8ji8nz3j8orm05sbwtcy9mde8tjdk3me7ejezhhmopyrnpfligr6v04vy4kcuf797b9byr',
                username: 'pzupdbna32kok9wwctpkqt9sx852a107irt1oerbct0jh97oie3zwr51d842',
                remoteHost: 'k7u3k56be4eyn3y3e26bpy7kl6tnr69hzfiomcgk96oav2b96ilhi5k6nm0c861bt1i6tzhlstqw3jwpt3uvb4owtub4gjxghl2tqvizm3be94lb8dt9sp866o6xqz3vxfdzb824x8bpdo3gj1l5mugs1oijsonw',
                remotePort: 2179348212,
                directory: 'o79b1kqfx7l538x8swiv5ay2vkmw1itl2m8yle39aqp3imbhguuykwqnpefszg9km6mqrskipnnsqgaj2do7wtvgy0oyg8vhr46579hiv7sktueds48fvn0q7v3j53pvrdedhmy81u0aex1d5mlj8c20hnlx7xcgi3z3wbruk8rfvc2n36jdzwqj77n30bqwsj38vmt7o5j0h5ca1w45i5efcwk535glveebq7um47xq5jei6bbv2qgbs2u095h7uq73ci0fvehgpz4020zonygiwhch813gg42gjnbtjoqex0a0ybgyroj22xysfqty6e6zld5jodzifb6790yfr186tk01yei0xkzlg6oaz3w0op13cvjtl3ushekmhi14fg9rb8sffrtn5bbk0fia20r5j6pj9qpbiuof4yz4i5243a5kkwdw1z5k192eq4rdsw640xlykrxs1txnl1qn1o3hw6zgw79x37x9hz0fdkd7sfwa0rapamhv7c0d55uutqmasemn3lljhpkrpad1igl0z7409tjoh2as3q8nofo8x1kmzb21q37boofq30dzaglpdvwbfdnldulor73xovd90h36qw1gsizg9xn7ujccp9s9d2ymdlyfo1sfih0m677tz6dm0q1t7mgjmwg6t8dmlusup8zwetc7p6gcy7w2fovxqrln8ywzd2nhld9mtub8oxjwr0dojn6cpe02iwxbu7k062clfbdxsl3v9xhdo7h1h5zcksf598p6stek15khka73tabtcgvnztv2dt9pgzv8tg3chdf3h5lcvva8j0tiainlv9xbdnfo7g427o7r792p5arhute1qfw0kub74trzl1suqu8azhfcgxt5dz5sfj76k3npgq6c54gkoq9sarx3tkhjujtmalxvk9yy3zmqdmg9elem3lpoxmbn19xcnepgba43omz0telqhmyb6rfpqcyfkrwmja6btwkhowhwqdxatppantyzvoq36s54nf8o4aj3z7418yhn',
                fileSchema: 'fza6neiwvd44da56iqvaw9hguyo317wcd0mrz4al8alqlhud2sgqsy38nv2e9zsipzsp7drgyiazurgwsh9slinp6oiwmu706c76f6is0xbdx2wlh1uskvkdztlnccilp4kpfda8y83j7gann2svnh3rg44hra0oft34cjsicaw3bkzk3kc8golcd37cadixyeyf9bzxbfa3pe5r8dlclatqcqht4i5ww4j63qwvomuwuydw4zv5s0sn5gqv6luypp5n1rnppbycf2ganjgncc1wwtoq1qom545cszjyelszaj1omgpifk8f21uygomwg8otb0kx4r695ebsug52whzpg1kp5vmtawc15qqpoehst3bnxg531b5mnflwfhramgjv2brnfst9zsh4xyccifutrad9qgtztpr36uk0mxpvnlfyqht7fnvxejh04qjyerh45ysv7qt5ibjz2zy1uvso18n4api75slqi84eksr5k94iniid44p824av7qxcakitf2942nmemfu26qojeempu3vck71cwuq9y7of4gr4lidmqnnscw6vw26ktxnncjthxpxxv53f1r4j3jd31aib7qt7s9echql5n8qeblc14ztuh166wcz7029tf0hqq17u9c426a8r3bltdvrgvqitpk4n12186tt42j8v0w1s6bpndt2i9rrav8j5v8f062salwh3i6rhpbllxjmfv5cecqpk8mxh6ezq4qz1yrw83az1my44oi4spm91i1gpvacy6063yj5p2u8puya2xgx24g9ucfzlzlvesptvb8jw9811wrjppsojnubohrd74iwcs7880cceg8a29eftntt9f09uvnu73kn29tfizf2wztlq8yt3gc1a5fgfzae52cbgpsypl45t48poukv0n6u0ynxmis4mvjftdcbdkqqj16zaqdb0275esnbhu9cul01rn6g0qspmmm9uudxg1p413rbwilyve77s6xvkhcvmgdeqmu0shwgv05f0pn3i',
                proxyHost: '775nsukf2cs0cte6w8zni8jl6bniiawn1l1qx03oyus6g6qnph2a5y25jfxf',
                proxyPort: 2897584453,
                destination: '8jisjy13ar4gw5seq29js0iw0lhcgmvfr2dshzbb29orqq250cxyzqwc0cgltcbwbyg900m09adjri0l1mhcksci0ok9m4nmq68oqyvmqbszkh19hlv159gv835ns013jyyk54p88ucjooyc7sfk1zhzj17k04p7',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'yd0ynjjwmaf0xlbvs1xzdpijw8wr0v3nmb0huzq7hk5efl5w0o1dsr9m4i72q65ucgpbep40l4l5lp11u3vs00lb827qe8zsdcec1x91884a75z1ttqcb9s2eh6jxf0ys16o12ioamkqfwy32b6wke87k6yh7153',
                responsibleUserAccountName: 'uf4nilf0rn1ie5brp7sa',
                lastChangeUserAccount: 'wehsytrky2emqqr8yzh4',
                lastChangedAt: '2020-07-06 20:54:50',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5385dd31-7545-48b2-8578-50479909afa4'));
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
            .delete('/bplus-it-sappi/channel/5385dd31-7545-48b2-8578-50479909afa4')
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
                        id: 'cec8b388-e73b-46ab-af87-9c4d1ef4a702',
                        tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                        systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                        party: 'dnk7bw9alu2mz9kpwpc0oqrb7q2mz1ey9dq1uwz8wg8xcngzkmpm0tg1tpi1dsinv2z91sjzyk0a8hez0w818n3afnd2bnk65g1tt3dehcswk1zytz7rgsrz6tig5cekdm9wxxo5b2mb2g1cgrr5r1f7564tbhbm',
                        component: 'u4yos0p537b2wzkpa37xtde5wsbu4l95yn7ln46bxxxt8d6z6qrroc8m6hi5hhu8aytaqmw6d4nzqk5us7uor0h9s9rq3z1ugsg1mqwqpq91yyhlsajhjis8qqtj985r3btxzmcqthp1vzqp0wzrw7sbiwl7rk3p',
                        name: 'eltq7qtl4n1tcfufykpx7d3z22ngw1c8ijy8h7r5j9oqsnzo5gq2kdjpqqnix53z3cguquxmj2mkyru55s7e4jsaw0d0i4o52sw5n26sxkeild7euwjvfu9117b9w81tv8khbwwbf0t9zvig8gnby31sikp7z2bk',
                        flowParty: 'kxph3ufxnh6irqtd24osqnxkc2qfwhyuiwg1erjd9q3alymmd6ysuxv5wz2o09nnrci71g7ihq0gy8vra05clzdb5772lag5os666n1kd0d1f2qoderwlqwzx7i4rzzuxvemtjaqpovc4862qusm62ahcsjjt9gr',
                        flowComponent: '111xepk4d5vribzmtszmytplj7zl267sntcy0dueqoep38l4ptrov4w0aklp6bp15z0ian9iow24xvfccqicayt0zieqpvetvm3p40xkewmnhtrdq77mcl10cij5wixj7xwf6y6czhesb6x0jq8e1mi3qv2yhp07',
                        flowInterfaceName: '9v1crpm9a0jdna3sjh34ojjfupludx8oil8byph2svs6ony02dk8ks4diqttttpc2b1gzyc2bhxe2v9vwu14dfxn98pebwk2wimqfjt3d4mkx1dgkzneurasyfyl6rqspuc7nwt58upe4rutidgfgzv4whwzf35v',
                        flowInterfaceNamespace: '5k7702htcd5z2duoa7s4x8mno1hbdjh7h8er5zrww6xd1jq41vtuo0h9pfftvr0zcg12muxjjd7z0ts7pam7eem41cvl2ehsukcr1gysjqjyrsrq0pckrxixlg9fkvgkrkh9iopros2c8qtc1ersxqg28r752xak',
                        adapterType: 'q1bisq107hvb5umohsymvk4trtfh0y0a28oybe6bo283hkimtju67re7nsgj',
                        direction: 'RECEIVER',
                        transportProtocol: '7c18cj00bfrdwcr0ykj3f2hdwnjvky020yn9gfrglnhmha2513ubyuyjwx5h',
                        messageProtocol: 'ovc0tdhfha4ix7wo7v2ek2d93kxdeko32eufqa72y84xade88ft3yen6m6fv',
                        adapterEngineName: 'ycefox3iqykzhdas62pxkl5fl3de460f3rauv5q52pweikj2zgohnhm79laogyp5l4gs7f0tpnwehgvecyyjc6td7gsgt8ewdi3rtnl3ad4nzi15t5ont9grgs3bwz9ur4i3qf1j1d3tk5y19mtdbpxnp15zlsmp',
                        url: '92umcp4y4ma59oo4haoovpl9d1384rrvturfosjwl8xwbfb2lu4301wsjztnnyixnxns43do4emtv3dsvpfe2ezmhgh8pv3we55ibh99ezgl05f4f194qb9zcg8gfud73fvm3h2qdlfyzhi21c8aft4jfyohlllnuy6lw4nris2tnput1cx7t1qh9jjfs1ct1xr08qjoo1pctulljqerlt07wd542ao20wbq245bz263ppbix4a3oqikd9niplb7xjwo0z49stgoill7x711oz3zqp158mue2lw5w3l2mejascdcjm3cf5cbdyq089zc',
                        username: 'bpu9exq7v0nr5vbl10ssas5l99vqjhqe9pry9iiddpfenhuld5jbbhq2dnoj',
                        remoteHost: '0isbyhd1747hn313w4429ru0tknxzcna4ac6gm2k3phl1rillu2eah1o6ttndk5ng6ebphi74ga6icyqnl2hmvqvsm68ruvc5efbyzh8yebo8y2tjoj7f1qdyxlw6mndyorlzbuugtsxi4uoo3p0ioqg9d5gp47l',
                        remotePort: 5318744647,
                        directory: '7radh8rge20o8mvzq8z6mbi65t9vopc2510gxmfpda0ccjmoiv548cuhufwlhizhbecll0po1w7462ju5rb29l5ev97sfvt7wif5d79jenysu5a2zcsm1qbz5ez97y4i12k27gtad4v4all9r9w1r9b137ekxfaq2kftmlk3dnntbwxh2wa651ongamz1c1s1h32k1dpbji2r2bsder3dkrzyntvfatwibhmclblnb3zuabpc1e23m6shr7bodvp2555e0o8uzw8ddiqi15f9dc97gd5rtgjw12zff0t5duwqesu3g92kng2qzxn08lmckjwtw0rsv5oe452ey89u3me679kuwo3jt144nzkwhph36w3vzg03q11g12zn6h5l6hnd89i9ph6jqfkdmdqob3no5xwky6xgqejwhw84b607zbvof64rq3blxnvwljsdmkckimnbjve3eajikcts6ts1xrrrwww2oh6tea44ui2kqcz8gaia1n0h3k3wz7qxgxhidr1hlxh8pdlbkdlo8n4h7840xggsa0b50wy84yz9fntig5unfvz2re48zgqfu52w7relq16s5gjno6qqh0071hrctmk9hfy0lt43c09llwm8nv39r4b3yns1i1nvrs5pggsrcrb0yyyye1zc7c997nb1ftylsrk6z2rlf28gmc5d6hq22ewzv1251hefkrn9sxchroj9fd7gtvysf275yt1vyny9apn18bqu2qwfk5lude5ypt9e1bj1qawmj5wjgaymp67irzczsnu5h6z3g0vq0tlq1xkvumsbgnuhv5shie3mr17zoo1ql7yr5f65eq1aqcol01gxf3cw0me3z1vdxfju88ughamjug9vtsgv4n99191nukppijwcp6dg766ep14qyypo0xbmmw86jpp4q4jnnfptzeqdynwsnbbxivvyckcnhgunaqqx0mxgrdq085l3sxn0w9pwzm2bw7cujir6i5bn6he4pgqyi31yznjg5344px6i9bu',
                        fileSchema: 'oy0t1mll7mbje265padaq7k0byh8pz26kyz637tojchmhmdu0ewmt9hk62332a44ugfib8snp1ezt7tgxgffwwakps9tt5av00uzw8isjrcf93jtsa4fi9xypoyrvh98n7ex8207r227l6bna3nvaln3zak353zcusrhxyjq8t695zlyz8eusvou0wxo3udbfmozavlset9bze9neghldby6rudr506krt7lw5s53xy144ggllt9ahs1zhgtm6mhsc1xssk1odf32jo84pogevx1cct056j7wblagqj48mq6g45cgvy7d2w4k5lia63njw3t6kh4jpmtsnjf837lep97ti5es64sc8z73opiigriopeiew521hqiturrgwvfirzj2hg6b50bntwsa1gxw22bp6a5rku8w5bj50de0hvvx44xux3evfcdqxch1g9gpn4wnnjclhsvj43or1e6nx10fxiyf6ludog2e0vnu18cv449n1d86m3gxsu7f0eohd0ozof8j0xfb319f3ut4ikl4gz1u3dokkykgrx0j532260zmksjh8508jopqcmhwgw3azorcvh7eukgxc9091jn1cidu4plqb1xup4sieuu3kfmc7dtv1699lxp0kdyurm15s5gohkl01ommfezw9trukicxr450q8pqka44koxgf545varxfuf85y4dfpc7uzu2mc2xn10ju68bnmlfzfhdqxro3bthdxobp03liak5ueof7gw0mts80utx5xc34xd7haqcy8bi87sjsftvfz7y0yn1qtxrojwapjhw3d5iayec7bddvxbdzmb4r16eersy4uak6ceyisnn9upzhodsk8nz31mjxkk62u68zzz09nhave5wc1vnv0673ki3qfde90yvmp5b5o9cg0hbutta3e7d1iuewwtsqq8wy03gij1k60dlxur28zllpuu1v4zgpmngbsvuwe7pl304tckxd98yn726bnnnua24gnxg8x90mtqf2jdj6hofgaz',
                        proxyHost: 'fhhe3erobq7591f39bv5dg69grkdz3m0iiuom2l9zfnj81562gwgogrntrgk',
                        proxyPort: 8864070955,
                        destination: '3bmk4xqfjqyidlfi0y80qy630t7z863ybg5tztylk2lhamcn3w2l1k3e9h8efpjcd7556bnwxim2vvau4nf7bxghgk6ub0mbauyfujzy8ubhcgpqve55c3rcbfqqt5hj9xgmjy8thafbo1nu9s7jxj5s1xdr8z9y',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: 'mta8mfho1ia91lwjw18oadeygmfy7vtzhm4gqpzhcbexeuargvjm8q95ic3o43xw3qwi3qp21os9gojx6y49sdmrwukycmbm48d2c0qzko4e1hltil6w1u8q5wmpqutjg2ftlmun9vs896kuizgd464yeha2x00c',
                        responsibleUserAccountName: '9evv3mp43f9a1xiizcjw',
                        lastChangeUserAccount: '43egbiwdyhlg3oob6wo8',
                        lastChangedAt: '2020-07-07 12:48:31',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannel).toHaveProperty('id', 'cec8b388-e73b-46ab-af87-9c4d1ef4a702');
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
                            value   : '5385dd31-7545-48b2-8578-50479909afa4'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannel.id).toStrictEqual('5385dd31-7545-48b2-8578-50479909afa4');
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
                    id: '5385dd31-7545-48b2-8578-50479909afa4'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelById.id).toStrictEqual('5385dd31-7545-48b2-8578-50479909afa4');
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
                        
                        id: 'd64e38aa-9ef6-4aab-8294-c6ead3951d3a',
                        tenantId: '1936c6b3-a97e-4c2f-939d-3d9edb63c06f',
                        systemId: 'e9d5e1d2-261c-4258-8e4b-e1334af9a934',
                        party: 'e08vce7gih4298gd2r4zgrkdkjdx7it24fl3zav6ea2rheybi1y2mk6qd4946b6jzjz88dq00swnoeld61hqkos6cfwi5hkrgiacum2tavkz4bw9vxyb8281lnzd3f0zseph2k9ppaebgz4j08l2g8mii2f0c7n1',
                        component: 'akgax3pwkfe8ayi9mplgfl0pbfqqrpszg0uqaysix4ochlggnfh5hbc7itmlpw94np5cms9v65onpkh01n6ud1rjfc2244v9magvlfr6lfae6ng3oi2chtpt98iskny5gdradj41ggh07inj30bq1vngcxsc2uof',
                        name: 'un3zzm40q3szdbzixchlxvlwfwm79uw46s7jltzd7r8dp102ta4ubykmpcrj8dm62hojts5lttkhlbfewpul22b74z0nj6i2ofi3vu4n40afxoco0we7aitrzt19ezvisdycv26t9gxzfg84ahlm9z0ohpicg9j0',
                        flowParty: 'u2z330jhx5dldwh7ntilu8scv3e8ahawzqnbxo6b9ouhgu2pmfcwxrnrof2sccfpb62hs9xqcb95pi9gonk7ttyqgsavpo6prrr379b2fpyn6gepehflxy7jjegz7k99cjsrbrq0bvuors5pm3ctkfdemgkzkxs3',
                        flowComponent: '66fcspbpnjd8weegixvgr25gxwksavlyu5h32jwvt6lo52cei0qxcoh9ep4oq84z67c4hwde79q2gfq7vbodrxktptu92303ty33a32qj9rzkval7f0ut2rik6lgceohgm5nhfyybvc8smu8l2weakkhosf5gkmn',
                        flowInterfaceName: 'acl1fwxwuw7gj8yg30wslivqyu11bub9j6qspwqd7tntenjuq6xzp81vh9gyxv713b0hsu7c2jtwff8ws0mf1sqtfg9v01o6tbcviw0b6q3vna7p2uqmu8o8yk9ozezl34pqmo4g8b5cvm4078p3eobr4l84eglj',
                        flowInterfaceNamespace: 'x4w04asc82gcbkaj2gdsoub3dsb3ctr9qcem2jr7mul7hn198l5o1b724u6wzmxnpsudbdto72sxl4k7q3szxsvenbbnb2u2v3cg6u4unt5svpptj47ybovi1us3780vu4nr101mox9mpi61hep5k8os3hlcbvio',
                        adapterType: 'b9sl873nrczc8tjzz70tsl012bfybst822liuni1uj467tenrf926kep5n49',
                        direction: 'RECEIVER',
                        transportProtocol: 'lyaxj3ccgndbd0c0ywcmb09x27rfi3hziuob0xqgofx9pb9c922zdi781ceg',
                        messageProtocol: 'crnif7vd8hu162sxi44th585mbufmgwpkmk34co6fm8wbykjof73i13zuiv6',
                        adapterEngineName: '4tkcj2lpiuxf850zgwdwh55hg0pox0h025svfecvsc88s7xzh8q7nl224722h5a142fhbemrw60jf3jmjiaifqg2aye71j5j83z48anf4l5z9leqc3zsom376anc8ya380utz4xbbkpppyln2stokg60c2aztsjq',
                        url: '65v0c6evgv1qfj4eeecb7sznrrk1ya336s50xy2bs97i6jmdqi9tnzkkg8ff96f5jhs4eax8lgguq0w4fwu6pmonbefgcjwd95sw23y4wkd5vsd9e3iqgclqdy3qyrv6t1lzhv8y94poafi5lrjxwrukjddzjm93dchrguwvzf911mx5t8hwmsimp82u872pm9nz4v40tnwd3uv56ourywns68igl7c0wzqknw3irz1i93d0sv39r6m6hrbdwlqhzajau8emx32c6wn4p0hk3l7caf0korcrk3yo4yaiz3ous8kf9abjohcqo5d1ncwa',
                        username: 'ujyyjbtumijx3r1xq3edz17u6biwss7dk57ik63lf5bqajtqmir6unonekrq',
                        remoteHost: 'p0w13833f00pjn1rondik4mev8o0x6jv82r16el1u2y6whihuf6yiki2jbgiwlqng3pk5wwr5z08m80d5wltw961loidjgc1v81y43pl6uf8wxzgvp6zn64qgvvv6xhqxvlz3m01f3ceci5cmj34pd6783fg7w8t',
                        remotePort: 8000099816,
                        directory: 'obzsnvx8wzw40htfyjpgc8qvhb021k8h1fs1p0h4dakt9dyi928sh95njnd4mo4t1btj21fbgqsv7xhjh4vvjznv4gg2jbu1x587tdiqa8bf36wrsrc1oeqj1jwvqdo0qzbitg2aqsws3v9d8673xtffmzug45eu1l1b7zvo5j5b3roseyai2z12zce6kitk8l61d6h7toaoxal7uiva5d6w6wt2l223awtfmysezlfaeb2n9hw6mgt3296ljbrsj7th25sa708c0rg3x8jw7vfkpye9y297ie4j285mfu0dyrtaxg6pv63xnaoi9hny91capnpu4njz80pr7fuhhg18pl8rb4xv0enscxtg8w1bqs878xkkhfppwr2bo0glvdq7nh4ojiax43lmpfigzxmd2vylfthuzcg0oz4sh1d5juxrorj05x5dopk38ylr9xb3rwtr5cjpz54o55f965xvvxd5vkrvb150h39f6fhfoxybr2uwfzca9ondyncndu9dwtx0jpa9h12ib6g8ia7r2jgk44ivcca1glquqcos79xy04hkbd43amwpi6xil7cy0lsks9eqmpa1ajqo23kkkt3dx3u665xe0008ja59833k4komlgazs5dtf8fsg44hgelgr0two1yxebiu3q5th1xkr2a1f0ier95ulb47lb2k5fm5313iugo50dyaowds4qyjdlszn4ph1qq7fc2nntr14d0sw1zs46o45pr9og37v4s23sw4t8m23luu1td71r44g3x9id3kq8hyvqwvtqnw51b6k9v3w2wu2yoqst6k7bnuv76frvlz0dupjqwnkz40rugbisdpjzdpi4w28snneeimqdrjaz6vxzz2myndguvpk6usrln5du6lmrrwk998l73jefen4mebsxij92ikrdbv3lup0dw59hquxx3tvnmfyq48hmkrxfr4binas0mpdy6ky71higz7szrr5jdyx2bmwsqbknh63fxfy49cn6ktum3rtmmd93fx',
                        fileSchema: 'l9dq9xrqe1ks68titff2qkvkrdbsvan9s2wi36kwnpfsah7y5favv1yyaob149m9gx4orv8tnge92wul5gh55e0bjnu34stfmmync1lnb53pc3h9dujesz0pb5bkdevrxaoyvykeuxxdxa1pbj92b1y2fldh0lvvh1hxvmevvejtcs2si6eodjlqjsip6d22y7mavfk5t90c1a4x0w8nte023fmik9z0dksi4l4756ynt3alph2hk1cz3pj8orevn6htk2c2xmzm0gso6751p81sc4l7x9excu9kfgllrlkdc1j3p93qeh0vcx6rl698vgxqr3rk075ldp50mjmvetmprssz2imhszilyqqja0mz1x71aikz6qn5kabz6r13t3ai9tczdxxsec6565y3hub049qns2i4cbybnddufyv4zvm2r4yz0loor45a8epvqkl5e7q0mxnn6f44bmojrsqtpd96nnoahwsir6e6y7u8d3vt03iqbby8flv7ii7g2o403jec7oz6frsoqjgzj77no6bif7qp8e461fnhknsytcq0dbnusi4r38pxvjg0whcmdv5ivguq2frxk7q51jmop9jzdif8pevtgesg1u8o8qzqz7l4e3jnowl9wz0eu5n92mjkttij7hc8p3yz4gr25yev27rmjbr5h3ac6y2znrsigto6w1zd4cxzmydr0f34nrjj84j0jcav1ze48ltsr9vngvqs6vujd89rzwyjtel1cs4x1kvjodfi9m1fpm1hnkjkptxtmh0rqd7dy98v6oj270w7i1zgzp4kkifzdv7n6113b1oqtzdtfu4y2kyn6d7wcs6h9rfhsbh7arjc3lue070dppwjco7cc583tqxueh3w1xl9imtr0vr7uoc41aqul9cf4e5xjp21jn0kyu6ecgm9y1do8a7tt4yh6j4adq0nee4jypfewtbmuf3xbd8mb7o5vbpm66enre0ndqnzulnv4vjz1k135z8yq4src306xwspqdhae1s3',
                        proxyHost: 'qo4foalkbo0s2culb6l9ul8xnbiznn83xs4l14u929uupgxt0no76blzm1j2',
                        proxyPort: 3256017729,
                        destination: 'otoooijhrkrmropaaxbye32w69vkt2hrp5h2h4k8z6aick1wwaxcoylorpad8ftuq1abdpdqhww5e0uxgxs176cd54mwaq36j4h62p279fcuw8g150acg0d9xoibuayrx7z0ceqegfriev8k37szzo9wpu5wqj1e',
                        adapterStatus: 'ACTIVE',
                        softwareComponentName: 'vc91rpub8m7dh4dvh2m4to99irveo85ncqb2b4e0c9ut5gaoh1ufxbx5bt5vvhhcgjvblbsoi4jylqiu84w4rzf9zxs0gkyjk0bi279j27geueaerghbw70aogoxm8pgg7zfh7kcuo1229ad6orod59qf8dlapp3',
                        responsibleUserAccountName: 'eyj9dm6kbffu8uwe54a2',
                        lastChangeUserAccount: '5xuze07p508pggwdtlgk',
                        lastChangedAt: '2020-07-07 04:52:22',
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
                        
                        id: '5385dd31-7545-48b2-8578-50479909afa4',
                        tenantId: '36d23852-dc7f-47cd-8244-16b4f5e6cfec',
                        systemId: 'a0dc9ac5-dfdc-4150-aabd-b88c552926af',
                        party: 'tgg89r8mhid372pf6s6z8b8aahcw4frs0hy34s6mb46s8pf8tzl5lwdj6bk14k0ptib0f7qk84esfyh8u18xtp5ujprzh384oarugsea5zc5nh9mnl217wj4z0da24pjiyd08yvtfkqqk8jw30l8g4lp23g1qans',
                        component: 'k6prtlnhezs2h0cmzfci9a7y8eoealvne57l81mnfzndyjpjb8y097ijvv5l0t0kl6o6y0fqdvgsqd17cbpi1h6bxkkxkge6wczg7flqljrthh97wuepcxbsp1ml7wocvpea54msw2cwmmfc0ggi54u0l3rgqmd9',
                        name: '6onwlxcdod73ciexulvnizdormmuwilrq7ihhwrk99uwxabwqfgjy5grhxexcnus9c300kbdnoud8ikd1iylach8rr7pgcjwwp9i9oi9ngv4t95ctwgyeguw74qiyf22hzj9st94u6bi0dyxiu3w4iqj7ed9za76',
                        flowParty: 'astc8bsvzzfupfpk9zv7mnjmm5bopmdcg7gkg46mabtkhzl67w5out9s9rthnqqxzova97etw4hoiqn9zozotdy2pogtlu3des5hrhqinqqlxx3u80bgcq4v91bocgm6wf6izpz22doy9emos3aswf7maai1acv6',
                        flowComponent: 'u03p7uo3ab1bewnm7k6uellfypah0vbby1vsyf3u5lllwh7pjixqgzmowy1shnm8l0hn7glysrq1ukf2eiz8d7v010n7qglq6kpjmowblz115m46wrsz0eodn580lxjcltxfcrfzvr2icbgm71k1x3m3mn14hmwu',
                        flowInterfaceName: 'agoiwgvdylh7xyef5823n95vb132eqf2fjdmpr1b2kjkadcfsmctszkb9rpu56ca9b6u5t0e7nrzz043kg8t63ujhgpndosexn2ficu8ammqe1rpmf41zt0livnwczog1lswtdtb4gyxb4ndq39xo1byp71egpqs',
                        flowInterfaceNamespace: '4v54f6z77utwxj3i2gvesmn3uw9mqcksd0h0b4wx443uqmg4p260fhkguswaf3nnmw1g6z17vnktbzx0huif9du2efc7ebeyw1hr0m8swbgerdvj9wtfy58u4lcml1iqde00sawbs5r77v9hhfvgtmg9fmo0htek',
                        adapterType: 'ss9zbsb1sgw1nc8v7rirk0vpe70e02ujj0oxm6ns5ejvj1i9fly49nk46427',
                        direction: 'RECEIVER',
                        transportProtocol: 'dx6iqe20y6b8ha5yvsel55l5fo4yo7jk6glo3x209qmvb636oje7zp1yfdpu',
                        messageProtocol: 'xwrs2vojrr2uvtpmmjgs3hk8ymf14buhczl8umtrqbcmfqwhjn885je389v4',
                        adapterEngineName: '03nyl0r44zj0ohdvy9qhdo3meptf7tm6611rcgb7bamyl1aad1s5cr2d6cgv0s43i3th3wesatfz1p810zq2c8f9ntpfyc7abcgcd3t9y600i88ckgpfcfzthcu10x5grdlgntrrsmfxk4bxx6ou29fsgf3m8a7v',
                        url: 'uzy0asec33erd0p0eyd3918r2zxnknp7cwmy4qmlfp82ykcla9lii37cpzh5gzz17wveg3vnr0912114oajn0zpjbxuhd18o3nu7908d4c0hgsnymrxy1e2b4zqjyvkmiuh2u1k9se3l7telwihr7bl6juv5ettp05o09xjaiwwbfpv8u5pdq3cjmtfin582uy509eloud7uera7vk9u8xdg92sq13ye13kgruzguzxgkqmw2352ldhgx89gyh9x4duvsa0qxe3lhh0oi3lnee8va6672li6cl85peq6ck7tdineqy8m8b9j8jhjrwv7',
                        username: 'es2z8qenro579i2rbdd2oj0s058pk98rhwp9dggl1lrlswwp7che8zgtjiu2',
                        remoteHost: 'vii0s9uplbncyd0lrdxs1nv6d0m7rfsq9fz5p49eb3usubh30244d36r3z8mlw6ehr80r2c7rl73t3q2kmmijlaytpa4bpbitdokilp07ty7hmb0thhlsl20lxa7wyn3ypalr661czzaxwdcyd3bticrysegdyec',
                        remotePort: 1490001564,
                        directory: 'pyu8wh2eiwm9zze96bc3ujiiy0gb2ftsnj4zby6yfgl6s8wyio0m8cy0m4qmy8652ykj165qvhs901rsytioe8yfuyxewpe87l9fwmpuk5y5elh6ghhcwpioueuuc79wrdxrign8i2vemeav0wgu2u9pnlyij7g5xfec7d1i5ho0x65yggmbk3imnjnjlqian4y6vbagvr00cbjnsnkoq1slgvz6gv8rhv6xiu6dnw8vqgsk4bbt83yjntyeh44uj5bla7chebvf7pqtxmsnpcshs4wn8e6wef059voseh3tx9a2x9lhmxup5v5wkjkolebqvjg8u4twvmauk1gz5dhf3o1zgmzy2zylwbve8fhceyz3uekuqhlz2scbas7gifgdlioj3ziajt7obr1e532aqof1cbiq96pna24p4eg95qdc1ketk8vrd2he6lhi9qkyt5w5hqfze68zcolefwaie9uqylyig8e5wkwwm86ha5q4wubrb5t7g7ovp677d8wkab1rjai0qb29llax0z4daqphxvh5lezd9diypyp0fj0s82ap2808w1zvqrzu1v2m0ggynyybrnuapmuoz3tdhpm2ukrb3ssr49ztmjyrdviam7wxmodpw2qqlffa0hw7i98s60a2g7prn70uqfgv310g6q4qo631gn1awrz8o7rybcmvx8lwr36l3x2zl8nhkpshqo65kfx8ee4s8mhbquv07itrnopbmzobk8optutpooeghvhj9p9tfpsff2h5v0ntgzg6d44jb4ne4vb1ytxwhtm6apoe6wxidd9ixma4qkqhbaqwbpetdgksmdfknkzsfp8p55sq60ztsrzz5jyv784kt5xymk951b0xna1brlebwvc2p8w5arid332q68a2fjnm1c1j016dw69wsqpzz803ggyr2vw03lgdizv05i971d3ys80s1tooe51yvn4jdgvias58cgsouu415doa5a6hnircfrnhyhlq70rha2gna9ix7c6v606h',
                        fileSchema: 'pqn6g6cnntkfnhd74j4h7eak2vwnqm49vhvaui7ddkmi0cw9yv1w2lbchxd5rdiqc93gfnpdlv6hk09zxx4p8hckiuwwhnssritwn271rad1jyecgovftosvu6ki4jhzf3ypv1y7nwvvf4cxo4lo7x8ufjri9kv2kt8rhj67sjjvrx0204z0mkccv2sf37xvzyasds0e8qs9a782x46os06npink3l5cwcyv1a41ifc3du7vglpn48lfgkzd8e0unu01nqkaalqvmglw32055fvz0318avjn5dg4p5rnb9pjjeulz6y9wt7t567aubgj7dayisqy6kdtaukuc7wney5b34o2w5a23ftd6c8a5e8gb1aomohr0ka5lwrht3cxs16m74ufzl92j37b1uaedmmx921wdb4nozd0huiftisobsngpiiosqrth2skvq4v0qkhzh7ar3e5z21ptetz1wjmfpycyv9f1egj6vvwondr2x34dts4npgn7h2i35kca98iitvz2ebe30hfyto35vc8733q4njrl5h0svzn2f4oirmb63csyr64ykfw56nlbuenkcbzay3p3z6n7cud6unsaigayv81kwc2sasz71qweyxgi5wh128z60mq4ytd17ki9pgvbuam8euti562ilaema2a79mgghadayqa49hu7r5m64gi3rfhs9hntpcxso4lhzyhla8p5ovd0q2wtgvcypqr9j8q2jgboyvaqz7h1tszbrmtqzrtbn3yysp69b2eppai5tgzp6x6d9a7x9mj64jfp5ossc8s6yxdenpwtflwi61w9q00njln4lhx7xac1mng5a3bkwc73wnlskkjvqiaaoomotatzzfloqkdtphm4hnaxpn762g4ru1eidkf403pwgm6d4l3kq3uvvtzdomegpiye06gix726hhzcteonf4hwh66bp331vx5u99f1pb68o127wv74rgb05gxzo0kuie5l9rq5bmx4am9xqntnoygn7v8clacg333',
                        proxyHost: 'ozi94xdb401ns32b7l6ymdodptjo38n7yxhf89r4e7xm8bv6vmmhgu66xxds',
                        proxyPort: 7712920245,
                        destination: 'fo1nic4lsyext7ce1acb2gp1h3u2nduc837liu4tct2ei4ufel3d9cdlsjo8p61w0udx0xk8oq2sbi8d994yccbamz345ne59qwnnx2ozmh34le2t5tcr2f7ypd8orl53ivhdtjx2rbs4d7kgkoamsngpr8exzew',
                        adapterStatus: 'ACTIVE',
                        softwareComponentName: 'do2y047o1uq6bjvpmuma0y5ewjnln257521jfs5czki754wh7v8c3ahlqyy6f7ut1aogysc2kyqyzxf938kbabconudn63eva1f6o24pwfqy1izntw6ly0v7jnd08jgtz05v19y3a8o47ivyoty6e8f0ddzm47kr',
                        responsibleUserAccountName: 'se0uqg2hug0kwgf6uwn7',
                        lastChangeUserAccount: 's1ng30mt9zcr6mpfczuk',
                        lastChangedAt: '2020-07-07 07:57:13',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannel.id).toStrictEqual('5385dd31-7545-48b2-8578-50479909afa4');
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
                    id: '5385dd31-7545-48b2-8578-50479909afa4'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelById.id).toStrictEqual('5385dd31-7545-48b2-8578-50479909afa4');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});