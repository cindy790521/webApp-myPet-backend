import PersonalInfoDAO from '../dao/personalInfoDAO.js';


export default class PersonalInfoController {

  static async apiUpdateRecordList(req, res, next) {
    try {
      const RecordListResponse = await PersonalInfoDAO.updateRecordList(
        req.body._id,
        req.body.records
      )
      var { error } = RecordListResponse;
      if (error) {
        res.status(500).json({ error });
      }
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiGetRecordList(req, res, next) {
    try {
      let id = req.params.userId;
      let recordList = await PersonalInfoDAO.getRecordList(id);
      if (!recordList) {
        res.status(404).json({ error: "not found" });
        return;
      }
      res.json(recordList);
    } catch (e) {
      console.log(`API,${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiUpdateInfo(req, res, next) {
    try {
      const InfoResponse = await PersonalInfoDAO.updateInfo(
        req.body._id,
        req.body.name,
        req.body.breed,
        req.body.gender,
        req.body.birthday,
      )
      var { error } = InfoResponse;
      if (error) {
        res.status(500).json({ error });
      }
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiGetInfo(req, res, next) {
    try {
      let id = req.params.userId;
      let {name,gender,breed,birthday} = await PersonalInfoDAO.getInfo(id);
      if (!{name,gender,breed,birthday}) {
        res.status(404).json({ error: "not found" });
        return;
      }
      res.json({name,gender,breed,birthday});
    } catch (e) {
      console.log(`API,${e}`);
      res.status(500).json({ error: e });
    }
  }
}