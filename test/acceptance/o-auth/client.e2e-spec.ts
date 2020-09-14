import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IClientRepository } from '@hades/o-auth/client/domain/client.repository';
import { MockClientRepository } from '@hades/o-auth/client/infrastructure/mock/mock-client.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { OAuthModule } from './../../../src/apps/o-auth/o-auth.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
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
                name: 'okbt9vshbq7c0hey1sc3b8ws0mynfqevnj6znqjuo7ssh30rzuwitbnv6zkxbz6dzorxmgnvpv0eibhgx8gkb0c26td5qk729cmybxbzjgvtd8vhahm9ghk3iesmas1wolhrtkbwv0f1ihubsm5ti897nku6zs5mrbv061778jj3joq6wjq4sn6rod22k8exuyxezc8pr4e3cz9jo6btwiffqo39714pjg970dkfdev9iccw0sabeam44wk31q8',
                secret: 'ksynkh8qt0bofp8na2to2b3o6k5ax27vkjur3axg474a83wkcvrdya55xleepf9iq0kh7g6xr3ik3882fukhrr7gbi',
                authUrl: 'ckr5lcafc6qc3l6o7igaouvdu5kcq9gg7h2ykwemvrf55zzibpxn0m77uo62plruqpko65sgyw39jda83kvma2tzxow9tsukx3qguhm1rkuzigrzh30ghkg6547mqob4t9oj85kz5scqqgpk1pc99mirr2od7mnl03fphfc8vwtni7aqhhzhd91u4t7bum6cxv5wq8o7n2hvharltk0fuiw0cm9xoek6rb3msft8xg0t25fvpr8msvdj61fj9ukmjmcxd7oefs4yau1hpvpx7smd2qrpi6d9j3ht9bncdhkzjka8v2uamezcj6oi8fvcw2qrkyqtymasr086pdglxypi4opbezepc0bwyitzalmgkhtunb4rn83x79eoezpn4lk0ow0p3nsk92wazuspd69tg2w320rgf5y2k4taet9odsp6hik39v8umkcpx617mttoo5leyj0me5gapub4q343nh0dxtonple0xhluai3z9vrdd0vjpsq6jca0oxarno0v73twcagmgz7czhrg2pgrzr5ywuhnt48fcuut367ge62z0veztledoelbuss47ehvw682bc0x842q9evr0an28oiz6ubvm0wl3441eep8gah0q6x7y7l8vh17e5nbc3fubabwbpkdcuxhtzu3wi6dlc4dxe5c0nygttqq1j1tnrl3asz8ta73ymd5qp4e2ng9zpetxjqy341f5ji0kwgj2w9mapgs384fk4u6s8ri7b6htu99y9442e5e4et4phz06ti4tjrt70os8d4wxz0i8n6b2b65j8lk6a220w9fmldb4eh2zsgonn1c35qn5pse1czap6htwvnm7o7rhwx38ztejjy3h04zic79tjdvg3yzuf2qhs4a8t53q1cgtqtdyycr09i1aywjetrvywpy9cnsmh8ri3w13m7ujei3qvh95nheac0j4gwmrnr1c3x78q1gd4r0bn42qy0lzab8aloeftd6ndd76srdec4knms44n9h35soglem3k3remwaiou4wdt61v9gd7v2w9bcbsl39glnyop291f8bxw49dpj3kj9nknwfl1dwhxw5dwyzaq2582fnsi9pwaunnsds0swluxoxare67mxsqgexmpjc0znxocg4sahrdz8psq27dwki2q038rmrer8c4ia67ijhccbhz58f9b0gv4snhhyv21ziu1d204zj0d0qs0v9txlykkh9t504v0e0at3bmt5rcpdxp2orpo8yakex2egt50ffn3sj3gos06jz02g0cq4ix9wmf7a40um7zxdtn0hsmm105sqfggaqulftyav5k6piyc41vi6gusog9fpp545dd5wvbrr8wckyz54dztq77y5leaibebl8w9vdd544wglk4fwvbnhcxbg7ftxzz5j724sf5zamqwxzmz72v6d3sihxp85xpb923e4x9308hwv3a67x48l3w7lc42eto07tx9t4dubroq2x3usblymevcv1zaiwpx9ji7eut6enofvnm54w0bwve2x4gtkgcibyahavaumh9u03dlosssacpuz7sdp74v3tl4md66qzw7vv67xvza7iigeaenywu8wm7fus3kj3jdf0joz7cfghysoom5ukh4034klj6svpsf1xd50i6ngi50uhkkhs35xjzwpclzufr2tj12hz2nmdoje25gbrim7t2ngkb12aybjdo7itjwu2zrqkjusnifhh4yfyzesfoou58ou10mkyi5ps7b0b49t3kdwqg5jlnfvpxlc06vw9ora58yn7jzycegmp5m6k2bnw8fkdguft0pro4a14cjtqxru802hxs9n64jjwcselnzojer0hjq581wmg7jp5ma1y48u2s2re7jx4ci086cj5q54tbbdi35dtkts8eefvsescuhbopcow2ng0h8s5fkomve1gtjmlzwqn6dkpuc2rlytl978qphlnge28o3thnjaqnxco6o7umhho2me6twy3e7mdayikmic12qgjd8pv0wo2c9occjs9eptr7xmrpub',
                redirect: 'j1whnq7kd0who9e3y22dp100halih57farlikvcd2rzbtv7na2ktsishp508ubkaszvdlk9vkiw5e5au5larryw2ijvxikwz8yq08lcxuyjgsqi6mgygo6t948xnhzrlzq4dnzqxm79hbr03sreio5b4pb9h9300iogk5q7whrns6pvx9dww6w2k35p4pz2o4etgv9b3cg8jxwtr7hadyxq3vxihrh81ihlvjvgxfae000dkuipqp9qny357en4vun6e489ieryb1ouizk42aa1z3tny3h7w7ekmpfbexu2c6jnltg418pgif49duw1ns1e0lxxv1xj2ggu43houh7cbs8i5qk7dsoi2eqxa3s3pnafnv462avfngko4ofli13orn63zxfu7aizqtmph5wm6kw1ca4k12bdydn02oxzxjxk2lj3xaa1ej3xzny9n2vjf91wls919m7ulwme8r8qo2luxzks66s8w926k2n9zndppg7yqal4yyzn48qwimzwrg7y73y6qcom949st6ufcdyse1e5rcznaxd6iimnj4pt3n6htftx38sivo70z29y9spmv0w4mx34f77zbf4zufr2098e9a684xx5s8ynxgptivnzalk0n3e0n5oymjos0sc09rjfupc099sv7p9m395xoq9040bc5m56sk7oz8pmi1zpdj15911d86vxn007ok9s8aq95hzzpojn92tbbillvgbnkun90eenwa8dny852oxyxo15dwoae3kbwdseg0e1o608cwd58mu68gt91ct6qz0kxvyz9zl90fc9ii5dnjywun2qgi5n1jb5v5nw36s8awievluvwnpuo74hih0yx75z6n50bqkke1842evp33yukk4huygdurwixkcwudxhpzi2vw9tvp99w7k45fkn0cdlz60m5gb4lgv2neyibiifd3wtnhw9aajr23ger4u6l3ckd172n7h6nn0rizr9fwy0vx9x5xyleki8vmgrkrpbe3gh0kj3yfyv3yvnqyqubmxhdtwpfevbbd5q2esc6fyfgqqk5pfwyq5ueplbfvw5ch7seuicl7vxgilmtnggtw2gjp9nlru2pjeif9t8k9bcvnflai7im1y1l3cim21xe9f8fsmm6qwqz3p4vk32ciclxp96naj8o0x196ihy0zmbqjeog8yzy4laze0lndyidyv95qeyckd9ooxz1z4isr14lh1pzi5m1tni4xyhtg742rwj7wohjbxrfh8muogivvrb8fz65nudc4670je76kr6kv5euds5vx4isdvszp9gz59nh7518ils215cbff04cvh188xqkljz5xa34shkcdr3k9v7r3o0zpqvhinqzw8j7830xlfmgfy4rkrrush6ukpl5bbucnzrdd5mh89d4ypzclrlohr9159407obbv9yjucvqtkg73pyiteg5o1njpfik0hrc7dubi0sq062g2ocph1cknsyfuu1olq5a2w08on6q8trwws3lz7222pai8zdhkxkuxhklv0mprzg6z3n9hs7ibli8b26jq6k229bqon6k4zqay13dhwaugoo8upppfi7hyvk1ezj4zyf6nm830kanvokrseopzrujkx7kh3nkviymtylk50al0u98z976zwao4de5wd2f1flmhovznrzjl2musx6t9l5ak9jsptn8tx5km2c4h5ok1p2nyg2jepc50khg58oz1rjyp0ws0gk8pxjgs9od1g2rhqutxnc7kielf0n4ts18flg0ytyh7wzns831itt5pbz4uvimh0hmacvd5q1yxlloc2cn1wxblhxykjj4l2250oqm1ppxll37chw30lsw9olm3gmgxk0nquieibd31sypsv6p572ip9c62oiyc0cnnkhziz49dfoqt474v2oy854ck940xb4athdswmvz54cbx9dtmpfs5gwla2xojvw9s2orly9xc0nd7p2iee1da1ko41v8ng5gpdi7b4gfdwymw29akxufb2s9bcrad33njmf3lub98s3fja',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 1630538224,
                expiredRefreshToken: 7733400363,
                isRevoked: true,
                isMaster: false,
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
                
                grantType: 'CLIENT_CREDENTIALS',
                name: 'o1t2r7c3rg7wrazfvygznefw6kalzqzawoqreiwluivp8tlim1v188vuzaqjrp95j6hwpzkhlgrjwgvqucboh0x9d2f9ad79qbcjl83w26dckm6ssl76uu9197lhj6hdi5vsa9z5d24uc96mem2dk0z6kgkr3r87oxa7blwf9734kx6wi7j6uhx0d9ievsbq71nugaffza557gfl5dfg17sgxt7gc90th0nlmxynk1vpcvwfasv1ux6p766xr76',
                secret: 'apv2d1q7mw3rxrlpwj8rpbytlj2h4lew5ocwcgeyl2dschj10qdut9qjblquf1ug0mn7b9fdhsvae9wcb17vtenoo0',
                authUrl: 'mz2dlzxh0wol0n4a7dj2r9l3f2wscn2mekubgh95agy87los19e2af88wh9w9gi6eon69l5fd9a8j7zp0nzsslddkkxmzgq4exuu8hl8h5ox99ynpwstqsw9kfg3vti5w99eyepmvf31z96apbd02vf46iga9xi4w4v1xiv7vkog4xdqg80ptz6py8qv1cknpd000jzb1r5xk7udahbyb1dilt0ivhh6x6st71mtux8v4v3myc777muvjzulactrallffz6593jv6py9lasrhmwq0pehq0ghzb59jk5gg5qp6h9f2quqiv4nx0o4rm9xa4mq2itl77p3mibpip1iiq4xdayatopuk9bm7lti0ulu6xiipphxedk0w8khdb4x5dfwz9z51fz33w2qky8su9urgznoi8et4un29tpyl7m4rdibwwsks5nu1d8n16l16z2ugebecus28l9ji6ohh8vgd8v3nuci52i3on6hwqwj3a4dq1s22bwip9cqlyb6n1saen1g555yzdzd6mgzjnoljt8ofjozjgb44bbfe7p2kcgzad39th5wg50kul18gg2rfek034poxew6n6qw2itac3kf8ir8x7vxdapjkzk7ibrhh2vh286mnp2b7qluepp6i26g5kju8yiaz7npiy24m299mwnztxw6igljxrvaukdl15yweemeo29rmdyn10vnmvqjrfo6q6rq3fyr5kmvj1uxemwzlz9mfu36nygh2l32w13colsx3ld5ssr47fo7ag1rgowyd9whkvsgf065gn5msw70roc614xb03iftabdpzgymbkkgrqtnsrz1bi397ybrz4kn4l9bvls8rbajefe45mhq9znmbl9vluz9la76qet2zvi6ot7hq0ransmnxdt4o6p5deu6lfeb8twc1nltzhtvratckyilzzomfjthlt4j18vi805y9lt79j6r6884y4ms4l1ikjp721n3getz0j3ary07cnakvdjrtuab1cuso0snjn35vf7yr5aofbx8m14o287io4nttrnh0db4w9sbpb0ddlv0d3j78lqvsq972yvd9swf5yxtk3gjpdq9vhmbzq5av3e6xtx6d1m4hasn7j1ioohrjca48lz8woi8gq5d3tc7amo1i0d726dfklnc72fmjgracddvugmlabu2f4zf2jhbuc6kzfsewx4aril0a0vn139jtvz51ecmipmte14r1im09r9rqsqrfh077jekj9zbehlz9b8lj83mac0qttswjc6yppm3r0dd2rl0ui8hgkydvhzyxlljyu77vvv3zun3jzdnu773joa944gskqx0nm4cn4ytmckl2j8rcfnczd2rn6c9feko22ecdipjzrs0v6czo48e4ew1jkxhxvx8srjmdnzc3g90un2j7ojqgygpqtm3me5wehileihlsex68bk102pcgk27doytsi0yj46okd0mczk1zbuoqihow588orv4valxdng35ebjwg7dukf6timbtne07pjmdmkpay3z3g6mlvfn3e2y96kxmg59nl6z69ketsi8r3j79hjw79yf7a38znfv20j3ysainsbl3uqqa44h784ldpvjcnrg3cqg15pok8puvidvwe8dg645fhu21z51ga28sgs4xv03cezyowcbhgkpgky1vp17mxqyl7f3e0ezwxrcsx4xpd8j0yy7yl36uk8m0oehnefljjssrrqvcybaq2qh6ro9aegjehv549a7ibhgjti6hycmdpwmguedkx0sbe9bv187638qs0kusymjbyti5wom4pf43v3dg0cvwyp4cjqxx3zjaenla2y7h8b28vzmw03pqmnd2lkfcnimhks16xhprne4w7fcjo6kx71rfxcv8oytla7rsz4wxr0kdy5rfuy8odig77y2ybcl4mruivbvkivf8zu2z6bo3b2kmsalkx6743awe3istk60qy1cmuj40kkprfdb2dxunul28g77mk2fm1bb1nf3pepny1mzba2tjqd9o36j6b2rjlj1f1t',
                redirect: '7jmfwz9obhbo1uza7u7w9aarri1k6ix3ffjlw2zvhmzkpfn24gndu2rqkp7f08koqbrgzoajsvbb2od32e05qfbif9s0p9rtsv3059fp7pslmq5urhhass47mkve6lkqmoonhwijydkwpsf21uwv3webyzt84yaoggeeoxg7cey15gfy1678urw7sdpj05w2twguhai4wk9im9ojru9o6t921ng7vkpib0teiit22fwfwtk8shg6mjjpsuwvh7wmttup6w58yfudqagps61nlaz3wdcrpnrezm4mlc43ejk44erjw9wadkqk1fc24vu7h05087nt9o5a5l2gb1gmf9yfkhnfrpbfyzuzy3cgl6wmv2livi9mc4zhvsrxxuxymzzjb8do6w5bqe7zjf14hf4zt6ztb9cw8ka761seq6pcvbwgr1wn56yymu8mwqkkmkj5ctavfysjs5vecn0lr0dp56s7n10zdhb5usl554x45psm3x3ztkjxz8qa23mtsjr68nka2ofmonhn2vt7tym9sqkdo449jmrgh1b14zjr7j8sjormynty5rcres9c085byq8k7i3azsk3gx3lotijg3jwrwi733guc9hnak9lmv641iaeqyswlmtmsfwnszs5ue9p0xgz0dj5z3xm2zrmj8m5p158nmltt1t70gv6cvwf9liscbvlz7mx0eiqg6wh33bs3xgcs16342xhsri8i1faswhxzzcyslawv7v6ekjwjv2rff79rn8l3lr7lhvtegg46r2ewph7a2uxjjplbiuv3nt4z20d0zfrm3slyzmwuq9djahpk2kvb8myx1gaaefokvd3inocbxrs1s3k65w2g46slsytsunn1l3rwfcur4toa4b3p3rcwytoxfmyva5u63zinkvhy0fqhbbx6v973nry73l9prtowtuy9l5tm9sw8z4c41dp8jccr1qmyln77fmloquon1q4u35nbspe2i2y4a31sipqn3qj6p0sohtjcbfnxzetqo5om80lygrmhnzzfjeyi64x3ksa3dldfdmspfjklqpokv6rojwiiqdw7l2161meb95ur5phxa5owfvue8l1n8z5x8w3oqqlhq9gwkzl06r4o651ursppn937gzxpq00k81h6vbv76xp2armt5yee76bo7chkho2g3yv7jeyi2fpxjw3rzus5qzf1ensq9a5n2dljflay5nrhij6ibmp5z20o4780qb64cdsm6h681ntohkpqp1d4gvn4niv4igk5tyu9728uaz073cm2l2u4bdabx0zdgcok9u0nt5hcrzk545pdb5zsh2c4p3nq96u0ubnjcbknw4nl3y9exc4dj7muv40nmimk4gya4ptqa69ql2lderg18l2xa0o6neyxu1tly635u7spfyflarmgicn5q9af44vfa0jmglwpjhnjvqpbp2vc2dxgl58qhylvh8woneqylvcbpp79602625uc4urcwokuhw6jb28i5zttsrpnxd21im17wj9wctquzntwc4kx3aevdpmwfzpsosmxgfxhhzex3j8lyovtliqobrffyuby51i8ljbaix1yjevlfa7hmv9jh7ngoeoa4110wid1hrxmp9l949belqy93h1x9nb9xjemr5xf487inpm5gli4x1ifyyzg2gubwv3m9q67f1offjapzderj3pfaji9esrd25f1zqqmmo5xbztey9ut7k4gf7xvtojri78e66byhd66sgl5afjyd9udy9oz5oyog0dpq6ovtga4z4aickkyjrbqesyebq3vwh8p52hpyf3v79ozxjhakalxwnalhpph924uti2kuseko1mdq1yo7fbvpmrdivzhnmg74xymhvrv3kdery0l7ze0gsz5sxi54rgwrd2o8rjr0n7gglr61mgu4bteq3b5gq13gp7quhmiguyb0f94psl2sj6lnsjzpz4jwu6877t7w9f9c8lxzmj5hieki9d98nqtdsaydq4q8cpsrv431j5kzxzj2jiadr8w1aizw0eevmx',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 3836709342,
                expiredRefreshToken: 4632509720,
                isRevoked: true,
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
                id: '404d2cf0-0044-4be1-b316-7b4ff5fe41fb',
                grantType: null,
                name: 'm3y2c8rd6t1yrni2kuait47o5b2qnzlhhkq6awfotkn66akxx3ajo9e5dhif9yekk7dltz8mtgdeiocbmhmbjk4ztuk13cnfves06yvetyce12lbsoje5mey89jyxn8gcgqj5tkvacm48fumu99wsrkyaxont7yjqxk1u16qatv5s9spz048yhl01d2g0g189bfu5diytw0raa0ujd9a7nnyor3g6ryfamst4o6i60yy3k64u7lrralzzt0p3w3',
                secret: 'ykwfx72oabrsemtso34jot412psykplqy3xdchi0hbtpiuvudhyxc53w917v21buacvlk9l5zibm0lu864owhe0q75',
                authUrl: 'en37859m5mnmpbqabgnebpvjcb0s6fo4aovssxbdipjuque8r89udp2vyvtuhngimkeii2x56wtz5dwezxd3doger38suz3mptazt4c8ehk099ryxr60t5apq7q3gfsq7g13c7jdwu77q8k6tz0pwaih6th538d7gup5kgspmni9l7yhpgrx748up560bam2kxle49gra6tnjhj1awqch0yi0qbuitlgk410feull8yhaevi90v986o84ooeu91zc11ox89xme78es9n4bzf2tjai946ifu46253apbtfw25ad07wciwo58efst3o39dgmjj89635x531hvp2qvzf2oxb5v6gm0v7hshesu15hzeoww8fk0bheji92x58yoyfyq7x16buqensdw2v4vi6hsy1ojt4eucb9vx2zhjf9vb8t2brqli6cyd1dkkm7lwwm9kw4qb6qb3e86ofj51rog1o82bee6huselm14vo4c2m18ygqk4ibz3heeecngxfktd6yrohk7mj1l2zy11abkf1av5me9zjnxjuyvsexjdgrk6ja70t3x7a0gy96cdvrrjl8bi1jqwaav5v2s474ipwi7768blovgoksnyogy4c27qnq6pyvlg62amu4kh5y7e5feccca6va75elocuqxdoqs16kp0ixnv99ez374ybt0u186quzdexn48dui5621cagm57yk1yffxvxoa1iebuovleflygy5w0dy20b2q0po5qp23pcm5j29w8t8k7jd32dihmdbgyqpys2qm5vfy5jgavgnarhpncjxo77ts102ght6hdr7kq485glizp6nqvjj5juho1entforfkc96rky5nwo89v2l181fbkeb3g642i5wretvh3fqpyqyf137cenfogl6z4w9fcefndnzwmzmyrjkt7r0fxr9icx4yeealpmkwbncx2mb1g8zxcq2xmeq3ts680ii8xvqpv03rxb0jmk2n6lhhz0wd31vc3mhih9jznjk4y90oyrgsu4t17w13ou3c35rg4pg6sik4nkn6faqsq0zrtksk6i8c0jvded85intke8nig7n429oahjichq4lr6k1y3gmkttqxtu9g4f9r8tcowvz6pr4d44bcrrjvileb2k98k0y0bbomxzd7in90t32r9vmhvabqi6pqwy3xws2zmj71t7iic77d9j736u6jetztr293ujj587e7cwouoyek8f1yhqh5p0zocueshk15jbbwxn0p4hou1e72clceies1c0z9ciac5e5x2bf2gl02rc1yw221mnskoi5kgk1xrwwgt0ygjuiocezygd0iajt4duevi42kdkhnw4qrgi9e2owgqbvu4cj5hilgksv9ycp9f50ts7xn8qz8kh634eyx6eh5t6t81x8la0ib1v0zyq5eu345b7erhchhwjof6jmb6pk4l99g5swum9cz7k09fxlh8xt46sdp4xz75q6j0abr79qzfoqhu2mlnf0l33k3v7t69ha20gbi10dbpxtlo6fch7wpnhhwl9o1gzhgn034drhebnmr8cu6klbog036x0dzw4kdruvh3hwx7e138w59z1xz4bw4d1uqn7cx66a7v2t8em2a32ru2spmbej13expa9y98gz2ect9k03gtiu1z9r2kt2yffu1jppw17hr9uuhz5be16xiti492crqat06ox2qg2ld01panfskpe9zd7wfvurcwj99u3vd3om52tavcusz36c3u7wqrnxtz1j8el4blvefw6ayd2afymxwckum3g0m2u5ruto1128lpcnlhnlt7bbxkd3foc57il2ifwwq4f6gpghbnsecd01jdsr6iwkkrmsx72a5sh2yg03dh4a6flj93nateezs8xs2vp762igikv0o85xjg9l61b3640vwozzudmr09b4llwmdhncnmb5dd6dqtodr6g05j6xolj90hwnjs1yqoxoqw3rweb7ligrnpscvimboqdo2nld6r0ry6w6k4vq8xhmjo7tfe9aycjwcgxmhc2',
                redirect: '8i0apn4smieng0dcrjtm1q995s9t5rv2iwkopm51betjhtdxo8q4y94vwjq1rn7d3h9zanvptn6asla7looh09d5gfdvo1ow7kkeq8vqeagpokc7w8klx95x08gy9mm4yx0w7wuanz8ry8mp7fqb1dssim5lc5nqdlbebewejwxtit4s2yvihv1tvrzs7nynv9vk0bw7suvnnxr2hnb9naojdvfdwtdbs9w1cs5z47vlsy54cg8iyqrt8f4eymku8tswk8ixut22z44bzoc9awyg8d1x1ojsg3x51f4g50tbg2epvmcch0x604vox9vuzs1ibjzhu0qxjr9kfs6ff5i3qedmvrdf2b19lyq054ktygct5i4ja4wlgkgkaxpsas29nlzgbo0rvqe36di2dci8v04njdg649krbsju0a4kxwhsyp22qeftxkf1xjk5gw9lrra9ch4utwyc0r258xa9m556nwq5d8rbqpuoagoymt24zg38wswkitqd3b67sd2jgrn6taoqyton1w820kowjcnqeikwkn0r1nrzl3z5ws66clbx1x3vr3dwkki2youvspvhzkjuka4q1suanyozzi5u5aeiqsb0kgqjbbfx2gomjcxafnwptsm9m7cuqko6xva0jrfr046becby4hjw1zbo3gpy4vck4g9ytesbv2yn5dtuzdsdktdcboseap98d6jpyvqioic32xe42r1gvhn2hkapu09i7mu0f7z288o5to3poshzz751q94aldfd0t31pjgye2hz2t9zzyka7zzofxstlaupkk11w1bsrnnx2jdtrtza1cbqzyenfj0x14cvlclp3frd754aq1zyd8sc0qvvku08kbwuns990gbxxy2y9ft3ducc7kq4dricp6graka7dvvfavnvo4bb18guutq0umqz8tae287mbhdh15nsj2hom06yg80t9664tsp8655qun97a607aw0g2xxxuha3yaqkh3u6s190lni80dsm24z6bbp0ni79u9hn56k5v3p856g1r4bip3tn5i76qn17s9lgqcim546zehkzq7cdsmr2or6ejq05q54c2aizgclzz110oserhq7ghujo6bc2r20ngn83dixakxwz2jcu4191zyj42u8tjqysdrbe6ub69p1395fsmn00bba384vbip6ub7m7cb7m4sib3o37qdumamleuznsthvg4inbyw806a9q1lm9e62vf5h9r0wiqk4j88bufdhvk1wrdcgpa8z4lfscsa6ycvl7nty2f3l3wxx6tayr9uakrfxxrv9hqan3d9kr33suztz4cgb9ijr7q0wn1vdmyy3tyt72nkgzip8l7lsolgpgrgnyfryrvjp3kqrx0prnqr518u4is23jpox0rbf3zukeso82bjylcimm3ukx5cs5bhhticc4mbi93n67dpfokccvyb1upbgxnxiqls0snkws49n1ardniuffkdw1fiwfe9n7kvz8gyju9v10luguz17bf9c53fzoi1xvmhq29w4iynh0kdmbvs1hfjty1n4f6tyq1qof50iunbjwrkn313ybwxxz9rfqvglhhrzjvaupzplutrnnmbssr1yo7e1hvj9useswt1u272chfmesrx07mypm69wew00oxiy7480g0dutgi9ag2re4apyga82d4jbt9c2vlyvizx2pb4ks04mrw6944nwxw0ybe7wtp5kq5l6sxtiogmpsd5uepgi32r199nq9ybdnzu1acz06n5z6gwkt5l9uyz6ks7zflfmv17xw5ncw3tylc56yl1cbpm8udeqps4cwd212flv4ymllgdrtpmt4g5ctkmlodgamdo419d61exj3unpbzkmq3ayzrx30hlg76e5t224vnxyijhrdbyh06vn4qp2f4bpiqz8ist2jev56uwygx0hywdete2px6hep5g0ib25hnkoqcvvgj8hngmbm6tfef2q352j8nzlj8xk83hbb27lf1402rjm7madh1ep66sshwhs0b5ypoaoycg5a56n',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 2707275421,
                expiredRefreshToken: 8854847527,
                isRevoked: true,
                isMaster: false,
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
                id: '404d2cf0-0044-4be1-b316-7b4ff5fe41fb',
                
                name: 'j39pkynr1o8mrh7maynhcu204x0l00j9k7vpdaxrsfwru2xxves253lmtjo62ggdsc96q1rh4atesa4caax7iqmrqopocvwnftkxypbai4c800g0xt2xh7m2ax0iszrjcn1cwe1g9oaua9e70ohhgxav9kbhn8sfm3g8pgkudndq06bdlcf3ad7regrg4jhbjp7v0qorh0dpcseis9pw2c6h6s3gwxaqfo2sdy4zm3vv8k34du2f0eo9cb5sg33',
                secret: 'poepx6zhlymj13kxsgvxw4n8kje9zji9hfrrq86ytsr89n542w0tgbav0l1tjcg4ucqy9jbhrfi1fjzpta2jyyepo0',
                authUrl: 'ittueogxu7ap43w3at2c2o95mu0px9vrpsww80voiuf7gfxlmkobj1imeosqackudxkdtdq8nrz7zcnwflx9iy47j935kix4en5mefgew13glg8qngby17ulcxrkmc9sx2y56q7or9hps2xojavaaxi9aos1cezbc4uhzqzyl10fvgjrl13qy7j3gysgmgt4482sz7k1x2szhqldjp7mr58cragx5o66r1zrc0ngigf1vrn6jffkssibgrdtgl3euy5f8807jsovtv1586c5li45f8gcylzl5u73b6xr5akb57irxjj1b0ansr8j04efm70lq6vsrvvk4omvgpso4hw2cmsrwfs8brr7w9z4v541znkhv6ppcfzffi9n8vb6p5jolfzwjelx63pu9t6bwgodvllg2s3q1qz0cixj04h4q5dtng1my1203onjaipt0ki7nh4yplbrxn4qdn8oth4ft4tpc54odmqb7kk7rbbv7tsuzp4jbpz0vu5yr0onqj3f1nue54n90pl0r5ev2zkvqotz3i6456igi235gbkyfnwtf5uzpwpk23xeoo7n3ffnh0hirt867z8iydmlavcb4opvnxle6s920iq90e5rafq02olen7jrj0dhqdmemc1s95wch6sc8vdzvtw9wmoajrag7ddxww3d5q8br4yw6evos6do0qzk9j3a0jz25e8qpiqkry9cmgw89vjqsfmq7daqfbt5zui5gpbgtmrg0uemtmria39ewvux0vqjq6ehi92pa2082k76o4r2g86d18d6xfnx4sln3odnftxuux0576vsmj1hqc9zqsm9sy484hxzae6wsyl5ta32p2mcw3lnogzuhndsp7nguwnm09r8gntuz76iuimvby4oty0onhev1vp1nix1r24pgd2a3noclcckwo915cwdtfw7zd2je1sbzh1hy2caglhkw2qn31nbe7safdvs8nhglvmul5lq0t5xf88cio4wifu6j0lhp6qayu4c61tcq5k18djo6vtshytux9yxwyl4lucoxc1y8oikzujsdno8w8xgshlqccabj0sr69orumrho2tvphgm1zqij0pk7u8e1rjfw5qg1ou8agje3ij12eoxygo7tqwevvsek5gqmhmmtjrlt44pq01gw59uscl592samsatmxpkyt2hfwuct3u5ns6ghgqtcbfd8wl6ws0p0hsrvm0cq2akfvezg9y6zk7baq4khbqfazohjwvgaxd2xplgrrj6ok0dbdd1t7nh4o5bzisglv3mnscxklvhh3q8om2h624r7ukw6fk3gahwv4fswj9kmb5jh6m64qr3jxfwcwhg41k5hmhofdkgi5kb4lhvh1xt1p35zq905x8cwp4ddxghxk7nrzrunpjjg9b7xm8y0mokmyf78vf7n05cz1b1bde2j9j45pjn4plnuf7qq15zb7cdl2ax214g3w4qvu5ltaeg5lvp2qdwyjdaucurn1hkifhp25sy1ug3drg0slw6d7470ucfn9z2ph9drmmmx8k24fkyynjavkl709o99n6sv9zau63wbwghqrgrsk7hbzjc953h3hakli5styf83q2yu19eved72gixtgrqnjdfwnwl3ec4tqx84ps050tedfz2gl9c1kpqs48qgxrbqry45s01gkg3e51s7sjfwczq9ebo073fzi5rp9az1ydtvnqm3i4q6t2062xscjsfw0pk698zrxalkocfxd7zvygncm7nssfc8r270tb7rgszgk8pnzqwf4gmkx7f35ksjq7h22cdr1pkzil67tl2pibzpetj9sy1bz2dwocbtj335dr8bdzvv5h3szz8nvyoywvdbv899jqqsogmz7zdsvy0e5ha5s9iak81sus2mhl2mu982bluzm44w6goor351johkr09vc824oyrec0iar48jstpmjquqlp0w29ei7xy302a2b59nkt9lwifec5nw8j9qj0odcf8vnyqaqohb4aut17jun9q8obd41plvwi8uzdk185141fy',
                redirect: 'b69exqwvxz8320gex4v1pw2z2d6byvaq00rlsuq64bngd8im9211i0c7o7ujngn9f5j5q6i3ewwn61fddodalk43nbk1v5sc9zwk69skkwp4c2n466md0qmuqob52h14uh5pm28k0xhxpmi303itjh7r0quqnkm2vl9ufc9xgop5pvq6hpgwpj6jzrurygqc63wt34n20lsg957c4cxhry55w71d2w4sdfqh8xmbsqrk9mzyewjabo5cb06lxywumh0vppiviyz72i9llz1qq8garoq3ro7tztkgkrnn8zo2bgcsidtisygzzc77oilfc33o2fa70ro28f8258emt6c8yva40xrxcvd14goln1xdl6dfle9pde71lf244ii77doitsytmnacddulsacsqtvtoy9ep2jz3pnu045wxm1tbasm26oyvmuwcbvm9w8ub7ge9xvh5v0p47iu9jc68b7vfkqq0t6fp5bf18ghzs7kmtkbx3n15f32gib4wu263mtufemzcmt3m3iz4idewx23by2tedmdfzlp9yh8rl2huf6yn6nf28do165k4g91tnbeclayv1kdcqmiq064810kcfnpj7sguqrckxiyy949p198b3nrlg5n51fu3n0ahjkw093j432scu985teyrg0rryv9jfkypfe5y0u5u5xsm52mzu08uvg6p8lfucxo0kt7dtdf7x3owyxrl76luu1hw8bw36x2492kq0urf2zisabtojz1r3p5f19vopryvmnkbnyrjl0zhetayw906ex7dnqrbiu7b93yeikyzlflujbbooo6qrhtd80r19y2ss18ye19oc0hvsu9ycpme9s9rxhhxw3pjpff9al8g0zlwny8rj8tyhc2qogmj4dvsum8hufve6qw1h5pb6mgb3bxg2jk0fkqt2u2n8dtog8l8f28hq84wvlktqg9rpyz3ty04qgqwmhpquooub25clrjxqcp342tzogfcbynurr0a9zbdj50jig0u39yencxwk5jjnsk4diaw07zhszlclkq5j43kvw9tjpgn1arjyo84kboi790fv7dzpomc3z4tq90k7q09exadmvgiry5wkrxeins3a2xlw29dkz5rdk7swf9drrfu0tsdtrv0pdfvx3wyrfslwpr01ejljsyucktk46bh4dvcth9mohdeoxu3w5464sghh83gubexp7qwp67r8vyh8af9kr7ovbqv82cmsxiwrv6noj7wuicf1ns54mpkhsec10ty79ymplw2jnaoh0d94qbckhzb5jrqjqyit6l68itcp14nj33w1ki7954zirbs1dxjjgg4mhmhctn99f2th5754bfrsjuwppk8l7cdd73lf4kmej0hfdcb5n0qdxx68tt7ngle1p03k53rdsv2smnouxbob4pvx96xwn7a599e7w86gwwsknqomu6ayxp61dthab1n93wt9r288n0yy53ww5ave93c9zsrfe874nqw4ef5nei10fzri5pawvvb591kjyvdo6vtwa2oc1fdkhtmy51fwa8cejt5osyeapviikg5ahoxkd6v1gxe0d5ak527xi3ka8phc4igouccx544wkcou2yryfpdv2rd6br70jd8ojyfdpdeuk7x1st44uik22mlijzw32rno0u7vker2hzyjlixdy9lznz7qyzbsnudc8zneet9jd343c7ov9qdn5ktqlxw2h0do1rma3u92c90kd85pc41mng1a48f0iuil4l9q5ajets5avaebjvvoncidv98u0xf2f6ys6uffvudegi55l44f7d6h7n7kr7ds5n9ueth4gcmgdzuohqhdf6hhnngtai79eyr6e8oa5p5xd7otixgi9rqfhpeuixkxfttb1ozyflt08u17hjgfic9v4zy2bb01lrtxjt3paxqnj2xncbd24x0c3jcza5t6ynr6a63e9sl618w4klh9vkvr3896gfbula9i21arkblrlg1f0c168h3e7quf2bfv7i2zy3el5kg7b2p7awlxz8iins',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 5453833354,
                expiredRefreshToken: 6797882340,
                isRevoked: false,
                isMaster: true,
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
                id: '404d2cf0-0044-4be1-b316-7b4ff5fe41fb',
                grantType: 'CLIENT_CREDENTIALS',
                name: null,
                secret: 'vdtn2ywnqllo64h6low48ncebm595cgckdfxlidi94ae2f9pk35yl0z10rj6rn0af1l00wmjpx7fyck5gstq3wydpm',
                authUrl: 'k1iuv2kqlsykxuu6dm9k1a9yd3vxevgbb978pdx7m9mld4vmbf3ny3d2xf6utxsgvt68tdqrgtolohc8v7tpc1bjfjcwslq58336gmr3shyxz4ew0tza03bmxms5x5v1bxcn8w38g4z9107ptvobvjdazj71miy4vimlmmuvhoc7l5ldx3nqkiayt7eh19coq2qdhhqod3sd4voopen4srp27glddc609ijcorlgh3ug36r6r3knoz7pqtyouo6eolpor1vlx28t61g440x4eevlp8dz1czcqbz568f1fisixrbajh87gfuop2ud4jli2lac4nmf67ecttkdzh8e68f5jtokxrm58bte0dc4x3q8apw1023s2d9b5xgxo6kmelya8zylc2kg5t8dac4k7lapcydc7mki5zebspgebz20plps2srs4fp28v6k8oktqa2wvvcjp7b9treot0kw3ovk4xkpf5s9fn2ooaqk5lo5lt2d0fopn83mhhrqdupbsb4t60mts5p3hzdreri55i3rmkge6eehurcni9uy7gx80nnmfgjbhsnainuuwzk7k6dykwvo7rcafiywnr1stkgpn8byzjpubmuu4nczedwkljq346pbfh6qayeb0vhx7de8ajjg2p16r6hfja55mondzjx0s2laz0crb8h3kh4qkurcos5hpvykqxf25cozkehj37e70wajpxvgc8drueb1xasdlxcfmxz3uqmalqxtpms9nc4cez1yv04pyrxowlr1hw2hsnfpcy82d523xp8tntiitrxwifzc7x9wbcidqpy8vitcozgkeb6oy11c3ax1xfjb2svlwe1gquxsc9cr5h4m8s128xjaswh5budvirbq35qlapes4bi3jmlz99c9v09sxrus258g7elzr4bflbdfjuu43u81eee6fr49u4w7j7y8mq69yn6k7fi6cndtd2lhc39htelnqe66x1eqzpdiftaqr09w3lskao10ipk38et1vb4c8zaxkg2xzr60fplw5jeljmjw0hz46mliukspzk9usj6bf881a2ysa1vbzmvxgjxc2vciw7ije0vt57yjjef48ff4avurk0c86zb6a6uizw8jtl433sswtyocn2vbrhrttl3mnrs5uf8e1hlfimh5n61c896ik291a0k8hnrel26ou16fmazhees9ou48o38v5idrnubr8mz5omdcxlc5jp39uzpy31oopwrnt8qpt7mrmes6qj9yw0cm645ln2eln4ys9t7eeoh2jqj5kprfe1elo4srjvvlczs3myi08zbukh226wgdk5yvbjm0y0s8lh4xfdnlhzh4k78w13w2bknxle1b7vmxgww6d3lbo90br14v7nzbade677petw5abay835ft2lh4j181g2qz4e2pyusvjxw9bpddumueekvuu4g6v7zluern2sgqdjwvp0oo3zim3xi1e8de0xqe1z5j02agsb7tt8jjz1131zx67tlmo8lnj5z6xfvwk4vypkq7alz4ycp72ypq62yjsa98duw3z8kywx2rtkd6pene3iqmszve5ido142gmxweg4z2nlaz9d24vyuewmftepix6srub2dk2igh751hheyjxd4jcdja8usx1ldty1z6hvdlrjuz9tozk9pavswm9ml54g6ip2punk7r5ew8j6eyjhi74cbvednkkpukxrng8lqionbw9b9b5rnrt02vjwrw7byi9vg1fkzmb7rwkvmm4l733wb31q5wbolbyqubquk72iw4iqu0tvoiq4jnf1moza05l7vtr5uaay5b9di1zqn89hi42gliuwqqw7ahxrxxt5jxxth9n5bob7cew8lhdspy986shfjrreoav2uczbe4fp47ubg00rq6ax2eenml5vkzttvuz6sxkh0mmej8r2gr6mx2zvi5t6wpr2omir1o3uvnkbqtcs25h56vepaywpsu9qxq26z5gg16z200zo85u7mlp3om2e1nblf6s5ff5xhbea4dokccct2db2bbnn9m',
                redirect: '1je4bh1wdzfpizr81hfz7m1f1epcmku9a54zya1i71f8jrsqwc9t7yovxcrcany8j20odya3lnmbcha71wfj7kr691prz2zakpq41bcxltv2vs3hk5ysf5y9xcu8fgh9ggfsckaj13z2288y991e3qkq5wned99q0gmp4cb9hno7iipkkuf5v71wimxk9xjfr08u7xi5cxcpf6ocj7o7cyuek16h9s55c74dxma8nrws86vqeqm6vac5lh0z09k14vig24mze0az1qupghy7szex26pkpdikonai9ofwlflfk9taz6s4h1rvy3il895puam2t75vmaqgtgsnonsk8ktc4edq24zawa2u2hakblv6el77zdtfi9k03w2txjfs5ec1jrz28zsxrm62h5lll73cdrxa2rcmgypnxmeb4zoaujbghg7wyw5ok8ftoajr8bwimb8nlnuqwvmxrdyegm0pbjbdbk14wt2bsxo1iqknlowe184a7a2ernmq4lg6txi8siukt1nbqlg1lwcekysbp3s89ke2qq5549nz6qn11wm3of4tx2ji7yar26ntdxhnhyvsxmm7x3bkj1qtg2djpy7p15k1j33hm1cu0yp52k29rc0m9snxjadijdmzu9127eyv48ahxvq3v7afuyy44gca293ha81ju4a1x3i5xekoamh56ji09rmbfqbnpuaw0s004iknphidn8hw7qvxns45ehk6k3w6sp8ogootnjgt87xsqo4q0y6wwcpac2qoztmq8a7mko40jgs5y3cp2fvnjksj51kl0ybjh8gblukqj4nuaj345n2qvnp3zin0plzcy9jkny4l6danv3x2m2hbctx5a2alrhcmhofaurbmbnfwgn52vp4xx0zqxqn49isvjktyn2g5fbbjss9bnw3pohck6y65kgdghl8hwnvzs5bft6qp4sw3j3jnz9f6ccg1pfof88d5a59mo6yg01hz6rgrst8cx9uwidxkqx4g5q4w00a7z39ljwbgbg6xsfc13u0h97d52cl7rq7xonnjdudhwmbkqp33s6qxpd52nz87au5w5rkyu4wcsi82dk2mfuprq6bi2ehobqc8id3sr441or2s4uquq884aa96qdc8n67njga2539vsqg6eijakevsh81map9md75it5lw4j5i27seyttm6chj7moedfz2vs6b9n4t5q5cuqaqa9r51bdr1ckfa6irvayfq3fm89v7wh3pypj2ghq0264h2022fyo0n5umv1zt9axzajv79aj9wya0zcrua4zw448hxborntm5meru9t01g6znz02afhtdnfxb6cl9l20v75pwizsjsovc77kb4abboqc24jkmn2a9qnxibozo2xmkr5w6o6t5juy8afpaj822q2j14rr5vjae5coisu0fbs0avgyjdq4ab9kkipj4t1up8b6hy08bnn1m3k3losegy16ojheci2x4oqkj5od0keoffhaq2zr5jrfac8dvn9pczng9b969ofaprz3n3z5l3t5tju7857zlpw2saacs79pa4tnspau95nueghmd8wf7hgkkl4tk92a3i42mepsikce8pase00s7o1g312a398x2rlgw9rcrs5jlrb0n5obqvl9jv63gwxy8gqr1ffr5xcczcu2bx1mv5cuix7hx8vhxn518n4gf9uxwu21xi6ydtq5r23t8bnbmzzn8uy4x542it3q53yzcaa9mpnj6ekxrlqeg5rzgfz4ybw9v97pqyfs0ydnttlbngpzpcd8qigjt8tyd0cgkt3qv1iowi6vvlew8lftu3mznono524kzesfl60ftpw1tqlnbgusuj4sqh2z3kaey5kfa2e2sdm6mm9biapz2xmym3pfeg2fqoeishl93esnje83e17l392m8cs51o7ai0dmc7y5fl4dn4tfwz5tknqaihl30tz1dl6h3aj57p5y704qa8pdin79yomq5hx2mynd076t226h609u2z0ufk5snc03q3qbg5lbjlx0d8ttio0hg',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 3868916202,
                expiredRefreshToken: 8684752051,
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
                id: '404d2cf0-0044-4be1-b316-7b4ff5fe41fb',
                grantType: 'AUTHORIZATION_CODE',
                
                secret: 'a1q492nli9yswxvgavo4wowge0ulczm5gs4vj5xh4me6fmtdxmap4i4ozh13zuy1yl4493smvz7fk837q4myi9f59m',
                authUrl: '8u882hz9i0v6b5k3z5vcos9rhhvbdjbhzwpzibdkl516743v3fgzqo35hkk8nzbhcefp3n39adhme3egjz453gd8ocogvh2f2m8908oci5trx0n9vb27n2j0owy8sb13o63lo5lxn2c2yc4hkzs2zjxytffvti69apacx82i79lww8mdvk97m05o643xp975kimpa21e4ommp6ffkcrleb9xto35fkdsx36g7yjgy8ohyvme8h2n9i962zcu72op64is3hrw3mt94m2htvh35kx1dinzvjkumofp9s3girijn9dpx8cyai08223dscbcaug0t9c32cacnzfuh8rqbt02yf9mnkiexpeyzcwdojeib7skapik1su2dx2plyhyaj9sfwtjhygdmeiu5a24c9z6xhp42rk3z5qaf40qr3t0adnd7f5asbyhxcakzfaabh2onvn8jfo9yzprqxbk843wf4ib4zp0la968jzf9590783vq6dnzpg92mj8lxx7sepflatkjcgv3139mpl028wx8kejh3a9j2o7n5ygcvvakq4yd7dlmaws298pdvttfsu58c5mv4gugdo5eot7xr1y56ma5r9nssczc12z3j2ho1c5zft63omdde848tch64vc3amlo20wqjriutmfu7p3ergx2200nuodxo1yv3oavduzmas1mxx1ugbo6n13sdse10potissyc15ok6hycuqq2w98yf8qfr2tnizw60j0ce07qzil1hehofvsmquaf87g4jsw2xda0cri4p6mq87tdzbdnrievssxfa34h252iugkb9jkqroedvrnpcbw9bmuf96s1qrnirwo3i7qyjqaada89x3wq6dplz3ya4vx2bo3nccbqxht47ezb5iyvog1tscqhm472jpou3q2esnd8tzjczw16jzu6p1q8ep4zq2tn7q2zfvh7vnuuyca7ggmlpqazoaz1kin58yb5jhhm0frq48qviin6ppgslwwdkb8x8fafr62jc5wi17zhyth3v3aj9afdrsmt87hfwl9mxpkyoasuylk2n55aw0adaywk3pmf9xn2hjhfegextdemz8jkf69864144w1m6236ldkl310bojbavz7yakbrc155x7qicxmu70mwgxp8xfm7dvcqwtupin19o8j52xmbzrjp9v44hxxdrajacsephwvlra6w9yvdnbq75alp2j2fsdemyniayvqioywv7anyap74ebktj3gbix9hff9cxvv2zimakx0xw2sagmg0gmcds72l5gc58e2ymhunyk2msknrcjtqs41yskrle6vu8byfozmr2ctdyyvshu641p1c826xe2bjn6beri9ba8umgna0ch8zialcadukcyqs86rye6p4en34bivq7sqgjw3qmgcbk5m2hwdm91eyoi2iww0783dagoeolf73pngnwgrplqsep4r63sarr3k0kxaj7f57y29bi8b7qu5z73hsey5pqyh1mbvk8ujnsfmms4yxru51ej8i3e3e2vgaa314puydywnv7k89f3uruzwbjfb5civatpfb55wvmibtgzxmgaaaw5svk04xhl5i16o4m2nfh29441zfp8fknn6caohlist8dsrajgtubnrefjanrhoih3v4kisuj45zogmc64hey9zo64m8yh29qjm5xx5iw795z4c1a0b0qbi6u0b4pay6lawam1i6m9lm1r97mlxga6w858l05ocy1qdszdi1rbhc8ae7bg5631j7lhe8e8kamvekep65uptw2cqevol8eqnda6i43m4s0p0iqsxkeyg6i2pa7eqzb8i0ngygkxuw3oib85loc6z0hyxilbfhctkrixr67jbxm6gfbakv00ujg0zkn0lalgs3wd9ba7z4j4j5o5l4qizjq7c7e6ky549ret7ed7w1djn84w06qge34lm05kqzjm57ceie1xh2nzkg7b2n3d8a8h2ss5goc0p8wjqw7mlvp8wiux1o8h386z0ahnp940et5al0fq4oj555wphgml',
                redirect: 'zfbqn4rezczpdcs4zvarqgrql87wa1ep86l08r1tzfkaiay23jcnyk4ygxwwck2u8pnejuqe272hl13f24qjelnssugum3isfl9oyg0envn1ad2niiruj4stahymd7hy370flxeqitxj65d92n3tre7ve9gwk8spmrbwi0rjf9sqge8jm7jqpv3bqh1rkew3vh9l5mbnkh8m3o0we76e9naftuh82ymjr5gwkt2nrh41ru2yi1c4wgqio2k639uyoxenqylopcsfybhr6xcbsw43clac9ep9mqqtvpp2mpeclcwp0valx9goz9vajhe8qpnk669hyi3a1861jydhqjfnzw9vbrzahfk9p5bh86jrcr5ucy519ay5uk8olkoehjb1reebewh15at4gt88wlro2z6kayrxiyhp3e7nc3dpbrybn6lgqd1bmlxfh5j7c35jhqoz8s2jw8q88pko5z0evgy97nl3rrne9c284crzwwiowt99ef3sn6pu6rbm8637hyqzd6ryxcmcoc0rmqwa6pu27vke0pgy6x2gjp9qi5iw8qdfyjm97qcc3zcnfb9ltrq9qgme45s7lj5wcd52qgfuplxn92w5du5t582gg2g3z7serlel6ascof5x2s9tlfxxxsjj808cudnxor502u0pdspaikxvdvd97ruch915iqlc8afx12a36dtsqhurb8vtx8fcaoc6nuioffvdrxwvvh4hrcltoraak6riv4uue23b1u31neb8gf3er6k2d7ucs0dtjiuauxfxv6te6fy3p6hj5tjgkkt5h27g6eyfqxzk83xo3ipvk95g5sucvgc19e0x4lzmazrllum5c3uiuulc4mq3uyt83vkoxl9ll8240f6gnl6uj6vu1iremduzkn01xdnvw4gx977jksdv2od1gvqyr3xfmu2am38ljul65mt1gs8is76bonqnfl25ocstq8dpz3ljyujx9swv4us569j5yhd8uce12y59aljcoq1as26zkdteca2rj03uajjdww5wu31q8sx9tsmyn6bl9eeg7tmj4jhwu0kf4bdok44y0zbgzadhhe8s6yg77ghv8rg3oab6gj0v7pnh45ksiw7z0z1mdnctu2cngx8gt7t1z88jsj9bl71wyv0jjdhvlvn0zvgqnh1e4v6kjqky9nxv9l3lpxiylbkipg7vp7826ymfymbw7wvbouegzcycdkm4soo4x9rtqzdwxzls4919t4ksllphanh0zvqki8ritsxbyf0dv7dejrwe4uv42vnmgnn877ohp38lnvc4p01yvw9lfsy2ho2zihmc27334iy12dunvz3bfv2oce9u59turb32q4o6js9u1ivzoj6be21hxe4rv0jyyw4rbnswskvqzr56m5vecuzmczq97mxxzq5q2tawhcbf4rqamrcvic1k7m7t099l01q3xbdxi7i3909b8jg7r0ry2dkykshcb7a00oezzaos8r2dvy5tyzyv22kfvigzfaximgy0egcc3piwjitnk25ajdlluljlh0qqdux7iivz13mwee8x7ywgmcivlt5ov7jdvn8pwwfgnphvspiy79pmkqxmqiu2s9kzij6uzf9hm0u0e4wez9p3p2b8in3m5a1e048i63hp1yaz6m251ge0qyduq7jj17uiw6lkjuaioj9424lij8ikar4x6epfg7j76fhk7euttl8ayjry5pgy3oxim6wqq4ury2qcvak164yzvju1fvu5hs8p0q90mp918eqiyr5v61siqwpw7bqbbw0bktyjwumb5bl0gxnb8q3k4stt8y61rn1u6m8xn83zwlxuhkyrfb1xs1u3omncdt119qljbha0vxxtwhysjluplrwskwj2x5f8le1114cnfbkhatqbhgvr2b783m8e3v29saopyxpx34hi571kb7wtf9q1ac63v8psfium11iwfnzyibinh7car0ek4cs4q57n9fwat8vd5rumax1esh0m2wzwrm1ea5e8c89dk36necswhth9kev0',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 3361965160,
                expiredRefreshToken: 1153638192,
                isRevoked: false,
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
                id: '404d2cf0-0044-4be1-b316-7b4ff5fe41fb',
                grantType: 'PASSWORD_GRANT',
                name: 'wu9ukvw3n9ljvedm4hgawcddla9srh060jl4j58mj26kkzh8uf58updj0olecoca5l23nxq6yeplcub247y0o08momxp5b9vou21rk0j53l58fvyp1wl47hb7z48ozzufmmctg61iecwkv0ufmu8xwkqrlc87j5uhd02u2fmw8im2m5z0a2bsa79es71xzo46hbq04rpemoq1ybub982g7cwbyhboqnoa10umjtx0unbhefu9jyh130qz3ay5oe',
                secret: null,
                authUrl: 'paezngz5yvdj146eljq4td2v3xllzejf5hxbdctrqjfg6o4q9026k89dd63au47decbtujqq3a05ssrchuz038v7ru3z7iv2xkm9xilgyo93umom1owscb60imn6uegp4n6jhre3imhm14jlue8hw08gcnmufcdefpagto998blepbcj26lhbim8lgtqmykll4n6xbxga0ai8qqprl6108n5kwsuw0zus89waipq9p7dp5b7qis3wcv0ds5g86qiv65vdoqg2qkdpt2yf86v187vq1m6ler3aju32jti1yqhtty344ppjrhvlj2qvhs8vikwhdr2a0ctk3yfz6q786brkoe6tzr00t3g3j49oxqgfu4242pbbopm6if8dv2dksv4mb3uj0hkyp88z8jkydjb0zobq43gnp6q1zyn0l3pb82zgm12fe290osxnjiv5rhxctshbsxkbn52l860rizuym0yfix7woh3w6qnvnggcciyhveutos156v7xwna2xa2336heylfrmgjouo37nzljjz16i8yivm0fnuqgzgmucsygc36v5fr0jl4c5sufnv7b1zed2g2u1xk79r3eh9qb1tkye4fy2eiwoqqpj1rg88s3fi4kpctunix5wiz8ke511xxu3l2lh0wb43isvef0u319phc1fganmceirg2vaeyhnpqakn5fyw41bus5ne73be4zikastlm5mntw8l4ib0vfbv8ze0tikb6ydj4kc3mdk3jzkyusgcjk9ktllnn7091he9dvpg8rdg36yslw7067qc1kb15dd6eg9gh9z3d6bktjyk49m9288okrzk8ge7xw6ej9fvwfw89qlkzavjg8roaueq9r28e34rkpj9gv0bxvln8i56q0gzo1b1y1u4l456liks807aseoo59typlgsxukucn2cblyvd3oei5gxsf3x802wlx4hdxlmrwjpakfci2f1inwokljzdzc5jcjpkqc32ln6s9s41t93wtx328v814sjf9bw0zf52o4nywmajl94949htba2xda2gqk6kgow5mz9nkzxaq032sl1nd5r9tify4fa19ncn8sqkv5d0byuzmrz9fgv0rdnwsqsx33gdxw3njnn3jvdtpbm1yb0bohewux8c6pzr9jpzxz1yzh9fg8fksz4kfdjbfjlbbi7m2dig6n6gkmje31nhavdpzl2i6tn1et14baor7d1ofqsbp4uwj367dru2xmtodn4u4jtl3edhzcaa5p5fobqr3f9b1txqch5sk51nvy5ckznaohcsthchfam0geiozw28msff2xy53m0qt2z45s5m94elzucoaczmu1dxbj9i5p4rg21wuw5i7r0k1c4ef8e5xh0q0qskgcyrfpyvacbq5b2hncczknabn5s0zq1tz3ogpwynbqh7a7bw8hn6d2gehtqmj56alacbc2bck7ftvjifnq4lt5qbcc3vpl6kn92yll6ozb3modysa45m5iqumu6efclrdgzpnfx2iqb9vr7pevl6213ke05n9tfxpsytmhsttg1bai9yculwj0qcb5rlc00auw2rwxc46lwzbevrwncry736r5g2e405csqisazekn61umdmlhq00enjpojnza0c1x1pmwoy33cs7mbsrj5ide78a9k5vrq6e611h7rvfy7afoi9m53gdg0f9dd6inkzsuj3lfpwqlkm3ifef46dqnnf71gc3qianfixfzeec4pxfjswjqmuddr5tzhw1abo057p91zdgevkv3zkkrkcj1vlxv54wiuk3hubvd893g4aji1vh7asjigmxoeapzxixsscwdswteb2vsa2cw0h5oo0qmqlcm1ulenr96fhpnqh8wxsst5qnjr5vqlm95sety3pa8c0tum6j3vi5a6tliwsrccb5fsxmb9jsugt9p9ual7nlgaowiqrbck6epezrjskiy4qeguc8dfol2ayo78mcg8c610y81536i595rkbd49frxvnewgoysdik5dgnby9wnth7d3rcaywmpjk',
                redirect: 's9e0kv0n9lvw13f0ayd8a4y6lk3kwln088drr2i9j32lpm2nwzrv8xf7hbn5t6hddgjlj3tqk79li6lfe1eucnc7r7qnkqd5ergvkl3j48siz6i1i807rfaxycl8wqqxdrby1roi0e0fjmg0y5vp9foaurvo3g9rmzlwx03rgsz43ef8pnxw7ugvwvfyzj4uom3fmo1x3lwv1uv58163yn80bxj082mm3ovfwmh9km1j1v7w12ybvuopuxzti7dlif74e63bh3beb1kuf7vlp4gse6eu8t204q75enlvi9bruzeini5mxgrk8yl782g5blc0we1ddpsfi4qylxv77g8tgt8qdsic8zcxbj8iz9omwm44j73v49pgm7wtz61uhrqq8usgxg4emio9d5t43jmwbddy18p5y8lyo1k5833d14tcwzvvxdcistb6co1xdltk36877crnbsqd2x3yunfxkugcb1wz599ugn3rkncmnijqvbzr228zuxa4frwk8g3kbssbt41a5xo7wntyowg2m090taw5ysmbo6zhjq5u1wyecu5k9needibo7fzov3tawfgcxdztgdceh6hslnxo6w640ir3836wo04pie0fqnfjr57wnsz9891hs87btqz111a49dvgmnjqonmei9roniwbqhgie6rfvat1as1rs8tj162a8psjf37719dorqqatrizg1qgsk2bo22p7oqnfp1izmlu1jfa5icmcwby8ex146l82sl4joa953xapyow6ev4h4n9rf3d7gfsfgn6aknzhzt8if65kwu447cdmffpnwvrd5a71di5lrd95bfvdfx7l4x2no1rlkhzmh44zh4f2efcwxfoilfz2cwe76mvk6lvn34jm9npuki5ejyxkpxor6s0rlb2axgjqmwbu95p42x1yczowm8pwo7tsbbemvjil6ag7775lhl38uczr8jpqls1nwhl67lggd6fj3aj5gilxfcja08lg4rfdr9wxtakl2evxdc9eocvknqy3akmkdlqf88ffycnb6gwvjt8jcv54dfdo2y8en8cu2r7xn10kz41k19hdb1iozkr5tm5vji3b1cbl0eth1zc3twuvyc5giydrq865ymjfkd6hugy54dgtpnpm6s23exmx9j1u8zuod570mruzw84q1gbmllou8i9puwlc0hbfl3mdxhiji31kd6f6som79htgpkuvzeocdha2g5yb31rg1x24l2l9cqaklykoougjzllnvbd36bbtq2ugegkozk3crdp1zlvh26u6vzron5d11is352smh28hrso2k93kegtlmde3ds0s3q9ua6fderarpb8eu3ydhfl4gejmcaj3txace6duepdkea381i9rj07hbu4hhzr818a0bg5gbadckwuo4gophno7brlsjjpozwttsuw4vk5z84lz9xjfy81pkzhv87qhca2omu092prcj05r8kh98ju05j1gp36pntb39jnx0rjowaithh7k0hamv54nj7q08mc3lepk5kallxdques21n4cmp17f6xd6s2x0wv16l4607feuk50udd0kipq788h7bkvwprxja8hrb32wqrzij2mwbqx6t3rkey1watemy5oc4aku1s53v3khrjou26cxqfsr0isaevgh9z36slkjzj15vxx27u0pj0gdfh4nkgm4z0fbxjk6yupcjdjxx9zyqg6x9rrmxf5khd2ipre5z8aectavpkkmpt98joqcre8qxyhoyf57uj1zow9hpvjv3ytx3x8t9advl7q7po6wueenazww2hqc037vajjjzzyjmaaz4qm0cogfkj4uvncu9lo5gyhq7in7p0yhgf8wy13hiyiqt4n29cmhfg3h42d4sjtmfwudoer8s7etmiawhxzfkrpmcyff7n1zo463p5ysjgb6tbqm6ua7bfby8409t3kqxiqj9iy16n66xt2c1zos81j0drngor47wu9lx03kusuh1oy9do81ad5r1kp7aqc7vssvxuwar0egc2k5sn3l21',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 7715115355,
                expiredRefreshToken: 7764913641,
                isRevoked: true,
                isMaster: true,
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
                id: '404d2cf0-0044-4be1-b316-7b4ff5fe41fb',
                grantType: 'PASSWORD_GRANT',
                name: 'bwv6jtoq25km26pq6o9cfvrjz55npc99a3fqb8bw2o59imkc007p1aql07qikixh4hjzvnpejgau5zz29h37fwfztn6q3626ezuodf377xfhsuo7l2uq0d58uueb6144pq1qai5l9j9wg6boaxnjbwr9crcwjih6b20uj0e29y9qxstk13eqknzhscgsk8pd6zz2ryus3m8iveu2xgu62ayw584wjgy119bm5xsfgjb4f4xia2xya13b3nqb9fz',
                
                authUrl: 'ej8kcipd6kbfmby1io7685d5bnwqu6i50fpoyo9q0ctynqv4lsuv4kksbv8skfcqzrbu1mb4p9pc2bymcqnazkbem6x2ggzlqzdxfvugtn9jqtj0d2klx06pu22m4bl1kkjhnlp0x1thu26lluwqesynbot5rorl6uxw9wc0tdj08uewmmbrjpt5a47er93s8x8trrrzfmze8kcpm53pb06su8a39c3jw5o43gt6ottcqelhyn44wydy26a9huax3kuzwfqudmj7cxbcuqvohkfczrr5ywfgl0lubrwymcan1jgiyi0rt5ws3pm5k2hyw6monxqmdefuoqbmluk173808t7g2qeshz3kklynlrijm5559xuqmns75q2yj9qjw6b07fdz5ejwspfmzkzzn3q03c67gi7zm63dwgfq2i5ifj7lw3zn4pjb40pn7a4tqrhbr0pf1ja7q8mofth31pk7h8gvu9npin0ahredkqdoybmqxdt8bu18403lnof153dg8rlwlwk39gi8iun8o89k3klmt5w1h7q47326j9beoj5zgy2ypgzp7u99j7o866if17fv0stzdsxe9wbvtm1mft9yzz0o5mqgtvpme19pfo3qsy0ij8g6tkjpxuxdilcs8rtilisfmt2tvstfi7usicuioaoq9im0h64h4rwvbfm60kaf8zz0loe69zpo89oamhgheoy7uf1bs640g67zmbx90w7pscw2sdg3hwt5tao7gtqyw49t692ibe0xxlfosd2hod2jkmle0ea1wgwoxcm91k8461gpoeybpifi26l611z2hzbrf00fzz1dw1id87ip2pzok7tf6txocx5497ds3hhigy94b337ddke9h0ssrv6bxug4xkbajx8508m812tfo7n3tk9imn5gjnfk4dns54p474mu4d8ucmgicxe4sqqct6hqcp86s5m7oq327fer1203nzwmq43fevyg7et4sjq35hm5rkydrmn1prvp8qrw2ht7t1xqn2arpr9nv78aw7ep619yh1jgs3snreay64pnztz28eoyxwhxzq9o7c67qd0n5n9vj5zjyrnmdm6e9230nhl33i83o17j2p4kknvkzfjzb7if9mrt9mec2ukkq3smf1hs3yqbj4wknu2bp0k8flcrn5uvbqdlzjvi4mymod5r6mgexl7i9y8162wixrx289netg7w2n74polpkxm6gnro3a12o8mcf6xgmgt3do3i18tlp5wh7j4ie7k4t99wzxg4w4m8u7y8fw53b6hyr3s5ebxkjo12c11n0qv3o5k9c06gqzu0ckn23t18vsxs7ijlzn766496ob2zq08ldv76lfm9d4l5db1qb8s8smmxviz18zcfdcenmbba97gkpf0j052u890cxmk5ep3cu4qiztlvumowxdtl0n8a0nakfekx1o35f26kvmaiip2i1niiiu4qg5xcb7043fdxyejadb501a7amgrpj5kluygq21jo989c08x15jl8m12pszu9mfc7f23pf8zepz0w91h4klzirsnt1039zvpgcbvlengiljjfnz0msniw5wlc490mc40mkobpxguhmtouio3onz0dfhmx84abgoi0qgqhmsbwzm0mf7j1tw1u5vj6oz9vw83zgq47vi7ppkzmiyj30rcszeidv0bb3ave818w0ajk6i15xu1667wd8l109mgyeg29rdjqm2n3v5zhrp67z2umq6vrypms5pxe37eagzvttue2ev2ud3azii1wmgcllcykuvnpclmm0cwxumly0kx0trrob3abodsrtlupa158xf0gncbgm1zfw8gwgj39nzbpkyjmm1kp6hfpvno6q3amcp7gz1twp1ga1w4wgwplxv8y4oc9f926boadh29iky31y2yuig0qcxrkbrq3cl1i85u1lk1c2p6i0lhl1egb1g1dglun75cx2rxpt67wnk63mieqsqovvm5iso3pfv6kyujogy3n2u43rqr03mgb5vl2718moc4n4p2o62v7udy',
                redirect: 'mi2g64n30cwx5qlkjjk8ziaxyvwpjq7f4c7eguqey2fi8m1vll0qzbis4ks2bvifxhpnliru5zeyla88zt8anjdoudoghzwvpxwye65gsc7pq3i4vq9txra0ltdxulh6frfank04osi1yyc1vl3p5igspdjkhp7zxed5c4onu05jchykxg8j8ipuw2fmojfl337gpv027m60yp4rb0alhd3ngrew0ojnbqxoi6q69zoouynqdcwoclf1sv3pfqdbhvjwsqfojii4e95oeil4ioioh2ro9ldizp178osteqdw1u5hrec2s9720a0a1v8j5xn98w7llqmprdwjfbc1vvnw6a4gt6upzidlze4yb2z0wltzm7lf2uh8wuecnkec6y5qlk68kku669fpihrte85o3vfmpvz9kzh8qe7svqar92sylmglqbx2bfc8flyf8e07gmekhte2mif1asvgpavvs4w3bagk5prswjd2ejs285wjdmmmkvxtu46tq27f2jpkacmeoel8hhq1ehs95s0tjjpdkyjpu2iyps4t5j9gae4fsc94hqyi7i8p4o9lum2gykei4mxq48qujv1a5c0hq82finfe2o5hjc00ogc1fckw8g1xd1cya7vm36tunmy1k4je07rt0e7ehm1x2k3xmf2f8e1431m8r1r5sd6renn4nuzdlopgij7g1gsrz081j6euji36znddh9pzcog2l91ribrh33qonqv6xl1nyugnep6u79dmozqc47uu6v5md8r6oh9rml4yu1gqyzp2t1n3ucl8amthss2o1s5d1ofuelx6pg17muijj6afo1ytm4a5gv2ldhxbh8ppespwjmrz3f3b7z1mu0eflpwm4uei9klwaez2q6lxnc35dluzc858mvmdb37zpplfx52kotahh0yzxjos0y95iqj4rnxyy7sse0qudtazpoqa3h779quol4alf1aftp0m515i6kjhsyqy0k3wyjo9vddegvf4rmfzv0nhos1kvxrp5jr0smhpx2y71oy868spmr8iys897al56gcsk0gvjf4dky0012ugh8sosyaa0x1wlwo62v7ew0y6eelgiff88kq91wqne9esoquywgq2z54j6gony1o5rpfmknt1a087w0xgv8kw7luz6idvpe2c1ujh6sgiw27g83ogylctj1aukr7d55qnx729h6k0lscrwghhgvprzmp4fr9k6lbh5omqh418o6g10f3fa59bcisy6jnhmgw45k25ijzefq2me6hc2gi2qttgjg6qbwec0gkghs46w9scshhue8ig1ga0p9tzbsfbpkg63nw9afomcgpddyab71463d5rgbyvbugr3teu7snam9w7anjsq43eril14cd7e2ikoczz69z22ewlzya63vypk2pxlhjtbz7bwqtjcx9tzit0ino0q2yptpeybi1yn2vkz4geyy7iyt3e2cnhdlfzljx1ofdz3z3efxmjqei8atz8cye0lv4t25k7m5izs9uaxgpwpkp5saz09rz3ykmh25mr3ljen1tq0tn056wqdp4q96p8ig93cxxmzpyyc57a26wqizrorihh6stqq5p54a28k262ofxkidwatrboh1m2jgasc1zg9p8tec0av1p7s9bz1regu7w1lr0dq8lmk48klini9vp74wttv5jeso8i6jgb96veqyvjwfj4y62bvqz4lnahkdxe6u8p5io01a6x615jn4hxewjgfyexm0az1dj6eay1ri35mojj855gpzlicokaibj3mjgqxyk82m9nt0mxct2wcrdkvebaoh27o0i7mjf066hh9h2pcxk15uaxjcxic9kupcft2n0lh8w9vr6nrc51e4y8fu74lsabn3v4bq1xrcc3temnlc554gflkch5senrrazr5dplxb8ilz310ewn17i7dgo8gzfiom51c5abzyaxzjhxv97pu2y4y8vzgyct6i8kkvmhol7fgm0wxn54lf9l1dcivpewcinbbk4qozbieor2wrw7qr3bh353',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 6676510055,
                expiredRefreshToken: 3286915043,
                isRevoked: false,
                isMaster: true,
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
                id: '404d2cf0-0044-4be1-b316-7b4ff5fe41fb',
                grantType: 'PASSWORD_GRANT',
                name: 'tn4i4sqzx4qrgr3inbgmr21ieyyka33y0j4t1f9wnkye5e2pt8day8r3enlxwd6fdw2ki2q3ti8c3wx2p1jx8sw3bp1sc13vb7i2c7hp7b8gk4q6fhtbkm4ga437f55rhu5o4zn7cix8dfq0ypmkkn3cyycsz9iri7uqwt9wsix80tfhe89ums1gzvr8mbl4vvfbc6eossnufcdk6q4ips9nfodhihbd0z9psgt0qyvyjgbj96pnjs71yv3qh74',
                secret: 'r3c0hdkc9foiuyx2pniw2u80mpckqgv34x5c9s482vy9mwufs9voms4as9in1nxronj3k9glky2zcjmsddhtlls71n',
                authUrl: 'os5cj6h1mrg87ql5zt09vuequlte1qdssn3zzoeidma8tsf8on59jlxrtpueogq09oamak2h9edzk3vicuvi5nccxl91cmcaoh9qxwzeamf4nweopv3w8oyphsnc3xvlhnpkfu0d3m2rzzxo1ap4ufo09fdbqkquad3d8f1lxncfixelw04fq2idfbuq1o8lstznjjbkw4ko0mdfqk031p05bqmbb6jscxbqk78ccisuelabf61i1jqe5fbod57rqul84s1k0k1uuqlbozlul4csgffjlpu3jxlklk31ga5ae2z8bup476rz3kn91uuumhycj87fxp8wsq77ofdtkhdt9kwewcf5m9q4glageg9n8cks8fhveg4nbryk9w2zy7cuetpx6q73foio13sbvm2s39loinoq0c9gv5is5c8m3vwpw644vmtpj75ib548e7m0kimh70cs5z7ovpdmvv2k5yur1n0kz4vqirfpr9s5cc36iu37np5mzdnd8ws65c2kbicrvhrq66l8nuics4k29zd9oxb3ymb6wp9snrrr1tno81oaybd3kcrue4jup6qpohwcdzmhgi882bsbxj6595powa4r113ej2e1syxv9kav31omv48hxo4u8r5ex7hlh3wkafx9o1hwikzwweeuf61exw10xvyibzuzqlvkfrdexhtkkesgscw6221dor0ztr3xmufhn5ubd19ilgbj21abf4k6hik183sfcl8m8joamf05gav9nf5adz8f5iqu011eodcsoxm26fq4h4ctflec5s8vtihbkuxlo4yaa01kdjpmka6weye3gxpcn668sy1d8incnw8qoqz5f8yejhvntsgf4jv2x8rdxyicxfgwl00563wpocnflz1jqycbg7mjlszzw4aul0f97r9cuzvsx98b4q3324bnfvxssj754zj0sqrsbnc7b87489q504vqccx8zmjvdy4fk84797ts64409jqeyyr33u9v398e7pz6yzthnbwof587kkaix260ybu9bi9u7rhnhdmteai7jr2usqm7sxm44mr2wy5w1tcmh0sbt1spc3y0fn38075it68el4kjjicry91bqswvmysm9e3doqdessiln561yj7n9zmv0fpw3bypl6y8un7vs9k1lhdl6ia8wwq7mn5qwtrbe8evr1e5v6c7yxqhqqm9m1rjcem4z02v0qs2k9pk6gmvfnfxofb9c81y8zqugxn5y7gxk0zzrtxc1fxfkxpwye2aa96n0d2mkwb5zf9wh5r0ssivwnwg3i4o97638yby1n10t4twxdbw69h8xp4fjuelb8peaggggvxzr1vwvf6yhnbvqo4s2w8gfbuzki5gro0qirjevezgp3q11dbppc9vmrvtlxb04wxwr8h5ubdfhbvedhvdgeemz7rlavedgumcnml3vbz0olxh3mwi75omu9t4b2osanvkgfs43agz5ugi0574viealc09pzaafcafz54oqybzbjzcoibn14756siktq2vcqdnmyxjiyvlfxacx9lmsizxccu7bnc84p5atet3osxtfx3wo0f7la9356n5gl4o9s8a7okeh3epxpcbqrit59os51n0fmny7tcs3g8hb266dw0c6109oktlojirrlg0fc1xbwdt3thhvxwn3vyxjclyzo28sbid6xkadp387rnhqvbpt3jgce6chfbierq5e9aou32yluenqprcsx2co1mkpe29hy8vkhijbc6gya4hhvaa7wwm6equ6yh1o6ufbh1cjmaxiode8zcimq0d1zpjgrx2hxd7vhglk6n8ziaar42vzqzf1o8rpkuiyfis68w4h2qgct9f29oja6b8h37u8di3p1jnhcx824cwpl5tn6dvolhu9a8ar3etejp4t2swr16nmou43cz95w55he63mlf0nz9kfw0s72oi3fpfs5zd2l738l55vz5rcj56hjwr8bkjnlmcl30efwylrec3xyln072v3trxcr5bjsgfbj4jvs73dikhugnjjp8e',
                redirect: 'lwrvn9dri42b9c4acop5gmops98bjfqfh7myhf01un83rkkxizfl1pjg2rkfjix1f77fjfg07f35qzanxxaeglomepszj76n8vpmoah5cayg5vazy965z5191t3fx8zp2md8jqaj4zkctjmo8hqn0pkb30kl0xine34z8p1pmz28bpa05rz0ayifg535s7id5eojdygqehehfhj69ats08obybc5j5dzfybqr625rcqkmfjpjt2ti4h5zthzqomqml70pigg1oxxvs62rvr6nlm2pua3jua9d6h0yk3q35vn0rv79sjrcq4upcuwb1t1675sfzzlc0b9ihme4mvzby2qt5lw9wywm4kqjhf9um703aenatjxbsgccr7vy16vjxki4iordbk1mt3k2273mmryfxup285agtpjes14s8g9488s2br6s7qzbjs3hb9wwsukppamz8l8efmp5j2p68dg2svch1hmi7ti4jl30t7jzz4901qbd1m9tasy6n7tv6xjlx4c48zn217ytmqiwsr29i5fr1bjassxosxowx7337t1nq94ruq0zm0vmbmf3imftkwhue6znkr1ewn1vcnzuj7f198y9xn7s5h0z7n34mhbtbgqa47juf6e8mvyuwvp8nvkyj3941j53bdm7qpefo87eqxoyuxo3wz55kmdmskl1b0zry73cri8u59ut5i1ljtv6fsjnjn3rtnkqd56fz8yqz56dxoj2jqezxookaqs2l5ktw6da6rlk6ush6kyajox0cqjaifw1e2bvk5jxkcws71v8m0jtwek5axk9396a8jdx3nj43uhr1kssj8cmiyqmn5mwmm6gi0p22hk4g9gqsov4z411tf6x3cumow9msxoooknjq10a53362b7cije57fiqvbdq1xi6s4wo2766nrdjul6vqiovc14werflxvy0g6lkhz2bts8z5c9zbavgvp3mqie66y8ft5eok6xh1ot3igtkxxbid5crllpug3kuafbl5t5fti4kczeqgxfuau99iier4xgqvxsm5ju8ugxhi2qq7yf8cuna1n05nog0huszyeu8n241mppuwcu1ldhvig0mq9nhwh6eekgdes1e3gnmqsxcc6k8in3anejzic1ml195rlh4qqwc5cm0n88wr4hqwueh8axpghsd4781gd3kb0nuget3plbf9k53uepkc2txzagzypsrv0gxz6mhadoyrwnzaypv2ws8vphll8d6fmzt9mkpy4bgdf9359qbpiw3auav0vas4jvs4la0jr40pkrwexso3bbxngsto7cnv0v55wl3yuxt783dzgnduv3l1hptjh129i6fonzfo6igtl3lozg4mhvi9xj8uof1g6jfx33tt1eiufianq92ac4s8y0sgqjk3xmrg2hfmpi8wcw88k5uexddvjwroq9jet6nh6uodmnlqsa1z4owed180oyafvcmv4m7t7uy91nj0k6b7jqjvumvdrh8hgf34ovr1x1fhrtyftd8acghboy19fd75pijz3i1qr7u5k7nwyrat0491yre4yhp42psjg1z5bdg99464dv5fqsd90l8ph1tk6sl5tj7dy17v64jss38qmd8x9j9sexn8a5rsjypcasyi6y92rrj18la8c7qjxazzyatj7p15ag0ha0icdnptlgmi5lyvtcddsk4p05b7qr86fkqnm3uqqm9lvcx0l657hu0uzpm9pnlvwyok5e0j5rhb9124itlg1yiza4g83c1c23cz49isyiifnbmxvj3wfbnx4wn9qt3dbfxcetsqymi2dsasujutv75fgoxedtpr7x4xj1db2cew870y95y6uma8s4ra5hkwxsuheffhex5sybi3u3w93b2flzppubsacrh5qle53jl5j3ah1o8egoijk6n88zae13xgjgf6z5r8m7n3wbt0r1kghlde4lvuntes5juapocn3oj83ju39g8eccjxius3vsyuzoeqz98igixbyf1x4s2c0c3dwh72twewj11pv2rofrmdqy',
                resourceCodes: null,
                expiredAccessToken: 2348221990,
                expiredRefreshToken: 2097083413,
                isRevoked: true,
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
                id: '404d2cf0-0044-4be1-b316-7b4ff5fe41fb',
                grantType: 'AUTHORIZATION_CODE',
                name: 'x3ls4l49bxdrmbrm3exmlw0zuxjcm604kf71l02wy8tgmtuichbhhzxt1liaay2x17frps98h2ipexjnp3wr05cm0tiixc0nu16gdk8stwp0v6wdtseae8swp6sdex3gv287138zuxhx3vm0z640lqf872z9nfopmvlp204nhe0a6fyx1jhtixsi0zkyd6xw1n1552w9fiwygwnsdvi6bgljpp2z6zoxrokjzfmftfd1rc395p8ggybshpb1c6s',
                secret: 'kxydrwnzje64l3on4cqv2aehjxzlhqmkdaqok4dom0h9l2i6yqrps6niyoibeqkrb1wj09q5lku2x8cu5obv63cwy3',
                authUrl: 'r95wa2acbmtl6z5xhawaymk2ifqge2sfzdw5kgr4v2nvjzn4vdjexx2jkx81yjrp7hrizq9d2g94gv92dg18zxq6mtas10113wyccneefu1022earc6dq3hq5pxl0ih7e59zzpn12daxr321t4iax7hc0mwu5ys3pcdgug5hzxqts9neh8g5yhljcca33q7lbdhdn1wvs5hxpty7i3hul9diozltssa0s39mb3kjgeupvtclevxv2o8hjlebi26vqoqkuuuqwnfn7s4fuj778qyr3iibjuh9rwf7o7w55vxxkiz2qe23hwcejhs3akacv4n295lqyf5z69dz8iy3x55x8fq2317j9us7ixm6rlaijozmphviwn6qrfvrd523qf0pmmj5m6o70f18ves928r4g2shcw4j4ldayfdgcof1oebsuclh8rzd56btar4e3gbr67pxsevmz2okfd25xu3l8xbgjgirwlrlw950k1z1nun1dmezbqzwx0zflglliqdyk0vvmw6p8zjxc69bbt2zh65o3viu0a4wmxdrvaaxxs8cuo9er23idl0jtpkqhrlqp7adpy9xs2c6b85qymz91wegqcmwmat500veenepfovq0eeomhiyr9zec0uzttb6olfr4jmgy20qgf0v87qrqnt94r14vrgjjesvh054of24v06wnm1ejyn89j4t0wnbr4hbza5c4chxsvw6osnp470htlps5m39l3fayuewgiv77ouwwpo53t8bm78l0g15eeoqxw8x3fylp9g615z96ubpwlahs1hvil1w55eumo1g57tnunklt0gg9y1sw1cqvls7ex9d86kk4bhz2xmpgbam53t7m6i03cjju00lqmiiq0srbtnreivx8y2e09wwb50occu90r0mm8t65hf6gkwei03oyb6eldmruinmev0a26n075h0hb3ar434ebe5h5l5jj0h38cwvyrsbd6llgygt8cwk2iq23knsy4gdtt7x8c2ukbzengouq7uphy5hp7wy4n34ksnwqztr0rlszadjmu2mutq1s2e95jvi15tlxmnixd2cjq0cwgjqlgvo5uvsut1tsf2qbx8682arzrveg6cru65x5hfy36m07b90galc47g1lkdr9airdmgsm8cdn8aad32e27qlbwo263lwhmeh4vy3e6cw8vao9t9embi3vue2ozv4qe7w9g6z4es4geuvj4gn8l0vtu8d8z2okfwcs01pg2bqw3g0k8f7so7tjexbxi7dtkcgm52xhk6g4ut7haafo9sv3ncf84umzhbr6xgyq9yyiukp91usq3ci9gt4m94u128urwuz2s4vwk1t70tmyfiwdr8z9wlqmd76pd4tfdeaigpfhzaacey28d92zd5icg0n4mb2rx1jeatizqya2ik7wrryhevjttz936p062ichd7lf90vuqx3nrnl99as0oofjd1sfgfrhqoshhc6ipios1xmu2s6kap4kmvz6x0e2jpgvu4ncz53msvmj17jt3qkj2na9rg8vkb830tz5y6qwqo1bpa6cbkn8v96a2euvs8ccob4obz7as9hrny7wbyklp8cy876j0xoa0uasnez68mefl8uhxivutiwv2pzkbx7cyvuflj8dxdvzynnf8zffd4yihdtbfr3zfkahqx1vs8fytd5fixzfg4zwtkpszfmlanadtnslw2a0o7ladwdckgyofmjrmhcqfc1q958zjxzqjk6cxgfsmdjqyia1dj9v3arbtu2rgqs699nld9koeq5h51qb4rz5o80o9en2pj298x1eblwk1lhlhodv84wo4hdp5j9afi04xy2vlq4q591puuxqzokqq0suwq7u1w7vwre9qzh52b9xq89u2iuqo83zoegz7jv6xfge9ybs69o248ddg122qp3c0dev9j3y5g53clk03j55m9u6ln39u2eea2y4c2m2o8dprocggker1wr7oq65x3jnusztd0dsg6l066ka34gjmzfaoy42us5sv22hppe8iuw93a',
                redirect: '5nvz7m454c47ug2urefcedmfsx4hejn9lfnuze1pl0x4h1kei60fw91okz11zd4rwso89gp4ayxz50zrt72sz06yxtkouh1elkmq4piul7ztzx0dfe6xlzsag3rztg9wssy0coxi5eyjhzzz6xk6p0c0do1z1t374vuqaqnv3c1ahkqyqcj1iup6ul7t6e881s6df54svdh2blsu1mi15ortsvzy2kdkfpipcmmuwbp4s6ujihhopq46o3mhd2ndxyty1t329av13b2pwapb3b7e3aewxwskykqlgwlic8gryzn4kn4jasw7zb76p5gm8wovr7sl244i1ilsa1zo7fynhattyw6kkwgxgjag5pls08z1n05i5p0cy4msvhbbjbbnuospxwnw37lsgfpf1y8dnm4zrha8jnzkfk0bwsv0tm7yrtpv0uic2ciulj8x7xanfj504j41mhm9s41q850ovwcjg4ovyuwzn131amc4rmjnbcx1jlmd8kxp7ppjzjblu4s83cqcis93q2nzsoouci9skx6s71ucwga3bzb9ud1iymzvxoh3kjotc9f0m248fdsbpb2688804qmbl29e9ebocym2zqgzdga4vvn77uz4ephht8i2m9ujnzld3p33msoa3vws4tcfzp9hlugbwrybz4g45a16foq8ong8wybxk816ciysapn2tbemu2e0qit2jlkgif403u0x09rdnpp87s8jcec5biryfv2ay4syzoix5k44oj3tin3kkdkzgd0syxkxprvqj1c5u65sx7i56ji9z1feewnstgc2m21qvoc82u39cd69gfb1394z2f84g295i622cla0yb2jsiu81hyda4llm3avxns9v2eklzn7b4632pfkl9tx8z2duxi90jcx5cr4b1yu3del8rp0xj3ung2ei4mpduonyla0kk1jdzmeebd7k4zb32id1yil43hftmwao08awk0yyocmlwg3dgeq2ncn466l5cn8ivnj2wp8i7hq7i09j6o9z6s5j8xfpt9umlfkgk199kiiy06b1988g7jjlw1289cxhkrqrv1hveqxus60s2wma5qnnn2yg6412ybibzf1alvc4oul43iqwedaah22fyrmaq5dcz105ni1h6eyjipmu0vsif719b6r5celube7p6rmdpv7kys9evkf3arao32y3ctut5u2ut3av4rh1ryi10wwi2gwafkagk5ci91w3id19nk1jncht4kteesyutvkpu0m8biel92ozhtugp9lsxmktq9dmh2vcz8mcq5o3970n023n9zy03ij0pwr0t7get8tuvb8yipnhd6banqen5x6p935g7kcnls3u1ck6y9kej6d8tvloeptast3vj9djj0mbbiga6aaefzaur8dy1ewki0igy10x5iw3tlxy989i8xv0xoj5hqf86soql68hb6nncvesvlyvnfs4in3pkex1zktdsw9wd5dfjn1di0klsp0vefa6kok55a51blwxsgrqivqbmtaasp62p1brdlopofk4y7ekazirb65apwkq73bpsdfxdwbtb8mcrai2zzpwyl0uivj5jn68scx3xweds34k93qhhsez6bspu0ho5nefr6gqdd193a2s54nxujkzdlsuphatknz6xi61um3owpflfxfivyu58vdltxznjp9hicr93pb8w4ny4heeyhnvpxucbc8mt4nc2703vsg7xa06ee5i2mjn5mcqxhonf8rz0p657ux6bobx0n1olosgf93i40ct28n24kkx28dr7x3yjpjp52xmrafy02ybelfi6kpoc1qynauv22nuvc7jiqy8ntwarlvwsdkxvymz1rkdh8gusibt5q2rqyzjuis63csddp25l2qnlw16vcba2qw1688mooiitdq67doty66s36dill62c8u0sgewz1zzc8y2aednmzxk0zy2snv9l1wgd8z67lfzzw9p1iv8mfqeeif74y237i10av61ar8qsb0625pg2ley42ygksmfy7pfyzkqsch',
                
                expiredAccessToken: 6140638718,
                expiredRefreshToken: 8754695061,
                isRevoked: true,
                isMaster: false,
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
                id: '404d2cf0-0044-4be1-b316-7b4ff5fe41fb',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'j71qt1lokc0pikkve2s2wv4s9l8u9qjk93gcq6tmlmm2tmc4pwoouqkd0c0zbdl6o3i79wgvgsrdykhrv7g7u6okkzcmb2vlf8rlmois2na6kqeyoxit59hn07fhocwjzcinsdajer7miq2vg1g0ihndro4mhzywwy7ec34u09tdm3903jk0aqp7havcff911a6l5tsigw9e8g1taft1bgvs5qolj5vqp345puj1989cv06wjsmky3znv994nk9',
                secret: '0zj193efbh15u2hk06jpy0ostq0cud69y51im8q7vrdk7bd6lfo1byw8z6gi9jz81imbict9n45dus42utnmluofve',
                authUrl: 'qc0f52ehev3a3w07vfz480oky0fl4utsi7rcjmpreebfjl7cjq54v4feuvy25rj9iri738o1o874eb1eu7ij1qw1zcsqedift1pmt7uvrafht542ncbmlnr56bg48jzdsmncvrksm6g7bplsnaqacdotyq4u4eht1gmvh7tokwbmugja60w05ui72ky8eyqewcrj35pvjb0s0inxktgrh0xkcxlfbna3zrayzp22xh9uxu3m0u3lgmsu8ijir8xz85dby3m3n3z9fn7ofb2ijp58k207faz87iefzl9jyt12o40ybpuos8l18d1sdlkt52qw8n6kqcxf8qp0jyer093wdvcn7eygtjaq6sqjbs7gdhs9q28k6xc2g27v1ok7xnnzaeeyhjfy9mmabuodlnqzojp7nbhzq9zibhodaikr7v8o19w8dao3eie6poewkbsy4fnmuznw4xw1tsnm3xo9kxrhkbkmmh3lmh74vwaq51vcd8r4hhrmd4c684aaveo66noi7r9da7c8o0wovbuo4ww5v0b20lumyt1swtil2d5dzpu5ejncm21qab52wd2wyl9kwgdrnay3nltwsk05c2iouq6xt0fhjaa1qfik5u7nm626lhy3fq1w7piamy5jdy67l1gugui34grfudekkw9wb41r2z90h0abgukrwvs0rouxvvl67d0ejcner3abz1jras6g1fo1p8nztj6nyekrxwifge9qc2o73mgv8l2pglnqc3j70nhi2p76m30ysm1ofct57je34z0y44nn8xc43cubrczhee3pnvp65a2bko9aza9x27qd6ogsgzpf6f3tsom2gcwqptrtcbjnqowxbfdqwpcxtatfluq5tcjvcxccri1cyuqsmkyvdyy32lonn2ntkms5cewo4sa8cw39ggnbneds1j00o2mpwkwlzagc94hot2tlmuu5t3k7zehb68gis5b1826f860lt6cev9pieg4qict256qx09w28qgfi891l7e8xa2h3vt5ioe5yvc3rd45c0zi43uyiec2k867e9vcm0pziuh3ggkxkoqlf8sm37ri9lxlbsq5c2wqpbw8mwhcgul23asr2agbfia83r86zcw3vkt3iy9s46h40l55rweevd08klgbtehg0hluz8p1h8gfm2djsvpz23ofra7phw7c7jzp9za10at4xaq36t8pbfw0jkyk5213r49aitw0pcfb821mxlgi9uuljdpvzvvjofykhn2q47fbdo59ioa45a0eznkgnzdwpcys6ilgp5zsg6uwowd41sfebqygz07phv1bhd828pwwckmap75jyahv7184gs82c8npbhqnjxot80kmusvoi7gf2r7og4pe2ljqhekg0g1jagwyj5qd1scl1kwnv6lo7a9mvpv58qbb6pbcizo4y3tzvaesv310j9a7vhp8zqo9ptbmovcf1wq2j4unseic1juz3z0n6gdn9nbbrgdmbxqhci7hda86y35e94fv4zk2bp3rcoe4pkqrdlrgthbeztdfsbkt8pr6ne613fu7bg9qcvwnlz4o1stdi3365n7kmtni8dnn4lqfql5pn4wpb72uu5im996rn94twe9wwrs6qd178vvap8c67fbrv714l5pisfa84roko073usg9w6jolfcegdr0hf9m7y4p2jpz45h4g7cx7ea8a1u3kbo7stw547akf1kyzx2ywyn9gve3iijgs0zfse4dlp6jfswjitkb6w52960xy3p7en7y2gdkj9yfvmd4wptr22l4pk1lsnrfc5f3yo1am0yurpp4tpno4fp5paw60jcgh3a926xrenm787ewjrdgfd74a28wcuuqngzfayvm7k1zz31p934jtj0973f0l8716fm1i2trk1pamqia18qopxx9q9nf7c0v0ixiy046e9auxvo9q4gdaqgl0gw5xs7pfiresyarpr7db9gprl589paw7tnydiv102xdgxl7r3zml2aue1q7bldrwbztcywrvtxw0i8wwll26c4a',
                redirect: 'h2lyl3agb0twsgsrwr8zhbj6smjiwqtnlyyoys7ve0clrz3vt5cld1ybxpu3s3rjurum06xaz6iuacc9of4e7ol20q0k1qvbbpwv44rd07mgoul1hdlgit3t23hgo3390s0p9frh2mt57vq7b4do5in6u3ek969fdcljceo8me13w668kn04h795lf4mdjfmhaquyxfmrq1tem7bruzquwv6ddygaci0lr1m9g4yvn1ssurhg5fnyc5hwbtohyrhctbp09gsvzq0pvph7i5fuwj1xl3kkcuaop5fwm6zf0cgmz9v14d8ybpih7ox3zx7yorqdwkuv51gvqt97rzn9gg29189zz6fq8da264t4ryyj3mndogi42x6hkpkpnwvyfeskgmpffdm37bqyge3f5kbt7fel0mcfxwuk17vi0hkmylbortlrtwl1z2ei61l7fatmgww4bqyvwnufjgcjg1ncz7iev601kmklpqym5o5pj4xc4r9a843062k2cmczekew9keetiucnsi0trlj1k5edsu5stc6gks6kyuypjiwao4v9xjoyyu0lhbm5ve87a0e61km8noe97vbzw5idwie263tr8v5oih8huvp1lcp1rt6lrys51qp627ets0g72o1rnx18dkmz37796knc1thyw27ne7bh1nd2r45rmw3zv0o8uqpxhipx56dh6pr054vv9fi6cuefx2fq5dnmoptooqeiqv15mm7rkhpow7b9furrgw1zig4ye0zt4jsx7y2sor1ao4u11njhviqgf8bepcjbtlyoi83gm7m1347h9z4pme83s22u1iweukfqs4n5dt9td4hgt4t3zfdqhl6c07i6khsw5c3rxdkjunasg3i7nnwym5lz7cddfzy4h9fvv10jj1j1d8jojuk5yuilcbgnrxy59nzmkye2dzeswldros6op0cirkuxxccsfr5xdl2eh72v58wpa254imauy2onk3sg9h43qb7nocyuxz0o51wl7gzci9zl6kokj9z3po6jj7z7l3zmcdbtdcn65rd38jds0h3w7z5t0bwptsougcmkp9m5fhdg0031xeyz1xvxr56dp8parmx8gg6kzzp95uy0xrobgpyzqiwrroe4b12zl49mtgwr7breo3icihmrbzl6rt71pfsu6fmlbhfnpjmynxw6b3zb0159qj53bdm8eab30ct6rszo0l9b5yrrxdxr2wp0baraqs84jvil36t14uec9f8xafwz3i6cxkdubfi1aiesto59mqm69886yhrpc1qunvuxcom04vyh5tgmd2rtp5qpgmqfrgucbjih6p92w29p8fvz6sk7rqu6kancsm9e09abv9fphy67j16g1h0qltmxygm9nst9s9pjysgfjf1dfn73tnrhx4hewp7rlj4v4v60czc7gcslajrjeu01pw0hdgeelv21cb3n31n7gi6r0c0dkpauwn7o0e27ymeat5e0dg91spc8xu69tyky222bqaefe76hyrqql52z8ciqs4rvdyymfsits99r1dcnutppczs4fou749byd1y15ow3hihtnwvluafvnppsx31olsaolsbi4ehosbobpff98qod5qu01vqu1xn7jkwlg3438lgc48bzbdi0m1v8fm80k4r44o6xy84pchjb5xtrww2cb020eiqpf8w5d44501d4fh6e32gpqbyvet9tg9b9tzbmydnhly63i11791bd92p7tpw5vlcx9c2u7maew5plbc53gxlsbrd64oyzyl1wevr5bk72tcrhkvkti92583v6ix48pww9olbw0j44msxufc5zd03r9ur63lgu5i7c41bwhqjvvytf715k1bg42w59f0csvq18ix5bk99m5crhrjnrlw7bu9ynuyyq77ee03ir9xliwka8qhw5ge82iag9oz0as8ymbhue52hs4ncsr2pvewa8vstltulo21kt3qp9bsq0odbeb6oxc0gf7tzxsbmopkuu459s9gae6q1428fuewnr1xrticsb18z64i',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 2316308234,
                expiredRefreshToken: 1305450582,
                isRevoked: null,
                isMaster: true,
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
                id: '404d2cf0-0044-4be1-b316-7b4ff5fe41fb',
                grantType: 'PASSWORD_GRANT',
                name: '1nqe6tk34a3l6bwzbzfu5drke8pjdpmn4tjp1wo5hh3fhw0u48sodm9e4b22l06htvxyj5msnk8bhd4caim2e3pylo85gr4aj9f1h4emlr1htf8huz92ucfmrlwoovnsf90vkqba8j78wymkaud92z5cp3w13qaaieumdiuv5b2z2pxtjsprxzt9u9cyrpkwefgor6jyapvm5v6uhe1zd5uuaxdopnknao4uriwemhoqvurc0j8bmpdrhbi46nj',
                secret: 'pm4ig2944nv6rwttg5j47uadwk3mctzsv9qrxe76q1nsafi6alrmpphv7v7v9o0sh13evozuywxq3pgsmhe60geeie',
                authUrl: 'ze872h8ntxngjuiekecggh6m4u9o2kzat9r2miqg66xon3pwmo2pyj95r2algl7w2u58jmuazks7bu7tpz0e38ejtemmmznldp97gi0qiyo0rnn4fftac8gfzl9hkv42wukef00nl3qfzrkvj8o61fwkgk2mo1y3halh9ylr3ib19dc3imm7ks09eniu4af967d7b7v5r71rw8uq26i02wboda3d7fe00zhv6rd0i9m2jzp9mpxxzzqkh760ljoplhwal8iay3oms6puhqlwajtvdqn7vnazqfjwevefh5dizcmwvk21zxlzso08zu2jje5sd351t635p74icbihn4f5pqlwg0hy9qawkiut7so2h54ve0dnqxlcri6phx6i2w8scmbam7udgr3rc35f3sxaubwjh59oi7gm3k3s3b5qui032e1z3x9g9kmpjdebcw06txs6yfdz7fxere37qe8kuodz7ycyxa94x8lj0usxc0mpqge9cgpbzywf6vajpcc1y357wekkcvwm90vn66z0b7bgezoq2gmk0pmqiqpe60zayydjq002nbrr5pw4nklkwey4uwn72mvjh6vo5dc1tuajx9cdch56e55sn5v3iiwlzcd31o3re9ukv920ge3skhhid4j73xtxxz704xr1pdivwws2auzetujol0pj602diqtkk7s5ciwgia7ymw363mjrefo7fjrqs9klbh46yr2wagw6ekx8t2cukdltycujkhn4ashouwsm39u36hzgzafvt1uo3vr9jt70n39ddhltwuo3s6cq1csnqsfhtoxelvziusfurqxy2wq8ue46pq93dlj0fmpyicstf29linw849rjndk89fk1skb23jn1gkx1eg0wsud16x5t9mpiocumwbejwzfe06nswr9gysfrrymlv36act5r7kgvw7jyb1l9rrp1f6wp7kudbg35u97xavfr0oo9d9kge75u6ojm97jinqsfnm6dwvipowp9ypfh9lel1c48jqr1upco3zkm6tw6np205f70yjwbphmch2dqhbr4ppo9dt26vn9l49ef1n68siw1ohk7wxae0lv7nbr5whs43qbohg21b0wttlxr1tac6bqrpkzeqlwzsqik18lucclt4ayxnz4gtz3mwbtl3eiwyr5psjjpebla48nkh60iprjhzwwg5ryf8uxdnctewmxs5ndnkvvpn1tukw4jdyvljvg97pdqyxfzlwiwsoppc6460vpnu3fty4kwz7nclnahrootxs75p4jdxp6xsavfc2t0xii7ioj8kygg1nuc3f6wv043kn07zrilxh8t2khsiaya4q8dk2w4jzliua4hbw6c7ziic5w10vt8du125a3xlyjnqtqxhlaazpy3b4wnpgc7x8r082f7ufjp6rj42y1ln9h0q7ur4rnxzzymwuqz9e6q0cq0cnqwyuddpw1bfun7sx09qp1px3q70e5l80n0329izd8n3jczg80h07j7oen40o4rgnj84scok2uhtxoqcvjbnt7jjw3zbzqrbvum79b090fyzqim8fedrgmn4ginyvemzj3tsn7yyht8cve2qfxyh21pbtnftzafh98r4uigy0qfgt5vs7dz9yxjjmosal281kkmmlc1qnahujto0gnrvnvfcmd0hcq1lm1usuudvxpz46aqb4ucglp953wef30kaj16mvwhbqtbrj6vz1rxmh44rdupzrw4pmehrqsvzy0jwkpowaann7ejfyahi0rl80g7gy2dox995572i6l35dppmjmrapucwqdhkw0sn78xkatzv9388glr0ctdwulqnmtc07w2cqtrenom29ke6wfnwo6dvfhikosqfgjyh1bftsp2xlymb18kcxg3vr8bwfevhxrr2tvljogf4j4e6id1lclzkb7psttfiyg74cdo9s4nisdjjc11geug8ejlokh2pr7b71nnpraowhxq60906zxxgqw7j0lophwrxf5k90om3lyu88ibnusswswfa8d40x8tel22xtoe',
                redirect: 'ftdwxiolceln6n3u876ammzo1pc18kib44n8jwks2p7amg00wtr7h8cn8zliprui69ozbkqq4ovr9sudqqdcoy0vw72inx8oz7qc2rg9akwt2ig7c6b31f0p8q1z4x4ewjave4m9mwcatw099uagpdlgcq8sa2qwmi1jdvej07v1krxgcb1ousnq9wyg6uehjbya907fgl0ifh0ijrw1v29qfcef8m6i05fs8e3dhqbi1ppobaa4jftsba3j3jtyqxyc659i2qt7fe1mefqn4wm418w6flbelvkar4vnrt8wswafa633gmh53wtck9ld9y41nlacjxibyz1rql6zfte2w0breo0uwpplkzi6h6nt9k5ecgp7c84cjvrt1wi16z5a4b1motri5f7u9py73qcx1uinq2www7va0ym6b47vdxv5xq1cycq2lgh7pby8ccbyoujcjgvciknl3m8fbnk7j08lr5vdodmxpbe8g2nbicbdl2ouuii6cgt3orvrqksr2tvv36xv2wxy3473i75hr8yt95q3at8y6xz7kdse2v11wm63siw08n4j71yno6oo0jbpp8255qpuma09t3ce4s2657fca445oqs6wy5p3q6umo82xfq9nfc00wbz763gmt0dn722jui7sixz4b19pne23q5amsbyrcq68zven0klh4oi6bp5qn4y5949lreeygunlk98499cz4hs6ms1jvpq384kz2cbzawo55a87w4qqlz5vnyaqjfisicaqxhpubha4anfl2rnyoyz8dq8pycqog802gekq1pqb7r9afv2qcddv91eojmrrkwimd5lktrc9droc3i6lp5erjlo9gubl32wsoon5lb2y29hhbd3sai6boylvoj3on8utcu3pxz4esdm0ky7l18gedh7jxfgfuo6t0ldpxhb702yfr8ir1rgg19qezwqa5ax34hxmuwh6qwu5av08dwx23i3anjgagglz69ocpn80pmqg8jkpukl2907wzk30ad6ik6jqedue47nredigpsyouyduwm9g5ql238k5xb1r3qzacmp2meeahl7l6kwfefgqfhkb5kxye9u6gqgzl1cedw2bis0pusrdk7zbobdb0mx1u0o5kpr8ow5e6wsaqew6kl693dy31l0tmm8xkv5lja9q6ppqays8gb68vn8nd3yhawwy467sjt2iuotnnez5sy3u2ij1ars3592g0yasttazu66fukouyn7x1zvqc5j19ha9muzuamzvmgtdqjadgbmo5ci05sv8ojuvi8ltwasrximkw6un2lghdfz8xs5gjolhz5gomaq545bcsvu6cax9php1c6lsqj53gk482xaw8hs49vaabt07u0qotkgtit7is44buas6s9m1vyesijdfxmw94m9aq88ohcg3nal1jsow491tsosqqnkj0i00b4peevbrcj9t9pvkoqjmg4qdn3gxusro593sean7196v4riwdut3r1rs8wwx4f1uag29krp4trpnvkrvnk06dzystykfsvgryf165scr9ts3mvs9kzhqohyx49op45cdb69viur88jg3fkf1vh4phybwpnutepwx4rfeydcyc45ff5wo1qkaec6sudgr2knjjac0mbrjhqtp5r1hcuimqn3v1rho8vgp1gx89mlgjdv0m9fb3kweggxe95dbln99dsqsdthmq7p6puunldcaca8jwydrepdwcaacvu2a4gm6qtw484js46vk2l8n7leufrm547m985qekg9qo0nsfm7qq1ylq6va9ld66p8kg9dtgtj1wbsxjbiaj7fs98iklwvkk1ordzwhdwncjxx43zfl82kskmkzmu0ii5nibjqyw6bwtj9lk8u00bun1hc5yln943ctim3gmpx7jbv8ial71pzfjj6jbrt8f0nprzqlhfougdhlfucnvn64wghwdpuvasa8qvnhgfckyhshdek4eoqe40hybjahyvx26mjlj4l3ag3q8zh0mh08fdb9p0vdmmoywkb87ogg04g',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 5295200823,
                expiredRefreshToken: 7968188959,
                
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
                id: '404d2cf0-0044-4be1-b316-7b4ff5fe41fb',
                grantType: 'AUTHORIZATION_CODE',
                name: 'rvv6reim591zq1z1hs4r0z9xecigax57rkv0a0sbkq2jqhilu06c19j6wa3ujgo708dzsf1h8g92m41m8vf9ivjherld8sc0j3ws6mitmbh8ot0p2hw7yauo10dyfymp1ddc6jjvebwryzu5bsyz1xsbrsdf36fv8vzcufx4uoc6j2cjq005tim2nlsn5wyyt0b97mnuhuk3yopdhnqtbyrgyqg8490prwc2o25kal8r50lm4jhn8h14v6ugr35',
                secret: '93cwpg2cedylgkfl15ss6rilowizeajyrybmajuotjmcx4j0hmcoifvqnijc21ccf44dpme2pigz3uahbk5byuc4wc',
                authUrl: '1epumg7v3xbxy653bvjdhi13d27b2g0dw1ucql6gmcfbssm1ghvqn18rh89ygywj6spijhthlg56b7g4ht4js6x3evwjd8gakxaag88lpnxj2kjo7f2qz6esuo44k8flg84336732z1lrxc0ctv89pjqcjnln51j8qiud3e047klhlyhbofu95047023bibjmas1hspstr3pgxyj4z4jb1045sh01vzldos61exjd1sok6xc3fqsmf57fg5nq8ocypymra0i6afzenpqqgf749lytc21u3gcab8e85cnzapiem0ywcbnrgwsckyv8wf7afzj4os5y1m9hf0ze97l227gevwiiqzac43akwcxsj8fmsqk2a9le909389loc8lewmgtw56vc87t92i6xfyb870nshu19ns2nchx34l2di7qq033nweu75jul7t4tez184rsy0p1dhlcspxykk5u0hg053rre26az1wp1o551kpygcdz6915lg9s6svsdai4g4xc1uszsc9ylo86au5dnlh7ajv0tjjjfqq8k7ymxkufgdxiub07rinq9ocoleq9eigfpsq3so0bzlzbgrtnaw5at4lycyx64xoy0liw1bao9qnd9k739gtz2xafl6l8dpuyw7od3hhjz0z137tbkpvc7do5vj8o2o30sd6hin2617upm6hti2k9ncr8qty4mnsfbgo272gsq3lwkangni3gi0ze9t8zvwhrtkaal9d9e285hg5k2q21qw4g1ttu3tv9ypb8k0chq9uv3t0rakya8nh8n2gbao4exr1j6qnskk4mj7x2ea1vxw623ev6ybg52rq4ubgy6dx33iq6y29zdyeqh1gj7zhdqi511zmjad9hnza2qbe8dif2k16ds4clj2ld1bvthvuztwxsit9zhg1zq3zfy3tjmddool31bkw7bnpfcnon5h2mdzc48af62izgzlyqx0uvuzmfw951zryn1exk59a0u0z50i32yqkuvj5fitj2ytbnw6j4wgemwkz2rsxa6wnnml6nogym5yd3fuultm3ghs1tko2mg5jtvtgt50zzvfyjmq7porce8cmx8odhq314ki1hyo6pzd0xxbtbmjtr0hlurtavjea0q6a0assbklnmwh9uuqgx9r4iv00anno0eaa1fs1v4zxzqbdclbxzhurt32ok6rz6mhahmoj0xlff5esyhx5lgq7xemh3zik0jjvqth4rf9fvqfaatpg0vnhzj2rhw5lcr99telyj2oz6jrd2886r5o6a7o01onkwuujdxksnbo6l9owb7qm49h9z86exv223sc21kj7ig91njz5rntd76a7u3avyq3s52vofurlexti9x2cepje34pdp0f6tyxj59zc8ifjeejxv6692l666xe8i4unackc0ims4ymh65sdcd39fbfa4gcw05klot8jkrhsd2s18zdmo1w69tgh0jpxtzasjsl7p0ku4nyp955hr0c0xwnck0zkr8d51najbr6u4r0qjx2sitzukfi6g4raof2jy4r0nmu8inies8qo11quuk1aesr9o3yblr6zv0j58g1qlx2k1767vnfqe4horqeljv2j8zytp021jmrtuqjryt05yno4ukpnu9h979xavg5ot5tr0mloytoxzvj5t8poe4k52dr5ta4babjd12g6sd52joizmdzxlquzjh2x2i3j87vkgcjabu7lnzumdr15n41n6fwvz56146eflwfxy6vxn4fq8rayq4w2ujvnpz6q7tq3ndifwhu4c77m93lu67n5oy5mxv5dkbohbzfj36f4j5z2um2vj35y0sy0ur9mg67xp8q5vbp2jw364ogwsm10h7eiquqkktcfym0p1txujj6vz5gs3cs2jayomuyah4s7cgw5aajialuebrphyuqrjx858l476redaii1aq6jjthk3f99he37xgdnt078xbcfopabvp90b4sj6gjr0pko6c94khcjg172gtrrtz54dqqp2obuohghz31mr2xujfyn8onm',
                redirect: 'ugks5ui4zoiuthen8qdaxrs7ho50sz5q3v335sjuhj345pawwp9ku846ixruxmap4gatl8sgl6byol6rq0y0sqovntxqgcclmq0qi2fjt8jw6txxjceedmrwemq3dnkfwjrd5ihvvigy891q9fbimh2ych0r2n8w1vhu612olr450a77gognycmp49a1zr3se4tka3et1rxqypvshq412h2mxdzcnwu7di42cjpt2aqln793wgc79l4bf2rj09vdx8umazyi8zowra5uwbndlz0a2m4ejs5aczvk4pzjxneg45mqe2mad7kt3x67tfmrjqul0beiwvpxsjus833fe83ezdvo5zsx20a7nulhw43pofvcsjnefwkifibjbqgfizxr2zqupudcoyvzv4godzusdiiu3lyqnd811xywfxn3a55bas62ane0syu1p8ejbcfvd3suyj9zom7cdzwrr84grnhkl2j3g4itvjbs14rvusv6npyq3a41s9b5sg9gzzl74nth4uoflrdmdjwo5df5c4r5yujtaja2pyafz8ngjrazxwv1koxxmsja5s1wbn66kv276510qbcik45qeq8s0wza6iyeo7jphyfsnmi4diu23aajo820c0roqry8bz22xvoutr1ddee23iq199907ehion8cy055j7hyddlor5j4ibrhlgchdrnjc32ieu3erg6v4c9n7tre6q6twbktxjzgnz2mc1ztcd2kuoccplg6wavfon4gkip6nmdacvlxmcduzejfr55w55j0936vp1ang4uquu5hmtcnvmv4yibzl3o1jv3rlliygqqj6er64xw9q9il9qlckrfw5wt5temb9q4vstwbkn0hmec3q61h2kawmn4fbc7rdsoyb2ba6i5k6lbdvl7kkfzkve5eyl4l96zifjjmc8dny5kud3iay91akhrnuzqxcwr2uazppmyd20rgvc7lzncwexsg4505zznvyvzyeaq9dzdrfaciko4o011ti0jmdywovxtxdtn78343foxz579ddlkfsi0ixuyuliq2ghxgyf64ctxd39uewv6aa4aus62oicsji360a87pqcjbxtmfwdw7s1okg84eh8r4299fnqxyhnhaiuv07cedf014onhtl6p2cpjw8h741m6o2cwspy35uz4a3lkpeud19fhc8mh86ocw91zcslvs2y3yjs13kkg9vtnjt0h1v90dboe8gnk5ovnfoahwaz8jidhmqdyc982lhx7zftiqwwzii7zofub5ajdyblqwsnwz732e0nu4y6kwgmkf5i1nwh8w9c5q77iy514a9s9qxrb9xznvi2s47s54ajclv6oyzqtdff6nwt3l79vue01nk7bzc6e1s0hj062yzp55udbsacszg7wpz7v2ebzgbal6a44q1v7xq5qgf2708r83fjlsjscbylsm6c7s3vnljksps595k5n8guf1m3o0yzioemwsp6auh9wre6y294x56fi1mtgvmpngn3i1l25wtgy3xhrf2n89ipbm62rxelvalavkcnzu2h7us7goig9mq7aeqldjhija2gqmgjwcg3n13rj1tnu3kme9pynhk2hiv92bvrvtcdxh5j7jn3uspei53d3135nkz59y5owigtpmv7tf8qa7csgdg6l3r48yasr42laxg97n5kgdkcyi5myneol0dyt2sinf7mca3h11ptmf7dil9az1mc493baj5jdk4zuwxrtu1jqskom6go7ptn19vazaizornr0m2caxnms60gyi3j0beqzbl4luz0ux9hfopskqg4ewn8z8wr8w6ic31d0in19xbcr3qnofe2acv1jsefqgvm8fic858qb76sqz3pfua8u5wh8htpayz38f8kismy1if9zub3o64dlnrfv1nqamz28dvpste3aqdzpunl65g0iv646oq8rog3ep707c7yo2k1w6unl0bex7y527z2uuqkvca2b64bquuvxmytbmuao6mlzpjc5qon78hf4w7b2khksahaadduur',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 2535951549,
                expiredRefreshToken: 8402141042,
                isRevoked: false,
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
                id: '404d2cf0-0044-4be1-b316-7b4ff5fe41fb',
                grantType: 'PASSWORD_GRANT',
                name: 'pxmaqxpoms6xf07hryfoxbmja1b37b9okfx20g6ujebe8sjn0t2dvm2riu3nximgg7nicloj10lmt379wer0cpb5d0g2dvfx10g0o0pejqp72e8dwpdkpxi0mj9jkcifrrsaj1mxs4xxihnwwf1t0a5nmkz69sgd2qy4cu3l0drj3x6wv4726t4tvcoxcalaim4mjhc3bm0qnb2phd9eyygcfrl1c7bxds80ap73f4qviee8x82wrcwqgndw3c8',
                secret: '96dgdlzeeusdmrwjgz6817wfhykjr9in191s4vdas9o2qli9112eq99049dvkwuqwc0i0gpnva2h7fthq0su9xvkw8',
                authUrl: 'ml57xe49xx50dmgy0zem9fd1dxtjrln7csu1ol8pgrndsgqw7yrv039n6wcwqgdpfgwb6xapsg72dkiyvztr5p3m4l3rx681p1b2kjujj9hvmg0ubepectdvk3nohwddw23036t4z5dvcqgiblw1cc8tb8zx6lpukkqf1fghxk1ecgmicksovsktg5klhbpb9mf1mqyi8c5eu70ypnq36dtqum1uzunta0iqkgr644xjr9fvv8emwsyb9261b70bugff82vct7zf3w5ccqzdzxlrd9cw6vnky6mrvdurihdfvzyqm8ujfr18f9fkyrg7lej8aom33a30n9pdpcbclp2dcsk3cqhc9g95idorhk1z5yf7flejgladb9w14kx93kyvro6fv296waia7umd62mk7lhyu9xprfcpd7gcx8gknxf2sfo3tgwx7ovcvjfsppakan753z02a2b4s8z16g3a5np5buw2zfpbbit30923w6df3d2x5tdm987iyanjqz7a7k8ore4iq1bgl7s1jejko1jr65573z7wafkrpm9toh33jau7de3rzoabv0msevurneaqidqgw9hlb9oj2d29emlqgu8rox1wgtr0pzqxn1tx7r3itqlex0kzuo5hehhswzcb485z34hsivsrngjf543hu6fbup80rxws1e8ojy0l8d9j8nw6vozys87wwfbkzi97awx5deq2o6z1basofp6bn7p4jnxktswq7w41jilz2igejr7j41gbc6nlzfvruzreezyf00vh62adq9zt7mroamenafkcr5jfxfbvw2umwazf4fyrgpuxg62qxhkkd0xq7j11r65w9dldw6qayyjmg9v68nqgn7b24sr0wvws7nu8yh8e9fjvv9chn2d2xiiny9a2vvjid0s6pd72to47873fcm92yb916n029881dz1azbwtalud7nzubigwysns5x8gbelj66kb1omte2myah62n9qsxkbyhdagx485896bxo5fay3gmo07yy4ewgsdn87z6zpwd50eu49t9qtoysjuos31mrxrbstyxdi0ur24ke1sv1y59tx6by75y5jodzxtm37793nzh3ph5ch6ugio8tsd02ke15yzbzo8rgb4kktkz3z7ey4qx3xdgj0aych9e56rdvqecoudyqhpnc3scadpflbw788x9t34sfo1amaues2nbyrictkglpnwihk3o649ke8ayhif36owi2rt2y06fvd253e2bnsljcrvtfw32w2f9r12bwzven3vcjymorh4oxya6nphb8xii1nd6asfoajzzx079vg40m0ng598d3gun91zflfir96hh440h1vgxghhc79mxq4wiifdnd4ntia16a9h3ubdeb9xj54gpds1be45gmdbxrn7ev06wqm9rfurlrjnotvsq7hc7i95q3enxrs9kroo8up8o7x1rfy473bu444wo01qwbqen0yby86gww86kg0bikqtc1x1ywvovr5o8m2dxiva2shk8ajc22b0nt67e3z3vasfulfzkiimaxjns1d1f64tbhmclv3tuco9x36ueuhe6vrk6om0c9s5l07wlxwthsfm3hpi1ymclwtru0jplcibgzcahw3h3clv3jfowadg28mksxsnj4wg09cidqe778hacemwted62kkdraafd1gof419v97ruaaqdbhgovvvg4x2tszbmgzf4rmeyo9d3prpnx743rbfmqonwa4yers70j0r47w7v4lopdpxlrrt7nfcuerj4g8sb8bn4xhune32nfw3onsi5mzwy9gqkyx4f2pvdlk19nzxqyluoq8h1skk1zkik01gvcqxpu3x19rymvarby6zf4tg7qw5tfh0qpo3qhiztpwkbpsoc4pvlsnxsrs5r1xf3wp7teoxlx3dv3itz8odaroo2032k5z56wdsk54p7of6e0vkfu1a9nck6saeiee9jc4hnsu4gq90xc0zztrq5z4c8padhecvtsar0su0xcuqttk39uzssqv103bkkufc',
                redirect: 'pdhvsfx7zaeopd4re88ig4e6ouw4k4njz3130esnv74qzqvo4vniumrkicjl1c08bpefyhww47bgwy9e8m771yybq97w3dfmvhu4olijf2pnthnsgsc0hn040xhpqk9zudo7er2h86n34p9zjal1sla540rk8rbjdiny8kc6gcezcc9uylugbry84937brjk1tdpox165k7sgo1te6flru2bdg3c33hqcuyydfnahw2pejh440g4q3grjc1ubk4bf9gtun8rss7ihikae1jay9wk48lu7nkx880upq7sxib5mtgg3wvpqrby448c6jvoyrdd959t7t75yynyew0r8spztywjczskxjehbrqh0aq8509vbvva5785jkwbjok9ebqkygl64s0bdsjxaoalkr474jad0zbo49htb3m8fh75pw8ofyy965h9yg50yxmm1q5u3w18wh1e613m1m9ir6gale18kmj9ai6z7p1yj2dzla5ypaihi4cdm6e3ubi3b8txsrsukoz1qkrx6wuwbkqnop9rrhm0z1xm8b1uxshpyziw76p6ptu3fp91k609cjfdq7nmp1e1ujt74lx4blmhmh7jkjgiyorrjhim329dlp5uhmqgljkdwud196khq1ptf0v11d21hdgzwgldoqatlxa2r53rt64uabbgydw0c29qr6nfqd3l2hl541r2wwwaqlk6l02ei3q4psuh414b8x4csr4tz6cycps4oijyudipxd166u3hwdt1j7s56fuh1djpzg5h7kp2d9e2lhxikearb8dnrnhfqjt0jx4gow4btcm3derwf1p2ijb26rew2noci1ott997pdxi8bagvi9a1kcy2zp63q2vm1y3ry4r1fbbv4sm0gwj26jq64lxyhevy0wd64vz10n69spfc7lyxc2l5xb8etdy2ac11hys9kkv3a1czvtpg7yclpwuo4zr2ktnl1zp2gy7elri7fybocxal6cc06b8f1jpxb2s81chao414tcl8enft4mbo9z3gi0z6c8w1mxn5ooqp7l1wkq38o1olyuf1c9c3lin3qlxwee7l2b21pxql3rm2p6lz0v58jpm4rk9arwt0s8h7bau97xki2pb7bkiw305ol4oloqo8fcnnqr0yazmirzbu2nzbomhtrdgh5e2e5gjvh2kx5u3952w1uzgkr3witmke6ldm0wao92oq3w1r4u6hs46e3orv0atemtnuzwhp7cz36rcenv5t52m574t8hcny63q90uoeoin33yz9e9a5npcvd3akhp7csfd7qckk24cy5014zt71xz3ydm8lbmak1n5v4hacmhmazkz585s5qyxouxk5m4xeoxcyexu6z9t7r9hn51l28xcp9422au68vrfv3cuy06cvnuwjipofumkhkhvzw5dwqp9vp85m4boskwq27sxdm0haspm9d34m6uu8hgtp51kj2rp5ty16z15wc1we4u0n8g4kkzkir0c8wxls7lpe8ghiqiujsyd0ez16gofypt97ntx99rdmqer19qon6zhfoo3axmnkltc4am4hymtuohk2jvgo9vgk8rgi86tdk3d337xy0h9wofx9l7cplkl4ogdkmj9asnqw399uzubs85v0e657qddtbrocp8mx7rfx3eqyac39k0quyyl11wjv20bndouwczhwfqu3q78146wisgerfpedoovwhz7pepcpc3lhldze23ma2uow54osuzmnl94ca41yt0g4y1lc42qm3iivdrti1q4suyt0sdacvr8ifb737ghkm57mtvplfq6z4kxbb0w37i483zi0eoum5mxm0m698eu4sdhr066vkwe2ilqcq36hxpqtm83sr5a621h14os75jx7auxwffcqi8wtknagtvjlkpweitt7ljqf2fg09lhyq178heyvvdsmlv4sbd29b6le00wsdlnrsxr6hwfzqyr5cujx7qqpi2qcok1yi4q6ggxjf32q9u1e1l9migjsui1n665j6vxefv6g3mpwskwbdkj2cib',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 7768761810,
                expiredRefreshToken: 7840793629,
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
                id: '0k6adajmcu93cnerymtbgc7c5rzv8d55smdei',
                grantType: 'PASSWORD_GRANT',
                name: 'm3vckyy3wm50png06hz2rxtdjzejzrr2vs8rz4sl0bwct2pkfa3vjac3x2srt3xckewprnj3udbxcfuhpk2y63mmirfvzcb2gmnu3z3oz50atz56ubg5z74376bjjn99w5ur97ecinl6gcbp0thluvggn9kwtph5nl3s5y60lzm8t162ecj0qlqwzg5k0zbupqqq8dhnfv7wcgsjiru9zxgx5klpy7xz50zkwh3oydaeuert3csumxnbibpvf6l',
                secret: 'p002cljnii90k8tbplrwolzkm2dhornpl4esqoyomnzx0y8pxsr4gfsdjmtkbyogivfulwkkquhwg6fau3xlett5ax',
                authUrl: 'f4a5jftoavasumvvxm25eipmh9iiqa9hyb2ff8ou98majn6ktevvo1dy4osbz0uzlktjmd712nxqyt900x6iyk0ygja7yux36cwwgxdygmpkqfdq6wxgdu4386q7r09rau5k9l6a9a5kko101w7p22hacwy8mokrdzjy0h8ocu5axx9mb2jngas4cukh2poo2bpu9bwj8vog3mehb7ot2taoxzzuwohufob8p90wzfa8dwaeye9y1w77dqogkt23ioqnlbkak9xr0pr6zovwldv6yb6iupdx1xffbrvgh4gsd7urid72sz2yw8tlguextarb8ycyqp1ym1fbua848o6ukhosilm8sq8iehy3egzmlbapk2rg9gc3chxuhzbrxgeetfeltt382b8m496752cytjxt11sj2ejzqq4isz7qrjf8o1yv5ao88s5q7atf5thr21u1z8knruxnd79e3c6u19e0ehbp2gj0o6n5205sqm7ohoua6tzuaylubpuhgnh30zj6mfk3qx44s2gosl1g54sl331yw1irxfaeo56bxw3t9youl6mvbq99eln8ddsn9d4nahd821n5cvj973oeslu1b7yvtjgt6fs4v5cmp3lz8lqzrum4dix4ejfvkiylynra8kcszhj5loyxl9r78vk285rui1fhg3p2uentoziaulqk2vb7zo26vok826vohynfw7sgrhgp7u0vgoz0pj2p89kv7vn37u4cweoc79tqr77yg76k4tkvpz391x8wsimfu1ntuapmicp76n6gm3p70xezyfzphy8yhdj38xs2v1psr8dg65hl3c1k0p8pdfeyyogr16rdb8i5wd83b0uiypkfhijx3fz9pk1qq0k3cv5oyt2djb1srzbe2ko2oze5nqalrzx4uu8s0busi8iw4r7pojiakg0xnwjk51od7h212rmiq7538ntd30cp4yf2srb8izmt5c3rtw0f4l9x7ae3p5g2q1ue5iogckt6195430snuylyr1a9fmjdbrpcv66t95yab7pl1hg2pkyj613b28epzvebrqnopwfauwm09hufs5antluf8q7knmn5wpplkgnqfjgquswb7je4dj2niz077rd8ufdemgylpij9qfjiohfv5n724wplwdf91qz74duw6u3zxxnv8xexzm9sepq9xychajwnj3uuaqczknk6v866lhb68ju04yjwmlbv4rwbvdxkunk4oa1ppazouva4p8r8pypsklb7xaplxi6ffy4zmgvz00dggcqdbu6n5gbk6sl43d1gdcwrjcecowez364rp0zux3t0gzjbbokx20t446qc01ng94b6aqe2kuq6onw8gpfso99u0paq8xi90434fky1j3nptph996unh7m0l1q4rh1k9kz1tyq1cpqyvzgcp5kwtsdiwaqper6pdflvmrbzbfgkwznlor21xbw39ghotaklkiajjlffql78pv74v1pkacil91649tggucd1p41hym0o9mg90nbnlg2vdai608mi3ckixshvt9g5nnzpbxnhgpokkur9w294vmpfrzdihdnoife26bnkexrldya939wasmodkzklmokzf00b0ppven3gxjcm0sjaopxin0yhh5isjtrr4lz9rugunfa93r5epxyxvwlf6yyos3a137kgwazkyr5wjbyemwafzxvmf3bsnf0a4gyeulxo4egih6ft88icfhykaec8z93lnl1vmwkg22rp8jk8p3xf3tohxdaz9rbgotbk9ynt5l9vh3r16h4aojepnz30x1cbpzgmbe8zf3qrh69qnzstapquncraaxnj427dwd2zcr93ycekvygacdeq75csd7wluu3tgsru5qupj8a0ndx2g1h975inyl60sedt6vjvmv5toizfi779er09dr6eca9gfzmvlkn6h996jm96vy5y6s2ug1a4mrw5uoxeutwyquz49odvg71r7iky1mcjkhe3gunrjmi0axob2hsiz9qm5taqldjzqx8wixsivz7jztf6',
                redirect: 'hgzz1zd1f0mk2g2hkvdezbimu0qhi4g06xigo3yjjve27kxkbawcnt12e7yxs9grzt8dmkatvhqy0b73hjeiq7957zgulm8cqduej2umjyhwv45t2i69jizcp2s1zbn916ufxpnuqucurpumltncpl4k1wh4rv4x3bv4uol2u52yv0eofy3vvvz38szbouviraaft6dxx439myzbrtgwle6t01192815o67qno3g5wocdm1bvzrhq3leswy1fw9vh1rte7a9veayjufje5syddyws19vh4yutm5esmg1y9623tmv0yivigr00qhfxucalfuqz30qzed6hctqy4yqujjn1ghljb5xlpnl259khrb64dtvigxngr48frmjhbagwsyr0akwlkufc8b3ly532inq1rn7ezlf37nhgp3xkvzqafpgu4uqi5s8d6tud3ycnvhb44g70turb9mqadoclkd4pycv94g0hwad47r8dpt4r3x5ys7oc557mxkg735jzsxsplcp6gogx5b831yaaalfv1s8j7huwklnk9gi3st3xyc58e7zk647h8unh0m6bopma7hnm5kow7rp88781zd1ufhcc4fnfuif6c6d09wffomdn34lkfwby894moyrx571vm8lxq9ib1moa00wdixkc4bm0mjjdmzd7dd67bz03v7qcwetojqkrx7iwkzzwe5rne5jo0xboy7gx9wyv3xraklbpiqpuwsoiewa6wnsxzbuol77ixn1ml742htu3107c5fenaq0dzu6smot6ae6dgjs4sxff01lam7mu3qjwdax0hkpyxz2t499apnxtqmp04rc1x73gadegx68lx2b42k01kh6manddeze5hx61m5s86mfa8z9srjawji1k60jrio7klccm7ecn4enodxlpsf445q9ur8j8svns7p5sv43elul5k45qzyda4ueawqeim43wjne3of74ki9hz24ydxl7w2jnfudryuv26qaetbf9vl18bjeku0sn9m52aywk97ndhplxgngqxfnvnyt81fju2vyd8na4z9r5lgq723ucgymf74o6ax7w7vt4i8xl8tyw5infv3gemzxq4ucfc022q792p3idwoxq7pyn2xzulpad9uf8bqdkpx514vzlwf1gle2ymp9pd3un3335lh8c66zlux9z3t5tztvcydrb1ck9mfferq3cf58o7taee9i4lt01v372oqewa6ec8h4wjd8n7awl0oimubj5fc5jkccvrnbxncnzujemvmrsdvuxzxyjzaox32lcymhru8957f4r93nqstwvoigt4kz4ca1l7bsegs7e7uugc4ax9k4ciz1xaharavzi0cm3pmtcoko0nwszbq7onequ1lgag6iy5fwp8ekhci6c0289hnxk4gdoecd546ow6jm8wo6e6dzm0q25zlprrjxg8ow48pnr9zgt2yqd5h6ax5jkgobn3h8efhqgwnaodtuah5m7zcj4g4wel9atihntwwxildqoaumfzuez5eq7c3xvi35c5ukbsv63u9fj4mkmjlpi81kpij206q1cceaowacs431qeorqlrfrvjsrkexb9fd8van7rptf18xp44nr6smgsjjfbtb6ob1hds2tncjlumzastjecc3znwuo6my21882mhcdqpekih8xtga5vhbw24l45m154h5j5fzg33u778wkbx2zyajsnjcnl0829orj4u5ibyg8880nfofx3b8t49zvtsw56qanbkc15i27t3v4nq829dg2p920yvktciu5fer6icnjgw9qp0gpyximzs7eua2ez5ruc05lhzx13jcx4ig64gqrvso6pgoxm5uxan73shmqomi5nt1b3jx0msbwdiqpzxhvo0vcw5bd7iwtv3nm0n431qe6d2u74f6wrvgccsr675hfz6xcfrovrhhlsif8wn4mhmze6bs2378mpfq2stqu3gt4emtpjg5e34kffdz48pb6blsevw80de7oxz7xklfmzglel32xtdvzh6zrjmwoi4x',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 9578678450,
                expiredRefreshToken: 5955331716,
                isRevoked: false,
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
                id: '404d2cf0-0044-4be1-b316-7b4ff5fe41fb',
                grantType: 'PASSWORD_GRANT',
                name: 'zds80klhpp9gg9x0dgdegcnextxmvgnjgtpk868iaoxtt0d5tgw8b8ha25at3e1p1ujy9f2v81tctbe79krhe4tyjy17lynyoqootcctdgp7ul94uw6v0qe4xvjkowsl8kdw00n50q9bdwxa6youizf6wb9hfb7yz275g1tgxiqokxjtp6chldfd9lf488ppvfi4l2unir5ixy6w9kso0z1fek32f8ec5332sfbzb0ryv36vmb2u67hzix0x8yk5',
                secret: '81sucb4of4f7p3530w7y5wu6sexx29h5k1rkv16qm8s3f7x7528txkv7nis899wo5yuvn8aztcfcjeb76ejx04fp6f',
                authUrl: '5m1cf84tqlktgez1lbeuotj6r16tw7ca85g47h43raq0eqy1hbyz5q21hoqn218srk6ggi0rwpeivbjiu0zt2ltog19rplsq443cz542zot5794z773sgoyo5iwwy59ayoegnhhan406xu925cf8o8ib8lgevp7tbf9h2n84mxs0p4i40raxix93s7ixrck9gjglhldtu6n9khv3rz51zqzd9za8zxbgvxvbprja0r4cqm9rrmi1ydyx41xq9u3msdw8wbf6n2n2d9kqset1xrsjb2zozfy9kzkefjpawy39nzesbgpceaqkdcrp1xfrze6gxb0x6mpdhi0f4czegn5yl5wewr6aldkp3lb4ap3myto1rnxtjfj64gzgqi9lb4kxm50x5p4qsw7o5pteyvgnsfc8g48wny2maqyenzljvm3npay2f32h1r2mo3hqizzld37y9cj0wsxkc8dojgy5je0nrbavv5fsj7ou047r8u45m3h9l0bapg0sy0ogbfbmv2fgoln1a4j5uh8p233ab8dw1hjbkjm93c93wc7zie91hup0uw7q780c6bg1ro1bze8129b32lc2giq45a0wuchciv39o3m0mlm5kb3by4kmiqu8dqmivttmeln5v24vtmnrwnzlvdyb5jyvtmq189049i8ib6nmptnru4inx58uwnca8wyxckdqurudxf56vbelygkkskelwxe9mu3144d9s6gdxx3tb7neyt6fcdhtg24rbta47cuxzulcwtgggpdjhhg3yj33tayngophlfw0ob8ltx61cph0iajpm67fqpqn0if1hhx45phnianc118xwubsyepmhtl9p8zbmgo18r7iwf3a299ul4ggted7fnko15pxrqwndanh47vak7j73jqi9it2z5wh0zp0zn94mwyh1tqdy9cljn0p4kt2xq11hrwatkvjr8tdp9jibjs9s40fa3cr18wy269ugbx0ra7fxfahux0dvoj4us6om12ays1bbux4bqy44vdfs8cb147yaeg0w025zl71pu2s85ns6m7r9brsqjgctwf3d96ahmk9x35639p199sq1mkt8iamhf4m7904xbgyc8qt2jxbmkbxivofjj1agceoirkfzaltqab4n9vb9c5buv83c2jhflfs6dw59n4iys9k3ucbb2b1hyss9sq7tpn2rfdyb6bpizwh1a6tsztfcw974chcvdaxp4byc1hk0fdt5adxs8mlwjlrg330fpyoyhsjg0j0q4azqhgs4ae4u33ug0kizn3hx6rajn3viow0zlgpqi9kfpsaihgll4x23hafx3ab0n903r4byr3ta3mpm239mf28fzj9vsjikubcbnv0z6qgu8tpak9foh8qabqiyeyrmff7cxssqlq515h7wjqly9bb6nfm5zc1egxelo0zafjdl1x2sfxfi4atj52isvvgnydv2zixyh0a1kxrozije3peftsv9f3vbsbbqe04jtxwk4bmewhmxwcca1nfh8ctxybj6iot6bkkyv928abngz9fm98m3tex8xg8kcqeqa1uy3nwm4usnoudat0kdaj3soqxa1fp1xwenvfztck11gkr39q2hvlqfwme0s6rfdntq445va652ueoge58bs85youo8k1ai3hiea4all58siucqqeywek1o3hbkm53dqu5e8gbxmalststqye7ge433gfypfca94nsmgoi0endwrov4jbkwz0z8qaeoa6twag33h4fci2onvah7obnpbnvc0w5ucen6owxzlfqxnd6r0x64kfzgep6yhnpw4yuqw1vczxseg0x0uup7ux6g2mpio0bi6ppy6t9ydtphwe340ucjpwjvtgxiscfesndxoffsvnh745d38bprb2n576bwum7z7noavbd03z8esewpnp3ocqzmahztigoewg5ur7np00le9ivtypv84696c3xagfceqpyup6qo7e27q3yqbwkyqunnsu5jn7ruapsn7yweb72esk21dg96mknhl3qo9cug1qp',
                redirect: '20mybrcbgho4s40i6ubus28x3xv1ezqd9xs5jkjhmltiwexxj1s1nllcbvvd3s4hunet2jq5fg3i1ah7jl5mziget1639s62tyawszd496zm7hiisk67j6yer7v3wsx4ae9o5ns36n00hl23egn7c1pqwnzsq62cvn3htegnhiemtqy4qxupd2959seh3u9mjvpmo59wkgyi0yys92hupayzwgn85jo3clpmpmkabge5vvkag3n9tr3uq2raih5y9muyy1hlgejxqs7n16fes745x9grogbdi34cfootva098udi7f2ehbego72ofel2tg80da6cvz0i968zj4lctsbspq415r2m3ftyacfda7cu6i29upmsk0vwcf8akkd1gq3hq9izbnfz3pk9ftnbg1wfd7eqfs1uh12xn2nxzxp27lu7229sfob1rohs1dy8m7ahkdy0punu88bc0lsxgiexfwsrglt575ozwwu4fh6p2usoji5vbvt81vk36w02jano2o7qd2gjkx3hm0tewgkj2j0yw021oq132i05fb3idii2fo355bgu3d1l6sw9bsuvwvpfa7uwtv7jj4hfb866r4u276meowbbuwv1pce52i0rc2mkbq2xvykoyvvi9k0so7luztq2z1mdmj87sbijwcgwza78ueuzi5y3y3eaevekduqru3kjth6n4xyfnoy708byo6dpuu5iyfz96hp5usuv1dvfwhl57bkjnxiwdcboomppw3go9epuraze3rib1vafgsp39hhkddewhw6iw9na0hr8lt5182404zb1buhwom2819da5bf3ecwjagzx057906dwuzoln2nj4qsy8zwvujvonidbp3z0koutv3lc5zspfzb3vllb8gf40qp8ewrbbte4ix2fsfwubj01ytas5yitxhs0362miwjwtk4m9ik5gxndbc46qb3xtz3tziomme044etxul9gpehfettx6xbr4vtrull7t04mdgpe7h1p3sp8ddno16txq7pr8zywds29zn3eaizcmd3je5k6n6u6u5xeymhse7p3kjildgsmwgwtb2fq6n9amjdogavgktc16v6vz98mwtivk4i7dsd7cayf5v69w4heiul2qrg71k0vq0nn8p25k9gt3y7j97r1db8q45h4owai87tlo9uahurbjsz7u5r0uv6ooxyzjfqtehsocny9g2527gtkywjxizj1m8i4g6hu7wvfdkw2lxha5j8cwtj7r9sk95cg3yl2fuz3iliprlykd3rvnwj117r6r8hh3a2u7da72cogyddatys7bq0p86y4aq6umxuf79i4m28tfhv26d313t23nucztnifa0u3g5wlhjpnahjr3q4o7gek28j20qyrjpkyw6nkq0xp5ponvj8r0ipqvv1o7rcuotol3qp2pawdm7k979nfezbb2gmzwer19dj2hdo67g7q2m1frw1tau2lmohlup3y4k31s6jildqgmdlchv8j9lp64igfr2twxolyh2n557m0qgxf9vxi7dbfkzue8y22f09aplyfb3wcmnkk0v9gcx7t98z2slshay95wncm0tkwj55bj8yi1unilkbrl3x6wmj19vht8uclzkdp6wqpagbz3yf8e74rnzbtxfbden7eoslo7p5o9vhn86f1upv9awsb3024k3zzzxkudje5z5f6eupcewf1warybwqaxy5xxgndtv08rkr0m8zhfcfaw6485mzda0hdpdciveonwo73rpwnotwdwiflahzt4d86nkphsk7bl6usg42j1spg9dz8q13kcos6c44xbutss0ezfpwjwkzqni44byafs5z1onib3ei4k9amvgvhqdviojkopenfzp7qhlh26ffjtld0p9s5mggbygx2nj39302twkx0jco58f78mqxuzx0vpbzgi7ngnahg6scle0bprlfyy88xnr0prtkqykr0jdjzest0erhbhti3upybgajw33a6jfo4ur2puwtha56mrd7vhqx4mheysmf5s3qq1m0v',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 7939552884,
                expiredRefreshToken: 5366219878,
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
                id: '404d2cf0-0044-4be1-b316-7b4ff5fe41fb',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'hrh3pqm5zsoqgcbdpjxp93ob2o3l38vk2wowu9btic17rcmlztyq1sl9taovskg2qmd4yjmzb1lw648skmcgsggkjd0l3fqoxb320z2yxhoizpv4a11p1kfppam7ci90sj4a68iig7ujam54u0egmyaqqe1sl2tgdpgfczp9hgz7hpi71c65ji0x3qycvgzan3qodeofejdmu3n7i81kzpew8czpfxjaa3ldoeb5rg922vyx4vk9vs4jn7fabkq',
                secret: 'veh6j39v6xctwv6go8wlzgbzdqx2wn8knprawgbdo23ibigszupk7llgzjkxfxtad61vlh6kfgw6b8b6gyutv9gkalj',
                authUrl: '8aqrzl88jxhvzlbk42vq2cbrju4fd5ch16p5trw2tv4o8bmo76p4nlu7payqx3xuffztlxtcasyk4ypitk73b31wnyy82r78wvkckob380p5ueth0zx5l44jtkx43g07jqx9zg86a9ysehwy9qxxp56ne4axtlyidzuju294g865vmmechrtast1ywrx6v17e127oqf7rr6w3klcylgs5i68q1hitrjkphqahfs7j8m65irv3ckhcal6klh4qwj07rygw7u81dxf4sjhjy9eok38xrl351xdcu6vkobbox28yp0c4kyt8zbr914csz0scrbam03e27zl8j43zf60khurr83e5943yz1tld1h1y74psqwjfhqbsamji4rw524hs661zl7wgm5ajsz8civ7rukwgo80g2v2xuza9cubhdvlzkeqqqlifn70ty4xvzk9edjnmbvuegfpr6b4iqiovl2fty6juwymjpsydstgap79xulozqutw98w69rigbqb8inl8tdyg0oegudz2vd3s6qhswi8ofcmxmbz72rzh9975buh0sxuv8tauf59nird6zdjk8yza83crkoc9cnn25y31ap5pdnydsm207wx02ir9bmkvzn4gd0yfi7oj5odpiy198guc7l2pfu5b3rwzfck0kjuav8ylh95odpo5f91xvs4hvyce14oegy3m6a0ovtc6b6cup6e6nsr3tep9317huyv105ycpi5nc4gl3lkjpwpyoj9wnugmypo08f0xu36i6vww4jhtc4j7ze27r0zyvr0gnfsxvfcbobn834doo370ucrgj3x8lanfujce2gwasiychgzyg585fd42dh0i4euq8wb4fjyr8gjw0btxxjxh7f7o8e63rwflqom03hb8jgntydd3pmusvl8w7dfaqsqexw6rtcddtur969gdm5py33hs6gswevcahyzcjizbyzmnkuloh33gr0z43058jyejar58lnplpppoa7nxaaj9uqovj04ava6bs4h8mghugwlr63i28rh4ytqr75szfl0gc41adtf8cjw5wi18u4ktoo8nto940g3h7hxa22j37yjbenc2tvksh75yu3zdt85m07sc2pif6glbmtgxt28owhl03g2tem1br1bme6jaxhhd192hfo07jwj5u9vt5r5yftiwdmijg2baylk1vkgwqb2np0pyw40m5oex326s99qmuhh80oryn0khaho3qyhuh57iv7ehrduh14nj5iycjop9bdvft8lautqecchv64rvyv7xo8nzf3h9f4acsqrrvihd66nmiqeopv0encwgpj5v9p6vixpn4n2ahlfng1pj7y5dxmmw9r5im3xa2h7yc514vehxl0psfb1cbajngzh7gr0us4z7ob8xv1yi0hbv9vxwh8aqk67kbyiuwl43xixta92ir0tvqzque0ase29k9kid4l50y3um6ovjz6xqkk8wlnkkjyo7ajmqqsx49x53o7tes0frp261fu10ybhkkst0cx76wkmgw7t8lie0bv1cdbjb3ofj5ci4p8piqw06blmeiiilwup8yxccq1evimwwel3bor98u3q4u8xu5g7tas55mm437d1hwjhxbz4tkcj50j23sx2tyqjhlsq0yqbn2b9mx1u3d7k5i61uzqox4cje0qng8yy28vnyi5xfomfybw3l581imdhaca50ik5gefxwi8epmdf8mqh9dxxrxasglxqdaehpm6tz1974bp999kzcc47ujke6parf2vh9ulasky74ymh124ueuxmy6qahioy84my4x92m29365bpzz2il98bidthvbybi4oi45is9zl89335ko72n7ebl3xfcea64bmosuv1b8rxymuslq9wosap97ka7zrxn3ain22wjac9jc5xaun6b94izjgoe8c2exoyza2ndawz6rix8sw79ihyvs0gz3g4hvukd97bmya91dggk17jt2eygzxbmok2g906cb1atadcj8zbthjtnvv1mjg2zk9opiuosi0gi8e',
                redirect: 'dsizzf47qyvd02b49v08p1e6ayvn7fvulhkcxo9muzm3bz8rj1baackynde5i4khsihcgjtjg7l585cfjw1708f9uopeuacrsma3xyp5ddah1kbjnuttziw97kk9k86b6irlmz0phfyk48rs20oy2q7gdlqd3aslw5zhvohx0pxen26i0h0lf6digyta0go2poswqvsnrmhjvix1gdgou9kzfov6rvlqmbkjcc6tvdialoqiclzphrni59aq1of1mfc2i5ncphgnerchzm5crf2vdlzqeivfbzf10jivwvw5zfopyru3920ufb2i34qk6q8ippdcnqqxtbix3cek0h54kqgzhjbx3y216dhrsb6hg0sknn66rb92i43junt6btpn63ct3j7ggug6n8yla76xj6jpap4kwb4n9marh1gt8vmibqlthh4ylwdzl7bfvde6mha1svdi0bjduuvwhw6gy6ima9ba7mfq3110gn5uts4wnp7bnz6sz24qlswltzn6z4ndnw8rq1mkp4rfsv5s46uig6owi3t2fa4p2px3ncg2xr656y6g22bvyepdbjc66aw1j2c0q4h2rag5x3gt7ildixxac3s1ot2nav7kcg6pbokvvm4n4003o8gr90k6mxxoyp688h2v4y1vgft0oiiben6sxlk9yo643coq8qhe3meu4k2uutvslmgvzn36d3vk9x5gcaiyh1maqbeekesy71p8wnoocjxk09rf8yrnqtn6lpdet5slsvahe1h3ezzmal21u9mgmbmh043r4o1xbux4h4q0ur4yo9n6a0o2daksow2pxf0f8ijbae5d97eejfix36cx51w3x2j57ns67yciuqpzfxfx6v21dxt74h4g2lnt792ukvyj3qpinu02z9gem2yvh307h05jt6ozrwbvoba8x1m6r8jg02k7ilnle35bbz5j2bs8vrt4z0avknqpgsftrvrfck2fxqjsu9caysv9px8936jmf8pry6lft7h7kgwmwyuoydfss1k0hrjcgu181x1ohn18s0n0t7n3zp8xx3yfhjjf5hu22pphm471bi4svsep0p8lvkeejn7cn5bn534c3plryndpixfwmi5hl1erupup85xltabu447cytpyd8fh95ewijvnu1cwoqwvpsqc93vd9tk3nfwmblabnp6zqxwxhm3m4t1arespf5p398c0zpls6aoqzggdaeuh6zvcyrpkmdrgvw3jgl5vdrxs3mhxmn5jc7buftvtrv794cm9o3bya67a94duknkvoc0pembw81habp8nb7l9hr0ps7pnalyptljarpmmq2rzcnpkl2o453i59bykr9v58i45uw5f1mwg7t4e0mpdexifh14ybg3eap60fov31jjzmg5t7m4z1b6n734pcy10o8oi3defs6s6x0tifholz4raxnxxfay7fhsbmv9f47lever7rlasys900jqurq5pbtulfwc7j685vqa6utr2kv1yqbl8mnwtlqsuiunmen8ti42l3xw5y3k3edrby2bpe4hudjq6cxyu6sq7fn3l03zqbz3i0ehr99svuchzrp8kzs3jr5xfv3f87ojs8fdykv6tz3zomj0dl1l03scbzw0kfd2bx8im2tw0g8jwclttbkwbasacmekftvk5gf4prio676ikilfqikixgzb76pstowskirfcdghvbrxw12p44czqpmc9fu59mublos0t7qt7bkaqq1i8xmmu5zieug3wgv7tjj5jm4a4vfbcobnrne5pk4b1e17ebuli92ioev38dkj2gw6vlgtv8w753l65lhqg4uho76hwztenkvusk9w838gepsnm493mi6w85uplqldxoy5k2u8sighnw833zw3x0em556phonq39rmgdphvnp4jw8014zz6m5sdk18qxavl8fcje0ilnipa0opo4tm02ankwwab3ct06mqkal3laclrndl9s7tad6sgytgz0cwc1pet5vmar5c5x2ai3zebgiaiwx40wocfc87hppin',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 9401377791,
                expiredRefreshToken: 8892396869,
                isRevoked: false,
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
                id: '404d2cf0-0044-4be1-b316-7b4ff5fe41fb',
                grantType: 'PASSWORD_GRANT',
                name: 'dp34ogluenotxqbv50c8pcyvkkwn75mv6xq9f15t94j74dvldp36vjih496wxrcohordky5nt56vx9z0kz1nqb8u7mcpu1y3d25xout44j74etuga9bz1af0pssy5xpg5b4pecyv2xvodosqt8qw41veplfye9e65rxli6rnckfdbg1ruvecua1kqzgs3lgiivi6bk0pns2x912rjdi1j1hj29eyf615wk16tx4xz212la1jbc4b9jqfz7ktsdx',
                secret: 'b2rnxto4j70bcu1dlb01mvzyf2s6crh32rk23bcgjlputr0l8hfgfw50hj9itxwgzszzqo9ss9pydi8u69oxocorcg',
                authUrl: 'fkxjwurz4veq7eij3ibzoak4aumy8cb7ysxpfsq5jieunpfs7ya3qtalakveursj2zu546t9mtrxdtuhwh0e2rwjjz5w3s6ldngmav20hpngz4bylqugvgzle16z500jjivtc746j6qhqokej0saw3wnn5jjvc04zpl6bi5ke5lu3w98dpll0a32hkam5hh5zbuwyx6g3lgktk7zm8dg1hw1ijbfz4dx9nx5w5zats14jaggwl6zo5f42jys0gu7c8n6xps6ia7rrrs2ixj0u6fu66jthba4nms0w60ahxzh78ksa9p2zx70rfinorn9tfrxftgwbsc1sz4ati8vmv9j5830iez19trp4rlhpy33wenje0y29he9xmor7skj4c69xa2r4974ht5onwe5tix1xkab0dktfq1vya19xdemn2k6lt3c5p23oxmzz6e6dhv93vfb9woqbmzv1ykpzscxna9ja19hadcw3b3xp4qugg182a4sufqr0ja3tlc597itzqpkmdd33a8jupyzdzckcdzyevjv8msqifl3gn9r6riiszni23hf3wbllovbqn0n4rmz8hy023ugtxmy2f78jynuuxpa9wso6ebubt5rah2jzti6lvpxd60h4do9b0wzijttge4oetbd1r9nciv09z12h2op1u6p89gh9aqfw1uf5p45iom4dc813zxfoqj5c31fp7ju6lpw090qiscc24oh7drm5c6sah1fqn8j1l3ak7ent1qffl8emm5zxyhuxdqh96xypv6hi9lv08y477dpl3vmppa14nnzzn1se2qeq24y1h4nrxhtvxi4pql2zc8u9jvmhpuy5hbacvgrvrjgn0bcg5kio8344xnycvsi25l4o7bd59hm281lrqkwickxtvubh42wxzvec95uuw1gzbn6qav0xf37opua97b34z4l5km8q9hi0v8npv5vbzlpfk6yumxbdsy09jq5dfbaqezt5f8ashtq2p3ignw770nopa3lcetdij2y7a4yxumaorg9r4a8mbho6zh15o94q6dy13iar5m99d4yt178txuziitc3k33tl7rpeojrubrrsvnj1vay9j7ijiy0k1ummiv6f3144mwj3qa720noc8t9cijpqh3cp0anad0e5plhidnlf4v4b3pejqs35b4zmgurpxkjko0z3ahua13p1v3ze2ghxylj9pzqlfqr9whwkui1w1sg0f1ot17y23gholywm3ev0yiw8pb6xp1w38fnshejznc9onezntstlu252hbs6con81se6kz2gbpvgpxu87dc7k1oa7gu3w5h7u8zaamtviwn4xfezxkacj36zoj8bnvsu5j3ztd6yv2hed5tre7y3qbmbmvqxmiw8y5qg03gxi8sqttal848tltzuuxuwfp26jif9cbqjo6oc8inafdwbijc3w47yojpjh6082apedex2wjs3q58hk6slu8w76zksb1bbf0jve2vnsf21c9mj3z1k97v0nzxnul2ldrnuibmyggwq7yobym02sws8u6dch5h5vd08pgujud61qjjp56zd2bsfx8gcmstifqwo8j9y8treyj0z5qdgxhm2s7sbh2g2ks82ox6zm3ay52n83wia4o4ec58ewczyfyuca48tlfifh2f031tx3sel5w1ot7498s200doyy5fk1d9kkmc34pydxhwo5rtglnw5d8y3owlz7jl37v3bgcb3g0d3gjq7whu0mf95uyfr7mjxsg0aqcbogr2w882htfbc12jsvo83hpnf1wcfmng4omdgy3u897wpsx8v3rocal4vuaxg8xkz4vkr846drmwgg5xb6t59ik1u82hkgwaed4e6ki3hzung4sgpwwqyqcdx1by7sk5rlpe44spsf1mozh9dxkfzmneg0263d6vp6wxf778kwjqddq7sbq21cq0no28mta5wl5f28kl032uyot3jp7a9ktiz7xochmat0mtopa7ghvw5n3ps1krlzjrccqqxfhvjindq8q0372f5rbf6pm7',
                redirect: 'mso6h6wi0afsq3rgbc9g48p6sxazsz0d3ntp3mq78iwvqpaxq5c2ev2w8i2gjfmgfi20b79d77z0nr313euc3xbjctlg5nt3k6fs4nlhejdmshisbjdppi9xw7z3ov36vhzho5dd6imsco23gde19vl6f8hfcsszjn4rzhqhv4u8f4kfydot9cu6keqt2jtgl14kjjjeav1jy2vvebzzapa3mtxau76b8v7h4rbyixqsbd8kif2d3twpn1h4nxqvedtpzhthtud82yz8mx0s68dwnohn9ekn02ktisslaimkssa4ow5kzfsj6bfbk53w5ptttepreb46mtrzg1xp1t5u6bg430yu74v1rz3obvhjeg8659k60gdsn6w4vpkvu8o60hu2m1d56541uxfydn5jh8nvlb8y383caayzfyrvhfkzy8j3pw84w88z6zfl6tnqw0a3ua9ke15xy3istq2e2lz1of875pe3j29wah6cjimf8hhcez0v7rvtipdpdms6mr0fkoe0ii2x512wqdxlvuv0ziwizr183qqmsrmyy14gpbovqad0ouocrzsd3lz3nyj8mdopth65y0ye02eej2tmg5tk33mh8ef6bv4nn4vy2m11rtd73utzdbj4tz0m5zf2as8hpdi0dfhpru28tydxq0168es6zlnak02nqysuqy0q12ll67unpwtvede4xjjxmopk72u8nt4vb6qgmzd5i7zw8knniypbaw2bllfitxr3qswllgaypny3wvpbvh0bhnsg02kyu5jzljxfzakfabxhajf2iwywxvlspx0vg50g9lbzyd7uvwx891f2262262qnbuuzmyma9y6bj1g1mws377m41nbv07n0xjm9zr6r2zsw2gepuw34e0zifylfnj2s3wxj3z3owif2xuvoc47dsdiclystshxq4y4fs4dzwh62z0chvyb2zixrftbvx9l6un4rjn64nsn3dnvmouoik2cobulnftep7kktzh51xxwxng5o0ezmxmyjlwp8i3vkrl7cawa5dtku8zq2wfyrbq9f1gva7eweofsus7pcr444lswesnj64eslj6wdsxh62yzlatuifsqe2qgpny9kbu5iz6s6ef48qtbgz977mke5805mqtsi0ks53oky3b7o8vyfs1qjb7cc8vw4atcia6ew1r8h7sfd46x1gbszj0hscyeg6etf21gu7ph9jqwx9q3bde0bdtezntytehef3g9359yxb0ysqc4gb7cdy6x1p7baabu69vfpydsjph72cljtt3ubp4k54qnipmgjpzttitde1qt0seg7akild0qzy2js8y21hbmt3mv5umu3jx7b7wrn6ky7mfawead82qzvxvvyhaee9kmlzlof928od1jm4ifdbi0i0excjtuib0kitirrf8mo4qtjiu6bc0gjyebow2rfykiblarog3ladyceru2nqldzmwple86t4rl4tum8hs7o37n22nybxknrau96m8y6pdxc0arkv0cwkp7ehlmgltdyayvupzq4lxaf5pc5d83ong9ouh7hk727bly36qmw4ivci35ntz9oi2mppw9jhkgzr8c6d0y4yf2zonwhbf12kpgujr8l06wxd7ouo8tdp8r6kawsyk93ed60q3k3rcgnvh7usexw1sjbtk7x2ewz1cou4ztjgryf7lbmzgtxyze96dzfgbr3rvui4j520710drtob8skdnrxrjscknn1hl45c7xz2hjz7rz45eb57kax3soyza0c3ma721r8bz2bg8dld5h4vm7t6evxox84zoo2tq83dpzvgys82rls929pm00i7ivu29zwd7cs1h29moan2uu4eto99no6lnqti91q9ngwotl2nm0r2e7bg50a6m8igk9vpfooh2fsgvonpjczs7fp8b8h4ly2hn40h3q61not1rwn355844todixd3aa0lodf8z3nk4khvi4kmhmokdoftnsrhe3un5y7jihgy5a5knwq02opooap000l7ghrnb42yv96m5g2',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 4196253500,
                expiredRefreshToken: 9357796477,
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
                id: '404d2cf0-0044-4be1-b316-7b4ff5fe41fb',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'qbcxz8ym3tyygl1wjvzpcrpo3gyyadol4n37gftnnpkyday4saex8wr52bhfxjqw9442hky3clti5ctole2cz17ibxaao522k3dg02b8hwwijplq61w2t89ap483ltzi131tjtgx1uig9swb1m5kl44ggr11datbvpnoj58vox7xw846kfmel3iahqo1tl97mhrw6qgwxe4res5wug9lnn1jr7t8x1wxt1l3votbltnxa83ngwp47iicgoep19w',
                secret: 'b8q3otzhmkwr5t6zet253nrcydes4lgzseptcjo2ek99q16b77rqvx717s5f9rvc10yb0yao9uqajhe5aie9r8p22e',
                authUrl: 'eg113uz9id0eluode8a6gm9yyevkqvq6pfkjn1pzvjq4tlzzibb3k3zsxttd810v2d1wvxghxwxp20j1xz7r79wh2v8ldkgjzvf44iic67w9rm6nt6q1afq61y7z4lwwpv2pyj1pnu7j4rsuc8jp77ceb52zvmi18ybp5w77wlm608zxj1a1sb2rl5toac45w7ij4rowah4yiaigvdg59kak5dgsbds7j8oyxjvb5d49vcygjdkt97fyxb0xsd7xlpxc8jpqyyw3myxs5lcayf9axnycd0ao2peo1bluks8knybsc86ld74x8r6neutbr6ak3x3xk4o3x88qvo4f5i571sucrhxbt7z17dq7dv3f7lhxcq7ilm3lrd2oh02lehvcwh3o3uv4x3zt2d2xrkkpilb1qtrwxrau85kivl86gubsezniye8qz2719omjli58cjwbjirv920q39yn0ninhf5n6sec550w3zf4fqnw3v33l7zvc7v520vuknlrtu35834uk7xyg4y88s8xwqmvutmshusf22vua2rh77cu58tag8x6vyqg11sbzmb9q6nk3vyljnt6ypi8p3z75nwwgsvinpli0kxp17p6fzkvj9ydtnmp68p5wt7t8ywc4oyhijsu2rx8yfa3hchoon78fy60rz2x976zk7pxlwwtzh59x1ir8hwggux9wlzvtajbfhkfagehhb4clmg4t0tjmsktf230w29pi3k7sqgllh86fqbeotsmdiqm58sziu9arjsl4yq31jz5bxqmht9nsxaegm1yookb13k0htkh6bz3orrr5pyl7o956wbfepf9en6asfjzyjgwfi2vknwbcc0rja8cl120spb556zb62g504i4t6ru2ait3k52xxph5ql3kjatt381h0gdo9qwmvh2o0d3h8ltqaqw00dw2il4fto0oq78c4hstjjimn86tvoszs1f8en5lib6nbxjlh9369utm68fb85hiyjd7u2wrj71hpzflgk44t3r5lv0iwntjm0try16gt31nwlievp690rfej3ecompo4uh4sdfj6nn3gjvf274h3gz660j558r4qzug4ifjy9lptxvc6g43yv0sqsp1rqg80a4dpshzuoospbm9a6p3u33r4wisib5egrd21c4pe7ywap3fl5pqrhxeloz94qejmapj9yhe20iyhf3spl34iwe33s7eqtg8dpv9rss5z3em05e3peliuyyn01460wysblc3midohzdjz4jsi9vnj6h3outokoc901uhbz2lshvd87psdkah8dmrq9ya1qoeykopv293ttmh81cjrm5zw7kdci7mqwjkzyp5mmd1q3ifilvzgv55ih73wbc9txm2x7rh4crykuaqlynr807thuxo57l2jdku7cepfqrc05ukd2iptvmqzosuzi0r3w4243ft4zew4jluw2b4j0af3zr7w8hf256y3yx3ns3l1vl06wrb0j95wv8rfgwenki14gs0lfhl0qysmlbt39lmk85pf8uy3gvkbewr6rtila1qernzoityqs82v9a8m0aycmin5jlhbml2l6yr46atvtof2ga5nzlzau3pht1yr5j2oehja2cd8bvruq0o9q8fmz9lda6xsr4r2cx8dqn7fp4ckuajiq18pkpyuy9m2wpgkkn468cdobo7klgopiktea5ucy1yoy8ya710k6hpfev6cje3bbyy8wwhal9mw5rl7m3iyrkph4l8s8hqfj438d7kjze05m8jker8ssjme9rqvz3dd0yds4c2qmzlt1rmiv031ttdz08m0f7cjcj4n8rzgkvk6t6odhesu7g9z79t0xzgdlfavwt8ddo34arg6mzeipn29jlhf5cl7ivk7a1hyrxam6zrivs2lyufqlmrh5fki3mowb3v47t1b8q00gw3lo7qb3n6vk011exz2oidrktmzhtspmz0kqaiibg3de57m0j1aa66akqe92icwn8509577oou96jqs4v5fkv8ccn95mktdwu5xfm62dl',
                redirect: '7ypmm3uuz2wlug9mkyxoavf9eoj13vug130n2nh8zhpsxrd97xi9rl7lwkbp6rkv49rp9qgt4t2k49vs1g3j2ejzh2v7ta8i6qpwls9ss1rhh2k0h5fffcpwrhu1zaoxutgu2dyd8beh92ovozm0iwc9tlnjhltxh6mq4c2u67ll258evz93phardtpk76v54evvzmep4zhfj085vof6kc4ii3ztdruxw0wlg01sem5z3i8k27wc3xts5hr242fq1xmql63vr71lhfr6guvo3b9my5y4fpq80j3v7lrn5ijqhz6actyit1h6aar3c6gvgpmwwwb531ucbkocja7drmsjceh3oexblsz4mkgb9ac8kvlts2hn3xywpkm3scmu0yrra5ei26z1wu9c03b6euxaw3bejg8otzihokc5j8pegsnvjuo1d1oce8n8um8psi5qkhu11am71bmqxjcpyaxbzmogk8sbdwwt9hm552iogw82dbt2175x4uak06ksf95h0gwoquvj39e1aoke2rmgjlz4ortoyfeu8oyft8dr37evbm9r3x6j04sxvl17uxgei344vw6mlqp03kdgtuem1oxcaiahghalysdlgnnxsngt05js1fu86yeg9hu4ivxbgwe88x2o95pqk18e359tycwf6gkqfp8j685k6xs79tcocsmf7dvxrrqvobovvu9cporridpg014yjp4va4typp246xyoc87nqz7si4a3w82chkhrbao0urfn2aettar47vzzhgvo12mey0e2edoe8use3e3fe1jnve2ec973c8wf5nbsqjoqgowm4t0wshsf7m06ozm5yecjfdvq0d2itubvhwstzyfoaeyqmcvfoiu1f01nu417398gaa3byyevffjwcju85apk0yzofzgwselyxrun4kdxxep12t9lrdo4atuzdyw0fznfgwmkoc2htt5gb8vh93fsmt3f1e97sh9psqkn7jjrrkstsy220akn0uu22qhe767g31thd2ckbzsbx58n81dt6i7a3jm6viwwrh32lzw46tuxbf59zpjd51aeom68ndsz18c4z5kro2b7hto6grk7lxovdvzi53m3w643yty49k9ehldjag7bf3wrctazdps41pac92r81ayfuqrozmlqhtalb1v1evmdt4ltc6j5w68nw0pm3nd22a6vq9st6uxr98dd8r3oxzfe2tj7en9c3036kfajf6so9iu0ogyntmq067xl9nqrmcf6awcg3h7gshve1ci2fqt9avjair7ccsp9os67yy9wxs8q8tqwi15os5gk0c935zly57g6lpjasde7ldyb2ityz1ue281e5a2hdtwg7q8f4ewlueik5egyi6e0qh7nw2jpfpw8p91503c83rxdotj0n3rudkmx2666ot9jdu8wgfacjowatz2pvhb2mwadxwq5u8ug6glhel5dgv1qpi215h09g79u01m9zp2nxsf5kb28c0kq03jicmd4w2w0qpj5azu8hzq338kkvj72czb5993aypf59cdsqa7s5wsn59issxinjewkxk75pxvb5nx81bh5k8t0u23iwl6m8tvji2us5494wx8aqtns88dxb14lpozcio1ds613e4ey1qt3k88ibjcffxhhwgjasi4pfixn7irefe4agmua2ejt5dri8lkc12nl87bsw79mmb6t32aee3tj6lb2nrlvfq8eqzyqtempy4wty7eaq5ek2matytdfrv2c3ckm79xo36g8behpb0uhtp8gw8kretvk5skltf7jf51oesd0aq81yitzml6jnordjqqde4y4fdj1j3mrasghpbj8tv9i71u1sr1s06llrp6fngqr5jgoeolq77naz6b777dagtfj7dxzmgawhlearsnng3s2lkxoqeny6huob9xlbxx68tsb5c8i1i6e3bhnwesao2v0stt3zkcsh8fceiy4yiqy8q4h2mee4na0sxxj3szj1ofrzkrieh09wrgizkabmh8bnfms3asipclsjvi6b',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 5558481694,
                expiredRefreshToken: 7664964829,
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
                id: '404d2cf0-0044-4be1-b316-7b4ff5fe41fb',
                grantType: 'PASSWORD_GRANT',
                name: 'flgg9a9jpjrdc2sbs3lgl08n5w0886zbsnbqis7oqgl7ag7k82rfibvm1koc229uiev4qmuwfezxr8zjxdbfpenug1hg4rxrj0x3ds8ip946zhhdv9wpxebcd6zf4ifi6rz3xhsy1pno10ehurqhcgfyoq0tfhztzgjbs8nwskrwkips97u9hs5f1swyk5o9kofa5t7royzy1059n9jyfo0ffswx5tu3ilcubgidu0y9akrzj017fgtst79jwuz',
                secret: 'pg2lu8xk6mc77hov1w2ez6cjhjvh0batjdttv0xbj9kwrm85rcek9trxo537z4bvrzhpulz7wy6r1m8zqyarw1ij5t',
                authUrl: 'ldsokdpe13ug5xx18m3unzhr021gs9y9h3952s5a3pphjrp3s9bfplojb33mfv22grl24equewfxdshg3d2l1dcz5os1jbev36y1p4t6mz2kxnrdamni72ag2znhp1aul1fd5pvez65cok1j9gnykai6t1p529cio8zndll55xai6sukxghp0w3dx2tvulom8vbdepop7wkjgze5sr0n5410p0i68iiwq08nwjgxdfgyzqk1atx0efguofw6n9mpiuopyz5zi5kq7f1tya4dztcfe8u020g2ym8b6ypok63w8ivlgd7k0d4r19i3n2aget25jluuw9ej8k00s4z8jcimgclxjyunnrx00s40pf5sump8czypretasmnsaim9huapj9390itkud3kz1v34dpjfhdfp00oh9l10agh2jgdiexggtgx4hvl2hrnpij3flqbhxy9y5wuvlhkrv6d04qa76lvd394t2l096r77qyzwza1b6sn6c132sdl5xvt4vcmdggd4ih2gk31cegdu2j46cbn0e5ufpo1a6r433f191fbu3sn0r30xfnchrnghe1ovpjutfwslr0pt8pv6iigjfmnmzqikdcmg2j91o0ys1f3ad1hsfrdlku6svugy5k9u391ymxixkivlrfs453yvgin0xld8tioa6dzc2c3rqy55kkt0i6ef211c6m4tu7jbmwqmfw6jy2hwvyihs8tigwa3b2bpsd3rqn6x8zek2hr6arwq7u4593ghe1nen3jmmiui4lzewfl4h6tzr781zyexskyufjlkf9ztphram0eu2r5ejv44fbqgm4kenc749b3lu9ez81c1skupywyy3h5osj5olh9b7okwndh8we6z5zmi1fkdzgxynrlwdbn8k43ym16agfvygvxzw672iwb9c6hzs2hnsbl0qcnkbcpi6o7isllb1ndafkchs8msj8p4161mjmap4fbvsztln1s23ym11ip4t5x0a5hdc153wl4pqiazb0ecss00bckkie3euxj0v5vj9gf9xqhl9rmefsbypzdd0elfpobj4a5rnp1uwb4tx8tst7a7f77zlbyomtaa0qj9ycq34fcish1rpmo7uve5i4sdw8kygukpo6bw4tgx2achibne8vxnry7t7q9qzvz4ov8b9fs7u683arhzc4rezra9mgsru4x15u2wixod8nfhl7xgonn82poidnnhpdrolkm0fqlyz9yiev1z46r7w74odhlucgtr00rijx8jfjkomwih350zoe6ps60osnegpjfrewjhz1z08rr1ij60tziwx27lj7x0io2y7a0mmh0cs4u0ll06ow3w323tchzt0kiqwe3v74cj15xfy9bywjwmddjge7ln0h8vke5ha0db0t9qzytq3iq9p31mnbjx0a8juih1z1igyh2hv1d9pojag9ugrr2ixso152w19cg9gvg2mjaiv1nvc64akv1jxk4us1rgj8gjwlsws03886mexyljtn9qqyhhf1ixzxyvavca9ty8saas7nfo2wq7y38h9kp25zytq4r18ph8ond8xkh00abwg81vfnfjvdsh9i2jkm8x4t7aef1rqv0i74bmart3bjh1lfu6itsnq647m70p285f9qvy4jank3wc7lwzljp43squom81g18hez4xaiy074o653vwzr7o5doheu04dqvj5xug4mu2098k1b20zavpqbaicf4khh58yl0thhmihuksfd1slb8chbosgjta9g6d8anez82c1vn6yniqhspnwqm9ssntm9fq48i0jbguyw4dvs4h3n2pcj1b664biyej18ey6bhr57cvoswi4t6jjgw1922h2z1rr60b7gsc0mff4o4n1pni2c11s988t9rw1udbo092he2v4zqc1sh8w4mbdlii4fcrn2tnocylzf444osorxv3sam7vgi7d7ecihtqrbgvmevx1pjnj5lt2eyyqbwvfp18p3nns5c7dwgrm888py6h1t7ft5nec5h4hpmayngqo6i5dmp',
                redirect: 'p8ahq7t01dnii15emeqm3n3bctqr14t7kzr61cd077btyur7g1cpcopyiv1a0l86uguzqjullxjqrcq53b2vmjeecgr2pyc9qa9xxhswpmenmuxma1h1a5ah1zs78ku7leulb98cifhhoti7yxvm4xlct6ajt2lh5k3y4jfmmj0umb16yz0drnd4puoer4vmmhwjcsqexjptof3rztle5dezxi8qaiwhv3nnv3pzodnzsbrfnr2g6ayj7yt2x4eg263bu1hpjdhrpmuu4vz6rm1qiknkn5cjf5gra8zdx2o9415v529oel2gorc57utfymyjr53v0c69ew8wfrlhc707sw42jc3mx0g0u41lgqh7jraxw0u2wgqzf4utere6kq5l0ew7wkbdk062ti3ioz8o22qffk2h9cmo9uhllcpskbmaa3y90cqqt639w3j7rn5uzbqujkz1rdsqolnvsqfkvyj0ytrylxc6rgd2crpnswi58o20peacihy5z2av6j84u0nq2ywb1tzngfmxwuprvocwr4cpjaj6x5gksktoz7cf8ibkzt6zbrunumcje6xcba884tnc0aavaajkyvilrreitb996i4zek667h7cfocezcpe187lrok6778i1crja2i6nujqn795a6q19y4swuugetpir56n38aluo3n53imq4ili8mm845ut3wrq8kdugbnaebsjkgal1e22exibnty5eh4p06mn2loqbdd81yb262fi3akcgqxl1nnnhurp7ewpruaol21vpa2py740xnmyvxnpoq6kerhl4sg4f296bvqt34uk53vomq6yvo3lnqer183nin3js8oupvskdatlk57z4ncji9u3wke6an8jpx6px1rdv9d8gf8dedlb9iwd9bzafdaq3ov0dx4bzox2lv8u98kzpr9lvuf5a9ihej4xwj7bvcgldc51h0konh2c3l62i97262816umcf1eh5bfdrv2tf6gdy5hd6jdt7kzl0jfjldsk6q3r2sj7rfyzmkbqz3wy3bzkvllxeh0w5g5im3fil859clspjsyfarjmtzyrdtzif308kogookk6nijn3ugnducgmlibvo3xv52m57rrvlnt12hy710xppby9fup25hm56e7mtq9shfcwuqfth844vvlvu2yeoxcuk5xlc201g1b2bnch2qonwwg9sj5mms4zok9qbs78ichhftbahtmockbw372w54i9adt3u2afqdo77ws5vxk14uy0jpz24dtub5hli68f2hg0cbvmnpbsp06pp3d9giww8712bw73663dhquperk33bst8fk2a0ckkmmocsu1nocm6zs58en46egcs1cda09fgijdb55ebxr97f9oadlnu6yueyxj0wzg0oj1ytvnys9n97oi0b8fl17wuaykhfvydehsgfsdyrznjktsaw5t2zls5ni48wlpw3jq5zg0r71ejf8xow5qudbgdp84e8nkpj28be4u664g74g0zlajasx99y3ysz8ajo1d2vufiho8oblg0wzvj99pi4vaxb0jibahsdxu97w6b8ioqamgqvzyfn6dp7ch9cnw7gjvqnraird1lg3wcgj24v24txcixbq6hfk54kjn1tibqxjnc9ahko73r39sgskpcnkfsxvs3dui5jbq0td4nrwbegk92ts481g734uuk9zy72173d03yexd67ucp10tr6mpk1bxufmihwbxzw9mwk8srw63z3ocpjuharhaz1zk79lyrdz8t9eer5zsbcpy1sjyxkyyhzqdxtut8ltcecnfdfzbpcpzjm6p5ez9dwb8g2uew71cty2i4lw42fkz2p0h8nsc23s2iwmi45rzfu7t3hngbt6gv8a9qndrxnphhzhgk4dxinwmspe8213inw15x77tt3j1p3qc21mebke9irrexyh6cws6ij6oux1d8ngh7tey3nv7uodbhsh3777p198ugkvb5540i56btpguoqyyyqvkrnipvl9u8mci7exwdra5jk13p9p36h',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 10011486499,
                expiredRefreshToken: 7551894643,
                isRevoked: false,
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
                id: '404d2cf0-0044-4be1-b316-7b4ff5fe41fb',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'upf0umbqzhgy21cne2dy8qrfe5o63vyj5q7xgra0b5xde4qftabg0h91osq01bpoidga2g3zm1obs0l8klozrmalg8lruurfgvohxb0izfgxutg60j9pkgsc8lk6p1do1wqynr2i1odp756x9cwhynb74wwurp0wrmgco2sma2k3qxiiojfpjpjqe6s4jvnu9zb5ipxdy62e2dzl9ity7mtitain85i66izkihndaqqpc5b7zqs76c2o1fp94wj',
                secret: 'o9qdclr14o3c3i93t6wfljmyk3alwbt1vtbwmbh9nttaith4m3487lagz07zs3c08vv3zu91m2acekothw1t12u83a',
                authUrl: '227jbg01vbwwzjb2j2i6gpde6nsotxso4ngfie2xi2bskd172u4gh87clugw8kg7b5j93cn8zixaw27312hnelyhtmrs4c9a28vwksgpj86v467x86tv9ad7l166p0ugtaqlqfwo0gaxsyyqbcjlcsfsaw0wulvxi6feq05cukn9xzp4dgxxmc42ifxgvg4tm13v0nka00g7qc4zn689bwyzoiqcvsw7qpre64loeo7bqlyh0cz4bo0pua57795wp4g6cobyqf9ko7324szu3smaneonz146xu1lriloadoqzwfqw7ki3keime20pipwgazy1xllq6hcaeo3uux86qz89lsbzs9n7c2pfgxst1eg278xpp9jdgyyu6jka8orvicatpxxkvu5waq7kuis7gifojwqn5peniina203z24wix73bqlo0l5oomc6fd8xqb6t968lrh7nw9te6s77zqp50o83xh1o3xuveqmffunvrgmh7icktz6ivn54avb6h4034hzmjy8hbi9t0hcex74ay51m6bhq8d1k63ozst18pk5p35hlgmvuaf4a19jukd0hvngdtq2g739xr59pegjamcrb1b8k260mi3mgbki1g769l7090h66j8if3332rhgijhl31v5l5ny25bd3u374084blew93fjnli2123up54s6n93idahobla03z3l224cxgjwk1mu2jhg1l4hj6cyq5pjdmg66d1rs7hdwbwgk0yoemdxdrqqlj9d6oc2u0oeesc25u8zow0w90k088pw656jplgnuax3pjl64rx775myjfmxl1qd2fw9sc2thoo9f4mqtuvvzemjh1xhnmmcmyz6nm45llow8bildv7m7dbg3dnzmzjrf13pu5fhqlqeat7dkd872t90gkg7u2fakjfwbmaza9yapsdbky6m76n2o3cd3aew5o166162ynfu84odg3fqzd5a8hrlbjszkl98v0h3lkipm0l9g7v4hwsfnh8zyc9pqomjy18vtv9bdbhy9y2p364ly4qivdkmn8om7ptrq4im097i3iwcejp2vuqck24bje9x0qfy3zhw2jadfqinurr0rl4svubsghabtxgpzrcwj1x53xey786d9u15gj08ijiyej5pucqzu2m7kk307qz2q2ye3dm725eygfibf8hdf0ocg6346yu0ww7kfz6ocgd2cdlefjnydpny1g08zifis452wz21q1j2uh9vxah4018sckrfqb6yy9d5k2krpjz688hsqrsqa8ldizvf1vx2nu8qrahcvv16amycqvsdbqhvukpn7cctv4bo9mh7nobdx3y9m2kjzc1artahydsld11gb4qznacpxyvt7q5b3925tfnlnthf741mg5m9tg68zgmfiqdxh3b2i656vqa1acbfni3mwwbmrf1m1rmux3e3usayiy2tl7d3763ft28amo9c05vgi2osl86bpgyfxby5dpapuc3iivb4m5sezduxpm8ip1xf3jsjvu6zdd26tchg6d9eiftjvbez33n27kk51vvu274jx8zm0svn41aneq2xd93r18ff7su7842nnrmkw904lgpzgdw614a1m4f18djjw2w7k0xga3n80bx99t0161fa46jbr3l54repgeq1nh2544g338epwyzh5kwx1as9g9c01ha0mg1au6imgkykr9axocb7xirvtpu2nu3k7v8hgdq8o2s91oyjooadyljqq5eubtnoddqjfh5fhmmjebpvd1kamw1m97lynifwcdbfer1fqbe0spvhz6pv2h1fqpb5nu9vxln6540lh0wc3bn4eba2hx5ms2evjl2p0u19wdretp4j52mo4ch0c6kb30rzmw3dcddeefjn21vwqugdxocrqck10dbvuaycpj2388d9dfjbfqf7rxmad2aw0zt3vfaoydq9em0y19vnit4wf0jgg3lhghmaak9rogqu8mtxa60rx96hr4mibclgxjfhl6tovv7du23e5ze4sutksgxsmkpta9uu3quk',
                redirect: 'emu05ribdcg4la0sgk2hzdj6m6a4t72zkcvmmewwfmjvjn55xuqnkiwlxuc2gix1ekwa4nvdck45wpipbl0f99pj05sm1338xwln97f35asf3u30fcthwuzgkn80pzf3sael3owh91chu2iwki5kr6854wpz5u6ncv0vwv6x7emu4mc4h90vpi49udymjsrv9tmp1bmui6jbu92uefyhfzhrxvc0bh3fxi2hppmouh9ib9trjfmy1trp2dybvc1wgkd7p7t31u76y1roydscxte5rdq90q2qora4vxebjbbv1c8o6j9k1cippjzv6r6kpkbu8z750jzuc63v22okxgfhp4xz96hnmoqdm4ei58m87rfd3qhp4lz9r08rk7zq95zz6iatmt1tsuajtts9muj96bn4hhrdx5lbked2vumchncld58k9mc1m1adi3ehbz9xh1fb6ikphs6izfw86m4j99vk2gujf1xu0afrivrhsxr3hjydzem9slllr7k1p5chkenewmufy762dp3fckeyrw5q0tf5sluf8jksv64071pgtdtpu1shcb1rthfu7j80r4x7u0k18gdetyoeffmpoolbsz6d1uawwt4d1qzh43bmlfbezc0oym5p4bkm9g95l7mo6yixnfok8co34rs405p4c3ezzbhefxfdyf4a6n88tewfopf5ayxa78obmmhebhaxr62efcct7dyx9e3mhoszatfvd6mhg6kdhzug3910m6utundvsmnvlxkvhy7nn9okcn721yra0lumguwppdkvxypuj8pt0ispopa0xwazfjknhgbj7od0mgezitu882nz3tzl1da2m8kln87aofsccxbps9y75jj8m8fpbdaqoezqylfsl6iqbnij63bubpd0z051e890hoifjpexvolvkix7gko9paqfwdn2h206zycmcu5u11n614u330yci519ekj1abssdcim6xl8h74wlqijp18mphxie2eniavnvf7qjbxygap9fkz8ckvzth9gp6stw1n7afdz6z28jaljg6ai7r2tpb8cik3w51tvv7zf3172ozc3fehusm4b1zjuqnjxizpsfq7lugc90t0z3ift13iwhjri3uam0qe8be1ejf7maqugiq14x31mjmdde49qi5wtqqdprvpnujekx51zk7mvq1kau3eb1hi6czmy0cbsdj5reww45n938pruz7odsjomvzdpy4ncbwwljhlpq39lxukag6ygxmarub18nymt1o5zjzkn5zzodo7ma0e8k8u2ckk5cxaebzamnas1y630yffixt75f12ep80n2nt34ewlddthk7t24og0bxtr5cqmynm2pk7hhemf5m76z9igsbe63bvtagjhsd7delqhpcsfvlrxaccv7stedva4y075bu6n81f0lr6kmsr1fmu7xfsvovdqzne6lucmjtioqayrff24yzy39bc8pn2lhm2dltdwovuzukcib3ywywcv5oq5uledql9x9ncenqs93gdrgjq9cd27s8ly6gon7lxqfcg0cbmw1g4shm8nluffj12m3zruifahnznnflodrzs74ikq4zico08q2dyecf1wbll9l6a4marwu839nltn6tefgr8ugssk75bn1qmxqnqpppqjt1haludx0mzh6llardhneznkesr82buhjigzeyl8dr2o3pawl2f5gvazz5pth6iiepgkxawqzzfbw76k2km5ekg2o80g9dtx97nide9dlyrrlfqcv62l13e8kpi80vgwooesahr89zyj6eovgf10av5fp4mtdxbboy30qx6sv2ulghwlqrryi7wg0gqpfljmgb3oh1eple3hvw3fpbx6lfkal172b693kpxag3zv0r5a8fahnnef4ueex8xkqf89waj426tvfxdei5wq7voc2r4z5p8m4uy8dryaks8a5g0ngcx1aywqbi7yz6ytuyfoblbcajp74gd8ugh0qqd731xyoezwfed37n938iz877remih8he95qb99mddmokcf',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 7194290718,
                expiredRefreshToken: 75222782290,
                isRevoked: false,
                isMaster: false,
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
                id: '404d2cf0-0044-4be1-b316-7b4ff5fe41fb',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'wdwlpnchpi1odviesss9sxw09kt6wecjatwe5gqo3wkyfg3c5ixmill2966cekmvmeuz9avwiajibnss6pbq8gx0a0mm54sncryxgawvi9szm3kgmcg7ttyr51n138qkg0lxts4ydomwenmdfmjy6z9oway51c1prrhbv5c2wxs4eilcp550hmu61fmeqi6e2vr2svxf2xgbn5z76sd6rvwkhhi455b5zz5mj4on3e9dtleh59rfgfxr9q1cqbd',
                secret: 'jumd55xdkrhs5ujnp5ivm2zme1vd9a8m2ph80cam7l1m6vfz3uk8qhdpaqvou705h99kyhbvjvh1uc9l31kmst2790',
                authUrl: 'fb8a3rix61x2fxoxbhrmvq19oemsy8mtsk57pv8hgpe6k77sql2wh2w16czi8j7s65cg387ue0m1ncfsyn1p2ytqovcgwvgxrjajjr45blqfcbj94m4a62hbtwmerswuvb6lqlfm8kg3uihbdvn50ltdulmia7amut9hqxdftxkbeb5h0c13pb6u2i6c9bmp8vnefssh70gl1lorspbzrxiajbwx5p3eq3c2rxvp9uckxzbw6s302phecnqgppolyqeyijnwf4qd919epucckgf0dwfbuce78oytxx0orl9g1rsxvzyua59c597jq3sr91k4o9yq70jqbwvauz3p5cw9oo0vyqzpwia9hyyw2zzk6puk5hkx9xxp24ugfz7mbb6wubwodz7zxr6fdssvhs6r7bd7m9e6l4cseorcpowmc9begxjdvwdtippkhhlwh68476zz48hno9ut70u3utt0swj2e6wr6d5tmpsacsrgecee2xiv5gr3u8tfrqlc55dtmqmfp8b3dudjy91d8ses33aa9ew8e9xefr5jkianlg3hcgbjr2ehd83h4ju6z4pn3lr5c5585paw45etb58ucqj17j80nf27wh0t4lbn12ljgmhx767sbli30xcwpvkc0yc9ycnyojq811yhy71ov00h2i8edffsqtotz228m9e64wd0q4tjfl5095sz0cvskou2ot1wqp4nowz52n5tjp0m5mlxhiipeqpaetfr960ndhns1wzuomto8wdz5iyxl38dyw30rnfnraueazfopp01axbopmpelzej4329s3ankzvja17gqc9dv39sigmq40xygyd0i0odjwmsdv4u2j8qchuqmqi3i558405h15uw8plye2ixszh5phjd1h3ehy5iwej8eq7xtmjxrn101i07r6j6hdvp89qf3inr3wehux0c1tl8y18ace6eroofa1b4ocmuvqcct0mc4n1igexpphwyv38eqzkvumoyhdhvb2mq83iu0o8opdb6mdnekmsk4oqxhhzjglxwfd580ak8ctcxkafjw4j8hnx2dbg1orc3zxph49ynal0i3443564i5osx43bwigt1fjo4jmns18zq07zbyxn53bk1h7we2m6f2ec2oxhzlmq18ubvkxnbh8qzjnkeg8b0q1whjfnpn2zn8tyaixpscn0svmo08pdnyqnr9toou4a5imwlq9mo1k6yuplkg48ehe63b3mjvfpplh4v61l73sxsq107y67l9j78hmf43gqclhg44nilu4ba6w4c8zxmxf8w2h2k3nyzfkxbw93j8lbk4gqw0rnderv99n5wp75b619f9nr7y4cbvbt4f4fhpyjmn9wf12836gat1hmvos2ruiohn4i2rhc6akdnfk4gqpamri9lc338byrtrngi9zyguz004ntqy3ltsx36ufiqlfgq2ivq398sg8nxqmeyyzszl2v3yiu5kislxfc4tr6ni5mqe8q71rqzw6wpwx01kortqa6q9dae8i4s0ee1fgqgicani7b99wgqnxtdezchkbl0z9fei4hagxou0syb9q9atdut6frixo3rou5qpqmf05i6mcccpcuja7kc6iegcmcnzhdfraz6o6hd0r4sk4vpyx24rz0l8vr45j0u028y41wv2gtmv78lqmuv4yh7x33vjion4uv00hru3w7ekna01d9p2lvwj9oadl891bokpjrhw3w2oiq26i11fnruczh4vpchegceeis8eaev1pkrhozhto7cy7a70uq9j123f62gb7f4gu4j7ofg40c3kkyq29238ncwcmsrdrup44q870vd03w8lk0ttiesdfjhtor9wh90wvezw9bhkrqocyg5bg6yqsnzh370g5g2hypkv4hzxhiperx3jnntrnwy7br17f5b32euii12xx14l359bw71cgbolfkmulkrth7g92mp2f7qfluqp61fstk9se18mvnh43j9ht89d25sl05ofbmrby8izrd3222o6mt8n4xz7h1na1i0xiqe',
                redirect: '2yujnktulz9pmb10h3vb6qjcl045dbrq4w0tdv7du7s2m85nn11xm8r9vj16u6vzgaga2bqj7bh5pwq6lgafepa780qtoz58ywnm9agrcrbnmv7sknuiiwl43p6x79564bbxukr56zi4vyiojnap2m347hyzoybhj4wr562h9pbg5u2kdffld6ntt44oiq5pmj701nh87xkw99683qxcoa54v2qquk8g0buxywe22uj9bjvz05lq9fdn1ggxyws4h2mbg79793epbwshbwfuafhud9p85gop1ip7ro4jtebrcp6j0enxjt69rq0ffqtjsf0lviygz0pz4dgwan0yy0rs4n9h95wgalgew1pdb5zhp9fr48amjbeelc3c9z64pji8cibdz53vgsokiyiidmzz7yshvhixedig3bkwir2dahz4vu3eh6cwzsl5s3qdyfdh0m1ginxr3iya4w55vk58axmqdfc6mxlxy4zgtrgylk3cqt0tybqa365rnoycmvw0wte8wg14f3qp44j5ws2185vnnx04zr43f0wdrqpif044a02ur86muj4f9mqoyofdt3t2t19zvhxvghilq4vboy1zsmj6rr8qwc8w77h7axhilw41h6l8vv6awq9d19c3aj4wm9hv1ypmj9s845e9c7foytvgnvmmuw8ianho43gz05867f2gbw7f1rmkm3rzb11lffz5u4hh34gmesh2iqd280t3a7xhp1kp6g2xpjxu1kfjk8jf52whb2gzik0lvzmr5fvo6cri19jl9alyzhb931fno9i8nb44260sng8400vctbg3g97vzwg0sdigthw9sm5dabd5ruiqxrg9vma9tkpjmcogj41fcioqkjr821iyr93ebdqoyd49lphwth724pyhrvxhf3xg9vovgotwwgq9b3lzg2ne1fg6swsefgs9kxrnjdi2t8iptboa6yfi7gw6i1ujb6nfd5ktjsgbgnqxjzj7wobi0pr0mpf6ot9ywknqkls28tlwp1yyhcv61esff7mx90luz1bn47f3i24uy0zb0d80vbqaarga9g2qt4noj4pke17hc7umf952slcedrmaobqjfoqdq6is1buqbd8slvma0uz7my57lpakc0h0zbdgqiezx1fe9zpizo6vx5acdx8kb8j07qlihyzqso8jkzpius9jv7vb6wqgngepr5nhoxd7j6ry6kbcfeatc5d3mhgbgk87axuzysse219ku7nu6z0y77qboev6xz0fapl3pk6w1ptcgmavucj2lohailbno93apq4l0ghwzfdga6sjeb1n1nitdz6fcq4gelx1x6iy61kuji8lw9qrivryspfqm5fizmxrx7x2e0ywwg81zs6uex304r0txskfompe8vhgnl7kay0tjm9u8bm2lx9t088mhs5jfc9687lzb08w52phnlugq9lswg77ng1765ngejbb9u7vrfzvaa14bk6q305yg3on8qzk88jp00imoqmllayub3y2m8w3yyn49us5dp1qoez28j842na94v65147311ee1wmpdplko7rjul0rhepfzoj8vh416k7nda1w9d53qs47kiv7l8lxpwuynmyh1duaovbyjd75nbxztxkaha06ve04bzsbaklcp9nqy83m327l90f8smrkw3a2hnn4btfvu4irkykguxk4wtj2h370pm4qsid642x0enltbnzn38r6exxa65cbn5h68g75tocm936yhqozzeooony4ah7wzqobkp2b1lt3b1yqpbqi2prlxb94mh2atxyjxt4xc6ey67o9y7sg729uxy584f180fa903ymeo3137ikk9rnc25agjzpcdj5ft2f4jlpifiusuwden2vsugpubeulm4sq0swp5kl4oyv4sqsyuwb5bke9bx218875ali212jznkdq4k4ztvjrkwjcnvd0vub2p0lbqaf4janhe0e7fthkpytalo5cb9k0q4uvw8q4ek9ulh8cpc9kzj0ci42zsfbt7coh8wkkui3v41y',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: -9,
                expiredRefreshToken: 2032228745,
                isRevoked: false,
                isMaster: true,
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
                id: '404d2cf0-0044-4be1-b316-7b4ff5fe41fb',
                grantType: 'AUTHORIZATION_CODE',
                name: '9yoyq2qtl8i0tqdw100btx2du4cy9yv0pfyfspzaxaku5xtvae2ukdnfusx7z40mplioz49k1babreyd6ow5emse9gvq8s69okp4d8m6n359iwd2mfjxtpmkx1wt9m8q01w897digoo044cwwxum68vjsmuk52x8rwqupjhva5b7qtp283j22mr4nuhh89sygok2utdzng9hrih3t9a4y2kvo8doazkss1gtr2lejhpfkjh6s6l7efb7qwy0bkl',
                secret: 'arhu2ie3xl0s25xvr10fz1f1fod7zvigtvtu8j7jqnf5rbhx70qcyanog4m3023ubf4a2p6rnnmuxk6yvhjqw4vrv7',
                authUrl: 'sg1hqs6iwhtnbhq6sp80suhzd76ri1iwlpf5h6qi34x39ef3p43ejtmrvioy6fb2sykqvipe193au11kigpjufkw941bh2sa46j9a14oq48ff3amjxcz5457pptqlzc0onyd2iodqc5o8765xxbbjpmcl3h3qjob6rxwp2zaicuvo9airgf69b5sjhh5q3shzl4c83q402epnye66jp3vrtm0rtvy7dd424iskaqj3hc0uuoku04190qq1xc2dp0r4ehfktoidaxcelgi3626lh9yasu7t8ht600fnoymxbls514tbzpv7r7ibupoa34napyyhy0s040sk0n7uxeo3xsg1dbtoiele8j5onnb1jsuv08axnum3tlpa0ep4a60yntfxq76azfrnee611oof1hz5g25e893p7ae1saj5i3hj5986f17o8apeffjln531g6xrajs2pm2la2c0xegnkqopaaz483sgybtfcbcemijghjibwtenkpx5gwt9qkvovf1dqv1gopo4f2ecoeom4lrw8iyxzy85qu1lg6t1e5lpcgelpyb1ggqqv3qvw4q8vxvqgr9awndrq40hni75mqwgqbkps1tfi7q59tzxxi4h6g0txs7lshk292dretk6muleszye5jeosetrhvvbbyrjf50xclpoluf2srjso12dllc5xhglpo6o8nq48qwirekrdu1jrddceo1ci1g88ma22t79rpy195qfq492gslbk2qnll2kwqo6fmg6cfwqy3bsmy9zud8750t4szlcthwebwfaie5s9urd9d5d8eqoknojlwv2j64pasx7sf19mbo163o0v4bklapd1ip0lfrwu3uigulgba0ctpuedmnu9tg8xb3q8czdxy2z1du9hk71514a0ofyeh9y8b5qrxr9jwcd3eyoyulydvtmhanabi10sruuwd684yhjoh9ewxzovduoneelg7zeq4h28lvyeq44hov1tma2wi3nm91g0ni3v9z5jqkbgklwo8imafuogxlbyq2utacuta754poqki8lqudo61oipzg7xh0au0kd0j2f7mlcedlgdbog2m7ozy66lez9fjw97515esq7uc4hu2q674bodhfhrt2kyskhhfd24e5enow45bw2yps7ptnszlp98mmn1skzporr88xksadcoy8vn1gaabqul8s39xmst7lzim3nae5gzwm0stm4bq5jfa6v8kx9584iqfaypiu14vrww7j1sy08vtux81dhtzlhworfa4np8x2o7cusx3u34z0kvmoi3o3ocnx4tmpswofvx9f22wj4pl3bw99rls2ec77d0wlah3pge4jqu1ge61asudwyzsl5hzksjabawz8dty83xxrlhs3yims0lkebj67m1lnmbs6rw5ttvmlznx4iwrs77rhyh8e7j3y0ohm1g3uas4dluz56egh0jr0b6btiq29vrmqnsqgbtqi8efcqd4d6tis43xms934olguhyfk594iwuf18qekpcv0bao0nggfmqad20m2yo0a5bsbmnf1x76anmpjriiy6utziox3m17mkltvhgo4s4d5gxnipegelbwh00al0r691j6cmhgp8rf9kxenaus3zcfhvbduch6ixl7fuq7zhgkv7pkvjl7x8v7in5z52gcank9m8p7virt81rlwuvbbv9ims5gpmpcjs2931oc6ltohy4dt4v44jq4ur0nqzhwuqkyasjydg31ucd34khc0uwclyi9aq6rd8isenb6fp803skq2v5s26eu0ha6pz7qbdjxcqmvekp17l3ujp9hbvxl08lukoau1auz40akg508w29yvuzj4encgstzaolxrg3wgfnjtgvoynydd7wzc5qrmzjh8xbuo9g4e95a8nbayga6ztear138ru23smnzedprsx0e42pwoh18s5c7euse0jg32zcjs98jdpb0v4wvesf8h1ap4yue69lqdxret1de3blmbaaonziupfwp1inffx78ldpr3l1c0lt46x3piux1jdrx',
                redirect: '5ybljgmym83gsbdr95fvtllzy2vqydt0grnnm24rwt5k8v5jhpivzx42e9p3s77c7ji3tjdqkrjai7vhwbk7o0ckqip85r8dyzexh9vv596xo9qytk3j1wv7e92y738c020fdo3if6caqbkv0jhf3ld6c04jigz7i1e6iv7ylreuylq61bc2sn1t90etj7i3mwqjntdrw4qur5ruj877fod22gd5ufua8z7kn0ehuzfbdjohfbmvjapzfljgrtkftdntmp76y4p3mi4r75a6a9quypikgyko6fhdl75364vvlx21ei4g4jxqo39yvhyi1oh95p204jx02ydltg9r5mvmny1je44lfs9flil9z1mgpjdanazj70v9rrkbdnmqc6cf3mwkpgfy6jswbbyybmp54p1g9ttdza0e7oys52nrw3ul39vgctxzifexmnhntfj3e08l7fbi8uo7y10e35kpc9y7d64pbcc1oynfaz115cffjmbjeaazmx31yk2bja73d98mtobgjwwygsxij2znfm1bjjzpj6j7zqc8hw0t0uz2hwou7wvnmbies5cvnoezyrvlbs3zjej3cjg4ongl8udfls0t1p804idsynfnz3usr7omm35alpvitcw7b8qu5r8dxl99njfyufhvb78jgn5o2ddj9kd2eod4nvqkrtnysngpx0lzzqd4wc5uga911gk598xpx2h9dxv77e1q19dqat8t5482y4neswrjofl6p9rjt7yk63neq9gddmatl555bnqqzjji0tm91yp5i4kbfj66ee2moa2yfplw1iuzlfyozvx9btq655u1jpu4k9kut666crda1ya7ain5qfeunm1f5n7lysb11eoh2ku0vkhii0pbgd5vq11wz489p76735vxvysoe9uwc8z1soyt0lnnzd2swfjplpnl0fhernqjk40zz3g8n6qjrspdny7wd6yreolt2s4dkq10zmdotsi2qwu4cbhp7mmuhgq1py27bszib928qz68e9x7g6j4yxzu07neh6vngyh3b82ux3oxjt7e748r6hkyxiknq37i58l2xcurersqm1l08gpivwmcbjnkcrd32r8d0fljz846sjx405rjdyvrtr08bb0oawbsxl2uedxsdjxbb1v21buw8cysx829u9xveu0kh41zckuj1p0kdcumlpvtg2e5ed27hp8fpfq1ijiuzip5b09riucono5g8t6tgh8g5pi64fh1z78w68c7xnb6strbvsbk4bs3ax7owh8izrrcqb5rc3e6anp6einy777ryipq0lqzlj5xnetq7c3irqftz81ytb28xtlkesq9ibwskzu4su5oc7weppg2s3nqrgnzgtd58omdyrnh1q3sgkg3r8gphya621a480n38dmkfzmdcyx34y28k7wokbe76qhjvjo6mbcku75s9o9xf9uiaepnge1oeaqa3azz6qiwtw61vyrodbrll04g91j053k3mfq1f36dt5w59vl000iznga7lf8utypgh0275fyscjcrghlnur3ey2p9811wo0pc6yj3w12taq5a34vnfggfaq6weu7uv4jxsnv7alsg36e5akcbf4sgvll5k3w6kr99ndo774jnq35itqe9nve06ffp7tj7rd6c7mbsgmnsg3ros29l6oi9f5wmbfumpesqhdsgxst8rpzvy2b4ltw1h1nfnwddf46a7y0yy450jatgtpfency5pvq8t3mzy5npzkrz9qn3m921gi8lxdxybrvoj1i1m0mtyih3w2harchmr5w5ig668ikk6dumw5cftug88tiz5kn9sarh8rd3x287x9a8f7tooqwbp7v0j6bysdiamkkag26cq3q8qe8fu5ffe5gzupc3q0rtimvwt1w86kdpcz7yqqgm0zwnl4noyn1wtl8i0ak4bu8kntcrm2s63aeeb0ikmk4df7zqueaqolb19yxn7vl0rothiprgce04dk3u3gl9lwiqxub9bi7qctvx326fccawrtd0bzrakra29hu2',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 6880005971,
                expiredRefreshToken: -9,
                isRevoked: true,
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
                id: '404d2cf0-0044-4be1-b316-7b4ff5fe41fb',
                grantType: 'AUTHORIZATION_CODE',
                name: 'gaudtan09v3eopg71x6og25thani9c4yx5nzi42l4mzstl1b8exdji95k5v7x7uwq0c5nld7pbay49zmxiz7sxyhqq30n2nurirt5vkysrr3rebzu7z9dn24x6x7ihq28z0ngy7oqoxwfp7nmfu6vzr8xh0qkv6hfzc6g592x57n7qsowb0a8359k534mjsw6fq67ihr6016kunm3nhlekixj60otnqtab3glzvezlt6rtwo5hw51uaafmxokgm',
                secret: '62so36qt598sxnq4s8pmib6qcezspe46hk6l5q8lcbes1fghjxmus2muvr523ursc30fp2n4skp1u78xp56sjjcuku',
                authUrl: '54ego3kelwpwjsiam2lmead9dl5yggdkpkcw0dh5jtz1yr79j44ujdmuhel4ugaqhx36mg01ord4eclrsswh313ioiq377xp0bhxe6x6gz3zriadfnungvlx7rncfupf82e9k5vke5qalm887pgig3knrlkmxx2wqgpzkxz53vv1hq53bmha7w6sj5r1mpsdxw0l3049t6bxitkidwy3wrghklcqhc8j8aqxov1diym4lf1ka2cenwlzcgbag5k6suuj2uch57h6s5de6idadda487vd74lne8utt0zz2agm62pxn6aqvi64hnlezswig7pr180ogrl8qsp5c2dfr2xpf4qp8ssk84rhx0lwi5uvhrsckelkjgk976rpj9w5ku0rkzxf833haqknwdznaw86jwpg40psmn0racbwmsrberyd9ex4z279fmaiz80zb642slkdkyj8uxbdfhqeypzj4vvu4izwf9buxuplcailbrr4ed6st6dxdymb79a92z5h0i0t1lqnvr788g036k255z1h7o4tk7majql65ju53lj5mlmlg1ez51h56d54ah5x8228bg5cm9rs6d6f29l7ywl1x9ovgwbmldeeoefv6hmhpfdnewto3mepemuv0jmi5zwdxbkwq002p11jcjo8m54ya3fdwge8fji0iwzp0r0old3wa2diwxlwvi3zq38zgd1d93eidklgyt4u6uvwo439rg71tfqiygwc6e3xe2xrzcp8go80e0w2h29ub9bkaark8gvow2qrzg28hiqfpw3umnak70qghzp3fiv161cque6naooe9wh4k3iwbdenvkm0tygdppmj7x6iuiz1lmh218oi0wzspf5e5zc11ypq3nkfhnx3cppwgcmtv2qs4gslhmkdelfxcur3bjcobpp5rdvm92urvedqhqf2gmy6fkvlhmyk7cv8mgujdhs4968oqc2zkdsflo9gfsnncji8cgvaig4yfvlo5nsednqbdcfleh938g1lul4kjrst2bqpelgoea7loxpx55hry7qxyoh9s1uymykjc1tp5wbc4qkk7oxi55id8b0tdffp58m8les64ldhnx3d6symdk945ftwyvqfqivjvbgk8h8neqysvnd8p96ixzuch2gtcstiv3iptzd004ga36pwgk7fkqfnisade0aa8trv4ynuyfjgxpcm0tr5wbrt2wonwxty6056tj3rkcn8nkghitiduhmlbjz4975djyfg3fm1s8km20t20u1y642bsa4gn6g7vinxazabxmjzacq0encxmy2qglkzcge2xcmqjuinxdk5s91q03sq3ugkzwr6w1snaeh4wlavoutp0ekgg5dxjapadzvzgn069a74j5s6fheuq09m8txnzwlpg1zya5q0bqrgys4m3f0f1l1toqovj83x9mnskvxv51qutwz8pm3cd9oh0sw5cvwbh7hywva8uout8vjetyu6yr3zv1esiv3dnbz5f4j1lm2bg6mhtqdmlvmtv370z88hzfjev40nw1uxmw54irq8mtxydj46sje9z1ek267n5hp8yie6i7ngvvoxzlasgzfu9716mtn0nb44vk0rznlvihm1h8g8w63qbtbr1ogmsvzg2s05kjaz34kjkm2nw7cusnj284lj9hudmv5s8fjsmmvfdxpdq68ncvydsdy7fkpuatcirwh1yo6tv8o4yssbsghflawlh1otlcl68x09qulirfyow8h2htelaod0j46oh362ue7ird64j9akd1auyrqb916ut9mnaw3bma9edyspxg8rawmsibimcur28rrqm51jhbxgk7hg0jdibwi6trskazhdgy0hj8i7nqbpj11j21grw1xllvblwkebuz06kj5wf8c8q66iy1e4b2ij5qkot565u8w42kfb3nfyqtiissxmritxbcicmrq719fivybyljgdwp9ixp0ceazxi2enm1z42qu42nejc3gsw53d3aylnowy2na2k1ar7xg8ae259p9jj91furt6sk0l',
                redirect: '30svxo6xau53c7xo96zl6vqdy3gsodi8mkc3548jeky44jn3jw9500t8sw2ckzzkkww8yqfbkyui3olmux0401tu51n7s5y60ksm5a8nbm0i67nk6p2r60g4y98xzcej586zfcen0uc3u7uw9t4noikb6rmhrwrbjzw3ntgutzg7lb1ukxq5hsnjxrwqeolo67furytwthcb4r1umj1qo42188pisiy8xyx92bya8y4rcjhgykkdlplb2cu1enc4xj81bm9yze9b3cijen8dgy7gdfolwgxg11ejyyz6f9gdlkures3kaowk0u1z7xvzk73ycbh9kdjv1c3de61fn8msy9m4mp4imakl4ahhr6k2k9piz23v7xde9otheghixpo1w34v5x7coppgthzkedeppd245opfhwfr2nrmbgdtdle7hge1g02bkkkcuh7zl52afgcertuugjwycteyq5dtlttv2xujt7ovi17mqvqxa7jgt0rl54v06u1fvmym5lj23441ukkb65cbfszqjc46p7isc5h78bom8u83pxvlracapeo7h8y34bgiyo21s05ra5wspv60bx2dnpxa12ktdvdvsfxeq3zwxs0dst8jogvrwqzusy8ebf6qcka0jy7yek1e8n9wtkft3vt2dg0ty8vj7bt5x6eidz84m45zara5f06euxrt2t6sya9fv3nop4vfyox9urymti9nnnvycaapla2kt34g5ym0bjk78ngf34a2o50ffhmkfldkbni6m9mpm1v4zwbjepi6qx69aicx4m5m71ipzd9pqrm4j9q46p9z9jz9tocsmqcpe6gji1qyz2hedg01ac7yz022js6cfs4tfsl0gbd9ohxgb3e43i2tfbq6b5cnrz8317kxsshr9u8tmq0gm3c8gl63x1hujdwmnq3hilqjz20txdjkedrybh3gee2g3j4lpncgmn8jicv6l6aki0acyo6vcc0sdx7nt0k03fmp41f0x0m283axe5oml11eh3gyi6mi721h7rpxo87jmti6fhrpfxjc7f2fv78wvmsdrxwthm6840zvuwalkiusatuvaiqu40j2gcdnwzmrgrhc1898gnt1uy1tt6ip2bsu530um092o3ymd7irdd4so6ndkcnmqhejg1maeszwylnkeowddpzu63nix138ne0b08408r65wu8lwpezbc0fqtshe3hfufnmj6j4su9rzie16rkn3hi382bnzvozxevjftil8emwmh8qd9fmhoki7gmmvbs1md8dg26uqjkgf79ich6wy7z7tnyr01l25v62zim6m5yioyx6woogrs662gx3339i5eceulmwkztp44juoz802qnzc96dfpxczdz1xq6o68luvht86mv67j9zdpgtm17y1zw2tc18kium8jd40w3m1htjj9ji4jxfl8jhz16vs7x85odfyklxmcquujp1xonks0gsh33rp7x8i33xiy5799xt0l44c6vca77gp5cicvamie5et6w598b0pwyuo1xh2cd1u9tyinit6d92sx83bi7zn3sp4hqj5fditik4x7934zu1bb2vhz3uqwb0fu722i9bttgpaq2m4jr2x9457ver3rgtgp8tew6nnc2sdu1e8263zzlo75fb6eb65649fdskxgf3kq5zdep9althjugjd31bu8r2zs5ld5z6ho1dw6096vl787rmgfzg0zn03e59nu9694l2pq8hejrrgquxehwogpt14i01udgvcl0y6mn3o53r96n1sgjp06225fce0x6ycsfvu4jos289xiaothcaqte2188ddt3106sayeof1sal36f8oq41blpcnu148bf1owbtlfmu2j87jk3v49trt9gxouhpjp859hqopnchw0p3u9ok2rvvwqygzq5gdgtr2xjiid315zjcsvi0y9c2cfm295pm6uzycubb84z5894f8tce1z8e6yu1n2y7zqioydackn5yojs3nlfl8yotqa9g8rb16oegzvkgu15jfkyyup4r8goq',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 1432828625,
                expiredRefreshToken: 5741251323,
                isRevoked: 'true',
                isMaster: false,
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
                id: '404d2cf0-0044-4be1-b316-7b4ff5fe41fb',
                grantType: 'AUTHORIZATION_CODE',
                name: 'w564e9s8g4onpghmk3yidelwg4sfnupo33906e1fmrnrv3o2lt6opoxa5owx32ebkl60y995whaa4sh10f1qfffhvbf92jsishkntf3lc6b597u3e47kwyilhcc1taizbjpxa03db6mlr01yazj6zol8yuc95vlx7hs871fgt13ivgoayrplqohonfc78tz5ca33a2af3pcorkkfq116rug03rwndo1r8hapby5epui26zh9rf2nl76slv8sn9n',
                secret: 'a0c5y8afbnmg52e9tyrtvfky8515wq54gxmjwhrugd305cfnv44duskx7bzr77eqs76tn8g5fpei6lnajzgr2r5pc9',
                authUrl: 'jypa5gwdkqjuv1aa72b8us3b3nich0339l41me9noeu25zq3u2xf82ylt6xfuahbifd2cnpknyaj23z0f183h5b11gr4w797bzh9zo6z0tmwodz8fp4p3yf9s4pr94qmgpnmdj0yd47twgm2cs7shmnqfexrwtxri1c9y6l7epfuiu412se614bbbfunbo329o60dk12z0roefow2vp1y1yy67veznx5e3pd50sp20hqlon1ki0zfqzs48z2j1gzpuprjri7rz7yfcgc1hox3fg4ykadulzlanep8l94acj6tcpucrjz1y2h3ngqxlkprvadcv3gjgaazyzf1yotnyxoslhxldam4lso3fmkgvrmn3gd9xwp0r6uwegx8acy7tnb1sazrtt114kmcjod4g15y4qhx4h644n4yvd3usj8ehdloa8psrrbop0usi4u93jx5fv9foizk06x5t9j3rlgnk5ndcyuibqo43k053fv9bv2ad2iytrbki1jhs3ipomrmgkrif5qenx9uv8g8ol9kf6gkmg2p547h381loo9iti39s701ta9bree5vldoy4bk3aqf7bhp41yy8e4ykyuyuqtn7rbf1h4ir7p4hexrm76nlo75ryh84dytqfh51mnui975iaturzfqa8go93c6jzl52u7blzwvxlbc5er487zb3kzfyxt675zym3d6vrw36kt7idehm8xkdu8civ0miybltdhcd7lnv468n9u0dnr5w1eze5lz8trorziywssgnw2gnc3djwpmhgjfxry6rd7arx3j3rwvsfyge0tvahpe9rlbqq1llf5fo0ep7i7hfm2j655pxb2jur6aqapec3lz49htbrcqiufl1b1n1g7d6vd41riucih2pdkzx5pm3rphl6bocaoykfjku0di3up4g2k2iw8e7bfp8n0ieb2u7ek0vaa8urzb64bkkyybwsvsqe55qz6gy4bh0zgbof592b3zjida9diivsx0jr3v8g5u0gyuf9ewzur8hakf993vlvujzez1xqb41t5byou4om0ge8ko5guheyrabuug4502i9lh70oiyw5niaam1yn8zi6fx3ehuy3mtxhmfaezkori5kov7fl72ygmcqtizbsbu3vnfqhd6dcymvd2zd4xurhagzyholgdmzu9o65kr9lsr5e8dzem15rywvhvoelg0pfjdpwmbz91h6k25r34qufolbdzqghgmlkdnndk04bwsm5087oozcfow9wkahuq82uf2flo007oivovanx6nirnffys1heynyit0gaweig971wggy41vpck4d6g7sw5dqdi8t1udspg697vm7rcr0nu738vcl0pyq0vkmfjl813hktsczuraav6japj5735cjd83gzimagz9ghpddsfx1nci621dtd6djdan8efsobk9vfw0vdia1yk0bsuf2phtjtinfes3s3e0nzo6n2vs7mbu40u4wv85db35ons3nabjxpr0h073b45itd5blb24j5wnxcc5l92i3aqf75cnu23vticuf0vhaft23k0erndwx17o3ejp6scpdg8zospk3x2z0c8of2td2xs0nb3qrltfr32oxl5fy7af5937yf8i2vqqq8yf0y827ypk4pkw70ts6od6a24x83ik47bf06h1fw8lh1g38bzg3lew3sh5wn9iji0vcz5ilxye06ouk8ag8r5a3q14h2eb33hwm98gk9u7s5ncdndyhss1va249tqcz5b9dkekk5bxw3ioawxo6cl14c2fv913t4q8mr0q7uo6of10f75btg1nzhgzzfnnkpx7lf23bwiaq7lc0rz1pmmyvpgbir61jr8bshx42xeyw8vfzfr92l4qj0na3hw32dzdh09bbsfrakdv1v5epf0wuea7nrmmpjbrfvl8sv1vkw5sqlcyope2whlsyfzw19iy0b08rwniy9ohqwd5lp7c26tadglmvnv50f65gnu4xkbkgnhcgehb44jt5jtib9qzok3bhdbyzt6cegmgxyq93i',
                redirect: 'h5lj1karwnd9j1jbwxlj687eu0etpeefkq4wn9730moa12wanplp3w2i7nm193weztbo9h19tiqjxcyui95r7eun8wowz7od00q91smqgf820qckruqyutoaubc0rwsv35g57asn0dxsggqamsd9psa7ig9g7x2hfar8b7hedewjefejks2lvej1hytbhl2uiony4hy73jtqt1e0gg10et2iet722h3t4l5x0v0zkplco043fbwlml67oqbpb0pitjiuzvnzzwiz7evrq2xmb7h7ig2119w4pi7guqw1pa93kqykz3cu2ocynj965o6ols1kv5c3bet2ycw0aztahsmsionkukzmad3timp4kbc89rc8goi20d6ika9fzudhzx6jcexksd46vmy7pcb46ivu6vpok0iz6mw28x3cyii9iepqiw16f5l98r2oc3pqdu7jdx1zqjgmtz25exur4li2x7envi7hd6stuc5typ64awr2st76vwqompza4vn4yw9ypt3n9ssk9wtbw95qw046f24tmkkmlsvg5ojz3wdj6vr0zv90yz4o15p89emnj8s1eqbm66v89703nzpn8kso5gx002clybvkoxq6epd2kj8vqhdgh8pp9ne9kd3bvzlrnxlhd69ue1yc9csh6v1uw7xp5ftemxmxmq335dbbmpi98vzhaojrkxj2c888dtp39k8wtk7okiys36kczqsoes7nurnpes7o7bgbrrartctp3ajnn1ymuleip7pbukzeiws85zx18uq3t60nxm86kvhk7896u3btzchoh35nn9k0iqa1b5w2ql0kvy3cemzdjpt73azsow8zytez9duzuvehjp7upwdt7qoyhx3d1la0ygyy4tvr8annf42f2ulunafpz9u4dqzhdy4oblcn7r0j26g7fpcx660323mmqk5ui5mscoecuhwrpo6bidoyoqrh1yluuuahvgq7gimacj67tcaue6q2pb27ps06rqf25iadxs3qhl5rtv7ikcfjck6uwsqbz4v469ni397ygxnz6plxj7fi3f9mrk3lhwynuhecu4rjuz5bxarmqezzhgqxhdq58t3r4268hbxjohqd02rwa1jo0ch5svrgkh5sd58q7p2budugbkcyirubap7miy3uiaerfhzf07qipi3ucvcuq5y4g82lyd0oya39e1ko0r3gmn21qs02rmw5j9tdx2gju7nm78wpwq3nxgovoru35y0xb967swlr724r0fc1ci7qnk27v3850qrbwtvxgkp7exi8f706k1lo67tvwe3ry1acqunqya2n9f0lgprvb22b65t6bil13mglorijj87xlwk2eyly1r2nap27c7z50v9histwx2eh6l1rp2q572gtivi0in0c52rxug8xjym8vq0q1yajcgzp1kmjp41u8fvhjue4e57z6fdzifbpsam8i7yk6raqk0cnfx5cpb0zqhdz8ryvumugyl6r6xr0cp18t76k90n217256v7v40oe42vj1fd956kt7309m01w4nxdq31x5tveg72mmdk0t8ia2n2azcxlyj78ot6gominqzx584dxb141ata9ow0rktpqfuebw649fgzbwju2dc2cyvif0qkup776kifr7knm16jywlcv5a7s584fb1278ifj8rp1bev6yljas1ypnedi5q7nbz2panm5ybqcr0rqdnjb9iabrhpwexpetimomcznq4qkyidt35girh3mg00xu02n1cxvzljecweogk9nntl6l4bt5py4pl10n3axpknuxmrmzrdfnetsrsnn164sqxerhoyhf14msevr0go2e7l9rwgediv85pupldt1up0ext3574ptk4wjthr3p0m4dezcpvt5ut20pa1x3i9zmp5cvusnv2b0zabq5716s0um549yipuh2h7d3a6izjqjuznqj60ao9bqoy0xzc165wgrsk0r8cjliwi0wx1ib6zn8mwpzh5spyx3qwmi9llsadyzr3agp422mlgorm3n7qwkquam',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 5267350220,
                expiredRefreshToken: 2674495630,
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
                id: '404d2cf0-0044-4be1-b316-7b4ff5fe41fb',
                grantType: 'XXXX',
                name: 'zsh8131vlfu3ys7ibuy3pibkc4vus7pjrk7r53brjbe897a24uw1go89ky55qzvu5dixxnj6xyny0m9lrcszzhhxiwh9v33ziqwq4szgarnnh1nivrfua8gu33yffezdbbiirbjfhkubqykx7a96ah7g8uaa6swnlgy4uqvmoer6dcd4aqh2zl4kx0nz2bvz53dapwfnx0akxnt3rdpprsr59o79zbp6idcwa72dh18asryk01247fjf0zeg7ax',
                secret: '7dozj4b1o64asj6gbnkepjwwwvnsyqa5rjnyputd2tsdkhf38s1tifsbqnr30ucv2bhbavfp2o8235w6ls9tuxm387',
                authUrl: 'ws6idoix6ec9o0cjd3cjfl6nqva1cvq2c76z8pzffbo77h48x4to1dykvs23vo7v3i3i4bqoth6d0g33ez1yysw9alniyno8tbo60n254mejp9bw74l6nnjfgo11pdzj0vpfm500tuar14746s08txzeur69bsq4hlkeddk6480j90stk7be9bnndue9467jbjstmwitibu4wtvxdmvj7wmjyqlw5v8yub59qmpzj8ctia02ithrav882f84dh56qubnf3l36t8fyar6co3kwzuf7y5n4y8idpbzmms669uim3evig9n995ke132gdywl9xdl4s89ozaq5bpgxpv0x1g4h1dyeeh4oanqdcyzovtmojxhsty4gkpl2u9v7jp04893v68u5c4li88u96u1wod5xd5edld6wbauuqxdwiduwzi3pv39946n6twixbzk3nu5ss9gfyxli5hdywmzq2uyijhjsxqbjh5vd2921v2fm4a9wg17lapqjokfl4wt96l4jgaa94u35tyixpz7z32ypgzul2e38jbjhrwu2w3j8ku4iudpfyxfmel6ahvujkb90xrxqo0mpjfbxq3onmf8p4864fubifb6pro7h4xdl9jut3acp5hsvvojkcocx7dtapv3yhc8xd98gg09mujki9pvvfnskcnyl2vj25dqiw391twagy78n7erff4clle5zy6x39cz15gyqllcsz9ae5zpxybhgfj2kne1s8ltltlcf9ysuaxpu83y12goxcvb6txj7agnfc27cfpfout6yeq325b6da2imxz8w74jes8dyp5uh1wyu408ttes0p0pcbyrpl54qqj5rax7ohn4uigr4t6gl27har5czve26yr45bxwr31hrno0zhnotxuiw2k48ymtaamhx3242bav1nczgukk8dz6yhgpovh688o5hjawpsoomqv3cdroz2m3bqxz55w2zxzh235czh3gbh9zgy7o3gzn1hqntqhf3ldbgbd5lpp08xsz6q764dww73lxz1zsy6gz7hyrty5gof042602thrvpykgjlg5jxw3fgdjz09978jqmobwsp33ts32tuhz5pbpqoxvijbx8p9cmnr260354jv9supwhspmv7ybqtt4me1lbbid3oa1gkf2h3y1cczs27t5yn0im9uxbprbl4zvycnnn2ikiymdsk3gom237c8qoxdk7djmatcbtjtwd59152kl21csgc9slrcopo92wb66mgi9itax3mgsjbh900dcj3c36iw67y607rlo11v31we50d045poy8hntd0vq1wkhk7yj36haazhsvlcm4v18o1eugct8v1c7u108635xdrei9h58nf2ls70dtdg12zomsfo4h1kcaxnpr9bbakg4nxmz3v5qbiam5gk9lsf4uufq4mulv1rdlqhtaa1ibs8dmjxs18vqy32in49hlrs4sn3ye0az33jnu28eku0sj18em3sravzv56b8004jv2q37htxnogbtno0g5c248yhss21qx7lhl6854vus3zh6nqpvqre7kmnhy798n4hupkek0uaa36uzvgq98yt7pdx0p587icbsp62a9qc1jp3axh5r6i7dm0wi52v3ubukt9z59qzcbhg5c98cph9n50q28qukanq7hon7char4h7isg1exf3i0sx9sm5kdcc7gam5q8jvytf6mjhluzny3kdl2loevwrimz1zt2wf936cgahnqv3uuu6ooc8hedtz94eleke5v4g03i9rej53k4tvlr804damm8cx7ijsb4l2nfdkxv6ug30ma52pqlla8rx4jsao6hlcuoywggcxrl1utbjep057si6afr92orpi3qtobbv51i46vl0krvl2z3vwmlu9pm8k66iarv7amlz21u45205yml0esl7vpuzijdgc4nq01oy29o131s5ue9ts5rn6y1fetqtpbdmwm5rkjpgzyzqdjzhhqumkjumqc4p2go583pw1qa6e5isnotv9ukfbrnpxjbpx40xwp3b5xl',
                redirect: 'sopsxs3j47tlvn4vrnsu7hnytxgr9tyse2ya3kheasw0espesnsdranmzu6wvy0va576fh0xvw3y7lz6u5otltfie3r1hab88jwsr7udgmf2spgxpt4k9qqikgcoen60i2czn3gd6tvwdpxoq59t2k37dmpwcriux9le6u8f3q30tdywk0xvv7uyfvjb99qnyxm4ox2bb6i4zfc7i88cnt4smueapgl9tla83ejhr8wwrt0xaxfxo6tb52hj77fflgg7xlxk642nfve4h1jk5u994zhpqf6oclgw9c7rn7eriwml7orvj7hkrevpi24ypp0st8tmnwqd78an34n4r401a9vdt84kbhh4sgeznbc2lusurp53tjt3ysnipb11i3te87oxlmmfega2hsl1smtomqjbqs8nmrn0f5d469fnxf9y4o8vhfox0viguw37sg6z65uo4m0a99930vyjjbknut1zra7c6ilr1sp8au2r7l4e2ktqv6oxhmuonx4smssa8enk7rp8412i6s21gwlqdtn2645earlkqkdsseopgcspww9di28xqq8a0r6e2gwd82kv6y4jv8wsr4s76j4fxeg6wl5upv2fuax3pm2pzpcv1ws06of4xfzwakhnspnouos51lufyy85b6zqrnjlbw933tcmg9udhvvg9mohhi7v6pym8vfyejeph3ivwt01ruf5rdyg8pjgthsf024utou9hun345ytcw50lgrl7tllz2bckcu73quvq5iklfu2mtwj6melusal7zjgi9yh5da2sowsfmxpzcf2xsk8lvo393t0fkmm7erdfbu3s7mthvlbrfmi1sihqx6ielb449771wmcyaha5tl9yba0wo0ixqe77kt2v3g5asgx44uvm824cu7754rmdf14ea8t48mg8rzbpldzdmfw0h4bmkcofe8dr7zpqvuumf4vmyer70ygd01s23d9piisnchaq6161wc53hn79tkfs7o28di8fybgdnani5rpqx3nx9zrnow0cgmbe2g57b532az3jekcjlk1bb6ll3n9i3crtejwybisrd8hq6kktn1gk7215adx2wv60oww0shtgxrdcm1mawk6wx14x0m1gv5smemsu5apz35zum0t5peck1z50njc31a9w1bxsgw1osf7vk8ol819t21cbievlbf0o241mkpwr63lkd579oebav2k18x6xnma758mzfx98vfzvmmm3wsdsat2xrf8loid69e9t98zg0qhshhn2x4jtnn3703wtoa0ripp3g7dog2b6u06czgf2j95qgu3kruk0g7ioxxqep1zi1s2uuj6uqd6l9j5vvepxen4tr223a24v4cjjexo0q0ldq5342i7a288oo6cfop7kdtt678a8ve9hzr9r1xb15oq7ekz99qejo0lomd9yl4mjzrey4ohfaxz83787duq9nvu6uavtr0agp9g5mjana9xtr35skia2x432qx2uh55be3t8c8jhia7yk0tv9rvfe04fi35fuyzmcvzd4cz30e9so1wh4blt7qn9ivmgbl6wevgskryd8ipgw8o3syep0br6jf8j33koswbtman5rfa2gi8v4n379hi6m63dowrv24i9of5gil3620vtv8dv50hid5p825djwlyp186soymkag5ehii47f69vnap47kpzlbhh8rtaz3cw95rxn8d9cgmn74rb0n2bl31dcgdeo2gv12nu8q122ss19o5ninkxwcfkwhncx00dc5yowtu7ibtftxe7g55urg1v9abiu7956gg0i9bcvwvdpxuy88xbmyob38hnj6t34bvv5lxiu8lfyjjrsjioukyktem982978n8bhe4l5n9nqg1te6998i9um852gwvnn8jdk0oxn41lqekwdpp29oefof80z2m4qxj66oieh6wwpmw80skjrqr9556m6uvzkofegqrzoq3cwemi0skj6mirwkvxqzhzfm5md2ejaqm995uvfhacnttf5bjbaushgbfcxuj117fs10',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 2870475353,
                expiredRefreshToken: 4091903891,
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
                id: '404d2cf0-0044-4be1-b316-7b4ff5fe41fb',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'zykw7yomajhmam7stx7qheij08daqwh307u9pdctbrznecal6x9jgfxknxch5idxutxmevy4npdnf4x7hfgz7rknbo9dlgs9zdynu7emwe0mf3jtllqtyk2vec718wzmnwmcda7hck1y109l784wxcz948irc0mc712lzbufczkfeavwfmqex41jcqq1pl0515ysjlzec6qjqgwurik3gwd2jfxyufuhtze4lvnnlfbojvlqw2qn79gj40ukun3',
                secret: 'uudr22boxi7bhzhg3nd1hps04p9g9a7macllxrp7uuxzg11mwaci50f3slldxgtz2fisfyitfxufsybc12lnw8rthe',
                authUrl: 'sioexx79iqriricxnvg6pjwrz6nn4xi5h2yf7bf4u44ql7rk6nhkt9hcupssmhfheuw8g3iz2nej8kre1ycf1q1v5w2m7lvin8b30pcjteitbtc6nclabl6lfdtu1d6jj36qct56bmo7uvw0vjg2shqnphdep0izh5asj61xhdgk41i2g5jhahjp759gs5jfccgan9atrzon9bnpsjgty09y55kx107lrf4rct9upx8hbj3ww0xdi6bze8qmxjeiqvmcm758876r2ra00keeme58kpm1h4vtgu2hbr12tzb1myezmsbuf5ez898mci8opjy2vcmiytrvvpy41csqmczjq23ojxcvhomtqxg57ffh2vb8mxhevy40p15rj327n33txspqzqi4bq0r9deaqhpercg35s7vjqxdmho6ve3s73gcritxgxcjiuac6c4i90fvyr91ficyjgzmw66y722j835u02lrni1skv7csvweet5nc5htcsxc8td0akakimr9ov1ce3za5rldgbf1iug6zhngu581lwzagvp7z18sw9292w42nvytyo1hazh9bl1tolbc6gpoziac121f3cyx4uib6wgfnlpe1vu05japgx591pgwefmfp5pittvdkwm3waminkwd74odjgk2xudglyhunpqpoggge2rmjythsib8eo6wtzfk2wq5aw6b1y7eqd48lpg00f7dm1kxwt8o9syr41pxkilj3dk9cvaooc199nqoh8dxiay29ozrgo0gwnmc5wh39qnqg3sliox3om32vs5lwh5njcfxc9lvs0ktxg33bm92ybdb8kh5tpn0nbzo24zurzsx8349imkx8je0a9zdp1ef6k6v3xykthf1pkvi5r6k1bdpxtp7zvboobhiq9zv9fxta8cc1zfika5pqxefbcghzuqzuk1ufwl7cxa406gv0zvj3pispkbhsf5h630yze1k6fcnddilhgdl18dcdvky6vbxf5q7yzz2ayqxvooxscxi78ov2garg061jinlnqfq2zgnfdohr70xuvqwune2yrrucjt4r8sxr4jmnf0l0hrp8a9p3xfcy327z03kn742h7jxh3wjff7z89xwb5pc7udmm7ekprly3mradcwwljbwdht8m3m0g42za9oxw2rrgx9nrkm3fl9upomfu2f5t3qwqmkuwhtdiz96bocozel26hz2qslcutabtpbu4dwlt0fter0ur7zyjortzqbz9x7tyspdvrw45d3worfqydjjv8a3e53mtzds9obacoyg30eggpbw0fzxio7kvl4nemie4x5a4qw4wq81krrm37zmzg5j81iazfm4lptjw4q8wlwre4bh461z5m8ji2idsjmd7hwx5dkoy9gfutkmyd1nm0mro2powz8hoiqhkeb6cyn0a65wtc79o6kbaoksi9y0soz30t5kvg2tvvr2slhbqshi9ycnl1xkun1tln04iw6ttls5vxohkurg3v6v1lwc8e0uy7rer8b8n1kuc1pz71yuo0rq1fu5ppu9grvlajxla1g1hi5ychxdw0ozc214m6ag0vhv7r46qwnbx3np250pxlkoyik1yk4wb3x4eejqi23i3mh2oaf8lfgnfa55142adf46xv2cbdjgole7qcmny6dsc6wi391hneryz55lf2w0xf0wdicbpt4eau7c9dn4dpuggbk57sq0n0n23pbwerklskr0r1jeoi0u5r23gw76nxlkbn6xoyrbodrt7jrnzhmpomb0a6ol6orci5o9nlibln8nfr44xhq11mnk3cq4tmv4g4sztcfhofu81rb0hzpm91ihbtnlpt3lq3pb61evi5lhchb9afl7cdp1ob0z9kvm31unkvee6u06azbr4gb1emn7jca1qqm94abrlhpbkvjmcmx412j5ailu4o59nj9a2qa0rw5m9airpinwq86uz1csv5c8sxxeji17bxy3tf8fzb82t15fr16dsouchy3lcqm19isl3ivlw89yid4lz3nkr1a63v0hrakc',
                redirect: '17qy0by63vj19idmb6sy9qhqecy0br39isb5qfi4iqmzymikeae4bpel8xhjhkm8mk2pjbawxd88kjzdflleb8iwvqs45x0f70y3lzgidgl0ooyvtf3mi9hmme18uc0l8cga0ugfsqt5w39xscfvofuqdegbrp5swgck0cxuvb2sieo1gfcp5qodu17ubdj52t869wrpdr4kymjivybc1l9mtw3t0xynnhlvjptb086j4tk6qahrohri8u00gr6qozzopds40k8tkt31piwzanko9b9rcbl35s4vxs0394jgw43i0849rk6z2afr7hlvc6wczyodxtz3dig1ihghyx3auso17kd2jdlctcnbe0xewip4huofgtgydecyfyui3cbzby65wkjxfpuoeqqfyxmly9a1jhow7uu8031q7cik36ujx01rcykd7giye3vvx43g3bhv8kbnjuyd8edizypz8yhqqx520eia3ueql9dwy3dq8u5tncwvvdzdgtm1scw9py3gm1o7bez0ad9t6b3kmo3sd7qgsjj8kf7wn11bubrrwi8ofk0ayyvx6gmx80zbyl155swgnxg70gfqv83ptn26u9qb88spixaoue78qrlkjryaymnxdlyss13drzmt20qaixltr14i2lq63tjj8kvyfibszm6cd4x9xs1x7kbelaz2w9m9znohl7870qgohbo2k634b470995624ogsh7unq6tx266zw0wm71kjw87uqkp3tmy1ctc2lw2n4ver2yd9bf9m981g01z76m5xcdmzdvotcy3qlojiuyp7eo7w6mkba3rr3pjhkrfdzu18e5ivlc3xiaokxh0gdrosi437afxjw7o4k5teqg1aim3lt1jjp0bxhviux634c2fuoe5e7rikvg1ayaplcm0as76vw6wxral72wh6r9kjwmv0z8zgi5i07842xx4p4horb6jfwrcya0m1wuzv5asmh3sn7zpgmabnke6kxaqo12oc0rjn3kjnovk47hfvalar459ajetabcs15nr00lz97rct776i2mu00l6u8rex16z13l8sm6fqy41qgyoy1o4mmexpkx0q6nuo5p4wtxtn921dovxt2dkzmb0v8mlh4l6q6qqvi40oowcx42lznzrhnwtjxuzwi2srij7g7qxcn9kqkd38t50pxdgukesw3hhjmougzflmwmfe3t4yyzx8zri1hoduu80v7x5fzjj1bpa7afwk9jsrbsad8vyhigwrl0bqf1efl1a89v6pyvuf8xw7g7w8sf0v2e5tdwaxz5epzlt0qkc9ldnvz6djzun2kemp3mhp6a7nha5ldwz5bnswuwv9rk501gbj8oo9zjylw64fqln0c2ql3n3zfaif962ndcuw467nk6labtox8ui9pnq2tal78vh8enwkkmeydm24zuwrtmytlxmsupjffnu0kn8dxy7p7i3qtjlon3yx5e12tr6iidwc6yolw49h0smth5nny83mwxrbjhuflpcigehhq3h2vxbao7uvfyfb3dgsk2efwgmsc4dqj9awnnih89chfa0c23d7brxpmbn2ockmairpszt4b7s6yg76gszw590tknu3uhj9sq93w4uddhqm4dlgyt7tlxvxt2m1h238466pc7coyblqse60ay1g0ox7re0hbv6pql8uaf0qumemjt1v5pmmn29ril025uxyc6okyjs89tfxafde31f1gcm7yief60z1pglm0ncaz8kps58y8j513k41f87w8a0jksl3jej1n6mzz1a0mzg6gfzjd20n6tbypaxhzb8gag2lwlysvsjxx9v9mm5dpc00fdhs566seed82ghwzwvv86pipi1u7dg1h5bmj2i3mbadcpnqlorddcbj7kpqm6f2n6ue4ignlduvlxhja2j8uuj848u1eawqb3dc60k39cf9vgy0a2eqcyp1pzziv4uff3xm1266629c0lv1qrl72amqqcyke2qqkvjf235vkpvin66fity92xs8vfl0sr3r7gynmz9',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 9015883157,
                expiredRefreshToken: 6927153861,
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

    test(`/REST:GET o-auth/client - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '4d937c9d-af10-478c-b321-59ff080157f5'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET o-auth/client`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '404d2cf0-0044-4be1-b316-7b4ff5fe41fb'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '404d2cf0-0044-4be1-b316-7b4ff5fe41fb'));
    });

    test(`/REST:GET o-auth/client/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/e5b3dc5f-6ba1-4059-a78e-3922b5ae9cd7')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/client/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/404d2cf0-0044-4be1-b316-7b4ff5fe41fb')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '404d2cf0-0044-4be1-b316-7b4ff5fe41fb'));
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
                
                id: '98506d54-d4d8-4926-aeae-54e6366d028b',
                grantType: 'AUTHORIZATION_CODE',
                name: '3y1lnqraurixgzlcx7lvds5vutqqxaf6dfc41s8u9gtca6qn9kbl6llzlq4l18gzii9ffuspu8o7e0br9i7l32f646qn015qravlf4co6h0m5pj0ykv1jluzl2ytsnyxmyevzzauiad0k7lyp2yfz230uaho2io043yh9dolahzwm0x6ht63nkt0gspem62xtfbsveiznbhjvyrivyrkopqkberl2kiah5ai33ptpi3ucxz85z5e1klvn4lx1hy',
                secret: 'gxe8eedgtywm43y5anmy0bpjmiru68dkalklua4bee8z98pxiyk9f5wsfzq7ot97k4kkr8olzbs6oazy1tzrsgut3g',
                authUrl: 'i25hzmf63m7g8vhbalim0eolgyagbengg5t8tsozrp9b7y6a0undx1zr70znw4twq80i3xlmrt6puhe3puy3r4jf4hq77bnxh18e8qpkkmgrk27outpve3dslyltlbmscxljf4wjxi6e567kergy68iagbpm5w8jrw9l3p9htrc8ck7ezask5nvlu3uaqb6fwq7e9vxc8ovvjrk704o3abricfgbb3mitwdyl0yfog52s3u12o297bm1e22lldi3jwnx1efb0hhnakqqpyqpj8ncn4s7onbeiy7n0f7srts0wsdlxev0bpv9rex0twbpiv7f84vqmdi8b9ne8h8rzv7jpoohssl0r87dmgfgu6d3h1wkjfgw1qcstuo6tok4z3az36gnq1jkxhvh7vlh0r3w9897iq5r9o6vn1ud66cv2ompbv5qvg8gg505l4dpplswe2e0m6z50asajd2oktj4uzuq1yo2gfcvbiqcwsnnq9x27rq1xkp72jnh0fcifiwvwm82l7ir2q5trcipp6sdvzpq5nupr756m7itu9n63zxzay5jm9bjilefxwxofvnwvhxf6a2b9z2axkq4c81jj5f9ya37kaiqacvsb7lff2ni9pzittf4t5ggyvqkyh6483kvk0jts5nk25c2ctwu3v1236x2r9paz42523qhizp8o3dqsuj6wd02t2pl5qq1k6teeus3wqapfiqnjo6er8mgh5kbs1lrczeqpj38e8aucx5jvzzd4ahklk41ka2ppe0xu8nndix5avkaka5tivq3lfhuwbthwpzsndvrcb5nhn8gjws0l3ot4faliosmsxgqp1cvgaqsvwsgpsitq96e2iwqlh1aq7wi7xkgpgom0zsl87czjirq8h2enymnuwj94a2etrb66aq493b75hd8ohhstckb2ujy155cv4afts76incn2cskzob049hajpxuxc5z30omee6d99iqwvgqg6r75zvr26t465k5ypeq4v07dr39xoe1l7foadhhg5t2bxjn8ddmecj32rquwxwocvhq5z89ekr2h5zrxgvfndd6arvj7f5y5up84byut6jxm31bootx0eq9lxok6d2ntf09f4n0a6h8ifl5efb4hu8gp6cuk94jvlt7wl11pfm47psd9wxtg93idlk07rlu0ux5wnarc9syh4c1qesrdohyxd0o2ataufnno7r0zi3efficchqrqhsmbcq2237lx5z3582jrb6enfam305nmwm46nd267bkzqrvr6tcpe18e0sh0laj5aay5tj357pskyv7m46z1y690usc5lg27oukzqniiicqwq0hztqv53lmgowtrbbklioxjb96b5ied6gcryuul5i4okup2hh8e3rsih8xnj85iz9ugnfvkuyzqhaxjidkntnxav5ijgooy2uz994v14c1i9a5vg0o69jjeivxp4kipfthrpxh11tmqwkv073c4phvjmdl9s8xs3vdw5jv02v3172dnxwa2x5cv14zicmcln0qaps0hi2j90qv125vfxxuoa7yae6mpvxh303pstgg5ukti4wab2kbkuesl2r9m3gja4m3xgti8cqhbq9taw9gd5lw7bmnt9lraw6yombctp9moyohvk3c5q1khh80hhttmbvkiz55tm1cqx4fgee9fbulxrelb39hbgtcaskooxvffobmjfkgi9fw2wyd7ptcrxul4jvfy4tibj3ci0pl3tfnazpjv7mzs2sm1dqp28k21pbwhu0wsu0o08bw4lx05jsoqmvcv92bctocix5amya9ljkr1achivaej6ub9713ra0rmudqqv5ydjiv7ly18ve53yzxrvmmk1j88vg2qxnh8z496w2myl2a6v0rrx4d8d1b3326nlw8zse1lai9wutnoe8vaks122x8c94msslzv5lkgeygq53wtfw7rnnbnlofjw8q2tb1nflz7ytbfbgzpku8xn98g0at9es7w8z30i9d3c4e8emruaz4rctdfrt08ntzrlcyhyle62yv',
                redirect: '5wq7a0qo1icnl2yux0pz0p25jz3h4w7jlakj60lh3car4vme0q2c7m0iapwu61jf33wgvivfd2zrgk2uk4mr1e6aij1yrhpyn7ptq5ws9ye4a4rsslpp7igzp4w1aq8bogckkp236xig0z1whod5bccjdhsyxhj3e03xs54bwybcybbrwibmnjq9bq7ubmiqhcki7okvvxc4yy3n251yv03ndj1lenfpzmvkfw4lxhe1odb5qckwdm4lmumrkzghqxvi87j6yzwr1frx0q1v2t3n8xdded029xkscasmnmb03vcf8g5ntia788pnbphd80iiskam1m1r3iok85l7tmffkbs9gfhlktotfezzp25vcgttlvg9jhhycc23xrjhggx88lisz1herutlp64wspn4ayh9l20vvoilltrwmel3knlv9mesyjgn7fuxq98m8s46aulowyg92g8bsaz55gadh1mevlx9res86vfv2t8y2himout9bl9zafotci4p5tay89y0aesdeo3e65a0im4qw4r1ensta2mwwamglqcqu7aolqh1icce5fu8battih2u9b32a7gtecdsk7g5c1yyl5enwi5yp89usibtdz6cgurjul9r5qecvs48c871qkf899uztj6vfhmovaplec38uazm386h4e4a8gkazoaktkkvajyb99kw76md8xxqkg80tfhp2q89w2w96wogn88rjc1eznp0w54sv12i416wg059qapx99mmqjva8lnqwcuxr47eoehc1dk2g7e64z9iwmin2zqyyq8gehishbret3ob5s0r6ajg84d2ycydnv8c5ffvtrwyeppi1p2b4384zmtzmplkeyw79o17gt5laui0xtrtsrb62xm44z96kywqkhh4wtuz9vskt81szpcsrldyehcobrllzhdgfcxgvd6wp95o48ffi3jklj4v1t25fm2xy5qp9xzfe5gtvjf9047v93tr6b9w6wgmzn8ibjl4o3etcva2mx69n2v4mml97xc5dcbgpk01pk753uhs0p26s6hiwbagayiccoble1wdof17uprr6z050uxg94u8r4ufd61fxcsssvy23kfeqqkkyykn1ffrj6jxszg7xvou76djfsvflg0ih4h5cvmqqtdw5dwvdewsx1umu106t9cgsrp2c9um01ef2k5wfzu0c39vgrd22mir24jnb5hgg6g8h72ymu0vj1zz6lfmmqj3nw80a8ulk4wcro7z7u33xtizprdnkcn65cixus045xawpx5m8ad7d958casfi9mtd3in2no2ducwbdie2illv2mjop6k7sdunmaul9fy3iar9952d151w60fnw104co9qgfivdooy38yoibx533f1hgjd2n7zddk0wkf2e4ptco5ee320ryx600ylmp67kuvqz3h5n0yu37spaginbvw6md9zbl87z01w9t4zi1lz8a6qgib63n8n4zmx67yrvo3qgkmzzug5lnstvq4kcl83kgwayxrrpdacnj3zb7502gtjux8fyhpxcc1lgoycl5mojvi7qs9h5frjs3jyh67xpn8l44breezlc7mrahd7oi4a0rzql0c3gvhsch6x9vpild4a0700qb1syvhlqfn4nxrjy37sxfj2pkmnt0bz0gvynwf02ep5pl2nyvrhotzraore0qjcpxp8enhjb97kf76lw7oxtxjw7ntt5pqwybg6w4ydfabayhxg0s98kgy3stezcr1447dbt6ssefrcxfy9tw55ph876m62q2i0qzbetec2wewlmsi7g7scu5jy0dwmo1yuhgu75v8aps47pz5nfp7momcm6il6sb3xpeqk8glh49fy0ea04ttim4a9enu0ut6k9wvtwap688ygzu4ntc1pesfkohbewrigeq5nrymckcd26zwuxtfumfb8p2wycyfrf6bt464tlwqe5my9n3rucgzuy3kt8806b1714ghjd3w34s23lbddnoj8i7631cuw0997yiodiwlaxs8pdlgiu5ylpw6',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 7974667127,
                expiredRefreshToken: 4195537868,
                isRevoked: false,
                isMaster: false,
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/client`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                
                id: '404d2cf0-0044-4be1-b316-7b4ff5fe41fb',
                grantType: 'CLIENT_CREDENTIALS',
                name: '4opl4v9eyk13pedcigbvp7o5lk37dzh40651aerkq69ygbgojg28mq21kjsvfdk34w5yxy7dc7ak8dwqq0k8bm4jjcses7tkaqa7cx3m7mapmww3y8crlnk7f98l51colplah7hc1cel1kiyfk4qrnaeej2ypxlhezfxi1xq1c457nh5smtwdon89m03d30q57qvkgdyjhlgmy84j1gp07pxtqq0y42peov97qzr83dml71mhmloaqw5y1rnlyf',
                secret: '14bgo4gr56j6kf3tnzofzk1e60kb3ea4icd4gs4zgna5n79nrgqtainjr5693cassqzmwvmapgrzpkfh8a6snfwhzd',
                authUrl: 'avy25oe8hxjtm89cwupji816v2t3wjfybpea90v51kq49uithhpk9kzgf1w9v1vqnvk6czkbhxj34ibu2acnvvpfp9gtfx5nq8nsbsocp79l1ev2sp57impubcy02n0cexrwgyhcjagc6gfwkxxro3af3i80jf1rx42p689fwitganupp010sfa2f1ylm53dj842smx6ximgh405g2kntmiq6j60t4szfv363e7tr9p2nvqh4c2amtx8y684cf44q9deg4pfquqq4hs90b5cnfq6nrbye646s2umdl8gm4p8kqpks4419myglvkgzr2hrt9bdohfiej1y2qqhckyo5x7i2422a8wzh61bb8zx7frvwr33pp3agj6q7l1i81m0m375bwxpcmy0kr7kgl5jnwicq5h358kx7cksaf43ggirnf2nx8etfvcnnqpzdahtwyluboyfikeb2l25v5hg70qx99qg0rdr8pw2mtfjr7qp0sofs1v6prixk2lh2hy0xp55zehcezpm56x2wrfm6kn9rq8345g176s3f20wwuxr7tgl7w107p7g322psfob6au3ze3rw8hdiacgexvecitfmg98jsqydp7ez0ncg5w1q5v0ofw4wehq03mmjxk96b0fwgaiku627aga3slv2crzvpzh0n20hm9fiqqj8997q8sidr5ebqqv8r442f460hubko5d38bacswro04s6dajt4shimfz3s19elvigtqx6ttt00dnnvyhplhnva0b131jupfmijiouzuc4eavdfojxrsxlfghvdy33lvzobp5w0340d0nw9q0s8x4dauvv37vdf1ldheqb2msm22x4d6ja625e95jjoviazas2aa7ulp3wvoowyrz6t7iodddguvk8lc2eakajfshc6i4vfkum5zc9yk0jatmqj4ehw16y7tghl5nqhkurhdsgm1np1ojnmwyk13ypdakjvtr0p1z555arawejoulbtacq2njd116drw6nxq4pxvlh9utx8o8fy77qdedk69agy7wlzgwrxik26nfmzwpv9r0jhyb1ry1fh0gsqcrurw8up1oq559qeproyf376y6rpgaab833693akv29nsbegqr27y2o497g3vyrtbw81aniljhee9a735lyncbyp2nl3cbnp505vb75a7fzsvuct3a3vr5sehkb5jg7g8w5ilqbo3okjzdpaus11is005ujwxsidro0mplarxo2l3gyzvusss9yno8qnijvxmvsg35j9s5opdzn0rykoxavfq8q0nffnuijd41kbw029dutswbsmmsrnwte10mb71ak5kcu5komhopogywa4f03jxp3vww3c9183i3lqgim4ksjf2mo2pgn12q56ijnluiahcjx6xqjhtl5c0h9algyqenmgzy194rtdyu481sh2hai8n3uqn3y4b1hvofg4fkcooxvhcjbr1znomde7ntam30vlky6r1tggktrn3x1zphy1nhqy9nr5htho2b16rb5nu9ar6xhrgnardtygvb33uj1j137rnrj6xvqyl8ath3iwi85p9phzbp2g7qmtlxfb8vwzn1h0kib1drlg6fwhdceic44hn060jgr80s1liggodwwp2s9fwuyxtikgnyiu4iabs2oqgjks3c00gg7l0sujbgyd08ee7ql0vj5q5m73dxpdsaznwup13dafxy56nqlp3znzxcphnk29mfep2jfkvzlbbhrrmbi2921of6ebcupi4zk0mxdl964or6bq96rcfae9ptfuqg409tgblgpjx1yj1asy6nud6qf6g2wfvbendc5a4rpicgwmj8qsjsyji7025zf7gts5scxzqnuor4iytajtuwu64hp4qjgqyr78tt1kykizrra19j5b1umupfom8wydpbrzb86u6yvlk0u2d30r7iiaza7jv20hs3hx2nmkxeh7ysk9xp0lxq4sf4kjp6xhts534et1h4tmozmwmf9ha6xt9husarfmot3drjol1msas9ztzg4dlzal9',
                redirect: 'y6bf5y6rbllnyrfhycs49sdamt11q0ot5fcrmodukieb8l4r426sq3sbw5xuq36y506ftatgf80vz3fv6kn9pc6mkbyvdv841r85ia3lgyq1v5c6sc0ua4ap3zxg4pizxqolc9pywnlk1gswjm2q10149c0euz61i0h02rs2z4s1woc8x6dwharpg4kpokobbmg7bcwx7klzrgg65g8esosxbnzcdzkjo6z18pze824uymjpt1hohprk0heqpos20ma6fw8ngnsiv7zlbodzuamfs6yqo5yopuve6klprojmogr0cro1hvehq92x0pf9m780imdjlu4n6haxd9x1qxrnr62cqd1xgg312xyd51hy19mf7vgw2brsnhq0aa4hit7zsjzqg9znqscelpxr5i95uivv5fueo98g5ak2r90vxnlhnx4xbztcylfanvux6xkjoi1svs44kfbzot93ios1fol15h7dbziljjqfhy9m5kzbu1w2eb1bojweopezfb30k0pov7y0fh9efck3xs3wlm21e846927mep10lwymbwonqv5tmxmg96zp72e5kn532jdhnncnqgjkxtg5ov367jm9nluj6gu4jc4ca8gly013jfcvwrmw4u3akrqlgnsv8ph6tjyf5h987r0z7etlbpfbfnzc4062wgpnzgu7wj0ihzdcjnve1ttk3n66d4b4v5iy6bltlu49tk54mqbz9ase4mhy42xalhl5gbxguqnufjcx5bc4jkh239q4oh1kn3xryxnfrhjpd58n3w0gxqi8r4dgxbhgzdh4un5oznro8bj3etny00flybwxu8oi2u2zzh9hn36gfutbht439ylkgrxlu2befnh854ok0nk1anhmr5bp3y1ehlhf5uzdrqd55jeqzu3817ppwps2ytwcrnxx44c0z4355wsspc5c42maqch5t4pbxrqa6lyie111p8w318z6xg2gs9mv9w4dm7hi9c741yoy2l2dgrlessckxc64oyq5y5rb85rs43ppcqolooa4qzp00z1bhcrcqvtiixjcquwlm54ws9qw6gp39lii5lks4zm08esbp8kiiw5dca6tlr4l26v69zqdoj1z5avzqc936nzcw2iwxo4t0tmdgtoouwyqjdihh3p7k3i7ax0chvatc3l062bm560vohvtr0abooh34farkei38qjipxkrc6gljve0d1xeh3pzy5sy3uopjtn12enlic8ctr8mhf7xr6cvu4oyh4bidcuu5cywbg0acd5wipu27k9mrwvr4w3fprhboqgkfwhsqlwk461qwlm01h9c8ri1f41u07eoowcjaz4sc01jurudoowfwuhch7rurmveb5dn9bni66n1feu3y2fxor23um27hy9ncb595a0inlfa1btue1u3hdnjibqzugkp2svnlb3pxdgv0sx9x1bdreo963r5bwwntxlhiq6lkhbmunxoso5oy8nu3wdjjl5yslc3x9431ddch3nvo19ikihjpjn860i8ghv8ksck7201a1czanbqmh8st5lz2qmywu7m35qu8zbt6kof3p4a2khbywbqxgioay1ytxg6z3imunmuyuv74povgzcooky7j25w1zuc4rvxogn7c00dogrsakj8wm9e2olmdeeb6hbu59dgc5gbl81hmst3wyfcr5aoxlv4f1tb1uu6lh9bn0pjwv2brbhqnn5rv1kxfpeggnkigozmow4ru9pstaqlbov6r7eaaq766r8z4mfyjfat9ldxwcg149k6ud0qyhtc9h0azxm3082pt3topotysrceq1jt8nb93po6dthhpn4hfyrel88jelmkmdvqqx1fpj0mgjq1dxd5tc4ng9veg3iv90seigxsueg3m6fzgi8pg4mk6jk31pgdrpdkwtfah6dibntryw9dqw1q8qgcrtdycjguxovyi63m86toigyyvaddbykafepxdsium68jyxa8by3otx6xdrgu4d3nssaan4zk0sifbkqed9zvila8drlo7fufugr7',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 1278498240,
                expiredRefreshToken: 9654418784,
                isRevoked: false,
                isMaster: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '404d2cf0-0044-4be1-b316-7b4ff5fe41fb'));
    });

    test(`/REST:DELETE o-auth/client/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/b1d2b4f4-4726-45f0-874c-947a41653a78')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/client/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/404d2cf0-0044-4be1-b316-7b4ff5fe41fb')
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
                        id: 'd9f2718f-96a9-44e3-86af-953861f08617',
                        grantType: 'AUTHORIZATION_CODE',
                        name: 'vvulouomqoxklil8il6edu7a06ayjs3cl6a5ynslpbg6098xjt081m7rlszk2nbec6zf64whmpn5yeifv1txu51x9givmpiuq98581trxssouv6dgxf2tc52mes5410je7zbkmumwc1ki3z5axwdxlswioa7i5xsp8l88x1d256jsou5xr3neokpda9rw9tk6rs6272owh5eb0g444imoy55ddls4tm3dvaj85og4ge20ivlhb9smt73fkqh4t9',
                        secret: 'ihhi2qjcf50j255nq7sigmta0oc05f68kviidvphxpmntmku5ky5wss9kmbcast0quetzxp4q3qd0fv8kbz5kmn61l',
                        authUrl: 'xyv9io983yh1yg45fv5b1gemfhiem5e8ev622n59twb678zrpceb6if949odqyufl9txpabyid0txcszc2emrose68zs352tvr5uj9kyojf0lwn8jw66nsi1yuc5as30uv51ve71uxxlykhrv9dyyc7q30pxnt38rt56uvlmvif2duwiv370647ccaivfqi3mqebgiy5h9tg2rxhnn83iuw66x9opqdzzuf8rxuwmnkhfb6ar29ipgvxxwwkjywvm4qeu5adrarcnn6oxmf7wvjwzilxkhamyfnfnycvg619i6nxkxfxetsz9v69v7h7r30fkccvgptb6phd112epd67h6mg7cda5whl8c6n8hrd3p29goivvxmi7fcnycvzuacm1r2tw49wyhdg49rk330nyo0fddrebqoe9nw2fzw9zsna9mwlpx1s9x8sbg2gq6w6wbl0xdl2nqc53ilg9sp7gk0qp9tgbmrx45et33alwnur2l2kdteti3q83vzqje2fdo7j97pw9ktxlnrmql1fwdbi9ixmit4pamx8ex05oj9anuatj9voio2p69ccd5ati3tdpx51uyi0arqaqa09dnhk75bavd34vn8bdehuvodr0ciz1ayuisrkhvqjgepijgf3ayvvst78b0mgl0jaoc9n30jpg3v9t0yjlqdir02pfopfnrj1qnn49sdh458wcgrjadqmobdombjzn82azy7qutmolitjrlkm8w4dixl2bdev1m8ueqmojfji5vcuabq760yf1stxzad6elk3ilx6yz2mewxo6354ywia01d5mrool2u4kcp41f2u6zhtrrgcorh0knatmdneptua3whuoiag331q6ja9kumsce7715408dtwjmjw8pf6rswkdhqd3i4kjgl0ujobll09awo33bdb520xnjwcphj7rahencab0vbn3m7rnc4qh2thwly1cxpocjloj22hl3sssnlfga1lfwv0se9pd6pnepm3tvz9yjvz8s9212r3whraiinnqnfzkfleoocgowfgya3qw96fx6kqhpjy0e2ox1gqrqsu8toezkq4xpc387sta0h9ia0uuki9mms0fsnozr2vj9ay47dnjfup4g6yp4ilo5ixmpdjv9j6th5aqsb0bb653hjqpzzwo3umo1uf5ogo781lcxg1cw88yf9921h6xjlq6gfvi5nuzcynrpuovrwnjpkmuq9ad6wqxbtwdfx9fvznd5zdiwkbjl18t3936uh6s25373piiw8556ozxtsfz1qj6ricde8ako6ddiqlakzcgcb8ozhhpby0w9l7g1w83obmu4pf6d6rockm55pilf3mhfr29j4v9006bf6vgvk5ta4o61aig3etbkw2eus9eicyfpc0fxtnlkeuuyv3p8nf9b5nlc6q8wfufe916ndxkhtt680gfzhponk6tjs62hzdkf7g4hamj63ooqn88z6rat3hr2u9m0spl7uzp4udy9wzqi4olibyvh96iyv4312lprxltieg8en3prxpqzzijn6w8aayerj1o10soj8ivf6vruuia2i8u34u78mohy4p6py2h68oou52y7m9wtvo5bqa7z60dlqhwalbd76vijzcraedfyxqqwrrntath90id0q2vnb74oohsm31130b2bn3mnk8ybhpc0oasx0cbbv71s6jx0171n2drbfzeoitv0xkcoifrcgq7a3zoe1x6gd7htiopqzp3a6tf7o26nzpjtbw50qvqe1t8jw6w0beqcy15ozd86o4xuus77d6d7ewqvdmmwq8ke05vxwmpcpnq7gapp838xw4ai85rt1cwulp9bb30xhq68qlik0yyf5znpjz7juu01qvkfhpawe0eeuwywwazrthq4p8mi74cptfcwl74zyc5oc7x9ey0k3svgxif9b0nl4vggxxdl164eu0gf1j9272afnvh1mpz6vuup1muzdvaqyzme1xwjaqo7k4eigq2xpc0u5714tc2n434i34c5btjmpz72klpltjuiu4',
                        redirect: 'hc6moom51zmk5d6b5vyfvasq00j92zsrdueqkcfgmkev7zfywjtlu8coave5pskfexm0v5m6rt83ijihopws88dlmb2pyotpfacgsjiazahvbidv1mziymjgi0ud2cobvbbd9t1n09jfl2lqvaceqhybovgr3foiupyvgimgfi62p886lp86e9x59e3jn6x6ppeassa539s6kie4lbvp26xf9nfavo2k9gaj4969xj7vq50u061emu79sm859khz5di0p16zwer9h13zqixew9bsjv433ceqzb33h0jo5mxap5ni62yiuatty0jrbccbc281xyxt2wm7w0jtvyrvjivpxm7ldzzg5s4k78hoxnanyquhhyvddgsda22dcpj2dg66jsrn5nx48ebfz1j0dcptidmmlsxzfdboiy2ppwtdpyap33askxvm42c3cgez4ramyrra23gi7istlyf8ge6817rx4r095ts9kuja0t3kb3odxb6g5o2954nf7bt6rpjoz9k6xhqtcr46wour0d4jp60vjyrm1s0sj5znm6pdpr5e72k87sqhm0kdjut4arkug4cr5ijwkpbjxe093pgycc7u8qhx2h04eqxj8m2dtepvxwaowu3ugc2j21k5wnpl6oqbqvarygvcflxtg91ff0bay4yn100gfxlrjcx3fzmp1ea4i83lds8fqfn1c4y7in25yrnfbcnonya1eud0razd4dw1beaw7it6e8jsrji8o9p4rvzqau79mg2kukkditt2evbirliqxxq8ganma46aw16op669yj1z5eoz23de8alxkzmpzeyhw5zhjv3ju204cyb3dlhvmkesri9nxhb5o3a9vr7whaq09xjwvusulr87m362k850fyse47575yvg778mugsyqpy9uubozkpbo7e1fklb1b2v4j2kox6z4icipv7w3s7953kuhuceyggewfoluffs88j3ztnwrka3ckj0xf0sanbn3fbipar43ntn11zdz9h7rcjo0dor93tlsdzg9affebg2lqsj0f8gtvwyvgofidffx2x7ayqwq0boiybarxkqs8ykqldqi76ftvfassvqfij30w514ym71owkmm13nxfbrjxtr53220d4g1tk2umiz3qvbl3jsfimf8111h60cq9u3y6mrx079a0k0dqusqytekdvyre1ra37ep19pnyh8sh4sh8z53czufm3withmtwkqynwcodk8yb1fmg6jhp0j1qahfwcnopok0340507axxjxdlgiodpbjzr0ucyyvp1mynznu97mgg30eg58ar24azj4wapql7z7mrb6h797gc4qly6n4vug7gfgmtzaf3ts8c6rrs9e37os626pix2qgu6nmqz06sz19b7rrccxw2imik2qdep1ragkzps0p3hhw9n9h6oqif83okgx32hw5uvlhv8ycsfjmjfnualon88jso7lfq9bujit1o82qiewfxumvr82r65t5saoi1rnpyrbdorksq0dcqimvje10qskef6sgalgg588sprzdwp43vurzd6ufrqd15hmh4t6ueon733fwct8qppembrs7u3s5al3g6u054s4b30v2v0tdt7vm1g67naj612y9q5g8w1mxvoqwjsuywjxs6yd12d2wc6m71qgdjr1sothl500hgqvxfj701jxhl4hvhew67kfw70wrvff5z36qjscw12v67vqm0y64eht7mv8xcke0gzhu9qnkvdbqyvappy0llbo70zpwl5j2mo9gx0f28l7ekjh0bcz1vet9z9fb62rmhqokabsjos5unx1quhxjatqzu2h4bnxp5mkds2htwp9zxckxrr9sk79ozitf6lon1m4jf5sqam6ef1bzsv8vd2ec0wwj66afszjbr9dto1ie6ii8q2byx84l7g1s2oe0dni9fbds2mu7j26bxhxip39m05k10v7hqxe383aap573w4bbza9ejko89jrwm914ley6drrobwtw45i94jqbneg9fnem90jurxl70udiw3',
                        resourceCodes: { "foo" : "bar" },
                        expiredAccessToken: 2943395687,
                        expiredRefreshToken: 3374432328,
                        isRevoked: false,
                        isMaster: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateClient).toHaveProperty('id', 'd9f2718f-96a9-44e3-86af-953861f08617');
            });
    });

    test(`/GraphQL oAuthPaginateClients`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        oAuthPaginateClients (query:$query constraint:$constraint)
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
                expect(res.body.data.oAuthPaginateClients.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateClients.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateClients.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL oAuthFindClient - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
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
                variables: {
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : '6ca4bf84-445a-49a1-b5f6-a198a3dfc3f7'
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

    test(`/GraphQL oAuthFindClient`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
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
                variables: {
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : '404d2cf0-0044-4be1-b316-7b4ff5fe41fb'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindClient.id).toStrictEqual('404d2cf0-0044-4be1-b316-7b4ff5fe41fb');
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
                    id: '376d7a3c-d078-433d-9cd3-e07ab85e7ce3'
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
                    id: '404d2cf0-0044-4be1-b316-7b4ff5fe41fb'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindClientById.id).toStrictEqual('404d2cf0-0044-4be1-b316-7b4ff5fe41fb');
            });
    });

    test(`/GraphQL oAuthGetClients`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
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
                variables: { }
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
                        
                        id: 'd1377146-4096-4a60-83c5-3513f490211f',
                        grantType: 'CLIENT_CREDENTIALS',
                        name: 'bre8yftgwgy8pckctdyu0ost10u8ycob1ewi6j9nf0bartm61uut3a8zq3e30z48a1ai3epxo2bt2vplv5h1qw5vli8bxdeg1qcgz1m57goh3silh3fvaq8ha42pom48edf0g31isyoge5huiw6osfblwt06x30r43uj9xs7qea0hfu3wf1rz8sganaawe8xlvnds4zbgzkpvr587qddzz3ge0evbd71vwaonc2p6s60b01ye77t6yj8ahqyo4g',
                        secret: 'byqlcse83wj7ceq2lzrpjs4ncz4b3mbnguzhsomi0u0np3mwr2hi56ib9pbkv385bbgrspldvadftgnelnfkruviru',
                        authUrl: 'gwznvy03d8kgz9j5j8kswdegfkgal6ijg9oe3xjxjoyj7q0kn8pnr17tn3ea5haaw0u7wnmagybue45yu71sk4ygr3uz0ft06bw0jqhvaq84mm1pvp3s6tont9wfxf1ujp4hotyvl9bu2ou7xb0ictsx2y44xi6uzbgmhra7muf6wpshu59dal1rbc1g1ygisjno3sss2y5xj7cu23p6748ilj80wlwaq4no3llwwtq4r8lz0fajqxi4750t86m4ewfo3e7eyk3zkwkl5ss3fuiddblegj09kl6gmd16ohbw7t5fv1lgx7fupoygozwqtqtmcktuz5j3ivtzd1kelcy3zma4svelmudk8rmjabiyf63qjw48qklwx1zqgx8m7431x16tbstzhjf9v9na85roqhra2jwgf9ottm6kzvztpy3byj9687ettniif1vpuo91f26q8b8alfa0l7q55594nfw4z83ec3k5qqohvoqgcvlg7bq5xr7dq1cs31l4q67xv2ia7kqanlzv9tm8abqsuftfhcjafcb0s2c5njxnbjpkvo0niaojd4k0rrrkwk56808ol242bok6zg2iob2mth6er94zzxm26r0z190e3rwx9mdfh9xxb8nbj0idvy9au3l5w81ov65wlab2y0xi6z3mwjebfboywoecluzu2woayj2nqnkijgqwm9m89206dtjcngmgan3duss7p4o771qne16u10g5g1a3wpree3j2fut4wfihjuxbruripc52f4h8p4hw2cvz44mryu5yvq383jlf1m1iwb3jp0cgauxy85tcsuv6wyba3h46hn1na6iunz4jk6f6djgiussu1n41ytlqt6kwmwbesco12tewpitpc6sxt0v3o3x5x8wodbda116r9of6m2kqx5xk7hyfsui8okar7e4yzjrt8k0drgz6kj5cqr87s5un7cr3s1akpb4t1xwzqt06jig474q53iuraph3xodhozt9r9ylbt1u7j27mrdkzx77l0veki903rbxo65xqkdzamscnezeig9ptyai55nw9vcijmm22lnvwcv4ll7k81tl3jnnw40s0xcidh0r39khvaxv566k50mu1fiki1a7l5460i7am3drw9qqm9ra0d6v7pwdn7dnui07wj5e2kvzeb65abyy7zo2zhf2dwr52t09mz7a5lhq967e6f6kgfpjgseai97vrpkfbaxuwk1l659z0qbdjapowxo1rr3jliipqu3a6ihasi9v3yxag1n542cpg4cbizwv5rvb1z0a8qjo2tywf6mtyb1vnuziqp39ii31kge1darg21lxtucfho9phx34753e9hi10qrdyug56709mucyuqbdx0jlivh4gdwz6hv5243fan49ohgozv4nt5do4mz79tz13d6hifynjtn7rz0h9iqp7715vb83br110a1lpc20hr0kmg8x7ubhd8gbja4e9znjugnxwe7v4zomzae6wbd53oztg2eb37ybomqerlzs4ufh4f2s1ntl59dqza6af1kmo6gpvryk22x2zcxlx1v43vojm9akf06smn5pal0pgad6a1959fnzay00cfvrxupqf21ti3hsip1k3vyplkhwwv96kiqv1s5fgkc72hmblfkvnti49tqssi9yrzx5q64gznelzmx7t8f9yttg25hhomrd59csnf1k8izpy6wnq72lamsf7vegkl918cocbuoipq18an25n7qngfvph5tfyughixmc3t22k9nszw9sr2ro2j3f0o3nnjs1lxtlw3nzjqohu0ro86aunw1igzgqph53huaoqnzcoffuwgkhiznt4lirrcdt3wqgzvb22dptwley2jkjc4dj785oahu1yft5545fca32buasgvgl652rnhy1tr3rczmf9m2r6fjrnmgzvuf1gvx2243f36c5oe5tcnfff3ay8db4fxp7560lof3lxy1v28u9g64dfqup25uti4jyytpcsha2llzpsnex4b1gx3bk3bmbwlwra8i40hua',
                        redirect: '3lu2mpwvqcj9f1nezqyqe2ujuceub0c12qm4stdhye3opihjuqz0946c0cw6duj80dus4n8lxe8bfbrhug0zhhv6h6tnt07e3unjgp982m78zqnd8869wb8udk4vtx201og2ey5p51np7r88q597c5b0we4387x298xohj600i61arkk0ad9sihykp2j8950rbfa7w6cuxu31chobtj9ifazkxr90419o0mir8wxo7q7mhi1dva0f7l54naa10h1r8ai2vocxyas2pn6tp2lhxb7vxu77yijb2f2a5rpgaw40q0jthgx3xy6f9v8e4gdn7gybgi94960xj58f0kv70n4fxy37dl4nq8kb9edgqe60cv73ne1vsxkie602juqkjbs2e9b23aw8c9b4wh3y505im7mkbimwui6hswtk5ai99nckyjgyurbh1wi7nxabn5804xq1a8nxw9qjrspvgj56daajlzcgbfk4b5qfjmgc2080wcqa86r64pzif5a87kqnie198i4ehlu6f76pe47gxsvoa3wz46hu9bgjggep49wgb59rnu6hbqyyob0sran4xwld2ot6pnxjyllz6kr5rebt3w88id3xac3x3mk65yxf5i2yc1nrex6pk9swofv0554kqwh0wikbabo91y1ij6frbe0xji09h6u5onq1eepau2jdj1t17kzca6z1a84wz8jpd1jt1rc6rlx5bk8fbeltr41xv0qrnzrtoa0hx773le1199gxlkq3m61c5fc12t9ujwkw0kanm1pxtxih6vzqhfrke1f2ols00qw4rjsuen2wqaq4vkl5io4sehz6ydjaz1xp6eoe0i2iaeqjm5anshpfc4ipp7ohf6fwcyguf5bicjhtewrqzj10z49tx0xn4w8i7mrwf2vsb2h50zmv330osjv078nppv2177dpgirqdomavw7pkueo7ningtwyo5bx5jiseq5uouj3r82uz5q0k3le57tn64ihosudg52fksmwnv2f1cggy2ue9q2sp66zxgeihdjg9kkgcoxtpqvlr1pfr3lkj3eil8h3f0axen4jgy4fmx5f45ybd69zngvu0m5yhz1h1kjcc2mjsylvai7h7w982k121cl95o04ihy7jr7crihuysydnftoobzqup7ymc2cn5hdnv8vptq4i8ciy04wzgewbxhj9y6m673luw5o713fzilur91a4qwykrvyc4iomoifptwihzslnrndy9ikoia6fplj20fzjthj8r67lvwo9zxyzlvubnu6tjbjsekwvrmt5vt6xmwj4w8fosr8d8pmozjc0izagt7r8hnatv2hlwtqg1tydb87l1mky6zhgvp9nsn209som3qlab32sk2ve7ly27k0uvkm5knbqqkhscx03rr5zpd2d0d1sj5rb254uhgkpjjuds4jyoxv2msqby76f6h15yv89cfwlghy20dynkm1bb47d0zis9kyv9mfwyn3pta24tnqbpafd83dcdcyb293gphncxl9ge6dhc03ugtv19iv3dohyxuldjiwyevaocb9lu59t457q7pg9486ejwhhmu60bifq317e4yn7ckogvrlbf0qvzfmtn052rxfbmzb8j7rcv1zo3oyzphrbb9fdz31ran02jlx0ivrhay3988u1lbbd41fufnvskuckbori9sjtp1pkstffckqkqs4yfp9onmuae96y8h9z3p4l5m3sk53dn7vn5jj2tvqhbcdb8s9tzn1qapa6jkc3r69e7al37478yqzupvkrmmidt14xwkv0rh5f75zhrw87vnl2pil14hj065yy1sip4ofb0fihga99ia0zuclrdf4hse7ezbhnuthkpm6h66gk3y7t89jmsxgodfsroxgoxioujmqgyp2507azqn5b0zy7iyuiyfrntpiavkpohzw8myvgo79kj0rw042n3ho2a94nu8uo0z5yjp0unihsqtuh6jpuynipk58c73ylbo7m9abpf9qyf2yblxs8198cgk0ahffani2usl',
                        resourceCodes: { "foo" : "bar" },
                        expiredAccessToken: 3508647166,
                        expiredRefreshToken: 7480544661,
                        isRevoked: true,
                        isMaster: true,
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
                        
                        id: '404d2cf0-0044-4be1-b316-7b4ff5fe41fb',
                        grantType: 'AUTHORIZATION_CODE',
                        name: '6cf00z3nkht5ws9l96s1mr099pvsyr5p0yrs64zqsrs7z6pw94aiz491tp5honard8q2qs7k14oovaxa7qdb0af96p1m6bsimth3sogy7kaxmifytrja51fxv7daz14ltotnv08otb1dtkqjp8rolciod2u0kt4jsyh0s3gjsmqw84phko5b6r712jzi91hl1fx6oc5yuu8oggmwbc7jotbe5372acl2apew1hn7w90txatqfbvlayi2is8jmom',
                        secret: '8n3qotfn3u0kwdqjgbsdrro5e4xvr4geyris6ugf0oe2nf0awwlwxg153qduskgsfiw1cwxacqnf4hox5zu25pey03',
                        authUrl: 'g8ia7sk552i8kuud5s26dknjdmrn639rbdj934u2cpox068vupss1vvfveln4jox9mbo0zv9faz18wm81op8id6zzg448mdjncpomc50pzy64dtolaqjendujwb8h0ts7400f2dzixjw8sdysk9x0jg1uhrv6w9ebswijp3wjbz05u04ufju1e3iejmk8yzkwpfyqzu5dqkkr0q4kvts4st5gjudxkhm0ggtzwa6o7h5eh0keb5tnou8e0lx8y5bz1o31vxqo8nm83pa9ynk0ziagiw3z64lrpvnzx1tye4vlheqj1fife9nhvrfs25hfiduh8e1ra749unucgoo1x71wj0zii380ryxf0zp11hxk442b5y5vg5nm7km55q6ra4rpbfa5ql5rlos05e2h6q9fm33hldrrpwpp8k9lb3z9sexnfkpcomgbubhirdtgvfipoaseogcm8f4i7nb9fj62rzs79v13bj8cbmy6ms8kn0h7ed6luhmhm0lal1pqlu7jii60vchsuuapxlgeo5cpoxyeah94l7g58i078a7aubawdniy6lupx0dikx325xlz03zlum0zbjn05s8mqzlcunozm4ned9vzuhcg46f8qhrud3hddmk1z458z5sp8tzbamq4shsptkdn4ad10pqbv5tzesslkwuvg4hpptpxchzl97sd7zfz6204q2u6pa4rcuo412cnc9f9a2ekbfz5bt3chifvvm2s1anvirpoiwjdnpn2bma0z0hditd3vuh2m3dateqs1hyxvsgydqy4t7jw65nesf4yousgu47xj2jiqku9d5dnbs7vt1h5zm8yiigmjaguasicnd1813j9sqi65gzs1otd8t0l03gfdmozwlmkf9yjtfvwiygkawpmbxlhknmrrs0ja13e6iaf4g1l5yi16xvd4j7n297ogq2jplfxii9p48rud5k4h9awzlg0wd01pf9i6s5wek1ib5zw9l6yhk1hiy46syoxmxuhje9h3mf42u08rgio1kkg2ayb9naz9qn4s39098u154arkku1gu5rfnq9coz1lej60ony8rzztik3dqe2rovvl1ozcemu1rn369d8jhhnd5cqberbeopktz2f68g6w65d01brqcrruud7frnsxzxir0dfx2smy66h5xjxvkyv5l7z5wq2d1a9czk2jscv9thg0oopldwl9kemiwyhtgr49jtovfz4sqg9ymbcdjpyaaksa0hyxobqpfv2dbun0wnmzhlgqo2xyq7gsi0941lmpd2uarwbpcujh4ewhv9dlqlz60g2rmw1gl4thclrkt6x6xd280d3xxrha7pqwg91dg4bs8ou25dv3s6izs0yfc1z9vjivjje1btvt7k2jyvb9v525i0jdu6sowmy9jvmmjo8egebnvz97jqnxdq3rp8ad1wgbbvuqve590iig173xdh6nesw55ayphcdxrm1mn0ze7wj680cup0sqa2zd5fynwip7795cifktwslvapd2629txr3upoxogojc7od3f6eyg3iaytruqick88th0tgb6t5vdb14ymd6c4huc1ss0zd8kweex8wt50ethcus5p1pp5ohzxbznb1x8d78wfandol5zdp1ikvsenxkngs0w2rctvlyr5d2fkqc6iq5f6bgxg30lhrucux2jddcf8wtgptpc6vob4j5nzqe6ntxy2wp0tzqytudvvcouw4cjyo19ni7ckr29oaopphsit7432oz3wb9vlcfhpshz4kaf3qewh3xb9644py8agbmf5binm0r2fhabjsyvln63h4brafsfqve6jl7diye2o3sr1u3lo957e809yt1irrdlwtstj2im213oz047bjy6ncnjdb7op4gkiphnm938no951d38j4047e9xp8m2nb0ts8t6ldxt1fb63pxi6fcokwy682wcitiwuqptcvz78yukpfevy6g7xxtsqsgxth85mit2nbry5g0tt0yd9k63nq6086qf512xnegklut2yfua5obs00wc1y1dr',
                        redirect: 'a3hmofcprfymzxygppmmq39h665b8ovtbktj3zpat8ai0381i23fny9b4y19gk7bk3kaparlypf4kary5n43pu0x4q89nhjlnr7j4062l4gz5rborv0i9h7yzm6xo34warwuven44ykarfsba85hbsrpwwnmtnn74zn6enh2kg5pnul70wfivvhb4h0gapuu5g5yyvq8fpm7f94epmufkzod9b8oodzqxa2aox8ujetouekmg8gepgzcst3y626zp73fos1qzzzxxakt3v0rodr23iokb5birchwnkm8m69gdsyf4y50woe1qas3m9yl42ka7ueyqg9uz9me962s8m24mpaa32zkwog45o7sxdddij6ksyh50wqgle9fjxk18wtsc8oxvykgz8kar080ctz35xc4lcfwm2fek8ifqoj87zcwz8vb90wnersw3ec1d2ebxfka4bdj2gosx7e30mnohchk26q4icwz9bqr88uqfuzr7e5zlgfj35xl6zn6r6ls04i6reo40uv9j1a1kzn16ltj2dq5e7g5j8yuuezdkjwgfggwahm98ik03f49n93w5ttqbu1nz5ciw3rp13yclu3p07ccwtww3ntehm87n3z65513uerpktam88htl5xbxlv8ite5ychgnynv87qshwb0ciyror7akxg78c06v5gcyw2oit24rdn5wtg9bt8oa3pvvdu7xcht20csz2gvg66ur8l2kcxzbjr1227t4zjs605qa4rtwej4l1hxvyi3mh8jzgp2sg0evdinhb31g9uiscdwuf3eq5j5g41qgkknr9ddg13jkr5ncw2y1cntmdwqqndtcc9qjv45t32pzdzx7fwttfml1wo83be24226olra16d3yds82kalhu956uskgwlcau55o9ekm0wt6uftekkc4eddikye8lvocc8wp7b466e9ym6jcpq88fdvd3puk5hekagrlizhi5lmsz3mipejrxe5htb1qqr1j4hxbdj5f0d1dsabdbyx8xzvu7g0quaqacz6b7n7bvew0a0oi2qpdynhx99gw14uuvm3yye2dpnjp1yv1feviqm79pdl8wxn6juluw6yhvnmcqojlpwz89wiqqzhb0cauqkj849uujzpr8qxkppturn8dff6q3viqvzsz9t1homu7cj7fckp95yfl2szr7u1jbfc39330w9jfbj3f1bgtllerfahuzr41hvghvju6y2lndyo0ec1d9c90zhrzpo8lk8w2xb5qv04ry9db69n52l52ik57fzlhoz7m6kmzx5c0469mas7ncgidhclml3hhdbu5ubtjlp1o1jezeeftalfhq1f9hxyhsmpe8ppbdjve5dttjzsxmc9u2b0hr7wbzecufgxdl6hbmsfs8o46ejy8avtueotmel4lt6hbtm6zgjomlt0q1a2w21gp05yfew12mzqibdm17c05h3qljskglwpfck2tdh1j29zrtce7zyte3svngj2cfu6mko3da4kde8h418k6360msphxuf2pjfqojq17w64jr8pr1sldk47y6mkytzy3dwh10koi8nje6qnqqghta53hsiva1165y6rvmfoklykuzano3mt0tldl6bmpx7iv1d7mko5swqrn2rpj8dnxthkd6jfetyxkutip5d7kh6b9ul4wmux4cbyz2tcf2geg1zz0gqpmndfk5925ukiycfdldo1bpklpr215t9hvcggrg7v2tx55ru953f973zztzgi80rayct52xaofq4iv7sew8cpqzzlz71baz16dj4anztrucjq7u2vysh2jlhu3bnrp74jj5xbdoip810cguf346vfgkdoul5wo7vti76vaw86msvmeeq0szg9d9ygwjhozcpaserkb3pxhfod0p9sql1wtpck49wr2katnafra0f82whh2cl4fr1y2n2tcp6x9pnwi0d6gs3wactsmlj86oskimbz10a5cepae7pwe020ntcvkosgw98964ck0cg3z36zrqklzzt37ygoacetyhv9',
                        resourceCodes: { "foo" : "bar" },
                        expiredAccessToken: 5419970177,
                        expiredRefreshToken: 7749857211,
                        isRevoked: true,
                        isMaster: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateClient.id).toStrictEqual('404d2cf0-0044-4be1-b316-7b4ff5fe41fb');
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
                    id: 'bfad62c5-78cf-47f0-8b4b-b74cd6884e14'
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
                    id: '404d2cf0-0044-4be1-b316-7b4ff5fe41fb'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteClientById.id).toStrictEqual('404d2cf0-0044-4be1-b316-7b4ff5fe41fb');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});