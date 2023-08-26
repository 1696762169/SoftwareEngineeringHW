import pymysql
import traceback

from collections import namedtuple
import traceback


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




def baseSelect(sqlInput, tupleInput):
    db = pymysql.connect(host='localhost', user='root',password='123456', database="taxhailingsystem")
    cursor = db.cursor()

    try :
        cursor.execute(sqlInput, tupleInput) # 避免SQL注入攻击
        db.commit()
        returnValue = cursor.fetchall()
    except Exception:
        db.rollback()
        traceback.print_exc()
        return
    finally :
        db.close()

    return returnValue

# if __name__ == '__main__':
#     sql = 'SELECT passenger_no FROM passenger WHERE passenger_no = %s'
#     print(baseSelect(sql, ('123456')))

# if __name__ == '__main__':
#     DR = DbResult(
#         ('name', 'id'),
#         (
#             ('Alice', '1851001'),
#             ('Bob', '1851999'),
#             ('Koishi', '1851514')
#         )
#     )
#     print(DR.records())