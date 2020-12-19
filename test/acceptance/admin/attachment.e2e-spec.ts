import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAttachmentRepository } from '@hades/admin/attachment/domain/attachment.repository';
import { MockAttachmentRepository } from '@hades/admin/attachment/infrastructure/mock/mock-attachment.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('attachment', () =>
{
    let app: INestApplication;
    let repository: MockAttachmentRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    AdminModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IAttachmentRepository)
            .useClass(MockAttachmentRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAttachmentRepository>module.get<IAttachmentRepository>(IAttachmentRepository);

        await app.init();
    });

    test(`/REST:POST admin/attachment - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: null,
                commonId: 'fab65033-01c6-4b3d-85f7-7fef092e475c',
                langId: 'efcbc1c7-90ea-4bd3-bf55-cba1b0d94b02',
                attachableModel: 'tmo5m8ralpa6s1l3vyicnv7ln2i3vkgwdd06rinnfcpta2ujmqkgg52k2k6wrnidp908iy4tgsl',
                attachableId: '1ed8b8c9-5995-4a64-9a23-d34265309f54',
                familyId: '5fedbf4f-7952-48df-ad14-8911205a3daa',
                sort: 108038,
                alt: '8t7qpltog2mftrt2exuam169tlfjeyhck8v7arc9s4w2567r3fi3mu30jmna6kq7g9u725id63zpdyuflwsh7fn29olwg7p5qh5oyz6mlfodz8g7cv3uvwsku05m103tm90u2lyobb118lxgmftkbs7agklpea1v9u2p1u7dukvs0ocn4h0jkgpav00kdoaslk32993d1aphno4zfkxwjtr231fkwzqwyt3glsl75q7sc4s26kze19mjdhdpun2',
                title: '4ik1tsy6yysimo8n4xoy062zgx2r8ff57x8u110b3czb0vln23jhqgp78zzf2g8y3zhp7nbzcjbuvosfti5b6eoa4gma9ofm0tj5ii2xdzza5tov8r6pzrywknco2hoh1nlxb1x9zfqescew04o9noe9x9cebmbwtgh287sjxevktfqc5esr7zcks8u4jsmaxz7pg19ceerfsz81esuk119g0uro940oieu3ckizqp88yi54tmbhcrtf1ws67v0',
                description: 'Qui ut culpa aspernatur aliquid maxime. Et aliquam saepe accusamus optio. Sed maxime enim et qui dolorum est. Atque et a iure.',
                excerpt: 'Omnis nulla repudiandae illum. Animi est reiciendis eligendi dolore laudantium doloremque non. Id eum suscipit est voluptatibus.',
                name: 'yyltm4lxh11cizf4dnyodhkb4f32nmhivfkzc0n0yqiuqzu5kv0p74gj60ezjiyh3m0b3o90f7khiaea503z4afgravm25yymazc4x52581ed5ghfh71apot2qny5dhyykdpfmrav90kw4v8fczyqk7a0qqb5mwvpr7joad6vq6a1sbuwwu16nz3qat62r7m8hh3hbdcm132vxuu2ucwnvzjrpmdsmow0ng24azwks33uxe0f9kk4ntchbvc1k0',
                pathname: 'mtsbsu8lp5pembpezmlb208zbbl5rhvfz2b7rdxmbi8fwj5z29ris0jbp4hzqos1qa82pxcff326pwyaqyc01b08wdmepb6yk98j2qixkz569xb5gye7ndujz7xgflkfanddxqn4wq7fc0xcfh1ivvosyllf78z0pujt90fxch9cge6w2mcld73iyuvtejxczdsxahr3zrcoktnyrc90n9cn41csbn7jkffrr7x5mtjg05frn5nh918e2wnft7t8yw4ng284xyyk9yn5k60u0hfffjcvlin98cl4o6xquf9g30y1w3csv9deh2gu1ngqobqyj0qirs65l093cvviqhh25s5dr9xn2ydwbok0t3izrdie2ymw0xu59n519nhulo27m15su9rr331ri9guw4m7597pbrmzh2izk5saafh9myln1a7dt5ltzzibxsfgw3pntowpysr4agzt22l16uc41acpw1p7tqpeer7a1tj6tdnvbdcm0hqskgaudnv558efe0yfstl9cypilmbykyl9im5lhqn0hoh0lk6eaktyo0hvvicqgugkvk17m8kuvqhh4knlwzmllrc3jpofwbttj9ebjkgeizhq0wn77hqg2dx6c2llzpnrqq8hkc7zzaa8apeblbf9wzxlduzf7if0cr55f712i600poef7zodcy7j1xzj9x2t63v1fziz1nz4ott9xbf15vrns97jhsy3y8ksz61jgbbbxavtd91zog4s897u1a5n4f32mqv75afl5ihwchomng65nlim86ejylbhr1ovv30oc4z375q6h5l0r81j74fib0lqtfharhf8zufnquu2say55qr26prvs10lezrm53m69zpfr8s3brtwoelti26bntgg32uel8kd64efypu3i9s72wlge0341ea2vovnulc40afov4nbit7sxkau6vrxtr86t7vvowtxj496lv4amuwr8vx8tx78q0eny4yytxskdm7p3i74c611o4mzudetgoulk4jf',
                filename: 'nmmu3ehp2t6t9ntjefla7di5w2rjktr7t3hm36sialptt407k1fxsb1osyde8vuz2zl3fc1ldwd54zjgo6loeyxrrmztuqzz9xok3uz1umaosm6km3i3xoi27qlmgguinjw3lwxfjc8bllyh9y86iz9igedge07pwvrucin0aidqxhydziuknbh43lrnhtqegjzc4jblbp3e6il0t26tni0i1i8oa136ylw4mknbllp00h8ro2vzh53fb8stdjm',
                url: 'imnhb25f41r59x9a2rpq0754ufc7ixwpoqlgc747e4nyl8h1iwhhlmc6krq6vse0e32dl75afjzxl8qcgbhmmgapt7lrct3vjzgbc5ixyog4z2s3fotaluq3vgv86a3im27cqvicch33u2317w7cdxkthq5st1izw2wcndn4z969as3nvt1wle0q3llbbo2e6rbgmefglc4z8hcfr8pm5b7gwcx0mbjqtruoa3rmgc3qx6htqbwz2pkdkepk83u0whhhp7k44c13gxj69xydhvrqynts0ydz619cx16o8wfyoyoc1zpnbdzglc5od6y0boqs1vqvxzlik6vco79ozivt7vx21705ad7cky9lt0ssy72mdonx6jbq61o6ncn3o768tppdo5urp4wma5s04a3tfn6th3we2wkvey83r6ba1w765zgyb4cmvegys0y3qajxrk8q5mbm30kokw69f7ws97xfmukqtn1sutoj8hys5ga4zk8gboumo8ixb72k7q4erihktiph0n7hoct0sfxmblnj7ci6ehnir2toi0pqw6cyoguylvfqiap9ozigltzdvgxrhyaahuf3id7fg5dh6kj9nidotdnhm2hygzya8bqj5yf78ireahmnku5tj94geejwde2mdiwxwu1p6eoxgglvsgta98w1rjmcuq2j9n8aiudc025mfkaha8qk93ak9hlvcba4km8tbw9nb62fc9ihndx1wdribmkx516ntxpp1tzrb8s8w0xn6w3qavxnca7fcs25g70bu57zqlpl0a4s2in0xfrqr2h9adzkuflbpme3v0rioqzqiv97c0mu2r286vzfvnonj32stx6702uw40o921n4c4ieh378c3g2s3woy3bjy352cj78hmxtggxbllx1usi3wwc2qnjj0es4l5cfbcjdbwedru1zn1j9kk3150e0p8jbwc1pmufoja6izdplo61byf9ez6yhetuzjp4nbtn7dnzdvd0prhy7j1lxj15i7e71esrp',
                mime: 'yewgo3isbdn9qt857xo70zfszq19fg6z893ssytkpy4k71ir9m',
                extension: '2gp66fydlib00g3r5j4aoxbzql1dmve5qdduna4o420x2is47c',
                size: 2335408992,
                width: 443337,
                height: 578050,
                libraryId: '8e77604d-f2fd-4921-b54a-64b34e773b01',
                libraryFilename: 'tv1z4psa1enfgp2efkeemfq8izzv29yv4486a47vucuet5qwko7t6m9bolstoebyzed7xmbu3yl364h5szoumczxkgwnt7bsuopaom0ncrs437euyhdoknrt8r80kmblhsn8avofxgpbpafi8uypbu47sn13hclxgg3nx16prox2i3jw0q47qqib6mffuhkyokohze6854kbjiazd4b86jfkihquyer8r007totcvsmnr63d298x3r8w4mxjwt0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                
                commonId: 'fab65033-01c6-4b3d-85f7-7fef092e475c',
                langId: 'efcbc1c7-90ea-4bd3-bf55-cba1b0d94b02',
                attachableModel: 'nb49guxkbta7bts9ivq9xh45jl5g4nxm662rgqapza7vwglc0k73e6kih21vp8pbyrriojinjfd',
                attachableId: '1ed8b8c9-5995-4a64-9a23-d34265309f54',
                familyId: '5fedbf4f-7952-48df-ad14-8911205a3daa',
                sort: 951112,
                alt: 'gq7ojtz2lnhfql64yhlgrzzhkf08hf1bz6i3jitnk7deectfy5wq9v56pz0oazypyger5xfndujpsumaix34f5abelb5mqawd6t7ljd2o13u4h8oyrg0xpy75qz9ltlw8l5uaa8fjed7gw1ihpgtglyawyilv7dzqkqchyibhxs1mivy9xxd6onwyliyhar5fel9j7zth27pf0u1wusf868d03yxscyvq3r93tincy67w8zzantd6p8jdr32msj',
                title: 'pca78mgfgphkloavq4yaa9bp2vymb2mkzq0p11qbxhn9g52ou5q0a2jgt21tjjsatjbq88511axayxv1cgbf7zgsb3suyglxtg5vuz08l85p6gbsxs76rzuccpdgi4nu44fhez05f4j860ukodud6d2y5oe32tcd0xy6zzan37mfk4bbyvybiqgz7f4nonce7rcyx15xzslicur7zp1686g1cj02xgt93lidksf5n6d4ofa35bkcs8tnvlg4lf5',
                description: 'Qui quos incidunt aliquid soluta nihil. Et ad eveniet facilis. Et quod excepturi voluptatem voluptatum nulla perspiciatis doloremque officiis dicta. Ea non in repudiandae corrupti voluptatum dolore officia.',
                excerpt: 'Voluptas nihil consequatur sit itaque rerum excepturi animi debitis minima. Provident a est dolores eligendi. Cupiditate totam impedit dicta explicabo qui sint. Repellendus odit est omnis ex veniam.',
                name: 'uks3lavc4592maj5lgcjad6k52nygl5wnkh05gmowkdci53tyd1e9d64e55hwjw7dz6oxi64cgiqpu6vbpb66kj7lpbodrxopu8l6e9jqpwfuac3szorl8s93eijuv52kw0mr6x022rv98mm80e8miigwiqpk9k3nkpi1kpm9xy8bwupzp2wzy0vzj8j4ei6zmb9uiihijp0os5x43p6d5gz7os08snvoeoo4raiesdp32m77m2bu16l1996zrq',
                pathname: 'qbqazdpn6u7wbnvqw1x34mh16zr3wnxu7xk421b1ywk54jch86oxki49jfs017uvg8ouhd5odqjj5boso6ta3612116b28qujl0lk0hdztn566wn0coe10yjof2p47tp90chsm090skn3hoxtfhc7a6aeyawm4ttvbaoug195vt9dj1ka4iggzlwgad91xt0hlrqjrkem9ejcd8gp2s2lmluowbak41do72hhgnl5rosi81plb4gb0xg3zitd4hszcpgfs68wew10xovb6bce6lkx5jhywocrvr1md2vwhj6ooz0u0s1knnzhbs6yp7j5sllwkwv0ses916519e4fx1qfzi92l4n0akc3a2h4z7dcl6n5x5cnhcpll1t47zj38lfiwc63im3t44mvxc60z36230mqjyd5ikg4e2zf0f4o4n5w8yujx2akflq90jb6u34h52t49i5spvm67v4nfyhpsa43gpyd8cwnu3j5aezuqmaor4mhwtopxrvir8o2m4llsik72uvtf55ib5fradwwnbogpx086qcwg9rpbk9z6ruuevsbho4sw7zfi6rm9ar0amskyibxq7a0s6p70f9e15mp51ohinb7urks4r35u152q9u1v29fhvaj0q2598wofjbik8vv5idrtxe3ctu8l0l86p5u1jyaoxwyuxk87b6jp9n2tovtc1zfhtmqtnr90v448xu1gb3wp0owb8g7txp76j4jkj4p64uoh79yb0fue1mby15gvu5pfp2xlqtgw1jgvvo3alv01esh17cd700a5k9q375q3nnq0cio5tq64gqpkv0yvt3fmp1p6j21jfr0g0ygur1fyzxwdkbwsmft2aplhip6jwhd34hij3fbjohc55nfy422v0f9uvm4cvwoahwt1rlur02qijax1jqf4q5e5bxcjxhvwbo4z90uf0fpqio0q6fqrhomargm2wlg8y6yu7p2j6ky4klxle6xwv3k21ymkxpr84l1x4aic6xh1a49xskcmr9',
                filename: '9ad1yn048frz14cla4udpjcgum57gc4oiut8k3dkthn337qgm8em5xoftjxygpmxrzfjjqxgqo66ixifulslt8b27sarqdv8fgjqm8ixo6r6amo6ieqal602pu2f19pvs6zw38z2e36k4erdv02jnac8a4mdoc1x9eexmwfxo38j609f47o0x6ic9uw1gwdx3jac9a5oixl1hiftfe5gjxe9nmda24ttuixz0oc9k05z2x5lhbw71ptqxkbuh9c',
                url: 'oqorzhxayfn686nwr71x83r4x8um6bdg4dj9gie9ech2mlp1k5fbrygiqvh21yk9bi4k58altym2a30d7s1xot0xsbupdnvlsrwqejinuv06gihr1u7yjgtnqccmlq1m5wpx9lx63pofidw0i0zedlsinm6hpwp4dixmivigauko2getc9h54t7a51lyhojqa4ivp2hq2h0rbxsc2jxrunave7a3mz49euni3nftukvp3p9g1y9vjqvdx3ml4cm23snzmhvz09089wdt21c9xq7tcd56wi3bmzfwq1vxjagzn1op47g6nzrx67yfet59x8dqm7sbthy8slae97van2ni0mxsp4eqyfr5qcchqrlfmbwf2nub1shzrmvkzy3tihkvp0zcvh6fl5j9s42gvrg93j1ubdzebvih6jdyh3o5gofkwf7zmz0wlny24m4v6430ba85vyvn3f2jj5sabnxpwmzair078241fql4xp2rfcjg7jpf7n383rt0231q3nq3jyyi1yqbngdcq90gyhs72gm2klkf63oifwt7okwgjjx7od2j24p286fhss0qazd5v0hi5r3d1dwbypndfauwgousr6hmyuvcwygw3w0o45neuxgi43cyyrme2a3z905tdk9kpqsbudqvaxmtb24j8y6sk1d1x2d771nwfcze989v7dmvpuizm6gepknadecok64mfst7dzpwadhixonkalsu5e1rb5q07uptphyg8ln14p2gywnb468xlrk59ty9sv68nzgwdu9obxc01s7i1nvmfghf8na4sp6b217a9wa97jb9n6rh5ksvg8aqo3t9yiv2soyfyq4gv23zxqpvzfefz72liy01qxfwuiej6qpqi861yl4v8322n5jum5ncwvo9xptest4tml4uqk103irgm2n0c8d4juz02c4esov24d4hnyiaj685aepom2par8eiqpoy083zmduydlzahu5kk1bj8x8jx9cq2k1w56koh47icw86yytz3a72',
                mime: 'pq4896gdt7dcaz30u1dt3r439rlxm1rehl28401oxbt50oizyo',
                extension: 'fsgcvv6kbyowrmozce9hc5kr54xrc8srjo3pg2owp5pxpodx4t',
                size: 5816304313,
                width: 189397,
                height: 828614,
                libraryId: '8e77604d-f2fd-4921-b54a-64b34e773b01',
                libraryFilename: '25ufdqlzmtvfuar2pr3gpzv5nsizv912yhhag8cb8kavl8dxrj2v4iyplbq7ful4mqf8tm4c5k0tljcegn989cjdukjg18qgicr4n4deyzl3pu7j8k2jdcut1i4klzik2zef2asnifqblyhcxaer4nzjle2edaol5iz29zvnq3nvnujidgjn9ffyqh09h01ywoszrwzgnkmmp16u4g21rzcofors0qhrf4fxitlshog7rzkys86d4tfq0z23t57',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentCommonId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '0f7ee8f1-7644-4da5-b53d-e03cd62405fc',
                commonId: null,
                langId: 'efcbc1c7-90ea-4bd3-bf55-cba1b0d94b02',
                attachableModel: 'tf6fick3qumwdtowrqegsjaj6sefxlb5oq2qhas9ei8yeo73d5vbmlxoxerdr9celh7zukiscrz',
                attachableId: '1ed8b8c9-5995-4a64-9a23-d34265309f54',
                familyId: '5fedbf4f-7952-48df-ad14-8911205a3daa',
                sort: 240232,
                alt: 'sr9i2y4u2wp9mgv5repp58b5d4l24a13je8kgx7wi2h8vv3a2zkwd7t6va42ljw7fjh77qaiqx3x5zdh80onafl1pqwxqemqn0wxt0wkw2wjkogjkc5wl9t0lhaqc9wbtvxzkmp874vvbspn30fl7fn9crl6vgt9zviwadx6ukomzfpknu7zhierc3od53b8xyb7sfbqn8kquno2lwfkr3j23qwabe5if27nhpwytaoqd33vlifrmrou7oq8wwj',
                title: 'v9p5ggu36fxo3mq2qvblfaa8ntz0tj9fcqt3989xpiaszctrq9o4wlnktcvz38g2uxihutf8jdol7l7vc0imk3urd0e6mdlrrozomw7o8athmtkndkkcir3w9z05xpzwlspdgx25v6os0e3s703rdmohkyzuth9t8wj9cvgmu4jblk4498237e5cvhozt9wkufcvi92lbjya9pyzzethvqctmmduycfofoebamdgjehund6ldu9asmcomhw35i3',
                description: 'Fuga dolor veniam eum voluptas voluptatibus. Totam eius dolorem enim et hic repellendus. Labore vero omnis dignissimos. Illum quaerat illo omnis excepturi officiis ut. Cumque ut eos commodi corrupti qui. Ea perferendis non repellendus maxime officia sit.',
                excerpt: 'Aperiam labore qui illum ea. Aut id in adipisci ullam sit explicabo. Accusamus qui quo vel perspiciatis tempore. Similique in id aliquid quibusdam. Ullam quos modi laudantium vel aut.',
                name: 'ez1vypjchp119df5bwhd4dml6uxc744h01fztra5uwkjyrkihk2z7c7n98uoozugjny4jg1efh9j7mbl9rwoxmx2arh1y2k73tlor8wwwxr0dbwegyhjt48muqhztyglk3y9ghfwu0124l8h3jvb6776i393spuy767ovd0kruvf6w0hmdxzw7qogo7i3ceap306nmxh6ip8lkmy8zg6li93im1mvelj0j7gs2gwranvu66cy3292v7ne904ru1',
                pathname: '1bmk4d47lpnm7ej52qr5zogn4cet88wvp2wwadnwyyf10nkk1j252cw9awpp8z9v5sr9i7wblgauaysz1vifojesquqvbekrhz6ri8ie77ycr4f4msam9n7adx1ysnt7ppdx157ksld2liejqfh3ou7i5ttqg7iiqh426xn30u14i6dupct5b2jnlm13z0tftezlzb6e4yt2t6xofnedstt4xa9rqgxgi4xdeyx6mbw3pzjakg3kip8iugsebwtrrwqoq0kkshoy9d8x2e065cuoo31g1tr5xyb2lk6dzi2f7pn9gxd7wkbltytamm2eluta5m6lwpt6amf5s1pgb5d55hqq3n0temem5fv5mixllv70mum88ihnotc3pnegxik4gej4bgqwtjizs7obie0jxr0eoywf4tgwakpyitrttpcgj0szjn8j2u4fvuqe9lx5pmh0462vq8h72juiej3j7ad6sei5irdqkn306q7kgswrwhf2p629lhcjv5qy61sz77qcm1lw5zzyuvtkeu4ws5oibg2u3r0lrey644porzdrnfjcgta65ltq8xsh153uok2th71pevxxx0ktgdudt1ynpt2x1rpeodbc8l0tq08keu50x742l0a3jr4cs98lrdwfcmxqqyjssqk2ws6sv77q7jqml2tdg6ghfs72rfs0xd25b1pbnlnev2dovypla6cqbrgdg26fpyp4tccz03o46fwck36r7zw0o8ssokpumqnpnzz4t4x3z7pbpds5expnh3rsa1egqyril9jbvqa8sq23f59i5b5jtthod20nh42m8jyw7p4y9ufc2ifjush94hjo3z8viann4gaz7qa9ttdy67bysp58511eowaymvzsvkneb44hshjhfofxkxij0vatlwwbw22fzpw9s2k1hq258ps5c74qs1ualcvbkry4x5yd81mplscag55gy2zc28i4v5m6xejurw3dlygymbguvfgyu5k5vsqbznopya0mvsu3mgfwh3h1',
                filename: 'xtuovvjagyp9ia1xd13qw3rpignj8c2majcbwdf8kxg87ykzs92br0btrxxs5uvx1mqiwoyg72qpswhukag579bn0w0fdecxc8e5k0nkj34oskikksp5q2ayxo9g65u1dyaaj24xgxk3l7s7ct467r33r268ydpn30p88fd8keoxbbl2ikjbmri6e5g2lqo9v7ezoa66t5xvo4e1frr4sgd4u4uhy77v299hbzq6apkx6s5dw0615yae1w8geei',
                url: 'oqlwqaduw1p59utvqom3cdq2puv74lm1u09sadvvjl9cnfeddkls2pna6q778mn3up8kw85oxqj5r5vs7a29ibfst8db7ncc1wvztzdkle22ivk2m499uupx7v6bpdm7cmuaoi8i2k1nc1r99ldyk4e5uvaw203fiszx2bys5blwfg3663m7gmdi830l9gtplpuqwfk96524jlvdjhrcy2tedh0rmesgr9p13uo1yi1mc3jswgff73rqco8icwcns57kdle4ativ1lf11na57pacsw33d1xls4hqn2s7mwxau6gmydw6zhodoaganwo57g7ptvp704tpdeh9pq86ptu269lv85rbtlepugmrgf9vqoifgfdme6imumpd2hrvsyewije9f4zxnsq212tzotyy5pnubmrfpht7x1np1ry9kg2hywog97ctglb95t6d2lvimu7zy80xk9bu70rsdxybecirhaugpg9ybb6qwjkeb6uz8e55cj6oha9rnq3gxqhjz37opuprpzrx0nqmst3sud6hrxoq1t7c8adz99peg86k4rufeez4ogfehh45tzno7l6thd46uo7lt16x7u98zyamn9mvv7f4sqgatistzacniqwid1nhcob3pdo7x2f20zj0r53xnvbg5g5i9w7pjqlt2wza6ry58lgtrxiovou78wl90f13ufxju5cevfjcuxyg0gm122ex5xurw1l5y535rrxmqpteo1j0k8fqv0j8b4ls9cabm8cpmik2vscyqet61rby4dz4872dorip6oudvaf29lug3evajrqm70i45dvhaup91t061euc6lfghrzkxhtk8rvspve43xyds7sw1f7azggpn96dymm3aiz7bo8wsoniaiut7e23027vnzg07u5tpmgv4tz2uhg71c3gfzl48wognm5j936fg7563d87dv2lrq13v1xk3it0uork0pr3sb6y8swtg1eadp4d0gpp5wo2x7gxozo9482x7skipce761n8zta3',
                mime: 'fkh5zh6beu9ypunt7u5cvlg0vj8neu3g8st0m99kbvxig7fpz8',
                extension: '3k9io8dcxwfjpqffxnfvtmp3xquclkce337l4s7c8vg2vinx1s',
                size: 5670618988,
                width: 110361,
                height: 348842,
                libraryId: '8e77604d-f2fd-4921-b54a-64b34e773b01',
                libraryFilename: 'yby7x8g818919kcl716x2p6yxkid5tjad5eqih9qjvcuks5nfte7qfm84s4om49zdwwwofa0w321guhilay2sgvkc9sctg50bf94n5s9t0tlblgng2bw2xtymc0fsqt2s9lvy2qtm5ue070i70pv7irsc200va70i2s3sl70l6bhjfgnx0v1mjz7rrnh5nvl7gt3ndlr9yvwt0op4sjepuqygm8oy8o8bw9fgckf1nu61cz2kuya4aumqiayb0w',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentCommonId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentCommonId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '0f7ee8f1-7644-4da5-b53d-e03cd62405fc',
                
                langId: 'efcbc1c7-90ea-4bd3-bf55-cba1b0d94b02',
                attachableModel: 'e5odtnw29unnpzgx9g7e5pxi2qb9qzz0etd5je5jk00idsfcc02gp7ptc8xrrjztpnbzc0szsda',
                attachableId: '1ed8b8c9-5995-4a64-9a23-d34265309f54',
                familyId: '5fedbf4f-7952-48df-ad14-8911205a3daa',
                sort: 564860,
                alt: 'br1x25tayl361vi4v9uctsuucmjkyidtf1j37flnvb6rb0bjugjrwjilkr1h5moknndr2n7t9k4i90myp1n1kqrpx6ht8mhqcg8ftnp7yys0wmyj2ss2mb6u8zh82o7pezprovku6qduxstjwvcp3snretl0m1m6ogo3rupfgag4cqlguqo8nz9t2svvapwhaq86zcgihrx4c2d8o3bzxj3or4afa6w1ehaz8bv7t6lzwpsoe2lkpndt5uliqtl',
                title: '3spml56iim4ymmbxyx7yhx6xlzfvc1acaxhay4puk1ocrw3kn1afd0azemwugd0bs9ez1awun7ppg5sb6s7niacou7xr3t3lyqelcukea71q9ytk08unsaw5xdil6ctd3kmh5qocbmgi106x0qzkt36f94p14984batr8bbh8r7wmog46h08wuk9jhn0s6rnc7cyxnv8acazydo6gmnq8zpk2sfyab72jlfw252inl23z4z3rdfb9f7y8e50dau',
                description: 'Voluptas voluptas rerum pariatur ad aspernatur quidem dolores tempore autem. Soluta culpa et. Reiciendis cum distinctio totam dolorem incidunt nobis. Dolores mollitia mollitia molestias. Quia earum enim sit qui explicabo qui. In aliquid quidem quae amet quos assumenda.',
                excerpt: 'Ducimus et recusandae doloremque. Sed et nesciunt qui soluta quo voluptatum delectus eum. Quas qui officiis sit non.',
                name: '88hzi8fv6iamiea0vsu223tcvrhrn5m3cdmwdogs3ak2m435su0unij8a8xy0j69gyg4uiqvllje8etcqzttv8o77btbqssoebdcwewasu6lbbzepwozbhs1wuupgjbq1gntkriwdytrm2d1cjov46qhr4aa7g8ya9dztfgf97egxo4hke695mu47n5h8tj1ko7pjwkkw2fsdjbv9ft4lsb4xt3mqdjdjc3rpiy8brdeyftbd3au793fo0zqmlk',
                pathname: 'xgcbiyqc6wgb7o5dwhe08zghozfrt9njbkfvw33hxf08rgn6at3i54uz3nk51moa5lml4vpp426pi7sjc3sych8myuj9b2i1zgbfxxtm7r0k2serjzqrz10t195heb404p490w0q0awqdgh8jr9kkv5redtfil1e82c5ycwr71f7etw2w63mjl2j0a3guaej7tjxcx7abjrjg579s4cqzu60clmy15me18s5s6hxn68jdo62xwpjxtwnf2vzslx2btf5fyb8kd6lp0s3qwqvxykskrkymckgzmzppkskfcimavt3yr8u29p7uvg8s7fop1xlfj33mvyu7z6ugfpxlkm27x031jdrazbmfmeqkfvxjcdh1k787dsfsscwyrgh957krc0b22w60jd1i4kcdl9dr5cgl722x7z7oumdqn2hph32wm61lu20s8i223xq720tbpi97ysp8zz7u5rtsc0wc5nn1d9iwgvv1gi21aug8bo61bi912grnrjjcl03k0tx1vhcb41yk1qak3ckzn9rcyy2e1jm2c5thzl1hu2obd07gevokrdkj4uj56nmlahmwss133vhi41c6dxdag8oll5vy0bbwokozuh8i2ruved4pd3tfa29doo49vobjzr1nat3f05pt9cjwzo5d75jx4qh9c8uuhu5g3if9ww4un1wkzmnn7plhz0c1u2578sdkdis2wk5nzt56yz6kamrgl0lepd4xsww7to86q6ics3gnslvweo76y1oj488uqp7np5psoln540tbyyos8kbg1hb8yh0mh3aqv2qx46tq7fkqtjdfauy6pojlr1jcjor71qcjlzds5nm8pzxpdlvah1ww2iopjd3vztvhrjc3yu51ydftakkd5xq3exlvvuwow2rq2brh89cwj6kvif39i55qgq335hsseg3jxva4yu76f7rpwy0oohw0d9pd11o3txaivesvbe6msq819sgsg2s9rzsa61a7u71fu1rbc9o0wjh2a5m0820pbbn',
                filename: 'q0omjgeb5pw7cuatkvlbqsjnmz6msgqub74ng0s4uqzbz9digopjbc6tww76pt3lbi7772d410x9ybnhc8vrdelrjl5t1krz163xn4fvcfn6tbgtrn7m8ciekzpnq8kloz0vnksy1eymxkrqmlcvxquz8yu93aar67ahv4ldkc162eap4bdnl9d4xrxx5akmnsjjb687xj2k88fga8zpa50hqceioxgct7nylj1kw4dd30tevsa2nepv8uefviz',
                url: 'vlgl6fmg1pq9x3p46mjkvg9c2qevdqybcg5d7eez1w2ibb89ji2libz5xgccswxj5bp5gakzvt9vn1qf3xjhct4byv4t1wz78sx4fh22gs0whh23cn7kbxo8tckqmbj6t77nq1gruw59ms4sl3k9dhibbuut56u87dirsta6yokyp5fw8j3piueji3xhahysjxqt3x5am54i3e1y9uflh2aev8c92hkp22coy07ochd91ul79xqvcppzq7kpb43rf8rq854dgb22ics2j34wm535992hgeg9p6xk52cylibjcdubt0bbvteyw51jqd46ffdijnwgyg4bq2nwvk3yiik508qjmujlu8xo1njgzsdz4rmdjtmgcpw14kh7ing4o3la7fecji735bld6fgrtm5avou87feaf25im7cf47qqpfu461shauu8p5yz0cdit3w2hcujia8dj3vy200veh4njdd232m33cmz2jta7wz6m8adbij61nsvgbgwsh9g6db6ysoyrjghhqg6l0sfmzpnsgns1zp018076zm7wong15i2cbc23o91k9eopz7us024v11gb9xw2tn0mo6nbra8kbg1vc9lx5drfw108uie6f40a4mo6zjhltn78z6mjoszeq1kov3ftk8ojjtfjhjhduux6ibrn483c2p8xviulyupo0l8xps0ovwqdlslb0x74vgsrpme4y70s8w5p8wm85wf3lyunq89iw0knqdigo8oyt4y05le0fe4rz3uyavixa0oy1nvei2g1uhbq0nk5xkrg9q76ctc0f12e4mlbvca9o4ktypwyi70i7rz63wvgirdc32hjr530mzu1cc043urjaz1q3fs67y5a6g9czlkxu3d2tyd2a1zwtmoq4j2auq0s27x6378f4j0n332m5bmtsfla8xocjlwv6j8eggbwbzjy4ui13ditatqlgjwokcz314lomlxh600lywbjl3rvbmtrh51zvxk1o6sg1g1gdo70agckt1y0b3w',
                mime: 'sjnxj0q24qdrh2fqcanz2tfqt198o4pir6u1zdumq7p5st000b',
                extension: '0j3pbydwnp31vhwxmzwybudbcd8jlb0wrgy888t96y34jko9lu',
                size: 5898570130,
                width: 273539,
                height: 398411,
                libraryId: '8e77604d-f2fd-4921-b54a-64b34e773b01',
                libraryFilename: '5ofmeb5d7wp3wxqkt1xuk248f8m5jhqh19yckk8hq5lbudm8pw2kkmo4urlaibbursxr5sutno7w2vgif4e7cptwp6h82ncdqar3wcudnr61yeb2cx55zcipgat7uqmkp24w343tnnjgmk9esqa2yjb03uyb5y79w0ee8oboug6i3j01golo3lgiufa4fq9qgsei6ettfrwpwmajx6owu25ksn0kyme9k39on8pu88eg4i1vwzxcdvhk4ch7sis',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentCommonId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLangId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '0f7ee8f1-7644-4da5-b53d-e03cd62405fc',
                commonId: 'fab65033-01c6-4b3d-85f7-7fef092e475c',
                langId: null,
                attachableModel: 'dbobyvj8qhxidfok7ilmma5hz7qpm44tl45bk7yp72asod04c9m5x4tbr38vtqgyojpbcrl2isu',
                attachableId: '1ed8b8c9-5995-4a64-9a23-d34265309f54',
                familyId: '5fedbf4f-7952-48df-ad14-8911205a3daa',
                sort: 583763,
                alt: 'vinuqvl0cnmu3feuw2qztj0we4vnv7mdxb46dg43xml4tnsfs2dkwacqpb0bjisfxyxje62y2unvdssg9qeqtk4cxi1hgtsp1k7hjpb9bbo2m4frkfcwt4vhs5ot5wp3ok708fjqvzfmqakg6umly6cr1t292how985d7fujljbw6c5lf6pq6cwjgt0q1qw8ld78hd4yo33qam2uffcb06sq3sfvm32w0n8ee41plj2c6rsf1p84zjlzvkk4t91',
                title: 'zm6z9f4u3cpvwbg34dl0uqvyoygbbec8got6tr5apogedluvoaljz06nchuy2ki0r9rpdpn193evc227cx4d3otn54sc4kjtsoyihz9bqio5sltb08l6nk84xnep1p57h15pyjlddkckx0klofk527x3iweh910eywq90k7xzn0osxqqm4yjqs6o0yq2v8hqo96q3ja8ty7662lqb6s873x4fu77tskvxuwiq0142xl6kskd5kkgjmgvscfn5ic',
                description: 'Mollitia quia nesciunt possimus quae. Fuga dolor unde consequatur adipisci. Rem aliquam dolores autem amet provident. Laborum libero consequatur voluptate incidunt.',
                excerpt: 'Quia pariatur officiis animi occaecati fugiat quia qui provident. Ducimus aspernatur corporis ex. Libero eius repudiandae hic sed. Aspernatur eum amet deleniti doloremque libero consequatur incidunt dolor qui.',
                name: 'uode1xheo06fqltj9ywfqxxldvrauwdppro5hpigknpux1jgodrheuypzwt5l56325i0fnth83i0hs59yfcdbomwk8xi6dw5tf3309w6pwdxv4c4v3imqkwvfb3hc69drm17vyqpyls54er3mlox88yy1o9sciqw2mwn0csmgqj365ktopm9oe3zbugxn3stdaqjl5br93jproi6w854019dcsfva0pr0o19kr5aq96v2qunp5oqklvc84bd6zs',
                pathname: 'f2933zuqz8sxfwtn67r3v2m1hzc4i2zbumam3avk9t1mmh02dcn0s877bhtswqqbeia61n7ak50bl4anese5b0tsv4vzb1w9ueazjk3bzr081fop4um82ib84aa43pxmj6lcd6qpz6b9ksiotbjgnc1caj6qsv0hury7ul9dvod6jkbyas948ygez8f7f9m03g6jgomfyuwzpjct524jslglpobo7pvek7a71bg9pnycgmo2b6ah93rcwbogkjc9kadyun897tzh8mwaydrfae1zyic2m7r8c6oeik7geeysabctcvwx5o6c0328rxiz0evyicmrtcg53caoy7uk065l7uoohwbwtnf5rqqon3h41qxtc715diejtmufujy2m4rzopukzmqsic5ha4ocxafxeojui7qb55fzxefderi76jovqzl0xk385107ywmcxm3fn9xo7mr1yxs6hsrxr6cpjda5um1s9dskdrd4u7yb6pu12cgji4c61xmzc66d2jz64q66v0totmfi9s6jsrox3jw0bxejf3v4jnfdei7hjoxox4owukz2eh9j8p7xse0y97fm7dmhibwg9nnyr89ds0he88c4k5eucko5d12w7jcdcxzkrgomqfjljsu1dpityaexuzphcit22o84gkr0oamhktbj6iwyakbvf5cw41g0mp09xhjia7p1nsud60hrdcr3vw3zs49xma4p8kiom2utgacpxld3vq5j8a64lztne990mmdi2dqcjr1m2agdijp76wnfrqzd7fwg2but0yacv3ydlukxbmgd9343kyn5q8vccgds06zmt150qrs63o8z2bj7yn0yfluzieo1wl9nf5bhi3b1suwu4gpz4hte5fqc7rpv0s1sxt4j006kztl9rk88bwjsy8ohz1baqg3jpiisqkh5mc50pjble606ns851fiu3vp6uh3y24zy5o2l5xe2p2yetdi1spcb9b3opabxe7ekqupt0b40l26hk5tlp59idv0neopw',
                filename: 'q9pst9pvf310lrjd2bdaykwuwgh0cx57yq3bjbimqczktn6psa46zvskpe449k4qm7kkmjc977t8zv3jo41woyolmu7punb7vmwjks8k1wyzaesv7okn7132ycy247f9y27u6a5ffp91s6223wey3twidcpasdu0xdkmrvpem70zme469sd7ec14yu1fyebbxl2caerznknlec89c1521l38d9b1wzuh5lsdz5ntih4hpedxb8vjhexlhdthmvc',
                url: 'nsi0vlawlkfetbsi9xk8aqlh3emgrtk9fl7uvbwx7sz4smnghml27894l9iu4tx9hx9mom3rxrn50nrajvk8tgvi657eumr1vrdz0xr8pvps02wpb169ag7cvlaqttvixl99mx48h9ar649826oxi8o6w085xmjmlm4dejwa1kly7oo5tedp0dvqimi3oc2l4yjcp2rokcvvaduhmqvvde8u6we813iby2m6yi0hlzyt8gxqtvuix1ymotfamj9q9v7rbh569dqk4qnpx6i619u3eb6ay5o07fw14tyezfxfrdo3cl10ku4n720jo3x0hygukscwoopq12hjjtxa1jaegxgfokvy2fy8jhbsr1yizmj5pf4eocpq1yqj8oguhsqli01l7hsmv2l894faaqzbewwod9818kxai3tl47cqvoq1v51tdgecu3f8el575l2xjl8725u6oszni226xblbog16qgnr6k4gjbh4b59gyeh4bbk0o1nv1ayqd69u6kndwd6yo0yg59ulldovgnc34koses6gvzq6ybax1dxq4zep4xzx48hxvii3ok5dtfm8dahutjthgwgs14nofwgz90bcs6ql0mosm2r2qxoifxfze2uvwbvxc38jve8259dx5cvxpnlnkxzu8bzkmsn8hbz46xc4awhc0o8ol6v10bmr4ufwz1b6phok88nwu2msbnlsqzoz98lhhz8pj8ofc2padvgmc3wigdzt3nv10ij8gdn81eogckboggx3ri2wz6xbvm35rkjl6g5i1lsu4zvnr4yvtuupvidbdmtxaictke41jq6dwtdx73odmychrc4wjx5tcmp3awwo1bo2qo85aad804a8jomue7wq08v3ijbklbusghnwdr5vqeugvj14th3j3w19gixk18sr87jr00mdphrin1bt7hxrqfgn9g5s6yltqtd6h8zf590jgyid4s6ca2ojx1dx84nmjfjjbm98z0jl24j6t9cfojn7byvvy3u8tfx52y59',
                mime: '9k9rvpyherhgu5qoc8um029lrik69fduefz6zp12egdbpguqbk',
                extension: 'qc338popfu3hkc0x9hzv234w1nbarjz945rx5jsg5m1fp4305g',
                size: 3380033085,
                width: 464948,
                height: 587908,
                libraryId: '8e77604d-f2fd-4921-b54a-64b34e773b01',
                libraryFilename: 'pgj1x932ltmgp5uaj32vd6pncojc161tuv94aobklk9kbqq4ba5zkjp7zzmpehlz9wsixsglxmyg5k1qiw66ydzss8uwgdgt19pzapvif9enfw4kd7drnyxyk2ygr0yn43f1dcd7lw635wd74zybq1ws5u2qz58ocuweuln7ov6q266ibx1qhu1fvcibv2igxn1ajycfdeeu8j0cg2j0u310vd9iz8rrgng4p5vebde7rb1sbifxle2xe3zodvd',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLangId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLangId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '0f7ee8f1-7644-4da5-b53d-e03cd62405fc',
                commonId: 'fab65033-01c6-4b3d-85f7-7fef092e475c',
                
                attachableModel: 'k1tbf07qtiw1iy4d48peubswfe9sew8s58td3asxn7brtrsnsqrqs9qkll1llsujbma7dn96fiu',
                attachableId: '1ed8b8c9-5995-4a64-9a23-d34265309f54',
                familyId: '5fedbf4f-7952-48df-ad14-8911205a3daa',
                sort: 182005,
                alt: '3a0drzcsiiutdxtru25dj44izbo4ohpsy14vc8wqolvpknji46gu9zg9y3h68nh68omym8bbpfoqm1uiyd73v1n5e8ixpy174el6ctdyiec7frhvvwo5unyha8j77riv5yq19tjjkdlqk80fdw4dxg8401dvu3hg81xzkruh2p91fbcnb31wrfx65mft54awxd6spkd034fhuc08ajuh061r26s98y8sailuw811ud09s1p27szi6gsrrde3th7',
                title: 'umo98ql1wc22mi45qi202f33iviv6wbz27a56lfiozmfa1hpi00o9ztd3by86sy0ya7sx6oiwg082c1v0goc5mjsjjnsvxrz4daxpsqjc8fx8nvb4n5q3nub545kxkjoqa31x46rdwrqs07fn5cuh6wnhebjb8hg8buyqyardowkebs3vr9dpbbmyg0hw8xzsxa8s2xdlm87936vpzhmzx1g7onz65hzea4pqdsbletv07sruvpk1pfchgv3g14',
                description: 'Aut eum autem. Et dolor deleniti eius perferendis voluptate. Numquam velit earum maiores. Eligendi aut et tenetur facilis qui voluptatem.',
                excerpt: 'Voluptates accusamus natus qui ut illo similique ullam repudiandae hic. Suscipit nisi voluptatem ut ducimus harum consequuntur animi velit. Nemo deserunt nisi qui blanditiis ipsam iusto qui. Nostrum quod facere. Quam qui similique dolores.',
                name: '672w8cg6yghkhd1tvi84iaitt7k91q9efp85q4l0da19laawdu13nbh3esfwz467lgmmtw3nlmxrzaq8gv9cx1gcdhumltsh4s9nirvce6l84ef87egoxa90ic502o9vld287flg6gcqusrgpzorpnxil4v8ycx3ycelb1nwsu8k8guiyz5t1qdrpku49pslyp6tnqv6txndw0rlvaej3v6xj97dnbnpdj1daob4j502sbhjht9cwfztoh2d5bp',
                pathname: 'n54co9ui98x3asl1osg8yhlz5nqfd10kdslm909evwqjotymx9q958a5tcyov60ga0w650cojoahc9rm3ohkp0ll5lqwzn9bkt42nybglfyh3xqekjaz3e094ao80m514pom9v1fbgjyqm5yguau4gcg4fg99wnmjantx08lh9kay8embu5iupqr2j5h90hdt5op1c41snyzqdruuhdm0rhzfgxzerdraztnhlvs6yeskfifkd9bpb82g19zlhnnofboglmeiy6cge7u6kgegu73ug9kkayuv008jzoxjgycvbm1chxxb38m1bgo44lln44nj3e42u75kiaqaoefpzbta7zn5wh80iyith8h1jpg4664ch8e04i2j7zsj9i81k7vs698v0h8zq1p9lwyjmk7ml232026epsgqd5mh5soxj31qqy5d46o2qn5wz8sttblidnete883ac4uyh66msi70l6plcvxhubj8z49cdo8adgo12r127fc2214dzgsv9meoycc7j398tqy0m6ldg5kbnp6dr06c8qi4c39du8v4f7pna8ev5nbirk8gf3spq4y0w859f2b7cyeh635b1muicwomp9t51jmot6k90fqeqo9n5hqsye0s18kxn5ux67n6124gfhoxrhpc3qngkbjqttndrbov9g1s6fgsmy45s1qbccvhualfh7y00vnhm36p1uzcb4kyes8h16jm0r25e9ofo5da21kxfoaooaw1ej799vbtss4pt4131l0nwp5mqqoi7gq0nf2iyuxsk9hnht8vdl9pjplftkgzj3ukqbzn5u9cn7ql9pqg7e905pplt77sp6l2okw5p0eco0bag8rou81lotopu7wc57khb9yjffbg2yvh2kpdh0oefhyihrc9vou1obaoyi76k4f7svant3sg8jpmgmx3kruk1z65or8od6f5oiuriad9gufiaryzwtj4bp57tg8ys4b34erwn78kgbqxrrkxbf71j6ecfryawxbi3zqj9g',
                filename: 'roxclp1rb8nnr8q84k7m9lhdy4nrknlcopjex3ki3ukwykarzuz47ohyjs8zixot11iq0v9bq824rxvlwmroiveons8f2aclf1zvmh6u6udhr1475adi9oibsbuzkvsswfu9w1yyvtc0cjxf0gds8r73nvbdbhi6ei94v9c2q53u7ly37g6ol91pyd3jorr35zrguvlnjuy5bp3fgk1rnd249g4a203i3l0lpxlgqdd85eqk5gt7h9er7tknvu4',
                url: 'ys1op78yx9pj6mqh9bs5rya93yvmtvjow0wtghzscqapbs4e64m8mhxtnpbkwksdl2fmk4acqfrsek8kwpws4j897tbqniitr68u8gy71qxdwlutx8qeu8qf2xo12oqfniap7c4qsl2e6dih8pf8wfleebncmu3si6rfe7vb8r6dvqugpjgxbh9j66p2dfpynba7juw5utnbut3s32b3uqrhbszxwfv6qq65125b7onjxba3e6oodaqzf3rpmsgfp0hlw8zazoffsd5aj62xn1sao2lftep4heiw8eyg54hvql2irfw7w8yqjumptor5e6yajfiwh2iyeqhpxh2nnnxbqk8a6kobyn6ap4raycxer22jf1c3zivhcv4h1dtrc1ma5j69fj6kl2c7jn25o3s1epe6u52wsgoyns3m03wse0aq9au7ust8eiru2s5sfenroceej3i1gauinbkj8xknu08zoz1oxl1ncu4k27tfz93w66e93ilqw2631rfwybh2185txv3svaga9g8by48s3jai2v1wiguy6wdfynmh7j1di2ltl5aqgzb1wva41ak3k6p5o5yzpzehi6ikraaiqhje11m6kin2ibdu9knxq2oa1g9sw6sqa9iawhncwt0ltikld6h5th7acvcuoyc6bybua2iu6awmhc0d688phda1m62jc932a1c37ebep7evx81ohw0k8n8wf0a5oe7t2yeax6vl5sifp1stj8xhlvi1wfvx1vocxj3lzv6wvwih2gre5auvi5j3x0bi3l53jlao05e7su4e9xnit5b5x3au3dtv2c7yr18u1a7njccnc3gle077jwi56iapn2et0m8yvmu9enfyrhteyjoeqt3sz76lr6ue7ti1p4kcm711pqqzsiaqhkg4nreuvg4nkxkcrw35tzt571mrhwmevhh2ndorn7sit6atfwmlnwm02n37zn1unut3b9u6g2335pxvvqu84ua45teea0qqhnxuo8t5q89y5eepnkcw',
                mime: 'f0yf0864k73j3g7k7grv8lvn139f6h2mjcno5tdny2b8rj2pad',
                extension: 'wxve6xpmbxb0ow46sgnlv5je4bbk5fpcj12rvjuulipjisdlk5',
                size: 1093509983,
                width: 376613,
                height: 629538,
                libraryId: '8e77604d-f2fd-4921-b54a-64b34e773b01',
                libraryFilename: '67otexp47zfgwvrqqa38eyez5cfvuup8avajmtxryabcy897dssteskx8u44xl6i3qe5fhr44gzs5y7fplrotlfopy968m1k0phzprdvgs68madn6zs7m6ybju4o4wkogh2i6ofdh6qxiwq4qjrc5or0qjx2caba8b4oswqshgqecclvz0v0hq7r656zqz1fjhj12lgd49noh6hmctjdfm6hf9kduwqywdtcsq86b8klakxxn2enxu4jdf5xe2j',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLangId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableModel property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '0f7ee8f1-7644-4da5-b53d-e03cd62405fc',
                commonId: 'fab65033-01c6-4b3d-85f7-7fef092e475c',
                langId: 'efcbc1c7-90ea-4bd3-bf55-cba1b0d94b02',
                attachableModel: null,
                attachableId: '1ed8b8c9-5995-4a64-9a23-d34265309f54',
                familyId: '5fedbf4f-7952-48df-ad14-8911205a3daa',
                sort: 949534,
                alt: '62lmi2kpmew7apghe1w26ckwyo3av3o870toadxytu9yfs3d75wsdgasnchezyy5jtxafbpmwhpshyhzb3o06fyf567rtnti26tmik24z293kityo3dus5o0cavol3b7dvfno1cjii4hi2p1dw7lvr3t294r9aukrwkm6jj41tggqvzcmnyz3kazg3w6pqludkgwduu905at3eye7pku8gsfr683ffym0iiiou1q6qhbxcrxadj5f4otwg3ztsi',
                title: 'ph89tzq9hynxpzrmfbm4vmfxipsf4akph8k1wbgclt6cpw3qeioso2xl19u4p5941f59x62qefxt9s1fhjips8ki7tgciuh3jjlqyhmocan4gwahtvkf0tl98junosktg2wdz567922mnikdi9l96p17ih0kyk16x1tscyf838h7ia6uf99snxzwvx398xnwtlqf3ygfwbewx7hj3ekudkzspcrwzuz0ea14yslws33drdg81azt5og8x9fhegl',
                description: 'Quis fugit officiis voluptas consequatur porro non molestiae ut quia. Quo atque aut id quas fuga ipsa neque facilis. Quia distinctio tenetur. Ullam officiis quos.',
                excerpt: 'Culpa nam accusamus. Et corrupti voluptas veritatis laboriosam rem et architecto. Natus quidem dolorum delectus incidunt asperiores voluptatem.',
                name: 'c8907go9rvxq0juo77v6rh767l731oslqtpr5fikff5f1v5obmkgty8h15xsu48qtyf57o4apml58fimekzmjp8of80kuuwohf0x4jc2dq2a0ujjgjuwqeyyirahwonbk0glyja7e8jaqom9sv40kvsq73rbd527vqedocm9q9wcj7ngkoz6i5s477f7bf3v3statj06og92aqrxpixf4n94oxb9mas9bw20sts5keny84ldyuiw2shn6fsumcn',
                pathname: 'wbw8zsa05xjrts2rll7cag9mji0wjwxb9rjuw0cnif0lsczdwoo0fm059p2dkteeobgbn73gmaaqjghzf9hqytodtz8ko7vsrj64df9otgcx22koga9vs2g2p7d4zuyrgx5ugcnsp39o503dq4ludcu8ik30ebdl6gmmxsorpbqx5f3bdmaf10d0b48mqfmj15c3g7o07fhuzytdw4bncu6gevpo03ndowwnoi6ygmfk64siqc3iieic1ps0woztdzm8jni9mgi6qs8gq1wka6fghyesu2j3ar9hjqwvwvzhpm0ep8yh44ftshz3kszupsp71v018qhbacmboud5m2g6qjfc2vbzo3b59wjljuvz08y5wdgpym4y8s29om47xmi1lj0k9xe6p96jx2c2sk2nkg6c4a1lxu1i1ffe0n9dsgnttsym4e1ycxu4sutmahcd1z90yj0krh9vlkgvsyhssyxk8uzu4vqxkp24075q80xewphp2wqh73qn4b00d11yppfiplt9asflzenwq6lho3ksppdqhoewnw5p4l17fp7lu3dcd1aum8a6c6vjxtlyznbi5s8304zeckdk0saobcl9ivqp2mthail0lc2bf05xwckgx0y6vxgl8q4t760wdzfr0k79qdz67llvjmqde8dz2bdjkovs9hxf5crxqpv34oidm85s803u2u9cd3cogab87uxf3m791sgo5600xp3eorgl7mbitkds88nxz31bg9ro28lmzktusns9w126zahr34ci0mlovj6bo6i7c2wtpa30vydegyg9o71z7s95w1z7n499q4d14hcvsanihip0tbj2rtmku4ntd3mhpcqm5m70bbg2krcrcm93cbg2hftljkqo3r3sbpodmw58mdewp47qadjrs1kg93n0j406u9zlgzpvv974cteyjk1hs17xalbhyw0kckq9bu4ahrhscf1obvb6hj9ekcf03mrfy5ol8fkek7d12auzljsfyxfpnr2qgxpkm60x',
                filename: '434ma5jeup0eyfmwq9hf8453foj76s9h6q0ad1bwv8svy30oqhwga895poajvkhn7zppdpm4qxnqgmz3eb0iivz2frxnrsh2dz73u9o3r6z031lojc5foorawb1sd3uxuhcw7dfjjes8k54w4x023lk9eii7js3ao1e9d6iuif5rqo58k1evc5oyeztqwtcgv2e46p00eb6hafgmgjbnhm3qpgls98i2217ab6r7gyrvvkc9eckm793jin3uh83',
                url: 'wml2v2qtoe7n5hchyfjumpwhathahl14nyxfq3eyxe01onbwaumrgpft5zz33rydnufko15jont0djjozqaz9ali7u0sg5xok7s7yfstb6w63t9x6jm6u5slm21t9slhm2br1411n2016pkxnmek7jqjmzn4kc9bv0blhga179k3bn015rmqyy5pgg0uwus9rplup4gg33l2cn8h8lafshjw8fpep0q71k6idzqz7bjiphm5ydelj4i5y391jx1l3fd97g704r044i6ertd83rzk8rl31rf9oq8f7i02nodh4tw4chepi0pajkx8wvx63rd95wle5njuzeioqwuqjg10ri3kvjesrjcz9tm0zp8rbix8a8fwble1u1q67fen4lafdagy58vvmfch6xpgh4x2kxfypyd4i2dl2e3cm9gwwv8f21gshh3j4xzycll398p91hhn3k4bhqqnf00rvrwlx9d3rj0ldcvqspk9v7jj9bpxbd8myfhmfjr87ib3vv4tfbdm827xhz50khcccf25w80z2pwz77wvn7qkvm93jxsc3vbs564axqmbbijkwnefv1ekzpnhy25sm0hrotpyfovu54m1jqjb1zpf8wxox0o2k4lhpwa8ra3u70vkx8xwnkrfmlkvxmmvdtwm4jybtxtjhsug5j3klktjn1zo5pn1emh7j18ij0b9rscb1grhkq30cak3ww91xt75lco8ef8irxudhx3gqtuw340koc20nzcxtmj2lsmeohspvf0tc4ddqnefv0xts8ifm12h9hre204ps7q836ygzh2t0u4r9wnyqq4v6c5vh6g43vqzlnoh63picixr4mwq14p1d41al9or8w1ie9h1k6lpeg58uvzlegk5k35od046z07zvpxpa6ya1e79qjbldt4kbq37pg546qk6aljrucgr44p3nqdtkfnigsbcm4nn2vi7ok5bte477in9pivmrj7g6okodc4vfslw9joleaq1fovxdd9zskwdnk7sl8hd',
                mime: '8bqopl5srxarfdxrrrbk2hegfcm9myzs62ofegx1ngf1fr4257',
                extension: 'c5v9uu18ywx5px9p99bih97somy5svs2hkns2rqy4o23cqkmuc',
                size: 9768420882,
                width: 408791,
                height: 453854,
                libraryId: '8e77604d-f2fd-4921-b54a-64b34e773b01',
                libraryFilename: 'tbgouljlyqf7fv826rkxmonlnc16r4dcrx4p6wav1opypsf7vtov3wsl2kv6fm9ii34zu5rjlopbg73q6zpqad8d3egsxnfm7nbmqb2v8drdyurxvkwy5hj1n7e83ysak50x2363hb63gi3iie03g1aas4jb7520bg3rgnx8kdna5bb9ruzcnbn3d2qjlv35x58jl4dls3pvb87imarmy183s1epa0ox9hg8xqpvmmbovkbzzv3hatd29spa2fc',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableModel must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableModel property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '0f7ee8f1-7644-4da5-b53d-e03cd62405fc',
                commonId: 'fab65033-01c6-4b3d-85f7-7fef092e475c',
                langId: 'efcbc1c7-90ea-4bd3-bf55-cba1b0d94b02',
                
                attachableId: '1ed8b8c9-5995-4a64-9a23-d34265309f54',
                familyId: '5fedbf4f-7952-48df-ad14-8911205a3daa',
                sort: 513069,
                alt: '3kdvwnt8qvrvc3vbfn3b5yk1ta6y9l1g7b4kjxa5s1k1cyvkymtwh9x7cl7ks7l73xwnvbigec5pr79ymdewurdv36io77nixqy88dfz9yraot1x1f4qxuckjvihatdi85e649e1ny221zyub1qo2e68gdrfe54qlu6474phutni3qxrr5vqqmnd1uq15yuqag7uibrmrun1xxzm2bs02yr7kzwj9efmkwxuo1ffemt6b6c1z8nlge9mxjdypom',
                title: 'qvfe8y2s4vwpnrblcx71zpn5n9f6v2o4bce92e3hsvxi7kfbp1em8w0hao3pki0ox3478p2jl74eqetg3fyx70yt7slm6zzxb34y4ug1won73qv4o8c0dev9fapircvxnvc4mpjscfglprjgs0xnmel3csrj042s1n4pu17ak2r1xojzuv1wu12s21e8mnvfcqb228l32qvqhgzmb9y0n4oruj1a42aq2cfr4m47a2ou5qkbteeivvrkywi9s6c',
                description: 'Omnis reiciendis non vel aperiam debitis dolorum illum et consequatur. Molestiae nesciunt quae minima sed non. Voluptas quia molestias repellat mollitia voluptates nam qui impedit. Nesciunt qui expedita autem aut et. Blanditiis quia expedita.',
                excerpt: 'Dolorum sint aperiam molestias ut. Doloremque quas eveniet laudantium omnis. Officiis ab dicta. In adipisci perferendis ratione perspiciatis dolorum quo harum corporis. Earum cum reprehenderit eos qui commodi suscipit nostrum.',
                name: 'vkos83w3r4fxqett7f6ofhuy5u8ehk5skdj0xmv51gbbgj73kbzm8xsezvh54e3ey0new4v1vlfpc42oh8neu5rkzqjql6j9p45v71pnk56vip43d93ku7v9o34tahj9765z0s1c1v5mt6p4vb7bmi4nwv00lx4b8uw2di9vbrzhelxfhleopqt4l9kzqe48hx2xu4ewvzsm1vzzmkwav9q2tzv096i1ww2baslfp6bnyk5xyr90kk4wcbo4i0o',
                pathname: 'vaglsiy7l8cf8yo05uv49n98mel1jdqxawpkcxdonmjlwh7haustneej2568rthwz3rukp1e6vy0grwbco7ekzq1zqlbgkfydgnyvei9xjil25kc177y360gudgxfsy855oys8ez1aeeryjg7mkc4iou7ae8wzlf3drpilgb5nr3oblgtpfwztenf6mpbcl1uti46hc2ghypjjpt1rh2rvoxpplm7odimr0yovru1vwma2mzaiasj2s7rjymkth2frb6st61qs9y0ra4eu4795exw7fmk2l6luvg2u193hsr3t3zfyfanh1bw2rw5oqngc0ivua3okcdv9ztl45t5ub6edd6lca9zs66fu7k7unjie7rlnm5so6i2kdav28waagt7kueayyj4hw6b7clkeksg1dgmcd162wuflhjbsyque764ha4ex25t88ubzc3m7gnwix42sns5shkb67clv27mmyqrdc0985zitwp0bs9oslju7pg3crqm9zndp1opvxunpvfnpai8lfjq7wtj49fuyqpylpq0kgtkb3tcqke5sybom1la2ryoir2l4zi9ly7drga2fn7pc8vllkmnpsl8lklh8uwtzw03h2we86jgrl9jr56gyas7op4ssnc44tz5g4xg8nd7wk20t71ygv25w2d40y1vo0z41dz54ukojif4pgiwmyn0l0ilpv9je7wqk22urbth5cnlzkf04c78o9lk7jmdqhgyvpxk6209p9e76nxtfcudj329wcefgr8ox5ohjlmfqhzqr7iwz7w87hbw3bzddnse6rgncdo68p8vody8ys9stdafibtidx470spilzr6kk8i0k51bjwwhqtqzovz6aqgnfmxh2su9v4hu2e09bsferhsc5ssh9ljn0yqd53w2uqugchgd262o2hk7rabz7x3nnz7yhcmo82zfyoxsngeyd88bl4v9viiijjj2vyd8le4zxbb1174p9m8zqzvmlabq55x09io7m7rtifcp1cifj3182g',
                filename: 'euovik2yghmhqlbpra3u59im71fite4jtsxun9smn7zk1i2jgddt42p6k5cq79fqcrcc1ayak1v30q1f0a3usfjlcq4t0gv6hhyhdupn5r88b9bu1gymjy5lzw3xbxu4n8sy8pjn80hsfphr5b6ob87lufzjuo5vb9v33hx92lac3xbws094l3ivdnpvbnenbii85cnim9omf9fsu9v4mnhyrssd5vyk6ax6abh3b4fsxpb3bohe5vtvyi1yn1k',
                url: 'u1scgij9hrdslqft6h8fg9bvhtu79jhq3sj977ui16ey1gzb16fdaxcjnlsvtpy7q02724caggme955n4ghbp7q3nr73b124b22k879teeg3umczg8wv1l894i2sqngmdzw0xe8i2fy4hl9j3rqz2bu5m06gjuvjd543eyxg0p195he1e401o7i9fy34yy9illrj209wdeavsx4glorhc33nkghnt7vp2gbeyxi5a125rcerx9e4zdji7ywlvejuae9h942069vflxliq9woj18ncqbjz1j41bjm7dy9misu3iizi67dv4rygkynu9s0ybdkj0dee2oq7a3aykyhrtkl5e30kmn4ozqn3yb6t5gmn278rzx6ng4aaf4ru54xtf3j49i4gxdnzlpgh6mf8q2wyavn1xruy39a4w9qkulhgj6x8t8e3eryy01u199oxhtg2amvnacajj9szk024c7ptharilqfmino0ovws1rfyg1w0qj7xexn2w9hcxs4s4dkipeqmekxcnyxkh86osd006loglt9kt0j2610j1dtcu1tknf12lyrna8h07q7ys8nxb5h8rye16uv15hd44ynp5okg3v7vj861wznr9u0j48wuatdugcb513yo8g0alyz8s9daate1yeidufwqxllernafbfzn368zihmply8dz0b5obvrh6lve8soapqxznut5ys0gdlmkllvh9egyrmsi1nm6l3i1crvg347jf4o9vh0172n7nw1ycrj1s73xgdufcgn6oovez1mbesjmpx5chz0uojym3hj8z9qty6bc9nbobzrvcwceomlirjpixbc5wjoxt7k5088s1gsq5pw6pytabojsb4l35vouhnubegj9ecxm4f4brrpq0guwgtv9dfdy71jahuhrwq48zr6m0hgfs5cx9gy27q3jgu4aumkfxtever81q3xty45xe5gulvkiftwabda2bpq3dfe60foj09zdwhvqc2gr2xxhokdpmov3airqywlgbc',
                mime: '4lm0az0i2f63ah9ii2zgo4n334nvtva27vaoi6vridos83a2xn',
                extension: 'e6hqet9qgyxdmb9hrzezbt218eq44j2x2veh8qm2v6nipar9lq',
                size: 8303030588,
                width: 240078,
                height: 628409,
                libraryId: '8e77604d-f2fd-4921-b54a-64b34e773b01',
                libraryFilename: 'khnku3c23yzblz14t5u0qjkizhnvvtsgbuozxcwfmkkpquk1jhqixz7dy1q604b8ky7h581g4glrlvh377dto3qfg0epbksl4fgnoicmmkz5uiv1u6b6ly7kan4q6pfv4lp2lew1xmcflzd7kilngn2jkpsq84orzdgpwkvnhn7h1d50n3q6sd1zdthd72t17s6tq9mx8m8hkb6f2pl125ivl97qu30uvzym08wyn13y4yumdy3jwu7opq5m3sn',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableModel must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '0f7ee8f1-7644-4da5-b53d-e03cd62405fc',
                commonId: 'fab65033-01c6-4b3d-85f7-7fef092e475c',
                langId: 'efcbc1c7-90ea-4bd3-bf55-cba1b0d94b02',
                attachableModel: '7u2xpcs02ijjl7o4f4iuai3341x2q2c55i9mbg0invxmzv8nzksvt8txowvqcrv5avjp1wux33s',
                attachableId: null,
                familyId: '5fedbf4f-7952-48df-ad14-8911205a3daa',
                sort: 352434,
                alt: 'nokvcrvk7l2z583l5l0lzmhyi17021m8z8o9ebhvksoe0y1v16qtvbgxbrg4ta1mt0tjfh2j9knpmxlalz9sdhhfcx67i3bjsvm5mg37y49a3xpdj7ncppuseyfj69xeuchl40eiwtu28uiuwvuikq8loy0lexh70odcwi4chutsje9uijxs1lemaqgcr6di2grtgg7732ffo70kmnzjvxyal11kiolbbfop8h70zv70pd0op92lt4erv4dvbe9',
                title: 'l4az9jw72voakqgher7pf63r32y1l66w4kryj3z1grt6w5pjao7hlxij29ctrm70cnen2zf49neu5cltjrijjznlgh6znrqt6zocdrpjhir1zpdkrgoformz2bg2t4izy0j0mede7nu8du0vafrgwlsgqnm2gouadjj2i9vuq5nvamgxhdhx9o7abzoj22axhc6j4gqpefh6ymhc9oh1llmsx7bta2xclalmlepwr1y5i4enmsuvtphunaaexqo',
                description: 'Et minima fuga reiciendis facere illo veritatis consectetur vero accusamus. Laborum quas natus nulla eius possimus. Id quisquam voluptatum ad necessitatibus eius.',
                excerpt: 'Cum eum quis quidem non et explicabo eligendi. Corrupti quibusdam adipisci perferendis nesciunt. Earum ab dolor rerum non deleniti accusamus tempore sed. Aut officiis non eum dignissimos ipsum. Quis alias mollitia sed.',
                name: 'mhf9d77n7t13awb98tqmhqilh76uhi9xdx79pzi23vjbw8m0b9j4he504if9er7l3sot6kzr9uyik4dt0ywwj1f65c2g9dsb822fvl5almxbxd84yhtvj6qj37q91qq8chfqkntcb0nmirlk1wo02uubc7ch8jtm7jecrgsieu8kbh0cklp41b4w4cuwjaoaqv7pidqjx2fpub9lr13485f4gve4mt8pl9vkcrjl1lzsia8zrzoofb9e2lpwta2',
                pathname: 'x7ja3z7n2bxp0wo7krcwtj2uhe7k4gnevz084v0p84vwr6djgdoclqumbktpi3hzmur8jr27bm7cmle1lkljs7mhd6qtk6nr7kjwu3bvr0b5a7g4h7p4bo9g0auvk8vrc3m5zzau626c6xvpwc1cg83afa15btcnvuoxl1fg7zgby7nchi4voikz9usm8zr8221g21sm5gxlvkw35sxfgl3bsi7022er9muhago96h1g2xtm47np1cnkeu1zu8bi18m8dlb5r2peng2fzndhui1gmbw3u2lpesh2cfssggwff501z9wztlc6ire4j5gtpc4khdctjpj908ifhfdxjco7fvegyto3hloisfniucrrxgnnhg9wqa4ggfimi64b36eajavvftygwf7w0g08e3e1zjkcbpd07b8vbgc4vo42x1so20hgj0u528fqnvxae5p08ny5b8t3j4raa6gdxp53vzea1lojiepyxqg7izvh0on0ya7ynj74g20kjs923tf9tphcaonyz6io7l2zoyak5tdnqo7crz21qbdvunzefdofws75r1qvztqi7urvtyef49hqvm06sl1ykdde6unxhuxep4amkazwgt9kfzn50dbzsrjnrbj2ppt4ee819pr83vg3qcn5n5wxdenmhvrc49cdupbdoegrrg3cs082nn1jeba7j8mcwsv9t5yn5inb4sltoiitzoi6j8175dt43q6cmyked2px8kpzqbec4udzay3bb0lom6c6ih1p5ut6aevrj0247qzedeplxwjsi2hy3ufftwkgi3v2x0x7siripy1die0y57j02un85svkmfn6bhohkxw034yzimaqtan5lw90sf1w15ybeoy5t6f1ajsjvy3y47zbqnmglc3hgs8p8c8hx1lhybptk035imkm40aozyqhwzujzyxk5i91m9lsko1xsti03579iqtydm7jx7l8wh68ywqkdp7ls0rjpwocu6zcqdnrhbwtrycnyzt3ns6y32mprrq4',
                filename: '9rgsyim4iowkj5jxeokp78ntt6v3wbohvx8rb7qqhxrsz8ekhogxlawzvzt7m55ckyr6miv842vq4hsnksswhcp5d6z3ng3lkwu7qmxh8wfwo7s81f8b9ir3rgrm1swhwsp9igur0fodm27zmed6l9o72k4fc9bw2uurbpfa9u7ttd1kbuu45fmwjy07748vsz8cvz34fgwcinlgrz5b9r507m13mfb6tzrsh7cvdayhsjm617jvptw4lzmbtf0',
                url: 'ecu3neuy7m4axkglvlg4qrveycakfss917jihd7ebavibwtthp8k5f4lodbc8qrn5u0h75i5kmwzewggz1tgawb25kvvf2cy8po2jt6e2jarp9vaf43gqxpba4rmblyfqvakizxz0bhecwa2eax8fyvz3isqvmbhddm4e0p0iynh3zl7xzex58urygbkjj83djumaxrk38wvozbcawc7gncwindyekrtq21as7g8be6jj2cmzrvlnnhl4v8o434juvrgsf5c5e7f6xoz6mczem2zwbbbtky31ki435f0joodlum7kn6798lodgq5qtjc24c7wd7tuwxsv0i1e5lbgd2o5wgl76bsttek736evcqsi3352x777ktz9jib825wqajyyu58fxfofs7choaq8x1s5exvctmjsd0vo7m966zmok47bi0cg79976yqytk0inxxh9cypsvaso631ne7k8gmfqgamtu8suv5zqb1tvrlzx3jny2cagyzw2438kkpj9g72cyjl23cr0dih0b9z66fvhl1b5xgp5ugog7beeacizaz3dji904yzz23qnv0rl32n2striycjkj54dqj8itr88p951z17eo3cgsbqvhhr0ks9i4sj3s3mjj4t9s9ypdjrkdam7pwp4wbr7ya50kjfgbxqu6zb6mtw5ifivlj05m0dm34ccwytdm6xkkzuxpydw1xc6qq3fw8ge84bv6dt4kpihjhiymb9368zyblf1f1a81x1ae0qpg6isyge2nw8erttpspb0qhfhk2qa0mr7u1e2egm76j9gexc47rojs7qloqcolahu33v9c3021i8pd848ixa54g181s7w0zguq913dqswuqjo3f1dxwasrkvvo0dfbbd8pitppberf0fpmz1fnj4kcwwmyc0q88ob85dxebuwrllgtzk2oiz5p307y9an7cz3bziw6z3rciifzeumjzzj9hquwwetmu5ebrdrzkkkb21soxz4ryyqddkx6867nmuupb4puh',
                mime: 'jvxkm5s8zn8nbb8d9nbmrjrxe9kjtzzy21isw7cwr4fsxwdevf',
                extension: '5iy4ss7c20b210u1cb7pkwmr70tmhc4o4y51xcvv9pt538akwx',
                size: 1409527023,
                width: 558590,
                height: 562470,
                libraryId: '8e77604d-f2fd-4921-b54a-64b34e773b01',
                libraryFilename: '223zsl5rclxkl0lg30qyadozwr94qt8ifso7gbrmc00k83up2b25nififz2cdzrj2m3ad1ppmuttj3akyb4gdvd33skogflhiqoi4ihwxoy5ts44uj9nx6u475ympp4yto2u34nwixnc1x8y33kizr2ggwi53xinlurk9r6gu9dxuimkfngc37w5kooj42j47mvun4s53kuyhx4w68up4jk1y6fg6vawno3kz6uepj5xt1v68djzilziyw49zi6',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '0f7ee8f1-7644-4da5-b53d-e03cd62405fc',
                commonId: 'fab65033-01c6-4b3d-85f7-7fef092e475c',
                langId: 'efcbc1c7-90ea-4bd3-bf55-cba1b0d94b02',
                attachableModel: 'qlf476pxepbxea9vc8egd7332euadcrkwwoog63as0r25tequmtiwkgb59i0w90ybqpo8cll12o',
                
                familyId: '5fedbf4f-7952-48df-ad14-8911205a3daa',
                sort: 429298,
                alt: '6c1rdhll5ao4sbm3je8uv8unkt6eu8ssc3s4ch5ftu2a7mgpuflu6npogz4k0d990h2fx0o8yxhtzrj78hi65tmc8x2jnzwrfthya2kli5q9o5o5vpterqq8t05p3nrj5irg087q3nfksl43nmyw5n2bhutpurs5vh61j97lo5tsfjlrv27av9gpayjpn1l2kwbm9obifuii30rwol0f2hc3yvtdmv5bikohu71yiuh2vw39w5nrs9g2846slen',
                title: 'gou7xk60kig41y07ieebrzm424kdohljfl56ztwc6f2y3dvmm5isjtssd7r5fckqsfzj4zixbvhld8zh8a1ow6x16oro4wyau97t6sn4wiryqohpqt99szpne3y4rm7gfyny4ehd9vre35dinz3fojd7ci3z5nwn5uu5k4y8w34z0tswt5wemox1cmgj71z7xw62apk913d30f6ouahpniicmnpb5pk2wo98fl66843a2hxm7k978jhg8k7fm8d',
                description: 'Veritatis sit et qui et fugiat excepturi est dolores. Sed sit ducimus dolorem in. Magnam veniam dolores deleniti non modi ducimus dolor sint. Ipsum earum pariatur perspiciatis ea nesciunt consectetur. Veritatis ad pariatur officia nemo saepe tempore velit optio perferendis. Quo quia soluta praesentium repellendus ipsum et perferendis.',
                excerpt: 'Modi nostrum sunt voluptatem qui excepturi voluptatibus suscipit voluptatem. Aut quo voluptatem nam sunt nostrum. Commodi maxime eveniet et.',
                name: '99wfnpc7g4ozgwnrf5icqsl0bbm9tetp374umbdciiiib3t8ip7uw8y6rbmf6d5a4y21pfci9aq2xj9cyc3hhtr0xmpmsc8lbhz3z12zg2lm1sx5xjllowt330zs9e82yvr55r0ptyj7qkcvuivof5lsq6at55ziqhgtnv7xo2eq30gdf0f6q6i1os6pnsucx9oek8pabph6mz27e96iyqyqy1w9c2ry9k66pjo3j6mseqy5vgk5l58m63019xz',
                pathname: 'r1qmgwq7p8bv5mk5cxa4tb2iw72sbvrk4a86bhznys9z4nszjmjqjnd270kerdfj2bcxusk7t7wjs1bz3i99tzwj4bjg4vzqm1kh8g0ou3i42k3ufwuv6f6xxk0mhdemudad8oy1qmclwvag3e3c5ng1vjv793euuk0jwd7b3j39k7aea9l1av8j7z81msi4a2xtk9bsrzpqw13blbfnaktictvtgcony9yj1op6h6g1ubz3vrnm19sriqhp072jry966odlbryui27nkn7yz6zbo8ajaa8ybqmvpizucuymdv2mu0a9o5mo8hnlow2aqod8qcyajo5ygd30zpz7pp1esbupczg017r01qg99taim6o9a6w1kvgtf7vi424stoksjjxvw02cw8pv7z8ztd2p8znzjtmehbmgd12zqewvs0x264z7yo6yp99e80e0xb07zja72qzrzvcefwfy7opz5zadqtaqif1vgzmjrsfivfn2023pyqw8jqggxaf16akxvr6325x8fl5zls7g6uwaic87dhx3e92lur49kd5idkt3gjlhmqipmwt11832eq78ctsjl79dftb4g0fvaouus3jiu8sk1n5ixn3e2jp9xujgz76gk9pkyy8lui0r3a9qcjuyfb7wyrb4fxroqvm34g51gpfyg0tmd67gyzwk4w2ncmydz8t3rw4mtcwc1ge5ivqxn25vc9uwywc6t6uvh9ervquz807j21o4kkexw0w8bqmdkxss3wfs0nyhwpmu9vpolmzw8jp3ne15zwwnr7b9xkyiszbvaumfwm1pmqe99xcwh2sk6h6n2gd6cmyt1lrjyn9f26xolvuxrvialekry2fs6g5up34mzumd83npvzcligba5zuv5sfi5mq988jgajx29hy3o6upy32r9k8um2qmfnz804azjv1tdwmt4oidpuy3wdtahlj0i07jqn8qj65qeine126yxbtd6azs56b4054wvwzjf3mg6lcu3q2s7461ult68nrm',
                filename: 'o44k7ow8ha31upnbs5jjveg9m3lvmhn694vadv9lzclhq8tegtx4ia3w5gev5fjlhzsideckonhznfm4jhfx01mih454gbbpgq5epqyhr9twqevtgp0nstodjjcvuyqgwpj7cll4jwngkpryd3jxan50bmhtthnodjxpokdsgndh399dbhjwo9cn6d6p0eg46vosfaiiwghqb04yz4oa1uf9w2stzthpq7ehks1hn8g5wrr4qmri0z3960xjy6p',
                url: 'lfoyf9b4hlcq0yw8uo5roqgrh1mxdj5zqnfbnx0nbqszsj4bv2spahbmxky1tqjmn7yntz3hmeq3g1f7tu5d0pspfnje9lwoige63cx010m18ulroxgtz9fieerypw0ihdqi2fay9ccir373ljz29wq9ez9t4e1pa2gp8twa30curhkqa5zglxurhpeo8uxwgvzfdx7czu4xjqqzsk61a651yt40k1tt492rx1knbacscyg8mht66vhi3y6ocvgn5izbcmz8j18q0q728u6o125z33v1qg4zpnggna62glplgcrnu0ni5553eyhpmmmndul72anbr7d0s4yiupi2m3ks6a0b0uizc1dly5ac7u3cyuzr46064z8u2555gvq37ef0608d0p0bdn0u9p4oq2ck5r2hhakli6e0oeyy86iilmav3lrbdct3l47ib3n1zva2p6p9f9cahf7talu0iphyy02c49zmyji3g01x7oj49dne18kfj1497vfrvhhi3p1bn2tgtq6hoeaj2sqjw8nxj38kv1ludil2plc9ln5h4rblk8pk3cg5yiped451j90rzrlus1qgdxfzo5nm9wtk8t3yxbpcnc9eknf25lx7ayf7dl431v7vhvc0vss24e7w5oum8nmsdn1afc59jpk8g21gx7uoqap4vycjkd0q19uw2f6o3q18symkw4ck9jc0iyw8n34oe3nukzbiauskmte5b8ev7v8whjb72rwaix6f5yg30wsijubb4fo2k6bbcauq3s2koc67g3kyjviizqqmuzt0ubtut3470pvax52aobkqkx4ztoyvxnc1diztetar8pddjwg55d7yab80fx4di4jjhlspbiqnmy71jysuk3h0nudyymsfkwnnpv54yscktfgwv7tbbpeq12y65x9uemfgglt7buw3rm537ugf04yv2cqrlh6aq2mwxd5affbjv6atqw0wpcaf4c0wamxw53rd6w70p03qrlls72jpfk3qili7q8c2vg25',
                mime: 'nidpanzk8ne8j8ithc1vcjkl8w9zxrh6ag2cfjsycqwicvvi19',
                extension: 't2wde5vjzvq2npc8r5lhw0pcesdnpbeyulotwhm60rj17715mb',
                size: 4715030843,
                width: 908837,
                height: 643628,
                libraryId: '8e77604d-f2fd-4921-b54a-64b34e773b01',
                libraryFilename: 'o8h5yx423croer61jpmz27zy37zwvwwf0efhievexi45fodf4944u6wmi2ow7z3mybfhlegacc3y466n2xqxplkd4m90r9in6ggotg8e1xxa4w39w6it2kq3qasfzz9n8s6h94iyy5ru70ue0yasko2k3vo27mfd85udfp3wx054gb4hmzftbk4khreq8esnp99ahf5cj38icup97n1k8jj43gsityzmr97xsh8be34xtgjbiga6wkku9bxxidk',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '0f7ee8f1-7644-4da5-b53d-e03cd62405fc',
                commonId: 'fab65033-01c6-4b3d-85f7-7fef092e475c',
                langId: 'efcbc1c7-90ea-4bd3-bf55-cba1b0d94b02',
                attachableModel: '2sq95bvvtummn0m5roltnslriimxfdzwq1uwu1970mimedk1a1vhl8dedt9lbdeco5mintbjuxr',
                attachableId: '1ed8b8c9-5995-4a64-9a23-d34265309f54',
                familyId: '5fedbf4f-7952-48df-ad14-8911205a3daa',
                sort: 903521,
                alt: 'u87t1oist1vdo1p1niupyd2wr0jz76o9u3m9bzzhm01qsmj3kug8cwjffxat0b2bc0tp2z209x5vzojayl4abb04kk0xpfj4nmpyg2g9fquyu2c4oqnm4n5x3ue2l1ur7gby6x9vt1vonewu7i31v6qvduyxsfpvhu1ool2pmqirihdg0zuxmd1yqw05mtccxhpvmv6djukjmq1b1k5cjokpx0dnt3ou138lrdycnit43gz2okdu2qg1ejzhst7',
                title: 'vccjormt6j9zjajm0e44oyuedmj7u5jplo5sa84qexj7gm91auoade917oo4tl1cgux6xqume22zxfq33ofso5hjjda232f4w944xikfxrou83fyl37q09pxea0gpws4kae79g2xi31aiuh49f3tmz1x919gpzo65cs6i7kc3o5ibzp0douflyn8qbndamhwruqzh5qa79uz70uwsh8ysd93u2thv77bzo0kxahn9d2pq6rmthgy7349xq382ls',
                description: 'Necessitatibus est eos et repellendus. Nostrum exercitationem sint quisquam. Aliquid aut qui qui maxime doloremque minus omnis est. Quia aut sed et vitae error sed. Aut dolores dolorem nulla excepturi rerum praesentium in.',
                excerpt: 'Quia ut dolor sunt blanditiis repudiandae qui iure. Quia saepe ut repellat et velit voluptatem maiores nisi repudiandae. Nihil commodi beatae maiores. Quia optio illo unde voluptatum doloribus ut eligendi maiores tempore. Ducimus asperiores voluptatibus dolore ipsum id doloremque id nemo omnis.',
                name: null,
                pathname: 'hbd0wmy6m3nrqjal2enccdbsg0rziob5m993xoqnnetw05n86iqieert81b66cz93ruwsfexquncjb1yzpg09bj9i1e3fkxn1y0wys87bzrxwwoylny7xy8le7x9jb1ndl0f4oi20bnror0oeucizqa3ig3jhjb14mtuu32d2qnpxjenuyanm2yv9e25acmp2k5m63p6i06nby6snjzayw8ioqbcp1n8jwsm2d6c2ftkbjpzjvol1nm7tf9ra1wu5ootb4i3oc8gi108blgrxtk1q7uk8zvcqz7w7kauv9lu95wlxdq2rsrwsxzlpjpxhjpggcyfbbcw1te398pydldpan9gpq0hpyl2fcl1g394mkl2pi8caw8xi1afb69im8aknfxqyeomesmtcopvkgbmcskdcor0du6p89qeq749t1ekphjvr9ez873xqex64o4jua3e7vo3fat82rrmvm154oxmblc06s1oj0x3zd4nbaz8yzl2ttrmohgimv8jvi2g81xvjcu2vv9olj47sqo9uawfcx8x0t9rsxepxph6pywu9mabiisr69ae5l896z4ov8echu5gziy6o1h4zyxb03s75v6mdew7z6q2pmw0og5em6riidfblyhxhv5z60ib3fms4h8apug881oh1nv1oi3r4lhsbwtye9hqohf6a55oiimkmkpc1pco5y3m5kg0pkd07gsvm9oh1mm6umovfe2koaj6bt51urg313w2xuwqgzdwo2nq6htjgcn3n68w3l9j6pnibi88ebpdqnjs8qbickt0irslm0cs6y7ej1phah0m9tg3pb9iq115vxrf7zsrus0kq9laap64dgz48cmec73wczxrgskrs8ey8zrw80enystby2k3pj30ajyj059zgmjuh4vpxe6ek5s305i9sblr1u2cypgll5ywyqp3i5ry97pd5zz9po0kjtnqantp42qwg7vxdp9f6g8w2atz8fwtiyprkvyrtnlc4rk1a1g7khpafmqon3y7',
                filename: 'szqpncgu30a8uama567fzgaq7y9iobvuqrvw6jrtzohss9wmq6kgwcqwluqtlmz86rn9df4o5p0wbaqobpjvjxiru300gcs466cjm9batz2r4miyzhtytav1n4s3pq1lo7jcwx8jex5vbhxbxue7ja6bhpvjluawvlztkpkdms4typu6yg5ws7uihsrm4d7ht551t4yo5fzq3ojeuboa2a2pugrnvx90lbo5nzodhnpkiscevky9ukouu1q3zaq',
                url: '2yiq5ip7zezfty8r3f38a1ixg7ss897lo43z5ioa16ip9tyqs9uak9trexif49n7gmj6uybgv85mnz4gjjxkbl7wo0eobm1r0458ny6m1t5iopu762bps44f7s0ub00pubjqc9b2qlv5rlddey44k41ctd8w80ocvhjujtptvkcqyvjw903yxu4tltaat0gc6z6chm6dpr5441h97hexyji6t21qp4skizldaqv2syhekxlrpba4c4w3smy2euagu1t5lwp6kcct5vbo2zjpwud7oau4xmp51lkbqh3i3k7b2381s8hett614c6z41ee3mrlzl79ev2jml77x0s040t7q7da8n8a8ziy890mmn58jkcvjnnl8o1ut0r8m13awpsra30byehkzrcclqglkrbf7xibmv43bvu0tyd5qlw1suyb5vihbvxbmppkyhdev7mokq4wxvbcg0z8xh4ax3m0gc9mrd91lbp5nvljlt5dnrdxgiub5zvupyj3ipcg0n2ar3bj6dbgnhg4eielzc2217vkxa721tgvy9o39gj5i21w6kadtuyzznoyxsaqbdgnv0kbwtwca5z38c1nt8ozrzway4jzqf9hbfr5h201e3necifqoj9h9k5mroyex0wh6igb0tqa8hpbi4782kjb7wv5zp3ae0rmcbts1z1c8w8owk0gb2rkxele77lsnk0i0ueyds13qxmv8254gqhdg5cljdq0100yuy0j2mxqr3initqzlrnlwzxfacfflwbe2nxdmrbpp8oyrgymwhb4tunrwwv67txmn9p0ufwkyvg3c1v044k98phqoh6byup6d3p6oqn549ps1tahbgi3fagwqt2dz1yim8kahun3me5pody6qsva16mi9ddr3btd5b8y80yh9k0dl3askyx866u0w6hbl9mvprdh97appuiu9os46fwdc3rnwwkygowh089c48qrdj7ya5sens9j6opmo7aomuw4ow6bel1tgm7iwxdqsp9nckgjmgo2',
                mime: 'op1nj4w40yo41m6u672jkxmtyaf2tjlpd8gymlvy3399rlkyy6',
                extension: 'ya5swvkhngq1yvlps0wgjyx4viqbvwpogonq31l3due37nog3o',
                size: 8211471592,
                width: 677604,
                height: 966670,
                libraryId: '8e77604d-f2fd-4921-b54a-64b34e773b01',
                libraryFilename: 'hjiz6y5ktox88of5kipi0n4dlmchifc4eao2wv6nehkhz49grc3tbe9v2hf2ruc3o00i0ih2tn7y5sk8mxlcckaadf0aseo56stsp6yp2sz7vkp44bmm7f91rmjr3byhu9hwx5oikp18mx9ixu4vp8myzcrct7pg83pg1a2gveldxp2zweqr6jq9fcqgdp9yzbdbyz8lxzv4n1o8nbajildyugv60nn8xk1qvwxzfsykxy5r38did0nbp06o7cf',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentName must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '0f7ee8f1-7644-4da5-b53d-e03cd62405fc',
                commonId: 'fab65033-01c6-4b3d-85f7-7fef092e475c',
                langId: 'efcbc1c7-90ea-4bd3-bf55-cba1b0d94b02',
                attachableModel: 'av7nsdooigznw8m61izr6i7oweimkgcosiq4k7bqisk5s034ziqt2u24yf55dvfag6chpe1xlt8',
                attachableId: '1ed8b8c9-5995-4a64-9a23-d34265309f54',
                familyId: '5fedbf4f-7952-48df-ad14-8911205a3daa',
                sort: 424326,
                alt: 'nb2a56cync0nl71la7bzxvnw5mt0w8yojcpw5elbdxk6k30dnumndkaxda5mk7lx03w8piapcia2b86qbktq50y7orrxfjy95ixsrpbdq2a9nbf8dr9ynpvhy666m95jreh4r6m7dpf0pkpjtk7zn1zco1lsoak42tbfsxsgtbtrb7w0kib89t0od1r2kpl47bbr4ree00siqiqmbael87ktb01m7jdhrt8vo7ou868rgrx2mm2j3fv7r3ko0g3',
                title: 'dp7kgwpjkoblifychvps0ry1kvala7vsvyjcmcg1zacgdaonvkfucm625k4ilko9s4hfvxmqecrfsvdpj6z84bs7v8zoegnfjih1rep6hlhzra5n3bwb16yjhkeel5das5d3cx4x99ev8v54oolz8tmvtcvatu13b8gortorf0z2owerl36jeewxnklafl6d4qx9vffsd1j4i5dny55f16dh91vpxgaugtmsam3pthu6cneqhx3bjh22xyg348n',
                description: 'Ab ipsa maiores impedit et sapiente. Dignissimos id animi illo vitae provident vel cum voluptates. Minus dolorum tempore a dolore. Voluptas unde omnis est velit natus fugiat perspiciatis laborum. Provident itaque minima dolor ut aperiam iure fuga velit.',
                excerpt: 'Et itaque quod sed et aut quisquam et totam est. Voluptatibus cum temporibus a error assumenda recusandae. Aliquam consequatur nemo. Sunt sed a iste asperiores dignissimos. Qui et quo minima soluta error ratione. Accusamus aperiam voluptas.',
                
                pathname: '68ltj4v64if62ywoythzawvcutyy82l1rpip02glsbwwa1qy89yvoowxvrx522h8uruiidb0ulv5b371dcocipfuqk9q2ykk50scq2ewzp1tsbblnjhmna74vvx8l24ghuletkmem4syuuu5bgn3hmzq459w5zsw7xbpbwx26o5l3ppftjdj6tamr7pgyxn2sn1f2our5i1qanj2u025ficalq0b45trhzp4r56w5tfybaw56bmjvxol7l7bxaawiuq45rl3pfg4x8zx1t59phkjlqrl0rxdlcufc0p681werl48ardmqdqctdsruf273jcr1kwrksx3vb2jz48ihgpen6ikxr6xo0x6jwd4zoqteb1vr0mq74ti73u9lomi5xpmlmyoy0ni9p1m4xwq37s447lqs1rndqvfk44alu375goshpd602d2jg0ctilhkbl8r09hcqq1iwb6nybljrxm65xu9nj60n8ypaalyu88pzqmdamt950r90qssxany6yvvuxdwyw72pj3hntf7if281v38omipjfrjyxp7wi4roimi6tgaocpqcv9qbc3h8n7wve42wqzsmapz4t5adj4a81nn1sci3e0cjtunw6rcd5804x7bsvwopf382b6v846ar84o6aeh4bngfdw87vqg2z32ou2dq4jet5xzs9qn1lzfm4aaolyszc3kjogzoo9m108l0uls0ioof4v0nlze216khk4kj92204ff3vurl8846cbjvtc0yh1pj01lg11bpkdnie5wqhdcqqc9haxs9bd94o4jy33sea7v4ppbnfzyxa02ydkilybofraqo8vo8abhqpiigefmazeacbm4sedk54867qwhk90en1qd98k35yawhub9pkasya8lvyvxd4vhj2eglbwq7gyvpj43izczumx6v47kyqjv3whp8iv6ntnmxupo4zhb8v5fdncshzgihj25donmhygf1qnjhaf5f2w0qu9rkbr12bn3wp7tth2hgbprckwlu4c',
                filename: 'xncpsq3ke72tlnrmwaf82vzcizwsfrctq52x83p597tyzsozdz6fulc8zuzkxrtnv4u6dtjn5gayzpvy6uypbomwp5lhf7d6cxkkanb3wkq7bdm6fd8fdcvk96266ac0mbdluvn6epj6sqfyq8ttp7wd280qj7qhuaxc4qk7ynjud4t7igox68gxq8qtknc2iou168l00n2cgbbfqjxlm8lkbg90qqgayfggafaat4jkllt5l557kaxjpv5e2d5',
                url: '0pws6lraqyjpqfjheyhwo5wrrwwbrmt8easorl20oi0m006ec7ruj6ssglepqe48pupr8tzlbxqa8t354goekippth0skzdwao4cczhog9fzm9su9fcwn9ax2kttk5lilnx7n04owe1u5td1rcfhibf2pdzgfo64lvraa25cw1lu5pkc10q28wxswuwcg9kdhu8at0w7krim2uljy011b9ie8pqagi7qrng0exrenc6d6rllvxg440yhvpf6qu9fcey31c5w95xxvsrv9wbjvxqksu4z8n8phbsgxuffdb1jmnsz998693jw4vlapk0keimoqr0pdscq9ycvu3t7litktbb8ywjasdi4335tagcgsg61lt0xrv1okke5918w4x9xmiz45drs99zyimh0vpfdb1szf8sxykkbjf23j6by7xy9rsas0z4nqco83uyasatm3rx5d3q6cilcr6f3muz12x0s2od1h1ptmkg89jgt2twe1pi6eqqqzpe9aqp119k8kwwuq91x6lqs90ny5i6k82d0qdjcq3p7x15atxjy8g8nz1w8vvkmimnpgjtchhk2zhzcq7lim58acnnf2zzwtn8yru34fjhp0mcdhc5g9y5giasuwhntt8wws5dsjc41tzf8lzx3419lx9kjhduao17yk3p6ill06f61up3hc51d32ax2i1pav5lrpj6ho5msbm9b18tuqtt85qu6s3ss8ldk3fg8ubwgkheanmxbt95tlos03xu2l6dv6ol6mev2oimrpvckib4n27j1h5wfkp07r04ld0sgx3zx5755w3f23q7rtn2m8zvbpmq484e6jszr2z4yq9clxgzxgrzbk53q4debu1yfilnr5afj9azxmi4y4upwl8ar7l31ox97bc237ymcs39ofn5q5hjfkkgwujz9090yfyevx3qqh9q2b06jyozjmkngdp4klm6ya5hlrad7o9p8zxggd95p086ipdwzy3765oihy7lrvvbc4oii38fxjphq9jh',
                mime: 'n4ybt1xyk5h6rais2e9iluqpgj5q82jxdxrr2t92vsa4ggugcb',
                extension: 'pq8jzkkwxlkj8y5e6r93ehy3vn0wkoe3llelaokb6miqcflrfv',
                size: 3151409070,
                width: 458115,
                height: 826857,
                libraryId: '8e77604d-f2fd-4921-b54a-64b34e773b01',
                libraryFilename: 'j8s150b2qypglvo09y6br8xeoea1vb67tf77qpnpl9ri1n2i3sa85q3d25jyigrd3d9tkduq1pwpmms46r4zy9nsttcb6gwabg1apbbuq6s5nlc8gb1afpn3s4lz6q7hpi9jxygzugsql9gohkkfagz8oi8szb931hielktad4l6kzi38ke90zzfphkwfvwulxqpmrej8j5ptbqerr8xu4hkzab70mqeootxi39vc5tn01v60kajsvnbvvs6mty',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentPathname property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '0f7ee8f1-7644-4da5-b53d-e03cd62405fc',
                commonId: 'fab65033-01c6-4b3d-85f7-7fef092e475c',
                langId: 'efcbc1c7-90ea-4bd3-bf55-cba1b0d94b02',
                attachableModel: 'pmv8kibqinf2ngfpwt0ixpy8aj8m4nk5zf40g1jeotptpwr0v0on6zdsmp7v6q6gu30j93hulw5',
                attachableId: '1ed8b8c9-5995-4a64-9a23-d34265309f54',
                familyId: '5fedbf4f-7952-48df-ad14-8911205a3daa',
                sort: 788638,
                alt: 'j2woh0abglxdw9k90pup4e1py6aflahryu9lz05aqwy411ijhz0oguo0lwfmy28awl60b2a7f4ar2szto1erqcs1tvnqenmabmje3j6o678incpuox8ltns6i4ioaaw0ixo060k5ttdrpca1vrisk8hg4id92x4jeidcylvde7ocrb3i2b81jzmvtk2lhxba4cyym928uph77m2qjz7dp9x4lbz5jt6kgg97fkjhcr1jp06xwrpyevvf5jtcegs',
                title: 'eq8lnyuuz6p7zcgzsckvi983pl8voofb0iwozzrs1zvzr7u7fgi87cbwdcb3ey233cd2okfzfbnz4uhmak77zr2byqtm8wazjtl7e5flg5hccjcpx4y33hd50f0j8z5brkr1oii5o4cfgo2mqgiwxnfd1z99a1v6fvc3ie9sizfwgwuyaevx1ig3g6xu9og18fc28pcoo20144vjraotpt99o87r05nfebszhfx1nhh91dhk9rpftqch5o0mjf5',
                description: 'Iusto amet est consequuntur voluptatum. Asperiores hic et magnam autem qui ut cum. Vel excepturi dolorem facere voluptatum.',
                excerpt: 'Tempora similique consequatur ipsa exercitationem et. Accusamus totam blanditiis quia odit. Odit vitae quia natus odio suscipit sit.',
                name: 'sk74q6d1b13ymiryg6jhs8tnrgmoaccrg0qq7tc1qw39oaezf4is3oupkclfs551gqra3hrfq7nqut0n9yd25kubm287v57qyf72ugx4qydxqc5q9l5q1izgzxxfc8hesurcflgbh222juazppncwpzwq7pgb2cszg7pavt1vtabnc9mbkpfcm5rr74vcow74zovgzbyx43webgx6nwbpuajf3wxr2v74v0h2l96qsbjyqga7hmtr8il12gemp9',
                pathname: null,
                filename: 'jde6mrltywhgx2oga4o5ry5bfwovro73bfrm1ufad5x6j9f8o041v7b6c2g2myp1miyjyh6bbrmocqu3ehw1dkeqrj5aeyk2rhxnfmnh4kbh02mopgzd810qn44hpyersiv4en5y4l9y0g79gwhfzreurhn908t4c8hod7wblyaal371vy431f0ku36jz838muhp4n0nc4n2g7hxem8ouetngcqq92no8edphlgvlk69h00n21kjlzl1i1ta3ve',
                url: 'mkkffaoxrqoiprs5e6m7ugnum9h5vu0esrur95vo0pm1umb5i95pl4nfgryn5i3v24xbikj6xswllpb841lgeyx3fvi0unap56h45xpp4a0nweqmgfmfrs1ojyxkhimsti5z3xzxa2jmls35jqgdqqy8s87lohpqed8alydcz4ck32jof14dknl9pk60xqs3sgy9r7oukj32r9ts9yovxr04kip6en4dkmgiexwh9sxuw2u058xpw2rix0hqsz4spyu9740z34r91ebgytlmfifiqgjef8s6y927e0zw0ugdz6nwn0tzmqcq4b814oehpqejl8krsdmoe3lmhil7kx82emde7tb7mv3x8nv3gows8gszguamwj2xq477ek99dbq1adf712c61oowna9rjep1rl84l1pzx92iig7b0ah09ne83o2ymwvhll83qrl4cdsqbp7m0rqrivy636zivkz98hktx7hmkgxrt0rsqrque4p12nukxscp9vhakeaj5g1lu2mhyfqkdqp1neaeyhjytjlhz7o5hnaglo7xbu9kn2jdz594np6p4vqorwj1ozwwznargpz771eprfwwtvi5o19hfa3uaoem4zy43be82aaftydcey579qwxrvb3whkmmtcmeuef4twx765ymegjloni6lg78ttf0bn43bklofcf9kjm34p4edmnz2nbzgxxt75b8jbe9ny5umjs1y3ohuboch5fgeg2071n3cu4k3hgddxfp9jkg301zhftgfm6vuaqlmtyejpyjwffgjz7wrf6yxglb24s9gvx6r3u2mcn3uh9qmejejuldg5kwnb06nigglr37hxb4r5womj6pffddv7ve44wyyikh1n643s10zcjf6uu8t0oolexfl7v102n6kppwfc6f5p4plrze73zmr12xnsxgc7e14kj6bafrwjfvj8kpihmad5296hn0prcf8kxd6hx5a0fly2kixum77j7563jjnlxhjh8u6wtsqc5d6fshrm3c1ra',
                mime: 'atfez5rjsr8y0q1w0jwpcen78whoe6zkvxax58lstt4zb3lkr6',
                extension: 'wxr97yhdt7xrob4s1thvbef17mpk9daykggv8vbnrwjc6tlaya',
                size: 8897687119,
                width: 247483,
                height: 320297,
                libraryId: '8e77604d-f2fd-4921-b54a-64b34e773b01',
                libraryFilename: '0xflz25m05kx75wxnt2y6avdek2bwyvvi1pes3bwr7yrgp9jhfw40h4yigxa7p2n0qnaeeliksu0y6s9meoes3vjqe59tf8soohg8x555t3dqqx1e2tucl6pjyunhv5qv7qnxes4s6cftbuk23lntp0y28dgs70w6xpsxzvh4zxc6t9oqnmqrarll72a9zk5yo109pe6doxre4zlzmhbjgmdgeu2nfdpm0ott1yzyl9smgk5n9o1kh6ff0ey62h',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentPathname must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentPathname property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '0f7ee8f1-7644-4da5-b53d-e03cd62405fc',
                commonId: 'fab65033-01c6-4b3d-85f7-7fef092e475c',
                langId: 'efcbc1c7-90ea-4bd3-bf55-cba1b0d94b02',
                attachableModel: 'wgkfg3i0j0tpmn0eqmg9a6vwm1sdwsxzuzh62sof2anuzmj3xpk6yq97ogjuer1dbsleivoubpb',
                attachableId: '1ed8b8c9-5995-4a64-9a23-d34265309f54',
                familyId: '5fedbf4f-7952-48df-ad14-8911205a3daa',
                sort: 606173,
                alt: '3d5jr2cs602kk2zi8xndivria9ii3hphpy43o25vkbn4j44mwt417aoru8xjx8hz739tclc1snameko5wesi36qi2g1ezzr2aj9sk6b6kk96ak1orzokt6uvz79c238ej8onlabqj1itnzk7zm89111992oj0gf9h3u6666616qtivuaooniqb0tpxybfgqkmz2if2jly7u6xld1qwc5arihmgwo9pqccu5bx4pqkrfmasreu3dejz06yeqnlup',
                title: '33ed27r8fst9nbuyjnnmyr0jul2ruq6z1sm8zdifye9u8w9cn591tutgs506qpbmxw9avi0i4i070vh2wrptcwm2m1jj4q2eo6kg9bn9sgnzg1s792owgm0rq48h6mavdqcynqhlhr2n4fqjsqzada84r6oh7bs3u8qero3orajsupds5rf537dflnwro3wac7484hdhzsflbchtr28w1v2hac456j7ei45zmmxqylaaxmon8m2qe203wd2nwrq',
                description: 'Odio ducimus non velit aperiam iure voluptatem voluptatem ipsam quam. Magnam nulla sed non. Consequatur reprehenderit numquam fugit ad est adipisci. Tenetur id ut similique vero eos. Dignissimos enim a esse. Quia voluptatem molestiae delectus architecto quisquam.',
                excerpt: 'Sint modi iusto qui. In sunt aspernatur numquam ipsa nostrum ut eum. Voluptatem et quae dolor ipsa.',
                name: 'ih6p1mx5zhr7b80smj2f2j8ijgg4szpwjmmtcaiv5ogwrnqqck3wkvdxk12427orbu2n9s4j36p3uo9bgrboyt8ksnv9ts8pzkl9nxlpq7667bp2qnfoyqpmkw82fot0i9dxwvjr6ffd9hwaha5tairdlbhqvir0yqblbiisrctqzup5k8g6mudj2fj14dvxutybkwau1rag685rzcx7c0b9f54mcdtn673obqa9sqnff4mi3hee638ia3r5neu',
                
                filename: 'z4sspr3fk9w63pp6lq71hwxq67uscn44rdxd1v2ngi7winbijwi56gerl55otao7uyu8rfswl142rlfc5ub9h61htm9vn2jm75r0nzpdgpuypo8q1so842uln36sqmvwn7stollkqaoatqo10kwrv80lcxm4e62vjz0qv7pgkhue8hjmxw64tbchl73ue0zj3oq2v1qi9zsqwxagywrkiknsq1f0miif8g2des6dykoj95ucp8ra2ctkazvwzy8',
                url: '93nu4prm7sx0pg64153qceqoqmv84vobyn7vk7gr93hbee7iyb7tx4fkez70kf91mhc3kk4v87duzix6nlqbilb2hl2dczmry2y8t1j4rie5ekadb5h59adjjmf1wt8oykc2qs893ac3xz9grye8d18nlmjoq5ysakhmb9sx6woiwix1cmrbao8bixk041c2hvgsupr6opodyxq1uhcs4x8ca02a52n6e1bpryjxhda284dnk9mk39gkd4hk4iur8asxnq5m5xajdl5rajpziyg8mnqvupueqo47htp0v6eddb0znrnr5qxsbtbwp8yevummvid5pg3dkq8rb2b315l6b5pmy68mlkjfffsjwm8b0b636ayo91nvgw2uousl9pt9sar2a12c65ad9wppqnik5dkatc9q938nqzvz28ohrmo9b2jj6dd533dz3snplbp8fljfdh864dgmh2ja2lb47kqvy0kl6ias3h9hw3n1ge220o1guhu47xsml9shymu7c5g6rrnfnuh3744kgrepibnhwd1r1sw6k3thjrw7b9yv34xe3oebi35cwxh9dj7i6rrt9h788md3smjzezx142zdb7y8d25sza1ogtpjpf9wuqdyhnminmzeogzycnxdblcnefdldrxluz78tckwfa0hf3279py8bniga6m7a6e3ihhrzz1paju7wjb7vm5k4hw51tgzua8tnq8u8i4o2co2fhhy15olk8vnafdcxo34mid5rynetwgw5jr1aed4bq6bvgydndkza2ciqe105po9er9mi75cf7jehdqbbuwvi2ge3ha02eq15nfb614fpfttj6wwj5n1iel2u71do02tfsvob6e7dxnq2crcjs0dd6d6z8ne70bmsemx6o375b5qbxvodwrsnlbnu47z6ksi2f9v2u91z4vnibl9rz1kpbjz4zm6iti0q9j2loph4q1s084tl4wgsp2r15yhgdkzsjv00gk4ic8af79zdpbh5ivdbu10i4labvgc',
                mime: '3pnxulayt7966tbxiccp3zqg07gjv3e25n4ustbvfipfm7n3vr',
                extension: 'pi7mpir9mfjys72uhwijt5h34llqfnfykfqh0ydf30n36d6v12',
                size: 1497684685,
                width: 212935,
                height: 988484,
                libraryId: '8e77604d-f2fd-4921-b54a-64b34e773b01',
                libraryFilename: 'ou3dgrgedti826ocw55j9b8qbp03mzxpj4ynkcmmzt53j0vmz3qcoecub71g3p7elek16kwphhhdipeca5bdntzi3fjni4gx0i7jq4lzyptowkw8pozaptaula99idydlzulxj0cke3u4yjf4xclhxzdcc7k4vids8xg8un77ltz5rhq4943k5zmojnzj84j4su7g39qlwr8kaqv3chbawfh9qtxknrdf4z2cx2esgxcuk6h946av7wlh12n5ec',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentPathname must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentFilename property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '0f7ee8f1-7644-4da5-b53d-e03cd62405fc',
                commonId: 'fab65033-01c6-4b3d-85f7-7fef092e475c',
                langId: 'efcbc1c7-90ea-4bd3-bf55-cba1b0d94b02',
                attachableModel: '2jmlxhri5jo1zob91p2ilhdoc2wd8gkyw2xpvnd4e4jsp1bpaywwdhi8lmeae61eju3aq9skssd',
                attachableId: '1ed8b8c9-5995-4a64-9a23-d34265309f54',
                familyId: '5fedbf4f-7952-48df-ad14-8911205a3daa',
                sort: 592021,
                alt: 'o8fy35k477zh8ertvrgrhof2lw1bp216lm29w4tuzlxjdykrwrzh5vbuynycm4oo5aqlf2e9pa5s07gdcwvqb6h286v6olrv7zx7did3qs9o5d46gp9wreiehpawj9yxqwteshcbhy3ywgmnma4kaahuepyfs9l3jm4c6kqnbbgp6t1eozl77jjg71j2uiqnbo2ckxfp67g93qf3dd15ok74iuk2xexn3njmfdxuoz4i4cjf74fkliewza2jon6',
                title: '73pyxq8t1qfgc7onexuu43hvl5c8tvm2lvifkc5v1i01gd0dlh3v0th47yx0ty5qy9wba49m4gcx1rjykn3umx3pc3qypr2vpnlld63zbxt0yoxylx08kregg10vxat6meqn4hamhlnzrff8p9xzha0mxqylof86o5a9ihnt01xmqhpw71o10f4c7a9ncjbkdb4u0o8svp3oa4jncykc9afmsz5w3ocy8d0l76f6wtn1gasaoqzn5cxi24sio1l',
                description: 'Officia accusamus quia. Quia tempore sequi non eligendi rerum aspernatur quo sed asperiores. Optio commodi necessitatibus sed sint quia et corrupti aliquid. Omnis ipsa et ad eos nobis dignissimos eligendi dolor.',
                excerpt: 'Molestiae aperiam temporibus enim. Sint sequi aliquam. Error odit earum aut quisquam aperiam consectetur consequatur. Iste recusandae inventore nihil at quia pariatur facilis cumque.',
                name: '0my156wh7aqhf0d2u7sv3vt67wdn00i1x9xbvuuikal3t69brcvp3uir31lp8b1j14ektqcol0rsu1y09d2c013d4qrvardwg7r7ieyemjyvehdlcxhkjhidogzgpvc84l9ufuhp8rcwh1ldgm3ixvlohi8mt7yzp3o600xuvkxvm2xar9gx22r2fpkztmb6s31any9vkpmuv5dptb8oad72b9ot7vtcq4ci65tk2yh13fii18mzsmxfolafps9',
                pathname: 'q53btjlvuxav1cpvzdr6aa1pxm1f2jmoj19mbqwrfd69r71c9ugmapdzxf85hynxnwnppmc3fvrahoih1rad38tedd7pm0zcuympoaup9kn1bx3fnpmcqim7ef6vigys4kzsxqtftwcrhmqmxfcs3nwtvoheey4p7aq971zywacgkvoaujpb3gwe5z5xk3s6k11b2mddx9ug0hziapsxsul5jq678qiq1nxs0k6jhy0yfolxc2spi4bde5ygmrol1ruc2t3qo03jsuyzylkt9v3g8j31lk8jiy0tdty9pq64be8z3xfe60050r65aiyqlv16qicos5pflsz0wypm5fla6j4ybvxi26b555mp0vhd9lxkvvwh9y0tmr2duah3g4debav8psmeuawqlwic4p6bf26k5hy3dgl3dnle7duwxevgmc5g5x3rn7x1zxrvdhizky3flv3kp40gynj585ry3a2y8e4zio87uickhv2aul48o55zw0xtnauedniyphq7kjsz7qtkg9hddwse537upm93h3acjhjtbo0z6pvmdxlnj9o4bk5jakd8febp07cn32tc13focjsm9wz49gyf586t6zjvf6rp6zlbdzn9kjvm24ypm6bh5yjd34xit03vrok5w4c9xywrgkatvw3qu3jtj6palw3odk5rafmmx6zqrq8o8dare86rbcmvwxtycro8riuy30epa1uuftju5fpj18knu1qf9r4gl80s8qggs3nwnx8v98fg5r77nfhwq0p4haybtb6gxed85fx5nukq4jf1xk8j1kdouj6eldlbxn9np0ekr8jmgonukw5gt2lw1xp6wnqdjdum7qdbtojgjz2ccyzh8ua89ki4r370n4pgeg81amx8pu002vhih5iyh1hekdtojvnyawbxk73ukcxswsdkktct7fgsiy02ghpl06bq0ff6df2te4kw05wx24ujwguo1ec31p9a85ei5drpcc06b161qnmiriei9vpq8wjoov3f8zl3',
                filename: null,
                url: 'vv744uobo0cbl1nfgao8krnyrbj97eyoe0wzviauxogmubkrf07fzkbjzxy4e5jfxvkhljvite6vlndftwh3hfiuuqdf57qyd0ns3ac4uy5ihhbjr42ucgxm7ljzolc3sagcw0ep8k51o62lkgooxyrhm5r7rg3kb9w3cty6cb6lg4z3238g8r5ynr8tujv5yipxa8sgeyp6ta3zu4f0vbi1lguailkk9wd83n29tlif6a7qs1u8trw5l9p2myoinjuynhsoq18mk251kou8hiwm2gwc4aszv2dsu0voz05kd7o8wrnrlqo96gtdc51q0k2ubfbpthc0llauh781y5kriahulqca9cpecyauenr53awh5yr0x68hzgkpg4cvzgj0s3dbbg7rlm1hn1mup0qn3ck2g3rejcp6xwx2mu41kthbni76sf5w6ygq3nj6rdfxrwh6hz2h3y9uetqqp0ctrwmwouatzk14x9vtyn4kcqiwm34sbq34kul9s0taf0dgpqo7i67mwhc50xj23pw9kteqv4kun6nlfpq6qn1e9cgjcla5mieavl9jka05dtq3qux27alp93toym0ziy3tqgdwaa7ix2wn1oiqcjroz6gbjo4qrnjkdntzrf4r4na8k7ddv4qzoknuspqscmjoa8tgev33421sxsmi1xqzdoqzfv4ljin6smx9vlrgr4k74ykhx28mv2za42u564am489epthcgxvd6mirebilroadssq4y6rx9u4ns3auug55cv1ahvxhdn60for2ovvzqudw6c1ppy1gctoro443t4xvunxquu0wvw61ttmrk689arakrqoplwkm8i8nupw68s9jxlyncv8m5pnmjwareabz6ctlmyyubzf37ei2yrkyt6tiur3efzpin5yjehmmtjlz3tdjc2xlbc4a67fmvmvcsh02o1w4aup5tou7u2qn0frbc24fx3r19mih1iyzijji8xnz872a9jz4jqlgbh9uidwj3q27grqllzap',
                mime: 'tz1r3ngcov9inhiyusmaob2rh58eyiwnp6vlqoegej09x9jyll',
                extension: 'zarwobyh714fp8e3ecugrs73hku48za3fxuglua6ale5p76j2t',
                size: 5993143411,
                width: 614197,
                height: 891857,
                libraryId: '8e77604d-f2fd-4921-b54a-64b34e773b01',
                libraryFilename: '8q1ricq8ygydrxt7lyhvycjaapmq5rj3sjozedmp10v85swsjv7ixxasgmv2hglsrjrzgfk5q8c6rhxufe8l4dj9b25gxkavi7my8r38l5t6zfmghua47abukxqr8j2jmrww0k53ap8gvirxu974ol84hhg0zb7i7l6p5wmsxwx1z13hm2l9zz2o96014qq3qnk1yd52u42faj7xlkxswrt1pc1d5tll46g7iv1reuvjoi8tnu580gob4bljm2z',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFilename must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentFilename property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '0f7ee8f1-7644-4da5-b53d-e03cd62405fc',
                commonId: 'fab65033-01c6-4b3d-85f7-7fef092e475c',
                langId: 'efcbc1c7-90ea-4bd3-bf55-cba1b0d94b02',
                attachableModel: 'zxnc3ip02uvjj5t1vua79kvtc65ujpxsy83qbdmhbcsgr90frd47wefdzgqypv6t6q5gxveyqlj',
                attachableId: '1ed8b8c9-5995-4a64-9a23-d34265309f54',
                familyId: '5fedbf4f-7952-48df-ad14-8911205a3daa',
                sort: 571699,
                alt: 'nxxldgyxzffouox81965sbbjxf50p30enwbg2sczru0xcugv2j5ff58i8o6pp2oiabpu3o9rwcb0wklijx2p8j7xrzae7c0t74zj6eymhg5m51y5gbi2sthcjwcrd7417xdra1j6l124hd6y3dhz2xdg68pqtvzq65cbxe58tcvm7ju5gpp5dd6tmbizrjer8x4tyiy29amn99tg47ydn1tcgwx3w4q2ou234znt2ia5pkasg3djp7ombdstyl6',
                title: 'v84hi0imu9enqzvehxfzelcneijt1nw1y32lyvmnq2vyevaz6dx7hlpe9c2gsdfwttruq794eq2vt3kt802vmh44an7vifh66dg83w9oyspkblqvi3y2lms7pmp91rjnm5scs4wp50gutqacs8z797qjprgixqjom3dcyi0d6x4fr545t9skuwggkjtp57d3y2gqymcl84b765mqinq9gbcugu78m6m5lkd0w4wvcnzxk6pf7p687hreok77cpz',
                description: 'Sit natus ipsa. Debitis voluptatibus exercitationem esse. Quam nulla ea optio. Qui quam atque dolor omnis provident. Optio amet asperiores ut libero.',
                excerpt: 'Tenetur dolorem eveniet consequatur enim sit cum enim minima nihil. Nisi assumenda et eum est ut animi. Nostrum vero dolorem necessitatibus eveniet necessitatibus quia temporibus aut dicta. Cum quis possimus ipsa optio.',
                name: 'febha9uj2mvfg1ey5y5sf5huhymwbokb8imrll6vk20jb8ew1o7pxn53sp6fm9tgnybuexfuib33l7kbgpvurbnscqvo9rvtdq6mpwl8bc80c2104rohf69h1dw0wdu7mphr39f8hgj7hwpoqzbqr1r83pc60699alidx4xzmk88fahhwi8jvnezi91m75cdw9u7slkcuotkyr225fn4xb6sn993ys53zcrlkqsdahegeq4h9djr4zbtik2ay9x',
                pathname: '2fgy4fgy8hzsaeidgzyt4jpt2rzzbbn8koa2evyptsmbqghtiyrdnfnddih25bteugl5zv55znxpnpe2dzgnhauf9mrzad1ozw0os22bp4jcewqb2oddpamkmchnpt6i9lwb8f26vo8aazic4vpp2tmmjzb74jif3ql4jlyu2oeg13xshvp9235zb8hilpmedkp8bh04prd0vhwqdoaaq0sdd3ate1ufxemj59paee53af0rsslehc934lns2ge79azf9cojplxy6npqm255q40rmr4jdhrcjy7rk579jkhagi7drere548ren18hgr4ddc8jzi3wt8hcutk22k2b3vk6favbwjy1jpmyqlukyftw0sfgtzfr2qojd10nv1gnyzeolnkda08px5nh9rhy8z891b5ps64j1cymobgxqhoczdmn7p537wz4nlpiye7une6xvi2hc50gmno57ekcup4direl5n6xjnngp1ibp7u271n7lgknw3vske9gjizb7je6d2vd74vwmheyom7ajol2h5ojx7le4jolxou4wa1oarxzjeh48k8503owjf2cqy8v03s4ipvwov7eeudtwcltd3i1mvl7y39ye7loeq26gvzvw3ki72igxzk7l80nivm2fha526d62fe76fptxqogg32e9oafm3rw2idj29hdc2hsp6v54uvqy1j4akcjsp446ff8s6wwojt0v5f2cdwjtv7wns5og91klqr59mfvkenifgg19wxcff5z96kbt3pt0s9zytx58f9oj8ln7d3m3b2eyse7bvq27mgmxbyetlykzsp7qq6k4vvld2kr2tvlohplucf2f8ejfu2q6ohlecko7ajxsj6syubscillpo7kr3gg6sbspt42ly2tbrz2kdnxmx459x2h8mu58tb5327i163noqwvdtmm8zhmi24hfueyecmtl1epu7lj6fojh1dfpde31mr69gvbewdo6e8yr42j7qzr4e2ak3qr1lxcvsn2a8j7y63n4oa',
                
                url: 'm6l9og5099sfd4uj9kquk1hjt9utw0cu6z2xxffj90zi52zw017kl6u60cp5ej94jqbcy9nq9i01hg4mbm640g871fs0ediheywizzekwuyj9dlvkusq25gjk1snkk4nwdgq526z4g3i8f04rdlqedw2cvin5w3h1l7xotp37w22v060tphxp2lga824b5u51j492t6760ponmgrekqszpznrzhdyiwaibscc0gxemgnvylebsxv4h2x2x3x1jdpr76rass0p2db2h3w1gslao4w55nxh1xf130tx31gn3n5c7vdh3f6054b95tg5jtc1lsixjxoxl1hjp9p179az3kjxvaf88rw3kaagu6vb5440hdzmv8ooou9ipbb4gn99gm0dbco97b8y2u0atfav12egitl2gz1282hd5u0j4yb9q5q1yttpn65assp1zt82y10tk3ab7kgrjwo35duhni07nu7td42q6jqa24nafkhj8vte85gngpbo1g5mzaodi3i7cp2ps6it0k6k3vdrifa5v894wmxt8o4x2wjn31i72y593w1fru8c3sd6tjkoh7kdbel2akk7e9bhtkaj1l8j7co2j0wj64xvyhd5v0upi8sx1lzrzsqcb0xoo8r816z9vz7k4koph9x7vja27psd2zwc1ao3106xwsqnbfxnnk85as15lnd8vs9ew1rvcxsx203dbmv7ceh375nvj4war0ja1u601si1o6kma8d77n0jhdg7xfq14v63tq143atocmd8cyqgp7yl1jfb6xc6t04es5fkio9mtozp2vxnofn8ik8fiw3lkq7vy4swor1c9ofnf7q6netnoizubw3zo3dplv6oym7wdbit05h8ml50rlqnse32p20xdmtieoj2cmby069kptyc1jzqa84ae0fe8s2zh02qyi5l8cvr4nsjrjes533npqkur8bw83p4183zopvm5n6cu4mb9xtl16c7e0q4q910dyhsuu2eajmndph6kk2nhmu396s',
                mime: 'z94t8pxrvhbpjqvtmqgor8jxotdt06rbnie5gcksesnpi6bk9o',
                extension: '73x6mgw9nfre6572wzq8nu27fcibskxvc7n4cyj9sla64r948w',
                size: 6777101381,
                width: 648280,
                height: 266332,
                libraryId: '8e77604d-f2fd-4921-b54a-64b34e773b01',
                libraryFilename: 'hifvn6otiheeegg2o61si2op06l6vk39jc72mra8c93d4q3h665m7ej4me2r4qtilcw7ntgsc05bwpuxy3cwf2lnr8jk71tb85axqws3ygsyy7t5guvoripfgnbphe7fcruhwhngco8bl1521upfylb3y7zsgtrl4c7y9vp81wjg0l6mwzq429ioam9e2t9zy63xk6jpqq397oacndihji356l533glnitsd6g5l1hcyfbcatysln7p4fosj4l7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFilename must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentUrl property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '0f7ee8f1-7644-4da5-b53d-e03cd62405fc',
                commonId: 'fab65033-01c6-4b3d-85f7-7fef092e475c',
                langId: 'efcbc1c7-90ea-4bd3-bf55-cba1b0d94b02',
                attachableModel: 'pms9h3xy0bi28j55xvikh7iqd7vadac18ccjp5gfgeobn593zrg1elrck2u5m5sk1cxd5nc591d',
                attachableId: '1ed8b8c9-5995-4a64-9a23-d34265309f54',
                familyId: '5fedbf4f-7952-48df-ad14-8911205a3daa',
                sort: 160131,
                alt: 'ur8orijv5awfw2sw2ck1b0xh3nfn8cjzrwc1jr1lvxok3vepjgzhb864jf5f2jksqz1del8jtk45y5gfkq6wc418r59biy7xk7mnfg67dz45tcrkpcazcqn1t3myqw48gjpjd99g4albqlaj8corsb8p3zhehxxyrsi51bqb3geu8gnfan22zxvbwol74pxaei3ll5f0lnmrgddho6galhwzz6xqxp8tooktntx080x3soxw3rnof3pjbr3b2t1',
                title: 'zg0yjwocx9l2bin97e5aiv6nqnrqrap47u5n5q3aqidoupze1fb5tihyju2ho2rauu2eoyhxbmw4rq88bg65t96kcbzto5v2h76cfbva1vdh7y7gt39y5nz8oslrr8wksf8jxbxdph0despjrm6g4cwpf5b8jb0as0lrrng1l02rhce3pb0l212kovggnw5qppqi8xsxomn2ov1h13jz9loa5edk76waknv2qvyvie8221b7thawbdglat94kyp',
                description: 'Dolores soluta ab quaerat debitis nisi asperiores natus voluptatibus corporis. Quasi ut esse ipsa in velit ratione ipsum dolore sequi. Autem quo a. Qui iure nihil possimus mollitia tenetur et.',
                excerpt: 'Dignissimos quisquam repudiandae magnam accusamus ut provident voluptates accusamus enim. Alias sit quibusdam sed in provident. Blanditiis velit non sapiente nisi. Eius quia animi porro totam voluptates et aut. Reprehenderit aut nulla dolorem aut dicta magni sed.',
                name: 'lyy7648v50xmf28lct8flyei75e76a2i6r8bf4wjqrvp4q06ntlkrk9a3tjchxb60dqn01k7iqf7wywne7bc0fk1f19ijax6rl4ype7i8inkdh06fweiugm892sfttauzfu1pdxuz8xiqdk6bt3nq8fyf3xd9d5u0cmbwb47rhiflu68uuqoc0u884zq4ofmiiat5iskqgi89jb0gwjd6m0orlwq8jih2pwqjhczonhss13osgwoijxtr4mhv1t',
                pathname: '3ibg6kqll9vpdxs7w7wg7rvovow9h8q0kxo7ax4jnqukcz54o32to3u9eoumnbu4ecwinknjd80ynny1yqc8chh3ueu2vpwstysm9c93swna1ly01l424rzc695axmyu0xn6fywdszf8mb02597olam31mpmk8ip4ehq22i4n4tmy12ngo8q684di30zujl24s3a6v76m0clep8gt2lxoy6ssw4kqssc7l2w7wjjjf52ksa0qbqb3kcnwe180mtm7tjbfj8h3zp7tkxhzao2nhea9qmfskzffwljkq3rsvbihhw0xtig736nxos4i0fset85ftqj6dbd4q6cj53093u7elp7cg8rrqd3mjqa837syue8ctnmjbvq6t88apzk6k6hn8454p4jvtlvnfbj7q8u1tew5s6048sh9ufr1c3yg2c9yzn27bswiqgvky2tq73sslojmv205wceaqvovotsdcdf9dogp9x0b93q0fcf4xqke5vfllxdckknpkdwfpp5319nhb5q24u0w3l3qvmvgo8w17yuhro7ktsk4tgrzyhicfejcfrq3xhqlu5j0475prypfdnscgg89u33wall97dnmq1xxungp2firq8w8x2kwgwtwo1kaut4f1nuwj40x8d4uwggeosaet9kn2pbwumjrvjndpylxumq4ca39bz7fpyt5q0ulvcip7rkfvtx9sbb8hr5u2j82ajarzi9d96wdhq5vf40g3b3ug9un4ebeeuogtdlvvhyykm3qsm9oi50phx02y1yol864vvvd5k1ec80svvhxssx1v0bpun4rq8vuyplds8k4vc58feovfj0sxhc6qxuyhhpdoe2b8sq55t090fzu8dspbs9xcmnoey2bakg49ahgkzc3nyxdp8bbjjlycq8riovt4sg726xb1nss69tqzurzojuo2c5vx4fnwwvkgo2er1oood0zje4c8hw25r4opn6ccvbo5cfp8ppjb7v1sppaon77d27cpi6a21zxjlw8e63',
                filename: '0qp9247iblz57rqtl9ds0fhqn5sacpxsaodpvd5mrzvsen19df3er1ud6pni9ppzc75qxof6485otvrlcrb1yar4lkt08u9biy4307bdby4cnxacghq1mpgxs53453pg8th47qqrpazdgg30sr4z294lq5lbr1x3tnmaje3xpbf7mbrjvwvjp7bvgg1eqh0xml5fg3xxqrhl3wsgz3voxzngwi1il03galjqzpgjh4vipmn5gmvexciory6ji28',
                url: null,
                mime: 'tu567whqgg2azlrspan19mettvf09lbnwququp1u2ld70g3qn1',
                extension: 'g9rtqsgz9mgn86xgqqm4jzvmzauay4rv8zqksbkyes3wwdawkg',
                size: 9478388463,
                width: 561522,
                height: 997039,
                libraryId: '8e77604d-f2fd-4921-b54a-64b34e773b01',
                libraryFilename: 'iijhj9vweb3mxwqng98uyzb5o42kzyberksf4t5n7e4eo9b5xhh0zwar8dcl0oabkany10h7x7qk2wh9efyweevhhm6m9jielbjlrbvzj0tdah7dpea2no8vypa61vci3mh2a4kjcb09ij9w0qmj1212wyv27kz5rnmt8r0xlv4bo5foq6j10tepsrb1wrfdgyjti1lprco74gt9b8rb1but8y6oggsnzfb3kz70100mpfln8xyyxpu41usl8ss',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentUrl must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentUrl property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '0f7ee8f1-7644-4da5-b53d-e03cd62405fc',
                commonId: 'fab65033-01c6-4b3d-85f7-7fef092e475c',
                langId: 'efcbc1c7-90ea-4bd3-bf55-cba1b0d94b02',
                attachableModel: 'joei4f8n3quaaedm7jj2jdueu6lxatpus4klfkmbyp6nl18e62wtt1ywlequknslfsusiuac3jv',
                attachableId: '1ed8b8c9-5995-4a64-9a23-d34265309f54',
                familyId: '5fedbf4f-7952-48df-ad14-8911205a3daa',
                sort: 177497,
                alt: 'y4kws5k61vp4jqhw84tr5ws74ddzndn3rj4ycee8xvnpkad2pzsbumay9h0ifyune1eszqhxt73y8vidxz2j87qb24bmymc1d1xx036p7rrw84uzu6b14ylfymz0fs3tg9nuruhbec24k4zsar4b8pq3ja5nlzdpvo95umj292e8hbv98ynn69ss3eii039yudeeu2779e7t6xrxo2q1oxjiyywvawuqmg8nbg72syovhm8tdfj12ugrzvs9myp',
                title: 'map3dxm5ig9ufycfq2cl0z3sumoeari5ufmgv9lnx551dhh5xonnf66dv5gllx9j14flro5ogswgvdulolrrr851ufulbpqvbrkrue42n3ba6msx2l3n35ohlzqkgo6tlkmvgxq2kenuic938p9jz6t4q8xrsfyt2t2j1bup5fg2zultx68pvf0y42dvyp291pkng7o5fdd9g5qmak4oow56wsikun3s4r0gic3guy7w7dysv0zpn8zc87le5az',
                description: 'Incidunt doloremque hic est ut sed. Et aliquid ullam dolor perspiciatis rerum saepe reiciendis et molestiae. Repellendus dolorem quia ut et.',
                excerpt: 'Aut inventore praesentium non ut. Voluptate dolor assumenda et voluptate sint eaque amet quisquam. Numquam et placeat est. Eaque et doloribus autem libero eius eum voluptatem. Natus quibusdam quasi nobis. Placeat aut aut quidem quaerat voluptatibus minus non.',
                name: 'mihenjcclextllm8c5i9mqee1ixe7lrtqywegtbvjkd1dpuzvxykizucrqex8rnv90llfke7ait5spkv3e6w4iqvv9yes0ll0nvll7q2nuo18y4p0u544bg4tefrhjut3msauympovcuc98uqhrri8ct040avsxwdx6bkt384brrjcq6swnoqqmv2tb7ielwxwnew0489vgq9pm2l9kqvf2sildxpdkvh71eg9sjl08ovizwlr0sjta6apt1fhx',
                pathname: 'tnscn6ilfx6u37qvvk6d92yxujibv6l0ggfwjmi72lsa8o54r5fikavvbt318mlylr16mtnlcp8ihtfydms5q8j3nrhswrj0gs3uy9sb8ktxgx3ejrc40q8fouohfqpkuiurkvwg1bk3w2y6xq4bmi1sjbavtdd0fib68hoo85s6p52pgqsu45eylcobjnt5w8rzsea755nsldzndqjpffpi8ddprkitgxly7os6sdz8i82a5sf9umy8ep3ecb4emr5g8uoblon2iog5c6zy59gqr9nb3n2cntt6fmzeo1hkh0yl5d07b1alrl4cydc4cmlvrm9r9m0gvys96umx9y7rxevdbqsia8hst2qh0k4stw6otwnirwjuu68j2rvotd9mn952j4da9s7mv8d0lyvjpj4sxkrs8sr8fiind0qciukgzaalmgsd05y4l8c7iiqw5zcd915fooey8fx0912eg9b2bmbugorg05aw05ws3zl6c60s2lkwnv7th2dy2jxsusp3nvqxedvds6hs74h4y9i4jd9t72wexz5bb9lo46jrp0bpcmt2lzgbphhopd834dyh86o9jiybu3uwraerixq1v8s5u42im1kfrit5veldupvzeurq10php5opkfed4gcax03w99n6zawgt4hibjy0xbn21t4dp7eziynph0e99uozcky3lf0vhh8goe6pf9f3syy5j9xm0krwz8yjeyateckcsafz7f0izivtuw90uu2b9zoax6392usnyyzyy09guep8p3qc0pk1eu49c96b4prbaqt9jux9q2vtyfof5lbon8sm2uptu54kcdq6uzp3nwzwlzt0vu6g6r9uzutfm3qqj668g2dihq87e3uiatsqbc13doucsuvcvhfticungxwwmaumv0ptanms9cguw0ckde664l8ffah60qj0no65y59qocmhnpgpg8pz1cr4w1ccvnitx77roaqft1h350yaral1lkkvrhrf8yyyszqgfy7xmz4h6j54',
                filename: 'lpp3ki52j9gddxcyrqwdys68n57892esl3q0xvo250tmkz51w2r9mwcjv7sitkbeb1cwayfat8aqyhxlbhyh1frq941tou78ypkebu2wr4lquwp86h9qe0nnq8m712vuoy8y1l6kowxow0ni49fk731vfthj6zqkkz629j3lmhe83u58wfqincqz6fk14ykwqhri5zmyglne5qr616c1znrqv5fp287721f051yic5ctf929dlsa7siifc3q1ni',
                
                mime: '3anp5mzf77xsp8fz6wei0ekyuw5ruwrrurft9klavewi40nksw',
                extension: 'prr6cqvhweg47mfrq9ukbrlr6kpt09stzbubaal0pffjewwk72',
                size: 6911858235,
                width: 706283,
                height: 119706,
                libraryId: '8e77604d-f2fd-4921-b54a-64b34e773b01',
                libraryFilename: 'n4bqjiu31ynm9r4q3ejo9r8thojom5jsfz6xswts51ztpdabzd78sblifyettoypxz4wat6gauseu3o796iu6cni6eqf3dqc9ydmdwdm2lq0tmuao88suygyzm6vppcvcgx1su01bmctnu1avwyeb5cs7sdausietipjsos22f9a5ikdld156drip434hcpg5rgeiaa8ut1wotr913a8cpwsb05cd96j23mn39sypfzd9764bgfw0tltabh46hs',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentUrl must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentMime property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '0f7ee8f1-7644-4da5-b53d-e03cd62405fc',
                commonId: 'fab65033-01c6-4b3d-85f7-7fef092e475c',
                langId: 'efcbc1c7-90ea-4bd3-bf55-cba1b0d94b02',
                attachableModel: 'pi211fkymtekupc3bnaubxfaxkc3yqferppfmelhea4x90kwp2lxius4gm5f5mrgmchoscp7gzu',
                attachableId: '1ed8b8c9-5995-4a64-9a23-d34265309f54',
                familyId: '5fedbf4f-7952-48df-ad14-8911205a3daa',
                sort: 734827,
                alt: 'zyy8dzdesw1d4rjkfqy5ze26r5qohnphoy3aetqtquhmsjrahrea6noqtum9gw9iadvok3tadby906y5n3yb00bnlkk4kz2xokehlvguecum02mwrm20zzjv0df5vvn5oivb4uz99fo8voldddh54kcv9004k1ie2lat7fkk1lt9s0dpwtsrto9jajldy2z8845xwdwg5nnjlhd4dtf2jqq3xus7u8vt21kjsz3qti6iu946kv4csklsvtummjg',
                title: '3iflbfnk3sz8xr9dpxnom6uy5j9xwhvxqprsyaq9jkl3tp5ftab6dm6cxg8l87xrfnhgt8btfyqkpn3fbao58j1u4536cd66wcqa8lzjac0ebwchbv88ib5oscvsbm0pvgputms0i1tcoir25wmozh4faduagkt6utpb5jx06i3uxag7ohtqm6uht9ute0pltfvfqo7nkc8f3nqtlouo2539w2fp43b192u9jc85dnobgt6rcu1n1sza03epd4r',
                description: 'Fugit quos sint molestiae. Natus et temporibus voluptatum fuga quas eveniet dicta quia occaecati. Quo aut laboriosam animi tempora facere commodi et quibusdam.',
                excerpt: 'Sit officiis voluptatem eius voluptatem architecto fugiat est molestiae. Unde odit corrupti unde. Non atque qui ut inventore.',
                name: 'cv39h6u4pkd0v11kapp5j0gvvwzx42c6jlvc424vw7szhlnmmyz5bj9whsdej6fhj6uf7yz7x98dg8r1ileemu66ez19gdw7q8e8eazw8gp71m7xq1eeql5hyb6n9plcciep1cpejq40ad34x9w6fs2zl2api2zwj0akwbw79au75kqsj7mlah3wm62fdbg6ry2qrlubvq9ubuc8u6bimxotuyysq42izwu9jv9bqrw8xdviu6dvwzggjpmpd5u',
                pathname: 'ws2nce1po83zmopq96z0sqska4u0fz0nvcqx6evtsto1k4iz9yt3aaveokqz1bpwytxvio5wi36weh78en5ghnv0d3di1bxw38j644p868w7gsz1f64rwil15l3m3vttq7n56q1vei2ylxbaf9vaqdfbhu8jvsao9vnl7syam39j3vfduhbvdz6ffcvfrb8vld9mf5ivebrppb8epavb3vrp3msxwtzi0fgcb7hmyyxmbsg3jkvezunlvyrmlhuekz03yyh15j3e62oj8hwwictmea6l9dn1nqridyj27yfc24x30xw5ihiuwiy6lxlv3p4yfbccjf8x6wn6pyvy05wf53aujgvuaksl4f0nkxjaza2cew1r1j5j65t7ferp75wr4wcr25b3642k9m8x3eardyukfxuj9neaxx1766a9mcfccsk2aw87a4xhvkjuqk7h6qcpvkq1ix9n4i6ul4amtkdvrsuti8niagt3zyhq6emo5kts6nel7nllo2ef2q0tnlte2yycqfb9h0vkdkxu8pmiqjf8dyk4nhil5rgy9vge5snls0zjog4xrgk20d1fdrkdi2stljr08r7v61o0pkq1xtnrrf4xqa4tgfr0udkqwmqr9w4ddy260s9q66xxu0rnayj0gpsecp8xme5luczizqvgzs7ww7l5ycbt3ifdqj7mj1ex79q3uxk97o9u5q8dw3ntyke71kbpakkfoahaxo7iyfaqevi99rr0ntdzr3t1arwjthbz6ffwhnd4tawll1dni9e6qu5x9502ad7fy3s6a2bpcvw1nuxoluyoqxj0ik0t7nfr1jxwp96xl0imah102wdjbrwbpi72o4683tm7u3x62cyf41t85r1t7m67n8ynairmol66unp79wsj19smm2dgr4f0bmfle8i7zct0u0y0lnn1n0vd81bjhyjtammiz5fr41fst44hc1ucg70he1w2ta1qc0j7j6kx254o9qpb7tpkaj4s814a6qtms9cy1sbkskm8',
                filename: 'zxktjhpcnkiv1w0zfvjac28dx7imsz8yv2e70iidv945y3pbzl23qie47zf5ud1s5ud6so1d5qjvayaa2varmlxsi8eyxkducq1yueawfdbsv5vecsz9c1q6g5yj74lhe62nhgbprq9k9z32x4435gwt51i05s6zp1tfjtn149asdj0y0cis556gtgm4xe4y9p418ieokpgn4w5o41wk6r116kmrjurg7kcg42ar8qa9ahzpiyvbeytvls99qpl',
                url: 'c7r457ttg9ivurqzrevkhufazj0dqrrjfdp6a0fty4xnontxx9l8vqrql58mwo6d3s4rhlegjwlk7ozvp2cx1io61t1mklagw8e3bvnvm686mfj6npwyp3854k9jwjkz99xvalbum8bhzd6qroop470cnnxdhzk6icbkg0ciham9kpz9u5duwdzezl4iar6rnumijgp5qog7mrk61z73bpsx4qaquvjzej1fjxlk9vwd7ifv2kaaw3ykj4l3p0b33gvud6h2sdddsa20zcwul7dxinxti3e5c7xb7vhw9jhvcexgsj5rp6fmoqcy71m6dd846xcp120zgmmsvbb44k8rjivhf9qg9x7cg5cky19ru4vn9kfmmpxlghjop035q12gsxhxw5n55x6f2782q87mkqd4ijmve0hpwxvr9617eutnw8kbxxftllt9deazpnyv6zr8ugjdfxxmuxbrscm2akeh0z2toojszvgolx4dzccuxpmajbxd07lhposepll2i1tdo0kpex0w8l1gx8czlwxoo5bwfj497dp9a75bjgqsy0ijxoy7vyvxkc5nl90buz9udi5aoq6957mx5oosd3rm572u3p6ljkcg2ms3hxn6qn1pfkj8pnlz9do37enchd9wuesl3dkjhdiimj9zn7ipu6l9xr2c37dyijqjyqn612xxm7d1na5bwrx7xpnrnwg4d5xytmwjuyvx0slbewil4s45eatemsukrzoe77m41mv2fpoco1gh95k9wzmcj6wuol28nhdkyv2ubpuf8zb0z9qxa5yrqz7wmx9zcrsrsb1r9dn5bu175opfc6hh0ap746h0pxde7zqgqgqtks58v7ntyt0tksp2etmqcewzsvbo9dbuwk3eepw1cr1n4rapvgopx1mercytexxp5ifv28dqia2yhno4z2ufbj21t9kugb7oidw9pnixkahaihvv1tfbhywm4cntbb134uerz2g51ftbypwvrhpng6pdft4m0xuw3vnxswqc',
                mime: null,
                extension: 'ougunb5dgvx9k59j890i8vks8pvk6mvc2us86ctc1ez4k1y9bz',
                size: 1727166870,
                width: 851196,
                height: 191077,
                libraryId: '8e77604d-f2fd-4921-b54a-64b34e773b01',
                libraryFilename: 'dnr6vru47ykanjtf8uu1ohs8ds03jsv135867hcziehgklem67sets28xf38dpjrs14u3inoybku4kdeseqenzcvp57xrmcs0tb6xk7k8pp0fyenmffwhwal12enwetgsvd2eke3qhczcclzp95dw5pymxtdj070k66cphebm4qzova8blycetohk25z7wnuc94jzn672y64mkgdbj149y7dqjq3tnqmvlai7phjmosozg9lq07ka71k2c5novf',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentMime must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentMime property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '0f7ee8f1-7644-4da5-b53d-e03cd62405fc',
                commonId: 'fab65033-01c6-4b3d-85f7-7fef092e475c',
                langId: 'efcbc1c7-90ea-4bd3-bf55-cba1b0d94b02',
                attachableModel: '6my2lyrbsb6k1l7z741njy6cadatl018lxl1fx2u5t8wrcqfxzfsdi97haougtadrjpvl5lihe5',
                attachableId: '1ed8b8c9-5995-4a64-9a23-d34265309f54',
                familyId: '5fedbf4f-7952-48df-ad14-8911205a3daa',
                sort: 591413,
                alt: 'wezqojzs8s6ehzic6h3gbtcazh9pjgi0mm0agnqyexonz5jogvgz1uavvsrtgtq4hj4blpyt0wc2zpq0v6m6dgvnkutp9k4ltqpqnciqmsxhr66muge3ew1jl2fpettbxw6qskv6f2zb82mdap4m4087r2gd0k7wckyicns4h1w7hjkjp23up7jvus6s8n23iefh2nnir9hgpxyjbjjtqmszx5cq1b6ovcootspr42i12knatfhhdd9o8fhjc2z',
                title: 'v574anp4yqe6fybdrrz84ldta9ihsyxl4l5nkcmtbnwdhxksfvbjhnluwkowrimlhq566jgrqzyu5zuwhnwbo54ub0eqghml0wrtjq0udzuz2xss139iwnv71v29c94ohazwvn6edav07hzoax5f9emfp0k1pdl8pejk3q794e3x2rs81afzt9dfosjy8vz53lsd8k7d4ez0j3fpmnk4qc7q817dmn1sxyj91felft52nfk795n53f4cilfe0lc',
                description: 'Maiores occaecati sunt sunt fuga saepe. Et commodi rerum quia repellendus aut. Fugit deleniti nihil.',
                excerpt: 'Et odit et mollitia sunt. Laudantium eum voluptas odio deserunt. Fugit voluptas delectus ut quia atque. Sed totam ut explicabo consequatur possimus nobis dignissimos.',
                name: 'm31rshgfpkemnjkc66v7eyd1gaodtk3fy7ei00mt7jvjp5jzrwlgnbaafnfuzp0u0gdkc28qci3l9ttp90o8wqw6ttcuzbywohef3w942yvleypq38octp3jtgugi3v2g0q9j2vmz0v0oo9wdbxhz97cuyy0fa25i98r9rh5jd6t81r4m5stv1p7vdapio387zfstcpjavizvt8dukvuaxxcoaej89dyl8jje6y8w08wzzqqirc6lf9cqbvrk1b',
                pathname: 'tvi9gt30ilj85ifbv2qqb93mlxj8pac35xzvfeyfudljn3zp9axs5hyef0npl8khd9uc9fi3t3uavh3417myl9s42jtekpy7jo6egrpzymk0mo357mm8lk258w7vjlg6fg8o5vdxclu7hp950tzwfmgkx4bdtuhpi1f86h3gn7b9iy15u2qtwu35phlnj238fqmn5ikpyqun97ylph9b27whez3s7ti3rbjjl5maquugqo5aedjrl9u7yis66dyilv6ic9hat3yaqfrv3pxmct3i9jrwjcxnpo24o07s4orhwcpp0r9k2lb643feze41uddp9dgxur30fpsmblllkblzlgwfrq5wjl61lm9z5c5j5tol87bwnpptu4yqjshvf34ke8x5fkc5u7ga8zubjoo4nnmoit5e9t26rgs5nn1te0x1lo7712o11ugsvbfm1dc6mmn1ugvnrvek5lpxz4qo99wpyqayr7d4fwphutlhezzuh6960oxwotf7ofrr3w1phl1hy1z5i22g8bzxdaps64t79ko3l7rwyi9inohbcqfnhhk23e8mechs5emw9yc78cn59f8u5kbp4puaaak4fh3olaib5blv84umw9rk4n76hd3ersbkt752uqmmu6xw18dmj3zv1h88mtj4qgwmqdseb8frtcnm78vf1tqwau35odwba01wrzqwyehwj3a1rqfqfo0m1709ssu564kr775a1g9j65ia4ry5bwqw8pob7qe4awplw381u2oik9ns0zbskrvvn6nin0iizcfb0sxaje5yjbvfvhw6bae4jzcnyoeypa25flk8f3vjvxm7pxj1e25b27hupg3sroaquj36ck14odtyosq04t22ho6bvjis2c2g9gg8h59mhm5pn84pjsbvxgvvwtammvnw9dojkaxg2pnwbh3utfxr84rcgis1dpiv9fmohyewvnobvfckzk4lnfh22jcn6ij4myispu14172d0nkcw4iix8x2c6t9ynjtl6zbgevt',
                filename: 'mu84i0uqqwmlnmf8g0kwknkscub3id3woua09dxp07od3azyzsk73z6aftsdpcua12ryj61gapnf1b1gza0jykm62pv2bihtxqlff807esrdxf7054qjjzojjwkmy4a8o3db596wx4oi64ceqysrf7aj6oj8pfn9dle5ydbcxqu638l00xijkun5c683wg32i21gm8xsjbod7kw3vznhr2odyvzofo8axyxptd1ysbyu4gmf7z8eqxu8ug1qdqq',
                url: '3xrqf762wphht62em7vruklo2gcqzelkugmt1go9zm9pzellq4af2zgf8uipeua9inrk36t8d9hlwxvjn9x6al3lzkqln3jkjnc888qh9c5n0w964l6yuspx4sko83xgsb3z5kei1iper3t9umdlo7v8i1900uc9kfxif5k9pni1hk7h4lfjqn0uiylr5zbp3i5ipl5g99ym4ogywr19w50ngu64xz180hl41wqnj41xawzzhs19vh9exxscfjvwn6am1d8u997p0uquso2reki3c9udb2z3ffdd8tq4046czvgt6qqjwf86hc8sxket6vr0wtxudpdfhrhqe6zna03j2e2kurbv7tdlq4dsu09us42l45qf318giv3xrctxhz301tj3y3xlwu7bo9iws8kip7tirf56xuhr4xrton2q12h0l9lcovw6ox3xkti2w3ua1bnw9e5202mdx3dbdofco4rh6gxsffd3a82a6br9en5m4gabtdfnf2zamic1v22npojt0eqa5vvznahnws9dw2m37iaryi5anmg3mq1cuhy9c8mwtbfhyml0pmos3jjjx7jgjcezzrr9pwl3e5xaz2v1vhg3490enj8xl5mh8ndsp1woxcqs6wvnf1inhgrbn773br36if0bjnbc3116uuaw67qpwoe8t28whh6ixcbekr5cmuoiqdieoj0jdzil67bbe94ki5nyucm3k7vaja86z1zxrmds0el5ojxlyabfyrl6ad4qv4awotq47z0280ihqnjs01twujsevqb1fq4njxj76gn5nyk0ktzfr653wv41ec4pm2awoxyx6btjox2cfauy6voilnxbyn6blufw1rrfyx2hzrwyc3ruhooqx5hvkv44z0bed0o3ttj580a8fwicnbjn5p5yuajj39jvcbn5ne876m79bwgotdmzn9o0xxl2k9y1filmei0grtz0xqe5kzl4lzlq89dfysilgfn0dtw5p9kcq9lbuexlgtpl7pkai3e61rc7',
                
                extension: 'hsxn36k808cww3npsbf7yz2rdfnhkw6txvhlgbt96k6siwd3ix',
                size: 9325150306,
                width: 858158,
                height: 921751,
                libraryId: '8e77604d-f2fd-4921-b54a-64b34e773b01',
                libraryFilename: 'hpc0ahshcuhh3yvmkrewug5ol0se7diqr14l6su5g8m7zhvp7oz88frqq587iymwakjabqf4sd2v8md27gr1dl6kqrdo4tjgna4frfzki4ra2vx3q79y1uo21rsnelklgg88uoyx8xlspjxj8urg2oztlg1ivyahln7qyk8idtjun0qm6bk02zg0j27hbwtvcu421ns943bkoq4h4iyk3yk11mmtisgh5wjjzr2ayf3yjem7u3p7qcc81z92myq',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentMime must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSize property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '0f7ee8f1-7644-4da5-b53d-e03cd62405fc',
                commonId: 'fab65033-01c6-4b3d-85f7-7fef092e475c',
                langId: 'efcbc1c7-90ea-4bd3-bf55-cba1b0d94b02',
                attachableModel: 'dujiyrj531webme7bifv9v71ij7tpu088couxy8lms0angqvylc04100tgwdp9yhypb45ccl1g7',
                attachableId: '1ed8b8c9-5995-4a64-9a23-d34265309f54',
                familyId: '5fedbf4f-7952-48df-ad14-8911205a3daa',
                sort: 273998,
                alt: 't4ivwb8soy9g2ufpgoknbzrvwbn53jf3l2hdxr2r5w489214l1gl93l7iuv9cg0magg75wih1ojwqiho7jupnp50kviwzvqlh5sy075a758a4qpttrmfaamgfx9k3uhbw0xtw6gextupxjozv15q7o94sunmkqwwcprh6f06ubovzxja0tqmevx9gmzlun16h6jd173xejhhc3rtxt6eynksaeg93m35ilg5gb7rllldxu831tw35pbmw06swac',
                title: 'nrqhsuyld6ag6wt0bbhin7bao2e8iouclj5hbeekhy0v2wfegkl51j3tbbrbwoyb0k7uuw4c9fbt36z57rfvm2swvvh6rf1kdv5nk73qs5mwqxvma9yaqwd8f5wsvksjf7pn5ry02ryr0w5v0jgmhlgpf6uqt7ay7pw311dw523i0z8yet1xbt9ts70a8m8lix0wx1xc4yhbl6cfw5vqw1rh5tpl9m0v77fo7uwxlk4ldgl8oa33ytca85v51l8',
                description: 'Fugiat et sed. Iste eos velit. Dolores voluptatem natus quibusdam ex. Ducimus officia rerum perferendis distinctio eaque quam ducimus facere.',
                excerpt: 'Vero atque repellendus eius. Aperiam eaque facere voluptates id facere quis aut. Est soluta nihil eius autem est. Occaecati magni reiciendis voluptatem est qui est. Accusantium dolor adipisci. Doloribus laudantium vel omnis incidunt.',
                name: 'jfxuy5uyu1mheu8yu34ffncqff86phneu0ljf9hvu36zm7kiqbx7uo36g842if83d6aclib71c3eme67r8ch958dhcgp0m20l7y1d6ch97xshosobvcw5yu4d4wc2315tnrb60kqce7i82aj2kjv1efoz3dt9xnlfe3zbot3sc2onevnunxddkn7rjcrwa2bd1kxvv9ek2y4hhnh6uily5z293mvhilaj23ibbhpqv3j0zkspypft6fxngrb5vb',
                pathname: 'g287t6u8hl54fau3ctrq340i7f7bujdku1njnp2n3jyg7y9w9mypjwq2o2dwqkz0xndedpe1uyck9tmi3m0d5odukh0ugo0vjqk58ntj7lmffjq6vdyie77g9jimnixo3f13uas3fnv92fdxe0g5duurocxczmr7hf62rb8tj1vl5l5cihn6uf8tc6nyxwbocczp5l09qd7tyk9xcuqxh9nf8w5afb2oxnek7beco050264owly26gkczh14nbeczz0ul8364gehvx7gzv2fx9fp2rxako893vphxj9irwknbbcxwtg6bltpfhyd73n963il9qjpyh99hhu63so59ya0xr97ua1dvokv4xu38xuxi2f59pqeacwcch4gvvcub4bq10vne1q4ikp1dpzc37674gowcqyyaoqvjlhpji93t5tih3mcusx80xiozhk9t6sx0jhaujs0b34mcu6tegr5lrelbyztqtofrkb5ylo1i12otgimh1tnjzakrybhttncytj2d5nu8egejpgedtljtawk0p4elg4hxwo3lo6kv0dy9uvdittiwhgc5uwdqm8oo8qskfhc3fehoholdq81wabouam3m23a738ozcxx2lm2t8ipdtoqddv93tqt1qi0way59zd8n2k2kvjrnwblg8135sz2x2jad005owx1bm6otymq3wlydpa78ltko0sl7kcju1cpfbjna4wpz7hytllpb1p3vnvg63r4bjdc0rmje2cbho8frqm1fywawvuf8ubqa4d7d1gveysoozyuuv15aygd46rwrw7nak7scgcb90q7i9inenb0h1w7szu37aa8a8ooqs4bf90mxqsw4mbleh2fb66q3jeo5gjgsw1u4ifrlpl0sp5s3l5xczip60at8nwfiaopwnswhksqd167o89whz6omt84ge16vrbvd0ypz3nhyza691dnknhw52ypzmsqx50x0fhrqxm4gsba78s160pee4e22ruan49pvoc1gniry1f07e6x',
                filename: 'zocjrohe3i0tqgu74huph39np78neovnv6uqlaaeqj7uxvztzi6o4p1ak9asj7ed0unxhrz9jdksi0ihi5f3sxwism7i1rhk9uu98d3cjsphzkneimje4j09j6hzowckgs0hv2zeqaqgmqnz6i6r3403giihonicbol02ztbyd0v01guebvkaiai5gqgal5ilqtfgbz7h21pl2f8jkbz2qjoldr62xct44vg7s16jvgy7w5hppxig0zym465ycr',
                url: 'uxhwa5zdjhqppzpeoh7g966yu2oud0fqddjhyd98c1tr9eksq7j6oa8v519uqa3b261pn7191w7d37zllzcoehif6sogtgrbj7n3qwv4rpa4bm3lo3bh5eyo8gshn48ahfpai7bfjon0va62imwax5qaebk8t7jx1f0hsfs0z14y9kl24g9u6bebhzrur9objlqkwrw5jbdmp41621p234371nwz6sjtowlopqn2dcd04rjuushrcevt4js34vw0i7ygrx0azwn5mqj6p340zlgkztkci4cfcpnldgmy8pp5prinj9d2658qts1y6iiw6y4klih1krej8jsqowux9ejwfkfpjt95a2w7qhd8gpdmcuiylwudjjrakazyxhiy1omvmf4johc8uuq3lfxs25f6r4tsmycdr3szprlgd81clnk0tu8iibb77dgswbbc48kjtlw62a3pnwo196exdhz76zfwl78lfhxqb61xg51z0ibww45iarwufxc9cqbri38se6l2za66q0gnk3lhc6iol8ivx8t49fo3o2ikax9kc0f69ztpzq4nc2cnzsu1xozo51s1xa74wyuix3acfhpn812c0jeeyu0vpq623aclfhmrjdr3v8ovw34zse5z2ria7ua4gg9hp7n7xd9bk3csn03t2mplne2vmoej5xpcsxqk1luz6occip6fb84x2cs125cskqte1g45onyjar2k3sbrkc54vx3cbwdbyjk50k5rs6stlv2r4exyfgptqhx8686gnbg2wy9nhp6k7otrqd6d5pcdgjz03upn1s078gfkoq36fecxvytkz96lknygzwy6ss6fsuuswcp1p2w4hn6o88sndwc493043xjkldbimaqptvdail4imazj0gvoo9wyuvxyeph1p43ufsl8sajm9mny8wk2d4j0h550jtle4uo6hbwznwt2zh9e5we1ivyx01uk47ptw0ruu4p0gjmxaipzb0cbw8sz4t4chxzxffa65451x2bhvrzb',
                mime: 'h4ws59wzhbks5zak5iadm2l3t1sbhfxojoictokj2ekaymc4lo',
                extension: 'p80pv0gn944kc3hhtvjwg43hg9u31evdljpvntfdxb46ciigyd',
                size: null,
                width: 749087,
                height: 682453,
                libraryId: '8e77604d-f2fd-4921-b54a-64b34e773b01',
                libraryFilename: '23j6n3u8lv8qjuc1isdj8a49guhfjb4xh1kmwg51pcww143o00jroc4ajw7vtktgmk2yoamsaim0k5p2su1bi97sa71bn93fn5gwiplhnpkv9wibppmy30s39ad1ikp0a0rb4b1h6dedyla0moexfr2q0owa39mz50xpjdy735h5dpe72zcusnldb8udnqbp6bqmxbx19x1dporziqt3yyzlspyc1sa0l7y5eiqe1jlv8rz1wm6xtdb3ks4ylgc',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentSize must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSize property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '0f7ee8f1-7644-4da5-b53d-e03cd62405fc',
                commonId: 'fab65033-01c6-4b3d-85f7-7fef092e475c',
                langId: 'efcbc1c7-90ea-4bd3-bf55-cba1b0d94b02',
                attachableModel: '608zn5305apy39ds60ckgwij8zj7w76kvhynvms3f2lkpeyhc5xoibj3vms7yh9dn8mm0xh9t3y',
                attachableId: '1ed8b8c9-5995-4a64-9a23-d34265309f54',
                familyId: '5fedbf4f-7952-48df-ad14-8911205a3daa',
                sort: 337540,
                alt: 'izkyrcy8wptsrxogbvylzh1qv24cn4gjny5hw0u8fi2y9vzln2jnle5f16wcw7ormintuf2a2lhgoakt98pbr1u7r41r5bfygwcu1maqem69artjbt7yb0k03j0e5i1bxj9aeagvw7stqbf5axbgdh70y9c9mukcv0bk5ry0sjy5qog9bwc4zdicrmzy2jav4miwiwcz2y3iuapkf6nw9yx3qyoul3edf1rld9r7dzu26434e2ou40hss04z7u3',
                title: 's5zj9ec8onhrgwdtor2um0d2ukziramo1yoqso0qrzoutu97wk3r8npprdt9q09u8e33o0gb67hwe07izrj4kvu9jdewz1t7u9gyk3js5j31ti4qajud20gcmw26yglbn2zikstwocgujewaq4kkcp3l2lvjf4hq7qvks5szi9n511olxwy7812imsp5q1m50bhz56wcqvaqi47cs1m2x91dh3hrhifi2xkrsqanuvreseyvsk6l4n7xxsf3fmy',
                description: 'Dolorum ducimus reiciendis odit officia dolorum voluptas facilis veritatis. Quisquam accusantium aut quas non quisquam consequuntur non. Minus odio sit commodi qui quisquam.',
                excerpt: 'Sit inventore distinctio qui et fugiat asperiores. Omnis inventore ut sequi. Veritatis delectus eos nihil perspiciatis expedita. Modi eos odit atque quia sit quaerat rerum accusantium.',
                name: '3nft5revohkvfu1w51by7m2k6yxv37h91fqjtrocq2oxe0p2ef0cg2cftqln98hyqe7mw3bgk0fbmzyrlzaqq7ebx9f7rkm9x036o0o7dataggvw05z1yojkn54uptrcw84g5sdmg4sh9yefsx7nvdimirph6zlb6jwq1f12kziddo8mrfuhvd4eua40x5dm8i4vkavrr4sjevr4xxn0w4ur8a2ycfuusqo9nsfwjthuigzv6wjcjufmo2kz7jt',
                pathname: 'eeyxd356lb46w4v9fzjj0j2ct8wvdpq1p09g5b563lp39wrkyzxn4kkkb1uoxafesgrlc8nazahfhyo5gjyptnpkl93eba7hvphropwb38ofj0lt6nrtv72t6k1s36b85slwuinowcg9leh3w0atxjc3tdy1vnzj4gx3mvq1c00zdd8f8b2a94wwc0wic1l39h7ymtcmj3dm2h5cdic4g37dn71drcmfe9gw1y1jnr38ftqrdpl08oyck14pasf49igb3gt6snmou098a2361crc4bqtx7ouz0gosxdq19hk9c0ahi0v98wm7t82a5z435ws6647frgmvm1mndf7mbqpw4a4wzoanhxakja1gudx6i1181lai3t4203v0sn4wrs22o16o270q096niatgrfqab71smpkwp1omuq1nndf46cx4zduruj0p3ggl2udeucwimqwsd8x6hdddhcimvy7emsq88hc5z4ahcmzvyx1qka9ctdnx0awlcb7f8fqueix5ab5ozvk0vmso0d8gx2gn6ldf3hfkwwomke4q3w9przxi10580cwxln0ui4xhzf1mrrbjr7hscpvyle29lmgnvlx76ind742m5s42w7u969njr4cdswfquyxkjw31ewxcge9t9heyqc0iows1uqns2gkf1e2z0p7gii8wxfqvzk95tufyrdbp3pxbsc1rx49jz3m8gevizonjp0g8s1w466nl0slnsam6kpqzu37boprptrlzfrlu208iywjdqawtahlvpahbp9mfs9rdw266t8wrp8isykszi0r8m3o5x4pte000gq39jat1hqjjal5exelzlthdd5sekbrcqqp0rly8kcnq0etzzzs5q5m6j4mwxwjr52x4qk69nyh3jhihdga4djkzihao65zxf2g2zguzroojk7tulvcymalo58calyf3ex1475fdyzmid6o1dqlxsejli1uq375u9k4t0fwfmcqibmrjf7h8clyt9c3dbd8debp6owdm1jk',
                filename: '391plrnusd8mtyy6ipk77vzsdpviq18uckmupyicy3oi35fia9b97tgfzpawq5hw3yx10h7zaiivczhb75q1oae8mrf8fj58aylsd5mrxtum5auyyd1e6fqjub4y4gxgv609b44zswuad1p9nyv3dt4pnnmgkupvkrpe4sgbxnpjczpk1j7oeppma38t94hjw2oqsibr6s2mligk6hx2u4rdcc3nhqo4p6braxo7wiw2nvsb582np5mpcf3grnb',
                url: 'atzqgeoky1dq42cdi4oe3rttfj1vyjjzhvhr4ykx2mhhw01dofvqw27dqen3argo6uno6vikebcxcyz25mx5mgob9fsbr8olzovkkcnv8omx9jzb0wcdx25aj1oilrhb6pldtk3fhhqees982k2kwjkftehn0g5uz3p0s7jcos63nwialr4w5m5oopgp1xwd1mq38eocd3ln3xu2zefa394nx10hua338vajhxc06edwe1ok09cq89gduuv99fbmilulnrvjv2ec88xjpz8wk0g9anpoqjo38rtmakkypg53ypci8pwxe7lwr0xwnb6e5mlauc62vrvgar9fnw9jgf7002ptf2rx8hqgb49qkxkuizlc9urzq58q44iuw84p3hbysmmzj9br9tvlytoomw946kl00llc48urn8wb96a0kam93ss9viqgmq5w2dd7h30pru6lx7umpqcydbc8ssjng39fbse4w95ttdpvbqxaln0pwq9anoxgfae8d7v8ir0bazbyrdftw087uiioyvn00lc1c2jzhgvy0x3cgz54q0j5ut159p6uikox5i6yn7ktei6nqbcugpn2uv9ssktibbtzqu8kv4nfozr3eowb2sqtg3bf1splnyve32lhcif0bp14fxtq4sozf1bz9bjmr79uqljp5os53256bcxpfa1gey3l7g6rdqq0jmpdfcc9yg8lmlcyt2qfnmixvibespcii3dl1du5ve9q5xvwv2y8c9gvogjuqnkmnm333ydn2gwnx6nhg6s4oq7ey6obqh3fah32jhbg9a2crqcdxtzvcqknrgqeaeva9fte42480ero6gma10slf7q92zn1t3mxx281jvuiax31ev40ccp1ajtptfp6hn23v0dd0p14vbalg18qgjki6gxlszlwkiv6fejtwt222k2ddl4nqagnvm3tzjt78lp53n7dnl9lt016zbk0ptaq47v12sza7ufzpoumi5wvye7b27czznxvqb7e8wzkp99v0rei',
                mime: 'ojxibrjoi7ujyx88900c1luqtmtkdzc519z01zx96vn45zkt67',
                extension: 'wu9xzsbq5fdy4acmpc2nlfg13ctx890h62dr9omk70lrtrapad',
                
                width: 316685,
                height: 620607,
                libraryId: '8e77604d-f2fd-4921-b54a-64b34e773b01',
                libraryFilename: 'm0sklqqdu0vnn21n8b6ftgbjolmz46xcqdz8gwrszxa2spu5zgd3uw9czvab5bfhb90814yyu0vakb4c3icbowvod26tgd03xe7w8uvhhzr39znukohfti1uiwny57z6133xd15unb7aixj2ny7zxx9rk1w33tkbct9ww2t0o9evtek6hnmoavym46mp6xbqxcliz3wxicpflz80r1qttb7ikhe84vlcefs9wrgdbxdctrf8a1hct6lzu2sjp12',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentSize must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'aycaphqfei3d1ox5vftrnnd8iety1wtdgewr0',
                commonId: 'fab65033-01c6-4b3d-85f7-7fef092e475c',
                langId: 'efcbc1c7-90ea-4bd3-bf55-cba1b0d94b02',
                attachableModel: 'zuyn2msftpc3vg7yqxh0qud2j4cv89r9po95chzyv718g8x5mqrtql0suq1xc6tcy39jmzhsu09',
                attachableId: '1ed8b8c9-5995-4a64-9a23-d34265309f54',
                familyId: '5fedbf4f-7952-48df-ad14-8911205a3daa',
                sort: 456121,
                alt: '4dxcx1r2t3z3s611r894gbg269b1d6ae5h2ph9im2gyd8nwjj2xazijzrfhyzpiuok9i2fjae8ziandvfbkyva4o9zki8jlm1dkm9yqh87ycmpkjlx7f6y76l22tps6gvig790nw6wtmumruyujrca4052c8u4wkexnhkya6p5gey35azwoy29ymvmaehk44c1r3n97npo38bth0wvoz1doky74ewoo8c63mkaqfdamcy5xg5q43amjc3xsiryc',
                title: 'f0c6tyhu70hjze0s1ni6wn96zv5zkp0036isiscueooprn6fn4ygjwsmgq56ss26bqo0g353pqc0clj3ik9ixqfnt4w2v7gkyk7dcmd42nzvzn62dykjo4j95uxl1b4jmmlnjna57dozdrh8cjzbi8w3az09wdebvo7a33e14rvmkp4m0th60v90xllz3jjkflv4o5o8vaelijuukna311rhef2fz2h6p5hll0pt6bzkhotun188o0reg2cwarf',
                description: 'Dolor et adipisci voluptas. Corrupti voluptatem occaecati architecto eum. Aut maiores dolores unde molestiae rerum perferendis adipisci. Provident atque perferendis eveniet adipisci eligendi culpa qui voluptas sint. Ad qui iure quia sit et. Exercitationem hic animi laborum cum est aliquam.',
                excerpt: 'Et quia ipsum dolorum eum velit. Facilis est aut magni qui perferendis eum. Ab rerum autem dolor sed dolore corrupti. Ut amet voluptas et facere molestiae animi iure. Dolorem eos consequuntur voluptas fugit. Praesentium perspiciatis laudantium facilis totam.',
                name: 'd8x21tf3b0pvu4cpu22pak1icw58pdt15186l7xjou8mhhpemmzfrokim0a2cb2qc68y4v5cgu30fu11kyns9dxqr2oqbuq7da7rvqme61hcct2fuljgmq31ojlqk3cvm042eoc3a3wt0om5sebutytthq3xkvef0pqhhg3jrc6nznr756d5w1kq038cjyza0c92ifdg7ag3oqzn8ymhp5nhfw9iypkhut93r2g4tpgaq94g8z1lu6eqbjyxzlj',
                pathname: 'j49tb0tkbh9e62b8zrd8lk9xhwelqmlorgyqk67h4vy1t2y0ce4qhh4awrv491ij7wl9u043o95yzcmmn5t9ktbx8irvw8zrds40pmiwv60pnvaw769uzmokuz3ii5rxvzgq6vvvd5a2u2h5a6whpszpfatbdxuogli898320aeo8vecjl3anwi6umsve75gxb9dfjw2epm66p3pe7lr58hczlpvbvpkq1z4p9hnzdlnxkc1667chal0d5bc5lq8n15ztfnwc1r3zpesymfht2swml3l9kkxkfsktr6s9lyuahnwmv5j2sw3hwa5a7oanrdahfbvsdlh0cnu3kp8j2gnc19k0aqc2sueamp38alz93iskctug4ke4gyc9qj4kcxy3yc5btmmc231z6c2c3a96550y5po9jux5trkgml7m5qkjt19e5d92okmkjg6dnv4se99kby8x71ob71y7owv2ueqqty12ek71yht6bz3mf25u9zpf72pv4126csa5r6xvcqy13ghw3v0jmr64sexhj98ofav7hst69w0vqiys5yzs39zr7bv89go714mfw2rypr3jtnu2voo85rerwethkkw75vo8qet3myukqx6gnux9fi9o456nm9u83fb36rytccvrg330uflan4dbab9r832p21a1xp32p714cjo14jfu00mvxoj6qxf3womhdvzd3qwklledg6gzjm0946uodsh9sdg5b35b6kbz18e87ndf0e4ja1xwrtg1jgtoxdwn4s65k9yozpeotqh2ckdsql4ud75kkkttsktxf5ofo8e9xirsl3ts1rnuec1py4fyvaho798xlwgqxuz5g8rnyqk2j1sihphdi13tuksknyluotpil7q62ft51e08ckchbvxoikslg9a4ftm3yjf8xxseo1cmdkimef7j6f6ora1t7vmk2tipq7vhy2bq0ls92qbszl8aurwax7apvgmsuxyrenpjd3ciq5sybm5we5suu56x5p20evsop6f',
                filename: 'v671tz4pgs0rca8rj3mpsrh7vzn4u46berqo5ndyob67j9dt9dl57a55am7q59jvffi6ypy2sikwlonm09gddm3t3dqbfbuwimlr1p8mlxtgntjdh1co4d4j3uy698c6wdv32gkjxlntcyywxc7dm0k669fr7lqtucn676gvr9gndmsjlzsu9f4oa5of6r8o3v10aoxldgjrkf4e52ynjwc0xh1zu9ymi00xzoxhc2aajfyajc5k8pg9wvsnso4',
                url: 'l88wgupzgqp52xp6v31sqdu939r6c8dm0xe5ipl2pbv1kve5spyiyrwt8isv1qy3sanqjwevexfpfewudrh88xnklj1k124awrymd1klx31z24eg7kyg24tp2qnzyek38s2l5vnlczjstblnr8p4ops4hnk3zyohojhu89jtmkw5juvwim8e27v6nzpcv93c1yjfrumz8nary3ujec9d2arexp85z5dlrouewkmooihnpmatwnsxbhozfg11p7az8qk9l85xb0936o4868c3wr3ytfpg8vdvkh7n769p21cpboin1azy4f4cr9soq8g278s89kk507rrqhi5xygdg0izebktedcese1oe646lg58sm09skki2bs9ubfceg585oez6wuw8n1db3cridnl9g4g2gux20w5a4a7in8ofuin6nidmrkv2f51v63vj8phn71akfvwb12t3aa3vzd3w985yd80ptj6ht972ofb2xodaynswun4tsovszllfpgu3n0hmjnucrwlgk0gweele9fqqo0aifmhvbr3s8sjfc8def1821o7y5wppm3u0uemzuwk0uyqcxe2jod3o79t33qbn9ojmws9k8ccv05yeus5sq747y1mzsu5nthyj0oosipfxb192eek0oi8u0slt289gmt5gpbmpmd63bcrx24b5o8z0hjlav7wce495pxuf12oss4w43wpw0ikrzjm4nkb5337ygqoc3w415ze9g72jw954vtlm3r0448v1r93zln9vt97mjrlkn06e30bo40492j3hytx6mnverj4b17qvfukicj2zf5vm4vmd379wxt8uq6rgtgnnp1d8z1jofaeqyd2ooee27syakyftl2jffoh2orhb35zktotlls4kygu0yhc5m78184rudt82imf7s49w49m3yj3sw2zquk011q7k1f3liwqkg9nfvkv57im27el21p8fwtzyd6juxnxback9engpidahf1zhzafls539aeth6pewr3iuonz',
                mime: 'qmqy2opc4d2ycawr8f3mp3ty7npdepiydn9ia3ipzpphnbnam1',
                extension: 'zn80zay5uv65n7tmj61nlicgtefobnsyxmzjvqdb8piw922nz7',
                size: 6484064927,
                width: 203423,
                height: 826022,
                libraryId: '8e77604d-f2fd-4921-b54a-64b34e773b01',
                libraryFilename: 'zfxulygomndxa8yqcxezyjvqkspgdi5oahvkr3v5yyl2c2xpx17sziziees5ng8wncc38jwerx0iwrdfnh3tnt36cj6lsv8jfvznk80sj6y1zoojqiyclptyoyacseljgecjc0jj6htuwaz55n1f6kysdht8o4y7611v2cs74t84yph8etbspxumyruoho6pmfuztu78ho40ymkgyfjpxtgvcail53jzfrsyipmlc7wzd9jlbusb5k36t3m861m',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentCommonId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '0f7ee8f1-7644-4da5-b53d-e03cd62405fc',
                commonId: '8auaike820pz8wnwgzudy7h4n64qagna3a9gt',
                langId: 'efcbc1c7-90ea-4bd3-bf55-cba1b0d94b02',
                attachableModel: 'muvpk6o6sonl3aielui7xvbvexqz9w0n0ldjbvy2e569qydtceuksqzzrng2nxxc1ib6llugflb',
                attachableId: '1ed8b8c9-5995-4a64-9a23-d34265309f54',
                familyId: '5fedbf4f-7952-48df-ad14-8911205a3daa',
                sort: 640517,
                alt: 'qz3pnukrp9o1g0nxyqtlhb9b9oorfyxr0agpw4it8xf26iaukcryzh3d1jxwqfg3wdtkvmn706936cgyqki76095equbbta4nj3rrsn9axrq2y26dm8ujz2uo49m3puweq3jh55xjspjtdo7nml9kenyrq9iak5875726uqcajcvtrr6ip15jlcingtqsms2622nhjmj12l3437hcbmkuuu5vl4u2xquramrkzrihb3xz4815a38rouiu9rlebn',
                title: '52mkx60wmmdjg83c5t4y2x6y9fqs8z1x8ipdatwa22djc9pqk6pzmtcgetsnsal81tevkqc70vj7dqdsmy4dakb6sj3s26yoaub6qjvetfs0i6ti656e0tmwahz3bn7qojd67zyguayt8chy8vpdrc3tftw69y795yxtnwpd8p40zprxe78rfr1owl4c7ms4hpvn9foneadhadzhqcs1fwp2rxomei96mzzgdmcqnbbz5lb1q8stemc8jcw8wab',
                description: 'Eligendi recusandae et repudiandae pariatur ab porro sint. Aspernatur et eius delectus consequuntur ea quis quisquam autem quas. Ad voluptatem dolor similique impedit aut enim laudantium. Maxime ut adipisci incidunt nostrum expedita omnis distinctio. Vitae aut velit voluptatibus.',
                excerpt: 'Doloremque et dolor repellat nemo tenetur aut aut quia quasi. Laudantium suscipit a sint et ipsum occaecati sapiente velit unde. Et repellat fugiat. Odio adipisci suscipit sint voluptatem ab culpa consequatur fugit. Et quis voluptate non soluta doloribus. Distinctio dolor eligendi provident et molestiae.',
                name: '9ytzwjvzqc1dqlita0avpvpg2lww4i8gpqgl7sv80vh7vpb3viozcwu0k24fzjojpmfojt5mrfkkknbgxnivozjm3s54q4kimn6c1jtljp8zt0q0ckunludz9p1652qgg8hj8p5k33bfnuixa51d69dwc3pmedtgu3aqxi1wbqblxvau8j4yg2km22mid9thpxwjb0mxqn6f6jepvzq17f53ydnd7bky7kvlohy13hf2zlen1j81fsnsvpoh19s',
                pathname: '3k186qz2br77p3h807i6km9jban05s29b57o6l23r8nkdt72hf1qt4u0dzq8izfx7o3w31cxbc7fa9canpml6m3gb9i6lk3a67zgn31ncmqma4crh7iyxu9rcx7hopotmv8zqurapiuaeubfnofcejut987mvwj40sutkv1dngjesa5c4xj02r1ohpiomav4bxdix053rvof2bav5ftz338r0bqcadcmyuoc12l3c6ebwi421g84e8ygn6doukuk7i8vatgopl7jxunqxrlpexraa495a273851zom2s1nldvzpquycepp025eyg33revcuxz2wi57e7hfgxv2nlevwc5fowdhkh3ph1lxlyjmfsdcasebid1vyj8chui1htf80vhk5b8qke8q3utunxbc3s6cuj6yfrzukcigjx204zb0t5t9f50hg5nxvzm5g7hcjpkq2piwwla2at9161lethbf6awo0tivinljii70s21unnflrltx930bbh2poaprifbn9huv666ii60qi5leomsu9299nfx1pp9h07q5kc2dafdviyot4neqgu737x4ivf6nnf643y1anvhmdr34i48s3zz6fb0mi68qf965bl32i6bf4dnygevudm11dhrp4xah0czi0s1nilzmhfgn98hbq32ca62ahxe7sr1x3z9fzwlifd43e02t9l9f0kotwe6g7y10sbyl9st58tjvhza3qiil5c9tc66y2xrabd9xa63hjednprpkioq92hvlf2ewsj4q5izopn969kufj30buvhf150qj14c8fk6bz1euo9tcs3cj4odp40usdfyrd3rrle8chl7q0ahcsals4u2lg3zdo8g25tljbl36sk23kn84nu0wa445ob70jzx1p764cuemftv21ipgfdk33rwqj8wc8o2jcdhm4avekdfdjanfumyr6zq0jnnon2ea6acgd6nigj086wmn013wwbd206bzoxstogol13g6lzfnnfi9z9crlfo3lo4x5',
                filename: 'sarm37jhznq0772hjyk8usubp1d3y9w4uywqn4qj1ffvh88p1kvwtc0ue3pufuauktv8lmqnn3ublquuf8q5qbqch6gh0flmm4jtmwihzlmr3cv1nsmth6m3so03vj0ta82hraz7qwkuj9sg43iw080ll65xzf3felezqddt37lals9zyp1tzymef929shyi7zi2scv5fi2zex85lgpl440ihtfp6r1ch4cco3mfvhrypn4sxoh8gk8eimzx2bb',
                url: '8ybp5ftcrs05qc0bj86mme84szqmqisn7x6a8uug960atin2g3kyry4haltad0eckntfbeelephwqk0sr2elyctzevbzi3e3cz42wqkq6siw7flen6g8y2i36ewmrb54fcn5k3yr3uctru7zotp4qfaqlk97levlrgbm3f8uqg93a8mpqann3nssa1rjcbkvi4mdv70iezvoejp6bmmminrdgwn5cyg1s54ozf6ckgsryfowoszm2iv13uu83k6p43df168gvoawkfjhze8gg1mhafd389gzj3c9fc8d6xhn6vgvmevqifq2pobq9ur7r68dtuuvci3swrqkrxr3tp2l8qmbvwyweomlyuozgh3sv1rem1kfkbk8etnrjtgirret7dfdhfntahiwisf9xul0mw35wpn42uejucdpwyqy90pmmfza4e9q843k6lzml0n8g38y78dm9dib0q0eqkzbpj8gcarxkaqikprprxe5otfil17sv0fxzc7hhd2e767636wqdouzc861xjdurozf4voy2773qgenbbs9j17wi4frja1w1nngmqe23svqo70h2lmlqyp26ypqguc50zirpvk4b0hcde9q2e49suf95m8ix53mqlbfn4e6jahcxal09muntjy57zx5xjv5pubfc311eevrhnmbctnydt35dn64s0vlcyq6t55qdpsmspzjt16x2zcydva23prhq3wtpnphrwzvj6j0cxlqsuz5gmiok6dfylvfgg2foy4zpca8ubloikg088d2grim5c6dt4g41nly0qgwlos16zc2puyzzxdax2m9foz0pfancnwyr5gahvxl4suyvzkvcq0ukdjiz8kmnowvk11syb7h0gy3v8z3lrubwhi8p5kbazwneml766dy0j6jyyqpykop6yc9aocrxdi8vsn5pe23vbbm5eogr6uk1tm6c6klbf6m6nz6d177c6pjjaki24ldsg9gbad9rmvw681k1wpgx571t4rnaf3ycl8viody',
                mime: '5porfu8ct6qx6qgvac6dsc1kf16o41lt5ljo32h7xkie9z3stz',
                extension: '1zaskwnw9kwr86lsa6qn3467jy25sjkaqdcs8qzyboh9t0njxz',
                size: 4798511395,
                width: 968909,
                height: 473313,
                libraryId: '8e77604d-f2fd-4921-b54a-64b34e773b01',
                libraryFilename: '1egwzb0dpkaan8xyqjlyngm35p2rluoc9gvhj29swbd66sagv4kx5065wcfsjmcch90b6crsdul7ecj5hp4z1lpofkca5xon6mfmjic4rpqsbu544izg1iyvuinxqv2wrrtvcjxu8htcioi560yq29kfrrw7e9zmg67wvaxif7jbtqyq23g0m56wi1u8dndhrjrkn63wqg9xm1ddin5a4r2qq7xndk0hcd2a6p1fpnnob4at7esfqik889c4ksq',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentCommonId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLangId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '0f7ee8f1-7644-4da5-b53d-e03cd62405fc',
                commonId: 'fab65033-01c6-4b3d-85f7-7fef092e475c',
                langId: 'zuykvrjdmjfq6p06buciut8in6hflokmhbqge',
                attachableModel: '0uxrgetbftrrvjtnmwyrra28uamjsvonvxtxemgr0ld5pka3mlr7hl962ocmszjlwgd59kj3lmp',
                attachableId: '1ed8b8c9-5995-4a64-9a23-d34265309f54',
                familyId: '5fedbf4f-7952-48df-ad14-8911205a3daa',
                sort: 875068,
                alt: '1k47g4f7vxxt27fkc4bbh2mfzgrud3ffg60qpigovypduv8x5sfvk82zopfrnka3k19ri8owpxq5mvhxovjkj95osqletdk9m0i1tozzrp0cr0o0d1dxaiojmz5penm1299dhgbk5udctodjysel0025y0ii3kmi0xahuikt70rt7py92o2fkdxz4m68nhxcl3boysshpenaaxgsmdt9vg98fnvbf3sgji2r3ddriplarhirujwpd4zoqgnf3ye',
                title: 'i9e7aefrufk92v1v8nhg390zdyor5ed98s17lhztsfir341wjrflm3wfu7eq3lykm2jwefgtcvjv654ydsak1dn5c7pn2hx17m6rqmauw7rswlaelfaa5gnmogb5nsav9brcz20d9cgy51eivy42g5rar0jmgnjq4qf3htzrkr8i4j5441yg3kjfm1ddju6kpmf013kge1qfdo02hjzn5z9cw7nozzzq24pw5nu34gx3mic8sjxtwmmx7ti2x4t',
                description: 'Aliquam voluptatem cupiditate dolore veniam mollitia in sed quia. Pariatur quas nostrum eligendi non rerum molestias iste distinctio. Commodi in quidem officia odio aut.',
                excerpt: 'Libero est vitae nesciunt nihil est aut. Iste est ullam repudiandae sunt quia modi eaque. Nihil voluptatem in.',
                name: 'hdz0nvll061ljk3s9bfwgi5apljqpyckgvbc9zlwwa3vd18v7d0kwde7qniof3hj7yghfrm38lmg19fciiqcpxxs0h1wytucot9ow7j6fvm4pv3m6uu2zccmfvb8r20tgdqn1q6sghr2h550zik1eh1vjho73mfbx302vb7cifzoi59d6tye2afmrz6e9y341egqx4v13goq0g6qou4one9jyer6fegf9f7xe51t0ko1o0magieavf76a1ehw7g',
                pathname: 'w2crsjpstm40hvxzg1po9swxz5xzei4ibact9fu4myp2dbv7pwmgdasvqne3bo566la2ft8o3ff272yt1tq6pca9a32ceh4wbp8yowe48225r7bz1w499cqtjo15h1yzx7hw2q1nvh8feq3gl23ela75zhei633lrvi1mtht5yj51i496sd21jdgruahoqfbvkrqbyplt8rsp9o6952mzh0bnp9oxzi8mgt6sdd42nq3v2ozivjgz25rxk1uz642zzt8ks2g7eioftznb5621e21udvbew1nzhja1rwguvfszresplyt8uq3knsaljoygq73dcg1ms39gpa00cbzi7dsgkdy8y5o57i0iiyfd47kgna1eop7db607jgbfir18ojgpfz55pwzztf5bztajd8xsx4ci0i71t635qfprocrio63ysee7mrxg46t5249kdv88uf3uptard1witj9zr3xha7bnwop6n4sddzm3yzeqr8o8onf9fmvs9fqbwyinoaq4f4xb1uzr1q0thz06q04py8vqm2sdn65fpw6ldehq9f5oewn92qyotljly89zp2cdhm2m66hivtnuomgkptglkfqorqfaafsx0da9f4m37zyv8kfcht4msuf48kp1hm1l4eywisiueim0sr9rlbsfaz4zc0nh9lld2eh2l1xic8ztyrebzw75oumo3jat69vwd30nmbifct56ov3bsyh3643y0p23s5iuh2vlhvrucuk368jnr5642o8c1g9til2amzd7lmqhexaspnkg4ywtigml794quf6z8yr27vj3rqvggzv1wc110yh79lm5zcwcfpyu1cnbma6l2605hz7jzfn1q5lrxbek6of6eoamw3rprmee0lyjdak2a5n3hda0jdnf3kayo59hl7icudxn4fa7eint43m99t56l4ne0gea86sd2rnsfamvj4ylcv0d67xfpg27gtlbq5k05zbmccjkjblyfdcr3u2qbaj2phiszkr6x89i8c7rns2',
                filename: 'avj227zhq8kp7614n0bzrszse75rsvieukgq4dcc4se2cn1m8uuxhbxtnv0mm73guxnn55irco837g19t509rg7cnslnyev6bp6ihj7cd0kdnggv75qr5f3jyf3xbhs2el6cz379icst4k4gmjhh0r81mafuemlkp1a2nccf9xndcto32gded0rhuiamr5ef4mtplo5cu2wy2jhf5u17ill1toylfk1853sj1cau7lc4gz2g2gu4tc8tzqs9c5i',
                url: '5issxhxcggzmhmwh939k6mxj9opn9fd3b47xgtd7octppncofws5ucso978oct8c0qhfrni2seo1w7rocmexqm18mqfb8jnu33rk8ol8zxikbgnn112ks9ruow2186vql3g028zr12ytexfp41s2s8oic9ww7oaopgf3ab616rxfx9g1cdea7blhjouhbmh7gssktesc70b0f6jj27oijrvwd5eou68o68kpmlgppkrfuqajhfdf0rf48yn3diahof96ktd2046eu02wuxb97exgplwopgd0sjorh0e0a7x30bssf9gkf0fl2ovu2cui6la4fevsqj22kp9ghdng08b9y7v8rafu1s3qzii8yvjvzsomdwxmqy1vln05mzijmnbzonmazcy7aysqz8jxyzia8vb8wix3ojj95k6i6cmpjlbodbgg2mrdv6v9mjxyxgsyb96kj4rpv40a3gz0typ4zgssg2022ioeh3486q2uiw3oiuq1wh6o5br401o8s6dk4pv5mpmjhfngc7uqg799whihzppmqvoihss8rn110xirqtjiu948mncuzgicqc1qv1rvir5zmdr2as3msi1r039ooejyvk8ea6l7pognl5mp77fkgh3lj05d89ps8mze8o01dhth09yl5srknhhfiz35wmh9zty5sizuf7osvv2cdmjvc39536asg7v7hyd4gpgup1taluxgwh7g0j8lhxqnnrajei0lfcqnmeyj0q6m7fnitbmpe83mz5dpz1lpvp57vj0ia0hokg4qi58oev3xoyfsweozv5i5w82xkkb55mtfma38xr0rm9sqo9uaq0ai5pn978ifpn7aw4zyjh7b2t6s0688svp7nsb9eicemqybcjidp8941k2by6hr99qb2h155626oxvnm6s3we25eisz7vlpuwduhji2gn1a13pjnxm2s28e5jrs886okls7ajyxthecwa5upr6wxrukvb6uawv6tem4ge5feve253le27ff9p5n8pfr',
                mime: 'i9hbpc2xfmr0eulgsk6fpod17dnjw68w2bqsxluz55iqa5fq7l',
                extension: 'aqq65qftesi4vwvd1om53tqgzkjdgestkrx72thznd6qyacgwz',
                size: 3637495506,
                width: 881076,
                height: 389892,
                libraryId: '8e77604d-f2fd-4921-b54a-64b34e773b01',
                libraryFilename: 'cd04oiq06p68kmkpsh3cvpga2kpic153vixctc26fuejbe73lz198k8c36zpu6rwz3ixnoo9hkdj7fwafmj6636dcyxqid5158hib8afs4jok8by2z58yj5md4lsea128tcujcimq9rh4qaxhn8mtte5hykqfie16q05kn6abpq5zprt7ffee6rxjukxua14scpnp03wy2bbw53r6i2a1b6quwowbt6qzjxj4qjku1ribd31lljwaiwns2d52ks',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLangId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '0f7ee8f1-7644-4da5-b53d-e03cd62405fc',
                commonId: 'fab65033-01c6-4b3d-85f7-7fef092e475c',
                langId: 'efcbc1c7-90ea-4bd3-bf55-cba1b0d94b02',
                attachableModel: '8c5yagriyez5fvlo0fa3pbclqij7ekk960la9pah1umo0su278rop92ra7daxb0wtoqk15rw32j',
                attachableId: '7w7g4zeil7h5tqocuz82ca9kpq14kmtf9grnl',
                familyId: '5fedbf4f-7952-48df-ad14-8911205a3daa',
                sort: 783324,
                alt: '1t4b9spaq9zzvlma5t9sxiajz93ahjroenakj3t628h9ergctd4ex489w4ge462rn7io06wm54gota3ymjwvvc7r7p7ge2r2l8flbt1g9ttek7srou0fedsdr00it0k0c8446x4557p9a1d5iw91tcdmy1pzcwrx812lkrburohp0dx6j8nj1wbf9x9cf9irh34yx8hh1vo9llthv4oaf74qqk1k5n6qep24pwfm3i5xmpmucd5fu0gv7cw25ij',
                title: 'x3ziy998kvjq92jec63u5nkgt3q37ji2h9eqgqk7rglqa5fqfzx7al2yfq340nm2bs7d2wfqgeig8m5xsmhxkxn3racpt3hqf3ljgojl6fjyb42cysdp7yq3mavloc00yesb7grm5mofzjnxqp5rigosi5crrrb3aqqc9lgix4gja2f46vu1w1itp7lk5omph8nwvu4qt7ipr9ncbnt4ap4h28nohi4ass3alrtnp888zux9k6w15znki5tcae6',
                description: 'At eaque molestias culpa quae saepe voluptatem voluptas. Nisi necessitatibus corporis et enim. Voluptatem explicabo doloribus ex provident odio. Doloribus ea et quam doloribus dolorem aut.',
                excerpt: 'Velit rem doloremque quas accusantium ipsum sit. Distinctio saepe soluta impedit ipsam dolor. Dolorem voluptas itaque vitae ea. Tenetur ad dolor omnis quos laborum possimus adipisci dolores. Animi explicabo est laudantium omnis.',
                name: 'jlbeq306p9qgo5n5y5158lt5kop6taw8j6kw9v4zucncjug0icwvkeqx991c1iq1hkdj307knp9dkwv2o1svb96hqsaxwno8scqaaa870o0xplw2sesex2mq4hk9mqj24idd28pgblm37tzjwpphz95g9vrkfo75i886ns4qyjm8doahe94qzag978j0qmxw2ys1yu87dwiiq5zwnfi6y2obqkongx3chogyhhdyzdnq7uyn3yyv2ykzrw1pc22',
                pathname: '0rigr1vvx0ftoroe9p4zzj7bmufousdi2tar30gbx1v3gp4ljj1o9o0moz3dbmbchqwmz9071459dmi8x6x05suk8lclc2c7drohoz43e9vghdtne590yrqzcap2didvm01zv4rcp732ygy0bypp4k7j0hpdtfwpu41mps7qmn5rpy6d47kreciw2gu0u577srt0scpvbxb7296eyyokr89ubwuluf1mqpcjy74ukciy629yar4kxwtjbbiihkth4hh7f6rg5lkt7l2ri431x03ruyhnluj5kt86ew4ysexr1ourskegnu9nursf9v3whke6oveqnl1bh1rz5imnasz0pplaz5g5riwpvdch3bbyhed90v3d5jfog2vtwf7heblbr3dqihzg22jenigztitvfqetoie0eos3shpen3zf4d0vd4zg64lkizait8r34krxj9ijg9sy5ctb6kealhefyrg6gl3sz36ny3drvq4bgsl9ud44dq4hnsy6bkubh00od52l9p13br61mklb320oa14l6wczl4wfm0wy0iq5qfxnmod6wv09s6g9v039j1etqcxga5s0jr8x08u9q89b4bkgzdv6d7d4dmenp3yzb5dlhj01o8gsuxi41hh53phyitlx3m66kac9c4dw5uq5ol52yea0yznxujvuuu2u478bqemqm0kgefw1iz9qjynwak2chabrgtds5i62alp3rrtp0gyd92mf6555f76fc2iba72pwg0ddl4d6o6r0laip1gb64zmk54dqldfcw7fbp3nlue2o27jc1gnmtgjelvctipxabcb1xlnaod0zvsu3ymm1su5mlkuoebz0mnb1tt0ejts33p6xa124doenu1flym4js45i8dcbmkkwb3lpssvtbthp18jnf3t486yprt7dagis266drxth42ec9kmpvzdc9iqkivb9sw3gft5aznm7dme5z550i00t30e9fbjrois184e1bfqzwf94c6rv649m66x0h82evor',
                filename: 'o0c1n4kou3bm845rw9v3pqx2fl88fua6kizig624c44naec7g5uoadd0q8jekf0qhdzk7buvqqpb3u2j4ml7nib3m93i7gu9ls60an8c7anlbm1tzi7z4x7ymtmebfey70sy3801kieihotgkk24hf2k7f9zdj3me2eoqxj25hitzhc5yrrm2na675kvranrvm82jrva95cqtv5q418lbszf15c05y1x1e2vex0lhskeobpssx53wp21hhh1zsn',
                url: 'kyijkikbenhhzqm8u0a7epe26ev7z1fo8j6e2l3ef1t20wyug6qxm7cvcwd66l3updhvechqjqkcwj3qlc8fvxoyghujp5cdt433x1wr6gagpuqv2wtc4w1zwtbjcpqwsxgebj9gscpjqaaom8niubln4ffafbc75q6ci5kzi8s6mpu13tzahgb2imav7fskd3r9j4dan3d0hazpfjd277mlooj44mko7npls2kw0z6vulvx2ml7u7e3p2b1egwvqd25vbvclas95lmava9lzzqc4r8mtpzrln3wvq16rcyljm706ffipwtlm9uj6vdnyng29xgmikuudmvdz8p8i2scdqsss36q16tzkpos5u794tc0ku53cnsrp249uidyde49azr5vemxljb2ei2pkf7g1qb6io1c8c6t4syqxe7106z6izavj3rtdexoqtfwq5hkgz666q26gtioz6z1hf2sa9x76u43q8tnvpc1zcug1xf8xjl8ksc4767397ph89dw8kzo7jqk4x501e0c60b0i3f0edlqruoxci6d0l5oolauy1jr93z7v5vl06ar9p4a7468b08fse5ng5j82c3srvb8am11s6l6bd8adcqoipc9cequj6lxs7ka0q459d3ismt4vekskyz7dknat9yig6idera42unjkprlav8paiy9id1fj3mx3le4ywqj6n2q7ax261dzgjrcr8sci3rs5ysakow2iexa8ckown6flfnhkhpyu7769p6ckuih6u4g7945h3gvihtfg4wpfyrfteq073obgk0gnkknmtxr5k5zx24xtdzi5mb6i9gtdnfxayii8seri70hyor6tf2zbt9ozxag0ld595zgjd05vrkg5wt3t7gktrcrx27kkmrnb93pozvqo9xyg3wufohxuzvjk8llz0or7qpjwbvbiqlb6zjxq38rvxnpfcldtv03655dzazcw76kk5w8v9m7bu57135yaqcqeo7hrtm5fqparnsdzoxvojyobw1s',
                mime: '8u02f3ngs6b18n9dfy1a4s7gcvakyg9s7vemebj72vitophe6u',
                extension: '25wqy3kjo5ty3nrfwg5xp44osq0mfvf4a1ju9dyx43tapavwr0',
                size: 7037432801,
                width: 554984,
                height: 778092,
                libraryId: '8e77604d-f2fd-4921-b54a-64b34e773b01',
                libraryFilename: 'ioo7gcqrsg93qd6bfqz2tf0pcth5crj2o0ina3gjyjhwwojf03gcmx19lzdztflvt6ypjr38vdlv7j0aiwhvzjzc1u9emq14ju74hykdbp8ipm3uz8hyoejm87lls2hlf0lbo8nf77wodmal1zx34u0a5ibzcy32r99pu11jrd3wn53nn7x8olxcba2nvhe000e3exzti5yte1kl8r5zf2nbonc1putkxim6yc20dlij4cyxpkfih3iufox8o03',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentFamilyId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '0f7ee8f1-7644-4da5-b53d-e03cd62405fc',
                commonId: 'fab65033-01c6-4b3d-85f7-7fef092e475c',
                langId: 'efcbc1c7-90ea-4bd3-bf55-cba1b0d94b02',
                attachableModel: 'jrzwcrzmcluj52y4qb479y7q8t9nmdc7zn5si7w8k9mvnkpp9747tvpg2lpmtmuvzx3insu49zq',
                attachableId: '1ed8b8c9-5995-4a64-9a23-d34265309f54',
                familyId: 'ynz7xpd0r4notw9le34jguogv3vi4pvsj6aty',
                sort: 322984,
                alt: 'zxy0gt6vmn2au081et25hfrg1uazjnk0artdguyc6cy9kkg8te90kxpp9bd5vy7crsuqbd0kejkrskipxlnxktnp17trvkpuwqrqlh3pdyk77dwemdq61h36ds76sguzyqtz1aou9d5tyhzoam2og3v0uv2biox2sooifl46vzshkv6y4dc1jhylvbm2ldzu3okxfvqkud6m411t8rfj9jsdxp6nz0cbfybmqdzj9wuuo4cc6m6gnhmuwrvvpek',
                title: '4mqu6gprqgbpvdinxkkrjtd6kr9yvd5nmv49hyv7dlrzdar18hyyhhre9id8r2giusw9yxlt0qwfdw4jkgiddysnx6s3u4dz7py25llgwd2ncnl42bc2icqkoi4lxhktvhkcft4egazojnm3m25fp71ysge3ybhupols7jlqv4god7isp1b3kegw9badjh080dhkhobu8qr0xe5al3jjj5uv0mnryzloklik2y2xfi1hc84lo6anucrie9afkgc',
                description: 'Dolor rerum minus. Animi suscipit sit perspiciatis. Fugiat eos sapiente nobis est eaque culpa.',
                excerpt: 'Quisquam exercitationem eos. Earum similique placeat voluptate tempore laborum quia ratione. Dicta sit adipisci. Harum voluptatem quibusdam beatae veniam asperiores atque.',
                name: 'w13pe4mgwmid0wdss71gubglxxx1kb42xxnmovjebnbf6kfubamwx9onsexyplpn0e3wd39r4vssqan4etbd7w1vlllpkwrolaz3vtfywdilyfrcunvjzjljr4he6q2nsyeeo6imxpyzhvkpjtaravenvryoolvfpnymnb58hlv58q62bpjgixaw4tddzsz5x8sqie5vfzk7fc530ehzf9lc5y3w83hlntq9w5in0v5g7de00861g7onbd0g7s6',
                pathname: 'jmub1veiocqk6xk4lqqy05lsuzhoumz6e9vr6j17j9t6kh5cj8m9z5qzp6s0x0cdni8nbmsduaj37u6pmk0zwwpfx57e6c1htsqk0u3q3oes8d6drlb5c34aofilq65wvmah6171bliq9nohtnejxyzkqv4xjlh6cwcw3xdqedridvsk8akv1z22k8mfqfyjfntbxgy834iuv4ga41d4iovk4guzse6l2r1y2tiacnv3ugvzchxhh25eczdjqzzmqx3qx6hzlf1hpnxnv7r828c3eobltjwl8q8a40wri0tnlvrtn6o91xsnvg31lx570vggq04q5xy6ogfj21swxyrhlnnm5rq8qmj0uapomqhorrymodeywz7it54c6j7whyq21gmje3js47ty1oy7h2zo2elp80onbhd0wtvdvrnfi42eyngpuo5huq3v35dvnk5d7f4qdzye54p5u23dwvqjkshgg0m1ws2lfl7ehe2p5linw3cdnvh6trwj8bnwdzuamsak15g53z05qkacha9womggjblrpc9kj0undul5ghd28sas5fnotf1fmsun483bsr4jj9pf3x6jyxipyouhatj7d59gyq0qbnj17i67pwsewieee72yycl4eqwgrd85mk0ojxq4vesi3muhrjpqe2ah62j5x4kd12oygxrro1qtwgyr8jj3kg760qz3ry33841yki4qrz362wld0c5ct0mnp7rd3xz3quu7rstt98nr8os6x06btdvwb3mqnvmks0nf01pz5g342cw10fi55ndsq0gos38yy5b511d8enfn16r4qvg6ft4q0ulbspfp92jigvuwkrikg7m0e8erkdwb99h10ovz1w2sltya2hd0ugk39rm57n23fauygeh4ms9o9j0sx63dika7f0i2e29b9u4pav5mfbuu8p7uocwveiljhjdeeantte3o7ifyyp5oa7vb9i1v8ff19g4xd55xaasi51e8i1senjdaeyakp2vcbf95l15wnsj0',
                filename: 'yd8fdvujg3xl9tni1v3lq6197t1t6qs6ruhgxlh6nll0ni2gxsm6u14gke3mths3o5ctrj9fasbjy8ixq7wcqdpxxsfztchlgddc8lt1i0ykiczzc1j3swkrf31gr1bpixvnadziqvrwuxzso2dxonqssebwtjxrlale2xecbxujq9c7dum7sub8cipxrepzatqyokwsfb32p3jiu4rteuqus9ixpk33svj6qne4yw5t1r2qwf138xvbcyh9o8f',
                url: '85quhnis0hi7xj9q9gxrj9fqjz132wv6dypt9vkbvtgkkv5vl0uj7f2bl7s9x73dtvu0isd26tkniqb3f0sfkjztzrc6eoosrsqp3ko6qt82mmrmx3ojm4k5xkzazjg1kqeh4vabyyiuzajsb34y8uk6o733ubtn0262kzmjs2iyhnh8l9jqs4es140kgrralcvo79qoy88o950v5bzi9v9u48xnrhbx9ob61rus7sored6co4e4pudzhrc5ipnx8z20abuqnb9u9w4zciq3p5h39xzeygl3esg0uyycclgk3va0m9um0kuybltdr7daqajnob4wfwuhu2wqueuwkn5ntcpb0r3z3oj3rqpa02y25j8nnjq7ezbosa9z3ugvw7t7zovvxhyhq33011hhec0ybzopkzt8d616beafboq6xttvlcy63l52zvqsqnjd75n619au565jpchd37ke20ytd21b64ql7kn5ir40844dvyh5kb0mgk7a23ps3q6rd91n9zyrfkchclwudrxxi4h31u3ymiysoo6zrfv3m2ng6qwyuiz0c9czhkjxzhrzketn8x04kd1gbkw72wjqdy5sk4azvh73fn4a1ff62r0sot0ew2cu2mvy5rjy9rs980m2i57qmvr77ek85qasgr0pr32z2at9gq9ncgvxg5pjzuxjihyb35my45jtlkzovqu4cueu8asgskfo1vpyl23ffb3hozveajs0m0whhraf52hnpirgeje0l6w2jgxyu49sv21jaxyg9nazaaaszmj2hlfg7x6227d3lacavv51tjydqpk0ggygxgnuu3ke4ykuemlrmq54icxxt0kuondgf5ddqtm2m35foulnayg26g8rw26o36zek8x3zdwvd7mf6ofvhbn9vjhdxhkhtfzqwqsc8pp9jtml6jae7wi4pevi6kwgp6n5rqii721os62oyv4e2525dtf7wfqqnikwqvjjuulglogu411rp75riuha1y2hqs1po1jbzx5v',
                mime: 'p07h5xf9if9oxzxeuxkqmukbmg5yeqkaihfeeewg52c8rzcpp5',
                extension: 'q8i5aqa6o743xuuu9eqqghbdwhgghzalf3zhu4u8c0fx58pz4x',
                size: 2862047213,
                width: 767980,
                height: 106820,
                libraryId: '8e77604d-f2fd-4921-b54a-64b34e773b01',
                libraryFilename: 'mfb1xr0udz0mdyhk7c2e7gz7k8xlft7eqtiyi3rv5uwuusemqqq41ncrc1zxigmqns5fu6z8mnoxcguvkugs4wz3oq0xf5103ogol09t1znvw7aesk5dsmheemrsp8b7bxyasqgwo27v4j45234ead8kaxxacr45is0upygybkvrdhc9kb1h4l5slz64rf0zxvtn92leaowdwh63ri4itds6lzff9etdv5q2ymvjoagq1cbobaa5fye9cq5r6ii',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLibraryId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '0f7ee8f1-7644-4da5-b53d-e03cd62405fc',
                commonId: 'fab65033-01c6-4b3d-85f7-7fef092e475c',
                langId: 'efcbc1c7-90ea-4bd3-bf55-cba1b0d94b02',
                attachableModel: '2uvivzz7me4nk1hbw4m9th9hcwtghlbwa62t8ai3hti592xzlx05wfk2pksnjyi35knmbg9vk1e',
                attachableId: '1ed8b8c9-5995-4a64-9a23-d34265309f54',
                familyId: '5fedbf4f-7952-48df-ad14-8911205a3daa',
                sort: 753999,
                alt: 'dlt84ox82iw1wvbt9dy3joemp92kchbunp8rg348gzti1ewfvxsugr1m4xxv3o498ydordkd9if2e0gk0nkjotmv5etpsyz1jpizyveqw7wr3r8g4j1eybux40w4hz96cqzp1j3md5lifabkq14oek191s9o7lse5ip7cz3wglkcd133pvkc96e3sz0sbfgf272c8x5pupt396yw9jp3qq6gdvjg2nrlhsb3y63l55rek7ovgk2ob691op27yx5',
                title: 'r0vplwl7evhkf2uwyfm00b4gatu0v26lgnotwd5dw60czhallrjj36ik3ut1gqyv8kiinzwv8f4ew77kiicxjd6l3rq6uv2lymor3zoehdts6rvpnn0rsd3312mau3c43ntopm2tw877ica3qmniu1ei3oyugam23h4tvd1qqkfz8pboc89wnz4xd8f9zy4mwu8cywv8v9xw8bu1umhyccd5u0sp5q6smgwal0q180t119w9nbwio2dlf9s15cz',
                description: 'Expedita nobis consequatur ut voluptatem amet soluta amet ea. Ipsum quo iusto delectus quaerat. Sapiente voluptatem alias quisquam qui voluptatibus rerum. Hic at rem nisi ratione. Autem soluta illo unde explicabo magnam qui. Fugit consequatur et consequuntur voluptatibus eum quisquam.',
                excerpt: 'Enim qui ut ea commodi id mollitia praesentium ex quia. Iste et maxime eveniet ea. Voluptas non vitae quo aliquid deleniti fugit et commodi distinctio.',
                name: 'y5y4mft6pd389e42bx2rczz5zxfnlmfapf6lmaek5dqn8pwd7hocxvgyqcymxw2wgg29bp8xfyb9cl6814mhva7xzsfa6c8nbg4kq9iwws0tek56acxekzv2o4lj98k676d9xzbu5ihy24x6wp96nttwdvlomlkxjjtnue51amh3h6mt5b2jjxhkaxs7bnl5w1bry4i4jmmq91fzhcktbsqsa7pii52erqoo30udqduti04jxonc2pepe8etiqf',
                pathname: 'bayuv9fskoxv3sh5njmqho9nfugucyrpbt36i4290zwir48416ssp1t3fc22kuqlfigebwp9pbv6h0ks3pqjma1dpejxziapibstolz4phfy0evwayfaqfh9uqaebq8vupacmfgtdxwlxklsy00jvulkqavy5e69wx9zvli4dnkdhxwxjzw4xh20ct6z1i347jwfvznzqrt005sukf0cwin1zf508towsgk3d75mme0c2g8ciaz07bmhbypplxrj26xtrs0ak2xhq1msi34xj3xyup5lk6qgxz0sodwhzqi2850alecugsiooqbuvdifeyf647n2i9niqedvnbm2ia00brmu6dxn5j0rzggrh52dknsv7j0mfzanudzlg6s5r3pxbxa7qgrhg8h727gqb7pr7mywns5g9ky4uvq9bq4amps1iyrk0z3qje7n6f7buakf7l611p2j2tstum5tdfp00bki91qbcnhvrbxx2xol7ptnsxxul1nk71bduqkp9xwxy7cca88ovpwo4ps95tv1nbj6bo0wrhfkrapj311oc8v7qo9s7ezh0wiosx2pso1gigxx80ruli84wxwg1wnesqmvo7lhf2r9nsjfk9ccpfjvwuqc3rnvbgaadike56v9bb4f2pd9g5a1t3emql9doqq9qyho5e1e4hbbmriz6x13ewlk86yeqmkpocr6ef7c4qnlae8x4cszb2l8nomf7vmu0bqdhalf18vnvpuo9hnosrzrbpoyfwkczfh9vw2rtwoocegbcww9ofw8ip4sho65qvbxs6dx1uer61ereogqpb55608m8ycar32kqauowjugo82dovtkc6k95errvnf7431frgxyljbzbyjm9v3ez88oktlb5xbflbzu7r321qu7w9a7g7zaa48agitd2poqhd6g8ccj1wu5p2alev57psqj55unatx46ueeft6a4nu4di1mky3m3b73k6533u5juptuqi3krmlgj00ts3mtg50bwhro7e09upsp',
                filename: 'nmkhfcv9zfbzk33sjs6i1vc01wrgruvxhxpu3on6howezs4q8qyol3g3ctr3dwdlvr0301dt58zpnsm5chrkbk6kw22ll31jts1qhs5qi6gazn4ys7qwqkklqvfjjvs3gu1kcos77l8zpa49lxd68ooxqecol47aif32utgcseqr1ub2tjzf2obw5phtl64upmt60rjnhyxz3bpeymmsdvbcyuxofkjvcflpeiyq7qe1ztxpcyna1u38iitg41p',
                url: 'm1yyll9gbsma60e9rwm5f7e33u7g4k77y1rf0glqjiqae42qn4x7tdxpocckibm8v7k3ru1836j8b4exupt0rtqcg2oaidd80grwkyc3n8gpsvhw2ee3wfzq4xh3ty1douic9in22v5aljf4w3cwrl1d6p2r7f217vifvhazsjeeuievzopi26h7ctjmerzlflzmsd13p85t72ewoha7p1ucht9rp9kloll40ua1ktxhjlass75o67kmbjketz4hm074ztnjg6qy5ek2uk4eh7h0gu0mhat23b54hlcebnydx9xws2blgrh4iclymlw97d8hijcvo3wip5ltnlmt2hy75r5bzjahbt1uulz7gh8i5ittwgjezjomxxszluooq3llyyselxdeodo3x396r83pbt9wfq4zmxm4jnd6fzyu0zzt8az62amf0a2fweruc1zomnd8wrtn78qdkdx8q3fjo6tta5w3tj3y9jqrqlo7kx9fm0mo26q2svh26ygc4mykfw7f45s961j44s1pcfd4bmvtfcurhwb0ua85uxkxidxecaw4cfs7sxdlwfd4wrqrk4ao1eh4h1c0u9th1jigr2aswt6n93eoie398w3viy285n2xl6w2qxhncc4tnzdlp12ltszcplj7e4klu75hxd4y1fjqivc79239yue9gsm5go4xsi3waf102y09x7h5bdyjh5icmhf6cvpz5hrmfopkce9x4qk55yp8rvc74g54h74jlbwu2uzpdvont0p7fthpjgai56pkvh2kbicy71az5f74p0o66298fytxih8yfhb4mfhc4ap2kvj0aqg1704jhofeuz3940mumjo0au2i7otdqicou8u754mcc6uel0iz7n43xksd5guzuxre1frd9eoc8d8bcx7nrwhuj1tix80jvrza3lhqosfdv1578nyw11v6ux3e64w0uydh23upeql8cwhz3bdqj2b0l9t416lzzzzmgpdevbfc7ttfbmbgpmef0rcrneq4',
                mime: 'pidjm6uyuttkyi5s93ub2myzl9agqyugo6wvxbk1ghgsi861km',
                extension: 'jixbo6p7s9pjdccly5nybyggel4wetflb3qgg0e18kfkkgozvk',
                size: 9157281392,
                width: 621220,
                height: 311362,
                libraryId: '8d2i7blqei8frm1343xul0uys0jfbn9eno5b9',
                libraryFilename: 'kcd5f5selhrt8df2vxatdajitf0phkeaz5va75qj9qoo655hq1s1blxzes0n8hk2t1qp346fs2c0lws9hl6s2j9n419u2r9zh62rwpjjye7jx8jtosrtaum7cbv3ia413cuqp6jch2pd0cugiic1o9ygd2kgq3xvkz308yuej8jxtjqt12vs8rlyv8zw5op03d7shywro3b3ikh4makuet1p91dgqq6lc8hh7tts5slfx8zdlxksk0ayw1e3gio',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableModel is too large, has a maximum length of 75`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '0f7ee8f1-7644-4da5-b53d-e03cd62405fc',
                commonId: 'fab65033-01c6-4b3d-85f7-7fef092e475c',
                langId: 'efcbc1c7-90ea-4bd3-bf55-cba1b0d94b02',
                attachableModel: 'gamkplsh3hnzg0ooubukmu72ycw70x1okwkhpt1lvfe4k2uesw3ct681uzzqkz4x6g26y0jet6od',
                attachableId: '1ed8b8c9-5995-4a64-9a23-d34265309f54',
                familyId: '5fedbf4f-7952-48df-ad14-8911205a3daa',
                sort: 556942,
                alt: 'v25lrc53ek8d7wiuch1kyzv7uyjj4untr2qz2q2tgeviesbllopkb1vmwx0djyil8idf7kdjz8qsschmk9qolvm0a6p6f6g66rd4k6dmb0yqf6y1iqwfrbkxnfrtxias2xaga2g0xv0o0rtrzagieqxg64rtnpe3lvfnbuetg23eyvf732fi30c1a2n2hi2urdtynkpvc8uf4fso6l19y8w4eh6z6gorxt29flt921l7sk3t69566zyk37xzvod',
                title: '92lxckmbg3b0s02v21bk7gvpyy84vm3i46ibnl8njw0h7kehnqgegof08sl5br8z73ooxkuwtcospnlto0uxc0mynperxqbixysegztfx45z63m92gjrsu2ga5cqoo8stisciepv03ovz44o8jnuop8z5swnjfuajyfw9o2qek0bal4nf21dxr5oec1ll1epg60g7whnjkw8ds9pdgys7akpfbcbw053wauaqgmzzwecl9xnuspord0y76ektcn',
                description: 'Recusandae et consequatur deleniti consequatur. Eligendi dolores rerum ipsam fugiat quae. Atque occaecati tempore blanditiis consequatur incidunt fugit. Accusantium perspiciatis consequatur.',
                excerpt: 'Autem pariatur et quod qui nihil explicabo nisi doloremque ut. Quia maxime iure rem nobis. Dolorum impedit voluptatem velit non.',
                name: '042yh9gkw5ym1k4s2x3w4jxw8xch0334kqf0rjai7w2jnscovp6ud4932o5u15599zuart2n1ngweqzcnztxnsy4lbg3cw7ik0sgljlgr6933d3p60b2lt0i5wbaaizy5ml8mnqzx25inv7zo5sxa16fvbds2x29hkg6koziciw99j5ewyoc1gma26ftbds3btp19vgv2pnmsrdpuojwysl7tz8wy3ms2qool1wddmz0l10b4pjdtm88v537uqv',
                pathname: '7z5433wx2tz6k4bz5a2ek7cejk3y4asuz0d1opjyqtvpso15y9pjjmzvuagll05rnl6l5jtgh14t07fefsnv1jfp82nrkg5gwmjhdrgcdvdi39e1b3t905frlub4wlc4h1f77e5xzfhdl691y5fzxm0o4ypvw1f6wfpkcfnymwi97nvy2hg2yk8bkphnzig91dxf5ztt5u6kblgjr6og6zrarbuqi4skyzn67c9tl35118fys3lj0br1oj8agphtiqtvxqe4kkbjdzbvdeqbyyycdzzrp20h9alfst7v7dbc38bglkqbimfm46lh0ld2blktgo11gd7lz4t3ygze0jzqehi06f3kwz8ircl6cfnz2bhpza0pc1hrbcwa1uzux1ooqrgrmwdmjns1ez7b7woct7vwdxi791k39cro9ptc7jvprc5cf2ykt815uhpgee3pll3vteur2udu8xt2s854v4iasn2tciw0noxmr9bu1jc21ycmbb9c9d96sgqb0ndwcif00tpdhbfjrz1dbgpkhidw547zcszu5448zgvxzpuhicceck13wk1dz635ye9ip7da62d88700g2ooa2o4toj2t38yrqw7xgf4swsjsetuvyihscanltkcq0vmuxf4kiozt2zsqdbo44soolq8vwi8awj34rue4j2hbdza45ret35i1iyf5qvrefi0sl658pwyehxt7yxb33408e315r3n92i9iv9fammtkm8347l1wycrmpw1rzmyigwqzdxj26voj05y5655iqj37tnel32d4u3u7moa6tnuj63ncl7duw7yhy5wzavvs5xwsh8l3g6pcdii1mpssexg1umum63ep0jzexhng32xfl4mjbmo5qrf8zw4z5znu67pj54l40zc9ixm8zdseqqie3tznszskyxdrhk6nnfeyzu8hz1m4xeb7y3yw0ta7d9mh8dtlsy68vrzq2svhper4bxormdaz5px9mggdwryquuqbx2oay33enutfvzqv5tp',
                filename: 'hdn2elvx19lfi1i2w2dgry4bf96iqxgj0vvcr00xpf8o6ak685pl7vuraa6lq67i8e2s8mgw5m3r9x3zwwqigma2kha6v7w4d3o3mpzvmpxonx8lhdpo8ub0fknsyr3gf6e54obw3opuscu71glhowbrg7nfthjr3rj5kp1472a6cf3evrm6amdlm5zcj0gwbobd8n9djic9yw9zk702jpegll4gp6jke6mvgenje9mk4t3o619d6qhsrffmh3z',
                url: 'v5rhfh2belh1w0m09oscgywn47l36mn8i60kow2gc121wvrmrtvd75f4gkeu7a1gzvkw9ibhmbrc1ih38xvv8ex6mo770t2rrvng3jwqzss4xt0s193jqkmkya7xtl0y0lrc6rjp6woc1qdin3vl1pq1igvk58yhehsobcn345i9gufxf3a88vvegdi7lbb4mdc3ooaazafgbiqbbptj4allhz0fn1lmqy5rots8qoytorsps10g7kyzwojplt7m04p4qe46ves51rrv2z0w1jrymlzp5fccibxn3cljvuok8xmk05dsxgglio86fvwgpsg2iyqe1e7txi6697oasobb6pqv157sswv4pctfkge0c7pkpqxxa8hnrmd8lfwy0iifbu486vu8ef0hp7t63g4guiskaigbeb1run409wyd7tdgiowm3ym45hsgz9c4gje2fna00uz4gvrf6483s8gd6j156puodcztaugw4x2kc5xue62zfk14j8oqz4pqbjd0vn5kxc3rb2dc3a7lemkxie1v5a65nx8pmzvet44fp1khnx8demmm1zhh68ujzbyqqjhc6ikbt3e5xrht2lu84m9qcfloj0hc19nl3gwnwslvs0blh55ebfpirtjyslrjnfnkmwd767iefey664o8cauor811t9tmowdk0kk3ch6n80p9e6c2q33qp51cxs8l7pu5jvscxvha5669k19pqc0w0nc43p3udvp5d1zr6x3xp12hna0gho1vv9uiurkov45d41nztn1nc54y1hte2nizxuc16400a7e3xjpritxqkjndqqxp8q66xr4xb9j9f4lo33njf1ae7ogcey1r8fulh8wce301pkloeystkxzkd25n165ufs0znfynwxpqgy9ul7r3q6duyx84p0m1x93225mu71rps6x3xcvf8g59i5vwcukmqrrxywctdg7231iey8rexjyz95dubbnzct4pe4nqj6los6j4g1giqjdeev4i2zxx8qep6oa0',
                mime: 'p7yhfjuub6b7j9cwyu0i3lkxuvbuy6zidiqej82m8uz24pqwn1',
                extension: '4m7h20o27eqwpjn62he5mdrn6k9pwsfuqqmzj31m6zcn202er1',
                size: 3890251807,
                width: 947779,
                height: 846696,
                libraryId: '8e77604d-f2fd-4921-b54a-64b34e773b01',
                libraryFilename: 'r59xqrh986jt0aqy3vd2qwa640dhh40idqb9z6autm9bwhk9mia4wmt25j39dxlz18cuoatmqpgznffiqk0gelhds645pxdxwjvvhacg8drcf8vgj9r1qzwsqpmsmjsbhkerbknqu19was42oam1fy8wrq7jntjl152nkqh6z2e1iusqgwbepsmy0n4gbd7eq13qen8k00t3gmvxylhpmbvy0y6dtr4hyh3wl6o7008cczr425qs02zi1u5djfd',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableModel is too large, has a maximum length of 75');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSort is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '0f7ee8f1-7644-4da5-b53d-e03cd62405fc',
                commonId: 'fab65033-01c6-4b3d-85f7-7fef092e475c',
                langId: 'efcbc1c7-90ea-4bd3-bf55-cba1b0d94b02',
                attachableModel: 'bq56ehxi3vwzenm1ti90do79nwr5epbzid96587f7wjmhgb8gph7lvl9gnt6703cvardlpr1c3k',
                attachableId: '1ed8b8c9-5995-4a64-9a23-d34265309f54',
                familyId: '5fedbf4f-7952-48df-ad14-8911205a3daa',
                sort: 9650542,
                alt: '2w2fk7ejao8h9ei1xptp32fkh2foy24y2k11m35v702uqzi19v5wbjz9xgucexb7rstkq3zzd2340tkdjx2tdywv3dalubb0qclimapvkaedw9c858xfn9m4n3cspekhcdstj8mppc5hc9dzll73qg029l8b52h8o8q1n17rl4oq2i2nw1gyygvp03aulbe8rphcmpbxrdd2jx1gxdejsa4q0ku7e9j1yc66umarc912vpz3nk7j845mn84z0ck',
                title: '2hixogoyq2ck97v1jwe13vywwxqq8tic643y4522vu4ytmjpsx8jkn8ueall3e2zis4ku5d7xt7t4m0owbvz48t0amvs9h8qp5cte4hofo2e7t7zscvmreg1m6xe7ohksy82npvky9ug8wgyi5wwku0fbldlzb91rzkrznabjls21mnh1uaxrcb5fgc90xgwwmzwwidlk5zqvxsmm0u7p6u04iv7qaokxohlpqvi7cyr8h18ycspv8fg100y6of',
                description: 'Optio soluta velit sint non non. Aut iure aut. Illo incidunt rerum et ipsum quas qui itaque. Voluptatum aut iusto dolorum quis est temporibus. Tempora aperiam culpa perspiciatis et. Impedit quam perspiciatis in omnis voluptate quidem doloribus sunt amet.',
                excerpt: 'Error molestiae repellat voluptas itaque eius doloribus. Sed autem incidunt nihil. Corporis libero dignissimos cumque ducimus repellendus dolores eius dolorem est. Illum voluptatem assumenda. Perferendis voluptatum impedit ad ad earum.',
                name: '496xhp5wkrndxhguve3s2vo0g8e7o1lespjagjbl5siityq8tczj77azb58v3tgt39v217mue10jns9ggw7dhptoyqx9wdkbm1lhdwjsqcr1ai4mwxdzqz06xj3slb2kz4a9nh7lxkdf27kr4kpi0m4y3xcsnbx9mpe5ytvzn38p77ly07haiww9q8prl2t6pqwprrl555izl95rpeib9h9nms9fhrn4mzidolytg1ok5a42ylnhgmwdlgzpbji',
                pathname: 'kn52nvjinjbrriuirjlg2wvubamz4vqqwk963papv04duayrcg2mipvepl4k5cna999phlgmqgr642kvp9oa4hgh306wr9s1jlyse2gil3z6mwcsmvtipj71u63cfs304qj5e4foj8v8kxvo6vlfbsytpn41ccl33jsqvis6mojrqy4qimzow1lq8lfaz4bvnvzxask03lvhllgjsjc9fl5pr4uidpl6wtqpwc5orfiicyimo9b4w740ar204hms1uy6u3mu085x6vweskrzwc8g51uibu60zmpy2g9sba365nkjdzyun402wyfywkqzqn2hintbqx2hpowhfvodcojnttos10optzr33s377zazhor9b3gae1gyfscieaz5bxlu6b2hubcz7ypzsyhpfapwrac64is1rwq7dn1zqw7q39zsrgsl7e4cdgvo7c9a4h78jz42nb34e1mhk1zm2omrvy8ddckmpw1r9g0836cl8egqljpvinc4u7trh7gclfctww769p4sgk9lptnbd28y8pb8jeniews14au937fxxh7w7oby3n305aztotjaly0qmru4asl9hyvge9019xk42prbeqm6oj0sgsyglocb2mss6vmxx4pl1b6gamscesssdcxm77rexvin34jrcls0idzqgyl0ujt0vjax0a6l5f36f62znfzzk52ykub2p7x7s3nl94nfeej06n6dwhaktbi3dzcdhogmiea828t25w63p0377ytu16h4kn4smo72gdt56jo84vmuiz4gltp0sb0lo1edvfwbxgdezp89k4ltchfsgh2k98f8e8box4gadking95ke4vu98kusyjlp9k1rthn8x2osfx5ql50d9ubk7nggieegu4hqmnvxihs9uzscyhrkyi53r10tltfbjtu6m4ipxskw35fo9s715ouuab71u6fwrkxvyfpvertfz5a48vj0uo6jjb5xqm9sf3t67qzf4f55cgdu182kirzylpz9v3icu5kb1cc',
                filename: 'fhol32eek0pccafgp1c2bnazhqy32mzrkku730fkqpya1pbgz6wie9jcz8g3ou51g5rz14bcspxeroowa67zdheif4j7u8aiv88t9jlrc5b7nyom5vpjip5ufv3g36glqpqr353xtbuv1r7gru0yfxqb13m44g9mkjdnarlqpafomxii44m55yg50a6lhf4e4evabjd8tsd75eyca6oc3i4e71t9earuivkepbdm0m9c83og2eixlnq6wapqooz',
                url: 'jvqfx7nzdnsz1p06fymrqoq19t0gpcn5nniesxcmjfopkahgjberld8u2zg8gsm1u2nswlblh0h4zv1p5gmlyuym8obbv2c6ulglruk504akm2y3d15y3vkmca2fybfpqijfekb0c9zwgqvi27nyjmgz6xd1xr4d63aypc8thyzpkqs36nntouohrzby54ui77zatphncvvziju7aj50zt44f7g0bo5kqbwfuhct4lfnpuqvd7s1k2wyx4kpwtclyj8p1r7io2160t4pn5jumggtxv7ye90gjxoy7dhkh0qhk4u9kled0ihqi3kz3ne0u3g3ffu6k1lown94zjhf9phg5x55ezeuuw3pzw72a67ud5ye45l2g015hes7mrf9sp07res502kqikkp49m4md8vedpogutw35b1cpae3e8tqytgf2ockxegc9p16ytymqq5lm0xgkdxxgh0su6vccs3phsbz37n83f5gjuo4ikmsq4rrb2ln4tkhp1wq6fwwu3ne29t4kzwz7ec2azj9her1d0ct0ymsylsdhu54kzdckhuidnhxc8ne97lcmfyhi0dcyxfpbgt16phzzf3v54bxdg83k8n4tlp75yqb5mn00s5k0c9hxy7116hhi8sxppp8en5x8splqfhckmpprr00hbxdtuusrohwrri9cox1co8yrsmri8mpoqtwiwici3uw8v2fdwl9kwxcmqaiexdinoqld0gygtyaf7kac27u8tj6ts6vhvc6lw9k2jv4qtjuqm45oqqefx4msfbyymjfxifjgxl8k5u0ncybach4orxo390uiclcwamsypaqlzpla3renjwt62pcs6yd6x59v7wjt9aodczkdlg94nz5axv7abdw33bn1izva7gsi14bspj4kquaylkarx9o8mfo9elo2tezd1yuzh1j6e2a27qphiv2vg9jwcx3sozwy86fa8mk84g3jnla8a87eig8sn6hzerg9l93wieslmwm5ynbp5h6g14xt2s4zhe',
                mime: 'n52fi3omhvqo0a3mr3vv7kjviz1izgylxqsthk0jqfp7x8m95s',
                extension: '6d5hqe4sisq81yld1p4tx2wssk405olx6co8pb64c9reisq79a',
                size: 6166804338,
                width: 819464,
                height: 982620,
                libraryId: '8e77604d-f2fd-4921-b54a-64b34e773b01',
                libraryFilename: 'k66ucidhsoq0kfjvotywkobf1srjzfoeq19ia5qpgn6ftvpfo8b5kjm6pv0s3zmsaug37vrqfh9gudxtph0kkkfxabrsk2so9oduqignvn88fjptwsris3nq90a1chl46mcovt0sha0aiquiszdfm7qwat7xs0o5v83y9khnxh6u6vhqeymhejq57dhb20i5770d510hw8rougruik0x5uwojwrfk428840ij2n8g9245u9gxbz64isoa23z9lj',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentSort is too large, has a maximum length of 6');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAlt is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '0f7ee8f1-7644-4da5-b53d-e03cd62405fc',
                commonId: 'fab65033-01c6-4b3d-85f7-7fef092e475c',
                langId: 'efcbc1c7-90ea-4bd3-bf55-cba1b0d94b02',
                attachableModel: '4i0sn8peod2cfsthlfrhjr5pjcvi4thobve3kjivla24cfbscwp1cn509ziqw7382ln263x166h',
                attachableId: '1ed8b8c9-5995-4a64-9a23-d34265309f54',
                familyId: '5fedbf4f-7952-48df-ad14-8911205a3daa',
                sort: 830185,
                alt: '88p8nzmryx8bfnq9gdds5o7cgwkyyxh44ctz688uancf9r9465o66tjr5nmlxwaltm7xxk9to90dqba32i99hbtrvpo1age9qpapd1ogwxcvcg1ywg6xiw9aiuzifht7ukgoxsvq2drh3euf1qvbv0hgjinxweo0p3yrrxy77swsras6bko3ls3xklcapv381o36wj1l1jxf0itob5mon7hljpv7ucqeipj16s3n1myfakf6979h9309z5ww0e2v',
                title: 'ein1dn4668zy7bwbt5ce0b7lrq2tow8xphnrpa55z4010nhe1oxn9bh7zigyyrybuh1zd43y2l31h98t8lw850yve6ydbh2xh19bz308wnhecbow1bdg32z3qlgrcj62195au3aq8k06l30tibyrdg2nda14p2rcvj4dtu6om3ccrb63h6njv90roomuq3px1arh9k7rqg77xa3io8x7dllkyxcnpz6h4cvlsl0regl5u5f2zc1707a733j2vvq',
                description: 'Laborum porro ut ad aspernatur rerum. Explicabo quia in ad. Autem quis blanditiis nihil.',
                excerpt: 'Repudiandae ut earum dolores non pariatur dolorem. Sit magni est voluptatem quibusdam quaerat iste. Dolorum dolor fugiat optio quod voluptatibus culpa.',
                name: '2p8l80aipl9x29dzy824lysyda7sy2atpk9d3nsb3dqpgfcqaulhmkgmjmwy328ra2eptubiu3rbedal5uble517jr17965btkqp8hsdbiw7olheynka77n9cw4gzwphj6p5y9x3wjzcj5he01nyijvj2k6uq4tptnkejz3b77gw8y4j3df9kh9vvq358j96uy9lyf8zg1m6quvdff51pnagtp6kbw2hdhh4p5d6s6mz9r5wkks8ywhkvuoio77',
                pathname: 'rjdjn7gt4dtel320kdplcfy7pg9mn7q78pg20zpht7d7r1uyptxmhxc9jjhxtazh45729le9w9ewyxis3wfu5xzawk7tjmhn5caffaggxyi30yp92vw1zds589l6p4gs84wbxxlsqoq7raul59e1ji9e6340t67i03nif0333yx8bev6a221ebtqbp18rawlq5m0u5bblxhbvutpe1rk9v1lowo1nce8xbiegmcbqumiyfq7nr54a1ubbebh8yr0uwxzcl1vphqy5rboyoln0zu8nadi4pelrhn5e786syezpbhua53tizboz608ynxdvzhwmygek5kgi8yzlsd8xfk7gqcvon9ycm9v3xyrogwy942io3xopfngxc4sqzyvcfswi48wp51e6jzubbch1nk5wyokqjyeyedsbmqx0et6hb6rvtyr00yp3iv4x0s0wvgyhj3teocijx48ugbwm8mk8vjqjjvuayn7kxx3ot4wqki8zedtqylo795q6cfacefnyel6osvl6bj9a5s8tmb4dm1stwyzt9sqj628h3h59s9jnvb1djsuyozehg6xw1046w54r8iypp5hcz39obe8p5kzg9wxge21lvq549g2t6y1e8iwfd2qcpga3d4kc1brle0jvnqpd6gda6bski641qo4pq6v0pzsqxeccowue61bspufyhcckze32du7pz6vr1fbjvz1k2zlye24cvgped5665j77wlnbxrcfrlhm2wae9j1z7ey19957zg0h6t9uwyx1dwln5ymji179e24jcp21umyf48a9myo3ekw96s49rojrq6p459nb970yy0u0a6deihyjpsh75jwcikh2oafpt54rc11pjpyvocdhu6iz3eqqzuagvu2inhsimjsgju9cl4ty3d377n0o5lwpobtkjyu0g09s4m9hvgmuz24mqwcwmow4gvtr3febas19l0t0gipyoow8vejkz1l97lx36wjspnsrwdpadywzldwc0lkwro9u92rhjfn',
                filename: '64bmgnhgshou6w9ei0br3abbspui0fb2brnv6wkaxhxv9c6uh23gk8pt0tskf8p485it9uw34vuxscubobs0ap8gb9lv7g8hp5i4j46snniesupqhgfbn01ipqt4roavm33rh21f8gqf2nkqqt3a56s7d5btsjksc08k7n5412dwxosnqkvyxedsqmhvb15m4k5g5fkkm9u8mjeqvup0j0x1vr512066k0uw5aj9h2patg7kkzisg61tvi2vmbc',
                url: 'sd5oxqsredjsav9xgdi64cyn0p77wwrvtqv3iclta6ld01s1wz3wa1qo223b3miaor30pvv8w4h40jcoxqrhn4xi1dfrykyx4797j6fbbiwwdmqn1g1n1vj1pc6h4qedzwn3f7ftvh64lltqo0ryjhp8hb0lqs4iwj3dyse0qi84fce07up6njee5gxbaat1hnffz7st8wppwu9sxkwd8iehhd914ssnhk36revwgxg9v6vuvp7i1d00igjz8h6qkslt5bdz4aowfgnhtbs2f9523ex70ygvxbun6zgjtacfdeen4tu3yixz1j870nz3x2qrfie36syivl55o83bztq78vvc6atyeegwsiyi4hvuvwn3lpkio4qtbvtwmura5eht1dxewe4vpid8n7vu6usiqd55zdk9yrgjhnu4w0qvnj4bv7ntu33qlw0rdd0897yxkmfkb91cnafvbksra1wd5binfgytwipyiljqn1hfl6w9kzrn71gxdl4q0vk7ze4k821d1unt02l0aavn3itn71fe6t22us9wtpbidc2rcmdo161x5bdwyqja40d0hza7dl82ftwkljlvdcujfz9q6pimr91g34rdohj7lfiugrcdcxg16rxkza9se90pzo6x4bf1w2hczi2m3p7s5xqnulao4xvsqfnuebrd8gw1jxa7av3q2iu3oe98gp1nmh65s7acid4ffs7arjx58d9jn36n88s4te2etr1h6bpx1e2ini7u5bsy2e9whb6qvi57t7foks1dyypfv91hf51kzeohph2ueyybtvd9y93netp7duz258mtblprqkkva35aobxcth94gl9g14dvtvq2bb6pa7aps4g3xsmlel6hififabgpx5aufx2ush6zlpkldeaux6njba30t6z8qooyp7gmiyllsuqdtedbtlq367lrdedg2kpzh0rh5xpgpr2h6gmdrf15kgsmxrz880up7km1mddm3jf3jq1x87h6sbhv4u1z5aj8ba0kfvoo',
                mime: 'iimwop4qr13uz3mfjbz5gt0jdynus3vutfv5dxkx9iadb8a6a4',
                extension: 'n10019pwbnd9lx6hpudj3m20g6xaiy33067jqt6cyh1sjffrba',
                size: 8800902271,
                width: 254689,
                height: 431490,
                libraryId: '8e77604d-f2fd-4921-b54a-64b34e773b01',
                libraryFilename: 'oz3wg62l7vr4yi7o3qvdj6i8id9a735nh3yp3h73i5aa1ym6nq5ash440ucntc2jygmqpmz8gozo2r11q8627fe4882xizj5gp3gnjxily55cstla7c86tee4b15k0g0z0qg3xh0sseiza324qfmcm6de49ay1vliiofyz29mnpoxftjc98li9h7pdvdedhc5n0581qsa38n7uvto5yb2fm893xcfamzcxu2dmvkhu24pxo33rx7k8f52tia7lm',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAlt is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentTitle is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '0f7ee8f1-7644-4da5-b53d-e03cd62405fc',
                commonId: 'fab65033-01c6-4b3d-85f7-7fef092e475c',
                langId: 'efcbc1c7-90ea-4bd3-bf55-cba1b0d94b02',
                attachableModel: 'xctob59ryf8eq54fhrgbqa65l3vukbmz719zihrqv8i5y5gmm9vy9cum66maqxa4gzowk9lrcqn',
                attachableId: '1ed8b8c9-5995-4a64-9a23-d34265309f54',
                familyId: '5fedbf4f-7952-48df-ad14-8911205a3daa',
                sort: 331064,
                alt: 'nx189kzsyitraq8vkejjl3ps4bhgqqq98noojknbp82f8ary5yh964249i8mllth1fos48w5balqoh3ibsm7wrsc5fgq458ydkbujh1stqyuzr1yuhx0tcrgppxzq2hmnpeatvgqcgzv28gse9rys9ma7rfnwxcxijog2mhj196ijo829sfyp9dccm4nmkyfy8q2y44tfljl328is6g4i0v74j77bqjh3f0v9py5q3ku8t7xyrjyov0g1dar41e',
                title: '0ubbxz41dgg7v4f4yyz1xfk1j050jm1c3btr0pgdpihhzeojba33hanf7szj8vgbd50y7owicqxtqmza1escf7w4z0bof29oewjjuputh4vp0vegb7yf5brpdvpi5y4otljo6nqm14way99347ag2stkrd6k76conx8pfxff83wbxog4puan0mlk4g2ncphklllt8kk4k6dydigw13ucwl7szpg3cprc3hwgwkrsvqatngmg0g421pzzew6m2wvf',
                description: 'Vel officia voluptatem quasi. Ipsam a sit. Amet aperiam error. Nihil tenetur non a consequuntur. Quo sit voluptas incidunt et illum dolorem.',
                excerpt: 'Repellat aut quia natus. Itaque fuga perferendis. Consectetur mollitia voluptas et aliquid vel aut atque.',
                name: '0j5udbuhdnr0cv4tihcsq0el57vwkvkd1l4qj5ekdpjoqyudilesehwqq3l05d917wi46k1efja2nn04rw3hsss6p2lllhiefrwe0qpzj3m8iu6n6x4tgkt6biwqaumm40cpd31nsjpnt1m5vbwpwbztub7670qfl7xfmgrcw0i9s92j7cofrhv59q14dohmqhpvezheha9lztoojjfnv11ws68i9uyz39cfid5rzf4a8ftkw0vtypfcj2t85om',
                pathname: 'dk55sre7k66fi0sg1pbvxmumm1h4qdqw868zx3lzcrwwzgep0mdlzb884wx03661xj47p9cefu0ewrxts2wjbltmtb69p4qbhsbiaecsar23c5zq81izzjv9bx80nqehlla7nxxrbvdzifln9q6hmzw0ntdkp4hjvci47lzyf9lpnhake24tfngq7kbxos8i8lcfyx422fee60of6bx3jee9d5rczgvryjubulkqh2zaanfx8p3lfo0ht7pox79supdv3hnbfqrglyctnl5sce1bielzplqbchppkw65c4xe1dve5q5afbz9dpw1676bmpzl3jdrd8afawwa8eva7g0hdcahbqvv4c9tvdymuq1e2eiyvw3bs16wj0togiobo28fqubbwsrwe0wgwjo029y2s5b34i43fcs6wu1r9h556dypeq0kynovdblabbgbmssqvkwbzzjeb6ywp9zkq3me164v6cghsny0skmv18konfwtunv7c8m7osg4qdiuf7uenl7ln8zq5j3twii73n1229vzvmsupyunlebbom7t6vc3d6s6ejl2jqu8wdezx6m5rwgnu6y27tzwb1dt35sympkmpmk9psy0ul7mzujz49yh5gwvj5f1mgllog0ev2pzlmmwcl8mtw9xb7y0948ux0oxz85ysynkf1pg1j23gpq2govgfj01fqbl4hczyvmhllpi41b1pd84tmddnilnbuwi0dqbjt75dupfyl98ev0szvatazd3qspnium4jbmstv94g22xnguzvhx24c8dxq5vlg9e8dwmwpq0htwify1szuymm9veoa9gr2aqu3nsny04kdvfiwcb6j0cwrrzk3acnv1uzdwyvnc9qy4sutvbqtgv8z84onifi8r3ql3eqz8r14zpgf6v0x9b2c9geob42z760bh8axwpn809bwyminxzxuafbkbcme6d0bkx531aarfd4abk5xjar74bvrfauusjrlbhms0nrg9jk2xjm39davpsk2gdmsuw',
                filename: 'kz84cntameypp0jy4wzl2bnf6b5iknuhcbbqqlp8fbcc2to41hwlpb3l1q12selw3hte593yq2o07xhfdeta8nejpkbbuo4fn1lubdaordeo55m1u60oli9ph1x17wjjg8l5pqolrqjwugfah63ldn0tbb4tn58wdm0rgvazuierr733gkipp8jjy0vf07dd3u8z8n2iptl91uin0s8fil0995bzz6q8t4b7fp5d3oaxzfajgre8ja6x4x04pi2',
                url: '6v650v1kfgso5zy1ttzfcbo1zmf9owyse8rof3dnheatndpigj7dvz5wdszo3n7dakxsocskn1au5cvfjxqy5fljpoub0s5lfxl0duog64z24cx8lfteww78866ovz9j0ygieravrvyuhwawxttpt59yeqj2t6pj3yvo0tj59gjkoqzmn7c7ijtryc4akexqanwifwrxdubxicd46hbjc5qrx4ix4nbc86n94bswtqwg6b9s5ah7u5ghwnrt0hwz3qtm33kt8nbvlt2p108l8m9tdrjey5pespr83vnpkc5vnfwor2ufo7u2wqb0fppx6wsoi2z0r853mun58awfvedetyphecvt8mga9dsagrwtc8swjd4ily5fqqp0xtv5f6huixm8p888ayd4h9rucrxc11e3v28vnfn99f2nyhhqxel5w8tihow34b8aukjiu1mp2lbfe3qjvt0pd9913arykjvc2in85l80x5w8ow8ib6mqldu6d210iqblrms79d1zmm5guxwj4mo0lucm0n0i9blv8msbltwcdrc13bke3cv3xd2wtgnlgd8wwieg7bu82twmfe8twgrew6mzlj0pouttwg4ide3snbta9awn9451hymm6qpb2n2epi5t6nxsp3z96ws4x2hbadrzczc3and01hu55s9w5fpsj15qnihw4op989cquri7if4t1676mmog4dfyyzu0xh86etf2nez2oqabqipj9uka1xpu3ap2c9mr6sp7d2xh1fpw7h4o5bkfqolrjscf95rxdwcascul6ynm673emwcm8j3v4o8p61flxoeqiex6ted2xdm2tjtp0a6fsgzd2t51qrnhpizv7nhha8kwewp0fbbifkgm2os4zyrl1tozftmazvxifplnwzxikuy51pz09lbj1lre0ju3mqrkm0ax5xp65smm5ebk4ofx90z2i5dhmffp0lkqe5yu94b429el98pv2qu1blshx785fkcqsy8h3zuy5npd6xqungyplaox',
                mime: 'fshv2z9bt69bakuaz22mrc0l7rpa4nyepj0ya14ghpxhrl7szz',
                extension: 'pulvg560erafstx7hcyqxc6snmi7l3tdqdgvftee6t431hipg4',
                size: 9262790514,
                width: 884840,
                height: 376490,
                libraryId: '8e77604d-f2fd-4921-b54a-64b34e773b01',
                libraryFilename: 'bgthztjvfz8pi09q55uj1pdhx8ftl0c41bt0gjsbiflcfhszj95q5u34jlba79ayx75eco7rhbq31pyuvfe9qb7f55g9ltq5p60vgwmw16939gpprlp87ht8tqlhd0uawjevfzffh8s8un05l16uehrybu12rbs4r71hy34u1gcixpoe2cwbq8luo3uioydqabpnufh08g3g2iodbdpwoebx33ybaikkp3d44o43a1rn6f8ywjnimkyz65os8gl',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentTitle is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '0f7ee8f1-7644-4da5-b53d-e03cd62405fc',
                commonId: 'fab65033-01c6-4b3d-85f7-7fef092e475c',
                langId: 'efcbc1c7-90ea-4bd3-bf55-cba1b0d94b02',
                attachableModel: 'rs40tb40ujeutz0yzgn55dotk4iosgv3sfkpqurjjze0od4kgjp3agfwez8406qvb0ghjxosb6g',
                attachableId: '1ed8b8c9-5995-4a64-9a23-d34265309f54',
                familyId: '5fedbf4f-7952-48df-ad14-8911205a3daa',
                sort: 513056,
                alt: 'kta4ljl7v9c6ytv3uqpxpz1i269lrkeo9mr0tjmocoi0d6szesjetdxkd03r7o10l6z1sfywsm85qkiayl8wkgu02t2jr6ceszzkss1ckwoelbagfyetei7erlbj6xf6ew5h0oz6e3czbz0ygukrbcr7lct1qiv3imu2gz34uan6ubay6pwnjizlhuo2n6da5wap9vzmu4r6of2gqutj4fbv4exs36onoygcq3z8gbkhxo3sdzkvt2cy2miq5g1',
                title: '3wo6o2tkzw0fjjjd45c8bwumnd5zo6r6nld9hdw4u3vjgzxvjflco5uome4lo4ywx7ajstbcgejyht7drp3xf21mc02gfmq1u2iql62b8wa7yda536paqx2ffn0sqv5hj52neeigsu6st6logqy302zkhi2x6sudxgeacnkzni62hegwa3pyhgy5mow3y6at3kvasl3eh13hvwprhssq1xr4strhyca23r36pxsudavtdjn973qlcl5v80o2c3b',
                description: 'Blanditiis ducimus quae enim consequatur qui. Beatae quia dolorum dolor. Libero pariatur ratione asperiores voluptatum praesentium magni quod. Sed minus sit ratione laudantium temporibus. Pariatur illum magni ipsa quia dolores qui.',
                excerpt: 'Ipsum culpa occaecati nihil eos ipsam fugit quas ut hic. Officia ut rerum pariatur temporibus quibusdam iure. Earum qui minima explicabo. Voluptatibus asperiores nulla vel voluptas. Iste in veritatis qui ut magnam.',
                name: 'gecvt80962u7spw5ztjwhlkdcj4aek0ub4opxr1p7or7h1whm9qgacmnzw5pk8rj5c1vbq858rhr1nd5ta8lf5q32i5kpy5x1anmujdghcy5lv7yk8vwgpv1vzg2l1tejrtshe3hyfikz67lzgiwe9uf3ygdq1waftdf1rukn926inv4xo7shoo9gtz8tv25mx8eg53ghz3pwmahja6nm21lnfu6of3pxtmqo6exkbq2s480pyvgavl6m0mgdg4w',
                pathname: '7pil4cmxapf4i9stiy8j9jxhavouzn2wc44kaikxg0uuhlng75oy60tei3cs8q3u6996m5cwl2xlogw08h2ir99x1i5bu4m5csde2lypnyz26jqfr143lvfp06o81yb0cbyjlh0sjlo74awi3vjtl9u6r0b0bwan0tnqe91c62vppkibg0tx2a7x666v6p5gjxxyavmrh1e2wtnctj3ep3ud7oyab9m30o46vevmdtzcmdmzou061lifadj6p5errtlxvzcrviu1hnv1m6b2tm41cuxt0f4xe7eyi7r4oox7hwht2hbtc4y3aupii765ietd9u22qga3h64nebo7gx2rmj796ogzbwp3s4hrycussn1yfu2k1eu3dqb61nydqysxfeviv4jjw3q54i0keb69jev64g51x52e4xnwb7eu9ze6tei2hv4d9n22a3m86c788ul03cfevmndr7fir4xgahbypg1e8kqt84fa7c68j9590lyti0uqs7a7ym7e50gpmt3n9a150dtkrmwtzo15bklpvb0c0peno287fu7fy9i2uvwdxcprvc6hekncn2dcn8ffy3l2o5hmxsm5pkki2ucr2c5y6bgw7dc27th1v0jorfdpy1y7h250iwsyaqbbex7g4kgky449cmzxij4pcvtzxpov0ob7toizq5cvk3vf8d9iyvc50zf6dy9g7k9i06iz97s2p8w8xlupek18izz6zjftlh7ppd3ssa8k126ytlom0454u17argv0fweez7glg4ma5u4tikequ03dk0npn7nj7vjkfz9w0phje1kq8ohrfhq1i67jkop3i472v8zcstpm5gbkl7lprql09al3gl3qtm86omi1j7713t4fichr1l6wn41uhsnsr83slo9o2dd84dxkjwimgep3hingmib6gd4rs9fg461j087pp5pnrlowuaq7y3iq5ziwvfs3w44h6m7940yfmy4f8b6djxnutl4jwjzmnr03mf73ee9all423dnvfha1',
                filename: 'rzszfj530nrhzb9a9e1mczfxvy2m5ffqpvdyxl8qh002wsscw0yesurtx8y3pq1ahxbyg7fryfay9fvwgiwu6b6e92dze5wh840jgr890wnordps7umpaxm0665cmt7ehykv8vk0ejgisl98ennagy0ibapgbs7aq2ssyb6sd2ae24wfhjfip8nin2je4eixc3mjdgpwou5j5pqgg8rcx7kjy7iqr53aw0vckbf73u9gdzqw0uhfi84vbl8l0nd',
                url: 'lhik7inr98l7eqsr7iyis1pmmta90l5qqqvbqol80d2m620qybuw52s4dx1i4bm3e8z9t5op9xb5zqpgqptn76teawv93hjbaupylv2t4fhkyhnnpdzd5a4fd9j90tvywnoc3musddb6ghmme6qfa0czkvjxmsx7n5a3no72x2ef437hq1b4m6pyd7nj3pid2hb0o1bawmtsy83o0n2et82z6bja2s11kt02e7fv4rltf5dyka4b1z2a9v2yx0yxya707ggh7h5vek7cw8rgp832fmc4j13e9sgiu7l116qm7c9vcwdl39mar7cj6rpxx16xv0l4yauzrjgnurhpfkspkfjt4t9ft7dxm8u31ktcxpgiro0tsowbj3wrzn9m9dvj3k2s6fpwboayos2u3me1b80g6oncylsbw8vgapp4qo82707oro5pbgqv5mnhkctlxqwb64ay4knhaj7l5jbshaces2pe922nq3mhhplxm991ij44ncsantqwzgxgug28p9umjt3gri7hxgdhpnl70romjegb9whtr94qn37owmcb9f66uh4kwqff8q955medkcz6a2ikhp3q3pxzc2hjurkc3vpprk4le41yklhwmytdblqa7x2dcmutbixrybyyky2ir476ehw6vakpq8jmcax0awb6a62cufhuo2x2ls3t9fxt78vrbyijmg4ycwdf49zqgid1dspow7kb5zyxzw3skoxm3ghi5awvs6r14phvbe62sxd4woq6r5o2rodqrsbfyzo24o2oo3w4znob1xyv6mame6opwkvlw1lwqbk5yorv8x2qhscl5qid3r1d6kwcak8vs62e404zx19qt6lfh2dg032vzyhs1ufn1ojjfo1m2fe535pe9mrqg7e5fp9wwnvp4d5zxsosx1cn7bxst6mbckd8m5xmi4nkt54kxorg7gm6cpq3t2socpzyunxxkcquifava0gzjv9fendydt995cb7ugwsy4gf0h5kp977k70kh2b2qgnp',
                mime: 'o1lkbflmqavm0xu30b4edusac4nfnmz8dkr06sxdarxlh0p824',
                extension: 'b8qow28suiyhy2fy3q4ayg7x4pt5k0cir7o3e8rw76q5fslolv',
                size: 9598645840,
                width: 984572,
                height: 301502,
                libraryId: '8e77604d-f2fd-4921-b54a-64b34e773b01',
                libraryFilename: '8isvdotcru9wzc05rpb5emlw3s5pkp0i8uowzqdb0idjp5my3ofonfifn86ouso5a5qiukht19coxd7h1gvp6ixr0ain5ginv4inun7pqgzma1hbghthye2ytemoxoofozlw8cu75jb036ahjfylgxf8trs0h0h2ajfpbhrjw6bkkxd5oxi7yrha2y99ddrvkht6acly18t85x7fuhylqzqydi4hd1vqu5mfpn70y8edn24lmljqm2wr1c6i951',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentPathname is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '0f7ee8f1-7644-4da5-b53d-e03cd62405fc',
                commonId: 'fab65033-01c6-4b3d-85f7-7fef092e475c',
                langId: 'efcbc1c7-90ea-4bd3-bf55-cba1b0d94b02',
                attachableModel: 'p5i65ihhrlx6d1jis5enb8ukkf5vtao69fzj6iypd4c4ctaamvnkcr0vz4os6aym5oqhd669bsx',
                attachableId: '1ed8b8c9-5995-4a64-9a23-d34265309f54',
                familyId: '5fedbf4f-7952-48df-ad14-8911205a3daa',
                sort: 291574,
                alt: 'gxrkg4371i7x1mvwt2wb6jhrrcvtcywz7tfhvdn5pdijyzsp8ti409w5wp5d8b2pl694j60n9y35a2eq6n5s6i3sbb23cmc5m9budp9i72a8k0ur686it82g68a4nwpc1uha8c3bbvlwrdl69eq4p6s7ytwvzwmmt6y0wj4sqj702cd2ep5mtuo4aydfrbxs06632a7atzsuplqy6x1e81jqqw97a30p4o4wuofksgvgoji04tzvlzeicox11wm',
                title: 'sp6r79ccd24phqlrm854a3b5yu6rv5wnuyzpbc2xxmsptccelq4uvsunpltqcdlgbca6zlaqkforzlbgbvsi4xl3ajzk9pz40dn02lfemkkf3dgt30r2rz6c3loblggh44zezrbh0q1g7iz38nxxg197fewkooye3y0p74ymofh7qclfdhdknbdzmu0g1018gf7kxigmie1za27rh9xsq1ulpwe7w1r2ejcbne5jea9bch4setxdsypmbmu9039',
                description: 'Perferendis magni veritatis. Quia possimus eum id similique odio sed. Quam eius quibusdam.',
                excerpt: 'Autem quia itaque nihil consectetur ea. Nisi praesentium veritatis id distinctio tempora. Id vero quia omnis consectetur. Eos qui ut voluptate id.',
                name: '7rgouydgvjwwsgrgpon4y2fmwucyk26xstwese2z7oxt490mmabyu324romi1cy64hg5t4ksi86jhr2ryql95gukcozclwtjrucxbcmd6m1pvl68spkp0xri6vnrs4m9cg5wcyvqrvwrnge1evnxwirppeo88vfjpj935o45i2zesdq1gxes2extswml0hdhd94uwlpfsprzkwpub0n44q849crh5b9chgd5nfn4u1prt2eij1j074fzzmbl43w',
                pathname: 'cqxs4dobjm3462nv2dye1t7viqr4qd8ojp2ezpnjo02k1o6zw2dkwecm0q3hlwisa9pw61ii9j3ouh1m1nuqpp3ngqzjmxp67yj5ygm6nu0m24t2upzsakqsya8teroz2nhfdn2b5gzjjrf2b0upyjy3arizfmi6mj2ve1uyx0rpru6ov4kyprir6rw5v2h1o1eo5dfylxf9c6lnzkrd8pu90wydkg1ob0u5k3r9aax6j5dq9unrm65wwthdnbb9otfd1d1sy612zd7t0725l10mqmxw6bj3091vsgks428dgwa9nn57k1pg5hpc7mzn42caic19h0gdazprtazafy7nmmz1dp6fyblzv0ns7smohadel0ue0ri4pjpbab0vha3bxbqisg50zmv00rvdgf9wmsezgi7zudlh7vvot8vxhakn12l5pvcwk20b32rkw9lld3pfpbq8f1yww4y1b99tl4n20jborsb8tmcdwceollau4205qrhi27e2mi7xzoha95d2lrc3sczjyo63fzx4lh3iizc6zb2a69ygxtjobfbcfs8jpofvh4ibqsgdse2ceap1pkowwiyg8b8r2zaqha2jfc8wkt31o5d943cbwq638jke24phwxf171wri8pvcjpn0ah84ii9bsi7toh24hicjo3pyng8et0oc8dcddeg2fny64qlyoxx1djd2lk1wv7umht8d6a7uxotin0tj8xkjczuqgkexz3yn0e2mmqma89rxdyt10h9jvjoaywmylwgkuvucnsb6rsr40mckaemiddr9a2augcpcz2havcl03d3ayd1ntei242bisqi7834b3gq4pnpyao4ksy5vtzqes8c430mwsuw8ccod99tbxxgab6tascme8lugj4sk62wjawzxjszqsili955qxdzg8tbagd5qiam4uyizd5wa31ios0o8b9v8ksbmhqchi9de6x3r4ihl593roompwqye8k7xgwfcgnoug2u8eo8clqxofnqfxnbj2389',
                filename: 'zvijogwvvjlixarwms25yvsr95mpmh0n1exqb8tp5vpzzm64js3ujxpe8ges3lenl5dtj9phwi9mhyjl16ui0ixikvd4png9rhhajy8vzod8moeo4bj3oqiych3lasz7ypx55nzgu1qxq9a33n4lf4e57i54n2gbyzckgwgo2z0vnai281vp3wa7lm9d1kn259i564c51fv1ev0e0w52hrt45otjeeezbucq4x1abzmre2pbgn6q5jwpjo39xh2',
                url: 'tejwm7z0yrclcbzhvtpqeejifniwjzr5iy31cn66i5lpoeaojxtc0n13hf2qhfe3rwtilggncavwnfdcq6g3pbmeoxx9b51rlja5ujmxu5ze2th5dvawmgsy8yamaiad3qbwn9ai7qprbdl6fofhy99ivk6m0r36ctjosklpjzd4hvbxd6hiws691zfqwgjrsw9dj8bn6mwaf2copm0odtvjyxve9gydk8fis70fg8s4zumu21h4f7inwf8uk8doky2duojp3om3cdjysspdv0siqn9ftli6kvty0qcqj5jftguimyjkz9uhsev56umio1ma0c6iw9mj9r6ki4r7i0lwggvv8esdqf0a0h9i92vakpnrsshr6at2xvkazohwbcjc2peqy2q5k9dn98xyrn3oexd91jiiuzim2n20cj8d5yt6lgl6pxderviy9p47ej6bf8o9ro936ccoohuectbrqy35vfhba5pkxoouiwjoxknrn4bm8ckx6dfcnpmlkdsqlld2q3e9h30rskgexmsjgk4e001otg5dihxvaxfdpuslgxhc0eo4im85eojt08w13nye43tk7tkv0ozildatva5q89r6mfaf9oxlag1kduzutrslaki7lim3gkuopyipm4nzjbh80p2cga1i6wx38xpzy94o52b1p54niea6hgzb0kpxt07ynr0cvl765didhkavciab6vlq4yluox2iff46wjcnnvsqn4ansxihf7qx14owyc82y7sliiaoaz96g271gbak6or33uug9ie560jhho076fsg5yat7tyvleqsbep756dv3buh93eyvihbi6bhbb487nolwahql0y5wy5sgmfm2vewd3rah7ha7183z8eub3skwg2a14fxpk8dsccdloxqod8fz428715f76hwavwd3dinodhvwh6bb77ckyaihe385n8obkjtsz4jqce4gcb0w0s1pe5pv8mevq6vlidyttrjxp87rdsg3ruvsv1du11h8o75n5vk',
                mime: 'olr2k1gyrqslk1o9hd52nkdva2bz8gwz018z3qqj3clfwixh16',
                extension: '1mu286zk1qz029h9vdn7bs0ay4xkax4idhegf9dfhifiltmhtq',
                size: 3607397130,
                width: 237491,
                height: 209723,
                libraryId: '8e77604d-f2fd-4921-b54a-64b34e773b01',
                libraryFilename: 'srfs4ppsfnbpptopucwv5kw4aeljlav70xntb6qgju2eklwtan6pfxu7o2d3hpxqqlz5m7uai16o9vdhnerqrt99ismo13hrl5ccps3rwnl3vp0cnhcu7zi9r0bucg2ahbnxhzd1wcm3cfq8pwlexy86ldhnhb6i3brnm76x5bpt1ud70ih6eyq7vcg00t9yb5sirnu2ewwf2uhuc9x5q01ozicfp722ij463917fdp6b4mti4qo9utnqiu2k2g',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentPathname is too large, has a maximum length of 1024');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentFilename is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '0f7ee8f1-7644-4da5-b53d-e03cd62405fc',
                commonId: 'fab65033-01c6-4b3d-85f7-7fef092e475c',
                langId: 'efcbc1c7-90ea-4bd3-bf55-cba1b0d94b02',
                attachableModel: '1klcfueshjnm9ocghikz9866dqb1k1tmaij1pxgavdb9ba15krvwt28zfo2rb28piwkc657586o',
                attachableId: '1ed8b8c9-5995-4a64-9a23-d34265309f54',
                familyId: '5fedbf4f-7952-48df-ad14-8911205a3daa',
                sort: 830785,
                alt: '275q81g5kav36dfggahe1z66onnnsj7tzjy5ffwa5zwcpyts2sbiwxfq5xvbvvvll8123z970sz6edy7u92cv53b36tprc5wjpbpswh9fwyw45l1jioz4fq0mni7fony8ku84sj9wug7yubel3st7mwhy1zo98kw81kn9ypkplvz5kmfgwprh6oq3rgpduojtuzge5owr6yovicz6yjshwgh20r2h1mj9pz2onkfjzgtm1cfqiarr5jbwnmvala',
                title: 'rl4m8c6gobjfam69te83kfme28mmuventwq5b582kcnwe9lb9egctk7hpz8h4j454v42sj5bnv3ouzdqif8k7geur3u45jyexp2q971j156y421y9uqd2l2ipvete8veecy1rnup87xgnrvohjewc9y64prp85cxxum5445orrd69wg1qm4pt4xafu71st6ywwumrj5vd1fsa1ktrkshne52mlo96uworqhagxxxpeh1pa5ywzg9b5uoq6b000f',
                description: 'Laboriosam ut harum dignissimos aperiam et est in illum modi. Eos dicta voluptatum praesentium ducimus ullam id modi. Ut est quia minus voluptas et dolorum et. Eum laboriosam error aut aspernatur et aspernatur.',
                excerpt: 'Consequatur rerum commodi. Culpa ipsum vel dolor porro nemo aut cumque officia. Sed recusandae quia sunt dolorem eligendi ut culpa. Sequi provident est aut iusto beatae. Pariatur et at consequatur ad est pariatur ducimus tenetur iure. Qui voluptatem optio.',
                name: '47xz0tmyd98j5dgv7f6voexxdyzi02btikjag4shlsfmyu073cvj3avc3h90wn3jkcqu7w45id2420u3pmgjg33u2tdu5u40j1tr2g8wtyrgvovd6256vrlydqolohcwsyq4ev5mtmxc8zm6is3sq5wdp9szpf7efv6ktlbvhjavcblu83xf4wxtfq2ors7oqoakkc6wi4u1dn4dd007yzgkr84ha9wlgmovenpepwp0t0p8j065jv3p6fa2qpd',
                pathname: 'ue61a8erjgmwch5lld1to2y1sxsw9txp433x2i263vzgaraid1c8ez3vmaptvu7apusiwc6qz7m9u3ml8xopaedb2mszh8iywe4yd43ftb4np4v3ayuobmkpky75k6s9a8siwy0rfghg3l3ptqlvpo20zd3vzed7hsepuxyxdpmp8phxs2csx9mutyc6hpmjevtn31nshzwvsna5ehev8hq9lko9q0rnor4bj2t2hixopsimsyklot2fspjyiz9dyeu24x672m5o3qkr9g5j1wipb48w2c09t7cfl0cjq8gzbc5r4mb3wt6sgprb849p89uw3v78p7x2uoc6nuuvhujahy5an04cj4yf4z2ozyt7hi1xinm4na2wfprmbvcbuqxpfb4pd5yfmy29eos0tory3e1n89532d1bvzkp3n5khkgectlyb1ctwyzb63oxy29unjaqhnt7m8zb5upziihzxk2b6vvhcn0cbp036wrftw073jt5cqxw8vqmg10ppu8cavw7mfxh87dd4c0yvsg4mvpebwab4bjqlu3rm67op884ran9o9ubsszpyd3w41pg5cxlxrlew8fgyxt65rkru0dwj7m48woqltpx765819j0jezjbtp2h0jlzo5vuu42gwt202esr35ddmypedzfuzda3wgwe294v0g1q2exs8sdy0rtak239beh6zadcgwwj6mmapp0y869rwqgcx79z7enn60s2kil6wgzlyusczbvlgxg0fywlhl2q5vrzdfmqydrbnulzg0pxtec0c9f3glwczh7ik6je5o8b4wdj5sthqtoiy7n1k3jo10ti1nkeje5dwwtwn9xtt8tvntbntdb3a9sirsgp5xmhmeggl9jgtl98euoc0emwez5tlcwvvnbooq4h7chy710qmwr83uceccvzq0ljn3hprptvh8d6g716vil5f93y8637fr6nrsd8pgi7nu3jrbh6zw1i0arcv6qwovhavcsb2fvkvl2ui50a3uwoolbjv6e',
                filename: '8llwaepsfcog7oek5y198oeqycq02qbaevbvzssgmlj5o5hx97rda3l4bw9j1nj5d8utnj0a280gtg75ea710eexranmxw5iyctzz3666dtpol5h1yxsc59tq7vgjeoweganglictjbj2j0gxslalswvsfevafou500ggija198ubms2wp374sqnsnb7s1b553tdd6v10vghfqtygz4jam62nhibezz25v4uw8uq5isvwrwsthyzz4hvmglqrs9y',
                url: 'kpnt1lv4nu0jlbyh6la0ipxhil3yru0vsknfxkh9spa5sgh5y3jci3smn1uewb5dh707jgmb3uz5tn8dc39y7ymzzg2e4974adtmt788eos63cbir171tfxsbdhi0yrygi3v948a2xy1tjune7l9t2u8mnfsgi6jpclmzwgip5f0wum6do7wq2pvbtdaf6c7r67hfv66gkmcj540o05h34p3tw7axnqbfki4fx6rk2kddf507730h548ohzll49mi9be98uei4cf7zk7yqahrio5d78w3yqo2rfii1tf87iq1sneprx8prhko7z82bl59iypirswflsd0y90hufgh0iwhuex139t2aolqx7nfiqvgewbsxb1gljfrv8v5t54qscrdl46mht50pqjfolg5d1w3yr90kqzuofpffilcph6gzqp5wmh4whu43hbgjnuklx7tth9kabmaf614ebxkl6w3hlaywu2dgv5i9xc0e3aps24n7irxiz2b8mt1qpofxqzajiumz7hg5rm6kbaf2ciup5jpp9d0z8w6b2ywg4dm8micuh3ag2y6bn7c959s1fbc38qhywixk2jtomeg6axuv20z2740i2dcvtogv7rrcn54ufv9zzcy6bnum0ooyfe1gst3yqqz2gr0flkjuf4i3w61a0pwrbjnlhzlvh06ohe5uee1cx0yuyn75du56xlw049rm8s0aeznhvr3014112da6npy4pryukwu80no21xv6kmnjgp91zyc8nbymcqjvbgukopjne2673jzrs5t9bpplehnr6g1hc9v8ivx042f3vgw4u0tgwetr26gp59bqn45uzhyflndzjle4bcxk68bthnvb1oo83ol6ynju83qxyhas2ah18mxpok9oym3ropvxq9f511bsa0az1jwr91l591rm25v00rkx1j1ikx0i3qpodm832inmoenihwdcgfht0sgi0nav1h4aalczom9cygabecbk9kxo6u2ouolzn7yvraiok5ohih',
                mime: 'kxc8074ezq4s6is37ascfcqyku9q9b3980mw30lp1u11q4zf11',
                extension: 'ksy1dp4jmyr99o1kro5cbmd0iaq7fcfortxtc4naaxwo75070t',
                size: 1033610024,
                width: 141154,
                height: 842742,
                libraryId: '8e77604d-f2fd-4921-b54a-64b34e773b01',
                libraryFilename: 'i7mcvxpyhj71go1e5y3s8w9zigppmcnvtdjpw33eear4rq3d13lbkmcoulollsz92ypgpjwhze4u5cfok9r6dswv7bam4afguwio822av7kxv58upzrd4fqr22obyu6ymewgfsyd8n0hy6i4y6kf5kn136hk3nsir8xi5t82iti744n1cnf2cstxiix30w3f9eh56ew61rmdyibhftx0jl5lsvd8egeja0jkfsxkkdq3xi6u3b0gji06j74ddm2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFilename is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentUrl is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '0f7ee8f1-7644-4da5-b53d-e03cd62405fc',
                commonId: 'fab65033-01c6-4b3d-85f7-7fef092e475c',
                langId: 'efcbc1c7-90ea-4bd3-bf55-cba1b0d94b02',
                attachableModel: 't7ozkze3e1x5xk18zyrxp6ujov0n8b0ok5yi36rzeu8rjzhj69j3x6gndnvng3fepf4vkv1qbdw',
                attachableId: '1ed8b8c9-5995-4a64-9a23-d34265309f54',
                familyId: '5fedbf4f-7952-48df-ad14-8911205a3daa',
                sort: 967547,
                alt: '65t2qlo9p6vk9ktdecsa4lrxqlg3q68yk70q50ck9ipr015jw563kl7wyai1zfspbnkyuf4k4v2b2uklt32uhy2pjeaifpcz8ibwrxeoxq731hv2rpktzsn5hfxdnvritedolc4pwxkg8x4roafiy7u0lqjh97ew58ikqiyn20vdhwl3kbl887o5b091aw44jhxs994df9vuda3r5u3ensig698osktwap9afdje8izq3a7uszu1r0qsc26h3k7',
                title: 'tsonbhrw2rknaoz8tli3h1e47f9v20n5czvvexfsrv11znm19mocb1cevvkbjnt2xviotxd2v0ojl64yu8aizeecswfuaqqzy24t1glqwmr8xleoe8xop5y2cgm5bhyeyxhil42mtmglryvsunae5tum6broe9djocu5xf08nr93zk7hymnebuq1a0jgdtnwo2qb56xf8ws3v4tbz6219tw2p5m91why0d6xkm9s72mgk33s6c3zcrksgh6w2v6',
                description: 'Ab itaque tenetur repellat enim incidunt. Molestias vel nostrum ut debitis laborum possimus voluptates. Voluptatum qui recusandae sint non perspiciatis voluptas aut error. Assumenda necessitatibus accusantium facere ut quia quis.',
                excerpt: 'Eligendi dolores laudantium repellendus temporibus molestiae eveniet ut laboriosam. Adipisci ea maxime nesciunt est quaerat quo. Ab quidem nobis cupiditate.',
                name: '9yftvcrjnzy82n7kecswrvitzx5af32guabn5svu10mj17zvcxr5kxy942uo7kul792sa3n3eql67nf3oa82v7iz4xyqlyidanhpowpwoszl0w4i9amog589zueg1w9psw44nsk3ogupi3uw67hl9htfq75hw68332r7rdpcx5u34uthyzwtugbchosiukmwhlys467jz4uxye6y4ri8ak8ckbemsiavsoh13rg7uojwxhzvz82m5i2kvj3thyf',
                pathname: 'kixpf6x1ypbyl0r1672bogyz0sch6d9owed3lpcfxr88tf0fpxch9bfyup3jxbisncktt5x9olgxbvzpb9z9vxyc7uhbargx1nhe1tm3xlngig3296upl2j21jb2gfrlyid87eszkajypi3f0qxdef4xno1lhvfh3dqy19s527vdq5tm4zazaetkjhq2gbekyl1jo4y1wg8r0dabh6p4n97bzu5vpotsu7g0i7up1c9012k2iabx0vnanu42izifc15clz5byci6p7picxzacuk6cdjapsog52od452z29gs2tkjkmi6bv2y4bh1483isypjvg70dlth4qcp0xokyz4pzbl637y0clqn2qt4j4vmmwb6a3rpmxzidgnpfl83qkfz2vfr5n3mrufngaep76yh8we9l07xzwreziyd3d0lg168lgopvyjazl3xevfm4kmhipuhpdg30s25hxu3phy922chdy6095rff0au45yujuzajnccvwkhofjcihv6v31kvvm5j8tfru5t5v0aqdyu2ftnjj2buqz7w28ehcd28apydvdqk6umkkfydmubprwejaa8o4yrd8rdidj8rtuohru51h7a6aygk1qkyn8ri5k2ulgs3srm7r5ho46mqh2hs64axi25nuzuif3lhbztycchzwvepi4aehp4ncvws9vqipk8wfpesejj59d802jycsrj81ceagfd8p2eku784r1wuylee05rn65rs8y1jvmes4ro61fimw5yix0zvmod8ii2e740by8r1b8pjfbs9qqcezcbzthsixn8l4ljhbjivq64i3e07hgcqptzzxmumgrotx7lnovcpi70p2pu11yf4ldfix3oxzrgwh1kb411wreejiegw40pgjyubs4krc75wczr3dc1vdiwa2bdy7mfxgt4lg5g75b6jwing1mabqdkpc9p574cg91shojtxjd9ye45xtbmpuwvu4n0ilzqoolov6hbp2p0tjovd2l7ed1gd64ayvh8tnpf',
                filename: 'xdid1qb1ee6t3j2yavjcqvf2ex2b90qqh6e14ibvtmxlqzzlwloschspy835e0dlj1bw7b520iyrxcfo4rfznnjitdwwl06r88m75db4aiy10c07kbdmbflcsau371nqel5vw55tg3zo9pjfjvzv172r8f3iyqgmq9dvt39y74gctz9dsf6na8owr3i8iv6z9ts773k7ebxdpy2w1dcyzjnspqvxr51rwjocf4zaicpaoox056vw4yv6vza3gwu',
                url: 'vse1nxluih0r99d6kdynurtr2t0wn65nh1wx1ihiaa5hm0qgswxve8boid15o06fpllsuxu84kq1xh5xfyx33v48s5444qkafytqkaokmkbzauxv4en9p2g0iu5ap15ymfb8hq362mhsk77pf2t532fykkboqja0nfrog96lo13rvnmlwxbby76ibwf92kl6xnjo5gsjhi52nhyaxr1a1sk6d634457135qei72of46qy7426mzckk6bpq6h3vkas2whkkf42czkf55dpu6xvso1z64gxcj1g4zn8ixs8shlvenrsqm9co7qr63d8a1lte4xz6dmgtuhugnn4zzs5simwseeh2ghbnvfc6n2fa4pstpa72dafr7hgti0xdvbrz996lznbgtcjec765ao9y81t8khb24m7k4djrq1t2x9ejw3nucm51j1jy44k6qwblgs2lkys28p6lmqjob9aj7xlnkj5zvlgdcsupfo5cltq4t1y1zwz39pp7p8icpgyht0hpxqpwc0wfei27oasq3fa5yebt5yz8upkvdekznr2wkq7k1k5mbc0205ecvw5ksa7dcq5l0r8jd88r4fsq88e2c453iizdb4t0wiiagw4bycwrp6w43xz69adhau51ze3ug89ugh4l6svcz4dyx87sl61smzpv7ahk7w48rmoherm66ke6adsx2y7egifqaezk8jm31mwaicy0ufq6a9anrvw8zgynu23zrfa92rdv614pzvana085fdw82d8bz4u0omzymz6d3ov2exayeiv4f0wo01film1yrlj2gzcxwxj5vxrpnxs44nt2n2oslq8d527f37bhalumtq5oqmo9fx7xf5owkf7rvgt1whs6excpzqve5vz68ylmo7nszo23cwqjrudc69kcddcby0p2142si4422n15w9i29lk9l99ivng0alw8p7ypcwsw60066vswwcidewr0preyhep2fc7xg1l1subaeobyn8p9d1u0nuimius5yvfv152',
                mime: 'yv4ehjvujsjdefxq3205hc8wyw26bzsqtzzx4mkesyfdh7a6n3',
                extension: 'z3gln3bfghwdh0jfcqsgqbg6uawlq1jnrqngc6ommkzi5z8qd7',
                size: 1897758139,
                width: 508374,
                height: 611066,
                libraryId: '8e77604d-f2fd-4921-b54a-64b34e773b01',
                libraryFilename: '3a1lo9k9w0z0r8h2u87068k9w83bew51vyadqg50eitmvqyz66ebakrf5esz8lfn7qa2p3q6bc9x4dlo7bfineiiy8r3tx9h2ksya50gdt6f5bt9i4b95470nf9zw8qhbxpvmnhp0koc9mawbb3tlpedhkug8c7tw50qg8gk6vo1c9vgnab3j9hvq7qj5uhe0pp0mk2bsd5qud2xbawcq4qhxqdp5y3cr82ku987mjcot73xxdu74pry8v40y96',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentUrl is too large, has a maximum length of 1024');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentMime is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '0f7ee8f1-7644-4da5-b53d-e03cd62405fc',
                commonId: 'fab65033-01c6-4b3d-85f7-7fef092e475c',
                langId: 'efcbc1c7-90ea-4bd3-bf55-cba1b0d94b02',
                attachableModel: 'jlv4u3swx6lr1fooq0w64ljloh6tzqlza48nc061sx7dnhyj4v33rgzzhetcs6e1jlfoztgimgs',
                attachableId: '1ed8b8c9-5995-4a64-9a23-d34265309f54',
                familyId: '5fedbf4f-7952-48df-ad14-8911205a3daa',
                sort: 747914,
                alt: 'm3122afw30b0ra67e7d0uvv7r6trknktnqn08c1613br6lx0ufh3jx4rtysl6txjnsevabp4d0g7onvtqx0bg0uraxavhtmb7jzda8gn3g9z740xnayi0gqk1cx35a89yebq3j4uogyj4eg0phyqmfv7c8swgu83yqkcv19q4as7xgiqn6ohmsfelsig6ihpr7erjm0sxx86md0v1ec6kc45bzdaaw4qwedx25my0o1xu8wxvdfthykm5ls6dvl',
                title: 'nikoyedea0nq6jzrt9w3aubyivkixprfbftim6avx93czd7g3xog7t0a9024d4ed0su4nyizymzizva8irwfl4cy7z9jq2m52k3wim33grhffpl1ckyoxxy4powqf96juss1rpswe41y8it720lcrcgtqsm14xkr3rdfe39l7gy9607npacu4c0kr2wb8zdymh29ch46bdslslawfd6ihsw9cv2w3ckg398x636jqg9e0rdg3ukcyc50ju6gzov',
                description: 'Voluptates fugiat dignissimos alias rem nobis in neque ullam hic. Deleniti autem harum aperiam. Vero eos soluta consequatur veniam quis ullam deleniti dolores odit. Expedita ab voluptatem nostrum odio ea maiores tenetur.',
                excerpt: 'Non facere excepturi voluptates qui velit. Velit sint consequatur eligendi tenetur rerum. Sunt quidem explicabo ut eum. Id sit quia laborum corporis praesentium. Id sit consequuntur sint et similique quia neque ut.',
                name: '9bd0rh8mj985uo33szl0vzq8qy1k436qlov8hb6tykjjr36zwsnt3dxxh6g2seds9tyx2tzu6vehmgafqzs0jns94f2topuzisusy3odb7ipdn1ry9stqz5sdjnni1f05pdbgdmm46xfv4n2scmymhdtk1qg9ketye63sbnx9yaz5k9k3sj5f8upyzbe2o13vpqcbkdovn3vra2bg215bwc80gh5540rjwcujfs6ctrknaut8z0sq7tu847d9th',
                pathname: '0l7aojcxzrfbosczuump0hoi9t83j74z78jrviac751bjz13ahwyycpozbrc1e5o0x2lfd4u0ozhco6vtgrdgnec34vdgg24ei3hlz2df2iqr2hyuo08scz3ydhkx504n8qo59nve10d9s01iybv4xpic96zyct3l359ogcillu8tszeznke90oyw9qjs8cf4n81gt15fryogt055jclolzwcm0t00j3wf3vind8hefdulwrruy92zh6hygn6jesfluetzm1dj3111nxn1d8eeqz0a4xedm93mtkhzgrfmni8bq4yt34qog5652oakunqhxmnxvvocbitag9bt9o77i1dk4q0ebv8t0mqkz42ty6t79kr2p8csvk43sayz9j7kxij6vvoo3zkrdasxd17ry4paytsf1ay7b0brgsyp5iccs3lsx9ef899ny5mui9hi32ffay3wdulj6dc5c2zk3lbd4urjcr3f8sbup732j52brajlsk91etfbgw4dmiukoc8fkcahy14714n1of66sgctg5ivove3e3onkxtc9s709274hmc01uzx18b5qqaozm1atqsr98camlyo2q2v21xzyu22uwqwsa8jsnt7hxrahu0rpbjrpx1is5e25ydmlad7a28j6216royiv65oc7bgdwb38x6xps0q4fa374k1f1iw49xbmg5j6hvp81mylbfh9fczp1h3p7zf38wig9h4a83se6bh6uflozhuskiqa3n347fd6lmvxlvx0sm44f9228ts8x3xwf5ocvzar9xrfs2z8l3gd3zgll7yvn3945jd3eao8cedc1knvd6tshrt04mktm7k18e2mkanhk6v2ct48l3kzd2yaukztfn6jwe9dhvuuuzmr39ve1bt4w5i7n48js9esn1nutf836np5dhgg151i7t8ueyhjeijiy576037p9s4df1axapnsrfk8co32m9ok93tnof3gma3464w2bge5fe435ml8o48dwxcs8dyghbwr2mda3',
                filename: 'wfte85506jd53totfi5uz44fvdev8ce1jpmcehwsa9icb3ugeb95pvjm5csof2icqh263l71tr45w4jac6ail4daxid0a1dwijrvzb12ou0rjdmij9ww5jbdh1jjhbi0jg4c3lznrbuvn4y8nmrt3ie9cz0o13q7igdhimo1qzq1px7r1bqzr044ok7e6bluu9785hk43wpjanu6g5os5thwwu9ecvvpr8tlmsgcj5mfh8io6any4p4j1lirsvu',
                url: 't282rlxpqx4ea1g36ixlv5r142vyb407399tlt1hom9qhc71rhhmp1nb8pqku7ga6hqxijno4p2neewcrnt8n0vihfpr3zw2b8qwziquw08vc8fi0trnuqlbwman27xf5yrahx9wq9plxs1n3t6k9kxluigl38r83g36qdf8wukg3z8tm8o35irazv723av3e0m0sl4zkwjz75o4zok4cuwjmyaci8xz56tbaa6bmm8ikbeyxq9lvrmclx8ntrkipa3iflt13birgemnatts8okqqbxrl95mifsyr4mfvw4tlox5tol3xpla6tejorxvlw7igozgffyh61d8nm57p3xogotd55bmii7bhtyx87qb3sm2et0rgdlqxcqaastqxzytc8b3rpo1mab7ww6vfooi2lqc9aje4ydqxzxy9n745obnqkzl6jmzc0abey26gs32g4odta2304to6jeor16mkbtts4vgcmtbqhdyx0n8y9u3pfh74bkjjykjgadg92uzu54yot592elzwz00nfdymo2t2fh3eay2c67bdu0fp5wq9db6llqidj6ru6lgaqdu2pihizpvfas9aefuz6c7xbjk22pq9s50pqb1lex3s2y7kgud5dy05jkkwg5s038lqi1naioi1ry50chayanvqevjtfij2unhw0dgoiwz0r0hfl8o59yrfnylile28hdn9hy2im8099f0lm5xgbhl4ubaqaudj4wkkmo765la0su8nv41whk4s2v19am979dnmq4gf0u7nc9om1dn4l3368ot71ynn7e0xicqao5frzjq90kepz0phhrfqggxsmk09pglctschmnsdfnlnny300thl02wty658n9cmzjllq8v1bp194hll8r6se37u63wxoak9qwm5v1vhz2wgodkj6ysrtlyq558czxgl1pxckesx9xlhjkocacizi2jwloki0wquj8d8zdl6083t4o2qda49o1uz7hcca5pi8f8pnzlol15vjqduquyufzi',
                mime: '1gpehydjn2qpbmo3s4xw2o491to85nps3u4z5t6zaxclkptuhv3',
                extension: 'i75mo9ksmf204s0ymokbiw9ifpzg3drlzuphpxcf8ubeq1m5yt',
                size: 4191206940,
                width: 621510,
                height: 368658,
                libraryId: '8e77604d-f2fd-4921-b54a-64b34e773b01',
                libraryFilename: '7rmqhkkfehgq11tq2gzvplvuhxvxgshk0aodg7ebqxak609k8vizyeyokr3r84jnbqhl7dcaesndufe0jnz6qyjkfmaimyzmdxwnjzygo8d2uezmi2am0maw1v4s6i3o2zpbsg1yghkyyxtid44o5zb8jq1kz0uv26whq275dbqdpay31pk2zgr5b1torb64d5ukrx2pag2bte8zh1qt0o78rthg74iwa179j0lvnuuytd4mlctgza1yc1fjf04',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentMime is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentExtension is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '0f7ee8f1-7644-4da5-b53d-e03cd62405fc',
                commonId: 'fab65033-01c6-4b3d-85f7-7fef092e475c',
                langId: 'efcbc1c7-90ea-4bd3-bf55-cba1b0d94b02',
                attachableModel: 'm13npnstxqaecjv8n1mnr02zagwl7vyihpt2vugui42oltzmtae5vk1s6ywdj13ochpjbr648hk',
                attachableId: '1ed8b8c9-5995-4a64-9a23-d34265309f54',
                familyId: '5fedbf4f-7952-48df-ad14-8911205a3daa',
                sort: 182684,
                alt: 'yu5nm0sbezmn4rqqgacgzfvv2mazl7rc46veu2sky7wfr3yif8e3pn5728n2qgwh1895pfeaexqh9rohfu4v5vlse1phxy0deu7ue4c8yo8m51uy0itjr6uuetq87ls173q148jetht6odqdvfvmt8neudr074mzbb720j3uer24wuszuwmmsoterqexgbj6j2gvcocebsvteglbjrigf2v2lak9hb5rc1uj9uqyx6s8x5754ypsqldolmuicec',
                title: 'nh8c17ovxb1xq4j6j1jl176trvy3ie8tsdzqamdltih3h27b2l4tqkvwgwkl3ytanf0f3fil88q2w3vggmebxoe2da0u3h7dufz782j1qzsit3p7fqo0lqyffpg0ype055s3d9v5nae36t6n6hgf474h1gx790jv3y3p3rtu6zxkxkc6u1vlabcnqot6j0yzys51mfmj1qf75dvwy52u4ghso3nqieia3ji7tcpbkq2tgito2uyy86stx1c35su',
                description: 'Dolor sit est omnis molestiae ut. Tenetur cum quia perferendis animi error eum magnam accusantium. Odio quia odio qui.',
                excerpt: 'Blanditiis veniam repudiandae id distinctio qui rerum iusto. Inventore commodi qui qui non nulla. Possimus quod corrupti eum sunt voluptatem animi eveniet error praesentium. Dolorem consequatur ut. Id omnis aliquid voluptas est saepe.',
                name: 'n510dy68ba04cckyydx5n171eqk76gmhv8ybxfe6soiya9p7bc15891n45h2k3pq3g209a97fhv3qjc0dg0nvnohpubgz2184eso1xwtmaxopvb1pv50yzzxdftvg1zwrotcmy48068e36e687md2nrajaehhycnlh851jsnyxodvxen653twjxow4v0dxrkuxp0xkm262blahsrok2hjd7m4w0i5r0dzm0xbc9vgmuw58igw3o1b7gsm0gnw2a',
                pathname: 'ubbym478hcnj6ckfs61v93b9ig7mg5vd00ju634rm2kxuc56gqmxp97dvm2mkzbn4mphabvuagx7gvr1x9ek1bvp3ts5e6acx9jtlnwwidpiugzug5dcl1nuj5yblaad1udpvfrqrh621x4omuohnrcl56zck12ucn9uftgp1zxtpf1r7gnwutbdq8epwgnwarzpnrg0h1oymm05keai0gv4nxf424geisd1f4epek1w0kw6dmari14rtc2jkg1xua4yn350wc5z2k5w7j1ai7zwsh39v86053fcj62d7r2syzl3ltg4gbejqty3wjrht745ll3enoavue0itlntbdcftup4f4o7nopzgh1af6lp1bse37mzda1eco8rpmdq5ke59ucbf4flxbrze98ay37z336py21unspmj5k5jksedmehwziysj07xny1bd1n0gg7c2ykkqcaikq2guhatwhm9odfk32xk7n60tayws0ynjyimgpvta8mxyjcvcazvslhb4h51l2zmd3ykir5q6k7sl05tgfp7kw1cbwlwoa983e2smkfev4ld4lup4qim86rgvl7pydsufqd0o5rha9so1xg5r581ch8i42lucv4c1uw14hrlrgv6722lradd85zkgvugg4zo3x1cpubmhul17ipkr6jn1p0qxjo4uxnkorjd6pyqt24pq7mpqcts4x9zt0m853v57f2tiibtcgf879k8nyhbbabcmbct6xfbghvvnwh5j7dze4rfpbthyxe2h9t6h35mjtfe0n52y9agl4o75dpphkeoc2vvlsn6q6xq49obv3a9c077kq9mjm7483tc6wk6tnsjc38r0eu770ei4ozlyi87bnz4gp8l89lfdym6zncw3vvld5bfoejestqh59dfifxe39y1lcmgpd9sdt82wpdu7m0c78bg0e5owqxjm7gnobowav45yzq491dreq1y6e853lxn0u6m5sv8pa8t3sve7y4tb90ji58a973i58tqjy0aw6p',
                filename: 't3j76t0rgt5mk1hnv82a2ysf5e15tvk2olpexr3b6du8loa7rf0il2w1cfg6oq5ra3w0xoz7d8mx0l69mph2oe7t5dw44wunap7jogh85nu8tp4c1nxo3g4go6bhvh2vlxaabr1n1wrt85ktfw2zd0qvkk8k88a1ayrgn4n7g2m7uw9wt32ovoefpd6ryobwoiqmxtbmu0olyxvh3mj26vzd39v6cztmzjkm4kn2ww40nuppujysb2lxj1smmff',
                url: 'cmu3vfhm2sgveqag0l1r7n4cpa9leubtr3ankk7946k289easw7vsh2y07gdg59k2fv4o512evd0y8zspjxlwze6rmkc1pmbevterbfzca78zrj5exbd5w97u6odsnpggfc6495h7iz08lbvjtp7gmztt4ug4wp3ta2uof8fn9mr2ja34imyztk18zwg7kibkkxctvrtqb5wxk5vaovaky4ya44v15moh8vvunbdfpyabj5yauhycvhy1sjexurs4jgdmeacf4fz8sd9i4i0v273zpasktkg6qkedios16g2sw8jtepmr7lglfsssk6plskq7vguvwaf937ugw1lx9p7wdh7bwu47qcg03zy1x9xlq80omk1hqheafdpdt5cofm1xw9b2sx330my8wxt3r4pz1kgk1vb2i10plif8knd17w3mjusby56wqr5jrge0mgqw2j3egrfd6z9ypxjoll9mhhmsvljo4q63y1k1j8nih53g3xbkksyjsbmsrjxwowcx62nryv90sj2tdg094snt0ki66f2q759zsk1fni7p97hl94pen9tehnm4ut27b0kpgjpa8pbowiqwcdtopcslmwdiemargo8byznfh6x9h56flq5vojf2i8ngkg7ex6ykl28bdhb53dbh23i2i987d2tmqr66d83wbvc3rdax3hrlpeiakvh3796myjzf87vd0cnhcsn5owmt9v803q4579o4zgrun1lo1wxxduhcgf1fjb5pc5jsikwk684tku4ep4wrijznrmvu6ytzajta8idhp04mkswsg4800bng873i73zd9thtl48l2bb9l0muzs3kh6930qizuw6he6tzye4qdyacofw12vc9be2iajgpuss8mq566oikrpf9dc64sqmet23m0xrqo2hbq4bj07o0sr0kyf1cm0c7sx0g5utn95wn0d505bhvzl73msufgebew3vgpkrrws6alg9gj3v3ctsz929z1d8arigmlfsqmqri2qgd0xulehy',
                mime: '133gl2i8omek8nuvb5l75amzqofarj68zdtf3crjez1yh89dc1',
                extension: 'tzohuicfuevhp84p5q87yp5droabz6n96isybg7zi6iko11sqvb',
                size: 2432091957,
                width: 600337,
                height: 737940,
                libraryId: '8e77604d-f2fd-4921-b54a-64b34e773b01',
                libraryFilename: 'rhyo9j2lqgc2wr6qpjjbgsz3z54t1haxlroa9zgh3uhfqka2quhj9geqc13rlfoglcz68kbqjjvqc2fl5wst38c73xfpzqbsr8p3my3pammonlo2badcdlzoop3xeio3u44yq819niz70bnsu9xn3esvvy6wojfxbtafce7oftuuzvodv1kl0kqxyhkcity5gjgxiibakf0u82hb7jgkj6h7bdf5x9sx3gzydis3vidxgxb1m15xdsf9r3t77z7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentExtension is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSize is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '0f7ee8f1-7644-4da5-b53d-e03cd62405fc',
                commonId: 'fab65033-01c6-4b3d-85f7-7fef092e475c',
                langId: 'efcbc1c7-90ea-4bd3-bf55-cba1b0d94b02',
                attachableModel: 'n4opf5lb2klw4go3b08ulkdtotxa8ekjdgvp2w5gcyol70b2uvi411bwbbnnu7nvifumhcbx0hx',
                attachableId: '1ed8b8c9-5995-4a64-9a23-d34265309f54',
                familyId: '5fedbf4f-7952-48df-ad14-8911205a3daa',
                sort: 606117,
                alt: '03t78lmnfawmwsjmsqyypgst0fplmb7lh1qjdpw7r1chh80rvwl7tpxh4ctfjl0sysjfxu4l36ajn4ic9671yznet9kq67tmn644necg8npjpm15gilynikbjbsh59jyvlw5gwfa4djurynmym0ci7ovzvc4snf2uzkn97jdx8h6bznr0421s34z5odxdic41n3wov6kahosnfrozi2pdkwqswju18uz09r5dtm3702qrwuhx9l3sw0k5bijgdw',
                title: 'jeiqulth6j2w7fywrdj6v7ae4wefciea63ee9fudzyo1po6e8csxrgiigze6agu2xcww2zeu5vieuxo5owxvshw0u38geei3wbu2waj3iprp9qjz70f3wyzn4vz5njn7t1x2cpnsmacqhbh5xg50nq6jc3diuprzu5gmdx2rt87hj18piae5me4r0bkfch22kdtm8hmwgptc4b9iz1d8nog004kciagxddlht477m55rm41d52i7p53ijla8thw',
                description: 'Nihil ex quibusdam labore molestiae distinctio est id eveniet qui. Laudantium aut explicabo provident ex nesciunt ut officiis autem consequuntur. Et iste voluptatum aperiam fugiat et rerum tenetur ut sed. Atque voluptatem nisi quae rerum cupiditate enim molestiae nihil. Officiis perspiciatis eaque doloribus. Facilis et doloremque saepe voluptatem temporibus qui enim non.',
                excerpt: 'Ut provident quam impedit quas nemo necessitatibus. Enim minima cupiditate unde non. Qui vero quod dignissimos dicta qui numquam eos est iure. Qui nam iusto deserunt ullam enim commodi ratione. Quam dolores eveniet veniam dolor officia dolores eius ratione.',
                name: 'sjpr9jldxtjjbdg8io6ahnas7u1udztheouy1dc9scu7mq4p4e8n9qu8hehcs8p45salh89hhcl8dfnhiyfbth1k27k1kwekxsinj44t25gwuwis44xpcsbqgtyq4nxvmxxsd7wvsamyybcbkhl7mo4g30hja6nzml4tv9a4tjern0po6rt91i17faobyxwzgyqaqwpeo1yxidhpgj3w1i1nbb9lwyzs8qhlw37dt9aplm8a07pa1vxzko4w311',
                pathname: 'okb3g29f6c9ke294n980vqv1b0s6lge71wvs5koo8ka4rvde4u4hzn7gpbi75hxbmtluv8ljrcwcxn3ftudg9wf93e1irwey3f676kmq1sa2zl21e79soc5nl63gum24afu02trjg5go4bqvnrjjbmd3hdlkcb251r6jkepmn55jajqco5md77kzx4cqi3u7763avtn1w9c9r6d8folnzfutkjlyk3du5tevsb44l3ggshlgzti2hmyuukg8gzcu1ihacdza9u2v2llo7m2ssje1w8q69e8zccxx3nlazxy8h1fmtpgxd6uw5usg2jf2uapi58to9qj9ldu2tin2s1f01p78o42ssjdqwrd57k7auzhctqeeduq90g544uryokbluqdngoiptkyvacvkm8gorytwzj3xjctpyhcsh5pessy3usy527spen5cu7mfkzeimbclqimdusjz2lr5sexwl4t37vv7v3l4by6acawe23cy9hoilada6858y1clq52ts565ax63rglsjwkjs2kxwd60atn2zc52s4uv3axmhk9bvp8gdftsskcuwo53xo0lqesnvg2estrgz63cumtz7jniudpmayd8vmnkf7yalqzxxdonueos534gbq4ibj852h3gf94oqk987bqukg2h08a1cq2s5i9eefho6xnfk4hesfk46lf12noey4ghdjgrp4xdzdpjse8yjihy8us1h29m3w49xnoeqp9xk6ysphuxlm9x2vs74t70s8qe9jttk3z1yznjzqs6vodugn1p9gz9hssvfbxyl3nzz4rsjzhjcku9ls3cqlbuui3a6thffo9pnc0wrd75z8wbb9ioe85lhzkaqtj1lvb7kudfjuiq6db5mp3mnvrebrqsnczwnvzwjmquj5ptm8arniwromby13k3vwe3lky93wr10rwt47tqasamlg7i0sw22opur2rvq654eybcpqug6fpwj5krjuwhmkcpy9n40uf9w8atyfk02jjrjnt4yzau',
                filename: 'ynsa962eh0jcj439aqot909blykgvty6bdhal7uoy0r7r02p3o47g80h0voo69a1bvfcgliisd9x9hcdsadjlr6wrq4jrcxbbqm6js6aoqe8oqfr8jzp9wsrbpzt7vagdcbbln2imu1xyni25txpskqwndtm3ky1jp8wi98bwnxm0qxgm30jus916nhl01xrtvzkpl3g6x64jg8ix4020kpqa4jt58hvctymm59f6amhqj7xhru3gscauz5bqyx',
                url: '5nt8ujwarepqk2stfcmpneypyu11sowbguqkxfp7bfwgpq6hpax5vco47purgy1tae62fbh8neb938dvb7i0khkuo2sl3xxwabpeo51bhc0xgq0jwe1g7v1zsmlvm5z7qu0zmpjvqjflbnqr9ly0ioe3r0pt1ri0roi2ak5co9n2vm67leh6c3ahbvtc5uznc551w6k319f125ia4qso17dnht35gob7q0x4bkqvo3l7b70clht6jdkh0lipxy8qu9td6lp9acwlx93ck6osnsb5zl25egavvo5r8gkpsoml3dj81xog9tin02pwyhn1zc18qf52l5im9phmiiklwnhhjjei5jv4ajw5zaocivn9z5dx5p2mfy0ot3cra7a4apmxqav71neqax98cv39040mad3f5ihuy5f74jr4n0ozeozue0q3u8fyqzf98m71cc76lpc0pz6thqwqi8t4sbqoj4q7l2bd91v2ojk60j22sqf11fq94iytu5f2l513vzyuc80rs3x0d5vho6tpu0cj775rib2479a94bmhgbgh9eks5uls6mejptjn3bxpyzcl6d2bqjc2s17y8n352k26dyh9e4av2f9xj6godr4beqon80af6ulcrkh2sh8uxp85o1gxyfyk871xgbqn3pqihlpmabg72gfgyw96vnrz4e8c58olvu7gfi3l0ih7b82ohubwzhwjcayv78vv1vulp8itfmdk0m14mwzbgrny9zb1uqiwfpjpkmzolcv4btqbvc15t0c8585smjxkk0opinaqys3xwyk2p4rgiglzg3ofwj5dsrlmlrjwlb3x0gv3sqb43a78s96t8ar7wd8zxfbk18gwv2qf2twz9mp6qgitjkl99na6hjmdfxcxryjlkyz2nje3p5qg94jmkkse7oym09yo6356lwqtswi0mous7xfvu7nyawbdp8o6ib1rrel3qn2je2exkpxkxtfw0ucf22r0eiuggk1t7xgwsqem9ehqgqkyqd1n2h9t',
                mime: 'f6axmtmhs0x9xlzhpkx3iip03i98lpes55lhadkjh9whoq6cju',
                extension: 'pp3d8bi9zh6o74j31jwhjclyaa4yqzssso9ryfeslg5tc78qq7',
                size: 48922338254,
                width: 289642,
                height: 599775,
                libraryId: '8e77604d-f2fd-4921-b54a-64b34e773b01',
                libraryFilename: 'a76kz5zfowy0h0w6u2hr00p4gf37h783x3c9at91l6wnbz8v85a6x2pwikskwo77jntujxv6p1bryumk5cct1s70s7fc2tr43a49eh7xmr0c5kaibviq5lyhgeqlcgu8o5k429kahan2yj1qp63hkf7ju9uonte3lrhtanuodqc5y4gs20oquohd16tpm7u1soc5v4ddfuvt9k7ubw3p164szey702897oz5ovt54n96s93a5dbpq5rzwa9mkra',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentSize is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentWidth is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '0f7ee8f1-7644-4da5-b53d-e03cd62405fc',
                commonId: 'fab65033-01c6-4b3d-85f7-7fef092e475c',
                langId: 'efcbc1c7-90ea-4bd3-bf55-cba1b0d94b02',
                attachableModel: '3mfecbe7wjfahoidz8rgkm8o6j2cwwo9ju1p0i05qrcyuw8sxxkm9hl8ertq9akh9sbept1dt6n',
                attachableId: '1ed8b8c9-5995-4a64-9a23-d34265309f54',
                familyId: '5fedbf4f-7952-48df-ad14-8911205a3daa',
                sort: 376764,
                alt: '2iwy42jxuysnygmhg57dxbexbxh1u1pvh4sf8ht29xzrff9r4gwzewaekm02t3rgfs42jmknsi1ekkmb30gylfvkulslo3fvcqd3vyz726gs3c1cpo8c40hkyk0xdmg4buw57bd876gwmxy1n48hp54hzsmpwnx1gn0gpufzb5jopcwbojbd45nmlqcx7gryg8ya35ataxt9pylcgg8fbml0mvz0xfb7s3aa3tkgzpd42re9wyn83plkjp47hn1',
                title: '15ubj2mrdy3ryxz2mft2cp58dfv15uh5y81pjywy245p3p2jsdsx59jrqilbve4vm5ipshuyxhvp5n4u01cex9iwv8km234vjji3hly1dyqed647k3rl8xyrigsnba51u0wxj7kh0ri2vjsb7twjty02bslszqbndd51j72y6fzq2x92rt1xrzox9kjtjizkxghoux0h4fi9wn90n9751azqhz9jw0ucyd2zrs4jgdomwbbj42bd8jq1mzjms1l',
                description: 'Autem sint explicabo nulla quia. Et atque vel dolor odit et ut. Itaque repellendus placeat et doloribus aut voluptatum nesciunt. Expedita blanditiis perspiciatis libero ea illum. Rerum eveniet asperiores voluptas facilis accusantium. Sed atque aut.',
                excerpt: 'Sed sit consequuntur autem. Deserunt eius similique autem animi dolor. Veritatis recusandae debitis ut magni et quia. Quia doloribus temporibus at enim quos voluptatem. Molestiae nobis eius ipsam.',
                name: 'hhd10x8klvid0xknuze6lbuzu8r1donanwbyo766679ue15frctek5oddl8c3flrzqn5zrbshg5zdrd0o5j2r6slz5cz26405br45wock5syn43iniceyrvgma43svyojvzjyy9fttooqdm266w4h0tfjapdhyerhmzuvyvgvt16x405wrsj5nc20jpqeo2idvmq5irylk11djpv473cpwfgame16y19l65o52hbh0do1xk6so4j89lg20pegrs',
                pathname: '8ayxdjqdhhg0e03qkozvqsnyt2a4cxu9ui4cqw20satqn4wt7gvzalolv1u799my6kmcc8466yzj1s838oh18rp0mo9wl4f6h6ywgfn39mbla49y4ook9qxbusziqbbttza7vlada2dr0r67mbf6j9vrukt26zxppx4z1fzxx7w19oryv58l800xm5e998fdm7knd1px8zzt5z6lfxufd8tabwtzdbnlvv44a24lb2g05byy9ju8nvp7g8u1jhrv6sa8kaxe5pt3wza1u9cubfkjrbk7wjuasva2jzqegbs1vtgn3nxnqvrm8rq1pb5u3rj2fl9eke60oswwd7yb87texbztzemxqg5kgccr5bri6ae3oxqil9wxxcm4c9gq5wctauvwydg8hokm74sq1klxhdoh3be5obksumcuc05s1r9cw3y7umaifzqioymjz9hsfeb6gl3pm0864zwdotabjqkmbyut8y73scareswkm9s2ziwokawgzwfsji3fsd0gwgylqo2he9un7u2qlexxntw2hs49oeup7ogh8ixi3c8v7tm6ntachxpue9jjdl86tz99dsdtnixkuffqpqt9uy6z4uyo4t4hpwj1z81adc6a4u4m0p0or36bjddl9tsu1szj1pff0szmcaieutmn79d512jf3a2co0m07suyv8i4xl08ksyh3w05jaj8bnr43vx4naf87hudnzyuhmchapifpq0j5d9hsr0eicoj69a6f81d37q5xf0ret912rzbgs6391kae2qlh90t95nq50yc8sb9st1bs6ewot4rjsz24bbeocgbzkfkhucp0km4puoxyc8gq7n3oqytzp491iqb45nbb3ded5ss1plxhg3heqi1s1s3kqjehxoo06qbf286z39n0rtephkfrmp16vda11qfg3bwttw3c8t6e7a3qqrkaprrkq8pg5g88zor3x3xodxab29h5d8es2j1jywkrye5l59mx9intcd6a7pwhhtcxkpfvs65l3ca',
                filename: '48ctnb4zethjynb26kp1cay22k13295hsxkqg8cpgc754t7z2syzt7vhb69bhyrapqud4925gj2bulesxarcgjx5h77jbnq37ih8iswxvhkt4ksizb78tw2ubjtmwdg500rt57lkau5ehgr1v0b3m1atd6urgfnjh8dcp0dxbcsurpfhi90jp9jj1n241igax1gk41tch40t6c0egr7eul58cnu0fy8mw4h0sowrtk3ohzk0y6k1e2ty87vtoyz',
                url: '2vftuvpowo4ylg26hije7zycnby8llbvzvdrvrvw39vymo8lpsolhyvv5jpnnr3e4p4rq2x7dayshr94ad6ec5fje77hwd0qsqyh8ijf2np9812z875vfn35zsouxa09t3eet2yl074k9vgfmhk2auwju7e37jpwt0scz5mumolk3433aw1crpl580apliphmmk3chkmmrb4lvh39q9t6kc1xm7lxs7sf74un3smhgorsxbiuu7y208e9kgekzk78r1077piarce9038pyp8unwt4x46293ndag2fet3efv5u3h8hlxc8g3bc1rv40jjyzdam61xd5fniryg5s2tae1lunvk3p1xsrkbg79ladn86yzw504vn9igaexhol1phnzbzq4cvx10i9nseiv78q8o0vn8qhw77ekq5m5y3mkpqg6m3ap54l4gtlbfroyfwyintmakqhoh6uj1esx4dl302u2nu6emxv25i8d4byqbedukv1fxse3aardp12grwh8yp9u9bojvwv2tj9f9z5knuhbr98yx980xpxacmymup2ztxrkqph2bdjpon1vbmsv9a5wbddz2hh1lyipvjwjzdl218dmdcgc9mtmiav3dtshabr2fdauk6eap5oi002egpta8lslmkzumvvxcvja4k61tlb91tq7l8e3km3icbc8ngox2ps7cav02md22g8hips6h4hjpryjp65ik0kj1f1xp7gvi1gdlexn2g2aq9qz3kp8zhptpeojt6sa3u64sudrrhy60hxho75bsa2rv9nleodd1mit7tooo90uaqshr5zw615ygg006m9zg36e7917ydk8c238rj7j8cxiycpweru6nvik16xomkdza3xoar76hm9w82e4ng5s6ccbnae1ypnv2qi5xiiobco5jmubboitzl9lx0d6fuc7ba4isqap4xog59q6tw387s1u1gpj2p9nqpo57v6bvg6kohwp6k8in3n9e7r5j3uep741of20yjh3n02bkftfr',
                mime: 'dezxfap1of1jnzdq8thpmzik3dlxxks3oghoqrr05ohbxk31up',
                extension: 'zxnxle8upr1kyh3j4e31anf9e3blk4w73ql5289cqafo7qrhtk',
                size: 7970392851,
                width: 7877815,
                height: 259253,
                libraryId: '8e77604d-f2fd-4921-b54a-64b34e773b01',
                libraryFilename: 'ih4y32uyox9hbxc7a9zaafjxmc00ao67k9y75tgh8bwg0dfb35tgpy4iexq09y9xiq7nqiije954nhq657be5q04w6hxi6opnxffju5cng6cdzgpgudarn1l2rlcivwl1e79mph4stkz9o9epd5zgpdc2n52g5x2xgjdyyxtd6irfhs00ags74uy0flygbh7x3fskxuistizmfn68a6w8py6z2pmd87w7ppr32yvdz5jul2v8iw3o8gpsv8m0vu',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentWidth is too large, has a maximum length of 6');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentHeight is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '0f7ee8f1-7644-4da5-b53d-e03cd62405fc',
                commonId: 'fab65033-01c6-4b3d-85f7-7fef092e475c',
                langId: 'efcbc1c7-90ea-4bd3-bf55-cba1b0d94b02',
                attachableModel: '6pdohfga491rpu4xg2bbsqugtokaqkmtnrgcdtdg4bdjuew28mdm8qf6a8up8cvya7x8hwex73e',
                attachableId: '1ed8b8c9-5995-4a64-9a23-d34265309f54',
                familyId: '5fedbf4f-7952-48df-ad14-8911205a3daa',
                sort: 161805,
                alt: 'cjf3o6bzcpl6a1cymqj2njagwgw8whxsbg6119jg1cvvgsfxb5gmmz2qo9kie6uckjk382lju0bewiizazjrggb88m3gr8lsf8m7k66bnh3bhyhafx705csg3jxlx5b7x1xr5y9aws39olv2tn14mvscnt8vu9hubnh757b9j3z3rcohczm6lxm6zmbbkvlxnnolprvxrh3bkiuobse2uinvpb2tkrqu6x31pxmde7h8okcko268fvwb2f1lp43',
                title: 'o8kafhs5vj1w6k77ozqhqv3nhq7gvemwgqefcrddxocv52c8skq24m8kirmfj19y7pe9gumxjn7ufofk6v15crn7g3rgj9k8nsqubr6r9mj2byb6htlwxvkeem9tc2r2df0tyf29127grzdtnz5si4odbi5z25bp1s3916tak76kz2uouvanw3vz3wce2pbns51gitgrpmzlfbz4i7531prhck2doe9wqncw1kmqx689lpqod1af1kvvvgbtpj3',
                description: 'Eius ipsum est quia quo. Ab eos enim beatae est. Enim necessitatibus suscipit beatae quia deserunt praesentium beatae nemo.',
                excerpt: 'Qui libero quod laboriosam corrupti voluptatem vel consequatur neque. Sed expedita et quis cumque voluptate sit corrupti quos nulla. Voluptas ut maiores hic dolores inventore recusandae omnis omnis consequatur. Quia autem id molestias consequatur natus enim ratione iure mollitia. Sint blanditiis autem vel voluptatem quisquam ut deserunt. Aspernatur sit consequuntur aut.',
                name: 'ozq20s74o8y05vnbk5m32i9gwvkm3gqscfuodmf660oaqulvop5ahm16szl40aotbg9dbxkg09wnbxy6u4jhyloy8a1htvbv82d8hiwyia1pqckpcav6qhiklipqu4f324rt7y89pgtd5j52ctxux2h1cm5bwgml88brp1oknjhhvxlzbxlkpl750vfdhugyihedakepx5leap058zirzexbmt8ktpgaedqvsz7bupcf8wd73ghj16od19nur5o',
                pathname: 'ac32lm2nbu32vf4zkf6np6jtx3y577nmzslp7dl70jlod5abpi7602vq793t9p7kra3jzbeid6jhbmbnfpd2kmiboe4eq92c93ew7g96fr2aag1dbk810wi8kdmn8dgeeprn1ssnb6v0z5ev2jowhxsyogbpfhdq4sqgqvo0r1hhzp2f6opli9juuco8ew0skjiy4vjc220a2y49gsxwee6grubmd6yibv925zlhdaoaa8581ygefgkkko4ci0tyhhn5ikm14v8awenrth21zqpqsxw4bxjmwikzp0hqmj464pdxpojfki1qk2m2ceacpiuial4bdo6f2cw946fmjh9gwx29eb34rvwkzffjbiww1bhtmwfvavtylv05vlghdss29wxvu2loext5lfage1sr36ve2e6r51f0tlnqzfrf8hsqis10niz67pz4v0mxdmdd6aq280n7srxtqcmdx7h8i9x1rpccdzb277x5bcfjczvhm9svr4i77wm4nmr2poc2fboxza47oj2nkrk326v10rttz1ydf101895gsz082202jst1by9yf9700610shnt2iagrm6z9hido5ku4lyl3nky6bpfsr08itzuo56t2f6ngidf9mjcubtm8dmxxwf90677es27rbeqw5qmmaneo8t0iz1sckphfz61y1h1pg3lorjg5qtxte4tpmz9nikjaf3bxzxv52ixg0fbbsio3si3teskbv6544hg9f4or738919h4j2tss4yrbao2qm3vxmqw1iaix6q9g8jiqyg2owun3z50b7ze23pxozkka942aon064ffhxxkxaejvmhdaryxr5ezlxdmwcvteafsu8g30mlcrsjmx0mv04do5jn0arkuwujn6t7knqnu2v49c035qfjn5jj06bn3mzlul748b2m1uou6trzwaiajp8w9j7mqbup3zzgwt1tslobat41ry5z7203xjm4rw9y5ncz1gkx9pt1hiifg0ufxk6ey5kwn5p7jnfbglz7',
                filename: 'x9g6qyvuyou3ikaxm3i7f2sli6t7bmagepy62xosn97bqhtcex2qq9inc809yv2uokx2x16di1j9l3tlby08vvkztnoofkrweweej4fmumw9mpf4zjo4di4thacwdjxnjpu85duusgmum4tzuf6fp1ldqj7voy6fgp2ime155ioopmk6x39zbqonphyckntzifu704x1l1nnybjc80ai2lxvoftwsnqg3i4gdyijastgiklxhw8ummihkgn1kze',
                url: 'trbmw7svb5lh413kjsrg5fwc98yeqn5plmbo9y4h0q8nfn5gw4hnwchcvypxenclhiy9ph7hp6zzdux3vahwyp9jts6dr6drw6nplua7lk667q9vrhe5b3hct0xxywnts1hxhyladmqakrjkvlprskpywcd05mqdb6rvbk7kic1d1p2ykzc51il1nlftdhi2ejnb8nnjunaymdg18b33nh8sqe8e0bzcmz2oi2smreosesgglcilm03xhu6q0a1scl8b3u5sva740ztaa36kord0aqgx1mtlxxc7lha9zrsjj01p8fgjxfx73w4hqczams0nr4fzzf8g8021rkiuxiscwr2ylg1m7pv0gws6il0cbs37yqur2yavt05slnygm89uid1zmzdq6rldoxznq71rjlc0tubsk1ietb2atlzyplkhm620iiqgukwy4qx48yyeq8x23o33v2l7bjwm3td8of5ot4rd3nzkbjlvodslkncrf2gnyojkp58w3i25ia0ilh3v5bohr36gac6tnsglboz5ywdmlcwa0xs4eqjqzd4n6li94ufy1zpnsa5g8px35nc3jkv2i00vzt3xr1d78odypbrikt3fb3161mvgtp3tpwd537ogzewsnlvk7euoo33oow84s6hdzkb7to3wpzpwn90rcmg46f8xwhezg7dttcqh0mzgabl8ykf7tejqpoo7vdsm67dtobam3laz08h5vmsflwp3dof51udf671xqkx19s0ib81gr8ywc0r6fgqwwic0xngeobrqqw5sdyhunf0o6qmbpswl6f0uo2ob78y0d9lcmsgtnk39l9unyggxa6kds2bat7oszux0t4bh1pumupovbvyk8c9nssd5812zlgges0jabcm65cq3b85wqc6hy34m1xm0n87v409octssozbqfpil5uyq9ywiu1y0gfwo7u6vkblzn7au1wgqtoes18lc2c0ajuaalrc9o1rdy4dew3uskrtj0j1sjx4aqtvurs7eibgw',
                mime: '3p540cab92unxevnaypni8wk07q15qu99313wfe6isb2bdcgff',
                extension: '2mtn3u0pfc38zg4vnjkzm3oxwjdsm1uy7ni97n7d8gpmrbzpm3',
                size: 9467187544,
                width: 882598,
                height: 3702048,
                libraryId: '8e77604d-f2fd-4921-b54a-64b34e773b01',
                libraryFilename: 'b94pksdjxsymew7ttbmpcrr4wrkdgswzxy34hsn3g8pqlm1x5hzksjysw0tlnedszq8zqzjg5aq1qphxvvu1k8druz6m2ujg27vfdok1b5ugufdmp68u8pcgw7zhkln3ncjgw13qbn08l6xw5r7hy2vbjzif88abgunk76gwky6rofl01copqam4mmcav48hpg5yqtpj7mon8h1hswnxuvekz3d68r28efn1owlty435g8hf6x9v2luv2vk08ei',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentHeight is too large, has a maximum length of 6');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLibraryFilename is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '0f7ee8f1-7644-4da5-b53d-e03cd62405fc',
                commonId: 'fab65033-01c6-4b3d-85f7-7fef092e475c',
                langId: 'efcbc1c7-90ea-4bd3-bf55-cba1b0d94b02',
                attachableModel: '9gjbtc7dsi6zgm3r9ezuwpzts5urdsmfj4qlar1lowa6ede760tfvg72qjcpyoi30h8dl1j5tg5',
                attachableId: '1ed8b8c9-5995-4a64-9a23-d34265309f54',
                familyId: '5fedbf4f-7952-48df-ad14-8911205a3daa',
                sort: 418526,
                alt: 'lb6ou7sj3grg3dvvhcxq1p13eeb1ikji96guttmf3zv1oy7m8zzyucel5hp0glfbyyhnogqotc0xbiivxi7decevawhwrr90nokqfo4voz9eremo8riwuupoqjh54omy84segfpvfzdfa1gge6dwzsfpfhzquedw6irmzf6ottiu7ivh1c07piux6g0zmypjggp0jdoylm45j6auc0xz6fkc377ret3k1i5l7jo9r2y7xq2o2iz109mx0vbc3j5',
                title: 'cr91s5sd1c3wtv68mbbd9f6602lx45wyvei05bsj5ll2uaoozo1jd8parbrotb1x6sv9j7dtd8insewsi0ynt8f73f41pdtbapd4fmd36gsf56ovs73qu1n9myims9geql8ju850xfkoltx9mflycpbw2p7gpzvjghf26kv9tbi5nr24emapc6c38bynmh7jz2ofpcq2a4oqxmbkr9lde7vfjxnzjwl3e9dq1cx50voelgcvuwvi0joyh9oo36b',
                description: 'Aut aut eum tempora in distinctio fuga. Eos architecto non culpa molestias aut ut quia perspiciatis. At animi qui et dolorum. Reiciendis accusantium ipsa et nostrum deleniti qui. Quia ipsam dolor sunt delectus fuga reiciendis eos. Aspernatur rerum aut sit sapiente distinctio fugiat.',
                excerpt: 'Rerum rerum praesentium voluptatem iste suscipit. Aliquam consequatur dicta sed eos et. Omnis est cum vitae fugiat inventore. Quia nihil aut perspiciatis at quod illum rerum recusandae.',
                name: 'p6lqfsm72fv17ehdodcozsqhza9ar3ckmuk7bnmwxeep8kaozypr3296fs8to7faomufhaf66un8smn7q4jwsmjv4jwb523kn9k0xk9gv6ve55vk94256mwy16n974q8fysx1gjboclknmbtuo44ehvv8gqsjvaqe7vrhhw44jh3fe05o7pmxokfu3ma7fv1v8hyczm2z5lch5a6ca9c5uz4rxhfkglmstm4ilbu5m3jo1a5mbyjyhxmx183eoc',
                pathname: 'noousv97cotbpwf98r3f7clrhc47cheh612yl557r0ln2wjrn6ov0kg7mgly73b40ijyla3pw0nvdfs1cfyjk8a6ekpev3ocl6wcbpofyef3jvpcrlypq4qhq3381x5eswdlen44ekvy2echivnrizcgpexzat2t43vetmgkznyq1qe7nih2yckmyj27gdqxoimaogza98u42fp0q8g7zher53qfxf3n6v2z7gsqe7f0k9mjntkt4bc6e96rkuubzo3uf5ewi35ro76pwiatgxeffiv8biy6o4zagltwigiyt9msd6lx7m5oded8pkyp02y65yqfr77y8mcbki91drv52iozss5aub72figlddpotaxtsuwxf6it4xfc58zoepw4qftahx0k75d18542kkqj2zb9ia313a19gji079c4qawsaknhfk5ex22d7eq6vh4b5bblf7ntynljemyo9o2uqm1a1361e4pogudsiwetxulicba3ya6nttb3sf1mnu2dhi0djuard7dlmw3a3byb9lqhsd08m2rsu9r48fnru5y0dd3f6vmnnwf0g46t71jix1tdyo6dcvumls2ogusm9avotxoz631u6018h2kyxn2tjbbho296aq7l26x9yc0dba13vbygtmlqfc4paded88alas0doalho0koxjzaz2y2x49t681i1hqx94lsw0vv6o7et23buf0cklx71kssd2bpir7hq7jr3roal4r8it6p1ewsbgp7gsz97f1bhhakiknml3wfnqoqemhdx5lc4odt2kmwbj9hji8wl4awr415pmjghonoucjij7enb6ml6fo44k4rgaay8m4u2lquts6venb2r48hpkt574udoqksxd8d8yhgr6qbl5r3kow41s19xke7plm32t1eh8ikctomnvggw3a3z7gsmgpq66d2yk8ztejlfbhb650wqq9mf5gj3sikn0w6j1abzunqrqw0g69wx402oie0gcig28r6qy6ariehno546k46',
                filename: '7c92vzwb5qyyxny4mm966gm9mjtddchcd6y1ymyw1bypu6gm05b8tb16jbfev6vsez0tz4ej8o4bne7bzsqim97w8om6tqfx5gvln7o5rkc4szk2m8rfaleiio58qmofkr4zaww5vlz34k788ggp46mla1mwk3afdp4i1ibyoo7fnrej42maeamd7chj1hvg1teypxnxj9fkozk9bsm5oqj5a8fer7cguxuixsd6s23r0cwemng14gj8qdjeof3',
                url: 'us2s5uiww7okt11d6agdqrfswf3ga5aw0aivrgkuumuzpzttyed5ezswxo3ak7dt5nbh4cwgccrmxgwt2647afa3sdnxld6qpjou5n7wzq9qvlx0vf0trb73rej37mzxnfj7cg2thxem4c3rp54ru77whk85lm2vd4v92k3edrtzh16pdqhqovzmxqzm1wdxr6zqo9qfj571quthlhwfdrm0i70v5vzwjycckr6h6p7it5ly44vr2w4h7cb7hjf2y7xakyytctypsleijs3vesar5603e3orgp5xfgwdvltrkv1xvswfl8otmr8e9bx05g4m17xe6vwoqmjpvd2p95jy4ugtl646pp006q9y4o1bv3s0gpg9iay9r2hy64c6bsenlmnzkjfqwkw59iafi4gfn3iuot1e8eu4cnq9p1h9w694jrr5jq83ga2j8fmjzn1bkdbhe1kr9mqm3xwi98k7h69tb3gttbhtet39m4rthbtkwsg7acy6g8iof7ym96b3nacw0t2fms5qo6hmrl22p7z05k132u0h3a7y1cl7xyyacgr2dhazes8hz3yctrhk9pkaz6psiwspnz04om7tu2v0a58soc5164zldfdnppbcadhxs85quucrr0z84cytmfr91jz7fv6juktxbxvgagmceinl30y6s54b07tvo4aar1qec6cis0v977xkkrxembzsjd0v8xmnt7pzr4o68i7x1kvkz0z5i3jf9xm9setokqhp64uhygz8swr51ty05y3sej9264j4rvdsq6f0ionjtq6fzh0f2sgqpq2qscmeqa79w8525151i6we04xtrxn5bf9r7l3ggbfkia2cfresbceyq6l2ehcbrmjovytcb8a3giuxfx7bxk3rt85fow0xgrmsl6v3i7yeoia26hlw5wve73nnpn0axvb1q8wqmrv5232gqly2bb53yfayef8fyk4ghurp7zq21rk2mq5mdqk8ahpjfpyxokjgl24amfw52d9hdyt09q7q',
                mime: '1r5qkerln72u9oituhypuvgd1oi2nemx1rnjf3y6ds4n90ifm2',
                extension: '8dy3bhdt7rhv5iewursd79aafhj3fy4294wdbnl5k4te5cqtqg',
                size: 5000994758,
                width: 721391,
                height: 566133,
                libraryId: '8e77604d-f2fd-4921-b54a-64b34e773b01',
                libraryFilename: '44kep0dy6q2vx8e6t93oxn2g0xib9yiqefdtjqkydqltmmstlfkyn3b94i2ubqait5m1typ75sj83q1k5eubx97fyvpvxdq48hzealale3bwnsqzfbor68txy59ru0ou5okhzt4rt9tkqf87q26sm71mqeb78q07aeoqqw61psieqcccby6wclj84sxohszfh691k0k6l89ffzin7jo2jgl6c0zis9bvep8g5yda4po6g23i0vdxmhsn296d6nao',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryFilename is too large, has a maximum length of 255');
            });
    });
    

    

    

    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSize must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '0f7ee8f1-7644-4da5-b53d-e03cd62405fc',
                commonId: 'fab65033-01c6-4b3d-85f7-7fef092e475c',
                langId: 'efcbc1c7-90ea-4bd3-bf55-cba1b0d94b02',
                attachableModel: 'lib5yzmykwm55rmkbd3scvysoow4k2xeipfjae04hoara5uyovrwsq2p4pllv8z9irovbc746vk',
                attachableId: '1ed8b8c9-5995-4a64-9a23-d34265309f54',
                familyId: '5fedbf4f-7952-48df-ad14-8911205a3daa',
                sort: 929521,
                alt: '7at5brpxkhl1vk2co0c4ytpvf0rhurbootz2mm3d2eh8agrmjvj2qlme44zqb9ut3xuovqtsd4qc15gvckhjrjy8pnp0q3treoa9l2wey7zenipy061ml3dfzwp1jgal8z1nkik7s3np9iuyhsbsckel8e2q9katg9y8e61hx7r29yyawwtakrlpuxwdlz4p7dbaqicxgx4avffw84sf4ex34zzwtd5453bg1ea86a5rgy73s2rebktdwbhrk5z',
                title: '50eg8ibdvjoe8rcf0bb6eqd3445ri7pxjslbipas4zy9b7ijwu96y3qi92gpqoxjyczdx72ucxmovwvogd5i6ylmh9c9o7s74ybu7vf3zjzl9rm8iwvx3depeyrvc8rl4vgsf2h9kbl0nglzm9qlmvfq52padvmsc4jwxsv9mowkimhusj52eiykr0m2ry8y6o2fr511nlmqitr82givcokcbxid4qshqe1ao39z9ei1ao3bz5lfz1bjieyorba',
                description: 'Sit velit vel animi et hic reiciendis recusandae. Consequatur qui vitae. Omnis sed nesciunt molestiae tenetur molestiae et aut. Repellendus placeat rerum consequatur odit. Sit omnis magnam consequuntur illum omnis at laborum dolor.',
                excerpt: 'Perspiciatis sint iste pariatur voluptates. Voluptatibus sed culpa quaerat voluptas aut. Dolore perspiciatis sunt consequatur voluptate libero beatae voluptatibus. Nihil neque voluptatibus eum occaecati nemo incidunt tenetur.',
                name: '1uaenhcm5pzmvo0jrhtf30k109zttlehmi3gbld8ubio2sjat5d00lyzlw9zfvvspitmkz1y4mxkr02psatn5zhhrbk40fpmvtuwlogsedagt4xgqk4do2kht9qp98im9uvfd1y4l97sjwg590zw3eg44sdyydamsso3gjbfrljg6j92w12nh16at1idr89g1oxqru1kxybdnewss2jpfo5hj1fgea5s3rh09pqolypuzh26ic2clg4nuq5hhyn',
                pathname: 'vc2f50g33b3ggjqwvxbphomb5hp7m07l5eafw1ar5669jct11k07aojsjb9f14gabiu6jejqqgrdrv8x3lq43azratpyxqv7vhliqbuzlej0sqytih2djualu8xd04pxhpgpabk5p0ezbryz1xe3ibfsf3tpj76qvy8tu4eg0a33wejix42qmdlr9blc4vwy2q048iinjxnfd4e18dckqvsh5h87c4yhpwwr98kxs1gmm0ydz0kizo5km572wu5m3cwlz1otdp3axkrztt8l6zypj9ag34gjntg7q578a5f904zicvjvi41z377oa20ezxbacfs5hbg3kzy8gccoqbyxi3j3y3u231e5y8l1t0wqukxk9505xqftqrscyash0wl6qzyatjf816ayzgttn2verk9d1nlpi61pbtapm38x37te128dzjlduhsnjy6wt2uieq3cifr8xj13t5cwcra8zs3digrkb2rbc5pjz4jclq79a2ge1s25g25sma4sey9sepuh22dffuv2w792wilsmnc1df8clva26ptmg71nlvvr98i4zmk0o07y51ifylegmlb6mwulqd9dj2dd9703t8fiuu1kw686nzfwff8922covgqsl6kookd1f2z8o0wjlb2i9pdr5ggr4iz7pat7z0thmamvvmanligibf6yfe5nezt735r59bjssnksr6w7ppk0p6rf89252q10kuk49k92nuzuspkry8sb01u3yskpy2n0u2sk8uahx9xebgz711e3f75hnfubhia6awocb3p2o7eixw30445oabvl2y0kq6qj8vf0739lrdmwalq7a3yyasb2w62kug9cvzm27z16rp7l7tm928mv1hziwaxgu2tdu8fhluz4wivnjn80qabk7444qmb4ef2wcb6ow2j6j5475h5p564cy1xkbxum1i66y1p2nhcu2170a72x26672s5x88afkqcs18j62z5uk9za1xj3v0pzb4c2u5h09y25faivpd0wt53c',
                filename: 'uz5cixqx8rnhw60etgbc023dijlojww77l0qhfu5j9vfp4uvfdytqrgmvq74x1xyyldzb9uu2r0mtqigg441cswbul94yfuoyiv3l1i2yyoysdnhk8bfx1n6xxjn7cwug1jaa28kwlpe4u80q7qi5ophbn67vbz9mlrul46kuxqfyty1u3nrsb47wv99ybikp864fttfz4ll0g5ede4dcg36558uajimlq8ejig49ndoycgneh6tzz35vqjrtbu',
                url: 'x7ow6ed9ifl0brbtgcb9n08ro1bo4yjwd3fhjlidztx0iye8lmq30zyzonw5oun2g5ctv90p15k8x1udf9gsw82y2d4xsdewx7307qwe49p8lbmmwcm5b2f1abiwptyqa108p5909j4or0qjntpw601z0v8ku0vhqy44z2ki0l52waektjp3j7cmo3ghsqii33av1okg2faaipjhd3oyn93y121m1zo612fcd8oospcmf3r6ed3iboguy18j0u9cywt2zpofq9znt9v9l97bgdt4jkibxpwfwjr8qhdxkw7idxbenuho5qrbozque9al3chuzhyicml4caqvcdhglfobi6cj4wel2ed7adktus4d9it5688sijrvf96396mm9orjkxguoo15l29bom32c3ypya9xdr76pngabotps4uukixkftnk8ynyp07jukwy059f4xl3pi1bop6cbky7j68iuhzfcm6z7ddlapy4vl6a14uvzthj892r0f2s18w5ww9bbh3uacpffcdrtfuw2ftjq3wza95qjrwhc9deigincc2uytrjkiih4v10y6wd1u1et6gtwi80yc9wl57fikfb799yuww9q4ca41x6cn1ssh7phw3ed0bkoci5fmyq923ep60wqe83vxitopbtjfo28ydb5woimspl7k8ljpcdgc5hr2tscinrnxtzkftt32u0yjlnrgwgnfbfznpzch46ppur2pv894d4qcpb5m04zj3t7hn0wwy0rzhv5sryufm85g2imcmr1a1426qmo24gptv4kweo7g7sat1ol89ly9mms1fzbmj0j0lmbnhv66rmpois3w06l3kni6bozo4krxxmuxehds69gm45m883bbxyb5gmxi59ictpz9mkpkfg3fj2z6ka8xsou6ff792vicrkia2nhvg288rf8t1uor33jc6zqi4x2aicuc06ggiurgd035oe9iepd6uov7u1ykk25k21p2w39iuipbh6upgooi97szxecyw3ufrq',
                mime: 'lk5xy53gxvixqmk1b81ir6wgsyp2pk8uhjceoh0gcgly5rm0t8',
                extension: 'uul9uy2ceml0p4oiu1fsea6itrs23djn2cntqgks02csd097qz',
                size: -9,
                width: 788338,
                height: 525752,
                libraryId: '8e77604d-f2fd-4921-b54a-64b34e773b01',
                libraryFilename: 'gnsqhvhujbpyp15l86uj8sanaizlkt3nv0tzntwddqowdhi12jondz060ikrisyde4rqot8x8ifs8of9svly4kugkv097rhpb01t0yahqenvi8uhqfa2g2ot0yozlikeqbv26ndylaeyi5th80d40q5qguheq1xdyrygfr56usxpaotwqhghi37jzowo05tbz5wq8r5qk26wl57vndjwacl4kizpmqqtdgtzdmwbykbs8golzvxa9j902fc6oqd',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for AttachmentSize must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    

    

    test(`/REST:POST admin/attachment`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '0f7ee8f1-7644-4da5-b53d-e03cd62405fc',
                commonId: 'fab65033-01c6-4b3d-85f7-7fef092e475c',
                langId: 'efcbc1c7-90ea-4bd3-bf55-cba1b0d94b02',
                attachableModel: 'n8yynfaiep48xni4g0hjvuz9g1hg12lkcke9o700se7u21luzzwtx7i6hjxkgbpkjfzo2ziecrv',
                attachableId: '1ed8b8c9-5995-4a64-9a23-d34265309f54',
                familyId: '5fedbf4f-7952-48df-ad14-8911205a3daa',
                sort: 155959,
                alt: '5kw770ba8p9onuob1kyz9ipcaglnz6awpexml7ij1gt0q0rnt4vgecjtlnct1xlxktrxzgqx8vbospredlwjuz91l8u7jlm29vqjyfsqtsb8xhbdomrstw5t8zuvgogoi1yuohkkjch0kd2abh9fpznnlq3x8b8h14kd9l90sxb06sjuuphir43fspavygxu0ki2zngijfg3t06vhgtvnoq6vpiu6v8kdhnz6ho3mfo6oc9md59lw600dytslrp',
                title: 'l4yc9yr7b0frsik2tcu2pkb1lseo0tftnprj7426q8h9avqfvnlcbd71jg4dxyynmaow7r3ry1elt8fch07dyzdgs7ew612o9kw94yd5ysh8sy3gtzwyzsmqxmjdgje2sew9cl6zqf7t36wpax7yhgajusskobbocolglu2p4dv5dxiwzq9huvalhylx6b8mm1d0uf9n0ofwz45qllczm3p5fxujq4ll8bvy43roru41lqd2vdyk2j4u6x1fz84',
                description: 'Minus culpa et reiciendis vel quia sint officiis. Aliquam fugiat quia culpa velit. Ad perspiciatis esse odit fugit. Deserunt maiores omnis et impedit ea ipsum. Hic dolorem sit dolorum assumenda porro velit.',
                excerpt: 'Eligendi sed ullam qui aliquid id assumenda. Laborum omnis sed et harum dolor qui exercitationem quam illo. Qui quia quo aspernatur distinctio quis saepe exercitationem. Nesciunt dicta dolor veritatis velit.',
                name: 'o04mda3vz8poeyx8qde5li24ka01jw9ook1svcfmlbnu9b1xtb5vl16gcu3iq5y4dwtgffovi8p78iovj7xsn7m2zgd1l0ky25dgz9kzy1ir0lyg94hm1fi3odrtn3e0gutosevx13zlpei9iy4j7olhr39k225u54g6d3o68iye3rqy0bqje4c5zex5b1v2yu4iucyxmqqjw4wc5qnemmi5crl0als0003amcoxigltj78gd8m1tixg6awknsw',
                pathname: 'ta7ictowxe3kpgkamuze0ho7kf6aiu4yacl63m2nblr0g7h8frrscm7e8uhx6mn6c63j5l9yb4kxme9ouyhcxeououj02dqkolsd6a5jj2ct9fgqk9qqoto1czn2oqrd20rgai0r9bgu80sgxgdpsegh3p9qik71vntex9qkgfk9b8q0616uaujhrl5krirog4gshrtmx7l0j1ttq28d31krmlxw8ay6np9ch6fy44amrzspmtnth39al41lthqle8ngx6gkvry4tpn4140amhx1mjpo2m3x7t5v6kvj8w2vhk23zsr03ll8i29gnrj24pxhe868n6eu7hhik2iqquofodzqy0auwk0776vxp80ni5n40gewvbrz8iuft5sgkuoy4c21swy6d2nzc00y48eqag91deobu8j8bvgpizbit0f7xqen27jz4wwlz6ngqwo5pzm7lacu6fu0rvgxmk9wii8ujq85hzvoa9nqs9o9xaaisjf00c2fywb0vhgsldr1zmoog0e74qz2cnrrfuxyk9zxdtpn9x74otz7jfgnyu7nv959i1vowq2gprgce0moqxn5utuu00o754z5yus2y0v7n0cjgnbmpmbv9ouuqd1308hxwy8t28m2gj6f4lhqudtnvjb2jle8o8ghd09gyqx54me5mqmt2xhlz3t7d2gmsfea1ltrb1fl2rlz27eyeeuhn5cxj7px30p3hgend7ti03nmnguujvf386ou2iqjhq4tsivn9fowgqb13u7xgevrbsh680d7io8po73sqtn0wqnd66q6xttlqpeiz0s67iw3nn6to7ygzzt0spvts6lrdfsigv4rt9dg4yw9mcvp83m83qg5gjgfvp3jds3brix6rmz1tz2mdc4gcve653ockjxtvvdg90ex3m1n84drm0wnz6m8dqzqi7uagv50yhktgn0uxrkjcezkg2ihonil0qd0idkswv9lgrrusayddfojej8farfryh359a7xudnknxwes1ish732',
                filename: '8v6mheubjjmukxlj5cfyqgi6sadv1wbiz2nmn27zg74acwdj617eya4wrl2dgcjnrkl1ehnkfhm0piddzn3rw5q5luoe4qg7xyqglc74wo2h5f9mscmdj9a8rbun9g1d6c9wbwlcc3k7fnz11s0gigntypdbibd4wgyn6odr6leecez1opghqqnl0a623voyk1nqwpwhu8boqrbkhc1a3ngv3k4y3r08hn1kb9n52kshri3v2laq8gdib0dw10r',
                url: 'c0la4j4yf8pp92gfsezsaz3a19ta1ranca598s7la677k5t4u1osy2jezth6tyd8hyarnajjtj4d6kg1rpn5uptzc2gjhdj0lllqmyi6bs9unlmase6mkae6kykj11a59fmygin4jsmoe1i4iyulf948o28gcvokypvcgjf3utlv8zjhbznnkdnvwux5sv9vscn3x7i16f2ircqif1zaj38ajti0gtqfnev8egj4w0q7l81q3trys0fobs5g6fr3reo4at14jutza3fyrpmjngr3bibdo5dz6mcvjl7v74ymajvksnz1rvh59fd04kq7uowt64vay9qppdyeghbhyiwlea71n4eu32xfi10wd1tzquowgyuz7jurfbkxd440bm2w8iifgyvrr3cjwcw9zb6yjkxjeqdsypxojrf1gtfikrmjrcrdtbl6oiwxfitud50tkawwws6jn8jg8amgtehhethkez2434m4pjz9cgu7a9hzoys17ayy018k4xn67ti3e7stv5pesete7ws75dc19n4xzkdv6ei1m5b4eul8mtqq3yd5xaklx1awrybif5ezpgozn158u34y7i4vk69gm0b3nj93rdr3orcv5phfj9qtyzw7r5wn00kl5spjx3ix9c8bbi2htu5bbga7fcz8qnfw7hd1vnfzc0c7htopu6z1gbkm7f4uwjy98d46w8xoqz96vmrnmx2al9joj50fji881p4j8tldu2d5pr75gb01kr7bt310sk1fc3v723r5jm64kg42ec4h4a40dk1oq79dty1wfv15zq7wn9etjf2frqbeydk352tfzpr44o1fkupfh0hvds1mmpkz9jxrnpztn4gp3jj2blpf1nr2haxpymu25e44s7ojhq1i09mzi6tnh47lv5lc8lumxvsbrqpo5b4pncbmoy0z4svqzp9vsd793tywjr3bz98aptsabtkbbv7nmax51it731rdmm22990r9f40x796yk6y20jn8mwq35yqzp49rc29',
                mime: 'k0btocu1qq6jgyd6616ztluvetzuu43nuyuz0ld2erya9zd4n1',
                extension: '7kafxj28lawo8eag42cbxrualgfjlfel1t5tum5wbdd0i0qyvw',
                size: 7051881992,
                width: 508223,
                height: 145185,
                libraryId: '8e77604d-f2fd-4921-b54a-64b34e773b01',
                libraryFilename: 'nivw5690zfapimq3t9d78yhpcvbgqqjbxbzmqh6ffan8jxjt9dcksj0nqxl6rsfyswlaasi4zvxz2lmc84dbf4r2hg26wcpupsiiey1dqj5jfgyxkwowhfh260ygpupiq2dulk1nuvrzdxwga4oc0b7esl68gjqm4x5vrpeyk4ifn9ngntg37us0qz9e4xnf9fa02bq3etnk7v3t2e06yvl9pnijp1o26xwrenl7luyudzi7g6kx7s4zvzfug3j',
                data: { "foo" : "bar" },
            })
            .expect(201);
    });

    test(`/REST:GET admin/attachments/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachments/paginate')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    offset: 0,
                    limit: 5
                }
            })
            .expect(200)
            .expect({ 
                total   : repository.collectionResponse.length, 
                count   : repository.collectionResponse.length, 
                rows    : repository.collectionResponse.slice(0, 5)
            });
    });

    test(`/REST:GET admin/attachment - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '66bd82af-68a3-4c5a-a558-4019a027f6a5'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET admin/attachment`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '0f7ee8f1-7644-4da5-b53d-e03cd62405fc'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '0f7ee8f1-7644-4da5-b53d-e03cd62405fc'));
    });

    test(`/REST:GET admin/attachment/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment/5b152b3b-75b8-4c81-890b-37bb228a5866')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/attachment/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment/0f7ee8f1-7644-4da5-b53d-e03cd62405fc')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '0f7ee8f1-7644-4da5-b53d-e03cd62405fc'));
    });

    test(`/REST:GET admin/attachments`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachments')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/attachment - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                
                id: '92fbbbfc-2062-48e6-a5a3-cce3434b45b3',
                commonId: '9a1b9e99-258a-4d2e-99b5-c2f2d6368729',
                langId: 'cdcbb7ec-480e-4543-9078-72bc93aaa2e7',
                attachableModel: 'jmwkvsceq2o7eqc1ul9b9qiemuomx37wqq42r54vi3t3wlmst3svm5pnwuh6h67abcaomd1di75',
                attachableId: '847d3179-8889-43d6-b3d5-dc12be11b0e7',
                familyId: 'f3ec4a52-5c35-4a1f-ac9a-59a97bb172d4',
                sort: 115228,
                alt: 'l3pi6f6n0p5qegvt0pmd69vcmbto7tvzvp5y7ke4826lzosevp9osb3lihxsi37hkgau8fuc9a0meouvsgzx2zc5jyojc1o6mrvqvrb0zdpncs0ummdhln4rlsmsziqnb3c8ksyl9yinxyz7zbz5ajjtsc4yq6udji2ur8qc4nl15q3hwd5xp77a4vobna2ea1lsijyxqyts9et8333ow9btuc3ki49ha1kc1pnmi2ud0c8sojmungt8ujzrs37',
                title: 'lc6igpoc1l8zmw6t3a8b814iy1ki3qlkzurkd1wi5h3kixl681rt2jbvxckez2mnek3hacxrlhq6qpkl0plrfmci2bujzqzx7muas65hga33907scrh5c49ikk4bnl4r04id87fz9mi12ahjz1rnyyxiv3k7q5djyjduvoioq4mvdlckzfpokxciomawsk9no1exi16uvfebvyyw2cd4w3boyi8no63wm7oz53eybt5jacwhjxuk6b5v4v3tcym',
                description: 'Occaecati officia ut facere molestiae sit qui sapiente voluptatem voluptatum. Eligendi vel dolore consequuntur officiis minus. Et quia est excepturi consequatur est quod.',
                excerpt: 'Neque aliquam quo occaecati voluptas dolor accusamus quia alias ut. Non in exercitationem beatae. Consectetur rerum sit laboriosam aperiam. Iure voluptates facilis enim deserunt non maiores. Non corporis dicta. Distinctio veniam non temporibus eum.',
                name: '2a37nveulubveg0q4j9erw7i95j3ddg1gzbloffaskb7q4bcj0w7gto951h2a9y8f0301ejb0s56nkn663ro5fqwbtbycy6qhuhi77a1hbgy36zaw1605m54riqoix9qhr69j04hxhue8vg88p5lmxjedlk8wtghudovl9vioiru47kjg70l8xblf9vssu9th5lli5ozpqc02fa4yioilmwjrs9urr1eayjwasz9fkxr9naqfo3pah2ogalfom1',
                pathname: '3l9t2uvepk4f0mbvmjt0f1leb9ejeyx9jiuyp2ckgj0usn4inmm4lt4m593auj9at0gdvv77sw7y1qthbatnbjcedbu14701upfc7x82p7njv1x1ni34wiluh2caazsngvcqhf8cu7m9ezzbq4zk6cwyefe17nme1pfe5dlq1t3k39r9nynhdpngupvyqjwgql2zjqkdy552vkaz1dafcmzgm4msi330fuksl3r7yahxfp7gvxndu1ctag7e7sz7c7l9apd4t9ytwx2361wmywbquesl4xikybuq6hvtolb52ws4oh2kcqme5u0rl799d8cwkynvwfxzb1b2h0fi7rhf7vmioborkxyb1470qjgf09wbn6uo6n6zl8j45iypve8xzkx018t8ffis23kgh2ukk0cm2s3iaxcqz2euqci8b0z88s2fiyp24eatvgd3ibwzrpnbpaosodmv45ktpw0daqlu93bweyx6uz49ypu0bggogj9qv86pbrt41dw14i48y4blnizr6jvw8aix72tht8r1wn3o6e84a7fm8udy169e9zss089loypb0bqo8dwpezr7ykxvh680d5i4x7ep7vfuh68tm17olbw9mmaor8sdod6wgy6ivucbm7pty7651btk6305t5b2h6qvhq0r327r39kk81c0tgjsylsmcj6ox7nxrp8pl5zyy5rz2ai5dvetm3tzlpc0ykgc4i4fm0pz7upklx6tagb2dznwpzzpr7ejt2ggrypaxfie0kcvzyz7ik6dpr8wspijgq8tglwlsj8caj0zn3uxso5oq4vq4up8kj67uz60q8alh2bhgseufa8xkuc0y7lgokk229iuvxdlxxfw43srul0x37b1gndtete9oxkg0z9w4ys5jlu3rvu69e5m109o1214557f56zj84mlsurhpy8kskvm6zl4tqu3f7remitmguqn0hf7obcuu6obi8hnixvyup6keezqy17wt8miedxhpfa9heib2wu47nxdq2a5',
                filename: 'kbcyujmddwskx0b5c4mqvw6ddivqijsp7voneyvt4gdibf8l794emld66ie1w2egvai3yu2emnd2a0u9ph91ghs6udxnhu7nsvrdrhggerfv2l7q0vo2uzxuyhr0km4sj080tta206y8vfzoo1271vs5vdtxz05ma321ti9dljgabvx6ijnpupxx3tsn5rm04o1sggouxwic5r71udwvbnx6xum6ynz8k3f1mt2373g22a49282n8ei6cbuhxvl',
                url: '4as90lg1wwalhe5to8t2wyr8hydqa3fnhirsxil1ldhrtapcqa9bcvonx75auyi9266jyy1wqmzbow4da7w7bmzkyhuk5qm9dtpkxphe3u7vlrhk87wcmr2abamon4na4g38zd79k91iptfv8tnxrjiq4wposg50fevnp3c4xrw8yuccyg7x52ax8j9a955o2susn4u5j7d48ql09ak4cuxw9fphee2jeqachafoj9r3tc22qymm1a7t3ltn2dc2cpkifkigd3h6epv8j9ohwottpiimb35i8m8zxedffwwflpvw2kl65suaa3jx7lwmwsmtphajse7p4n6pz8hyoa3orm7yg83irfdzf2sz1ymjl99iz126u9iifyoyixxuph1msvdnngvovnw3an4hsq6bzpenh1lo00z4vjadzo87k9lthjqm7ohbvimpcqqy16zsan21fc1q0vlofg85zovqn4r1qecf0va51k6zociaud2dhwogdduhiafqs70ccfekg13pot2d7eenvdbt78m0yy2k7qvzjiq2tspaeswaaq9hajcynu30l3c4bgd4bh2s7vwh48ucq8q0bjvj8t06xikkq1qz66vxggjd1mpqd82pwoicc1zm5er8d7vp6wauiw482ut6i8h7m5e86c90xaon6nful0al94ihjq224xrxi1t6zbxcj00oqs9n4yy9d3e1frixa9zbe5flok6amn5btry1jxmir6ad7eeac5rqjjynng132erdxl3evrkj7daedqoay86hvfvlpcf0up76ms01ejbzewjm9ax5t9fo75saa00b5f5717rlr9ahycm67boye5ze6xeqe5p3sk05egi1oiiv0efb1k18ex3sgipoemkfwqsrrsqlfp4sroxoomjgbgjrmnvy0l1agho9hipkwcdueagwhzd8nxs6shakp2cb6xbimlvsruchonco5s1zk9fmymeay6bovnev46nmrg1mp7qw0q8ea2kt8biqy3grai8h5vzb',
                mime: 'ci8rnj4gqodk83dnjeazb8p9hn4o4ogdv9yhj2rrag8lugotqj',
                extension: '4io39rkzuvvqza8j3ilnlevod8odq7iusgb7ms6irzbq2t5xvk',
                size: 7158751713,
                width: 412786,
                height: 245857,
                libraryId: '9242e355-95e9-437c-9492-e94ad4f1f2df',
                libraryFilename: 'ye3xn1ttpk4sxdix4s9eh5vohsq94smhpgzhualzh00b1h82t9m1mrdqkxoxdsnad8a99c5d7s1clbmvbjd9vw7f1askphtwevhshn0wkvofqbwhazp3vi0j2s36kwoypaewohayjw51sewy0y54oeqz6ti6vxg7oiair6v2rp5pf4nys030eazjrupp2lg02shf66cqy0qipj3ggrmkn58hg9kup2pefjcxiab07uzvv24upsy3p82emxqz00e',
                data: { "foo" : "bar" },
            })
            .expect(404);
    });

    test(`/REST:PUT admin/attachment`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                
                id: '0f7ee8f1-7644-4da5-b53d-e03cd62405fc',
                commonId: 'fab65033-01c6-4b3d-85f7-7fef092e475c',
                langId: 'efcbc1c7-90ea-4bd3-bf55-cba1b0d94b02',
                attachableModel: 'cxxmojzqgn98idyauei4ilbns0z2sdbiyhjb3gjdzwny7rs909t09fxxyhxngz6n08monkt03nk',
                attachableId: '1ed8b8c9-5995-4a64-9a23-d34265309f54',
                familyId: '5fedbf4f-7952-48df-ad14-8911205a3daa',
                sort: 442704,
                alt: '0o6kww37ueb1i4ku8eq0t4257xd27ily8sqcxiisp296uzmv3c7c9npeljji3xxi74vv7mwbrm39kjk5pgcbasfz99ob0ljsds1l77njzkr44blqdjphafxr642y9nlh1t4fjgyjr6cpk1ddrga45nu3uvm5wh18k2yx607b1psu6i4pqr1gp6u24irom7dq1tc3qky5e0h0kqbkn1pqthjd35ab9m2m9f3tiaqf4d6yf5uc1satsnh8drv8u5s',
                title: 'bml4fziujst9ynj4un5vev4zp21zgdlj4ozsix51gx7wlzluht7xxma50kletc709p7gulsak01gssm26iyriep49lcku3nl1qiuxbwqsqohyvlmu3ux359rxa5ifl4dykoo790ya2kdcejx9we2gqivnd46pzlmicpxdhlry78x6iee86kvgh8gwv5qd5geq9w5slidizjsmpr94kyha2pc6w21st29r9n4wggue8f5e9wrn0idrf84w5te6ca',
                description: 'At quibusdam minima quo voluptatem necessitatibus. Harum et veritatis reprehenderit ullam veritatis odio quas eos qui. Velit occaecati et aut cumque. Qui alias accusamus in veritatis quisquam. Rerum tempora eos nulla repudiandae vel quos velit repellat est. Et voluptatem a sint odio voluptatibus doloribus provident.',
                excerpt: 'Assumenda voluptatibus occaecati voluptatem rerum minus in dicta voluptates. Ut aut debitis quisquam voluptatem deleniti. Perspiciatis sapiente et dolorem. Recusandae assumenda aliquid est porro non deserunt aliquid. Debitis quia dolorem delectus et asperiores. Facere vitae ducimus iste dolorem est deleniti ut voluptas.',
                name: 'yxdsffwf1qclduqvu5v61nytkwjy6mwct1rbis0fyb1lis78ych0zi40lb5ffhxm5d6a3qjrexxjqsz1nk06wpt5ptp8y5i4qqa9s0jr8f1urtvcnoggin3axj2iwf8fkz2npkm497m9px2u5etnw70w29lm7v93qgkfekihzwla89zqjt5vapvz59x76km1zkb5w8nj2kk6vfdpl4c5yqmws8lpj21kkdknvwqnab4fi4bepr0zjg6gucjh0hk',
                pathname: 'yykaczs7ccvhsauhj56e03m3saejv5anlfa5cat3p8b6hxgajyve08qx6aglz851sm8mz9ubw2uotrvsid9wl47yc11doj4zqyqquo4z3jgq1bbm0h5mv89i9olz1pwclryhidpz0nl4qmrhnalkhb20jvhpu4a2vie0v5m8k40091ko345mu87sugo14fireio7cokon3xpjdl7n3jmktru3sfz5ayaje35p9vz4cc5w803z6i9w2tn5eivzjhuuwplgjhj8vb5j3mqbfx1q4b28pmchtkmoln55fikpctxpt9khujmxxs1il2n4puj3m5v3munzs00yk21v2wbn6vfihm6hogkcb2ay3gnoefsahogro5f5wxpd6xy8qt5xjk0379b7egeo73j3s7u0fuvf1g9gnaftx7hfjuy6awoe1viy6pnxibsmekfjztrku0uf4pc2t850s6b2u05zhckq2ol0kz9zjq2yj3zvq3vmrz97bpgnegzk3s5apnmrnc3qroqn1prsxgct1yrg6fkqr2gxz943lr26mx7l1zo86x46xt2w4odbqp58ows35dxyvhe058mrtc60m9kkgbgkyvuc8t1j5ggy6eudp6j6s8oxdkyd8g7vx278qhfh0ksgmznwm2ytsboio7qxvhaaevd0s7j9d1vc31l8oddz0uwgd1x2t7xfpemxalhfv9i3cl1gztlvhmgnxbsjzd3qoqhb4436a2lc534po6jx6z36i5m8slu3l9g1x2vqr7k1934wisxjczffr2pb4lc4h4b06r2ibx0437tmm7lv3smknmogfmxikphaj96fehcdlu18oyrgxarmxumvzpa276g6kwvxbnkf9y2z7375tad2sgrp8himmeq8no70nylcsp99z0749xzn25orm3h8jtdlsfiilr0637l18dhouehyerxa0x5ir8d1i9hnhuzyz9tuwln09em33ln3uixo74pd2mo0a2iyigor8vl2gde26pwnnc7r6sv7gbt',
                filename: '3rjzxrptdvrgiabvq8mje57kmmbwq5uhdpl8bqi2ntlqi0wvo4kvla49s4qzumno1pu9wzx1ptmk5ut0n44rsamcvlifgknx94df35vnf32di9w1b01b0y6o7jmlduz9wexhjcyulaf06bdaxyq4rxx593ygadm1we82g4lmoomh4jmiq5xuhu1fbb7wubozpwqgeklarguiby1erp2rgyr4ro83l2js1vdw6miqz2rq3hw6tu96pnlqsli18gd',
                url: 'w40h9uij9w39qns2e1wnnkp5dalqfdiqnro7h3gh912su5e2h0dhcahkedc3f2l124ohgeqi65dkuwi36ty0ztz2nx2o4ykc2jsr9f4qikilltvff9r9mejm7un7tjcyrsad8qvxyjc7asu2afuzz60zsmjzwmjud6n1qkht6mltuaydxob4qiq8ez6q1ukmmuje38jc8pq0bimhucb3rby2gg717w2gem1h150hh0e3xjcfkumj3a8d6gtpf5806bgedc0lr1cnb0oes2gz5x5crzetg5uzanox6ddnexhwqx6hf3fxqbfz6t2axt4amb0dz0e2jjnf4rltz95pwii8foyrq1angkb6n4g57h8kg0yyxhz55lzgkua9ppk2nzov050m4lsnst665se6cnammre1d8ofrninedy9wcif23aj0thfx1k40lknfxjof3wbvgz41t0t0trtfis6danh9phktikstk9gxqxt6ie6115vji1hqpxc5a5egyu4pbiwzyuq9nz30ya36rf8ajlyi9wbvni6cvmcgtq1al0v2oxrzkaw5tz28ve5hi3aaimb1w6yekexvdgh5yaxxxylw9eqv29shdyn6d7egbjydo87vbuccaioq2lojm6tusit2qbxy1bid1wknnrpdoyfljr9j4tu745lou92rljrs5l53zpexlt0yi25r90okhw5os2w4fknvwlktjdi5iq2sog8rjycb4fqoe747oqmy8nok0zo3vc898tuzjmv5hrznk2nqrjepd9qdsqaqcrs8l396ayy57fj4tkg6r6ykvcyf4hqa7d5kqbi3sqmpzgbcmms4x1siegg9s2nc9ioudr387z1zf11qz1843zfsxrcp6hmix0jjmjgl83v5nmeyjda79kcpr15mjbbg4sz1wl4lvd2d5idtgv9ea1uynkojemxkwe9wsxsb3245i2b8blvqetbdordw2x7u4hepv0fq55fduzgnkb3wfqxznumo9576di39qex5tb5',
                mime: '64wwzu31t7lnctaea39m1crx3za215q835pjuw2vjtbhd7zp51',
                extension: 'ii0xllyh9ghd5hubwv1iiyf4to1kzmd25mjmf0htbttku9hftr',
                size: 1853194930,
                width: 801522,
                height: 280279,
                libraryId: '8e77604d-f2fd-4921-b54a-64b34e773b01',
                libraryFilename: 'w87awddl5f3zx8jheskx59v28mpskeypi81nfwqp56ow4q4goof8hhotdse4txrfpes7hj5w3rajmsf3dy67rrxfbd8fy079m5ubeb5wks8mqsjsnk2mauv49qw6g0x87mv3uh85h9udl8du63ev0x1mpaamk9565x46xxc6uxl4fg09441umys1744tmhl5oqnh61mwmo2c4gt6rbkmmdtrtvasp2cv0gtw60yij13b6dyr37671gkirhlq4t2',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '0f7ee8f1-7644-4da5-b53d-e03cd62405fc'));
    });

    test(`/REST:DELETE admin/attachment/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment/9e981106-f70c-4477-91b3-26611fa6c008')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/attachment/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment/0f7ee8f1-7644-4da5-b53d-e03cd62405fc')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreateAttachment - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateAttachmentInput!)
                    {
                        adminCreateAttachment (payload:$payload)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: 
                {
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

    test(`/GraphQL adminCreateAttachment`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateAttachmentInput!)
                    {
                        adminCreateAttachment (payload:$payload)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'e4c0548c-fe3e-44f1-a028-53f33d1d4629',
                        commonId: 'fab65033-01c6-4b3d-85f7-7fef092e475c',
                        langId: 'efcbc1c7-90ea-4bd3-bf55-cba1b0d94b02',
                        attachableModel: '0iynk9tn0s6zsf1tyrzcdqtskgevg4wq5xdvtz8z3ic33mouoemdxaion244d3095wwbqw20rsd',
                        attachableId: '1ed8b8c9-5995-4a64-9a23-d34265309f54',
                        familyId: '5fedbf4f-7952-48df-ad14-8911205a3daa',
                        sort: 249532,
                        alt: 'dwnp01u2402h2mpeetf79ddq8fn69dru7gokffg35yb4h4dfn8s0w9gkan83psdkfp9bvj8dhmrkicylmggu3n9f2pyg745n7efdmueen77yxi8cl8r422ax65prtbi1d9zyx06a0d64w5ltyyf23mpk0rjo1r8kj5agbv821os5e1txerdca3eswfe4iurb70v9ab5vaey6ha1g4f0bou42qowge8zrcqupa7eqifie1o26uhix7w2po0n5d61',
                        title: '4vcgd4zpuzyfn0k8smy0y2nm5t3zu5nnjz1vqsbvlp66tqbznqo2kc8hy3vu5gkrhjmrv3zhmkmynd3iafg8xrbcfqi53en8fjm84bfv30yntbugponot348zvf0z968zug1c5rwolb2ts0xx3ytmaqjitawrg8nx9v0zpxjrr6k0978s2bmjc5owydosjzwvwz31pfxriglc26y3p5ll51n66ck52pvmc5x95a6us3kszrlrhcobns0olhbaw9',
                        description: 'Omnis ipsum dolorem incidunt. In quia minus nostrum voluptatem modi ut asperiores. Suscipit sed quia ut ducimus exercitationem vel ut.',
                        excerpt: 'Dignissimos reprehenderit et non tenetur non impedit optio deleniti. Enim nulla pariatur accusantium facere est illo. Fuga officiis vero ullam quo unde blanditiis necessitatibus. Voluptas quia tenetur veritatis sed illo.',
                        name: 'ddrkdn5ii9japvapoh8t3trf55zl7grd8dvc32tk34qdnrdc5ih476zi4aweswwe2ycdw5rglx8s1zaf19wghmdaqpfoevev2oqfiobnf0pwpyqc1kp413sw3yjyjp7a8bpjoej7bmjji5yor9omga2d1ktbwoyopbv0qy6l7hzxxqbkz0882v9awil56nuym928omgp446qio1aj3dmjzv68dt3nqg32it7nwsyz7jqnhm7k00chy67uik8yqr',
                        pathname: '2qbynp38e21zsnyxxecmb43se7dp8lziop6mc6x0n6wdenndrjifugrddl1v9qth7u0bfuxd53j3xw99msesen3w1ph444wz2f9dyq34neftxmy05qxj8b6dm10158tl2sd7zauua3kyqhb79egy9m2zp86fubtyn3obcn6v62zwygrkjvyqojrsv3zne0f9jzrpd6td53vdw1bbl44huwbp1j9fn7zv61qlu1gmtv90skrmve0goru0st6cuimx9i5os42ofw9b166352kdvfgc2f0r2p3yslid7dgmzz6tei16wpuz4alnp351hh0pgq5chv5vtt2y8ltslx9xcmlhidfeet1w1ssore39eo1w0r2ddcmjkxmedj0ykwslt6jmpqow01l7co1um0k5dvg8ub0k9cheqzht41b3y2b6172tiwtpedn5hbs474j7616izwspo1f0j5qjq3xk26jmmm1kazyktonzy1oq67a1metm2hujhcugu4t9pgil6hdfsr5mupmu8av1gb02l13i1ie8invl4k1suunqzvc14wqhpkv3svgenz9wjdm1zvy7pglilvjx8w2w3zb11lp3iel66mlpghe57h0lz483f75lc3qv2f2gnr42cjkwgdfhbysie2w8euy5uu5q62qi33kj5mpac8hbiwv6hlfn02kmstiqx3ezsm3ng969yhutit1j9q9q2vehsmwqfzdhd8umllk6vdodjkxlhhfs1tq06d6yuy72038868upo6apa3e8xg2swdyim67gl4m5xmmmes6hat40c9kazpqosiljt24c5o6f2h3uit92pmi8q2n50n2e8241ro4qixaor13x2y9fl37bwzkx0sk5w73zta2lc3p8icqh7lo9qzoo2u05e4ydw5cxujbr0i6hi0d0hrvp0akgwdup2knrrb2erd4jm4zinopi73ihfr65jicq9ch2j987m37u0zrgwn14m8ltxt4l4eeaoq6dg6vckd1oi48fy5cmjc3n',
                        filename: '6docmhgz8tkeu2uki6x1ju2phckb3wgh4tbnfq58jq393c4cyb9odh5da2kj5dgcyh3hywb19wzzp04347l1he8yvli9ohsuzg1tffqvtw1iyjlxgg4cttbusm25y7o7nna95wotoe0gvjcqg8pnmjh3ccm0gzifyiblb9epulmdtwdzfm3ppjqpgzr9lizljfkoq9h3v6c60jefyhvum8cryhr31zfkizscn7d8qdmte2yagbvljoxuu4ct3yk',
                        url: '79i3qw0y4kx878ipzkzgsnd1b03zwxhiw9rhvfjpk5tclwirsbtt6e21i3ybny80nwsqlx48w9i7e1r3b1zcfblazbavry15hvbzazdpdtlon38teooo1z17bxb5f7bjwdgsedct87u952u0gm2igugq9ai7vex9z8wrx6jfb0sp54o6tdm3dwi0yn0e9dakei04cs6pawbln5g83pwy6mg5eljnmp3mb9hke14cvuapptik97mfrsnki22gjhga93qrly4auahx6pdatfdnvj7r45gk1wwo6q46khsqoxj6ac9yj2iw57i1tpfzj216zl23hl4zp8idiny6wd39rf9flb57z1i4hhqldtz9wvckaqo8940h4ul2vf3b0rmnsvdn5r6rtlz0339eu54g8f3jrikhjht4thx48p40v2nw6rak26n5rmhz15lg66dxcvxrhv216grtsupwlynp17il63ueily8nt3j9s0pbq7eu1qvo3lhqfw52witzpsqpmv3n4c1w7c3oryw7il8otiitnnt8nquodi86blzdidt2c3we9986gw5klagkzhujasax41fvz3654fhejdmxqazt8ezzr2r5fnnrhijcimoslptvplj8r6uez6q1jgpbx5zk3v1mxmji4tub7v484weyjpquztk554owffdk58v36nnflce6qhdzxiletittgsm9fiob0y7rgyk98cmvpfom2pjicnsp557qu6g3qfrq6l5bzu3aqrkuvgyagmd1qvv7rkrpk0k718b6775sz3b8lymbu8frn4mbkkkcos3sxa6ckjzgmr472o8lab0evcml41vbm2dqcexme9tuuzzqinjpkk8qnzzqlqux8p44fi53tcxy26nhpch2di4co3zsbintwjjbrjpard8pbjox6zssu6qf32se50yoarady2jl3jofw0nv44mlh1itq8hdfpf0dxch0ov65b418xq0mep0owsp8513kcsisqwb6zmovuaqbmagcyyybld',
                        mime: 'h1j9ung26lvw7rsm8f7ufenw97i4bekwnvkbq60wr3ipe2dwko',
                        extension: 'lbwt3ut5a8wl99n5917ko8klqubwlw33dw8gaor34b77243jue',
                        size: 4473221936,
                        width: 681681,
                        height: 782917,
                        libraryId: '8e77604d-f2fd-4921-b54a-64b34e773b01',
                        libraryFilename: 's145olcxhqye5s2kyjz51amsdjp1dcm4yoy80a16k8orlv063zvuuflet146bnrg6h4o6rss088gsyrtfin8m3urn7zmrv4ydr68nebbjuqv8ehr0s6jcziktfbgnazpyfwtif58idj7dqve4lyx24atx2re604ditlf8sicjlgn9q1l3wr6g4a1rnxu0aduecnp3tfcvpjevq1fpxyz855bmewba2qy73629opgygfd7wn7s6xu9b8x035ja1o',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAttachment).toHaveProperty('id', 'e4c0548c-fe3e-44f1-a028-53f33d1d4629');
            });
    });

    test(`/GraphQL adminPaginateAttachments`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateAttachments (query:$query constraint:$constraint)
                        {   
                            total
                            count
                            rows
                        }
                    }
                `,
                variables: 
                {
                    query: 
                    {
                        offset: 0,
                        limit: 5
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminPaginateAttachments.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachments.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachments.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminFindAttachment - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAttachment (query:$query)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: 'baf53e11-f7a1-46d0-8f2b-906f6b85828a'
                        }
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

    test(`/GraphQL adminFindAttachment`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAttachment (query:$query)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: '0f7ee8f1-7644-4da5-b53d-e03cd62405fc'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachment.id).toStrictEqual('0f7ee8f1-7644-4da5-b53d-e03cd62405fc');
            });
    });

    test(`/GraphQL adminFindAttachmentById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindAttachmentById (id:$id)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '376a2e48-a5eb-4058-881d-740ac18afb33'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindAttachmentById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindAttachmentById (id:$id)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '0f7ee8f1-7644-4da5-b53d-e03cd62405fc'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentById.id).toStrictEqual('0f7ee8f1-7644-4da5-b53d-e03cd62405fc');
            });
    });

    test(`/GraphQL adminGetAttachments`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetAttachments (query:$query)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.adminGetAttachments.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateAttachment - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateAttachmentInput!)
                    {
                        adminUpdateAttachment (payload:$payload)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '8aac29d8-8c50-4400-b1c6-1f7ce97409a4',
                        commonId: 'ee9c657d-5bc9-43f0-9489-2dfa56b5452c',
                        langId: '61966310-ef5a-4ef8-8420-8aa42bbb1bec',
                        attachableModel: 'y7v54zx074fw5oxwxfbdpe9nkaqcv0035m4ndggxtlp13ys0ziyqc6yotlu3aq1zru1vn6whuml',
                        attachableId: 'e07f66b1-29be-484b-b0af-ec835905b5c9',
                        familyId: '60a773a7-fb8a-4fbc-a287-81b4a95760e5',
                        sort: 781703,
                        alt: 'zd6rblz2ef77knc3lbw1c7938n1bhss5eev2ezpria8y6bz4z9m657vy4f13z9w1heviucv4dgo5hu3k2fgzzmf2bsxg9ovbtruko81xkfrwnhli5whu4v0ngv8d3dalr7lxe5hqglf0ibons1xbaty1o6rn388jirah19l3ine7bj4irsszov3mnqprfy3meso3omrnfjf609jomqyhdhy72chyveednvmx4fz8simkceucpcby2gayivyge2r',
                        title: 'd833okbu1y47rpysx6iskp87sdp3r5dh25y480fn21gxbmxfuvs7rysbsurl6uns2bs4cjor3kdg3qqawfk7scworg9887qzi6u56wz9lq21zu8yy05qxkss6wzny3bfy34yq80frbpgprjnmgtouy1yiqf479l1prvuk0pygv8k4jocth4pbgpehs83gxe5r705cg6prx34z1x0va84b88g84uc2l8sezw8h7vsshmhrg5i7l4hogozjrchtsd',
                        description: 'Delectus nam magni voluptatem illum mollitia tempore. Quis nostrum ullam animi ab quo voluptatibus delectus voluptatem. Expedita tempore nesciunt dignissimos voluptate reiciendis reiciendis voluptatem. Iste laboriosam qui ut inventore necessitatibus tempora inventore nemo corporis. Adipisci eveniet autem aliquid quisquam et earum dolor perspiciatis.',
                        excerpt: 'Aliquid vero voluptate recusandae laudantium est dolore. Dolorem et et quae placeat harum eligendi voluptatibus quia. Dolores dolor rem ab aut sit sunt placeat error.',
                        name: 'bbfv96vijvgek8vmlm4vw2dd7whux8dd3j1ncqmrhla53jwt20ma6lly720f7i56cw617cu4l2y6z58nd1b4hawo2chq96cfu416abawn3uicou14px8sbjbn1rxc1e9oddyhsc7x4qw56zyg2a0xc13l1ali9gisym461oxzns33rbar75xgjbej58qidrnxb2p60lud129hz5vug5gxbxc7rkslv8jnzdxkfh090590375762jn438taopqnr',
                        pathname: 'j1f1kwqjgnmca104hyz5yl9p6s8qutxdk1rorpfgqgwxqwlzw9tv2u2qqb6l7261lz5qb3om6jdi10y2wxpunfdeii139vmabo9cgb85crz7ge2zpqjivrfmufi1yk2bfoxvduebhw0aron6ni4eghb3n4g07wo96h2epy7venkruu8xezkeim8ankyvkltz65d22fdicojplirogt5473497zo4va84l5fjxk2z32jwfnwa509vqvtq6trhgk3ik253hkrit2v08rcp1lhyi082xtvm8fbu416e0kgp7eu0wznk1dlcluuqe5oogjo43spjaiifabiuqaifybmmqgzwy2bxeef3d36tk3dnbd2iauy52x7seftsvp4y1gdmik1mzdocp26ljzpy6i5mqm7sbuwr8q1prmnei68bmcb6d5eetrayprrcwybqmphrk538o4x3w7kq4uwit20mmvl05qiu6cp5qc14jrp8255wqlvf9gb529zvvmsetuas4otwhdo0v1bdot1lic2iwsco4f0xbneees277nmxjo317c1cfgzefmorr1gdue3olnyhh4wegrlkch4ihkfebp6w5e6scmygvyt7ne0sfiu4s9qcrq21j7eqmx6ek8v2ac4fj40leogckqc50nlk4nq0j72neklgupy8vd3xk65ri8l8wpfblig1175qy2f32t4m9h8qus3aeuczq5yrad27t80ieoznflvl3l3gwufv0vlvpxgtwl2tbex6def0f7xx687l9f08dllh8g73h14wjk7ofye2r7tnr257pysn3s3snph2iz5mb68iz7287clf1zyqauuzrdd7vld5hoj4mom0m2dltptq0eycsc7ll5pn83ih56equ1tamle80dvmi9uctwftyk6l4ubaoe6ycghmbcx3qd47ugn34m4al4hkmhn6o7uil9bcrzjzuuj0cmotorxto0hpj6rlouxzi3nkecmancoqa0hahoq57g33dcaoqwf45rt0hg3h',
                        filename: 'htkomrw7dz8bjkwmukj4mtsv5wvehqhkiq5rvcimx42jyso99ai4m4enuih3x6mjzenwqpnyawzln21kt5nagqrlc3g5t1wvzmcodp2nmp70ylqoc5l3gy160ve4efblbj5buh7lkyc1xvhlk89lp2ftk2dhy6h6bfromf84kpmb2t4a6dsaoi5rnck36ysxgmpxdbvgwjiondyxtvoiuhuygb9uh5qxhmbnztcjq8034kxcx5nkstc7emlm8b4',
                        url: 'jfrbm784pv0p4n8r7pzwgyaq4j52ld3psm9v7wgjr8tx87nfk4ig7ebq6bval0gjkd9a8jxd48m3iwmf4ylm3wpyfmqrlh34pqjm20cgsi1i3zxkzlzp9fcjwvhgj0fi5vxl20enpzs4dl3v621zvkmukwt8m43r5ffp1fj4y3huce6fhd066j30igfo0u2ra75eg51u3mxp0hnypunkb7hux8mlywvytse29grj20l40mplqs1bo6yf06f0l0uup9wp9smuo57ey3su4dfxpmly85rnggo3snox46eoxvhp6rctav8objj88y67oipo4h1ec7wa2zndtw9gsohfxijkf064q555tinp0lkc2fb239rv3i182j7bx2aet6792s5uxcbzpj9ogx2y9w6qn1eir25dcoblo3sar1q93ve0pw6hkbiern5qnkkflrqti7otmlx0bfg2jq5f83t106fdxjxcf945r3s6e0uein254k71dfhwxfw43yji6d80qkj1yb6glhivepzhlfxax3q0a6tbjpwsju7wtw7jukuqhi802no5pls5c98dcepjir8g832ybquf0hetcczgs8upvrnt2zco7tnyiw1qbewccize83ptm9qom7z9yt7gfp0tvs4hjlg8gomid5pv1az16kuajav8ctmr2i9egvjl5eh2oca4cp9r2ejah7ce6tq9f5kfyxqq6khtn1wdcq20yyy0fbt15gih7d85grb4h6yt72fdui3z6hqzqoymtmakk6y9lekcggkvdwy4537oaspzn784io9o6fv3795s3sb7op2mh8jo9kciy3ewqrcihs2bxzi8hz51tt007f77s6unngmrit1llatcv4k3uquagxhpdndc42e7cedmkfcby1wlu19pfyb8cjpr5x6h5emmkd0d13qdo2jakkzny6vjrf4nrezd7h7hmhar8r3nhxlvf61mgvewt60gmtmh1ss0pxktv5rz2im7ob93394wf9o49q8w4cq8sgsw',
                        mime: 'owy5bfqjz2h735mor7991eut9w3k4u9apulfbnk89juc6qd3lj',
                        extension: '6ew2d2ggj7oao9e3sq4upu6pw9etfkg1m8i50osz0a7b6ifpi3',
                        size: 5336447984,
                        width: 996634,
                        height: 983247,
                        libraryId: '43d16e46-31e5-4801-b911-6ce66a63115c',
                        libraryFilename: 'fgf9wrlpmy3npigomj2kxhfsjh7ogsqktzv4e084zbm29fu68ui3bbfpw85a9dls9wsox6rpkzzst6bznqex7q5kkwawlvfin4gc1fhz1fqrfrniv8c925ww5vyjipg8bnrrcn589j1wgyo91xodcofkokh7gwapq02173wflo9prlj5ufdhw9gtnyblpe9809x3400hatk9gknnlar2mlgpo2isrie5s6athxus108sbjsaah8sow0amabdq7k',
                        data: { "foo" : "bar" },
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

    test(`/GraphQL adminUpdateAttachment`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateAttachmentInput!)
                    {
                        adminUpdateAttachment (payload:$payload)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '0f7ee8f1-7644-4da5-b53d-e03cd62405fc',
                        commonId: 'fab65033-01c6-4b3d-85f7-7fef092e475c',
                        langId: 'efcbc1c7-90ea-4bd3-bf55-cba1b0d94b02',
                        attachableModel: 'dnhbmu200xjceqft6j1shwykyta32hkvoct630gdvpevqac85k91kcd39l1mu988k2eteuo6jdi',
                        attachableId: '1ed8b8c9-5995-4a64-9a23-d34265309f54',
                        familyId: '5fedbf4f-7952-48df-ad14-8911205a3daa',
                        sort: 837683,
                        alt: 'i5h27ww2k06voxgtyuhci7h88d2tvohexuwrlxd1faqhu9zehvxl2yz1n7h2dbuox8iq0hglcfr3flwl0tyokry1rgsfoapy230di9ary8m4lxptn4q9hsvcx9a95zserylvyoskcf1ydifi93h6jekhbm20ybp7vyxw5k9uqn7db4f307s5yr2ge7b289z1j1kisqxfksbi5oryv5n4x1jww1yazwhs6ll406cpeb0pm16gs1em0gpijya8kmo',
                        title: 'my5y3s7k7rssaxaqa25ixwzuu54xc6nnmq3oaiw2o3nsncfhannzoo4ojwrloctkht8fq6t71e1ptpni182fk4gsph1t18dyyzsgzhc8faxrbltro2i8twj76ugoqnrfattq9ktuxch0vxvq7gbhtq40getpexb60pco91xhcjmv93zh8zg9emgzfi9wh654aedpv9p7sstb4n1yfzq0937iybncjdadozfbwznwpicl973icbmetpyrqfe6r7i',
                        description: 'Nisi recusandae voluptatem temporibus officia debitis consequuntur ea ut. Blanditiis aut dolores deserunt occaecati aut temporibus. Et quia qui. Tenetur molestias et quis et. Eveniet quia minus voluptas magnam id eos dolor ab illo.',
                        excerpt: 'Voluptate praesentium rerum et ipsa. Sed consectetur molestiae. Suscipit rerum harum nam est id cum pariatur placeat. Numquam et doloremque.',
                        name: 'oynguvw025saa5ctih90dkwo50zp6ofraesws5g7um73ruibk59ks51ibbm3nvo5lyw9z1t2edn48hgga8ubr0m5dh8o3qls8ybtzafiq4t3ujxbko89bluk9a42anuj3n8vf2o99hcigtzm4lg81oy45k5uhrb2f44nyqc1bxn21px7fwcpj4vbomkdz7ae6hiidxpvvff8ghou3ss6kndqprhmhdtekcbrhdrqm9nv33pukyavktwirhabe1f',
                        pathname: '5yu848mxrq3pgbuvjwjmw0pfdfsgny705l0juep2briucyoig6x43qitqpfsujcfzs3w825odtbhk84ylngtpj314ew3sq50ygj95u2g6gdkcoozwtm72563a18ts2gvo6eg5n7dpj0wxes93rjptth4yvydfcwwl5t2m19otn4wgemakb08gamv16wlibwhnztqo3miy10p43yt49rydr28dtfj6oqolhzr0ep0gh5xpblekdc4kxu7n6yxzcl7knatyz48vjulwieq8ccaw27776nzth9kf11af7tad3hedbjz8rypmpt4kusnob6nqk1gzdpgqyzkv5ld9opry3llrqnzice9tay5x9u0y8egr8oas2jpc1we1vf47u6dlslqqfmwicrg1m9n8icj9ed1t91nfbe4q4qvsl0b4rplb3cyszrhbh9z7ouvyjzfudpb4ifx9ehdw2inobrt2ogmkrc1fptpxcxxfz7pedw5v5me0dscqbtpnk5eedjm7unz8ur2rl6k687dxbilfxnmeaoy9a3nkblaiw3o62d3y6xtte2o5ulz6cq01c1ma3uamgjtufpq7kk0xam7hktg6f5to4p4pt0q50cv2oe3m0e9q3t5rfjffoliz80go2bmkzfxfphxryurjm0a1v61y6kjctppa9vn6qefj8mjvbpdovy6y9vjh09r8ypjvb8wexw3rdb0277qs4nxoxnnsdxg3nltwlhthj7xd12cllxaf34wx9weobcrlgu4vya0kchrb56g0iq0sth5xfw6maza47pnskn3fmm0jgn9v0e8npw4wnn1xpmttaz0wevpqaf6i3e4ums7kubx829e9vbn7fsy9yfcs475uwfdcfdx3mmh9mnsoh8i30mlh4yqc1sy8l0q1gpjn79xzd4ys3eob1oqtp7p4c6taoi24e04ciox9yrgenrryumcgsn2wy636wq8vagreyy17qxiye37pwhwuxvup0r30qzjnq7kt2qnz6dhr7kgqhfr',
                        filename: 'y9zupakuuwnp6im9gyy3e7m2tr9bhd3lxvnqzt9zm9x0zuykn16ies5b8m99czyykeqf6niognzse8mvv9rngwvt2ua8cg5b8f8p116m1doz1m4qckech4a09m5d6t8mokiunof716rn3p1obd2978bqpf8kn1xxg07c7klgty6j1wikzmps1qehpamqn3fdv0pklkvn4qt6s7w2cfrwsmch48hpqqb8wau1sfa3chotex787vgtty9yr1h06yk',
                        url: '1g0mdgc8a1izl9duhywg7c1viitksztrjnxxv6s6162qykzzfcwtpdububwl98no8spgbztkz2u0zee9jwhyi03mgnsstt2lyxukq1nj2amghqjn4sc2kqp3xfa5o41oe8y0ziir7paewwxalrlsen1gidvj1fuquyj29qiejbnyw2fwvt1lz6o83pzbrhr48meo030ootzudh6rem7l7qxt9dys1evsznt2ae95tqu4jc68d40y90ykwb0q7anwa4zhzppn3u9mtqxkmyfkuuhj7c1oef2ujg61sb8k3fg25j9r6hsqeniufdmosqq7flhxty7s73fhzs0omt1u5adrlyt5nf0umve3zx8cuthxhn856fz0z28mktetpm9jvqdf2hbte1i2c5ejhh7p2kd0f9neix087hooyny4tbva91wbdyjdor73b28q94qze0d7l6hqgp479fx5kek589n8hdl6tv5knh5aa61jpkq9uomife4hv17r2sbs33n27pfpafqptiogh7h9x3nc6ybypx6186i0hkvwo3ygk1jej16xllgc43pzmk1hvme3kmg4uyv66pl17r5ishb006v9hv9sdvttsrwrt4eeu2m3hp39vtmusrirug40ldt2iui5huqgwwfix25m2ydor7id1ahyh0b8vo3efsxhgyet0fzcum00pce9zrp44cuo80mas8zrwe0hok934q9tqsi6k82ixai07zk8oglrgdj8h4pbmd9vhvyf7b8nagk59z4e1zjz7ztqxfd5reqcfoe4nxo7l72hdnaa8zwriqaqdurcrjx38wxqgu3t3nvkbamkrq1xmne89zwdkubuqjufmmoxzimyn0jun2tlqyjpa1z2kw6ykct17q2vfet7bn73qb056rafshiwmtv3jyxxg3zu8h2qktph6r9l3tqzoevo6urfex3sav3qldi3czsrn3wyzpjstxa7df3wrh9ctw6v524qwlsicjo6dkwzmluliymtoxhgakzyq6a5',
                        mime: 'zuehwldr7bvc2j6ct1m9ww0y9sptbx1v8kaemnv51qc0ldltyt',
                        extension: 'yoij8dy1toyp5j62swyy6cz1hdzlc8z0dfanr94r81z22wkbx7',
                        size: 7923796340,
                        width: 427382,
                        height: 692976,
                        libraryId: '8e77604d-f2fd-4921-b54a-64b34e773b01',
                        libraryFilename: 'oogr06e12c5fen4j0bvp3evieqxek5jbi0xpiv4pyvmuqgmrmy3x1mvwitbhqytalfguigdmt6sp5cnxfjy66ei6w64hj0jxl04orrbthyaovo5byyb1ez88ytp76kicrui87w6i7eohq7l456ay9lxt7x7qdrwglwk9wv2sns89d9gjd93rks5pyut2z2roht2u0o7szuzzh15q7xitg5nastrz51m2ph8mxhv9xwjwz3r3gydbtcj7bga35o3',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAttachment.id).toStrictEqual('0f7ee8f1-7644-4da5-b53d-e03cd62405fc');
            });
    });

    test(`/GraphQL adminDeleteAttachmentById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAttachmentById (id:$id)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'd524ef3c-7c54-4abc-a166-7858c9b4a74c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteAttachmentById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAttachmentById (id:$id)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '0f7ee8f1-7644-4da5-b53d-e03cd62405fc'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAttachmentById.id).toStrictEqual('0f7ee8f1-7644-4da5-b53d-e03cd62405fc');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});