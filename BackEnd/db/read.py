from __init__ import DbResult
from __init__ import baseSelect

def checkExistByWeChatID(user_type,user_id, tableName):
    if user_type=="passenger":
        record_names = ("passenger_no")
        sql = 'SELECT passenger_no FROM ' + tableName + ' WHERE passenger_no = %s'
        DR = DbResult(
            record_names, baseSelect(sql, (user_id))
        )
    else:
        record_names = ("driver_no")
        sql = 'SELECT driver_no FROM ' + tableName + ' WHERE driver_no = %s'
        DR = DbResult(
            record_names, baseSelect(sql, (user_id))
        )
    return DR

def SearchHistoryOrdersByWeChatID(user_type,user_id):
    if user_type=="passenger":
        record_names = ('order_number','order_time','order_status','passenger_no','driver_no','order_price','order_start_longitude','order_start_latitude','order_end_longitude','order_end_latitude','order_start','order_end','P_comment_no','D_comment_no')
        sql = 'SELECT * FROM `order` WHERE passenger_no = %s'
        DR = DbResult(
            record_names, baseSelect(sql, (user_id))
        )
    else:
        record_names = ('order_number','order_time','order_status','passenger_no','driver_no','order_price','order_start_longitude','order_start_latitude','order_end_longitude','order_end_latitude','order_start','order_end','P_comment_no','D_comment_no')
        sql = 'SELECT * FROM `order` WHERE driver_no = %s'
        DR = DbResult(
            record_names, baseSelect(sql, (user_id))
        )
    return DR

def SearchOrderByOrderID(order_id):
    record_names = ('order_number','order_time','order_status','passenger_no','driver_no','order_price','order_start_longitude','order_start_latitude','order_end_longitude','order_end_latitude','order_start','order_end','P_comment_no','D_comment_no')
    sql = 'SELECT * FROM `order` WHERE order_number = %s'
    DR = DbResult(record_names, baseSelect(sql, (order_id)))

def SearchDriverByOrderID(order_id):
    record_names = ('order_number','order_time','order_status','passenger_no','driver_no','order_price','order_start_longitude','order_start_latitude','order_end_longitude','order_end_latitude','order_start','order_end','P_comment_no','D_comment_no')
    sql = 'SELECT * FROM `order` WHERE order_number = %s'
    DR = DbResult(record_names, baseSelect(sql, (order_id)))


if __name__=="__main__":
    # DR=SearchHistoryOrdersByWeChatID("passenger","123456")
    DR=SearchHistoryOrdersByWeChatID("driver","654321")
    print(type(DR.records()))