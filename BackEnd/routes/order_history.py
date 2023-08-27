from flask import Blueprint, jsonify
from flask import request, make_response
import traceback
from db import read


orderhistoryBP = Blueprint('orderhistory', __name__, url_prefix='/order-history')

@orderhistoryBP.route('', methods=['POST'])
def orderhistory():
    try:
        data = request.get_json() 
        print("data:", data)
        user_type = data['userType']
        user_id = data['id']
        DR=read.SearchHistoryOrdersByWeChatID(user_type,user_id)

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