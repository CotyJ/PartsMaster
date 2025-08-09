import os
import csv
import random
from datetime import datetime, timedelta


output_path = os.path.join('../data')
os.makedirs(output_path, exist_ok=True)
filename = "parts.csv"
file_path = os.path.join(output_path, filename)

random.seed(42)

NUM_ROWS = 1000

# Map types to prefix digit as per your convention
type_prefix_map = {
    "Resistor": "1",
    "Capacitor": "2",
    "Transistor": "3",
    "Diode": "4",
    "IC": "5",
    "Hardware": "6",
    "Connector": "7",
    "Metal": "8",
    "PCB": "9"
}

types = list(type_prefix_map.keys())

# Property pools for each part type for meaningful descriptions
properties = {
    "Resistor": {
        "resistances": ["10.0K Ohm", "100K Ohm", "1K Ohm", "4.7K Ohm", "220 Ohm", "1M Ohm"],
        "powers": ["1/4W", "1/2W", "1W", "2W"],
        "tolerances": ["1%", "5%", "10%"],
        "leads": ["PTH", "SMD"],
        "packages": ["Axial", "Radial", "1206", "0805", "2512", "0603"],
        "basics": ["Carbon Film", "Thick Film Chip"]
    },
    "Capacitor": {
        "values": ["1uF", "10uF", "100uF", "220uF", "470uF"],
        "voltages": ["6.3V", "16V", "25V", "50V", "100V"],
        "tolerances": ["5%", "10%"],
        "types": ["Ceramic", "Electrolytic", "Tantalum"],
        "leads": ["PTH", "SMD"],
        "packages": ["Radial", "Axial", "0805", "1206"],
        "basics": ["X7R", "Y5V", "Z5U"]
    },
    "Transistor": {
        "types": ["NPN", "PNP", "MOSFET", "JFET"],
        "packages": ["TO-92", "SOT-23", "TO-220", "SOT-223"],
        "basics": ["General Purpose", "Power", "Logic Level"]
    },
    "Diode": {
        "types": ["Rectifier", "Zener", "Schottky", "LED"],
        "voltages": ["20V", "50V", "100V", "200V"],
        "packages": ["DO-41", "SMA", "SMB", "SOT-23"]
    },
    "IC": {
        "types": ["Op Amp", "Regulator", "Microcontroller", "Logic Gate"],
        "packages": ["DIP-8", "SOIC-16", "QFN-32", "TQFP-64"]
    },
    "Hardware": {
        "types": ["Screw", "Standoff", "Nut", "Washer"],
        "sizes": ["M2", "M3", "M4", "M5"],
        "materials": ["Steel", "Stainless Steel", "Aluminum"]
    },
    "Connector": {
        "types": ["USB", "HDMI", "RJ45", "SATA"],
        "pins": ["4-pin", "8-pin", "10-pin", "24-pin"],
        "styles": ["Male", "Female"]
    },
    "Metal": {
        "types": ["Chassis", "Bracket", "Shield", "Plate"],
        "materials": ["Steel", "Aluminum", "Copper"]
    },
    "PCB": {
        "layers": ["2-layer", "4-layer", "6-layer"],
        "types": ["FR4", "Polyimide"],
        "sizes": ["100x100mm", "150x150mm", "200x200mm"]
    }
}

suppliers = ["Digikey", "Mouser", "Arrow", "Newark"]
mfgs = ["Yageo", "Vishay", "TDK", "Murata", "Panasonic"]
symbol_lib_path = "M:\\Altium Libraries\\Components.SchLib"
footprint_path = "M:\\Altium Libraries\\Components.PcbLib"

def random_date(start_year=2000, end_year=2024):
    start = datetime(start_year,1,1)
    end = datetime(end_year,12,31)
    delta = end - start
    random_days = random.randint(0, delta.days)
    return start + timedelta(days=random_days)

def generate_part_number(part_type):
    prefix_digit = type_prefix_map.get(part_type, "0")
    prefix = prefix_digit + f"{random.randint(0, 9999):04d}"
    suffix = f"{random.randint(0, 9999):04d}"
    return f"{prefix}-{suffix}"

def choose_or_empty(lst, empty_prob=0.1):
    return "" if random.random() < empty_prob else random.choice(lst)

