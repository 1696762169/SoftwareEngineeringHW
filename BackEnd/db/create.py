from . import DbResult
from . import baseSelect

def userInsert(user_type,name,no):
    if user_type=="passenger":
        sql1 = "INSERT INTO passenger(passenger_name,passenger_no) VALUES (%s, %s)"
        sql2 = "SELECT passenger_name,passenger_no FROM passenger WHERE passenger_no = %s"
        

    baseSelect(sql1, (name,no))
    record_names = ("passenger_name","passenger_no")
    DR = DbResult(record_names, baseSelect(sql2, (no)))
    return DR

if __name__=="__main__":
    DR=userInsert("passenger","wlq",654321)
    print(DR)