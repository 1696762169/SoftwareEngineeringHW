from __init__ import DbResult
from __init__ import baseSelect

def checkExistByWeChatID(Type,id, tableName):
    if Type=="passenger":
        record_names = ("passenger_no")
        sql = 'SELECT passenger_no FROM ' + tableName + ' WHERE passenger_no = %s'
        DR = DbResult(
            record_names, baseSelect(sql, (id))
        )
    else:
        record_names = ("driver_no")
        sql = 'SELECT driver_no FROM ' + tableName + ' WHERE driver_no = %s'
        DR = DbResult(
            record_names, baseSelect(sql, (id))
        )
    return DR
