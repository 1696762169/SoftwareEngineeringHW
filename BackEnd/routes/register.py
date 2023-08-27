from flask import Blueprint, jsonify
from flask import request, make_response
import traceback
from  db import read,create


registerBP = Blueprint('register', __name__, url_prefix='/apply-register')

@registerBP.route('', methods=['POST'])
def register():
    try:
        data = request.get_json() # get json
        print("data:", data)
        user_type = data['userType']
        name=data['name']
        no = data['weChatID']
        DR= create.userInsert(user_type,name,no)

        if DR.size() != 1:
            return jsonify({"message": 'REGISTER_FAILURE'})
        else:
            response = make_response(jsonify({
                'flag': True,
                'message': 'REGISTER_SUCCESS'
            }))
            return response
    except Exception as e:
        traceback.print_exc()
        return jsonify({
            'message': 'REGISTER_UNKNOWN'
        })