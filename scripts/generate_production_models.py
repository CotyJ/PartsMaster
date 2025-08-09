import csv
import re

PARTS_CSV = "parts.csv"
PRODUCTION_MODELS_CSV = "production_models.csv"

MAX_REVISION = 6  # max number of revisions per model

def load_parts(filename):
    parts = []
    with open(filename, newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            parts.append(row)
    return parts

def get_model_name(part_name):
    # Remove any existing revision suffix " r.X" for base model name
    if part_name:
        return re.sub(r" r\.\d+$", "", part_name)
    return "UnknownModel"

def main():
    parts = load_parts(PARTS_CSV)

    # Filter PCB parts (prefix 9)
    pcb_parts = [p for p in parts if p['part_number'].startswith('9')]

    with open(PRODUCTION_MODELS_CSV, "w", newline='', encoding='utf-8') as f_out:
        fieldnames = ["id", "model", "in_production"]
        writer = csv.DictWriter(f_out, fieldnames=fieldnames)
        writer.writeheader()

        id_counter = 1
        for part in pcb_parts:
            base_model = get_model_name(part.get('part_name', '') or part.get('part_description', 'UnknownModel'))

            # Generate revisions 1 through MAX_REVISION
            for rev in range(1, MAX_REVISION + 1):
                model_name = f"{base_model} r.{rev}"
                in_production = (rev == MAX_REVISION)  # highest rev is in production
                writer.writerow({
                    "id": id_counter,
                    "model": model_name,
                    "in_production": in_production
                })
                id_counter += 1

if __name__ == "__main__":
    main()
