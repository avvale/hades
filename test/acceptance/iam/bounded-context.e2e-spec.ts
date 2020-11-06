import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IBoundedContextRepository } from '@hades/iam/bounded-context/domain/bounded-context.repository';
import { MockBoundedContextRepository } from '@hades/iam/bounded-context/infrastructure/mock/mock-bounded-context.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { IamModule } from './../../../src/apps/iam/iam.module';
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
                    IamModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
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

    test(`/REST:POST iam/bounded-context - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'd0nm2qt1nrlniiky49244vceb1f4ntcs9ikwe58tohdyua0kj5twgvicrtyr1kzyhgyhj9nd79vj1w9fuivfmhzt9ssa48b7f3uoweisz892chbavoyzmowv6h7yjfvrkrfjx0gou6eyg5cgvxybb3for871kwtexdmn98oerrib6ifem4mad23p40zeppzn2f676d8avmhsn2oofi8pyf84do5vva17stghi7vs1afx3977463uc629z0apzsq',
                root: 'p1igqohdh8v64xwpk6k5k2ly5bpp9q',
                sort: 469421,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                
                name: 'tc22ixpopzxuffd79zzx56oijuyam4mji3ax351ff6f82tvqwpfjct9wr9zjk6nsczo6xzfpv8x9kbk86ryd708j4a4vugkvtcw1vey56we6sxwtvr27jz0lpibh8c4zlvcw6ott4bw8ycs0rq5735ifsu443413katpse7u0icuyj3rkictbf9cnef4bmghwe2fmldyzab88suyw17xos4hcd7fmmsishmg71atf5jh4gvnwrzd5xoeggrd2k7',
                root: 'unix2883qju7ldn2aperaxyfm61uh0',
                sort: 811111,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '68e68d0c-2794-4c69-a461-1b530fe46c08',
                name: null,
                root: 'e3q9q4zq9xjqy5f6v5ytwahzp4xx1r',
                sort: 331968,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextName must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '68e68d0c-2794-4c69-a461-1b530fe46c08',
                
                root: 'q8b6jso2twc4dor4k5h26idkeisvsh',
                sort: 657791,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextRoot property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '68e68d0c-2794-4c69-a461-1b530fe46c08',
                name: 'x9nml4pcj3x28b6xanm81wsysmk2g8jwlq5qvi14tiy3v84605bc806svjzie9exrhshf42i4014161wd27w4ysiz3da2y1q1viah9qqxc8iz1b9p5fhyaucyxafxuhipfq9d8ynf706vw3zwrh2fn6hzd1qxf3io2ia8tn42iolld3v7utc55r6hsvdga7w30sh4hb4e6oxkeifrea0rqnb81si3w23w09e701i75mo0fwhw2z3fea3y61malj',
                root: null,
                sort: 613206,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextRoot must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextRoot property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '68e68d0c-2794-4c69-a461-1b530fe46c08',
                name: '48fpiwq302f3cr56m8yq9ft3fsuw86g4gznjv6tnodexy3n0avia3c9pavsbblejda2iikutouvgaxog4ls2k3hw48rt21xwts4cl786g419jwyznsfnfasykql1155bfvzadbeylvad66a3jp1i4bu05k6jji382q075411hld10ki3nofaxjsn1z10zpv2cmqup4abbyr55nofoarsv47eyb5yepen2y5i1ow8q33t31wkn24eggubzvxnjkd',
                
                sort: 266767,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextRoot must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextSort property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '68e68d0c-2794-4c69-a461-1b530fe46c08',
                name: 'nt798338396c5v0js23g4jk0ej0h9dz1gzwbam3s60sekxid5aos2le0wmuiiiy3v63gv51riiab8l2f5k917a42kbgu1rnxqbxixidkt68k5aq7iixa6uxt9vjqa704amwf30k8mfs56ayh7dh8nfr5b86bxqjhfid3occezry8lllk7mopm1oqyzz1t3izzccp8o3zgrsl7k5fc94sf1s9sxmss0d84f1pdsk0hdbvnd07zpjnim7z4zl3pjp',
                root: '7esxpcaq2gbad0rm51imlepp6pb4js',
                sort: null,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextSort must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextSort property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '68e68d0c-2794-4c69-a461-1b530fe46c08',
                name: 'sn3czn5dqxwqvhobz0b5vpnnx86sdlrve7cpdjluxhrz0iqoyyeu7pxbg9ub0jng26wmjnihmga6boiztxhl6ys9hrauo17wim5pldtpnoqqgb9fvjhh76mn9ei313hyjd8tfifseze0w22s36uf8zglw3edcmd6mf8m06acjdbvg0a37vpmbhfaknph42fclhrh9kx7a8f1alj93nbajewz0luaghg8nxbbajwik33ngpbewg7u302wfdt6enz',
                root: 'ubqc82btg5i23b4vd6ml9elj8yfaiv',
                
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextSort must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '68e68d0c-2794-4c69-a461-1b530fe46c08',
                name: 'tyr9wg75b538mzswo1jyc2fxn4aq2wn6wxq5fc86led23aa18prh1afuwmdgqg1fv9o12kzdp1kypioncm7u93la32tv8bfa6rkfumga10iy6wnbl2rrrerbzakiuunuq4alh6ydn6l0hkgl2r5ouepuxyuhznx3btiqc2r3inidn72kf39aqlu17n6rd237rhdss5uhvncl438acpiruvyiawf0du84w31195dlqywe2foazwpl9twtm4s9y8a',
                root: 't4yhuyomj4y0khxjqn4iwtwowb9eg7',
                sort: 322858,
                isActive: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '68e68d0c-2794-4c69-a461-1b530fe46c08',
                name: '9zdtnbd7yiyey574nptbojrk8egq4to1yy78yn6a37l0jbx4eqipdu561o5t5c3pwd6sr3gdd1l81vrcx31iefg72luiir3zyvs7mtlm1ualyaqeim1ugbimhh415f6om64oxrf8g0n15dnk41q6frc1flqy0203r7j487hb018ed5n6ayovk0ix7utdfywp4lj4wq60s666i0syd9eumdohjncqfoe8mpywo35yca1f8uvyxlgaxwjtgy4rhah',
                root: '5ckmgu49vj8ejrfp9cx6m1qw39kbks',
                sort: 233020,
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextIsActive must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'hgu45p4ppf1jhqali3bfprz74dpcdj4g09nn1',
                name: 'bc9r8h9il5hwrirr2k605ntmr0jlt6hwmz7pu0pt9yri1d57j9lmlcfx0vo3lwposurlpxa87xjcvr8es5z6mb7xckml37o05fuqzhkt5mnz5i9gr1yzkscl79eiib5tkaphlikm0reli01o43r69xynskiqgvvfajdixar2u6xnrnvd7ssg1s8r5l8xij6nlls4abi14ui1xaie419rdhcfkmmht6mlhtwpgvk1tauwlgnj8qojcmayt130an4',
                root: '0ryamrc90k2bxrjkat333fpsjrq7rw',
                sort: 188258,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '68e68d0c-2794-4c69-a461-1b530fe46c08',
                name: 'wm3emfs5hj7w9c4so58ratche451bfo77jzfs4kw4thrfwbjx67pxixu79mt867nynps0zoon552u3mh629w0bc5qn25r61ei85z8tnk212zo6p45yl0jao0ff4frm7itz5q81xplavzj6cn5ic2i8pxywfhqpi230jaf5yo3etltck57e3qze74mo1zkk46hljhjwt1spzd2qty9ifuc152z3vjdiuaodbiny3z97sp4rzan54h443mr0avux45',
                root: '8ai7zxm1il6fdax48tf0vhtrutrp5e',
                sort: 264748,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextRoot is too large, has a maximum length of 30`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '68e68d0c-2794-4c69-a461-1b530fe46c08',
                name: 'ndv98kck9yiydvyhqepqexf067fqqbxc5zm0zxah3m2tnzxfxxu4necl8hb6w5dmszk7r8say7w8g8z9pbm8czr82m3msm7qvihm4j8ynqjjuf8zuo3kknop73o50kfog6wbtgqmlyq4mb0pstbpvjk1cllat3fwrv6535gmqwnfnasfjna74z0n7op17eqvos2wt1mg4gcs050li0ykeey7sg52q09w5cjd8cqzz5gickcuy5agfmz1zizdw4h',
                root: 'rnilmx0fvn6570d71c60avj5tnshy8i',
                sort: 346552,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextRoot is too large, has a maximum length of 30');
            });
    });
    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextSort is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '68e68d0c-2794-4c69-a461-1b530fe46c08',
                name: '65oh1i4dsuczhlwnjvdczkx01wgj6jt8srr24s487nu5w0i18f7lxdo09hunpzu8tozodv76hgkbzjwyfcwl5mb63gbeekl1xhan8gb6att4vvly34gmgubh6xw60tdoe5g9kcpjv5pn1dci1ml9lsttaam3j31jzc5f4yvwhqxhtd93boooqwz5vtc32m6hqimlglcigt44c7dasxg4r9altearq6skwekb80qaifkt5ih1qrsbsj5efb3tlyd',
                root: 'bq1rvgddpd7gn2pcgtabbolb16bd1h',
                sort: 4458060,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextSort is too large, has a maximum length of 6');
            });
    });
    

    

    

    

    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '68e68d0c-2794-4c69-a461-1b530fe46c08',
                name: 'cir01ar4aq5rt8qstqjk5ms5lvuohk6xuxfo9uk1mx6lul9f2rdallpmlamfjha687an348akeksoyqpv7jjcwib0ll6lwme77rtphwfkwk602e8a6lhbxql7mzyfgrjjo9ytgcqmrup1c5oaa0vpnlpu7v9qjhryf9xkquteznakcyegiyg06slxl9g9olnrjj0cbwruk81y7az0bxoa84d76jribn7gg5x6ngjf2ox77tcr2r11brdyc8xj0a',
                root: 'kc6lqrqko07bx5zza2uk6i80g281zd',
                sort: 882191,
                isActive: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextIsActive has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST iam/bounded-context`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '68e68d0c-2794-4c69-a461-1b530fe46c08',
                name: '9tj27rl0c52t9phfwir70zfl24vyp4pq7ireih17frykla62155kopn726w7sg0w7kehi2zass7xbn4e8mjfp3o5ahltc1jewdx1wrveazqgoyoqdhmcny7dg3iyx3c4v855lomg0h8gi6fnzt588hu24buz6u3k11kmtm96q5kljp1i2oiykgdvqbvvxyx8z62ryrwbn00ryc15ozcu0ir4u96n7ilvg4j84fdavijk3e95arreq7t5hi6zgz7',
                root: 'j52o9ma5jkh7hyrq0bvp227sidwl8t',
                sort: 694802,
                isActive: false,
            })
            .expect(201);
    });

    test(`/REST:GET iam/bounded-contexts/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-contexts/paginate')
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

    test(`/REST:GET iam/bounded-context - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '047df787-742c-4fa9-b807-35b154c584dd'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET iam/bounded-context`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '68e68d0c-2794-4c69-a461-1b530fe46c08'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '68e68d0c-2794-4c69-a461-1b530fe46c08'));
    });

    test(`/REST:GET iam/bounded-context/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context/b1c75efd-12b8-45cc-9616-de95df5b27b7')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/bounded-context/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context/68e68d0c-2794-4c69-a461-1b530fe46c08')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '68e68d0c-2794-4c69-a461-1b530fe46c08'));
    });

    test(`/REST:GET iam/bounded-contexts`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-contexts')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT iam/bounded-context - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                
                id: '622fcdda-758e-4e96-b5f5-9696ca2da5e7',
                name: 'o3au8a01nopw4wo5dsjbd1eelm4beo4c4nf1tfrt07iy6b2l6qkt5dgy7l07176v3t23o8z4pd3ryftmp7t8s75wxkos61pkxduglyiohb0p9wzax86np98iesl3hhgpt3qjsw8ki6aepjj3qjzra0qjakx3fz0j8almgzxaw5p1dfsrvlku6ilmiye3wgdhss2trnmugqrr6fmna5d45d8aukxgsd1w2h9b2d337h9xyvsd01qtoe7i9b8qhbg',
                root: 'wpe0vihmf5d7sw6m92phja4fviuirl',
                sort: 558791,
                isActive: false,
            })
            .expect(404);
    });

    test(`/REST:PUT iam/bounded-context`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                
                id: '68e68d0c-2794-4c69-a461-1b530fe46c08',
                name: 'hrj5ai1aq0qd1nshnsz4jsslm81xtiqg9xuo0sbta357y3pm36sxwkl7c5k0jn093irhwvjajavr713o4iyz97we8r2p18h9ejb5ktgyvkizh7lkapizyy72clzazsxqxxi7m8mbw3egmxjabkd9kiwhcluphdcvjyyj8ar1l7ufchvkan8rajqq9i6dbesytaomurenjif08s06ee54zj7lm51hzufu2k79t30s8dw4z4exgzgu0xyw1k2x3vi',
                root: 'yoleinmomzyzejbabztl40wvpmjtwo',
                sort: 444187,
                isActive: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '68e68d0c-2794-4c69-a461-1b530fe46c08'));
    });

    test(`/REST:DELETE iam/bounded-context/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/bounded-context/6d3afe10-9bdc-4bd2-b936-e05aa8517f43')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/bounded-context/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/bounded-context/68e68d0c-2794-4c69-a461-1b530fe46c08')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL iamCreateBoundedContext - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateBoundedContextInput!)
                    {
                        iamCreateBoundedContext (payload:$payload)
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

    test(`/GraphQL iamCreateBoundedContext`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateBoundedContextInput!)
                    {
                        iamCreateBoundedContext (payload:$payload)
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
                        id: '6bf63a29-8ae0-454f-bfd6-f558688c5030',
                        name: 'l8ri6a0sv1z65ujfiwlb3cnqaudl2blw1gsiuy1q0jmpz2ol6vlxicxkabtbrhugcu895ybbeewxto1z5nh460630dlc3mophhkirowathgq6sqcrkvxjncjynvtwlk1rpdl06nvwucxjwlsp3upjhsnyabiylrtxru6kjmm3axd3v0qqjwpsc9r46bg6js0zng6xfok7jna7klck6n5wf573183n9ijanl0jgkanr6co35u95gsjy5qamtnjgn',
                        root: '5bwlct6hxox9w0hq21j21z2esvcd6o',
                        sort: 630032,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateBoundedContext).toHaveProperty('id', '6bf63a29-8ae0-454f-bfd6-f558688c5030');
            });
    });

    test(`/GraphQL iamPaginateBoundedContexts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        iamPaginateBoundedContexts (query:$query constraint:$constraint)
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
                expect(res.body.data.iamPaginateBoundedContexts.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateBoundedContexts.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateBoundedContexts.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL iamFindBoundedContext - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindBoundedContext (query:$query)
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
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: '53cab655-f415-4284-8770-1f6118a758d8'
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

    test(`/GraphQL iamFindBoundedContext`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindBoundedContext (query:$query)
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
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: '68e68d0c-2794-4c69-a461-1b530fe46c08'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindBoundedContext.id).toStrictEqual('68e68d0c-2794-4c69-a461-1b530fe46c08');
            });
    });

    test(`/GraphQL iamFindBoundedContextById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindBoundedContextById (id:$id)
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
                    id: 'afd89420-3afa-479e-bc4b-aece28fd6302'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamFindBoundedContextById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindBoundedContextById (id:$id)
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
                    id: '68e68d0c-2794-4c69-a461-1b530fe46c08'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindBoundedContextById.id).toStrictEqual('68e68d0c-2794-4c69-a461-1b530fe46c08');
            });
    });

    test(`/GraphQL iamGetBoundedContexts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetBoundedContexts (query:$query)
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
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.iamGetBoundedContexts.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL iamUpdateBoundedContext - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateBoundedContextInput!)
                    {
                        iamUpdateBoundedContext (payload:$payload)
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
                        
                        id: '37dc25e9-1b39-4919-8f64-44561be82e18',
                        name: '7sekdumjssysuyzfxscs0pxfnmzyt5tc50uon3i7n1hi2qvx1jdnrty30mzmudek4p89hwk0ztjkom7gr9p9zhlyk4oagi7wyum3cbbmi34gu3ehzpq1vc14hdv939jqchxukj2s7vtnbr94gsm1xiyfjxmo2ajozhg0lkfkzwguh7ycqapey11wsc0rlgnfsk8kuavr53xrjpxl54biz7yp7ma2hg7a4444sn6um7o8k6c0zo7z4zhos0h1uno',
                        root: 'lgod1oajhrd4f5mpvwq2b3rcdm6deu',
                        sort: 401880,
                        isActive: false,
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

    test(`/GraphQL iamUpdateBoundedContext`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateBoundedContextInput!)
                    {
                        iamUpdateBoundedContext (payload:$payload)
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
                        
                        id: '68e68d0c-2794-4c69-a461-1b530fe46c08',
                        name: 'vanvx17v884lazgm7x1kp4jp6lauxvs4gvy7e8vl8govjpdcfvwbok801j6a1uo18woup9p1t9qo8y7i3ggil35kmr30evchyzl4372lo2v8sp3yrvrr5997kk739p9ue0z2ush4uruchqm7slry3kj82txf4igake6jwz12ql4dco3vf2cg3apbs4p2pj89ycy5yz3761idavhnjjzdi7r8w83fy6iactprzzx8m598chfhe2vfb1a4jgpjopd',
                        root: 'uf9doxisny2l18ofkkaftorrnut6p0',
                        sort: 621171,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateBoundedContext.id).toStrictEqual('68e68d0c-2794-4c69-a461-1b530fe46c08');
            });
    });

    test(`/GraphQL iamDeleteBoundedContextById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteBoundedContextById (id:$id)
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
                    id: 'c7ff54b8-8605-4c42-99ce-3795f48364c6'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamDeleteBoundedContextById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteBoundedContextById (id:$id)
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
                    id: '68e68d0c-2794-4c69-a461-1b530fe46c08'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteBoundedContextById.id).toStrictEqual('68e68d0c-2794-4c69-a461-1b530fe46c08');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});