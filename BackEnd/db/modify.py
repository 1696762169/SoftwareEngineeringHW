from __init__ import DbResult
from __init__ import baseSelect


def changeInfo(user_type,user_id,modify_type,modify_data ):
    if user_type=="passenger":
        sql1 = "UPDATE passenger AS P SET P.%s = %s WHERE P.passenger_no = %s"
        sql2 = "SELECT * FROM passenger AS P WHERE P.passenger_no = %s"
        record_names = ('passenger_name','passenger_no','passenger_phonenumber',  'longitude' ,'latitude','location_name','passenger_score' )
    elif user_type=="driver":
        sql1 = "UPDATE driver AS D SET D.%s = %s WHERE D.driver_no = %s"
        sql2 = "SELECT * FROM driver AS D WHERE D.driver_no = %s"
        record_names = ('driver_name','driver_no','driver_phonenumber','car_no',
                        'car_description','current_content','driver_score' ,
                        'longitude' ,'latitude','location_name',
                        'driver_status','driver_duration','driver_salary') 
    baseSelect(sql1, (modify_type, modify_data, user_id))
    DR = DbResult(
        record_names, baseSelect(sql2, (user_id))
    )
    return DR

def cancelOrder(order_number):
    sql1 = "UPDATE `order` AS O SET O.order_status = %d WHERE O.order_number = %s"
    sql2 = "SELECT * FROM `order` WHERE order_number = %s"
    record_names = ('order_number','order_time','order_status','passenger_no','driver_no','order_price','order_start_longitude','order_start_latitude','order_end_longitude','order_end_latitude','order_start','order_end','P_comment_no','D_comment_no')
    baseSelect(sql1, (6, order_number))#6代表订单取消的状态
    DR = DbResult(
        record_names, baseSelect(sql2, (order_number))
    )
    return DR
def acceptOrder(driver_no,order_number):
    sql1 = "UPDATE `order` AS O SET O.driver_no = %s WHERE O.order_number = %s"
    sql2 = "UPDATE `order` AS O SET O.order_status = %d WHERE O.order_number = %s"
    sql3 = "SELECT * FROM `order` WHERE order_number = %s"
    baseSelect(sql1, (driver_no, order_number))
    baseSelect(sql2, (1, order_number))
    record_names = ('order_number','order_time','order_status','passenger_no','driver_no','order_price','order_start_longitude','order_start_latitude','order_end_longitude','order_end_latitude','order_start','order_end','P_comment_no','D_comment_no')
    DR = DbResult(
        record_names, baseSelect(sql2, (order_number))
    )
    return DR
def payOrder(order_number):
    sql1 = "UPDATE `order` AS O SET O.order_status = %d WHERE O.order_number = %s"
    baseSelect(sql1, (5, order_number))#5代表订单取消的状态
    sql2 = "SELECT * FROM `order` WHERE order_number = %s"
    record_names = ('order_number','order_time','order_status','passenger_no','driver_no','order_price','order_start_longitude','order_start_latitude','order_end_longitude','order_end_latitude','order_start','order_end','P_comment_no','D_comment_no')
    DR = DbResult(
        record_names, baseSelect(sql2, (order_number))
    )
    return DR
