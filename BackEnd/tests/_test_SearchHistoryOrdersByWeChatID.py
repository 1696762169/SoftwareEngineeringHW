import unittest
from unittest.mock import patch, MagicMock
from your_module import SearchHistoryOrdersByWeChatID  # Replace 'your_module' with the actual module name

class TestSearchHistoryOrdersByWeChatID(unittest.TestCase):

    @patch('your_module.baseSelect')
    def test_passenger_search(self, mock_baseSelect):
        mock_baseSelect.return_value = [
            {
                'order_number': '12345',
                'order_time': '2023-08-26 10:00:00',
                'order_status': 'completed',
                'passenger_no': 'passenger123',
                'driver_no': 'driver456',
                'order_price': 20.0,
                'order_start': 'Location A',
                'order_end': 'Location B',
                'P_comment_no': 'p_comment1',
                'D_comment_no': 'd_comment1'
            }
        ]
        DR = SearchHistoryOrdersByWeChatID("passenger", "passenger123")

        self.assertEqual(DR.size(), 1)

    @patch('your_module.baseSelect')
    def test_passenger_no_result(self, mock_baseSelect):
        mock_baseSelect.return_value = []
        DR = SearchHistoryOrdersByWeChatID("passenger", "invalid_passenger")

        self.assertEqual(DR.size(), 0)

    @patch('your_module.baseSelect')
    def test_driver_search(self, mock_baseSelect):
        mock_baseSelect.return_value = [
            {
                'order_number': '54321',
                'order_time': '2023-08-25 15:00:00',
                'order_status': 'cancelled',
                'passenger_no': 'passenger789',
                'driver_no': 'driver123',
                'order_price': 15.0,
                'order_start': 'Location X',
                'order_end': 'Location Y',
                'P_comment_no': 'p_comment2',
                'D_comment_no': 'd_comment2'
            }
        ]
        DR = SearchHistoryOrdersByWeChatID("driver", "driver123")

        self.assertEqual(DR.size(), 1)

    @patch('your_module.baseSelect')
    def test_driver_no_result(self, mock_baseSelect):
        mock_baseSelect.return_value = []
        DR = SearchHistoryOrdersByWeChatID("driver", "invalid_driver")

        self.assertEqual(DR.size(), 0)

if __name__ == '__main__':
    unittest.main()
