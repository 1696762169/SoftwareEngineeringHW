import unittest
from unittest.mock import patch, MagicMock
from your_module import checkExistByWeChatID  # Replace 'your_module' with the actual module name

class TestCheckExistByWeChatID(unittest.TestCase):

    @patch('your_module.baseSelect')
    def test_passenger_exist(self, mock_baseSelect):
        mock_baseSelect.return_value = [{"passenger_no": "passenger123"}]
        DR = checkExistByWeChatID("passenger", "passenger123", "passenger_table")

        self.assertEqual(DR.size(), 1)

    @patch('your_module.baseSelect')
    def test_passenger_not_exist(self, mock_baseSelect):
        mock_baseSelect.return_value = []
        DR = checkExistByWeChatID("passenger", "invalid_passenger", "passenger_table")

        self.assertEqual(DR.size(), 0)

    @patch('your_module.baseSelect')
    def test_driver_exist(self, mock_baseSelect):
        mock_baseSelect.return_value = [{"driver_no": "driver123"}]
        DR = checkExistByWeChatID("driver", "driver123", "driver_table")

        self.assertEqual(DR.size(), 1)

    @patch('your_module.baseSelect')
    def test_driver_not_exist(self, mock_baseSelect):
        mock_baseSelect.return_value = []
        DR = checkExistByWeChatID("driver", "invalid_driver", "driver_table")

        self.assertEqual(DR.size(), 0)

if __name__ == '__main__':
    unittest.main()
