import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IClientRepository } from '@hades/o-auth/client/domain/client.repository';
import { MockClientRepository } from '@hades/o-auth/client/infrastructure/mock/mock-client.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { OAuthModule } from './../../../src/apps/o-auth/o-auth.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('client', () => 
{
    let app: INestApplication;
    let repository: MockClientRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    OAuthModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IClientRepository)
            .useClass(MockClientRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockClientRepository>module.get<IClientRepository>(IClientRepository);

        await app.init();
    });

    test(`/REST:POST o-auth/client - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: null,
                grantType: 'CLIENT_CREDENTIALS',
                name: 'odl53teuh8ttn313qycdre52xj6i48vf9c1eumipreilz52yrz0f78odcjzq0l3hy08tu0ger6o1i57xruhkfafopk6n6q7mtql16a7v797wl02a26zfczvq4czqv656jeyhkd8c2uz3q305r8i48cznc8lcmdagbx4f84q4gvf4oahhyaaxvzopaymm9y24k0bw3qd1fr9dtfgzjmma39gnrw49fiwualkj1i0c45nc2ftojml9n8oo1z80tcw',
                secret: '59kg5uz52j1tj2ao8dfdfha4wij2uwu0ep57ozja4c7cepqgafq1rk6scljltul20gxasmrjw48th9w0kii5to3q7s',
                authUrl: 'i9a8jjosg9yljmbw7v7cnix7h3dg3o0sr0qmtspd5pshfvkt15ykf852pwwdhxdpt9csyucg3how116sk39188gzm1k21oka717jhqmjya8p9dfiemy1a3q5usailx6gyv1lvblc35v39n2dt4t14fre28l3sbyhkcrew8txv2ll2s5bzjnr7ql1ef8o5ovi5x2epapu4hdphje3ai9dtywar4iccwhyjvynor9rc06ityq6n0dmt3y6pi96srkqp6axlgwg1fg6vqnmlnlcbub2f7z93njw0i6v6mzjzfbg137o3ihxrt5f3xwj37opjj1rwpphcz8mxcbi9de0g10obqa8fzsvnvfl9f1zs1r8cvsuwsahy2u9kg2r4c3b46hpnr2scnrqpgemo4crnd40btkskhvvb37x5iqa6wnhg17az4sajs3oeuhn1wiuk1g5dako5pp5fiu36hdqlp04ykxa015rjzt391r1992phki32s87s9ubrnwtl4jqfywjkpv8t8kahj86a117y81wjhi25hds7u57n9wpcf378v9g5l3v78lcxbw2n69tsxob3rzt6ba81nebsk5h16dh65lopibw0rxl0v5ighhp7pc5rd4wdbk1untm9if7zw6ougxhu4f7843fu7dv0zsvgekoyczq1zbdfhwd3b5u5psq925di741nws7lv2al7ywl207n4449nw5z2kcje416t3dmw80z9ndcjcyhsazy2l9bh3j3ey72jquip95y8h4gdt1y0uk8ent6fjkepdrn2tic0v9t0fdf672zruzp02fypc7q89rpjm6ef7edvnhcxeu0iclr13rbxnb12tj6rdnc2c6d09tocv8co5ek836k713u1t5aoke7g0d6sokcqyjto9fyyj6x9ryutpna9gv0lfbj4isxjug7q1wf0bwr9487ahb7atnwum6ksyb8c5xdkl2hmk9lfe07ye55ww6hxfhfqdmkswngzqhuvsdy9f6k9866tu28j9uul15kb9870aj6x722m7x0hgoq9z9j0y37qytu9d7yjp4dk2c4ojb5yqo65inse0rtwzt1d34oyp2j5gwc6njwlq91mwduhe5f49k0imx9s1c0nyaa1o7n4nm463m1dcvy4k4c8loby7ak7vex72cdy8i6z88ebrbo25x3t5mmszxwub0he9qztp4vfi8kf1n84dhp57uvgrpl2o3j6x90mfncdsbzhdsdrhx7s6cr3fu7siog8uqmgwvkqtjjxtuxp6ke96bjcvfvk8svsj6ccefqrifa8fhnkep6g7sk3msbb5cutgjch09v20lk1qsneaqmvq4v2lzg8g18xxa4hcsuth8jcitszpig5odw46hhnezylmyoxmriv51eewqz4esbu962i3xdej2zh4kaatorytfyfz3cuqxyq8m3z6trr7mqchae0rk0sojj3r2js5x59tffnrnfayp79emfkzhfy5lbg193btq0e8kujv1zng2zfq9z5vailo4qa7nrlvzmg5qdmhp33u8abhrfamm1rvj0e9qoan0lsltzdfoktfza9kym5u8p3g2fvecuti0bbpks37afgz7fiilz9fm0bbqt9m917j37w2cmuld0thxi65blx99ldk9g0dn9u2oas7zduznj76bt6ptrwm8aahtoy5ohbn24jmnsu765ce3xfed409twf50mth6ae8hodseeuz24xc5frn22j58lsdc8gc6c5ojswufxpovnxq96fs5xx0wetnnh31cbsqfp6utp917abukl3rlv09i5rpvrez51f50vjqxxnax0xkcbgob0f5d9zaw1tzusgk1r5tagrceaq142pnxp8uoae7agmow0chp04lhz18l7z213tfy849bq3r1008emroyffogd6t2gwxxevkwdyb8tli5wzxf637qzhj28i484zycu97jwavp6koosc82issyu3wojxueovjzwml6l4hosnq01kqz6fbjdkd1onecaxls8vygg1rc3wdkwthr',
                redirect: '73yd8l2zz8eopqmw77cdlzyzf1pta41ummwsttmuuffsj966i799d8rtnyszbn2w27bxao0qbvcpk98swg0bdjw0nsuxd8swmhbg0mit2coua3s9ucbl25vmou84ca53vb0c5p7v3wufdl1fh195rnvg804etu91bxhejye2yb1sg1fxtyyhhwj9or9psuumi0g6sgpwfpefm875lx8tq7h5nitkdqzgdx9v1wrk8ksr9mmyied6h89gxmgrqtjahss3bta6bu2vj0b8vz9tvb6z1dy1se0t3kvvmpj3teeeccj9zk5x2fj1v9h0v1k7z9mn76df6qi0lghxbj4a80xgk8ebvw6rcom974993t04cu1gdci5i8eqvnf55ho79o1auc4m8szw710uds5gtdaqcnj5vp4eu306n1eh6u1tqfom3cvrs6rrb6rwvxo4nmv9s9xxs62iww2swfvedfiwntc2y0dectw2647ogzck5baewopoheygnqe820q0qrf2wgbntmxshf5s4dgfjzz3rgmqpx4w9cnhqdip4wwa2ji4o9sojys5nmxlyirez5mlgh0x8np098pgh9b1n490vl7r4jsi39eb60fyi88rzy1tgmstod23p5n8tttvhdzmry6iwtdyesomvdmgkxl68yncq158x270svmk62oy4t26yjkj19h3mrzpxw2x98jqf5t2ncgi03kiyorivofs6m2enso38acys8szimxkre7rukldlx5gul80yvabkhqssfxtuzmp9vgefft5v5x62jmhxp5tbvmwm4nhdp8g1y25kivdtzyvap8ffseovy03hmh8avmbdq8npr7mklbw27btqgqpe8qn45sz1nk27drsconpzm8sc8l1qmpkpxmefnuy8yguv6asqivruxsbugxwt987f4cjtlft6sc7wrt77sfu3kuj936cekj54knpar1zg9ipj2dqx9pezclz2qcux71cx6s5qo7jyuoqqxieujtusgv8mv10pc00gx2qlvmx6rajigavh2qknm1fkvg0kjvv08dazpgpdy6njdqr83s0axykjrkpk7fpt8g3lfpy9w8juywbnuob3whk8kgky33yfd5pgr36rows7ugj76sqtsrdpz9hd1oukuck4wmufmpovllwlg16wgc5vvkyy2rwli1bgbhlhlw0eavpcxwecy14usw9ttamiotiex15ys5ot0feek3hzwj8q6s2bpv5pntzhekhzwl9qlok7yb1r5ro4pt5vnqwaijkt3ho3far7u0snn6ih85x0r3gdf1wtj1dwy4ou9pnfyg9en5l7c0at22gsm1dbtls1xyrp4lxwi1f8dv6qvlpvvs64nl4cqms117hgcnh3ls316xqjthlrojinct011q155e0yyeahqe5n3clds8y9hv5u0ek2o0gjqssm69oi4pbuho3iq5aktorhcptcuzgm4j50c9mehxnz6ht6214bhyc3lon3eosrf0kfwzrxjdbe7hsar7prinzd8egnx0a70ds2h4hnvdw7a68yc0bj915qpf5j75qg30lfgqopqjodxlfhzabhwv730o3k1l6j54f2guj276o3koe0oz913a83mkuu1bth1ix0vulmtjats5y431l639lkgpvzwx6o72um6o2k34m8p4q4cib4j22ue2mv8e5pxaljz4qtyj8b0c6s6llxjzalke44ainlgmnvh7dzxj5kilbamqmejlbmtgq4yix0mc563lxula0u7j0f96ffxsmpk151xptwsilzvv1n683g8i00soe9fbmsoefv7m4veo7dpoyf4y8jm4v4yi1znj767jotj2az7dfepaczu2jkxyfnnomp68fbdh15kf2vhs9xceuujus7h02p120ru402etv4jsttu8ou8r27s0wqjsjh80bqnq1h21cgmevzlzwnvgylsjt08ql9dhx5yzbvflnbp6gq3ceqvxnloogvbt0f249b550yq4jlb8sxkkpjx9637v944azqz5kdss1a2e9',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 6464495850,
                expiredRefreshToken: 8847435105,
                isRevoked: false,
                isMaster: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientId must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                
                grantType: 'AUTHORIZATION_CODE',
                name: 'mtbikgc2xp43uq4yqizjuicxi8iur8yfezh29dbg3srool8g5dgg3j0etqwzd594zklrtadf3rcnbhydr59iac9d0u5fp4w34uu6yf2g3qlrzr1j62tunptz3pcfrm7n59yzd2g8q6htkt4sa8zfy6msd41tudrh1rkebuu1b8da1ztu2avpbyaj8z0fs1moup6o543efvysb6e5u5kusi1e3lm5p9usbh6guz5hvxhck8pjx83n82oo4xly483',
                secret: 'xsidqqs057mfmih8pf43q275cv4m3ydy4ry643ldlc6uh56f2i22fi4dzq3zypefpt0o3qhpnozjtfpei04sormo1s',
                authUrl: '5f2xe859r07hcdkyytbwd4ka6r6c94eyqavgrxd8cjpozpa6p5t8hznd3j3m36ys6dr1ck3j2m478eeybtq8s8vdjawosdouojrvkqp1jdhjg1x2zu1owqj9h4vfuw4xh4hfy0ivka6gvptwgfj2gczmhsmwg0e524o0a4xku7fxnjxte26hnu7r2yw1tomcmfist3176c7daotk7mugnowirdk3bpna4asvw2d8u18itqqs8o97gflpcl418b3j6ts5b4jp97ataiojobedssb6aqb54il13b0nxqvi16psijywb0srs9xejpem8251g0gcm8g8wqy58m9th310t32ro16sndmo9muoj6zbosdtn2qbpl2p641taxd4w1hawqklwltgsqrbxyad09rvz2t4mpb2h8zmelmt47z4ngwsl9f8xtpbrdo7gk8kdbf3kqp6fxkf57pwai7bffhcjlfjjy7rgs3c6knb75co70iymiian81kgh3o83tjlqu0lxuuoxi1as0cimxxtbv61sgj78daqwpsiz026r7osy5vjhfehjf6ykeeirydrhvmz83ubufi2cml6084wgve09h75aorvkak5riwx2uez6duv5dnlv4e6ubgesvccmpds7c791comfig53bxnvpntgv2he0td3mefneq551malaeh975k13wgdvrjj1syk1w5q2z84qqd4tmxbbtmvckzgityrk62a9f0kpxkefwpyuiv0btyawj7cse75o80gfsik5qc9527c2hub06pm1odo2rwrs2gq3alvga6fb1j8r3ejneiminlaoyw2ar9afkevw5h3mz5xysszluxykxyxkuuq4a8dri12o84ev5rurtis5vx3hx910qt3xues478e5ao2aoz5jt5xqk2wihy7e6g4voa7a3aguzij1irku29rlcmef6hhiwyhgix4l9fxo5a5gbmucqkpldx2fq7g5qiox6l57xassk4taxuxf5oldvu8uj88rvzg13dvg5y24lpyvyh0iunut7diipwf20xeivbtcfib1mrgo6eo1t4boi0bff429b6ab3561fan942f1rme08897fvisdhmbb6hjiwr996qpmoad21xzvj6ifld9uajs44gcky2jaouidzqc5t73s1uqjsqaviwi5av30rok2llgovws7q3yglgiwjq827pw181nj5b02tux4ttfshklu9oxjudx8ll5cslumv9o8c9mm99npmxdxferza67mnej1zno30ara6ecy3yiwer3mzt79o3heaxyagzvu9n3u37pk6vaezq6j4y7h9wuulsawvwmkrn3ragxv5lohjfuleurka7zybzc3441etktwor5zr2j5v8e8mloq8vyl8e5obhpwlm14d18ev60910a1v2g19hohcjwudjvl2541e01rqogdsu0heyzy0a3egmz5h5xkn70322rvsi285wjauqxxhiapc21q0wirywtcb6w1jzp0deaoicvdn42xph6852ldvj0rgqt2wweww6lm9vlqptyvcqvaa9b66nu8xz2s4egwlbj8wfa4bu1zixgqwqfr7xm2gnv723j53i36e3lrqphmvr04jezeg4avj667yu3u1x8y2nktnt456g1p9bpkj2tpob4y7506mwk4uml9197dsnxg2xnxye9mm926kdy814vt42o5ywwd0am0fqd47ren8ss854yaxs3v1ybhfa4yq3y18zasboeb53vjbkch00pidb09b3m57qrlsvgk6d84qrm65q44eha175pvbouyeue9gwrvju5jq6zj7hedw9iph5sr2qz2p4xhj6lj0kb11r69aq0vxos6nk3nslw83vxa4c5idxzyrpiak8yttutpho0mxm2m9op2toumu4c2i3av9xcdf3rroimdwz2a4br15l3zij79tusvr36o1e2xpxxf0y4xzplp6fo3syc1kczlckcy9gbg4vkf687vbvy2wmppkxkh5ryejxne9m53glageiyhxdpn1nsk6lpu',
                redirect: 'cmrp5thi6hdqj01neiomev22p332jg88t0z0xnz0m8uzpc7ed7aguiy8a87t7ab6ye63p21hidlzkjaxpp2z7vfvwgfmns35qwkdtb2hpdsfvohorl1ztqyeausabjzdgvkcbdij0tsj1haililyls7mftyrveb32gwbtd6dk6z61teym6cw74voeadumdm8wwbr1wndcn83rkvzf8pqftxn4zt0u4n7beikav1jb9i2dvbmemixq0p3n0a5evczerw32iz2d8k3af2y4dx9ybg6wzcvshovgiagmjp60w2d5l7hrs09p7bmdahvsnx2mdwee5zcstlez05d5x7ghnr5bqdtw7qvdrrb9ojwbk007dmy6mj1at97ko1u27v7qlk6vtn4ukjzr7cvai4lqi3t8jkfodwfvfxs0c4ip061ybzpit9kqhvw80pan0at2i76bht3ltctwcl3kkid7zv0pf3wptj49ahhu03v1exkmz1x5u04sbs5lwpclxydlq6inlhp8y4ea7x00ywgophwkwqzni0wmz2dgjf1nxl5nsuv3vp69icbkmq2cpzwfewdrwxsk591fddct2xorujmnhi4odvisleklr1dspvonjroevtnk2lmwk8wwbfw29y794mv9it0get7kwbzu8akcfng6hujhvf2u4ug6muhx1gnxootwsgonszowlbjzyir6plbwrub2cnk0q8shyqd5vtvg0roup4zw8uiwpttklcbkm91ecln1r2btq0mueictol4kupfjfsqb4xq6ord1zsi3qxbzu1kc8aux1ybu9m321wmjawtnd8fgr1c1de3p09bxhq0gokbvyrvsw6rtc5ybgv7fki9gurfczh7rfbuvdqeiybma5ke85kdvy20stb5533aumqnghblrw2gkjvz3mh4omeywb1hq04i64w4ukaw9vm4nzf43ajrnmtu3zk0m6tuzvmd3upel40pspfxv5djrw0nqqr5lpd02vckqngu09x9ibhfxads0izh7hrfp3uxhxy00lcogakw0csh55nmu6c6t09wbdx6uzatyspomsqff8cx5nchtontai459qh1t36to5xjdoqgw1bka3b8phl9hfo6jv78a3bu7u617iv143tmmdon1m5641o2h2um3xfdffgtqq0v26atjrdf2ithx9aml1pbrqw0wd42ow7xpsk86otw2wb9501zjworozrsmesv377v6i64yf0k661zb2swfxmte4fvzwigk2pclu8mmx4ltco2dycifzohot29s8jyca6vu12zcaago2i8aybxkrrhecmlwman38wf2u2ksx74lj3uj7atl9skq9sn72f492oqq27umuo0d4kp7t04iowthq9jdtk3qd5kubvjzcf1x8ofvg5iqbawyd2vxsu78qh3piozwxu97wit4ra8oxjqgv8zdsxjjpb0mr9zgf5ej6zg97ncpfu716gjobq0i37q21s3lljayc26khzop1zjq1zcq60neb8x2xrxztgcqurbqu6sb4c2wvqqype5qi40aayhilo2kiftffzuhysdhs0n4h5gvmh7zzuog1h5zc2kwur469hfkjvafexh1wp6n0t2zs98xdq2c7c2kms8in6yehnb2yybf88yx6us48e2lua5p2mgxqzxurw2c67r8rqfm1ea8z45xlt0q48r8k5lnwhje8pur2in8g80gd0lmwe4qdfkda4jk48pixd2rnelw57uaqfoqhlraquk7o7p7a67fmy8s1548lw2fhav6zam0ddg0rfww6urj142hs7xbyy5r0ozhaogwe6ruiha8lycg3wsghkaqxa3sk0rdz8bsnbkyks06zaouenycc0hltdhfabqqe2les5r0hvs2oj69b2uk7sjbj2yqjwzp71on7316bljql4xkfrk0fk9c726tpvgvlhn4dgvpdmjek4qf141y4g5npbtw24uyg8lxx861a44co4x7ge8e3uum22qdqrzqpbmsoyeajgo79zclb9mq3frhpo1',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 9708860440,
                expiredRefreshToken: 1041759116,
                isRevoked: false,
                isMaster: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientGrantType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2d8bbde5-e0d9-46e8-b0a3-13c4fbc91028',
                grantType: null,
                name: 'wlsl8e8gax2q505toev5nds4es18c1qghn5fv2qtgzkbzgwc9iai9xv4alykoyqiyjjenmjmkh8yow1wfaie8azz835gj4xjaoaerj6v212vp0jo8lwd8esef4ughcw4i1r5pl9y0ogrvvf185i6gvhxs0c5s3h1w10o3ytxgwojie2ift6xv39hladedw3ozj6ls8yf0hsbmympvoh6ei8lwr14o2d4fpnpm0xva2u5vjvwzhnzi05n34ofqul',
                secret: 'kq37iclt5jwdfadroljnhkb1p8dqshmi03grxs59c9os8pwwr41u3eweyawurhk4m3sv47n37tylnwrwdw4xujag4g',
                authUrl: 'snnv1bpn6m5neqvmb7lcnkrtqq49a6m4kmyiks1a9ce363fw2r17qwtwsl0cdlppcby93vlotuew62rq08r6nr806z2dqwdzwznjfzs7hbjvqgkck9nz7d55360tbxrw9054or7jun36ups601jrtcqbtcm1nei8ne52gprf31wfsr3oeffxru5t05icyd0vehl41n9u8gao0zhfqgxhkq5x03dkxwrdle9o4pv7bfxzn3jnmex3mw4wio04ogoxnizvjo5fwu2ta34togtargxzt2c3ayqp7jo9ie5astxb86ttvl1pdzs5cbostv65wojb760x58dn3ycrv5wt2znimm49d012bou110dv64x32ym1e49124c73lkpb4vhvx3wb5lfn7mloj0olmidbfc35hi5kpj6j6ziqvnc7wrl44hxpanjaq69gt4eh9qb8mh7i4owzjcx9vvr39zwvaxwn4z2qx8sbglac20h50og1v9kng5xyqkyhj1xi3lrln711itx8iwqbwlhxibw3mjmds6j056o7m0awqaubgh0ny1jmzeavq2cftg0kpbqosp9y9rimqlft78knsb4xhgzy3nl4k0k9cag03nbg66qqkpf4aernag50nwqomosd3g6prh2acu6308mqbpoe2zboqjyux695wauouv2bjsrxu0jtmut2af0bs3rwek29v9eodbme5bvaayaq9ewsdxjftxoyhhslpjrrfhf71ej0fni01qaaokyp1sapo3ctddrxic8usgl1kl1cfjbr6e1n9thn6ts3hv5npajnmwt83txzxfxrn5p7g89qmenkka41lose2hv8s810su4ph6411u2xgfu5s9526tc1trnl3rtw99acaua8br4jmgo0dl2jz34scybclohpm7wxghfjdys1awjjtnwl55vcin2fkoq712xy3gyi85h89jugjhjt8llo1ji1ks2nl7c8mu6ectoc72l8aq6of11ptfx1qtapuws5knxon82h6hsx59atf457ulxm41tb4j5rh2yli4eq3y567fvfitgh25lydr60ivqcl5uum9km10fk2j1u6il8y5u7jz4f3yriy9a1gmpw795ik5vsvx7ivbezl44atsvc0vmg2o1irkrwaoc2d19dny89zzjcnx9fx2tsug3zlk4mkrmqx3ejio70n5hwje7vpe10h96gdj1yd7r5siqv817xiu3fq7bsc9xv9nlt8hdjutmjjzks87wx2v4s2w01g7yx40a7ziiipf6bpi8fbrclklj2igc0h7q69prf8r8nqy6xw30uhhw3542afhdh0vuggxa8ym8tat26b1jqr97naed5fj80zq2y9opg516vx0h62p9ktc9enqlo9fwdal53lglkgy7v5m4mx8abravshn43rsqegh67c5fti7c3vieryfbkrazv01hd6jt3xerz1mua31bxmy7luhd6t1sgesmy86thnmvbcizlk09i369v8q2pkfkf958isha8g95ikrm20bou5omc8h8aqlke8s81rqw4smvwzunsj53sxumnqsk6i1xylkqtega93m3ec77r9unqt8m78y9yb4k9l3smz50yzrvtrgb5oxkqsnchxxzpkb9hbug3ola6pbjig9eh3k4osj82pa31258ggd2cajxk9lo3ngoyetpmcwui3d0tabfkny0dzyglzmx9jrqezafogjat2dqxjx7y7q77nj0cxpmw569wvri6l7961soyj8kkembjp1t49n47h84f8obk98lhrq0qcc2i8ausimkgbotus1f8ptaw9tqbfkokk9799ppgew1xc4lednpqwym26i9urzvr01vmgtd0p5yxuthbbw5xg2qsjt2hda0isbx7dzfsk8f47dn9m7u9qm0ykhb4820f7rspblt9mfbo0bammb9do7pr79i8lvb57rof1q3kz5qe5oerc8hvesiqcznkqtfzzqmoodqmq9gsc5xaw5vvkpinqjtbjo8bgndw3ixcj6n4mgh50cg75pg',
                redirect: 'ymisml8fc6ndv0au5jzhvf7avwphqthnzz7gur5qd8qchjd5cqwqympbtqz1uyy0x2assvl1pipxpdtodl4e9oqyonwsapsre2urk9nh2r9kck8erb62mmnb9bok8y84fijhd5gt3ohpsebbmuidacgvabq5qbafijg76oo7bmi85w0nnunie8dy51xw2iw2tyxcvfkgfoa5kowo7zalmv9dz8awdjhsk9pmoesstf85hpp045f50kznxgsvx6ns22rwxjg4o7f389hbf19csvf5dbihvgywc3k77ovsm3g41n80ruz2kk713ritrpivr2f27jw3bhufmg4tcz91wyh7yswwe7o4f1hoscvp465lxp2mlovpxdax7kp4k50k5i72n2j0wp4x5zpe4akxnt5zeyrzthacdrjnprj67h9a6kvvr48ofvqo27jlgcf4990hucu23v35j9cr7qu2nmmliv29e15so84kpz8p2h5kunb6ja6prdicd9z12rulw93sia9lig38o072tk5d4qnsdh1iu8tk26h9i8dnwpd6nsc3t6y80d7rqspk4vxjzwssbmx9ctrc11hx4imy8y9e0wp1eifhavq5fmp6dddgkpw227la4uq8gv8ds2eyngzifj8xqpgk7x3m1l4il2v2wxweot7woq0ce9xssdssha0w8p725thkf4kp5v0yydsn2gii1yb7ymo8atuebd2cc8a9yk2bmwo6rwkvcbm41ehlz4oyrhf9to8v0ee3xz157xmki2xnwkdwnohzubqbtny2mtfg2s8q0qjypktudoxkdphlnib6b2wwza6pogus7s2bjz11in7t8rxhjn2sx6qxnjccgrnyptuc18f10xh8nxnrhqh37z9tggi51jyeo3ll8uektnrwwhnsjh0i05scogh0pdfw6ar68sxjt98i8agfqv69mix4ach3om1kpovp2g859hq48oc6hngmptnwn7q7nz690nrsn1aqmka37l66o1vn89a3nvtlfvbdnlt2iy51muvq5huzxic647140jb7bx50534dx59xwe5w4r2argqlklgvdoymglihuzgbszf7qks6we47cyev4mxnspqzknptxufulospuvurnjvrnjslyiav5y52voc48qspyikjidlf7wt6uczl4lm1pjl289udlj3tcdqgdbda3cwrajn0bl8fz4jb34rpzikr4dygpir8flbkna1mr8imxa93y9t8d9g74s974cyoqhmyn8bxm85i7efsa01x6hj93cwenwhqkp6b6crqht2wy6dq0kemnvwq15eru5v9xjyub316phc07gmzwek78ahbzh8hymimiti3oghcgexcf07w2hapjt057vjgg2mnlem26xgiks46py2fo1s4ftpxrntj929wp4o3teh3wuo0ncagfoxgsxwqru8x9ya4wk4xnawiaakni2dqraess6j02p2n3u067jt0sulj1wif5bnqqnw8io0vkr2az3qf7dllgqvw6523oih1hufhl9q53jculgdd8p17vcdhzgvafu6b1xa6o6u367waysp1clpwthonmg8fk1oo7tgbvr1vz6w5u5nino8e7tc5le9r63hoqi3dgjz5f8auafn79j034vv89egxnvv5s5fqb7atweisiz4bf1t6oyihxz8jscx4ndombzv11309bufhx2s9185gv1dcjmbt37274xago29hg0ipce8eziuz9zq37nsmgkhbm7ra7ps1tdj8vp1om51oduvxwzt3dg58k2gk8br3cflasm1m6wpllkuu37625dm49me42janza2etqiamc31rsllrm92ueys0peww6wwvrxi2cwoqirda5b8e41kuyy9x04p57m2h3oj3ucnshne673tb58ja69y1vp565jathzpxmk2fxpvr5whwf8447pay8seztibx45eiqwwy0rfpwoxclnhvzl91f56a3c0qi5expnhffxa60ku8ecijt5w4ieptl90gn5lqd03kc16sgi5ygvi',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 1917051472,
                expiredRefreshToken: 1032903310,
                isRevoked: false,
                isMaster: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientGrantType must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientGrantType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2d8bbde5-e0d9-46e8-b0a3-13c4fbc91028',
                
                name: 'd4ywhxktmrnad41dvji97gqp6kqhnqwki3iz0xggp45x5c3695m41c7pdz45q7qpvbex2mhrloqrsoxvx91j3uaeknwrgojerimltoa6fgigiqqrknmpuzdo6ueudt1vb7w61ry6cmqsw0mcobexp228y92obfkl5gjr2svqif5v6ckf6d9bca02dso4l44orycixhrpvf55efmju2afptdcpiak3ojak20o0k16oks2uuj1iy9ubqfbfx6ci55',
                secret: 's8aygsx1iwufjite1iuy1umhbvbx3hx2cwf4asobd17lbmkjc2d41xyud0bb411jm67tclg5n7kja6deg92hbbb53o',
                authUrl: '0nhuzfrh758u1thajmhd8m05wefhrezxcqzt513vnd4qvjiuuqqent5npetvmm8kd3aj4jbzoo78175tpbi7g61ldyv55ryx3nl4svse24rsv3ffx3h1a8ggl4yl393sl3ftnbmuqbvb5k4iahgazytrbrf6e456v7h6t2upajyv4x8ux8jo5mut1yrnc20ne4lb2fw5mdzkxk8xkzggtthir8w14x16bvc6t1q2d25f70t3lbvvolaokbkwj0l6yy2867kb2y3kpm39p4olcha7ffsrgjfs1t4hegvx0he86pgv9ug62c0fdcokx66jedtl0s2rr4y2lob8krzdgyll2mhrtuphqy86a6nc4zjd1uh9d576etfdgg9cipru9z6fs2cumxuqtw13l7rpbpdhhjfym7gaozlblhbbgd42k0bimc58q54qnrm1wgz2vaacg8r1wmalmmoilxvxkc5zoti1079mvonb7e7by8oxv4main8ba8sksn93mmkp7lgoiy80hf45ov5wm4926cg8gmenrou0fbqv28ym5givj2f635u3f9y40cmvw5cco1fvy9xyg8dkafwjpkizromqlpwugrm9ecf96tu6f1s14rqvcky70gh3blks7qdv7upcc6kx0w1ys7v7gcwq5tqbfzy4jydpu04e5ksdk9oao4rlflso0lup718gnydm3fbvg3i6b4dfjhh4ey64hve56snbn7qxvy12619cc7h6n2pzxbuh0tl7zrpvdtp84tuauxflmm8h7qe0f4le92czzsx2myi7wxryjlakzan4gsj52y9dha3aad76eczvx4gg2ngnvb6nxtopcfskms7ohm14lpyyue339he66kp5d17ic26n65ohfcajw4zy6noev9a6ibpeu1md56257knlbq1pejj0o7k31fx2mssio0gm7fc0gds4v5nvt381d3b3mpncjal8w7lb1i6a4rcplz0ncezt1zk9c22w31xe79y383bgxvwc2tta32ms9o39fof2b7pint86gyea7cezdvbkqekha18cidipg73qw2rsjcf8p55tr5vnp5knf87ld1ss4yuaxlkwnhtsbsbvqgrxrv9c3c9293gkf4j4e01wria4nmrvlgwbkq4gnv017216lqmlmbaifbt50lui9o8kel9nkn14kyes3d57s8ttg7bvo9qorfsbcxyjpi0u8ycz5qcryr954rjhensw48s3quz1biqgc7qlugu3w7w5rrdvede4lw0tpi5s4krl0mkhpdwwrokn9ojnf2poqhmkrbsxc83m5o86abm5tj1uipveui60dcvs7ev2kxdiennngr4jy9dlv4f08dstwdk5ftcadys5ops09jagsge3ibat9v3oar8lap1kthu6ucjlz24fu8chzlgq59f2fern7nohsxt7d1p06qkrwu0yjidw30bkgpvyvxnwvpf6sh0u4c340dwvjvlouvmg3j8wgdxbjpab8kq4f32fo2qi0htf3760g2ajnf6kdwvrjorwspp56gt2hjz67m7dsydbwme5jam4ht831g3k2gp25pie2wlx96hkn005hqyq34e3a3wc2ilwe8rnmri0gozmtj90u27l7zbqk8yvowfvx2bplffxbni6rgudpsz6w43jt0se3lhg61ek4c72vyhie7vyvxsbqhngix2a6tyexx6b6ak71b3s99xrzxxe95g0oeofbfay7fy23i7ae73abkwj2pc7j0bt29n2hp75r56payknc78q2dnc12zqkzqiiagv1945a28dse9rt3bvdhpx837i8d8uegpoal8pyjl226b6o8oarf312phbl4f2c4m5ag8bnjf5ic18bappxgtejdn6e47ujnfq5vzqqovhpdg0pogllry731z4a0p2pjqdopingog3qzeu0fut5f3krx13xisvunz1hma9hkfsnzbw523cb68nx03un2rzchtlfmhxv6nlvzhyenm3lpzhua16r4zj0epvyvltugm1bb7zcn8p3wo0',
                redirect: '21vjtpcsd7j2pay0nn31wimvypizoie2x3xxidenqyhe1m6u6u1rwfftod3xnv3xlq4xvslwk70r63g3vnmd6an7mt7rgysoqumc060oxwilqx74hwj6qjyym6vtrjrg66fbti4oye4nfjef4t5xl79rm5mre4ivahxu3v1e43kjbezj2z33ekao74pigi80cd0m47t8afd46kpjxxt5utafhobve7pvlyi7sv7lg129s55e3rcwgoiyj44sb08xqv4a9gdd4hhidk99u7nzt3c29kheofn0y4rkeyi2c61teiieeemmrjl4uwv9gwebjszsukvmciexb9dvukejtfw9htuplxi591hclavgekkpv26ptahudhr2hrlhqrataulgnso3w2y8tw7g9kclo06q4l9pr1ym21tm071pwd8wacm2v3g8xhly1geyqidlbpxbfjkuy5h8rp14nude291cuzuxd6e3v89kih0znvw83snlxiyd8y0jvtn5xvnlhjlyh1qi4yx9qfu5yoe4di20huk0e9hfiwmq7wf9mpmfyxsbyvw9b09s67v5p3dy43113ci8khe2urcs7b4oso13rfja20jbx7bhh7meyoj241hbziosh77pim92es25xr91zaptrum245r4agqz3t0bwtb9qy1sr9qkonn12ciagnh1je3c9703ljbmfl2j70gv274s19gl7ij1577ip8x7143imclau7g2lropbbkfdqtltmffy0c8zwhjaz3p03ev47lej9nhehu7d7aqymy1e1k7104o32ie26xbxy23o8iqm8gxd1trl2vdsnid6hevsf4nv72arskll5vyceecptv0ymbjui7x310wjjqfvozi2jdrsir35i4xwpm35px52de15ax8nfk5vxe4h00w2gg87ow8eviwwzgcywjmtbyu2415adob0ju2mkzq5yjcn27n4yxdz1olkgit39pzaaar4gp9tz64kz0cg3xymhva5x3cc6v9rzwqd525jzfwkhtxbiw3x7of2qxg84793xs7i57l3uj0td9q6cyplgup4rnriiy2swafftue14q0qupcl6tfpqrgowkvy2oa09c1zxtpg2in7ygcr36tmdl3e3o8ln3203lprsqbxapin97gaa6vwx0ywlaqe48ktsfh5qwp8v52kg7ha81gdq0i4gi3yojqrjnna1c6jl73wlfy737apo3tle6o42uxkzc0pkxl4l29lt9yibronage896q167c14def0kttvlu7cp4jy98wz5dgbyrq957bsvx1i7atvkue50y9attfvlqivskvitq49p9d0qz2eragxcd877bfh30r45hw7o2b11wmsfph10l9i2csbkoihheo0hrajva63m9yujhk8j6f6udlcou3ija8ipw5fv95f0abpx3d8a7jjy7htwuc13lxfw9lr7mclk0v1v14blj1o454biqlhbm20xu4c5vl309o6ht4j554yydu827dvur0p7qpkbrzg9z1ga3cqojy56d0b3jm3n9pazkev2dm75pqaz8tok3ofrt75rdqnkd8nnr3u8h6yljetifb1fehnoev8ajgtd5eyqrgug92gyx5ilk8ntv5cd7oqzb79dpahtz3lgwklj2794jxgsr5o42olvmmy748gsyfmq1yo17qu5hqd1qom5s1zx421rur5vuky411ftnfuwesbzg5hkmo0d5b6w2pwgyit480gjr6ojbhf9ag0zos5qw2g02r38lyc9czj7jjw0467js7z1tpkq5j7eg0bh84x6nucb1p6bq98eqs0iqqlt6z1m73d1ebk9ho9zc5413f0irp5mdoyf0zv3mwx1sp7l9o8xprwrlrxzr7pjvx9oj95ea9jbm6t5qvlikaldixdjsllorhypt89zdtqsgqk9y8w1edcfspmtsgwnplvug8a37en5f3rwikudipjn5iej1so9ffs0rk681b0wnx1yzitrfjvhi1i71ru4gqdt0i5cpumfhpca5uofc56hp',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 6317084072,
                expiredRefreshToken: 4538665122,
                isRevoked: false,
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientGrantType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2d8bbde5-e0d9-46e8-b0a3-13c4fbc91028',
                grantType: 'AUTHORIZATION_CODE',
                name: null,
                secret: 'v04t3oyk321fkv88cv2m5u6nzf1d9btr6syawkx4f6iovklcrxfnht9516eldntirsweivwb88wme3gake6clg6m3s',
                authUrl: 'm3azwpjckyigd5npjgj6g6vb8mso0i4rtfhlf1codqymljvijovdyhjv8mz2tx52ovsypi1dalxgwfqooaeaksom5ctivpgpz5i18c0on715pdabbae6yt46q6t3bkp44vtkjta5uwcblg6kai2c4m1erb9ckhub00v1266fd41qxscvgf53q8kmd73sp6r1djac8y5384gtf8c8v27cktqnu9mr43lfwm9v5ps107jocs46kdf8fyl907y3gmrpjyckro309ekbaawu4ha550y1x1js05ejdry9j92uy8g1xu2ytvzqyzh5sg195pncfyy65w4s2mu7uahha79sc96s0wmpefiddbjslydt8098xuablkxd9fe94viud2u6a71vo1d7gyvow3cetj6g03dpjnnrz8tea76sg9gp8x7wsnpdrwqoqltnw0d5glahxalngnc7qvsfajijismtsu70kffoob3opr80lvhbfo2dbsekxbp4ui74ub7kqpig1t6vhj3vjoe90lu48o4jndhpj62bkqhbhjcs1u1aponvemktzywftwgcwtrzw5t4qigy84tlohjszoa0mt67ppogp6sm23wnq4fe5edx65kthtwuj42r8w2x5zzpoogqg7yzwbgzfn0l897b0b2kqz56h1st7v4otwjyzp55b4hx2k6ts15j2nipkrrqrswdaew1zuivom6rtd6v6od0j0fceru9skuo811x5cyfu8b4mxpnxrsp5exrljpud7ky0oc8ra4jkjzto4atd85xn8eyoi56bj6ej7dlyat3f36r64pgswgtzzmkab7iu5pexwouzc2sl078tvakcnmy4h8ewucvmdxm38py309c97i5h80scalodar7njhejxvks84cn0vx1t5udk5x34r9sfxpj960nzyamd7fu1ll328czqby29hk63ag9tlh9myact1n2i0w5c1t09h2i1ifdhcihsb8zlz0tl04xt98yu6kegfs2xd2alxjvaogqxwchhjr83fcnpy5e8pccsxiuutkndaynke907whlkxv42zxuhvbemze2k1wap1a7333xlr5dqr1v4nr3p2b8dfj1pst9uyckufhj5bzu6le3jdt6getx7wksvzk2c2is29adv68g0f6fndw15eunflaq57yltbetgkv6ku1sqoo7f0suozgele1zqv64wi47yn918698jowy55mtdlxr766eul968nesoqx14xnb87b3hah1quz4mfpqejxn268eau9q0zp831pf2l60fnusbdw2ez8kwd0c2ez0fhzfuigdsttzb8ge8smjvalzrtz2m5s3k9wnc04l2h9gk4e4uqmb0wayc9mwgx6v5m5d5t93nge2ir2zyfijkc3flly1nynzo04vnv7bu3m5rk9no49qvbaac0b19lviwoi58rss08vhze717iehnr3xeiho2aj2gp5x2ywhusu54x3un0pk4b47an8deq1too8xt89l0fbinrrsazudg8d8xgaoatol1kglavnahibqg00rnzqk1s3kon473d5ednmxiza6bmiys41l7xp05t2t6tu45o0kg8ax5yn2wj59emrfxw4x29tfokw76g5petsomxrx0cbk2xyt1sj6bpprdafctc5dznjvf3b4yuztsqqyv8dr2gtin3v0dgq6tlbk928o4hti89j05kh1q6e0cgowllkaq2clto8xmea1uy3l1yaz8viev5n0ox4dv5ye9532vosf6m99ipsnp3eoc5ht4ia7nz91l347qrzi5vedrxt76fkyafdkkdvl9yk5eojr4bggywxcwsj32gabliaj38qfrohbwfb3ag1jkff3z93bnzskyyd1kcgsvv46dnb9035vhq9miw6nud64nce8c8s8rs5lkxn4dn6rcp9qm42md8uuo03uao9hxo5gz4khtgxi9fm61224hq1sov59zrvv4zlphwba5blljju6twsjfj5gwtkxb6oelhnst1x29x6l4zx8f6o3j5933ymdz4h',
                redirect: 'sx7cm7h37mg8gqb98kxp87amu54ngd7246sh888xz6lys554oknxhkvx1036u83doudmylvkqjc8cko598ajfh3o8vkb1usu2of9h392mjbewwqt4ddlwdn4oa1ff5pmnc2yckp06ec93po5s19p5uhszzl1kt3ebbq2p241havhazmgl7fr6w30bnfqix1502w8m9g217zix73uhvlihwzm2pym7eklmb8iz2urwsozf8mcq4zh2mu7kz46ahzojp9ke4zamwbs3l9edq8xq3pe6h8boqxmu6tx49cut2acua5nc24a44me6lknkgh63oiwvxm399iwu2x31e74pmuz4uaygoe19qd142d2moph7rmi2ovuoor400jf5r7f0kdhwrt631stqszjg08vy9zn6ixtqbkfmulsv9fth83dus7xou5e9k53gwgbp9q3rztrxcmqk7fgyd773robdc38t7lzg9gsso10zm833ik9t3uax9pca12kavre1fazg9arrq60ki9xpnb4gu55izorebjkp27achj3vwhfrr7c9kzq4zz9q5n5ej1vkgucp96y1ugck1dwyvwzm9ezihrcx2p3iml4c8e5tzly6vg8p6v5at884gs4mvtibsj0fifahbtqacciet1o6j3ywtbwb845bgz5x889snxysf37vg99te66kyfsdinc2of1lkhctkavdd9mtxyn0ztm1mpdrfpnmbqjg0tmzri3t3aq8docg4lhijkgc2pq5facy1u3s4dk6apib9if1efujmcucflxqjfki24rdriiu7mk38lia0bsui6cz7i0sopjzqdbetk2olpi9wpe62dtdd9mzh2fxuu1ykwfh74g80jmo5ki5oygjthwuf9uglt2db4gsw3j84juq4qvnefeeu7ieth8v1kgkqx3505dz2nxnp2g9ej90mhljp4dzhsv1vlub9prjzzmgu82q7flvf5tqotxc2oswj8l3ojvvafrdu17ujqofserwfgdccxgo4tnsd0is4lcopxex2s7g3qj7bsj816gdvgtc1f1nwdwki7yp0tkzz6smrib4fz5hhmn24wcvsmonzm47a9ourdyb1sggw807zs2rqod4ft25z60e9722gro4aoc0equ5dpkjm1xnqdqieh68a1xstgohs4w7zbdxoczu01wr5ep6fil9ped0as7cti63p3in474gd4hh77xr5dykkeovvuyswog9bk8jeep5ickm0g4fk1nzbvpc988sdjac3o49h2valzfwbj9kgvxefsuw22lwxlt01k7k605w66j2wxgdahsqagwcp76fbl8uisymn2mbx28yvs31unuw0vuhnwi61gz2otkjpgptfq74wh7bn06otrtcn3oglllipnl4a7lmuiwrj3i469qfvgf290cu2585hs6axa520mqqsn022ca8cznhy5c9ydl7aapyn1wage80an7bpxu0xihe8l4otk983j241anjf9thx3c2boldnw9wfc3zosufwvuolixw6mc7regcuw73uz33tblmzx56spbn5f2lay4bts0uqwjrd6nnx8yu2lbgt8e0hv5tmp022o79upjuar9vlfzf05siic9o7tkaqxrpo8b7ntuxulzwnp2ignekqsxlutciha0w07kgglok64jgo099xw0xyh11m90wm7lk0kiubgtxtvab99h3nmf9t9sak3ld9uptu9hq26ca934jspom5zp6t7c0zq05kuzy3de89kg4zrv2wq72fx6rnr3dq5uv76xu81auy60b76yldd5mvw2uuoetk29fslrbyjbthyccsw2ywh1g1gv0y0ggompegbwv9825vmfa6t4b69o7vy642xgytonn2s6ll2udgioxibn5dy9wzgouuefefgkbhvncio0ecel50spnlve0ocscbp6lxk5kjhp4br7v5it3bsayyvhzspj6g4mgweeyewgb17yr2xuj7aikbm43rq8ur1f0bsjy5upza41hzsht4sq5fi8k0remdlz',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 1288667862,
                expiredRefreshToken: 9278210196,
                isRevoked: true,
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientName must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2d8bbde5-e0d9-46e8-b0a3-13c4fbc91028',
                grantType: 'PASSWORD_GRANT',
                
                secret: '1105awz73b0tb21zqcjqt6q80roa3tvh80q0iqyybey67n6s8fl0hmabtxjpdde68dzuwkkoievefjy21axa5igsdo',
                authUrl: '4z4mkm9dt6f9adh119m05hdg6oodfsh4qm9dfyejs3q607shzjvfy1bi69gwojc9thkkfl2frsyl5co1to7t8ji8moh5svv6blujzdqjhdfe6vsnfwivu81mjyhl37o7v6sa5vcwqhxkrdgxanfbzeya9xeqy9cqoojyzt53lqoe1m1w6dlrht1vl0lih6yf6f1pg4r9t76bm3l0s5wy46apssdlbw7q4thb9xjn6bd9nok8pk2h8xjvrk3tqfxujia6f9makrbe9r7pt9izitlp2wmsnc8lcmakd8ka1vdi1qg7xx4gfc9aas4lxr7klx3dz5q567eh5op6900as07iiyffrwde5vl2eno7jeyxpg71qkj5k27yf2dvuaqufsq4dnakm2aay93uw1yxyt9soxbg8seqcpxczk9n4l33732gtpkh0scuo1qnbbg196h9mtuj0cl6rq7xemln9q1zx23dyeyk484slo4rxgjyv1g5jbfyl8w8g7j2psts5ll9e558f708tblb7pdceuh0zspq9x7iv8265wur6nxjhn140adtkuc9jpd12ls04allu0qlzem0iva3uzrdyajzeiir5uync54f22nnj9xwoqyf8811op57n5tng31yh0phka4heqkzk0igl3fxec4lvqdq19rrsn4u9g8ddvreatncfnotn4vy2g5qfohhud2qlg9rpyes181k34dg79nmqo13sbs8aynfpstchzf73evfii3ef11vpr1mdjljgjfag8uf5x16cfmno10q718aslmbv6m6bwjk2w0cqteqgs7yhccjumgg06h44bj2eqre9x01fg0hu4t5cfto1btofui9jnojj2xofcrjfx3j6mgdd0dwp136pzutuyo6053u83utnkg1g2c0b2lhm0txcn9g95jda3laf2qz9qy8kxcbxqdyji1vwbi2h7pwhwu9v4v1xovp7s0hxuybsl8ec23sghmwwv7hqtuuqnjjk1b23rra5ez2axlmo2qjesmtpcd79jfrzyuz37yfit8j5ez2sosvnji8ow94jgldcqn270lrg5hqh2tzrmd8eznziggpeac174jnxnxtszgfyhq37h7ijth8sfpz7ro5r3o3kcx23yol0vwp0pqveeubek3q25ha0ep7bvnbvh8vmws3j7d31hx3q890vr6hwxjhcfczcrpr9py47dsn0houj025jjz0j7j0fjhuny38c5cxctjh2qsphcltsbmdlnfbzia4x0jfpqbcb4l2qsspq9qqhi4s5tga65ktxlodjhp0h0hato786dcfyh9gp0pisksi7aiozx4ecqyow48pjs3yzmrtz9g8eel4clhio6zx7k6276b2dhx2lp06zhfago95c5rzjemk5jmvxu9v2u0gzo1g2g4i3gngzbq8pjlag3m19ins6rty4srv2fll4bplk2h9db5tmvnnbn3lgbeov4qh9v310zrc4xeaxu9gd97n9cwp6abul3mtrgiidyw0fqhatmqzf85739y7nvasabjy5asxf81ll81uc146l3eb6j62oslb797nx5zord10q73ex05p323r8khegs3xcrdcflv1zwor9yvnmgzgtzo35impm2gjyeyo91084h0g1lkgchnpl57da2quwh9hcrybij4sqyrkmoo69lzbinjlotjqr35jt888ftr3pcnyxobxflic39s4cuzfvnhm3sugprqah08stddhnf0ix74nklxctrhn629aelr5x3h2uv02i8x0w33zlx950np3ku0alu90erykdu43dx9xgm0nnjnlimew1f0lmgmmwqymjrpto9au708l5ma9oyez06e62xt2v8n3mt85zl0sg3zn0jidyf80kdes4qw6kqgoajk443khk1ts6t79qmnflalt59gb0hdrsney2bas0soozkdf677u5yegkpigi0h4bqljozk3yxdqk5sdg1jeypn9dgsibxde7rqt1is532c439ftkaai3hr2iau547v9ugof99ffrkvr',
                redirect: 'bvy51h8fllhs13klqk4qsdszcv5nwltjjvc3ior01js3a8y6v5hrtk3z5cd1mb249uv1gawuidtblwftl39107v700wxxrgtkmc11y4dyv6vv4z032na3wjro1nv4l6007qfs23zuewgbh30p05necrepho6yg7z6zh2fjuzgj1b5zzup87upp0mmggwhbuil8jvn3qp891o6ik5qeb7zutc0l2hhnfmp3746e2eb10ji1p2063xwrgy5nwx87rtsm5eqm9b6py70nd0gfk2f640dxbfctt7ho84bp9savk1vj7oedys1emz5dkjwfblp4ckfvx44bekmjwmuakdetr54w8ljwnuwt414phk186r67lh0385amgmn101ej2h75ql6k6yvnsdnc7pvlaz6mmsk65u3lz2rsah2u3f0gnt3mcyym39mx4ca36arx6h9b0ji1p8w6wmf5nffucdopsezh5gbb6ujgxr4zrtbtzphez1zomjqnxgb0x0atzdfrw53z5p4k6w0btlo47318fehdaq72zciw5nqy6bei6mpm8wkhsmzw1hwz4m1585k558s9i1rtmom29e5cbc1wss2kkcr87jak0uhfgfzef2jg185qgdxini4akkiokbny9493bcp5inbl3ii1i0maxki8fudoezrk9czrjtmkxwwkx61aqyadts2ow84sudd9ot51pxh5w5ljmjp12q7ekh7jxftvy04pnndrmfi8ceea7jc7n5h2x3qv4j799tlttis8624dpqfpgtsu6pyebzrw1h4r9m1brcqa849osfe0n1draetuqyy5mzgqpvzu6656rkn2bhxwm47pgi14cre0w039dol59gjbgwh39o7i0l1qtsp2dx41jchnng2vm3cvp6b5b4qo107rskqcvub3ke5rltlwbxcvsz72unep6wmlb7u5k6yycunbw57m5cz55946dopphnj5vrzrv0nrrs7iyxdbevksib7gl8oj9z1aly2kckjt8nj6y8kwa0gn4zrk8w0qk601nzzhyw9d59hpsczkcm80uo2c8j93tkm6pga11fw7pw31pl8mv2kuewzm8s3a6lag85ndwlt7bygj2cr6mtlzfas6yv9kn651av23mgcsu9nnr11916kad8ur7zy7ilskdvlol7efup5yyhu3bc85x2ilpy1wthghai5gy0ddj82kg4033dluj79j55hjbsufjwvcpvxdj6phntxn12s4he527sg7gvac8ttm099rdqkuxa4z72gx196cj6hlzdcbd5e9xnl4izmq69iveos8f7mxxo1z3w3or2yu05bs9iwivzhrr07bge4x1zge673f95787ivdsmludrcuebsyulccb32wt77gv4wa8h4m90k6qrzz70e3jltp7kuh1w551z0dzaxsk2tvrz1h58ybw6oxue0csbcua6ekjx380po42ygow8itvbnazc2enjjrp2a38p4d0w9fkva6rdnx8xq5w0wqzszhj12azbwbuxjdnqmj31vlmp6fo7so1qehrrr3w3df62bnxvfgalv8gbt3q96vjmalmvq5dox9n99np5o4kb16yv6qtx725onlcoa5n366xg1vdnw48vaa2qu8zgmf9uuhjqy89cmvnubagl89f4gn3r8abtfn1phzfk5mgey7670jf8bhj5e8ya08ku96fyrq7tjpyf6jq6zb2aqh52icxyw9cd9wh3oxc0pbdbz94bq417vk68dmav6ndl01tppx6tb620dieqtilh9d3lrcnne26en6hbdmu3en32l751ohzuu8i4o6xa35wwwxjmd3hlet3lgr4jmskxgr2x27kkj22hc7ct41ff24v2z11gjug3v20qxw5m5u3nxhj6ant2tmyiz0bs06jhz2wkqw7eo0s24sgg9ix5m7il63ft560y06obsbq2tbr9mb40pj3xcz3nei3hvflnfcuk0b365tkxetsw5qtkp786bk4hfb3xwy2bwryja6nqp1izvzpbab72knezi79e',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 3279520502,
                expiredRefreshToken: 9907164703,
                isRevoked: true,
                isMaster: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientSecret property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2d8bbde5-e0d9-46e8-b0a3-13c4fbc91028',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'ginrc6ab2w7z9fogt4i0jom80xam85c41b1fc6zol98rmyh16022905h1qsux2rklvm62ayq6xifpk90f13vf30em95toktyuqykknaygfh0u9xgtv813ysbdl9uqjuzvpoontpcteczbo6hsu6mfkp4ajkvzh6takg7n24fr9pw8l0mfgjtip4kudalq76pmdlla0aqx2k7zd4lrl8qxcn2tw7nf6ajm4nsios70u0zk0sgkx4ar0hqj1tz6d1',
                secret: null,
                authUrl: 'kj5nlmf2aenbl6uwvh7tsi4a2bwl3idnum197k1sualxkm1dzj77yrze8jl1i71sye28pu6vqlzx0d4w0l7ds5wrqmytrn87294bn65bx53w0q8irvdxv2rmc0v58xhdjwc8wa70fyqun3drc6zl5souwna6ljrv6zwg92zkgnle5i1hto2x2phvoa5v2ladaghojruxwzp2bnxwcghlyuf93d4sz1spple71htnsdfefo3rjlfu3xqit10q5so2b7oczf8gp6ote5pua0s6phmcbd26v57zh4apkbq4e1623nay6lma65luyl460xfarpgq7rfirjhh5fmjw2i7tn9kkfjzbct8pk0sh1638dso0ll45tddytvtqs2mumh0oqdkeo3na4mkwyai5ysw9loqa5w38r99jtme45ufbfcom50t7b5lth62y8z7037dtey676itqklt3ek7ddyj1yaaknbvg90huecvkda7pdtxvpboje80b8ji02tumc7ykvgvzv84l4cdz66qa6h0uc9jrlhxgwhyjuje6eh74hubdmcwi96h9k94m7evlkox2id66kzq18qw3201crfv3m8rfr7ab1ram8y2xdg1wv64p2v80qix82hky9oo0mveqn40engd8uuvx3efau44g485pllwovuro6v2qeae6lt5blty6inl2tc5wbx3mn07jo7wopujjl66sf9p6vwid54ldfkaplybtvr577z19hju5ibj96m416z3rs81gtt5z0sl4kt5naqxgop3v7kqk94exxu0db6kgunl5bhsmu5mugukvbwq6y7dyj6dmf5cqvk55e9p7hd1uk73h7zm3g701s16tbpimcpg1d2wx0ulsv3vhy9unxbtwd3zk36pdy8sv9t0witupa0il0y87ou0o6y6w4ic1vdcu3byzr6m15qftgktbvn626aiqqjzahhcekpo4055wlpbu2ch7gs57u785ip8qes8hpnio4v4qclwprhko8izw82hqtem7b305d468lorl5yjpe23t2nmhctfvvjat0cqxel8zlxeuy12dzqmjlxnhq2llpttmfr9br9l0mz5bjz3nhjf5gkguz6btqoe6yp17ofhu1m0tsmhlqtizyw1j1a5migmfn0bq6hilso30uzn1f4w97du2mk9a0zp8cixwnqa0xz4rqero7tp4nh814vj851hm7kwcfaogbrpczquw70jvnupybrsev5kcnvlxxc7iceiq3tq364z4brn7fr69qu5s5dgk3of36n72n7hcjvj1oywndd0lnh2zkl6dpehjfbbqyq4d7hjg5mbrdfi2w42zlnwbu28t8e55jlxipoa2nneyvo819rweft1o95cwdrkan37czca5xzn1gc926gsk50elxydd75312wqk1adw98hvk38mz2ttuekumc74zar83xw6kfhvfujrcbqyalf7bmenpziaihc11ccgnsfbadisr88el32m7jjcg61d96s7yizm667iefjdny56yukf6d7r07mqhlzicsvzytx7toskn8rxnx37h9tpqod9q82pyjzt4aa3bux1ph3lqijuu7lo5ukh6rtw9lqrj5ai8td72bxs5mqox3n16ok96dzd2e06y308nk3lmug3d13rlhf04f7qoaj7r7jl6umigfnrb1y1q9iux0hjggb3g9gkhtgjyowrvt8rtl6hx8e02m5kbmqvboyq6esyn9dajm54acezyuev3fztnz7nbsl2yp114nvx0b0so7uuc3anxz7pl9f9cjrk3h1wmn2pvztlm72kpsvbejx3rqa01g7l1lmycpkegkrvejta51n4srj3f5j5s4n4i13k9odte7byuumbrwd0zsbitt3nf56bv5p3mfy2f0d15ojc3akjl0uc20lboa41xtiuf9hkhe53scvqzedxa1s73l3flj3t5h78jhg7pdxmdpyfz4gto54gzzb35u5vwoo283n7t5tax1uojaoo3d3dgpu90l0umteec9y3n5du6xw0gmc',
                redirect: '7l9w64t7ivgqh7w36a98lwtf7kahhxzz3p9s6hx5xizoief4qsh91jdwcwhfvu706sx7mvby815jpoo8r5xqtsq0emhh4kj19vgz0u967nzn4wnolw0bwvo3bbp9rcgxaa0p9icxzswtu00swtzug38div0nxasuzkl1kgv41awqsl41hf3b866pmexmn3cs9dzem5kej178bjnwfs618gzet3ynewul6xgu05s9zki4gosz92coudq6qebjav0laab2cs8qt3ubydncfard43qjx2ayjnhr271o7edto2mvumfxyc2htsbhzo68otyu0md7ynteijk31nw2sru9w83jxxdapp2crb5pa0lup7tnqn95k3bl5tj72q57dx99nao3lank9h4c15y0w9l8bg2b03r9jmhvxwxhvo9kymmox0fl5hbeqpoms7j33g0a5dz5f6ni1ewowocu73kdcdy08tv1r3p4lewv0if6r58t77odzrxmmhlfjphtwjshpkatzrzt99p9rl505agbwr3bizx9kpbsxu6elx5nullbq6e9y2qkzch3acvtfwmncriglinqj2tdnkuy9s72kqlg5zhpir95clsvcembczw9o5tajo4d9z34m6oaxf2fjmtnq6tw95rmgmvjwd3dz1bjlmcom1mtmcio1yna52v45pu6d8m04stvg7renz2bi1ol3xaqgdxa2gu93lji59h5mshctnjlichaucftbil7gxwfav41jthwcudcypsyxh93tjdq1y4o8qy7zxkxeg6stsmoldlgh3cxhxjp6i93wszrbqbo519g5ib827f7idudy8yzpuph2o1cdcqz16vgt6ecx588jl9wfm398yikiczeengwx9aethexvsh6567uvtrssryxsm2gquyt56w6k3ayykfjrn31bkhk2k2neka324dt9mvafozt1vp6csh0zyy7x7hgcpyefm804uekhia1hvx2r3t5t5h68b820u5zvo8tb2jtacszcmdkuvoq85fe3u6kmjki3vrxn1j1epyfhgm8yb4bjzt75p4j7lhe10axfhq1bh0dno67rpnn79s5d2fcam9s4y8q4b8ltqv853w6grblcegfoth8xfy1ltkkf7hx591ds0i2zln2patj6jbm962fwpvfiwoqk1ad0gx3gtdgfqgdzp0dvy8zcvn00z849ueip8u3laa52i0l7x3h5pmxvlswfwhnbeb9dj34mtuj5dc0oqc487dy2wdsgmw3a3jnjb9pw65f29p07euth370hw4gdxlxt9oydxu3jjz2we964kmv2o51rgvf0iim8z5emztqki5btoln1h5ijt5in3wzh9gonee22mkt7793e2d2lpa3btlbdjfyleskt0orm214sbrigfpbpax5o0gvnoskcljspftnpwe5te2bdwswje8t1c63jsjz2x23rqo5wuivw1f4atlblxu06q8qe847tnc0w3r9o6sqple6cfbic3p9f29m0u84c4kqn5wbjfq5m6bni33rdmq3b21okkngo5uejsrroa9us1npx9msyir3elupe9oo4njtgk2focgrrmkbvxxw4usicp6wsnhti7vqoq26kwhv2ts4ij4y6fia42m22959x33qi8b7k36hv4v3a1c2oynbjlllxm0k42p661vn7o4wwxru5djz5ze57u5knn29ks99bwy4e6l3y7twg17sk19cqz848lc2n2ypz6nsb6tu3lrrdoo58k6l8v5lye7gt69x4iprr8ucvwx0sloj9hk3acrcio5snnbbysi9lpdh13rmtr73m20c96wm2lhjsbfr10f6ro7uu8wvaqyyff8k8s6bdauiyht2mlo34mht345y99ekww06eosw74m35ctklhbkz35ineagantz8o4smwmkzyph06dv1vh2qhrmr37yum778tkkb5l7bjv1ssbmdd8r99vkrx254arto0pzipf5xfindf3h5f3ju00640aqm37gq9b2ghw8l33v4528dspu5njt',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 8010560984,
                expiredRefreshToken: 2701161582,
                isRevoked: false,
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientSecret must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientSecret property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2d8bbde5-e0d9-46e8-b0a3-13c4fbc91028',
                grantType: 'PASSWORD_GRANT',
                name: 'vcls5lrpgfei2hm0ljxp7b5xkdeuyjc76oyf6d8ydcf49utltyodhm56hjkw3vtrvuawfitmy39ianyejr8wj4bac864gaxa945w920dgjbpmhf6bwyn1r4t05yquab6l5heilgqa16vhw5zwqh7coniubufm8d1ancbywxn77j4x530v1n8g2a24tvet7vup5m0vo8iqd3yrefjrxilu0r1riwserlphebdsk99acy2lv1kzpg5yuyaq7s7se6',
                
                authUrl: '8rnzux95uym1vbhnnakz86sdigzw10zoe8etee6zkx1iyuibbif96gay0xsatg6me9igjq6mdra3gcei5e5dqm46qztg13nk02p3byzw8hwha1fzn6is2o2c85vwa86md6wdihcfg4p7xlmqhy1h6n418b45r5af8w25xjlhdg00stlj0l6ahseceesn40ph13uu8hv2hkkn910x0wqs5nep8lk7l2sjdbru6lp45pzmbnnielv9ycv4ognmb2gpmk4svxvjcvy9bm1czkf50lleanz9jf0tkefyhqdddy19e2s0ljcvqahh2z1gj7vtbrqhjlhc8yxez7j0lc2b4ihatqvj4mbfv5cf03pc1ulsulkw5e1obyzrek7vdde50yisjeld3yxpkyced0rc23zd3kzs5whfcmsxeety6xgllhorw9ytpgnflkz2c13sfvgm7yi2cb35cmiwbj3bbb8uuazi90tri4gnkm83tckjeb2ufncfztw50az00bnd0pz2oytw1v0dbu9l5nujc16jm3iuzccgk218xpvijyw2x9h3urckz5g6wu70vbr7p8rkc2dg3hug4lchp21c849vajs0166dyvgx21r90zcew2uyna5cpyhwwhigknyi0fozteg5yvostz5ph76p0qhx3buv94a1p2vhrmy7wg0utqb6dxtckssw5h4onf0lbh019dg2nixkeg4ag8qbf81xjot2mug2i1idp5zc5gxjg77ul5j5hah7xl62qnk0a4alu7hnogeyicu4qsxggm6cioy7z7xvkzmmefti6hxfy7gza5u13hsbx5qbmgnr23625818w7y6q37kzspwv19jtq57ehg6o63z0sqnm1q68x3vrbzma46b8fjc4s9bd4c8cyi2vcv9rkb8ew2uwe1sgj3m6epv3rw4urwjslqijln1fisy4ihxjt5byr6n9796ub1t8zrjg9eoq49h59cm8zuhv9dy06gdd2ivuzkrvcxicjw6jcr54jyq609k18bo5x226h7u3jwbm3kjhpwn2bah61irfm1v2wzgmmhtkpqmi9j8rebdlbzi8hsq3prmk11h3xp3cl2gps459hsia4lbo1ur8kg3yupv2291sfadcds55m73zodpymiu7nc2v6gnvzsh24934zeybfrkwdr0u86j7rdx0oard9zwi9czqxi6hgc9h7khmdsta80gwq3z3dw39l7gq1nevkg859zzk8kibikou0esrn8vyai0lpe1in1vvnraqke4zrs3dm1m0gcb6pt4imxsbxh1tsjdfd1uz059doi9xykbo2g7u32oj7k6kt53d7s77b9fl4sm0jqvxjabjppeev2o5rszhso33ztuithat8r35z97s9dt3a74yo4c42f5u6607gvqdn3saxj6yg7qlrd43g0f7qt8gyoaudltn4wx8e0pym3shdszxlzsfokzwfwrb4ks64h99zypklgwjg0onw5k8lubb1ml6l4d1hhkh2sp484z7drxs249587tmvmbjux60ret0qyxqi7u15mstrs2fde42yamlij49vzxg2dxu47p27ke6uk397rulsisbwaj2lc03wrbdca1vkox0pl93dxm01sn050qmhlqlfiuohm6tg5zzh9cicc4g0x4oxj9zonv149qn05txne72nc5f77z607xf1fd7c4qr4dtdnth0jqnz6cmk9tlux0i7e6gc9o5tdkn6rro8buandn0hept1a5fbbsy5pf8v67gz1ormctnhjzfattov6xplbhemggse00r28akyhjjz5hyi69zvud3a8bz9y073cpyp3pz81pdcpdevvx9hui5hlvpgbtd5x9tudeobq3rf1yt8a9wn4hzdcaevpt5gmdbm1hcdqa88evwu1krvwqixya3gm2e6vh7sglo4zei51r5n9hll6ecfs3g23gbt7hyfll3b27h8j2fchl0x60fsu1ocefzboj1cm0mgo8k83n0fa67zkhh4pf5y4m4q6klgjabl2v7ccb1xjbr',
                redirect: 'e8z218qqs6hghr3r8soxeobk9md6ullajoc14dtcrowcl1k41tpepdj8mxwkso59uwinweqj469n9ooqvy0ds6zfk8nf7v71d3sgtfzzauvi49hjmlcozefl9w26b2nxf28ly8qjepae7rt6zm5s85si6j3itxsruws0cx3fbu3nhpddin6ayaf0nvtl8br4qpqwta2k27liowpfdsjbpmf3vm4d9kuluxxkyo1uuu4aa1i76hl8xizaas0x4h5dgxz78xdxbmhbi6eqjvvkgwn55ii3ocy40koue2g5nulf0ao8nf2re9x4nfiwre007yr8lcqfxr0igt5o0b9dfubnn3ydjuzst81h3l0r0r5izzt9fr8r5h6jwtvylitmj7j7nqd01mpmc3g0t2opgdg9u16407mbd3xvjk06sn8c7i6ahn6qn31xlv4fccmkft5zlnjl0ycnd6q5hgycx2osqviar2sqaya3mb2bgdkg71mwll2r1ypxyfzpr5cwehpmvfhuilekrwulj4qzbtbjoh7i8oyxt0lmwngwuc5e8d9nmm22gj2y2o39ubvnsdi9i14jh9gcis5hy6a3pdokqh3rdst6sba7r0wh9llym1e5xgg30jpq4jyrkk4vxe0khq6gpg2abuzw1ojiq4nxq4fgg1038dyei7w8iaoa4v196c8isbuzvgvywam6hwlqpnshiwtzrmeu4npqz98m1rn1ga9k7ahcqoxdpf0kdoesldi76qzoujz9ki04m6292xu932alfhdfd610ss19ebtrcdms7gfmfuzqqbhjibe5skiwtm3i10r22qyp6f5pffps2pgleyss7fi09c4pknh3ucv0o9ys9dcdukf1pdejihxb9ww0doqmpt1nrbmeexyg5n1952xs361tx8ruyf8a9sq0ravxk038aiklc2ttsqagbfjailht41ekh1vg7dtwpds0ti0cwv23nk9v07fwdc6zmmwqg2uehslpjfdjc5fh04m3tcz8hjiewphc361gnrttk27gjtbvcfhxhgwsf0pbl6e7p473dmx8ltj5ruf9zxjp2ec6qgwvxk0va2tw8wjoig64ae9i0n015502syjueoefec4if1qs3958zci58n6ixiq3dd1yli6bxluosx5egrrhxmy09ykzxqkx4izg5mm4hrifi67un5to97ldgwopsd3mixy6uv680njhqoxf9dgxgeoc3v7lvwq06eywdgsa00qotm9wbzrcu0u7u58n4r0ja1w3sigzw12u5ni59hkzihi1ezo71upkgiyihjptcu93n66x6634tr53di0d5cjyoaz6blayhu26fke7j8ce1dlt4afk7tq6qj4pwa3j4yz5e0t6pcnqutvmwgtk0tfgp6dpcpt72967ljg62n7yc33fzuhwq89kb9q782owngupo9f6nza3bj5g448co49t2r4wxioav5prwsom5svfhr9qsjlho03wzkzjexsxcat0c3a3jxlt9wxvm0uu1bzss5n9ilflczf8sp880ogm34zko3qhuptwl21sjh735snjwvlfypynhzj4atheg2plhiwqfqhlk9oqsyawd8gyf8b08ig94w9fnjupsmrd9i0wrds3a4f7pz19vofff8hwmxryz7cbk7mn251z22fuygohykwdxxm1p2uqka0luvszylwbqpvkws471gc0oulphrk9dnm0i0dhklf7osfm6m8y87qrya54pyrrebzjfmd6zsnzgjfq85uo43gdb50d277m1xn3ir0jzdn6syckn3yvpb5c3rsoawt62ey6qoxke71344zc6mnccjilo3z56r18godqjhu5jgt2mcs6yd54vsjrb47h5p7xnpp4xhtwqpzzwh3pae5ycpfrs4dmx725dy1tnii6luon2bbe9gdsw0wbyj0dxitjdn0jyj9wigre8wlw848mnmjf0e2wajoyxa4da3aw1bc9ewsibc9w0k92msrb8qyvfmvir6ukqa88y7oc01uaukxsgbbb2vub',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 4910502069,
                expiredRefreshToken: 6395087599,
                isRevoked: true,
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientSecret must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientResourceCodes property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2d8bbde5-e0d9-46e8-b0a3-13c4fbc91028',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'xb00njyqoq6cip7ppye1nn093ci6vtxf03ubz1cgfjyrtj5p486snbpwhttcc50uryi0pvog0rpjzrpdi6rto1wrborlnrltjmsvgwyasakx3sad7cqdrwgoospstbenejdscvm5odt387jo7uyw1b6xowztheixgr7rq8fa8f7o66hrku33w8o12dfbgk3p3fcwhmq79hitnpensk18ixoaj1f5pklqzlck99ux949n0wl90wucd6fvjbljbxv',
                secret: 'w4ow5pi9jmfe0x7vd57lkc32ksat7w3w5mldarcumau94vxmstyzkrntp1e3odfxb06yyaxqxmhmiv5ewb7g36uwfa',
                authUrl: '4cozmylntnb8y5iuui0rxvsxm1atbxwanesidlgtz2qy9jeqrvnew6543rrwjym8ztrqt0t8lxvfqkxenaoym0layqkzh7hj2ok0aan49frqkqawxslsnmt6ha3bummi7muzx0xlvf67nhruvbc4ugxipl2t3q1ics9j1suuex8dpilslfnvc5ycrbv34n7i5o2pqdoj6nsx1gy5i03brzxnc3v9w8azpnhido6qkyfxdv12p59zz6vtvxw81x79lu9yh5xmrx58pbqhbtd49kvdrhkiaq1x3e540h6b08gbmgxd3g927fg1vnfnp8vr311rslpf09mxbedqj45e4rz2el84976ajjc2u23xi1qyugtut6dwi318wwe7ssxiufy9l3eot4bl5op8epwopokw4mcxqsskqk9yiy18emvo5q6gy49jz5n6mhjfv8lzkkb5jp7ihlutxhqjxbf6gbfouf5bf3ta9hat189p536wig65oswuho2a2n2vv1asrgk38jznx9fmejbtimuewldfh8fqim3kykn2wdp64jkuftc90277cq676sml66ta482xdfu1qfxkmtwiqc00b2l6e2lkfmzrkwnz56bcn07gv4r7w0rfbc6wgbmc6b1usb35972f1r82hoeo99nteux3m1rzonc7cnv0qlxesmw8yggkj8xgsscr9ydnok4vme8tqbf6fnslgcckiwwszauteh5wljqv3nk9g6d44rz1eu6su0aei9wz5phyb9zxs046ber41lwiapy0htcpb2pf301dv8u3hczqk6ro898wngy5p1n9k9c8dzoqbd2kci8qif46zh8lv3kgesa4x6e9drf354dpxhx3rn34hbxvh8ma5vuas4lyjndca2jbpcu45zkqd8upg5cjvt4t0e486lf5ua7y6i6s1vtyb2kvhs6f6lnzwhw6fu641a26d46j5kvms1eigh2pghe343kg2zfb0vuzmrpdry9821tuyxdauril7x29myrdsk3zd2o3qfkwgkpwhz77r703895o9m6q2uul4ubzgl5vvmetowkqde7831h5umv5lvb5j7sd4y11pf6j3tcl00d3nseilf6wc4o44hlwhc2br31c9sk1viaiahfuzyu9vdu8qmjxjzb20vvj9q5t30tdp76fi2r5vvpxug7ulsccwbvtfc1xqkfrd0y51czxjrccics17wnldd92ebasf2mnfy2dvgvgwl2lhum8lb6x0ja0h2xiq09zkkkspr4q04u5yvpcrt12jxz31x0jqosyuc5kna8cq6pprhd43kraprug6dc2fow9q0dvdnm4pf9f6np8a56hn4dlhhwlcpk0zgmjhksc94ugmlixjad22zt2viqkchyg1i7p4rqmsm0gw66q8mb9pudiuccfuvjzg048twyjzuf4y2i6qbs9m7i8azyxjv631xo2nv0nfewr2xslp8tzm5canzkvmkyqw1b2rqi3w62k044j15zt3k2kzmsab6612m5tmt3w64fj4i7mu13a9d930y57f826kexcwgm5niyc04yq2savfvwnkilnf0dq9gd9etvwfqiznlepcuz9irufba1g9656dk7y5j5urcc93r4f3c4753abb5qrsmbh2x4nwd1ocihvenab21p7ag8bnqwmwx7cfqw30izjigv78aih6cb04yka2t4ki8vsu5d3xy7irlwdghxmvzjjqoishc9l0u1micneannwav7dxll6gqfl60fdcr8oogblw8ovd5ul6sz2kxpr3hulo9umtimrno2sbsr5qrw78egujtyihm977skfeqzwitr3gstsulr520gpwfm81hm2pa8vf61585pw11yhfjeeq3f90q15n9aw7awr6z3evddnu9iqd71nunp5admk8a7tlcp5hqfag6wmrl67ikgm2c9t4xde62huusqyhg6trrgjeb5f61o4g8q1lc0zar9rtvbksaoa7mmi1gtjul5jsadhga930d1ff2yli3lxz80ay80gfj01sqmj',
                redirect: '6jbmmcrzrpeuhj9r28bxd2kvg4c2a08gjdvuqusqk39cftfv40r9ebpkuxspktpe8nzy2dvfyfdbu2qtrzen5v44t8rbp9bqwzcadu3izepbmduw3xa7bo198ko7vq699dmnjwro2u4mr82atzx5yln16z52f17bt1mxw41z5psetu233n9nl69z70f79saraf2vs3guedm9b0d6iqhrlen26c6fx5s7q4var1m92wce8t05ibbj51fyoefk23copduci7futvqkx6rp81ihhc3noxqfj14artx00otzfiirwgo6rekw4i312wgrv0c7qrz7r8lyfgkbd77hmpfg7v37ezyxfybvv3h3bi0b9fub3cu5qyvic2recbivnly5nrsrdv9167rqxufgobe5ml7108hqwgri3k8dr78ppy6ka466w5ri98rqkw75rzxcj5mkktu46aft40wupu2dpnijgr0x7ujw35kpa01zev1c50dbngmtoywu0rwkbt8hkwkijps0su5u1k3yjlcgqti0hfkwlw1k8lqdqs3pubti2lvmxp2pnkb67j10do83a2vi6czhtwkrm6fubpu2gr4y42zwcekw93gg1rjzaob03197tip5rrt8z0c5z0n8oguaufwwf748zc83f4vnsr5tmrtqacr7446txv1qrax92hwe1m5zn6j1vzubrcojtddrf3ytibedcyqqpunwyxt9tfirxffmefphzdxbwp3qq27e54u9egkks4sxo2ljijouekbdtvacycu1vqwxe4qhpez2awgb062g429xyc6aulaqej1l8ozxmcjbxtn1849wer1m20ynw0w0jacszmhrjf1nlx6xvs5c2qqxwn0jbc9zyzsh0ip0w1cl7f5tlc9cp1qxhp45atr7at40gud32bfscpcnxym605wxxilwnlcrikxjg6bf3h08ktwugajucd7hqcve5klvn83jknkfuglg6rggonud6qdb9a9hrjd75k1rkr09vdowcwobzp14vfd6ctb7epjz0x3b8485hv5mc5rffktbjl1hmagi5gkgyscw6gkg6ulqsaveldhg7b88q5p80bsa6q2z5tx8klbnkts5ninv9ps3e2gsufb3bi67n3x2ogm5xeke76fp97ckxx2f2pybw0k2jxj7tlc9gvkg505lsbqjiy9zjfnk3lkxrrgjqaaqtup50mfgjgj3a2j6jv9zexnhj7t6zgkqhrcrze6v8gclxsh977qng8c61skf4d9c7h9ffbn37nsyo8v30vmoozni8f1n8g0zj5v4igmkburiyuxlk1ivfodbjkyxodte1bpm1udjmq3qivtrik2h6lx5olmea6b8up0v2nxjj5tbpvcsk3mantn9dtdmx7ui1dnttet9ot0tvjw1wht329r72lvqmknnrjkn4xzv4nctwmjkojnttrk2d6sdvcblng8o7j912mdqf89ygwlp5xfih88leez3qluthyah6pspl87eh83q9nzwcn8plc9ybet06psjyxh3665k1268kmeud2abpe6ux2szefnfqq95x92veagrxrhvz7cv0ernrhporsyplqnw9w6s1q3jmbttviaplkm2fz0od8c6ijexi61mjvm045hf2jufsvnjh8g68d5seylsgui5d6t7m57itp5rb4dngdbv719u36yu1cvqi1t8kprwxjm244srhnm0iq5kgay8h97fjrgyt9df1bgzdzrymjog37wfmbfxkctxmd50tui0rwrlgzugul1jquntckeknfvcke3es2r5ie14tafkqmfny4mteifctb9jcwgr8e0wb034s0sxqyqhozkhzvtbsgzi5umcu10h7ln1jc1ipypbmdvbsz5kebo1wo43fxer2k0jn4fcr7a2zpx98w38v3cxtz2d8gex3rk6gmnyf3zg04h84ygsz06gzvsfhz6lowub1iny1ne4okied37t6xk45k7pyvc15xxi0sls8vylxvjcd0u3y1f1ey90vs5zvfgkowp8c835',
                resourceCodes: null,
                expiredAccessToken: 5035862949,
                expiredRefreshToken: 7536897680,
                isRevoked: false,
                isMaster: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientResourceCodes must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientResourceCodes property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2d8bbde5-e0d9-46e8-b0a3-13c4fbc91028',
                grantType: 'CLIENT_CREDENTIALS',
                name: '9z6xzrr2muz87cvxot75tpdl9r77fm4twwnmuftfzjrv1sc6k7stu1ywpj5vh0n7rqia0fw0nkf96okrl28nvmzsdmus48hq714o237urtnswqzodggsf25g0m4p3f5zd5dh0k1sg9i0i2julwdaev1jxp5c6s9uzttxgc2y9hlawi0d0clob7hu1q9piwnz19xafu810914hui19j683nvwv827koxqxub4xt997g7o6qslkismk1nxgxadds0',
                secret: 'kiv56cwektxmkbbjos0sws5wf7jmu7ly9lttpeeexa43109r9r2d1jn4sl9cqdksc8z4cxjzjioim00oyz52hisi8s',
                authUrl: 'azc12d0s68ynkni7kuyh0wa9unfl8vyh6gin07xztuo0dymoygl6qrrpsa9g7uhc7wz8ucihe5zoqte44s007d5d435y3ai2jfgu7d7d8wod32boo5shivsf8r191n9t51zpqldtij6jxfxbwh6qe7q14emhcl4wowptgk4k8vw98gpl4xhm8tnwamsf9n1tnyllgxli66bkayts7rc174sptsb3s1axhp82tvim0fua9t5f6zl03g83yklobkzp0pv5jy9k62zlrukd3vw19v62gonwavt2n6tyks2ut321mqclf3016hwui1zwabs31we8hpyzkdq47ptd7xzib93vrzm4w1v9r2sgxf8op1syppivzl72ds17z58gyyq5w68de5xv9275w3svqbd6uyxl92fr6r5q94apn9mrz2l4ozak0x564oi087iulvcqc111hnm2uomw7becninqu49nvqefxxiocte5xjkpmiral990o97s2685y6a9k5bi4zyhn25tsfa067w0f58ul00jo47eh9amwt8qwwe8qaumgkonfvdeoo9dn2ry0bxcrfrfqckgq28cni7jwvrazjl4kd2j439eskhzehoo30j46l847st9qmq4o77c3pjbm1higmmlvrf5bg61830sa8grxnxinm7v59nxbvgbtjhyps6ixhw0zk28xavjx3jepithc395kdldqztgowwe63d4h2topqshepngzathn3bclwwv94a4ild0pf7sms9ik2fl3cbezuk12wplu4fl8thfrrf9g08f4axqpjw5wneoo7d2jlipi3acydppu80tjqf3o9rlojfokt686c6gmrugulf6rkhhbw3nnmuj0fcua9648nrj05b9htosj2ydolto2i1kflqy7yq7yqn5wur7n9snth80rlc7y5pktekplrz9ti8sax5wb5h7tdj4hfi10w3453ybt15zzejl60qun6uvqg1v1sjmkpvd7xvaqo4wixiyzksiva4apnvll0eqizijozo4d2td0azl6k8rsrqwabeel223gig4y3vv05uoijd5t8ygrc1nzpumvssnrv5ollaoo4nrgf9sp2be0w0ikfxsazyfeariznsesgfn8mpbwwizddxz1pqdsl0cdagl2wabld165gy3sij3vn5xipmk8ggrbm3sfm0dhmiyoy60xmgqrqbv87vjm2rtzn9gclg2wpc1tdt2rpei3r531t84axqz7dc1pw8bptegxtbyxqedc09sy4cbf8bij7r9llo7mekgkuyxiyevcjwvx0etdd6ybkvv56zb9hup9esd7q2fxe8g8x7wxlm0ipgm10jdwk0eor9dw7gdzdrwooa8igztjvak9jqh8cz30da9ydp16jcdl0akmtji3pn0juip6ux8x90my9ni8ej67x8eb96sbdb979ti4zlr2c4nnay5icz7op3wj9n8rhl9ot2jrjcfef2w9o6lsjfy5s1m1n2fkifioxl6udvfqswvu7q0km3vbstxfo39585c9stmtn92pendgn7micyf1j29fp8k8nlnumjmofzbc03gxwdj3jns69o65zrm0z06ysorzx8ruaz6f76o50c7rm8q9csmbw2k6hl6a3vsb3uqxqq7iys32w2v3cstn0zg2ly8vm8ewcb7b07pwqxlyivk8jbmz9g3wnuume94uhe3f701aynocp6iispbvgs5ddtjx17bv5io1w6spej6qs6c6g9354m15f5lvwgw6gb39infvumjbguxx77hb0psmvltvtgzl3xkc2n1pyxyzj1xarasulw5uxg1b9h4sxo1r52mgdpi9tewog3aacqz77vod8abs2c6g7p29kxc6berfvo60qnf2hpqwl6tt1ugjvbw18s4o8128dwpc2sndblrnjphn6f3r691t821ck728b97brprfk55sistry6qskurrfwbgdta8kf9w4j0y5k0k2cr26td7s7ct48thrtqfuu1rralexfl7ty5w6cykc0btr6j5u35',
                redirect: 'b1gy7pxmj0m2tx0wyk3ov6v7oz0avspnkrdmyniepsg356h6nyiwgxne10dcsyscoigpsyvtdqjwgz7qdnn83mzu25t92erq7atct0mr4au0bky5t71v86lb7ozuqou1npi6ad7v1ncepltk6lk0a9894a6nxyb5xtpudor7ytaf8i60lv8l98w9snh1yqeegx8db5bw2xcw38x8ngthsrux6ddi56pghy0gmeb80optk8rwvzqrzt10bbc613v4qvrwupqr3pibpbbhhd49j5kc72p4soqb545surdsy7z2reu0gy6yvtw0kndxpdbgnlv58uv8aiuod9mzs4gykdbtwj695xocdi8zgy8buekyiiohzchldy4w4jacqwqt1uhhtbiot3adjavvxmvenf86pm32cyxywdp7x50w5qirwxliedygpqhz5ukvgtg0dt52mwwyofldaamdbbgudfbw42ylygjhwim6rs6x3w5tu8a07nx7yzjnma8j2rr6s7rbfrdv73mkf3t2jf5oevcgc830tt16ynz6i65ab189mqh85o4sx5sqkoyabgy2c7alyg423ww2lx92j8gzw7pcy5zillq6s0qewup8io2iamtogsafluks404bz81want3t47ysd0gx37ve3wfpg0u8ottd9e1oxkbv4xlrev8dtcov2wr04n1ol89ylgjxsse74a29lly9h9t9wxkbvnsey3ueng0y6mhankzt73ni6ji5rafh97e21xgw7nlgic3o61pywtn7j17tgykgamf0we1q6mcasp54x399inkdckwiqz65cjo1ze4lylj3b9tj49297yhivvz9ohifw9qf3rt81vr8mqt928w2id76iaunnpby5hteo5tdnfcnyvmyj01a83dyc7mqgxab5g2nic8y7jz72y9vjghzpa4kmjybadrz1y6x5v4c307l15z8rd7zszqgxeuxclcp04maglpbbg7c3ec8x9zfcz29tsikhkfj0nbyqapnpkzm3blmzca0810utdj0sw2fcdqc9ask94mpk6azdz4x9zc54bwefiesbdla8sz4b4x80p799yem41q50huuy7pfho2sdqgfobgmn98o6kvgkh0dj991lfiuag6sjgmvgjwo55abc39w2pajcj8poibjljw6ebbpbd3fb8kqlpes54o104cheu0nggtrz8pn762k66ilko5pdostau2mxzuib0moeu0olc7aapknjrybc5jbcfkpkf2j8w9acomk01hc49557hnxjy85qdlsg1zew2mqzzscztaiu2i87jrzug92u366h6kd11bdi4ev40fv1onkmyaxhrz6odsvf0wg1vdv4dpqr4l4izk0go638utsemzyyd33k2cnip558ajxxgivv9s8pwcxnbn1fhxsh9iv6vft46hgaap1xfy006u6ilzgstt1v6b0nbw7m1jgvr9ubybvlo8b6r7wgj1geq062e4osu3pe10mw5cpttk178k35fculwyg7nsoqupgabujtaixngyoo4bt37y3dnrg3v53dw884km64gu86a3y4ykfzfs8q0mw8yzmcegxj2p2ldr23ox7qq9pub907qzcmj8vy3tnhtnmgg51g8njfgmx3qgxgyxksxjg200wbnzubdpbegpsiu6ewm135ahb9d4z8mxencc8n4qjjj0pwrrm5thipp86nsi4fuh3x0r7n2ui40mv39s4jogny3pfh2cppfqiy4jecowvusl37tsf4rr0l8apv6yd8ac5zis4xvxmi6jrhmiu4h0xqlxm70iy7mdymcb890pawfo70aocehg4zl2b5rq88tk1puvu1cb24r0wll5aht2h7k7y0cr9g2tcsqe88qf79udozkq3fw2nhjcdvv43imfsftcom7g1ceny95tltke7e6wrfvshbscwvx8rwqpq2ln25y2205925ar0rfu6b9kzlfan776lhtm2indj81lal9g2hk4lv3u4ubei47q2k9bj7l51abpy23q5e1xftlu',
                
                expiredAccessToken: 7811940165,
                expiredRefreshToken: 3150052963,
                isRevoked: false,
                isMaster: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientResourceCodes must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsRevoked property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2d8bbde5-e0d9-46e8-b0a3-13c4fbc91028',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'hdtnms7t4num57bpdeb8iiq53lwvpfqq6ff2zqkk2t5vv1vv58183w0uxkfqqghh07bv049yw937x7a6l1qz3lhfmgoz5qb1i8qp6dqvpu077lyqtz01zdjmx9l9o3g9jgitz9svnpp7lsg5tajvfcua39emexnsy0kfp0qtbzqyldwvhbkmp6sxw2kac7mcqahduyi69mpl0f4nmqcny65gm47016iyuws3hy15mvskvd7ppg0comkhrsrtmmt',
                secret: 'hdx5wj8jylgp1bhglrzdyqh7s5cfz9xqfemirv5ovs6yh44t6denncx32vyw0sbx0jae0yny2mbcmi2kwodc773w88',
                authUrl: 'l2dwm3j43bmkdwcagywxhy1iwpenzi6tycqpzk9tkbu0e4j1j1soj2xcc2emw4abnwgy9x0imduumyr4qdf2f44vkgvg06akzz7arwmngul5rh1t073t4cghwupkk0yjckupovuq27p9sfcnu867i1dq4u88isxt4iljmssmr6ac2dcqw2kxmd228mghchalyxmb1ug9r8ob50kn1fta4p7ilct3roxwkqn1qzol9da3zeb25k2git4xvlwp84xdp24q0ps11g69c9kzpq3xay3m4nenzbqpzbo1obd470k0kwny5v4v285lz1w8pa4kxjrvuhw2i92rfxy96webzkkjfso9yks73fi57rbdw6gjh3md0uiqt2jmdpn0ilwq7qpoxakj6ni6ntz745rfaspa5pib5fjzpffxtirwa1kanw4pjipgozdybv8m8qroqszgdv3a0rcefrzzke7mq08643g09akwtb5rngr3js7uexzgbao6g8agzncjdesb0jck73gh8gliv027qtbgyosh9khukaazriyhr2b4vywv14selyioxrtgzg5l41ike8oysmra4g7cmqboyoja3zrp8j4mxc0ppax34az9d48fteaa4x2etikfh6m7p1afl82aak1of28xfxxy5yl8o7xbh2s0vxus7nns0scdi6c8fnbz66udpgtxwquslgdnzvhspnktqgcezvh6t9b4ggnpardbp9x0zrmjdfqcml9bdsv071mi5tyldzzn1crtda78be0wudgadlc2iu0ix02fadfoxndqa1j3ygq062ft9rx38lwrk3irfofbgm9zurqauy51rumd2di1s9uoa6d1bfn79rr5gzav4ppehtyqw5p2713lalnfnwstojp7j518xb0vl294znzuk1b78d9eqnvmxm56plg0nr7ba8oq5cs4sayw7keqvdyt9or2ca3gjdzx9wdnxr5ze2y1ulqaxpv1ov1xd64p6a9xlte6s6dsrt9fc0rmjes90zoa86qi98t0u20hembxyeepsd8gophwbytdy8m4g61j2mhkolopmarqagxoihz16ihgmo77ltdu066mhz6ubhkblj6pdle3932cud3lmw7arts64mep4qx0yidk1f69vxhl64gvp4ht7tm30d0sxkokes45345d8x95ayieezupld618gr029mys9rp5d107xac0m49dixcwqaxwocpg0fyylkh5b4qxuh2jfjfal66i5ylqd0fgzx79eqdn02tmrxi2c3pmyxw83l5my4vt22vv2nisdkkmqo1uqhmxwkty91vqwxbwh8lvdiq6szzhf7nm70jgiwfvyfwgjnjahzwro76ybtwsi4vz8f2vvmk3vl6duwrlscjuey5tt00v5ia6w8erm7wl4tmzzmm5vhyv8xand6mgvytymuky340jsqxdl70ks48o2y3emu4ngnv1983dyevhv2ngpcrlj0o45h7fngsfkpdogwuqasrz7ugpaidnawiw7li1ys0u4scfcb9yy7dpdd7iuqgzfq8pje35789gkzootbuzstimlvpf85zmtmxcmv67le1nmlvvudn9utgd9bhgxg8hjovss2mlwd7cabhhp9gjk4peohp1djofb9pl4adlwhy45iv2rxl3cpqst7s103ftfm5r7eq68r54uw8r6v896uykmg9o80zt7i169natqrfnmjik2agnkxjio3ny15n51q4vv2kfk6abkl0fddahquclyreb4xrnmpkti8yalxcqbyoqgutq6hfm5yuxk4if5pbkdgg5alwete112f82vg91665uoyp6dhs9cblveaj21e0rci7bqgzb0xyxmcyympdonttvpxflh18u5kiw6bc7c7vynotj48983px3hxvpvzxiw48o5weoi7zd9nnmdy5vs6kx649j5uf4l901j4ibodd4h4nmudu1zjmt9906vw285s03cdkp0dlswektf6c62g5mhup6lqp5uixho2vtlg9hkmstxph9kpza2pklfef',
                redirect: 'udypjkqv3osf68yqqqm6ma3krh3gszxzxss2ze6ubsr45765yj88lr1jznlpermcwmpmn0s1shsyn7prli1ptyi1v4m49h7naufzy5bfztwdti89zf7s1ehutosiyybzn339i94bopsueey3v1kusmxgi4qntptzltwaa8uxhko2mdvduamvrc5mg4q0s5zw1vr3bf6hf9lkkkue1xjywntage2vhg0fk1ogzs43kwg3j53tyo89hb5ixcbgojxecrkyerq1y2djh53rp6dzo70vjjpzhbm9unkbd2xsrnp3jyafrxdklgwwd2g0gi78uv3b4ziu3k5nd4gzkqeul2tjbedud0akvm07hp30sfk74jps5a8sen30smlde6ez0ac477uerts41iadxwse0j7z3y8dsh0eczuj5l6mk74dqki1un9or8hxnhlczv4ojmejnhhvfet7hy365j6ju4ddvd3c635nlo5ru3b3ttlqg26a9hwu3dy5piwrgv6egmik5opt0px0r3esa0d648xem96e9x42erwj6hxx1iyshmpjnqfxhdc9iehebfi85r5urgv0fjpnfqp3xvpoagxrb8h6a01j3k89xtsoupp7h9fajvalrihfswaa6a8dsq0grdzguj3ld4swd6jqp8t5swa1coeu7erh4dlg8b4bnogqde8f7jqbh4h4krgljka4v3tqeba09js8pshwg88yj9hrldeligbb0gptbqjwfean7qkx2t6gxojzjz2qvw162lg2whahfg5q3zv4amt8pxzbhmsfgcjfag636vdwr5omt0n0haji57jlampd33rpjzmy6ptbwc54ualawiq9g6con46dzajaq12xivacp2i4pj6tefo5tnb25u5s7gnjd6bh7ppgkdjyk7ugt0nev7fgt2gz71nyk9bpokm5u5k7mxvn8hxohfx4ycfiom7a9r39upp36ap2zgd3lt41s10fyxf5jidpmq2snqagkaq5sgrw361fs2mjourxrpfe0phtgi99hics6rc08itdsovhjslb4q63fcbzlj4skxkk1xe2lxyiywggyspl7c9qb7pklrrpe001fvev18qokojo1q5e49dd2s99y0umf7cpxc0bccrru2dsibi42f347tmc9mmrz8zz6ik8ilbkdr91y0bhwcdlc3twwm45prj6fj71j4p9vzbet19fr9dnw58uix95fjdhgyepr7dn4xxnxads11w8drfgqenfjsdipuorw0e82cc2wsj1ke5iemqe91nyqknsuug3rxit0rrrptzqwkjrpgmwry2jvawm7chqjg5g5c7mvopinw3dniw04gynyg4grzwaw6kcz5a302roaebca2wxtnlaymnh06rn1eo4trywfg5jyt063mp4w0jqqkkh6dss81dr1a6ypobdwu0c6lsu1yyikw5go3bke5r0utdj9vwhzs8b680wmbr50h94xltk07v7qzjo70tv4pjprue3b1xpntjjehjgl0cw5sf3o961tepzxfb6hj9ttf3ih81vgkcjqy8g2ew1cbtzgj49d816r7lx3rc8ibermxkygtc1k0vc5eq1al6464aftv8daitehgumcwwpcq1sg6ofsqsa54d65pp38oa391gczrpv267qh3shht7s7nm5u7uyrmc9cp1gc0db1kkrk4mif7wq52quhg0aoo6t9q9n6fcvzak76plm3nviybflngfwkywxv8duyr0y15qe26c7tgukh4cdsopt4vsoby8r3obwwel423kz0rcd4hbvhve4i5vepigpr3j50moz7lt285itimnoiozhfmwgw9iqseh1ym3c3q5yk2iqszvzofdwfqy6viiq8jtelz4l0pusmlhaz7kpgso5dker95z8u6dy8nq89niessk1nukpm9pqo86vx787cy2e9emi1twdj36d9pncco73mc86vfiv51d7ho1mjalxke39urqytlofjs5z1exspuuy2v5g7stg9ndkcvtcdp50asmm8j0vf1ql',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 5731565951,
                expiredRefreshToken: 4644751894,
                isRevoked: null,
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsRevoked must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsRevoked property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2d8bbde5-e0d9-46e8-b0a3-13c4fbc91028',
                grantType: 'AUTHORIZATION_CODE',
                name: 'gb4s3hw43c5f6zv67um47xa9ljibthxhut04qymbfygcbmsud809m8k5af64tjvzsghwlqh9dz23go1xn66k3oikdml66gtby7wkzj2279i366fw2iqcvviucmink9xuewq0ir8hkrdrpl2vbca8jckzyhkonrnacyjii6mp1y6y9jwkwi0yzuz373jzddh3zwvycxxsulvd6rze8te4665215grp583v7melrrypjlvle0w1w7fzq0c0nt2ydw',
                secret: '4hal9dp6vdz44p6gi4vyr6jm7ir4mgy5gi2d2fwq3p7bfyras1594jhap0wbw2q49paz9tqyl0b3lkk6xqyssvua89',
                authUrl: '4g1dfq0tfk02zh7k544v2nb38fslsmh2tp2rg25h56gfqnq8pjgkjrzjx791ymrr1g7kveqyjlb7u0tv6auh3mots4ua7l7gcf9rlk95tg74y2wwt1zksienws8jez8v73vu85naz9f0hpkedzcz42i826ofx21ixnhc2lpx0datt2ee3abwhlzqm7n601efrhnqxw87qysebe29mhv1j7x93oziqztu8sk6hvstxzdxcwdb7c0lm4lqs9nscmeybvs8ylngkkdqcsib3mq1v69pqbwb54q7hgapd3iphis5v4qrs544uahy2yv5y9a5rv2akyjjxaqfiuhj9a2sgwcbfc8fdf1xgouoj8799j5juo9yuwa7z6kexpze7jiz8mratagv9s4iex72cgn40fulbyxd83f45y9hh3qsnot6mxfmh0nelcuuac8ioueb6fek3ho7n8zyvps6xbrau9xtntq6xgov42a4nvf5cc8gwgzh12osnzv6a1gfuvv7qfjsrf8knmnqjkv2apayc6r8xr0u6l83ohzrpvooh1laxsrsh3dlqche95p25v9kp8bejy8t3f283gvfwjj7utgje41bwphh62ihh9depqzdfuckstba0w7tdwn3i4nqnts6xzctdjgpqax3dz4gkaoz4pgyk3snq37xzprkvctfs3d1ovuaapyzgmpi0kbzix668yalskq2b9m6zj68e3ri5zu7byvmewu0r8a7e971odmndc5kceps245m35iuj86p3z2n1g4xmv0e00tlf01wogafb53xp991c2t8p6n2283r91441h78mrb0kpnp6btw0udfaaupu24ztqvixjbp1x73laf4ninqzt02uqn3f5jhy13ln6z0k2bojvbl89v2jn818bd7eruperj3xwil3w6sro65ckxi1wl4rqq1u6zsirb03r6sf5ficjv1ec36r7jdkzpztkeeav58kz81gwr33tt1ofi7332pmjyfz1adou872si9hb7bk8cf0uqyasqjlpqpoz9s3ymjgc7kply7kes342by9rutzr1tz320ilsf9gtqa8gldepisg7r1d6ho37eu1ivf50n53umm3jj0psz7kfrxv5fo3msvdpd0qij894dmi2el490sy9612b65qvbpw4kpbly9xfmhhg6ozbqlp035nreix1wuncrlzi7k07bn2k135mx4cgg5rn53iyhg37ny3xrfpwpyy5l1ppxys952q0byotwbid38y3unwhb5glb1xi0e1pe1inz3dqrjsb210jahxw5edrei1f0ajurg3h3onhl7xfx4cdpilhcjdvk5xsllbj0f7t5l9455ehhlxwcdoe2we3p4k1e7i8uogukpx5svntdx1cn0c49rsjxdejkot65bqi3lqwysoofzodhbpi8xgrk1alwymce39iut3gt4x7x8kp4fp69fa2jmpxzhpwe9oucjpycukdikkdc6rv6mlyhuw31hdirbhd8jwd8v8tz77j7oalt3ri9fsgioxv1l3y5h9a6hjjzi5z6fvudb9vdodz8srf3j2vd2tof58w729z9zxt1nbx8jespy3c3e71gjnkc0yiin2gg4icmcn69r3nozqlw4w8co85gfvvxzd6mh9uv6192kc4sajbh9uxiwt6nxsivem0yv1v1xcke7ng1lseqphxunieqihdqhk6hy2palsfeyv5ntzo19zmstvt2nm2r2w0o3h9tz2zdie9uulw1drzw7rirht6z22117okdyt04xeypoxert7dr3xiv2ueu7n31zvjy7bpd3iehn7i8mhvy66gj5aszlxcicvj6ksaddc0z7qkqzz1ssm1q2mg1837qvjsw59xwy5zvw5hzbc85iqnngizjal53urcz4n1iqlvmis2v7hrdpfmqjsa98afn7o8xgwmnqdiskuhpgix56smgo7977e0hqne45w4uvuco6vgh3revdzn40schmiri1e1lcctiz08n9e9p4asejv07ib7e31wohzs4cgr4wfmn',
                redirect: 'nkgwnm5hm7ogmd5uyp8i15psv18cm8419mt5g4ucq3xdj19nk09bo3kurey4mhbi1l4f33ycrt9ag51k8nivoqvysi38vumnrq6158percs3rw3z7d0egt1l60qd4irvdf0910dcr6mi2fk83cs98zh9v49nsv474ontdjoofsvfwxkjufgqqv4dqo1t6lggr2q1901rd6fh3q9kgtrh81q7z22tv8ola9373q7817x32ezgkh5jkcb5h1c5t2fd95bezwpmovcjimh0jtb1sv8pfcfsuqrcnwqr7ru6nfn0y5u09qdejr616qmdrd4tzkqlslyyxoyy0dj2lt9fdhrqnov1dkockt4k7mdi7ff01hriqitu07rwunxfxzaei972248h0u2ns12wncyeh4o9x2gxfce2g731fwo6vg4zkz2r4a5ogzstchgh1f05xe2329gocy3vokmjz5weyh3s4ckbk1edmlfggfkwhjpkzqfgtyow57hie5zi25vq3f99bgwzc5bsxpjdnkres5nk469kse7jvclpt96nlchjqwanf1iy0n8m2h7r97yoqbwxhxx4cv2k0j5e6ejwlpse2qgnrcxg7j9topi9nqf9jrzearqjmmzmpw6ho2bruo8xrhcc937mkse346vng0ohttimompsvovb3al6iuri7sk1bd2qq4rgo87w7rl2nqr630hdrzdanhu2xh73s179odpldcksttn0a1luotjsg931a1hiqx3c0g6nod2180tj9mkstega1weydqkd2nsq97j9i9mpu3ai5e0mueb1789zvnc2eylblbgteqieczjj3nrp5zkn3p4kw2xlxl2pygpj8xmg2p6dd83mzoqqa58nmccchln84f8c6zgx5kzdk179m2s7co2ka7zor1t27ks2zknfvujwg1dys86zd5p0xlug6ka3wugfbnkk1hdhcu0b0hzxba7pmscap6183ut70jfsw904447lzwqa06rdv5ckf5egp98qsqj06yljbla69yk8hz1nfb9joxedoh7vg0a2pihfsyls4z2q5alw48falegiehyocetyag5avs1swc89pezmyr86b48sw5ombpxsiiwbtw8sx8kdqwu47cs26f4jg1sdqhp3ypn78sb2wmzzdnzphfawz59q7w2n12q4ier4gpeopbajqbdea0292ojvnxjrfso1zinq8srahjy5lmap7j329p9fqho08c6tuajbwqj6oxuzdtaub0srh3zwao50uyv7ijgrx5uiql0acg624nq1lxa5e1xts5ke7d1ia1op5ms1vh45i7ifyi5fjpi4jw4lsj1li9np7uwgk8v17kswkiej7hxc4iun15dwj1dh2qjd79rk1p7b2kfp5e1wfssn8eq8iguteobz8fx3pie0f55v0yh42bo8htm1ek3h9sfci4xy0qf76wbbfbs0mc64p7zptssf8e6o5f1rhqi6xkklak9qldvqmm2s8um4bzk6huemlwi14y8hsnkqqyx8wl6p4ujboy9epdkxrslg9ytaq6gxor2rpyws26pi9et201p4woe70bbw9u3nvj6qiq9e75z9yhws5oldr1rs604pbab5et1hcwh9r9zsuw5ae8qlitvrug0n80dvhdly3izezyl86zphuet61hnn9cbsu4nysuouze39o4qb05o3rko5s68rixby8m9r83rq2jb212ls0dibp8nh8f4vp0xuw2553gpfhzkxe2soo5i02xu7je0tjdtwy923s5w8jh9i7k86be34uc6w7dv5obfbto04yadzjw2oypwwfntj86dgitmo919p9dzpjd7x768i31f9622aip44b4r1c4h1rydocqvlcj26grnn5tcbpv5yyurotw3kuq01rr590qdvsrcwonpr7c1z78b9l0oztqp2vkx7o4xxk7lqiigg35wrhgcvsax43vdortd9q8ethfkytf9bodfnol4ph6065jle918m8hohmkzfehhkroarl6247rloyy8uir7x',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 9552731922,
                expiredRefreshToken: 8878682604,
                
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsRevoked must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsMaster property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2d8bbde5-e0d9-46e8-b0a3-13c4fbc91028',
                grantType: 'AUTHORIZATION_CODE',
                name: 'fe2ihbk2im3e4hv8v0mssr1vxasfspr6kg3u169zjpk9juecobxzdu6iq5g9i97sena2vzd7592e2klv8b8imhw7xrz53tr7sp255byy2slxv1icrwq2iizacat4gzve1scz2j08ifqymsscdww6drmnmw4ncj7z8yrl5j3unuzte49z6gn492vksbil73picpwxjzuv3zr8brhsbknaj5lcwi1lwuuzo54x2yuqxg1l42xd4ek3vobjfwl2ry2',
                secret: '07xuzd7d293uuoch8d8sbklbwj3rcae7b1tlfgte6d0sbhhj448amt2bjv46gfkue4zmes2xlj7al8wxlngh6hb783',
                authUrl: 'dmtal75ysmkydumb1e5y5ufx6ikbgp7du7k1w6mwlm0r5oeend8gpmkwwv9w4caxy2wsqhge8xfvgeos4v5krw1wrzcov3kqfpcvn9jwlvtjpw8q8n2ygrwnxpl8rn31hdpaqvaf0b52xlvb1g7och2ajpli22sjx65rrk566l6fnr3efl1gu4x6tjm7bznwh7urx3pta8n7qlajxp6fco2p37j0vlrzv2f9l3seh56156gkmwt7of2da3f205opkmmv9rdg60s6h2wt32j9krt9k5gi9qudv3eqq02hk6yib992aaiou9n7gb2a99743csrdj43txvqonyr44yef9f3dzl6w76005ruh6dqjdaguecr9h3bg324yglkmliir39fdt15jdqb5uub6v7tphttr5h1jzilaubuddiisahk83xiyoedwo51arkp91h6f0fo8vr32wb4ezfo203cnih6brs4pgttia2cz51p2tt52j7tw6m5m3yjqamt43kq17pek3escuqb701mczu1g6q40584wu8bzm7pjbu8p8yed77r6fyz8qhbln0koprd8lgohe7psjbq14btfxzzuu280gs1c7az0ch6abebgc02w1urhqf7rppstsu3o9eppejbhrx0ysd3pautz9n61y02svplo1if58pk61664ywoncjjgxihv7hc1lxp8a7gvwgntm8q2mu2jldu86dp6cv5cmb8qrh0achk2i5qhp4ntelhozkdi2ofo48xqwd8qyc8nepn76x15fvdkmzv0awvj1kjdwo8g9n3ejukanlvo44q2ovys0ibutysm106m5lgqvf4s94w51rzyx82jr8mo9mr37z5fa3916dempe8q3vcerho8006ax4zgu6i14e6713cb0e8gqgyv821k8kpj1kaowluilo20t7861kj5xvpq4dhjg8uh2aph88pf8f5j8i3vw6o3ip65d6xrvvl271wdj9pecnfyfx1yyd492ep33nf0ww2jnnbdn1msynmptlylwxre7ru3cb4m3po9oye9j0l4ccrm0h517f6nrnx8qktecw9af3s5m2aae19ox7c289aks7y2sl9131e0c4ibmpsohiv8lumznn4qxqgyqh861q8wawwjdqdb2r62j7so1sda5de3bkicz6pjuyvt6wsqdbq7snjbp8nfy8rz4l7hq72b4mbupvdylcjigf666ctvvrwpnrownirnwm8prvttyxpe45qgfa04iq02mkfzfob4vfnroidg13eg2mdvj2m3r7hqsvi9kbwyvao0dec1jj702clrijgsrjuf89dqkgxd0byw0fq4nztq01bvvpx1ovu06cx6c9zjvgsgusn206rkuiowvrl4jfs3v5cw9du5a827zyan4mhri3sjvvzqtf17jva3uyhgbvh8pk46clk7ap92707frd3n8g77ie9y3adi08wsiswcbhe73wsgdisztu649jnh5x8p3c49ndrbdj9420bappqyfk4bt56ohkw1282ecb8fgn8p8vkvycodgnywgjjaoqcqgoxviywh3uwcldupppbco3p94trkwgivx29rut6rjbrinsctlyjmvt077va9ukzhoitjkbry4j96j6jtfzpo2wlyv747eq7aeaj0m4rpvrtstu1zznbeeasm4jvsxyqqzpvqmkb8u5il9judoblgq0801rlvz70aoay5pziy5wmec1uqwxyv6dl2axpcp46a0wtl7ciwh95eiwgbo597gqq3bq6080c2lirr8v1cpwqoa7bxio672ubrxdnu8qxvvlcmp3g9rzw18zwmqumcsezem03thw5nkf8lf46n6d0it2f6c2acgui5815l3g0bvcotvs1kv5898dzsb9n2zo6grvdzdw8kglvqtl6hu3u1yt4fwrxprf5n2sigl59jwl99t9hbgbyri2fcs87xtgg1utwwrkxv0qtwsj0my8yd80gls6yimfm34d713xd23ok6td882swhkqm7kvdtr3kjouxfvfflimi',
                redirect: 'x1ktt0e5n6xssb1q5d1q12omyh1hcu9liq136gqe43w40r6351zdr4khdr20blqhvnnv2tqp0sun0vup2bxpdd4xwmbbftssh5qf3nbc10ahu1s1kaaryirs4xpck7haf9nugv6ugxeoteonl1nmrkxw45vb1ucwtxe674k1optmq8s4b5be97e0ghn4s3xkl22mvuzyibwjos2vo31wqqy4cw3dicrjuc6uui0zpndn3jgwzkdbdcstbd7gqpgsisruaiakllfp8yytyuwev2uka78koqzu7l25r74qsdgds2id4zwk69ixmobtb2dujyqrasqf8h5up9yxugjc35d55i4hcka047d13eclyua4rjxmwxosbpn56kw802mc3hx77596fujies08fd2h2afgt0tz4hx2pg2uvao8y158fq57em2ozpt9s5t5r5izb2v0h91w66qsut845q6isevhdpc3h3b1ruq7kixpo38hp4e1za8jk7taxjsojh8s51l531vnczk5vbam42ca03l2h6cqqki6dl4o2y64i1lpjch45wmc9tkffaij2r316amcyo5sfcg3r2ftonfh3t0yso8r8cyb89ugfz06d349lzihjx6bxvz0uqbhldcer8vqhd89j90yfwh1edgrl3wpx3w1w8c06rl3b3i2uc8h3nr2xybokzy2kxe5dbvqszlpbi4xw5221p4181nlyi3ui1t915eojynr07dkw52vfgxym98w0qkdzc3v0fmur1utmqf8zau7rfyc9kzqjnompftd5um2f97qk4kgne8ed4nws434xn15ena0ijhb6y1gi6ywsiurgadaawk3gf4dgiaa3lgae18yccp0wf8b63h1cww8srx7d1oakxxifb4kuvj7f9fjf7lfwz18ryvye4cot6njanshrl3y4c13p8uzh43x7e27wvo1bhr8u3anpx89mc74vpswhfisptqh3z4i0bzvjunr748trecftya7ib3uzkzmtg1l40h42x9x0oo24sw5bhvtmh2va2mj3z08szhm7dze2ct2dh04kwei2fgwuj537jp9gbrkg6g4a33zmebyyiomhydjvf5krmp55pbilqojrrgmu8kp0960zcrpdnbhwuh9ywxroe7ju14j2t1rkxr1fqep76ln1490w4ydb21t1s649efu50dg4lku4607ggcdc4zl8z54zsf589ikd8z5gpvr51qu9bv5tur9lyz1xlyelznwuuz9rryrjwmf31mmssi623d8n5sy78bx9gwfi1rw03m851vfd7udsiji6zosfi6v9i9vsydh8glf87bmnkk7ovu3o7zheel866x107snxjboatu8riw7h8r8texn315db889vlnd8yy0cvp4m9elzkymy80yv8kxl7ywqwfticlimcmbwk2iwug1uskczd7tc1mga8hpkfm9naz73m1a1us2mtqvked30rijzhyleyqjc4duyrt8rry6t4clv1n0l36kl3t0y32va46hwpsct0nuuanpig7qo7d6fbofggtawacqz2co5fmjd4vyx267brhh3949yd7in4yf3i2fq7my5tn6y5q56kuv0nrid9fwampieiwolkoy211xkjc85gkgm5lkhmjotzunkfy8svojazgyay9kyjm5z7c3bioe16zowk5lvxempgdoe0fcqotuw4jsuav3v8vyfirt65ulfjer96n2motd0wpbrgvti4s7697x7sdckkrdnztbekhygmiiulfofra9jp2kyezwgmqkeca9vb2qsdcs2tj7ptdonwztfjaxa25x4tl489i1kisqsuzg0mli2nc9ki8pwnj1s8wndx528copz1hev99lb8mcu29u7l8fivb11t31zi1epz69tuvba0b7bgh445xr8s2mtexx39mlyylal9o4rlc90q44eqdl5oszgsicyeex9plyqge421hd863xr20z7z9ruonrt8613rt12w3pzc3t68rwr5qc1v8p3dausrj6s2ge29zumvuz',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 8472479941,
                expiredRefreshToken: 6867044402,
                isRevoked: true,
                isMaster: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsMaster must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsMaster property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2d8bbde5-e0d9-46e8-b0a3-13c4fbc91028',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'mtyjdpv2c42bop6wwk7znx2ut8iszxrn3fcuubbhwh7fbcikj0a7ikja0vult52kreqayi33hekcch1a64brfzernqjuaw05rgmrctouph9d6l2o02w438f4ndeps9pkvl0iblv3gzrite73vh0gwqbzz501votbxi4cxk6790nhrmirgvg5lde5uzr7ooyldr4jg587eodor1bsdy7zn55yemyn6kmzqc3r495svkvqvv93d906fsg3wpsl7ik',
                secret: '59sm2gw6htjp7gpl9vglru2cfyn1tubxqsgbop4uddk8a11ma7eai81b48tmy2sdsf2sfpjob3fv1axk8i1ljgoi1o',
                authUrl: 'dz7ia9i2dcts5p0p1u41rcf793jiz61kkhvamyngt5mlacpp0knsfdxuw0feiwicwz3y06hgvjfcmatr2t9tbdhh64o4c5mka3ma63zbeodjssuvv9ij718p4y0bvfjnvhgvlj1v08yxzfntp1pdioflmuvq1skmzdp2oxcmo9bufhca49cmr0i24a7lpq7ctr14dti931yqk48lmdfyb4lml9ficno3v1p41f20mxk0g21ix1msta6i7msurkl1gs5ukl77r14z3ec29jwnjcvk335zzede02lqd3dvfrlclc2rgrf3cfpdeynsmiusqndjy3ru6yruqabsh45h5kdioktnu6sar49luqrqhxu7mjwpjx9cq4yub41aiqq1aahqld3n3zie6lpt4ltyio5sen9rjqkmfzl11b8wpjwjz93r6bqw8nm6r5plopgqaia62m5peidd5shs2xrqz3lm0o6gmu3k1bv4jz9tfsyemc5101vbft3aejebi3jz4vncc1kbxqa54a90jmwqsgfyy13om5qucaxygq5xpbg6p9p5uxsf5tzspnkotlueaf3r19pnar88izmlj3pp7ae39x7ix8b4b80rxlaragsnlr1fi6v9yamh89g7xzfbqizciazflg54372o0pjpen5kumjaouhin8w2tvhrb1lh6gar75ysgvk3ns8fgyc44q065q4c5idupxnz32hlabmlo12oitwyzk0a71tzq6l7vl7li6zes2ejrlhhv53lc6r33tw3boxfbsliorgeog0r0e97jun4z5395uyh4oqyzc1zdmqdt6s7z2t0b30a3g3psww7krl03fivl14hwwvlyp7gps3w11os9hotc4l3vib72pfd2o4alu62uj5d4e6sjjijee1ak72rhv9yn8khf3y9fgxjpqk503kk7e6e8lfpwzsxvin6vhw8rtfg7or9qvdpmnw4q6t396vzhfk3c2udaprkcmhvkaid3jomapwijkalehxa1n9j5eqyajfl3hwxrho0dx9df5bsglo0jsm712y1yy26x0czf1r2465cblhyegc9evjgkj9nm88htt9c641hox9vi5lnz4ft65816nxwukco1yw09vfphd1zqnfnt0e8u9px76b8lwbizxr5tx65qellxccaq0b8os2p8pmt4pvyqfvd8vs86opk0dhj4vxf94o2pfvdptce36fzga235fdsa7wjw8s6gg963hjhjieuoo89ac97kjcwcp2qu45kdctwdslabcwiwqqeadta8trtizlw39cfn5ooq6rxf6def1qmwcd2x7eqvvtgorlnnlwuffmxxz2p8q6bu3g30n01zg109dvhxbxngxdkh5qogxm2mph4644qwyfcmcasang22uo2op6dd8yrpllz4adukpya7ski01j3uw1kp1oj43nkyvnvmk79fvkbhztnbjdq5jwy5dhhquezg72pe2tg5o1wrr8wt5uxjikkc7oju022m9xfeb5k4rydh87vgdpqzt16q0iivfinpeevq3rydubbq8nmc6x96q6nuz262n7whlk79wmdhl1q9ldyu04upnbt0nmd9nbt0pqp7inf0339amgg6hrn8kx9ouqj87rqoa5b1o77cwtr1wxdv9a9w5okuy9hoqkkwdrtp2aqkghjscsxms17qda8cc20b53cdu3817oxjmx85yffw60rxm6g96su0tdkmdtdecap6spma6u3dc1xc5s8d8fsotgnctviiban9t40vah4qh8h84iustvbvbamsdot57xtwzudi07qojltqyvqatvvvkr0firvge1trptbffjx8q7kvlwx039d07sjaexdtyufiaom7ejzcpgtmvy66mcbv03cgui2hr33x6qp70u7pix3bwc622w3i1yas82v0676r6ze9o1j124nq03w9binxn9vu6lxy04gml6t06btxj5yqru44rau201uwwfyygsyj85tygau6zy2p3v0nxtpp3mqygll839qzf2scbn5ywt0x9sd',
                redirect: 'av2ildbdh6qbvfxd8q1pjr0hyzp3ojbk66gjx7a8ixgs28j9pkijv0bw7titxdh8roo2eco5jirz8mu0k3xtzjzjnjxbaavtw37o1x15w8rht5rld5w6wxdoy34x3ap5i9cbl7mlyv0v90kq1g4cobl4fdeqnnky6903qr9fhrthgjqft9lf3298amqfugltnn8bknw7ibf6zae93sri86lmgyggdlv8gao643l40cslongj3p67mems47zds6840aabdvh2ntitobuqelabot1xq8fsrvdch7yyznw1bvpqdcvwhfemfzq29oedn2bc298b8bytutkllog3jv6i4xj3xgg9wijkotlw65kj25pjgm6y97e65ijwnup7cj0zy03nirr0uneg2u6zbjmaak8cfx1zbp7w4o32f71dvvtg5p40opn3njiz53je73j1ozprrok5ajkeljqkd9gdyqfegc69l29lpdbxjv40ue774l9o7pk52ipsfz2dj69fsyhsqcglpd35nsepbnfpiuqrca759bhcr0jv518vi1m9z3zhlq6jyh8opado6x63ttk8jbfjvkzctq28f7uy8micsbhos5ihixo4vwdqbkbdipuefqs4sx53jaxza4nfce0qbdrnq3pi0kxpx6w6cc73r1f8zfu2ezeu66r8s80zaf7eubkaphrpvkra34mgca3qemcovas09eo6nkxi7vtestjb3q0oamlsi6ai51barxffcc01j9fzai7z66fxjnhopnn7l24t74yvlwcqi9z4a7ziyh3fshz6ybdugkj3wycci1v040p4y14mu5gaqhkqg076jo8iweosmxkj4jrwag3d9ayrdai2f9lvkxn7mtscyofjsdyur5vchm0nfv8eo9egguwgtdc31ixlyknkunsfcjl73xozip4yxrc2l59cz5hnzlggpns0ukpqy84v7qgi05tdixhj4goyeuqia7ndia7ludv66gkxc9aruip4g89ytr1vosuh7r5sumesesmwvv9k87isvnwermidclhhxhziym360dvfgpwtg8gt6mb4yknih9k2jaitgrb5vbalj4nbqmbgaebqhuug0576pag6a28gqoue5us8dw1ngg8usnuuh909cr6y1zrreh7fpyza717yf6lbrtbh94r67z0jr27q0m663npsj1jk5nr3al3uudcfc873mryg0khdly7rg22yemd2qfl35tar05h80rnc96gj8gpahzpay3z2xfad4spvzqaiz5e3sw3o9xrnzhaastu5xkfqkv87znh9shjlomadrtg088666gnhkwabyxi8c1yzuou4v108i6x9lr0p99a5rks901in8ex2dqhs78azia4nvwboc8o2sf8qzvclu0ob7iwfk7hp940d0qpf6d60yxdbq6ygf0tyk116cthzj1i95w57ma4w406fxbryex2w6k8opnsysu3myavmw1kju3kzd7x6lsls0e74p25l0w8mv2zoovhe07q2dutn47e7bygqio4cruhmxjzj6rz4yn47s1yq7dwk1a2m58h57s5spzcg701dznjv04xk0tqick22yaaexqrinvi55u66t1dp80iogdqhxtbcu3jsww3qdw72yyz2l1qsd4ox7bl6rztlc2oi1gcni0k1kc1xe41qh3jsn8gs7g0lg1sxvbzgr4p0ubt8v3wjdc616btioj79fxive7tcr22lmx3nr487q0ag5ykbggymssek4wqvtiizljgvah8z64w1gmdpm2llwd527xxxgorrv8cbpugoag6ahaf2iwkdmihlpm4yqurllbstg451j6qz7djh1ybiuqwoa7zb2geqgvkzi19kl43yct5pwqnai8ildnyiahme1j1ma9lv8v4zii36c74cc2czq1rargqb48r5wfujyxj546e5kwvuna2zaympiqfeukob0luh9hjg62pwgn2y0ix0e14zzqz4czdr4z1n6ez1oiebfcz4vm6w1rm47y5bf69f5mej2c9ziuo5',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 9751055590,
                expiredRefreshToken: 7986269880,
                isRevoked: false,
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsMaster must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: 'ejndbfzu1jhbb0tjyu7kpkn5us21w6nhw3zqb',
                grantType: 'AUTHORIZATION_CODE',
                name: 'iqufkqgwg8v017idjq6ci73bfndfgihx3lgd0iierfnk9j5izvu30xi72n6tsktl10f6pdy01vpmjm2cp1d0q59lzan7ksp15a60k8xn8wly8bkdq0iz0ia2xaozby8cognvykai1972at1ii1tyktz0mn61cbmx7s1guf1e7s0cpi5nn6aq5p57m6spmg05uuq4a9g8yducwie6olk8tdnfc8sn9gwx1mtmt6jth7jl1mavomf68y64l3s1dfm',
                secret: 'telvg5xgf092wehl1n3muxfwoz9fo99orcrrcsleeshw7dwqmgcw362m83vpl6uljnx9wmqwq77w3xx4p0gdc9k018',
                authUrl: 'hz7s1jj6ppogk7cxtjxxecvbhu8853o0kpdfot3cnzaau04yc6vb86ab457ibevejcbc50dygbl5l999zmr3kud2r3spu2opp34drdxsidaxls0ap7enjsctw9jq1di7qog1wi4kgk7hwhmuw3hwevx1kvhcq780hny5b4q1755ljn4j1unxmgp22c50o2754fd5cjb9c704e0b2n3loz7k5qoxhv6enq7qnwy1se8jyszbpipn9gw9s928njorf6cm25ubr5w6xlny75elp9a1ccjnx0gicryfg56x6d2u7vjlxk71hxyy92v7xj6jrbf6jz2lbq08fgkd3xgxl6a9uekbz1fao4ubiztlo3hvl5vo4gwx35ip3osk918dtwr9tcdciow04gm4y2htyobuginlx8692zlvhqmlitkcx8wmcgey74cx0t9u8qghj6uy0w8ep4sit8ecl6n1t4lv1htqr6hzunlxjc4z20nlavqygtaaytfj0tyiw4w2yr8wejbsz5cly0yyyod36fpifl6lrtcah36ops7b36kaiqzyo0p39yxvschk0tcgip7xrmnvzqti4gquee9482kb5dexcvxs4rx4kly4osv6y243rrskswkgn51urxhr0mvlt35vu14v639rb8o71ne07xn9paa8soynll2itjtigj3amkxvd0od0cliq3tf0ux5wgp2c197rw5sfekpho5wfj9j4phj9829qnpuazf77cmc7yj37y6c4avdrann82p96tk0y8lzsif7wqcsvg2kf6smt68fit9dftqgfbzm5wzmm39menur2ntuo722tmbbhe1fc68ynwqvyurls5vhzu5bvxxx146izkwqik1cw0g1pc0z27ereeul6ddne3o6zekbjw39k630ekobb2ggs3arry4rx0qhtdpwn159uiejs7zzli4gmif9vek36og81w363w7anikmabw82kqb6ikp3o5plltbwn0nczgdv8pamksf6c0u875stf5g8tflsu9ggc590jrxi6gst5almzddlhi2j3sh6u4fr15a27jt2m2jgtbd34o2z49zsng7ocmavzgucnilrzbory2m2v8nvk2s41xkmhtzybgi61ljkhl8jks21pxhfblybhxlqnaqqgsdtj2yzp75oxgt1oxnmxtl8ebkryj5bctrfmkswzbl27ctd46u3qwjessp7miocnh6e0k0e8te20590oqht7zo7kg9nvy8uijv6jp61e2qmhzzh6htdot1czgzmggtqj1aaviiorfzx1zpggxkuo0okkhzfbw3uaqtsbxox6czzjr40hdzyae6669sl2rm6nu38rsvrpw5bya4v3iaclwr18gewm4m83qjcg687rfzy4e7p4hywxn05x0hz3e68izg85t2zt7vi0gwfqrdimc72p7s6quy6eol9wqr055qwmkddpvotq4i9fm3hinmskmuggced4ncpma1e3cprk3qbcyai4zh9my86onissa972eljemm8ocbcdymz8hsryll6cyqi6mram5mz8901vhkiyds5n5l14azhrestigwt2obktvwmgqsqwfenu8uwyjlvespiu869xky4kio595m5cka5958tejcmlma7idco0ot47xhl3kf5shqgad84l55wkntbn670p8ydd0xysfook6bha65mbi0g9mv7t3xknuk3ffjozznomimnmuwvo931n2vtohm6evv8q1kc7i0jnkrlvfbv8rdsptxg564sh6rl5ss7euvfhl65oqpgl1g2mscep3id9aj3p1kpbpetcvgptpv4oepgkrqjb0ei5yhvkfcr14zhrrgppxnfv8ef1eyvqhdyhutco1x1e0ek1535da5d233p8f89y8b3zp6f7w7kz574epsj4y317htbmprco35du39ga1k63meb14h8tmjz8hf7lhj4mlp5aaflxjo4u3244m57citi4gdojbbk5z0pkv1un3ipfx17lti2927g4qf2yb3kd7l1vn61receuwz8',
                redirect: '9ygppbyr0qhipjgloe4dlgqpn0khnee04nqamxdefwscvf8862xyrpetb4mttvqlqi7kxzzyblplx5jpuaswayy8hrrlm0ay2mtpqzdrnka70bitnx2clzk5zxr72xfbvjvv9ggjumh8gcrmmmyjgh4kqkc60grwdhf6ikdoawnbx8gvuyh6jcqvia6dmpnak5sbhwjcja74vfgq4ev7soi073gzhq9h18zuv4e0z5f4v35m14x78lbrldh0fw241wtng9vfligru8murs3ynltflv8e6qe9vzwmnnfsbb9kgnf53txfychyn1or92dlyeli1709ycitxou6ptxo9xjh1n10zy9f22qb5k5cvjktv0gvu8nbcakre0tbvt9i30gqkb6a7d9o8ftmrg5woo6s3w8mu8hn4bybk2vnknte5n7rxj3hsone7z9l80eb0swx1k5be7buhuj3eotcie75szjb4sarxvz7gdt8j3s87fpyaawv3hjbikmc6i1ijnfnxj36fjf7i0r6wogmss9hoot8mne0n3o416fpjkt6l10t9xtyc72f9k2250ff5y9c4lq2hr7vw7rq3u6zx3nu8uz0mm0t9sgsvndxde5jc7449rxzinghqsb73kd0e19x3lgxysj2o0kss6i4x1u0vd5mnrvvjarblsumi8mk0wdtjz96p37pacbt1owwpgwbrfn40dens7jt2gq3bw1yyg2ylg1bdyrkoxdwo24b7ddyhlg9l28x4mwd310tp7ozzbmm8cq8e54m1csverojss9p083kvkp5g5l4q0mzlcmvkvzls1u9i9avobbny44kilm6ioh20gpnt1nxowiar2q272kzo8gnzmfz4mo5bjv70q6uzl6qjg6x75nen4kl9c566kp13gwhb128fj78iq1osnc13t1u3ft23g1qnwog8qq97j3s6lo6s08v1scoe423ilnypuk88yteoj2s16wr0xrxabfksdysinwnw05qv2pwtibzuiici139dh4lwt9n6i7u4fo0fz87wv4vui7sudpn2j1jhj74j0sbqn20wv1wicrtcra9lkjiy6f3ngc9aeampijv5p21lf7cgv2g4t4m78tlmhh4fq18buh3mzoq7blvaltgwjrbc5h5vp7nccv4fpmc2w5sryqpbzw33qdfli1qkqox082omalzon8i8pf60hazkn4fbw7rz8kmzzafxnezwr5eb1xwdye69bl3dgkyjay4zh8eetfjxc1rhza4qzzeq63htnpc231yxbc25scn0yg6fni2x5jjkkwg09z6zmpt3sis54jefhflht613gl3tmj103v74va2irpuegybzfwgizo4prhhgdarf69fiwsapvems2mdxn6ii6jzn2oiyf6bcsurk1u48egaq51ou7e4h9xndm5kap7gmrjqf3azj2rezcd75ynu2ax52y0b2gzt8sls2561dy6wr1mhds9yp2lsihzebxk9m1gao5v8k89tuygq7u12m8vmsd1v4ftl3wxgj6k4rbbyj3o3et87wo8h0y5zprepzxg5yp0pxpjztmooq863wrabxbnz4934gpka5bmv89eujy3j6id66ve03knbiso432ubl985qhitunl9wi1co1eq0thacy4xnhzogzqd2iuwwtsipcjpvo3g7srya6k5w68mem7trxl85aat4y0qkdzrkfuj25fuqljjbe7y33datblu1lk0xvfit4s2v1rkyvc7ku1l9vywujuppsp8n3voc8s79c5lzoghmcdxbx6q5jr0hzz99fe12fiyw8j6ct8jd3j0sp2pmcscntv19jdiysjxfhwnkvyk4d9xul0ucy8wbq7jqt950b1j7fkjujpdybf45vdov2wk0qkydy5246cnjgyp7kmwx9b7rtoscahimiugpr1e3h9kk4vivofz71w1mwptopd18xggpe9pqwo82mp82djacm57iv9x4wsiikhd0kcicxu1ty0y9zn889nw5h3an7ybjsw36jq2gan84efq',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 2872289576,
                expiredRefreshToken: 6766961479,
                isRevoked: true,
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2d8bbde5-e0d9-46e8-b0a3-13c4fbc91028',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'ahv76blv0he07mdazkxdc79hp4ckf5xxjcqg329h91cy8sksvz3zt8hnske9bzyf1zzfx8c3okelaj8qnvs7ym906tylwh96zit91ys973119y2dhmqk1l4kk3kk3zyy31zy1e7ow4s6f49yfl1zxt93zszya9g3oynuptat67gvavxvor89dyn1lq566kviqesw8l77fkylcb55wq3u316cus4cdhafh4roatp4o8u9thd31oy8gmdql2kqsnq2',
                secret: 'x5aaqpvc2nxltfqc1tgnk3t9jmrotpciz8sv4goj33kk7yhl0s7iti8sfwqidwids528clo5holrbkpeifujb1jkm2',
                authUrl: '9llbcflnmyrmxnbup0jh3t4xsp45bx6n09d4kd5qncb741w22r3sk5yv5ow8b3shr9fwqjchnkur7ardibmnb9ys6uiovnirpvb9erypxvty67tt5ng3wm2e4fzrv1zfyx6l8pgyr5j59re5528ke3vhkevlu6ny3nvdt2q34cj40mj7l7kwrr671kfc0tu1qwdqqln2xebvydxjfm0ovnzt69tom99w3scni7r4zxsrphtskfox6uxgohhw15u7k0c9vdy68txei4j6yr49ntnxntlx7wqyfxlvklv473gsmvs6d92pnoiig0aa60spwyqswu5lpt1myfybbngrrpfmtlmjc9z710nhw0c4ebdkhhn2809od49q1ywcilmdur4wtkvc0e9y1oqeom5yqn8zrye9wy2vu33rqwnynccuolkm1xu53yuhw895d9c5l3hvxc4zwytsn2dqe3w4oqxokfpavaslb94jsdueghxvb2pqayij1s0syneel8kv39z93qiet4f18239zpx3qiuysgbtsrf0vyhy3lheh42vi9gdj0gzjzqt20lbfgvc6ob6d665nws2uizjuskj956qz1oaz87f4ujp8dsciak054sfamnwzga2kxvsbl0blzis4k3dw2ivsw12fvdebgk4zubziuuqu2r9k34mm8bci93k7q67ko6pbadm738aosuml6sdgtuulkz3ijpffafgysjyzetlctxdkf772rofwjp0sy5la9ezhtq4cwg8pnv0anpc6dldhjz94zvtub79yx28syok790fyjk7qputjxubmyjlbtk6oedsu9fzkwllmi9de0lp2bjmdza85oww6pnjwu9aqe1cyslj6xe0dcwr9li24ce90t2r8zhngzlcurdl0kvnjuieskxfdoho5aqifysr2x97855jr9hpib853zzo7kwpjn9ln0z2r61jnane91imlsuh92jxrm9o4cq8w1ylbum2ygzmnphw87bic8v3crk4neri7yb2xiab32w9d27dzoj130j342zq8s25rcswbdscg3usnobndh46fetq65b76xxuqap4rr59sb0xzg97qhkqvypvy7o67vb8j1cy4g7xn8sxvuj4eea8ka7odbfd65po3h37htibq0ri6g0103bcgionkamdzm0z0e7fqel4gvn8s93nx9z7t5ebigpe32idvt2tmtx9gmzkimmlmb823ty0kluq8oqlxl9l19m4etersa8p5et2qp7djsyrvv7cfyzk37gzplnmvs31ej2zjvclht1zz56u49c8liwaa3k75etumqet7ag6t10mk6who8504zt6eia316k5t6q9lop0swruenrmd1loqjh88p2qvvwz1437kbdjudwnt2ffljxc686fwlgqrpbwj88xzrvlbqsgkozis0w5kux9nx2m905otrlbninxmm5fztmi3g4t6hou7yox86coh6a7qx2q5t7noa5wwme5qkkwnc7e107su9nvobz631teadf3g0z7df9agui6shl70hahba4b535yq925iqhmj02zvlazcemygnhjd4qpdt06rfzcnlyqzteaz7bhk6vqh4g0v0tzk0wu3r792e55kucpikfidtfqjqwz1vne3wyubuot1d71eedzbzssb08mfak6dcxf8fnyzw1h57vb4tji7uthcrsw69t06a8kwmw1l7qvhea5pp4o5znpji8febknm33f3s9jwsqjc7h953n2x7e2l6nnge5gxfpxzrokys1a8x6ppqh9nlt3meirq9mmwv9fjs70idxp0qapbev56mw1nw9gzwdutnt17mxbvo7ftwmrizcj8oa3emg2qxsl2lhsh9ks4mxcvue6x6lsa9kdvoem2bctzn7sehnunv78h2thwkqwtw4ijz96cysepk1342joexqt140wi1tfurpwj9hco7pzttr15jnxmof16ib98ozzl4f1zot2xvu59jtfs7ueaimcm878ilo4978bza7mfp2mqpq6zh3ogbeonki9',
                redirect: 'kxxgfu6pqv64e7ljeuaonu1q47xigo1h2mcyp7j5ya6sddzdj7aq7j511gjcuf45wieegwb4uryqim13swr25k1f6iwhdxctju62zfc338xhc2csx24m4hueu1m9xxoivzpjyol4dhrq09d1cu68r3sc65kj0azb09x1f53vdn9s33xkjco9dxrl3ua7o8ksrtfwufg8p98ofigf7vnzw0urvxrz8zi6kckd5zttq73libilunmvhlwqr13t86z07hl634h3v0g218b3ly39tj793wg9umdvfxbd38kpqiqvx3kgw122ous743zp3tmkucqa16tuv2vq236yu4lpstilzh94xmi8ocmzup2xv8yhp0ubu21pjhg8hxnw0y70ukqqa1wcr9k80igerwtdnsogcd61nswu7sfyidkog5tmcm6lge5zt79cr8kwhzj07p9crbefc8797k0kfmu0ukx5wwg29iab2kw573pdlc5170v2nybl83vc7gogtqwqrj1l9517bjj9pxgbh3ysgk3prx8t8g5u6if05npvi2x7750fo627jhmgya1w71nf4oewrupvauvbgsyf9nxdxe65y8j1hamgh6tjpdzck32is76kbxoe9ip9pfry7snz3y0wmh3bnbpkv7b439uuukqijo0ggxnhnddeq22j06y85b6p05ef4jo0a0pxz83g2ciyh8s52h6kajjzfuf50um752d7ltg9qixfpxrwdyigwum4hg5y58b9py6l81us9xyy5ed90ynb2xlwt0gkajg8c6uz34e4wkoyimqbtp2n3li33yd5xkmc7l433t8vcfl6kr3lydoyvpcgo33w5j7o80j8c2y4f9axcvgaue8vbmd5btcmnuepfq8t7ayt934xvwsza4d8k6thpm3v0h9v5ur8cuffo5zcak1o6a5glugyq0kvzstv9srj9ldw714n0lcgxxbcxit4h6ys4dpl5xnoefebyjzozlvoippp1rz3dgr420jdbm7l4zhvlo3is0bzt1oq2rrmo4pjnm9r8lt3uut1x9dcawjmg4w54w52ayivl6o8vwgfht3xbfyluie6m8gao7msbp3chosduwiw38l7j079oez5ss2hc709f8ijmxinampo7y366myn5uflgb4zm8ow2bmoeicfs66mkdqbhl2k0xr1thg6b7r71tf0d6sxy8tw77jx1suvbi0lqjrri3duzuqw808gx8n0fzjx2bm46a8t5c7c45okw624x10xg6vgh47tu87dngg8q1g2t6krr9hte3z6udowuvogmka5qoabmq63c5c7rhx5bwtt14hei3spg68etj5f7drsnusd3xfhdcdzkg1irzl24zpy850y43kern6bnkfj4p5doyjek7wfng7jrmyik0jt2v4ledd231mpbetsrskjbhrqkqb2b3jho9095zflaehtcxhmih7zi8vif25gqzxnqasftir0t61bf11oj59xkdudo6p8pw6mz6p1j85da4h3zypnbxw5xlk9g1rg455e8qzsy7nh8p0wtjy7me65749azp4au7i3jylzl1egkooeaiol1zvee21wrngv4rszo6vbjth8tybvg6rdyzqomf8zfbng5bu9vrljgct08pqpqtjv9ge9mwqbc2roae0jkj58o4quvg1dvq8t5lg2hbk5457nnoa2em3f9272fgpedc9qq5wzkj47tjxqupfx7646sc93qjmryede6xm5ahuxcr68r3tf3y50glqv2py76llp9wkkbmmrlb7mtgbq58qvt2nggb5db881qsbozzle3oo3pr615h4nqx3i7ux7bhz9nrwtwc2v4pgu6xqx2l5x7pm394kwmk8o2lsv1ici2e2tu0ylxoukc0llnxrlq0ghcvfs1cjtlvtjvpy10mhgxr74a0x0pgtqb0yzkm1vm9l3akbx3dkncu1xaza1a5du3h8p5ehfrb0r4hzigpfw7nfrla3e4jcyrq3vwxarr53kchq24aocwony9m85bmsn6ex8',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 3582488885,
                expiredRefreshToken: 3320301133,
                isRevoked: true,
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientSecret is too large, has a maximum length of 90`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2d8bbde5-e0d9-46e8-b0a3-13c4fbc91028',
                grantType: 'PASSWORD_GRANT',
                name: 'rm8txbg44nlgmddvc91cdaz6t5ewh2afrsb1dvust26fxzx7k8k3tf1afjpiebxucdxkkfklpf1yc7jyhjtappt2y4l88fa845inyhh664g1z77dm9qxuskb60rgr70806aob9gbox89zv0w49nvmz73poxuujrk8qd5mzf55qo72z4zco42vg7lhzbjzpzuvxgymfbyhutdmd0ysxq6ykinxvveiyiw9b9afails96pond70ytw8c331oq1rkf',
                secret: '1boegnegvg7s1e6rc7y3kiwiblgb0y42jq5iipsk5vphafw2x3kz2dt2u8trrrrdxeydqevrzobau1z8bv87ld8zh04',
                authUrl: '7pv2g5n6mdif9kwgvljvxaqbqnavvq0ylszy6bbm4p9p4no8kt30mus5sib6c5ivtaliywh5ygrw4o99r9gmh9ugt9ihtrhmpie689koau0hfi1to86oik7dycy4j7fakkytsehvgs7ppkdcks14uza9jd77yqsxqock5zrk9gh8kq588xt78t36pityejaxpmg02jvwnw21lmejb2tjzibh3r5d91k34dx2i3wf5ygeut8zs69ogdgeogaiv8l0blv802ljuiqlnmvm8iwpl3mtx1tosa8rvzfxz2e2i0anlp3ngcory3y4ljuaurc6lh3kbubtdhxr53ddpm8amvofnujo2rqjicd4qa30ojbc88prr8n31d70w5tdvfwoug77gabxr1454hstxtyyd64gjrn8yzl4cks8b62fco9ir7men5n33ju9dgcine1hjx90u56naxgvzu9s5ppbpmjpkv31uslctflyw0ret03cfeiz4y2n4j9fjoixxyvh022lr80zwmem4mr6bnvtjraull3gual71x3p56jcy5cf5xjp31m48ggrsmtz93asdwllcpw77mt4xk01ch0t2ig8zszu7odbo17w70d79u4034iaeibbv2v0to9hjnqqnzdlarqis2pepmu4913sox2lb7yhfm7i5pdtvwgul1c2ozvmjsvrpd732oagi0jetnssdxez2kfo425zjut6r0xhe6xh107stsrfzmz2nsmvk5b5zcjsmrg4u8yybnayb4ml62pmd3w82agflvnravauxzn5fc4zgeb9d3kush1m05mo0yqlbvjojzt7yikz8rgljtb3ny2dslifzwhxyv2llyq4vezdubujxrw10pxhualvhqo9q2r9ggghmbzybmuxnhc6mc8a1db51uywcievultgtu0dttocie30roxz1wz8r9zaqbib9eug7l611fhilqi0ycyq06u07rqmjygw495ovp8zaejsaj25dfpc6bdq7fm9lee7fofsruzjyp5h5g2eke9hss6fssvnfw0oie2gssm77xtnohi2b9ltbv78mnuwe4z3771effkruea72pjtxbphtnao7vc0t87d2dyf62rmvmvf1minc4cbfsre2oxwq8hknpcz4ayw09rog8r7yilhmva64i50gdumtxzbc2j89xl0x14xi4tp3r3l4tke53ce6uab27pgnnhv0guhoabhx3mfmp9sn03a7k5xi5c7tsw508q9d54pn8e7cttsiygoxqarqzkm1g8mqia0xtxvrbna5u90zp0sia1jie1v48fr4pjglrehwvzc9kt4bwt5lyvmif2ygbtjiz6jaf937gm4zivzzaiof3yyga4clma6a45321yqr8auy9pxj6azrhl7p354k84cw1v360m9uencocffenbdsoqfhcmbfr6vkohfs4g9zx8my6y0bxryjmx9puhb0dloqxga4vkhswbcguba35a29te8a1gvw5u87ruzs0ez6bzb0qi6mzl6e0yxk88oedxbfpc0nsavb8pbgybxt4l2keofbvbooaxyi7ajiynac3tq90rdbvfd6u3y9oelec4fmfs30dcrlq3z7glnx9wk1iz41e215utqd5nrao2kvwdapnlam7iiquxzvlfnleiruf4v1071bxwiscgcujm3yxxvvcckj71u8n30wv75aar92gggxibi5gb4yqcmddnx5w81vitodfjh3pv6sicoptmubgh7az6ruoa3f6zynmi6y6d6zi2fkaykspmp7ej4xtxwoc7xdt8ucgiozl8ytcclhjh1vfvmgt9s5ly2tvigelw4u68d0xomnzfte4lymelhvuw0gnl3nr5oipalk9zt11pkhcs1z5leizotxtl828tw4dx96gcboewke3f6kb2r76c7bup97yss84dm0a8hyax53w3f88z3bmjswmpvea5o00ln32y3ej0sdlx4yfll6agzcwb8ot9fti5c8smmpg2zibzp0xrwst31mcq4g0p0hpnqxs5us078',
                redirect: 'kznovyrxykh0nkp7f5o2dpvy1y8qeh4yru73fb1jcgwfbhtcxtet5t5jwagh8hnpaqb8zzapeiv7xwrsrshgwlc7gp8djdz9dsfthym6i3ngo86wqg0thbbw45aojwm71e82qu8utf9l48oun54n16gpob38ly5tmz5wjhoh7mp8kk5swt9fgtc9mimahxgjyq6hsz1pyecjkeb4hzs3jlyawvc4yqlq39usswb2tums64pfswaf9zdzq768mutfqcbm1whurq7fjln4j9rzuq4t5bdvvsre2hevnnu1x5wyz05pnr7vhflckb3h942q91q6p425yeetzg9pa8dws00gqozw43m3s18n2vrl15vi2qvf449xd5wdp68gds5rdpcckt8dh30u1tuowyr5412wlsh6898k9kfr33vjj428gmvobtnu2lwzegeksivwi8pqse66wpzr6rad4wee3lps8d3ek7r6g1xd5ipw1ojtzr73pfyxussqj56f9nzd7gyi45neuyzdj15xbhhaswgwroe91fxc2lr5o7ym2jtjau95uc14i1bifldtoqazvmwlorxr4nhu1tk0wp1059o3nwz2rbq8ll6oszdi8guq8tlocy5n3smu25j4imrneqb8zicg0edkjyyaazb7bh3ld2q8gishfongieg6nnzfklde1ntr3sejdd3fz4luvudiqqxqdpyufpyphmoh9rb3ddp3s2qs6iksj2ei1wxjze2c51rqxib9iuvsjzhehg16lbjq4zr3fdktjmgjw29askcz2zxmom0putq1kvhdezz9mi5677a7f3u12mb7dy7jodwqmux7wtb2fk0gu08ihwv1yedy29fo89zgmx4jqq3l5ahzejpzuud8r17p8y8mu8v5te0a92h3zin6xv4n6dmb4znw2aiyk1lq5j1seip7alhbcp5wnjwegd02efk71mb2jpz3tsog0kmb2i5yz1xa37ohejv9mjlg3ifdndj1yhehan4ahgium187bot4udianvr5m53bakbhb9vdf9vt9tpzq5q39g87jxb7y3e8x1dyw4lll17wu7csgxkxv3rmvgfaqtn0r3vpbx9qcu9ha2zfp1wby4gciigd1ovjn30qhr7svbls1usxyvrpo0nurfxtus9i490nlre74sstgjrxah68rbdnl1n6bo7f0avmf8fv2n9qnzm0inyt6omjaf6h08027objb9nldjngt24r12qj5xzujtfzazmcsrslyy8frg1grgosygcppzxoea1sbxjdt1xr4zwqtji0n44hw3hrpk3gvbkocxecfr9vvy3306f7cnyhlyuwf4jwszw6zqxwdflesixkci3g77bhdofn8sacqogn8exegth6yikmyyqacjegcynuvfxzlgvtsdne6hjgzc903bf5o1psj5a5y7av3r2zcpltn76m44kgmu6d3y9kv2eamdde1b3pdj5knehtvrfk5pex6cn184u9x2sqxhxqwfq36j88p3he9ol58r5o7ppwdcf60msn1nv0qict8m9mcjemhxm8ly6ih9xfsuac9d0cv7277tyyauhmdi7n0xbbue0wb15s2khw875a48kmg6f9kdrjbh6g00hxoas9zy3l5t4btn1i6xrlbr75o63resvugnlwgol7eu0eiem2dhu9n7vogev3ntwmxr76kd5rn3wg8ru221dncshrj7k3p49yq6kz85seqs6o17pjzl3o512zjciepl4thsnth42q0z4rgxwoi72nnk1f91ava2wka3gq24eeh3zqct0816xspb9257lpo71ta2v8ud9149ysxpfs6zj24q3wbtb2onowipccpavlx64azglqsywjzbupnosfkj88v9u5iw6jwai4c24bnr75a3525cg9wufq5xl2enderd55zfgpd6csajq8dy0wiqh7o767cixw8iyzjmznefqbe9z4vdx3pos3rxhynkm43my54glk3exwsgk5l0kxa8jp3cjyebhydunelm83grcco05w',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 7583512628,
                expiredRefreshToken: 4244826900,
                isRevoked: true,
                isMaster: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientSecret is too large, has a maximum length of 90');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientAuthUrl is too large, has a maximum length of 2048`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2d8bbde5-e0d9-46e8-b0a3-13c4fbc91028',
                grantType: 'CLIENT_CREDENTIALS',
                name: '91wtceo4wj6ortui97svlmqehfk6i8ch2ik5v1wfwxs712k5y9imm15cqp7qsqqbv60llziu01abhz1qd6bbitynwo033uoc4radal4dlaspyttsixracs0hiwsulqzvlkeb4g51k52ij11zw9zantgk4qrny0ao559qnj8nekmckt4wmjsnhxmldxhphkvj8z1dvjdcb6pmckkcod8d1mji6tbpn8a9etlsq175rrmq3xbi3me0mg4x75y66c0',
                secret: 'pkwuq21atj4b0uahs74i4jpl74x1b9p7x4ujcxi3i2vvfdp4ywm5vouc7uv1fwcp9ptluee2zxu1bzcbb8dg3jpgra',
                authUrl: 'jeegbfk4ug2o3eo8xdjkgif3f36kd6lal9smnhdiui1388d0szfdd1crj3szujtnbczcfjayl8khqar8e30ddrv5kvei4ja691wlwucntps7lkldsw3uilddg85qbe6um778mavcafwjpl0uiqa8ozchr7c1gx4ypohivwsbxqhbl2y93lkb98whdcxp6o4ujr9n2cm0ixcr4m7ynt2auvdpfl3ggv8ugey2ohbtmfzgxg95rvanedtosmjs2jdnngppqgg2pll5uka33mkes6xlu3itwty48bjpz5err507l9vjw8soetre0a8p0cel33v6wy3t1dvq9x4bwwi5a1z2qvnwaujoebmsleam8nb3djfsn8neixb1gs96688t33uva0weu39bcqsliggtz7thc6xib3720v2m3hs7895wveh7w5r2h3msbu6nwo5b1aums7c2vl6bkeompjn3ol7zmui37rj3q4ab6yzpkfjryveqksodf1d6mv9z2mvyjrquv9a55kbsvpdbqy5ydna4hdc0uhavazanz24l0m61yqs6xzremypgxcmdm3vnkh4gpnmr9lxkkcdldhhiyhqa4fxof3dks621rrssmq1ioz3auygxfgptv1har6l3jlkymfca3mbdw35jssnqw5m2f1eoue9y4xw4lkdeuvpcf90zf0jiq4mq6oj75r22bloz8horysuxk4l7ujw7z794iyfsk1490y6ku5zt4oj0s6r6h6oxtt79h95hgk8icnphof34irrwkec8ubwix7v73phgfcfrz4t4sincakeoyynx38wvb34ephtdm2ikvvmjsbwleeq9ied9jis6pnngzplflroxhw70yhwrledj0mnpn5tnl1bi14n3azbxg46qx66kf060dxo0yqq7ipblzqrxehamu5ww0yuh1wd9m7htws5362wicc3j49ljer1t8xr3en7exm163wxbl3tr8v9ftxyz2i6nmojx7o6d4lc49wv9z7tae2vy7q8gmivss33uxyte8wzfqk9xwmwahgirpd9pb14wiykeqsxgkoncydy6lb6q4dp7cf09bye76giqr8bowdlraplbk31swh2z05gq9j97bahp4zrt7n4dsn3964yyxmm26x5943ncc5escaasng6fjo8nbwxpgtkbmfcdmxtp31nuu17bgmfqpx6it66cny71lnxm0cs6dc3ph4n8p48tokmn7f1s749gwa4uye87opqgeuskwyelyxdrhycm7wddpef35q7oqkra1atrca9iujrpxiu8bnkz2qvgf100knd7wlkfn4l3ye1d0g8msllnnweo2cxgkb6khz3giuny9r9m5e7deaq9yugsziwgudsncff0pchlhzobiqgdr1hk2rb8efwmfazzesk99rxsmmelsldmvedhdwir0pnd4fk229pzdesmncvkt4gw8919axi5d14v5owy3uy5o9rr7ajolpdodx3uhjdl5os9jinxuhp0ls46wabs1vg8laug1ldo1oae0kn8crl06cp85i1p0rsoyoxzw2a9fv5tu0zanse4aoz2arl01v52r0vf37hey7mw2tyxxuyhgj6ha1g50445ibkdmhw5gttrp3f3g7jh2agdik5zwmjia9w9gw6039ut1x3ojm1mh1uz61r9yqkqswswo6jdkx82iws5ndvb3nqzfagkgs1ctf4c6xyixz308mpbxtj1d8gvbbogzw9wq2il7ez4r6zuu8radrk1imme1i1f12of0jhmrme1qfd65k2xgyhv3fep2fmg2zky9o1zw0hpoye9hgfdg9n8izz17p7nycxczhk7qp1w9d0awaev4vf55gw0a1hi0l0ajx3f6dksinfbfy47yzazjpjfo7vxgrnqxdn284e392bqhyixdbvoszm2796gidwuvavw26am5w7gd5d8nmr62x42l83cvhzu66ae98egwjmb6bldqla7k2vby7vzdkh2bfez8ogq763nf25vhdlpftvw7e1wptm2t8xjk72ss',
                redirect: 'phj59xzi0y056oms17z2fgkrp01934j6r11fgkxm6iuqlnonzgfi5noaz09ek3vsfymwla6yeidw5srljk11iwjqb8cpfjual8i3l5lhxsxhdtyrze98e99ie51gzp34mh690e2kycuwzf0b0b9vdzvzkjavovzat50c1k4o18v8mf57yjsj42iu7mb0oj1g1a1fha41xeawcxmqsslkgsn19zzbikftqtvcia6d8s59u261zmtm898tbko625vshb0wivydpk1ldf7v239eozhaa8i48jcl3qpdumjs29idfs0tukn0cv5h7n97qab7it6e2d2f4g6v9qr13w3y24rpzngk7vr82smi2mq4fyizsxifaxbp62jwl93fachp2dombqjx740xyzavt3frehmmq97t2h6167eupip5qryow1hmngcj9zo41qopkfsycyrt4veh4rw5gm2ksn00ba8jy0e5dpmcw57sagi6il5wiazblkeqjlcg071vp7j8jqo0z741n3tl1s2c99oh1362pa186l31kx0et6tinnzv8rirevx7mhsfd6qzf1aly3p9tg423a4ydc9omjcmg114fw00oge61wvpz2vzl7vab4z6bf8u7mv2n4pd1c55tjob4ausuaxc032p5ic5lvt6kmo9hvg00itp6tcgef2aqv6dyhfs83xbqvp6v1dbavjjw25diy59kd6a5ysa9ooznld7a0ygff1oz7f5q1xmbdb4igi5luredodsvrx1tj0io5gxngxtn2b12dmhbyj71sacy9p539rhrkl6lj0cv7a1smlxy9vn874vrbepq4fafjonifw05hw6nzbep47g2lwtwynn00x924sxgh7v23n2vx4yb0qjyv32p098lh771ouh51e72ppq65l3zgjqhirvsxs3226hb6fdmfgg5oosqfn40gp2oavomgcvsmpocq7n0dj4mweey64u6nwqy8057ei9zqu0jelx4jys650ra0eb030m1rdadrxh7j7bz5lj4f0k3pdbx5obng01bs1st3m6axofu82xna9onqsqb8zxcrkwwqcu83ff4eqx34lbxbs75t07bmvsd2h2eqqesy8hd5odyfqk1qjcf1nllqblefj0xet2z6ai0h5fwx6p8wee1sd5b5iumr9yt4rerlf0rndxuvr9jv299hjgokevw1x3wg1ubbttekem4u8j818f9ov1el44s6z2izpykm646h3dcikg41rr6p17nuf6uck9yqnknu1ljpgnnru1m7umh9snjl4lu66orq5s4952ssknkce7p3maj122nmrmr0hfxe7hqp3wwnakybyu10lxx8q3hgaixzrejcvrxvk7xmpj2wzm30f80mfxk7nbbzsjpqxre7rndkbqhcbshnmz9739ng52zdk5w8o8869ugt3q81xyd4hcohr2ax5p2tidhw8tw5y3gvnf4cxhn0qjm6pb8j9hef7bs5gy4uh8mzez0sxisj4923hd9muo8xblfgbpxts8tlv6k261co7u8kdgwddtrmlf68kmuyeqpmah3vhmo8p925mpyu70bhnqerrd4d210k9ofdpn3la3nwzlwna3ollgmke7a98qsmmnfyhd9zbmreti369rlkxoa332lg68bmfb0ktv4tuilms48admxlejjyfg7oi1jnu41k9m031ajeo2ujdj70lb60bo5s8tshi8ge7t4j28r6lvivif3knzskz9g3pn1fol672kqdlfprpp8ekpab6vc7uqgba28rpgmdwcqmzjr2347k1p9xbsnsjq8atppc6q7qobp3ffua3c02615ia7t7fz2x29hw8brjspru9y4ap50wdimwghr9pujmnr1vajsq4w960nr9hooc4984gui0x2aa3isr0w00x6otxw4380638g9n8ge7l4tadikk74rgvbfkvvlodewdjuwukbxv12umr85aenk1us5yoa20ir6pwqr39nnswoz0y70a3rhynw7kfbk35usxabqp9vnej58q1n',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 4054255663,
                expiredRefreshToken: 7587102119,
                isRevoked: false,
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientAuthUrl is too large, has a maximum length of 2048');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientRedirect is too large, has a maximum length of 2048`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2d8bbde5-e0d9-46e8-b0a3-13c4fbc91028',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'qkz0zi62z8bem40tm5c3tbuyyhhig5g9p4oghkj5yh5e05244p1hbzo5h8u2h40ossqywn390mtax9ppa4f19qjrc8wvo0arr2eb0hrb4j1urt30pom12z95k6xa1epf1duau2swrdy8mzvv95wce08z7l5zxo4kl9jkbibkjao2fzmvw2k7hdtxrw10ncjjn4u1aom109uzts38nxx16yesk14mxekav29mgvmm06dyxpf493oe705h36pinld',
                secret: 'bhbzk3mcp4bgrxnm3yzi2s8vs6sgnuw4xlcq3zh05mz5tfghv2lwx1tq2vuuglieow17athdalr7dxor17zmsgo1kb',
                authUrl: 'wjl80s1imz5wyq9n6f01965ju4irjqnu7t1yh51iec8v0zyhrb5dw9wqygxg6wqhg7rr1qn16dr42zeqv956e1t2js446wy1qdgehv0h2afhehcw50ssdui02f4nukdj9nwmo4b63in1f22at71p35uz86zfyqt21lkngv87xoz0nr9a07qe84x9unbcfxm0rfnzjwml68yraemgwkt22mpkkhyfk5mg0aqm5vthngwynqru69wcixfkwtiegwq3idcke66z9m9751riiod62bl884wow1v5w9skvw1nsq5lahgbyedxpii1p63p0ta44nt42k1davq8vs0179ir5tnd34g7428i6q4123823izpbwi0gryhy7pcrvb6derq5xp1onvd5braa7ojk6i4q89mw630i6l2ooim0kwgw3436id0gmaoefi0khfeecn6hf9re0g64jxa1vwyjx0dkswv6nic3xndy56c52zelzgj9ozpikxxde5ezkt10kr7hof9tt7etvow8daqnwo2ioljp1hpzfwyx1bw8x9gcf57omyc3f2fmrd7882zjhvlx3r9c18ul4bntllsdkoauv4htsg75p9rdvgra81sitxgn7s8oj593bknoyuzhroh1ruucfkk1bgrv47gqj8s0nqy8ar7d3lz90p824ezu9tpuuu3cmyqk817fu6lhjpijk7t42oj0t4oeh4mhc5yel912ybjezzcexl8cwzqvqqm11iri7to8yyeine9djuc86cn9qghmhnpc8s4ih3kvx5zud3jjo1zpzvvbuya3dnqzgv48mh26uyvwiouavkjpzqivezi50wl1xs316rkef5v4qz9kuq8zkvmybqe001lac5b3aw9fybxjz9lf633b460le2a2mwsttky9kmfeyj4wfdu3ompdgl2u2io22p0pi49ux3smel8kulosbdy84wpcgh9w0u13v40rzv0qx2wfy5q7ehgzttsk4y4duex33svmni6fculvpycx7ozngq2inpi7alw3y7bm605pd7651itd62ov59mbg39r7jdh9y4tjcf1gfu4ny62da2mg43s3t35iq9ogolvijub8re8xnmyzr3w89jxwxwpsplh97q0ez9rxj4jtk0t082hduqzv1uzxiiuxxzubcobakki95l8hvo0zvxco0l19js71f2xpwv09j5xssfeu0wtvygoy75r0fop0ln58j4arfnfejx4l1lko3ipnuan8miiy9fwk1tloqvoqxmtonpxf4gydb3yhdgstay6yni2c4iq6lkz3bkv1sqsqmxpg7bjxfw576gp660om98xgkferu6tgq00cxcc47llmywftfxub7zrfa521pglogb40gduns05aozkgnbmzn2k6mnaqvn3byzfaxk8q7gx118kv5il3hi2kl2fdkdl6aevwndc862ertpg3a0p9rkeklcgqj91b73c1qhe1tyrhuq7k9k4v6wzda32aj2xywsxvhfoi5p603ivut3gr48bzqewlxnghuw1gs7ubs8h42mtzognnmlfzf64fn1yhlv7wbqcgtbkptmns5ehh48q285cenysvp86qmxg2kggdfbv36pmwn451t37r31c53wh6u5pmz790450rm1mn5751cu4rkv03ko93ptooeydyxcmthn617pmg82io7mq3c8xlnh1paz8nfzpu6i50oaamkh6j9niiqfa2g0nc47kmyalp0zym87ob6btnr1purx0j0deru60swpd8grfqnara5b7sf915nny1ggm6f8mipndweyvfuh4h7dzt1e235rkq202xcw4nmtte0fkxwwgb99ie3kvzkm6ndhiglj8mtidsss2pwmc94c3l8jhzswyus3frn3ooy88zgz81yyi7d5y9w9zq1g4ml2x7es1sdm9uq3wwvw7d2p1t2a3nu7sw30tb3obhc5jcx98er7iq8q1dxphsbs474bp6wgqgeypuz0u3p1c7iyz2pt1dqsonrmfmwmqzodbxbv0g1hny8a',
                redirect: 'fk31lojf1my7o2pe2xtife4mnjg086jyquhphefg1lcosdmlcsnjcbcv6vby9gb92mjp1gu625i6nk8h3f553etxp9ijq19hsp4psppveb75p3s8az79p2gep6rk9xz2gnqeqk9c1rnool87j28vxztar4nevna1bibtrrb47yotegkz43ntvqfqx02z74vrwmm6gfbwfe55un6wwkytkiglg3efe3am8vzq8r8pwipwgolsfbugdokcrxv44ctlxnnjb0ofpuk406rrq8cmm3or0edylgjnbbhea6emyyaraaggvvjf3ld00f5o3z6tzyeri9u9tsyv2mkxtdzq7cubnijpglsjg2ca0tghgzywy94tqxgf4sxm48t4ow3wpwyfsa6q6v7zr0u6jkjgfw6gz1qg0s1by4t360x5xv6v4ih46bocvimyi7lq2me2ysdufo2k9uxlznknoqprgjiv168bspq2pgga9y4p2hay5k5jtk6dq2l1pzpd209jd01345z5nlgbi3zqgkbqxss62n1mw2kmxz277feimc6bkv0ytclgl6zvgk0ijxtwybdob7hc4h7gb0yst8hqbsds3uqexloubwx33l2o88f4gd6wt43bs4m9fq174tr2dyhbf1tv9wnylusmov542tj05msk50k7yttep0czm7sw0a2k4nru3joxdjs6pad9ntmjw3kkw6mtma0qiv2faxsnvac26p8k2mbuicyzffv3p29zn91hk6yjf5gntpoir2vnidnmx2zng77to7rsig65tjrql1615m7fz154efju49xlosypetmywu9udoijr9di9j0bqy0g9yyi4jv9wcskxnrvz5e49hxjoo92cj52jm68tii5ggq5e0uj90wgchxbjohucfosk6s6xtk99sypezhmhuyjct602v6xjlx2i35q3a29a1p0fwe68693dacnjdqr00qpldxhcvjgwjecap523scpdyze1q6u8tnhe18gspvzj851gkotnw78jzv73dbjprewrg0mzs103ggiv03pgofclj191mahgp4uyhr8gntjgvv255hcoewt6dwnwj1kzy4ytqlpy67nvm5v00mc65340v0km7oof1oa99ax00avcuwo3j8gx2q9itrjq7v61h3dqtl6niyachriulxmz8kffup3ekp9zlnssitoa8zmr76g8tafmjvrus4023463d92flh0sys1qf7m4g7vcjsqlvpvt3vo39qw9wxgye2ugo7tk7w6jicobomudyghqb79zk9sfqf0i624abmj3pc0ugx2cwis8dfhn437d7mhx1epfo0q6z8yx6gwvfgm1knm9b2b8qmwjwu7x49gpebp7dkqzc41qd3rork2q634g33p1umkf2gtkdsh9ow50k8vr9c384aoer0egspeotxykhx1urfs5nzh1ioja6pjuq6pxgeu4vcjgiqqwl7vm2sywzxem1wryy1rqu9nkq6gxtubux675s4athjh7efbcflziclta80l25gadnquet0yxa0r1taiapyu9y7khtc2lh6s8s2z899bfqe28ewiq8ueaz3df5fxjc59yrndud2q12v5xnh7mtosgkrriuknjwhszc986441n1ntj07egalietv0ci9gqytp5n7or53n7a6uegnwhlfqnnkby13tq0qjbix7sqzz32hi68bcev1tuv1f3r9d3oq1jx1hgu63x6u5v6331ii6h7hi66u9uw1236w985vmj19y09vvy9fp34od6fg3cip3om8jz8o9b2zb94sa8orlk97w4vvfi1gvoa64hln4etlbkp1r9jtovlrt2m1681vj7qp4bgvck5pa5d9iqkly9f9rf8h0h10k2ufb7jzj3zc4tjbpq1yzbo0mcr7oglu9cffw7oe328gd1qshzcy2a5odlhf7auygjtj2aumkva92eac8js5vd9liwgt8mfqv5cnme6wa4cynmag3bd7dfodunubta3smmzcncihcqpw0cr1emkk083gxa445p',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 9320399509,
                expiredRefreshToken: 1407563748,
                isRevoked: true,
                isMaster: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientRedirect is too large, has a maximum length of 2048');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientExpiredAccessToken is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2d8bbde5-e0d9-46e8-b0a3-13c4fbc91028',
                grantType: 'PASSWORD_GRANT',
                name: '4gne2pbqthef7exxwrfdumxdkm2qy60bdbynxzbfo4tpserq0k20cfkie5bot1ygcxom1bhsx6hvahvpx67o4bgs287myf8kpmhphnxidqbs54uqbtij8i2ydbep7up5ooxa19lkwmrxnbbtif8nzym4pudwjky06t7k79gg69ohzt7m40lnrqgrhxrl0ney3ggap7h93etftgc6qo6qabr3wr500gq2poz1yfd7emc4kiriwds7jcexgj57f8j',
                secret: 'a7wmkw22nq7tfqp2azadpi85zpjo7e20hf1ek2qj4vh2upmm6jzkosodiqdxtq7y143qvyitawphwmamb3cyjhslf7',
                authUrl: '2kgjnqsseqktih91b3o64nlbcqllsd82ie2wmgwf678vaorwuldp2dzriena701b8ip3r5e72fs1sfmwn40u88ze1p3j0th3ft8d6tlclqi2260c2phmf940jowmnsswxk5oe1rv1yvn487mpedmf0zv2me8pn094p4rnd9hvuew0z6fiylufhj9ee12p3b32i1yi1vvzn8z1rj1jz42c2jnzd07ld40g9zy9svo50at27v0hqyayaqbbii8bxyc3phwpsxxiwvjknokturnjecpj0b1zlwf8736xl5e6puhvf241i07z6twgevilan6t39bla24umglqxo62o7obo96xcb9nt7sbhg6bx9ek8x607r963k1lzni2fm9mljfavc65jtjoyi48fzu71f4y1t5rx9wjemvcv85ia1tfsev4zrmfwxqd0gbnm4m9qf1jo5necxvz21dvdoz7c27flbywkp08q2fp2n6f9uab6qddc53ce0r02nq26fbnop32e31m1zxn8cwwinpki8fg77tmmv8k41am2p0i4gefjrogpxjy7aranb5x6l89z22bzq3vlvpn9fkf7zn96rj778zk8igllb7oc9g3beonm5eves11w20r2am0htx3mvo70c50uv5vve0kb6qk6oq6vabxsjp7i71a76ddqyv477twypabp8swz17xu9lo0uxggznczgjylqwyg4spsg4c3lnb2uv5s39xmzkohwr9gsfuuztpe10jaf7vas5hvuscv1xil7fbr9cii7b6qbk9xh7mtqn3hgcqxfexwc5o18tvdselo55wrkbqr2myoegvk90pc2quj2hp3ay4dfaqegvattduixmlf2shizsvarzcyb6sphjbaiavx7m5dlhbvgk9rlzgf4a4csoc71vqfpqwkyesmhroyyyminijw5xke4vxnh4hmtnunbs0fme7r7wypvq24t8lgqlllmgwewbqe1qzj8bb9co83v77dv7769o3cqp9dku32xv4ocddq634relmk1gatpuhnjdpa5teuhzfat29nl0qtpgyt9c5tk342fhv4h14q9udkheq1unre3fs40qa786c21kto91jcfa4p3k13sqbz2fi5nrd3uu1a9vt50ahpdugwoipfqc6gdhuj68y115tla66zfw9gcl77eucrszfgyd0gkc4d3klkttcr4p0cq1kw6ow4m1olzghdyn13apzsg09hwo0m36fhpsg1m154w5w2gp3bwag31e9czwvz1v3leiehrrqtciz5fbw0uubc7d0tu9ol5k16tsil7toljb15y0z088emwxlswc8r5tuzgudbcuc66egxfmis5tt0siornrrt3woqiym54hsvou2ki8ghas9es4jxjdh4lxx01vdu9zty2e2if4w8nn1ghwofnoslog2r13k6xk98j0vpvl309iyonqnh1ply8r0yzgtfim1jars4h8yyt36orp2kysz8ixhqhy6zqns5nx9h6jihrllfdj8xogmn07mpkwwgj9mu0v6vfiggv0y60kuugjdrel8wkmjzpt7nj24hfs41zcb7gpvffw21kftxn2q8vvic6h4r94we5k15hkwnwab7sjzcagm152upddl25x0sxy6ttxwcko0mc9zud8q6ff907hbqj8qvtqv7qvprxacembazgalml1mna852076bh0o240f3gx8co22k6czhz7r7tguqmsx9p8uhwnhreqdtzzy4jd2vkry9sghzwqz2ni3tshhsizrhkeadzz6bk763hkjaxx369dy88biae2z3ly2a3ut8mc5wia4zj1pd9itf6hsk7vuk9ylaw89vo2sb0k4jjrj4w3738ei7axhrlutbl7pcdm2mrng3kjlqn9n05r1kihem22sg15lhdt79v991u1zp3haxduwa93gdllpqmxvcdryv62r05qxvev81hazu9d1oxk8bd3uym8xtslxewwoaqpgg90bmqkocaaas9j8ot5ugojqgnb1dil45chu5hxhhhny1k5',
                redirect: '70xlx4luoedim8lweqhmwkhoik0qx057vydlf0lqrnz2yg2hpmeahkv48g656ncnfseyatvzyl1n7zq4e7rahxk3atrqqr2dolnrow0nxptmigujfjdq12od2equcfdfjtemiqejyvaq7jepatv44y8rcvb5gs4uv2iic48iys9583766usn9fzct388sxha9hfc5cz7yvrlndqtromecdlqmjol97wc6p0uuzzs16pnr4ebacf15vwj0om6h3auzazoughkr247mi49t7steu2w84b6vnqgfr8h06zcb6u7afz5be64vbkm0dsrh8lrn6nihzs2f8orqez4zkzn0vdkqypkvjqkr52qpfu0wxrsx2pslvrkwl1xbs6tm5w5nfu0khje1rj7ajh2ipha4udlhqhnbn5t2umcfxrmihoi1kesozfb2ysb8wcthggsfhmojv4g1ou70n5lqzuc5e0cg20j3btu1eifbh9inul6z0fr1nvsavhbynq645z5ab6g7kypd05jer1izxzhhrdbuv620ujtkqjslk4t84wv23h5tc5lxpxmpg8hu9xff8th2tofrl6smkfsvuenjms4yj9p16tyhb3yjebdhq8is7osgy5jtdbtchgmtyv7697te7a4lamx60t1mtpkj3kbdwn5qi0u47fz61xfezoy4nlrxe1vx4n0dqikcl3ikti4qpueagoibvvx446yyfk71urk6sverq0lklh05t9mhhhmijq98buq50c91sv3xfkaak0cadlktgwwy6u9y3xmjxgp7zgtn4qf42krfzau66bh0gkid1ffawfpjindbybi0of6bv939yk3g5zsneivtu26u7t0j49abd36hegv34xtx719c11a9kw3l94bj91iyo4ulkbtgcwh3qqbuaxmwmixl6nkylpcmqmex8cwi7cx8zg5ufpj1c4x3uxo7gdjtyi4zr7y0rgdth8t0vld636ko9o0xxjc02i4cankd44zhrbtdkwhogh7xlc7k2psk9v0yon5wr15sz0dsk070d58ap4cy2rbfiuqertawebn2ogw0kfht78t3pc4krprti22o52b15kpzm3qcoenjun8nhp4womwhzew3nnf6fcrgqsnn6afwxog1xhqpn8c6rdgkkg2xvld20c4n9j88xh6d76fslxogd5hqdg677mjc4pqwjtw9v15z4bh4fg0v5na0cnz821rvy7oy7t7726hj0n277p2o9ptaow19cvd02x2lkcsbb217tt5qsaujt790sxn1kg591z4okqz2o0fnuqrws9ffb9ib55cb12qnteiza0ud1nlu6mjgzewi93ha7w90g2bts7267xhbdvi8jj8muj6iol8lvf36iue115023n4un3ezl0j641r57pat4i0tq9ms1bq2l03mr7er7mmgoy98xasyvj9qao7qo54c7ec406ihs0mhhp26s7u22b8mprmsckv9qswkvmkfff9o96jmujx3hgsmn9qy12vmkz6rq5zh4zapihq92vppleuch7ad1z1ah27274frq3ujmihsd2bnau5g43d8ooedth7158nwj16ec3uc8i0ce6a2cz6g32lcrail0cq8cdcz7xczfr95vtt71eeaim2eg5y9owrv4xv2dnggvklrshqasysbefm9q0w2h24s20z4b3q3t5xfw2mu8qm5x8cyx1fx9iw77p4cvkbgbg3whnt2j14hio9phc44n9fjfhi6mlafx5letkl6tc90vk4s8yq7g4dgqiqlkc7wsqad7abgms66573tf260zshtoivvflfxvliq9ea3v4td0a6300rbrqf70ikh2va03trqmnblh63450rwzm2i8vjcgfq9wdby5iy0nlzonr01i7unlvf1oqan3bnrcbs2zuv7oydgl4p6fjgd3swukuyrgbr3foilzwcsykps7u3g2gg58a0fmzw3hpydq23twv1li5ffuu7w2x27nquwjfg66hqyuxsh45txsjdgayuhzrk84wc4s6o5ta9',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 14207243555,
                expiredRefreshToken: 2780050299,
                isRevoked: true,
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientExpiredAccessToken is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientExpiredRefreshToken is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2d8bbde5-e0d9-46e8-b0a3-13c4fbc91028',
                grantType: 'PASSWORD_GRANT',
                name: '4xkts32gjdz4m5kxi5oa0jacyqa08f1dvj78o13fbixo9710zu2awrucdon20w7jjqt14ge44ity7539hy3zzzbd1zfkbq99lmc0igwz47ubqu77a1sbru1d3d5sh2550quzdm4fq4zrrqnqmuwwu2vr4yzhca1cx50j4r6g8hedhvnf3tprtqtjviv5l1rqyh4dng6me5e210fl2mow11yv2ch7ao784ski8zximm04vw2xoqwvh2hqu2904pt',
                secret: '8kg7k35lb7l6w9gjszvxpxr9taz2tkzqedu41txyub1xfbg4wuykzht489al1q7sbehq5x8uknaea4p4dzukko1cx6',
                authUrl: '1vp4gt1914u9tsi8nmln71yp2mdazq4pmidx8u8sj5vhbb3kze9skmf0yb6kkrbq4bmg2pj07w63f2v41vda5mea8opxulux0ohnfkre4dyoeg51zeine3agmn7odald3kxryvrbjkr9cpz93lvvmay99bg9nsl9hfq30ib4nsxdj1rub73nmlkp52mtp89er0uy8xud4m8t742tujmu8qkj8eg3hufcnt4nm29t76yq9qd59he816ncrbimdjue3n7nbmc6nml1k52vnzqi2xfyyyagxqw685xv0rj3iyk57ffnpg3s4p98osgjmar0lfcsb67jiglo5bmpjov83r5psl4udj9fj7299594oiqe7o2zogv79ucgtewltvefiqagu71up330v3f2eo6x1s1fzv8n4n5ofpjeuaw3c9vdg6vlbn42yzjiswnw4tfdqkwg3jogk1dfftla4hs5n46uutqnq1oz0r3gj43es1dgjljof3hsj2tvmo6mqxa7myl2bjuws4on28pecdjlgpof09zxhqd7ce3b8lcgbsmqnsgylik830sdo72qrdzmaqgoaf7j3iu8yk9xgumqtv90jtl0711g8ej3kggwkdytkqlvrtfuy7jk8neauysxpt9vj6ivos0rsbgj715obczfjuhguylr9zwbgy6o2wzzh4i2i2ixzyax2itspau3h9v6kdo15eju0r3ox57dwxd9pl5tn83wov63abfnqpvfe8wa0py4e11y23hwah46liqtc9bq24nlk4opus7fappqjzdhy3wx3a2tii3tamt5haz1vfsnyvgl519ogblbff5y5xwczcfv9f5zenxgdxxe8vryamj8ulazld8tqsoce18nz4wp9i9cdq7qo2zfqynvceqwb6qj2ejt656yiqg8p6p9ugaljz7xrm2eg57yyw07wss6mhywtp3iymul5s14hi5q8bqi7rfuq35besiox390ip44vbe18qasu6qdsrobna4sr5terpbvcl86hx8hoa3rpxdd7z8u3vkbos9vraic757nesusb936sj273zvrsuflwvl36tysbc7xwjo0amdfgpyr3d2lytxi7xzs8qumrha6zod13q7j0vrspdx5ihhpi1elcva53kmk34dattp7936d9l9t0osbouajc49j0fzlu2sgmglfkyk0tj9wr36wo4qsopicvwy3vwj0q96pf6wkkc7a63bpkwmebgz35kbnuqk8fmmk8bnvy4j6go39b1tk0b3dbfvdgymfb6uvt261yb0vsax2wgaij2vzovl3xxh52wshvlrqb9trrr4snknb9glwh5p1gaoc5m2fgptv9k67fktcyiw3ykpcwfbj2l9c1a5780cpdec82b9m46s9we9jyr6xxhz04qz0el4mlbc0i4fc61p4duqvn8whoago6xvbwpd6k0wq1004xaxk82yw4fp3uq0ubzsv34m78xoj81x0a77dfpd7vifixwxvfnfy0k1pba2w5dmmrvjyn73m6oasjsnbj38nhqgq0rqsb64q6lwox6sh62nm7o0fcg3uoj96gn7tdvi7mhxqyaozlolzvd1l17xkqn4ogcwfl1bkbx2g47kubh089r7r6zgxhvkwmama4qvioefo3lffmr7htl6eycitqclq5piurd867otwzfborsx8dzfr1nv3vgxmnh4kqspv8psla84x2xfh0kwuwa6qsqhmvgx88y89vjrke3l8r9c7liwa16yc07kwgbl79o6xr1zdfiq7ee4axwdu4ks2oc7fxlvnfeshc8p6fz5p41tb5j5s6frzcuo5byjs4l731wz1s7ez5vzh78iutrysyfhmgji3dcublv46gnmbmc2apz4imk82o3czvw3jk06c5ej7l4j1trej0lyyi3qconj1ayidv5x843q7be6g0wromyv7t5qplig3q2lej8o83j8hlax74voc3emom7r3ds2cabl7bhq6679vzv3lnwp4gkbl7c03j29dbxgt098d183lz7u16ks9',
                redirect: 'q3127qpuoeijhekjw28o2soy35av23f2hoz1k4v9uf1lmvj1zgp8ib071w83iwgp88wfod4xjuflpv6ia7d222qwe5c29uaxlr2ay6lzhzlurc698xk7jf2sj5zwimhbpqnhrqi2s6ijxc0bz2s9qgpqimkspyo6st2f6eb1q7wvmtaa34c35wpbotcqggg511ashfy5cqd4wbpn0stb7mz2gvu5ku0zri9hel250uc3qnr3u4fxhgfowpjjyuiq25emunifoi59d1uqtlwik9jydi0w9exi12mlbqgd9z58p8ylk63a7iyfnglv0l1xsbu6kx1fnusnj4jfnxklfz2edjclz1zzaqwbzb436n79hvsinpnywhftd3uf85p492t4arqwuq7a8asv68fw8j10s4se0jjy62pcvus85he72lsct17pyln7r7ur1cncaxmbrenke2l8vjnzei66boo9omhobw8gp78ylg9jk8qhi93f6cnca6d0xtolrq643p23668ekruirdpzbwr87ecyh6rdyvw4pvk1g885von41sgcsz7ckn346s4wnnsnflipa2sgafpwv0x6fhxag2esbij9ubcduzcnzusr5x1h3lbz22tyuvm1afciffgr0j2n8z5v56vlb57d45n203yus5h933phxb7oz9fkdbfg0ysgigxm7ly479xsf6it6olw5et227gt4mg4cxi4nf52lnjes2es2qsjkd2tk4icy7ncwqpeynp8kgyuwx5y4uw72bu64xc9j92fse5ftv4ju9yoyqmpe1lknm8zz45lwec9fgcae24wsdus6y8twkz5zvccyhofk6bhfhoa0b3bwj2tnansodj69zmfta4n5hhm33ee6shwwboi5x9wchw74ja94k1gxnc9rok9jny5iaw39qurabu2mizszkc54gqd4ixrsm9jbww67aqhx4xr2672ir5nluu6jx9u3nyu7b3k7d2ydev57xnwv347fj5k2klr4y623halvp2silqtjjorpu3u4takb8go8ozhesikkrymrhlkfz19r3myv0xewqd3znp5ul2i9xroti9na1ylc57rmxfdpalwpmpusi892llawvmxr92hoccfy6v7exhs5hja9mx8plvbo7ue8za6vwdgphujq6gtkshuzdnuump1zpki2n12r8dpijx5k7l11iorj1c6pxhbwcqgul976jdpojdfmv8jyaykt21ekj163uq7uw81jw6y13t7u0p4c8qg4nxnmdybph9zvdrmd067r2xqx8nhkdwo3ij7ezmpyw3js2ncg781fexydl0dcxixt9b4xuzyzcknauhy1c08863jmw5qjbuargzn8b94ed1s6358p2dhv0mrfmv7efau8hpuh7863v7nave5tx948empjirtp3z1n25ymk74ub7i8bmuu3h8wnyrp18kvla51ggcwj8aqm3ex7ok05yfs8pj7cuqjamky5fjbka07nerhrx7a4otgw1nv2u2oqqhkn6jizpwgbi0y1l3wjrrcn76pa7ilmbpfjf0mxdew5biw7pjc4l49o97k6yw8rwimu88irlmudh5pxqie1drdahwy36vdhsc5rp9jr4no81531d1phedo7p86ms9ue46pky6v82l6m2k13elczah3q75ohkc84hvwulfl8v4egkjvc0y4d50lwu4yfpin7knmebke4hy5uvy291zmo540knlx8y63xt17fdfpybcr1xbd1qo0zf469hc8kt51jeur4wjoksderiq8xrd070oexo21nt4lbp3ctu1ahkg3rstz3vlj4ea0j2ghtib3cnxoobtwanrwn0dcb7cswolzi9wb9h8ro4j915w3mf8hmpcmwyoaf4jsi2pzxjhrbdqj9mq0r7mjl2pha4u1qh64gk3lrr0ht370htf3knewij2lyj70ujeemnekjdn8jo3j429bogirj6aft5jcbslq6yf5noma30pflj31fw1r2q5jxg2orbof190ucu9ut37sjiz9h31',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 4221695852,
                expiredRefreshToken: 45055194335,
                isRevoked: true,
                isMaster: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientExpiredRefreshToken is too large, has a maximum length of 10');
            });
    });
    

    

    
    
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientExpiredAccessToken must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2d8bbde5-e0d9-46e8-b0a3-13c4fbc91028',
                grantType: 'PASSWORD_GRANT',
                name: 'a2begwza8gf9j5egvouclx4nmjmmw6sjhrb4q93pwra8fkiaxgosfjyffi07f0dqfb0pny6wknh3f0hakbnynfughkzzdew0m615ctwrgkmc0nbxmrg57eb778k6qmua3a0ql9snvyxafq7zhti8f9hh3m04rnzc92p8i5gtvsqdmd7dqvexcyossk077pq5b3mpv4zvpszqquyukhtzl8uy5ooz94ihgfzhpqumgp9ueefvzww80x96mgc8xqn',
                secret: 'm9ltrwimir4ue630n5p6p6jgnctppixmwo9mcnzqwibzrcth3spr934q92pb0zs17emx3okq28uw00f82eb4tgmkev',
                authUrl: 'i7o8nsj652aysawmtugdyvfe5q3hp3aaipn3zlsssjqtifxaisvyhkg8hattie05se87zwfxjls4zt9zh3qzxvp6uw8uhd7kfh15jx46hpk76mgeircx0gufe449obwvorl8uezk9mtmgkqb758w6svuvmrhh3wfm7as8e5prbmzip4yht7ayf08827sf5kdsocd08i3kt7lllbbxo7vukodapcy7trvml0q6zg6oypokx5zspahxlvo2ole3xgc7ts29fuwxycil0179w0tdflo3pz0h30tfwj9ia2muh1ygjb82d70h68n8698rv9c5uz6dypiahpj5dxvgqoe38bobkyidzdl3vtqrmjn02tutpcsnsqvvth8tegssf6ub1ja6d5uh1ane6vdj98wi6f0tjotxnp5rczttzoxmi6drkt0dzixw7ouuwwld099cl1uzs1f4dblldtwzq1up0jlxhd5nvvoqs9dtzw9as3x14jedrkjbw26rfpv8nl08a3sqxyilc4v417sqf5n8wyyev8p30km5f6yf8qlr91nkemvu270oclmeasdnnyzg80sxvf6ctoairscu5drdwdxhdrejmkznwyocriesg3yxox0pplwx6i2wjudicszm2d0tff5zly7fybhdfxe1047uboa591qnswsjb3ieqgvhhmou81tekku06cqq2bsyht5k3rr6o1ftm5h4qnsnjyikuuiuh9ziehfd9uzbciyrx3gl19e8o1r3g9kiz7b8unct9xb46vefi492rnxh3mlwzbltd211jmr1gxf5mr6vsepi0r8r3b7d0z3r96f3pjm2dq7ps2h0yniv7q4h6plu0urb2absgm3o3ysgknbzs28hdp1jq7sli7iao4rph7ecnj5g6bccjd3jb6gbbbof57axxeuabbelo8m40tn16eerb263ox2liuth59zibv92uo7h4q7kgczl7dd0i2jqly22upp562rn1ecv0grvsbaq482w0v6h9yhix7v3ktziygp3rffq6ro6c2mg393tv49dd7x1so9gesqe3orbytzwobopzi5ex9e88pu74ypxvnr0qv1os2di7nc4kjhska3xmwyetujhmmg47fghgvotrxqe2rm66h2th97txjdjt8ow0apyl2aw6q2lqdhr8y6bcn4tqh5ypqef6y921w75f0f3kkmi4i7r5fc0qn1dbqvfwio0t62vd0v1zyaokedvsi98mm0k61003p8pcv2945t6lleqabbylurt7pxeqiqlzbla83enextp3z1if6mdlhhmrg9aln7s3iof8nj7h2xvssey2429aqiyoh3lycjjnxt1994tkd6t7ghkd8rwo98a46c7bsh93hdcesfwixamp0mxllo3dpumif129jcqrychfb0o97hfy1ixk3h6ap9jhm3ulfkw6yvf89c7on1jpf2xnuo2j4lda6y4f8ree0qmvt3cvxh0u64rn3wrs857m84nwt30zwma6g95auinnp5mgieuuk1jpavvb72qflpcn10e6rcvawnsk3dmrxj7gno00m9e6rueuqdnhpamwtn4f6wmxb3pgvf26raqbgb5g492re86i52msanpag2eafgaq5s21rrvgc1xcouisiz1l9zk18rv7i763vz6ewllaxny2o80fa7nuibu5qh3xt0c4awn5oi12lwlyvb2b1luaelu4n52ufi7xwsu1bukcbargtd6lai91q2z0snm9mkkxunukftuujehe4te20d357b0iuofjog2kzqxnlas0uu0mkk624f9ivbb7ydvn9zu2m33m4bc30k1oxr3gpm6qz4lvc53s41ftvf38vb6ey2colfr1sl1kkqnoiljb79jzg8mhcm7up76kxeeiqqjjhf5gheuy2dnamxpnhwulyejzbr4tp96d3z3am7hk8f0dr4taxe10dju9bsg83gmxy0geea2qj74wb72ofsdrvw0i8p5bmv7m1gsttw4xnl80ct70qe6jajq6aru8o74s9wlqrm',
                redirect: 'vsirsh5kxhd87d9ml7qn1kbz0rjuqy5g3qk6ti8dx609wyumrrxid2mgu6tcjj38wvcnsgeo6zwqtohvcp0m6gsfs4dwa2k9dgy3jyg8g9j86v2ixtp7wursq2f7z6sczc21t8om0wgbw0ioirgsqd8vhr1bbyz0qornmom6t9nux7ahlon87lvyg9x1izxho027ilr7kz1aj8rfgfpi6wr3q87bt3i1dves1cesxqy3kaws8o8dvcbqqzudlb5sw4676x9crldatfxa06jbevlbzr5y9vk5bu1zdc4bq6tsxgjr9195qlm8pr9h8q9q7cdiix63sxkkpefq5d2vyhtz6naog28k7us0vz5vig33ejt2dx1h2zsml71h3q7ti94g4x56jxwy3amtpyjnrqrxxagafkbg64fwoynuqjacf9h5ygcf3zam5scahiuam556jpk1y8y89qlngl7fksw87jm9i55vteitx45ecihxon8mbfj11qr5zfzjmkoptj12d11jd4n4yczhhpileohq5sb8bysqfucs6mon9zmtj2hcetwhnl6khol2kq1l7861a99afoi8tpiw2trpevzo5orlmryjtppdlt5ovp4599pyeivf8rt9gx82ckkezx4f9178j6011i7btlh40c17lx7ylarkp89fwkj5e0ib69mbfjllg0tp0dj7awhx0v96rk8ewb77xaoxc5udw4m5d3kp4ba33te1xlq1u6dxfanb8di7nejnuni8nzhvncvb2ed1zqgpa3svijcuyfgo58zo2340za8bqic8gi7yjnqt6woqlpqnxggp59oiasehdaz7z0rdrt3how3nbfaxhdhbjdliitundbzeevp0w2j1aohwukyf87y4szb2t4t6s2vuk405z5a7axozn08qy4jq968zboiyorpuen2fe3wcnk1p4yrv439k2x7brgxxydf19u9yqeom74migug0yi4at72utqylnq558gruuuql9f2yxn9d6fjkhnskw84kor1b4g624kdoc0epsh9cgjq6rr35tghl2b0n4igjsxc8dmigsdg0zcp256o5wwkq7ivud9hhkjh44qbajmf92xk8v6oszebnzaevfd2e8crmpd1xk4zzyerhy2r6kumilwz94zxplnyzft9cskt5ffa5qrp9j110c122xzw7rtuamnn47rerm06lmxxz9e8i99fr3mtew8rfv9njzfh6z4hl29qj8haiklvom80yrurt5ikojirz8sa8lz20ijxb5w46gtnm2zynxrr3i0mj5dayfrq1zh5azf26nxt9puxwqls0u2swovb091g374nzgtpgj6an30hlz5h2vqqddp3vlspl0tjseaj8y50wyyg7x2i0mf7irdkzugnsjiq44cd98y2oa503d222x7dkohyrt6mb5wyj3c0n8e2s0klalm66nu9se2qmr5g0zsvriun0zvhdokh8utivgtq3lfgfxwg1wwobux4f36pz7j820xgknwqapbt5p8ge81rxeinh8oh4wlj8cbrjctkzjkm40qszhacprkgt4jonklt4i0swfjt86792nppzob6vsw4y5zykxkuily7pkos76tasfh53g8389oeuorx627bpsdx8c34u4wkdgs43cam3ajdqg4s3lt7ubr8sksbr4e94hxrq5swg2l4cdrcx280uloaytydlywqcyeftetept5zfkrjepxxfet39tlj7lzp5sx06ho399z67lrowb512c8pmb0m64d5irc4zxiukp4a5p8wbt7hl30la9koye8a7mgixdl00t5bgv8iunqutnj9l7btivvd3afdapy8selvjgsk747ppld0p0ua34b5e9jxifgy0iw7xc0y2cmsx5s65gm5cduo42747eckjlbl2mq5gzc3pb56rou02ihlbtd2w2rtvcg29oz2b1q2m9cqmcakp5x7ixx89qv4tiyph6pf6etg3s627sbxzfh2yzspomrxjmgx90ucerfl4nr51q8m2driofkms',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: -9,
                expiredRefreshToken: 8569636558,
                isRevoked: true,
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ClientExpiredAccessToken must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientExpiredRefreshToken must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2d8bbde5-e0d9-46e8-b0a3-13c4fbc91028',
                grantType: 'PASSWORD_GRANT',
                name: 'zzkt7rn3tstbcasrzc2yavll8x4rsopgv7t00z9c9qf2118mrneqppgozh549qbjlos9aj7a1qefnonfibygjky2idlv6ei3reg2uqs2809mrfbwh0tcwbk34e95ll39upfdttb9bj5kcj1jsa2ifeyjqpk3rkxz1h0ia41ihnfncm3m6r8ip0wqec3wdex9a02w2n9s8oqp8eczce96ri5p9mfhmjrdid7xu8zeac7kmoush2b61zezzrhsr0j',
                secret: 'rpeyr191raseefdrnzbon3rjcmk1npdh1mu2cct7wp7oadlsmt6kvpfbdfk7118cvypqo3pg3k1vjbrjuwc5itqvp4',
                authUrl: 'kn4yw3tfz9699so64mw7pujsph6s8o5cp75ozfzzxlwm66xdjq721cuiumncakgytd94ko2jeusjv8arh54v5t9yiqejj83pp0rt1llhw7e004hssg9x4y17fgqbbr0vazoagxph1j3po1we3bdqn7zx0g47ychwjxwfq3jjv6ku3jyksprja1e5c9iehcr6abpa2i9zvv1mf8adiu40arab6nbbih1z1kwvjt8go742ac74ds4wpxg202u2ajcmhotl51ocap1dbmhz350ouryl51rmjp876f16qfezwlqah39zpdsgis792ho4miggngalstly81xz54sm8c4o549c4nt8rf6rav6nccinc38rp88t2tfun6orqxt0l10eayjks39b1kmlnmct145khke0tjytv2shkpyh8np4b1u1pyu9az0tniqtg5lfcc3vre2dik0h91qe0tylw6y14q3gcpoqp7b1avhwdhgv37ijjur94qkmqx2jhnnhn8uwm371kudjmunp00ustlbwymususrhn7emuegponflgmjojr5iwe306zytuhqumta6j9kfebj49lf1ttlt0pfiyx639jnxhz54z0g6qm0qjf4vijk5o8adb7st8mgm2rw51nb2m6z1bsa6nl11w3mq4i020nx6webl88si5aehn4rpwjtyt154oxz9ijwufnyu78y9sidsldg80buli39ghsupy85wnbl0aguzujeskuyi01edf1m3mb0x2jjuxmf3f5dt0i6y0nm22y3f6ehf73gvkfk8j0odq7rdyhu3t76uuvpwk8mp6ff5vm4tlvnmwjcs7pu5l9rqt1nsm8dozwez4lwa8eh6ke2l4wpov7dhsonq15lo3pa53iqzawqvcwcv82buxpl94r09wc7peka2vi2f154g92odsbr28fk3zmhmplnnavjkko0ec7e6cds9mzv8dmzor02k76nqmjhvxuykqt4s1gx29gtf48c7gfoa6la4jlnrzdzz68ivouf7gttvmspfuzznfz79i54g775fftmt2vwkw7763n2u0y4fjce6ie4f12tc6jg29rjjd4fdyvyrilaaatda67odkykcrb7gcc4hzlblw7ng21spra0gcwio5spj850w9ldjcelfyfcfezyc2xus85dn9kjsrt35yscd2z9kfjzzyw28ug57tfuaqun7iloldwkx9l1pn55xsna8jpbndpmlzswrqk0fcha0hk4p7njrxrbg9meer6rfh8genuf2haniczd9erao0gzjhrudep0ax53c89nswwc5nfer5nywrpdah56o69tzj4q7eqk1u950zvzy8z4xz7xtxwk09b310ur60jhq6qmg0ctxb6viioxw08izw2o07lzuckicxd1lqntmyqjlkjopci0wsk3ii8azoaf0ojsox4gtvq062w6aqqc14v4p0c9qumrusecz0qpgpuakcrvqym2aakc8cx5g9ltdon2tn250z9o809t2ozw91c5af2k19y06s4yhyl12d3rvf722gby60awp9l2emfdadbg7n3z8d3ra27nkh6sf3ulh3rlxwn3l6a2tue72ih7egs5kmpk2dnw6n0p0106ya3vt2haz3n7v3c3rdtoay0o4pxxf1vvwxbztii2ip61fhcbfg1rrr8iwh9mf41psyb6qawqz52my4mwh8c0gfn3dkxh7urcjckhnnndf2hcjtiz3ujkjpz3vuup3ulyqcu250z8gt84ihshmhk88umurtjsvbvzw2xwse1ow3m14j3wvapqsde0v3ja7q2ehukssg67dqi84aqqnoy2qp733l5c0ikckqzws64grokfwvvlssoenhclkg967o6w6ncwu45bt6q2k4sl000g6zurza8jd4yeot1sgevwwgj68xxoztir1o7a54gop57rs7ky476h9m7h3sbl9ltktj0818lp2hoyb9jrk0pfhfn9iipnqht9yo3s2xy7ybd8npwom6i0o9bj66h0sze9hsw446nhe0ryn',
                redirect: '5apipaub54jp2yn0z93ulmsj3s0xje5qlzkfzk82kiwk5dx9qr3xz9szmvjz7j1xc1k9z5o33pexhgewk73gwhzdybrjwnhqtxxg32lyoasqndhhs6jtttvi8w3vl8jel8c4cvbz83wf1z3ndfrdcmcl3h71bkbaz5j28aruwjmeqb09u0z9d5kmdpw380idhdge5yiu6y2r9habzgcx8m9lltpsz76ugb4andae688ohc49rlx5shwerj97cwc3d5maw0efqxlemu20m6hko7nsjg9b2i8x7hin6v3e19ljjbxbwu63h6t8u1248saol65ef61no5voi1ls0sr2vmb2ymbo5o4gqztyg2em5nfpj483g8ek1opx60ek2lv5637agqfyoti0xnlcbd6wfk8yu0wsm0rpi9ntd0l36jdm37n076kgb9naatrl6j8gsrh6w4w1mjrkf1znob9vx3h1qzzat1uonsbtfnztnmejcwgot4hwom5uc2viyoorz1o5jlc931ckoj3zw2l6qx03r5fdthq4zmsievro1oif2owo6hdxe4u7jlaxams529nfyvdkamjgyujjocd20tverbenl4n2dug12plhptxlj3sbpjon1n5j4sh9vg7y09tig1mb54kf7fo3zvegni8pvl7241dspflsrp7e7zwzettv1tbbhh41rdci14hx8navd3dm0nob1557kg3ff6j1wdc35yqty3g9s3ngwyityshvp9vhxcd5fd2b0hgxqdc7y76ygqdg72llzyijd7q6nq11sh8qfa39efo4zpyo0i329ur9b9ggpwf8xb6td0vpajbo39fksk7i7s1hgmkxb9b4v9k8szholirmk1v8cljclefvfdraepchzz6xnufl636hvh7h3rnrn1l8jlxax0hd017klc972c0unovljfwif14bsok303du6jr82trx5lxec6w7t4fl93nhurfnxl8g2q92vkaclpdhwihbgvivzw42ym98907w6gcux48p4coe55lllhlh0rw4cplltw7tke239y1ns2b5301i85xnml17hlb6c61yr7qmue47ikahrby4ah1wvs6nz7aignyyo1tvq3c5xvmlkruscj2i02n0trsbcurq1d9finuq8pgxyop910iyjcc4fu9jetoze8bngy9m4nuknvpwe1g2helwinct190h9jj8tawwfg5zw1dmv898nytdzy9uajeuoeqbn0tyqy8zoprrpxip6xvc4ut7ufebvi057hy964y71moap3i2ex9k97130opd16gbki2m9vpdl1hl5fs7c2jygwayfh2kj5xlqslgkl7htqss281f4wzmp3wkmtvio2hd94gn653eks8o4s29odxli4pyccbww9vtsg9lyaj5mf4hhlf3ervcdf5dbt8kapv3owtkrap0lq3qoq0dg9rdo0rke8en4bn17hserbb5rt9rzolqysud34s12wrs573rgcrhlu9vaaqke3h5roddygi9ag6qzmca22db90qkc4c91gbpq1w5cwv3mmkeihaewzidsak90mze2ubmbmr2dmyo8m33jlf2ejwgyhn82qlwq36r2rk82znvnhu806nvt4et6niu53abzp268c50balwjrln9m45077mn6xgsd9grljnic1yulvrbvuwfpsgeejmit81b85k54gvgg8mxsu268t3wlwoin4lgjcpcz3v4zmv7j3yzi1prb7oecbcc7a8hjv67jgr7qr69b7x7z553cyivccehhnjhr1vsyhm6cqp506x9of0lfobwq9gxquddpzg5ikh282fofz86uwmpjzfmdakxwo19nek22bck1m0cy0ldbamcatpfft9s58oo4d7fxj0m3bxy4umuy9pf4rl63l37iyxrmh5bs59byi0qzurib7eutf5zda96bsfpo65yzv65ln9ippa1atugq3qosmiu9gbf82poscr64qhdp3e2wn041bc2qfsml84ehy335vw9hcfrgvgddtn1s6f8o2c',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 4746341898,
                expiredRefreshToken: -9,
                isRevoked: false,
                isMaster: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ClientExpiredRefreshToken must have a positive sign, this field does not accept negative values');
            });
    });
    

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsRevoked has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2d8bbde5-e0d9-46e8-b0a3-13c4fbc91028',
                grantType: 'PASSWORD_GRANT',
                name: '70vinxjtnjxpozty48c4pfazs93uohkf7pwnak4piejp6sj2661ucnor74dhqd1vsrti06orjee7ugvwo0fzl66u1xt69p0qv6b4yyschvycaard9inlfj5uj2f9j8xmjhh0c92rt5qhgzr8ayhapfzopdwxa4g3qkmwl708isezhjfe3ap2y7rwajj7gke3mq5v17rygupyvbeenys0nexw153rznzpos7mn9jtzciwr4m9ijvhshrmmj8cypp',
                secret: 'dqgvn4gr1ticdscnt327u4f2h3uzrlg6e7apmo3lup49yqk0zz360jevqqhdsloa9811w4xrxaijwsejd9qkpl6hnl',
                authUrl: '4pihj1fwt20rv95y566ca4j3emetcml0yb53vq3z1glrpq05d6w5am3gszzslf4w128c9fqf5untz2p678juarct4jld2srgrxhamzj5ycvak7dvid83dcpsssm4hzix2j1tf2uugfkc4h1ny4kbohbmg8do236yf2tlb0hxx3xen00kqk0xdqtevfc5x5tpfh9nrzco1guegvkeexodkscai9mt2b6uwv3c4l0dtsgu5grvbtrsnw9wqdxbykc47s7eh9c4myw57zjem4jrridd33zma2ccwbwoaxje23sf7h25vl28vpexeepqubd0anjeqwkdeb6luj2k9padf9a2doo811c8bmud6jud9dfrmik1thiyyio364d3dwihye6xj9gsc6v9lmwr9o6y49pcjfir6gsqc7lz5d0wh8tolt2ck6imbhe7nwrq0puk0nq0mcz2e95bvmohztb8okevkfpieb1ytb7got6gcyz6rerc8gmtrwknfmgm4cpwoqi8yepm92myd3sq2u62fl05c4369p8tplugdt5qudgoyfmftx7q7gjwqi79bsh4vxw0e6wn2b5rz8rsv7slafsan3d5i2gwsmj60rhlyruwa6j3jln1ryfcf1k29xpgtuvgehoun1f51hodwnpe1a5dzm1vkryp6d6l9si1ebyleq1gxfj2nhewlczczie45hquqianl99xwzd20j70agwg30655uwgtyx3sc9qr1gtcgoc70x6k8ypcrhlbunm5fmauq7b8q2prg24ry4cps1f9lo807h3pawcyk6gqslx7vu26hzrs9srrsswgv1k9ufun49x847h4w00dyvoqpt1kta9rqijzge033pq0olfcngz0vkpxpun67m8lbqym7jcw4j6fswdxryf5a6asoesqrbq41u7ys99hh7mu5ox2c2i1ks7nz0bbg8rmeruvldrtrjuus4c0xg3xnopmw0m0pji1t9pw0vedi8g3e6q6p7fr2raccwqair3k27dp0ipam353o65lwatvn4oahp74lii93kuwuc9o1r7u5klmrbuxba59pog1r6oigxh3hvsgal1td84zl8xbvd0odwqkaek7mf4ypjff55m3823oj1tgnjua1uaspx4fxukbvkqxh9h86vjnntvaj5oum9e1aet8y9wby2jzrzvhqxoi8ds53kg7qdu4rnc3soswv1z6e2bnf8ilgn9rnhlyg87b8c1ha1h65un0tcg9t4v80qtqdafoi1wtws8576i1hr5obpzbwn4nlp29wrdh30vo95hyn03hgyl5rwy6oqhpztc60a70yeq7q8lwfgznc085orxd440c6941dmgidd8xppkeb50ok8441cjqv692k5adcp9otb9exnplbshyrz5libkk87z2k4aq8yc9mtbvq1oradyeiehknutkmza2fpt211il195fcpi6yeuivc9z8ihdwkyw8pat6bsuwiwbt0j28u1bplutr6urgfpxa3gz46ag0ckrrl4sqc9l4ff38681gnowt1qjkrwrom3060ti6a7waxg5i8f7mc5xlej0e490ij3x0mavuf947n7rsfp1akiqj818a8i69eozdh52h19d7yi8u41zsy5hr7qnu9rvhjnrmnpafsp2kt15we2zwvxu0g3394vja5rsmoyp2yv4zlrv18h9ki3834yr3nw6pcs2idxm68mb6bikhbwbp5iprzl3yadgzipwdctjq2twgtp3omuoz4qh3npr9h744sc0wrf6a2pphqx4ssnynz1ae8i60z4r881h209llo2g1x0s4jmt3zr51xagfmrjfwwtnzx6h964k7oj1eb72jwm6dknldbb21p5j9uddtxfo5ral9ucurbm8x1gquyn3itz5qo367qdyrrghxjozn63a0qe1patbmttehusxbyrw6767ac3ylcdisitvrv4w2hry7j09hd2z9q9mmaehligc8pw7odd0ac7lfxgdr2zdnwn5etssw5s5tqazx4uc60coqcstbu',
                redirect: '4xnccou97a6y5kv40zs0lzumyamhw28vmcgm7ejxpjxs52vl7z93fdt4bp7n0ymc9vxjqnqm7nthyxqa3yakt120caxvsitfejnruxfzg1sq91b4ev091lfurpipv9auu6ubah77vtt52gs3o6aercud0zp7xihspvem6nj6lh0lsw80l86h0c6y6v5cfbj435lha2vmonc649v1pllt5ky8lnoli93d42d3awywsbgipdlqh9yn358u8caa6m5bh6tj0105ysyaqiowly3bpsmdaw1kha7a1zbxwrjiypqjf4u3ygj11zj9ek6mgewj24lve9yeo8dosmk0ezlj4nzy4ctqzfrqxd6j7tbhogdnmykcq70pe6kt7rj7waigf34wt8jwdf29b5zmz20iazfv1rnlc93nbjl4z9c9xg0ilyr7m7caseuj878twj7ll4hzd0tv7vmcq4bon3855n05o1h4ubazgr6g36bhu08mb0dphbr9ard2samsbg6d10cdwn7nsropp18bfhyvbfujvtene4y9q1f1mv7ikgkwxn8i1lutcjteks4q7a3ggmh2a3bwof8gem8orvdbo5n82xb711iliu6vpgdgqkmp8rdbdk1runj72leck1n83kot4nnggtzs81snlfkcprr37oofkeds8necmzx0mvx0009exk536hqvuzwgy6nauyx2d5i7k40436z7536o6qiyeg4zbn6bikb3dm85orvt8zstm7walwihsv65gi0vzz93ej1lqontov3hpbxroo60k5x2y40zcse49p1vev8lnz5nm6t4wi1e53tzerdd439l29hjxxgbkwchx3o89zzi3tep1t071nupqien4ahubmb9vdglbjqt0s858xa84c7590vrj7arajti6j71uc92cwhaflpinzv36dyk7w15ty3n9dz9j1ng0q7ow1xlovkefc6cd7fszao179esixrbir3cblmsa32q7nvdv6xdg0azc2ktdg5vgrqnmxpcrnt1opuql5sqq19stk81eghdt0uvk8jlzk45tbn3kj4kcraqifn4rq3ts2odzf6mp56t20v0k2aepdcjz5695otta3dqncqg2u5mwv2b48pw1y8z9ebmcy50jqh1bq5wqkyho5731lpmpz3s12ey0fbz3m3r7h64h4lcuyzqxdk30j7jl9hzd3hkpxq8dsgtp97lem3u94fmodej4bzwk8p00w76jikqpgoclhshtk6bnykzm8ko9w296fpmab1b7reghm8xon2cfvv2o1byg5crkl2k505mth58x2awg0mf1aefeckgse0vmt8l43lnggotqn5yzxeektv1qaqp2fu15mv9908lxf28qdgiahsp1m7zoy4enhq8nno8e0sgj3q8v6veq0emqm5ajy8w649yh6th0g8fg961bynd9u072ojuny00qtv35uogonv2gb042d5ebpgx9hqkopaf372fboyd735079x2b9rtty0x6bydbkl7jd4fbmptlxwn87lddipbxab3wcfcldgtg6jjerytfsho3q56gt251a0ccroqhejbhmzu6j6sikm1znzyqnuhqphqiyjlfy3k8hh36jrt0hkyfsqab9sp0elpjvody40xwms1rmgs0dr5kj67gmxpi1t6b19hy5twqx47a0314yzctjnz2qfx2ckhx85llp81mtlrz9lh1x0cr03nxutgfrtgba1kcho4wy5hwodfenpnqy8ag0pewrv749xm5ti9qckepxbvoy22b1fyb3dmhemt2k63yhkskfr0bmc27xddxnck2d0azhxazs05zhr2nj4done6dfvzac3t3yejynbzceu4j3b4kge6vn2766q19uofdxr6f82z2pse5ve88kujt0eclfm361l0k2qh8barfsqictsdyx77j1nvij4uocxqfozbbaykm1jdlsn01hlur07y6rvtx3fu1e62pxyozx375buol971qxq9r2511lh8863cddjaccp28p6ljhq9cq55i29x',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 7172096710,
                expiredRefreshToken: 4240114855,
                isRevoked: 'true',
                isMaster: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsRevoked has to be a boolean value');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsMaster has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2d8bbde5-e0d9-46e8-b0a3-13c4fbc91028',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'lvuw3qc8eoxnarew3m7rv9kv23xuwqzyu2al91fz90r6oczmb45349vj7qbczrl11v0299js0gxps9sylur74hn2f0uvqzsaunwcxrcoyip2m8r2tm0m90pg25oukbemh2otxodp3059ylmk5eqm12ha8kcxetu544whpqg50m00v38pi3x6adfl207do1kkqrx67atwx8j7thue48gr69ahncfiszcorlsb00jcxecsap978m4xg6zy067ejle',
                secret: 'bpfxqluw9l4hep0m4ufc6vmoxg48d38jkd43rcbswesamc6wlvxttee2upxfx6yhmjauncn83wyhtjc623udjz55g5',
                authUrl: 'abe2cwt4byqp9dgllt1jc8rhvc4k94rq98mo1c3pdpevyx9gcliseyx1fskwk9rml5hsys7u19swaoe016fjha3q8ohhis8ud3abhm1oqlgmp4udm6a38zae717jcrvl9015cuinxamprci5g7juf323y37xb43467xgjlbfdqgwqh1tlmz968d57wj95hyqdwt1ufp59hlc2ikg2v1emf8wp5wo07jn3e7qj62jhubydt6yifxs0sts1ushlnffpmx7qoolgv3zpznqxuuugek3dnnmrvkihdntiz101vo59k87robrxr074euiif5r4hfsjku2xf6mu5h0kob2cy5vpvzpxa2xr53t6uy14pmaq6puph41ju35ohlbf87vjk9eagfne3lcz5ycempg6n8lc8ctdlccaklrbuljrijneb2s7csovfmxf1a1jh9m4l9uxpmoo7j1uzt17oqu05av9v3dovktxpvvj4ykhcufoxp8fej4uvy8ap6ku93uiyrcmd3lyy2egxmf7f5ikvxliu7qcyo3kw3d02jx3pql8dm4dq5b7csye06n6c11kmrya4kebhc7ixuuw0eluld9varkszyw5b22flebdnfs9ezovf516njqahxungyfvkrck7atp3cinnv39n9eoup1hqpzr3qpbi7yovway4qa7i1qbo5mk6pbd91e3fkyzlxqwtmph8wqrf7ac5nutprbix541attyogwpmz1rf8mpt16k7791o3dmtaufi4bhbdg3p54zn99s2v49l4p1eh1o94j2iy9wlddlpxiqqdqrhj7lh1gjwxxhr4ed1hf1o75e8flfyjojrxn2nebj0a6yhmls2sli3wq7e6t8f4g6tl2yz8wp3cha9f99a08gkorsvzqcivlyhqy8jv9r9hvc93y9bnk2tv4a32ivjlgmq7ik95yc6c3wvikwld7hhai0xqrxi9q7gefpzkjhxmiynv6llity3fz7rhf3uv3l855upf4719lps0jgkikfbweqsa0ise4id5swpbr5fm9od840i1s7yoebnlk5w9u9s111g7cdj4tb6atfp4hu045rb31gov2t9f97vnkgj9ajcl7xq42qq0j7ba6x4ju6fn84pxqhh5p4e1557cbm1cu7qisjuwiv7tkajglg5a4j5bylbf11tsnjndrlfqk4m2kg5lhz9m4we43zaqcf8yro77zynqm5mq4ym017xeukhus0pjpov69etn6utuab2wltfc3c9xdyveoee9u9mypoqh8yfrkxqx8jw1ughzlyfr9xzwww47apqdiswt4ux41d32r0wjeo2ct90wx1mknqqzx28vh9ehq681174u0mcedd0ozuiwopi8nxs1eku6bbvrjh9w1h3hy5luxen8hlaxd75l8bzele1372r2sb95z3i2eqvoqqq1b80mj0vf6dmzpptvbo8b517fa083oxpa954naexm56opw8kfpuiuy0g9h9ig0it2el1obm7d27u4ugb9qxw1t5kqjm14j2d59ji162vhx3cofdvpifhak5kvr5hinwmj0t5sq2kkp6te9zh8cr2sdd29lpe68lgmmvwptruu6q1qxvq9vlhlxk5eco6t1ie35nqk4jhx42wwgca6513cl07ogp9k0u2uenipfycc0d97vzjhxqa875a977g3uao0kwbvx19fob4urcxtmxkw9oh8tzfsmrh1kj1yy5npzq3z1ewgnm61z7mqytjjny3z8avbq3owifs67pzn8x1thmk4nfrt2hg27jrd0elcs82uk59583iqw2vvi42qkmwewvrm1o5a3zb8e4zsturq0zm7cw7onesswjes24ceqquczhqhhrsz5k95dn75ws4ehr8jn52hoar2xkvg14ljaggm4crpxypvvvfbzh8byfxkyyzedqzdmpww21l76hdcf07yx9qe63e9a1xfsvbmkrtxcqgtbe4k1xozkqboac76ncmft9gqlbga0afowamvml0wasvmovfeb4qzcinpl0p7v',
                redirect: 'prr17sgsojyu47gce1j63i5t0899ur9u28c6nyl3o8y7c7j47f4b0z9b6rwxzq3g3kluy89cuxuwmw9fh14oo3eyao2b6bwtlbhksjalrhwn4ih7z4leqhbgsk7gn39igv4i5hcbyik6ibvngftazapq8se915b6i3wdocbbzawi1izet8hu9rv30qkjhfhysmflmvab0yj6amlte97kle5w7i0hxdxtq3mikh89qfkpmffbicnefbqx4v0010uchoijbgpxnx71e7d0wrc3i8bdoiklc5re8lo5rpc7axau6if5in8g1jjqsn12xnfojy8qa0nkil1sodrq5h6y3p73f8ky9vz71v8vuufkpy6ohovr7wx20fs37sez53kegad6y1sb4l2s3x6axvi3p1xexgdhi8318c339k9mh46wmrfqiar16g3l2qijrvftyjkmjt1ry2lh1hb77ec92tr46ajm17tys0npq9y84gpxnb4bbydripvs846qs7kouldeb7ct08pd9qyrctp02omrwi609r1nfimr8ai4qbl2j6nobmlu9qlblqoslfhtie3amiabbnkpgcstobqrw0i52aw2lyyb9g6y12w71ymu6k9fx1fa8zbwtfkvkd9wlr2b65prbnzqaivror2coe6724rnn1cj0jxfup4zugko6vovwaled5kl2vgfcjzpkacqohyuam9v9l3inlgfcnkhyz6c9em3vm4srj3z4og4iqipvrqm6g2yqn3c5gb162e8wwpfypa9q9p2006ja5ukcb3m8ny0qzrvw0s3he84wqddjlq9igenpwxfqic4fdeb3lez7e79qhe4asprjbic7318dvihwcrh374azvo9sydmf9uhm9eudldlgjcg52187jll95lqgmxa7ofi8ruw5tvwg7vjtxulkz002tcq9kl4ufcdjzvtf5dqpw9ljqcr9s51bj0ns2gp7p7xwmsee1jqsxxxkm4u0vj54ku6gfcnodpg3hiyei7qjr0c0vl25in5mv9iu3mzfjjmnrzzoo1ea7lt0soegtpon9m4wwxsqsibesvdxyo8k6s6vefsxkpa6uvrzi7xxe35dfccfvdfwyydyx0tto1ux0byt0v19ufe7puqoj9ixx1by35msmjbtvqw2ec7dmugcgueepg1e68w6rebmirmvckgdga7wyviblpko5ohs1di7c7abfflx05rng5b3vwvh4ghecgofobtbdmu1qjotinbqzi6xvdqpxxp1mgq4405y4rrdujva6r1mw6zq9yv7ovktali8b42j67tcwmwlf9lvltjx570g1yxqghmukd1axyfntrmxrstjxq7z1561bdxtqqb1fvmhx4jxts9calt6nijc7dqjnq6d7hz60fdqpan3j8mekgf2ikpqa8834w7sdgcctxwmq02y2urru5fqb6c2tvuxflrk6r8z1ayztgp3wdscum1jtnhzvo3f07023hnnjecqx2ga3dha6t7kz0x65us3bcf5rky9qxne8gn4ljx1bipz5dasgtdok9ga57pjf9g34db98hl7l3lcvfiz2xxoqq7m5rfhr5yqyt0qvdarqrpu4gt9h6cj0eb9k20getieg1su7e9id4zzb9l1xnzcjq90ukfor58gw5smwjd3mj3y4e6gkmlmzf2mwzzzn60j1bul6cqyo9lmoattcakjr9zxdvdyz1q4j14s4ki5xjk97t8m97iw79mq7t7dq7zkhqtyvwhskes9jw9nia41kdi7v0i3ab0ja2mu2cpuoo7sq9n3d2yhnsljcbv0u6a6kg21owuu8urx2oy6y6ja9pwt8vv5hzaazq2ucc9n8hdap9slvnwdhtlotlry2uyre25hfvjnodrczm857gkqsrnhdxx3afkp5c09pqttnftzp34vaoumgwelaw68j6xl3y8fujada0uj01c8bj8tz20eynmvhbnp880i8xys3s5q2gbpwbki7lsq5yvklvrr1m8oukpagn7oy8nt5zgf2pbuap44rdx',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 5300482089,
                expiredRefreshToken: 6710541450,
                isRevoked: false,
                isMaster: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsMaster has to be a boolean value');
            });
    });
    

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientGrantType has to be a enum option of AUTHORIZATION_CODE, CLIENT_CREDENTIALS, PASSWORD_GRANT`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2d8bbde5-e0d9-46e8-b0a3-13c4fbc91028',
                grantType: 'XXXX',
                name: 'jwtely9elatqs3mqho77ai1o8n9sc5t5fk3ukd79lr0c0gut7g8czq50gpmznsdf74dn9e2glt55c4fth6y5nqkj970gunafmz9yu4oohjy1o84avxnuebyzj3n3sy7ujft2p8w0676b1u1qcseyw6cz0e66ugvt43a50kemu0zydg2dscfa5telzvrlkap3cr5y8lv4ekig7fap02mui9gorwejc9y6b6h9h6nq358x83xjvyz4u1xa3zoc24w',
                secret: 'jujj77clecwjnewpazscy2vmlhcb0e314p8g31giqgue2okftinl2xz0jbu8aza9qn2djqmp75p6yksrmrmn3u0k4a',
                authUrl: 'bndtlff9hgv0mqjoib5alyue3bbxhdu4z3dts8mwim5i63klotmzuqfehrhdbpu9k7x3txfv1zqzigqmm0j7411mr4flemdluocilqaimfnpc95p9ylsjg90l5xlic2hiznii97a6b2pk0jbmi9098z5nwzc1m3zi7rvv04vommizuj46cddwyigibw53g6ek1ktpkyhufs2sodvnki8zix0rszzuurpjrtlbc6wpo90soxar5wnz2569xnap2n3ay6hk8rpdrice3t87gr22g4xr55kav01isxmwklpozq8cn8jv9c06v7w0znq339o1vlhhl14euntcng5tgxptt97d29cojqjpv715uacdgqzf46vormjm0prb5wlq2vsfozbh3jpmyj35cvbteniro6bbybapm7si8422ernssqgmswbjrgd6ishfv5ho7szc8wl09y4l1j166zt90qankdsvtwfr4jhdre3fteovp2xsanw9cbk7faro7s8i9n27pz7e8cdklb37nateu669gynndyk8rbnj7nym3m54uu5dom191em455rxj9h2qk6dm0dzzop3pmpaeyya5vxecixyfjw6paxr2c0thzy7o3ik97snhbr1bfeexhs9l70mqk1ttf9sau2m6vinps74kx5mq9ob4sxvuvr28ulw827yoaw1aaxeejasrkli783vfg11j2eyknjz24ib2fcxr2bqoio2i4q680c8wf9escd6xwnol2e7skv33jgzedi0yw74mjrispgzdqf4tq106pre8z2x3irjo3x8csgpysae90udv8ujlifh9mj3wfir5l06goqkqy4pscbdlfanyoix8vxzoydan2fjhqw1ih1rtghrlavakor66nluclv1nlhptkyw76dkvatkmejepadxdkgocvenz38md5ykltrg7k01et2e6ecidx3b9fo27fm2k361lxagdlse1lwxppra6m19ha5bmyox9yquh3gr8k350y1ifx05uevv2tdg5hxz8d99liuj3zt6o5i6rtjxqmnqvqqpu2lbiym0e1w6fmv99gdsfyislcmt0zh3forx868ijc0cowoomb1laddup36ahppt444m7yctvdrcmotl8d33htd1hth43vekqtjgd0735tdylvhtdn1um1u2pmvotxddsshyj0ktrba2ji69w01xtpjd3pixc7j0ot8592hex6jso0zuy5w7na8crxz5npfko0qmee0xzgd3lc6iw9cvzto3nhta09cufw15ke9hu9qczi5e8lneszv7tyjeem1pzt2hx2h2to4025r4t97ospc8xxlux9zd1rk88fk09jure3ex3p72pl0hpq42erm11w8x76syeofk3dajpofrztvfmwfjo1ryv1wkw2fbao7kddrbhjva9cpx9yeo9p4xxdclywurkgfso3u5ys15vh7pcdq94816f3mrxp83lsfn5zng83w4dkfczdz5n4t7z9tyouv25ihnstgwejddsg7atxmp093y012k2yxitf79557b84plw1t1i5bviybyvm8ft5tfris9udjgd2nk181out95j2qdib3cvdu0ndqdkkgyzgaamzztz4a30sxw44fl4xfgbnlxmvslg3fqrlc5vuls8d4odhoqanx4t7payz3an7keh50zrpsx2b32p4vx8dro3qdvmq0kf98pdoe6w9vywql526q90e1rggplxijiw80szfe3pzo3f1bx46ik1i6cwmqcz98tbb1baf0teabtr63zs5dnb8feukozc9uc07bot2jz43ycyxcmhf3pb9e37kqco1s2sihcw1goaacgiuk8f2fq2d9pqtomtr9efcpzniee2z39n1ywhhm3v8cud2k5uyl1hp6gpwjsv91j2asq2c000rs8fvqng4nifu5jhb1h1u82ybi0o3y9kybfwam294r05zfccsrrsuvq7w0mrsa9qqnq783eipj1n1s5wy4i3qjz4gi4m5vascj8h6rbm8lq4jpj1isuh2gphul',
                redirect: 'v4acq2a734pwa4zzbqteheefx6b2x4q6yvzouql22kihicehsjaznk68ctrbq5a0oz79h2r94lya8je9of864tbzbk47s7dew4me2thvsb9xwwnjngvgr1nz8sunlqzrs5zk5qjpjn4kq3zkbz8renpkzxc0eyrchas075cs1uqp7p0l8c7txptydl1v9lp2kjhcnhlmxmjfeha0t72wszf2uzk2jok5nycg3pu65znqfars56swxmomcxagxlrybqjb5k40kr2xh96gyeudoants1vf9ae5yyzs6pbrorpzae061ytotdco2i52iq1n87x6w8qnzcnb8nsw09pvmoeaoigb1u26dc31l0iuw7449k0l3ihcrw350ag8uhz2p8i7lw31auiiihl6jkqjblqt7bc54q6h7p1u8q40uvrj7ynspxs0z74hhzkhyxdxeuu19deko4en8wvqtvlw7s8l2n4pf0sdecwutffk8f54nby0blk06w5168odr2ppbjyt584jbvzp1di65o99gyin1ruhocbfrdlyr4jogdgn4ofkz5tdeyfrd9djnchw447t458xsom9vknvddsyhrd0gcqgaetp041z2mh06nn1rfc8parppomnbdzp99h7z0g5d5aovm82m2ukqq5mdfaizzb0f0oii742v3yuelexq8iie0t61qnhcl8sadsw0saygdyile4yguhurjhmmsxrb0vkukxk4t4zeoxln6wisu8jdsgw616ifatxw9fk89b50chp7xe0xr8xrzkhcrvsz8sd8kw5u5fddgzjzwijk9e6gimjg0q3i77el32cu4hs1mwdatyd08xwz67953gxcpdytoq34sb90fk1pvx0dncu2qmqusr0zsztx6r67gjh4sdeo44jz1kn12yc8z0q5rtiptrkjbrn3gsc9nfyro3zct76o5beuvdvsgibxfn4c89ej7pq4j05aqp1f1gprcicwisvgxozdlmlpxiy967suc9bpg6i4pua1p9gw6l0e8wmz0rtm1c03q67zmzpspalual10em4simdeygnd5k1nqzujn564knjevqc9qp27vlla8a1drtjwzliu28eyl5hz9iy13v17je4iaao4kn07s73kjvp9jwmqovo4qsy8chgh9q8sk5hbrwrn6tdik5ultm9z0jbmbr4f80s08kpha1r1hlnenxa2cwpotx650zni66w798dioq73inn86w3l7sdc2vl1tti8vgadvsxgxfhmxo4ggbywfn3xb1qgywfsv9klu4mlr0hflzm9rrlsuv4klb0m5hinizkxnwn1va6p6zsgqlld4l98ec4dw7kdoum4d7qppmoriztsa9c0vlwj8zd003m3gnmly8d6epthtujdji3mpz4dhu4nmqai9g0di4hb27uyvx7belnciibgclzkx88u5znuje3lvrw6a621mgf3eh90qfa9lhuh59m8z3v2mqr3jgp1oilp688tsmkvwck7xbsw883bu2pwbdcf6ldb9omgzep95h7gkvp9ca1ebycaebds6jtgcmcc7c6sn3c241l7kkmah97kmuj0iwprviutv5dz9uyh7qgckakkq4px4wm6q39psjj4rewkhu0x3blfgnmgv79ccw4s0wbn6w17xjh8fyo39eamj74jsa2uktf89wy34qzk6fqe62gzwd44vu2q0myajblqe3cta8ix4blbtq30a28o9ukiaaegxwx3jrrnsxl45j8wstgi2z0p7nyih4zrqitivrg2qcwc3g0v17mrcd4oi3135gwgjx1md57cavu3pwmkrhwp0ma306381pqtabrrg2ne1m64ek66ag7qigpvcsngq8axnjb4j28d66swcraooepw79gvmemu1qgl54hjueopjj9s8pmou72ayvi1o8gu0tlmg8ob0cejz9bdhwy5btu1fzcgh8hl15oh4o58zjvzgrh2k95u5mf5269yj3gbe69kowfxpj3r987xlgov49fan0m7936zfhfr9db6jc1kszg',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 4882431794,
                expiredRefreshToken: 8055815835,
                isRevoked: true,
                isMaster: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientGrantType has to be any of this options: AUTHORIZATION_CODE, CLIENT_CREDENTIALS, PASSWORD_GRANT');
            });
    });
    

    

    test(`/REST:POST o-auth/client`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2d8bbde5-e0d9-46e8-b0a3-13c4fbc91028',
                grantType: 'CLIENT_CREDENTIALS',
                name: '2z2mu9cmmcjfr0witsgid5xuw5ii1bs0xydpwo226unzgte1k4i9lzex5bi542y1t1mdaednr00rvuv8oew23gfpzocegtd8oysmu8p4jkqxvsyiwygv3u6lb9fxwueqx3admkvzew8w0q3cnnopfezafxqu1ci7xel7c83n4n3f4dah6km6eg1y5npnmwec827gl6a1o3yg7rr1j15dc08r2y7at79ni1dlz8ulk5wqczwr0cnzk10m4fomawk',
                secret: 'xtuxhhk4trhscjklwi3uqjpfdh6vz6rpzg8dj3p1l0u3op38hxx91kkmve6cqrlj9xtdctx85sisky6tfvvcy5w5xh',
                authUrl: 'mup75shmgi6nbe5do9frcofli21zovupvjvs6nfz51zdyu1p7wox5ef18rawzf2ix07ffyq0uq15p3cpameoywun5s1rmm8jndtsjqlnrp191pb9emchwitqu8eyp3wovybgqzgc62bi9gm013b0z6g6zgo183eqkiognszmzw5knhz7oqtbcni29b8xflm3om52b2b3glxn8qgggw0g02byqqjemgw54ovais0ixwm3fsytvs8zn1unhht5j8kqazw57z97235a2ykhjeo5lp6cu6qd9ry7cwmi3aqafprxykopw6u9e566z1betk0ad0vfz1foq2aw6b4vp8v7qx5omew2c9keiyavcaaa5h4ybq3a42eoc0akiz4c658llc2zz2asqn7qyzjx7894bnjellnc3sl756t7z838slz0t9hz9bw0wj82pknl946bvpwgpzcimb9kcswhmg0ragu7eebrrttf7mamexqxfah0gqgjoyo26bo24dgefifxw78lg7lokc1nd34tnm4fpuip5arakq0uwhkjgy1h242v9b7phjuko54qr3feu7gh4tsquahfvr81j05auuu3gnu0qrlibvr7ry6rvzg5ea13iwzacgx9wx7r7ho24s20cxoazys911lbfxtux2hh4kklujdhjjn63k1dt26tm97qw4h4mcr5rnuzlwxqqsppmgeaqai687r75n6vja8xlegomc8xlh897yw4hircg1kpdb03iat2vq2yx0eo8gph4gledgwl7l9nhl8r4roek51rj5sqq3asbehl5ucoqsbxsvepp95oknzo3bq98xg03cq0tvd2fkum4rvdclotq1xx69qcn4fpk2i2cmiyjwsx5b4lkoevtpg67lmzym04yc5fqelcu7fj5ov4wsylyk53slvoihipvrhebbdquxvuqmu4f38lv9huuq4y1n8aoiibf2rjm9htkmtwn0t2os16dz0v54fksdvmwu70ckaieayz72a824kyrvtmpaq7p63fj61il8t8b6xryyq7rs5cq9hqc0yebwtft2xzj5r03un5sjo4m8kw8qsjliwpk02tb1kfbzi844qorybw05oppr4yii2gplb0xal7ssfnqh4idkiyl2wkrhiypt328z7nx50xx2ixyo4atamhxmp86y21eur49l6ncxkpnvcevp64vwazk40yxxkdglt8w20sifancuekh9hyk5goukabss6cg198dahjzhuppx1r33944kwq01jytx8hw0499rz7hqlncdirl6r2fludlf7hczv2cs6wchyyalk29p72mxy9wz2sl9z7xsameuv7ajvby7y5ug8dab51e2580ez5o2y1qsrqoskjcf2my6ttzqo7mgornef6hfkigmudygo44wxwplq3evk3t2rimo7y3utdsh3hs69cmuxhxchwc6qau2yusbjjbrduagncx0v3ss6xszozjv35k2ik91mko8hkkhemo68g7kbbfxlv5lgl9hqy2mrge66fxspeddzzqxggmrbtb5viawouu878fxbxfr69t31k47kuw9saihefexjd5xfw14jhfvpvm2l0pms4ipswk50j0j3cjr3vnvpgmrb3kdcez63rukqmz1l4i2mvs4est4287nihf6u8cmfr606v0y34p1hhcuwue6kwleqn5ds2f5vfxajm9o7sw4xpduednsnmg0a4rtjwvaakoyhha4316xjsj4sbdi9az3wc8f2s29c3xb7v0m5mj2ni9nusr2jbk17a2kffvgm1rhwgkk2vc5y6tchua26c1f5svjgcr5wcbalr3qbox6q1jpddues2iyprfjzmkb4s4hsmrp36zp42k32swayqxtp8kawtxfg67n2ctjo73zjn5dyiurf6ydquysc5rm3079hfryuddpl2cvw7ptnib6ebwfk9i1bmxq9immmbovkpjh4ukp9mg6mkclq8w4bn4ic1ldvzg1e1a1g9ymd9couj5cvcb117yvo4d9i5jizx6ob7kpiymqht',
                redirect: '91mlgyvf0pok0cervg899net2h9z9ol4iiizrolhffji2t30ftw95jufeh88eu2bombf9sn6souckryamfi9bevutyvj8832cyaf9s3z05izypw2upqp7xd65dqmt2t1lnl0q2vw5amhciiz9p3bhfmd614yqhuur38pj01hkcs8je8g5x8fvvth7ing5sqcnm15oz3dpv0y2hgs3cs8p3m3kgnl96p22vvj8galixzwxb876kjvjxelmchyyjacciubynbbjwy6qve3ueqglg1t7192bp07zah5d6413bjzzsnompeebboa0vgbnq5k453ydamtfbeidnx1dczgoekwy2ui2p314p94jteswdvn0o1wylanr814qxl9m8d32r9tw9aa2i8iwryb7ul5iwr2tdgr67cfvy5i8geniba9wrctf1y56b8b9r2iw8kdk6qp7feis1n97uk3wjy4wlfql1xxn0jeoxqrewtha4o17c12dvjdlp78redks58fs73vsmd3qosqo4sa37orgx3cz3uwoz3pg0e6e4l12f9vwt5wsouahh2n69tb4c4x2z0i6ynq3cnhx5p4ox850wbxqsqyfeczs58430o5vh6pyp9din01qtmgi3w354c9t8ngydkqvn5vmtraczt0vzbg6ns430u2e5lkpiki70nsg53nuujrcdzb8c2lv9ofi86fjyikkkiwruxu0bpwqy1vz8g7ywcsw4m59vlaqsopo83ao2wkxb9h7yqx5b40h7wb6w1amqqtj37iz9rm9jqn7rzmqa0be6syv370ar7epyrqviw4m4a4toxzj9r0gjewdavofe8tjiolcvw6admr6hactdbodinxv9qlb4imnwvxwlx1mmvyxqsae84x2kynx2u8qe15fa3auba6een073xxfnvg4nw2wt8a1ev1w1h0vbv6923nd4tnd3lvb7gpxiupw2lobuwpbomdo7ykz6jcua15iwgch6tzou3bsyl7qyfeerfypuma0ontizhdbxfhp9lpg9wo4xbvd75fufdvp3slvv4diln6hd05acb8d5bj1pibj7bzv0xsdj530xf9abd21p08ddn2xo5qz0uuq5fq6at3imin6srufz53uiltg71584xx5yhbzqyeirdsr4ux2pmoon8ys5kuapv6to7g1rkvi4oyu5ie0uvoygac3w4w4xlkpsdw83lgdom2za2jnv11x0mkz9ug5ddy6jo4662vs5vi72mm7ehvblnh3vjc1arkhif5qkf3brl5xbp10dq6uv6v17rqy8kaffy6iui09u2rmlbm7qitwxgt9ndmtebsqh2dlv73iy9n65lt8lbq9pz1kbmcrieridn7zwif9wxr5zm9ftxh84gu863z6srrs01qf5e4tvk6sg0cxm8t1wmcpm3gffmjcszboc46fkcm91cwvavwflsvpex8998wm9wwb0eiwkmcuzaf5ksl9ktdosh54o9ydnpalzt97x92amd4pgrhkxrm92wrp0cxfkhk3cvozu0hw08zalriuwt6u3tzlsrxrmiwmcv1vxf7k6o5z6ktvup4fplr8uwqkpmio6unl185wirxeetbcnazd4bcizaweamlf4phuzn6jsypdqt9v1lrotct4ydduyjahfn0t8thui70mdkyzqopbtmfjoxcjr7nlywhz7l42ospfojq9hyjrbmbwebw49hehqzro13jsfziq2u0mi3f7wqi2l9pcf6e3f9q9i8nuie33g7julx4i7m02d36ldomsbqt7ber8okhyi9ho8neq2ul87vjn0hohchmgf9str8wl9ya79k61jv95gi49h6imliisggoqjo0w5ofbdg7t0ywljrmnh3v24b3glqcxt77r1oclsx8rq8ps7z8a69ecjjo0sn76r3ti3zcfk2gqxnxsr1toocrzfhh778s08q61wdd9p6qqurqm28cocv1yy9vpkss28bflxofg64g2f0bp0vpy6614m3ip42b4brx2cgyohhcj4op0jhpr62d',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 3725854664,
                expiredRefreshToken: 4511958595,
                isRevoked: false,
                isMaster: true,
            })
            .expect(201);
    });

    test(`/REST:GET o-auth/clients/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/clients/paginate')
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

    test(`/REST:GET o-auth/client - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '5548c546-2557-4694-b073-5b32fd01698c'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET o-auth/client`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '2d8bbde5-e0d9-46e8-b0a3-13c4fbc91028'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '2d8bbde5-e0d9-46e8-b0a3-13c4fbc91028'));
    });

    test(`/REST:GET o-auth/client/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/dd398cca-7c75-4da2-8ec7-4e98bf80fdbd')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/client/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/2d8bbde5-e0d9-46e8-b0a3-13c4fbc91028')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '2d8bbde5-e0d9-46e8-b0a3-13c4fbc91028'));
    });

    test(`/REST:GET o-auth/clients`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/clients')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT o-auth/client - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                
                id: 'f420be49-480b-4a76-8336-1746fe46be8d',
                grantType: 'AUTHORIZATION_CODE',
                name: 'eo1r9qvjb62itjjt18y10qcg5u374k6fa4ohbvpnaxrtb7wtbivkc65tim4t8oc23ojek6q6qf85izuk8t911s63srehp1hgsnnvspo62hk1zxyyncakdwyofen9gw4i4mvm493pk2kqqphhu6ewhdsbj69ns01rsoivgoe975kqxwumfqqbk18di68ztczuqx9x75za4eqba1dydchwoja6fccecsjgaubl4nit3ilbtd641wgux1g15jlp058',
                secret: '87g3p5l83mhuxlbxevirv7z58g2byho0jno6rqqkhc43vmlp8yd7gvpskp6apepqoe7sw50gnslcxsjafgm55qivlt',
                authUrl: 'cla7t3gee4im4w5ml9ji1eg6nbyeuu7gkentae5kc3czp153goyash3gzjpjzqj7sa4v12gtnyhg7d0nlxyl413qb8mfax7qfjebl30p2wru1k7dj6nnpjvxrsjkald3hhuf532gees4crnn11915db4yn7wbc9zqeklafves9mn9nz8w7uke3sqtfn3qbjks8ars3x04evcg9xzlwxsq15kishgm9hiq8ug6qckn8v96pzpgkbijzw39pyd4pdmov4vqm26pvbbjsho27iqn5h6xnqanvfp9kcfexxmgjzy006gfu94h13v04m5zzyiwulbe189o0hd1s9u7i44tuddis5a1vb63s40x3bw6311slh70ddsxpefgjyua0gve4t630xyfz9ua3gom55pebai8alcyv2i8n630ukh2ui7c252ewgpqurxfcxli0n23s93qucn8q5p7dghg909vg5t1cbrm3jcpecsi49uj3emzoiynyy6lt2qx3peu5k5fug6wxf8596dji83d8s085sqjjaqmjv6do3ke5b5g7d4741k3163a4m7zr3tivo0cziza7byeizt9p81r4q29roqw57to52okxxmrjosebm7xkf7jotsaao6zji2kodsjiddktrl792ezzm4kzoouddw9t1u7alwf0vdv769fdy00ciun32jmo56yyqad5lp8tnqgank3wo1h2xd0cd7qpg504d7zxyevuzvd4sfwq1iprmv3i8rkecb8s2fwkvu9sbv9j6fa4fp196e7619jvjg4irqfhtime8x2xcr6qvgsozk9kncqvenz8clq8blpy9pwy6aia4jxj575efzqbvj59wr0if86m943awhyb5pklw5s2zc5fjfvik0swnycqsndc62yoin91yaw9ckc1kvttrgmj7gawoqd8xu4gnwnrf9k9k0yzlc82cgsjakvomb81ax383jxtyo8rxlfr0qzt7qw9p843lnf6n9azd7wjkeuthajajix0sh2vh4veladsncbt5x0rnrwnfbkkl5fy0c27t8yvrfwm33ca49dezxbcm6wykbzh3mz2h00xcn7z835e2nzmu3e0bnmcykkre77u2anqpgmd4eya5pzdcla4dndpuavgirtk5zmdn8kqqtuyq9n3bssooucz3nn45xivbggzlx5yte4j9espc8jo4iv8qrlyg12m8gsyz3wlc70nq90jy9oasp1lcdcs11uzh5so93utl8dax7hazod4060gce9ul824ap594o8uyusz1ttitbk8ozqj6kmxradvflm5kpxptq6i2nvrg9qihos2a1fuhiylg8965aq9iu5er6dhz7e9zy2qzav7nkrovkcxeal0udysx1ky311loo0j8lbfm93z8pe1yc2q67681jlygvegtx12eg10on92d2tyebivbdzfm2rnjwygabot9yymyq3g6u8att72akpaxugfxanm5gzp5qd2mr5dvsinzjnefrzctf266ti4soqqoilragz73omt1erxxqbkbor45cf7ruq1mgvkid4x4tqofiiuf34887ayp5n6mo9qgixbwho9jbsvv45imeb6xviyo72t7ib2g2bgr7k18m8ycurv1sqjfignn504mcn4mgwfn4wppfc5qitfdsimss4uml7zb3ydl6halgdlfrm25nk7t52t4acitzs1rlvj5p5o2vwaveovimf4gvgzwgpuhciqktxnv0eq6qufi51gev1q9l9co52g0cqdphx70g9k3z6k1e6i9d1y27a2qo6egjdz1izvbgo7jgutkchr47lx4qc2npn7q45utnvrux6mnhbv775pm1niuoekpg4qj179s2h849m79ig16iu1osccro1p0ep7n08tr5h16x22u9nm5k8unj070sv8n3wqm6refoqa3uj8tr1g9q6nj8eke8uml796fmjqq6ryo2prf7nsmnlecr3yw1n7x66xbg879jdsukqjwv3a2k6c1krhmafgds1xttbvax9i19h56wxqzd',
                redirect: '33cmpv4yyifq8j7b45jl1bn9nmsx3pv1t2u62x1e42gwey9xaqi863v2wh7g3wb1xq5yajxsvp2e627intn8kz64c3y4fij1r8v2x3r1rkky5ljkl69jra5q4g0h48ejwj25aw9701pk441gdngrmwoztauazhpprv4quq1jz4j28r469h9zbo65nk6we4oqfssrgk2ns0l4gbz58ozu6v3gk8hl8myei4o2heqdx6wsjald1gio1yaxnudpu0xj8tetq6uxavh44j0m3ux5iayve46egq85x5nozdnft96myjx8zmor09mpe3apuqgd3rkdr6tw2yeh1wwxu08woz0o6k01emzpd1m0qcsrj3qj5kpu9gn2oirhfm65vpukija2gjhpucuaae3oj84592svh83v0nff3v6nwqrjbwoho7dtwc3v39iwjm4hclz777gnidel3o9v0v60fnk2rypne8omu74gzst7rpe5rydhn4kn23w9sgurcqa8uyhvcggri25guubqr52ju5moadtl60b4v5eop6vslnwbss8wnflfyztbfs1kdnet9o9a2ftrblv041zk535fvtm6gnjwg7aaf0s43um7lnsteeb0djatb2hw0zxa68w8gkmm6d4qvbakjerv4n628lv7v9pqvskgg3i9cojte8cm6nohsur75um99z7ox25gbt3u25mbhgl4f2xbg9e3q5jloagr0op70sfutbdoenhk8i95epf8qf8763iha2y26vdcqote4ajpilfpvdjyr4wix625iuxb9i8fssor6eer3dhjhnc16qs5zkgniy0zanhvwqxvkbquyd5rclevgn1boos35yql0acvskkl33bcs9u632by8o228fu76butlvdhvsti37hfw40d9dnnjyeh0rm9yo2tw2lflr6tt1jgp7lplj803sw17l2rc213qghwqkkcje7msrf4wwtiagcwxzu5l1tyq8vb8x8afj4mbainrlortzxvjmes0m3zdxln5cy95ze3i7xgoby984uaml0ljsvwvpzjwdpcppo7d8mdsnhj14iiks9bexhxybot9kn1265hjq1bm1r5hqg8ie18ye2romh09j1nr1f0ks9oecw3rurgei3h6cu9tf5pc9kkkxsaxu4t49c9yzb70mhwcawg9zxukfykuku39qqjfgqfau0va0i1cqp3w0vm2hfeapq1qlebryjd3mckatbs2nikywrpb6k4l3qurkaaih8eu8vzc5nventrec7oec06pf89voub6hb0mx97421wjs09cth0z5y6kozgxl6b8pu80ylbyhhp5exs6i5at5405mahm12ock1sypcrtt01de7zm5l7uahlohh12ttx0fbk0yoovq37iptx8h3lge8ygiriuhtttwfww8i1zxq0k8dzw7osi7q8hqlfthsetzd7c3niboqwh25o8sxezj33bstpzzcvv2mmbcszv29k8azepges369vvkc5zitjzjx07qpscv0175qt1ceb47g9v0g5e5in0t1lt2oihsjsccdgut6gqn0c6qpweq5p76zrwpae8x8gd8pmgvojpx75n8hrtblc3yee19jk6dizoafoz2b5sh8n9zuuhlnx8vd70jxk6784fozkrloxxo8r4wk04t1ttenuj1a2nh7qy8hw1q4v3l17dciiun9xf1lvgbgbnb4xp8kea0s8xkh511f2jkylmnliybqpjser3o0hu15f8l28m5e722ws60iw0svbmvymvum3r468mx0bhql3vd2eetikpv5wvb28bvcj40eobjdpoogs6kqagnza8humqbh5ee5pl2vp4892l2jtolmo9ufmuxyr8z4879r0x1k3krn8irz0iikxglgdgxcwdnaeuxat9pkj2y4no8hvw0lq3ba2j4poet5c7mkmqyi9hwv18l14ay5wmnfwgx4tq0fc5n9s7z5ngggdmp5frildk1fphq2lyvdiblbwcyqadmfnaodftps0m9ojkec7ci2myk6f9da6',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 4729321980,
                expiredRefreshToken: 8367196695,
                isRevoked: false,
                isMaster: true,
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/client`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                
                id: '2d8bbde5-e0d9-46e8-b0a3-13c4fbc91028',
                grantType: 'PASSWORD_GRANT',
                name: 'hk87pk2apaewjbagler4gpo5laxzvnr6saz48042ktj4zwkz8stv2m1aks0o55m2aeezn097se8f29pfhykadf6fzamug3ptlktw1b8c8avgwqp8bqd5culg42p8n63bhky9f2w1ezp36razwx2swtn8so4c3qsfbgljpfqugt0nmirptwuomuruwcp6edh4dz8gax4tek81afp2dsxkw8opy8bdh62lek82uj74mmfnk0bdcds1th76c3jcter',
                secret: '4bm7kk3bxa1n8lt84co3ubf77dgd34wj0tq7os4pr3nddpaz9eeacnhnhdjoep7o69hbi77mueda9jjoauesygc3cz',
                authUrl: 'n3nzlxzp96cdwdbm7x0358axfphc7qx4xgld0ivumbhbtkzo262qxcj6tai4n7xrtobr7w2onmmr19qyuvn6ia2zhfchhj1x5ah3ygehsaltjl4ljlb85dy3k4z5j3p9z9md75tp5v78b9g82fre559ug8uw4aymsmpf6nj95hz59z2wh1ilt8uztmbbhtzia0o6uir2au8wy9rofozj4cc3vwd7910qcuv5udgxdrllvtgyayy59tel8jwg28q0xc1dwcc96ihhta3sdbaj4qflka8fmsbi5u68gb0c0sjpizfye1vee7p15ktkd5v45wu9yhzcyeo42z7r3y628k5yg7weo6akxkwdksji27wg9dkpp4f9kv5e8fu39h85k20ujkcfb2awaxnb1rd6zu6xueormfrde8d9hgugmqx7q6bm19szv40meitjm3vez53phe1xwn3dqpj4y52ro3zz3x7n686fmkio7jcgs9x0zeurkxuzaa5lcqjwxeizps3um9b4es5z5bf5mmu9lxuxnznztkgqdnx6k2jpfj9zgexzoio9b1zps8a24yckrfgyshi63eoap3tny2y0nsfzg731kan04pcpbockqaqvxbpdgavg4xsg9ci604k7z7tgq06nhp8y3d1k8c6dnfx2ljoi32k3uhvq98uyjcgjdhljuzmmkytd48ez2a7d8zvwau7utj6r69s9cstga55kspiyotzqr7o6zura34mjjz5v2xiabrul7lh2pd41ejr3laoxc3gmpzskx8plv2in3w4eg7diuji2mst4bfv2d9chmly5owidqmmp7lvnxdg39lfmonb7xo3dvfcmc6a5a5sn7r7kbbtlscsqayvezm4dkyg8lh0u8g6eyxtopsh6mlt8rfxjhovutv5n4uvq871o9zkck7nt1moua0xg0ttpcatgt3meb1ahfwc0nilbhzcz9ajb7nwfd8ljvrn5s4y8oanrn0iy21ifk6sm6cgp8acw1op3583z8zgxpy5cgksqq8odlxcqhdxkwo81uil7x4kia63ad7ir02zmh8o6tsjwgdh2dtflu1fr0ga4opeuqjynoafk52ax1aswxgx8uny2xk1n77daq87j09azdkgc79x4ksn8gin03ybvoafl2b21cl1vmjngdwp54jk6at1nm1x1kpk5se241cynopfdo0ps2k2794ca5zajjwggp9tyh4131feqs99av4yb6o3xqqk7l4jt2rouhz4q0q8wafs6r7w6x8tu2bd9q94n0z2pbt6gdi0l0e13ds7ursvs1ejgplgzq379o66un91chqptcuzg1prsufy83wskpcbqozsciqxrrq2dz4yepugay2iw0yn58axnwis9j856th2kr040pnast4qruaccath4o1fnlpv6td6ebpyhsv0n8saur4t6n9z234i3993xiot7tkqzdfe7yv5vlqz8k6cm3623n9fipy0zqj2ysnevtn1u3fy24qdpdkhrvscqb93shhs5pp2h9vga4ks7l6tplysd0rfjokxp7hjg39sjk9vdfq49kinqdn0svg22vfgyda1fo24djzval60o9vm0tcomz6hhz42ac947jb4uxw4dtbdxgkuap3besh7xvekr9pvz2zqgp5m237l3xrds7m5qsf0oq65x4nflfn97rfkcokf08wpzhd422i5vnik97z2hnkgoda4f26ibca0g3xxg2vbk7juoerin4wtrcd018g3arw5e2naunzmjlbpk6719dosvci10pknfo2wujnmfi83t0vj9nq1lfqtv5bd9x4ha9tv9qtlvxmo3eozazq8xkqyauda4v8w6toa3xhlmnk9687lg1ypcspjkrj0oawkqe9k0wt65woqcy32sxu5m96jl6klx3ailwt0h9fpm69w8xcu56ysvmehipr8g46nvekv97nvo40xaraymwocnu54d3zn629y7lfvm32bqvkw7o6rpntmp2jo0rchp1xknh56x9qm49m7jmgauvp6h48ni',
                redirect: '93xsz0lro3cdfic50rla34nckvarhc9pggdpushgm12sf39l7c1ghah2g6nr43aags27mg5n5h53miig7w978o9e1paejsl0qq2yittonlm2yiw588hw6kekyzmpieu1cdzdqq3p9on0cyk5ys0jxyjieytp5f0t0s03m28s0tajhqfx73v6q4r2u6cj05heizloj7yvshtg8autvfqrqh9poswlkfm70ysn1gnzi8b58jx02rvj6j54q6s6l3eam1telboitkkggvv1pjwm7sshnr55ct02jizu8eq5b6ntlzj965bofgsprsqr8wdju18nd26st7wcf2ltnot5h40oqqyh9tujv7qfsf1z5xdsp69rxf9bkfxcohx8nux3tdsck9yoi9s0p106em9ryflncslqhwiretc9j9e9lf8v58mam0qikst2u3mmg8ujcejjgur6nq0iw5zf3vgux9dc2onadxmaiew6c2jiywagkj40baw8ki37euz2o20zwbr6t7sh496x8v3feeu8lg3biapwvcrnjy903nlqtn7h5npys7jw6m23bn6vdc25tz6l85wnp6atr5wdxig1uimg2xkkai9803025jro4had729n4jlyjghzs2qf3pt78yfxyjfilfp96fse3bh3jv07scbdgu86u4fzloif6wc7h4vdpn4wb5iur07j14ce230hqbpon7uaj10dptbp8x1i61laxvliix9vcb2mk0t7a563ocqn4rj1s4llpw95wpsdayxc4yfan0y3j9ywjack94ync3x4kvg0wyr5bg1eo39ckm0c41ho1aws4gpnvttg96t0ijreugnv7fxonyfst314scfj6x42qymx8t39gru45kf73izkflsewcca3tuun1zqyljvbpqpcd0i8t3pwynj7fzogm7bczko4h800qxi0t14wx900m92faooio04454y8shhuaug6m7xd3e0cd1n57199y1vsoo1xg4eejlbkpb87tk5farimhizhv2wy2y525kwp45fr1k81s8bxo37kne6954b4ulu70zhcmyjnezkzxfhw0cq8yo6tm1iz0yjd8ump22pwoz7egoxr37w1i42s5pcg4jmhxhh2i2xdnwtdi70tmnrzdakhxnuqh8psxhdy1m4flz4ig8v6fzmi7eyulafomlwgaq43kzj3ss0592tpbpvlo73yt0icbo35hhx39cmjn36v5qn60vqcmzlz5hul50hs2zoq014ebwm4ofvm9ps4a5fc2gg0emr56k3wy05eoot7ot59hapzp650ezz13igsgroyxef6cuw1lkfqsvv08vsnnhdmu9jyo57lst5iq9y81go66nu6cm9fz6a4c52bvhcvh2krrvffn11qnr40wdnpnyd96dh8uaq6auq0j0xu9h9vv9eswlpktipfg8moq28908tgsdsqbyq0rl2sg97hs02hw5nrom326eql8ct13tcp7c10gqo8if1p2ovumgm9qlcw2tthuoiaysz3vxf1atl77xw93q2huml31mqlz6uvpi1satbhauuikk7q23crbl542r12vhpaql8ozs4q5fxej9xp58n5o85d2z8ib0e5ymxln2f4jnhytoc0xfweopk3jcg97s0ywr0dcai853pzxj38huxsuhzbgm7gfpn172zl1u6h2zugo9l2gfct2m44t8b2x9mio3157mdugxico5da5sj57cs6w1wkv63sghda732cifukv3vvo5aasgoik4h1p60rwzu2agaicbeddccw3o31qsh52r0jeat43szy8hvw3b0bws8wncoim3hjv12xs4mmbbl9mxbttqi2dkhgzl1wn1em3rmjlvg3aigw98m0hiqlyi1grqfm6uq87qe8o4dt723bgjqlz8qpsj8n7bhf6i18ejgy9s4bf6zbye2ahwpi2wblg8vtwags13flf5qvp2w1e097lsrkbkmx5vntellwnlklzy9zuccvvy5zl9z8eiy6rsm1sabwqyky8ejfnu1xa2a',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 2674485344,
                expiredRefreshToken: 6235483896,
                isRevoked: true,
                isMaster: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '2d8bbde5-e0d9-46e8-b0a3-13c4fbc91028'));
    });

    test(`/REST:DELETE o-auth/client/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/5f774d64-b167-446e-a9fa-a391873adc14')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/client/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/2d8bbde5-e0d9-46e8-b0a3-13c4fbc91028')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL oAuthCreateClient - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthCreateClientInput!)
                    {
                        oAuthCreateClient (payload:$payload)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            resourceCodes
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
                            isMaster
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

    test(`/GraphQL oAuthCreateClient`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthCreateClientInput!)
                    {
                        oAuthCreateClient (payload:$payload)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            resourceCodes
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '4d41b3e3-76f2-48f1-9c27-c0f945a4697f',
                        grantType: 'CLIENT_CREDENTIALS',
                        name: 'kk9d0zzkddingpwosp0eyd04sl7pkrflmdcpg3ksul0gqv8f24hgetolyfoda32wqy4x8euhb80wijolvv2ss88hlu8d78gc3naths5vf6kw6iyjgr3yofq4anv9xcb4m7q8jt8hzgaemb97spd5kpzdlolzm7widrv06d62burb1ww0bfttkdmpjl6hbx6zzddaxgqlt785li9855r6w01tviucky7itw8zsh4ifv0mm493vbcxtmkmj53tjyj',
                        secret: 'x8s6op9ly2clmsnukwqomagggflikkcd3qpvwetw7f1t31sgso22zkrxe16nn2aqvtqufqjdp3tw5jakghlxlr6zo6',
                        authUrl: 'yb5kuy6xdcixty1901p7pxq35m6cbmx9djdzoyctz9htj9gm4o45ge4uvn1rk0yqvisve1jie1grs3gkqmvct4o40cakgdre6gl8dte2rnft005lq0sresl9aav10kwuf7j8twqsus0rzbsov7qmehzz95f6l5iq18dujs9q4fmy497nspzmmor04o3690h9livz0o36hoxvs6bn24ujed9tygulrb419j060tab3hcfsmfs3wazz4o0pkiug1nviza5fsra18q3mj4i72h85tijmmjt5afv17wx97b4y40ibhrxa8ywhgnriouinlr9nyew9j38itjz3lyahnhubwy0wqok2uu9ergf2kf4fe36e65o8cwctib6lfh7uqjg9m4yxfa02nadj9eayci7slv9c2l5uu8kesmy0zxbeu8a4bisjen0tqgdjuv2kwn6elxpif39n1qhl340k5odoamg5s6scxkxlhx4tibz6rj7wo4we7otm3cbj5epl4ornl21ckn8ybx3k2e6tyo79uilss5liyuls76mjxjdlywmx46oz7oaajgxyscbj4pary59hj8e2752ywcvgfgbidr5zifpz7kjwa5toa8zsdugty6sst92q100wx9s0x79qb0hic692c7zu51axr4ztgn40c1lg11vsqau9bxd9x1dq9gaoa9te4ynvzjf4q346haih7tfj79dw4kwyba1kxixeptmhd6nm5u69ge4d8620aqfz57w9a2arskn3cjsg80p8bpsldg0kwcimh96jw9t1ndc1byohj5h57og8mgisjr3ba085l2zfjmrzccaecjb40ixii9m8mzxxx14aef3i6i16wf0aqtj8dyyqd6lda5tanmjd0c6lxv48d441en0kroctrsxmqneas8pxbfgnwt26r3n20482oavervv4kl26ul03tfalzjikqolhvo3ocyjq0gssyvk7dprp5mix24qc35oq55fc6tnmo31iuaul9gc85he3srvpap0elytby1df2mc2b1r0aa7n6l2haflk9y2pmxc1yf0ngzs2qyghuhp775ukrq3w3uno25xqlbjlarojjg1knjc9hsmgl9rjd6achvtlvf7ygk5ojrmt6ed6da3srquojfefjcachqo1qp3mfj8sqww6ci09gifx2zdm30hwoydbrhum6ws3e1flol0w31sc0lez0ktrntrq2rsqsxe8mqumzc6zt3l11eyd99548qjbzyl27e9bv8agf48q9r41fb4arylmvj5mcsxyevyefbxuk9updzwcm3dncimkcujs1i0mrwbkxpdups1zawxsskjtxw2stbbz8exu71wv5vf69qzgrcyw55vhciwrexud94etw96s1ekw1i3twh0607u2wq9sdp21yi8c9kda8s0jnvuhxbwehuujfkj1s4q8u1ouspip69fymfnncjdx3xisfrrj0j4nmpbb9ai5z7ot11hsf4clrb4gvfm3yvq4964itw05bh5rf9bsypw66uruveryy8xmbk373npelfxpkz2zu7ke1txti4kaisc12kott7fzw9m2tg0h1i2if8uir9o7kwm5ftdokclwsp9gx6lele8rtyla3ajxya4g2l2mjyhbbk2nqghnedx7ne85ak7bzawhs6uloxogo4inmbz3n664lwxsxa0mrzso2t0r2hkgxmo3tzwhzgp5djjh32y1y8eewmxpo27rbxyng27f2ch2tox8p0c98jp6qh3zsosnp3zuvhy46pbg32rvoavnn3ik43h5itf0nyxeqi6i9s1avxihobbcy0e30qxnucwopr2p6mdvzvt3mibf1bxqpbxylb9n9ck3xvmrme3lav17qcxsdw42wtugjawmnpqj5ddg86q18mfj1uzsrm1rmoptor218w8784mtba69qtfg4hc2mk08p0ndxt55t61xstcyh0m4leusd8v8ho4oftz7mcoaju4yu9y37emo8du8sadqvd946flz3xgktbxk8swss2vhhmn55b3',
                        redirect: '4zppn1daw6h103gs744j8oie2h9uqfdz7qvof1bjvtoep8vus2ky3oabb2t2y828ivxtzosnri8n5yk2htuxs1onwt370fjvuymb643tehw8yvyudzpglgs03d1h2i9exjzgstu7c88xygh7xfvtmqmyfwd9l44nan1c1qusi0idfc0sitps8ua28jecafmqvo2f60f0askjnheuyjta6l87s6adk25niewa6kv44pxjxbrcjhizt6ysa7qzsq7vsqe9sqij2q3ii80zi3snzry0mt9rh6qh5wo73gcpo9x7l0qrnuuhqg5j4dukvw07rf515jwm8xgecsxwk793dpbzalegbrk5t9qlaz4n5vz8taofja22adsvs73e7hkvqy6cu4ml2e111555gslivce329ugt0kcc7dh8fgsgpyufmwuhg8lpc33m6kqfhb9jiwj0bvlq1lpkkf2n0unxtpjskoowwaw34s8dqnk7w5zfah0x7xee3j5h3fuxf4urrz7usjblxbp1cf04swhk7ro2t1j1amjbz64zvdhwg9bhsojhm0qaebt8qznxhuhh5y6ggkju20bk5bfmey1dt01atmxpzwzqpqkqyjgsjaimgbohcjh4ir74oemo4cw35zfcnryoe4zcwtye2a27th7x4vp02sa6mefulteac4hvmmt1tornmldt8c9bhlhr1d1qxid80lydfcjke5poorvwp9dpo02nt0sttjsrzow3qgfl9qcv3d2u521de729dig8sh4yp2qnfq5ila59xlhwqqhp6ht4kv8qqu98fejiajdrl2kpyrytwty5wk2i8cp7mnrmderecih3plrvixgk2hokxhu41xh7zzsqqdxhuf7bngmocp66p9ofslsfa9nn0q0jf85lnitn68ojd7iy0jcnfhn3b2uq78e4634334meq4l7bh67jlcna9hv29ygq21kyfdsulnkmbig0ti98i2gl7yoxra5udllx568wr82zwnmxhp4b1a17mi8cobb4v47fvrxciuo058mhmmbhnhggolzhv8xs3rn0nuxj8r8iqso7vm4qdsdttk3jrctto72qgncmsu1qvywjcj8h1n12fs2s6ziozp97eatkjc10iz6xixvtz8l0gplz1vs7acymagm47z5yz4yx4p1iyq343jzkxild57vo3uc26vyz1f4uc8232g4jegnc6i5ax5896hmbzcubfwk0ikuct86utyayhs079odv2pkwxqdkbiz2fdips9bc52ux93qxtx1irekw0aacsp133tudfaqayw29991tli735ruefavc3r66yqe95d0p80achpw2hcnlmuuw5zmc7al1s9v5l3rqejzs4wku11ypq1uysbdvq8nqcoy9igfinrb285ryso20yp09q4up9e4nssi7w1izie95d8paghvbmt0x72vwuns42txtp3spcwqbqizvt18lke1klqih041ct7a88z7v9tn49qoaewpg76tc9fbiuozfz1nru07mjl3jpz3hb6rpmh5dpade9d0pflvnpax2zja8tvsnno0er61lre99fu83z3h7polgv5pthg70b9ac4lkxakshr7rbw5ah4eekueai1vxavphrilw47l31zbnab3fdy1f4fg40vw84cc5axzsqr4gcszg6ucv5bv7b7j1hyv0zc36oyy5elyutw6ba8t0cjirhr325s5cwy1aj4bvxyvx8pxm9urgq8txw8qhzoyjw0nrbf8p4mezlpb8i6u8rqxkle5oivm9s5ray6z7uj7alx1tb6th2xk2lunk0j6qtmgh2eduya1k4yo9wss1x3v13yc3m11f84scxd93c663oxux58aerf7jmxh99ezgbwygbn73kw3zaz1har6xvez62kavouibc33nfzugl58t05ayslfnklu7xgdcbvciybl9281xnttkl1993hh8n6wmsbfc07bppc5pbgz0zugg26y01khlzoqkibcexsbzk9ak39frq3rm0jfpkekk3t4mly1',
                        resourceCodes: { "foo" : "bar" },
                        expiredAccessToken: 4907351295,
                        expiredRefreshToken: 1471638484,
                        isRevoked: false,
                        isMaster: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateClient).toHaveProperty('id', '4d41b3e3-76f2-48f1-9c27-c0f945a4697f');
            });
    });

    test(`/GraphQL oAuthPaginateClients`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        oAuthPaginateClients (query:$query constraint:$constraint)
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
                expect(res.body.data.oAuthPaginateClients.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateClients.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateClients.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL oAuthFindClient - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindClient (query:$query)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            resourceCodes
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
                            isMaster
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
                            id: 'bb096f8b-387c-43f9-8e1a-411061380d6c'
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

    test(`/GraphQL oAuthFindClient`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindClient (query:$query)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            resourceCodes
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
                            isMaster
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
                            id: '2d8bbde5-e0d9-46e8-b0a3-13c4fbc91028'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindClient.id).toStrictEqual('2d8bbde5-e0d9-46e8-b0a3-13c4fbc91028');
            });
    });

    test(`/GraphQL oAuthFindClientById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindClientById (id:$id)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            resourceCodes
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f3f64e25-3bd8-4040-9ee0-29f9408edcab'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthFindClientById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindClientById (id:$id)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            resourceCodes
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '2d8bbde5-e0d9-46e8-b0a3-13c4fbc91028'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindClientById.id).toStrictEqual('2d8bbde5-e0d9-46e8-b0a3-13c4fbc91028');
            });
    });

    test(`/GraphQL oAuthGetClients`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthGetClients (query:$query)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            resourceCodes
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.oAuthGetClients.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL oAuthUpdateClient - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthUpdateClientInput!)
                    {
                        oAuthUpdateClient (payload:$payload)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            resourceCodes
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '4c7fc406-a481-45ba-96d5-4e27a7a2ed99',
                        grantType: 'PASSWORD_GRANT',
                        name: 'jbvsshh80ub5d5x4413dj8u2bvi57r7t9vx8hbq2ffobr89an31wo3pv429g1vgppkd475p3nazg74r8gyp479w56gwysw0452pdvyrp5ltomy9xtqlxoc6p3uujl7g1rxxj44926r0kayopbdrxcth91lt1cpcwhu6a0rycz1q3klzxwcyb7o87phdmd278n3g1wvo6o77pk06qn2htzv98q4rk72r1r3k727yqsrsm2c96twllu13olw0rihm',
                        secret: '5j6iq8l71uttgvbmd8wbn4cr4spgc1zqlnpaqi6ad1szqbpf25tlxo9t7v0xmjqv4s3awxof0ey6vrierhtan6kcj0',
                        authUrl: '1dt2hj019xxdtxpaypfblbzajeuj4sdx85kme3gnm2use5p3rr88k4dbdx3rvcr9zkwp7f2jym3c0ojpzsobsap5ndouy3bcwq0b1kcnq8u1h2u9l5wfomfakemk8oucdqxvjsksjedpbxbbx72633g9rffbe61m9cy3qmrw1i8srg6xrtszhfklf1ybbev8csjzpx132a5at4qjcnch0jfkwm2owqve2fgit67q96um5sz1ma0qh1u5vz8tllwbab8rr3ji4o9q30l4jn3b8h9ibv9nu077xwlvrf12qku8ytynvb0wqjxm3txkazgn9ttw0kzvsan3s48g16qxmpocrv420o87ptdwsghu4nppp5z5soveudraztvifysye2lfj02cahgi4e7ih0amzfrolovgd2ailq71hlimh0rn9el0v124jv18b627q0dwzja7jmb8t8qe5gq561ts4e78w5ououxunbb6tuk5p5jzkc30bjarjzr80ra59axjabtktc0g9jhahmtie6mmettscdzu4y6e9xaz8ugn8fystuka3fixiloquiv3mmr70n2fkdj8hdhocixvl27xgtcr9a066plzo7ot3j6ndi4qj3isxapvq4y5wu3g2v83jq3u16uv4flpstkiv7hhcabke8pho7nyfc2353z7xn9vadxspgurgra6whvog48orjhyyfpc51828noxiusk0dt2068ijepwn3ew5ug9q4dd29sm903akb7cb6m28qa7z6fwnmbvxhtqeffp1a96mxkvzkc42we0fj0v3ahvsfr91f18attkxcj6a35bzdgbxe3l4zlfhgv4uh1avtbl7cvmmxsjriklqykuj7mct2spmvtvkx9v5gytslads8y36kj57waqekd45cduuqxoc6hjh3oevcei2rw1tdz1z5yx4o9f3btx1oz7u9ysx9y7hnn0y370gaxfa66en2q3rlfdubo9h20mjnprcuf14tw6kmyoz69nfmbnt9suhko6co13j4rvb3swir33h9sygoze6sccrg3dq1e6jfdfcv30e8qvjp44xfv6slvl1hlnwnp2nyjubotca0hgyx56t6c0auzkpg0q74jj6lqie0l98mvrstzarnfbrk1w81ysmn0dr5gwant0fd423qqwfgy5sn6f8uexvsqbqv2ea4rtxpgqj5utho46iynua1zuwbfnc7jdptylvgvxbwlmtvea85x1qv2l4dm84kfq1ajyy7zwx3u57pqqief69j8moqkbekaqdxzzryz2nu0a89m8dulxmsadzy3zw6sggz5gtmb2kjwxsgybn3mc6ejapl46z64omei8zmqt4vcwnt5th95mqtdydcfhs9kld8s3vn45gs50nu4nua0qhrfpqadws5nlpzcyvayynqr19xrcu9nrly67ulf1q4se42lkgzo01bzm0ded74zdquyv2hd9sk2qzyq6v1u1iaxtj06y0hgvbx4pukuwps0j11xpnim6608ltf4iauhre2szh7va8x4k9nhia5yna4tnnfeghm1kvf2k5ciqp8iqnapdgo40p279dnqyidnfked7x0teni8nf5wehf11x4clve6qd3axdjqy2gzbztpkuqjw9s9ob4zhiazqsbkq75fm5b2wbd5wissj06v6eq5ir71x9w7ub9yeq6mq49egsu0acz81d6f1041j557z91u1pdcbpkmnmujnb7c6dbkjhtyry73tzr5fvdlwz6u42ggoelb78e7hmwx3un7taqd68hw2pfig4go0kvcmgbrysb6wjblhoncukbxey8vajn3b2vuqhe7496e3adgj1jrpln5b0of2kbvy5lv0hk06bzqgmb4ldo8o0yjasanzma3aorz7jgwa4flkhge1ucybgesuh7pewvidnh5blr7x14qmjw3t6nfngv39uzk3csve5tfepvr35e7gb7oqdc84f5k2waqngn8snpx82qllijs77hgehaz7230eq5mhwu0a7i3n2jkozpgqspqqywmj',
                        redirect: 'nc3w5tu1hpmo0zfscfcol01u6cify7cr6qx8sw2ru0cnc7k0yd87op1njm32w7e2bur3s4rpq7mvvar16kfwilo9o98o6xhkebi5ucf8m3xznn9br5plglli01rew0zz788fzr5c95p4g86mjy4q4ff222evw313sfjo0oojfpwqef03u94b8jv0p45al3whudt0chk8d4pg8rmktp5hurakw3q6d7ojjmcy4u392nafl50thwu46w30uopriat8paken01zq99x406f70iwrhin4gqz0oblhu8qublhl36gt4847nca16nlqgi1fb98ov0exfcum3x49xur8tv5xa4q3gbfnfj7igz20dq3gb3lf32za8o6mlw8ic3nvyghoh5q9wwjut7qn0j3k7ogycm8lrvw5lmnyh4cmc3p9wpbm929f1vwvenamnivrexxhqsqrjji591vz4rkbu6puq2l5l16n30jp2vnkkf2dukdn6n5i9i1g3w6hte6khkfdeajujid3e46gxhos8gfrnq88zoxb0qzrdd548cuxrpr6mhm88jtdy9qftliwvmphnoyol68s1igg9u2esjzxo2p28cgqhb0vlmbomsqvpyppc3q6np2l92vdu772iw33dyfoazcj5tag078hyj74njogvhcvj4u6n7tkf2dpkpb10hx549nj1ydrlbeyxvy4btcv4t2juvuz6cm28tsx2c2rthcfqq5yubi7ufhzrqbp10hc08vew0pb7vhrevir7moys4m28v653l5j5c10u5v4are2bjgtf63fi7owlz46d4iv2vqs0z1jmafzbngxzifibhu10m3m2din08smps3lj8bclu4w2i266w6gzbldt34zxfcp6pq5ddvnuffh0beh0fnslx329sho83o0plgsm3j77w1ecbui1uz82lzq25n322rp0rnei3ligp23vkcy2dwqnp4dmb9tqq9y2e1u066upcge841nuoaku7spt2d98dchh6v2gqk8ucuyyxov94xe5zcnhnby885ol5vro5c3sj4wo56fp8gr9xzvoc1k5j3zdtw2gizbpc2cf32u2unzqhg2vjhjj5978i48gjzk45uxhovdvb6itmv2w7eg654l94l3lqs4vftsl70btias8l9di2igx2h616loa4etd6kev4jenz792v8eci73uaoxns549ec737nx1av8cc6lz89pl41ghog8a07mvdqwx05jwfgu1ispcxjbovfcyjb6rgx1k8bmms6ru353f6ij4tcq1p4i4fpy5b63v70rzxomi8w6n9tsmeok8elfhtjn6osausrcvo6di49th1ufkigd2456mu0ergd66zts2zgmcm5crlgj5x14himff6woci6ufdk5s6bustcr85tqwe4ve5466qi7of0g3xdgp0ckr1bbcmb9n04m6q0sg4q81kpxy808myh3q7le3wbdb8y94dof0hy6m43tzjc44dmd1l4uvgwqr6hr48q68shj68t0lnb3wfqajg2d95s5npneyi10a39sf0ayk5h7omk1qfuyrn3sgq7qlaphmodnjuvjpcr4n5y5od87jnnd01hh9froxwl1a9yik0n5h0tm8p64bcxj7q2k4gjxsy4yz3sxsq9iy2r3liva43ikxrc7gx7ozlqlhhxk0uyc9myxmw6jbvzbfmy1ouofzxky4tnzzykkrzjs8kb7cwhirjsjpc7r6eh9ir079r5h14ietwebmz72mx1ozk8tnly9c1vdqcdr9kf5dmzmcv86ja30yc889mc4k4lndfr00enl3l6b39pnhzbblfcgb2wiywdoje652v5arwnkzlkdt2rtg41otx66xpuwkcd2fk1xofr65ikgzxs3cms98pynycwrqopdzm6su79zb9pskwybij8t38ixvcl45gxn5cx4nw9v3kt5wyygbxvlkubniq3eq55n9nrljac9uqhh029qhcedli7hoz6plgf3o30lgqi5fno3md2o0nlki9aij3evw4r4ijc',
                        resourceCodes: { "foo" : "bar" },
                        expiredAccessToken: 2369675771,
                        expiredRefreshToken: 4778213999,
                        isRevoked: true,
                        isMaster: false,
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

    test(`/GraphQL oAuthUpdateClient`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthUpdateClientInput!)
                    {
                        oAuthUpdateClient (payload:$payload)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            resourceCodes
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '2d8bbde5-e0d9-46e8-b0a3-13c4fbc91028',
                        grantType: 'AUTHORIZATION_CODE',
                        name: 'mogt27zji5t658lt5tpi3c7a7as9ysyatlde0am8rcvgajq11l5kb07g7uwmdpsbobvt2ya93iocxo65a90qhkb2mge2f7l40vc7pg1yoebaqp972mvdxrd70mibrmui4kidzru1zd4vqp83ofwk08mnsbgga4yhhpxb6vkst27lb9t4ep7kc1bs6fuiew9pmo8a544dbjafivt8dclbxuhbdsdoryhfo4jabhsw8u7juyuhey2wqyasmy2pmm7',
                        secret: '28f65ge2gd4szo2v04jjqw88ei75f7fkpswxpzytsbwv1hnobqidf8k392exy6xsnvi56f04j0lhe8yv3m9rpfpnez',
                        authUrl: 'ge88o9ax76lg2l25ryouy6qnsyyoiyogmz5jqb63aiebt4v2k9o84sm79qelas5srb0y3i6h70i7gxaj2hxqmg5pu4l6b5ryjmzdzhtoie821c6z7ub1za72alzrfc15c2y43lg5npflfci1z4snalwccowtvbyb0qdyawvi8apvs3ylplsq3ijozjj3mqsd1bx2lobkf4ixihf4vl5a0vji5ky1p351wtg49uy59j3bhnxuypgny8zolyvoc4yctdm1427si0rv4s3tavrkuternw7iw2pk193vk0lqlrq9xrlux5robyrnpjonzpl1tzzznly6g663xycv8vawzoo5z76t579bee4ik1bc3wc1wi5t6n99a2lu3qyod1xk76p6fdspgses5efiyd1udu2on15v4gfk899k88s41wki7ajix5dnl8ubcqvlb4g9i82kkyvbdyh1jaiv44k1wu0fawex38mz7ngg74uo43ivczp9eqml6xl3qxs4t0qriutjy11hxbevtv3g4n0bm2y9r4fkpbhwh57i9jvmkwsaa5c6ve5xshrzt6jwnj9vp81k61fjo48rdd0v5kd0tmgoe8j3s0ddzcvx0kn9kew6bnwq3tkrgtlkpd2s2noovdv29tirc48r9xgpq2kdlut4jm0t6nkw8pq2bbzxoxghe0q21rd8icuc0ol4r3udkdcraq2bt2zmzw2pj04zllkk0005y914llzpmjat2fqfxuusnduuajhn6cybikc2j5th7chqxn2vy1xaqvf2fkxh83jxvyalr3966syv7takawtrc381yzssg0dwnj9ylef7il2u73vc177x4x8xau27j9kz8m505tegos193ijf2i6pjxz4t8d80hmgd4ku00bjhr4jyolbijd5zrwhngybj65wpt9xmingor69lxmcdfb87339zde5m86ohskvh71nb1qg87ydi7jlls695f44j6f333aodf0y3c2dzk673ec1foukf9n397lelkr4z22p0ega838kky71m80qe8e3b24wfe4ox6dpu3qi56jl2vwezpcczz3wrj9fye1nutaspqfi82ts3pnoqkiqgmbcj0nnzf1ffzhidlocfimoou3xr639wniwlz2h29slo48pj7kmlwurrna55h8lmedrmj5q7d1darhmw0998zd77r2jrs8wtfybol2yqsubq44vpenlkbonw5xxt3pxe67w344931goau068ikkwf88grdzzzdf95q3dz3lxufzaihc2j7ne1r7thjkd24x1drm69sdy17q1nipbcyse8zoxxmnktuh7aikuxadjkrsi4m6yldpl4j4zew7k93zrm9guruyb48yjz44qucoe7jgsrqy8wadsp6p8ztkgbf0g3qlmjgg765tbwdtyy0evrvwte1hx3ozmzxp1zv8bbsl8hpvqmmoucvi8hjb0gemz4462b7wfd1taiyql5wyenj9e5hdx00bws1vf55gk93awhdzawnnw1ujj3q98f9t73zvglh2ozcd4j8pio6bkl66dv4plbnt3tgs4rtikq6aypc0tjozuafnltpotrisfqx2fifjdgnkmyyvx0beczcwamsqi8n8pk3j30oiwta3v4fllncv4rf1ohz33koxo6wru45vv6kta5k721nwbndr1brde00lamub8lptvagcmcxe5ivmj4mw11zm2np9qfyqs6de2f788vn1k80ajre00c75g75jausl6wx8jzur38zga1gvnwawblxx5x1nn8sr6rrs4uhcvr3zxnes7hogwfl3mkwi18j89mibvgxyk3it3ov0fz4ge05gasbzw63uyvbeci3s4pa4xh8umbg2jx7141ac5cg12lr49e5g09m6nllyfltfext617xiybacfzv7w1clq4mdke5o6wtlqfapdw7jt822ci8b2znnwwl36l2mnu0v276ybn2b6vch8gv6onqi9tfnavi7b1lyaez28u1lch6ab084yogipj6nhbqoucbejtt6ksi0',
                        redirect: '467vs3wu2kzykpf9mwaec7vnwq6fzgpd12i364xyfjlq700v6tu264vmsbpr4xw3zrz84stb2f6eg548sorf2r5waij0g2nsiebqztov09cufgj4la6jtchky4bwkhg5ztbwjkh3wq9sv19djbgg3hfj8a1i0z1gzohgtkadmtqer95tf36lpm06t5wrashrc7k5pyoq8395j1poycael2n536907rgtp0aekc9c457c6f34pnkzqepa5o3c6915rnk8pds694rp52qotfkpri0jglq0jg6sw6t23ka0x605621nnyq5uk6kq41rcb5pezdbvcuxv1o2o24no9hnr4zatixy7yvjknneo1xwkrd18nxbe39wwj57a1n7gtsksao80zndsio2yv2f9dhdhv1p9hr38hp708wqpffclc29o0nhormnphzy3mm1p7a06lhevxkcb6o5o5avqv83fgmd3kyadwii0r762mfs95qt10f85somqlye5hufmq1axyhpj7h8tc09p6cf3isanjuccm21czmtbh3kqmexptyb5r0khgkuj0jcxny1ud8aeh7b41g8nol49x9e07t1hg34qnfzb5xf6z3cluuxoilsg8cjd46npaeiu46g847g257mjt8yq0qakvk6d13p6a78rpv5wn4cklsg4dxlp5fo1utxa7a4vq2m1n36qsels3bkpc6371eulnazn5ed68zwcffzlqs6wlol3vnt18stis26vlrzdhughgvjt80crqg650zgm5ixfhwmwzwfsbvkixmqlv0qmfy6zlal59hsnqiepcstx2w82eos9ptn81xd3qw5v1xatxunulit43x8weg7rbyz5bkiuz9r06w04tjzelfkprfsf8ufly1uzwwid8tmt7css84kqvltsln505pkemtbemgrqu8o87exw45q9onjimmdurluldtz7p8s2ezj9cxrrpvrrii1hsxgsrsvmnryw88yebc2si0h1cviweo7yswhu13f3tvexyp88hl73k6c8of9e6pdr7xc519cpvpxmgn5a5bc3wx5qcf4zq5qyn3j8w343u9a4u2engk0rex4aer9zsruz4r3v2irtxd6z7tehgsuubu36amjqq8huzlpruutzr0i2dsuyl5ka8gvkp3m29u6ythdg6zvur1t4fqqn709nvofij80s7iup7pc53yeelr6bi7xgmhinnj1d65ei77u3zte6yzca76nda2uh7kcwhdcb6s8qemdwr27uo4ij775mh9m3fumv5f5kr4ncwwm59x46zqc5hm476zyp6ypertwhq3twx1e2giv61o9bbqhalgf9jt43pdqosx9d7bwnay8xfly76lk9vrajr2lwp17jj37t4kdd4j6wo81clb7cswb4gnsv41tiy4ro53xyif7l1mrwpsc15vsr7fwmmnj6my51vv0cdftnb65gdfapkuca031iauvy2qraavmqfei37hgqkp5v94pks3duuia1qmf5s18ehb8m879frxkyxypt15b49280dsbl71d5q1lvo76p13eerfblwqbw4s7hlxpqf77nokrsezz4vt8o93n4th4fk235vf8uwhfsxhurv2362uu4srwhpf56vuoq6kcaohf52p4483zy9xhp0d675hbvd369hgvd8op8a76rbgi43ms55yjtbt7v8sec13j7esfoke4vxe1iwj0qgxbeivtoc6ajt17qeufawuwcsq74767f20rr9o4tp81eq2awh8mm45touuli03iwex14meehnrw8xz7ovwekwvz09poi807ffvr8a06bpq3zy5mymux7k5atuk37m9t6dq9gwxa8jcjye1uhb83io9hohlmnoutodlod5xlo0gtjpzfzvf6dik9vfh3dqarg6mjexbxnfdx2f86xhmx68p3wbc2zfl27vbv6hyj3l01pjv2dyouqxkq0xmdsu204zof48pxjtt2mhpzdyxm8mv4pb73dr3jfc2a2pza99mn256t415jriqmdobjbhxm',
                        resourceCodes: { "foo" : "bar" },
                        expiredAccessToken: 4371962393,
                        expiredRefreshToken: 5929577051,
                        isRevoked: false,
                        isMaster: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateClient.id).toStrictEqual('2d8bbde5-e0d9-46e8-b0a3-13c4fbc91028');
            });
    });

    test(`/GraphQL oAuthDeleteClientById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteClientById (id:$id)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            resourceCodes
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f1d81951-19aa-451b-bce8-d342d24889e9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthDeleteClientById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteClientById (id:$id)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            resourceCodes
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '2d8bbde5-e0d9-46e8-b0a3-13c4fbc91028'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteClientById.id).toStrictEqual('2d8bbde5-e0d9-46e8-b0a3-13c4fbc91028');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});