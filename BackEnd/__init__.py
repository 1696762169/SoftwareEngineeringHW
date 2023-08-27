from flask import Flask
from flask_cors import CORS
from routes import login,modify,order_history,detailedorder,register
from routes import D_accept_order,D_change_status,P_cancel_order,P_pay_order,P_place_order
# from driver import 
# from passenger import 
app = Flask(__name__, template_folder='Templates', static_url_path='/', static_folder='static')
# app = Flask(__name__)
app.register_blueprint(login.loginBP)
app.register_blueprint(modify.modifyBP)
app.register_blueprint(order_history.orderhistoryBP)
app.register_blueprint(detailedorder.detailedbillBP)
app.register_blueprint(register.registerBP)
app.register_blueprint(D_accept_order.AcceptOrderBP)
app.register_blueprint(D_accept_order.PassengerMonitorOrderAcceptedBP)
app.register_blueprint(D_change_status.ToggleShiftBP)
app.register_blueprint(P_cancel_order.CancelOrderBP)
app.register_blueprint(P_pay_order.PayOrderBP)
app.register_blueprint(P_place_order.PlaceOrderBP)
app.register_blueprint(P_place_order.DriverMonitorOrderPlacedBP)
CORS(app, supports_credentials=True)

if __name__ == '__main__':
    app.run(port=50000, host='0.0.0.0', debug=True)