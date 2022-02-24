const mongoose = require('mongoose')
const Document = require('./model/Document')

mongoose.connect('mongodb://localhost/office-suite')

const io = require('socket.io')(4000, {
    cors: {
        origin: 'http://localhost:3000',
        method: ['GET', 'POST']
    }
})

io.on('connection', socket => {
    socket.on('get-document', async id => {
        const document = await findOrCreateDocument(id)

        socket.join(id)
        socket.emit('load-document', document.data)

        socket.on('send-changes', delta => {
            console.log(delta)
            socket.broadcast.to(id).emit('recieve-changes', delta)
        })

        socket.on('save-document', async data => {
            await Document.findByIdAndUpdate(id, { data })
        })
    })
})

async function findOrCreateDocument(id) {
    if (id == null) return

    const document = await Document.findById(id)
    if (document) return document
    return await Document.create({ _id: id, data: ''})
}