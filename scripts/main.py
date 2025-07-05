import pandas as pd

from convert_xlsx_to_csv import convert_xlsx_to_csv


# Renames CSV for consistency and removes header, since I am defining the columns in postgres
def rename_csv_remove_header(old_path, new_path):
  df = pd.read_csv(old_path)
  df = df.iloc[1:]
  df.to_csv(new_path)

excel_file_path = "../data/raw"
csv_path = "../data/processed"

raw_orders_line_item_path = f"{excel_file_path}/OrdersLineItem.xlsx"
raw_overstock_path = f"{excel_file_path}/overstock.csv"
raw_parts_path = f"{excel_file_path}/Parts.xlsx"
raw_production_models_path = f"{excel_file_path}/Production_models.csv"
raw_whereused_path = f"{excel_file_path}/WhereUsed.xlsx"

processed_orders_line_item_path = f"{csv_path}/orders_line_item.csv"
processed_overstock_path = f"{csv_path}/overstock.csv"
processed_parts_path = f"{csv_path}/parts.csv"
processed_production_models_path = f"{csv_path}/production_models.csv"
processed_whereused_path = f"{csv_path}/where_used.csv"


if __name__ == "__main__":
  convert_xlsx_to_csv(raw_orders_line_item_path, processed_production_models_path)
  rename_csv_remove_header(raw_overstock_path, processed_overstock_path)
  convert_xlsx_to_csv(raw_parts_path, processed_parts_path)
  rename_csv_remove_header(raw_production_models_path, processed_production_models_path)
  convert_xlsx_to_csv(raw_whereused_path, processed_whereused_path)
