# TsaijuLin-FinalProject-myPet-backend
MyPet is a pet caring web aplication that helps the user to record the pet's daily condition.

--Iteration 1
Backend :I set APIs and they work as expected.
APIs:
apiGetInfo,
apiUpdateInfo,
apiGetRecordList,
apiUpdateRecordList,
apiPostRecord,
apiUpdateRecord,
apiDeleteRecord,
apiGetRecordsByIds,
apiGetRecordIdByDateAndUserId

--Iteration 2
Backend:
Fixed the getRecordsByIds: make the records sorted reversely by date so that the user can post records of the previous dates and still get a correct order.
Fixed the apiGetRecordsByIds:get the current page by params instead of query. 7 records per page.
Fixed the updateRecord: so that when the user makes no change on the record, he can still submit the updates.  

--Iteration 3
  Checked again and did not find bugs. 
  Same as iteration 2.