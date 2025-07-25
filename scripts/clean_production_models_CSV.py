import os
import pandas as pd

base_dir = os.path.dirname(os.path.abspath(__file__))
production_models_path = os.path.join(base_dir, "..", "data", "processed", "production_models.csv")

df = pd.read_csv(production_models_path)
df = df.drop(df.columns[:2], axis=1)
df.to_csv(production_models_path, index=True)
