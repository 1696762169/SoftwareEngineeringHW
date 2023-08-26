from flask import Blueprint, jsonify
from flask import request, make_response
import traceback
from  ..db import modify

CancelOrder = Blueprint('CancelOrder', __name__, url_prefix='/cancel-order')

@CancelOrder.route('', methods=['POST'])
def CancelOrder():
    try:
        data = request.get_json() 
        print("data:", data)

        order_number = data['order_number']

        DR=modify.cancelOrder(order_number)

        response = make_response(jsonify({
            "status":"CANCEL_ORDER_SUCCESS"
        }))
        return response
    except Exception as e:
        traceback.print_exc()
        return jsonify({
            'message': 'CANCEL_ORDER_UNKNOWN'
        })