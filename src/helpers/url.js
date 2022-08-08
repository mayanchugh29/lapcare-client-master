import slugify from 'slugify'

const encodeUrl = (url)=>{
    return slugify(url);
}

export default encodeUrl