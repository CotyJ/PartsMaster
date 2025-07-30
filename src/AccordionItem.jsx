import React from 'react';

export default function AccordionItem({ part }) {

  // Fields to rename from db names
const fieldConfig = [
  { db_name: 'user_name', display_name: 'User Name' },
  { db_name: 'part_number', display_name: 'Part Number' },
  { db_name: 'part_description', display_name: 'Part Description' },
  { db_name: 'dchapman_ok', display_name: 'DChapman OK' },
  { db_name: 'dkrich_ok', display_name: 'DKRich OK' },
  { db_name: 'date_added', display_name: 'Date Added' },
  { db_name: 'std_cost', display_name: 'Standard Cost' },
  { db_name: 'part_name', display_name: 'Part Name' },
  { db_name: 'part_value', display_name: 'Part Value' },
  { db_name: 'part_pwr', display_name: 'Part Power' },
  { db_name: 'part_volt', display_name: 'Part Voltage' },
  { db_name: 'part_tol', display_name: 'Part Tolerance' },
  { db_name: 'part_type', display_name: 'Part Type' },
  { db_name: 'part_lead', display_name: 'Part Lead' },
  { db_name: 'part_package', display_name: 'Part Package' },
  { db_name: 'part_basic', display_name: 'Part Basic' },
  { db_name: 'part_special', display_name: 'Part Special' },
  { db_name: 'symbol_library_path1', display_name: 'Symbol Library Path 1' },
  { db_name: 'symbol_library_ref1', display_name: 'Symbol Library Ref 1' },
  { db_name: 'symbol_library_ref2', display_name: 'Symbol Library Ref 2' },
  { db_name: 'symbol_library_ref3', display_name: 'Symbol Library Ref 3' },
  { db_name: 'footprint_path1', display_name: 'Footprint Path 1' },
  { db_name: 'footprint_ref1', display_name: 'Footprint Ref 1' },
  { db_name: 'footprint_ref2', display_name: 'Footprint Ref 2' },
  { db_name: 'drawing_no', display_name: 'Drawing Number' },
  { db_name: 'supplier_1', display_name: 'Supplier 1' },
  { db_name: 'supplier_1_part_no', display_name: 'Supplier 1 Part Number' },
  { db_name: 'mfg', display_name: 'Manufacturer' },
  { db_name: 'mfg_part_no', display_name: 'MFG Part Number' },
  { db_name: 'mfg_datasheet', display_name: 'MFG Datasheet' },
  { db_name: 'mfg_2', display_name: 'Manufacturer 2' },
  { db_name: 'mfg_2_part_no', display_name: 'MFG 2 Part Number' },
  { db_name: 'mfg_2_datasheet', display_name: 'MFG 2 Datasheet' },
  { db_name: 'mfg_3', display_name: 'Manufacturer 3' },
  { db_name: 'mfg_3_part_no', display_name: 'MFG 3 Part Number' },
  { db_name: 'mfg_3_datasheet', display_name: 'MFG 3 Datasheet' },
  { db_name: 'lead_time_periods', display_name: 'Lead Time (Periods)' },
  { db_name: 'moq', display_name: 'Minimum Order Quantity' },
  { db_name: 'elytone_part_number', display_name: 'Elytone Part Number' },
  { db_name: 'elytone_cost', display_name: 'Elytone Cost' },
  { db_name: 'kanban_reorder_qty', display_name: 'Kanban Reorder Qty' },
  { db_name: 'rohs_category', display_name: 'RoHS Category' },
  { db_name: 'uom', display_name: 'Unit of Measure' },
  { db_name: 'note', display_name: 'Note' },
  { db_name: 'cost_class', display_name: 'Cost Class' },
  { db_name: 'supplier_part_number1', display_name: 'Supplier Part Number 1' },
  { db_name: 'supplier_1_EXTRA', display_name: 'Supplier 1 Extra' },
];


  return (
    <div className='row'>

    {
      fieldConfig.map(
        ({db_name, display_name}) =>
        part[db_name] ? (
          <div className='col-6 my-2'>
            <h4>{`${display_name}`}</h4>
            <div>{part[db_name]}</div>
        </div>
      )
        : null)
    }

    </div>
  );
}
