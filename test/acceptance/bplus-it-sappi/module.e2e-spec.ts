import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IModuleRepository } from '@hades/bplus-it-sappi/module/domain/module.repository';
import { MockModuleRepository } from '@hades/bplus-it-sappi/module/infrastructure/mock/mock-module.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('module', () => 
{
    let app: INestApplication;
    let repository: MockModuleRepository;
    
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
            .overrideProvider(IModuleRepository)
            .useClass(MockModuleRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockModuleRepository>module.get<IModuleRepository>(IModuleRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/module - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '1787f2da-553b-478a-a053-4391096a0367',
                tenantCode: 'oeaemu43wae6hk2w0ltieqgut6t7ot2baw4ijl18e99klf14gj',
                systemId: '1abcd568-4333-415c-b2d2-66cab2e5f8b2',
                systemName: 'set4rrri6k6kpkybtj45',
                channelId: '084234c9-60f8-4fbb-8be1-73fbae827d7b',
                channelParty: 'sc3c8nm7dv1mzqz3hcayegtp7ncqyq7p1tpow06r4h5ym6kpj9aaauoaln2cfm79iw0lu8f9pae87uns30kr9f52f4o5z4uv3d0fkq143mvfceaf6k4m9nytk3isln2hrup3rjrorwejllq3qhm1i7jnr76mliss',
                channelComponent: '7ofammtj7n76vn5uvpy3xu44uv373xevbw2kiw6b95axupsoqrlmhhtg1omq2dh21g6h33piuaj2m2r4tvm2mf9ex02u9tp0g53uf090ovyxl1lhtiedbgsd9z1j7l6eanzlhfgvntprd3zgfmp9ogtgtjq1xd7k',
                channelName: 'vblgtjhsmw6mrzklixfv2s8s71j5sz1xk9sh4v9hpuu56168qhm9g9t08hz6rmlmkyeqczlo4gysqbnenyu9v7f6bk3rod0fhvvit515l5gst6gx1gvbh12dwyd3chj2cbp6cfh4kok6e25wehf50v3eij1qu3zi',
                flowHash: '1pl6r8tx6obmsqrpm8a68ulbl4gzxqcffme1uifh',
                flowParty: '6mz66ezdkdq3njgqhvlbwcx0ezu1wlqioyr6z6y3ypneq47k25c4wxty3rzny555iy17zf8q0q46mwbrlqngmkvl4bjj4onjf38sjj61dnz56dohnq1bcecabd7enz1m98r7i069np9z8ub0z0woqrbrzsusv3lb',
                flowComponent: 'mcagi4nzizwpzbrmkbav3j4k8r6402ywzwcay8ml3nz22u6txo7cwbdmfyfd0q6tln5zd6yljk8r7cq1ys6m9mwf76wiwqxfjola5yzc7whq65xk9533q8rgdv9zo1efk0dj9xgoxr5vskxn4t34f88g104qkieh',
                flowInterfaceName: 'egt2t623552dny1v9re40r32gvcouwuvejz0vz44feopibbx4sjjn3toftaz46hvgqqgcxmh6rdw5pxnaqggp7zg5i8etuf1k6ba1amvxsvj7k56pi51jzjz3yw5zpzk1e8je0diyodewm6wx1u6r73wx7cx5qmx',
                flowInterfaceNamespace: 'i23f0dg06ebbrfrjgrn6ra2eatilzj5hf1rt49euw0jg8sf0yfpmyuif080vacdlhy7ytc40yqy48zo7bvrgctgnd5n0u39xyi370omy6dwfuq1s5w2buntsuv19hkhg4oerxzcchdnmyra697ajc4mbeeup16n1',
                version: 'm1d227ka4aopdryh70hy',
                parameterGroup: '9evuvu90qx8g9nwp2c0fntb93slruo16chkemx5fbcmhu8s2aw6fwxb9pl72glr1iawtpd0pyf4vba4xv7db8c3k4yq1d362tj2j61m3296jwppnqem4t6o2y2v4kof2z5vrel80pbi89q2cp8s1wbcnwz22or84oefjiy7pkozh5ost4jucsii6brcr2l962abydxhxfb1rgjmai0ag5nf6ksyl3w0gmsc46udg4nbahon4rj149igvdlfpvbz',
                name: 'uats8osr10hc0dgqa8p6ykdt0b1pr9qiuc42wj7putm0xyqwctje33ppvmfhnn9yyko441gh2uzr5emup83jffc7xvgxepzcurr1z8yp58wbafou681rhkokphll6luykju4jodseyxpmqr6nfcnbxwsqb4tkqatoj4axsa4za4ee3wlvntqfp9rgkyjq762qh33njv7foq1sr3zy39unrqwgqjd50h5xl2wsdqqvxf6rt3rx8rny0fqeq0807r4ekzyab48oupiosoxk7nenmy9mahr1ea5jvmrsfbaxd4no2isl591u36w9lxiuba8',
                parameterName: 'hoktdnhy08vtdo7rlj8nz39ngue8jbe7wfv1m600ez3wmtju4iciqg09r4a4oexdulqpvgyu7u4jnray8ecmpdugx2iw04tqia33ebmcb3rnl30dt1tfiwfkqcvhgiguva7cisk5c96eswhxv341fbjuih5b57x1q5mpb4703ronxhvwi3d2r7km17m7e7axmgt5q7us1iwyrf15mchhdj5yacy88rlmxor4tkuuwyhhwo5mwovhfanzhfhfy2wshi43daty81tv4va9tqz86vju4tyxzw61dvx9nyodarhth7lzjad07j9l9nudhrxn',
                parameterValue: '8ufgnej6obbi4zdonzqgkvdmb7vjeq7eusedw3eoo0mszk9q8g39rhlm42axy5ytqafa8doy7jxrkklbdu9ujuv727pb39u10lu5ay2l9zwx6h5lq7oamnez8tgsx00235kreznjnbebrkj95y1yngdvhkvh3ffd7vbge7voofcv3rxohvxw8fyojo3av62paeazqhygwrmoh5svmapzhqykh1b79fjdvmfudxem85yaseltavy6ln66u2ygajwk0z3ofmja3z8extpu7j83n3ilfksxgruh9l36374cauzhnctkc1h6cxvihj8xuqzmt56gy4ld165tp4bbi0okqt2a54i72empe59v95k9tg8rywc4k8iycocwl6bozdjj790u0nmfgres11qtrityajcxuun4k6xpoxi0lgczuhri4zskxnv4luho8pspnknrp7ouxuwguc7jhshbbomkp0auy7b1z93qdfibnqraia5t86kwtb5n6guqcfbf33126aohjnwi2wl577646emawhx3pwipjk0kfuw3v4f59s76t9q9hc8ua1b8xbn8nqzzd521o0zeffaivtcizkzgoett0oex834h4pwpuqb9cc5diobmlk07epmnttryvz2fzam06375gk7n65rek1n0r32znva3r8y4jg38py50nype2qlkvnor5z5qte9q5g767enr9bbp1qpwvq0538ibrqfsg187dty4p42lsagm57cpkcxmpcbt9892enjbbbj4miufnwszji083cyt28smkbay14r7dtme4kuzs4l070i5mme52w2oi9edwi9430olfclyb1kd8mvud9edtqk2k9pjs7aiaqlovuawx35ubu5u0fox9lqf62bxi32miivn2jll8ki4rtv8ap5apkeapegxw5op1woifniowcflb28s3meblpe9qvikv9wmw8urhfajv30t3yedtp7q7j3711jq3tqjfy6la39xk4da5tpgdtq67yjwt8irdrlkiol2',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '1787f2da-553b-478a-a053-4391096a0367',
                tenantCode: 'oc732e9q8qnzdnqm065bukcuupvp6eywwyh33onna8qvpejpug',
                systemId: '1abcd568-4333-415c-b2d2-66cab2e5f8b2',
                systemName: '8jnqhylp8h6bihynecoi',
                channelId: '084234c9-60f8-4fbb-8be1-73fbae827d7b',
                channelParty: 'aag77brn3tes61960opnvabhlmccc60sxqjpbq5kzw0zk58lwd4qnt4j27g0mclprt54k053czl97xd1rxe3mpwx2wku9zficv65soq81gp12rd0bv8sanfcowycseipko78oqfytgrxhbw0vo8oidfxvbs5pwu5',
                channelComponent: '5ckfqsl08rt0nrospqn07cyhhdpnkbyywj5kxjckjnvgwsmqkex41ux36u87ftw62bvbl11m4y0xccw5963cwjqx6bn13zdo46k7h7da4q4rnfsgd4ims0nxg4n1yjr5yy69h85sqla2k4b66j4uhph2l1ynlrjf',
                channelName: 'h3hze4xx835stxcr3otg9cvq7i9slz8kyjqu6y44gqj1eltjs2uepu3yyke387gfost0ys1hl01ttmxqvqu0i15eydwq2jr7bveqwgm0yc0lnqxiv73wpjgmv8xutasq8a7epsaury88lr7dx7vgvymg6htux2lw',
                flowHash: '5ib4yj36kpic1ssxvuhl79hl7nlrsej4pufy4iyt',
                flowParty: 'rpa7qzm93gfsnbio69369e9xcp6h0k4cyxt0uyg0tu2kij9hyykbfbyzbxvdwfjqp41eawchfy7xx75m8m0rscs7s3vbmpyo82lg3u6ybab0vlx3gsgvupk74z45jwotnv13rs3w8e0p2cxkfbnaqjhq25gpeim6',
                flowComponent: 'qcr0y6zxc6gdwvqbfn6yn5qecq43pjne9k2x70n3bbo4oyko8srtsg4nlts2tzxczhmlv08dhwwf3s67tak65784e90dz2j20zmpgad4qz873db3ayhwwktaox4e1lnmjp6vmo738j3rklk9ysk7srigr5cqm5dj',
                flowInterfaceName: '7hv28q5ba3k299ojdc44v0c4ao6gvv4fx8dtzeorwhvtd7pkfexkv7onrwsxhgvojdj1dizzdqqwxadfuedoulq56jq9lmloas4jsdhhg7uttzz94ke2ztz6gerskf0yxcl3mrqg0jk7eassbdisz5jl0lf54tj4',
                flowInterfaceNamespace: 'tf9ii6zx9xkt24cc9nc9zoidc73qr3r37tilmdihw80j3iw4trxuixrm0ceqqaovaq9agpk8sydkll1z15evbyj8bezdyn4re6gvjr36oft9nd26puh221vtwh1yslm7xk4ti4pztwffean5qveex5xir810u6wj',
                version: 'j650vg5pmy5alelviiph',
                parameterGroup: '3wkleovhgv2mesokoa897lblio9kay2ksdefvnffjun9yhlfwjyj8h82lki1zuikyykc0i07ztx6eqj1u1ghztfs2nidrx70fkzoewgaxovxq2juiqdii2rlwl3tvofrlglhhyccy47mp6pgezr2cz5j08lfl8rordsntabs5z5zh5vh89esa1ji6ya91394eih1s33bomdcezbij1m9qi5x1ta6uolaqbm46413vhcp1ocfk3pnkaqbnw38p82',
                name: 'ld4ub3slm48k65p4e9aozpi7vk04f1llkqlrkse8kim3uit1jsvawzh14fhv20yd4miqf87rj2lyjol3lc44w9mfcdu13imhm88tep6iovg7etiitusa3r0keirpp09lk363lptm6ccm0wulkli9s4pb1k2q0dd1t4w32i7ohz0ga357fo53qbqb0iaiepadzbcdy48tq7t5ep5qx38ai0v6v87q651059bsfcndwopkpgnbhhb2nb3bp07ougs8i9z3wsut79ohnxzru4293s0tnekf8pfigbimakxqeyzwg3xjhym0yi4jtl34gays',
                parameterName: 'grrvang78x5ej4t29osac86ftm9idr6yoqrcrkdlw4pd4e8zvneofrqlbc9cuit29tdvu6tif9ar9o4bus6ftmht4b2nrza7ivuqm93g95p6d64bzm7nd2kwcg4fpyix3r06m51lbs4yarnwtne4ewuzzdsgzmpys8npi7p09bf2xeviv6bxss01b8ow3rbziellr2n0jrhkc7hrvkib0gwqycpmc6x9hq8gxw16grnjfout99v93ppvwsed5bvya63e4f2vwhwohfjqyryvjuz1ulp174s9ak3sqgo4jx9k3ytm59spzvful8hpde9u',
                parameterValue: '1mmf4k5u1kx5tk060og6vnu7cecsyahdbzimzxfg9mdputvt1p7ssxo8gihiwmwq4lyudgck4cohrqtkcujlr7vl8nli400luo6s9w49u5p8nevpccef9526i15rjv5p602ubl1qdj5ezm6suhglbya0hgld7jx2013pv5oclum1abb3zusp1y2q7fjkneheslha5v9mmy5wgzcdt1ggodelpowbrz8lkv3qzj63ttkt11312pydppv4ap92gu1ldy11c85otuvtqp6b48bltfvow9l535h5ptlivmin33fbquv4iyhnkhw8vm1lzl21iibgh3e5wgayunjzbrk9rg0lv0pqzvryj1wewdl6d6xvrlw02knfpzwaeluklsjip4psfqyatvgnbug7cu8jo6tuofu89emg2r9kyj2sk89fota6cfvxtndz7y6vryxo3n8c37wis3nv98w6ivs29iozewn8tglz26tdlhsnrqea0thi5hyeiu26du2bnfxdo42w0ccytyw4u433oofymd8578hswqmvaigtrt2gq0nzd9mz8ueouvv87f6mzt2sg5u7f7wisg5o5twkwzts4oi0srzgalwsvzisvww1riqtx29j12vo8oafksg4878nzg8njh5yacxrgq4hc3y6ximlf7g5089gbuj70ai6qqg4v33waf1wxu25yrm998undv7z5va443tnvwnrq4ky18ysn5rq60dhcni1rdrc56zf2mje8wvae575gxoo7l3jim5unh8vhfto3p9j0mut4un7dd792yy0fw9eh8gigwcy1b5curn43ur2gfe50awto8uexymc1ivcld0nec38ixo3yrygs9erf0lzldw92ic898jjc8yh6j9wyp3mhefxe30qbxr4nyw78tbdia9da66528ehdyko6d9lqgctgl08is2fgewa42y1jrmigncfmnm9j5fv550ih5yjcfbuwtcgwuysg5kdv06tpwav1sn7vzqslvt9ik05gzibwqwz',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3',
                tenantId: null,
                tenantCode: '1coi50xag9o5bsov8tldert1c6aanype185snfi1x9nb45s7rc',
                systemId: '1abcd568-4333-415c-b2d2-66cab2e5f8b2',
                systemName: '3l4x0ry2i11q1khbh3wm',
                channelId: '084234c9-60f8-4fbb-8be1-73fbae827d7b',
                channelParty: 'y0tnx7h1w76qxw8ql1wva7enl7j8xcqvyughdm1g9szob3vs1y3gl5rtjdinin2mvcjguu1xz4n9dqazd27ljhacfrl1v2qlpbgvo0sz6l7qbaun0ghe169dtxaz5i6ibedbnena27w6x9nplbsrueth0a88g4uw',
                channelComponent: '8q529u1vw9b81zkhkp3zxiqm3holozvsmyvloy5xm9gze91qqknf1yffsbeq44e9hlgmu5exqd98wou8pdnpo9jkk6pumgccb6g94hszy4oezuux5cmlj2slpvmk7m026gwf60rxus2wig7oru4zplmmucrtn626',
                channelName: '834ggsm7lsr465x5b3vl26t3dygleip5najo6cj9iukk89i5a7u4lfejkl1fj8rk6udauxy743wptg41bt84cdo0rn16uc1g3vgdpseqqahxngxdvf0y4qr0s1eu85c6ll3v25u26d123xs2j31ir83d51g4jc35',
                flowHash: '1984p276vlv99pwsvfhoj0i6sq7ifwpzwvjokmbz',
                flowParty: '1f0g0nqpg6phvhmvo0uvr2o0337rv3b23v2sr5vkche2kkqkjec15n9dg2p4z9ysyhs9nlt0ins28nftsc04pmcvjsmpi6jm2283taozjtm90oy4vgcstgqtht1xc5bzyrnwrdzod0w4h4zjvv0lne11l34z2ac9',
                flowComponent: '8o58ydk6c8jveaib13etefijrk3fy5iqy3y2els1syp3pkm79juu0ba3kumn2sigcgu9wsy6kolllc0m1gnyrkbq4ixlymy9ag8unvz4t7fsa86jwuka2nkltdp18dcvffwo35t3tgrmi8td61onthrs8caftrvg',
                flowInterfaceName: 'nsy5473e4pnxf7wmje0emunlfl7yg0zqastg613uwhb9654f8xv2y47jc00x5n17d8ybi8grtlxki92fj6w2v1q2ktamnj9yzj8g7a6p00tfni0om2ynvn1s9pu8xcxzlkglhyyw1xs9a7wae80j0yi2yozniqaf',
                flowInterfaceNamespace: 'stba34uhh7znmz0xrrpsafz88hdypcjzepjzod4lmhfood2o4si35ywr1vjejz19r7eij1xvxg7oosaxsyeqj7p3iw1uqtrf2guebo8pdyexs0c6rokc8eqsdbzewfxp1ns9r70c8detk7wlgaqiobrkeyyvgsdp',
                version: '2krs93a8i8y1gb92th6o',
                parameterGroup: 'vigp4fvia9es23w0egojkeq7i98aj98ko1xuwtt1m0jeicak973jwhxlll06k5lvac7luypkm58kuxfr5maou5ehesr4stuhrbtf5fzytacmp5aveeh2at9je8hg81p76ejbcnzxtnqomuhr8japkg9x1gdcmmhurz0qlzsabe1oyg5ef20v2l4h322zwchhrrelb4x4s6kzse6feu59uvkr5nd96ymb022u1d9ml7rnk60fxeu0x5xzmfs98v1',
                name: 'c3ym704vryry1fb5ycmhl6xz69baxqyaz000sibph0qi3xyn8z8748c89tq63l0jowfnrsk0zwi7fxaafhg7w6b7w5dzq14suhm8hf0qnd65zz0nj2mq2j7z9piipp3sh4or2ho7u1ncnbz8nh5mcy5qmto12y43nzq1k0dazqtixsdp98sad40wcum6j9aqyp07oh9bg7kufr7op1ho928fm8psk335y9jnnjkv58zorfjt7skew5n6r83zc14vuyqiibmflmmucdd6hghg4elr6on1yayugr172hcujypkyfsjasbvof1a8q4e0842',
                parameterName: 'bq6diej6mrbcb260n23ee3rhppfgy1x881c0u0wmk8mu0wcf7wd0q47u2cmhgdphnjd6677m5s62xk6x3ofolmy3yglfvm5z0kfq37oa78plf40m5qdetdwtvh44vbjco8hij4igk5awf1kxggulcbjobh174a55w88heqwqe4tlse2pda4i4bn563xnvvmbgp68cuk6jhv9svngm6akytmj9tl6e1azgp0k2mtxepts5taa3yvcz8yywr785jay0kluig03wble3aqu1oy4rky330vihpcc07vf5nnc3gdddhwnq984cj2nw678g2kj',
                parameterValue: 'izqkk5h7g47jb3eu57kbpqylxy1qn553z41zxza5tv9qdry97xu7xtacqtxewipl0sc5ihyu74aedoknfloy1ecxge8d6lgpi62drilch8ha7duonamty95szl5tjcog2992xw8eq7mfwmwks44o5rjstv1403eglv5gw6v1d7a7ifb78wf6x35r0xxugm1w1e8hmcbv1v0nv9ktozmxav9724vq44xiog7l0sofl11wxcqnsu0ail9pe0k2t5ui5f7vh33ryge8pdfuxmrj6qrgemf699uldouxucabxlvgt7w03eh3lw12aayvt9j8g42u1spx6x4u5hmj950qkwi7a82rg5wkf6fqkb34xms15sqaq8aepmthxcz13vdarzlofhmsksxoma3azh84ohm51vfm77h569ofrl0tlvwxkrj3n3fc7fycn5qnt2i2zpmyfdvjq1f1jk3q3f1cwewu5jvraemclgyqbmip2397qtpa95dh3sqwr5ztmnp05k7tpatpo6boi9cqwa3tn5ur2o6mmqodcnwjl6w8l2detl39q1dk9enre3on2an7b94e3z1wlzt6b55pw9rdj3w7x0frfxwww5o1ifxj94g5r6u2rwvpmalot9dj65vw3dwe4skqt2uqqmzdzng17mq2h7bxohjgpjd0d9qtejs8tjurbwn532y8bpd0o1coxz83297fw9oe7svwnn89kjx8txhxjg7gahywbpsbclyjt20a5age7cf0r1wwgndvktwc0aoqm2zhq048lwjymbl0ue0q5ttj374n9oo0xrxqvyln6l00r1d96j72ayoq456r94f8hzo70qpcjo2okkahcmjrrbafz0dgb00apw1uo0emcslseum0v0f7pv7og0asxfngk55557kqk1vtrxsrx9jwp2q9zfwqtm18q1qpgxuzrh178kam5t7db20dhnt3b7yhraoyygbs8xxvovvzcverf00lryxhy0ebfjv0f19qy4giw8d9tac6ekww',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3',
                
                tenantCode: 'qahk8e7nj4yshxi2rp9kcrlgpleio4lbz3hh8c80y37b1qlfkr',
                systemId: '1abcd568-4333-415c-b2d2-66cab2e5f8b2',
                systemName: 'ok88t0k6bxrizxuwt5eu',
                channelId: '084234c9-60f8-4fbb-8be1-73fbae827d7b',
                channelParty: 'ddk8s7hk2guwei7zskbqpviox9qt0zwsoglzs9m9lexkigb2jvpha9zbcwv5w8lby68wbuvhjpxfo6wn62d36cbs5ml0109vr9h77wxh3idlol8dhir4etoz0a4z0je1ft1oxfagjfi3ugk5txe29ozp3z7ah10y',
                channelComponent: 'ebogqvj7ckn08rtht39yrb9aei8mlnsj0fqvu8x7fevl7dqlwfzr4k5n0g0btw2u3uevz1q0i7iewkdn5zouxzojjcg7dqn7zob15tyr20pf8egm814kaf482dcnp6f0f036bryg8e2rv2ontqtpio1kboqzed5n',
                channelName: '2gadzmalfuadsfhm2nez8q02ujux1bch13z661kg4iac11p8jwvvyldgzmxhgvssmm193a9b6zehh5hh4t6yxawt0hxpyeclqx8o3v93nthdinua7poc3p7zi0op1us99shzhbbzyv9d5ferhf6qfv6samjdad0p',
                flowHash: '7rjp1e79aein06ycxnqacrco8y4m216v1gsmaz3d',
                flowParty: 'klmsc85212f0umzcb0a2n25gz9xs9wdpw10li63r8q602p3amf5ugblrr780vuu1aje2yepe0rgj10o5qnb1qxbo6rhq46a1fyhqax5gqkj75v1d7wv4wdvbi3iwqo6wzzgsdwwot7cuysiq3d5lcl1sd71gbt06',
                flowComponent: 'lyrmmqiqj7ppyn8b869lwlfhl224gyvdqk5ku0rp0ep4w7qatfkfxpbnj6o9p1zytpulh2fo4jekcvi65lebqyy1e7b1psd7l1y7fwin20k1kh4pw6vytz71iec6sigvl01afnmfy2xn5qou2gshkadiex8dk1j4',
                flowInterfaceName: 's52pyeyvq26k8u0xsayq3u0j77i2xkz9du0kf4yqpm7etfqsu6cf8ujdgn938lp9knnj2q72xe8wkmfsly4cugvrog65f494mqx2oryxedr2zlpovimqfqx2ukwempszm8k7v48qbr3vwpr8dhx2wb3m2fth2ybg',
                flowInterfaceNamespace: '0ysq5t0nlin9s0e2imy1agldq9dllf7aonshl5gkfbnel2hpr9qxrvizxsdm310y2nalnixykkel3zsbip235ie2dl7mb7bd95m8itz2ke0d0l3zpvh5u78j1juaoqemewznm3k3doayg0djmcbh476mc3g10zca',
                version: 'rrpfrzkctuq00rv9722w',
                parameterGroup: 'km19o879t1g350s5kzfmvnyj416t4g9lv9ih8itm26sexdxhe3gwdm2h1n8929w3afyh35dg320a58sw5yjmdnv92f4pe2rx0hmqrqjh45qqtt079r4xepp53nmqekucvrdy6rvejjhqngcysgx7kd4epovucvetzgmn4pfr4ibfl4lk6ui5c7h3m9dnasl0ymm8q6ofo0lbegv2si4vkdsuuhr95tipgrpes9xqu14ds5ktbkcttuxncc5qbtw',
                name: 'ypkpvvt57nvwk7zb8y5nbfzc1ub03zhjauv3dfnyd8t5vow7nmrhv3mj24km1q1b5nf6avnvz6ia254vjy2az64vqlevbtiaq867putg54ejf1h71h6dbsw7abrm4afcb50bw3i74ipkqyy44bjxy61otjdf36dss1dh10brl7gkmd0y11a6vr7815g0z8relv692ue3wq1ucwfs0j07nwv0asowtr884rs7t4dhw8seed44xwy441m5gyjtqq9gkkctks24gm4k6nfd3umbvuq8a9uurrte1aasygx5rohccnec6otwwokg8rv795h4',
                parameterName: '1iepy6h15d69i2em13q27s7lnbmqlpl4wf1euoe832w1f8dzgyv2eum4oolep81tkk89vkci3pk458wsjcoid88sqtjjsl4fj3pllvwcvm729mpacf183qrh7ia8sctcx5ugdynge2sfw8nip7wu1buqrk1mcum6q5199zjbd4v5wau6pesygk97vk6ofmff2fwtx0gy2pjxmg4qvvuprcnkdcti7bc84du3zkl78m47192uzd8obwyfhdeuiwtaryp94z98jhlv27mshrq0cjq49ibnbu32yl0me62o7c4dp2io16kku32znoidy91q',
                parameterValue: 'pkak78o52x2r9r0x5hgv6gy51ackwzculffzntn1jrwgz30kchu734nmca739104ir64aevc21fwkbysbdksto1pgyvvf4qiyrdpbs69fgvwvzzgnjay0tnd1qkzve4ph9l8tgsfjgphxaqgejbgjb4wxnx5f55b1ia70bltvv8euycads1nroihkrfnffnvja2tf19deppfb1bie1njay527kb39qoewvryn5uyqhnxvynigpu3b9b9mbuhskdhmhvnycjg9akrn3yuupwwao4fss45vocwy6iqlaqq9rc35vclj69x14yce8hh5zacuo6ftwzdf094hzkp0rugp52gwhtem79uo0ze1e8x2kau5wlj82gtrd2dtgyirugmtjn3u8pgqsom1sqkgequi3a1fspy1hf1axqpmp74b6zu7bzjm2lml9ll83bcubcgmsv2lzvy785szo9nrxm26fzrglfunan7mi7hy6li91d3jg00bvfsw5mfidn7hqmghdcg11zgrb8yyicfqpgcg34wixv6zzgg9cd568bb1x02y3ug1eqyz3cph1vzyn3girnci75ke23thhpas43mg8mwjq0hri9umn1fig6dem199rqss9ubvmkv3897t5zgxzfu4trusofv5bkb0d86tv2op2baftp3tuk9k9ixnmk3qgxrft7alhk0v7apqaaj43vuo9vj1g45wvwancb5k2zq8c28flsakfhdice4nml3vnwitqatgmczhk2qfw4k5a4u3ntvrmo3omnjvbcsdeyjv9vka4ub5y8775a2ahgu934b4pqhnng2zdvaqlfexgj9c53hbaw23ns39r73ndpjg5w5c2vpr6bcrqydwgvjakbod65rry1bb6ewuvntgs2k80d7zmafulgtzuur1ew5zbfcfkwx3jlwhjy3z2ahk41i081re7fw7ir20oe5yzydyp4gx9kgxo9els7gaj4c8egnw1xxxrt2naxe1rvgjc3hgths85alzwpjdr3f',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3',
                tenantId: '1787f2da-553b-478a-a053-4391096a0367',
                tenantCode: null,
                systemId: '1abcd568-4333-415c-b2d2-66cab2e5f8b2',
                systemName: '141o1egakqzzoopg9f09',
                channelId: '084234c9-60f8-4fbb-8be1-73fbae827d7b',
                channelParty: 'n8sfj0ur3j555nwesekdpen369axngglmgc8235adpwtytgpdl2pikwubg43i0p8sfe4qw8ditcgg152p60piusdflz2yn965605tfs1kver6wkhdxz81do7h6d4himqjd2bvzy3zadmhjy802axnjztmyhgr3qi',
                channelComponent: '08xgs9zx36hholjohwg5gvea7eue94s30mwvo0764rrlnaj5y80ul6jmfnw2mb7w774a1kxpg12ggdtzx417sduemm267jtnc0nzym6v90447jv57w5jcxm7snb7icqr1db8gos6nx67adbh1ual2h8kef4jm061',
                channelName: 'p299idi7ixd32ayz7du54z94lqxref24hqrkqquae5n8ler7ytc4p9hfsul780a7tuk1q2hm16n23k036ih2890oons61pp2t8es8bwrdk1h05pk9wkqbwkwmcq1j2if3gdftrsuma7sbtfbcccp0ba84fwy5829',
                flowHash: 't1v6g4ltunveggvcx05fdrt65ftuu3c49cnjk2nj',
                flowParty: '7pxt9avipq5nt5en8rqszsf9q66hyhdxgsu5o6tgcbkslk48jnwzd8zaugtiym5e7psotrxbchm6h6tjl7mnj5ob19rr8jyd5zu6wksyraqqkih28zb9gikzsodud6bqtaamflwcmc4d7yp2rgp4g0c7agz1wkrv',
                flowComponent: 'q9mrgwl8p4a6wd074zthdvq7ndvhl35eqc9n6a5fks1u4ohgksnca138xvgmif5z34e4l7gwj9fg4e2gp46cpj1ooqppepuuzkcohd6slgjfdnyvdsqnfo6bufwbha10lvb3wace6zhum95ga9563jzinjhbzwt5',
                flowInterfaceName: 'kanzqd7wjwv9pat5k1b2hh04rfbs3n9a8z4ck1ewa4jmbvvxykreyue1a9ti1wez886jv76y6q0uadri544grdwva25iv9x3isu7tap9yvu3xcnulmea1p5sdzzyr9smeprj4ngwz7n9zobrzb2gyc521x3sgody',
                flowInterfaceNamespace: 'ufzzh9g2n4fup0tz865cyy5r816dfppelds5qbc8bykvotlx6tw37xolimtz4xcb57bve4mlf5p9zz9n9srz7lpk2pinvgt66hkwf7tubj8q3lbcylwev3g6vgcqx0txelt8pwrrgpbmq0cyxvroqzx36v03ngiu',
                version: '3l3jb7f0mav2kz0x3goe',
                parameterGroup: '6v85sntrltrpkbxms6q08uowrr3i7b794sfw5jjq2l6lv591trf0zkr5fs71nd8y32j4ey3af2qdrgr3kaevbdv9ykr7dw5088vedhh18ag4oz2b6dgollddf0jmkjh2tra7rvlgcex4iyw2prahdz3w4so0ubgkss7ab0umi3yire9e0dk3snx1kvtyx74k9oi614ax8iq3brv1d81odk83n3bkumpbgt1lv7hykzb7l3dj5pc15iton3f1t5c',
                name: '7vd0ekodw68hh4it2w1e0v5h3x7z9fmgmtvq8pyog60zj1wqplzewwdoybrddrgtba6xwdvalpavu0pvd5mr2klz7divyivj68k1e091rquxfvrm8lt3bt2in1x8eds7ob72o3w725cenbe2y146f0bk9it5l5a0a1ecvx20ttx7yah17s66bxyk8wk8vpg5zyv0kxemycp8cirqq9blom2y8gzy0ca4z69wukzvv09t0ah16319byrtcq1uufxsco0z1ssqeqmgv9ns2iwcp2uwycw242povpzj49s3khhsjypnzhnxa7z3wxh2f40e',
                parameterName: 'iem856p43br3n6wzd8cc0d16wjsncdlrb1xwtsrzb65zamojpqpvumsx89swju8yzpaafeu707s82u5lpyiwkgjgxdxqpajbti6hqo6p5lx70lo0txkk02qdjsowl3vr39kslwvlivvoy3b7rdujkbqs7ztv35mkied1rgflmjvhj0uuf2s7qcsktsfv36ldsebsruiky246esl8b5f1og6eo7im8g10s62t7yswa1p9vd754qx9tszm2lhewmkujhxngu051qyvwlot59upt26yoxy8x9ysjl6knophafhgchzzhafb5oeoe0s6o0c0',
                parameterValue: 'sk7n164kix042vxms0ivrygtlz2suw1j2l3hhte4510h70q4a4a7bl4t7wga2inzxdjorltnrdojolrpjbukyoa81ceu5xoyuxzl0fwnwn8l27hnmkw2uuunqdczd8jeaz1568sqd2d5ua6y5t7wdhzaoe7cpbzr7eaqu4l48eic3jr2ud0e6k71mh3evowhbndxwr3no0eqksrj6uuotmefoqjfly56pjqx4efdvu0mbcldo7ph13go0kjcf0uiboc2wvkhif1x1meus6ug0n2hwinly6amabv90wwtfo0qx9qtn9q62j4tmlwc9nvp95yyg59ttw58336s35q4zclcv7t3gwm63fug0yhvp4w4j3fulxzmq24u92fhyxfzafl53owty1o9pizefv5ss9jmalile0n12unszy4fze7t6pxrf3phpzej1oipcng40d5kjeove08a1hh57zkh8h4jd9rrh6i5zf20xaobvao2eavxjw1kmynsjygxwmrk5v8frw5brkcdpg4uwgfbeavsxi19h5yaj28hz9nfztuzseh1oairwtfz3x7qcuuskrf02cnk6os88gl7gisqzqtx0owogg1dlm1z4bl72kmmmqa7zcgcx2vcw2gi2d6vui4i92gzt25ah7lqz8lqjg4y80o4z451hjyhwsr0j0xf6exn6e7lgbfqeonk31erc0ux9ct506ggmmxnk0x3pd4bsxqnmmwc4vz70bcgodp9rhfus5gh37d6fq4dmjh6gv44e4nrq3xf3bcumnn7y69fet81rw1z3q8m9th4sjd0xzsw5o3xmf0f0wqed3ddsxnzrwerlj7tzj5pwtyiiwy990i527pynzhu1cq2e3ugb5xa40f7kq03vqxid39urkaufqozdznp0pu93wb96cfpiyvert9729axjpz8xyuj8xrmy2hr6ib8iy9npakj4w9rgdljqxz3f2myvy5alynkynpmjhldmp6hav7pofgdx57hz06x0mlbja0xrnb3',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3',
                tenantId: '1787f2da-553b-478a-a053-4391096a0367',
                
                systemId: '1abcd568-4333-415c-b2d2-66cab2e5f8b2',
                systemName: 'x4pk7jtk3cdc0zseooff',
                channelId: '084234c9-60f8-4fbb-8be1-73fbae827d7b',
                channelParty: '84sc6868zy3yd63gkmtrd2e589k88tg8hr393gxzql8ge1mcnwb5gd4kaspz69zeclbwt1thqvc25u5o2fl58wl4bqi3m93nicjmsthzepk8uygur0s5e3lxouie6hs8byjch2xr4w1pxfn33x8jopri1319eabp',
                channelComponent: 'ipsk7h51g0wyqq5yvhbhebeujsmzddfz3nilrntt477difudhvz1xh996iz1jjag20h93xq1tchjwvj9jx4ghfkxplvgjti5wd4vicqn5zbidg9q9vrf7ay6aqxqy2pzttyw6pdxtcssss0t4bubzrhkjzxf5kxt',
                channelName: 'pge27p3vdlfb3xiq9l2e9lpil1o5mg1ffqsksc14ghh7lnueuwmyyv4fhxdm11j2rbf34srka0k7xxo5hywnv14sdp58kiilpc7nn0a1rxn7fn3ee4giyxudscvlchb5bhyech9aoqkqlqnia708n63zcqm3uub6',
                flowHash: '1xqaf8zlr9j09hwkqtv1fad0wth1wulvzd03yowh',
                flowParty: '3q1t4bbsmchwhmusm2f4079uwuaowirglgfz0tm20l8ytm4282x8rd7dn2v2cb3k9fferjylsn8qwhph8o9fndrdxkaa6n46mk8ar0gsh8ok98vtffqtrv6hg7nfetti8kxrzow2ce5t1n0v8ij82746f15hscxh',
                flowComponent: 'udt9gdm9kj98rrf17kmj79ejk79umq1ifkzjzhlqgn8dpxxhk5rpcahov4uomt3pu8b6s1yh2wih19gpguhrsnme5j08dfhvi3wla7vi4vw19vt0xq16idminulp1uw3ffn3ccclfahj76jz3an18g16tbo464me',
                flowInterfaceName: '39diryc71quw5a9pvcfiixnun6lonb0x8fcan1trv8j8qrpnish28gj2ajs3wm3xfjgpg8el7ljezsn12x6kjhz0kqiraewk07jw6vpknv4mhgfmk2wxftxf74yt2nfc1bk8qt3zhsn9ijds68coi3a3fljeepkg',
                flowInterfaceNamespace: 'fwy411dfu0gwllpps3ri0p15hzm8wp840tut4p6gglpew3c34plgyg4869poq428kx9nk9wgy10t4tv9dpt2tqneiykn96jaj8brhrsqakr4wjpgk1q85ynt2nb7550xkh6976jfmap2aguj1434amtt523amlip',
                version: 'n50cig3uno7llzqlrb5c',
                parameterGroup: 'dotwq48ydki9op0e5232wgkgi96qihpyvofk8al1rkc5fwehzrmyl1q1gckuoq1yanpgagzf7adwpugzbs7at83hd4i7io4c96p7dlw14tibng27pchnoaajuk307282h92com76ljxg0zxw378se4468ttmcrv9re2dbe74ri1pvwe7y5vk7def3hxi5dtpgd776gmufo73k1pj9kr7yeo9beiddu8q15z5bl5bx62ejlym9b8efwdh4pf2b2d',
                name: 'hojrzl2fpuzcj9qgdnrwm770xr1e1poyebq9c5kjuymvek6x1mp3fc8vyk0fagouxgevkwgx8ef47d5jea9qnggtv93vju29mvy1bnfkljqoxujl9f6g052urwkg2bgdrju1mzuhg912twermyrlsgzsr981ana6rnfiyw33e0de637zngto97vdgwrajwh4sn8paqj7pp3ykzcgexs4g4qmah935bb7m3etahbeoz2ufikdl5gttckpf6cs0cly1ywksfiua8t7z0284fa4zb81vpvz32nmre6euu4crtbtu5tndsh7r7sul1rg1124',
                parameterName: 'do0rb910l0do2kq44gdjkp13fzzgs0zaylctjf5xprbcn9xdij7lmtbpupko0otoht6f1vh6tbc5heecpsjvq1fa0afrdbk7uj1berxu7b6z3i3mrkyqwb0mhz389tfjdcp3tf7jjsuy1v5698um44ze5n5enmqiaq1nwsla1anuqrgw90ntvgobx0303g4crn6g7jj9v26hb2hzhdl2ihajxegt932hywig7mlaclpyw00ktlrxs41w7in117pqtbobswnj3baqfn59vhar1yy0kxpicwjojxxs45r939bam4dkb7pdg4mhbf0yzht7',
                parameterValue: 'h3nefxlsjjfhh5e4ez7k3lqu594avehpp40ji5q25ivoh0reas0hw91msptniaa6d03od8s94od1we17uyv1uoejkxwfv3tii6f2v5ltdc2oxrl7p4x1ugbb0krrllj85c9d6c0rpx9f8h4vp2fizt182rw9ywlz2znqgs6e5vgqxw0ehnl984tuyg198yoggzh55p9kln8myd4zqb5bxkeanu909f3i4lw5j0lqwxkd30lzt24esdv76cyry55x735i3va325x65smqwylouiyydf22j07czwj4i7oirv84wbsyoo746viwtj997pgd0s4n0stcdu5eknirt2rd76xglv8z6re2rr6jghko17dmlj75pnvc2cu46cdgq2e9oqtw6b8c71tgnvhyh6twtv475rf2g7ch71gzthhj2hmmp462h7m2kvswr3y4yjq470bwohb80qete9xb8z97ysrvf2iwkxywkgv33skyltfp1jaix3vjl8istizp2hetz80bk30f55fdy9hv3fmz85wqpq15e26oyixkx4sos56cd6gwl208vn0aas0eso716nhog7cpbhzlnwyn2byo4sotterbbqvj3x5i2v48juwtjk0bpcmvgdjl0w6kipv6ql8o1fokkgt7qzrhau67db8kkw1es3jqctf40erwi3k3qljk5e4iqtz4bopium9dxhgb24mwvvy6nt5ixydfftldc6lwm3gihqj9rvrrbga6zj31xif9be2bw6sz52gzat98dsoz7cbc89c4yav91cza0fqsnwlez2wt9pj4jph3wtv8iqf6tqwdc01y7ooz8386ox02508fa0l69ny9dx4jlakwdowfvcodpm5mzh7ovlrjsqksgqpm7keb9oirstsga0wmx4vxzvah9olx9bwijds8kubpp1n9xiusliupstj7b52876qzg7cv7qjr821v9d16nbj4vjcw65wkl7am5o2qw7guuq753eyi9s83b1u4uuzidy288j9pgery',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3',
                tenantId: '1787f2da-553b-478a-a053-4391096a0367',
                tenantCode: 'zcl08yxwcg0fq5f4le8rh9bs2wti447xn7eng0tktba7y2y71l',
                systemId: null,
                systemName: 'fdm0dscl1ankqar1gk0i',
                channelId: '084234c9-60f8-4fbb-8be1-73fbae827d7b',
                channelParty: '8r7tkof7oqvt919lkbwethtr1fdxr1ueufxnl2rlifxkbkcr0cz546puuk7x3nd51j3fy9jh51u981x8yzw85tzw4h4tbrkg9855if7h1jeslhtp87wzxwxjzyftbitqzp2nbks2io98i8e5o494nrr2x448m5b2',
                channelComponent: 'e6w3ly63asjgom88tkkd8y10xudi8zntivet9of5b09o5cdape8drkdav7408c3wpt3mis67xmrl2omwcvkypjz5stpsv1lnl34xrgyy8n8vkn93alaf2msodgfol4dak0rt0zh84djqftwi0x8mr0nuufqgqcea',
                channelName: 't3phs6qb2g7e9lhqfcxiefazz8e8k0a3zu363hvnl4g28g691lcjmude8b8zth1lygvqkq2vq3jxr7mwfgsrqjvbnfbhbq617qyql6egxcha0krofibn28uw5w2fyyd4s4rflrcfdw192j054shfl0uo8igu3uey',
                flowHash: 'eibonw8opzhy3bsty1qssdtt6ez0s9fdsluugkrz',
                flowParty: 'icwxnu3zfontahmfnx127nslfzih41twn27cfvygykwn1qkp1pjiwzy0vr8pk8jqadn8l0rqzzxxmxnqmica477vsgx84gzjgzchafd0skj2y2zxy0ctvojkuuaancckwuimwnflfcedmcp3r1wdie7gvlhfym1q',
                flowComponent: 'q0kr9d9ckivt9x6fm5lemx6omd35rgkk4ta1g8s301ukmjo9uhh6upl7pznonjq2mnxo4jke5n3961e1hjukria2pddktpbq280un232jsjztcsj991g3j3184hjrsbcqnvsre6ngyvnz4ci37275okkyo9zbes6',
                flowInterfaceName: 'per26kcxomqw053xats49lgyyb3zcd6oj6wq35upmzmjuqiyss8gjq5tu45vfdybb9fobxsxwxzsyg9ceg5qupc7ujuvpztmwrsftggz8bf90db5lnutf58lirxrsi3qlasei9tl5jxpsaxqja0dfvutkqqtrugi',
                flowInterfaceNamespace: 'zte62s4z6vag1jmpmfavethclo8ihj0o1q2zu2hk8c0mzefhdkb5ma15v2sodce7l69hlfvpg43ylvnkl713w4ai989yaniun7xyorsudwyetkn0838tbaimzw7ri5r1dtoud1d3ehqfyn40qs4k79u57hmduked',
                version: '2uwmquj1dr8hasswq6eh',
                parameterGroup: 'd266rd548feiyvf0om3347fxyfr81qfrhqt2ubpz2rv8ntwkkdx2xuluzym6btocrrifujswz46tkuu23ebp24szrm38vk43ee2241nlq1w2k8ujwl2kv82k9900x8ngojua1l1cc38oneu06rxiwdvqar6jozmcivjkgp6brny2ce1zljseg7g9d43g80t3nvj2acn4v7npxwaxzzcvgid2dt93jrucwtl2kklxbcypcg1ldfou3t9fdzxwqdb',
                name: 'n6iyy86vvsefy0vynky748gnyjg1iqaizbd3cwbwuynciv2s1alc6jjvo851v7rp8flvuukrp2sikmzvbs3673s1frkl95eghbewlyb1qoe2qx4s0gqcsgd26814vc6hjpmhknnykwzy1b5z0oayj61bjvorkc3vs5ibex1js6w1gt8suvdpbf9xxuqofd93g9tnhupw2jvjperbq9apcto4k6c1wkih423iwh8ye18n2piu9uzeelw042na93630ch34p893qay1ifgf657zcostilwqmrsuse6j5guqmfc9u31xfrzg0gy2jsdhkhc',
                parameterName: 'mdtgl6w1t897p19mr0y62bmsnhon3rst49gsdv540tlwbulasrauqzwe94m1wzhzta53tipll59xb58nrve9o0nxaochpq2ua57dmuzt3wxc6vr2u287tnhy9j30cn7kwv084kjxgfqnb4l9a0nzl56hd8rm37fm07laq9h0u9fp41nyf7kfrb19vo3r9ikw7u5vhoh453r8vtaqqwvpresse4eckrzr31tqpgeefuo1ej1cta80penim3nawy611aurmkwkk37my87x3p6ehme05gs47nfsbwamocbue8sp18optvs4aipw6y8kwg8c',
                parameterValue: 'c97fg7edgx9gou4nm9h3i93usvq4zzn03cfv887ylrhvm5ol4fasmdczp3a5oedwtj8o2dsjgzpiza2vbc2r7iyh0junnpfaigeej8r02mjixiduhqtlgfpbwmc6277yd0vpdpmlcxuej7zfcptopbeotcbnr6h0xa5s3d468cbazdhj677umfsvoz0swabmsexttr8bpqs9pk1w0tnmg4sbx4x6r242kw2gpihcw140nm6eem8emjfxd4oafhu3expjm8hpbvwrljgno7tm4ob9fij7a0tsmm34i1ouofipnryearpovrgv0619lwjjem5ay77s0p73weccg88zn19f1xre6553caqy9yr6y89e3kf5z52pbcl8az3bx2m54kfbh0itn922m6vzbn0q8bdh7x79scxt2g5qwihjnw50yt5ci2b083fa8j40rc92yco5y8u81ukzmf0x0emenzcu7dog8d9jqg221lv2fybjlz2y2fgwavjj66g2ja9iyl37s5314hz419jf9wv140nzqu3890nuh1rucklrcp202t4r6mmzgzqpqzm6n0cwmkmhpa0orwqa8axt00729sjnni462wdxsq8al4djmw9vnd1cl68ao9kk8mypx0yqsg81yhb7lmtnvxtj9leprtkcnn9i91xgwa36e4mw7fzr99zvaux5za9s8ma4nekbck6ozh0nrc7167l7lv250fqnanue2c2guwp936v2qqxxmdmwahv93dh4ulpm9ajoa9lf9bviigi1z33c2siabpmghoif62ii9aclg0bcwkt3at3prinkzzajgspqt4ydm857ss43l296ogao7jkddhrgpesflo3yt9qfrwuzrf2ywtyo880bc5qlbumnrwl544gasju7jg013v8wdddemby1upo06gbctifmy6b4x1q0xbovdj4efk7962747kos0ox7bf6mgg2eg29o3jzayizdblh5ioc4b78cyumfehm3a7f71f0yrsd9lwbsq4cy',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3',
                tenantId: '1787f2da-553b-478a-a053-4391096a0367',
                tenantCode: 'myx9kw2kf2tere89xgkunt8sop2gx8dg035svudepy6m8vz9qa',
                
                systemName: 'o7ida7spzqa4qy8gqrhx',
                channelId: '084234c9-60f8-4fbb-8be1-73fbae827d7b',
                channelParty: 'bhu0lfl4t2vxi2if4w9es5kywpvjd4j1bo4bow1cnrkgi35jf2upg2dckemsoy4z4jj4u8qhbwzsn3csh2aplqjtp71pinu55ow00d4j54h11olj9rctuyxy6m5ael0g1g77f7oqafynyh19yooogdybloeyjw3e',
                channelComponent: 'uzvtyq3cmt1x6bauspvfp6wjoymhp2wzm0nh4ckl2cdwv534qt3ix67usn7z4vmsautl1xqsfgokrc9qhrk6p1ourrax33als77vq67xfwg7xwgpqau5j4i8gsmcunx4k96sp1u86xd1zaqigpcs2s7f22jp2yef',
                channelName: 'u9z8dioglnut4zbzvl9mf2j4wf6c8c7ncz2sbcl0kruhpidbhc7m9cqsoqy9th7vepxdb0hr9ixj7pr561zw5j3639khteyllq2ndmpc1e98xiymvuivz5dbpxl7fdw9ldevrllsw40c66pbsps4tnpvbmkofoci',
                flowHash: 'pmh4h4zmra8p34q4xm3g7wf6xbxd6y232c7htfxf',
                flowParty: '4zglf00zpkdaepj5a1xic7y8pcvod82rh9xnrwuho778zqxgtj23gjnjk55xoq2e05onoqca6d5t0lndyzqozu44t44389lrm6zpteyxhk0z69jjp7hui47kshzhgzrikfz8wpccf09dj3uuvybkma1ho2a2fnav',
                flowComponent: '1wlf37e60rx8k0i1meefd84in5bm71l15813k7z5uqmog8ylkxrdbdajfjjwe5wp6qkamu97a8g0p7wzwy86jv39iuytfjyedilkkmse7vrctc8ezz2k5yt72yta91abju3fx2hxelzi74ibqlc61k23izrc5k3s',
                flowInterfaceName: 'gdd2ucnzck3dil72m2kotdw22wt87irnptd2vuzmz2wzr7a6n3tf7jf78hre5cdiwmzddzlfxqoaaqjysk5e245ykiat079rfaxqi9sd37psgtftbpybx1dwk1odnrp0b8fcsir0f9wobph4unb25k13b62zt3fz',
                flowInterfaceNamespace: '85cz3vgz4bvl2m12o379btqtlgq5dc6kzd6jrgu07pnodylmv3pchy7aya4qbet9th5iagnigf39ksisym74rl530qjaxzl8uvdj4rb1fmfk4j9nhmq9497mpxunkvzqd2288gwdr63dg1ajuxkexpo7rendix0m',
                version: 'pf7c8u77l4l7my3fftl2',
                parameterGroup: '7b42b4hfzuxwyzpozqcttuip9lw0y1nyqpnlficceswz8n8fl928pcvbutlwc9x3oftcdmamob1g9z9ck7wgztqq7m6prgcpj2ofusb1tab6egqgv4itmtefi9f1n5jnk0wrdb60ts9m5y6x4za851dqn5q1tbzzus96iq0cpjmmi0cqbwf9no0r076ce8au20oxwgtn2s40t5x5cgk7mvwhda3qm0ee9n9pp5rq5r76ikd5uoedn6sec2yrs7e',
                name: 'dmpqpyx2lsg4pqdj99rb9l3625w5pbmx6vfies1ks6ahpbzxqhesxqnzjcx1w2t7krygyb93bs1qfdn0wrqsnwyswc9iooo79itjvkc6c0toq528mxe50ljcs5qr6pto8eypc5jkyunimjw1gqyyiawvs03oit8ipw1uqns7gu3cd5f454qzfyox4lux9sajcfqag2px1qxgxe7qm51izazgioa8lh9oyg43nm84hm9l2p246j40teehy2vma1fft1kzpclkea965o143n48zvzlb97ibx30z8pp4i70cwdv28ljpik3kpn6lofzstl7',
                parameterName: '5lgmv7smalzh42dag6si2k2h1m3mg9q0hpzy4a8qpoex83u64u53nmjlo9x144kf0945owtvejfly9w7zn6c8c796pb27eh9hr31i445enzqwdmhuzeegw07sam9g8uovdphkiyz53zv5o6jsjrb58owzzz1tzkvhm8ardyiomcixbeebw26i5c87ae9wzajqp632o6v16macmutd90xikzvaqxcyy2kyzm6ufq28pojup2t2235jr1bzpr36shqw8oc6db1kp0fzbtv703qi414bkqwbsjlsg303iuqulowk91i21ua40ackcwrmi8v',
                parameterValue: 'konjmcp1nb48jmn2n3441mvhiqsgne39y3c46ediu3bhkrn3fgcqcmh3tln9mfglktpqmyd6inw783laxqtrr84d2c0zl9l08vyoq0vwvxuadsuqghakrxivrt8vp67femhcs7afpxtxpq108uevgullwtbjo2px5fnols3i9pzjanx615ykxzhunvut8vlfc5ulk7chr2p8kdxnq5w6rjo5c2suozz3myiet4z8hhiappoon5e4rjp5k61w26l6lfffzharqnsjeaiky5e87gvs3wcdiyey4wekx6iaw2ufhzbsswjo4q4brnkm706omugpt9yc0ztaqx2y0cxftngiye4cihwydx7xnxtnthsjchknb3qamh0hwjpxphtchif6bfsdgz77ut2pdxaemosd25c0yfmq76ms2r7tt88hcmzh69n9uwyx3sio04ob4vtpyrldu6e0b68ox9gnq22onehe2m3jxheh2dv2lwvk83sb7lyb78e7su9ydzy86p6vv5liuwfbb8622a6ezpvu3g0j891k45wtabp3dei0fvamrzmxa5seln0fkamjew0lzcb27z09whw5nthq7qhlihrcd3cdt0627prz98egwiapsb0xvin2u795c4fn2t6vpbxh3owlkz9uhj75q7mctcsr4ghwu0bdd2ef1v4bcn7hg3dpdrse0v4yx37w134r3wunhogv2tnmff5yf5vmuqw030ajivmtb21gnm9aa0ld5ngnpslbgmxdbs849z8is6uj9phqzs3klb1vtstyslm91eyy0k56f770tobafde6cgfizekjl64343vre6umdcmue778ue8vimr1197h3tpe5s9jlbssezlpx0qybn1n599zyw10yu9bvkvld6tznxi9pgoswbk4sqh59234w8tawfuzant1r2ekffjho79cgwybk0ukuxn7rpcurq2x9do2rvphkdr5lheati1sy1h8pqvxr59k7i62m6qxl7mdnme2uud7493eqil6',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3',
                tenantId: '1787f2da-553b-478a-a053-4391096a0367',
                tenantCode: '2z0st5cc3a2ri16w6yjd43zk76vc6m95zshwg80jdz6q7pn5p4',
                systemId: '1abcd568-4333-415c-b2d2-66cab2e5f8b2',
                systemName: null,
                channelId: '084234c9-60f8-4fbb-8be1-73fbae827d7b',
                channelParty: 'axy3vbzgm70hs222fou7igec8c48ic3vxdzb7n24ndfpevdevh9vxrbk5w1szlq80cunagxolc7dyymu7tkjxzmiud607355m6ulmycbdn3nzv2hbphib7q287dl2dcdscta3mtt9wuqoy7lxr5ihfgysp7pk0vx',
                channelComponent: '3mqdh8i0hkbcdaht6az5k8f5u4r2ufqtkvaednu2yusncu36h90l3qy22kdcoagnjk0kdai7l9g3iz5svtjw6rbpefe3d80mybf7ghmxs9qprlfgyb59byd1y30s17qry7bqfe63h6hfz41cyw5u5ejjuw48zxd6',
                channelName: 'skuelcofa47m23z49vno9jkewjl6rl1rt7kqftfsdi82tfxnd6xmvvu3qqxp26f3mq75nl3vqi3gbwd1zxhofqnrrbcycytx98d1wlf0m8iz05g5vvs3gtni7k27jp69d2ogmocu87t2ohyypmsiqn8yu2p9dusm',
                flowHash: 'r9vayapokoj0skkrh31nr0o5amwks62vweipucqa',
                flowParty: 'f6s7380w9vm93vzyolstuopemwwefrd0dds223ehc3nxvct6w90py6jqqirc33gz6iunv2s0qzbbm80dto8npyjayg7w1r1in6ww3xt8sswmmc01wo8ikq0bi0zxx7w4251uacrut9rwk4gocw1ylxsvm17ekue1',
                flowComponent: 'mhiq39monftjurqrsmy9cwvgqkvotvh5f6qwq7z6aej7svxvnviwaostfjkyvz3e5e8n4wo5j83pka129967v4nus98iu2b5kc8l6e1nz0g8g4o1niutkv8kpm4w3mlfw99fpzrmc091v7imsqxt4r2ketaycmay',
                flowInterfaceName: 'dqlbcbgi8fqlb1mbqfkp8ofcm6sisvai9xquskqpvnwl90hf6sty63c3nuuo63f01rmyqehf2gs2m4r03g46be2snuitixhg4ft475xyrgklanwa64czkwq7q1ggj86dm55pn57pn6wdo3gs5o73tn3ofi2ucu8y',
                flowInterfaceNamespace: 'px9vj7gtvjbeu3fehc94lz96bbzgxb9cv0v43xstmndi0t7m1ttu1i1xp2lcwcq3gxyfwsr9hkqkajts0mmjms741yteo5lgvu2mhtiti3oq9ngaiwfrlybfo3wkifxszylre8bgqmelop97nm6hzt3g6137duzd',
                version: 'okm3vu8ak7bbqctpzi4q',
                parameterGroup: 'ogp5c45rx4nm6n9f57d59aoill5zxson0bcm9u6m5n7qrquq8j83uxni1exid2mesop6zblvgp5ntmkmwq5ofbqmmsf0iphke5e8mlhbjei3u2bxq61e1gv16f72fw4kz99dqt29pb54hq0fludyyg0ey6b5rfj4ysymunyo7vqw1ldvzuk3ctir82uucl6x0iuczazxjrbvltg9aovq9oykclogle52h5cmsqzaj41r35a9scxd3t680cakfo3',
                name: 'ufx5zcbrbo4kzgw5pmz71nkcmjsdvm41y4gq6n2pcdm5sz5uuuf1nctfztsto63om8pk25sreer85jzs89bebh30dab22ojnywr6h5gu70bejdaspo1mteagh45vlt1ypjtkk6smnurm6d9ujjux1ng5iyk4t3bmsvl05s88j5xjwvpasr67g5tl8izgsg7ph5plv1fbwgncn7hr5jrm2bf10vs4s92uroimll795jvm15iyb2mu7kqo83tibftawue1mfljrats5kos9z61ot4emu3ct846b5guqn8ezu9jioozdx9i5k28arh0q59a',
                parameterName: '5remay841ju75hc2pisds5rm6j0l4uljr2hg4bdapq62nkbdnymyvjhxv5e04ou9xcxeqerc0n3mxxt4gqap6rjfio0o8kd3p7kw3g9ris6p2ekdlv4cxgd4zepnzgtqm6cyed1onkkbo05g6gmntkxdl19d5tpe6bqfwojwvs3m2orpjisk0b7kx5387ktkpzpsi9dzzim9sp9z97mkt46naxlir88to3frpf6xi6i6mltm1vi2dmvkzldrdqnq9t8n7ew5b4pti2e5op01hrku23k97b429gs2lqx8lregnlf3icvvpgj23knywk9y',
                parameterValue: 'f46bmqeup5tux3jv5nf14i97dtmz985y3dq8thxf9rqbc0yjxxa9ulrr3jp2nb9jmubnrjg3gala2ti3zvh3eckjpfeprvceom2ks56ggpgtuz3hw7irvjfv1njwcdkiplxp2onoqhzoqcg9dubhnmci3f3ghkekn457zn0wsapnluleagouddueus198ay07sl5j1824svzdc72uhpqedsctaqt4suhj1c0l7qf217x3zj3h5uv5n2xzmncu3mkd11xovky870h955sfv1lh82359qm0s5ehr5lm7yklu37wy2d16plu69vjstnrmlh20qzmj23jgra6g4x7c09tlvg0a14zfq9y7t37lqp66k20edg08agvnhljsa9c931nlxnna8smpcsdcwtv7ofmjf9ieou9gd0d62osio2tks1kzippmy81rj7cxcoyyx16v8g0fevrjmzfxmmxbsuksa9wmv8p30v2e2t4dkpxou6aldwgqhcxmbcexhtdng58sov5a5ksp6ctsfv4xlxg9ys5q7v5y6lv11si746ikwz1h73o9s08piwh533ptqlbjszntazg6dajva15xowzde32qxpz4vedhgm37irm507lxipvgwn85o5e0po2vcizwc6xax12v9k22ge62xqiqd5wp8t8d72jzo6jcfhtex2wei7x55xe3gq41t0uovu8wojhmx8qg1ykazbx29dz6wjr6ba5rom0ut39kyqt8ux0t6glwf5vrx55tbfplvsuhwq9fbo1nxezkza4q36lo8g9zax2i8cdkonp7aeqxq64brtizely6cqm9pjbt1lwzbdc3izlfyig3hqgwtpabbuogss4rw9fua73dt5cyourojxc27vxzcefyqapdbt7wd08b639cu8sjybgyi3xc7dp89e94yp7lzayd25g0c67pkqly4sm0br3r84gba6rtkfs07l6q3ngtslhf3sxdnn90zrdan1jeljdqlzrvdwk2vcrqjfdtix4rqgpx0k',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3',
                tenantId: '1787f2da-553b-478a-a053-4391096a0367',
                tenantCode: '4712o3ikhxlb4dvxamc5c6d18iq3vekqmm8lg3wv7gmwfcb7iv',
                systemId: '1abcd568-4333-415c-b2d2-66cab2e5f8b2',
                
                channelId: '084234c9-60f8-4fbb-8be1-73fbae827d7b',
                channelParty: 'lgnli0jwtrv1ixahpwn9efiii9fgxe89bhotcy7vdbqn5fdj7vkwk47hk0xuxero3ffvq2p2zkookhjt96ljhjlyc0kcbu24ocyryx6q6r2yzg79ucg0yogof2wrbeenjn9fdh5ydiayfgxdyzjcufbaqb3wolj0',
                channelComponent: 'qu1xogktihsvliq7s3t9jpjg8jj33wedh6htf4auuy96vim44h3r6eua25xumw9ti7pvpqyok87eekum9ev91rnqfwod4yetg5kqwzzf3b9yh0wgntr95c6wwzs8d73lwfpz2n8ypiyc2vmut1w82bhfltfw0d96',
                channelName: 'abrw1n563gfi7b3uk3vuks1k4157a0z6k0t4reipya48waqfkhvmxex5f1xehi1jc3e540lsxxxz4va1wurex0rd0826mpizsfboircvznyu5copv7kupt86n2g8hed2i00qgvn1i300vi254hwgb61zcj5h893d',
                flowHash: 'ay87723uythr228j7nppmyoewiemdf9q4s9e8u51',
                flowParty: '94hbkodtydozo5113acwmtwxv62exp9555yeue18608d4to8zfhuhslcem68s63b9mm4rodrndrrt1pj8h4jtatvd91b7uee4qk0siuz8hdd8qzyko1euxamcigsj6iex51x5ckquywceed8rj3s00qt2o372dk4',
                flowComponent: 'x1m50ffxsn71hnpxrjl6g4swrd6kg7mu8p4sp8kqy5l6rgapsobnup9dbcwr5dsxsn8djhm90w83l42fwxsc66f6wk2djpgvnj6u16gx2eaf2u4v0mx4ze46mujw282cyzmeuzqs5clla18854t54z1b1vx2zddb',
                flowInterfaceName: 'ag588jzz4i4va9hp9rtvgsgxmfld3spy8l1cvbkie4k4psaf6om1t973w1v6zfqqyhqzsj96v0zrfrzelfh35wl6e0t2c8672428m0gbkyk68lwvasi7vz6yxnlkfpgkixi3kucja8wjyiuygb3k6hg5gma17acf',
                flowInterfaceNamespace: 'g1qsnpif89vfnmjahryv3ck5gl4ga4k638sz3omhhb23wbmw6v1zh68c929i9g0dbhhyocwwal3iiqmccre08ga3newbb6h103i34ztgrkio3whndqs7vkcvuyyw13e7cfpamsu6ig2tvq897vh8ixesml8nl99g',
                version: '3dl1xuagf4an4tkzd09t',
                parameterGroup: 'l045mimok4ctejtpngj53eqbm0c4mgluah91afnjzsr8r35jfbu0xy3f5yyy21fb0vhitu7polzb6xqid8xtmhegp4ugnjsvfxxhdfnnfzl1hu7nb48lwa2icjauq9pyucw04zdw6yn6f6jrbfp9aef45zc5wlfgsaicmtyoz376yme1eby43s8fo6ixa8uh70rs54j0y2qzc08mvop1kmr7f7g6zhmjhwrlpud224wk66u85cr61suaqx3u8py',
                name: 'ug4il8zffc1p46mhhqu4iajjidvfbm4gsa4316f9ybug7qiimym3nt2ysok0r2c0nfhw5iqp5msj6348cqxjqxw90xxkhbo3r03efeftha4incalhcsckixjvliwqxm4m34kg5o9qyhdwu2a6gm3wzl5zgohpgknrge8f3bej3a8j0jvzzwn55islpqie1etrippjlrqijr2yls590c1i265unwpjht86e2d95znxym2mvenhbi3h3fg3shtb4yk6635mmh7nb8gtdyofidhrz2sn3iv8dohp7mjykl08dc6cupj4f4e2mv5ynlwjyzf',
                parameterName: '6pfvnny0n4vcjrz6w48vtgilxv70nisl60jtcjyaz4k0jyj1aierjw6zvtuwxf3hwhwl2y651tp1oh4vxiltx5bkqpgsh93tdpxg1i3xdbd98bnvzuptudbpa2j3cfxiiaepjjq2zwe5qqvzgsfb7i6s93lygmv4vnjbb09i06izejdxufl2zqcjwaru1mrwbkddp30553kr2lix58sj30aj7srpqt1r9le2rtfoubwcgvpsili221cmjv7ntnpukzhubm6ydodxjckotcdaccedd6sfup0dz0l2q6454kvzlvn0qhg173yd7spkw0gg',
                parameterValue: 'nwzvs1udl2hsk34nm4ss06aokduy6o0dbz3fs912rn3n5wmt4z6m7t90ljgeylc4nv5a6q7z9ryfhxs64l8tpq8asexkv7bim5u57i42p8k7cljux6r8p3cq45ja8eqsiql2jcy2ab3oly324oi6mwzkyketvha8h0cmntwm6icp87u872rfej1mrqv5kjvncnnt6f442vcpmpgolhpsiu5votwjh6fgdh146bqkegaa5546jn4f663gkqhf4apvhygbwjnycxf67stypplpdorho3ucayvg3p2clttsxrltn77w98h7q7rl64y5r4w700844hv6n1yh1ghvp92bu0llkm9vuuz0np4zv9bwtjcksing3efzunstgdtqs5qgfoaq2bkl13araah4l6zqrr4aiivcgd68xt5fyvbttqdnznq1ggtch4jaa76gouilh1q7r8x6j0trhmftifv6riv9d032lpl6g0knn0courb2xjcemcwqcwfdpmclsltckscsrq6e8wsm6gmscb4qv9hesdicmrbvi5i9sezexcco35c9qd65znkg5j35bedlo43kly7lr621g1cufgdj0pagtkzjq21yn7zzhnzrgbkib3deljr4zp8zaeoltmgi2f6k2lbxjg7aogle1qy08ays7dxibpn6lgld3we1x5ymcvs5b3xhrniadenztfn5exc3yaun53sz5rdisdwtzwig7hmds9cd9wemrl51s7pgwzmszvgjnhtxm7o9zwnpj6w4453j2mvri71dcl4jf4099b851ngd35oyw8xp0qfsddqj2zs8e2ay3lgmsnchp8h2mda7rgncv04htz832kqwwnrd925v38jon4hwzxohwuw0zv7y47f3b0crgba7r9tyr9nvzpbfk7sfetn4jd1vqbemn5fa986wgqkv50pv4w9ml96e5xxcsaosro28r7izewhgoc2n7bdcs7n5isr3rkv4a5snzmw4cp69tbvizpmzn3udck3p9whid3n6',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3',
                tenantId: '1787f2da-553b-478a-a053-4391096a0367',
                tenantCode: 'v2sa35qhxzw447dk95kxymjfm0dey8xx13edpuj151790zzhnh',
                systemId: '1abcd568-4333-415c-b2d2-66cab2e5f8b2',
                systemName: 't92tmttby17uwvk3i5ja',
                channelId: null,
                channelParty: 'mohxcu0k0vmd9fmtfazp5chz0mgdb30jgkf8rgw29fflw4d6cljqzb5jbi0ygo9wtle9jszgaxhm362ob8eie8s7kjg6suxp1s61nx2g1q2pmow5vu5vh7izo41fr5l9gjgs5sop2z2fdpzrhn2mqiw17tk408h7',
                channelComponent: 'th67rpyjakk94cuyzbjbjny451an3ri61kj1kd8wzselfct3kx5bmgkmwd86h006aht4xz3t4g6g63hkkdk0mdpi2rd6revcgqpckut9xdmyq80ad9rf9583lvbwtxyz9rroe0ucwo91u6vjbcbc4zi6xh4pn1or',
                channelName: 'hph5dcpideio7oiiinbfq7trzr6xh5dbgpne4e6t6ok9gsb9by924j0muo6jt2vetvxit0z9jdfo338le9wfce79o6w3xxe1uj35gx1scptnrodzfi8tzg2t0pn403uvzjt35gtd2ag0zg5lldiur3ldpf7ukkj3',
                flowHash: 'g3y6urc6d2syzhlh5nmlenh3x21vo6qcz0fkn141',
                flowParty: 'tcagaknpmo7yh9a20if0u1os0nz7llqlkn8h37yy7e23lm6yow8bl4l9bm773a1iu652655n57h6ajrsf27gxhy56fhizr2yb9aw98mwlzxehykykzzif9jijufpcxaiavbj6npe91ihv96naswtsr39h5q29fc2',
                flowComponent: '14qmhdb82ymvqe34vly0sflafn3rzf8cc1nf1rzmkv8s9q5st24szdgreyiosmf64lg3724bg93hc8mcdxzb84bgql69lgitbquqfkif7z0fnw7us5h5bcnhsr21xmzmel0cxpo3jc87n9f6pwckb80013f10907',
                flowInterfaceName: '9zkpabjpexkzsmfmzw68ua8udw29l9np1cicnssar0whyevbgrwjrc3e77l2ic092uqy4mrb97totgxcp3cy2ixbgxqwghxfb859o18y9gfq21ufgv1ozeksyfeb94t1f6lhvcdt15e3ofm64z0fu8pe6vpeqg4a',
                flowInterfaceNamespace: 'dym831uh9pevv2h3uveumrei7rhd9048r8vazjffwgjerw2g45ir7r2gv04i58ize891scpcqopijzeqwxvqnuf91p75463gmdorvlh5g3a9tsbukgj7pj0lqex3arnk2gm93ib9iufu8n4kupg6fo0es95r6b24',
                version: 'rist4i7kgh0midv8706q',
                parameterGroup: '1nv9nytpc4wanqiaqh41lx02dj7fzwmr2919t1tlyko16gdqlrpdkm7pp3f1ue54xxcnlp9nu7orvi3unar91jlgdr1mlw32o2bkalgq0sc75gjza0vewzd2wo8we28oeaffzrol45l60ltm02rltvy1l8gd8i1oysd55hsr0in6ziuci6xbek8642k2b90kf0d0joxnxq1xu5f3l22qphmzpwfkrww87gnlyxzd3or0tp7tvtlw19q1cnsm69v',
                name: 'hazvdnetz8fd5cp0ojlu3hx1hnyyaw7vjk20x94wademw3offqlvw919enscwdf4m19rjte8w8f3w8ums692twoxg7k0d5h9m35g34bein00jhwelo2gz59hx5fs9w4trr6cru91sh488xg0exbjv2kwy4mimudgdeakfswo4vq37wo5s1tv00jsjqt8hkwh432qdcgn7vejdtd87qckn18zyjy7z1xd2p8vel5q5crlu8qzb96brriv482kxyx2wkhdlpw8hk3qx8kmjzid6zis0uq2ate4ring4u7dae1jr7ewrioqqytwypmfd9yj',
                parameterName: 'fgbpnse3iyxmlfmbfm7m84qbonwc47uvd6k9s9wu7tuwb9r76qoi3sjktd8a0zs1ymkfey0x8ml2jrqrd2pbbh63tq6pf7zlr75gi40ifrdk7n5h4azgwofjbol4snpqc3b27xgo90lnauwpd5p43t3vfla84wjfmrarx47mctyvij0sd4srzmitakmc47r3ntu8p1ae2xanhow8r8k1mwjbtvl5tt8mrzelsqfo5i3v74xzweczd1u6tlx6sfodv4r58ihvx1h9lpfkldgtwhfqx13ne4foh1lcpes95udovzhu2ue73km7l6egn0rl',
                parameterValue: '9gaij2mlgxfot7xooaldsw2kp1jnnsiz15rmiskwel3bb8o96lj97br8oea0xqde16cijgq4feljkwijqqse0nlne8mug4dob6436mj20e1l9dgfcn3a4awzn15kuu57zozfj3thylmkb4c7fqwcf70k2q9zebumdaxy7rmvtjix1ckxmro8hw0gr8istz9g9e9yld06woujlq3relapf1jz0sgp3nb5o9bkhfxmibx08hprv4trto8v847v2h7fvpi8qcw6z7f9axloek46ccdctieuj985t549p58you4jpy1v4gu542zvppjof6uvxe2qtzoqzzc2t8nkji7ev3e8vzy2bqm3caf897ydhzb7lzgd7nw21lhckius9sw9s4vf6gcoqc0mjpe5guba3yrsjplcmlm0vc0nswn96rlu1aaga0cpvrcus0nj487seom5dcknrr5d14p8swvksjqtcfclqvl9lu1uordgegavcfii1qdt4mji9spphqxzoqh0xr6mqjdl28vl78ljr6vauyvy0ah1qvb7bnp1hm2mqf17nai0ygzujv6mlhjaaeoninajts4uhrrwwyxngp9zcny6866bcv1qtd5vr0eqbznxz0uk0zuisqiaok1ertpx8rti0x2f2ernqd2dozh3x835hzvpxa4m2x14i8c7r5mzmoh4f6z4wxanla7r4e1cna2qeni272kn60qwgwolj7reybfqtdhzgpkxoc9f4wx2bmre0ld0hac8sdh4dn2klhy5g2iwqnz6c6cvt585mpn5nv6pf91j7ay1di7zxpk17xjpzekj8ahv70yestuh1p837uniyc60vpqsu7n6ipcd7ob47wdppaf0dn5rot9dvebc24agru8t90ckhqory9u6lsemt9sbah03d9m58c3z4bso180liwnv9b5s67vg36avnmpv8q4vheigisd3h12ii1idi4b2iulyk8seew95k2gfyrf1q8c1pywe1elwknczu1lp9868gq5k',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3',
                tenantId: '1787f2da-553b-478a-a053-4391096a0367',
                tenantCode: '3j2pi9iktvgucgbgoe1jq6xto18pqruh69jrcs4s4amv5luudx',
                systemId: '1abcd568-4333-415c-b2d2-66cab2e5f8b2',
                systemName: '05c3f70kpl4ajtrsmee6',
                
                channelParty: '22u52j8yypynbuxqhwhd77im0t3nojc03kkphel3bmpozzi58pw3ivelmuya972v2x70okcxbgzcm7boqt6dgoq5wcey3cunlms38xk2sw7i9hvke0dx4gyee7potdyigspqov84v5003aw799v993nd1sjaeedb',
                channelComponent: '5mqjbv77lyvglfu7pvgv5e6t36z0ui9yv6ti7e05tztb7lniknucezmjsp4wayujy9t3cqlefgqt0u9da3buwa17m588u9m4nk599emxrri2v08ats2x2k7e30zzz0x3vq5hkxebqobq9b2jfvj8aaycjnm5r44e',
                channelName: 'm0wooth6psrkk4j75oj45j974u7dy70m75crvgt512g75grh05tucl3luvowget09ioayaeobgz2jpqqtevtyzgklhtuvn8jo4cv9l961ngf0x3rgmj0a072wletb7pur251q8rh3gcakq85nj86n81eltxsqy1m',
                flowHash: 'a1dnvid7ylyrkiuv6lube60o9ppl35lwgh729i0e',
                flowParty: 'uxboexch7fhwskbah1otz36bgca230z9on1l0rle0ulk7f6cxultqol5ulnpswaiannz3vxy7mmef0320fdzjtnklhyp2cwxhqbs79noylf3l2jd9oeq4qaoyxu7m3kf800ty9pr6olw814roq7yypnystwi8mrl',
                flowComponent: '8pwa41tt1upworcc4cfljqaz1oh0w6f2ybl2qov8k1w7udvespxglquur7i4exvdwgxowqlag0v7dn6b3fmzdbivu46j51mazjuj71joapsggitb6mvbybr02b2ofi29igzp4ewcnz7fgc94bwnq6xls9rdmy0hu',
                flowInterfaceName: 'ambqlg7e7zpf0pspqivz1mggsv5temlt7jet92xx1shw2of09kdlklnikznwbmg1djrw6m09q45s0ccif0kbhv65arjksni2f31zau9d3qqdpcc7sb6fmdxtzvzs187id26eejojyeuczj826n01v0t7v8o2rguv',
                flowInterfaceNamespace: 'xz4ujvuvkals3tp3wc60wcnodzd2ld8wxn1yavwt2hqzokte2j5d1my8k28ru7y6v9ems4gf2unjtdnf969s6yjzfd7fj9kcvhp91xmdm5fa1hh808j13wt6mu59zxatp5t3kk08iwo9847lsyu0mp3k0mmhb5sf',
                version: 'xpp0hjejfjxj0nppkocn',
                parameterGroup: '824rstcboth13jblrgjuisvms7rjdeyaeuoywega46t1svke37hn1zdeb0t4z2sq8xowbn6ojwefrl2tlq9zbftdy922fori8zhjp28xi19iar9zz1gdqvan962t66qlvqmpy1z0vv23mfbgox5d2ctkgfivrxcdvzk1tm2959o3dmsy2lf4tid3dvv3z2ocjdbh2cjcm8svesn65dfb5elyv5r8qzvxciabh49inrajdb1mk40z2huvsmtzujz',
                name: '4du3gyh7p496jjf4rat1lygq17ijecm57agh8v8zpcu0po8noxr2sjczr8ia0pyez5n6d8rim4sinpqbnmfeualdyij33uwvdddkdkegvmiudthojpvkojyc823tlx5dsxj5wm3j9ya5i8so1st0lgsd5qmzxasl4xm3ywa51gtf5pzr6b4o9zw1f42wg5qjlpxanfbl8usvr0pgw4rg565fr37zap0oknnwulu8tinm2rwl2ujnp1p0cn4i4y4pb72xm294oxhffa8avvgxkkw1ljbs542ne0iymbse3kc5tec3bwx3lj8ftoffzkl4',
                parameterName: '8o2v79vtlo0l0mu7j3let9ozift6v85tlfyae3np18o0p2552sxiei9r5jrickvpn337t451x5rvvqkxeb2jy7gcbatij3duge1dd5hstuf4za5a1b6r0t0yytme2v8zmh2xe7t8clmxrs02m7qmj6dmco5fznh4z6oe5obw30206135ivjg317vv9enf3xacqx45m9acu4eqqrydf6r572gvxhdy4du8zjban6ztcolaua2j078udk4kwq46624qtrq303a2n5tmiu8xho7k27y9u7criu6vs3f5vyw5l0471byqsb912fd5aon9n59',
                parameterValue: 'f26x6ya4q18u7175qyy9wefm7g6db8yu0vxrwjzgwkfma606tzldww5cmfrw8b6c3xrny5h9ret0eetot8cadv0yvliravd6tx3n603myrimp57uy0ubbuc21yfef3eu7uvdtffn3r3j7b2ndx5dgu2mofihoj3g1pzliskujnroxyt5upocpd7uma1aq60lzt6bb40m7190b9xvnz972nrgjdd7fu8y5dm9ii5nlsb8g1ahre8l9nqof1khudw7ponsdntv8aehfeevnxazmzwidck5p0d930o88wlmz5mct9yoid08e409ds1037hzo2b29td6p7y74bqcns3da6l2xvj7868d2repelruv6us3dd7tdhpgfpd70dcmoo7yck12rwj1513reerrjb95jbub5bcdrr37lbx9xq35jw6uo852wccvtayrshtinjqz49s19mkcmvyek05nlkgcbzu0fscbgrpdvexn6pwzrkrassl8ys5mxpwc3x208czn4k4f29h7eovr6reyk324n0bw3hhc1ersxa5s0e2gjiktgautbvmdhnjbs47lo6k8rtxq7lf2f6frjow1vjpbc9sb9quvpmo8gjteygqjlhz1k1dojmwqysf261hc41l2juo6tkyljgc657deiwbcnvdywz1dk07hmwpxopkrb6nleai9y9leikzd3k2s2z8ihn84m0nmzvaew2vkumedrce3i2j8383tuj5uvpsbg8it3sqz3sfk185e5k6oywn0xjc19jdby2ua4am9wto8m0yc0f8wq2g7lpixgkot0c8p0858ek07a980gwpn85lbh7ty2l17zu7x7nwvvn551nm1k5gdpzms4q8r44vf7r9epfnsx9yd0djflf2rh0s6n42d5ds310cjvlxozynb7an8rztfifi72gyb85kfunqmihh8yrc2iggw3s8ln11uqi0c4ad1n6a3mxd84fhf1wjejfu7e93u9tvhiz5vivqaw2be9xwzu3eu3dps5u5',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3',
                tenantId: '1787f2da-553b-478a-a053-4391096a0367',
                tenantCode: 'qf5noowxp5vwvz8oav6hwed150xrwsgw3w6n3qzgfrd0zvv1rb',
                systemId: '1abcd568-4333-415c-b2d2-66cab2e5f8b2',
                systemName: 'yen8hqztfru9ilj7g0la',
                channelId: '084234c9-60f8-4fbb-8be1-73fbae827d7b',
                channelParty: '5nvfse2oypx2qffogmvt9nkohgqnolggcvz8jb02y0nru5o3kid515enf0n24ewqnj71ebhivbuja73vp57jnaafknmyol67op5n0xv8xtiqfv40or9srx72fn1vodegu0wzr3txgaiqd42he4h0901x2ikk8p97',
                channelComponent: null,
                channelName: '3bffl3rrqlvjsex8ciun7hdrgbmy3bxyyrqzmq3linsw5ln975unbt3n1vi25ptmhubp0x5v1juf1sf8b798xw5cnvrc58pfkqw10or6iqa6hovki0gdyidob0ta8lnqwj56x3ipg55zecgxin0baiiuasflth1i',
                flowHash: 'olkvxpv8vlt8finwe035bd0s27a8zdj2mh9zktk0',
                flowParty: '5e9f02d4lfyq3hlq2jzosue1a5rra59fflx90plcbbee96m70cp5s9hpzz2qugcr1tt4s5x6f9cfg0e4dniunrm9bgl83g0311pvg6rwuofq5krolqr7kxi652v272n8msd27gbv59043igl71t32mmpdez4ujsh',
                flowComponent: '2tly69kmyaygycwhsigulaiip1twlc2nqwcvi1lkpgcpnfsqdmq6zf15iudqr5np81hd9bpl46ud6udvz7phct32bhdk5tplgq3wlr1oxet3boi4r0ogmxcddy18oojbovoo17toqq4r6j6pyfdi4u0g5dpw8i9m',
                flowInterfaceName: 'gel3rm6on28tga0j2qvzcau3kloyj88rxaamw01qybweihqw8ufo7gvrbwlql5hcom89hpbs4o2yeagvkdxohy0d4upr9gqu4ge3sfzxbq5u1z3lehim20df01h1qw21kasquiyubjybtrw6in8w4rmr0tumlhk6',
                flowInterfaceNamespace: '5lb8qfr0s28wenevhdd5pk76qrl3im1kkd2cag2r9vyce5g7kmllb0et22xn60hvgdmrmm0cwwkcof842t0zrssos4qi97nam5rj8xhzmqxr2auiimu1zhwmjgphlg4u53e47gy5mzbn47bm1gvzyyp5j5y26la9',
                version: 're7w4j5yucxp0wwn89oj',
                parameterGroup: 'mvx0lrfp1hh72sg3is9sqvd38gtzyt33r8t962pbkm9bj5633dgo06bhan4h7oteqmho1c7tt3octllfvb411of64ptfeufrq6q1y28gwbclpn3zipwmfvdbqrdc3nxsvuyykb3t4j4i6y5w7jh4kaj77d6hsncbij95001e2rv7sjdniboibqinqc6x6p8frlza2bpzbr9w5cjxu9ln436ozed5ldbndy83dy2ezb94hmbdsl1vbqk6o0jgyi7',
                name: '3giwj7rti78x8fl169ecywypj41ikg0uer2phfwq0ms6vtmgnl6t9ouzlcf7y3k3p36mgljhrzk1wv6lhd1itan50hd51zoor1csngdb7thtmu6fcs8futiojrxwr72p4qyuux73ib4jgxdnbhz7lr14dszs84m05pqj7di8dfme7gymyktwv0vzp3am2f72uhn59y30f8qhixsna5ib6ti60zfeeo06jjq4dk3voe0qf4of6abm63pe7iotcflqqjtshwsnk3878eacl71qv69in0l7dwn7ng3l08f7ltbyuw0oy4i7zoxu4nvr53qc',
                parameterName: 'ab6egfy6ppyxmk5clmyqjm6ldxfwugpcgc9uyjy81m12zkkav4h59lsm99rhiueugxru0ztvbbg7qw8bz121m8drrb2k29vde9wb99nwotdanaauynwvznkapjad53zzfc2bujxbwk9wvx3as7vixhmt2ovrv8z1j04xob7et2dp4o0xvxz1be5gmwn121vjgio80ltk6v92myj891e5vh2b4i7rwdqs81iz2k50okhhklvape8i4lb7cbbyxdvant7e5f3h7tc6uy5x5xfvrcq7zsj8ciwefdymowpygel08p50iokukb66rxninla0',
                parameterValue: 'w0v64i55sjzywa5x4njzrmxj2tekvzyl498a9iu27p3223k1z0eagsrcqe5zewh2bkwn69lmgu82sruxenjrkqgpfjic9xvtvch0szziwk7t3oojlyutosemvw1oehbruyq1mw2ub77pf1z5lk6x8rgwnjt6kqad0ecqj8ca57by9udb4bjqe1thbhwbjy3ls2084l3polrcisjjqbx1fs3xoda9dvdcdqdp00xusr7gmd53asyheb44yyq8e49d0uj4c5tkukay6cncywn7w8xg034kdcq9cgrsf62set0x5cndotxq24l0g0viz8lkkxsox7whukl4zraiw0m1kgpd8xmvw6zltd61exqd33qzchj3xcc65chffzhqz2d7t65pg0pl538ph71wnk43742es9jquj2zsc5jhpav8t2lna88b730mk32lyghxrdz7wh4rl7m2yej21qn8j1idi3wib98ikxnkkxols0csfbpd08qous90ea4ba7c0ugdkhx5eiea630ilmgm53s8ps8cw574jrmzc53w74f1vaixef08z0k5q2o8o8ziqxas8yjmt9q2i3a9t0gt3rnivyxmcmvsa0czuuvkyfgygoy0nnw87brslntnfd30c8yi9b5z96ylkhs7z3zyf4mp1on6kx7q4np8nwiqacyjz8zf898nvjyunm02xeeb4xoswt8tb4ze139kp9hzghrk4b2ijm0ux6pie5a4wjukrhwohtmo9gauc1vcszeb5vha2g9d50u90q1s8imbmx9jb6qlgxidy0kmvcwv1a0qhfe42agtft0bd8t6hianqs8mqmukrywtekp7yw4e6rk0a0mxzt87tfczkouf9tbevr6vzlliy2us3pvh2rt0vpdsmh133f6aci1tp6hwq146t41xanb7d05gkotckri1sflmk8ktvhz5o29a0w477n2f7oirwsxryjzp1aezwyc4ef0o97x5do3icyamncqk8uunjfgaej8cz4s5sh6rwlk5',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3',
                tenantId: '1787f2da-553b-478a-a053-4391096a0367',
                tenantCode: 'qokk86gs2y8s9gz5lb4ivppp0leo5481s3nk507q7zrlbj527n',
                systemId: '1abcd568-4333-415c-b2d2-66cab2e5f8b2',
                systemName: '94prqsw1x5h2nmtimz57',
                channelId: '084234c9-60f8-4fbb-8be1-73fbae827d7b',
                channelParty: '6817ew5sed61idmtmo202utnrckjdhjghp35m1fpenurk438fvozxf5kbrj1euk5k4x1czknb34168tkqz1ewwufv91gxondauqj93xa7t2uy965olzbb9a7z2uwlqaqaes55zktkn6g9f416mxyj6otm73hyhaf',
                
                channelName: '5wzk6oyezbh39lh6ywn82hvndg875i5bg0vxk6egd28u8w89jhd17w51op1io3jbisvnpzakt3mjrzgpzv57yvb28ha165tnmgull555lh67gwdf6kz9e97fcseppu43igvcsqy3rqq4ccgv1h2qyyi1gdq3ko7c',
                flowHash: 'oz9xyr96j6jvqc7bwafjoinp4zlpdcfi3uw9do9n',
                flowParty: 'l97z3vlh6b9gixvnchbcv2k8a1cna7kgxwzjfax4xsv6t8asi9yhba0jg0x9lf83o9e3lrkyhfobvhhz5aykkcb335i1e7kygwxkde2vnf3ebilvo88jed1he8z96o9t90eqh03hzg2kghpoc7fh5uy4uxj8koue',
                flowComponent: 's46mkont42dsk9a2inmu63wfkjak5eivllgj20wapwu2eezd7mm4e3okxx45kar1fl8v3ky6fjg5hkoh5qqj18tp9xczwzktay3lpdmi6d3fx4oyvx5wf1ubn1mjzemjpt0xsyb3tfbo5n6i8r9cfv6amwv0i0wz',
                flowInterfaceName: 'u23jvz2kohn33qjnhtu2agd5ffuz5526a1326gr7f327qc74fw74dq3z8a6epzn1s8n6x1n5ed0kxw0vimy5ptxo2qmz85rbt30v4euj2qqeq0vt0v43srsbeofgkmlmeuj8hzdcfh348kudub9tyn1h0s2fkg4o',
                flowInterfaceNamespace: 'y83xwazjcyc8zkujj21wvcpdjhwoaoyn4paahimzq0f1kb1z5l1k4ncf8endrsu1fxagp5c7vk9nxdw6dg40hg8f98gm5xgwiuhcdsg3n31mf9pfvd3z8o1aiq0uhcuevg5a74d6qflktldzd6ohfqw9xg8jei9x',
                version: '5w9gqr4i43oxewd233ql',
                parameterGroup: 'zatj41vpb7whjmqcrz59een1ututfy10hix2inbln1n9cn8n6zblh044mbonhf0s69bjm5c3er1g5v4lg6pwtylgkh5h98ds62979h9bmr9r2gb7wlt7s959qk2sjkdegwdkx90rzo14db01jt1n4z09aqov17baerl9rgd1813l86pk3u33hs97vst509hrpvk1ejofy10oxks4ygo95e9l0bwdsnvw304q7nmk407lgkgtn6pmbwjchge6ugq',
                name: '007ed99e0uu5jekmhue82h2kco45qwox4q47up7zevgkydimo7hlvu7sug6elvb6aze9piroczwrni5jgy2r44tv91sv2q7uv4q3mpr4u2kwh1zw8oircs8ls11v2nair5w9sru0jxt71jz39qt3ihpt84ednbuxdm47nxwn2zsac8s6qnvnqg7tnxwa5r8ahhevyy2ye605usegeotjdtryy9ex8dwu2tczkkojw176uau39jfiewuht47lrgnf693if3b4lwhml7i2do5rm2zorz04m24sy0zcvoy6ammlwodk1dfmsk4jfk1uaviv',
                parameterName: 'xuyjan758buwm4p35z0iwwct3sys4uny2yria02c0dc2oqggdavec18r4saire4del35gf3bsumudox846ntbtpn3vzwsx0h8to46wkv6oebee2ken2unr4s5x0haf61zhie1sismtys6re9coersw0bn1gukx9q5yof2rl820l4c4q4opdn0aon6pna8r84nbsl67zjx1s9qynghgqu6eog7zcxfidy8w0v6yq8e3yj1p5nxvnc5i25vwtvmszste7114z61dijajuu3fzub6bbvqpggtadhe773tr7vpzve95iu8xskxnz8aifnmtm',
                parameterValue: 'jhbudmr3a4hgnsij6dpusspezkjp47tl4uwazalxlv7cjs56pnr7f8jjee2fa2ca9qs8jznd833wiefev05vhn6wd3uvebzvqv7i3bunw5kj7tcth1nsdv4zbv8d56uabvdgy0dw45nfuszbgfmdyj30j8i07foo9pi49qhun3kkwc9m9imrda21z0pgwb4101ngotzooux054alxnaz0eshs866hm1eak81missxvdf7xtknhwncb98ht2174idch5tkiv37kta4vfhdx9fl6vhk0hgavwu6w4v9s2ioeic37sgnzeisv6oe4busuiywe08fex7qgjpryxdgo8msv62u0g55tnlaklr92wutb0tkq9iwuzx31mtx8yfo180rsrz0n5zkxbrpfujfcacnuddcflg9fxe63ka8dd5rw81u4kr4ocicbgnhftp6t5wtd2qfrm4lhx66sr2db1ihx4sb6lu11vfu6ab3th5zozy06s1vfqw3hfi0l1x6hgbzw0f2cw17d6blyzwcolzjt5xoe93cjp7un7porqqftjqlfzsalzqn66n5sehg0o5sd2p3rdt3ofxv4cbmyt3iepa0cl8q6x5ty450gdmsadezvw7fjakrnm8fuumth0vu6rma33edab3bmllphwufhgf7ar9h6edaammknk7szxqs32tl381calb4sf8187v1zgrm2xcoc8ol5c66p57ngc60961u2k8rzqt2k3j22i6lj2bb4r63oilnaqdszoz923jya1wqg1vk39k5kxbaaba9v22rkoeyy82clyz2p8c164s8pbanrwajszhesoxmrdukmeaetwm6wh8x9g8bjfg5pw2i7jrfl8pk93zdcbufp2bg9u51nk493y8l8xx23pcsuo1er9nr1amlpt85p2drlm5fwaqo5f8sot7z7lwyfes0ytfoozr5ur3rz8xpnz11q5r5f4l29vgkp99uwvsiblwo0pjfqigelurylt035ipopv20a6p6h82s5ga',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3',
                tenantId: '1787f2da-553b-478a-a053-4391096a0367',
                tenantCode: 'aw9j5gw9xgsbpbb7qm6vswao1wom8ri3fg1bk5zit4h194v1k4',
                systemId: '1abcd568-4333-415c-b2d2-66cab2e5f8b2',
                systemName: 'vrbmxj1uoyjddbkvjtmf',
                channelId: '084234c9-60f8-4fbb-8be1-73fbae827d7b',
                channelParty: 'dgeeuaed29vmsyvzaiy3beluqkxr2jhi14skrzgp7sdcd1mb7n9oha7pudjoxrtsg005pwd8hb7qgw6wdfow6scxphviapdtv07lif4cysbptvlxdn1jt1yj1xk6vtq4fx6z2134lirube65a7da9tt0chegujvm',
                channelComponent: 'ko2ojjadf7bzripy7vfshw2nns9q9t6wzlqgxcc0kci8h8ip9w7sneee6fdi0e5hg1e4scs5t1a3nnaevwlrntnodp1eex4ggxqiov5l43bpm1ucq7m4xillmg7qvumj1p10fnpc5a0do1tez3riznucolf1iz0c',
                channelName: null,
                flowHash: 'ilr5cpwc57g76m0787ow3q0k1z4kq6fnlj2r0go1',
                flowParty: '6c723rsx56854p7jr4sskhm9z1it89o7dcm24vcnnla33euz75lcx8n09bdpoh5nbxkrru2g8nbpfa11vfq0ies66prw0rukwjlzf5dhildm69r6yineb6em2usj9dalyors0ru1gy3typys97nd3xdssll4124g',
                flowComponent: 'tulr0pqwop7qnfkiarrkwchxzu60fhozw3ng0dl2vbx03l5xp5aqcxrn7e3ksotqcanye8vhudslux0uofhlezqili3cdbc6oadilae3iazt83d485f4wz2hn355zq05bsh1jfcj5hgkjc93rc8vnjxvx8gers33',
                flowInterfaceName: 'sfcfmcs74n2z7mw6y75ouppf7lpuhbx3t8oe73ax5rsap24lwbrx7ys0uew2i7wd6us5or1ifwbl6oyd58nqvkel4ml4i4ldtxnou9xrsul2vhz2ceovlcc3jc6sbw7spsg7cwgve4glyh84400jk7srpb6n8wzp',
                flowInterfaceNamespace: 'n59zhfdsqzpxqbs5l18r57zhvfagw4o6rw0wzj0fpnf5i6ph2unspf5epv5yaqpa59ttrqxecw6fi20rkvok165yybx573evk720bfkgo413rzqjwh7uv4lmiosfdzbm6ozs0sfwx83575fsv5bqpdmhsf67p47h',
                version: 'asclnromu4wp4ybu5heg',
                parameterGroup: 'xdi9nsfpy6ncsas1nozc5m6kocqfm7fs89otc7wvu1uovol1j3nvx82tf88l1hv70hnxo05it5rfj4ixeqzvlyala6u4wwli0zd2osvqgqx12f99yi7rncd0ce0i5z6x2bttvonx2zc5m7v7jnkhy1sdn9nanrs9420dhcuzxp79nafbtj0redd0f8q0avl6o2a9i3hgkuekxxk04zzybs58njdgmnpoushenk7epn2pm8ea4h6oyqewye5teyl',
                name: '5d440y64xznhlr8gvj8z3yz4fh506q83is3vky5t1al64cohq8ln8hqpdggyw1o45td58cr928rtumex779ldk99d0un2wrd8ml5hvgdia9qx5no7giv7jq3rpbtgq6lrvchbosdi4h0hwlmsm5wb8zuupwqro6xdvgcc1ri2jt1x548v0cy9vxayyw4leptm2dqiiv411b8a6ltqyb9ftf0dfq33o7mmu5uc55jtqshkam181mg0p4znwrvcxc8pmqvlk9z0ksuwf36kfiwsvta74thc8vkorlun8z4cqy9o0198si6g4mclwnd0gab',
                parameterName: 'pe7dtzzvgvcff2u5h13ag7gt2wta3vupxqyxkarkgmxlftgya76km8vb6ej84q37ic9iwvzrsqi56y72vjhbnmp4ya0gvoukng0e3m7iognqfhfcd34g094u1nsfzzow65bw0gjoggb7h5shd09zpm9kgzrw1o0h1qry9e4cfhnignj9gysnzue23dvtdl7g4l47e9a5imvk1ey34k0tdywhfdii2bu05tcms7qq3gku6n0vueitns5asi6lajpwn26yz46iig7k5a0sgielyhwvjnrwwzy4zv304zcbx5pqs66qql977tw9z0oddycv',
                parameterValue: '2j8huwc3tejk9gnnw900m6zlz2jzqlokffarejhojjjbik6uqtn716h4yos8no78edqxeujdqdiq7yego1fo90n15o49metnq0981u20t06wh1kheaucuvc1hv2qo8i5mbyd15wfxxgok0ax0h7dcb6mr9gxq7lhqq3cofhm2prshaimkmarzo31owbkhe12t68chnt4p5c4i8wh274mouu7mqv3ti83j3mvfulkq8ltekzv0j57c5bnzpwysnlk5z7apxduc3z68czjxsh4dnsbk0th5g3j4k1si9ub3gmnc3onmapk7l1mgb4ta3aknxpgk5fbmmw35rh7bcwufvynny5xruqlm9reuduaazspl8fn7lxa96a4mall4o8y0v392tkow7iou2hgk9lulzce1dsjl96mtcat6cmoyfxnprmiwv4wem0x2ox78bhqfykd9dytj3md2kthtvyun4dkenwpoulansbb7rdkoam5kaqu7fpfthaupu2h7ez2hjii6xldy1mms6hkzi4uf65cnxphldxrtdyfynqw6auqis4y3v3w4up19cvl66fsxw4074g9x4s1wkwtnctfyfr61ptmiphbf1hxs4mfun5kwbkhhdai9gi560aoutdfw9ugnbhq3hxj6kd3sd3xkjnynv6q7ywetazlvv68gb6bewixse99nn482xfdijk90elzveipoiif45cdux573wevy8xcnzzkkk6l1fg9bjjphistwm8nlo1vr69kw5auwpe9xzv7bw6w128hcfmxoq1hmque9gq4w4u4w3ue1z9na8zrhw0u2ggstirsooobvow87etdusmk56n4i5me5s03ywmqlw1rixucxarhv7wyk0gbrh7535ha8z76ipqxiai3jpttyrctm1nyoyg8trbkzb5nrmqwtzx2segluyb85okvtwg7xc8pz4tpvrsuqq0kyi1o8pul152h3i749tsl6pcyaywpfmw83fjya602pkyb7plfvokntl9a7i3r',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3',
                tenantId: '1787f2da-553b-478a-a053-4391096a0367',
                tenantCode: 'yiwsviywc5i2jec9smhgo0m8hy5xoone4189lqjftnh5onm3el',
                systemId: '1abcd568-4333-415c-b2d2-66cab2e5f8b2',
                systemName: '1t7rgqy1hoowrtzfptxo',
                channelId: '084234c9-60f8-4fbb-8be1-73fbae827d7b',
                channelParty: 'b9v1ekrf23x9r6owz60x8zmn765b8tg8v9lg9qvufy5jqxugvcz625in8qxhtaai248249wjzhfbeemcdk5vgwbjmjiyggquu8uh0crtl0zcxcwx01nzjr5a7k8sahte6gh64qi3gjd5bs2xltv43w9r0fs4qfpm',
                channelComponent: 'uf9gr6y5h8y0vpblzlmdmrqen2o4xd0cx03nvfe5fa6xndtdsjqpf0ctjtqilsboyadtz2ktlspy5x9j98zquzsozdd1vujkxwqce8jdxfborvnokuw3dyij8e8nctuskk1x2rmkjpnlxagiavy8p4yctqy92vxl',
                
                flowHash: '6yffnaj02bg6x4sis1qvu04zbl649qsfa4wimell',
                flowParty: 'efsskrs41bz1xs9udvycfrxatqxbrhxgv1gxisgsivmcwrz2tuwsgmcbcw1jnxce65irn2jrjn3oknmyqv9udgkwaxkbpbrth4n9p1fvnyn1hisibs9hwajcgy4pq7y5ptualcgma9pdk8f11wwl2puld7hrp1ui',
                flowComponent: '2zw5iqw8dje5d6y9l8ax0jh9qsot6zbxtztjddeb6srekucxgoat7lk0af8q3fb2neueogrt6sqtg0sfre7u0g1o9s8kcw3mzk1tfsym9nhd13acmdvr4pm10h979akijaqm6z76797140dsqcttyuvkgaz5tf0d',
                flowInterfaceName: 'xp6czwr05fp81ewm1cqcqgik2m88pat4l9bz1h42zwm9jcyxq970s23f0undi6ms4bham71gnqu6su8toi1827hh4cxscgnx8sw1pmhajae1jl3txw9hxs22px8lauw1ggbbk1qhpdtcs0e5n71kdea6osx45nae',
                flowInterfaceNamespace: '26i46utga4zac0tnbj248y22yybjw3snyzh80j4kmkohzcsjrvfn8lc0msmolw5o9rauv5rpdsjwiu5x14ulkw9gksietmehjbh215k16010f13g7yfnaqzxmn6wp6p41xrep3nyl5w6umamqecugghrwe2b318f',
                version: '7t9y9ddqxpugb0pom57i',
                parameterGroup: '17nxjd9ntky610eaticii9390ykugkm7sjjh302lttoh2nbejde2bzwima4r6xffmw19uezrx75sd69cxcvrnmetw1yxbkdeyif810k5eevlq93hppr2nicgpsss76qgdcxbdzsjmf57ekbve7qxrn4w5m09c2su00lplpu2pmsezaffx7hlmgmn74zvhzyd2yq57iezws8z8w161u39vlhnkkr33l89kj654xb9893jxqunntuc59ger6xuin3',
                name: 'hc5f0i1k21uetpp0edka1n76mid8wqt2qvp5wsbcift4nvdsz6hvc23znu2k6k2lwbm28xf48dmlk2w596ihexrsngf04hfcxq0vdw3pc1g6dqc0scvq6r4zth2arxqxbhfayyu3fhbbjguacdnkqwhaetbptzn5wv5osdx675lmrpaaw1lmy0s5ro0hgtuplo0gb335ab9bv82fmghxd66eldt0k379y8an0qmuh8ghxyvpft54nvlpg9b44tabokei8wj7y5xfdp3xb00ycpyyr0suzhhv4d2n6gs554nfbkczjyos0w0x112vqn5h',
                parameterName: 'ng4h3qrjzeu92fd5yamkiqmzxtv63v87yly8634wgmmkdjnnwuwmpq8y1xxact3r8st436a5sc32k8pvw5sbltfrgz5he0se8dwydhuo6tlao53w1u77fqmohfd4ybphi6f63vepdvmzftz3rtm31xhkixunm7ewv2492s9nvx60h9n4vdcifhs9ar0b1ewrnaeayg8u7ry2s7ebbifr0d99i8dcj7clahr59j2zlllfx4pcd7av4s367sdo6cwuwcb7psfge7uixqzadwgjers6ldn430mdadg6eh9dn18yjhqwz8ppby047gwpemca',
                parameterValue: 'mhz3j9mupradroz41t7dr6wex9c5yi9560kj79na085pxvw07hb2lp8ssymfarnvv9ckdgr73kjt87b7ifloe4kilkoycn668p23ehim9klpv6puv9kku1a660fj4aytiv1z3nz3glvvtvhba2dp9b7htkwaw6hrikffupxif6ij6uyo8xyqfxmk2kyi0s7jy8rfjoek7ldnch5p2gwjf4rhzrjzw6cwbntqrt01z0clue0wq887sj8bsyuazxd3mgn75peub8zhowziuel7h9zpgdpvx4i1zsycxenliucf2hpq1asknwf8d0hyuimwxq9y3j91wjtwxi8nyls5z1t92czovbhrvsd2j6eq1bdmgec3jxuxfjk0t06f3tdjupxzm9lhwkizxwqo1zeb5q4is9apjioxlgdjmlgxxeaf52zghk3ykckbvg2uwfvwipnjepo2muntakc8bbg75sjce2czxcfyaf46lfeyu4phuvirj6fbjzaw1avmmjbrk7e6g02oxit9afjgm485r23pdqedyiryo7tohywnluzvxonpggakhxnj6vtexhu54udsf4isqk5q9hvn7f9hl5fsrk8lq8keth4y7ln2jj04w0rgjmdya6crbvoeprsp5943lq6m0mefpvloia8ijpkxb0wz5ibki54xabf9rfpwj49iwoxum6roxlix0z3gtxdnp6ypazcgiiz5ujg7ihgt99dh01pjbe6yxusp63s8x3n7mun0hb75kztifg6xsgwa9k862wymi3lg7djq60z18wm22q0dxduocntpmw5ukf8yx73lwsmdexex0vvsn8dkpe25lhlhbppuovrtplyfteaokrwziv8dtb1lkogau28j3gw84u0ln20hcum39n2vadmgblf08e0scajnf5wueflo8pbcstw05wkxccs37dzfnj2fy2f6f4oawdnepuvub7xssdgj730ee1vm03g40ct1ji3dm7p85111d1qunpcgjj8ds4118zq1oodd',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3',
                tenantId: '1787f2da-553b-478a-a053-4391096a0367',
                tenantCode: 'nhv4tdmigkgg1uyswuke1wh398upq3jhyb3na3h2dlz5gmtf4x',
                systemId: '1abcd568-4333-415c-b2d2-66cab2e5f8b2',
                systemName: 'j53fq3emjjenq2b7d1dn',
                channelId: '084234c9-60f8-4fbb-8be1-73fbae827d7b',
                channelParty: 'dnmw5z2tds0iqllje5y9d8iinrgqhaq9ue6sco9s4kktdeq07u44vtlrmft6umi3mslx5c5qazx1m3nfy9ah6inppilzyi889v0nwthfs5gl5c7i62pj5bdjoxs4l2meod17i2vptmuw4jfkgclu9zesdnuge99r',
                channelComponent: 'z1z7c5j99oi0bctuc5khniso2y89wpo0t4fq9tayvhrr3d6vbra0x51xbmgtjv3juu770qbnyjao3u7tq3ejajl660qf8xfzxd864uudytpbv0haukts2z81u8catcnrco3v6q6bdit3j45ctl5uzv569yxutm0e',
                channelName: 'cz7pshditwdjucpak96clgutijqxm1t39g74sggcj2lezlw0acl2edtioc4ru8t3sl7s3fdm2796ilwisocz0qamec3jvrr8xdovjr02c9so43bbpq9n8faexio31q6vd3vsnq350tx3743z47axr2ehuc53xn3h',
                flowHash: null,
                flowParty: '1je4r48p4azozg2xtp1hi8jo4kk1gznpdrr4o2jjtsf4tqs33g3s1nz7iejbkp560lfxm6cedlmsifp6jsv14ysaag04keg7mgv29zrr69xipv5vyypuo4l22einu76kcvbsi1qhtfz4ddv5ba8vqgnvzi0ltvf8',
                flowComponent: 'pe3ipvlotwbzehwh7gxnknquvju68sxqcm9b6or6ily5l5953j6spi37187h9v2rhpb1kmhyhis8h4wubojc21r6nini72at2olcfl3t497vh0gx69555vnikcg05qi1plvm1vxlapm7u19xapzzdutf2hjucxy0',
                flowInterfaceName: 'rzwro50ot2ur48myc2nge7v7cbk7aa2aoco8j8o1priu8t217k3si0mfbaxn0d5n8wo5nbwqet0aqtzf55d985lp09nfpsoh26i0ix8304yy4gcu66mcawte9wol29qxu3k5pv7cpgtqlnou02ixc5n58aivh4y8',
                flowInterfaceNamespace: 'm5yq33p02ecca2zzxtjj8nmqzrsp3ttx8b26coitj6v9ngrqg2fhxv5ixdo4fhvpwcipanokfgxozem0uyb53jnifaq9et2hcx1vd0hnqneu6liy10bblcq0fyb3qrqp47t7wzf65pof9185l2zs3uv419zdagwg',
                version: 'jsut43u3vgtokxxwgycr',
                parameterGroup: 'h2zmyeig95mygnay1sy8kccuv9rohgpa1uu50emee30hvrn6j8l2kzu8duorzgamlxz4zsta2r3bwiqaj36tb5lkyguuyzii3h9dqv8y78mb3kqp2mw5grd0zvo3zlans98ydpy9uyvu6f5hq9932y9au2xyqvgln550hvn8341wqu8jj9bga1x1ooxc2st0nvbtwce4mv56gx6ocg85jzzhz011qzx570ywrdqag0syhckk3elngg3s7hgf8mo',
                name: 'epmbvrbzm4hpkfz7yynweq4unyleiszjn1hikqtvhkv8h2xvf1yrm7t99eyhnmphkq8lrar26j8vtroyhgnmxj2g791e7o5wg1bpybp4qejpitg84jb2uvs6b96nym984j1p0k9nxvfmvb450feqdjpz1630c2aevhl6ctwcv3t9dxi8o7cwsww6cscwx6go48htgs4edzhlo3lz7aj6l3omlfu9ak41ieswg7xp2kxspcid8mh3ntb0bdgbmry0rn52vmserscz3ral44nvgrpcxxioktyeenu5jxqpfoz8kuoznm3a177vuxzm1bf9',
                parameterName: 'moqah2tr13cs8vqzptbvgbdz4petqqs4i1d22nv5xdn06nt573gjyo1vvak2onbj8bokw8j5yc1gr7imhwse91jurlfyqye9e3eqri3w2fr928ghd9lnn5cpyoo799lvjvnk17kfxob0pxfifre5rc7120xv3wx8yb9fmiec0slpn5miyovz2f2asgt65h2e33kl6agn6r94sbe0c2cmwrje2hd07v0k12rdao1pwuv303jbfmz4shpbxgferp0ygxg419xa3kv6omyz1avdc1i7cd32pwgx9ojztbzv9jqdgcbi22mqs5l3d0mpj5me',
                parameterValue: 'u6exclald47nz3pkgdconjpz0tmdwoz11rona6qaeqwivaodpp6ehz51ssy4ybjmdmqzn4v039n4ujigxak4p3jv7neze6pffgyjk1evqan5ua6aygwt2q2gegps0gm7hxu0wgu24mc6ft436ve94hmxhqhpzcit71r9sin70bh5xgp0q1n8lc05gela3rl3mun8vs0ukl1j8o8n6boy1ekk5yxjsjpdanuwd61yjsxnix26tdx9cdy76787d7a65iyqyvyddgfka8d7kv5emf6rt1roi3jnfrv4zigok0vy0ektl74zrpmf8qg98uya1lwt8gba70q0et7pllpg8ed93tjld1kmlj1cazrdq06141c4fdnga73se04w5rqj83wlmgzkvufidrwcostsetne92aq33eoannl8xvp0kq70ffc5stubl1vynavfaanmyxitrfm1i93h9gv6ifmxgh0ly9ed36rff9p9yk9kqrfo03hqztv7jmg3kxws2c048jldfgu75b8886pbyp6czt4ussgtloyvhgdhavfexxowheoav1f3w8olttg8wtcqvd6wdfq1pwhd85qlqfg4ibmyau7rx993uk0t9wxuy0bgl4rt5hntnlokvzgbduu9sweoweaxjbnuagma7x16n27e79wea8qy7dzv1ybf8qb3snrufw6th8uq76xxy40gct9r3ntpn4gnjmnwlh24vyatx3q4lyhsnshsmjy1k1okx0je7ltqwnk2grik6pjm7p66tz3gk2zyydswunhodfuu2h33qprso3jtrt5m0ln5rrxyzppu3svklbqi6i1i9bt28tx89080tqbmu47b2qk9zs1w8jrnkgdugnkypsyvrcz49vsai3hh6q34jwi8oziydtb03mnsx27zbifobt4qpnrprj5e9wpiba6phrf2ld0q0vqjr7g8njjr9asnfjbdyg0qtknwx2iyqk7yt7x2hmotmm012vq83aual1wnghf4pm4cs7cgpnzd02f',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowHash must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3',
                tenantId: '1787f2da-553b-478a-a053-4391096a0367',
                tenantCode: 'lphzlxc00d2mxjztt0wxdxlr77yoo2j3q75tpgd1dccz2crllm',
                systemId: '1abcd568-4333-415c-b2d2-66cab2e5f8b2',
                systemName: 'xhemncjin2ldz0kwudxx',
                channelId: '084234c9-60f8-4fbb-8be1-73fbae827d7b',
                channelParty: 'e8kba8gwpz4xih5u29haxt03xcopwct2uirtk4kml2mzjonqr46jvs5c8z4d5udo0g3b0eytbht70kvg6jtj86c01vw7fgdnueqhp6t2qtym1cv8ccebqt0i6ejv1umfs0ipgt6ethp1glabtsx3reohz0x70n2s',
                channelComponent: '21fty5q5i3mybdvmu268j4p7xmaq1qwxn1gn18mtra7p3cf9hjm6au5gbt410zm4u8mns7ik7b5tq73rk712q4kkrwmjpkob7bqprzqtwbem1ua6a58j270scd7ar4zm3x32eqgrmboxagl3dtnn1zv7vpydcjm0',
                channelName: 'vxirwstiozoxvcqqsqz2ckf04p9fahamxhkg14imloxw0mdae2yu01372vlp565dbr9fhgldt3g0i92ih7jayw5luej26c9aerygdgbzz3qcrjdr7t9gvbhq8d6v0z7jbm5kvs7mwnz6wnbhi9j2lq808949qdx7',
                
                flowParty: 'ghwf39w44qztu9r62b47pf24l4knxp96w37x03fxs2nafjbb1mv5sn8jpcx27qc75i4bi3nx7s7l5zeulxq063po717rnxxljeztisx1aqxsfe9b6yan03tbjtuzrz8o6rjyalf5uj7tznzp2kdx8ncayhytznrl',
                flowComponent: 'gbhihwbfr9amioi8h7f3pvm1ep15sxwjup2ry93agqai8dch3pu3s9vseqbdaqpi2037woaa9uvb4sicaa3zpvdon6leuthbptuat1k3os999ynb8n979ktkucjgc5e35hsio8gr54z0tf5cxwhv3mhkl8x57zqt',
                flowInterfaceName: 'tleyirzdwq8c0i4shli4ooul7hriiio9m8ht9ifhfe2569wzwjyj5lq0ir9t9e291nsjahzu8kyss28w9thtcf8sksk8v8y731kamyn70dxml28powfi3164cbaxqb6cpwgzc82qnx7tzaucwzr9s8aj4gboahl6',
                flowInterfaceNamespace: '5p55yhi6wi15zj7mycnc4fhamqza3n0ngrnn92qy8mhd7yixwqp0kymy963y6y1dpzzpg4f6j1zzjydrpahgc39j7etu7ml2r4j7e8z2z664tl59gf13u8n8fz1e3mstvpaakr90puax7toqt5p8n5pl96f4bgit',
                version: '3e78fbinx1psqsi6hxjs',
                parameterGroup: 'nd768iieu67ixr2s2sl20l53ohg0ul7piimrgzjy6kp9qdp8ajlvwnrb2gh4slbhzutn4ajw4q857jv2ajgs7uma1y4p4dxu22idf8ya663zetrp1j2ehljlarzrg2moqwsu42b6vm5sfypaog0n76xdu4oq5e5ea52kiwqbj3xycdpsh3o1upkvvk5a4hywdbilm3xackth1rsnml92wumiee68xwcwhwyfdiurz18twyx2zbcnnqlv8b6v0hr',
                name: 'otbzfdft99t18rx52hflm799f1ayqpnuxrw8139343s4gfwp9qwqevkr3mbxveyzon8slvk3dmw18vsdjq48umaivxvb5punxiyqo0j2nprb4oe72q5qb7nsbhukyix01iadbhnstwxeiydt7n8rxciv8bwso3n6bu7wozy8avzc6qqk0aq3o5325fk4g3a992pz6kurm2521uevalotvtf4p79aiyqv18wynfck5arha2jj3gfz07c453t442qnbrph55j2uuc4pdsik4mzycs415x9b1gg7vsiheglbmbih2n3dj161z2b46ywiu8u',
                parameterName: 'vrhlascal4c79exm42cq3o1q9imu4kh6whlek0us9vo9d4p16njfb3xb0j1o38u6z58d01a9hpmrbs8b3usen7otdbh4my0p6u26pzqnqyla8zb6zvhe1meubzl74uubza9d8lddsql2u72s61fnel4yqu3tw3dl43f3tb7kgg773uoa8yu01duvhoaiz03c5qhgdsp4ujjum7m6byy8i2axga932lov7wpxavmiyhlp24y8edm81augtpu45zpd888xgfrtc82ymn0s8a4xnju0n0acn05d08figbw756zd64qxf79nee8cmtarch1n',
                parameterValue: 'aervsg39ctvzs5uu4qbtatrzwf5qihg51ehrn4ywu332dgc0ryglupdr5r4616wptbiaycjdrirtwr2l72z3u6frasybfr1y49m4gox4slr7njq6i6535k5x0l0clwc8uq2vidr55xumltjovo2lpi6rjn98ynerbj7idaurm7zyaq6390rfpy6pid230fbzp0y6g9f483doi7jz0z6jr1wmjrzp5hus5dvuyywmfvv4dbq38606yhmra7tbv0n46ngaa5kb0n0lywk5ij8ctheyw9tn6t69kuwz1wjgtbby0t27eltcx1w7ld4v11wqwjsz5v26jy63ad27njbb00j1zkwro1tvxcf19d09u1o4tr6nkrkt077ltzdz14qw7ydsg51jdgwb83bnb0r3owrf9unsmt1wm39eid80z0tuh5umcy0disugb0ij1c8uxomf54wfpslo9766cfmi4xppw5ace8dofwasmwaad8aicrcdlxmw1zotdb9c94olvjc1ae0n8oigtvt1o00ix8zn18u61axi8ibi4mdg90188pj6zcnmay60ygtc2m9w5coghfqvtha9p5czotbiyzrfwzxkrgyupv5z20hrvd5bh4iu2hbuba5sg4dsno0tu3muvgxv4p0hazipslfchjwoxn5bv7p4ufnrz0zn1cw21g237d00njudjgrp4ynaahhq0bw7op0jy9nraqwrd4rnq811gpvxnzukxwpq6ymioe43ear77jh2tr56vnfj9n2oxy2u0md75z2ssidcxqemiaaz3rbh7x58xcxhi1odqquxya6s30uj2i53pq1f32x5v2o4fi4kaqt5ra3svw5jzya9xfhrlmu8tprpm89a1py82om6ocrmngeh44skfjqe1d9ybh3ss9rzbe1z00dqzm53wxy8jxwc1a4vtt8eq3gqd9v9wcofooje68jbsh2bwlez5jcwj1fejfnr9ayamf0f4ezv57npehku7kccae0qwrky0l1efwibwr6r',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3',
                tenantId: '1787f2da-553b-478a-a053-4391096a0367',
                tenantCode: 'n3swb3yqsg96mwa5hriydl3mf3ye7d877q9kj12ie8o7fk0ai2',
                systemId: '1abcd568-4333-415c-b2d2-66cab2e5f8b2',
                systemName: 'tj7jktjy6gzsts2zelgv',
                channelId: '084234c9-60f8-4fbb-8be1-73fbae827d7b',
                channelParty: 'cx3u852vzmz1yk7mog30eab9xlqm5h0wqmltvryyrsl57fhidz0anxfpitq2konzzhl3ppj4nh7p9smjqixp5miljjs1mvev8sx6oxg8fo2dyj5yts8rly61uk5q3fpqamc0kx7vdraf52z9w1wwypxtp5i5pqxe',
                channelComponent: 'ljpfksutaisq05srnfk3hfuosrsiaefrf8p2jlespqk93o1woq0788ikydi8xyw7vggzkpm374x7lqsd57farkrm2mgyb0joc35sqp8usogif764p9uuhmfab2h1urcqfbce7m9pbinjcxqcbxar5b123hjsvljl',
                channelName: '09jb8khc3l78u7lmpwfcdo7qq29xaz336znhfrxqom2ylkiid435jpi7iie2s8djjjefskjxwd63mrw96tf3uwde69xfk713iqcx423bno4jgc4o1400ugudxyqx9z77szav7mdxj2qmx835z8kzo7ubexxcs9ja',
                flowHash: 'rcscm6nzj01isdsz4vshkijj224nnbikv4c8d7cw',
                flowParty: 'wgr0rfn03l59do1kvu7amjgtb63rrdkkh7sroiadmvmcwfkgrx0wblmw14nzkf3s11ja0s054l45j52ej7klc9az82jkbe23xlawh4i02q40cq5onfrabm1boaletou6ery7gjphap8vx93rxwehddktpqalkhw2',
                flowComponent: null,
                flowInterfaceName: 'bns0zgi5fuxskjzxjxgf3dv0kxq6gs23i7kwvth3twnesvcl1sxpeyv29689i7if1krcv8qzi517d8phvrs0j0y14sjzjjdy25lqh9c1f5e5rhv6q03hb50w4mk05do6abagt2emoeak6vze0hq5506a7hsk0pb4',
                flowInterfaceNamespace: 'p4vz0o6wsou33j03awzrny3utnwshydj0v4l9koia2ym0mcjxlc86ajz1qyhkxq5u3wb1ibg4vurxvbv4e3l2e0oezj2yo4txf1usebvte9uj5x71qvoso74t2kbwlxaftty6gvyxlb43kqctfjmb64s0lrbossb',
                version: 'x4k7zp3anm5ze0ks5slt',
                parameterGroup: 'sb8tx43juge6gokvyo9dtwvi4s1fhuszw3esc5qu6tmctnuotf5npu8f0g8xins5wnqxzjxs1hr62s0c55brgwhdftky3xlbj8vfgr6w0o1l7illw8757gxkcwjd196ssooznn2a4mhqi5q45241a7tpac120356ifs8m5k60shmrv4p23btem417zwg2du8qed8xqm9mj54ssgxm7srinqo2u1movxtxn07dsc93bosrjtlbgk95y0x107w7zi',
                name: '0221nvpwh3r3xwbo0ri9nyj0n4z8hj481aa59s1luz1gizw95eju00b7namyebtiew48rzgyqfg22hdawzxyv1sv57a1vsz4la3b43169zg8epmbwqrqmfczr9ametr24jdt3j5o3nizm748tkd9diflmhp2gxdyvynrxkvc4hnxfe0bmmes8s199ca62zcmrqrn3x5mjw7nwneo1zxa7wmprj7qetfe742l7c2poe1ah9bbhdohmht7ljziriwvmv2bctvi9wa4jbr84gv29m1f2cd2m3d0yq22bq7zjjqa78pauehjdpx3k02nzrg5',
                parameterName: 'ldnlyeqosohwz53mlrrujkb2y61bpjik17osddnqh8rvyip23qo3o0upsejky6e68g182cu8q7fc8vxy1nticjs16dvc6dzu87fhdyvrt6aoafez31ac0ljyy0e2gwp6myuri0q15xveb7hrv9v563zi3cjfnpg0qd0cxxih15v8ldbo3urpapfvj9o9wh2m7kofr5rttr1t8q7db5aw70eyqzyv1jtx6wnlblo85wozb19yc371r44768m1l6j63pjqvzhnjcn34xscy5taxc9nxaib8q7e4xpl573gglcsufld1ztgm75ax9yu49dv',
                parameterValue: '5cquiuc4qffq7xxp0ww37yhzs4hd97xtxqtbs9pkylb8yo51i1jgms5ngcza6s850pc9zm6ogxlq7di9cf7m33q2velkqzvgp94fb68ah3z6vctdf00fya2qh6ny9bgrwlkwyj3tfyh9ppd7xrbwgy8y09dehoa2j7yjmq438o8uexczi287o37yq36gcltiqmj4kimtcvndg8cwrt7j5ynjg4vgwaxxtb67ree1n15mii2e177f4d23as5i87qpro3i8pj9lt0ug125iwf9yc8fbjp5nd635caj4vpbmd23cv9gcmkthve0sirvvdxlozu2b3o0g480m1jr6gbc2uqungnhfb99cdkjia2k6onb9d0r0uamj5rziz03bhsy8jl69ufduan106p5cejdkksnagu011nts6be772ktxlpcu0lxbsdlf1qj8jyq90jz72pws8ppoyxcdzvexatq8whp1xxc1b2uw6nq9dr7pj199aqbouj5hk16qyhb5889pchpwcoirm7a8lfa3ocpuxoktqgxw2vw9z9jqwexrtxs0uuq42uod2ex64xc1wjbs342848b5vp07sn16qzs67qbuisvajpda3kc68zi1lxo6tn98h7e9dtcrhudvm236ahkzdb9qzam8hwzldxuvo8ld0drpyh40flphbehozjesw38jyrqrcshjv58s94ntpg0wdce8lo0cv04q5w83pnxm0gpc415g039j5x11zik1fcmtvgzt8fx9hqo2gnfljhottxy34nc7er7hiqkigyuv5llsc2i2yi8rpqe66s1ea20qs7c5tc6wfryw582hdymxv24wyxj3iwq4sv38otob0785wh0pdx3ol92lpmrthyykxf9kde16x2b313qqb44phzg0d566u98s2l26i5jl58z54z9irvk6fthq65qq5rt9fgpg56zs8axhl7lawexjoj8yo6xf51fbuasywhh8pg30z2ryv6nmdfsrv83f1d2d5k6bskke2pbyp6',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3',
                tenantId: '1787f2da-553b-478a-a053-4391096a0367',
                tenantCode: 'tag3x6f9umjpa23tap2pctzbghlyde8wjqgk6ugocitsjbyuzn',
                systemId: '1abcd568-4333-415c-b2d2-66cab2e5f8b2',
                systemName: '8me22alvmf54azwwztu7',
                channelId: '084234c9-60f8-4fbb-8be1-73fbae827d7b',
                channelParty: 'zwkqqoug1cspwvlphi6bdhz82fxh18g4kxosj0lpw45qyuzhyl6scxuz8hsputlh2hq4p89e1y1f0vgi476602pkg3yywhfu3qmo6s3kilso823uziy08vdaq2df036jxt3ccuszh25aac3f774c6n6htyz366uq',
                channelComponent: '6239ifo3fhz80uithxnwyw5vtffytcc8i85azt52pddq88bdvwjsogixyaqqy98nyp9tmq0skg395yr4t9t1dxaabnllceom0mg6cdzjntrghxdgdgmsx3qbcyzjedp8moz5cydij1jvv0fakwd2p8ngmk9mktli',
                channelName: 'vtj07chj6eedbov038k14heofrkq699bfteu09753vjz7yto0pk46ko1qia7yhrm685qj2p5fo6tjkew1bg87v660qt969emoaszj9vq0xhn04w2cr5zq1jol8uafd9cyemboydr2bzzgznrez1ouy4rcbpi9n90',
                flowHash: '8uobhjg53qyhsgcd1i0xklz6p4zwshu7eofsi56g',
                flowParty: 'h5lc7awnw686v2bxo922sths6atvkakny6x2uykowmiizyz04ba30l1owpwgp52f0dcxlrhtskc4fqt2f67q0eu28hw0fgwodxxqr6e7imp3xj4uh3fvdayf2xu6iwg213c90cfm9hphcwn09320ttcsrsec85wq',
                
                flowInterfaceName: 'pazpfbwvay5dlv4os6t2ljog18fbcs0e2k66ftfrhs1o1l8i2kznss0eooz3ax95x2kofgsyyxpwglmd20enx0sfl5ers1rpb8r49w9hsol61vpm4p1a4krn54ztd232ijy6ckvkm1obf1221xcfcnqlc8flqsd9',
                flowInterfaceNamespace: 'uew98j83cb3ywlfmwwshr012jfp1x0jucl0igxlxkwq4qowi5l7ter7hvjundl6iy1hurxibn1zcs3o01rjcwlz3r16dpei88j9vviznoe3urm6rkql3dys7lxml1big8mjhf2vnu5nphlbgz5bupm0oorgqi4z2',
                version: 'zwpexqggcyxxcxznv2t5',
                parameterGroup: 'qt42k9lfud3edzj8xa5ubo3aezkpia60thld1yspub4ei1bl1vfa8d1bo7lbj17pp116zfxie5bpu8fr66wniyn1mwcn19w3v9391cmtt0uc7t7vltmj0i63hyv8j8ktbnjs7qbdycbehxdxaytmlidlp6f45pr9pm5rsfod0a5azdf9c6gnognizfgwi8idurrnjm1w69o5p46dqmz9f1wg0lr9ucutnyokhfcwi7c08ncbb0b5wrw978t60xi',
                name: '0ogfhztyutnji0pszdwne3l3l0m16iufj4l7t82xnsqga4sbwud1k89bmrblewz0a2mudzl661tt3ogcwgixg672h1lnlvptah2r4pxlz0yzbxq7aw1y6ezre6a752bxsvb5wa6epon46308eter0itjrmiozxomqvc7jlczpihd5c8u2362syxpybefs94hfcdktn4yfqafsdy2w2eq00eoxr5zzm61izxzikx7vgt59o7bfpou8ntlluzavfbs8j4gorva3yc57hps93j8luq020uagkzj1mieko0uwnysi6wl6zq3co3kh582aczz',
                parameterName: 'd2xnlfiy279ctiivji4ggl27o7rjo09tbiuoxbnp6fedb84duuza2j8sd7v6ccxfadj1xlmpla5qrd9ys8qw0oydydiuxkvgc9wp35c9lcr01hignxz81mdr5lgt82njy6p2bl1etaj9ey6l2nx7jhdb2a64rr55keq6hz2ftq7t104zym77gelt29ageq0bbluqdemc5mtgj6q52pt5rpvx434gu7gue8izrd88165dzubdd032usonukqo78ejn7qob0tm4pljtg9iw0crccb4kibaa59nq4sl2581onmj067g9adjw16autwnqrfg',
                parameterValue: '4hfxftbqsh9ydh7pk98dit56dbaja9g4q76qtcg4azn232quvicwl3jhlzeuywipbwvl1glffdad6v4c2nasdfdh9k1jvzyjporffblyonc5koml3uruyrt72bh9sp415rw24djjsoqtg9lim7x4icv51v8tc5uz846sdus113kmu46nahp1a4bdvbtygrs0f1gs3pln082hl5u1z21w0lny7n7ajwo2ctiym7wbrjbadxzv2vv06fpd65jomdnnqn0t9nycsfwbrfb62zrfdlxjv4flrlvez0oqndhciyv454w75gh4rcrel38p3wxxwhu1w92l992b60iz8jmxtqo70boidjyup473ouiqljdrz6sr48ca9xh48slnuxnnmvb8a1bjrhcpx0nsyjqsxy67tq1jwokkx7go3mpet50v687ah6apqk0vw84vf2ct8sql3ih7rn5jgpdec8rb5airysaa2a1rr0qcst3c77r9n669fp8bxmar1betd58g39zfy1f016yd8ggkbecwn2x29h7xpwc0k4o8l9grq6jikybik2gh6qr8vfotnck8l9nbw86aewu9qx4w20pg3puzpx9j046fnd58h7rbwdsogidcnkfj58kxhptxjm5t7p1738tfrzsohvrhqkpsppixgb48isv22diuf4grkakwf5zcbonefrwhcx1kdby5q41v0c7im6jb89htv5fzifnsus4fmqt0i6mjmijq2ksq7f6kf7txap8rtgtr9pjfv2p1asi0dy5d2iqqhxnypx9jxlzvi9i4tmmpr8sj3ncd72an1bdkimnr7ct5hqjc198dk43hfmtz43q5wlouvhiph0sedgg2x3pluw7pxiq7nxvm2chryy3x7xbf4ifuah56hbzm9zmo2g1ovc4uch686808z0f42momo6m2h9z5ze0pvkafolk513obllcd6wgax4cvktl6yqbfy7410lpwnx1hinnv3bltbr111a0rn7xmf7oassdn7vqp0wl8',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3',
                tenantId: '1787f2da-553b-478a-a053-4391096a0367',
                tenantCode: '44q812vkbjv8ivwy5ziafj1x4qhl4lwmd1xlp3p7ljuzxxa4ve',
                systemId: '1abcd568-4333-415c-b2d2-66cab2e5f8b2',
                systemName: 'hsmllkrhkm83op99s3eg',
                channelId: '084234c9-60f8-4fbb-8be1-73fbae827d7b',
                channelParty: 'tomzc06nh7j8uyymwgx7lsmhxj68t01fhfn23eaaherr3aefsbymznrw7oxzmceqp7sb4p5s2pu35lqzequy3x8w5aejsyyaqqbyrbbpi11gzztzyrf2cqltcg4lilvoldp7rihngruklexyu20i7y1b7f5200dj',
                channelComponent: 'l5w2ikzqgv3ddd0y2rab865pr290pl0osgurkul68a4trvye32hxx3lxi72mv14xpmsduaiv29dolnhzow8lapyowaskhow4105rj4ourvvqkqu4z4tkasahjdtpgsoe2is7r0svyzfjcgzg3ghjlmg25o8dtz6l',
                channelName: '0bodbog25wun9v9yrzmwe18ld0abl3jrz2wdlayuutpxzd69wfnk5afbmtsbk223nmflov98ttrlseu3o94zwbxq1qvhbom9e02kocg4du1pp648am8y1bqk72wymjy3kd17msl9wt8yerlnlzs25j6x8o9asonv',
                flowHash: '9rt9ctde4414cfw489f54qsdwacxu7gy2o5xqk46',
                flowParty: '8ruwlyi3iwcu8h1vovxg0od9g9g57pvapdb6yqb5sye3m795j9hzrutvvv88kgfyo90dyvjpc2lptffh6ac153vmu3mn16z6g5auj2hlojep5pkbevqyh4p17krdg46fhtxrkhcfiehxcdry0ed8fdokdm1q5w9b',
                flowComponent: 'yeiduft0s5632qxgn3wbvo5d8ca5m8pidl87utpxnsb0lc44ko5g0qzfqo3t9oud8rjemklw9d2alp0gtfngqqwlbirbgyu68t7jh95tnen62fv8gde98owvbyeqh1rbdcpftgviier23biveogqt879c4bmkxlr',
                flowInterfaceName: null,
                flowInterfaceNamespace: '0hybqhuxbw5agbiua9oeclgr3f2ijb3uvgahv4133wmpulpl8j8r61wvym73twqu6ab6yl8a4pzp0npjmzud1o6wynjmwl6eikswgly3inebl3w6rzar2oi1voh13hcdh4407vlkip0r3is6ww43bt29pp84qeit',
                version: 'vhabs0bpgt6ajpnu6jvu',
                parameterGroup: '6qt5y34h1ppmvuoqxnekv3s0pn6kezkbz4te2dt812zrwjivdzltiw7svc3zx8dthk1eg1vssmxr7etszax2ftvobkmg57vt918kfmaocgil4b80a63d5rrpbbxfl7ocan533j1a41n1hnjyj6z01om645sbn27kmnjrfnnm70urmylk6wvvibo11zllf65c434qx98uqpcx7zkljmeopz52wdi8zgg3e13w8vq0cjn15yjmuu3lbumjechy279',
                name: 'cnd5fovzwfsl0c8su6p6aph2gn30bv1p01pi56t8t7jsexq3vrnkj2kzy4iiuxdndeq3wldudavrjjb1dllcyd7douxbqwnbu428s7ifzvl3isr5bwmeq0utzbpkhfybr0a52va6kzj0zf741ku5803zepnqpd1oweydwbrdh898qud9wf64qw9wt4sdv2b5wn0t7r23yla726afop8j7dj0iak12726qi4fvq764wu3i9wflke9dfjtuf7rpjxuc313a1g5tlonjwwdcwuugb9t6oms60sw5jtidteotbyfaxo7bitcvxbzkw3vviqa',
                parameterName: 'f440wteqwk7kel7qrj1tnepap95697i6fetwucn3lphtejuttjl3h9hwdo6zb4koghdnz8bptbx0cple1c786wl641ltr2kno2oiel3ldi3uqebcau4yut1qunkhfnfweeu1eqo74eh4w11oo5d9b8d7ipami9gbhauhlfwdn7xoymc1sez31rvfl8c7z8ob1q9x30akmeyka7xb89p9dlyvpe51z96k7mf4bq9zvea5dkjkzb8s1zj5iy5deompmpkxgxzibwznvfd7vvxh5inqgc57b3ol2xssftbf8dfq9oliunpgmabyxccqycvl',
                parameterValue: '2e496qjup0j77pj893j5jvuu5dddhra5tghcurjc2fzl1lezgsgumznxj3eag5htv3y9giu43ofzs09yx3izyggihbinu8h48nma6bq6z1gr7stp8kl2gnh7igis3xexu35ie24m01he7os23lbm7c06p1atr3mez5of4yv00is1um5mxovaaznhg7v0xg8e3no4ycyy6hwosjk073b6nj3jpsqae06ze2t3fx3lc9mecwd0r7osjav7nxr8folzbebsfq8cq08ldwxdjofoc7l4em6h349e6si7zq9kba9cphkcytjhzekavxi6tgjc98rumslajlzl48lmj8gh41i1lcfe6awl69mufwrshlido6qrhyhsvxlnpp37nuj3so0ct1bdx49mvnrq22jl7vstl6fd6oarf89wlx8x6rakq0mgdyotv9c8x7bcyb2z6clhi7e9j2ajod7hgw8pudi4a9djzjfco7f407puzvrnoux64fltgxgwqy2ju7o0fwkomlbhok0rcr7ilev31xywft3oajgojzar20p80mt6pqtb7sjo2kew44yqz54yjco2txvad6god34erhvi9u6g5vn9yaatefpuc9birofg8w502r8qqmd0whm5a4iq20iajee8ywiy3xgew5n37qktts4cc40cnyy6sk4e5xjdlq8ggz2a40n2ezblnn6db9bd3xifbi3n3qu5zugesqn05u64ztbol6ylnfhl4aovlupcm9w0m8seyg8o7lz0ekr2auyxko0xbbn38csr0den2r9xq7iqpzvdwqf6ps4mc7iv03zmsjnxr885qu4p8yic1z8iu16ioxt4enn69jqrr3s1vnd4bbwxbct9zxnxf1ys3yy0ijkhnv73n37z1z5b27snxfva7tfij4zq6nrsfacjl16u489l7l4e5a0zl7ovy2kwhf54oc73ixavws7psmzbnwlzgbekievbcbvplds1ggsiytqkpn4kq8rkfxfqpbhxmqknuh4hvpi0',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3',
                tenantId: '1787f2da-553b-478a-a053-4391096a0367',
                tenantCode: '6g9qrh86tm2vorouagdvhl09flbnukefwbc8z7bf1k3hkxofai',
                systemId: '1abcd568-4333-415c-b2d2-66cab2e5f8b2',
                systemName: '0rp4jgbl6vf2s0wok26q',
                channelId: '084234c9-60f8-4fbb-8be1-73fbae827d7b',
                channelParty: '15k2q9j1587j010pn1cofstcqjsyco26rg76qvppb9r6j1d2ckt0ur9uie81lxzbw68rbu2af2dzugnmsou5a1ojuf7pd6g85exa7r4nbw9jwwu3yby9yhwgbkqx4j2aehg6dqh1n7zovnx4tkqp6w2kjnckl7mq',
                channelComponent: 'lhsd13imw62tuaoxyc9ms28nbgitn95fc1ti13bqrpkd3yl85hh9r7zrztaz3xqddp2sbki0wuo54umrckl7j4pz4ytpx0pw42ch02mqd3hralfyhr2rhkju853w4jqolqprrkm6ctsh58czhqmgzjpvk956xy8e',
                channelName: 'kzg3s8wvtjb2eniw5m1cediwm5zjqtd6bmzrmleizzrwohigye4ce2q5efw588l7reqh9wtn1re3ct10y6b6yrm9w8iskdo8dmrlqvsdt70mnrm5ptanaa8pmwf1pgrgbj60x4qg3i731pshqrckovr4lhug2wbj',
                flowHash: 'o8ivfh3ccbmide50vrelsa4m0sskfeaegmgqi7u0',
                flowParty: '60woqf35su5dpo9gswpqeal7n6ovsiimdik5ab5fut3f54mo3qc46hxes7byq5gs33qcy142sksi2u467iibc5hbnfn38lp94t77p7llfhuu8hun6mim939iobuo9dxys6k5ikuivqug41obsr8bwoeg3pr4dn9b',
                flowComponent: 'fyxvc6eblv9hjb2z39tphst85s14pe3o3yi5sss0a0xtqoqk3qzj0r6uxnwaxoqiqoe6w7mb6lpqtme5eqes2rwfml9zgmhkm0laahwp1bvndvyd8nln5dhsta7iyn4gjktnc782uz324rguwicc3akzksi4d3iz',
                
                flowInterfaceNamespace: 'eeo552g15jpwc0uj8lr5noy2thxn3csda1uvel1ethbvmpqzgdbhn30ax13ug8kh0um3y3u75xnel8y1dg40bjmw1whjqbuo7alrstwewc3itvu7u6lh4sjef0egif5d8twbvqlrk2u8gs7wlhjokoe5j7baqca7',
                version: 'lfkdx3zpjaqz8crwuz3z',
                parameterGroup: 'ibkx6rcaed8dayunud9bod1hc0vgif06mrm7aqw97ppggvxtj1y76iuh54475phvg2ry6ajww3k37i5q996682qcz9meilzre4uhflor6tg1ba4ogsb28m2mezyzi8qqwyjdb1i6trt04rwd6j3ovi9raqfgtndvcoiolhididwo11mqqj8g3c2ehckybovcrd4aemclfqzaibjrtpdo561mvmkfrbpqkds1i3ot9t39n3czrop0ybobc43s8v8',
                name: 'p2zg8quvtbk49x805rkfdgoyytjsjtfstxmo4tcw0cpjymsk2jgkamdeen7qa9cl8k62dpvqv8vg2y560p1kn5h90cfzaz93k2hnkxbopvemq47yae0go9oyn5kdbtept41kt2eakrqljtyrio46xnzog631ou2kfnc32gpmtqilui72wrp4n6zpvdd2v1elxca9ci5xlsbp574bdlmd5rrztwspx8av5y6i1d4ccof6gj9cljt18zszb8wqay0zgqwzsx78jlq76add36p1iuqxzyehcgalifbz7qvm4djqobqbd7hqdbwx8gaoxh1t',
                parameterName: 'ulilvmos06zk4cqfjvgk0jghgvrf1o6xmvw83lsi5t5ujimxde21fabbc1cszbl0vx0idq5vo1kxwbyflcdnaqc9eohhc5ufejw2nsk60jd0gdbdica62wc32vzn8eb1mfzw7dpm7siw5sn62gezqn20a0ipl8ertyro7klgbpmh6hqkv8z5xup0k4v6w0rsnea9utxf2s09543n1y5tvjzyj300pxo9vj66ax48i41tbynsbpbpc8o11zelp377pds66d4x5y0xskfs0mbosgnrtrd1g62wt4hahhgmf0l2gn4jn4shvlewiqymeq9m',
                parameterValue: 'ftngug9uv38sqrzz0qpqnwepoh6512hpno764do021eck3c90zckkfwqlbonrmo6p05ytqqs1qm3v7rkv3so842szdboq5jl3okeq8wt31ulgfsteahcrobom8zcknscayazdtzzv0lubd3afeb9511a3nwqxu5emzkeveymbusdtd9x3lzoo35606vsdi2jco02lu87nfn5yme36w73ix454u6fjuj02bsdabsspvrytyxcxuy6kgc8hbvhzhscdwsbw2og1dvs3t8acv0ty3ss7dsdnn4kdi593mfurj46jbki4fivo6cw4y9wixrum6o9wwzdq6ak5xwnacvq5c2rxlo1yftbexlkeftk4a2c6j37787scr1q5vs9ku79qr9acre5mtu95cmxvdkyhn7ortdq44fqtfdn6h7h30ljkw4srsj755snlxt7yic988jly1wlviz8d1ntxqkqn6n6goittmlzoxj0vpqd4l7bud88n8z9bagxuqkvprx10cahlqib94a4pwr63tfml1t2v3pxwkngplrw38ar8cgfpg0l506hq9c4ofgtlh3e5bdhj5j3ibujowgbdjpum7ira0uqfygb4yfahkwxokt8tjlb5l8q9w9wa1pgrctm3d2gsg0ila01qcgsab1ly63bfuuu822xmc83ukht10lrduob2fv52m54d9q879c80u1pwc6lntui1drbd9lc2sgzmi1tkvvw7j8dh6jo90vpks117zabck9sgiks3oan5d0p02u9v7o1bb2f8jh9vicdjaracpnthzhtyw9cj1m4o7v7kigh78j77ciiy9fsfaqiutptlzsjkns8r2wssoymabv3zrzrh7lpqpbx08hxql3k240putki1sbpmat7pt7hw73jhtli02t1n76v5ry094wbkwdk1gsvjgx91eblc6aumqzwufuunmx97lesgfsivwl0xwrytjqjn89vj7fzipyc66uyrpyi815nk9m8iz60svk7pq1nhw4s6ezm',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3',
                tenantId: '1787f2da-553b-478a-a053-4391096a0367',
                tenantCode: '23dok10glkf74kjggddmcehndj89t0cxaj1aoce8o8pnsbksgb',
                systemId: '1abcd568-4333-415c-b2d2-66cab2e5f8b2',
                systemName: '15g8xojacufjxnyuyy4n',
                channelId: '084234c9-60f8-4fbb-8be1-73fbae827d7b',
                channelParty: '1nlt2snnwdoo5h2soc82m8ljclnq0yklhiy1ooyvkwhdaagh9bd8umdte5wuhd1lcl8ddrvmau3ayv0ce6rbog3elfqibjry9z40q5mx9ubewjd0u682uizj663o80504bahklkktl1fdhijcfq9nw7rlqyidovv',
                channelComponent: 'ebdtag2mv5qhvht60y5m61ehs3z0cu8mr58r395t5xq18ocvjhba3utoa3r5arbnixrhgbq10ipg893bon4ght8wf54ph4xwtgsltpmuckdk24l4cwlx3x6h3snjwhfz1vyq76x3ogcz9b4cgvhiq29x14o5fxoy',
                channelName: 'an17ws7n61oz601vdxs7lfnl5ygjl6u42xvuh1pj750hw5bjk71d9o89yvi3hjcqvgvhhxxi7va7qrr0giipsij7ugciyj6u33vi6qkk8r627asfdbaeoxd1xpbps5uvl8js1qd2euygslbwk0kzuuak052623d9',
                flowHash: '3rm05ddkuycy9cmp9tvntgic5nl8jhgomfq1yiel',
                flowParty: 'rcaoclljkkiixk6gk0alisam9h5uuwgd6l4nknqqbie11tgune849ww39na5w0mjw2l6545e50ok7rdkbkphu8clkocatwtfyha2yyg90ux8qr44aulp6gcbhqw06pxigsr6hh7spds27tl3dp2nq3tj07ud5vjw',
                flowComponent: 'rwt1dgdf2p1k33xmm80vltanom5ph4n8rhxquvx42m0e9e95p97s58qsanwqi0xj3bzmbh73trwpcu82k8wcfqvsjnqljt9ea58m1iu84t4qc8gqiwywied0wq0rrc4p4wrigq2a6ho6ie0oim23l1d9ga1jwtz2',
                flowInterfaceName: '75vd5fkbp7vdiocjzzjxyjcm1x1y0s8eygi0x0zu07cgqk64ggho5te70qgfjjyyvspv5i09m4gmu92lygkl9130etk3x6dn79puumuytuhzno0ev9zpit73zonbyj4rndu99hbdlrnxykl5avlsmv3lmwt5ygsj',
                flowInterfaceNamespace: null,
                version: 'fninuk3ms2vovagcl57m',
                parameterGroup: '32zoiuyq31gwg7c8vnymes1g06kuwljlu0ufi91eoueqtqjv73b67r1b0fsgqpcgvqjw1rx3t2t27dwkic9tkyv07x5j94i6b6jdpmw5adoxmhq1lgodidpsyiw33kccx9u3i3axue1jnq3m56dy2t9rkg3jsil12h8sdx22lmmlmp60kj3h8hc0zadu252yjsz77xxs644v49ww8wnecvvcqpnvja50olzipywukolcocl349lauj9pdb0p7zr',
                name: '8ep6552dhd1w2ju4zd6m5th9vvyzl315fb0r3i1tv1oq1oltfm8v6xgzhumk34v3mw84tcjmoggmmbhwb6f2d0kve915ucr3dlgze789fy2lggi0ddmvm1l3o3ld77lryer11evm8yu22k4ikrk7qzq207ww5ojk642vpzruscgt0uccyeiicvarfdpygqdmdhfafgn1npd4mmcg14yg1sfhk3m5n8vwiycirmqtnlvd6a21np97se9oqa5d3jewfkpyxt7hyk8vojjzt7b0iwst3tsvl87qc722ekubjbl509rj0hc03aqi5yyxf4yf',
                parameterName: 'eaupshubxcw7yzkb0a45xit5p32ggsd0f9b038hg8y8pbcawitysngbnlcv689wc5301u096ggsfcay14erat5pgupnydty4st1rqst7gg5cc4ya002p0vmuipp4xvqroc0hzz8xxjqa3ce1mz4i8glp4zuj1832yvvpp208ot28i8d0l7jqf70r1clpdhvj8vabjez2kw3fceg2wg7wcjqyz0jte0jqstn5p4m6mo3gt1pymcckomnuyr1hvqpy7ifurrwhmcawsu0kugu1wxy6m3x4t609dajow9ajuo1bmttmyjt7i8ic87vv173s',
                parameterValue: 'smmk3kg6cs5x5xtb3yabrsilqlf766zbu1fmson8dgkv6l9pl6whdnt958bcgg82mdh11hggxauzwuhrkd6yh619wwg6opkg61kn45jqtjeowdp6x3lpvqw0he57zqwxyatwwxpegtk9qfryhop9g74gx7lh0d27px3r6u7op9i26qgpwzmdhyr5dden4rwbmxwder2ux410ag8ulldpg8etmd68ps6699g4yt3t6hdt8ulrydcnbzxxroggoon4x2pbdq79c1ftwqfxj2ro0gkhplz0qwu4eq96yx3zz4qe7qjckf1kqm84ofq1s8emii6miubwdlojw5k09byl7rx7ehy0pg78aqg3cdg5ankzrseij77a9l7zvajl60hol25tbjgp1q80pd96noydg0yb5repvq515lkp5ln62qmdapuqwqhrne11ki92i93j6i5hl1xwr45ot3uym4t2cg6dcf7cvnixkndlv2ba3wtz7musyuviabu683dqhpubq4f815qojaer9mrz97ah3ofxadafb65t7lav4s4zrww4old8as8uwlf1eiubzybyapp2mp1ejz5kuaodxmqzm05ion86ofrycn7hl0n7zm7jrrcaoev6olob7r9ua8t8v1oy5yelhzo378y90n458kh2lcmhd3bwk02qro5ob5e9pxv9ahyc88j74pk1d9f008s0gto57ek45x4wp51vh0ncht4dgbycs3o534r4xesk16vkb7vie5wo4pwaw3b8nj6sk3b9cm5ev4cfmxstfgpue4bcoig2bg2shztal84mt7ik1z8358xh1alnkpiys9bmfpt1f6n8n0xo7qrn8dafhcsdabpr7c5ucyb9gu5xtooso4bl7adpwk8h1xmag3p8itny8g3onjitjld0w3tnd1nwr68h2kf170dt4d19tsp9hkmkd9edp1iyjv49zzmjtsl95p1608fvg1u1f3xnqalbtetwsuc6a75gi7oyy37yy6ow81z2c96e0xlq',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceNamespace must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3',
                tenantId: '1787f2da-553b-478a-a053-4391096a0367',
                tenantCode: 'cvudpdtvx71zfg3ypnh5ubpmk2mir7b6yvd58oivotob0f083h',
                systemId: '1abcd568-4333-415c-b2d2-66cab2e5f8b2',
                systemName: '7pj0n4g27klo4g76jnpe',
                channelId: '084234c9-60f8-4fbb-8be1-73fbae827d7b',
                channelParty: 'so0xswjomgpvwfjcwqn2ips9k7yef6hi3uhzjyrp1x7bnhmocpggs74ct4a60c5616jkpgz5zddklcrsncbzjngev2jp3ih873mxe9jg6yp6j42kqod6z2jb7w3gqxlcaekl3gxqxwwthuo950n3vqn2nsrbujj3',
                channelComponent: '99ph3kwur53tp0bpad9qa21wmte8boz6c5ng7rw7l4sxxxbttc1v98qt0x8clu6pbc90tbtikuto1u9480t4d3qh6ygrwxibw7qn16zjzjscejndr0k6gvznd6s0ogn2oj5sk3v6gtmkeiwbepw5uy712v2dgo0a',
                channelName: 'lvhe1v91jwwv0hrv4bcaw3lfkbayus2wojlr2zibbzcpzwhhd1bd8khhqf0ncmcz4rfncsovd7kra5ocxu48aaaz746ypnr1dnmo1q5p1ssomji4bcdhzcdqnwpcun35w0ym3et48z0bzv9t7645uhyoxu7kad27',
                flowHash: 'eec53lmgnu2sw5jm7ogfd9gktvnjqg6ojff5w64n',
                flowParty: '69juxudur0e8ce4zsuzjxpkdogurvf4pnux9wmlrgqcygc0lng0gwn222w14m2jy9ftluv6je3drefui81elgq3wyr9ds34lzin38d84xjbngfpradogahe0zng28hzrnyk5z1yiyqdvcfkjtwfxdoz4qzjx1d62',
                flowComponent: 'se5fikn068vrb3gl699x5fzlwuc8l749wbvu6iot5ooykfsimunbp9lglfrgmpti9s0yrycchg5gjot73nxe6sg6z9lgj2vfoj5id3mnzdd5z6nt64zh6waylb33sprqxsatcfnddtx4olswprnyl6es33543la4',
                flowInterfaceName: '6mt5e3nzxaty3znofssa9f2rcs732y53byf9r4bzuvxfy3orzxn9co0e5n7w2d9qwdbuzniu7dnr0ad27hebarfw8d9cf5sqy85sj6e6h8zec8y5kafazfz475eqat5ccia9hb89sgrfrvijnudkinhvuh7j2gpz',
                
                version: '4fpzl6ntslwlvi3t9mem',
                parameterGroup: '1ho4w7c8gkxv6cjeiuvnxzk5rs0ytxlj4f0guqsfn5gwpjluonuuegp61qn5npcnxp9gq6bd2u1en066tob3cbaszoapi3hioa0yhya5209m0rhk2ghtwv6ja50uofxu2wfod2jnzmkui8pe5o8p27sswytgvax2uoi9o8voj5sq68envvgfi11krbnkypdtsdmwkaowmhmj2n5rvmyosw94ofcd564t5rpkvk4fuzdm4xmyljpg2x6c3xyqxtl',
                name: '4roem5ufquea8mqaf18ct0vj7ztifpexccyzncprtqx6naf0w3roh3m05crpdlt0b6udevtzyljuanms69ozdyhc8w6766y1s0zsez057o2jbhdteslsnh9tj5nqfy2gwy6bxy6r6qy8p6ueo5twvvkr1g7gj80v78o4bnt41gv74ntn3qrigsdss549sbe584yltigt0sy4sjr8j0w3t2cbbbzolm8iwg1pjvvk569yxl45g85v9m9bgw96ok6im93zaxz8asocul21klg06nq8m7ksj59e3bbpl3z4z6a9yvnixmwdjzwlvburfbue',
                parameterName: 'k6j0gb1zvzs49sl0ol6fyd9i31s26lhuytfjc2sl9bziv1051a7chn1h0gkzz2xqjnkjfxsgz160wwi6fpd4mxppvtoqkfub6g8gz6lvadf9xwsgs8j88yutu5qtmnk65gjj5jjjsym5i3dzy9511bglast9l3l5k54spy6xqaopxoqiw1zwtopde4rova5ndovpsqgy3x3koq93tm0fursjtzevwzb75a7cbsjkzx3hx2bixhq2jhsxb77diiimsl4pvox311ojrw25dx44h5o9v7a9e2g4hrjogwsqenyi7n0v3d1irm97bov5cn80',
                parameterValue: 'xq4vkbzaft21fd0rrcrgp0anfm79ab2jisuu8cre6kw767rbp7ahbtj8g6zedb8h1am4293ukaw21pavyu5o1f9fr3356rn0b01v7aue7tov2th8fatroylzqjb9my2ef4xruupa7qcol5k8lyqn75ixln9grqnkf2iomovnzs339dg171idmk4kp2mdyywcwfegsq9ujwdqvg1145t4dlh6u1b6cwq813gn3orzqaphs9hj770m16ykph3lkbd4pzx6cmkcz97xhjzlzxygpykqymcf3ohcstb0gs83gjgtro74m4akdk4cqcyq2eyaohkikl1vpyqgwj8qk7c0xiawbkg5h50131637iko7ig4y4a1off6s94md472bavosg8xxty59rgukpcyjvdmlaket6xyos93p9tnute25z3rgnlccu3alp27dydac9isdc4xq1fb9114buitqyyb7llt2n0yv60g5m55m23zzviuk9cgovdlpx90dk0bzzhx3ni72lio4ixcf04hj9cwfsp6etr4nwmitcebgo5ikvqyul9weputxs9e1ynv2dv324rdqn0nnz4kw78f1ifiowq4ebi6ucfqwt07gndo32gt9ctcro8wiu84kjz3hs0lpfx065v14aqiwvygls2p6lkge3hjz5pmjl7jyssmf2jz6q1kgur4hdv8ohzgydzjvejjs4044fk14nor4txbauixfwezkq2i275i4rtv0yet43nbvtipvrupwgta17qio7gazqcey5q9xez41sq7c0bbdvcajvea55c34tkc8gm6f890tu8lphi6617wqrkdyq9occt3q4r3e6tv6l2vpj0hkrlzgtir4ryy9vuv3icu2yumq0hp8reoyt4tnl8noool31gkkzeadx3whjvv7vy9pm2nz2d3kwe8s0gmmkh7dy7huzd5hm3jz301wuyz57jmb5w2k8e9pg2jtjczq5cd4xo9d2xdume7kwbbi048sdjr5ydyziylz6u74lh1',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3',
                tenantId: '1787f2da-553b-478a-a053-4391096a0367',
                tenantCode: 'n09pv34ni5uklgrvep60l481158oyosdx47lyhtsa24mymzd4d',
                systemId: '1abcd568-4333-415c-b2d2-66cab2e5f8b2',
                systemName: 'up6z0qiopgrugeje2kz6',
                channelId: '084234c9-60f8-4fbb-8be1-73fbae827d7b',
                channelParty: '0h392eb99dkmbqgv38h9fz6lsoy56pc0ocslk4tcco8kshzs88bni07tc3ibruozfk5o7r0bt0abchqk5pnbwly2pvsc82c2coufqfjbdfno7jrbrum3g901nf6cxl1k7qaeautmt9mi8kx4iv2ujnh72anlxlob',
                channelComponent: 'br9fm83tlj75necvvf0nxg09rxmcdlcc8pbzvcmrpfj2t03cd60k42y7yhvjeccf32lrtj665g01ida23d7itptscv6nm3xyxveffxswaonydsqa3wfl8qavn2xn34byhpurynlp56c88rfv2sz3p0h6anx5l5f4',
                channelName: 'e3suqms6voiry6nyqkes9lvb1nx0cmu9q8j2i0g4q0eybkwm1o60nroee7chkznw7un41d76xud49rcdbsnkgwrk0sgx79tvy0injpwlgv4ogftgdlf61atqsxnm7o31rd4jv0trzawtr70hv3lavf0wnm2noe9a',
                flowHash: 'cwm4pa76r8pdri895vn7873dsfzqhpys62318f9w',
                flowParty: '0ct6wf1gproop5lqoacnyh0gwg911e9yowtq1cywxeci5zemu6vkmkr973y9zaoymda5vd89kh60nyt5gwrxwp0mk7zbod0pdhop3gmq30uk9o04lpx3n6pr56tftm542eenlox8zvdszw5izqeqcvb4z35r58xm',
                flowComponent: 'zg2ti1y4fcda4a7ewknlh3zq27uyu8uh006r5lxqtdfdq9o80xsztsudt0ddmkvzkrc763pw5bepyizocpakgph8skx3z6u5d9ydw2arw29gd7evq6mbyq3lt1wkrdri87te5m99plgwgd1kgt6wgucri8wvn323',
                flowInterfaceName: 'joz3edw8knvhz33ywql63aqrmcgm88v3lj5d3bj4r95hfcz34j9vfb38v6y13e8tuxco9m35gr66p1rzd9bvtc48xpncf0a1cqweiuop2xcp1g0jl9nlq9d67e2nl4wst6towlperlxjhgy5ddqouz6b40zli5dw',
                flowInterfaceNamespace: 'm9bxfecjkt1vv21vr19teuex8826h3urkuaqvcpdrem0847tdv83j4q8surhm2e3779whmntnyirv3ayxkrndnl2yuafol1qvfxmhpqyq5dge462v577sl0od8bp4hfv0mmaffkvy21c755ip9da3ptatpz6s8fo',
                version: null,
                parameterGroup: 'z08naz0tgahyidy3kwbq0pcqu5qoj97715lobk976cn24p7u2wv3i1crdurjym356o16ka8r458txiwdahkjivaz0z61kazzg7lbc1wmxdod42vburilk9tjgl290eb3jopn41djlve0jco8wj7pn0qt4y9nt892shvf3c7iss0muyh2ay2a9t5upu66lutg3y7d7sscbs83sncut0zlbyw98p6xmnv03cykq1i456jma1x552fsvd7b76mzjo0',
                name: '6xzb64d4x4ncxemeka6yyn2qtvhiw79085uqnjo35qzkht24hbux50rhofvlthw9rky6syjz1cqldqcd136oy87qypleu6hq4tobz3noyqv54yhysdnyjc3t28gg5oawaaq76zl4fbnjwoei4akgq7cz7skduxmfs7rq1r96y2afr5rssjx367r2uar7ed9nlmb96bi1qspvsr89xvq6lr5rfmyrl388mlbgooq4s8tcluactvwiw05crpu8byf4mmn5zip4cfhm4d13snn82nfyqhtdn0fm8rn4olo8b05jeprrly8y2ak8x3yewnor',
                parameterName: 'l18ijcnuugy2yvh5g4fd1sfo518tcs2zpyu7fo4ey186zr36burjlt19ws8gq690o0hg9sunezrwgtou2ytorea1ngncbp997ru8v34317us2hilyd60hof3n4wepbgjpkyzj59rerjj49fvh2xwevrfx4h6tuazw1rjqkuj4a5nazifhpgyn1a8h5x0b3aex85yo6pxaovcgnrfb5qahizg9zf78g730ebj8el2i91y75my59yo0fa8bb9uw6wqurn2lh42lqxfs9c3vp6c4od11kpe69cy7yz2t0fq7ylieafbg3wr899v6yfj9vlb',
                parameterValue: 'as0i8sfzcs45hsg01q944bubcfmsd8bviibuplc1yzechbrwctq9wsta0nel8j9qg95c836vjpx8r25cl83h50h03immovdybdaqp9k7q3y1rauxv6czyaz43oln0h40jncf51tk3pm7ejn2pd8vu9y6f3qngwq12m5n51qd4tg7g9g3urontnjmcvcmcei0nub68057x34k0e9pwnzhuaducvit6xzbu3p6amur3iyeekpstjdj6p64k8mby6t31tfl46hrrl1vlzqsqknt2kd1y78ft9cpnvbs1whcb18wjyojy7y19qzrr87fkbgnq8n1tkc20ohdvg3r3l84ksfz8tvk7bs8cf6519ttti36a4b83pn4zc8uuc1m8w1g7k39pay8szhvs556m9siwhlvj0da3j5u42kqeh6rd4n4sco12xx1puxzrqtrffg6a2tg8k3k0isrbqslckfwft8r8g5yz2h71xp3usim8gpq2iq5ahfl7z2sn6izahke2uhhmzwb76111c0zwoq6mgxjo1mrrp4ppc8p1e847veo46q0p5fom31hihd1w78ewwuasep4pqmsx0b9w785zj3ob6qzq9tb3ac87li6ohxlbnn4issrquhhi6ix6iigedn41zkv213wu06hlu7z4twwxv1962x0g2a9vcjgd42ein3tzsxbuwdkb2873lov1trrht2sr131b5teypw6nxde8rxmlqloultepoy6lvvzmbbxrdq1fr3on1kxh24v9s80oxdlinter7p1le23hh2u5jxcjveuavu2ljzl3h7b5h32i4ddc7ojo8u1v7gu8hwvol3ox9zb5c3gnql20e22pmd0buvddx81lg3kxu2jqimkdlsk8ra2p2j57d059jet56g4qrnyzady0pmqelrfqg0hstc1mt9974bp9phzu76i27175kn8tlal4htsoqccdpoteozlyj5k38du5x3q4ffuxnnsf199jkimyy6bqly8ey4cl49w3owuzu0l',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleVersion must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleVersion property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3',
                tenantId: '1787f2da-553b-478a-a053-4391096a0367',
                tenantCode: 'isg80crrb4figh5ee6b23vu961m1ilzengj0v0b95tmoyi6fcd',
                systemId: '1abcd568-4333-415c-b2d2-66cab2e5f8b2',
                systemName: 'ae7nii3oo673skfku0wy',
                channelId: '084234c9-60f8-4fbb-8be1-73fbae827d7b',
                channelParty: '3trizozpya7j1ah9lxbutg31zpgg7cfyzay3f395kqz1g3xair4kqmpeaehi3pqzf1qjhmendywa4br7ufm0smkp22wkjl2x7yf6oy2awf6jo3sr16zd7w0rmulnps0cgw56wzkqbv5u5wr650ng4hfeovmbpb26',
                channelComponent: 'agtv8oj0zccci5j7vnkxsewfcwc8geiltgtgg0odf7teq83muvx70dtwmzlpwzs9mk2lg92o2jq5y91f3dmbh70qs29ycy64kk7ahuy74g2xc7c0k5x8ka7q7i7fhrkrpqn0aj2quyidzttxppsehexlrg6x25f4',
                channelName: '9f41ujy5kc58dlu8bpc6soy9302dzm8zz4a52apsw1cn5ssck00hsciwj39mwn5wpnjux7oidedpzk6fc737z1ufhtv2vksbyw6gtgpbyz44azs060g2266n0nbiawo2e4csoui2qfmeiw7zan8l0jg16mwo8a7v',
                flowHash: 'ru9816i3o8ugthe6hwt1iv2tz2ldq7oezzwh4osr',
                flowParty: 'lbpt0ebvasl93uu8r0dpp2el4d0nyzsjedrrjncpw9jnwqlw5amrkz0pjlkmvulyt7fdu4a1n46mmqc9rgx1b1ky7hfumamjloeh919pmt0lg0n05fy1bg9pu3mebvedb0k3wx1uuupaj5aflyeevb93zzx8lgx0',
                flowComponent: 'quwx7usfjpz3huz0e9zph010235862vqjepish2ulyrrfh3j0jplpjplfjzghavgj25ef4e79a1371401ldwkbp3ulbk93si67q9wpnle5rf79qfoazv8620t4mmd6d540ce9xjwheicdn9xzfasmyoqpxboc96b',
                flowInterfaceName: 's91hzeuukakpi0j9fs7t3l6lqxc29tgksg8siaas3dmaoh04kyvlpvgjahvxn8hol13okjri926632d7aats5dbgy2effgx0fj7ygaidrgh038zce3fu2c7dzpuxdo7bm763m0v966z3yl7c0ck5ghraiaxgi2rm',
                flowInterfaceNamespace: 'p96dv5coxoq279jqv5v374xyuecfe2nbx4qx9rwugjnw4abs5dh400b6awv0iqtp7861n6a9swqgbqjb4keg1ao1lmuoagmad9jh2inx286ynv4ap37flsqpdgg2m3ykvwnzhx29f8xef0gzj07jjbhr5hyxifq0',
                
                parameterGroup: 'vcupr3yprwz1b1e7bcfgs0v1dno4shuc9tytb3jgwysdpkc9iu89j2dteivnx8n0oqjok4iqd44de35yliv547haynimtghb312btbdmrerh67yd54kgje78j5e6gnn6l57udoqhn2d0qz4umi2gczgyexeiqj9j4bbr31xzv7nozennsqtvmwjl75xf819qhncm3l95ghc4tkqohj2ecjjk87s5htm3bjdr0774gs4wqfl6vcxxnul70lghs8i',
                name: '3dbkgi98tm1g9387z4qwz8pcj31cci9jyi0okt1jlgkokg6e475td04kcmfzdy2mjrf37w3v1waurlfe6fvovnuguzyefbsl802tlyzuh6yzfilbjssf05iscy76ocpn4f6rvsridhrj89bq7pj6w3hahpp3kkc6la1cq4jv2gyxvyrb5cpd0ph40rl9g3y51amknar06hkp1vb2h8w6d4ficok8g93x86buohyu4dt380h7jw1eknt9ohpoi0hngh93jvvt4onz7gxluoxljzt2xvv0rq6hc70j8czsk9q7xeepmz0m20jhiedy4esm',
                parameterName: 'oxkhjgtxzoqj487gb7nu15u4cmpdvje1zd1re4g3tefq82cd4bw822hx3lk8x47jzdioeyybmocp185oiawxsuu24tqmhob9o5e0earien7z85ma4v10mwv4kdxo4x1nes1iv7cxn83d7gwck4d79yvgyvkhw5163h96rw9pq0fh8to6jb1dd7k1lhgaud5roiu9vos42h74xqwzgssq0s8msoyt4uf05gv0stv8w5ebduua6dfweqwf6cqeqdpvcz065rairv9bsptyh9umnmc0gjx2b4su0g1irbluz8l6v2y34uboswox7bmm0iix',
                parameterValue: 'ncewdnwzay58i3jzob4ciycd2sscfex4d9yk2v2xdznw6o9fcoewdl3cv8686fklanm9n8hki1ztskmyrfpzb4rej1cqkbtgd2pi43r4iyil0x0hveuajlm6qklpxyjqagbxntkbzn13ba9mzm7x1qmo1dfj5pn4annkzk36dufivb2312v9f61qfhihg1vmbff35eey0wecrriiole0pvowet0i9pbv9yt5cd5vfzi1y5rnvn0nzr54elui7b4ye9inn3ylpeupkqcszypkd0xs6qhxq2lr41yrenvcj3hm66nnx2mpk1snirjhi67e4q5bjkrfb0i79d1nwb23a9t4jbo8pxpo2q1iantdc55qrp7mfgxocgpbn4cnnhgnvmfdji7mnn6bokeh6558t7a65rspdgc8e06j2b2agz39x7an8qutic5jzhavmpiowpml5ldgb5m8ekhtno6xbknzh0uup2x2qacm9fjm1e75l060xl2lq5icfm9w4duzywbbahh2ikq8kmgypbpn45mo2wvdtjin22kfmzf24cn1ym3uk69sytyx6vn5192x7qh4955lgmdzl2kd3111opajeyvpe5mow5gc6kmhzzl2mvfaevsubukpwh92g8lc1b12nfgjgm9935lkegh7zqxisswamv2ew4jkenbfisbe88xlhy27ovbio5p0o38p227rwc50sg8thvp337rapfh5z37qcikx2t2twxj8x6fzmfqz7drwaw7kiofnf6mnwgm4unbemg3oidvb2wxtvep1icqurqj0uh9kujs81dbx50okgx3iz0gs0ag14xegzxzvi2cyb5os6kd7ikjo9x3erghf1cn4u6opigmxwlbdx99robgcbke8iefesz1kxewko2gsc8jstmtdp35gf6lpv1ei9nole5bnksbykd7a13vkl788jav9nbqfac1rtbfoy5lwp75taktjepnud6xjg44fva1721ngtgtzzv9r1xh9d2scxonya66i34ar',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleVersion must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'flbye95l3h3m88ral4ngu5hlhbfksryywgyeq',
                tenantId: '1787f2da-553b-478a-a053-4391096a0367',
                tenantCode: '8alltiyfp8wr8wiwze5ixo3t9vqox7rl46ckybouitsi643zvz',
                systemId: '1abcd568-4333-415c-b2d2-66cab2e5f8b2',
                systemName: 'h5itkcio3r243etjoais',
                channelId: '084234c9-60f8-4fbb-8be1-73fbae827d7b',
                channelParty: '00lruzo2o8hqy1o5d80t95v432h8m1sfjycv829e79cucm4c8xfot29x05rwzgoes25gpekwez61yem0vyvv9w7xq5s5zi05ebartgm4idcns2al30wuahyz60td45861cd0xxghy6utck5qq9v6544270f9uitk',
                channelComponent: 'i3qg58ki64p2pnvtwadrthk4ho8h9c05x6ggijpmc6z8knmb7c8onmcgwqzqh7xx29toabwxtjw9hyt9a4vq99554exh94uhc13o5i4my3trsvw8v13zaqh3sou8c37rw0j0shejldgbsnu80fu51mxzto4m1x8t',
                channelName: 'g7w8mpi8a6sdoky0ozxvgjf6l0dnkznci61ic8f077at4jdobxxzuf99sfr1yptthqt7bf42h2ahic9ksi6kukfooo1v111w8n8dqczoq2ys6g98ylbp24fpnstveg6m83liv7bmxumv7ii9pp1p8m230860tyys',
                flowHash: '421glfhuj2wknxqf0h5v8hptvjmop6l1d2oes2n9',
                flowParty: '285pdrl1yt25dro2c1gvyzrnxgbaxq5oaoozywhio3uvj6u0t5xlgcoi8g9fymnbosfgrzxpe8f3t7kgqw34pasaevi5evrr563t27vsd136rh3kpx9zec666l39at834ubfsbvy9ijbjf4j0kq0k49bp16rhnju',
                flowComponent: 's4zens6hepjulv2t2w4vl6zpk3weztpw5hehwf9o598n9nigmtzhwpvjnh1yk5l0lwtg4m374h87f2mh6d2ndmoo25jwb2kaszl3g201u80m8lv9f3bvyfhorlhiu0uz6dew4u34y80fkxwr790zpdut9ndkowh5',
                flowInterfaceName: 'gpthb3wd1hia1td5s0lx08usewv4gsi2znziyd7p439i5e75yqq7fx1a8tr3wvborf51wafrqlwp41y73kuqksxe7vyc7e5eywclavgklo6v5vbjj48slx6qb7bd7oynqkfbarvd6ozlcqs6r0ifqioa9vnhmmh9',
                flowInterfaceNamespace: '5cbqj0b15h70745y6r50iaf2kz3r8w4pyzvs6ljy52voxdcxejlavpjfm6nl9vjclbn6mrosflel9yzf0j249empclhyh7jq36a98tmht3nlrmfrpazia6qf2fqoh5c6z7nia1pel2vazrrx6i0wunf4eihbm7zd',
                version: 'zeq0dtl2lo8ph20wb7el',
                parameterGroup: 'r7pu6fpadkjeceo7tz8jnt2va6g7dd4jkg8lkw3el9oumletcyunpf7iftvg0xwgaeatqrifja4ttyi0oqt6e9lumy3xzsiycb5r1z1dscmoi3fdvbpk9agmek03s2s71wnz2w8twagnvrjum41ewjod47tag0hat87kbr7cnzbedw4iyr7w81uf0fiodhgwat90ncnwevpan3yxrqfwsmsnbwvzw41l7yqkxrfzfuqrapotmjcut1rcw70pe76',
                name: '97gbh24yqp7xdihift4pk54hiat1qwoe8dli10q4kuo8olzdm2ywdeu9j4v5al6mwz8bzzan96lntbh41vnx7m94c77hu8kaatk92gzslw7rnjkneetjt8lghlu45o6g4ncfsjhj1it1iyzhpizct9vcxbv170v7f1pfv8vnnvwm2bif7i3cby3vw3afgbjjzhtnyce06974u851krmygw6axsalq62k6ou5l5jomxk353s63ccx0g7je16thenf5enakvr52d0u7uvrhte9n9ivly0u9snrfcpjtgof0pp6h9gyl2o20qmxi6u29sgo',
                parameterName: 'otloqzrrbpvezubm9lnentpfgnssix53l23zszhki7iwjm0u0shxirdpw34wwde88ap6agohwu0t1por1giisaz3cux7cp489n4x8b79cjsu4bx7wnpei0qk4tm1dvp023k2txs6h35k6g0xrr2ufe95dh1mskj8f3hwr8whna4wxm1wsq478yohmofy3xgsx8d0ydpwc3bwsri7tk7hnn4mwc46q4ftfhu6etrmp7w1ewgo7b3lhkcd3ip5693dpq1mawmvb2t6rm9lzes13d2haud7mj3y011tailcgppvhx3fsr3ht9y3l3f8ohkt',
                parameterValue: 'lzn4vki2234ca52tqgsdtnz0blfsffkwozu2748uqwh18v19n43hdw6ykiaptkslpof5y3t82kvkswuz3g8icdjnu15hpwmu3mg3ailqi8yzzemd6tjpd0rpl5th0h8hst8i1j7kgru6jut2em2uxwttm4loox7ks8ddpro1u15il77h46wk8l1cz33ppom8q4qsj6gh7wikwf9jrvtt4t5pjis31idx5tv5k2dil98quhi2ujotpg6qlyexxvwvwbibrlmcfof49s48zlcs60mdcxskquzgc03o5nzhzv450lyade3c3r0noctffbmly08bz4n50d0916jq2r7kbhkw321te86slj2x7wiz340srtbemi2qk66qqpkiccdxf5pszhpetvenzf9obo6lbp38jjqdu3ysoc4b8j1xaoutoufp2dls4ztwgqcvva89rjoooi3hay7voa1kixfy2f6o71gudg0ygsne273gskvunb63euzu5xqv999vjkq5njo48r363ob9nfoq7raasnts6qhhwp0umkrwaz2v54dwny9ga7n50ew1epderduidm2ujwho0f8kjdk5f8fvg80pswsdgu91xewol6sje81y2hpr36clbbymgk5ewiyr1cue71twzyudo79quund6m0tiwtbl3h7ycha3am527sy02fevdzlgiotiiqa8qu16ufzhb7cvkle485lq4m462z2vdtwxr23wt82nh6vjxd5m9yijr3vw6logh24a7dxwf75phj63wrrudgq57fex8wrta8sumkr147ci1bmpqpzru9uim0cjd3r3rxewmh75mhh1v341s6y749j1jzwitg8km6nfnsqoaaoi0tn6lvk6tcm8b7ttqvyrut7052pjmqar8u9jkgnhlgmkwy8e6dew59t8est3dbmc6yk26giom6odwht2yjqr9x3bzbum6ogaboul32le2azmxn9gaaotlo5wsbh7qck9uv0edx4b622dvna268kogit53mg',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3',
                tenantId: 'ohjhkrlpnzzjfio1r6hk9jmemo3bqbq1mdjzn',
                tenantCode: '3kzbc3xks3akx80e6l6dlndm1yd2zze5k8gtgrp6d6qeo61dwl',
                systemId: '1abcd568-4333-415c-b2d2-66cab2e5f8b2',
                systemName: 'h2n43xv3yrhpj1vnwe0b',
                channelId: '084234c9-60f8-4fbb-8be1-73fbae827d7b',
                channelParty: 'fdulq4th1w0hqgu0x0q1kkkoh9ceotvzl4gny1aq3ht4soz3shlw7wzgz2hgfb0ufb7xoqpzatrhuumim12e0b8ib938kndu7viq2pze2nj2v60rtx3jg2a21k0sobw4xy6bjem739pq745n7krb7s25wn54izvf',
                channelComponent: 'fpuq5my4jk4bf06mpkti91uati0mlswlz0xznfva2mv2h9jf9zij2mqqeniswkbfso5mm9t1rinymm9o9kofj4jrgtxr6ychw5hxp3932ubn991trzmc7x3ayl2fk0matt40s343jldpbvm1jwavhtpi9biosbk7',
                channelName: 'pnl76dvaomm4gdxrqczcjdqllc1pc6qv6larssj6tfqakgfja8bmi3n6sgd6ejlfzvksbd04dnvuhcxzfu4vu2ndnq4ka6j7j2lron4seh6l4sr08ivcihkej5btsiz1ylrtkx9tm6ailg8avohxkigm2vwv85dg',
                flowHash: '78foxn38646ytmdhl6d08n0v64reflsn6gksu0vo',
                flowParty: 'rnl5mtyou4by1brdli1zkbnalxwzwykz0oy36qm57u4x6isw4wdjnvmjxc6h99cmn07da4krnnzr2ifypxtw1re703q15lf59tgxbmkwfgl2wg0ecst136qezgq891bp0ry35f5ua3v14if1p7iyseqp07e05c9m',
                flowComponent: '7pwqdr1ighm04jkehiarsqnokfhdxzzfpvy49mgfm27u0v1g0hva7rfc5tbmskf1xd1brgfaiqpsxee34zy6zio3bmakm6mjekie156o8escwd60uylx802lm9x5sijatgwnmkvh1bmemil8xdh0y2jfv06035m6',
                flowInterfaceName: '0bories2rtm7mnq363u43q3vl97fv4cn4qdl1r48i4uekv3ahqrmctueebp3572936r0ay8qvpnhwhr01tcgh9xtwvzsu2j5v7w50u6b6gtzokirphs7rl1vzw8k6tqyyck44670qssxnlzsvidi7xant2ylbiof',
                flowInterfaceNamespace: 'qoqystud9vrikk9f7uiylon7vwpehz5mcai5znjn4uy6sttb207pf9hy18ne68h7ewoz775q974z1bs8ay8xj09k6hjmx0bqn7ij87pmhnjgdtz8q96ssp628td8cxzvwhjz7vw2g1oaplsmslychldgvx14fcnn',
                version: 'udv2iwi7jycxe78h5uwi',
                parameterGroup: 'o136pg8jcum0q4j9i92yu7fhk6ujfw3q02r5poec5snv2nn4p1rmdvjuacn77o1351175lldkylenmdk50yvh4dczffrbqz05sjchppswjhis5tud4s2psghclm44zi8alavnbdfiw3utf70lvy8j6ystwo7ac1e4scwyzlu0weydnz0329sx1xr1uaac06b8mdmepth3qb3ic8n9ove6g59ldm7wzeffghrkoo24012pg6oh1avh39xymxuf5n',
                name: 'jot2zk56u5ji4xqmj5jkmy68ugeaovbbhllef6r7c5kbuy0rmpw97sedekmmfp98ojaesryhn9frgdo68ngkw53vqcmdp2vsr3otu5er4jdyiiegbzjulgnt0jwxoqs59600q0xt1wrlzcp3eoiq6of1nokki6mntb8k5bdks5rfd0xbkbi499r3jdqt2wy03sjwhkz07rboh1xrha9vbucxgpeooo1fba6a5vxr15vi02zwmze6n0n3ty8rrf9e14e1uz6e2ztotwgu9vpxaslkkyrbddggksbydaeo52sd1s14b3urlw8tbdyjm3dl',
                parameterName: '37efdvfg6yriyjq7ckc9fez49omchp8ze260b3u73glpm9d2szn7o30s2gmylo5nksuosx29kwn1thiakduoninexw8cdcerr6qv7gyghtpsysn8sfpa2x8bz4zdf836cfspd6x1nfisxpqcna1uhvbvyu3i61181t7v19ittiiawbkdt6ptoarlkh07lkit7ul6tqzufy5u42ljzq2oi9279k0vis9rjryjg3s8rx4slaqctodmffbte86wkz0xw5bgvvrnnznu3fw10vyzdxkvr0ygtbf6ym4c5jj1pxk7dd66ol1p12zw3yxggk9g',
                parameterValue: 'faiqhcrdgdpr4gwhu1ytqii987jtvhewpxkwfpgymhxxtu9dhauy94rk86r6cx2hmuyx1k79m17r4e0e90oy62w55n10f7pamkbfnuiat7j586f99q2aduxb1uxh43m6h0kwvjgv54rycktf4i3lgepx65qr3041y57vlaf4ujqn4auh28jphnr39fhwfw3ah3i5v315dcbocjseznlzjv5dv7ivhnibypwv0aro4kou0n86671f2vs1ehpxo5dlfklqrho6smq6eopo2iejstmucsldphojgjmg02sj0z5ff6wwuck1fg4c5jovebrejfdwi15rtz3e0d3k65r37vv23evvitfc5n0m6an7cng44qiqa7wuet0z0n0cz9hi0hw0qvyyy7jf91yuchhpwwmuq6t1a3m70u6lzrxsl3vm9mq6ivlilp3htq237xbyexfzv1p7jpfwxviuzaqpqkb8mt7ba6f67xzxy681ov8spdi1ksonyx0cz8xt3roj0p7tmbmxhr0vg14jv8pzknlkptbwdnh93vrwki3vo3g5ajkvc5obr8r7s0b19gwnr88ovt5o3ih5w1euo6047l54yw031jdei4y5glgzvacu8eu82nmx2dnipfscj8kxtauc92lk1lewrj0sflzzxphjuwtgtl0zf6xng6zhri62crsy9rk96go7369jbvkhbjsxne2g8hxg3gwlno2sxlmfpnqg765gltadqezy7qjxxcobgkjpyuosxdme34m0czz81f0d0n5vm2q37izog6a395hc9vox0pyc9l73v5osoai3cgdjzsixvunp62j2kqatn0jarlhsh1umls1xgx3ibbefg0ur5p3y6zh2csj5bymz4d2wmy5kldy0e3us6kjltjkea8j1obdq9vem0js5mnssk10e95e861hw1lwrhr1e012ivwkjeojs6dmb9npatkhw5zcxb4119q45addgn0cfs6i25ej34e6slmwzocuhe4yogkg1n8kqf7hd',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3',
                tenantId: '1787f2da-553b-478a-a053-4391096a0367',
                tenantCode: 'sz7g5ntwh96m1jn0iwo65zlzmhspmf3pvtkk3xmae1tk9bbeex',
                systemId: 'lfsa79bbz09mu01vusnfqtywmr38nzyqw410a',
                systemName: 'r3g07dzk8x90srbos96k',
                channelId: '084234c9-60f8-4fbb-8be1-73fbae827d7b',
                channelParty: '0g7sc1sh7lzd2p8ke74fse1zs686sjl22anaalnvmmetl9g5alsqx66g6n9erd4kcg4b2xgwyx0vl071edqd5ktrkn55zq9jjtaqhrhqwm7gz5h3awlr5kwdg8od8pkjtdf6axzxl5uscojl405nhmn7plnfhbvf',
                channelComponent: 'be9j13hqwatk4620dhhefmwhf9jqicdms24n8xgbtads4cnrt67wcpd4aevo3yeu2ylgm9ilxsyo17clb6vtvh7ewpnvx9wvzhe40by4al5vmkdqe9etxh6bj4p0zqyjq2idp1xf1obuvtkvbunutp5cekptc6pd',
                channelName: 'or7vmhgefk7xvm7061qdd3v4xio833cyyazaxyshrs10mzs2fsj4cnqpo5c5j9aqdlknfs4kcg84u3abcn6kkcvoq7btwgfvz34gkxfsqtkm186j5i9k81ewscioozxe8gb2swf06k4fxukdg6ifz53r4ywlitte',
                flowHash: 'xvphn1l8wrtx7tm8iw1xzhnymkul4jz7g0kuwebo',
                flowParty: 'eudba5jr2ocqxxcszy6fgqs2m5h42h90dd5npzmrc9lw9z08h4avth0zgfoi7jsa8xei6a7uh58k37itk2soja08jexltyrh85ggy02iat8ilth4a1ccijkatuse2vez9k9yqhnrd9lqegdhtoth5fs9q2bwzx1y',
                flowComponent: 'gndja10m7bztupmn3v0qkschuo07yvu52wnbboob1pj627hr2ablkutgyoiz5zp57jtb0djrhmu0m7l5042xowlxub1tse4s5rnwslt2q4gfskolen8ppxx9ehh9xavu708umnqki4nw51t5ccmp1bit7mlu43cw',
                flowInterfaceName: 'of83s1f9ukc7a4zx8ifijqd5bnoivvqi3xj1yij1tmmjnveu3v0w54wwqjiwidtpdzn11dsa99qxoakiwxifqnza9yj254vx7w9ilpmoysdcoeg9gprjjch1nkus88glfv5sikpw2jnc4yxxiby1n73t7ssrxe12',
                flowInterfaceNamespace: '4gy0vlxj8v7xog2voqgsttsodqzaxnoyhcz05u1qnx3ofk1fz22swtauqhf6xo2an37q1v4c9sa1p7adzk0hrxntkpy0xzux164q87ld9ocie1nl1z0a4xhdhsjtjvx9yit7hwzu1es2ml9iv0agrqw8nlajwi7v',
                version: '55kqhc5q1j6chu1xo8m7',
                parameterGroup: 'vabziym010olxwo87mixq3w94pvz6vyfrcmz6geem1ss58kh7pqswi89d9bjavwtavefbhya30di0mmvz1r6nzjhrhpcjz0z2k9rq3ws20eleu6fvdnuggoqhkvvg7uz1dhtrenmro71gpjcysmhkruai4jkdu2ti3g62wmanwu832gx6xg9wz1nyuvhz8ckfzrurfa9hak7ln7rcqd7plyoyedxh70kuatnfgn1bx5r799et5ilos9tnsyfsr5',
                name: 'gsn0zh2491ysf70jtgnwyz36k5qcpeslglx1fj1lvo4vq1ayupi9gapaqwgonj9mf40oesgjydtffp6hxzd87nbdm3kvhvm23x0tv6axul6teu8shiega01oeq4r3op4wdcj6b84xxy16ml2u67svwjqrcrtnnn34c39hw8q61b7g6jr2r8rteh05xs9v2z2cb17gvkcx6vdk81m8ilbn52orufi5yomkmcvdk30eduuqad7mg49pon0ol1n0vln3qrq06zn8508z0z0k43qk4vkrpxu91dejzsqau8kyd6hse3ke2d2de2mj1pgfkic',
                parameterName: 'd17ey5ca2c7kt07h2tiyjvh5kwdjri4ctgb4rzndzydu7s859i2a0o8n906bngjwtrrslcrt8ua8qivjzay3h1sf3j0igq5szqsou90m6hhj7jz01qvy5f3y8th266cwgl1fbnsj3ht8q033l72f5gdkhmslvmwabs4v8n0vaxc13ltpgn4efudla4v51aa31cloju83nq04loly1sj8xt1udw38vx3bwti7cv34lah6mpkayulwxj37jdoc2udstme5z4vbns1viwemyni8uxs9jg48nwg4bvz72oxe0mywy5ubgz0lwvpo5m8bq7yt',
                parameterValue: 'l2ag6w23maljcjjasavkeg9g83az4z42estsyfeaqh2h2sdrb4levzfkfz2cf1isuytd6yg52kl193e70b5rtij05f4dwwkxuyqe5pwbgo1dn8hlyccg0kvz918tma4u9d11eaaylas7lz41v5qkrnfk6lh4lwi7y5qtte47wifnbh9c4lb2zqtv2ylfsx0fsd5f9bld70mq0k7hnwfp4g262vvroo7pvce8q707h6uiyuyy5pinfmqx4tkjqfayqvzj6sdios874u9tts2h1kv5o4syw264hwzv9k7qds75iexz1l12594zw9zpagn24qcjauxcxzds9i1f9sl3xp5djb4xk7jjgco6ck5o6ooyz39qmwc0dks80c76ga38vs4uee6ni1eepw9bi19o43cmjo40ziu2d6tlw1pduyyh9xulpbe9lmw8j9jbquz3t7mdugfvou2o240eoa9lpm2yjx4mnibq6qk85s20cq08urb1b1ejafkfzse9dhvzfkanvp0b7zt1opdxdsqwbqvvxztw0dn8fmvblyj6212i3i2r5wm84vzpdv3w5esoxt9xi075mxgkq5r7sr3h3hmg18ebwfwu8ow7xs1lvsf7pxxw1bwmw9o2whhzklqr4c95tcy0yjgfdr1hpvij9avvrx9itv58jof5edjl0zcu39eedd9ebtvdzltozy63hx7hkekwti76jvckx289g46un7wlw6hyzzjlyq1jmiwfqyxs0pkgmnsfcl7d2ybatdiqghomys9af6f18yhzxb40pjiy368t78u3hgb5p7o7ysw8xlyje1phkw8cn8inqhn43z9h8ux0xj64ckauhhw3okjigod6xzswqzw651ifn2513266avz2nrb9l5js4xms85odjcijbt1627fjhl4nb3j75zjac1gbujjevmfkzo6grjub7k6xeo6vcpehdxo7k9glw5jeuuqm7tawwi7xohaefafrjybhpbaq9el9s6jds8iu5qm2j36aj2kx',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3',
                tenantId: '1787f2da-553b-478a-a053-4391096a0367',
                tenantCode: 'l210fn2bi54q31crm68cyf0shj0gyg0m7ppgpidr7c1tjzl9v9',
                systemId: '1abcd568-4333-415c-b2d2-66cab2e5f8b2',
                systemName: '7gbztaxgjl2e1td08mn4',
                channelId: 'f2r87tm6o0cekpky1i5jegaifkluybq9w2lui',
                channelParty: '24ejlh4ioqkbd4uiyk7cdpxsamk61evlh6urx913i5p68bg1unjvl3yaat7gqb5pu2nz6z7d5ji7b5fotnw85qwsk1y6xng5lfehl18y5l87fzu71t5o8b7vsf8eide597zj9dwwn3istsby3ultuiy0inzjncf1',
                channelComponent: '3g2pwv4zmgj7x62nm2zubdh7betqk2dq4e07q4tmmmia3lv4tg12fj22fuli6zobn6guwdmog92lm3fgxf59a6sgrjasbk7ogygv7fwykwsj8x058p49w8ov8mk2we7t3e4jm9zl59942em9rv9bzzze919cp61h',
                channelName: 'jlp35m30aykrnjonthquen58lo8vmtz57l4nqd9rxg4ir8kpye8boycw5li9zx65xa33s19cdmb8a6snhudwnk6xx1e0wt7ollclp0z1up99r7mpmopimrlcnbzp10lhfvvk9ucll1u4cfi19l52idq4fe6h3g9v',
                flowHash: 'q41xrprtsbef8kq5ge9dqq5vmgrolgo4loh7gtgs',
                flowParty: 'px99nn68vra0bsdh4r79dca3spn3e21bm2nkr8xieen2l4r2nkwoj146fegm6q115cggh56slx8it2bn9xr9ok6uv6m0i8xvosuirmo7zi6v60o6mwu9rmuluejkj6ta5vko22o1v6t87xo0jqi3je45wjxse4uy',
                flowComponent: 'kfmg5qkyi48fy4o8pppoafbpf4ymbppmkiywf4rh37q6j2rsmreus2ukqgjezq8hj9n1d42l4byveyvxzz28q2b3s14a6dkx3tycp1idnfdc3sdxd6rzdxdypikpsvlky51f6ozpay19xq0og0ml7gywt07ppbgn',
                flowInterfaceName: '7zgfgd2ie5tx491ssa1w31jt75zzvvqb5bcm5igp7vsqtz41qpunzint6u4eln9kktz74weoo2vjn9t25114aasamyyw7ej8ihobh2lsc26g5p2ee3m0e5tuprxq03jzuezd29bfy0jhu24v3h8kxpgcz8puwjh9',
                flowInterfaceNamespace: 'g912c2oe2kw65wskfhv3vlo15wjrd5s3mm09tbk2bptl59w46s0jexafia8n4isq2j947j9jzi72nsk60ec5eandgjcomgguheue2gqwf8ox608fzfeag7n0oa3sd9mp36ddm7xrf15eh22ds4t2ertdi4r0ez15',
                version: 'sigtnp3dubxpxtda1949',
                parameterGroup: '5isqrsb60azg1h1obcf5cv5nzkbg28u9lqsql20zocbmaj85tsv0yjves3drvocldqdcxwxsql2jizjqpudgzr9qf8o8w1p9wai6qqrps97hagmi64kzdxamdnm7l7l3gr658twch1iafqwo8dneajm7sr0gpzazp763thtfbllnz6h5jb0nmamjjq90sff6xytjnkmh2dunky64lgj8ut235olbbbmnjgog0prme4kzfj0y0u0sg9erskj1nmn',
                name: 'lqwpxy0af5h6gffg7zhb1zv5037yypjil9gjbhrunq1uk23cn3x9ysesrh1n0te4urpgo59hljnx0o5cbfdjjtrwc5y21asvbwlxepa4cmz2jf6an2rocohn2kp8ldt5894evicb99go17rnvi7jwf9prclcrt7bklxgusg6jarxc0yvaqjgogne7exfsdlv8zaj56urjjfmpc6dvr0txrtckrtlw8eh238ju30wo783ozbeg8iow0hc9os1ju0ttf1dj3ueo6mb39kpj4znl3q94ckdinusj9cyis5qhzrhq7s34r8tyiylcm1357nc',
                parameterName: '3z7isytr48m8buyr3558z5ypiowmckvput4s4t0gu2oshzgl0va7rawfkyji3qri3gae8e0to02qatenjussy12tkbnuku3urikl5fh2ajh9rs8fglyxu570o53fnz7ktgf1w01uw7uq4waxinlg2ltc8ay745ebwnvju4wty0ncuohza20k1esh7vsrjt6ir3ugtv99i15kv5d9w0uw8eybo24x6aq0zd8h4u7k752ykw7pi48prsa0ot9dfpivqt8kzj966xua0lau86v3vsnyyqyiiujd13bn4qpllb0qbnblycu9i3zn38i8hbka',
                parameterValue: '4stdma5ewffcv6kddozc9a6jagi19zz8ybstrmqqufvq90bszazql33g9ak1oqoxxmi8vz6l8nut46dssu4if0ll42sm5kj82mv4g1l6yp0nto1smbczyj76g492tayeky43b49wm0kuajio2uwgzdp14rwk0tges0tejcw7fnzwfay4jkysj0ze0fdldvpmb3hfnqhlqkgfk75nvnwpt7f1ql1uchm5zfmgpj45recszmicx3u4z6f0p4jnae6f2u0949tyjtwfqccgajirih7ghr4hks7ec623cm8t0ubk2mlxosa6saul8j5nqejbjyvwzql5gzeu53dvleglj2owhndlsz9kcftiyx9dte74v4crorblnryurll8jti52rtp1ch6kxlxz1p0qlb419sqwue54imkdobrkvz0u4dzn386xy499eggb94k4uhajfezjyko6wn5xay4i2nbihgdrfn3ivqbvz12qlea9wf7rl2e2m3y0rywi5sav48mdqgdjk3gpollmslgwoovetygqshkocerkjf5p46flw3aaew312hpif9zkfzenlg7e689f7h79si2u3ebbl1tkh791zk5pgyoc3344za2yxem7lxozsbjd986k315cgau6z7dn0502jd3860lhgoirtt7oe1euy95xfs59w4kesjmizio8jx11szhc8tlaoy4ab8v3kbzmoxon0tgnla6iz39hldj9frpzbklm909a40kf04h56uh381plun59kswp79iy8luv3u8kd2aknvf4i3upapwyh19b6x694dwc39jh5flkr1y6kfs4at17ofa4izgq5btxswv1ihdveex0ach5t7ew1adtiv63ueh11in65nfz8uc1xzy36qykifsjejq55mv3welnkt6vwvw209myxzvkgc6ilxdphv4tbezhb662y7zukkxmj3reewb6w6xsjte0n79y1ep7aoitgeeo3otz4a9c2lyu0d094xu3b9ncrqrybd7x3b8fpc9',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3',
                tenantId: '1787f2da-553b-478a-a053-4391096a0367',
                tenantCode: 't3e26i55zhqlaqrvzt4mlid4l1qt8f7i6cifdd2hlgikiozoch',
                systemId: '1abcd568-4333-415c-b2d2-66cab2e5f8b2',
                systemName: 'y2so09a30vxftggol31u',
                channelId: '084234c9-60f8-4fbb-8be1-73fbae827d7b',
                channelParty: 'mdo75ts96pzma9mhdrdj4pikw6jp3tr15g1yv04lx4brrjceyhrar6tn82hn5as5h0s86xe5g9h5103nexffofxwd9dc73g34lt9qdk2kbsx69u1rtqld3wghfvsfk9eu4swlvxvvi8iiuj85gv5mf2x1lx61mab',
                channelComponent: 'rduh9zu1f62j1o3laono5el1prdtf108ow0nrawqmu4we81edn5l6r5mbq1oi2i1kdntotb7soiivdeyujd5xij0dy1p9ckt848td0ye72ub0rsn12o6a8sphyizq45icmo4fhwweeqf1xvokjgmsbm1q128zsfi',
                channelName: 'hfjxny6lcede9m4xsefch9ysz3gmf8d5iassuho80qun31sgg6vwvot03gazz2w1fs7jmlirhrnv5scs0hxyyhoelm11azm3lxgu5hqctk5svxra28ilsuvqtdwqdgl85zpyi2ml4cefohwz46tc9zzrztkkrmn8',
                flowHash: '0pfmwhjyhtumfu7e9bjb9brtv40tonl2h26riirme',
                flowParty: 'hosa508vtxl4w1q91j4bxj7x8tnr2v8rmli1gdkfch1cb2pqgz5jozoz3yno3n0cgtt5ahscsdxbvmkle7f1sa1t0zicepir01v3mkxvav4ve025x5fqtjmofqh2pyefqe1fk0xzcbkv5bqa34nhqq53pr5g8t56',
                flowComponent: 'smem20d51edyw9oat8l73kqq2o9wrvut97fgec1qxqbbiy5pg90jpp2d6db9fhxen92xw4ubdl2py7kqfdyjyuiw0oxvmrv8p3jkirmspncm1ikggo0pi61l8jnunoi5p7zav3iijzbsvx0m7pa0bwezxx3nap40',
                flowInterfaceName: '68kaqzu8gruf46tny0ior8nhll5f9zk9u53ovpx8lkblk29i17xn41ij6lud44zghs7azktn3zhnizcw8f6o0pcrmqpz2tsc5yhqzdarbei0ns0dbrg025ufe6v7hfjaomn7y4lhzi3n18rzriss0hc4e3he44d0',
                flowInterfaceNamespace: 'x26018icyt44bxilmt3f5glekcl7wb72rlzz2y4z9f47wodowys0ihklh2enqe0l41i3p4a70kia8k36fcwvsxiax5sg76pcals2nnpkbyjq2j2sa1qq97ae1ob3t28lvvbx5x62opx3has64j4f0y1xvovwfybe',
                version: 'jbh55rhqstrx3e9izjua',
                parameterGroup: 'f3qn1v3g6xg5xkm0wk11e38q9tz2cqow9i2bchlrc4gm4ylvj5ldry2xhjczl56y7ks19avdnuvd80m523gwbd6yfjud5o64w1tzpmbqi3n9p5ojkeu9qxmiex8ainfdxq2mid8zowtpsgxfqyknciagxun0yr6vcp6t5f9rrozfz9qyqrh1pr7ykpnghgiwro51kay8hukc4hyx317ld4x8u5coitrpyrozyl5dbkeh1joebu6txzydpf82l8j',
                name: 'uf6hg990iex560va0aip9xnipys3baa9145sh5diusrn0gtnirrk4zteccu80pkrgtyp8ppbhtd0oos732qwo8ggkoa8d5igx0fircx19n8j26poxa0qzcb2y2zyu4zxyvzbo9mmxcx97730i1n7b3l1yw0wd8b2lihac6zt9as0r6qlu70niczzp2uxs44vehfx6rfcp3xb2elhf3zplssvfxz982p9c7g0ihlg7h9dnk1jzxu68v2bdcyuovdh6ygl8qie1vz0uv6v0za2fgywlwjtflfk60s7xdry3k4qpndnbe2fwxayey32642f',
                parameterName: 'bms1hqm6hwxxnvkvcworhk4pwq1h7sjcw0wyer7ilqrc6gktboxhicd9fdvkzufv8ips0y58a4rbohtzm7cb2fddgzoygqat55ex5hiu1s7mxasn13g6etsygmq6ogwkh52y1f59pvspf3b6ff5qsjawneng7ch2do7kim5hz1mtrz2e2al979k38vrc0ivukk1i1xrallem24rn1nlzgzoqawwc2emeexpo8dglf4jgtbre6t7k145ctxbuz4m53k5o8wgkvli17y1r9fi6adj3sedtr4735vgma3a0x2lezx4vgsbluwowdg1jix75',
                parameterValue: '3ozlv9sif9icg7zifhx0uvnad8d5z3w8urr5s1nogkk14yx7doqw19nds24efmm2r0qrm0juq7mu0ns9ig874tqd821cg39miurq2qivpoa3t9ld170ky3anwz14snv2btylp2o89sskvgp3q3eyjjc4klf2kuqxt50c6xc0ge4i9xtmnz1o0ms0f1tmgsezvwtbnfq1wxvrpzv3zzfi9l83qmtsju2j1v4xlq91csyoj3hdbsk6szdrn7q8omjutquoxhdc615sgs35mid4krm9duuyfy6zpbwgl0f2gol5i5x814b6r5dzy76fb4xfncdbnyxmavao7kl700ya52bgwlyfk2jjkuzb2dkrcmk42zvkh194vs1p70lm0zy2b2ylu2845oei5szyb96mzlwv6hlkwcijef3nlee2428brrnil56ptmsjw0oyy8n9fngji93yhdyea92lpo4ry5r4xl2e26qb06nobd4hpxvmw6vy0sx5wn74nce6olptfed812xigl0x5hvfmnsi6i5opsoryksyeln5uccvpeuepwk4qsi8qngq61f25qse6j1ik1anp3gydqnpdhw9f6nocfvjlyweofee0y7w4f09s33h1j0ax663df7w4st2veopc9t23vmnnui1v4lims8e5pcpxg8oeg5mn7ccsbo0j2v6r4u5apkqtjhjzmgh3hg7mrfvk4w6gxphsc1ofq4dvsse458bp6gdnry4u2kmbk55y5st79isid4c2kv1cpqvtwr5xn31mya0rflhhg5bx2m1bzh3tbe9mh37orcs0d22ijk4u5ebpimf3v9dkm89mjr2vumb8gs4w7mqnd5uz92vl7u6u43hrbqjxtzsvicqtoo4cdgdd24rod3eivqp5uro5xntoigs23csgqmteob5au2s9aowolidef58poizjd14q7heflcp4zj27j4hmuh3wllzbkbofpc4hx605nm25xsmt47494x71zz22vjj3cudjw6x26fblqy8',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowHash is not allowed, must be a length of 40');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3',
                tenantId: '1787f2da-553b-478a-a053-4391096a0367',
                tenantCode: 'pndjt6ghqhjsz4cxwpgao6ymjh499007rjorqntcbki0fvo69qo',
                systemId: '1abcd568-4333-415c-b2d2-66cab2e5f8b2',
                systemName: 'xqzn8it3tpgw0h3nxqp8',
                channelId: '084234c9-60f8-4fbb-8be1-73fbae827d7b',
                channelParty: 'cyoaawkaokdmu17gqaswopdem1sbcqn1m3nd7a3j7m5m1q0mlzh01djfmf2btna4yhax2jy6ybzzymolkrjlove1aozxujoh9uoevzicho3ny1jc1ul1g84ecyzdcr1t6y79wky56f3ewjqhfycssjb90tnzrvv9',
                channelComponent: 'l0wzk31yjbe43cu9ttnl8md8tm3lx7lvna23pw40otqmqmem3j9bueydpxocur6dxrv9iit01t5qopwjolhywbdjp0bpvxj71dlovv9ms9kf0tasnwddscgz5txdxjdwm1zyy8yvf5kv6leiv92w8aip35u7bran',
                channelName: 'wx1oe16qeon0k1lmyeasx4z18ejpefdwu5jk1kmoxyd6mexqu5dpsgb3tl060v9cndr6fdvkt1rje78snvfygexr6k73vcai5e9d0278wsob7i0lm223h1fste981nft180iks31tj4p47uz8st22rxu694h08wc',
                flowHash: 'ztwoq2gtnqcowujn4x1ck3shb4uyq79zludsx1gk',
                flowParty: 'c34tufqla7agt5zcgk5ophmlsu5xd51gb2bokj7puzc00fkkjlrxkjd89xvop12thcpe40ekjum9tnfyn6x4os6a3oig70cd010dnkj95zhde4mh944fvk4ca7sq9kv6bcxcl7mmtncwdtjl7p0v21jexpt9fv1h',
                flowComponent: '6z8ztt7rz2ujp1u64a963s3f0evz5qckjh8s6ez0muwucn678r7s1nead517zjmz8venhgmg7rphp7wgtp1x5ihnkpisfdc6ze8s1yyvjc2b7yb5eps2fq9zfywsucd5yohh1zpwoj7x8ka26dnihw5izlvu3v8h',
                flowInterfaceName: 'c1nfg2qj1mve0otxnqqh0sbfbe6tc4zik19oibw6zc9e2n8kmv25g5ow2p4ty3hwllv896pdcpf22aiwyfzj8kw29zc90yrufgnuer3ckilj3m3pyosli9dtsza6m4v7yg6kpi54iwkk93bvjqnwblqu18p8kgo5',
                flowInterfaceNamespace: '9fff2n90ev6yp6032p5199fx38nk3nywsds48po9aplraqv4kwustfg9brkgih1hn1mqevwcbdvhhlhxbxjaci6nof5ze1tfc504j2inud5y9t4bconrj2czvhlyxfpl56p9cmz2teefgc8lo6yyoiaivmtta2r1',
                version: 'e3x4vqj3st6zbv8w3834',
                parameterGroup: 'ptyjdryx57bwqm1j72d7qrlp98coppzemgn0ppqupacme3pwzjp5gkl3wlyp4a5b6nmq0hi6gbsbn5cmbpbwa5nvkx71hw1dswdonojpo2urex0n5khdh4ugnukxxtp650i48xi9ub30sin7vk9zwdis837cqzz6dwv8xj25the1o7weetf6pxbbyfhzy1515oyqbqb7neqowoueylu3tlrrovj6eo70xt2aafog3y3fgjsuvrii6fnvbrhxuok',
                name: 'ycxtzo9rehlj7nez91t4umlftnjlm670us9x756pk391309ooov87oxisxg8yias38olx2harhtfzucdcgmu5iwsp5193cfzbb491xsll6xm3rbmqgl6knzgzoxy7thwa66w7lsti4xkdy73c5ctvwijm7q69gm8wuee70fyndplin6wjhmav6lsobn7dtkihbi2rnsuqjdigavmocmut0zor32a7op4yi0wvie8r814pj70afz09dep7bd4lr1xx27y6hlftjx4dmdos2vemnpcdf84in6klz4h7jjonkwh3f2d7ln42li48vzdn8pr',
                parameterName: 'bqqp4r5b67ir9uiq0582mt1dq8r85qalom4hyz68hrpdz4wilncuvc8o2i01bs06byxwh3vcc4a3lhzslo3ammj5n6gmsjy9b2g9awsfhrpmxnupekee3yvuqaqgdsj1apro4l82n3278nfkx1k35v2d5gpvxrmqwz5poo2x7tf5j7zp0kcm6wu2bipyscsczm3ebn4chuz9pewblc4ae3p4ftoz51vb5py5cb2can38xh8eu5zf3o8h44q9klglwxmr85i9v485rbi7gofyl05s0xen6qr6aanl3ja07b7cfvw1df5h3wob7fugvoin',
                parameterValue: '1eoxen5c32al8q57v8wbvj2yphv8a5lz2zzogogzs327qb3kcijzc4x400pcy8r54xtf9yc9f2tudm5uujf4c7zmzsd1yn015tndtlhd0yt6mvof2f78lxl5jmhsjw5x596akr4kgvi0em81s8147l9ifu9ki0kibw6135foh18r46j3jahhy1zkmyma0a8yqclbaimc820tapu96xtav2iqmnrl7elkp36v9e3niwu6qg987mo1nyhhr5i65eipig4mu72rzez5nlm4jd1qv7pe88nqk6s16ypwasljf6f2gqkrjj1fde09571oeho6amwx4b6j42x9jpf2woj5jzvnpmupa5u4w5lme5sbf87lhf1qrfxtn5swb67ws7qcswinggrf3kh7cgv9koslyfrfb8e789oiiszt1m61ro27k50mcvy52pa1q9si2u3ejvvmshqojr8c9as52lvvrnljbzbdh0wf6qcoq6uqbnz8msu70kkwm5mafnrv3n73lvjtpmq3bu2u5w94zrscrh25lf7onbfqs02vpb8v4bugihnh9ndlfyp8wmvrpl1zcb25yu2fioawt1oxih68xzxisd7akv81ezqjq6s4ziw6t04cn4fl6nwrb4ix0g8jsvxdsoewb193z14h5syvn8k1m004e7fq0djw39ulj59doyfdhd2l0psqkqfr0uy19glrxnwt7sitf4kjewcvxzk3ccbafl2qkxfir4dkkxbgzt7p2l49snexwlcicra6flyp7nttqgu4gqxvefm8xol7vosgnczbw7h1xx6vygnkznbuohn7nl5uu9af51n86ro5e2j6pzt8al9jk0hwvq3cfnqp32a4pnqxdepjkxbob9ruae5t73bbftdw7b126s06iie9mpc9t9x78doo7oxamcnn7bnqzpwkdmxvnnbcrfpqnky2571u1dy42ivjga9naze2n9g3i39p5x8opcye6x036wpd94g6ymowh3c84k6nugdy2uggjorzd0kl',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3',
                tenantId: '1787f2da-553b-478a-a053-4391096a0367',
                tenantCode: '6sopd1yq8ypne37wy48qx5lld0azjjdkqdc5vs2b3zw92tdjjp',
                systemId: '1abcd568-4333-415c-b2d2-66cab2e5f8b2',
                systemName: '5jxc37rc8x2azswnyck9r',
                channelId: '084234c9-60f8-4fbb-8be1-73fbae827d7b',
                channelParty: '24ikz7sjp5c63neujd4qr2mbahf8rpizaxt2leyxpxheuuiz6i1eom7odh2124q5bkl1lq4eiovxc3ic9qwgouyoxxcqpqkj0a04hxmp04gutpqgozj0p3mb52wyo7pkeh63a3jniyjd1jgiuudtinj348jr543c',
                channelComponent: 'q55rbyttes9pg5h5fzujlqcitktpcye421vxj9olx20buamuoox6r5fcpd3mkl6llytnkeqvsyhqzw8pa8eleer526dcablf9f4mjij9mpwid2y9f90z03vp9cdusxp7ie4uz3kmpxpm8iijfmw8qft8k8kxu30f',
                channelName: 'bo4ktzufitmtlfwaf44z079c3o3qtg3l5afqxohszhbo25sif3w1mjgv2dow1m9eg26310h1j49zl2wabk00uixkoycm7unptrohgeczh2q1us4y94w43be82w9dwaiywfgekfla1hi6l6s8hmd1odgayrkgdy3g',
                flowHash: 'x5mt7ppe9ugke0xjttcevt4vdq85kuuadg4b4fhg',
                flowParty: 'ccx0io36loitgslel2u25jmhfar9h2hvmfwtyo4zrqueomkhvoqev81ot176t3r3eus241wqhwmfvecv9b445zq644y77oi7y0af6f7kb70b34ldn7mf2d2odeviea1sspmh99ahj1v2jte611qr3jjcn22e5ja5',
                flowComponent: 's1oo74w3tynm6zj9i4142u02153egiizvq2wgrvnnghqrpsekek1q59j6srvbhuuhdbl3894c4rh1tqynq4iz2uz5ns29zo4hc20pwkcx9kwvpau4x4yjfnrs5ck2lb5pfl5mlg54wnknmit5l6l6mlcjpum075k',
                flowInterfaceName: 'qle6v6zkfzsu7ufya9vf2ikr9vkliu26ubfdtmg5m38ti1f2og0xedq1dbj2m9u70k67x1yzgm8tgn29arawvk9vr72jts2a1a9mqoh5sa2k7c273p9lu1283ir323pi43gzh2tk4fiylda8301ea2w3d2c3mu40',
                flowInterfaceNamespace: 'eikjpeuoqiamrvwi45kg27ucbbnfanno8dzze6gbbvng13ybxulwctemu6cguod3ekpqherwlzzomzoqaj6n5zzp3gig9mtrgpddd7dccszzd5imjji70gvs1wo8ngmpjagaotisb4b9n8b67mkx7iic6wo403hg',
                version: '0j16anz9h9rkput0fbhx',
                parameterGroup: 'pov36jfirg3c3vxlcyjs7xcbc0ocspax2sr7fr0cs35ewor539kjdn3o2vk37hs2q9zaqlqdx1c1kztk1zmx94xhl7mfmd90fu0d7az0x0hg8n55bzamhp4jsjmrsxteqz0k1kptjren4g9c9mvbajbte5jbs0iw4ev2sgo7c5d0is6qqquh4rtyrfbwxgp0b56yvukcca4qh7zl3bmb6wk4evpnw5oiruo0hkpxb7pcfppk96jqxsu46eewr75',
                name: 'e11cqzfppppuvrwsbx4f3ybv2aj56tanyzwjbrmw6p04qojix66axvaotvk0ukai5k2ksp86luyf5pwluqvcrlwr83j6wvpgnaljxw61uyrjawwh2z5s7264sn7bc6aap2p768ahvfaip9pr8cldvj759m0v3y1t95zo3zayov8pdrt7zrn42aii75lxf1jioa6jl3jnv4r5s6aze722wq0z27ye7joh9tovbygpae0032ydxqp7qv5wcr6y56scffswdzpzv3pm6hp5xvhbdbcty26i9pzbt5fftf8rn9n68uvzg4ku0oqr1g6o7b0m',
                parameterName: 'cpf95yyl2g781kwb30ph3zuqw62hwaqjksz0a9r41qdkql8bi0gtnc0aeasm7vax4abwgr6ffinj9ah7sxrdbmhyppzermw0j2d5bszw0hybuedz3wfy1lr2lhk4tsogt1icnwa3x9jwdpql2e613fc21ez6z424n1w46ixfum176x9etdu5z8rbaooczgfq4k8xv1d4xhn6hd4n8n1grb6cwlibqteaswowrko9bpam7jitodnqmnwm8ykeu0o98z9jayzdbtrwmvug8dvx96d0gzxrx7ho3ltf6y84f2ah65mys2axgin8ca0au38w',
                parameterValue: '4dwkr9b9yr834lu5g4b152hmgcrldntr9tywxgip066iiw3e1o0wmxqqk1f38ro2id8ka9e3qzd5h9o343h941h4vxjutyejp8xpeudcp4v4rgzbkt6x67thykpyvw6jmmcckkwt1ocn9bnzlp4nu5jbmy8zc91b0l0rx85qz86jpks6q9ueltpq9m56foypoln5h5vy0ha8hs921hy2ii5379ria232k25kz5fxbwfh92tenfyfuhh3b7h2h4295psut301kofub00q3k0uoo8wrgj46hgkm69cjvqxiko6savlhco0s9mhbn0dq6y105ipwiey4w74q6737o0zwl8da2ux7bagkaqqlqdo5zivbaqf3et6wsubuu7am1n9w06e973666vwazvbexjv6ouvktn779oqmqbk8wcjqyqa4fim2rpjg3j7m2xmk3gx2rgbpxsmc80x67clpv9p4epyh4jrira1ju9n4u7thi2fbu6pr9z05e4nyzbg3oqt279m9vb1fpa16u7b2jhkl56u3i7w3leznq2b61mtpfae9iqzoqt66cf72sceu0tysohnosrls7uw0j6lo0xh7c5is7nge4mmj7m4ljkhklu5rxktc97v6q1jor4vm342fbh3arsz0gni8xol9adng5fcb8we5q8taqyhm7aoy6di2zbcrbqz0igx2ogs0v71ggqku2t8jdj7m0sq8yajyl8jifvdz278ygupb166knsgdw7e7osx13beneoj1vxqhpy2ucvapf2qfv7d8ms4lzkec79sg3i8vgam2ftmj5t38xg6k85d2sdvv19q57ygufy3ijagwbda174d7x6gajf75zt0ze7ykkgrm202mczuu41sj27y9uwzvcubm4pg36r19rgnn605400st75yc9mfbwox2wpl9xaegi279sz4ehmyc7hj5pea6nbtduqf8t4xuu9j8stihzlt0ag0kk8mmkdip7szu2e7pzhtoikopdqoe9nn6svoqzpv67v0',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3',
                tenantId: '1787f2da-553b-478a-a053-4391096a0367',
                tenantCode: '6nbouzevv7s2ywel5wb3omwwqxg7931y8uwt77a4elnhcfw17z',
                systemId: '1abcd568-4333-415c-b2d2-66cab2e5f8b2',
                systemName: '7wfc0imaor3o0w765pjz',
                channelId: '084234c9-60f8-4fbb-8be1-73fbae827d7b',
                channelParty: '8du782et08et5rqnkj28ih0h757i8rn9cap8qaqhjwhqzkt3ywm6ymw7lzjv5a9bv02rh9d9ye0bufd8ooc2k62l1dkuhjbm34677im1z6y3get76jk5hj5h92quwxn1236vf7n7n3n3i4ehqqqlbq9vgn6fpsz6c',
                channelComponent: '3gjej7gvq4z8lp7yjmggocf74jgq54tkgx9gpfp7zn9q3b0ozrv79us20dlkbfg0l6uxj9yt8l1giefg6m3iezys2rta5bk5p3ylozdkemgl0y41naodvgp2n5aqvuwcattx5m4zb6z0u2ar2xu6b0o4la226tt7',
                channelName: '9fw98534x8v1xkx5ahf7h736xl709bb26z5ytqx0gosjb54nez9v6jz6c01rjjnhfbalv5u4ca38xw2892bxp0k3lx8de8cvskvvyzn47cwozw0ef1d8l1xpryyidqf2qxgfb0u5ojdfy8jw3x0ehrmqn5p99tn1',
                flowHash: 'hwmpzrg0ypn5d2j4pccpvvz24lmqoj6mevng7r0x',
                flowParty: 'va1k723bwt2xdkm0o30s2c4e7rj04c15ab1vjfx2po87vjy0v3bbnjpw3ii58k94t0x3gimmt5078jt2daofq0g8zvgpgjb6vw85kapni57oe1pm1u42c8bnzuarc3lgbr8ys18hb1sg4jfrew16hshefrxv64lx',
                flowComponent: 'p6vafjnmu3x46xgy1z9ndahvkipv6vhn7el31orqwu33sexp0xfsuy2qtbtin7rv0e7sppkxdry1kjrufrc31haxan6t5twkzsc50qrf6i50tczak4e3f34w5j4n99p0o5w6x423osu5iyvrtmlbs2glpk6bqjqz',
                flowInterfaceName: 'dzsoftvs3t2h991seajkmtyubdqn1k9kvu22obos7c1zuqv8uf20erk6b41g2hyq5kkep8uz3slq4eonrvxaxsysr148h6qs670w5yz6266rn1yufc96mfwmc7wkh8yll1qwvbuj9sfk2q2hbrc6tnt4r3mkgtzt',
                flowInterfaceNamespace: 'wh49oh6blkrfagak3rzlv3hsy08y2vy6099uztk34iqxshne7mw3wigcwyz4lhpp1mytgqj7pwuodri8j34zwbxx21akiazd0zc4uoqemjmp6yuvmujjnpym9myvh14ffvwce3m8wya529mwlwagygjrgswhwhcz',
                version: 'na6tqkfcsyzu1sjwcul9',
                parameterGroup: 'ucuqfpa0ia64e828g7s41jlvocz2khkd6y3ha9vkb4lfib9vrat3kt24u8l33noxwvz82nzqz1czslg7g9crba7w4aa7ti1cr8dta22qcqnu2ai7r33r3yek31i6iun6k8fhlzcwvuq2vu5zzw0z4zdlvadmwi4x82enbrmhjn5nwgu81n4u7k7718cl4wigize1d2gd06iu6zvi0r4dbtllcnaia9xofnraowwv38n9hyu309rhhj19djlrly0',
                name: '2wwk82jpt2b6guyoyhiu5k3aa2o3ejp3wtosja6qlofstspyl4nmkng5j7pty8y95rx8cwjixzo23ui8garghe3hhx8le7l2qbb7eqvem3zvxh39p3k8rp3wb4874u01ebrdaujt19nkdkvbip1o0gmoalok76athv6im1uj3dmvqn9k2gxq7y7o9jan6v4o3hwctfmnf9zsufml7r8ldv4zv67zr4komsub6qx3phc6pxcoy52m3amtz4rt0wlev2650y510rov8760wbbf845frqpag7y99qp4lkrz9v3jf5tig4jtnm8ltqxlah88',
                parameterName: 'qrvr5q2nudeovza43e356oyj4490vvt0qahxt4x20lj73d66tl9xjgt0hxfgpqqlca0gch6ibwimu3dxkkx17le8jzb9nkaf9hsn2tdwwdumkah1ch2o7kax5dr9bexckua2tx7j5ksceytw2ry2fwxgnsueinb66y0ufbjqlihcy2wgb0jvwhe0l0lmbmwzbh0d3ft84ro9od2kmni4xdrl8303vsazpcgv7hsbccv83509q8rnonsc5ejyxfrizz649ihzlu818bl20oe1efzpdjcrj3db99getzgf5pmjv0vze06991003rp7qv7o',
                parameterValue: 'vspcccl2h4ckw1exsng15iqaayddznqw1fls3dumsv3x2njl1n14azg2pdiegk8wk8cmc71oqm3hyv6i6yewwu6rieqzbpepkt27domxzm1hyru16fcnchgm5k2axkcb2xc2ff1dedagjstpmxm4adfndwomxo6wh4rokqiemdmhayf0zown19napnu7278wfdd7zw82ctthdvtxxp8czul70fcltpu62n6id36da5i9udnl5c4aqusy3zr0pyzlprb40d8dym2hr5kpipwhsyrhvkvjqb9esru0jm96km6qb5vgf2p1478frchpi82whgy4yq2mzuh66f704aaiebntwjnspl3q6b7w2cy6ttm96zqmf36ad4j3cwbvotreum80niq77z8zc3b6wp1gahjqu0mfbp2ac9bm7hdp7b0swonhyiga95zgxurm5asxjq46hsmzs2wcn2b312acyz596fczcjscuhcyfq3jh28neaptsfn0g6acat1jdfhr80dsdl9o4rtt96xjb8dfzulzyn14096dt81jygy413j4l30sw71taf378moievutx9exzkbbjxlk3d7l4nn0427r25670s6p73k1e2k8epkk1drrxpsamh9z9d0jpfkbe4zeiurujiwhk0ojt555lerhq3a6xwc9kmztssw12dew5f7axzt0idkemw2abs2o6fy25x4gmbzh9028b760xqn1g678stbnft8v5q9aescuq9jwd3eu88whfp8jpca8duzz9vc1s5gsu6fqlrsd9sox5bsxx3fde4ccj4wzoumqh77vqydjzckba0s4qq679myu4mc21a53csyh5s1zdpm5wh8agpkjemtoud3fj8nactj1kjzaqrfpie33k3qf8yoo8ke2e75i8p4pdshf8hkfxjhll9tneu2lnob35j7ap4u0geu3dfsy3kkm4ow47uo00cujcx22y4ds9exuphojxzo4rvz8l97468oxuxprja44fcmxb8a52oz5mw2a',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3',
                tenantId: '1787f2da-553b-478a-a053-4391096a0367',
                tenantCode: 'u1e0at7ikkx636ae9f6m5muih5631dvs1oi5753t7bsx1mgp8c',
                systemId: '1abcd568-4333-415c-b2d2-66cab2e5f8b2',
                systemName: 'e11u7fodc17i9kaw0094',
                channelId: '084234c9-60f8-4fbb-8be1-73fbae827d7b',
                channelParty: 'lm5cunwalebpkxquif1m7un73q93bg3r5m0ozscjocew140u5r06ppkg0m6aqlt3ez1mv51rhjl8bjes84t1q8f7k68r3lm9zsifrp63z0aiybqsrfybpv8jjl6ksv2cfkg7tbzt5iy8tvdb20eegwsryuv2mgje',
                channelComponent: 'xywyqfmni4969zlv1nbbxil7pbatxgjhrgv2pwbx7e3qd79tqnrv7hxcmkx4kx7o12y1njoap10hj3nlx7ry4ajx8ome0a8u73gp7qkphnrk35fwacpuyhy32n7yy84jiel575w8jwyygdxem0hx64w3qd83y58sy',
                channelName: '92p2gghqqwkvwesov20j0tagodrne4mo8l4n6zsjbfur34apiclcucmqcbft4ug0nuzci4rigqpcuedvs1tzbrskhb52wdcblj2m7tqzanikty4583l8fyidowfao36wrb73axnr7jgyx50o3xivezgwrael0iac',
                flowHash: 'auix2nxrdwl6108kw1v82k5vc2quugiyb657ua4a',
                flowParty: '1osz40sldoc290xvu678a6khi5969pe69tda8rrnlftax8sggy2pogzkcpla7lgjizda5c4169jcr4mfquj0vrxfryzt8vbg2tjxvtshwdfya3ut00fnsgjahkh8da0fj6hvbu0wuyojcbwdjwghu8q6p82d7ftl',
                flowComponent: 'g5ywb3sffhw2iiuh65mqo0y8hwitpbwtukp0x96wy2qc6wfbvjte3f5p6n84mn5lxjgmo1hyndikhygjyxvjglkxqioy97rqdpfghqyi0qli1hq14gmi4cjujnvcbqdy7ffj7hlcoluzq6a4vmc0r68k548e4pkb',
                flowInterfaceName: '41q3hm8rqeykwcvjwjts3501xif5w2lx6j19i4ehtza5ggshonv55nmfuulc7xb0r93dmd2h4cs08d9uaoi5oezsmbi942n9j2b7cxrqrt7w6s1sfrr7ymva92o1of3py0k4ngerzz667eqzemdp54kcy14qxs5c',
                flowInterfaceNamespace: '5fc1tx1c6x7t609abrexr53gcx2wpr8gccvlc83usknotxbyyhnlcmlkthuenyo38yjvdmpnl8e870gltvbacpr79zlk7fgedocpqwjc70tze2zprpbcy7yf0gqkasevmtctu3hd0g8nt49wfuqzmeidqxkdmcom',
                version: 'nk485p9w1nife132riv9',
                parameterGroup: 'cz6sfnn25sc1l555iln2vrqcrpneg94p2qeimc5aqis9nx9als1bvd141j3neagzsism16r7ahbo1pqbeu7uih2bvtjvlja81xr2v1svw094inb1866ofxwff4pd741okl5jj15brkyikhkmhdfxei1ir5h52dcv6peee18hk25ocj4ukmz9c0jao84jypvcpqskge0wptu8njafhea65irkhx9r8sqrtk1bkyry1hbrx8esbda14x3az5zlrjm',
                name: '3g8fw7qykyd0roc2umk0bjkb0pzoimccklxpwiin1a2av7p3msm17ggjm1adx2ya2lgvtsna4hd1uiouo5ps1j9t5t4af1697ggzhsv5drddmk6yqyd2z0y79yhgtqpzduq6d0286bo6w2kgulhzzlsfw4h2cx68g1d5pr4cdtndm01hdfoclc8ubu7rp8mj3upowoy61unr53gkk6t783qp4refartd26sfhp5ephjtd2otmt0n5c9q9gqcqaqpib01xqx5fxxbp0oegtv3s2aaqz576l06kokf9d8q127jb0cxd82p7capj9lnq5mu',
                parameterName: 'qwf10fff2ia2cu6x1p72iblew2rw3nm0jswy5c3lyk5vc1yghd0jk5b4797e3pwg9qio0qy1ppj9z3hse7lxe8mrksvups2l0f8oqqiyp3pgbmw8w0bn95ddwox8t9xd02md0hxdo7wevbf2ntk2unnt8ch945fs2qpre6oeupj6iyxws4qyqv3fkm3o2mj43vku4c4uo63ihwd46gv73depkbagtwe74e6xsu8j7ihmmjl0oepr1rp6fv3gbc8kxsfpoyzsl8f3x2bul5pedrz9yknhuv4326i2d6h2pokbhl6bfygqg2c9rtejypt1',
                parameterValue: 'ljtshwyky17sfsylhlhrojldzbshwr8efylme9dlas6mdeeyjl0cismhj3jcsfgc3at9n3jnr0tvjt6n9t9pxzzijd3o75rewonyt4xhfzgg5ixuqznpzgiqd6wk7vdtflwvkc5gb3ks8tasap0wocnydujf9lip62huajf7pg0aihcsn3xk56q3ezsxj5xpmtjjoxpomeobgrs7euyc3hp354o2pbmhqhjf9sd1c69o5u8yrbfeek9j1ydjbhwbbqwst6c6puym6f8z7mszfn9psm3wav1buf42cr77qln6rfzqva6soio9q82ei4hg6t3qn7r6fafl9pl1f5qwntrwcdybjt6f80stlq2ij9cabspuleik7xt5i27dcjdxmidj9cik8nutqzqrg0j1x476oxwn97qzkedkunzf7ar369asclikpyfjagv5fag5zyk6rumu25ntpyta0feh1kc4eo3ahynzhbp1esozsraxl9dhmpr241mozesf9loxeuxq7wggd7am5zrcdjg51h5d3injlbpddpbc7qkyowb6kkfbd55u1y5y7u3a3w4rwidw967n56aya328z290m7ukouujphxos04n44ofmiuu6m0kqsz0pk03ve3w614qzlrejp56d4hr7xiwfcdww2vekedvyetkzlk23103is531338uajay30trgb19qy6cca0lsk8p0cmlfzkkmvwwxvt0xol5qhapalmllmhx87fql6m7oz7i9b6aa3a3fjpmb7q5bsfhwsopvj42aw2rdsaycv04fstvjnksel075xeogn3ttymctdmqi7ndgff0ihoisebqazrvufganvb6oj3fxfylp73grzdwcgh8u31cc05ob0d16grf4hz2dfdt9sl8ktye1nkol2fela294yt0f64wn0r0id6z9yfdww755eg1ofu07v48eu4cueh16k96dc60in94yk1jo0w3tef6tllesmg8iehq69le72m4c2dlf6kv3060ne1iwd9',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3',
                tenantId: '1787f2da-553b-478a-a053-4391096a0367',
                tenantCode: 'k4nmolf5ywjcq9fit2800htg6zayxrdpmhat1ptsxf0ym3kkkm',
                systemId: '1abcd568-4333-415c-b2d2-66cab2e5f8b2',
                systemName: 'rsgpb7rkcdvkr0isxugb',
                channelId: '084234c9-60f8-4fbb-8be1-73fbae827d7b',
                channelParty: 'h0cc15yf1ojcijs1mmzcyfugpfj9bnk8syqg6hkv75zy034yzhd4ipjuv7j16fo62i8hrgxbnscw4wi4xw6rmxxled329j7u4h1qtcppllepe0bsgpm6gyzmy6g934h1zcnpadmh2ru5wblfqqsj1nwp2j2rlsfe',
                channelComponent: 'fapcptjd8qc0hal88pe4zue14abkvujqvpu5swgv2fhedvqj0mbll0ywhxbkvp9irkp47nkd0kslf5imhl4b1s4nniywch8epw2wyd38fy2wc8ir24qz4yr5pgh0t2czbcbace5vuajwjk3ereefijxfk9pdzpzu',
                channelName: '38gecpeof2yy3r68j2lnk587y3i8dn51or407c23jy5no9m6h5zkl531s9pt0jn548ub6b5m204hj51kaq692ftuoki771jahw5r7tpcsnzqx9vecf7m3g9w9gt3fxslq4npucjxudtsqvw2icjb01etuq2bcoonq',
                flowHash: '5gh238e1eeg1863g7qyncqdvucpb0nulvi5x78a7',
                flowParty: '8ai51yb18s3w2j98qe7t23v75xa3288ea1wog56s37paaiuw3h80zbs5k69bt0zj0ccs5xk74jq3oqvn1g6djqzuy5drjybbvw70sln8hxmy7ghdjtwsjvw23leov3ybilzx9y2fnlbeq44ly1iqyk1gci6jasno',
                flowComponent: 'yzsabr2p02285ffwhvrsutdtunxr58f7lcvg863vk6he6j60iqvn5kz2x9xjrvmyfhzxjh8ov6u4yk2qsx382t6mi6mi5lasitp9zsev6ixrukdf9qsg42xoh806lxkbfeydskyuzlp9vmo1b83h10cgccrw3tq4',
                flowInterfaceName: 'xxcv2vn60roc799p2lg0282saezm5qk2axt51gkr3vccj5bbi4o89jn1gx1x8u077gb6ss2wqj6fmdsbsoqkact19quwjoub22iujx4l8x3dk33x1d1zx3umrprvgeotkbbfvwwpj12ll9mrclzxx6bgpiji9hl1',
                flowInterfaceNamespace: '0ahcpqcr1fmvuzlv8b2va6wvdhfoec0lypw2sh4nnggml25wg5r43eggmf1pqe64txxjejcgpsgn66cus0e88epwt8ly2woyfbuxsih13kqt4vk6gve409bkiith1slv0ov22etxc5xdad23jj29fqh68xbo4bdj',
                version: 'oez6w785pvwuu5o9qwed',
                parameterGroup: 'r4fwakimsd6ahpixibtc5d6vmqkpfz6lzi854bm3hqmy7tafhbscamgwalqb6mqkfp6k4q6c6i58psy7pwdm710vxfea2lvoglb41cvg3hkhz1aj3j8azuekcgny8kenzxau0iimclhsk206m0jioweajr30k74u6cful50duljt276ij5l29l3wmtzcna4fs7n33h6n2k063v7pur8d8o5isqhzq4qz8end9owxnvlyqcz571buy4d9yolwscq',
                name: 'bv8qqu1ko7cxxefqzabqwt7dn4neiird11to8yirlmyjbm6h1a76h7hlj42w5dsxm8j5jjfdzd8qbqxd3hbnk52ajtv1zq72rit79hthan1mk3lxenkodjq7za9ilp5i7jpx40l0ovs50sgniaumsr79urxyrxbe8wx8lseowlj1ry684ip754r1zb8hgpn3met4gaim0e7e4w7rht9xog4vnva1kjukuueuz79rgoerr1fexej055kthgsc50ytvyorish3l52kpbis7zj2tnhafmlciujk42u6xle6u5i8mg05cytyl5zk9aaqwvm2',
                parameterName: 'c72n293plqpifpo001alrziol886i36km0qjun60r6lk9x5u2jqx18jf5q2zmiklnoj2xp0b0hsv7h34geoor8ajcp4pqg29bqjj5cehni7pr94fb1bdrwlmhxr6it1ciajjs7sqz6tenfj1ntemgfbamdh2hosfrt44375fao0jquyrg1a8638bub284em8atr8s2doo7efcl6v4nbgugyqfl7xoh5ga9p3g51cxkt1b0hg5dkvqh4j3ny2a6d5nyzqcv3p2zv7kf5cbz75ertz1ehnomojya8huycms61d3j4jo3y584dof8hfxqec',
                parameterValue: 'lenfy27rk8dqe2jhwgkrlbqdobycmpuss5am01qbya6aihq7ekkmz1zvrfx8o3u9r15b3w62tj4nwdvx6wdcziv143zn5xj0fla7fkwvbmm31fnl0p9a6q6870eu2zn3kwfppgp67ys9ta5rzacn0wl109pukovkeguwjt6hmbb4ocf6gmgk828xqxkgxptlsf7sj4c24f129qufcnvmbqswyjozye0yh86hnu114a0cy6owhhxavtpjnrueomln89akxkjq8exhmsfkn1v8jxlnr4ufqp2q0me4h0guwnidkwwk9t738hi3jsnpug8w0r9iqiijffrkzh3ealfuolaahl35nfft3a8qjj2chlg4tuem46ont52h4jna8y3jm9utlj0xw7ijpq2zn3lkjj5sa0iusvsi04txm6hbs8vbm184qd5p6vmhzhf32ceybd35crdztu6jkva91jrovt94box7ggy2xwhraau539izjvrasmvj5xdf86tdrhsz8sxf7ff7nk0mldnnnoozcvdm5fo88w60yjmk2b32sueh9b1l32cuoixexvtopk7rsq4w4rt71v1da2ud916gjvkrk89868xd3r96v3s6r15w2prwqp3xodzutyqkm9bvxf0fpo0mbpyrkpqhktti9cmnpvula01puj13x20abynekzmybksk8oxaom7ysyp62b61fc47d63jb0p7cjcgmu2jrzafil9ozmmlwm01fbkk9bmn0mol5j62uznbk4rgvz2qltx8siso6uv936y5wgrig6ue7h51sfkpc1cmb3eftolt9g99v8xqi480qsmvya4612s3lz6he2aci0ove94p6acx37smr36w72psbeucfh7hugndhdctlfgi5fluxjtx2ks3kx631p4k2ozyzdniird4i6lb1dwv7eqbs3dx9rdx3siudwczceve715vmsfnui17uat6q8iyyzad3huut4xfcvyyu2ae7y284y45hilv0wd99uuzlxssfi81',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3',
                tenantId: '1787f2da-553b-478a-a053-4391096a0367',
                tenantCode: '7vbg3krssdaw8qwnd3aj5y5i9stxzb0eyfyhetaayo79i14koo',
                systemId: '1abcd568-4333-415c-b2d2-66cab2e5f8b2',
                systemName: 'uca3nisysqql61nl3l8l',
                channelId: '084234c9-60f8-4fbb-8be1-73fbae827d7b',
                channelParty: 'a5cwp5aa5wkzvc9zurvu9un5499ggz0wxyj3qcf3b9zwrzwmj89l9bcc2t67avcqvyna82yku6bj3r60rfbmbb3zhis4o3bic4r9gqrbg7h4z3teumjphsmyv41xhq7mkxqcdy0jaixdeah191nukyxugh3bpfv3',
                channelComponent: 'pefp5sk14085m0u6dugfd3qdul2mwi2fsn5geow0vdvisy2qvjqlps6vue19jcvrzy6juf981v6485bi58fawirkzuy2r03efzyo53ay0a09eqwtd64uxa9w8o2ssglx2kziz3kd1ajcpl1iuk34h1ktbir8t9gk',
                channelName: 'fwpkwp9z0xa1nixhw283jdxe20jbtq2u49aoiuidlf4sr6gcwsawk69zdkwmtk931ixsn1vlv07r9rmzb351abaqk1e46gntgzq165ss8dhcs61gzlt264aoasyquk66p5ufj4s0f7ca61unlehjva478mgwu3fi',
                flowHash: 'v9r2jdffy8jwtwcfou2x2nkjtpyyqa2g9gdvehhb',
                flowParty: '1i5r64i5cq4pey89x50js7x9pdvoxnrfvue9fixrxvs3ofgkr6is76bsj7cckf5v3obqcx1gw05vcr305qo8manike9o39dk2w5m2u4421ublztsklniztb6znt05r01d9noifr65ypubsv2d0ubkyxpdg1mlmna1',
                flowComponent: 'iu8e1r4p75zfyr1b28laa5y2fgmiy5p5nvrrhrz0j086pc7si1y3ak1dofk2cy1vmdxa1cfldlqdkvp3rjjv1z5g7klwzxbbendfl2ryxxbrs6w5isashfyah5gxfspev655me3vr9nsauiljdoyq08w38j7pm4m',
                flowInterfaceName: 'c06qdjgm7s6poj10fbtxbytaxnbgtmo8znhbyd7wpvuw42ln6fd7nhanxo18n3f1lvl3q0iduatyb2ki9ga68m24bl5sq3gapq3olkadped1lc988cgbg9zjrjnn7t6ag0ucdp3jp4c46xn04dztfcy392gqqosd',
                flowInterfaceNamespace: 't0fdf7v11cci99erqz5v1dyufwc6ypo26sd3iigak04lc7h21pa8rvymwubgot0i34vqz5sn82b1hd7evhxwwowni1jdwmutertljimam6czzxmr5p6kat3pusgnrky9p4qvce7sva99g8rv1usv8gizeaanawqc',
                version: '2yvsupv1m6yv84ovkznz',
                parameterGroup: '1rml26si24f18delfixb2exmwwbs2wy745zsnsy09zteow1ecwy08xdnz8rel1qftgrrfceghtkiwdc7ujh5dc8enpq90gzhiwx6ctzpwwnmd6fh36nkc604n3m07gkx8kerlq5vt0zj6dhftjz1xkl31xmgp1y7521ys9c0370wvv1yvznrropnptzjnpg1hrie0loewd92kzmwh0juqpy634460az73x9c2kuyuq2joga4sv9de8fost79jvb',
                name: 'gv22ipyiy9k1ejm64k56fmy4jlz515bzhftih2i1jvv7zg8sl1h4sxzrqlvdz8ees1bpesz8zqn2pmfs4davjsu0nzr9o0i9tszhcrfabx86pby5d7m383s3amo7intvdirvl0xrlqr1ezkukj4g74o0b0x3a1r4lv923wsxehxzegw2a5t6vd0xos4ml3dsa1v81m2qa67341plbo4tdkepodg972rs0co1d9tbo5wxs5tmhk8d1qtqcb65tls0x79x9v3f2ba7krcs5ml0h08p7c3otoem6idkd7ekp49syoo05ymbmhcm9f5o0p7x',
                parameterName: 'x6qfrmrcd27764eip7dokb8g6n5fdg28qb8dui1rum5an2qit8l0m3ks92g7d7ejn82z1zjk3u5k0ml4qwslh3d2zzobyv6wocp2m6npxpnugptp705r7z8qgyqg3zsuyma3ftgwgtgruplrq7gbfz6pzy16lrqkzoohyhmunyawcqijhuawkvf5gp47c67ri1wqoaf1ix5yilk0vjm9ebk1f2gobe83cxdmidlb2ul93m2getrn05n78llrxbp5hhseg0z0winseyxq1ymtvgwl2pjoyxgi5armnm0f598whq3c9dvlhiiw8bbkk6lp',
                parameterValue: '08v5lzyv6u263h7jbuujo3efioxja1l12wnegebwl46a7rkoa1uefmlwl4lmi5b0tet7mqkwfm1zki30jeud3lit00axkb0zooe5drcb596jyl7yux6jh2lh77wm27jsispnhpgbtthdu0tvq2k8jqcoh1pe0jpt3askekicyu8v9b92j68croo621zx9daprarro16julnxh6b2vucu0anv9llmsvpjyyrb9jqkaednnekxn87nngi81cp0ay5aqwzyky4s6d2aufsq5pup1n1cmdfw69toki4efr7z14m9fcz0dd40arf9cqjo6641ufol69pym9yc2c7sszhs9okot6z1oxevuzkeikn0e8dhhv8xxuvdt6fsd5sb3kmi1r8kiinjlehbwky1k5nm0mpwuuxfo8frzx1m77fdrkcl776ysuszbk4m2q8nfwu0wi0rtzz92pnclvpsybli1q799qir9cd95pd53g8poug1llookqln672q6isso4539x21v9f8x6o08azqgg4brjlbasfru99w0kqhw82z4eyhc33evb6cgua0qmgqtxyyaizck80v7czrgvye7li2l2dg5e1ogoleekjzfu27awch4bp1nik43grgzprjkhicl2g3zo5pmlunjwozt4b0rebgqkh5un5tqjnj8ghlp6exx6ahijlv3jilg2g1fzhw7sgaa57jlzcwz4nvjr3jfcmd8tg2ih80wy4vyy5eujvw0vkye5r7t4b0mlfct0rxj4sculs31canjhjp5a8kizq2kww5zkd4u64l7gz91hipqd5f3ikcad8wl5kpsdnrgvufr9utmbpqbzasxcj25nzxzdweixqbpvexgb2et5ig1qzh7cvsklhxnsbp6i9ms69qs321aul87p4gs92s9xlu1zuu1icw68c1lttr9u247gojgctl7kiaz6rnfl8vw8a107mikabl9a2n6l4l8pznxpa2mqxy9sbxa2urm6vj9gytxbwizvyyd1kwisre',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3',
                tenantId: '1787f2da-553b-478a-a053-4391096a0367',
                tenantCode: 'nfi36yyr7d6hwcbgtpxjyapp4nq53xizla0nj9annvdha7w8ga',
                systemId: '1abcd568-4333-415c-b2d2-66cab2e5f8b2',
                systemName: '58qrpy0szcvdjxnuyu9t',
                channelId: '084234c9-60f8-4fbb-8be1-73fbae827d7b',
                channelParty: 'zlsfiubvs3zra5csmp97t7ktfhr7cko8436xl64af5z4r9ftqm4jui9kvl92nwn5dqqj9ralr36zg5m4a4fc6k5vtu0y0y55ov4ehzbjg50zl95obol8cn4wy17io3991a1eq2mp623n9f5slqypn9wolc86miev',
                channelComponent: '4dcdyxdxdbfbgr1ctzv230imaiitp9iychidexbosrsuuqolbzg627rxq3oj5ufb2owbx8aidmm4ra239t4yahom5s0b7plpacszqd7j1o92qzvkomiajj4x7iggztc8ium1oizh16s04bgg1n4kyrkauxw4tjbw',
                channelName: 'btz7vneyffc9y194zfwtkx5v2x7kipj4qks20dhjzalbayjgf55489c68i5l4hxf530sdy48aep14wxoo2v6phjwnmg9dd1ax58kbayfa7lcyp90t6rh8vgmd7a79l0xrrcc8y4lq3azbm3vuvwsq411jf4zmqn7',
                flowHash: 'hvluciiy88pm23lnln1ujfn4tweetlfkeqr0izn9',
                flowParty: 'rju0k8hufmhx0llf59tpxc0gyx5g9ntxrz3ogdcdeqht74uaqrs1aapchunynmw9k526342r45e1n1r5pepjpwn98g3o8gt3mbku52njdtupsxyo7bvlls6nnomx7qn2t8dlvfp1ym7antrawa8djppt3bo7lqtv',
                flowComponent: 'jplrob1p46ej8jcvetvxv0nf79ls5vlo6n124usabjq55mj8psa1a3g3evxbvd8y3rkjzudqp9egnfs98qkhqa8q9zffr2d2kqaphbytuic13bvy8w3unvzpy9gw6b0iivic7bgw5oh7bmebb5l34glgzxrfdw3od',
                flowInterfaceName: 'hp47burs3xze2kufa6wobdc3uakpa5ckl04uopyi54sax8iytk2dcebg1pb50e62t0d1duyp2fijto24urliepqe0p8e4vs0uqperglmgzu23v1bxgk15ft9ndc3gh56vtitswv07zmhwxbzqw3aagic9rn56g16',
                flowInterfaceNamespace: 'ayypgkk5amgr7nc3zh996sqw4isls0vhxx2ywajb4f0ujk2sfah3lbaqqmqzgrvjut4sesgqbzxe4uqddps7zzuvwpca6ba0a9ndtoji8mj1m6s7q2jdresn7dt72vrqo4np8xvae5v5brs2hecrjoqrpj1iauba',
                version: 't9km03fhsiuk83wym08i',
                parameterGroup: '0kessy06u1tl593zjeejs5iljpogq0km54j9r9oy1i3b4hns6xw2v39tp7tn7m1yd0ghd6b6nfuevwecgxhuaavl32hp9tlkd8w8wc1n08xeoybcc8kpfqrkcs9gu16g6ok3knrdkdoykaqezbwehdibzjyxdfk2a40bluwcvpy19j3yynt5kg34hizszg3ls2wte0tf5dafewkro490impkcyopftmsju77fzgh2g1sm3no1qfu6z68dmymly4',
                name: 'zo1ng9tplcyfckeglmeu49uydwy3zupaa7cvyn9a6n6sizu7uab6ljrpi8k3qm5wyhofqvwoio77vij005pum9wsp972vjiw9qf2u12y4y1wr7rvskw0s6js57jwmksg41doe8rw94sdwu12qxgxy4pmi31r20v7hdgu993ohqudhsi4muonajkld3viurlcudej44k4o141nniu4x8nhe06rs2we22ian6wf6wiyrzfpxuxp25a6joylq2dak9gb4mrxue96vds1lhtuoce3a1a9qezrgtxrif5rfhqwel4zr612quo67a5aquwxbkn',
                parameterName: '7l1elc81caxznfvarksawi1viy03zzbxqjqjsl0zkexo8jz49dogyldsqtthx7n03shkikx03kiq8wcikc9h0b2n2nevqb5zpqi2sxn6mf5utjc6nebjzv206huonywnwf1v1q7yi5iia4pdolp7l1agid87keah4sv8o2a2nenplbstrc16n0yqxgwcrojq8gfr2so5sozuyoptevmo4vry0p46kc3za3w4e2z9ekshbn2rabhgqgfd30ezq4q9snzited6o9jv3z7ocvviyjggzcbzinhqxd8ks1k6gg367h4tzbygzkwdaspghhbk',
                parameterValue: 'g5ha5bc1ywpchjon1rgf8uc3nfmlmxaqatvnb2b2932al9uxk61rk38jc3qtbh0ujtg8j2syfwigszg8asgy458d7vy3nsllha74kbalz63jpr5mzbjcofws9f32nouhi3ugwaq8fc6eklw3gpvtclcxkuntn1bus928sz3ko6fmfrcjxqgmvp7x39z525kc74zbmi9dj8cjs2vvzbzn5fkt8yeh9cw5xsl80o4az4y0mfjpwzkki05h3sq4tkp4t4psxjx7o0w2qeyvsjlptj9q7tfxgee8kdi3ed2lzbyrwldc8koe00nfzrfk3ot5tbq8dswnn7jbrykycfklin3yta1vmcenr9ab43ui9km8jq6ivdllxael5oof1236e7u6i9c205moywfh8w2z9qgfpaq2hny4pt2ds16n9qsvsmotgao0r19dhuh8m2vja9wznlsjayl09582nls1gtjdb1b08mjh6r0h9ugv7oo4njkex56pqq5czsoo4i29w22656qywsp5vnoplsn1ajie5hsbkh1dsa3jrg17gxyn06dkf6yvbz432xcj9oxrdi4kisizmkzdd40urhxcn8s9tbjdyz574mt0mx65uww38iqmrbegoss1waa7ck36tits68p2lvsfbjlhkz726xc1c3srzvvplys7ttqrd3cc8efruk7zhwm404oy25jcc34snvrnt6bmjfpma2v492b8oz0tndvyr1v28vt46cmzqox0kueubxxol1fpmgdyboszbntx5eqbm7llxdtdpge2lbl9yerl5wktv8bjjlv5lysgeaocv6592mdb3jk1vw8ogtiixgbf9gxn6g17rmxacryu3phi603n99c7h1yh03u1avrrazu0i7buib68fptbgskx4f3ddi9ie4o5koyvjl9a5mmbq33gxqtvb28slflrivr36dukmtky5sdk08xgrj4jmml9gl4yurs3je13xoa9pex69x3jwt9itmjmylitbngm5wutumcid8w5',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3',
                tenantId: '1787f2da-553b-478a-a053-4391096a0367',
                tenantCode: 'fvs8mv81vsu2jp253fgzamp55nozigi4szmxl37hyx8ui8vdq9',
                systemId: '1abcd568-4333-415c-b2d2-66cab2e5f8b2',
                systemName: 'dn5dgams3ghffpk0qn68',
                channelId: '084234c9-60f8-4fbb-8be1-73fbae827d7b',
                channelParty: 'sjzwlogwbv6gd3eq9nehjv5hi1s7h8wr0b5b63wbp534pysh9asvrphwne6jq4gdbfoewbzsfi0qee2fpm1wqflprzbofleke1h6zmqs37csiy160gvy9r3hqx0kmil0a4ssjwu86heik236pvofr1pcd3crlx26',
                channelComponent: '9uthb7ch6beq8mosviwycxnzbtl39a657rcl7acxyvooisnspqq2kbwgksz70w2lnmgrmp4fq20z1omowvbkdu22b8ozhs6wic87md1eear54wcqb0trcb7gq9nu1t1c6q4eczrv145ulqe8fs3r4nwvsa5knv1f',
                channelName: 'bxphoyvspbwvffbszgpvpna1fpi2gulsy0v434pzr13yenohotj11ygpwhq1ji8n0hdg2qfjjep8h7i165rbndyrnb8x1ab3ypfno6j5l4de8h78s8ijeudwdzk95r2ws1cums1tkp2jw2ctbkzvc3pq9n2od3t7',
                flowHash: '0ulus9o716gyjel5n3o2r42ikboxge6kdwmubnsx',
                flowParty: 'r4ynycjsvvh6w47qrw0p8bhv6hdoxgta4q8gkn4a17uvjbuemmeiq1sfbehmfaquldphz19uo3flm18ht1sez138tzpbavswai75vr7s0741hyvwofh68ahb7r4o9ljl6r68svdhuq84zl1okbfb4u3tvnsxvxx0',
                flowComponent: 'd64kqnim6fmjcq2oujxh5478nr76t4hrne1a9u1d8qmfr74s881fyjacfh46s9y55coj3vazqgrilanh0wx6xpeoujmk18db8nxewtep42ojmfni8dxpqxwmspt7cgvowk7r66s1wnk94pw0t2qu9n3d4lrztd9j',
                flowInterfaceName: '7b9v6at4dvzee7n5us7n7jeqy6u0gwhaa9lxdghyq7u2ul28dfvgygrnc1nuw18d3xym0xbwyy3mbpglihijoogj7o0mquydju65epeq3irztbr70xd9os47vn5ueypqjvjfetzzf1jpd4k8xqp9sj89rn3rprhot',
                flowInterfaceNamespace: '8c9vb4pkz958sxkegqnvmuj3imw4p8rgvz5mjklrotnf91frnt0bzsgiyaxi4fo9ok0gu7vykqr4iittpzddpijuegoasrqvlyukr856mpsjgsqvph01do2pda2zzhvxm6x46sdub8q4izdw1qz02rmdmj0ul7dc',
                version: 'y5ksctid9krav2gtveq0',
                parameterGroup: 'se4r43lenrduk86rtp92u0j19nwm6nc9o1mgzs4az4wwdhozyqqm17oep7x9pa38ske13sotzta2fkj95g437ths26o2jwp7juskc2hd6tjps6pthhbdbkohz5fef93x70gd1ymixbbxqog0pmwu7zxx5fyazl80e1hs1qfbviosoquho7agztkolsjx9c1460nolfeccymzbc8acjqvw5bkjg7rn2svije502xmq0k3aucet8oebyaz8o1fv5n',
                name: 'lo94padtfed3mn6l2hb3dn9a32qbwz0dmnlre0xa48wbuvzmdifjyqvdhxpwa2jonamr75hufdtaezxb2g288bz1hx0o7x8utwukya5d55qk1cta3h6xsixgkqb0dkzt7ffp04f8dqk20780vv1lv2jrw2l98klxbug3ndymjgz7hignvi6rnv4a8ocy44axmm7u0lyf3j3r5v0jwqea4iltxmkljgdfa9gbacej6alz1dlhs01h4qegtcwymk29fi4klpqhm9znr0e787o7wmulrniq7dkeo0ij88r87iuxazr4889negdxw8o4k9h9',
                parameterName: 'p0ri3obe4xayd1e1r52tedbjsxdn2ol8v9jvywkpjnqlucp9m7iswtov0qbt4ht9f91zaxouuhzh0r8q4b3y6ii5p90300vy8axldewf7digs1vkeuij4xqo77ptb7gl0vrio6yle3s64qgp9m96zldl5qx9n81dwx3tb6yby6iymgo0ny2r2j5qdu3zm5o5puc3m6yqvko7mullqol91uefeiqnmujprotqtmbba9o4bnwdngk508q5tcwujrqjsf53yw5yl054jxy9ifc7g55aqnshhm7qrxpejqchd6l3olrutjzd5mzjm5dym7d5',
                parameterValue: '5nctj0ybc5hid0fr9sjwytv75b6lxzccshz629b1jn6lbu4o1gjc1bj6viv4xsg9fyw5dln2w3kvcpd4xb09drklk99edmwh6j6a14uv9z8j29nlpt0y8slc2cg7mdzwse0r5ky9jslloagius9z4amnr2m90acbnm0dcpjbxxj4j2fwpid8jkf59hrbbq5u3hzrzsf5wr5fzg2bfjwcj6e5pw5lgifzlext37gikby8axbgeqp0blw95mmsd9twierc87mwyizq8xjxulm09g9m6hlayuu1vtoi4sho2eijdxit9l9wvpw6pdymcifwpplcqfvr47y60j3063964prb0q5rpgm29lkg4xekyglngxtsqvmbv57mv1m9zpfgsvducf9uaz7ka6e3sch61x2ic0t4uoqlhliff1fcgrbzj7k9ize4uqujln45c0tqyh4f5tio2bwxnmu7be982seqiwzhane24509oj9wbvtjk2egvm924tcjbsz55oqpfj0n3fxi3wld5azsdro1v5uwhkuobs7jdrvyade3l72qki24d6y9vhuqz2gpgtten8nfqsknlaojynf3r09e5wg8vfyhnsu9w0fgyjzf9bhmiroy70fa6pksjha7myaehfwip7s3myv0g28lwd9nbnafbdii2sz3usb8c1ep8adnrjhds3kepnkqmgooeg9ub0ub6o22r3r2bd10k2k6u8fhjyuxk9lhjn8xapzhpkw5wjy06u81drnoe8xy9a6zgajleed74hs9rfbw72pmn49bhpdoobhcnkwaqo5nxiv0g6cb2sv5rdng0ezm12ng5m0jcxki3u94reeniwsbdq0n24uc3jehkeqmyreda7uoptiv7lssm2bg18m23l7owwbce92w3e2lzm5x62z3oshd23tegdergdsknu9w8aedyb8yy0tqhynt0zskukpo620scdtoecz3hclitd6j0h9qwxhyb60odigvdhrzkhpkpet8e31mflsv0o897x70',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3',
                tenantId: '1787f2da-553b-478a-a053-4391096a0367',
                tenantCode: '18fm5z2jh4ubp229w4uc4i10uyo02czlkfmso0f820hpl3h2fq',
                systemId: '1abcd568-4333-415c-b2d2-66cab2e5f8b2',
                systemName: 'j3lkseg3fgxscszbfhhy',
                channelId: '084234c9-60f8-4fbb-8be1-73fbae827d7b',
                channelParty: 'plwutjgvsp3xkoeyps261toxogvjbc8iolbmgp91499ibk764b1fjsrtwvbjeg0968tz2e3uou49var8qlar8p27n99v8fzkvji2mixhdpwvpin1w0t29k8071a1ysbugsxh76i43lqqxcfcpknq7bzl2oqys4ec',
                channelComponent: '4y73bk5pxytytrwbw7aequ5h6b0y8g6cxzhxt61ocae2gs4goo0clvr0sj47prtdnckrny8qulk9whqvau7silv1ik0mi4ae1nuo9igbui3x12ink5mjzz2xvxyumezx7jdfw1awp56kikavgt4e9wsjqfytcaao',
                channelName: 'd12f8qd1yv8ahgk0bz2mph9828wdutiqj7yktvwtm53qi4mc4in1008w00fn860n0wn9ag7qzvn4h4vw8bk1r9k9l5wbmvh2ghwtt2vyfs45ca5tqod2zbv0oyym7onhaxvuzptw5x2b1jss2o8cjwyx6427v1zm',
                flowHash: 'fufwuj6rc3do9jolb2h9m5wqpzkgcdknct5e33zc',
                flowParty: '4yw33klhx6b9627g1gw50p5mrc69godi8g8mwvc3ayzhy8ia0l5lglgc9w55ktuhus6z1mvsun0m3i51m2pcv24ohpiqbzbqsx239qec6avyoapgtco1f1g1u0uxiu4n6y3ws5xrwwxcj11brt21hh43y23a6k9l',
                flowComponent: '7faaz0xq2pdsvmaehzc2aja83y9khpk44gcuk28rmianqh2i9ixo7yn3iod9g0b9q70gbdqpg6ojsj4rrbcxzbgre2e9w5b3h35qsomfnneyoj3n4du6yzoc0b94oj4qtfwd7iyx36ypxlv3md5l5tetyq9ej570',
                flowInterfaceName: 'p7zhdyt48j21nzc3zad9khycjdu62htc6p14ywjzeqz41r4h8xurh0ows39mgefy5lf94zeoatbhjxnsqa9z1oevr373ebhcynjkquvz01rfq09vfuss8mw71uap4t1o70394it2dtueovyj5p6e2pllbhe2hotk',
                flowInterfaceNamespace: '11btfsjtcu6u9lhhf61tis2ilgteqhvbyqny5o7hqxeo2n94cb22kia368ixdlxe04cpp9xhvv4zy0ttcyfzglqfzthwxwrnsginyc02xjuts725ijfwmb92bp49cz1udpa1qacm5wsi57ktrxiz7oaaeoy2kz5p4',
                version: '8pduh5bmvydkjp8jeu0r',
                parameterGroup: 'xfj2h6b4gj94hdkngj7f698hctgi9ujj493tznz1clu79v5my6u472zda376phzh5efjq8mfaw6zyl9du0k86jmfzaeyr4sz22m6yaqphy4yaj291nwhop30h6wnq8dypf2p5v9bp1hj2x5id6qp4aw161y2qgkzfh02xhnqnstdumu9alopegdwyz8z00hufc4iu308jnhrrp5cxd2t31fwygav08d73kebcego82mlqcmtj0z1l48mmslvlkn',
                name: '94waq78kltbqbcrq51s9zcck089itd2ho1nedh584jbewrb3457bfyyz17eoffhb6jdk43raneetrluodkk7uqhlckygwwl2zewtc8dwobw47g0ed6eee10ghruvascrtotyhgwd4l2iaamr31pvh0qgvshawmp4y291f6hmmf7vtlovf0gifn6t3exy2jabkuhiz51hkjqhr7aejxni9wddbrcva5gy8asxih1e3atqoq2bt4goirr3h45kod76cp17cims5vje3h59t8rd9lxv3awxmrip4hsipgv3c6q0t0a7fj71ewru7p36ukr4',
                parameterName: '8q3a7nf3a1oslnfve46o5zhntfs0o0ocupqpj66k2a7yvfcsydq72tux6s4gc9hxkbjlqs6rajrhi5pb9b2jh46ebhy3zr8rx6w3qkjgl8txzp2ktmlvesvw8448lz7xygq9lued0isfrkm8gkjnh6u7g8fbgu5ougtw2xa2enjhc5zy9ro1m4h7mpz6d6bspj30c9pq14f6brkn83j91bzovtdk1aht1nnmnc1sxg3wsolejhkj9fo27ttga3v1rks6u8p88sua8wdr7cpjuhjzptydt9wy59du88gdknsg89h6ryqpjjbqcnbk7835',
                parameterValue: 'vvib28hrrjes4b6snv76nfj6c8rtw1ed8b9t61tmdia7xagpd1o6bwde3neqkpqu4uchq4l8ypuo6scads5th33zmdlqejy7f95l61oywpxaczzfcn37y2obp4f4xjrsqfdnukm688dpzrg4txy6avvcr6x27mljazfyadl6jf61fnow2xwl2vjmntr3u1lvfa13kaq49krwe1nkm353jitgbhp4gk5pq3km3lmiv6jvvnt5f240gl405ydlp5q7pwut0pj726oiqqz8j26kayvz5spmaac5evgi5fl8se8hgfhbyfc666siusttiteps1avfthed18rffys8gest2k5mkgvb2099y4zd3men521yadczxuwpvfb9ydsh8uy5nxusfuinpff78e1ffpozdzwdnohutm0w17kid3wq0pbnmfgmvi696psv8tb94obra1t827z016szzsvba243mu1zwm12pywkyjlzylwstbuec53y32ks14akf8gk1mykrs8xrvue0bzdtrbz3flygegg17rt2fz4hnb32t4ezlaim3tbvq5jswai6w75l38zcnm33o65u9dcbmuqs26y1lqutlcluarpbxv6y3kwvzsgemk836qv9ypgnl9lvpzkon3lse7evjhwvoh3rlfggqzb67jcgi5lxz4if0baiy4j1e2nbdu3z6p7unzk7xwesx6qp312wxt2a92g7qhh87vi00m3qrrxvu2faf3txepz2xx6ayar4v307zf5e4q0emqmmw2uzxdpfpd94w38cjeh3txbp3uahp2vu37w5g0qpzp0vbluhjxzccpk7ysbu9phch1rm7sd8v4u5166nctc7j72pwyz27hkyfd2ils1bphzo81ew4rtcuox2qiswi90502zthelfmqsakxnvrd7guqz40eipxbdnbi35i686h553o65u6mnyqohoe9ofsjzyuqjy0b0mgi2scsjz4w14hi2sb0ijeou6wafrrtterkjq3rcln9cryrtewx',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleVersion is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3',
                tenantId: '1787f2da-553b-478a-a053-4391096a0367',
                tenantCode: 'db4c5dif9cscbkzrxgge9dg4sozui8w5v1go87vfsmrmyege5i',
                systemId: '1abcd568-4333-415c-b2d2-66cab2e5f8b2',
                systemName: '4z3ju17eei00bxnglct3',
                channelId: '084234c9-60f8-4fbb-8be1-73fbae827d7b',
                channelParty: '6qv97hy5a8klmwjgc3udm81uy72e4wjk0f96zjkejw2pna39zxswn3x4og2fgwg96j0rj6gmo8i4mckzu1vzqkjjyj7o5og5t9zmwfyohg9nnw2e2qk09105g6zdoh1ce3mzfeebsjzf8e93g851o9066gy6j2hl',
                channelComponent: 'fzi0jv775xqwcy2fkpo451zm6ezemzn5x986ezsh1vs46o81wquauls659m5trnxnktdlndh6x5xfs36pxwzfl9gxiu2pmo6rua43fiafv7672p582wig3hk91zr3kfru5rdsz7laplvxtvo8ruatam27gylforc',
                channelName: 'th9q3z8rt7ghw2569n98uikf6rzg5gf0ra93jgjoaqi2gii9dvvxk4aw6or4bzxinaitzbkvwtctbzxngiu31ah1osom7ap1xohmkra7celk6bc9s3m0j2cwyteb3z20jrpk0vagxlugwf9yd8p2tfkzntxq328u',
                flowHash: 'r651j0k2gwdykbrmfq7cu4egz42coy6lmr45soy9',
                flowParty: 'hme0lcp2fjswmdkdchgsne9kz4r4geg3a8fi4y8h2kl8r2do9nabgaivq6g7k4t25a8dn0vljqp8gyhjl8n2aecw6fkq9f1njthlj3kpr3p9u3erjudyi6nr6anczf58nyanx7s660gunwsv0s2zjsjshfrye9h4',
                flowComponent: 'km4am3gcwccc18fgnrwzgkpyqdlhko2py2sz20po0poa5784gm422i70w5vbvkxyxxemnpqpcusb6r0dv732htq4w850y63e8gyd55ti9px8quugrsbxhx0sch19k659ggd4zfiwo48w45t68ulazmu0awfbjkdq',
                flowInterfaceName: 'wlxobb21c7s8m8gyz6pjm8e3okqnxh94jkpj4p6lffiydxik54nov7gt3w0pjc87rq28vm0thi3763090g7rjvz6rjafsf08bpy19wjteluxs82l2maxev8p7wrd0gazcbge6rq6lllx1d8u832yrue43o4hf58x',
                flowInterfaceNamespace: '1mp0978yg2q5er0d7c38l5wib0taqu1k6o8ipbosffi5q6uuxxielhric8jhoii31l2f6tprfcpdobhqftgv6balqb8c96eolbu5dxh8w1cfqfeszm6itfcpjjwaiu6g5270i4o50n4p3p6wwco90yzn9tuk122l',
                version: 'qitp7bttbi7h7pn8of35y',
                parameterGroup: 'amqb5m1atwozc653my0qct6gjpem7964epeumxvy4seus7s4iwa3n8u2ogffd3pncxhcls3yq949bhm1rmt8chk5w8unvosaq7qx64zj593g1ln25mse5yytftik2zfnephddd11guzspy2fypgrgvzs2p18jbiodgwziizaw0y9d3zaj3c50srabs458lvfqnjcebez543qf67026dil41hw8u2u0ggg6gbm1oabw0sectgb6y9sdxlvgcghoj',
                name: '6a8auhkuukeei7k8bx4s7zokggxw88kxjrldmq1cdgkrzlrgfzql85yv7sx0kqi0pprpdt5bzvf7nuuyxfr5zqoeld2o9k34pxeeo8nowairjq8qzn5103h5a6heww2emda8ixgx5h88zs36crzpym7bn633pkr2pjs5atogqj63bcpu7czmr01ehf67nqp2ywxf6c9ajqpxb7d2wlrqp3ltyy9g572zsb1t4cc08h9cx5yhacdtvjwm2ure7vmof72lq4im9112lgplnzzpd6ayalccnw9ejbzua8d9gd08fg03hc4gz3jjsgeh97n0',
                parameterName: '4xcu6gbc0g2sjgdi9bwskvjpyc0dl0wfxxix0kxjfxl4tneze3zzq6d6fwx3xt8r57nr6qalz5vgjvik02mu3roare3n8pye8t5kgy89d94tl469botcf9h3h3lz0oku40rmm2jjjm38qhq63hv6mq9896giyyooqcqe3wj7n2vqltkcz9btmngp21z9saht7beevzcaly16fwlpzqdef7zyelgnfgy75v79x9v1aknm17u4ea8h1dnj2l19yej1homwt55cvhfxjs2rlvkmgrb716a1q2pdxwupsfiprjs0bubrfs9tmiu9tlut8rqk',
                parameterValue: 'fzcgun9xowa0ucmkir4p2g0gg5cc82sd1zzhd883iihouguzce85urlab1lupo05tnjccenujzshjddzakocene8660yanvej73a8yoo2jqbjiu1a4ndakj2neyuxnhfphb5ipimecrlke9iaijvicqup7290mamgemf44jg8ggfzm3f7zkmwqcq53oql9kx95a87pzvqatdn3hywh5ooy13mh3242ougwftajj2zlewm7m9sc2sztpdska1hyvr51lvu3il4n9yaozksjku62889mbxztul2wc3puhf5bkpr1d28upicrtsddx31z03bi5290lzjibpzvx2qfcwhc962gxpn4iva9o0yvsh4ng7iyegj2w7cwvf6nrtfksh43w07drui0qdgohzhz340e65es1kr1i71x8gz4lc94rar8hh4sbqvx5pgqaob60ge4ltrbwu8ptspw7gi9klmw5jbbyv0brbz8yunisetnva6hsy5p9l5wgwmhtihker8y8dz62oo90nt832kcawjbctfkhgze4pe28c3hv6yt77yg21i8vnc4o32rh7saeveo9lao4f7nkpq2tyr3cow2n4vhu99jfi1g668fnbvckp2v6pfr2g731oqw9y70891702r0lmg5sgsd33y0bhi2h45ydyhmivtkxs9z1rfge7ke3leso65fsbfhvn8ds2h2ey5691qpoh8sw5o8nzs5o6rfzdz3epv548xhlvkha5ro00m5jjfi508kcmpgkvnctepb914e3kghyu28r7qqnludbdoql5601g81y2ktzbyvxotzkfhr8fvlzml3g7xyexfj4dc1asj1eljvsl5imy7z633d2ixfzc2qz41dwbbxgu2k6wb3dxv5krfejetz114qel5lp79qoi4dmgmxtlwgxi99dg5782b81lup8oax5cwlwkikpwn7e8jiklyyi61gdioba8hslybxl3iktzgvd20wmezqrphncey9v7t4o8l20180gixg1b1i8u',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleVersion is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleParameterGroup is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3',
                tenantId: '1787f2da-553b-478a-a053-4391096a0367',
                tenantCode: 'vteg0bijh8kw0q89kiejhktju27axvpno9n4393iqfht5i6qx2',
                systemId: '1abcd568-4333-415c-b2d2-66cab2e5f8b2',
                systemName: '95lpyfh9jfl6ub6ptr98',
                channelId: '084234c9-60f8-4fbb-8be1-73fbae827d7b',
                channelParty: '9pcf5bf2d06drf8gcadwk0aatno6pci0zkv0cs52pho1x1tduv54uw6olzs1d78vtvyg9ictar3z82svq94qqhs8xdkclx33zs15q97dgj92dv9al570fj5pj9ih56j8azo74f5ewbof8xmlg0v45dkk5cbo0kil',
                channelComponent: 'u0gsjqtxhxiz30nmbf1892zup8cy6ups6kuvm30evcb878fch7hm0pi7sa6o2lojdcro2rmu91y2i6fpqlgo71n04bfjgc563kuhypeap11disujb7kjekqehby0c6wprq6wtxuh22i5uudffbbdn0fjmzo2b479',
                channelName: '1q2yqjwf9wlunz5hhoisvbfemjccv179t1s8ns3ih5i9gpfwa70j79926ryvmwn842ujjt7x36d6ijpd9zb9bmrtpi1ya1h4kizeuwkxpkj0brgjjilztx3ggcv43yqwgtrf6nr9n1u24bgnmz5khyuthv0daoor',
                flowHash: 'a5szd27klqs9qlaaa1xz8ul4vbroafigezu61tcv',
                flowParty: 'gy7c8fxw1dl1scmh4xit9sjczb7rlcyozisvhueltrgjo9ui3vtkw5ybizajwglt9en3owq8h0wk7fo326x34wrq4ufydh0kubz6zbfr907zbok4mbicns4qki0ejfqkjb0v6xwlfzi4abdovvz6auj8sscye6sd',
                flowComponent: 'evlgog1ul9kgtpj0hyieugqp2dr4sbqgpd1v10dl93vychs82o4g2njm9fp64wcvlt951x5l08yksxbckwg8hga6d44oyb530pjsionk0vtg8754m0ivm4tx2kkudrah12b38gjsvzv68z3mj4bo8f7wlrhxvirr',
                flowInterfaceName: '7f5mm7p87zfpq1cbvhgpq59avn4p0ikm8l06xsf8y1d60f5r498vz77kmi1ogquk0qvclrak6pjc5oe26li1h3184ptgnmea0z1zdt6hkdo7jcoiv5xd67w18g6r0a3l836crlhjiap2p8lrx4xzd5f3b20k4qfl',
                flowInterfaceNamespace: 'fqg4wjhydgt98sk29c6rpu2m03qqey38v3sn19io8s4d5njujth2y4ymppzhqunkaa8nad154x6hhy86r7qivfc9umk3nda14grirqwpda9e6yblo37k9atcqzk7s19vbxcludzpmwz1iezji2dxs5hfg8k6kj1u',
                version: 'kg34y3687v0i6uw9zeuc',
                parameterGroup: 'teap9antcs2ud5h1h3w4gicen44f1ib62omwify6si3fbx22575cs3mo50hqnyihkh4biq7n6aarg67s7lmir0q3yvazqmeodkq4qv3gpwysfvq2ai5xfrckf1vn4bis55qejrcw0rb0e4vuj2rqw7wljhs20lgcvf3tuxjis6u0i2s5fdzw1mk5l1c82pm1xlhhvtce4j1wz4ld7rjctab8q8h20tcji32lnzjvu16fiwrjennimd5cspywh2fc',
                name: '2xpynd457yun0yo6339nanjfm235bot2ewjqmraxoc7guz4fn0ezubfs4vmw9gx8a3vq2yaywfloyfmbkv2yxmyr0ga41toa1mwbkx9fu3cbhsyb5dx3a2moa8f33z1e0knwhlxz3nk2a47mikv14das3jkgc8k6yedopz9g6zejru72pzx6iwx2lozwtbvw3dk2adqvmxtgw146drri2btdrhzm4ya2m1g0a6a5imwacc1gdb8iz78xevdeqx1s1rll0ah18wsv7hx8wwssit6vts3pzf4mqly2d53m8h3h9o35qhtauzh7bfhbdlej',
                parameterName: 'qf79e34mpgrgb2gqhqk3ni027ufzaf3cr1gmljo5bvmc89frkeqff7bk2nyiy407zpnhqzvgqnd5syi1d0lzwi6311icyfqumqrmj58w5j1z3ru13v0lkeuvt6qnh1s0t4uo4f444ga81kmm5oefoby3saaxbg309r7zk2reolrcgvmecxkfco6bb42987nksym2cb9fa6rx4kmmzqrctqkwcq912ciaufnenst8ry3m6jjpvz26fa0fhqhe52ge48j56tmita7ulslin81uddokdj43mr0vcmljh58bwss96x15fmzd04z5l6awwjra',
                parameterValue: 'eeaxjegp5tox18gh72uut9hq67prj0r6iqchzxvot9yqiu818onunjxvfj3u9dobma8w7pgf4dxq4prxman1ovcgmd1spzvupdlc57te7k57iyqxb03aakushgswqdgp2nbnkz4qtj95497ldknb7o3ykyeskay5pat1eo8idazyau173kac4d2qbdf0ygqno7hcnyluj5013sqwijlmy36kpf1vjr90ei6pnapav9cqgzl1eiho645jp8m4a9527piyy7atejznz5sw2cu1jb6ao0b6pcryty8gcfch2rd17ysoxop9fn9i5ohhx8wk69fnicptb5go2livq5bphdv7jpe96xm7cfucpjyk0ztv0qpklnolhay3fvkfz5x30faetai34jd6ln4tluxr0v7dtiecy50ip3qryklid1huds9u1jtjbw7m361ghrqfbxy2w82a2oshlrrz66d1vuzcgcm15umh3ipjve96kjku8arvwf5r687r1t0wf9lyian2r3quketoasnuumcikw7rx9n5b17hrvo0vvk6cpyy5sej6wclzp7kz295q1m961zphmri7ksnbhrqopb34szzwlak8zvjm7lt2kkrumuaxycszd5ozl27b991i9jnt7p5wj79g6p9tfrltz81imvn501jactnwifsh2ijvuzb3ghj7o5kzabz6wwycty5swbxahr5v9n2ajw0dewd5yrzgy7d4nlzu08hh2thj4nfop5g2cfjj3gtx7zpcvgxnxhei6sciuy7mnhg7dcvf7j1qdldlza8m2e8dpct1znj4stuturtx3w7dxags1tzd8xrrg5i1zny48h2rk15j4ft5q6iih0x9p35dbz33m2q3u0tp26ketoyc0wfgmr9r2j9sgh3v1atc4p5bhmkzvis1o1yv3xs20w0uf57w8mdnv2mo1jkuo3mbam3ms5i38hgth52kbqq568f5a4ocfrb7xj00yof9gfgnm6v07um9uzsmw7mt3j5bwfacoir',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterGroup is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleName is too large, has a maximum length of 320`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3',
                tenantId: '1787f2da-553b-478a-a053-4391096a0367',
                tenantCode: 'ol9la70v2f4ar6q4coskegjds3rs7h390ejj78z3tg1abi7wk8',
                systemId: '1abcd568-4333-415c-b2d2-66cab2e5f8b2',
                systemName: 'e48ndynubfe740lf0ygr',
                channelId: '084234c9-60f8-4fbb-8be1-73fbae827d7b',
                channelParty: 'z0s8z5sdhe61eqgbc4vq0fg7qpj1t3bw9m3n279cz3o9tx3ioq7sz4qi9hwfya2zat8o20gmxsihtgprct2k6pwovn53alfm976440ts2a12d6567fib189wgyy4gn5998kjd7ebx6yypzs59wm6fahve74gzkse',
                channelComponent: 'cnfb5mig0vv1xzqw2ipxkljjye8efxbr6b0srypkvs2olqrk542yhw0dohy6houx5gpjbii9kl3e06o8w0cyzi1ototpfe3aouqzmop9m68czwvs93dmbxnq5nnvnaxj3wzgtrja7ebz89dr1fj9d94ckdrmep63',
                channelName: 'xgllezhkgmv5menscuqbts42hxjf77ie98k6bjk2smmiwzxwehf1p8kabwjaa6sko3ur2w71h9j4kynpwsrwefn3n52udg2q2d5qkxa4m6erjls4sxli9sf7z1ypw6dlylzt6nqorl5sy4s9cefuz959k8p9zmbo',
                flowHash: '0qyycz1hvdztcwmnkvs3fg8qu9tkq21n54usyvh0',
                flowParty: '6f56a9ieus07m6vv4h2olll20ai0mritunrrxhuesz4y92x8vvm6qygdmqtub7v5n4ezvz8gz7oce0z4pb4mkewltrc2b0j6astnep9w0hrmbws7647o04gsr3msy41w7hackc094zwh3bw6su73m699jscjjyf9',
                flowComponent: 'iiupsevhchqhys5s21q9lmb5gdb1efastn8yg4hmcagmofh7zd8bcgmcw14wog45lzkdyvytywv90y9d9twjirbpsnwkdhyxw6ex6zzexh91zv69ztmgwh6vl91lv65n6gkd7ul8nblxnvwrb3be101qtf5y3rgy',
                flowInterfaceName: '50a6cup1roeqm8s3w02fudsnmpl0s0cvj4ohtyk3kop1eivwtetheg0xjnhj2f6vdk58wfeg38iumjd9a45k3dac5eskek6h4qwh84c64v62uq0hg2sgdgytjsyoqsu2q2sp9bdhweetq5p867mo8h0pyj95w92i',
                flowInterfaceNamespace: 'p5miz4jbss4k8lzmido87btb7boi0asbjkunsmp7tffu9406hkc6myyzvjdhmknl5ur73xqdaxyutefffp9xtuzauip6tm2h6tuza4gg4znr44b2aico8m6j3ca00k0ig98nt19w7xd6j6scmroj1dcuozhx2jv2',
                version: 'fdfxnv7n50g76qsqfxlt',
                parameterGroup: '5oox5ebv4ybz4ci3bh79x45w16a1v439y8em7782ec0mfpvu6tta4moqktcr9frgzq7fya31ka8gpdo3g89hnbuhr21sagoc5kgw9zonm450rbj4gymne5w93pvtknyt3j0z2ub7jj9ct5ckpijx6j051gwniaxu49s768ghxxjy8bo39bzujpx6zfni3yto2l4at5vewl41i0mf6dnndv84m0u1dlj4vd5tuhjnrvgy3x1ad4byu8dmvgujuz3',
                name: 'xxnk3zhuk7p6y3h9g3t5g8a4kgokgkyyllmgl5s3u9p5a2o1mhnwieqeqcfjxjusneeru2nzemowqfh1rclimxdi4fv85qfqgj7jhzbui3uq380b2slwevz638vqfhmoyycmu4hs8hbwxx95zi17fyb1qmxn5pg1a7e2iigp24nqq21795jiny8xc5thrjwvrqyhecew14t1td5k228ucqemxgpin6991lkkl4mrljr2lg6m00fcgdr7glqfida0p6wflytbs4qv1pe1ofxocp2scq856qb06dt9bixf69zwetw4ihv0krawpkiq8s45a',
                parameterName: 'n1mv90lwcgutbp3scxhz25qdkuqlc4ikg97hn90vxlbsytbwpc17p7sauex38q5fikme4kjvm6dzrj1fi1bthi72v1ebd16qx1c1hcfrjfswfgo9w7ob39je5utqj61zzmlxej0f84rwevuk4wrip85vms7otp6s30197k37n2xzipcuupyaqthhxa1ilmvbri5m0bxa72qxidjbmkcwy5gleqb917fp16ltch0n6xnz7qle0sjve9fe7raxrcc21euh80iph0yncba62v7lattjpky249c2esc95z8yb42he8zmctetu57a8ul2arrm',
                parameterValue: 'xojo0a5lyhktal5l2ylusmumzu76kjcscywbdocshczszvlx4xfykkgfolsv7dz63hdvg8a0grrromeaxh1hn734h4lca37nsm60fdi43v1t88mf027ikpto1q5ejt8crnxfnyzoaysjgxmjz7pu4t7bx8vpp5ui6dlvgsoxppvz5zoc5ze1pfpv7gcoxegxskhzfr333dzzwhagpd3fccb2cdo4t0fc32l8jl59dxmw4wdsvurm1z3dofuolsfakypa7f57e72xgx39s1cd3q41s8r4xgwyzutpeoynklnybs2nzflegm3vmke6zvajt5wisv89z9gldd9d133d1oyunn2zxalt1ioo3u70y07up53z421xuir3qjv31jqpwulnfcql3yqvcr41jsspfksgzun59m60eoh87h4neriyw0zmht22b9ertnkgjhe10tgy7ef65j0x22srae4sfgmye86uk9riw2hjkrv6v9h0zw1xr1jd8qaq5ps1v5s2ziqnp09siutn4kmghobd2vdtj6bypjrzr9bw3j0dhdvtn7kfee6pam0lgymhgpy0lbg3fkrw0xnfcrzb5lrdan5adkzug1xngozcy2h8t5carieo7ey4u4glte86lwk0jhiv95vk9ppfyawdf44n2haztq0g4tyoysu8m25icqilgn1gd7cq79s5ejg9limzironkjtqqgtqbrzcpt1idp7zkt4ki40n1l8u3w63gk6bldyi1gnu1f4o11tts8fsxx6bg2hw3mqye13avjjfrm9ebshxjl2i409eymqv2v5mh1nb7205ab58a4viom4xomc05ljjvc97df9k6oramfrdochjerijfniynf5ciiaxqqkal7ed4tfvi2jehgk4gjcfiti7vxwy2zdc92m0qjmvfmodcfu9mdvm1k3fyqi42owhsvwa605xs8zalmz52qpj31j0egdgjzphdebqrwuks5mwfm10cpjnmxyjaoxdqtam6rah3l4oegrts29m',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleName is too large, has a maximum length of 320');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleParameterName is too large, has a maximum length of 320`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3',
                tenantId: '1787f2da-553b-478a-a053-4391096a0367',
                tenantCode: 'uqkfppmvo9adfkz6g41dgaz7tijnq504quyhd3zq9mndvl78vi',
                systemId: '1abcd568-4333-415c-b2d2-66cab2e5f8b2',
                systemName: 'k9al3j1spqod87fjg07h',
                channelId: '084234c9-60f8-4fbb-8be1-73fbae827d7b',
                channelParty: 'ysu8t34793fx2jrpqwqr0b9f9004wsjq8kebiqzpcn1rpvlolhwfcmnvdghkl9lnajsphxh7koyips6htnjb901y6zif84zvgaq01ojuqk6zhr9s0lxwd840qdhihduyarcy1me60arqlli7qsb67ogm2jpa9o7m',
                channelComponent: '5680n5m0k6th80tgaz3ilipfwjh2kwqn1i9tc020r203wp0ok4kbtl9otfh0gdiinta7u9d99y1ipf1eo6n7tvknlo6etyol5zdvdeztq388mxnjy3f05wdxmxg337poqyqkeh8mgvikcesuo06ojwm4s5hfl3g9',
                channelName: '6wwnjj5kaz7dp06744y8cmhcfyvcnr401l9i45ts7tqvacn5yjq5qwugfuvdd8gdsny3dgzce5n902h4538vy2rxo2xcn38l4u3xt0nk5kpnd7u5dhxxucdwze1ldk952t5e9dsnt3k1d04me3l4hdo5w9wp6dru',
                flowHash: 'czq5my43mh55ye5ewj330fl4chrvtnv2mrh5h1cn',
                flowParty: 'psxsicyifsory6t8ef41dvvxmcjucvq1sarrg97deivirdqawnxfz1cdzhkzqx68qkehukj37m0hakdw2kqe7y446145r8uojfzaa53lxo9t65xzzrop2bc8lqawekie8ivsm5sk5t4b8elrc8uxk1k2038zjgd5',
                flowComponent: 'qabi4wz6oasxbftqs04pwmfmokcjb1f0z9jbknaeadgf2hywlj4o9ca8q79y0nmhfj633noez7osqm416nkmya299xx3x55xice8cbenisxzlh20evpomau6wvz2tgbf1njvzd3twx2ve4re7hh54vgsxlbszwjx',
                flowInterfaceName: '3eznvc31ecn4l52s4y083ms1p0y26or6on1bs4qoi4rv2s35l38eoi5xa00yuutmlr8wqdto04rqcio7h577ofdmzu4gy6a6tx26rcfigbopo57i813p1ztb5bqg52s15jzii16161z02aarsu00atyggqjzyet7',
                flowInterfaceNamespace: 'c6yvo1letqm150xsh8yvtck432tysuppqy3kvuaodfdvmv01ztf331wgqowd05tvli8386361jni0ovs8ku5s9o2cuegdfpexts9hkmy9fegwfhk28xvbqd4crtgpjmi4umexvn8e5mmwtlj0r2btcaw1ypsefgf',
                version: 'nryx5bz3t00bgepjj5ts',
                parameterGroup: 'ps83f9yhvznn12wdb8lrj8hp4ivuivtvcs5xehysn8u2ra9qyyze9h7khyhatciyppxzy8xlkyjye1il5j0a65skze6oxoa03zikbjpy02n75uluoyf7nseeqz86rlpv1rmv2mspmub71i56rxo84fup4gbdzx79mxjxc3kqzgn0t20tbz9w3elynjugmnlfq4v5aul02sjyoccng7bjns9111lh4itdnxnyhi9svm26lpsqvm9g0rak6akfzm6',
                name: 'hepa75po6iqvh2m6tbm11don0uvww4lmp91swta1mca7wuhtcthukk9u8d87d4ezrquf5674cppn0waaxiuicahwbamf70weockkvr5eujw55fpnopguhkd96acngt4axjsreuhsrc2igcdpbx0v9ujpa76phep3x5420j2oebu6bimdec401d93683l1p0xhd0ujfrj8lqip8s6p5yrsh7kzvxql1w0lyrr3htw4uarpqq7g0qcp8hcsqf4dpo9hojxuobqvt5fgvvsdi3mi619ns7un9chjouvsbayyer347imxr3m2au7823e92s9',
                parameterName: '7tvhwgcekqx3q1v0m4kdbjh4yzics2ni88r1douxc19uy3rk88tkqtuyk7l30fa9ronk2f7235i212y166ebrhuwy2wulxhcld7vkkkztz5ive8cq5af92fi5ubywo2qvgdqnx281nymlx558gjfwhzmshtiuyepmhmbj1jpne2mse0uflzb67lm2fpo9mdgspt8t86kcmfu8t7ulehui2mlszebx5oufsvprvom8ldfus7ndvrh149dqacemy67q2iqqywzneeqyyvlypnll4322e55znj920egpeq7803anad7ykxv7kysqbieglbnv',
                parameterValue: 'gyz7usbrbjbjsvh7sk208b06lxe1blqht93p4e788pmgeytro56v7q3ctxobue7plrfvv80571mba94t9b6k5dp9f31omtdhbs9dgm8g93sbghswcosbq0pn6net8wjrxyjv0v80srmgx3ub6rbj5wjjt2g4euyufa6zosc4iyw0t083wp21eipar7o50fcr96b7wi9nb7gj4e8l1hmxngzznhxua2c13qi4xldt7y1yo9j9q90h1cxfte0o08z23kq9n1yhe8cjwmg8iu7svwy1vz9epvjdxxtr1xxp0mto650j4yupm3l8gydgiwosdm6o8sn5g3n58akoeuvhhcg0ewllq64wv3agwyfo7puhrfs2e2hetxj2s56lu3rgok7mgyu9txb9mz5f5vn0bkjxwnst2loomzln5x2atifhkjt1zm5kcam12tb1ooxg3ajvbrqo2nmknrrv01xuolxnxw5auu6te9a1dmq0jctdvb9fmx8fke1um7mo88dvbz08br5jrl6pz2h3q1j72lik6zbrffznpoe5sq0mjser1uomja5gazs158xmsrtxaks1jxwm9v8bwar1rhrsh5q8r3awj9akh244lsm4tc1eigxzz8utjr0b2gr9qgi0eqtq75dwuzlfsbo59yqsmm6vywytjrod4ifr36jtrexm5tbhauihxz6ir3izn1zubonw58t8i59h9d4x81j1hwnt4irsuxnad7aaut18x5835cvd0ea0xuwm7h29rr90t9x7v459xqybwvabuwb3tjg0g9vqudvz62xoqmtnfc1xpckhvxp03gi2opgmkmg3lnl62k9yyzg11rlsqolczqwb1arg6aow57n7cd61viidwjbxo3q8qll2gz7m47qmc9kv77ul3kg7sdbki91grivxq38h80nkv5wuy5l8jttnrminhfow84fgzhd5y9gq1o44my67998vslblgaj6vwhg3jrow6wxth84bl3k7arx9rfnt9vqn32uc1k06i2j',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterName is too large, has a maximum length of 320');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleParameterValue is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3',
                tenantId: '1787f2da-553b-478a-a053-4391096a0367',
                tenantCode: 'yr4sbznkeppiosijk6370ftpyzndue7yzb4juogp6awr59hay0',
                systemId: '1abcd568-4333-415c-b2d2-66cab2e5f8b2',
                systemName: '5u30msceakur6psakvlc',
                channelId: '084234c9-60f8-4fbb-8be1-73fbae827d7b',
                channelParty: 'f0tskka7lh1x3aor9r0cclnxgefawupr5f83zg4pfcps9zlcotgpyqwx1vy4qs6l92i2qi6yd0sz1rk050s6izqbeeldfvds7rcrhxssbfdczdcicg8ccblpb3l67v4yhd1s2g2difafiwkhcloxkprrho38fwdb',
                channelComponent: 'wo1t34ekvf99xn6i4rnirfej208oohmxexxe9733n8yxfycn6lc0sjnrocwlui819vo9vyy7wggr9dj9duio0fc0o3umdem2xz1pk6m129r4trqqbflpk563d6xby2kiq6gll5ac7eku1ux7zf9cyq5wrr5hf8lj',
                channelName: 'wn1kyjcaqe9605dj4p5yltp0w33jfjp64nu5jfmsvs7as4t2xxbekd0911rzliucasia8hvxvflwpb87tfo9uqbyrvt3adawix7pfgvse8iqye35he8tthqnden8oaopl0px7h5p0c99nx0np1pvhwq931760ro4',
                flowHash: 'ie1k10tsebbhmbpgjnpdcuylot30jmbzbe1ccfce',
                flowParty: 'cb1y9g62wgwvuf1v7x0bp5pl1k2e8rr3xpeoo9k77o8iahqj0gz3d1d1av0x3huswp1xjmay08y2ge1as3omoelpnh530fhnsngt4q9p0mr5rsprnaacgmwcvkumm4nux5ywen9rjpdbemvr9y2z90u4unb11nun',
                flowComponent: '9z271ayo6x774jij2y57i4hgovoye1q5tcwjhobwrpl5aj0v07vp9yaqm59o6rcwfecd6uuti77kd33ajbxf9ujnupwr7id8m7zz3oqihfzarriphuafe58jrkp3iifih83koripuhwumpkk0815agc1t8nw917v',
                flowInterfaceName: 'kqvthyy50xg48xyg5gb4wmf8r4cxvh8b6umsfyl69gpxmz4ccf7mydftvky1xq1fg1i5nmh4lid2decw56ft38rent51c2t7k4y3jbvx4faxwc9jmravalj6ibbrigy42prwwt7mozl8zs0o70c2ylrnwty3mo21',
                flowInterfaceNamespace: 'fo8dj078fr1ni76zxctz3vy3guy6gq3vyfpsiu6gxtf98wme5utaa1b6jkeehajswa4055lmepg2cp0bz8z68tklk7dd4qfc36m4kptc0eho3xnbnkk4zawe7qu49z6sj1g78h8qhwi1g41bkyeochhh45p678y4',
                version: '2pxvwekoolmrskolwm4a',
                parameterGroup: 'vvnfbryyn8hsvjdb9nqb5uefgm65bdtsq116fz7v8abfa6e6023rlzowtmyadi6nqnp06451yi63lkbrqef3ujo4nv3qi6bmxxf6ubkbsu7oztc2tugdl6slgxmt6btnm18bp4hfhuam76e1bnxahnifvrci1o2rp7a9irdwvotxf1en5k9l3kjwck5etnrnk39ti2e727b6xdj3ynp3de4ggsely27touie3ojc43do9h3nr97cf1vd1h31vex',
                name: '0o9ni2hql1co2avx7o7pn977n8enf4k1m9xfr7xq6k1r5pn7szb2dqgo89wdzehg3k0jmle9tfnsgvux08xhjzxziup7nrdvio1tzm8z2pigpujo0kdy335rh1ddxb9xylbazjr1yfd7uf7l39do91ciui9t85mc9u3zbu1g4tjn8x8x2gkl7nhukqmmmmxhnrv4033yu3cuzxky7h7d6wdoo5du80wkpjahi50uhhe8h3312iafnoh2xnnddmnp1nvj55lpz7w45nrzio2m9du8d3nlesq19x8kghbtmjn8xi9uqqdh4rslsg50mxk1',
                parameterName: 'fxxl2pp0dinfcro11edh5gb0kifs50ydrngtb1d0hdr4coiq2sdj2prxehuaps2sif295pp1xmlupd6jxu4e23xs3cqrgpk2nfgva84737d8zoe5pj3zt0f1jjayhpqn3gzbayuggokqlu0q8nx0ndsa2vdbexuxpw6cnv7wjk2r71fmh8wqtrlq3wl87y46dr6elhlds2euxd1eiq3dfio7atykus6a3tfqr9nvvqqg1cdum58bzz8zkta90o1q3d9x3mwkk4qpg1hny2wm96ne2yz66cuhcq1mmngu95rfd2iaj773hi1owo9sqyir',
                parameterValue: '9qao2vuy14ah1uyndcehowd7lvyj1gp6lf2i5neicix8qbxybs85rc6fujesptha4a9s2cv0uvtys155p7v8dnyoqqlmp35m6s6svil040a1mp0o9lmhh8spnxtq6p3vj6le6d5yaeh8eflw14xudem4hs7qbgwyd8txai1pryi2i1oujg2co0mek9uzusv8uuu493wr29w4xlryr58kxidev1iikcrqa1yuj8b2sdbt0tewqgxy9raa2237bxr45luo43cwzan163km96htwyw40fy4t8sm65ei0nopsvip91z3qhljznz02x9iq5yx37usdi7xfsqg0lqsuqcj4fmyucyg493uxq0v0qfvzty5xryfkvesxz6wpq3r7klinm8sixpa3l13uimm63qruq0q2davlwgulmk8lz7mpzbumibrwyk4f71hk45qm9k62udfj7wrj8a8ylxshndroqr8fk7pjcazpjeqsuv6gq1bvk4omcwjhyzely1i19rt0ad2d5d7japi6ky237bh151lfa2uchpxpyt5eylllatp2lc46wcjadze1hs1wj8qovdoiwfv5stjtslmoczpyfckpcf5fnscuek5t8d82b1hr11cli61yupggxpxzldh3khivkvvtqnlwncn90xn8k21jal75zvtpl5zebd1udfyqyjrt7tuk6d6p6so4b9lafwlaunhkmw5gpxhv5ir8ohaejcbugs8oqjzca5zlf9fo4kd7mwq5jo4dhc60bukhyj1hr2zes7vguuybwf3tvpgufjwotdkt8g31j7dafedf71nb4rbzdzu5b0jumwwgfoonv6vekanuh5ye30606twbz4ap3lpe23jbb1xzkqdvuluc0jp0vk63zncce7vwhtdczz744e6i02j931nhflco8d0ypkl6dv5emql47rqfawk70w6uojj1q7eg06ruqr26a1agp85bclcfydeoyld6r9gcc4uw97tqtgkkbnmhlf2pu3hodaz5e280bttl',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterValue is too large, has a maximum length of 1024');
            });
    });
    

    

    
    
    

    

    

    

    test(`/REST:POST bplus-it-sappi/module`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3',
                tenantId: '1787f2da-553b-478a-a053-4391096a0367',
                tenantCode: '5hmhw390pdpb2mxoqx0cmdqu9nzyhxon4z83cvkkzfypdheo4w',
                systemId: '1abcd568-4333-415c-b2d2-66cab2e5f8b2',
                systemName: 'l9h56jxr7k0nu2q91w7x',
                channelId: '084234c9-60f8-4fbb-8be1-73fbae827d7b',
                channelParty: '45af71smfkf3boxx1pmsveal7ly1lboy3aeax3x9rzbc8xt6gg66g802smw31ssooq2endm9wmq5s7xwmch4utfzraz9vknqwpuyvxftz5139kc8rxxt46c6taqpvz0x31ynj77rb4l56vk051r5rj2ac24k2d8z',
                channelComponent: 'p9l3tt7jr12csm3v5drce48bxjh9wofmlvhf6icrniwpr0tuec4gaq7mai7muvbqswek1hwj9fssx3qp3k9dbatokmz4rkluq26u4hr3klpxtsl3u77k0ai11olwogdw2m31dl4ef60mdoyib4bkp1mkjwbtm0cb',
                channelName: '48okn25c3wk2qk4tkqp71ag4kkya9pqi4380y5dwfeqst2gen5znpassyuju33pe4hum2xjup36oyzdjmg8a19mv40ql89qvn65pp7qloky3rfnhweo8cb75ssp1yzhqz5mu44izn7lwwufp8b9pbkegsmncbnr0',
                flowHash: 'rshen3yk175gl4ts8pkjeh2jbga1ahr8c3e109mk',
                flowParty: '8zac1ezv71r06gk9qzwula916yffivajq480ssbbgo1g0lfq9e48jt98lsxud7hodbc4c0f34i66cn4ll5l3tir6s0e0dzp0iczho61qdkwtdzhiasvfrx8r1s7tg2o9rm02wqoqr9mwibkk1ahi8rdxs6fc6ae7',
                flowComponent: 'uto89n491jihx55jbc328kldohqb2ltiu7hk0uqkz1l3ntnl4j3gaazul01uo1okdyhg8bkt4ixxe5uzotya4evne7eumd9fxl0vkw0bvjeykrbdzu0x1zjx81k060hg2ohl21iw31977pbrejvhu6a6q8b9xxn4',
                flowInterfaceName: 'o30nbijqul2u15ukp4i42icnctpbq939dbnr36kin99zg4unwdxdxikk0m0h68dt0zplmt2r9bk15zfmrdkf4aterfn8iwteqcy23wm044swxhpp1l6btz8vup4rujtjh01nymzx2v84fq4xt2kufd3l6pgufou2',
                flowInterfaceNamespace: '98qr1ki0r0s4uz3v0bodbmp27gas9suu3bdwzxdtbhjy125cuav6muc10k201kz4qrgmk5chyu6vng6omansag1lwn1rshuk5so7m1fvh7k3fyc4y8dz34gkky0ifjhsfkdyw18ynt2sylrjqo799ri2cfour0ps',
                version: 'swo0y0ouj44806k4xwx0',
                parameterGroup: 'd9s0vo7jibiuhxgsm0c5wgx53pjykxmtrdoelktxkh8b8j97hj1vq9p8h0mku304ygk6ldi4m3w1t7y3xd8bpwgfxz1iu40gyxlf4s75niqc6e62w2dtjeb5nh9fl746txxflcc8lob87xfj9v2mtmll5fjy3jmj2kegkv7m57o9bpx2kqco51sv9v8cgvc9yi33n1ee0mdrb5dlr35tc6q4myiuthvyhodr19znt12u28fc39w0o7p3b99y15c',
                name: 'ki6jqsugupailb8e9b94mlpn1ecxytj45i25nzy54fh7nvfkh7tlkja2y3sfahhg0j7mx8ja7j3slnclglg2il2tl3xoyl8mj58sip4edl8pxgmdyuugtkwzinc16ric6kqlzk8m0zxzmqw4ppoe1d0egv15ptoprq73i2udund9t8crewf5db6znrm1qtvqkcwgcr8hiqtrb47s9bm3pvw3gwqnlo19wr9m0fy0a3inw6jd9opicscwvnext4pvndsbitppxj1v8ktttg5504dzh7oyuuujt2gslsa6b74wfxk3v57n3xacpl5qk73m',
                parameterName: '6egrgwytnfzefvaq6bw1swng5zdauixi5h0np7g38m5bzpokme1ie0dcz0w2nndimh2a0izujpzx2k78snuvd6yzcpgcd3hxz9gn6hswbv2g1xmk63kqfbr4kjg7xdmz6ulofcbhfl581fw5keg4uzfj3ylekluxf4bjehyktiq52k6qghecgdiqgdbtpttkkfwqcrh7yyl6u79otmggx9ruw7f03ssisqn5v0szpwdjno9ayr9abx8k9fjsq8xnz4sofzzrjrix5y1zkg1szcczc6o51r8hx1loyqyth7gjkshu077u95fgso2f1fc3',
                parameterValue: 'vyvqvuzpdh4nad9pxrhfyg9qufyx8pyujt2c6lr0taxyowo5oausl0f1feix1z0zy75eq9ho59i9r0p4cxzk1f106emdiyjphawarpiuqzzxgz32bva6dk3khlbebwt1l9ja12d31onn1a7anwi3gjkds71tub1m0hrs6qg180txswb3y0pidyea2dng1vwa4e3191rryd88tpw65bc22cnco62jly80ayn484q8my4dnnh1as1op4udeu2mjekb71y2f8myg25vsb43grlzci8ypdrj4hh6aebvu4ug0z4cu76ooqqgeor0fho5a21i7o6lwhnsmrwtpojz47lvn6ccznrq425m4ab2265tnlpp2ii1qrvvkh6lc1sj9at7lobcz1ffpjrezzhgmqwk8nzl6kqplfrsruvmzpxdz53hcqe9qqp78lc7hm6g8o1xoiit1kqq5vzl2uj2xaz6kc09q6mpnn816qje40tw1xi9rujgfya2nsqvgiqtghnny3g8g4le1bjnr1b4zlik65qzz769cuyetj28tpb3am3ftzo3okbvmmg7wd0a1z26mnbpy8mw52ppw2ej8oqw0t1fcb9uc5pauopufm31j72um1hnwq8m3eaz76mawnal13h1u3h4f1yhseyss5am0g3wb1cac980ry3thfw361j7bqfimey7quf5q9bfszpt8nkii6mx6x17f99z6j5ldk65ohju4fq4f3p3k7zutguu5awzhl7q41ci6sihubvaozkzknsusy6j7jdjvbhzoasd5kop7ix39bcmf011bzucqyhpig4h9nv1tlj91banqn59416lnhizgdnr3mndhwhgptqrwcnq3lxh7ebpzuba6xlim0svk650cw7c586v90cgfdbdq4nummfjohxpwcfnuzfplui93q9d62c38ela3v48eptp2qx4mihxfd5l2xvdzg296iavfvamufvz2zsr1asw9nxsc7bv9s2elxgdiu7be9l8ekbhpiduu99t',
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/modules/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/modules/paginate')
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

    test(`/REST:GET bplus-it-sappi/module - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '8a5d0dd9-54b7-43d2-afdd-563fae764cd9'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/module`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3'));
    });

    test(`/REST:GET bplus-it-sappi/module/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module/e5fa316b-406e-4837-b0d8-5d587e20d374')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/module/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module/f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3'));
    });

    test(`/REST:GET bplus-it-sappi/modules`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/modules')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/module - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                
                id: 'c94f7f78-62ad-4a11-b014-f6ee33293932',
                tenantId: 'f7b303ff-26c6-44c4-9576-e6e02dab1835',
                tenantCode: 'qdh75550c1n2puckwpbktvch9wkbkcn7bu0hvee2umk5m9ex1s',
                systemId: 'f150fed5-41de-4a3a-af09-7f7ebc2b2eb7',
                systemName: 'kdfzmcpd8enh5oc5joe7',
                channelId: '074de20b-e780-4f55-9e58-4a03bd9f8435',
                channelParty: 'hbqx4javab3bh4twjbitporkc7s1v5jozrhyou4a5q1wpjbx88nqk8yyrwjzyg6kfsu31rb3imb30aonc8a290jtunx9h8fkwzgmsacucmv0ctx85pxmj8bsmggc8xf4p8ap8n7qk6yrj2hqtc4zras8f1z4oazx',
                channelComponent: '00x4sgby7nzrcbifsf3gwg037dyxc2z5emr466kiso0doqy1gjw5hw3pxokak5zgzsmnfkncwzz76z4uys1rdsesyucjsucdsujks4n0pit9ymdvrxn2xbr21dyk7ugnda7w0iyeu8uh6w4ksy3g7b3g8e0vqwdv',
                channelName: '6hqmquh1mvpi7bprvu1v1p9ouccreguc3lqwur8t22cf4tsv0hfwca3ond727emlycf9nb867uoce9skp5gn394er63jicvxqwbv1p1bawwv3ca2rlxyzrl2tw4l4rxkcgm3bj5eszab1j0l8m5lz5f6kfxaqdao',
                flowHash: 'fwofou30tihuy1vcgvuhwzxvmgkgs56ba0oyyf21',
                flowParty: 'wyw4ekshhf0ekjpvpbflvq9sixbdp9j4fsttuscntiz6rnd5ij39dlqkl1yr9cujly7urwdv1owo7q593v3ipcrr5evos4np83t65bdpcsuf17r82eqcdwu5kogrswmgl3anl2vj5quhxhnvkxsaqdfxg791lq5a',
                flowComponent: 'gjinnpakutkqc5t1vmmq4ikubuxk51klkcsklyp2q2j5lvhusqq5ggyvq6at858qotnj5fpzk32tkzqm72nyp8lsezxwg4txf0sba22enlj66y2b9o03r23a9ehs7vwfsbklt9ia1wnlw3chzq3ezmnr4v56krrx',
                flowInterfaceName: 'e2ky564szdvkpnq1i4z0vcyiabf07tati9v9qtrx8ktmjpfr31sentnx50lw61k08j4dz4nyqtvkx9ksskw4d1ur3lloaak237v8fw7opfqu48h8qh8gvsgy1q1qwbqzd389y3e1z7o05uk4pacm1fawmi9bf43e',
                flowInterfaceNamespace: '6ilwpqcuo9glcufri8xb1xjtexxa4ijdqytu9ftvfo0x1o7mrtd31yn6hbcmxs9o935gh957k81w9a63fnvj92k6lrp3iin8hu3hlxs5ilnyrp9nza81wgaxbg94oy5vpp1sen28r50zr1wnv0rkcxjljbc66vws',
                version: 'pie55ury2467z828myoy',
                parameterGroup: 'cakd8p8xed1pca6b3gg0nd7lcck3vdbrcg0so5zrnr9dvp48rfs9jm1x5omzk7bi21uek3v3bi7akiil1pfwqjkto2phxmfklq50ii7cmpvhwzg6d68e3vk5gw3kd376hwoqm0hs18nj9w2p1fvjv4ct15mwdugwer5jbt2pdd7mg0igvrnbmbqtv54zt9gwlhb2akrsd40y21mhmvqpcaxmud8eveme6cj2f85vczv08cpphx6qenqfivywdp2',
                name: 'vc96j6vmz4knl4elavilomyeejsz13f5rqq1ga8270vvo5v71t7zpjzeqhu0xbaxmiszstcyxflqgd9z4e8jq7pcqgcfdj2cmb8ou65kty7qz2kghirg4r301rgd865j93yg6rwlofir7x2vii5kbj671vbpyp719nl937spt8p6jvhzkndkalcq7amvan2h5rvjjs6oc7y349c7ew0wj82hd1bx5kvqs6dgo94r6iczuxmdqm82o4spggr57hyaqmwupyslskoxip1lzo06g49exryjz2c77evr48eipgtvk56vj79ba6qlqvusq80n',
                parameterName: 'h0jnb0ad6hghsp1dad72w18u81fj1tn57i96xdhdwfigkxjj7ngt3bbs51ejtf11z6jb6mz7xlpm4x22lu0mesgobybblksj2oai45br7cplvdm3wb66y4mxkgm6mnx9m1mjrfitqiemxa4xsr7xxzlz47trz3ovn8d7in97u4hey9g3jwgn2ciio3c19xhqilr5iy01ap3da3mvzhbq47jt27ci20bijdzs1q5cs62327ok33hvqk8jl60lq9vgq4h5qt1lc2utb2h9v5htw9x0luq40atihj8g104pdvwsht6ty0824iqli4sm87i2',
                parameterValue: 'n73vq0h3xyjwks8kg7disftsol3kytdkar4hk8a721zwek777ug6i4m71nr1sdtaaudjmzngxxvzce5hycr3rctsby465uyt52y6jg167qvlgzkkniktuo7ntxho8pqiboga83djd6vneoc86arq6mh59g2zxp1xzctq760u9i46olljg8vtil2cbrpnw5x6kz7dwmetuaj9rq9i4stdzbwnw3cp8z6kk2erv8cywsq8jla8mrzv88ujx8rzac9hrmirp4rg355vlvvpossya6gos3yujlj2yyudf124vw8nte2b9ldez5bp2w5x93i679x84fhze39spx47ukbprbklrwt89uiiqhqcg76gck7on9x5o11hh9hlmn05ctxohtih9ber8bmyxt2vrwiot5km61e8zeqnosp96rab9qwjssdf7znmozrky5c4tmkerzcs0saezamw9c1ksrpnp196a86fsvsuwwwxb2dfaqm88f99whepu6o8yvr42sac4q6lqdhhc5xdi69ffeopakp3d8jczhbq4fbt7ig2lyag48vdgqw1zevxtdiiufudqkbrnxiqp1sqdns02xcj9jwkvm6t0wi1mpxbkobp72zwxla9fgvzhjki1gsxwdo6mlxsa182bombrte9ydbafehffk6g3xz0dwbwsyxd0o62u9hrc2u8s7l2t1sl309enykfidf6a328x9sowibpyihyarq9wp2set1ius4bs7r3wsu2ic0d2uqylx1ij0zbqgcciu8n1d3aazvmmf1xi9hao8da5lwb6uoaqynttp6gcacjgn7qrmvrgnli96towads95z8pnplf686zzssf8z4mlq1jif4wci4hv8ap9zf7gd944jv6xkepb2wn5jys93sibtltf7z1kwze5n2pdghzjsucfl9kjz9nnv9ou4izkvgzahkshpol2v1qt3rdvuqsf0p2y505obyortv7whryb2wbawd89ly8c9fwivsgoadrowxc98v7ze5ixr0',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/module`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                
                id: 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3',
                tenantId: '1787f2da-553b-478a-a053-4391096a0367',
                tenantCode: 'a066zotsi9mw4865i03dpz2p4ze83nf9vi2xn9v81irxtlq8vq',
                systemId: '1abcd568-4333-415c-b2d2-66cab2e5f8b2',
                systemName: '5ihcls0of6j79bdvrls7',
                channelId: '084234c9-60f8-4fbb-8be1-73fbae827d7b',
                channelParty: '4e4170yz77pbl8qauwmmq8b8vxtay584suypfd5hb6cc85n6iboizhu8y0ebq3tkc4fgkd3ugzfihdxsi3afsi5ga92ao9u3e6o1m14bv8rxwzffrspbsoqrrjxicxvqvd3o3xayq1z7nz3wgofo6zkly9x0eypc',
                channelComponent: 'g70ugfgrn0tklbwwe72uwrzs8cqf5f79pbzzm5frsrpg45dtsot9mc4usconqk05eb6965z575e9rydgn9bisj2hoy9gu14aakkncf1vga6hr3ir33tr3usel1fzkjwaw530x7bir99mfotff8a7an2ffq0hron4',
                channelName: 'otczvrd20abkr18uvpwzfkentt7fw9s9fsqzvbekk24n7z32cdxkhmn7t5i09g5x206oohb6fcp6pdc5suh7gc74lu47y5fp0glsz2lfvpd40junku5g9ns02k0kvz0qltr89tpwmonp4i50wisz979ybbz96aw7',
                flowHash: 'e41a0z2gfdjmz4q8pvezdi9s1gfooi4icem0rmx4',
                flowParty: '3p76k59ez17z1lj4kimrexesdpv7doyd6fuqblff53dxm8y1eku4obqcy5uskeszcz9wxx07kl7frw90l4ru5du06333klytew3nuvkj8ijeu7ytvup7vh80of6kciee3dhsd6u2y56g1dzh6kf7ivv8b3ur4os1',
                flowComponent: '1t8tewqleuf7zyn03f3bnvukcdlytw60y4bzhnou1t9vtpb4eojvx18s7vc9db7yl7fx08uzk0abevym476jqc18ruujn6uaquaci3i46whlvj1rdcmpqa5t74dhs9bf38krjmz5cqnjbqr0ruui9rmjoqtqfhnx',
                flowInterfaceName: 'xwwjeu373ywd0psleasjvrqwrmlv87umio8ecw477nywf2zp5ug7msnh1n1e1v53035mbng6a2pq931wsrph1z29wo54eqd95sz3hrmevu9wmjzccunnpi4hgp1spjqxdym8ajav9qtciby0ogvgut9w6vj7ng2j',
                flowInterfaceNamespace: 'lwaslx4w8s5sc60xs0v1j9e4b0bahu3a9bzusahqqcdz3ssyzsy8o835ia2pact5cdacoknyv1mkig0u3djxo0gh3yg6pr16uqx17xpxmgwxskdk541p5klwvmfdv940letx91jg0u9h209sk15ggzjmwvh1th4z',
                version: '01g4wbwf0ikvj3d0iz2w',
                parameterGroup: '5x8blxq1r7rxkisvl6wv9j42h2rr41hh4b5ec51gvk9sjqln7gb3px3dwfyl7g4yxhpui60tja33rswb25tqylsippx078zm9nw4jb5yah9l14uuwu276j1mnhymu4cirglus1def1lt488xxmblfx4yqddws711wnpkb952jl93hsuu20x34le4wn13u9ycbcfqasn7s6bah900886veeh4rxhbp7kzol6bkqpfjpmtg7qgbf6d4m2k7hrh3mf',
                name: '2b1j8cs5xrszcahpu5wfeiogdzv93pjifx90o9s1rmgzngz4l40xpzeip4baey4l58gzytylcfoj3ihlt6c85a5ox555i8l87gc5ezjtwocda4wg2gzjx9rdbwut13vng8ddgyfn8r32a4jl18ej5rai8xrgrqds16khn0697eyq1cz0n7xszhrl9gfbgsq0llx8e6b7h5784zo9psezufmspb5ig478ghn2ydt0ayu9ntzl70vwin3risebrn585chjyqn08d5s0dkwk8zrcysq38vko4upbiu52veybqymzlxrnkadq9wwb9f1lcks',
                parameterName: 'vh1sd00p8lffw00g8lljty3krdakmvh373cvllhlee6bneouobealwm3sw6nwgiwddh1e3j43xmtbpjbx0j58x73f15py6f68j0om0ambvz62ppqdse769uvo1rid6qs0mpv6rl516czezc7znsnr75ikmtdf6r5lkpxs1oa77poenbdefrcuhqd3sgnjlus6vscw698guojo28lsqii514n45osngvp4dozd0ix2fc7bq18z1cat0tzr7xms3ntckus8ablctd6p3htmb3i2mwjx6tp65d7l2c2qijh65p6s3y74wbk53m7sx56emcu',
                parameterValue: '2enqiwqx0vgn4yant994enp39gxr8no1mi054p4jyjkpz2ej3h6836qa2z67jsun3h171mtdzq2a4bbtjdv9610ct6w3g5tlijvotxajmm3nvnvbn1bbhjpklic95guzu8s7sfsg1jyq4erb63dgcbcjdqysbue5gpk4fq4i2bicbhg95vtv70lroe58j1yomrm3rnqflczh7du3309t0wcgqzxp5fcx1lvz7n0sv6stcpo7vc21m8luxkqsk46u2f75mvbsew3n0y12vq7ztocmqrv4xuojr1it21uppvmfuye2lgrq19935d6e4ecb7hxs6apt203teaaa9fesafhgv35qesozk5rbbbuhnvuk9gq32erys4eezynxn0vfxh9rx9x0cmrjluvhgmxynnfl3lhzcs4cwinl2azz9xpr2to1u22jc2y01j3gt9s5260dcvghlytzotgtk63zzkjrov6137o5aed3mzbvdbtnzd2koe19v6agwr6tnqlncybjuad121gwahcia4d8zg53y2j2txdp6hywehdgavgt1p174khwisph145mdbnylz1k3zynli9tpk2wzjt3t6qgleag31hon3d1odonxkjdyr53ik5f0l93gdsymmz0uamoy0gj3qtj4glcjyfh29glysiqu847itjqwf816xqykdg7t1f67afed4svfznaeob31ilg8ytpmx2u1ngxr11vu2ltlz6h4vnvms9ov40c34empzd1v9uvvs04sz4y43t2en20x4bucezkijb2feqsod7we8znu90y1bzr1mpq8iv1ef961wdmh753nwz96gv6ixrdsv8qenzpdpmv1xhm35f8gd6wgbgh6a01f5u4efo87nbpb03hkzpoa5m5xdhp7oboiaw07mm5wj1e1ds3b9q8nnjdfkgwl1binbexwytz6psb4jc8yu4rganq0xm39qgx619e7vbs88ak37sxjisgjlv1wxa4hh88l0535hh9m9892ccw391lp086',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3'));
    });

    test(`/REST:DELETE bplus-it-sappi/module/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/module/daf15bd7-8ec5-4d3f-947c-0d1b14f4806b')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/module/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/module/f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateModule - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateModuleInput!)
                    {
                        bplusItSappiCreateModule (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
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

    test(`/GraphQL bplusItSappiCreateModule`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateModuleInput!)
                    {
                        bplusItSappiCreateModule (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'dd6a2700-6083-47ed-8446-147083840282',
                        tenantId: '1787f2da-553b-478a-a053-4391096a0367',
                        tenantCode: 'b2fhni708s3ec9r8qztsk7sbdigtd7z5u68l82u4gp4ypd33kt',
                        systemId: '1abcd568-4333-415c-b2d2-66cab2e5f8b2',
                        systemName: 'js6i0go3acfucubttub9',
                        channelId: '084234c9-60f8-4fbb-8be1-73fbae827d7b',
                        channelParty: '5kmd1q1gj6onzanyqjg4b2wvjcbhc1ak0jku41g038zpt8qgo3sgqhpwr9f9m5ark7s63qwxm3h0392g1b2ma81pra1ovnd09qaup52bosmvts35gmmk0btmed89y57iszofvn5zrcz19a0i8k6u0yicc3olp3ao',
                        channelComponent: 'jk8mswf3nd3qmfb42obf2qo11ccsl0ewxvacczwwcbme9qjbj53nkf81pp9ctq7pi3yugg6m5pl1b3d414yapmu3es75vts3yv09l45n9wlvd9dehkspolaqxt2rpe193gygjwwxtfb2rsjcph9819xkr3zagz88',
                        channelName: 'c0jw9dpc2fs5fle8nyyyzv46s4glzianrgk64hep41nh5gop01sukud5dw5xt48p5273tm6n00sxu11ecds0iv6h6w4wktaqh4619ydy15qc8g1283ey6lpc2fcuyqokz6mhzfz7cjlvagw0rfwq8g0j8g9uy3gu',
                        flowHash: 'tb74xm39sch5vpbtpo3alfzs5v9xjve36903zg8m',
                        flowParty: '6bh1ufh9cxqjsmr0vz3c56el82uaxzqutsunthnyx1u0wr7h98vky5uqwp7ksjdp98kesd9rpy5gciwgk43hd8qze0p7at7bogyrboei8q96o3go2izh7s4ukgw2jai7kcbl1y4bn91m5vxg5cpm40d24up7bcy9',
                        flowComponent: 'b447vxtmrcoyp287kfvaj23qiqj8atjgu3qc5zmdnh5s4kfnekdcwrreyrmsl0t5tcu9b9gmpgod3mg4oc3j7umouwg1afv8e4ergyvsnogk4h3txpudush2ezz28npy2ioj96msn31qojlf1h7s96jbjv58legt',
                        flowInterfaceName: '9hmj4rvsz8urdol3q7xrn92f5fhceq69ux3k89s87hszde57q4zk8w9oxncwri94grclvc7hukix7pzc1h8rq8nttvg68aqu7dbjroswod8r8nmx0cfxc72os5oy3sbo8vqj6llyp4yoxhs5ri88x6smoq2khde8',
                        flowInterfaceNamespace: 'f4bccmx0c820d35qdwu6iphpeq56dluxrp97hj99m4de1mptqy5euaa2n2ra4l4fzarepx7xa78ox04jleq40wa5onk39lks65sjm2qvsc8c9c30k2whpvdygyb5rxbcl0bdk5wuzfje423wyu3aw4e3us2w7d8m',
                        version: 'y0a6d8s5emeqehses9l3',
                        parameterGroup: 'jle89wtht5nqahhnvk6w1lh4mdjjph00par5fkoh4u2lfmx34vpy08hkyny30esgw296v3orv3c716337gau8okvvt9ggnwy5ouqe77rfup0fct5jztwnr652bc93nqp0byjb2a28vylep5hrgzi8n2x9zhwjwp0vwhtmw5om1c0ivugqh6shvau4hxtsytc2g5q4xs16b4kgompijwih06e7ltg0q8eqy32dukgk3kpvc4rspwzcjo15f1znvr',
                        name: 'ebud42hlihfsvz923x80naiwdrvbakxqiiybruscqe9vbpevddgt3qjplqp01butd0n3jd2ci1526rslnxy98ar8fal6h037ezhw2u289k0lmj06cgydtj60na1j64i1nbhlhac0kp45zrovfjdwjrsfnylp50u8cq7od9ov3fpf0a29naylkznyg3f2tv72qhz0tepy4ww7aqtsq64gc5cozyfh7pljjrddymeifwcbp9dgqc02hdcmrnrunaqeov0y26thj838whc7kvs6q3quyr4ncl7ajssubod46dfjpkk4elfmkausrubvkqfx',
                        parameterName: 'ahkv4ot8niblewwjsnyn8t1jnu62ns3it907c55fjz0pcisg5v2p88jctwwg32le1s7i3xkklgn2plkz3snxa1146c2f91k6wbqygez0lc19p0t6lpap4v00r078oo7pljdavh8ims9f6ywfpxibincarvnph93mc7e7fa5wd7fawoz81igoz4a8knwa8z5jyxnsds7uk1limionenxmreeviixcte4g9zg6necvp55pjulzmhjrw6991xzga5e4b8ag47orbdikuvam0p7wgg7bw7rv14uv2bv4visqnlhvggcpouf2gmquoj3famtr',
                        parameterValue: '751u35ly5o33n3mc384jr8nxgt31thvj9up3dmvgrclb1eo7oyqcnbefo5dz0bib1h8030urvjo217ldwvbgz63sar9jdsi8prel28c5qz0yy3j2p5mt6cxjgn9cnb0k4qkbyxu953cenkhjug9s7slok8tmjpg64fwrvog90z8h78z3pfwqu855jlkluwmzzhqhleube7u0vsen3texpbd5a1ymsxq1f5ugkd76g9ovyusr4nil0r4cns9jhccwwegpi82pqokpr1emtx5tntvtyr7u828vz0vf2u2x3nyasfiosejmn8abs96302lvsgon5pt43f81a6ulspjyrdscwwvynxxubvwx84ey3dgzc6ql608jiq491jaxuhzccse9hw4iphkfd0yq99msx2m4yi81b8w378ml118ahxu1bnnx5x91za5wy0q0zfvwnny98nf3ovo7tlgdzhmxsmp8vsyq90nsij0yi17bohqshzkmsjlq4ftqvp7xxdi3vrv1py5rj9vlglnf62yr1r3e4g05ki0bmcgh5fyl59gt2vcrx3qnc89odkbspxnt1m3o2ifqfdaqevbj6kwx2qquhoc2avm210cdkxpv6z5311moxilms5190zdwjz4cv5hcw44600wkobdzk9n32vuwax1gasakkvltsn7ueq6ybuluu21w3p9vuik7l7eifhexcictjujh52p7qf9ta639ljbz52q8upa2jm234gbmsiw2bom6r11v02cm6knmh05u5z0uzcy4wlw0z5bivpip88a8adh4jbndh5mlo5xazztrowg6h4qa9549wg1wr3p5fpwc8kocxb835yn8quf7amo0ssuyajjd9u5gxybvrcmmdfaurucpg0k3wr5pe3jisvhadqbu28srxrbgy13knigqmibjlwnwwve3waa2duoafyadh6lm25wpz3xyn3uonvkwh1qijnt2e9ohxv37j4q4myimhhq25qk3sgh0fl3frmm3zgbkxrm1it6m',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateModule).toHaveProperty('id', 'dd6a2700-6083-47ed-8446-147083840282');
            });
    });

    test(`/GraphQL bplusItSappiPaginateModules`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateModules (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateModules.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateModules.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateModules.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindModule - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindModule (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
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
                            value   : '0dac221a-a618-4ca2-99e9-dc497ea50be9'
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

    test(`/GraphQL bplusItSappiFindModule`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindModule (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
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
                            value   : 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModule.id).toStrictEqual('f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3');
            });
    });

    test(`/GraphQL bplusItSappiFindModuleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindModuleById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '9117f682-cbd3-4f45-83ca-251f836b1246'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiFindModuleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindModuleById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModuleById.id).toStrictEqual('f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3');
            });
    });

    test(`/GraphQL bplusItSappiGetModules`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetModules (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetModules.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateModule - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateModuleInput!)
                    {
                        bplusItSappiUpdateModule (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'b36153ca-88ee-4420-8be5-71ce54b6b00a',
                        tenantId: 'f95bba32-5a40-4d53-a770-60f072f8e95e',
                        tenantCode: 'mcy8hc9x89mk29v832jt22d080byvqledwln4b2n9rod0uw925',
                        systemId: 'c9f1601a-9b82-4898-9d60-1d7e24ce4085',
                        systemName: 'd8vg2qafv0ogh7bqd8n4',
                        channelId: 'c39dbe13-cd6a-466d-8281-0f7fab444793',
                        channelParty: '6u9s1xuh0gon8x5ecozz35thdjhh2vp1nlb8c0bsowag61wgbleyb9r5ixnypocdlc05z7u8tdf097qqr5l0oga1fm25na5scebuowusfb6uodaittoetsiwmoohr1s06rajodrnnw2wbfkl8fuymu5w0exczjmr',
                        channelComponent: '50tphchbrhc69srq1j0qn7m0omvlit7hxm0cujuurvemkl5b0vres0s4ed9u2x6b5u9doox70748x5y256fyad5d16czu093jhhryy3q2beiqix7dkm4h66o4r4ionxr8te0rkypz9g5hfb8xzo8gewxfilfnznt',
                        channelName: 'ih25xaq75zqx43uqgjrqmwrq60px1j3ul4hyxdshd0ibl78lzyxfrzv7l8swqcijiitj1csk0ku8anxybc8edfuem8hvv9c1fy52age928jfttpfo40ypaqt3xf7vk88bm6u8kcmm7iwhixoi0esrhybp7h3yos7',
                        flowHash: 'eiasbpak4yzr6zxgwashy9p5szehn9wd4ieeajhi',
                        flowParty: '26avwzggvg4w6c0bw9zgelrj8xdly2ah8hxri4d98ptbfrisbpeib3ye14watmaedfbmrv7ay0q1sxf3n9zd655ib0le2c43080n9z0xcikhirnwsqqbnitnm2gnzy0nyq5hgsl4855zjn7voqznjr6wwhbbibdx',
                        flowComponent: 'gu2lhowbw7fe44ooelszqe7981dmll2scgp3dk9vww74l7okjc50ut4kybsqzpl9s7m8qyi3udeoicwt9by9c0mp5k0lr3awn46m8lyvacz7waod2x6ow4y0bgujcymiryvra42rocye8waw6s3ojoiksd1bxd5a',
                        flowInterfaceName: 'cj32tgrrvsiqqabkmonispe8eesrq9015ceiyxz8eputuv2cnypa1xeg1vesf09ag7n25smvs0h2pnoi5oo7g3xnnogxb64js7nf30fht444i7st2ae9tqgl2xok7keo2dij2fb87inv3rjnak9osl5jisudd81v',
                        flowInterfaceNamespace: 'ob5e1lcxn1qjospvd84oqzwe1ear7yx1klxt3tmhykdss9brl6j0j8iixk38swlg6dp5z5poswtbcs3y3fjfswylbemvium1kydtvm8ffuad17e6jyrs5gs9s7xoxhztuvihk82qat0k9c63i05fw9i0tlmpkvw7',
                        version: 'alo9fd7dy3yt0fx2g4kn',
                        parameterGroup: 'o2jx0h3l15194snl4lx08030zru35excrmlh9dqcwl3pr31barhl002yee7i7c9zroisuit9ft1awurz07y3707da24lo28mx6yyoe89bfvj2ltse6wxdp1v88ug3ztff0qt1t1cata8u0l8v6f1myzauso9k58104niku18o92c1ct8m97wmb4zjxbsgoif3bspohb2vrdr2oik8pz8d4vuw67c0h0m4ctru0dt7pge09ceb58550qph4wrtmn',
                        name: 'ww5kc9al98mxqkvirud3b4jn1svszs2gxcm2rtmaq0pit0mp982d20661jg11h724fu8gtmiram24bampeut4mwfv8rvjm8slsg7nxavactife7mmb65b8zjwhpatd1safjinac2x8jfemvwwfzj58whyrv3g4dmxthdhaaeiqi5h4nbpl74k7e8dk20vlb4rl171ijc4sfkwou3eldflrm5tkxgps8tzxdzhzl61jpk7ujc0jeo5z637zv3n3vzf4h9hv4rsdptq2ytff5tcpbnn91kvm17fgpda3q3pde9oq0zfpt5esrltp8eh5go',
                        parameterName: 'mr8vma1jz21q99beooiet8d7qlakd5z2k8nc81u8cnzeoa92qft7alw1xyk5j3tgirrqrh7vr3srvvb0fnvee7mqq1pdgwnavqtapa9vbpozfwlvuiio1ra0vpuq3707sbnvfk9mjo43ghm77g59ibdd5bsdxgoa59cfww38fkottz3xnfa8ubgw6zt8ustuzd6bqty51qpnljrg391rvfp7p3jdqk1733ncybj0f64pw7xyjwlvgsnnpdgq189oy875y1ozvg23g8dt065hjeujz03of091utk3s1jrzrasspmyycmll828dm82oeu5',
                        parameterValue: '0vogvcebitajuok1p04fkikqhob895zxac7elq0dfqa0wkhe91f7gg97m3zj5gkhs9mxnb7gog6sep152zegi4moj81dww404cmbhhibvce4qabwy1ga3ka4ftdedd2vpq0j70ztoel1h8wsv0d4yp82bpmjmkjsf5m2nohk1wj3ikft2lawm9vh5tw8agftuut6t4b2futyb6bbk6jy6pi1lxwhuusiuki3f7jjnggylo7319166gogqshz9nork26ncfnmi94wphhx8wnsdgehimrg4vyz7g9odwi2kf3dv69kdjf7vx3x4esgjofgldj5c5gd5rcgt6zic9n0z01cqn9c1pnp0p6lt25kz6blt05xqgu7tcjdkz1jty7ib8tj54169raokkho5ht3w029hkysaspgh7upekbo55s5q9k3pfuk2jsmfd4im960zuhhrps1ao6hzov98qma77qucp06uedg59zxti3jp57dcri0dyx27sajwrqo0kxsdtmbxpp8gn0hqodfttyxy4s09co3tlhh9nqgbbzadmbvwulqiqac87bl3925ozvz8sxp6uoy94999oyhwvnlsctu917nhlinl6zi19oht0db6826qi59jg8k3xfyyb60p5jldlhk0cmf4k9bzdxugsk6awgxfks5q8zeop6alasek97q6id5ganfr9obkteag7ghk4alhy0a0tqper220l3cvzel6jhxhu4grqxudezds1bh1wxczcf286vyr8dfrtyczqhjyxxtur3vvh1semxwrzmalymd0u6u8oun3ra8kzfztks97cy2v3wqdpfwsdbezgczqm1x91qljaqzd5px2nmr882cl5e4pmojpca83lb3wtqop4p3ukqkaw5hy88jxl3bw7d2spdhvoy93nm2sp834qfoczxfv3jkdjq1vsh8bqkf1zhlp2z1cjftixiv3g3hwv3uz88am02ahbvgu43t44ezejg3532fzpl0mhq8404wmih955jaf61y',
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

    test(`/GraphQL bplusItSappiUpdateModule`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateModuleInput!)
                    {
                        bplusItSappiUpdateModule (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3',
                        tenantId: '1787f2da-553b-478a-a053-4391096a0367',
                        tenantCode: 'en5ttxhbny5d9erimzg7f3s1975zppocnuikdraepskay5qdbe',
                        systemId: '1abcd568-4333-415c-b2d2-66cab2e5f8b2',
                        systemName: '48b4jx55ey5brsqcftb5',
                        channelId: '084234c9-60f8-4fbb-8be1-73fbae827d7b',
                        channelParty: '58jal754eovwszy6vdkj40gf76el95ex84k100i21h0q16suf8cvzy5vlpxnbk3dn84czo36bvzgedoi1zil80oh4nz7ayszv3zp1yh5yqorls8od9vodbk58z0byv96uoglu8zjvq6ca78cyf8rtktczlxin9wr',
                        channelComponent: 'fh48l1wqvwdxlfrip6ysj9wmvb59idmxoe5gj8v16jto8btzq2bs58g0c7tziniaj6lecnp4qqge3h3myzvrtg72iat23w7kihltqj5tf26emuyzm8kiipmbig0ec0gg0raq5abo7lsg6jdxo2v1m444v7n3f7fa',
                        channelName: '4n94evb511yskaat6v86pijutk897bwy6l19jqgr5qetqwtlqknfj2ef8nt93wnfu0r5556ji99pyn2fghpcpnrllnnyh9qb9kkffyhe31n8o9cl5kht677emy7lac36ei3levugxvakpcqjjohrlgybsdx7f3q2',
                        flowHash: 'c3nz35lzj5jfaszh3dztv7j2rkgcfdl88853jm15',
                        flowParty: 'ns3qgsd0sdiboe0sxfuxkmi9ggb6ebvu8eeprih20d0iy1hx5l9ontm24rep3i7a587wspck7l05wqxgo3g1e7kza8551xq33ik0zhieisx9jngfq48d7rvkd0900kvo8sk1vmpprvdi0hhxwqr7uh6bzzyaod31',
                        flowComponent: 'fcsscgreaizw3nzpdgb8lkm85ju9d39vbeutj6935qgqe5tnhlfs95f28thl02pl0ttf5xbax0z9q93xq6tk3yw20verc2uox3x3rawcqenom385tqu5o46gffefpzaqsa7cuy0hdqs8w7dk89b81yxty676jvxk',
                        flowInterfaceName: 'b99lt71wiwsvs1c3r5jeqk4pcqta9o5grq8v5f8v90hp9qlx3gyyn9zpspowuodvxhtncdd96tmkpfwdzg0p6of34fsinxo8atsyoiq7hcfa20xu3rza53fyd41gv6ekhebvte21nj8xzndlvfxlk0l4ktmat229',
                        flowInterfaceNamespace: 'jfsaon0z6hzao9ue9utyaaocck1xk2yi22t3ik1b7fdzgb89kqtjb255sr6rf1q9eb598y1g9fa3c7tkfjqqwy6h8y81r27rgwm3e4uba58k1h810u3wm6z8mqhokqhkqqpa9uxfbxqwdmmgdzk3lfsm30tujf9z',
                        version: 'o2o2166jsdqlsi3by17i',
                        parameterGroup: 'xhksyrxna9d8jherene93vwhojmg530fsbhurle28p7208rryq1e6577k0j5z2xb9o81ipy1yshmvwedd31g4j5a4q9g8z3hubzpgng5ebhyjr3kzuq9vzkmh5hfwjpam9t9a255cptt01opq16i14etnrv8gl4yorjyq02rydelp1g7tbne5hcoa8tlgnhf2il54osc4r6r0cmlalwriz3stkg5e32gij7bf0m4uvjo0qdiaojnj3jp4tfwdth',
                        name: '7vvbs9cxn1qb7pe8atq58hzjlbql783zpdmwn93fgfy3na0fyj61ajvkuw566jftg3v0fje3g2eqyx65ksjsyg0pi4a9ty0jz8rv0tsc8dv5289leqcdz8lej12vwlxsna24j5ho3v8hmtxj6jdi0jj6gbx25kw5d747xp939ehc8bsiwygo0a7xq8d63jnmf0dh8ug21ndr3wyic0x4rofit74cf5jaw38afbqcsp4z7i21nq3dcihxdtmm03h8ok6q5i3bdo9w1smzjrdp1utlfww4mor81fws1vusxelgpuqxuxryhsg3n9h76o0b',
                        parameterName: '0ardq21euxekxrceqqgxkpocjzxb1gyax0dxs0xfc0u66szsg5s0d7l420k32rsfui04lo8abnaog377q4ivlvx12jci7unuby6ojjopidwi43eijl7sazy118xbcujl9hlwmf3nmwmh923lxj1te0n21171lu23yowf95fdvcxt35w0dfct6r6qq5rcay257ol4rvcajmw2126r6lq7w06w0u3zz4qrfwnd1bwdddq2fpd6o36d3jg00fie1q39kijewvc6tx7zvrx4c5ifn8h6l12d0iya2wnqaepberv4amdoxdzuovqfa3shfy3o',
                        parameterValue: 'm3xz1rv4skwwdl5qdis20mcps2zw4isjv7reqokwbw4wt8fcnherzuppird3z4ih4gt23e73x7smb95hffmavft5e80nmpuy6xeq8sz6w4xw7q9rpwugodhxnsv34w7tu7sdzd6yyxwrtc6k9xtkqbnr7wsgipwmzozlagcm5gqxz2bpcw1h1yytcicx604w57q1ivq7gob89102d35ggjvy1rqnuu0rlxqh0dpxu0m6o2zbkx5at5m02nislvbenvvuodv4pswz2wzswfl8ncz3962q5wdu2fh68tw3i5efvq522ml42ciwsfgy9emlwski6r691k17jbtcd5nkx9zdo83o663vg9oo1zw46mid3wp2rcv14spejyrnf94hwm3lomi6gxesdxc4vjssu1j8pckypg48cbm5xqefp3bwo4e06tbfym3dnfbwd8z8cpi7ywnhdu3nya7remh0s0yahh0ws2ob451vq79l7znse597mv7az16vo1txagggo60irbqzvswxlisjqf9r3u0qiuvvsaa5zlje7o9ijb75ii2ea8wtql6lh0qz5p3o11jm45l0pcxcg7k7wr4iztmoj472tbm25pj77egd7jskq2rqso0bgbww5fy3tpv64kp4t3kpd7d7803unbm0obxxy4a6vmfakreriq3wnt8ynt7p7si4fmknw812pl7eizvfc42ztoy6e0lvw31ni1gh6ial4595oglv5g1psvrdesbl3heuz876oarvu2nyrkgu4mxk8r9qpus87bor3teudgzvro2rxndmcrbircvd76ycw08c6h10igbdpowux2z4ldib5b18qq2fy7e96s2lzs7msdm7qq17ehvggnfun5m44j40fxq6reb7zm04i3zdd66o93s25mld8hxk0eg6r93f9is07tb3gmcbw7b6i6t471qlfrhijo8bvbgs1bij40tl2a8lw9qjcjgti1rz74q9kd51id9lan0cca5hoe2ilxxgxbbfjbgjepga',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateModule.id).toStrictEqual('f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3');
            });
    });

    test(`/GraphQL bplusItSappiDeleteModuleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteModuleById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'aeb7b041-21f1-4d88-a74f-5289bb7e042e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiDeleteModuleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteModuleById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteModuleById.id).toStrictEqual('f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});