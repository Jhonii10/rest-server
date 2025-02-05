const usersGet = (req, res) => {

    const {q = ''} = req.query;

    res.json({
        message: 'get api',
        q
    })
}

const usersPost = (req, res) => {
    const body = req.body;
    res.json({
        message: 'post api',
        ...body
    })
}

const usersPut = (req, res) => {
    const {id} = req.params;

    res.json({
        message: 'put api',
        id
    })
}

const usersPatch = (req, res) => {
    res.json({
        message: 'patch api'
    })
}

const usersDelete = (req, res) => {
    res.json({
        message: 'delete api'
    })
}


module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}