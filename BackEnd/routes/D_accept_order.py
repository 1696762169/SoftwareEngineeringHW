from flask import Blueprint, jsonify
from flask import request, make_response
import traceback
from  ..db import modify,read
from ..db import DbResult
from ..db import baseSelect
AcceptOrder = Blueprint('AcceptOrder', __name__, url_prefix='/accept-order')

@AcceptOrder.route('', methods=['POST'])
def AcceptOrder():
    try:
        data = request.get_json() 
        print("data:", data)

        driver_no=data['driver_no']
        order_number = data['order_number']

        DR=modify.acceptOrder(driver_no,order_number)

        response = make_response(jsonify({
            "status":"ACCEPT_ORDER_SUCCESS"
        }))
        return response
    except Exception as e:
        traceback.print_exc()
        return jsonify({
            'message': 'ACCEPT_ORDER_UNKNOWN'
        })
    
PassengerMonitorOrderAccepted= Blueprint('PassengerMonitorOrderAccepted', __name__, url_prefix='/monitor-order-Accepted')

@PassengerMonitorOrderAccepted.route('', methods=['POST'])#前端不断地发消息给后端，监测订单是否被接受
def PassengerMonitorOrderAccepted():
    try:
        data = request.get_json() 
        print("data:", data)

        order_number = data['order_number']

        DR=read.SearchOrderByOrderID(order_number)

        if DR.size() != 1:#没有找到
            return jsonify({"message": 'INVALID_USER'})
        else:
            if DR.records()[0]['order_status']==1:#如果被接受了
                DR2=read.SearchDriverByOrderID(order_number)
                return jsonify({
                    'message': 'ACCEPTED',
                    'driver_message':DR2.records()
                    })
            else:
                return jsonify({
                    'message': 'NOT_ACCEPTED'})
    except Exception as e:
        traceback.print_exc()
        return jsonify({
            'message': 'ACCEPT_ORDER_UNKNOWN'
        })