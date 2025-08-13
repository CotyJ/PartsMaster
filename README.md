
# PartsMaster
PartsMaster is a responsive information viewer, inventory browser, and replenishment management tool built for internal spare parts tracking and operations support for a Materials Coordinator. Designed with real-world production data, it connects a PostgreSQL backend with RESTful routing, and a React frontend to provide dynamic part lookup, component breakdowns, and kanban card management.

## Features

### Parts browser
The most used and useful daily use tool, this section uses a filtered, multi-column partial text search to retrieve and display technical and supply information about individual parts. Shows the status of each part, where they are used, and can send replenishment requests only if the part is a candidate (not obsolete, not already requested)

### Replenish requests
*[Kanban](https://en.wikipedia.org/wiki/Kanban)* cards were originally - and still are - used in manufacturing to signal the need to replenish materials ( *kanban* (かんばん) translates to "signboard"). Cards are checked in and displayed when a bin is emptied or reaches a certain threshold. The display is sortable by both date and part number, and cards on this table can be removed via Check In once the parts are received and the card is returned to the bin.

### Orders by line item
Currently displays the history of each part ordered. Can be filtered by PO number.

### Inventory
Currently displays the live inventory of any item that has overstock. Quantities are carefully controlled in the bins to make identifying surges in use easier, as well as some parts being too large to fit whole received quantities in their bin.

## Requirements
You will need Node, PostgreSQL, and Python3 to run this project.



## Data overview
PartsMaster processes part data for Bills Of Materials (BOMs). Each item is part of an assembly, and some assemblies are sub-assemblies of other assemblies.

### Data used
- `parts.csv` contains a history of every part that is used in a BOM.
- `where_used.csv` is a complete table of where every single part is used in every single assembly, with the highest-level part being the finished good SKU, and every other item being a child of the finished good or an assembly.
- `orders_line_item.csv` is a complete history of every part or item ordered to replenish inventory for each part.
- `production_models.csv` a list of models currently in production, and used to determine if a part is still in the production life-cycle and is able to be replenished.
- `inventory.csv` a comprehensive list to keep track of the locations of overstock, usually for large parts or parts that have to be ordered in very large quantities, but anything can be stored here. Parts can also be present in multiple locations.


## Getting started



```bash
# 1. Clone the repository
git clone https://github.com/CotyJ/PartsMaster.git
cd PartsMaster

# 2. Install dependencies
npm install

# 3. Run the initial setup (creates .env, generates CSVs, creates DB/tables, seeds data)
npm run setup
# You may be prompted for your PostgreSQL password

# 4. Start frontend + backend servers
npm start
```


## Upcoming Features

### Parts browser
- Add color to the text for 'Used in' if a BOM model is in production to know if the part is still in use or obsolete and cannot be replenished
- Add order history to see trends in usage

### To Replenish
- Add ability to see if it is on order, or add it to an order if not

### Orders by line item
- Add ability to add directly to an order
- Ability to create orders with PDF support and in-line editing