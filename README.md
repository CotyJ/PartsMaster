
# PartsMaster
PartsMaster is a responsive information viewer, inventory browser, and kanban management tool built for internal spare parts tracking and operations support for a Materials Coordinator. Designed with real-world production data, it connects a PostgreSQL backend with RESTful routing, and a React frontend to provide dynamic part lookup, component breakdowns, and kanban card management.

## Features

### Parts browser
The most used and useful daily use tool, this section uses a filtered, multi-column partial text search to retrieve and display technical and supply information about individual parts.

### Kanban check-in
Kanban cards are checked in and displayed when a bin is emptied or reaches a certain threshold. The display is sortable by both date and part number, and cards on this table can be removed once the parts are received.

### Orders by line item
Currently displays the full history of each part ordered.

### Inventory
Currently displays only the live inventory of any item that has overstock. Quantities are carefully controlled in the bins to make identifying surges in use easier, as well as some parts being too large to fit whole received quantities in their bin.

## Data overview
PartsMaster processes real part data for amplifier Bills Of Materials (BOMs). It assumes the user is not able to directly access or modify data from the source, but can create copies of the `.csv` files that are cleaned using Python scripts and imported via PostgreSQL cli

### Data used
- `Parts.csv` contains about 8000 parts, which is every single part number created to be used in a BOM. This includes everything from PCBs, all of their components, everything from the metal for the chassis, the decals, screws and thermal strips, and in some cases the artwork for the boxes.
- `WhereUsed.csv` is a complete table of where every single part is used in every single assembly, with the highest-level part being the finished good SKU, and every other item being a child of the finished good or an assembly.
- `OrdersLineItem.csv` is a complete history of every part or item ordered to replenish inventory for each part.
- `ProductionModels.csv` just a list of models currently in production, and used to determine if a part is still in the production life-cycle and is able to be replenished.
- `Inventory.csv` was created by the Materials Coordinator to keep track of the locations of overstock, usually for large parts or parts that have to be ordered in very large quantities.

> [!CAUTION]
> I advise against opening `WhereUsed.xlsx` since it has around 250,000 lines and will slow your machine down considerably.

## Getting started

```bash
# Clone the repository
git clone https://github.com/CotyJ/PartsMaster.git
cd PartsMaster

# Install dependencies
npm install

# Set up your database, create and switch to sparts_db. Run this command for each .sql file in /db
# (Ensure PostgreSQL is running and environment variables are configured)
psql -U postgres -d parts_db -f ~/db<file_name>

# Start the backend Express server
npm run start-server

# Start the dev server
npm run dev
```

The data used above can be placed in `src/data/raw`, and then you can run `python ~/scripts/main.py` to convert and clean the CSVs to be ready for import.


## Upcoming Features

### Parts browser
- Add an "Add to order" button.
- Add color to the text for 'Used in' if a BOM model is in production to know if the part is still in use or obsolete and cannot be replenished.
- Add order history to see trends in usage.

### Inventory
- Add CRUD operations to delete used up stock and add additional stock.

### Kanban check-in
- Add ability to see if it is on order, or add it to an order if not.

### Orders by line item
- Add filtering to view specific purchase orders

### Better data import
- Create a master `.sql` file to create the initial database and then create all of the tables in one step.
