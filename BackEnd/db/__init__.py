import pymysql
import traceback


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

if __name__ == '__main__':
    sql = 'SELECT passenger_no FROM passenger WHERE passenger_no = %s'
    print(baseSelect(sql, ('123456')))