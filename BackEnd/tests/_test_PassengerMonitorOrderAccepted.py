import unittest
from unittest.mock import patch, MagicMock
from flask import Flask, jsonify
from your_module import PassengerMonitorOrderAccepted  # Replace 'your_module' with the actual module name

class TestPassengerMonitorOrderAcceptedBlueprint(unittest.TestCase):

    def setUp(self):
        self.app = Flask(__name__)
        self.app.register_blueprint(PassengerMonitorOrderAccepted)

    @patch('your_module.read.SearchOrderByOrderID')
    @patch('your_module.read.SearchDriverByOrderID')
    def test_accepted_order(self, mock_SearchDriverByOrderID, mock_SearchOrderByOrderID):
        mock_SearchOrderByOrderID.return_value.size.return_value = 1
        mock_SearchOrderByOrderID.return_value.records.return_value = [
            {"order_number": 1, "order_status": 1}
        ]
        mock_SearchDriverByOrderID.return_value.records.return_value = [
            {"driver_name": "John", "driver_no": "driver123"}
        ]
        with self.app.test_client() as client:
            response = client.post('/monitor-order-Accepted', json={
                'order_number': 1
            })
            data = response.get_json()

            self.assertEqual(response.status_code, 200)
            self.assertEqual(data['message'], 'ACCEPTED')
            self.assertEqual(data['driver_message'][0]['driver_name'], 'John')

    @patch('your_module.read.SearchOrderByOrderID')
    def test_not_accepted_order(self, mock_SearchOrderByOrderID):
        mock_SearchOrderByOrderID.return_value.size.return_value = 1
        mock_SearchOrderByOrderID.return_value.records.return_value = [
            {"order_number": 2, "order_status": 0}
        ]
        with self.app.test_client() as client:
            response = client.post('/monitor-order-Accepted', json={
                'order_number': 2
            })
            data = response.get_json()

            self.assertEqual(response.status_code, 200)
            self.assertEqual(data['message'], 'NOT_ACCEPTED')

    @patch('your_module.read.SearchOrderByOrderID')
    def test_invalid_order(self, mock_SearchOrderByOrderID):
        mock_SearchOrderByOrderID.return_value.size.return_value = 0
        with self.app.test_client() as client:
            response = client.post('/monitor-order-Accepted', json={
                'order_number': 3
            })
            data = response.get_json()

            self.assertEqual(response.status_code, 200)
            self.assertEqual(data['message'], 'INVALID_USER')

    def test_exception_handling(self):
        with self.app.test_client() as client:
            response = client.post('/monitor-order-Accepted', json={
                'order_number': 1
            })
            data = response.get_json()

            self.assertEqual(response.status_code, 200)
            self.assertEqual(data['message'], 'ACCEPT_ORDER_UNKNOWN')

if __name__ == '__main__':
    unittest.main()
