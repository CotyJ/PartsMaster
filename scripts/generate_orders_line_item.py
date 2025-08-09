import csv
import random
from datetime import datetime, timedelta

PARTS_CSV = "parts.csv"
ORDERS_CSV = "orders_line_item.csv"

NUM_POS = 100  # number of purchase orders
MIN_LINE_ITEMS = 5
MAX_LINE_ITEMS = 20

START_PO_NUMBER = 200000

# Date range for due dates
START_DATE = datetime(2020, 1, 1)
END_DATE = datetime(2024, 7, 1)

def load_parts(filename):
    parts = []
    with open(filename, newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            parts.append(row)
    return parts

def random_date(start, end):
    delta = end - start
    random_days = random.randint(0, delta.days)
    return start + timedelta(days=random_days)

def main():
    parts = load_parts(PARTS_CSV)
    parts_by_number = {p['part_number']: p for p in parts}

    with open(ORDERS_CSV, "w", newline='', encoding='utf-8') as f_out:
        fieldnames = ["id","old_id","po_number","part_number","li_cost","li","due_date","order_qty","invoice","received_qty","received_date"]
        writer = csv.DictWriter(f_out, fieldnames=fieldnames)
        writer.writeheader()

        global_id = 1
        for po_index in range(NUM_POS):
            po_number = START_PO_NUMBER + po_index
            num_line_items = random.randint(MIN_LINE_ITEMS, MAX_LINE_ITEMS)

            # Track line item number for this PO
            li_num = 1

            # Due date for entire PO
            po_due_date = random_date(START_DATE, END_DATE)

            # Choose parts randomly for this PO
            parts_for_po = random.sample(parts, k=num_line_items)

            for part in parts_for_po:
                part_number = part['part_number']
                std_cost = part['std_cost']
                try:
                    li_cost = round(float(std_cost) * random.uniform(0.9, 1.1), 5)
                except:
                    li_cost = round(random.uniform(0.01, 50), 5)

                order_qty = round(random.uniform(1, 1000), 2)

                # Randomly decide if received (80% yes), and some POs only partial received
                received = random.random() < 0.8

                received_qty = order_qty if received else 0
                invoice = f"INV{po_number}{li_num:03d}" if received and random.random() < 0.7 else ""

                # Received date after due_date but before today
                if received:
                    received_date = po_due_date + timedelta(days=random.randint(1, 180))
                    if received_date > datetime.now():
                        received_date = None
                else:
                    # Sometimes some partial receive for older orders (simulate delays)
                    if po_due_date < datetime(2024, 3, 1) and random.random() < 0.3:
                        received_qty = round(order_qty * random.uniform(0.1, 0.9), 2)
                        received = received_qty > 0
                        invoice = f"INV{po_number}{li_num:03d}" if received else ""
                        if received:
                            received_date = po_due_date + timedelta(days=random.randint(1, 180))
                        else:
                            received_date = None
                    else:
                        received_date = None

                writer.writerow({
                    "id": global_id,
                    "old_id": "",
                    "po_number": po_number,
                    "part_number": part_number,
                    "li_cost": li_cost,
                    "li": li_num,
                    "due_date": po_due_date.strftime("%Y-%m-%d"),
                    "order_qty": order_qty,
                    "invoice": invoice,
                    "received_qty": received_qty,
                    "received_date": received_date.strftime("%Y-%m-%d") if received_date else ""
                })

                global_id += 1
                li_num += 1

if __name__ == "__main__":
    main()
