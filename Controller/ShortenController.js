const ShortUrl = require('../models/ShortUrl')
const User = require('../Models/User')

module.exports = {
    async index(req, res) {
        const currentUser = await User.findOne({ user: req.user.username })
        const shortUrls = await ShortUrl.find({ creator: {$eq: currentUser.username}})
        res.render('userprofile', { shortUrls: shortUrls, user: currentUser })
    },
    async store(req, res) {
        const { fullUrl, shortUrl } = req.body
        try {
            shortUrl.length > 0 ?
                await ShortUrl.create({ full: fullUrl, short: shortUrl, creator: req.user.username }) :
                await ShortUrl.create({ full: fullUrl, creator: req.user.username })
            res.redirect('/userprofile')
        } catch (error) {
            res.send(error.status, {message: `${error.message}`})
        }
    },
    async update(req, res) {
        const { shortUrl } = req.body
        try {
            await ShortUrl.findOneAndUpdate({ "_id": {$eq: req.params.id}}, {"short": shortUrl} )
            res.redirect('/userprofile')
        } catch (error) {
            res.send(400, { message: `${error.message}`})
        }
    },
    async clickedLink(req, res) {
        const { shortUrl } = req.params
        const shorten = await ShortUrl.findOne({ short: shortUrl })
        if (shorten == null) return res.sendStatus(404)

        shorten.clicks++
        shorten.save()

        res.redirect(shorten.full)
    },
    async remove(req, res) {
        const { id } = req.params
        try {
            await ShortUrl.findOneAndDelete({ "_id": { $eq: id }})
            res.redirect('/userprofile')
        } catch (error) {
            res.sendStatus(400, {message: `${error.message}`})
        }
    }
}