import os
import csv
import random
import re
import math


base_dir = os.path.dirname(os.path.abspath(__file__))
where_used_file_path = os.path.join(base_dir, "..", "data", "where_used.csv")
parts_file_path = os.path.join(base_dir, "..", "data", "parts.csv")


# Config
NUM_CHILDREN_MIN = 5
NUM_CHILDREN_MAX = 50

# Reference designator prefixes by part type
ref_prefix_map = {
    "Resistor": "R",
    "Capacitor": "C",
    "Transistor": "Q",
    "Diode": "D",
    "IC": "U",
    "Hardware": "H",
    "Connector": "J",
    "Metal": "M",
    "PCB": "P"
}

def load_parts(filename):
    parts = []
    with open(filename, newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            parts.append(row)
    return parts

def categorize_parts(parts):
    parents = []
    children = []
    for part in parts:
        # Check prefix (first digit of part_number)
        if part['part_number'].startswith('9'):
            parents.append(part)
        else:
            children.append(part)
    return parents, children

def generate_reference_designators(child_parts):
    # For each part type, keep track of numbering to avoid duplicates
    counters = {key: 1 for key in ref_prefix_map.keys()}

    designators = []
    for child in child_parts:
        ptype = child['part_type']
        prefix = ref_prefix_map.get(ptype, "X")
        desig_num = counters.get(ptype, 1)
        designator = f"{prefix}{desig_num}"
        counters[ptype] = desig_num + 1
        designators.append(designator)
    return designators

def generate_where_used_csv():
    parts = load_parts(parts_file_path)

    base_models = ["RTX3080", "RTX3090", "GTX1080", "GTX1070", "RX5700"]
    revisions_per_model = 5

    where_used_rows = []
    id_counter = 1

    # Create full list of all revisions
    all_revisions = [f"{base_model} r.{rev}" for base_model in base_models for rev in range(1, revisions_per_model + 1)]

    for part in parts:
        # Randomly assign each part to between 1 and 3 revisions (you can adjust max here)
        assigned_revisions = random.sample(all_revisions, random.randint(2, 8))

        for model_name in assigned_revisions:
            where_used_rows.append({
                "id": id_counter,
                "bom_model": model_name,
                "parent_assembly": f"Parent Assy {id_counter}",
                "assembly_name": f"Assembly {id_counter}",
                "reference_designator": f"R{id_counter}",
                "part_number": part['part_number'],
                "part_description": part['part_description'],
                "grouping_model": model_name,
            })
            id_counter += 1

    # Write CSV
    with open(where_used_file_path, "w", newline='', encoding='utf-8') as f_out:
        fieldnames = ["id","bom_model","parent_assembly","assembly_name","reference_designator","part_number","part_description","grouping_model"]
        writer = csv.DictWriter(f_out, fieldnames=fieldnames)
        writer.writeheader()
        for row in where_used_rows:
            writer.writerow(row)

if __name__ == "__main__":
    generate_where_used_csv()
