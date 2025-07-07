import os
import pandas as pd

base_dir = os.path.dirname(os.path.abspath(__file__))
parts_data_path = os.path.join(base_dir, "..", "data", "processed", "parts.csv")

df = pd.read_csv(parts_data_path)

columns_rename = {
  'Unnamed: 0':'id',
  'UserName':'user_name',
  'PartNumber':'part_number',
  'PartDescription':'part_description',
  'dchapman Ok':'dchapman_ok',
  'dkrich Ok':'dkrich_ok',
  'DateAdded':'date_added',
  'StdCost':'std_cost',
  'PartName':'part_name',
  'PartValue':'part_value',
  'PartPwr':'part_pwr',
  'PartVolt':'part_volt',
  'PartTol':'part_tol',
  'PartType':'part_type',
  'PartLead':'part_lead',
  'PartPackage':'part_package',
  'PartBasic':'part_basic',
  'PartSpecial':'part_special',
  'SymbolLibraryPath1':'symbol_library_path1',
  'SymbolLibraryRef1':'symbol_library_ref1',
  'SymbolLibraryRef2':'symbol_library_ref2',
  'SymbolLibraryRef3':'symbol_library_ref3',
  'FootprintPath1':'footprint_path1',
  'FootprintRef1':'footprint_ref1',
  'FootprintRef2':'footprint_ref2',
  'DrawingNo':'drawing_no',
  'Supplier1':'supplier_1',
  'Supplier1PartNo':'supplier_1_part_no',
  'Mfg':'mfg',
  'MfgPartNo':'mfg_part_no',
  'MfgDatasheet':'mfg_datasheet',
  'Mfg2':'mfg_2',
  'Mfg2PartNo':'mfg_2_part_no',
  'Mfg2Datasheet':'mfg_2_datasheet',
  'Mfg3':'mfg_3',
  'Mfg3PartNo':'mfg_3_part_no',
  'Mfg3Datasheet':'mfg_3_datasheet',
  'LeadTimePeriods':'lead_time_periods',
  'MOQ':'moq',
  'ElytonePartNumber':'elytone_part_number',
  'ElytoneCost':'elytone_cost',
  'KanBanReorderQty':'kanban_reorder_qty',
  'RoHSCategory':'rohs_category',
  'UOM':'uom',
  'Note':'note',
  'CostClass':'cost_class',
  'Supplier Part Number 1':'supplier_part_number1',
  'Supplier 1':'supplier_1_EXTRA',
}

# Rename columns
df = df.rename(columns=columns_rename)

df.to_csv(parts_data_path, index=False)
