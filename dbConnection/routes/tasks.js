const Router = require('koa-router');
const router = new Router();
const Contact = require('../models/Contact')

//get contact list api endpoind and method

router.get('/api/contacts', async ctx => {
    await Contact.findAll()
     .then(contacts => {
        ctx.body = contacts
     })
     .catch(err => {
         ctx.body = 'error: ' + err
     })
})

const getContacts = async function() {
    return await Contact.findAll({
        raw: true,
      })
     .catch(err => {
         ctx.body = 'error: ' + err
     })
 }

 //get contact details by id api endpoind and method

router.get('/api/contact/:id', async ctx => {
    await Contact.findOne({
        where: {
            id: ctx.params.id
        }
    })
     .then(contact => {
         ctx.body = contact
     })
     .catch(err => {
         ctx.body = 'Contact does not exist'
     })
})

async function getContactById(contactId) {
    return await Contact.findOne({
        where: {
            id: contactId
        },
        raw: true,
    })
     .catch(err => {
         ctx.body = 'error: ' + err
     })
 }

 //post contact api endpoind and method

router.post('/api/contact', async ctx => {
    if(!ctx.request.body.name && !ctx.request.body.phoneNumber) {
        ctx.body = {
            error: 'Bad Data'
        }
    } else {
        await Contact.create(ctx.request.body)
         .then(data => {
             ctx.body = data
         })
         .catch(err => {
             ctx.body = 'error: ' + err
         })
    }
})

async function addContact(contactInfo) {
    if(!contactInfo.name && !contactInfo.phoneNumber) {
        ctx.body = {
            error: 'Bad Data'
        }
    } else {
        await Contact.create(contactInfo)
         .catch(err => {
             ctx.body = 'error: ' + err
         })
    }
 }


//delete contact api endpoind and method

router.delete('/api/contact/:id', async ctx => {
    await Contact.destroy({
        where: {
            id: ctx.params.id
        }
    })
     .then(contact => {
         ctx.body = {status: 'Contact Deleted'}
     })
     .catch(err => {
         ctx.body = 'error: ' + err
     })
})

async function deleteContactById(contactId) {
    await Contact.destroy({
        where: {
            id: contactId
        }
    }).then(contact => {
        ctx.redirect('/')
    })
    .catch(err => {
         ctx.body = 'error: ' + err
     })
 }

 //update contact api endpoind and method

router.put('/api/contact/:id', async ctx => {
    if(!ctx.request.body.name && !ctx.request.body.phoneNumber) {
        ctx.body = {
            error: 'Bad Data'
        }
    } else {
        await Contact.update(
            {name: ctx.request.body.name,
             phoneNumber: ctx.request.body.phoneNumber,
             address: ctx.request.body.address},
            {where : {id: ctx.params.id}}
        )
         .then(data => {
             ctx.body = {status : 'Contact Updated'}
         })
         .catch(err => {
             ctx.body = 'error: ' + err
         })
    }
})

async function updateContact(contactInfo) {
    if(!contactInfo.name && !contactInfo.phoneNumber) {
        ctx.body = {
            error: 'Bad Data'
        }
    } else {
        await Contact.update(
            {name: contactInfo.name,
             phoneNumber: contactInfo.phoneNumber,
             address: contactInfo.address},
            {where : {id: contactInfo.id}}
        )
         .catch(err => {
             ctx.body = 'error: ' + err
         })
    }
 }

module.exports = router
module.exports.getContacts = getContacts;
module.exports.getContactById = getContactById;
module.exports.addContact = addContact;
module.exports.deleteContactById = deleteContactById;
module.exports.updateContact = updateContact
// module.exports ={
//     router, getContacts
// }