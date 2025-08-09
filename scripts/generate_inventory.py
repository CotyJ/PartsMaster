import os
import csv
import random

base_dir = os.path.dirname(os.path.abspath(__file__))
inventory_file_path = os.path.join(base_dir, "..", "data", "inventory.csv")
parts_file_path = os.path.join(base_dir, "..", "data", "parts.csv")


# Location components
PALLET_RACKS = ['A', 'B', 'C', 'D', 'E', 'F']
SIDES = ['W', 'E']
ROWS = ['1', '2', '3', '4']
N_S = ['N', 'S']
FRONT_BACK = ['a', 'b']

def load_parts(filename):
    parts = []
    with open(filename, newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            parts.append(row)
    return parts

def generate_location():
    rack = random.choice(PALLET_RACKS)
    side = random.choice(SIDES)
    row = random.choice(ROWS)
    ns = random.choice(N_S)
    fb = random.choice(FRONT_BACK)
    return f"{rack}{side}-{row}{ns}{fb}"

def generate_inventory_csv():
    parts = load_parts(parts_file_path)

    with open(inventory_file_path, "w", newline='', encoding='utf-8') as f_out:
        fieldnames = ["id", "part_number", "os_location"]
        writer = csv.DictWriter(f_out, fieldnames=fieldnames)
        writer.writeheader()

        row_id = 1
        for part in parts:
            # Assign 0 to 1 locations per part
            num_locations = random.randint(0, 1)
            assigned_locations = set()

            for _ in range(num_locations):
                loc = generate_location()
                # Avoid duplicate locations per part
                while loc in assigned_locations:
                    loc = generate_location()
                assigned_locations.add(loc)

                writer.writerow({
                    "id": row_id,
                    "part_number": part['part_number'],
                    "os_location": loc
                })
                row_id += 1

if __name__ == "__main__":
    generate_inventory_csv()
