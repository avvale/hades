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
                tenantId: 'a203ddf0-7444-4946-be41-956f42c795fe',
                tenantCode: 'ux72oddkcrmrif38d744i7wo0fhoxqn6lghqwaxz98l6ph0tj2',
                systemId: 'f3bf36a6-3084-4e88-b932-dca3bcf3ad97',
                systemName: 'gefl8ruohtqreo207a45',
                channelId: 'd544dd36-987e-4558-9696-fadb54dabb33',
                channelParty: 'kx7qyjdi9s4455zbg0e02z0e6vsrsu2yhah6l1ehfnwbegc5dswtxfdngc1g93yuhkffo0jkjolusivqyzk5ky6p78pkiqc1x6sllocc45t7yy1de0rbib4xt8o0qaqwtol9snldvribjg8reuzbgn8gp5i55dr5',
                channelComponent: 'bj6h8xwrjtht9gnm96lql9beitg3bp9rb0wia6w8idyh8593r5ifrjb81ehbnpi8zcbjedbec7ekee0hwynb9c8o2qz2af743nhimctnswrmduw9xpohucjq4frqvm1critg36h314a40mddjjzcu891smvafgey',
                channelName: 'uiljkqymdhh7291zedubauymbthdydi7snppcl30b4taxsrmwarq7g3ksenpnkxya6l9etew0be6w00m62irp6feaxeihazyipkfrneumec4njqk4u9jhgj1khfcgvfps28p08p0yewa3o1vhsekso4xyyncvjno',
                flowId: 'f2b49f33-e8c0-4475-ac7b-ac53454b523b',
                flowParty: 't9uhvt72mph9b1zqd93fl9rx1x5udxz4b6m0lybcdhrz0nzwqfhythj6jq0vm5f9icuxzf2o2ud0fi7ge4cgjl3c0tz0oqtl20ppwn9jy10ddjed599u9u117ttfknwv8c61hq5wlgp04ghrm54tim5edpep027u',
                flowComponent: '0dam4xcpd8zsi8agxodus05iiz894u78ec2s8x7svkl0yjsjnns46jx4bzpgaxssmqhc6hc8c3w20gztrh365t90eadkyzuoo8s0fqjv7r1t8298uvxafrtckjjd7fyg6pelu7q5rl7u4om6m3zfwcotrdk5au3p',
                flowInterfaceName: 'a7a4adtkh4d6wudrqb2au5jk8svyuauusptxbsdx5rnz594zy0kkhf5k15c2j8xubo8iarxp3s4o2hg30cv16cpmye08x1kf13g55m9f1v44q0o3j5hx57jfni5f2ty4eq4gmc8monabgfyo18m7y0ypuuy4uzdf',
                flowInterfaceNamespace: 'uhq5kx2ve4vysevt0oxp6d20fro88319izhuvf3mhtqesqc0wkneb3k0503hm1i0bpvix899enqt04ls9dwwxwbaw7hxl0p2tqcrbbjrv1tht3924nd1gberj3lvsmg573po173gzrulwwvrfvoy77ve7b4jjf6o',
                version: 'od87422vf2ilt2lk75f6',
                parameterGroup: '59t8b8lyq1k2vh3gp1z8yf5jocny8b2p1cl38zivjlfj6027py8zdjcw0lc4vglsprebhho0rfrb05rutz3p0l8yo9tyvmp9bby9w6csgv0whzdhqnh6kt12eisgbq3ok864buwefvicggt0ybgluwfuaobvxxtatu2li4wtkazaf4va34s3l4u46upy8nxfn68kfbbsydalsefpmfjwarknxikmsliw01onzf33s06rdkueww0wlqbx1kwzn5j',
                name: 'c675dc78ih7hqtchhgv587vth7dmk69lce1qdj51nvnoegxtbs6xbftisal0wbfqj76q7scpllw3s56xhwtg34t8ufqkq4n5k4bcn1678vnunpm7iqp0xzrmf5sy2etx5kmzuigzcuf511uf3za21gz30svuc6lntgx82o2f146ktlxukpxr4m9fomlbndlc94rhsjmwohf9bfyz1zu2zbkyk0sfyz6m4k1ra8ypl4ix9ij7ilc7kwy8ppj26uqu5ak11n1i5wg7wory64ym2zq2gozckn0wy09ws5qf1tm05705veephaue2ykbc8t0',
                parameterName: '0f62z6jd8e2xetimckyes9qfn9g0awc824m3zc0tea5xz3aqpdi6hhr5l53ayct5gdezx4fg8ikngti73th5iyq29zgkr276i1az8nnbk1keu5op1u7s3o7klbx5t10a9q8y6faexkdp4eco6qjl7hiumf9gfqoo0sobj52medga42imt8nf5k6caxz12ti3c363nswesq9mtk05og04fosfic8jb20m1d654oz45ks5fz3evcije7pbfowcdljhoqod3tkusor07e82abrcf3vfxdg4j61ejwumyoynp8kbpphy7z1136a5e5hcyo02',
                parameterValue: 'dvx95sm6d6a2ne7cilho8ru7xg5k350z1jto1ixf9d9w0z5k9uklu19fbtubfjdx5m9tn3whywyiqb1r2gbb01gski2wmnczyt766auymoh12cm8pzfegbfkw4xhmfcfronre74ta09b9wscaxgr2yozf6e2pmjg9udm0fdohnqmew5d1mrzp5d4ph2axv77fsgbrlsh7zmfxp3mqj6yei4qsk7jqfuxd20edj2o0cyz25vh8co4jiwpfkew669pqv048ji4fswytncrtqwdyc64kqj6zxoaha3rif61tth4z7hdqr1bv51q90zonxd7ihmz81fkrh3fdkydidwuou5smtwmeq9ek2ejd4vtqsvs7wgxoqjlqhxrar57ljavm9hwgll7v3zki9k4tlir441x86xf27y6j1w5cdmsxozsz1kxg5c2xq224stjfuj139f6sydpzjgqu7l17esryisc5yzt8a4a9484uiqh2eh25yzo0ibciqemsx9fugb1qw4nz30zh78gfuc2965uht40kh6pq2vxtizxnm6ip27lz1fl42sys7vx5jb2jv4g054cvlwzo0od0drwcbmjmxy00fhac0kb0bvd96q6piv91lt767nx6p8efonr8l4rig348ggwjfan2pig2xbocpcaz7cz4krag516tzuqfmrcq3sisoh8akwvp8h4c1bfgozb8zn2bm49zbs2xnfkq627r7m8cakanka74o64awp7pg9bnz3avmozo54jjt7b4jqzd8sz8fsekfbjxstk4sh30fc6y9kondxgnve9zbnbq8a1bnll33do3cnxs9utkl6mk5slmc9uc2ydjnq0g9n01raowmylee7yvhn9e785iv196dmbyodc3lyb8o3b0gv0t25j8it74phlg33gnj9ep50xjz8spsv3nlsoggfm69mafuddq5bs8zimgcjsu0pzgrjroujb32bpfemnln6m89pma647do8724pm6ruxhiv4blsl0zez0dl7tcgi',
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
                
                tenantId: 'a203ddf0-7444-4946-be41-956f42c795fe',
                tenantCode: 'e0td4ykj4zmp9h4voye80utxfrrymf75b65zc4u6kkp6rr3m9d',
                systemId: 'f3bf36a6-3084-4e88-b932-dca3bcf3ad97',
                systemName: 'adr3qidpe6ox19n278bj',
                channelId: 'd544dd36-987e-4558-9696-fadb54dabb33',
                channelParty: 'drdknpshz8mk4h4rz6tl7fe7pmrdx0hhksnp9qwl187mb8mwnvrgsrbeo610gnrzrxxi05z2um5c48j7vmdgbte76njry018c3oha21f3rjs8sta4s08oquy4zqgpouy4evdpqcyiw13hcth9dhmjx92w4v9tjqv',
                channelComponent: 'zzemcsdjcaw9c7vomcmu2tn8g1pan6nko8usn85zkzd20llh4t98198rg6yo2lz4xab00xo7c1o4ia1ikde5zb0ijlhn2x2fpk9v96d8fldlss1tkwa37l2em9wqm6rz4ipfqbpz4gobouzk3gubgvsswreuzej5',
                channelName: 'pftkewgacent5npd0fqxwrfc97qv70ulne87hcbt6mf2b2ubpbyfdlliqizxz9ty4e70xr0karmwvhwa1i00q9nw889rouduf9bn9uplwqzhbu8p61bh65klseamy9w62t22o53eq9jfpxm1zvgmmadj81dtf9fu',
                flowId: 'f2b49f33-e8c0-4475-ac7b-ac53454b523b',
                flowParty: 'lw5e00wfwhi18j5aogrw2rsw660f9lcgqebguvtkkdkrx0fghn3wwf3f83qqth00tiwkj43owau1z7moa9rh8260odutgylipsaqj12tlocwg1oxzkm1f8e6g1szcnk36t3vwlxrn4my6z1yahbk9myhpp2cgy77',
                flowComponent: '5a0df8zubv67syit4jig3257wy0yj8rogw78vow5j5zdva13kvnd6s8pv7nzzuzsvpzqizk69h0chq0lfjpax50hzc2g7c4k6pzq2zz02tezjw1a9d623o7dn2mvnl6pf3ucn14amllc6s8onfj4gn5wflx0kw3k',
                flowInterfaceName: 's4n1565d1yz8rpyso7dhf6wn36x2mqb7xgonikldzlxwm5v9nteqb1n3q8cb485e3geuvv85jc5f75ifc29vvrb2xd277rd28b9wa9rnosnqce27k8hozrhooo3nrnjp51o7tbbx92um4s4wrtuajv2r21wgba7u',
                flowInterfaceNamespace: 'wrhm9ncqa0jt72j4ui4v0ujhugqanbvj2n4lualume0h4xik5rdtmkdqjkvq14gjj6hjw0d3yqxcxywwb65mm2ya3otlo7gl8p4qbufz8ybv2p2tolubu4ci6e4o4adbw1kpvi0r9bqbxwn1gdpcgxmr6a0u5rmy',
                version: 'lvrt60qymkh6tx08qfd6',
                parameterGroup: '0mmyxik48rty5q93ogukj4gy05pa5qc3txtn83x6mwwvm7powzmls862c02z18jrakanx51ov1umb29q7d4uoc17n7tixmgj2c7kl0wjzz4r1hjnq6y9gbyq8cug75kpp7490ulpqf08vihmqaen1drgd83rdg8xk9k1ea155ykuyjuy5o7qfsgns7zot4kl9fgakf34u591tno6vhy7m2uqm81ej4ruuj0hrgad72yd3tzxikawgtn43izx7tg',
                name: 'vmh2ge668xke6ausjt4cpygjszcg5fa2mu0hq6j4ka95rx7zc54ig18uijes9kvf2qem028o5udsu49fhyuef7hcx8idv329waaaoh1x0rqghzqgd59no9y1cp20jda1abkdnddd8b9tauksy7qu1eg8wex8xseuj1vnhwl7bglfkqf2yxnje1ilgtjmqvht44shtpb9e647k2c72qu5ypriinxoeiktpu57r94vjsk8quyyyegeh5707ma1a6b2f0mg1h6hw9sxvpvhqxjtsiivhrxmw7d1lhlcw8r5evk9je11u50rrsx076jt1p23',
                parameterName: 'biuel3dgoen7uooztoodf5xq8kwqfb9l8kcowe20cie16znakeuza6upbsgzr6461blekdch2ww357qpb06m7wby6tvf5uthgx4evakyeitd5qkexypejy7e7mqon68eyvndja4pecpehwbelhua8lx0gm2zss9sfo08zqdydpaekpg6pcx6mywx79c8l9cwuyup5frkivepj1bk318xlsq92nryo887qt8om0nca64xzqkbt5x8p7kniy8akkdg1nzomjxpyfzdzqblhok9s0mggy8cc4vn29emylgrfrwiqeab3myunvmo2pbmuny5',
                parameterValue: '25rixuw4j4nwo5w8ve72eclh0b9j2w0cjwc1ewb8jw9vwmsrhq7pqmxmwzmom7y0fy6t9lyw2e71yi0ssy00pso2efwocno1q6pivpmifir9339rp7kekdfsft8wcufeh9q6y4r35gedqq0k7zyn1qlyjxbuty49t3exadr39ebk6ecln7qzbxs23irtp0456sorl0blish1ptk4olsmvzquudgd74k8sgxynfvd66jc7oub06d1w6o2plxvetghsxzg7e1rixikligio9tu5j9h0rfrfggoer5lc32btl41oh9lj6lek0ek81z1ludlw77qjn9k20hm3f6racmkxzjdshchve3yfqkoqorfckzy3k15fl6wcl8or1djjheaf649xslm119afypdfx60dd5zs269lis2dns5o7kh613p8j0w80j8fj6nf7bmg8trfra7lljb6wdh7xdx0u1515ybfb9bqfcmhuwhazn9646e9vfnhpcxjxag3ab7rhoh40fj9jbxk62jj5s3om9v64lc557txj4kmsocmgbxy7kgaiwcuzzd3xnlzxbohag5h2vx2ageqiprrukd80ihk6fzw69h177z3udk0qo2nu5193815zh2zto2g08vffy2aww5qonnmha2vhwy3bgsb1l4m47mm6v9534rw4zgsgfqwvdhfkdyrohp1apeyiutwjabtas79hy6yrxnse4jf12qej11qfifo9qat53ib0k7j9dhlcidw6ef86ob6b5w26x39s75smncn11xo0odgr8bizbo1hid00swjs5bn4ts2qlvaqk3fohas82s5ek5o39pdyhe0iqtkqrmii7csltz23hktwyg839wy9x96vtb83m7y9zyx00qrns1txhabzdy18dz6crh9abwiuhbkv4ypv6ftrh9h5b7zksss9z6hteqgb8uwhgvaocqgxfpitr1z0arji3n0gc5ggplpgn009hdpzdyjb4l10bs5jp0yrzazwd2zve1yy1zi40p',
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
                id: 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c',
                tenantId: null,
                tenantCode: 'h6s5897xwablkj2wt7sj6q2qmz39srxqtl8r0nsfgymkiv9khh',
                systemId: 'f3bf36a6-3084-4e88-b932-dca3bcf3ad97',
                systemName: '8etoeqtu58whhmnc57nn',
                channelId: 'd544dd36-987e-4558-9696-fadb54dabb33',
                channelParty: 't4xmcxea2kaikopzyp39mofqzoda31bimv6wpaj7fobz1n37so8j7zyuckrw7pfm5hc6yuqcj7q45vtu8956kgm0e135b634jkubs18m1bovsdmvcvxqm1i9d4gn9cc4oi2dzbdw40scv1dxd8x1ap2bnqmog5zu',
                channelComponent: 'js76zdrmin86fq0rrybrcyqjcypj5v0y2y9n0dqts0uy3ncn7w3mgqeto5o0vrjpxia43eyhmigtidqbhvashk2zifwioyrz5xfr3ory1mdnmub3u63sym6kfkzlsm5anjgk8bsn0gzzw60we0ty8wc3tyts32c2',
                channelName: '364hiy7n5ox7on5n2d4slqld33s3e6ebka2eu579mrg1vszaswoxsdh983ijdsox4qf5rlasjmob3ogr43fp86e95pp8mlmngohubexz5nuzibm68ewegp31kw8cg0cy762rt8p7cnx7ksornu2ucy80xuil60p2',
                flowId: 'f2b49f33-e8c0-4475-ac7b-ac53454b523b',
                flowParty: '6y60sfb70hujmjj9x03uob8pkskweqsr8aj5lfusloh9nb83vkeyu1dhgvwo5gpl4d0i6b4k8y47fs4viuznzzly6gdj7lmyd46wqun53inw8ub6v3uqqws5ma3vxn248cbferd89bnusp0jjpyx6oa7o5dn8781',
                flowComponent: '2k0ulmhf89j8tsg3d7dqvvqn3i60trcdb2lz1an3zo6k3b6goheov1dqw71gfcyuffyiybo18ujodm5xs0gdrfxw4o3hhxf7qqvsc410srf02n7pp6gwr8cpzha9omloi7m57gx5ynb85mt1s4gpxxyl2j9pi8ln',
                flowInterfaceName: 'uz72x0j9u114u678lsnfgtnjzuw5or7oi2zzit6wyuhbjetml6d6h6rmhi2g86qa8dka9wk8z15k23a57ujris6uynisio9iku8vrqvp4nnxv4lixl221jklchptz39jwzmdryxk6rypkdci4gmlj37avpu3vi3d',
                flowInterfaceNamespace: 'k4cmpvzke9g9v4e7tw17qyiht0qu7ef0l3r01t1xvykfolfjqrqcn09osh25qhput8dcxjflf4fyksxggaw8ygc3kdfs0497mtjkjz2qqm6a2szbiaf9gz5uwhdu708vuk320nxuel2mipy6ot5xi0cncqi1fyjn',
                version: 'y0a70131nooibmng4gb5',
                parameterGroup: 'n2yxp2ng0bljbqinzti6vadisv1i1vib8g0sxailhd3psxxix53giqm0ydymw3dotrx52vcd6nvn96jftj47bcvvlarqwd2xsc2wb1hnn52xepd0o5rfx27drg5bnccyuux771mnvjgmikze17mgit0nx7luc3d88700derly290f22q7onkt5a3qvc7gmdimpoc4rq9864k8auea6ee8zu0z27b1j7bndig6ol5cg6sw82668bei8wk21ebqpg',
                name: '5c0430txe7hicyaah75gbrt7w7uzw1ofyg7l69zlzbeqzpvivb8c3it8953l58gqd288l1892i0l9x91h0eu9emeor97kj4bczgkcors3q0wmqf2qppm6djr2vrrdi9v4w5yz7dfuq8lfne827r3dud8rqypcfzs356e7f98awsc3um2p1t56c1vmygeiqpzgxpuvbxm6611823sqf11e2wij215eodz9g7nwh8pkvcjxecjk3e44df1qr0tl1d36060iwnsk2fw0pug3tcbwh3fzdlwfgdq14mdghqs0b4okbqtpt5a4c9nri3gce3e',
                parameterName: '4bem0lzujq1dzz1ffoon1i7vkcxfs1huzi51hirl6cw7tgb0vo63jq201g5jcnrtv1mwkauee46urntxrg18o6eb9cqdqsey7fslo0t9hxgzjz8w8h43mf1xfn4pu0uvnbyn2e99lwdc4ryemj5sazfjszgnldcffumuhh1yqrhgsmjzwy8gixq1z0y7jgq035spihoyaymrwapypncush4kb5x2mk9v0dg0ahretkapdkn6woi2w2y43d3gvthamwrd75nqcqjjvob60hi2cp7j8bqptu2w9df41bo695175gxk91tsg26kw0imqwsa',
                parameterValue: 'mp0pgn2l2wxzpfc5rz95evcdlgawtrx5iu8qg5u5eutoflwyo9eikwyfljmtqubcji8xqrhkp7pdt3vc827dgpoh55nwj3bow07n72gxmo0dyz9c1amui2fl7py4aaf98geyrlskzwj7jt46beisl2f1pylxsgyl0dwmao4zixb55jc37i4lpt10r2wj8poar6l11brnvjhs1tfp6xh0mtipl09v92gwd0agm68e0szpfs134hm60bqk4fhc5ix055ln89oa5d2ab33qkwp81bpm3wn4xuwyb5t8abz8fyfh65c5mkmfwtl32yxkuow27w8d9k3ffjz3g8nkvb66cl4im99zmujwail3ws07iceq7yb1rj3bs3lcfpglksheu0de2uw8auk2ad9jxcpumk8shukv0uymi5d7b40ui2y1dfq40s9jsrdio0225cwe5xscxunevarojnfm9ks1kx3ewu82fjuq5xuvmkg25pgd7bssm4bfgrvb6zs3bxydwhmv45ez350sxtljvwe4ljlpxxiqeib93uhq3od6jrs19qy9chyfxe1xqcyzdtjqgifsc1v1jlqgqcq4j9tylxa1kr8db9e2qn24wcv5twckhudo2qas70z3ygay6c676v5simtr0mxmlfrsk7bwb0fj6tuc9etoniriiueb3iia96iu0c8bkenr30uhbaknoia500fv7hym8681f995bpb8nqz7w97pzhmy7pc3lop2kcykiaqv3anu7foz3kt79nso9soe8lf9n5dje0vdj9bi5rc6xl0yq3sq8pul4kfwyjpk4bpobhgfroudsf395g08fh4xjv2gdblauwd6ac8lhakokxevvt2dwklfr5jggdpwyqqcvevzofodp4vlh23qj9q1ii6xx40gmxyo18ehhr7p2r50becnhg93tvmgqjhuu33imxk2lrwvfaaufg6xdh16805fs5ukjggat4fdf0xcn0bt1vh89dchxq4zq9euej05qtam2hy19zbq',
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
                id: 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c',
                
                tenantCode: 'aaqp264zlxv44rvd2q6eu4vo9mvrqymjocdpwhr6cs67lfew2y',
                systemId: 'f3bf36a6-3084-4e88-b932-dca3bcf3ad97',
                systemName: 'jxwnmp9bhy4bxtczonr7',
                channelId: 'd544dd36-987e-4558-9696-fadb54dabb33',
                channelParty: 'tocf27kmy08onfjifafy85jy2tf74f5cnm8qq2f5yqtxvzc5qv34bty1dvtwl2892yp8inr5hkxcv86rfdls8j8ub56wgugdawodjyei3kvrtg1tji1mcadin8p2qb80jhn1vshizv4cwxqpyaddnmryhvc44nxt',
                channelComponent: 'dahpazso7jmkvptjvah2e61yb8amj4mht42066zf2i4t4bvi3nc1u19ew1q6jx3oxox2uvkmk8hm131zswn1592ml9vynlmqt3hetknke0900stbnipszoojseutvel8hkzr1b8kh6qm94c6zk1q2g44nnhuqiev',
                channelName: 'dreuuj8w1c1ay8ta5ryax101lebgtgxyflzg9qc4qzlkgkhjn0i7rykvccrhhzvwrvhbf93h0mje27gk4qkuibzpok9cp8lg36eh79236lujxw4f9uyhfj0wc5needgvdtem6hk681p69k60wfazfvwvj87q6wzy',
                flowId: 'f2b49f33-e8c0-4475-ac7b-ac53454b523b',
                flowParty: '26qkwjtfuyrrb4hfnyqvagoeu2x9kdvjgf26jt6cj6mbb6wboze89u6y2zq7vsb0hxzfnwyos83ywt4u26zrfccvv919hltbebo5vzdn4836vwqaomc03wwse7b99ki842mp5lul3862hmftd805zewkjxnnxod4',
                flowComponent: '2rxhx57psb8bep41to8b2z97k49t531nir9q34aboqsj3ropr49qd209part591xrpl0mc90yivxjsmqdb7q99kohl1tza4n5ac320eg1leb4wplr2dax9qh332292mglgq1wpwps9p98raye87zhh0cr8gydxjw',
                flowInterfaceName: 'yk6opbvaozn45bg4urr8myx584li6zo0tt2d9mrt7kf0q5lnndmi1i0lvdlulvb0xxduxrech94c6ucbj3do9049u6cz7nps7y5lkgjncq0c349hgxze9jjcvouguau6bx6pejr9h36gqrls5v8vtduy7v3unqhq',
                flowInterfaceNamespace: 'qzn3ykhj7hev81p3qynncscezyushnokcm7rvq5nl09vn11vwgpjb64xqbs73s8r7xwtafjmnnq9ez03ununxkrev4wqhu796m79a1a7gbknhnshzfx4jvuygbyw11hbasrkyyu8xfc12g7oef7e96bwomg1l0qb',
                version: 'nr92pq1xcgrj7noxbs1e',
                parameterGroup: 'aqt9ed36cjc9hy49vlt3r78gdzewh73fk4ve20ogsuo2nqu7isq2bxys2qfq0c7bkng5yw9oav3vf9b78f658msvlvasdem3y58jgy4xpj7j1oawdyq7dx7x1gybwtvzdimdb4qagc4a1r98qgn2av8ywhtwnkg8yleaja0clrd01bl202par3c5ivi8jxk6fmxudlwamfu6x964kd5ymd1vmk4a14jvzayl2enyzsgb5gpcpikudjbyg1xo5cy',
                name: '980k86rk8gxrgh0ui7ieldwz83q4n1yf2n0fx8eiimn4zz4j9sqnmvv15mln8pmyyjwjh3h6tsauug884brx3vf99epxijt2dtstbujh79kcy6218x3dtiw2wzhqapxvpuygln5f4wj16lnq1d7j875wmpneah3wqglgv3376b1o25yarolr42tdqrygceb4jt520sigkf15bhft8iv33l739aaur05w8aywqr1qrq4w90fk72fjea0pe24kvut3ahu7pxcwctijllpvnxzgr4o8z0lem030obmjfbcaekqsdlmt7mr4t6aq9l3knvl3',
                parameterName: 'tvbg0lii0uk3esmo1dtps7csxw2wiq70sa3g4a1us66wueiq2617j22l9ox29tgij394lrcj1them696rq7ybzt7q5f5gd3hnrs02ywpro8eedb0s1gm9ficlcrnlvueqonz2cmtgs9tsikaaiws1hrtcaa2074wtrj6eio8vzazhsyrii1q3zr0gjgmuu4hmdkcly9alefd22ojjfzlywa8xexobvo995z3pbqd6btexkj2wqvepf4iytnmlt33hy8phjhgt257hrdsszi8218rfeycev9fx5yan26k1azlgsm2u1yixvawkjt3h9re',
                parameterValue: '8nkiv280fnampyarogq6515wjebt55m2n0seys4kruwiq97g8075zrdgfrpmqpao4t2jh7j0ihcy4j1xmv16q0zhvb21t00e62gswb88jelfnppxtheoccfoe7i4nc8nd88cplkxqpodlvu9gntzrbjtucsqqtpu20yvj8ov26fdavq328ykiep1ic4i7t0wea120adiy0f1f4t0nlgvgloco8sqgo420q18fxni9bcwe3i565mltz9j80gp2jedtttuohh2id1ez9k9mn0apjhd41cvdqzezh3dpn6ffwml6lazfzy9fy1w6qc88fjhvl4n8s3ynn6mp5xigzvwsk20iqiad06ixezct6naduqnuu6oiqgdqjk29i0tof2o9ykku1ir6t35uog4mq2kamyezzy53dn2gse1nhlbwc2pakj32chbndwmafhiomhdcdxbqo3lp75x66jt0gsvigtaujqfctf8vmnvoum4pv10ebrj9bknrieylxf5e9pweukva5rasz5t83pa0w3tnuarf9buhibuqtx93v6zsw3p492p14seewx2znkks2fsrv8255jjoinoo77splnmsdsk5sor30g9xu0rmrhf16gtfsz0ulo04389sswn17q75eo0v242wmkxbbn8ryw3zfji0kirjtsszsrpc4zyo9ucopa6t998fffmzv9zvzppkh6qlpy8ttmhlx72zjskwg3dtkmbj7d3i0sf649zcwrc7ccoxtu0ek0i04ui4f76oj6d17smqk0mm8askpa7etu83sej3e6eu5tl6wyihmpq44hnpz9on23loq1z8wxj09f5on9za28zxajgzwborgnb2gdjl450jkrpfb8pjc8q098vxjqio5giqii7g6id9fzrj81vszzfkldcj26yqhb5krwbouspued7quf0jtjn5ujs6c6locvjc56pznul4s98ctrkim7kvl91iw34hl4ir2q7ir8sxybp0fc5dp4u0ftcu2il9jwow2z8ct1v',
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
                id: 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c',
                tenantId: 'a203ddf0-7444-4946-be41-956f42c795fe',
                tenantCode: null,
                systemId: 'f3bf36a6-3084-4e88-b932-dca3bcf3ad97',
                systemName: '5d9xcprm0bzt6r1ctmfv',
                channelId: 'd544dd36-987e-4558-9696-fadb54dabb33',
                channelParty: 'pgsir0fjb0o8kdphfjrd77qbyotb5nrdxs9wjormjs5plgqfzkjxelltu1le9utwp09bz4zmt5z94k9l47tw3t7ahlhnaimw3wa2urm0ea6mhtszpd9ow9zq6xpbxqzzvloijjh75cbu1nrnslxtq9s7mslpjroa',
                channelComponent: 'uwazs0dyseswtuvguax2besfh24pe5cn2xzqkc0netqa2t0oiwnzd4dt7fusqph62nshtkanob4ydk5eihu575pgy1in2xmos2eokpx9y0qgwv6gt361mvdb346pwh08wj4oaqimqhcbc144t3tcmmexfbagu5nv',
                channelName: 'vjug8khe2zab3t1cmyxc8494cyist7ihhgadkks32cds89ari0m4a9qkjqa1yb4h3dlgxcflkzc4vkia6rtpkndopr35hc7lm9k2ld7b6p7liejife6d06ofd7sw5a53vcj0okb3t07i30xe3bp1fkr2czvoq5qg',
                flowId: 'f2b49f33-e8c0-4475-ac7b-ac53454b523b',
                flowParty: '146fmmv6g3azkm4mv1t9ckc1u97uz1uhwzso0lll1dk6a2zbees9eyiwn46ce7gcnvzngmnkw53nxb65y4m69i0s4vs0fqg9aiyvo5f349wsrb1vuom049p5z0zjcbgiwo03zg91m7p2y3rqwfkrnrq54z30maww',
                flowComponent: 'a7k0c66or5wqvxq5xdm9owg05id224jb21euggy7pprxeffbr1gfzzsp46qcyhoz60lqeay1sznfkwh9i1qg4e3bduwaiyo8dc1rz7ufq9cheq4xrnnq5rbp4vvopepej9djo46v70q5zlglzti3phiqxbnpsxus',
                flowInterfaceName: '5jsivgjmgs1c59ws8e3zpp3sauk1skncmnke5cgsiq1avx27im8iaxjptiu7z2u0qbd01p76s9nge22bzop12t8d8vtxfhorep40iza9bn0ez43n2l1mxnyedzsi529p5cz49fjkb7d3zq0xbxummdajhvzj3r4a',
                flowInterfaceNamespace: 'injs2khrg6hb7cc2rsxrqw4alnrh5dg896yznzzke8zdou9oa1bfaz5qfqijihcw2tfiy05v0aozd6v0v8kkgl0gqpo2dmxc9cxf6yc57syeqmbr383cvumcz13yz1j0dv69w8jdk34pjn8xm9k74cf5hqwadht1',
                version: 'f8itjtf62r86jk8tujyc',
                parameterGroup: '78d05x5cxoh0in8za6c6ym85jyh56e8lwr5tgnuges40pli9nszw4lj5gmvftvrmh8ads9zusxhe5fwagtkj9xkokdx3g5tipiqimgz11noj9hmtpmi74ei807la2u7qmegzswdkhg7l6pjryi5xolbvv3o3eotaa53f1vq435usk3tduvhmtyrc0o6jxi8ymj553uhl6m06jolluchjnp3pbemmumg9dsnekly44qydgmrtf0lpwogrvqpw801',
                name: 'q28bwy333l5bimnwm7a488glg4qbi65vq59nwf9uiu2am40pclfmjxyw0c8h4kfawrt74ouwvy4shqqa1sp66ivxo13b5j850vafne287otizk55qtdko3q9ncahcq6bci8s1y6mc6kokscnb9ho8j38yyi7po1hgszbh11jr3v28culsjxttjqd28quitzks80lw8fvorzig4d8g6w6sen8u1uoa3uxk4f90rcpquvny5m6igcezfq3hoesm5mf8r2wj3938ir8njewmob123ktoxeyy1qmvikb959s1j2uszqe1ze9gu52zirl9rrd',
                parameterName: 'npdeb8dch1s8yf2jrxvws2l8xryy4b0j2f7ab5zobgeo5en6pqntbhuvjgje9b9mnl2njz4lfgbn7dpb29eqnj4nb8asp2ol8vrqx8yfwcj4n6warq4rwg1e6bgu8ojohch0vvbnmec8u1lyzr1rhv1r78p87o337sfz6l3neljd9qc3vx7p5xsihxer072bfj8c31as3mhuwshu6nv04dhh6t5h5zlh20m2nmj8jq226o1f4bjjh94b9c89495gsmbjspwodpz4r5om1mm81dqf8kx81s5d3qu2foat5ltyujsiz3gjxjteoea10kjn',
                parameterValue: '0m0ltqm3r966khfetzgsun2tpfqgiubk4bggtetiqmti8ibjrad0lta0gqt92irqss3f7d6n139qx5bs9dri6hzhit7ws6meodylrdkkdzpzyv60unasgi4l25c41scues1f7iwlag8pf8msn6myanw5rx919onrdyrcikipoi323goh03v7sk1zsfdw6riy2axoc28rfa8lkx6m6j5cp0poj47i8jp2fl9q03dck5kw7gp02h56gvrng6sr9gu7g6x39qcneer0vvqkkv0bv9ggxjixyiacc35nfx4wdmtfs5sf92bn7hhcnx4fkk6b3y68venuvjw3pt0ckjf4yz7gxruxoj83vm44cj72zigyxgnhr8r6apwmpobw24rrezf6ksy3cimcrnwbn9kwb93cfimxjleherohk85i32hb9ii91cusbqzwkmomp2n5ykgyumzny0ykjojmpd3wx1xxohil6jmtsm1qkiryy5h248fhjo6suwu0ai0w0ds82riqxqt1n4gv8ni1r40uvml42h750ot8crgifoyws318gnq4fitbbvjqw1cliqakxr7rqfp1lpw8hvh1n24t28hh99vy2gjqy9x1l9xyyk0gbud8cft5i3aw8oh7d91bzfdoc4ng0q3n04h526w54gg2qduurqja47sn770uhojfehf4jvgagqj1qrocbuvoruq6137agz2nizstq3evuorjk7q9rptobne43yvbbvmczw30ehzzyludq3049yyhel22khc6ftw6v608jumeerzgu9kyonkbigbpuywmklavbu4efoeuccsuj5tja8u23gn1uk7c5byiuwbivsy9ov5p5epfwx2wsrdgdmaj73gqg4zg0zqnqc91lg048ycxnkmt8xq8g156mmbcb5ezjsoz2hb7wo6wc582gygk6048rd67hxh35zkggzixot8q0pj9xvcj16l606sbny041blqseibcig55cxzn29whui3dcxhr405iame3u4yrhts',
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
                id: 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c',
                tenantId: 'a203ddf0-7444-4946-be41-956f42c795fe',
                
                systemId: 'f3bf36a6-3084-4e88-b932-dca3bcf3ad97',
                systemName: 't42foclt6ipoy6s9o088',
                channelId: 'd544dd36-987e-4558-9696-fadb54dabb33',
                channelParty: 'pg3l7w9j3e73unrng37v3eaqlewl0d0v41cqyf24tiopgapaeciriie0rghyk810xee7nt4nmibjm1wbhbe416tstng2v00h99vwj0wk8xg9qu8edtlofivrkaqm2ixtmap5g324t8gkr5h3hixy2x8rot9do5gp',
                channelComponent: 'd9pidjhnqa91qe4x5vyv3cqzkd3trajbp68j5fkzzjfzr7pz5apxvqpok9v1j41f6pnom50f0zbhur1dp52f7a61ofkzeppqobng23y2i2tw2eacidkzw3p7yxuje0p53np7bukiwo84a5flf23hj78u0v3bzyp6',
                channelName: 'emeykashtx04yjqpavogxctped01ji1valucnjht3200pbmtzq8p92ov4cdqjz2h7ygw2fuiwmphit9d8bmo1wbe9h1jno5b03dc1spmvx44prniq6g3qalulmtyllifzywfcm9kraayaitpmk3z3c3lga5wgimt',
                flowId: 'f2b49f33-e8c0-4475-ac7b-ac53454b523b',
                flowParty: 'ipexjq5e2liurfzot2rax1hrsglo7fl8nskmm7om261txquwvyzl4gr9swo6pgynwyuqiuh5q10iwqd2lqymprj0jq3hz5bq4rf4oqkui23al7d8s0wgn7zxgpiviis7aa99xkad3zflmv30i13wzibp47lc9idh',
                flowComponent: 'bps4tb7yjtgrshbe5j3lzmbrolob4jwzuumlhxe00u8pi03v1vff6efxwtvrme2ki3rxzu4zktyo37notmwa07p325zikuhyf5un98veqgw4m6aslqdebkjtd5gzummyc8dto1yfw5y9fgt6frleoo2fsnxa3ohw',
                flowInterfaceName: '1t5lxn595wrkpvhwddq6xv2k9ca2yfy9yvwjcq1rw7jt62ufw8eogi4lpk7bumz7e12ksx7l5g9nu4jegdxv5ls1kitg01h0dvzzm3p2wdhmls3zwqzw5i8s24lmt56hau3rvaf3p7pqbn887uwk2kbh9zq9cvm5',
                flowInterfaceNamespace: 'fn83rgmt6uu7d9t7numava5b226srpurk9ysa3bcroz8tsxr4oaqmoa5wxculq5uwisjg2gcwz287tge3z0iu02arqlu4pll169hfc73eibm6t18g5i4vzyjvxqxbamfebocn7islfcbk5d67yzo73pbuh1w0vb5',
                version: '6vxnnzqcmldudu6jvb3m',
                parameterGroup: 'cgax7nq6uw3hwdx7rssuqrotb7r431x0earlg0hpji0lwyeoc75mm616eovqsjf4h0vsi2x47kswf7iivmfs0md88iku9uudu0fivyuogteqvv8zy1ydc9jtr80edq6wj2bumunsxak3ckhv2d98pbbv7q3db9fm5kfnv1e5gjq571vnjba6h191tint7z9bthq399hmw2s9vqtxvofg2f1zt3zn1adbxrpbq3ldlidki4ig6zurgeaabypkdxi',
                name: 'b0kckz6hkoie8b30r9fckmsqh668e26lyrrt8tybjpujus1ui4bpblqqzhf0yr18h22d1o4r9yyzrsgo9x96yn915k5uhd73n68whd8vckwjdcrs5madmemg6586jlwnz874wkbpc4l735fuzvyq1eu9gdojn5spynsc9bd00rynk022o0zgugu93dqmbxh0v44ldnnmkmmap7nea7s2x2439piy31v8fte0297sxbhd0zge31ixhp2xefwlspokp5915mv56x3zduzk2jg0hpc741nm03t1yzfw0tfshcb131318u1uouzsuyn2lwve',
                parameterName: '36gvgrm5duom24b413lbzw6gj4n2tplygb2xgudk2smo23um9pzpph088qgh6g3858c96dwo7527e3yypcjzzh7h25u7idb8mkhowdctnksh0sbfacg6ohd4x4cbo2rxuligjz4s4fny8arqoxbex4nm7uyfoghdkngenut8pegff925ilm5zm7b8hvoos5za36scj5ipnfu94bgy3p3mxtxzt9wvfpkdcwop36awu9q33ukvus728xbkgjrigo21womrgtn1rm7lq0g49m2tzygzns7ca8iyxru4kropacanb0av8u09x687a240rb0',
                parameterValue: '8ll3aqq4ido3f1jyqh2o2wb59eoo69l8ejaeyebotcuz5zxfwyvswgwoon0un4nc5sw1alp6043mx8bqbad2a4re8ecm3ccwvezhz1lhx2fm0lwhp83kj3b57unsqrzzqxabp4xbsp8lezzh0hqkhwd9pno9xojl70h89hpzfl0ko5ilv0b0i2132d2om48yhrjso46k8bpow7yye1b2a0aegsv5qkgt93w1cc9szc4xtaiapsriy2yft89w520hpoiy7x5fhongqrydg8c5gl2nmijnouh34rmlx9nuwsyvjbs5gv8nw364nwqaptovj0rxd9u2c3jdphltu7xdldki8sqqaxqflgwuncq1ogyqb56oq7jeyrh18j4ganoum2w69e88w3fwwhytpfb9bkgv2eqw10tqv8uufiqkvyw1jonhohah7w4hybii4aqammk5ybeul5a42t44kg5jwrc6yxe6cbchn89k7cygu1ladvlsf5y5lrghscmr3e9o47p2x9co4bv2jwlhdxf4ml35gupontrogscboisp40vuxyoyd1qd7p8sm5c0t64jsg6few7mx04x5y63i16rxo43z5f1zy34pzh70tt2nvwfxi3pg14lg47u77q6c196m0hkwkao3ebjb47jo92swtewy9j4c6yei6ie4n4rw7ztgs3115g4nm5g3jkr8omkr9hop1ipjc23i8jgdj5tdsypevay35mn7u9i56kscn2lnlu1p0kj30eehcp4vm8wxgkey824lx5qjfboimf9lfgijtmz31yrs3y67q3wcfbyqv5yr1u0um2t80nu90cdi6xz9vvmplnae8wbelce56umd1oyu1rxvthc0go45lqn89dsm0hgjcnftkoc8kfqn4ame83i44s8tziiuxmi160ki7ngdq65gygfn7uw7j3tt78fzlc2mqs5kcope0ajt8nmywrpzrn7mmyekwcjbjn211ub9koo5z3t8oq65yyfla8kd9ah2qg5vu0o059w',
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
                id: 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c',
                tenantId: 'a203ddf0-7444-4946-be41-956f42c795fe',
                tenantCode: '1h1w4u140n9n2kr4qpi53kontn6vnmwddetiqk3pdo1rlll7e8',
                systemId: null,
                systemName: 't2ai80it4blxgk7hj3yn',
                channelId: 'd544dd36-987e-4558-9696-fadb54dabb33',
                channelParty: 'cf5zmeobm7ivgmh1b3u12rzua9m09mjb57op0c61s5n227wjb96lobc8549fxpxubf2mg9gjpwtrsdsxi3gah25ttuz4pmm3yl348itmsb2ynd715cifylvs95jttfdzrhv88esrb5mg19zsffsrnuvhy5oo2pj6',
                channelComponent: 'lbs4ntjn34q2pct0cx265u7evf4sb4ftf9kih1i9elz2fr9jtv25j52h6vqoydl9g0fwbr8zdatnjawyhevuuapuqpqudnqi5cxchwlpese2m2oesg4r68n6i7nspe5912m5hui9wdeipn2yibmkut43hgxhowas',
                channelName: 'y7r3ghy4a26j7me38fx5spsxq2878zjuwlh7ghl48o6302dhbfszmh6bokrqnfgf3vs03otae9s4awf6rk1u2d6bxt5c4oweez75w1v1s2hez7xd4bbposlc02tc9x83ycpr5rg37gaj4hmyrgmo3coxnxqlugfk',
                flowId: 'f2b49f33-e8c0-4475-ac7b-ac53454b523b',
                flowParty: '52trk9699fzm7ehcwebouoqasv7ru6ysx63ff52t2rgp1ujc8htp3vlhk1nwym0j5bkjqvm4hb2gmdctfvo36mvgxnth9q48wpvlyyz7oayax0z750l4frc197x695cj0u4bwr1z9vx702c5zrlw1z0oiqbccz2a',
                flowComponent: 'grxkfq5s130gq2b3oo69lik557in729zo1b8i0kbdxkum7ge8xpwkn1wsafv4lyvuqt3lhm39187ie9xawk9kq00qz1x9ogrhjmvypzyxsu9ck5t5ho0gdn0j8vhk1tyelst6rzqilwkbjpbtr5llnvmoh9umoqy',
                flowInterfaceName: 'ktsccvsg19keqlgcryld9p6dgxb371qx8g89zbn92shs8rbdcrz826xwxd8bi9bt8kzp6xm23rqx4vbzvq2rrhsgc8q4p47fwispbbqg4uqus3ov8wz013o1d2oehniritassg9fq2f90iu4bj41j5eleppc8sp9',
                flowInterfaceNamespace: 'nja1t9yzsmi36f9wj92hi0szhxbypuq00ve178xzh8lda4ukvuoafpza03bdgwtv3m9p9wglohluck28szp30axu5t5le3xpmhihip8yrlrs03s9h3016ybfv6ktxuzmp6dqkg7cbrdxifm68czlblqvxg2xtubn',
                version: '3rxta56o16r5iack05xo',
                parameterGroup: 'i3ygzmo0e9e810sv5asn199ei4tlythf5a4ngg9wg1vlm41mo5w8nuei1sd1z4sgx613adosbhi2qt1jrvg5zbds3pxu7y7qal4woxc4jeblbr0jeoilx0xcwcubmqlsnzniur4gzv6l96yp0o3cltt70o7h8krn6tjnns0ewhy91lcqj1ip3bsle2etilxc7hl6dle5tcw65uzc1c65eq5055odm2eck37l7517htqy418q33w6ttt58qsc39j',
                name: 'xbgm0s3g2w9rlcw2pp47o5awib98oac1bewbc565n2wwotjzq5uc1symonxqvo3qppk42cknxwt9b7n1mtq5y7r6rmjfe10b9awka7n2ab6bswx7trxhl4lpkaws6gjtlzp89h7jrlt85ftxngj1tihbx2y2rv5ysmh4cqhfrq2128i8gb1uje7ht5x36uvx7pjxxd9pw4tjljipif64zycn1i56bbt2chr10wyrr4vgouq54sr4nne4012jcjixno93sv0rpec9p90bxed5qbcxpnvh4nzdvmpllos0qjwh5wumi8dx6m59mojux271',
                parameterName: 'n4icso6xjy3ofgwzskkmbtg4mztndy7lsg2akxsr63o0pqv359ib9yb3ukz0zxxb98chjakebfb3h8alxwui8zxo7edgn0dma31xi6jqdd14j0dw6qzsx9xh2jpzxllp31ht5np8faw9vnd5dyldtl0259uin7aewed2ms5421s29gbwolm5r9qdrdzirsyp5efkyejgh23bj480a56ao8h0yd72a4uibekw9nzkbxjecuknzhcgaz21eipomivbbvgyugwefy8is7lp6g40th6gqe3k5n9r92nyg9t2fqddbohz4f0f8efxt6evea5f',
                parameterValue: 'ixxls4e9l5kqea8xq3k09d8hww8ab3xbskyn03w8h6zxzt5sgljldhgv4irzz0sl17cvvudqc0toyzcgvh3u4eoj9hm2765nmscko6b69edgz8aysw2xa5wm6fm9etl7jhknt3sw4lgvhn2y56owwm1ewc2iuxwaee5yzmttjfkfa0t56mltsuez1wlcm4m7v4qbkqa7rr05c457n82xfob2dm0vdlckzcy52m95x7705vb863gu1gh3vgplciwhgtho9gysux385iibiiyyn6rs6esu41xmqzrjgz9wm3wwnhwatazyffteswll6185smx0byljjmqsxbi3ab8hhlr2xpc24t82oocmha6zmfpw2whayxt9o3k4h9catidwhxrqzgflngdz8agtnziz7siluyrz2h4tmowjh55spk6u8wzrzzwslpeg7ovfzb4v2j64ibxrsce6vixj0alw2z744x3kuk9uwuicmfposn9u8mibaafnktgdbeage6ziy9vwwggfl8i55cxm3r04ao85gwwbflrun0xqdyz4c2hnls4snsf03a9h0s1gh2e17sxxpbujjg35tg6t62t7vvrz6h2uy4zc91ngg7jkyhudcbz1sgj0sl2qgo158lygr3b3dz7ohdpmf7h9kjzfyhuhhy5mxk00cdcdxwn7y5xj8whnmtw4phzquygs4f2c9jhy1s21kzvzptojpy4rh551wpzphexfzz56quron7d9o130cgr8inzfub98j4akosnl9erih4ep4x4zv1xk9bpwlfvxupvbwdo4ds9y5ub51qselum257f38xbx423pumb124xs2fvktrcuxos94e7fas6xsaya04r41p17q1plbi8p2oq9f8m91kcm5m3tdamhgky3rc1td6xnc2ilc7qh2e9vhhacmmj1mum2gocx4fr05vwqcvpeafx6o7o1wgc3to47fnud94dl1w3mboe2fi4wqp628ezoo2bp1zsktk759qogo3hrjd52ukyt',
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
                id: 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c',
                tenantId: 'a203ddf0-7444-4946-be41-956f42c795fe',
                tenantCode: '647p1o9t6ikf46rh3ic69eae2e9epm8qwjgqsrstmx5s56v97y',
                
                systemName: 's4ototk84dakin5w18sa',
                channelId: 'd544dd36-987e-4558-9696-fadb54dabb33',
                channelParty: '8kpdqacuhtdedbwfo5j5tbj1qb8s7itaw8vhtanyih2is9wrewjg4xp7tvk57yccrvlo0h17i7v0c3l0dymgjgvpnk691jbawq0wjls0xd3mq99szc6eogg63uie9kxy4pjv2odwjvd82lbyweq3z5053l1j7iaj',
                channelComponent: 'r80tjcgvwx89qkfhseo4xqi4ovjildx6tkpk1dt4p6bet4lrbsylf92hdecvs7l62yy9w2o8m7jr9sdx2xx1mlq6acnerz6dcbsonwjie3161r7gmk8bazeak5gnj1fuenyq395k60fk3mhpuc05732sxcq3xl3k',
                channelName: 'yrcj72fy790tvgm7aydrm9cojp5uqxp227wrimfpq3uvsq1a1do5177uqn87ch5z5ghysln5g0lfx78vvwjojwsh6jv3q0b8gnc7tpse2u9m0n8xq142sw318qqzup2y8mywtfjxbalm2h1ksqdkn7chj9j715my',
                flowId: 'f2b49f33-e8c0-4475-ac7b-ac53454b523b',
                flowParty: 's5absbko1d60sg5htrof4msdwiublcfl5qwbo2s2htsmpqkqtlwl161mf2y60y22f1u8c5tfe41iuiunoky3u95iy1eu20t9o3qizmrpedyzt7twtag89a80dctwby9k2aatagqrr7p3wsa4ou9owyj2jbyac5oj',
                flowComponent: 'f1hu3e11mgzshlzx93sx1atazjjw35pkwj2lwf2w1cfpvzjg9r3si93pppayk0wy0x82k51k769tixhfzwmecin01lv4pnz3qnrdew6zzndz8kbiy1szbtil2lr0bk7zpkjd6t7hn5pw8gnc9tdw5a14v5wsxzfo',
                flowInterfaceName: 'ffhxsui14bfcxacaxi5lu7979mnedt1zuookaniixs6kgfir7vc5jhx4pmxlo7mm1b13ycsrkilegkemd3otq9gth81as39wqmp47wm37xahpa21cehx7xl1xo7oi500uassrw19jfh3t3troretmqw9fsf458s9',
                flowInterfaceNamespace: 'uy0hdwy6qtbknxr4p57v2m2fzpx4304k7m3wkxh3gej74pcbnsrd2807aphdmpre4izgyrk3coex090fhdil7xpmvwf7t9tfb29zmp5h43o6taiz31hb31gw0hfo1vl8za0ys8sr5mp6q4lo6m3h1i4tp34ofxhd',
                version: 'jz2sc4zw6zzwlopybui1',
                parameterGroup: '07cn43i2e1yy9f6o1a8lnkuoiorjq6wdzs20q9d440ptgv1yv9xmklv4bj880ivmk5wwd2y6wbrfiddrarml8veszuw85190swi8wk3e8y61a4ascmg04wp4xyf3fmvgeqq9aqnbz8qudhrdhfp14zmj6k8o220rkk0b5cu5mwoq9qr6l28skqr1k52wm4eqjdkf3sgir0lsk3d90uo8sflioqokf3g2u80vpnfw8opypgyfeqi6j2ifeq6qzad',
                name: 'bnqw7e90ebnr9u02yjzajx7177axh3nm1n0hahbs45mckfqf4jk8ml3x888qfxe3253ibor30czyf4rktaqiy0prgv8kq8cnnuaa5ykc4308gu4pwlpacisydnzvi6ykwt6vs52eezbg5p9b2z1mrn0393n14wa9ssrhm2dwudac8oaereiysfnaytvkuqppjjj8gzoqvkt3apjgf481nxus7ac2yho3prmg0kpgta7wiqmz03rfb7c5znrmr54yylhpjwis3yjy6jzxe3g1sjxl8dv3njrgwl6cjofgaz4hexew76pued5bjk61xx6m',
                parameterName: 'chc7h7wbrjcjzyennhjc2wona3or41928jguxmi30pa7s7nk1p2bgmvrlebgcn6gitp7nwgrjk8paxqpqug1kjx05zbok5exicqlloj4t1za9snhz7gj7h1291n6mcx1rsqgio03ubu3jyhbueil4j9us1imfzhqoqgc7vk306hoesrj3x0cr6m3cpy8hrxlz62439j0efrajx7mx16zru4d5uf51yesirrzn7zr3vf5qfu2cv7b3dv1zp1xbdqjtdipu5v2dns5bxak1ixh1lymkfeqjg374lnzwergonoz91v5s615avk4zgyz3f7o',
                parameterValue: '56sgigrtcqruks0mep75wqzwzhvyzcs9yfpdtomygh731pjyfx21ey5wbszkkvlaoivze9p391xq1tepy9zy6drp4v2dmil42agmxr0d9ucka03ul4wqxhsl2muuy4feh9qbsonplopzfikcw1q4wyaznr7wabgf3pk469kx09tp3xuo1vu8snp64juvb9grd76s4w27sdqeeoulmqfn7jqlflmynm2zw989r52d70vj96oj4hfdj07jkn0dljyvan0la7cc8fscu2arza2n0fc2jypnhbwz6fj14ntxonzd8qwdax8vrj1c4i1att7w4dnzgnyebil2pkvhv0ubab7814ewcuvxiw1x3x08wg118l704t57sningfwqt2zpfty4y1mlsj6kr5m5upq9wdxu1z3tif4u1kbx7eawnoc7qe2b89yu69vwchy0dwmuvzclsfbw4r9utqe8y5yce4l4htpgnqqibj1o3bbcspa5r18qb9l4155adxmb18bsdjp6hfigoqsgw3rv832kcp7ir3ts20npy6u20zpmbbunmnkmdy0ith4864bk0feo1sjahn9240b6dtfy3f8502lmvzn26jbciri7fv0kby1jn6g9sss0d2lpyohzp509s7t2zuzz4fl7lcc0wr8gzwabhu4nyl13cn2i39fq02sfafagqgzv05ni7eulf7tcz5gf0ms2iiokjjygqu3lie5w7q2whw0czyrat3cewqtz8x3sdw3542hpes9yaiblkcif29xccw3aws56hrdp5pfujcj834xfzup7lsz3fdjcqbr262gsl8r74vklk2qyk7noajb8da4igrdmq5z8jiydc9tl3ngc3nw6331kjmis9hqvr2shy9656463p6m5dnh9tlvigl8rchnsjsporynpp5gkcm3xl6zj3njky80ye26hxavv4y1zz5pr3lja4drcncuqd64rv3i7ba11rl0bnhsi37nab3rzhxn96w05mg170hcws7bvz0yoek8j',
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
                id: 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c',
                tenantId: 'a203ddf0-7444-4946-be41-956f42c795fe',
                tenantCode: '5rjzz550dvh34twwxoazo82zfx6i20i76szdith355aju3yi7i',
                systemId: 'f3bf36a6-3084-4e88-b932-dca3bcf3ad97',
                systemName: null,
                channelId: 'd544dd36-987e-4558-9696-fadb54dabb33',
                channelParty: 'hylss76df45ts1wf25vddssk6fi0u4vh9677u01t1uqxadomia8w359ao4veqwmkhtce35k6vbh1wav43kul63z1nu4vplbygs14tgimweq6pq7jbkkove2z97xydw64odh01rn4knfuwa1pyrxch8kvjikhu2ux',
                channelComponent: 'cxlm87qhk6zquvw1uepewwndbkga35816nxkjygesvuzywr5h4i6zk5cjk8gw2h3sczuvd90vc8s17xoy095u49bzv5j8amqvuw73gks0unbr541efr2tkdpwfd9lw8jzbyh33uo5ez6qsmk00itdf65n2kqeoiu',
                channelName: 'jx1b7kknunhlarlo15tnc8z7oh6bzr5k3rnpyrn5x0hfibgj5qx9jl6svtg0u2kzdbz6vxrmtl7dl415gzn17fhadkb3x1k53yb788u0i9xd9hk4i8qudc4ig1y02jop2gmgpkeusikss93tmiqhwoa1cgckf8qn',
                flowId: 'f2b49f33-e8c0-4475-ac7b-ac53454b523b',
                flowParty: '0yz0vbn05n6g23gux1nmpzk3vvd9k5thide7oazcxi20nto48u2dp6bvxw8oqhjm4lxu3g3pxkq3la56hh7iq7gq62aav01o87l7hjfqf94kzt0l94j70a6o6waipazeiqxqu1xbevwj9ts11o2fu77fhquizco4',
                flowComponent: 'sz42qae1lrew9f0xzvg5fpnn0aftyn5kfp2tcjbp4v3wojwzrpin1grsi1335h53jhiszkfey17yvysd0uv2xc8a3k9xft3bx0sxtnw05jly56ser5zxza4i82h37yuxgvnjnuvfq9obre7aj745lytsichuy7dd',
                flowInterfaceName: 's1loqk5lbyj7xzrbd21hze22spklpdkapkf3oejm9xz6lqzfrxruxmp7a4s8es85dzyzibaj6cziiglmal9671885q85bw6771g6wypycigqydxgxa322t4qqb98wnfwiq9cwgn9safsevspad7wko408f3fe03u',
                flowInterfaceNamespace: 's81htr56rzt3vaso1khnwb21vf0n88d5rcstvuoe786cgu3is4kmf5oo61ffo57siy44wf025tv9wcl48wd7orvn6y0lx0yyupbvqh8aghl7qb941o2lyp5w2ghvm0uyu3uj770lhrn8hzdppke7i06oyfwmq83x',
                version: 'lhcu9hvt2zzpmil571qc',
                parameterGroup: 'g0pecr6vws5cg7zw8dv1snag397izb2l6jgzn2cvzj7lgwhg0cl6jxx08o9pfipyispclzx3bosnxx4mpuwtktnc7pr2yg7e519mepe9bb1kai1q6036nn3eb7b4kpi11eztyctqthcw075m3x21rywi44vgcmggajawwanjdw2s8h1a575vy9rlhtrky4l7zthxmdsrw14rzapmknrsdn5bjthqoxnniu9xajlaq9nldxvoysje0li3n8y7nz9',
                name: '2dlquvo8cbdoh2cr79xve5sqa7wuvyvqar6pvguue8736oc5xreqc1p2how5czwojczmp0vf8ksiw5uhngd6hgd4pxws9kvqq4c598hcilo9o92gk10l7motsduah9umen039ahi906yysptprp8qplj0hhokzzkk5tvpxo8uu2yqd5ni4rrmci54obvktu86a9t7dqe4f554gcj47cp5am2iq5qytmfgr9uea18902xxd8idu1yq2xcose92a9ng4lbh3dse376m42oq883b5r6xrixfwrezg2arkhetd1j0dl9dc8m6rwf6r4h0efe',
                parameterName: '4ptaud188urer22548feciaa5enzbiytontujwggpebuejfcg72mup2ajpvxbcc4k1rl1ynw7liqgvtqtuluqclfdz0x1bik8hr4ku4ayzsiwyresv7qs8ami48sibgyas7s7t9wztmdp4igjlrk1jjw1exv1jad62kmnijqb8vy0cxlcg9lj98ow5nm43ts1qlnuftiwb6ko6uva57fqqgvp3llccro1l6yqqmc4lh4a1z25rhyjjpl3i7sy409blkc7u52hcezwx54r507lrnezpzsg6siztqdrenla7vty4q72ga610v9yp6av7js',
                parameterValue: 'fc9uq9h1ruablkh8q361r6k4t291m91rs2x2zixmmz8l0153cfgjoctgyrefowcp7ex36uoeo28xyc9o5n8ulnzsxgg1q5yo5v16dia5nic7ro87nceey7c0ireimvg2bungyvt20qmpy9gd29gj2ai4n62s1neatn7p9q9kgor1rizbferfsmwuw0lw0ionmfj5cd7pbh4thvb7nywal77iw6w2u5hg5y7d3u410jwi9ctzcgecy9jvfceyq6ngyvwfo98srdq9olzxu7t3otqju39pgocz5oscvt9xazrykjp4u52ovsfv9qh3m09wijr7fzvki4mepzzufkauyx45l6kfksnu9bmdyay8zet8vflr91si53qp930a1jx0d1l45hchae55la4660mkbtiwtnte2ah9aa8rrj5h87n5ruj6hs7n0va7d67yllef11h07vor4imlo8m3umjgbe6gr88bud8dis8efqce8b9x9cnducrzim8tn6ez8mwpuy331ggci43qd2dl15oedflt37qgeyorrwvfwze7e9v29rnfdzr7jm1d7bnzw8jpg3dlivzbbtkf5uccgyyl6zj9krb8inpro605ysvy1c2d5kkqfetm33ykeojujf2pvjh6hx4qg9ha15gtw3e670ea3s1ebs96ft3l97ktaf7b9aclke11jd9c7ks6qb6gm7aeajd5peanvuanhytun46dj6j7kxls4d9hlifiyrsd3vszuqqhekrqozbgh845d8f3jtlzm8s3gsqlszpjiiu93jwopxn38387m43x9nm4dm7clr7v84gi96p95a0dv6kmwtse65fkdy2ay6gbmnhdzy1awx18k7go0fefjlzn3e0xoknfs2tomkzbm40i4q0g3fhh2bp6kqwrtmdhdjy7rr49wot9s34r5rgagebo0hqqrajst6oi1non3c1yq3ike8eulz2pnofgdlex6x7lh511xvovjb3zbkrz9ak22x7d5pron2phw4cgs4uw',
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
                id: 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c',
                tenantId: 'a203ddf0-7444-4946-be41-956f42c795fe',
                tenantCode: 'lz09sxatt2kz1ppuq3vl1o5xcb4d50xqmzsrzmg214deqrie5s',
                systemId: 'f3bf36a6-3084-4e88-b932-dca3bcf3ad97',
                
                channelId: 'd544dd36-987e-4558-9696-fadb54dabb33',
                channelParty: 't0inhbeccvikhssswysqrrxhx43lmd7trx2xlfam5k3cbu16xbcorhr3r5e04gbyv5b02d6e4k8na09sihi6h47x1178ndsrw75gzpvzvdff94k9f3e8ugmc5t0xsh5j895sd7w41kts473uubvvj7obeiu8xgy4',
                channelComponent: '6b7jvq23tfivcec1rism93km3ek79hvncurlnai445rqt7k5u9dgxxmd8xypkb0vogczbrcsq0qdv5oumhkacmy4720ie3miwqghf33gacbx0v88k68a4h06nkf46ofsj016z48tmdoqorzzm0d0ymf9tgwoapwm',
                channelName: '8w16w9vm2khp2vejo15wxtw8n1ds6ktbcie79lou6it377lnbpaxzqrxmdaatevs64b6xdy4coxsuvf8gy4lmv6jic2on0llph0j17cwit0w7d5r4uh3m4lu8nl74dzeadstipozub4b2ae90x9ok1fmteue0iyr',
                flowId: 'f2b49f33-e8c0-4475-ac7b-ac53454b523b',
                flowParty: 'y2d3rtoeptzm0bb117iajmttq6h5v6feamkknakshfazhfknb4j3jkt19z2t47pg7khnmvni9o2bf0lyg7gmj8xva4lvwrhgiuw985umlotsgc268vff550wx7gzopqbqan9xvq5w50gw325nlbm7k9jlqw5i8m0',
                flowComponent: 'aqct613mwfxragq5k5n7kqvrfiwntfflyi4zn185qesg9jtr844y6jecf4ukqlgt92jaz2i33v4iqe5exyj1w9ksd8swaf99iugrza8efp1itid2rnvnbq7jhgsq6mmyixgan4ueapxd7m2mu2k3co1bm6mb2lm5',
                flowInterfaceName: 'e4xxtkze10q7k9dert68i9uy97e27n47dn5px8z76unrtruk8hea6qxv5i0yq4y0ae519xorr0go38oevi5fw94r4jpd53a1pvdobner8h3ovg8qjt80d07idedim7b5u4r1jva7llwviooey6s7x0yqwez68dta',
                flowInterfaceNamespace: 'kpe27n0wnptlgyttpzjjboxpwv6vinqlw8wzut83mfsinglc8wl36mcnlmnw5g2refwyust210ipbdpbpa7t1fm8j28vtflr232e7fpxv5t9jakamj9nngci5qoqavrk4siklm81scvqmkyta30q5sol5pxkym5q',
                version: '9i5klo6zsu9ly0ya8pop',
                parameterGroup: 'n4tkrnqzeofjvqgp8ee9zjvuuro8muusyc20goz379kbusfzg3ssh1ikmnybn9my4tpe5lep27jsgq8c0ezghz4wli6ajshbmvetj9i4hnmwh7cw8n1305zg0gqat8gee8i5wucg1tm4d0e0qckerooqx5xrf1vu7kzb38s4qtkso2c986tmf7kbczkod1yh5hbqjicd6uoavni1f4gvz8v3k34nyijra2b1xge4js7fiu5vwhyb669zr4tacex',
                name: 'j5q9goyl64jfzfev2bn979hfmlk02c0zbsco86uutn5epvx542a012cas2vtfrsidjrwnmhzlscvxrklb1qrg2g4uhrvlex3podnvwtfp36iiu8iiw8wk9xhxl76qjpqxd5ua14ei357di1lcuvj2shlsu1zsppib6vm1svcl1a05nsceda5yt4u6znq8z2tvcvhu0975xz4rfiws0o6klz0tux2rud52jhzss0o9b4pjcl4saim5hsjmj5pqg2373fmwurlu9ma3tfvxusj5k60jst2rqu3bah2t921gglco44iwwazx3h6x1p764ke',
                parameterName: 'nlcyk97z4fgwb4832dmu460aogkn2d7uxlgtlb6b0ahi3fpu2bq40hcjxf116x54y1tqgbwnpujn3tju754lkj77gemy70cw1pwbal47t5ynxk3gfpkbad1sx0gyremqvn59jyip5wv5giag25xcibp4w6icklkitedl9b3e9ej4n8yqnbw7ie00a1cbi1cgw8zdsdu5grzu0gpxirr9acjm0qnxwtrn0y0jkp1s0rduyuy6k292lwozv6cqf3wxy7dez84ihq76r8v02ywe77khp3p0d42mojha41xp20s9ew8phxk4yh2lu7dtd7iz',
                parameterValue: 'ff58e1cb3ro9iu8yom8bwksor336qjmywcvaof60ls5ksvxwkuv3bj0vbdomp8hwgz9ctliqskfuwq2hsjktjc589l3loljwy2gausukwuu97qcfxiyycnxcbm6afemidh1lha068gee2ktcnkppddk86pqb0s082ly8uvv42vo69gf8hxuj497j0ppyisbahu1vhe75p9lfaht836jxn5c1sthrxy73704vi43ogfyoeoet65ffoon6wc83u9pzb38v906pdabk9zr3vw4mg57w98ovlj827nhzjtvp4y7wn7v66hc296yebeub3pwza1004j28gwhmst4ulkuuggq879687o8bmnz4cbfqjsohqxic97pf7nrw0t394q7k5jpp3ax0qqedxohdt3lqgc56yxvfchamhg73z7gxcbbuuwcsu5mjbrudobm0mkxdo6gsdxjgx92a9psvzzdf0ctl9uz7s7i9dc2w3e7eciloc2sxu6bohr8x6l6wef24n29dbugkwves1ponxcq8jxsl4ip4q71kxxagdumhv8kboo3u9xudioakjcr4gj5yho4enslxxwk5zgxo7w5447ech4tj73b5elovdiq5iwyzdjwbxpbj37fyyc1oax6q7t7r83hhvm7zur1ryzvnkbx1t5g3reu01dweaw1vrj9oiw94y3ufomtgublz9eg42w0hbtc5c9r6k1w25th7b7echolcwule1akgtu5cfqgdxodw1kso4e3gyzh89c3n3qxfvmfu3u6y98u4ikkvf3fhe7dlu1ykdduzj7ss6ka3hanaikqe314taa87n4dfosix3j9q5ym9245v2nm2oahv401mhghxqdmatmgyqqtt9y7yif2lgfcuiqwsjaublxeb1cvbjrkkml9pkhhwqg4hrd4qcmonvux57l9zwuxrp1ftfsp4ytbvgk1jdwtf6sh4bhlkg5ea7jv6yiwgggja4yogy00urxc5f20s3yzzzf5nolvhroybgs3rdmd6',
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
                id: 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c',
                tenantId: 'a203ddf0-7444-4946-be41-956f42c795fe',
                tenantCode: 'j2i7f50hfnegex0ln7h0cd8j9l9hxfh91xqx7z80tam1e8k25g',
                systemId: 'f3bf36a6-3084-4e88-b932-dca3bcf3ad97',
                systemName: 'vbb50t54f01iv6pzl4qm',
                channelId: null,
                channelParty: '22wnu314plzpzolsxj0bmhzs1yzg0e2utop51pjecx8u38t70w4hmbfpt424gkn2fh57j0i4v1qwkzja9a2a1ydxnmlszbew19mbfxtrsfsujey6jnohrd4x70apy3wvj2cc9i7xcdj2lp9rk2gb0oivj56ewqaf',
                channelComponent: '191pdufx3aibefu76ttifpvxou50lvrq2erg3knmiat3mlkr46icgfx73cicpkmn0xy8ycvfg6hkhze3iqrtx847l3qlniv3au4zntm89yz5ozhqmniz3o5c0lkjkz236g7ohi7xta1n5flppwc1t7rrc7kdqbw8',
                channelName: 'xb1kk2x46yb6f99krfyev4zo6q2vggdxss7461e1suob99ftameosnqojjvqdhlx6czz2ezkkcmgen5dldmqpulcqmxwp2g9lmsf1iwwmhk6eimrn37ocis1uk4oq53r0yleu3o1gkxis7zkgwopdh3rt5snreuc',
                flowId: 'f2b49f33-e8c0-4475-ac7b-ac53454b523b',
                flowParty: '52vfjsyfmdsh4oxke5xmwd0ghwpxe2yegw677c4hcjmymyxajsxyht2xqxjyuvkwe77ciyddqus7qdg5gnavdc6901djd87i19idxqh9m0rqxjvz2je9jdigz7le1nhq02pr5zw2n34lmqdasjchrm52q95mg58c',
                flowComponent: 'f4snhsjpuddoyuigfw7dsc0jkffz7mv1066bol7d20iyxctdl5hnwiekm3hz85qiuvhgne797yemsk46defzid2swcvn51a4dav25ns7wh9vuq6vih0mcmls0aby618a93siup7cwdrxq4zed7m6lmjbnp63j3fr',
                flowInterfaceName: 'mc2cjahjtgrl040vse9ef3d0aetbm0cx063k7un6428winat9vxow7c2gaejoqf0710dhd5kbw51m7fc2c6qruxt5a35r1ot1fsutugukmzd3ci7bfmj1a6nwjxciiqs76hjiu734ofw7faaict32qg6bwfts6uo',
                flowInterfaceNamespace: 'sb107htg4ukuwzkssuiqmso4q8f63kpe7g584eldan77p0yhmfn5j129kh2soanx9o8mt4y1pmvf4ks1hfeisijs3kqld3rh6zc3qhunte1p5159cqdovs6zgn4vum6sc918kqk5fz3suku7nnre4gioj9qvchb3',
                version: 'tpoybo34dtxg1n3zunqq',
                parameterGroup: 'ta1rpxp2znhq5sob2p5kw8lu0h0v85joy75xy7vdprjo755ca9warclwx5x5a3taygwu7vq057yn22q0242ku6iexhp2zdubzshagxbq8kvurlj5fopshknhedfq6rkooof9p5fk3142y2k4cbgdrhq6r4novk9qi1r3sq6fha1x0zwo7t0hs2nht9l0y9ka47wkfv7wbrq5gnl7hnlfh78kpz0r2alrrcqvuyjp9k3z57nzfiuapxq5z85znoq',
                name: 'mrynwboypclvr71a4il7i0xgqgdw32b2dsmtmmw1q8zrj4ty8lwm024pct5iffnpv5s38kdzqsoepoagkv0l10d529lcinxuqjb15q2muy9e3wtkubw8kk8041ymefghyvdmjc8s078jqi8eofj5ok23n959g5ran4avfanjghf4v9642oo1w5erux4fa0b1s4r597t7skdmh66alb4rfmmoac784oao0nzx6bvw0bvucnm31sfhp6odljmhs3x9t5u8awsskproxdavgsqok69r6lp1cbf25cogyc9orhfjsn5m9zcsyloz8s351lrn',
                parameterName: 'rh31h2ekceeihmuxqsj3jkpf58w0e6u6xoa9nry0molnke2gpbh4sv4fzb7zlunom0t3c1owjb614zhta81i0zlk0qvu1d2i835c57s9bppmjzk3c3vr0jw4ay0vm7gu3jpxuecf485w3v05pqzm9vhfd5p0wgnwnwyr2nhnfpmasaivwzip9zfbwd24kq8mmxbszigw3jt4gc8gvr2e759lcf75kkb6t62qwjgorby6odfs4zghapz5cicz2qffmzypt9bqtwzcj0jb4v2lm84d6nuxf6skvt6djm828msv6mnaffhkt5lnifynxuzk',
                parameterValue: 'vdotw8lb3kqhy3f506stjjvmpgjxlmxgughpw63swdbo5jmpo5y48cx2gx9wltgv60a7mua31wn2pdgrh74b4woh3v4bn7jhfb6hnwiysxzhezzc4w046g1y57os32zq7jj6m99gwuqiaixavnke6mfpekj0usuaz0x7hxj8p31pj8evdqwnpp5s4mrgd7uv4d8otexde2y7z3p3vgslftnnqsngtv81463ver3lyvwujw0lwmy1zsthyyf8ykpow6zshof8o5bjeceqon7juofv29yyx47q3ydl508csgzqjgljpz738zm2ihkfic6mesp1e6okmyn91129xcsk6iveezkee355cmibcqp6xwe01niu2ato92rivpw506l1m3glqrxvr96ys9ivh2der3zrey4e7s1k8c58efadx4gbtvxvjmixppwiebxpt1vpstzrmshl2k2run6rur3is1owf7gzxmszk49qqc0fge2hw87upwdxli0zhu56z5x1oxc0mlaovoz3t5q3gej4pm9n7sv4ue2j8o1qzxp3fg9ux8n1g5y7tzgm02yqmajx6f4fkj2lgkfp27mp8wc1grttsct805edce3ciig6k5xycrhle8kwn7t9oauyj04sfuqz564i8obim03vxd6jldg3806eqebk4qwphh1hhxj34lsb2amlca7sa2739qcfmcqpasd7odyvm7oe00gctsx8r49fcnyfnsv4a42m4v7awjokt80l3p15amg1n19t7a2994x5ebvr8rrwfijsbtnnbjp8mxsd2zxc06m0qhcuksxcl3ubunyrzflkxa8267g2ykk0m0fd3sx3e151awic9e76o4o1lz8yktae0nbsjfnj5r5yr20sv2ii7oelis4oz9pxfro4rlgbdhy4xs7kkgp9jdv30ztc1u15ksg03hw4uwx158ymymtjb4kcua0f1nwuirb57ipu6smoqfchx3l4xvb38vbldv9nrdlt80vk8hqxc2v2354zd28p',
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
                id: 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c',
                tenantId: 'a203ddf0-7444-4946-be41-956f42c795fe',
                tenantCode: '0ninz9qxxilithciswttcwc0gvlxzjsv3wbnb5q817q2zicqhu',
                systemId: 'f3bf36a6-3084-4e88-b932-dca3bcf3ad97',
                systemName: 'tlpu2qop1qzfwxufcuks',
                
                channelParty: '9t0uyw4kc5q5l04dxztmbdz91t80vzbfp4u3tqebvvsy15w1uohpslotr9yily9hcz5dlbwhskkju8qtxo4jyty41ck0cjia8q9mvr61rr0bin5661iggo39yzfb31q7b91qfjsmxno3uybsyud6z206g7aw99g8',
                channelComponent: 'io5t070d3fx4iu3adz98y7s0gg7913if1eiqrehtet362xlnrnjp3w4tifj1jw2okv6avfmele6bygr2t7048rxv4jq41pzngg630zyd9zublls705x9w16c2wr8mzqjl9nendexx6gcqiup9uz8w7kaz41l144s',
                channelName: 'ia2d10fa3oubdo5wawwy8cwwral314f3z1kqay2qlm5quaytinol4leeq6sfukatpfoej81wqsmo46uirw5kssaf2ugl109u7vy4dtiqudhwducq521f566i9j6ugztpw746jot0soqf34l86eqppf2ubvojyxr5',
                flowId: 'f2b49f33-e8c0-4475-ac7b-ac53454b523b',
                flowParty: 'q2bku53xc90sn5kprmqliy8mclldm1ldb4jsuxatvn0hf4zk96qtpl8c0daqbg4hp3md8oni4zpgafpno413to5yte5529vsdqfzubctt7wwyf819o5p456g70dy7wg0e04of3k18sgtb6a8lnselzffyxy7ku7i',
                flowComponent: 'nto941x8wr5wftuoioe5fqvm9bwny8o0ni815lnodh2gralvogmt33y2xrmq8ve6no2bnuj5cgegiujw258j5xgbzn7tsea9wgnutjg0d2vekz7sy2352jy632ljurh59zzab73dpaxqp18dx22bpyw8wroyvmua',
                flowInterfaceName: 'h1t2o2cwcm3l8e9ns1r0a0331m91nfh4x646nrjb99mguxv8jlij4gha0dtuaiix6a7dwe6t7vzbop2kvacrinfo0wkssld2y1pp80uo2t1i3uddp4dgj5wva7wxw2c4uq7irctmlfbpg502g67y0n3g2av8p7q3',
                flowInterfaceNamespace: 'mzplefitdo8buk6feqqcmt91kd8b05gz4fnx3g859sr2k3vbmkbd3b1hflm5tm4n1pgih55iwg0o7h9f8s1e46zxs22v76bqxew9hvwphidnzumivmy79juknw1z0jxa5iewrlw642kcjd90unhdybgi2x8bpu39',
                version: 'mmmdtl1qeu3daznlkbxd',
                parameterGroup: 'zekwbvl6611ugw09lusx72y9dhvfybi9i1dd00rqg5bidt4o25ngq6o08oivglu1ztx8ti1dw2lithxj9xs8ejg2hpnwj6q0vc9xiluq4bbxsof0gfzhon8f4qntlelk2jw8isifrfb5tw7g6i3g5464q6y73kqggi2jwekipvb5bxgw7pa7x60dowv815yi2c8ggy2wsjb93o2nm8gqwc8alki8gbcm5h0si6ccvv5mqj2ylzqmlck89b05yxv',
                name: 'p68znp5dvmjg3k14zno1iz0m1lyvtxeo8am540pwryj1v78aa8755ari587e05v76urxtmeysmz1y40itgt6laskgzxdm56qk6ud325hqftr2e1qboexx5402l2gz109h524r21mkr93dn48ckqcgskpakn56qfw56ombh48vuregw3mri4hqr8yj36jy88ayax56eylpxaek8e9fg1bhs58gf5utrj5b6kr9r3kgrp3fjwweltt8vnq7qm8rbw1hx69tpr4m0o4t80bmid47nwrjzjh698edtd9dj4txb5ss7zxjbad62omexv74nbs',
                parameterName: 'e10gprtrx1ybsue2jmwx78lk78ndyvf1ftol0nju86d2c031pqg3e7gm5mtglvbsjmdcn3y2u76ghyftsvuee7k5uv190tw19ealgj9h423dzon4b6dgashcf3j5ww6vqwob9b740ikagb97eyew9x0wl4arwexma8x2rd6l38upc8mu93homuf1eb6x9xlw3shsod5yk6hzwjc1cnjqtsoiwa5o97fbvdqt4o761myamc2kiqt488ah8lbio3evw8v8xb8wrxhfc81wicf3tf95bmtf4sgqrqk9fukrcc1xi2ez9k11qlo8tb4qf9n1',
                parameterValue: 't5gy2ouhq5exc7341oy8lyt2a2ukxbfrm3ywy5qt5kkqp6v1i6aao4xb7to5fvicp7d5xdpyv490jhenkg1lc9vjrjd41xpzhvf9jcdon47cukir2vbogao430lg0na4gt9adtsrgh6fzwx66qftwhclyhcnunxbe29rtt0q8puq0klw4o1cgua9ojt87il2231i9quz40imf79hpozud9s3tkd01tk168y6vu1gvtvyiteqm27aj3p0tpgy9jx1ol502rvyrd74zv4r32ic4xuwqrk9cf1eip18j21fxcvcsavil841vxk8bvoln7lg5rc89s0jbyns534pe9cz4ti7igkx7hww8kupyhs0syfx98qybp4rbeu38j580ogigp03huqyvce7d122bwz0vi1aq5l996pdsa0pw3ctvmmvbfi0wclm0rsyffrl134u6bzxd6jgtwp2dblhtj06b2ocjj4aurghuwuk2osyr28n4ft9oi46aurofu7fhmkmvqfjqkb3s8n9tmuudh4ecvf314liu715p55f5vjrgk4dqz1v85wv3d7nu66wota89d53c4q1a1d1u1d16z9p0rfdlsqvxw997cl5bxmkh1v2z2rnj42mc7zgk3knqmegyn9ydv9arfk1r9qg033ydw0axu5qylf2n7epfr8pyqguvbbkhyjqec09fenhq8674rr4ucp8723hrl2v6i86g5yixda3ycoax9kwv34au762egz3wvtn1xrn2aqqyadwk7nv7tk0uie538csjvtqaaklwnml7s16p8v1mlwe7kjzgml5sfs8oo0zzfm2cw69jbvqi0hw63rq8lq0uez5hhbefy1f61nwu06t01n78rp5dfh43uucuynlacuqhbn180zit8oe5ozex0sdwhttx3vc7w6xizyao8agh0j97dmuf8ie3c6aoy4rguwmm3ibup3mk077p7rjvgkdxq1wfvvw5c400pju6bvwykuwz1zaz62d8e236lcqmd6dynkv',
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
                id: 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c',
                tenantId: 'a203ddf0-7444-4946-be41-956f42c795fe',
                tenantCode: 'bz8cplcweo61fko0ayz7ogjbv6voqr457z6ay41xdedttsb386',
                systemId: 'f3bf36a6-3084-4e88-b932-dca3bcf3ad97',
                systemName: 'sb5lwmmi49q1josj2etd',
                channelId: 'd544dd36-987e-4558-9696-fadb54dabb33',
                channelParty: 'o8e1d3c94u9x9o4sfag6z47xgixd4pxbb6lcqtzpbfda06r5jx73q8e17d3lep1bs2cxwcmqoyzdte4yhpcu9us405ldrfsgdhc9c8av8tkbfsbwm5x2w79vgk4iiqjae41g54jtbv0dazozemr9rdyt07p969jb',
                channelComponent: null,
                channelName: '0gny6rfwowsvx8yxg0fhlitg0pd5kcxcox4aiu3lhau9gt3r2xift8mubmnef66yzr77q4n9o2ii3rhax1g1xmpysntpthqbfryo009hflm7r8eknntw53z2qrj10ovmyhkd6ly27sd18qs0hj10enn4m4hklg0j',
                flowId: 'f2b49f33-e8c0-4475-ac7b-ac53454b523b',
                flowParty: '57r3pyv420t4jtyhpx2no7p1ajn31e6hs5pxn1zr8gdgfzsiobnm4ddkk35d957npd0oagtasxlzllteqsttfcdixk3zh183118qwy37itpr775jssic8egvz203vc60a43in218edgsr51a6rpwfuq4zga73jk9',
                flowComponent: '4akaf61jhbk5yg9xhfdungre3euigni9m0mg5hev4lq16wtkm4ynaji8ty05iaiz211nq3m41jq5nj8bduekqut6ymead2vda6rao1tlma8ow73lk5xqry28p1gff1ng7youugmhf6j2t6h5hnrr5v613vmtfa8j',
                flowInterfaceName: '0diofkc85rgxyymu6d5vyyg0mhqfjf34mlrqwwdym1v74qyv0inadftxexr68xf7q0xqspxdka1l2jk0cbjlxs5sbj29e4adwpjw6workuoacydoeo7iu1kb5srgjn7xfpbrobl9lq7jlgp711m3pwmtwizks5g8',
                flowInterfaceNamespace: 'bh1mpkesk5qqq3md0rzchsjz31q2gy4l8ub31tkht8evnai9rdpavokelkm06fkgcla1eir3wwn6jqai3xdxvgc8od1s0jmahvtpgblo5tsm6d1uwkx2eopwh4kb6vj3zddy263bwbojg9ynj5te93r7fza1sk7w',
                version: 'nk8dwwan7ufxvuf9psxq',
                parameterGroup: 'cty8z1xqrbfey11ckxuolv4tdu97y8kg5uoie45pskwc040osi7ji3kxtlwr2zhe5zfmmq6awh043r9gtl3h8wqbca6seo8ul7k0jxvc4wnyuk3kpd2w2d0z4btav0gwqdbc8jqis0rhzdek9351c4i39pnlpjli1c4fjygvqzbzj00lhblh3uxla5g5ttdg58kk9czdmoed00b11o3qragvxpbvlpkymlfialpk2eyzu7odnm8o8jyofaloyz8',
                name: 's4qul9tsdu5dpa4zwfx1a2w4661962pehjefu3q7q5ry4kgf1kyt6hgyl08jzd1f8zyc9f1y49gzede75rc4j9wd9w0grpk86el4r0kuphhlv6x43ksuyef4tos9t3gfb3ok325szxducbwlsz2yhtml81h9j5eq3001boctsaayf0rmh1vpmrd8haogqkdg4zknvsz1zr99ss42kppabp4k8sw57gjb5jbs32mtcen7bh0tz465cv0e2o879es12skkn0piye2wxu9ddd9ki5w7vavq0k0doeujyzw1nlryh5qpiue68oh11w6j0kkz',
                parameterName: 'c68um17zdnzfy6rett8at0rrcaf9o6crhwob7gg4ii89ous07yluexb1rnj31ho189t2ttx0cvgaqojevcc3tilb21epu1lt2cty079wkvykk6v7wjr8tl0ased0dohy1cgju10kma409qqa5ll8dedcgdlr1v3f5k8cjxlaoa92unl393qv8xl27rs6dooh8m7nwiavstt5nafd3qy02cks9591ygdj497gj19nkc5osdlj6zutxkeu3xqbsgweg77w9gbdhaev65oxsvhepwcg76pagfqah13s13o0ygip565nnu37tb6bgcbj1uhp',
                parameterValue: 'uy6no2ujgxcf824wzakc4vt8ml5t914u6ow758fkcsk3bc3a06h3grj2b25zykfu4ipvv360ma1rdvje5apko3m9y4a67e36acpbpek38i2jw1jasu1ekl9gzv4kt9z4l7dzakhpc44u9svrydvgsoed5ritep28flboq1zk9eawqpfitgigakbe0xumrqmzly0gsfea6j7gc6q50xvy9r9mms7va63wo54uaehpeb9xeptefj8q1e4q18hr85rxygkc3sbwboyqb8lgfi1p79ego9dexpgtpc1406heptzooxw61fz2jatjvqiavwddsrbckuql7e5xjwegr3lh6m7tsqc068746t25gf52uuwsny1pco2vb53ifr3qsnrnqtpq75vlz9suwb6bqaokbrg4unkfa982ya9h73horva6nagq9bf6up1xs5pwxqmzfrqpi2gtrb9k4uz8wxd2k4dgw8la66217zj6s63i1dc50hebji74i30jn3pn1ioplnrfal5g2h4lmkm2hwjb8md5dixv1tvy80kivpgywc5wpth4cr7h5hku2jp2varxe8hiaijts6rw9wq7nup45ncrhhgffay86n3ps5w5qefccxnbdk5n6zvqigbiflsvzd5kzjbjlfkbes9232d59lkrx202cig91ptsh0blr9rqcft9ml8gag36rxjex7aa9ogxs2iye9rnbvp8fxnc1f4wdpkj9y658pao2g2lm7ppkaasyoby4d4ot0bpuepyof4qjtuxg8688ybecm8bh29z4iq154e4i89z78d02j40v7j0cvt5diygivxugf3acrioclq45kav44sns4s4etoxosjzz83p5ccn0cdebn79n9koa9qmahc6awvanrxj0vphpm6i75orsvlcbbrvegg9m05rh7mkbxdv32z7cc660pcwzosa895we1sovh8be4dvos0o1lmzggpmkk7a8pii2l6mc7572qrrz9dvssm0uyp1qn5rfmp8p00mvbx8',
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
                id: 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c',
                tenantId: 'a203ddf0-7444-4946-be41-956f42c795fe',
                tenantCode: 'sm6k46s27z2x7k1u0ex530uuj6li9by1v6o928ye98rx5jmceu',
                systemId: 'f3bf36a6-3084-4e88-b932-dca3bcf3ad97',
                systemName: 'b6vb42t2npul81ybze6l',
                channelId: 'd544dd36-987e-4558-9696-fadb54dabb33',
                channelParty: 'mjcghrefyxxiyqbpnmn8zidw1islr4gxema3uzc75f0xxmb71yh1i0hvd3zko6qpbp6xh46r61a0w5nbbdhyfjlg3errgte6slxyfxp7bnqeozjpqmvn729eyrwivtyvmfkw88kdblxiq4iiwo4z4avrwip3883y',
                
                channelName: 'myglvqfs9w3uw2w4boikdzxgxdpc1ax0t1q5quvch5ziyk994roacy8eelb2f4lk2ya9ze0by4ej75eai6kg9ysr3ujyw5a44syehz42pxcqx26bst7qr1mihiqvaghz5x69132eplm1tud0mryi16vnd4yckq7w',
                flowId: 'f2b49f33-e8c0-4475-ac7b-ac53454b523b',
                flowParty: 'baevd00tg1jf8fh50mofe8dr5ayxkt9czoo0c5uvyb6a032jkp5qsdisrywmsxtsrhn4qa4c8rsrcihl81vptvm7tjyqdrvzjip6jf1a3edyselgzdonz2fm89it95jvdtrsnrvizncwqdwfx2ut2kf218pd923z',
                flowComponent: 'ritvw61s02j6911bcprchskw2mdrsodq00jov688xnwuivmf20b8zp3mso63at74btn08yh0i8pe274lg69u3fnwkuu49h9zc7roe58skz1a5kw3ayzqr822atgya4p9zck93cuqz0tikz9sc8funn41s4s1ewsa',
                flowInterfaceName: 'ep6aqa465d11gv8pupjlux3y8k1kc851gq2e413c9znrrmkyl43545ps7dec5uqt978eiu9a4c0gkn8nzxwla7rr8fu9412zef0ws5s8jtix9dqc1nltygitjnflmdp9k2sffznaw6he0c4qnozok6zs5rbhu09s',
                flowInterfaceNamespace: 'hh2y0p4tpveloi247etyk1hkdnahzzxybvuhragwkg5csipu2bw6dienvsth1965ql43lir5gs7rq1v2p3lgvj1jj1i57f5pkhlcgjvyuu6y6zatrx70hgf1frwlhnf2p4ixxbeq436fn53w8wuriku3gp46ovfz',
                version: 'tsvsaempq6xufqsistno',
                parameterGroup: '5bf85b89y6cu28fqwrxkxsgcdn0aofvurhok48vq7oqyevii825ywl4prkd1uxrt92cnnxe6j1psrn92grm2o5ew7xtar074scpik1saava3q6ukp87r8pxjbr4wpkoh66wzkevsyrn1nx95t3xibcawunjk1y1argou6b9ck9ucu0hz54t7q9fb8qsj0gymvmxbxtj6suk09zc864emitutlk6l2j1fzxm02no3gsltvoi0tw634kqmdq8s25i',
                name: 'v75hd7pklenzw6o4fniv1wiy3axwpr8n7wmfh3060nfp2cqpc0q17ydcgjy7ifxist3ojn6kg2js875y7vws7jxcng7xaw9d461eh4ch2sfw3fxomklu4gtejegj654hhv5jn75ems48d1rwsj4gw3ieq3khqd2a0g85wn46ig6u7grprvurbhylb8uvaakhior83pc63m1d1gupxteja780ftoh6fe54d9u8rblkbgvjukv4tf925yl6tdl72soyvrotfu2yplu7tkjkehuftsvrouy9bh0wmrcj8o7qsdib8c45gaeiwzg0ood336j',
                parameterName: 'qs9etkdt4i1lgk1qbbtyi7uv4ac00nhdrd0uxh7n9089xl07txbo784e2zt1eqcbhsncxwsokuaay6j0hdu8jcc55be3hnjs48190kv7ak2ndfk08tuivxdjmmbn5ds3saa69wj4o0tjqo3rdzizb2tyhlr4ofaiz99neobd8vl0ofz0g7sm0dujwcc2p442lmfufenr9kcfvgmle4wejmlvqw834kyybue8at5qh2fh73u32bgwc1ka77bx523ekl3jqc9d6k49gvxfxdwl12fifbmzg44549cry3dnbxmebs2jygcccyzh7nxyg9kg',
                parameterValue: 'cwcoxhrfb7812icsjndfjzv40tvolicrlgcqfsjcqapc6w3la4wo8wzjbschkd4hqszzj8m4wby252cp1t2ty2apcz847q3u0blg92iajbhb7kjsvths661deq0rogpraxvw0lu98i9c01jom61v3zw1qk10mo5ikf6o74r5slvs6uw8ugj4u1ym19yv7v8qpdbk9w18g28tulij4x1v2m7pav3byddu82u53mbxi14djtsm1w0v2duewf6el8a3psrcs0ivpxhoyuh0ing1pnet5yvt02uam1nulo6zoy593fbcb5savs7n17aemmyea18ww2qqu6kfzfidfurvctv737v40et71sd44f4id8y95vcetoy0mj8v51f64mfcatjvelwxtv5plnkw65d7zg753tj3xii006wzd7l397xjahr7hlisc118f0c50izo7eohs1te5w1p9fxzyptz2twy45r3gsps0vpai2x4s7yt2xtn04figyi865z1zz88ay2j4vvy6mqx7f1twmoqnmra1nex2ec564hgcrhamhi0dicuwjocyteoptcky5tdrryk0uxvarswgqwbnrss8luwpxiysmcj62tfeqy7dimh65um37k6svttzi2l8ayl0eae127g3vlyyz25t6v4jt45fz78n3kackufvgkylnzvuf6ervwkvt7o0c0kzak0de9hd6kvci917byqz0mm2buv3win9prrgzmadjc4ji4fqam876qtn2acldxp48bgfl6zgtbn3ggwcm3qsq3b6i4a1n3can1x4ha29fa7v3axgnv5xk4ez8mv2p8uuqqjzjfzs76ghrypbrbjbwj9pof2v2gwf139m0tyxn5no5z33tlqs8xs4keecdxg7v1oq1xz6abjdorp4ulfdlyhz0k9eygxwgttv4b9zife4y9rzfxilifxc3yh3xg198uqz1uzn1jzz34bw8ycn30szqzipg7ktytsya6xb77spoglqxerw4jc2zitaqe84eif',
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
                id: 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c',
                tenantId: 'a203ddf0-7444-4946-be41-956f42c795fe',
                tenantCode: 'd6c9bu29zek7ewd7ikfq8481vkqejkpuq5cxv15li8y108zail',
                systemId: 'f3bf36a6-3084-4e88-b932-dca3bcf3ad97',
                systemName: 'n4rl2d4g2g8gwo1snjjx',
                channelId: 'd544dd36-987e-4558-9696-fadb54dabb33',
                channelParty: '5kjih1glzenwozpqt5oz3sihy5qchzhc7uloogpt9b7xh6ah9gsa8wtu3ds6w2yntdpztb4hya49qx9knpjy3musqt09jdv4fpey02zv9zj02op81mrkkr1ar7l2yxtt351d80y4daftv7x7p6afi4f2awz1gq2k',
                channelComponent: '400a4mkjobxrbcki1t19rsmtxm7fb4cesp6hvd3a5m3k8w4i6rnibtam0v73lwmqr4eer4ui31um4se687jhufjcz9yu5g0psmqqrmzfzdvhckcd4gb58133hi8md4ebpajk3lkphscyoqgohbpcfwrb7af5f3ui',
                channelName: null,
                flowId: 'f2b49f33-e8c0-4475-ac7b-ac53454b523b',
                flowParty: 'i0j4bpq1dmu262zdq4p7vpjv84eb1taxi4kfn4mk7big4s2vtr0suhiq6tu5srwuqdyh0et41pspswx1wv37jqr1osu274imf1yuu02910hctiv2eayjilym9egg9z55lfy3v2cva8lgb237eovi9t3cma3mpfme',
                flowComponent: 'oj08aj03azyv6f8o01y30eqipep7j7xgnivpxy7l0l6156p7t6ax4fhf0d2uft8hm7rk51ryfsipb3f809t4e6pfmrd0dzzir8zu5dq3dc2o18vzpx34szueee1g6aaq38z9vv8fk72slp2utcpwa0276klp1vea',
                flowInterfaceName: 'zhrd6d5s7u57kvzmv5ruo6lcehg8s2ya1balom3t00v7us7sdixmupiddgq47w95xsee8yn0lgmckcnx8z3tew4d8131k2n197wgpbf7wi2veius2cn4e4vb9r7yqn3abbcnsgqq2a8jgdm8qyocq2qop4cqhsrt',
                flowInterfaceNamespace: 'rn6oktkvs7g0fqs8rhm8m4ndrz2axpgnsdq97zdvqziuwlo5sq17jb4ibk0s2e6eyrjxwdscrw7m2duoj1poewr8mxiyymonsldxfz0bs8b6c3whfw2oobinyxngy7pzu2gm01zz95vtzhmj64t860tpkf81gehq',
                version: 'auq2n7fu0rdi26xn7bse',
                parameterGroup: 'pr34ezfsfyvdto1vgojsm9ud4lmrgsqv3s7p4y2vh10oa8435hvdj114xw4dw7u2c0ltk08s5kx56uh52y7kshqbejr6dy8mzm38qybbd0phbcfpitg34r08xjs2lgzkpjan4sx0bt0i08olx8pceychg32x5xz6q10f3lscsgoe2095tse7mcz8q671bfrzs3jz59ouk72rtkm1fx1ihksgdxv5nj6968ae53w1lkztmmob39u4u9fh0m9k085',
                name: 'kxtzah8hxwfjs4lnbilkkejqtnko5vqontfdwh48l5p5qhvyhv842i8va2bn8yurjnirnqivsqsgdoegw5qf2ugmx6vznq3xhzd1dzd0ugjgdvaxx56c9qcoreuci7n8upig8mapp319fruj2tkk7uufqd74axymlkj4fqo5me84j1h549co19gzt5a9dqqjb7en85tp16w2cyza195vbo13j5tuf9740siwhhnsn1nex56t812sxioiw0jlkel6qpte1mwg5wn9283m5gfa6gqq2jkvg3f8elxgl09xkw0f42zudgjxxix0ko37vd6w',
                parameterName: 'pqd6ko8wmr1gh15ly1840uzff31lfu1xne18hrs8ecxcakhqtv4jz6wxlorw09c35yql7pbd2zj6a2nxjnfphxpjggxi6dlca8l61zl08kjfxdfuv2kslafyaysijq9b3bmph0igi0kyh8yy81cf52lr8lmeelje6tel2g0wr8n8t971i7wop6difh99izl4ejflf53ttgabg6jzvmfazpoxumzi5vn10uqhorp8jgskliijue21o4cxanxvftw1tbyt620nio2kqfmwc9bfwa6othhuxy956151fa7ud139yhhfx3gpqa6bjejoojdf',
                parameterValue: '2hj0kieaw3wr7vn1sgjhjqrzvd7gugcbk9c5cbj18kpcv4bwhu47kihye0si0mh0cibdkd5bjz7a9x9s4e96n5vfy8zepylstv3i2qirzgv32w0wq0xjbpva0yudt1kmqectrh7j4csvla3gpi37eylg8bs2dklaa3w5t09ce8u7tizw7xjeojw9axhjhbnxfcjw2yqq3yq2io5u9vqaga41ix7y5nj70ipf3yp0akpcpzzohw0dsxa4p4r8shfqelp7w16l6rgbpo9pghr1r2g62ktvv5imt375cq90rctyk6iciuh0rcczm9pu5rw6engvc5h73in3o3lengt78y8jtjgs7bsy9n8rib6h6pmfequoiiy8g20e3v43ndy1qub4xzi5j2l5rl83bxnmgs0cycnayx6j1lmnn2mah7rjaa7xwmruscbpho2cu5sebt0q3a3r9ex89trfqkyl6jaynyetnthqwduor4gqaw9oyvgzvna81rfhd7qh9d8fog3neyti1bao0pigxxl4jmsxjvb7jf4eue1te9y0v86h5q4e8yoy4y8ubwrz959omj6sgt96zza0u3mgvzvi070raum1mqm476qszbqgku83zoonqpa73zxaqk3yzxrook8ovenikeu9g2ty9j9zpt45r8xl6k62ee6nti9boyawqz1hj2l6tkroaw1x19onzjevrx3qjadgjq7edz7izo6cngi01ptb2ivyo5415h02k2es09vpe90jyrbiechk9sgpj4yevhke456jtvbt1h7gzrl7q1ytj1t44n6bi4lt1en958tf1duybci2qf42vdq6lxx35nb35x9hvwmwbgp85mf7siv668bx2916z63m57r6b4fi4j1yhwa59q92x8py0muwdc6taqp76eqpojp9h6mzz8apxazvxbo4p02rtwz0vo6zjkqcji23s8lo29e5grxn1cfjia7svscec7p0vmlmrurf60dx7ajicxfcnuv8dfpbsncanxjsege2',
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
                id: 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c',
                tenantId: 'a203ddf0-7444-4946-be41-956f42c795fe',
                tenantCode: '66i976a11tm39db627kjjfw5eyeuxe87xtbwyp8ycvejoqwwd8',
                systemId: 'f3bf36a6-3084-4e88-b932-dca3bcf3ad97',
                systemName: '46ncpfy74gokj7zuxfbq',
                channelId: 'd544dd36-987e-4558-9696-fadb54dabb33',
                channelParty: '04dsqwkn0catzto71qkd1r9jois5ybdrdlrz6frvjh7rhf9iv4ike02iiwzzqepx1kk6nb5trug64jumwcs0nops1d5i9ezb977ix39c8sh77x16hhcit6spak38ogeixfye1bo2jzlnqq9lm8vg6pvzwdbsdh4m',
                channelComponent: 'ha648i82er56v5p1bt2bfugc6howoadved8jkehc0x3gsl7kbfzvvo6vb0d7ip796e33oe7sh2bdf24h4rmbirqs2asl0yjne8x987lwai65k5luskd81162bgqrdl9nahk4x2bo7yokh77flbrxluwifwzuyor9',
                
                flowId: 'f2b49f33-e8c0-4475-ac7b-ac53454b523b',
                flowParty: 'xzcz7l4t2qnvsjw4frdou7lu5fo06utggp19zwlw7oxx8l90fs50utrs5vxgydiw1s17xqc97h1pbfq90y5tqch51nl8f0i8oqx5dng93bjr5a7v55mfwa0p790npy5hsbhxi688gvbkztv753hn4mmxzu8vjn71',
                flowComponent: '4x9rlppmutg845wwyjpg9okmes0uibs91a6djp7hvg9ye6wj47twgksi28glw4a46x2kslu7u35ia4er28xju9bfuvr05cvrrnrb9fi5apl7t9a7pju2wz0bcjxq0vai33w3rtwyn7jz98lfwssq6u5nvvfe1sgf',
                flowInterfaceName: '6gry18puwbpl9d56kqicdxw48y0spxzib4obooi5kqanah64lue77a41o1itk79m7c2v15p04g83ie5dzeucpwv7gxishu24paca0utichmh50p22u5zl5ghmg6jnj9wc4qxqqi3qe0y5gcpkqpzq3jk9zgz26wn',
                flowInterfaceNamespace: '5a8n2nwdz5wcuyl23lwky3ot7ur6lab4j6ehe8pd7ehmuoay5jrvrmk5t499jenccg5690316oooe5n353bfjnfbcwerdfofpwzwrl76iyy54zakde4sii3yt04ojf0na9t1yc988nq3tviuuu9gzh201kduec0c',
                version: 'un26pkryh3e9o9rxxv3m',
                parameterGroup: 'azj1k4b8sxqsl4wvq2e0pwz9ppg1ajtwk9508u8ocesndww6h9816p8zx4xl0ismotdafuv4utfvlt9v6nlahugo6eyn4fbncqx94ftym951mvrnilp7b0k5qiz4iacfv3u4zn59xysw4d0zczvc4v1c3yfms9g3k872jflz2nu0o7o0u6g6licrzgrtuhkozb38tt878mxupzfqwiybjo45p3ox3rh2qtufr9z7k9zsyct46rfry048dcbowx2',
                name: '2gr22ykp1i946dlzflqzqcsiuzhz5xvshf8hixtagbec758t6q63rh6ktf2cfbgxyo9q20y4roxe1naesjmd4n1402y234bho81wwrms3swn1kmno2xaadrhqu6cjwszwjzd8975el0uj8rocng2qkiay47jjlopc14h7rb1z3trmdmcccq1v26kfoqts37ok2sfpq6k4ocv0omneoscr3jxisyxr2v2yi0egl3xuggnd9rmpqj24eelzftn8lgf6tdviaefxesmclzuh3zk927imoz5kvi060c7tcjk0p4u694peonmq38i5wyllupj',
                parameterName: '82tgow6u65h3dzx3evd2u5qyy02n8ajm99ioislkw5tmzmeqw2hdlruvhngyaufbgzddvxfryynhk829136aczwvks6a4y7tjv3dr0baqiqhyyvhtsmvib3nvqv99244ge6g6xi1q19o7ooc38w3u9vuyey5smejwzx5dgeddxwlt1gop6z62q9wr5b2pcyo0ocfwd9tx8olboewa2gexn4fzy7xwfjuowezdw3ohr2j5mpgrbsl4os9cqt17bqymqigrikiubhxlnxwhx9c0cxo07ojh5ot6m45v2drfffcsj35a33f1r3c93h00b0e',
                parameterValue: 'w004mivwbsvth99ztcd0e8pxxucrkuj8xs661ea2hdaaftzw2n4srvi62dcd2csq176i0k4hp18jr6bf9caunlht3sh32w0cidiq3vn96uav083uk9ke5l1p44v5ekozhs133wl8t0intqocm7ctqucdxsfquij9vy94eumjygwux2y0fqabn3aupohxt1raozgrfuhw4eery14q68kc6isbuoo4llw6wwaanp61k1ukhnknlb45sh3yoga278u60lbrburd3sqa6g9fenpwfb9dhd33ta43c0kjpkgw5hhswuordkjq2ltuhfsoelwbvlsbp2vvksqwnrkr4th748bg40ktgl7034f32615zh3ghts5ppe5pp5kikjl1occaybh23fx7w36divopssxlm5fkbxuulv72z2y6zx79g6gtd3e1zikcvz617koo8pnymdfyxqxnjeadbvarysyo2t6uzipq1q0s5ibj1rgri7gjwhl08srmnlegxaj4xxij1cfnry8uqlfnv992zkp1cq5im5e0mvwfzjqvmvc3gv28hdfcadxil9klqouj80glqd3jwu39mr1k7so5mk7i54f54ctubs4g3jfirl6uslzn9g6d7p4iiimlj2w20m7hpyegukc0yffq2zvsrgh3q1d8se1v8t8ynpt9uvnizqlwu0q1an0igy9yuto54lf7rp9a0a7n517yhfdgt78g5joyh1fovvloz2bxobp0haq2bex5ioitp4eur8sdc8oz5v6pu58q42hkiyanres634ccd19hjeae5t5xh9tkblh94yursjmngubsgo40iy961tmtehh5qc3iowj65d49m4vwxi0u0fhorb3hkwb9gr1lshba62ye10rfo7mq3mqojbzy87jmu4lospczrjbp2dcclsvqesjsj6g8ocr2z9yty8fg316aium2ix26xful4j7eei0vqwvxf6w2a4yrvaiwsywh9hmuxwexuhaca71s0pklt96e7qyi3eu3fdz',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c',
                tenantId: 'a203ddf0-7444-4946-be41-956f42c795fe',
                tenantCode: 'dxloypgc5ilv7gbbn30mfe4q7omxwlx7r1k1tkfpiyzcrlv155',
                systemId: 'f3bf36a6-3084-4e88-b932-dca3bcf3ad97',
                systemName: 'kb1gh8m56aqee6nsenyq',
                channelId: 'd544dd36-987e-4558-9696-fadb54dabb33',
                channelParty: 'hweftdca3a4vttz1r3la882bwh1797qqti1jkjojh34fvnme557jwc7t7yu62cb8kp6pk689grpfolej28i2rpuuplssn91n3g20ku7bkaxzbzziko52fm8atuxqvuh0p995yxer3xkf1n8zjhqe7z5vorfyy8bu',
                channelComponent: 'j4mp1haeex04ucbby9o70v43ethnu7lej2g5x50nwy554194foadu4m1s2krr95i83e0t19hkzagq3hrk6mkrxgvwujolx0suwvu2vkxp8pfwgx46oynowrg7xqjvgnt0vutcy9uz9cll14jmqfd4pa2p3p4j0k7',
                channelName: 'edmgw1ze4z1qd44aqmi6lrn9f701lap3dlax7vj2c9hpk6su6u5x7wvxi8ynkuamss8dcwsmhlrnaaoru8dwxo796axavvo2kb0r1w49egiybdh20o0s6r57p3e88so5mdos04wq3q8kpzgj3smb81bv991j351r',
                flowId: 'f2b49f33-e8c0-4475-ac7b-ac53454b523b',
                flowParty: 'l45y7k14yjad5t5ng5t8a1jyyfgveord73w7n14ii10zagpjvc7s2zorf859slx9wfiu5wlatha6bowtbjzwk1573zysuhrb5vi7cb2shqyd8rviyv7c83u8i3xp7iab7ja5tigbkttol33db18scfp2uho6ns8l',
                flowComponent: null,
                flowInterfaceName: 'ub3vywz182smp8vyu6iqlg1z1vgdmhuloo1ggvymrgixunhep6oyueybojyzgxc0bltm5kyfhegbb2o2vju3o7aydrqi6cnyudj8g0s8nh56bokz7gg2kqapsp8v2fkbwwl0ll9b95kyarmurra29z106gy1o3oa',
                flowInterfaceNamespace: 'inickleitot35dbebubp40x2941r59k561gkr24bn6hfx3pzdzl8zzdmydap5ag0dhleti9stkn6ab8jstkq5n0gtxoj7thpxep6zh64n1ckafqyv7ipkv019oyx2wuya6m4s8t967e7q8oqi75mar05lr4h20q9',
                version: 'ohxd5d5ol7hycupikk5y',
                parameterGroup: 'd48shj9hua4i087t1wepmodprbe0qcrd4696aeh0kdswoxafhy17ivivpr2k8p4xma0n3548myyors37fma17m5a0btlam44fbme7pke35f8c06znyuroip99empjc5h0oylvbim8ppsbbd8u7q8wrla20o923wfmpgurs9hg87tw72l5pld25qxb1vbix5e0fkkf6rm6r1oriu2anq46xuwi786alof1dj0ubzz6kohji2qcrwgnyn2tm6ksj9',
                name: '79f3sinlghakugfe7hh97js2rxsqz05ej6r4t2myh9sbrxmk249k3lucpttdtukwy8vvyh74zouhcit83qin5cinl6ei89r1ms4vaeeecu0lnniph9h8fa3168769c3hjejl40xy4x3dm505laaf0stibp9ti6wrw67emg3t8j91ogshtyez869h0a5ctvlhi2la4gpeyotd6mm4tc9lcbf9zhhxwcag60wny08gjmn536zc7b961ho2n6a6xevcrg6jtcs55w8tagq33bq7qojib8wxqnky9ffnsd4hrfwsz0o3ajr8rvrnf4qk3j4w',
                parameterName: '4lnykalm66how19bsfnaxcq16u90dmebzrjri8kx10w3j7wqyck39agcjlmpuanyyqx3phcsskm84dqjob6gorack45iazj97hlxjh2y405rsdqci2g94d6uuy5s7ov50y7ga0btl854tldlryscn9mmuu567qq4koioo04gze457vsb6pgzluunvvgraa6hwq6t62xo7j9wr0x30zowm9dbfk0vo1l5mf6lol433epws23i973ww4job0pjw5ccf60qmovremtjdkhpbokxl6x83bz7dqijmaaphrc9o87xtylptrs8tbv2880gynk5',
                parameterValue: 'l7sfcfbceoa1dy3ojpt0xscmfufqe6qpzvpf3ff77viibbv3ilk2s7c78ptl0m4aojkfibayai7onnsg2cuqp54k6ilvb9ba75ajyjsdmlt9z7sbgjxvw9cb2yunmna57so6i02ovofuuke88219ws7ye8h1sw8859luzhu1cnzps9o5gssmi49e7dd14nxe4ffesjv5w1x8yjc3pkj2p9jnx8u1l9uoqfpgcm08o5gtiunu6x6e8ifnhern3pz3ysfj9bgskkr70ujf8yo17zl0oqzh71q17i17ohaantyypjli6bd2e08vajs2gib8i47qbd3exadnwu3c4p5qhofz0r2eygt5q2ldoiaesrmhfmqetl1w2q2ynm4243m5gxc8vlc44qxa837wlvta4y421xqyh6ek3paeiplenz4figd1ra4uep5y0y8sqznq1l4fvoxf2qnzb6z93bc9ze1d4j2gk95sdtsr9fdbxgnob5v1a9hvazct2fe66e3k9cgaemyuwi7zsmm8qkoc52scis3osp065ge04mo24z2qf2xwq9md5k3a28uc5d5xf1stg1lmldompth2t9oqpyulvoub8rt9shtu45ufqg3fsalirlmfsdtkn305fswbgrtjpupwjw3weq7x84fp4pdb8bpmnvkgyo8q2pmz2d27aqwbuokdj6j6mewu41tis5wc4xcryi9rmax8iiubvz3zllp1o28pn4w4uvyvcpx8m11kmp2kbm6099fsqlrgdaws26scqx3yucqgjbugurme0afew47p9d7tnloic0neb1c5gmti2riyzqvpaynqih4esjc8dbgwrlh8npvhf7jbsvswr51qag6uklbds1n5nv8s5meklo60md3w56kk6dnh4g0ajcw5vrfyns8w8acmxvpfo4e1ej255c3a36oyqs4dmi89bksd7b88fueoa8yeoc21holqqxieymdiirodnu6ld2fcuxlbjmi29l5pqyc4xpcl42t41ip5stcs',
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
                id: 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c',
                tenantId: 'a203ddf0-7444-4946-be41-956f42c795fe',
                tenantCode: '31628pf26jcb3rtl35gmr3o23n7i1jx8wc84pgi9z0nxhz1rk1',
                systemId: 'f3bf36a6-3084-4e88-b932-dca3bcf3ad97',
                systemName: '2xn0d7ijh5ztta7tn1ax',
                channelId: 'd544dd36-987e-4558-9696-fadb54dabb33',
                channelParty: 'pdow8fvtjac3x8jaodwn5vckbz4ky156o7wzzjy80mc8luyxop69n49v263sgjgpdlyaoxqn0cuoui2qrlcqih5te8f1b9kfyvvweg2lxcjqbgo1jskm8psc297o76av2ol2e17yp88z7lylr4pk45cq1vhlcgcf',
                channelComponent: 'v88asqhf9w6iwxozf1zlrxrk23l81x9wxl2oayqfx62gzdky4nppga8vnocaqxk7cgl77e5em84do39siukjsm9m2s0o3tmh29fj0besvim4puvmvj8yyeyhunkcuaxbmekx5lr9znlyg9evn6nm7fd5o6wde610',
                channelName: '0ydclf9aigeo9pqczbpuoqnqsfmglfynxn7o1sm3wgsta275dayo1p3n6f91b110649rvcaigtpe3gjdiqe3ptqpv9hozk9pozs82yz14kg0gqs14k3p9spyct9unxx91rfqogkvxvlcmozmhlqlea6fgg2w5tia',
                flowId: 'f2b49f33-e8c0-4475-ac7b-ac53454b523b',
                flowParty: 'aqkfu1gvqrlz4wqaeu5wehl6bdomgqy43nvh13gej0rsh39kh9ke8fvu9jyhekh1488litjrrw33hrlikqml5l8ffkaitt1zkefke93v823rfctf2b1z5m3pvqelm1nswti1pm94jgz072kqs34rpbmgwhp81vki',
                
                flowInterfaceName: '4idlg528pwqs0y0l67p0gm9jwwscswy66h0o1cqft2aq1ur470sa96stvkqw8mrt0ozfd27qyxo503vunrg507qsvei9w3s9jeylrxsx12tv2af33hutvycuw1lj5gyxwifyq3boi22co9pzl91h8xrp4cdyeaj4',
                flowInterfaceNamespace: 'wr8500tp7hq5ndm8m1eddkfzf5c8y6ocu57er6syp0exod34p11uci17672qgb8g396uhcdcoxlbdwn48i8pbtwkcbhw8e66hupp4qtsxugopcpffzabfno2eomaqxkt3q7beqfo8y0gdkw2wsmpodz3law5yho8',
                version: 'dn8u4av34xovjm75gcek',
                parameterGroup: 'z5u0otcl75o8hbmywy3e2rjl3v35o6inmod5ncbv4fnjccf42vqbjt4ky54hz2v4m0szqbwpk0sp5j5as2pwt1sr4apn6p51nm2znhaohjca2gjbn1b6psqft9mhv9lz17xkomx88ux4virchghuejsynalelttc8djgkzuonx6rowq7n7gi1g960qjzzf810sep5tk20q7inzfhg1yasibivccoae41ep915ra9gnzzf6u937c7w0vjq0sqkly',
                name: 'k7ocbyqulxxc0rvzudtfcylw9vsej3d78rbyznplbacggwaymr1yn1xnq82z648n8fotdjxk9bpz12fgt3srnn7sxhryd4amsiebyfrb68fjubcymi5f6751m3lhund4ixjr0149dnxrwo2zuy640ydo1kdvipdun4a5qtscizmukasm8eaxxr8556xjc0beupfps57374dkcf5pfnc7cg827nekdimte6muxrusrcn3ywu9ugq5709yo0r2s631jwl67oggz34kh94hg0a6epq19ifq1vuh4439ji05ubga4dfplnbytqm6zohjaq7j',
                parameterName: 'cyc99mz0owcd8jmdn8hnw5ikcuzgg9khu4k6vq36fvj6dv7szwzbes5p66hw5unznq21e9par3ec77kf7y9gw269eyc495xd5t1sg7ovrcs5f0qg1vwzhtqbgq1oxxunakgn98hrqbikzx1yzhixp5mxuvedy4i4hcmg4cmspzdkf1q7fvcjud6tttcvow2pwbmvnc9cl57djiumzfxrsopdg0q5m18fp4svqwi2wsqq691cnxydt5dxpggzmdv3t6aek3nyfhqrtbbz8tstff4us9hnyv3wcumz887v5xectdxbp8f9kscch9wfpgcp',
                parameterValue: '4pqg0yej0rad2jhy69r71em798gjeieq0gnykk0xv0nhedopqu7bredg3o5yi8k6aigmhgsyphf692ltxim3yhhbuyxwd4w7ply4kdcsn2tpz7li9kv0cls63x9hgolnhk03xykja1m1xbxsy7ibo8sun01fe2alvswprjm8jjns8zxq8hk1mg946hkzsv0mpuavobmgv2vna8bv8n7yyja2igjl9y6t7mggj0pgmj5mxq1c5qye0p61hfokqc0wz2d9av7dnn4jkqcj7kmid34hd8lqeadttv8qd761wxizaulzjlf933c29nh4j3heyqe79q0flum74yv1nkq0wun9jn8qw3glnbry6gjtrh5fxok5dl068q2ut28dxb105vetnb5ajez1m0nd2epd2k856ds41rokqmytj62ohwxydcb2kcbs0zdpm3d5p6uiqr9wqc1g4tien02lzdinnmsuw3b5js6rryw5y8xo5qu07f9i8mwtx96dw6doe894rkyw0u0pigb3d0l90o997515gwcbv3mjalvc805peptr8vdjuf2nd1dbxs97txt3a576z53l28giq8jvvp8cmhh44mydhz1qg8z3spsqgl3866hngosxgdrm5wf16s6j0be65o2hjw5qgidj0wfcsh4z9paqrv55r4vesuvpdiiqn2vbylxcimwpu2qkrubei4gst13yssy0pzmcdm3enapzrcpj0nkqjgyprrdyzfkcurgo1w0x8ei886ymvmj0w9sg9fle83au6lvgis5ef1psfl7smil8nkkgwketkg9k7coythl5my34pyt7r2rk8dlikl7nez4er6qj7uh3h7rxeynv23ia35fqkplzk3q2re9b6m23hy4si4znivi6d1vd6w03jo5521pfh1z823vwp5sh9b7wa58yttsknxdicbm0p3w6g6h8vhv2dtm7a4s2ui2i770b503qk0dga9oizpqz974nj4178m6mvaesu60nnwipmg1l14dr6px7',
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
                id: 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c',
                tenantId: 'a203ddf0-7444-4946-be41-956f42c795fe',
                tenantCode: 'wnhedup3uqz1zaatz32kz20vvhlvsqt78ev2tpyspwwg7vegix',
                systemId: 'f3bf36a6-3084-4e88-b932-dca3bcf3ad97',
                systemName: 'n51svp4syl3gd0bgnc1q',
                channelId: 'd544dd36-987e-4558-9696-fadb54dabb33',
                channelParty: 'txprypbasjnfllac2wfydm1e3gq7djixdvam3p3p1uhcvwdb2fc0hat0kdebtlqnc9qevm5u0gomgi4p3wnyij7yjom3u8z7tzbjo5dmgulmta97lf20nc0us3faft3b38gs96yis37c9z7tsrxshvxf4aw5u251',
                channelComponent: '7duicj2jwzyjjdvfe8crqldnfpi6pq3r9650gljz8woi3tdv32fk9415n7dshbhxdcznod3b29fg3kq6zn96omqe4z1x68e5gti8h9m025mnbiwo14sw2oe9oqiqzmwvchxp8i1bpkap8ge5i2egc5xqxxtxlc3k',
                channelName: '63ax3rtab0rnrzjnr5hsvp00ezup86h2ifnadar5q3153r9j59qfaq4elx59en1ysvrs2x3astapdu92s3wb2ob8oolblpn2jpotoe9nhu0vklgmhxu9n4tx44op3jbt82hul8ekwc1r3qwgh0287esxlc61icfi',
                flowId: 'f2b49f33-e8c0-4475-ac7b-ac53454b523b',
                flowParty: 'pw62my9v2zcpx7wq1dl1i3tv1w44ji52hy1ian2ejd9k8j0bnclyghxtalwcag8lu0gw0b7iejscc6kncqimpqzakfgv6m5dxa24jiqy3slycpl8y5snnc272x5f4t25kee3a8admd5f90hzv7lm6ta9mrrw9m3a',
                flowComponent: 'ocuh1gcb1pqkh1bw2dbr0w79d9b370tkpvkt5grms92ljcxh6unhg3m317fsv710t6ldkblvvsa1e4gf28nqbxpxkckc5bqe6ipnlkgzz09761z0yzqihtk42evm4fl6sm0ehvf0pir0mlknb5dtptta2spkdpk3',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'c8yhi6mn3wbz2mdlsiwp62fxvrh97oa608wacgydq3z0ew1xq7gofxfo647j66ek996vvekxvjw0r80aocgph9ib1yxgu4nov8do18q0etd02uuvxlcopgs17mn9v6u8ux55bgpnnlky326in0s2d4kfvrflw130',
                version: '2jcpndpvts71fykbe5on',
                parameterGroup: 'g1439l78cukv4wc68j0p2zi560kolnao0jclapy9fz0hw6ijvqphx42c6jep1ua93rt6humpn7yj3a4ske7luwttkhtf3d6fv7ccwbhcbnjn29ts86pa1hbtnmwwi412490mc4gvj6wtldzzqvf89mqrmfd5n24rgyv6lh7ewpvcm8z0m7o0gzv3hvp1kjbii8zprsmyiulfz550l0l60agepr5ecbyv2mr3zxbgbf2r826xot6qsm1iwzzgocp',
                name: 'dev07q5yioplmey4bxjufqy17x649bjsnrttjmjzeh8k9lntpzlg7frpp3udwyms2y6uaqw4z0ok34ukzv617j0dexsqe9ktirzshk4lpos50l6yxbikddgdz60xalv9dm7bdc5yf6wurka7w3umygqbc6ephrawq7hk17y7hvvmnydkdjveab3g6x6v76virvxq5upag6vzggm5w9yajf5iivnrrn090e3pghai28sn5snxij1ns7r8j08cpr9atklfafqv4fo21dofb2l5sjack4qct18zb3ay5bxyg8suoh6fdkqe06stf2szxsvj',
                parameterName: 'midvea9a9jzbyblfxksmkvr48jptr6whn6typ38qdqr31zac1ed66jygd8t2g4opakhun1d22745s5cecmr42m32vqyuu1o9hejht4q0th5xzgfq3l2i3r97dly9yafs9xb31sh0lxxu2wpa2rdy4g1ukx4yyclu0kijmspglxqcldp33l5af82mjia3gqmxggz936e32i50eg7mcsebsaifao08h551fjtid5anhha77519qfuuzgniplzwyxwqoge6vfkan3n9pkl2pjdc4fnzzmx7a00as41mbyj8efn3vpab6ne6i6qa7osjb890',
                parameterValue: 'qqnal7xf96sjardkq3cz9nesq6k7f5w4j2dt050ejdy160elg1m9obh7in5e2mfwc8xd17nnfafg4cban4edv794yljrfcbd4csp8sfj5b0xz252bsdmsjf9eokynbc5hng6ocdhoui7vpdkile49yp2ucj1vggfw2ghgsbhxnh193xsf93d2105acqwl7g7wli825tualr6gawo29f7g9ekwqranls36rdm4ekb8jg8ezwhxntbwb923rjpe2apts6fs29lfoxn2kay96f95omzwczmxlwjxiohx1avi3akbhj2q6dri666if59t10hwkf13egw9jsspbvb53b3bepohssrpcdq9ebqndij77d2zl8ydu3gthqft36ocvuf7zt6rnj13r6ppzdbmfp4e1ekloo3yqvj26bj82mbzsa0h0nrvhcvpfz9tfal5xlezfczrog19l4h211sd7grdyfp728erqkv9dpmm64zyp6a1mpdb7eqv4ckdu04qklupr6wsnmohewd2wy3pg3aoc4sii0yyomtq90u2bpz1bz5mytnj9yqrjcrw9i35pfm1i9chz02fg7dndu2t95qnvyg86z8kftxm11ydoh4migq4wy1kifdu1ry98s77s5gc63dmhrbz6wap4vtcww6zt3k9obygjpzo3racoudjahcmtxsbfe7472mycsoafhtwaboqkuw9rjd9ryosa8c2jeqypwfkh05v0w8es5ivhdbl42xaklau0zg3dq5jf6rncfoygdzvqygrhoolc92nyw9si6zg1rtvlz3yojdovyje1gncasjmbi4m75ixv8n9fh184i4spfn52ta8loeuavmemfp63xs1lprqijefmpuae1c6jycc0g52o2nfx58kyuegfaiigrm4n01bqdlqr754xb81qfbafk4toxumkurg6uea1d56i7bzdp2v3cumrz4avu9afb9nqkhuwa9g1479trbn364ydhkg5mjv4mmy5zkjy9vx0rquhlysu9l',
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
                id: 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c',
                tenantId: 'a203ddf0-7444-4946-be41-956f42c795fe',
                tenantCode: 'mxmqp692y8waq8x7teuqy9a4cepwn0bva0ac67f1gattphv2o4',
                systemId: 'f3bf36a6-3084-4e88-b932-dca3bcf3ad97',
                systemName: 'pewd23n7ywm7yz9q9mwz',
                channelId: 'd544dd36-987e-4558-9696-fadb54dabb33',
                channelParty: 'bp7o09sianwvsvw923j6kqvrtw8uocroz5ml0irekbrmjcnna4pxxe3ywcr8b4v2bk0a16d12xze6x05d6fu3ol1hwapbmp3bmhpbkirrs6kl4fldpk9crfziymz098ruo99zhnailn7hxx0hajnl7pucrpqxulr',
                channelComponent: 'to26pk7x5gxsbxjfe8o6d0jrac2jsbe8qbs7gnv7k7jzeu3zrtxybs2g302fn6jl3spokfsdslol90blobe9vnqbxnc6m4ewrswxgh23jjls9ant4gt9ar3llgzrbvc1q8iy514f55lybnluqknkgzfq6qmwdehb',
                channelName: '7s1pdkuba7jq55t6u7qsl22bhqeu6d6srkydugapokiozucmya20fusfnoub12ie9gp83wnssu6o980ki9lt51xwv82ko96n6osc4v2qp0kekjhu0cbxbrhpfnq8tk5focyvohzm82li7f8q816bbg7nlcwtscr3',
                flowId: 'f2b49f33-e8c0-4475-ac7b-ac53454b523b',
                flowParty: 'g6s6juyeeq3qfvf4tczxht18rf5pb8w1e2fzc22feciopkdg6kurjfqtnrdmhzvhtnpxlgtjulijevegc4pseh5ohitu892m0rlsaf75o5qbvbbwhiiadup7zi7w6uvzx7k1ndckeg54wt7h2zc8coh4cs3q6dwc',
                flowComponent: 'u0c9edpgvso833gkopd23v4wsjsy2kk9m17vnly41rclj4yatue4sl2ju0h70o4np2fcz9l94w7hsjmgvef9ymf97dlx4irpn80h9si7ts3bcdma4trtz5vp6dhussqh94224zs1x6sr8o0lg77iuhdh9xg3o0p0',
                
                flowInterfaceNamespace: 'l3ucpp71jyh73pilg3rlwii0m9tua721pa0v2l69sabzksuanjlvxyu8mahraww728s1cnejngz0zrm4qnlfn1rbhks55qvirgnd3q1q9itrvxa63twp99p6bjwtiw4v4lwm0izygszy4rd23qqdshoggngfmk5f',
                version: '3i0fav2ebjy5skanjnlb',
                parameterGroup: 'wiak2a0oonido8dkwlgyrob8b5eeyh0d7dtbycljdmizoaiihqzjayhyoasvq1jbsmlh2mg59pnxrlsj8mlzhdqpqhg3tgxsn7yhgl7zb8ysuwhg3rhgphmypiarlz8r3qnxq0wsluzqbm5f47px8rc9to2mumecg0f0azx20wtjqogkwzbleiu3101zc3td7scn8fcquec0ls10jy4yz7yhvr1bp6ecr2xoz6oy7y21nkbyaxsr0zzjcdt967v',
                name: 'tltclb2sqbxo85symi9wx2gb4bfj8ryemijxw6hxdhr4y759g71wj0pl0l5ex1ul6x5jbm5qd6aaea4umul3pjiqleb7qurt4mm5wpwvzt78t21akuiuyxwzabj9ekb05vcf0xcpeif4a3z9viwwn8frl1718bgeuu92k9drtsoz4h4d387kja78mqvvsnv6cu8bal6oozf5ukq5kxzrtd2b4qynwd3leldexgsuq6ptpw25dne8ezu3pexbby52fo79l96bw2vccqg4hl4zyvtabeym00x0f1qohy1b786q2lo195dntsqrsqvyksy0',
                parameterName: 'hib1ax3d07yozesrr6qy8ka0tjlmikt2epekizlkoes1c96ec8abqc3gt2xp2vauf3b9x1tyypgxonsh0ch2nsdi9x09ljchrbmv9z9f15irmphhzwy8urnocduukfb7609u4irokor1zi69miqsgj9sjb90p59lrrvap96fyjtiwlz3eeudi685ca38mu7oyf6gxuftgzqb19uqe48h27szopa3gxatq0kzg4mzs4ey5jtw37mge4gwbb9zjoi67ftopjcijnpadmc7pzwqe3xcj0qgssa68cx5rv3w0itbqrkz6a4zv559hgshe0to',
                parameterValue: 'ganlk2ia838c96cvt6x85eu9i5qamvouwmkcqjbswsdzi9deck7l1o9qwn2dquvpxshb1zfg7owpq649r6cyqpuu2jg0vxf20seykj1yqp2bfh1dwcojye6kx927vu6bsy9pxyjesypuyd1ew4h2p4tc3k2dmev6g3fz9i7k40ys3zgp3lof65hll2h6yo70jalh49e20cmkvbsibecfkdl62rqboiy7axyqg10inv5qpwcs6ewwli5szlz6wf47vbfcb0z15u9moaqsp6gg5apecv7pfp997xnxpy4kyu4xf9xqriqnysukb92fu8a5al0ibnamp6haogesxgx99mjadz2kne1s7azubmfseclc5hd3tfmxrl4l457c3giofocfopy4ol88fmi69gg04x0m8nv8n9cj80orlrob8udxjokcqax3w6gip97fhj2w0ae5xydqx9zfssbcw9uulbbyetn4kdjd1fea4blmsmadglxski9wcq7b31mvnxd1cmvg1kql27gb6zo46r5kwl8fiufvx1topzx1cl15ovd3mdm82rl9bebxp7vllzovpnbzu6cz6gzcwsqxjn7h42apd1t4ghaz3wmiok077mm8vagw08o6aritcxno9fu6tuka0n9g336e8v99mo7w8fczkxlv10ujbdracib6jcx5qdij32htbbphg2umdg2dt9cbhfaqmcd58vgaxd5soorqw85j8blx1h3jtim6ajn2j8s30q7fxfkf7n3pv6d9xwtl4vmhq2jmrsi5glzam1a7ptujk5yd5s28chr5hbpz17qg2porb7mepvjwav17gca0lovulrt3xaepf72vg83g4m13viceen9529jdl418zbz22adz9s1c10jbne93jrh8zof3ldtmkujey4gvkpr4k052bcz68iek6rn72k9yfvk3lh1d6qu7giyba0jd53szi43vztn7nrqlob8pl8dakiec6ek6fq6e3skqastk8mgpk8qyylx7878lnagh',
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
                id: 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c',
                tenantId: 'a203ddf0-7444-4946-be41-956f42c795fe',
                tenantCode: 'mx89tgdxf6e1nkr1v4215th5x8c9tjyqekmkv9ryfx399yi8q0',
                systemId: 'f3bf36a6-3084-4e88-b932-dca3bcf3ad97',
                systemName: 'ibq6t63f6qtj0zw0xv3f',
                channelId: 'd544dd36-987e-4558-9696-fadb54dabb33',
                channelParty: 'v4sfs4p48mxxdfz1qn1hc67qy2x1hs8hsr7c7jtkb6e8x5ho9mqnp1zohjbwgeild65or9psfzce1v6yraykpcil5n98loxyue8y0yucxjl8strw71v7dde3bya4kdqy68yqz0f6px0nblvpgdfajni1hxyelr2f',
                channelComponent: 'w3032pb5ky2186vn3kg7qcylgkw35orjtzt3iw1zbad6xcigkaow4w6c6ge13v6tx7ilfiviv35zugch803i95amswqziu9twlnz1ipnza4cp5i5rn41h6w5xgd5scojmouvxr7hrzxxrps6lgajunsxnx8zreur',
                channelName: 'wugm8222xj4mn26dp2ewsr8e4tatwqkooshfkv2az78u0n2coly2r9bynt3u63vgmbltisomzdb6t2sc6jq2u9cugjgmwjel1if3asezrvsh3wc7svi4jrxqf9198z9tm7d5h8t9xpy4uv23yf4ed5ckupeghy8x',
                flowId: 'f2b49f33-e8c0-4475-ac7b-ac53454b523b',
                flowParty: 'i0kefsym50ardan7802r9u6fow2z60fd3pr9nhn7jfaq7pw62iggoh1zyx3k3uvc3011id2p6rdpmmabl8kuuftx9dejis8a6ghk5a5tcbz2chb1rmg27p3i276pzaor2f342gbrhf4oq04pa2i8eh3dh874rakb',
                flowComponent: 'i8oet9ol27vqkt61j18r4lfhga0co58fpf6ek2mlsaci9fqnh5u4wbw1yzog27wv2llxtkre5iwby2g97h2rsmvz6zd0tsc4ob0n9dqk1cteeyc4fxj5akhtyhjvcu6ew7aibp8nqkwm0zruv24wfq3n31c629nx',
                flowInterfaceName: 'fdxwoyse62w6nwwava168gpd0fbrx9wk1bl2owu5rxvkwsv8knt9qb9kgm9hctt6oojiorsvw19p5zrs5wuqimzi2ijf6c9g1jjpgemlrmlqobzjk0yqsz1f58kd1g4k5gcoaijsc4rtjjoxd7wyupgg5rvb65l4',
                flowInterfaceNamespace: null,
                version: 'w8dpl7ymml2h4t6k0pby',
                parameterGroup: 'u6sbbe07ef4m5af2p374qolrzxx3p6t6i7lewj355fjflcd956zypgymkbckrrucdpigokbopvedd7r3chhaigahnrq80u9iwodn0t873g9r5tijqonjxx2p87hiil3yjp74zxt96doal0wzd4ymjc13xy65a8hjuim5fgvjet6j8jxsemu4hbq3i72hatp30ngozrdcaoa04vyhy6v35abciuhlnfic4sk6f4w7exj5ai41buxl0zpbkt7efh9',
                name: 'kubtq8eulrldnzln0s2ogo5j1r1w1kexa4f03m2plttjlq5xgh4dxlnfc3j2c4c5q8354poehw3tt74o3zlmudp7nv9dx4r8a1cgr8ehrdyi0xp49d1dtm2n685jv3vhi81ehmp65ukzr6o6vchexjmnh65ifpmmwq4dk27yj3wqsco5lz77fagjv6ntdfvre49gwjgvxzb8oaxd7ftcv5yqpfsan0tbvre07n5ukkcbruk98nfcrt257cjm3urdxr67s1r3myip9lsh9ns6288ocj3iumvxqgbcl2yyf04mc8clr7cedztsjyz52skq',
                parameterName: '7b51rxrza3fx8xurahqf3rvd0xtam8yos8tuznypi0lfyirdne2oi4wpmox6n30953ck3dgevre2355fp3q4jzzr2zb8jhu0qx0cbxd927g2mpqjhbjpoxrt2z0yuirdm2apoebefasbfdj4at0byl7czwkp9tuorjdi232lm9btwrbcxxslk90fcxvjrj9140m3ijr8zencqxrfqevu422kxrxuhcr9rtm9igbnf2on8wkbsvdjurmaikiat4q14oo26hik06vpviq1r7e2uiyydiufpha4wdbcp9j83pm7ppfgeccnh5lojo827jw5',
                parameterValue: 'i5v0dbjdmdvukfim2s51o8umj4eyokdqgliwf2hglu8tr54e3cmd952x8qoe84r4za5n9ljn20s8y6rttajsnewlj76j45fzm90t1d1k2cnvi8vw4c7e953fsk8yr90arwrfx8twfa5knwlhn9uht3oitwfqp4r5o46oy1i7kavqwmxoc8r6ujmm2kqvff9jyqn4impkkdyiqduf6e3vhuedeobwj6syxubsjotsw66ly9b6mu6uql4y2cpxnysrd0yuaslkzr7jii9jbobds41aozx1cs9pah0j0fdbvvojxatbhjwe3mrneo7b9921wztbbv423to7kbvucbvscaliuqneaf5q784d6qfwmp3x8pwfdlsfrw9m05tu0d0dkmqso9n5y6p0ce9ytwdt4cszvfnnp7gygnfn42azn999eewx8a7w1cr2u0aj87tkuxtxc5yd3qxufa8sv043lazxt6c5nivi9tbulwc9mwsidbk5894ev72grqdg7a7iad855c5yob6g3cf6cyqd3z79j0jcfl7l9yd9naj9t93yxbabxd19escuozx3ipzf85a1nnh7xzjmejwhbhcdw0ycjp26r8lvorhdgkdyj26yzyltfzts8e61461v9z5gzs7zrz9ixz97f37fk9kl8n1uge7gg88wwnzavwr4i7rz1v7yi5z2vbf0zbuh0dfa52au2dz8c7n3j209wj632n63tfe2u3kuywkkp64hkjj6otjcnwfdbrkhs0ewnnpfra8srj76vvr3hv9pi1sps07x43yl2f8c0dgb07lpghrtgtou0t9cz101xywa2s8qg7opn27obm9d3xihbkx2vx6f7vbfu8c3vzcnh5zo0djvepazkggujd89yrayja9v4av7qu452p7btit08od27m07gq5aay9ie3mhmjjv8n3cq9ja9f8zur5uf7qgt7lpm7gk8v3rw2a7c6r90sn657w7rbztwfpmr7ifa0hyy6pppryu8q5obaa79fh2xyo2',
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
                id: 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c',
                tenantId: 'a203ddf0-7444-4946-be41-956f42c795fe',
                tenantCode: 'ke0c1r3nrsgeuityxsh6eftt461lke0exe9ehk8vqzinhz9yah',
                systemId: 'f3bf36a6-3084-4e88-b932-dca3bcf3ad97',
                systemName: 'rt12dide403rzgg33kfu',
                channelId: 'd544dd36-987e-4558-9696-fadb54dabb33',
                channelParty: 'mgv978egq76y7d1msqv9wl23yc9tkrbmhid7p2r38wyvdmv8off3x9151x34nt6gq7aitcs0ksq5tcadyeveo95wohh6pcg3ed8cbzde0h61xnu0py6rivbisawk2xyjmgk62mh3ner8yno99ewjw6wlpvy1viah',
                channelComponent: 'hjdp5hbfy1h60vwf7qidyvjjk26kk3hq1ispgaywie2vm48uvay4zqfdqsnxgbdawn6tx857dzqijbtuxb6nj38bvdfr4rre0ke6kqqe33jswwpsyutyy5an2ihzn9bm67lz6m4fb1cmjlf0ch4s1zxrisisha0n',
                channelName: 'cbmqr2p5w9koz606yh5s56nvwglcgapm17lkfc7l0g9aij5i9bs1301aqulbzby57puaplxl5cy8a99capo292ewjn464o51vscenfrvfoa0q2dsco0c2h1sb70wsjikt376rwjcsdb55h7n9szalkdwnrypcg2z',
                flowId: 'f2b49f33-e8c0-4475-ac7b-ac53454b523b',
                flowParty: 'ulkrkvq8vguztwfak9a0dwoju10qx7nxqmcvn6qavvqae5ycvdbm2twph4x4jcve0pdbppvnefubdn6cdp5augyjr863e41avksbrngtiy8rmvfc3zy85a7171hzoovwvnxq649m1cbkm2oa572gm2xr43hv84xn',
                flowComponent: 'cx4i2240ubhaziv9jt3ih7za3i3bzclnknwvxm6o3hnul16eseuvtc9b0v80ep3yt6yvdh92q5jrx94ca47kc6n8w2s57j0x7uw2ut57x10gbaxe5qxt2qfm0xjeejavfs8b6rp5m3f7jd64ialkddrsakm5clzi',
                flowInterfaceName: 'o8az14atv2f8zmzkbo9a8hblsylpl1ymx1ko2wsiba4im7w3dw61a8iiiec5iyabar2utp3tcs0pu4npwfbzt984tz04au459if7ftgaebrlvlq8ycphyf4hf0k4pkow6bvv90cwo8e93tmg4b4erm2nw53kus2x',
                
                version: 'r68dcev4pop4r4c2y38n',
                parameterGroup: '79syjw55uh3fmfqhdefi5jr9m8oek0idn8p2t0cwmw9tbt4pkzfpussawzzzta4n7zp60hqwy15itt5s3vm4iy8etdrvkq2zxfbnjqbdadjf547qhuop5xtcbvstrwijywfh5uyb7xgq0s0bi20ualvout8664xvb1wr26n78e4nljzgzhi5yvrlrd6rnb83jtr6uvzf34fuwxyli877zo8ft384pa58c4xwvee9l38b8wc8q4bxlvdd2o3cbo2',
                name: '4sik0wll6vilxa0amzqe86ulsi83yp92cr3feuu5e0sdggdmcn37ke2avpf8v3iu9vqwrto6kdeiio9ajf71lzl3wszdck8r72k3djlrjv0bb8413eh7isxq1jgbbufscal4ciny3ay0frf4qr1wx85m0xi6rzeuhlvjhrtbsdgejigxnlafm6pv2cwok327633qdj2cyfzw9e2hj9t5pd2e4rezrh0pxwfia84s9r9t0z5gm1aggn7o0m0diko0ckhxklyglcl41p4nz4wqs8hp9abnv65f8plxl8o4qa2zl6uhieuu7ob424r84ut8',
                parameterName: '4dcaaideb8s9vhynxwauy5uxb53cvv3njbz0n2gxkupdw0ha6lk48b3ezb8o4xv6h6zbsw002yybf2k6h4ntm645ll5gdsiewmxcvwtdic9rbe1qun5stpn89s96agqeaj4g6zsw6iip1lpuyfs2s6eprftzdi8xs7z4wgtq1emuqffls0agzs1mhd3kzwa6lwc58me422hb2lc5ij52k0rsl9m8qejkia7bnzeq2gayhz4z52bzcd1uvzp7xau9mhkpu8x16iyf787qv1c00axafzq9g5ie9cp9xb274sluehath75q0t3nuqxnzm73',
                parameterValue: 'xbdb7q7geh6prbzimorjbcgwblh3zlppb3bbvcq03eklpyyjdaogvmkpj4kqhukxtavpst26foj8jnpbeordtwelj11gl9n91mjszw4tfb9n0wh3u836ukq9uv3euboa1eaao3kfkbqzjmvngbc6avmoorwwi5kj0e3qvybs0h73s4q6zigsv73wvx3wgjyywp13o21ctj6mlaqgkv4y1mixiojvy4f1v1dfkgqltsgfu84e45fk73rfnk8ic5k6yp9kd94ujog23lkpayqqugnk72mhsqmi7e4hc1gfdevxoih6qikmxy3trers6y715lfxcnvgndsznejvwkn3d01zrd7degbumcvqq1k1b3m1yyppjx6g755tuhu5v89q9cww5ymvs8oij3no9q8buzei84xmfftw3nb0zfmi1e11p305ibl8419e1po78cxgqpj45y403wzo0o9git9xulptjc00hl72z9uvrpitut1roqb5trzwxg10p6qqkjzrrmb0gxc0wuq2vhsnv8a1kzl0ta4i7emrg92996l0yg1ymxid2vpq5f2adt7jwus7lpdpnx5demr0xi6ep4kn34200oij6cg16mptegzapwofu3q18kvffjuqyb12ffsop7okigl6ygvyjocupxd2lypvpleugmjpntcbnpcvlgdy8yopyjn6a4o7ah9lwr5hj8tlkk45mnguov7ud1td9oxg26wui1i813vlvydp3b8rbp2oqzce31tv6mgrkg9pf5ptpbb0ep4735vu9ibn0xht3b2iv2n85lxrpudoxg7z0njg7momji74ghrug3hiu424twgu8erlm9rf010x2whxjxk11aryxz5ahhgp8tboztzbhry4nogru1zuklsofby6csqiwp8y5i81qf0qunapmzqg6uaeaph2vwh7ig14k4rnp3ran8gmcxe97jqb3c67b8udz7nbk18zq748ks18d1e698cz8p1xpxtyo5lf0jgaaedi0aixspkmgjj8',
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
                id: 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c',
                tenantId: 'a203ddf0-7444-4946-be41-956f42c795fe',
                tenantCode: 'eubg00ogs8urom7zj766bt5s3xjworijydim5y7v3oj96kb36h',
                systemId: 'f3bf36a6-3084-4e88-b932-dca3bcf3ad97',
                systemName: 'qmnum2aaf7xxq9uq7q5j',
                channelId: 'd544dd36-987e-4558-9696-fadb54dabb33',
                channelParty: 'hcech933mpzz4kd7u05jobx2xmup119xcq3mm0uks0a3rtqgoh1mqzgovbxjyvz5kvfrp0sjk3oy2bbgevfvytggousdvr3o6o9vnv2903vxfrt10mplzuu56kaey7yn3ujbug4c6nrga1a75iazoo5j5b9lcns9',
                channelComponent: '9tjt3r4j0niso1ny5mgjuyubibnmq5ary9opjivzeilh1uuvscbcacg3epjje5syho6qq7y98jfpsg6447fsqmr8i1s5nwjxzh8fwpxostljyk6tm96lzp91isj3d4zc08o4xsljzrl4rhyh5vmn7t1u42yt09ht',
                channelName: '4h39o1xvl6y6tk02edp5ytlx02i79nw8my919c504bo4p1gb5vvlumc7d82ibrlinbxx57anb7rdzjjijmlnl7789iiygwsiqv4sk7u0e6s442xs3i1ecf79ot7fytsuoqgnvhhlwtnjyyk3sloqninogvzolvu2',
                flowId: 'f2b49f33-e8c0-4475-ac7b-ac53454b523b',
                flowParty: 'b8ml6g6dqi3hivvmhozu1r6rwshny4r03eruve3coams81hovgs88l2az9g7wttbu5vg0ka7hmbzsjjrg1hh5a60o66l1mxy3vzuvi43ikfy84e7z1k6o9nyt416d7rb8mt2jxow1klekv47351anv5h61xrvzo3',
                flowComponent: 'bugxl7wq46o2bg34duodyajx3unrdxoho7qj2ra44naizarp4alerhez3b4lqz4pwo6nwcjhfbpnttg3g6ny4e9x74hf1rurhayhegwmdbyuvz0ohocc8jouoy5yytjkqnlb9w8x07wjr2jtqtamug8xiw7wishi',
                flowInterfaceName: 'c6uifxmdllkfcfzfuvddgafh6hu0z9f1zr3x71d7dst6j6f4ccg6l46mcguiiacrgdkhzmsym2l7548da205vuo1027j6in4skkrl5xbotuifqv4rwn1ap9j9ac1fi1kb72jz1ywn1bc2pgkyukcmzrofm74ca50',
                flowInterfaceNamespace: 'bar1hqhm5c73xd2gkjddzv78wn2jbb8ru69fvqt0hl6axfu932wpg541wt4vxl2t6jyukeamt3910s7bx9o5s31tew9fe0en929unjmw7ze0z23vyy7x038t41wlcahdft7nfjlzialiuzvz50uftjv0rxw9n2m2',
                version: null,
                parameterGroup: '4knbxubua9ad75vr9deqi0zp7ev8lp0i4iwk98y8ke3bltviqywvgfm1t5qm6x8yd4o8m0ziwlcb8oqmoflymyzjyp85a094iunmlg8ul1t9lvr4v8irla7278k79oxf4h7gf6zrk4lmhpndjt7srkdp80p2akylh3igy6xd005cycs02d1dyzq5p83djkbvidxz3pe2zprpm44z04p32u8xrxmj418lrur8rpnwi024izvqs3jmu2bz78jvsf0',
                name: 'ejqp3dbec4idte02z6uuhoxem950rxr1rypx5ysyaqfoyzz11nq5nueclv0qgzy1ap3la0axxecno4uffssfc1m5l2wyxa9vwb1kw5bruhg2476p00hzhaw6fx4a9m3k83cp68wf0jdi56kadxp9pwnrt9kpa273tnq8t4w2b0uz3luafuokxorzm5u8n0r037p5mzhqocow9g48ia61l60lkt268biursdec7yug95ur20v63kytot8cwxupe4o0grerj6374w7feq872n8k21kw9wp7fa8ulhjqos5egowkez8yytyf1xlt0a2oqhh',
                parameterName: 'ram1jlba4832oof98qlw67wf8h8geg18krtkpvlvhrb5tmqrx84m515demvih8zwut96kgafddi92dnzxyadtiayw200yw55npc90so62gnhurycoomcme04uh7g7a44f74rc0ve1ijifwxmqm86bglegimkvxz6g9hm2mszw855dvw5p0ixkl3es749zh3a13gzcreqqgke0rxxufupea85sq5f40rve4mnv43dnimypmmdnf7qp86zl4cdy3o32tfxh7kdatur0prfd3i1iy0asd8jj5eg1p0iu4ud65zodm8qmb5ul9jivbitcvyk',
                parameterValue: 'wrvbe9t3mo909bqcytgd60k48cseym7ob1bk4j1e2i08e3zi7rcnigvswpf486tgftcb28o6xdt6yawgb3oqhwqjbw8nz9x2jr6qyx19swdukjyaca9qg6zlu6tbkf9m1c0bu7r1dvlado2xhywx9uxgkbdassdixg9dypf90pgfsyfs2034jy05ribq8bf5r7w0dmiofbvrfs0cs9au424whtchey6tu3tas9cionfp9hwn888raxavkw11pf3xe6su83eu7jq05n0ihsm2k6g60swoohkwtqxofa4fdvgov6uanlmkq8n7hjhiax1s0o90tszaigt9fgbbg7lgtvzo69bwjyruz8p6g1p0ymbxm6opxk5fugdfj28thfgby6yg10dbh6k6ezzbt48tu732z3x5fd41yzz9mvk8akczh3bztmx11dzl4e82qq0hi1bgmq24lube4vs46u72jallhzajxfxgku46ekeu0ooou8my7a68z9hychk39kasfnqch6mxalzqlcmhnwcyyl4vtxok0ic99a9gna3bv0is7kcqi00ey97zrb31f68wavoshshmu701or6y8uu7wzk0tni78td7c1sy85v9dnrngdgu8nzewh9ehn408truqq9cgsh574dvev0kkz2885jyzjiv1tzqusb9ubuwyy7b85kz69pxabyo1064nu8gd9zlsfmif2uchf0hgb049dwtng19bn4dw0tllflr3excw55jwclkf9q7hqkftmvvqusgu0ojma91gswx0j8gmohtq2ic0pdbyzsei03dph5gjwd66qhfzc8jw32qxm4zmy6ygvbpugu5i47aw93hbm2fh5rc6xb1rtydupzit3q7816mg2r8c3nk0fzd0juxv60hvf3qvd41btqjyrziuv4dl1w88oo15d61yoj4uhw3mxgn232l6xa6wmbjy2jroe7xdbfhr8ieoiic0ytz1j5x7dqczrwp2br3c488iv71hghwmw9vtepwkr4ce1b3',
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
                id: 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c',
                tenantId: 'a203ddf0-7444-4946-be41-956f42c795fe',
                tenantCode: 'q795ew9c94yl1qx660f3edvrh4y84fkxx8nd4h7f4hg5mzdvx3',
                systemId: 'f3bf36a6-3084-4e88-b932-dca3bcf3ad97',
                systemName: 'bknqq3252afrugsrurqe',
                channelId: 'd544dd36-987e-4558-9696-fadb54dabb33',
                channelParty: '7f9hkx4jt92qb0cmr8ceaz0duny3b2lgnnmh74th61op1h1d4ln2nuxfyi1cuwgfyjcxs06wyaqy39wko7o5riezlngpsprnh0asnh0fl1mew2vsz9rf71u1daf03s5r3gzaep5uhvjukmyvvzi9qxc72x9v7bke',
                channelComponent: '94xtnwtb7nblub99e5o85l4gpog6c0iiyykn2q7e7v9v0e7d6f94ou1zhols9ylla2nsxh366owf9pzqb2gwpi4nhejuqmc4cif18yzjhoowq4nh4qvl5u0xkb7fkswlo21p853vd7p3twz9f9e8kqrxcsc2tmgo',
                channelName: 'ygilinpubf7lvd3jljqy8fz5uuycy3lfxmblxlnd2q18lfnys7a5ov4j667jc4jo66lvu89a8j7jmjai4lzabpeq6swu7y61mk4vbyeoci71trmran3vulxugg8r87bu527ek9k3dizr157guhnko5gfp49fl2mj',
                flowId: 'f2b49f33-e8c0-4475-ac7b-ac53454b523b',
                flowParty: 'f5ieyd5earei1xzj3d053yyqbgvc6l0apu96priqijjlf9o5yifnc1kcqdo7cfb8bt0zd8otnct4ymsi96a80u2mc8bf1ei2xpc9bp2qb70gwlvwbdx428u03lb5bgnjtwlgo2mjb82flzh9izs6b2yaih3c0u86',
                flowComponent: 'bn9m7em81znyoycwg8y7t80k9hnfh8oo7voug4oe331ez4xufrwxwahj26mk5ezane0juw02p5p7ok5zndjw3og4pdcaal74r19efsts8nw3ssufz570u8lag2z8fhd184081vog3p11khswq3g0x1898hqffebw',
                flowInterfaceName: 'x9jg8lq5fee6a9obw0eqtwxzgtncr8sbwa20m34pf9md4v4e8ij4zrybzscz47i2mfzirqegt91aqobvt47ekl7l6ejjh5wpt6czx015yugba3j1n87vae4pfvvbh7787yl1jjhs9xrqdgd3be81kwm096e6qlcu',
                flowInterfaceNamespace: '20abl7hkg39u1t3mc30vp0o7ngqf3mpn3jzmm3sbps189w45y5qso36liu7bv629ubtu1g4jsq14jgsfvoabugww5d22gzslbdsdlj3nioodc2r54xdb8gy6mxujakz3qzl92w7t0wdbki2n6byv8k3kd3ghj6ox',
                
                parameterGroup: 'ui40kjldb5rfaqxlfqola1njwlb1nh3eouomjrkkoi0wr8l5ap0j9gu3jndgefsoryp1qgd11h20w62ujyfhv6hppud4japxaj91dcx1cghr90yojvlsv9he3w16qqb59aoqnqh1fpzgnn0kwnqzplbgbjulzipxfpvwkrvts1vhtdfi7mfqjen9bq05kgegqmp83bykcw34rxpfomsq6elw7x5ya7r814gus1h2gg3eg7otvkaxlvf8li9etfy',
                name: '4fmbz2ga9r6o1j7gdyn69ydza6kbo1eoi40khv7dzy94o4dw23d0uhuhb7wh5ul24ubky87qutwpwzp2fa0yrs8ad645d2kc9wwqkc0ojtbs4xmdrpbtbk0ffkuwdeg6jlroa44ur4l6arf2nmu9z496j1a49h4fcj7045tekfog1de7irj2dd73e1lhwum3hwnfvbbsj98wbxaqqpn8wceh4h00yswwsw8c6y4siu3sb4uwr1nsp3vd6b1jlwcplmjpkigx2l3g2164g588wogai2fc0s3jvxsv3bg3oxepxa3s4o6sc5vh71r97m61',
                parameterName: '5jahbmqbfjdtojlycu995bqa90vyxl24n5b2ox51h965n334dte1pso406ap8zt44r1bxysccx62tmlxgrlt7aqf8l76wm0as3xhpzwc42a60i5481icoxhkbnbuigw3tj2d37wyu3o3cbholpyu4m1bqdlq0nz88kdzl6119ifn5lzj0g33tmmsydurxsjdwcxlid9dxgcbjxwt0c83avgrjls2xxrznws0pda5z2aa1rko6yfxdgqrrfzoneqrf7s99xird87fkreu4qiroa5oz56vf08nd31n78h0655dcu94pnshezptj4hykcta',
                parameterValue: '7xuc885ibcly4dpggi3zdocwmtwd1l2fac5hc0q5j50wk6gpk4h8tkxb1rbttl6e2gqkgh84wvozsz8b2e5vk980jshguvtsd9z2t672wk6hvlyalonsknfvqkflxit74elm50jc6wjuq510cmmw58ynavj7ox4h14naeoia14v13jj2frkhq76fs3obi14p344xcicteskak2708s2pur8t2od1r1lk1bme9xspyqxhq06eqdt3o7er24277wio3p71w752amkvqp60zc883ios3mdybcqwmbmx7406d14opgqlohdvlc0f4qmlx18xee8vcf7pielfrymqrt0cpqv2ite3laoh3kw34qymy57dnilx001svgk13okhaav4badlajd8kz77uzofl2snc7hkv3vgeueoqmjb7pnbwssbjocxbpoid35q5icke8t7azf0erhvm58nszzpwty60ryazo8k2iqhivpr3lxp8yx66v4q3jb4xn3kotzulta15iqkmnqvfdfyoi31lkvl54c9p97rcxjts1axaavh7yi882cazj1xrk25u3s5hexnp0dk4cjideeymvoj228dhu0la81a78rahgvjsksm3aer646d4b13m0mbd85zlx7khj6ii5s06gvc0z6ydiix4hw21fee5q3pf59vutdrqbq8j6zcmgab3l3ybbblqc12lism0ani083wii4lhszlb10dcmivtyoy6yxy72uaquyeve8inn5ea5wnxy532gp8d9r5cco5q6wg6u7h6zz8gui5rd4hzn86229ft2fzbfy546uih20m3t6aqvn07mk39dw1iti6va5yckwwg3serfhmhlr6wnkpsm29yyhzwg7eh1yfoyid8tcr6imxvynnpfcvtkgds62lo8yk2dtb2vt5c7rwczkooz8ojoinwgwrb0gievrpruy7aljh5ek2tpim0uxxum52yhhc7onhrl9p2ctoj08fqz1svdugjfu0n9b5rql3rhmw8vjpg7xm',
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
                id: 'in0zup3ftqqycmhkepiseecpg02d7hn4fxv2u',
                tenantId: 'a203ddf0-7444-4946-be41-956f42c795fe',
                tenantCode: 'ms12uzbrjzv485wb7j6m967ogto2gzmrzngq40e8i8kajrln9v',
                systemId: 'f3bf36a6-3084-4e88-b932-dca3bcf3ad97',
                systemName: 'bszcvyy1eac3vfewqznx',
                channelId: 'd544dd36-987e-4558-9696-fadb54dabb33',
                channelParty: 'uoy6j20hmf125ijkr58jtbiujb78ctxuqgj1agrbau7f4xrs7k9pwntoysrzjobzzpyq47hx00sh1oz1y7cbqjqqmh0mcdi6ie5q5qnrda97x2wqwth27kcdwfqig44hle64cqe4n6gmlyx9j68kb1a4396sdqd4',
                channelComponent: '6e73e5unv65vrxzunr58d4mn64mivrd971herhgv5pw6xsdogofy75i3y7o4opwd711ikfwqd84e3lkhnokkk10lu6llzeprds2wt8ghzlbpuin5z9rbvl9lb07dcz3t84vyqdaja6gfqvrqkyg0kyjm025wzx6h',
                channelName: '2wp6s4y7915i94rx6knca3n1t19ywifb8g198oq4vbf3g1z9ioxsrwbmg1cl20kdqbjperzgbjul33ypo529kganwuhou3u6eslckipwrpyxl0p39aov3nuejhf5zebkohngu0wpn3iv85n60he1pewb080yjyzs',
                flowId: 'f2b49f33-e8c0-4475-ac7b-ac53454b523b',
                flowParty: '3nvhzxv8of3bjrjfebq92wjzp6ve00e88cje0qtf9z5zs68foi319qb5w8thxblvirmnltoqmbc0xnbkubz46is5ghe0ofssggjbwkjf0ds05ukajsmvnht4dm4difl67ntlhbff9ajt84tzh4l6wksyq34vr8hv',
                flowComponent: '8k5h7nc9aoretox91wstovqv4nl4npvqtwii59upurqp43c4910ycrurgs4frgriio5xz6bba45woe9wye8acgc688hbf0wfn5ubl2xim9ehqhzangr4dupg1vllk61s4rijgl9vr6nyhx849vtrcunq2r6uhsdz',
                flowInterfaceName: 'w5sr42s0270k2bjj3w0knk3ctbusla45l8xotd0pr446yithffu72cqol9cnem2xemy0wvk5wlztigqze0ov3tc0gk9cqft8onhdsaz0iy6j62yj0pr5ych1drxbvgv50nr0okyc8jfloj377hcznt55l3zato7v',
                flowInterfaceNamespace: 'ecxcu6v2ny1ykxwq22edpwh5torvwyknzet684a23gn75ig43kifa3mo2yo7tk0ls4nnwnt8w174o6noyo9qv36trvkfzd84f51n5cykat0w0jt59ljf9a1sj42jxna6mnmq1sy61nd4xhiimbc3z0xcsezj58nc',
                version: 'izwkjcu4caf3f40034xy',
                parameterGroup: 'i1qzugwp30zm21weeml3j1kijjwmzo1gad0n0812k5vxwl6sbovbyzh0g46r4y9ps6vu39yd2oyq465iu2ejrusy86brq9xaz1vk2o31ntyz1q6go614a5dsyu46co2bu9qwgn75ktf718pvmjdeiosvttgq0ngzjlmvidvstqth01cfeus9fjn9clyc70wjzgeoaywk1pdwakphc9wb5x7o4i9n2vu0fmrok5msnnrc3yckg7oxpjen6sb1dda',
                name: 'zseyiuzdozlnt6s4vsy2iyjk2sd0mcp5bbrcepjqfg08hwxiez2no8qgcer8mtw19mmol17n3i99r0k7zxsv46i0ko3l38gqika8x6ascoq7py30jwlxn5poh0nzlgyeis2qc4ka8bbu67xwcyuwtcwmtuhhe4m86j3nsab0tn4rqj7y36tbfu2l8s5kpkt0zchuhw7i1pnj26j3feru8y3tc3ryc3k8dwkhcncohwhhoomdg0banwixe9hls4xyk1ssbuvzw1qi742qgy32yy6flajyyfqyhzqk1dulu201o7282v9j610sboepldr9',
                parameterName: 'o253yskobsml0dg2jwzngrfmzrl1484bdmsa7ex4un7yldzu6oyc4zekaaay64yw49slo39lj7n0yo44c4g2taamrd1fcbv7pc8482qdtggcjmub88eenf7ancoao4wnljb7xesay3v3bpfglhavoooqx162yikavpk6py1rteha8bxvrz747ziu5nhpf4qdf13x2pwddj2g3saukqa02xru8kdo4ru4kzzmwp63k7qpj1jppzno2agyk6eh1bigy5nxnwjuy7vrzgir2qk6c8e7byy2sqpogut9dca15xh8t58f8987gtlu7zo8iru5',
                parameterValue: '9j82hptw1uce3ci8sylxcas2bwxew92th2ty0j2r88cmkksifva5imni1yc3o612alvak7qstssfc2mh5r6fatb2vc9si30ncbdjuecyxpryc1h7xa7fwi45pkjs73o84w9upqogfhbawrwv32v8jzg6ri8r3aeye1fuhke3gj20fmshu2hv2ofkm5anp6d4j1mt1lnevh4a1v00hlpqnety0q0wq6577ll8nnjn5gcu71aapmkfr6en8sddp1pwb0y3sidjcu1vd17q3ubtfcvzrk7o00p5i4r11uosn8ep3qd8gpkqmnw6w1zgly0zc0tebr1aqjen0vt6ytaqecf437nuv8j9xztpuj4i2x95o3dpjmde6iv8r7b6h7pjxy5y2klxt8mhhtontl2zr9p5lc1vjdypf6w2ohosb4yck9izjj0nvpsteiiuzy5unb7j79rlcvoi36136uno5du7gv0w3dcnsdtr1km00xft2x3w4zvmkx1udwtol84ojyjsg6bvmfq47k9y22pbgq6qddv7enbmbd5sp04i26r6x43xg7egejso0xxm61psgs5s0dchonjx8fyszuascncdlaedz9cbs877oz4qfp9x2mz2kgncodwo9wgpmndeb3609blltlayqnhdutpdfa6cua3wezgyscm0nnaw5bnou8il2x8jl62qv20rblovaq5xqkcaoh4ku2jjtwuvef4rzfqxpupmg1yp7srw8fvqu30y93qoax07ofnbg0inwnwtm2tutmobbio0o0vg6n6rabtjjhw9vbcml0tgptlqf2pkot5ct0xw779x2f654kc0pou3qi2rzzkov53f8hd3asxpegwo7eki5l5onw0n2nprxndwzrk9naj1hzyut0hfmf6cic6uubctbnsb4r0o2uynqigjcnptgraun5mlfsn3efe1ojvlmtec23a3fqb6ym6md0r4sqvsb5tmzmkzrc38mnon0ns3a1imseh29huobx5f72jucdknxyi8',
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
                id: 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c',
                tenantId: '9to7l7h9agg7f19lv2ju3b8ip7mwoqvy5p3x1',
                tenantCode: 'sih26j2k6moxxp4akt2ymrqabc2rwrlsf6em2nyfks9lr5496b',
                systemId: 'f3bf36a6-3084-4e88-b932-dca3bcf3ad97',
                systemName: 'n2u9yevwtyjczga3b0gh',
                channelId: 'd544dd36-987e-4558-9696-fadb54dabb33',
                channelParty: 'nskaa95ldz725yzd9acbfytnxbf8yd78vfnhmnfeqhzhktc8yath8jw859vlay0a29qf6n4yj9xmccdy2jorlw4q5hzw2j8umpdd98zxekblw5qlwrrj3t2tw1xmjbbcsxipgf6eu9eepgn2ycccpd9l27ddk8sy',
                channelComponent: '634m9w8iasxj81mlka0tnct7zy65zfufqmhmp8gl3yadp7i4d57j39qrmfcmj1hp8xcbm1wrp0hfhmuxls444cu32f0mfbiinybd2ijmf0q3evn8eb06j0xgrhi8er1ijead5fdlcl6vkshcu96g7iht0tsivi8a',
                channelName: '3ngrssl95v6as7wooz8szrbrogb4w3th80w5qglyy362mqfvvrlw2hzcy5pif3i32cthx63aq9vef8oh7z7rzg7416b329z89sp4ekny1efxmj8gfkh6sau0g1ezkt6rdak2lpfmoh7tvlechv6xsx7la6n9ihwm',
                flowId: 'f2b49f33-e8c0-4475-ac7b-ac53454b523b',
                flowParty: 'gn79d33oe09282994zh6zst9kjxmzcqa5ja7yhxtc1wbgk9xqymgglad1spntocrjwxckxq18yv9k376ubiu7mmjq9mjn6a9z5uou7taq51xs0og35p5cmuxnqetvypxyncg4esg6teb33pcc6phw5zcsj7deego',
                flowComponent: '6br5og3zn5g10tyk762y87hq9cq746oc5ggbyzgzp7a9iqclrzjahzqfs8vrfqi842i6agi1yke5frkkzn4z2bfu2ip6z07gjm012v4h1y3vwkffwa3g5gf9czm4pno24r0uds2va8qd9ycme2er9edb27pry1bq',
                flowInterfaceName: 'we8jpflckrqibr575pv3nvpzzhjbxdwhum3v2y2y95ezgudjbnylor3figqyn3dkpar63kixsfc3wtol60fiectxzikjwub7wkcwz798vs2crknenoxaisbpzyn5s9iau5l10cnssgw04u6nt5gzvvwir68xpt9k',
                flowInterfaceNamespace: '548e0ndw78ijd6zb1qy3gvgrzb7xppa1rosxazf1gdv26l3vnf68xrg6bw8gbdvfskrjo0syxk3srczlbk7s5apgvepr4wrw74oaiw1f5i1ghl1vp4hxmeg4z1nf4gkei33v0htzyiam519dfz4k7fxztmu0oi2a',
                version: '1kdkdgu0bw4zruhoytso',
                parameterGroup: '72ir33s59bdwcszqst7yn9vkospakp6oi7jhtfd1djqrfaje1zbcz9bv2wbtn25ofgixb3p8trtesljc0ml7vkpbiq7ov1vkpo1krnw8zcm8zo3hi5vv3nvd8v5ewgaijso6dr7hn5b3yfeei93veygeanles3vggf6swxj60c2t5saqg2rp5322n0ejty2hqhcgkhediss4w64g0ebnvhcehxg3rhjn7ij0dyy2j2tasct2t01o9rbiaaffdp8',
                name: 'w05abi0s0myj5eeqex8iz7md815pv3pfxoonvb4ikks4gihlwyyv8m24chxaasxqp3kytuwkr99qa64vjmy7xh8rlktv25skhyqmai8zceulnaa3ak8uos81bd9k4de3humnu3i2y8hkynnei7ezrkrz7im6b78920ymwxi1wyul4djhhi1d6u41ybn3o3pycilltrk0xjfu4zqu6u70id8hn3eqilfamkoei5e9cv2wlvdm7eb3j3iqkcowngbzthpx2ceqewdhjimqdxdf0p7temoztwtec3uctb4n468k2szzvesirnu6g5qd1s9g',
                parameterName: '0pr7g7j29gm436iq9g4dx710y0x06mtrnafxvqn09awb9d6b2h3gttodvppx0nydh55t1ymvcj5g1l4e3pwr8ynjh4g86b1yrrgyuu8hvm1whkscdkai3ka3uvlp34272t1emiuknmvf3pzib4cai1iyibpb1wq1xn1obkg8j5s8c5fblhau26eo9jaymc10fy3by8und1yy5jtn19d2ltv9e7udvvylvbro2449hi87jddxjm2dr641pz66hxf20a84xspt18qs4370en2cxm2kpkt6l7sbwrqp06gbuim4gz6e404whgzvi3e0c4vi',
                parameterValue: 'y941ndz2i1o75d40ifrr3yd01alwirimy7h9s2e2ezfehaqqvxntepcdbv9g87frd0vbjp6kjxhvyu3h4hi56zbzonbi5f19ullyy4gql8srt0l1b32h3qjag0qvi8gyrxef6k903i7ehsarifp3thidfumacc55umy78mykt9nxfog503yd29rwzzj83r0v4jrgiig3hnge03j2audpimm9u68tdq05egpggfte74w8hu1szyo35l6azv49natl97ff2yziw3zez24orfpuflke0ca0nk5ktoxhtwc8vexhw937114i1z6i0iou78tnh6at23ijwntawyo1ys3kets97qge7sj5ps723ti06u9f6culkvjroyisstssp8tg7q1tkqa8d500pfpg5uh4tyn2wb01y2cgllpn7zxqamjjni880zgh4pbvamoh6dnbklen04xw4dgklp16wfu22auq31tor0l1rfm40zhnqx1swhj8zrtrgdj5eu98cagwxdnumgce79zs4n1rsyr9sgh3ug8qtzi59y7tu7gml78xaywrb3754pkwuyb4nvg0gktp76re5meer8f2e763rhl9m7ffgejn0n3yyqqqrhlx9v40iduvvwy2yfzt54urn5k8vzbn1gf3s5xlcqfq1cajcm5iwmnmpvj0kh7g1tkg07ntixm81vvya53nwlkxzyh79n8agfg6w6m6i7cd3wv97nbhl5yytaohaw4m7zd1zzpwe8ampgvkzas965z1v8b5vfxadq9i8bd2ro7wl8k3w9pixgk7d3xa1yfsyx4ge0anmumpbkw69ikpai4ddlvfzhap57drqcpsa4772m9lt9phbivsogr2dj31ugruiuvdzn2dyjwzw4dqg0j3j6it1bc5g5hq6of9ofr3lwashsu5ge2zulgd6c2nj85qc9fv0qnn89dlwb9y7mh5hi1271bseaq4v0nwcnr844bverx9us3a5sy6pfqa3mirr6hrzrnkgdfe51l3euj7',
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
                id: 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c',
                tenantId: 'a203ddf0-7444-4946-be41-956f42c795fe',
                tenantCode: '1yi6cjxa5wvkh0wv8pslh87uij8xsk6f9plazrx6mv5okven7e',
                systemId: 'kcoi55pa16sz0e0km6wzu558bcomvyew7aejt',
                systemName: 'yagimsemoui30tfk7zpr',
                channelId: 'd544dd36-987e-4558-9696-fadb54dabb33',
                channelParty: '6iiywkj0zczsp7cjft1odg390ksgpiayv8sfyf6xlcwrjaxa0kmy6gndti8aotn65kga69fqba24hsrjez7dxufe8ioscpr0fjqw7tbnf9iie3utauo702z06nuvacmimfxcow7daq0abdjhq7om5sn3wge8zrn9',
                channelComponent: 'gcf8y4mp5b6m8bsrq1nwvignzm74jfpg98r9edz9br8wv5tpwtnqay2fyr4si0en5wkxqun0lpnoxcscwqciurpz2zwqu0t1tovx3vy5u2tcdf1gbwgi1j6cp0fwb5g5fuqbzsiw7muivbwxi4dknqcmju6az8h8',
                channelName: 'ilx8j7ikxe96ef6ojzzgknqn5genvo4upsp2f088f03uurtxk409v94t8kkyq71aaetmvbboqh4oo3tyhgtlbqod7u5nllpuqr4u28k2tmdqyvl8ippe284sxki51p1vu6es3uzvoljbua7hbrtic049g0yj9roi',
                flowId: 'f2b49f33-e8c0-4475-ac7b-ac53454b523b',
                flowParty: 'ihau4pf8fzodsjn7ji1rh073k05qs2ridjb34xe4exfzmqxashcf3sxtu8wq91ttufi49q7v7t443lnv15rchh7diwhhb5sgdc0xmgexmb0scy2fr5kwq9sl92hbcu32buyqxiovgg6qd1xqzd5aw81jin1jlhlu',
                flowComponent: '82kro6xbefp6sone4p7nqhrym9qv1y1em8j45h0r9u59hgm8v974l9nyx2srevwf0h9xba5d07cvgeh083ojfzirx5avk3ggc7xb3cfmqt0bqg9php6wpn3k9jc74p1b9n4anxw1e3odpqhorbl2qiefli5f973p',
                flowInterfaceName: 'ndik73bw6g83zgdeo1iqz2ffdchwg7ptff6p8mpolnba3yyo1s72bh8kxx77hs9nn6lbdzz1i5urallbttva8i8z22fkmcioyd3843he40pmjy1d84lzrhx8wcpp9mnmx7y9ucxl4m6i7261zyaqls2a51odb285',
                flowInterfaceNamespace: '1d9nfzxzo0foahvgl5bnqd3la3aqpai0kwdflsxiyvxz0dtnkduwdwkcznyfpizrklrip5trrjudqkyay4se0ctcdoyrjxd9avhxuauw3v678p98s5jau0o3geofeznbgxhowwphni4x3gxc52hi6zrmp3k9m8vr',
                version: 'unextb4cyphx6bt12zmq',
                parameterGroup: 'qs82jdam8ewovou1kchoqhajlcdtciaux9thsyzdnq291azfze3r6wzbm8h1gl7svblobuhxzpd6q8febk3xrefnayfmcscdivtwozzopdaazfpmj70ba156io09wdsim1ucxmnefnibnmpoq0qpzkoylmi5de4esq4r6n49nipqp184xtqmebk68zr6lluzx9jq4e2rla19ut2dw5rnhsykiqsq75afzdwg4al9vdzxiui85yvreju42vlbkkw',
                name: 'ptuqacm2udma9ej9cv51lwn3kjhoimxdgd94823zz84mekaxq2fgt5w24dbafp9wvo56cp0luxz378jn570zunvi5w7o3ogvkl0ixb7nx58vaxquy5ahqe3i2e51wrv1vtwbsta3f2y2kw9n2o2vbtl9d7jwbh3cnur4rjcpqsy4c75bw86457u3vsfp126ko7lrgp5ovol20l0oiqhtbpl9o2djx9tch7eaurz7ktf3uffbkdcmmddp742qbppji0z5iq1jbzd6xpbfpezu4cdxg0loktxmv6hkm4hmfocliawdzitr4zqrzgrwf36m',
                parameterName: 'ncceq4uqp3qfcpt2jfub6nx5y0yintazpxfwqjtamo9uhgwuplp4owygqc1u6rixlch84dk2755vgaoj2iigyhj28o6uvnt5wbi6fh3sm5ep17tahdnoepgw3bcy0tq9e4bw43z3somch8iqv4jm0f9yvy4bd29dd50rxg1f8q8x68ilftyv438k4wvnta5ghyhzauzeyacx08eghnjzo7nt7z8uh48wwoh99clq8otvkhpv1fxehsaem258g2oyihmxjjhximv5womwwu1mmctuy8fow9khxr6brk5s2hg33xp1ctbyza868rn5x65r',
                parameterValue: '41y2y04kwi5u2r2uttq1u94bse7z8fw84flpv70j9qqm8cag56m9scq0ud4xej4jmn2uiamrof7vgvc6mebq75mz9vx8hbodqhbfyrovv9au622g29wfshn050oyddl8dkuhsn93vv5hh5zx4d565vhojgsm68a28el20bdr9h0wcdz4lvwkqwwwvl4qsynle37mhleb2b5vz0t4dx2jlpyl6pfaiwyhielw94v703jtbms6vs4h8jfmgoz40cky9jumn80pgb8s3zkurk6xy0rvrw645z3ywxhfdg1gh3rdgbn4b1t39c25gxacc7e0u63fow28a24c9wsiuoznbble2co3npsq7xogdgop1775b79vw36nwqmqj70v59qo8hkc5lwoxjphnulf4br06ylon4xkmjwpbgin06pagc98dtfcqgvhxlzmyyykvo1ymlx3ygytk6im8i5hvq07qitpp8y9b87ufksw4terbxhyh550zecjx4whe2glo8hvt6uzs0ljomu7utziba298p2u7wqhgw3bzzwgu6ir9xfq9u7zo4p1z912wh64ra1j3an8qy41b6kffsgta5cuezluplhgtu3lneacdtxdfn97bkqw00kzujkrca5uoswbtvtu7ysoinq49jdsuteny3u027vbij91i8irtbjv7pi4lrkx5dw0w4cet3usjf14bdpakv6itzbzkbxvq3xjq7tp1isi0tz3otia8c9ezospna7zs98xsjhnxyx40fpwtr7ohywng64iprki49z3oy21saj8skyv03x22l8qfljm73zau18697fsze3ddbfi8lkg8lbeyiv3vu82z0tanhysiskj6au12s1ztkaxi56k88lng04we23n73vhwwgd8hccglsadkos5pyvjqptyi58x2dwhdt40zltu41zm0jaf9nk85ewj7wm526781mn5zili1cjxejtv8b8xqbf1pqxzqn1iygfi5bsore8z65um9in5btsex11k9i3fwjv',
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
                id: 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c',
                tenantId: 'a203ddf0-7444-4946-be41-956f42c795fe',
                tenantCode: 'zyky7pkz4e12vcb8xb14um2d1eekra48rex3dw4g6wgxcm7kwo',
                systemId: 'f3bf36a6-3084-4e88-b932-dca3bcf3ad97',
                systemName: '6ks2otl7k94rq1vgj4gi',
                channelId: 'groqae5hq4o98ekw4sjecuugyfcq0kw85axms',
                channelParty: 'kuze1p5513k8i58ksbi0v8kgwosv4ldh6e9elv3cgwe2t8di9itaweaay961ywshgck27t3vl0qzswgzpopx8mt2xzjr32kfobhnv8x0kvqfshon7twk5uo08iav54dm480utgoh625oqjk99w2e1dymwg2z7kfl',
                channelComponent: 'sgs9olhokd8ndumk649kjo0haphid4qtpvc13ivwlxxkx1f2f4whrtvwpb6pb37drc9a9oy1frj7zjwoisj3bqnctafqlwztsw5kpqn105orwaexlndle841q22tffsqi4l8yypp0ixl8c62bds1nqwbucvhdzlg',
                channelName: '2fqthq6l9rvsc96mkh8vc7q2w82kznu5orhcgx1fo8uqbqfg10fum8m93paqx1abyqm8qu6klwtlyi8k91kskn4pq8ql272mmj9g1l8z6t8yem3jmkptcnqmi63mz8o3m42yq8pti4qw8qwteq6n1uiaoyi2q9x9',
                flowId: 'f2b49f33-e8c0-4475-ac7b-ac53454b523b',
                flowParty: '949y2txr7c8lub82b8rf27ihvp1xiulbg4ar2ag9sjemnh4byiubwqlv9zvguri63orx1ehocu6il7fqd7kxuy9yvb6sslizwgnxvzza35gcfbts20uarla2b8u5a3htqnt5iz0ia75r79oc5njjz3aj83qojk3x',
                flowComponent: '4u1z256x2eu5xvoqwgfwkdirl54sde2ecqqhbelk9o2vyc0zrm0pupt1p8ojv5pz030p78l94tb96c5vphyjk7noobfxqokrrfsydlgbybyolstok1rzoo8fo93ygtjkvg4229qqjcsakftsyan9bg3msy0xwf6t',
                flowInterfaceName: '3dxi0qiaqplncbh97qr73ap5nn2kexjy8kuzbqnvlcryao5pgfu92s6mt5u1dreydxyat0q1stqycvoi6rqbqu4cy6ak7d2sv4shyq103jspi89xe7vadjjklzwqc24pp2miwh6qikgyl24421nswqia1e50f6z5',
                flowInterfaceNamespace: 'vg8vc8tkpsiw0uguaw9dm4t5hp26gvr2v5uwu8l9wn6pmj72ezxboe5bmn2n2ez61n1wnv6ge6h0u0mcskmo1spg7n17ljzc7f8i539lxql9avi483xp327hw92f7hvd3j4tdmq4fkfr0rgb9f55frz9jka3mh7a',
                version: 'w3q73kzxcd3btefaj965',
                parameterGroup: 'xgdw1aq3w6pg86lf1reqxibut3trzr9hx3az2k2q9jv0pkqk2d5boreb25a5wypyicht7yoirirunkt1ggvqbpnuonlhtdi9l7peegaupzu5rwcuevyp885de7d17mhq55r2cefai1uhpnkajim6jt8xquf77k0sggkugy2gyp4j3vq6xln0pjlgfhqzkfhpvqbwjagoyeez4wjbh64jy5u2bm0dz335v357jspjaznq6le1ay5jv4yrsv1e15l',
                name: 'tpe1y1ui84zez898b21s8ro6jmdcdv5ev5xsr4ceuz2xebo0qc1afbizqmt16bpojesp08lq0ox924gnznt7fmnq0lbzjgfligbdnme2loax7dxtb7f8ryo6mmw967i90qrunuutr5wo9wk9zwxkn44hdfrs8lajvz6qgxiacfykgdp2l0gwmggg34ny1iqsgc69yostq90ssuuemrof7gdr83f4aurfkgrf5uytqyxmkgl7k7dcj5t87wdntepy06tjoypo8ks3kk5g0oi1roeaiv80hcvzas0olaezgc4inhw3oj5rxj77ldqg17a5',
                parameterName: 'gwud0smzb34h49z1hj8ddz5v75l52wj1vlx4hbnyzbh02dpixb6zybsh4bqx3y2l58bykt93ia2f8d1o7va5jz93rh9vutp92xzx8z8s72m03ft6x0pv74l6cjkgpizz8fh3v9stnulhdnudhe52f9enva5ryq6yieslvmvyrnrt5u3x5v5wfdocbz0mewh00h2fxfdykj7ixb10qg3zqazwp852hkvu1c8kamt5ky7h08id2r1a3qdxtu2sr65rkj8wkco6bmmoi3ni9n340h0o8yjceq36hf8xjc86v4uegy7a5cm9vi5l4fxrk0g7',
                parameterValue: 'ft65sbndrg1p6y2ow9qp04xlf52s7kszwv9gl44ap9ut4wenxxylb7f7bljvwjnvcifgc3dg4azvs90qicsf1ggyk515thyxd1z5ul2t65h02t6l5plzzuzrdjb0nheksdrxbk5mcclhjzr93ev6xsbwnihl5f5b2twcpj6rdqubr29ynrcs1z3lb7ps2v70a7dtrnrt0jmm0fn0qevaz7r1xr6avwgwrvmiqppyr5xhcdrx8m3wthq5wb7wng221mhes4y0mbkpu0eeicvucpkmby4vzyk9o9386e8auvz8vxr9yed4r98twu4zi77juks6tfxl1y9a2zpg3k60cwgqfnknl1g1ctsthmw9eywrz3jabu8qjixchc3k5g2znusjp8p9kgcmwr0m8g2kjh4fde69tx45tyid4bm8hzclu289vihiyo7gcz8sdg38fm9ynppjsnb899i1pnemvbrm9jhed69lsryk8lt92t2hp5fz8gh9dgeumchv4riho028t6ykvmnu09tlsd7hzjucuchlwkvjqeng4tbmex6813awfkinhge7zqbxwjkkzfe9rc6iistjlfarfqdflkc24viqg4atim688tb574pzm4r9gsjtjp9bkw1xfp5jvjw1wraoej9rfng3tkuf55frae8lp91zvj0c8acddufvfe33j2gvgan2ions6x9xkdzllukndqhtuhn1670eyttutxzdr35338j9h8zn4pd964ivm09gnnerpvolrthxte5hu1r2edi9mh5hkh02y39bfbbbtysin11lwjjxspg2ankswspx8qmqntcssy984o7wdjedb79vr7c3l7pjhsf9jnm2kadzd1c4me78bnjihzi7orljzfs5bb0u0p3rni1rxn0pvl9b78dsxa0ajxgz68fjkfl1tpfb5bmyzui8n2mshcv5bsimiztd1ns6l0kahwx4z77w7z6dio54ybl6enx7x7quwig7n1fqupv266qk8hgkc9xvsv1uic56',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c',
                tenantId: 'a203ddf0-7444-4946-be41-956f42c795fe',
                tenantCode: 'xrv4ug87st31jsidrig2s5q4zvjnlold8843eomkm5rsqld0u4',
                systemId: 'f3bf36a6-3084-4e88-b932-dca3bcf3ad97',
                systemName: 'fz4u1dox3vfv987sl8y8',
                channelId: 'd544dd36-987e-4558-9696-fadb54dabb33',
                channelParty: '4ave32uv3jb0zt8abza7f7qs6quygz6vwq7qh406qm2rg3ajr6zomajlj3zj1qm3a6xtprlmu4al3sskyd4239zdgn23xu26y68ehz9dlroawojp6ty3isrr3mtlxi8bvi6k2gqscamhuav58an3lz23o2z2c848',
                channelComponent: 'e0w23cw34p4qpqdxb0166mhdn7a1ie2p9y00pxqby33h7bpxhspuobeambj39dhe79haxyju7gk1lpq1gz6upns18gnf5u8u3b2edrqivwynktk5fx3p5fyh11xzqno216p23nbep29i6576xc9b29c5d6bl2dbd',
                channelName: 'zs9l3oroaltkri5z9h6l9evwtel2yocx1km1roj8jb3h4y8trlrsg0ssb4z46f9838gf8suc3fgq87bkrucujo25bgkm831vsvhnibw71vvv9dm37kxdf8a1jkbw5m5ru3ju4wjgaltrot1d59vzt8d0gy0v835b',
                flowId: 's9usi1s3s2f0x4f56ecjydiva7togobsp7dt5',
                flowParty: 'gtifvc2zwj4fi6atghgrhav5fz0llbd8uadtvo7v6oj2o2qywnlqincm2ea9avfutu7k0cfypau9bb65s66if6g8g71h51j0z09lt3nif7rd2lp5acr9sgx0cp059xyerp6jjpiebecvyn9a9bw6zmm2l4yqgtbe',
                flowComponent: 'kvay449qpcc38os9bxg74tm1ysrzylsjcp4erdr2u3q1j5a8e9xb35up8lbdh7e5yjwhvuymhudku9ggekcftaof08p7qafwu8e8bgqf70q2hd1qdym5emsay62pxuo1v6160q8psmbyx4b4ju35so0z7digea8u',
                flowInterfaceName: '2iqx0h6vx92p85nmpk14zgnixpq6h188zluzz391kwq22niydc6p4a2vxq3e2qsq242lebtd0c6dpaenn4vvuwxyxbzyobxbul9d0391lwq13mq0vt4pijmpz9p04bce4rn8fz504ubq1pzsoktq2oen3k27jpk9',
                flowInterfaceNamespace: 'zfu8fehswld94a6nava4xb42ixtc1kchu5lq2tfptogdlstv2cbfmwx7iomz1hn4ogwdqiq92yj4jqkz152q2tkh0ggn2nisw4x2b26bmynyivl1ikd73kw8ja444mc3j1c1aeof1mrtmuzo3y5ldowbhaxh4b04',
                version: 'trbznelu55w68qitfe7r',
                parameterGroup: 'ftibkp1bdfyyyuatp33zcz0rzj846zv7nuh7m1unre598zonqaz2b6z5r8the8l626s30vgs94jlxoxkrdq9kx40708juycdq5mb0y2wl19ga1zkmqierfibf9z2sz9xnn5o226ln939zbglek36jwwkqsqp6tpzuexi3mo3c9pk01ixk5qkco4lzz7ftgyxgu9tzrstu4gha7dw6rhm6ppok91qf6mupj9nrok67s6jjg1e8nd8ijk1x5clw2g',
                name: 'z3q9jjevldyetm8s9fjaltamn22xyhjz1r9h9hxrvxoj0cg9z5xapuszcejaei1ur84lpcw0dsw564mct7jpm8w0j0vrgi0ompx1rn0e0g7md3f3joh6s53bcambmdaah6nzl45sbe63bbdnxdywfg2i0pnki33nijtknxfsz76blksclkxr7gkdezsq0i4uodcv9a47laeh9cc7td2xelz1lfyntuinxfrb2d7iypxg3xqfv0jgjgncnpixidd4x9elarpp0yb0tio04ygjg679qg4p2j7sf45c0swmhqy4wut8bthiq48jzvwzmob2',
                parameterName: 'r28sd9eradcstg507pw0t2ps0dzs4jvmssjxojv0m478m6lvufavhb32j1a3ai0u3gmkrb3nvrkdauhe7xgtddigejrjwu5tm5pnyx6tsko8zn0rnstusww82449mdv90l2ocu7y3wdohd50hu8pm1ottw69xdq5gbo02e0psiooo94uorllaubve6hfl432upvbj3g7m03vvvc21awzj2ih3oe698j2u62vna27ozoxbhpayhowpgizi29vhgdxxn4tdcig095ir0sanuxpcqg2c3olhzy6ykmg5atr5t4j3ct2ko701hf06onx7qnf',
                parameterValue: 'fsyzuergfp82yna9fz8iv978eqhi8ji4fofmccfknnnuyz108pfll53g3wr668frs85a8uva1kz46zqbuodwx56ukznvcwdyj8cc9rwmy2pkrkc0baxj0jkfw9266wm1dr5i0tad77guwi100c9beijxkoz45brib0noql3p94d0dpkktwkptfmmxjtdfehfzkdibg90pqsgxwq455zarcdxd5211zvzpzvs5dl4reull7qz4rtst5seu0jxx1op5gwru76oljmudmja5uh6bdxdkby442sizcltfmyc6n3zyclpgiyr4oe6srz10h0yvqhaavdc7v2hwwtgu85swmkco5p5m326nxpbkchx4pxn75cu514r49k5q3xnl71fs0kdeeah1xn9we3c2kk80oga7pbv2palftuzawbjkp224kzh0vw0mcwm1w2rhxfjgd1g510crddrrbnruoc6uvuy9css29un2vp7fdsubziyp05xfcvzusrbmxtmcu2w8mkq9y48k7n9lju53rpf3ej6zaw8di1qn9ai79bjdoyqadvi6ub2rz8mtvra80mmgjuocktmr3xoa15eaggh2yb7pfo42p9fx49qwawek1vqwxc73otqs6yxeoikfdcdeoqjfgh00tiv9i9s99wqkgnienslfvwz26h2vvz67lzffry2eimrzq3m20sbegsdj8gqormifg8b75jdny0ni6milpq7snvsblse3k36lwg92ilp8tv51j5u3rvxkq5gadwdc76skcg86b3wr4uv9u8s69rx6dq7rm7ws9cooaz22jfmngn0qpmv7dbfgdazbdq3njznxviybnx5bd6nmbjcpekao7y1ef02mfaap6bqagqeczh9aix6826d4euecpw26kua5w4fmgq3o155rrcsif1byy2jtlf3ylssyq0g23eh1iznhk059n5maiah2whi1z5nyv0fpiw15jbmtwlizj6ltdgibejwaxuaxan9n0mrlcomqc8phh8stgcd',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c',
                tenantId: 'a203ddf0-7444-4946-be41-956f42c795fe',
                tenantCode: 'j8qezq2ytke667lt5h5v6omzh44kzb9i2fxx900jr7xtqdf6xgm',
                systemId: 'f3bf36a6-3084-4e88-b932-dca3bcf3ad97',
                systemName: 'hop196jxombic2px0bmr',
                channelId: 'd544dd36-987e-4558-9696-fadb54dabb33',
                channelParty: 'opscv2m3i5j6iaa5atvgkqhsrastpy0a1e5zy7ba3nj88z6tl6m8od6dlq8nrekthr2bc1w3c679qkfo3j21ig89ee3j9zwk8njok26f1i5li0spigv9s8lemd4zbxnkicrjo706tp2c0fbugj9s566kicdknnvq',
                channelComponent: 'upanxvtg7r0qh3mzafj1hjbboio02i7m7moyjk0r1q7yd6yh0u9vth5hl5ntnqs2z9hog41ii4f8lu1hej3ppi4zgtxjj1fntq9v2hwgseaf1kt2my3rykhim207ygnt4k1sbh2mqng9eeknsx2trbpfylblbkw1',
                channelName: 'mam3lk3zpnb2l7vq3603rd9zb3i3w044ap2bhjqe83asapclkt9pewbnre6k7ajlt9ff4rs9aezinexoxcn8hghne9d2mhc5x0xcl1o4pmgkg81ofrff2p90gk23w9blkbtkx2abnddca1wz25vdp0ch0yx54h81',
                flowId: 'f2b49f33-e8c0-4475-ac7b-ac53454b523b',
                flowParty: 'uolropu7l8nf5kvsz6m0atgmjcrcg94tdhyib8jx4os01ep6dubdnhk5w4eq7eprn435waum2errgc782g9rm0t9s94tbm1ruey0y02q2kv7ua3z466ocu4fp5dwg6394evedak5ii8gl6nvsgq8i57fc78xhnx3',
                flowComponent: 's0zwgxocu238v2tu106ouojr3mh1wmpcjt1536b94zxvelgjnadwhpgek5pqaqgkfgi8hre61i88dyh12cq48qj7x4se6326r85k3qfvqikc2f19dan42xb8wmxln0j3ytbty31m4yu43d9wnuarvk6svrmbgsuo',
                flowInterfaceName: 'd4fk8gz88vcgestxp0lx3rykvgllulmj4gwnnao9znouezm7mragw7nfev6svxkxw0olsmjq1q9qnhxtq8eosn67v3yej2td8qvtuwtzvy1pzj7czuh9j15u85nat0o51e1nrsg9h000bjj7tsevnl6y8qlk2p9e',
                flowInterfaceNamespace: 'zbawngf87an1isd0211g63gyu6zf5e9w2jfd1hq5wp02kbudvxtbxx3p96essv3ou3njybyzokax1ytueo4q2hjaq7ak5u8bd0eor3f5c06s7f7g5ib4kefzxwl9y5duqs84zft5llp20rxos9edefcxcd3meb2h',
                version: '1akeel2bsc3w6n2v23mt',
                parameterGroup: '3rlogyewf11rz3xnm0nl06zjosi12evtrupuy8hha7lo4bh1tzqmx51l4thzc2t4t9ehmvh0amrvh55jqtvtifjfiscx02s0bh68imyyzc9s3mhtqhd44frqdrui9l2c5qmdqer76jl5uqmoyw7skkzyqbmp29vt2szregca332034xsimyy10spxki59fnhy15rgpnb6gzj4iabi33oq89nk7hi3bnkok644b6ks1nejfv3mlr2p5d9qu1xdns',
                name: '594foafjblt6qy4tyb669p2yqzzxrix8tru9ocn7ckcpwdr5tqum1t98un4n3fwe190mz4i7997lqncley7xyabcmejbpmin6qm8rvzk6alwya3yf4muhu6hvxp0i6a90zlexbmh1ooqg10wedsvw163s46zrdsl0iio35i0bm7o56eiexfdgecxu5gq3s7yubaxsp7i47h6gz2rhblnueqqdp9uoqdmh03g095fljwzs8orgkyvhg1hlmciknnujpr3oqy8duy7feembhzvde725n1u5dqliexayvy24mgfx42prtvqt5ok30oi4pg7',
                parameterName: '6bjfoxboenxn2xer8d1re9bwr7bte1d0mto0makb7gq0zvx6ibw1zrjbdri6frwbvxga74ijwjysh4fg25w7wp8rewxnlvkvsekk91xziwqg07miypsoxk6dtkvlet831jtjrjm72yvujokfo0hwcgx7e67r3m0b69pztorc2zw8q330ym1pcst4puavpf79it106qqsuchupgp0n52bmk9gczgh4idcuohf8we5f1rk13ar0fb2v9ic1vniu0rojller131gcca1u4dps90qoic76s204juy797kux22a7lxxlyp1qko7fbdz4bra3k',
                parameterValue: 'o7qa0lrq8107uiuk84wkf013dv47a0ue9u7stite6srntenlxhbqpb0197rxoa7liin9dqx70lg6c0e226gjh3bnoht04enoklyp93f8ya7vjm5lxsimjpmssknt5o7svp15yc44o5qyckhjlwtkwisjbtzq5420h4l8bs1moz1l146rmz6ajnzf9c9e8tbsw8nrlbxfik8vss47jhrd5g3oiq4k0j9wyufdquo7je743ku5o3zwo9so3hz5d60wiga1chgu5l2wekbd2e07gnhe647dmgg0dej63rkosd2g7ece7arlkjaj9f9i9cbfopc5ijuanzk4fj1z65rhvgz9priqxhtnmcog0yolbd9jkoqz4pw2700m3nqk47x8f8va8kq51pd84qsqz662mpbbpu3bobxvcw2n5bplvqheqghqjauozbeq799qkmwzm6qpw6ya6tr8idxue5lnsmvm303ynnywvrri4ehz9wqj4tbq9u7c86o7dzy7p73j3c4qulpzcxtafwxnl7qved5s3ifw4te2gr1syrti018xs5mlre0l7jh0dsjszzsnxlgyci7ua2fknkybvi50xucb4z0aw246yh317crd2h0rqgmfk6iej6guacrqy6a2t0c84seq1z4239079rq6dipyw923g0olkpfk3k4efna9o0viw3280qgjxy2s5odvhy4rr8i5y4oh5l0nrrl5k69j1319bkntysgha7pkn8jr3foamq42dunqrzj61aqlff5gadv5qkytxeladfp4ziruuuof8eguc0f9kg493rqu5y57nba1mrgas1nqks1rwnh6lzotwmtdylhmd3worcuvf1oszjpz30fnp0w4deaf5wctz5j325f93gdt0o7tckjg8awop6ni48uuaxby6zb6bu1vrqwg6uajktwzaoxqz7fgerrbon0u97ldb8jxlqymefrlyiatibhl39js0nzprhafvzqv3t690ydu4o1j5s6t0ghlen942a5l6nty',
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
                id: 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c',
                tenantId: 'a203ddf0-7444-4946-be41-956f42c795fe',
                tenantCode: '79uvg1qmf8aaurvzmkh7syaei6i6omyush5x43fpbccge7jknd',
                systemId: 'f3bf36a6-3084-4e88-b932-dca3bcf3ad97',
                systemName: 'jl2y6xt9lbutr478lw14g',
                channelId: 'd544dd36-987e-4558-9696-fadb54dabb33',
                channelParty: '1bza7dzxk4r7hukz3zmuh3jedgquw5eze4nly6qqdx8i5owgfq3tycs6fbxfaa8wc4wz0e6mw3la97o5sz3ma29g15782kn48ha2h8p84fe54wax9g9bmk06gcw44vjljoiokeymcr0dffyjfrshazdj6zbhr1y4',
                channelComponent: 'ed8rdienheh40rf9cnydlrjlt9rdm63k4wpu38zws2gb24vsms4cdmdqh7rc817wysknxgggi729dmkndz5vl5d60b8th78pricv0ch4fnijlk9ui7k6t0lcimiivonr2d670we9tt0jv5nhc7mbhv78nstxq2c9',
                channelName: '5hcgcbgsdk205oog4nmwz7z946nqoak6xzjn3opqn73xg3djgzcl1s7d4458nyizkg4xk4yigf3t2xqf9quvohg33glim1tgde6976xa3kgyz8so9upgu5cws2ti1hofcs25ndbul6crc1gnacgmbmia0cadmx8b',
                flowId: 'f2b49f33-e8c0-4475-ac7b-ac53454b523b',
                flowParty: 'bb8mlr1ol4658e722mxhuvwn7smq8hghdplazoq6s7n1cq3cww82t1pg3ee2groo66axhoprx4j2xwoo937x35m94mtucfk5t3tr2s36bvt2ibm77al3oytalwskmsskuodhxq5nhs6emfecgqb87mlq8ktijvhq',
                flowComponent: 'eumcsa7nbas1g3i67villt45a70tjk3dcbx66b0zeu5xji2c3qye27o96o0vhutir4md526y72ee5gcel8ixt206babuybaka0hpe5z219esdu6qabgmj40miokt88x7ajpv6tmdic1e1morq2a6ugqgs0t3iqir',
                flowInterfaceName: 'j1c1rgkys5yhmc9hc8jktfsrh2ef5pdktztg573zzkr4to2po5l0j8eerv2m3ndulbvux63dy142dtog0zrd0epaqfoh9ev5y1m09cdd4rrbn8g1wcx32i7336ix287s33q27f0v9jmr3l71tke6vr073b4on1h3',
                flowInterfaceNamespace: 'yzjidrmf6mp7iw5j66b7i637ef0kae1g0o1uslayjwgzxtvhs03jjgao9gutndme8glmieggl9sk4kifymvm5htc1aipulcwaug41z7eoh688sf4l4akc3a2hd1gu2zkzcrx5rsyrfcp893bttizf44itkz5szmp',
                version: 'tc8bu1y16x31bqtuzljw',
                parameterGroup: 'iaa15ziuama51ebvuz5i6lrrjamy1e606e1i7wy3auv772la1lcu48s7d91ymc0m460lkvf755lywp31xwupsqnc3ddeg2wkhvh8z4smy17yap8nqo9b5osqs5she0ke2yvj5mbmjr8h8m1nvra1psiujp7ivuyt6i16dbb3yglj4eweqeztkng6e6a8v0fhfvc6mf9r5tgeu8dowi7cgb0q4ahjg0sn8dx1gzh0nqsyhwv70rkx9tkx9248add',
                name: 'zaynwd8wn3pauio9ez9glf0danr2bebd5rd1a41expx5otogek99oynzha4ob6bkq6354x0rebah5oyv1mtd6gtp23ym329500nih2y9h5lx4us7jo5b85kh8iifsqcqjg0rmdddzwdomde6vx4m219zfp9rwzo41hg9u51lefc2t136j1irav3slvahhvsjpkmbi7vfzgvy5g4g7wm5ec7fthizsbh5gictfbk6347jp0gi6buci6xyki19mlkkcl2km24khw6z7onuvro36r0ebs59yippsqy2la09152p9nu50plk623wh25yg4i4',
                parameterName: 'g62lb7j7thtqi28dgzrua8y0f1xhssogbk0976wlz4embit8tqpke5hoegughbmk8pobvmmsy0d6gahyvfesud1ty358atxdujz3qbmt24z297dssv8nhrhm21umbc7qff75gjdtnozospd7hwb8iq3hr1phkz5s7i2t70wiii0wgy8an9xjmikkgwmkh7fjihtru57mheymimqj03qpl1me9wnhtowada9h6intkd7a198056ydoaquohpy1ovmvb0ck1dgu9gmaiaia4a5085doz978jrwxvlnfzq04uej2fby7s5460sq6prr1jdo',
                parameterValue: 'gyybp5zlrrd5c5hj1xq5d7fgmhisb2lio170wdf7o47yldqquvewyph4wlhaowg9untwypyy1mlwo44563q4u9qvhpjudes9nstxp0r46irppm92350nfo0bckrc3a0h8yo6cydwt4463opx77m39x9k81gx8q05azob9hngnrzqgnjzt0sf0z4uxhemr1a2o7tnr48mgak3wraqx3m2tvwr9yu987538hf8zfwxeiuc12l0hsmxoswvrm74fwj4olpb07lznv919phsoy6s1uj64kzm2z4ferzgzbfzwnsc58mllv2erpu5nkawxsxnofp1pxy5fa54s0wwqqalzcvmg6y88cpsg3b33kut2kh9tncufq8j3o1wdox45uyq0uete3rxwdork9n96gbjpimgtg1r5wx5395r17ohp50dnnnbdwgz60j9qqba1crrolucd5qbpf4w0f02vuld29swmq6oyfqyqq7yo3yoole3jppb010ooa093ijdy06ax170vgrgvwb8xlt8d773gpbxh3390gqdgcou33ncob3940wr2r7e4vlfsxinla8jdnoxwygj1uiqbfr6tjkuk75msb0iy5mzqwsi7w9suasnp8haurerpdpl4zshcmiyje3ctglzq27k10roos49wi4xyhg59krocnkj63226vm6obbz256kna4g9ue0gf4c5yqlnrdqx2g1q1kbsk2qdqr0gidaixjtpm3gamujrn9jcut2j7ol10dznco6c4rxx56behv5t1p2qg4mioktdd2gekwos77jzw0g74z7g7p020679ph0uw9clpvh4n46kdqiq6w1vaisc9hmoiy3xydd6t36ptu20wa239o9dhx4n3at8g8vy7fx9j644fy4r6wyjx3ct4jj2fga5lnzc91asn5hp177oq87ql1ufbudpt8usy6hjrxxhgpf9d9cvtmcdh6eh1gnofdz76nlsv2v7g0axpq0bvoblzft8qohcsoadnurvkrbh7fdq0ty',
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
                id: 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c',
                tenantId: 'a203ddf0-7444-4946-be41-956f42c795fe',
                tenantCode: 'flqxk3nq5yc3ox99wfrwldx6cprmh18opqwc2yuhhdulfuajso',
                systemId: 'f3bf36a6-3084-4e88-b932-dca3bcf3ad97',
                systemName: 'l9q0qkkyr0f9qjhhie08',
                channelId: 'd544dd36-987e-4558-9696-fadb54dabb33',
                channelParty: 'nqsw4a0l9hd1jzp6ylg4o843xhm62q3m18cm9lqx05qki58mprsw9yjd4urh9vobj2d05qh5en7c4079twfv7d7tbklz10hsvekrt2ukk2h29fi01b2cxvedvclylylyfwsed1tyhj3e5f3n0x9j4pfjwov4eyvp0',
                channelComponent: '7fznyp2ul81i23n2vjux3xgkayu0gg2lje1v72tod41kp5o4q7s0pi6c8orfw75h1ljvpje500vtybt7l0x8buvcd668hcaf8p6rf3b8578j3aaf0oivcta9rsqnwt7th2rtb7b3e5ugdk8cd2ptwmcw0jjup73i',
                channelName: '0yw6aa9m2m2nhy889qcx6ucd923of7veg0qbwe8hradgopwk0iuo43hz7aml53aqok6qerrie4z6nlpuwys9d7s10ktue6edfqyjwjic71p8xq9tjyk50c51c68o6g0jy916pxb80itottofg0w2ip8m144skx36',
                flowId: 'f2b49f33-e8c0-4475-ac7b-ac53454b523b',
                flowParty: '2x4607b0an1jhwntl5s1dzpbegjcfv9vher26tw0ego39nkflw3snvo7xdjut11gq4bzqq166o4ka3u9xz2hbmh1sn1cg93yi6gqza8ydwcrg9owvl6fzuoa48v6bwfib9yr7gywlo7csjz4l99c74kyrxgtvzhp',
                flowComponent: 'q37dt7jhve6uxt3ho3gso18do08c2ttd5089liwljd5mwm84q2fpmms6dwjet8bvcwwf706qatsldnphyqbqot4km8hyr6lq5h0cpptrh896v7tw7bx2nr065s9qnyfu60aob8l2pf0w5fd1opl0oif6ol9en3ju',
                flowInterfaceName: 'hmyd91ry6h9nrgion0fbdj15ekb6qcfqg5z9fxuy9304eri3kacuz90kbpdpz8syug0d66nf4lp5y2m4bbm8uj0eoicasirrhdy5tx7kwnkynnrrhln0amgy5af2h418c5qbcdt9j8smjjbjm8b59qlfjggdjq6f',
                flowInterfaceNamespace: 'dkmw3r8qp1jclx5wvgx1j8vw3fgioeacdomoxcrlo6azkwyjhejpp295jtg2g4jm7m1as4cz8kv9l38mpopph4u6qtqmc3bn9xtfi1xreza6e3nxi2oe0ns2j73vxxqo7qwtcc14wzuirw364l1tst5p72jp4hwd',
                version: 'kvpz2eudbtcy96yl40nh',
                parameterGroup: 'ecsuhokqyqvk1orusid63dghizt2ja7hhzwojwzks98nbjtlm4yjqt5q3px62gw20nq0uy1y0g6lq2ndjanaps1mf15quutreizzpdam5d84p4n2zfx4le8vzf7s4lb2sv6mznx1h9mbtsgk2mikqb8mrqxne7ngvhbmwyg2ma8sun0si1i2gxk0zavmnpbey9yt66qn7vv00ojyg0jtitngz2x1hhwe78b5ahtoji9s87rge9n3831t4nc0q02',
                name: 'maabng575rdoyd1vdcmtzwl4dcbsxxlucb41ketjdb8s58ps34ooqflwo846a2x6j14dav6lpe1630n2e4kjptf3t1pzjn9pena5yni0148eaieb5r0o690hhj6tva6f4q9012774urw4y02o0o7tuiak3scynzgy60fvpxglwsjxydrcusv2p5y8ons96m99wj7fe4ympt5uy2pia9dgpv4i7srptzjhnbg7zczk1fvgb62q1a1egfczcndu8rg94kc0v3nzsum44egm2kzvcsddkilit9alqvllf0k6tl3kgzg78lteoabhflguglr',
                parameterName: '637t97eicqe64kthteh84kozomtwlqtuxpcwxqqg8009gfdr65pcmkdy30dof4dvl2y9b8pkqqiluxszcoi6ykhoen3v66kcol7euroicc6v9ggqxdk38wdekork1ehoos0k8cge6oq8du0a2dx990tdt7yozmdur48pq9yz9ig8kczu0lyvjvzulaiwhyut7im7ctzhbz4z35ah5kps0kup402378n4o5ke5venjutsk059iykxgkl3namx7x468h8xq1fxc7quwj6qm2vhqk8xfpevmedg10v6gzqejpcu7q2839jlyenxujwziwn1',
                parameterValue: 'uaibkm1ca9nhdxwmjwr9q2laz8bs6zygmd6zv5ey5re52v4q588l593xlf5ilsdrwjzug6xrod8k40kxzryym2q0bpfeb0ktwdtdvf7rt7uxoi2f351wu9c4m233a39e9vpm6ge5n9pevbwm93scy4xxxbo4b16ymwkff42ag73b5y8mzl4h3uz63jm8djgag11olxhgl9c0496729vxa0cjp6zad1n6zazi1jpjh2iwy7f7a0bigfw82e9u7holyyrgx5gpc7nw5hzf5ad6mjm29owqcifdskf3vmk4y9scrysn3xv6afo6ozylakw6vbx6eydys62ewgqlpohqta9j6xck4hk48ejghy8ek5bwzdoqeoe7cuydpww06ml6lv9e3wodfra6pl6anqpfcascb3akdhek22ar5p0qsugqh4lwoli4s6p3s7t84d8u8ffka7z44hx8wx3fb0asurrq180ab567owkhlup93emdhield2adwgs58t61zezrg4ckvq8no820bqajsbcgg4a745ykbkehkud7cs8urg0z2ekczsrjzbfn7hnigm7lh46ijonazla5cj7araynaypvh1rpimoupmlov2801npfgmibs62lc3e7dwhcsx0bgql9cd24p5c2vmu4r40cx02kismqufgzqn7mvydw9op7ws4r2hn8nnpk13n3vu303129wdhrpxgmg66obnk4sze3639222hdg4j4pex6upqzhtwn951wckcg54f806fziytb4ji6sc2t46osyyz1e62dimnzrhcfyv5f4g5hw1pjs3gebrqm4wwbihjt1g67ywfqyfhdny8sdu0ddpisgvicdiplfv738jvxb2c53vw6ignotnvxo38a0cu34wz2oq133q6qp4no8201m7wurenfzx36bgz2i1gx3s16at2ezpefbv35rop5767gvchpmpjlonfwahlrykwrt1k7r5fdrypxh3468itkp0ypkmj810sl3kkh6zvze96gpfmp',
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
                id: 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c',
                tenantId: 'a203ddf0-7444-4946-be41-956f42c795fe',
                tenantCode: 'p4s95iz35s6omvtpf8hkmxbtw9of4k4ikx0u4g9kbyrwgvhu5i',
                systemId: 'f3bf36a6-3084-4e88-b932-dca3bcf3ad97',
                systemName: 'fkj2hp3p8vquyi43hxcl',
                channelId: 'd544dd36-987e-4558-9696-fadb54dabb33',
                channelParty: 'syl0u8derph76svshmc1695iplgs5m6cfl88rhjofl8732aza8dsq4pl2acam6ephwjcwlyvstlipsgcsq1mmj29s5xpm1t67jpcyy7rd5guc2d9nl8gth3em02n9y500yqi1ztwy5sb2gyxs830k9jmloacp167',
                channelComponent: 'x7grapd7tkgrjk7f63iuauhm5wx3ls40rngakx984zrxahg5aa1dedbbk1ifavaj588bnwea3qshsqcx9vltiml89xiy1f06gub3jg7v39qdxmkm17pun4rgxo3lszn0934vfkbh9jcqjna8h11qur1vfvxy69390',
                channelName: 'lnz0p0zucqlfm3l5bypx3udwpbyvueje9xiy2vqc51tp365nl44n1ps2fbte1z050j6wwlk4zoxhep4ogxav59fnnkmze3u0dlx96z2x2cyw5113imid172s2jnuktzavxcv7kz0l06j3msffwqivmxoukj1eotf',
                flowId: 'f2b49f33-e8c0-4475-ac7b-ac53454b523b',
                flowParty: 'eapios0ibmmjb8nywlgt0q8ja97g788kfjkmk7zmetg2oo2v8d7eerv28mydo5xcjh4dft59ftosqrt9szuunvknufiwvjq9s6l38z6yhjz6bag8u8d0ydtlsz9fwa82css0kg7v137crb3noq2b17zdbvaqec2c',
                flowComponent: 'ng9lqaz0uggwx6oqe2latal3ef0vmtg32xe8v8n3mpy3ekojxjqq1ect4dgbluuuc2rzlr2s7c0xkoia5y5acjs6dgdfoooc4zvpcxj4l5j0q1i99irskbm24lf4xk0dqs7dvhu1w0oa6kx6j8sekcadmr8ge8zp',
                flowInterfaceName: 'umgf34nl0m9cfkja9ovxh6hd3rikzxrg1nlzpamhdqtdkvs6ixrxdtyg01je6fjm9kx63mpqxeb32k8b6o02hxlnzynt4qun2wfn9qhw0lmhc7dn0w6zou3svraic6y6xg05ycykkguikbmugnjroq8xo7cvfgv2',
                flowInterfaceNamespace: 'nqow3oof5jryp85bqmb8pzye1kcbitpioc02qalqzbds6ij1ek30n5wxxe6gonotjq48w69withiv7bqg0p1nnfi19y79xro4z7c3i77rdgob4trdad7m4n2750yy8p5syzw2c1opxiinmf1iyss8fopt7q0ufv0',
                version: '2h74lhs3tbnwz7b5sf21',
                parameterGroup: 'sycdmd4fu75pindydn64tz930qwvek40moha6d4713i4e3s5ovz9a7o1q3vl1jwpjv4fqsfwymapujk6tjkx7mu0csedv4erjncfwhskaijmge4sm9ja5e1d3czu7tquos3ud5w3fluiwd78400s92tik114qtexdb3mpb5ki24c6h16b9qkihmin2t5tth552wpmd8gh0bmc80nlb6qn2br8itd6gdk4wj9tcn4pkdduc8m7u98fk0esxutvbz',
                name: 'nxs5bxfjnihd1wb2ddd78riluzt4qq2yh5qu4ar2k5zsb144rkpd0j3u4vqe94sdf1pchsluaqd1eifrbdwqkja80hirpeez5u7r61xb56f15xw4w98aw7i2xwojunf3kogdpj0f7l5gyhmi9b6ycv162d606lryuxkpc9fj1pu4j52dedfmgmc3fbzmflc6p5ac1vewc1nmswoek64xu097j0232jcw9zoe5ydsgfgy0h9grqxz23g0ywp99onzbleetoeswscm1f83fxdqdklc1y6gjivxhp7tyw3yi7z3in8lefs1ijo7ex8p1azd',
                parameterName: 'mvkvo0x58nwjfquyzehn4exdc5322scgcifni5flh3stc3v0nre37cas54o3jv8pk0oan372arueqq885egi993r4ruv8k9g1ord3p64xzsjme675bcradgs1ebvpg02cfzo70wahl0l6zrlj2olll6lu02f40gut1pa93zd10ll7la582564zpcc2roip0m6o4nf82dvjdbh7yknho9j33egoacd7ip0iz51yuzlrjh7uvcidmkdqb0df24s7px57hh79zob391fpab5wd2fxuthh56pm7ib7sn879rox8rcx2wdt07c7qxkp8vfqqu',
                parameterValue: 'c7h5oojdzm7cuo2uwzsm27x9e0abn2005fzg2blvp8u8811r2pahhz7tmahhx1hc1hnqg64t71gdz2bmf2uno01u67uv43v5h1i5si8885omkkdgstrf176xvy5pepy7mxriwh2s8qzy8bzlab831zypsvbd9v78qyvlrrr54f5h818ubbru4qc8xd3wkf4e17pcfejiyk6gioyhs7w5prkjtnxlugiyyug62vxakkch1c302hjlepxqe0ugzmkhiba5xwefdmzcgnijgj56zxl94x6cuhlbl7sxkw620299vm6dfhk4q37kvauukxc9uflirl6c3anohzjj1ee8rd9kq8lhhnzygguwtobsa1j973s2vmsi84itiiyjaau8zb4c2re50pml347k9r2uk0ocm1pz7td26q0wqgjuzb0z8h4v9mmfczh7oxgdy92g3uzxcv5g3k793mw048rrnoifnq8868y5d1ikmv7bguwelw2grcovqbgwh8fj00jylf2xs7simd0jn9ddzm3rdpftuzsxhcf6rh1s3j9t9pgjis680mv5yvag4f9ee1hsso690vzwqy7b99sri1e89fmbzifotgch9u9nz1vktc9i4p7bbz1paa7mgk54ixsr23wn98xouvs3pp2vcw3ymh15r50wlnh2mvddf4d6k7jfg3hu49tte7o66umgn6vgp5cfdvtxpjf05dhh3y4tphptyy81bdv6cdmlvsjugdzu6i9autifpfolh1vafmpicbx009172d7321m0zpwhw2w9w7of0oiunn16m6516pbfoyjr3mrkig8u44nu20t9mx1aluecir7e6odvnbc7o4nf3yidk03srxrakv3zyj5prdt96fxswp789rwtku88e3t8abnmcslb7h0eix6v8w34377c2u4t5b1owdq0fn44og3rm1sakwd09ai0ty1rk5iks74akslnltlwxmfa0g08zj5692st7shl5ct7zyfsabmwkhth3s0gfs7lkupx',
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
                id: 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c',
                tenantId: 'a203ddf0-7444-4946-be41-956f42c795fe',
                tenantCode: 'c229okq1ozx3d28l3dnmn7zgtsj8o8bbmev59xm2cm44x4t9xn',
                systemId: 'f3bf36a6-3084-4e88-b932-dca3bcf3ad97',
                systemName: 'y3s5w7nmbuoqy7g55nbd',
                channelId: 'd544dd36-987e-4558-9696-fadb54dabb33',
                channelParty: '7fpayeo59isbp3fsuhzo9jxx1thvf76czdmerl5okaji38bbpkgqdaezbisa2j79muuiiq0uc2wn4ww6p3w8l3z2rm21xq3drsp4k2fe216c88rymvmlig3ni2ny3jqfp5bqr7g833bvoj39ulema1fo0lmeizb7',
                channelComponent: 'rnkptnrj7wuwum5ubu1i9fclaa9s92abs6gd9cdnj19qrpanuld7e9v0uzhirlfgexw82q5j21t8xz6txrwb6sce6nrplczggfqjhq2l8fosj8rg0t6wng8zi4kd8s2qwm5uf19o08p0k53ohdodevhewlsdhwly',
                channelName: 'nr9ha2sdvszwdwpapn2v44027hsaq2470crfehp8i3k60j61ig1zxlit4e6uucndsaqp5jq3whgek70j2qpif5idpq43hxdc7assve4jgcam8pm2n1mgrdngmvj52zbenvo816bl0owbeircxw63w2fmqpxchcgdm',
                flowId: 'f2b49f33-e8c0-4475-ac7b-ac53454b523b',
                flowParty: '59ps33imoiqh29gwefoz76m4qsh0svx0yprnclbx2n8lbxye35rdlyy96fj3l7z3wg1f3xvdh8quar268vow3xmn6vi2m3ebk9ct1xc7iddetd5olhwjuuk5kbv8ckdftji7s93s1f8urtexegq3o2nogtbl42kf',
                flowComponent: 'ftr7yn1tfkyk90cl6dkg4xnr5egpqpnb7i4ub2memwhmsbd573u6g28699tkk7hckw1gqm7htxtl3va6f4tkftn3v0cisnif1fyqagxum8e8j1xdfvsqcia7uwe1eetgzeq0w9xz0fkpms9dp3jzp49ho2ymqgk4',
                flowInterfaceName: 'n1e6jz82t1jqcqw6ea9sdvqq49vvgj6msbj6pmrh9f2hyhxomf91ft8ihfep7fj3vl3fds673opz8p81jrrr9soi6js1mproyddmbwxsof2uv39r2jgtjcojks4g0iqy1wezawqcv8u06bg644nhuhcxldl3j1k8',
                flowInterfaceNamespace: '48j2l3vcz8utnxpfnov6tqflmpdi3ridagl7udofw6isarxdindybtkqjpfm2586j7i9am6dkxd8ed9jd3hgzx5qf5wtzmo38pa4godekbny7dik05qzsrf7kopc9arqmiz66jb9h6zd1m4iehinpfzgg5oafknt',
                version: 'dys1ck34ga2wi3qe3b93',
                parameterGroup: '2u3cq727ow9fovjsqx3zmgul43v5let6c2pwa7fz5l3ymyupxwu38sscfcj16jv2unwru7i2ewdoac2irvgphb5uyprinmr8cs7xtsgcwh8s2edanhahpaqzlujzh4lomfnwxzmajrqrss4zo50s8og8gqc0fsh8udptkxwm8z84qvzvn1kegzcdue7twgbwefqrgrjtu7sexowbhatb70sn3m0b3lo4kwi8d3v854pukpo938rhubtcmle8tho',
                name: 'x25m40s8mlm1fzwx5owl1p00mbszzogzpd5geuy3c96md0qq5ruf2isai364llmctz92jbhllvgtrfpma1twkrnvv0hxh12cewmsafvnl1o6mci4622d5w8cmx7ozji1ng1ujxonowzf004liqh83u3g4hthblk0h8vybv06cmywqssy3zlic06ywk0c4bcg48030jnz9oydxga4w7usgpcxm5vak4b4l8pd9075xrn7fkln95cm0n3bo2ybk7mc7gmtqp6vlrdry5kkgkqoohmncurmlo4t714hm9ybqtf505zfd0247t2qwh81rba4',
                parameterName: 'sgni5ky0qdlwwrevazo2a3ojfmyp6pa8295n3kouljg90eisy1tt42m5cvk8b2qb5997v6zbkxvr0lhdon82r7197m5k65l26q1wx5fwuw0tqy8e5b72u3f2m01lc466tj7smz73tkh066xxrzv2ywql3kj9sd128ch3s0ujxi5dlfmtk4z2vvbhiy12cx4d9h9n5x68889ki411pa480qpgnkig00j7hdytghltfolxznm2eriqvpic78cdjtsg00yahoppkhwp9qm2bwv2xscwykteg5w6wgdi1mxfjn6kq68ozv8ua07tjy6vixo6',
                parameterValue: '8mfnpei079hecyjl910n7sdaq5yyj2m66t49trpx4go00p7194hyv976zqqpm25vip364b20yma377zmjqjwq2q6ku32goaj5esvhr1qi51yal192vch4shczfag3fmr2rw1llhiom9vp91xx9q3b6rdgwblecmqv00z3ld7lxebqpnk4tdegwgls54ikhyg07eko47y8s3uo4po1958dttz7affqeyn039zhj9csto78zjo1cs1j842rxzigpczw37xwreh2403os0kruj9cocvbjdogk2sff0i7nulsrtbevwzlxiwfj5q4zd319dsiz3pj1usgdnod0wbe7q1n60fs4iwbpn07o6izyhjbb877hpfc8v33tt8kvzeoxhb38kz9s9lwgg0d5rdadi80ckkna7xahd684s6zgx41fsub064pvboxalbe9167zp5n1qtroqp7c6huk7rgkrg0dpeuvidslnf5m5yr9o3xag4uyt85x8dohl7elqyj6ffhb22ubz6pepctnz18ymxmgyfzove3zlmp2jknsmf8uebp7hn72buxkmgwkyk91ntffzhwngiyhe1w2ktpf2xma5i8oo5kfky9wtop9gd9q4al74k8qsb756w8gpj3o2wfg93nx2kane0n9uhdk48m0x8v51xps6808yemibdccszdb8u5awrdsxl8m2h3p4aa6bzq58cevbvli11alkhfaqv2prb9p3h8ny5up91jr3v12j7hofttcoa553w4hl64c58unoknaauuca6w0jaanghon5fr1mdftwk9pe90enng5qu7tsprlyjehi8ylt07tgy8ultzrhllnqfkxqc90vylnk6t6ixtu8q6x7xvmhxl7fxr1a1k9i63wsuwoxj2o40vdrlk3g8298wrt2tv93swaevwyvmaxw86azp5e0pd2kb52oz4flwu2mf2ubat1bwq26bmxs4iaftcclprsnmpx0qjab53pcppjqurz2oapri7hgrcim5ohgc1qpd',
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
                id: 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c',
                tenantId: 'a203ddf0-7444-4946-be41-956f42c795fe',
                tenantCode: 'em74ji7r0uxwwwpt7106xxbuberczaq8sdrads5ajujxdr3z8j',
                systemId: 'f3bf36a6-3084-4e88-b932-dca3bcf3ad97',
                systemName: '73q9qs5yevv6bzpwwscg',
                channelId: 'd544dd36-987e-4558-9696-fadb54dabb33',
                channelParty: 'l8kxawrqiiu37u603fzwwpib2t6cij6ib84qf7zhp6ma8mjdks3u65a8x97a1uuumijmy68y14mkvs16zdgd2tst6f3tgb8mwpkuyq0oi9k25xob4kpc4pcsqljmn71lnd29x3pbkvrluw51qr0f6c8lb674s4l4',
                channelComponent: 'jtfvz3it1jg232ik175bjc7w4jlkskmiwg2wfa6uls41gej7729mj9tnno2nzpckgymzjcef9glgsfr270z3o1udsn9gxyvnif37m31jmo7tfb31xgi94xaux356tpo09788gl932703b7mu0kucpt70ajdvz3r2',
                channelName: '1il4lchcx6fugvcqvdouwpgz1snxb048hnjz6fdhvz3ld77jxfoa2ho2bq0kcz0apy50k1ws4nt0ob71seey9q34chuspxbepw3b6rx771n3eomjykjd5ng8c54sxn29407i49gomgyp8lbykk0b7kodjq9uhzmd',
                flowId: 'f2b49f33-e8c0-4475-ac7b-ac53454b523b',
                flowParty: 'orcxq1islse48c86o7douzfgtgugextahtutk2awgltcwtfk8hvke9rhbh0bk2zfczrc48fra0z3wvsmc9zerwljd9dncujfax15n1g0ecl6rblg30apvadgxpacl75vcgn5g4oo6busem9igwxjur96jlvh8vnwp',
                flowComponent: 'pwse8o5qak8x487y6r2figom6epcx4wp8y2hl0ickcxoj1yz6hvaifucya0ez5e201yuf8aq1hg1d3pt7qng4m14orrr1t4x792l71dedxhas443fjc2zk51y6iwdvcnjtxdyymi2xooab6qg79b9erfp1g4yj1l',
                flowInterfaceName: 'lhgdq80o84yiwdweved9ftmz9so7czxyndvav3o2zuwkydckemcxhpthz36965li4um5r1rmp3db5zdki5irz8v8yfukduquasd4lh5ej1qbediig394ne50dzu4cmqptlbtnclfyzywi9nava7yfh7qtxgty7px',
                flowInterfaceNamespace: 'et2xwd5rt2eko6gabo3v721pvjuj5q7kcgni633jgzj8sakduofkht8fypqyuuuthdh5e30sn7zvgz4xuiw4o6lbp8wmj1bxjif4bevxyjndc3bpq9ulrri3oop6e1j9zmlxwdo7srwju8x0m9mlr7aixl7rg7px',
                version: 'ubcpc8f3v48d8hozqiun',
                parameterGroup: '8tyb81qjveva1qk439374c9hznmsaxejecj7m2mijypvl5t4mda55a5ehy16vm4wq40sczuxp5re0uzrxgz3d4pjx87a0j5ymezh8gktcr0swkkirzfja57f4wxdibouzghmcoj7o3q2zol48qcmspgwnodss7pk0osx7x20yyf2jfbgx568899esl28a0kk6yj8cpenf5pbdzchftowu2holhy1glb9mrnn5yewnztp84uzfxd99bp22nb4mgv',
                name: '90pbfremknjzido5bba6w5tsf9injkdxjn7cv3iy0qykblrk61oimobswkzgc9uzm1w02rhbm3c45uyl71hnej49xmg3wnprgebyv52jm4rl6haracodczznc6kfuhrzhk3slbnpo2qujffpflt63gguhw6vmn7rw3tjbtf5drgxql1lbqb9rfmzjhqpysv9i1cw6jgnnh9frtyaccnilar0a1b8pb01dcbsiwrryeit3wgo54qxbafavh3fma8w5rngh7ehjfuhidt2rks6gsdv2bnhpfu1g89k818ctioykq2ibxe2oqsehxu2exjk',
                parameterName: 'l7r7dof5khmw7ngakj35mzeuwu60qq1z6p9456merbppe7srey23j94oobysis62xmtyc9fp2co48ybajdrmzw1t57fx8dbzuasju4rmvie09njiofyoz3toekkpvirbtq18n2xr7rm490jv39zd8fccz81c8bpbo1zxyx5pe1pgbiqjmp23mrq6fvlo7j38ge5hcql27zzrdpk55umh5hfpehnw2adu9hmjhnz8c9dnkzk0ligorg1njdtfhgpk99xz1i9zxw9blw1n2rdnt7dntinzt6186uj1sduwa1iyktsje756q5ejltuwoqsr',
                parameterValue: 'mvboco13rlrhj38i1n11dnxwrdzdrcpns5a6r3qxik48hd8if09dwiba6s4lubtwquduh552c5rkqea1hejn8vhiubypw5st1fc2u9waa28u5yhp8ok040s8reyzm54jc3his39qtff32krt7pjdoca3efpk4inidlzsyt3qfz85nahu39dbhy3ypxksgqtpu8n8qedn50e14hjayyjj917gnpeb34jciphg66sx4vhr66f2xoye8t7pn0oeayp5261uzfj20rs8iwrrq3ljq2xgu28znt2bmievurqc614rolqctmxd3jnb47z0gxhr38tt601nxnlnog1wegv08ht6kd5pqtejxw7ocflx6kqo49m50m8ki08r4mfss0057k8q5nawlomizz28b63vpy1kycou76bd74verv59t6j3hex7tu60ksmwhaody0e6y5jg2j8luhhdjg6i22raeucz1gn1hjkgu0pgvb5jrlo7kp8r4y9d46t5aa47g88cqqvshzwo7wf208bnr1zja87hbg29nba8a3yswvm8dznc1z3qcudrd2ge79mr9v1ck99trf0mj2tj96dwtd2x2187cvki8k3vf319xqm3vawhn7eeoar7o55n165vyk1rhfxv5un4pwsai600nxrl132q68t7uxk3gc0u24lfrniju7hvi83s6saazpowsc3hy9u9q5g3lttlvpifnownd31axkxcief164ox58f4658qx1lagsdygdp237amj6zoiiuxm3yyqsxd080h9owg2v33yrlcjfjnt08i4nedi80ijdphfhdhn0sv90ryiuaibzmdae4jx0li7o6d4uws0h7o559f0njrhk5xu1lf2zchqphqokymttlw8tggwf0ucs331fkj9eio6vp4jd538j2c7c4u55z0db89jcwszo3gvdjgq0k0v2varb5c2oag0y7mzolnkce1vr0lbju3g289cnsl1x7nw75affjcmtvg4h8bpz7wm1udkob4uf2p',
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
                id: 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c',
                tenantId: 'a203ddf0-7444-4946-be41-956f42c795fe',
                tenantCode: 'e16zfdr6oy6z0vftodg9nxjtd9m8h602opw48wfrtctkb5hg3c',
                systemId: 'f3bf36a6-3084-4e88-b932-dca3bcf3ad97',
                systemName: 'j93g9zh9sn540z2vkjb9',
                channelId: 'd544dd36-987e-4558-9696-fadb54dabb33',
                channelParty: 'lkpjkay7j93hw379ilx84kntu4323vrxat0vp0bgysgzjprjipi3c330j0jlbq9mzraz76s3kaivnn7ji4imk81wleai3pfx0pk1o5lmbcy1xf6aadb3lplxrhr5gqhcducwi5o7u0d5s8l8359f2ezms0wjbadu',
                channelComponent: '5u0xd6bj05ypgfbsg559on5bns90jsjdn8whb4a7zwuoiiur145u04abvp9fvawib24l425gfmgz4sca4wyxgo69k6gcr8ix3z15vhfcyqtnmfrnhjcl9mloyvgb1gl4tmdymd0uh5m6v562080l36fmc0we7rdu',
                channelName: 'zsyxfu3xdai69hkrs9mbdg40oqj0glh68qgu8s9np62bjh6f2d46kjildrppxhkxazm7uetffp5p2puchlf3tgdlp5qugqqem6wvy75vf5jpk1wymtvk7eues5jizjlm1322oo8xxtxgw56nymt40e55bnuij4a4',
                flowId: 'f2b49f33-e8c0-4475-ac7b-ac53454b523b',
                flowParty: 'r8viebgyjcn5n5999zl3jofnaid7gcqsvqkqnn0vkosfzize1thrx88j4enzwr8i64dmqjchtml32woo5ix8og9nthe0xgbw76kqpzq7jay564kcz91kj9cu94g63x60r6k60qljqbjzkify00wkdos08t3sh00g',
                flowComponent: '4i59qfam69ovjt8x60xyb7clfnk2bzp1hyze3p2l4m15oi8qet5av57ld17kxbuewoc8qzycbjcuflss8z1tybynwqbqh2eoed8v5cnj239em7faqzaoptciay3vh1gry1s2pb2wkjbfxuyh2mvxw5t7chpkrixcz',
                flowInterfaceName: '76usbhe9ahk0m19yhil73wz914gw5rrwfmph0olrzfe8op1190en61pt9ntsb6lbf04nj14b1basaqmhlbhqtw26byiazbp2v661ly91q4gz0h3wd5ykqkswbo34rd6itflrejsvwt7np9er6t26zseq7vzi9m7p',
                flowInterfaceNamespace: 'yj2w157671xx0lnq4m12zri8uhuvh6w0rxzz71unwpkcivpfo7crj95thdtsqs39jyaokn33f2dqwsig8gplvmhkokbxxq7ox4hau99zko15rde58ep6kfkq46ek66t67ga18zl10usrypddavvib3o2ty6b1lty',
                version: 'l2w9y5xp106wqcg7ch2g',
                parameterGroup: 'ailgrem09oth8xj0uvt4s981ig5t4ga6xew00zjkaa3f5yj8n3ghxuq8c4ofxm3g1mr8ndso7l3oc9hners2bv4f52mt4qtuqgor0zpc4im7oc0nghckjetw346wqnk6yxj1loz8zou0qqdv9vqfjryyl695od433tuoq6qrlq428979b9ad0hmrk3onghxuqzhi7frpgdbm5wig5v1zlqph0n1mf8lt8ru96nq7n8fwl5neyd8ejfzhkh5zgke',
                name: 'uosmy2qmqj4dcsjfkeggr3dw9eq98h0xpz66s6t3oqwv181jxywy39ve611fn10tdb2onjvd4pdyp02e5dozpazf9q27bw8euhz27wnzfewvnt2ia7tkrqujzvycuyoqmrq0hdxf7tgb4hb61782bh4uhuz129e0fwu5bm1u6qzgo0x9neieqnjkwnuf69e6ocd024fyev5bn1wtm9rh2ft9de8fnlp8mm0hozjvwi42exe82tou9j9rir8zyvjwx2re5r94gjbwi8uoildz2fpq8gcgzzbvapj21ckj656too0epeuzlem93tw283cf',
                parameterName: 'l73eskucolq0ljh5jhftte9azgk7oaapyzhlhb0i5c8niif2dwfcm02dsyb32rx7qyhjx8a22psi31afq71rnw1ac5iqoxf2z96yn1oeqlpq2zo1fr3myu24bj6uhca6oeue9nfh3kc6s1wnjyw7s9hs2rggwtquy8jh43to4irwmgdobrdrg2qxibxeipqfo7gcfneujtm731m0c5kwnvhyl0ui82csmy6uzavo5lh3exb3wraqs7o3m9wli9jrjb8k86iz5qssrjzw3bmzpuj5m12kdqwi5np7eqsh13fizeimhw0s7k7qk1hf20s2',
                parameterValue: 'vc8qo8cu3zy9dpe1d7nfyukojpzml7v0inior21thjqutmgemrc9p12sbxojgqwb65sx43cypvu60ibi0ici806ug40ac9fknq5n9x6a32pb0iln0u6mk6wl7e1m7h0wr7k76anwh25de6iqrc6rnddxqp9bmt2x8n9dogd3dclhs77hmnkmifxsf9ji1rr7pjcv6n5skcnpx49cyl5z2v2bi71wz5kq8x7z2mieht649fyk5r35xglu532z9xzkogc3z6945xce6l8wooago7kw5cx5k37rcyjzdtenmx4po4so3hz31wcv0vx3n1vc102uc30pqejyo3a7sas88phlkwkqfw0mlnsucq7xj55sgwhwy7937kqpo2jeqi7yqg5gvm8cmppaxj88arp0zb2w68suj47qc6grh9de8jammf0uhgx9uygv12o681hjpzoyuv7dhuznr9srv8kehm4bc205k46iz0vbvns85sxqqzma1rwibit0bfi23qllitiiyes8hnk5acw315xs7o51la969kgw0nj6rlpxte0q1lxo9x04rleprpo9mix4xucyyjuby1vygsaragh767jgamrxz5vtbhbv9ngomdlxugh6ezlm98dbcrlfkyfcpdrgtwxva35msgh7bmu4hls1tkmbhrdwkkktff3yze1rz7dffvzc2369rgq7n5pjq91k8xc6t043frbszleaqtkgemritir76tscveml74xga83pu7kvcqjwksju3ds4mnicrk5jvdlgb9d0anjif05rx7d287lq1v7b5c4i51h4v52v5u897rucedxnkkxcp5er0rzc1o8i9b6q39sdps1ood1uilyjkmeewcs6p4dvwksavmddv2sl4bmv0bzlovj0k65kb29d06os0az21ee2kh8z9h45hmmdnz8f1dw00sv8ep0msj9y7kxbcuxqhexsmmhskdc069unsrhzx5b96x5hox6944mgk9xkn9fswq3kpaptfz3ce63y0lsy',
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
                id: 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c',
                tenantId: 'a203ddf0-7444-4946-be41-956f42c795fe',
                tenantCode: 'jcrk99vmc0m15bf9ndd3djbvyjd6ylhh7ytn25neynde1xf32u',
                systemId: 'f3bf36a6-3084-4e88-b932-dca3bcf3ad97',
                systemName: 's4zn26fnhc1ig3iqtg19',
                channelId: 'd544dd36-987e-4558-9696-fadb54dabb33',
                channelParty: '3x0ajmiakk011mlgndd0owj5m5f9bcu4phk7gab186qo3yiz8kmmskbpu6jzpide9m6j6rt9v8ecvg8y9owpn9bpq04y8ytc2tdwso9c6k6i8u8kd4redaxwiafzdl4rsk5n3dge1eyvqdf4br0ymk6ya59x2lll',
                channelComponent: 'c9sblfcndjlayr1vyc9nfh6ji3kz6gun7h3kxg22y4qm7vfp0kvqaesg22yimowqvqnfpw9f8u6xpg1m29z7t1vlb5un5t6tjgoaf4pgh7t7zerd1l6lrgq32a338ut6juknsip2771j58lfahox480f5gina74j',
                channelName: 'aubv37wpbw1dx4t916gtaszed15gq1rae7u18kmiq587hfrqaa8lwwqza4lty4i8tiyg5g6811ho9zklvduroiu8cr8fcvvv5th3s65xyrkajipw9p3y4sp6q2zdm4mc2pd5av0vovc33mer9yuwu24zagcah0f1',
                flowId: 'f2b49f33-e8c0-4475-ac7b-ac53454b523b',
                flowParty: '3r4a7bqhorqllzgve8g4asdf97nr2mzkcgbq701ic6yuntspskse6u5ofcimfxwqan77ez2v7lu7sh41nb8kg6bz06cendzmim1vkl16wh8f2ox9vxawzw5j6mp8auebpkwuqdk4spu9wlm1nsz2i7ponqhosald',
                flowComponent: 'sym47a6rx3ru9t8yojmvy4od04jjmxs6m7ooxcd2rc7xfw83au5rql888j6oty8po36er7ua54pu7ov9s554ym25fqqdfwuqtqfz246w7hik96lnl5vx4mrzi2ppz6fqkva522dulspe31per0awtjdsk6a7h6yc',
                flowInterfaceName: 'xk0mro5f1msk5ais2d6gf99wes6mfj2fecdg9olm16gt281vm8c6c8xe0evc9zrghfnf95uqtmi72zaqzd14cmli6hqo1lxjuf53rutwecj9hp6ce2l6pts2i7m3lg7u3zy37hbxphpxv0i1ocqnpb9dpd45uokjx',
                flowInterfaceNamespace: 'hx83q9eukup6gqmismcqkbwon0gnbggq3tlsozl1xw3hclnpnphsyppgihibn5yu2emzniwziewpktc98k6bw7da4fv4z89m1neauozjfi847335k210e7uj1mxnmzmbpcsw7g29jsvzj7qikqlfzlykc8elzku1',
                version: 'wk6bnbc4bknxnd8v6jfm',
                parameterGroup: 'tg8obecom91wcxi261m22oj8vamzwwczj72sb8gk4tec9memkor24e38pctx1zxwloblywiqu61jufu78lwc0qnaplm7jhkja3d1on4cs06e32ap8alu15709e16ndy0ctnr8wrppydd4wtwo18piwojvunci9ey0skv1jhyqisni7dhdwer45gbn74bic1zsnjjshnr370notfrvm7xzudl6bcstg1c1fszmzbl0i6ni8fjtk61y5iy9ih6lsl',
                name: 'zdd650ea83j9l6dcxa1tofqf8c629mu2fe1bllvikrw3kxva43nl8aoajm1hv7vblyuvf50ypf03s0qdpw9v7hnnpbbbek42condogtudtx05020q4tomg5nmcdxsnyrt72ojni3v3os9ap94x7emt9ninqvdt103eac8kdg07y21wmpbjwq44k5oy9rqokme8phqknouc81oury4x95tyhau1awojgrlkwd6aouq1xsatnv2kytn8hewurdkmwlv30kvwotijzu52pnt4axtp5djughrc8rs5tsmfkgb6b74v2i3haqyewxot3n9jky',
                parameterName: 'x8a1li3tr646ht476nhtbskvdzmemozc15dizfgemot7ehb4lxwsqzb9sc0rkvxxs3nrl6vh30o4h3kd7mxqpafi8uwz9k7kc7r98jvkfvstlnmzc5ieykfd49slpa4wew7ls7kumdkq0a9497uuxgzyw0m4nc4u9ehvd2ix9sac659um72qxqayppyykm2zac6vghbmx4r96852dmqj3ux4jvoofhin4k5gwmc54azjibi2ux9fu0rfqljfvafyluhclm4iqrwqf3dol9har1zpdh1ndp01vtxzgmzw7vox3k4fqzh4vcwg7tdxim91',
                parameterValue: 'pry3cpmuykmow6xulshvgaw25t8jfoles0hs9fusm4e8oyoidj8huxpssu674mzqbnh0f9iwzi5sdu39ikqb6qdr9ylpfwo4z747zzzysxijuq5el4xzo57obgy6h0i2nydaqutytvl4c06eqd54t1wdeqiig15nkeepm777ico3epe6492ivjc7y4krvxr7ouatd6j61r3d0gbrvmv3zg5kps4cv6csn6ucd0fkbffgp8axf6n7mlkhrixz1xgr6nxvk1e4316xwumf9zbiv3d94kifyojqcvphczlpoorwk4ac2gk56uswbrrx5c47pzsjjdv8lqnuxnzrppmwsy8vv758e8b88drgenravv8h69wh5wf2hjf0v5akhe83v3rgiadozkiz6sbvd9pfqipo56fr5lelye5sylmx02z2fcnsahy93gtlngevrb91c81ystretimj5ps9io3aiakag6860m6v67av7if6troyobn7qdb6u18tew6csx57vjij0nk1x6smqy82hznblf28u7eqg66uss0tcz7aiyfehji2bphirhk3jihjwnqv27m0ua13te6lbdt6vlmbsznbenup4ycd61elw5p0g220f16ow05yf20qqth1gh83yoz90q1onkjm57t6bhockfmcbymez8310ko3d791po85xpsv4aflf6w6jx2n13hdjf6wc0vov650r0eaa6do7hejlv8y6qmd3acrxd8xo8znv1srqg3bzkjd2ogbnj3lqg8oybmu8mbtogycjn5yfu94fi1v9hvkfar0bi2q5u4p9kaqnadswrovwyc6p1aylq1q4nbfac7ilrb50cpjqjiehjcb4c3r73j32stk94de2gpbva6jckwjcmoch89vx2cx6o4lusogv81e3ylaow4e8unm62j34o6xr6pceuq7l7ygxd9qr7tajb9liijo879rtovj3r4e0tqaaaxawhtp6h6kknni6wg8nu2ty5by7gavcbrg8yy19ehlx99j',
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
                id: 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c',
                tenantId: 'a203ddf0-7444-4946-be41-956f42c795fe',
                tenantCode: 'oz0q12sdpda0gk221l6nxs8jham8e5tga40iwzkcdvzxwvau40',
                systemId: 'f3bf36a6-3084-4e88-b932-dca3bcf3ad97',
                systemName: '45pxww8wi4ob4yfu0jwj',
                channelId: 'd544dd36-987e-4558-9696-fadb54dabb33',
                channelParty: 'qa10m0jyzf2ai0ld0ck07rywe8siu2twbwjp7on5nqq68p36a7h2tvsrxjhcbua51y0l4qm7omr512n0wr9extyjcf8zx6vbz598mxi68zibric9zpbvgi6zk5a44wq1g5kr3u7i3sbhcyqnwby40kqhxvx0rfb2',
                channelComponent: 'u6ubs61u8ljcucuaa5y137ognwfxm9ckul0w187u7hljuk2hush9ufowrp64cxr1u60jisksxskqal8ix2ksh5e6c2jnf9ld72oehmcfs5cu2zxml4hdu9t6rkx17rtc7la61zt2opsemlwcqiybh80tgv7xve7h',
                channelName: 'wm3f0ixe7b4k4yafp1qc9abi55pdtwhk2ti99q22emdolf3njtwk3zybgri5t6dpuy5y11j97uzwq7pquoea1no7tx8of3zbfl1zxmhnkgaia3jzmadag5d5ktn1u4em9e4nkwbquxu437oevsini5rmbwn60bsq',
                flowId: 'f2b49f33-e8c0-4475-ac7b-ac53454b523b',
                flowParty: 'nko8drsg2aiffhoc2x4n3wf1d6avhuhqpjtcz849ljj28dle9pv2dmao62cu6e3tp4itl8npxwtw9zqjfbs0l210m3vbr416wmzldzynqi84uczaju232p6a3g9vz51th13dys62ubgpkb5kxlou57xehsna01nh',
                flowComponent: 'f8qalmffdfbxs0iapnwee1vyqqhano9kcqlnxm7jj07atohyy2r3jtdteu4mxle59jqaexuwd4el90kp90xke5egg9hp2b9cupeym6hurhyategrrclu3zqznyma6bi7w8zsrbw4swqda97rhh3ubq43d0yf8qnf',
                flowInterfaceName: 'xg1rdvcz2ffz7t7bhq6b2izm4am3x6kbhf7a05vx31dw4ae59w6ygtdzy5jkswmx2t5puipn6041834zz2p0dk879ghmcaed9ha2hg13a8bmg32hdztr9ynjkoy9h1k2sn8bbbivlpgsqd9phwfhk1uniph8hx5t',
                flowInterfaceNamespace: 'x5h8ym108lzm6yomr0tyhkezbosw165748ck5tsvlyylib7k3veetgtv57wd6hg5qv7yd072a7t69j5zot9ej88wupegbqxcyj8zccmkab1nyvniav3kbvpltuum7kpg2q0leg8lsg99pp5fe00p3n64ajw0pbe8v',
                version: '4k8ydpnd6su1x2im062b',
                parameterGroup: 'tegdyzmvcmqa2f8hx5ivfio6yrusbt7oi7duoldqxij9883s5mrxnlffaqamsgs8od7h5txr66idsipr41f4q7jqm4dq12qoixmbp1m5rcrljm6k3uobcfv2qc8h2chck258e44z4ydxgasolbbgexeu78ve8x4u54t6o552sp9yuciykc9ti8tgydpxinsz74lqzwazuax3hhhaqttb2htsgkzjaenlrfy7pw6o2cfse9j3ihv6d1j35qur6n4',
                name: 'w5euquhdffap8s3ll5a8vucu3aek2pg8pcejyoq6q8o1r696ugpd02151gvhbfrfmhxey0m2uzm6mx8u1z0fonqyhx52rlxfu29q2rofhq3idvb1gvzfiukfts6lie18lcg0bn4ww2kan5q9gs9190cl8wwfr4t2tlxh03cmhxhjvzd6p41quqbm5lfyl8o4hyr5h2od5twitt58y9hct1tcowz8ppbci76yewrba0aq2jwz1wgz2ijxk317yjy3qq9tlne7jwknxrecnoumxa0fnxx0bh9yf8vk1sznwqufzmwk1p1r2d81fomlgbm1',
                parameterName: 'pq2499f66lhvubqqvgr4swk7oixcatjbmfk1tinwb12k5fgpx0ng5au0rm9u8kyzmbdp1tztrprdtug9zqh2uomg71osoxlrd784wphap23cm8j6rl5gea57aunjp79u8k1gu35f2qlmzpx245qnqe544h84jih78of1r2t0d7v7uphbsd9e6m9pb1exkku9us1pf750viu1b5eviqwuritqtsru4n7d23hhsbtoej6ea096u8w2a1engmnoqbe2lgrb95ig86pj6f30o7fr3yj2ymnb8qfo3cy07u5irndhqc9eiy5w8o364xthlf2b',
                parameterValue: '8qk9hnnm01ngrzmh6kbvd21smu0lf37iviggzcflfmy6l1maikcbj6t9dmmngxg4pzzkehrzfv3nc0tuv92xv556dfzzqtm3naj5xyuor8weumvgr94b8z7hclx6yar893qg4hdbxfk3kfilvjq3zwz1of8yppjipxr69drn1gqoriiqlk4hnqz15x8nibfzuje19ibaulyfxkihplls5vnzd9jgy7rtafpnrs02xyicy34wwyrai8ov2guhciotort2swnwb90ofgdylgu22b7w5nhbvgznayguq9ukxg7q2xwmq4muiq7p7mtroz53v1z6ym3f1y2f8p532f3s96wkmhvs0dz6bek5a0wvou3alqmafcojm0sedburkzwx6lu2n8i3ek6jfuvarx1wrqsp0fv2f7hpzjsf6jk3m5u722fquetjhijmgyqamh8uau6kukaxd2zgasbqgbwx5c84rypwn7q2ks9w30ifyrerpz31s81znwb3n7u7rf8p885joz806ik1b61evggyqo0mo28mknis3cl08l2p2wx9d7o57g25db6yrqkydjewgupxdtbhun7yvh49ygbvurzomlseaumn2nnp2mwg69iaiqcpeomiof6re3dsztydxvho1ev765z0j4c7ad9kqvqso27pf5gr0odll7nbps566eda851jol3ift5lx82c69hxx81j67zgxiw7dl4uwh24568vpr9pb6s3s1y339jn384ytieinjkqa9q49caylz9huz6c3fsaa60cw2pq8kl3o86vfv9yfkc38m5vx597vhd1pwewxpv10j8iwodndnxzscklsbhwscbq806yjwrba9oamigri8n2iqcfu1bbsk4pgevtj9tnsqcf98y7gb7jy4u13xxj71m09dma5wbp1zytnpt71wy0bqydy6rpdfrp7km1i8p9g5uuxphxg3sqsw6bw4eyhilkjjswv9x1swkl72n1y628598a9tpc1qya96sd3ix5oboxiy7c',
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
                id: 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c',
                tenantId: 'a203ddf0-7444-4946-be41-956f42c795fe',
                tenantCode: '2rhzc5zex3lko2aji5jggogkf9yqafa0lr3cxj57ol22uyuqcd',
                systemId: 'f3bf36a6-3084-4e88-b932-dca3bcf3ad97',
                systemName: '2trh5i3cnvvts7f4iba2',
                channelId: 'd544dd36-987e-4558-9696-fadb54dabb33',
                channelParty: '7czfurqnha35id09xa63487qw64yiemxhtmphcq5f4fwc9etza1dg43zpyn0edkzcb1475iwf716izvx96moj9zfcvnrvs08yfrltf04apfyknk3vc6vq2mevfk2ji52dgl1ucr4gztsjj7h7yjb9g90otkepb21',
                channelComponent: '2a5hb726l6oyd7ezr8pzagdqxxmlpqqhain9fmtpjb93vvsjwl2xsqj80x4wn0qojhku8whdhzxfbylt8kldslr54xt5cjxhdez2b80rs3br01pk1fgn5ur90ph02gch9jx2jgq751ndh7u0p6q7pt6tlwdxoyvy',
                channelName: 'ip5fen6kbb5srqu96bovs3ep9nmya5fsypbzwoytlwkk3zf20n51zi4fdeuqs9i8bxs625wnhkljcc064zbutxxvwe1hwlhtdchql6zhju8ta4uvx5nki8vh2hwmnjfztdaovnv036qmmhwxponqr5ehgnogwk0y',
                flowId: 'f2b49f33-e8c0-4475-ac7b-ac53454b523b',
                flowParty: 'hjhps2767c5efeidoccyd2apo2pwrelw1tho0n4e0qf3bdpqz48opudtjsavvcnt6iljz5ltop39t0zylnbanf2w6wg25w85js1v43977eoz3ox78zlmfzirz3bm2hl3lpo74yf0xi594rko2a8c36malg746erz',
                flowComponent: 'oan9ta7izuk7jhp1bcb6hg6zewe0yfmqxvtntt1mod30wwptxw1whwgk67e5jnfb31e4rd1shmyynauws1qq0xq49m1d9l7dp60224pb16es60k4ukdcu3whflju1ohvwexitgh32gnv49lnaozuixskon2ap3a1',
                flowInterfaceName: 'uox22zod5ap5em157k8aspy15i2w85n3y4kowhq1fz34lz9wlqduuqzrhrr4daxu168azo2lkgjxrdwjgeej3xuo70qmo3gvkjo8jly1zm0owqpxkj5254j0bhw28kunqfvxzrph6q80qd75b8js14w1tuf1pz61',
                flowInterfaceNamespace: '49ltp5qhyrki6t6x256xhwj2qzk6rtvc92txqr02oz3v2i5nfkvoat6xh5v73xoy1d6d8habjl0owv2qlcl1i4g4dadeht89p4jn58zkeal2venhbxsr44tmxol2hzq644ncwzwsvzn3klgh3ftjrupy2m0wcsnc',
                version: 'nfy47o96ic6cykgppsv27',
                parameterGroup: '6zjnpdivj1su5ojomlzy6o89h9m7sqhfsk1k6f1bdtkbkf6zkyp99gqxcopqmh15ey4ras3eicpxr0p283hhiq4lm4lnejueyx8epmtug48hlypmeofsw0c89gqek3qfevldhihctgitrh8m52oil8gts83skqq8tdbwxjm0h4a7xvvpyovtfwocppl6ptupp1tkaaby7o65j4qnf1u2fojs5ubn7cjyurn7bddxs4hwmhlrndmvt1w4cds6wsl',
                name: 't0mmnn3ahwd4xscd8jlzab5tx72rlxr26fq2eo8wm8uettd91nj6qborwmh7zz00jpzfufy0a0cmjfwej5d9vtak9ynzfdcayfahh8d1n75udfcc0yrte85ngr3pg3t7vfe8ofpbnbxum2zf6ymtagpj5hregrftpt3bvll2tshmni1i5f3kf9d9dw2u31b9x05uwmm3491se30ubm3d0muupy47ytofrlxgv1fnbtl7961rurnd5ls9cpp92yl19pe88lt54bvrf9xof9qazptisb5wsb0zfeee50j2jt4s616huz27g9lq54vsdi5n',
                parameterName: 'a1veopeeramp66nxn01oxwlbg7dfq6jcr168gi7ibtmosg1pryuufge8k3gy5ful22py1ea9fzf8wm2vrfm83y348jtwuoi543hl1urr72eiuzlbd6rswqs3x8mw0j1bvwklw0ysr8iqhrpaztb4puxbo0mtli6dx3lwbhxtlqd16afxucnh3bjp7fwl5u9u7r18k038uh8cdu6q2qqrmcsas2vl0bjnlm98vt2zslrnt3lf36tjtqvs52w499mg4sydz6n1krc3zvjnkxt9qqaul7omqe9l2ajjda09dhwpqpjz852rh1kpqsbtiihv',
                parameterValue: 'h3izljmx8f88mwztwstaoj8phtfx4nlnz1p4wm6p41iali8dld7l8he31es91ojs5mvangq7oq1iqitxxul43mbok0m54i61w7npzzpucfcteeo2mfswqr44idjzr2nxqcvh6vz91m3f4j9pt0c2c7n23vogtetjtelrjbfoiazbmm7y9yf1gwbtmj68n3ov3ez2q791uuh6j0vjarl9xl5bdr0hjcg1zeagktt8w4qmx7k29fyox92y2pgu03f78w93vld3uomesma8pgffefsxsuan1i3w20pxitt18ptgjbp2tpjnxktss8yry31hho45bcre4ko8fo7i0djea3y0mkmou9ahaqnara6ynl23yqlirxmlve79vzdevw2dqmnr2mxcrodfzhpd3euqqtxdqhnweahcfsvhtjxaahypr4l937o1y0y5zqb5fqqlvkpveosf18whptl4zz6wl6aa2vjqt729irnj6g5iwhim1i1gbayvxf458k2hmd8qfth0ud8rlekfjle0lnscewtms4793d1vt61ogvw7y3t7pa6zcrimu5wt5vn45j29bzbxatayxg2s16er16jyr1mvamiu774enc966o3loojx7dz5l2ws985hwdrlx2uums5iif0lyz4ebhj6t1xu81980tmgcvgejitqoal1mt2rlefhesg3quukmh0zijk1pfum4i8bj5ky7mchhw4dja2oxeqsnquvz9hmaun67qtwlsuyj5egp0sgiuamxs5pec7603gcqbuakuy72ttghbwqigfynumyetgcec175bysb3s83uj3j0q7hz2woz42ndobezzmyjq8g8oxkoqeenoez4e3luiqy0gpd4f4uuglt1hyah4cwst5zgls4k217sq951lp6nah8c7s688jowkse0kmacst7wli2izlrwc5kv8davpphsj2v8unsvvt6nc8c3dcyxyqwxsuu30xtpmxysje2etl3xjzbsa188boadrwlp62rgtflm5vbvqy',
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
                id: 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c',
                tenantId: 'a203ddf0-7444-4946-be41-956f42c795fe',
                tenantCode: '1ycwuk734zi30fawrmouj2c7euv7stvurl6kqofu9im9mqcjx0',
                systemId: 'f3bf36a6-3084-4e88-b932-dca3bcf3ad97',
                systemName: 'b5g2mkx1wvd6pb3qoag0',
                channelId: 'd544dd36-987e-4558-9696-fadb54dabb33',
                channelParty: '4wcdcz7vubcd7drj0ftyci8bfqnfmdo1j3ng0kxua3wzx06jbr123iohqsiilgqoj6vnfefivh9ru894d7ktitxn8hz0024yq1jjz48bhqcvt725odhity2uiiinyi90v477ehsg5wkyc719og6yhopkqhrv23fe',
                channelComponent: 'k8crgfkna7i2h5uzlel90vrfe91nauixwzfhs722l565uemkea6ofgzmllornnybsfbeh8xt3zdhn2hourszgqy0ivvf0jkarv4sh7hbuz06irrhu851icj8hchg60nxe1fgild1md5mikwx3yl7vpe2demf122j',
                channelName: '8io59tzsd4e3nno35lq4ald9ymzu5uoraccfknahmv8j6bx6uvpm0wq5djkmphiyru3rca8kyjl99dmvb7n071fnhkeyk4j8t32w93pefjj3x0atiig7q8c5s2fufn42bsq3yfe5jwcvz63xdpj19vswpzg9appu',
                flowId: 'f2b49f33-e8c0-4475-ac7b-ac53454b523b',
                flowParty: 'sdesr3sqrnydut7i4ucmlnan7pja46e0hwl01uqlxk7788ftv7t526im51iasbblsz47yynd9exccukjtpn9bl8i6g61y45unq1p6xnkx7ijv642mpvzs5ehmjxp66qte7zqs2l3thjyp1xhoqwv70uxuf3cqb4s',
                flowComponent: '36idkwcm1mq2vf81l8gwg80tdzag1kuy9txa3an3n6yiuph2ers0dldov9vstt0lqih9812ogdz54odor2zs428f1wq15dj1khraal29xyb7zfjx7l2w6fif8g6g87lahily54rr69vs4a0vyvorkv2l85fp6yz4',
                flowInterfaceName: 'iaqwuy7s540wud7dzq4aa28t8s3ags17fh60q9b8j1i95ra020lco8mdej4fcmjwxlmcfb5p19h6odaskt41m3s3euvkv01vdt3n58vtgizwl0rctdfxbbjq58d12nx1ygvjzqsa19ruqu9wh1uecpy6x6dmlv92',
                flowInterfaceNamespace: 'w8tvg9m01irs7gtbj5t6jt0ybxre8vxp6t4gqe7mz1y7bpr34apl925sbyb5gy04djw0knqocrwyrh1odqw9ir368k8z0ico6ulfp3h6mm9066sqthy0og5imq0kr2bh1mgfazivjn7ws41qbhix4rle1qm68y1g',
                version: '001brzi0ns6y81x6jswt',
                parameterGroup: '849z1xzfr639ubrtvibo9jxjnyfzc040js0xsn7dlyfxyx54xkp2l2sgl7s4s2l29qc8a5cmhqrtnc54ukmjjp1wrsx4zs8qki0lx0qkhjci7z4l7giwjwbysjs9jzljw4p6nj63rzodsljkr4xj8e7tebwt86hxj3vw1huogxcdr4vgz3zla2rj8mah1qdhhk9of9wb0vi1jd0xu9x4t6jdv4k774pyfdofagjzxnygr3n7t6jzpe7k8dizckft',
                name: '7mkoth8zul48a010y0wuw2adgvppiyg9bl0pjn6o0xpyeo111mv9vrq35gdnim2mxtu0fu29quf40hbkfny0tpeb3hw2m1y6da0xxpec8xt6m4me415k4hc054uiwewhqnkf13xe5g0f181w4pz07jhd23to89jwx1osclpc0gc2s8tx3ijze7av6y5id7elgsv0hp8i7ge7ep82hx7n9uaerse238sgf4ituq4gpimi4hv34c9lx6z3kbuoyhcb1h91pely5ha162r35gceuouhesib1m8j9pey0yu03k7dq5xo1t7irb6v21vrx2gt',
                parameterName: '0w7ucm6e37tcgn3e6bojdqig1otlfjx8q9man21i0wsaoqwbwttx0ld6xv1w77hmabjg7yea5cecs39kwtmtnos8fzp2wbgtezsp11fguv83hkx7kl291li1vnwjbamedn7lqbqy81ycarvybcic190600yg0uh0asvfnsg1605ne3cvtm2pxppgjaag4tks7y7a72muyn0b3u53kkqw52vtie96udc5em70wlkwx7ikvdm8t6aolr27zp6csudcfzh4hmosb0r6p7c9p6ppqxayxescv6hyu8pqia3jxc9hr56gyjpus32q61frogzp',
                parameterValue: 'ndyzd3g24ltij7n7i8vdsnvl257soqz4lryaiejsbdfmj60advx4gf6xlq443gb7z6to3enfqdmym104kcown6hidagh4xdhsmmd9dcghum3s8p6ouios8usjf79k03xhri36jlsmhnohve6f8sbnxr7d9fn0li04mepyb2yanbicoip2dalbymq17ke5xvb2k81s0lymzjyj1jhh6ng9i88zmcke05yya2qqtqs3e7d8simq7kvs0htatp99cb3rc9fr1s4x1rzr764nw5ha18med4d9ofjl46824uuwjrme2mp3wm910717r97jl4lfbwn0pkssl6bx1s3k7etx4s0r05fm1jjm6gs8y132koixakx84bhi01uasy1ss3u1fvfqnav9fqk1lgeywbdkpq89127apfvsng38ew628w8sxphsy3uucugubmx5utlgx56imf5fb0odhohx36yjstjbg8ff2ntlhpzydv28ryfy9uf5hy9yvxv800y4eaqmvme67l9qeh9o142jf8vn9jqz2lqoctlwznk6ymzu1zx6cubnn1cgwebgxuohw2hysroseehml7q10gfnzptb7wb6yvpm3yhofskuaxm9xkaqq0zj7jeljrpbpbla0mgxajr7gvq3j0bigtiewmv9m73tmvrr6as81jb3dalhc2uqji89o9m4kypg8tzilcubyl30yne13kd5zy08f6lqxv8nw1ddpjfoq3332fnn2enze483ps71pcv1dou6wr71mhs2skh2qzqpuekhvgpxtsypij73774twte3iukcfjfadgjratx46bjeru06fkbnv4lia0bwge9g5igti0tsrj297tbmjiedii2d9nci8t6u7n9irqj0yjmx7ajswtsqlgi45k8ozmfwsac7w7q8w46nfjawl1dj73fwhltxvcngcizk93r21m974mqcn05fl90cwv5bhrk1zoe9vzmm1n0q1ozftjrikgv9per10scgen5wkg6njsoyjc3efdb',
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
                id: 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c',
                tenantId: 'a203ddf0-7444-4946-be41-956f42c795fe',
                tenantCode: 'r7d7opxlh7ooiihy1gxkttgbfm1ij81oow3s1fa6zikizuugg0',
                systemId: 'f3bf36a6-3084-4e88-b932-dca3bcf3ad97',
                systemName: 'dcwgpxgojj0fds4ge26j',
                channelId: 'd544dd36-987e-4558-9696-fadb54dabb33',
                channelParty: '2d8oe9jo4byhpeg6xpz1w16sqtjg9skfcu43yh7zl1avxmp2xa6u63blu5fidi0v4ein3col6vvtg34asjpv1g9ya75wjhix7y9v7151809v7zpgq4dqfrm2lf9zx0wvpz9p0i0elxtvkvm8tbbhjw4qkbcwg3mg',
                channelComponent: 'zraotatluid0r3941u40kw9246t8xtwyeqbsrifry3cyzbez4whgq43m711iwsd6cy40aoym9d2w4sbqxwbe9qz7mgnw0yw0puhl95fegv16dt0sdsz3eb0aiyamrc3vkknjvs68m250izjhxb4kok0aou5miwly',
                channelName: 'iu3l0falnvdy0gddq6lobxynkowa97x87nubqidjhir5u83kjf8uubzb0pdeqq2n114nh81xhf63ybm8o2kcxsy8bsabrk16od9lv281vbnvt610j7z36gi7yae6f4tdn0wzu0o2pamglty7mrmp6pqcpnwe0vqu',
                flowId: 'f2b49f33-e8c0-4475-ac7b-ac53454b523b',
                flowParty: '5dwps841cgeclup8jlxhc8ojl0v8juutvkrnt5hmjms7jdhrx2xl2ewzgu63x766dj9zquy9418tgi9ko4ek123t09hrgk8clyvig5gwyfvb4ypn7u0qy3vey84tilqtqqx2gw4514pwyt7avcn49rgpwvkzogvr',
                flowComponent: 'r72rxzdsu83qxgvkodvw4n26p064o9q21zgpckpdtlv2x3wzrtnxklu6s40ozn525dvk7losvi8av694ihf1a3winrsauf1e0k454phqrfcmi0v2jjwnzxdwee7fttmxept1au5l3jxhw5if7uckj6u0qvgagsi8',
                flowInterfaceName: 'o0zkwkp0vazos6iedao5obxix6arbf4txs2x1360udmu6jm0f351imtcro0yqt7rldrk7gvcli47ml3uysd2yisvch6lopz39e9i4ptsga2b47qc4leyba3nvc68w4nwvgsd3lhlcas0bcp5m9jvptlyl4lmfw0e',
                flowInterfaceNamespace: 'ar5174jykhmux9avn5urhig13ob8yyzimjtt6vrct16zjodt6zk8je3q0yvi8tqhk2kw2z3q49kmk35c570v2vgxj3n2v40qcijq26slyba4cfuc5mcln8nw4ziasw1g7h29s0j50945wg0k10nod06h90hz65an',
                version: '2ovzsegt99kfa83t5ohp',
                parameterGroup: '2zwr8k38xmvlfl4rk563v9rw9ggmm5atgejdo8fu9v4baibn6b59ec0w3n6xpqh5du9isx9xops3frffdzj2wyp5lu9owc5eun971d6tfmc92qlgisym8xz1ygg7br7pb0liygbc9cmtjokaazin6oioot8i3kyo14i4j1tdsyoyy60yptl410lwram840bbgz6dzepvnfxdmvrczpqlxim5jg00ebljo7t0jsmih976qfx61g7cnjbtw7p06f2',
                name: '5zblbjkf2nctoe6094i474b2v097ezjrpmqzpy944hb15h84qs45dy1xealnbl7i5cz42hs6dog6w76fapv022g3mxjocyutu7bdmo916eohze84du3wfc91g68jvvz5mc8rmsu4uj2q2rxyevrru0dnk7o98af8bgbb9xhao6241qkbztduwo7hyewjq2dqyaw2ijpswx045zgk56mpvnqzglj18tyx58sm9o8izt01jsuhnmuvlea0e94nppqaudf28b3n4mu3nda6icz7nnvvs94u9694o4e0565c3k6rm9xqbshdvvf5ovnato697',
                parameterName: '73asbweyp6qp3ybueooi29oin3r801hc8s6edfxemvplls9604j6fm27o68nn02cjmxa4f2jq54w8qcn9lpimkrz6wtwc5xetz8cfjpebhtad6imide51gw6ap95pw3om0hqmw5y8dp0n510xg0ccuaa0f3cy6yjzmvfmncd0zrmuaqk535jib9ppwxnkjfqirpv685w68nrgubpowbewf7sdr9eo0p5rjetx477lx9ch3ixappzyqyg0x31qc2hvjb8844kfbzw75wvqzb0rgwkjql93kdqzc9ag4183ws8iobm97vhhqlgtv89a02c',
                parameterValue: 'mjrzebrfezsmpf669gidetfmxeh8wz6qeafpz91e2rh7s4lz7mz2qto1cwbxft9npp58vpuov5x7lc14uiweglmhirbqxvp6nsydhorpgtxcerf8sz8z5529x48lqpeeszsuhuveitimcafi79khqoyez72dck1dqhs5w74bpr5jsxbgzzx517qptf9y5shydyo24c5htvxqpo7qcj3ifm6sr3gh1mwhw42nlakv98dqur2o1z460lhiy3ap126h3iwjcmupamz6280wquisz3fworn85gw3nrkt0gkflqsernvbb2x8v9vp5s6mv7vyazkczjhmuwcq3sauq4rjlp5c1xekwtmxi4gd4i18k08tcuvcmxq7tu278wra6znhyq1655bljcrhppbf3j7osowbhx1f6bkdeiekvephfxfziyvs72mtsjrfe0lnys3fy2mw5yy3vcbpn3kw43oh40hvn90cpdax0jsgtxkerx3ei592nwcj88amgir6cv2kg5wnq09ncu3inhunv2msshxz45218hqyaulw9xtqzen83c3mlygymnvliq1eky5b0sm8fjmfsxykdq1izih9gkkbpgkvd3tzxkz3prljok7fef1sli80dx4t3v4xvpr30ool2xyzitflg3gcefpxn1xi2wnyky6tw4dffchtbxl76j11iw8089r01a0neqw6qxm5t918sgo7halukprm5x5nzdexxdd9eur24ah5vp7zxilm4w4l9atj6m65wxbszvj2m2cw93pnjwd36zrsh24bato2l659gjzhsq9uke631scbdbwwvhpkhytyj8utb03gq4kofkkvxakkg9om3scyuvzqohcj0tg7f45m89hof8zepdz8k285pank61p7uvmwhdj3647fu8esehvi8dkk18x1bgw61y4j9w5a91odrvg8rienxttjbryytahp97d0poi84ztt3gpb3w07uo42w0h6ex0ngfqq29y9k2l4kb7yi36w1775uarmwue6',
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
                id: 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c',
                tenantId: 'a203ddf0-7444-4946-be41-956f42c795fe',
                tenantCode: 'hovezjrnz4henll0ip4l988pdx785lz73ru1z8mb9r7j2wzy55',
                systemId: 'f3bf36a6-3084-4e88-b932-dca3bcf3ad97',
                systemName: '3w3j0r52ktug4o3jolrp',
                channelId: 'd544dd36-987e-4558-9696-fadb54dabb33',
                channelParty: '9zxs9pkw6t48l25jqc4txwyhm80b8wugvrbj0qf0ct5c3dog0nba5f3svo99hfp46smr0cup7zue2615qu53syxkk08xzib3stwdvffyfc22v1mbpo2e7nfiyqhwzbidnks55wion347bkei7u02ctm3xj5z6v5d',
                channelComponent: 'mn6dcdrwopd2wii10w54zsc87gtks676pebavyt562m3v6afoynx139zysmvalfi2am0toc4nnb5aoqm6ljfmdnmyuchazqxi4y0hm8th7b5mwzu341i34nrhfasg8w47sfgcvzv6tq7tjbfqh70yfltvs7v5vvb',
                channelName: 'mcpilrp3ssccney4kusl483j8wwdnr5ku976c6pykygigz50owm9l9w4n5f1kz9fuarwxqja9e6lrhhck6y8h6rf8p93i6ega1vtiv3ypx3s2538pjhlak0vwb7430kaak6cij06c72immykp4gk4zym3kmyqm9g',
                flowId: 'f2b49f33-e8c0-4475-ac7b-ac53454b523b',
                flowParty: 'e5iiirqpfmqzfbg411rqynyswxjxumdr97d1324dwrbhbn3rstn14r10uv1ye7vqquqsb69i6ap1z8psp9865rjn33c33zxxq9mdo9y9ory4ntaryw6ox9lbjuhzumqjwneh87rw133qignfrwnw53ccxac1sf6p',
                flowComponent: 'yxrq6m8tiie21r61ea830o34cvg9x3ebs76npu3q7ofen65ocxy8xg4107ey2jtjpkjendz8j7srq5rf4wh73gxhbkq94b8oklknudshu6n97h6eovl5quh1s3niznrrjvgitapyqrli9a7cztajlql5i6ww2yxe',
                flowInterfaceName: 'yobekq2ct4u0zilv1n6t58qsn8bku6f80xtv8vwqazf00kivuqlo60q7d1gg4qexcmihmt25x2g0l4zbezyqfia6x2n3zlwhpgvmxtz2ajbrgukdxlcsllb1agczdxucu9md3x8zllc0alac36xan7ffc5ynd6ps',
                flowInterfaceNamespace: 'hv3r83kbwvhkui33zmz53v7cb6hsy8705qlk7nld03l7ugcvag0w6xi12auheb2rgyf3bryfykk4z6cnc3cafpyrspsd5z32ncoqdt6jgiydyf91w65wfw54ujwiumce9zboj3tgs4qenac5f3awl2xepj8b84g3',
                version: 'rcvg1voh5a6tsvxv95jj',
                parameterGroup: 'lcnfioqcfp9mngzb4amimqorsc2ouaexpjp7h1g255hsqh0jwg3g6gi4f4x1wijrpk57981a6f1ha3ana3ydmtuk09klkpgqhcvy84od1gno4sznadmpv9ygvc2c4gtjv860z089z70q0djop0m67xoid5gd7hvthqy3m63prukayrzoank6unn5gvutkspqsdc3kzo11kajq1ju64our4hqtvlbecq2mtfvzw6fn9se3xgtir3b46b8ckkul4p',
                name: 't3atva3ogijgzi05ersp7pre0ssrf8k4cnii4hf6kzfjsfxpmlkr86igci11gb1afmcabzs7x2c1jcgyyqb5pw5r9junberymc0uzna666xehfvv2nfnmzuh2kxg1sekhoircn6l4hpyhmjlbhlbf29hj1111a5l8udrp15rqz2m2004p5xju8ogou9gbvk8xllzg7qw6pr9mcfbbsywg6kio96fhjhrac2nrr3r8112tnov8pcybiy7krsxrippmw0cxddlhhyy7nuxnw8z71uk1qaorp37wftn1olot8hehshmvfkczzheu8vhuv1d',
                parameterName: 'mr3izesu0njlwzvh0dx6ldq9n661q4vzlustqw7nl5ox5rkqm8t1g9v0d7yskwi26db282x2kzdadpkxctljye6ifxdwzfzrqydn9sa61g070po39v6jwvy7vsru55y4ck2r7ivjg6s6vjv10szep0hzrklcwhh8v2xbiuh87h4h4mib87gp4ppgoi0p4b6iafpuktuhfd9xdmqbls0pmep2ar9nw19t489hiihoravxxq02xd3d5rogp3e8foznsmeyul02r5r0oy80udclp1o0ts4dgh6qec3ia4s0zcg0h3kw7czeroepodlwzl7tw',
                parameterValue: 'uelq23hjqj3791bpt6hzwhzt2ckwp8nlg2pkmff8g37vf2eer4lqhjk9e3amvvghnfex2cv7xia8oz4htsx2f3mzdpjolyynjmgp184xuhjgdrs1yqnstjlu0a537nl57fvku7dueqh4fhboxmwmq7pn39cebt8fsf1am2xl0fbo1ulouhxo91gh2tujpkecx5rd1kznv4icwdpan45fztfkxem1msmi47gb8r55akuf4x6i3sx0xfsbg2zl7rev1hz52ib56vypumgyqi42pwwv0ib667pt6czo0i5d402839dwkx56hdi5w9bfck856rn4fwm78q7bspg33nf7iforndzmlydni4hqx3p5xttgpb0f9s0j07kekpe70bh79u5eosvemvkuy4t8tt6oni8pkdx2226lkmdt0uuos2mwd0jlhbesemm96h3a3qjo2wnbsrimj6gi1j5nnd2i4iaq849mxus073mk66u2rd1ob2xua2mq2il171loxity4jy7c4y0nwo3kt9lwt6wsq1pu6dn7r0cdsjjmfuiu7qfnwh363xe0str2n8g1aah86rwj40g0fdddv38nvdiw3tuuc6joxjqxabwlickefj9gm3lpwa8q8a81gi8bmjjxk4xss2b27531ixb2ihvntl3g6g5of0mrb1ws9sg7i8v8qaxj6j4dvkmql69kbdmsbupu9657p21xlixbpoytz8nsp140tm7p2iyrdyt4mz0qnadr5q0rgzewo2x8ue5yd7d744mh8wtkm8du3bzjg6gyxnshqj9xxam3ktan12i1ocfzqac2a65w0517k8677q2uc43vqe509jctfq764kop0evwj9gm9ul29k5gkedsl0nunqqtnizd1fz38m0hpyp1zp7zcbc1k7sok9qr2osehizjdnhw8krwe42zqjjcw2ij3l91715kjxhx4dfd9rr7pbfmh6nn9v516kpqpxt9w9rq64fmmwoyhh4aif32e7v6jces0bt89s8glym',
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
                id: 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c',
                tenantId: 'a203ddf0-7444-4946-be41-956f42c795fe',
                tenantCode: 'oycyhzxv2d8kznqvhfy9mcyqvl4ss6x6igdf7k6xx09sfu739g',
                systemId: 'f3bf36a6-3084-4e88-b932-dca3bcf3ad97',
                systemName: 'o690rdwmxo4g5mwulyon',
                channelId: 'd544dd36-987e-4558-9696-fadb54dabb33',
                channelParty: 'qzfbgt8ays77bp0hrsvq1xa9xojrtkb0rqbdjn10wbwi5j97j09mnpqofxm9o9i8v2ot9vwd9vl70axjhn6r8jfazkg9awkfh7uxmddqyvrr2tflgfy9svzz7ktk9ct6n9z3pz8eonrul4sy0m7czbwb5zjeyya7',
                channelComponent: 'glo7tvu6yhbr77g5eb7y2ainlg45m2tmz9773f6b8zghbvlpq2a4t4lhfpxfrdmhdxy92gv4cjrxbuaowrekasraxtv5wzy51vejdu87qgb3v6d076je0ellhmkq4la6qfnrubbcdth11vhtipixsbz1o6h9i5zc',
                channelName: 'juwtjk1ppis277d14lu3oxaswz23sjlywz2p2li4piqcb1wg3m9o7nr2x3kldwmrfghm83q2n4okkcy9u0i2hy7nplnhzvef5tztx7m4mtc758ybny7heucenmsnrw792bbuai7erd7yp8s1kasnx8pvrlkflx3v',
                flowId: 'f2b49f33-e8c0-4475-ac7b-ac53454b523b',
                flowParty: 'wi5qruxu67kp37uk0vgbkg82q19fn88yt1y0xceb2efrbogd9eyl1n2fs8rwz984dmzhv8ier0b2ryy09ssfcp1wpdhzjxnuid896ecjjzcz5vs96yw2jhsqsw82s56kdhgra7r3xlj9t7nva7hiflmxiin54q3s',
                flowComponent: 'b4j3zxsuz1q6v1k9lndv8qqnjc5t8uabbv0i3jfwtb4mu30ispgv7ouemc5egmqkfvosoj4no9lr49crmjsmqfjztttrh5cpmgstoso0oubkrm1unk6raz0yjocnlni8ah6z1c6eoazgwh714sa0o2ooqu3nhzqv',
                flowInterfaceName: 'kqhsv89pkrqutjsh4b5rnh3c5x5p5m50b2n062ji8vljrzzooi9hehuj8492pxb4lrmn96j6v9nsqje2n7tzeg9cim3yvorgpuxd2sr93zhxgo07it3r058v6zsajuj87nqq4k2r1jega7vkkiqeh6gjuphgr0hz',
                flowInterfaceNamespace: 'eacq2iyw9llxw1mfkq6a78r47vh7lfjjvsucc84kz2b2cpypq13a5b3w0lfysvr5hnxydwxi74qh4gdripvqdosqdsxp44wi4yxj0ywwjw9tua5u8ouvsmyp7xfti6ins0m7hcwex7hwu6zxao3cdgsuqnwstitn',
                version: 'fcczistp0i24532l3mue',
                parameterGroup: 'jdmx5u3u2lruibdanr0nf5cqmch2uxrafh7v8fruf3ho5h2gckx85nal30wfh9s6kcabv9swnsuibtxevovgv9mj2e6e2rzgmx54jw9j56osiytkoxpe0sjp229j02ipu3k17lin95jbvnb60z6cwqcbm4bubmdyiemeqf45yxcrxxl2ito56236mft6ftc5681wb641d706v7naxmdeyphji9uqkfsnozpsxhtannd2xlboq7sodubcp8jermp',
                name: 'zymvjxvekhkg5wn2tkzatspe6j9q5xzu0uym49tdjx4eysevuykd2knkocgxdll26nhd4ybe9d078ps2tyyvx1hribu464ukq4br4k4bn5pdxwgkzmy393lqpeulih5f38mlipi7bv8va97smc2fjybdigwlzho2q5jpma7jis691aukke8y6r7q7gajrdlpsqgefvuryaqssakdflwmaftqsvo3o203rkjsxlw1dztdex293cqu38fe6pdwvh8f84569egtysrhsjsc3wy3gp8ed1s99r3wcqk6cs0pfqw5jduadl96bhbpd9ydyhxa',
                parameterName: '55iv1taq98kktq0j15lbj3gbg28rop487bh65o091f1lhi005wh8n5k8r7uhfzoegfw3b3tu0ltlnvm7pxfz7o7w47g19r3tbhkhuvntwyxp4tkm1t6c1gz864cxujdyqopevnxeyzh01iu9s2zosn2wq5bs0p8fp4bat29jix8y18xpusqukfvh91d7s0tmdum7otwqm9d2u3ihcys3yolhc49qrsr10o5fnmfq3o6eo8dtp7fz0l56uzkytwgjbgekmx6wx5xz78bhwhasvjxn1g1lzr5a1f7tpoludnou1fm5vyskct8nkthmhzbr',
                parameterValue: '48o1ze4ktkwwdwzqsxp7j2zl6mfe2z2tisoi9unlh6a8fp91kyjq8e1pi8pqs5n88qvtwubdfjbu2us1f4mostszb9tmmgve5rr2y6gu034ekb5p5pykhacltncmy9vl24xatkp9j4te63z5iu3dpfjxdj5pkdpkeyqj5se758zh9b6mmmwhu92yhxn74gqekedzlb8ceau19js821dsm0gw2970cfv4ymh8vwihqlg8ebcqrre9gmgczq7xv8u23qg6q743ntr5lrh2pky8wie9ys9vsl0r8pvfwqh2z3zp84jhn37k7zveinfi4pw4kv4gzg3yhi8d66chbdz0jaec3ryox797rrq81tioyqyy7itaxioiq1l6773u2agdrbxzxiox4fqzro3upi3kxn7kraermw7tndvspj375msv67jvwj5l7arp0b3zr6s2hd4exzky13qem9h78mq0ekh619pf6cmd0qx1gtouxwqm1ozrmtxeky3xlmqxw3yey1ecrews8k59tbnt3o0bfr32zg92xwyjfn9tyl8yavqjvqmcuin3qsqf7osul8u4dhjo9zs5phfqfgmzdi3ga7upisfumlcb8l28bqgrd1xmg1x6oizaryjbr5kmv62kji2q8wucok420yzatu4q7ialvlw1t411u0ujntev9v6ee55qdpeviw2x6f3qzsxa5n6m9ep0m6xdj5606fj695y0aai6qp59wo90uhedullh56sw709d10gjeydtke1vo38eflf9obffdiph73sest1v97k179zvdg3wxgo3n5iuv6eszkkbvxogy1962bltjwkw3l2kx4q1p5m0toc0d8yhtx6ntdbng5eml9rf00qahd5dscc2zaj3xdl154hesd8recktezs3jl96bmedil4chx069rut0n1vlp6sf7az5rh97ahr2zv3tzv4bh3pzzrgafg43j69nqxdfy5843ftv71zyz7k0dub6prcpupzix2ka1jbxi8f6m2uzilsx',
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
                id: 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c',
                tenantId: 'a203ddf0-7444-4946-be41-956f42c795fe',
                tenantCode: 'ghkxwgy08ishynnc9w3rorbxrq486p99a9l9lol8fd0ww9fe61',
                systemId: 'f3bf36a6-3084-4e88-b932-dca3bcf3ad97',
                systemName: 'o5h3rbpu0oyxvsql9hvg',
                channelId: 'd544dd36-987e-4558-9696-fadb54dabb33',
                channelParty: 'y224d7lattehxjnv5sah5juxa63ricvs1lc616qr5sr4q2zy15zvhp9uh6ssvjsm8v42rdiiocqqdi0ejlprlhw1cwcythw5fu4xiqogo4d02iqa03e99etjk04mqjq68aquh6jkxoe507bth652ya70xsvz85m5',
                channelComponent: 'k71avuuao2e9gbcnu59sb4yes0kwsgudawm75ndj29u8fa14wghficxsaa1y22r1910x8okjjqlivwp1drupl1ihpz77de26b5l0xhlg0xp13p30qakvawlwe3rk2v93akx3w68rcs2lq2pv0g4p1u8he8i58wkt',
                channelName: '4yo372jhce5bw7lfxigmbu71dqi6h81bk8jqx7p11j39fdrv249h69t42ly53icc985bo7hxw1ll16wd8isstee0ja642vfhbfv1u5cfn9wg3f0c11o8sjlg7pljq9m9sm83j0stm6ixqfigqqdwkvovjcgvel1q',
                flowId: 'f2b49f33-e8c0-4475-ac7b-ac53454b523b',
                flowParty: '01brqx1rnw3qx2kl99a7bv8ae4xnmsdh4v64uql1najfodjzotvw5lki13gyb4c5i5zzz4qq5zi2guropjural26pkaedxzw7jj473mt80ot9gmf4a512bs22g8hbpmt1tt2lw41rnzc4076ys79t37bjcvyecsp',
                flowComponent: '1d6y4kfjcbqeq2jf2klr965ny14rnj4v7mmxdmffj73e1ydj7lpjdldzoo3unv7bx1adn5qkya0bns94a0kv7v5i7uxf6a8n5wfwsq977yo67j8zom1zyq17now3w0k99mwbno4wf2opzuqwxwvb48ns4kug60ga',
                flowInterfaceName: 'y4ca917jn31iy4d46zc8gva4ft3xwv8r1t339u2k843xo2d3o0pyf5epmlh1vzieo4wqkd6f1hvxcrdam6fl0ncwb6h894sardxi9l29futgjotwlyoog278zg5qd9z0nunym08r1g2tisjwa8yqv11gt4c15z3x',
                flowInterfaceNamespace: 'cdma5pegwyf5u4kyryl8ql2w474iom4c3zl3s1qmn0qrkirveb9ps40rmtjf5w23dz6us51vk07bfjji0xo9qnshg38os47h61wgc3ps8inv55yv02gjg0yxtygdt0kvb1j6t97zp81j7bxxnn4tzbn37qpiwzyh',
                version: '1uyutyd3en35p5jdpw8g',
                parameterGroup: 'nelwxi4r1yrb533b9y15tdbgyqo22ss6lls8764mi9fvvgwdflorwj4oj2ahhljohzkoka816fyto7dcumvvt4utlhegpownlkazgo330ukabrmeigdiuy172693g3reon4gt4itkqd014gc1wxxgsfqnol3arlqz4xtvc3adr2zd98h1nlv4yk40aejup02kp0kwj9j6gsr7bkp9t5ims6xihqoulthfcr387my301x1m5sri2oi8w104uq6yy',
                name: 'l9ujmykmglfpruxxm30r8kfyannsxigw97a888lkja405vqfgrw4q34uztrspkty75q7yrw6cm1u6gctr7kii99rfzaq7xtc77qegcvlxmft3mv3or2p3003e1ghfvojenho334cguarkbswa3k6vqhg858me4nzcaq1grqp61of6hbjxtccwmcpp1kdfae6z3jmcutoo5xw628hsbt7nzihxb4lzo8f80knypvu5qesz6ufnz2spzq1lv06s6m552myprseq9pv6ynq299d2xhg5tvd0gluejayzppj6j1xozhrohf6is15bktq5bv7',
                parameterName: 'ywob8wtrshsjmc0qqsfbay9v9zjyyakge7xy0ha89801jc4kzicbhltjeaxp00aonoc635na88ldlpnayzlrn0hhpq8f3crs6gim8kup4bwd4pe46ikmefk694siyuytjekd0sxlen4vuwg35nwxl4g2ldc9j2he4sxhg3e70syi9h417tn1xahdvpk3ycuif4deab6f5h0xzys73b3r5pikydlg32s59mhdh079ycj7eb2nbv3r5a9sqjb0dyejt5vodnj1yl3d45zg6yh693t02enphzcby8o99fo52038hrw8y0k89ow518gwqy5x',
                parameterValue: 'gpq46776hcctij292i84mdajudva5xvdz0r8betq79bnxe61ebk6qbpn4iskoypzbw5jt25y99znpl3zr8ubd3ufs0qdwpt8kgx4nzzlt5jvs2w0n1hsr2vmxkw40c3cynm3r6zdrr900uy9qlo35dqk34vx6jr3v1evdqh2k2ovo0tv867hdx3s3rmq6xwcrxub6w3jqdjfxgn5zsjeasbzj2warmosk3njozd03iz90y5h8of6a5tdd70zf9t2lyktk4k3nr0549oomo1v6rxle7rz0atsg3uq17ejhhpw32pechrkr44iorduzrrprzveh72ejhmhurzl5pwkebbx36f34rgihn6sobabglvjz2w1iuo9ko0rrhszo5mfj444pmml6nevfh3o1sjlqdf3e3tw3ywvkoavl4o43bedlanc7tjlk3loml0xfj95xgz81o4wda9fquoj95qvkw4kwo7pi7xzarivfnr81moj32s0mqqpz5a6hsm98x04kz910pnbfaeodtvia7gpe9sis4bmkor9mistanubb497b05tzqdat7wfz9o80xcu07wigj5fry554mbzuron6wjjtjz6mb0tsk7v0mov85f10h00gw6vgvcpd2qxnfsc9ssxabgdcfg259064uhyel4wslpof9hu63aorejb24ksfrn4oaqnr90josjqvgdkx8eozmmplmxhg62dyut3ox16xxyfowsbijr3fb0dphrzesne45zj6vh3j3qk1rddsrwzti3kah4tfbn1iciamjpo3z6o66rcv7s7tweq6md4sv4du0ihx9fkhd5vqso5f05h8k88j6fzmdtef8gm0bvwgpcya4ygq629rurmrknlwe4php56ki6y2jgxtah0knthd3s23ogte8xxwi0rri1z5pyx3gpnupsciwktozyf71k6495t5jexyiofckl2rl8m55npv0kurdkdpufbjtz0x6nchh7wk6aon14zbpkir5iwmayeazifeq4svzzt',
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
                        value   : '00000000-0000-0000-0000-000000000000'
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
                        value   : 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c'));
    });

    test(`/REST:GET bplus-it-sappi/module/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/module/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module/bb8bbf47-a7ea-4ed5-a777-bd320be4695c')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c'));
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
                
                id: '72fe08b5-6f5b-4118-9a30-65c0086cdc84',
                tenantId: 'd1ce7a9d-ec3a-488b-9cbb-a4acaabe2efb',
                tenantCode: '4zjvmb5tf5orkw312xjh0bgbhm9y1slghcvoen8cggay7riws2',
                systemId: '927223f9-a3fe-4ef3-ab20-9510fd510978',
                systemName: '603e71l41fzq382iyibz',
                channelId: '372fbd38-ad9d-4475-829b-a99a134d85fa',
                channelParty: '319ctvnw3hxt2njzjn4q8krhauu03niwfnsuxrqnfpfulsyywldv2esxa5gicp00iu2n659l02fd8qbr5j7g0d8jsbvnmh9j5fb7gg4o5ayf9gi9pm1m6jauupxxykbt1jxuqg28lugen13epv6utloufld0r59c',
                channelComponent: 'v57iwwevgtaoj70e16z7qdppx8cm63w2733619orjq8fn1f081sqzvrvc7strxbezaeascjbmryj0pzuplywtcxg7j40enl8feosxs1cyf3hx5ceew8p06n65g86zih3a1juoyz3p94capxprqrn2a7g3bhi2iny',
                channelName: 'go7juhlyey9kt21jba5zjp1d5h2cvon3er4pghhsy61yhhxj5111bjwirj423nl053k92ztv81u9tj084xew51xja3et4lyy6qwjqtw8v40tvl80125q2ki1mamvjb9r0w0ovoxzgrdi6rg1aiu1o52uz4wwt1uu',
                flowId: '8dc77704-37ad-4d4c-810c-da7831cb2b8a',
                flowParty: 'szxt73mm89zgobzo3kpv24nhbjffu1on6ktl5h5ews3s04ul8m48ar41bfdhnxy85tckxo6572pb9il0fbrpr5usuht7ic9lizvn12oc8xkgnx9or4emllzrz7naqy2q63yxc701eqf1p69m6f52lbmalo1wirwb',
                flowComponent: 'ydeb3vkuwocw82d39t0x458f2nrgjtqass1by1raqf1rt8xmyu700thnwxaamdu66kvofzrl1i3cefzc6t0c7uj19lnu6gqgpei1qwzmj7mw1e339j4q64i32cgip54nggruor1k3st3doc3dc65n1w6lqlmeayu',
                flowInterfaceName: '1vh3fab9tuw3bqw88nzutugqmy8f3fl0q5aes8o0zb3nbyumort6itanotdhr5oybkyc358p5hlpp20iwb5852qvhzevgcf0xsvflav73p0rvf1k0y7unls4d2rlv10fdybkwlygfygki5rq237thu3wmenhplvc',
                flowInterfaceNamespace: 'u5o8ebld2fzmd7lcpbee58cdnu4yah3nja8b0m8oyz035kfzrg0infdjx1regaxlbf5nnonue5gyzl2xlpbyew28we7y4bkqu4071yc5uc62sc4a2olyp93bhnxoga507ip3da108bgvvxa02qd2e9vclbwwe09p',
                version: 'et0e2vmm9sqb7svn4ilj',
                parameterGroup: 'ek1qa7zwvqd0lbhj8y5yzm0om2co2r70kha926mlmnmztq9uxafq6g3yl2b7hoe30ioxz176dy3dekc08bldozrbh9gpj5va0c5ty24nieh76y9gbgwgo3yfrse4hcwn9diq2an0es2bm0ouwvuag2s4rljni4buoe1r5xyumy80we3533tkwldzytd19tz9kxk15cpq3zv3fs80l4mkcsi6b6cj4s7myqstjem8xj68wqdgx4noithnszwzmpt',
                name: 'o24a733t8fmgsvapsbyy6pfcm2gc2p3srgfcnfe4alskbz85n1n1471qvph15657qe8e5h8wnjov0bj4nun3i8isxtt9hzrlgidxtqduko7m8s9am85yvb4rosadplmtvdge3v8xgkmpyubnwzz63c8k83f09gxfzhqdh76ool87aqswu5pg3ko8e843x3bufhn96jp2ljcvuatr53b2vl33m71jnwslg2xax0qt4fi76zgla48q64jdxsft44sa4le3k7stzd6xnb67i27tjgpmg6zcojiixd9bpzarcxjgghucxlnk7d9btlrxxaxw',
                parameterName: 'il6ofa8bcpvhd6if1qvtcxxll104bez0gul12wiyuipqi4cjd8vtimn5kqz9rewakkekm3xqiott5z9ub7ixrsa5gyprxhpz4qzpyinzuunfbxpx7fyqdsospe9ou84qygwdbv3rdt6v6v8ncrji9efpljp8qxwjizcu63hlsvsmr7ztzk94mo322u5akxd05sqf8q30hfv69dl4851h81yu7gxhpbmn5xvkf0lh1c91d9kwo5kiuc88mil5z3qh1l56jr2gdr7jf36fvqkmqf4wnyubshxxw4q71w6w78v8zabgoyw1cngvbt1ukm9x',
                parameterValue: '6z6wjn7kbcxxyxzomzgt50dwhxbspumkrgi0ea4m3r6dtrx62bwf3sx3fvdgp9ozmsziw8y7sqfv3x5vnto0uriqprtemq0p0jdn64zja6y3cklzvng5jvchs6ioufkyo505g90vm3bq6z3ocsjm1lckwms1mo39cko4dsapksteuarkxm9kfrbj48yto6rp2tqjrwuw9sn7tlrhz34wkdz5gr412r9886opwo3klcfi9555x8q4qivlt9z15xk7w8nglq0zerwkde84t98nrt3u4jxvzustwnwi5c6fbk4ukxay3g5udqzr91139yrlgrlb7zs7lv64g0uib6hkcecrviwys7r75759zcdxynec481y2jd69fws8a7lkcijlp7axyeuoq3egc0h459tcllcrf7cif8kdhhclju1doc0hervfdehum524cnnn4itc14cd62sbit5fn8ifturqwbp9u5sqbzox5xdmf08q6d8no1em810ljus6zkz71ivswpy7fe5olq9ft77d9zmydn36lpy0t0ptmwvctjtz14wjzdq5nfueuvayfdalbvyx1dvbej6ac8t1h15lrx81p9dc3ejelxcyyhhx2uzprlvlecv7feazidhi7aiql2qxhh7j1bfp9320bw97ad2po001rv8yo61e1vxnsjyfepxsa63f9c92mbnkf54mjwubc8n43eyxhdmn9tly2ieu1wh93v6qcyqwhgmwyr4cuzjwr9gc4ijtb9thpntt5ructlsn1rq2iw2mx2ld9d7x0db3h2pbi5doe8kh9he9r0msi7fzve29znyj4czoopl0ui41wxxtljni83ut7ddm5qpdvs3z0lk0sf0d0uynz3yqlva830202s06koq64y4avtipneagzldgdpnzb9b7biwyykmpdhvhzcmxc99q4sbq0fsqcqia6w7vviimbjy4agxa7s6llum707b74xd6d1rl62wc48xha17z6th7uu6dfc5f5o5njvexsmxeo55',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/module`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                
                id: 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c',
                tenantId: 'a203ddf0-7444-4946-be41-956f42c795fe',
                tenantCode: '2kbkbkyeb00dkfk804a4fm0s2ioz3un5eh0djctzqc48eamosi',
                systemId: 'f3bf36a6-3084-4e88-b932-dca3bcf3ad97',
                systemName: 'm2fwl4s7wbzl2ea1aljt',
                channelId: 'd544dd36-987e-4558-9696-fadb54dabb33',
                channelParty: '71faf2hr4h2m588uh0wcnw9q03b68j7ur41421muok3z3dv1xaj1ma563ujnjgsndj4te6hqerfpaq08eax9ka3001dhwgn6t65gka3e8wbiethtygacb4c5agyn64qcwlezpto5gp6ly5oz154rfysjvkrgf2ep',
                channelComponent: '41qn4y2xekjuu9ph44lu3j03o07y5nxkmutzfo2xpsw2py4gi12w7k0fgjrmzy130xkludxgqmivz2b3v59vy7kbupuiurvow56nb0nv0s4ipatkiac5t19c2rmzu37dk08hh925z8xc3lbky8yem1dx0qatdyfz',
                channelName: '7bvdbvgo6wnj1a15k4q99d98rh7howhniqg9gq1o804muui4spaddcyzpg6d33h5i3494dlrjmle931hok8gb1567o8nknp2pmszj0p87eclva61w11ln6x339rcw2fb0h770rkg81nkbt52r4f1ecipdis679wm',
                flowId: 'f2b49f33-e8c0-4475-ac7b-ac53454b523b',
                flowParty: 'zzh6xbz9h3ld87ttq7asabphmip2s2vtu90qlz5hofu3r0hkttpdghlnn77n5e13bzgyyrs6dynztip1axlmz7yl9xxxhsk6h0ija1f2u451u1mzf8gqi1a5mzljycm0048y74kwx9h2szrdn2uvz7aze1cyn863',
                flowComponent: 'h6usdmdnmwk62msbu3je7ubbm3aejjtt1s7tdl7ypz4a3j2xdziosk6iepsmpz927f1iktc7qzgwflbkoho9he22opvnnjuhlym7ekir6fgcuq6tqxrlb6v6rmobe2bjefkcey3jzdb53dfq1bs3flgxykh6216r',
                flowInterfaceName: '94plj8zht93f82ows0l8i4sxeat5lkt4upcu6wk2inspddqkwn0yp2gv2kzr3m1hva7u616d0gowg8r6q1oxkj7dp2nafnzn49t5lnit1j5v8uu7fzyge7gk7s2pum8fej3q082d8cazo168q0el45g8vh9u33hu',
                flowInterfaceNamespace: '8p26yw8mf59jzxpuqgnpx0syclqkm08161b8xd7zsyhz77siic62xzbrrhfspsxnp23vz1xlf8s8w6u3sn9h3j2is6cond2nksyl2xqmb2t3ylan80lp5ac1pcec9f334csze89y6obks1x2malwnr8a4gfn7y3q',
                version: 'ldjevsf647twj0fry6tu',
                parameterGroup: 'm833ek9dnkb8770fxwwi37nxhczu5azsaziqwpqdom74of7m64yvez9mszfz39a0ldmya2esmxu9ksninkfxizdmf05oorng0qiab7orkbnt1zxvayo9n1u389dod8tg5kpvsbn87objoom4iky4x2lunlsj7phgywo1df127kovz7yd1ypdrctmss6nl565i5kgldjkqyyh28tr0gy0aic3a31388s043ypayhamit6vl42w9yqcotvpcx56ir',
                name: 'kfspmp8vuw2v74axe8bci9iepwj6wflgqfd4cdvbhv59jrtrn1vtgmgugg6np3ytnq1apzd3qrq2zy464i6868pjsos75xidyfd053lk9c28xtwav17b8xeobslys5yos96ieth1ug829c0iyyum0dws725b84zjddgjcbodtrjoalokrbqntrb3bdpbdnvyeja7emy0i1fs8xpfjdp4f5wfnvqv89cypzxtmbh7qfe7pgw7bpxprenijhk4hbyjvdnul31mc2msxvvsjllkceytw06cu0p6c8hwuylhk3zd0yf0mn4ojhukpjt65wni',
                parameterName: '625ip8at8zajtuh59sdbf9lw2n4xel8tebxz27cuubd8fqan8qjzojxe2f0ubwp1gbedxnk6mn4g8qj7k1fh0j4qoy9n3x1jfa5hvv76j3ffindw7425vjaypyyfx4miczhphv8v1ibj8yecco8q3hrqrrv7s5mrtecwjz9lyfodpw07pz7mnj7qlyb8rwv6ft53yur04t39bpqeyx26dst1ufliu3a20ixn2b9jgscsogz8wcb0w6l7napg5w08r7lajbft2hoidavwfgfwnyinmb5cmtyg7vltvz1867h4p7nknzlkhbfmkldps0o5',
                parameterValue: '2z12b07bk5vmmny9t8gqu7ecbgz9nlkdbk7xopih65dvbx2jdkko5blz1dyoz3ojwf71bw1q9czzlnmol1fuh93fqdnqt2ga3gibqe2dnjzdx9t4ezf92nkmipzvmpkd1bf955nv5r2mljgf0ckvxo603v325ua5vdugq0ohthkbsydx2p21ahrhkbwoitrrvanztfaaod5jkezo994vxd22kx9b0fcw0yfy4qlckr2ocu9fhk5youmqbjv8tg6dyyj4z4gypxq2040efy2dk9iyc1l7t7oxqoy5wr7cvmhs6yq8dqz5a7a9ak86twyoeeyocbxs2d5o4u6bucik55mj9ya0uyplk3ppcrg02czelowa2qyb4ost39vph2fnyay4mokqk22wsvtwg801zy29m7433o3qj1z29bj7zqex61htewyqqd2yv3036wt1vj5dhi92p8ks92uoz0jeera7zlesijgxstxmfdpdr9kiivabukfd0zkazvbjitgwnebdk9kafjiumerazvc3uy5r0fcggwa7rd5jlfd9dt5cb6d158tdqm8py3t3zynjg02n75a8geouc3gdyssxo1tma8agjr0etjicu0c3ik6tw8j8jehns8iednvy6trfhaww8bil4na5taajr8bmxz7pomlfwnx4smzntfu1yq589xevevd1zf67cq0azc12upmw9wr0c20z6rqu8qlgx7x9hjon0676xd4ask2s5hs45bi9ij9pikemzzwu5uixd4lo84tcbfy1f4kzuhm5mr5xtayjuh30ugqmy6ezh2wkcmq1be455za7b7z3o0sgf3y90g3nm3oixs00nn9vomve5saxf8527b2g5c0ge72o0i737su0wjkckkpy33sh46afl8oi0oywgwo2xeltyjg0rcldp8gdrt3tsn1v7twczt9wv2u0ra8aiehiu5ko2uh5jrfplmn0wfa2i3d50tyu6bja0qwzdozzfn0ggbb74c2dqbd5s1o2l6dcfkbf',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c'));
    });

    test(`/REST:DELETE bplus-it-sappi/module/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/module/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/module/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/module/bb8bbf47-a7ea-4ed5-a777-bd320be4695c')
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
                            flowId
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
                            flowId
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
                        id: 'd81c1a06-10be-455d-85f0-a4ffdffb84d5',
                        tenantId: 'a203ddf0-7444-4946-be41-956f42c795fe',
                        tenantCode: '2r702n9cqsg6qjnv3jbgixkgmqjbws4oxuo5omdvokrkxoi4f2',
                        systemId: 'f3bf36a6-3084-4e88-b932-dca3bcf3ad97',
                        systemName: 'sv15rzj9x7j2tcg7ehtg',
                        channelId: 'd544dd36-987e-4558-9696-fadb54dabb33',
                        channelParty: 'llu579cz7kro9pdefazj6bw1e37k7zkbp2p67dzksj1uwlv2foj8saeop8z7u19qrbwwbnl4bimi7clw651yeo2cx0fkhztebb2psoal24d0av46r3y0hz17as3ms7yywq2r335c0bjzrwrj9qmclf0y8ovdl61s',
                        channelComponent: '9ik99yrv7vl14yn7pagef65rymi7b7tg7oywqr5ht6gm89t7oe521ix3p95zk5oz5sgg8bknopzkd6qbp0a5hoi60ygi7pemzqfxed4sjnxmp2mljg5nbv9f6np6ywmapoa2qjaa5bk31opnplp6ctl61fc58t61',
                        channelName: '2iczatl7fah9hqyulgnuqymjsy9bqxeeb7ytzft75nqvl3cc28stqkg245v1l23skyf3os4xizvxurboqcuqgyyupw2w2n65lr8xwpngodpg23y32t75kwisymstx3ml8yysug8fz7gn2wuh75j29c1ziiffuzsi',
                        flowId: 'f2b49f33-e8c0-4475-ac7b-ac53454b523b',
                        flowParty: 'xsd26jiouv2x16prkhbue5356az6j5sw4zdzpo48r5ddutrp6bktu3m4io28nkg3um69e74raa5ay98r2j6siwi0bsniiw8t4tt4t23ty3w6dh94jb5vo5glau6dpu3mc9h7lmtmejq041kmprjr339ckkyxfhaf',
                        flowComponent: 'ip6nazqo5rwdb2x355f0s4o6x49iwebsz6yxsgl2gdmgm7cnplexzooh7cheuaejf26rbprr1uekksi3sr7is716tsxtltkg60u0sfvtcbigc9drp6lmztajfmdwfcjdnktczb8o2p4i8u372whicc2u7mqth037',
                        flowInterfaceName: 'cckalo3vyp0egquxjkdeh98iuu1zjfqpx1mwzx71foyb1qbvc0yiwl5i1bvtj46etfxl3otpuci85hw68rc01us8bl4ol2xhu2k25s0ixu4xuscokolqhc00lzsoyjjqcqlyi7ixfvvhb3bl5ebjld21c8i7j1cl',
                        flowInterfaceNamespace: '4xkqi0xoscxv52e1q5o3rii5kjt7nzd2qufhizavzkmcvtipdzsgeabgq8kxz1quu5q5jey9d18bknx8llnngu0d824hxpmpphq5y68cv66yefjors5l6xkag6tonhgiygu5gvs9lyz9096j766l9dfwom46q7iq',
                        version: 'fgex5uv8igoe8rx0g5fe',
                        parameterGroup: 'gh4w68i591mjrnow276obddwdzk197jp3223zig005982htt7u7an1a536vabmajfk2zr0ttppp4yav1iuqoqc6ee0pbc7y5urb911tn5lf6etepkbtk64pkpj3kpmvat8t9ktsphqul3us85pyr058pnzlsa52o7x4dlbdsrgg9jmin4gihm9ocm1zy8jzb7uzq1wpwt628klsxm47d5pu8jg934w99fprfmm75vh5cllb2oog6u039ia8mpfc',
                        name: 'ecg66benhxecel1m7lmysqkp68hnn82y8tnxo2ff4ddhrspm0o0nepfh0ofn8uojuv86up6mdgdo2bsvg3loopy28i7jq01c72aparhbko5eufw2a62sesy6adj7oxs1rul1l68tpjak499xeevs47cy0kr8gfledubrp4522o2wzgz62yzywx4oesrlqgtcp4ketzcxlkbzsmdxhv9uxmdzi6f6oxcibjtz1n8kglbel0cx4oaspqjaqtbm24z790nx8nydjsdkxjfi4m2no6l10zhmpxw2x3b08e31kuz3dwq9csj0xdh5nff76cue',
                        parameterName: 's3ijrcex9s0dzdkde348ylayzg35t0kmxkztni7iyck0skuzvsaoe1zc3munuet05r8l5pigzwv8363rpcryc0xh6zy8mvx2aweke8rkr950iii11y3m9d1n9yfac2i2v86bm3mnryqcstpji6w4eg0dowatsfp4pf6s19qf4fd6v5d5auqny1x8z60nenloiueha3pmmrjklht418g3nfcyjgc1eur0q11mbrsekjnq0uq1p56xkayvakytvswqp7iujsda1ki4m4wti9hbt5zxsazs050pdym29r7lwt3fenn96flohwngg4qg9shk',
                        parameterValue: '745y83hrh34nzaq4u1dlx704bnqqj1l03o70e664zb36rw217rk2lk6f9taxdz845wtsqjmg6v3amad2nniq3hsx4vd8gkkbmsa3lb7yspjbt3jwbyqv0udi8w650wr4iih747gpzr227t93dxmh4lj9gkk1f4f0x6emtjez83wfklyamkp8wi4xded4ldxcreijmabhikmyzf86ae59ozetx32qo08fmtm2l4tzgx46hzu84l256g6rl2ozhdmlnqlkorrokcjep3prhh6qqo36fjat6qvs1bu7pyx1d62716n6nebgeehbx58rpisdb2wjuoo37uin9io9qzapcs9aubayowtevg1o12jmvozs8a2zzxdyfegu7pvh6o031m7cnhj4etmbsrf61mo1egyqlnxetdjd8z7fvz0jmj1utuhizidwsj1qqiurdhiuuxhen2q46mc7b4mtlgno15i47z338uwvdujgqpmlke11pn5407rlh20ghsvw57dq9uub0b79irxoewxry658mcimfruxuu6dh7t03tpglzbd6n60qehw2czmxsggmn6rok7tbz2u7h4kj5h0fe6r2b1jwo1aq3v37jyqff5jwctdijw8b5gy17wqpniqz8wsar8ufgkk1me1nckxoux5voteg8rs14zmo4bnbpedwafi4fn61qc7172gvknr4exnlpelqoljqjvw8dba69k5hu6i3bwdtg5b72gb4102b4ioo979ltjg2t086pazvnrfqf2v4m90ocuohre9amtao682cw66h2jyw7niil0oqwwzhf5v4royzpwovjy9ngk6yuaibs4wsmukd1r0f5y1i1t051z7m6sqgil005hbet5hjk7qc7zbav82v5144k3bjacfg6xo3mstby01kfsj8u2zinnohkca559jt9hgamqbqbl4po9uh7vnmdw04lxcjjbjhjz4n282fzhfptx0nhrlc51k17wdezilm4v9khi8ff2a3ph377370xa0s7as',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateModule).toHaveProperty('id', 'd81c1a06-10be-455d-85f0-a4ffdffb84d5');
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
                            flowId
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
                            flowId
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
                            value   : 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModule.id).toStrictEqual('bb8bbf47-a7ea-4ed5-a777-bd320be4695c');
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
                            flowId
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
                            flowId
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
                    id: 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModuleById.id).toStrictEqual('bb8bbf47-a7ea-4ed5-a777-bd320be4695c');
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
                            flowId
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
                            flowId
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
                        
                        id: '72ea03e1-8a1a-47f9-bfd9-87674abf3d5d',
                        tenantId: '5bdc8ed7-6e99-46d5-9572-7abd856abdeb',
                        tenantCode: '00p63ueflvn1dfal62ikkz1eat828dk4in8lo0w1mmijjvhwiq',
                        systemId: '06be4be5-6949-40cb-b10b-8d0e4089f176',
                        systemName: 'ph74wl6yiresblchv35p',
                        channelId: '9cc36580-94aa-44b0-83f7-0d9cd673ced8',
                        channelParty: 'ykjpwmb9n9de4gvjgwwvh7la2zqiycbnp3ftuj268y0s91ni8j0x15rd9bqtpimfz2a5xoc8gcajixevqpgkm57s098csm26kkpv5tmodkakbr0qsyknkm50p0f6ahb4dhnprdswjvgmczttm118e8etd7azf9h0',
                        channelComponent: 'mtpytbpovt7en5lersdnyff1q7hpqmakhggkkpo977mh1e2hojwpmub8vliaavxez1fmxex0qjfn562p32wjpnn8gi6quyb89gvwatj200wvny5g1t99x0rud9w12zlw06eeubh4syvcxnz3emyldksmqj9his6o',
                        channelName: '8c5jjoj3kfzmh9otq0docbjzct1r20wdoxnkpdurpfh61gh74lon97ofc8g2jzrj1whdrel1v1utvm5fwuejonts8qcm205wocbv4xxwyjuudlhzud3vxcmom8w2nik7tcvk12busykfe5sdm89h8kdt7up598z4',
                        flowId: 'a464b042-685e-4a08-9485-87a1df4d5158',
                        flowParty: 'r96yaj7w0jsov94jpbny9skhzob9kn2rilv3qpp95ewvzunk6qzwgxwp5p62y9n2ij57wmm1tbry0yvtq5ay6n38mjgpl97dgse05ljr6a6m4t87d6s8q8om9ueu8x0qaelgzreooatdklixjluskhrfn7ce7dkl',
                        flowComponent: 'h5253s1zxgctsdazp4ofht72cm8kjcrnjuqh9fzf7q2eb34gjlspctjbzqfxpwlozhlfj6y8dx9tj2ezo6183p1kydbhq2a6a1ari8jzqmgdtbkpwp2p8p6wzrhjf01ppwl1cuqtq9mkrg0h8cewd7wp3yb3ul0u',
                        flowInterfaceName: 'o3assd1p7c1d99xgpy1dla3imhlc0zpcg8orgvpje52karmjbrrnht33tvhsphy02ctpuifjnx3q5k0igxdfjpjdechv2tyfsom1jzwn80lbujagiu76mmid92boger2sng74q82yahbq5nyuff7aj22lezljbir',
                        flowInterfaceNamespace: '5jpf1eqbid7r8ehjya9psp0mja6dcaxr2132f6qmj2hsipx8fgk7jt4l8im37hvty2ozi4chexiwwt7dlcfl4ginzb3i7ler6hkhvj9it5z41a0vepuw633kfqj8kwhbdz336wfjlx0vf5yshzb4c7z9vysoxx6y',
                        version: 'f7mcffn14a1iu4nsbzv6',
                        parameterGroup: 'l673p559eohn7qt7vwupmxacwsyz81ee9usylbqx6ksudw2wx0p7jy3wry84wlaygxy1xa94bp0ggk4howudjpi5mdxuwsagfoohvy8ncvdyqodkkl2uojbqqqbo3fvvd503yk6mzn1pz8vepe8w3o9easrmh7fpce4g0zxp3i2tu3jtk5y65iyvhptnx6cczw429mq7i5o846v7g89ogpucvctk3j0oclbjavzlnziafjgqeemd7pe4wvtt5ag',
                        name: 'ehmcm7vyxt3m8iaxca55h7h7sujhfo1aj06roaq2t26mx3imqwpsfh1irdqbbha11sinrum59o1cmsqhbw1soz6q8lr12iz9fpkdzm2d9yvhyq42ecewtd892tvptwzqmc6kmwrmak7oq7wtuacmz2gk97ny14sb0ttvwrc7gwu7sut73spvhyyxp9nv3aa1guvu30tdtks18ko2p1fagrujfx8fdm8vbd5j8ryoxfuu3bxeoikjl5ol0j1v2l9t70ezcpuno7vlxofn2gknjyuunk0my4m13erlsstn0b9f64srafdln52qa1j1zj4q',
                        parameterName: '89a4uucl98blob6rg6ml8q1lu6c5gjk4ozt6rp9y4171sr10q607bz5sds5zojymd8klh258c2u6c2gudfkyyrucbuky1rlh18d1po799yuwofcf2fn1jffcppjencmji3qhy4m2f66hmdrj2e3pnuxli1vb7o83y649ex25qj6v4m3gh3fme3fomg7aiactx79d06mg1k9ia6jdfu00bgt2f7p2akcxzlpnfpy84126v7hma8cth6sxag5sii4wj8uggn9sdg1vagwxlqbobvenxtg2yc6lofl4mkc16l2w341msgng6dmvogk48ojs',
                        parameterValue: 'fcj7unkzmsswu1qdp3m1hhq768qzo88q1jbc18ffvan1heo8aar5s2fdfcuy2cn5k1pjbph9rw5e8wm1ukwqym54521e7ssuj6vy64hw4t15z7qvyt9vje0nzzxidxuu5ecih63sqi51bzcz4kc5ljd12891qgljdlrhnw823ftb3kc3yrvriwsk8xhkkac6k0fuktlbtlsmne9bl2iudrqhqck28sxejmlt32qfu3ivz901vqzd3h2odx6wm3cwyiq0ir0xigzrspxnf8nemfjjmmi9cioweu23zrgmu95dh78dazo2gxvt09tl8nh068qdfd7g74oh1j2rftgkzkd4qarmyxn3ybn86q4548kzdrmww9go9key6pu159a7louplrs3abis0jbgb4rgldnhwzxnjftzzgpucc44yei4lygo1dtwxilcpccjdlvkpdcpm3cjj7yokgghyrggilf2kytl80imtn32udmuryqh8cqddpt7ampvfi1j3ow193hdtr0mk9l6ki0ce00k3zyirbo8l3tokl66nkja4f1tgc0a7ru9gisenc6l49op5yg3eodr85ceoj9xxotewhrj5hprrvg44eid1pmy7hav2xp71bfxxxzabgruygvk5ph6id819v5ys7kwtrsa8674c7d1e4rww5doyo4eloeb20ecercurzj4mq3oau31vra7523c4is0pn8pl37o0ljas7j4tqyujdk2nreyrw4kn2z7qhscxltrb0rz7hstrwxb3vdvgq3qneygwc9tsbt2ijbq6er3kt7nl2e3esru9s0qgzd7mp06b57b5myl9pxvfokmccwtxlzfr6rgfetxk5fid0sb20gigec84ktw3waacq04wf0hkyhw3idenrj6t8li6lycve4vcwqrtjoadmripe06d93r49u3a0iv12y1orium7mb80hojfuvcgv98ibhhkpodm79pqqa5txz265keiiakpzaeebd2jlkl6wyg4pe8r0hp05k5ci3',
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
                            flowId
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
                        
                        id: 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c',
                        tenantId: 'a203ddf0-7444-4946-be41-956f42c795fe',
                        tenantCode: 'eruvcdm2frwsk6u50f7ge80msx5rjmtu3hrkfh5crsi2s3uveo',
                        systemId: 'f3bf36a6-3084-4e88-b932-dca3bcf3ad97',
                        systemName: 'drb65nu4nzqhnsu4v6cr',
                        channelId: 'd544dd36-987e-4558-9696-fadb54dabb33',
                        channelParty: 'pxvl95bc63mb6mbhdosyomfjchgrkrjgvp2ussy0fux7e3rbp9si98v7k88et29qttm9k4adxd2w7nsyp79i7vdtooxdkqt4sqvpqvq2bmx1fca4d4c84y118418sy57ff3kgjnbf0qn4v0pc9khazuv8x607s6k',
                        channelComponent: 'm3edioec82jb3d81j5iwrsrh8u1mfdcgrbhp1hhllb8glzcoef23vj04iayk09a9bvner7xlz4yrbox3gdikbonhi3sdk7yj6ulrkf82nfsl5c9jon9aprkcen3ydsh0h96q83173qd8rn1ilp6pacv3u5rmo2wf',
                        channelName: 'iapnq9vwb1rp0xadzc5iea0juiq6qrjbq88wqv6hfk9n2x2zs55xammpp5rfgbmdjvu07dk0ipi3ra7oyoidfecqy77vmawto7uq2xjuxxxy2xufsmyxwg21yvl4zda4tcerd5eic2iemsg82nyzxcneh40wod99',
                        flowId: 'f2b49f33-e8c0-4475-ac7b-ac53454b523b',
                        flowParty: 'ekl6ev2r58va0jka8tjeyvqmfb60f64u9jqlzner9en85zr2rwzxwuo1xpsvm4vdlzn84ngv0f1f3jflohpjxzviwywdmyqg69ebm097o8urzn5khbot6tlhqq1hdwnhzunv0g6w93p1645gmeyveenrw522g71b',
                        flowComponent: 'nek1b1jvpprcj8a5uxtw61dydn2r89z5ysnk8w86fy3a6709657tjapp9r5ewkx09fboyh6push3xxkkhgbc9o94z5ni0c6ijvapigoxbzz73cwh7txfdjlmo8rqur4qjxgi47gm4e1asgfvcek8ps9o248m7s7d',
                        flowInterfaceName: 'jfa9oh54286zmiad4cnoq0tp1xvebzxo91o2h92yfxihiw1y36tq3nhofgra4of7er6plff2s4krgk781ts6c3izlrwqxj7jag4rp4fpb8w8btm5u29mpgp27k33pqw0wl2orbdgh2v4ae85ntsh6lw3zskukoxy',
                        flowInterfaceNamespace: 'vocuxl50yd71c1esqdct5vsewzs0awlw7ukseks6lr307kzze8d2oqf5xc8f5yhacqiv7umg7fdixjawnshldnbgj2uqgz4c63zmt4127veywspicjpteni1xthuhdfldbwhfzjhbnagsu1lgdj3gng5ttzdhxse',
                        version: 'jgwyttys4l45gyno2alw',
                        parameterGroup: 'hp5z81cio4rxuz4fep5205z7tof3vbh5nlj8fy57lej5byvmb18tzlovhdd9uk7rdyu4v6kbithjvtlooq44il36ehsxrnnoaet02n8q88kykjl22tlwn77tujlehmd35vujlfvq1myzwvdh4b6a8docnnbo4a49sixjjpjie5ci870jqegaeghfcf91mruavd1x3mxn81lj13070sboszk3z4epxuj5afq7pp8ei6nd6oa72pjx7hd0pw8bmmx',
                        name: '1uva24ojdpo2wcd3xhfu7sdcrxae5odfxyauzkrh80fpgvflom3jxki3cng9d8wfx5tiow13c04698a7zpklonf6mimax05zgnrkkucxhidt4udyl32135j45mk7f64520lz8ay639r5nf5i94lrtcf92x2vyv3hg7l4rp9g705gkpclarojjd8xyy8o1b2ttqx42er0vlm0is2um5m85sdoywwttn8jn38x1bv8nvy353twq20u79t9ctg8qx3jtg7dfl9gbo06rb70y5fkk48r01oog8hq5l09pxaon5kx4obqevc4ic5igy4616aj',
                        parameterName: 'l26r5ucu4xraekpszdced8vr65rfw902df263actptpneq7keebhqqjxzre2gskso5y6zc9j13efgtctsga34ixu36381zprbfxna7c3i6pt9jla9mo7875cvyico9oyd9jk2ggpn5sq26xxpkwkala4yi4spo88ckt9hl89yt0k5b8ryl4m00w86dm3tshin1lpfdhzbz10mnir5uugoib3cqicccphy0ejbkxk7xh830im2rqqfh0gak2y8st23y6pxvgf6tgdct4wzgc7mgy0hce76y7u30nae7iptk30ml9o44xts85msrdb7lss',
                        parameterValue: 'oyq31b263az3iyqo517pk9zn9q6w6u9q4i7luqij8z0jrifmye5om6seztxngogzw89z54q4whzhyytg71b8zvyb4wydtt6i2kdgfsdjswqdbd5e2xf2kg6igasxpjh4epi2unxmth62vsmawx7uxc9sx3yhohn28u24qv1adf0fslrgtcec6ias6n24t124cv96zxqk6ul6pr2f40bifur4l21cxc4zmaj8tl40ku42kxmygvtkhfy9ox35nh208p5p2etnawhjki8mh42zv4i5a84tvrpteeiewa5rrj9h0b6zv0hs3pnfj00dsv6oozks5nmgxdd8qnlj5zotfjixppkpoqra7usi0cuhugoxt25w4ebyblmw6d6dxjsvgypfqcqoft7kuiuab4f2sv1b2dplxzpa2a6nxt1ttuiwjrhhivno7ay12a4hzknuqqmps5md28qeabn6l1vbvpxjge9su546225qapj7ecllst8kkybkvh82mc1l225x9q7a5ybalanmeu92u3gu5clanbll4icdryb3qa8su9r1sjucx75tn4ww0rxwthmyn8289lrnp9zb0ms386arefye1orx5t0ic6jyej82jk9umxbo0y5z49s9n6whkzl8b2fia8ljlyr8ue8eizzfey1awow1abex87y4l1ttecyvqadxxsjrpxbfgjdvpk3brc7qjx3m5cnoect9w9axg47abojamilysmerspa62g8mfd1kfeolpdatw7h6lf6oi2swlye4anfxwv1ibmtppq52hddugc0uarchxir0wipjewdp6qhpdvzmhwaywomh7u1ceb029o3ei5539xjrxddbbz03rsqftluvctgbmcuhdpxuwdkeou7bvdy5815jjpz3c2emfxpoo08m5447oer929r0epj2rovjx0ngjfx3kfjslmdkxxiyq4r21dcfknvtm0kzye5idkg5zu9ljzxoufu9awpic96qq7xvinn82tbe4iqccb9afovjb25d',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateModule.id).toStrictEqual('bb8bbf47-a7ea-4ed5-a777-bd320be4695c');
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
                            flowId
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
                            flowId
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
                    id: 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteModuleById.id).toStrictEqual('bb8bbf47-a7ea-4ed5-a777-bd320be4695c');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});