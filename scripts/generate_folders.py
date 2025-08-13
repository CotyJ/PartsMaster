import os

script_dir = os.path.dirname(os.path.abspath(__file__))

def generate_data_folder():
  data_path = os.path.join(script_dir, "..", "data")
  data_path = os.path.abspath(data_path)
  if not os.path.exists(data_path):
      os.makedirs(data_path)