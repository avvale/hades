import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IApplicationRepository } from '@hades/o-auth/application/domain/application.repository';
import { MockApplicationRepository } from '@hades/o-auth/application/infrastructure/mock/mock-application.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { OAuthModule } from './../../../src/apps/o-auth/o-auth.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('application', () => 
{
    let app: INestApplication;
    let repository: MockApplicationRepository;
    
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
            .overrideProvider(IApplicationRepository)
            .useClass(MockApplicationRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockApplicationRepository>module.get<IApplicationRepository>(IApplicationRepository);

        await app.init();
    });

    test(`/REST:POST o-auth/application - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: '4ns7bks271v98m2r6vzpr2r812aeeu58t5ssmhpwcgaoioby651vk9i7ezywuzwwf9lsn8j89xdobls50ijbnb7chzkd4xuqhz0feelv1m3bgy8rcssx09amo482w2cha69brjw879auz7pf1332jqm7nkt7ktbma5slareldiargkiqd6gn3e84bns4bsn8ej0xavaywawphzasoa4ajo0c3xtrscy7fyvttdqcze1wxdsbns7ghr1qx4kgox5',
                code: 'r9u8wvkw13y9hk69mswajidy1ys1qcstf1bb6nns2qu6ojkdkc',
                secret: '9fy3y9bp4gvcctf3j7y288z6c4n5cir2z5fuc0flm25q1qf9np9su8o4owtqg44bzxhs3f4nqlzycdneg4gj0sbz1b',
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationId must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                
                name: '0iuibzc0wb63j2egbfacnz044n6vnhh5dleo4jn390nbtggqxtml6vtll8qitufm74cmalimvk1hpni08a9ges9qzo4refhdha0spzdjhgvfwfd1e6joqoun5nbn48lbh6eawo439r3fwenujqayyow3qanhwjegh6bf6w6gbkdw88chs9rf88tuutuhseoc209brunfdodfpyi2vto0qte5cafoj1p2g5ttphpahtsun8wxrn9cuhv53l0h5bb',
                code: 'da46m0dwrr89i287qruk2hqgcjdyzp4twkolga1elpvaf50fvy',
                secret: 'v7khelqwamtr116wo17xrtu25oc69cv0hgq7ajcwgv1o6vlj3mh669tbmb8jz8hulor4ihc599k80lkxj89y992cgl',
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: 'b31a1e0f-8494-44b6-93fc-e144abbc9e25',
                name: null,
                code: '24rynkiqephdezrhblvt1hdppe5x3ju7fi0m7y91zbutwfzr1j',
                secret: 'qfm0dyi1kbd2pvyqeghklow2rrjvl4lj1qw6xkjm99zvj6h61ffyciptpdvimbef4m45fsot144idllwgjd24h012n',
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationName must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: 'b31a1e0f-8494-44b6-93fc-e144abbc9e25',
                
                code: '3xhq3onapgoacki4ju5zr22jazq7hmsipcq9zxz8siqk30sz45',
                secret: 'w3sn0ww7sdalpzijsmg5yjjgnlcvmrz19vcaawys24vfg8g0c40xi7rbni1839dtm0zkoa4r235lvuzfayz8wn9jdo',
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: 'b31a1e0f-8494-44b6-93fc-e144abbc9e25',
                name: '61f28fdeaqnbr6x5eqdc0djw63ntvz4skbcpt23rh0kos889fceqzxgm741rayullo853hy2u9jre8fmmycs000dguq9fj3rx2lj8w3rcv83fxwy0mtbi79nbdminl9nr9al4e52ae173zn6dyjjm7qd2wro3qdrudqi5ts4kccshyest8bhak59di2uwmyvkxavlit79ogl6v0u450zo2z070ptj27ynwolx6fvkx0gdg8itd4s3uvnq208ze9',
                code: null,
                secret: '7kwtidpdpgh1ofk34e5dqrsxtmq2fspirbdk52uz44q5199y0wvzvqrhw12ce0nimzf2svy5nq4esl8ynzgy4m2wq3',
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationCode must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: 'b31a1e0f-8494-44b6-93fc-e144abbc9e25',
                name: 'fhqdetqx2smzpoydadpo90tin2bpsyyaf353vo9ff3fc0meyr7j4wh2jlqmywezgmajxuygjnvm93p9qgkihaktk4rny57hvlu25mkr4cr6v4fg4tavd5ziz8mg9v8vk7eq45mppdq6f2klmbfc3jgw826osxxkt9qz4wfykf890coyo12tixdhe8145esnl0lyfzencj4ycn1tn1eiowyqi32jz9b5ga5cyamo2tgqncgmtm9hh8jtnppvax18',
                
                secret: '3hbm7zzdh0c6abk2bb7c644mlcfmmzgkyy30uz7pl6vr5n3m9y7on08g8dvqiqwu4s95z12j9s32xnxut1ftjkwcrw',
                isMaster: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationSecret property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: 'b31a1e0f-8494-44b6-93fc-e144abbc9e25',
                name: '62u1a3tyg21mnihllh7wrcdlu1hc8a5lw5entkl0jm9gk0s3jrn4qb8ra7vy6fg7pixv9ncopirjujevxdg11immr98h0d9s6nmtep5haexclv3nk8r5wfxaxme6nvc86t9nuyniiyz76uf2vo51uspd54rhnabs36k8wbjy57s35ohs8rah4g851w0o2ipqidy6l7q1o1obf2h85dox40xpkuyn34xy5iw0xomlz76e0ynufkm7xr5tmy0ewu9',
                code: 'f8nccdszg1551zaur5yc8fpmt8f7w41nsbn03k1gfewbcqk59e',
                secret: null,
                isMaster: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationSecret must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationSecret property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: 'b31a1e0f-8494-44b6-93fc-e144abbc9e25',
                name: 'o8e2dq6fu6n02p0oogmvx2j2fi5mxty61ieji9i8ko5v02jco73e9c0ch1hjtqqcd4u33a4ox3u47gyn8v1wixmvsy4zghjdoj2cmsycgj6tdcc3psp654u3xx3c04cvjgz7a1bv2xalt8igwyxmn3new12g404v1nb290z41rtqn1vgo7zy8gvlo82gagatmxtklvm1qipo3t0nlg49w47wwomonoby7hdkgu661mjt9bk07mjm97hw1nsoz5t',
                code: '01ous7fs2idhl9ya78ejx6h571yzth32ketmjsuzf07p0rqf25',
                
                isMaster: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationSecret must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationIsMaster property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: 'b31a1e0f-8494-44b6-93fc-e144abbc9e25',
                name: '7vts4b0n296ewnfmllc89d1f0i5q22jpiz3wdi53faekymtfc6jjx73iuqoftd4h003drd9o2za8e6bp0gm05t5098lkg5fi632p7kg759b8osfr70f5eazerjn1mq4eihq2yiqlgrgaae26yzg5cf2dprmaw3oq3nuz77t98wv4r1hpsibaomvrca187fwbjef8hu18a3fyvijzp2xnqh14a72dl9fnbazukvugph5smyh92n4x7rsprex2tph',
                code: '8a8nemp84r6y53o7flvkq8tdle4lw4qu63l188entgguh8xpbk',
                secret: '1rrzpoelb0undghe4aua61860mj3rjhvftkc0rt02lfoylhk1bqm0hwd6n2cb7ntynr2eclnkhbxz415cnqgwzywu1',
                isMaster: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationIsMaster must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationIsMaster property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: 'b31a1e0f-8494-44b6-93fc-e144abbc9e25',
                name: 'maet0083gc2hj8katzb0d9suh6mo8nx2zqm5d6rs4y6ns4fjdjbtm7345mq1apft1y7cjgat34e3wf054nixu17gprnsqpx0whnaod0d6o1ka5wlhdmvix864z29ss9uzat3u344z8xto5kon51uq0ixj64dsesfks942ifdg5zxux4yxmmwlz8n0x1top60q6gedeqpoy53fu8b1wdy7h2keirtigejkffhpr4wwtbcmoqmwsv4b71za6szkn2',
                code: 'mqh5b1syblqoadshyr7ejxwslr8f4wu00ckg4dqmyvw0mwzxlv',
                secret: 'fkab5l8kotcrafva88109hsws77c70pjgsdd8ng7u4nwl1hx93kn5nvp9ntt9z5hv02mtxlimu6pll3zy9wfcbrntp',
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationIsMaster must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: 'fnac6i26dfkzxls21j1zo2avxlt2s96mlb3if',
                name: 'hbr9xxxheq94eyln3ehredq4grg58os227o4kq6t2wlq6s5xrplqula4nj4e6ibv0e75234iq4cj0wyh9s1jj34ke4tvglqk2w0lihsm8wde5vx7xx99164m13ebj0w9tfbx4kfbrk35cf49gqof8mhdou5y53q8s30qemgr30gxmphn13s3iun50rg0rzdpbupif28htovzhexlba66s3odvux3okef5hcutr0qx86bzcc6lr394e27xmenhd0',
                code: 't3si0x97s1nmqo2mwjq5mh6gqaln2thlumhjljr16tz0so27dv',
                secret: 'tkhliox8pkn7mhbwr8l32mcvtl6e6i7a0lzlckqmg0d0jklnc8qg91tvo3de7car71ntgq9yq6x6aqqzuuawyfx5i9',
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: 'b31a1e0f-8494-44b6-93fc-e144abbc9e25',
                name: '10pkl4aehl75sily4pxxq9qoqs7bc5errauvanlknb0fpyfkh9ivjc74bbn2vr45qscjso2nssoczf9aidewrsovvy2fpz0ahagx99u1q49pquloy7uc6mxoglecrzhlnrqc08lwgq1jorts07decbr8s3okijul2c03jlir59t45k0yd3bht3n641n6dbhxanzc3ml0p6n3epp54zxoplebrsr88is9tdvqw95pn582uujzux6r8wkmhe9dcr1x',
                code: 'ns0xzb6pj83aa79izm4kfxufo9tde574yv4oecj2bovoi2ixmt',
                secret: 'y7cy7ecgp634mhb4iju5q7s077otnwd3dltjyg1kotx4p35w5zqxg4x8shpwat121ftqzae8k9gpt6egrje4f1uki2',
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: 'b31a1e0f-8494-44b6-93fc-e144abbc9e25',
                name: 'gev70dc5eivywee3kyd8dwvz6238jjqclf7hr9btzm8kns10oxzqcwegmngd875w93451f8y1aaif79gavtblbt6p5rhbhryjah8zcg1rsjoozwftn16e4jrb4srqztr54qveb6qvxcotpkraljbsvoqorwrsifxotumqrkdvhmt6tmdj73j02mtyznhl73qocjoe7lvf8sw4njqqk8vmcz16m6x0zpdnd7em6e47fpaogd8op72vj5ijb1l0eu',
                code: 'harjo25hssgb5vxwbkq3khhh32g88o7iianpfqxjttao8oxp5u4',
                secret: 'u1nxqtl5ebx1lf9gdqyu02vfgtj7jy2fyrc5envxdufvnhardpfla74bqz8vun8gp7cw76ki42ta2n2n9emddhren8',
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationSecret is too large, has a maximum length of 90`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: 'b31a1e0f-8494-44b6-93fc-e144abbc9e25',
                name: 'z8z1hps19n7f8wg9lc7wdntzztfhxwsa046ix9t7h0em6x2ifurzbgpporgdb3fowk687rsqoojeeavne7f1a4d3s0phn0vrsi06jviijhsqjhsm03oza1i91f5o3g482wtuw8jymbmapzkbh51w3ht6ov5qon1v19ugmb72gm2j3adu8xa5cb2ol5mdxvea166lw1tsuuw2epzs51qlqfsprbhn8mpmmze2wc45zv52yu8ljygg4rnk9rwfmvw',
                code: 'sln31lyjga5o4aakyk9knl03wy8tsa3no4m7bra2lumjpqh7x0',
                secret: 'bebpojo28bq0eevpwwysdlky4lu10xd7mfelfcwtocesv4finbkhmehdw7clh5lyj0bb8z2p4zypu4e4ux7fmh8r387',
                isMaster: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationSecret is too large, has a maximum length of 90');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationIsMaster has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: 'b31a1e0f-8494-44b6-93fc-e144abbc9e25',
                name: 'd5xvj7fsog8bxf8g8nwi9wsc360i6dce8gkx0t7dfaavelfb4k9zq9l3ljin2wh3htq9a51ppo7cgzojfk0y5a8xkjamyqiqubpbvkgnhegmznq7u11qloy4lst9u0ewqgmbs4m22fleg26wxbcr0c3hjz8jn4et19yb0icfp1zi6au0lcm2feje3fo0hay1h9lj40oxs7o6bl1cuhch17duzmvmrqvb5tdgzkd8qfdta0xhh8j9ol5jnab080e',
                code: 'g4qizd3pgs1vzqxcy9jqkayglhxeubt37koz41rddvt72kjabl',
                secret: 'ut9g69r6wydidf97ivyfdq5dw8mibpjc5nvnkv64m09k20lwnd13sz4squr0pxcswq2tkun7qlkc5vgj1ujsfzyplp',
                isMaster: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationIsMaster has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST o-auth/application`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: 'b31a1e0f-8494-44b6-93fc-e144abbc9e25',
                name: '6dyqkhlakv82aeppft4mmjcimulbizg5gki6nq2klizpwa6nirmbgozsoiw61987gi1wpahbtw0stvx9ruqh0ei6czsxkujlsv7vnpdot2iuy05xrqaj5xyp358hc9ppzrz6o3pd5r8nlzw9943axty86r17kk6z0dn5n4bhtt36nlesoseo6q43l7oaq51zv00zlylcaonv3e8mtcowjj5s9o57rzidk1xronizb5faai2wfhod3712gtl3b5q',
                code: '6fkgn94wriqw8q0vmrnd3ut5eelbhvod8d6az01uuoxk0kq0np',
                secret: '9tujpf1lg6ezdke415remx98un09neii08orl4kfiiuduaweuexcui1l8pg27b1vv0q2vw2ojzlbi1r5j1601j71p0',
                isMaster: true,
            })
            .expect(201);
    });

    test(`/REST:GET o-auth/applications/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/applications/paginate')
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

    test(`/REST:GET o-auth/application - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '759a05b3-f0bd-453f-b3fd-5e1eb7d95599'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET o-auth/application`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'b31a1e0f-8494-44b6-93fc-e144abbc9e25'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'b31a1e0f-8494-44b6-93fc-e144abbc9e25'));
    });

    test(`/REST:GET o-auth/application/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application/c3f93f34-cf53-4d87-8de5-89501794c359')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/application/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application/b31a1e0f-8494-44b6-93fc-e144abbc9e25')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'b31a1e0f-8494-44b6-93fc-e144abbc9e25'));
    });

    test(`/REST:GET o-auth/applications`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/applications')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT o-auth/application - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                
                id: '51b88b43-f819-417b-861f-566d22c93b26',
                name: 'zr56scj3eq24e4ohzat7dpvp0tq029w4sekzo4lfj2hm1glcrv2ysg81z9dcbf3s8mu2is95j75jrj6o2xr95fyoor8yk8tk9tcvpegzows455vy1ndvd01rfdulnc4tyb5xcq1y5rmabz8ehj3ata91e6o2d671f8cftt6l2ivrg06x0gv6695q71uykv9rp19mzz2vbav5iucp4gbj20a5isd4w0r8m7dv5suewaw6kp10dz0vuro9qi7q7sy',
                code: 'pbpnud4rh0s4b7s4dlh2qpgm7txyjqun4pm9fmf8bkawzs36t1',
                secret: '1z0djhrs8vgbb7tpf2879ir24n0g09p6t5bwzkset5q3yg6nr19qjllws6ptghysvw6p2u2j7so50r3f31ntgky8wm',
                isMaster: true,
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/application`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                
                id: 'b31a1e0f-8494-44b6-93fc-e144abbc9e25',
                name: '3lt78y7o5g4fuk6pjxb2svps01vxoy9f83hvrtgii83boxooizzpmqj50746wgxszmy5sui0wl1prqaips1j3oeh0ng8h65h6fc0dq00sp1541v4txsylx9o8324gtko5wrrqvr1yjcojqfr1epszj2pwkowrqevego2hurwb7qfhbghwkpfiucpnnc5720lq21e11wqh2r9c0ud411iiifsqpvvwjaoixfxt02559n166lza8iorisf5hircl1',
                code: 'wyixzfalqgmlcuedh1l9ry3okdgb1dj0e3br063raexhknlkt9',
                secret: 'm3obdffwlr6cvb7ce0jnzfhdu79gbu2wo00w3ozpegreig996q98q5p2mbgv3w43ov4k8abxy5l2gimbe2q3hkwh4f',
                isMaster: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'b31a1e0f-8494-44b6-93fc-e144abbc9e25'));
    });

    test(`/REST:DELETE o-auth/application/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/application/f8956891-d6bf-4d1a-81d5-b1fb74e7aead')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/application/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/application/b31a1e0f-8494-44b6-93fc-e144abbc9e25')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL oAuthCreateApplication - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthCreateApplicationInput!)
                    {
                        oAuthCreateApplication (payload:$payload)
                        {   
                            id
                            name
                            code
                            secret
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

    test(`/GraphQL oAuthCreateApplication`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthCreateApplicationInput!)
                    {
                        oAuthCreateApplication (payload:$payload)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'c3e5f8e2-700e-4691-b3f6-2217bc48d769',
                        name: 'sx7hbi7plhyzqz7m2dlr55ftbv63i0dx71v5v9gaqn7h0w841sqzpu256p50zz5n30sba8nv0e09vad8ktgalzczj86smyxv2732zvsvg4m1p9hfnp9jqsitos0g8rr4vfmop7fc52wf4obb4vlx9xzbqqw8fpt5bzzt2yx57zybog1gkucpt2x87sgeiu8cdm7fr3h9e7wdxm45bwf1czot2i8sz8cclc0vuw9cm2928xietrix4pe7ttwrusi',
                        code: 'arjqzvo2znd8yuo8wl60u3ccjvy5iidjbtxhj9aihiz0iqwz94',
                        secret: 'q54gu86usq31vl4zejwztge461ptuez0qjg0n2veh4cgblxmkpe8ic2hcs7dz8z723iiuos57m4px64oogs84rolsr',
                        isMaster: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateApplication).toHaveProperty('id', 'c3e5f8e2-700e-4691-b3f6-2217bc48d769');
            });
    });

    test(`/GraphQL oAuthPaginateApplications`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        oAuthPaginateApplications (query:$query constraint:$constraint)
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
                expect(res.body.data.oAuthPaginateApplications.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateApplications.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateApplications.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL oAuthFindApplication - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindApplication (query:$query)
                        {   
                            id
                            name
                            code
                            secret
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
                            id: 'c2ad2efa-3eab-44a3-b4c3-e2168bcbee00'
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

    test(`/GraphQL oAuthFindApplication`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindApplication (query:$query)
                        {   
                            id
                            name
                            code
                            secret
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
                            id: 'b31a1e0f-8494-44b6-93fc-e144abbc9e25'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindApplication.id).toStrictEqual('b31a1e0f-8494-44b6-93fc-e144abbc9e25');
            });
    });

    test(`/GraphQL oAuthFindApplicationById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindApplicationById (id:$id)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '642e8b4a-d7a0-4872-ad34-09633410b39b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthFindApplicationById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindApplicationById (id:$id)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'b31a1e0f-8494-44b6-93fc-e144abbc9e25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindApplicationById.id).toStrictEqual('b31a1e0f-8494-44b6-93fc-e144abbc9e25');
            });
    });

    test(`/GraphQL oAuthGetApplications`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthGetApplications (query:$query)
                        {   
                            id
                            name
                            code
                            secret
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
                for (const [index, value] of res.body.data.oAuthGetApplications.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL oAuthUpdateApplication - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthUpdateApplicationInput!)
                    {
                        oAuthUpdateApplication (payload:$payload)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '00311c0b-3585-46c7-9619-42953690150f',
                        name: 'eqo5q8c3gou2nagv9qc4me9htaxdqjgvl5tyzzebwnp7av93o7xwkcc77b9dy558ndepnqsr374eoevv7n1x7gf3r0tnjqexlsn4kc0vdw29aqphw7rbhid6mo2x2dt0l1nsdkls1exv3gr327sfzmf1en2ciiwwv5ixe089ds4wm6o74gxunnu4mr7yise53wa4lx8hszp9mzg8zzeqm2l7wya09egdxoxnujpia3c5p1swc08f345m22e5kry',
                        code: 'a337rqy6a2jl1xprccs5if1rhgc4g2utggri19wkg9dsarxew1',
                        secret: 'o5o3rji7httl9j20p37c3fk3h0kvzg5e5a8y4cck8i81fb9vybqtdzlc5oyaa0q3d80pyfcer33szqw7udjvbycls1',
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

    test(`/GraphQL oAuthUpdateApplication`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthUpdateApplicationInput!)
                    {
                        oAuthUpdateApplication (payload:$payload)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'b31a1e0f-8494-44b6-93fc-e144abbc9e25',
                        name: 'rc8hu6k44q2w9pl3fur81zsnncvkf39vfa9kzsxkj62zkzt8rs6sktf0yfs9k1f69gqg83xbe54iss1gszjhqknrhglw945km8ddc5kowoacbwlxpyjg6tydwmzaqpkr2bpxnn536oej6lcwjcemokzgk3xgu4o1ymrjbpo4wb9lx4g5e2tovr8uifne24venqlyi1s7kx5hq8kgc10scwvrqk05pkxn0mcowq1ha5yqeb4c9gp02iy0fkpzgdn',
                        code: 'y6r722fxu3zex6jd87s5jx63exknpmt67nyviufvxtp573qmj6',
                        secret: 'jzewcei1abokmhqy3rczih23xn177o6xdbxg0hw6jggtl1l2itfx4gw7j1rq0qx92q3oh1937142vizh11ooy2raxq',
                        isMaster: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateApplication.id).toStrictEqual('b31a1e0f-8494-44b6-93fc-e144abbc9e25');
            });
    });

    test(`/GraphQL oAuthDeleteApplicationById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteApplicationById (id:$id)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '0e646d41-a322-4d58-8605-205de9cc66f3'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthDeleteApplicationById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteApplicationById (id:$id)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'b31a1e0f-8494-44b6-93fc-e144abbc9e25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteApplicationById.id).toStrictEqual('b31a1e0f-8494-44b6-93fc-e144abbc9e25');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});