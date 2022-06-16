const { Router } = require('express')
const router = Router()

let productos = []

router.get('/productos', (req, res) => {
    const { titulo } = req.query
    if (titulo) {
        const product = productos.filter(producto => {
            return producto.title.toLowerCase() === titulo.toLocaleLowerCase()
        })
        res.status(200).json(product)
        return
    }
    res.json(productos)
})

router.get('/productos:id', (req, res) => {
    const id = Number(req.params.id)
    console.log(typeof (id))
    if (isNaN(id)) {
        res.status(400).json({ error: "El parámetro no es un número" })
        return
    }
    const product = productos.filter(producto => {
        return producto.id === id
    })
    if (!product.length) {
        res.status(404).send({ error: "El contenido que solicito no existe" })
        return
    }
    res.status(200).json(product)
})


router.post('/productos', (req, res) => {
    const { title, price, thumbnail } = req.body;
    const id = productos.length + 1;
    console.log('REQ: ', req)
    productos.push({ title, price, thumbnail, id })
    res.sendStatus(201)
})


router.put('/productos/:id', (req, res) => {
    const { title, price, thumbnail } = req.body
    const id = Number(req.params.id)
    if (isNaN(id)) {
        res.status(400).json({ error: "El parámetro no es un número" })
        return
    } else {
        productos.map(item => {
            if (item.id === id) {

                item.title = title;
                item.price = price;
                item.thumbnail = thumbnail;
                console.log(item);
                return item;
            }
        })
        res.sendStatus(201)
    }
})



router.delete('/productos/:id', (req, res) => {
    const id = Number(req.params.id)
    if (isNaN(id)) {
        res.status(400).json({ error: "El parámetro no es un número" })
        return
    } else {
        productos = productos.filter((item) => item.id !== id);
        for (let index = 0; index < productos.length; index++) {
            productos[index].id = index + 1;
        }
        res.sendStatus(201)
    }

})

module.exports = router