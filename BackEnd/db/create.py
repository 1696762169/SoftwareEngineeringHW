from __init__ import DbResult
from __init__ import baseSelect

def userInsert(user_type,name,no):
    if user_type=="passenger":
        sql1 = "INSERT INTO passenger(passenger_name,passenger_no) VALUES (%s, %s)"
        sql2 = "SELECT passenger_name,passenger_no FROM passenger WHERE passenger_no = %s"
        record_names = ("passenger_name","passenger_no")
    else:
        sql1 = "INSERT INTO driver(driver_name,driver_no) VALUES (%s, %s)"
        sql2 = "SELECT driver_name,driver_no FROM driver WHERE driver_no = %s"
        record_names = ("driver_name","driver_no")

    baseSelect(sql1, (name,no))
    
    DR = DbResult(record_names, baseSelect(sql2, (no)))
    return DR

if __name__=="__main__":
    DR=userInsert("passenger","wlq",654321)
    # print(DR)