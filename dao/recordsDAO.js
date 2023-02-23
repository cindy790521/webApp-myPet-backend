import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let records;

export default class RecordsDAO {

    static async injectDB(conn) {
        if (records) {
            return;
        }
        try {
            records = await conn.db(process.env.MYPET_NS).collection('record');
        } catch (e) {
            console.error(`Unable to establish connection handle in recordsDAO:${e}`);
        }
    }

    static async addRecord(
        userInfo,
        date,
        food,
        water,
        poop,
        walk,
        medicine,
        vaccine,
        grooming,
        other) {
        try {
            const recordDoc = {
                name: userInfo.name,
                user_id: userInfo._id,
                date: date,
                food:food,
                water:water,
                poop:poop,
                walk:walk,
                medicine:medicine,
                vaccine:vaccine,
                grooming:grooming,
                other:other
            }
            return await records.insertOne(recordDoc);
        }
        catch (e) {
            console.error(`Unable to post record: ${e}`);
            return { error: e };
        }
    }

    static async updateRecord(
        recordId,
        userId,
        date,
        food,
        water,
        poop,
        walk,
        medicine,
        vaccine,
        grooming,
        other) {
        try {
            const user_id = userId;
            const record_id = ObjectId(recordId);
            
            const result = await records.updateOne(
                { $and: [{ _id: { $eq: record_id } }, { user_id: { $eq: user_id } }] },
                { $set: { date: date,
                    food:food,
                    water:water,
                    poop:poop,
                    walk:walk,
                    medicine:medicine,
                    vaccine:vaccine,
                    grooming:grooming,
                    other:other } }
            );
            return result;
        }
        catch (e) {
            console.error(`Unable to update record: ${e}`);
            return { error: e };
        }
    }

    static async deleteRecord(recordId, userId) {
        try {
            const record_id = ObjectId(recordId);
            const user_id = userId;
            return await records.deleteOne(
                { _id: record_id }, { user_id: user_id }
            );
        }
        catch (e) {
            console.error(`Unable to delete record: ${e}`);
            return { error: e };
        }
    }

    

    static async getRecordsByIds(
        {ids,
        page = 0,
        recordsPerPage = 7,}={}) {
        
        try {
            let objectIds = [];
            ids.forEach(toObject);
            function toObject(id) {
                objectIds.push(new ObjectId(id));
            }
            let recordsList;
            
            recordsList = await records.aggregate([
                {
                    "$match": { "_id": { "$in": objectIds } }
                },
                { "$addFields": { "__order": { "$indexOfArray": [objectIds, "$_id"] } } },
                { "$sort": { "__order": 1 } }
            ]).toArray();
            
            let resRecords=[];
             resRecords = recordsList.sort(
                (objA, objB) => Number(objB.date.replaceAll("-", '')) - Number(objA.date.replaceAll("-", '')),
              );
            let curPageRecords=resRecords.slice(recordsPerPage*page,recordsPerPage*(page+1));  
            const totalNumRecords = recordsList.length;
            return { curPageRecords, totalNumRecords };
            
        } catch (e) {
            console.error(`Something went wrong in getRecordsByIds: ${e}`);
            return { recordsList: [], totalNumRecords: 0 }
            throw e;
        }
    }
    
    static async getRecordIdByDateAndUserId({date, userId} = {}) {
        let query;
        query = { $and:[{"date": { $eq: date }},{"user_id": { $eq: userId }}]}
        
        let cursor;
        try {
            cursor = await records.find(query).toArray();
            return cursor[0]._id;
        } catch (e) {
            console.error(`Unable to issue find command,${e}`);
            return "";
        }
    }
}