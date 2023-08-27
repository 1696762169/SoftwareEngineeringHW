from flask import Blueprint, jsonify
from flask import request, make_response
import traceback
from  ..db import modify

PayOrder = Blueprint('PayOrder', __name__, url_prefix='/pay-order')

@PayOrder.route('', methods=['POST'])
def PayOrder():
    try:
        data = request.get_json() 
        print("data:", data)
        order_number=data['order_number']

        DR=modify.payOrder(order_number)
        if(DR.size()!=1):
            return jsonify({
            'message': 'ORDER_NUMBER_WRONG'#不存在该订单，查看是否是订单号错误
             })
        else:
            if(DR.records()[0]['order_status']==5):
                response = make_response(jsonify({
                    "status":"PAY_ORDER_SUCCESS"
                }))
                return response
            else:
                return jsonify({
                'message': 'PAY_ORDER_FAILURE'
                })
    except Exception as e:
        traceback.print_exc()
        return jsonify({
            'message': 'PLACE_ORDER_UNKNOWN'
        })