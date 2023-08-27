# from . import DbResult
from . import baseSelect

class DbResult(object):

    def __init__(self, record_names, records):
        self.__length = len(records)
        self.__Record = namedtuple('Record', record_names)
        self.__records = []
        try:
            for each_record in records:
                self.__records.append(self.__Record._make(each_record))
        except Exception as e:
            print('An error occurred when processing records:')
            traceback.print_exc()
        self.__records = tuple(self.__records)
    # 返回记录的数量
    def size(self):
        return self.__length

    # 返回 记录 与字段名匹配的 由 命名元组 组成的 元组
    def rawRecords(self):
        return self.__records

    # 返回 记录 与字段名匹配的 由 字典 组成的 元组
    def records(self):
        self.__records_dict = []
        for each_record in self.__records:
            self.__records_dict.append(dict(each_record._asdict()))
        self.__records_dict = tuple(self.__records_dict)
        return self.__records_dict

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
