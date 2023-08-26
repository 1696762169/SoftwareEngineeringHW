from __init__ import DbResult
from __init__ import baseSelect


def changeInfo(user_type,user_id,modify_type,modify_data ):
    if user_type=="passenger":
        sql1 = "UPDATE passenger AS P SET P.%s = %s WHERE P.passenger_no = %s"
        sql2 = "SELECT * FROM passenger AS P WHERE P.passenger_no = %s"
        record_names = ('passenger_name','passenger_no','passenger_phonenumber','passenger_score' ,'location_no')
    elif user_type=="driver":
        sql1 = "UPDATE driver AS P SET P.%s = %s WHERE P.driver_no = %s"
        sql2 = "SELECT * FROM driver AS P WHERE P.driver_no = %s"
        record_names = ('driver_name','driver_no','driver_phonenumber','driver_score' ,'location_no') 
    baseSelect(sql1, (modify_type, modify_data, user_id))
    DR = DbResult(
        record_names, baseSelect(sql2, (user_id))
    )
    return DR

def cancelOrder(order_number):
    sql1 = "UPDATE `order` AS O SET O.order_status = %d WHERE P.passenger_no = %s"
    sql2 = "SELECT * FROM `order` WHERE order_number = %s"
    record_names = ('order_number','order_time','order_status','passenger_no','driver_no','order_price','order_start_longitude','order_start_latitude','order_end_longitude','order_end_latitude','order_start','order_end','P_comment_no','D_comment_no')
    baseSelect(sql1, (6, order_number))#6代表订单取消的状态
    DR = DbResult(
        record_names, baseSelect(sql2, (order_number))
    )
    return DR