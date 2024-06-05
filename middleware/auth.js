import jwt from 'jsonwebtoken';

const auth = async(req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];

        decodedData = jwt.decode(token);

        req.userId = decodedData?.sub;

        next();
    } catch (err) {
        console.log(err)
    }
}

export default auth;