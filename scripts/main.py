import generate_parts
import generate_where_used
import generate_production_models

if __name__ == "__main__":
  generate_parts.generate_parts_csv()
  generate_where_used.generate_where_used_csv()
  generate_production_models.generate_production_models_csv()