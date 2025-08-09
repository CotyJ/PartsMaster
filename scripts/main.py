import generate_parts
import generate_where_used
import generate_production_models
import generate_orders_line_item
import generate_inventory


if __name__ == "__main__":
  generate_parts.generate_parts_csv()
  generate_where_used.generate_where_used_csv()
  generate_production_models.generate_production_models_csv()
  generate_orders_line_item.generate_orders_line_item_csv()
  generate_inventory.generate_inventory_csv()
