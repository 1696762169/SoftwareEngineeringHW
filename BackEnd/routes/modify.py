from flask import Blueprint, jsonify
from flask import request, make_response
import traceback
from  db import modify

modifyBP = Blueprint('modify', __name__, url_prefix='/apply-modify-info')

@modifyBP.route('', methods=['POST'])
def modify():
    try:
        data = request.get_json() # get json
        print("data:", data)
        user_type = data['userType']
        user_id = data['id']
        modify_type = data['modifyType']
        modify_data = data['modifyData']
        DR=modify.changeInfo(user_type,user_id,modify_type,modify_data )
        if DR.size() != 1:
            return jsonify({"message": 'MODIFY_FAILURE'})
        else:
            response = make_response(jsonify({
                'flag': True,
                'message': 'MODIFY_SUCCESS'
            }))
            return response  
    except Exception as e:
        traceback.print_exc()
        return jsonify({
            'message': 'MODIFY_UNKNOWN'
        })