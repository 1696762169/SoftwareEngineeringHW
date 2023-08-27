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