let personalInfoCollection;
import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

export default class PersonalInfoDAO {
  static async injectDB(conn) {
    if (personalInfoCollection) {
      return;
    }
    try {
      personalInfoCollection = await conn.db(process.env.MYPET_NS)
        .collection('personal_info');
    }
    catch (e) {
      console.error(`Unable to connect in PersonalInfoDAO: ${e}`);
    }
  }


  static async updateRecordList(userId, records) {
    try {
      const updateResponse = await personalInfoCollection.updateOne(
        { _id: userId },
        { $set: { records: records } },
        { upsert: true }
      );
      return updateResponse;
    } catch (e) {
      console.error(`Unable to update RecordList: ${e}`);
      return { error: e };
    }
  }

  static async getRecordList(id) {
    let cursor;
    try {
      cursor = await personalInfoCollection.find({
        _id: id
      });
      const records = await cursor.toArray();
      
      return records[0].records;
    } catch (e) {
      console.error(`Something went wrong in GetRecordList: ${e}`);
      throw e;
    }
  }

  static async updateInfo(userId, name,breed,gender,birthday) {
    try {
      const updateResponse = await personalInfoCollection.updateOne(
        { _id: userId },
        { $set: { name: name, breed:breed,gender:gender,birthday:birthday} },
        { upsert: true }
      );
      return updateResponse;
    } catch (e) {
      console.error(`Unable to update Info: ${e}`);
      return { error: e };
    }
  }

  static async getInfo(id) {
    let cursor;
    try {
      cursor = await personalInfoCollection.find({
        _id: id
      });
      const records = await cursor.toArray();
      let name=records[0].name;
      let gender=records[0].gender;
      let breed=records[0].breed;
      let birthday=records[0].birthday;
      
      return {name,gender,breed,birthday};
    } catch (e) {
      console.error(`Something went wrong in getInfo: ${e}`);
      throw e;
    }
  }

}


