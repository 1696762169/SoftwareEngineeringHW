from flask import Flask
from flask_cors import CORS

from routes import login,modify,order_history,detailedorder,register
from routes import D_accept_order,D_change_status,P_cancel_order,P_pay_order,P_place_order
# from driver import 
# from passenger import 

app = Flask(__name__)
app.register_blueprint(login.login)
app.register_blueprint(modify.modify)
app.register_blueprint(order_history.orderhistory)
app.register_blueprint(detailedorder.detailedbill)
app.register_blueprint(register.register)
app.register_blueprint(D_accept_order.AcceptOrder)
app.register_blueprint(D_accept_order.PassengerMonitorOrderAccepted)
app.register_blueprint(D_change_status.ToggleShift)
app.register_blueprint(P_cancel_order.CancelOrder)
app.register_blueprint(P_pay_order.PayOrder)
app.register_blueprint(P_place_order.PlaceOrder)
app.register_blueprint(P_place_order.DriverMonitorOrderPlaced)
CORS(app, supports_credentials=True)

if __name__ == '__main__':
    app.run(port=50000, host='0.0.0.0', debug=True)