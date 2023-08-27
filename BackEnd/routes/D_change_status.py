from flask import Blueprint, jsonify
from flask import request, make_response
import traceback
from  ..db import modify

ToggleShift = Blueprint('ToggleShift', __name__, url_prefix='/toggle-shift')

@ToggleShift.route('', methods=['POST'])
def ToggleShift():
    try:
        data = request.get_json() 
        print("data:", data)

        driver_no=data['driver_no']
        status=data['status']

        DR=modify.changeInfo("driver",driver_no,"driver_status",status)
        if(DR.size()!=1):
            return jsonify({
            'message': 'Toggle_Shift_WRONG'
             })
        else:
            if(DR.records()[0]['driver_status']==status):
                response = make_response(jsonify({
                    "status":"Toggle_Shift_SUCCESS"
                }))
                return response
            else:
                return jsonify({
                "status":"Toggle_Shift_FAILURE"
            })
    except Exception as e:
        traceback.print_exc()
        return jsonify({
            'message': 'Toggle_Shift_UNKNOWN'
        })