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

global num_of_orders
num_of_orders=0

def orderCreate( passenger_no,start_longitude,start_latitude,end_longitude ,end_latitude,start_name,end_name,price,time):
    num_of_orders=num_of_orders+1
    order_number=str(num_of_orders)
    sql1 = "INSERT INTO `order`(order_number,order_time,order_status,passenger_no,order_price,order_start_longitude,order_start_latitude,order_end_longitude,order_end_latitude,order_start,order_end) VALUES (%s,%s,%d,%s,%f,%f,%f,%f,%f,%s,%s)"
    sql2 = "SELECT * FROM `order` WHERE order_number = %s"
    record_names = ('order_number','order_time','order_status','passenger_no','driver_no','order_price','order_start_longitude','order_start_latitude','order_end_longitude','order_end_latitude','order_start','order_end','P_comment_no','D_comment_no')

    baseSelect(sql1, (order_number,time,0,passenger_no,
                      price,start_longitude,start_latitude,
                      end_longitude,end_latitude,start_name,end_name))
    
    DR = DbResult(record_names, baseSelect(sql2, (order_number)))
    return DR

if __name__=="__main__":
    DR=userInsert("passenger","wlq",654321)
    # print(DR)