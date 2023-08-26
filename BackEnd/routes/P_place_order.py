from flask import Blueprint, jsonify
from flask import request, make_response
import traceback
from  ..db import create

PlaceOrder = Blueprint('PlaceOrder', __name__, url_prefix='/place-order')

@PlaceOrder.route('', methods=['POST'])
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