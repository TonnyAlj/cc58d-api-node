
const contaisnToken = (req, res, next) => {
    const {authorization} = req.headers;

    return authorization 
    ? next() 
    : res.status(401).json({message: 'Sem Token'});
}

module.exports = contaisnToken;