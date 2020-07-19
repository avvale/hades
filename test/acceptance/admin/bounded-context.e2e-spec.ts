import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IBoundedContextRepository } from '@hades/admin/bounded-context/domain/bounded-context.repository';
import { MockBoundedContextRepository } from '@hades/admin/bounded-context/infrastructure/mock/mock-bounded-context.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('bounded-context', () => 
{
    let app: INestApplication;
    let repository: MockBoundedContextRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    AdminModule,
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
            .overrideProvider(IBoundedContextRepository)
            .useClass(MockBoundedContextRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockBoundedContextRepository>module.get<IBoundedContextRepository>(IBoundedContextRepository);

        await app.init();
    });

    it(`/REST:POST admin/bounded-context - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'xmyg8g8oo3sg2osormkpw7szu1m9nlrjnubrrdhbg6huaam76cvivo4tdxi4po6mug6djt3xa8uctkrfcbsbokzeu4h6plxr5jnh5yz7opv3uodmt1zm3s5ca137ro4yawc3z6anjwkdvk5wiy0qnzr6su9kg6bwrxs3po0z0azrka6idql3zct4tar2zylzn2dugwi4tnisesinm4ie2wqcsfs6fsqrbxr084k3jpr1tjyfrjz8xdj8a5lb08j',
                root: '3pae8t307kt050lknyoz',
                sort: 957088,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextId must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                
                name: 'uafsexkokmsname1labinb7mht16b570etie7kuzwge2ntjwkr97cnhey8c5xqrcoojda3jz0xipgn2ummrmg9s6bwuzxj1qfs22xezgedlg562p0okreo9ralefzr6czldfpw593zpdok4w0t8a2l65tfbi63y29uyymhnck4zcq3is2yq8utlfa7kdol02mq82md8z56v5ijqhxezxibvssiu0bpf6v3nzna7tkjh3tz2llsxuj3sps9xl6fi',
                root: 'jrw4b9u042uovzc1x84l',
                sort: 594884,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '55dab76c-fcc8-4dbb-877f-503e2c7c0e8a',
                name: null,
                root: 'kxis6lxzo8ftk7k1tehy',
                sort: 316379,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextName must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '55dab76c-fcc8-4dbb-877f-503e2c7c0e8a',
                
                root: 'sf1863yy5wb4icn8mf07',
                sort: 154711,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextRoot property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '55dab76c-fcc8-4dbb-877f-503e2c7c0e8a',
                name: '9xxh6svzbpglv1vxflnm74oakghw90k5tlk6wvsu1xjdhyz9clwal4d1lics91qdb8zafx9swt9stet87emztwg5csxjdq0gof4iofj12csiyf0cwhb1ng6z3pq64170eru1q6yxfbjfeafvgqgd17ei50eiuqh306fwhtgs6ueondj47hcjbwcjui29ghbfonoyggp3w572r8gqkrt262r8g1sppvemtrhzlbk02ok16ipr122iu4gnnzfdz2v',
                root: null,
                sort: 880550,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextRoot must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextRoot property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '55dab76c-fcc8-4dbb-877f-503e2c7c0e8a',
                name: '1z3ua9wjgnmy1yhnsv8cvocizuxciek3d7zupwh23xh6u14mcko39wysdrpmndx28qcicv6ql2q9po9pji99isvk350zvxl1egtko5985bggcr3hfle9f1qy6ijw7q30vidg0uvck2nxpcnfazrrjsro2frr7g4qtd3qpsb6ffqzucvpq1nycssgusbiho2udav920gu88iugpead6wqvm3aev9zcz0bggrqgyofwvknijnq2wgtgcyu0dcbzkv',
                
                sort: 846566,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextRoot must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextSort property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '55dab76c-fcc8-4dbb-877f-503e2c7c0e8a',
                name: 'x91oguvz6imh9x1lcr4dy5aitjimrpg5d7hhpfrxustzoh3pwrwm9jzfvss0plknve4ts1q519ej8e4ln9zjj4xllq52fxfql3x4rhkq1cq3wlawj49gjhiuzqjwn6rb6zqzami35t09lvscype6cu5wut5q3p19brzkdz94uwmsjvn13tyqvgeq3pglqczcwbkftvgu61dqt5mj6lkr9dcrwd68p0h5te2ngd6laoiu7ea8iyrfsidg9qvni6w',
                root: 'p0zl2qlcngwf3eudcehu',
                sort: null,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextSort must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextSort property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '55dab76c-fcc8-4dbb-877f-503e2c7c0e8a',
                name: '4ypheyuleh5yovjdn9hf167emzlv9mrmwyagbtwhp756f0h9o81n5fhewk3a0ttan7wjx07t3cvho8xeex5zonnzenb90rgfukpoknz6ac2wx9mkzphfghoetbp53ntdcy715w781d86yl3oswvcyqgl4dhx7lgm3e8x50zpl71du6lwqr9sqjrdu4fs4rj0su1pfe18w1h1e5dntvsx9l9scuo1oyxhaxtdvkcvl4ixdfmqs5pym90lz2nv92k',
                root: 'lgliw88c0ebeido94qyi',
                
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextSort must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '55dab76c-fcc8-4dbb-877f-503e2c7c0e8a',
                name: 'vs86cbrwmdduqpobu3f1j8dsnl7wqn37f3pgpo50v3fiosjdobcj1uyhxlp31rudalxxroid1ybkq8cyu7u0sjtxyj7l7lb2bf7ier6cbxqr7omb088l79vs0nn2ifcua09kkjf7a3el35z768mo00fvaua7x71a5q65d4oozfvk4vxbu0pmla7lbugp3roxlasni0ca46yr9dqo55mhko7uwc7g0xq9ekgr4qllxilspzrfpmantax0nsqrltk',
                root: 'rhhr4nl79epzjoeaqq71',
                sort: 820440,
                isActive: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextIsActive must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '55dab76c-fcc8-4dbb-877f-503e2c7c0e8a',
                name: 'y84fb91rc0x87feo8sa8i5wgqrjadwsbrre8yq21418vc8hgp0gcey8m39phbc8jezmscz3iua3rig7giov61lzvvmftuuho6rbybonwsvug8e4uxw4facig2akxve92alan6lm2rtstdvr4z4bad3m0qzu5lstdwas8kp5449ahb5612di3r177d8utjjcbxxejrj9s4gt1y59n8s9hh21ay5vsujt9hepr3s6741td70qebcmdf04ssjvtdp5',
                root: 'ac6yjt24wjnj852ucpaz',
                sort: 313493,
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextIsActive must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '0wmmnla6auznx1jxhhxw6w79fd6gh1uvtq9cn',
                name: 'ld66ituko7ypni7sgta0cvv44yhc9zzck2e3oq6jv39k2c6kxmdin3m95qqexisrtaj35rxyn3kwrqwa7jyaybi0jzgjuc2m3429k99aj1em7qxaxkzcz3r1gzxroyet7yft247znakfkp3l9160hk34cm9faztzftkcurmzo7n78jx4gee4iadsepunp7ehio4y272868ojkc17wgt68cbcsl0j1xqfhr9ykepnstoceacwoye3e58rwchwk0p',
                root: 'd79xapjk6zmflvlwvvtm',
                sort: 182447,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '55dab76c-fcc8-4dbb-877f-503e2c7c0e8a',
                name: 'zz03vo2z671d4y759zynukb7evrkmyd5rtz31e4c2vgboteojsfi9t0coafho557horqqzj807ng9pawbat8dt6x84roil6dc6mbasnru63e4ev8fb7coz0rq1rii6gmsx6rwfo1skdrvcfjh8m5chvd0w8cndmiratde22o9gvxx8spts6wei69tujrdnnltflwsqob526rs17jy6k7u7d1mase4mvc2d552og1im7nmnysn55woh1osa3guj0j',
                root: 'uxn76x4jhfu4cpgxq4c3',
                sort: 916661,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextName is too large, has a maximum length of 255');
            });
    });
    
    it(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextRoot is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '55dab76c-fcc8-4dbb-877f-503e2c7c0e8a',
                name: 'en6nw6oavuji1wufxj0j49jglv2q0ku5hteqoigh0ankdlnwj220jg60foz211o2vqg8p9hesg3y6byez9ncvlwctdnl5rqugg62er6a7fu4xdlz1mbit7775e4nu9qe56fapeo3agzoi2migm4wlc59cyyirk1omj2ok5u9ac9nuv40djare1gtgc2xqlw1415ely4zk9z0lyailxwdjegu14yblphj3jqclykrdyy8ka25xtwimlcm7wnu72s',
                root: 'n99lc2r8psdpb1it4aqlp',
                sort: 741453,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextRoot is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextSort is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '55dab76c-fcc8-4dbb-877f-503e2c7c0e8a',
                name: 'z0sz2ni3ayhb1h1arn7unv31jfkm62dtxiodme8xvpj92m1gojm2te69gh89kvo9mwmgx94dxmopi5vee4z2og7ngz0qsh9z8fcn7xjpiwfz5lv01p8opvg0jo7of30r4blr37q2plp8l3msh4a8i5j3ht1e1bcfbqql2giwtq5f16xdlyqain27squ9luzyots82kyoyblx1w4jrsdzyj3ey3dok1e1tosiywo36ybkcevxhvmlx0345ctsks8',
                root: 'h00gk5hwt0s71lfmv387',
                sort: 8187421,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextSort is too large, has a maximum length of 6');
            });
    });
    

    

    
    
    

    
    it(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '55dab76c-fcc8-4dbb-877f-503e2c7c0e8a',
                name: '2kkojj3kv0lmqb0cgo1adiv8oql53j7i6yu1o5yvyczywg21h1h7nmhwiawv3ogcxoicayfcwr8czznhwkdu27xq6vn4l2dwjfygn3j4t82ql7rnf9irbdzy8qx6lamj40n4sfmqbacbuu8c64f2zk49e6cbmfjnwghm0xnjvo5ro8xbbpb22ufej2dn9tw7jbiqlfbvhoio3408u91ajhuaqno4v2wi27ebv9ozdwhphhne3q4hh6fajwlujbq',
                root: 'uk3o25cxycsfuzfl5ck4',
                sort: 733721,
                isActive: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextIsActive has to be a boolean value');
            });
    });
    

    

    

    it(`/REST:POST admin/bounded-context`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '55dab76c-fcc8-4dbb-877f-503e2c7c0e8a',
                name: '4js1gwzqtdm8mi7iacmywp5zanx90q7vcyuvmon2r3jeovamkye82q82byqkf611f0z1te14y6589st25o3gqz1c8e93dj673fcxjo2q3nniizbc4luwhmj4ki1outru3er40nhrqe2vhhb4tsf8sk28qj0n1r394ly9h2oonmmszdml41r479v80xg1aipxmj0eg22l3rh57bdjxz3u9grisi267ymhi112eeozsrllull6ckd2nvslqnrjks1',
                root: 'fk8mkheugvb7bv9rupqh',
                sort: 972434,
                isActive: false,
            })
            .expect(201);
    });

    it(`/REST:GET admin/bounded-contexts/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-contexts/paginate')
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

    it(`/REST:GET admin/bounded-context - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-context')
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

    it(`/REST:GET admin/bounded-context`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '55dab76c-fcc8-4dbb-877f-503e2c7c0e8a'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '55dab76c-fcc8-4dbb-877f-503e2c7c0e8a'));
    });

    it(`/REST:GET admin/bounded-context/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-context/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET admin/bounded-context/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-context/55dab76c-fcc8-4dbb-877f-503e2c7c0e8a')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '55dab76c-fcc8-4dbb-877f-503e2c7c0e8a'));
    });

    it(`/REST:GET admin/bounded-contexts`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-contexts')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT admin/bounded-context - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                
                id: '5bfc94e5-45a5-4f46-a231-43550b2bc1b9',
                name: 'r23n6nnvri853n06hmz0v1hllrpykbm0umayxp3ypo1w4oudbdslp6miynscaqo2ipkm0v9dfww8kjwuc5dsxkgfobuex9u4mn3y3g9hyntxf5dddt5sv06fwz95j85wh40ia4485z92f607vw6rp9chddln50z5185u7csh3l16cjmh9p62yhod0ndry7bswivbqhmp85yyj5vmfr1mxwtsz7xvcmwicuj17e4lef2bkgrukedqesnk9c3ne4w',
                root: '5zb3m5nw2eebrrubzyam',
                sort: 913092,
                isActive: false,
            })
            .expect(404);
    });

    it(`/REST:PUT admin/bounded-context`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                
                id: '55dab76c-fcc8-4dbb-877f-503e2c7c0e8a',
                name: 'f9ax9rrzhtdbsxedbehgy7o0vbo5rmjxsbjgpz1698bki5dgsrabs9t548sdsvwdpvayycbahabb62he3ck3x8zda0ln61f6gkraih4uf82gcc6dbopwy8aowzo0sb21pncdo0lpv6u5lgourqw0bcxqe0a1kd6rp3ldwisx3h6wo9t1qn3dc1izvqfjzvttac76ox223vkx4bxeij31wpvq4owy2dsc562wbv5yng413ikuahpaf01eajx50at',
                root: 'i29lfgi3likssznusnw9',
                sort: 108698,
                isActive: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '55dab76c-fcc8-4dbb-877f-503e2c7c0e8a'));
    });

    it(`/REST:DELETE admin/bounded-context/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/bounded-context/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE admin/bounded-context/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/bounded-context/55dab76c-fcc8-4dbb-877f-503e2c7c0e8a')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL adminCreateBoundedContext - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateBoundedContextInput!)
                    {
                        adminCreateBoundedContext (payload:$payload)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
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

    it(`/GraphQL adminCreateBoundedContext`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateBoundedContextInput!)
                    {
                        adminCreateBoundedContext (payload:$payload)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'fe1b0255-e70f-4ff4-831e-dc9cbc2ec6ad',
                        name: 'g636p7lw47du86pm60rw7fle0ewrx4i9nuydnr200sxy9qywylgxprhdtfiyei3smdz3xfsqjjcv6tmupx3od38v5xl2s2ixismr1weo5fu3zofa9273ugphyunbjnk5p43c0dgyo7ntwkvkal3vsgayfbxphx2jt0wb1m3oispewxdsuvvjvp14od1lb7gf6kik8m8jn8y76gkceaugc8pslvgcn4xaja8uq6h17uw7fwucbj56iwomk6jpdvc',
                        root: 'myqkybwm3n32so0xyt8a',
                        sort: 534143,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateBoundedContext).toHaveProperty('id', 'fe1b0255-e70f-4ff4-831e-dc9cbc2ec6ad');
            });
    });

    it(`/GraphQL adminPaginateBoundedContexts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        adminPaginateBoundedContexts (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateBoundedContexts.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateBoundedContexts.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateBoundedContexts.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    it(`/GraphQL adminFindBoundedContext - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminFindBoundedContext (query:$query)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
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

    it(`/GraphQL adminFindBoundedContext`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminFindBoundedContext (query:$query)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
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
                            value   : '55dab76c-fcc8-4dbb-877f-503e2c7c0e8a'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindBoundedContext.id).toStrictEqual('55dab76c-fcc8-4dbb-877f-503e2c7c0e8a');
            });
    });

    it(`/GraphQL adminFindBoundedContextById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindBoundedContextById (id:$id)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
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

    it(`/GraphQL adminFindBoundedContextById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindBoundedContextById (id:$id)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '55dab76c-fcc8-4dbb-877f-503e2c7c0e8a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindBoundedContextById.id).toStrictEqual('55dab76c-fcc8-4dbb-877f-503e2c7c0e8a');
            });
    });

    it(`/GraphQL adminGetBoundedContexts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminGetBoundedContexts (query:$query)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.adminGetBoundedContexts.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    it(`/GraphQL adminUpdateBoundedContext - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateBoundedContextInput!)
                    {
                        adminUpdateBoundedContext (payload:$payload)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '986bf331-a8a4-49ad-b611-e7a6b2802b71',
                        name: '4cvmrc618xm0k4x0l85a73pnuawhjohz9zsb8w7p4clx4dhthev07yghuuy7l0yewyusif9blf1s8ggff1718yss3ezclpb1u3stzepenab56w1mmwlt46yrk5mef9zq4bvaewhjkc8ij7cxt7ulmfere9bmrvdy7f1617wq3mlut4u78br2i4vb8eywsbpt7nkjpxichd9fum0lw39hgkei2jf1uz3gh8nrhs96p82ehp7tpk8ntrb2fiku4tt',
                        root: 'qfq6t91iacn1z8xhd2zj',
                        sort: 423718,
                        isActive: true,
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

    it(`/GraphQL adminUpdateBoundedContext`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateBoundedContextInput!)
                    {
                        adminUpdateBoundedContext (payload:$payload)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '55dab76c-fcc8-4dbb-877f-503e2c7c0e8a',
                        name: 'jc4hgh7xk1qkgvk0atpx3tnar6e5g6in0vo4utuy8tla5ocnv4qcig4dqq0ps02ykl0b6vobsvhpi63gqsbru8e9i05jcegbf4qr3iii1u6nzcadb16bvd4tmzloytjy0z62d4anjt6qlde02946dsqlrdh9tf9qfn9r7dicw97bzli0qz7gi5xlbekd7gui83ym38wlf2l1b6pju02vi6yk4cdiazehkdaajctwe9w14l75tyvrua0m40o30m3',
                        root: 'h3ppgy4clj4m2u5u8lmz',
                        sort: 561609,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateBoundedContext.id).toStrictEqual('55dab76c-fcc8-4dbb-877f-503e2c7c0e8a');
            });
    });

    it(`/GraphQL adminDeleteBoundedContextById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteBoundedContextById (id:$id)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
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

    it(`/GraphQL adminDeleteBoundedContextById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteBoundedContextById (id:$id)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '55dab76c-fcc8-4dbb-877f-503e2c7c0e8a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteBoundedContextById.id).toStrictEqual('55dab76c-fcc8-4dbb-877f-503e2c7c0e8a');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});