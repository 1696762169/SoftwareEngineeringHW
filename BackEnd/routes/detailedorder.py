from flask import Blueprint, jsonify
from flask import request, make_response
import traceback
from  ..db import read


detailedbill = Blueprint('detailedbill', __name__, url_prefix='/detailed-bill')

@detailedbill.route('', methods=['POST'])
def detailedbill():
    try:
        data = request.get_json() 
        print("data:", data)
        order_id = data['order_id']
        DR=read.SearchOrderByOrderID(order_id)

        response = make_response(jsonify({
            "status":"SEARCH_SUCCESS",
            "data":DR.records()
        }))
        return response
    except Exception as e:
        traceback.print_exc()
        return jsonify({
            'message': 'MODIFY_UNKNOWN'
        })