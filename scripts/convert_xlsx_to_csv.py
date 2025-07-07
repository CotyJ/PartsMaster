import pandas as pd
import csv

def convert_xlsx_to_csv(input_path, output_path):
  df = pd.read_excel(input_path)
  df.to_csv(output_path)


if __name__ == "__main__":
  convert_xlsx_to_csv()
