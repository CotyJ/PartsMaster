import os
import csv
import random
import re


base_dir = os.path.dirname(os.path.abspath(__file__))
where_used_file_path = os.path.join(base_dir, "..", "data", "where_used.csv")
parts_file_path = os.path.join(base_dir, "..", "data", "parts.csv")


# Config
NUM_CHILDREN_MIN = 5
NUM_CHILDREN_MAX = 15

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

def generate_where_used():
    parts = load_parts(parts_file_path)
    parents, children = categorize_parts(parts)

    with open(where_used_file_path, "w", newline='', encoding='utf-8') as f_out:
        fieldnames = ["id","bom_model","parent_assembly","assembly_name","reference_designator","part_number","part_description","grouping_model"]
        writer = csv.DictWriter(f_out, fieldnames=fieldnames)
        writer.writeheader()

        row_id = 1

        for parent in parents:
            bom_model_base = re.sub(r" r\.\d+$", "", parent['part_name'] or "Assembly")
            revision = random.randint(1,6)
            bom_model = f"{bom_model_base} r.{revision}"

            parent_assembly = parent['part_number']
            assembly_name = parent['part_description'] or parent['part_name'] or "Unknown Assembly"
            grouping_model = bom_model

            num_children = random.randint(NUM_CHILDREN_MIN, NUM_CHILDREN_MAX)
            # pick children randomly, allow duplicates but not same part multiple times
            child_parts = random.sample(children, min(num_children, len(children)))

            # reset designator counters per parent to keep designators consistent within assembly
            counters = {key:1 for key in ref_prefix_map.keys()}

            for child in child_parts:
                ptype = child['part_type']
                prefix = ref_prefix_map.get(ptype, "X")
                desig_num = counters.get(ptype, 1)
                reference_designator = f"{prefix}{desig_num}"
                counters[ptype] = desig_num + 1

                writer.writerow({
                    "id": row_id,
                    "bom_model": bom_model,
                    "parent_assembly": parent_assembly,
                    "assembly_name": assembly_name,
                    "reference_designator": reference_designator,
                    "part_number": child['part_number'],
                    "part_description": child['part_description'],
                    "grouping_model": grouping_model
                })

                row_id += 1

if __name__ == "__main__":
    generate_where_used()
