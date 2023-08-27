import unittest
from unittest.mock import patch, MagicMock
from flask import Flask, jsonify
from your_module import CancelOrder  # Replace 'your_module' with the actual module name

class TestCancelOrderBlueprint(unittest.TestCase):

    def setUp(self):
        self.app = Flask(__name__)
        self.app.register_blueprint(CancelOrder)

    @patch('your_module.modify.cancelOrder')
    def test_successful_cancellation(self, mock_cancelOrder):
        mock_cancelOrder.return_value.size.return_value = 1
        with self.app.test_client() as client:
            response = client.post('/cancel-order', json={
                'order_number': 1
            })
            data = response.get_json()

            self.assertEqual(response.status_code, 200)
            self.assertEqual(data['status'], 'CANCEL_ORDER_SUCCESS')

    @patch('your_module.modify.cancelOrder')
    def test_failed_cancellation(self, mock_cancelOrder):
        mock_cancelOrder.return_value.size.return_value = 0
        with self.app.test_client() as client:
            response = client.post('/cancel-order', json={
                'order_number': 2
            })
            data = response.get_json()

            self.assertEqual(response.status_code, 200)
            self.assertEqual(data['message'], 'CANCEL_ORDER_UNKNOWN')

    def test_exception_handling(self):
        with self.app.test_client() as client:
            response = client.post('/cancel-order', json={
                'order_number': 1
            })
            data = response.get_json()

            self.assertEqual(response.status_code, 200)
            self.assertEqual(data['message'], 'CANCEL_ORDER_UNKNOWN')

if __name__ == '__main__':
    unittest.main()
