from flask import Blueprint, jsonify
from flask import request, make_response
import traceback
from  db import create,read

PlaceOrderBP = Blueprint('PlaceOrder', __name__, url_prefix='/place-order')

@PlaceOrderBP.route('', methods=['POST'])
def PlaceOrder():
    try:
        data = request.get_json() 
        print("data:", data)
        passenger_no=data['passenger_no']#!!!!!!!!!
        start_longitude = data['start_longitude']
        start_latitude=data['start_latitude']
        end_longitude = data['end_longitude']
        end_latitude=data['end_latitude']
        start_name=data['start_name']
        end_name=data['end_name']
        price=data['price']
        time=data['time']

        DR=create.orderCreate( passenger_no,start_longitude,start_latitude,end_longitude ,end_latitude,start_name,end_name,price,time)

        response = make_response(jsonify({
            "status":"PLACE_ORDER_SUCCESS",
            "data":DR.records()[0]['order_number']#返回订单编号
        }))
        return response
    except Exception as e:
        traceback.print_exc()
        return jsonify({
            'message': 'PLACE_ORDER_UNKNOWN'
        })
    

DriverMonitorOrderPlacedBP= Blueprint('DriverMonitorOrderPlaced', __name__, url_prefix='/monitor-order-placed')

@DriverMonitorOrderPlacedBP.route('', methods=['POST'])#前端不断地发消息给后端，监测订单是否被接受
def DriverMonitorOrderPlaced():
    try:
        data = request.get_json() 
        print("data:", data)

        order_number = data['order_number']

        DR=read.SearchPlacedOrders()

        if DR.size() == 0 :#一个也没有
            return jsonify({"message": 'NO_ORDER_AVAILABLE'})
        else:
           #存在下单的订单，则返回订单内容
            return jsonify({
                'message': 'ORDER_AVAILABLE',
                'size':DR.size(),
                'available_orders':DR.records()
                })
    except Exception as e:
        traceback.print_exc()
        return jsonify({
            'message': 'ACCEPT_ORDER_UNKNOWN'
        })
    
