import os
import csv
import re


base_dir = os.path.dirname(os.path.abspath(__file__))
production_models_file_path = os.path.join(base_dir, "..", "data", "production_models.csv")
# parts_file_path = os.path.join(base_dir, "..", "data", "parts.csv")

def generate_production_models_csv():
    base_models = ["RTX3080", "RTX3090", "GTX1080", "GTX1070", "RX5700"]
    revisions_per_model = 5

    with open(production_models_file_path, "w", newline='', encoding='utf-8') as f_out:
        fieldnames = ["id", "model", "in_production"]
        writer = csv.DictWriter(f_out, fieldnames=fieldnames)
        writer.writeheader()

        row_id = 1
        for base_model in base_models:
            for rev_num in range(1, revisions_per_model + 1):
                model_name = f"{base_model} r.{rev_num}"
                in_production = (rev_num == revisions_per_model)  # Only highest revision is in production
                writer.writerow({
                    "id": row_id,
                    "model": model_name,
                    "in_production": str(in_production)  # Optional: convert bool to string
                })
                row_id += 1

if __name__ == "__main__":
    generate_production_models_csv()