def generate_part_description(ptype):
    prop = properties[ptype]

    if ptype == "Resistor":
        desc = f"{random.choice(prop['resistances'])}, {random.choice(prop['powers'])}, {random.choice(prop['tolerances'])}, {random.choice(prop['leads'])}, {random.choice(prop['packages'])}, {random.choice(prop['basics'])} Resistor"
    elif ptype == "Capacitor":
        desc = f"{random.choice(prop['values'])}, {random.choice(prop['voltages'])}, {random.choice(prop['tolerances'])}, {random.choice(prop['types'])}, {random.choice(prop['leads'])}, {random.choice(prop['packages'])}, {random.choice(prop['basics'])} Capacitor"
    elif ptype == "Transistor":
        desc = f"{random.choice(prop['types'])}, {random.choice(prop['packages'])}, {random.choice(prop['basics'])} Transistor"
    elif ptype == "Diode":
        desc = f"{random.choice(prop['types'])}, {random.choice(prop['voltages'])}, {random.choice(prop['packages'])} Diode"
    elif ptype == "IC":
        desc = f"{random.choice(prop['types'])}, {random.choice(prop['packages'])} IC"
    elif ptype == "Hardware":
        desc = f"{random.choice(prop['sizes'])} {random.choice(prop['materials'])} {random.choice(prop['types'])}"
    elif ptype == "Connector":
        desc = f"{random.choice(prop['types'])}, {random.choice(prop['pins'])}, {random.choice(prop['styles'])} Connector"
    elif ptype == "Metal":
        desc = f"{random.choice(prop['materials'])} {random.choice(prop['types'])}"
    elif ptype == "PCB":
        desc = f"{random.choice(prop['layers'])} {random.choice(prop['types'])} PCB, {random.choice(prop['sizes'])}"
    else:
        desc = ptype

    return desc

