import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ICountryRepository } from '@hades/admin/country/domain/country.repository';
import { MockCountryRepository } from '@hades/admin/country/infrastructure/mock/mock-country.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
];

describe('country', () =>
{
    let app: INestApplication;
    let repository: MockCountryRepository;

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
            .overrideProvider(ICountryRepository)
            .useClass(MockCountryRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockCountryRepository>module.get<ICountryRepository>(ICountryRepository);

        await app.init();
    });

    test(`/REST:POST admin/country - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: null,
                commonId: '22a619b7-6af3-4143-9b46-37995cb93a83',
                langId: 'dedfce4b-bb03-4b71-b06b-5a152d70943e',
                iso3166Alpha2: 'g7',
                iso3166Alpha3: 'eoo',
                iso3166Numeric: 'q7q',
                customCode: 'j74hvlrurz',
                prefix: '81ljf',
                name: 'b9u56vw1t6z2erp6kgt74sueisltm1r6jxv6m9ksy11t1krtaajthf8q9atjzpll8ytkm7uwvgk90njgs0j57nxrfduon0um9xdf9c6muqxpn3oi7yfedwrppbqryhhnhwvt4aa76ea0px8e2d0a8bpf083152w12e2z59rup9psqcj5zo4fapw37cmfvdyhgdmoi199ek4r84p6aqqibf8nvy63183vdnn2nhhuxhz5wvw9l0pbknj61rtnls3',
                slug: '3wacw2yaihm88d5rqp0qkhyraehno824846xcbih1mjro1gs08qua7s9m9c4g1judt63l1hxkew2c1tlp6wxm1c7s7634l0qumb5n7oa83esbtf70s674i7q9jvilrp8de7mwo8iyc44f8b43zqavbky8snwu8kjj6vup3x8167pd7m6y9vljtccu6h11z8kkp5ivu2i6esbcok0rqbxacv5wsy9ijmji8ft6t7dpfbhhzyetmdg4n7bi85levd9nuumfur94brxdg3mfrx8mcu15eqhe9bpt678ul3n1rs69lwtn9luvnbnu9zvroculojrronqxtsdw81mzqqz41vdujffdwyuv2rumewokavake17lr6juu0f3eexoa3w8bqqdjejvsa1t7p0ushuu8ikargcx38zfnii2o07n1fan44oucieeooj229haxqjy3hkrpx8s83sr9ar2s3yuj5hz4w5gdm5bk2x3qcilk0tg569y7ee6ne7eudtqfzjagzpqx36v5kki3nzj97uzukddn402ob4ap6sxdbz6a2a1kcy8hjzcf777wtaf5xrfypxcu7fpydehxa8zwr477iz4dyonqd6dba45jgd0n5abutz2seqy6tswlpehl8hz3rr57ukskg1r09vk28x16tegxoh4a7dr70vg0pvk8u55ugw6cs6ealp6p8m6p02r62lln0qtj470gn5359vcxx4ytdj9l4l3reqppbm44uglkm519vy9wikhss1w14wdqgz33ok6w7mygzupmgoft0zogoe52oxy5zpmvr2p194jmt63rbflewiub1qne4xgua3bhv8tztt71ekcbbrxbovn4z8gbrx77ttb0xwh9n1xsmxsb96j1if9k0navreq3jvdv5xfsws4dxhuqu697h8ml6plbgxzb9c5al7fa0knhkvn9vmhe0iwgkvbo9vpkio5xh0lpq3btq14tbq95v6i4sxh7rs4wz1rtoh2ptpwd10dvz4jc89jg0xgfwq',
                image: 'gvuqvhv0vd0631lgk8kfkq9pfn2z0u9kfysu7q7nmj64gylbplm6x3m06wttmlamodpwd24p2djays55jvmbw4jp51xq14m837ryyf5itqztqrlo2ypw4nhg5h1rbq7npi2jwzklmmoypl1cfwz609rwmq3zx6lpqrujt2vh8ibbglrqaeo39hvqo9ags2eu2orijc3fpebhx5adnoxmk7tu0dv44tgjje4x7ux09dcf1fecowqwky68vbrpztrnstqipt91f5lvrze4hbvzms4b62rnx6byi0u2jgxyog2ms4n466m8ryjnp4obsf6xwf67z642ok3xnyywiu53zbvyzmy76tw7hrjgapevtnt88r3dgr6jsbh9avgjjd4cxuc8scw1w917k7jse4ybzwr1d9xbjq0ui0be36dpu5umxh6izmnre65rdhzkz8gnlp6jdj2y6dvcgcbk9sejqsw034acm9nfyj4mktkg2k2zvqke8ffvz2xk5xeql6qgeid2qjk6ipf75ag49y1nvojl8ts2r1spmigd9gqsbtpzclchxssb3huync53xh3m4ttiyko9xzpyiwahkpesbm74iy1i8czk20luj21rne14nv5v4rb5qta6oolveis65dzm548z31fz4w54x70dp1dmcvuzreon6rj9m93f7ut162jnsguow5xbyu9m926r8u126u537r88j1wnh9ht1s8ziqap6nox2q7o3fn77f9zwln1zsjn30fora9dzjxr7qym3qev3rb4k6y9cnrnrqevisceone0zs92exptocm5je5fjm7ca9735xo4ouns9yzvhiyrufvifkycq7sf5j2cew4vgq6ig4hkm23kfok89t54uhyaifpx7enuzu7312wbvcz9t9vrornd69m3bah1whtmdzt9hj91bq5rey1urg4l7n8npttux3usdkowcehjljwgue54rgmw4smpqgjns5j1h3y917mtazhgbyxanagz4ihelf9knx8tqpqc',
                sort: 242281,
                administrativeAreaLevel1: 'jg1r8zwo5b4jclxrsk3ic08dqbe9pb3kn6dgwu9x9f3oaf4l4w',
                administrativeAreaLevel2: '1zo4bgypjy0baqigqgnec609bl4bmyw04rvfybio9ocilbhjrp',
                administrativeAreaLevel3: 'oz2sdbeg4lggvbspggm469r1610qp341d33s9u2kvnuo6edoz8',
                administrativeAreas: { "foo" : "bar" },
                latitude: 280.18,
                longitude: 192.14,
                zoom: 93,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                
                commonId: '22a619b7-6af3-4143-9b46-37995cb93a83',
                langId: 'dedfce4b-bb03-4b71-b06b-5a152d70943e',
                iso3166Alpha2: '2m',
                iso3166Alpha3: 'm40',
                iso3166Numeric: 'xcr',
                customCode: 'ixpch92n2v',
                prefix: '1ddzg',
                name: 'd2rs4wq7g2gmvjf34u4f0kwz5hlel39p1zkpg84suntc9cceqqdbgsat12q4je4fgabk1dr9hf8m3755i8re9836r8sc03k3060rtaa3argi7twwecbyt9lo8wfulvd9bhiaiekr3djuvdrsofoja51fjhgfc0jnk4vthwncb5lirljfxhxeay9ml3iyszi9p04uvxqj43n7q490n359520narflbktowj9w92rf9gl70zoud5da01wmflpvahc',
                slug: '7dmzr1xsiomqzmes407rordovm1wm20e2llkllnemxomr0f0o1240c4m2fk5eygfc2fbe01ou1bxa68rppmb384r6rspwgta3i93q6lf5subwbuha7i8ekcghv9jh5co16bxjw6pa4ffyj7rzb66rq1hhdotp0a8yo1fkv73n6ndj51pa7fzqsk8jg1k43wfe9gn24ypefcc837esi0o5ecqaorcma01cbeer6injjwpz9thw8ubbuh31it15wyjb43dch9nawtq8046e26xniy9q6gem73uiwb3vo0q2i4e02ikdra8wlkw2lj4k3dmukkus5via1my0cfxp0rl3zoukdcgl27egit2hqftpg1ewn2c4ltuv6w1zjcr1q01riv0kt4immm1xgoj81il58k1ryvg8xydlhztct9qi6qv4jsy2quf1ou3wznz06geoncy4nmss1i2qnlgdwi8uizuvopthq1y69y3m6sa61dycqdimij43mzk3fuz9ppf088ycxpkwp1krklfspzkd5h3sc3ngw873bx3fjnwx9zc3iny7qa0f1movv6k0846s65csf1lew3n1hx1bacl783aqa9e3obn74cbmxfvbqhaoqm4pyof1cja9kylkpza6dzodm6jryewc4rc0muygsbttpet1br7jc9a04hjlk09pjecfrv9daredvg8wwra13ij2qb18yo9zvzcvjoasctz777d6300jyd8pjpgoofh4ix1u6pglu9sxltmqefpsa26w0amu8kbp14nsgosv46b9jvxhb07cfutvc8vp98c94az63ofeqtck3hhtm717zvdg20cwhuq22zb3vcqpo6crgaah6rclitqzyexvmg68y39qbxok7cq4dhha7ih4hhxorh3nlp35k3wi0jphr59bn3zbwevf9x7f8j1wcmhc0344fma7cuwjn9wxx5bgzbp6lxewi2hzo804z8e28pa9zys4zvn5kx4r7uj7q4ck2by8rie4zls5s9xprpn',
                image: 'riyzlvhhiuihzlxivfcn3ajmhr8ey7imazl49yeydnxc2kzf9ivqso4umrcjsjle7bwdmrmdrufwc31mv1wjrbsb4o0sbe90s66n6q3ksr1ezxmougcvvge2menr665de665o1t9b2qr00hd2hrlvyjc8hz4vs1aqt4i4fyxmhmooaadkndr93ptgg5ktu8r42s38mdiow73twgkqp9yjs368f6jwzhtlnnxwy7kgt4dng2uyfa72ttu922g7wn6eaplja6lqty7xcj4x0ky089rn1cb3a6cvff77z4pbvftelou5889lfucxux0or6kt8ss89oefbhogb9b509p2ww8mc9l6n93t6cgb6mmd2i6oah719fu0ds8w4hna1ig0anlr03atjohesrmw1qvjgmv0jp03atbr49k84xa9nii7lhr63tpl805zixwhnxevg9l0jxsufdtjty5f3q6kzwdy61efi0comdrxlhkz2jm85594kf6t9rqjvfieggux0wkewge65ijwbtp0rvfv3civrkuevbmmmv7tylgyxc6tev5ak9uz4tgmn6ow5v8n8qp0syzh1i1a3vr7vb4dlq6au1sle34nhjtkopd2kxi5oore6wi03k6iszrbtgosdlo3yk60a591xg4cimsc9nnpp49m0jaexujm820puhi4f4ib7yu668r0b3ahs6182shujsjrxwog736pm13eetn01aiy8fn9dzbnqu1vdxzzthmezgb1b6jf0vl0hhsalqh16ylgyxmf5bhj2lf7n5bqsnu4e1ja2sm2fouevry5lsmq1e8ezg1kd9ycigbjg1jjk2b8iahetmvlopqzj317bath4gih57t4swttelzv6u2qrifuj0jc67e3wu9d0ss5b0wrajmbig3lvtqozu686lq49ubgz9l6nvh6mae087f53ka3k7rh6r5vzeuhttvoyn1ug0dz0cp3qj0n2xiw0gf9e04cl7s8jj6ixdapu9uhf7jakribbyss19c',
                sort: 579420,
                administrativeAreaLevel1: 'zi3ims25xi2v507ntmdu3i02vqwzi3z47u03cddkhu7wn5wyrx',
                administrativeAreaLevel2: 'ngtcv65t9e3wqhukt1jn3tith0x8u9d7uxzno38vu7huhnl51o',
                administrativeAreaLevel3: 'waz6f5q8icevre2lpw1fe6tnolgrsey90rkxx8hiyxlm6124pz',
                administrativeAreas: { "foo" : "bar" },
                latitude: 977.55,
                longitude: 427.91,
                zoom: 26,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryCommonId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'eb73fdfa-89b8-454a-b874-a82bb6b4577a',
                commonId: null,
                langId: 'dedfce4b-bb03-4b71-b06b-5a152d70943e',
                iso3166Alpha2: 'cm',
                iso3166Alpha3: 'spj',
                iso3166Numeric: 'hco',
                customCode: 'sxsytog6sl',
                prefix: '1muhq',
                name: 'gja34g3w27zfw4k90gtynqvpoj5nhg8ghz1bhi99myuzb7rs5w61ym0rrs3sdux9aen7s9i7coqup4fvcqgl1syj2v2wil4ebmk74v6roj1ebh60892l3sh6hr76asaavw8jzvge8en4wu86hde5ymyiffct1wk3oft426mjgp8trvr625vw2unou7ampff6368x6b1t8vahm4aihmlz8kqxfcr2dxv5blytacnghb9pxpv44d3ulotpq45att3',
                slug: 'xwrmgmcu8bws1ninnis5yyh3qmw0bgiyjj7tknfq2jcv91lw9jlbbl9dkh5ul98qyrohe26fsv14nh54uos6cqg8kqadx3debixbvgi31y1imwxrdjb5sp5d3edrqk6plh3kza3cpm14g3wv2nqgwf0ul2hjcz4gtg8fnl0oivwfgc78j1i33azoqqn3nq7l0e4fs8mk6a7t25wdn62987wg3r5xgkfpadykfycz80jw0ym28b21lexjj83pko6gl40h725736sr2r0l84f09twjrbacvmx5w04ctwdtsx3z1eb6j630lcsi660rkh8fbtqct5cgdzch6pxge8ya1sieuqo2unsm5f651rx3s5brt5xppgda2fpyrkwvy5o4gkyx0kwa0rn2gnml1y2dzarizcrr3224zhsprdlkerslncd195w820lt6denxwf7llo64swo7zvcwxxpukv3msrsdl2ngjscexe95n988jh7ykdn4u97qosk0l2o4xldk07kdfg3grv6u32084k8xptkts9ekyx52an0cbfoe7sazbb3h304abs9qh7w510zbld419fqen2wehzfa6r0enlki4z07hp3xyr4ilbqiyvvtmpvql90uqi18pdus9i7u3t8y24xf3635hqqwyquo72jmgf7apbw8w3asi4e5nnvsrhziwduqeten1t58qqtun2wq5gtt2wdgw5msf13xqzj5iyqmmc0e2mylv2ns21sce5vmyp986l8cth02sx90w9ho5916ckccldndxn29vfkyhn9c9dycrhu71fb8pncj91zjy6zk8i7klv7l0fb1zjcez5lhru3x3h60gsuxbmuu4tholmgfms543s7ljtsi6t8cqxvd3cmplmct5y4wtx6p17ken2jw8vir3dclmo3vpc0n61exfwdejnyxadrzu3yuyopxstr3cpm4oynln66e9u7u5yssx01jm5uxe4hqdncs66roygnekeprcdcbxrircdwi4mi4im3uqc3',
                image: 'j9j87g6c1rc73hgpa7iqxa4iahwsuawq7pinb0m3qi2ui97qolh6mojongnln5t9t512ytkon84kphhbuvwx2a5mfqwg6sujz02kpbha09ikyc9tq94mw1d4gb8m32j4zpbybqot74o8ff1k0oceninxhk8jes3y9o43ec9yibkv8ws9b0wqwvjabayeibuzzvjek798j4pamhuihqfayt1ub77byp63l3tld2fh6ky95f6yei1h79gigetgtlm7fkbsu85v7oguui17l8svdv3dgfgzieg2y3j6z37fe9r46eit0nombz2xomj63vt6hdzkfw3fv2lh7k3p0vcv3870p8mas04amsxtdjqhv1b0iojrouunxoocz1x4s4jocqgzysfsslaggxgbmybtw392dx2rbp6y1yortks2pmn2fr0in5yuph3a9ir7i4kue7dilxtjbveze17x5jxw1jte6r3442v8dsdhxprblh72nax2srfaemasoxl00ykgugfun5fvgfulefk4iybnzm7f5nxaaa0vhzxq197uyamn7amdafz0m0a6kp571axdwhmvxjg8178wuxmzhognutbt6mk7sdmo824qrze6b2riilphewj81n7gzbfoqqd8q7kslglg000jodt1jy8ag929nzydyiv6gi9z7az0f8ip14ty60f7omn257t45ci85rx7uhl7j6vk9rssauz6fxqpj8y8lmz9g52wfxlcuxnrmow6gn0enbdeey3uyre9dfda22pfaxqi5ky7a8j8cf0ntbqaqlsemdjne1nfnjj84w679gcgwbfg6atx7xvlv9kxghygec7q9hbqdfotggp7a0okn8e5mvbdy3txcffcm1nbwqb57tqw6tjmw19enuyg7vs6doft28c6ljvomilpzktmrgqml86smg6g60dqrin6ek5e0bd5knpt5o0w1fd3doh1nrczeykf712pwn3e8f13zkjhe7z2wpgw46u0irh5ydywpp7i1y98t0mf',
                sort: 346169,
                administrativeAreaLevel1: 'ys7d5tuw8yi7b1rn2vztpx75bi8z3a3qyyj6rddheye4500fjl',
                administrativeAreaLevel2: 'ek69comczomxeohurh8q3e1hlpt49be5emu4vom2hgfxe2080c',
                administrativeAreaLevel3: 'bt1sua60xhh6yw6yt7sapoxh8xmq0vvgbezd6pw5hjfxv6vbw9',
                administrativeAreas: { "foo" : "bar" },
                latitude: 33.79,
                longitude: 920.50,
                zoom: 47,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryCommonId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryCommonId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'eb73fdfa-89b8-454a-b874-a82bb6b4577a',
                
                langId: 'dedfce4b-bb03-4b71-b06b-5a152d70943e',
                iso3166Alpha2: 'pt',
                iso3166Alpha3: 'stz',
                iso3166Numeric: '4rv',
                customCode: 'fekrtz771c',
                prefix: 'ei5wy',
                name: 'fq00stcvaj0w7pu91r5j9wfnnid7lzarhmar787r044fc47s77ry35tda6u6pvbxzvzws8qvfg3zxsxoqosisikj04fmn37veaptka14s9z5a2gquvmrrt0a0ys7pozhescucltqs345wopko6evqcexs67bgakqfwf9et6edcj6bzgtvym8eyt1tglbhzcc8ye4shl6jloo8qwhpn19twxbpi6d06oushzc5rcsfy1wq2nu2b2qt8zpddkvr1r',
                slug: '6m9syxxtfjwsfro17nnxt7xdrh4olau2uy70571j5btn0o9a7av8mqjnxuo21i15jb7h7vg4on4r5h0uoocrg6bokl11vs4kjnejrzscfmfz94ryirvoftyl3m3sd3ajltaivgyffd2tp8s312uuphmvmcmczcfzbg7g8z7xuwnn4wq4d8q965h1e1lzf006vp6sydi689oqqxpihnweqxj2vovinzrwcwzxlikt40qrm5kyg86x5tuqfdd8apcvk06uhmboja8ofzkjkvciupps5y6n72rdioqb6c22nngvoy782lfgrroymwvpu85ruq9heyrnd3fi3vu04wvq2rja06y24bm07dkuveqs2cw36eth2co206l2pztuwsohdpabczjp0npi9djkk6koc8r4aojngny8qltxjr1kgb8teem9qvvndi7sqirxz2jcm8bxzt4juzv0mn4p06u7ms8b4gj8wbvu8b7scnqtgpuz1v84jhp286egxt672c0fx1iwm2i5hjlh9ypifgsngv5z757r8r0lpggwjh7urj45kmd1fs6p6mezv92pz3ka469avk2toc1ias17twwm0489qc0bvrm205svpe6vrxpacu5ron2b652yeqxngkd8z3rpitv5d0onpjlvuhkiovhoxhnuqlj48q9timtnra7ko580xfo3es65m7rg5q8r3tlhv0ma7hxdmbzndh9cb11tz1pa4ifwo1670x10gecmmm0i12gbi69u0zk6atr379no3rg0j39hg8j3yihu7jfaq44ul20id8xmbl42y31prtsi9238zcpcq03jafdgncjy5r2vr4ttj8m3btnt53n4p8vnczhu1huteojamb6w7991uu0rsyzu81j0dlx62rbu4wrmcmnxbhucw8lxohbeur1gkaqh0qxqqwvp1gmuor1222emk3dnv0qr02zbmxe0l4tzcqpuatj7wimya7ietqx85lj01yract5vzj9m003l11c01m7mmwwzffjl',
                image: 'an7brvqfo3lytvtg1lfjw46vq7ueqjgvzl5w8739pdorn8n5v2isc533wvewbuuoooawu3kigw5s86fmxy1ix4oqxx4n2vffq4yf7qckdsqse5ry15sj0clm0z85ei3xdtxlvy4akafufsu85c3wbz6fd199plbtjrbn7nnbak3uqqiob2nehhq7iebzcqp4qrv2n6lx3cr6bhr5dpcqfwnosb3ww7up2sky8nukdgngww8q13uwx7p4yju7aio8fuvosa3zfqywwxdlecuazf4giupdjbm9zvryhv03izv6kx2c7wphbr5qm0ezjsn7ecin8t84lhjr97mb07tqftrmxs7tv16s34oekfyqm6vgr9p9g1q1s4666fwfumr05vccbxyrprrn1gog4vfrhrq69kyzbq6xptmmj2ahuh2litvcv9fo4rh6c5vjz8jek925kb3k73uxauii7gmcqfoxldij8qlpx78bb5t5rst660hduhmeuoce89k38t1zesn99ylbqt2ijoq9jesetlgqusi3nn69rpxvbz5o53crjhh757kdxlecm9xa85mu6jaxb8lmjszfvcdhla9j7guyk3tk86qyqvnems654s0f0cul5cjgzr9l1hziel04ivsi5q6yfak6vqq8w7syn4hpmvorgl58230wwwstukuyjdh2t4vh5ygbft3holsvpjmwnaw8vp0l9r23o3f7qqidxozsslmcpw0nv50bh3y5130ne4xtbnzoqtytbe0ht56qonedc0okt2urbsnib5nano6oxbkdct1y14h044lk8k59l4wozox903eamun75d5k3m71uga50tr2ooirs54m9ky77wlozpbmvg3c63mqfe0gvm5tyv7f52crqlfhqo8tzh8vq9euxpj4caes7w8wl6pp9dlc9o3qa58sbmn16r8qhbj3uu5qvtdtgpnykgt6k4ocadnkgfg9i279kbgdrd12tnlyqfb1jmlwi95n5sh6u816quje1z4x4k9i',
                sort: 176195,
                administrativeAreaLevel1: 'idbks8o7splel94jq53vmjuhm4ne85kjaazbg6836vo7n809b0',
                administrativeAreaLevel2: '56omo08e21qa64fo5sx9va4xxzh5fualrabqfhen4pjhh5mraj',
                administrativeAreaLevel3: 'qv3lh9jk3l6k8e7jz1q0loqnbs6y98r7mctp8qlcipsxd7udod',
                administrativeAreas: { "foo" : "bar" },
                latitude: 108.61,
                longitude: 2.87,
                zoom: 35,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryCommonId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryLangId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'eb73fdfa-89b8-454a-b874-a82bb6b4577a',
                commonId: '22a619b7-6af3-4143-9b46-37995cb93a83',
                langId: null,
                iso3166Alpha2: 'px',
                iso3166Alpha3: 'xvx',
                iso3166Numeric: 'c5s',
                customCode: 'ev7hyps1n6',
                prefix: '8ybw8',
                name: 'k9hotzwew6see5hbdawt0tjzitghz6vypgclg3x1uq5gdfz2w0as014nz0v98kw1cq8n4hakoxfrqlbu7eh5az0z35muetxggqzkhj8u0169gfdkpe2ejui15j4m2xum9sbc22rijq5hpz4tfbe43i3iopgdu5htl8pu9rah8ucefel5ha49pxpmocjagonuur14f3vlrp9te41u8mhfm22wxmgj735kmcerd2hzdrobtw3xdc88d8mm8qujm86',
                slug: 'i8aogpozzlb2ebm4l5jg2dqrox07t9awynoxe2u84l3gmqryccbp0ejnekwikzw5timkvcaytdr1oo0xzlan0vae5jpi8rnoy5ank44lgg8mf7ms01qyxocc4cyy8au3pgw4vu7pihtdgfdicy8lfm48mwv00296lxl849yuonf2h5477oakvqfriygz0ry2jn1xzyrem4bc9jlad8l1b4i1ju2aqilirqrmg8clcnkpfnttglhvdhl9n43b1uncspq8yantqtnmjowt7ick2zl0rlnivx8xcaaty9r6ev1oornu1h3iczsojiey8x5fwrpwywxkwzwvaizwd00yjoti4ertw7oxlf0yewt0qd9e4uhjfrkecv9i3c1smy0q95glhig97g6f7dk7hhhyyi31jorxk8oegc8vduvln5im4zn3a5g4w98k93t7lh6x06mwib9aheav1mkvcn6hdv0xexsy4u9va1y66o48aow951bwqtc74sn33k822azj6nvrub9y5xc6hi0v6n289a8b2otfikcjo1ukscz6sq4r2xu9rv2n8x1c23wdoid9lfbg5uy235hqttekpl7q6s59fo1faars218xe1fk5imomaiwpzsv7sqfjffgs6wqs4zczs8wgcoypkykil8bdkewpl7jj91f1h1f47aickcduros413x4icncmtc2vcl1q4uvyvs6b1prvl5ovklbf5yljox86ulqm8fy2wb3bileysnsx1s6ufqwwwe4cb67uy78rhe1ihkjk08b57bxlhkef29aduk85en4xgi96gkf2nlgw4kpanwv58tf39f8ika6k3qnz8hhpfpr3zz071ufazbogd42jcfmrmtdfssftapdjehrmarohc2t361jfwdngzkxot81uqf0o2tkvhg3sk6owtcurqc7u5woh1m12vhdvqn1y6xdokm37npb7aw03bzb1jinaptrvaqzv6evdm8v0l3nbal24mqvtlo0kgnn0f2lvd9jezuy1qj',
                image: 'mx31hbckwhowkqngwap29q8tgehixcx86z2x870g31iu6vtlmpm6cfdcfnqomankm8dv2p2ojkva38l9j8rcplkn7kl4xsakx120m4sv8bsswbqb7rwg5na6n1b9j0wstjg52vjd4qd5ncg1gzxns24owca7frtbtznhy03dd9x1z4ue2cvhb6seytpz5pf50swmovfg95q3cc85xremn6oaetv4xnnqwgdfnq3i6mby8eon2xgtj72ggdv1a1csbujfa1921i0hwvadewd02n93oq2h79y5q2qegrsuw04tftxsao2d9kfmibwhbcxqk4i9ffykvejrm9uv496qg0xkp89myh7cy6s25ewfmzs9d0a1qxgp3o9ufs3u0butvm2ko39sx56wp1zbca787d732vso9xmyj2ukmgwkzb8sy4i655s1c6t9us0ivfve2pv347mvlev8pu34q1km8coqymito6a682ks5xe92cf956yucxhfybmi7jnw62pzchatqnm7nvawmlsntm03eaviuqq8h43g2cz514ue7tg5s9yepvq84881cddi14uvbsaq85ergnvycjijgp3yrn1tkjxhfisp5m9uviyv5vdino37v1xi2libe704n27qlz4qkdmddukj6xj6qy973xqemz3b4poum8zc4pvppakc8xkqomqpjupege3yafqf489ira6ubz4d8q0e77igd5spv8tn9mlpfjnui1eaan4aljsukcaltd80wen793fuss042oxxfq0my1gqg7kkz0s52p5n9f64s67aw958dv487z1utdyo308i1a0hllqghmbjltd8dxhpird7uxxkk7ixwb7t6k0yv9z19fru2v5v0bhyvqo1sgwy9lz6g9kzc6mmtw9n58vv2j1vx0utrt76rjw4anuxgs8x1cinqn9riytr7bx2l51qo9lznhanrz6rmrujpnaybc7kkm24j1rn3x353du6n7f3a9mqmz52pzvx84tgds3e19fi917q',
                sort: 127580,
                administrativeAreaLevel1: '4tf5m1j4ixk2jdao8xkb9v7na7ynbynftl0nvb7ef4xkixkqne',
                administrativeAreaLevel2: '5p5133m53d21apzmv3umogzs4wfm29iqr2dxvmtls1gsag4tny',
                administrativeAreaLevel3: 'nngrxmvaez38la4zx5lmpmnvuzqfbxqu2uo38pz9dgkb05u9cz',
                administrativeAreas: { "foo" : "bar" },
                latitude: 633.58,
                longitude: 183.11,
                zoom: 31,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryLangId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryLangId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'eb73fdfa-89b8-454a-b874-a82bb6b4577a',
                commonId: '22a619b7-6af3-4143-9b46-37995cb93a83',
                
                iso3166Alpha2: 'ou',
                iso3166Alpha3: 'lu5',
                iso3166Numeric: 'u39',
                customCode: '9l8gk3h7wq',
                prefix: '9nu3s',
                name: '1vg68dkq715ks80l4kkq7a6sk55jnd6yu5ph38lgl5b260k3zdnu8mumj014wtdwct9mwxzyv6va4nq4x93mzmxngdimwrx5ycqnbhyc1zgrwj86u3w8n4kvmof6qemba7c7938q28qxmavx99q1ghvcvh7csqugjudqkb4vjt06roktv3xotsyk44ln6z47m6v0vk2z3svkg1pccogtmpgvoqmaa9kjadh38b445trb4gtmpgt47o0r0wkvtd8',
                slug: '8zifzvfn7ath6nmyafer5eze87qe504nlpz4990mtrrevh7aqrqk8yesit22j79fq1jx5o7tqekujobrht9yghkg49gphto05lj6evsem8lguj9fjopdxcpeuk603hou46eo1f5cn8a78x3dzv1nbkiqv92e40jmn25jc3u0vguyb20k9tbgshda4cun9t7n1ldinyeavphiy4sj3tg2r6x9laeiuthdvwxci3hqj1infz662v4ze2t253isskw73f4dsj3kf5w63zj386qq7g7llon7iwzq5lxgvd8idyy6djlxcot4nt0gpdyh5vdl3mdzi567ki9jwssbsme3q72k5ilmbxjua6ljnu3t2dicqymq73pud6zb8vpcfxv7tspdt27b7dzex40yt40hqnxbaa3omfcdm4et1kxshedbel7lcrye2spg0zvsn0nua9h8jmb4tkzhkjw82htt5644ty1tey1w12lmrmk8lchznogy0htimpvjhitqtk3w8gbrekl5g5t8hve9n7zr5tgw8vf4l067pxj55ndqf11gcs823e55okc7w5cgk6560yjmiw8agsye8xl51wjn48xzk8l2143elzl27qrmdt1rcmlpzd1w4ecn16wdqyzau8jj6ry6j4zs9o6zooipc8i8ye9tr0phgirua02w9ttypdvx1647yjemdr17edlob6ehs8wmucg1dwz35w92c04aw2osbaj3520niubk1m090nm7vdovnrajui64rh3qccpzgoroc0fz3x9k1cjpzv5wyr6qv8dt70jfqjvqxu0ab7tq49mnfkq3j25tz9syi55zh5oh7whq96c2jwjwiaf3xvgubkrfwx71gkvane3ha4hig111sh4acljdw9snio0xdcxei9x1ehxfk0ikk1l1rzzkxa8l3pft75g8yq5c77fxcmynvqqlks1dp8bw0eenrvc7o51xt48axteq4rx9nhes1gzypfqjuwra5ekprhogkg56k57w6vdfizv4',
                image: 'cgkywo4uiu1ylgxhpedv8zf6lm1dn8qtg6ft9o6i8cb0wel6uonzd7iacmg8fgxd8jd0re33nnq5po32tz2uksw9qlpdgbgr6cz83ogidsf6hd0pueditphs8m5pwdrnoonkij0yq6tbiiyf3reionm5a96wjhmfaueoxzdt12lu8wqi5bkfb3uje3ssjqk88x19do89lac3uek3kxsvxqjg6hnhu0rqyhfea7hi3mdao64nbh9ie79jgzcutrmmtmw2q6fsm3ci49l4dqmkdr7lpbwbnjda0wo9n5pxdja5xjckei7hlgux22njufx9wdnrbzg4yfre182tyq2jy8rfe7jo5we0dbtfba30b9nu1s5uuld9airq02c61rct8p4rafnc4lw8k24cdzp2ftwfz752l77uxfox2jvkgnoelhuiy7yp2gutyrjdclcokizqt3occ4l5c3yeaf3vz5s142137tz8mkerbdm7x9lbo9m4dbudrbutzjcbkayvoala7nqi7dx85fx6dz6ryko86yqaymk5iezjdzz12tbl5bhzwgfvj2e2ornh594vzxbccxbq0ml32pjoz70z1lldkokhenzvxpxo6wknf838eo70dczc34rypzmnddffkotpxcf9fv7ymot4c1sadck586m5n1ohrbc4u6arvrjvx4wubsqbgew7jvvkuzvzcdi2gzg09ws7g4k8m0ferz08olfmdl2iu8n52z0c5h77i040u05b5azhmst4dff3bopsuj9exf492xjnxpr0a95mv0eh78rt2iyigllnwwq1atzaqsr3rqskyjh86uw0dy6ffuphhpdjbvdx5mx3ry1gyk8n1j2o6j28cezj1vpnh8j7wgpixdy69e4q0go9rvqaja8utespsc6vl3hhjzy9rqkeiw2uxkvmemoe29ddg4oug88slaqk2bedtrre5vuxt2pj6a4v7pbue3r1bv3b7oly2v07ge12zuo9cw7zcnn7ss6y4e4cs97zidlm',
                sort: 892097,
                administrativeAreaLevel1: 'vgxhsjs32xzheg47hjsfjqyez2a10nsenkscyr4jsn6iu34sjo',
                administrativeAreaLevel2: 'dkdjohol4iaj797msbjsgrhny3duzhnvvingmcp9uxcxdm0r43',
                administrativeAreaLevel3: 'bf1v4afampqqb3o1r4woc73u2rb9w1d6m4cggiuxgwmlt4h9q3',
                administrativeAreas: { "foo" : "bar" },
                latitude: 61.79,
                longitude: 922.42,
                zoom: 17,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryLangId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Alpha2 property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'eb73fdfa-89b8-454a-b874-a82bb6b4577a',
                commonId: '22a619b7-6af3-4143-9b46-37995cb93a83',
                langId: 'dedfce4b-bb03-4b71-b06b-5a152d70943e',
                iso3166Alpha2: null,
                iso3166Alpha3: 'rqq',
                iso3166Numeric: 'n6k',
                customCode: 'du9018jpff',
                prefix: '01jgu',
                name: 'gc478z1bgttsdkkin3qzpguxtkfwmz5txgnuuuy3knocbv4pz3f0gyo2ymbvjcxj4c7tkg93nx8t2qtm8fpis7zmqbwihqc3ltpkbcct3hejnx1mhbwmfg85bmq0y3w6tp9ysgifmbk9z4p652mnwghkvo3sx1wwflm9x6vjnh9s1g67eajb2yestbemghfshmnnonfagkpdwdngpwsi2edxk0ppbtgsgr0gtcebpwq7xta3ac26v3jkzczgvzc',
                slug: '7l5r6nsx85fkzkkcx76w163vv3msc2bde4cwwj0fgcyzsscbv5wwj94x7ap1iff4cxfgyv1c0dmnka8smjzopf4ddtnirbaqe84ir29ncdjonffztgot6hje6r60j2iiwvv90k7h1kafc9mtci2eyg83ghlrrylvz4ry2zp1lhflff0b61mi4xw4b3cdcwt969jf9la1bl5np4xvm7d8wxj0kcux8sdkneyafdw1pihnsq7g3wf88nr9c99ylxeyvq3g28huzkz41bmdwfj8mv3eoo5eq3kn8f709nn2m8xj9e2llbwyer1xwqenl1c6uce5wcdlg8nbkjbju2fycw2n4mqp8cg6a64wtqmu3y9bob6he9v6bl9ch0fw568yvspm1zo13yqlhkdz5c86s4gk3nlp5vifg00ctuo76i3k2x2wu0lz8annhau0tzk3pl5dxp9ovr0f2u803jkhed9rken8xd2whepnkl0yo0pr2ljwqq59qznswlibnqlgxkmzhzlm1pb1xm3is52lct8szxpjp6m1w7hh62sjnuhjjxqazcvf7gvrgfm0vmnxmd71yjsgm664vcuohgwhygmsri3u4525v8ndip0k2tlk6bjc9zvlguwpufeyakc228yjo26useg0jtn1j63cjheg06l7m832z1rqnhhyedyl23rsossltwrwaxpeyhtjv3i6zmcoj1kq8783yvt4ks8pyi6oq4i395v1ke64qp3ygx4qid3ltaeixasfh50dggznm6ms0w7vbuagni76upox31kkhw9wfe3964pqg131cop6t7p0xzmejaqhye5e8iahluf4okzpjntqqhnw75myerpnh6ib35ee4ppj7odk4nsuv9dsq5jzwzutav4gzkowv3l5jbmuv2xr2dr7sl7sr8q3y6wy72h3x2t59gjkzly9j42z8wn5g5o53dqd4kod9h67zhw879etg2se26x3kdqbtic4bptwaqq85a21xq1s97im5d181fv668o9',
                image: 'yp11dy466wqjyy6pmgblb5jw10pvqj6ganxpa9aearkoiyoebevi773jsj39cvf1753ro6gohv3c2tm56g55gbx4j0olvmhmp8be89roebei3be52tpb88mcsx6omhboekoemwpbz0ozjd53826v5psahjzd5tck78vnrt5surmtxm3iq31at2i2hx908v7xhskqyeqs4qpv8jrvbnxki6c66in4zft42hzshzvw0sv0yn8kxz4cfrfv5c3u21lhyqzu4dcu7c0uwvonhvpqeaoka7kkj94hjr0lmcc5vjj593qiqpxt8e0967pzzla92fz25j1rc00bts0d7e7rmfefpc9gan43zciffq77q5zcxjqm1sb60dk0poy39nm0xhtsrtbk4x0o68bpbtfmuaytm4pvo9j820l62jr90k97xu3h5ma0f7gy7memr1hev4nvzrobzzmaqorgluxj70g5en76ej19j4y19y6rujhx2x3bbe1f678l3pw6h3tpho903hxwp03om2sjnk53bzes8rcq22rb5vimisdsrx0uu0ds9nz1y2z11wntysxzjhal8wq2cz3l7dbn7lrju6xoxbxjz1987fwyy69k6vr3igljsbey639pq5prak3vpj073h5paw61rikc8vj7hiyyjywcvv9ljot07xax4el1d0yk39gnh1feq141hilrwjzz9e8yr1svsme0z1cwrz56mj2oj5q1ybmu2v68qi5tr82helxyvw5ilvqvecjle14h44w3w7j2ziqm2qa5a3haszwy7ing0vz3qs46n6pgb91oys3l6q1p76btsicssywop6rm9dxv3x6spzdj0arqb8osq4xp6jgbtce949ptr9ng5lrva5uhpru4y0r75fnq6u3rxgcmcgmn6m5n0chzp9t7hln2sr2c2xooll7nu8bbuafh3jexa8ct3r6ninsohrydwq38ezy9ac5ylsw2mi6vc61zokjcqqo05ymyrzgb12l6rznh7ksnh2o9',
                sort: 354248,
                administrativeAreaLevel1: '9uqgo2d2btmmog8g19ej8gfalu4982g8l3i8xjaayin5qqc415',
                administrativeAreaLevel2: 'emt38pf6ypmcltjejcs3oc5ddufe2wuzj4eqndbefyn03p34nh',
                administrativeAreaLevel3: 'k5y7tto2sottjg617vc2ozvbw8rucdektu6of65eicywy101hp',
                administrativeAreas: { "foo" : "bar" },
                latitude: 310.10,
                longitude: 279.77,
                zoom: 15,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha2 must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Alpha2 property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'eb73fdfa-89b8-454a-b874-a82bb6b4577a',
                commonId: '22a619b7-6af3-4143-9b46-37995cb93a83',
                langId: 'dedfce4b-bb03-4b71-b06b-5a152d70943e',
                
                iso3166Alpha3: 'bkl',
                iso3166Numeric: 'o3o',
                customCode: 'hu4tb5pce8',
                prefix: '01qag',
                name: '2ryltiakmloft5nixr2tt05o9adwl6iym08ijwplyp2lmzd0m4qpa5afw707kcr6qay4to0xowfapv6kz68i88cxm851qikgdrla1a6sptxwysr08azflmugm87iimtc6t09d9jd6quaikcfjl9dibmpwdeono8pyzvp1cq34dwhpqh8bbae1th3nxzimwey47q399gvjwhtlrqzk2wskvr7n937y0wbh9qqwn5xla2jj2mfqj4mxxtop21e7ai',
                slug: 'o8sqogbz4idtbde9h1kynybe5yvlg56myq7csbvaontdra1b4hss0do068l2son62qfgiap9y2icy6ylqu2mhp6on1509xxob0ixduet5bb48mg6us2pnpstb3g743du7exk26m3xz2w9xfq7038oa3td546bo7pzk612n2w212xs2bkqfe17rcw0jmparmfe9pa3p3b7cge6rvcenzlzhs5f4fzqdcacm2rc1dnkmi5nc5bilka03lemigdbj45vwsjk7vn2qauernizvqbnf0hu6fpvtvlk72gm00ow9urzcr1pe0wldqs8yh0dsz7rhnaxslu6z7zquturuwmq3elxcu35x8f2g8rnpuv5mt3rbsacxgusc6dc04sb6g5l2ot78mi2sws6j57b4c3ftwdjk8qy4ykmxz3wg4o5asbphuwakldkuxnhtrgh7wkge49g3cfd6naowzedutcsp74py9wrhke58fczvqm673bx0xmpw8i78uhoww1o3ogin70z2ljeft98j8yfsjjcwo7w97afezi4s6uzrvvq7syeibfhauxbt9mr2we7vtb97eyqbmtqy7pnh9m4o4qch1cdnhah1xittmxv5ouwio9i525mwjihcl9xoga9lq3ex23xzj051q59ytwa59mjkho5j4np2asnjzf5jiadsrh0k85u2htlgzq7h37uwpstg6e0ndwovw7qfcnkpex71y0dgxpr9x9desz1xvwd7h9bstltw4znstaq5rv3x5xws13l1wg55r5q86spq7gwocu72utaypdc2k3nkrjgwoqe29kbvzsxyapht4j2yu2bwaz144mryqpx5pa5fjya60kfdznl72hwidsvzhm4fih5xbn7suscxeoghoykzrnwpj8uini66rf2xgnz4f9wk6xyl7lpjyjgaosy0fagdrz07ho7r6hkxrbftadj9cnaltg5a5top6o888ucboupvts5ibrr5dp623zr8q0hblb1h6t8fapqyu0rr69xwdm',
                image: 'oc9blpoyvxffja4njvrlbtmeay0q6lrapq6365avexvtd082z43pjshibhvdt77n01gpvhaig20udkxg4hphaet1noq8i3i3q6uwyiprm0k7ewq6s5gt268vltmic7vqjef98yk71fvxbrck7xqtrwjtiqh3u0cj5h5clvfqyxvulsx8853oisoux5632mungwjtupvlwuovakp72th6kupg87cj5odaz36t7y7svdw3oeg5qc7ql25z4c4hiatr0ex7o2xtckghlzw7fbbxpnbarp3gzsc6dmgsfm2b2ufg8gjqxam1v5whdaqhvubsxy3h445en69zv3c80lj2ut8wmtqijhspaprgd2o5072hpzr1nal5z84qdpsjgje0a10d0jbwwieiwrftsz2366ygbja9s0j204r752ekslfdd4zxatclu05elcf49q0tejdkyc5oehdudfyu5cqywhhrlnc9guu2i8z8izr93foyngrhs8equjah1f3el2pq6of9iq3s7czdxslw3so7dcmvk1qsjq76uo1y71nph8fsgzjzxbgkt4fi6k0bjl8k7vlf1pct57i8eb6vqz7g3r8fc8mvgg3lqlia02wg5ssxxugjam4wo2ht6yskwq607yhcriq6vt5u877esogo6este59a9lc5qhgd6mbv2bgti8693c1ccx1uqkyuhfx464y42lv2xm5g3ghu70sqhxlccsfbv6fskg7s8s3m8wehuzpr43jcsdtx8228fdzkgp4vo724h65itew74sginbtprhe69r2rpd92s7ukujged4of0q8pr8cxsrkc0yuk1l3grbn62rfrzz7c3e54xxu5vk32guqd982mb8jmb707ym74sjix4a7uryvt4bntq5vezey9hgykibasrkwjnjf9wyats61g520faf5u3ptv0pm9esefsytzlh7c07a7lm103noaveunb2ac12vhi37v6pflbpl5bd6fznqqwshx9o949v2ohmaobo56zfpx',
                sort: 876109,
                administrativeAreaLevel1: '9id5i7e6mhi8g213ylo58lqw8y5eqels1yuuyhpdffrs43e6g4',
                administrativeAreaLevel2: 'jb4qvzzhz1usoe3hswayqyy3qdm0spujphgo7ydekyy5az7ixl',
                administrativeAreaLevel3: 'mo0vpjp376libejrchm6alyftrm0tbg7x9ha9zru117ewty9cg',
                administrativeAreas: { "foo" : "bar" },
                latitude: 391.99,
                longitude: 164.99,
                zoom: 88,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha2 must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Alpha3 property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'eb73fdfa-89b8-454a-b874-a82bb6b4577a',
                commonId: '22a619b7-6af3-4143-9b46-37995cb93a83',
                langId: 'dedfce4b-bb03-4b71-b06b-5a152d70943e',
                iso3166Alpha2: 'br',
                iso3166Alpha3: null,
                iso3166Numeric: 'iyo',
                customCode: 'mm0qocm552',
                prefix: 'xgr7w',
                name: '24btjm956lek3z10qqiy2nijfum3s8g0l5zzck31q3j4m4p45j4cpjuqctlb3hpkbyfyl60h1qdldv7yvq0r3bk91e6epk0e4gimx91vptzkib78li42ug2k9lxirws94flvi2b0i1kykmityspe04lftsebflnojqa81drpxq55hzb3ocihv7okktz5cy2bn57fnhsuekbph0c6fxg56xdgyj4vrvx0a2dhbkt0ctfgldvnif3bbx46lrspzj1',
                slug: 'okh5surya5552ewr9kteyexjmjuf103bmxxiljcvqrnfrc8977z0ton8qilqyel88v52jim1nzmf6fi78eeh513wgmfqtymw7yeuuxerkmn5za0aqpud9rgkh8othd35jhimg5unlya2q5x4mluawyz8548ln6cdttrtw14pypnh2uz8rmdze16i700pir5t3rxpzlom3zblepetpfdgui9x8704oozbqc3pftsv5o8ncfl4u9hqm0ytlo945wo9i8hfz0ka1s5pjqvl62c6pa2yvuuvc2d57i3zcvfp103plnsfohwgdxe2aq41mh88sov3cvvsupjgh7d00pmm7gpq3d7vacv74hzjuztr9fascm1gxa5sq60slex8k3mwm4poucpfgnldwuy4d0kqmwwohqhl9x3it3v9cxywflhkdx75uidgb27irz0or9wfj8m3hwx4y1qwanbj3fpr36t23f6msv3v0kbsnjof0nl6rxghizq34cq7i33k7o13l6o2gxi4dbi1y7k15esl6jl5thysz1erjv5b68wekfestk3am84z4070kiwjnxcxgntim7ynlim5b6pr2zque3g80z9hmm42472emiksfuoqkb5vu7jwrkb28f63gh7it4x2d06xernr5bhkcz8b5mo7ho35sryzym02m11k74l3g980l6rsy8xmbl7te2vqzrbspg1zxovzoxoc5ykrzdlq9qkp54sf0hy99wxtaifv1x378gj634gq9um759i05ar9ezimprdugcjnahya1h4mxb0rtn151k1h0l3lihihs9r2m85qwskf8eskpussmt0sdfm3g5nulbsk9swjwxhgqq7expny95ymnlgqetiazkeyz23yvouu5ux5o8tdbtgxag22snqau23xs2jqx6rl1lanxj38fktd0s15bupv63wqe589hvpouq9cp1ntbywqdc8bu7xrymsnw0auju1k353wpbbq8njcta03sgm1ncojf2qh4wqfhw5bch3o',
                image: '9w6pft30slv6686g4gplygai5e7bbc6cr6sf1233w4ccfy85188b8ir4ce34xj6utcsfw6kpf7bmg2t94pncb1d7l12iy35zv0gt3dkacgeks7dox4her6pz2i3oeem095h9htc59ct58pgw1iyhk5cjg94a6cjkz9hc8hwkawejf6x0gs61zl64pyz36exbn934n298ve4qszur851i0roj1k3zksyslf7kj9vq2p2li3kxwzdxg8bka8bhv8er41dryx6pnk5yswvcav8tzsk4cwmnfd7v1uylwdykdatbk3ztkjezfbimtwhzs1r44b7f88fkx94itvt3w6r4hdvd0kmgka3s49ehqgxokbiul0ev8pduzxkj8jowx8rrup50289upovlxuc8yri22vmswx7aptinkt2ppa6z0wh4gbk3fo6kn374jbmxiuolm2ykkm5b40xxxpz3l6fm90un37zjk6m0f770ysgccri1hw8j80k8zpsi6l77varbx8mrst1p8dluq1t4ouiykvdnss30h6z30w4ipaq25jedecykxvrck31tfzordg1rptf1a4cvhzaf3s22n4loo1hcpdiwgorngwdfle9f3cjyy21vie2kgdaq3mfgte3gm67eo5g7o0tnc38mr1yw1cn5m0nv4sdw9n72dzjgp2tppli1553e9poewg8y9k8zfnp7lkagjtuomdriyhh4t5oc5eq7clzujptjtd6bwop4ekxxepoxn7lhts24sxafxw921d2vxjmbhkgzqna162jprz3m979dp674i0a0aen2qcld3sjapth5ww8ae6cb9923fuynnrtunyk9d6aidnmt40b5ef1lpbxsmnkher7o71iac6gcovpgseuke3n9vlcegmc7624nkf69ah56gkeylwikd96glrps0b3o8eq2egs2019dy6t1x46y5s1mwtlekzyg2wzjb3i67wzzjtp93czs18wo5zy3n18ccquz4e31gjx3rrlt8qa7701f',
                sort: 561056,
                administrativeAreaLevel1: 'ns46fv3ecrjs3o5z9ziurshgwwpl8n7f0his3p8t623136lyo6',
                administrativeAreaLevel2: 'sqy1z19t3ja9jilp8pbyx9xu5w6cz3imsx0rtkfo36r6tkaza6',
                administrativeAreaLevel3: 'r8o76rokr9g2zd17x2hn5igbus6ebwjle5mya0zaf5f67r62sj',
                administrativeAreas: { "foo" : "bar" },
                latitude: 291.31,
                longitude: 474.62,
                zoom: 42,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha3 must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Alpha3 property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'eb73fdfa-89b8-454a-b874-a82bb6b4577a',
                commonId: '22a619b7-6af3-4143-9b46-37995cb93a83',
                langId: 'dedfce4b-bb03-4b71-b06b-5a152d70943e',
                iso3166Alpha2: 'b4',
                
                iso3166Numeric: 'jrw',
                customCode: 'ui5azk3jo6',
                prefix: '14uts',
                name: 'd04t62xoft0iyj2g21nx4l75lyoe174zan09xe2uepajt6bxutyjcwahh3iavty8olh4be4y6s59q3vg4i1tpy96c4xtoditatowlmtboht6e55wpkvrdc9s98k5rcptmoragkjbplchq061yjqblu534oyj5dcbx3xxcoed9va7o1b4hbe59ai9oamm8hax2mrpc7pxwqutgk2ncsvll50u936tofx737s9yd7p35solnzvmcxht5uin9fp6tv',
                slug: '6kl05j8bxupxg5a9h0qmcyclg3igoecnegmm17ay3q9hpq2485hj1op77sspjz4xonuct2hx8jk957scarf6eyjyfcdvwm0js6rz4v1z4o4onc5afxc4hjnk5cumk603m0iz4anoqyb5hfhmpbyklh5931t3lmp21ef57me1dibxs5irsl51ncbxht1unj8t4tokefagrdo04ik44nrz3fiipdv9rpc5yf4ebixj0ddrluhroz9lnetg2xwbikqfemxb47lphqbjd1hmye1pxs131m21or9pc4z1hsk5g9qdi231mryplqq8k6pg8pe9dl1au9vr2qsklut6eexti7wx354dzr8i547n6z0pu523lj0hvyf9dhtgvg9epchupwkdzvk0g32k6q4phboh6l9t7ttg5t4ohi1mpyluj7lioo7rola44gz5j8p1841c96j3za5m4d8s2fypejdqvhc3plr4r3j03ampij8hlf7hkozf4kz8xewc3d931iqekpxjzv9j9qzrlx7n67jedabzj6s2x9rv27ygneigojzdy339dpb6r1h9tlka81hsvkf7si3mbt658rnjucewvqacq51315eken72ngvi4hzv4vcltlu3rdo5j7nd0tezojpv6zhhpehnfhnefyyb0v77a6v28p99bkmflk7wglwi4sf1rkkf2y3e4bqn49epmitljg2jqsdm3hk8g175576rcp0491sx4uyf4e4b1iez1bdeto3ltcpeu9yltr59rn7cndmlfvm88f00674dqecyut4oat79r6djk0ojvvnu4a3exuamqog2m2ay11v2m2zlxg5q9hsmt3qaaac5p51m0lkhzode5lk0wyymxfhoxqv036ambfw8n79v34dahdzbvmm3vbltokjyblfhaib2426149ynqb0vi7ovyt60vtki1tmpbh878gcp7eeskiz55tzqpa4hi260p40ho0g7vr491iy8kiqcosdt9r369wtsx9b1s7t2ut28emsr',
                image: 'qc4zcdm8ojo6ttusamsbrtka64f7bp85ylauf1jew10si864hblnp95rpgw3fe08fwthp1wouorf7hkvp3cx5e6yw930qlfuanhany6flpkw3uy1u7yniqxrq7t2zy5u494gwavwnmpy5gdimoh2mb1g1ec40goqpduu7up0zjs3bojv5brat7h6mz1kigwe345sozxvyqsx5c486tnch20qwnqhvyalpwkgyumkvrsy27zzv2hnit9z9ckhunph7bsidezfpmcmanb92daa15on7wiyf5huhiiibnf9tvln9gdro654t6rs834asdpnjevn9dhq0ijchnm40u1ead9krstwd3lxetudp7amafyewplmbqfe9vey2e01dq0s3il3gm8a9ketji7v3m1olhyv6lmq67s1415iedflfhpd5zr1r4bhi8wbjsi7d2eq72dubwdh0wfxmej2w4vy1jsigc8jdgfer440bal5xwa2wfm34qk4z3br78pkcgqembfwl6fmd8xgjmrlzvrgrrz6e07xo85mwvsnvjoc0zfb7w6gm1hhkm6q61m053fyf8wxpu0pu0udqqiap4m41fhy30kakgnterhb8symdkgs8twyknanwgpt1lo3xz6rryob1dldnvdyicy6t7fgyeii9ky3rjatzqfg3zo6ndth1ac01rq4khoenm9fi0dwzx7hugv3mwdcaqadq7hkk8qt2mldnreehzmqpcp52u1yadpoyo9ks39hbjly6c0kvybp4xk63qweafpvox18agcwyl7k94307qtwtft6wpuh0cjzrpmnxst6sqizb6deq41amjiaxgk8drghqqm3y3oo36osw6njg9tdz6pfy252fpecnaywg8g1yrp3z7jxv53ldr0pwrei31u8r3kvxiolqq4s7nttiekcifecjsae0fwh4a5whtwr3ffdfimtv0xjonhwafvnl86ijlmh4e8vz7pahl4ii8oxtdbuc8m89f48jcp05lng81q8vodu',
                sort: 146525,
                administrativeAreaLevel1: '4rx8she94ty5rk2jboqt0prkm6mfsq7eopnokgbe8myzsxpa07',
                administrativeAreaLevel2: 'lreb4bsmp629v5evshrhgzdm02s533vrpvzh3l0xxlm46hcvmj',
                administrativeAreaLevel3: 'dp6ng1ss20uf0du65qt0eib5vbccjqsfps5mdn1uyawlnkk75s',
                administrativeAreas: { "foo" : "bar" },
                latitude: 25.66,
                longitude: 637.06,
                zoom: 42,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha3 must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Numeric property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'eb73fdfa-89b8-454a-b874-a82bb6b4577a',
                commonId: '22a619b7-6af3-4143-9b46-37995cb93a83',
                langId: 'dedfce4b-bb03-4b71-b06b-5a152d70943e',
                iso3166Alpha2: 'if',
                iso3166Alpha3: 'jo7',
                iso3166Numeric: null,
                customCode: '05on18ea38',
                prefix: 'zm3or',
                name: 'hdz6do9ydxa0bxjdky7603287rkys5mwxcspoxu2pln7oamk471odg89mn6w1a78anevrjm9l0b7lo1iyq960f3xukxb9i0by9466jiwsi4gkkufulqjvoh5n2k8u4li1x86c3odgwyp37echysiacmqjwrhdtpyrdef8sb1oty9vsvog4qjyiqd6xwqyljuhavxycvr3c3yjs1i0567e7mcbqk0dq2h593x60j5ilrn5k5fis88z97snd90k3s',
                slug: '8e4isk4b7olxi1jy0zpbuza24x5x3gsfrj21lqsgc4m489sm7zgghhq6brlcyklwd8ezv0kvww21txa2kdn0ohkxy177uisxd9y6thp8o1u20phs88r8ma0n0xiofgn78z0klkxqlxqsv02z31rjdrni0zkpfyderu5yd9y45mvwex5u0f06nbziqzkwpj7qsnwnp1pmt2pyf5l4lbu6oq6t7p4se0r156l0pfnwyft7cedqzse4f7ob61rk29bucvdh1wqmsvujdxle5y0y1lvhblng5r9mepjcn4qsnxiy8g91fkn7f5mfh5illc9ba14cya0ubdftn39q27u8xyh3tjajjzxn1qj25tvadrncw70vs6pesn6951t76uq6nc6chfu2p29xiwqszjlmul6cmwbqw6wikkb389jkgodmzryzk1sp6n9d2gsqbdh0wmqpy99dwvkh8e591v3a7knnq0owhdjiw0t8gsjwhxby3b8k878l1xw8hab0ccp5jsudzp65dbxp1yq287fj5meympwcvj7r7y2cu6rx74fzo3pql9oclmbbx6beu7f8sbox25cgfmxyta6gt0mtdmszbreqcwbc7s5o4dujl2c4dps84zbjs72wgqy4qv7jfvi1e3qtfoibehq149d28xkryp2jpn3mp57kgf3hon9w8hyv34dsxxbnbq6bin1utesvir0nt5eb76o0ubk7ljjtxf1clzcykms2o8kc5iucddrcql4vj182r2f7p91qice64gghziflyk189rmihzfu22ss0nc0gwjwu2ka4jxlda00sapbnnn2bs9d6lrjdkv5qjz1u8ylgohdsjxj9olmtuc6t7q6b95upbj15t7s11ec2080osymes3g7k33bk0vs9dmb3stqzn64vuw705rd8fr9j0w0telo7k3dpeuaj197u969l9m10i5pn87l157zym9y3g09y74162rzbn3l4ldc5r971l62qvs1mwxdos294oqah76d1kmmiv2',
                image: 'vqlf2tggvc2zqufj867i982z4kstlstlnkwme2qsue7xpkrssg9mdz8s8p7pq8k0ujondmc64zsdixk3l8opwurq36ehuy5goj8ud4zv85psyuzafr4ppi6c4xzpynhyoeoevzalbp8hku975pk0hr33kouns49e7a6otawgtw3w5paimxfof5dwkxsxh5yrztcaty5f8snosiv63h1ys9ghagjilya2ipnwo78qp48l8awk3jlelca0ukh2d6eda2fl5medzohbzijodbgath8x2xexexo7tav3axciscy8icws0cm44mmpklyf9phogx8tzul42bty0z3thcwcciqdprbbd811jkp979weyultywsp8u93xdm0oxhmrhe7l2lvche5iduyp9xnj9bb0lv0b6k7vceecf89zp7sqi5fv47r8xdaopav3oblh3ll5nemmpxf6ogtcel34p9rd7seszj3b8hat931ghg7rllrcranzyf99hnx80stuguz8y7ikfetrgelnj1cvnmjpsbujiepm4yeefzfqd9jvq59fprjasd4n1g626cptuhb6edkymcs8u1fa6h0r9cwid3xwvusszvtbo9tgz2pkovz4utsyzl2661wsfjfjnf5o7jl8l7ishoj8sfgw2av0b769ta36o3tdgautq22oruogmsmi9r0nch1az1m6o68wfdrfx9qcymyyd2rzkqsj6ywcrrl6mi2sm4evnm4o8n2qycni7upl3ih289e4iscmi24ocoqv55vy8zs5h4btp2dzoqsls9m25tjz3sj9akvdsi5xuouh2ayd3romwilr4o0dnv6n8rawvopb5037k3emg820ky4v36yn3jsm5otdn50vnatsrnlm8tugc3tzzxz7qs4y9j8lshf7e7opt973wz13mhpfr766pvs4g0e8kiwtajms3sr8kkbwhmgwedy56vb05quvlh3thm10d24bhwr8hbup6eqfov39k5hanrbxgd9iazcck5mdwdu',
                sort: 804475,
                administrativeAreaLevel1: 'glux29e3df4tbk1s7w81ct0x2nf6moec4gjq1zjjnbdowz4bru',
                administrativeAreaLevel2: 'bs2nx57l9y4j1f7d8r4q1hjp72svrebq4tdoz7caqp3hm95po3',
                administrativeAreaLevel3: '6e9q0pkfyzem6ffblfgca73phuc3lpx23hy4au7y646tyngh7r',
                administrativeAreas: { "foo" : "bar" },
                latitude: 479.67,
                longitude: 770.62,
                zoom: 55,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Numeric must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Numeric property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'eb73fdfa-89b8-454a-b874-a82bb6b4577a',
                commonId: '22a619b7-6af3-4143-9b46-37995cb93a83',
                langId: 'dedfce4b-bb03-4b71-b06b-5a152d70943e',
                iso3166Alpha2: 'ba',
                iso3166Alpha3: '9bh',
                
                customCode: 'k5yb3zyf1t',
                prefix: '2rful',
                name: 'glp5y66wx7z9n6wmriqiztw1sfzvf6svxncxga7hw9gp6ezlmh1xvh1euttf3d7wd7ommzjm7zo8nmg9d2xcdij8pwd72idjgw4bupq658ut30kwc7vhxd3njvq1242eff1fup2i9h7oxjtj2m1frnmi3s0gu2s3xt7ylz0mx2q0wj70d30fuc4a5opdj23ak4xhpncc5h2xs65ig7p8wumvgis2ysklvqzx5nu6rfwtip3jv6gghd6ul9mso85',
                slug: 'htsn7mg3q453l0p0za32k06xlf1d4yq1swyk8b6iq7vl7y0u02m274906a9ge32vatpaj38sd7cbw86nz754t5vwl6zi5mcbb6f3mzxidj0j0ysvbcf22rl2zaqrb40j0uhyixyvh6ubrc0zi89bh8866mbbvshco2gdsr479grw34lt6s4kx0p0c9kqrrettnjietgfodtzan983h9kjf4sl63rbup7lmobu7kzu0ncuozf49dvmldoxon0e95tmmj2ud5ra6oyr4p79s512oentmhnn7us07xu90yhh6i03in0vt8ekb5drckwzhkddujkuuk2pakhffz0s9asx2ext7c6euks4lb9261fkrk2ruehf6erjlanniikeg5kpokzn2pygzl85r6ff4kcn7cpbvzzt10px2x5q6wvhi6eaouktiv7g6d1rnys65fshs1262ccvrxckumhlbzd06x4035knwzgx5yj40cnwzyrpsfveoc2t66zal1cfa3en2gfcaadddq758ztubspv2uekgcuw7n8y7wkwpxdun2ymps7nfkppbshbo5mq16we4qkyb3w0lyouwmjykqjsngupkv4ahlbmz13pgi6aqhteiymrqu4wbkeatn4gd9s5iogkjsz81jl39iuqge7jefq7l8fb2pxbyh0lns8naysnjhte664m7wqtu2e89tf0xasasxhyw4qf168mxhuic6qewlbqgwcl635huon5dcva5m1wt93u0e578bnuo5drxwft74vp2hbbui2c1bqf1jrc44m9ju7kjn9b11hjycztl4p3t8540ubuja51busjngpx075ozweoh0oe2g735bqrpbkd2mouzbloiclq2mnn9s0if8eek9ab55s4zkj43n2fjddo8gta04ceamvbqdkn9q51dqjcku4o8nrdnqmj8no22rs08a3asb2hne1rapchx0eh7vqaw6jmzr850vldl4qf2jrn4gjwms479bdw2wbru35cdtvitwoo7g4',
                image: 'hjllzov5r3wmxb0jqy8jc2nv3qjzhi9rnmiau120ytrcytlri0io5vmy692yh38i0kjos9hyomdug7aned2s5g4ffucjrtq39gw97me4ynrurslkt8gyi691getovzm3hhhufrga2uscx1zg4k2x38f5721teujzzi4thpdhjb1905rutu99s6o6jyzcz2ipklk1ylhut59pis62kmg6hx6rqyfp470gb4gmqhxwep0ftsp1dhjo8qn1fygziwsy2njoc6v6z9c8v3vae19mc7gn75knimzzom1ig0kcganuc6hhwqkuesmcqbxefnweua90d4w568m0do5mi5q8o1d2xbf3w4tpoagjdk4xh2lnb6b7kh4gxt2vk1jmbjijvg134ccu5khnawyd10wzgw9n9akc44sxpy1ee2rztnwxfw7l4rpkbfycvqm05t47lb6r7k3x7g7g2b6prpngdx8pkdglh1hiugmuhfla0jtyx8czxhle4nr1rdc3if20syqjk47ri740slcaor60n5ywc10m0r3g1dx9y2y0h5yhrzlm3t17u37d53ch4aga7obcrh3fzxmqnumuohq8gy75b2fyyg1he3hvylqsloadtfp3uzu4ssfzfri6htc2dsffdn577l5redcmv6eeupyxzh523begfyal3g787hrd37lfban2hvpy9t5szwpw7vvbz0s8thsdug8huw7zx50er5pdbl1irx09lwoq9mqyipizh0ka5mfuzlzdbb9xnr73pjciwaf5e2qqvrn95q5nid8awei36wwa4q1oaipoo6xzbaze13tinn349dcv485kfp1ujng8naejmyohw0lh2997k8gbmvlqno0dier6gw6obdcc3ox047zkf9p99d0jh7akvgb89n7arkstu8kcse2jfpwclyfreus32r62i92b177z7gjdyx40ztjcbd0spb8i68zsvvwwz5ye2ucnxi2khjrz509xfdzcnxfb2lp63edqn3pjqrrau6ll',
                sort: 605767,
                administrativeAreaLevel1: 'obu4uu178o98xcb3259m09wig7s6iyi90rdqlwcf5ba5ch3cir',
                administrativeAreaLevel2: 'y00ihqvdc4ddi3msja43syc6ix1kwr7ddotmqfk6aewlgmrilb',
                administrativeAreaLevel3: 'vu9qh465600xen0yvesmppyid2hl72y3y6ynkpsgnyudtf8jms',
                administrativeAreas: { "foo" : "bar" },
                latitude: 585.94,
                longitude: 160.09,
                zoom: 33,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Numeric must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'eb73fdfa-89b8-454a-b874-a82bb6b4577a',
                commonId: '22a619b7-6af3-4143-9b46-37995cb93a83',
                langId: 'dedfce4b-bb03-4b71-b06b-5a152d70943e',
                iso3166Alpha2: '53',
                iso3166Alpha3: 'gch',
                iso3166Numeric: 'ak8',
                customCode: 'hmzmjyt20p',
                prefix: 'j63wx',
                name: null,
                slug: 'zbonyyrdxa4hoa94jl9wirxo1lias5vrt6s0uiawle2dzj8o06a9msgs155s7wqo10xcp3102ce44clos81gyd60lxk8qegkckaui5pkmsvpgp2qj9dykf2lswoq8q98v9d2cnhfgpm7e3fyii0z1b7wm2g8ttnc8z2034l9ow6rcxdgrm7d0g22giai0k6ctw9uyo2gmiwcnpn6mchhz4l1x6vza95kihe2ualnfk020eo3v167f1vyf7k35r00e4bebhy0zrcuuqihly4h5bnk9lhw3zk155077gwngapjtb87z3w1nvfapou1w2kabzv6fc4gmzat8463ostujt9n1t249uhla2oqen0aludwdbtwmez6yt47zeavv3c3aj6gmxkv7ma91kyn6nnfrz14dr7ab7hzm7jsktwowmuvnwzgle2lacn70rgy65ew4anuim96i1twaaatztyqkppdriztko4uwbxr7a2rkyipa4hzkyhj17ug7uncoh4sjcoav4yndodngb121xoxoxrl45u8j6b2vjwn9q8iexcncr5muunuxds82tunzcfxpvt0reo3c9psgr6blowug8yv981pj8kzplhsf9r5c4kblesygykk0tphplrv8hionc6wolg58wwmnsnmocs8s5v1phwuvbf2mff5s112ximm0onz1asynw5k70uaq6m9ifmfl0h25ruh0zyakljub5cfrs8nrj9lqwvyk67cmzrhk1qmir0v76dde7en5y20wqvi7ppx7bav83h93cb7qpn7si7t35abpailnkeqqsm59b8jev3p4gd8kvt273x26ylh774gvizmf0dbneelomer4l25n1gehs1avcbozg1gjvfo0k1ixskapix1qq2xbwdruujtc66d3k8g3kkfusm0txyw6wio5jff3lbphyft6x5e8r42qtdf4x2zz3qm24hfix8p70qv17i7qgb8yquvop9q6w5cdxjyh60g0qjpjcdsqx0oh5mnxr3i3pp5',
                image: '5vhqyin7lgimjusronohsodnega5n3b59xr8ugl0vdgysg2zq7xmurfgk7xw9i1nmxe58dlcefh8z8zppcxuaokf8kykelwor516pb4c66lbbzuhyr9ltn798eirdlgx6m2fzonfe2ad2ilos37j3d1mnn8ie545pb1uvewjx527y1m81t4c1quwfg3rqc7zu6ej1j03k7ippw82hye3tum6ch4h81vdv00uii39rfle85z65jwwutfy3fdf5l0om7z70l7e1h4gl62ux80xkbo5pwgl6fzuk3gvww3ekl5tx9xufcqix088do5rik13h38o47cljvi7lc34x7p0eybfzbrq4iu6c18v4q5c0iw8vcb9crc7nbds8ek6ywxz4q7pazghjv43gr3pq98bkvjzco9c599jckru8qn2o5wyrp7xf2d1v13m1eltd6dey9u8py05t758aynl9v1z78s822c4r0x6z8aaz6w8sm1znechamxd8tqyu38q28rmumkxklt02ipcx4zs5e26rslbi9zvh5a2wgavaz9414583benkl1tlgzgkahdrfpyd112eb28f52hf9b4zz3wctvhqxydsm0zouczg9bx2qu8yx9kn1blqw6y80fanhoxt3bg5jl38zyosn0m4yr0e2l9lm07fgfftzvh6z60o740yzv1xwssasmaagnpg6aer75rx9sta2egd2hk3vw0c2q7ck2ixuvt8qrlihrb73yg3zhjd6u6kfcxp9zyuieqht7bhg41nkisxcxuvxu8qn62e0rp8rso64fescr84miaaj71cs79sqdyaztxms74x1zwnrrwl8e068u7xql0q1mougvifmse4xcmhzdznmt3eycyyuyfx1u5xc8vymqid2vqzc2uidos9hiid00jmgmtumgcfajablel8nwv9w5rmgpepx2jbr7vmzrkabo3okttpwace3bin9ns5fs9fjgbq99wjpq0y9pfyd9831fgyxh8sly1scvh1buowh2v',
                sort: 243534,
                administrativeAreaLevel1: 'j7c2kr78ocsdyoizuezkv93bouuq8avio6xjnu4yh7yhuwhe88',
                administrativeAreaLevel2: 'e4fl4spssg4t11z4iugynr8k0jljxwq6q4ln4rl09hd2ot9lc1',
                administrativeAreaLevel3: '33bl8cugqnxt4x0q0vbogxd3jlfgma0et7rhvxsn04ujgheo68',
                administrativeAreas: { "foo" : "bar" },
                latitude: 470.45,
                longitude: 727.41,
                zoom: 65,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryName must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'eb73fdfa-89b8-454a-b874-a82bb6b4577a',
                commonId: '22a619b7-6af3-4143-9b46-37995cb93a83',
                langId: 'dedfce4b-bb03-4b71-b06b-5a152d70943e',
                iso3166Alpha2: 'l7',
                iso3166Alpha3: 'z1p',
                iso3166Numeric: '9ke',
                customCode: 'dxuz24udo7',
                prefix: 'rmb4p',
                
                slug: '1ncizmij2kkyorm9ny6mtxj39o030b3ct12b4axtr4q8hkbdh6u2w0m7rvdf1n0chpxy2s0ee7l1d91e0kgf9vfmsui8nfq6i2935le40f7z2wdb456zpl8vf2a0i7q3rnkqur8vx0k5etbrj2gstwlt2qkzkopl2gx6555vbv8ohj3txx8sfjhdiozyd1cz0z87ejv2fipq9u6qmb2o5td1zzdddskprqkifka3ae112j8li2vfk8brkoydp78jgpp4v0yrib6rcv609qvjgvf1kmh2uxadxsux24pylox5jhozczl1lcm93n7xknsoxzxelq5kjmtrw34yxjf7rakt69g5ucozaijmd8eftvcx8b1fzqtuu0dszvazucypkp2kc47cospnspne8vqzxadt0ufopu1ohpp7uvw210wfmx8dsclrvoowvpa7rmfs4ytcih1vtrnh9xef5t4mcy4n1sdkagkurb6flwe65qo5ly3b3lg8v282uwf6lwyasqs2rbl4jqdp0bwq5ayqfgj8jkn0ecx8fq623a31fls1l0lnq02xjua4xff2isezlphofe5ghzeuuthc0a5hbeic3p5fxpsf3jd64wemyvx4z5sx6hcaxeomvhbxyc61jvfdqlb1aj39s1eo0e7d7tafanzyge59ukc98w90vb3bsn5mbnl4ro55koh6v9p5ougec1gt2wcsvybfzu0e91jqxvwolatnw0kb7ex7c914yct78o7q76zqxvovjeb5n0ggglwnabn6uj0oufb32sw5gdnejcmrm5xfxa3oqzace6snwxj9ndpw1umwbrx71co6kemx9rcoop9tathlp91st6cv1fs1wgyog7u6dyd2n7ip95t4e8nd49cpz1lgbgk1dwmrlkunsgmyekvv2lmf5xhxtgq8q0oij3iutr239or6zahzj8o1q7rs30tc1nrkqv2j8kmjij2cnrnsrq2jujb7xw0ix21swhuuxbxgfm0k84entj2l9vzkjnsy',
                image: 's45sxxal4t8d8pl9wfmbtnyp6pqj0j7llw3g9wv9fjj52i6oof67z6i5d0bnwls2ovid88p2s08vn24qbzwu7u6rwb5gwyji8n5jkn7tchlcfg1oc7odsfxg0m60x9h45rha3sqqgmyirtw22zmm0su7hrsbtl7cli4yh4hvbpnc4welmpbninspp5f3weinvn2u59rmj9jdxgv5ngc66wiu8xpvry577q3teprp41f0a6cyq6bjmw6060ha92zlfossm8932qe1e4rd3t1im0ola22qcxgz90kmbkhdoxulz2q09e6u37l6ienic3b77cvcid9bal4zlgkm69mbwar07clvmg3lltefb2m0f024h5fl7t2la6yzthwyuw8v8lyihwubrg72rmfrzja7n8ofufl4m594qsnfhydq8rynshuu49azseg9byun9dmmvp4e54iu1i1061k5tg9q9bs6y51o8n25bz36m97igtynnqs8jrd84xlklzplgzw76ptw4wsjjgybrf5z0h3domxqp7dpupjyhac31mtv1eglbhdhsh1hjkzieug76joacj8hkaawyks21orw1m3xsu6pzlhg4o0prk6yn1lbludg5ub72c5twjtgljo59m2rfowzrykle7auhwcy5sq5e2t7hiunfiinnmmocgl6wseq4pm3eorikkecpgm7tv47cnsa7uywnbbj7v5jdf3wnfswfubvjmws1eu0a70frqzkki03rcbcfalimwrr9t6wctsdhtzsdi1qy7x4mqiby7yuyu23kslqjpmk5yhopk1f7ld5w5x2taaoelualpje7e5whji0irdz9knmad7b282cr6a6chds1rzm04k9j2yg4g5qx9q2i6wws9clzjk80lt6eu9v0nrfk5zxkp16pe3o5wkps2bx23v3iv8yailw8hbp3ehsj1ltaznie9a39p85w3bkdb7gx8jfxgurp5gk9gqvx9j2jl5t4zqpo7cpey3jc6qjnlxb52rnlxcj',
                sort: 241233,
                administrativeAreaLevel1: 'd01kcq4xuyufmrdcs0ntrshiwzzgxlwzypaehfodzkr1a3k7jj',
                administrativeAreaLevel2: 'w5kjc1veqye87cbojegm3442u7mhqlqp51scfjlxrjak3q3qwy',
                administrativeAreaLevel3: '20sxe1l62gohoty66z76j3yvl3hk0h1mywkvaljvn0dmwuo85h',
                administrativeAreas: { "foo" : "bar" },
                latitude: 441.04,
                longitude: 577.63,
                zoom: 81,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountrySlug property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'eb73fdfa-89b8-454a-b874-a82bb6b4577a',
                commonId: '22a619b7-6af3-4143-9b46-37995cb93a83',
                langId: 'dedfce4b-bb03-4b71-b06b-5a152d70943e',
                iso3166Alpha2: 'b3',
                iso3166Alpha3: '3k0',
                iso3166Numeric: 'oh6',
                customCode: 'avif0utsqb',
                prefix: 'p2st2',
                name: 'yykquxtofybczbiq6nfgjgaxbd6d181l6oif5bkba3vf9lcosan01xw5hudxsra3l2rjjrfw7qpfslizd3bj5jk3twf35yfhuozm1i735draxtckdu6wy56pvp02vpurj1knfc74q0j0ifgmr6dwi1jbn11w21sv50roe53mma29va9ydqxtmjhmv6lj42pjus5hni0h73l8ms71z4ub198vg31igdprgzzyq0elbp1loplyifogbi9zhf4qftu',
                slug: null,
                image: '3j1fxo2b1st4wvuia2gfgqt1z53qtwmayfs77ldehsapu7kp4yjr2q9o6va4hx7jrnnzi3q9v7e1bhhrjegebkt2te8q77hkf6z0s9i7hotqf4nyel6dky8nw9o3db4n3p7pt1w4oisjeqbpg7pzxco1x8mq76gfit9lwox6lvv0vww9vzv3worn9jo2s96u477fzruepzu629j1jhld6jpajp3okntzgrruiu1mw9p7xce539nx0m8w34a1k4u7633l511s7jmxpmuz6q5z4uoofsi5ghc2psk02rwkngc8iz9clw1y2vs37cdmzgxbx8beav7sdx06g9wfsny0ild389faf876u9lax4vnpo68xtwno64srfybs3yqstjwz9swmf25dv8quoc733voeg1xg2dy9vtql1fpyy93fuc7ap95uzgqo3qelyc3ijmzdzkfqr9439ep2eiu3fmp0okgfvrmzmc6frbw36qowsal7at38bqn23sowdrjadkmh5nj1214rbu1yty4cgx8rb8t5jdddgu9hy5nhpyebgvlrgnq11lgoe8knvgrz1ra1gw5jbuvn2lftelv2l7r6aw2fmk059rnnditnh2diydvpwaz05o0q5l9qhon31ecqf51gzkuaan5rnd6lbg9vh7qfbqqjb8qm463o3npp1fw0ziy519hx6ztzy8xj7jjcx426qp0hghk7dj0ckncpzhkn5dg6z9dswrvym1jrycs62znnfv18g1vj8yplsrvt811x3ug4d50x3kasvy2ccjnl1x4z6l7dji9zq0t274plws2v6u2n9dgjmbr8cy004p0hby4r8hoshtp8fqij5e5syabr67xp7mr4sjdvi046swiekrv1x5gdw7nkfk47uc602mw9zh7to87j6su26nw6pho96arabavkyggiveoi1ckhs4jc59kaoftxw941o8p4ao5gjyx4tm4r1kifuvox9ypl5cyop2eskauoni9twazyk8rvxxqjerokwqi',
                sort: 906105,
                administrativeAreaLevel1: 'rhs15yazqdboapsvlhhk9qx27cismbzi8kxd68qy7loyb6ftvi',
                administrativeAreaLevel2: 'cmnxgpdlqxwaslx74w9yq0eirw585id58req2msddy94k4uqnu',
                administrativeAreaLevel3: '1s2oco7bnwg0twl5iguckpjhsneprlujnnjxwh28nniim4e7n8',
                administrativeAreas: { "foo" : "bar" },
                latitude: 300.06,
                longitude: 330.06,
                zoom: 69,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountrySlug must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountrySlug property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'eb73fdfa-89b8-454a-b874-a82bb6b4577a',
                commonId: '22a619b7-6af3-4143-9b46-37995cb93a83',
                langId: 'dedfce4b-bb03-4b71-b06b-5a152d70943e',
                iso3166Alpha2: 'gr',
                iso3166Alpha3: '4da',
                iso3166Numeric: 'y9o',
                customCode: 'gbuqbio957',
                prefix: '5y4ux',
                name: '2jaycu20b8dml2fsxxehlz2wpzx0u7ucxgfxjhb224fyyi5kyq4axs0dzdry357l8zfw75mlld730j9sennfclwwp7rbf4tfzcjfwmn7csg5xkunvyr13dpkdg468szq91stiskin2t1l7029co1vki1l3go2ykle8c5aprcjtruq1hvqninjhqppi26ba8ue3hpzfwldehoirmn9t29h3w5kfv02w9m3k2nwtak79xlrzw6jnl1gmcbzf66e4h',
                
                image: 'cqfcngbykmheay5smmd11qgedtfb7jtkq42q3l1vox1193javq2tzalc26wefjjs8oilzfi9ybynaof6r5v1w8el9m9hkptrxvghdt3rwzdsz49pmwuev1spaa0pxp0bnbvn1w02cmd2fxchsisu52kd28p0fjag0ntgbynvotln7tnvq6c8hwlmgz2abn7gd6zs78ey3yipcevvzgmct7p7p7rkc9o92ehpfl9azelh4gcetyye9u4oezonycdybrlp91ntao04ul9ncdricxpnzwj7eg1z10stjbav1duvz8q267hxpv5wztv235svoo6n45fhksi87jr6ibqudric2pple54tb3e5socufp0t4yt8791ojkr7slq72xsp6bvhffw8zuivet2jn31m6pkgtbvpkj7mkoopqndu8yfay8v0vrm5otcew5ceak8835bs93ta9rqlraoaji2u5v32brds220i843nojwwp61hnjnxykby1smh01k1l8l2dhwvgpn5sjjzvhphlcuv65lqqxljigqjmya3njometu5n3n6r18h8ce5f52t2viu8avleeglx9ko8dgkuraz9rgt8afembay4h0oi8bg91gu8u7a5gxl43y881izp2juhfslmn40mleg5yvk2rp1iw6obsfpvzpehgr2jqfkgjmijwbwm42pn3kgdx47li4bbi7ssv2vz7kkee5oz74xvmnjt7q2mqo7qwl7vi8gzx3wdwd2kdnggira4x3sd3j53loyunortyki36gg1brazadmpfkn2lz32geeeb0xgga2fj7bxhstjlf0fl3wnm7ysf2f4cu9mh6nty8xahsxajt8cmhfped0t9xl7w4xvfbszi5o3s7nzzzrl2psllnt0af9ugnp88nhb0na8g7po5u6jruemokmsoxyciqq21cdwmsrirwq8a7d8zrwp6msqs6w21w1fx4prbvp7l9kvbr7f6ik9g0vhsh38iqovqfmhc7501o02ufjd23awkqf',
                sort: 351285,
                administrativeAreaLevel1: 'kar7a71juq99tu3l0x896u8uto5dokcdfh3lqcuywlvmav3gkb',
                administrativeAreaLevel2: 'x5fi9mqonqrzcyttulamvj9wcngkprb4kkro5dm0vj9mi7nrb2',
                administrativeAreaLevel3: 'wj77mlp74wtgsfwz71xhj3mag49vfs5t25v2d0a48slh0cmh1z',
                administrativeAreas: { "foo" : "bar" },
                latitude: 452.82,
                longitude: 981.70,
                zoom: 72,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountrySlug must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'd4wglq3o4k9s77ki7hnrvyx4gw49ggcso2bzg',
                commonId: '22a619b7-6af3-4143-9b46-37995cb93a83',
                langId: 'dedfce4b-bb03-4b71-b06b-5a152d70943e',
                iso3166Alpha2: 'ht',
                iso3166Alpha3: 'dj4',
                iso3166Numeric: 'w73',
                customCode: '6rve4v8jco',
                prefix: 'lbu5a',
                name: 'n515zh4g3wm9mk5dv46rmdns5q4a01v4v46wrg6l49xwznip7m44ofeu51rtp0xs5b3q3zonuv1xpfzyxljqmgy5g23xg2nulqplj81x9b5eqekosczpdhwd06dpvqmqo7q2n3tjujjxu1y7ynnzpgi5i38hek8n3xe7pcnfotwbuz2kz93z1deiktet4bdkpc04ws30xyxbixp01dpk822e0zdo6md5bevuip3oh67nbj282claankiib05to0',
                slug: 'etih9lhrf0llr6wpdnbehxr682icygjujom8o2psh7xgapphi3ckir1o180wipzc6qmw0pzjxuler3sulhsn1gv6jvrx2qzeifjm631kognhyusstiwo6yso59ukc3j1bbouh5c9iwqr8yaynv2g57rhx0kedsxffja73bdbyjl9lcyz9asyqf7foqpjsmwwo6au5m815zaqt8h0m4wjhiy6i3cv22wdb8zih6rroryfo3aeqnquqnh5cte05ts916q0mv56kfxycvodujy902rxweuyifa22pkhlu736l6qgzsxpd7fyo1xfys2c52oq6v1qizbfs3487h510j9vbbi9fxoyg94ag666ma3bi2j1o4xdobzhk8py314sgas37bnd7xn3ep808en7kfpwr9d637l94zmll79fdl7e43xskz1ecmg9x13liuk54ulc7hxc7kvip223o7n2mogc9vhb20k3kr5lxnqrxiu8ic3t97kosbrndzecx5rzkn84gw2t23v41ndc1ifp8ydflhgjuuhz7cl3630biiaf7sq6tra0c9ftqi96sztl6bqvk5vazszv3h7bznzvqvzh8loeo3hon6h1hsans7igxo45cqfgiasz2ej8o68rco3zfof6rq00mrkry74ljvzcrdfihil4zmdoyis8ypwmcdbi6q8s5qhilcin61ershfiknxhtvr7cb7x5kaez4yfoptmzkmosse6aw4bny747wfslh3py0cbjcuitw4u99wgvlxgondy22j6dv2zl2ww4fr1i8g1s6y000r8d2t6u3g4ksiukopyimhxy9om585f0152hh716mkwsdli2nyhkm0jgw8nk7qurpvzd4sflqk0kardutsgb3inz1o3m4j6rcqnan6keufcnateasdoyqpz3q21i51d2c8tn9bezzrds1icp2mlheo8rl5x0333jv3pycdykgiqlspmr2el0r7lqh5rqkgyitrxgzi2dqcbc382jgs55tbawph4fnd',
                image: 'phh7f3oooa1ukj5kxtnz28jz5s12lrlwwmj0ep55e0lzedm2zmet7cpgnws0mnyx21lzuxkrbhfnjqsk8hznv0yrtn9k929dzxt69nnp00ipcvglcfidgmrto897v4uo2swj5k9wjwilp6j5zu7cs22zhg4yrgbpx4heboyc9h0n0cks98cxqrmaiymazh2l9kik5r8wwbju04bjjsmoxvud6m8bvpare1zh1o360rifelid9vsx6z80usmzw8t28by5barmtbv8h04t3pce1nd5r47pzqa4yks8k7wylyavyel62wk963gmzfkj3rrrra4p288vln6trh28p2r8sl7gbkdfzwrgb72xdk9uwee4u7i2iyxlluoby7pabh0o3gvupkujgp0ie1ltlrsw38g1d1jyrkiwz6wsortm4t30t8am3btnnwbgf1aw3pf92cb1czqzxz84fbmyj2afs2l1ctncbsi61m65x41pbkk91xb4plm7e8y72g53m37ljo2krrs3zfw3fjchb0287sayvwmn9vjngwr3u7iw35d0qlmnzf52d7sai1bn6f4vk0o3rjp9bj64po54l5u684dlb96h5cf6ehe3jgdg0epm2xbjub20ebj4n9wqv25ineleauabpj9rxuvvinxaab7g4nr65zdqprt4us4gqxro3bnu7e06jivvp6ewp6zpp92jtmctlkrj9uzzoqkfxaj7b6llm18yjve13ak2bd5aduhovo9sutsxdasqjeztc292oek1govw3it6bhsikalln7tsq5llcrhci42ddtethw4voep7w0tecz2c0e0yloqfh53hcvwxmp58t2u13y65w1bakdh4idpz40yl3for6vgb5eut292e587ozyjjevcj9gdoac4vmiqqaqgttgxuzvjpygn5ektmfizpyyk0x8s1hdpzy5jtdb5kfrbk70gicud30fphcxjh3a0yub0plvk6n4quf40tv7172zmk9yhrigqrpzj3cwgiq34a',
                sort: 948852,
                administrativeAreaLevel1: 'vtho5swjrohmpsyhqicosvs1f51w8b1360fmdj872ex50pbhah',
                administrativeAreaLevel2: '3u1q4h2qa9g4z47fx0l6wvvqdi7vxheeuxwissutoe5awybfqi',
                administrativeAreaLevel3: 'wjad2dy8foifwepdmmqj95mfwxn6fcent2l45bl0x4nbq6lz7e',
                administrativeAreas: { "foo" : "bar" },
                latitude: 581.91,
                longitude: 304.21,
                zoom: 28,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryCommonId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'eb73fdfa-89b8-454a-b874-a82bb6b4577a',
                commonId: '33nagvypuuartwmcel6f0jf2iiumutv23cc4d',
                langId: 'dedfce4b-bb03-4b71-b06b-5a152d70943e',
                iso3166Alpha2: 'la',
                iso3166Alpha3: 'mkn',
                iso3166Numeric: 'hw2',
                customCode: 'h5tkflrvha',
                prefix: 'xx49s',
                name: 'dbvbwcftwbj4j7vb3xgv930avb9d0g0jsw1suvynepb50lco2bv8mnrst2dpo66nbfzuvzxonnlrwwwvt2hmnfa5tym5obil3si11arra43l4qklqvyw0jwv6cjvonxth1q0sbt6pudl4hfhqw9qte272q4da7vwp6092g19gqrzyc3vnlrr5x4buh7q1vzdhzmyg3ixzmlt9e660extf7kctto7vwtxr3rgnm7myqfws1sjj6oaq6h3iy9r1iv',
                slug: 'd7uxgnhyyqv008iyo0c5goucj9basfxxsvjcworxt71eykwfdyml89qofpbvw1zygblvpe6cdfo7e9gvehmw89fpcuipklwovg775kdcnw9oe9vxerrmabhwkndd15d5efybvqffs7cv9eqdulvdn7x40cmmutl62mm9efa741qjx1jsgmzjgnzmacjn01cwly3vcbomnyzuoir89mzs0y2zuk0fjmc9rt5h7iz8kfipkdf1lssnw0j0abompb1ovq1aamsbblx1x4uiflu5pr7z99gmukyq6vxwuxg0fjxztqnbqs6qhf4tg6sjjmtwmc5pfmh68szqaylei9qziy69i9s2n1rwh1iqcyqcc1padyy6qkxqh6ba5e6hhl25n9nrc3ya1pw05b59242moq3td4kwktx50zmqnyj7uzvo6dg7i2pbdswknqbxnjeto0gv81f9c2ya2xtoows36ktwy1ka8opr7pod5xyw5bly8x5vojdxezbf0o9hs5kqqk2k8cksechmzc6jzk7o25889rwu37wpgkc2jn2y5frtzib6glfcg7nveqgaz10ykxttaffhf8h4ovoasuw8kd310iplevzozajc021v96tix62misl2nxq4lb3drzzi5lttjqrbu0mtgg15o67e2tgdpuz2fotkyjncfh1jnpp8oyb0r0ke6kimon2ra2winc5vn4mbw5nyrjwmzquzaixvjzj4ygvyowbw8p8t2fgwweuh7baz1jm9b07cp81jyyapsr78edci5wugdkbfco7vo42dpttzjy8aa19uh69kpc9vi2ztvpk2ccwgfpoa62o3ns3fl9yj0kfwsbqcaoqadpg6z0cen1e4yyrzuxruroh7vt0qjrhabcwc0u9js09el0zglybuxdhq85ohi5yrgunl23x181o7j72l9hs2hoxs3ceapciq9c2ghfgqdn2n5yc3l11udz438c32jb7qdfwqaii3ea3xpnnnkbkiwa6lo4alu65qcxga4afl',
                image: '6sw6ruz46fq0t3z7jrltm7aw4iq38htd0jpp2h7vitjivbxscyy7qhrqs47x13nteav97rc7ok8ethj1m6f0xkfzc38zx65fhow3xufx041krpcx0q0n28h5wsv3oothg6u0hg5nkvo65bo57tbl7v7q6wna7ljhripx9ngfjdedii8y0z4xh4qaodbym9cke30tqmuicobhaaah4kws97ilh234g07f63rie3uqc7zd61rztoebagviypolh5e5fn50uddl12907wiv3f74m5ppsy6x27yfju89m1y1ex95anrm1ujaapf5xc21totriofyk2r8jklculhleya6xidefr1j8a0ojtn7alsxqgm4aiu4fvrcbb2yp1i06rqg11hem4yn7y5c6709riz0z6oav31db3t7xj6yl3974kqlj4f6b19jxhnj74lx00uhbx35x5rmjj1vhy5z9kyci9zlasegwmpyepwadas4dfmt46m4cu4xz2j359gr3fkq5srx9rxvp24m2qj55qgbyb5pw4p0whhstzbf0yctln8g1iy84baef3dtrl01qil95m5tgzfrg1cj67e4ci0d6rkgchoe3ur7naki0ri1ah8zz3if0vznkvygs4ltn9o1ijugy6aiq98u0k03bvk15du8rw4o89es58rdayk6qpc0emmbuv5x1z791sxkmjxhov4y24tv1co857q9ndaidz85km7e4jp360ooibdw7n2t1ww2genetp8wzrxeh9ae34gtywj3c5yvpew6aueijmksni64gvypodsyi4qvyjfbh059on8e6qmv2rtrjv9qp1lb5ogz30djqxg3i0nx8efgttc95cdnoq0bre9vr0apmt1brbnb1gtshfo5b7hvxgzns05awn07tgmoiriauqgs5ie1zjkfc2k3g0qg8ihbgpj4kp0m8popx3739a43jaovlp9jtejuipwxb8xai52x0185fkiqnmyk40yplsureunsd223y99yfu5q38do',
                sort: 192868,
                administrativeAreaLevel1: 'g1e2hf0zr8f9o9sivqyvvjk0bp7sgtyh92d5xpge5lwqkjvasv',
                administrativeAreaLevel2: 'h2izkbdasxt3kye6fjp581bzntfh5yt0xa2b9aygki96070vyo',
                administrativeAreaLevel3: 'ndyds1bym4hqw2dw9b23xwdgcu13lj6mybtupjidsxfzmsfgmg',
                administrativeAreas: { "foo" : "bar" },
                latitude: 448.76,
                longitude: 416.14,
                zoom: 53,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryCommonId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryLangId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'eb73fdfa-89b8-454a-b874-a82bb6b4577a',
                commonId: '22a619b7-6af3-4143-9b46-37995cb93a83',
                langId: '6mjwytcikbdt9e21yz8oc4hff8edbv7amg37o',
                iso3166Alpha2: 'y7',
                iso3166Alpha3: '1v4',
                iso3166Numeric: 'jlu',
                customCode: 'e6jinf36nv',
                prefix: '83l7c',
                name: 'iw12b3143kv8dsia5eytf793ald2qv1yvldhr7bo8oxj1xajy55qvann1sechchjldbn5hdd0il5dztyjb6dbs0wtsviyl7dxr06jvdt2cu8kyn01yi4fle392y2byykb6a48834e4lt45eeqm3ax8r4v1nw2mux5y5dfnpobfnxpvew2fwyaky01jvkmt6pkaip8udu2g3yxxbo4bwfw8n7ozdg61paeaqlaxfpsqhxzjrib33z31gbygqvxfc',
                slug: 'ffl0aq8rax9qbuoxwusqaj7ai1z7y2u26eedmqwob974q7edplljwm9gpa8v964wmk1ddsas3s2vk3rjz7a485yfwe7y9zt1slh09sjoc3zon8tepg4d477ja0n7brdr3a8pa1dr4b1ady8peyjfzee3g98tcw6kx5sihtbk5l95yqrjbrhl62fe35opydd8ys2hnop1tj2ssuytw0nsnbj8m5zeydgn2a1tmgaxcf0ka0sditmokequl25wt6es9fvmp8n8cmu1gtelxw0ravrn7b44nwaz4rwamj8a8x1lysciqxyhwcxxh90giqqsve5ftb49y7sdg5o2zcenwe3fndfq0p58qczu387813uci7yhxoo8a1qzcdbsnk0un9tsj2e1fmlkyoo3rengb2mfpk9gaft3xzxz8xg6n3og5wgfrlwmyz96hju5hdtgeb2js2efwq6s3wwg58tzj9vgwxqwauex5u6tzsht5uunmbeu30uuwxm1duve48c57a11t54gbfwdz79vevwyo7kqssq4e4eq8y4z3ei1ai8haxlzhcz4v4ninfmac3cd78y6bwr71au3eq30ibxq7jka70howehtl4z4k1ab28x3qnq6rf6ldx1l5pxp4qbunug37jpfso9b5ywpk7kmv4mlpyd8q9ktel73fp8ls5j70pjpufst7xuokv84wxrtix1p2g3736zik280zqbsvpucm7pi7srq4xaj85qzpi14hs2el9b63l9eyopvosv8ytkip4xb5ww0w7vevtdig3ipel24ny5e40bjk0pjjgaro6x28eayylfta8l4p6apes0ttdwa4trl1vw9zfr9aolni4oz7gbr1mb3dfa1j1cjdpygxy1bm5g6eskp6xyqqlpnzdke54iovenfvbt8izzrq8ldd7ruuju7am6c093mzavm0zylm6iboil0kcfdpy3ts536s4f21seiielzbnpd7vun861rgp0mv0i14n8ljijmdxw401pnjbogdk2j',
                image: 'ioz6xp3redf8talvkk67ckt2ts8wmvmh0qomihe8yaeq4hksa8e1t18zaon3294dejhggzwret3vsipwtk63y2svqpa3gs8ynvgwv7v8x254tk8nxjt4ch96ea1lwoy0f0qz6emvr8zi1bgwuz6l63pt4twvywkuwjg75u21kp1110qs3ruith16ynrajh2landak30303jfald9wxem0cl2xavzs6chjh69qbg26yrwbmpqe8fti2h8cu46xcqohrillfsnkxvkspr7neicq242xujarm29ssp36pe1zkdp52cmjn9sduv9u2aap2l9vuyxcoxcyflrao4gy3g95ogu1wt8lqpbmgtde49zpud13x3qiw0pmepmu70e2gzn59syd3neox4pwx0o64ie0mk6y18hj0jmpyj4atlj3rel231xekmhxybxog1dp07ql6ah8try25qz5rmpkxoe0px0vke21stusj18vov6gypcpfpc429kb4ayd8s4bl9atdfzj995d73xr05h6qrxzbicbe1dzbntavgm0953tn9q20egqxtex7e2vekscxlgzsyjseqc2mcbkfyn6chczf3n4y8v59sh0ppjynbl4ahkgimz0bmbsnh7n3mqumznpyjrm3ldd004uyi04fteahj5uc7ngbuc1nytkpjbc74lwxki8knsi4fhsnj66hzb2v5fdx9kfrskajp140345ggwdyl1zsn9yx2nhkx70oqpog21ihwnawwiucfe0lzaiun2j0ynoi03ivl0eivfa4ikgn2qumx6elidvizfh0zgo0h8441o0l9xrtj2k2ty3cjd92g26ivlj3oaz2nppc0yym978ix0rquhjlrg0uieqycddpdjmrdk3psi0g3ib2meyc1og8mczvrmfhxrr1mexmml2et36w3ih8eh7kx9eren19rvp3ly56c1833ikwv7w8uwbtdz6kcr5ljm75f0uf39jpkxt4893ni2c268luvbtgc5dn2spse70j6s',
                sort: 924415,
                administrativeAreaLevel1: 'fe8rc5y1pxsbtxmvdmamxz4v019yfmlg3odrdl544t786ydtuu',
                administrativeAreaLevel2: 'arydai7pcjunlkiqz9cuba7vb106j09ifz6vsk452ywic19ggi',
                administrativeAreaLevel3: 'ocuuxcm4bgmyqv110hi05c9kzif0j5xav0uezd74qyn83czr20',
                administrativeAreas: { "foo" : "bar" },
                latitude: 125.74,
                longitude: 887.68,
                zoom: 74,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryLangId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Alpha2 is not allowed, must be a length of 2`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'eb73fdfa-89b8-454a-b874-a82bb6b4577a',
                commonId: '22a619b7-6af3-4143-9b46-37995cb93a83',
                langId: 'dedfce4b-bb03-4b71-b06b-5a152d70943e',
                iso3166Alpha2: 'myw',
                iso3166Alpha3: '08c',
                iso3166Numeric: 'bw3',
                customCode: 'wx8epj5zpl',
                prefix: 'ppqmi',
                name: 'flqwdd53bzo1rl94cwo1xur2fmv6g1upubz5uw7osqtaf1v7hv4sqh2qbvbye0pqbrp2jn54fncrh04nv23n8uwfq0juw1ep0cjlxy1al9ys4qy9f2swk8f9qjs7dgj61oop0zohksw2htmbfh6od82pc8haxlz8yllak47j7rx0j2m92v5dchukool8q5lhgqwfhx5lh84p7rozn5t2y5za1zs5cducy4xm2cpbd3m5v53ss3wampu1a8nzdlf',
                slug: 'ltnxfrttj9g68aezkt26kk4izcat79gqeyqsu90o5hzuyi8h84zpjtgqi3q8i9b13c8i5gtfpgnzvw4jqrfpspj8mnnu4cpgufndo6fmtnbse1s5wy7b3ve3h1v48n9x3en97evq3d10qxtlw4bjny57a1pycqbcv0sb1gwzyt27ko5oisf7uvqr4pu7nrbqg52do4jhbl7zl8qh354ey3guei8njfkohg25rpn72rw5em4qt1blcncn7kjqfajjsltf0ymiu5ljyohkf1ktfxxnr6q0jfakbrwck8gnsmp918c3u4swymhgqqfihtnpoknzibv7lqfpnouwcyle0h2vd5pcyay9mt0jy3fcw77iip9frow96w80ow668bydznqekfjm29b86jkf0ng6dk9lzpwjwe6wnrtwaq7dyu9rp4thkdpdwf5yo00abz7fsq15zqloblaa8wouy7uedwlud0y0k946ch8nk80wo0sealfurbme7flzujqqsdwgbs5x928ec3jqtbsnnupzoxtwz98awigsaud3vnh9y31tgsa1wig690fp33c76pcqmxqjefzzf0otd2hh2he7scuxaabvtsmvf88e6dinlavgbkr8oesbxi9ackvutm2oe3zym4uns7owtdfjxfb7w3jmnbyo1cu5n254x2lyk5bsfwjskgld5ehgi9id1ofy3vgkn61s4f7cqx7o87rntabkxfb9aivaikn3i4x7ephu57lxr0h391bqwstswxmb5s0ltlm5pg0ajonnl507uu6dt8k6wg1xe4ps085mnwc8dcxpbfga8ga9mfjyt1jy4r4vi2v2luuk623fvt11s444q4t714npykrj12d09fsr7i24yjicdjrhn0t46a5g06xzem1j2wwgua7a5ikx2mezmrvlgpwhodeeqgsawhb4t2kuwjo850zpez0h737d84aqdhf2j75ti2ew1t1mdpt6v2wezeqmgas2fr5903miyu041q5i4rdt3eglvrwg',
                image: 'be3a1f9xhec2t5oi47s48asc8urkgcijfibea6id7sseu42ebyfb0r1bmma271r8geyy6038n9r9plj1lnbe2mfbqk0bqcgpcgvsafpozvv2ty8npy10zkwpmcne6ddu55kcwg4147ynbjv2cq4hhoza1lz3bh89mp2lgdtqbttvs7c6nj2d6rgjz9f8fc7tvd61v1qd208b86teeqmwld58550kma3837bctusnsgrggs09ad9f8zp98nlod4pjp38beyi1go88mdbd9iv09e6qb3j9qaja1bu5pivlzx4quexs48y796yenaucsybt7uffcepyxarx5x9sxe56i64ln170guvlbg5lxdiec47eql33g8s9s2iu7j20niuu4jo6byssb4gxr7r1tx7qk0dk2vzmx13diz3o3a670a2yj43p3exo7hq9i97c86u4w5e78yp2ylnt0em24zh4r20mdm1cd3xyx5w68p29mdyc0gd35kx11ojc6h7p8m2cwdlnufo8laejnxiovlqtvh7el3vdrssg9l4ep2mi9g4405w892sek8hpw31ofb1pv6mv9z6tgxxv4syxgnf2u4jg0j1f7uon7rd52018b8oa4iygsgsqh0dcqzjis3leq4r242dguw0yx0xsk3g7su7vdhg0acd8ow3gdoiac25hetbubr19apksadcq4je295z5sef5bitebb6grfls7fr7ndtoz9jcmozcdpjggwr5icji9qjfe0c8hie3ucdxbl5cezah0iivnpt94ptp87p2j9r15wza78vdpssnxq75rlf4xivzv53pe7fivz3gfkdie71gjjqlav2xp373xxu8aacrq1xxqk3ngvqfv9mui2mvup4drklcfijuhtzi8um9skb5bxwgegvonvatv3la6jyfceng2c55c4k3af9463u6w1i5o74vftuhiyucuklf0c72f0t0ugut1gmt72v7qd01f29da9skm6q3rsv2j7idbiwjzpdqld1a7ux3',
                sort: 326263,
                administrativeAreaLevel1: 'ilujimizq2dqv2879bgx7t0ir3qhu2u9q8ny1ermpsofyslqoo',
                administrativeAreaLevel2: 'pnejw78e6ird5986hf0yfqhmdztfm8z5mbez94b3n6dg994pzi',
                administrativeAreaLevel3: 'hswe2ihyecg3fo4q24a4vsauwol1iacnpyqo9f1zh175w8wxxy',
                administrativeAreas: { "foo" : "bar" },
                latitude: 270.17,
                longitude: 636.57,
                zoom: 98,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha2 is not allowed, must be a length of 2');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Alpha3 is not allowed, must be a length of 3`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'eb73fdfa-89b8-454a-b874-a82bb6b4577a',
                commonId: '22a619b7-6af3-4143-9b46-37995cb93a83',
                langId: 'dedfce4b-bb03-4b71-b06b-5a152d70943e',
                iso3166Alpha2: 'ru',
                iso3166Alpha3: 'mlq7',
                iso3166Numeric: 'a5a',
                customCode: 'dvjfqxiras',
                prefix: 'grj19',
                name: 'mujgy3fpfqsqlvjjv0i3i7uue5wyu4ei27593qp1bsot79vj6vvmep83cwcl0nsaje6xvuisxp28hrbjf7xqotzqxoclfo5xywugmp26qv5x157jqn12i8e2kev62plkrwafaoj9l190kl4ctgr2rt00hstnuwfde5irnmvefjyg3aezlmvdw5d6fuc3cdm8wj28gczpweuv5r343ipd6a1pxy3iklevujd7anpnpnncvkqwb319fzmw0nzlqxw',
                slug: '67k5ys0kn29vk4u36k5n6fyoivcrc6brn0m84rpcwuh2m0ve3dmw9bxsk8efc357k76ehis4o4f78pqotl956ytlzx8x2snov6pk08kl4i2vqvwzg3x3pdecm4slhwv7zdeugrtnoxfpps6zlt545ykokvwtg19xk16m6d790igg9g9j0ahwvwpxqmnrstakoi6zsjq4hqvgp1xuqfr953c83crrptqgcpe8dr0ghoujz2is6v8o2mt3vt730im1gxfs8vbo6vuejfhhozb4v22m2ut2nlzoca2scyo5tee6ljsi139xlb9vlrnaxtxw4kiyan5aaxo9rgxcoli8j0o1exmtd3hthmkomx3cmkspnk5ma0wrremleyc3zym1gj39zy87630ztlf99p52iq4yeqx6ntt1gtx8ic7li8a9w2n0vj9siwarlc1dlgzzsh478ggwvn49sdjpuy1task2shyg7w4r5gpz40cxxnqw9omm0z7zkju6af3gzi051xy7676k7qoex5oc11ey98fx6lz5yrcpvkeh0ntmwundgfh1oz8bi7b6iagnp1xq5k978r5k6511l573bratp3kihgj7d9ugd9138hjna2b5tvkat4nhlczq7pkh0nnt0zkiam06tk8q409ti4me6dfa39yzxn336muvftplvrofhzjhra1uvwfnu7gywjhqmadx2r7wu62twqvbsw60giw912xwscv49ktx80jsyjxxswspxgyvgwuefl7hs0fi419yxrrnllks898pkii1mqqpvdy99lfnsmklqo11jclpwvzs60p5rwxwqnvrzt7bs4wmmtfpyc5r51me3dztntm7sph5fko9rc18l8ooqvu6t25zez9gz0e5wo994zpq7c6ybfgdkfapyxy1r4r35rkvgzzwhngjlumli7jyu9tefetnkfeqxb34wc4a9ldoyaqz5qq9ynxbgw79jrngkto0mool2n2s1ikkym6bmk7angieekc8xeiertrfw5y2',
                image: 'k2wbxulxbfhaobfi0kzlrdg9qw1ekau8qtxf2h3mtkyq601tapnsk4dwevs1k7r84chu1kpym3wugon6yw4ofbke7glqk7c3nuwaa7g3a2x1xvbz1hew5787tl0gg8zqchoaibcawx4z5bej1hglw2yl07cm74fzw3ee84402hdhnmr41zsj8w7ggzwx6nl6frx0lzndbqkkrldk07zq7p6h47vufvxydyecj2uvrg5hi5ojogsihdui0hc3n8ms3ix9wnf1ropgikj2qypyhefw6k42gvhqhleqmyca1ue0149fwqy72yc4mn0yefxobj3nxnp9hqkcht908lsdwl01fw44dtomezzvz5ggygarcasr8ta6uavyng4c5gskttky6rtgs6eh60hh8hzaggsgydzwnq9jiee4v3yv2my13izl1k08e5mxc14e1uvia221wysc7z31xog7hknk27bosx0kdhjfl6w96urf8545hjivqdc1xr6a1rjfgporljq5ao0ityffzvmwpm5cm7l4wvjkmydpd0ull9r0unviuzxw293wgmmxm0tiilvrbosjlolzzu5rqfnxmbsvfajpcw3o3jpgske1bt7t3s22q4batgt7u0b0ilnb2eprzlapafs3hdy66xsnfi5nwzh2fnactdgkwlxym0scnfv35xdeosi510y8k5f0esp3kosxjezspnsd2fip9qmeg7qe26vp5zzpccl3qqpd619zq1sc36co6xyps3f4s3r77swcusca7td57ymaqg0ldviqmfn74aavitumj9aecmkt2pbria7cbp5lei7g5g2t7ne6ivmifkuihs3vrnkdp2qbdwxva9xnavbbsix3qo8knp9v4r3r6km3wvv6i7xbxzmd3z5y66c8j6zpa2qik79wbbzyrvdhu8l9edhb8gxa5zicjhff6wsoav2h80kyo5vlcbf843s43cuvpy358twh9eronxf3xbf2jn6sctzj2acqr2e5j6fygbt280ll',
                sort: 278023,
                administrativeAreaLevel1: '3enb8du0wmuici7es3fiwfcmjxiwcvzngjmsn5jay6hgmmcro7',
                administrativeAreaLevel2: '4xdrfh1imytuf2sdm4recyjw3r2tpmiu1pxizk4855vngxc7jt',
                administrativeAreaLevel3: 'a61d9rbzr28udx1h02fek71kf0pnegog43prh63jsi7beiwqia',
                administrativeAreas: { "foo" : "bar" },
                latitude: 735.43,
                longitude: 255.48,
                zoom: 75,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha3 is not allowed, must be a length of 3');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Numeric is not allowed, must be a length of 3`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'eb73fdfa-89b8-454a-b874-a82bb6b4577a',
                commonId: '22a619b7-6af3-4143-9b46-37995cb93a83',
                langId: 'dedfce4b-bb03-4b71-b06b-5a152d70943e',
                iso3166Alpha2: 'th',
                iso3166Alpha3: 'n7q',
                iso3166Numeric: '8y9u',
                customCode: 'nl95vl9ouu',
                prefix: '6tcb2',
                name: '0j3rkfb3mbml9239lzu1ftrhz7xp7tob9uuh8vuw331aket2itf5o5093kv62pypyklauzuknqtogjkx1f2g8wjepqu1d0e5spm561hlu9zhi6s5vf91hvfbojk9n2k0r8m23q84qryxd95914znhuir0iq2ucq5e3fygsr2x31xl29kh9x70zpzbj6tnzyu0wqbmilanvjvu1n2y2tjnrocv889vct2mf3lozizw8tq88u3i4vr5sd58ospu95',
                slug: 'bfocb8wvr6dibhboqhfj59okre7av80s07wsmd09owi1o5p6t553p178h0z6q2amox0bl5oyso7d30nr2ym6jzv0x8kdjjvv5a2zpexvgsliepocyud91seh6ovr1wtfulcom16pwkm6wzjqsxeytvay3cuuvn8oc1z7ar7m04gabwcvk50rvci7tbg89ihmwna4rck2tw4mrl7geshtamdwikk4gh7nvnyj861vl1yvcamhnutfv5rltqkuka9ftjo3ifd5tfa0lrf0qsn5y45nje5pnwmfh6avxuqbcfe0vhvtl8a2xaaizzu46rzzo4xko3in0nw4ltt2brun2386tt5inv7nfm3k8wlkp9stb8zel3jvf76yrpg73nzcbqhcmt7urw5vlikfapnrs4s7ttptjaq1qpr7rlhed0epioxsobpzqwzduru5sosuvw821f4nn7llam35nr1xam6w375z19stf6j7g8bx9tyd7hfmk4flaouk3qcu8wb6ko483bya2gulut2h0rdwtacmp46ic9gs6242otkjsaos6krq65pt3292ez87yl97nhrlewwvcypsj116q4mf7th4j8lcovti9glb1yryky46wra3qt11x8ikcnvq5rhmn41xqjqn1pnnzodyihy1xwz6uzjklqyz5j5uzmuns1be3asx4mypcous3406u2v9fuxy1mm11z4m69rdcuc12uglpekxvlvbcuzmpw35xsatxnakdvz0dviwfx0005ui5fzvdeue5m903lmrfh8ktcr67rgktk95n2orbi3eh8hywfzvo3ci42buqz8puue6rvfxgmdz0l4i8yzv68u3ugxvi1r9zj7o4p1id1l4tqkeeyxuizom98uuf8kgr5iwe4wr400egkcher0k9f4j7qidmtzm30xyi8xw2boxbvk48jgx9s5a3ioqxkeemmww6jumqbnzq3tqvgvt9cx11v2i8oxlix45bs2nkvifdv5deo055abghsradn100187',
                image: 'xuu6jrbj4d0les4a1p2l6nimin5ojoxqaxlouq7kh6iroqpbgpmjilc78r87qj9xge05ak8du5voudhr21hdrd6ww1cb1gpgnkxamom652jivdgi1kubk6z64ioa118adc11f5o4efcip03w9mckmikgh75g9j4yi9cdr348pvnz4ua7iurzdvo2eqvwgaobkrqf690wkmlxbooknpoj1td62eqtsasjpi2gxxhux2lhfo6c0xd7ppdre183ll1kh2k6t485ysdkhm73zv3kf2lnjjl6dymvpli188f2bnqjjsjnujo8fmfroibdk34ojlmnhlm319uz2c6z8xy2ks4kwscl2h0bdo6o1dbe7n9r1c3dezomklkt1dtq53iu2rgd9z3p2l7usum4t25afb8nwn5iis1jiv5fa4n00q0ct9rck54ztymu3r3vwlwsaabdv9b2t359n5yjruspk25n2zwhxqgr8ql533cskywc3ckjyodyh26h0w3q34s3iak97onf9m91cgj07xee95fel7qz4g9hsef3mysq0fnvblsol11tt0lv4edtriaz20o1wpk82vak0e8tdewrwu40sbteewla9xnl8zs5ca17eciep36eri998s8vcde7eafhiav04n0jlhjjhh10s3lq1qe0sceeso1p5lpbfdbk5hclpnzwz3amo36fndbbxdz824js1koe9prmkkw39dijne9jsrgwtewcdcwspg5j62bs4v4eia2z0ow7sxoiualmy4z1bl0ww5xlyp0kai4tiein5x1yycpxhyjxddb3jtfo9sx48eggs67whyll2r5r1tpphuu3f27cal5hsx5gjrvr0qfmuvu7dp7f319scogotup89504hm636lldrgqfcbjeitniqpiy4q8uluyv7g73rlmryonvt46hcflh1xtbx0lszvqsch5bu0uj4ig8tx13uwqq2g02sxw9h8lfg94ctf9uiy3yb65txuu2juauuwfjsn4cz41omfal',
                sort: 191051,
                administrativeAreaLevel1: 'afnyql2vux7pwrqnv086u7o6mptf27v37gw0ylfdoc6rlu6bd0',
                administrativeAreaLevel2: 'nizhub3w2x2nehjncoepaoy2desus1kkj1tj354v25emub3hoi',
                administrativeAreaLevel3: '8nlxk06nckj5km8d3t7aj7dllnv34pi95g6sc4zr5s8ytcxgif',
                administrativeAreas: { "foo" : "bar" },
                latitude: 435.58,
                longitude: 909.58,
                zoom: 81,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Numeric is not allowed, must be a length of 3');
            });
    });
    

    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryCustomCode is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'eb73fdfa-89b8-454a-b874-a82bb6b4577a',
                commonId: '22a619b7-6af3-4143-9b46-37995cb93a83',
                langId: 'dedfce4b-bb03-4b71-b06b-5a152d70943e',
                iso3166Alpha2: 'ca',
                iso3166Alpha3: '3r4',
                iso3166Numeric: '881',
                customCode: 'p0s53kazt7s',
                prefix: 'h3lgu',
                name: 'quywii7wwkm4hnb8rfgopo3l8rs8iz4hq4hthtoq4wwiaz827ww2lcziaqfklj3ifdi7j37tgvexhzu8wi3wct7fyn6v0d2qs6b4u8cl2xl0rmfxl4yu9efyh5zhcv0wkqr4r03af0n846frau7uah2itlcvdn89soutgo1lzy4rcd6n29vx5zgjba0ykvp0atxjcueuh100nqho0t3xgv8dm96x6u5ypexaaqyjqw9zk0g8afpecm7x2s5m94w',
                slug: 'fvuh04btuj1j3hofx8bk0epqdxfq6f94evs25mz1ng5sp2gblj0ymeka13cuqe5sol3tboipzwtdeyuzauibyp2ujft42cjgsgrl5exmcqi9alcrlaff5saqga06rwc95puifkausct5ypq8s2mm5i7zbpsd5j8hsine1xuiju7ks240k4k255du456mqveefwo3jnrqse26xahyij5jc73zg5lo044sv7yz3nmzyt1rcvryftn5w44tmpsljqo9jvair231k1i2a0bt42tqf6u6iaanl6xm6l8qo0wky5idlsrwnuf9lqgoxh4g2u0r7pzaejysgglq7d307226dwydo60hqtfb4h5obq9o6sstuki1htz6jfrma3hnwyydtvg1a29kclicf1u8u4ottg9w1li1a4pe9x1uzv0i51mlmvw01hh94a6iaaw7wlgkqhz743utctypktts4s32eqgh5twj6dx878mjb3211bza3wa8ajkf9xehl10nson44i31geutd4x9zvm60m7c2hwys28ji1xr2cha6xx69vhfwtofkr0i2hahhfbxqiu28hrl1dgw3dtaq1k51eo4aq159tl260a41zd96dv7t6r4njxih5tv0e0rcnyx15f0h1nalsmko8swhgrxcafv3wkf2347rvhyxvk264ydbg4ej7jtd2fhkbipp9sgtoyb5a117xna874qjmxpf1rmbuo04hgm8s7o063pxrsa3vqu5nevwht4gu2ososy3hqttl2wsc8domc4wawc70qj8juaavxr1rv31jruo0di6mhliao82jgv1z6kbl2axkhg3zwfw135z3kp4s6nci8k595vnkpwkydcepa3a7g70uhfocy3qppmp73wk0563b66ha17xiwgfhewd2bivjvprdi9j0q3qs1yplt3vw75qz0lh31ljks5vtcju81hxul3tw7f3wt30cevzkj285bmw7gdgnqyvd3itfef0tsgd531glc8jiyztni0qbi8zd5j',
                image: 'l3jxnxq53wbjlqrf0cslyos7reesc04dgxjq32kgektcabrl0lh1wj839580lfmzrsslnwfea5dql83ftze9jqghoe9bxnzdatwlv1626nkovi1fzr9qkgfpeswucnh4zvrd82ww7y277j6je491zt0t2jjlea5mqkiwwab4jdcjyvt0h2guuioxzcu2vtg1qsupto44829o4d51aviggxtykfcx9utgyos2klsb84070j2wgqw7t6wdcgajf3mev3gvjaxlcf4vo01uv2xpwe8p1usn53uzkgqsu6293gnco8vtzcahiq6w1nrths7neqpg48kg3dd0aibtxgh0x23pa9grrtemksge7td3hjla0uv0spniri09ne5hwvfahyhh6cd01yr543esd20vrazkm8a0j0uihkpp57dt9sfjf0dsgz73p1iutxt14c1u61lrha680gtafk04dyscm59md4a2vazh2xmb9y4wiqbz5s1wiii8wgfml0127zccoqmbblj4u09pujxupafxonr6201ha5vkbmrxai7za7y3pl9cew5msbpvd2kbwupzmel7dqmku1mh7d1t64g03g82ewbdt1fhx0zlvorbhmqjhthjy4qvuxc5dsbapu9js9f6se4c5kdtmkptyer6v1fdtandois0qqwo5bmc8txjlajuf05nkkgudufga53uw6ogrnx7v8pal6ohe8ugzs9tjwrf2r9d1o90mqj0nf08d4fk6wtqxi6dfgknc3h7e8pdljkg7gm0gxq8rlk4ud6tjsx3uxe2v14qsko277quc59wj5cwzn4xpbp67m55bh30nqzu5rifkel0ng476jjqyduso6tq816chogpx2ukjbmaqqnrgh19d7kzyia514kaa70l15ttusllswez235dqw7ml3hr69snwp2pxx5useyc4nlj6o3wive4ce7qyamrlr5j56djjon88r6i56504edreev1kkzfsjf2j59cw5fazy6eoge1i876ez2t',
                sort: 220482,
                administrativeAreaLevel1: 'w4gjebf7km96bvqsivm93i6crrvwybce9yno7pg8egrwu5xey1',
                administrativeAreaLevel2: 'n3xzikas4nlyokc95z2tydg6xvr5vcfq76xcswm4i9ldvtpcgw',
                administrativeAreaLevel3: '6mv638k3yie9kixqjezqetep2ldf9klbmhwh0b6f3w3vu8nf46',
                administrativeAreas: { "foo" : "bar" },
                latitude: 195.25,
                longitude: 351.80,
                zoom: 93,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryCustomCode is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryPrefix is too large, has a maximum length of 5`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'eb73fdfa-89b8-454a-b874-a82bb6b4577a',
                commonId: '22a619b7-6af3-4143-9b46-37995cb93a83',
                langId: 'dedfce4b-bb03-4b71-b06b-5a152d70943e',
                iso3166Alpha2: 'wq',
                iso3166Alpha3: 'cel',
                iso3166Numeric: 'j9o',
                customCode: 'zr618efxg0',
                prefix: '77prup',
                name: 'dbsc290724biw3nt3ry0cv0o4009xvl21bq1zmuoykl6abog7cjyy1geaqouwh8n2psk3psswkhaherdqv4401uaq7d4f2cr5l6716wptwotiy77hwirz3p09plovmlfepmhr69nwwbx546j9x62jft0lvpw0785g2t97cbfoseqjgexjaz3qb0b7vui64jrtng94zwm1noirfvtteopbrswjt5pk0kajospmbdlpr2fxx5zo86neruiazu46rt',
                slug: 'qeobpr9sffe98o35353iv2oq5ciwajs4q8ub6rhcsvz8845cs7nnrn0bvhkgpse4d6c2wwmp56plxcsilgwra4y7qs3jmdcgmahy10wdd70up5keus8ks6lwf2ppy31cy8585qq7dwj291sudcvk2l6f1014wrqgdhcyb2ojrwdxhlym8wh7w1297k3yryqiorl8l1hke7r1o1e41gi2n1kmwwyawg1oehgdc4ezq0bxqjd714mosp5k0piwulte6ao5xvfu4l06ift6p8fekth6hp2knzf1rk5nqa3o85egv96c5mlid6qsc0icwryctbz3ic2hvkeb96xngmapj0i63833psqq5okz96pdwzrf9bk2sxl67lkv2p9fzq0l8j8b98k30sbvvi7ddcvncri6r4okv3y03nm862leirl93zl9e2y7vct5mugqusmpuwig5bb9fi3y5i9y3ecuirmbdazfp3wy01ky3gpj1b1ozy292kxadvo6id8d5b63yklie046iri92znjulbm1bm4q9hps69b9xsui2l5syq1ph7njosfwc2kbr4lv4jf3i396vm07cl2yeoyaz00pst4kfk5ey1mdhm8gnfn12uicnx27jnlcyzl3d47ypq17mxl6yc7rk8u980vaq42y42m6d04xv9rs98en3yqjk6vh52js1rmte7imtjfl5mdgxqzmr9odcm10k909nzvo400tv64bycsiff54ghsvkxce42c09dovf2mi4fajhgamjm8kjpgfeo56ng5y8v8v3mibc3atq0k1e5o36ksf0f06wox6b3g7ukbt0y3t286ii7qfc8l55ble24atcw7dfizm8smjj6j9h60cmhp7i4yxtfz98vgzol6mvret9r1u4u4rok92jslmnkd3gpusgfdou909oa59ittuzqpqxmnek7pmcviwznoyw4yu8o1kvudmpk6rr8nohga3ba4ew610hbqs52r097ds9nngmjedgu91d2n3bz414bmts0i',
                image: '1igt5kbkai75me6lbtnbkfzwwizbnpaus05z4o4zm84x6rtt7wezu5jw6zugyn1dp6u67xmce3nl7m2n2f9timys7602u886jtjk5h80fscidpbdimubd3kdxw41k5tqv1aetqbcltq1tzvsdt3rsrfjhji6btsugck1rgiqjmxkq2k0ualgql6b3yg1kjh098ivrsmrwitnjj7p1rp9gipoapvvjmplk371vvtruf6gbg9ufo0s9tmpqc8b6f4kxny75pwm0q8im1knty5fc5hfe3bw79klewdyiwj4gdwfk0c42u4brc38gx9nujzj9464e8tas4prs7yj2ym5ol105amhbamsxgrbiwosseto1it3mmr21j7muurnsf3xaiy4rijwphic1511acnltbhp2qtfnrkqd0csg28059cd90cpi1kvgmbyf2kvhs726lnz0kq1l2h1yhu8pgleqqbpdy0kk2epjskimax2k1he0rhsfvt446z349k2bp3yqitw8lcdep4ymoyatmq737k3kc3ypu7jtspwg7qc6wuw5p303s1lpmixwd6bsdzhvreta7k29oav3wu3dvrjbtpe51d55l7r4ghas6mb7r631gymzmrvxf6pvf00kitmgv0yi3unlqoqzn53cvz1osth7ryoktd59vw91gs6lc063uhzxoqvnqcoj9x6xaghpymt9s0xmso2h32eziygvs2xiijq9phuyrj5t2beronlyqat2lpx650sfbxoicdl1704nsqi0lys2rsqidzf2n0kai9shqxauiku3xux5vi1oqre9ozkctnuzbpprsr9jiq4huxj5c3np52x35voy9myqq0nhs3vg2ssdjifiilo2dwwezd5goty1q9ocysla8shgurxyfyivdp0jx0e3tyunsxi74gj2uumhsw7eszx5v7o8vjqnv4x51rbzrmpjq6b71x1y9330kq7gixdc2y8mmm3310usczpyy6ofgol783g7k7xxeh8xgz4u27o',
                sort: 628700,
                administrativeAreaLevel1: 'q9ywl1lzou5mmaqs177gf0u6w2c12xu4p5rujvqbr71lvukkj5',
                administrativeAreaLevel2: 'juv83lxyv0lna9yjh7qhew5qp4rkcfvujbrbgix32pqy5b5lvv',
                administrativeAreaLevel3: 'r7vnhrlj7ytuj4ludvpllbj57solkwnyldrgfv1uxagteoi01s',
                administrativeAreas: { "foo" : "bar" },
                latitude: 270.27,
                longitude: 349.11,
                zoom: 61,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryPrefix is too large, has a maximum length of 5');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'eb73fdfa-89b8-454a-b874-a82bb6b4577a',
                commonId: '22a619b7-6af3-4143-9b46-37995cb93a83',
                langId: 'dedfce4b-bb03-4b71-b06b-5a152d70943e',
                iso3166Alpha2: '5m',
                iso3166Alpha3: 'd5h',
                iso3166Numeric: '8gm',
                customCode: 'v97u5n9syd',
                prefix: 'tt6qs',
                name: '8wbmp91g1btvgqp9omk62359j8ostsktdzfdcw5zcddt6gjb0ih66mhnx2ex4qhuh3tix3o7r8ba03j22pjzwv16uqs7qp4dy17ia6m1f54ktfm1o3yb3ptc8xpao1krj8nws7q5p5tgi9c5yijwdktzp02e3tu4trwau0djg24jir59yj5a9psc05bzccyeq4c63urzmyn2e03jk0n6cjfvq1af67f5wn4o9kriodiviongf0jnsa58u9b09p8i',
                slug: 'cxtozh8qzk8j9s5gly558h2ck0n8aw475v6s7dyi60uezy7zbtc121cxkzr8jfz07c70vpctidc9nfh62q72j3xhc5vlpkxrptnewn2z9vzvriy09p354pynmd9akn2l98hipwzm3md7yd15n16ly95isgz3vn1wvuo5h6n0tjgroag92bfxdcks7vrnoybfd0fyne0yquf227zr3wtz2ul69b2hw5pdn98nlk1be7u73slndmkxcdxe3iwtk2mdqgrjmws2jgy4ad9yyelo9hj8aq0q09znlhqi81xix714rya36mdg9uhk5h6usby2sbh94j26fvm1n16l5avkpuzd5vrgeer6wmbqk97si2yn38ddz00k2gb51l1ordn4kk68q7jl5bjx9hsouauaj5s0f7d75q79yn6xm1kgosalixxrikywmvevvffv7wml80rwaxh399kexswyuh0vp2gr0zw5owq384x7rz0l5ntywp08y0qvkrpb784hre4wn8j9eo587x077tom531nhqsafw9ouj33a5izpmd1hhk84zu1rlq7xfr466189av7h8qybr97vzkmjau9elabcg2pdn6pkofs8luvrvi0tu9v2p2neodln53q072ss6501cizh6rliqornve4fpeyms4qsqqaotrs72gqklky52p4e16dh610zudft21hvjqqxo2s6keu8ajl91b6ueginfbelooctz4mvv0io58hhvk583u0fvug83vtypr6cmdzamecdjb48p1l1jivf9awshis7janil2s8pwnprusvg4hryt6gl545bjoqen2bl2o9zo3068qe9gwi49bwit8q9hqyzeru65mrxv1gk5qbrsgpy7c5jr4tocd230rm22x82204bdmiwf2ec6cw07ad1850cyfi7w73vu6whxujrs11918rla6f71o89br38eht2ocbvo8lbq8v122bcnouslawesry537udmdozs8k7ekizj6k2klg2ejxvy0qc68',
                image: '7xo5v02snumqwv1zzncq7gnejliaog7ltyrxe0x2c0exazvmycumwaazcl2ph8epxqcpib7rpgi6iotjqcppqzbdqe0akq288xsd950maxc8d92kekrapwmo6mqk00sqgg44yql0ndjd2zr90zozna6bs8i4deel1743s8stdl4b8pi5m1yw8ga6m1isjn7c4o8chd7zxxgkgar26wv6o5nlaa1laa4ez9thgcshe1osge4ajl7urtnrgewa8mpt1lx62tuwv0zs9c1tut5mqzt1eu74k5ck54qzqqq9k6y4muq0tfd542rx1pqeq5pdfk3u8bx45qu0jfkqjnkd8hp8y9lhvzhtr4u0bnrxo3toxzok4ekwye24s0uwv9myjwot6vcaqug1igd4jyj6mqqnn9padabvbnzeebjzdnx5o9rj7vmk795j0f0yakg37h43htn9zo340cg1nge7s6x5mbzcktjv0vpzgvfrnjhrlj7qrdv82cuj056ug9phla935laqz993cec4kqboery9laxrxq6r4c2mw5amfh6j5yuw6celxonsq1xctfrb1927g414lkt9sk8c1g6igceyjetr3g8qh9088g404539cx0vigyzgkawkxlig98hg9fjts76uu4eh3f53ev8bqenqaetdwen38r7e7izcomm8zw0qqe3x8ymo9f9m5u84yxekt1jezinfb6dj2uidfht0xj7xpfzfspw7qyok2cfw45o0exyem8gjwr6eg58hntgh615dqnwj5w16f2bfkzmf8sg747qoph7d1glnu8szh8f4m2ftha9anffnehyt3ufletytxbnuahszntr7fx7q0u468oslcy99ipvyzxqrogsodhfjllds23m7niby2tw1feziv3b048dbtjijq79ttf02qrm2c65w173luo6d9x181r7j833gttsmne4ojpvccjwrnbmsjrpvrbeb0cwmi2hxhkro7iveaaltwdrt9c6myjnxfqd2l7vpmx1',
                sort: 955732,
                administrativeAreaLevel1: '7xyoo1lstzkbw3xb24vmqhixgc9du0mi78gvc01jc2a6ajhls2',
                administrativeAreaLevel2: 'jtzny1tchsdvzacdrx3b1l7raittbuwqon2k1zeu1y7luf2e75',
                administrativeAreaLevel3: 'ud8dxmfald2l13lnkw4zpc13t4w7l3s7xx1xqswsrwe53tmd4k',
                administrativeAreas: { "foo" : "bar" },
                latitude: 227.24,
                longitude: 693.86,
                zoom: 42,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountrySlug is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'eb73fdfa-89b8-454a-b874-a82bb6b4577a',
                commonId: '22a619b7-6af3-4143-9b46-37995cb93a83',
                langId: 'dedfce4b-bb03-4b71-b06b-5a152d70943e',
                iso3166Alpha2: 'e7',
                iso3166Alpha3: 'j16',
                iso3166Numeric: 'ri4',
                customCode: 'jpglpk1fwx',
                prefix: 'smo1n',
                name: 'pu0fzg4m3ejayudosb6g2zcrjnm046jdk7lk1qxtp6pitsx8e95hw6plcn9hpqerx7205bcd7i6enccifw589z51tr6r7a3fhr9oe70o1pnkay2uqyqi0n8es49ka6ilpa85m5hwlzs4jpxmn136a9oqusxxgv2485a3o76w8uw7as4qek0fxzfcze0i4glxq2mlaxaqd15f40wc3rclhtmuwtj5dehr4e2b3rfbt695y82o4enwr5ecloiclut',
                slug: 'ngnqawklcir6353pyodyqe2zdhkj3ry0zq6ad6ymp4aldg42kqrwvdh92svg3iwbp8gwa9p9285pj4hs5r2tuc76a97mh9klaxf2f136eawgmy619ptupifrfw5s6yoprp213z1r9bf5jps2yc0eras8fbhafd3yhiznjpf5tf2h6ewrgbi933bb9q8ydxdfyoxtpnvk3xqx88214pc0wh4dt6d5rs0vkuebbus4lyk1fwllog91glyq74b9hg13bcewq3iaqajq8kvdz8btzsfjom7d8jn86e0fg324mle5302c4vbhk1q6eb1kde2ial1syyo87fc3gpe8r21k8yrl6q4p0radj0pxairj4l39sf0yxsh9rsczer0g0kobop6y6ppiqkkuc1nv6a7wnbxe5hvogzhpbo8uk0ftfb4fbj7dm28dip62wnadzk5ik7jj6peuh6t75acohie2jbju09ozekeg3vjdqm2pnfqj97ncgjwtrrhju2b4fst99w1fjg7qm12lyrqfdenacrmu1qpcnt36g7j9h5ndl0guakwnmc75cedmmqufufn93f73xj2l8tue24w1qbfaem4m9lznqsv02yqq3dmxe9gqk7d1sm1vb00f5u8e6jo5ux45bl4lc8s4y2dj2no9vix8ylspdlatdwgfy8jhf4my3roltybzxmlofynvbdnalkshtv1q09v930i0zc1dv76l493s2gld6z62wsexembdvdlhg2x2kpqe1qgbsemzfmwvm5nn9jrtu8x2x8y19u0uu7kafwpfw3cx00y00w3v9vj9x90i55m0uwox1gblizdt3rkmqeoj20y2gve3srottqn0xddkf565cqg5lgqt62vz5axr1wo35abn2eduizqb8hqipochan47h242hi0jigdl3r609kvoxentk4plopt24nbkfsl9agehvlnj2rq4o10fopf931heb67z8bxmeej04ovizg8u0y5q7k7ibtuxgii6o9p034ohljhfb',
                image: 'd6hbvgxi3qvqmph2pqgcfvakl4mwkqd9bbxkzjgmgndflq6vayij5l75uzk5ifxelau2ad5j6nwotc282xfcz0yzfz1j4eknjodtib870nunvvdj519mdw37d83pdsaohuh2c7u5vknny4goa65oxe3p4q84mqq1oml3mcllae88j3nropew9pt1051ajelxqpszct8tks2lagjdxy8bbt6js5j9z0w5xv37ci0i8r990d6z7vlygkifqk1mqzig9141xhku256dqmzoud277z3hvp3bsojfshjby83dh3lxb2416n8t9yjpp9jixlihioodgs22y3lotlvc5grn7bisudpaw2izqg4rfre7055a4obtb9r989khv7qlsqxpu3zcd2glu46l11jmrcm2yyf1pr5rp9qdl6dnv9wtqmqokthq4jf31hnysy60kv5hfyzuwdyurxsey85klgl2dfg7fo2uup8p7x501a6nnu3skuyscvn66dnci6q9av9scnd3c0ht3aiafohlmt2kxnzlta40ye1fpc763i2nq3bv7jbp0ns862v1dt64gpu0ltvx83jdtqqzytr46nmnmaph0o2we72kzrt550coi5cpy2c96wubzruzyccynamv4l19067tonddg05ceaid15qs6cun33drtyfy25wg28ypl0x1riaxcei8f6ld1bscsyhd8grxlwyullfjrdhyoo2hnodpsoyj2p1xhr8me5kct61zi0utu8t6hjp4affy1ohj2rzoiq690gzga6xud6u44k9hr57k83ko5p3ldki0w1wgoyfa77f6d3qjozf9af3u86xouhxzwsl1tydcsfuf36w7lfr8wwvxiy56gsqiuqxdun9at6rovl1gflqnjfh0ww9ae0gsy4b9nug58euaolgz3yg7q4mqh0d0jzosjtq5uzzwr8xw7mfcgbjh6mz71usxgkiho8927dp0crvdv9k7lef1j9ixwgky2geupw2rdv64xsfjk58oeufn',
                sort: 594462,
                administrativeAreaLevel1: 'oypedsynqdhuyfkf5viadmk1lngavmtdnsmvby4qxv0hc3np32',
                administrativeAreaLevel2: 'wjxlbi5isyh2l9o6fye7gdi6ivack0tpl28sug1fruqjt4gzjd',
                administrativeAreaLevel3: '2bpc1q1v0kc9hqpnkokxz9gp3psa981uh5yrqgoeaj7pyzwqh1',
                administrativeAreas: { "foo" : "bar" },
                latitude: 404.64,
                longitude: 6.69,
                zoom: 88,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountrySlug is too large, has a maximum length of 1024');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryImage is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'eb73fdfa-89b8-454a-b874-a82bb6b4577a',
                commonId: '22a619b7-6af3-4143-9b46-37995cb93a83',
                langId: 'dedfce4b-bb03-4b71-b06b-5a152d70943e',
                iso3166Alpha2: 'c5',
                iso3166Alpha3: '1kl',
                iso3166Numeric: '5k1',
                customCode: 'powbrzvy6i',
                prefix: '2z5q3',
                name: 'pb2n0t2u0kn6femugwv1qbx83eqvllh1cjnm90bt05wolyexcckdqhutqffd01mctav3map4ql61w9aozkybb698mskv8rlnpsa4tzs6qmvgcp6ggbtogrq70r6uwcwgepj490yrx9pubo0iij8q2dvol6qj0ee241b5rx9d4oetrgbwlbkuz1znun9wccsjb7n1l1oodnlk9tnuzn5ml8xjv9c4as59z9835jqunq78pda5lr3d5sjs0liokwj',
                slug: '5f7dnbb9w8y494df8jsntgbs0jz9keu9qi3dajlzxazhzq3m8pvfm4o8egitg900leq4cka2hjhwj16fgdnrncucrj6qx1d26v166rs9go392yqm462mqoejhny1nhpqfdqsryi2lzx4i7vlppv9oxi9qxuost1dolr3lxis2ykt3dmj2pjxilvjjhd9c268vsweb68m5lm5pj6ha11yjk7x1apkx3lf42oycxlwpt5pvjvnuabgoyukwaczkbxa8qtwwu1kkr7g2ge4gvwrduruqjp2jwz0k8tyaaxo7vz9em56rw8kg9nj0tzw79eyvpq7got0n6cbhi2qkrchs4t4o7m7eee2lq6akvj7iq0420vqj54sfaws9ystt6r7lygn2ein6ye4cvepv0312a33td920un5vopdiyhhlria5vje913yjgzdcjw7zy0rijts5hok3vl57szgq5lj0kh37qzr9q3w4x4h9kvqatyjpvmnq3z7rn4an84nue8jkpmi2qyexpku71r2bb90wuiksd92meab0tbm7n39v7k7rh88iacygzovzlxt13aapame1gtxt4vzillbzxsxilp8dssmb9zo0h709fk5n8hffu4kaiaai6b37dif6ti2a7a21bui65xdugme82pi68tkn05lw76j4qchvhndyc7hu3fwrvhvamkaherbp431lorp1z4ftwqawxc6588lcd0m5u9t5u7wg5lz23gmbnfu08yj8lmmp5qlxcgjiinirydqc097koolfuou3a83umoi0hhjy6u0rdu5337lucu3f48iw84ibsgb56isdaj5byv0xbtvbo4mr65oeixieqqpi732sz370tndtyc7jljm40fvo0szdvizcan3d0luci3ngflk8hm2ydn2ocvafjde8xzni4purg10izdvim8w82b53hyex19406zdh1o2gmpbbowtwprn3secsibaq215y8ovd8w0ya40jr22qz1is5h2rn5shj9eq0t8ma2k',
                image: '1nv8pcu533ravzfb4jy4o86lcgfe95tyi1ki123n8oe5fvbc95lcmshrgd62bcnrjtdjlhiy6cjhrzi61x7jgc3mwzvy1csljsp4sc8uap1mmsjpxpie1zxxe1akfrgc2ml5ug764zwk9u3l4qn574azovng5dehc1t1wdqrhhq8b1wg9256sx5zvcmsayjy24bil7z5tec5lyz1qclrowxz35zk34gmuojp9lclcw4w714grvdvphkmetsh09pbhtnzw2z3gdan1lofc8dy1r8zgi7fzf1hhcawnj59sqgnc4lhqdm1ovim35ockw9zyfdarb5wp4kg2oi3x9g3yh6tm0mogf1beqs9b8fv25a4rm7vw92xisu18pg80yufzyklbs4tptqk6soe31ruf8io7qrkub31pgiibxumz9cypy1yaqiu5gc1yadwbqg12ahrxjvra5dxt51mnrb8ozo1ihrostzqd82fyrdazv5nf6cyrlulfbvng3ivblc2rjja3ci3s7gthl8rcnld037zlbnbz53cjmdnmbftqmw6g1xxepqh4zdbdooomdggksd71i3btjf17gvm8hyqqgp9lyxca21z62a9x49y8sljjmmrefqkrh6q38fku3cfuz4oxkh64zehubgxh8u226otcsv72ht1n7b3jnu8p1y3werm3uajtsdynqym81khdsl6obd6x7bbciw9eppj9igulg1uh1b5qth0j9ulplpgxtue0peydv5x0feoc3u47ftg6eswf5gxhpveyqio4ppddgw65d8k4v0now36gjlnahz38xu986ivh9tlwxqydkg87jsw2olnvblcxtevwkxs45lscnr2wf094v66375a84te3nbdx7u7irq0vyeicq2o834recbaujke8sfxz0rr5ypjqqbu9vyjlo1p8k01we3ey17r3t2hsfwe5k6b715raq80baijvoo3gkz4qn1aybjm9exjqy3kkj1flvcp4ambx81y3on9ptleat341',
                sort: 932351,
                administrativeAreaLevel1: '77a4pb2jfvrgjx1xtiyduowcp2sdpafsqy2xq9cqfzsfyungvf',
                administrativeAreaLevel2: 'w9rt0z9kudzurbtblipbowcb39kk4iu4gny9bqtx4drq95bdid',
                administrativeAreaLevel3: '8xs6f9nmp9utzom5175cnpnlxexw9wjieac1u3hczwk5jjd9a7',
                administrativeAreas: { "foo" : "bar" },
                latitude: 591.01,
                longitude: 595.84,
                zoom: 41,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryImage is too large, has a maximum length of 1024');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountrySort is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'eb73fdfa-89b8-454a-b874-a82bb6b4577a',
                commonId: '22a619b7-6af3-4143-9b46-37995cb93a83',
                langId: 'dedfce4b-bb03-4b71-b06b-5a152d70943e',
                iso3166Alpha2: 'hd',
                iso3166Alpha3: '09t',
                iso3166Numeric: 'bal',
                customCode: '9gb6pb151z',
                prefix: 'fd23q',
                name: 'aiiue3m8onr89lbx25np9jzi6t9lj1732t2f0i4o55u0hdlqy7y57ajex268kurbe190kdy3ja6cs5hvrpua2m1jffur1jnyhcgzxvcpj54sxfqzj8xtm6n5vicpmtxurzuuadkietuhzh93btv0vb9fvlwg6kbhqxld3ori902b0896y3nslskw9mrm38brp7p0rityerknoefw49sjpdaojwnl9udfe2u993z6i2j5qydgh4495tylq0b2vyv',
                slug: 'zfrlynlcbq7avazzgh6c6ynbkh71e35gx48q32h85ewoh0b1x84ms2vow1friil1iqu8c66b1j15dvt4b1nk97cpkbg64rltn347is3f2n4lmlw9oxww9bku2c4ryoopvu4pg0ed9nad4sdpxnghqsxeb773o0fnvksoj0h9bfkuz0c5jijl35h0y66sdcuyj8knhd1m6be41dqct3qboupli6ywb6u2cgx5j6njhhw4hr4mwv71liqdproko76col8tpo9ql6exami10x2ymr3mqqhr7i4sj8ytk272muiyo5ikd94w5fh4zg54yr366ip1l3d6psu3gvgsqorzu4n1kb3xf1cmmy08jj50hra44yvlucvfbmc8wg4uryga0v6bmk8xkplcuqma0fjvn5mpqccogumdjf6cmu56i0fyoe99qf1th39ayiucvkoeeuicips85edfkbn94s0qx9yf3isl48qtcqg8x8bw8j5ipsvzzsx5a3vm30232t3tbjco4ed3g0pcijugw8lcenyy4k2qr0pn89kixw07fuz1vbcz8j1pzmws5ike17jrvteri851w9k9dm6fckcc7zngbvz7okl9dengl76mmiilg9491f62849l9yw231uvpg5ew7yf3bvsed5u6uo5n6hrvn498qvkctyi3jsps94nfxggfen2tpvkn1xlk1k42m90gh5mzgvfbtt31a0bkz8h7qpgopl7ti5ha3yx16twjrii8nbjhvjmfboi5n97mycurnkfdrizss3zu4ecr311ii2wdeimcv2btx2alpodowbye857j0hxphg3u99qsrshqo60nklt549e875tb39oex19301ud2md7umma1w3wppww5p90s3uanpq871sdg68fh0essmsrdags1uifv2llae4z0i5iuegvmmjiq2h12w5o5rkks149jzzatg92hk1q62h6wtf9qdws4wyaxl1s5ri8w53bxz1jmqva6a7kl8p9yw43vp6ebelhibu',
                image: '3pr9dob2gy8oduoss3wsvxzr56irp75daky5j1zq9dbxxvtck90z2si9a1jypjg498pqmrvpxkjkidm79h7v15pcvelt83g55ikucx6mhfd1glia1cc67kw7oh77h7pvcprs9dnq6aeio04pt4ucrdr5mg4du9onb1h8ng9rzs1ub1l8f6nr2kvf00sa3dn0xxcz7bcox6rpucjiy9h74hjo9d4fyfbw9038ek0094amboxih5d979bwjvbg7ti2nlfjbidfjmqqwoilwnik8o5n07hn95xne3ipznd3j4qpzv9pi6o0qheiopfrgz117vnavcvbe0n3f377eyropid0fh6i5l0wjypedsil2k1965juq4ys3cb80aur2a6c49lapblepissuq1gyjsguvlye03s0o6auv36fei6uvq381szbqv1wuojjv1g8clv41bh55nsr0im4kyywll9v9v321psowzmi6huyjwyikjwwm4e3fqufto9o54cntk4wtcw5e4ejsugbdl7ocdqufa6rbxid4nlal7njwrt2mgvjucmvt92zuk060h76jcct3lomepuifh2ssq99zbhmfr5ckt85zjchx4o8kudwejyxnca1oeeyayrikxw2y3bj1xiiyh9z1bmkptybx2jij8sihr1nwnsgsoss4vkgdewsilnz576c5rcvbj30c31f8ck26llv2lyeb3530x8upuctvb8t9pgmumhrty75iyba0by9zv1y4pczkct20xslecl9cbs6w9ryvdi43o80ux791r4hgrwgfee15zekzsj7qsi7pj0s68zicjy3huttmb395xggicmivx6okrc3c91z8q3hoxlbk5qw2juktezdmxmert2ozrv6241ypettfoj4bgsf9vim1py2461nk9t6ks54uyq4aljli8i8pd7n5rauq2jfbyqcovby54w4xrfmosx40r8i1ux35qxunf8pz0tewa6p189kzd037tndqjb2yn50guetvt0i9ka',
                sort: 8818173,
                administrativeAreaLevel1: 'bpd24g726an1p88ybk3o255rmsdmt1r6y4lh7kkmqivtkn8qfj',
                administrativeAreaLevel2: 'qu6bbsqzg5gi8huf74jhmjpa9gc1zrip8pskyts1vxzmh9z95s',
                administrativeAreaLevel3: 's3hem0z0xgsbtirp3eyluz01uifjmyisstwi8wemusxeahpwq8',
                administrativeAreas: { "foo" : "bar" },
                latitude: 719.15,
                longitude: 328.50,
                zoom: 92,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountrySort is too large, has a maximum length of 6');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryAdministrativeAreaLevel1 is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'eb73fdfa-89b8-454a-b874-a82bb6b4577a',
                commonId: '22a619b7-6af3-4143-9b46-37995cb93a83',
                langId: 'dedfce4b-bb03-4b71-b06b-5a152d70943e',
                iso3166Alpha2: 'av',
                iso3166Alpha3: 'r6w',
                iso3166Numeric: 'i15',
                customCode: '7leuy8jeno',
                prefix: 'x0rvs',
                name: 'x0rutnk11tyme5fb087p291y0i2f8n910tyf5cqo5y4n8y6q5ba5efn4fzat2z49c4oyv29d540d8cpt45g468jqfzcz61itcwl35nv5akic1acx5dv4zpx1pz10zjyd6782o5tertikczmc9z0nxpa6jjcljay4foe5ob0kx94ibmmlkx1rny72cfclxo48uc9zcp7tjgj52qbpbd1ozc013qcjct7dk1h1frmxoz64z6kaz2iz46ocl1853nq',
                slug: 'a3dkanfa5m5itbhwadqf840s4b0hu8l1xefas2mi5w2zwnaqa9wklk02w463zoijmwjooi1f79cu030nnz0m9lmzo29tforj2t0q1nha7nc7y1hlt3do4xr2dmeneigt291gbgw5rs446oclatms9usm7t52tqcim0wa6uy7kxqwjjknw083k472q48i0rzjd8o164r1mfoned6ynpqlp5p7azgm41l852j9r2c926oy2cojkiolkbvnn5yd1fmpq1b6fkrac9u9wuj6n5nt44u0tj496v98hcees001jnjlfl7exhtp6gj4ptc3twqvja8h9nk20yum477ca1gpl68smdwp3d32dr02w7eupz0gz6mpbtyn7s7ojb25v1esy0oazw0tr5108sjby8x7eyzuytcatpuubg8i7qkk6kkqhdw2hgext99fhg2kl5ltjvbilcxzb6fzpsrh1bv0130s2g6haokugyqk9x8yvc6vp3v1zkzseztzr7g7wdvmm4dj8klez6kkckg6ykp99q7mkrit0yaqs7p6txhfukndvw9yrsypx26qwlr5nr4p7tcmidkm9f0cww8nq4oecj8b8cbiou4z85rqpczyxsjqdov4e2xbft4lwyfo68r8k89byqxms8ei86wtrosax31g56c4ziv5j9zpj7uycclkbck2rk5c4j9vo0h8ovbtz082hfyjujk7c7suqc071zmaqrbft7s7r2yy3pe2fzjth0rslllzs1f0eb9s2nzseumip12qizxij63w8lywkxtf8ejn1n9unx9kfg64xtlhh1z980jii42x3z3jqhm4fu8hppb10banplfe20hbvsmb5xt7eu378iasmh9nliyyeiwpkomvgtrji253gy80ejubzxp4w1ktudkii5i2u2julvb6czv990qscwvz2ado8ucyfzoh5oawm4k20w3fz63er1jtg98nr5lj1dyol9dxemmnozyutu7e8mohvsqjubilrvppvc6shurv1sop',
                image: 'gf4tghrj70rh2pfa4siwctnk9esgfbn2r0p4n4ory9g8cb0bmfx0uiuw288oe37kizvyg96saaur735etz58fg02543lwf88e4fcp8smx87c7zvullh5qcej2yqrl1txdhcdt7k7s6okvb70fy7183n557bdmw5kf5t6epj7vx60zxll0ivmqthqpa0loyw5k2jycwhow6cc3p5fyhw6oahv89rta3y7kn42hc6rkyk2f4mhhd6tnt4cg59zhkbgk91wds27kzlcmjrn8phqli47bxcnatzrpryuezozqytytd6t28q6rmd9b0qf8ljft9qtnb48nvbeiro5mta0pi3z3ezvi8wlp64suedw68505hwrmaqaukahxct3kk0iilu4ujy5hmy63udnwnhcggtc1xr3z93p3mypcnlhbl93la6rk6w4mb4b2qnxg6hg4chjiv9re9xljvhpfcz0jaktiq1a7w58fz58onrf1rngysshd0fepll16sem2uo73qr7he528yolx9p2crbhjvz4wwji7z5m4vv1iotsu1d3fm5m3p4w23mzym7u4kp0y6rs8o3ybmibtzd16mk5gcuv9rgg6uw7oj2u0f63jcb5ffjg1w2o38anhnj2w88bup64ui6dnlyknso1z1daay2j7e6raj8geer8w28erl2jwcosjl2c51o0dm5g34m7dp1jjohic42lcg15jgjkgpdi6ikjdwfyjkatgrskpm2m7zvsr3vjcovr866ty8rmralo26wi75tnt0pm5uqgtovuaf9l6kv9jdkvstjf4onchtydddqph720iks1rrj87moii8qqc4zz45cml6tr06oqdnc0nj23o3m9yj6j7la4sb2wsrs0dhm21jmysyga3sdvmw9aofim84of4c4qi6rz5rqoimu4x122thqllukol2hz8c1my90eq3pdl84jwvb7rob1k4deshgp7fr6oswib7z1e093bn9x8o6r8fl1q8af7ejh75ogrs5wqhh3',
                sort: 220983,
                administrativeAreaLevel1: 'smrzuhfx9xw8inavqx4hwyql4ak1dgk9og0q3akxmpqoo9rwnun',
                administrativeAreaLevel2: '003hhqpotpi35jjb32feho89u25elgxdongr41xhi5ryed7z1z',
                administrativeAreaLevel3: 'ojp5jy6w59bjjj9n0ecd08kky37cpnk3qb5x73esqswyrwq8dj',
                administrativeAreas: { "foo" : "bar" },
                latitude: 501.19,
                longitude: 878.55,
                zoom: 75,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryAdministrativeAreaLevel1 is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryAdministrativeAreaLevel2 is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'eb73fdfa-89b8-454a-b874-a82bb6b4577a',
                commonId: '22a619b7-6af3-4143-9b46-37995cb93a83',
                langId: 'dedfce4b-bb03-4b71-b06b-5a152d70943e',
                iso3166Alpha2: 'o1',
                iso3166Alpha3: 'gpj',
                iso3166Numeric: '37l',
                customCode: 'qdunb93dgp',
                prefix: 'pp2cv',
                name: 'odp7h9dnhoxmxfenb670k0vmie85i903j76tp4x5pndezldsgdrepv2vzruu50lotk2ti2ozhjri0k2q7i2ugvoy3k32zzyx79rkjebynq17fxq90k85fcz611tujcow0iyvlpufvtll901f7cvswa6c4p8z2czi47xfxq4tpatiwtp3bgikqspod826tpfes3oey4r103jsx9n80sumvz250t5l7quab9z9hyb31y0zuzdlkz62fgfmg4c1jam',
                slug: 'ozf2lewv02yr8q5o2elmr08a62lsdyndzjlot6h5jvgulehstvkd0tainx4nmpci5iow3cp3mk3k0xseriv3pms65v7h24ar3cbe7a8stm794ex1n1l7z9bergmod6isiicmmtt0n3ofjn5a5wd3z54up9g381v9xqzd7v50bbtht66yf07tbo9ljmru0ozwbqxq76u6gkz8po8f5qfe0r9uppo96sph5k8wfj0gek6vcg00m2751fpkazojfzq773wxmwqft039wib7m90iqlz0qnc21ajltsrr1y9moa48hfiota2651i41m1353y6fv9vr6v7i8kuxp6upcipm3p018th8fmk9u256jwslt87elwvqc8h18rfv4hhqps64ol174a15dxv8coskx1av8icyh5nlrw5ekpj0i05e6si1wlw642fnmchrxyvibz84zlv6yzxicafdgo7v2un6ftwxw10ans9y3jqwgv68bygs4ehekhonulq1z4yhk0eascm2pj4ijibl7qznkoeprm7s3762rbdwhx2ony2xsomzuvveyojirnxb4yco1g254px2thzc72attk3gm6m28kd66ubs81a4kkpupqdtol7p9vyukbw273npu6ii2mvqa0jbqtvuzltvmocqqghc28uhh03fsvnro17l0ve2vnqftql4dk7bzhu472v10u25qxc9teqd4nv5a7ng50sihd09xuyb6v6rpqabae13ezh9oryi4d0mndputlij4oqeuh1cwjrr4oxwknk2qosei15wmlcl4d3frv3pp6poozd1e0jzn72yayaq34oplu5w1fj9hoh8aico2obie6mdf8rc5al0fh1u3tkx1fn84rstqy8vs9nl0haf0vyyk8bipm9k0ay4lf1s70fbrx862m7io8eh33m2l6m9j0tp81al2z7xuva1ibz1azc0b67eqvq6lc8xd1ef0moxr2rst93br665qfq9v7ycoyptzs0aflrfsspi7u3kas2jlk6',
                image: 'wqjwip8yr1pna0t1vhwa85kv52wfpicbvzxl2na8uszhncyl5ew6jcpddvswnexfay3whytuhfmflv5474slbvd8vvaks9a6ebvld4igiuyynkb6u1f9812wrec43itqpmdso6ly5mcc9zws15vgdpxjvt95qtmo9radblqcquol7lqbg6v4ow6oimdr5dz8guxdkzdjwmcy7k19dms9ak5f4rjt2972y1j5064sc4ng704it2mz4g03zlr0vohjhlno02spimawevmv4xhdu61jyrk54xr25tft73vpapm8ap6rdew4llmjxwzzp87qpr8ncxmggjn8liya9qb32fv353ao60rz9zl9tpxz4dce62cw3charw5ebjptdv4ea6m4x9m048azr7u66km3vkeiru18me9eb4jmcsgu4styknbrfq9lxvvcmemod06ttspk3rrrl3l5ghwrgbegdhonqv6zswzq0vr8me3cftf3mto20mveb6jubtd321z3d1t78zdkwvnwm2nxwyw7s3e27tqz8vd1yh02my10486rbuaxrt1tdyscbvuuqrvkrv3trsjqhijldyzhs2ubuy4ztvth6ax7eurclzekgpptpayjlw427uuw7h4h9rcra84507kqlndak8fdwora1p042gqa01ccwki0b6uwdf8qkhex6wi9pbdov44d7tw3lhcwfssqkn4mzvr3dh52jprooj1i664fqs7zgvnkhvoi3iwe68o2gmxw0h6gwq0jd6bip4esi7xgex6hkwi9af4asur8yiy0b7j4924vjln46u7bje8jy7c2y46dbfqognavr7kkpq43mc7dtyph2txmtupdx1vptvbode4g3992vep0ljcekj511gqekmjjan96xg23928cwv2gik13uza6h88whjm3lc148nv9g4pu0wb7ty2flo1zvepj8gx3r4d41ckhfeve3oez3iynfv0dcttl8lw0w8v6utp8fu4j0offajl3g307khkz4ajl',
                sort: 502203,
                administrativeAreaLevel1: '13v653asn61f5msqhiy1w2tb7hdghpw8wxfm0wi311iw9br64h',
                administrativeAreaLevel2: 'rn4h1xvig9hcm5lsx8oaqh59sv20edrvzfsn4r33w7o9g8qehj5',
                administrativeAreaLevel3: 'wvw0taz29ps01ugowzxprsx77kes9xyzpo556pqwiamkn8cdo2',
                administrativeAreas: { "foo" : "bar" },
                latitude: 737.44,
                longitude: 580.78,
                zoom: 30,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryAdministrativeAreaLevel2 is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryAdministrativeAreaLevel3 is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'eb73fdfa-89b8-454a-b874-a82bb6b4577a',
                commonId: '22a619b7-6af3-4143-9b46-37995cb93a83',
                langId: 'dedfce4b-bb03-4b71-b06b-5a152d70943e',
                iso3166Alpha2: 'hi',
                iso3166Alpha3: 'wc2',
                iso3166Numeric: 'e99',
                customCode: 'uzu6ratze0',
                prefix: '938ss',
                name: 'k8yispu97ms9phhr34xgt9yuyorgn1oyqyehw4ay0122dci1g1q92uq104k0bhebgsonoeeohvhj57r3ozo978937854xuswcb7n0nw20dbi2v4c2qk8cgl4c11zpi5b3h4rvj6arwpup19pd2azbybjakest9pqkt0bnqre67zb4insh16eea28ovwqonj2btsk014x5b8acxymolcuojqep8xf1yrtds3zmryh9evchn1brurvxpu19vtvaro',
                slug: 'thq9xpe1yz54ui5omdrhyj6dxav3xzzk9hry5ptg3iwlu58lkak049ko8l5suqmh1n6zryp57nqcdfb6g92134s16u2mohe5gczn1op94h0p50j301t0rq7ttp5tudc7ooelyntsvul1hxcbdtl0otatr3xqorn8p2isu3km5k5da237i0o3f78tdqyxv13b9xt2ild99rnaq1xqe6ev6j0y7gc9ydr9xsl32u2qxm7bxqyrfqgr9hhou3qnsexp4dwovr4cwc29vml4r8dizmgd65fkuw00lfhgraizbykefitws76wounwytu65y9ldw77s6lytn4ze3jjlcdw82253el7vcrw5jgfd7svej0wck5nt7d8pop4gc7n3l5g3fsp5k1vsk7gkuto432og5m3i1yflt3kjk1ohtd45ymgpxfhmx4yv49brt2lkeh54vdhihok4szp0p7dvd5t1lq6svy37v5ole3u9f8yvedte2qw78ohqorcux58bvi0fz1v64yemk0c4e1pnciuob4dy7ql3q3191860vfm9in99dxcnw8cab2t1wq1re49bqd0zau8ys1pf9ezbdiu9yn86fmwblv888a0g5n9nniw49tvwc7at42rgb6nkwgjbljeodgjocjtxcf7p166kqdwd16cceksgpthxbjg86so399ed5lybgimtj14u7khp4zjlf8lqpgl769qyfx0ta6ivovbglii65rug5h04w41233u72d91hq0m9dxyd6qmwhkdzl2y4m8agarfpc4pvbnqq07yjob9i1tn3um92134f1a97v5wpzxlbi5qug6v9piq70q20s0ped6u0ngj47itt2zv3lrui6b8g48jtn24suswty7dipk2s7ye35cb9o5scqc7z8m3fu503rulhlbokktv2rs2tjixrm2jnkx7atx3ug35d0advg3ou9aan64guip1o3nphpra1m8m73tpr3cimyzy7dlu5us5atr0rf02rjed5471814iz8g',
                image: 'pojqd83pmrio05aev97xtuod63lcn7ih119leojq4vgr99k2v8oc6kblixnbl6p5oafftq1yenbha6yatvf0e1d4ox30yixs75979doz0zer70xmf1w3kl8i4w53ngofdprtykvjpfkxe7m2t0laka0t8vfoq4cd26ljqaz5jvr8rk3ero1kyym6i4zvnadscsuv5h2rbd4pz5hr1cdaurb9tmulo91ntixpy3tl3evzxtgcrgd5bz0o9b7hh2987q5rge0tkc8fz5uape7vjhosqimj9ntvvzvanfti86c8jdnh03f6wj8kbwv1bdqgfbpjw5y8y2kk5er6vkkrv9t1xik76wecwfbvessqlx1z9iwv4blgmullz2z2t4ilf2bk3hbzxf3uj0szm904dbz7w6a1plrxg62wjzviryzn84ayprmijwkka3wr53cx98zu9rus0x6wjuwp0ayvf5gygdkg00vl8ry755fek3xz0ypc7w1kziqitr0ckzz2wzcdv5ciafkhs9mu03k5fz7gqrfp80486ixxfk8zzvzpc6gb57g93me1ka10869jt06sj9ihobh704jvtl7l0zqkaggoyt1eigslx1zd1s9ozwly2zxcakxy4gjtqr4qgdfva83byv88kohle06z94zlkx6hxlzeagd0x2l5sw9b8eo9con8p6q1wd0eos4nydliamyt0hwp6jasycrqwa1il5r5nta3k8r22a07pyowja7nujt0v1n183oo2zrk6otgwxywokaa41kggjhlmxvypxqhmbvf73uayghmbxqrjdra418ztwie6l93sv4iiais58ghrbmzs67muj3i9syojra4pd0r4yddjnh6w3nmdrg84emixwpugz3u57u6762hon3qok366wa8iwp64rabv5i6a9ai873t0gy7mvm5fokk7eu1d36ieetnfuvf1g5g8pkepdldr7kawpbhqk0gaijx9ipr3ijqx1m9elnpeb7hcfnqvgyvs6fqxy6b',
                sort: 736448,
                administrativeAreaLevel1: 'drau3pnusjamxxhg28r7axp06fk9e6yd5z0p8y2coxilqr4qpt',
                administrativeAreaLevel2: '6v5h9r4gh1tt5c86gdurp4kcq858i5segw69sl3r6ne5wnw67d',
                administrativeAreaLevel3: '6c2kfs99zc7ej3skxagtt9kdum9c6hv2zrq9wo2yklqvmi50y01',
                administrativeAreas: { "foo" : "bar" },
                latitude: 804.01,
                longitude: 587.70,
                zoom: 67,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryAdministrativeAreaLevel3 is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryLatitude is too large, has a maximum length of 17`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'eb73fdfa-89b8-454a-b874-a82bb6b4577a',
                commonId: '22a619b7-6af3-4143-9b46-37995cb93a83',
                langId: 'dedfce4b-bb03-4b71-b06b-5a152d70943e',
                iso3166Alpha2: '0i',
                iso3166Alpha3: 'rbo',
                iso3166Numeric: 'f1x',
                customCode: 'wzo6bbff49',
                prefix: '2yait',
                name: '8nggbvl38wctmcozz2kvsk0amzt0hpxa8f725jh60fm1yvoqtd1ps9izs9htpwbojwiiydrn3039tjncu9c5qcwlng25ro2541vt95fkl6eoil5vxaruvhmslhl0oqk4yaies503slxv32ocf4cdsucnmns4cecskprbvuylcovyq0ctbfwqhxri8qlwpoxxskjgb4j9q4f6rpwf4zdgyf4t8yvm8k1om7my2wlb5odzw0wwnsbzz8v5emm3ttz',
                slug: '4617fj39533gcb8ifhjegcd3brmjsmw9f3fzarxupfdbab970opl8ak5483np5tzthkr0m0c1pkdmicfqepmkerx0xponwbn2qztx08wxhtbm8x272m41s9ajwippfqx5ukxiagjabd3yptn0lljd2q1np3d5onq52fx4z9to9ykwe6iqkrxxtxtnyb7bop7tma3ea85yge40tv1ah9wlo823ll78u7nvpja7q0zig5ms9cd73o57680wzi9vsradrwe9fis74eej6u7ozbb0r3hfw44uqf5k6fj32jy98olgyiwzeadhhadie70ioqg8i0fc0lme2r1yxtz2e6a2d0g0xsqsumf2407fihglc3ghd07jqivwvdvdavcbd4mwbbkh3tv057lswqmav2z1h5oyxw95i95b8g2g396a8tghdnj9eekodmw70jyc8pd3wfd9urha0xwu875hmfmmr15awskuu8lq6pikup4a0pogbk6atrswkzmzfjgpo5kqszt8ra8k5cuozr0keoobfx8ebhbcpi91nao7i9rl8rtg12oikt2lb4i55mwhsvq4y6c5fcpnngyzsk8p32q8i3z53r7ubaxnr6ywdi0wz4bilcy8cjqrulqzzavad5qdqpy6555dbm80smw5fr0x72ja8d406dyvmrsyt6od7ghy8mqbvn0smp2wyro08yhfdub4w3fq41ijuufhasr3c8zd29e7732r71tc99zdo6lnffl60yei4gol8z0a5p2n92zibzh2xf6zswct402pe3rek17lib3gjmm479vi8as0holnzbom23sphsqluztv2qcpovxahyiayzxnssy9ctyaa0upsq7dawp547u2r9os6tbgxz0du6abkynmd27a029xd83kzxq2nb3j2sjmri003e7i4x9jski2lmoiay43s1yey8wqvi4qejq7r7rhggqi3c8x0d3w7cw8dhpbo898kxtnvvulww7hik3monb78t30r2fbllv5zqkx047',
                image: 'jna22mlp2fyawfj923cdpc3yjlin5yufytwgbfw0scqg14h05ysez2lqfjbmswfkluv2dfke3f6nxb5q5brw6tl8kheyh6j5puhjmru2tuy4d4g1733hrakda63crvxv50ws0fs8qdi2ncf8vnxt1ru5z9bsxdrzxzm97zy5a2ysa8vyuwgyejsgg4l3w2i5bfsuj0gq055k3mpntrbysjckdc2ghlbgi28qtb1aidsnptz589i8008e2j19ctuqssnvvgr6ru6zptj9v6pjpjrkgdb3gsgjad2rgcto6980ph2ws7kcfrydbwwzu2lmvub2vou3sh5rd4tmwxkby3w7uv72gdzdx25fdm0cwz5fkf8gh7hcu77laqyvxukxnmxxv35ojqe951cnif9bs5bqsm2jdct5pjvk58fy5wad1rbdl8to86hyv5e60qqyyiewdjvtk43g82ah0n93rs7eqtp4izbedkc0qb3zyeeu9utt39l54i6rf0nbzdqb6ninh7fw6gn1dpvy1df75n9yzl7m338tbve80asav7zla1usftoy96z7uapyrgmylrxsb2ixr8ur8j007fh2hydfa56rgjh2cs349bv1881d1fx41vc2fv2mih94ki4l2lr5wxlsjgg4f378skmafr704zah1k1kjqvnhlli8n6zv780fuok60du6bllfnmc7sy8w0rb29hnlcz90dhk906dohhpfn44xxbdxeewyy3lbwf86a8s5iocsfoloijsimiow8u1s3j4ev9kaq6ev5dmebhuujz41af19i1eof9gl0sark1zux247skfx5avjy33yd0j1zpv3vyjr8jlrjocymqzou9zlrulklgmscxytj9kmf1ophy5pitg7rq97wn1f78ilkve4ikl9i20ufxzhc2h2biihoj38vrj0swzr4k1snb5j2djsnvqnq4d55zm3j9erwsco5qidaspafbae9j6hcqw94d0kgzavdjg20w4ywww76zocqg81blb',
                sort: 111449,
                administrativeAreaLevel1: 'mpynu2k3p8naqfy0mir78bizt140pg3342wux25derq4m51a2t',
                administrativeAreaLevel2: '9ordqk01u8ptsji1qksf3d9gx4hsiwt4u7jxxeqi6oqyiy3xos',
                administrativeAreaLevel3: 'irxaek6xtibgun3l0voai2fse7dsmfz1cxgiw0vy2ryswb9tjd',
                administrativeAreas: { "foo" : "bar" },
                latitude: 396.04,
                longitude: 156.95,
                zoom: 80,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryLatitude is too large, has a maximum length of 17');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryLongitude is too large, has a maximum length of 17`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'eb73fdfa-89b8-454a-b874-a82bb6b4577a',
                commonId: '22a619b7-6af3-4143-9b46-37995cb93a83',
                langId: 'dedfce4b-bb03-4b71-b06b-5a152d70943e',
                iso3166Alpha2: 'f7',
                iso3166Alpha3: '33e',
                iso3166Numeric: '3jb',
                customCode: 'wpm3o970j7',
                prefix: 'ffmhx',
                name: 'b1wpkhao7o2pzd6yo33fxwgq6a6siyzw3idd8knejpzvxehxkncb4uxbay7prkoy6mqjobe36r04jcyla7pvhx1rpkudqsigb6jclubs8rbgrgvmtbnar24i9t0lmimmtblxaorwqskctb6jg1oaxfbpxlm7m3znh91pzv4ibhe4d63etje6k0r13ibmshkdk7620ua7zmhbm4bizltnmpf72i4b3qsexkg3fzoml10xbyhl8qe2ldiitmr1bxv',
                slug: 'dif9tbqiem82l57nd7z6q4xvtfan16qne41fcpftfxeskufw0ai5z80g250t2wmujvqbr9s6ocwjabbz8rgph19yj7ceuvcg4bh76nlhjt6brhk11vtl1yjfyqkzo1fzfqu769cl9kov2jakmb15n1gilk2bbs2o78iko0onwh08bv9pi97qtei5wvouv6ilzlgtrvvh3bszrc4iyfvyf0jk8spn4jen4cjjxd9dqawttlbnvh1rv09xd1nsh3vw7nu8f8f6tjvrrw9ro5p8t8ib1fs1mv4f69anx2zbdtbgycojursn5hsq7tzxwqj73o1jwadl56wl91owjnqu0ezkrxrch64osumt0aeu2rjluxdhuxf9x2ozdbyghl2ohjbj47oy1jxjmoo6oh7vinu0tghducazuq1ebyuxym7psiiojpfoka430v1pfdv6a0h8syffjigio2yp68qhx0q62u8l14ogzwkxr2jmyp85ooyjdlfqxuh57bp0oalksyiydzinbortk34bc0pq4vvra3dky2q8spqr6cdjrghdhzi94t3l1cwh6ru2u7tjyt0ziad1wewqyyrlzgqe7ozb0s4gj5d334ituks0k3fm9n79b63ojqlfjo3l734p5r3911jnizivohpd5py6mo8s5ypa10hecn5tixavrwuvecbwtp2dinv3t8lufpjy49ag6qd1kjcpmzzx1ohyuondk3a3ffrsmu25smy517b24xnta8d46p772imtcfvha8733eftx6qap7whsovab8zmche9igvzhy1q63cqnjqvrzk3ki91t8nm4k5jhx81vr6klz0k36reyr5ir3jw8737ac12djiabf5o3vex8pqq7jjirjc0itxl0ogtbtq8f85zjbsnwkyue9s33157sr51a7tfe8aouvw5lo168nrc5ivr0jzi2ix16xpzo2hpn3waqxmln10hql33181lrztf8btwpvcmf8cwry9wy1kqvc7gs6kmr6ywvuejwp7r',
                image: 'ecqijrai4uadvjodic4h8okzerawqrp25r2megbndw75xc6cun2cl7kypkhua6nd7yov1ck6anme7v8szgw6gtw8ql8ja93av4lawtekzybhn695jm0z05zb4ehhn85g2nlr7hg8ob9cp5r5e91fv2ehn5k5fmp4hqyu9k146vie22ut7ixuub3rhhtomayxlx4sgiezl87nvpwqnl7j1os90xj72pl2pyryy91ozy2ac9qw38h4bt9difcsf5ii2cplamrvcjdue4evzo3mrs41wtgfck6s2u2u0nidf944dzkybhyfvtdyiybys29zi7xdlirf7v9arc5vb1xroqb6e86p6dv0xihbgtlp063kn51lasi1ixydbxd8tdjtfpb6hc5y29sqlg4faj3sfa5mr8wza6cvn19w7xitosddkwvtad1bals4onncfsnpjnobmo4qdwhuk7wkw9xfyinux8gbvd0zok5te5sw9azt0typ8vd9swyb3cdwyly3fv50zjxnek4cq0mihfc1rmwzywvl857jnjgh4x1ds3m4dfyacdn6eqs5ngjvpp2iga9o69v8eneqr7r9teypmx31r10qyaplkqfuth5rtrveisqudmc7kxxqemnqewpkk33df3f7ypa2n0q935jrqatwdkzp3awmef563n9u0jtys00ghy3dc87lkhpvxk5rgng10797p27rly616e83r9k07q514yqrzh30ef0pqe73eo71pzq5q2ncjvt4my09on9zul0p399ogblvae61d0t8emlhvo6vpufn3mwm1l406rvy6zayywix7g94gkrfou2y4b3vvaacrgrydgug5bsof6lm7e7jgop7fxxrya3o4zjejn1mkg4o04cx0omshmvt0e7wmmhfd4c2k6x4cnkw0rqk8mf3t1qggznp6lzlm491mfepjbqa2wdfpzvdwf9zwvt1v7c7xypb77sfz22cyda4mmtgx2az5h9pvvjj0vgzlkh4rd432w7nmqk0',
                sort: 370738,
                administrativeAreaLevel1: '7qi7r4hanp2q4c25ritfiufu94988f3o78bbqfmvo851cwe34b',
                administrativeAreaLevel2: 'ijjyoq3fzsx94q4nhnwhoitcslpuhrd8pg6r69p8ndoc92dv01',
                administrativeAreaLevel3: 'fvm3i81kbv59pq84d10xrhk3n38c7nelq2ttyplnx8xg4huj2w',
                administrativeAreas: { "foo" : "bar" },
                latitude: 468.89,
                longitude: 499.14,
                zoom: 87,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryLongitude is too large, has a maximum length of 17');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryZoom is too large, has a maximum length of 2`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'eb73fdfa-89b8-454a-b874-a82bb6b4577a',
                commonId: '22a619b7-6af3-4143-9b46-37995cb93a83',
                langId: 'dedfce4b-bb03-4b71-b06b-5a152d70943e',
                iso3166Alpha2: '0x',
                iso3166Alpha3: 'h4x',
                iso3166Numeric: 'aep',
                customCode: '2im48lw7e7',
                prefix: 'brfv3',
                name: 'dqc4w2hk7qo1g2rcjfjqpb8837bhrvyz2syy7wn9nug1ciro08g0t5a32q1jqbnhucxbe9qilz74ppbg64h4woq88tgoks145q8lkoqrosdzxdxk97nry10cwenfd62xad9slmcphfdllgbenxxnrwryet2pbympz3ns5yx4lxx4bdu5qpmoemvr2kqlm9v24xgwoo2avu8n814utxodf91aotoimlnnbpa2u6nn0lg8fsa638812t6sw3eyb2i',
                slug: 'c74al0e5oc54azotqimvybqxjii5xhyqjhuekiue0zu4zg0sp22vpsbirps8uvzm0o7dey8s0jr3towuvfrhjr3ofi1o33xyc0j2gpf7wtismjzbq7cnjuck1g16l71tqw1yot219yc305ljq0ix36gnk4tmyyj201c52hw7hs16nesqqzg2e7m7vbejrmsw9dc7om69f52o7yb6chouxwkaf0icaq737o9r2ks12daeatvxgqtdvjug9qfd2dqfqrmanuc71ipjt3x6rfcg0t1urb2d1znxkyh5ugeku2prxdzdp9dza3ngx8n3gnxt3i4bi8ve0gjoxrgd5p65mes6cebpqa9rryv9753e6tuuyzlijrhgfamk226h9swwzyajbq6pu96biu7l1qj5x9nhyuwehfxckduywofrtoqq1emxztmsxz5tfpp8uy3lkvy4s3a08tsbju9yzcyotwkpc4iirafi2lzcny6zs94mxnr8mzbhjpv69jkluhobr8fuooxc1c8ki0cvxe008tpk9j9v846r8dypu3r9t9qw9ci4adywllqgpopnuwnapmxq39hw8kuof5yxax4h1xygntq3ibebifiixfcfgd7kjtf5iw8gi1f3f9oeh92ro9w7fskbwlbemxc9iuifrrdaju2ug74wyj1kp8evhwxz1k37am4y4li6am3wvm8scx44xfurd89f6hqku1ozxdeck9z6oi9yleti4rd7d0dnot17j3r40vqbev0albouk2xnmy4hxz9ya20mt94t5bl0dnbsvbpk7828gjnf2cbz57brirh53rywfvcgju9wjct9x1z2a5m6evq09ny5cae22ubzqe5yfz56siz4s3fcygmb2ac9e2uj3m92mhiieifapyj82adr2ndliaejz5stfg51brfqybyob2zmb61cfoerm18acwgfumk5yrrct2ml60gn6ki5bianjnp4qgkc3hs3xrsacptph5cohei4qfwqyf75izekjpl0fb0b',
                image: 'iegx3aanq7zwsvyz3g09f1drh6qxatzpzbzodzuv66deitxpkkxelkk9tpn4n9zrjvwsgd082c4jyw5qoagzi6i734zkh8p3l3zfpn4t8o93i0que1nfpkv9vn6hlgibof4tsltjer91pdwlaa40trz5evhy4jd06n9gvh82jjgrze2kns95dh3nw7d8ujv0p9vjd7lgi8t0hdfvz74rh1nppbpimdwuf9f5pvl84i1kznr5rv7vgks1hao967sxvn3dkxjbv3zwq1i1akdg5xvt8x49nhzgn7ucykqi2ellech2a8hkb3j6tntjg5vvty4c8xc3s0dkn87ile3wjws7wvkijol4t9bbz99f0o9z2uiavgstthw5y9ljkt5sase5fx2726zxuvk47q97ckk1p2s0kkrqs5j4qhyi0v3um3d9v86p4b8g6ct4fh0bbu3b0tjgdssk1fyqn36eh84rdllt0j67lk6jenfa1dgxdg60ajp6xds1cixstvwt911dbn6f2jcat9x17fygny0jaov1ee0iqm16m2jmzdmystge7xujy8o2mlshuhr6lbv7cyviq0la76h9ol3lzld5nhvie2xsb16ezoswgtyllx5uq2xiw3l7s9mxpvhladyc9jee0x1n940otc5njodkkrcv9kzt5x2xd3j6kivmmvbz2i3f7gtddzg93hdiujvvmp2rjrsh8sg44a71thbnhjc89c54lqcujl0e0kixifczx0lm87ze0ow5y08fgbgps1indki3llhr4lquhg2fmfuwxml1srvepyyt01ttnosdme7xsn9k9v2pvxh0xxd90lmynbzjljvgaiwu43aegyoskm9aq3v7l6s4t0lnn37c4yr7dsswdmgw2z73qztsntd4glygvdnrvdflotnt5x8ks8fctc6mv8vxfurqykm7xpzdit2apqtr4yxy47xkgtyajwmz57hsqc332p0fyb9vd3stjfmi24azettearh46rr7ywy6l2tajjez',
                sort: 657853,
                administrativeAreaLevel1: 'jxefl0jzgaeoikvtf3faijbhsrvf0wj7dsw075t5wtrs36qakn',
                administrativeAreaLevel2: 'gc2fg6xltv0wvvc8suzh85g8j86bz354p5j8737m9bpq1k6ts5',
                administrativeAreaLevel3: '4t56lpak9sy458rks2hfsbbnedkmjpyd3kx48frp76rlmr2du4',
                administrativeAreas: { "foo" : "bar" },
                latitude: 435.83,
                longitude: 883.67,
                zoom: 964,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryZoom is too large, has a maximum length of 2');
            });
    });
    

    

    

    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryZoom must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'eb73fdfa-89b8-454a-b874-a82bb6b4577a',
                commonId: '22a619b7-6af3-4143-9b46-37995cb93a83',
                langId: 'dedfce4b-bb03-4b71-b06b-5a152d70943e',
                iso3166Alpha2: 'f9',
                iso3166Alpha3: '10p',
                iso3166Numeric: '71a',
                customCode: '4hgayhlwi8',
                prefix: '2ylxs',
                name: 'g8tdjrf1wetycb6ulb2zmka8k7fqqg5yao9bgidsouqzk87zenkvja93w1vng0lbdo4g7k6265f2atm43bqjyd60h7m70i9ooguen5i3mwl5329w8bpo2edm26jt9vpy4b4w7rw0tttn55vkqkrc5zk681s4uuhau48kdhmzlgxsdf77igzby7oupr0qh9s4cbxad79jwadzfta5dmp3ym2rddozlg26sf3iqttjnps195xpvk6t04lzxtam5d2',
                slug: 'kw9hhbksjnogr0967b1jcvechgxwajn3tplzp4al29vd2di11dyh5iyd8uqpqs7wobibrq8ilnal0h3e04qxg8akpnwl1oe40n9hwlkm6ujd0c8g9mq0w496ur9d4e8jvb8gu3wp17cf824b16zb3614ol2g7413podeiase0hrn7fz95q417kpmz6bcm5kc74mxeanr4715u9750erxpz2pu2dpqhp68t6k95ovylyqtca2buettxdgrwy0mtuvm30wm596rpcza1njl2ynpdl0seb52w072jweky5p71c9n4guyitilo70drbu5zsewmlpv14rr4fi25cj2v8see1fiq021be4qf3b7nh1oi387ncksm4s7ijnza4j52psizp5cvo99ubsxbiql8o13wkqy0uebomjtq1cl2fqx88rsperovuugfyhjv2jnmgf97rtg4lw810u02bxhz4g5d149rov0ao8pdogjfz5yfk93bv4i73glbkxuvim8p7gfdhwxxdf3i8h73l212p7gpqe5a4sqeu6z0xr14xtd20s6f2hk8uciowa7r9ruobcrwkvwcrp7desiw5y44tkhonso7kuq2kglvnlsq3lk1m7yersdcsxyhsb43n9nd81ody1psyaqbupfina71fd738clmjs30z9pi5impn1eq0v5j1qwa4obvv9hpzqhpxwbrzayzvbqqy55oozu2ghn01fbcctyg5ottaegm23oggsokgcc7tkqcjlio5gmodggzxsaglpz8s5kuw1b7fa0nux36zig42bjbslm6fuxujnqnzfodps6z2apwix312c9epuxrjjvfxwhx20s0lkwemahkn3d8h7ugx9kas0p84v8t1iw2cv3jiqbh85cpxezfafmnyp14iq3xg4r84orpnsazagc2ltkndosede4t1h69230omvyvukb6di57dl46zo5o9g3bo9l0l4l8i0n7lb18bsdo7e8ax4dysyyfpg730w77v8ahm5otg02zkg',
                image: 'm7a3brxv5fx2p1kirjhqbtlzzd82gwq3n9d4ii92gh753p60x8piugoy40k8zjd41drvs44vlkq9qwh3mbld6edwt4pzesuduwmpjwsgvwqrc4waqonvhjwz054ua5rmrw493et1tfl2yq2hb10w24vlvw3k6olv1nbkvt5qoyygofwpovuiuzdv8fwtt80w8s5g8vob22y6pnazhj1jmlcmta3350l9acjwogjal7fktxgw50qglv1bg25crqlyc7r5lycipp159ly3mpc1k6a36718pl7g690x8yfqm18hw0zoscqp4v67lfn7a3lvru2hw47g2vxcx7qz1a1oacjautu0udog0pzd7x300jley073dtq6omr01wegukbj0ek79szcuax5vhwm51y8t67bvor9spbgcmq0nli6atisrzo5z2tsaa7d4wer5dfjl64hvaulc5mzmfoj848bwsla3ib2ybq4hp9ru0lhxmsbyi0lyhkcibow61935bnxb244en20iwttqvi8lcmyyzf02zjjke6nre2zzs31hbohi96o568igf52bp9hfb523xl1uhjv7qp7z9f57diq3c0vnz7kftdx3tdp8moschrul0jv9xavgjeskimfydarmtejsrtd6hjwtaqkmx5zprtxacz3atxqjrdqlzkz6imhlcc5sieo1yeqx1xx981ahtf9r3e131yiaoupuo5p0sfnpqc55g5m0nnjnovzeisr8y757vppc6i96iht5kx32b7ldo74shpry8c8h8feaszqi9czfxng2jqi007bv8naz5tx2krjxu1r9igez8hn66awiflcy060n5fbpzl0ik9f68jyrk91v0zpeyxwekosrc62bg3hhyr6s0qo68qgmrqirrm76jwuh4c9oy5hwzoq6b66kwrpjy4ve3xj7sl64su9ftz72mq9ff18f0r7l1vcgxvlmp5t029eszdcfumc9axrck4dhdmue9cjk2wqqqnqb7qqd2vs5hxmbnk5',
                sort: 136418,
                administrativeAreaLevel1: '7pcc7ce4urcs8q0g9hqvdgxwr693k97h3i906805d9ysyeeasg',
                administrativeAreaLevel2: 'knct8tb2vd6mr217vi6vgkon2yfh4f8a05s5aan1gfqdwzk4p5',
                administrativeAreaLevel3: 'yld0355ymdwk6zfp8j33rpe60b3k0qanzun1d202bg4bg7qc2r',
                administrativeAreas: { "foo" : "bar" },
                latitude: 23.58,
                longitude: 423.93,
                zoom: -9,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for CountryZoom must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    

    

    test(`/REST:POST admin/country`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'eb73fdfa-89b8-454a-b874-a82bb6b4577a',
                commonId: '22a619b7-6af3-4143-9b46-37995cb93a83',
                langId: 'dedfce4b-bb03-4b71-b06b-5a152d70943e',
                iso3166Alpha2: 'qi',
                iso3166Alpha3: '76z',
                iso3166Numeric: '5xf',
                customCode: '34q1losmwz',
                prefix: 'aspjw',
                name: '0uz8hi8g4hfr6up6z86jmv22th7r9psnp4gls9lsa2snwd26sdlbuj415sy1pi6m8dd4tcngpducqmmk54ad9cc2wgdgsstf92cvw6mlnzojz3r4mt1jiawck20ncaarmcala76zk3nr7epjtgbo535imxmscwy9ydf2fp01cytg2p1zbeusdkw73npuzpn2rccolrnfni14vghtsux2ugbz2ub7gjan0ydsu1vzot18islzu315bu9vcyazg6f',
                slug: 'g9h99v44i9381ypyw7pfyey9qojo3d3jr61vay5zcptjwj780c2kb7qlbt5r0aih6s4tglebknqpmpac7p7jnmfxyp69ur1cyjzr3abhhjz7x44d3e9unmwucrrgh9dcktq3iiifnap26uj6080wguahu76dkfkipr1iybaouxm4607i9b51nznfe6ypyb5ekearffeslgcq3ltryu55gkk58gm55isp56qhzwtr6bnttmjyfks26gh8pl5g61nwtd2webx5yggluy5ijjzyn383d24nvr3gblsjreilkpnrq9szuyjh9o9qyd03ua3q29b0ctcgu5lxnl9fmis237a55a8k76ff6yryzninj8u2h8mkk577w2jbflq1d4u5axiyt3rylqg76vczf6rt6owjgfbgswpb3vemi4b4tbop8f7doz4phylzvncsnw6vj02nc6aetqefv72b2gbm1pel47te4dmfrt7pity5js25m16507eltk2qgw65louvai6iqczfygvg3c4ewaj5i5m8mn6ohp71kru8acpbxd4pmau01h9l86fosyok0b9bq7lp2jm6whzq8q66fge84c0vqtac29ba90a183vycoyvltj4n78ssb7d2wpf5h8xw0jex7adtpo00ku24csk4frd76g0u3clpagvp51kvg41vqzx23jkvberxxn62hpo6l5ixkgar6820ybmy8iodd4y8hyppwl6vsftd8s7l7t56wuiq7c406bhbs0ud20fefuwwo4stk0hzrqs39bpiky2cke342d3ee2p0j7x0vhlh4oq48g44ljiyw4rrv9f2vbnlyqycc93mnr011rljtws9vgc5hrgbfkyer31pbsfsoz69kpizta0efp49r72al34e4yrm9jkkwbiedwhtqt9k8iqaaa2xuyy03iknyvoe41mrjwybw9ve4p6z73ht35nobmb2v3fsrxtih42rdywdzfem480k0iu6izvnjtng8cmwxirv4qkvy63vqyx',
                image: 'm6o2nb9dml1up7riv8e7o9vjpn44o2n3agiseooliq9ld9e7mss9y2bhifidx553gvuuqfmmf7pxt19ukcc6091rc04lgxbq4nc034yt97xc3omal01kay1gcssz923q8kzglacayewoqsh101f2qsug4p4bwr5v9iai3esc1bxz9n43klgj9sro58d4gdftk31pyv9ye60qztfswyhxp0rp7s0qrz9666mf0b6vnzjff6r8yc78fwojpwxn4s8vp5c4tf6cagujcm4mpnja6rejkwghho90xukmn654ip2sclurjzulpp43j43jssuebveql0i2kfm3ovez78hxqjkpaa2whi5s6jlrbn52bpe3hutrznpqa6tsfv2ca53ditmn6pfn7416mcwpcum398j0ys3qr003oycuyod47kl7pxtvify62fx10cqzl4pgwrrgl7y6dkuuh73z5bpw0198kmqyn16sntyhhqt9yiykvorefpa3zcolgbslurssjanytqjdrd3pbswfmxxpds1wykwa1tklxu8bzb2i4ak07ljq2o0fk8hey14e0u23lzvmfyf1cwivb1pv8thodneouwpwi909tvz2bxhiajfafzm8jqxv2681w0hi2cu7pi558jhoet5xi2i4jzvo8pr431vwzd858u7huhkeeg50r2l5yxmt8wpabhskgy7c3nhz19u9i8ka28elawpnwypjd3slzaxhslta3d79l88snu4c63epn20phlou4y6mahg7x17idkqk3br2c2lcbgn1d8orsu0kva9ddn9fmnhccap63frl1azdx6jy6n74w7t4ma1udqe9mnzz2h319mj36nm35rleibtgdsgsrb90icmrq7iks1tplx7zalpig5d24suyj7ojqf5f9sh7buk2chzuo4bfe3o09lmp4852nlmp2xafblwmwc9v17dvnw85azxcltan10knlamg91ar0lqcj19anq5wsmo5x0cba12wbwj8n6165395i3tx',
                sort: 754796,
                administrativeAreaLevel1: 't8ot12gj9m5rrjxdtn56jvs6acjyy58u913ftdzh5wdmw08it1',
                administrativeAreaLevel2: '5gc009hii9y19z69fvf4ombwt9jyrf0556obnx5760hnyedrub',
                administrativeAreaLevel3: '1pnncx3uu2rm7a46e3eubj9en89nh92fxltkeszmi1p7y5c1z3',
                administrativeAreas: { "foo" : "bar" },
                latitude: 425.77,
                longitude: 442.91,
                zoom: 63,
                dataLang: { "foo" : "bar" },
            })
            .expect(201);
    });

    test(`/REST:GET admin/countries/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/countries/paginate')
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

    test(`/REST:GET admin/country - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/country')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '04ca3c89-1ec7-4dfc-8f2f-616d44d8f106'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET admin/country`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/country')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'eb73fdfa-89b8-454a-b874-a82bb6b4577a'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'eb73fdfa-89b8-454a-b874-a82bb6b4577a'));
    });

    test(`/REST:GET admin/country/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/country/ef0f3087-7c0d-4b83-b779-cb9321ffa70b')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/country/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/country/eb73fdfa-89b8-454a-b874-a82bb6b4577a')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'eb73fdfa-89b8-454a-b874-a82bb6b4577a'));
    });

    test(`/REST:GET admin/countries`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/countries')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/country - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/country')
            .set('Accept', 'application/json')
            .send({
                
                id: '49231966-d282-4330-9444-6d846df67ecf',
                commonId: '9e011391-9413-48cf-a969-d24120b4141e',
                langId: 'b5d29cea-f464-4f2b-90bc-f3796773e18f',
                iso3166Alpha2: 'v6',
                iso3166Alpha3: 'bm2',
                iso3166Numeric: '0dr',
                customCode: 'i07qdp39ey',
                prefix: 'vbsj9',
                name: '44agpncmcufpizvhj7n6t586inmfjmyhv7c3bjgbu7c8l39qc9rvex8z08e1jm6pv4oee9qxxlltk841uqg7f11bb6t2ud0l1r7uik1xg89lmsvj15320dt1ejqj18523fq4m6m9rn47pqfs26g06xnpc6c8ciy7vjnljm8sbc5py75xga6drenp8xfcnoxltetym5k3q937fqk8xinl8tajaym40ujis59x342ot2l5yhh93eo4h1hue28thty',
                slug: '9stbqfeg1nfyeclghvfoq45wt7rrl6uwuepcourgsvx42nzdzx1gq68an34sa6dblgd6ftka4zi5411qd22mgl1at9plyhe9scm9fvgjccnpo4yrgaccq55lqekvr2paihf400jxsbhxcdnjvi51c6muetz68ptyhnmnad9dlckjijuzcmofi6327dslngsskntgpdg9vgdatqjg7i6q4nlqsqx1wfz1d795ht2f9gakzlmcg8zzy7l2dxipmijr2m53uemj7p8o0m04agaud9k1n3j2i6exm4tu33jy6ghlovqh5lj179cydl48zatesenuj2cbl07eq5eova4whej97neg1cv9nfkgops8k06t4osb2q08qk75kkn6i8zenpy1qr32t5nio85xku6nwgx3cdh3ah6ex9r9yrvxxivql7zefuzuex9a22y27r236oy4rukcs44jus1xhjzvs4zt8euqki3hi3ymstcmk07kxi85740jdf89n8de10c3d5q8vb84pv1yfdzochcpkkxw7kcie7p5v730zfjiq1jou5io9xm3un2nqzg45c4vjptdubb8mjes9j7po70v2bz3sumg1quueaigggtilvw1k9c848qabbiirkpfaadh7vpwe2htuvswi3hc92ewkb2rfjj7lvfn3veoav0idt966qi27rri64njudxzelnnuz1ejt3cmmr21468otekbxhuc4onr12fj7btwplb8idru7wcfq85o6utad4zmf1b63jloqhwhshg11ft9jtl1jv07ggwcjxbx84o3o4torofba0upuy8iv2cep8dhgkepzotps9lpjm3g0fkod1jiihgxvgfdiba8k9zjpfw96t7spf8174hnb0jpdbvt0o2c44d9gm90z1v9jwyvam1f8gxcv9xyz06bxv4p08afm2ajleuqu0yec3dwb0f5p3qmk9t9mxr04al32j89qf8nnrovdvt6v05n7cs4nyzq82h21nfbpemfcacucoulgv8',
                image: 'lidn10bspcvbdrkout85fk89txxdoe3dxofl4y9z1kgs0kmmmbs6eag6odxq6io3ba9klej5w9w31mmyd2ib9uije1pj39mckvhnza0174yk7hno03n6jnsorva524z2glzqd5fpezxpab04d8uye9jxyr021c55k54lu4j47uivyz7oxkbxoht6g3l99nmyi65gs729tio44qptzt5rsaj9anj19l6wvicinlicwnqzc862w0no9y1dxvj8thcsme9algkm6x4rg1y1qt7nf7w1cpz5unropf9ofqcssz8p67wiaqwuufrh1w5co7xvttqqngcuuqiq3n983hladymhpzk9t5jezgnqpwhlsupouse6gtyic7sco9ymmpxl00kqpozhppt2g3bxhdh5jdc4keayiw2dl6h08au745x0djds4k58l3sdrwim7qhb8q6f3hjsoew4mad6kayo6oedkoyi48kfoeacl2kxvv1ez7gegs9feq1kj4g399g3utr2drjbjwtcz18a9jv238jlv371s84bepmuyshb8xvll04z9sxd1rkq6m0uayrxdondx2yvjgz7fe7lqjgdrtreadersl8zsb0g1udv4ev2f6cmko0eq54ovg1vv33m3m1w1bwuvbu5vgnvab0e8nzd452zut5p4nqt0b5xqn8ve8pq7lchxdu5yvxuwe4ie7xfd52mx5h74ph39lfv35drvgkff91m637my7fcqxl0opkd4v1v2s5hi6448b95npwad5vo6p88hwkqei688l43q4slzih4s59ym0kp4e4046k1cds5hm7tnqlxasqufn54ww5cxj8vj37ppz9ju48d6afcc3z7yzfzzkmtwxakpndtjskxorecpbovqjudxq7ua1zsv2ey1dscjrz2g2debw5ybs4zsp0w6wymkcg7l2513msgaa1j1w6si8diefp8v3o9numu1po3eo4qip9zhk4c68z8omr1btvcv0xsephnve25fw7blrfd82wj',
                sort: 396512,
                administrativeAreaLevel1: '7aovgvahx83vdw7qbcvja5fx30nxiodg13hfk656fi2b6plbdp',
                administrativeAreaLevel2: 'ggu2j9hc8e55ulwf3ar0kyofef4i7uexz6jbvs2s2mpb73je5s',
                administrativeAreaLevel3: '16ji83mplmoe0c4d7caic3anifz9nkeynhdq6qm63zrl6bl8up',
                administrativeAreas: { "foo" : "bar" },
                latitude: 512.94,
                longitude: 283.44,
                zoom: 66,
                dataLang: { "foo" : "bar" },
            })
            .expect(404);
    });

    test(`/REST:PUT admin/country`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/country')
            .set('Accept', 'application/json')
            .send({
                
                id: 'eb73fdfa-89b8-454a-b874-a82bb6b4577a',
                commonId: '22a619b7-6af3-4143-9b46-37995cb93a83',
                langId: 'dedfce4b-bb03-4b71-b06b-5a152d70943e',
                iso3166Alpha2: 'e2',
                iso3166Alpha3: 'yni',
                iso3166Numeric: 'rz7',
                customCode: 'e2np3ncte7',
                prefix: 't8q4p',
                name: '3wdng0rdwexvhf4qzwco1rdqyiue394399kvm7tcf4cs1x1osefy75zfw8evgfpawthesutzqny3klhrt79e4aw1dy6z3yb6zqv7iap0l9ys2p56dji0jgte4uzwrovvi3azsqfmjfacd9et85t15p2px1fa76t3anfwtmjblus02ogn9hqlgdp32h92mscaj6aapb1jd78s3uya6w52imdzq3tkn8glw72juc975a8onjmmkogo01b1wewiqr9',
                slug: 'zukyf9gjq3vqz23mtsqyi0o7xandjk1jgqvn8fwgc3zpjq620nbxf51vlijdvtxnjyqcp13aorblcyht8tbjp5212cbxaowctgtrh3uggfg3inufy81n73fmpdftcu27d4q2u7ht1i66c2gpxq9dvl0xw9bnaskhldh66wheutohe4bqak3anmnrvcv9rbbxyjv7pl4u1v6sswfu8q4mdnzu4pdyz4pdydh5xtn4zo8kmgv52g587mudxbqg8nrlyei3buftymp0jf7wwumkbrqg51nabddh23pv7qruehs54h8fawcfomvrydu4ahowk1u920obo86qq1ibeg7st8tlwlqk0ed4xpqdo2wmzuiimcz0uzihwrrzfaskljgj1lc69mer8kqcrqwg6ek78sdvscwkjzqvr7tqhilz3tche23yhwx13l893s21241b680ewzx4a69cv4jqfkk9u7a2td7fsiyxbtzcukmaqz8rped7ng4pnmwbd1778qmgakl060dokr6tb4rzwcq6eanirl1kz4h5214h8w23z2sm2lhq5ekjxmnz24d7xq0613tdh2a1hqr1ihd42zg1lqoqqpbazd5lggovoug74hwo2ue05zgytsz034fzi42lvyoiofgjifppuqbu7aqt2g6yrkc0t521te7ml1eqisaafr329kg912zz2hzfnzumy1nj8fa51dfqu0re5pe4bhud19sbxykxm7uloa3rzv9yf7jtcu4fx19ud24v2yvu2mkieugw7gooam266lgwr2haegfvfrzlk2nx494n3ampfoxhbqp8tuuys5b1q2aqfkikmy1ht5814ypwvr934hfx3kbrkq74hr3tfd7w6l27twgvslegwolp30kndvh9uhn2xogpx3gxcacf2pn6c57s1xijuz2y1wpi3i6hsjqtb1zu2imfzoz40hq0ieptgoo2s6wbiq2oau6i0tltu5nfu7kr7lqxq6s9nnwpbnkm1p426avwrffdyg1rejtu',
                image: '26049hghycnu4oeapyofoy1samzxy46filfpzlqur1biya78w40b5rra93o5adsu27njqhdgtz5talxzeyc1qbjhqkpriv8u7yqfjsg1ksdcsl893d78wdvmeqia99i9smoaqt3sjdvj7cz6s7h7gr76f0gb71tgwy8yqravssjkv4xlwa19k013ctk4bzxlg58q4dzavwyopg7jqzj49m88ymn4mw2k0kbbpgeciymibj933e0o8b1dqof4edandi4mxhowlyzvpfwp7bnvdbaee9dav8f4a3slalj9lqtbklcsf8n1bxwc6a17nyin809cgyjcxbe665sc260yesb6z88uqz6iflwko4b8rmlyyu5qdg2aluhblcynt9rprs9yk7uk1b6yzt1ishfl9rgpnsnxekkz9ad5ygw1zlk1h7g05b4539jqwgkn665cy0yceuw6jay6uic8aqjq0kwqiuuqn72x3jisz5vlx67vfeegbkkntz9kbs27z93bd8pbeyqcqr6xb5u4l38rsqozlaiwoexnsfhs6nsng4wk337tzzlmav4i1hovih4cct14d1nkxnw4sjsq0ihq8742boz9ekf2fbq6j0wjcad48339om9g4eaio9tj9p1l3l8wpx7obo9bvvj9l774ybpaye95297ooqu9ms85cykwcp262h0cgdhbgpj5u4l449312w1xzpgbkxyekv8pvxloqf767bjqry25vkocne6gmwxcwc0w4m1zyctfwnfjb3kh2b71kisdj385zp8c6ka4r9g6ak2lsh5nc2wpkt659takd5dyvww7etbms0yqslk5qhxhg2o5zrs5bf1ab5xze60s5ilvuea4a5eo7eq6gb8toynu557ao1fylabam9agh4xh6h6z7um5u126ir85zozj4t4u7m28ue4rfuja91c45xx4ry832l8y5iegwegnm8vuvni8a760mi0uwhkhlxkbje7e6vkt50us7qdmdi3vajv2nka90cx5pfdl',
                sort: 987839,
                administrativeAreaLevel1: '858nxz0sn9kfp4gum2yzr4r6jb9pfk9t06iyc4mdiqejnz3hlt',
                administrativeAreaLevel2: 'jq4wfsvf90sqmo25f5dl1x00crlkxthftvgidhr9lsjct3y9bq',
                administrativeAreaLevel3: 'p7tfr76z6laiwu2znhxbwlovht9zo5jrz6joxqc33krocb5qol',
                administrativeAreas: { "foo" : "bar" },
                latitude: 96.03,
                longitude: 697.56,
                zoom: 62,
                dataLang: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'eb73fdfa-89b8-454a-b874-a82bb6b4577a'));
    });

    test(`/REST:DELETE admin/country/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/country/ff9a2d0e-093e-43f3-b207-2f197aaec458')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/country/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/country/eb73fdfa-89b8-454a-b874-a82bb6b4577a')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreateCountry - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateCountryInput!)
                    {
                        adminCreateCountry (payload:$payload)
                        {   
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
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

    test(`/GraphQL adminCreateCountry`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateCountryInput!)
                    {
                        adminCreateCountry (payload:$payload)
                        {   
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'b81aefae-e4ef-47f0-ac70-c0149fee4998',
                        commonId: '22a619b7-6af3-4143-9b46-37995cb93a83',
                        langId: 'dedfce4b-bb03-4b71-b06b-5a152d70943e',
                        iso3166Alpha2: '4u',
                        iso3166Alpha3: 'vkz',
                        iso3166Numeric: '9bn',
                        customCode: 'n1zhrc5gq2',
                        prefix: 'epjrl',
                        name: '0bcrfwty9denl0kec7vorbpdqd1vpdybshmzywiy28dcz8xjk3st3g49e1b5uun1h6vomyoamhcpxedabs042cpepn4qdozrv2veiqdy5ia0r6zgpayahrwvhv5os28fwmrva41uyzs8v7no6ncxr7qzqct4j4dh5o93q86152cfivktinqgz5p87pknww22b8qsm45iqblncunk184nrz0rm5nsu8afhjyq02wcg5jsw8wbch1nw2yzvpxz9uk',
                        slug: 'w8cqpi99uy9eh4nmaumnrhsyc0g86jhogmdj3ej0itj12o1n6m71bdno7vmmbokzzv0msobwlmv99eutm3lraxlp27dnid3p4i8bbd1vcgp1k39ih0exehwf5852ezzgojx950wcnx3czair3y01x4ur2oirt78uefy47lu2ygwkil5ck0jy7r6jr7o8b82efcjo3qjy9ry27k2eoeac0ov9pd4ejauxfx9032z6c64rpz3h63xcm0kahl7kemklkw3juzbmaqt8z9vngv1z78pshf7nosoxa6nr6kkmibp3an9wvxbpxpe56lp8osyzohyzffip7fnr33tzt652w9by9lsd1zn0qqnjs8p2j00l6mg8dpjo6nxdio5c1qvdvz6fo7j6fxiv5bhodio8zxecrngqx26j8d5uzi6iqnx64y66svgs9qs1gapa3ndicxplet0hrd4xppa85h15gi5nkstuac503su6dlqy57ssn2yzdcje5drioqs4v8nm0t7c2gglxycam4km34r8w3q9pzszwaiewxjc4i7hc7sxjbv55u2bmd3iow7y9hvcvirax66pejhqc6dx6cpyz0576xl0cnfmyy0wzdffudamj3l6wg1z1ufqowp8uh2sfh1n1rms0goutgysyfhhlq16e35cy8b20y28c749iuch44qj19xb18i3td87cnswdw87cvztqe9ut7atm5xsv9hhudu4qgrq5ec4r52xav8odba9mlesixiscdf1sxhwyjyouit1qenjdg34j3465pahr9fnj8nqpazpjwzwuizag9tktjl4r2gk543g4pr530slneruuemmen3rt2075jl85mhdexyo488pabgpf5l7mj9u0o98r0k5ejhf12jv599pl9b2j0x339epji77ifrhgrseke9ttmcmxynbecrz6aljdgecyfqr17nlv2upealjd5h6ejngeyfexgqc0kvjylupqbsbhqcy4p2yuh9a9oq3bj87duu1szxo6ov8',
                        image: 'nn5vn2c9ic379y1ko3a0fk8x1awjkjzmm6cevz0goy521gv7ly7x8rwk32usxo5mk62evel6rdtleev00v5mixry1t7845m5s9p95bi59nug4476ri4e6pc4t6b323i7t5lrfrm8lu15ofjnu7nc65ssf8myvsw4bzdvfuu6624imcflyptqj20talvap5io84qefh45kmxspw43qum0kyoe0ex6uv0ef7779mtb4hre3t0ptzcyao6jkfxwi0tvle6gwgeuby7839rvummm596b6qcsyefuh5u9q4m5jyu68rpabh2fm4ifmb38igmrs2xut5d8ggpc9hnix4z0vtpaxwxi7bghd1mgq73nl8wd5buvwuwl7nlmif35js6jq25u6yiopldjs9afgr67520bukgfpfzbry0ahr1v42nn13ezps45e96nnewpmntvihl1wpup7z7rgpcet7sk4an55ljhvsvwcyv5tfk0ffivvaq1tsqdddmnqnyeu2xb7qznjpqjkgk685jox09vhlevbb4yxuiga829bkzca8qhxuh1tvmd5tnumz7c5juwmbgb345og00zg9b10n75po22zw5abti0pikubhclri0b2i6nmvpewo6iw2lzdpu2bmwhwqhszhy33u5nx2qogzkipbb6qd6b1wx5kuf8pb4ckmz2j0pifedutylekjhd8gs7zulq9tyll5w906cnkrxob1h0324tbp0x3rqvkqitas8ser51g51qjrqr7j4m76adyed6q4lxrz00cztmniyc2e10y2p9mft7a5p541zju8o9e3hxtepdptx58sax7cz093l4ulb256qut68poyw3mc1grnwtoylgramf6o7hqyg0upg4cmjzi693k1ff565338zqv9f3w3b9wiaqcidzkzqj2r106p5v3bw7o5lcqyin64iixplngzfj5v2wu4dhbd0nt39kt6tsxprc8y3h59vas4jguspc6s4njra7as3b5da3q9g04tvrpabo',
                        sort: 272352,
                        administrativeAreaLevel1: 'ttddobvq099g433ipyusqe4esncqk960ltedsnst1m904isdu6',
                        administrativeAreaLevel2: 'ampur8421xhebatnxdwksn2edr6iu5gp16zlt0rd6snfl5c1jo',
                        administrativeAreaLevel3: 's44yw3n9om65kqs591juv2ewhftwxskgval87e6w17xiebd94r',
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 382.17,
                        longitude: 61.60,
                        zoom: 47,
                        dataLang: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateCountry).toHaveProperty('id', 'b81aefae-e4ef-47f0-ac70-c0149fee4998');
            });
    });

    test(`/GraphQL adminPaginateCountries`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateCountries (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateCountries.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateCountries.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateCountries.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminFindCountry - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindCountry (query:$query)
                        {   
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
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
                            id: '27104c70-7eda-4640-bf6e-cf40ec3b722f'
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

    test(`/GraphQL adminFindCountry`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindCountry (query:$query)
                        {   
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
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
                            id: 'eb73fdfa-89b8-454a-b874-a82bb6b4577a'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindCountry.id).toStrictEqual('eb73fdfa-89b8-454a-b874-a82bb6b4577a');
            });
    });

    test(`/GraphQL adminFindCountryById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindCountryById (id:$id)
                        {   
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '10d8d4f7-72dc-4aa3-ab57-c4020d12040c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindCountryById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindCountryById (id:$id)
                        {   
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'eb73fdfa-89b8-454a-b874-a82bb6b4577a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindCountryById.id).toStrictEqual('eb73fdfa-89b8-454a-b874-a82bb6b4577a');
            });
    });

    test(`/GraphQL adminGetCountries`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetCountries (query:$query)
                        {   
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.adminGetCountries.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateCountry - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateCountryInput!)
                    {
                        adminUpdateCountry (payload:$payload)
                        {   
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '1c6c461c-7eaf-443f-90f4-9b56eea8cc3f',
                        commonId: 'f02fcbba-8ef4-441f-a179-1a22b2442572',
                        langId: 'f532b25b-0880-4f31-ad10-862bf4960ee7',
                        iso3166Alpha2: 'm1',
                        iso3166Alpha3: 'cn3',
                        iso3166Numeric: 'px9',
                        customCode: 'u7scmw8hk8',
                        prefix: 'kq7oj',
                        name: 'prbiaaecfmxttp0wqhmz8dtgc2g63twqcobi0wpp4clytekt518690qdd5eiw5ur8rdmbyrntck4ec7ebwekim47yzh82p8u70l9udq9on8hooqe12a3xkwt5n5etc17mncor6z4ni27zbfd5rxi3my3g4nqjhmlshus45871wzu9ogptp8ajt7efryq1nsa3zy6xl4zo6i90sqnkeilb21cidfj1aq2gezu0o8beplce2icwa61o0qu2oay533',
                        slug: '4b9cm9549wvu2lwcp13k9x4izubc8wp9g752vzl94d0zilgvko6aea90w6q7ri0x54edlhc36cy2qikhjqgtilnclqdx168vizb7fbbplvgdxtesrwdtta9kzcmhsfybwpcn4pcbpj4s7car9xn0jiku8gj2hqu2l9i6kw6n6r0845chj6bd6xo0kp83uew8dy97f8qt5lnzb3b1b7ofa5990f5ed69y2my3t9vo8h8dgddhh8kxkrg1su3dvrbz8bltgp3aomnob36caxdpdk66sene99o92jmiv7vd9201zggz77uonghlcf7fknatlla9vngw4lx9ydqtn46dlqq1nv9irgepeyt36ckc3kzegi0kqn5h4xwfbe7idxm7fo9j01e0ulpe64bdkeri18qp80qxwxz81n51gfvlb66uyaxh9uce2plhnja3qqwhlcec4ezkw8ppt96x84q9oopq3qi9rd3wx15xikfah8k2w256eunibk7u1maisbve4ube9bbbl85qn4xer4h75nba6s2w3ptwsywbj9zmjm6qnehazutogl6r7rjnvrrhm3ssucj7psdgwvainhyvlwcfd4c60golrkhhc86b955lwqbramgncujyp9q0cf70fzfh3tes1whzv9su9ae1ioystwal53du11nv2ldkzcfgh1vf5mqrqjym3hwugu4rure513hg72z3mxbnnu35ka4z4tfa7jd4pvkbe4yyv1k678pc9dceu7pg2f6le7lyr8a8vkixb2txzei7g1p1figdw74bnqxm5aysb486vusec13xu7ii7r0x59qjtj1d8ou0ld2txduet401u854c8y92msunt6pjeg8n7goitmt5c7vd7tq7khr518ag5v7a8tgjowbgplzyhjyrm843dajnbl0cni1ax0b80lhyup11w83h56dg9pnp76fplgp8njynj4jlrt84kgsypd88iexv3bv2q8xifv1xvdhogcmbmvr7l4gq3lp0k4hvwh6',
                        image: 'o7wjirirhgzsda6hhnxqcvc5pbrctgu72spaml12o23skbelp8ala953z88ug83kf0jgcuh25o8ajmx3u8lccqfljkmypcchrzxd6dvq8wfhi3rmqv85gwuc86bv7rhi4aqi47o5g8xgjv4uomt1zd1pmojj992pbwkewtu1z3su8dkn69ih7yvaxpwsyzqj5t89x6hyf9hx2l7m2awfsoi80etinf0x5rmrgno4ya0bkqq77udt3z9u6bsesas6sclah1spd21ci7x34yq4s08qiyatj1cyib90pbz1prwbw5urizrmrn2f63eo9dsdt8wzyefsl656see9n9wld4firg91pxf9tx82m9opncflsv8k2wu1pd1uix78w9lnsjiw3yz1jat5d9yuf3lm7qh77c3ufreyx9piseynuta8oqhri5d9a5m0bd28eld0mh0l2vklzcayb5cl1htgdoizyqm4jia99k26sub1txhec031qgm0idotavm0hfefsixafyqynbf3sooxhgwt3d42bbwqbblp1mak3yn0p7jfbd4yn02f1hinf0p8n96ewdndzj7cxp5025prl1msm8lvyeu7f8hlfbu3ahgfkijt1uwzmr0s1tv0id22brruqrz9z3y568bpq1wjp34zoskofrmbreu1knnd26h65taru0p91yh2qm0mnvrmcwoke23yu10l8a5i6n7amgyfce9dl09h8q6i2ehc4rladwhhgww8oafdwgzrirovpe4t3iboup4837iv84y0dnab5dqb2ym2j61jewa3vti3ppyahpvq61zed7jblkk87980g5rua9i0iidcw18dyohuhzjx1zyetk5y9zomif30woathppjpjb8a17xn74mp9ltgl22krf0zab1xlu67b4e18wo8n5o9c6asdwin43hk2qgldun51elrqwx6flvz7dhzdcofkmwpw9baja0u65lr7v2ssrzdfcd6gziv4y9zambb47r4d4uk3l7bogod290',
                        sort: 969708,
                        administrativeAreaLevel1: '7tol8b8ov42tegpdjnrdpn8qhqlnk8ucefwg4mh7ge9gz0uubi',
                        administrativeAreaLevel2: 'cacwv9fsoc4o74vkoke2eoumb8um8o9zts293i87vsny5m9seo',
                        administrativeAreaLevel3: '7dn6g7l7z2sj19sfgom0iwn6az873g1u2i5mvgcntloxemy49g',
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 727.16,
                        longitude: 646.91,
                        zoom: 92,
                        dataLang: { "foo" : "bar" },
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

    test(`/GraphQL adminUpdateCountry`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateCountryInput!)
                    {
                        adminUpdateCountry (payload:$payload)
                        {   
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'eb73fdfa-89b8-454a-b874-a82bb6b4577a',
                        commonId: '22a619b7-6af3-4143-9b46-37995cb93a83',
                        langId: 'dedfce4b-bb03-4b71-b06b-5a152d70943e',
                        iso3166Alpha2: '10',
                        iso3166Alpha3: 'j3i',
                        iso3166Numeric: 'kvq',
                        customCode: 'oifom3nus8',
                        prefix: '1bdif',
                        name: 'cac5cwf46k349wofozyuf85mrejipo7y93n04nzh2qo91j5n9xp1o3ehtvu30gfkqu5mtg3ghqrftmtw0ryge2rud0azluu7gz00jr8s35vae7vklltrzzvjuff9e09lvu9442h36f2s05gd4tasmnvyni26hp3zw65n04npn2arc6uiigid9ga8aog51ww1tqlg53789cuvxp7i11kz6iji7vbg32juiyzfn8c1ktbz50hbg13dnljma6diajp',
                        slug: '7xkhc9sjxyru47ir9yffbppkiml4h0ghvrjy0wh31u6td07zhfgygtn61yvvqe9accf1e73xl1c3n0kb0grgk0ufr1n4j2o6yeyj6usn52qr8i7h0cz4ay6e8ujymsolh5fkqn8o7g7bdestw5d4dcvbtwruj5ktgf36lyaaoc0s4b8lwyhdb85d6ks83yghbdexz7ukxuhxtg3rgce362alxdzjjpaeog24z7xfyv348neobtjvr53a7xo5y2ez3maqjq0h5wysxi6xk5jx4nhxkpzvtgnrmagp9od5ovldggibb65x2i9281ts9no2mg0ewg88kg2ktxea6eqhgkoxy2t9l8hmpy9setdh7c4vov5fc5k9i5m178l0u715bhslf9puqm57fchh7sty0uwxxm4f326alqiunx2hn3yrrlq5ku6n0sxzurls1h0ivg5svpbglc3zp0qiqktgc7yqdtebhnqcldfpqxc7fbk3tei338j90m6i8a4cmdevonpdydwp1jpj0f6f905vdj1gjwflyuemj61u5ldtutq95y7jam0ijtrqpp0vphdt7ee9a3m6dhurcr3m0e3q3kn483vay3n2xthe5uk7olzj7emqsshdwpgo41qkx3jjyfxyhkn61wco5johuq7uyjo1jgzvsnhyqn5k9hmz30js5oa44ps4mo5ky2qle4gxw6ofktxbzhygpy2z27wve63hf39wc7freit1al2xwf79f05pu7dd9o4bni3ggpaw00ff7ezfp92dvwrhbz7vvwtkma5ii8wdeps35o0p3gf3u8n9a45bhn4najz0pood4rjid05op0v516n3qrdxvzea64xv2v8ibzg7qzruf3fuy9qa9ceo10gphfa6ugorid5pooqhkoxddzhhu79cs7pg3i7pcizbc770yc5jyrhdg2av2njcli9muk9z0bl5yy1wb18lpgbmh3jru0d0nd0y6ytgw2h5pmvtnpfcyarhpmtg80zr2mihdg44e6nc',
                        image: 'zh6a7q5s5taaquv7921jovg51kb6l74afj7r940ep60xiny42pq9q2n9ydl8zv9v74s2u84zn5nqzkzoggn7l06ghcq6zjirls9f5iid7rj8pn21oehb4ywv5xpjntj3qfwhgint50ipqadw9odg698t826k6t9l2xrx9bawcgaku7zpdeajfszu4c6kvj9zqrr3qo57psiw9m0fisndmlkgsxi5gcgqfpqo2qna5b5mw6v6ir3ip3a1ehi4g5xugraqtn24wj5moj4n3br53n9qnu8wu708vpf9zjeg5k8rgptamrc954yqmpi8jxhcz0kto8nw4t1fobeyiprxv3lnpv0r7rf38z6wzksojd7xsrakbv9m9yoq911d1knmnt22rrlgz589w1m0r2apdn0n1qmpbwnv3y5qnpyrinrqqk3aef3ye1dg3fmjli78ok11jzkuw8owf1q8020ytvv3nbaer8iks0yg6p2i3dza267upcun6ojovwi8cctnerqtubdzxbecmiyfde6otz4w0wezzbbk9rcbka718g6uplutaaieqjirr03h9cmrdlab8hlsenimrg5eqb3zmkgz6dny1z09kssu8w362ydr83bxed63aaqb2lz7u33pbd8m8w7e8b6gzby9iy9k77isv2rc17kgy5ceqixe176u0fr3hqu9faqrgm44kcxnks2iygihzud10aqjv4o99lqnyo4w8qtnq3jn41mv2tpu09b3j9bd4fh6kxtadv287e5pkjxygxh75p74ga3v0lh11gog1c87hxjlvietz4y6vl53uqyspkqfni7mpuf0vjd1xxm20hqse6ufrdwus3zjunodqc2e2ysgqi5vxaqtsgapqld459uudirixl04mibdfuj5aldgzd63qowfygmikjpz8kfztbzar4tgok3bs1h5bnpur944kg29mwfbwnlnxck092m1n5dmv3drd9ag6xweds9jfd4mcsa1b3n01c3ckw447lngbh6fzf6e',
                        sort: 325802,
                        administrativeAreaLevel1: 'wvjbovgm8r6buq8imthox2dipmp0jm4n4pcix40m6qpyef8mts',
                        administrativeAreaLevel2: '7n15lck83ndnr6wzmbkl37mapc9ck3dm0y08mf89btjcatmjw3',
                        administrativeAreaLevel3: 'ryz8wa6dapv45r9biutw4j335toycjlgswjwlzhox8eimbe4qs',
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 506.14,
                        longitude: 126.07,
                        zoom: 60,
                        dataLang: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateCountry.id).toStrictEqual('eb73fdfa-89b8-454a-b874-a82bb6b4577a');
            });
    });

    test(`/GraphQL adminDeleteCountryById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteCountryById (id:$id)
                        {   
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'cdc0cf91-1876-4876-9336-78b2605575c2'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteCountryById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteCountryById (id:$id)
                        {   
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'eb73fdfa-89b8-454a-b874-a82bb6b4577a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteCountryById.id).toStrictEqual('eb73fdfa-89b8-454a-b874-a82bb6b4577a');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});