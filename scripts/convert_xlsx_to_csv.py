import pandas as pd

def convert_xlsx_to_csv(input_path, output_path):
  df = pd.read_excel(input_path)
  df = df.iloc[1:]
  df.to_csv(output_path)


if __name__ == "__main__":
  convert_xlsx_to_csv()
