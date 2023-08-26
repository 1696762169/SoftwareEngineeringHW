import unittest
from unittest.mock import patch, MagicMock
from flask import Flask, jsonify
from your_module import PlaceOrder  # Replace 'your_module' with the actual module name

class TestPlaceOrderBlueprint(unittest.TestCase):

    def setUp(self):
        self.app = Flask(__name__)
        self.app.register_blueprint(PlaceOrder)

    @patch('your_module.create.orderCreate')
    def test_successful_order(self, mock_orderCreate):
        mock_orderCreate.return_value.records.return_value = [
            {"order_number": 1}
        ]
        with self.app.test_client() as client:
            response = client.post('/place-order', json={
                'passenger_no': 'passenger123',
                'start_longitude': 0.0,
                'start_latitude': 0.0,
                'end_longitude': 1.0,
                'end_latitude': 1.0,
                'start_name': 'Start Location',
                'end_name': 'End Location',
                'price': 20.0,
                'time': '2023-08-26 10:00:00'
            })
            data = response.get_json()

            self.assertEqual(response.status_code, 200)
            self.assertEqual(data['status'], 'PLACE_ORDER_SUCCESS')
            self.assertEqual(data['data'], 1)

    def test_exception_handling(self):
        with self.app.test_client() as client:
            response = client.post('/place-order', json={
                'passenger_no': 'passenger123',
                'start_longitude': 0.0,
                'start_latitude': 0.0,
                'end_longitude': 1.0,
                'end_latitude': 1.0,
                'start_name': 'Start Location',
                'end_name': 'End Location',
                'price': 20.0,
                'time': '2023-08-26 10:00:00'
            })
            data = response.get_json()

            self.assertEqual(response.status_code, 200)
            self.assertEqual(data['message'], 'PLACE_ORDER_UNKNOWN')

if __name__ == '__main__':
    unittest.main()
