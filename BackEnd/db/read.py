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
    return DR

def SearchDriverByOrderID(order_id):
    record_names = ('driver_name','driver_no','driver_phonenumber','car_no',
                        'car_description','current_content','driver_score' ,
                        'longitude' ,'latitude','location_name',
                        'driver_status','driver_duration','driver_salary') 
     
    sql1 = 'SELECT driver_no FROM `order` AS O WHERE O.order_number = %s'
    DR1 = DbResult(('driver_id'), baseSelect(sql1, (order_id)))
    sql2 = 'SELECT * FROM driver WHERE driver_no = %s'
    DR2 = DbResult(record_names, baseSelect(sql2, (DR1.records()[0]['driver_id'])))
    return DR2

def SearchPlacedOrders():
    record_names = ('order_number','order_time','order_status','passenger_no','driver_no','order_price','order_start_longitude','order_start_latitude','order_end_longitude','order_end_latitude','order_start','order_end','P_comment_no','D_comment_no')
    sql = 'SELECT * FROM `order` WHERE order_status = %d'
    DR = DbResult(record_names, baseSelect(sql, (0)))#刚下单还没有接单
    return DR

if __name__=="__main__":
    # DR=SearchHistoryOrdersByWeChatID("passenger","123456")
    DR=SearchHistoryOrdersByWeChatID("driver","654321")
    print(type(DR.records()))