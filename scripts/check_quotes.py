def find_unbalanced_quote_lines(csv_filepath):
    with open(csv_filepath, 'r', encoding='utf-8') as f:
        for i, line in enumerate(f, start=1):
            # Count number of double quotes on the line
            quote_count = line.count('"')

            # Check if the count is odd (unbalanced)
            if quote_count % 2 != 0:
                print(f"Unbalanced quotes on line {i}: {quote_count} quotes")
                print(f"Line content: {line[:40].strip()}")

if __name__ == "__main__":
    path_to_csv = "../data/processed/parts.csv"  # replace with your CSV file path
    find_unbalanced_quote_lines(path_to_csv)
