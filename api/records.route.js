import express from 'express';
import RecordsController from './records.controller.js';
import PersonalInfoController from './personalInfo.controller.js'


const router=express.Router();

router.route("/record").post(RecordsController.apiPostRecord);
router.route("/record").put(RecordsController.apiUpdateRecord);
router.route("/record").delete(RecordsController.apiDeleteRecord);
router.route("/record/list/:ids/:page").get(RecordsController.apiGetRecordsByIds);
router.route("/record/:userId/:date").get(RecordsController.apiGetRecordIdByDateAndUserId);


router
    .route("/personal_info/record_list")
    .put(PersonalInfoController.apiUpdateRecordList);


router
    .route("/personal_info/record_list/:userId")
    .get(PersonalInfoController.apiGetRecordList); 

router
    .route("/personal_info/info")
    .put(PersonalInfoController.apiUpdateInfo);

router
    .route("/personal_info/info/:userId")
    .get(PersonalInfoController.apiGetInfo); 

export default router;