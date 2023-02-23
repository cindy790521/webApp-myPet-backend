import app from './server.js';
import mongodb from "mongodb";
import dotenv from "dotenv";
import RecordsDAO from './dao/recordsDAO.js';
import PersonalInfoDAO from './dao/personalInfoDAO.js';

async function main(){
    dotenv.config();

    const client=new mongodb.MongoClient(
        process.env.MYPET_DB_URI
    )
    const port=process.env.PORT||8000;

    try{
        await client.connect();
        await RecordsDAO.injectDB(client);
        await PersonalInfoDAO.injectDB(client);
        app.listen(port,()=>{
            console.log('Server is running on port: '+port);
        })
    }catch(e){
        console.error(e);
        process.exit(1);
    }
}

main().catch(console.error);