with open(file_path, "w", newline="") as f:
    writer = csv.writer(f)
    header = [
        "id","user_name","part_number","part_description","dchapman_ok","dkrich_ok",
        "date_added","std_cost","part_name","part_value","part_pwr","part_volt","part_tol",
        "part_type","part_lead","part_package","part_basic","part_special",
        "symbol_library_path1","symbol_library_ref1","symbol_library_ref2","symbol_library_ref3",
        "footprint_path1","footprint_ref1","footprint_ref2","drawing_no","supplier_1",
        "supplier_1_part_no","mfg","mfg_part_no","mfg_datasheet","mfg_2","mfg_2_part_no",
        "mfg_2_datasheet","mfg_3","mfg_3_part_no","mfg_3_datasheet","lead_time_periods",
        "moq","elytone_part_number","elytone_cost","kanban_reorder_qty","rohs_category",
        "uom","note","cost_class","supplier_part_number1","supplier_1_EXTRA"
    ]
    writer.writerow(header)

    for i in range(1, NUM_ROWS+1):
        part_type = random.choice(types)
        part_num = generate_part_number(part_type)
        part_desc = generate_part_description(part_type)

        user = random.choice(["Keith C", "Darrell", "Alice", "Bob"])
        date_added = random_date()
        std_cost = round(random.uniform(0.01, 20.00), 2)

        # Fill related fields based on part_type and properties or leave empty if not applicable
        if part_type == "Resistor":
            part_name = "Resistor"
            part_value = part_desc.split(",")[0]
            part_pwr = part_desc.split(",")[1].strip()
            part_volt = ""
            part_tol = part_desc.split(",")[2].strip()
            part_lead = part_desc.split(",")[3].strip()
            part_package = part_desc.split(",")[4].strip()
            part_basic = part_desc.split(",")[5].replace(" Resistor", "").strip()
            part_special = ""
        elif part_type == "Capacitor":
            vals = part_desc.split(",")
            part_name = "Capacitor"
            part_value = vals[0].strip()
            part_pwr = ""
            part_volt = vals[1].strip()
            part_tol = vals[2].strip()
            part_lead = vals[4].strip()
            part_package = vals[5].strip()
            part_basic = vals[6].replace(" Capacitor", "").strip()
            part_special = ""
        elif part_type == "Transistor":
            vals = part_desc.split(",")
            part_name = "Transistor"
            part_value = ""
            part_pwr = ""
            part_volt = ""
            part_tol = ""
            part_lead = ""
            part_package = vals[1].strip()
            part_basic = vals[2].replace(" Transistor", "").strip()
            part_special = vals[0].strip()
        elif part_type == "Diode":
            vals = part_desc.split(",")
            part_name = "Diode"
            part_value = ""
            part_pwr = ""
            part_volt = vals[1].strip()
            part_tol = ""
            part_lead = ""
            part_package = vals[2].strip()
            part_basic = ""
            part_special = vals[0].strip()
        elif part_type == "IC":
            vals = part_desc.split(",")
            part_name = "IC"
            part_value = ""
            part_pwr = ""
            part_volt = ""
            part_tol = ""
            part_lead = ""
            part_package = vals[1].strip()
            part_basic = ""
            part_special = vals[0].strip()
        elif part_type == "Hardware":
            vals = part_desc.split()
            part_name = "Hardware"
            part_value = ""
            part_pwr = ""
            part_volt = ""
            part_tol = ""
            part_lead = ""
            part_package = ""
            part_basic = vals[1]  # material
            part_special = vals[2]  # type
        elif part_type == "Connector":
            vals = part_desc.split(",")
            part_name = "Connector"
            part_value = ""
            part_pwr = ""
            part_volt = ""
            part_tol = ""
            part_lead = ""
            part_package = ""
            part_basic = vals[0].strip()
            part_special = vals[2].replace(" Connector", "").strip()
        elif part_type == "Metal":
            vals = part_desc.split()
            part_name = "Metal"
            part_value = ""
            part_pwr = ""
            part_volt = ""
            part_tol = ""
            part_lead = ""
            part_package = ""
            part_basic = vals[0]  # material
            part_special = vals[1]  # type
        elif part_type == "PCB":
            vals = part_desc.split()
            part_name = "PCB"
            part_value = ""
            part_pwr = ""
            part_volt = ""
            part_tol = ""
            part_lead = ""
            part_package = ""
            part_basic = f"{vals[0]} {vals[1]}"
            part_special = " ".join(vals[3:])  # rest of desc after size
        else:
            part_name = part_type
            part_value = ""
            part_pwr = ""
            part_volt = ""
            part_tol = ""
            part_lead = ""
            part_package = ""
            part_basic = ""
            part_special = ""

        symbol_lib_ref = f"{part_name}Symbol"
        footprint_ref = f"{part_name}Footprint"
        drawing_no = f"DRAW-{random.randint(1000,9999)}"
        supplier_1 = random.choice(suppliers)
        supplier_1_part_no = f"S-{random.randint(100000,999999)}"
        mfg = random.choice(mfgs)
        mfg_part_no = f"M-{random.randint(100000,999999)}"
        mfg_datasheet = f"http://datasheets.example.com/{mfg_part_no}.pdf"
        mfg_2 = random.choice(mfgs)
        mfg_2_part_no = f"M2-{random.randint(100000,999999)}"
        mfg_2_datasheet = f"http://datasheets.example.com/{mfg_2_part_no}.pdf"
        mfg_3 = random.choice(mfgs)
        mfg_3_part_no = f"M3-{random.randint(100000,999999)}"
        mfg_3_datasheet = f"http://datasheets.example.com/{mfg_3_part_no}.pdf"
        lead_time_periods = random.randint(1, 12)
        moq = random.randint(1, 1000)
        elytone_part_number = f"E-{random.randint(10000,99999)}"
        elytone_cost = round(random.uniform(0.01, 20.00), 2)
        kanban_reorder_qty = str(random.choice([10, 25, 50, 100]))
        rohs_category = random.choice(["RoHS Compliant", "Non-RoHS"])
        uom = random.choice(["Ea", "Pack", "Reel"])
        note = ""
        cost_class = random.choice(["A", "B", "C"])
        supplier_part_number1 = supplier_1_part_no
        supplier_1_EXTRA = ""

        dchapman_ok = random.choice([True, False])
        dkrich_ok = random.choice([True, False])

        writer.writerow([
            i, user, part_num, part_desc, dchapman_ok, dkrich_ok, date_added.strftime("%Y-%m-%d %H:%M:%S"),
            std_cost, part_name, part_value, part_pwr, part_volt, part_tol, part_type, part_lead,
            part_package, part_basic, part_special, symbol_lib_path, symbol_lib_ref, "", "",
            footprint_path, footprint_ref, "", drawing_no, supplier_1, supplier_1_part_no,
            mfg, mfg_part_no, mfg_datasheet, mfg_2, mfg_2_part_no, mfg_2_datasheet,
            mfg_3, mfg_3_part_no, mfg_3_datasheet, lead_time_periods, moq, elytone_part_number,
            elytone_cost, kanban_reorder_qty, rohs_category, uom, note, cost_class,
            supplier_part_number1, supplier_1_EXTRA
        ])
