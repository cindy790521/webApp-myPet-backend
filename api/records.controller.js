import RecordsDAO from '../dao/recordsDAO.js';


export default class RecordsController {

    padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    formatDate(date) {
        return [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
        ].join('-');
    }

    static async apiPostRecord(req, res, next) {
        try {
            const date = req.body.date;
            const food = req.body.food;
            const water = req.body.water;
            const poop = req.body.poop;
            const walk = req.body.walk;
            const medicine = req.body.medicine;
            const vaccine = req.body.vaccine;
            const grooming = req.body.grooming;
            const other = req.body.other;

            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            }

            const recordResponse = await RecordsDAO.addRecord(
                userInfo,
                date,
                food,
                water,
                poop,
                walk,
                medicine,
                vaccine,
                grooming,
                other
            );
            var { error } = recordResponse;
            if (error) {
                res.status(500).json({ error: "Unable to post record." });
            } else {
                res.json({ status: "sucess" });
            }
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiUpdateRecord(req, res, next) {
        try {
            const recordId = req.body.record_id;
            const date = req.body.date;
            const food = req.body.food;
            const water = req.body.water;
            const poop = req.body.poop;
            const walk = req.body.walk;
            const medicine = req.body.medicine;
            const vaccine = req.body.vaccine;
            const grooming = req.body.grooming;
            const other = req.body.other;
            const userId = req.body.user_id;
            const recordResponse = await RecordsDAO.updateRecord(
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
                other
            );

            var { error } = recordResponse;
            if (error) {
                res.status(500).json({ error: "Unable to update record." });
            } else {
                res.json({ status: "sucess" });
            }
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiDeleteRecord(req, res, next) {
        try {
            const recordId = req.body.record_id;
            const userId = req.body.user_id;
            const recordResponse = await RecordsDAO.deleteRecord(
                recordId,
                userId
            );
            var { error } = recordResponse;
            if (error) {
                res.status(500).json({ error: "Unable to delete record." });
            } else {
                res.json({ status: "sucess" });
            }
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiGetRecordsByIds(req, res, next) {
        try {
            let ids = req.params.ids.split(',') || [];
            
            const recordsPerPage = req.query.recordsPerPage ?
            parseInt(req.query.recordsPerPage) : 7;
        const page = req.params.page ? parseInt(req.params.page) : 0;
        const { curPageRecords, totalNumRecords } = await
        RecordsDAO.getRecordsByIds({ ids, page, recordsPerPage });
        let response = {
            records: curPageRecords,
            page: page,
            entries_per_page: recordsPerPage,
            total_results: totalNumRecords,
        };
        res.json(response);
        } catch (e) {
            console.log(`API,${e}`);
            res.status(500).json({ error: e });
        }
    }

    static async apiGetRecordIdByDateAndUserId(req, res, next) {
        let date = req.params.date||"";
        const userId = req.params.userId||"";
        const response = await
        RecordsDAO.getRecordIdByDateAndUserId({ date, userId });
        res.json(response);
    }
}