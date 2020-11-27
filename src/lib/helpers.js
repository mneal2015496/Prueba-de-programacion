const bcrypt = require('bcryptjs');

const helpers = {};

helpers.encryptPassword = async (passwordUser) => {
    const salt = await bcrypt.genSalt(10); 
    const hash = await bcrypt.hash(passwordUser, salt);
    return hash;
};

helpers.matchPassword = async (passwordUser, savePassword) =>{
    try{
        return await bcrypt.compare(passwordUser, savePassword);
    }catch(e){
        console.log(e);
    }
    
};

module.exports = helpers;
