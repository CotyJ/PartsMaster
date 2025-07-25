import os
import pandas as pd

from convert_xlsx_to_csv import convert_xlsx_to_csv


# Renames CSV for consistency and removes header, since I am defining the columns in postgres
def rename_csv(old_path, new_path):
  df = pd.read_csv(old_path)
  df.to_csv(new_path)


base_dir = os.path.dirname(os.path.abspath(__file__))
print(base_dir) # TODO: remove later
raw_path = f"{base_dir}/../data/raw"
processed_path = f"{base_dir}/../data/processed"

raw_orders_line_item_path = f"{raw_path}/OrdersLineItem.xlsx"
processed_orders_line_item_path = f"{processed_path}/orders_line_item.csv"

raw_overstock_path = f"{raw_path}/overstock.csv"
processed_overstock_path = f"{processed_path}/overstock.csv"

raw_parts_path = f"{raw_path}/Parts.xlsx"
processed_parts_path = f"{processed_path}/parts.csv"

raw_production_models_path = f"{raw_path}/Production_models.csv"
processed_production_models_path = f"{processed_path}/production_models.csv"

raw_whereused_path = f"{raw_path}/WhereUsed.xlsx"
processed_whereused_path = f"{processed_path}/where_used.csv"


if __name__ == "__main__":
  convert_xlsx_to_csv(raw_orders_line_item_path, processed_orders_line_item_path)
  rename_csv(raw_overstock_path, processed_overstock_path)
  convert_xlsx_to_csv(raw_parts_path, processed_parts_path)
  rename_csv(raw_production_models_path, processed_production_models_path)
  convert_xlsx_to_csv(raw_whereused_path, processed_whereused_path)

  # clean parts and prod models?

