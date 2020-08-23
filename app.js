const Koa = require('koa');
const KoaRouter = require('koa-router');
const json = require('koa-json');
const path = require('path');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');

// const bodyParse = require('koa-body');
const tasks = require('./dbConnection/routes/tasks.js');

const app = new Koa();
const router = new KoaRouter();

//Json Prettier Middleware
app.use(json());
//BodyParser Middleware
app.use(bodyParser());

//Add additional properties to contex
app.context.user = 'Erfan';

// Simple Middleware Example
// app.use(async ctx => (ctx.body = {msg : "Hello World"}));

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'layout',
    viewExt: 'html',
    cache: false,
    debug: false
})

//Routes
router.get('/', index)
.get('/add', showAdd)
.get('/details/:id', showDetails)
.get('/edit/:id', editContact)
.post('/add', add)
.post('/edit', edit)

//List of Things
async function index(ctx) {
    await ctx.render('index', {
        title: 'Contacts',
        deleteContact: deleteContact,
        contacts: await tasks.getContacts()
    });
}

//Show Add Page
async function showAdd(ctx) {
    await ctx.render('add', {
        action: 'Add',
        contact: {id: '', name: '', phoneNumber: '', address: ''}
    });
}

async function editContact(ctx) {
    await ctx.render('add', {
        action: 'Update',
        contact: await tasks.getContactById(ctx.params.id),
    });
}

async function showDetails(ctx) {
    await ctx.render('details', {
        contact: await tasks.getContactById(ctx.params.id)
    });
}

// Add contact

async function add(ctx) {
   const body = ctx.request.body;
   const newContact = { 'id': 0, 'name': body.name, 'phoneNumber' : body.phoneNumber, 'address' : body.address};
   await tasks.addContact(newContact);
   ctx.redirect('/')
}

// edit contact

async function edit(ctx) {
    const body = ctx.request.body;
    const newContact = { 'id': body.id, 'name': body.name, 'phoneNumber' : body.phoneNumber, 'address' : body.address};
    await tasks.updateContact(newContact);
    ctx.redirect('/')
 }


// delete contact
async function deleteContact(id) {
    await tasks.deleteContactById(id)
    ctx.redirect('/')
}

router.get('/test', ctx => ctx.body = `Hello ${ctx.user}`);
router.get('/test/:name', ctx => ctx.body = `Hello ${ctx.params.name}`);
//Router Middleware
// app.use(bodyParse())

app.use(tasks.routes())
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => console.log('Server Started....'));