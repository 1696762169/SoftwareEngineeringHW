from flask import Blueprint, jsonify
from flask import request, make_response
import traceback
from ..db import read,create



login = Blueprint('login', __name__, url_prefix='/apply-login')

@login.route('', methods=['POST'])
def login():
    try:
        data = request.get_json() # get json
        print("data:", data)
        user_type = data['userType']
        wechat_id = data['weChatID']
        tablename=user_type
        DR= read.checkExistByUsrNo(Type=user_type,id=wechat_id,tablename=tablename)

        if DR.size() != 1:#没有找到
            return jsonify({"message": 'INVALID_USER'})
        else:#用户存在
            response = make_response(jsonify({
                'flag': True,
                'message': 'GET_SUCCESS'
            }))
            return response
            # return jsonify({"status": 'GET_SUCCESS'})
    except Exception as e:
        traceback.print_exc()
        return jsonify({
            'message': 'LOGIN_UNKNOWN'
        })
    
register = Blueprint('register', __name__, url_prefix='/apply-register')

@register.route('', methods=['POST'])
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

    